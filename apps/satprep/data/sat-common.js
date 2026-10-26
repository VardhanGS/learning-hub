// Shared pieces for SAT Prep. Every question is original. b = an estimated difficulty on the 200–800 section scale
// (set by hand, NOT College Board data); goal = the content domain. Formats follow the published digital SAT:
// Reading and Writing is all four-option multiple choice with one short passage (25–150 words) per question;
// Math is about 75% four-option multiple choice and about 25% typed answers (up to 6 characters, a leading minus
// sign allowed). Some passages describe invented people, places, and studies.
const SAT = (() => {
  const nz = (lo, hi) => U.intWhere(lo, hi, (v) => v !== 0);
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  function frac(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; }
  // Level bands on the 200–800 scale: Starter, Star, Challenge.
  const BAND = [[300, 480], [470, 630], [610, 790]];
  // a difficulty inside the level's band: the generator's hint k (0 easy … 1 hard) mixed with some randomness
  const bAt = (level, k = Math.random()) => { const t = Math.max(0, Math.min(1, 0.5 * k + 0.5 * Math.random())); return Math.round((BAND[level][0] + t * (BAND[level][1] - BAND[level][0])) / 10) * 10; };
  const tag = (q, std, b, goal) => {
    if (q.miss) for (const k of Object.keys(q.miss)) if (k === q.a || (q.opts && !q.opts.includes(k)) || (q.t === 'num' && N.eq(N.parse(k), N.parse(q.a)))) delete q.miss[k];
    return Object.assign(q, { std, b, goal });
  };
  const fx = (s) => String(s).replace(/-(?=\d)/g, '−');
  // Four-option multiple choice: the answer and three different wrong choices (taken in order from `wrongs`,
  // topped up by `fill()` when two wrong choices turn out the same).
  // Wrong choices a student would never pick are left out: float tails like 8.333333333333334, and negative
  // numbers when the question asks for something that cannot be negative (a length, a count, a price, a mean …).
  const NONNEG = /\b(length|radius|hypotenuse|leg|side|mean|median|range|degrees|measure|tickets?|speed|feet|inches|miles|meters|centimeters|grams|kilograms|cost|price|dollars|area|volume|how many|probability|percent|cups|liters|gallons|hours|minutes|seconds|mass|population|riders|students)\b|%|°/i;
  const asNum = (w) => { const p = N.parse(String(w).replace(/−/g, '-')); return p ? p.n / p.d : NaN; };
  function okWrong(q, A, w) {
    if (/\d\.\d{5,}/.test(w)) return false;
    if (NONNEG.test(String(q).replace(/⟪[^⟫]*⟫/g, ' ')) && asNum(A) >= 0 && asNum(w) < 0) return false;
    return true;
  }
  function mc4(q, a, wrongs, extra = {}, fill = null) {
    const A = fx(a), ws = [];
    for (const w of wrongs.map(fx)) if (w !== A && !ws.includes(w) && ws.length < 3 && okWrong(q, A, w)) ws.push(w);
    let g = 0; while (ws.length < 3 && fill && g++ < 60) { const w = fx(fill()); if (w !== A && !ws.includes(w) && okWrong(q, A, w)) ws.push(w); }
    if (ws.length < 3) return null;
    const miss = extra.miss ? Object.fromEntries(Object.entries(extra.miss).map(([k, v]) => [fx(k), v])) : undefined;
    return { t: 'mc', q, a: A, opts: U.shuffle([A, ...ws]), ...extra, ...(miss ? { miss } : {}) };
  }
  // Typed ("student-produced") answer: shown as a number keypad with minus, fraction, and decimal keys. About 25% of
  // real SAT Math questions are typed, so a typed-answer generator gives a four-choice version about half the time
  // (wrong choices: the known mistakes first, then nearby values).
  function spr(q, a, extra = {}) {
    const A = String(a);
    if (Math.random() < 0.55) {
      const v = N.parse(A), num = v ? v.n / v.d : NaN;
      const fill = () => {
        if (!v) return null;
        // a decimal answer (7.5) gets decimal wrong choices, so the format does not give the answer away
        if (v.d !== 1) return A.includes('.') ? String(num + 0.5 * nz(-4, 4)) : frac(v.n + nz(-3, 3), v.d + U.int(-1, 3) || 1);
        const r = U.int(1, 6);
        return String(r === 1 ? num + nz(-3, 3) : r === 2 ? -num : r === 3 ? num * 2 : r === 4 ? num + 10 * nz(-2, 2) : r === 5 ? Math.round(num / 2) : num + nz(-9, 9));
      };
      const o = mc4(q, A, Object.keys(extra.miss || {}), extra, fill);
      if (o && new Set(o.opts.map((x) => { const p = N.parse(x); return p ? `${p.n}/${p.d}` : x; })).size === 4) return o;
    }
    return { t: 'num', q, a: A, keys: 'neg,frac,dec', spr: true, ...extra };
  }
  // A short passage shown beside the question (no title, like the real test).
  const passage = (text, fig = null) => ({ kind: 'Passage', title: '', text, ...(fig ? { fig } : {}) });
  const words = (t) => String(t).replace(/Text [12]\n/g, '').split(/\s+/).filter(Boolean).length;
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);
  const lv = (title, std, desc, fns) => ({ title, std, desc, gen: () => { const out = [], seen = new Set(); let g = 0; while (out.length < 8 && g++ < 400) { const q = U.pick(fns)(); if (!q) continue; const k = U.qkey(q); if (seen.has(k)) continue; seen.add(k); out.push(q); } return out; } });
  return { BAND, bAt, tag, fx, mc4, spr, passage, words, pic, lv, nz, gcd, frac };
})();
const SAT_SKILLS = [];
