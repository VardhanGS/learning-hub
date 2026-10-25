// Simulation check of the MAP-style adaptive test (core/modes/map-core.js) on an app's real question bank.
// Simulated students of known ability answer by the same model the test assumes, so this checks the machinery:
// does the estimate land near the true ability, is the reported band honest, are goal areas balanced,
// and how far up and down the bank reaches. (It cannot check that the hand-set difficulties are right.)
// Usage: node tools/maptest.js <appId> [testsPerLevel=150]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const appId = process.argv[2];
const N = +(process.argv[3] || 150);
const ctx = { console, window: {}, CSS: { escape: (s) => s } };
ctx.window = ctx;
vm.createContext(ctx);
const dataPath = (f) => (f.includes(':') ? `apps/${f.split(':')[0]}/data/${f.split(':')[1]}` : `apps/${appId}/data/${f}`);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
load(`apps/${appId}/config.js`);
vm.runInContext('var APP = window.APP;', ctx);
['core/speech.js', 'core/U.js', 'core/engine/fig.js', 'core/modes/map-core.js'].forEach(load);
for (const f of ctx.APP.data) load(dataPath(f));
vm.runInContext('this.U = U; this.MapCore = MapCore; this.MAPBANK = typeof MAPBANK === "undefined" ? null : MAPBANK;', ctx);
const { U, MapCore, MAPBANK, APP } = ctx;
const M = APP.features.map;
const goals = M.goals.map((g) => g.id);

const pool0 = MapCore.buildPool(MAPBANK.levels, 4, U.qkey);
const bs = pool0.map((it) => it.b).sort((a, b) => a - b);
console.log(`${appId}: pool of ${pool0.length} items, difficulty ${bs[0]}–${bs[bs.length - 1]}, by goal: ${goals.map((g) => `${g} ${pool0.filter((it) => it.goal === g).length}`).join(', ')}`);

const norm = M.norms.fall;
const prior = { mean: norm.mean, sd: 20 };
const rows = [];
let problems = 0;
for (const theta of [150, 160, 170, 180, 190, 200, 210, 220]) {
  let err = 0, abs = 0, inBand = 0, semSum = 0, balanceBad = 0, freshMin = 1;
  for (let k = 0; k < N; k++) {
    const used = new Set(), answers = [];
    let est = prior.mean;
    for (let i = 0; i < M.items; i++) {
      const it = MapCore.pickNext(pool0, used, answers, est, goals, MAPBANK.MIN_FRESH);
      if (!it) break;
      used.add(it.key);
      const ok = Math.random() < MapCore.pRight(theta, it);
      answers.push({ b: it.b, c: it.c, ok, goal: it.goal, where: it.where, fresh: it.fresh });
      est = MapCore.estimate(answers, prior.mean, prior.sd).theta;
    }
    const r = MapCore.report(answers, prior, norm, goals);
    err += r.rit - theta; abs += Math.abs(r.rit - theta); semSum += r.sem;
    if (theta >= r.lo && theta <= r.hi) inBand++;
    freshMin = Math.min(freshMin, answers.filter((a) => a.fresh).length / answers.length);
    const counts = goals.map((g) => answers.filter((a) => a.goal === g).length);
    if (Math.max(...counts) - Math.min(...counts) > 1) balanceBad++;
  }
  const row = { theta, bias: +(err / N).toFixed(1), meanAbsErr: +(abs / N).toFixed(1), avgSEM: +(semSum / N).toFixed(1), bandCoverage: Math.round(100 * inBand / N) + '%', unbalanced: balanceBad, minNewShare: Math.round(100 * freshMin) + '%' };
  rows.push(row);
}
console.table(rows);
// Where the bank has enough items (inside its difficulty range), the estimate should be close and the band honest.
const lo = bs[Math.floor(bs.length * 0.05)], hi = bs[Math.floor(bs.length * 0.95)];
rows.filter((r) => r.theta >= lo && r.theta <= hi).forEach((r) => {
  if (Math.abs(r.bias) > 3) { problems++; console.log(`✗ bias ${r.bias} at ${r.theta}`); }
  if (parseInt(r.bandCoverage) < 55) { problems++; console.log(`✗ band covers the true ability only ${r.bandCoverage} of the time at ${r.theta}`); }
  if (parseInt(r.minNewShare) < 60) { problems++; console.log(`✗ a test had only ${r.minNewShare} new questions at ${r.theta}`); }
  if (r.unbalanced) { problems++; console.log(`✗ goal areas unbalanced in ${r.unbalanced} tests at ${r.theta}`); }
});
console.log(`Bank's middle 90% of difficulty: ${lo}–${hi}. Outside it, estimates lean toward the edge of the bank.`);
console.log(problems ? `${problems} problem(s)` : '✓ adaptive test behaves as designed inside the bank\'s range');
process.exit(problems ? 1 : 0);
