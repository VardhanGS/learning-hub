// Math Quest 2: Problem Solving (Grades 2–3). Strategies, not just stories: bar models, two-step stories, patterns
// and rules, number riddles and guess-and-check, organized lists, and checking that an answer makes sense.
// Every answer is computed in code; meta {kind, args} lets tools/validate.js recompute it independently.
(function () {
  const { pl, tag, kid, thing, cap, missMap } = MQ;
  const r10 = (n) => Math.floor(n / 10 + 0.5) * 10;

  // ===================== BAR MODELS =====================
  function partWhole() {
    const [k, he] = kid(), t = thing(), a = U.int(12, 60), b = U.int(11, 39);
    if (U.pick([true, false])) return tag(U.num(`${k} has ${a} red ${t} and ${b} blue ${t}. How many ${t} does ${he} have in all?`, a + b, { unit: t, fig: Fig.barModel('?', [a, b], t), meta: { kind: 'add', args: [a, b] }, miss: missMap([[Math.abs(a - b), 'The bar shows two parts put together. Add the parts to find the whole.']], a + b), steps: ['The whole bar is unknown. The parts are known.', `Whole = part + part: ${a} + ${b}.`], hint: 'Both parts are known. Put them together.', why: `${a} + ${b} = ${a + b} ${t}` }), '2.OA.A.1', 172, 'algebra');
    const w = a + b;
    return tag(U.num(`${k} has ${w} ${t}. ${a} are red and the rest are blue. How many are blue?`, b, { unit: t, fig: Fig.barModel(w, [a, '?'], t), meta: { kind: 'sub', args: [w, a] }, miss: missMap([[w + a, 'The whole is already known. Take away the part you know to find the other part.']], b), steps: [`The whole is ${w}. One part is ${a}.`, `Missing part = whole − part: ${w} − ${a}.`], hint: 'Whole minus the known part.', why: `${w} − ${a} = ${b} ${t}` }), '2.OA.A.1', 176, 'algebra');
  }
  function compareStory() {
    const [k] = kid(), [k2] = U.pick(MQ.KIDS.filter(([n]) => n !== k)), t = thing(), a = U.int(15, 60), d = U.int(5, 30), b = a + d;
    const kind = U.pick(['more', 'diff', 'fewer']);
    if (kind === 'more') return tag(U.num(`${k} has ${a} ${t}. ${k2} has ${d} more ${t} than ${k}. How many ${t} does ${k2} have?`, b, { unit: t, fig: Fig.barModel('?', [a, d], `${k2}: ${k}'s amount and ${d} more`), meta: { kind: 'add', args: [a, d] }, miss: missMap([[a - d, `"More than" means ${k2} has MORE: add.`], [d, `${d} is how many more. Add it to ${k}'s ${a}.`]], b), hint: `${k2}'s bar is as long as ${k}'s, plus ${d}.`, why: `${a} + ${d} = ${b}` }), '2.OA.A.1', 180, 'algebra');
    if (kind === 'fewer') return tag(U.num(`${k} has ${b} ${t}. ${k2} has ${d} fewer ${t} than ${k}. How many ${t} does ${k2} have?`, a, { unit: t, fig: Fig.barModel(b, ['?', d], `${k}'s bar: ${k2}'s part and ${d} more`), meta: { kind: 'sub', args: [b, d] }, miss: missMap([[b + d, `"Fewer" means ${k2} has LESS: subtract.`]], a), hint: `${k2} has ${d} less than ${b}.`, why: `${b} − ${d} = ${a}` }), '2.OA.A.1', 182, 'algebra');
    return tag(U.num(`${k} has ${b} ${t}. ${k2} has ${a} ${t}. How many more ${t} does ${k} have than ${k2}?`, d, { unit: t, fig: Fig.compareBars(b, a, k, k2), meta: { kind: 'sub', args: [b, a] }, miss: missMap([[a + b, 'How many MORE is the difference between the bars: subtract.']], d), hint: 'Line up the bars. The extra part is the difference.', why: `${b} − ${a} = ${d}` }), '2.OA.A.1', 178, 'algebra');
  }
  function equalBar() {
    const [k, he] = kid(), n = U.int(3, 9), each = U.int(3, 9), total = n * each, kind = U.pick(['share', 'groupsPlus']);
    if (kind === 'share') {
      const what = U.pick([['ribbon', 'cm', 'pieces'], ['rope', 'feet', 'pieces'], ['bag of', '', 'friends']]);
      if (what[2] === 'friends') return tag(U.num(`${k} shares ${total} grapes equally among ${n} friends. How many grapes does each friend get?`, each, { unit: 'grapes', fig: Fig.shareBar(total, n), meta: { kind: 'div', args: [total, n] }, miss: missMap([[total - n, 'Sharing equally is dividing, not taking away.']], each), hint: `${n} equal parts make ${total}. ${n} × ? = ${total}.`, why: `${total} ÷ ${n} = ${each}` }), '3.OA.A.2 · 3.OA.A.3', 190, 'algebra');
      return tag(U.num(`A ${what[0]} is ${total} ${what[1]} long. ${cap(he)} cuts it into ${n} equal pieces. How long is each piece?`, each, { unit: what[1], fig: Fig.shareBar(total, n), meta: { kind: 'div', args: [total, n] }, miss: missMap([[total - n, 'Equal pieces means dividing.']], each), hint: `${n} equal parts make ${total}.`, why: `${total} ÷ ${n} = ${each} ${what[1]}` }), '3.OA.A.3', 192, 'algebra');
    }
    const extra = U.int(1, 9), t = U.pick(['crayons', 'stickers', 'cards']);
    return tag(U.num(`${k} has ${n} boxes with ${each} ${t} in each box, and ${pl(extra, 'loose ' + t.slice(0, -1), 'loose ' + t)}. How many ${t} is that in all?`, total + extra, { unit: t, fig: Fig.barModel('?', [...Array(Math.min(n, 9))].map(() => each).concat([extra]), `${n} boxes of ${each}, then ${extra} more`), meta: { kind: 'expr', args: [`${n} * ${each} + ${extra}`] }, miss: missMap([[n * each, `Add the ${extra} loose ones too.`], [n + each + extra, 'The boxes hold equal groups: multiply, then add.']], total + extra), steps: [`Boxes: ${n} × ${each} = ${total}.`, `Add the loose ones: ${total} + ${extra}.`], hint: 'Multiply for the boxes, then add the extras.', why: `${n} × ${each} + ${extra} = ${total + extra}` }), '3.OA.D.8', 196, 'algebra');
  }

  // ===================== TWO-STEP STORIES =====================
  function twoStep() {
    const [k, he] = kid(), t = thing(), kind = U.int(0, 2);
    if (kind === 0) {
      const a = U.int(20, 60), b = U.int(10, 35), c = U.int(5, a + b - 10);
      return tag(U.num(`${k} has ${a} ${t}. ${cap(he)} buys ${b} more. Then ${he} gives ${c} to a friend. How many ${t} does ${he} have now?`, a + b - c, { unit: t, fig: Fig.barModel('?', [a, b], `then ${c} given away`), meta: { kind: 'sum', args: [a, b, -c] }, miss: missMap([[a + b + c, `Giving away makes fewer: subtract the ${c}.`], [a + b, `That is after step 1. Now take away ${c}.`]], a + b - c), steps: [`Step 1: ${a} + ${b} = ${a + b}.`, `Step 2: ${a + b} − ${c} = ${a + b - c}.`], hint: 'Do one step at a time.', why: `${a} + ${b} − ${c} = ${a + b - c}` }), '2.OA.A.1', 184, 'algebra');
    }
    if (kind === 1) {
      const a = U.int(50, 95), b = U.int(10, 25), c = U.int(5, a - b - 5);
      return tag(U.num(`A bus has ${a} people. At the first stop ${b} get off. At the next stop ${c} more get off. How many people are on the bus now?`, a - b - c, { unit: 'people', fig: Fig.barModel(a, ['?', b, c], 'people on the bus'), meta: { kind: 'sum', args: [a, -b, -c] }, miss: missMap([[a - b + c, `At the second stop people got OFF too: subtract ${c}.`], [a - b, `That is after the first stop only.`]], a - b - c), steps: [`First stop: ${a} − ${b} = ${a - b}.`, `Next stop: ${a - b} − ${c} = ${a - b - c}.`], hint: 'Take away both groups.', why: `${a} − ${b} − ${c} = ${a - b - c}` }), '2.OA.A.1', 186, 'algebra');
    }
    const a = U.int(10, 40), d = U.int(5, 20), b = a + d;
    return tag(U.num(`${k} read ${a} pages on Monday. On Tuesday ${he} read ${d} more pages than on Monday. How many pages did ${he} read on both days together?`, a + b, { unit: 'pages', fig: Fig.barModel('?', [a, b], `Monday ${a}, Tuesday ${a} + ${d}`), meta: { kind: 'sum', args: [a, a, d] }, miss: missMap([[a + d, `That is Tuesday only. Add Monday's ${a} too.`], [a + d + d, 'Tuesday is Monday plus ' + d + '.']], a + b), steps: [`Tuesday: ${a} + ${d} = ${b}.`, `Both days: ${a} + ${b} = ${a + b}.`], hint: 'First find Tuesday, then add both days.', why: `${a} + ${b} = ${a + b}` }), '2.OA.A.1', 190, 'algebra');
  }
  function whichEquation() {
    const [k, he] = kid(), t = thing(), a = U.int(20, 60), b = U.int(10, 30), c = U.int(5, 19), kind = U.pick(['gainLose', 'loseLose']);
    const eq = (x, o1, y, o2, z) => `${x} ${o1} ${y} ${o2} ${z} = n`;
    const story = kind === 'gainLose' ? `${k} had ${a} ${t}. ${cap(he)} got ${b} more, then lost ${c}. Which equation finds n, the number of ${t} ${he} has now?` : `${k} had ${a} ${t}. ${cap(he)} gave ${b} to a friend and lost ${c}. Which equation finds n, the number of ${t} ${he} has now?`;
    const ans = kind === 'gainLose' ? eq(a, '+', b, '−', c) : eq(a, '−', b, '−', c);
    const wrongs = (kind === 'gainLose' ? [[eq(a, '−', b, '+', c), 'Getting more means add; losing means subtract.'], [eq(a, '+', b, '+', c), `Losing ${c} makes fewer: subtract it.`], [eq(a, '−', b, '−', c), `Getting ${b} more means add.`]] : [[eq(a, '+', b, '−', c), 'Giving away makes fewer: subtract.'], [eq(a, '−', b, '+', c), 'Losing makes fewer too: subtract.'], [eq(a, '+', b, '+', c), 'Both steps take away.']]);
    return tag(U.mcMiss(story, ans, wrongs, { fig: Fig.table([['Words', 'Means'], ['got more, bought', '+'], ['gave, lost, ate', '−']]), meta: { kind: 'storyEq2', args: [a, b, c, kind] }, hint: 'Write the steps in order: start, then the first change, then the second.', why: ans }), '3.OA.D.8', 192, 'algebra');
  }
  function mulThen() {
    const [k, he] = kid(), g = U.int(3, 9), n = U.int(3, 9), kind = U.pick(['plus', 'minus']);
    if (kind === 'plus') {
      const c = U.int(4, 30), item = U.pick(['crayons', 'markers', 'stickers']);
      return tag(U.num(`${k} buys ${g} packs of ${item} with ${n} in each pack. ${cap(he)} already had ${c} ${item}. How many ${item} does ${he} have now?`, g * n + c, { unit: item, fig: Fig.groups(g, n), meta: { kind: 'expr', args: [`${g} * ${n} + ${c}`] }, miss: missMap([[g + n + c, 'Packs are equal groups: multiply first.'], [g * n, `Add the ${c} ${he} already had.`]], g * n + c), steps: [`Packs: ${g} × ${n} = ${g * n}.`, `Add: ${g * n} + ${c} = ${g * n + c}.`], hint: 'Multiply, then add.', why: `${g} × ${n} + ${c} = ${g * n + c}` }), '3.OA.D.8', 198, 'algebra');
    }
    const have = U.int(g * n + 5, 99);
    return tag(U.num(`${k} has $${have}. ${cap(he)} buys ${g} books that cost $${n} each. How much money does ${he} have left?`, have - g * n, { pre: '$', fig: Fig.groups(g, n), meta: { kind: 'expr', args: [`${have} - ${g} * ${n}`] }, miss: missMap([[have - n, `${he} buys ${g} books: multiply the price first.`], [have - g - n, 'Each book costs $' + n + ': multiply.']], have - g * n), steps: [`Cost: ${g} × $${n} = $${g * n}.`, `Left: $${have} − $${g * n} = $${have - g * n}.`], hint: 'Find the cost of all the books, then subtract.', why: `$${have} − ${g} × $${n} = $${have - g * n}` }), '3.OA.D.8', 200, 'algebra');
  }

  // ===================== PATTERNS & RULES =====================
  function nextTerm() {
    const d = U.pick([2, 3, 4, 5, 10, 25, 100]), up = d > 25 ? true : U.pick([true, true, false]), len = 5;
    const start = up ? U.int(1, d === 100 ? 300 : 60) : U.int(d * len + 5, Math.min(999, d * len + 120));
    const seq = [...Array(len)].map((_, i) => start + (up ? d : -d) * i), next = start + (up ? d : -d) * len;
    if (next < 0 || next > 1000) return nextTerm();
    return tag(U.num(`What number comes next?\n${seq.join(', ')}, ___`, next, { fig: Fig.jumps(seq[0], up ? d : -d, len), meta: { kind: 'seqNext', args: [seq] }, miss: missMap([[next + (up ? d : -d), 'That is two steps ahead.'], [seq[len - 1] + (up ? 1 : -1), `The numbers ${up ? 'grow' : 'shrink'} by ${d} each time, not 1.`]], next), hint: 'How much does the number change each time?', why: `${up ? 'Add' : 'Subtract'} ${d}: ${seq[len - 1]} ${up ? '+' : '−'} ${d} = ${next}` }), '2.NBT.A.2 · 3.OA.D.9', 176, 'algebra');
  }
  function findRule() {
    const d = U.pick([2, 3, 4, 5, 6, 8, 10]), up = U.pick([true, false]), start = up ? U.int(1, 40) : U.int(d * 4 + 3, 90), seq = [0, 1, 2, 3].map((i) => start + (up ? d : -d) * i);
    const say = (dd) => (dd > 0 ? `add ${dd}` : `subtract ${-dd}`), ans = say(up ? d : -d);
    const wrongs = [[say(up ? d + 1 : -(d + 1)), 'Check every step, not just the first one.'], [say(up ? -d : d), `The numbers get ${up ? 'bigger' : 'smaller'}.`], [say(up ? d - 1 || d + 2 : -(d - 1 || d + 2)), 'Find the difference between two numbers next to each other.']];
    return tag(U.mcMiss(`What is the rule?\n${seq.join(', ')}`, ans, wrongs, { fig: Fig.jumps(seq[0], up ? d : -d, 3), meta: { kind: 'ruleAddSub', args: [seq] }, hint: 'Subtract two numbers next to each other.', why: `Each number is ${d} ${up ? 'more' : 'less'} than the one before: ${ans}.` }), '3.OA.D.9', 186, 'algebra');
  }
  function ioTable() {
    const mul = U.pick([true, false]), k = mul ? U.int(2, 9) : U.int(3, 25), ins = U.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4).sort((x, y) => x - y), f = (x) => (mul ? x * k : x + k);
    const ask = ins[3];
    return tag(U.num(`The machine uses the same rule for every number. What comes out when ${ask} goes in?`, f(ask), { fig: Fig.table([['In', ...ins.slice(0, 3).map(String), String(ask)], ['Out', ...ins.slice(0, 3).map((x) => String(f(x))), '?']], 'Rule machine: same rule for every number'), meta: { kind: 'expr', args: [mul ? `${ask} * ${k}` : `${ask} + ${k}`] }, miss: missMap(mul ? [[ask + k, 'Check the rule with every pair: does adding work for all of them?']] : [[ask * k, 'Check the rule with every pair: does multiplying work for all of them?']], f(ask)), steps: [`Look at ${ins[0]} → ${f(ins[0])} and ${ins[1]} → ${f(ins[1])}.`, `The rule is ${mul ? `× ${k}` : `+ ${k}`}.`], hint: 'Find a rule that works for every pair.', why: `${ask} ${mul ? '×' : '+'} ${k} = ${f(ask)}` }), '3.OA.D.9 · 3.OA.C.7', 194, 'algebra');
  }

  // ===================== THINK IT THROUGH =====================
  // Number riddles: clues about a 3-digit number, added until exactly one number fits (checked by brute force).
  const CLUE = {
    h: ([, v], n) => Math.floor(n / 100) === v, t: ([, v], n) => Math.floor(n / 10) % 10 === v, o: ([, v], n) => n % 10 === v,
    tMore: ([, v], n) => Math.floor(n / 10) % 10 - (n % 10) === v, sum: ([, v], n) => Math.floor(n / 100) + (Math.floor(n / 10) % 10) + (n % 10) === v,
    even: (_, n) => n % 2 === 0, odd: (_, n) => n % 2 === 1, oDouble: (_, n) => n % 10 === 2 * Math.floor(n / 100),
  };
  const fits = (clues) => [...Array(900)].map((_, i) => i + 100).filter((n) => clues.every((c) => CLUE[c[0]](c, n)));
  const SAY = { h: (v) => `My hundreds digit is ${v}.`, t: (v) => `My tens digit is ${v}.`, o: (v) => `My ones digit is ${v}.`, tMore: (v) => `My tens digit is ${v} more than my ones digit.`, sum: (v) => `My digits add up to ${v}.`, even: () => 'I am even.', odd: () => 'I am odd.', oDouble: () => 'My ones digit is double my hundreds digit.' };
  function riddle() {
    const n = U.int(100, 999), H = Math.floor(n / 100), T = Math.floor(n / 10) % 10, O = n % 10;
    const pool = U.shuffle([['tMore', T - O], ['sum', H + T + O], [n % 2 ? 'odd' : 'even'], ...(O === 2 * H ? [['oDouble']] : []), ['t', T], ['o', O]].filter((c) => c[0] !== 'tMore' || c[1] > 0));
    const clues = [['h', H]];
    for (const c of pool) { if (fits(clues).length === 1) break; clues.push(c); }
    if (fits(clues).length !== 1 || clues.length < 3) return riddle();
    return tag(U.num(`Who am I? I am a 3-digit number.\n${clues.map((c) => SAY[c[0]](c[1])).join('\n')}`, n, { fig: Fig.table([['Hundreds', 'Tens', 'Ones'], ['?', '?', '?']], 'Use one clue at a time'), meta: { kind: 'riddle', args: [clues] }, steps: clues.map((c) => SAY[c[0]](c[1])).map((s, i) => (i === 0 ? `${s} So the number is ${H}__.` : s)).concat([`Only ${n} fits every clue.`]).slice(0, 3), hint: 'Start with the clue you are sure about. Then test numbers against the other clues.', why: `${n} fits every clue.` }), '2.NBT.A.1 · 2.NBT.A.3', 188, 'number');
  }
  function guessCheck() {
    if (U.pick([true, false])) {
      const dogs = U.int(1, 6), hens = U.int(1, 6), heads = dogs + hens, legs = 4 * dogs + 2 * hens;
      return tag(U.num(`A farm has hens and dogs. There are ${heads} heads and ${legs} legs. How many dogs are there?`, dogs, { unit: 'dogs', fig: Fig.picture(['🐔', '🐶'], `${heads} heads · ${legs} legs`), meta: { kind: 'legs2', args: [heads, legs] }, miss: missMap([[hens, 'That is the number of hens. Dogs have 4 legs.']], dogs), steps: [`Guess: if all ${heads} were hens, that is ${2 * heads} legs.`, `There are ${legs - 2 * heads} extra legs. Each dog adds 2 extra legs.`, `${legs - 2 * heads} ÷ 2 = ${dogs} dogs.`], hint: 'Make a guess, count the legs, then adjust.', why: `${dogs} dogs and ${hens} hens: ${4 * dogs} + ${2 * hens} = ${legs} legs.` }), '2.OA.A.1 · 3.OA.D.8', 196, 'algebra');
    }
    const small = U.int(5, 40), big = small + U.int(2, 30), S = big + small, D = big - small;
    return tag(U.num(`Two numbers add up to ${S}. One is ${D} more than the other. What is the bigger number?`, big, { fig: Fig.barModel(S, ['?', '?'], `the bigger part is ${D} more`), meta: { kind: 'sumDiff', args: [S, D] }, miss: missMap([[small, 'That is the smaller number.'], [S - D, 'Take away the extra, then split into two equal parts.']], big), steps: [`Take away the extra: ${S} − ${D} = ${S - D}.`, `Split in half: ${S - D} ÷ 2 = ${small}. That is the smaller number.`, `Bigger: ${small} + ${D} = ${big}.`], hint: 'Guess two numbers that add up correctly, then check the difference.', why: `${big} + ${small} = ${S} and ${big} − ${small} = ${D}` }), '2.OA.A.1 · 3.OA.D.8', 200, 'algebra');
  }
  function orgList() {
    if (U.pick([true, false])) {
      const s = U.int(2, 5), p = U.int(2, 4);
      return tag(U.num(`${kid()[0]} has ${pl(s, 'shirt')} and ${pl(p, 'pair')} of pants. How many different outfits of one shirt and one pair of pants can be made?`, s * p, { unit: 'outfits', fig: Fig.table([['', ...[...Array(p)].map((_, i) => `Pants ${i + 1}`)], ...[...Array(s)].map((_, r) => [`Shirt ${r + 1}`, ...[...Array(p)].map(() => '✓')])], 'Make a table'), meta: { kind: 'mul', args: [s, p] }, miss: missMap([[s + p, 'Each shirt goes with EVERY pair of pants: multiply.']], s * p), steps: ['Make a table: shirts in rows, pants in columns.', `Each shirt makes ${p} outfits.`, `${s} × ${p} = ${s * p}.`], hint: 'List every shirt with every pair of pants.', why: `${s} × ${p} = ${s * p} outfits` }), '3.OA.A.1 · 3.OA.A.3', 194, 'algebra');
    }
    const amt = U.pick([15, 20, 25, 30, 35, 40, 45, 50]), ways = Math.floor(amt / 10) + 1;
    return tag(U.num(`How many different ways can you make ${amt}¢ using only dimes and nickels?`, ways, { unit: 'ways', fig: Fig.table([['Dimes', 'Nickels', 'Total'], ...[...Array(Math.min(ways, 3))].map((_, d) => [String(d), String((amt - 10 * d) / 5), `${amt}¢`]), ['…', '…', '…']], 'Make an organized list'), meta: { kind: 'coinWays', args: [amt, [10, 5]] }, miss: missMap([[ways - 1, 'Remember the way with 0 dimes (all nickels).']], ways), steps: [`Start with 0 dimes: ${amt / 5} nickels.`, 'Add one dime at a time and use 2 fewer nickels.', `Stop at ${Math.floor(amt / 10)} dimes: ${ways} ways.`], hint: 'Make a list: 0 dimes, 1 dime, 2 dimes, …', why: `${ways} ways (0 to ${Math.floor(amt / 10)} dimes)` }), '2.M.C.8 · 3.OA.D.8', 198, 'algebra');
  }

  // ===================== DOES IT MAKE SENSE? =====================
  function estimateTens() {
    const a = U.intWhere(12, 88, (x) => x % 10 !== 5 && x % 10 !== 0), b = U.intWhere(12, 88, (x) => x % 10 !== 5 && x % 10 !== 0), e = r10(a) + r10(b);
    return tag(U.num(`Estimate by rounding each number to the nearest ten.\n${a} + ${b} is about how much?`, e, { fig: Fig.table([['Number', 'Nearest ten'], [String(a), '?'], [String(b), '?']]), meta: { kind: 'estTens', args: [a, b] }, miss: missMap([[a + b, 'That is the exact sum. Round each number first.']], e), steps: [`${a} rounds to ${r10(a)}. ${b} rounds to ${r10(b)}.`, `${r10(a)} + ${r10(b)} = ${e}.`], hint: 'Round each number, then add.', why: `${r10(a)} + ${r10(b)} = ${e}` }), '3.NBT.A.1 · 3.OA.D.8', 184, 'number');
  }
  function reasonable() {
    const a = U.int(21, 79), b = U.int(12, 69), sum = a + b, wrong = U.pick([true, false]);
    const claim = wrong ? U.pick([sum + 100, sum * 10 > 999 ? sum + 200 : sum * 10, Math.abs(a - b)].filter((x) => Math.abs(x - sum) > 25)) : sum;
    const [k] = kid(), A = ['Yes. It is close to the estimate.', 'No. It is far from the estimate.'];
    return tag(U.mcFixed(`${k} added ${a} + ${b} and got ${claim}. Is that answer reasonable?`, wrong ? A[1] : A[0], A, { fig: Fig.table([['Estimate', `${r10(a)} + ${r10(b)} = ${r10(a) + r10(b)}`]]), meta: { kind: 'reasonable', args: [a, b, claim] }, steps: [`Estimate: ${r10(a)} + ${r10(b)} = ${r10(a) + r10(b)}.`, `Is ${claim} close to ${r10(a) + r10(b)}?`], hint: 'Round both numbers and add. Is the answer close?', why: wrong ? `${claim} is far from about ${r10(a) + r10(b)}. The real sum is ${sum}.` : `${claim} is close to the estimate, ${r10(a) + r10(b)}.` }), '3.OA.D.8 · 3.NBT.A.1', 190, 'number');
  }
  function checkOpposite() {
    const a = U.int(200, 999), b = U.int(100, a - 50), d = a - b, ans = `${d} + ${b} = ${a}`;
    const wrongs = [[`${a} + ${b} = ${a + b}`, 'Adding the two numbers you started with does not check a subtraction.'], [`${a} + ${d} = ${a + d}`, `Add the answer to the number you took away (${b}).`]];
    if (d > b) wrongs.push([`${d} − ${b} = ${d - b}`, 'Undo subtraction with addition.']);
    return tag(U.mcMiss(`${a} − ${b} = ${d}. Which addition checks this answer?`, ans, wrongs, { fig: Fig.barModel(a, [d, b], 'The parts add up to the whole'), meta: { kind: 'checkSub', args: [a, b] }, hint: 'Answer + the number you took away should give the number you started with.', why: ans }), '2.NBT.B.9 · 3.NBT.A.2', 188, 'number');
  }

  addSubject({
    id: 'solve', name: 'Problem Solving', icon: '🧠', color: 'c4', blurb: 'Bar models, two-step stories, patterns, riddles, and checking answers.',
    skills: [
      { id: 'barmodel', name: 'Bar models', icon: '📏', levels: [
        { title: 'Part, part, whole', std: '2.OA.A.1', desc: 'Draw the bar, then find the missing piece.', gen: () => U.mix(8, [partWhole]) },
        { title: 'Compare with bars', std: '2.OA.A.1', desc: 'More than, fewer than, how many more.', gen: () => U.mix(8, [compareStory, partWhole]) },
        { title: 'Equal parts in a bar', std: '3.OA.A.3 · 3.OA.D.8', desc: 'Share, cut, and count groups.', gen: () => U.mix(8, [equalBar]) },
      ] },
      { id: 'twostep', name: 'Two-step stories', icon: '👣', levels: [
        { title: 'Two steps within 100', std: '2.OA.A.1', desc: 'Add or take away, then again.', gen: () => U.mix(8, [twoStep]) },
        { title: 'Which equation fits?', std: '3.OA.D.8', desc: 'Write the story as an equation.', gen: () => U.mix(8, [whichEquation, twoStep]) },
        { title: 'Multiply, then add or subtract', std: '3.OA.D.8', desc: 'Groups first, then the rest.', gen: () => U.mix(8, [mulThen]) },
      ] },
      { id: 'patterns2', name: 'Patterns & rules', icon: '🔁', levels: [
        { title: 'What comes next?', std: '2.NBT.A.2', desc: 'Skip-count patterns.', gen: () => U.mix(8, [nextTerm]) },
        { title: 'Find the rule', std: '3.OA.D.9', desc: 'Add or subtract the same amount.', gen: () => U.mix(8, [findRule, nextTerm]) },
        { title: 'Rule machines', std: '3.OA.D.9 · 3.OA.C.7', desc: 'In and out tables.', gen: () => U.mix(8, [ioTable]) },
      ] },
      { id: 'logic2', name: 'Think it through', icon: '🕵️', levels: [
        { title: 'Number riddles', std: '2.NBT.A.1 · 2.NBT.A.3', desc: 'Use one clue at a time.', gen: () => U.mix(8, [riddle]) },
        { title: 'Guess and check', std: '2.OA.A.1 · 3.OA.D.8', desc: 'Guess, check, and fix.', gen: () => U.mix(8, [guessCheck, riddle]) },
        { title: 'Make an organized list', std: '3.OA.A.1 · 2.M.C.8', desc: 'Outfits and coin combinations.', gen: () => U.mix(8, [orgList]) },
      ] },
      { id: 'sense', name: 'Does it make sense?', icon: '🤔', levels: [
        { title: 'Estimate first', std: '3.NBT.A.1', desc: 'Round, then add.', gen: () => U.mix(8, [estimateTens]) },
        { title: 'Is it reasonable?', std: '3.OA.D.8 · 3.NBT.A.1', desc: 'Compare with an estimate.', gen: () => U.mix(8, [reasonable, estimateTens]) },
        { title: 'Check with the opposite', std: '2.NBT.B.9 · 3.NBT.A.2', desc: 'Add to check subtraction.', gen: () => U.mix(8, [checkOpposite, reasonable]) },
      ] },
    ],
  });
})();
