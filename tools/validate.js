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
['core/speech.js', 'core/U.js', 'core/engine/fig.js'].forEach(load);
const dataPath = (f) => (f.includes(':') ? `apps/${f.split(':')[0]}/data/${f.split(':')[1]}` : `apps/${appId}/data/${f}`);
for (const f of ctx.APP.data) load(dataPath(f));
vm.runInContext('this.MAPBANK = typeof MAPBANK === "undefined" ? null : MAPBANK; this.U = U; this.SUBJECTS = SUBJECTS; this.N = N; this.MathText = MathText; this.LESSONS = typeof LESSONS === "undefined" ? {} : LESSONS;', ctx);
const { SUBJECTS, N, MathText, LESSONS, MAPBANK } = ctx;

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
};
// Safe arithmetic: digits, + − × ÷, parentheses.
function ev(e) { const js = String(e).replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'); if (!/^[\d+\-*/ ().]+$/.test(js)) return NaN; return Function(`return (${js})`)(); }
// Answers that are words or times, recomputed here.
const r100 = (n) => Math.floor(n / 100 + 0.5) * 100;
const COINV = { q: 25, d: 10, n: 5, p: 1, b: 100 };
const SIDES = { triangle: 3, square: 4, rectangle: 4, rhombus: 4, trapezoid: 4, parallelogram: 4, pentagon: 5, hexagon: 6, octagon: 8, circle: 0 };
const hm = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
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
function checkItem(where, q, levelStd) {
  types[q.t] = (types[q.t] || 0) + 1;
  if (!q.fig && !['line', 'shade', 'clock', 'coins', 'hot'].includes(q.t) && !(q.t === 'hot')) noFig++;
  if (!q.q || typeof q.q !== 'string') fail(where, q, 'missing prompt');
  if (!levelStd) fail(where, q, 'level has no standard code');
  if (!MathText.spoken(q.q)) fail(where, q, 'prompt has nothing to say aloud');
  const math = ['num', 'line', 'shade', 'multi', 'clock', 'coins', 'hot', 'pop'].includes(q.t) || (q.t === 'mc' && q.meta);
  if (math && !q.meta) fail(where, q, 'math item without meta (answer cannot be recomputed)');

  if (q.t === 'mc' || q.t === 'multi') {
    if (!Array.isArray(q.opts) || q.opts.length < 2) fail(where, q, 'fewer than 2 options');
    const ps = q.opts.map(plain);
    if (new Set(q.opts).size !== q.opts.length) fail(where, q, 'duplicate options');
    if (new Set(ps).size !== ps.length) fail(where, q, 'options look the same as plain text');
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
      const has = (s) => ({ quad: SIDES[s] === 4, 'square corners': ['square', 'rectangle'].includes(s), '3 sides': SIDES[s] === 3, '4 sides': SIDES[s] === 4, '5 vertices': SIDES[s] === 5, '6 sides': SIDES[s] === 6, 'no straight sides': s === 'circle' }[prop]);
      names.forEach((s, i) => { if (has(s) !== q.a.includes(i)) fail(where, q, `${s} marked wrong for "${prop}"`); });
      if (q.cells.length !== names.length) fail(where, q, 'pictures and names differ');
    } else if (kind === 'popPlace' || kind === 'popOrder' || kind === 'popEq') {
      // Try every way to fill the boxes from the tiles: the accepted fills must be exactly the correct ones.
      const k = (q.template.match(/□/g) || []).length, fills = [];
      const go = (cur, used) => { if (cur.length === k) { fills.push(cur); return; } q.tiles.forEach((t, i) => { if (!used.has(i)) go([...cur, t], new Set([...used, i])); }); };
      go([], new Set());
      const correct = (vals) => {
        if (kind === 'popPlace') return +vals[0] * 100 + +vals[1] * 10 + +vals[2] === args[0];
        if (kind === 'popOrder') return vals.join(',') === [...args[0]].sort((a, b) => a - b).join(',');
        let j = 0; const eq = q.template.replace(/□/g, () => vals[j++]); const [l, r] = eq.split(' = '); return ev(l) === ev(r);
      };
      const acc = new Set(q.accept.map((a) => a.join('|')));
      fills.forEach((f) => { if (correct(f) !== acc.has(f.join('|'))) fail(where, q, `fill ${f.join(',')} is ${correct(f) ? 'right' : 'wrong'} but marked the other way`); });
      if (!q.accept.length) fail(where, q, 'no accepted answer');
      q.accept.forEach((acc) => { const left = [...q.tiles]; acc.forEach((v) => { const i = left.indexOf(v); if (i < 0) fail(where, q, `accepted answer ${acc.join(',')} cannot be built from the tiles`); else left.splice(i, 1); }); });
    } else if (kind === 'sidesIs') {
      q.opts.forEach((o) => { if ((SIDES[o] === args[0]) !== q.a.includes(o)) fail(where, q, `${o} has ${SIDES[o]} sides but is marked the other way`); });
    } else if (TEXT[kind]) {
      const want = TEXT[kind](args);
      const got = q.t === 'clock' ? hm(q.h, q.m) : String(q.a);
      if (q.t === 'mc' && !q.opts.includes(want)) fail(where, q, `recomputed answer ${want} is not among the options`);
      if (want !== got) fail(where, q, `answer ${got} but ${kind}(${args}) = ${want}`);
      if (q.t === 'clock' && (q.h < 1 || q.h > 12 || q.m < 0 || q.m > 59 || q.m % (q.step || 5))) fail(where, q, 'clock time cannot be set with this clock');
    } else if (COMPUTE[kind]) {
      const want = COMPUTE[kind](args);
      const got = q.t === 'shade' || q.t === 'coins' ? R(q.a) : N.parse(String(q.a));
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
console.log('✓ all checks passed');
