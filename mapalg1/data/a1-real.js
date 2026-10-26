// Algebra 1 Quest — Real Numbers: number types and properties, exponents and radicals, units and quantities.
// Standards: NJSLS-Mathematics 2023 (8.NS, 8.EE, N.RN, N.Q, N.CN for the Algebra 2 preview). All original.
(function () {
  const { tag, nz, frac, tx, lv, pickN } = A1;
  const G = 'real';
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);

  // ===================== NUMBER TYPES & PROPERTIES =====================
  const SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100];
  const NONSQ = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17];
  function irrationalMulti() {
    const irr = U.sample([...NONSQ.map((n) => `√${n}`), 'π'], U.int(1, 3));
    const rat = U.sample([...SQUARES.map((n) => `√${n}`), '0.25', '3/4', '−7', '0.333…', '1.5', '12'], 6 - irr.length);
    return tag({ ...U.multi('Choose ALL the irrational numbers.', irr, rat), meta: { kind: 'multiPred', args: ['irrational', 0] }, fig: Fig.numLine(0, 4, 1, { marks: [{ v: Math.SQRT2, label: '√2' }, { v: Math.PI, label: 'π' }] }), hint: 'An irrational number cannot be written as a fraction of integers. Square roots of numbers that are not perfect squares are irrational.', why: `${irr.join(', ')} cannot be written as fractions.` }, '8.NS.A.1', 214, G);
  }
  function classify() {
    const items = [['√49', 'integer'], ['−12', 'integer'], ['3/8', 'rational, not an integer'], ['0.6', 'rational, not an integer'], ['√20', 'irrational'], ['π', 'irrational'], ['0.121212…', 'rational, not an integer'], ['√81', 'integer']];
    const [n, a] = U.pick(items), all = ['integer', 'rational, not an integer', 'irrational', 'not a real number'];
    return tag(U.mcFixed(`Which BEST describes the number ${n}?`, a, all, { fig: Fig.table([['Number', 'Integer?', 'Fraction?', 'Repeats or ends?']], `Classify ${n}`), meta: { kind: 'numClass', args: [n] }, hint: 'Simplify first: √49 = 7. Repeating or ending decimals are rational.', why: `${n} is ${a}.` }), '8.NS.A.1', 212, G);
  }
  const PROPS = [
    ['3 + x = x + 3', 'commutative property of addition'], ['4(x + 2) = 4x + 8', 'distributive property'], ['(2 · x) · 5 = 2 · (x · 5)', 'associative property of multiplication'],
    ['x + 0 = x', 'additive identity property'], ['7 · (1/7) = 1', 'multiplicative inverse property'], ['(a + b) + c = a + (b + c)', 'associative property of addition'],
    ['x · 1 = x', 'multiplicative identity property'], ['5 + (−5) = 0', 'additive inverse property'], ['m · n = n · m', 'commutative property of multiplication'],
  ];
  function property() {
    const [e, a] = U.pick(PROPS), others = U.sample(PROPS.map((p) => p[1]).filter((x) => x !== a), 3);
    return tag(U.mc(`Which property is shown?\n${e}`, a, others, { fig: pic(['🧮'], e), hint: 'Commutative: order changes. Associative: grouping changes. Distributive: multiply into parentheses.', why: `${e} shows the ${a}.` }), 'A.SSE.A.1', 218, G);
  }
  function sumType() {
    const [q, a, w] = U.pick([
      ['The sum of a rational number and an irrational number is…', 'always irrational', ['always rational', 'sometimes rational', 'always an integer']],
      ['The product of two rational numbers is…', 'always rational', ['always irrational', 'sometimes irrational', 'always an integer']],
      ['The product of a nonzero rational number and an irrational number is…', 'always irrational', ['always rational', 'always zero', 'always an integer']],
      ['The sum of two rational numbers is…', 'always rational', ['always irrational', 'sometimes irrational', 'always positive']],
    ]);
    return tag(U.mcFixed(q, a, U.shuffle([a, ...w]), { fig: pic(['➕', '✖️'], 'rational and irrational'), hint: 'Try an example: 2 + √3. Could that ever be a fraction?', why: `${q.replace('…', '')} ${a}.` }), '8.NS.A.1', 224, G);
  }
  // Algebra 2 preview: complex numbers
  function iPower() {
    const n = U.int(2, 23), r = n % 4, a = ['1', 'i', '−1', '−i'][r];
    return tag(U.mcFixed(`Simplify ${T(`i^{${n}}`)}.`, a, ['1', 'i', '−1', '−i'], { fig: Fig.table([['i¹', 'i²', 'i³', 'i⁴'], ['i', '−1', '−i', '1']], 'The powers of i repeat'), meta: { kind: 'iPow', args: [n] }, miss: { [['1', 'i', '−1', '−i'][(r + 1) % 4]]: 'Divide the exponent by 4 and use the remainder.' }, hint: 'The powers of i repeat every 4: i, −1, −i, 1.', why: `${n} ÷ 4 leaves remainder ${r}, so i^${n} = ${a}.` }), 'N.CN.A.1', 240, G);
  }
  function complexAdd() {
    const a = nz(-9, 9), b = nz(-9, 9), c = nz(-9, 9), d = nz(-9, 9), op = U.pick(['+', '−']);
    const re = op === '+' ? a + c : a - c, im = op === '+' ? b + d : b - d;
    // standard form a + bi: 0i and 1i are not written (−10, not −10 + 0i; 8 − i, not 8 − 1i)
    const cx = (x, y) => { const I = Math.abs(y) === 1 ? 'i' : `${Math.abs(y)}i`, X = String(x).replace(/^-/, '−'); return y === 0 ? X : x === 0 ? `${y < 0 ? '−' : ''}${I}` : `${X} ${y < 0 ? '−' : '+'} ${I}`; };
    const ans = cx(re, im);
    const w = [cx(op === '+' ? a - c : a + c, im), cx(re, op === '+' ? b - d : b + d), cx(re + im, 0), cx(im, re)].filter((x) => x !== ans);
    return tag(U.mc(`${T(`(${cx(a, b).replace(/−/g, '-')}) ${op === '+' ? '+' : '-'} (${cx(c, d).replace(/−/g, '-')})`)} = ?`, ans, w, { fig: Fig.table([['', 'Real part', 'Imaginary part'], ['First', a, cx(0, b)], ['Second', c, cx(0, d)]], 'Combine like parts'), meta: { kind: 'complexOp', args: [a, b, op, c, d] }, hint: 'Add or subtract the real parts, then the imaginary parts.', why: `Real: ${re}; imaginary: ${im}i.` }), 'N.CN.A.2', 242, G);
  }

  // ===================== EXPONENTS & RADICALS =====================
  function expRule() {
    const k = U.pick(['product', 'quotient', 'power', 'coef']), m = U.int(2, 7), n = U.int(2, 6);
    let q, a;
    if (k === 'product') { q = `x^${m} * x^${n}`; a = `x^${m + n}`; }
    else if (k === 'quotient') { const big = m + n; q = `x^${big} / x^${n}`; a = `x^${m}`; }
    else if (k === 'power') { q = `(x^${m})^${n}`; a = `x^${m * n}`; }
    else { const c1 = U.int(2, 6), c2 = U.int(2, 6); q = `${c1}x^${m} * ${c2}x^${n}`; a = `${c1 * c2}x^${m + n}`; }
    const miss = k === 'product' ? { [`x^${m * n}`]: 'When you multiply powers with the same base, ADD the exponents.' } : k === 'power' ? { [`x^${m + n}`]: 'A power of a power: MULTIPLY the exponents.' } : k === 'quotient' ? { [`x^${m + n + n}`]: 'When you divide powers with the same base, SUBTRACT the exponents.' } : {};
    return tag({ t: 'expr', q: `Simplify. Write your answer as a single term.\n${tx(q)}`, a, form: 'monomial', miss, fig: Fig.table([['Rule', 'Example'], ['xᵃ · xᵇ', 'xᵃ⁺ᵇ'], ['xᵃ ÷ xᵇ', 'xᵃ⁻ᵇ'], ['(xᵃ)ᵇ', 'xᵃᵇ']], 'Exponent rules'), meta: { kind: 'algEquiv', args: [q] }, hint: 'Same base: multiply → add exponents; divide → subtract; power of a power → multiply.', why: `${q} = ${a}` }, '8.EE.A.1', [218, 220, 222, 224][['product', 'quotient', 'power', 'coef'].indexOf(k)], G);
  }
  function zeroNeg() {
    const b = U.int(2, 6), e = U.pick([0, -1, -2, -3]), v = e === 0 ? '1' : frac(1, b ** -e);
    return tag(U.num(`Evaluate ${T(`${b}^{${e}}`)}. Type a fraction if needed.`, v, { keys: e < 0 ? 'frac' : '', fig: Fig.table([['Power', ...[2, 1, 0, -1, -2].map((x) => MathText.plain(`${b}^{${x}}`))], ['Value', b * b, b, 1, frac(1, b), frac(1, b * b)]], 'Each step down divides by ' + b), meta: { kind: 'evalAt', args: [`${b}^(${e})`, {}] }, miss: e < 0 ? { [String(-b * -e)]: 'A negative exponent is not a negative number. It means one over the power.', [String(b ** -e)]: 'A negative exponent means one over that power.' } : { '0': 'Any nonzero number to the zero power is 1.' }, hint: 'b⁰ = 1. b⁻ⁿ = 1 / bⁿ.', why: `${b}^${e} = ${v}` }), '8.EE.A.1', e === 0 ? 216 : 222, G);
  }
  function ratExp() {
    const [base, num, den] = U.pick([[8, 2, 3], [27, 2, 3], [16, 3, 4], [4, 3, 2], [9, 3, 2], [32, 2, 5], [64, 1, 3], [25, 1, 2], [81, 3, 4], [125, 2, 3]]);
    const v = Math.round(Math.pow(base, num / den));
    return tag(U.num(`Evaluate ${T(`${base}^{\\frac{${num}}{${den}}}`)}.`, String(v), { fig: Fig.table([['Rational exponent', 'Means'], [`b^(m/n)`, `(ⁿ√b)ᵐ`]], 'Root first, then power'), meta: { kind: 'dexpr', args: [`${base} ** (${num} / ${den})`] }, miss: { [String(base * num / den)]: 'The exponent is not a multiplier. Take the root first, then the power.' }, hint: `Find the ${den === 2 ? 'square' : den === 3 ? 'cube' : den + 'th'} root of ${base}, then raise it to the power ${num}.`, why: `The ${den === 2 ? 'square' : den === 3 ? 'cube' : den + 'th'} root of ${base} is ${Math.round(Math.pow(base, 1 / den))}; to the power ${num} that is ${v}.` }), 'N.RN.A.2', 232, G);
  }
  function simplifyRad() {
    const k = U.pick([2, 3, 5, 6, 7, 10]), s = U.pick([2, 3, 4, 5, 6]), n = s * s * k;
    const a = `${s}√${k}`;
    const w = [[`${s * s}√${k}`, 'Take the square root of the perfect square factor.'], [`${k}√${s}`, 'The perfect square comes out of the root; the rest stays inside.'], [`√${n / 2 === Math.round(n / 2) ? n / 2 : n - 1}`, 'Look for the LARGEST perfect square factor.']];
    return tag(U.mc(`Simplify ${T(`\\sqrt{${n}}`)}.`, a, w.map((x) => x[0]), { miss: Object.fromEntries(w), fig: Fig.table([['√' + n, '= √(' + s * s + ' · ' + k + ')', '= ' + a]], 'Find a perfect square factor'), meta: { kind: 'radSimp', args: [n] }, hint: `Find the largest perfect square that divides ${n}.`, why: `${n} = ${s * s} × ${k}, so √${n} = ${s}√${k}.` }), 'N.RN.A.3', 234, G);
  }
  function radVar() { // Algebra 2 preview: radicals with variables / rational exponent form
    const [q, a, w, why] = U.pick([
      ['Which expression is equivalent to x^(1/2)?', '√x', ['x/2', 'x²', '1/(2x)'], 'An exponent of 1/2 means square root.'],
      ['Which expression is equivalent to x^(1/3)?', '∛x', ['x/3', 'x³', '3x'], 'An exponent of 1/3 means cube root.'],
      ['Which expression is equivalent to √(x³)?', 'x^(3/2)', ['x^(2/3)', 'x⁶', '3x/2'], '√(x³) = x^(3/2): the root is the denominator.'],
      ['Simplify √(36x²) for x ≥ 0.', '6x', ['36x', '6x²', '18x'], '√36 = 6 and √(x²) = x when x ≥ 0.'],
      ['Simplify √(50x⁴).', '5x²√2', ['25x²√2', '5x⁴√2', '10x√5'], '50 = 25 · 2 and √(x⁴) = x².'],
    ]);
    return tag(U.mc(q, a, w, { fig: Fig.table([['Root form', 'Exponent form'], ['√x', 'x^(1/2)'], ['∛x', 'x^(1/3)']], 'Roots and rational exponents'), hint: 'Roots are fractional exponents: ⁿ√x = x^(1/n).', why }), 'N.RN.A.2', 242, G);
  }

  // ===================== UNITS & QUANTITIES =====================
  function unitRate() {
    const m = U.int(3, 12) * 10, h = U.int(2, 5), [thing, u1, u2, icon] = U.pick([['A car', 'miles', 'hours', '🚗'], ['A train', 'kilometers', 'hours', '🚆'], ['A printer', 'pages', 'minutes', '🖨️'], ['A faucet', 'gallons', 'minutes', '🚰']]);
    const total = m * h;
    return tag(U.num(`${thing} goes ${total} ${u1} in ${h} ${u2}. What is the unit rate in ${u1} per ${u2.replace(/s$/, '')}?`, String(m), { unit: `${u1}/${u2.replace(/s$/, '')}`, fig: Fig.table([[u2, ...[1, 2, h].map(String)], [u1, m, m * 2, total]], 'Rate table'), meta: { kind: 'expr', args: [`${total} / ${h}`] }, miss: { [String(total * h)]: 'A unit rate divides: amount ÷ time.' }, hint: `Divide ${total} by ${h}.`, why: `${total} ÷ ${h} = ${m} ${u1} per ${u2.replace(/s$/, '')}` }), 'N.Q.A.1', 214, G);
  }
  function convertRate() {
    const [q, expr, ans, unit, why] = U.pick([
      ['A runner goes 6 meters per second. How many meters is that per minute?', '6 * 60', '360', 'm/min', '6 m/s × 60 s/min = 360 m/min'],
      ['A snail moves 3 inches per minute. How many inches per hour?', '3 * 60', '180', 'in/h', '3 × 60 = 180 inches per hour'],
      ['Water flows at 120 gallons per hour. How many gallons per minute?', '120 / 60', '2', 'gal/min', '120 ÷ 60 = 2 gallons per minute'],
      ['A cyclist rides 18 miles per hour. How many miles in 20 minutes?', '18 * 20 / 60', '6', 'miles', '20 minutes is 1/3 hour: 18 × 1/3 = 6 miles'],
      ['A recipe uses 3 cups of flour for 12 muffins. How many cups for 40 muffins?', '3 * 40 / 12', '10', 'cups', '3/12 cup per muffin × 40 = 10 cups'],
      ['A plane flies 540 miles in 1.5 hours. What is its speed in miles per hour?', '540 / 1.5', '360', 'mph', '540 ÷ 1.5 = 360 mph'],
    ]);
    return tag(U.num(q, ans, { unit, keys: 'dec', fig: Fig.table([['Start', '×', 'Conversion factor', '=', 'Result']], 'Multiply by a factor equal to 1'), meta: { kind: 'dexpr', args: [expr] }, hint: 'Write the conversion as a fraction equal to 1 so the units cancel.', why }), 'N.Q.A.1', 222, G);
  }
  function precision() {
    const [q, a, w, why] = U.pick([
      ['A ruler is marked in millimeters. Which measurement of a pencil is reported to an appropriate precision?', '14.2 cm', ['14.2367 cm', '14 m', '0.142 km'], 'A millimeter ruler measures to tenths of a centimeter.'],
      ['A kitchen scale shows whole grams. Which is the most reasonable way to report a bag of flour?', '1,247 g', ['1,247.385 g', '1 kg exactly', '1,247,000 mg'], 'The scale only shows whole grams.'],
      ['Which unit is MOST appropriate for the distance between two cities?', 'kilometers', ['millimeters', 'centimeters', 'grams'], 'City distances are large; kilometers fit.'],
      ['Which unit is MOST appropriate for the rate a plant grows?', 'centimeters per week', ['kilometers per second', 'liters per hour', 'grams per mile'], 'Plants grow a few centimeters over days or weeks.'],
      ['A stopwatch shows hundredths of a second. Which race time is reported with the right precision?', '12.47 s', ['12.4719 s', '12 min', '0.2 h'], 'The stopwatch measures to hundredths.'],
    ]);
    return tag(U.mc(q, a, w, { fig: pic(['📏', '⚖️', '⏱️']), hint: 'Match the precision to the tool, and the unit to the size of the quantity.', why }), 'N.Q.A.3', 228, G);
  }
  function density() { // Geometry preview: density (G.MG.A.2)
    const pop = U.int(12, 90) * 1000, area = U.pick([4, 5, 8, 10, 12, 15, 20, 25]), d = pop / area;
    if (!Number.isInteger(d)) return density();
    return tag(U.num(`A town of ${pop.toLocaleString('en-US')} people covers ${area} square miles. What is its population density in people per square mile?`, String(d), { unit: 'people/mi²', fig: Fig.rect(5, 4, { grid: true }), meta: { kind: 'expr', args: [`${pop} / ${area}`] }, miss: { [String(pop * area)]: 'Density = amount ÷ area.' }, hint: 'Density is people ÷ area.', why: `${pop.toLocaleString('en-US')} ÷ ${area} = ${d.toLocaleString('en-US')} people per square mile` }), 'G.MG.A.2', 236, G);
  }

  A1_SKILLS.push(
    { goal: G, id: 'realnum', name: 'Number types & properties', icon: '🔢', levels: [
      lv('Rational and irrational', '8.NS.A.1', 'Which numbers can be fractions?', [irrationalMulti, classify]),
      lv('Properties of operations', '8.NS.A.1 · A.SSE.A.1', 'Commutative, associative, distributive.', [property, sumType]),
      lv('Complex numbers (Algebra 2 preview)', 'N.CN.A.1 · N.CN.A.2', 'Meet i, where i² = −1.', [iPower, complexAdd]),
    ] },
    { goal: G, id: 'exponents', name: 'Exponents & radicals', icon: '🔺', levels: [
      lv('Exponent rules', '8.EE.A.1', 'Multiply, divide, and raise powers.', [expRule, expRule, zeroNeg]),
      lv('Rational exponents and roots', 'N.RN.A.2 · N.RN.A.3', 'Fractional exponents and simplifying roots.', [ratExp, simplifyRad]),
      lv('Radicals with variables (Algebra 2 preview)', 'N.RN.A.2', 'Roots and exponents with x.', [radVar, ratExp]),
    ] },
    { goal: G, id: 'units', name: 'Units & quantities', icon: '📏', levels: [
      lv('Unit rates', 'N.Q.A.1', 'How much per one?', [unitRate, convertRate]),
      lv('Converting rates', 'N.Q.A.1', 'Let the units guide you.', [convertRate, unitRate, precision]),
      lv('Precision and density (Geometry preview)', 'N.Q.A.3 · G.MG.A.2', 'Reasonable answers and how crowded.', [precision, density]),
    ] },
  );
})();
