// Shared pieces for MAP Math 4. Every answer is computed in code; meta {kind, args} lets tools/validate.js
// recompute it independently. Goal areas follow MAP Growth Math 2–5 (NWEA 2025): number, algebra, geometry.
// Difficulty tags (rit) are hand-set estimates on a RIT-like scale: Grade 3 review ~178–188, Grade 4 ~188–208,
// Grade 5 level-up ~206–224. They are not NWEA calibrations.
const M4 = (() => {
  const { tag, kid, cap, missMap, pl } = MQ;
  // 45678 -> "45,678" (numbers under 10,000 too, as Grade 4 books write them)
  const c = (n) => Number(n).toLocaleString('en-US');
  // Decimal as text without float noise: dec(735, 2) -> "7.35"
  const dec = (k, places) => { const s = String(Math.abs(k)).padStart(places + 1, '0'); return (k < 0 ? '-' : '') + s.slice(0, -places) + '.' + s.slice(-places); };
  const decTrim = (k, places) => dec(k, places).replace(/0+$/, '').replace(/\.$/, '');
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const simp = ([n, d]) => { const g = gcd(n, d) || 1; return [n / g, d / g]; };
  // Fraction as TeX: whole numbers stay whole; improper fractions shown as mixed numbers when mixed = true.
  function fx([n, d], mixed = false) {
    if (d === 1) return String(n);
    if (mixed && n > d) { const w = Math.floor(n / d), r = n % d; return r ? T(`${w}\\frac{${r}}{${d}}`) : String(w); }
    return T(`\\frac{${n}}{${d}}`);
  }
  // Plain typed form of a fraction answer: "7/4", "1 3/4", "3".
  function ftyped([n, d], mixed = false) {
    if (d === 1) return String(n);
    if (mixed && n > d) { const w = Math.floor(n / d), r = n % d; return r ? `${w} ${r}/${d}` : String(w); }
    return `${n}/${d}`;
  }
  // Wrong answers for a × b with the mistakes students really make.
  function mulMisses(a, b) {
    const p = a * b, w = [];
    const digs = String(a).split('').map(Number);
    if (b < 10) {
      // no regrouping: each digit product written down, carries dropped
      const noCarry = +digs.map((d) => (d * b) % 10).join('');
      if (noCarry !== p) w.push([noCarry, 'It looks like the regrouped tens (or hundreds) were not added on. Write the extra digit above the next place and add it.']);
      const allDigits = +digs.map((d) => d * b).join('');
      if (allDigits !== p && allDigits < p * 20) w.push([allDigits, 'Each place\'s product was written whole. Regroup: keep one digit in each place and carry the rest.']);
      w.push([a + b, `That is ${c(a)} + ${b}. The question asks you to multiply.`]);
    } else {
      const ones = b % 10, tens = Math.floor(b / 10) % 10;
      // forgot the placeholder zero: added a × ones and a × tens (not a × tens × 10)
      const noZero = a * ones + a * tens;
      if (noZero !== p) w.push([noZero, `The second row is ${c(a)} × ${tens * 10}, not ${c(a)} × ${tens}. Write a zero in the ones place first.`]);
      // multiplied only matching places (tens × tens, ones × ones)
      if (a < 100) { const lazy = Math.floor(a / 10) * tens * 100 + (a % 10) * ones; if (lazy !== p) w.push([lazy, 'Every part must be multiplied by every part: tens × tens, tens × ones, ones × tens, and ones × ones.']); }
      w.push([p + a, `That is one ${c(a)} too many.`]);
    }
    return w.filter(([v]) => v !== p && v > 0);
  }
  // Wrong answers for a ± b (multi-digit).
  function addMisses(a, b) {
    const s = a + b, w = [];
    let noCarry = 0, m = 1, x = a, y = b;
    while (x || y) { noCarry += ((x % 10 + y % 10) % 10) * m; x = Math.floor(x / 10); y = Math.floor(y / 10); m *= 10; }
    if (noCarry !== s) w.push([noCarry, 'It looks like the regrouped 1s were not carried to the next place.']);
    w.push([Math.abs(a - b), `That is the difference. The question asks you to add.`]);
    w.push([s + 1000, 'Check the thousands place.']);
    return w.filter(([v]) => v !== s && v > 0);
  }
  function subMisses(a, b) {
    const d = a - b, w = [];
    let sfb = 0, m = 1, x = a, y = b;
    while (x || y) { sfb += Math.abs((x % 10) - (y % 10)) * m; x = Math.floor(x / 10); y = Math.floor(y / 10); m *= 10; }
    if (sfb !== d) w.push([sfb, 'In each place the smaller digit was taken from the bigger one. When the top digit is smaller, regroup first.']);
    w.push([a + b, 'That is the sum. The question asks you to subtract.']);
    w.push([d + 1000, 'A thousand was regrouped but not taken away. Check the thousands place.']);
    w.push([d + 100, 'A hundred was regrouped but not taken away. Check the hundreds place.']);
    return w.filter(([v]) => v !== d && v > 0);
  }
  // A place-value chart for numbers up to 999,999 (digits under their place names).
  const PLACES = ['Hundred thousands', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
  const PLACES_SHORT = ['100,000s', '10,000s', '1,000s', '100s', '10s', '1s'];
  function placeChart6(nums) {
    const len = Math.max(...nums.map((n) => String(n).length));
    const head = PLACES_SHORT.slice(6 - len);
    return Fig.table([head, ...nums.map((n) => String(n).padStart(len, ' ').split('').map((d) => d.trim()))]);
  }
  // Area model for fraction × fraction: a d2-by-d1 grid with n1 columns and n2 rows overlapping.
  function fracArea(n1, d1, n2, d2) {
    const W = 240, H = 160, cw = W / d1, ch = H / d2;
    let body = '';
    for (let r = 0; r < d2; r++) for (let k = 0; k < d1; k++) {
      const both = k < n1 && r < n2, one = k < n1 || r < n2;
      body += `<rect x="${4 + k * cw}" y="${4 + r * ch}" width="${cw}" height="${ch}" class="${both ? 'tf-a' : one ? 'fg-fill' : 'pc-cell'}" style="stroke-width:1.2"/>`;
    }
    body += `<rect x="4" y="4" width="${W}" height="${H}" class="fg-stroke"/>`;
    return `<svg viewBox="0 0 ${W + 8} ${H + 8}" width="${W + 8}" role="img" aria-label="A rectangle in ${d1} columns and ${d2} rows: ${n1} columns and ${n2} rows shaded, ${n1 * n2} of ${d1 * d2} parts shaded twice">${body}</svg>`;
  }
  // Safe arithmetic (digits, commas, decimals, + − × ÷ and parentheses only).
  function ev(expr) { const js = String(expr).replace(/,/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'); if (!/^[\d+\-*/ ().]+$/.test(js)) return NaN; return Function(`return (${js})`)(); }
  // Multiple choice like U.mcMiss, but a wrong choice is dropped when it has the same VALUE as the answer or as
  // another choice (2/8 next to 1/4, 1.0 next to 1), and negative choices are never used (Grade 4).
  const valOf = (s) => { const v = N.parse(MathText.plain(String(s).replace(/[⟪⟫]/g, '')).replace(/^\$/, '').replace(/[°¢]$/, '')); return v ? `${v.n}/${v.d}` : `t:${s}`; };
  function mc(q, a, wrongs, extra = {}, n = 3, fill = null) {
    const A = String(a), seen = new Set([valOf(A)]), miss = {};
    const ok = (s) => s !== '' && !/NaN|undefined/.test(s) && !/^\s*[-−]\s*\d/.test(MathText.plain(s.replace(/[⟪⟫]/g, ''))) && !seen.has(valOf(s));
    for (const [v, why] of wrongs) { const s = String(v); if (!ok(s)) continue; seen.add(valOf(s)); miss[s] = why; if (Object.keys(miss).length >= n) break; }
    let guard = 0;
    while (fill && Object.keys(miss).length < n && guard++ < 60) { const s = String(fill()); if (ok(s)) { seen.add(valOf(s)); miss[s] = ''; } }
    return { t: 'mc', q, a: A, opts: U.shuffle([A, ...Object.keys(miss)]), miss, ...extra };
  }
  const LETTERS = ['A', 'B', 'C', 'D'];
  const lv = (title, std, desc, fns) => ({ title, std, desc, gen: () => U.mix(8, fns) });
  return { mc, tag, kid, cap, missMap, pl, c, dec, decTrim, gcd, simp, fx, ftyped, mulMisses, addMisses, subMisses, placeChart6, PLACES, fracArea, ev, LETTERS, lv };
})();
// The skills of MAP Math 4, filled in by number4.js, algebra4.js and geometry4.js; map-bank.js turns them into subjects.
const M4_SKILLS = [];
