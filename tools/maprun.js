// In-browser check of a full MAP-style practice test (open <app>/#debug, then run this file in the page).
// A simulated student at ability THETA answers right with the model's probability, through the real screens.
// Checks: 43 questions, no feedback or XP during the test, Next is disabled until answered, the report renders
// with a band, goal areas and practice links, and the result is saved for the growth chart.
(async () => {
  const H = window.__hub, THETA = window.MAP_THETA || 185, out = { failures: [] };
  const fail = (m) => out.failures.push(m);
  const tick = () => new Promise((r) => setTimeout(r, 0));
  const before = (H.P().tests || []).length;
  H.ACT.mapIntro(); await tick();
  if (H.view().name !== 'mapIntro') fail('intro screen did not open');
  H.ACT.mapStart(); await tick();
  let n = 0, right = 0;
  while (H.view().name === 'quiz' && n < 60) {
    const Q = H.Q(), q = Q.qs[Q.i], app = document.getElementById('app');
    if (app.querySelector('.fb')) fail(`feedback shown during the test (q${n + 1})`);
    if (app.querySelector('.pill')) fail('XP shown during the test');
    if (!/MAP-style/.test(app.querySelector('.quiz-title').textContent)) fail('test title missing');
    const next = app.querySelector('[data-act="check"]');
    if (q.t !== 'clock' && next && !next.disabled) fail(`Next enabled before answering (${q.t})`);
    const ok = Math.random() < MapCore.pRight(THETA, { b: q.rit, c: MapCore.guess(q) }); // same model the test assumes
    const st = ok ? H.answerFor(q) : null;
    if (ok) Object.assign(Q.st, st);
    else { const w = H.freshSt(); if (q.t === 'mc') w.chosen = q.opts.find((o) => o !== q.a); else if (q.t === 'num') w.typed = '0'; else if (q.t === 'hot') w.sel = [q.cells.findIndex((_, i) => !q.a.includes(i))]; Object.assign(Q.st, w); } // other formats: left unanswered, which counts as wrong
    right += H.isCorrect(q, Q.st) ? 1 : 0;
    H.ACT.check(); await tick(); n++;
  }
  out.questions = n;
  if (n !== window.APP.features.map.items) fail(`test had ${n} questions`);
  if (H.view().name !== 'mapReport') fail(`ended on ${H.view().name}`);
  const rep = document.getElementById('app').textContent;
  ['estimated practice band', 'Goal areas', 'Practice next', 'Unofficial'].forEach((t) => { if (!rep.includes(t)) fail(`report is missing "${t}"`); });
  const tests = (H.P().tests || []);
  if (tests.length !== before + 1) fail('result not saved');
  const r = tests[tests.length - 1];
  out.result = { band: `${r.lo}–${r.hi}`, est: r.rit, theta: THETA, pct: r.pct, desc: r.desc, right: `${r.correct}/${r.n}`, newQs: r.fresh, goals: Object.fromEntries(Object.entries(r.goals).map(([k, v]) => [k, `${v.rit - v.sem}–${v.rit + v.sem} ${v.desc}`])) };
  if (r.correct !== right) fail(`saved ${r.correct} right but ${right} were right`);
  if (r.fresh / r.n < 0.6) fail(`only ${r.fresh} new questions`);
  H.go('mapHistory'); await tick();
  if (!document.querySelector('.growth-svg')) fail('growth chart missing');
  return out;
})();
