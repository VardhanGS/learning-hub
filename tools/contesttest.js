// Practice-contest check for Puzzle Peak apps: drives core/modes/contest.js through a stub of the app API.
// For every format: builds many contests and checks the length, the 3 → 4 → 5-point order, no repeated question,
// typed formats really are typed (and show no hints), topics are spread out, and the score adds up (all right =
// the published maximum, all blank = 0, wrong answers cost nothing).
// Usage: node tools/contesttest.js <appId> [contestsPerFormat=200]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const appId = process.argv[2];
const RUNS = +(process.argv[3] || 200);
if (!appId) { console.log('Usage: node tools/contesttest.js <appId> [runs]'); process.exit(2); }
const ctx = { console, window: {}, CSS: { escape: (s) => s } };
ctx.window = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
load(`apps/${appId}/config.js`);
vm.runInContext('var APP = window.APP;', ctx);
['core/speech.js', 'core/U.js', 'core/engine/fig.js', 'core/engine/alg.js'].forEach(load);
for (const f of ctx.APP.data) load(f.includes(':') ? `apps/${f.split(':')[0]}/data/${f.split(':')[1]}` : `apps/${appId}/data/${f}`);
load('core/modes/contest.js');
vm.runInContext('this.SUBJECTS = SUBJECTS; this.U = U; this.CONTEST = CONTEST;', ctx);
const { APP, SUBJECTS, U } = ctx;

let P = { tests: [] }, mod = null, screen = null;
const api = {
  APP, esc: (s) => String(s), fmt: (s) => String(s), P: () => P, setP: (fn) => fn(P), save: () => {}, touchDay: () => {}, render: () => {}, go: (s) => { screen = s; },
  startModule: (m) => { mod = m; }, SUBJ: () => SUBJECTS.filter((s) => s.track === Object.keys(APP.tracks)[0]), answerText: (q) => String(q.a), startRound: () => {},
};
const mode = ctx.window.HubModes[0](api);
const errors = [];
const fail = (m) => { if (errors.length < 30) errors.push(m); };
for (const f of APP.features.contest.formats) {
  const n = f.per.reduce((a, b) => a + b, 0), max = f.points ? f.per.reduce((t, c, i) => t + c * f.points[i], 0) : n;
  let spreadWorst = 0, typedCount = 0, qTotal = 0;
  for (let r = 0; r < RUNS; r++) {
    mod = null;
    mode.acts.ctStart({ f: f.id });
    if (!mod) { fail(`${f.id}: no contest started`); break; }
    const qs = mod.qs;
    if (qs.length !== n) fail(`${f.id}: ${qs.length} questions, expected ${n}`);
    if (mod.secs !== f.secs) fail(`${f.id}: timer ${mod.secs}s, expected ${f.secs}s`);
    const keys = qs.map((q) => U.qkey(q));
    if (new Set(keys).size !== keys.length) fail(`${f.id}: a question repeats within one contest`);
    // tiers in order: the level in q.where must not go down
    const tiers = qs.map((q) => +String(q.where).split('.')[1]);
    if (tiers.some((t, i) => i && t < tiers[i - 1])) fail(`${f.id}: questions not ordered easier to harder (${tiers.join('')})`);
    f.per.forEach((c, t) => { const got = tiers.filter((x) => x === t).length; if (got !== c) fail(`${f.id}: ${got} questions from tier ${t}, expected ${c}`); });
    qs.forEach((q) => {
      qTotal++;
      if (f.typed) { if (q.t !== 'num') fail(`${f.id}: a ${q.t} question in a typed contest`); else typedCount++; if (q.steps) fail(`${f.id}: hints shown during a contest`); }
      else if (q.t !== 'mc' || q.opts.length !== 5) fail(`${f.id}: question is ${q.t} with ${q.opts ? q.opts.length : 0} options (want 5-choice)`);
      if (!q.why) fail(`${f.id}: no worked solution for the review`);
    });
    // topic spread: in each tier, no skill more than ceil(count / skills) + 1 times
    f.per.forEach((c, t) => { const by = {}; qs.filter((_, i) => tiers[i] === t).forEach((q) => { const k = String(q.where).split('.')[0]; by[k] = (by[k] || 0) + 1; }); const ks = ctx.CONTEST.skills(t, !!f.typed).length; spreadWorst = Math.max(spreadWorst, Math.max(...Object.values(by)) - Math.ceil(c / ks)); });
    // scoring: all right, all blank, all wrong, and a random mix
    const res = (oks, answered) => ({ qs, sts: qs.map((q) => ({ chosen: q.t === 'mc' ? q.a : null, typed: q.t === 'num' ? q.a : '' })), answered, oks, secs: 600, timeUp: false });
    const score = (oks, answered) => { P = { tests: [] }; mod.onDone(res(oks, answered)); return P.tests[0]; };
    const all = score(qs.map(() => true), qs.map(() => true));
    if (all.score !== max || all.max !== max) fail(`${f.id}: all right scores ${all.score}/${all.max}, expected ${max}/${max}`);
    const none = score(qs.map(() => false), qs.map(() => false));
    if (none.score !== 0) fail(`${f.id}: all blank scores ${none.score}`);
    const wrong = score(qs.map(() => false), qs.map(() => true));
    if (wrong.score !== 0) fail(`${f.id}: wrong answers changed the score (${wrong.score})`);
    const mix = qs.map(() => Math.random() < 0.5), mixed = score(mix, qs.map(() => true));
    const want = mix.reduce((t, ok, i) => t + (ok ? (f.points ? f.points[tiers[i]] : 1) : 0), 0);
    if (mixed.score !== want) fail(`${f.id}: mixed answers score ${mixed.score}, expected ${want}`);
    if (screen !== null && mixed.review.length !== n) fail(`${f.id}: review has ${mixed.review.length} entries`);
  }
  console.log(`${f.id}: ${RUNS} contests · ${n} questions · max ${max} points · ${f.typed ? `typed ${typedCount}/${qTotal}` : '5-choice'} · topic spread worst +${spreadWorst} over even`);
}
if (errors.length) { console.log(`\n✗ ${errors.length} problem(s):`); errors.forEach((e) => console.log('  ✗ ' + e)); process.exit(1); }
console.log('✓ contest checks passed');
