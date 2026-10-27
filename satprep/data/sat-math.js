// SAT Prep — Math skills in the four College Board domains: Algebra (alg), Advanced Math (adv), Problem-Solving and
// Data Analysis (psda), Geometry and Trigonometry (geo). About a quarter of the questions are typed answers.
// Standards: NJSLS-Mathematics 2023 (high school). All questions are original.
(function () {
  const { tag, mc4, spr, pic, lv, bAt, fx, nz, frac } = SAT;
  const sq = (s) => fx(String(s).replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/ - /g, ' − ').replace(/^-/, '−'));
  const lin = (a, b, v = 'x') => { const t = a === 0 ? '' : `${a === 1 ? '' : a === -1 ? '-' : a}${v}`; if (!t) return String(b); return b === 0 ? t : `${t} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`; };
  const tex = (e) => Alg.tex(e).replace(/\\cdot/g, '\\,');
  const sgn = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);
  const pick = U.pick;
  const done = (o, std, b, goal) => o && tag(o, std, b, goal);
  // A typed ("student-produced") answer has at most 6 characters including a minus sign.
  const fits = (a) => String(a).length <= 6;

  // ===================== ALGEBRA =====================
  function lin1(l) {
    if (l === 0) { // ax + b = c
      const a = nz(-9, 9), x = U.int(-12, 12), b = U.int(-20, 20), c = a * x + b, typed = Math.random() < 0.3;
      const q = `If ${T(`${tex(lin(a, b))} = ${c}`)}, what is the value of ${T('x')}?`;
      if (typed) return done(spr(q, x, { fig: pic(['⚖️']), meta: { kind: 'solveLin', args: [lin(a, b), String(c)] }, why: `x = ${x}`, hint: 'Undo the addition, then the multiplication.' }), 'A.REI.B.3', bAt(0, 0.2), 'alg');
      return done(mc4(q, x, [-x, Number.isInteger((c + b) / a) ? (c + b) / a : c + b, c - b], { fig: pic(['⚖️']), meta: { kind: 'solveLin', args: [lin(a, b), String(c)] }, why: `x = ${x}`, hint: 'Undo the addition, then the multiplication.' }, () => x + nz(-5, 5)), 'A.REI.B.3', bAt(0, 0.2), 'alg');
    }
    if (l === 1) { // word problem
      const fee = pick([25, 35, 40, 55, 60]), rate = pick([15, 18, 22, 30, 45]), h = U.int(2, 9), total = fee + rate * h;
      const [who, unit] = pick([['A plumber charges a flat fee of', 'hour'], ['A rental shop charges', 'day'], ['A tutoring service charges a sign-up fee of', 'session']]);
      const q = `${who} $${fee} plus $${rate} per ${unit}. A customer paid $${total} in all. For how many ${unit}s was the customer charged?`;
      return done(spr(q, h, { fig: pic(['🧾'], `$${fee} + $${rate} × ${unit}s = $${total}`), meta: { kind: 'solveLin', args: [`${fee} + ${rate}x`, String(total)] }, why: `${fee} + ${rate}x = ${total}, so x = ${h}.`, hint: 'Write fee + rate × x = total, then solve.' }), 'A.CED.A.1', bAt(1, 0.3), 'alg');
    }
    // no solution: kx + b = c x + d
    const c = nz(-8, 8), b = U.int(-9, 9), d = U.intWhere(-9, 9, (v) => v !== b), m = U.int(2, 4);
    const q = `In the equation ${T(`${m}(kx ${sgn(b)}) = ${tex(lin(m * c, m * d))}`)}, k is a constant. If the equation has no solution, what is the value of k?`;
    return done(spr(q, c, { fig: Fig.table([['After simplifying', 'Solutions'], ['same x-terms, different numbers', 'none']], 'No solution'), meta: { kind: 'noSolParam', args: [`${m}*(k*x ${sgn(b)})`, lin(m * c, m * d)] }, why: `${m}kx ${sgn(m * b)} = ${m * c}x ${sgn(m * d)} has no solution when ${m}k = ${m * c}, so k = ${c}.`, hint: 'No solution: the x-terms must match on both sides, but the constants must not.' }), 'A.REI.B.3', bAt(2, 0.4), 'alg');
  }
  function lin2(l) {
    if (l === 0) { // slope from two points
      let x1, x2, y1, y2; do { x1 = U.int(-6, 6); x2 = U.int(-6, 6); y1 = U.int(-9, 9); y2 = U.int(-9, 9); } while (x1 === x2 || y1 === y2 || !fits(frac(y2 - y1, x2 - x1)));
      const a = frac(y2 - y1, x2 - x1), q = `A line passes through the points ${T(`(${x1}, ${y1})`)} and ${T(`(${x2}, ${y2})`)}. What is the slope of the line?`;
      return done(spr(q, a, { fig: Fig.graph({ pts: [[x1, y1], [x2, y2]], range: [-10, 10], step: 5 }), meta: { kind: 'slope', args: [x1, y1, x2, y2] }, why: `(${y2} − ${fx(y1)}) / (${x2} − ${fx(x1)}) = ${fx(a)}`, hint: 'Slope = change in y ÷ change in x.' }), 'F.IF.B.6', bAt(0, 0.5), 'alg');
    }
    if (l === 1) { // line through two points: which equation
      const m = nz(-5, 5), b = U.int(-8, 8), x1 = U.int(-4, 0), x2 = x1 + U.int(1, 3), P = (x) => [x, m * x + b];
      const L = (mm, bb) => `y = ${sq(lin(mm, bb))}`, ans = L(m, b);
      const q = `A line passes through the points ${T(`(${P(x1).join(', ')})`)} and ${T(`(${P(x2).join(', ')})`)}. Which equation represents the line?`;
      return done(mc4(q, ans, [L(-m, b), L(m, -b), L(b || 1, m)], { fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], pts: [P(x1), P(x2)], range: [-12, 12], step: 4 }), meta: { kind: 'lineThru', args: [...P(x1), ...P(x2)] }, why: `Slope ${m}, y-intercept ${b}: ${ans}.`, hint: 'Find the slope, then use one point to find b in y = mx + b.' }, () => L(m + nz(-2, 2), b)), 'A.CED.A.2', bAt(1, 0.5), 'alg');
    }
    const x1 = U.int(1, 4), x2 = x1 + U.int(2, 5), m = nz(-6, 6), b = U.int(-20, 20), x3 = U.int(8, 15), y = (x) => m * x + b;
    const q = `For the linear function f, ${T(`f(${x1}) = ${y(x1)}`)} and ${T(`f(${x2}) = ${y(x2)}`)}. What is the value of ${T(`f(${x3})`)}?`;
    return done(spr(q, y(x3), { fig: Fig.table([['x', String(x1), String(x2), String(x3)], ['f(x)', fx(y(x1)), fx(y(x2)), '?']]), meta: { kind: 'lineFrom2', args: [x1, y(x1), x2, y(x2), x3] }, why: `Slope ${m}, so f(${x3}) = ${y(x3)}.`, hint: 'Find the slope from the two values, then step from a known point.' }), 'F.LE.A.2', bAt(2, 0.3), 'alg');
  }
  function sys(l) {
    let a1, b1, a2, b2; const x = U.int(-6, 8), y = U.int(-6, 8);
    do { a1 = nz(-5, 5); b1 = nz(-5, 5); a2 = nz(-5, 5); b2 = nz(-5, 5); } while (a1 * b2 - a2 * b1 === 0);
    const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y, e = (a, b, c) => `${tex(lin(a, 0))} ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${c}`;
    const shown = `${T(e(a1, b1, c1))}\n${T(e(a2, b2, c2))}`;
    if (l === 0) return done(mc4(`What is the solution ${T('(x, y)')} to the system of equations?\n${shown}`, `(${x}, ${y})`, [`(${y}, ${x})`, `(${-x}, ${y})`, `(${x}, ${-y})`], { fig: Fig.graph({ fns: [{ kind: 'lin', m: -a1 / b1, b: c1 / b1 }, { kind: 'lin', m: -a2 / b2, b: c2 / b2 }], range: [-12, 12], step: 4 }), meta: { kind: 'sysSol', args: [a1, b1, c1, a2, b2, c2] }, why: `x = ${x}, y = ${y} makes both equations true.`, hint: 'Substitute or eliminate. Check your pair in both equations.' }, () => `(${x + nz(-2, 2)}, ${y})`), 'A.REI.C.6', bAt(0, 0.6), 'alg');
    if (l === 1) return done(spr(`If ${T('(x, y)')} is the solution to the system below, what is the value of ${T('x + y')}?\n${shown}`, x + y, { fig: pic(['✖️'], 'Solve, then add'), meta: { kind: 'sysSum', args: [a1, b1, c1, a2, b2, c2] }, why: `x = ${x}, y = ${y}, so x + y = ${x + y}.`, hint: 'Solve the system first, or look for a way to add the equations.' }), 'A.REI.C.6', bAt(1, 0.5), 'alg');
    const p = nz(1, 5), qq = nz(1, 5), k = U.int(2, 4), c = U.int(1, 9), d = U.intWhere(1, 30, (v) => v !== k * c);
    return done(spr(`In the system below, a is a constant. If the system has no solution, what is the value of a?\n${T(`ax + ${qq === 1 ? '' : qq}y = ${c}`)}\n${T(`${k * p}x + ${k * qq}y = ${d}`)}`, p, { fig: Fig.graph({ fns: [{ kind: 'lin', m: -p / qq, b: c / qq }, { kind: 'lin', m: -p / qq, b: d / (k * qq) }], range: [-8, 8], step: 4 }), meta: { kind: 'sysNoSolA', args: [qq, c, k * p, k * qq, d] }, why: `No solution means parallel lines: a/${qq} = ${k * p}/${k * qq}, so a = ${p}.`, hint: 'No solution: the lines are parallel. Their x and y coefficients must be in the same ratio.' }), 'A.REI.C.6', bAt(2, 0.5), 'alg');
  }
  function ineq(l) {
    if (l === 0) {
      const a = pick([2, 3, 4, 5, -2, -3]), b = U.int(-10, 10), x = U.int(-6, 6), op = pick(['<', '>', '≤', '≥']), c = a * x + b, FL = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' }, sol = a < 0 ? FL[op] : op, opsT = { '<': '<', '>': '>', '≤': '\\le', '≥': '\\ge' };
      return done(mc4(`Which inequality is equivalent to ${T(`${tex(lin(a, b))} ${opsT[op]} ${c}`)}?`, `x ${sol} ${fx(x)}`, [`x ${op === sol ? FL[op] : op} ${fx(x)}`, `x ${sol} ${fx(-x)}`, `x ${sol} ${fx(c - b)}`], { fig: Fig.ineqLine(x, sol, x - 6, x + 6), meta: { kind: 'ineqSol', args: [a, b, op, c] }, miss: a < 0 ? { [`x ${op} ${fx(x)}`]: 'Dividing by a negative number flips the inequality sign.' } : {}, why: `x ${sol} ${fx(x)}`, hint: 'Solve like an equation; flip the sign if you divide by a negative.' }, () => `x ${sol} ${fx(x + nz(-3, 3))}`), 'A.REI.B.3', bAt(0, 0.6), 'alg');
    }
    if (l === 1) {
      const a = pick([12, 15, 18, 24, 35]), b = pick([30, 45, 60, 80]), limit = b + a * U.int(4, 12) + U.int(0, a - 1), v = Math.floor((limit - b) / a);
      return done(spr(`A club has $${limit} to spend on a trip. The bus costs $${b}, and each ticket costs $${a}. What is the greatest number of tickets the club can buy?`, v, { fig: pic(['🚌', '🎟️'], `${b} + ${a}t ≤ ${limit}`), meta: { kind: 'maxInt', args: [a, b, limit] }, why: `${b} + ${a}t ≤ ${limit} gives t ≤ ${frac(limit - b, a)}, so ${v}.`, hint: 'Write the inequality, solve, and take the greatest whole number that works.' }), 'A.CED.A.3', bAt(1, 0.4), 'alg');
    }
    const m1 = pick([1, 2, -1]), b1 = U.int(-3, 3), m2 = pick([-2, -1, 3]), b2 = U.int(4, 8);
    const ok = ([x, y]) => y > m1 * x + b1 && y < m2 * x + b2, P = [[0, 0], [1, 6], [-2, 2], [2, 3], [3, -1], [0, 5], [-1, -4], [4, 1], [-3, 0], [1, 1]];
    const ins = P.filter(ok), outs = P.filter((p) => !ok(p) && Math.abs(p[1] - (m1 * p[0] + b1)) > 0.01 && Math.abs(p[1] - (m2 * p[0] + b2)) > 0.01);
    if (!ins.length || outs.length < 3) return ineq(l);
    const a = U.pick(ins), pt = (p) => `(${fx(p[0])}, ${fx(p[1])})`;
    return done(mc4(`Which point ${T('(x, y)')} is a solution to the system of inequalities?\n${T(`y > ${tex(lin(m1, b1))}`)}\n${T(`y < ${tex(lin(m2, b2))}`)}`, pt(a), U.sample(outs, 3).map(pt), { fig: Fig.graph({ fns: [{ kind: 'lin', m: m1, b: b1 }, { kind: 'lin', m: m2, b: b2 }], range: [-8, 8], step: 4 }), meta: { kind: 'ineqSys', args: [m1, b1, m2, b2] }, why: `${pt(a)} makes both inequalities true.`, hint: 'Test each point in BOTH inequalities.' }), 'A.REI.D.12', bAt(2, 0.5), 'alg');
  }

  // ===================== ADVANCED MATH =====================
  function equiv(l) {
    if (l === 0) {
      const a = pick([1, 2, 3]), b = nz(-6, 6), c = pick([1, 2]), d = nz(-7, 7), e = `(${lin(a, b)})(${lin(c, d)})`, p = Alg.pmul([b, a], [d, c]), ans = Alg.pstr(p);
      const w = [Alg.pstr([b * d, 0, a * c]), Alg.pstr([b * d, a * d - b * c || 1, a * c]), Alg.pstr([b + d, a * d + b * c, a * c])];
      return done(mc4(`Which expression is equivalent to ${T(tex(e))}?`, sq(ans), w.map(sq), { fig: Fig.table([['', lin(c, 0), String(d)], [lin(a, 0), `${a * c}x²`, `${a * d}x`], [String(b), `${b * c}x`, String(b * d)]].map((r) => r.map(fx)), 'Area model'), meta: { kind: 'algEquiv', args: [e] }, why: `${sq(e)} = ${sq(ans)}`, hint: 'Multiply every term by every term, then combine like terms.' }, () => sq(Alg.pstr([b * d + nz(-3, 3), a * d + b * c, a * c]))), 'A.APR.A.1', bAt(0, 0.5), 'adv');
    }
    if (l === 1) {
      const SUP = ['⁰', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'], RT = { 2: '√', 3: '∛', 4: '∜' };
      const root = (idx, pow) => (pow === 1 ? `${RT[idx]}x` : `${RT[idx]}(x${SUP[pow]})`);
      const [m, n] = pick([[3, 2], [2, 3], [5, 2], [1, 3], [3, 4], [5, 3], [1, 2], [4, 3]]), ans = root(n, m);
      const w = [m >= 2 && m <= 4 && m !== n ? root(m, n) : `x${SUP[n]}`, m * n <= 9 ? `x${SUP[m * n]}` : `(x${SUP[m]})${SUP[n]}`, `(${m}/${n})x`];
      return done(mc4(`For ${T('x > 0')}, which expression is equivalent to ${T(`x^{\\frac{${m}}{${n}}}`)}?`, ans, w, { fig: Fig.table([['x^(m/n)', 'ⁿ√(xᵐ)'], ['bottom number', 'the root'], ['top number', 'the power']], 'Rational exponents'), meta: { kind: 'ratExpForm', args: [m, n] }, why: `x^(${m}/${n}) = ${ans}`, hint: 'The bottom of the fraction is the root; the top is the power.' }), 'N.RN.A.2', bAt(1, 0.4), 'adv');
    }
    const a = nz(1, 6), b = nz(1, 6);
    const show = `\\frac{${a}}{x + 1} + \\frac{${b}}{x - 1}`;
    return done(mc4(`Which expression is equivalent to ${T(show)}, for ${T('x \\ne 1')} and ${T('x \\ne -1')}?`, `(${fx(lin(a + b, b - a))})/(x² − 1)`, [`(${fx(lin(a + b, 0))})/(x² − 1)`, `${a + b}/(2x)`, `(${fx(lin(a + b, a - b))})/(x² − 1)`], { fig: Fig.table([['Common denominator', '(x + 1)(x − 1) = x² − 1']]), meta: { kind: 'algEquiv', args: [`${a}/(x + 1) + ${b}/(x - 1)`] }, why: `${a}(x − 1) + ${b}(x + 1) = ${fx(lin(a + b, b - a))}, over the common denominator x² − 1.`, hint: 'Use the common denominator (x + 1)(x − 1). Multiply each top by the missing factor.' }), 'A.APR.D.6', bAt(2, 0.5), 'adv');
  }
  function quad(l) {
    if (l === 0) {
      const r = nz(-8, 8), s = U.intWhere(-8, 8, (v) => v !== 0 && v !== r), e = Alg.pstr(Alg.pmul([-r, 1], [-s, 1])), [lo, hi] = [r, s].sort((x, y) => x - y);
      return done(mc4(`What are the solutions to ${T(`${tex(e)} = 0`)}?`, `x = ${fx(lo)} and x = ${fx(hi)}`, [`x = ${fx(-hi)} and x = ${fx(-lo)}`, `x = ${fx(lo * hi)} and x = 1`, `x = ${fx(lo)} and x = ${fx(-hi)}`], { fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h: (r + s) / 2, k: -(((r - s) / 2) ** 2) }], range: { x: [-10, 10], y: [-40, 30] }, step: 5 }), meta: { kind: 'roots', args: [e] }, why: `Factor: (x ${sgn(-r).replace('-', '−')})(x ${sgn(-s).replace('-', '−')}) = 0.`, hint: 'Factor, then set each factor equal to 0.' }), 'A.SSE.B.3', bAt(0, 0.7), 'adv');
    }
    if (l === 1) {
      const a = pick([1, 2, 3]), r = nz(-6, 6), s = nz(-6, 6), p = Alg.pmul([-r, 1], [-s, 1]).map((c) => c * a), e = Alg.pstr(p), v = frac(-p[1], p[2]);
      if (U.pick([true, false])) return done(spr(`What is the sum of the solutions to ${T(`${tex(e)} = 0`)}?`, v, { fig: pic(['➕'], 'Sum of solutions'), meta: { kind: 'sumRoots', args: [p[2], p[1], p[0]] }, why: `The solutions are ${r} and ${s}; their sum is ${fx(v)}.`, hint: 'Solve and add, or use: the sum of the solutions of ax² + bx + c = 0 is −b/a.' }), 'A.REI.B.4', bAt(1, 0.4), 'adv');
      const h = nz(-5, 5), k = nz(-9, 9), aa = pick([1, -1, 2]), std = Alg.pstr([aa * h * h + k, -2 * aa * h, aa]), P2 = (x, y) => `(${fx(x)}, ${fx(y)})`;
      return done(mc4(`The function ${T(`f(x) = ${tex(std)}`)} has its vertex at which point?`, P2(h, k), [P2(-h, k), P2(h, aa * h * h + k), P2(-h, -k)], { fig: Fig.graph({ fns: [{ kind: 'quad', a: aa, h, k }], range: { x: [-10, 10], y: [-20, 20] }, step: 5, labels: false }), meta: { kind: 'vertex', args: [h, k] }, why: `x = −b/(2a) = ${h}; f(${h}) = ${k}.`, hint: 'x = −b/(2a); then find f at that x.' }), 'F.IF.C.8a', bAt(1, 0.7), 'adv');
    }
    if (U.pick([true, false])) { const b = 2 * nz(-7, 7), c = b * b / 4;
      return done(spr(`In the equation ${T(`x^{2} ${sgn(b)}x + c = 0`)}, c is a constant. If the equation has exactly one real solution, what is the value of c?`, c, { fig: Fig.table([['b² − 4ac', '= 0'], ['', 'one real solution']]), meta: { kind: 'oneSolC', args: [1, b] }, why: `b² − 4ac = 0: ${b * b} − 4c = 0, so c = ${c}.`, hint: 'Exactly one real solution means the discriminant b² − 4ac equals 0.' }), 'A.REI.B.4', bAt(2, 0.5), 'adv'); }
    const a = nz(-9, 9), bb = U.int(2, 9), x = bb * bb - a;
    return done(spr(`What is the solution to ${T(`\\sqrt{x ${sgn(a)}} = ${bb}`)}?`, x, { fig: pic(['√'], 'Square both sides'), meta: { kind: 'radEq', args: [a, bb] }, why: `x ${sgn(a).replace('-', '−')} = ${bb * bb}, so x = ${x}.`, hint: 'Square both sides, then solve. Check the answer in the original equation.' }), 'A.REI.A.2', bAt(2, 0.3), 'adv');
  }
  function expo(l) {
    if (l === 0) {
      const p = pick([3, 5, 8, 12, 20]), a = pick([200, 500, 800, 1200]), up = U.pick([true, false]), base = up ? 1 + p / 100 : 1 - p / 100;
      const f = (b) => `f(t) = ${a}(${b})ᵗ`, ans = f(+base.toFixed(2));
      return done(mc4(`A population of ${a} ${up ? 'grows' : 'shrinks'} by ${p}% each year. Which function gives the population after t years?`, ans, [f(+(p / 100).toFixed(2)), f(+(up ? 1 - p / 100 : 1 + p / 100).toFixed(2)), `f(t) = ${a} ${up ? '+' : '−'} ${p}t`], { fig: Fig.graph({ fns: [{ kind: 'exp', a: 1, b: base }], range: { x: [0, 10], y: [0, 3] }, step: 2, labels: false }), meta: { kind: 'expModel', args: [a, p, up] }, why: `${up ? 'Growing' : 'Shrinking'} by ${p}% means multiplying by ${+base.toFixed(2)} each year.`, hint: `${up ? 'Grow' : 'Shrink'} by p%: multiply by (1 ${up ? '+' : '−'} p/100) each year.` }), 'F.LE.A.2', bAt(0, 0.6), 'adv');
    }
    if (l === 1) {
      const m = nz(-4, 4), b = U.int(-6, 6), c = nz(-3, 3), x = U.int(-3, 4), g = lin(m, b), f = `x^2 ${sgn(c)}`;
      const v = Alg.evalAt(Alg.parse(f), { x: Alg.evalAt(Alg.parse(g), { x }) });
      if (!fits(v)) return expo(l);
      return done(spr(`If ${T(`f(x) = ${tex(f)}`)} and ${T(`g(x) = ${tex(g)}`)}, what is the value of ${T(`f(g(${x}))`)}?`, v, { fig: Fig.table([['x', String(fx(x))], ['g(x)', '?'], ['f(g(x))', '?']], 'Inside first'), meta: { kind: 'compose', args: [f, g, x] }, why: `g(${x}) = ${Alg.evalAt(Alg.parse(g), { x })}, then f of that is ${v}.`, hint: 'Work from the inside out: find g(x) first, then put that into f.' }), 'F.BF.A.1', bAt(1, 0.5), 'adv');
    }
    const a = pick([160, 320, 640, 1280]), half = pick([2, 3, 4, 5]), t = half * U.int(2, 4), v = a / 2 ** (t / half);
    return done(spr(`A substance has a mass of ${a} grams. Its mass is cut in half every ${half} hours. What is its mass, in grams, after ${t} hours?`, v, { fig: pic(['⏳'], `half-life ${half} h`), meta: { kind: 'evalAt', args: [`${a}*(1/2)^(${t}/${half})`, {}] }, why: `${t / half} half-lives: ${a} ÷ ${2 ** (t / half)} = ${v}.`, hint: `Count the half-lives: ${t} ÷ ${half}. Halve the mass that many times.` }), 'F.LE.A.2', bAt(2, 0.3), 'adv');
  }

  // ===================== PROBLEM-SOLVING AND DATA ANALYSIS =====================
  function ratio(l) {
    if (l === 0) {
      const p = pick([10, 15, 20, 25, 30, 40, 60]), n = pick([40, 60, 80, 120, 150, 200, 250]), v = p * n / 100;
      return done(mc4(`What is ${p}% of ${n}?`, v, [n / p, p * n / 10, n - p], { fig: Fig.barModel(String(n), [`${p}%`, '']), meta: { kind: 'evalAt', args: [`${p}/100*${n}`, {}] }, why: `${p / 100} × ${n} = ${v}`, hint: `${p}% = ${p}/100.` }, () => v + nz(-10, 10)), '7.RP.A.3', bAt(0, 0.2), 'psda');
    }
    if (l === 1) {
      const kind = U.int(0, 4);
      let q, e, v, why, icon;
      if (kind === 0) { const mph = pick([15, 30, 45, 60, 75, 90]); q = `A vehicle travels at ${mph} miles per hour. What is its speed in feet per second? (1 mile = 5,280 feet)`; e = `${mph}*5280/3600`; v = mph * 5280 / 3600; why = `${mph} × 5,280 ÷ 3,600 = ${v}`; icon = '🚗'; }
      else if (kind === 1) { const per = pick([2, 3, 4, 5, 6]), amt = per * pick([50, 75, 120, 150]); q = `A pump moves ${amt} liters of water every ${per} minutes. How many liters does it move in 1 hour?`; e = `${amt}/${per}*60`; v = amt / per * 60; why = `${amt / per} liters per minute × 60 = ${v}`; icon = '💧'; }
      else if (kind === 2) { const n0 = pick([8, 10, 12, 16]), cups = pick([2, 2.5, 3, 4]), n1 = n0 * pick([2, 3, 4]) + pick([0, n0 / 2]); q = `A recipe uses ${cups} cups of flour for ${n0} muffins. How many cups are needed for ${n1} muffins?`; e = `${cups}/${n0}*${n1}`; v = +(cups / n0 * n1).toFixed(4); why = `${cups} ÷ ${n0} × ${n1} = ${v}`; icon = '🧁'; }
      else if (kind === 3) { const pages = pick([12, 18, 24, 30]), secs = pick([30, 45, 60, 90]), mins = pick([2, 3, 5, 10]); q = `A printer prints ${pages} pages in ${secs} seconds. How many pages does it print in ${mins} minutes?`; e = `${pages}/${secs}*${mins * 60}`; v = pages / secs * mins * 60; why = `${pages} pages per ${secs} s × ${mins * 60} s = ${v}`; icon = '🖨️'; }
      else { const price = pick([3.6, 4.8, 6, 7.5, 9]), feet = 3 * U.int(2, 9); q = `Fabric costs $${price.toFixed(2)} per yard. How much do ${feet} feet of fabric cost, in dollars? (1 yard = 3 feet)`; e = `${price}*${feet}/3`; v = +(price * feet / 3).toFixed(2); why = `${feet} feet = ${feet / 3} yards; ${feet / 3} × $${price.toFixed(2)} = $${v}`; icon = '🧵'; }
      if (!Number.isFinite(v) || !fits(v) || Math.abs(v * 100 - Math.round(v * 100)) > 1e-6) return ratio(l);
      return done(spr(q, v, { fig: pic([icon]), meta: { kind: 'evalAt', args: [e, {}] }, why, hint: 'Write the rate per one unit, then convert or scale. Let the units cancel.' }), 'N.Q.A.1', bAt(1, 0.4), 'psda');
    }
    const up = pick([10, 20, 25, 50]), down = pick([10, 20, 25, 40]), net = Math.round(((1 + up / 100) * (1 - down / 100) - 1) * 1000) / 10;
    const word = (v) => (v > 0 ? `${v}% greater than` : v < 0 ? `${-v}% less than` : 'equal to');
    return done(mc4(`The price of a jacket was increased by ${up}%. Then the new price was decreased by ${down}%. How does the final price compare with the original price?`, word(net), [word(up - down), word(+(up + down).toFixed(1)), word(-net || 5)], { fig: Fig.table([['Start', `+${up}%`, `−${down}%`], ['100', String(100 + up), String(+((100 + up) * (1 - down / 100)).toFixed(1))]]), meta: { kind: 'pctChain', args: [up, down] }, miss: { [word(up - down)]: 'Percents of different amounts cannot be added or subtracted directly.' }, why: `${1 + up / 100} × ${1 - down / 100} = ${+(1 + net / 100).toFixed(3)}: ${word(net)} the original.`, hint: 'Start with 100. Apply each change one at a time.' }, () => word(pick([1, -1]) * U.int(1, 40))), '7.RP.A.3', bAt(2, 0.5), 'psda');
  }
  function stats(l) {
    if (l === 0) {
      let xs; do { xs = Array.from({ length: U.int(5, 7) }, () => U.int(10, 40)); } while (xs.reduce((a, b) => a + b, 0) % xs.length);
      const m = xs.reduce((a, b) => a + b, 0) / xs.length;
      return done(spr(`What is the mean of the data set below?\n${xs.join(', ')}`, m, { fig: Fig.table([['Data', ...xs.map(String)]]), meta: { kind: 'mean', args: [xs] }, why: `Sum ${xs.reduce((a, b) => a + b, 0)} ÷ ${xs.length} = ${m}`, hint: 'Add all values, then divide by how many there are.' }), 'S.ID.A.2', bAt(0, 0.3), 'psda');
    }
    if (l === 1) {
      const m = pick([1.5, 2, 2.5, 3, 4]), b = U.int(5, 30), x = U.int(10, 20), v = m * x + b, pts = [2, 4, 6, 8, 10].map((t) => [t, Math.round(m * t + b + U.int(-2, 2))]);
      return done(spr(`The line of best fit for the scatterplot is ${T(`y = ${m}x + ${b}`)}. Based on the line, what is the predicted value of y when ${T(`x = ${x}`)}?`, v, { fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], pts, range: { x: [0, 12], y: [0, Math.ceil((m * 12 + b) / 10) * 10] }, step: 2 }), meta: { kind: 'evalAt', args: [`${m}*x + ${b}`, { x }] }, why: `${m} × ${x} + ${b} = ${v}`, hint: 'Substitute x into the equation of the line.' }), 'S.ID.B.6', bAt(1, 0.3), 'psda');
    }
    const est = U.int(30, 70), moe = U.int(2, 5), inside = est + pick([-1, 1]) * U.int(0, moe - 1), outs = [est - moe - U.int(2, 6), est + moe + U.int(2, 6), est + 2 * moe + U.int(1, 5)];
    return done(mc4(`A random sample of students at a school found that ${est}% plan to attend a fall concert, with a margin of error of ${moe}%. Which value is a plausible percent of ALL students at the school who plan to attend?`, `${inside}%`, outs.map((o) => `${o}%`), { fig: Fig.numLine(est - 2 * moe - 6, est + 2 * moe + 6, 1, { labels: [est - moe, est, est + moe], marks: [{ v: est, label: `${est}%` }] }), meta: { kind: 'moe', args: [est, moe] }, why: `Plausible values are from ${est - moe}% to ${est + moe}%.`, hint: 'Plausible values are within the margin of error of the estimate.' }), 'S.IC.B.4', bAt(2, 0.4), 'psda');
  }
  function prob(l) {
    const a = U.int(8, 40), b = U.int(8, 40), c = U.int(8, 40), d = U.int(8, 40), [r1, r2, c1, c2] = pick([['9th grade', '10th grade', 'Chose art', 'Chose music'], ['Morning', 'Afternoon', 'On time', 'Late'], ['Plan A', 'Plan B', 'Satisfied', 'Not satisfied']]);
    const fig = Fig.table([['', c1, c2, 'Total'], [r1, String(a), String(b), String(a + b)], [r2, String(c), String(d), String(c + d)], ['Total', String(a + c), String(b + d), String(a + b + c + d)]]);
    if (l === 0) { const tot = a + b + c + d, v = frac(a, tot); if (!fits(v)) return prob(l);
      return done(spr(`The table summarizes ${tot} responses. If one response is chosen at random, what is the probability that it is in the "${r1}" row and the "${c1}" column?`, v, { fig, meta: { kind: 'twoWay', args: [[a, b, c, d], 'joint'] }, why: `${a}/${tot} = ${v}`, hint: 'Divide the count in that cell by the grand total.' }), 'S.CP.A.4', bAt(0, 0.6), 'psda'); }
    if (l === 2) { const v = frac(a, a + c); if (!fits(v)) return prob(l);
      return done(spr(`Based on the table, if a response from the "${c1}" column is chosen at random, what is the probability that it is in the "${r1}" row?`, v, { fig, meta: { kind: 'twoWay', args: [[a, b, c, d], 'condCol'] }, miss: { [frac(a, a + b)]: `"From the ${c1} column" means divide by that column's total.` }, why: `${a}/${a + c} = ${v}`, hint: 'Divide by the total of the given COLUMN.' }), 'S.CP.B.6', bAt(2, 0.5), 'psda'); }
    const v = frac(c, c + d); if (!fits(v)) return prob(l);
    return done(spr(`Based on the table, if a response from the "${r2}" row is chosen at random, what is the probability that it is in the "${c1}" column?`, v, { fig, meta: { kind: 'twoWay', args: [[a, b, c, d], 'cond'] }, miss: { [frac(c, a + c)]: `"From the ${r2} row" means divide by that row's total.` }, why: `${c}/${c + d} = ${v}`, hint: 'A conditional probability divides by the total of the given row, not the grand total.' }), 'S.CP.B.6', bAt(l, 0.5), 'psda');
  }

  // ===================== GEOMETRY AND TRIGONOMETRY =====================
  function area(l) {
    if (l === 0) {
      const b = 2 * U.int(2, 12), h = U.int(3, 15), w = U.int(2, 10), shape = pick(['tri', 'rect']), v = shape === 'tri' ? b * h / 2 : b * w;
      return done(spr(shape === 'tri' ? `A triangle has a base of ${b} centimeters and a height of ${h} centimeters. What is its area, in square centimeters?` : `A rectangle has a length of ${b} meters and a width of ${w} meters. What is its area, in square meters?`, v, { fig: shape === 'tri' ? Fig.triangle('right') : Fig.table([['length', String(b)], ['width', String(w)]], '▭ Rectangle'), meta: { kind: 'evalAt', args: [shape === 'tri' ? `${b}*${h}/2` : `${b}*${w}`, {}] }, why: shape === 'tri' ? `½ × ${b} × ${h} = ${v}` : `${b} × ${w} = ${v}`, hint: shape === 'tri' ? 'Area of a triangle = ½ × base × height.' : 'Area of a rectangle = length × width.' }), '7.G.B.6', bAt(0, 0.2), 'geo');
    }
    if (l === 1) {
      const r = U.int(2, 9), h = U.int(2, 12), v = `${r * r * h}π`;
      return done(mc4(`A right circular cylinder has a radius of ${r} inches and a height of ${h} inches. What is its volume, in cubic inches?`, v, [`${2 * r * h}π`, `${r * h}π`, `${r * r * h * 2}π`], { fig: Fig.table([['Cylinder', 'V = πr²h'], ['r', String(r)], ['h', String(h)]]), meta: { kind: 'cylVol', args: [r, h] }, why: `π × ${r}² × ${h} = ${v}`, hint: 'Volume of a cylinder = π × radius² × height.' }, () => `${r * r * h + nz(-9, 9)}π`), 'G.GMD.A.3', bAt(1, 0.4), 'geo');
    }
    if (U.pick([true, false])) {
      const r = pick([3, 6, 9]), v = `${(4 * r ** 3) / 3}π`;
      return done(mc4(`A sphere has a radius of ${r} centimeters. What is its volume, in cubic centimeters?`, v, [`${4 * r * r}π`, `${(4 * r * r * r)}π`, `${r ** 3}π`], { fig: Fig.table([['Sphere', 'V = (4/3)πr³'], ['r', String(r)]]), meta: { kind: 'sphereVol', args: [r] }, why: `(4/3) × π × ${r}³ = ${v}`, hint: 'Volume of a sphere = (4/3)πr³.' }), 'G.GMD.A.3', bAt(2, 0.6), 'geo');
    }
    const k = pick([2, 3, 4, 5]), dim = pick(['area', 'volume']), v = dim === 'area' ? k * k : k ** 3;
    return done(spr(dim === 'area' ? `Each side of a square is multiplied by ${k}. The area of the new square is how many times the area of the original square?` : `Each dimension of a rectangular box is multiplied by ${k}. The volume of the new box is how many times the volume of the original box?`, v, { fig: pic(dim === 'area' ? ['⬛', '➡️', '⬛'] : ['📦', '➡️', '📦'], `× ${k} in every direction`), meta: { kind: 'evalAt', args: [`${k}^${dim === 'area' ? 2 : 3}`, {}] }, miss: { [String(k)]: dim === 'area' ? 'Both length and width grow, so the area grows by k × k.' : 'All three dimensions grow, so the volume grows by k × k × k.' }, why: `${dim === 'area' ? `${k} × ${k}` : `${k} × ${k} × ${k}`} = ${v}`, hint: dim === 'area' ? 'Area = length × width; both are multiplied by the same number.' : 'Volume = length × width × height. Each one is multiplied by the same number.' }), 'G.GMD.A.3', bAt(2, 0.4), 'geo');
  }
  function tri(l) {
    if (l === 0) {
      const a = U.int(25, 80), b = U.int(25, 80), c = 180 - a - b;
      if (c < 15) return tri(l);
      return done(spr(`In a triangle, two angles measure ${a}° and ${b}°. What is the measure, in degrees, of the third angle?`, c, { fig: Fig.triangle(c > 90 ? 'obtuse' : 'acute'), meta: { kind: 'evalAt', args: [`180 - ${a} - ${b}`, {}] }, why: `180 − ${a} − ${b} = ${c}`, hint: 'The angles of a triangle add up to 180°.' }), 'G.CO.C.10', bAt(0, 0.3), 'geo');
    }
    if (l === 1) {
      const a = U.intWhere(35, 145, (v) => v !== 90), want = a < 90 ? 'obtuse' : 'acute', v = 180 - a;
      return done(spr(`Two parallel lines are cut by a transversal. One of the angles formed measures ${a}°. What is the measure, in degrees, of each ${want} angle formed?`, v, { fig: Fig.angle(a, { label: `${a}°` }), meta: { kind: 'evalAt', args: [`180 - ${a}`, {}] }, miss: { [String(a)]: `That is the ${want === 'obtuse' ? 'acute' : 'obtuse'} angle. The other angles are supplementary to it.` }, why: `Every angle is either ${a}° or 180° − ${a}° = ${v}°.`, hint: 'With parallel lines, each angle is equal to the given angle or adds with it to 180°.' }), 'G.CO.C.9', bAt(1, 0.3), 'geo');
    }
    const s1 = U.int(3, 9), k = pick([1.5, 2, 2.5, 3]), s2 = U.int(4, 12), v = +(s2 * k).toFixed(1);
    if (!Number.isInteger(s1 * k)) return tri(l);
    return done(spr(`Triangle ABC is similar to triangle DEF, with A corresponding to D and B corresponding to E. AB = ${s1}, DE = ${s1 * k}, and BC = ${s2}. What is the length of EF?`, v, { fig: Fig.table([['', 'Small', 'Large'], ['AB ↔ DE', String(s1), String(s1 * k)], ['BC ↔ EF', String(s2), '?']], 'Similar triangles'), meta: { kind: 'evalAt', args: [`${s2}*${s1 * k}/${s1}`, {}] }, why: `Scale factor ${s1 * k}/${s1} = ${k}; EF = ${s2} × ${k} = ${v}.`, hint: 'Find the scale factor from the matching sides, then multiply.' }), 'G.SRT.B.5', bAt(2, 0.3), 'geo');
  }
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]];
  function trig(l) {
    if (l === 0) {
      const [a, b, c] = pick(TRIPLES), ask = pick(['hyp', 'leg']);
      return done(spr(ask === 'hyp' ? `A right triangle has legs of length ${a} and ${b}. What is the length of the hypotenuse?` : `A right triangle has a hypotenuse of length ${c} and one leg of length ${a}. What is the length of the other leg?`, ask === 'hyp' ? c : b, { fig: Fig.triangle('right'), meta: { kind: 'evalAt', args: [ask === 'hyp' ? `r(${a}^2 + ${b}^2)` : `r(${c}^2 - ${a}^2)`, {}] }, why: ask === 'hyp' ? `√(${a}² + ${b}²) = ${c}` : `√(${c}² − ${a}²) = ${b}`, hint: 'a² + b² = c², where c is the hypotenuse.' }), 'G.SRT.C.8', bAt(0, 0.6), 'geo');
    }
    if (l === 1) {
      const [a, b, c] = pick(TRIPLES), fn = pick(['sin', 'cos', 'tan']), v = fn === 'sin' ? frac(a, c) : fn === 'cos' ? frac(b, c) : frac(a, b);
      return done(mc4(`In right triangle PQR, angle R is a right angle. The side opposite angle P has length ${a}, the side adjacent to angle P has length ${b}, and the hypotenuse has length ${c}. What is ${T(`\\${fn}(P)`)}?`, v, [frac(b, c), frac(a, c), frac(a, b), frac(b, a), frac(c, a)].filter((x) => x !== v), { fig: Fig.triangle('right'), meta: { kind: 'trigRatio', args: [a, b, c, fn] }, why: `${fn} = ${fn === 'sin' ? 'opposite/hypotenuse' : fn === 'cos' ? 'adjacent/hypotenuse' : 'opposite/adjacent'} = ${v}`, hint: 'SOH CAH TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.' }), 'G.SRT.C.6', bAt(1, 0.5), 'geo');
    }
    if (U.pick([true, false])) { const x = U.int(12, 78);
      return done(spr(`In a right triangle, ${T(`\\sin(${x}^{\\circ}) = \\cos(k^{\\circ})`)}, where ${T('0 < k < 90')}. What is the value of k?`, 90 - x, { fig: Fig.triangle('right'), meta: { kind: 'evalAt', args: [`90 - ${x}`, {}] }, why: `The two acute angles of a right triangle add to 90°, and the sine of one equals the cosine of the other: k = 90 − ${x} = ${90 - x}.`, hint: 'sin(x°) = cos(90° − x°).' }), 'G.SRT.C.7', bAt(2, 0.4), 'geo'); }
    const s = U.int(2, 9), kind = pick(['30', '45']);
    return done(mc4(kind === '30' ? `In a right triangle with angles 30°, 60°, and 90°, the side opposite the 30° angle has length ${s}. What is the length of the side opposite the 60° angle?` : `In an isosceles right triangle, each leg has length ${s}. What is the length of the hypotenuse?`, kind === '30' ? `${s}√3` : `${s}√2`, kind === '30' ? [`${2 * s}`, `${s}√2`, `${2 * s}√3`] : [`${2 * s}`, `${s}√3`, `${s * s}`], { fig: Fig.triangle('right'), meta: { kind: 'specialTri', args: [kind, s] }, why: kind === '30' ? `30-60-90 sides: s, s√3, 2s → ${s}√3.` : `45-45-90 sides: s, s, s√2 → ${s}√2.`, hint: kind === '30' ? 'A 30-60-90 triangle has sides x, x√3, and 2x.' : 'A 45-45-90 triangle has sides x, x, and x√2.' }), 'G.SRT.C.8', bAt(2, 0.6), 'geo');
  }
  function circle(l) {
    if (l === 0) {
      const h = nz(-6, 6), k = nz(-6, 6), r = U.int(2, 9), P = (x, y) => `(${fx(x)}, ${fx(y)})`;
      return done(mc4(`The equation of a circle is ${T(`(x ${sgn(-h)})^{2} + (y ${sgn(-k)})^{2} = ${r * r}`)}. What are the center and radius of the circle?`, `center ${P(h, k)}, radius ${r}`, [`center ${P(-h, -k)}, radius ${r}`, `center ${P(h, k)}, radius ${r * r}`, `center ${P(-h, -k)}, radius ${r * r}`], { fig: Fig.graph({ pts: [[h, k, 'center']], range: [-10, 10], step: 5 }), meta: { kind: 'circleHK', args: [h, k, r] }, why: `(x − h)² + (y − k)² = r²: center ${P(h, k)}, radius √${r * r} = ${r}.`, hint: 'In (x − h)² + (y − k)² = r², the center is (h, k) and the radius is r (not r²).' }), 'G.GPE.A.1', bAt(0, 0.8), 'geo');
    }
    if (l === 1) {
      const r = U.int(2, 12), deg = pick([30, 45, 60, 90, 120, 135, 150, 180, 240, 270]), arc = frac(deg * 2 * r, 360);
      const show = (n) => (n === '1' ? 'π' : `${n}π`).replace(/^(\d+)\/(\d+)π$/, '$1π/$2').replace(/^1π\//, 'π/');
      return done(mc4(`A circle has a radius of ${r} centimeters. What is the length, in centimeters, of an arc with a central angle of ${deg}°?`, show(arc), [show(frac(deg * r * r, 360)), show(frac(deg * r, 360)), show(String(2 * r))], { fig: Fig.angle(deg > 180 ? 180 : deg, { label: `${deg}°` }), meta: { kind: 'arcLen', args: [deg, r] }, why: `${deg}/360 × 2π × ${r} = ${show(arc)}`, hint: 'Arc length = (central angle ÷ 360°) × 2πr.' }, () => show(String(U.int(1, 30)))), 'G.C.B.5', bAt(1, 0.5), 'geo');
    }
    const h = nz(-6, 6), k = nz(-6, 6), r = U.int(2, 9), D = -2 * h, E = -2 * k, F = h * h + k * k - r * r;
    return done(spr(`The equation ${T(`x^{2} + y^{2} ${sgn(D)}x ${sgn(E)}y ${F ? sgn(F) : ''} = 0`)} defines a circle in the xy-plane. What is the radius of the circle?`, r, { fig: Fig.table([['Complete the square', 'for x and for y']]), meta: { kind: 'circleR', args: [D, E, F] }, why: `(x ${sgn(-h)})² + (y ${sgn(-k)})² = ${r * r}, so r = ${r}.`, hint: 'Complete the square for x and for y; the number on the right is r².' }), 'G.GPE.A.1', bAt(2, 0.6), 'geo');
  }

  // extra question types for some levels come from sat-math2.js (SAT_MATH_EXTRA)
  const SK = (goal, id, name, icon, titles, std, desc, fn) => ({ goal, section: 'math', id, name, icon, levels: [0, 1, 2].map((l) => lv(titles[l], std[l], desc, [() => fn(l), ...(((typeof SAT_MATH_EXTRA !== 'undefined' && SAT_MATH_EXTRA[id]) || [])[l] || []).map((g) => () => g(l))])) });
  SAT_SKILLS.push(
    SK('alg', 'lin1', 'Linear equations in one variable', '⚖️', ['Solve for x', 'Equations from words', 'No solution'], ['A.REI.B.3', 'A.CED.A.1', 'A.REI.B.3'], 'Solve and build linear equations.', lin1),
    SK('alg', 'lin2', 'Linear functions', '📈', ['Slope', 'Equation of a line', 'Linear models'], ['F.IF.B.6', 'A.CED.A.2', 'F.LE.A.2'], 'Slope, lines, and linear functions.', lin2),
    SK('alg', 'sys', 'Systems of linear equations', '✖️', ['Solve a system', 'Combine equations', 'No solution'], ['A.REI.C.6', 'A.REI.C.6', 'A.REI.C.6'], 'Two equations, two unknowns.', sys),
    SK('alg', 'ineq', 'Linear inequalities', '↔️', ['Solve inequalities', 'Inequalities in context', 'Systems of inequalities'], ['A.REI.B.3', 'A.CED.A.3', 'A.REI.D.12'], 'Inequalities in one and two variables.', ineq),
    SK('adv', 'equiv', 'Equivalent expressions', '🟰', ['Multiply polynomials', 'Rational exponents', 'Rational expressions'], ['A.APR.A.1', 'N.RN.A.2', 'A.APR.D.6'], 'Rewrite expressions.', equiv),
    SK('adv', 'quad', 'Quadratics and nonlinear equations', '⛰️', ['Solve by factoring', 'Sum of solutions and vertex', 'Discriminant and radicals'], ['A.SSE.B.3', 'A.REI.B.4 · F.IF.C.8a', 'A.REI.B.4 · A.REI.A.2'], 'Quadratic and radical equations.', quad),
    SK('adv', 'expo', 'Exponential and nonlinear functions', '🚀', ['Growth and decay models', 'Composite functions', 'Half-life'], ['F.LE.A.2', 'F.BF.A.1', 'F.LE.A.2'], 'Exponential functions and function notation.', expo),
    SK('psda', 'ratio', 'Ratios, rates, and percentages', '％', ['Percents', 'Rates and units', 'Successive percent changes'], ['7.RP.A.3', 'N.Q.A.1', '7.RP.A.3'], 'Proportional reasoning and percents.', ratio),
    SK('psda', 'stats', 'Data and inference', '📊', ['Center of data', 'Lines of best fit', 'Margin of error'], ['S.ID.A.2', 'S.ID.B.6', 'S.IC.B.4'], 'Statistics and sampling.', stats),
    SK('psda', 'prob', 'Probability', '🎲', ['Probability from a table', 'Conditional probability by row', 'Conditional probability by column'], ['S.CP.A.4', 'S.CP.B.6', 'S.CP.B.6'], 'Probability and two-way tables.', prob),
    SK('geo', 'area', 'Area and volume', '📦', ['Area', 'Volume of a cylinder', 'Scaling volume'], ['7.G.B.6', 'G.GMD.A.3', 'G.GMD.A.3'], 'Area and volume formulas.', area),
    SK('geo', 'tri', 'Lines, angles, and triangles', '📐', ['Triangle angles', 'Parallel lines', 'Similar triangles'], ['G.CO.C.10', 'G.CO.C.9', 'G.SRT.B.5'], 'Angles and similar triangles.', tri),
    SK('geo', 'trig', 'Right triangles and trigonometry', '📏', ['Pythagorean theorem', 'Trig ratios', 'Special right triangles'], ['G.SRT.C.8', 'G.SRT.C.6', 'G.SRT.C.7 · G.SRT.C.8'], 'Right triangles and SOH CAH TOA.', trig),
    SK('geo', 'circle', 'Circles', '⭕', ['Circle equations', 'Arc length', 'Completing the square'], ['G.GPE.A.1', 'G.C.B.5', 'G.GPE.A.1'], 'Equations, arcs, and radii of circles.', circle),
  );
})();
