// SAT-style practice test: the scoring and module-building math, with no screen code (so tools/sattest.js can test it).
// This is NOT College Board's scoring. It follows the published SHAPE of the digital SAT (two sections, two modules
// each, the second module easier or harder depending on the first, 2 unscored pretest questions per module, section
// scores 200–800 in steps of 10), and estimates a score with a simple model:
//   - each question has an estimated difficulty b on the 200–800 scale (set by hand in the content files)
//   - the chance of a right answer for a student at ability θ is  c + (1 − c) / (1 + e^(−(θ − b) / 45))
//     (c = 1/4 for four-option multiple choice, 0 for typed answers)
//   - the estimate is the average over a grid, weighted by the likelihood × a broad prior (EAP)
const SatCore = (() => {
  const GRID = []; for (let t = 150; t <= 850; t += 2.5) GRID.push(t);
  const SCALE = 45, PRIOR = { mean: 500, sd: 130 };
  const logistic = (x) => 1 / (1 + Math.exp(-x));
  const guess = (q) => (q.t === 'mc' ? 1 / (q.opts || [1, 2, 3, 4]).length : 0);
  const pRight = (theta, it) => it.c + (1 - it.c) * logistic((theta - it.b) / SCALE);
  function estimate(answers, prior = PRIOR) {
    let ws = 0, m1 = 0, m2 = 0;
    for (const t of GRID) {
      let lw = -0.5 * ((t - prior.mean) / prior.sd) ** 2;
      for (const a of answers) { const p = pRight(t, a); lw += Math.log(a.ok ? p : 1 - p); }
      const w = Math.exp(lw); ws += w; m1 += w * t; m2 += w * t * t;
    }
    const mean = m1 / ws;
    return { theta: mean, sem: Math.sqrt(Math.max(0, m2 / ws - mean * mean)) };
  }
  const round10 = (v) => Math.round(v / 10) * 10;
  const clamp = (v) => Math.max(200, Math.min(800, v));
  // A section score and an honest range around it (the extra 20 points: the difficulties are estimates).
  function sectionScore(answers) {
    const e = estimate(answers), score = clamp(round10(e.theta)), half = Math.max(30, round10(e.sem + 20));
    return { score, lo: clamp(score - half), hi: clamp(score + half), sem: Math.round(e.sem), n: answers.length, correct: answers.filter((a) => a.ok).length };
  }

  // ---- the item pool ----
  function buildPool(levels, rounds, qkey) {
    const seen = new Set(), pool = [];
    for (const L of levels) for (const q of (L.all ? L.all() : [...Array(rounds)].flatMap(() => L.gen({})))) {
      if (q.b == null || !q.goal) continue;
      const key = qkey(q);
      if (seen.has(key)) continue;
      seen.add(key);
      // One question per passage in a test (like the real SAT): items on the same text share a passage key.
      const pkey = q.passage ? 'P:' + String(q.passage.text).replace(/[⟦⟧]/g, '').replace(/\s+/g, ' ').trim().slice(-80) : null;
      pool.push({ q, b: q.b, c: guess(q), goal: q.goal, section: L.section, key, pkey, where: L.where });
    }
    return pool;
  }
  // Difficulty targets for each module: module 1 is a broad mix; module 2 is easier or harder.
  const BANDS = { m1: [300, 700], easy: [220, 560], hard: [480, 790] };
  // Pick `count` unused items of a goal area, spread across the band (so a module goes from easier to harder).
  const free = (used) => (it) => !used.has(it.key) && !(it.pkey && used.has(it.pkey));
  const take = (used, it) => { used.add(it.key); if (it.pkey) used.add(it.pkey); };
  function pickGoal(pool, used, goal, count, band) {
    const [lo, hi] = BANDS[band], ok = free(used);
    let cand = pool.filter((it) => it.goal === goal && ok(it) && it.b >= lo && it.b <= hi);
    if (cand.length < count) cand = pool.filter((it) => it.goal === goal && ok(it)); // small bank: widen
    const out = [];
    for (let k = 0; k < count && cand.length; k++) {
      const target = lo + ((k + 0.5) / count) * (hi - lo);
      cand.sort((a, b) => Math.abs(a.b - target) - Math.abs(b.b - target));
      const near = cand.slice(0, Math.min(6, cand.length)), it = near[Math.floor(Math.random() * near.length)];
      out.push(it); take(used, it); cand = cand.filter((x) => x !== it && !(x.pkey && x.pkey === it.pkey));
    }
    return out;
  }
  // spec: [[goal, count], …] in the order the goals appear; grouped = keep goals together (Reading and Writing:
  // questions on similar skills are grouped, easier to harder); otherwise sort the whole module easier to harder (Math).
  // Two extra unscored "pretest" questions are mixed in, like the real test.
  function buildModule(pool, used, spec, band, { grouped = false, pretest = 2 } = {}) {
    let items = [];
    for (const [goal, count] of spec) { const g = pickGoal(pool, used, goal, count, band); items.push(...(grouped ? g.sort((a, b) => a.b - b.b) : g)); }
    if (!grouped) items.sort((a, b) => a.b - b.b);
    let extra = pool.filter((it) => free(used)(it) && spec.some(([g]) => g === it.goal));
    for (let k = 0; k < pretest && extra.length; k++) {
      const it = extra.splice(Math.floor(Math.random() * extra.length), 1)[0]; take(used, it);
      extra = extra.filter(free(used));
      const at = 1 + Math.floor(Math.random() * Math.max(1, items.length - 1));
      items.splice(at, 0, { ...it, pretest: true });
    }
    return items;
  }
  // Route to the second module. The real threshold is not published; this uses the module-1 estimate.
  const route = (answers) => (estimate(answers).theta >= 500 ? 'hard' : 'easy');

  return { estimate, pRight, guess, sectionScore, buildPool, buildModule, route, BANDS, PRIOR, round10 };
})();
if (typeof module !== 'undefined') module.exports = SatCore;
