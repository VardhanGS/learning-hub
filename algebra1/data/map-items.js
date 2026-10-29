// MAP Algebra 1: the app's own MAP-style skills (all questions new; none are reused from Algebra 1 Quest).
// They cover the course test's three goal areas, including the prerequisite (grade 7–8) review the course test
// also samples, in MAP formats: multiple choice, multi-select, hot text, click-and-pop, and text entry.
// rit = a hand-set difficulty estimate on a RIT-like scale (NOT an NWEA calibration).
// Standards: NJSLS-Mathematics 2023. All questions are original.
const MAP_NEW = [];
(function () {
  const { tag, nz, frac, lin, tx, lv, fx, mcN, kp, gcd } = A1;
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);
  const sgn = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);
  const par = (n) => (n < 0 ? `(${n})` : String(n));
  const uniq = (xs) => [...new Set(xs)];
  // Click-and-pop tiles: every answer tile (repeats kept) plus distinct distractors.
  const popTiles = (need, extra, n = 6) => U.shuffle([...need, ...uniq(extra).filter((x) => !need.includes(x)).slice(0, n - need.length)]);

  // ===================== REAL NUMBERS =====================
  // ---- signed numbers and order of operations (grade 7 review) ----
  // Sort ordered pairs into quadrants (drag-and-drop sorting, as in NWEA's practice items).
  function quadSort() {
    const pts = [], used = new Set();
    [0, 1, 2, 3].forEach((qd) => { const sx = qd === 0 || qd === 3 ? 1 : -1, sy = qd < 2 ? 1 : -1; let p; do { p = [sx * U.int(1, 8), sy * U.int(1, 8)]; } while (used.has(p.join())); used.add(p.join()); pts.push([p, qd]); });
    const extra = U.int(0, 3), e = [(extra === 0 || extra === 3 ? 1 : -1) * U.int(1, 8), (extra < 2 ? 1 : -1) * U.int(1, 8)];
    if (!used.has(e.join())) pts.push([e, extra]);
    const P = ([x, y]) => `(${fx(x)}, ${fx(y)})`;
    return tag({ t: 'sort', q: 'Sort each ordered pair into the quadrant where it lies.', bins: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], items: U.shuffle(pts).map(([p, qd]) => ({ w: P(p), b: qd })), fig: Fig.graph({ range: [-8, 8], step: 2 }), meta: { kind: 'sortQuad', args: [] }, hint: 'Quadrant I: (+, +). II: (−, +). III: (−, −). IV: (+, −). Count counterclockwise from the top right.', why: 'The signs of x and y tell the quadrant: I (+, +), II (−, +), III (−, −), IV (+, −).' }, '6.NS.C.6', 200, 'real');
  }
  function intAddSub() {
    const a = nz(-15, 15), b = nz(-15, 15), op = U.pick(['+', '-']), e = `${a} ${op} ${par(b)}`, v = op === '+' ? a + b : a - b;
    if (a > 0 && b > 0) return intAddSub(); // a signed-numbers review always has a negative
    const miss = { [String(op === '+' ? a - b : a + b)]: op === '-' ? 'Subtracting a negative is the same as adding its opposite.' : 'Check the signs: add a negative by moving left.', [String(-v)]: 'Check the sign of your answer.' };
    return tag(U.num(`Evaluate ${T(e)}.`, String(v), { keys: kp(v), fig: Fig.numLine(-20, 20, 1, { labels: [-20, -10, 0, 10, 20], marks: [{ v: a, label: fx(a) }] }), meta: { kind: 'evalAt', args: [e, {}] }, miss, hint: op === '-' ? 'Subtracting a number is adding its opposite: a − b = a + (−b).' : 'Start at the first number on the number line and move by the second.', why: `${fx(e)} = ${fx(v)}` }), '7.NS.A.1', U.pick([196, 198, 200]), 'real');
  }
  function mulDiv() {
    if (U.pick([true, false])) {
      const a = nz(-9, 9), b = a > 0 ? nz(-9, -1) * (Math.random() < 0.3 ? -1 : 1) : nz(-9, 9), c = a * b, div = U.pick([true, false]), e = div ? `${c} / ${par(b)}` : `${par(a)} * ${par(b)}`, v = div ? a : c;
      return tag(U.num(`Evaluate ${T(div ? `${c} \\div ${par(b)}` : `${par(a)} \\times ${par(b)}`)}.`, String(v), { keys: kp(v), fig: Fig.table([['Signs', 'Result'], ['same signs', 'positive'], ['different signs', 'negative']], 'Multiplying and dividing'), meta: { kind: 'evalAt', args: [e, {}] }, miss: { [String(-v)]: 'Same signs give a positive answer; different signs give a negative answer.' }, hint: 'Multiply or divide the numbers, then decide the sign.', why: `${fx(v)}` }), '7.NS.A.2', 202, 'real');
    }
    const n1 = nz(-5, 5), d1 = U.int(2, 6), n2 = n1 > 0 ? -U.int(1, 5) : nz(-5, 5), d2 = U.int(2, 6), v = frac(n1 * n2, d1 * d2), e = `(${n1}/${d1})*(${n2}/${d2})`;
    return tag(U.num(`Multiply. Write a fraction in lowest terms.\n${T(`\\left(${n1 < 0 ? '-' : ''}\\frac{${Math.abs(n1)}}{${d1}}\\right)\\left(${n2 < 0 ? '-' : ''}\\frac{${Math.abs(n2)}}{${d2}}\\right)`)}`, v, { keys: kp(v), simplest: true, fig: Fig.table([['Tops', 'Bottoms'], [`${fx(n1)} × ${fx(n2)}`, `${d1} × ${d2}`]], 'Multiply across, then simplify'), meta: { kind: 'evalAt', args: [e, {}] }, hint: 'Multiply the tops, multiply the bottoms, then simplify. Decide the sign first.', why: `${fx(n1 * n2)}/${d1 * d2} = ${fx(v)}` }), '7.NS.A.2', 208, 'real');
  }
  function orderOps() {
    const a = U.int(2, 5), b = U.int(2, 9), c = U.int(2, 9), d = U.int(1, 9), kind = U.pick([0, 1, 2]);
    const [shown, e] = [
      [`-${a}^{2} + ${b}(${c} - ${d + c})`, `-${a}^2 + ${b}*(${c} - ${d + c})`],
      [`(-${a})^{2} - ${b} \\cdot ${c}`, `(-${a})^2 - ${b}*${c}`],
      [`${b} - ${c}(${a} - ${d + a})^{2}`, `${b} - ${c}*(${a} - ${d + a})^2`],
    ][kind];
    const v = Alg.evalAt(Alg.parse(e), {});
    const wrong = kind === 0 ? Alg.evalAt(Alg.parse(e.replace(`-${a}^2`, `(-${a})^2`)), {}) : kind === 1 ? Alg.evalAt(Alg.parse(e.replace(`(-${a})^2`, `-${a}^2`)), {}) : (b - c) * (-d) ** 2;
    const w = uniq([wrong, v + 2 * b, -v, v - 1].filter((x) => x !== v)).slice(0, 3);
    return tag(mcN(`What is the value of ${T(shown)}?`, String(v), w.map(String), { fig: Fig.table([['First', 'Then', 'Then', 'Last'], ['( )', 'powers', '× ÷', '+ −']], 'Order of operations'), meta: { kind: 'evalAt', args: [e, {}] }, miss: { [String(wrong)]: kind === 0 ? `−${a}² means −(${a}²) = −${a * a}. Only (−${a})² is positive.` : kind === 1 ? `(−${a})² = ${a * a}: the parentheses square the negative too.` : 'Do the power before you multiply, and multiply before you subtract.' }, hint: 'Parentheses first, then powers, then multiply and divide, then add and subtract. Watch where the minus sign is.', why: `The value is ${fx(v)}.` }), '7.NS.A.3', U.pick([212, 214, 216]), 'real');
  }

  // ---- proportions and percent (grade 7 review) ----
  function proportion() {
    const b = U.int(2, 12), a = U.intWhere(1, 11, (v) => v !== b && gcd(v, b) === 1), k = U.int(2, 6), c = b * k, x = a * k;
    const icon = U.pick(['🧁', '🚲', '🍎', '📖']);
    return tag(U.num(`Solve the proportion.\n${T(`\\frac{x}{${c}} = \\frac{${a}}{${b}}`)}`, String(x), { keys: kp(x), fig: Fig.table([['x', String(a)], [String(c), String(b)]], `${icon} Equal ratios`), meta: { kind: 'solveLin', args: [`x/${c}`, `${a}/${b}`] }, miss: { [String(Math.round(b * a / c * 100) / 100)]: 'Cross-multiply: x · b = a · c, then divide.' }, hint: `${c} is ${k} times ${b}, so x is ${k} times ${a}. Or cross-multiply.`, why: `x = ${a} × ${c} ÷ ${b} = ${x}` }), '7.RP.A.2', 202, 'real');
  }
  function percent() {
    const kind = U.pick(['of', 'change', 'after']);
    if (kind === 'of') { const p = U.pick([15, 20, 25, 30, 35, 40, 60, 75, 120, 150]), n = U.pick([20, 40, 60, 80, 120, 200, 240]), v = p * n / 100; return tag(U.num(`What is ${p}% of ${n}?`, String(v), { keys: kp(v), fig: Fig.barModel(String(n), [`${p}%`, '']), meta: { kind: 'evalAt', args: [`${p}/100*${n}`, {}] }, miss: { [String(n / p)]: `Percent means per hundred: ${p}% = ${p}/100. Multiply by ${n}.` }, hint: `${p}% = ${p / 100}. Multiply ${p / 100} × ${n}.`, why: `${p / 100} × ${n} = ${v}` }), '7.RP.A.3', 204, 'real'); }
    if (kind === 'change') { const old = U.pick([40, 60, 80, 120, 160, 200, 240]), p = U.pick([10, 20, 25, 30, 40, 50]) * U.pick([1, -1]), nw = old * (100 + p) / 100; return tag(U.num(`A price changes from $${old} to $${nw}. What is the percent ${p > 0 ? 'increase' : 'decrease'}?`, String(Math.abs(p)), { fig: Fig.table([['Old', 'New', 'Change'], [`$${old}`, `$${nw}`, `$${Math.abs(nw - old)}`]], 'Percent change = change ÷ original'), meta: { kind: 'evalAt', args: [`${Math.abs(nw - old)}/${old}*100`, {}] }, miss: { [String(Math.round(Math.abs(nw - old) / nw * 1000) / 10)]: 'Divide by the ORIGINAL price, not the new one.' }, hint: 'Find the change, divide by the original amount, then multiply by 100.', why: `${Math.abs(nw - old)} ÷ ${old} = ${Math.abs(p) / 100} = ${Math.abs(p)}%` }), '7.RP.A.3', 212, 'real'); }
    const price = U.pick([40, 60, 80, 120, 200]), off = U.pick([10, 20, 25, 30]), tax = U.pick([5, 10]), v = Math.round(price * (1 - off / 100) * (1 + tax / 100) * 100) / 100;
    return tag(U.num(`A $${price} jacket is ${off}% off. Then ${tax}% sales tax is added to the sale price. What is the total cost in dollars?`, String(v), { keys: kp(v), fig: pic(['🧥', '🏷️'], `$${price} · ${off}% off · ${tax}% tax`), meta: { kind: 'evalAt', args: [`${price}*(1 - ${off}/100)*(1 + ${tax}/100)`, {}] }, miss: { [String(Math.round(price * (1 - (off - tax) / 100) * 100) / 100)]: 'Take the discount first, then find the tax on the SALE price. You cannot just subtract the percents.' }, hint: `Sale price: ${price} × ${1 - off / 100}. Then multiply by ${1 + tax / 100}.`, why: `${price} × ${1 - off / 100} × ${1 + tax / 100} = ${v}` }), '7.RP.A.3', 218, 'real');
  }

  // ---- roots and scientific notation (grade 8 review) ----
  function roots() {
    const cube = U.pick([true, false]), r = cube ? U.int(2, 6) : U.int(2, 15), n = cube ? r ** 3 : r * r;
    return tag(U.num(`Evaluate ${T(cube ? `\\sqrt[3]{${n}}` : `\\sqrt{${n}}`)}.`, String(r), { fig: Fig.table([[cube ? 'x³' : 'x²', ...[r - 1, r, r + 1].filter((v) => v > 0).map((v) => String(cube ? v ** 3 : v * v))], ['x', ...[r - 1, r, r + 1].filter((v) => v > 0).map(String)]], cube ? 'Cubes' : 'Squares'), meta: { kind: 'evalAt', args: [cube ? `${n}^(1/3)` : `r(${n})`, {}] }, miss: { [String(n / (cube ? 3 : 2))]: cube ? 'A cube root asks: what number times itself 3 times? Not divide by 3.' : 'A square root asks: what number times itself? Not divide by 2.' }, hint: cube ? `What number cubed is ${n}?` : `What number times itself is ${n}?`, why: `${r}${cube ? '³' : '²'} = ${n}` }), cube ? '8.EE.A.2' : '8.EE.A.2', cube ? 206 : 200, 'real');
  }
  const sciTex = (m, e) => `${m} \\times 10^{${e}}`;
  const sciText = (m, e) => `${m} × 10${String(e).split('').map((c) => ({ '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }[c])).join('')}`;
  function sciMul() {
    const a = U.pick([1.2, 1.5, 2, 2.5, 3, 4, 1.1, 1.6]), b = U.pick([2, 3, 4, 5, 6]), p = U.intWhere(-4, 7, (v) => v !== 0 && v !== 1), q = U.int(2, 6), op = U.pick(['×', '÷']);
    if (op === '÷' && Math.abs(Math.round(a / b * 1000) - a / b * 1000) > 1e-9) return sciMul(); // exact quotients only
    let m = op === '×' ? a * b : a / b, e = op === '×' ? p + q : p - q;
    m = Math.round(m * 1000) / 1000;
    while (m >= 10) { m = Math.round(m / 10 * 1000) / 1000; e++; } while (m < 1) { m = Math.round(m * 10 * 1000) / 1000; e--; }
    if (!/^\d(\.\d{1,2})?$/.test(String(m))) return sciMul();
    const ans = sciText(m, e), w = uniq([sciText(m, op === '×' ? p * q : p + q), sciText(m, e + 1), sciText(m, e - 1), sciText(op === '×' ? Math.round(a * b * 100) / 100 : m * 10, e)].filter((x) => x !== ans)).slice(0, 3);
    return tag(U.mc(`${op === '×' ? 'Multiply' : 'Divide'}. Write the answer in scientific notation.\n${T(`(${sciTex(a, p)}) ${op === '×' ? '\\times' : '\\div'} (${sciTex(b, q)})`)}`, ans, w, { fig: Fig.table([['Numbers', 'Powers of 10'], [`${a} ${op} ${b}`, op === '×' ? `add: ${fx(p)} + ${q}` : `subtract: ${fx(p)} − ${q}`]], 'Work with each part'), meta: { kind: 'sciNot', args: [a, p, op, b, q] }, miss: op === '×' ? { [sciText(m, p * q)]: 'When you multiply powers of 10, ADD the exponents.' } : {}, hint: `${op === '×' ? 'Multiply' : 'Divide'} the numbers, ${op === '×' ? 'add' : 'subtract'} the exponents, then make sure the first number is from 1 to 10.`, why: `= ${ans}` }), '8.EE.A.4', U.pick([214, 218, 220]), 'real');
  }
  function sciCompare() {
    const [a, k] = U.pick([[1.5, 2], [2, 2], [2.5, 2], [3, 2], [4, 2], [2, 3], [3, 3], [1.5, 4], [2, 4]]), b = a * k, p = U.int(3, 9), d = U.int(1, 4), q = p - d, v = k * 10 ** d;
    // concrete quantities with units (real items name what is measured); the places and things are invented
    const P = (e) => MathText.plain(`10^{${e}}`), ctx = U.pick([
      [`A country has a population of about ${T(sciTex(b, p))} people. One of its towns has about ${T(sciTex(a, q))} people.`, 'How many times as many people live in the country as in the town?'],
      [`A lake holds about ${T(sciTex(b, p))} liters of water. A swimming pool holds about ${T(sciTex(a, q))} liters.`, 'How many times as much water does the lake hold?'],
      [`A hard drive can store about ${T(sciTex(b, p))} bytes. One photo uses about ${T(sciTex(a, q))} bytes.`, 'How many photos of that size can the hard drive store?'],
      [`A factory made about ${T(sciTex(b, p))} bolts last year. A small workshop made about ${T(sciTex(a, q))} bolts.`, 'How many times as many bolts did the factory make?']]);
    return tag(U.num(`${ctx[0]} ${ctx[1]}`, String(v), { fig: pic(['🔭'], `${b} × ${P(p)} ÷ (${a} × ${P(q)})`), meta: { kind: 'evalAt', args: [`(${b}*10^${p})/(${a}*10^${q})`, {}] }, miss: { [String(k * d)]: `The powers of 10 differ by ${d}, so that part is ${P(d)} = ${10 ** d}, not ${d}.` }, hint: `Divide: ${b} ÷ ${a} = ${k}, and ${P(p)} ÷ ${P(q)} = ${P(d)}.`, why: `${k} × ${10 ** d} = ${v}` }), '8.EE.A.3', 224, 'real');
  }

  // ===================== EXPRESSIONS, EQUATIONS, AND INEQUALITIES =====================
  // ---- equations review ----
  function buildEq() {
    const [story, a, b, total, icon] = U.pick([
      ...[[8, 5], [12, 4], [6, 9], [15, 3]].map(([p, f]) => { const n = U.int(3, 9); return [`Movie tickets cost $${p} each, plus a $${f} fee for the whole order. Ana paid $${p * n + f}. Build an equation for the number of tickets, x.`, p, f, p * n + f, '🎟️']; }),
      ...[[3, 10], [4, 6], [5, 12]].map(([r, s]) => { const n = U.int(4, 12); return [`A plant is ${s} cm tall and grows ${r} cm each week. Build an equation for when it will be ${s + r * n} cm tall, after x weeks.`, r, s, s + r * n, '🌱']; }),
    ]);
    const tiles = popTiles([String(a), String(b), String(total)], [String(a + b), String(total - b), String(total + b)], 5);
    return tag({ t: 'pop', q: story, template: '□x + □ = □', tiles, accept: [[String(a), String(b), String(total)]], fig: pic([icon], 'Rate × x + start = total'), meta: { kind: 'popAlg', args: [{ model: [`${a}x + ${b}`, String(total)] }] }, hint: 'The amount that is multiplied by x is the rate. The amount added once is the starting amount or fee.', why: `${a}x + ${b} = ${total}` }, '7.EE.B.4', 206, 'eei');
  }
  function solCount() {
    const a = nz(-6, 6), b = nz(-9, 9), kind = U.pick(['one', 'none', 'many']);
    const c = kind === 'one' ? U.intWhere(-6, 6, (v) => v !== a) : a, d = kind === 'none' ? U.intWhere(-9, 9, (v) => v !== b) : kind === 'many' ? b : U.int(-9, 9);
    const k = U.pick([2, 3]), grouped = kind !== 'one' && U.pick([true, false]);
    const Lx = grouped ? `${k}(${lin(a, b)})` : lin(a, b), Rx = grouped ? lin(k * c, k * d) : lin(c, d);
    const A = ['exactly one solution', 'no solution', 'infinitely many solutions'];
    const ans = kind === 'one' ? A[0] : kind === 'none' ? A[1] : A[2];
    return tag(U.mcFixed(`How many solutions does the equation have?\n${tx(Lx)} = ${tx(Rx)}`, ans, A, { fig: Fig.table([['After simplifying', 'Solutions'], ['x = a number', 'one'], ['false, like 3 = 5', 'none'], ['true, like 3 = 3', 'infinitely many']]), meta: { kind: 'solCount', args: [Lx, Rx] }, hint: 'Get the x terms on one side. If they cancel, look at what is left.', why: `It has ${ans}.` }), '8.EE.C.7', kind === 'one' ? 214 : 220, 'eei');
  }
  function errStep() {
    const a = U.int(2, 6), b = U.int(1, 9), c = a * U.int(2, 8), x0 = c / a + b;
    const steps = [`${a}(x - ${b}) = ${c}`, `${a}x - ${a * b} = ${c}`, `${a}x = ${c + a * b}`, `x = ${(c + a * b) / a}`];
    const bad = U.int(1, 3), wrong = [...steps];
    if (bad === 1) { wrong[1] = `${a}x - ${b} = ${c}`; wrong[2] = `${a}x = ${c + b}`; wrong[3] = `x = ${frac(c + b, a)}`; }
    else if (bad === 2) { wrong[2] = `${a}x = ${c - a * b}`; wrong[3] = `x = ${frac(c - a * b, a)}`; }
    else wrong[3] = `x = ${c + a * b - a}`;
    void x0;
    return tag({ t: 'hot', q: 'A student solved this equation. Tap the FIRST step with a mistake.', cells: wrong.map((s) => s.replace(/-/g, '−')), layout: 'list', a: [bad], fig: pic(['📝'], 'Check each step'), meta: { kind: 'errStep', args: [wrong] }, hint: 'Check each line: is it equivalent to the line above it? Distribute to every term inside the parentheses.', why: `Line ${bad + 1} is the first one that does not follow from the line before it.` }, 'A.REI.A.1', 224, 'eei');
  }

  // ---- equivalent expressions ----
  function multiEquiv() {
    const xc = (v) => (Math.abs(v) === 1 ? 'x' : `${Math.abs(v)}x`); // 1x is written x
    const k = U.int(2, 5), a = U.int(2, 6), b = nz(-9, 9), c = nz(-4, 4), target = `${k}(${a}x ${sgn(b)}) ${c < 0 ? '-' : '+'} ${xc(c)}`;
    const T0 = Alg.parse(target), m = Alg.evalAt(T0, { x: 1 }) - Alg.evalAt(T0, { x: 0 }), n0 = Alg.evalAt(T0, { x: 0 });
    const rights = uniq([lin(m, n0), `${n0} ${m < 0 ? '-' : '+'} ${xc(m)}`, `${k * a}x ${sgn(k * b)} ${c < 0 ? '-' : '+'} ${xc(c)}`]).slice(0, U.int(1, 3));
    const wrongs = uniq([lin(m, b), lin(k * a + c, b), lin(m, -n0), ...(a + c ? [`${k}(${lin(a + c, b)})`] : []), lin(m + 1, n0)].filter((w) => !Alg.equiv(w, target))).slice(0, 6 - rights.length);
    const opts = U.shuffle([...rights, ...wrongs]).map((o) => o.replace(/-/g, '−'));
    return tag({ t: 'multi', q: `Choose ALL the expressions that are equivalent to ${tx(target)}.`, opts, a: opts.filter((o) => rights.map((r) => r.replace(/-/g, '−')).includes(o)), fig: Fig.table([['Distribute', 'Combine like terms']], 'Rewrite, then compare'), meta: { kind: 'multiEquiv', args: [target] }, hint: 'Distribute and combine like terms. Then simplify each choice and compare.', why: `${fx(target)} = ${fx(lin(m, n0))}` }, 'A.SSE.A.2', 216, 'eei');
  }
  function hotEquivQuad() {
    const r = nz(-6, 6), s = U.intWhere(-6, 6, (v) => v !== 0 && v !== -r && v !== r), p = Alg.pmul([r, 1], [s, 1]), target = Alg.pstr(p);
    const f = (v) => (v < 0 ? `(x - ${-v})` : `(x + ${v})`);
    const cands = uniq([`${f(r)}${f(s)}`, `${f(s)}${f(r)}`, `${f(-r)}${f(-s)}`, `${f(r)}${f(-s)}`, Alg.pstr([r * s, r + s + 1, 1]), `x(x ${sgn(r + s)}) ${sgn(r * s)}`, Alg.pstr([r * s, r - s, 1])]);
    const cells = U.shuffle(cands).slice(0, 6);
    if (!cells.some((cc) => Alg.equiv(cc, target))) return hotEquivQuad();
    return tag({ t: 'hot', q: `Tap ALL the expressions that are equivalent to ${tx(target)}.`, cells: cells.map((cc) => cc.replace(/-/g, '−')), layout: 'list', multi: true, a: cells.map((cc, i) => (Alg.equiv(cc, target) ? i : -1)).filter((i) => i >= 0), fig: A1.areaAlg(1, r, 1, s, true), meta: { kind: 'hotEquiv', args: [target] }, hint: 'Multiply each factored choice out. Order does not matter when you multiply.', why: `${fx(target)} = ${fx(`${f(r)}${f(s)}`)}` }, 'A.SSE.A.2', 230, 'eei');
  }
  function popFactor() {
    const g = U.int(2, 6), a = U.int(1, 5), b = U.int(1, 9);
    if (gcd(a, b) !== 1) return popFactor();
    const rhs = `${g * a}x + ${g * b}`;
    const tiles = popTiles([String(g), String(b)], [String(g * a), String(g * b), String(g + 1), String(b + 1), String(a)]);
    const template = a === 1 ? '□(x + □)' : `□(${a}x + □)`;
    return tag({ t: 'pop', q: `Fill in the boxes to factor out the greatest common factor: ${tx(rhs)}`, template: `${template} = ${g * a}x + ${g * b}`, tiles, accept: [[String(g), String(b)]], fig: A1.areaAlg(0, g, a, b), meta: { kind: 'popAlg', args: [{ gcf: g }] }, hint: `What is the biggest number that divides both ${g * a} and ${g * b}?`, why: `${rhs} = ${g}(${a === 1 ? '' : a}x + ${b})` }, 'A.SSE.A.2', 222, 'eei');
  }

  // ---- more quadratics ----
  function squareRoots() {
    const h = U.int(-6, 6), r = U.int(1, 8), k = r * r, e = h ? `(x ${sgn(-h)})^2 - ${k}` : `x^2 - ${k}`;
    const lo = h - r, hi = h + r, ans = `x = ${fx(lo)} and x = ${fx(hi)}`;
    const w = uniq([`x = ${fx(-h - r)} and x = ${fx(-h + r)}`, `x = ${fx(h + k)} only`, `x = ${fx(h - k)} and x = ${fx(h + k)}`, `x = ${fx(hi)} only`].filter((x) => x !== ans)).slice(0, 3);
    return tag(U.mc(`Solve.\n${T(`${h ? `(x ${sgn(-h)})^{2}` : 'x^{2}'} = ${k}`)}`, ans, w, { fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h, k: -k }], range: { x: [-15, 15], y: [-70, 30] }, step: 5, labels: true }), meta: { kind: 'roots', args: [e] }, miss: { [`x = ${fx(-h - r)} and x = ${fx(-h + r)}`]: `(x − h) = ±r, so x = h ± r. Watch the sign of h.`, [`x = ${fx(hi)} only`]: 'A square has two square roots: one positive and one negative.' }, hint: 'Take the square root of both sides: remember ±. Then solve for x.', why: `x ${h ? `${h > 0 ? '−' : '+'} ${Math.abs(h)}` : ''} = ±${r}, so x = ${fx(lo)} or x = ${fx(hi)}.` }), 'A.REI.B.4', U.pick([230, 234]), 'eei');
  }
  function completeSquare() {
    const p = nz(-6, 6), q = nz(-9, 9), e = Alg.pstr([p * p + q, 2 * p, 1]);
    const tiles = popTiles([fx(p), fx(q)], [2 * p, p * p, -p, p * p + q, -q].map(fx));
    return tag({ t: 'pop', q: `Complete the square. Fill in the boxes so the two sides are equal.`, template: `${e.replace(/-/g, '−').replace(/\^2/, '²')} = (x + □)² + □`, tiles, accept: [[fx(p), fx(q)]], fig: Fig.table([['x² + bx + c', '(x + b/2)² + (c − (b/2)²)']], 'Half of b, squared'), meta: { kind: 'popAlg', args: [{}] }, hint: `Half of ${2 * p} is ${p}. Then (x + ${fx(p)})² = x² ${sgn(2 * p).replace('-', '−')}x + ${p * p}, so adjust the constant.`, why: `${fx(e)} = (x ${p < 0 ? '−' : '+'} ${Math.abs(p)})² ${q < 0 ? '−' : '+'} ${Math.abs(q)}` }, 'A.SSE.B.3', 242, 'eei');
  }
  function vertexStd() {
    const a = U.pick([1, -1, 2, -2]), h = nz(-5, 5), k = nz(-9, 9), e = Alg.pstr([a * h * h + k, -2 * a * h, a]), P = (x, y) => `(${fx(x)}, ${fx(y)})`;
    if (U.pick([true, false])) {
      return tag(U.mc(`What is the vertex of ${T(`y = ${Alg.tex(e)}`)}?`, P(h, k), uniq([P(-h, k), P(h, -k), P(h, a * h * h + k), P(-h, -k)]).filter((x) => x !== P(h, k)).slice(0, 3), { fig: Fig.table([['Step 1', 'x = −b / (2a)'], ['Step 2', 'put x in to find y']], 'Vertex from standard form'), meta: { kind: 'vertex', args: [h, k] }, miss: { [P(-h, k)]: 'x = −b/(2a): keep track of the minus sign.' }, hint: 'Find x = −b/(2a), then substitute it to get y.', why: `x = ${h}, y = ${k}: vertex ${P(h, k)}.` }), 'F.IF.C.8a', 248, 'eei');
    }
    const v0 = 32 * U.int(1, 4), s = U.pick([0, 5, 6, 10, 20]), t = v0 / 32, hmax = -16 * t * t + v0 * t + s;
    return tag(U.num(`A ball is thrown upward. Its height in feet after t seconds is ${T(`h = -16t^{2} + ${v0}t${s ? ` + ${s}` : ''}`)}. What is its greatest height, in feet?`, String(hmax), { fig: Fig.graph({ fns: [{ kind: 'quad', a: -16, h: t, k: hmax }], range: { x: [0, 2 * t + 0.5], y: [0, hmax * 1.2] }, step: 1, labels: false }), meta: { kind: 'evalAt', args: [`-16t^2 + ${v0}t + ${s}`, { t }] }, miss: { [String(t)]: 'That is the TIME of the greatest height. Put it into the formula to find the height.' }, hint: `The top is at t = −b/(2a) = ${v0}/32. Put that t into the formula.`, why: `t = ${t}: h = ${hmax} feet.` }), 'A.SSE.B.3', 256, 'eei');
  }

  // ---- modeling with inequalities and systems ----
  function maxCount() {
    const [what, a, b, limit, icon] = U.pick([
      ...[[12, 18], [9, 25], [15, 10]].map(([p, f]) => ['rides', p, f, f + p * U.int(3, 8) + U.int(0, p - 1), '🎢']),
      ...[[4, 6], [7, 15]].map(([p, f]) => ['songs', p, f, f + p * U.int(5, 12) + U.int(0, p - 1), '🎵']),
    ]);
    const v = Math.floor((limit - b) / a);
    return tag(U.num(`${what === 'rides' ? `A fair charges $${b} to enter and $${a} per ride.` : `A music app charges $${b} a month plus $${a} per song download.`} You can spend at most $${limit}. What is the greatest number of ${what} you can pay for?`, String(v), { fig: pic([icon], `${b} + ${a}n ≤ ${limit}`), meta: { kind: 'maxInt', args: [a, b, limit] }, miss: { [String(Math.ceil((limit - b) / a))]: 'Rounding up would go over the limit. Use the whole number just below.', [String(Math.floor(limit / a))]: `Remember the $${b} you pay once.` }, hint: `Solve ${b} + ${a}n ≤ ${limit}, then take the greatest whole number that works.`, why: `n ≤ ${frac(limit - b, a)}, so at most ${v}.` }), 'A.CED.A.1', 218, 'eei');
  }
  function whichSystem() {
    const a = U.int(5, 9), b = U.int(2, 4), n = U.int(20, 40), m = a * U.int(4, 10) + b * U.int(4, 10);
    const ans = `x + y = ${n} and ${a}x + ${b}y = ${m}`;
    const w = [`x + y = ${m} and ${a}x + ${b}y = ${n}`, `${a}x + y = ${n} and x + ${b}y = ${m}`, `x + y = ${n} and ${b}x + ${a}y = ${m}`];
    return tag(U.mc(`A school sold ${n} tickets for a show. Adult tickets cost $${a} and student tickets cost $${b}. The school took in $${m}. Let x be adult tickets and y be student tickets. Which system models this?`, ans, w, { fig: Fig.table([['', 'Adult', 'Student', 'Total'], ['Tickets', 'x', 'y', String(n)], ['Money ($)', `${a}x`, `${b}y`, String(m)]]), meta: { kind: 'sysModel', args: [n, a, b, m] }, miss: { [w[2]]: 'Match each price to its own kind of ticket.', [w[0]]: 'The number of tickets goes with x + y; the money goes with the prices.' }, hint: 'One equation counts the tickets. The other adds up the money.', why: ans }), 'A.CED.A.3', 226, 'eei');
  }
  function feasible() {
    const cap = U.int(8, 14), budget = U.pick([60, 72, 80, 90, 100]), pa = U.pick([6, 8, 10]), pb = U.pick([4, 5]);
    const cands = []; for (let i = 0; i < 40 && cands.length < 6; i++) { const x = U.int(1, cap + 2), y = U.int(1, cap + 2); const k = `${x},${y}`; if (!cands.includes(k)) cands.push(k); }
    const ok = (k) => { const [x, y] = k.split(',').map(Number); return x + y <= cap && pa * x + pb * y <= budget; };
    if (!cands.some(ok) || cands.every(ok)) return feasible();
    const opts = cands.map((k) => `${k.split(',')[0]} large, ${k.split(',')[1]} small`);
    return tag({ t: 'multi', q: `A van holds at most ${cap} boxes. Large boxes cost $${pa} and small boxes cost $${pb} to ship, and the budget is $${budget}. Choose ALL the combinations that meet BOTH limits.`, opts, a: opts.filter((o, i) => ok(cands[i])), fig: Fig.table([['Limit', 'Inequality'], ['boxes', `L + S ≤ ${cap}`], ['money', `${pa}L + ${pb}S ≤ ${budget}`]], '📦 Two limits'), meta: { kind: 'multiCons', args: [cap, pa, pb, budget] }, hint: 'Check each choice in BOTH inequalities. It must pass both.', why: 'The right choices pass both the box limit and the money limit.' }, 'A.REI.D.12', 236, 'eei');
  }

  // ===================== PATTERNS, FUNCTIONS, AND GRAPHING =====================
  // ---- rate of change ----
  function rateTable() {
    const m = U.pick([2, 3, -2, 4, 1.5, -1.5, 0.5, 5]), b = U.int(-10, 20), xs = [0, 2, 4, 6, 8].map((x) => x + U.int(0, 1) * 0), i = U.int(0, 2), j = U.int(i + 1, 4);
    const ys = xs.map((x) => m * x + b), v = frac((ys[j] - ys[i]) * 2, (xs[j] - xs[i]) * 2);
    return tag(U.num(`What is the average rate of change of the function from x = ${xs[i]} to x = ${xs[j]}?`, v, { keys: kp(v), fig: Fig.table([['x', ...xs.map(String)], ['f(x)', ...ys.map(fx)]]), meta: { kind: 'slope', args: [xs[i], ys[i], xs[j], ys[j]] }, miss: { [frac((xs[j] - xs[i]) * 2, (ys[j] - ys[i]) * 2 || 1)]: 'Rate of change = change in f(x) ÷ change in x (output on top).' }, hint: '(f(b) − f(a)) / (b − a).', why: `(${fx(ys[j])} − ${fx(ys[i])}) / (${xs[j]} − ${xs[i]}) = ${fx(v)}` }), 'F.IF.B.6', 220, 'func');
  }
  // [icon, model, the rate number, the starting number, [meaning of the rate, meaning of the start, two wrong meanings]]
  const CONTEXT = [
    ['🚕', 'A taxi ride costs C = 2.5m + 4 dollars for m miles.', '2.5', '4', ['the cost per mile', 'the cost to start the ride', 'the number of miles driven', 'the total cost of the ride']],
    ['💧', 'A tank holds W = 500 − 20t liters of water after t minutes.', '20', '500', ['the liters drained each minute', 'the liters in the tank at the start', 'the minutes until it is empty', 'the liters left at the end']],
    ['📱', 'A phone plan costs P = 15g + 30 dollars for g gigabytes.', '15', '30', ['the cost per gigabyte', 'the monthly base cost', 'the number of gigabytes', 'the total monthly bill']],
    ['🌡️', 'A cooling oven is T = 425 − 15m degrees after m minutes.', '15', '425', ['the degrees lost each minute', 'the starting temperature', 'the minutes it has cooled', 'the final temperature']],
    ['🏃', 'A runner is D = 6.5t + 2 kilometers from home after t hours.', '6.5', '2', ['the kilometers run each hour', 'the starting distance from home', 'the hours spent running', 'the total distance at the end']],
  ];
  function interpretModel() {
    const [icon, q, rate, start, opts] = U.pick(CONTEXT), askRate = U.pick([true, false]), ans = opts[askRate ? 0 : 1];
    return tag(U.mc(`${q} What does ${askRate ? rate : start} represent?`, ans, opts.filter((o) => o !== ans), { fig: pic([icon], q.match(/[A-Z] = [^ ]+ [−+] [^ ]+/)[0]), hint: 'The number multiplied by the variable is the rate. The number standing alone is the starting value.', why: `${askRate ? rate : start} is ${ans}.` }), 'F.LE.B.5', 224, 'func');
  }
  function avgRateQuad() {
    const a = U.pick([1, 2, -1]), c = U.int(-5, 5), x1 = U.int(-3, 2), x2 = x1 + U.int(1, 4), e = Alg.pstr([c, 0, a]), f = (x) => a * x * x + c, v = frac(f(x2) - f(x1), x2 - x1);
    return tag(U.num(`For ${T(`f(x) = ${Alg.tex(e)}`)}, what is the average rate of change from x = ${x1} to x = ${x2}?`, v, { keys: kp(v), fig: Fig.graph({ fns: [{ kind: 'quad', a, h: 0, k: c }, { kind: 'lin', m: (f(x2) - f(x1)) / (x2 - x1), b: f(x1) - ((f(x2) - f(x1)) / (x2 - x1)) * x1 }], pts: [[x1, f(x1)], [x2, f(x2)]], range: { x: [-6, 6], y: [-20, 20] }, step: 2 }), meta: { kind: 'avgRate', args: [e, x1, x2] }, hint: 'Find f at both x-values. Then (change in f) ÷ (change in x). It is the slope of the line through the two points.', why: `(${fx(f(x2))} − ${fx(f(x1))}) / (${x2} − ${fx(x1)}) = ${fx(v)}` }), 'F.IF.B.6', 234, 'func');
  }

  // ---- key features and comparing functions ----
  function increasing() {
    const a = U.pick([1, -1, 0.5, -0.5]), h = nz(-4, 4), k = U.int(-4, 4), want = U.pick(['increasing', 'decreasing']);
    const up = (a > 0) === (want === 'increasing'), ans = `x ${up ? '>' : '<'} ${fx(h)}`;
    return tag(U.mc(`On which interval is the function ${want}?`, ans, uniq([`x ${up ? '<' : '>'} ${fx(h)}`, `x ${up ? '>' : '<'} ${fx(k)}`, `x ${up ? '>' : '<'} ${fx(-h)}`, `x ${up ? '<' : '>'} ${fx(-h)}`].filter((x) => x !== ans)).slice(0, 3), { fig: Fig.graph({ fns: [{ kind: 'quad', a, h, k }], pts: [[h, k]] }), meta: { kind: 'incInt', args: [a, h, want] }, hint: `${want === 'increasing' ? 'Increasing means going UP' : 'Decreasing means going DOWN'} as you move to the right. The turning point is at x = ${h}.`, why: `It is ${want} for ${ans}.` }), 'F.IF.B.4', 228, 'func');
  }
  function compareFns() {
    const m1 = nz(-5, 5), b1 = U.int(-8, 8), m2 = U.intWhere(-5, 5, (v) => v !== 0 && v !== m1), b2 = U.intWhere(-8, 8, (v) => v !== b1), feat = U.pick(['rate of change', 'y-intercept']);
    const xs = [-1, 0, 1, 2], ys = xs.map((x) => m2 * x + b2), fv = feat === 'rate of change' ? m1 : b1, gv = feat === 'rate of change' ? m2 : b2;
    const A = ['f has the greater ' + feat, 'g has the greater ' + feat, 'they are equal'];
    return tag(U.mcFixed(`${T(`f(x) = ${Alg.tex(lin(m1, b1))}`)}. The table shows g. Which is true?`, fv > gv ? A[0] : fv < gv ? A[1] : A[2], A, { fig: Fig.table([['x', ...xs.map(fx)], ['g(x)', ...ys.map(fx)]], 'g(x)'), meta: { kind: 'cmpFn', args: [m1, b1, xs, ys, feat] }, hint: feat === 'rate of change' ? 'f: the number in front of x. g: how much g(x) changes when x goes up by 1.' : 'f: the number added at the end. g: the value of g when x = 0.', why: `f: ${fx(fv)}, g: ${fx(gv)}.` }), 'F.IF.C.9', 232, 'func');
  }
  function crossover() {
    const k = U.pick([5, 8, 10, 12, 20]), c = U.pick([0, 10, 20, 50]);
    let x = 1; while (2 ** x <= k * x + c) x++;
    return tag(U.num(`Compare ${T(`f(x) = 2^{x}`)} and ${T(`g(x) = ${k}x${c ? ` + ${c}` : ''}`)}. For x > 0, what is the smallest whole number x where f(x) is greater than g(x)?`, String(x), { fig: Fig.table([['x', '1', '2', '3'], ['2ˣ', '2', '4', '8'], [`${k}x${c ? ` + ${c}` : ''}`, ...[1, 2, 3].map((v) => String(k * v + c))]], 'Start a table, then keep going'), meta: { kind: 'crossover', args: [k, c] }, hint: 'Make a table of both functions. Exponential growth eventually passes linear growth.', why: `At x = ${x}: 2^${x} = ${2 ** x} > ${k * x + c}.` }), 'F.LE.A.3', 242, 'func');
  }

  // ---- data displays ----
  function five(xs) { const s = xs.slice().sort((a, b) => a - b), n = s.length, med = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2); return [s[0], med(s.slice(0, Math.floor(n / 2))), med(s), med(s.slice(Math.ceil(n / 2))), s[n - 1]]; }
  // "Must be true / Could be true / Cannot be true" for statements about a median (a table-grid item in NWEA's
  // practice set; here as tap-to-sort).
  const TRUTHS = ['Must be true', 'Could be true', 'Cannot be true'];
  function mustCould() {
    const n = U.pick([15, 20, 21, 24, 25]), med = U.int(12, 14), top = med + U.int(2, 4), k = U.int(1, 3), odd = n % 2 === 1;
    const S = [
      ['exact', `At least one member is exactly ${med} years old.`, odd ? 0 : 1],
      ['younger', `Some members are younger than ${med - k}.`, 1],
      ['max', `No member is older than ${top}.`, 0],
      ['half', `At least half of the members are ${med} or older.`, 0],
      ['older', `Some members are older than ${top}.`, 2],
      ['allbelow', `Every member is younger than ${med}.`, 2],
    ];
    const pick3 = U.sample(S, 3);
    if (new Set(pick3.map((x) => x[2])).size < 2) return mustCould();
    return tag({ t: 'sort', q: `A club has ${n} members. The median age of the members is ${med}, and the oldest member is ${top}. Based on this information, how true is each statement?`, bins: TRUTHS, items: pick3.map(([, w, b]) => ({ w, b })), fig: Fig.table([['Members', 'Median age', 'Oldest'], [String(n), String(med), String(top)]]), meta: { kind: 'sortTruth', args: [n, med, top, k, pick3.map((x) => x[0])] }, hint: 'The median is the middle value when the ages are in order. With an even number of members, it is halfway between the two middle ages.', why: odd ? `With ${n} members (odd), the median ${med} is the age of the middle member, so someone must be ${med}.` : `With ${n} members (even), the median is halfway between the two middle ages, so no one has to be exactly ${med}.` }, 'S.ID.A.2', 226, 'func');
  }
  function boxRead() {
    let F; do { const q1 = U.int(20, 40), md = q1 + U.int(3, 12), q3 = md + U.int(3, 12); F = [q1 - U.int(4, 15), q1, md, q3, q3 + U.int(4, 15)]; } while (F[0] < 5 || F[4] > 75);
    const ask = U.pick(['median', 'IQR', 'range']), v = ask === 'median' ? F[2] : ask === 'IQR' ? F[3] - F[1] : F[4] - F[0];
    return tag(U.num(`The box plot shows test scores. What is the ${ask === 'IQR' ? 'interquartile range (IQR)' : ask}?`, String(v), { fig: Fig.boxPlot(F, 0, 80, 10, 'Test scores'), meta: { kind: 'boxRead', args: [F, ask] }, miss: ask === 'IQR' ? { [String(F[4] - F[0])]: 'That is the range. The IQR is the width of the box: Q3 − Q1.' } : ask === 'range' ? { [String(F[3] - F[1])]: 'That is the IQR. The range goes from the minimum to the maximum.' } : {}, hint: 'The line inside the box is the median. The box goes from Q1 to Q3. The whiskers reach the minimum and maximum.', why: `The ${ask} is ${v}.` }), 'S.ID.A.1', 220, 'func');
  }
  function twoWay() {
    const a = U.int(10, 40), b = U.int(10, 40), c = U.int(10, 40), d = U.int(10, 40), [r1, r2, c1, c2] = U.pick([['Grade 8', 'Grade 9', 'Soccer', 'Basketball'], ['Walks', 'Bus', 'Has a pet', 'No pet']]);
    const ask = U.pick(['joint', 'cond']);
    let v, q, e;
    if (ask === 'joint') { const tot = a + b + c + d; v = frac(a, tot); e = `${a}/${tot}`; q = `What fraction of ALL the students are in the "${r1}" row and the "${c1}" column? Write a fraction in lowest terms.`; }
    else { v = frac(c, c + d); e = `${c}/${c + d}`; q = `Of the students in the "${r2}" row, what fraction are in the "${c1}" column? Write a fraction in lowest terms.`; }
    return tag(U.num(q, v, { keys: kp(v), simplest: true, fig: Fig.table([['', c1, c2, 'Total'], [r1, String(a), String(b), String(a + b)], [r2, String(c), String(d), String(c + d)], ['Total', String(a + c), String(b + d), String(a + b + c + d)]], 'Two-way table'), meta: { kind: 'twoWay', args: [[a, b, c, d], ask] }, miss: ask === 'cond' ? { [frac(c, a + c)]: `"Of the students in ${r2}" means divide by the ${r2} total.` } : { [frac(a, a + b)]: 'ALL the students means divide by the grand total.' }, hint: ask === 'cond' ? `Divide by the total of the "${r2}" row.` : 'Divide by the grand total in the bottom corner.', why: `${e} = ${v}` }), 'S.ID.B.5', 228, 'func');
  }
  function corrR() {
    const target = U.pick([0.95, -0.95, 0.6, -0.6, 0]);
    let pts, r;
    for (;;) { const m = target === 0 ? 0 : Math.sign(target) * 0.8, noise = Math.abs(target) > 0.9 ? 0.6 : Math.abs(target) > 0.5 ? 1.8 : 3; pts = []; for (let i = 0; i < 10; i++) { const x = U.int(1, 9); pts.push([x, Math.max(0, Math.min(10, Math.round(5 + m * (x - 5) + (Math.random() * 2 - 1) * noise)))]); } r = rOf(pts); if (Math.abs(r - target) < 0.12) break; }
    const opts = ['0.95', '0.6', '0', '−0.6', '−0.95'];
    return tag(U.mcFixed('Which value is closest to the correlation coefficient r for this scatter plot?', fx(String(target)), opts, { fig: Fig.graph({ pts, range: [0, 10], step: 2 }), meta: { kind: 'corrR', args: [pts] }, hint: 'r near 1: points close to a line going up. r near −1: close to a line going down. r near 0: no line at all.', why: `The points fit r ≈ ${fx(String(target))}.` }), 'S.ID.C.8', 236, 'func');
  }
  function rOf(pts) { const n = pts.length, mx = pts.reduce((t, p) => t + p[0], 0) / n, my = pts.reduce((t, p) => t + p[1], 0) / n; let sxy = 0, sx = 0, sy = 0; pts.forEach(([x, y]) => { sxy += (x - mx) * (y - my); sx += (x - mx) ** 2; sy += (y - my) ** 2; }); return sx && sy ? sxy / Math.sqrt(sx * sy) : 0; }

  MAP_NEW.push(
    { goal: 'real', id: 'signed', name: 'Signed numbers review', icon: '➖', levels: [
      lv('Add and subtract integers', '7.NS.A.1 · 6.NS.C.6', 'Grade 7 review: negatives on a number line.', [intAddSub, quadSort]),
      lv('Multiply and divide', '7.NS.A.2', 'Signs and fractions.', [mulDiv, intAddSub]),
      lv('Order of operations', '7.NS.A.3', 'Powers, negatives, and parentheses.', [orderOps, mulDiv]),
    ] },
    { goal: 'real', id: 'ratio', name: 'Ratios and percents review', icon: '％', levels: [
      lv('Proportions', '7.RP.A.2', 'Grade 7 review: equal ratios.', [proportion]),
      lv('Percents', '7.RP.A.3', 'Percent of a number, percent change.', [percent, proportion]),
      lv('Multi-step percents', '7.RP.A.3', 'Discounts, tax, and change.', [percent]),
    ] },
    { goal: 'real', id: 'scinot', name: 'Roots and scientific notation', icon: '🔬', levels: [
      lv('Square and cube roots', '8.EE.A.2', 'Grade 8 review.', [roots]),
      lv('Scientific notation', '8.EE.A.4', 'Multiply and divide very big and very small numbers.', [sciMul, roots]),
      lv('How many times larger?', '8.EE.A.3 · 8.EE.A.4', 'Compare with powers of 10.', [sciCompare, sciMul]),
    ] },
    { goal: 'eei', id: 'eqprep', name: 'Equations review', icon: '🧩', levels: [
      lv('Build an equation', '7.EE.B.4', 'Grade 7 review: turn a story into an equation.', [buildEq]),
      lv('How many solutions?', '8.EE.C.7', 'One, none, or infinitely many.', [solCount, buildEq]),
      lv('Find the mistake', 'A.REI.A.1', 'Check each step of a solution.', [errStep, solCount]),
    ] },
    { goal: 'eei', id: 'equivx', name: 'Equivalent expressions', icon: '🟰', levels: [
      lv('Same value, different look', 'A.SSE.A.2', 'Choose all the equivalent forms.', [multiEquiv]),
      lv('Build a factored form', 'A.SSE.A.2', 'Fill in the greatest common factor.', [popFactor, multiEquiv]),
      lv('Equivalent quadratics', 'A.SSE.A.2', 'Factored and expanded forms.', [hotEquivQuad, popFactor]),
    ] },
    { goal: 'eei', id: 'quadmore', name: 'Quadratic forms', icon: '🎯', levels: [
      lv('Solve with square roots', 'A.REI.B.4', 'Two square roots: ±.', [squareRoots]),
      lv('Complete the square', 'A.SSE.B.3', 'Rewrite in vertex form.', [completeSquare, squareRoots]),
      lv('Vertex and maximum height', 'A.SSE.B.3 · F.IF.C.8a', 'Read the turning point.', [vertexStd, completeSquare]),
    ] },
    { goal: 'eei', id: 'modelx', name: 'Modeling with constraints', icon: '📦', levels: [
      lv('At most, at least', 'A.CED.A.1', 'Inequalities from stories.', [maxCount]),
      lv('Write the system', 'A.CED.A.3', 'Two facts, two equations.', [whichSystem, maxCount]),
      lv('Meet both limits', 'A.REI.D.12 · A.CED.A.3', 'Solutions of systems of inequalities.', [feasible, whichSystem]),
    ] },
    { goal: 'func', id: 'rates', name: 'Rate of change', icon: '📐', levels: [
      lv('Average rate of change', 'F.IF.B.6', 'From a table.', [rateTable]),
      lv('What the numbers mean', 'F.LE.B.5', 'Slope and starting value in context.', [interpretModel, rateTable]),
      lv('Rate of change of a curve', 'F.IF.B.6', 'Average rate for a quadratic.', [avgRateQuad, interpretModel]),
    ] },
    { goal: 'func', id: 'features', name: 'Key features & comparing', icon: '🔎', levels: [
      lv('Increasing and decreasing', 'F.IF.B.4', 'Read a graph from left to right.', [increasing]),
      lv('Compare two functions', 'F.IF.C.9', 'An equation versus a table.', [compareFns, increasing]),
      lv('Exponential overtakes linear', 'F.LE.A.3', 'When does 2ˣ win?', [crossover, compareFns]),
    ] },
    { goal: 'func', id: 'data2', name: 'Data displays', icon: '📦', levels: [
      lv('Box plots', 'S.ID.A.1', 'Median, IQR, and range.', [boxRead]),
      lv('Two-way tables', 'S.ID.B.5 · S.ID.A.2', 'Joint and conditional fractions.', [twoWay, boxRead, mustCould]),
      lv('The correlation coefficient', 'S.ID.C.8', 'How close to a line?', [corrR, twoWay]),
    ] },
  );
})();
