// MAP Growth–style adaptive practice test: the scoring math, with no screen code (so tools/maptest.js can test it).
// This is NOT NWEA's algorithm and does not produce RIT scores. It is a simple, standard adaptive design:
//   - each question has an estimated difficulty b on a RIT-like scale (set by hand in the content files)
//   - the chance of a right answer for a student at ability θ is  c + (1 − c) / (1 + e^(−(θ − b) / 10))
//     (10 points = 1 logit, like the RIT scale; c is the chance of guessing a multiple-choice answer)
//   - ability is estimated after every answer (EAP: the average over a grid, weighted by the likelihood × a prior)
//   - the next question is the one whose difficulty is closest to the current estimate, keeping goal areas balanced
const MapCore = (() => {
  const GRID = []; for (let t = 100; t <= 300; t += 0.5) GRID.push(t);
  const logistic = (x) => 1 / (1 + Math.exp(-x));
  const guess = (q) => (q.t === 'mc' ? 1 / (q.opts || [1, 2, 3, 4]).length : q.t === 'multi' ? 0.05 : 0);
  const pRight = (theta, item) => item.c + (1 - item.c) * logistic((theta - item.b) / 10);

  // EAP estimate and its standard error from answered items [{b, c, ok}], with a normal prior.
  function estimate(answers, priorMean, priorSD) {
    let wsum = 0, m1 = 0, m2 = 0;
    for (const t of GRID) {
      let lw = -0.5 * ((t - priorMean) / priorSD) ** 2;
      for (const a of answers) { const p = pRight(t, a); lw += Math.log(a.ok ? p : 1 - p); }
      const w = Math.exp(lw);
      wsum += w; m1 += w * t; m2 += w * t * t;
    }
    const mean = m1 / wsum;
    return { theta: mean, sem: Math.sqrt(Math.max(0, m2 / wsum - mean * mean)) };
  }

  // Normal distribution helpers (percentiles are an approximation from NWEA's published means and SDs).
  function normCdf(z) { const t = 1 / (1 + 0.2316419 * Math.abs(z)); const d = 0.3989423 * Math.exp(-z * z / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; }
  // With a published percentile table (norm.table = scores at the 5th, 10th, … 95th percentiles), read the percentile
  // from it by straight-line interpolation; outside the table (or without one) use the normal curve.
  const PCTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  function percentile(rit, norm) {
    const T = norm.table;
    if (T && rit >= T[0] && rit <= T[T.length - 1]) {
      let i = 0; while (i < T.length - 2 && rit > T[i + 1]) i++;
      const f = T[i + 1] === T[i] ? 0 : (rit - T[i]) / (T[i + 1] - T[i]);
      return Math.round(PCTS[i] + f * (PCTS[i + 1] - PCTS[i]));
    }
    return Math.max(1, Math.min(99, Math.round(100 * normCdf((rit - norm.mean) / norm.sd))));
  }
  // NWEA's achievement descriptors use these percentile bands.
  const describe = (pct) => (pct < 21 ? 'Low' : pct <= 40 ? 'LoAvg' : pct <= 60 ? 'Avg' : pct <= 80 ? 'HiAvg' : 'High');
  const DESC_LONG = { Low: 'Low', LoAvg: 'Low average', Avg: 'Average', HiAvg: 'High average', High: 'High' };

  function termOf(date = new Date()) { const m = date.getMonth(); return m >= 7 && m <= 10 ? 'fall' : m === 11 || m <= 1 ? 'winter' : 'spring'; }
  const TERM_NAME = { fall: 'Fall', winter: 'Winter', spring: 'Spring' };

  // ---- the item pool ----
  // levels: [{gen, where}] -> items [{q, b, c, goal, key, where}], several rounds per level, without duplicates.
  function buildPool(levels, rounds, qkey) {
    const seen = new Set(), pool = [];
    // A level can list all of its items (L.all, e.g. every question of every reading passage); otherwise sample rounds.
    for (const L of levels) for (const q of (L.all ? L.all() : [...Array(rounds)].flatMap(() => L.gen({})))) {
      if (q.rit == null || !q.goal) continue;
      const key = qkey(q);
      if (seen.has(key)) continue;
      seen.add(key);
      pool.push({ q, b: q.rit, c: guess(q), goal: q.goal, key, where: L.where, fresh: L.fresh !== false });
    }
    return pool;
  }

  // Next item: the goal area with the fewest questions so far (ties broken at random), then the unused item
  // whose difficulty is closest to the current estimate (random among near-ties so tests differ).
  // minFresh: the smallest share of questions that must come from the app's own (new) skills.
  function pickNext(pool, used, answers, theta, goals, minFresh = 0) {
    const count = Object.fromEntries(goals.map((g) => [g, 0]));
    answers.forEach((a) => { if (a.goal in count) count[a.goal]++; });
    const min = Math.min(...Object.values(count));
    const want = goals.filter((g) => count[g] === min);
    let free = pool.filter((it) => !used.has(it.key));
    const oldSoFar = answers.filter((a) => a.fresh === false).length;
    if (minFresh && (oldSoFar + 1) / (answers.length + 1) > 1 - minFresh) free = free.filter((it) => it.fresh);
    let cand = free.filter((it) => want.includes(it.goal));
    if (!cand.length) cand = free;
    if (!cand.length) return null;
    const dist = (it) => Math.abs(it.b - theta);
    const best = Math.min(...cand.map(dist));
    const near = cand.filter((it) => dist(it) <= best + 1.5);
    // Prefer not to repeat the same skill twice in a row.
    const last = answers.length ? answers[answers.length - 1].where : null;
    const fresh = near.filter((it) => it.where !== last);
    const list = fresh.length ? fresh : near;
    return list[Math.floor(Math.random() * list.length)];
  }

  // Final report: overall band, percentile and descriptor, and each goal area's estimate.
  function report(answers, startPrior, norm, goals) {
    const all = estimate(answers, startPrior.mean, startPrior.sd);
    // The band adds 3 points to the statistical error because the question difficulties are estimates, set by hand.
    const rit = Math.round(all.theta), sem = Math.max(5, Math.round(all.sem + 3));
    const out = { rit, sem, lo: rit - sem, hi: rit + sem, n: answers.length, correct: answers.filter((a) => a.ok).length, goals: {} };
    if (norm) { out.pct = percentile(rit, norm); out.desc = describe(out.pct); }
    for (const g of goals) {
      const mine = answers.filter((a) => a.goal === g);
      if (!mine.length) continue;
      const e = estimate(mine, startPrior.mean, startPrior.sd);
      const gr = Math.round(e.theta);
      out.goals[g] = { rit: gr, sem: Math.round(e.sem), n: mine.length, correct: mine.filter((a) => a.ok).length, ...(norm ? { pct: percentile(gr, norm), desc: describe(percentile(gr, norm)) } : {}) };
    }
    return out;
  }

  return { estimate, pRight, guess, buildPool, pickNext, report, percentile, PCTS, describe, DESC_LONG, termOf, TERM_NAME, normCdf };
})();
if (typeof module !== 'undefined') module.exports = MapCore;
