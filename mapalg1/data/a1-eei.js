// Algebra 1 Quest — Expressions, Equations, and Inequalities.
// Standards: NJSLS-Mathematics 2023 (A.SSE, A.CED, A.REI, A.APR). All original.
(function () {
  const { tag, nz, frac, ftex, lin, tx, lv, picQ, balance, areaAlg } = A1;
  const G = 'eei';
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);
  const fx = (s) => String(s).replace(/-(?=\d)/g, '−');
  // Multiple choice with real minus signs in the choices (and in the miss keys).
  function mcN(q, a, w, extra = {}) { const o = U.mc(q, fx(a), w.map(fx), extra); if (extra.miss) o.miss = Object.fromEntries(Object.entries(extra.miss).map(([k, v]) => [fx(k), v])); return o; }
  const sgn = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);

  // ===================== EXPRESSIONS =====================
  function parts() {
    const a = nz(-9, 9), b = nz(2, 9), c = nz(-12, 12), which = U.pick(['coefficient of x²', 'coefficient of x', 'constant term']);
    const e = `${a}x^2 ${sgn(b)}x ${sgn(c)}`.replace(/^1x/, 'x').replace(/^-1x/, '-x'), ans = String({ 'coefficient of x²': a, 'coefficient of x': b, 'constant term': c }[which]);
    const others = [a, b, c, a + b, -c].map(String).filter((v, i, arr) => v !== ans && arr.indexOf(v) === i).slice(0, 3);
    return tag(mcN(`In the expression ${tx(e)}, what is the ${which}?`, ans.replace('-', '−'), others.map((o) => o.replace('-', '−')), { fig: Fig.table([['Term', ...e.split(/ (?=[+-] )/).map((x) => x.replace(/^\+ /, '').replace(/^- /, '−'))]], 'The terms of the expression'), meta: { kind: 'evalAt', args: [{ 'coefficient of x²': String(a), 'coefficient of x': String(b), 'constant term': String(c) }[which], {}] }, hint: 'A coefficient is the number in front of a variable. The constant term has no variable.', why: `The ${which} is ${ans}.` }), 'A.SSE.A.1', 212, G);
  }
  function evaluate() {
    const a = nz(-6, 6), b = nz(-9, 9), c = nz(-9, 9), x = nz(-4, 4), e = U.pick([`${a}x^2 ${sgn(b)}x ${sgn(c)}`, `${a}(x ${sgn(b)})`, `${a}x ${sgn(b)}`]).replace(/^1x/, 'x').replace(/^-1x/, '-x').replace(/^1\(/, '(').replace(/^-1\(/, '-(');
    const v = Alg.evalAt(Alg.parse(e), { x });
    const sqWrong = e.includes('^2') ? Alg.evalAt(Alg.parse(e.replace('x^2', '(x*2)')), { x }) : v + 2 * x;
    return tag(U.num(`Evaluate ${tx(e)} when ${T(`x = ${x}`)}.`, String(v), { keys: v < 0 ? 'neg' : '', fig: Fig.table([['x', 'Expression', 'Value'], [x, Alg.tex(e).replace(/\\cdot/g, '·'), '?']], 'Substitute, then simplify'), meta: { kind: 'evalAt', args: [e, { x }] }, miss: { [String(sqWrong)]: e.includes('^2') ? 'x² means x times x, not 2 times x.' : 'Check the order of operations.' }, hint: `Replace x with (${x}) everywhere. Exponents first, then multiply, then add.`, why: `With x = ${x}, the value is ${v}.` }), 'A.SSE.A.1', 216, G);
  }
  function simplify(level) {
    let e;
    if (level === 0) { const a = nz(2, 9), b = nz(-9, 9), c = nz(-9, 9), d = nz(-9, 9); e = `${a}x ${sgn(b)} ${c < 0 ? '-' : '+'} ${Math.abs(c)}x ${sgn(d)}`; }
    else { const k = nz(-6, 6), a = nz(-5, 5), b = nz(-9, 9), c = nz(-7, 7), d = nz(-9, 9); e = `${k}(${a}x ${sgn(b)}) ${c < 0 ? '-' : '+'} ${Math.abs(c)}x ${sgn(d)}`; }
    e = e.replace(/^1\(/, '(').replace(/\(1x/, '(x').replace(/\(-1x/, '(-x').replace(/([+-]) 1x/g, '$1 x');
    const t = Alg.parse(e), c0 = Alg.evalAt(t, { x: 0 }), c1 = Alg.evalAt(t, { x: 1 }) - c0;
    if (c1 === 0) return simplify(level);
    const a = lin(c1, c0);
    const miss = {};
    if (level) { const m = e.match(/^(-?\d*)\((-?\d*)x ([+-]) (\d+)\)/); if (m) { const k = m[1] === '' ? 1 : m[1] === '-' ? -1 : +m[1]; const wrong = e.replace(/^(-?\d*)\((-?\d*)x ([+-]) (\d+)\)/, (all, kk, aa, op, bb) => `${k * (aa === '' ? 1 : aa === '-' ? -1 : +aa)}x ${op} ${bb}`); const w = Alg.parse(wrong); const w0 = Alg.evalAt(w, { x: 0 }), w1 = Alg.evalAt(w, { x: 1 }) - w0; if (w0 !== c0 || w1 !== c1) miss[lin(w1, w0)] = 'Distribute to EVERY term inside the parentheses, not just the first one.'; } }
    return tag({ t: 'expr', q: `Simplify. Write the answer expanded, with like terms combined.\n${tx(e)}`, a, form: 'expanded', miss, fig: level ? Fig.table([['Step', 'Do this'], ['1', 'Distribute'], ['2', 'Combine like terms']]) : Fig.table([['x terms', 'Number terms'], ['combine', 'combine']], 'Like terms go together'), meta: { kind: 'algEquiv', args: [e] }, hint: level ? 'Distribute first, then combine the x terms and the number terms.' : 'Combine the x terms. Combine the number terms.', why: `${Alg.tex(e)} simplifies to ${Alg.tex(a)}.` }, level ? 'A.SSE.A.2' : 'A.SSE.A.1', level ? 222 : 214, G);
  }
  function interpret() {
    const [q, a, w, why, icon] = U.pick([
      ['A gym charges $25 to join plus $15 per month. The cost for m months is 25 + 15m. What does 15 represent?', 'the cost per month', ['the cost to join', 'the number of months', 'the total cost'], '15 is multiplied by the number of months, so it is the monthly cost.', '🏋️'],
      ['A plant is 4 cm tall and grows 1.5 cm each week. Its height is 4 + 1.5w. What does 4 represent?', 'the starting height', ['the growth each week', 'the number of weeks', 'the final height'], '4 is the height when w = 0: the starting height.', '🌱'],
      ['A phone battery is at 100% and drops 8% per hour: 100 − 8h. What does 8 represent?', 'the percent lost each hour', ['the starting charge', 'the hours left', 'the charge after 8 hours'], '8 is multiplied by the hours, so it is the rate of loss per hour.', '🔋'],
      ['Tickets cost $12 each, with a $5 service fee per order: 12t + 5. What does t represent?', 'the number of tickets', ['the cost of one ticket', 'the service fee', 'the total cost'], 't is the variable multiplied by the ticket price: the number of tickets.', '🎟️'],
    ]);
    return tag(mcN(q, a, w, { fig: pic([icon]), hint: 'The number multiplied by the variable is a rate. The number added alone is a starting amount.', why }), 'A.SSE.A.1', 224, G);
  }
  function gcfFactor() {
    const g = U.int(2, 9), a = U.int(1, 6), b = U.intWhere(-9, 9, (v) => v !== 0 && A1.gcd(a, v) === 1), e = `${g * a}x ${sgn(g * b)}`.replace(/^1x/, 'x');
    const A = Math.abs(a) === 1 ? (a < 0 ? '-x' : 'x') : `${a}x`;
    const ans = `${g}(${A} ${sgn(b)})`;
    return tag({ t: 'expr', q: `Factor out the greatest common factor.\n${tx(e)}`, a: ans, form: 'factored', gcf: g, fig: Fig.table([['Term', e.split(' ')[0], (e.split(' ')[1] || '') + (e.split(' ')[2] || '')], ['Factors', `${g} · ${a}x`, `${g} · ${b}`]], `Greatest common factor: ${g}`), meta: { kind: 'algEquiv', args: [e] }, miss: { [`${g}(${A} ${sgn(b)})`.replace(String(g), String(g * 2))]: 'Check by distributing: multiply back to see if you get the original.' }, hint: 'Find the largest number that divides both terms. Write it outside the parentheses.', why: `${Alg.tex(e)} = ${Alg.tex(ans)}` }, 'A.SSE.A.2', 228, G);
  }

  // ===================== LINEAR EQUATIONS =====================
  function solveEq(level) {
    let L, Rt, x;
    x = U.int(-9, 9);
    if (level === 0) { const a = nz(-9, 9), b = nz(-15, 15); L = lin(a, b); Rt = String(a * x + b); }
    else if (level === 1) { const a = nz(-9, 9), c = U.intWhere(-9, 9, (v) => v !== a), b = nz(-15, 15), d = (a - c) * x + b; L = lin(a, b); Rt = lin(c, d); if (U.pick([true, false])) { const k = nz(2, 5); const inner = nz(-9, 9); L = `${k}(x ${sgn(inner)})`; Rt = lin(c, k * x + k * inner - c * x); if (c === k) return solveEq(level); } }
    else { const den = U.pick([2, 3, 4]), a = nz(-5, 5), b = nz(-9, 9); x = den * U.int(-4, 4); void a; L = `x/${den} ${sgn(b)}`; Rt = String(x / den + b); }
    const f = (v) => Alg.evalAt(Alg.parse(L), { x: v }) - Alg.evalAt(Alg.parse(Rt), { x: v });
    if (Math.abs(f(1) - f(0)) < 1e-12) return solveEq(level);
    const root = -f(0) / (f(1) - f(0));
    if (!Number.isInteger(root)) return solveEq(level);
    return tag(U.num(`Solve for x.\n${tx(L)} = ${tx(Rt)}`, String(root), { pre: 'x =', keys: 'neg', fig: balance(Alg.tex(L).replace(/\\cdot/g, '·'), Alg.tex(Rt).replace(/\\cdot/g, '·')), meta: { kind: 'solveLin', args: [L, Rt] }, miss: { [String(-root)]: 'Check the sign: substitute your answer back into the equation.' }, hint: 'Do the same thing to both sides. Undo adding or subtracting first, then multiplying or dividing.', why: `x = ${root}. Check: both sides equal ${Alg.evalAt(Alg.parse(L), { x: root })}.` }), 'A.REI.B.3', [212, 220, 222][level], G);
  }
  function wordEq() {
    const [q, L, R, why] = U.pick([
      ['A phone plan costs $20 plus $0.10 per text. Maya\'s bill was $34. How many texts did she send?', '20 + 0.1x', '34', '20 + 0.10x = 34, so 0.10x = 14 and x = 140.'],
      ['Leo has $45 and saves $12 a week. In how many weeks will he have $153?', '45 + 12x', '153', '45 + 12x = 153, so 12x = 108 and x = 9.'],
      ['A rectangle\'s length is 3 more than twice its width. Its perimeter is 54 cm. What is the width?', '2x + 2(2x + 3)', '54', '2w + 2(2w + 3) = 54 → 6w + 6 = 54 → w = 8.'],
      ['Three consecutive integers add up to 72. What is the smallest?', 'x + (x + 1) + (x + 2)', '72', 'x + (x+1) + (x+2) = 72 → 3x + 3 = 72 → x = 23.'],
      ['A taxi charges $3.50 plus $2 per mile. A ride cost $19.50. How many miles was it?', '3.5 + 2x', '19.5', '3.50 + 2x = 19.50 → 2x = 16 → x = 8.'],
    ]);
    const f = (v) => Alg.evalAt(Alg.parse(L), { x: v }) - +R, root = -f(0) / (f(1) - f(0));
    return tag(U.num(q, String(+root.toFixed(6)), { fig: Fig.table([['Words', 'Equation'], ['', `${Alg.tex(L).replace(/\\cdot/g, '·')} = ${R}`]], 'Write an equation'), meta: { kind: 'solveLin', args: [L, R] }, hint: 'Let x be the unknown. Write an equation, then solve it.', why }), 'A.CED.A.1', 224, G);
  }
  function literal() {
    const [q, a, vars, why] = U.pick([
      ['Solve y = mx + b for x.', '(y - b)/m', 'xymb', 'Subtract b, then divide by m: x = (y − b)/m.'],
      ['Solve y = a(x - b) for x.', 'y/a + b', 'xyab', 'Divide by a, then add b: x = y/a + b.'],
      ['Solve m = (a + b)/2 for b.', '2m - a', 'mab', 'Multiply by 2, then subtract a: b = 2m − a.'],
      ['Solve y = 3x - 2n for n.', '(3x - y)/2', 'xyn', 'Add 2n and subtract y: 2n = 3x − y, so n = (3x − y)/2.'],
      ['Solve t = ab + x for a.', '(t - x)/b', 'tabx', 'Subtract x, then divide by b.'],
      ['Solve a = 2(b + m) for m.', 'a/2 - b', 'abm', 'Divide by 2, then subtract b.'],
    ]);
    const target = q.match(/for (\w)\.$/)[1];
    return tag({ t: 'expr', q: `${q}\nType the expression for ${target}.`, a, vars: vars.replace(target, ''), pre: `${target} =`, fig: pic(['📐'], q.replace('Solve ', '').replace(/ for \w\.$/, '')), meta: { kind: 'literalSolve', args: [q, a] }, hint: `Undo each operation around ${target}, one step at a time, doing the same to both sides.`, why }, 'A.CED.A.4', 234, G);
  }

  // ===================== INEQUALITIES =====================
  const FLIP = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
  function ineqSolve(level) {
    const ops = ['<', '>', '≤', '≥'], op = U.pick(ops), a = level ? nz(-6, -2) : nz(2, 7), b = nz(-12, 12), x = U.int(-6, 6), c = a * x + b;
    const sol = a < 0 ? FLIP[op] : op, ans = `x ${sol} ${x}`;
    const w = [[`x ${op} ${x}`, a < 0 ? 'Dividing both sides by a negative number flips the inequality sign.' : 'Check the direction of the sign.'], [`x ${sol} ${-x}`, 'Check the sign of the number.'], [`x ${FLIP[sol]} ${x}`, 'Check the direction of the sign.'], [`x ${sol} ${c - b}`, `Divide both sides by ${a} after you subtract.`], [`x ${sol} ${x + 1}`, 'Check your arithmetic.']].filter(([o], i, all) => o !== ans && all.findIndex((y) => y[0] === o) === i).slice(0, 3);
    const opsTex = { '<': '<', '>': '>', '≤': '\\le', '≥': '\\ge' };
    return tag(mcN(`Solve the inequality.\n${T(`${Alg.tex(lin(a, b))} ${opsTex[op]} ${c}`)}`, ans, w.map((x) => x[0]), { miss: Object.fromEntries(w), fig: Fig.table([['Like an equation', 'Except'], ['Do the same to both sides', 'Multiply or divide by a negative: flip the sign']], '↔️ Solving inequalities'), meta: { kind: 'ineqSol', args: [a, b, op, c] }, hint: a < 0 ? 'When you divide or multiply by a negative number, flip the sign.' : 'Solve it like an equation.', why: `${lin(a, b)} ${op} ${c} → x ${sol} ${x}` }), 'A.REI.B.3', level ? 226 : 216, G);
  }
  function ineqGraph() {
    const op = U.pick(['<', '>', '≤', '≥']), v = U.int(-4, 4);
    const right = Fig.ineqLine(v, op, -6, 6), wrongs = [Fig.ineqLine(v, FLIP[op], -6, 6), Fig.ineqLine(v, { '<': '≤', '>': '≥', '≤': '<', '≥': '>' }[op], -6, 6), Fig.ineqLine(-v === v ? v + 1 : -v, op, -6, 6)];
    const opsTex = { '<': '<', '>': '>', '≤': '\\le', '≥': '\\ge' };
    return tag(A1.picQ(`Which graph shows ${T(`x ${opsTex[op]} ${v}`)}?`, right, wrongs, { hint: 'Open circle: < or >. Closed circle: ≤ or ≥. The arrow points toward the solutions.', why: `${op === '<' || op === '>' ? 'An open' : 'A closed'} circle at ${v} with the arrow pointing ${op === '<' || op === '≤' ? 'left' : 'right'}.` }), 'A.REI.B.3', 218, G);
  }
  function compound() { // Algebra 2 preview: compound and absolute value inequalities
    const c = U.int(-3, 3), r = U.int(2, 6), lo = c - r, hi = c + r, kind = U.pick(['abs', 'and']);
    const q = kind === 'abs' ? `|x ${c < 0 ? '+ ' + -c : '- ' + c}| < ${r}`.replace('- 0', '') : `${lo} < x < ${hi}`;
    const ans = `${lo} < x < ${hi}`;
    const w = [`x < ${lo} or x > ${hi}`, `${lo} < x < ${hi + 2 * c || hi + 1}`, `x < ${hi}`].filter((x) => x !== ans);
    return tag(mcN(kind === 'abs' ? `Which inequality describes all solutions of ${q}?` : `Which describes the numbers between ${lo} and ${hi}, not including the endpoints?`, ans, w, { fig: Fig.numLine(lo - 2, hi + 2, 1, { marks: [{ v: lo, label: String(lo) }, { v: hi, label: String(hi) }] }), meta: { kind: 'absIneq', args: [c, r] }, hint: '|x − c| < r means x is within r of c.', why: `The solutions are within ${r} of ${c}: ${ans}.` }), 'A.REI.B.3', 238, G);
  }

  // ===================== SYSTEMS =====================
  function sysMake() {
    const x = U.int(-5, 5), y = U.int(-5, 5);
    let a1, b1, a2, b2;
    do { a1 = nz(-4, 4); b1 = nz(-4, 4); a2 = nz(-4, 4); b2 = nz(-4, 4); } while (a1 * b2 - a2 * b1 === 0);
    return { x, y, a1, b1, c1: a1 * x + b1 * y, a2, b2, c2: a2 * x + b2 * y };
  }
  const eq2 = (a, b, c) => `${Alg.tex(lin(a, 0)).replace(/^0$/, '')} ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${c}`;
  function isSolution() {
    const S = sysMake(), test = U.pick([[S.x, S.y], [S.x + 1, S.y], [S.x, S.y - 1]]), ok = test[0] === S.x && test[1] === S.y;
    return tag(U.mcFixed(`Is ${T(`(${test[0]}, ${test[1]})`)} a solution of the system?\n${T(eq2(S.a1, S.b1, S.c1))}\n${T(eq2(S.a2, S.b2, S.c2))}`, ok ? 'Yes, it makes both equations true.' : 'No, it does not make both equations true.', ['Yes, it makes both equations true.', 'No, it does not make both equations true.', 'Only if it makes one equation true.'], { fig: Fig.graph({ fns: [{ kind: 'lin', m: -S.a1 / S.b1, b: S.c1 / S.b1 }, { kind: 'lin', m: -S.a2 / S.b2, b: S.c2 / S.b2 }], pts: [[test[0], test[1], '?']], range: [-8, 8] }), meta: { kind: 'sysCheck', args: [S, test] }, hint: 'Substitute x and y into BOTH equations.', why: ok ? `(${test[0]}, ${test[1]}) makes both equations true.` : `(${test[0]}, ${test[1]}) does not make both equations true.` }), 'A.REI.C.6', 218, G);
  }
  function solveSys(level) {
    const S = sysMake(), ans = `(${S.x}, ${S.y})`;
    const w = [`(${S.y}, ${S.x})`, `(${S.x}, ${-S.y})`, `(${-S.x}, ${S.y})`, `(${S.x + 1}, ${S.y})`].filter((v, i, a) => v !== ans && a.indexOf(v) === i).slice(0, 3);
    return tag(mcN(`Solve the system.\n${T(eq2(S.a1, S.b1, S.c1))}\n${T(eq2(S.a2, S.b2, S.c2))}`, ans, w, { fig: level ? Fig.table([['Method', 'Idea'], ['Substitution', 'Solve one equation for a variable'], ['Elimination', 'Add or subtract to cancel a variable']]) : Fig.graph({ fns: [{ kind: 'lin', m: -S.a1 / S.b1, b: S.c1 / S.b1 }, { kind: 'lin', m: -S.a2 / S.b2, b: S.c2 / S.b2 }], range: [-8, 8] }), meta: { kind: 'sysSol', args: [S.a1, S.b1, S.c1, S.a2, S.b2, S.c2] }, miss: { [`(${S.y}, ${S.x})`]: 'An ordered pair is (x, y): x comes first.' }, hint: level ? 'Multiply one equation so a variable cancels when you add.' : 'The solution is where the two lines cross.', why: `x = ${S.x} and y = ${S.y} make both equations true.` }), 'A.REI.C.6', level ? 228 : 222, G);
  }
  function sysWord() {
    const a = U.int(3, 9), b = U.intWhere(2, 8, (v) => v !== a), xn = U.int(3, 12), yn = U.int(3, 12), [thing, A, B] = U.pick([['tickets', 'adult', 'student'], ['coins', 'quarter', 'dime'], ['shirts', 'large', 'small']]);
    const total = xn + yn, cost = a * xn + b * yn;
    const isCoins = thing === 'coins', pa = isCoins ? 25 : a, pb = isCoins ? 10 : b, value = pa * xn + pb * yn;
    return tag(U.num(isCoins ? `A jar has ${total} coins, all quarters and dimes, worth ${value} cents. How many quarters are there?` : `A club sold ${total} ${thing}: ${A} ${thing} for $${a} each and ${B} ${thing} for $${b} each. It earned $${cost}. How many ${A} ${thing} did it sell?`, String(xn), { fig: Fig.table([['', 'Count', isCoins ? 'Value (¢)' : 'Price ($)'], [A, 'x', pa], [B, 'y', pb], ['Total', total, value]]), meta: { kind: 'sysSol1', args: [1, 1, total, pa, pb, value] }, hint: 'Write two equations: one for the number, one for the money. Then solve.', why: `x + y = ${total} and ${pa}x + ${pb}y = ${value} give x = ${xn}.` }), 'A.CED.A.3', 232, G);
  }
  function ineqRegion() { // preview: systems of inequalities (A.REI.D.12)
    const m = U.pick([1, 2, -1, -2]), b = U.int(-2, 2), up = U.pick([true, false]);
    const cand = [[0, 0], [3, -3], [-3, 3], [2, 5], [-2, -5], [4, 0]].filter(([x, y]) => Math.abs(y - (m * x + b)) > 0.5);
    const inS = cand.filter(([x, y]) => (up ? y > m * x + b : y < m * x + b)), outS = cand.filter(([x, y]) => !(up ? y > m * x + b : y < m * x + b));
    if (!inS.length || outS.length < 3) return ineqRegion();
    const [ax, ay] = U.pick(inS), ans = `(${ax}, ${ay})`;
    return tag(mcN(`Which point is a solution of ${T(`y ${up ? '>' : '<'} ${Alg.tex(lin(m, b))}`)}?`, ans, U.sample(outS, 3).map(([x, y]) => `(${x}, ${y})`), { fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], range: [-6, 6] }), meta: { kind: 'ineq2', args: [m, b, up ? '>' : '<'] }, hint: 'Substitute the point. Is the inequality true?', why: `${ay} ${up ? '>' : '<'} ${m}(${ax}) ${b < 0 ? '−' : '+'} ${Math.abs(b)} is true.` }), 'A.REI.D.12', 238, G);
  }

  // ===================== POLYNOMIALS =====================
  function polyAdd() {
    const p = [nz(-9, 9), nz(-9, 9), nz(-5, 5)], q = [nz(-9, 9), nz(-9, 9), nz(-5, 5)], op = U.pick(['+', '-']);
    const P = Alg.pstr(p), Q = Alg.pstr(q), r = op === '+' ? Alg.padd(p, q) : Alg.padd(p, q.map((c) => -c));
    if (!r[2] && !r[1]) return polyAdd();
    const wrongMinus = op === '-' ? Alg.pstr(Alg.padd(p, [-q[0], q[1], q[2]])) : null;
    const e = `(${P}) ${op} (${Q})`;
    return tag({ t: 'expr', q: `${op === '+' ? 'Add' : 'Subtract'}. Write the answer expanded.\n${tx(e)}`, a: Alg.pstr(r), form: 'expanded', miss: wrongMinus ? { [wrongMinus]: 'Subtract EVERY term of the second polynomial: distribute the minus sign.' } : {}, fig: Fig.table([['', 'x²', 'x', 'number'], ['First', p[2], p[1], p[0]], [op === '+' ? 'Second' : '− Second', op === '+' ? q[2] : -q[2], op === '+' ? q[1] : -q[1], op === '+' ? q[0] : -q[0]]], 'Line up like terms'), meta: { kind: 'algEquiv', args: [e] }, hint: op === '-' ? 'Change every sign in the second polynomial, then combine like terms.' : 'Combine like terms: x² with x², x with x, numbers with numbers.', why: `${Alg.tex(e)} = ${Alg.tex(Alg.pstr(r))}` }, 'A.APR.A.1', op === '-' ? 224 : 220, G);
  }
  function binomMul() {
    const a = nz(-3, 3), b = nz(-9, 9), c = nz(-3, 3), d = nz(-9, 9), r = Alg.pmul([b, a], [d, c]);
    const e = `(${lin(a, b)})(${lin(c, d)})`, ans = Alg.pstr(r);
    const noMiddle = Alg.pstr([b * d, 0, a * c]);
    return tag({ t: 'expr', q: `Multiply. Write the answer expanded.\n${tx(e)}`, a: ans, form: 'expanded', miss: { [noMiddle]: 'Multiply every term by every term: there are two middle terms to add.' }, fig: A1.areaAlg(a, b, c, d), meta: { kind: 'algEquiv', args: [e] }, hint: 'Use the area model: four products, then combine the two x terms.', why: `${Alg.tex(e)} = ${Alg.tex(ans)}` }, 'A.APR.A.1', 228, G);
  }
  function special() {
    const a = nz(1, 6), kind = U.pick(['sq+', 'sq-', 'diff']), x = U.pick(['x']);
    const e = kind === 'sq+' ? `(x + ${a})^2` : kind === 'sq-' ? `(x - ${a})^2` : `(x + ${a})(x - ${a})`;
    const r = kind === 'sq+' ? [a * a, 2 * a, 1] : kind === 'sq-' ? [a * a, -2 * a, 1] : [-a * a, 0, 1], ans = Alg.pstr(r);
    return tag({ t: 'expr', q: `Expand.\n${tx(e)}`, a: ans, form: 'expanded', miss: kind !== 'diff' ? { [Alg.pstr([a * a, 0, 1])]: '(x + a)² is not x² + a². Multiply (x + a)(x + a) to get the middle term.' } : {}, fig: kind !== 'diff' ? A1.areaAlg(1, kind === 'sq+' ? a : -a, 1, kind === 'sq+' ? a : -a) : A1.areaAlg(1, a, 1, -a), meta: { kind: 'algEquiv', args: [e] }, hint: '(a + b)² = a² + 2ab + b². (a + b)(a − b) = a² − b².', why: `${Alg.tex(e)} = ${Alg.tex(ans)}` }, 'A.SSE.A.2', 234, G);
  }
  function polyDivide() { // Algebra 2 preview: divide a polynomial by a monomial
    const k = U.int(2, 5), p = [k * nz(-5, 5), k * nz(-5, 5), k * nz(1, 4)], e = `(${Alg.pstr(p)})/${k}`;
    const ans = Alg.pstr(p.map((c) => c / k));
    return tag({ t: 'expr', q: `Divide. Write the answer expanded.\n${tx(e)}`, a: ans, form: 'expanded', miss: { [Alg.pstr([p[0] / k, p[1], p[2]])]: 'Divide EVERY term by the number, not just the last one.' }, fig: Fig.table([['Term', ...p.slice().reverse().map(String)], [`÷ ${k}`, ...p.slice().reverse().map((c) => String(c / k))]], 'Divide each term'), meta: { kind: 'algEquiv', args: [e] }, hint: `Divide each term by ${k}.`, why: `${Alg.tex(e)} = ${Alg.tex(ans)}` }, 'A.APR.D.6', 240, G);
  }

  // ===================== FACTORING & QUADRATICS =====================
  function factorTri(lead = 1) {
    const r = nz(-9, 9), s = nz(-9, 9), a = lead, poly = Alg.pmul([-r * 1, 1], [-s, 1]).map((c) => c * a);
    if (r === s && U.pick([true, false])) return factorTri(lead);
    const e = Alg.pstr(poly), f = (v) => (v < 0 ? `(x + ${-v})` : `(x - ${v})`), ans = `${a === 1 ? '' : a}${f(r)}${f(s)}`;
    return tag({ t: 'expr', q: `Factor completely.\n${tx(e)}`, a: ans, form: 'factored', gcf: a, miss: { [`${a === 1 ? '' : a}${f(-r)}${f(-s)}`]: 'Check the signs by multiplying your factors back out.' }, fig: Fig.table([['Multiply to', 'Add to'], [fx(r * s), fx(-(r + s))]], a === 1 ? 'Find two numbers' : `Take out ${a} first, then find two numbers`), meta: { kind: 'algEquiv', args: [e] }, hint: `Find two numbers that multiply to ${r * s} and add to ${-(r + s)}.`, why: `${Alg.tex(e)} = ${Alg.tex(ans)}` }, 'A.SSE.A.2', a === 1 ? 230 : 236, G);
  }
  function solveQuad() {
    const r = nz(-8, 8), s = U.intWhere(-8, 8, (v) => v !== r), p = Alg.pmul([-r, 1], [-s, 1]), e = Alg.pstr(p);
    const [lo, hi] = [r, s].sort((a, b) => a - b), ans = `x = ${lo} and x = ${hi}`;
    const w = [`x = ${-hi} and x = ${-lo}`, `x = ${lo * hi} and x = ${-(lo + hi)}`, `x = ${lo} only`].filter((x) => x !== ans);
    return tag(mcN(`Solve by factoring.\n${T(`${Alg.tex(e)} = 0`)}`, ans, w, { miss: { [`x = ${-hi} and x = ${-lo}`]: 'If (x − a) = 0, then x = a. Watch the signs.' }, fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h: (r + s) / 2, k: -(((r - s) / 2) ** 2) }], range: { x: [-9, 9], y: [-30, 30] }, step: 3 }), meta: { kind: 'roots', args: [e] }, hint: 'Factor, then set each factor equal to zero. The graph crosses the x-axis at the solutions.', why: `${Alg.tex(e)} = (x ${r < 0 ? '+' : '−'} ${Math.abs(r)})(x ${s < 0 ? '+' : '−'} ${Math.abs(s)}), so x = ${lo} or x = ${hi}.` }), 'A.SSE.B.3', 232, G);
  }
  function discriminant() {
    const a = nz(1, 3), b = U.int(-8, 8), c = U.int(-8, 8), D = b * b - 4 * a * c;
    const ans = D > 0 ? 'two real solutions' : D === 0 ? 'one real solution' : 'no real solutions';
    const e = Alg.pstr([c, b, a]);
    return tag(U.mcFixed(`How many real solutions does ${T(`${Alg.tex(e)} = 0`)} have?`, ans, ['two real solutions', 'one real solution', 'no real solutions'], { fig: Fig.table([['b² − 4ac', '> 0', '= 0', '< 0'], ['Real solutions', '2', '1', '0']], 'The discriminant'), meta: { kind: 'discCount', args: [a, b, c] }, hint: 'Find the discriminant b² − 4ac.', why: `b² − 4ac = ${b * b} − ${4 * a * c} = ${D}, so ${ans}.` }), 'A.REI.B.4', 238, G);
  }
  function quadFormula() {
    const a = 1, b = U.pick([2, 4, 6, -2, -4, -6]), c = U.pick([-1, -2, -3, -5, 1, 2]), D = b * b - 4 * a * c;
    if (D <= 0 || Number.isInteger(Math.sqrt(D))) return quadFormula();
    let s = 1, rest = D; for (let k = 2; k * k <= D; k++) if (D % (k * k) === 0) { s = k; rest = D / (k * k); }
    const h = -b / 2, half = s / 2, rad = rest;
    const piece = (sign) => `${h}${sign}${Number.isInteger(half) ? (half === 1 ? '' : half) : `(${s}/2)`}√${rad}`;
    const ans = `x = ${h} ± ${Number.isInteger(half) ? (half === 1 ? '' : half) : s + '/2'}√${rad}`;
    const w = [`x = ${-h} ± ${Number.isInteger(half) ? (half === 1 ? '' : half) : s + '/2'}√${rad}`, `x = ${h} ± ${s}√${rad}`, `x = ${-b} ± ${s}√${rest}`].filter((x) => x !== ans);
    void piece;
    return tag(mcN(`Use the quadratic formula to solve ${T(`${Alg.tex(Alg.pstr([c, b, a]))} = 0`)}.`, ans, w, { fig: Fig.table([['x = (−b ± √(b² − 4ac)) / 2a']], 'The quadratic formula'), meta: { kind: 'quadForm', args: [a, b, c] }, hint: 'a = 1, b = ' + b + ', c = ' + c + '. Simplify the square root.', why: `b² − 4ac = ${D} and √${D} = ${s}√${rest}; x = (${-b} ± ${s}√${rest})/2.` }), 'A.REI.B.4', 242, G);
  }

  A1_SKILLS.push(
    { goal: G, id: 'exprs', name: 'Expressions', icon: '🧮', levels: [
      lv('Parts and values of expressions', 'A.SSE.A.1', 'Terms, coefficients, substitution.', [parts, evaluate, () => simplify(0)]),
      lv('Simplify expressions', 'A.SSE.A.1 · A.SSE.A.2', 'Distribute and combine like terms.', [() => simplify(1), () => simplify(0), evaluate]),
      lv('Interpret and factor', 'A.SSE.A.1 · A.SSE.A.2', 'What the numbers mean; common factors.', [interpret, gcfFactor]),
    ] },
    { goal: G, id: 'lineq', name: 'Linear equations', icon: '⚖️', levels: [
      lv('Two-step equations', 'A.REI.B.3', 'Undo operations to find x.', [() => solveEq(0)]),
      lv('Variables on both sides', 'A.REI.B.3 · A.CED.A.1', 'Collect x terms, then solve.', [() => solveEq(1), wordEq]),
      lv('Fractions and formulas', 'A.REI.B.3 · A.CED.A.4', 'Solve for any variable.', [() => solveEq(2), literal]),
    ] },
    { goal: G, id: 'ineq', name: 'Inequalities', icon: '↔️', levels: [
      lv('Solve and graph inequalities', 'A.REI.B.3', 'Open or closed? Which way?', [() => ineqSolve(0), ineqGraph]),
      lv('When the sign flips', 'A.REI.B.3', 'Multiplying or dividing by a negative.', [() => ineqSolve(1), ineqGraph]),
      lv('Compound and absolute value (Algebra 2 preview)', 'A.REI.B.3', 'Between two numbers.', [compound, () => ineqSolve(1)]),
    ] },
    { goal: G, id: 'systems', name: 'Systems of equations', icon: '✖️', levels: [
      lv('Solutions and graphs', 'A.REI.C.6', 'Where two lines meet.', [isSolution, () => solveSys(0)]),
      lv('Substitution and elimination', 'A.REI.C.6', 'Solve without a graph.', [() => solveSys(1), sysWord]),
      lv('Systems of inequalities (preview)', 'A.REI.D.12 · A.CED.A.3', 'Shaded regions and constraints.', [ineqRegion, sysWord]),
    ] },
    { goal: G, id: 'polys', name: 'Polynomials', icon: '🧱', levels: [
      lv('Add and subtract polynomials', 'A.APR.A.1', 'Combine like terms.', [polyAdd]),
      lv('Multiply polynomials', 'A.APR.A.1', 'Every term times every term.', [binomMul, polyAdd]),
      lv('Special products and dividing (Algebra 2 preview)', 'A.SSE.A.2 · A.APR.D.6', 'Squares and differences of squares.', [special, polyDivide]),
    ] },
    { goal: G, id: 'factor', name: 'Factoring & quadratics', icon: '🔍', levels: [
      lv('Factor quadratics', 'A.SSE.A.2', 'Two numbers that multiply and add.', [() => factorTri(1), gcfFactor]),
      lv('Solve by factoring', 'A.SSE.B.3 · A.SSE.A.2', 'Zero-product property.', [solveQuad, () => factorTri(U.pick([2, 3]))]),
      lv('The quadratic formula (Algebra 2 preview)', 'A.REI.B.4', 'The discriminant and irrational roots.', [discriminant, quadFormula]),
    ] },
  );
})();
