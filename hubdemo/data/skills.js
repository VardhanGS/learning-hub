// Hub Demo content: three skills × three levels. Every answer is computed here, never typed by hand, and each
// question carries meta {kind, args} so tools/validate.js can recompute it independently.
// Standards: 2023 NJSLS-Mathematics (codes built from domain, cluster letter, and number, e.g. 2.NBT.B.5).
(function () {
  const KIDS = [['Maya', 'she'], ['Leo', 'he'], ['Aarav', 'he'], ['Sofia', 'she'], ['Kenji', 'he'], ['Zara', 'she'], ['Omar', 'he'], ['Lily', 'she'], ['Diego', 'he'], ['Ava', 'she'], ['Noah', 'he'], ['Priya', 'she']];
  const THINGS = ['stickers', 'marbles', 'shells', 'crayons', 'stamps', 'acorns', 'beads', 'cards', 'rocks', 'buttons'];
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const tag = (q, std, rit, goal) => Object.assign(q, { std, rit, goal });
  const tens = (n) => Math.floor(n / 10) % 10, ones = (n) => n % 10;
  const pl = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  // ---------- Skill 1: Add and subtract ----------
  // The sum of a + b with the ones NOT regrouped (the classic "forgot to carry" answer).
  const noCarry = (a, b) => Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10 + ((a + b) % 10);
  const addMisses = (a, b) => {
    const s = a + b, os = ones(a) + ones(b);
    const w = [];
    if (os >= 10) {
      w.push([noCarry(a, b), `It looks like the 10 ones were not regrouped. ${ones(a)} + ${ones(b)} = ${os}, which is 1 ten and ${pl(os - 10, 'one')}.`]);
      w.push([`${Math.floor(a / 10) + Math.floor(b / 10)}${os}`, `It looks like all ${os} ones were written down. Trade 10 ones for 1 ten first.`]);
    }
    if (b < 10) w.push([a + 10 * b, `It looks like ${b} was added to the tens. ${b} is ${pl(b, 'one')}, so add it to the ones.`]);
    w.push([s + 10, 'That is 10 too many. Check how many tens you carried.']);
    w.push([Math.abs(a - b), `That is ${Math.max(a, b)} − ${Math.min(a, b)}. The question asks you to add.`]);
    return w;
  };

  function addNoRegroup() {
    const a = U.intWhere(11, 87, (v) => v % 10 <= 8);
    const b = U.intWhere(2, 99 - a, (x) => ones(a) + ones(x) < 10 && x !== 10 && x % 10 !== 0);
    const q = U.num(`${a} + ${b} = ?`, a + b, { meta: { kind: 'add', args: [a, b] }, hint: 'Add the ones first. Then add the tens.', why: `${a} + ${b} = ${a + b}`, fig: Fig.addBlocks(a, b) });
    q.miss = Object.fromEntries(addMisses(a, b).filter(([v]) => String(v) !== String(a + b)).map(([v, w]) => [String(v), w]));
    return tag(q, '2.NBT.B.5', 172, 'number');
  }
  function addStory(regroup) {
    const [kid, he] = U.pick(KIDS), thing = U.pick(THINGS);
    const a = U.intWhere(12, 68, (v) => v % 10 >= 1 && v % 10 <= 8);
    const b = U.intWhere(11, 99 - a, (x) => (regroup ? ones(a) + ones(x) >= 10 : ones(a) + ones(x) < 10) && x % 10 !== 0);
    const q = U.num(`${kid} has ${a} ${thing}. Then ${he} gets ${b} more. How many ${thing} does ${kid} have now?`, a + b,
      { unit: thing, meta: { kind: 'add', args: [a, b] }, hint: '"More" means the group gets bigger, so add.', why: `${a} + ${b} = ${a + b} ${thing}.` });
    q.miss = Object.fromEntries(addMisses(a, b).filter(([v]) => String(v) !== String(a + b)).map(([v, w]) => [String(v), w]));
    return tag(q, '2.OA.A.1', regroup ? 186 : 176, 'algebra');
  }
  function addRegroupMC() {
    const a = U.intWhere(15, 79, (v) => v % 10 >= 1);
    const b = U.intWhere(12, 99 - a, (x) => ones(a) + ones(x) >= 10 && x % 10 !== 0);
    return tag(U.mcMiss(`${a} + ${b} = ?`, a + b, addMisses(a, b), { meta: { kind: 'add', args: [a, b] }, hint: 'Add the ones. If there are 10 or more, regroup 10 ones as 1 ten.', why: `${ones(a)} + ${ones(b)} = ${ones(a) + ones(b)} ones → 1 ten and ${pl(ones(a) + ones(b) - 10, 'one')}. ${a} + ${b} = ${a + b}.` }, 3, () => a + b + U.pick([-2, -1, 1, 2, 9, 11])), '2.NBT.B.5', 184, 'number');
  }
  function addRegroupNum() {
    const a = U.intWhere(15, 79, (v) => v % 10 >= 1);
    const b = U.intWhere(12, 99 - a, (x) => ones(a) + ones(x) >= 10 && x % 10 !== 0);
    const q = U.num(`${a} + ${b} = ?`, a + b, { meta: { kind: 'add', args: [a, b] }, hint: 'Add the ones. If there are 10 or more, regroup 10 ones as 1 ten.', why: `${a} + ${b} = ${a + b}` });
    q.miss = Object.fromEntries(addMisses(a, b).filter(([v]) => String(v) !== String(a + b)).map(([v, w]) => [String(v), w]));
    return tag(q, '2.NBT.B.5', 185, 'number');
  }
  // Grade 3: subtract within 1000 with regrouping.
  function subGrade3(asMC) {
    const a = U.intWhere(302, 951, (v) => v % 10 <= 8);
    const b = U.intWhere(118, a - 25, (x) => ones(x) > ones(a));
    const d = a - b;
    // "Smaller from bigger" in every place instead of regrouping.
    const sfb = [100, 10, 1].reduce((acc, p) => acc + Math.abs(Math.floor(a / p) % 10 - Math.floor(b / p) % 10) * p, 0);
    const w = [
      [sfb, 'In each place the smaller digit was taken from the bigger one. When the top digit is smaller, regroup: trade 1 ten for 10 ones.'],
      [d + 10, 'A ten was regrouped, but it was not taken away from the tens place.'],
      [a + b, `That is ${a} + ${b}. The question asks you to subtract.`],
      [d - 10, 'That is 10 too few. Check the tens place.'],
    ];
    const extra = { meta: { kind: 'sub', args: [a, b] }, hint: `${ones(a)} is less than ${ones(b)}, so regroup 1 ten as 10 ones first.`, why: `${a} − ${b} = ${d}` };
    if (asMC) return tag(U.mcMiss(`${a} − ${b} = ?`, d, w, extra, 3, () => d + U.pick([-100, 100, -1, 1])), '3.NBT.A.2', 197, 'number');
    const q = U.num(`${a} − ${b} = ?`, d, extra);
    q.miss = Object.fromEntries(w.filter(([v]) => v !== d).map(([v, why]) => [String(v), why]));
    return tag(q, '3.NBT.A.2', 199, 'number');
  }
  function addGrade3() {
    const a = U.intWhere(208, 689, (v) => v % 10 >= 1);
    const b = U.intWhere(115, 999 - a, (x) => ones(a) + ones(x) >= 10 && x % 10 !== 0);
    const q = U.num(`${a} + ${b} = ?`, a + b, { meta: { kind: 'add', args: [a, b] }, hint: 'Line up hundreds, tens, and ones. Regroup when a place has 10 or more.', why: `${a} + ${b} = ${a + b}` });
    q.miss = Object.fromEntries([[a + b - 10, 'It looks like the ones were not regrouped into a ten.'], [a + b - 100, 'It looks like the tens were not regrouped into a hundred.'], [a - b, 'That is the difference. The question asks you to add.']]
      .filter(([v]) => v !== a + b && v >= 0).map(([v, w]) => [String(v), w]));
    return tag(q, '3.NBT.A.2', 195, 'number');
  }

  addSubject({
    id: 'add', name: 'Add & Subtract', icon: '➕', color: 'c1', blurb: 'Add and subtract with tens and ones.',
    skills: [{
      id: 'addsub', name: 'Add & subtract', icon: '🧮',
      levels: [
        { title: 'Add without regrouping', std: '2.NBT.B.5 · 2.OA.A.1', desc: 'Add tens to tens and ones to ones.', gen: () => U.mix(8, [addNoRegroup, addNoRegroup, () => addStory(false)]) },
        { title: 'Add with regrouping', std: '2.NBT.B.5 · 2.OA.A.1', desc: '10 ones make 1 ten.', gen: () => U.mix(8, [addRegroupMC, addRegroupNum, () => addStory(true)]) },
        { title: 'Add and subtract within 1,000', std: '3.NBT.A.2', desc: 'Regroup tens and hundreds.', gen: () => U.mix(8, [() => subGrade3(true), () => subGrade3(false), addGrade3]) },
      ],
    }],
  });

  // ---------- Skill 2: Number lines ----------
  function placeWhole() {
    const n = U.pick([1, 2, 3, 4, 6, 7, 8, 9]);
    return tag(U.line(`Place ${n} on the number line.`, n, { min: 0, max: 10, labels: [0, 5, 10], majorEvery: 5 }, { meta: { kind: 'value', args: [n] }, hint: 'Start at 0 and count the jumps.', why: `${n} is ${pl(n, 'jump')} from 0.` }), '2.M.B.6', 168, 'geometry');
  }
  function placeTens() {
    const n = U.pick([10, 20, 30, 40, 60, 70, 80, 90]);
    return tag(U.line(`Place ${n} on the number line.`, n, { min: 0, max: 100, step: 10, labels: [0, 50, 100], labelEvery: 50, majorEvery: 50 }, { meta: { kind: 'value', args: [n] }, hint: 'Each jump is 10. Count by tens.', why: `Count by tens: ${Array.from({ length: n / 10 }, (_, i) => (i + 1) * 10).join(', ')}.` }), '2.M.B.6', 178, 'geometry');
  }
  function placeSum() {
    const a = U.int(4, 9), b = U.int(3, 9);
    return tag(U.line(`Show ${a} + ${b} on the number line. Where do you land?`, a + b, { min: 0, max: 20, labelEvery: 5, majorEvery: 5 }, { meta: { kind: 'add', args: [a, b] }, hint: `Start at ${a}, then make ${b} jumps forward.`, why: `${a} + ${b} = ${a + b}` }), '2.M.B.6', 182, 'geometry');
  }
  function placeFraction() {
    const d = U.pick([2, 3, 4, 6, 8]);
    const max = U.pick([1, 1, 2]);
    const n = U.intWhere(1, d * max - 1, (x) => x % d !== 0);
    return tag(U.line(`Place ${T(`\\frac{${n}}{${d}}`)} on the number line.`, `${n}/${d}`, { min: 0, max, den: d }, { meta: { kind: 'frac', args: [n, d] }, hint: `Each whole is cut into ${d} equal parts. Count ${pl(n, 'part')} from 0.`, why: `${n}/${d} is ${pl(n, 'jump')} of 1/${d} from 0.` }), '3.NF.A.2', 196, 'number');
  }
  addSubject({
    id: 'line', name: 'Number Lines', icon: '📏', color: 'c2', blurb: 'Find numbers and fractions on a line.',
    skills: [{
      id: 'nline', name: 'Number lines', icon: '📍',
      levels: [
        { title: 'Numbers to 10', std: '2.M.B.6', desc: 'Count the jumps from 0.', gen: () => U.mix(8, [placeWhole]) },
        { title: 'Tens and sums', std: '2.M.B.6', desc: 'Count by tens, and jump to add.', gen: () => U.mix(8, [placeTens, placeSum]) },
        { title: 'Fractions on a number line', std: '3.NF.A.2', desc: 'Cut each whole into equal parts.', gen: () => U.mix(8, [placeFraction]) },
      ],
    }],
  });

  // ---------- Skill 3: Fractions ----------
  const WORD = { 2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['fourth', 'fourths'], 6: ['sixth', 'sixths'], 8: ['eighth', 'eighths'] };
  const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const fracWords = (n, d) => `${NUMW[n]} ${WORD[d][n === 1 ? 0 : 1]}`;
  function shadeWords(maxN) {
    const d = U.pick([2, 3, 4]), n = maxN === 1 ? 1 : U.int(1, d - 1);
    return tag(U.shade(`Shade ${fracWords(n, d)} of the circle.`, n, { shape: 'circle', parts: d }, { meta: { kind: 'count', args: [n] }, hint: `There are ${d} equal parts. Shade ${n} of them.`, why: `${cap(fracWords(n, d))} means ${n} of ${d} equal parts.` }), '2.G.A.3', maxN === 1 ? 166 : 176, 'geometry');
  }
  function shadeBar(maxN) {
    const d = U.pick([2, 3, 4]), n = maxN === 1 ? 1 : U.int(1, d - 1);
    return tag(U.shade(`Shade ${fracWords(n, d)} of the rectangle.`, n, { shape: 'bar', parts: d }, { meta: { kind: 'count', args: [n] }, hint: `There are ${d} equal parts. Shade ${n} of them.`, why: `${cap(fracWords(n, d))} means ${n} of ${d} equal parts.` }), '2.G.A.3', maxN === 1 ? 166 : 177, 'geometry');
  }
  function nameShaded() {
    const d = U.pick([2, 3, 4]), shape = U.pick(['circle', 'bar']);
    const a = `one ${WORD[d][0]}`;
    const w = [];
    if (d > 2) w.push([`one ${WORD[d - 1][0]}`, `Only the shaded part was compared with the unshaded parts. Count ALL the equal parts: there are ${d}.`]);
    w.push(...[2, 3, 4].filter((x) => x !== d && x !== d - 1).map((x) => [`one ${WORD[x][0]}`, `Count the equal parts. There are ${d}, not ${x}.`]));
    return tag(U.mcMiss('What part of the shape is shaded?', a, w, { fig: Fig.fraction(shape, d, 1), meta: { kind: 'name', args: [1, d] }, hint: 'Count all the equal parts. That tells you halves, thirds, or fourths.', why: `The shape has ${d} equal parts and 1 is shaded: ${a}.` }, 2), '2.G.A.3', 170, 'geometry');
  }
  function wholeParts() {
    const d = U.pick([2, 3, 4]);
    return tag(U.num(`How many ${WORD[d][1]} make one whole?`, d, { meta: { kind: 'value', args: [d] }, fig: Fig.fraction(U.pick(['circle', 'bar']), d, d), hint: `Count the ${WORD[d][1]} in the whole shape.`, why: `${cap(NUMW[d])} ${WORD[d][1]} make one whole.` }), '2.G.A.3', 175, 'geometry');
  }
  function shadeGrade3() {
    const d = U.pick([3, 4, 6, 8]), n = U.int(1, d - 1);
    const shape = d >= 6 && U.pick([true, false]) ? 'grid' : U.pick(['bar', 'circle']);
    return tag(U.shade(`Shade ${T(`\\frac{${n}}{${d}}`)} of the ${shape === 'circle' ? 'circle' : 'rectangle'}.`, n, { shape, parts: d, rows: 2 }, { meta: { kind: 'count', args: [n] }, hint: `The bottom number (${d}) is how many equal parts. The top number (${n}) is how many to shade.`, why: `${n}/${d} means ${n} of ${d} equal parts.` }), '3.NF.A.1', 190, 'number');
  }
  function equalHalf() {
    const right = U.sample(['2/4', '3/6', '4/8'], U.int(2, 3));
    const wrong = U.sample(['1/3', '2/3', '1/4', '3/4', '2/6', '5/8', '3/8'], 3);
    return tag(U.multi(`Choose all the fractions equal to ${T('\\frac{1}{2}')}.`, right.map((f) => T(`\\frac{${f.split('/')[0]}}{${f.split('/')[1]}}`)), wrong.map((f) => T(`\\frac{${f.split('/')[0]}}{${f.split('/')[1]}}`)), { meta: { kind: 'equivHalf', args: [] }, hint: 'A fraction equals one half when the top number is half of the bottom number.', why: '2/4, 3/6, and 4/8 are all equal to 1/2: the top is half of the bottom.' }), '3.NF.A.3', 198, 'number');
  }
  addSubject({
    id: 'frac', name: 'Fractions', icon: '🍕', color: 'c3', blurb: 'Halves, thirds, fourths, and more.',
    skills: [{
      id: 'fparts', name: 'Equal parts', icon: '🥧',
      levels: [
        { title: 'Halves, thirds, fourths', std: '2.G.A.3', desc: 'Name and shade one equal part.', gen: () => U.mix(8, [() => shadeWords(1), () => shadeBar(1), nameShaded]) },
        { title: 'Parts of a whole', std: '2.G.A.3', desc: 'Two thirds, three fourths, and wholes.', gen: () => U.mix(8, [() => shadeWords(3), () => shadeBar(3), wholeParts]) },
        { title: 'Fractions and equal fractions', std: '3.NF.A.1 · 3.NF.A.3', desc: 'Read fractions like 3/4, and find equal ones.', gen: () => U.mix(8, [shadeGrade3, shadeGrade3, equalHalf]) },
      ],
    }],
  });
})();
