// MEASUREMENT — 2.M.A.1, 2.M.A.4, 2.M.B.5–6, 2.M.C.7–8; Grade 3 level-ups 3.M.A.1, 3.M.C.6, 3.NF.A.2, 3.OA.D.8.
(function () {
  const { pl, tag, kid, missMap, cap } = MQ;
  const tm = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
  const addMin = (h, m, d) => { let t = ((h % 12) * 60 + m + d) % 720; const hh = Math.floor(t / 60); return [hh === 0 ? 12 : hh, t % 60]; };

  // ---------- Length ----------
  function readRuler() {
    const unit = U.pick(['in', 'cm']), len = unit === 'in' ? U.int(2, 7) : U.int(3, 11);
    const obj = U.pick(['pencil', 'bar']);
    const name = obj === 'pencil' ? 'pencil' : U.pick(['eraser', 'crayon box', 'stick of gum', 'ribbon']);
    const q = U.num(`How long is the ${name}?`, len, { unit: unit === 'in' ? 'inches' : 'centimeters', fig: Fig.ruler(len, unit, 0, null, obj), meta: { kind: 'len', args: [0, len] }, hint: 'It starts at 0. Read the number at the other end.', why: `It goes from 0 to ${len}, so it is ${pl(len, unit === 'in' ? 'inch' : 'centimeter', unit === 'in' ? 'inches' : 'centimeters')} long.` });
    q.miss = missMap([[len + 1, 'Count the spaces between the marks, not the marks themselves.']], len);
    return tag(q, '2.M.A.1', 166, 'geometry');
  }
  function rulerOffset() {
    const unit = U.pick(['in', 'cm']), start = U.int(1, 3), len = unit === 'in' ? U.int(2, 5) : U.int(3, 8);
    const q = U.num('How long is the object? Look where it starts.', len, { unit: unit === 'in' ? 'inches' : 'centimeters', fig: Fig.ruler(len, unit, start, start + len + 1, 'bar'), meta: { kind: 'len', args: [start, start + len] }, hint: `It starts at ${start}, not 0. Count the spaces from ${start}.`, why: `${start + len} − ${start} = ${len}` });
    q.miss = missMap([[start + len, `That is where it ends. It starts at ${start}, so subtract ${start}.`]], len);
    return tag(q, '2.M.A.1', 180, 'geometry');
  }
  function howMuchLonger() {
    const unit = U.pick(['centimeters', 'inches', 'feet']);
    const a = U.int(25, 95), b = U.int(11, a - 6), c1 = U.pick(['red', 'blue', 'green']), c2 = U.pick(['yellow', 'purple', 'orange']);
    const what = U.pick(['ribbon', 'rope', 'paper chain', 'string']);
    const q = U.num(`The ${c1} ${what} is ${a} ${unit} long. The ${c2} ${what} is ${b} ${unit} long. How much longer is the ${c1} ${what}?`, a - b, { unit, meta: { kind: 'sub', args: [a, b] }, hint: '"How much longer" means compare: subtract.', why: `${a} − ${b} = ${a - b} ${unit}` });
    q.miss = missMap([[a + b, `That is the total length. To compare, subtract.`]], a - b);
    return tag(q, '2.M.A.4', 184, 'geometry');
  }
  function perimeter() {
    const w = U.int(2, 9), h = U.intWhere(2, 8, (x) => x !== w), unit = U.pick(['cm', 'in', 'm']);
    if (U.pick([true, true, false])) {
      const q = U.num(`What is the perimeter of the rectangle?`, 2 * (w + h), { unit, fig: Fig.rect(w, h, { grid: false, labels: true, unit }), meta: { kind: 'perim', args: [w, h] }, hint: 'Perimeter is the distance all the way around: add all 4 sides.', why: `${w} + ${h} + ${w} + ${h} = ${2 * (w + h)} ${unit}` });
      q.miss = missMap([[w * h, `${w * h} is the area (squares inside). Perimeter goes around the outside.`], [w + h, 'That is only two sides. A rectangle has four sides.']], 2 * (w + h));
      return tag(q, '3.M.C.6', 199, 'geometry');
    }
    const P = 2 * (w + h);
    const q = U.num(`A rectangle has a perimeter of ${P} ${unit}. One side is ${w} ${unit}. How long is the side next to it?`, h, { unit, meta: { kind: 'sideFromPerim', args: [P, w] }, hint: `Two sides of ${w} use ${2 * w}. Split what is left between the other two sides.`, why: `${P} − ${w} − ${w} = ${P - 2 * w}. ${P - 2 * w} ÷ 2 = ${h}.` });
    q.miss = missMap([[P - w, 'Subtract both sides of length ' + w + ', then split the rest in two.'], [P - 2 * w, 'That is two sides together. Split it in half.']], h);
    return tag(q, '3.M.C.6', 205, 'geometry');
  }

  // ---------- Number lines ----------
  function placeWhole() {
    const n = U.pick([1, 2, 3, 4, 6, 7, 8, 9]);
    return tag(U.line(`Place ${n} on the number line.`, n, { min: 0, max: 10, labels: [0, 5, 10], majorEvery: 5 }, { meta: { kind: 'value', args: [n] }, hint: 'Start at 0 and count the jumps.', why: `${n} is ${pl(n, 'jump')} from 0.` }), '2.M.B.6', 168, 'geometry');
  }
  function placeTens() {
    const n = U.pick([10, 20, 30, 40, 60, 70, 80, 90]);
    return tag(U.line(`Place ${n} on the number line.`, n, { min: 0, max: 100, step: 10, labels: [0, 50, 100], labelEvery: 50, majorEvery: 50 }, { meta: { kind: 'value', args: [n] }, hint: 'Each jump is 10. Count by tens.', why: `Count by tens: ${Array.from({ length: n / 10 }, (_, i) => (i + 1) * 10).join(', ')}.` }), '2.M.B.6', 178, 'geometry');
  }
  function placeSum() {
    const sub = U.pick([true, false]);
    const a = sub ? U.int(10, 19) : U.int(4, 9), b = sub ? U.int(3, 9) : U.int(3, 9);
    const ans = sub ? a - b : a + b;
    return tag(U.line(`Show ${a} ${sub ? '−' : '+'} ${b} on the number line. Where do you land?`, ans, { min: 0, max: 20, labelEvery: 5, majorEvery: 5 }, { meta: { kind: sub ? 'sub' : 'add', args: [a, b] }, hint: `Start at ${a}, then make ${pl(b, 'jump')} ${sub ? 'back' : 'forward'}.`, why: `${a} ${sub ? '−' : '+'} ${b} = ${ans}` }), '2.M.B.6', 182, 'geometry');
  }
  function placeFraction() {
    const d = U.pick([2, 3, 4, 6, 8]), max = U.pick([1, 1, 2]);
    const n = U.intWhere(1, d * max - 1, (x) => x % d !== 0);
    return tag(U.line(`Place ${T(`\\frac{${n}}{${d}}`)} on the number line.`, `${n}/${d}`, { min: 0, max, den: d }, { meta: { kind: 'frac', args: [n, d] }, hint: `Each whole is cut into ${d} equal parts. Count ${pl(n, 'part')} from 0.`, why: `${n}/${d} is ${pl(n, 'jump')} of 1/${d} from 0.` }), '3.NF.A.2', 196, 'number');
  }

  // ---------- Time ----------
  function timeMC(h, m, std, rit) {
    const w = [];
    if (m % 5 === 0 && m > 0 && m / 5 !== h) w.push([tm(m / 5, (h % 12) * 5), 'The short hand shows the hour and the long hand shows the minutes. Those got switched.']);
    if (m >= 30) w.push([tm(h % 12 + 1, m), `The hour hand is between ${h} and ${h % 12 + 1}, so it is still ${h} o'clock time.`]);
    if (m >= 5 && m % 5 === 0 && m / 5 <= 11) w.push([tm(h, m / 5), 'Each number on the clock is 5 minutes for the long hand. Count by 5s.']);
    w.push([tm(h, (m + 5) % 60), 'Count the minutes again by 5s from the 12.']);
    return tag(U.mcMiss('What time does the clock show?', tm(h, m), w, { fig: Fig.clock(h, m), meta: { kind: 'time', args: [h, m] }, hint: 'Short hand: the hour. Long hand: count by 5s from the 12.', why: `The hour hand is ${m ? `past ${h}` : `on ${h}`} and the minute hand shows ${m} minutes: ${tm(h, m)}.` }, 3, () => tm(U.int(1, 12), U.int(0, 11) * 5)), std, rit, 'geometry');
  }
  const readClock5 = () => timeMC(U.int(1, 12), U.pick([0, 30, 15, 45, 5, 10, 20, 25, 35, 40, 50, 55]), '2.M.C.7', 170);
  function setClock(step) {
    const h = U.int(1, 12), m = step === 1 ? U.intWhere(1, 59, (x) => x % 5 !== 0) : U.int(0, 11) * 5;
    return tag(U.clock(`Show ${tm(h, m)} on the clock.`, h, m, { step, meta: { kind: 'time', args: [h, m] }, hint: `Tap ${h} for the hour hand. The minute hand goes to ${m === 0 ? 'the 12' : step === 1 ? `${m} minutes (count by 5s, then by 1s)` : `the ${m / 5} (count by 5s: ${m})`}.`, why: `${tm(h, m)}: the short hand ${m ? `just past ${h}` : `on ${h}`}, the long hand on ${m} minutes.` }), step === 1 ? '3.M.A.1' : '2.M.C.7', step === 1 ? 198 : 178, 'geometry');
  }
  const AMPM = [['eat breakfast', 7, 'a.m.'], ['go to school', 8, 'a.m.'], ['eat lunch', 12, 'p.m.'], ['play after school', 4, 'p.m.'], ['eat dinner', 6, 'p.m.'], ['go to bed', 8, 'p.m.'], ['wake up', 6, 'a.m.'], ['look at the moon and stars', 9, 'p.m.']];
  function amPm() {
    const i = U.int(0, AMPM.length - 1), [act, h, ans] = AMPM[i], m = U.pick([0, 15, 30, 45]);
    const q = U.mcFixed(`A child is likely to ${act} at ${tm(h, m)}. Is that a.m. or p.m.?`, ans, ['a.m.', 'p.m.'], { meta: { kind: 'ampm', args: [i] }, hint: 'a.m. is from midnight to noon (morning). p.m. is from noon to midnight (afternoon and night).', why: `People usually ${act} in the ${ans === 'a.m.' ? 'morning, so it is a.m.' : h === 12 ? 'middle of the day: 12 noon starts p.m.' : 'afternoon or evening, so it is p.m.'}` });
    q.miss = { [ans === 'a.m.' ? 'p.m.' : 'a.m.']: ans === 'a.m.' ? 'p.m. is afternoon and night. Is this in the morning?' : 'a.m. is the morning, before noon.' };
    return tag(q, '2.M.C.7', 176, 'geometry');
  }
  const readClock1 = () => timeMC(U.int(1, 12), U.intWhere(1, 59, (x) => x % 5 !== 0), '3.M.A.1', 196);
  function elapsed() {
    const h = U.int(1, 10), m = U.int(0, 11) * 5, d = U.pick([15, 20, 25, 30, 35, 40, 45, 50]);
    const [eh, em] = addMin(h, m, d);
    const [k] = kid(), act = U.pick(['started reading', 'began a puzzle', 'started soccer practice', 'began baking cookies']);
    const crosses = m + d >= 60;
    const w = [[tm(eh, (em + 10) % 60), 'Count the minutes again: jump by 5s or 10s.'], crosses ? [tm(h, em), 'The minutes went past 60, so the hour changes too.'] : [tm(h % 12 + 1, em), 'The minutes did not reach 60, so the hour stays the same.']];
    return tag(U.mcMiss(`${k} ${act} at ${tm(h, m)}. It lasted ${d} minutes. What time did it end?`, tm(eh, em), w, { meta: { kind: 'elapsed', args: [h, m, d] }, hint: `Count on ${d} minutes from ${tm(h, m)}. A clock or a number line helps.`, why: `${tm(h, m)} + ${d} minutes = ${tm(eh, em)}.` }, 3, () => tm(eh, (em + U.pick([5, 50])) % 60)), '3.M.A.1', 202, 'geometry');
  }

  // ---------- Money ----------
  const V = { q: 25, d: 10, n: 5, p: 1 };
  const NAME = { q: ['quarter', 'quarters'], d: ['dime', 'dimes'], n: ['nickel', 'nickels'], p: ['penny', 'pennies'] };
  function countCoins() {
    let list;
    do { list = ['q', 'd', 'n', 'p'].flatMap((k) => Array(U.int(0, k === 'q' ? 2 : 3)).fill(k)); } while (list.length < 3 || list.reduce((t, k) => t + V[k], 0) >= 100);
    const total = list.reduce((t, k) => t + V[k], 0);
    const q = U.num('How much money is this?', total, { unit: '¢', fig: Fig.coins(list), meta: { kind: 'cents', args: list }, hint: 'Start with the coins worth the most. Count on: 25, 10, 5, 1.', why: `${list.map((k) => V[k] + '¢').join(' + ')} = ${total}¢` });
    const nickels = list.filter((k) => k === 'n').length;
    q.miss = missMap([[list.length, 'That is how many coins there are. Add what each coin is worth.'], ...(nickels ? [[total + 5 * nickels, 'A nickel is worth 5¢, not 10¢, even though it is bigger than a dime.']] : [])], total);
    return tag(q, '2.M.C.8', 172, 'geometry');
  }
  function makeAmount() {
    const cents = U.intWhere(11, 99, (x) => x % 5 !== 0 || Math.random() < 0.3);
    return tag(U.coins(`Make ${cents}¢ with coins.`, cents, { coins: ['q', 'd', 'n', 'p'], meta: { kind: 'value', args: [cents] }, hint: 'Start with quarters, then dimes, nickels, and pennies.', why: `For example: ${coinWords(cents)} = ${cents}¢.` }), '2.M.C.8', 180, 'geometry');
  }
  function coinWords(c) {
    const out = [];
    ['q', 'd', 'n', 'p'].forEach((k) => { const n = Math.floor(c / V[k]); if (n) out.push(pl(n, NAME[k][0], NAME[k][1])); c -= n * V[k]; });
    return out.join(', ');
  }
  function moneyStory() {
    const [k, he] = kid();
    const d = U.int(1, 5), p = U.int(1, 9), n = U.int(0, 3);
    const total = d * 10 + n * 5 + p;
    const have = [pl(d, 'dime'), ...(n ? [pl(n, 'nickel')] : []), pl(p, 'penny', 'pennies')].join(', ').replace(/, ([^,]*)$/, ', and $1');
    const q = U.num(`${k} has ${have}. How many cents does ${he} have?`, total, { unit: '¢', meta: { kind: 'cents', args: [...Array(d).fill('d'), ...Array(n).fill('n'), ...Array(p).fill('p')] }, hint: 'Dimes are 10¢, nickels 5¢, pennies 1¢. Count on from the dimes.', why: `${d * 10}¢ + ${n * 5}¢ + ${p}¢ = ${total}¢` });
    q.miss = missMap([[d + n + p, 'That is the number of coins. Count what they are worth.']], total);
    return tag(q, '2.M.C.8', 182, 'geometry');
  }
  function change() {
    const price = U.int(1, 9) * 5 + U.pick([0, 0, 2, 4]), qty = U.int(2, 3);
    if (price * qty >= 100) return change();
    const [k] = kid(), item = U.pick(['pencils', 'erasers', 'stickers', 'apples']);
    const q = U.num(`${cap(item.slice(0, -1))}s cost ${price}¢ each. ${k} buys ${qty} ${item} and pays with a dollar (100¢). How much change does ${k} get?`, 100 - price * qty, { unit: '¢', meta: { kind: 'change', args: [price, qty, 100] }, hint: `Step 1: ${qty} × ${price}¢. Step 2: 100¢ minus that.`, why: `${qty} × ${price}¢ = ${price * qty}¢. 100¢ − ${price * qty}¢ = ${100 - price * qty}¢.` });
    q.miss = missMap([[100 - price, `That is the change for only one ${item.slice(0, -1)}.`], [price * qty, 'That is the cost. Change is what you get back from 100¢.']], 100 - price * qty);
    return tag(q, '3.OA.D.8', 200, 'algebra');
  }

  addSubject({
    id: 'measure', name: 'Measurement', icon: '📏', color: 'c3', blurb: 'Length, number lines, time, and money.',
    skills: [
      { id: 'length', name: 'Length', icon: '📐', levels: [
        { title: 'Read a ruler', std: '2.M.A.1', desc: 'Inches and centimeters.', gen: () => U.mix(8, [readRuler]) },
        { title: 'Not from zero, and how much longer', std: '2.M.A.1 · 2.M.A.4 · 2.M.B.5', desc: 'Measure carefully, then compare.', gen: () => U.mix(8, [rulerOffset, howMuchLonger]) },
        { title: 'Perimeter', std: '3.M.C.6', desc: 'All the way around.', gen: () => U.mix(8, [perimeter]) },
      ] },
      { id: 'nline', name: 'Number lines', icon: '📍', levels: [
        { title: 'Numbers to 10', std: '2.M.B.6', desc: 'Count the jumps from 0.', gen: () => U.mix(8, [placeWhole]) },
        { title: 'Tens, sums, and differences', std: '2.M.B.6', desc: 'Jump forward and back.', gen: () => U.mix(8, [placeTens, placeSum, placeSum]) },
        { title: 'Fractions on a number line', std: '3.NF.A.2', desc: 'Cut each whole into equal parts.', gen: () => U.mix(8, [placeFraction]) },
      ] },
      { id: 'time', name: 'Tell time', icon: '⏰', levels: [
        { title: 'Read the clock to 5 minutes', std: '2.M.C.7', desc: 'Hour hand, minute hand.', gen: () => U.mix(8, [readClock5]) },
        { title: 'Set the clock; a.m. and p.m.', std: '2.M.C.7', desc: 'Move the hands yourself.', gen: () => U.mix(8, [() => setClock(5), () => setClock(5), amPm]) },
        { title: 'To the minute, and elapsed time', std: '3.M.A.1', desc: 'How long did it take?', gen: () => U.mix(8, [readClock1, () => setClock(1), elapsed]) },
      ] },
      { id: 'money', name: 'Money', icon: '🪙', levels: [
        { title: 'Count coins', std: '2.M.C.8', desc: 'Quarters, dimes, nickels, pennies.', gen: () => U.mix(8, [countCoins]) },
        { title: 'Make an amount', std: '2.M.C.8', desc: 'Pick the coins.', gen: () => U.mix(8, [makeAmount, makeAmount, moneyStory]) },
        { title: 'Two-step money problems', std: '3.OA.D.8', desc: 'Buy, pay, and get change.', gen: () => U.mix(8, [change]) },
      ] },
    ],
  });
})();
