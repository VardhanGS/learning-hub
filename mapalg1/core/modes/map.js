// MAP Growth–style practice test mode: intro, the adaptive test (via the core test runner), the report, growth over
// Fall/Winter/Spring, and the grown-up dashboard columns. Scoring lives in map-core.js. Unofficial: these are
// practice estimates on a RIT-like scale, not RIT scores, and the test is not NWEA's.
(window.HubModes = window.HubModes || []).push((api) => {
  const { APP, esc, fmt } = api;
  const M = APP.features.map;
  const GOALS = M.goals;
  const goalName = (id) => (GOALS.find((g) => g.id === id) || { name: id }).name;
  const P = () => api.P();
  const tests = () => (P().tests || []).filter((t) => t.kind === 'map').sort((a, b) => a.at - b.at);
  const latest = () => tests()[tests().length - 1];
  const fmtMin = (s) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`;
  const DESC_CLASS = { Low: 'd-low', LoAvg: 'd-loavg', Avg: 'd-avg', HiAvg: 'd-hiavg', High: 'd-high' };
  const chip = (d) => (d ? `<span class="desc ${DESC_CLASS[d]}">${MapCore.DESC_LONG[d]}</span>` : '');
  let term = MapCore.termOf();
  let run = null; // the test in progress: {pool, used, answers, est, prior, term, started}
  let lastResult = null;
  // Who the student is compared with: a grade (Math 2–5, Reading) or everyone who took a course test (Algebra 1).
  const GROUP = M.group || `grade ${M.grade}`, GROUP_SHORT = M.groupShort || 'vs grade', AVG = M.avgLabel || 'grade avg';
  const [BLO, BHI] = M.bandRange || [140, 240];

  // ---------- home card ----------
  function home() {
    const t = latest();
    return `<section class="card map-card">
      <div class="row-between"><h2>📈 MAP-style practice test</h2><span class="tag-unofficial">Unofficial</span></div>
      <p class="muted">${M.items} questions that adapt to you, like the ${esc(M.test)} test. Take your time: there is no time limit.</p>
      ${t ? `<p>Last test (${MapCore.TERM_NAME[t.term]}, ${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}): estimated <b>${t.lo}–${t.hi}</b> ${chip(t.desc)}</p>` : ''}
      <div class="row"><button class="btn primary big" data-act="mapIntro">Start a practice test</button>${tests().length ? '<button class="btn" data-act="nav" data-to="mapHistory">My growth</button>' : ''}</div>
      <p class="fine">Below: <b>Goal Area Practice</b> — the same three goal areas as the test, three levels each.</p>
    </section>`;
  }

  // ---------- intro ----------
  function intro() {
    const audio = api.settings().testAudio;
    return `<div class="narrow"><section class="card stack">
      <h1 class="page-h">MAP-style practice test</h1>
      <ul class="plain-list">
        <li>📝 <b>${M.items} questions.</b> They get harder when you are right and easier when you miss, so everyone gets some hard ones. That is normal!</li>
        <li>🔒 <b>No going back.</b> You can change your answer until you tap Next. Then it is locked, just like the real test.</li>
        <li>🐢 <b>No time limit.</b> Read each question carefully. Use scratch paper if it helps.</li>
        <li>🔇 <b>No hints and no sounds</b> during the test. You will see your results at the end.</li>
        <li>🧮 Some questions have a calculator button.</li>
      </ul>
      <span class="lbl">Which test season is this?</span>
      <div class="seg">${['fall', 'winter', 'spring'].map((t) => `<button class="${term === t ? 'on' : ''}" data-act="mapTerm" data-t="${t}">${MapCore.TERM_NAME[t]}</button>`).join('')}</div>
      <label class="toggle"><input type="checkbox" data-set="testAudio" ${audio ? 'checked' : ''}><span>${esc(M.audioNote || 'Grown-ups: allow read-aloud during the test (only if the school gives your child text-to-speech; MAP Growth 2–5 has no read-aloud otherwise)')}</span></label>
      <button class="btn primary big" data-act="mapStart">Begin the test</button>
      <button class="btn ghost" data-act="nav" data-to="home">Not now</button>
      <p class="fine">${esc(APP.disclaimer)}</p>
    </section></div>`;
  }

  function begin() {
    const norm = M.norms[term];
    const prior = { mean: norm.mean, sd: 20 };
    run = { pool: MapCore.buildPool(MAPBANK.levels, 3, U.qkey), used: new Set(), answers: [], est: prior.mean, prior, term, started: Date.now() };
    api.startTest({
      title: `MAP-style practice · ${M.test}`, total: M.items,
      next: () => {
        const it = MapCore.pickNext(run.pool, run.used, run.answers, run.est, GOALS.map((g) => g.id), MAPBANK.MIN_FRESH);
        if (!it) return null;
        run.used.add(it.key); run.cur = it;
        return it.q;
      },
      onAnswer: (q, ok) => {
        const it = run.cur;
        run.answers.push({ b: it.b, c: it.c, ok, goal: it.goal, where: it.where, fresh: it.fresh, std: q.std });
        run.est = MapCore.estimate(run.answers, run.prior.mean, run.prior.sd).theta;
      },
      finish: (Q) => {
        const rep = MapCore.report(run.answers, run.prior, M.norms[run.term], GOALS.map((g) => g.id));
        const secs = Math.round((Date.now() - run.started) / 1000);
        const missedWhere = {};
        run.answers.forEach((a) => { if (!a.ok) missedWhere[a.where] = (missedWhere[a.where] || 0) + 1; });
        const result = { id: Math.random().toString(36).slice(2, 10), kind: 'map', at: Date.now(), term: run.term, grade: M.grade, ...rep, secs,
          fresh: run.answers.filter((a) => a.fresh).length, missedWhere, nearWhere: nearSkills(rep.rit), slowdowns: Q.slowdowns || 0 };
        api.setP((p) => { p.tests = [...(p.tests || []), result]; });
        api.touchDay((d) => { d.rounds++; d.q += rep.n; d.correct += rep.correct; });
        api.save();
        run = null;
        lastResult = result;
        return 'mapReport';
      },
    });
  }

  // Practice levels whose questions sit just above the estimate (the "zone" to practice next).
  function nearSkills(rit) {
    const out = [];
    api.SUBJ().forEach((s) => s.skills.forEach((k) => k.levels.forEach((L, l) => {
      const sample = L.gen({}).filter((q) => q.rit != null);
      if (!sample.length) return;
      const b = sample.reduce((t, q) => t + q.rit, 0) / sample.length;
      if (b >= rit - 2 && b <= rit + 10) out.push({ s: s.id, k: k.id, l, b: Math.round(b) });
    })));
    return out.sort((a, b) => a.b - b.b).slice(0, 12);
  }

  // ---------- report ----------
  function bandBar(r, norm) {
    const lo = BLO, hi = BHI, W = 520, x = (v) => 20 + ((Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * (W - 40);
    let body = `<line x1="20" y1="40" x2="${W - 20}" y2="40" class="fg-stroke"/>`;
    for (let v = lo; v <= hi; v += 20) body += `<line x1="${x(v)}" y1="34" x2="${x(v)}" y2="46" class="fg-stroke"/><text x="${x(v)}" y="64" class="fg-text" font-size="13" text-anchor="middle">${v}</text>`;
    if (norm) body += `<line x1="${x(norm.mean)}" y1="14" x2="${x(norm.mean)}" y2="52" class="ru-guide"/><text x="${x(norm.mean)}" y="11" class="fg-text" font-size="11" text-anchor="middle">${esc(AVG)} ${norm.mean}</text>`;
    body += `<rect x="${x(r.lo)}" y="30" width="${x(r.hi) - x(r.lo)}" height="20" rx="6" class="band"/><circle cx="${x(r.rit)}" cy="40" r="6" class="tf-a"/>`;
    return `<svg viewBox="0 0 ${W} 72" class="band-svg" role="img" aria-label="Estimated band ${r.lo} to ${r.hi}">${body}</svg>`;
  }
  // Goal areas as stacked rows (fits a phone): name, band, rating, and how many were right.
  function goalTable(r) {
    return `<div class="goal-list">${GOALS.map((g) => { const x = r.goals[g.id]; return x ? `<div class="goal-row"><span class="gname">${g.icon} ${esc(g.name)}</span><span class="gband">${x.rit - x.sem}–${x.rit + x.sem}</span>
      <span class="gmeta">${chip(x.desc)}<span>${x.correct} of ${x.n} right</span></span></div>` : ''; }).join('')}</div>`;
  }
  function nextSteps(r) {
    // Weakest goal area first; within it, skills just above the estimate, then skills with misses.
    const order = GOALS.map((g) => g.id).sort((a, b) => (r.goals[a] ? r.goals[a].rit : 999) - (r.goals[b] ? r.goals[b].rit : 999));
    const picks = [];
    for (const gid of order) {
      const s = api.subj(gid);
      if (!s) continue;
      const zone = (r.nearWhere || []).filter((n) => n.s === gid);
      const missed = Object.entries(r.missedWhere || {}).map(([w, n]) => ({ k: w.split('.')[0], l: +w.split('.')[1], n })).filter((m) => s.skills.some((k) => k.id === m.k)).sort((a, b) => b.n - a.n);
      [...zone, ...missed].forEach((p) => { if (picks.length < 4 && !picks.some((x) => x.k === p.k && x.l === p.l)) picks.push({ s: gid, k: p.k, l: p.l }); });
    }
    return picks.map((p) => { const k = api.skillOf(p.s, p.k); return k ? `<li><button class="link" data-act="start" data-s="${p.s}" data-k="${p.k}" data-l="${p.l}"><span class="dot s-${api.subj(p.s).color}"></span>${esc(k.name)} · ${esc(api.LEVEL_NAMES[p.l].long)}</button></li>` : ''; }).join('');
  }
  function report() {
    const r = lastResult || latest();
    if (!r) return home();
    const norm = M.norms[r.term];
    const prev = tests().filter((t) => t.at < r.at);
    const before = prev[prev.length - 1];
    return `<section class="card stack report">
      <div class="row-between"><h1 class="page-h">Practice test results</h1><span class="tag-unofficial">Unofficial estimate</span></div>
      <p class="muted">${MapCore.TERM_NAME[r.term]} · ${new Date(r.at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · ${r.correct} of ${r.n} right</p>
      <div class="big-band"><span class="band-num">${r.lo}–${r.hi}</span><span class="muted">estimated practice band</span></div>
      ${bandBar(r, norm)}
      ${r.pct ? `<p>That is about the <b>${r.pct}th percentile</b> for ${esc(GROUP)} in the ${MapCore.TERM_NAME[r.term].toLowerCase()} ${chip(r.desc)}.</p>` : ''}
      ${before ? `<p>Change since your last practice test: <b>${r.rit - before.rit >= 0 ? '+' : ''}${r.rit - before.rit}</b> (typical ${growthTypical(before.term, r.term)}).</p>` : ''}
      <h2>Goal areas</h2>
      ${goalTable(r)}
      <h2>Practice next</h2>
      <ul class="plain">${nextSteps(r) || `<li class="muted">Great work! Keep exploring the ${esc(api.LEVEL_NAMES[2].long)} levels.</li>`}</ul>
      <details class="fine"><summary>For grown-ups: how this is worked out</summary>
        <p>Time taken: ${fmtMin(r.secs)} (not shown during the test). ${r.fresh} of ${r.n} questions came from this app's own MAP-style skills.</p>
        ${r.slowdowns ? `<p>🦥 Slow-down reminders: ${r.slowdowns} (answers given in under 3 seconds, twice in a row). Very fast answers can make the estimate too low; like the real MAP test, the reminder asks the student to take their time.</p>` : ''}
        <p>The band is an estimate from an adaptive practice test, on a RIT-like scale: each question has an estimated difficulty, and the test picks harder or easier questions after each answer. The band adds extra room because the difficulties are estimates. Percentiles are approximate, worked out from ${M.norms.fall.table ? 'the published percentile tables' : 'the published means and standard deviations'} in ${esc(M.normsSource)}.${M.normsNote ? ' ' + esc(M.normsNote) : ''} Goal-area ratings use NWEA's percentile bands (Low under 21, LoAvg 21–40, Avg 41–60, HiAvg 61–80, High over 80) but are based on far fewer questions, so treat them as a rough guide.</p>
        <p>${esc(APP.disclaimer)}</p></details>
      <div class="row"><button class="btn primary" data-act="nav" data-to="home">Done</button><button class="btn" data-act="nav" data-to="mapHistory">My growth</button></div>
    </section>`;
  }
  function growthTypical(from, to) {
    const g = M.growth;
    if (from === 'fall' && to === 'winter') return `+${g.fallToWinter} from fall to winter`;
    if (from === 'winter' && to === 'spring') return `+${g.winterToSpring} from winter to spring`;
    if (from === 'fall' && to === 'spring') return `+${g.fallToSpring} from fall to spring`;
    return 'about the same within a season';
  }

  // ---------- growth over time ----------
  function growthChart(list) {
    if (!list.length) return '';
    const W = 560, H = 220, pad = 40, lo = Math.min(...list.map((t) => t.lo), M.chartLo || 150) - 5, hi = Math.max(...list.map((t) => t.hi), M.norms.spring.mean + 10) + 5;
    const x = (i) => pad + (list.length === 1 ? (W - 2 * pad) / 2 : (i / (list.length - 1)) * (W - 2 * pad));
    const y = (v) => H - 30 - ((v - lo) / (hi - lo)) * (H - 60);
    let body = '';
    for (let v = Math.ceil(lo / 10) * 10; v <= hi; v += 10) body += `<line x1="${pad}" y1="${y(v)}" x2="${W - 10}" y2="${y(v)}" class="gr-grid"/><text x="${pad - 6}" y="${y(v) + 4}" class="fg-text" font-size="11" text-anchor="end">${v}</text>`;
    list.forEach((t, i) => {
      const n = M.norms[t.term];
      body += `<line x1="${x(i) - 14}" y1="${y(n.mean)}" x2="${x(i) + 14}" y2="${y(n.mean)}" class="ru-guide"/>`;
      body += `<rect x="${x(i) - 6}" y="${y(t.hi)}" width="12" height="${y(t.lo) - y(t.hi)}" rx="4" class="band"/>`;
      if (i) body += `<line x1="${x(i - 1)}" y1="${y(list[i - 1].rit)}" x2="${x(i)}" y2="${y(t.rit)}" class="jp-arc"/>`;
      body += `<circle cx="${x(i)}" cy="${y(t.rit)}" r="5" class="tf-a"/><text x="${x(i)}" y="${H - 10}" class="fg-text" font-size="11" text-anchor="middle">${MapCore.TERM_NAME[t.term]} ${new Date(t.at).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="growth-svg" role="img" aria-label="Practice estimates over time">${body}</svg><p class="fine">Bars: estimated band. Dashed line: the average for ${esc(GROUP)} at that time of year (${esc(M.normsShort || 'NWEA 2025 norms')}).${M.normsNote ? ' ' + esc(M.normsNote) : ''}</p>`;
  }
  function history() {
    const list = tests();
    return `<h1 class="page-h">My growth</h1>
      <section class="card">${list.length ? growthChart(list) : '<p class="muted">Take a practice test to see your growth here.</p>'}</section>
      ${list.length ? `<section class="card dash-wrap"><div class="dash-scroll"><table class="dash"><thead><tr><th>Date</th><th>Season</th><th>Estimated band</th><th>Compared with ${esc(GROUP)}</th><th>Right</th><th>Time</th></tr></thead><tbody>
        ${[...list].reverse().map((t) => `<tr><td>${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td><td>${MapCore.TERM_NAME[t.term]}</td><td class="num"><b>${t.lo}–${t.hi}</b></td><td>${chip(t.desc)}</td><td class="num">${t.correct}/${t.n}</td><td class="num">${fmtMin(t.secs)}</td></tr>`).join('')}
      </tbody></table></div></section>` : ''}
      <p class="fine">${esc(APP.disclaimer)}</p>`;
  }

  // ---------- dashboard (grown-ups) ----------
  function dashboard(rows) {
    const withTests = rows.filter((r) => (r.st.prog.data.tests || []).some((t) => t.kind === 'map'));
    if (!withTests.length) return '';
    return `<h2 class="sec">MAP-style practice tests</h2><section class="card dash-wrap"><div class="dash-scroll"><table class="dash">
      <thead><tr><th>Student</th><th>Latest</th><th>Season</th><th>Band</th><th>${esc(GROUP_SHORT)}</th>${GOALS.map((g) => `<th>${esc(g.name)}</th>`).join('')}<th>Growth</th><th>Time</th></tr></thead>
      <tbody>${withTests.map(({ st }) => {
        const ts = (st.prog.data.tests || []).filter((t) => t.kind === 'map').sort((a, b) => a.at - b.at), t = ts[ts.length - 1], first = ts[0];
        return `<tr><td><b>${esc(st.name)}</b></td><td>${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td><td>${MapCore.TERM_NAME[t.term]}</td><td class="num"><b>${t.lo}–${t.hi}</b></td><td>${chip(t.desc)}</td>
          ${GOALS.map((g) => `<td>${t.goals[g.id] ? chip(t.goals[g.id].desc) : '–'}</td>`).join('')}<td class="num">${ts.length > 1 ? `${t.rit - first.rit >= 0 ? '+' : ''}${t.rit - first.rit}` : '–'}</td><td class="num">${fmtMin(t.secs)}</td></tr>`;
      }).join('')}</tbody></table></div></section><p class="fine">Unofficial practice estimates, not RIT scores.</p>`;
  }
  function studentView() { return tests().length ? `<section class="card"><h2>MAP-style practice tests</h2>${growthChart(tests())}</section>` : ''; }

  return {
    homeTop: home, dashboard, studentView,
    screens: { mapIntro: intro, mapReport: report, mapHistory: history },
    acts: {
      mapIntro: () => api.go('mapIntro'),
      mapTerm: (ds) => { term = ds.t; api.render(); },
      mapStart: () => begin(),
    },
  };
});
