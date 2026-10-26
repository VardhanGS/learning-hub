// Algebra 1 Quest — Patterns, Functions, and Graphing.
// Standards: NJSLS-Mathematics 2023 (F.IF, F.BF, F.LE, A.CED, A.REI.D, G.GPE.B.5, S.ID). All original.
(function () {
  const { tag, nz, frac, lin, lv, picQ, fx, mcN, kp } = A1;
  const G = 'func';
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);
  const sgn = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);
  const tex = (e) => Alg.tex(e).replace(/\\cdot/g, '\\,');
  const uniqS = (xs) => [...new Set(xs)];
  const setText = (xs) => `{${uniqS(xs).sort((a, b) => a - b).map(fx).join(', ')}}`;

  // ===================== FUNCTIONS =====================
  function fEval() {
    const a = nz(-5, 5), b = nz(-9, 9), c = U.int(-9, 9), x = nz(-5, 5);
    const e = U.pick([lin(a, b), Alg.pstr([c, b, a])]), v = Alg.evalAt(Alg.parse(e), { x });
    return tag(U.num(`If ${T(`f(x) = ${tex(e)}`)}, what is ${T(`f(${x})`)}?`, String(v), { keys: kp(v), fig: Fig.table([['Input x', String(fx(x))], ['Output f(x)', '?']], 'Function machine: input → output'), meta: { kind: 'evalAt', args: [e, { x }] }, hint: `f(${x}) means: replace every x with (${x}).`, why: `f(${x}) = ${v}` }), 'F.IF.A.2', 214, G);
  }
  function fSolve() {
    const a = nz(-6, 6), b = nz(-9, 9), x = U.int(-6, 6), k = a * x + b, e = lin(a, b);
    return tag(U.num(`If ${T(`f(x) = ${tex(e)}`)}, for what value of x is ${T(`f(x) = ${k}`)}?`, String(x), { keys: 'neg', pre: 'x =', fig: Fig.table([['Input x', '?'], ['Output f(x)', String(fx(k))]], 'Work backward from the output'), meta: { kind: 'solveLin', args: [e, String(k)] }, miss: { [String(a * k + b)]: `That is f(${k}). The question gives the OUTPUT ${k}; find the input.` }, hint: `Set ${e} = ${k} and solve for x.`, why: `${e} = ${k} gives x = ${x}.` }), 'F.IF.A.2', 220, G);
  }
  function isFunc() {
    const xs = U.sample([-3, -2, -1, 0, 1, 2, 3, 4], 4), ys = xs.map(() => U.int(-5, 5)), ok = U.pick([true, false]);
    const pairs = xs.map((x, i) => [x, ys[i]]);
    if (!ok) { const j = U.int(1, 3); pairs[j] = [pairs[0][0], pairs[0][1] + U.pick([1, 2, -1])]; }
    const A = ['Yes, each input has exactly one output.', 'No, an input has two different outputs.'];
    return tag(U.mcFixed(`Is this relation a function?\n${pairs.map(([x, y]) => `(${fx(x)}, ${fx(y)})`).join(', ')}`, ok ? A[0] : A[1], A, { fig: Fig.table([['Input x', ...pairs.map((p) => fx(p[0]))], ['Output y', ...pairs.map((p) => fx(p[1]))]], 'Inputs and outputs'), meta: { kind: 'isFunc', args: [pairs] }, hint: 'Look for an x-value that appears twice with different y-values.', why: ok ? 'Every x-value appears once, so each input has one output.' : `x = ${fx(pairs[0][0])} has two outputs.` }), 'F.IF.A.1', 216, G);
  }
  function vlt() {
    const kind = U.pick(['lin', 'quad', 'v', 'v']), f = kind === 'lin' ? { kind, m: nz(-2, 2), b: U.int(-3, 3) } : kind === 'quad' ? { kind, a: U.pick([1, -1, 0.5]), h: U.int(-2, 2), k: U.int(-3, 3) } : { kind, x: nz(-4, 4) };
    const A = ['Yes, it passes the vertical line test.', 'No, a vertical line crosses it more than once.'];
    return tag(U.mcFixed('Is this graph the graph of a function?', kind === 'v' ? A[1] : A[0], A, { fig: Fig.graph({ fns: [f] }), meta: { kind: 'isFuncGraph', args: [kind] }, hint: 'Imagine sliding a vertical line across. Does it ever touch the graph at two points?', why: kind === 'v' ? 'A vertical line is not a function: one x has many y-values.' : 'Every vertical line touches the graph at most once.' }), 'F.IF.A.1', 218, G);
  }
  function domRange() {
    const xs = U.sample([-4, -3, -2, -1, 0, 1, 2, 3, 5], 4), ys = xs.map(() => U.int(-5, 6)), which = U.pick(['domain', 'range']);
    const pairs = xs.map((x, i) => [x, ys[i]]), D = setText(xs), Rg = setText(ys), ans = which === 'domain' ? D : Rg;
    const w = [which === 'domain' ? Rg : D, setText([...xs, ...ys]), setText((which === 'domain' ? xs : ys).slice(1))].filter((v) => v !== ans);
    return tag(U.mc(`What is the ${which} of the function?\n${pairs.map(([x, y]) => `(${fx(x)}, ${fx(y)})`).join(', ')}`, ans, w, { fig: Fig.table([['x', ...xs.map(fx)], ['y', ...ys.map(fx)]], 'Domain = inputs, range = outputs'), meta: { kind: 'domRange', args: [pairs, which] }, miss: { [which === 'domain' ? Rg : D]: `That is the ${which === 'domain' ? 'range (outputs)' : 'domain (inputs)'}.` }, hint: 'The domain is the set of x-values (inputs). The range is the set of y-values (outputs).', why: `The ${which} is ${ans}.` }), 'F.IF.A.1', 222, G);
  }
  function readGraph() {
    const m = U.pick([1, -1, 2, -2, 0.5, -0.5]), b = U.int(-3, 3);
    const xs = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => Number.isInteger(m * x + b) && Math.abs(m * x + b) <= 6), x = U.pick(xs), v = m * x + b;
    return tag(U.num(`The graph shows ${T('y = f(x)')}. What is ${T(`f(${x})`)}?`, String(v), { keys: kp(v), fig: Fig.graph({ fns: [{ kind: 'lin', m, b }] }), meta: { kind: 'evalAt', args: [`${m}*x + ${b}`, { x }] }, hint: `Find x = ${x} on the x-axis, go up or down to the line, then read the y-value.`, why: `At x = ${x}, the line is at y = ${v}.` }), 'F.IF.A.2', 224, G);
  }
  function inverse() { // Algebra 2 preview (F.BF.B.4a)
    const a = U.pick([2, 3, 4, 5, -2, -3]), b = nz(-9, 9), e = lin(a, b), ans = `(x ${b < 0 ? '+ ' + -b : '- ' + b})/${a < 0 ? `(${a})` : a}`;
    return tag({ t: 'expr', q: `Find the inverse of ${T(`f(x) = ${tex(e)}`)}.`, a: ans, pre: 'f⁻¹(x) =', fig: Fig.table([['f does', `× ${fx(a)}`, `then ${b < 0 ? '−' : '+'} ${Math.abs(b)}`], ['f⁻¹ undoes', `${b < 0 ? '+' : '−'} ${Math.abs(b)}`, `then ÷ ${fx(a)}`]], 'Undo in reverse order'), meta: { kind: 'inverse', args: [e] }, miss: { [`(x ${b < 0 ? '- ' + -b : '+ ' + b})/${a < 0 ? `(${a})` : a}`]: 'To undo adding, subtract (and to undo subtracting, add).', [`x/${a < 0 ? `(${a})` : a} ${b < 0 ? '+ ' + -b : '- ' + b}`]: 'Undo in reverse order: first undo the adding, THEN divide.' }, hint: 'Write y = f(x), swap x and y, then solve for y.', why: `f⁻¹(x) = ${ans}. Check: f(f⁻¹(x)) = x.` }, 'F.BF.B.4a', 240, G);
  }

  // ===================== LINEAR FUNCTIONS =====================
  function slope2() {
    let x1, x2, y1, y2;
    do { x1 = U.int(-5, 5); x2 = U.int(-5, 5); y1 = U.int(-5, 5); y2 = U.int(-5, 5); } while (x1 === x2 || y1 === y2);
    const a = frac(y2 - y1, x2 - x1);
    return tag(U.num(`What is the slope of the line through ${T(`(${x1}, ${y1})`)} and ${T(`(${x2}, ${y2})`)}?`, a, { keys: kp(a), fig: Fig.graph({ pts: [[x1, y1, 'A'], [x2, y2, 'B']] }), meta: { kind: 'slope', args: [x1, y1, x2, y2] }, miss: { [frac(x2 - x1, y2 - y1)]: 'Slope is rise over run: change in y on top, change in x on the bottom.' }, hint: 'slope = (y₂ − y₁) / (x₂ − x₁). Write a fraction in lowest terms.', why: `(${y2} − ${fx(y1)}) / (${x2} − ${fx(x1)}) = ${a}` }), 'F.IF.B.6', 218, G);
  }
  const NICE_M = [[1, 1], [2, 1], [3, 1], [-1, 1], [-2, 1], [-3, 1], [1, 2], [-1, 2], [2, 3], [-2, 3], [3, 2], [-1, 3]];
  function slopeGraph() {
    const [p, d] = U.pick(NICE_M), m = p / d, b = U.int(-3, 3), x1 = d * U.int(-1, 0), x2 = x1 + d;
    const a = frac(p, d);
    return tag(U.num('What is the slope of the line?', a, { keys: kp(a), fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], pts: [[x1, m * x1 + b], [x2, m * x2 + b]] }), meta: { kind: 'slope', args: [x1, m * x1 + b, x2, m * x2 + b] }, miss: p !== d ? { [frac(d, p)]: 'Rise over run: count up or down first, then across.' } : {}, hint: 'From one dot to the other: how far up or down (rise)? How far right (run)?', why: `rise ${p}, run ${d}: slope ${a}` }), 'F.IF.B.6', 220, G);
  }
  function lineEq() {
    const m = nz(-4, 4), x1 = nz(-4, 4), y1 = U.int(-6, 6), b = y1 - m * x1, ans = lin(m, b), twoPts = U.pick([true, false]);
    const x2 = x1 + U.pick([1, 2]), y2 = y1 + m * (x2 - x1);
    const q = twoPts ? `Write the equation of the line through ${T(`(${x1}, ${y1})`)} and ${T(`(${x2}, ${y2})`)} in slope-intercept form.` : `Write the equation of the line with slope ${fx(m)} through ${T(`(${x1}, ${y1})`)} in slope-intercept form.`;
    const miss = {}; const wrongB = lin(m, y1 + m * x1); if (wrongB !== ans) miss[wrongB] = 'Find b by substituting the point: y₁ = m·x₁ + b, so b = y₁ − m·x₁.';
    return tag({ t: 'expr', q, a: ans, pre: 'y =', form: 'expanded', fig: Fig.graph({ pts: twoPts ? [[x1, y1, 'A'], [x2, y2, 'B']] : [[x1, y1, 'P']], range: [-8, 8], step: 4 }), meta: { kind: 'lineThru', args: [x1, y1, x2, y2] }, miss, hint: 'y = mx + b. Find m, then put the point in to find b.', why: `m = ${m}, b = ${fx(y1)} − (${fx(m)})(${fx(x1)}) = ${b}, so y = ${ans}.` }, twoPts ? 'A.CED.A.2' : 'F.LE.A.2', twoPts ? 228 : 224, G);
  }
  function plotLine() {
    const [p, d] = U.pick(NICE_M), m = p / d, b = U.int(-4, 4);
    const mt = d === 1 ? (p === 1 ? '' : p === -1 ? '-' : String(p)) : `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${d}}`;
    const eq = `y = ${mt}x ${b ? (b < 0 ? '- ' + -b : '+ ' + b) : ''}`.trim();
    return tag({ t: 'plot', q: `Graph the line ${T(eq)}.`, plot: { kind: 'line', m, b }, n: 2, range: [-6, 6], meta: { kind: 'plotLine', args: [`y = ${m}*x + ${b}`] }, hint: `Start at the y-intercept (0, ${b}). Then use the slope: rise ${p}, run ${d}.`, why: `The line crosses the y-axis at ${b} and has slope ${frac(p, d)}.` }, 'A.REI.D.10', 222, G);
  }
  function plotIntercept() {
    const m = nz(-3, 3), b = U.int(-5, 5);
    return tag({ t: 'plot', q: `Plot the y-intercept of ${T(`y = ${tex(lin(m, b))}`)}.`, plot: { kind: 'points', pts: [[0, b]] }, n: 1, range: [-6, 6], meta: { kind: 'plotPoints', args: [[[0, b]]] }, hint: 'The y-intercept is where x = 0: the number b in y = mx + b.', why: `At x = 0, y = ${b}: the point (0, ${b}).` }, 'F.IF.C.7a', 216, G);
  }
  function perp() {
    const [p, d] = U.pick(NICE_M), kind = U.pick(['perpendicular', 'parallel', 'perpendicular']), b = U.int(-5, 5);
    const mt = d === 1 ? (p === 1 ? '' : p === -1 ? '-' : String(p)) : `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${d}}`;
    const ans = kind === 'parallel' ? frac(p, d) : frac(-d, p);
    const miss = {}; if (kind === 'perpendicular') { if (frac(d, p) !== ans) miss[frac(d, p)] = 'Perpendicular slopes are opposite reciprocals: flip the fraction AND change the sign.'; if (frac(-p, d) !== ans) miss[frac(-p, d)] = 'Flip the fraction too, not just the sign.'; }
    return tag(U.num(`What is the slope of a line ${kind} to ${T(`y = ${mt}x ${b ? (b < 0 ? '- ' + -b : '+ ' + b) : ''}`.trim())}?`, ans, { keys: kp(ans), fig: Fig.graph({ fns: [{ kind: 'lin', m: p / d, b }] }), meta: { kind: 'perpSlope', args: [p, d, kind] }, miss, hint: kind === 'parallel' ? 'Parallel lines have the same slope.' : 'Perpendicular slopes multiply to −1: flip the fraction and change the sign.', why: `The ${kind} slope is ${ans}.` }), 'G.GPE.B.5', kind === 'parallel' ? 226 : 234, G);
  }
  function parallelThru() {
    const m = nz(-3, 3), b0 = U.int(-5, 5), x1 = nz(-3, 3), y1 = U.int(-5, 5), b = y1 - m * x1;
    if (b === b0) return parallelThru();
    const L = (mm, bb) => `y = ${fx(lin(mm, bb)).replace(/ - /, ' − ')}`, ans = L(m, b);
    const w = [L(m, b0), L(-m, y1 + m * x1), L(m, y1 + m * x1), L(-m, b)].filter((v, i, a) => v !== ans && a.indexOf(v) === i).slice(0, 3);
    return tag(U.mc(`Which line is parallel to ${T(`y = ${tex(lin(m, b0))}`)} and passes through ${T(`(${x1}, ${y1})`)}?`, ans, w, { fig: Fig.graph({ fns: [{ kind: 'lin', m, b: b0 }], pts: [[x1, y1, 'P']], range: [-8, 8], step: 4 }), meta: { kind: 'lineThru', args: [x1, y1, x1 + 1, y1 + m] }, hint: 'Same slope. Then substitute the point to find b.', why: `Slope ${m}; b = ${fx(y1)} − (${fx(m)})(${fx(x1)}) = ${b}.` }), 'G.GPE.B.5', 236, G);
  }

  // ===================== EXPONENTIAL =====================
  function tableType() {
    const kind = U.pick(['linear', 'exponential', 'neither']), a = U.int(1, 5);
    const ys = kind === 'linear' ? (() => { const d = nz(-6, 6); return [0, 1, 2, 3].map((x) => a * 3 + d * x); })() : kind === 'exponential' ? (() => { const r = U.pick([2, 3, 4]); return [0, 1, 2, 3].map((x) => a * r ** x); })() : [0, 1, 2, 3].map((x) => x * x + a);
    return tag(U.mcFixed('Does the table show a linear function, an exponential function, or neither?', kind, ['linear', 'exponential', 'neither'], { fig: Fig.table([['x', '0', '1', '2', '3'], ['y', ...ys.map(fx)]], 'Look at how y changes'), meta: { kind: 'tableType', args: [ys] }, hint: 'Linear: you ADD the same amount each time. Exponential: you MULTIPLY by the same amount each time.', why: kind === 'linear' ? `y changes by ${ys[1] - ys[0]} each step.` : kind === 'exponential' ? `y is multiplied by ${ys[1] / ys[0]} each step.` : 'The differences change and the ratios change.' }), 'F.LE.A.1', 222, G);
  }
  const RATES = [1.05, 1.1, 1.2, 1.25, 1.5, 2, 0.9, 0.8, 0.75, 0.6, 0.95];
  const rateText = (b) => (b > 1 ? `growth of ${Math.round((b - 1) * 100)}% each year` : `decay of ${Math.round((1 - b) * 100)}% each year`);
  function growth() {
    const b = U.pick(RATES), a = U.pick([200, 500, 1000, 1500, 2000]), ans = rateText(b);
    const pc = Math.round(b * 100), opp = b > 1 ? `decay of ${Math.round((b - 1) * 100)}% each year` : `growth of ${Math.round((1 - b) * 100)}% each year`;
    const w = uniqS([opp, `growth of ${pc}% each year`, `decay of ${pc}% each year`]).filter((v) => v !== ans);
    return tag(U.mc(`A model for a population is ${T(`P = ${a}(${b})^{t}`)}, with t in years. What does it show?`, ans, w, { fig: Fig.graph({ fns: [{ kind: 'exp', a: 1, b }], range: { x: [0, 8], y: [0, 4] }, step: 2 }), meta: { kind: 'growthRate', args: [b] }, miss: { [opp]: b > 1 ? 'A base greater than 1 means growth.' : 'A base less than 1 means decay.', [`${b > 1 ? 'growth' : 'decay'} of ${pc}% each year`]: `The rate is the base minus 1: ${b} − 1.` }, hint: 'Base b > 1: growth by (b − 1). Base b < 1: decay by (1 − b).', why: `${b} ${b > 1 ? '= 1 + ' + (b - 1).toFixed(2).replace(/0$/, '') : '= 1 − ' + (1 - b).toFixed(2).replace(/0$/, '')}, so it is ${ans}.` }), 'F.LE.B.5', 228, G);
  }
  function expEval() {
    const [b, word, icon] = U.pick([[2, 'doubles', '🦠'], [3, 'triples', '🦠'], [0.5, 'is cut in half', '☢️'], [1.5, 'grows by 50%', '🌿']]), t = U.int(2, 4), a = (b === 0.5 || b === 1.5 ? 2 ** t : 1) * U.int(2, 9) * (b === 0.5 ? 10 : 1);
    const v = a * b ** t, e = `${a}*${b}^t`;
    return tag(U.num(`An amount starts at ${a} and ${word} every hour. The amount after t hours is ${T(`A = ${a}(${b})^{t}`)}. What is the amount after ${t} hours?`, String(v), { keys: kp(v), fig: pic([icon], `Start: ${a}. Each hour: × ${b}`), meta: { kind: 'evalAt', args: [e, { t }] }, miss: { [String(a * b * t)]: `The exponent means multiply by ${b} again and again, not multiply by ${t}.` }, hint: `Multiply ${a} by ${b}, ${t} times.`, why: `${a} × ${b}^${t} = ${v}` }), 'F.LE.A.2', 226, G);
  }
  function expSolve() { // logarithm preview (F.LE.A.4)
    const b = U.int(2, 5), x = U.int(2, b === 2 ? 7 : b === 3 ? 5 : 4), v = b ** x, asLog = U.pick([true, false]);
    return tag(U.num(asLog ? `Evaluate ${T(`\\log_{${b}} ${v}`)}.` : `Solve ${T(`${b}^{x} = ${v}`)}.`, String(x), { pre: asLog ? '' : 'x =', fig: Fig.table([['Power', ...[1, 2, 3, 4].map((k) => MathText.plain(`${b}^{${k}}`))], ['Value', ...[1, 2, 3, 4].map((k) => String(b ** k))]], `Powers of ${b}`), meta: { kind: 'expSolve', args: [b, v] }, miss: { [String(v / b)]: `That is ${v} ÷ ${b}. The question asks how many times you multiply by ${b}.` }, hint: asLog ? `log base ${b} of ${v} asks: ${b} to what power is ${v}?` : `${b} to what power gives ${v}?`, why: `${b}^${x} = ${v}` }), 'F.LE.A.4', 240, G);
  }

  // ===================== QUADRATIC FUNCTIONS =====================
  const vtx = (a, h, k) => `${a === 1 ? '' : a === -1 ? '-' : a}${h === 0 ? 'x' : `(x ${h < 0 ? '+ ' + -h : '- ' + h})`}^{2}${k === 0 ? '' : k < 0 ? ' - ' + -k : ' + ' + k}`; // h = 0: x², not (x − 0)²
  function vertex() {
    const a = U.pick([1, -1, 2, -2, 3]), h = nz(-6, 6), k = nz(-9, 9), P = (x, y) => `(${fx(x)}, ${fx(y)})`, ans = P(h, k);
    return tag(U.mc(`What is the vertex of ${T(`y = ${vtx(a, h, k)}`)}?`, ans, [P(-h, k), P(h, -k), P(-h, -k)], { fig: Fig.table([['Vertex form', 'Vertex'], ['y = a(x − h)² + k', '(h, k)']], 'Read the vertex from the equation'), meta: { kind: 'vertex', args: [h, k] }, miss: { [P(-h, k)]: `(x − h): the sign inside is the opposite of h. Here h = ${h}.` }, hint: 'In y = a(x − h)² + k, the vertex is (h, k). Careful with the sign of h.', why: `The vertex is ${ans}.` }), 'F.IF.C.8a', 226, G);
  }
  function axis() {
    const a = U.pick([1, -1, 2, -2, 3]), h = nz(-5, 5), b = -2 * a * h, c = U.int(-9, 9), e = Alg.pstr([c, b, a]);
    return tag(U.num(`What is the axis of symmetry of ${T(`y = ${tex(e)}`)}?`, String(h), { keys: 'neg', pre: 'x =', fig: Fig.table([['Axis of symmetry'], ['x = −b / (2a)']], 'A parabola is symmetric'), meta: { kind: 'axisSym', args: [a, b] }, miss: { [String(-h)]: 'x = −b/(2a): remember the minus sign in front of b.' }, hint: `a = ${a}, b = ${b}. Use x = −b / (2a).`, why: `x = −(${b}) / (2 · ${a}) = ${h}` }), 'F.IF.C.8a', 230, G);
  }
  function maxMin() {
    const a = U.pick([1, -1, 2, -2, -3]), h = U.int(-5, 5), k = nz(-9, 9), e = `${a}*(x - ${h})^2 + ${k}`;
    return tag(U.num(`What is the ${a < 0 ? 'maximum' : 'minimum'} value of ${T(`y = ${vtx(a, h, k)}`)}?`, String(k), { keys: 'neg', fig: Fig.graph({ fns: [{ kind: 'quad', a, h, k }], range: { x: [-10, 10], y: [-14, 14] }, step: 4, labels: false }), meta: { kind: 'evalAt', args: [e, { x: h }] }, miss: { [String(h)]: 'That is the x-value of the vertex. The question asks for the y-value.' }, hint: `The parabola opens ${a < 0 ? 'down, so the vertex is the highest point' : 'up, so the vertex is the lowest point'}. Its y-value is the answer.`, why: `The vertex is (${h}, ${k}), so the ${a < 0 ? 'maximum' : 'minimum'} is ${k}.` }), 'F.IF.B.4', 228, G);
  }
  function zerosGraph() {
    const r = U.int(-5, 3), s = r + U.int(2, 6), a = U.pick([1, -1]), e = Alg.pstr(Alg.pmul([-r, 1], [-s, 1]).map((c) => c * a));
    const ans = `x = ${fx(r)} and x = ${fx(s)}`, h = (r + s) / 2, k = -a * (((s - r) / 2) ** 2);
    const w = [`x = ${fx(-s)} and x = ${fx(-r)}`, `x = ${fx(h)} only`, `x = ${fx(r)} and x = ${fx(k)}`].filter((v) => v !== ans);
    return tag(U.mc(`The graph shows ${T(`y = ${tex(e)}`)}. What are its zeros?`, ans, w, { fig: Fig.graph({ fns: [{ kind: 'quad', a, h, k }], range: { x: [-8, 8], y: [-12, 12] }, step: 2 }), meta: { kind: 'roots', args: [e] }, hint: 'The zeros are where the graph crosses the x-axis (where y = 0).', why: `The graph crosses the x-axis at ${r} and ${s}.` }), 'F.IF.C.7a', 230, G);
  }
  function quadPic() {
    const h = nz(-3, 3), k = nz(-3, 3), a = U.pick([1, -1]), g = (aa, hh, kk) => Fig.graph({ fns: [{ kind: 'quad', a: aa, h: hh, k: kk }], fs: 20, lw: 6 });
    return tag(picQ(`Which graph shows ${T(`y = ${vtx(a, h, k)}`)}?`, g(a, h, k), [g(a, -h, k), g(-a, h, k), g(a, h, -k)], { hint: 'Find the vertex (h, k). If a is negative, the parabola opens down.', why: `Vertex (${h}, ${k}), opening ${a < 0 ? 'down' : 'up'}.` }), 'F.IF.C.7a', 232, G);
  }
  const shiftText = (h, k) => `${h > 0 ? 'right' : 'left'} ${Math.abs(h)} and ${k > 0 ? 'up' : 'down'} ${Math.abs(k)}`;
  function transform() {
    const h = nz(-4, 4), k = nz(-4, 4), ans = shiftText(h, k);
    const w = uniqS([shiftText(-h, k), shiftText(h, -k), shiftText(-h, -k), shiftText(k, h)]).filter((v) => v !== ans).slice(0, 3);
    return tag(U.mc(`The graph of ${T('f(x) = x^{2}')} is moved to make ${T(`g(x) = (x ${h < 0 ? '+ ' + -h : '- ' + h})^{2} ${k < 0 ? '- ' + -k : '+ ' + k}`)}. How did it move?`, ans, w, { fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 0, k: 0, label: 'f' }, { kind: 'quad', a: 1, h, k, label: 'g' }] }), meta: { kind: 'shift', args: [h, k] }, miss: { [shiftText(-h, k)]: 'f(x − h) moves the graph RIGHT h. The sign inside works backward.' }, hint: 'f(x − h) + k moves the graph right h and up k.', why: `g(x) = f(x ${h < 0 ? '+ ' + -h : '− ' + h}) ${k < 0 ? '− ' + -k : '+ ' + k}: ${ans}.` }), 'F.BF.B.3', 234, G);
  }

  // ===================== SEQUENCES =====================
  function seqMake() {
    if (U.pick([true, false])) { const a = U.int(-10, 20), d = nz(-7, 9); return { kind: 'arith', a, d, terms: [0, 1, 2, 3].map((i) => a + d * i) }; }
    const a = U.pick([1, 2, 3, 5, -2, 4]), r = U.pick([2, 3, -2]); return { kind: 'geo', a, r, terms: [0, 1, 2, 3].map((i) => a * r ** i) };
  }
  function nextTerm() {
    const S = seqMake(), v = S.kind === 'arith' ? S.terms[3] + S.d : S.terms[3] * S.r;
    return tag(U.num(`What is the next term?\n${S.terms.map(fx).join(', ')}, …`, String(v), { keys: kp(v), fig: Fig.table([['Term', '1st', '2nd', '3rd', '4th', '5th'], ['Value', ...S.terms.map(fx), '?']], 'Find the pattern'), meta: { kind: 'seqNext', args: [S.terms] }, hint: 'Is there a common difference (add the same each time) or a common ratio (multiply the same each time)?', why: S.kind === 'arith' ? `Add ${S.d} each time: ${v}.` : `Multiply by ${S.r} each time: ${v}.` }), 'F.IF.A.3', 214, G);
  }
  function nthTerm() {
    const S = seqMake(), n = S.kind === 'arith' ? U.int(10, 30) : U.int(6, 8), e = S.kind === 'arith' ? `${S.a} + (n - 1)*${S.d}` : `${S.a}*${S.r}^(n - 1)`, v = Alg.evalAt(Alg.parse(e), { n });
    const shown = S.kind === 'arith' ? `a_{n} = ${S.a} + ${S.d < 0 ? `(${S.d})` : S.d}(n - 1)` : `a_{n} = ${S.a}(${S.r})^{n - 1}`;
    return tag(U.num(`A sequence is ${T(shown)}. What is ${T(`a_{${n}}`)}?`, String(v), { keys: kp(v), fig: Fig.table([['n', '1', '2', '3', '…', String(n)], ['aₙ', ...S.terms.slice(0, 3).map(fx), '…', '?']], 'Use the formula, not counting'), meta: { kind: 'evalAt', args: [e, { n }] }, miss: { [String(Alg.evalAt(Alg.parse(e.replace('(n - 1)', 'n')), { n }))]: 'Use (n − 1), not n.' }, hint: `Replace n with ${n}.`, why: `a${n} = ${v}` }), S.kind === 'arith' ? 'F.BF.A.2' : 'F.LE.A.2', 226, G);
  }
  function seqFormula() {
    const a = U.int(-8, 15), d = nz(-6, 8), terms = [0, 1, 2, 3].map((i) => a + d * i), ans = lin(d, a - d, 'n');
    const miss = {}; if (a !== 0) miss[lin(d, a, 'n')] = `Check n = 1: the first term must be ${a}.`;
    return tag({ t: 'expr', q: `Write an explicit formula for the sequence.\n${terms.map(fx).join(', ')}, …`, a: ans, vars: 'n', pre: 'aₙ =', form: 'expanded', fig: Fig.table([['n', '1', '2', '3', '4'], ['aₙ', ...terms.map(fx)]], `Common difference: ${fx(d)}`), meta: { kind: 'seqFormula', args: [terms] }, miss, hint: 'aₙ = a₁ + d(n − 1). Find a₁ and d, then simplify.', why: `a₁ = ${a}, d = ${d}: aₙ = ${a} + ${d}(n − 1) = ${ans}.` }, 'F.BF.A.2', 234, G);
  }
  function geoFormula() {
    const a = U.pick([2, 3, 5, -1, 4]), r = U.pick([2, 3, 4, -2]), terms = [0, 1, 2, 3].map((i) => a * r ** i), ans = `${a}*${r < 0 ? `(${r})` : r}^(n - 1)`;
    return tag({ t: 'expr', q: `Write an explicit formula for the geometric sequence.\n${terms.map(fx).join(', ')}, …`, a: ans, vars: 'n', pre: 'aₙ =', fig: Fig.table([['n', '1', '2', '3', '4'], ['aₙ', ...terms.map(fx)]], `Common ratio: ${fx(r)}`), meta: { kind: 'seqFormula', args: [terms] }, miss: { [`${a}*${r < 0 ? `(${r})` : r}^n`]: `Check n = 1: the first term must be ${a}.` }, hint: 'aₙ = a₁ · rⁿ⁻¹. Type the power with the ^ key and parentheses: r ^ (n − 1).', why: `aₙ = ${a} · ${r < 0 ? `(${String(r).replace('-', '−')})` : r}^(n − 1)` }, 'F.LE.A.2', 238, G);
  }

  // ===================== STATISTICS =====================
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
  function dataSet(n) { let xs; do { xs = Array.from({ length: n }, () => U.int(2, 30)); } while (!Number.isInteger(mean(xs))); return xs; }
  function center() {
    const xs = dataSet(U.pick([5, 6, 7])), which = U.pick(['mean', 'median']), s = xs.slice().sort((a, b) => a - b), n = s.length;
    const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, v = which === 'mean' ? mean(xs) : med;
    const miss = {}; const other = which === 'mean' ? med : mean(xs); if (other !== v) miss[String(other)] = `That is the ${which === 'mean' ? 'median' : 'mean'}.`; if (which === 'median' && xs[Math.floor(n / 2)] !== v) miss[String(xs[Math.floor(n / 2)])] = 'Put the numbers in order first.';
    return tag(U.num(`Find the ${which} of the data.\n${xs.join(', ')}`, String(v), { keys: kp(v), fig: Fig.table([['Data', ...xs.map(String)]], `${n} values`), meta: { kind: which, args: [xs] }, miss, hint: which === 'mean' ? 'Add them all, then divide by how many there are.' : 'Put them in order. The median is the middle (or the average of the two middle numbers).', why: `The ${which} is ${v}.` }), 'S.ID.A.2', 214, G);
  }
  function iqr() {
    const n = U.pick([7, 8, 9]), xs = Array.from({ length: n }, () => U.int(10, 60)), s = xs.slice().sort((a, b) => a - b);
    const med = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2), lo = s.slice(0, Math.floor(n / 2)), hi = s.slice(Math.ceil(n / 2)), v = med(hi) - med(lo);
    return tag(U.num(`Find the interquartile range (IQR).\n${xs.join(', ')}`, String(v), { keys: kp(v), fig: Fig.table([['In order', ...s.map(String)]], 'Q1 = middle of the lower half, Q3 = middle of the upper half'), meta: { kind: 'iqr', args: [xs] }, miss: { [String(s[n - 1] - s[0])]: 'That is the range. IQR = Q3 − Q1.' }, hint: 'Order the data. Find the median of each half (leave out the middle number if there is one). IQR = Q3 − Q1.', why: `Q1 = ${med(lo)}, Q3 = ${med(hi)}, IQR = ${v}.` }), 'S.ID.A.2', 228, G);
  }
  function outlier() {
    const xs = dataSet(6), md = (a) => { const t = a.slice().sort((p, q) => p - q), n = t.length; return n % 2 ? t[(n - 1) / 2] : (t[n / 2 - 1] + t[n / 2]) / 2; };
    // Two cases, so the answer is not always "the mean": a far-away value (the mean moves more) or a value equal to
    // the mean (the mean does not move at all, but the median does).
    const atMean = Math.random() < 0.4, m0 = mean(xs), v = atMean ? m0 : Math.max(...xs) + U.int(40, 80);
    const dm = Math.abs(mean([...xs, v]) - m0), dd = Math.abs(md([...xs, v]) - md(xs));
    if (atMean ? !Number.isInteger(m0) || dd < 1 : dm < 2 * dd) return outlier();
    const ans = atMean ? 'the median' : 'the mean';
    return tag(U.mcFixed(`The data are ${xs.join(', ')}. A new value, ${v}, is added. Which changes more?`, ans, ['the mean', 'the median', 'they change by the same amount'], { fig: Fig.table([['Data', ...xs.map(String), String(v)]], atMean ? `Mean before: ${m0}` : `${v} is an outlier`), meta: { kind: 'outlierMore', args: [xs, v] }, hint: 'Find how far each measure moves. The mean uses every value; the median only depends on the middle.', why: atMean ? `Adding a value equal to the mean (${m0}) leaves the mean at ${m0}, but the median moves from ${md(xs)} to ${md([...xs, v])}.` : 'One very large value pulls the mean up a lot, but the median moves only a little.' }), 'S.ID.A.3', 226, G);
  }
  function corrPts(kind) {
    for (;;) {
      const m = kind === 'positive' ? U.pick([0.8, 1]) : kind === 'negative' ? U.pick([-0.8, -1]) : 0, pts = [];
      for (let i = 0; i < 8; i++) { const x = U.int(1, 9); pts.push([x, Math.max(0, Math.min(10, Math.round(kind === 'none' ? U.int(1, 9) : 5 + m * (x - 5) + U.int(-1, 1))))]); }
      const r = corr(pts);
      if ((kind === 'positive' && r > 0.7) || (kind === 'negative' && r < -0.7) || (kind === 'none' && Math.abs(r) < 0.25)) return pts;
    }
  }
  function corr(pts) { const mx = mean(pts.map((p) => p[0])), my = mean(pts.map((p) => p[1])); let sxy = 0, sx = 0, sy = 0; pts.forEach(([x, y]) => { sxy += (x - mx) * (y - my); sx += (x - mx) ** 2; sy += (y - my) ** 2; }); return sx && sy ? sxy / Math.sqrt(sx * sy) : 0; }
  function scatter() {
    const kind = U.pick(['positive', 'negative', 'none']), pts = corrPts(kind), A = { positive: 'positive correlation', negative: 'negative correlation', none: 'no clear correlation' };
    return tag(U.mcFixed('What kind of correlation does the scatter plot show?', A[kind], Object.values(A), { fig: Fig.graph({ pts, range: [0, 10], step: 2 }), meta: { kind: 'corrSign', args: [pts] }, hint: 'Do the points go up to the right (positive), down to the right (negative), or neither?', why: `The points show ${A[kind]}.` }), 'S.ID.B.6', 222, G);
  }
  function bestFit() {
    const m = U.pick([0.5, 1.5, 2, 2.5, 3]), b = U.int(2, 10), x = U.int(6, 12), v = m * x + b, [unit, xw, yw] = U.pick([['weeks of training', 'x', 'push-ups in a row'], ['weeks', 'x', 'plant height in cm'], ['months', 'x', 'savings in $10s']]);
    const pts = [1, 2, 3, 4, 5].map((t) => [t, Math.round(m * t + b + U.int(-1, 1))]);
    return tag(U.num(`A line of best fit for ${yw} (y) versus ${unit} (x) is ${T(`y = ${m}x + ${b}`)}. Predict y when x = ${x}.`, String(v), { keys: kp(v), fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], pts, range: { x: [0, 8], y: [0, 32] }, step: 2 }), meta: { kind: 'evalAt', args: [`${m}*x + ${b}`, { x }] }, hint: `Substitute x = ${x} into the equation.`, why: `${m} × ${x} + ${b} = ${v}` }), 'S.ID.B.6', 226, G);
  }
  const CAUSE = [
    ['🍦', 'In one town, ice cream sales and sunburns rise together. What is the best conclusion?', 'Hot, sunny weather may cause both; correlation alone does not prove causation.', ['Eating ice cream must be the cause of the sunburns in this town.', 'Sunburns must be the reason that people decide to buy more ice cream.', 'There is no connection at all between ice cream sales and sunburns.']],
    ['👟', 'Students with bigger shoe sizes have higher reading scores. What is the best conclusion?', 'Older students tend to have bigger feet AND read better; age may explain both.', ['Wearing bigger shoes will cause a student to become a better reader.', 'Reading more books will cause a student\'s feet to grow larger.', 'The scores must be wrong, because shoe size cannot be related to reading.']],
    ['🚒', 'Fires with more firefighters cause more damage. What is the best conclusion?', 'Bigger fires bring more firefighters and cause more damage; size explains both.', ['Sending more firefighters to a fire is what causes the extra damage.', 'Sending fewer firefighters to every fire would reduce the damage done.', 'The number of firefighters and the damage are not related to each other.']],
  ];
  function causation() {
    const [icon, q, a, w] = U.pick(CAUSE);
    return tag(U.mc(q, a, w, { fig: pic([icon, '📈'], 'Two things rise together'), hint: 'Correlation means two things change together. It does not prove that one causes the other.', why: a }), 'S.ID.C.9', 230, G);
  }

  A1_SKILLS.push(
    { goal: G, id: 'functions', name: 'Functions', icon: '🔁', levels: [
      lv('Function notation', 'F.IF.A.2', 'f(x): put in, get out.', [fEval, readGraph]),
      lv('What is a function?', 'F.IF.A.1', 'One output for each input; domain and range.', [isFunc, vlt, domRange]),
      lv('Work backward (inverse preview)', 'F.IF.A.2 · F.BF.B.4a', 'Find the input; undo a function.', [fSolve, inverse]),
    ] },
    { goal: G, id: 'linear', name: 'Linear functions', icon: '📈', levels: [
      lv('Slope', 'F.IF.B.6', 'Rise over run.', [slope2, slopeGraph]),
      lv('Write and graph lines', 'A.CED.A.2 · A.REI.D.10', 'y = mx + b.', [lineEq, plotLine, plotIntercept]),
      lv('Parallel and perpendicular (Geometry preview)', 'G.GPE.B.5', 'Same slope or opposite reciprocal.', [perp, parallelThru]),
    ] },
    { goal: G, id: 'expo', name: 'Exponential functions', icon: '🚀', levels: [
      lv('Linear or exponential?', 'F.LE.A.1', 'Add the same, or multiply the same.', [tableType]),
      lv('Growth and decay', 'F.LE.A.2 · F.LE.B.5', 'What the base tells you.', [growth, expEval]),
      lv('Logarithms (Algebra 2 preview)', 'F.LE.A.4', 'What power?', [expSolve, tableType]),
    ] },
    { goal: G, id: 'quadfn', name: 'Quadratic functions', icon: '⛰️', levels: [
      lv('Vertex and axis', 'F.IF.C.8a', 'The turning point of a parabola.', [vertex, axis]),
      lv('Zeros and graphs', 'F.IF.C.7a · F.IF.B.4', 'Where it crosses; which graph.', [zerosGraph, quadPic, maxMin]),
      lv('Transformations', 'F.BF.B.3', 'Slide a parabola.', [transform, quadPic]),
    ] },
    { goal: G, id: 'seq', name: 'Sequences', icon: '🔢', levels: [
      lv('Patterns', 'F.IF.A.3', 'Add or multiply each time.', [nextTerm]),
      lv('Use a formula', 'F.BF.A.2 · F.LE.A.2', 'Jump to any term.', [nthTerm, nextTerm]),
      lv('Write the formula', 'F.BF.A.2 · F.LE.A.2', 'Arithmetic and geometric.', [seqFormula, geoFormula]),
    ] },
    { goal: G, id: 'stats', name: 'Statistics', icon: '📊', levels: [
      lv('Center of data', 'S.ID.A.2', 'Mean and median.', [center]),
      lv('Spread and outliers', 'S.ID.A.2 · S.ID.A.3', 'IQR and what an outlier does.', [iqr, outlier, center]),
      lv('Scatter plots and causation', 'S.ID.B.6 · S.ID.C.9', 'Trends, predictions, and causes.', [scatter, bestFit, causation]),
    ] },
  );
})();
