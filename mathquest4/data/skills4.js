// Math Quest 4: the skills that are new in this app (MAP Math 4's 17 skills are borrowed as they are).
// Fact review, multiplying and dividing step by step (hints open one step of the written method at a time),
// fractions and decimals on number lines, and money and time stories. Every answer is computed in code;
// meta {kind, args} lets tools/validate.js recompute it independently.
const MQ4_NEW = [];
(function () {
  const { tag, kid, cap, missMap, pl, c, dec, decTrim, fx, mc, lv, mulMisses } = M4;
  const PLACE = ['ones', 'tens', 'hundreds', 'thousands'];
  const ONE = ['one', 'ten', 'hundred', 'thousand'];
  const placeName = (k, i) => (k === 1 ? ONE[i] : PLACE[i]);

  // ===================== FACT REVIEW =====================
  function mulFact() {
    const a = U.int(3, 9), b = U.int(3, 9);
    return tag(U.num(`${a} × ${b} = ?`, String(a * b), { fig: Fig.array(a, b), meta: { kind: 'mul', args: [a, b] }, miss: missMap([[a * b + b, `That is ${a + 1} rows of ${b}.`], [a * b - b, `That is ${a - 1} rows of ${b}.`], [a + b, 'That is the sum. Multiply instead.']], String(a * b)), hint: `${a} rows of ${b}. Skip count by ${b}.`, why: `${a} × ${b} = ${a * b}` }), '3.OA.C.7', 180, 'number');
  }
  function divFact() {
    const b = U.int(3, 9), q = U.int(3, 9), a = b * q;
    return tag(U.num(`${a} ÷ ${b} = ?`, String(q), { fig: Fig.groups(b, q), meta: { kind: 'div', args: [a, b] }, miss: missMap([[a - b, 'Dividing is sharing into equal groups, not taking away once.'], [q + 1, `Check: ${b} × ${q + 1} = ${b * (q + 1)}, not ${a}.`]], String(q)), hint: `Think: ${b} times what is ${a}?`, why: `${b} × ${q} = ${a}, so ${a} ÷ ${b} = ${q}.` }), '3.OA.C.7', 182, 'number');
  }
  function missingFactor() {
    const a = U.int(3, 9), b = U.int(3, 9), p = a * b;
    return tag(U.num(`${a} × □ = ${p}\nWhat number goes in the box?`, String(b), { fig: Fig.shareBar(p, a), meta: { kind: 'div', args: [p, a] }, miss: missMap([[p - a, `That is ${p} − ${a}. Find the number of groups of ${a} that make ${p}.`], [b + 1, `Check: ${a} × ${b + 1} = ${a * (b + 1)}.`]], String(b)), hint: `Skip count by ${a} until you reach ${p}, or think ${p} ÷ ${a}.`, why: `${a} × ${b} = ${p}` }), '3.OA.A.4', 186, 'algebra');
  }
  function knownFact() {
    const a = U.int(3, 9), b = U.int(4, 8), up = U.pick([true, false]), nb = up ? b + 1 : b - 1;
    return tag(U.num(`${a} × ${b} = ${a * b}.\nUse that fact to find ${a} × ${nb}.`, String(a * nb), { fig: Fig.array(a, nb), meta: { kind: 'mul', args: [a, nb] }, miss: missMap([[a * b + (up ? 1 : -1), `${a} × ${nb} is one ${up ? 'more' : 'fewer'} group of ${a}, not one ${up ? 'more' : 'less'}.`], [a * b + (up ? b : -b), `That changes the number of groups of ${b}. Here the groups of ${a} change: ${up ? 'add' : 'take away'} ${a}.`]], String(a * nb)), hint: `${a} × ${nb} is ${a} × ${b} ${up ? 'plus' : 'minus'} one group of ${a}.`, why: `${a * b} ${up ? '+' : '−'} ${a} = ${a * nb}` }), '3.OA.B.5', 188, 'algebra');
  }
  function breakApart() {
    const a = U.int(6, 9), b = U.int(6, 9), x = U.int(2, b - 2), y = b - x;
    return tag(U.num(`Break ${b} into ${x} + ${y}.\n${a} × ${b} = ${a} × ${x} + ${a} × □\nWhat number goes in the box?`, String(y), { fig: Fig.array(a, b), meta: { kind: 'sub', args: [b, x] }, miss: missMap([[a * y, `That is ${a} × ${y}. The box is the number you multiply ${a} by.`], [x, `${a} × ${x} is already there. What is left of ${b}?`]], String(y)), hint: `${x} + □ = ${b}`, why: `${b} = ${x} + ${y}, so ${a} × ${b} = ${a * x} + ${a * y} = ${a * b}` }), '3.OA.B.5', 190, 'algebra');
  }
  function family() {
    const a = U.int(3, 9), b = U.intWhere(3, 9, (x) => x !== a), p = a * b, by = U.pick([a, b]);
    const ans = `${p} ÷ ${by} = ${p / by}`;
    const w = [[`${p} − ${by} = ${p - by}`, `True, but it uses ${p - by}. A fact family uses only ${a}, ${b}, and ${p}.`], [`${a} + ${b} = ${a + b}`, `True, but it uses ${a + b}. A fact family uses only ${a}, ${b}, and ${p}.`], [`${a} × ${b + 1} = ${a * (b + 1)}`, `True, but it uses ${b + 1} and ${a * (b + 1)}.`]];
    return tag(mc(`Which fact is in the same fact family as ${a} × ${b} = ${p}?`, ans, w, { fig: Fig.array(a, b), meta: { kind: 'family', args: [a, b, p] }, hint: `A fact family uses the same three numbers: ${a}, ${b}, and ${p}. Division undoes multiplication.`, why: `${a} × ${b} = ${p}, so ${ans}.` }), '3.OA.B.6', 186, 'algebra');
  }
  // big: Grade 5 (5.NBT.A.2) facts with thousands; otherwise tens and hundreds.
  function tensFact(big) {
    const a = U.int(2, 9), b = U.int(2, 9), kind = U.pick(big ? ['x1000', 'th', 'div'] : ['x10', 'x100', 'tt', 'div']);
    const std = big ? '5.NBT.A.2' : kind === 'tt' || kind === 'div' ? '4.NBT.B.5' : '3.NBT.A.3', rit = big ? 206 : kind === 'tt' || kind === 'div' ? 196 : 188;
    if (kind === 'div') {
      const k = big ? 1000 : U.pick([10, 100]), t = a * b * k, unit = { 10: 'tens', 100: 'hundreds', 1000: 'thousands' }[k];
      return tag(U.num(`${c(t)} ÷ ${a} = ?`, String(b * k), { fig: Fig.table([['Basic fact', 'Bigger fact'], [`${a * b} ÷ ${a} = ${b}`, `${c(t)} ÷ ${a} = ?`]]), meta: { kind: 'div', args: [t, a] }, miss: missMap([[b, `${a} × ${b} = ${a * b}, so ${c(t)} ÷ ${a} is ${b} ${unit}, not ${b} ones.`], [b * k * 10, 'One zero too many. Check by multiplying.'], [b * k / 10, 'One zero too few. Check by multiplying.']], String(b * k)), hint: `${c(t)} is ${a * b} ${unit}. ${a * b} ÷ ${a} = ${b}.`, why: `${a * b} ${unit} ÷ ${a} = ${b} ${unit} = ${c(b * k)}. Check: ${a} × ${c(b * k)} = ${c(t)}` }), std, rit, 'number');
    }
    const [x, y] = { x10: [a, b * 10], x100: [a, b * 100], tt: [a * 10, b * 10], x1000: [a, b * 1000], th: [a * 10, b * 100] }[kind];
    const p = x * y, zeros = String(x).length + String(y).length - 2;
    return tag(U.num(`${c(x)} × ${c(y)} = ?`, String(p), { fig: Fig.table([['Basic fact', 'Bigger fact'], [`${a} × ${b} = ${a * b}`, `${c(x)} × ${c(y)} = ?`]]), meta: { kind: 'mul', args: [x, y] }, miss: missMap([[a * b, `Count the zeros: ${c(x)} × ${c(y)} has ${pl(zeros, 'zero')} after ${a} × ${b}.`], [p * 10, 'One zero too many.'], [p / 10, 'One zero too few.']], String(p)), hint: `Find ${a} × ${b} first, then count the zeros in ${c(x)} and ${c(y)}.`, why: `${a} × ${b} = ${a * b}, then ${pl(zeros, 'zero')}: ${c(p)}` }), std, rit, 'number');
  }

  // ===================== MULTIPLY STEP BY STEP =====================
  // The written method for a × b (b one digit): one step per place, with the carried number.
  function mulSteps(a, b) {
    const ds = String(a).split('').map(Number).reverse(), out = [];
    let carry = 0;
    ds.forEach((d, i) => {
      const t = d * b + carry, last = i === ds.length - 1;
      out.push(`${PLACE[i][0].toUpperCase() + PLACE[i].slice(1)}: ${d} × ${b} = ${d * b}${carry ? `, plus ${carry} carried = ${t}` : ''}. ${last ? `Write ${t}.` : `Write ${t % 10} in the ${PLACE[i]} place${t >= 10 ? ` and carry ${Math.floor(t / 10)}` : ''}.`}`);
      carry = Math.floor(t / 10);
    });
    out.push(`So ${c(a)} × ${b} = ${c(a * b)}.`);
    return out;
  }
  const mulFig = (a, b) => { const s = String(a), w = s.length + 1; return Fig.table([['', ...['O', 'T', 'H', 'Th', 'TTh'].slice(0, w).reverse()], ['', ...s.padStart(w, ' ').split('').map((d) => d.trim())], ['×', ...String(b).padStart(w, ' ').split('').map((d) => d.trim())]], 'Line up the places'); };
  function carryQ() {
    const t = U.int(1, 9), o = U.int(2, 9), b = U.intWhere(3, 9, (x) => o * x >= 10), a = 10 * t + o;
    const k = Math.floor((o * b) / 10);
    return tag(U.num(`Multiply ${a} × ${b} the written way.\nOnes first: ${o} × ${b} = ${o * b}. Write ${(o * b) % 10} in the ones place.\nWhat number do you carry to the tens place?`, String(k), { fig: mulFig(a, b), meta: { kind: 'quot', args: [o * b, 10] }, miss: missMap([[o * b, `Only one digit fits in the ones place. ${o * b} is ${pl(k, 'ten')} and ${(o * b) % 10} ones: carry the tens.`], [(o * b) % 10, `${(o * b) % 10} stays in the ones place. Carry the tens.`]], String(k)), hint: `${o * b} = ${k} tens and ${(o * b) % 10} ones.`, why: `${o * b} is ${pl(k, 'ten')} and ${pl((o * b) % 10, 'one')}, so carry ${k}.` }), '4.NBT.B.5', 188, 'number');
  }
  function tensRowQ() {
    const t = U.int(2, 9), o = U.int(2, 9), b = U.intWhere(3, 9, (x) => o * x >= 10), a = 10 * t + o, k = Math.floor((o * b) / 10);
    return tag(U.num(`Multiply ${a} × ${b} the written way.\nOnes: ${o} × ${b} = ${o * b}. Write ${(o * b) % 10}, carry ${k}.\nTens: ${t} × ${b} = ${t * b}, plus the ${k} you carried. How many tens is that?`, String(t * b + k), { fig: mulFig(a, b), meta: { kind: 'expr', args: [`${t} × ${b} + ${k}`] }, miss: missMap([[t * b, `Add the ${k} you carried.`], [t * b + o * b, `Add only the carried ${k}, not all ${o * b}.`]], String(t * b + k)), steps: [`${t} × ${b} = ${t * b}.`, `${t * b} + ${k} = ${t * b + k}.`], hint: `${t} × ${b}, then add ${k}.`, why: `${t * b} + ${k} = ${t * b + k} tens, so ${a} × ${b} = ${a * b}.` }), '4.NBT.B.5', 190, 'number');
  }
  function mulWritten(lo, hi, rit, asMC = false) {
    const b = U.int(3, 9), a = U.intWhere(lo, hi, (x) => x % 10 !== 0 && (x % 10) * b >= 10), p = a * b;
    const base = { fig: mulFig(a, b), meta: { kind: 'mul', args: [a, b] }, steps: mulSteps(a, b), hint: 'Start with the ones. Carry when a place makes 10 or more.', why: `${c(a)} × ${b} = ${c(p)}` };
    if (asMC) return tag(mc(`${c(a)} × ${b} = ?`, c(p), mulMisses(a, b).map(([v, w]) => [c(v), w]), base, 3, () => c(p + U.pick([10, -10, 100, b]))), '4.NBT.B.5', rit, 'number');
    return tag(U.num(`${c(a)} × ${b} = ?`, String(p), { ...base, miss: missMap(mulMisses(a, b), String(p)) }), '4.NBT.B.5', rit, 'number');
  }
  function twoRows(which, big = false) {
    const a = big ? U.intWhere(112, 987, (x) => x % 10 !== 0) : U.intWhere(12, 98, (x) => x % 10 !== 0), b = U.intWhere(12, 98, (x) => x % 10 !== 0), o = b % 10, t = Math.floor(b / 10);
    const fig = Fig.table([['', 'Step', 'Product'], ['1', `${a} × ${o}`, which === 'one' ? '?' : c(a * o)], ['2', `${a} × ${t * 10}`, which === 'two' ? '?' : which === 'one' ? '' : c(a * t * 10)], ['', 'Add', which === 'all' ? '?' : '']], `${a} × ${b}: two rows`);
    if (which === 'one') return tag(U.num(`Multiply ${c(a)} × ${b} the written way.\nRow 1: multiply ${a} by the ones digit, ${o}. What is ${c(a)} × ${o}?`, String(a * o), { fig, meta: { kind: 'mul', args: [a, o] }, steps: mulSteps(a, o), miss: missMap(mulMisses(a, o), String(a * o)), hint: `${a} × ${o}`, why: `${a} × ${o} = ${c(a * o)}` }), big ? '5.NBT.B.5' : '4.NBT.B.5', big ? 206 : 194, 'number');
    if (which === 'two') return tag(U.num(`Multiply ${c(a)} × ${b} the written way.\nRow 2: multiply ${a} by the tens digit. ${t} tens is ${t * 10}. What is ${c(a)} × ${t * 10}?`, String(a * t * 10), { fig, meta: { kind: 'mul', args: [a, t * 10] }, steps: [`Write a 0 in the ones place first: you are multiplying by tens.`, `${a} × ${t} = ${c(a * t)}.`, `With the 0: ${c(a * t * 10)}.`], miss: missMap([[a * t, `This row is ${a} × ${t * 10}, not ${a} × ${t}. Write a 0 in the ones place first.`], [a * t * 100, 'Only one zero: you multiply by tens, not hundreds.']], String(a * t * 10)), hint: `${a} × ${t}, then one zero.`, why: `${a} × ${t * 10} = ${c(a * t * 10)}` }), big ? '5.NBT.B.5' : '4.NBT.B.5', big ? 208 : 198, 'number');
    return tag(U.num(`${a} × ${b} = ?`, String(a * b), { fig, meta: { kind: 'mul', args: [a, b] }, steps: [`Row 1: ${a} × ${o} = ${c(a * o)}.`, `Row 2: ${a} × ${t * 10} = ${c(a * t * 10)}.`, `Add the rows: ${c(a * o)} + ${c(a * t * 10)} = ${c(a * b)}.`], miss: missMap(mulMisses(a, b), String(a * b)), hint: 'Multiply by the ones, then by the tens (with a 0), then add the two rows.', why: `${c(a * o)} + ${c(a * t * 10)} = ${c(a * b)}` }), big ? '5.NBT.B.5' : '4.NBT.B.5', big ? 212 : 202, 'number');
  }

  // ===================== DIVIDE STEP BY STEP =====================
  // The written method for a ÷ b (b one digit): share the biggest place first, trade what is left down.
  function divSteps(a, b) {
    const ds = String(a).split('').map(Number), n = ds.length, out = [];
    let cur = 0, started = false;
    ds.forEach((d, i) => {
      const pi = n - 1 - i;
      cur = cur * 10 + d;
      if (!started && cur < b && pi > 0) { out.push(`There ${cur === 1 ? 'is' : 'are'} only ${cur} ${placeName(cur, pi)}: not enough to put one in each of ${b} groups. Trade ${cur === 1 ? 'it' : 'them'} for ${cur * 10} ${PLACE[pi - 1]}.`); return; }
      const qd = Math.floor(cur / b), r = cur - qd * b;
      started = true;
      out.push(`${cur} ${placeName(cur, pi)} ÷ ${b} = ${qd}${r ? `, with ${r} left over` : ''}. Write ${qd} in the ${PLACE[pi]} place.${r && pi > 0 ? ` Trade the ${r} left over for ${r * 10} ${PLACE[pi - 1]}.` : ''}`);
      cur = r;
    });
    const q = Math.floor(a / b), r = a % b;
    out.push(`${c(a)} ÷ ${b} = ${c(q)}${r ? ` R ${r}` : ''}. Check: ${b} × ${c(q)}${r ? ` + ${r}` : ''} = ${c(a)}.`);
    return out;
  }
  function tradeQ() {
    const b = U.int(3, 8), a = U.intWhere(b * 10 + 1, 99, (x) => Math.floor(x / 10) >= b && Math.floor(x / 10) % b !== 0 && x % b === 0);
    if (!(a % b === 0 && Math.floor(a / 10) >= b && Math.floor(a / 10) % b !== 0)) return tradeQ();
    const t = Math.floor(a / 10), o = a % 10, qt = Math.floor(t / b), left = t - qt * b;
    return tag(U.num(`Divide ${a} ÷ ${b} the written way.\nTens first: ${t} tens ÷ ${b} = ${qt} ${qt === 1 ? 'ten' : 'tens'} in each group, with ${left} ${left === 1 ? 'ten' : 'tens'} left over.\nTrade the left-over tens for ones and add the ${pl(o, 'one')}. How many ones are there now?`, String(left * 10 + o), { fig: Fig.shareBar(a, b), meta: { kind: 'expr', args: [`(${t} - ${b} × ${qt}) × 10 + ${o}`] }, miss: missMap([[left * 10, `Add the ${pl(o, 'one')} that were already there.`], [left + o, `Each left-over ten is 10 ones: ${left} tens = ${left * 10} ones.`]], String(left * 10 + o)), steps: [`${left} ${left === 1 ? 'ten' : 'tens'} = ${left * 10} ones.`, `${left * 10} + ${o} = ${left * 10 + o} ones.`], hint: '1 ten = 10 ones.', why: `${left} tens + ${o} ones = ${left * 10 + o} ones. Then ${left * 10 + o} ÷ ${b} = ${(left * 10 + o) / b}, so ${a} ÷ ${b} = ${a / b}.` }), '4.NBT.B.6', 190, 'number');
  }
  function divWritten(lo, hi, rit, opts = {}) {
    const b = U.int(3, 9), q = U.intWhere(lo, hi, (x) => !opts.zero || /0/.test(String(x).slice(1))), a = b * q;
    const base = { fig: Fig.shareBar(c(a), b), meta: { kind: 'div', args: [a, b] }, steps: divSteps(a, b), hint: 'Share the biggest place first. Trade what is left over to the next place.', why: `${b} × ${c(q)} = ${c(a)}` };
    if (opts.mc) {
      const noZero = +String(q).replace(/0/g, '');
      return tag(mc(`${c(a)} ÷ ${b} = ?`, c(q), [[c(noZero), `When a place can't be shared, write 0 there. Check: ${b} × ${noZero} = ${c(b * noZero)}.`], [c(q * 10), `Check: ${b} × ${c(q * 10)} = ${c(b * q * 10)}.`], [c(q + 10), `Check: ${b} × ${c(q + 10)} = ${c(b * (q + 10))}.`]], base, 3, () => c(q + U.pick([1, -1, 100]))), '4.NBT.B.6', rit, 'number');
    }
    return tag(U.num(`${c(a)} ÷ ${b} = ?`, String(q), { ...base, miss: missMap([[q + 10, `Check: ${b} × ${c(q + 10)} = ${c(b * (q + 10))}.`], [a - b, 'Dividing is sharing into equal groups.']], String(q)) }), '4.NBT.B.6', rit, 'number');
  }
  const multTable = (b) => Fig.table([['×', `${b} ×`, '×', `${b} ×`], ...[1, 2, 3, 4, 5].map((k) => [String(k), c(b * k), String(k + 5), c(b * (k + 5))])], `Multiples of ${b}`);
  function div2Written() {
    const b = U.intWhere(12, 39, (x) => x % 10 !== 0), q = U.int(12, 89), a = b * q;
    return tag(U.num(`${c(a)} ÷ ${b} = ?`, String(q), { fig: multTable(b), meta: { kind: 'div', args: [a, b] }, steps: [`Use the table of multiples of ${b}.`, ...divSteps(a, b)], miss: missMap([[q + 10, `Check: ${b} × ${q + 10} = ${c(b * (q + 10))}.`], [q - 1, `Check: ${b} × ${q - 1} = ${c(b * (q - 1))}.`], [q + 1, `Check: ${b} × ${q + 1} = ${c(b * (q + 1))}.`]], String(q)), hint: `Divide one place at a time. How many ${b}s fit? Use the table.`, why: `${b} × ${q} = ${c(a)}` }), '5.NBT.B.6', 212, 'number');
  }
  function firstDigit2() {
    const b = U.intWhere(12, 39, (x) => x % 10 !== 0), q = U.int(12, 89), a = b * q, ds = String(a);
    let n = 1; while (+ds.slice(0, n) < b) n++;
    const cur = +ds.slice(0, n), d = Math.floor(cur / b), place = PLACE[ds.length - n];
    return tag(U.num(`Divide ${c(a)} ÷ ${b} the written way.\nStart with the first ${pl(n, 'digit')}: ${cur} ${place}. How many ${b}s fit into ${cur}?`, String(d), { fig: multTable(b), meta: { kind: 'quot', args: [cur, b] }, miss: missMap([[d + 1, `${b} × ${d + 1} = ${b * (d + 1)}, more than ${cur}.`], [d - 1, `More ${b}s still fit: ${cur} − ${b * (d - 1)} = ${cur - b * (d - 1)}.`]], String(d)), hint: `Find the biggest multiple of ${b} that is not more than ${cur}.`, why: `${b} × ${d} = ${b * d} is not more than ${cur}, and ${b} × ${d + 1} = ${b * (d + 1)} is too much. Write ${d} in the ${place} place.` }), '5.NBT.B.6', 208, 'number');
  }
  function remWritten(ask) {
    const b = U.int(3, 9), q = U.int(ask === 'check' ? 104 : 23, ask === 'check' ? 1240 : 1100), r = U.int(1, b - 1), a = b * q + r;
    if (ask === 'check') return tag(U.num(`${c(a)} ÷ ${b} = ${c(q)} R ${r}.\nCheck it: ${b} × ${c(q)} + ${r} = ?`, String(a), { fig: Fig.shareBar(c(a), b, { each: c(q), r }), meta: { kind: 'expr', args: [`${b} × ${q} + ${r}`] }, miss: missMap([[b * q, `Add the remainder, ${r}.`], [b * q - r, `Add the remainder; don't take it away.`]], String(a)), steps: [`${b} × ${c(q)} = ${c(b * q)}.`, `${c(b * q)} + ${r} = ${c(a)}.`], hint: `Multiply first, then add ${r}.`, why: `${c(b * q)} + ${r} = ${c(a)}, the number we started with, so the division is right.` }), '4.NBT.B.6', 196, 'number');
    const fig = Fig.shareBar(c(a), b, { r });
    if (ask === 'q') return tag(U.num(`${c(a)} ÷ ${b} = □ R ${r}\nWhat is the quotient (the number in the box)?`, String(q), { fig, meta: { kind: 'quot', args: [a, b] }, steps: divSteps(a, b), miss: missMap([[q + 1, `Check: ${b} × ${c(q + 1)} = ${c(b * (q + 1))}, more than ${c(a)}.`], [q - 1, `Check: ${b} × ${c(q - 1)} = ${c(b * (q - 1))}; then ${c(a - b * (q - 1))} would be left, which is ${b} or more.`]], String(q)), hint: 'Divide one place at a time.', why: `${b} × ${c(q)} = ${c(b * q)}, and ${c(a)} − ${c(b * q)} = ${r}.` }), '4.NBT.B.6', 200, 'number');
    return tag(U.num(`What is the remainder when ${c(a)} is divided by ${b}?`, String(r), { fig, meta: { kind: 'rem', args: [a, b] }, steps: divSteps(a, b), miss: missMap([[q, 'That is the quotient. The remainder is what is left over.'], [r + b, `The remainder is always less than ${b}.`]], String(r)), hint: `Divide, then find what is left over. It is less than ${b}.`, why: `${b} × ${c(q)} = ${c(b * q)}; ${c(a)} − ${c(b * q)} = ${r}` }), '4.NBT.B.6', 200, 'number');
  }

  // ===================== NUMBER LINES =====================
  function placeFrac() {
    const d = U.pick([2, 3, 4, 6, 8]), max = U.pick([1, 2]), n = U.intWhere(1, max * d - 1, (x) => x % d !== 0);
    return tag(U.line(`Place ${fx([n, d])} on the number line.`, `${n}/${d}`, { min: 0, max, den: d }, { meta: { kind: 'frac', args: [n, d] }, hint: `Each whole is cut into ${d} equal parts. Count ${pl(n, 'part')} from 0.`, why: `${fx([n, d])} is ${n} jumps of ${fx([1, d])} from 0.` }), '3.NF.A.2', 186, 'number');
  }
  function namePoint() {
    const d = U.pick([3, 4, 5, 6, 8, 10]), max = d > 6 ? 1 : U.pick([1, 2]), n = U.intWhere(1, max * d - 1, (x) => x % d !== 0);
    const w = [[fx([n, d + 1]), `Count the spaces, not the tick marks: 1 whole has ${d} parts.`], [fx([n + 1, d]), 'Count the jumps from 0 again.'], [fx([d, n]), 'The bottom number is the number of equal parts in one whole.'], [fx([n - 1, d]), 'Start counting at 0, not at the first tick.']];
    return tag(mc('What fraction is at the point?', fx([n, d]), w, { fig: Fig.numLine(0, max, d, { marks: [{ v: n / d, label: '?' }] }), meta: { kind: 'frac', args: [n, d] }, hint: 'How many equal parts are in 1 whole? Count the jumps from 0.', why: `Each whole has ${d} parts; the point is ${n} jumps from 0: ${fx([n, d])}.` }, 3, () => fx([U.int(1, max * d), d])), '3.NF.A.2', 188, 'number');
  }
  function equivPoint() {
    const d0 = U.pick([2, 3, 4]), k = U.pick([2, 3]), d = d0 * k;
    if (d > 12) return equivPoint();
    const n0 = U.int(1, d0 - 1), n = n0 * k;
    const w = [[fx([n0 + 1, d0]), 'Find the point on the other line; it must line up exactly.'], [fx([n, d0]), `Fewer parts means bigger parts, so the top number gets smaller too: ${n} ÷ ${k}.`], [fx([n0, d]), `Divide the top and the bottom by the same number.`]];
    return tag(mc(`The point is at ${fx([n, d])}. Which fraction names the same point?`, fx([n0, d0]), w, { fig: Fig.pair(Fig.numLine(0, 1, d, { marks: [{ v: n / d, label: `${n}/${d}` }] }), Fig.numLine(0, 1, d0, { marks: [{ v: n0 / d0, label: '?' }] })), meta: { kind: 'frac', args: [n, d] }, hint: `Look at the second number line. Which tick lines up with ${fx([n, d])}?`, why: `${fx([n, d])} = ${fx([n0, d0])}: the same point, so they are equivalent.` }, 3, () => fx([U.int(1, d0 + 1), d0 + 1])), '4.NF.A.1', 194, 'number');
  }
  function placeMixed() {
    const d = U.pick([2, 3, 4, 5, 6]), w = U.int(1, 2), r = U.int(1, d - 1), n = w * d + r;
    return tag(U.line(`Place ${fx([n, d], true)} on the number line.`, `${n}/${d}`, { min: 0, max: 3, den: d }, { meta: { kind: 'frac', args: [n, d] }, hint: `Go to ${w} first. Then count ${pl(r, 'more part')} of ${fx([1, d])}.`, why: `${fx([n, d], true)} is ${pl(w, 'whole')} and ${fx([r, d])} more = ${fx([n, d])}.` }), '4.NF.B.3', 196, 'number');
  }
  function nameMixed() {
    const d = U.pick([2, 3, 4, 5, 6]), w = U.int(1, 2), r = U.int(1, d - 1), n = w * d + r;
    const w2 = [[fx([n + d, d], true), 'Count the wholes again: which whole number is just before the point?'], [fx([n + 1, d], true), 'Count the parts after the whole number again.'], [fx([w * (d + 1) + r, d + 1], true), 'The bottom number is the number of equal parts between two whole numbers.']];
    return tag(mc('What mixed number is at the point?', fx([n, d], true), w2, { fig: Fig.numLine(0, 3, d, { marks: [{ v: n / d, label: '?' }] }), meta: { kind: 'frac', args: [n, d] }, hint: `Which whole number comes just before the point? Then count the jumps of ${fx([1, d])} after it.`, why: `The point is ${pl(r, 'part')} past ${w}: ${fx([n, d], true)}.` }, 3, () => fx([U.int(d + 1, 3 * d - 1), d], true)), '4.NF.B.3', 196, 'number');
  }
  function placeTenths() {
    const n = U.intWhere(1, 19, (x) => x !== 10), val = decTrim(n, 1);
    return tag(U.line(`Place ${val} on the number line.`, val, { min: 0, max: 2, den: 10 }, { meta: { kind: 'dexpr', args: [`${n} / 10`] }, hint: 'Each whole is cut into 10 tenths.', why: `${val} is ${pl(n, 'tenth')} from 0.` }), '4.NF.C.6', 194, 'number');
  }
  function nameHundredths() {
    const a = U.int(1, 8), k = U.int(1, 9), min = a / 10, max = (a + 1) / 10, ans = dec(a * 10 + k, 2);
    const w = [[dec(a * 100 + k, 3), 'Hundredths have two digits after the point.'], [`0.${k}`, `The point is between ${dec(a, 1)} and ${dec(a + 1, 1)}.`], [dec(a * 10 + k + 1, 2), 'Count the small jumps again, starting at the left end.'], [dec(a * 10 + k - 1, 2), 'Start counting at the left end, not at the first tick.']];
    return tag(mc('What decimal is at the point?', ans, w, { fig: Fig.numLine(min, max, 100, { labels: [min, max], dec: 2, marks: [{ v: (a * 10 + k) / 100, label: '?' }] }), meta: { kind: 'dexpr', args: [`${a} / 10 + ${k} / 100`] }, hint: `From ${dec(a * 10, 2)} to ${dec(a * 10 + 10, 2)} there are 10 hundredths. Count the jumps.`, why: `${k} hundredths past ${dec(a * 10, 2)} is ${ans}.` }, 3, () => dec(a * 10 + U.int(0, 10), 2)), '4.NF.C.6', 200, 'number');
  }
  function fracToDecLine() {
    const tenths = U.pick([true, false]), den = tenths ? 10 : 100, n = tenths ? U.int(1, 9) : U.intWhere(11, 99, (x) => x % 10 !== 0), ans = tenths ? dec(n, 1) : dec(n, 2);
    const w = tenths ? [[dec(n, 2), `${dec(n, 2)} is ${n} hundredths. ${fx([n, 10])} is ${n} tenths.`], [`${n}.1`, `The 10 in ${fx([n, 10])} means tenths; it is not a digit.`], [`1.${n}`, `${fx([n, 10])} is less than 1.`]] : [[dec(n, 3), `${fx([n, 100])} is ${n} hundredths: two places after the point.`], [`${Math.floor(n / 10)}.${n % 10}`, `${fx([n, 100])} is less than 1.`], [`1.${n}`, `${fx([n, 100])} is less than 1.`]];
    return tag(mc(`The point is at ${fx([n, den])}. Which decimal names the same point?`, ans, w, { fig: Fig.numLine(0, 1, 10, { labels: 'whole', marks: [{ v: n / den, label: `${n}/${den}` }] }), meta: { kind: 'frac', args: [n, den] }, hint: `${fx([1, den])} = ${tenths ? '0.1' : '0.01'}.`, why: `${fx([n, den])} = ${ans}` }, 3, () => dec(U.int(1, 99), 2)), '4.NF.C.6', 198, 'number');
  }

  function nameThousandths() {
    const a = U.int(10, 98), k = U.int(1, 9), min = a / 100, max = (a + 1) / 100, ans = dec(a * 10 + k, 3);
    const w = [[dec(a * 10 + k + 1, 3), 'Count the small jumps again, starting at the left end.'], [dec(a * 10 + k - 1, 3), 'Start counting at the left end, not at the first tick.'], [dec(a, 2), 'That is the left end. The point is past it.'], [dec(a * 10 + 10 - k, 3), 'Count from the left end, not the right.']];
    return tag(mc('What decimal is at the point?', ans, w, { fig: Fig.numLine(min, max, 1000, { labels: [min, max], dec: 2, marks: [{ v: (a * 10 + k) / 1000, label: '?' }] }), meta: { kind: 'dexpr', args: [`${a} / 100 + ${k} / 1000`] }, hint: `From ${dec(a, 2)} to ${dec(a + 1, 2)} there are 10 thousandths.`, why: `${pl(k, 'thousandth')} past ${dec(a, 2)} is ${ans}.` }, 3, () => dec(a * 10 + U.int(1, 9), 3)), '5.NBT.A.3', 208, 'number');
  }
  function roundOnLine() {
    const t = U.int(1, 8), k = U.int(1, 9), v = t * 10 + k, up = k >= 5, ans = dec(up ? t + 1 : t, 1);
    const w = [[dec(up ? t : t + 1, 1), k === 5 ? 'Halfway (5 hundredths) rounds up.' : 'Look at the point: which end of the line is it closer to?'], [dec(v, 2), 'That is the number itself. Rounded to tenths it has one digit after the point.'], [`0.${k}`, `Rounding keeps the tenths digit (${t}) or goes up one; the hundredths digit does not become the tenths.`]];
    return tag(mc(`Round ${dec(v, 2)} to the nearest tenth.`, ans, w, { fig: Fig.numLine(t / 10, (t + 1) / 10, 100, { labels: [t / 10, (t + 0.5) / 10, (t + 1) / 10], dec: 2, marks: [{ v: v / 100, label: dec(v, 2) }] }), meta: { kind: 'roundDec', args: [v * 10, 1] }, hint: `Is ${dec(v, 2)} closer to ${dec(t, 1)} or to ${dec(t + 1, 1)}? Halfway is ${dec(t * 10 + 5, 2)}.`, why: `${dec(v, 2)} is ${up ? (k === 5 ? 'halfway, which rounds up' : 'past halfway') : 'before halfway'}, so it rounds to ${ans}.` }), '5.NBT.A.4', 204, 'number');
  }

  // ===================== MONEY & TIME STORIES =====================
  const hm = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
  function howLong() {
    const h = U.int(1, 8), m = U.int(0, 11) * 5, d = U.int(5, 34) * 5, end = h * 60 + m + d;
    if (end >= 12 * 60) return howLong();
    const eh = Math.floor(end / 60), em = end % 60, [name] = kid(), what = U.pick(['piano lesson', 'bike ride', 'baking project', 'board game', 'library visit']);
    return tag(U.num(`${name}'s ${what} starts at ${hm(h, m)} and ends at ${hm(eh, em)}. How many minutes long is it?`, String(d), { unit: 'minutes', fig: Fig.pair(Fig.clock(h, m), Fig.clock(eh, em)), meta: { kind: 'expr', args: [`(${eh} × 60 + ${em}) - (${h} × 60 + ${m})`] }, miss: missMap([[(eh - h) * 100 + em - m, 'An hour is 60 minutes, not 100.'], [d - 60, 'Count every full hour as 60 minutes.']], String(d)), steps: [`Count on from ${hm(h, m)} to the next hour, then by whole hours, then the minutes after.`, d >= 60 ? `${Math.floor(d / 60)} hour${d >= 120 ? 's' : ''} is ${Math.floor(d / 60) * 60} minutes.` : `It is less than an hour.`, `In all: ${d} minutes.`], hint: 'Count on from the start time. 1 hour = 60 minutes.', why: `From ${hm(h, m)} to ${hm(eh, em)} is ${d} minutes${d >= 60 ? ` (${Math.floor(d / 60)} h ${d % 60} min)` : ''}.` }), '4.M.A.2', 196, 'geometry');
  }
  function startTime() {
    const eh = U.int(3, 11), em = U.int(0, 11) * 5, dh = U.int(0, 2), dm = U.pick([15, 20, 25, 35, 40, 45, 50]), d = dh * 60 + dm;
    const st = eh * 60 + em - d;
    if (st < 60) return startTime();
    const ans = hm(Math.floor(st / 60), st % 60), fwd = eh * 60 + em + d;
    const [name, he] = kid();
    const w = [[hm(Math.floor(fwd / 60) % 12 || 12, fwd % 60), 'That counts forward. The movie started BEFORE it ended: count back.'], [hm(Math.floor(st / 60) + 1, st % 60), 'Count back the hours again.'], [hm(Math.floor((st + 40) / 60), (st + 40) % 60), 'When you count back past the hour, an hour is 60 minutes, not 100.']];
    return tag(mc(`${name}'s movie ended at ${hm(eh, em)}. It was ${dh ? `${dh} hour${dh > 1 ? 's' : ''} ` : ''}${dm} minutes long. What time did it start?`, ans, w, { fig: Fig.clock(eh, em), meta: { kind: 'elapsed', args: [eh, em, 720 - d] }, steps: [dh ? `Count back ${dh} hour${dh > 1 ? 's' : ''}: ${hm(eh - dh, em)}.` : `Start at ${hm(eh, em)}.`, `Count back ${dm} minutes: ${ans}.`], hint: 'Count back: first the hours, then the minutes.', why: `${hm(eh, em)} minus ${dh ? `${dh} h ` : ''}${dm} min is ${ans}.` }, 3, () => hm(U.int(1, 11), U.int(0, 11) * 5)), '4.M.A.2', 200, 'geometry');
  }
  const $ = (k) => `$${dec(k, 2)}`;
  const ITEMS = [['a book', '📘'], ['a kite', '🪁'], ['a ball', '⚽'], ['paints', '🎨'], ['a puzzle', '🧩'], ['a toy car', '🚗']];
  function changeQ() {
    const [[i1, e1], [i2, e2]] = U.shuffle(ITEMS).slice(0, 2), paid = U.pick([1000, 2000]);
    const p1 = U.intWhere(125, paid === 1000 ? 595 : 795, (x) => x % 5 === 0 && x % 100 > 1), p2 = U.intWhere(125, 795, (x) => x % 5 === 0 && x % 100 > 1 && paid - p1 - x >= 102 && (paid - p1 - x) % 100 > 1);
    const ch = paid - p1 - p2;
    if (ch < 102 || ch % 100 < 2) return changeQ();
    const [name, he] = kid();
    return tag(U.num(`${name} buys ${i1} for ${$(p1)} and ${i2} for ${$(p2)}. ${cap(he)} pays with a $${paid / 100} bill. How much change does ${he} get?`, decTrim(ch, 2), { pre: '$', keys: 'dec', fig: Fig.picture([e1, e2, '💵'], `${$(p1)} + ${$(p2)} · paid $${paid / 100}`), meta: { kind: 'dexpr', args: [`${paid / 100} - ${dec(p1, 2)} - ${dec(p2, 2)}`] }, miss: missMap([[decTrim(p1 + p2, 2), 'That is the total cost. The question asks for the change.'], [decTrim(paid - p1, 2), `Take away both prices.`]], decTrim(ch, 2)), steps: [`Total cost: ${$(p1)} + ${$(p2)} = ${$(p1 + p2)}.`, `Change: ${$(paid)} − ${$(p1 + p2)} = ${$(ch)}.`], hint: 'Add the two prices, then subtract from the bill.', why: `${$(p1)} + ${$(p2)} = ${$(p1 + p2)}; ${$(paid)} − ${$(p1 + p2)} = ${$(ch)}` }), '4.M.A.2', 204, 'geometry');
  }
  function howMany() {
    const price = U.pick([35, 45, 55, 65, 75, 85, 95, 115, 125, 135, 150, 175, 225, 250]), have = U.pick([500, 1000, 1500, 2000]);
    if (have % price === 0) return howMany();
    const n = Math.floor(have / price), [name, he] = kid(), item = U.pick(['pencils', 'stickers', 'erasers', 'bookmarks']);
    return tag(U.num(`${cap(item)} cost ${$(price)} each. ${name} has ${$(have)}. What is the greatest number of ${item} ${he} can buy?`, String(n), { unit: item, fig: Fig.table([['Number', 'Cost'], ['1', $(price)], ['2', $(price * 2)], ['4', $(price * 4)], ['?', `up to ${$(have)}`]]), meta: { kind: 'quot', args: [have, price] }, miss: missMap([[n + 1, `${n + 1} ${item} cost ${$(price * (n + 1))}, more than ${$(have)}.`]], String(n)), steps: [`Think in cents: ${$(have)} = ${have} cents and each costs ${price} cents.`, `${price} × ${n} = ${price * n} cents; one more would be ${price * (n + 1)} cents, too much.`], hint: 'How many groups of the price fit into the money? Leftover money is not enough for one more.', why: `${n} × ${$(price)} = ${$(n * price)}, and ${n + 1} would cost ${$(price * (n + 1))}.` }), '4.M.A.2 · 4.OA.A.3', 204, 'geometry');
  }
  function hoursMinutes() {
    const mins = U.intWhere(65, 230, (x) => x % 5 === 0 && x % 60 !== 0), h = Math.floor(mins / 60), m = mins % 60, s = (a, b) => `${a} h ${b} min`;
    const w = [[s(Math.floor(mins / 100), mins % 100), 'An hour is 60 minutes, not 100.'], [s(h + 1, m), `${h + 1} hours is ${(h + 1) * 60} minutes, more than ${mins}.`], [s(h, 60 - m), `Take away ${h * 60} minutes and see what is left.`]];
    return tag(mc(`A movie is ${mins} minutes long. How long is that in hours and minutes?`, s(h, m), w, { fig: Fig.table([['Hours', 'Minutes'], ['1', '60'], ['2', '120'], ['3', '180'], ['4', '240']]), meta: { kind: 'hmText', args: [mins] }, steps: [`1 hour = 60 minutes, so ${h} hour${h > 1 ? 's' : ''} = ${h * 60} minutes.`, `${mins} − ${h * 60} = ${m} minutes left.`], hint: 'Take away 60 minutes for each hour.', why: `${mins} = ${h * 60} + ${m}, so ${s(h, m)}.` }, 3, () => s(U.int(1, 3), U.int(1, 11) * 5)), '4.M.A.1 · 4.M.A.2', 200, 'geometry');
  }
  function unitsStory() {
    const kind = U.pick(['cups', 'km', 'ft']), [name, he] = kid();
    if (kind === 'cups') {
      const L = U.int(1, 3), cup = U.pick([100, 200, 250, 500]), n = (L * 1000) / cup;
      return tag(U.num(`A jug holds ${pl(L, 'liter')} of juice. Each glass holds ${cup} milliliters. How many glasses can be filled?`, String(n), { unit: 'glasses', fig: Fig.table([['Liters', 'Milliliters'], ['1', '1,000'], [String(L), '?']]), meta: { kind: 'expr', args: [`${L} × 1000 ÷ ${cup}`] }, miss: missMap([[L * 1000, 'That is the milliliters in the jug. Now share them into glasses.'], [n * 10, '1 liter = 1,000 milliliters, so check the zeros.']], String(n)), steps: [`${pl(L, 'liter')} = ${c(L * 1000)} milliliters.`, `${c(L * 1000)} ÷ ${cup} = ${n}.`], hint: '1 liter = 1,000 milliliters.', why: `${c(L * 1000)} mL ÷ ${cup} mL = ${n} glasses` }), '4.M.A.1 · 4.M.A.2', 204, 'geometry');
    }
    if (kind === 'km') {
      const k1 = U.int(1, 3), m1 = U.int(1, 9) * 100 + U.pick([0, 50]), k2 = U.int(1, 3), m2 = U.int(1, 9) * 50, tot = (k1 + k2) * 1000 + m1 + m2;
      return tag(U.num(`${name} runs ${k1} km ${m1} m on Monday and ${k2} km ${m2} m on Tuesday. How many meters does ${he} run in all?`, String(tot), { unit: 'meters', fig: Fig.table([['Day', 'Distance'], ['Monday', `${k1} km ${m1} m`], ['Tuesday', `${k2} km ${m2} m`]]), meta: { kind: 'expr', args: [`(${k1} + ${k2}) × 1000 + ${m1} + ${m2}`] }, miss: missMap([[k1 + k2 + m1 + m2, '1 kilometer = 1,000 meters. Change the kilometers to meters first.'], [(k1 + k2) * 100 + m1 + m2, '1 kilometer = 1,000 meters, not 100.']], String(tot)), steps: [`Monday: ${k1} × 1,000 + ${m1} = ${c(k1 * 1000 + m1)} m.`, `Tuesday: ${k2} × 1,000 + ${m2} = ${c(k2 * 1000 + m2)} m.`, `Add: ${c(tot)} m.`], hint: '1 km = 1,000 m.', why: `${c(k1 * 1000 + m1)} + ${c(k2 * 1000 + m2)} = ${c(tot)} meters` }), '4.M.A.1 · 4.M.A.2', 202, 'geometry');
    }
    const f = U.int(3, 6), i = U.int(1, 11), tot = f * 12 + i;
    return tag(U.num(`${name} is ${f} feet ${i} inches tall. How many inches is that?`, String(tot), { unit: 'inches', fig: Fig.table([['Feet', 'Inches'], ['1', '12'], [String(f), '?']]), meta: { kind: 'expr', args: [`${f} × 12 + ${i}`] }, miss: missMap([[f * 10 + i, '1 foot = 12 inches, not 10.'], [f * 12, `Add the ${i} extra inches.`]], String(tot)), steps: [`${f} feet = ${f} × 12 = ${f * 12} inches.`, `${f * 12} + ${i} = ${tot} inches.`], hint: '1 foot = 12 inches.', why: `${f} × 12 + ${i} = ${tot} inches` }), '4.M.A.1', 198, 'geometry');
  }

  function mlToL() {
    const n = U.int(2, 8), ml = U.pick([250, 500, 750, 1250, 1500]), tot = n * ml, ans = decTrim(tot, 3), [name, he] = kid();
    return tag(U.num(`${name}'s recipe uses ${c(ml)} milliliters of milk for each batch. ${cap(he)} makes ${n} batches. How many liters of milk is that?`, ans, { keys: 'dec', unit: 'liters', fig: Fig.table([['Batches', 'Milliliters'], ['1', c(ml)], [String(n), '?']]), meta: { kind: 'dexpr', args: [`${n} × ${ml} / 1000`] }, miss: missMap([[String(tot), 'That is in milliliters. Change it to liters: 1,000 mL = 1 L.'], [decTrim(tot, 2), '1 liter = 1,000 milliliters, not 100.']], ans), steps: [`${n} × ${c(ml)} mL = ${c(tot)} mL.`, `${c(tot)} mL ÷ 1,000 = ${ans} L.`], hint: 'Find the milliliters first. 1 liter = 1,000 milliliters.', why: `${n} × ${c(ml)} = ${c(tot)} mL = ${ans} L` }), '5.M.A.1', 210, 'geometry');
  }
  function cutPieces() {
    const m = U.int(2, 6), piece = U.pick([15, 25, 30, 35, 40, 45, 60, 70, 80]), n = Math.floor((m * 100) / piece), left = m * 100 - n * piece, [name] = kid();
    return tag(U.num(`${name} has a ribbon ${pl(m, 'meter')} long and cuts it into pieces that are each ${piece} centimeters long. What is the greatest number of whole pieces?`, String(n), { unit: 'pieces', fig: Fig.table([['Meters', 'Centimeters'], ['1', '100'], [String(m), '?']]), meta: { kind: 'quot', args: [m * 100, piece] }, miss: missMap([[n + 1, `${n + 1} pieces need ${(n + 1) * piece} cm, more than ${m * 100} cm.`], [Math.floor((m * 10) / piece), '1 meter = 100 centimeters. Change the meters first.']], String(n)), steps: [`${pl(m, 'meter')} = ${m * 100} centimeters.`, `${m * 100} ÷ ${piece} = ${n}${left ? ` R ${left}` : ''}.`, left ? `The ${left} cm left over is too short for another piece.` : 'Nothing is left over.'], hint: 'Change meters to centimeters, then divide.', why: `${m * 100} cm ÷ ${piece} cm = ${n}${left ? ` with ${left} cm left over` : ''}.` }), '5.M.A.1', 208, 'geometry');
  }
  function totalTime() {
    const n = U.int(2, 4), m1 = U.int(1, 11) * 5, dur = 60 + m1, tot = n * dur, h = Math.floor(tot / 60), m = tot % 60, s = (a, b) => `${a} h ${b} min`, [name] = kid();
    if (m === 0) return totalTime();
    const w = [[s(n, m1), `Multiply the minutes too: ${n} × ${m1} = ${n * m1} minutes.`], [s(n + Math.floor(n * m1 / 100), (n * m1) % 100), 'An hour is 60 minutes, not 100.'], [s(h + 1, m), 'Count the hours again.'], [s(h, (m + 10) % 60 || 5), 'Count the minutes again.']];
    return tag(mc(`${name} has ${n} swim lessons. Each lesson is 1 h ${m1} min. How much time is that in all?`, s(h, m), w, { fig: Fig.table([['Lesson', 'Time'], ...[...Array(n)].map((_, i) => [String(i + 1), `1 h ${m1} min`])]), meta: { kind: 'hmText', args: [tot] }, steps: [`Each lesson is ${dur} minutes.`, `${n} × ${dur} = ${tot} minutes.`, `${tot} minutes = ${h} h ${m} min.`], hint: 'Change to minutes, multiply, then change back to hours and minutes.', why: `${n} × ${dur} = ${tot} minutes = ${s(h, m)}` }, 3, () => s(U.int(2, 6), U.int(1, 11) * 5)), '5.M.A.1', 210, 'geometry');
  }

  MQ4_NEW.push(
    { subject: 'muldiv', before: 'mult', id: 'facts4', name: 'Fact review', icon: '⚡', levels: [
      lv('Times and division facts', '3.OA.C.7 · 3.OA.A.4', 'Quick facts to 9 × 9.', [mulFact, divFact, missingFactor]),
      lv('Use facts you know', '3.OA.B.5 · 3.OA.B.6 · 4.NBT.B.5', 'Fact families, breaking apart, and tens.', [knownFact, breakApart, family, () => tensFact(false)]),
      lv('Facts with thousands', '5.NBT.A.2', '6 × 4,000, 40 × 300, 48,000 ÷ 6.', [() => tensFact(true)]) ] },
    { subject: 'muldiv', after: 'mult', id: 'longmul', name: 'Multiply step by step', icon: '📝', levels: [
      lv('Carry to the next place', '4.NBT.B.5', 'The written way, one place at a time.', [carryQ, tensRowQ, () => mulWritten(23, 98, 190)]),
      lv('Bigger numbers and two-digit numbers', '4.NBT.B.5', 'Up to 4 digits × 1 digit, and 2 digits × 2 digits.', [() => mulWritten(112, 987, 196), () => mulWritten(1012, 4987, 200), () => mulWritten(112, 987, 194, true), () => twoRows(U.pick(['one', 'two', 'all']))]),
      lv('Three digits times two digits', '5.NBT.B.5', 'Two rows, then add.', [() => twoRows('one', true), () => twoRows('two', true), () => twoRows('all', true)]) ] },
    { subject: 'muldiv', after: 'div', id: 'longdiv', name: 'Divide step by step', icon: '🧾', levels: [
      lv('Share the tens, then the ones', '4.NBT.B.6', 'Trade left-over tens for ones.', [tradeQ, () => divWritten(12, 33, 190), () => divWritten(34, 330, 194)]),
      lv('Zeros in the answer and remainders', '4.NBT.B.6', 'Up to 4 digits ÷ 1 digit.', [() => divWritten(101, 999, 198, { zero: true }), () => divWritten(101, 999, 196, { zero: true, mc: true }), () => remWritten('q'), () => remWritten('r'), () => remWritten('check')]),
      lv('Two-digit divisors, step by step', '5.NBT.B.6', 'How many 24s fit?', [firstDigit2, div2Written, div2Written]) ] },
    { subject: 'fractions', after: 'frac', id: 'fline', name: 'Number lines', icon: '📏', levels: [
      lv('Fractions on a number line', '3.NF.A.2 · 4.NF.A.1', 'Count equal jumps from 0.', [placeFrac, namePoint, equivPoint]),
      lv('Mixed numbers and decimals', '4.NF.B.3 · 4.NF.C.6', 'Wholes and parts, tenths and hundredths.', [placeMixed, nameMixed, placeTenths, nameHundredths, fracToDecLine]),
      lv('Thousandths and rounding', '5.NBT.A.3 · 5.NBT.A.4', 'Zoom in between hundredths.', [nameThousandths, roundOnLine]) ] },
    { subject: 'measure', after: 'meas', id: 'story4', name: 'Money & time stories', icon: '⏰', levels: [
      lv('How long? When did it start?', '4.M.A.1 · 4.M.A.2', 'Count on, count back, hours and minutes.', [howLong, startTime, hoursMinutes]),
      lv('Money and units', '4.M.A.1 · 4.M.A.2', 'Change, how many, liters, kilometers, and feet.', [changeQ, howMany, unitsStory]),
      lv('Multi-step unit problems', '5.M.A.1', 'Change units, then solve.', [mlToL, cutPieces, totalTime]) ] },
  );
})();
