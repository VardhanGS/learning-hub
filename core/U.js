// Shared helpers for building questions. Loaded before every content file.
// Question shapes the app understands (ELA Quest's, plus the math ones):
//   mc    {t:'mc', q, opts[], a, say?, hint?, why?, passage?, miss?:{opt: explanation}}
//   sort  {t:'sort', q, bins[], items:[{w,b}]}
//   build {t:'build', q, tiles[], a, say?}
//   order {t:'order', q, parts[] (correct order), list?:bool, alts?:[[...]]}
//   tap   {t:'tap', q, words[], a:[indices]}
//   type  {t:'type', q, a:[accepted answers], say?}
//   num   {t:'num', q, a:'42' | '3/4' | '1 1/2' | '-5' | '0.25', keys?:'int'|'dec'|'frac'|'neg', simplest?:bool,
//          pre?:'$', unit?:'cm', miss?:{answer: explanation}}           number entry with an on-screen keypad
//   multi {t:'multi', q, opts[], a:[correct opts]}                       choose all that apply
//   line  {t:'line', q, min, max, step, snap?, labels?:'all'|'ends'|[values], a:number, frac?:bool}   place a point
//   shade {t:'shade', q, shape:'bar'|'circle'|'grid', parts, rows?, a:number of parts to shade}
//   clock {t:'clock', q, h, m, step?:5|1}                                set the hands
//   coins {t:'coins', q, a:cents, coins?:['q','d','n','p','b']}          make the amount with coins
// Any question may carry fig (SVG/HTML from Fig.*), meta ({kind, args} so the validator can recompute the answer),
// and the MAP tags goal, std, rit.
const U = {
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  sample(arr, n) { return U.shuffle(arr).slice(0, n); },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  uniq(arr) { return [...new Set(arr)]; },
  int(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); },
  // A random integer in [lo, hi] that passes ok(n); falls back to lo after many tries.
  intWhere(lo, hi, ok) { for (let i = 0; i < 400; i++) { const n = U.int(lo, hi); if (ok(n)) return n; } return lo; },

  // Multiple choice: one right answer plus up to `n` distractors.
  mc(q, a, pool, extra = {}, n = 3) {
    const ds = U.sample(U.uniq(pool).filter((d) => d !== a), n);
    return { t: 'mc', q, a, opts: U.shuffle([a, ...ds]), ...extra };
  },

  // Multiple choice whose wrong answers come from real mistakes. `wrongs` is [[value, why it is wrong], ...];
  // duplicates of the answer or of each other are dropped, and `fill()` tops up to n distractors with plausible numbers.
  mcMiss(q, a, wrongs, extra = {}, n = 3, fill = null) {
    const A = String(a);
    const seen = new Set([A]);
    const miss = {};
    for (const [v, why] of wrongs) {
      const s = String(v);
      if (seen.has(s) || s === '' || s === 'NaN') continue;
      seen.add(s); miss[s] = why;
      if (Object.keys(miss).length >= n) break;
    }
    let guard = 0;
    while (fill && Object.keys(miss).length < n && guard++ < 50) {
      const s = String(fill());
      if (!seen.has(s)) { seen.add(s); miss[s] = ''; }
    }
    return { t: 'mc', q, a: A, opts: U.shuffle([A, ...Object.keys(miss)]), miss, ...extra };
  },

  // Multiple choice where the options keep the given order (e.g. 1,2,3,4 or . ? !).
  mcFixed(q, a, opts, extra = {}) { return { t: 'mc', q, a, opts, ...extra }; },

  // "The [dog] ran to the [park]." -> tap question; bracketed words are correct.
  tap(q, sentence, extra = {}) {
    const raw = sentence.split(' ');
    const a = [];
    const words = raw.map((w, i) => {
      if (w.includes('[')) a.push(i);
      return w.replace(/[\[\]]/g, '');
    });
    return { t: 'tap', q, words, a, ...extra };
  },

  sort(q, bins, items, extra = {}) {
    return { t: 'sort', q, bins, items: U.shuffle(items), ...extra };
  },

  build(q, parts, extraTiles, extra = {}) {
    const a = parts.join('');
    return { t: 'build', q, a, tiles: U.shuffle([...parts, ...extraTiles]), ...extra };
  },

  order(q, parts, extra = {}) { return { t: 'order', q, parts, ...extra }; },

  // Number entry. `miss` maps a typed wrong answer to the mistake it shows.
  num(q, a, extra = {}) { return { t: 'num', q, a: String(a), ...extra }; },
  multi(q, right, wrong, extra = {}) { return { t: 'multi', q, a: [...right].map(String), opts: U.shuffle([...right, ...wrong].map(String)), ...extra }; },
  line(q, a, opts, extra = {}) { return { t: 'line', q, a, ...opts, ...extra }; },
  shade(q, a, opts, extra = {}) { return { t: 'shade', q, a, ...opts, ...extra }; },
  clock(q, h, m, extra = {}) { return { t: 'clock', q, h, m, a: `${h}:${String(m).padStart(2, '0')}`, ...extra }; },
  coins(q, cents, extra = {}) { return { t: 'coins', q, a: cents, ...extra }; },

  // Build a round of `n` questions from a list of generator functions, skipping repeats.
  mix(n, fns) {
    const out = [];
    const seen = new Set();
    let tries = 0;
    while (out.length < n && tries < n * 25) {
      tries++;
      const q = U.pick(fns)();
      if (!q) continue;
      const key = U.qkey(q);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(q);
    }
    return out;
  },
  qkey(q) { return JSON.stringify([q.q, q.a, q.say, q.words, q.items && q.items.map((i) => i.w), q.parts, q.passage && q.passage.text, q.fig]); },

  // Each bank entry is turned into a question by `make`; returns a round of n.
  fromBank(n, bank, make) { return U.sample(bank, n).map(make); },
};

// ---- exact numbers: integers, decimals, fractions, mixed numbers, negatives ----
// N.parse('1 1/2') -> {n:3, d:2}; N.parse('0.25') -> {n:1, d:4}; null if it is not a number.
const N = {
  gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; },
  make(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = N.gcd(n, d); return { n: n / g, d: d / g }; },
  parse(s) {
    s = String(s ?? '').trim().replace(/[−–]/g, '-').replace(/,/g, '').replace(/\s+/g, ' ').replace(/^\$/, '');
    if (!s) return null;
    let m;
    if ((m = s.match(/^(-)?(\d+) (\d+)\/(\d+)$/))) { const d = +m[4]; if (!d) return null; const v = N.make(+m[2] * d + +m[3], d); return m[1] ? N.make(-v.n, v.d) : v; }
    if ((m = s.match(/^(-?\d+)\/(\d+)$/))) { if (!+m[2]) return null; return N.make(+m[1], +m[2]); }
    if ((m = s.match(/^(-)?(\d*)\.(\d+)$/))) { const d = 10 ** m[3].length; const v = N.make(+(m[2] || 0) * d + +m[3], d); return m[1] ? N.make(-v.n, v.d) : v; }
    if ((m = s.match(/^-?\d+$/))) return N.make(+s, 1);
    return null;
  },
  eq(a, b) { return !!a && !!b && a.n === b.n && a.d === b.d; },
  // Is the typed text written in simplest form (3/4, not 6/8; 1 1/2, not 1 2/4)?
  simplest(s) {
    const m = String(s).trim().match(/(\d+)\/(\d+)$/);
    return !m || N.gcd(+m[1], +m[2]) === 1;
  },
  // How a value is shown: '3/4', '1 1/2' (mixed=true), '-5'.
  str(v, mixed = false) {
    if (v.d === 1) return String(v.n);
    if (mixed && Math.abs(v.n) > v.d) { const w = Math.trunc(v.n / v.d), r = Math.abs(v.n % v.d); return `${w} ${r}/${v.d}`; }
    return `${v.n}/${v.d}`;
  },
};

const SUBJECTS = [];
function addSubject(s) { s.track = s.track || Object.keys((typeof APP !== 'undefined' && APP.tracks) || { g2: 1 })[0]; SUBJECTS.push(s); }

// Level names are replaced by the player's track (APP.tracks) when the app starts.
const LEVEL_NAMES = [
  { short: 'Starter', grade: 'Level 1', long: 'Level 1 Starter' },
  { short: 'Star', grade: 'Level 2', long: 'Level 2 Star' },
  { short: 'Challenge', grade: 'Level 3', long: 'Level 3 Challenge' },
];
