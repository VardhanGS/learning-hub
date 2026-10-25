// MAP Math 4 — Algebra (Equations, Expressions, Inequalities & Functions). Original questions; 2023 NJSLS-M codes.
(function () {
  const { tag, kid, cap, c, dec, decTrim, fx, ftyped, missMap, lv } = M4;
  const ITEMS = [['stickers', '⭐'], ['marbles', '🔵'], ['books', '📚'], ['shells', '🐚'], ['cards', '🃏'], ['stamps', '✉️']];

  // ===================== TIMES AS MANY =====================
  function timesEquation() {
    const a = U.int(3, 9), k = U.int(2, 9), p = a * k;
    return tag(M4.mc(`${p} is ${k} times as many as ${a}. Which equation shows this?`, `${p} = ${k} × ${a}`, [[`${p} = ${k} + ${a}`, '"Times as many" means multiply, not add.'], [`${a} = ${k} × ${p}`, `${p} is the bigger amount, so it is ${k} groups of ${a}.`], [`${k} = ${p} × ${a}`, `The number ${k} tells how many times. Multiply it by ${a}.`]], { fig: Fig.timesBars(a, k, String(a), String(p), String(p)), meta: { kind: 'timesEq', args: [p, k, a] }, hint: '"Times as many" is a multiplication: the bigger amount = how many times × the smaller amount.', why: `${p} = ${k} × ${a}` }), '4.OA.A.1', 188, 'algebra');
  }
  function timesStory(kind) {
    const [name] = kid(), [item, icon] = U.pick(ITEMS), a = U.int(3, 12), k = U.int(2, 8), p = a * k;
    if (kind === 'more') {
      // additive vs multiplicative: "k times as many" vs "k more"
      return tag(U.num(`${name} has ${a} ${item}. A friend has ${k} times as many. How many ${item} does the friend have?`, String(p), { fig: Fig.timesBars(a, k, name, 'Friend'), meta: { kind: 'expr', args: [`${a} × ${k}`] }, miss: missMap([[a + k, `${k} times as many means ${k} groups of ${a}, not ${k} more.`]], String(p)), hint: `Draw ${k} bars of ${a}.`, why: `${k} × ${a} = ${p} ${item}` }), '4.OA.A.2', 194, 'algebra');
    }
    return tag(U.num(`${name} has ${p} ${item}. That is ${k} times as many as Sam has. How many ${item} does Sam have?`, String(a), { fig: Fig.timesBars(a === 0 ? '?' : '?', k, 'Sam', name, String(p)), meta: { kind: 'expr', args: [`${p} ÷ ${k}`] }, miss: missMap([[p * k, `${name} has more, so Sam has fewer. Divide by ${k}.`], [p - k, `"${k} times as many" is not "${k} more". Divide.`]], String(a)), hint: `${name}'s amount is ${k} equal parts of Sam's. Divide.`, why: `${p} ÷ ${k} = ${a} ${item}` }), '4.OA.A.2', 202, 'algebra');
  }
  const EXPR_WORDS = [
    ['add {a} and {b}, then multiply by {k}', '{k} × ({a} + {b})', ['{k} × {a} + {b}', '{a} + {b} × {k}', '{k} + {a} × {b}']],
    ['multiply {a} by {k}, then add {b}', '({a} × {k}) + {b}', ['{a} × ({k} + {b})', '{a} + {k} × {b}', '{k} × {a} × {b}']],
    ['subtract {b} from {a}, then multiply by {k}', '{k} × ({a} − {b})', ['{k} × {a} − {b}', '{b} − {a} × {k}', '({b} − {a}) × {k}']],
    ['divide {p} by {k}, then add {b}', '({p} ÷ {k}) + {b}', ['{p} ÷ ({k} + {b})', '{k} ÷ {p} + {b}', '{p} + {b} ÷ {k}']],
  ];
  function exprWords() {
    const i = U.int(0, EXPR_WORDS.length - 1), k = U.int(2, 9), a = U.int(10, 40), b = U.int(2, 9), p = k * U.int(3, 12);
    const fill = (t) => t.replace(/{a}/g, a).replace(/{b}/g, b).replace(/{k}/g, k).replace(/{p}/g, p);
    const [words, right, wrong] = EXPR_WORDS[i];
    if (wrong.some((w) => M4.ev(fill(w)) === M4.ev(fill(right)))) return exprWords(); // a wrong choice must not have the same value
    return tag(M4.mc(`Which expression means "${fill(words)}"?`, fill(right), wrong.map((w) => [fill(w), 'Parentheses show what to do first. Read the words in order.']), { fig: Fig.table([['First', 'Then'], [fill(words).split(', then ')[0], 'then ' + fill(words).split(', then ')[1]]]), meta: { kind: 'exprWords', args: [i, a, b, k, p] }, hint: 'The step that comes first goes inside parentheses.', why: fill(right) }), '5.OA.A.2', 208, 'algebra');
  }
  function timesAsLarge() {
    const k = U.int(2, 9), a = U.int(120, 980), b = U.int(12, 98);
    return tag(M4.mc(`How many times as large is ${k} × (${c(a)} + ${b}) as ${c(a)} + ${b}?`, String(k), [[c(a + b), 'You do not need to add. Compare the two expressions.'], [String(k + 1), `It is ${k} groups of the sum.`], [c(k * (a + b)), 'That is the value of the first expression, not how many times as large.']], { fig: Fig.timesBars(`${c(a)} + ${b}`.length > 9 ? 'sum' : `${c(a)} + ${b}`, k, 'sum', `${k} × sum`, `${k} × sum`), meta: { kind: 'value', args: [k] }, hint: `${k} × (something) is ${k} times as large as that something.`, why: `${k} × (${c(a)} + ${b}) is ${k} groups of ${c(a)} + ${b}.` }), '5.OA.A.2', 210, 'algebra');
  }

  // ===================== MULTI-STEP PROBLEMS =====================
  function twoStep() {
    const [name, he] = kid(), [item, icon] = U.pick(ITEMS), g = U.int(3, 9), n = U.int(6, 25), x = U.int(5, g * n - 5), op = U.pick(['gives', 'gets']);
    const ans = op === 'gives' ? g * n - x : g * n + x;
    return tag(U.num(`${name} has ${g} boxes of ${item} with ${n} in each box. Then ${he} ${op === 'gives' ? `gives away ${x}` : `gets ${x} more`}. How many ${item} does ${name} have now?`, String(ans), { unit: item, fig: Fig.barModel('?', [...Array(Math.min(g, 6))].map(() => n).concat(g > 6 ? ['…'] : []), `${g} boxes of ${n}, then ${op === 'gives' ? '−' : '+'} ${x}`), meta: { kind: 'expr', args: [`${g} × ${n} ${op === 'gives' ? '-' : '+'} ${x}`] }, miss: missMap([[g * n, 'That is only the first step.'], [op === 'gives' ? g * n + x : g * n - x, op === 'gives' ? 'Giving away makes it smaller.' : 'Getting more makes it bigger.'], [g + n, 'Equal boxes means multiply.']], String(ans)), hint: 'Step 1: multiply to find the total. Step 2: add or subtract.', why: `${g} × ${n} = ${g * n}; ${g * n} ${op === 'gives' ? '−' : '+'} ${x} = ${ans}` }), '4.OA.A.3', 194, 'algebra');
  }
  const REM = [
    ['ceil', (t, k) => `${t} students are going on a trip. Each van holds ${k} students. How many vans are needed?`, 'vans', 'Every student needs a seat, so one more van is needed for the students left over.', '🚐'],
    ['floor', (t, k) => `A baker has ${t} muffins. A box holds ${k} muffins. How many boxes can be filled all the way?`, 'boxes', 'Only full boxes count, so the leftover muffins are not a box.', '🧁'],
    ['rem', (t, k) => `${t} cards are shared equally by ${k} friends. How many cards are left over?`, 'cards', 'The question asks what is left over: the remainder.', '🃏'],
    ['ceil', (t, k) => `A ribbon is cut into pieces ${k} inches long. To have ${t} inches in all, how many pieces are needed at least?`, 'pieces', 'A part of a piece still needs a whole piece, so round up.', '🎀'],
  ];
  function remainderStory() {
    const i = U.int(0, REM.length - 1), [mode, text, unit, why, icon] = REM[i], k = U.int(3, 9), q = U.int(4, 15), r = U.int(1, k - 1), t = k * q + r;
    const ans = mode === 'ceil' ? q + 1 : mode === 'floor' ? q : r;
    return tag(U.num(text(t, k), String(ans), { unit, fig: Fig.shareBar(t, Math.min(q, 10), { each: k, r }), meta: { kind: mode === 'ceil' ? 'ceilDiv' : mode === 'floor' ? 'quot' : 'rem', args: [t, k] }, miss: missMap(mode === 'ceil' ? [[q, why]] : mode === 'floor' ? [[q + 1, why]] : [[q, 'That is how many each friend gets. The question asks how many are left over.']], String(ans)), hint: `${t} ÷ ${k} = ${q} R ${r}. What does the question ask for?`, why: `${t} ÷ ${k} = ${q} R ${r}. ${why}` }), '4.OA.A.3', 202, 'algebra');
  }
  function fracDecStory(kind) {
    const [name, he] = kid();
    if (kind === 'frac') {
      const d = U.pick([2, 3, 4, 8]), n = U.int(1, d - 1), b = U.int(3, 9), ans = M4.simp([n * b, d]);
      return tag(U.num(`${name} uses ${fx([n, d])} cup of flour for each batch of pancakes. How many cups does ${he} need for ${b} batches?\nType a mixed number (use the space key) or a fraction.`, ftyped(ans, true), { keys: 'mixed', unit: 'cups', fig: Fig.fracStrips(Array(Math.min(b, 4)).fill([n, d])), meta: { kind: 'fexpr', args: [[b, 1], '×', [n, d]] }, miss: missMap([[`${n}/${d * b}`, 'More batches need MORE flour. Multiply the top by the number of batches.'], [`${n + b}/${d}`, 'Each batch uses the same amount: multiply.']], ftyped(ans, true)), hint: `${b} groups of ${fx([n, d])}.`, why: `${b} × ${fx([n, d])} = ${fx(ans)} = ${fx(ans, true)} cups` }), '4.NF.B.4c', 206, 'algebra');
    }
    const n = U.int(3, 6), price = U.int(115, 495), total = n * price, item = U.pick(['notebooks', 'pens', 'snacks', 'stickers packs'.replace(' packs', '')]);
    return tag(U.num(`${cap(item)} cost $${dec(price, 2)} each. ${name} buys ${n}. How much does ${he} spend?`, decTrim(total, 2), { pre: '$', keys: 'dec', fig: Fig.table([['Item', 'Cost'], ...[...Array(n)].map((_, i) => [`${i + 1}`, `$${dec(price, 2)}`]), ['Total', '?']]), meta: { kind: 'dexpr', args: [`${n} * ${dec(price, 2)}`] }, miss: missMap([[decTrim(total * 10, 2), 'Check the decimal point: money has two places after it.'], [decTrim(n * 100 + price, 2), 'Multiply the price by the number bought.']], decTrim(total, 2)), hint: `Multiply $${dec(price, 2)} by ${n}.`, why: `${n} × $${dec(price, 2)} = $${dec(total, 2)}` }), '5.NBT.B.7', 212, 'algebra');
  }

  // Two-step fraction story with unlike denominators (harder Grade 5).
  function fracStory2() {
    const [name, he] = kid(), [d1, d2] = U.pick([[2, 3], [3, 4], [2, 5], [4, 6], [2, 8], [3, 6]]), n1 = U.int(1, d1 - 1), n2 = U.int(1, d2 - 1);
    const total = [n1 * d2 + n2 * d1, d1 * d2];
    if (total[0] >= total[1]) return fracStory2();
    const left = M4.simp([total[1] - total[0], total[1]]);
    return tag(U.num(`${name} paints ${fx([n1, d1])} of a fence in the morning and ${fx([n2, d2])} of it in the afternoon. What fraction of the fence is still not painted?`, ftyped(left), { keys: 'frac', fig: Fig.fracStrips([[n1, d1], [n2, d2]]), meta: { kind: 'fexpr', args: [[1, 1], '−', M4.simp(total)] }, miss: missMap([[ftyped(M4.simp(total)), 'That is how much IS painted. Subtract it from the whole fence.']], ftyped(left)), hint: 'Add the two parts with a common denominator, then subtract from 1 whole.', why: `${fx([n1, d1])} + ${fx([n2, d2])} = ${fx(M4.simp(total))}; 1 − ${fx(M4.simp(total))} = ${fx(left)}` }), '5.NF.A.2', 222, 'algebra');
  }

  // ===================== FACTORS, MULTIPLES & PRIMES =====================
  const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  function factorHot() {
    const n = U.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48]);
    const fs = [...Array(n).keys()].map((i) => i + 1).filter((i) => n % i === 0 && i > 1 && i < n);
    const not = [...Array(Math.min(n, 15)).keys()].map((i) => i + 2).filter((i) => n % i !== 0);
    const cells = U.shuffle([...U.sample(fs, Math.min(fs.length, U.int(2, 4))), ...U.sample(not, 3)]).sort((a, b) => a - b);
    const a = cells.map((v, i) => (n % v === 0 ? i : -1)).filter((i) => i >= 0);
    const [r, cc] = (() => { const f = fs[Math.floor(fs.length / 2)]; return [Math.min(f, n / f), Math.max(f, n / f)]; })();
    return tag({ t: 'hot', q: `Tap all the factors of ${n}.`, cells: cells.map(String), layout: 'row', multi: true, a, fig: Fig.array(r, cc), meta: { kind: 'hotPred', args: ['factor', n, cells] }, hint: `A factor divides ${n} with nothing left over. The array shows one factor pair: ${r} × ${cc}.`, why: `Factors of ${n} here: ${a.map((i) => cells[i]).join(', ')}` }, '4.OA.B.4', 192, 'algebra');
  }
  function factorPairs() {
    const n = U.pick([24, 36, 48, 60, 72]), pairs = [...Array(n).keys()].map((i) => i + 1).filter((i) => n % i === 0 && i * i <= n).length;
    return tag(M4.mc(`How many factor pairs does ${n} have?`, String(pairs), [[String(pairs * 2), 'Each pair has two factors. Count pairs, not single factors.'], [String(pairs - 1), 'Remember the pair 1 × ' + n + '.'], [String(pairs + 1), 'Check each pair: both numbers must multiply to ' + n + '.']], { fig: Fig.table([['Factor', 'Factor'], [1, n], [2, n / 2], ['…', '…']], `Factor pairs of ${n}`), meta: { kind: 'pairs', args: [n] }, hint: 'Start at 1 and go up: 1 × ?, 2 × ?, 3 × ?, … Stop when the factors meet.', why: `${n} has ${pairs} factor pairs.` }), '4.OA.B.4', 200, 'algebra');
  }
  function primeHot() {
    const prime = U.pick([true, false]), cells = U.uniq([U.int(2, 50), U.int(2, 50), U.int(2, 50), U.int(2, 50), U.int(2, 50), U.int(2, 50)]).slice(0, 5).sort((a, b) => a - b);
    const a = cells.map((v, i) => (isPrime(v) === prime ? i : -1)).filter((i) => i >= 0);
    if (cells.length < 5 || !a.length || a.length === cells.length) return primeHot();
    return tag({ t: 'hot', q: `Tap all the ${prime ? 'prime' : 'composite'} numbers.`, cells: cells.map(String), layout: 'row', multi: true, a, fig: Fig.pair(Fig.array(1, 7), Fig.array(2, 6)), meta: { kind: 'hotPred', args: [prime ? 'prime' : 'composite', 0, cells] }, hint: 'A prime number has exactly two factors: 1 and itself (7 makes only one rectangle). A composite number has more (12 = 2 × 6).', why: `${prime ? 'Prime' : 'Composite'}: ${a.map((i) => cells[i]).join(', ')}` }, '4.OA.B.4', 200, 'algebra');
  }
  function multipleMC() {
    const k = U.int(3, 9), m = k * U.int(3, 11), wrongs = U.sample([...Array(60).keys()].map((i) => i + 10).filter((v) => v % k !== 0), 3);
    return tag(M4.mc(`Which number is a multiple of ${k}?`, String(m), wrongs.map((v) => [String(v), `${v} ÷ ${k} has a remainder, so it is not a multiple of ${k}.`]), { fig: Fig.jumps(0, k, 4), meta: { kind: 'multipleOf', args: [k] }, hint: `Multiples of ${k}: skip count by ${k}.`, why: `${k} × ${m / k} = ${m}` }), '4.OA.B.4', 196, 'algebra');
  }
  function orderOps() {
    const forms = [
      () => { const a = U.int(2, 9), b = U.int(2, 9), d = U.int(2, 9), e = U.int(1, a * (b + d) - 1); return [`${a} × (${b} + ${d}) − ${e}`, a * b + d - e > 0 ? a * b + d - e : null]; },
      () => { const a = U.int(10, 30), b = U.int(2, 6), d = U.int(2, 6); return [`${a} + ${b} × ${d}`, (a + b) * d]; },
      () => { const a = U.int(20, 60), b = U.int(2, 9), d = U.int(2, 5); return [`(${a} − ${b}) × ${d}`, a - b * d > 0 ? a - b * d : null]; },
      () => { const b = U.int(2, 6), d = U.int(2, 6), a = (b + d) * U.int(2, 6); return [`${a} ÷ (${b} + ${d})`, a % b === 0 ? a / b + d : null]; },
    ];
    const [e, leftToRight] = U.pick(forms)();
    const ans = M4.ev(e);
    if (!Number.isInteger(ans) || ans <= 0) return orderOps();
    return tag(U.num(`What is the value of this expression?\n${e}`, String(ans), { fig: Fig.table([['First', 'Next', 'Last'], ['( )', '× and ÷', '+ and −']], 'Order of operations'), meta: { kind: 'expr', args: [e] }, miss: leftToRight != null && leftToRight !== ans ? missMap([[leftToRight, 'Parentheses first, then multiply or divide, then add or subtract.']], String(ans)) : {}, hint: 'Do what is inside the parentheses first. Multiply and divide before adding and subtracting.', why: `${e} = ${ans}` }), '5.OA.A.1', 210, 'algebra');
  }

  // ===================== PATTERNS & RULES =====================
  function patternTerm() {
    const s = U.int(2, 20), k = U.int(3, 12), t = U.int(5, 8), ans = s + (t - 1) * k;
    return tag(U.num(`A pattern starts at ${s}. The rule is "add ${k}". What is the ${['', '', '', '', '', 'fifth', 'sixth', 'seventh', 'eighth'][t]} number in the pattern?`, String(ans), { fig: Fig.jumps(s, k, 3), meta: { kind: 'expr', args: [`${s} + ${t - 1} × ${k}`] }, miss: missMap([[s + t * k, `The first number is ${s}, so the ${t}th number is only ${t - 1} jumps away.`], [t * k, `Start at ${s}, not at 0.`]], String(ans)), hint: 'List the numbers, or count the jumps: one fewer jump than the position.', why: `${[...Array(t)].map((_, i) => s + i * k).join(', ')}` }), '4.OA.C.5', 190, 'algebra');
  }
  function patternFeature() {
    const s = U.int(1, 19), k = U.int(2, 9), seq = [0, 1, 2, 3, 4].map((i) => s + i * k);
    let right, w;
    if (k % 2 === 0) { right = s % 2 ? 'All the numbers are odd.' : 'All the numbers are even.'; w = [s % 2 ? 'All the numbers are even.' : 'All the numbers are odd.', 'The numbers go odd, even, odd, even.', `Every number is a multiple of ${k}.`]; }
    else { right = 'The numbers go back and forth between odd and even.'; w = ['All the numbers are odd.', 'All the numbers are even.', `Every number ends in ${s % 10}.`]; }
    if (k % 2 === 0 && s % k === 0) w[2] = `Every number ends in ${s % 10}.`;
    if (new Set([right, ...w]).size < 4 || w.includes(right)) return patternFeature();
    return tag(M4.mc(`The rule is "start at ${s}, add ${k}".\n${seq.join(', ')}, …\nWhich is true about the numbers in the pattern?`, right, w.map((x) => [x, 'Check it with each number in the pattern.']), { fig: Fig.jumps(s, k, 3), meta: { kind: 'patternFeature', args: [s, k] }, hint: `Adding an ${k % 2 ? 'odd' : 'even'} number: does odd or even change?`, why: right }), '4.OA.C.5', 198, 'algebra');
  }
  function growingShapes() {
    const s = U.int(3, 6), k = U.int(2, 5), t = U.int(5, 8), ans = s + (t - 1) * k;
    return tag(U.num(`Figure 1 has ${s} squares. Each new figure has ${k} more squares than the one before. How many squares are in Figure ${t}?`, String(ans), { unit: 'squares', fig: Fig.table([['Figure', '1', '2', '3', '…', String(t)], ['Squares', s, s + k, s + 2 * k, '…', '?']]), meta: { kind: 'expr', args: [`${s} + ${t - 1} × ${k}`] }, miss: missMap([[s + t * k, `From Figure 1 to Figure ${t} there are ${t - 1} steps.`], [t * k, `Figure 1 already has ${s}.`]], String(ans)), hint: 'Continue the table, or count the steps from Figure 1.', why: `${s} + ${t - 1} × ${k} = ${ans}` }), '4.OA.C.5', 196, 'algebra');
  }
  function twoPatterns() {
    const ka = U.int(2, 5), m = U.int(2, 4), kb = ka * m, A = [0, 1, 2, 3, 4].map((i) => i * ka), B = A.map((v) => v * m);
    return tag(M4.mc(`Pattern A starts at 0 and adds ${ka}. Pattern B starts at 0 and adds ${kb}. How does each number in B compare with the matching number in A?`, `Each number in B is ${m} times the number in A.`, [[`Each number in B is ${kb - ka} more than the number in A.`, `Check the third pair: ${A[2]} and ${B[2]}.`], [`Each number in B is ${kb} times the number in A.`, `${kb} is what B adds each time.`], [`Each number in A is ${m} times the number in B.`, 'B grows faster, so B is the bigger one.']], { fig: Fig.table([['A', ...A], ['B', ...B]]), meta: { kind: 'twoPatterns', args: [ka, kb] }, hint: 'Divide a number in B by the matching number in A.', why: `${B[2]} = ${m} × ${A[2]}, ${B[3]} = ${m} × ${A[3]}` }), '5.OA.B.3', 210, 'algebra');
  }
  function nextPair() {
    const ka = U.int(1, 3), m = U.int(2, 3), A = [0, 1, 2, 3].map((i) => i * ka), B = A.map((v) => v * m);
    const right = `(${4 * ka}, ${4 * ka * m})`;
    return tag(M4.mc(`The ordered pairs (A, B) come from two patterns: A adds ${ka}, B adds ${ka * m}.\n${A.map((a, i) => `(${a}, ${B[i]})`).join(', ')}, …\nWhich ordered pair comes next?`, right, [[`(${4 * ka * m}, ${4 * ka})`, 'The first number comes from pattern A.'], [`(${4 * ka}, ${3 * ka * m + 1})`, `B adds ${ka * m} each time.`], [`(${3 * ka + 1}, ${4 * ka * m})`, `A adds ${ka} each time.`]], { fig: Fig.coordGrid(A.map((a, i) => [a, B[i], '']).filter(([x, y]) => x <= 10 && y <= 10), 10), meta: { kind: 'point', args: [4 * ka, 4 * ka * m] }, hint: 'Find the next number in each pattern.', why: `A: ${4 * ka}, B: ${4 * ka * m}` }), '5.OA.B.3', 212, 'algebra');
  }

  M4_SKILLS.push(
    { goal: 'algebra', id: 'times', name: 'Times as many', icon: '📏', levels: [
      lv('Comparison equations', '4.OA.A.1', '"Times as many" is multiplication.', [timesEquation, timesEquation, () => timesStory('more')]),
      lv('Comparison stories', '4.OA.A.2', 'Multiply or divide to compare.', [() => timesStory('more'), () => timesStory('less')]),
      lv('Write and read expressions', '5.OA.A.2', 'Words into expressions.', [exprWords, exprWords, timesAsLarge]) ] },
    { goal: 'algebra', id: 'steps', name: 'Multi-step problems', icon: '🪜', levels: [
      lv('Two steps, one answer', '4.OA.A.3', 'Multiply, then add or subtract.', [twoStep]),
      lv('What does the remainder mean?', '4.OA.A.3', 'Round up, drop it, or use it.', [remainderStory, twoStep]),
      lv('Problems with fractions and money', '4.NF.B.4c · 5.NBT.B.7', 'Real-world amounts.', [() => fracDecStory('frac'), () => fracDecStory('money'), fracStory2]) ] },
    { goal: 'algebra', id: 'factors', name: 'Factors & expressions', icon: '🧱', levels: [
      lv('Factors and multiples', '4.OA.B.4', 'What divides evenly?', [factorHot, multipleMC]),
      lv('Prime and composite', '4.OA.B.4', 'How many factors?', [primeHot, factorPairs, factorHot]),
      lv('Order of operations', '5.OA.A.1', 'Parentheses first.', [orderOps]) ] },
    { goal: 'algebra', id: 'pattern', name: 'Patterns & rules', icon: '🔁', levels: [
      lv('Follow the rule', '4.OA.C.5', 'What comes later?', [patternTerm, growingShapes]),
      lv('Look for hidden features', '4.OA.C.5', 'Odd, even, and more.', [patternFeature, growingShapes, patternTerm]),
      lv('Two patterns together', '5.OA.B.3', 'Ordered pairs from two rules.', [twoPatterns, nextPair]) ] },
  );
})();
