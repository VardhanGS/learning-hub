// ADD & SUBTRACT — 2.OA.A.1, 2.OA.B.2, 2.NBT.B.5–8; Grade 3 level-ups 3.OA.A.3, 3.OA.C.7, 3.NBT.A.1–2.
(function () {
  const { pl, tag, ones, kid, thing, addMisses, subMisses, missMap } = MQ;
  const ICON = { apples: '🍎', pencils: '✏️', cookies: '🍪', stickers: '⭐', marbles: '🔵', crackers: '🟫', grapes: '🍇', cards: '🃏' };

  // ---------- Facts to 20 ----------
  function fact20() {
    if (U.pick([true, false])) {
      const a = U.int(3, 9), b = U.int(3, 9 + (a < 9 ? 1 : 0));
      const q = U.num(`${a} + ${b} = ?`, a + b, { meta: { kind: 'add', args: [a, b] }, fig: Fig.tenFrames(a, b), hint: a + b > 10 ? `Make a ten: ${a} + ${10 - a} = 10, then add ${b - (10 - a)} more.` : 'Count on from the bigger number.', why: `${a} + ${b} = ${a + b}` });
      q.miss = missMap([[a + b - 1, 'Off by one. Count on carefully: say the next number for each one you add.'], [a + b + 1, 'Off by one. Start counting on from the number after the first one.'], [Math.abs(a - b), 'That is the difference. Add to find the total.']], a + b);
      return tag(q, '2.OA.B.2', 165, 'algebra');
    }
    const x0 = U.int(2, 9), b = U.intWhere(3, 9, (v) => x0 + v >= 11 && x0 + v <= 18), c = x0 + b; // pick the answer first, so every answer is about equally likely
    const q = U.num(`${c} − ${b} = ?`, c - b, { fig: Fig.tenFrames(c, 0, b), meta: { kind: 'sub', args: [c, b] }, hint: `Think addition: ${b} + ? = ${c}.`, why: `${b} + ${c - b} = ${c}, so ${c} − ${b} = ${c - b}.` });
    q.miss = missMap([[c - b + 1, 'Off by one. Check by adding back.'], [c - b - 1, 'Off by one. Check by adding back.'], [c + b, 'That is the sum. The question asks you to take away.']], c - b);
    return tag(q, '2.OA.B.2', 168, 'algebra');
  }
  function missingAddend() {
    const x0 = U.int(2, 10), a = U.intWhere(2, 9, (v) => x0 + v >= 11 && x0 + v <= 19), c = x0 + a; // answer first: even spread
    const form = U.int(0, 2);
    const prompts = [`□ + ${a} = ${c}`, `${a} + □ = ${c}`, `${c} − □ = ${a}`];
    const q = U.num(`What number goes in the box?\n${prompts[form]}`, c - a, { fig: Fig.bond(c, form === 1 ? a : '?', form === 1 ? '?' : a), meta: { kind: 'sub', args: [c, a] }, hint: form === 2 ? `Think: ${a} + ? = ${c}.` : `Think: ${c} − ${a} = ?`, why: `${c - a} makes it true: ${form === 2 ? `${c} − ${c - a} = ${a}` : `${c - a} + ${a} = ${c}`}.` });
    q.miss = missMap([[c + a, `That is ${c} + ${a}. Find the missing part instead.`], [c, 'That is the whole. Find the missing part.']], c - a);
    return tag(q, '2.OA.B.2', 176, 'algebra');
  }
  function factFamily() {
    const a = U.int(3, 9), b = U.intWhere(3, 9, (x) => x !== a), c = a + b;
    const right = [`${b} + ${a} = ${c}`, `${c} − ${a} = ${b}`, `${c} − ${b} = ${a}`];
    // True facts that use other numbers, so they are not in this family.
    const wrong = U.sample([`${c} + ${a} = ${c + a}`, `${a} + ${c} = ${a + c}`, `${b} + ${b} = ${2 * b}`, `${c} − ${a + 1} = ${b - 1}`, ...(b > a ? [`${b} − ${a} = ${b - a}`] : [])].filter((e) => !right.includes(e)), 2);
    return tag(U.multi(`${a} + ${b} = ${c}. Choose all the facts in the same fact family.`, right, wrong, { fig: Fig.bond(c, a, b), meta: { kind: 'family', args: [a, b, c] }, hint: `A fact family uses the same three numbers: ${a}, ${b}, and ${c}.`, why: `The family of ${a}, ${b}, and ${c}: ${a} + ${b}, ${b} + ${a}, ${c} − ${a}, ${c} − ${b}.` }), '2.OA.B.2', 180, 'algebra');
  }
  function mulFact() {
    const a = U.int(2, 9), b = U.int(2, 9);
    if (U.pick([true, true, false])) {
      const q = U.num(`${a} × ${b} = ?`, a * b, { fig: Fig.groups(a, b), meta: { kind: 'mul', args: [a, b] }, hint: `${a} × ${b} means ${pl(a, 'group')} of ${b}.`, why: `${a} groups of ${b} = ${a * b}.` });
      q.miss = missMap([[a + b, `That is ${a} + ${b}. × means equal groups: ${a} groups of ${b}.`], [(a - 1) * b, `That is ${a - 1} groups of ${b}. Count one more group.`], [(a + 1) * b, `That is ${a + 1} groups of ${b}. Count one group fewer.`]], a * b);
      return tag(q, '3.OA.C.7', 196, 'algebra');
    }
    const q = U.num(`${a * b} ÷ ${a} = ?`, b, { fig: Fig.array(a, b), meta: { kind: 'div', args: [a * b, a] }, hint: `Think: ${a} × ? = ${a * b}.`, why: `${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = ${b}.` });
    q.miss = missMap([[a * b - a, `That is ${a * b} − ${a}. ÷ means share into equal groups.`], [b + 1, `Check: ${a} × ${b + 1} = ${a * (b + 1)}, not ${a * b}.`]], b);
    return tag(q, '3.OA.C.7', 199, 'algebra');
  }

  // ---------- Add & subtract within 100 ----------
  function addNoRegroup() {
    const a = U.intWhere(11, 87, (v) => v % 10 <= 8), b = U.intWhere(2, 99 - a, (x) => ones(a) + ones(x) < 10 && x % 10 !== 0); // ones 9 has no partner without regrouping
    return tag(U.num(`${a} + ${b} = ?`, a + b, { meta: { kind: 'add', args: [a, b] }, hint: 'Add the ones first. Then add the tens.', why: `${a} + ${b} = ${a + b}`, fig: Fig.addBlocks(a, b), miss: missMap(addMisses(a, b), a + b) }), '2.NBT.B.5', 172, 'number');
  }
  function subNoRegroup() {
    const a = U.intWhere(25, 98, (v) => v % 10 >= 1), b = U.intWhere(11, a - 5, (x) => ones(x) <= ones(a) && x % 10 !== 0);
    return tag(U.num(`${a} − ${b} = ?`, a - b, { fig: Fig.blocks(a), meta: { kind: 'sub', args: [a, b] }, hint: 'Subtract the ones. Then subtract the tens.', why: `${a} − ${b} = ${a - b}`, miss: missMap(subMisses(a, b), a - b) }), '2.NBT.B.5', 174, 'number');
  }
  function addRegroup(asMC) {
    const a = U.intWhere(15, 79, (v) => v % 10 >= 1), b = U.intWhere(12, 99 - a, (x) => ones(a) + ones(x) >= 10 && x % 10 !== 0);
    const extra = { fig: Fig.addBlocks(a, b), meta: { kind: 'add', args: [a, b] }, hint: 'Add the ones. If there are 10 or more, regroup 10 ones as 1 ten.', why: `${ones(a)} + ${ones(b)} = ${ones(a) + ones(b)} ones → 1 ten and ${pl(ones(a) + ones(b) - 10, 'one')}. ${a} + ${b} = ${a + b}.` };
    if (asMC) return tag(U.mcMiss(`${a} + ${b} = ?`, a + b, addMisses(a, b), extra, 3, () => a + b + U.pick([-2, -1, 1, 2, 9, 11])), '2.NBT.B.5', 184, 'number');
    return tag(U.num(`${a} + ${b} = ?`, a + b, { ...extra, miss: missMap(addMisses(a, b), a + b) }), '2.NBT.B.5', 185, 'number');
  }
  function subRegroup(asMC) {
    const a = U.intWhere(31, 98, (v) => v % 10 <= 8), b = U.intWhere(12, a - 6, (x) => ones(x) > ones(a) && x % 10 !== 0);
    const extra = { fig: Fig.blocks(a), meta: { kind: 'sub', args: [a, b] }, hint: `${ones(a)} is less than ${ones(b)}. Regroup 1 ten as 10 ones first.`, why: `${a} − ${b} = ${a - b}` };
    if (asMC) return tag(U.mcMiss(`${a} − ${b} = ?`, a - b, subMisses(a, b), extra, 3, () => a - b + U.pick([-2, -1, 1, 2, 9, 11])), '2.NBT.B.5', 187, 'number');
    return tag(U.num(`${a} − ${b} = ?`, a - b, { ...extra, miss: missMap(subMisses(a, b), a - b) }), '2.NBT.B.5', 188, 'number');
  }
  function addFour() {
    const ns = [U.int(11, 39), U.int(11, 39), U.int(11, 29), U.int(11, 29)];
    const s = ns.reduce((x, y) => x + y, 0);
    return tag(U.num(`${ns.join(' + ')} = ?`, s, { fig: Fig.placeChart(ns, '+'), meta: { kind: 'sum', args: ns }, hint: 'Add the ones of all four numbers, then the tens. Or add two at a time.', why: `${ns.join(' + ')} = ${s}` }), '2.NBT.B.6', 189, 'number');
  }
  function grade3AddSub() {
    if (U.pick([true, false])) {
      const a = U.intWhere(208, 689, (v) => v % 10 >= 1), b = U.intWhere(115, 999 - a, (x) => ones(a) + ones(x) >= 10 && x % 10 !== 0);
      return tag(U.num(`${a} + ${b} = ?`, a + b, { fig: Fig.placeChart([a, b], '+'), meta: { kind: 'add', args: [a, b] }, hint: 'Line up hundreds, tens, and ones. Regroup when a place has 10 or more.', why: `${a} + ${b} = ${a + b}`, miss: missMap(addMisses(a, b), a + b) }), '3.NBT.A.2', 195, 'number');
    }
    const a = U.intWhere(302, 951, (v) => v % 10 <= 8), b = U.intWhere(118, a - 25, (x) => ones(x) > ones(a));
    return tag(U.mcMiss(`${a} − ${b} = ?`, a - b, subMisses(a, b), { fig: Fig.placeChart([a, b], '−'), meta: { kind: 'sub', args: [a, b] }, hint: `${ones(a)} is less than ${ones(b)}, so regroup 1 ten as 10 ones first.`, why: `${a} − ${b} = ${a - b}` }, 3, () => a - b + U.pick([-100, 100, -1, 1])), '3.NBT.A.2', 198, 'number');
  }

  // ---------- Within 1,000 ----------
  function tenOrHundred() {
    const n = U.int(101, 899), d = U.pick([10, 100]), up = U.pick([true, false]);
    if (!up && n - d < 100) return tenOrHundred();
    const ans = up ? n + d : n - d;
    // crossing a hundred (395 + 10 = 405, 305 − 10 = 295): the hundreds digit changes too
    const cross = Math.floor(n / 100) !== Math.floor(ans / 100) && d === 10;
    const wrongPlace = up ? n + (d === 10 ? 100 : 10) : n - (d === 10 ? 100 : 10);
    const q = U.num(`${n} ${up ? '+' : '−'} ${d} = ?`, ans, { fig: Fig.placeChart([n], '', d === 10 ? 1 : 0), meta: { kind: up ? 'add' : 'sub', args: [n, d] }, hint: cross ? (up ? `${n} has 9 tens. One more ten makes 10 tens, and 10 tens make 1 more hundred.` : `${n} has 0 tens. Break 1 hundred into 10 tens, then take away 1 ten.`) : `Only the ${d === 10 ? 'tens' : 'hundreds'} digit changes.`, why: cross ? `${n} ${up ? '+' : '−'} ${d} = ${ans}. The tens go ${up ? 'from 9 to 0' : 'from 0 to 9'}, so the hundreds digit changes too.` : `${n} ${up ? '+' : '−'} ${d} = ${ans}. The ${d === 10 ? 'tens' : 'hundreds'} digit goes ${up ? 'up' : 'down'} by 1.` });
    q.miss = missMap([[wrongPlace, `That changed the ${d === 10 ? 'hundreds' : 'tens'} place. ${d} changes the ${d === 10 ? 'tens' : 'hundreds'}.`], [up ? n + 1 : n - 1, 'That changed the ones place.']], ans);
    return tag(q, '2.NBT.B.8', 178, 'number');
  }
  function threeDigit(op) {
    if (op === 'add') {
      const a = U.intWhere(118, 587, (v) => v % 10 >= 1 || MQ.tens(v) >= 1), b = U.intWhere(105, 999 - a, (x) => ones(a) + ones(x) >= 10 || MQ.tens(a) + MQ.tens(x) >= 10);
      return tag(U.num(`${a} + ${b} = ?`, a + b, { fig: Fig.placeChart([a, b], '+'), meta: { kind: 'add', args: [a, b] }, hint: 'Add ones, then tens, then hundreds. Regroup when a place has 10 or more.', why: `${a} + ${b} = ${a + b}`, miss: missMap(addMisses(a, b), a + b) }), '2.NBT.B.7', 190, 'number');
    }
    const a = U.intWhere(312, 985, (v) => v % 10 <= 8 || MQ.tens(v) <= 8), b = U.intWhere(108, a - 30, (x) => ones(x) > ones(a) || MQ.tens(x) > MQ.tens(a));
    return tag(U.mcMiss(`${a} − ${b} = ?`, a - b, subMisses(a, b), { fig: Fig.placeChart([a, b], '−'), meta: { kind: 'sub', args: [a, b] }, hint: 'Start with the ones. If the top digit is smaller, regroup from the next place.', why: `${a} − ${b} = ${a - b}` }, 3, () => a - b + U.pick([-10, 10, -100, 100])), '2.NBT.B.7', 192, 'number');
  }
  function estimate() {
    let a, b, ra, rb;
    do {
      a = U.int(112, 488); b = U.int(112, 488);
      ra = Math.round(a / 100) * 100; rb = Math.round(b / 100) * 100;
    } while (a % 100 === 50 || b % 100 === 50 || ra === 0 || rb === 0 || Math.abs((ra + rb) - (Math.round(a / 10) * 10 + Math.round(b / 10) * 10)) < 10);
    const exact = a + b, tensEst = Math.round(a / 10) * 10 + Math.round(b / 10) * 10;
    const q = U.mcMiss(`Round each number to the nearest hundred, then add.\n${a} + ${b} is about …`, ra + rb, [[exact, `${exact} is the exact sum. The question asks you to round first.`], [tensEst, 'Those were rounded to the nearest ten. Round to the nearest hundred.'], [ra + rb + 100, 'Check each rounding: look at the tens digit. 5 or more rounds up.']], { fig: Fig.roundLine(a, 100), meta: { kind: 'estHundreds', args: [a, b] }, hint: `${a} rounds to ${ra}. Now round ${b}.`, why: `${a} → ${ra}, ${b} → ${rb}. ${ra} + ${rb} = ${ra + rb}.` }, 3, () => ra + rb + U.pick([-100, 200]));
    return tag(q, '3.NBT.A.1', 200, 'number');
  }

  // ---------- Word problems ----------
  function storyOneStep() {
    const [k, he] = kid(), t = thing(), type = U.int(0, 2);
    if (type === 0) {
      const a = U.int(12, 58), b = U.int(11, 99 - a);
      return tag(U.num(`${k} has ${a} ${t}. Then ${he} gets ${b} more. How many ${t} does ${he} have now?`, a + b, { unit: t, fig: Fig.barModel('?', [a, b], t), meta: { kind: 'add', args: [a, b] }, hint: '"Gets more" means the group grows, so add.', why: `${a} + ${b} = ${a + b} ${t}.`, miss: missMap(addMisses(a, b), a + b) }), '2.OA.A.1', 176, 'algebra');
    }
    if (type === 1) {
      const a = U.int(35, 95), b = U.int(11, a - 8);
      return tag(U.num(`${k} has ${a} ${t}. ${MQ.cap(he)} gives ${b} to a friend. How many ${t} are left?`, a - b, { unit: t, fig: Fig.barModel(a, [b, '?'], t), meta: { kind: 'sub', args: [a, b] }, hint: '"Gives away" means the group gets smaller, so subtract.', why: `${a} − ${b} = ${a - b} ${t}.`, miss: missMap(subMisses(a, b), a - b) }), '2.OA.A.1', 178, 'algebra');
    }
    const [k2] = U.pick(MQ.KIDS.filter((x) => x[0] !== k));
    const a = U.int(30, 90), b = U.int(11, a - 6);
    return tag(U.num(`${k} has ${a} ${t}. ${k2} has ${b} ${t}. How many more ${t} does ${k} have?`, a - b, { unit: t, fig: Fig.compareBars(a, b, k, k2), meta: { kind: 'sub', args: [a, b] }, hint: '"How many more" means compare: subtract the smaller number from the bigger one.', why: `${a} − ${b} = ${a - b}. ${k} has ${a - b} more.`, miss: missMap([[a + b, `That is ${a} + ${b}. To compare, subtract.`], ...subMisses(a, b)], a - b) }), '2.OA.A.1', 182, 'algebra');
  }
  function storyTwoStep() {
    const [k, he] = kid(), t = thing();
    if (U.pick([true, false])) {
      const a = U.int(15, 45), b = U.int(11, 35), c = U.int(5, Math.min(30, a + b - 5));
      return tag(U.num(`${k} has ${a} ${t}. ${MQ.cap(he)} gets ${b} more, then gives away ${c}. How many ${t} does ${he} have now?`, a + b - c, { unit: t, fig: Fig.barModel('?', [a, b], `then ${c} are given away`), meta: { kind: 'sum', args: [a, b, -c] }, hint: 'Do one step at a time: first add, then subtract.', why: `${a} + ${b} = ${a + b}. ${a + b} − ${c} = ${a + b - c}.`, miss: missMap([[a + b, 'That is after the first step. Now take away the ones given away.'], [a + b + c, `Giving away means subtract ${c}.`]], a + b - c) }), '2.OA.A.1', 188, 'algebra');
    }
    const start = U.int(12, 50), more = U.int(11, 45);
    return tag(U.num(`${k} had some ${t}. Then ${he} got ${more} more. Now ${he} has ${start + more}. How many ${t} did ${he} have at first?`, start, { unit: t, fig: Fig.barModel(start + more, ['?', more], t), meta: { kind: 'sub', args: [start + more, more] }, hint: `Think: ? + ${more} = ${start + more}.`, why: `${start + more} − ${more} = ${start}. Check: ${start} + ${more} = ${start + more}.`, miss: missMap([[start + 2 * more, `That added ${more} again. The ${more} is already in the ${start + more}.`]], start) }), '2.OA.A.1', 190, 'algebra');
  }
  function storyGrade3() {
    const [k] = kid(), type = U.int(0, 2);
    if (type === 0) {
      const g = U.int(3, 9), n = U.int(3, 9), item = U.pick(['apples', 'pencils', 'cookies', 'stickers', 'marbles']), box = U.pick(['bags', 'boxes', 'jars', 'cups']);
      return tag(U.num(`There are ${g} ${box} with ${n} ${item} in each. How many ${item} are there in all?`, g * n, { unit: item, fig: Fig.groups(g, n, ICON[item]), meta: { kind: 'mul', args: [g, n] }, hint: `Equal groups: ${g} groups of ${n}. Multiply.`, why: `${g} × ${n} = ${g * n} ${item}.`, miss: missMap([[g + n, `That is ${g} + ${n}. There are ${g} equal groups of ${n}, so multiply.`]], g * n) }), '3.OA.A.3', 194, 'algebra');
    }
    if (type === 1) {
      const g = U.int(2, 9), n = U.int(2, 9), item = U.pick(['crackers', 'grapes', 'stickers', 'cards']);
      return tag(U.num(`${k} shares ${g * n} ${item} equally among ${g} friends. How many ${item} does each friend get?`, n, { unit: item, fig: Fig.groups(g, n, ICON[item]), meta: { kind: 'div', args: [g * n, g] }, hint: `Share ${g * n} into ${g} equal groups. Think: ${g} × ? = ${g * n}.`, why: `${g * n} ÷ ${g} = ${n}.`, miss: missMap([[g * n - g, `That is ${g * n} − ${g}. Sharing equally means divide.`]], n) }), '3.OA.A.3', 197, 'algebra');
    }
    const g = U.int(3, 6), n = U.int(4, 9), gave = U.int(2, g * n - 3);
    return tag(U.num(`${k} buys ${g} packs of crayons with ${n} crayons in each pack. ${k} gives away ${gave} crayons. How many crayons are left?`, g * n - gave, { unit: 'crayons', fig: Fig.groups(g, n, '🖍️'), meta: { kind: 'mulSub', args: [g, n, gave] }, hint: `Step 1: ${g} × ${n}. Step 2: subtract ${gave}.`, why: `${g} × ${n} = ${g * n}. ${g * n} − ${gave} = ${g * n - gave}.`, miss: missMap([[g * n, 'That is after step 1. Now subtract the crayons given away.'], [g + n - gave, `${g} packs of ${n} is ${g} × ${n}, not ${g} + ${n}.`]], g * n - gave) }), '3.OA.D.8', 201, 'algebra');
  }

  addSubject({
    id: 'add', name: 'Add & Subtract', icon: '➕', color: 'c1', blurb: 'Facts, tens and ones, and word problems.',
    skills: [
      { id: 'facts', name: 'Facts to 20', icon: '⚡', levels: [
        { title: 'Add and subtract within 20', std: '2.OA.B.2', desc: 'Make a ten, count on, think addition.', gen: () => U.mix(8, [fact20]) },
        { title: 'Missing numbers and fact families', std: '2.OA.B.2', desc: 'Find the missing part.', gen: () => U.mix(8, [missingAddend, missingAddend, factFamily]) },
        { title: 'Multiply and divide within 100', std: '3.OA.C.7', desc: 'Equal groups and sharing.', gen: () => U.mix(8, [mulFact]) },
      ] },
      { id: 'addsub', name: 'Add & subtract within 100', icon: '🧮', levels: [
        { title: 'No regrouping', std: '2.NBT.B.5', desc: 'Tens with tens, ones with ones.', gen: () => U.mix(8, [addNoRegroup, subNoRegroup]) },
        { title: 'With regrouping', std: '2.NBT.B.5 · 2.NBT.B.6', desc: '10 ones make 1 ten.', gen: () => U.mix(8, [() => addRegroup(true), () => addRegroup(false), () => subRegroup(true), () => subRegroup(false), addFour]) },
        { title: 'Within 1,000', std: '3.NBT.A.2', desc: 'Regroup tens and hundreds.', gen: () => U.mix(8, [grade3AddSub]) },
      ] },
      { id: 'big', name: 'Numbers to 1,000', icon: '💯', levels: [
        { title: 'Add or take away 10 and 100', std: '2.NBT.B.8', desc: 'Change one place at a time.', gen: () => U.mix(8, [tenOrHundred]) },
        { title: 'Three-digit adding and subtracting', std: '2.NBT.B.7', desc: 'Hundreds, tens, and ones.', gen: () => U.mix(8, [() => threeDigit('add'), () => threeDigit('sub')]) },
        { title: 'Round to estimate', std: '3.NBT.A.1', desc: 'Round, then add.', gen: () => U.mix(8, [estimate]) },
      ] },
      { id: 'story', name: 'Word problems', icon: '📖', levels: [
        { title: 'One-step problems', std: '2.OA.A.1', desc: 'Add to, take from, compare.', gen: () => U.mix(8, [storyOneStep]) },
        { title: 'Two-step problems', std: '2.OA.A.1', desc: 'Two steps, or a missing start.', gen: () => U.mix(8, [storyTwoStep]) },
        { title: 'Multiply and divide stories', std: '3.OA.A.3 · 3.OA.D.8', desc: 'Equal groups and sharing.', gen: () => U.mix(8, [storyGrade3]) },
      ] },
    ],
  });
})();
