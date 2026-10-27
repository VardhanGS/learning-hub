// Contest-style practice (Puzzle Peak): timed practice contests shaped like the real ones (Math Kangaroo–style:
// 24 or 30 questions in 75 minutes, worth 3, 4, and 5 points, no penalty for wrong answers; AMC 8–style: 25 questions
// in 40 minutes, 1 point each; Sprint-style: 30 typed answers in 40 minutes), a question-by-question review with
// worked solutions, history, and the grown-up dashboard. Unofficial: the problems are original, the scores are
// practice scores. Formats come from APP.features.contest.formats; questions come from CONTEST.draw(tier, typed),
// defined in the app's data (tier 0, 1, 2 = the 3-, 4-, and 5-point bands = practice levels 1, 2, 3).
(window.HubModes = window.HubModes || []).push((api) => {
  const { APP, esc, fmt } = api;
  const C = APP.features.contest;
  const FORMATS = Object.fromEntries(C.formats.map((f) => [f.id, f]));
  const P = () => api.P();
  const tests = () => (P().tests || []).filter((t) => t.kind === 'contest').sort((a, b) => a.at - b.at);
  const fmtMin = (s) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`;
  const when = (t, long) => new Date(t).toLocaleDateString('en-US', long ? { month: 'long', day: 'numeric', year: 'numeric' } : { month: 'short', day: 'numeric' });
  const skillName = (where) => { const k = String(where || '').split('.')[0]; for (const s of api.SUBJ()) { const x = s.skills.find((y) => y.id === k); if (x) return x.name; } return 'Other'; };
  let lastResult = null, reviewOnlyWrong = true;

  // Questions for one contest: `per` = how many from each tier (3-, 4-, 5-point), in that order, no repeats.
  // Within a tier the topics are spread out (each draw prefers a skill used least so far).
  function build(f) {
    const seen = new Set(), items = [];
    f.per.forEach((count, tier) => {
      const used = {};
      for (let k = 0, guard = 0; k < count && guard < count * 60; guard++) {
        const q = CONTEST.draw(tier, !!f.typed);
        if (!q) continue;
        const key = U.qkey(q), sk = String(q.where || '').split('.')[0];
        if (seen.has(key)) continue;
        // spread topics: skip a skill already used more than its fair share in this tier (relaxed as tries pile up)
        if ((used[sk] || 0) > Math.floor(k / Math.max(1, CONTEST.skills(tier).length)) && guard < count * 30) continue;
        seen.add(key); used[sk] = (used[sk] || 0) + 1;
        items.push({ q, tier, pts: f.points ? f.points[tier] : 1 });
        k++;
      }
    });
    return items;
  }

  // ---------- home ----------
  function home() {
    const t = tests()[tests().length - 1];
    return `<section class="card map-card">
      <div class="row-between"><h2>🏁 Practice contest</h2><span class="tag-unofficial">Unofficial</span></div>
      <p class="muted">${esc(C.blurb)}</p>
      ${t ? `<p>Last contest (${when(t.at)}, ${esc(FORMATS[t.format] ? FORMATS[t.format].short : t.format)}): <b>${t.score} of ${t.max} points</b>.</p>` : ''}
      <div class="row"><button class="btn primary big" data-act="ctIntro">Start a practice contest</button>${tests().length ? '<button class="btn" data-act="nav" data-to="ctHistory">My contests</button>' : ''}</div>
      <p class="fine">Below: practice every topic untimed. Level 1 is like the 3-point questions, Level 2 the 4-point ones, Level 3 the 5-point ones.</p>
    </section>`;
  }

  // ---------- intro ----------
  function intro() {
    return `<div class="narrow"><section class="card stack">
      <h1 class="page-h">Practice contest</h1>
      <ul class="plain-list">
        <li>⏱️ <b>Timed.</b> The clock is at the top. You can hide it, except in the last 5 minutes.</li>
        <li>↔️ <b>Move around freely.</b> Skip, go back, change answers, and mark questions to come back to, until you submit or time runs out.</li>
        <li>📈 <b>Easier first.</b> Questions get harder as you go.</li>
        <li>✅ <b>Answer every question.</b> A wrong answer costs nothing, so make your best guess.</li>
        <li>✏️ <b>No calculator.</b> Use scrap paper, and draw pictures!</li>
      </ul>
      <span class="lbl">Which contest?</span>
      <div class="stack">${C.formats.map((f, i) => `<button class="btn ${i ? '' : 'primary big'}" data-act="ctStart" data-f="${f.id}"><span>${esc(f.name)}</span><small class="fine"> · ${f.per.reduce((a, b) => a + b, 0)} questions · ${Math.round(f.secs / 60)} min${f.points ? ` · ${f.points.join('/')} points` : ''}</small></button>`).join('')}</div>
      <p class="fine">${C.formats.map((f) => esc(f.note || '')).filter(Boolean).join(' ')}</p>
      <button class="btn ghost" data-act="nav" data-to="home">Not now</button>
      <p class="fine">${esc(C.notice)}</p>
    </section></div>`;
  }

  // ---------- run ----------
  function start(id) {
    const f = FORMATS[id], items = build(f);
    api.startModule({ title: f.name, short: f.short, qs: items.map((it) => it.q), secs: f.secs, calc: false, reference: null, onDone: (res) => done(f, items, res) });
  }
  function done(f, items, res) {
    const review = items.map((it, i) => {
      const q = res.qs[i], st = res.sts[i];
      const your = !res.answered[i] ? '' : q.t === 'mc' ? st.chosen : q.t === 'num' ? st.typed : '';
      return { n: i + 1, pts: it.pts, ok: res.oks[i], answered: res.answered[i], where: q.where || '', topic: skillName(q.where),
        q: q.q, fig: q.fig || '', your, right: api.answerText(q), why: q.why || '', wrongWhy: !res.oks[i] && res.answered[i] && q.miss ? (q.miss[your] || '') : '' };
    });
    const score = review.filter((r) => r.ok).reduce((t, r) => t + r.pts, 0), max = review.reduce((t, r) => t + r.pts, 0);
    const topics = {};
    review.forEach((r) => { const d = (topics[r.topic] = topics[r.topic] || { n: 0, right: 0, where: r.where }); d.n++; if (r.ok) d.right++; });
    const tiers = f.per.map((_, tier) => { const rs = review.filter((r, i) => items[i].tier === tier); return { n: rs.length, right: rs.filter((r) => r.ok).length, pts: f.points ? f.points[tier] : 1 }; });
    const result = { id: Math.random().toString(36).slice(2, 10), kind: 'contest', format: f.id, at: Date.now(), score, max, right: review.filter((r) => r.ok).length, n: review.length, tiers, topics, secs: res.secs, timeUp: res.timeUp, review };
    api.setP((p) => {
      p.tests = [...(p.tests || []), result];
      const mine = p.tests.filter((t) => t.kind === 'contest');
      mine.slice(0, Math.max(0, mine.length - 3)).forEach((t) => { delete t.review; }); // keep full reviews for the last 3
    });
    api.save();
    api.touchDay((d) => { d.rounds++; d.q += review.length; d.correct += result.right; });
    lastResult = result;
    return 'ctReport';
  }

  // ---------- report ----------
  function report() {
    const r = lastResult || tests()[tests().length - 1];
    if (!r) return home();
    const f = FORMATS[r.format] || { name: r.format, points: null };
    return `<section class="card stack report">
      <div class="row-between"><h1 class="page-h">Contest results</h1><span class="tag-unofficial">Practice score</span></div>
      <p class="muted">${esc(f.name)} · ${when(r.at, true)} · time used ${fmtMin(r.secs)}${r.timeUp ? ' (time ran out)' : ''}</p>
      <div class="big-band"><span class="band-num">${r.score} / ${r.max}</span><span class="muted">points · ${r.right} of ${r.n} right</span></div>
      ${f.points ? `<h2>By point value</h2><div class="goal-list">${r.tiers.map((t) => `<div class="goal-row"><span class="gname">${t.pts}-point questions</span><span class="gband">${t.right} of ${t.n}</span><span class="gmeta"><span class="meter"><i style="width:${t.n ? Math.round((100 * t.right) / t.n) : 0}%"></i></span></span></div>`).join('')}</div>` : ''}
      <h2>By topic</h2>
      <div class="goal-list">${Object.entries(r.topics).map(([name, d]) => `<div class="goal-row"><span class="gname">${esc(name)}</span><span class="gband">${d.right} of ${d.n}</span><span class="gmeta"><span class="meter"><i style="width:${Math.round((100 * d.right) / d.n)}%"></i></span>${d.right / d.n < 0.6 && d.where ? `<button class="link" data-act="ctPractice" data-w="${esc(d.where)}">Practice</button>` : ''}</span></div>`).join('')}</div>
      ${r.review ? '<div class="row"><button class="btn primary" data-act="nav" data-to="ctReview">Review with solutions</button></div>' : ''}
      <details class="fine"><summary>For grown-ups: how this is scored</summary>
        <p>${esc(C.scoring)}</p><p>${esc(C.notice)}</p></details>
      <div class="row"><button class="btn" data-act="nav" data-to="home">Done</button><button class="btn" data-act="nav" data-to="ctHistory">My contests</button></div>
    </section>`;
  }

  // ---------- review ----------
  function review() {
    const r = lastResult || tests().filter((t) => t.review).slice(-1)[0];
    if (!r || !r.review) return home();
    const list = r.review.filter((x) => !reviewOnlyWrong || !x.ok);
    return `<h1 class="page-h">Review</h1>
      <div class="seg"><button class="${reviewOnlyWrong ? 'on' : ''}" data-act="ctRevMode" data-w="1">Missed (${r.review.filter((x) => !x.ok).length})</button><button class="${reviewOnlyWrong ? '' : 'on'}" data-act="ctRevMode" data-w="0">All (${r.review.length})</button></div>
      ${list.map((x) => `<section class="card stack rev ${x.ok ? 'rev-ok' : 'rev-miss'}">
        <p class="muted">Question ${x.n} · ${x.pts} point${x.pts === 1 ? '' : 's'} · ${esc(x.topic)}</p>
        <p class="prompt">${fmt(x.q)}</p>
        ${x.fig ? `<div class="fig">${x.fig}</div>` : ''}
        <p>${x.ok ? '✅' : '❌'} Your answer: <b>${x.your ? fmt(String(x.your)) : '(blank)'}</b>${x.ok ? '' : ` · Right answer: <b>${fmt(String(x.right))}</b>`}</p>
        ${x.wrongWhy ? `<p class="fine"><b>Why that choice is wrong:</b> ${fmt(x.wrongWhy)}</p>` : ''}
        ${x.why ? `<p class="fine"><b>Solution:</b> ${fmt(x.why)}</p>` : ''}
        ${x.where ? `<button class="link" data-act="ctPractice" data-w="${esc(x.where)}">Practice this topic</button>` : ''}
      </section>`).join('') || '<section class="card"><p>No missed questions. Wonderful!</p></section>'}
      <div class="row"><button class="btn" data-act="nav" data-to="ctReport">Back to results</button></div>`;
  }

  // ---------- history ----------
  function table(list) {
    return `<section class="card dash-wrap"><div class="dash-scroll"><table class="dash"><thead><tr><th>Date</th><th>Contest</th><th>Points</th><th>Right</th><th>Time</th></tr></thead><tbody>
      ${[...list].reverse().map((t) => `<tr><td>${when(t.at)}</td><td>${esc(FORMATS[t.format] ? FORMATS[t.format].short : t.format)}</td><td class="num"><b>${t.score} / ${t.max}</b></td><td class="num">${t.right} of ${t.n}</td><td class="num">${fmtMin(t.secs)}</td></tr>`).join('')}
    </tbody></table></div></section>`;
  }
  function history() {
    const list = tests();
    return `<h1 class="page-h">My contests</h1>${list.length ? table(list) : '<section class="card"><p class="muted">Take a practice contest to see your scores here.</p></section>'}<p class="fine">${esc(C.notice)}</p>`;
  }
  function dashboard(rows) {
    const withTests = rows.filter((r) => (r.st.prog.data.tests || []).some((t) => t.kind === 'contest'));
    if (!withTests.length) return '';
    return `<h2 class="sec">Practice contests</h2><section class="card dash-wrap"><div class="dash-scroll"><table class="dash">
      <thead><tr><th>Student</th><th>Latest</th><th>Contest</th><th>Points</th><th>Contests</th></tr></thead>
      <tbody>${withTests.map(({ st }) => {
        const ts = (st.prog.data.tests || []).filter((t) => t.kind === 'contest').sort((a, b) => a.at - b.at), t = ts[ts.length - 1];
        return `<tr><td><b>${esc(st.name)}</b></td><td>${when(t.at)}</td><td>${esc(FORMATS[t.format] ? FORMATS[t.format].short : t.format)}</td><td class="num"><b>${t.score} / ${t.max}</b></td><td class="num">${ts.length}</td></tr>`;
      }).join('')}</tbody></table></div></section><p class="fine">Practice scores on original problems, not contest results.</p>`;
  }
  function studentView() { return tests().length ? `<section class="card"><h2>Practice contests</h2>${table(tests())}</section>` : ''; }

  return {
    homeTop: home, practiceTitle: C.practiceTitle || 'Practice by topic', dashboard, studentView,
    screens: { ctIntro: intro, ctReport: report, ctReview: review, ctHistory: history },
    acts: {
      ctIntro: () => api.go('ctIntro'),
      ctStart: (ds) => start(ds.f),
      ctRevMode: (ds) => { reviewOnlyWrong = ds.w === '1'; api.render(); },
      ctPractice: (ds) => { const [k, l] = ds.w.split('.'); const s = api.SUBJ().find((x) => x.skills.some((y) => y.id === k)); if (s) api.startRound({ mode: 'skill', s: s.id, k, l: +l }); },
    },
  };
});
