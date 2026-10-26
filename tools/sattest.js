// Simulation check of the SAT-style practice test (core/modes/sat-core.js) on an app's real question bank.
// Simulated students of known ability take each section (module 1, routing, module 2) answering by the same model the
// test assumes. Checks: is the estimate close, is the reported range honest, is routing sensible, are domain counts
// right, and how far the bank reaches. (It cannot check that the hand-set difficulties are right.)
// Usage: node tools/sattest.js <appId> [testsPerLevel=150]
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), appId = process.argv[2], N = +(process.argv[3] || 150);
const ctx = { console, window: {}, CSS: { escape: (s) => s } }; ctx.window = ctx; vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
load(`apps/${appId}/config.js`); vm.runInContext('var APP = window.APP;', ctx);
['core/speech.js', 'core/U.js', 'core/engine/fig.js', 'core/engine/alg.js', 'core/modes/sat-core.js'].forEach(load);
for (const f of ctx.APP.data) load(`apps/${appId}/data/${f}`);
vm.runInContext('this.U = U; this.SC = SatCore; this.B = SATBANK;', ctx);
const { U, SC, B, APP } = ctx, S = APP.features.sat;
const pool = SC.buildPool(B.levels, 4, U.qkey);
let problems = 0;
for (const [sec, C] of Object.entries(S.sections)) {
  const p = pool.filter((it) => it.section === sec), bs = p.map((it) => it.b).sort((a, b) => a - b);
  console.log(`\n${C.name}: pool ${p.length} items, difficulty ${bs[0]}–${bs[bs.length - 1]}`);
  const rows = [];
  for (const theta of [300, 350, 400, 450, 500, 550, 600, 650, 700, 750]) {
    let err = 0, abs = 0, inRange = 0, hard = 0, width = 0, specBad = 0;
    for (let k = 0; k < N; k++) {
      const used = new Set(), take = (items) => items.map((it) => ({ ...it, ok: Math.random() < SC.pRight(theta, it) }));
      const m1 = take(SC.buildModule(pool, used, C.spec, 'm1', { grouped: C.grouped }));
      const band = SC.route(m1.filter((a) => !a.pretest));
      const m2 = take(SC.buildModule(pool, used, C.spec, band, { grouped: C.grouped }));
      if (band === 'hard') hard++;
      const scored = [...m1, ...m2].filter((a) => !a.pretest), r = SC.sectionScore(scored);
      err += r.score - theta; abs += Math.abs(r.score - theta); width += r.hi - r.lo;
      if (theta >= r.lo && theta <= r.hi) inRange++;
      if (m1.length !== C.n || m2.length !== C.n) specBad++;
      for (const [g, c] of C.spec) if ([m1, m2].some((m) => m.filter((a) => !a.pretest && a.goal === g).length !== c)) { specBad++; break; }
    }
    rows.push({ theta, bias: +(err / N).toFixed(1), meanAbsErr: +(abs / N).toFixed(1), avgRangeWidth: Math.round(width / N), rangeCoverage: Math.round(100 * inRange / N) + '%', routedHard: Math.round(100 * hard / N) + '%', specProblems: specBad });
  }
  console.table(rows);
  rows.forEach((r) => {
    if (r.specProblems) { problems++; console.log(`✗ ${r.specProblems} modules had the wrong question counts at ${r.theta}`); }
    if (r.theta >= 350 && r.theta <= 700) {
      if (Math.abs(r.bias) > 25) { problems++; console.log(`✗ bias ${r.bias} at ${r.theta}`); }
      if (parseInt(r.rangeCoverage) < 70) { problems++; console.log(`✗ range covers the true ability only ${r.rangeCoverage} of the time at ${r.theta}`); }
    }
  });
}
console.log(problems ? `\n${problems} problem(s)` : '\n✓ practice test behaves as designed');
process.exit(problems ? 1 : 0);
