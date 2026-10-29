// Algebra 1 Quest — Honors: one harder skill at the end of each of the 11 topics (multi-step problems, parameters,
// proofs by checking, and Algebra 2 previews). Every answer is computed in code; meta {kind, args} lets
// tools/validate.js recompute it independently. Standards: NJSLS-Mathematics 2023 (+ Algebra 2 / Geometry previews).
// All questions are original.
const A1_HONORS = {};
(function () {
  const { tag, nz, frac, lin, tx, lv, fx, mcN, kp, gcd } = A1;
  const tex = (e) => Alg.tex(e).replace(/\\cdot/g, '\\,');
  const pt = (x, y) => `(${fx(x)}, ${fx(y)})`;
  const signed = (n) => (n < 0 ? `− ${-n}` : `+ ${n}`);
  const par = (n) => (n < 0 ? `(${n})` : String(n));
  const H = (id, name, icon, levels) => { A1_HONORS[id] = { id, name: `Honors: ${name}`, icon, honors: true, levels }; };

  // ===================== 1. EQUATIONS AND INEQUALITIES =====================
  function fracEq() {
    // pick x, then shift a and b so both numerators divide evenly
    const p = U.pick([2, 3, 4, 5]), q = U.intWhere(2, 6, (v) => v !== p), x = U.int(-12, 12);
    const a = (((-x) % p) + p) % p - p * U.int(0, 1), b = ((x % q) + q) % q - q * U.int(0, 1), c = (x + a) / p - (x - b) / q;
    const L = `(x + ${par(a)})/${p} - (x - ${par(b)})/${q}`, lcd = (p * q) / gcd(p, q);
    return tag(U.num(`Solve.\n${T(`\\frac{${a ? `x ${a < 0 ? '-' : '+'} ${Math.abs(a)}` : 'x'}}{${p}} - \\frac{${b ? `x ${b < 0 ? '+' : '-'} ${Math.abs(b)}` : 'x'}}{${q}} = ${c}`)}`, String(x), { keys: 'neg', pre: 'x =', fig: Fig.table([['Step', 'Do'], ['1', `Multiply every term by ${lcd}`], ['2', 'Distribute (watch the minus sign)'], ['3', 'Collect x and solve']], 'Clear the fractions'), meta: { kind: 'solveLin', args: [L, String(c)] }, steps: [`Multiply both sides by the LCD, ${lcd}.`, `${lcd / p}(x ${signed(a)}) − ${lcd / q}(x ${signed(-b)}) = ${lcd * c}.`, `Distribute and combine: ${fx(lcd / p - lcd / q)}x ${signed((lcd / p) * a + (lcd / q) * b)} = ${lcd * c}.`, `x = ${fx(x)}.`], hint: 'Multiply every term by the least common denominator first.', why: `Check: (${fx(x + a)})/${p} − (${fx(x - b)})/${q} = ${fx((x + a) / p)} − ${par((x - b) / q)} = ${c}` }), 'A.REI.B.3', 238, 'eei');
  }
  function decEq() {
    const x = U.int(-9, 12), a = U.int(2, 9) / 10, h = U.int(1, 6), b = U.int(11, 19) / 10, c = U.int(1, 9) / 10;
    if (Math.abs(a + b - c) < 1e-9) return decEq();
    const d = +(a * (x - h) + b * x - c * x).toFixed(2), L = `${a}(x - ${h}) + ${b}x`, Rt = `${c}x + ${par(d)}`;
    return tag(U.num(`Solve.\n${T(`${a}(x - ${h}) + ${b}x = ${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`)}`, String(x), { keys: 'neg', pre: 'x =', fig: Fig.table([['Tip', 'Multiply every term by 10 or 100 to clear the decimals']]), meta: { kind: 'solveLin', args: [L, Rt] }, steps: [`Distribute: ${a}x − ${+(a * h).toFixed(2)} + ${b}x = ${c}x ${signed(d)}.`, `Combine: ${+(a + b - c).toFixed(2)}x = ${+(d + a * h).toFixed(2)}.`, `x = ${fx(x)}.`], hint: 'Distribute, then collect x terms on one side.', why: `x = ${fx(x)}` }), 'A.REI.B.3', 236, 'eei');
  }
  function noSolK() {
    const a = U.int(2, 6), b = nz(-5, 5), c = U.int(a + 1, a + 6), d = U.intWhere(-12, 12, (v) => v !== -a * b), k = c - a;
    const L = `${a}(x - ${par(b)}) + k*x`, Rt = `${c}x + ${par(d)}`;
    return tag(U.num(`For what value of k does this equation have no solution?\n${T(`${a}(x ${b < 0 ? '+' : '-'} ${Math.abs(b)}) + kx = ${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`)}`, String(k), { keys: 'neg', pre: 'k =', fig: Fig.table([['No solution', 'same x-coefficient, different constants'], ['Infinitely many', 'same x-coefficient, same constants']]), meta: { kind: 'noSolParam', args: [L, Rt] }, steps: [`Left side: (${a} + k)x ${signed(-a * b)}.`, `No solution when the x-terms match but the constants don't: ${a} + k = ${c}.`, `k = ${k} (and ${fx(-a * b)} ≠ ${fx(d)}, so the constants differ).`], hint: 'Make the x-coefficients equal on both sides.', why: `${a} + ${k} = ${c}, and ${fx(-a * b)} ≠ ${fx(d)}: no solution.` }), 'A.REI.B.3 · A.CED.A.1', 242, 'eei');
  }
  function absIneqA() {
    const a = U.pick([2, 3, 4, 5]), lo = U.int(-6, 2), hi = lo + U.int(1, 5) * 2, cen = (lo + hi) / 2, half = (hi - lo) / 2, b = -a * cen, c = a * half, le = U.pick([true, false]);
    if (!Number.isInteger(b)) return absIneqA();
    const ans = le ? `${fx(lo)} ≤ x ≤ ${fx(hi)}` : `x < ${fx(lo)} or x > ${fx(hi)}`;
    const w = le ? [`x ≤ ${fx(lo)} or x ≥ ${fx(hi)}`, `${fx(-c - b)} ≤ x ≤ ${fx(c - b)}`, `${fx(lo * a)} ≤ x ≤ ${fx(hi * a)}`] : [`${fx(lo)} < x < ${fx(hi)}`, `x < ${fx(-c - b)} or x > ${fx(c - b)}`, `x > ${fx(hi)}`];
    return tag(U.mc(`Solve.\n${T(`|${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}| ${le ? '\\le' : '>'} ${c}`)}`, ans, [...new Set(w)].filter((x) => x !== ans), { fig: Fig.numLine(lo - 2, hi + 2, 1, { labels: [lo, hi], marks: [{ v: lo, label: fx(lo) }, { v: hi, label: fx(hi) }] }), meta: { kind: 'absIneqA', args: [a, b, c, le ? '≤' : '>'] }, steps: [le ? `−${c} ≤ ${a}x ${signed(b)} ≤ ${c}.` : `${a}x ${signed(b)} < −${c} or ${a}x ${signed(b)} > ${c}.`, `${b < 0 ? 'Add' : 'Subtract'} ${Math.abs(b)}, then divide by ${a}.`], hint: 'Write it without bars first: "between" for ≤, "or" for >.', why: ans }), 'A.REI.B.3', 244, 'eei');
  }
  function compound() {
    const a = U.pick([2, 3, -2, -3]), b = U.int(-6, 6), x1 = U.int(-6, 0), x2 = x1 + U.int(2, 6);
    const L = a * x1 + b, Rr = a * x2 + b, [lo, hi] = a > 0 ? [L, Rr] : [Rr, L], strictLo = U.pick([true, false]);
    // lo < ax + b ≤ hi  → x between; a negative a flips both signs
    const opL = strictLo ? '<' : '≤', opR = strictLo ? '≤' : '<';
    const xlo = (lo - b) / a, xhi = (hi - b) / a, [A, B] = xlo < xhi ? [xlo, xhi] : [xhi, xlo];
    const flip = (o) => o;
    const [oA, oB] = a > 0 ? [opL, opR] : [opR, opL];
    const ans = `${fx(A)} ${flip(oA)} x ${flip(oB)} ${fx(B)}`;
    const w = [`${fx(A)} ${oB} x ${oA} ${fx(B)}`, `${fx(-B)} ${oA} x ${oB} ${fx(-A)}`, `x ${oA === '<' ? '>' : '≥'} ${fx(A)}`].filter((x) => x !== ans);
    return tag(U.mc(`Solve.\n${T(`${lo} ${opL === '<' ? '<' : '\\le'} ${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)} ${opR === '<' ? '<' : '\\le'} ${hi}`)}`, ans, w, { fig: Fig.numLine(Math.floor(A) - 2, Math.ceil(B) + 2, 1, { labels: [A, B], marks: [{ v: A, label: fx(A) }, { v: B, label: fx(B) }] }), meta: { kind: 'compound2', args: [lo, opL, a, b, opR, hi] }, miss: a < 0 ? { [w[0]]: 'Dividing by a negative flips both inequality signs, so the strict and non-strict ends swap sides.' } : {}, steps: [`${b < 0 ? 'Add' : 'Subtract'} ${Math.abs(b)} in all three parts.`, `Divide all three parts by ${a}${a < 0 ? ' and flip both signs' : ''}.`, `Write it from least to greatest: ${ans}.`], hint: 'Do the same thing to all three parts.', why: ans }), 'A.REI.B.3', 240, 'eei');
  }

  // ===================== 2. LINEAR EQUATIONS =====================
  function perpThrough() {
    const k = nz(-4, 4), C = nz(-9, 9), x1 = U.int(-4, 4), y1 = U.int(-5, 5), perp = U.pick([true, false]);
    const given = perp ? `x ${k < 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}y = ${C}` : `${k}x - y = ${C}`;
    const m = perp ? k : k, b = y1 - m * x1;
    return tag({ t: 'expr', q: `Write the equation of the line through ${pt(x1, y1)} that is ${perp ? 'perpendicular' : 'parallel'} to ${T(given)}.`, a: lin(m, b), pre: 'y =', fig: Fig.graph({ pts: [[x1, y1, 'P']], range: [-8, 8], step: 2 }), meta: { kind: 'lineThru', args: [x1, y1, x1 + 1, y1 + m] }, miss: perp ? { [lin(-1 / k === Math.round(-1 / k) ? -1 / k : -k, b)]: 'Perpendicular slopes are opposite reciprocals: multiply to −1.' } : {}, steps: [perp ? `Solve for y: y = ${fx(frac(-1, k))}x ${signed(+(C / k).toFixed(2))}; slope ${fx(frac(-1, k))}.` : `Solve for y: y = ${fx(k)}x ${signed(-C)}; slope ${fx(k)}.`, perp ? `Perpendicular slope: the opposite reciprocal, ${fx(k)}.` : `Parallel: same slope, ${fx(k)}.`, `Through ${pt(x1, y1)}: b = ${fx(y1)} − ${fx(m)}·${par(x1)} = ${fx(b)}.`], hint: 'Find the given line\'s slope first (solve for y).', why: `y = ${fx(lin(m, b))}` }, 'G.GPE.B.5 · A.CED.A.2', 240, 'func');
  }
  function findK() {
    const m = nz(-3, 3), x1 = U.int(-4, 2), dx = U.int(1, 5), y2 = U.int(-8, 10), k = y2 - m * dx, perp = U.pick([false, true]);
    // perpendicular to a line of slope −1/m is slope m
    const given = perp ? `y = ${fx(frac(-1, m))}x + 1` : `y = ${fx(m)}x + 1`;
    return tag(U.num(`For what value of k is the line through (${fx(x1)}, k) and ${pt(x1 + dx, y2)} ${perp ? 'perpendicular' : 'parallel'} to ${T(given.replace(/−/g, '-'))}?`, String(k), { keys: 'neg', pre: 'k =', fig: Fig.graph({ pts: [[x1 + dx, y2, 'B']], range: [-10, 10], step: 2 }), meta: { kind: 'parK', args: [dx, y2, m] }, steps: [perp ? `The slope must be the opposite reciprocal of ${fx(frac(-1, m))}: ${fx(m)}.` : `The slope must be ${fx(m)}.`, `(${fx(y2)} − k) ÷ ${dx} = ${fx(m)}, so ${fx(y2)} − k = ${fx(m * dx)}.`, `k = ${fx(k)}.`], hint: 'Write the slope formula with k in it, and set it equal to the slope you need.', why: `(${fx(y2)} − ${par(k)}) ÷ ${dx} = ${fx(m)}` }), 'G.GPE.B.5 · A.REI.B.3', 242, 'func');
  }
  const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]];
  function distMid() {
    const [a, b, c] = U.pick(TRIPLES), x1 = U.int(-6, 4), y1 = U.int(-6, 4), sx = U.pick([1, -1]), sy = U.pick([1, -1]), sw = U.pick([true, false]);
    const x2 = x1 + sx * (sw ? b : a), y2 = y1 + sy * (sw ? a : b);
    if (U.pick([true, false])) return tag(U.num(`What is the distance between ${pt(x1, y1)} and ${pt(x2, y2)}?`, String(c), { fig: Fig.graph({ pts: [[x1, y1, 'A'], [x2, y2, 'B']], range: [-20, 20], step: 4 }), meta: { kind: 'dist', args: [x1, y1, x2, y2] }, miss: { [String(a + b)]: 'Distance is not the sum of the legs: use the Pythagorean theorem.' }, steps: [`Run: ${Math.abs(x2 - x1)}, rise: ${Math.abs(y2 - y1)}.`, `√(${Math.abs(x2 - x1)}² + ${Math.abs(y2 - y1)}²) = √${c * c} = ${c}.`], hint: 'd = √((x₂ − x₁)² + (y₂ − y₁)²)', why: `d = ${c}` }), 'G.GPE.B.7 · 8.G.B.8', 236, 'func');
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ans = pt(mx, my);
    return tag(U.mc(`What is the midpoint of the segment from ${pt(x1, y1)} to ${pt(x2, y2)}?`, ans, [...new Set([pt((x2 - x1) / 2, (y2 - y1) / 2), pt(x1 + x2, y1 + y2), pt(my, mx)])].filter((p) => p !== ans), { fig: Fig.graph({ pts: [[x1, y1, 'A'], [x2, y2, 'B']], range: [-20, 20], step: 4 }), meta: { kind: 'midpoint', args: [x1, y1, x2, y2] }, hint: 'Average the x-values and average the y-values.', why: ans }), 'G.GPE.B.6', 230, 'func');
  }

  // ===================== 3. LINEAR FUNCTIONS =====================
  function termNum() {
    const a1 = U.int(-20, 20), d = nz(-7, 9), n = U.int(15, 80), N = a1 + (n - 1) * d;
    return tag(U.num(`An arithmetic sequence starts ${[0, 1, 2, 3].map((i) => fx(a1 + i * d)).join(', ')}, … Which term is ${fx(N)}?`, String(n), { pre: 'term', fig: Fig.table([['Rule', `aₙ = ${fx(a1)} + (n − 1)(${fx(d)})`]]), meta: { kind: 'termNum', args: [a1, d, N] }, miss: { [String(n - 1)]: 'Remember the (n − 1): the first term has no d added.' }, steps: [`aₙ = ${fx(a1)} + (n − 1)(${fx(d)}).`, `${fx(N)} − ${par(a1)} = ${fx(N - a1)} = (n − 1)(${fx(d)}), so n − 1 = ${n - 1}.`], hint: 'Set the explicit formula equal to the number and solve for n.', why: `n = ${n}` }), 'F.BF.A.2 · F.LE.A.2', 236, 'func');
  }
  function seqFromTwo() {
    const a1 = U.int(-15, 15), d = nz(-6, 6), i = U.int(3, 7), j = i + U.int(3, 9);
    return tag(U.num(`In an arithmetic sequence, ${T(`a_{${i}} = ${a1 + (i - 1) * d}`)} and ${T(`a_{${j}} = ${a1 + (j - 1) * d}`)}. What is ${T('a_1')}?`, String(a1), { keys: 'neg', fig: Fig.table([['Term', String(i), '…', String(j)], ['Value', fx(a1 + (i - 1) * d), '…', fx(a1 + (j - 1) * d)]]), meta: { kind: 'seqA1', args: [i, a1 + (i - 1) * d, j, a1 + (j - 1) * d] }, miss: { [String(d)]: 'That is the common difference. Now count back to the first term.' }, steps: [`d = (${fx(a1 + (j - 1) * d)} − ${par(a1 + (i - 1) * d)}) ÷ (${j} − ${i}) = ${fx(d)}.`, `a₁ = (term ${i}) − ${i - 1}d = ${fx(a1 + (i - 1) * d)} − ${i - 1}·${par(d)} = ${fx(a1)}.`], hint: 'Find d from the two terms, then step back to a₁.', why: `a₁ = ${fx(a1)}` }), 'F.BF.A.2 · F.LE.A.2', 240, 'func');
  }
  function inverseFrac() {
    const a = U.pick([2, 3, 4, -2, -3]), b = nz(-8, 8), c = U.pick([2, 3, 5]), f = `(${a}x + ${b})/${c}`, ans = `(${c}x - ${b})/${a < 0 ? `(${a})` : a}`;
    return tag({ t: 'expr', q: `Find the inverse of ${T(`f(x) = \\frac{${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}}{${c}}`)}.`, a: ans, pre: 'f⁻¹(x) =', fig: Fig.table([['f does', `× ${fx(a)}`, `${b < 0 ? '−' : '+'} ${Math.abs(b)}`, `÷ ${c}`], ['f⁻¹ undoes', `× ${c}`, `${b < 0 ? '+' : '−'} ${Math.abs(b)}`, `÷ ${fx(a)}`]], 'Undo in reverse order'), meta: { kind: 'inverse', args: [f] }, miss: { [`(${a}x - ${b})/${c}`]: 'Undo in REVERSE order: multiply by ' + c + ' first.' }, hint: 'Swap x and y, then solve for y.', why: `f⁻¹(x) = (${c}x ${signed(-b)}) ÷ ${fx(a)}` }, 'F.BF.B.4a', 244, 'func');
  }
  function transformLin() {
    const m = nz(-4, 4), b = nz(-6, 6), k = U.pick([2, 3, -1, -2]), c = U.int(-5, 5), inside = U.pick([true, false]);
    const g = inside ? `f(${k}x)${c ? ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}` : ''}` : `${k}f(x)${c ? ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}` : ''}`;
    const ans = inside ? lin(m * k, b + c) : lin(k * m, k * b + c), src = inside ? `${m}*(${k}*x) + ${b} + ${c}` : `${k}*(${m}*x + ${b}) + ${c}`;
    return tag({ t: 'expr', q: `${T(`f(x) = ${tex(lin(m, b))}`)}. Write ${T(`g(x) = ${g}`)} in slope-intercept form.`, a: ans, pre: 'g(x) =', form: 'expanded', fig: Fig.table([['g', inside ? `replace x with ${k}x` : `multiply all of f by ${k}`]]), meta: { kind: 'algEquiv', args: [src] }, miss: inside ? { [lin(k * m, k * b + c)]: 'Inside f( ), only x changes: the +b is not multiplied.' } : { [lin(k * m, b + c)]: `${k}f(x) multiplies the whole function, the constant too.` }, hint: inside ? `Put ${k}x where x was.` : `Multiply every term of f by ${k}.`, why: `g(x) = ${fx(ans)}` }, 'F.BF.B.3', 238, 'func');
  }

  // ===================== 4. SYSTEMS =====================
  function sysElim() {
    let a1, b1, a2, b2;
    do { a1 = nz(-6, 6); b1 = nz(-6, 6); a2 = nz(-6, 6); b2 = nz(-6, 6); } while (a1 * b2 - a2 * b1 === 0 || Math.abs(a1) === 1 || Math.abs(b2) === 1 || a1 % a2 === 0 || b1 % b2 === 0);
    const x = U.int(-6, 6), y = U.int(-6, 6), c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y, ans = pt(x, y);
    const e = (a, b, c) => `${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}y = ${c}`;
    return tag(mcN(`Solve the system.\n${T(e(a1, b1, c1))}\n${T(e(a2, b2, c2))}`, ans, [...new Set([pt(y, x), pt(-x, y), pt(x, -y), pt(x + 1, y - 1)])].filter((p) => p !== ans).slice(0, 3), { fig: Fig.table([['Step', 'Do'], ['1', `Multiply to match the x-coefficients: × ${Math.abs(a2)} and × ${Math.abs(a1)}`], ['2', 'Subtract to eliminate x'], ['3', 'Solve for y, then x']], 'Elimination with two multipliers'), meta: { kind: 'sysSol', args: [a1, b1, c1, a2, b2, c2] }, steps: [`Multiply the first by ${fx(a2)} and the second by ${fx(a1)}.`, `Subtract: ${fx(a2 * b1 - a1 * b2)}y = ${fx(a2 * c1 - a1 * c2)}, so y = ${fx(y)}.`, `Back-substitute: x = ${fx(x)}.`], hint: 'Neither variable lines up: multiply both equations.', why: `x = ${fx(x)}, y = ${fx(y)}` }), 'A.REI.C.5 · A.REI.C.6', 240, 'eei');
  }
  function sysNoSolK() {
    const b1 = U.pick([1, 2, 3]), r = U.pick([2, 3, -2]), a1 = nz(-5, 5), c1 = nz(-9, 9), b2 = b1 * r, c2 = c1 * r + nz(-4, 4), k = a1 * r, inf = U.pick([false, false, true]);
    return tag(U.num(`For what value of k does the system have ${inf ? 'infinitely many solutions' : 'no solution'}?\n${T(`${a1}x ${b1 < 0 ? '-' : '+'} ${Math.abs(b1)}y = ${c1}`)}\n${T(`kx ${b2 < 0 ? '-' : '+'} ${Math.abs(b2)}y = ${inf ? c1 * r : c2}`)}`, String(k), { keys: 'neg', pre: 'k =', fig: Fig.table([['Lines', 'Solutions'], ['Same slope, different intercepts', 'none'], ['Same line', 'infinitely many']]), meta: { kind: 'sysK', args: [a1, b1, b2] }, steps: [`The second equation's y-coefficient is ${r} times the first's.`, `For the same slope, k must also be ${r} × ${fx(a1)} = ${fx(k)}.`, inf ? `Then the constants also match (${c1 * r} = ${r} × ${c1}): the same line.` : `The constants don't match (${c2} ≠ ${r} × ${c1}): parallel lines, no solution.`], hint: 'Parallel lines have proportional x- and y-coefficients.', why: `k = ${fx(k)}` }), 'A.REI.C.6 · A.REI.C.5', 244, 'eei');
  }
  function sys3() {
    const x = U.int(-4, 5), y = U.int(-4, 5), z = U.int(-4, 5), ask = U.pick(['x', 'y', 'z']);
    const rows = [[1, 1, 1], [0, 1, nz(-3, 3)], [0, 0, U.pick([1, 2, 3, -1])]].map(([a, b, c]) => [a, b, c, a * x + b * y + c * z]);
    rows[0] = [1, nz(-2, 2), nz(-2, 2)]; rows[0].push(rows[0][0] * x + rows[0][1] * y + rows[0][2] * z);
    const eq = ([a, b, c, d]) => [a && `${a === 1 ? '' : a === -1 ? '-' : a}x`, b && `${b === 1 ? '' : b === -1 ? '-' : b}y`, c && `${c === 1 ? '' : c === -1 ? '-' : c}z`].filter(Boolean).join(' + ').replace(/\+ -/g, '- ') + ` = ${d}`;
    const v = { x, y, z }[ask];
    return tag(U.num(`Solve the system. What is ${ask}?\n${rows.map((r) => T(eq(r))).join('\n')}`, String(v), { keys: 'neg', pre: `${ask} =`, fig: Fig.table([['Strategy', 'Solve the last equation for z, then work up']], 'Back-substitution'), meta: { kind: 'sys3', args: [rows, ask] }, steps: [`From the last equation: z = ${fx(z)}.`, `Put z into the middle one: y = ${fx(y)}.`, `Put y and z into the first: x = ${fx(x)}.`], hint: 'Start with the equation that has only one variable.', why: `x = ${fx(x)}, y = ${fx(y)}, z = ${fx(z)}` }), 'A.REI.C.6 (Algebra 2 preview)', 246, 'eei');
  }

  // ===================== 5. PIECEWISE =====================
  function absPiece() {
    const a = U.pick([1, 2, 3, 4]), r = U.int(-5, 5), b = -a * r, right = U.pick([true, false]);
    const inside = lin(a, b), ans = right ? fx(lin(a, b)) : fx(lin(-a, -b));
    return tag(U.mc(`Write ${T(`|${tex(inside)}|`)} without absolute value bars for ${T(`x ${right ? '\\ge' : '<'} ${r}`)}.`, ans, [...new Set([fx(lin(-a, -b)), fx(lin(a, b)), fx(lin(a, -b)), fx(lin(-a, b))])].filter((x) => x !== ans).slice(0, 3), { fig: Fig.graph({ fns: [{ kind: 'abs', a, h: r, k: 0 }], range: [-8, 8], step: 2 }), meta: { kind: 'absPiece', args: [a, b, right] }, hint: `Is ${tex(inside)} positive or negative when x ${right ? '≥' : '<'} ${r}?`, why: `For x ${right ? '≥' : '<'} ${r}, ${fx(inside)} is ${right ? 'not negative, so it stays' : 'negative, so take its opposite'}: ${ans}.` }), 'F.IF.C.7b', 238, 'func');
  }
  function pieceSolve() {
    const c = U.int(-2, 2), m1 = nz(-3, 3), b1 = U.int(-4, 4), m2 = nz(-3, 3), b2 = U.int(-4, 4), ps = [[null, c, false, false, m1, b1], [c, null, true, false, m2, b2]], y = U.int(-8, 8);
    const sols = ps.map((p) => { const x = (y - p[5]) / p[4]; return (p[0] == null || x >= p[0]) && (p[1] == null || x < p[1]) ? x : null; }).filter((x) => x != null);
    if (sols.length !== 1 || !Number.isInteger(sols[0])) return pieceSolve();
    const x = sols[0], bad = ps.map((p) => (y - p[5]) / p[4]).find((v) => v !== x);
    const mn = (t) => String(t).replace(/-/g, '−'), tx2 = `f(x) = ${mn(lin(m1, b1))}  if  x < ${mn(c)}\nand f(x) = ${mn(lin(m2, b2))}  if  x ≥ ${mn(c)}`;
    return tag(U.num(`${tx2}\nSolve ${T(`f(x) = ${y}`)}.`, String(x), { keys: 'neg', pre: 'x =', fig: Fig.graph({ fns: [{ kind: 'lin', m: m1, b: b1, dom: [-99, c] }, { kind: 'lin', m: m2, b: b2, dom: [c, 99] }, { kind: 'lin', m: 0, b: y }], range: [-10, 10], step: 2 }), meta: { kind: 'pieceSolve', args: [ps, y] }, miss: Number.isInteger(bad) ? { [String(bad)]: `${bad} solves its piece's equation but is outside that piece's domain: reject it.` } : {}, steps: [`Piece 1: ${fx(lin(m1, b1))} = ${y} gives x = ${fx(+((y - b1) / m1).toFixed(2))}; keep it only if x < ${c}.`, `Piece 2: ${fx(lin(m2, b2))} = ${y} gives x = ${fx(+((y - b2) / m2).toFixed(2))}; keep it only if x ≥ ${c}.`], hint: 'Solve in each piece, then check the domain of that piece.', why: `x = ${fx(x)}` }), 'F.IF.C.7b · A.REI.D.11', 244, 'func');
  }
  function absCount() {
    const a = U.pick([1, 2, -1, -2, 3]), h = U.int(-4, 4), k = U.int(-5, 5), c = U.int(-6, 6), t = (c - k) / a, ans = t > 0 ? '2' : t === 0 ? '1' : '0';
    return tag(U.mcFixed(`How many solutions does ${T(`${a === 1 ? '' : a === -1 ? '-' : a}|x ${h > 0 ? '-' : '+'} ${Math.abs(h)}| ${k < 0 ? '-' : '+'} ${Math.abs(k)} = ${c}`)} have?`, ans, ['0', '1', '2'], { fig: Fig.graph({ fns: [{ kind: 'abs', a, h, k }, { kind: 'lin', m: 0, b: c }], range: [-8, 8], step: 2 }), meta: { kind: 'absCount', args: [a, k, c] }, steps: [`Isolate: |…| = (${c} − ${par(k)}) ÷ ${par(a)} = ${fx(+t.toFixed(2))}.`, t > 0 ? 'A positive number: two solutions.' : t === 0 ? 'Zero: one solution.' : 'Negative: no solution.'], hint: 'Get the absolute value alone, then look at the sign.', why: `${ans} solution${ans === '1' ? '' : 's'}` }), 'A.REI.D.11 · F.IF.C.7b', 236, 'func');
  }

  // ===================== 6. EXPONENTS & EXPONENTIALS =====================
  const BASES = [[4, 2, 2], [8, 2, 3], [16, 2, 4], [9, 3, 2], [27, 3, 3], [25, 5, 2], [32, 2, 5], [64, 2, 6], [81, 3, 4], [125, 5, 3]];
  function ratPow() {
    const [b, r, n] = U.pick(BASES), q = U.pick([...[2, 3, 4, 5, 6].filter((d) => n % d === 0)]), p = U.pick([1, 2, 3, -1, -2]) * 1, root = r ** (n / q), v = p > 0 ? String(root ** p) : `1/${root ** -p}`;
    if (q === 1 || root ** Math.abs(p) > 2000) return ratPow();
    return tag(U.num(`Evaluate ${T(`${b}^{${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}}`)}.`, v, { keys: kp(v), fig: Fig.table([['Rule', `b^(p/q) = (q-th root of b)^p`], ['Negative', 'b^(−n) = 1 ÷ bⁿ']]), meta: { kind: 'ratPow', args: [b, p, q] }, miss: { [String(b * p / q)]: `An exponent is not multiplying: take the ${q === 2 ? 'square' : q === 3 ? 'cube' : `${q}th`} root first.`, ...(p < 0 ? { [String(root ** -p)]: 'A negative exponent means the reciprocal.' } : {}) }, steps: [`${q === 2 ? 'Square' : q === 3 ? 'Cube' : `${q}th`} root of ${b}: ${root}.`, p < 0 ? `${root}^${-p} = ${root ** -p}, then the reciprocal: ${v}.` : `${root}^${p} = ${v}.`], hint: 'Root first (the denominator), then the power (the numerator).', why: `${b}^(${p}/${q}) = ${v}` }), 'N.RN.A.1 · N.RN.A.2', 238, 'real');
  }
  function expEq() {
    const B = U.pick([2, 3]), pw = B === 2 ? [1, 2, 3, 4, 5] : [1, 2, 3, 4], p = U.pick(pw), q = U.pick(pw.filter((v) => v !== p)), a1 = nz(-2, 3), c1 = U.int(-3, 3), a2 = nz(-2, 3), c2 = U.int(-3, 3);
    const den = p * a1 - q * a2;
    if (!den) return expEq();
    const x = frac(q * c2 - p * c1, den), b1 = B ** p, b2 = B ** q, e = (a, c) => Alg.tex(lin(a, c));
    return tag(U.num(`Solve.\n${T(`${b1}^{${e(a1, c1)}} = ${b2}^{${e(a2, c2)}}`)}`, x, { keys: kp(x), pre: 'x =', fig: Fig.table([['Rewrite', `${b1} = ${B}^${p}`, `${b2} = ${B}^${q}`]], 'Use a common base'), meta: { kind: 'expEq', args: [B, p, a1, c1, q, a2, c2] }, steps: [`${b1} = ${B}^${p} and ${b2} = ${B}^${q}.`, `${p}(${fx(lin(a1, c1))}) = ${q}(${fx(lin(a2, c2))}).`, `${fx(p * a1)}x ${signed(p * c1)} = ${fx(q * a2)}x ${signed(q * c2)} → x = ${fx(x)}.`], hint: 'Write both sides as powers of the same base, then set the exponents equal.', why: `x = ${fx(x)}` }), 'A.REI.B.3 · F.LE.A.4', 242, 'func');
  }
  function halfLife() {
    const h = U.pick([2, 3, 5, 8, 10, 12]), n = U.int(1, 5), A0 = U.pick([64, 96, 128, 160, 192, 320, 512, 800, 960]) , t = n * h, v = A0 / 2 ** n;
    if (!Number.isInteger(v)) return halfLife();
    return tag(U.num(`A substance has a half-life of ${h} years. A sample starts with ${A0} grams. How many grams are left after ${t} years?`, String(v), { unit: 'grams', fig: Fig.table([['Years', ...[0, 1, 2, 3].map((i) => String(i * h))], ['Grams', ...[0, 1, 2, 3].map((i) => String(+(A0 / 2 ** i).toFixed(2)))]]), meta: { kind: 'halfLife', args: [A0, h, t] }, miss: { [String(A0 - n * (A0 / 2))]: 'Half-life halves what is LEFT each time, not the starting amount.', [String(A0 / (2 * n))]: `It is halved ${n} times: divide by 2^${n}.` }, steps: [`${t} years is ${t} ÷ ${h} = ${n} half-lives.`, `${A0} × (1/2)^${n} = ${v}.`], hint: 'A = A₀ (1/2)^(t / h)', why: `${A0} ÷ ${2 ** n} = ${v} grams` }), 'F.LE.A.2 · F.LE.B.5', 240, 'func');
  }
  function growthPct() {
    const pct = U.pick([3, 4, 5, 6, 8, 12, 15, 20, 25]), up = U.pick([true, false]), A = U.pick([200, 500, 1200, 3000]), b = +(up ? 1 + pct / 100 : 1 - pct / 100).toFixed(2);
    return tag(U.num(`A model is ${T(`f(t) = ${A}(${b})^t`)}. By what percent does the amount ${up ? 'grow' : 'decay'} each year?`, String(pct), { unit: '%', fig: Fig.table([['b', 'meaning'], ['b > 1', 'growth of (b − 1) × 100%'], ['b < 1', 'decay of (1 − b) × 100%']]), meta: { kind: 'growthPct', args: [b] }, miss: { [String(Math.round(b * 100))]: up ? 'The 1 in the base keeps what you had; only the extra part is growth.' : 'The base is what is LEFT each year. Decay is the part lost.' }, hint: up ? 'Growth rate = b − 1.' : 'Decay rate = 1 − b.', why: `${up ? `${b} − 1` : `1 − ${b}`} = ${pct / 100} = ${pct}%` }), 'F.LE.B.5', 234, 'func');
  }

  // ===================== 7. POLYNOMIALS =====================
  function groupFactor() {
    const a = nz(-6, 6), b = U.pick([1, 2, 3, 5, 6, 7, -2, -3]), e = Alg.pstr([a * b, b, a, 1]), ans = `(x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)})(x ${a < 0 ? '-' : '+'} ${Math.abs(a)})`;
    return tag({ t: 'expr', q: `Factor by grouping.\n${tx(e)}`, a: ans, form: 'factored', fig: Fig.table([['Group', 'Common factor'], [`x³ ${signed(a)}x²`, 'x²'], [`${fx(b)}x ${signed(a * b)}`, fx(b)]], 'Group in pairs'), meta: { kind: 'algEquiv', args: [e] }, steps: [`Group: (x³ ${signed(a)}x²) + (${fx(b)}x ${signed(a * b)}).`, `Factor each: x²(x ${signed(a)}) + ${par(b)}(x ${signed(a)}).`, `Common binomial: (x² ${signed(b)})(x ${signed(a)}).`], hint: 'Factor the first two terms and the last two terms separately.', why: `${fx(e)} = ${fx(ans).replace('^2', '²')}` }, 'A.SSE.A.2', 240, 'eei');
  }
  function factorFull() {
    const g = U.pick([2, 3, 4, 5, -2, -3]), kind = U.pick(['tri', 'dos', 'xdos']), r = nz(-6, 6), s = U.intWhere(-6, 6, (v) => v !== 0 && v !== -r);
    let poly, ans;
    if (kind === 'tri') { poly = Alg.pmul([-r, 1], [-s, 1]).map((c) => c * g); ans = `${g}(x ${r > 0 ? '-' : '+'} ${Math.abs(r)})(x ${s > 0 ? '-' : '+'} ${Math.abs(s)})`; }
    else if (kind === 'dos') { const k = Math.abs(r); poly = [-k * k * g, 0, g]; ans = `${g}(x + ${k})(x - ${k})`; }
    else { const k = Math.abs(r); poly = [0, -k * k * g, 0, g]; ans = `${g}x(x + ${k})(x - ${k})`; }
    const e = Alg.pstr(poly);
    return tag({ t: 'expr', q: `Factor completely.\n${tx(e)}`, a: ans, form: 'factored', gcf: Math.abs(g), fig: Fig.table([['Step', 'Look for'], ['1', 'A common factor (the GCF)'], ['2', 'A trinomial or a difference of squares']], 'Factor completely'), meta: { kind: 'algEquiv', args: [e] }, hint: `Take out ${fx(g)}${kind === 'xdos' ? 'x' : ''} first.`, why: `${fx(e)} = ${fx(ans)}` }, 'A.SSE.A.2', 242, 'eei');
  }
  function cubes() {
    const a = U.int(1, 5), plus = U.pick([true, false]), e = Alg.pstr([plus ? a ** 3 : -(a ** 3), 0, 0, 1]), ans = plus ? `(x + ${a})(x^2 - ${a}x + ${a * a})` : `(x - ${a})(x^2 + ${a}x + ${a * a})`;
    return tag({ t: 'expr', q: `Factor.\n${tx(e)}`, a: ans.replace(/ 1x/g, ' x'), form: 'factored', fig: Fig.table([['Pattern', 'Factors'], ['a³ + b³', '(a + b)(a² − ab + b²)'], ['a³ − b³', '(a − b)(a² + ab + b²)']], 'Sum and difference of cubes'), meta: { kind: 'algEquiv', args: [e] }, miss: { [plus ? `(x + ${a})^3` : `(x - ${a})^3`]: `(x ${plus ? '+' : '−'} ${a})³ has middle terms; ${fx(e)} does not. Use the cubes pattern.` }, hint: `${a ** 3} = ${a}³. Use the ${plus ? 'sum' : 'difference'} of cubes pattern.`, why: `${fx(e)} = ${fx(ans)}` }, 'A.SSE.A.2 (Algebra 2 preview)', 246, 'eei');
  }
  function triTimesBin() {
    const a = nz(-5, 5), b = nz(-6, 6), c = nz(-5, 5), e = `(x^2 ${a < 0 ? '-' : '+'} ${Math.abs(a)}x ${b < 0 ? '-' : '+'} ${Math.abs(b)})(x ${c < 0 ? '-' : '+'} ${Math.abs(c)})`;
    const ans = Alg.pstr(Alg.pmul([b, a, 1], [c, 1]));
    return tag({ t: 'expr', q: `Multiply and simplify.\n${tx(e)}`, a: ans, form: 'expanded', fig: Fig.table([['×', 'x²', fx(a) + 'x', fx(b)], ['x', 'x³', fx(a) + 'x²', fx(b) + 'x'], [fx(c), fx(c) + 'x²', fx(a * c) + 'x', fx(b * c)]], 'Every term times every term'), meta: { kind: 'algEquiv', args: [e] }, hint: 'Multiply each term of the trinomial by x, then by ' + fx(c) + '. Combine like terms.', why: `${fx(ans)}` }, 'A.APR.A.1', 236, 'eei');
  }

  // ===================== 8. QUADRATIC FUNCTIONS =====================
  function toVertex() {
    const h = nz(-5, 5), k = U.int(-9, 9), e = Alg.pstr([h * h + k, -2 * h, 1]), vf = (H, K) => `y = (x ${H > 0 ? '-' : '+'} ${Math.abs(H)})^2 ${K < 0 ? '-' : '+'} ${Math.abs(K)}`;
    const ans = vf(h, k);
    return tag(mcN(`Write ${T(`y = ${tex(e)}`)} in vertex form.`, ans, [...new Set([vf(-h, k), vf(h, h * h + k), vf(h, k - h * h), vf(h, -k)])].filter((x) => x !== ans).slice(0, 3), { fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h, k }], range: { x: [-10, 10], y: [-12, 12] }, step: 2 }), meta: { kind: 'algEquivY', args: [e] }, steps: [`Half of ${fx(-2 * h)} is ${fx(-h)}; its square is ${h * h}.`, `y = (x² ${signed(-2 * h)}x + ${h * h}) ${signed(h * h + k)} − ${h * h}.`, `y = (x ${signed(-h)})² ${signed(k)}.`], hint: 'Complete the square: add and subtract (b/2)².', why: ans.replace('^2', '²') }), 'A.SSE.B.3b · F.IF.C.8a', 240, 'func');
  }
  function fromVertex() {
    const h = U.int(-4, 4), k = U.int(-6, 6), a = nz(-3, 3), x1 = h + U.pick([1, 2, -1, -2]), y1 = a * (x1 - h) ** 2 + k;
    const ans = `${a === 1 ? '' : a === -1 ? '-' : a}(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k < 0 ? '-' : '+'} ${Math.abs(k)}`.replace('(x + 0)', 'x').replace('(x - 0)', 'x');
    return tag({ t: 'expr', q: `A parabola has vertex ${pt(h, k)} and passes through ${pt(x1, y1)}. Write its equation.`, a: ans, pre: 'y =', fig: Fig.graph({ pts: [[h, k, 'V'], [x1, y1, 'P']], range: { x: [-8, 8], y: [-20, 20] }, step: 2 }), meta: { kind: 'quadThru', args: [h, k, x1, y1] }, steps: [`Start: y = a(x ${signed(-h)})² ${signed(k)}.`, `Put in ${pt(x1, y1)}: ${fx(y1)} = a(${fx(x1 - h)})² ${signed(k)} = ${(x1 - h) ** 2}a ${signed(k)}.`, `a = ${fx(a)}.`], hint: 'Use y = a(x − h)² + k, then find a from the other point.', why: `y = ${fx(ans).replace('^2', '²')}` }, 'F.IF.C.8a · A.CED.A.2', 244, 'func');
  }
  function maxArea() {
    if (U.pick([true, false])) {
      const P = 4 * U.int(10, 60), ans = (P * P) / 8;
      return tag(U.num(`A farmer has ${P} meters of fence to make a rectangular pen along a straight river (no fence on the river side). What is the largest area the pen can have?`, String(ans), { unit: 'm²', fig: Fig.table([['Side', 'Length'], ['two ends', 'x each'], ['long side', `${P} − 2x`], ['area', `x(${P} − 2x)`]]), meta: { kind: 'fenceMax', args: [P] }, miss: { [String((P / 4) ** 2)]: 'The pen has only 3 fenced sides, so it is not a square.' }, steps: [`A(x) = x(${P} − 2x) = −2x² + ${P}x.`, `Vertex: x = ${P} ÷ 4 = ${P / 4}.`, `A = ${P / 4} × ${P / 2} = ${ans}.`], hint: 'Write area as a function of one side, then find the vertex.', why: `${ans} m²` }), 'F.IF.B.4 · A.CED.A.2', 246, 'func');
    }
    const k = U.pick([2, 4, 5, 10]), p0 = U.int(4, 20), Q0 = 2 * k * p0;
    return tag(U.num(`A store sells ${T(`${Q0} - ${k}p`)} T-shirts a week when the price is p dollars. What price gives the most revenue (price × number sold)?`, String(p0), { pre: '$', fig: Fig.table([['Revenue', `R(p) = p(${Q0} − ${k}p)`]]), meta: { kind: 'revPrice', args: [Q0, k] }, miss: { [String(Q0 / k)]: 'At that price nobody buys: revenue is 0. The best price is halfway.' }, steps: [`R(p) = −${k}p² + ${Q0}p.`, `Vertex: p = ${Q0} ÷ (2 × ${k}) = ${p0}.`], hint: 'Revenue is a quadratic in p; its vertex is the best price.', why: `$${p0}` }), 'F.IF.B.4 · A.CED.A.2', 246, 'func');
  }

  // ===================== 9. SOLVING QUADRATICS =====================
  function completeA() {
    const a = U.pick([2, 3, -2]), r = nz(-6, 6), s = U.intWhere(-6, 6, (v) => v !== r && v !== 0), poly = Alg.pmul([-r, 1], [-s, 1]).map((c) => c * a), e = Alg.pstr(poly);
    const [lo, hi] = [r, s].sort((x, y) => x - y), ans = `x = ${lo} and x = ${hi}`;
    return tag(mcN(`Solve by completing the square.\n${T(`${tex(e)} = 0`)}`, ans, [`x = ${-hi} and x = ${-lo}`, `x = ${lo * a} and x = ${hi * a}`, `x = ${lo} only`].filter((x) => x !== ans), { fig: Fig.table([['Step', 'Do'], ['1', `Divide every term by ${a}`], ['2', 'Move the constant'], ['3', 'Add (b/2)² to both sides'], ['4', 'Square root (±) and solve']]), meta: { kind: 'roots', args: [e] }, steps: [`Divide by ${a}: x² ${signed(-(r + s))}x ${signed(r * s)} = 0.`, `x² ${signed(-(r + s))}x + ${((r + s) / 2) ** 2} = ${((r + s) / 2) ** 2 - r * s}.`, `(x ${signed(-(r + s) / 2)})² = ${((r - s) / 2) ** 2} → x ${signed(-(r + s) / 2)} = ±${Math.abs(r - s) / 2}.`], hint: 'Make the leading coefficient 1 first.', why: ans }), 'A.REI.B.4a · A.SSE.B.3b', 242, 'eei');
  }
  function oneSolB() {
    const a = U.pick([1, 4, 9, 1, 4]), c = U.pick([1, 4, 9, 16, 25, 36]), k = 2 * Math.sqrt(a * c);
    return tag(U.num(`For what positive value of b does ${T(`${a === 1 ? '' : a}x^2 + bx + ${c} = 0`)} have exactly one solution?`, String(k), { pre: 'b =', fig: Fig.table([['b² − 4ac', 'Solutions'], ['> 0', '2'], ['= 0', '1'], ['< 0', '0']]), meta: { kind: 'oneSolB', args: [a, c] }, miss: { [String(k * k)]: `That is b². Take the square root: b² = ${k * k}.` }, steps: [`One solution: b² − 4(${a})(${c}) = 0.`, `b² = ${4 * a * c}, so b = ${k}.`], hint: 'Set the discriminant equal to 0.', why: `b = ${k}` }), 'A.REI.B.4b', 244, 'eei');
  }
  function rootsSumProd() {
    const a = U.pick([1, 2, 3, 4, 5]), b = nz(-12, 12), c = nz(-12, 12), sum = U.pick([true, false]), v = sum ? frac(-b, a) : frac(c, a);
    return tag(U.num(`Without solving, find the ${sum ? 'sum' : 'product'} of the solutions of ${T(`${a === 1 ? '' : a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0`)}.`, v, { keys: kp(v), fig: Fig.table([['For ax² + bx + c = 0', ''], ['sum of roots', '−b ÷ a'], ['product of roots', 'c ÷ a']]), meta: { kind: sum ? 'rootSum' : 'rootProd', args: sum ? [a, b] : [a, c] }, miss: sum ? { [frac(b, a)]: 'The sum is −b ÷ a: watch the sign.' } : {}, hint: sum ? 'Sum = −b ÷ a.' : 'Product = c ÷ a.', why: `${sum ? `−(${fx(b)}) ÷ ${a}` : `${fx(c)} ÷ ${a}`} = ${fx(v)}` }), 'A.SSE.A.1 · A.APR.B.3', 240, 'eei');
  }
  function buildQuad() {
    const r = nz(-7, 7), s = U.intWhere(-7, 7, (v) => v !== r && v !== 0), ans = Alg.pstr(Alg.pmul([-r, 1], [-s, 1]));
    return tag({ t: 'expr', q: `Write a quadratic of the form ${T('x^2 + bx + c')} whose zeros are ${fx(r)} and ${fx(s)}.`, a: ans, form: 'expanded', fig: Fig.graph({ pts: [[r, 0, fx(r)], [s, 0, fx(s)]], range: [-8, 8], step: 2 }), meta: { kind: 'hasRoots', args: [r, s] }, miss: { [Alg.pstr(Alg.pmul([r, 1], [s, 1]))]: `A zero at ${fx(r)} comes from the factor (x − ${par(r)}).` }, steps: [`Factors: (x ${signed(-r)})(x ${signed(-s)}).`, `Multiply: ${fx(ans)}.`], hint: 'A zero at r means a factor (x − r).', why: fx(ans) }, 'A.APR.B.3 · A.SSE.A.2', 238, 'eei');
  }

  // ===================== 10. WORKING WITH FUNCTIONS =====================
  function composeExpr() {
    const m = nz(-4, 4), b = U.int(-6, 6), useQ = U.pick([true, false]), g = useQ ? Alg.pstr([U.int(-4, 4), 0, 1]) : lin(nz(-3, 3), U.int(-5, 5)), f = lin(m, b), order = U.pick(['fg', 'gf']);
    const src = order === 'fg' ? f.replace(/x/g, `(${g})`) : g.replace(/x/g, `(${f})`), ans = Alg.pstr(polyOf(src));
    return tag({ t: 'expr', q: `${T(`f(x) = ${tex(f)}`)} and ${T(`g(x) = ${tex(g)}`)}. Find ${T(order === 'fg' ? 'f(g(x))' : 'g(f(x))')} and simplify.`, a: ans, form: 'expanded', fig: Fig.table([['Composition', 'Put the inside function in for x']]), meta: { kind: 'algEquiv', args: [src] }, miss: { [Alg.pstr(polyOf(order === 'fg' ? g.replace(/x/g, `(${f})`) : f.replace(/x/g, `(${g})`)))]: `That is ${order === 'fg' ? 'g(f(x))' : 'f(g(x))'}. Order matters.` }, hint: `Replace every x in ${order === 'fg' ? 'f' : 'g'} with (${order === 'fg' ? fx(g) : fx(f)}).`, why: fx(ans) }, 'F.BF.A.1c', 242, 'func');
  }
  // coefficients [c0, c1, c2, …] of a polynomial expression in x (degree ≤ 4), read by evaluating it
  function polyOf(src) {
    const t = Alg.parse(src), ys = [0, 1, 2, 3, 4].map((x) => Alg.evalAt(t, { x })), c = [];
    // Newton forward differences → power basis (small integer polynomials only)
    let d = ys.slice(); const n = 5, cols = [d[0]];
    for (let k = 1; k < n; k++) { d = d.slice(1).map((v, i) => v - d[i]); cols.push(d[0]); }
    const out = [0, 0, 0, 0, 0];
    let basis = [1]; // ∏_{i<k}(x − i)
    cols.forEach((a, k) => { const f = [1, 1, 2, 6, 24][k]; basis.forEach((v, i) => { out[i] += (a / f) * v; }); basis = Alg.pmul(basis, [-k, 1]); });
    while (out.length > 1 && Math.abs(out[out.length - 1]) < 1e-9) out.pop();
    return out.map((v) => Math.round(v * 1e6) / 1e6).concat(c);
  }
  function parityFn() {
    const kind = U.pick(['even', 'odd', 'neither']), co = [0, 0, 0, 0, 0];
    if (kind === 'even') { co[4] = nz(-2, 2); co[2] = U.int(-4, 4); co[0] = U.int(-5, 5); }
    else if (kind === 'odd') { co[3] = nz(-2, 2); co[1] = nz(-5, 5); }
    else { co[2] = nz(-3, 3); co[1] = nz(-4, 4); co[0] = U.int(-3, 3); if (U.pick([true, false])) co[3] = nz(-2, 2); }
    const e = Alg.pstr(co);
    return tag(U.mcFixed(`Is ${T(`f(x) = ${tex(e)}`)} even, odd, or neither?`, kind, ['even', 'odd', 'neither'], { fig: Fig.graph({ fns: [{ kind: 'fn', f: (x) => co.reduce((t, c, i) => t + c * x ** i, 0) }], range: { x: [-4, 4], y: [-12, 12] }, step: 2 }), meta: { kind: 'parityFn', args: [co] }, steps: ['Find f(−x): replace x with −x.', kind === 'even' ? 'f(−x) = f(x): even (symmetric about the y-axis).' : kind === 'odd' ? 'f(−x) = −f(x): odd (symmetric about the origin).' : 'f(−x) is neither f(x) nor −f(x): neither.'], hint: 'Only even powers (and constants): even. Only odd powers: odd.', why: kind }), 'F.BF.B.3', 240, 'func');
  }
  function avgRateQ() {
    const a = nz(-3, 3), b = U.int(-5, 5), c = U.int(-6, 6), e = Alg.pstr([c, b, a]), x1 = U.int(-4, 2), x2 = x1 + U.int(1, 5);
    const t = Alg.parse(e), v = frac(Alg.evalAt(t, { x: x2 }) - Alg.evalAt(t, { x: x1 }), x2 - x1);
    return tag(U.num(`What is the average rate of change of ${T(`f(x) = ${tex(e)}`)} from ${T(`x = ${x1}`)} to ${T(`x = ${x2}`)}?`, v, { keys: kp(v), fig: Fig.table([['x', String(x1), String(x2)], ['f(x)', fx(Alg.evalAt(t, { x: x1 })), fx(Alg.evalAt(t, { x: x2 }))]]), meta: { kind: 'avgRate', args: [e, x1, x2] }, hint: '(f(b) − f(a)) ÷ (b − a)', why: `(${fx(Alg.evalAt(t, { x: x2 }))} − ${par(Alg.evalAt(t, { x: x1 }))}) ÷ ${x2 - x1} = ${fx(v)}` }), 'F.IF.B.6', 238, 'func');
  }

  // ===================== 11. STATISTICS =====================
  function zScore() {
    const m = U.int(40, 90), s = U.pick([2, 4, 5, 6, 8, 10]), z = U.pick([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5]), x = m + z * s;
    if (!Number.isInteger(x)) return zScore();
    return tag(U.num(`Test scores have mean ${m} and standard deviation ${s}. What is the z-score of a score of ${x}?`, String(z), { keys: kp(z), fig: Fig.numLine(-3, 3, 2, { labels: [-3, -2, -1, 0, 1, 2, 3], marks: [{ v: z, label: String(x) }] }), meta: { kind: 'zScore', args: [x, m, s] }, miss: { [String(x - m)]: `That is how far from the mean in points. Divide by the standard deviation, ${s}.` }, hint: 'z = (x − mean) ÷ standard deviation', why: `(${x} − ${m}) ÷ ${s} = ${fx(z)}` }), 'S.ID.A.4', 236, 'func');
  }
  function transStat() {
    const m = U.int(20, 60), s = U.int(2, 9), a = U.pick([2, 3, 1, 1]), b = U.pick([5, 10, -4, 3, 0]), which = U.pick(['mean', 'standard deviation']);
    if (a === 1 && b === 0) return transStat();
    const v = which === 'mean' ? a * m + b : a * s, how = `${a !== 1 ? `multiplied by ${a}` : ''}${a !== 1 && b ? ', then ' : ''}${b ? `${b > 0 ? 'increased' : 'decreased'} by ${Math.abs(b)}` : ''}`;
    return tag(U.num(`A data set has mean ${m} and standard deviation ${s}. Every value is ${how}. What is the new ${which}?`, String(v), { fig: Fig.table([['Change', 'Mean', 'Standard deviation'], ['add b', '+ b', 'same'], ['multiply by a', '× a', '× a']]), meta: { kind: 'transStat', args: [m, s, a, b, which] }, miss: which === 'standard deviation' && b ? { [String(a * s + b)]: 'Adding the same amount to every value shifts the data but does not spread it out.' } : {}, hint: 'Adding moves the center only; multiplying changes both center and spread.', why: `${which}: ${v}` }), 'S.ID.A.2', 240, 'func');
  }
  function condProb() {
    const t = [U.int(8, 40), U.int(8, 40), U.int(8, 40), U.int(8, 40)], [A, B] = U.pick([['plays a sport', 'is in band'], ['likes cats', 'likes dogs'], ['walks to school', 'is in grade 9']]), ask = U.pick(['row', 'col']);
    const [a, b, c, d] = t, v = ask === 'row' ? frac(a, a + b) : frac(a, a + c);
    return tag(U.num(ask === 'row' ? `A student ${A}. What is the probability the student also ${B}? (Give a fraction.)` : `A student ${B}. What is the probability the student also ${A}? (Give a fraction.)`, v, { keys: kp(v), fig: Fig.table([['', `${cap(B)}`, `Not`, 'Total'], [cap(A), String(a), String(b), String(a + b)], ['Not', String(c), String(d), String(c + d)], ['Total', String(a + c), String(b + d), String(a + b + c + d)]]), meta: { kind: 'condProb', args: [t, ask] }, miss: { [frac(a, a + b + c + d)]: 'That is out of everyone. "Given" means out of only that row or column.' }, hint: 'Given a group: divide by that group\'s total.', why: `${a} ÷ ${ask === 'row' ? a + b : a + c} = ${fx(v)}` }), 'S.CP.A.4 · S.ID.B.5', 238, 'func');
  }
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  // ===================== THE HONORS SKILLS =====================
  H('honEq', 'equations & inequalities', '🏅', [lv('Fractions and decimals', 'A.REI.B.3', 'Clear the fractions, then solve.', [fracEq, decEq]), lv('Equations with a parameter', 'A.REI.B.3 · A.CED.A.1', 'When is there no solution?', [noSolK, fracEq]), lv('Compound and absolute value inequalities', 'A.REI.B.3', 'All three parts; |ax + b|.', [compound, absIneqA])]);
  H('honLin', 'linear equations', '🏅', [lv('Parallel and perpendicular lines', 'G.GPE.B.5', 'Through a point.', [perpThrough]), lv('Find the missing value', 'G.GPE.B.5 · A.REI.B.3', 'Slopes with an unknown.', [findK, perpThrough]), lv('Distance and midpoint (Geometry preview)', 'G.GPE.B.6 · G.GPE.B.7', 'The coordinate plane.', [distMid])]);
  H('honFn', 'linear functions', '🏅', [lv('Arithmetic sequences', 'F.BF.A.2 · F.LE.A.2', 'Which term? The first term?', [termNum, seqFromTwo]), lv('Inverses', 'F.BF.B.4a', 'Undo in reverse order.', [inverseFrac]), lv('Transforming linear functions', 'F.BF.B.3', 'f(kx) and kf(x).', [transformLin, inverseFrac])]);
  H('honSys', 'systems', '🏅', [lv('Elimination with two multipliers', 'A.REI.C.5 · A.REI.C.6', 'Neither variable lines up.', [sysElim]), lv('Systems with a parameter', 'A.REI.C.6', 'No solution or infinitely many.', [sysNoSolK, sysElim]), lv('Three variables (Algebra 2 preview)', 'A.REI.C.6', 'Back-substitution.', [sys3])]);
  H('honPw', 'piecewise functions', '🏅', [lv('Absolute value as two pieces', 'F.IF.C.7b', 'Positive or negative inside?', [absPiece]), lv('Solve with piecewise functions', 'F.IF.C.7b · A.REI.D.11', 'Check each piece\'s domain.', [pieceSolve, absPiece]), lv('How many solutions?', 'A.REI.D.11', 'A V and a horizontal line.', [absCount, pieceSolve])]);
  H('honExp', 'exponents & exponentials', '🏅', [lv('Rational exponents', 'N.RN.A.1 · N.RN.A.2', 'Roots, powers, reciprocals.', [ratPow]), lv('Exponential equations', 'A.REI.B.3 · F.LE.A.4', 'Use a common base.', [expEq, ratPow]), lv('Growth, decay, and half-life', 'F.LE.A.2 · F.LE.B.5', 'Reading the model.', [halfLife, growthPct])]);
  H('honPoly', 'polynomials & factoring', '🏅', [lv('Multiply and group', 'A.APR.A.1 · A.SSE.A.2', 'Trinomials and grouping.', [triTimesBin, groupFactor]), lv('Factor completely', 'A.SSE.A.2', 'GCF first, then more.', [factorFull, groupFactor]), lv('Sum and difference of cubes (Algebra 2 preview)', 'A.SSE.A.2', 'a³ ± b³.', [cubes, factorFull])]);
  H('honQf', 'quadratic functions', '🏅', [lv('Vertex form', 'A.SSE.B.3b · F.IF.C.8a', 'Complete the square.', [toVertex]), lv('Write the equation', 'F.IF.C.8a · A.CED.A.2', 'From a vertex and a point.', [fromVertex, toVertex]), lv('Optimization', 'F.IF.B.4 · A.CED.A.2', 'Largest area, best price.', [maxArea])]);
  H('honQe', 'solving quadratics', '🏅', [lv('Completing the square when a ≠ 1', 'A.REI.B.4a', 'Divide first.', [completeA]), lv('Discriminant problems', 'A.REI.B.4b', 'Exactly one solution.', [oneSolB, completeA]), lv('Sums, products, and building equations', 'A.APR.B.3 · A.SSE.A.1', 'From roots to equations.', [rootsSumProd, buildQuad])]);
  H('honWf', 'working with functions', '🏅', [lv('Composition', 'F.BF.A.1c', 'f(g(x)) as an expression.', [composeExpr]), lv('Even and odd functions', 'F.BF.B.3', 'Symmetry from the formula.', [parityFn, composeExpr]), lv('Average rate of change', 'F.IF.B.6', 'Curves, not just lines.', [avgRateQ, parityFn])]);
  H('honSt', 'statistics', '🏅', [lv('z-scores', 'S.ID.A.4', 'How many standard deviations away?', [zScore]), lv('Changing the data', 'S.ID.A.2', 'What happens to mean and spread.', [transStat, zScore]), lv('Conditional probability (Geometry preview)', 'S.CP.A.4 · S.ID.B.5', 'Given one group.', [condProb])]);
})();
