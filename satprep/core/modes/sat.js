// SAT-style practice: full practice tests (Reading and Writing, then Math; two timed modules each, the second one
// easier or harder depending on the first), single-section tests, timed drills by content domain, the score report,
// a question-by-question review, and the grown-up dashboard. Scoring lives in sat-core.js. Unofficial: these are
// practice estimates, not SAT scores.
(window.HubModes = window.HubModes || []).push((api) => {
  const { APP, esc, fmt } = api;
  const S = APP.features.sat;
  const SECTIONS = S.sections; // {rw: {name, short, secs, n, spec, calc, grouped}, math: {...}}
  const GOAL = Object.fromEntries(S.goals.map((g) => [g.id, g]));
  const P = () => api.P();
  const tests = () => (P().tests || []).filter((t) => t.kind === 'sat').sort((a, b) => a.at - b.at);
  const latest = () => { const t = tests().filter((x) => x.type !== 'drill'); return t[t.length - 1]; };
  const fmtMin = (s) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`;
  let pool = null;
  const getPool = () => (pool = pool || SatCore.buildPool(SATBANK.levels, 4, U.qkey));
  let run = null, lastResult = null, reviewOnlyWrong = true;

  // ---------- home ----------
  function home() {
    const t = latest();
    return `<section class="card map-card">
      <div class="row-between"><h2>📝 SAT-style practice test</h2><span class="tag-unofficial">Unofficial</span></div>
      <p class="muted">Reading and Writing (${SECTIONS.rw.n * 2} questions, ${SECTIONS.rw.secs * 2 / 60} min) and Math (${SECTIONS.math.n * 2} questions, ${SECTIONS.math.secs * 2 / 60} min), two timed modules each, like the digital SAT.</p>
      ${t ? `<p>Last test (${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}): estimated <b>${t.total ? `${t.total.lo}–${t.total.hi}` : Object.values(t.sections).map((x) => `${x.lo}–${x.hi}`).join(' · ')}</b>${t.total ? '' : ` (${Object.keys(t.sections).map((k) => SECTIONS[k].short).join(', ')})`}</p>` : ''}
      <div class="row"><button class="btn primary big" data-act="satIntro">Start a practice test</button>${tests().length ? '<button class="btn" data-act="nav" data-to="satHistory">My scores</button>' : ''}</div>
      <p class="fine">Below: practice every skill untimed, three levels each. Or try a <button class="link" data-act="nav" data-to="satDrills">timed drill</button>.</p>
    </section>`;
  }

  // ---------- intro ----------
  function intro() {
    return `<div class="narrow"><section class="card stack">
      <h1 class="page-h">SAT-style practice test</h1>
      <ul class="plain-list">
        <li>⏱️ <b>Two sections, two timed modules each.</b> Reading and Writing: ${SECTIONS.rw.n} questions in ${SECTIONS.rw.secs / 60} minutes per module. Math: ${SECTIONS.math.n} questions in ${SECTIONS.math.secs / 60} minutes per module.</li>
        <li>🔀 <b>The second module adapts.</b> How you do on module 1 decides whether module 2 is easier or harder. You cannot go back to module 1.</li>
        <li>↔️ <b>Inside a module you can move around.</b> Skip, go back, change answers, and mark questions for review until time runs out or you submit.</li>
        <li>✅ <b>Answer every question.</b> A blank is never right, so it is better to make your best guess.</li>
        <li>🧮 <b>Math tools:</b> a calculator and a reference sheet of formulas are open for all of Math. (The real test has a built-in Desmos graphing calculator; this app has a simple calculator.)</li>
        <li>✍️ <b>Typed math answers:</b> up to 6 characters, including a minus sign. Fractions (3/4) and decimals (0.75) are both fine.</li>
      </ul>
      <span class="lbl">What do you want to take?</span>
      <div class="stack">
        <button class="btn primary big" data-act="satStart" data-kind="full">Full test · about 2 h 14 min</button>
        <div class="row"><button class="btn" data-act="satStart" data-kind="rw">Reading and Writing only · 64 min</button><button class="btn" data-act="satStart" data-kind="math">Math only · 70 min</button></div>
      </div>
      <button class="btn ghost" data-act="nav" data-to="home">Not now</button>
      <p class="fine">${esc(APP.disclaimer)}</p>
    </section></div>`;
  }

  // ---------- the flow: module 1 → module 2 (→ break → next section) → report ----------
  const answersOf = (res, items) => items.map((it, i) => ({ b: it.b, c: it.c, ok: res.oks[i], goal: it.goal, where: it.where, pretest: !!it.pretest, answered: res.answered[i],
    // a compact copy for the review screen
    rev: { q: res.qs[i].q, passage: res.qs[i].passage ? res.qs[i].passage.text : '', your: res.answered[i] ? yourAnswer(res.qs[i], res.sts[i]) : '', right: api.answerText(res.qs[i]), why: res.qs[i].why || '', fig: res.qs[i].fig || '' } }));
  function yourAnswer(q, st) { if (q.t === 'mc') return st.chosen; if (q.t === 'num') return st.typed; return ''; }
  function begin(kind) {
    const order = kind === 'full' ? ['rw', 'math'] : [kind];
    run = { kind, order, si: 0, used: new Set(), sections: {}, secs: 0, started: Date.now() };
    startSection();
  }
  function startSection() {
    const sec = run.order[run.si], C = SECTIONS[sec];
    const items = SatCore.buildModule(getPool(), run.used, C.spec, 'm1', { grouped: C.grouped });
    run.cur = { sec, items, stage: 1 };
    launch(items, `${C.name} · Module 1`, C);
  }
  function launch(items, title, C) {
    api.startModule({ title, short: `${C.short} · M${/Module 2/.test(title) ? 2 : 1}`, qs: items.map((it) => it.q), secs: C.secs, calc: C.calc, reference: C.calc ? S.reference : null, onDone: (res) => moduleDone(res) });
  }
  function moduleDone(res) {
    const c = run.cur, C = SECTIONS[c.sec], ans = answersOf(res, c.items);
    run.secs += res.secs;
    if (c.stage === 1) {
      const band = SatCore.route(ans.filter((a) => !a.pretest));
      run.sections[c.sec] = { m1: ans, band };
      const items = SatCore.buildModule(getPool(), run.used, C.spec, band, { grouped: C.grouped });
      run.cur = { sec: c.sec, items, stage: 2 };
      run.between = { sec: c.sec, timeUp: res.timeUp };
      return 'satBetween';
    }
    run.sections[c.sec].m2 = ans;
    run.si++;
    if (run.si < run.order.length) { run.between = { sec: c.sec, brk: true, timeUp: res.timeUp }; return 'satBetween'; }
    return finish();
  }
  function between() {
    const b = run.between, C = SECTIONS[b.sec];
    if (b.brk) return `<div class="narrow"><section class="card stack"><h1 class="page-h">☕ Break time</h1>
      <p>${b.timeUp ? 'Time is up for that module. ' : ''}You finished ${esc(C.name)}. On the real test, the app tells you when to take a short break before Math.</p>
      <p>Stand up, stretch, and get a drink of water. Math is next: ${SECTIONS.math.n * 2} questions in two modules, with a calculator and a reference sheet.</p>
      <button class="btn primary big" data-act="satNext">Start Math, Module 1</button></section></div>`;
    return `<div class="narrow"><section class="card stack"><h1 class="page-h">Module 1 done</h1>
      <p>${b.timeUp ? 'Time is up for module 1. ' : ''}Next is ${esc(C.name)}, Module 2: ${C.n} questions in ${C.secs / 60} minutes. You cannot go back to module 1.</p>
      <button class="btn primary big" data-act="satNext">Start Module 2</button></section></div>`;
  }
  function next() {
    const b = run.between;
    if (b.brk) { run.between = null; startSection(); return; }
    run.between = null;
    launch(run.cur.items, `${SECTIONS[run.cur.sec].name} · Module 2`, SECTIONS[run.cur.sec]);
  }
  function finish() {
    const sections = {}, domains = {}, review = [];
    for (const [sec, s] of Object.entries(run.sections)) {
      const all = [...s.m1, ...s.m2], scored = all.filter((a) => !a.pretest);
      sections[sec] = { ...SatCore.sectionScore(scored), band: s.band };
      scored.forEach((a) => { const d = (domains[a.goal] = domains[a.goal] || { n: 0, right: 0 }); d.n++; if (a.ok) d.right++; });
      all.forEach((a, i) => review.push({ sec, n: i + 1, module: i < s.m1.length ? 1 : 2, ok: a.ok, pretest: a.pretest, goal: a.goal, where: a.where, ...a.rev }));
    }
    const ks = Object.keys(sections);
    const total = ks.length === 2 ? { score: sections.rw.score + sections.math.score, lo: sections.rw.lo + sections.math.lo, hi: sections.rw.hi + sections.math.hi } : null;
    const result = { id: Math.random().toString(36).slice(2, 10), kind: 'sat', type: run.kind, at: Date.now(), sections, total, domains, secs: run.secs, review };
    saveResult(result);
    api.touchDay((d) => { d.rounds++; d.q += review.length; d.correct += review.filter((r) => r.ok).length; });
    run = null;
    return 'satReport';
  }
  // Keep the full question review for the last 3 results only (it is large); older ones keep their scores.
  function saveResult(result) {
    api.setP((p) => {
      p.tests = [...(p.tests || []), result];
      const sat = p.tests.filter((t) => t.kind === 'sat');
      sat.slice(0, Math.max(0, sat.length - 3)).forEach((t) => { delete t.review; });
    });
    api.save();
    lastResult = result;
  }

  // ---------- timed drills: 10 questions from one content domain ----------
  function drills() {
    const by = (sec) => S.goals.filter((g) => g.section === sec).map((g) => `<button class="btn" data-act="satDrill" data-g="${g.id}">${g.icon} ${esc(g.name)}</button>`).join('');
    return `<div class="narrow"><section class="card stack"><h1 class="page-h">Timed drills</h1>
      <p class="muted">10 questions from one content domain, at the real test's pace (about ${Math.round(SECTIONS.rw.secs / SECTIONS.rw.n)} seconds per Reading and Writing question, ${Math.round(SECTIONS.math.secs / SECTIONS.math.n)} per Math question). Questions get harder as you go.</p>
      <h2>${esc(SECTIONS.rw.name)}</h2><div class="stack">${by('rw')}</div>
      <h2>${esc(SECTIONS.math.name)}</h2><div class="stack">${by('math')}</div>
      <button class="btn ghost" data-act="nav" data-to="home">Back</button></section></div>`;
  }
  function startDrill(goal) {
    const g = GOAL[goal], C = SECTIONS[g.section], used = new Set();
    const items = SatCore.buildModule(getPool(), used, [[goal, 10]], 'm1', { pretest: 0 });
    run = { kind: 'drill', goal };
    api.startModule({ title: `Drill · ${g.name}`, short: 'Drill', qs: items.map((it) => it.q), secs: Math.round((C.secs / C.n) * 10), calc: C.calc, reference: C.calc ? S.reference : null, onDone: (res) => {
      const ans = answersOf(res, items), right = ans.filter((a) => a.ok).length;
      const result = { id: Math.random().toString(36).slice(2, 10), kind: 'sat', type: 'drill', goal, at: Date.now(), sections: {}, total: null, domains: { [goal]: { n: ans.length, right } }, secs: res.secs, review: ans.map((a, i) => ({ sec: g.section, n: i + 1, module: 1, ok: a.ok, goal, where: a.where, ...a.rev })) };
      saveResult(result);
      api.touchDay((d) => { d.rounds++; d.q += ans.length; d.correct += right; });
      run = null;
      return 'satReport';
    } });
  }

  // ---------- report ----------
  function scoreBar(s, lo = 200, hi = 800) {
    const W = 520, x = (v) => 20 + ((v - lo) / (hi - lo)) * (W - 40);
    let b = `<line x1="20" y1="40" x2="${W - 20}" y2="40" class="fg-stroke"/>`;
    for (let v = lo; v <= hi; v += (hi - lo) / 6) b += `<line x1="${x(v)}" y1="34" x2="${x(v)}" y2="46" class="fg-stroke"/><text x="${x(v)}" y="64" class="fg-text" font-size="13" text-anchor="middle">${v}</text>`;
    b += `<rect x="${x(s.lo)}" y="30" width="${Math.max(4, x(s.hi) - x(s.lo))}" height="20" rx="6" class="band"/><circle cx="${x(s.score)}" cy="40" r="6" class="tf-a"/>`;
    return `<svg viewBox="0 0 ${W} 72" class="band-svg" role="img" aria-label="Estimated range ${s.lo} to ${s.hi}">${b}</svg>`;
  }
  function domainRows(r) {
    return `<div class="goal-list">${S.goals.filter((g) => r.domains[g.id]).map((g) => { const d = r.domains[g.id]; return `<div class="goal-row"><span class="gname">${g.icon} ${esc(g.name)}</span><span class="gband">${d.right} of ${d.n}</span>
      <span class="gmeta"><span class="meter"><i style="width:${Math.round(100 * d.right / d.n)}%"></i></span>${d.right / d.n < 0.6 ? `<button class="link" data-act="satDrill" data-g="${g.id}">Drill it</button>` : ''}</span></div>`; }).join('')}</div>`;
  }
  function report() {
    const r = lastResult || tests()[tests().length - 1];
    if (!r) return home();
    const drill = r.type === 'drill';
    return `<section class="card stack report">
      <div class="row-between"><h1 class="page-h">${drill ? 'Drill results' : 'Practice test results'}</h1><span class="tag-unofficial">Unofficial estimate</span></div>
      <p class="muted">${new Date(r.at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · time used ${fmtMin(r.secs)}</p>
      ${r.total ? `<div class="big-band"><span class="band-num">${r.total.lo}–${r.total.hi}</span><span class="muted">estimated total score range (400–1600)</span></div>${scoreBar(r.total, 400, 1600)}` : ''}
      ${Object.entries(r.sections).map(([k, s]) => `<h2>${esc(SECTIONS[k].name)}</h2><div class="big-band small"><span class="band-num">${s.lo}–${s.hi}</span><span class="muted">estimated section range (200–800) · ${s.correct} of ${s.n} right · module 2 was ${s.band === 'hard' ? 'the harder' : 'the easier'} one</span></div>${scoreBar(s)}`).join('')}
      ${drill ? `<div class="big-band"><span class="band-num">${Object.values(r.domains)[0].right} of ${Object.values(r.domains)[0].n}</span><span class="muted">right in ${esc(GOAL[r.goal].name)}</span></div>` : ''}
      <h2>Content domains</h2>
      ${domainRows(r)}
      ${r.review ? '<div class="row"><button class="btn primary" data-act="nav" data-to="satReview">Review my answers</button></div>' : ''}
      <details class="fine"><summary>For grown-ups: how this is worked out</summary>
        <p>The test follows the published shape of the digital SAT: ${SECTIONS.rw.n * 2} Reading and Writing questions in 64 minutes and ${SECTIONS.math.n * 2} Math questions in 70 minutes, two modules per section, module 2 chosen from how module 1 went, and 2 unscored practice ("pretest") questions in each module. Each question here has an estimated difficulty set by hand, and the score is a statistical estimate from your answers, shown as a range. It is not College Board's scoring and it is not an SAT score. Real scores also depend on official question data this app does not have.</p>
        <p>${esc(APP.disclaimer)}</p></details>
      <div class="row"><button class="btn" data-act="nav" data-to="home">Done</button><button class="btn" data-act="nav" data-to="satHistory">My scores</button></div>
    </section>`;
  }

  // ---------- review ----------
  function review() {
    const r = lastResult || tests().filter((t) => t.review).slice(-1)[0];
    if (!r || !r.review) return home();
    const list = r.review.filter((x) => !reviewOnlyWrong || !x.ok);
    return `<h1 class="page-h">Review</h1>
      <div class="seg"><button class="${reviewOnlyWrong ? 'on' : ''}" data-act="satRevMode" data-w="1">Missed (${r.review.filter((x) => !x.ok).length})</button><button class="${reviewOnlyWrong ? '' : 'on'}" data-act="satRevMode" data-w="0">All (${r.review.length})</button></div>
      ${list.map((x) => `<section class="card stack rev ${x.ok ? 'rev-ok' : 'rev-miss'}">
        <p class="muted">${esc(SECTIONS[x.sec].short)} · Module ${x.module} · ${esc(GOAL[x.goal].name)}${x.pretest ? ' · unscored practice question' : ''}</p>
        ${x.passage ? `<blockquote class="passage">${esc(x.passage).replace(/\n/g, '<br>')}</blockquote>` : ''}
        <p class="prompt">${fmt(x.q)}</p>
        ${x.fig ? `<div class="fig">${x.fig}</div>` : ''}
        <p>${x.ok ? '✅' : '❌'} Your answer: <b>${x.your ? fmt(String(x.your)) : '(blank)'}</b>${x.ok ? '' : ` · Right answer: <b>${fmt(String(x.right))}</b>`}</p>
        ${x.why ? `<p class="fine">${fmt(x.why)}</p>` : ''}
        ${x.where ? `<button class="link" data-act="satPractice" data-w="${x.where}">Practice this skill</button>` : ''}
      </section>`).join('') || '<section class="card"><p>No missed questions. Great work!</p></section>'}
      <div class="row"><button class="btn" data-act="nav" data-to="satReport">Back to results</button></div>`;
  }

  // ---------- history ----------
  function history() {
    const list = tests();
    return `<h1 class="page-h">My scores</h1>
      ${list.length ? `<section class="card dash-wrap"><div class="dash-scroll"><table class="dash"><thead><tr><th>Date</th><th>Type</th><th>Total</th><th>${esc(SECTIONS.rw.short)}</th><th>${esc(SECTIONS.math.short)}</th><th>Time</th></tr></thead><tbody>
        ${[...list].reverse().map((t) => `<tr><td>${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td><td>${t.type === 'drill' ? `Drill: ${esc(GOAL[t.goal].name)}` : t.type === 'full' ? 'Full test' : 'One section'}</td><td class="num">${t.total ? `<b>${t.total.lo}–${t.total.hi}</b>` : '–'}</td><td class="num">${t.sections.rw ? `${t.sections.rw.lo}–${t.sections.rw.hi}` : '–'}</td><td class="num">${t.sections.math ? `${t.sections.math.lo}–${t.sections.math.hi}` : '–'}</td><td class="num">${fmtMin(t.secs)}</td></tr>`).join('')}
      </tbody></table></div></section>` : '<section class="card"><p class="muted">Take a practice test or a drill to see your scores here.</p></section>'}
      <p class="fine">${esc(APP.disclaimer)}</p>`;
  }

  // ---------- dashboard (grown-ups) ----------
  function dashboard(rows) {
    const withTests = rows.filter((r) => (r.st.prog.data.tests || []).some((t) => t.kind === 'sat' && t.type !== 'drill'));
    if (!withTests.length) return '';
    return `<h2 class="sec">SAT-style practice tests</h2><section class="card dash-wrap"><div class="dash-scroll"><table class="dash">
      <thead><tr><th>Student</th><th>Latest</th><th>Total</th><th>${esc(SECTIONS.rw.short)}</th><th>${esc(SECTIONS.math.short)}</th><th>Tests</th></tr></thead>
      <tbody>${withTests.map(({ st }) => {
        const ts = (st.prog.data.tests || []).filter((t) => t.kind === 'sat' && t.type !== 'drill').sort((a, b) => a.at - b.at), t = ts[ts.length - 1];
        return `<tr><td><b>${esc(st.name)}</b></td><td>${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td><td class="num">${t.total ? `<b>${t.total.lo}–${t.total.hi}</b>` : '–'}</td><td class="num">${t.sections.rw ? `${t.sections.rw.lo}–${t.sections.rw.hi}` : '–'}</td><td class="num">${t.sections.math ? `${t.sections.math.lo}–${t.sections.math.hi}` : '–'}</td><td class="num">${ts.length}</td></tr>`;
      }).join('')}</tbody></table></div></section><p class="fine">Unofficial practice estimates, not SAT scores.</p>`;
  }
  function studentView() { return tests().length ? `<section class="card"><h2>SAT-style practice</h2>${history().replace(/<h1[^>]*>.*?<\/h1>/, '')}</section>` : ''; }

  return {
    homeTop: home, dashboard, studentView,
    screens: { satIntro: intro, satBetween: between, satReport: report, satReview: review, satHistory: history, satDrills: drills },
    acts: {
      satIntro: () => api.go('satIntro'),
      satStart: (ds) => begin(ds.kind),
      satNext: () => next(),
      satDrill: (ds) => startDrill(ds.g),
      satRevMode: (ds) => { reviewOnlyWrong = ds.w === '1'; api.render(); },
      satPractice: (ds) => { const [k, l] = ds.w.split('.'); const s = api.SUBJ().find((x) => x.skills.some((y) => y.id === k)); if (s) api.startRound({ mode: 'skill', s: s.id, k, l: +l }); },
    },
  };
});
