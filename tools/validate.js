// Content validator: generates at least 10,000 items per app and checks every one.
//   - the answer is among the options, with no duplicate options (also after math is turned into plain text)
//   - every math answer is recomputed here from the item's meta {kind, args}, independently of the generator
//   - misconception explanations only point at wrong options, never at the answer
//   - number-entry answers can actually be typed on the keypad the item shows
//   - number-line answers sit on a point of the line; shading answers fit the shape
//   - every level returns a full round with no repeats, and has a standard code and a "Watch first" lesson
// Usage: node tools/validate.js <appId> [minItems=10000]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const appId = process.argv[2];
const MIN = +(process.argv[3] || 10000);
if (!appId) { console.log('Usage: node tools/validate.js <appId> [minItems]'); process.exit(2); }

const ctx = { console, window: {}, CSS: { escape: (s) => s } };
ctx.window = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
load(`apps/${appId}/config.js`);
vm.runInContext('var APP = window.APP;', ctx);
['core/speech.js', 'core/U.js', 'core/engine/fig.js', 'core/engine/alg.js'].forEach(load);
const dataPath = (f) => (f.startsWith('elaquest:') ? `../ELAQuest/data/${f.split(':')[1]}` : f.includes(':') ? `apps/${f.split(':')[0]}/data/${f.split(':')[1]}` : `apps/${appId}/data/${f}`);
for (const f of ctx.APP.data) load(dataPath(f));
vm.runInContext('this.MAPBANK = typeof MAPBANK === "undefined" ? null : MAPBANK; this.U = U; this.SUBJECTS = SUBJECTS; this.N = N; this.MathText = MathText; this.LESSONS = typeof LESSONS === "undefined" ? {} : LESSONS;', ctx);
vm.runInContext('this.Alg = Alg;', ctx);
const { SUBJECTS, N, MathText, LESSONS, MAPBANK, Alg } = ctx;

// ---- independent answer computation ----
const R = (n, d = 1) => N.make(n, d);
const plain = (s) => MathText.plain(String(s).replace(/[⟪⟫]/g, '')).trim();
const WORD = { 2: 'half', 3: 'third', 4: 'fourth', 6: 'sixth', 8: 'eighth' };
const COMPUTE = {
  add: ([a, b]) => R(a + b),
  sub: ([a, b]) => R(a - b),
  mul: ([a, b]) => R(a * b),
  value: ([v]) => N.parse(String(v)),
  frac: ([n, d]) => R(n, d),
  count: ([k]) => R(k),
  div: ([a, b]) => (a % b === 0 ? R(a / b) : null),
  sum: (xs) => R(xs.reduce((t, x) => t + x, 0)),
  mulSub: ([g, n, x]) => R(g * n - x),
  estHundreds: ([a, b]) => R(r100(a) + r100(b)),
  round: ([n, to]) => R(Math.floor(n / to + 0.5) * to),
  len: ([s, e]) => R(e - s),
  perim: ([w, h]) => R(2 * (w + h)),
  area: ([w, h]) => R(w * h),
  sideFromPerim: ([P, w]) => R(P / 2 - w),
  cents: (list) => R(list.reduce((t, k) => t + COINV[k], 0)),
  change: ([price, qty, paid]) => R(paid - price * qty),
  pick: ([vals, i]) => R(vals[i]),
  diff: ([a, b]) => R(Math.abs(a - b)),
  countVal: ([vals, v]) => R(vals.filter((x) => x === v).length),
  size: ([vals]) => R(vals.length),
  sides: ([k]) => R(SIDES[k]),
  cube: ([prop]) => R({ faces: 6, 'corners (vertices)': 8, edges: 12 }[prop]),
  expr: ([e]) => { const v = ev(e); return Number.isInteger(v) ? R(v) : null; },
  // ---- Grade 4–5 ----
  dexpr: ([e]) => { const v = ev(e); return Number.isFinite(v) ? N.parse(String(+v.toFixed(9))) : null; },
  fexpr: ([a, op, b]) => frac(a, op, b),
  estRound: ([a, b, to, op]) => { const r = (v) => Math.floor(v / to + 0.5) * to; return R(op === '+' ? r(a) + r(b) : r(a) - r(b)); },
  roundDec: ([k, p]) => { const u = 10 ** (3 - p); return R(Math.floor(k / u + 0.5) * u, 1000); },
  rem: ([a, b]) => R(a % b),
  quot: ([a, b]) => R(Math.floor(a / b)),
  ceilDiv: ([a, b]) => R(Math.ceil(a / b)),
  pairs: ([n]) => { let k = 0; for (let i = 1; i * i <= n; i++) if (n % i === 0) k++; return R(k); },
};
// Exact fraction arithmetic for fexpr: [n, d] op [n, d].
function frac([a, b], op, [c, d]) {
  const [n, m] = op === '+' ? [a * d + c * b, b * d] : op === '−' || op === '-' ? [a * d - c * b, b * d] : op === '×' ? [a * c, b * d] : [a * d, b * c];
  return R(n, m);
}
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
// Tap-all questions: which values must be tapped (pred, param, value).
const PRED = {
  factor: (n, v) => n % v === 0, prime: (_, v) => isPrime(v), composite: (_, v) => v > 1 && !isPrime(v),
  gt: (t, v) => v > t, acute: (_, d) => d < 90, obtuse: (_, d) => d > 90 && d < 180, right: (_, d) => d === 90,
};
// Lines of symmetry, written out independently of core/engine/fig.js (folds: v up-down, h left-right, d corner to corner).
const SYMMETRY = { heart: 'v', arrow: 'v', isosceles: 'v', rectangle: 'vh', square: 'vhd', scalene: '', L: '', parallelogram: '', kite: 'v', hexagon: 'vh' };
// Names that ALWAYS describe each quadrilateral (inclusive definitions, Grade 5).
const ALWAYS = { square: ['rectangle', 'rhombus', 'parallelogram', 'quadrilateral'], rectangle: ['parallelogram', 'quadrilateral'], rhombus: ['parallelogram', 'quadrilateral'], parallelogram: ['quadrilateral'] };
const commas = (n) => Number(n).toLocaleString('en-US');
// Safe arithmetic: digits, + − × ÷, parentheses.
function ev(e) { const js = String(e).replace(/,/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'); if (!/^[\d+\-*/ ().]+$/.test(js)) return NaN; return Function(`return (${js})`)(); }
// Answers that are words or times, recomputed here.
const r100 = (n) => Math.floor(n / 100 + 0.5) * 100;
const COINV = { q: 25, d: 10, n: 5, p: 1, b: 100 };
const SIDES = { triangle: 3, square: 4, rectangle: 4, rhombus: 4, trapezoid: 4, parallelogram: 4, pentagon: 5, hexagon: 6, octagon: 8, circle: 0 };
const hm = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
const neg = (v) => String(v).replace(/-(?=\d)/g, '−');
const TEXT = {
  digit: ([n, place]) => String(n).padStart(3, '0')[{ hundreds: 0, tens: 1, ones: 2 }[place]],
  cmp: ([a, b]) => (a > b ? '>' : a < b ? '<' : '='),
  max: (xs) => String(Math.max(...xs)),
  parity: ([n]) => (n % 2 ? 'odd' : 'even'),
  arrayEq: ([r, c]) => `${Array(r).fill(c).join(' + ')} = ${r * c}`,
  time: ([h, m]) => hm(h, m),
  elapsed: ([h, m, d]) => { const t = ((h % 12) * 60 + m + d) % 720; return hm(Math.floor(t / 60) || 12, t % 60); },
  ampm: ([i]) => ['a.m.', 'a.m.', 'p.m.', 'p.m.', 'p.m.', 'p.m.', 'a.m.', 'p.m.'][i],
  shapeName: ([k]) => k,
  quadFact: ([i]) => ['square', 'rhombus', 'rectangle', 'trapezoid'][i],
  picChoice: ([k]) => 'ABCD'[k],
  exprUnit: ([e, unit]) => `${ev(e)} ${unit}`,
  cmpFrac: ([a, b]) => (a[0] / a[1] > b[0] / b[1] ? '>' : a[0] / a[1] < b[0] / b[1] ? '<' : '='),
  ruleAdd: ([seq]) => `add ${seq[1] - seq[0]}`,
  storyEq: ([kind, a, b]) => (kind === 'gain' ? `${a} + ${b} = □` : kind === 'lose' ? `${a + b} − ${b} = □` : `□ + ${b} = ${a + b}`),
  mulStory: ([g, n]) => `${g} × ${n}`,
  estFact: ([i]) => ['7 inches', '7 feet', '1 inch', '40 feet', '9 centimeters', '10 meters'][i],
  centsText: (list) => `${list.reduce((t, k) => t + COINV[k], 0)}¢`,
  dataQ: () => 'How many votes were there in all?',
  maxLabel: ([cats]) => cats.reduce((a, b) => (b[1] > a[1] ? b : a))[0],
  // ---- Algebra 1 ----
  numClass: ([n]) => { const s = String(n).replace('−', '-'); if (s === 'π') return 'irrational'; const r = s.match(/^√(\d+)$/); if (r) return Number.isInteger(Math.sqrt(+r[1])) ? 'integer' : 'irrational'; if (/…$/.test(s)) return 'rational, not an integer'; const v = N.parse(s); return v && v.d === 1 ? 'integer' : 'rational, not an integer'; },
  iPow: ([n]) => ['1', 'i', '−1', '−i'][n % 4],
  complexOp: ([a, b, op, c, d]) => { const re = op === '+' ? a + c : a - c, im = op === '+' ? b + d : b - d, I = Math.abs(im) === 1 ? 'i' : `${Math.abs(im)}i`, R = re < 0 ? '−' + -re : String(re); return im === 0 ? R : re === 0 ? `${im < 0 ? '−' : ''}${I}` : `${R} ${im < 0 ? '−' : '+'} ${I}`; },
  ineqSol: ([a, b, op, c]) => { const x = (c - b) / a, FL = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' }; return `x ${a < 0 ? FL[op] : op} ${neg(x)}`; },
  absIneq: ([c, r]) => `${neg(c - r)} < x < ${neg(c + r)}`,
  sysSol: ([a1, b1, c1, a2, b2, c2]) => { const D = a1 * b2 - a2 * b1; return `(${neg((c1 * b2 - c2 * b1) / D)}, ${neg((a1 * c2 - a2 * c1) / D)})`; },
  sysSol1: ([a1, b1, c1, a2, b2, c2]) => String((c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1)),
  sysCheck: ([S, [x, y]]) => (S.a1 * x + S.b1 * y === S.c1 && S.a2 * x + S.b2 * y === S.c2 ? 'Yes, it makes both equations true.' : 'No, it does not make both equations true.'),
  discCount: ([a, b, c]) => { const D = b * b - 4 * a * c; return D > 0 ? 'two real solutions' : D === 0 ? 'one real solution' : 'no real solutions'; },
  isFunc: ([pairs]) => (pairs.every(([x, y]) => pairs.every(([u, v]) => u !== x || v === y)) ? 'Yes, each input has exactly one output.' : 'No, an input has two different outputs.'),
  isFuncGraph: ([k]) => (k === 'v' ? 'No, a vertical line crosses it more than once.' : 'Yes, it passes the vertical line test.'),
  domRange: ([pairs, which]) => `{${[...new Set(pairs.map((p) => p[which === 'domain' ? 0 : 1]))].sort((a, b) => a - b).map(neg).join(', ')}}`,
  perpSlope: ([p, d, kind]) => { const n = kind === 'parallel' ? p : -d, dd = kind === 'parallel' ? d : p, g = N.make(n, dd); return g.d === 1 ? String(g.n) : `${g.n}/${g.d}`; },
  tableType: ([ys]) => { const d = ys.slice(1).map((y, i) => y - ys[i]), r = ys.slice(1).map((y, i) => y / ys[i]); return d.every((v) => v === d[0]) ? 'linear' : r.every((v) => v === r[0]) ? 'exponential' : 'neither'; },
  growthRate: ([b]) => (b > 1 ? `growth of ${Math.round((b - 1) * 100)}% each year` : `decay of ${Math.round((1 - b) * 100)}% each year`),
  expSolve: ([b, v]) => { for (let x = 0; x < 20; x++) if (b ** x === v) return String(x); return '?'; },
  vertex: ([h, k]) => `(${neg(h)}, ${neg(k)})`,
  axisSym: ([a, b]) => String(-b / (2 * a)),
  shift: ([h, k]) => `${h > 0 ? 'right' : 'left'} ${Math.abs(h)} and ${k > 0 ? 'up' : 'down'} ${Math.abs(k)}`,
  seqNext: ([t]) => { const d = t[1] - t[0], r = t[1] / t[0]; if (t.every((v, i) => !i || v - t[i - 1] === d)) return String(t[t.length - 1] + d); if (t.every((v, i) => !i || v / t[i - 1] === r)) return String(t[t.length - 1] * r); return '?'; },
  mean: ([xs]) => String(xs.reduce((a, b) => a + b, 0) / xs.length),
  median: ([xs]) => { const s = xs.slice().sort((a, b) => a - b), n = s.length; return String(n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2); },
  iqr: ([xs]) => { const s = xs.slice().sort((a, b) => a - b), n = s.length, med = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2); return String(med(s.slice(Math.ceil(n / 2))) - med(s.slice(0, Math.floor(n / 2)))); },
  outlierMore: ([xs, big]) => { const mean = (a) => a.reduce((p, q) => p + q, 0) / a.length, med = (a) => { const s = a.slice().sort((p, q) => p - q), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }; const dm = Math.abs(mean([...xs, big]) - mean(xs)), dd = Math.abs(med([...xs, big]) - med(xs)); return dm > dd ? 'the mean' : dd > dm ? 'the median' : 'they change by the same amount'; },
  corrSign: ([pts]) => { const mx = pts.reduce((a, p) => a + p[0], 0) / pts.length, my = pts.reduce((a, p) => a + p[1], 0) / pts.length; let sxy = 0, sx = 0, sy = 0; pts.forEach(([x, y]) => { sxy += (x - mx) * (y - my); sx += (x - mx) ** 2; sy += (y - my) ** 2; }); const r = sx && sy ? sxy / Math.sqrt(sx * sy) : 0; return r > 0.6 ? 'positive correlation' : r < -0.6 ? 'negative correlation' : Math.abs(r) < 0.3 ? 'no clear correlation' : 'unclear'; },
  // ---- MAP Algebra 1 ----
  sciNot: ([a, p, op, b, q]) => { let m = op === '×' ? a * b : a / b, e = op === '×' ? p + q : p - q; m = Math.round(m * 1e6) / 1e6; while (m >= 10) { m = Math.round(m * 1e5) / 1e6; e++; } while (m < 1) { m = Math.round(m * 1e7) / 1e6; e--; } const SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }; return `${m} × 10${String(e).split('').map((c) => SUPS[c]).join('')}`; },
  solCount: ([L, Rt]) => { const f = (x) => Alg.evalAt(Alg.parse(L), { x }) - Alg.evalAt(Alg.parse(Rt), { x }); const s = f(1) - f(0); return Math.abs(s) > 1e-9 ? 'exactly one solution' : Math.abs(f(0)) < 1e-9 ? 'infinitely many solutions' : 'no solution'; },
  sysModel: ([n, a, b, m]) => `x + y = ${n} and ${a}x + ${b}y = ${m}`,
  maxInt: ([a, b, limit]) => { let n = 0; while (b + a * (n + 1) <= limit) n++; return String(n); },
  incInt: ([a, h, want]) => `x ${(a > 0) === (want === 'increasing') ? '>' : '<'} ${neg(h)}`,
  cmpFn: ([m1, b1, xs, ys, feat]) => { const m2 = (ys[1] - ys[0]) / (xs[1] - xs[0]), b2 = ys[xs.indexOf(0)], f = feat === 'rate of change' ? m1 : b1, g = feat === 'rate of change' ? m2 : b2; return f > g ? `f has the greater ${feat}` : f < g ? `g has the greater ${feat}` : 'they are equal'; },
  crossover: ([k, c]) => { for (let x = 1; x < 50; x++) if (2 ** x > k * x + c) return String(x); return '?'; },
  // [[row 1: col 1, col 2], [row 2: col 1, col 2]] counts; joint = row 1 & col 1 of everyone; cond = col 1 within row 2
  twoWay: ([[a, b, c, d], ask]) => { const v = ask === 'joint' ? N.make(a, a + b + c + d) : ask === 'condCol' ? N.make(a, a + c) : N.make(c, c + d); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; },
  boxRead: ([F, ask]) => String(ask === 'median' ? F[2] : ask === 'IQR' ? F[3] - F[1] : F[4] - F[0]),
  corrR: ([pts]) => { const n = pts.length, mx = pts.reduce((t, p) => t + p[0], 0) / n, my = pts.reduce((t, p) => t + p[1], 0) / n; let sxy = 0, sx = 0, sy = 0; pts.forEach(([x, y]) => { sxy += (x - mx) * (y - my); sx += (x - mx) ** 2; sy += (y - my) ** 2; }); const r = sx && sy ? sxy / Math.sqrt(sx * sy) : 0; const opts = [0.95, 0.6, 0, -0.6, -0.95]; const best = opts.reduce((a, b) => (Math.abs(b - r) < Math.abs(a - r) ? b : a)); return neg(best); },
  avgRate: ([e, a, b]) => { const t = Alg.parse(e), v = N.make(Alg.evalAt(t, { x: b }) - Alg.evalAt(t, { x: a }), b - a); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; },
  // ---- SAT Prep ----
  lineFrom2: ([x1, y1, x2, y2, x3]) => String(y1 + ((y2 - y1) / (x2 - x1)) * (x3 - x1)),
  sysSum: ([a1, b1, c1, a2, b2, c2]) => { const D = a1 * b2 - a2 * b1; return String((c1 * b2 - c2 * b1) / D + (a1 * c2 - a2 * c1) / D); },
  ratExpForm: ([m, n]) => { const SUP = ['⁰', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'], RT = { 2: '√', 3: '∛', 4: '∜' }; return m === 1 ? `${RT[n]}x` : `${RT[n]}(x${SUP[m]})`; },
  sumRoots: ([a, b]) => { const v = N.make(-b, a); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; },
  oneSolC: ([a, b]) => String((b * b) / (4 * a)),
  radEq: ([a, b]) => String(b * b - a),
  expModel: ([a, p, up]) => `f(t) = ${a}(${+(up ? 1 + p / 100 : 1 - p / 100).toFixed(2)})ᵗ`,
  compose: ([f, g, x]) => String(Alg.evalAt(Alg.parse(f), { x: Alg.evalAt(Alg.parse(g), { x }) })),
  pctChain: ([up, down]) => { const v = Math.round(((100 + up) * (100 - down) / 100 - 100) * 10) / 10; return v > 0 ? `${v}% greater than` : v < 0 ? `${-v}% less than` : 'equal to'; },
  cylVol: ([r, h]) => `${r * r * h}π`,
  sphereVol: ([r]) => `${(4 * r ** 3) / 3}π`,
  trigRatio: ([a, b, c, fn]) => { const v = fn === 'sin' ? N.make(a, c) : fn === 'cos' ? N.make(b, c) : N.make(a, b); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; },
  specialTri: ([kind, s]) => (kind === '30' ? `${s}√3` : `${s}√2`),
  circleHK: ([h, k, r]) => `center (${neg(h)}, ${neg(k)}), radius ${r}`,
  arcLen: ([deg, r]) => { const v = N.make(deg * 2 * r, 360), t = v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; return (t === '1' ? 'π' : `${t}π`).replace(/^(\d+)\/(\d+)π$/, '$1π/$2').replace(/^1π\//, 'π/'); },
  circleR: ([D, E, F]) => String(Math.sqrt((D / 2) ** 2 + (E / 2) ** 2 - F)),
  // the only choice that is accurate AND fully supports the claim (recomputed from the data)
  quantEv: ([kind, g, v, name, u]) => { const o = [0, 1, 2, 3].sort((a, b) => v[b] - v[a]), s = (i) => `${v[i]} ${u}`, C = (t) => t[0].toUpperCase() + t.slice(1); return C(kind === 'max' ? `${g[o[0]]} had ${s(o[0])}, more than ${g[o[1]]}, which had the next-highest value (${s(o[1])}).` : kind === 'diff' ? `${g[o[0]]} had ${s(o[0])}, and ${g[o[3]]} had ${s(o[3])}.` : (v.every((x, i) => !i || (x - v[i - 1]) * (v[3] - v[0]) > 0) ? `It was ${s(0)} in ${g[0]}, ${s(1)} in ${g[1]}, ${s(2)} in ${g[2]}, and ${s(3)} in ${g[3]}.` : '?')); },
  transition: ([rel, a]) => a,
  radSimp: ([n]) => { let s = 1; for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) s = k; return `${s}√${n / (s * s)}`; },
  // ---- Grade 4–5 ----
  expanded: ([n]) => String(n).split('').map((d, i, s) => +d * 10 ** (s.length - 1 - i)).filter((v) => v > 0).map(commas).join(' + '),
  qr: ([a, b]) => `${commas(Math.floor(a / b))} R ${a % b}`,
  angleType: ([d]) => (d < 90 ? 'acute' : d === 90 ? 'right' : d < 180 ? 'obtuse' : 'straight'),
  lineKind: ([k]) => ({ point: 'point', segment: 'line segment', ray: 'ray', line: 'line', parallel: 'parallel lines', perpendicular: 'perpendicular lines', intersecting: 'intersecting lines that are not perpendicular' }[k]),
  timesEq: ([p, k, a]) => (p === k * a ? `${p} = ${k} × ${a}` : 'not a true comparison'),
  twoPatterns: ([ka, kb]) => `Each number in B is ${kb / ka} times the number in A.`,
  point: ([x, y]) => `(${x}, ${y})`,
  pointLabel: ([x, y, pts]) => pts.find((p) => p[0] === x && p[1] === y)[2],
  deg: ([d]) => `${d}°`,
  moneyText: ([paid, price]) => `$${((paid - price) / 100).toFixed(2)}`,
  symYN: ([k, fold]) => (SYMMETRY[k].includes(fold) ? 'Yes' : 'No'),
  patternFeature: ([s, k]) => {
    const seq = [0, 1, 2, 3, 4].map((i) => s + i * k), par = seq.map((v) => v % 2);
    if (par.every((p) => p === 1)) return 'All the numbers are odd.';
    if (par.every((p) => p === 0)) return 'All the numbers are even.';
    return par.every((p, i) => i === 0 || p !== par[i - 1]) ? 'The numbers go back and forth between odd and even.' : '?';
  },
};
// An equation like "13 − 6 = 7": is it true, and which numbers does it use?
function equation(e) {
  const m = plain(e).match(/^(\d+) ([+−-]) (\d+) = (\d+)$/);
  if (!m) return null;
  const a = +m[1], b = +m[3], c = +m[4], plus = m[2] === '+';
  return { ok: plus ? a + b === c : a - b === c, nums: [a, b, c].sort((x, y) => x - y).join(',') };
}
function lineIndex(q, a) {
  const den = q.den || 1, step = q.step || 1, v = N.parse(String(a));
  if (!v) return -1;
  const i = ((v.n * den) / v.d - q.min * den) / step;
  const n = ((q.max - q.min) * den) / step;
  return Number.isInteger(i) && i >= 0 && i <= n ? i : -1;
}
function keysAllow(q) {
  const k = q.keys || [q.a.includes('/') && 'frac', q.a.includes('.') && 'dec', q.a.includes('-') && 'neg'].filter(Boolean).join(',');
  let re = '0-9';
  if (/frac|mixed/.test(k)) re += '/ ';
  if (/dec/.test(k)) re += '.';
  if (/neg/.test(k)) re += '\\-';
  return new RegExp(`^[${re}]+$`);
}

const errors = [];
const types = {};
let total = 0;
// Problems are grouped by level and message; the first example of each is shown.
const groups = new Map();
const fail = (where, q, msg) => {
  const k = `${where}: ${msg.replace(/-?\d+(\.\d+)?/g, '#')}`;
  const g = groups.get(k) || { n: 0, ex: JSON.stringify({ t: q.t, q: q.q, a: q.a, opts: q.opts, meta: q.meta }).slice(0, 300) };
  g.n++; groups.set(k, g);
};

let noFig = 0;
const titles = new Map(), quoted = []; // passage titles seen, and prompts that quote a name
const lenStats = { n: 0, longest: 0 };
function checkItem(where, q, levelStd) {
  types[q.t] = (types[q.t] || 0) + 1;
  if (!q.fig && !(q.passage && q.passage.fig) && !['line', 'shade', 'clock', 'coins', 'hot', 'plot'].includes(q.t) && !(q.t === 'hot')) noFig++;
  // SAT passages have no title (like the real test); every other passage needs one
  if (q.passage && q.passage.title) titles.set(q.passage.title, true);
  // Part B quotations "…" (Paragraph N) must appear word for word in paragraph N of the passage
  if (q.passage && q.opts) q.opts.forEach((o) => { const m = String(o).match(/^“(.+)” \(Paragraph (\d+)\)$/); if (!m) return; const para = q.passage.text.split('\n\n')[+m[2] - 1]; if (!para || !para.replace(/\n/g, ' ').includes(m[1])) fail(where, q, `quotation is not in paragraph ${m[2]}`); });
  { const m = String(q.q).match(/"([^"]{3,60})"/g); if (m && q.passage) m.forEach((t) => quoted.push({ where, q, t: t.slice(1, -1), own: q.passage.title, text: q.passage.text })); }
  if (q.passage && ((!q.passage.title && !(ctx.APP.features && ctx.APP.features.sat)) || !q.passage.text || q.passage.text.length < 20)) fail(where, q, 'passage without a title or text');
  // answer-length bias: is the right answer the single longest choice?
  // counted only when the right answer is VISIBLY longest: at least 20% and 8 characters longer than every wrong choice
  if (q.t === 'mc' && q.opts.length >= 3 && !q.meta) { lenStats.n++; const al = plain(q.a).length, nxt = Math.max(...q.opts.filter((o) => o !== q.a).map((o) => plain(o).length)); if (al >= nxt * 1.2 && al - nxt >= 8) lenStats.longest++; }
  if (!q.q || typeof q.q !== 'string') fail(where, q, 'missing prompt');
  if (!levelStd) fail(where, q, 'level has no standard code');
  if (!MathText.spoken(q.q)) fail(where, q, 'prompt has nothing to say aloud');
  const math = ['num', 'line', 'shade', 'multi', 'clock', 'coins', 'hot', 'pop', 'expr', 'plot'].includes(q.t) || (q.t === 'mc' && q.meta);
  if (math && !q.meta) fail(where, q, 'math item without meta (answer cannot be recomputed)');

  if (ctx.APP.features && ctx.APP.features.sat) {
    if (q.t === 'mc' && q.opts.length !== 4) fail(where, q, `SAT multiple choice needs exactly 4 options (has ${q.opts.length})`);
    if (q.t === 'num' && String(q.a).length > 6) fail(where, q, `typed answer ${q.a} is longer than 6 characters`);
    if (!(q.b >= 200 && q.b <= 800)) fail(where, q, `difficulty ${q.b} is not on the 200–800 scale`);
    if (!q.goal) fail(where, q, 'no content domain');
    if (q.passage) { const wc = q.passage.text.replace(/Text [12]\n/g, '').split(/\s+/).filter(Boolean).length; if (wc < 25 || wc > 150) fail(where, q, `passage has ${wc} words (25–150)`); }
    if (!['mc', 'num'].includes(q.t)) fail(where, q, `format ${q.t} is not used on the SAT`);
  }
  if (q.t === 'mc' || q.t === 'multi') {
    if (!Array.isArray(q.opts) || q.opts.length < 2) fail(where, q, 'fewer than 2 options');
    const ps = q.opts.map(plain);
    if (new Set(q.opts).size !== q.opts.length) fail(where, q, 'duplicate options');
    // Elementary apps (voice g2/g4): negative numbers are not taught yet, so no option may be one (e.g. a filler '−5' for 22 − 17).
    if (["g2", "g4"].includes(ctx.APP.voice)) ps.forEach((o) => { if (/^\s*[-−]\s*\d/.test(o)) fail(where, q, `negative option ${o} in an elementary app`); });
    if (new Set(ps).size !== ps.length) fail(where, q, 'options look the same as plain text');
    // (2026-10-26 review) no floating-point junk like 8.333333333333334 in any choice
    ps.forEach((o) => { if (/\d\.\d{6,}/.test(o)) fail(where, q, `choice ${o} has a floating-point tail`); });
    // SAT: no negative choice when the question asks for something that cannot be negative (a length, a count, …)
    if (ctx.APP.features && ctx.APP.features.sat && q.t === 'mc') {
      const NONNEG = /\b(length|radius|hypotenuse|leg|side|mean|median|range|degrees|measure|tickets?|speed|feet|inches|miles|meters|centimeters|grams|kilograms|cost|price|dollars|area|volume|how many|probability|percent|cups|liters|gallons|hours|minutes|seconds|mass|population|riders|students)\b|%|°/i;
      const num = (o) => { const v = N.parse(o.replace(/−/g, '-')); return v ? v.n / v.d : NaN; };
      if (NONNEG.test(plain(q.q)) && num(plain(q.a)) >= 0) ps.forEach((o) => { if (num(o) < 0) fail(where, q, `negative choice ${o} where the answer cannot be negative`); });
    }
    const ans = q.t === 'mc' ? [q.a] : q.a;
    ans.forEach((a) => { if (!q.opts.includes(a)) fail(where, q, `answer ${a} is not among the options`); });
    if (q.t === 'multi' && (ans.length === 0 || ans.length === q.opts.length)) fail(where, q, 'multi-select needs at least one right and one wrong option');
    if (q.miss) Object.keys(q.miss).forEach((m) => { if (ans.includes(m)) fail(where, q, 'misconception note attached to the answer'); if (!q.opts.includes(m)) fail(where, q, `misconception note for ${m}, which is not an option`); });
    // numeric options must also differ in value (no "0.5" next to "1/2" unless intended)
    const vals = ps.map((p) => N.parse(p)).filter(Boolean);
    if (q.t === 'mc' && vals.length === ps.length && new Set(vals.map((v) => `${v.n}/${v.d}`)).size !== vals.length) fail(where, q, 'two options have the same value');
  }
  if (q.t === 'num') {
    if (!N.parse(q.a)) fail(where, q, `answer ${q.a} is not a number`);
    if (!keysAllow(q).test(q.a)) fail(where, q, `answer ${q.a} cannot be typed on this keypad`);
    if (q.miss) Object.keys(q.miss).forEach((m) => { if (N.eq(N.parse(m), N.parse(q.a))) fail(where, q, 'misconception note attached to the answer'); });
  }
  if (q.t === 'expr') {
    if (!Alg.tryParse(q.a)) fail(where, q, `answer ${q.a} cannot be parsed`);
    if (q.form && !Alg.formOk(q.a, q.form)) fail(where, q, `answer ${q.a} is not written ${q.form}`);
    if (q.gcf && Math.abs(Alg.leadNum(q.a)) !== q.gcf) fail(where, q, `answer ${q.a} does not take out the common factor ${q.gcf}`);
    const typeable = new RegExp(`^[0-9.+\\-*/^()${q.vars || 'x'}${q.sqrt ? 'r' : ''} ]+$`);
    if (!typeable.test(Alg.clean(q.a))) fail(where, q, `answer ${q.a} cannot be typed on this keypad`);
    if (q.miss) Object.keys(q.miss).forEach((m) => { if (Alg.equiv(m, q.a)) fail(where, q, 'misconception note is equivalent to the answer'); });
  }
  if (q.t === 'plot') {
    const [lo, hi] = q.range || [-6, 6], P = q.plot;
    if (P.kind === 'points') { if (P.pts.length !== (q.n || 1)) fail(where, q, 'number of points differs from n'); P.pts.forEach(([x, y]) => { if (x < lo || x > hi || y < lo || y > hi || !Number.isInteger(x) || !Number.isInteger(y)) fail(where, q, `point (${x}, ${y}) is not on the grid`); }); }
    else if (P.kind === 'line') { let k = 0; for (let x = lo; x <= hi; x++) { const y = P.m * x + P.b; if (Math.abs(y - Math.round(y)) < 1e-9 && y >= lo && y <= hi) k++; } if (k < 2) fail(where, q, 'the line has fewer than 2 grid points to tap'); if (q.n !== 2) fail(where, q, 'a line needs n = 2'); }
  }
  if (q.t === 'line') {
    if (lineIndex(q, q.a) < 0) fail(where, q, `answer ${q.a} is not on a point of the line ${q.min}..${q.max}`);
    if (!(q.max > q.min)) fail(where, q, 'bad line range');
  }
  if (q.t === 'shade') {
    if (!Number.isInteger(q.a) || q.a < 1 || q.a > q.parts) fail(where, q, `cannot shade ${q.a} of ${q.parts}`);
    if (q.shape === 'grid' && q.parts % (q.rows || 2)) fail(where, q, 'grid parts do not fill the rows');
  }

  if (q.fig && /graph:/.test(q.fig) && q.meta && Array.isArray(q.meta.args[0])) {
    const label = (q.fig.match(/aria-label="([^"]*)"/) || [])[1] || '';
    q.meta.args[0].map((v) => (Array.isArray(v) ? `${v[0]} ${v[1]}` : v)).forEach((v) => { if (!label.includes(` ${v}`)) fail(where, q, `graph does not show the value ${v} used for the answer`); });
  }
  if (q.t === 'clock' && !q.meta) fail(where, q, 'clock without meta');
  if (q.t === 'coins' && !(Number.isInteger(q.a) && q.a > 0)) fail(where, q, 'coins amount must be a whole number of cents');

  // recompute
  if (q.meta) {
    const { kind, args } = q.meta;
    if (kind === 'name') {
      const [n, d] = args;
      if (q.a !== `one ${WORD[d]}` || n !== 1) fail(where, q, `expected one ${WORD[d]}`);
      if (!q.fig || !q.fig.includes(`${d} equal parts with 1 shaded`)) fail(where, q, 'figure does not match the answer');
    } else if (kind === 'equivHalf') {
      q.a.forEach((o) => { const v = N.parse(plain(o)); if (!N.eq(v, R(1, 2))) fail(where, q, `${plain(o)} is marked right but is not 1/2`); });
      q.opts.filter((o) => !q.a.includes(o)).forEach((o) => { const v = N.parse(plain(o)); if (N.eq(v, R(1, 2))) fail(where, q, `${plain(o)} equals 1/2 but is marked wrong`); });
    } else if (kind === 'family') {
      const fam = [...args].sort((x, y) => x - y).join(',');
      q.opts.forEach((o) => {
        const e = equation(o);
        if (!e || !e.ok) fail(where, q, `option ${o} is not a true equation`);
        else if ((e.nums === fam) !== q.a.includes(o)) fail(where, q, `${o} is ${e.nums === fam ? '' : 'not '}in the family but marked the other way`);
      });
    } else if (kind === 'picChoice') {
      // Picture answer choices must all look different (compare each picture without its position).
      const pics = (q.fig.match(/<g transform="[^"]*">[\s\S]*?<\/g>/g) || []).map((g) => g.replace(/^<g transform="[^"]*">/, ''));
      if (new Set(pics).size !== pics.length) fail(where, q, 'two picture choices are identical');
      if (q.a !== 'ABCD'[args[0]]) fail(where, q, `answer ${q.a} but the right picture is ${'ABCD'[args[0]]}`);
    } else if (kind === 'hotDigit') {
      const [n, idx] = args;
      if (q.cells.join('') !== String(n) || q.a.join() !== String(idx)) fail(where, q, 'digit cells or answer do not match the number');
    } else if (kind === 'hotTrue') {
      q.cells.forEach((c, i) => { const [l, r] = c.split(' = '); const ok = ev(l) === ev(r); if (ok !== q.a.includes(i)) fail(where, q, `${c} is ${ok ? 'true' : 'false'} but marked the other way`); });
    } else if (kind === 'hotShape') {
      const [prop, names] = args;
      const has = (s) => ({ quad: SIDES[s] === 4, 'square corners': ['square', 'rectangle'].includes(s), '3 sides': SIDES[s] === 3, '4 sides': SIDES[s] === 4, '5 vertices': SIDES[s] === 5, '4 vertices': SIDES[s] === 4, 'more than 4 sides': SIDES[s] > 4, '6 sides': SIDES[s] === 6, 'no straight sides': s === 'circle' }[prop]);
      names.forEach((s, i) => { if (has(s) !== q.a.includes(i)) fail(where, q, `${s} marked wrong for "${prop}"`); });
      if (q.cells.length !== names.length) fail(where, q, 'pictures and names differ');
    } else if (kind === 'popPlace' || kind === 'popOrder' || kind === 'popEq' || kind === 'popExpanded') {
      // Try every way to fill the boxes from the tiles: the accepted fills must be exactly the correct ones.
      const k = (q.template.match(/□/g) || []).length, fills = [];
      const go = (cur, used) => { if (cur.length === k) { fills.push(cur); return; } q.tiles.forEach((t, i) => { if (!used.has(i)) go([...cur, t], new Set([...used, i])); }); };
      go([], new Set());
      const correct = (vals) => {
        if (kind === 'popPlace') return +vals[0] * 100 + +vals[1] * 10 + +vals[2] === args[0];
        if (kind === 'popOrder') return vals.map((v) => +String(v).replace(/,/g, '')).join(',') === [...args[0]].sort((a, b) => a - b).join(',');
        if (kind === 'popExpanded') { const ns = vals.map((v) => +String(v).replace(/,/g, '')); return ns.reduce((t, v) => t + v, 0) === args[0] && ns.every((v, i) => i === 0 || v < ns[i - 1]) && ns.every((v) => /^[1-9]0*$/.test(String(v))); }
        let j = 0; const eq = q.template.replace(/□/g, () => vals[j++]); const [l, r] = eq.split(' = '); return ev(l) === ev(r);
      };
      const acc = new Set(q.accept.map((a) => a.join('|')));
      fills.forEach((f) => { if (correct(f) !== acc.has(f.join('|'))) fail(where, q, `fill ${f.join(',')} is ${correct(f) ? 'right' : 'wrong'} but marked the other way`); });
      if (!q.accept.length) fail(where, q, 'no accepted answer');
      q.accept.forEach((acc) => { const left = [...q.tiles]; acc.forEach((v) => { const i = left.indexOf(v); if (i < 0) fail(where, q, `accepted answer ${acc.join(',')} cannot be built from the tiles`); else left.splice(i, 1); }); });
    } else if (kind === 'hotPred') {
      const [pred, param, values] = args;
      if (values.length !== q.cells.length) fail(where, q, 'values and cells differ');
      values.forEach((v, i) => { if (PRED[pred](param, v) !== q.a.includes(i)) fail(where, q, `${v} is ${PRED[pred](param, v) ? '' : 'not '}${pred} ${param || ''} but marked the other way`); });
      q.cells.forEach((cell, i) => { if (!String(cell).startsWith('<svg') && +String(cell).replace(/,/g, '') !== values[i]) fail(where, q, `cell ${cell} does not show ${values[i]}`); });
    } else if (kind === 'multiPred') {
      const [pred, param] = args;
      q.opts.forEach((o) => {
        let ok;
        if (pred === 'gtHalf') { const v = N.parse(plain(o)); ok = v.n * 2 > v.d; }
        else if (pred === 'irrational') { const m = o.match(/^√(\d+)$/); ok = o === 'π' || (!!m && !Number.isInteger(Math.sqrt(+m[1]))); }
        else if (pred === 'fsumEq') { const sum = plain(o).split(' + ').map((t) => N.parse(t)).reduce((t, v) => R(t.n * v.d + v.n * t.d, t.d * v.d)); ok = N.eq(sum, R(param[0], param[1])); }
        if (ok !== q.a.includes(o)) fail(where, q, `${plain(o)} is ${ok ? '' : 'not '}${pred} but marked the other way`);
      });
    } else if (kind === 'shapeIs') {
      q.opts.forEach((o) => { const ok = ALWAYS[args[0]].includes(o); if (ok !== q.a.includes(o)) fail(where, q, `a ${args[0]} is ${ok ? '' : 'not '}always a ${o}, but marked the other way`); });
    } else if (kind === 'hotTri') {
      args[1].forEach((k, i) => { if ((k === args[0]) !== q.a.includes(i)) fail(where, q, `${k} triangle marked the wrong way`); if (!q.cells[i].includes(`a ${k} triangle`)) fail(where, q, 'picture does not match its triangle kind'); });
    } else if (kind === 'hotSym') {
      args[0].forEach((k, i) => { const ok = SYMMETRY[k].length > 0; if (ok !== q.a.includes(i)) fail(where, q, `${k} ${ok ? 'has' : 'has no'} line of symmetry but marked the other way`); });
    } else if (kind === 'multipleOf') {
      q.opts.forEach((o) => { const ok = +o % args[0] === 0; if (ok !== (o === q.a)) fail(where, q, `${o} is ${ok ? '' : 'not '}a multiple of ${args[0]} but marked the other way`); });
    } else if (kind === 'exprWords') {
      const [i, a, b, k, p] = args, want = [(a + b) * k, a * k + b, (a - b) * k, p / k + b][i];
      if (ev(plain(q.a)) !== want) fail(where, q, `${plain(q.a)} does not follow the words`);
      q.opts.filter((o) => o !== q.a).forEach((o) => { if (ev(plain(o)) === want) fail(where, q, `wrong choice ${plain(o)} has the same value as the answer`); });
    } else if (kind === 'plotMode') {
      const [vals, den, unit] = args, cnt = {}; vals.forEach((v) => { cnt[v] = (cnt[v] || 0) + 1; });
      const top = Math.max(...Object.values(cnt)), mode = +Object.keys(cnt).find((v) => cnt[v] === top);
      const got = N.parse(plain(q.a).replace(` ${unit}`, ''));
      if (!got || !N.eq(got, R(Math.round(mode * den), den))) fail(where, q, `answer ${plain(q.a)} is not the most common value ${mode}`);
    } else if (kind === 'hotEvidence') {
      // Each choice is a sentence of the passage; the tapped ones must be exactly the evidence sentences.
      const text = q.passage.text.replace(/\s+/g, ' ');
      q.cells.forEach((c) => { if (!text.includes(c.replace(/\s+/g, ' '))) fail(where, q, `choice "${c.slice(0, 40)}" is not a sentence of the passage`); });
      const want = new Set(args[0]), got = q.a.map((i) => q.cells[i]);
      if (got.length !== want.size || !got.every((c) => want.has(c))) fail(where, q, 'tapped sentences differ from the evidence');
      if (q.cells.length - q.a.length < 2) fail(where, q, 'fewer than 2 wrong sentences to choose from');
    } else if (kind === 'multiText') {
      const want = new Set(args[0]);
      if (q.a.length !== want.size || !q.a.every((x) => want.has(x))) fail(where, q, 'multi-select answers differ from the right choices');
    } else if (kind === 'popSeq') {
      if (q.accept.length !== 1 || q.accept[0].join('|') !== args[0].join('|')) fail(where, q, 'accepted order differs from the events');
      if (new Set(q.tiles).size !== q.tiles.length) fail(where, q, 'two event tiles are the same');
    } else if (kind === 'algEquiv') {
      // the answer must equal the question's own expression (e.g. simplify 2(x+3) + x → 3x + 6)
      if (!Alg.equiv(q.t === 'mc' ? plain(q.a).replace(/\s+/g, '') : q.a, args[0])) fail(where, q, `answer ${q.a} is not equivalent to ${args[0]}`);
      if (q.t === 'mc') q.opts.filter((o) => o !== q.a).forEach((o) => { if (Alg.equiv(plain(o).replace(/\s+/g, ''), args[0])) fail(where, q, `wrong choice ${plain(o)} is also equivalent`); });
    } else if (kind === 'solveLin') {
      // solve lhs = rhs for x by evaluating: f(x) = lhs − rhs is linear, so x = −f(0) / (f(1) − f(0))
      const f = (x) => Alg.evalAt(Alg.parse(args[0]), { x }) - Alg.evalAt(Alg.parse(args[1]), { x });
      const root = -f(0) / (f(1) - f(0)), got = N.parse(plain(String(q.a)).replace(/^x\s*=\s*/, ''));
      if (!got || Math.abs(got.n / got.d - root) > 1e-9) fail(where, q, `answer ${q.a} but ${args[0]} = ${args[1]} gives x = ${root}`);
      if (Math.abs(f(root)) > 1e-9) fail(where, q, 'the equation is not linear');
    } else if (kind === 'roots') {
      // every listed root makes the expression zero, and the count matches the degree's real roots
      const t = Alg.parse(args[0]), want = q.t === 'mc' ? plain(q.a).split(/,\s*|\s+and\s+|x\s*=\s*/).filter((x) => x.trim() !== '') : [String(q.a)];
      want.map((w) => N.parse(w.trim())).forEach((v) => { if (!v || Math.abs(Alg.evalAt(t, { x: v.n / v.d })) > 1e-7) fail(where, q, `${q.a} is not a root of ${args[0]}`); });
    } else if (kind === 'inverse') {
      // g is the inverse of f when f(g(x)) = x for every x
      const comp = args[0].replace(/x/g, `(${q.a})`);
      if (!Alg.equiv(comp, 'x')) fail(where, q, `${q.a} is not the inverse of ${args[0]}`);
    } else if (kind === 'lineThru') {
      // the answer line goes through both points (and is a line: same rise for each step)
      const e = Alg.parse(plain(q.a).replace(/^y\s*=\s*/, '')), [x1, y1, x2, y2] = args, at = (x) => Alg.evalAt(e, { x });
      if (Math.abs(at(x1) - y1) > 1e-9 || Math.abs(at(x2) - y2) > 1e-9) fail(where, q, `${q.a} misses (${x1}, ${y1}) or (${x2}, ${y2})`);
      if (Math.abs(at(2) - 2 * at(1) + at(0)) > 1e-9) fail(where, q, `${q.a} is not a line`);
      if (q.t === 'mc') q.opts.filter((o) => o !== q.a).forEach((o) => { const w = Alg.parse(plain(o).replace(/^y\s*=\s*/, '')); if (Math.abs(Alg.evalAt(w, { x: x1 }) - y1) < 1e-9 && Math.abs(Alg.evalAt(w, { x: x2 }) - y2) < 1e-9) fail(where, q, `wrong choice ${o} also fits`); });
    } else if (kind === 'seqFormula') {
      // the formula gives every listed term for n = 1, 2, 3, …
      const e = Alg.parse(q.a);
      args[0].forEach((v, i) => { if (Math.abs(Alg.evalAt(e, { n: i + 1 }) - v) > 1e-9) fail(where, q, `${q.a} gives ${Alg.evalAt(e, { n: i + 1 })} for n = ${i + 1}, not ${v}`); });
    } else if (kind === 'popAlg') {
      // Try every way to fill the boxes: a fill is right when both sides are equal for every x (and, with gcf, the
      // number in front is the greatest common factor; with model, the left side matches the story's expression).
      const [o] = args, k = (q.template.match(/□/g) || []).length, fills = [];
      const go = (cur, used) => { if (cur.length === k) { fills.push(cur); return; } q.tiles.forEach((t, i) => { if (!used.has(i)) go([...cur, t], new Set([...used, i])); }); };
      go([], new Set());
      const correct = (vals) => {
        let j = 0; const eq = q.template.replace(/□/g, () => vals[j++]), [l, r] = eq.split(' = ');
        if (o.model) return Alg.equiv(l, o.model[0]) && Alg.equiv(r, o.model[1]);
        if (!Alg.tryParse(l) || !Alg.tryParse(r) || !Alg.equiv(l, r)) return false;
        return o.gcf ? Math.abs(Alg.leadNum(l)) === o.gcf : true;
      };
      const acc = new Set(q.accept.map((a) => a.join('|')));
      fills.forEach((f) => { if (correct(f) !== acc.has(f.join('|'))) fail(where, q, `fill ${f.join(',')} is ${correct(f) ? 'right' : 'wrong'} but marked the other way`); });
      if (!q.accept.length) fail(where, q, 'no accepted answer');
      q.accept.forEach((ac) => { const left = [...q.tiles]; ac.forEach((v) => { const i = left.indexOf(v); if (i < 0) fail(where, q, `accepted answer ${ac.join(',')} cannot be built from the tiles`); else left.splice(i, 1); }); });
    } else if (kind === 'errStep') {
      // the answer is the first line whose solution differs from the line before it
      const root = (line) => { const [l, r] = line.split('='), f = (x) => Alg.evalAt(Alg.parse(l), { x }) - Alg.evalAt(Alg.parse(r), { x }); return -f(0) / (f(1) - f(0)); };
      const lines = args[0], first = lines.findIndex((ln, i) => i > 0 && Math.abs(root(ln) - root(lines[i - 1])) > 1e-9);
      if (first < 0) fail(where, q, 'no step has a mistake');
      if (q.a.length !== 1 || q.a[0] !== first) fail(where, q, `marked step ${q.a[0] + 1} but the first wrong step is ${first + 1}`);
      if (q.cells.length !== lines.length) fail(where, q, 'cells and steps differ');
    } else if (kind === 'hotEquiv') {
      q.cells.forEach((c, i) => { if (Alg.equiv(c, args[0]) !== q.a.includes(i)) fail(where, q, `${c} is ${Alg.equiv(c, args[0]) ? '' : 'not '}equivalent but marked the other way`); });
    } else if (kind === 'multiEquiv') {
      q.opts.forEach((o) => { if (Alg.equiv(o, args[0]) !== q.a.includes(o)) fail(where, q, `${o} is ${Alg.equiv(o, args[0]) ? '' : 'not '}equivalent but marked the other way`); });
    } else if (kind === 'multiCons') {
      const [cap, pa, pb, budget] = args;
      q.opts.forEach((o) => { const [L, S] = o.match(/\d+/g).map(Number), ok = L + S <= cap && pa * L + pb * S <= budget; if (ok !== q.a.includes(o)) fail(where, q, `${o} ${ok ? 'meets' : 'breaks'} the limits but is marked the other way`); });
    } else if (kind === 'noSolParam') {
      // put the answer in for k: the equation must have no solution
      const L = args[0].replace(/k/g, `(${q.a})`), f = (x) => Alg.evalAt(Alg.parse(L), { x }) - Alg.evalAt(Alg.parse(args[1]), { x });
      if (Math.abs(f(1) - f(0)) > 1e-9 || Math.abs(f(0)) < 1e-9) fail(where, q, `k = ${q.a} does not make the equation have no solution`);
    } else if (kind === 'sysNoSolA') {
      const [b1, c1, a2, b2, c2] = args, a = +plain(q.a).replace('−', '-');
      if (Math.abs(a * b2 - a2 * b1) > 1e-9) fail(where, q, `a = ${q.a} does not make the lines parallel`);
      if (Math.abs(c1 * b2 - c2 * b1) < 1e-9) fail(where, q, 'the lines are the same line (infinitely many solutions)');
    } else if (kind === 'ineqSys') {
      const [m1, b1, m2, b2] = args, ok = (o) => { const [x, y] = plain(o).replace(/[()]/g, '').split(',').map((t) => +t.replace('−', '-')); return y > m1 * x + b1 && y < m2 * x + b2; };
      q.opts.forEach((o) => { if (ok(o) !== (o === q.a)) fail(where, q, `${o} ${ok(o) ? 'is' : 'is not'} a solution but marked the other way`); });
    } else if (kind === 'moe') {
      const [est, moe] = args, inside = (o) => { const v = +plain(o).replace('%', ''); return v >= est - moe && v <= est + moe; };
      q.opts.forEach((o) => { if (inside(o) !== (o === q.a)) fail(where, q, `${o} is ${inside(o) ? 'inside' : 'outside'} the margin but marked the other way`); });
    } else if (kind === 'boundary') {
      // the passage with the answer filled in: two full sentences must not be joined by a bare comma, etc.
      const [k, a] = args;
      const RIGHT = { semi: ';', period: '.', conj: ', and', intro: ',', appos: ',', colon: ':', however: ';' };
      if (RIGHT[k] !== a || q.a !== a) fail(where, q, `${k}: expected "${RIGHT[k]}", answer "${q.a}"`);
      if (q.opts.filter((o) => o === RIGHT[k]).length !== 1) fail(where, q, 'the right punctuation is not exactly one option');
    } else if (kind === 'agree') {
      const [subj, right, sing] = args, head = subj.replace(/,? (of|on|in|near|along|across|at|from|with|which|together) .*/, '').split(' ').pop();
      const singular = /^(Each|Neither|collection|flock|sound|list)$/.test(head) || (!/s$/.test(head));
      if (singular !== sing) fail(where, q, `subject "${head}" looks ${singular ? 'singular' : 'plural'} but is tagged the other way`);
      const sVerb = ['was', 'has', 'is'].includes(right) || (/s$/.test(right) && !['was'].includes(right));
      if (sVerb !== sing) fail(where, q, `verb "${right}" does not agree with a ${sing ? 'singular' : 'plural'} subject`);
    } else if (kind === 'transition') {
      const [rel, a, others] = args, GROUP = { contrast: ['However', 'Nevertheless', 'In contrast', 'Still'], result: ['Therefore', 'As a result', 'Consequently', 'Thus'], addition: ['Moreover', 'In addition', 'Furthermore', 'Additionally'], example: ['For example', 'For instance'], sequence: ['Later', 'Then', 'Afterward'], similar: ['Similarly', 'Likewise'] };
      if (!GROUP[rel].includes(q.a)) fail(where, q, `${q.a} is not a ${rel} transition`);
      q.opts.filter((o) => o !== q.a).forEach((o) => { if (GROUP[rel].includes(o)) fail(where, q, `wrong choice ${o} is also a ${rel} transition`); });
      void others;
    } else if (kind === 'literalSolve') {
      // put the answer back in for the target letter: both sides must then agree for every value of the other letters
      const [qq] = args, target = qq.match(/for (\w)\.$/)[1], [L, Rt] = qq.replace(/^Solve /, '').replace(/ for \w\.$/, '').split('=');
      const sub = (side) => side.replace(new RegExp(target, 'g'), `(${q.a})`);
      if (!Alg.equiv(sub(L), sub(Rt))) fail(where, q, `${target} = ${q.a} does not solve ${qq}`);
      if (q.a.includes(target)) fail(where, q, 'the answer still uses the letter being solved for');
    } else if (kind === 'ineq2') {
      // the answer point satisfies y op mx + b; every other choice does not
      const [m, b, op] = args, ok = (o) => { const [x, y] = plain(o).replace(/[()]/g, '').split(',').map((t) => N.parse(t)).map((v) => v.n / v.d); return op === '>' ? y > m * x + b : y < m * x + b; };
      if (!ok(q.a)) fail(where, q, `${q.a} is not in the region`);
      q.opts.filter((o) => o !== q.a).forEach((o) => { if (ok(o)) fail(where, q, `wrong choice ${o} is also in the region`); });
    } else if (kind === 'quadForm') {
      // read "x = h ± k√r": both values must be roots of ax² + bx + c; no wrong choice may give the roots
      const [a, b, c] = args, roots = (o) => { const m = plain(o).replace(/−/g, '-').match(/^x = (-?[\d.]+) ± (?:(\d+)\/(\d+)|(\d*))√(\d+)$/); if (!m) return null; const k = m[2] ? m[2] / m[3] : m[4] === '' ? 1 : +m[4], h = +m[1], s = k * Math.sqrt(+m[5]); return [h + s, h - s]; };
      const isRoot = (r) => Math.abs(a * r * r + b * r + c) < 1e-7, A = roots(q.a);
      if (!A || !A.every(isRoot)) fail(where, q, `${q.a} does not solve the equation`);
      q.opts.filter((o) => o !== q.a).forEach((o) => { const W = roots(o); if (W && W.every(isRoot)) fail(where, q, `wrong choice ${o} also solves it`); });
    } else if (kind === 'evalAt') {
      const v = Alg.evalAt(Alg.parse(args[0]), args[1]), got = N.parse(plain(String(q.a)));
      if (!got || Math.abs(got.n / got.d - v) > 1e-9) fail(where, q, `answer ${q.a} but ${args[0]} at ${JSON.stringify(args[1])} = ${v}`);
    } else if (kind === 'slope') {
      const [x1, y1, x2, y2] = args, got = N.parse(plain(String(q.a)));
      if (!got || !N.eq(got, R(y2 - y1, x2 - x1))) fail(where, q, `slope is ${(y2 - y1)}/${(x2 - x1)}, not ${q.a}`);
    } else if (kind === 'plotLine') {
      // args: the equation as text ("y = 2x - 3"): read m and b by evaluating its right side at x = 0 and x = 1
      const rhs = typeof args[0] === 'string' ? Alg.parse(args[0].replace(/^y\s*=/, '')) : null, b = rhs ? Alg.evalAt(rhs, { x: 0 }) : args[1], m = rhs ? Alg.evalAt(rhs, { x: 1 }) - b : args[0];
      if (q.plot.kind !== 'line' || Math.abs(q.plot.m - m) > 1e-12 || Math.abs(q.plot.b - b) > 1e-12) fail(where, q, 'plotted line differs from the equation');
    } else if (kind === 'plotPoints') {
      const want = args[0].map((p) => p.join(',')).sort().join('|'), got = q.plot.pts.map((p) => p.join(',')).sort().join('|');
      if (want !== got) fail(where, q, 'plotted points differ from the answer');
    } else if (kind === 'sidesIs') {
      q.opts.forEach((o) => { if ((SIDES[o] === args[0]) !== q.a.includes(o)) fail(where, q, `${o} has ${SIDES[o]} sides but is marked the other way`); });
    } else if (TEXT[kind]) {
      const m = (x) => String(x).replace(/−/g, '-'); // a typed minus and a printed minus are the same answer
      const want = TEXT[kind](args);
      const got = q.t === 'clock' ? hm(q.h, q.m) : String(q.a);
      if (q.t === 'mc' && !q.opts.some((o) => m(o) === m(want))) fail(where, q, `recomputed answer ${want} is not among the options`);
      if (m(want) !== m(got)) fail(where, q, `answer ${got} but ${kind}(${args}) = ${want}`);
      if (q.t === 'clock' && (q.h < 1 || q.h > 12 || q.m < 0 || q.m > 59 || q.m % (q.step || 5))) fail(where, q, 'clock time cannot be set with this clock');
    } else if (COMPUTE[kind]) {
      const want = COMPUTE[kind](args);
      const got = q.t === 'shade' || q.t === 'coins' ? R(q.a) : N.parse(plain(String(q.a)).replace(/^\$/, ''));
      if (!want) { fail(where, q, `${kind}(${args}) is not a whole answer`); return; }
      if (!N.eq(want, got)) fail(where, q, `answer ${q.a} but ${kind}(${args}) = ${N.str(want)}`);
    } else fail(where, q, `unknown meta kind ${kind}`);
  }
}

const levels = [];
for (const s of SUBJECTS) for (const k of s.skills) k.levels.forEach((L, l) => levels.push({ s, k, L, l }));
if (!levels.length) { console.log('No levels found.'); process.exit(1); }
const per = Math.ceil(MIN / levels.length);
for (const { s, k, L, l } of levels) {
  const where = `${s.id}/${k.id}/L${l + 1}`;
  if (!LESSONS[`${k.id}.${l}`]) errors.push(`${where}: no "Watch first" lesson (LESSONS['${k.id}.${l}'])`);
  let n = 0, rounds = 0;
  while (n < per) {
    const round = L.gen({});
    rounds++;
    if (round.length < 6) errors.push(`${where}: a round had only ${round.length} questions`);
    const keys = round.map((q) => ctx.U.qkey(q));
    if (new Set(keys).size !== keys.length) errors.push(`${where}: repeated question in one round`);
    round.forEach((q) => checkItem(where, q, L.std));
    n += round.length;
    if (rounds > 5000) break;
  }
  total += n;
}

// a question that names another passage's title cannot be answered from the passage on screen
for (const x of quoted) if (titles.has(x.t) && x.t !== x.own && !String(x.text).includes(x.t)) fail(x.where, x.q, `question refers to another passage, "${x.t}"`);
for (const [k, g] of groups) errors.push(`${k} (${g.n}×)\n      e.g. ${g.ex}`);
console.log(`${appId}: ${total.toLocaleString()} items from ${levels.length} levels · ${Object.entries(types).map(([t, c]) => `${t} ${c}`).join(', ')}`);
if (errors.length) {
  console.log(`\n${errors.length} problem type(s):`);
  errors.forEach((e) => console.log('  ✗ ' + e));
  process.exit(1);
}
if (MAPBANK) console.log(`MAP bank: ${Math.round(100 * MAPBANK.freshShare)}% of practice levels are new (minimum ${Math.round(100 * MAPBANK.MIN_FRESH)}%)`);
if (MAPBANK && MAPBANK.freshShare < MAPBANK.MIN_FRESH) { console.log('✗ not enough new content'); process.exit(1); }
console.log(`Pictures: ${noFig ? `${noFig} item(s) without a picture` : 'every question that needs one has a picture'}`);
if (noFig && !ctx.APP.picturesOptional) { console.log('✗ every question needs a picture (the family asked for pictures everywhere)'); process.exit(1); }
// Word-choice questions: if the right answer is the longest choice too often, a child can guess by length.
if (lenStats.n >= 200) {
  const share = lenStats.longest / lenStats.n;
  console.log(`Answer-length check: the right answer is visibly the longest choice in ${Math.round(100 * share)}% of word questions (limit 15%)`);
  if (share > 0.15) { console.log('✗ right answers are too often visibly the longest choice'); process.exit(1); }
}
console.log('✓ all checks passed');
