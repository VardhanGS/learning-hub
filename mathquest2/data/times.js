// TWO-DIGIT SUBTRACTION (a new skill in Add & Subtract) and MULTIPLICATION (a new subject) — added 2026-10-28 at the
// family's request. Grade 2: 2.NBT.B.5, 2.NBT.A.2, 2.OA.C.4, 2.OA.A.1; Grade 3 level-ups: 3.NBT.A.2, 3.OA.A.3,
// 3.OA.A.4, 3.OA.C.7. Every answer is computed here; meta {kind, args} lets tools/validate.js recompute it.
(function () {
  const { pl, tag, ones, tens, kid, thing, cap, subMisses, missMap } = MQ;
  const ICON = ['🍎', '⭐', '🔵', '🍪', '🐞', '🌼', '🚗', '🐟'];

  // ---------- Two-digit subtraction ----------
  // Level 1: no regrouping (and subtracting whole tens), with base-ten blocks.
  function subTensOnes(asMC) {
    if (U.int(0, 3) === 0) { // whole tens: 70 − 30, 56 − 20
      const a = U.intWhere(30, 98, (v) => tens(v) >= 3), t = U.int(1, tens(a) - 1) * 10;
      const q = U.num(`${a} − ${t} = ?`, a - t, { fig: Fig.blocks(a), meta: { kind: 'sub', args: [a, t] }, hint: `${t} is ${pl(t / 10, 'ten')}. Take away ${pl(t / 10, 'rod')}; the ones stay the same.`, why: `${pl(tens(a), 'ten')} − ${pl(t / 10, 'ten')} = ${pl(tens(a) - t / 10, 'ten')}. ${a} − ${t} = ${a - t}.` });
      q.miss = missMap([[a - t / 10, `That took away ${t / 10} ones. ${t} means ${pl(t / 10, 'ten')}.`], [a + t, 'That is the sum. Take away instead.']], a - t);
      return tag(q, '2.NBT.B.5', 170, 'number');
    }
    const a = U.intWhere(25, 98, (v) => ones(v) >= 2 && tens(v) >= 2), b = U.intWhere(11, a - 12, (x) => ones(x) <= ones(a) && ones(x) >= 1 && tens(x) >= 1);
    const extra = { fig: Fig.blocks(a), meta: { kind: 'sub', args: [a, b] }, hint: 'Take away the ones first. Then take away the tens.', why: `Ones: ${ones(a)} − ${ones(b)} = ${ones(a) - ones(b)}. Tens: ${tens(a)} − ${tens(b)} = ${tens(a) - tens(b)}. ${a} − ${b} = ${a - b}.` };
    if (asMC) return tag(U.mcMiss(`${a} − ${b} = ?`, a - b, subMisses(a, b), extra, 3, () => Math.max(1, a - b + U.pick([-11, -10, -1, 1, 10, 11]))), '2.NBT.B.5', 173, 'number');
    return tag(U.num(`${a} − ${b} = ?`, a - b, { ...extra, miss: missMap(subMisses(a, b), a - b) }), '2.NBT.B.5', 174, 'number');
  }
  // Level 2: trade a ten for 10 ones (2-digit − 2-digit, and 2-digit − 1-digit across a ten), plus take-away stories.
  function subTrade(asMC) {
    const one = U.int(0, 2) === 0;
    const a = U.intWhere(21, 97, (v) => ones(v) <= 7 && tens(v) >= 2);
    const b = one ? U.intWhere(3, 9, (x) => x > ones(a)) : U.intWhere(12, a - 5, (x) => ones(x) > ones(a) && tens(x) >= 1);
    const d = a - b;
    const extra = { fig: Fig.blocks(a), meta: { kind: 'sub', args: [a, b] }, hint: `${ones(a)} ones is less than ${ones(b)}. Trade 1 ten for 10 ones first.`,
      why: `Trade 1 ten: ${pl(tens(a), 'ten')} ${pl(ones(a), 'one')} = ${pl(tens(a) - 1, 'ten')} ${ones(a) + 10} ones. Ones: ${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}. Tens: ${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}. So ${a} − ${b} = ${d}.` };
    if (asMC) return tag(U.mcMiss(`${a} − ${b} = ?`, d, subMisses(a, b), extra, 3, () => Math.max(1, d + U.pick([-11, -10, -1, 1, 9, 10]))), '2.NBT.B.5', 186, 'number');
    return tag(U.num(`${a} − ${b} = ?`, d, { ...extra, miss: missMap(subMisses(a, b), d) }), '2.NBT.B.5', 187, 'number');
  }
  function subStory() {
    const [k, he] = kid(), t = thing();
    const a = U.intWhere(31, 95, (v) => ones(v) <= 7), b = U.intWhere(12, a - 6, (x) => ones(x) > ones(a) && x % 10 !== 0);
    if (U.pick([true, false])) {
      const q = U.num(`${k} has ${a} ${t}. ${cap(he)} gives away ${b}. How many ${t} are left?`, a - b, { unit: t, fig: Fig.barModel(a, [b, '?'], t), meta: { kind: 'sub', args: [a, b] }, hint: '"Gives away" makes the group smaller: subtract. Trade a ten if you need more ones.', why: `${a} − ${b} = ${a - b} ${t}.` });
      q.miss = missMap(subMisses(a, b), a - b);
      return tag(q, '2.OA.A.1', 186, 'algebra');
    }
    const [k2] = U.pick(MQ.KIDS.filter((x) => x[0] !== k));
    const q = U.num(`${k} has ${a} ${t}. ${k2} has ${b}. How many more ${t} does ${k} have than ${k2}?`, a - b, { unit: t, fig: Fig.compareBars(a, b, k, k2), meta: { kind: 'sub', args: [a, b] }, hint: '"How many more" means compare: subtract the smaller number from the bigger one.', why: `${a} − ${b} = ${a - b} more ${t}.` });
    q.miss = missMap(subMisses(a, b), a - b);
    return tag(q, '2.OA.A.1', 188, 'algebra');
  }
  // Level 3 (Grade 3): subtract within 1,000 across a zero (400 − 136, 503 − 247), shown in a place-value chart.
  function subAcrossZero(asMC) {
    const tensZero = U.pick([true, false]);
    const a = tensZero ? U.int(2, 9) * 100 + U.int(1, 8) : U.int(2, 9) * 100; // 503 or 400
    const b = U.intWhere(101, a - 50, (x) => ones(x) > ones(a) && tens(x) >= 1);
    const d = a - b;
    const extra = { fig: Fig.placeChart([a, b], '−'), meta: { kind: 'sub', args: [a, b] }, hint: `There are no tens to trade, so trade 1 hundred for 10 tens first, then 1 ten for 10 ones.`,
      why: `After trading, ${a} = ${pl(Math.floor(a / 100) - 1, 'hundred')}, 9 tens, ${ones(a) + 10} ones. Then subtract each place: ${a} − ${b} = ${d}.` };
    const w = subMisses(a, b).concat([[d + 100, 'A hundred was traded but not taken away from the hundreds.']]);
    if (asMC) return tag(U.mcMiss(`${a} − ${b} = ?`, d, w, extra, 3, () => Math.max(1, d + U.pick([-100, -10, 10, 90, 100]))), '3.NBT.A.2', 204, 'number');
    return tag(U.num(`${a} − ${b} = ?`, d, { ...extra, miss: missMap(w, d) }), '3.NBT.A.2', 205, 'number');
  }
  function checkByAdding() {
    const a = U.intWhere(41, 96, (v) => ones(v) <= 6), b = U.intWhere(13, a - 8, (x) => ones(x) > ones(a)), d = a - b;
    const q = U.mcMiss(`${a} − ${b} = ${d}. Which addition checks this answer?`, `${d} + ${b} = ${a}`,
      [[`${a} + ${b} = ${a + b}`, 'To check, add the answer back to the number you took away.'], [`${d} + ${a} = ${d + a}`, `Add the answer to ${b}, the number you took away.`], [`${d} + ${b} = ${a + 1}`, `Look again: ${d} + ${b} = ${a}.`]],
      { fig: Fig.bond(a, b, d), meta: { kind: 'checkSub', args: [a, b] }, hint: 'Answer + the number you took away = the number you started with.', why: `${d} + ${b} = ${a}, so ${a} − ${b} = ${d} is right.` });
    return tag(q, '2.NBT.B.9', 190, 'number');
  }

  const add = SUBJECTS.find((s) => s.id === 'add');
  add.skills.splice(2, 0, { id: 'sub2', name: 'Subtract two-digit numbers', icon: '➖', levels: [
    { title: 'Take away tens and ones', std: '2.NBT.B.5', desc: 'Ones first, then tens.', gen: () => U.mix(8, [() => subTensOnes(false), () => subTensOnes(true)]) },
    { title: 'Trade a ten', std: '2.NBT.B.5 · 2.NBT.B.9 · 2.OA.A.1', desc: 'Not enough ones? Trade 1 ten for 10 ones.', gen: () => U.mix(8, [() => subTrade(false), () => subTrade(true), subStory, checkByAdding]) },
    { title: 'Subtract across zeros', std: '3.NBT.A.2', desc: '400 − 136: trade a hundred, then a ten.', gen: () => U.mix(8, [() => subAcrossZero(false), () => subAcrossZero(true)]) },
  ] });

  // ---------- Multiplication ----------
  // Equal groups: count by 2s, 5s, 10s (Grade 2), repeated addition and arrays (Grade 2), times sentences (Grade 3).
  function groupsCount() {
    const n = U.pick([2, 5, 10, 2, 5, 3]), g = U.int(2, n === 10 ? 6 : 5), icon = U.pick(ICON);
    const q = U.num(`There are ${g} groups with ${n} in each group. How many in all?`, g * n, { fig: Fig.groups(g, n, icon), meta: { kind: 'mul', args: [g, n] }, hint: `Skip count by ${n}s: ${Array.from({ length: Math.min(g, 3) }, (_, i) => n * (i + 1)).join(', ')}, …`, why: `Count by ${n}s: ${Array.from({ length: g }, (_, i) => n * (i + 1)).join(', ')}. That is ${g * n}.` });
    q.miss = missMap([[g + n, `That is ${g} + ${n}. Count every item in every group.`], [(g - 1) * n, `That is ${g - 1} groups. Count all ${g}.`], [(g + 1) * n, `That is ${g + 1} groups. Count only ${g}.`]], g * n);
    return tag(q, '2.OA.C.4 · 2.NBT.A.2', 166, 'algebra');
  }
  function groupsAddition() {
    const g = U.int(2, 5), n = U.intWhere(2, 5, (x) => x !== g);
    const right = Array(g).fill(n).join(' + ');
    const q = U.mcMiss(`Which addition matches the picture?`, right, [[Array(n).fill(g).join(' + '), `That is ${n} groups of ${g}. The picture has ${g} groups of ${n}.`], [`${g} + ${n}`, 'Add one number for each group.'], [Array(g + 1).fill(n).join(' + '), `Count the groups again: there are ${g}.`]],
      { fig: Fig.groups(g, n, U.pick(ICON)), meta: { kind: 'repAdd', args: [g, n] }, hint: 'Write one number for each group: how many are in that group.', why: `${g} groups of ${n}: ${right} = ${g * n}.` });
    return tag(q, '2.OA.C.4', 170, 'algebra');
  }
  function arrayTotal() {
    const r = U.int(2, 5), c = U.int(2, 5);
    const q = U.num(`This array has ${pl(r, 'row')} with ${c} in each row. How many in all?`, r * c, { fig: Fig.array(r, c), meta: { kind: 'mul', args: [r, c] }, hint: `Add the rows: ${Array(r).fill(c).join(' + ')}.`, why: `${Array(r).fill(c).join(' + ')} = ${r * c}.` });
    q.miss = missMap([[r + c, `That is ${r} + ${c}. Add ${c} once for every row.`], [r * c - c, 'One row was missed.']], r * c);
    return tag(q, '2.OA.C.4', 174, 'algebra');
  }
  function arraySentence() {
    const r = U.int(2, 5), c = U.intWhere(2, 5, (x) => x !== r);
    const right = `${Array(r).fill(c).join(' + ')} = ${r * c}`;
    const q = U.mcMiss('Which number sentence matches this array?', right, [[`${Array(r + 1).fill(c).join(' + ')} = ${(r + 1) * c}`, `Count the rows again: there are ${r}.`], [`${r} + ${c} = ${r + c}`, 'Add one number for each row.'], [`${Array(r).fill(c).join(' + ')} = ${r * c + c}`, 'Check the total.']],
      { fig: Fig.array(r, c), meta: { kind: 'arrayEq', args: [r, c] }, hint: `Each row has ${c}. Write ${c} once for every row.`, why: `${pl(r, 'row')} of ${c}: ${right}.` });
    return tag(q, '2.OA.C.4', 178, 'algebra');
  }
  function timesSentence() {
    const g = U.int(2, 6), n = U.intWhere(2, 9, (x) => x !== g), icon = U.pick(ICON);
    if (U.pick([true, false])) {
      const q = U.mcMiss(`${g} groups of ${n}. Which multiplication matches?`, `${g} × ${n}`, [[`${g} + ${n}`, '× means equal groups; + just joins two numbers.'], [`${g} × ${g}`, `Each group has ${n}, not ${g}.`], [`${n} − ${g}`, 'Equal groups means multiply.']],
        { fig: Fig.groups(g, n, icon), meta: { kind: 'mulStory', args: [g, n] }, hint: `${g} × ${n} means ${g} groups of ${n}.`, why: `${g} groups of ${n} is ${g} × ${n} = ${g * n}.` });
      return tag(q, '3.OA.A.3', 188, 'algebra');
    }
    const box = U.pick(['bags', 'boxes', 'plates', 'vases']), item = U.pick(['apples', 'crayons', 'cookies', 'flowers']);
    const q = U.num(`There are ${g} ${box} with ${n} ${item} in each. How many ${item} are there in all?`, g * n, { unit: item, fig: Fig.groups(g, n, icon), meta: { kind: 'mul', args: [g, n] }, hint: `${g} groups of ${n}: multiply ${g} × ${n}, or skip count by ${n}s.`, why: `${g} × ${n} = ${g * n} ${item}.` });
    q.miss = missMap([[g + n, `That is ${g} + ${n}. There are ${g} equal groups of ${n}: multiply.`], [(g - 1) * n, 'One group was missed.']], g * n);
    return tag(q, '3.OA.A.3', 190, 'algebra');
  }
  // Times tables: ×2, ×5, ×10 by skip counting (Grade 2), ×3 and ×4 with turn-around facts, all facts to 10 × 10.
  function factQ(table, std, rit) {
    const a = U.int(1, 10), b = U.pick(table), [x, y] = U.pick([true, false]) ? [a, b] : [b, a];
    const asMC = U.int(0, 2) === 0;
    const extra = { fig: b <= 5 && a <= 6 ? Fig.array(Math.min(x, y), Math.max(x, y)) : Fig.jumps(0, b, Math.min(a, 6)), meta: { kind: 'mul', args: [x, y] }, hint: `Skip count by ${b}s ${pl(a, 'time')}.`, why: `${x} × ${y} = ${x * y}. Skip count by ${b}s: ${Array.from({ length: Math.min(a, 6) }, (_, i) => b * (i + 1)).join(', ')}${a > 6 ? ', …' : ''}.` };
    const w = [[x + y, `That is ${x} + ${y}. × means equal groups.`], [x * y + b, 'That is one group too many.'], [Math.max(1, x * y - b), 'That is one group too few.']];
    if (asMC) return tag(U.mcMiss(`${x} × ${y} = ?`, x * y, w, extra, 3, () => Math.max(1, x * y + U.pick([-2, -1, 1, 2]))), std, rit, 'algebra');
    return tag(U.num(`${x} × ${y} = ?`, x * y, { ...extra, miss: missMap(w, x * y) }), std, rit, 'algebra');
  }
  function turnAround() {
    const a = U.int(2, 9), b = U.intWhere(2, 9, (x) => x !== a);
    const q = U.num(`${a} × ${b} = ${a * b}. So what is ${b} × ${a}?`, a * b, { fig: Fig.pair(Fig.array(a, b), Fig.array(b, a)), meta: { kind: 'mul', args: [b, a] }, hint: 'Turn the array on its side: it has the same number of dots.', why: `Turning the factors around does not change the product: ${b} × ${a} = ${a * b}.` });
    q.miss = missMap([[a + b, 'Multiply, do not add.']], a * b);
    return tag(q, '3.OA.C.7', 192, 'algebra');
  }
  function missingFactor() {
    const a = U.int(2, 10), b = U.int(2, 10), form = U.pick([0, 1]);
    const q = U.num(`What number goes in the box?\n${form ? `${a} × □ = ${a * b}` : `□ × ${b} = ${a * b}`}`, form ? b : a, { fig: Fig.array(a, b), meta: { kind: 'div', args: [a * b, form ? a : b] }, hint: form ? `Count by ${a}s until you reach ${a * b}. How many jumps?` : `Count by ${b}s until you reach ${a * b}. How many jumps?`, why: `${a} × ${b} = ${a * b}, so the box is ${form ? b : a}.` });
    q.miss = missMap([[a * b - (form ? a : b), 'That subtracts. Think: what times the number makes the total?']], form ? b : a);
    return tag(q, '3.OA.A.4', 200, 'algebra');
  }

  addSubject({
    id: 'times', name: 'Multiplication', icon: '✖️', color: 'c6', blurb: 'Equal groups, arrays, and times tables.',
    skills: [
      { id: 'mgroups', name: 'Equal groups', icon: '🔵', levels: [
        { title: 'Count equal groups', std: '2.OA.C.4 · 2.NBT.A.2', desc: 'Skip count by 2s, 5s, and 10s.', gen: () => U.mix(8, [groupsCount, groupsCount, groupsAddition]) },
        { title: 'Arrays and adding again', std: '2.OA.C.4', desc: 'Rows of the same size.', gen: () => U.mix(8, [arrayTotal, arraySentence, groupsAddition]) },
        { title: 'Times sentences', std: '3.OA.A.3', desc: '3 groups of 4 is 3 × 4.', gen: () => U.mix(8, [timesSentence]) },
      ] },
      { id: 'mfacts', name: 'Times tables', icon: '⚡', levels: [
        { title: 'Times 2, 5, and 10', std: '2.NBT.A.2 · 2.OA.C.4', desc: 'Skip count to multiply.', gen: () => U.mix(8, [() => factQ([2, 5, 10], '2.NBT.A.2 · 2.OA.C.4', 172)]) },
        { title: 'Times 3 and 4, turn-around facts', std: '3.OA.C.7', desc: '3 × 4 = 4 × 3.', gen: () => U.mix(8, [() => factQ([3, 4], '3.OA.C.7', 190), turnAround]) },
        { title: 'All the facts to 10 × 10', std: '3.OA.C.7 · 3.OA.A.4', desc: 'Facts and missing factors.', gen: () => U.mix(8, [() => factQ([2, 3, 4, 5, 6, 7, 8, 9, 10], '3.OA.C.7', 198), missingFactor]) },
      ] },
    ],
  });
})();
