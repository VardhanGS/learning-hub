// PLACE VALUE — 2.NBT.A.1–4, 2.OA.C.3–4; Grade 3 level-ups 3.NBT.A.1, 3.NBT.A.3, 3.OA.A.2, 3.OA.A.4.
(function () {
  const { pl, tag, missMap } = MQ;
  const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function words(n) {
    const h = Math.floor(n / 100), r = n % 100, t = Math.floor(r / 10), o = r % 10;
    const rest = r === 0 ? '' : r < 10 ? ONES[r] : r < 20 ? TEENS[r - 10] : TENS[t] + (o ? '-' + ONES[o] : '');
    return [h ? `${ONES[h]} hundred` : '', rest].filter(Boolean).join(' ');
  }
  const threeDigit = (zeroChance = 0.3) => {
    const h = U.int(1, 9), t = Math.random() < zeroChance ? 0 : U.int(0, 9), o = Math.random() < zeroChance / 2 ? 0 : U.int(0, 9);
    return h * 100 + t * 10 + o;
  };

  // ---------- Hundreds, tens, ones ----------
  function blocksNumber() {
    const n = threeDigit(0.25);
    const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, o = n % 10;
    const w = [[o * 100 + t * 10 + h, 'Start with the hundreds: the big flats.'], [h * 100 + o * 10 + t, 'The rods are tens and the small cubes are ones.']];
    if (t === 0) w.unshift([`${h}${o}`, 'Every place needs a digit. Write 0 when there are no tens.']);
    return tag(U.num('What number do the blocks show?', n, { fig: Fig.blocks(n), meta: { kind: 'value', args: [n] }, hint: 'Flats are hundreds, rods are tens, cubes are ones.', why: `${pl(h, 'hundred')}, ${pl(t, 'ten')}, and ${pl(o, 'one')} make ${n}.`, miss: missMap(w, n) }), '2.NBT.A.1', 170, 'number');
  }
  function digitPlace() {
    const n = threeDigit(0.1), place = U.pick(['hundreds', 'tens', 'ones']);
    const d = place === 'hundreds' ? Math.floor(n / 100) : place === 'tens' ? Math.floor(n / 10) % 10 : n % 10;
    const digits = String(n).split('');
    const q = U.mcMiss(`What digit is in the ${place} place in ${n}?`, String(d), digits.filter((x) => x !== String(d)).map((x, i) => [x, `Places from the left are hundreds, tens, ones. ${x} is in a different place.`]), { meta: { kind: 'digit', args: [n, place] }, hint: 'In a three-digit number: hundreds, tens, ones from left to right.', why: `${n}: ${digits[0]} hundreds, ${digits[1]} tens, ${digits[2]} ones.` }, 3, () => String(U.int(0, 9)));
    return tag(q, '2.NBT.A.1', 168, 'number');
  }
  function expanded() {
    const n = threeDigit(0.2), h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, o = n % 10;
    const parts = [h * 100, t * 10, o].filter(Boolean);
    if (U.pick([true, false])) {
      const w = [[o * 100 + t * 10 + h, 'Read the parts from the biggest place: hundreds first.'], [h * 100 + o * 10 + t, 'The tens part and the ones part are mixed up.'], [n + 10, 'Check the tens.']];
      if (t === 0) w.unshift([`${h}${o}`, 'There are 0 tens, so the tens digit is 0.']);
      return tag(U.mcMiss(`Which number is ${parts.join(' + ')}?`, String(n), w, { meta: { kind: 'value', args: [n] }, hint: 'Hundreds + tens + ones.', why: `${parts.join(' + ')} = ${n}` }, 3, () => String(threeDigit())), '2.NBT.A.3', 178, 'number');
    }
    // Spoken as the number itself ("three hundred six"), which reuses the recorded number clips.
    const q = U.num(`Write the number: ${words(n)}`, n, { speak: `Write the number: ${n}`, meta: { kind: 'value', args: [n] }, hint: 'Write the hundreds digit, then tens, then ones. Use 0 for an empty place.', why: `${Math.floor(n / 100)} hundreds, ${Math.floor(n / 10) % 10} tens, ${n % 10} ones: ${n}` });
    q.miss = missMap([[`${h}00${t * 10 + o}`, `Do not write "100" and then the rest. ${h} hundred is just the first digit.`], [`${h}${t * 10 + o}`, t === 0 ? 'Remember the 0 in the tens place.' : 'Check each place.']], n);
    return tag(q, '2.NBT.A.3', 182, 'number');
  }
  function roundIt() {
    const to = U.pick([10, 100]);
    let n;
    do { n = U.int(105, 985); } while (n % to === 0 || (to === 10 ? n % 10 === 5 && Math.random() < 0.6 : n % 100 === 50 && Math.random() < 0.6));
    const r = Math.round(n / to) * to;
    const other = to === 10 ? Math.round(n / 100) * 100 : Math.round(n / 10) * 10;
    const wrongWay = r > n ? r - to : r + to;
    const q = U.num(`Round ${n} to the nearest ${to === 10 ? 'ten' : 'hundred'}.`, r, { meta: { kind: 'round', args: [n, to] }, hint: to === 10 ? `Look at the ones digit (${n % 10}). 5 or more: round up.` : `Look at the tens digit (${Math.floor(n / 10) % 10}). 5 or more: round up.`, why: `${n} is closer to ${r}${n % to === to / 2 ? ' (halfway rounds up)' : ''}.` });
    q.miss = missMap([[wrongWay, `${n} is closer to ${r} than to ${wrongWay}.`], [other, `That is rounded to the nearest ${to === 10 ? 'hundred' : 'ten'}.`], [n, 'Rounding changes the number to a close, easy one.']], r);
    return tag(q, '3.NBT.A.1', 194, 'number');
  }

  // ---------- Count & compare ----------
  function skipCount() {
    const by = U.pick([5, 10, 100]);
    const start = by === 100 ? U.int(1, 5) * 100 + U.pick([0, 0, 20, 50]) : by * U.int(1, 15) + (by === 10 ? U.pick([0, 0, 3, 7]) : 0);
    const seq = [0, 1, 2, 3].map((i) => start + i * by);
    const q = U.num(`Count by ${by}s. What comes next?\n${seq.join(', ')}, □`, start + 4 * by, { meta: { kind: 'add', args: [seq[3], by] }, hint: `Add ${by} each time.`, why: `${seq[3]} + ${by} = ${start + 4 * by}` });
    q.miss = missMap([[seq[3] + 1, `That counts by 1s. Count by ${by}s.`], [seq[3] + (by === 10 ? 5 : 10), `Each jump is ${by}.`]], start + 4 * by);
    return tag(q, '2.NBT.A.2', 166, 'number');
  }
  function compareSign() {
    let a = threeDigit(0.15), b;
    const kind = U.int(0, 3);
    if (kind === 0) b = a;
    else if (kind === 1) { const h = Math.floor(a / 100); b = h * 100 + (a % 10) * 10 + Math.floor(a / 10) % 10; } // swapped tens and ones
    else b = threeDigit(0.15);
    if (kind !== 0 && a === b) b = a + 10 <= 999 ? a + 10 : a - 10;
    const ans = a > b ? '>' : a < b ? '<' : '=';
    const q = U.mcFixed(`Choose the sign that makes this true.\n${a} □ ${b}`, ans, ['>', '<', '='], { meta: { kind: 'cmp', args: [a, b] }, hint: 'Compare the hundreds first. If they are the same, compare the tens, then the ones.', why: `${a} ${ans} ${b}. ${ans === '=' ? 'They are the same number.' : `${Math.max(a, b)} is greater.`}` });
    q.miss = { '>': 'The open side of > faces the bigger number. Which number is bigger?', '<': 'The open side of < faces the bigger number. Which number is bigger?', '=': 'Equal means exactly the same number.' };
    delete q.miss[ans];
    return tag(q, '2.NBT.A.4', 176, 'number');
  }
  function greatest() {
    const h = U.int(2, 8), digits = U.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2);
    const nums = U.uniq([h * 100 + digits[0] * 10 + digits[1], h * 100 + digits[1] * 10 + digits[0], (h - 1) * 100 + 99 - U.int(0, 5), h * 100 + U.int(0, 9)]).slice(0, 4);
    if (nums.length < 3) return greatest();
    const big = Math.max(...nums);
    return tag(U.mcMiss('Which number is the greatest?', String(big), nums.filter((n) => n !== big).map((n) => [String(n), n % 100 > big % 100 && Math.floor(n / 100) < Math.floor(big / 100) ? `${n} has bigger tens and ones, but fewer hundreds. Hundreds matter most.` : `Compare place by place: ${n} < ${big}.`]), { meta: { kind: 'max', args: nums }, hint: 'Look at the hundreds first.', why: `${big} is the greatest.` }), '2.NBT.A.4', 180, 'number');
  }
  function timesTens() {
    const a = U.int(2, 9), b = U.int(1, 9) * 10;
    const q = U.num(`${a} × ${b} = ?`, a * b, { meta: { kind: 'mul', args: [a, b] }, hint: `${a} × ${b / 10} tens = ${a * b / 10} tens.`, why: `${a} × ${b / 10} = ${a * b / 10}, so ${a} × ${b} = ${a * b / 10} tens = ${a * b}.` });
    q.miss = missMap([[a * b / 10, `That is ${a} × ${b / 10}. Each ${b} is ${b / 10} tens, so the answer is in tens.`], [a + b, `That is ${a} + ${b}. Multiply.`]], a * b);
    return tag(q, '3.NBT.A.3', 196, 'number');
  }

  // ---------- Equal groups ----------
  function oddEven() {
    const n = U.int(5, 99);
    const ans = n % 2 ? 'odd' : 'even';
    const q = U.mcFixed(`Is ${n} even or odd?`, ans, ['even', 'odd'], { meta: { kind: 'parity', args: [n] }, hint: 'Look at the ones digit. 0, 2, 4, 6, 8 are even.', why: `${n} ends in ${n % 10}, so it is ${ans}${n <= 20 ? `: ${n} objects ${ans === 'even' ? 'make pairs with none left over' : 'make pairs with 1 left over'}` : ''}.` });
    q.miss = { [ans === 'even' ? 'odd' : 'even']: `Check the ones digit: ${n % 10}.` };
    if (n <= 20) q.fig = Fig.array(Math.ceil(n / 2), 2).replace(/(<circle[^>]*>)(?![\s\S]*<circle)/, n % 2 ? '' : '$1');
    return tag(q, '2.OA.C.3', 168, 'algebra');
  }
  function doubles() {
    const h = U.int(3, 10), n = 2 * h;
    return tag(U.num(`${n} is even. ${n} = □ + □, and both boxes are the same number. What is it?`, h, { meta: { kind: 'div', args: [n, 2] }, hint: 'Split it into two equal groups.', why: `${h} + ${h} = ${n}` }), '2.OA.C.3', 174, 'algebra');
  }
  function arrayTotal() {
    const r = U.int(2, 5), c = U.int(2, 5);
    const q = U.num(`How many dots are in this array? (${pl(r, 'row')} of ${c})`, r * c, { fig: Fig.array(r, c), meta: { kind: 'mul', args: [r, c] }, hint: `Add the rows: ${Array(r).fill(c).join(' + ')}.`, why: `${Array(r).fill(c).join(' + ')} = ${r * c}` });
    q.miss = missMap([[r + c, `That is ${r} + ${c}. Add ${c} for each of the ${r} rows.`], [r * c - c, 'One row is missing. Count every row.']], r * c);
    return tag(q, '2.OA.C.4', 178, 'algebra');
  }
  function arrayEquation() {
    const r = U.int(2, 5), c = U.intWhere(2, 5, (x) => x !== r);
    const right = Array(r).fill(c).join(' + ') + ` = ${r * c}`;
    const w = [[Array(c).fill(c).join(' + ') + ` = ${c * c}`, `That uses ${c} rows. Count the rows: there are ${r}.`], [`${r} + ${c} = ${r + c}`, 'An array adds the same number for each row.'], [Array(r).fill(r).join(' + ') + ` = ${r * r}`, `Each row has ${c}, not ${r}.`]];
    return tag(U.mcMiss('Which equation matches the array?', right, w, { fig: Fig.array(r, c), meta: { kind: 'arrayEq', args: [r, c] }, hint: 'Count how many in one row, then how many rows.', why: `${r} rows of ${c}: ${right}` }), '2.OA.C.4', 182, 'algebra');
  }
  function shareOrFactor() {
    const a = U.int(2, 9), b = U.int(2, 9);
    if (U.pick([true, false])) {
      const q = U.num(`What number goes in the box?\n□ × ${a} = ${a * b}`, b, { meta: { kind: 'div', args: [a * b, a] }, hint: `Think: how many groups of ${a} make ${a * b}?`, why: `${b} × ${a} = ${a * b}` });
      q.miss = missMap([[a * b - a, 'Find the number that multiplies, not the difference.'], [a * b * a, 'Multiply to check: the box times ' + a + ' must equal ' + a * b + '.']], b);
      return tag(q, '3.OA.A.4', 197, 'algebra');
    }
    const q = U.num(`${a * b} stickers are shared equally into ${pl(a, 'bag')}. How many stickers go in each bag?`, b, { unit: 'stickers', meta: { kind: 'div', args: [a * b, a] }, hint: `${a * b} ÷ ${a}. Think: ${a} × ? = ${a * b}.`, why: `${a * b} ÷ ${a} = ${b}` });
    q.miss = missMap([[a * b - a, 'Sharing equally means divide, not subtract.']], b);
    return tag(q, '3.OA.A.2', 195, 'algebra');
  }

  addSubject({
    id: 'place', name: 'Place Value', icon: '🧱', color: 'c2', blurb: 'Hundreds, tens, ones, and equal groups.',
    skills: [
      { id: 'pv', name: 'Hundreds, tens, ones', icon: '🧱', levels: [
        { title: 'Read the blocks', std: '2.NBT.A.1', desc: 'Flats, rods, and cubes.', gen: () => U.mix(8, [blocksNumber, blocksNumber, digitPlace]) },
        { title: 'Expanded form and number names', std: '2.NBT.A.3', desc: '300 + 40 + 5 = 345.', gen: () => U.mix(8, [expanded]) },
        { title: 'Round to the nearest 10 or 100', std: '3.NBT.A.1', desc: 'Which is closer?', gen: () => U.mix(8, [roundIt]) },
      ] },
      { id: 'compare', name: 'Count & compare', icon: '⚖️', levels: [
        { title: 'Skip-count by 5s, 10s, 100s', std: '2.NBT.A.2', desc: 'What comes next?', gen: () => U.mix(8, [skipCount]) },
        { title: 'Compare with >, <, =', std: '2.NBT.A.4', desc: 'Hundreds first, then tens.', gen: () => U.mix(8, [compareSign, compareSign, greatest]) },
        { title: 'Multiply by tens', std: '3.NBT.A.3', desc: '4 × 30 = 4 × 3 tens.', gen: () => U.mix(8, [timesTens]) },
      ] },
      { id: 'groups', name: 'Equal groups', icon: '🔵', levels: [
        { title: 'Odd and even', std: '2.OA.C.3', desc: 'Pairs, with or without one left.', gen: () => U.mix(8, [oddEven, oddEven, doubles]) },
        { title: 'Arrays', std: '2.OA.C.4', desc: 'Rows of equal size.', gen: () => U.mix(8, [arrayTotal, arrayEquation]) },
        { title: 'Share and find the missing factor', std: '3.OA.A.2 · 3.OA.A.4', desc: 'Division as equal sharing.', gen: () => U.mix(8, [shareOrFactor]) },
      ] },
    ],
  });
})();
