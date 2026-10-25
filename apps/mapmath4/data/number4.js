// MAP Math 4 — Number (Computation, Number Sense). Original questions; 2023 NJSLS-Mathematics codes.
(function () {
  const { tag, c, dec, decTrim, fx, ftyped, simp, mulMisses, addMisses, subMisses, placeChart6, PLACES, fracArea, missMap, LETTERS, lv } = M4;
  const P10 = [1, 10, 100, 1000, 10000, 100000];
  const placeName = (i) => PLACES[5 - i].toLowerCase(); // i = power of ten

  // ===================== PLACE VALUE =====================
  function placeHot() {
    const len = U.pick([5, 6]), n = U.int(10 ** (len - 1), 10 ** len - 1), ds = String(n).split('');
    if (new Set(ds).size < len) return placeHot();
    const p = U.int(2, len - 1), idx = len - 1 - p;
    return tag({ t: 'hot', q: `Tap the digit in the ${placeName(p)} place.`, cells: ds, layout: 'row', a: [idx], fig: Fig.table([M4.PLACES.slice(6 - len).map((s) => s.replace(' thousands', ' th.'))]), meta: { kind: 'hotDigit', args: [n, idx] }, hint: 'From the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands.', why: `In ${c(n)}, the ${ds[idx]} is in the ${placeName(p)} place.` }, '4.NBT.A.2', 186, 'number');
  }
  function digitValueBig() {
    const n = U.int(10000, 999999), s = String(n), p = U.int(1, s.length - 1), d = +s[s.length - 1 - p];
    if (!d || s.split('').filter((x) => +x === d).length > 1) return digitValueBig();
    const val = d * P10[p];
    return tag(M4.mc(`What is the value of the digit ${d} in ${c(n)}?`, c(val), [[c(d * P10[p - 1]), `The ${d} is in the ${placeName(p)} place, not the ${placeName(p - 1)} place.`], [p < 5 ? c(d * P10[p + 1]) : String(d), p < 5 ? `Count the places again: the ${d} is in the ${placeName(p)} place.` : `${d} is the digit. Its value depends on its place.`], [String(d), `${d} is the digit. Its value depends on its place.`]], { fig: placeChart6([n]), meta: { kind: 'expr', args: [`${d} × ${P10[p]}`] }, hint: 'Find the digit\'s place, then multiply the digit by that place.', why: `The ${d} is in the ${placeName(p)} place: ${d} × ${c(P10[p])} = ${c(val)}.` }, 3, () => c(d * P10[Math.max(0, p - 2)])), '4.NBT.A.2', 192, 'number');
  }
  function tenTimes() {
    const d = U.int(2, 9), k = U.pick([1, 2]), p = U.int(2, 5 - k); // the bigger number stays under a million
    const big = d * P10[p + k], small = d * P10[p];
    const ans = P10[k];
    return tag(M4.mc(`The ${d} in ${c(big)} is how many times the value of the ${d} in ${c(small)}?`, c(ans), [[k === 1 ? '100' : '10', k === 1 ? 'Each place to the left is 10 times as much. It moved only one place.' : 'It moved two places: 10 × 10.'], [String(d), 'Compare the values of the digits, not the digits.'], [c(big - small), 'That is how much more, not how many times as much.']], { fig: placeChart6([big, small]), meta: { kind: 'expr', args: [`${big} ÷ ${small}`] }, hint: 'Each place to the left is worth 10 times as much.', why: `${c(big)} ÷ ${c(small)} = ${c(ans)}. ${k === 1 ? 'One place left: 10 times.' : 'Two places left: 100 times.'}` }), '4.NBT.A.1', 196, 'number');
  }
  function compareBig() {
    const len = U.pick([5, 6]), a = U.int(10 ** (len - 1), 10 ** len - 1);
    // share the leading digits so a lower place decides
    const keep = U.int(1, len - 2), head = Math.floor(a / P10[len - keep]);
    const b = head * P10[len - keep] + U.int(0, P10[len - keep] - 1);
    if (a === b) return compareBig();
    const ans = a > b ? '>' : '<';
    return tag(U.mcFixed(`Choose the sign that makes this true.\n${c(a)} □ ${c(b)}`, ans, ['>', '<', '='], { fig: placeChart6([a, b]), meta: { kind: 'cmp', args: [a, b] }, miss: { [ans === '>' ? '<' : '>']: 'Compare from the left. The first place where the digits differ decides.', '=': 'These numbers are not equal.' }, hint: 'Line up the places. Compare from the left until two digits are different.', why: `${c(a)} ${ans} ${c(b)}` }), '4.NBT.A.2', 198, 'number');
  }
  function orderBigPop() {
    const base = U.int(2, 9) * 10000;
    const nums = U.uniq([base + U.int(0, 9999), base + U.int(0, 9999), base + U.int(0, 999), U.pick([base / 10 * 9 + U.int(0, 999), base + 10000 + U.int(0, 999)])]).slice(0, 4);
    if (nums.length < 4) return orderBigPop();
    const sorted = [...nums].sort((x, y) => x - y).map(c);
    return tag({ t: 'pop', q: 'Put the numbers in order from least to greatest.', template: '□ < □ < □ < □', tiles: U.shuffle(nums.map(c)), accept: [sorted], fig: placeChart6(nums), meta: { kind: 'popOrder', args: [nums] }, hint: 'Compare the greatest place first, then the next place.', why: sorted.join(' < ') }, '4.NBT.A.2', 200, 'number');
  }
  const expanded = (n) => String(n).split('').map((d, i, s) => +d * P10[s.length - 1 - i]).filter((v) => v > 0).map(c).join(' + ');
  function expandedMC() {
    let n;
    do { n = U.int(100000, 999999); } while (String(n).split('').filter((d) => d === '0').length < 1 || String(n).split('').filter((d) => d === '0').length > 3);
    const s = String(n), parts = s.split('').map((d, i) => +d * P10[5 - i]).filter((v) => v > 0);
    // shift one nonzero part to the wrong place (a zero is skipped or doubled)
    const shift = (j, up) => parts.map((v, i) => (i === j ? (up ? v * 10 : v / 10) : v)).map(c).join(' + ');
    const j = U.int(1, parts.length - 1);
    return tag(M4.mc(`Which shows ${c(n)} in expanded form?`, expanded(n), [[shift(j, true), 'A zero holds a place. Check which place each digit is in.'], [shift(j, false), 'A digit was put one place too far to the right.'], [s.split('').filter((d) => d !== '0').join(' + '), 'Expanded form shows the VALUE of each digit, not just the digit.']], { fig: placeChart6([n]), meta: { kind: 'expanded', args: [n] }, hint: 'Write each digit times its place. Skip the zeros.', why: `${c(n)} = ${expanded(n)}` }), '4.NBT.A.2', 196, 'number');
  }
  function expandedPop() {
    const n = U.intWhere(10000, 99999, (x) => !String(x).includes('0'));
    const parts = String(n).split('').map((d, i) => +d * P10[4 - i]);
    const k = U.int(1, 3); // which part becomes a tile with a misplaced value
    const tiles = U.shuffle([...parts, parts[k] * 10, parts[k + 1] * 10].map(c));
    const accept = [parts.map(c)];
    return tag({ t: 'pop', q: `Make ${c(n)} in expanded form. Tap the tiles in order, greatest place first.`, template: '□ + □ + □ + □ + □', tiles, accept, fig: placeChart6([n]), meta: { kind: 'popExpanded', args: [n] }, hint: 'Ten thousands first, then thousands, hundreds, tens, ones.', why: `${c(n)} = ${expanded(n)}` }, '4.NBT.A.2', 194, 'number');
  }
  function powerTen() {
    const k = U.int(1, 3), op = U.pick(['×', '×', '÷']);
    let a, ans, q;
    if (op === '×') { a = U.pick([U.int(2, 99), U.int(12, 99) / 10]); ans = +(a * P10[k]).toFixed(6); q = `${String(a)} × ${k === 1 ? '10' : T(`10^{${k}}`)}`; }
    else { a = U.int(2, 99) * P10[U.int(k, k + 1)]; ans = a / P10[k]; q = `${c(a)} ÷ ${k === 1 ? '10' : T(`10^{${k}}`)}`; }
    const wrongs = [[String(op === '×' ? a * P10[k] * 10 : a / P10[k] / 10), 'Count the zeros in the power of ten again: one place for each.'], [String(op === '×' ? +(a + P10[k]).toFixed(6) : a - P10[k]), `${op === '×' ? 'Multiplying' : 'Dividing'} by a power of ten moves the digits; it does not ${op === '×' ? 'add' : 'subtract'}.`]];
    return tag(U.num(`${q} = ?`, String(ans), { fig: Fig.table([['Power of ten', 'Value', 'Zeros'], ...[1, 2, 3].map((e) => [e === 1 ? '10' : `10^${e}`.replace('^2', '²').replace('^3', '³'), c(P10[e]), e])]), meta: { kind: 'dexpr', args: [`${a} ${op === '×' ? '*' : '/'} ${P10[k]}`] }, miss: missMap(wrongs, String(ans)), hint: `${op === '×' ? 'Multiplying' : 'Dividing'} by ${c(P10[k])} moves each digit ${k} place${k > 1 ? 's' : ''} to the ${op === '×' ? 'left' : 'right'}.`, why: `${q.replace(/⟪.*⟫/, c(P10[k]))} = ${c(ans)}` }), '5.NBT.A.2', 210, 'number');
  }
  function decDigitValue() {
    const k = U.int(1001, 9999), s = dec(k, 3), p = U.int(1, 3), d = +s[s.length - 4 + p];
    if (!d || s.replace('.', '').split('').filter((x) => +x === d).length > 1) return decDigitValue();
    const val = decTrim(d * P10[3 - p], 3), names = ['', 'tenths', 'hundredths', 'thousandths'];
    return tag(M4.mc(`What is the value of the digit ${d} in ${s}?`, val, [[decTrim(d * P10[3 - p] * 10, 3), `The ${d} is in the ${names[p]} place. Each place to the right is one tenth as much.`], [p < 3 ? decTrim(d * P10[2 - p], 3) : String(d), p < 3 ? 'That is one place too far to the right.' : 'The digit after the decimal point is not a whole number.'], [String(d), 'Digits after the decimal point are parts of one.']], { fig: Fig.table([['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'], [s[0], '.', s[2], s[3], s[4]]]), meta: { kind: 'dexpr', args: [`${d} / ${P10[p]}`] }, hint: 'After the decimal point: tenths, hundredths, thousandths.', why: `The ${d} is in the ${names[p]} place, so it is worth ${val}.` }, 3, () => decTrim(d * P10[U.int(0, 2)], 3)), '5.NBT.A.3', 208, 'number');
  }

  // ===================== ROUNDING =====================
  function roundMC(level) {
    const [lo, hi, to] = level === 0 ? [101, 989, U.pick([10, 100])] : [1001, 99999, U.pick([100, 1000, 10000].filter((t) => t < 99999))];
    const n = U.intWhere(lo, hi, (x) => x % to !== 0 && (x % to) * 2 !== to && x >= to);
    const r = Math.floor(n / to + 0.5) * to, down = Math.floor(n / to) * to, other = r === down ? down + to : down;
    const nearer = to === 10 ? 'ten' : to === 100 ? 'hundred' : to === 1000 ? 'thousand' : 'ten thousand';
    return tag(M4.mc(`Round ${c(n)} to the nearest ${nearer}.`, c(r), [[c(other), `${c(n)} is between ${c(down)} and ${c(down + to)}. Check which one it is closer to.`], [c(Math.floor(n / (to * 10) + 0.5) * to * 10), 'That rounds to a bigger place.'], [c(to >= 100 ? Math.floor(n / (to / 10) + 0.5) * (to / 10) : Math.floor(n / 100 + 0.5) * 100), 'That rounds to a different place. Find the right place first.']], { fig: Fig.roundLine(n, to), meta: { kind: 'round', args: [n, to] }, hint: `Look at the digit to the right of the ${nearer}s place: 5 or more rounds up.`, why: `${c(n)} is closer to ${c(r)}.` }), level === 0 ? (to === 10 ? '3.NBT.A.1' : '3.NBT.A.1') : '4.NBT.A.3', level === 0 ? (to === 10 ? 178 : 184) : 192, 'number');
  }
  function roundEntry() {
    const to = U.pick([1000, 10000, 100000]), n = U.intWhere(100000, 999999, (x) => x % to !== 0 && (x % to) * 2 !== to);
    const r = Math.floor(n / to + 0.5) * to;
    const nearer = { 1000: 'thousand', 10000: 'ten thousand', 100000: 'hundred thousand' }[to];
    return tag(U.num(`Round ${c(n)} to the nearest ${nearer}.`, String(r), { fig: Fig.roundLine(n, to), meta: { kind: 'round', args: [n, to] }, miss: missMap([[Math.floor(n / to) * to === r ? r + to : r - to, 'Check which way to round: look at the next digit to the right.'], [Math.floor(n / to) * to, 'The digit to the right was 5 or more, so round up.']], String(r)), hint: `Find the ${nearer}s place. Look at the digit just to its right.`, why: `${c(n)} rounds to ${c(r)}.` }), '4.NBT.A.3', 198, 'number');
  }
  function estimateSum() {
    const a = U.int(1200, 8800), b = U.int(1200, 8800), op = U.pick(['+', '−']);
    const [x, y] = op === '−' && a < b ? [b, a] : [a, b];
    const r = (v) => Math.floor(v / 1000 + 0.5) * 1000, est = op === '+' ? r(x) + r(y) : r(x) - r(y);
    if (est <= 0) return estimateSum();
    const exact = op === '+' ? x + y : x - y;
    return tag(M4.mc(`Estimate ${c(x)} ${op} ${c(y)} by rounding each number to the nearest thousand.`, c(est), [[c(exact), 'That is the exact answer. Round each number first.'], [c(op === '+' ? Math.floor(x / 1000) * 1000 + Math.floor(y / 1000) * 1000 : Math.floor(x / 1000) * 1000 - Math.floor(y / 1000) * 1000), 'Rounding is not just dropping digits: 5 or more rounds up.'], [c(est + (op === '+' ? 1000 : -1000) || 2000), 'Check how each number rounds.']], { fig: Fig.table([['Number', 'Rounded'], [c(x), c(r(x))], [c(y), c(r(y))]]), meta: { kind: 'estRound', args: [x, y, 1000, op] }, hint: 'Round both numbers first, then add or subtract.', why: `${c(r(x))} ${op} ${c(r(y))} = ${c(est)}` }), '4.NBT.A.3', 200, 'number');
  }
  function roundDecMC(entry = false) {
    const k = U.int(1001, 9989), p = entry ? U.pick([1, 2]) : U.pick([0, 1, 2]), unit = P10[3 - p];
    if (k % unit === 0 || (k % unit) * 2 === unit) return roundDecMC(entry);
    const r = Math.floor(k / unit + 0.5) * unit, down = Math.floor(k / unit) * unit;
    const val = decTrim(r, 3) || '0', s = dec(k, 3), name = ['whole number', 'tenth', 'hundredth'][p];
    const fig = Fig.numLine(down / 1000, (down + unit) / 1000, 10000 / unit, { // 10 ticks between the two rounding choices
      labels: [down / 1000, (down + unit / 2) / 1000, (down + unit) / 1000], dec: p + 1, marks: [{ v: k / 1000, label: s }] });
    if (entry) return tag(U.num(`Round ${s} to the nearest ${name}.`, val, { fig, meta: { kind: 'roundDec', args: [k, p] }, miss: missMap([[decTrim(r === down ? down + unit : down, 3), 'Look at the digit just to the right of that place: 5 or more rounds up.']], val), hint: `Find the ${name}s place, then look one digit to the right.`, why: `${s} rounds to ${val}.` }), '5.NBT.A.4', 212, 'number');
    return tag(M4.mc(`Round ${s} to the nearest ${name}.`, val, [[decTrim(r === down ? down + unit : down, 3), `${s} is between ${decTrim(down, 3) || '0'} and ${decTrim(down + unit, 3)}. Which is it closer to?`], [decTrim(Math.floor(k / (unit / 10) + 0.5) * (unit / 10), 3), 'That rounds to the next place to the right.'], [decTrim(r + unit, 3), 'It rounds to the NEAREST one: only one step up or down.']], { fig, meta: { kind: 'roundDec', args: [k, p] }, hint: `Find the ${name}s place, then look one digit to the right.`, why: `${s} rounds to ${val}.` }, 3, () => decTrim(r + U.pick([unit, 2 * unit]), 3)), '5.NBT.A.4', 210, 'number');
  }

  // ===================== ADD & SUBTRACT =====================
  function addSubMC(level) {
    const op = U.pick(['+', '−']), [lo, hi] = level === 0 ? [101, 899] : [1012, 8987];
    let a = U.int(lo, hi), b = U.int(lo, hi);
    if (op === '−' && a < b) [a, b] = [b, a];
    if (op === '−' && a - b < 50) return addSubMC(level);
    const ans = op === '+' ? a + b : a - b, w = op === '+' ? addMisses(a, b) : subMisses(a, b);
    return tag(M4.mc(`${c(a)} ${op} ${c(b)} = ?`, c(ans), w.map(([v, why]) => [c(v), why]), { fig: level === 0 ? Fig.placeChart([a, b], op) : Fig.table([['Th', 'H', 'T', 'O'], ...[a, b].map((n) => String(n).padStart(4, ' ').split('').map((d) => d.trim()))], `Line up the places · ${op}`), meta: { kind: 'expr', args: [`${a} ${op} ${b}`] }, hint: 'Line up the places. Start with the ones. Regroup when you need to.', why: `${c(a)} ${op} ${c(b)} = ${c(ans)}` }, 3, () => c(U.pick([10, -10, 100]).valueOf() + ans)), level === 0 ? '3.NBT.A.2' : '4.NBT.B.4', level === 0 ? 180 : 188, 'number');
  }
  function addSubEntry() {
    const op = U.pick(['+', '−']);
    let a = U.int(10000, 499999), b = U.int(10000, 499999);
    if (op === '−' && a < b) [a, b] = [b, a];
    if (op === '−' && a - b < 1000) return addSubEntry();
    const ans = op === '+' ? a + b : a - b;
    return tag(U.num(`${c(a)} ${op} ${c(b)} = ?`, String(ans), { fig: placeChart6([a, b]), meta: { kind: 'expr', args: [`${a} ${op} ${b}`] }, miss: missMap(op === '+' ? addMisses(a, b) : subMisses(a, b), String(ans)), hint: 'Line up the places. Work from the ones to the left, regrouping as you go.', why: `${c(a)} ${op} ${c(b)} = ${c(ans)}` }), '4.NBT.B.4', 198, 'number');
  }
  function missingAddend() {
    const total = U.pick([U.int(3, 9) * 1000, U.int(11, 99) * 1000, U.int(2000, 9999)]), b = U.int(Math.floor(total / 5), total - 100);
    const ans = total - b, order = U.pick([0, 1]);
    return tag(U.num(order ? `□ + ${c(b)} = ${c(total)}\nWhat number goes in the box?` : `${c(total)} − □ = ${c(b)}\nWhat number goes in the box?`, String(ans), { fig: Fig.barModel(c(total), order ? ['?', c(b)] : [c(b), '?']), meta: { kind: 'expr', args: [`${total} - ${b}`] }, miss: missMap([[total + b, 'The box is a part, so it is smaller than the whole. Subtract.']], String(ans)), hint: 'The whole minus the part you know gives the missing part.', why: `${c(total)} − ${c(b)} = ${c(ans)}` }), '4.NBT.B.4', 200, 'number');
  }
  function decAddSub(entry) {
    const op = U.pick(['+', '−']), pa = U.pick([1, 2]), pb = pa === 1 ? 2 : U.pick([1, 2]);
    // values in hundredths so the arithmetic is exact
    let A = U.int(110, 989), B = U.int(110, 989);
    if (pa === 1) A = Math.round(A / 10) * 10; if (pb === 1) B = Math.round(B / 10) * 10;
    if (op === '−' && A < B) [A, B] = [B, A];
    if (A === B) return decAddSub(entry);
    const ans = op === '+' ? A + B : A - B, sa = decTrim(A, 2), sb = decTrim(B, 2), val = decTrim(ans, 2) || '0';
    // misconception: digits lined up on the right instead of at the decimal point
    const ra = +sa.replace('.', ''), rb = +sb.replace('.', ''), places = Math.max(sa.split('.')[1]?.length || 0, sb.split('.')[1]?.length || 0);
    const right = op === '+' ? ra + rb : Math.abs(ra - rb), rightStr = decTrim(right, places);
    const w = [[rightStr, 'Line up the decimal points, not the last digits. Write 0 in empty places.'], [decTrim(op === '+' ? A + B + 10 : A - B - 10, 2), 'Check the regrouping in the tenths.'], [String(op === '+' ? A + B : A - B), 'Put the decimal point in the answer, lined up with the others.']];
    const q = `${sa} ${op} ${sb} = ?`;
    const fig = Fig.table([['Ones', '.', 'Tenths', 'Hundredths'], ...[A, B].map((v) => { const s = dec(v, 2); return [s[0], '.', s[2], s[3]]; })], 'Line up the decimal points');
    if (entry) return tag(U.num(q, val, { fig, meta: { kind: 'dexpr', args: [`${sa} ${op === '+' ? '+' : '-'} ${sb}`] }, miss: missMap(w, val), hint: 'Line up the decimal points. Fill empty places with 0.', why: `${sa} ${op} ${sb} = ${val}` }), '5.NBT.B.7', 210, 'number');
    return tag(M4.mc(q, val, w, { fig, meta: { kind: 'dexpr', args: [`${sa} ${op === '+' ? '+' : '-'} ${sb}`] }, hint: 'Line up the decimal points. Fill empty places with 0.', why: `${sa} ${op} ${sb} = ${val}` }, 3, () => decTrim(ans + U.pick([1, -1, 100]), 2)), '5.NBT.B.7', 208, 'number');
  }

  // ===================== MULTIPLY =====================
  function facts() {
    const a = U.int(3, 9), b = U.int(4, 9);
    return tag(M4.mc(`${a} × ${b} = ?`, String(a * b), [[a * b + a, `That is ${b + 1} groups of ${a}.`], [a * b - b, `That is ${a - 1} groups of ${b}.`], [a + b, 'That is the sum. Multiply instead.']].map(([v, w]) => [String(v), w]), { fig: Fig.array(a, b), meta: { kind: 'expr', args: [`${a} × ${b}`] }, hint: `${a} rows of ${b}. Skip count by ${b}.`, why: `${a} × ${b} = ${a * b}` }), '3.OA.C.7', 182, 'number');
  }
  function mul1(entry) {
    const b = U.int(3, 9), a = entry ? U.int(1012, 4987) : U.pick([U.int(23, 98), U.int(112, 987)]);
    const p = a * b, w = mulMisses(a, b);
    const q = `${c(a)} × ${b} = ?`, fig = Fig.areaModel(a, b, { hide: entry ? [] : [] });
    if (entry) return tag(U.num(q, String(p), { fig, meta: { kind: 'expr', args: [`${a} × ${b}`] }, miss: missMap(w, String(p)), hint: 'Multiply each place, then add the parts.', why: `${c(a)} × ${b} = ${c(p)}` }), '4.NBT.B.5', 196, 'number');
    return tag(M4.mc(q, c(p), w.map(([v, why]) => [c(v), why]), { fig, meta: { kind: 'expr', args: [`${a} × ${b}`] }, hint: 'Multiply each place, then add the parts.', why: `${c(a)} × ${b} = ${c(p)}` }, 3, () => c(p + U.pick([b, 10, -10, 100]))), '4.NBT.B.5', 192, 'number');
  }
  function mul2(kind) {
    const a = U.intWhere(12, 98, (x) => x % 10 !== 0), b = U.intWhere(12, 98, (x) => x % 10 !== 0), p = a * b;
    const parts = [[Math.floor(a / 10) * 10, Math.floor(b / 10) * 10], [Math.floor(a / 10) * 10, b % 10], [a % 10, Math.floor(b / 10) * 10], [a % 10, b % 10]].map(([x, y]) => x * y);
    if (kind === 'pop') {
      // the four partial products, plus two tiles with a common slip (a tens × tens part missing a zero)
      const slips = [parts[0] / 10, parts[1] * 10].filter((v) => !parts.includes(v));
      if (new Set(parts).size < 4) return mul2(kind); // e.g. 50 × 3 and 3 × 50 would be the same tile
      const tiles = U.shuffle([...parts, ...slips].map(c));
      if (new Set(tiles).size !== tiles.length) return mul2(kind);
      const accept = [];
      const perm = (cur, left) => { if (cur.length === 4) { if (cur.reduce((t, v) => t + +v.replace(/,/g, ''), 0) === p) accept.push(cur); return; } left.forEach((v, i) => perm([...cur, v], left.filter((_, j) => j !== i))); };
      perm([], tiles);
      return tag({ t: 'pop', q: `Use the area model. Tap the four parts that add up to ${a} × ${b}.`, template: `□ + □ + □ + □ = ${c(p)}`, tiles, accept, fig: Fig.areaModel(a, b, { showTotals: false }), meta: { kind: 'popEq', args: [] }, hint: 'Each box is one place of the first number times one place of the second.', why: `${parts.join(' + ')} = ${c(p)}` }, '4.NBT.B.5', 200, 'number');
    }
    if (kind === 'entry') return tag(U.num(`${a} × ${b} = ?`, String(p), { fig: Fig.areaModel(a, b), meta: { kind: 'expr', args: [`${a} × ${b}`] }, miss: missMap(mulMisses(a, b), String(p)), hint: 'Add the four parts of the area model.', why: `${parts.join(' + ')} = ${c(p)}` }), '4.NBT.B.5', 202, 'number');
    return tag(M4.mc(`${a} × ${b} = ?`, c(p), mulMisses(a, b).map(([v, why]) => [c(v), why]), { fig: Fig.areaModel(a, b, { hide: [0, 1, 2, 3] }), meta: { kind: 'expr', args: [`${a} × ${b}`] }, hint: 'Split each number into tens and ones. Multiply every part by every part.', why: `${parts.join(' + ')} = ${c(p)}` }, 3, () => c(p + U.pick([10, -10, 100]))), '4.NBT.B.5', 204, 'number');
  }
  function mul3(entry) {
    const a = U.int(112, 989), b = U.intWhere(12, 89, (x) => x % 10 !== 0), p = a * b, ones = b % 10, tens = b - ones;
    const fig = Fig.table([['Step', 'Product'], [`${c(a)} × ${ones}`, c(a * ones)], [`${c(a)} × ${tens}`, c(a * tens)], ['Add', '?']], 'Two rows, then add');
    if (entry) return tag(U.num(`${c(a)} × ${b} = ?`, String(p), { fig, meta: { kind: 'expr', args: [`${a} × ${b}`] }, miss: missMap(mulMisses(a, b), String(p)), hint: 'Multiply by the ones, then by the tens (write a zero first), then add.', why: `${c(a * ones)} + ${c(a * tens)} = ${c(p)}` }), '5.NBT.B.5', 212, 'number');
    return tag(M4.mc(`${c(a)} × ${b} = ?`, c(p), mulMisses(a, b).map(([v, why]) => [c(v), why]), { fig: Fig.table([['×', c(a)], [String(ones), '?'], [String(tens), '?']], 'Two rows'), meta: { kind: 'expr', args: [`${a} × ${b}`] }, hint: 'Multiply by the ones, then by the tens (write a zero first), then add.', why: `${c(a)} × ${ones} = ${c(a * ones)}; ${c(a)} × ${tens} = ${c(a * tens)}; total ${c(p)}` }, 3, () => c(p + U.pick([a, -a, 100]))), '5.NBT.B.5', 210, 'number');
  }

  // ===================== DIVIDE =====================
  function divFacts() {
    const b = U.int(3, 9), q = U.int(3, 9), a = b * q;
    return tag(M4.mc(`${a} ÷ ${b} = ?`, String(q), [[String(q + 1), `Check: ${b} × ${q + 1} = ${b * (q + 1)}, not ${a}.`], [String(a - b), 'Dividing is sharing into equal groups, not subtracting.'], [String(Math.max(2, q - 1)), `Check: ${b} × ${Math.max(2, q - 1)} = ${b * Math.max(2, q - 1)}.`]], { fig: Fig.groups(b, q), meta: { kind: 'expr', args: [`${a} ÷ ${b}`] }, hint: `Think: ${b} times what is ${a}?`, why: `${b} × ${q} = ${a}, so ${a} ÷ ${b} = ${q}.` }), '3.OA.C.7', 184, 'number');
  }
  function div1(entry) {
    const b = U.int(3, 9), q = entry ? U.int(21, 312) : U.intWhere(101, 909, (x) => String(x)[1] === '0'), a = b * q;
    if (entry) return tag(U.num(`${c(a)} ÷ ${b} = ?`, String(q), { fig: Fig.shareBar(c(a), b), meta: { kind: 'expr', args: [`${a} ÷ ${b}`] }, miss: missMap([[a - b, 'Dividing is sharing into equal groups.'], [q + 10, `Check: ${b} × ${q + 10} = ${c(b * (q + 10))}.`]], String(q)), hint: `Share the hundreds, then the tens, then the ones. Check by multiplying by ${b}.`, why: `${b} × ${q} = ${c(a)}` }), '4.NBT.B.6', 194, 'number');
    // a zero in the quotient (804 ÷ 4 = 201, not 21)
    const noZero = +String(q).replace('0', '');
    return tag(M4.mc(`${c(a)} ÷ ${b} = ?`, String(q), [[String(noZero), `When a place can't be shared, write 0 there. Check: ${b} × ${noZero} = ${b * noZero}.`], [String(q * 10), `Check: ${b} × ${q * 10} = ${c(b * q * 10)}.`], [String(q + 10), `Check: ${b} × ${q + 10} = ${c(b * (q + 10))}.`]], { fig: Fig.shareBar(c(a), b), meta: { kind: 'expr', args: [`${a} ÷ ${b}`] }, hint: 'Divide one place at a time. If a place is too small to share, write 0.', why: `${b} × ${q} = ${c(a)}` }), '4.NBT.B.6', 196, 'number');
  }
  function remainder(entry) {
    const b = U.int(3, 9), q = U.int(entry ? 112 : 12, entry ? 1100 : 240), r = U.int(1, b - 1), a = b * q + r;
    if (entry) return tag(U.num(`What is the remainder when ${c(a)} is divided by ${b}?`, String(r), { fig: Fig.shareBar(c(a), b, { r }), meta: { kind: 'rem', args: [a, b] }, miss: missMap([[q, 'That is the quotient. The remainder is what is left over.']], String(r)), hint: `Divide, then find what is left over. The remainder is always less than ${b}.`, why: `${b} × ${q} = ${c(b * q)}; ${c(a)} − ${c(b * q)} = ${r}` }), '4.NBT.B.6', 202, 'number');
    const R = (x, y) => `${c(x)} R ${y}`;
    return tag(M4.mc(`${c(a)} ÷ ${b} = ?`, R(q, r), [[R(q - 1, r + b), `The remainder must be less than ${b}. Share one more each.`], [R(q, b - r), `Check: ${b} × ${q} + ${b - r} = ${c(b * q + b - r)}.`], [R(q + 1, r), `Check: ${b} × ${q + 1} is more than ${c(a)}.`]], { fig: Fig.shareBar(c(a), b, { r }), meta: { kind: 'qr', args: [a, b] }, hint: 'Divide, then check: divisor × quotient + remainder = the starting number.', why: `${b} × ${q} + ${r} = ${c(a)}` }), '4.NBT.B.6', 200, 'number');
  }
  function div2(entry) {
    const b = U.int(12, 39), q = U.int(entry ? 21 : 12, entry ? 99 : 89), a = b * q;
    const fig = Fig.table([['Try', 'Product'], ...[10, 20, 40, 50].map((k) => [`${b} × ${k}`, c(b * k)])], `Multiples of ${b}`);
    if (entry) return tag(U.num(`${c(a)} ÷ ${b} = ?`, String(q), { fig, meta: { kind: 'expr', args: [`${a} ÷ ${b}`] }, miss: missMap([[q + 10, `Check: ${b} × ${q + 10} = ${c(b * (q + 10))}.`], [q - 1, `Check: ${b} × ${q - 1} = ${c(b * (q - 1))}.`]], String(q)), hint: `Use multiples of ${b}: take away big groups, then smaller ones.`, why: `${b} × ${q} = ${c(a)}` }), '5.NBT.B.6', 214, 'number');
    return tag(M4.mc(`${c(a)} ÷ ${b} = ?`, String(q), [[String(q + 10), `Check: ${b} × ${q + 10} = ${c(b * (q + 10))}.`], [String(Math.floor(a / Math.floor(b / 10) / 10)), `Divide by ${b}, not by ${Math.floor(b / 10)} tens.`], [String(q + 1), `Check: ${b} × ${q + 1} = ${c(b * (q + 1))}.`]], { fig, meta: { kind: 'expr', args: [`${a} ÷ ${b}`] }, hint: 'Estimate first, then check by multiplying.', why: `${b} × ${q} = ${c(a)}` }, 3, () => String(q + U.pick([2, -2, 5]))), '5.NBT.B.6', 212, 'number');
  }

  // ===================== EQUIVALENT & COMPARE FRACTIONS =====================
  function equivHalf() {
    const d = U.pick([4, 6, 8, 10, 12]);
    const right = [d / 2, d], wrongs = [[d / 2 + 1, d], [1, d], [2, d + 2]].filter(([n, dd]) => n * 2 !== dd);
    return tag(M4.mc(`Which fraction is equal to ${fx([1, 2])}?`, fx(right), wrongs.map((f) => [fx(f), f[0] === 1 ? 'Only 1 part of many is shaded. One half needs half the parts.' : 'Shade the fraction on the strip and compare it with one half.']), { fig: Fig.fracStrips([[1, 2], [d / 2, d]]), meta: { kind: 'fexpr', args: [[d / 2, d], '+', [0, 1]] }, hint: 'Half of the parts are shaded.', why: `${d / 2} of ${d} parts is one half.` }), '3.NF.A.3', 184, 'number');
  }
  function equivMC() {
    const d = U.pick([3, 4, 5, 6]), n = U.int(1, d - 1), k = U.int(2, 4);
    const right = [n * k, d * k];
    const w = [[[n + k, d + k], 'Adding the same number to top and bottom changes the size. Multiply both by the same number.'], [[n, d * k], 'Multiply the top by the same number as the bottom.'], [[n * k, d * k + 1], 'The bottom must be multiplied by the same number as the top.']];
    return tag(M4.mc(`Which fraction is equivalent to ${fx([n, d])}?`, fx(right), w.map(([f, why]) => [fx(f), why]), { fig: Fig.fracStrips([[n, d], [n * k, d * k]]), meta: { kind: 'fexpr', args: [right, '+', [0, 1]] }, hint: 'Multiply the top and the bottom by the same number.', why: `${fx([n, d])} = ${fx(right)}: top and bottom × ${k}.` }), '4.NF.A.1', 192, 'number');
  }
  function equivMissing() {
    const d = U.pick([2, 3, 4, 5, 6, 10]), n = U.int(1, d - 1), k = U.pick([2, 3, 4, 5, 10].filter((x) => d * x <= 100));
    return tag(U.num(`Fill in the missing number.\n${fx([n, d])} = ${T(`\\frac{□}{${d * k}}`)}`, String(n * k), { fig: Fig.fracStrips([[n, d], [n * k, d * k]].filter((_, i) => d * k <= 24 || i === 0)), meta: { kind: 'expr', args: [`${n} × ${k}`] }, miss: missMap([[n + (d * k - d), 'Adding to the bottom is not the same as multiplying. Find what the bottom was multiplied by.']], String(n * k)), hint: `${d} × ${k} = ${d * k}, so multiply the top by ${k} too.`, why: `${n} × ${k} = ${n * k}, so ${fx([n, d])} = ${fx([n * k, d * k])}` }), '4.NF.A.1', 194, 'number');
  }
  function compareUnlike() {
    const ds = [2, 3, 4, 5, 6, 8, 10, 12];
    let a, b;
    do { const d1 = U.pick(ds), d2 = U.pick(ds); a = [U.int(1, d1 - 1), d1]; b = [U.int(1, d2 - 1), d2]; } while (a[1] === b[1] || a[0] * b[1] === b[0] * a[1]);
    const ans = a[0] * b[1] > b[0] * a[1] ? '>' : '<';
    const q = U.mcFixed(`Choose the sign that makes this true.\n${fx(a)} □ ${fx(b)}`, ans, ['>', '<', '='], { fig: Fig.fracStrips([a, b]), meta: { kind: 'cmpFrac', args: [a, b] }, hint: 'Compare each with one half, or rewrite them with a common denominator.', why: `${fx(a)} ${ans} ${fx(b)}` });
    q.miss = { [ans === '>' ? '<' : '>']: 'A bigger bottom number means smaller pieces. Compare the amounts, not just the numbers.', '=': 'These fractions are not the same size.' };
    return tag(q, '4.NF.A.2', 200, 'number');
  }
  function greaterHalf() {
    const pool = U.sample([[1, 3], [2, 3], [3, 8], [5, 8], [2, 5], [3, 5], [5, 12], [7, 12], [3, 10], [7, 10], [1, 4], [3, 4], [4, 6], [2, 6]], 6);
    const right = pool.filter(([n, d]) => 2 * n > d), wrong = pool.filter(([n, d]) => 2 * n < d);
    if (!right.length || !wrong.length) return greaterHalf();
    return tag({ ...U.multi('Choose all the fractions greater than one half.', right.map((f) => fx(f)), wrong.map((f) => fx(f))), fig: Fig.fracStrips([[1, 2]]), meta: { kind: 'multiPred', args: ['gtHalf', 0, null] }, hint: 'A fraction is more than one half when the top is more than half of the bottom.', why: `${right.map((f) => fx(f)).join(', ')}: the top is more than half the bottom.` }, '4.NF.A.2', 198, 'number');
  }
  function addUnlike(entry) {
    const pairs = [[2, 3], [2, 5], [3, 4], [2, 4], [3, 6], [4, 6], [2, 6], [4, 8], [3, 5], [5, 10], [4, 12], [6, 8]];
    const [d1, d2] = U.pick(pairs), a = [U.int(1, d1 - 1), d1], b = [U.int(1, d2 - 1), d2], op = U.pick(['+', '+', '−']);
    const num = op === '+' ? a[0] * d2 + b[0] * d1 : a[0] * d2 - b[0] * d1;
    if (num <= 0) return addUnlike(entry);
    const ans = simp([num, d1 * d2]);
    const q = `${fx(a)} ${op} ${fx(b)} = ?`;
    if (entry) return tag(U.num(q, ftyped(ans), { keys: 'frac', fig: Fig.fracStrips([a, b]), meta: { kind: 'fexpr', args: [a, op, b] }, miss: missMap([[`${op === '+' ? a[0] + b[0] : Math.abs(a[0] - b[0])}/${op === '+' ? d1 + d2 : Math.abs(d1 - d2) || d1}`, 'Do not add the bottoms. Rewrite both with the same denominator first.']], ftyped(ans)), hint: 'Rewrite both fractions with a common denominator, then add or subtract the tops.', why: `${fx(a)} ${op} ${fx(b)} = ${fx(ans)}` }), '5.NF.A.1', 214, 'number');
    const bad = simp([op === '+' ? a[0] + b[0] : Math.abs(a[0] - b[0]) || 1, op === '+' ? d1 + d2 : Math.abs(d1 - d2) || d1]);
    return tag(M4.mc(q, fx(ans), [[fx(bad), 'Do not add or subtract the bottoms. Rewrite both with the same denominator first.'], [fx(simp([op === '+' ? a[0] + b[0] : Math.abs(a[0] - b[0]) || 1, d1 * d2])), 'The tops must be rewritten too, not just the bottoms.'], [fx(simp([num + d1, d1 * d2])), 'Check the new tops: multiply each top by the same number as its bottom.']], { fig: Fig.fracStrips([a, b]), meta: { kind: 'fexpr', args: [a, op, b] }, hint: 'Find a common denominator first.', why: `${fx(a)} ${op} ${fx(b)} = ${fx(ans)}` }), '5.NF.A.1', 212, 'number');
  }

  // Mixed numbers with unlike denominators (harder Grade 5).
  function mixedUnlike() {
    const [d1, d2] = U.pick([[2, 3], [3, 4], [2, 5], [4, 6], [3, 5], [2, 6], [4, 8]]), w1 = U.int(1, 4), w2 = U.int(1, 3), n1 = U.int(1, d1 - 1), n2 = U.int(1, d2 - 1), op = U.pick(['+', '−']);
    const A = [w1 * d1 + n1, d1], B = [w2 * d2 + n2, d2], num = op === '+' ? A[0] * d2 + B[0] * d1 : A[0] * d2 - B[0] * d1;
    if (num <= 0) return mixedUnlike();
    const ans = simp([num, d1 * d2]);
    return tag(U.num(`${fx(A, true)} ${op} ${fx(B, true)} = ?\nType a mixed number (use the space key) or a fraction.`, ftyped(ans, true), { keys: 'mixed', fig: Fig.fracStrips([[n1, d1], [n2, d2]]), meta: { kind: 'fexpr', args: [A, op, B] }, miss: missMap([[ftyped(simp([op === '+' ? (w1 + w2) * (d1 + d2) + n1 + n2 : Math.max(1, (w1 - w2) * (d1 + d2) + Math.abs(n1 - n2)), d1 + d2]), true), 'Do not add the bottoms. Find a common denominator first.']], ftyped(ans, true)), hint: 'Rewrite the fraction parts with a common denominator. Then add or subtract the wholes and the parts, regrouping if needed.', why: `${fx(A, true)} ${op} ${fx(B, true)} = ${fx(ans, true)}` }), '5.NF.A.1', 222, 'number');
  }
  // Multiply decimals (harder Grade 5).
  function decMul() {
    const a = U.int(2, 9), b = U.int(2, 9), kind = U.pick(['tt', 'wt', 'tt']);
    const [x, y] = kind === 'tt' ? [`0.${a}`, `0.${b}`] : [`${U.int(2, 6)}.${a}`, String(b)];
    const val = String(+(M4.ev(`${x} * ${y}`)).toFixed(4));
    return tag(U.num(`${x} × ${y} = ?`, val, { keys: 'dec', fig: kind === 'tt' ? M4.fracArea(a, 10, b, 10) : Fig.table([['×', y], [x, '?']]), meta: { kind: 'dexpr', args: [`${x} * ${y}`] }, miss: missMap([[String(+(M4.ev(`${x} * ${y}`) * 10).toFixed(4)), 'Count the decimal places in both numbers: the answer has that many places.']], val), hint: kind === 'tt' ? 'Tenths × tenths = hundredths. Multiply the digits, then count two places.' : 'Multiply as whole numbers, then put back one decimal place.', why: `${x} × ${y} = ${val}` }), '5.NBT.B.7', 220, 'number');
  }
  // Divide a unit fraction by a whole number, or a whole number by a unit fraction.
  function unitFracDiv() {
    const d = U.pick([2, 3, 4, 5, 6, 8]), w = U.int(2, 6), first = U.pick([true, false]);
    const q = first ? `${fx([1, d])} ÷ ${w}` : `${w} ÷ ${fx([1, d])}`, ans = first ? [1, d * w] : [w * d, 1];
    const wrongs = first
      ? [[fx([w, d]), 'That multiplies. Sharing one part into more pieces makes each piece SMALLER.'], [fx([1, d + w]), 'Dividing is not adding.'], [String(d * w), 'The answer is a small part of one whole, not a whole number.']]
      : [[fx([1, d * w]), `How many ${fx([1, d])}s fit in ${w}? There are ${d} in each whole.`], [fx([w, d]), `That is ${w} × ${fx([1, d])}. Count how many pieces fit instead.`], [String(w + d), 'Dividing is not adding.']];
    return tag(M4.mc(`${q} = ?`, fx(ans), wrongs, { fig: first ? Fig.fracStrips([[1, d]]) : Fig.fracStrips(Array(Math.min(w, 3)).fill([d, d])), meta: { kind: 'fexpr', args: first ? [[1, d], '÷', [w, 1]] : [[w, 1], '÷', [1, d]] }, hint: first ? `Split ${fx([1, d])} into ${w} equal parts.` : `Count the ${fx([1, d])}s in ${w} wholes.`, why: `${q} = ${fx(ans)}` }), '5.NF.B.7', 224, 'number');
  }
  function div4by2() {
    const b = U.int(21, 68), q = U.int(42, 199), a = b * q;
    return tag(U.num(`${c(a)} ÷ ${b} = ?`, String(q), { fig: Fig.table([['Try', 'Product'], ...[10, 50, 100].map((k) => [`${b} × ${k}`, c(b * k)])], `Multiples of ${b}`), meta: { kind: 'expr', args: [`${a} ÷ ${b}`] }, miss: missMap([[q + 10, `Check: ${b} × ${q + 10} = ${c(b * (q + 10))}.`], [q - 10, `Check: ${b} × ${q - 10} = ${c(b * (q - 10))}.`]], String(q)), hint: `Take away 100 groups of ${b}, then 10s, then ones.`, why: `${b} × ${q} = ${c(a)}` }), '5.NBT.B.6', 220, 'number');
  }

  // ===================== FRACTION OPERATIONS =====================
  function likeAdd(kind) {
    const d = U.pick([3, 4, 5, 6, 8, 10, 12]), op = kind === 'sub' ? '−' : '+';
    let n1 = U.int(1, d - 1), n2 = U.int(1, d - 1);
    if (op === '−' && n1 <= n2) [n1, n2] = [n2 + 1, n1];
    if (op === '−' && n1 >= d) return likeAdd(kind);
    if (op === '+' && n1 + n2 > d + 3) return likeAdd(kind);
    const ans = [op === '+' ? n1 + n2 : n1 - n2, d];
    const fig = Fig.fracStrips([[n1, d], [n2, d]]);
    const q = `${fx([n1, d])} ${op} ${fx([n2, d])} = ?`;
    if (kind === 'sub') return tag(U.num(q, ftyped(ans), { keys: 'frac', fig, meta: { kind: 'fexpr', args: [[n1, d], op, [n2, d]] }, miss: missMap([[`${n1 + n2}/${d}`, 'That is the sum. Subtract the tops.'], [`${n1 - n2}/0`.replace('/0', `/${d + d}`), 'The pieces stay the same size: keep the bottom number.']], ftyped(ans)), hint: 'Same denominator: subtract the tops, keep the bottom.', why: `${n1} − ${n2} = ${n1 - n2}, so the answer is ${fx(ans)}.` }), '4.NF.B.3a', 196, 'number');
    return tag(M4.mc(q, fx(ans), [[fx([n1 + n2, d + d]), 'The pieces stay the same size, so the bottom stays the same. Add only the tops.'], [fx([n1 + n2 + 1, d]), 'Count the parts again.'], [fx([n1 * n2, d]), 'Add the tops; do not multiply them.']], { fig, meta: { kind: 'fexpr', args: [[n1, d], op, [n2, d]] }, hint: 'Same denominator: add the tops, keep the bottom.', why: `${n1} + ${n2} = ${n1 + n2}, so the answer is ${fx(ans)}.` }), '4.NF.B.3a', 194, 'number');
  }
  function mixedAdd() {
    const d = U.pick([3, 4, 5, 6, 8]), w1 = U.int(1, 5), w2 = U.int(1, 4), n1 = U.int(1, d - 1), n2 = U.int(1, d - 1), op = U.pick(['+', '−']);
    const A = w1 * d + n1, B = w2 * d + n2;
    if (op === '−' && A <= B) return mixedAdd();
    const ans = [op === '+' ? A + B : A - B, d];
    return tag(U.num(`${fx([A, d], true)} ${op} ${fx([B, d], true)} = ?\nType a mixed number (use the space key) or a fraction.`, ftyped(ans, true), { keys: 'mixed', fig: Fig.numLine(0, Math.ceil((op === '+' ? A + B : A) / d) + (op === '+' ? 0 : 0), d > 6 ? 2 : d, { marks: [{ v: A / d, label: '' }] }), meta: { kind: 'fexpr', args: [[A, d], op, [B, d]] }, miss: missMap([[ftyped([op === '+' ? A + B - d : A - B + d, d], true), 'Check the regrouping: d parts make 1 whole.'.replace('d parts', `${d} parts`)]], ftyped(ans, true)), hint: `Add or subtract the wholes and the parts. ${d} parts make 1 whole.`, why: `${fx([A, d], true)} ${op} ${fx([B, d], true)} = ${fx(ans, true)}` }), '4.NF.B.3c', 200, 'number');
  }
  function decompose() {
    const d = U.pick([5, 6, 8, 10, 12]), n = U.int(3, d - 1);
    const sumStr = (parts, dd = d) => parts.map((p) => fx([p, dd])).join(' + ');
    const a1 = U.int(1, n - 1), right = [sumStr([a1, n - a1]), sumStr(Array(Math.min(n, 5)).fill(1).concat(n > 5 ? [n - 5] : []))];
    const wrong = [sumStr([a1, n - a1], d + 1 > 12 ? d - 1 : d + 1), sumStr([a1, n - a1 + 1]), sumStr([1, n - 1], 2 * d)];
    if (new Set([...right, ...wrong]).size < 5) return decompose();
    return tag({ ...U.multi(`Choose all the ways to write ${fx([n, d])}.`, right, wrong), fig: Fig.fracStrips([[n, d]]), meta: { kind: 'multiPred', args: ['fsumEq', [n, d], null] }, hint: 'Add the tops of fractions with the same bottom. They must add up to the same amount.', why: `${right[0]} = ${fx([n, d])}` }, '4.NF.B.3b', 198, 'number');
  }
  function wholeTimesFrac(entry) {
    const w = U.int(2, 9), d = U.pick([2, 3, 4, 5, 6, 8, 10, 12]), n = U.int(1, d - 1), ans = [w * n, d];
    const q = `${w} × ${fx([n, d])} = ?`, fig = Fig.fracStrips(Array(Math.min(w, 4)).fill([n, d]));
    if (entry) return tag(U.num(`${q}\nType a fraction or a mixed number.`, ftyped(ans), { keys: 'mixed', fig, meta: { kind: 'fexpr', args: [[w, 1], '×', [n, d]] }, miss: missMap([[`${w * n}/${w * d}`, 'Multiply only the top: you have more pieces of the same size.']], ftyped(ans)), hint: `${w} groups of ${fx([n, d])}: multiply the top by ${w}.`, why: `${w} × ${n} = ${w * n}, so ${fx(ans)}${w * n > d ? ` = ${fx(ans, true)}` : ''}.` }), '4.NF.B.4b', 206, 'number');
    return tag(M4.mc(q, fx(ans), [[fx([w * n, w * d]), 'Multiply only the top: the pieces stay the same size.'], [fx([n, w * d]), 'Multiplying by a whole number makes more pieces, not smaller pieces.'], [fx([w + n, d]), `That adds ${w}. Multiply instead.`]], { fig, meta: { kind: 'fexpr', args: [[w, 1], '×', [n, d]] }, hint: `${w} groups of ${fx([n, d])}: multiply the top by ${w}.`, why: `${w} × ${fx([n, d])} = ${fx(ans)}` }), '4.NF.B.4b', 204, 'number');
  }
  function fracTimesFrac(entry) {
    const d1 = U.pick([2, 3, 4, 5, 6]), d2 = U.pick([2, 3, 4, 5]), n1 = U.int(1, d1 - 1), n2 = U.int(1, d2 - 1);
    const ans = simp([n1 * n2, d1 * d2]), q = `${fx([n1, d1])} × ${fx([n2, d2])} = ?`, fig = fracArea(n1, d1, n2, d2);
    if (entry) return tag(U.num(q, ftyped(ans), { keys: 'frac', fig, meta: { kind: 'fexpr', args: [[n1, d1], '×', [n2, d2]] }, miss: missMap([[`${n1 * d2}/${d1 * n2}`, 'Multiply top × top and bottom × bottom (do not cross-multiply).']], ftyped(ans)), hint: 'Top times top, bottom times bottom.', why: `${n1} × ${n2} = ${n1 * n2}, ${d1} × ${d2} = ${d1 * d2}: ${fx([n1 * n2, d1 * d2])}` }), '5.NF.B.4', 216, 'number');
    const add = simp([n1 * d2 + n2 * d1, d1 * d2]);
    return tag(M4.mc(q, fx(ans), [[fx(simp([n1 * d2, d1 * n2])), 'That cross-multiplies. Multiply top × top and bottom × bottom.'], [fx(add), 'That adds the fractions. Multiply instead.'], [fx(simp([n1 * n2, d1 + d2])), 'Multiply the bottoms too.']], { fig, meta: { kind: 'fexpr', args: [[n1, d1], '×', [n2, d2]] }, hint: 'Top times top, bottom times bottom. The twice-shaded part of the picture is the answer.', why: `${fx([n1, d1])} × ${fx([n2, d2])} = ${fx([n1 * n2, d1 * d2])}${n1 * n2 !== ans[0] ? ` = ${fx(ans)}` : ''}` }), '5.NF.B.4', 214, 'number');
  }

  // ===================== DECIMALS =====================
  function gridDecimal() {
    const tenths = U.pick([true, false]), n = tenths ? U.int(1, 9) : U.intWhere(1, 99, (x) => x % 10 !== 0);
    const val = tenths ? `0.${n}` : dec(n, 2);
    return tag(U.num(`What decimal names the shaded part?`, val, { keys: 'dec', fig: Fig.decimalGrid(n, tenths ? 10 : 100), meta: { kind: 'dexpr', args: [`${n} / ${tenths ? 10 : 100}`] }, miss: missMap(tenths ? [[`0.0${n}`, 'There are 10 parts, so each part is one tenth.']] : [[n < 10 ? `0.${n}` : `${n}`, 'There are 100 parts, so each part is one hundredth: two places after the point.']], val), hint: tenths ? 'Each part is one tenth: 0.1.' : 'Each small square is one hundredth: 0.01.', why: `${n} out of ${tenths ? 10 : 100} = ${val}` }), '4.NF.C.6', 190, 'number');
  }
  function fracToDec() {
    const d = U.pick([10, 100]), n = d === 10 ? U.int(1, 9) : U.intWhere(1, 99, (x) => x % 10 !== 0), w = U.pick([0, 0, U.int(1, 5)]);
    const val = d === 10 ? `${w}.${n}` : `${w}.${String(n).padStart(2, '0')}`;
    // wrong place (0.07 for 7/10, or 0.7 for 7/100), the denominator written after the point, and digits swapped
    const wrongPlace = d === 10 ? `${w}.0${n}` : n < 10 ? `${w}.${n}` : `${w}.${String(n)[0]}`;
    const opts = [[wrongPlace, d === 10 ? 'Tenths use one place after the decimal point.' : 'Hundredths use two places after the decimal point.'], [`${n}.${d}`, 'The bottom number is not written after the point. Tenths: one place. Hundredths: two places.'], [w ? `${n}.${w}` : `${n}`, 'The whole number goes before the point; the parts go after it.']];
    return tag(M4.mc(`Which decimal is equal to ${w ? fx([w * d + n, d], true) : fx([n, d])}?`, val, opts.filter(([v]) => v !== val), { fig: Fig.decimalGrid(n, d), meta: { kind: 'dexpr', args: [`${w} + ${n} / ${d}`] }, hint: d === 10 ? 'Tenths: one place after the decimal point.' : 'Hundredths: two places after the decimal point.', why: `${w ? fx([w * d + n, d], true) : fx([n, d])} = ${val}` }, 3, () => `${w}.${U.int(1, 9)}${d === 100 ? U.int(1, 9) : ''}`), '4.NF.C.6', 192, 'number');
  }
  function decLine() {
    const w = U.int(0, 4), n = U.int(1, 9), val = `${w}.${n}`;
    return tag(U.line(`Place ${val} on the number line.`, val, { min: w, max: w + 1, den: 10, labels: 'ends', dec: 1 }, { meta: { kind: 'dexpr', args: [`${w} + ${n} / 10`] }, fig: Fig.decimalGrid(n, 10), hint: `The space from ${w} to ${w + 1} is cut into 10 tenths.`, why: `${val} is ${n} tenths past ${w}.` }), '4.NF.C.6', 194, 'number');
  }
  function cmpDec(level) {
    let a, b;
    if (level === 2) { const base = U.int(1, 9); a = base + U.int(1, 999) / 1000; b = base + U.int(1, 99) / 100; }
    else { a = U.int(1, 9) / 10; b = U.intWhere(11, 99, (x) => x % 10 !== 0) / 100; }
    if (Math.abs(a - b) < 1e-9) return cmpDec(level);
    if (U.pick([true, false])) [a, b] = [b, a];
    const s = (v) => String(+v.toFixed(3)), ans = a > b ? '>' : '<';
    const q = U.mcFixed(`Choose the sign that makes this true.\n${s(a)} □ ${s(b)}`, ans, ['>', '<', '='], { fig: level === 2 ? Fig.table([['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'], ...[a, b].map((v) => { const t = v.toFixed(3); return [t[0], '.', t[2], t[3], t[4]]; })]) : Fig.pair(Fig.decimalGrid(Math.round(a * 100), 100), Fig.decimalGrid(Math.round(b * 100), 100)), meta: { kind: 'cmp', args: [a, b] }, hint: 'Line up the decimal points. Compare tenths first, then hundredths.', why: `${s(a)} ${ans} ${s(b)}` });
    q.miss = { [ans === '>' ? '<' : '>']: 'More digits does not mean bigger. Compare the tenths first.', '=': 'These decimals are not equal.' };
    return tag(q, level === 2 ? '5.NBT.A.3' : '4.NF.C.7', level === 2 ? 208 : 198, 'number');
  }
  function tenthsHundredths() {
    const a = U.int(1, 9), b = U.intWhere(1, 89, (x) => x + a * 10 < 100 && x % 10 !== 0), ans = [a * 10 + b, 100];
    return tag(M4.mc(`${fx([a, 10])} + ${fx([b, 100])} = ?`, fx(ans), [[fx([a + b, 110]), 'Tenths and hundredths are different sizes. Change tenths to hundredths first.'], [fx([a + b, 100]), `${a} tenths is ${a * 10} hundredths, not ${a}.`], [fx([a * 10 + b, 10]), 'The answer is in hundredths.']], { fig: Fig.decimalGrid(a * 10 + b, 100), meta: { kind: 'fexpr', args: [[a, 10], '+', [b, 100]] }, hint: `${fx([a, 10])} = ${fx([a * 10, 100])}. Then add the hundredths.`, why: `${fx([a * 10, 100])} + ${fx([b, 100])} = ${fx(ans)}` }), '4.NF.C.5', 202, 'number');
  }
  function decHot() {
    const target = U.int(3, 7) / 10, vals = U.uniq([U.int(1, 9) / 10, U.int(11, 99) / 100, U.int(11, 99) / 100, U.int(1, 9) / 10, U.int(11, 99) / 100, U.int(1, 99) / 100]).filter((v) => Math.abs(v - target) > 1e-9).slice(0, 5);
    const a = vals.map((v, i) => (v > target ? i : -1)).filter((i) => i >= 0);
    if (vals.length < 5 || !a.length || a.length === vals.length) return decHot();
    return tag({ t: 'hot', q: `Tap all the decimals greater than ${target}.`, cells: vals.map((v) => String(v)), layout: 'row', multi: true, a, fig: Fig.numLine(0, 1, 10, { labels: 'all', dec: 1, marks: [{ v: target, label: String(target) }] }), meta: { kind: 'hotPred', args: ['gt', target, vals] }, hint: 'Compare the tenths first. 0.45 has 4 tenths; 0.5 has 5 tenths.', why: `Greater than ${target}: ${a.map((i) => vals[i]).join(', ')}` }, '4.NF.C.7', 200, 'number');
  }
  function orderDecPop() {
    const w = U.int(0, 5), vals = U.uniq([w + U.int(1, 9) / 10, w + U.int(1, 99) / 100, w + U.int(1, 999) / 1000, w + U.int(1, 999) / 1000]).map((v) => +v.toFixed(3));
    if (vals.length < 4) return orderDecPop();
    const sorted = [...vals].sort((x, y) => x - y).map(String);
    return tag({ t: 'pop', q: 'Put the decimals in order from least to greatest.', template: '□ < □ < □ < □', tiles: U.shuffle(vals.map(String)), accept: [sorted], fig: Fig.table([['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'], ...vals.map((v) => { const t = v.toFixed(3); return [t[0], '.', t[2], t[3], t[4]]; })]), meta: { kind: 'popOrder', args: [vals] }, hint: 'Write each with three places (add zeros), then compare.', why: sorted.join(' < ') }, '5.NBT.A.3', 210, 'number');
  }

  M4_SKILLS.push(
    { goal: 'number', id: 'pv', name: 'Place value to a million', icon: '🔢', levels: [
      lv('Digits in big numbers', '4.NBT.A.1 · 4.NBT.A.2', 'What is each digit worth?', [placeHot, digitValueBig, digitValueBig, tenTimes]),
      lv('Compare, order, expanded form', '4.NBT.A.2', 'Greater, less, and number forms.', [compareBig, orderBigPop, expandedMC, expandedPop]),
      lv('Powers of ten and decimal places', '5.NBT.A.2 · 5.NBT.A.3', 'Moving digits left and right.', [powerTen, powerTen, decDigitValue]) ] },
    { goal: 'number', id: 'round', name: 'Rounding & estimating', icon: '🎯', levels: [
      lv('Round to tens, hundreds, thousands', '3.NBT.A.1 · 4.NBT.A.3', 'Closer to which one?', [() => roundMC(0), () => roundMC(1), () => roundMC(1)]),
      lv('Round any place, then estimate', '4.NBT.A.3', 'Is the answer reasonable?', [roundEntry, estimateSum]),
      lv('Round decimals', '5.NBT.A.4', 'Tenths and hundredths.', [() => roundDecMC(false), () => roundDecMC(true)]) ] },
    { goal: 'number', id: 'addsub', name: 'Add & subtract', icon: '➕', levels: [
      lv('Add and subtract to 10,000', '3.NBT.A.2 · 4.NBT.B.4', 'Line up the places.', [() => addSubMC(0), () => addSubMC(1), () => addSubMC(1)]),
      lv('Bigger numbers and missing parts', '4.NBT.B.4', 'Up to a million.', [addSubEntry, missingAddend]),
      lv('Add and subtract decimals', '5.NBT.B.7', 'Line up the decimal points.', [() => decAddSub(false), () => decAddSub(true)]) ] },
    { goal: 'number', id: 'mult', name: 'Multiply', icon: '✖️', levels: [
      lv('Multiply by one digit', '3.OA.C.7 · 4.NBT.B.5', 'Area models and regrouping.', [facts, () => mul1(false), () => mul1(true)]),
      lv('Two digits times two digits', '4.NBT.B.5', 'Four parts in the area model.', [() => mul2('pop'), () => mul2('entry'), () => mul2('mc')]),
      lv('Multi-digit multiplying', '5.NBT.B.5', 'The standard algorithm.', [() => mul3(false), () => mul3(true)]) ] },
    { goal: 'number', id: 'div', name: 'Divide', icon: '➗', levels: [
      lv('Share and divide', '3.OA.C.7 · 4.NBT.B.6', 'Equal shares, zeros in the answer.', [divFacts, () => div1(true), () => div1(false)]),
      lv('Remainders', '4.NBT.B.6', 'What is left over?', [() => remainder(false), () => remainder(true)]),
      lv('Two-digit divisors', '5.NBT.B.6', 'Use multiples to divide.', [() => div2(false), () => div2(true), div4by2]) ] },
    { goal: 'number', id: 'frac', name: 'Equivalent & comparing fractions', icon: '🍕', levels: [
      lv('Equivalent fractions', '3.NF.A.3 · 4.NF.A.1', 'Same amount, different names.', [equivHalf, equivMC, equivMissing]),
      lv('Compare fractions', '4.NF.A.2', 'Use one half or a common denominator.', [compareUnlike, compareUnlike, greaterHalf]),
      lv('Add unlike denominators', '5.NF.A.1', 'Find a common denominator.', [() => addUnlike(false), () => addUnlike(true), mixedUnlike]) ] },
    { goal: 'number', id: 'fop', name: 'Fraction operations', icon: '🧁', levels: [
      lv('Add and subtract like fractions', '4.NF.B.3a · 4.NF.B.3c', 'Same-size pieces.', [() => likeAdd('add'), () => likeAdd('sub'), mixedAdd]),
      lv('Fractions times whole numbers', '4.NF.B.3b · 4.NF.B.4', 'Groups of fractions.', [() => wholeTimesFrac(false), () => wholeTimesFrac(true), decompose]),
      lv('Fraction times fraction', '5.NF.B.4 · 5.NF.B.7', 'A part of a part.', [() => fracTimesFrac(false), () => fracTimesFrac(true), unitFracDiv]) ] },
    { goal: 'number', id: 'dec', name: 'Decimals', icon: '💲', levels: [
      lv('Tenths and hundredths', '4.NF.C.6', 'Decimals from fractions and grids.', [gridDecimal, fracToDec, decLine]),
      lv('Compare and combine decimals', '4.NF.C.5 · 4.NF.C.7', 'Which is greater?', [() => cmpDec(1), tenthsHundredths, decHot]),
      lv('Thousandths and decimal products', '5.NBT.A.3 · 5.NBT.B.7', 'Three places after the point.', [() => cmpDec(2), orderDecPop, decMul]) ] },
  );
})();
