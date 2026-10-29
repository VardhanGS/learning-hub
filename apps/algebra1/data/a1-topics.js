// Algebra 1 Quest — skills added for the 11-topic course order (a1-subjects.js): absolute value equations, forms of
// linear equations, lines of fit, absolute value and piecewise functions, factoring ax² + bx + c and special cases,
// quadratic models, linear-quadratic systems, square root / cube root functions and transformations, and standard
// deviation and the shape of data. Every answer is computed in code; meta {kind, args} lets tools/validate.js recompute
// it independently. Standards: NJSLS-Mathematics 2023. All questions are original.
const A1_NEW = [];
(function () {
  const { tag, nz, frac, lin, tx, lv, picQ, fx, mcN, kp, gcd } = A1;
  const tex = (e) => Alg.tex(e).replace(/\\cdot/g, '\\,');
  const pt = (x, y) => `(${fx(x)}, ${fx(y)})`;
  const signed = (n) => (n < 0 ? `− ${-n}` : `+ ${n}`);
  // |x − h| written the way a book would: |x − 3|, |x + 2|, |x|
  const absIn = (h) => (h === 0 ? '|x|' : `|x ${h > 0 ? '−' : '+'} ${Math.abs(h)}|`);
  const absText = (a, h, k) => `${a === 1 ? '' : a === -1 ? '−' : fx(a)}${absIn(h)}${k ? ` ${signed(k)}` : ''}`;

  // ===================== ABSOLUTE VALUE EQUATIONS & INEQUALITIES =====================
  const solText = (lo, hi) => (lo === hi ? `x = ${fx(lo)}` : `x = ${fx(lo)} or x = ${fx(hi)}`);
  function absEq() {
    const q = nz(-9, 9), c = U.int(1, 12), lo = -c - q, hi = c - q;
    const w = [solText(Math.min(c + q, -c + q), Math.max(c + q, -c + q)), `x = ${fx(hi)}`, solText(-c, c)];
    return tag(mcN(`Solve.\n${T(`|x ${q < 0 ? '-' : '+'} ${Math.abs(q)}| = ${c}`)}`, solText(lo, hi), w, { fig: Fig.numLine(lo - 1, hi + 1, 1, { labels: [lo, -q, hi], marks: [{ v: lo, label: fx(lo) }, { v: hi, label: fx(hi) }] }), meta: { kind: 'absEqSol', args: [q, c] }, miss: { [w[0]]: 'Watch the signs: x + q = c gives x = c − q.', [w[1]]: `An absolute value equation usually has two answers: x ${q < 0 ? '−' : '+'} ${Math.abs(q)} can be ${c} or −${c}.`, [w[2]]: `Those make |x| = ${c}. Subtract ${fx(q)} from both.` }, steps: [`Two cases: x ${q < 0 ? '−' : '+'} ${Math.abs(q)} = ${c}, or x ${q < 0 ? '−' : '+'} ${Math.abs(q)} = −${c}.`, `Case 1: x = ${fx(hi)}. Case 2: x = ${fx(lo)}.`], hint: 'The inside can be the number or its opposite.', why: `x = ${fx(hi)} or x = ${fx(lo)}: both are ${c} away from ${fx(-q)}.` }), 'A.REI.B.3 · A.CED.A.1', 226, 'eei');
  }
  function absLess() {
    const c = U.int(-6, 6), r = U.int(1, 6), lt = U.pick([true, false]);
    const inside = c === 0 ? '|x|' : `|x ${c > 0 ? '-' : '+'} ${Math.abs(c)}|`;
    const ans = lt ? `${fx(c - r)} < x < ${fx(c + r)}` : `x < ${fx(c - r)} or x > ${fx(c + r)}`;
    const w = lt ? [`x < ${fx(c - r)} or x > ${fx(c + r)}`, `${fx(-c - r)} < x < ${fx(-c + r)}`, `x < ${fx(c + r)}`] : [`${fx(c - r)} < x < ${fx(c + r)}`, `x < ${fx(-c - r)} or x > ${fx(-c + r)}`, `x > ${fx(c + r)}`];
    return tag(U.mc(`Solve.\n${T(`${inside} ${lt ? '<' : '>'} ${r}`)}`, ans, w.filter((x) => x !== ans), { fig: Fig.numLine(c - r - 2, c + r + 2, 1, { labels: [c - r, c, c + r], marks: [{ v: c - r, label: fx(c - r) }, { v: c + r, label: fx(c + r) }] }), meta: { kind: lt ? 'absIneq' : 'absIneqOut', args: [c, r] }, steps: [`|x − ${fx(c)}| is the distance from x to ${fx(c)}.`, lt ? `Less than ${r} away: between ${fx(c - r)} and ${fx(c + r)}.` : `More than ${r} away: below ${fx(c - r)} or above ${fx(c + r)}.`], hint: `Think distance: how far is x from ${fx(c)}?`, why: `${lt ? 'Within' : 'More than'} ${r} of ${fx(c)}: ${ans}.` }), 'A.REI.B.3', 232, 'eei');
  }
  function absEq2() {
    const q = nz(-6, 6), d = nz(-8, 8), e = U.int(-8, 12), c = e - d;
    const left = `|x ${q < 0 ? '-' : '+'} ${Math.abs(q)}| ${d < 0 ? '-' : '+'} ${Math.abs(d)}`;
    const ans = c < 0 ? 'no solution' : solText(-c - q, c - q);
    const w = c < 0 ? [solText(c - q, -c - q), `x = ${fx(-q)}`, solText(-(e + d) - q, e + d - q)] : ['no solution', solText(-(e + d) - q, e + d - q), `x = ${fx(c - q)}`];
    return tag(mcN(`Solve.\n${T(`${left} = ${e}`)}`, ans, [...new Set(w.filter((x) => x !== ans))], { fig: Fig.table([['Step', 'Equation'], ['Start', `${left.replace(/-/g, '−')} = ${fx(e)}`], ['Get |…| alone', `|…| = ${fx(c)}`]]), meta: { kind: 'absEqSol', args: [q, c] }, steps: [`${d < 0 ? 'Add' : 'Subtract'} ${Math.abs(d)} on both sides: |…| = ${fx(c)}.`, c < 0 ? 'An absolute value is never negative, so there is no solution.' : c === 0 ? 'It equals 0 only when the inside is 0.' : `Now two cases: the inside is ${c} or −${c}.`], hint: 'Get the absolute value alone first.', why: c < 0 ? `|…| = ${fx(c)} is impossible: no solution.` : `${ans}` }), 'A.REI.B.3 · A.CED.A.1', 236, 'eei');
  }

  // ===================== FORMS OF LINEAR EQUATIONS =====================
  function pointSlope() {
    const m = nz(-4, 4), x1 = U.int(-5, 5), y1 = U.int(-6, 6), b = y1 - m * x1;
    const q = `A line has slope ${fx(m)} and goes through ${pt(x1, y1)}. Write its equation in slope-intercept form.`;
    return tag({ t: 'expr', q, a: lin(m, b), pre: 'y =', fig: Fig.graph({ pts: [[x1, y1, 'P']], range: [-8, 8], step: 2 }), meta: { kind: 'lineThru', args: [x1, y1, x1 + 1, y1 + m] }, miss: { [lin(m, y1 + m * x1)]: `Point-slope: y − ${fx(y1)} = ${fx(m)}(x − ${fx(x1)}). Distribute carefully: −${fx(m)} × ${fx(x1)}.`, [lin(m, y1)]: `${fx(y1)} is the y-value at x = ${fx(x1)}, not at x = 0.` }, steps: [`Point-slope form: y − ${fx(y1)} = ${fx(m)}(x − ${fx(x1)}).`, `Distribute: y − ${fx(y1)} = ${fx(m)}x ${signed(-m * x1)}.`, `Add ${fx(y1)}: y = ${fx(lin(m, b))}.`], hint: 'Start with y − y₁ = m(x − x₁).', why: `y = ${fx(lin(m, b))}` }, 'A.CED.A.2 · F.LE.A.2', 222, 'func');
  }
  function psRead() {
    const m = nz(-5, 5), x1 = nz(-6, 6), y1 = nz(-6, 6);
    const e = `y ${y1 < 0 ? '+' : '-'} ${Math.abs(y1)} = ${m}(x ${x1 < 0 ? '+' : '-'} ${Math.abs(x1)})`;
    return tag(U.mc(`Which point is on the line?\n${T(e)}`, pt(x1, y1), [pt(-x1, -y1), pt(x1, -y1), pt(y1, x1)].filter((p) => p !== pt(x1, y1)), { fig: Fig.table([['Form', 'y − y₁ = m(x − x₁)']], 'Point-slope form'), meta: { kind: 'onLine', args: [m, x1, y1] }, hint: 'In y − y₁ = m(x − x₁), the point is (x₁, y₁). Watch the signs: x + 3 = x − (−3).', why: `The point is ${pt(x1, y1)}.` }), 'A.CED.A.2', 214, 'func');
  }
  function stdIntercept() {
    const A = nz(-6, 6), B = nz(-6, 6), which = U.pick(['x', 'y']), C = (which === 'x' ? A : B) * nz(-5, 5);
    const v = which === 'x' ? C / A : C / B;
    if (!Number.isInteger(v)) return stdIntercept();
    const e = `${A}x ${B < 0 ? '-' : '+'} ${Math.abs(B)}y = ${C}`;
    return tag(U.num(`What is the ${which}-intercept of ${T(e)}?`, String(v), { keys: kp(v), fig: Fig.table([['Intercept', 'Set to 0'], ['x-intercept', 'y = 0'], ['y-intercept', 'x = 0']], 'Standard form Ax + By = C'), meta: { kind: 'intercept', args: [A, B, C, which] }, miss: { [String(which === 'x' ? C / B : C / A)]: `That is the ${which === 'x' ? 'y' : 'x'}-intercept. For the ${which}-intercept, set ${which === 'x' ? 'y' : 'x'} = 0.` }, hint: `Set ${which === 'x' ? 'y' : 'x'} = 0 and solve.`, why: `${which === 'x' ? `${fx(A)}x = ${fx(C)}` : `${fx(B)}y = ${fx(C)}`}, so ${which} = ${fx(v)}.` }), 'A.CED.A.2 · A.REI.D.10', 218, 'func');
  }
  function stdToSlope() {
    const B = U.pick([1, 2, 3, -1, -2]), m = nz(-4, 4), b = U.int(-6, 6), A = -m * B, C = b * B;
    const e = `${A}x ${B < 0 ? '-' : '+'} ${Math.abs(B) === 1 ? '' : Math.abs(B)}y = ${C}`;
    return tag({ t: 'expr', q: `Write ${T(e)} in slope-intercept form.`, a: lin(m, b), pre: 'y =', fig: Fig.table([['Step', 'Do'], ['1', `Move the x-term: ${fx(B)}y = ${fx(-A)}x ${signed(C)}`], ['2', `Divide by ${fx(B)}`]], 'Standard → slope-intercept'), meta: { kind: 'lineThru', args: [0, b, 1, b + m] }, miss: { [lin(-m, b)]: `When ${fx(A)}x moves to the other side, its sign changes.`, [lin(-A, C)]: `Divide every term by ${fx(B)}.` }, steps: [`Subtract ${fx(A)}x: ${fx(B)}y = ${fx(-A)}x ${signed(C)}.`, `Divide by ${fx(B)}: y = ${fx(lin(m, b))}.`], hint: 'Get y alone.', why: `y = ${fx(lin(m, b))}` }, 'A.CED.A.4 · A.CED.A.2', 222, 'func');
  }
  function twoPointLine() {
    const m = nz(-3, 3), b = U.int(-5, 5), x1 = U.int(-4, 0), x2 = x1 + U.int(1, 4), y1 = m * x1 + b, y2 = m * x2 + b;
    return tag({ t: 'expr', q: `Write the equation of the line through ${pt(x1, y1)} and ${pt(x2, y2)}.`, a: lin(m, b), pre: 'y =', fig: Fig.graph({ pts: [[x1, y1, 'A'], [x2, y2, 'B']], range: [-8, 8], step: 2 }), meta: { kind: 'lineThru', args: [x1, y1, x2, y2] }, miss: { [lin(1 / m === Math.round(1 / m) ? 1 / m : m + 1, b)]: 'Slope = change in y ÷ change in x.' }, steps: [`Slope: (${fx(y2)} − ${fx(y1)}) ÷ (${fx(x2)} − ${fx(x1)}) = ${fx(m)}.`, `Use a point: ${fx(y1)} = ${fx(m)}(${fx(x1)}) + b, so b = ${fx(b)}.`], hint: 'Find the slope first, then b.', why: `y = ${fx(lin(m, b))}` }, 'A.CED.A.2 · F.LE.A.2', 228, 'func');
  }
  const PLANS = [['A gym charges $%b to join and $%m each month.', 'months', 'total cost in dollars'], ['A taxi ride costs $%b plus $%m for each mile.', 'miles', 'cost in dollars'], ['A plant is %b cm tall and grows %m cm each week.', 'weeks', 'height in cm']];
  function lineStory() {
    const [txt, xw, yw] = U.pick(PLANS), m = U.int(2, 9) * (txt.includes('gym') ? 5 : 1), b = U.int(2, 12) * (txt.includes('gym') ? 5 : 1);
    return tag({ t: 'expr', q: `${txt.replace('%b', b).replace('%m', m)}\nWrite an equation for y, the ${yw}, after x ${xw}.`, a: lin(m, b), pre: 'y =', fig: Fig.table([['x', '0', '1', '2'], ['y', String(b), String(b + m), String(b + 2 * m)]], 'Start, then the same change each time'), meta: { kind: 'lineThru', args: [0, b, 1, b + m] }, miss: { [lin(b, m)]: 'The amount that repeats is the slope (with x). The starting amount is b.' }, hint: 'Slope = change per one; b = starting amount.', why: `y = ${m}x + ${b}` }, 'A.CED.A.2 · F.LE.B.5', 220, 'func');
  }

  // ===================== LINES OF FIT =====================
  function residual() {
    const m = U.pick([0.5, 1.5, 2, 2.5, 3]), b = U.int(2, 10), x = U.int(2, 9), pred = m * x + b, y = Math.round(pred + U.pick([-3, -2, -1.5, -1, 1, 1.5, 2, 3]) * 2) / 1;
    const r = +(y - pred).toFixed(2), rs = String(r);
    return tag(U.num(`A line of fit is ${T(`y = ${m}x + ${b}`)}. The data point ${pt(x, y)} is in the data set. What is its residual (actual − predicted)?`, rs, { keys: kp(rs), fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], pts: [[x, y, 'data']], range: { x: [0, 12], y: [0, 40] }, step: 2 }), meta: { kind: 'residual', args: [m, b, x, y] }, miss: { [String(-r)]: 'Residual = actual − predicted, not predicted − actual.', [String(pred)]: 'That is the predicted value. Now subtract it from the actual y.' }, steps: [`Predicted: ${m}(${x}) + ${b} = ${pred}.`, `Residual: ${y} − ${pred} = ${rs}.`], hint: 'Find the predicted y on the line, then actual − predicted.', why: `${y} − ${pred} = ${rs}${r > 0 ? ' (the point is above the line)' : ' (the point is below the line)'}` }), 'S.ID.B.6b', 228, 'func');
  }
  const R_VALUES = [0.95, 0.9, 0.85, 0.65, 0.6, 0.55, 0.25, 0.2, 0.15];
  function corrWord() {
    const r = U.pick(R_VALUES) * U.pick([1, -1]), strength = Math.abs(r) >= 0.8 ? 'strong' : Math.abs(r) >= 0.5 ? 'moderate' : 'weak', ans = `${strength} ${r > 0 ? 'positive' : 'negative'}`;
    const all = ['strong positive', 'moderate positive', 'weak positive', 'strong negative', 'moderate negative', 'weak negative'];
    return tag(U.mc(`The correlation coefficient of a data set is r = ${fx(r)}. Which describes the correlation?`, ans, U.sample(all.filter((a) => a !== ans), 3), { fig: Fig.numLine(-1, 1, 4, { labels: [-1, -0.5, 0, 0.5, 1], dec: 1, marks: [{ v: r, label: `r = ${fx(r)}` }] }), meta: { kind: 'corrWord', args: [r] }, hint: 'The sign gives the direction. Close to 1 or −1 is strong; close to 0 is weak.', why: `r = ${fx(r)}: ${ans}.` }), 'S.ID.C.8', 226, 'func');
  }

  // ===================== ABSOLUTE VALUE FUNCTIONS =====================
  function absVertex() {
    const a = U.pick([1, 1, -1, 2, -2, 3]), h = nz(-5, 5), k = nz(-5, 5), ans = pt(h, k);
    return tag(U.mc(`What is the vertex of the graph of ${T(`f(x) = ${absText(a, h, k).replace(/−/g, '-')}`)}?`, ans, [...new Set([pt(-h, k), pt(k, h), pt(h, -k), pt(-h, -k)])].filter((p) => p !== ans).slice(0, 3), { fig: Fig.table([['Form', 'f(x) = a|x − h| + k'], ['Vertex', '(h, k)']]), meta: { kind: 'absVertex', args: [h, k] }, miss: { [pt(-h, k)]: `Inside the bars the sign is opposite: |x ${h > 0 ? '−' : '+'} ${Math.abs(h)}| moves the graph ${h > 0 ? 'right' : 'left'}.` }, hint: 'In a|x − h| + k the vertex is (h, k).', why: `The vertex is ${ans}.` }), 'F.IF.C.7b · F.BF.B.3', 222, 'func');
  }
  function absEval() {
    const a = U.pick([1, -1, 2, -2, 3]), h = U.int(-4, 4), k = U.int(-5, 5), x = U.int(-6, 6), v = a * Math.abs(x - h) + k;
    return tag(U.num(`If ${T(`f(x) = ${absText(a, h, k).replace(/−/g, '-')}`)}, what is ${T(`f(${x})`)}?`, String(v), { keys: kp(v), fig: Fig.graph({ fns: [{ kind: 'abs', a, h, k }], range: [-8, 8], step: 2 }), meta: { kind: 'absAt', args: [a, h, k, x] }, miss: { [String(a * (x - h) + k)]: 'Absolute value is never negative: |' + fx(x - h) + '| = ' + Math.abs(x - h) + '.' }, steps: [`Inside: ${fx(x)} ${h < 0 ? '+' : '−'} ${Math.abs(h)} = ${fx(x - h)}; |${fx(x - h)}| = ${Math.abs(x - h)}.`, `${fx(a)} × ${Math.abs(x - h)} ${signed(k)} = ${fx(v)}.`], hint: 'Inside the bars first, then make it positive.', why: `f(${x}) = ${fx(v)}` }), 'F.IF.A.2 · F.IF.C.7b', 218, 'func');
  }
  function absGraph() {
    const h = U.int(-3, 3), k = U.int(-3, 3), a = U.pick([1, -1]);
    const g = (A, H, K) => Fig.graph({ fns: [{ kind: 'abs', a: A, h: H, k: K }], range: [-6, 6], step: 2, w: 200 });
    const cand = [[a, -h, k], [a, k, h], [-a, h, k], [a, h, -k]].filter(([A, H, K]) => !(A === a && H === h && K === k)).slice(0, 3);
    if (new Set(cand.map((c) => c.join())).size < 3) return absGraph();
    return tag(picQ(`Which is the graph of ${T(`y = ${absText(a, h, k).replace(/−/g, '-')}`)}?`, g(a, h, k), cand.map(([A, H, K]) => g(A, H, K)), { hint: `Find the vertex (${fx(h)}, ${fx(k)}); a = ${fx(a)} opens ${a > 0 ? 'up' : 'down'}.`, why: `Vertex ${pt(h, k)}, opening ${a > 0 ? 'up' : 'down'}.` }), 'F.IF.C.7b · F.BF.B.3', 226, 'func');
  }
  function absShift() {
    const h = nz(-5, 5), k = nz(-5, 5), say = (H, K) => `${Math.abs(H)} ${H > 0 ? 'right' : 'left'}, ${Math.abs(K)} ${K > 0 ? 'up' : 'down'}`;
    const ans = say(h, k);
    return tag(U.mc(`How is the graph of ${T(`g(x) = ${absText(1, h, k).replace(/−/g, '-')}`)} moved from the graph of ${T('f(x) = |x|')}?`, ans, [say(-h, k), say(h, -k), say(-h, -k)], { fig: Fig.graph({ fns: [{ kind: 'abs', a: 1, h: 0, k: 0 }, { kind: 'abs', a: 1, h, k }], range: [-8, 8], step: 2 }), meta: { kind: 'shiftText', args: [h, k] }, miss: { [say(-h, k)]: 'Inside the bars works backward: x − 3 moves right 3, x + 3 moves left 3.' }, hint: 'k outside moves up or down; h inside moves left or right (opposite sign).', why: ans }), 'F.BF.B.3', 224, 'func');
  }
  function absRange() {
    const a = U.pick([1, 2, 3, -1, -2]), h = U.int(-4, 4), k = U.int(-6, 6), ans = a > 0 ? `y ≥ ${fx(k)}` : `y ≤ ${fx(k)}`;
    return tag(U.mc(`What is the range of ${T(`f(x) = ${absText(a, h, k).replace(/−/g, '-')}`)}?`, ans, [a > 0 ? `y ≤ ${fx(k)}` : `y ≥ ${fx(k)}`, a > 0 ? `y ≥ ${fx(h)}` : `y ≤ ${fx(h)}`, 'all real numbers'].filter((x) => x !== ans), { fig: Fig.graph({ fns: [{ kind: 'abs', a, h, k }], range: [-8, 8], step: 2 }), meta: { kind: 'absRange', args: [a, k] }, hint: `The vertex is the ${a > 0 ? 'lowest' : 'highest'} point.`, why: `The graph opens ${a > 0 ? 'up' : 'down'} from y = ${fx(k)}: ${ans}.` }), 'F.IF.B.5 · F.IF.C.7b', 230, 'func');
  }

  // ===================== PIECEWISE & STEP FUNCTIONS =====================
  // pieces: [lo, hi, loIn, hiIn, m, b] (lo/hi null = no end)
  function makePieces() {
    const c = U.int(-2, 2), m1 = nz(-2, 2), b1 = U.int(-3, 3), m2 = nz(-2, 2), b2 = U.int(-3, 3), left = U.pick([true, false]);
    return [[null, c, false, left, m1, b1], [c, null, !left, false, m2, b2]];
  }
  // Piecewise rule as plain lines ("f(x) = −2x + 2 if x ≤ 2"), one per piece (KaTeX's cases layout is not used).
  const mn = (t) => String(t).replace(/-/g, '−');
  const pieceTeX = (ps) => ps.map(([lo, hi, loIn, hiIn, m, b], i) => `${i ? 'and f(x) = ' : 'f(x) = '}${mn(lin(m, b))}  if  ${hi == null ? `x ${loIn ? '≥' : '>'} ${mn(lo)}` : lo == null ? `x ${hiIn ? '≤' : '<'} ${mn(hi)}` : `${mn(lo)} ${loIn ? '≤' : '<'} x ${hiIn ? '≤' : '<'} ${mn(hi)}`}`).join('\n');
  const inPiece = ([lo, hi, loIn, hiIn], x) => (lo == null || x > lo || (x === lo && loIn)) && (hi == null || x < hi || (x === hi && hiIn));
  const pieceGraph = (ps) => Fig.graph({ fns: ps.map(([lo, hi, , , m, b]) => ({ kind: 'lin', m, b, dom: [lo == null ? -99 : lo, hi == null ? 99 : hi] })), pts: ps.flatMap(([lo, hi, loIn, hiIn, m, b]) => [lo != null && [lo, m * lo + b, '', !loIn], hi != null && [hi, m * hi + b, '', !hiIn]].filter(Boolean)).filter(([, y]) => Math.abs(y) <= 6), range: [-6, 6], step: 2 });
  function pieceEval() {
    const ps = makePieces(), c = ps[0][1], x = U.pick([c, c, c - U.int(1, 3), c + U.int(1, 3)]), p = ps.find((q) => inPiece(q, x)), v = p[4] * x + p[5], other = ps.find((q) => q !== p), wv = other[4] * x + other[5];
    return tag(U.num(`${pieceTeX(ps)}\nWhat is ${T(`f(${x})`)}?`, String(v), { keys: kp(v), fig: pieceGraph(ps), meta: { kind: 'pieceAt', args: [ps, x] }, miss: wv !== v ? { [String(wv)]: `Check which piece holds x = ${x}: look at ≤ and < at x = ${c}.` } : {}, steps: [`x = ${x} fits the piece where ${p[0] == null ? '' : `${p[0]} ${p[2] ? '≤' : '<'} `}x${p[1] == null ? '' : ` ${p[3] ? '≤' : '<'} ${p[1]}`}.`, `Use ${fx(lin(p[4], p[5]))}: ${fx(v)}.`], hint: 'First choose the piece, then substitute.', why: `f(${x}) = ${fx(v)}` }), 'F.IF.A.2 · F.IF.C.7b', 226, 'func');
  }
  function pieceWhich() {
    const ps = makePieces(), c = ps[0][1], x = U.pick([c, c - 1, c + 1, c - 2, c + 2]), p = ps.find((q) => inPiece(q, x)), ans = `${fx(lin(p[4], p[5]))}`;
    const other = mn(lin(ps.find((q) => q !== p)[4], ps.find((q) => q !== p)[5]));
    if (other === ans) return pieceWhich();
    return tag(U.mc(`${pieceTeX(ps)}\nWhich rule gives ${T(`f(${x})`)}?`, ans, [other], { fig: pieceGraph(ps), meta: { kind: 'pieceRule', args: [ps, x] }, hint: `Compare ${x} with ${c}. Does ≤ or < include ${c}?`, why: `x = ${x} is in the piece with ${ans}.` }), 'F.IF.C.7b', 224, 'func');
  }
  const STEP = [['Parking costs $%f for the first hour and $%p for each extra hour or part of an hour.', 'hours', 'parking'], ['Shipping costs $%f for the first pound and $%p for each extra pound or part of a pound.', 'pounds', 'shipping']];
  function stepCost() {
    const [txt, unit, what] = U.pick(STEP), f = U.int(3, 9), p = U.int(1, 4), t = U.int(1, 5) + U.pick([0.25, 0.5, 0.75]), v = f + p * Math.ceil(t - 1);
    return tag(U.num(`${txt.replace('%f', f).replace('%p', p)} What is the ${what} cost for ${t} ${unit}?`, String(v), { pre: '$', keys: kp(v), fig: Fig.table([[cap(unit), 'Cost'], ['0 to 1', `$${f}`], ['over 1 to 2', `$${f + p}`], ['over 2 to 3', `$${f + 2 * p}`]], 'A step function'), meta: { kind: 'stepCost', args: [f, p, t] }, miss: { [String(f + p * Math.floor(t - 1))]: 'A part of an hour or pound counts as a whole one: round up.', [String(f + p * (t - 1))]: 'Costs jump in whole steps; there are no part-steps.' }, steps: [`${t} rounds up to ${Math.ceil(t)} whole ${unit}.`, `$${f} + ${Math.ceil(t) - 1} × $${p} = $${v}.`], hint: 'Round the time or weight up to a whole number first.', why: `$${f} + $${p} × ${Math.ceil(t) - 1} = $${v}` }), 'F.IF.C.7b · F.IF.B.4', 224, 'func');
  }
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  function floorEval() {
    const x = U.pick([U.int(-5, 5) + U.pick([0.2, 0.5, 0.8]), U.int(-5, 5)]), v = Math.floor(x);
    return tag(U.num(`The greatest integer function ${T('f(x) = \\lfloor x \\rfloor')} gives the greatest integer less than or equal to x. What is ${T(`f(${x})`)}?`, String(v), { keys: kp(v), fig: Fig.numLine(Math.floor(x) - 1, Math.floor(x) + 2, 10, { labels: 'whole', marks: [{ v: x, label: fx(x) }] }), meta: { kind: 'floorAt', args: [x] }, miss: x < 0 && !Number.isInteger(x) ? { [String(Math.ceil(x))]: `For a negative number, go DOWN (left): ${fx(Math.floor(x))} is less than ${fx(x)}.` } : {}, hint: 'Go left on the number line to the nearest integer (stay if it is one).', why: `⌊${fx(x)}⌋ = ${fx(v)}` }), 'F.IF.C.7b', 228, 'func');
  }

  // ===================== FACTORING =====================
  function factorAC() {
    const p = U.pick([2, 3, 5]), r = U.pick([1, 1, 2]), q = nz(-7, 7), s = nz(-7, 7);
    if (gcd(p, q) !== 1 || gcd(r, s) !== 1) return factorAC();
    const poly = Alg.pmul([q, p], [s, r]), e = Alg.pstr(poly), f = (a, b) => `(${a === 1 ? '' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)})`, ans = f(p, q) + f(r, s);
    return tag({ t: 'expr', q: `Factor completely.\n${tx(e)}`, a: ans, form: 'factored', fig: Fig.table([['a · c', 'b'], [fx(poly[2] * poly[0]), fx(poly[1])]], 'Find two numbers: multiply to a·c, add to b'), meta: { kind: 'algEquiv', args: [e] }, miss: { [f(p, -q) + f(r, -s)]: 'Check the signs by multiplying back out.', [f(p, s) + f(r, q)]: 'Multiply back out: the middle term must match.' }, steps: [`a · c = ${fx(poly[2] * poly[0])}. Find two numbers that multiply to ${fx(poly[2] * poly[0])} and add to ${fx(poly[1])}: ${fx(p * s)} and ${fx(q * r)}.`, `Split the middle: ${tx(Alg.pstr([poly[0], 0, poly[2]]))} with ${fx(p * s)}x and ${fx(q * r)}x, then group.`], hint: 'Use the a·c method, then factor by grouping.', why: `${e} = ${ans}` }, 'A.SSE.A.2', 232, 'eei');
  }
  function factorSpecial() {
    const a = U.pick([1, 1, 2, 3]), b = U.int(1, 9), kind = U.pick(['diff', 'sq+', 'sq-']);
    if (gcd(a, b) !== 1) return factorSpecial();
    const ax = a === 1 ? 'x' : `${a}x`;
    const [poly, ans] = kind === 'diff' ? [[-b * b, 0, a * a], `(${ax} + ${b})(${ax} - ${b})`] : kind === 'sq+' ? [[b * b, 2 * a * b, a * a], `(${ax} + ${b})^2`] : [[b * b, -2 * a * b, a * a], `(${ax} - ${b})^2`];
    const e = Alg.pstr(poly);
    return tag({ t: 'expr', q: `Factor completely.\n${tx(e)}`, a: ans, form: 'factored', fig: Fig.table([['Pattern', 'Factors'], ['a² − b²', '(a + b)(a − b)'], ['a² + 2ab + b²', '(a + b)²'], ['a² − 2ab + b²', '(a − b)²']], 'Special cases'), meta: { kind: 'algEquiv', args: [e] }, miss: kind === 'diff' ? { [`(${ax} - ${b})^2`]: '(a − b)² has a middle term. A difference of squares factors as (a + b)(a − b).' } : { [`(${ax} + ${b})(${ax} - ${b})`]: 'That has no middle term. This is a perfect square trinomial.' }, hint: kind === 'diff' ? 'Both terms are perfect squares with a minus between them.' : 'First and last terms are squares; is the middle 2ab?', why: `${e} = ${ans.replace('^2', '²')}` }, 'A.SSE.A.2', 230, 'eei');
  }

  // ===================== QUADRATIC MODELS =====================
  function axisSym() {
    const a = nz(-3, 3), h = U.int(-5, 5), b = -2 * a * h, c = U.int(-9, 9), e = Alg.pstr([c, b, a]);
    return tag(U.num(`What is the axis of symmetry of ${T(`y = ${tex(e)}`)}?`, String(h), { keys: kp(h), pre: 'x =', fig: Fig.table([['Formula', 'x = −b ÷ (2a)']], 'Axis of symmetry'), meta: { kind: 'dexpr', args: [`-(${b}) / (2 * ${a})`] }, miss: { [String(-h)]: 'x = −b ÷ 2a: watch the sign of b.', [String(b / a)]: 'Divide by 2a, not by a.' }, hint: `a = ${a}, b = ${b}. Use x = −b ÷ (2a).`, why: `x = −(${fx(b)}) ÷ (2 × ${fx(a)}) = ${fx(h)}` }), 'F.IF.C.8a · F.IF.B.4', 224, 'func');
  }
  function projectile(ask) {
    const t = U.int(1, 4), v = 32 * t, h0 = U.pick([0, 4, 5, 6, 10, 20, 48]), max = h0 + 16 * t * t, e = Alg.pstr([h0, v, -16], 't');
    const fig = Fig.graph({ fns: [{ kind: 'quad', a: -16, h: t, k: max }], range: { x: [0, 2 * t + 1], y: [0, max + 16] }, step: 1 });
    if (ask === 'time') return tag(U.num(`A ball is thrown upward. Its height in feet after t seconds is ${T(`h(t) = ${tex(e)}`)}. After how many seconds does it reach its highest point?`, String(t), { unit: 'seconds', fig, meta: { kind: 'dexpr', args: [`-(${v}) / (2 * -16)`] }, miss: { [String(2 * t)]: 'That is when it would be back at its starting height. The top is halfway.' }, hint: 't = −b ÷ (2a)', why: `t = −${v} ÷ (2 × −16) = ${t}` }), 'F.IF.B.4 · A.SSE.B.3', 228, 'func');
    return tag(U.num(`A ball is thrown upward. Its height in feet after t seconds is ${T(`h(t) = ${tex(e)}`)}. What is its maximum height?`, String(max), { unit: 'feet', fig, meta: { kind: 'quadMax', args: [-16, v, h0] }, miss: { [String(t)]: `That is the time of the top. Put t = ${t} into h(t).` }, steps: [`Time of the top: t = −${v} ÷ (2 × −16) = ${t}.`, `h(${t}) = −16(${t})² + ${v}(${t}) + ${h0} = ${max}.`], hint: 'Find the time of the vertex, then the height at that time.', why: `h(${t}) = ${max} feet` }), 'F.IF.B.4 · A.SSE.B.3', 232, 'func');
  }
  function modelType() {
    const kind = U.pick(['linear', 'exponential', 'quadratic']), x0 = 0, start = U.int(1, 5);
    const ys = kind === 'linear' ? (() => { const m = nz(-4, 6); return [0, 1, 2, 3, 4].map((x) => start + m * x); })() : kind === 'exponential' ? (() => { const r = U.pick([2, 3]); return [0, 1, 2, 3, 4].map((x) => start * r ** x); })() : (() => { const a = nz(-2, 3), b = U.int(-3, 3); return [0, 1, 2, 3, 4].map((x) => a * x * x + b * x + start); })();
    const d1 = ys.slice(1).map((y, i) => y - ys[i]);
    if (kind === 'quadratic' && new Set(d1).size === 1) return modelType();
    return tag(U.mcFixed('Which kind of function fits the table?', kind, ['linear', 'exponential', 'quadratic'], { fig: Fig.table([['x', ...[0, 1, 2, 3, 4].map((x) => String(x + x0))], ['y', ...ys.map((y) => fx(y))]]), meta: { kind: 'modelType', args: [ys] }, steps: [`First differences: ${d1.map(fx).join(', ')}.`, kind === 'linear' ? 'They are all the same: linear.' : kind === 'quadratic' ? `Second differences: ${d1.slice(1).map((d, i) => fx(d - d1[i])).join(', ')}: all the same, so quadratic.` : `Not the same, but each y is ${ys[1] / ys[0]} times the one before: exponential.`], hint: 'Same differences: linear. Same second differences: quadratic. Same ratios: exponential.', why: `${kind}` }), 'F.LE.A.1 · F.IF.B.6', 230, 'func');
  }

  // ===================== LINEAR-QUADRATIC SYSTEMS =====================
  function lqSystem() {
    const r = U.int(-4, 3), s = U.intWhere(r + 1, 5, (v) => v !== r), m = nz(-2, 2), k = U.int(-3, 3), b = m - (r + s), c = k + r * s;
    return { r, s, m, k, b, c, q: Alg.pstr([c, b, 1]), l: lin(m, k), diff: Alg.pstr([c - k, b - m, 1]) };
  }
  function lqGraph() {
    const S = lqSystem(), ans = `${pt(S.r, S.m * S.r + S.k)} and ${pt(S.s, S.m * S.s + S.k)}`;
    if ([S.r, S.s].some((x) => Math.abs(S.m * x + S.k) > 8)) return lqGraph();
    const w = [`${pt(S.r, 0)} and ${pt(S.s, 0)}`, `${pt(S.m * S.r + S.k, S.r)} and ${pt(S.m * S.s + S.k, S.s)}`, `${pt(0, S.c)} and ${pt(0, S.k)}`].filter((x) => x !== ans);
    return tag(U.mc(`The graph shows ${T(`y = ${tex(S.q)}`)} and ${T(`y = ${tex(S.l)}`)}. What are the solutions of the system?`, ans, w, { fig: Fig.graph({ fns: [{ kind: 'fn', f: (x) => x * x + S.b * x + S.c }, { kind: 'lin', m: S.m, b: S.k }], pts: [[S.r, S.m * S.r + S.k], [S.s, S.m * S.s + S.k]], range: [-8, 8], step: 2 }), meta: { kind: 'lqPts', args: [S.b, S.c, S.m, S.k] }, hint: 'The solutions are the points where the two graphs cross.', why: ans }), 'A.REI.C.7 · A.REI.D.11', 234, 'eei');
  }
  function lqSolve() {
    const S = lqSystem(), ans = `x = ${fx(S.r)} and x = ${fx(S.s)}`;
    return tag(U.mc(`Solve the system for x.\n${T(`y = ${tex(S.q)}`)}\n${T(`y = ${tex(S.l)}`)}`, ans, [`x = ${fx(-S.s)} and x = ${fx(-S.r)}`, `x = ${fx(S.r)} only`, `x = ${fx(S.r * S.s)} and x = ${fx(-(S.r + S.s))}`].filter((x) => x !== ans), { fig: Fig.table([['Step', 'Equation'], ['Set equal', `${fx(Alg.pstr([S.c, S.b, 1]))} = ${fx(S.l)}`], ['Make 0', `${fx(S.diff)} = 0`]]), meta: { kind: 'roots', args: [S.diff] }, steps: [`Set the right sides equal: ${fx(S.q)} = ${fx(S.l)}.`, `Move everything to one side: ${fx(S.diff)} = 0.`, `Factor: (x ${S.r < 0 ? '+' : '−'} ${Math.abs(S.r)})(x ${S.s < 0 ? '+' : '−'} ${Math.abs(S.s)}) = 0.`], hint: 'Substitute: set the two expressions for y equal.', why: ans }), 'A.REI.C.7', 238, 'eei');
  }
  function lqCount() {
    const b = U.int(-4, 4), m = U.int(-3, 3), D0 = U.pick([-1, 0, 1]), bm = b - m, c = U.int(-4, 4);
    // choose k so the discriminant (b − m)² − 4(c − k) has the wanted sign; when 0, (b − m) must be even
    if (D0 === 0 && bm % 2) return lqCount();
    const k = D0 === 0 ? c - (bm * bm) / 4 : D0 > 0 ? c - Math.floor((bm * bm) / 4) + U.int(1, 4) : c - Math.ceil((bm * bm) / 4) - U.int(1, 4);
    const D = bm * bm - 4 * (c - k), ans = D > 0 ? '2' : D === 0 ? '1' : '0';
    return tag(U.mcFixed(`How many solutions does the system have?\n${T(`y = ${tex(Alg.pstr([c, b, 1]))}`)}\n${T(`y = ${tex(lin(m, k))}`)}`, ans, ['0', '1', '2'], { fig: Fig.graph({ fns: [{ kind: 'fn', f: (x) => x * x + b * x + c }, { kind: 'lin', m, b: k }], range: [-8, 8], step: 2 }), meta: { kind: 'lqCount', args: [b, c, m, k] }, steps: [`Set equal and make 0: ${fx(Alg.pstr([c - k, b - m, 1]))} = 0.`, `Discriminant: (${fx(bm)})² − 4(1)(${fx(c - k)}) = ${fx(D)}.`], hint: 'The discriminant of the combined equation tells you: positive 2, zero 1, negative 0.', why: `Discriminant ${fx(D)}: ${ans} solution${ans === '1' ? '' : 's'}.` }), 'A.REI.C.7 · A.REI.B.4b', 240, 'eei');
  }

  // ===================== WORKING WITH FUNCTIONS =====================
  function rootEval() {
    const cube = U.pick([false, true]), a = U.pick([1, 2, -1, 3]), h = U.int(-4, 4), k = U.int(-5, 5), r = cube ? U.int(-3, 3) : U.int(0, 4), x = h + (cube ? r ** 3 : r * r), v = a * r + k;
    const f = `${a === 1 ? '' : a === -1 ? '-' : a}\\${cube ? 'sqrt[3]' : 'sqrt'}{x ${h > 0 ? '-' : '+'} ${Math.abs(h)}}${k ? ` ${k < 0 ? '-' : '+'} ${Math.abs(k)}` : ''}`.replace('{x + 0}', '{x}').replace('{x - 0}', '{x}');
    return tag(U.num(`If ${T(`f(x) = ${f}`)}, what is ${T(`f(${x})`)}?`, String(v), { keys: kp(v), fig: Fig.graph({ fns: [{ kind: 'fn', f: (t) => a * (cube ? Math.cbrt(t - h) : t >= h ? Math.sqrt(t - h) : NaN) + k }], range: [-8, 8], step: 2 }), meta: { kind: cube ? 'cbrtAt' : 'sqrtAt', args: [a, h, k, x] }, steps: [`Inside: ${x} ${h < 0 ? '+' : '−'} ${Math.abs(h)} = ${x - h}.`, `${cube ? 'Cube' : 'Square'} root: ${r}.`, `${fx(a)} × ${fx(r)} ${signed(k)} = ${fx(v)}.`], hint: `Work inside the root first.`, why: `f(${x}) = ${fx(v)}` }), 'F.IF.C.7b · F.IF.A.2', 226, 'func');
  }
  function sqrtDomain() {
    const h = U.int(-6, 6), k = U.int(-4, 4), ans = `x ≥ ${fx(h)}`;
    return tag(U.mc(`What is the domain of ${T(`f(x) = \\sqrt{x ${h > 0 ? '-' : '+'} ${Math.abs(h)}}${k ? ` ${k < 0 ? '-' : '+'} ${Math.abs(k)}` : ''}`.replace('{x + 0}', '{x}').replace('{x - 0}', '{x}'))}?`, ans, [`x ≥ ${fx(-h)}`, `x ≥ ${fx(k)}`, 'all real numbers'].filter((x) => x !== ans), { fig: Fig.graph({ fns: [{ kind: 'fn', f: (t) => (t >= h ? Math.sqrt(t - h) + k : NaN) }], range: [-8, 8], step: 2 }), meta: { kind: 'sqrtDom', args: [h] }, miss: { [`x ≥ ${fx(-h)}`]: `Solve x ${h > 0 ? '−' : '+'} ${Math.abs(h)} ≥ 0 carefully.` }, hint: 'The inside of a square root cannot be negative.', why: `x ${h > 0 ? '−' : '+'} ${Math.abs(h)} ≥ 0 gives ${ans}.` }), 'F.IF.B.5', 228, 'func');
  }
  function transPoint() {
    const p = U.int(-4, 4), q = U.int(-4, 4), kind = U.pick(['shift', 'shift', 'stretch']), h = kind === 'shift' ? nz(-4, 4) : 0, k = nz(-4, 4), a = kind === 'stretch' ? U.pick([2, 3, -1, -2]) : 1;
    const g = `g(x) = ${a === 1 ? '' : a === -1 ? '-' : a}f(x${h ? ` ${h > 0 ? '-' : '+'} ${Math.abs(h)}` : ''})${k ? ` ${k < 0 ? '-' : '+'} ${Math.abs(k)}` : ''}`;
    const ans = pt(p + h, a * q + k);
    const w = [...new Set([pt(p - h, a * q + k), pt(p + h, q + k), pt(a * p + h, q + k), pt(p + h, a * (q + k)), pt(p + k, a * q + h), pt(p + h, a * q - k)])].filter((x) => x !== ans).slice(0, 3);
    return tag(U.mc(`The point ${pt(p, q)} is on the graph of ${T('y = f(x)')}. Which point must be on the graph of ${T(g)}?`, ans, w, { fig: Fig.graph({ pts: [[p, q, 'f']], range: [-8, 8], step: 2 }), meta: { kind: 'tPoint', args: [p, q, a, h, k] }, miss: { [pt(p - h, a * q + k)]: 'Inside the parentheses works backward: x − 3 moves right 3.' }, hint: 'Inside changes x (opposite way); outside changes y (multiply first, then add).', why: `x: ${fx(p)} ${h >= 0 ? '+' : '−'} ${Math.abs(h)} = ${fx(p + h)}; y: ${fx(a)} × ${fx(q)} ${signed(k)} = ${fx(a * q + k)}` }), 'F.BF.B.3', 232, 'func');
  }
  function fnOps() {
    const f = lin(nz(-4, 4), U.int(-6, 6)), g = U.pick([lin(nz(-3, 3), U.int(-5, 5)), Alg.pstr([U.int(-3, 3), 0, 1])]), x = U.int(-3, 3), op = U.pick(['+', '-', '*', 'o']);
    if (op === 'o') {
      const v = Alg.evalAt(Alg.parse(f), { x: Alg.evalAt(Alg.parse(g), { x }) });
      return tag(U.num(`${T(`f(x) = ${tex(f)}`)} and ${T(`g(x) = ${tex(g)}`)}. What is ${T(`f(g(${x}))`)}?`, String(v), { keys: kp(v), fig: Fig.table([['Step', 'Value'], [`g(${x})`, '?'], [`f(g(${x}))`, '?']], 'Inside first'), meta: { kind: 'compose', args: [f, g, x] }, miss: { [String(Alg.evalAt(Alg.parse(g), { x: Alg.evalAt(Alg.parse(f), { x }) }))]: 'That is g(f(x)). Work from the inside out: g first.' }, steps: [`g(${x}) = ${fx(Alg.evalAt(Alg.parse(g), { x }))}.`, `f(${fx(Alg.evalAt(Alg.parse(g), { x }))}) = ${fx(v)}.`], hint: 'Find g(x) first, then put that into f.', why: `f(g(${x})) = ${fx(v)}` }), 'F.BF.A.1c', 236, 'func');
    }
    const e = `(${f}) ${op} (${g})`, v = Alg.evalAt(Alg.parse(e), { x });
    return tag(U.num(`${T(`f(x) = ${tex(f)}`)} and ${T(`g(x) = ${tex(g)}`)}. What is ${T(`(f ${op === '*' ? '\\cdot' : op} g)(${x})`)}?`, String(v), { keys: kp(v), fig: Fig.table([['x', String(x)], ['f(x)', fx(Alg.evalAt(Alg.parse(f), { x }))], ['g(x)', fx(Alg.evalAt(Alg.parse(g), { x }))]]), meta: { kind: 'evalAt', args: [e, { x }] }, hint: `Find f(${x}) and g(${x}), then ${op === '+' ? 'add' : op === '-' ? 'subtract' : 'multiply'}.`, why: `${fx(Alg.evalAt(Alg.parse(f), { x }))} ${op === '*' ? '×' : op === '-' ? '−' : '+'} ${fx(Alg.evalAt(Alg.parse(g), { x }))} = ${fx(v)}` }), 'F.BF.A.1b', 228, 'func');
  }

  // ===================== STATISTICS: STANDARD DEVIATION & SHAPE =====================
  const SD_PATTERNS = [[[-3, -1, -1, -1, 0, 0, 2, 4], 2], [[-7, -1, 1, 7], 5], [[-1, 1, -1, 1], 1], [[-3, 3, -3, 3, -3, 3], 3]];
  function stdev() {
    const [dev, sd] = U.pick(SD_PATTERNS), k = U.pick([1, 1, 2]), m = U.int(10, 40), xs = U.shuffle(dev.map((d) => m + d * k)), ans = sd * k;
    const ss = dev.reduce((t, d) => t + d * d * k * k, 0);
    return tag(U.num(`Find the standard deviation of the data (divide by n, the number of values).\n${xs.join(', ')}`, String(ans), { keys: kp(ans), fig: Fig.table([['Data', ...xs.map(String)]], `Mean = ${m}`), meta: { kind: 'stdev', args: [xs] }, miss: { [String(ss / xs.length)]: 'That is the variance. Take its square root.', [String(ss)]: 'Divide the sum of squares by n, then take the square root.' }, steps: [`Mean: ${m}.`, `Squared distances from the mean add up to ${ss}.`, `${ss} ÷ ${xs.length} = ${ss / xs.length}; √${ss / xs.length} = ${ans}.`], hint: 'σ = √( sum of (x − mean)² ÷ n )', why: `σ = √${ss / xs.length} = ${ans}` }), 'S.ID.A.2', 232, 'func');
  }
  const SHAPES = { 'skewed right': [6, 7, 4, 2, 1, 1], 'skewed left': [1, 1, 2, 4, 7, 6], symmetric: [1, 3, 6, 6, 3, 1] };
  function shapeQ() {
    const name = U.pick(Object.keys(SHAPES)), bars = SHAPES[name].map((v) => v + U.int(0, 1) * (name === 'symmetric' ? 0 : 1));
    const ask = U.pick(['shape', 'center']), labels = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59'];
    const fig = Fig.barGraph('Number of students by score', labels.map((l, i) => [l, bars[i]]));
    if (ask === 'shape') return tag(U.mcFixed('What is the shape of the distribution?', name, ['skewed right', 'skewed left', 'symmetric'], { fig, meta: { kind: 'skew', args: [bars] }, hint: 'Skewed right has a long tail on the right; skewed left a long tail on the left.', why: name }), 'S.ID.A.3', 222, 'func');
    const ans = name === 'skewed right' ? 'The mean is greater than the median.' : name === 'skewed left' ? 'The mean is less than the median.' : 'The mean and median are about the same.';
    return tag(U.mcFixed('How do the mean and median of this data compare?', ans, ['The mean is greater than the median.', 'The mean is less than the median.', 'The mean and median are about the same.'], { fig, meta: { kind: 'skewCenter', args: [bars] }, hint: 'The mean is pulled toward the long tail.', why: ans }), 'S.ID.A.3', 228, 'func');
  }

  // ===================== THE SKILLS =====================
  A1_NEW.push(
    { id: 'absval', name: 'Absolute value equations', icon: '📏', levels: [
      lv('Absolute value equations', 'A.REI.B.3 · A.CED.A.1', 'Two cases: the number or its opposite.', [absEq]),
      lv('Absolute value inequalities', 'A.REI.B.3', 'Between, or outside.', [absLess, absEq]),
      lv('Get it alone first', 'A.REI.B.3 · A.CED.A.1', 'Isolate, then solve. Sometimes no solution.', [absEq2, absLess]) ] },
    { id: 'forms', name: 'Forms of linear equations', icon: '✍️', levels: [
      lv('Point-slope form', 'A.CED.A.2', 'y − y₁ = m(x − x₁).', [pointSlope, psRead]),
      lv('Standard form', 'A.CED.A.2 · A.CED.A.4', 'Ax + By = C and its intercepts.', [stdIntercept, stdToSlope]),
      lv('Write the equation', 'A.CED.A.2 · F.LE.A.2', 'From two points or a story.', [twoPointLine, lineStory]) ] },
    { id: 'fitline', name: 'Scatter plots & lines of fit', icon: '📉', levels: null },
    { id: 'absfn', name: 'Absolute value functions', icon: '✔️', levels: [
      lv('Vertex and values', 'F.IF.C.7b · F.IF.A.2', 'f(x) = a|x − h| + k.', [absVertex, absEval]),
      lv('Translations', 'F.BF.B.3', 'Slide the V.', [absShift, absGraph]),
      lv('Reflections and range', 'F.BF.B.3 · F.IF.B.5', 'Opening up or down.', [absRange, absGraph, absEval]) ] },
    { id: 'piecewise', name: 'Piecewise & step functions', icon: '🪜', levels: [
      lv('Evaluate piecewise functions', 'F.IF.A.2 · F.IF.C.7b', 'Pick the piece, then substitute.', [pieceEval, pieceWhich]),
      lv('Step functions', 'F.IF.C.7b', 'Costs that jump.', [stepCost, floorEval]),
      lv('Read piecewise graphs', 'F.IF.C.7b · F.IF.B.4', 'Open and closed dots.', [pieceEval, pieceWhich, floorEval]) ] },
    { id: 'factoring', name: 'Factoring', icon: '🔍', levels: null },
    { id: 'quadmodel', name: 'Quadratic models', icon: '🏀', levels: [
      lv('Axis of symmetry and vertex', 'F.IF.C.8a · F.IF.B.4', 'x = −b ÷ 2a.', [axisSym, () => projectile('time')]),
      lv('Modeling with quadratics', 'F.IF.B.4 · A.SSE.B.3', 'Highest points and times.', [() => projectile('max'), () => projectile('time')]),
      lv('Linear, exponential, or quadratic?', 'F.LE.A.1 · F.IF.B.6', 'Differences and ratios.', [modelType]) ] },
    { id: 'qsolve', name: 'Solve quadratic equations', icon: '🎯', levels: null },
    { id: 'linquad', name: 'Linear-quadratic systems', icon: '➰', levels: [
      lv('Solve by graphing', 'A.REI.D.11 · A.REI.C.7', 'Where a line meets a parabola.', [lqGraph]),
      lv('Solve by substitution', 'A.REI.C.7', 'Set them equal.', [lqSolve, lqGraph]),
      lv('How many solutions?', 'A.REI.C.7 · A.REI.B.4b', 'The discriminant decides.', [lqCount, lqSolve]) ] },
    { id: 'workfn', name: 'Transforming & combining functions', icon: '🔧', levels: [
      lv('Square root and cube root functions', 'F.IF.C.7b · F.IF.B.5', 'Values and domains.', [rootEval, sqrtDomain]),
      lv('Translations and stretches', 'F.BF.B.3', 'Where does a point go?', [transPoint]),
      lv('Operations and composition', 'F.BF.A.1b · F.BF.A.1c', 'f + g, f · g, f(g(x)).', [fnOps]) ] },
    { id: 'data11', name: 'Data: center, spread & shape', icon: '📊', levels: null },
  );
  // New levels used by skills that also reuse earlier levels (a1-subjects.js fills those in).
  A1_NEW.extra = {
    fitline: [lv('Residuals', 'S.ID.B.6b', 'How far from the line?', [residual]), lv('The correlation coefficient', 'S.ID.C.8 · S.ID.C.9', 'How strong, which way?', [corrWord, residual])],
    factoring: [lv('Factor ax² + bx + c', 'A.SSE.A.2', 'The a·c method.', [factorAC]), lv('Special cases', 'A.SSE.A.2', 'Difference of squares and perfect squares.', [factorSpecial, factorAC])],
    data11: [lv('Standard deviation and shape', 'S.ID.A.2 · S.ID.A.3', 'How spread out, which way it leans.', [stdev, shapeQ])],
  };
})();
