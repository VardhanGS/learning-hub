// MAP Math 2 — new MAP Growth–style questions (not taken from Math Quest 2).
// Formats follow what NWEA lists for MAP Growth math: multiple choice, hot text (tap a number, symbol, equation, or
// picture), click-and-pop (tap tiles to place them into boxes), and text entry. Every question has a picture where
// one helps. Difficulty tags (rit) are estimates on a RIT-like scale; goal tags follow the Math 2–5 goal areas.
// Standards: 2023 NJSLS-Mathematics, grades 2–4 (the adaptive test reaches into grade 4 for strong students).
(function () {
  const { pl, tag, kid, thing, missMap, cap } = MQ;
  const LETTERS = ['A', 'B', 'C', 'D'];
  // Several pictures in one figure, labeled A–D (answer choices that are pictures, as on MAP).
  function choicesFig(svgs) {
    let x = 0, body = '';
    svgs.forEach((sv, i) => {
      // 2 × 2 grid so each picture is big enough to read on a phone
      const vb = sv.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/), w = +vb[1], h = +vb[2], k = Math.min(150 / w, 110 / h);
      const col = i % 2, row = Math.floor(i / 2), x0 = col * 180, y0 = row * 150;
      body += `<rect x="${x0 + 2}" y="${y0 + 2}" width="174" height="144" rx="12" class="pc-cell"/><text x="${x0 + 18}" y="${y0 + 26}" class="fg-text" font-size="20">${LETTERS[i]}</text><g transform="translate(${x0 + (180 - w * k) / 2} ${y0 + 30 + (110 - h * k) / 2}) scale(${k})">${sv.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>`;
      x = Math.max(x, x0 + 180);
    });
    const H = Math.ceil(svgs.length / 2) * 150;
    return `<svg viewBox="0 0 ${x} ${H}" width="${x}" role="img" aria-label="Choices ${LETTERS.slice(0, svgs.length).join(', ')}">${body}</svg>`;
  }
  // A small table picture: rows of cells, the first row as headers. '?' cells are drawn dashed.
  function tableFig(rows, title = '') {
    const cw = 84, ch = 40, W = rows[0].length * cw + 8, top = title ? 26 : 4;
    let body = title ? `<text x="${W / 2}" y="18" class="fg-text" font-size="15" text-anchor="middle">${title}</text>` : '';
    rows.forEach((row, r) => row.forEach((c, i) => {
      const x = 4 + i * cw, y = top + r * ch;
      body += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" class="${r === 0 ? 'pc-head' : c === '?' ? 'bm-unknown' : 'pc-cell'}"/><text x="${x + cw / 2}" y="${y + 26}" class="fg-text" font-size="${r === 0 ? 15 : 19}" text-anchor="middle">${c}</text>`;
    }));
    return `<svg viewBox="0 0 ${W} ${top + rows.length * ch + 4}" width="${W}" role="img" aria-label="Table: ${rows.map((r) => r.join(' ')).join('; ')}">${body}</svg>`;
  }
  // Tally marks for a count.
  function tallyFig(cats, title) {
    const rowH = 40, W = 340;
    let body = `<text x="8" y="18" class="fg-text" font-size="15">${title}</text>`;
    cats.forEach(([lbl, n], i) => {
      const y = 30 + i * rowH;
      body += `<rect x="4" y="${y}" width="${W - 8}" height="${rowH}" class="pc-cell"/><text x="14" y="${y + 26}" class="fg-text" font-size="15">${lbl}</text>`;
      for (let k = 0; k < n; k++) {
        const g = Math.floor(k / 5), j = k % 5, x0 = 120 + g * 46;
        body += j < 4 ? `<line x1="${x0 + j * 8}" y1="${y + 8}" x2="${x0 + j * 8}" y2="${y + 32}" class="fg-stroke"/>` : `<line x1="${x0 - 4}" y1="${y + 30}" x2="${x0 + 30}" y2="${y + 10}" class="fg-stroke"/>`;
      }
    });
    return `<svg viewBox="0 0 ${W} ${34 + cats.length * rowH}" width="${W}" role="img" aria-label="Tally chart: ${title}. ${cats.map((c) => `${c[0]} ${c[1]}`).join(', ')}">${body}</svg>`;
  }

  // ===================== NUMBER =====================
  // Place value and number forms.
  function digitHot() {
    const n = U.int(102, 989), place = U.pick(['hundreds', 'tens', 'ones']), idx = { hundreds: 0, tens: 1, ones: 2 }[place];
    const digits = String(n).split('');
    if (new Set(digits).size < 3) return digitHot();
    return tag({ t: 'hot', q: `Tap the digit in the ${place} place.`, cells: digits, layout: 'row', a: [idx], fig: Fig.placeChart([n]), meta: { kind: 'hotDigit', args: [n, idx] }, hint: 'Hundreds, tens, ones: left to right.', why: `In ${n}, ${digits[idx]} is in the ${place} place.` }, '2.NBT.A.1', 166, 'number');
  }
  function digitValue() {
    const n = U.int(120, 980), idx = U.pick([0, 1]), d = +String(n)[idx];
    if (!d) return digitValue();
    const val = d * (idx === 0 ? 100 : 10);
    return tag(U.mcMiss(`What is the value of the digit ${d} in ${n}?`, String(val), [[String(d), `${d} is the digit. Its value depends on its place: it is in the ${idx === 0 ? 'hundreds' : 'tens'} place.`], [String(idx === 0 ? d * 10 : d * 100), `The ${d} is in the ${idx === 0 ? 'hundreds' : 'tens'} place, not the ${idx === 0 ? 'tens' : 'hundreds'} place.`], [String(val * 10), 'That is too big. Count the places after the digit.']], { fig: Fig.placeChart([n], '', idx), meta: { kind: 'expr', args: [`${d} × ${idx === 0 ? 100 : 10}`] }, hint: 'Find which place the digit is in.', why: `${d} hundreds is ${d * 100}; ${d} tens is ${d * 10}. Here the ${d} is worth ${val}.` }), '2.NBT.A.1', 178, 'number');
  }
  function buildNumberPop() {
    const h = U.int(1, 9), t = U.int(0, 9), o = U.int(0, 9), n = h * 100 + t * 10 + o;
    // One tile per digit (a repeated digit gets two tiles), plus two other digits.
    const tiles = U.shuffle([h, t, o, ...U.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => ![h, t, o].includes(x)), 2)].map(String));
    return tag({ t: 'pop', q: `Make ${n}. Tap the tiles to fill the boxes.`, template: '□ hundreds + □ tens + □ ones', tiles, accept: [[String(h), String(t), String(o)]], fig: Fig.blocks(n), meta: { kind: 'popPlace', args: [n] }, hint: 'The hundreds digit comes first.', why: `${n} = ${h} hundreds + ${t} tens + ${o} ones.` }, '2.NBT.A.3', 174, 'number');
  }
  function orderPop() {
    const nums = U.uniq([U.int(101, 999), U.int(101, 999), U.int(101, 999), U.int(101, 999)]).slice(0, 4);
    if (nums.length < 4) return orderPop();
    // Make at least two share a hundreds digit so place value matters.
    nums[1] = Math.floor(nums[0] / 100) * 100 + U.int(0, 99); if (nums[1] === nums[0] || nums[1] < 100) return orderPop();
    const sorted = [...nums].sort((a, b) => a - b).map(String);
    return tag({ t: 'pop', q: 'Put the numbers in order from least to greatest.', template: '□ < □ < □ < □', tiles: U.shuffle(nums.map(String)), accept: [sorted], fig: Fig.placeChart(nums), meta: { kind: 'popOrder', args: [nums] }, hint: 'Compare hundreds first. If they match, compare tens, then ones.', why: sorted.join(' < ') }, '2.NBT.A.4', 184, 'number');
  }
  function closestHundred() {
    const n = U.intWhere(110, 890, (x) => x % 100 !== 50 && x % 100 > 5 && x % 100 < 95), r = Math.round(n / 100) * 100;
    return tag(U.mcMiss(`Which hundred is ${n} closest to?`, String(r), [[String(r === Math.floor(n / 100) * 100 ? r + 100 : r - 100), `${n} is between ${Math.floor(n / 100) * 100} and ${Math.floor(n / 100) * 100 + 100}. Look at the tens digit to see which is closer.`], [String(Math.round(n / 10) * 10), 'That is the nearest ten, not the nearest hundred.']], { fig: Fig.roundLine(n, 100), meta: { kind: 'round', args: [n, 100] }, hint: 'Is it before or after the halfway mark?', why: `${n} is closer to ${r}.` }, 3, () => String(U.pick([-200, 200].map((d) => r + d).filter((v) => v >= 0)))), '3.NBT.A.1', 192, 'number');
  }
  // Computation (the MAP style: mostly multiple choice with misconception choices, some typed answers).
  function computeMC(level) {
    let a, b, op;
    if (level === 0) { op = U.pick(['+', '−']); a = U.int(21, 79); b = op === '+' ? U.int(11, 99 - a) : U.int(11, a - 5); }
    else if (level === 1) { op = U.pick(['+', '−']); a = U.int(120, 880); b = op === '+' ? U.int(105, 999 - a) : U.int(105, a - 20); }
    else { op = U.pick(['×', '×', '+']); if (op === '×') { a = U.int(12, 49); b = U.int(2, 6); } else { a = U.int(1200, 4800); b = U.int(1100, 4900); } }
    const ans = op === '+' ? a + b : op === '−' ? a - b : a * b;
    const w = op === '+' ? MQ.addMisses(a, b) : op === '−' ? MQ.subMisses(a, b)
      : [[(Math.floor(a / 10) * b) * 10 + (a % 10), `Multiply the ones too: ${a % 10} × ${b} = ${(a % 10) * b}.`], [Math.floor(a / 10) * 10 * b + ((a % 10) * b) % 10, 'It looks like the tens from the ones product were not regrouped.'], [a + b, `That is ${a} + ${b}. Multiply instead.`]];
    const fig = op === '×' ? Fig.tensGroups(b, Math.floor(a / 10)) : Fig.placeChart([a, b], op);
    return tag(U.mcMiss(`${a} ${op} ${b} = ?`, String(ans), w.map(([v, why]) => [String(v), why]), { fig, calc: level === 2 && op === '+', meta: { kind: 'expr', args: [`${a} ${op} ${b}`] }, hint: op === '×' ? `Multiply the tens, then the ones, and add.` : 'Line up the places. Regroup when you need to.', why: `${a} ${op} ${b} = ${ans}` }, 3, () => String(U.pick([-10, 10, -1, 1, 100].map((d) => ans + d).filter((v) => v > 0)))), [...['2.NBT.B.5', '2.NBT.B.7'], op === '×' ? '4.NBT.B.5' : '4.NBT.B.4'][level], [176, 190, 206][level], 'number');
  }
  function computeEntry(level) {
    const a = level === 0 ? U.int(31, 92) : U.int(310, 930);
    const b = level === 0 ? U.intWhere(12, a - 8, (x) => x % 10 > a % 10) : U.intWhere(115, a - 30, (x) => x % 10 > a % 10 || Math.floor(x / 10) % 10 > Math.floor(a / 10) % 10);
    return tag(U.num(`Type the difference.\n${a} − ${b}`, a - b, { fig: level === 0 ? Fig.blocks(a) : Fig.placeChart([a, b], '−'), meta: { kind: 'expr', args: [`${a} − ${b}`] }, miss: missMap(MQ.subMisses(a, b), a - b), hint: 'Regroup when the top digit is smaller.', why: `${a} − ${b} = ${a - b}` }), level === 0 ? '2.NBT.B.5' : '2.NBT.B.7', level === 0 ? 182 : 194, 'number');
  }
  // Fractions: pictures as answer choices.
  function fractionPicture(level) {
    const d = level === 0 ? U.pick([2, 3, 4]) : U.pick([3, 4, 6, 8]), n = level === 0 ? 1 : U.int(1, d - 1);
    const right = Fig.fraction(U.pick(['circle', 'bar']), d, n);
    const wrongs = [Fig.fraction('bar', d + 1, n), Fig.fraction('circle', d, Math.min(d - 1, n + 1)) , unequal(d, n)];
    if (n + 1 > d - 1) wrongs[1] = Fig.fraction('circle', d * 2, n); // e.g. one fourth instead of one half
    const order = U.shuffle([0, 1, 2, 3]), svgs = [right, ...wrongs], pics = order.map((i) => svgs[i]);
    const ans = LETTERS[order.indexOf(0)];
    const name = level === 0 ? `one ${{ 2: 'half', 3: 'third', 4: 'fourth' }[d]}` : T(`\\frac{${n}}{${d}}`);
    return tag(U.mcFixed(`Which picture shows ${name} shaded?`, ans, LETTERS.slice(0, 4), { fig: choicesFig(pics), meta: { kind: 'picChoice', args: [order.indexOf(0)] }, miss: Object.fromEntries(order.map((i, k) => [LETTERS[k], i === 0 ? null : ['That shape has a different number of equal parts.', 'Count the shaded parts.', 'The parts in that shape are not equal.'][i - 1]]).filter(([, v]) => v)), hint: 'Count the equal parts, then the shaded parts.', why: `${LETTERS[order.indexOf(0)]} has ${d} equal parts with ${n} shaded.` }), level === 0 ? '2.G.A.3' : '3.NF.A.1', level === 0 ? 170 : 190, level === 0 ? 'geometry' : 'number');
  }
  function unequal(d, n) {
    // A bar cut into d parts that are NOT equal.
    const ws = Array.from({ length: d }, (_, i) => 30 + ((i * 37) % 3) * 30), W = ws.reduce((t, w) => t + w, 0);
    let x = 3, body = '';
    ws.forEach((w, i) => { body += `<rect x="${x}" y="3" width="${w}" height="64" class="${i < n ? 'fg-fill' : 'fg-stroke'}" style="${i < n ? '' : 'fill:var(--surface)'}"/>`; x += w; });
    return `<svg viewBox="0 0 ${W + 6} 70" width="${W + 6}" role="img" aria-label="A bar cut into ${d} parts that are not equal">${body}</svg>`;
  }
  function compareFractions() {
    const same = U.pick(['num', 'den']);
    let a, b;
    if (same === 'den') { const d = U.pick([3, 4, 6, 8]); const [x, y] = U.sample([...Array(d - 1).keys()].map((i) => i + 1), 2); a = [x, d]; b = [y, d]; }
    else { const n = U.int(1, 3); const [x, y] = U.sample([2, 3, 4, 6, 8].filter((v) => v > n), 2); a = [n, x]; b = [n, y]; }
    const va = a[0] / a[1], vb = b[0] / b[1], ans = va > vb ? '>' : '<';
    const q = U.mcFixed(`Choose the sign that makes this true.\n${T(`\\frac{${a[0]}}{${a[1]}}`)} □ ${T(`\\frac{${b[0]}}{${b[1]}}`)}`, ans, ['>', '<', '='], { fig: Fig.fraction('bar', a[1], a[0]) + Fig.fraction('bar', b[1], b[0]), meta: { kind: 'cmpFrac', args: [a, b] }, hint: same === 'den' ? 'Same size parts: more parts is more.' : 'Same number of parts: bigger parts (smaller bottom number) is more.', why: `${a[0]}/${a[1]} ${ans} ${b[0]}/${b[1]}` });
    q.miss = { [ans === '>' ? '<' : '>']: same === 'num' ? 'When the top numbers match, the fraction with the SMALLER bottom number has bigger pieces.' : 'Count the shaded parts.', '=': 'These fractions are not the same size.' };
    // The two bars as one picture.
    q.fig = `<div class="fig-pair">${Fig.fraction('bar', a[1], a[0])}${Fig.fraction('bar', b[1], b[0])}</div>`;
    return tag(q, '3.NF.A.3', 200, 'number');
  }

  // ===================== ALGEBRA =====================
  function trueEquations(level) {
    const make = (ok) => {
      const a = U.int(level ? 12 : 3, level ? 60 : 12), b = U.int(level ? 11 : 2, level ? 39 : 9);
      const s = a + b;
      const shape = U.int(0, 3);
      if (shape === 0) return ok ? `${a} + ${b} = ${s}` : `${a} + ${b} = ${s + U.pick([1, 10, -1])}`;
      if (shape === 1) return ok ? `${s} − ${b} = ${a}` : `${s} − ${b} = ${a + U.pick([1, 10, -1])}`;
      if (shape === 2) { const c = U.int(1, b - 1); return ok ? `${a} + ${b} = ${a + c} + ${b - c}` : `${a} + ${b} = ${a + c} + ${b + c}`; }
      return ok ? `${s} = ${b} + ${a}` : `${s} = ${b} + ${a + U.pick([1, 2])}`;
    };
    const nRight = U.int(1, 3), cells = U.shuffle([...Array(nRight)].map(() => make(true)).concat([...Array(4 - nRight)].map(() => make(false))));
    const evalEq = (e) => { const [l, r] = e.split(' = '); return ev(l) === ev(r); };
    const a = cells.map((c, i) => (evalEq(c) ? i : -1)).filter((i) => i >= 0);
    if (!a.length || a.length === 4) return trueEquations(level);
    return tag({ t: 'hot', q: 'Tap all the equations that are true.', cells, layout: 'list', multi: true, a, fig: Fig.picture(['⚖️'], 'Both sides must be the same amount'), meta: { kind: 'hotTrue', args: [] }, hint: 'Work out each side. The = sign means both sides are the same amount.', why: 'An equation is true when both sides equal the same number.' }, '2.OA.B.2', level ? 188 : 176, 'algebra');
  }
  function balance() {
    const a = U.int(5, 15), b = U.int(3, 9), c = U.intWhere(2, a + b - 1, (x) => x !== a && x !== b);
    const ans = a + b - c;
    return tag(U.mcMiss(`What number makes this true?\n${a} + ${b} = □ + ${c}`, String(ans), [[String(a + b), `${a + b} is what ${a} + ${b} equals. The box plus ${c} must ALSO equal ${a + b}.`], [String(a + b + c), 'The = sign means "the same as", not "the answer comes next."'], [String(ans + 1), 'Check: add the box and ' + c + '.']], { fig: Fig.barModel(a + b, ['?', c]), meta: { kind: 'expr', args: [`${a} + ${b} − ${c}`] }, hint: `First find ${a} + ${b}. What plus ${c} makes that?`, why: `${a} + ${b} = ${a + b}, and ${ans} + ${c} = ${a + b}.` }), '2.OA.B.2', 186, 'algebra');
  }
  function makeTruePop() {
    const target = U.int(11, 18);
    const tiles = U.shuffle(U.uniq([U.int(2, 9), U.int(2, 9), U.int(2, 9), U.int(2, 9), U.int(2, 9)]).slice(0, 5)).map(String);
    const accept = [];
    tiles.forEach((x, i) => tiles.forEach((y, j) => { if (i !== j && +x + +y === target) accept.push([x, y]); }));
    if (!accept.length) return makeTruePop();
    return tag({ t: 'pop', q: `Tap two tiles to make the equation true.`, template: `□ + □ = ${target}`, tiles, accept, fig: Fig.tenFrames(target), meta: { kind: 'popEq', args: [] }, hint: `Which two numbers add up to ${target}?`, why: `${accept[0][0]} + ${accept[0][1]} = ${target}` }, '2.OA.B.2', 180, 'algebra');
  }
  function ioTable(level) {
    const add = level < 2;
    const k = add ? U.int(level ? 11 : 2, level ? 40 : 10) : U.int(2, 6);
    const ins = U.sample([...Array(15).keys()].map((i) => i + (add ? 1 : 2)), 4).sort((a, b) => a - b);
    const outs = ins.map((x) => (add ? x + k : x * k));
    const hide = U.int(1, 3);
    const rows = [['In', 'Out'], ...ins.map((x, i) => [x, i === hide ? '?' : outs[i]])];
    const cols = [['In', ...ins], ['Out', ...outs.map((o, i) => (i === hide ? '?' : o))]];
    const q = U.num(`The table follows a rule. What number goes where the ? is?`, outs[hide], { fig: tableFig([cols[0], cols[1]], 'Input and output'), meta: { kind: 'expr', args: [add ? `${ins[hide]} + ${k}` : `${ins[hide]} × ${k}`] }, hint: 'Look at how each In number changes to its Out number.', why: `The rule is ${add ? `add ${k}` : `multiply by ${k}`}: ${ins[hide]} → ${outs[hide]}.` });
    q.miss = missMap([[outs[hide - 1] + (outs[1] - outs[0]), 'Find the rule from In to Out, not the jump from one Out to the next.'], [ins[hide] + k + (add ? 1 : 0), 'Check the rule with another column.']], outs[hide]);
    return tag(q, add ? '2.OA.B.2' : '3.OA.D.9', [178, 190, 204][level], 'algebra');
  }
  function ruleMC() {
    const k = U.int(3, 12), start = U.int(2, 20), seq = [0, 1, 2, 3].map((i) => start + i * k);
    return tag(U.mcMiss(`What is the rule for this pattern?\n${seq.join(', ')}, …`, `add ${k}`, [[`add ${k + 1}`, 'Find the difference between two numbers next to each other.'], [`add ${start}`, 'The first number is not the rule. Look at how much it grows each time.'], [`subtract ${k}`, 'The numbers get bigger, so it is not subtract.']], { fig: Fig.jumps(start, k, 3), meta: { kind: 'ruleAdd', args: [seq] }, hint: 'How much does it grow each time?', why: `Each number is ${k} more than the one before.` }), '3.OA.D.9', 184, 'algebra');
  }
  // Grade 3 level-up (3.OA.A.4): the unknown can be in any place of a multiplication or division equation.
  function mulUnknown() {
    const x = U.int(2, 9), y = U.int(2, 9), p = x * y, form = U.int(0, 3);
    // form 3 balances two products: x × y = □ × z (z is another factor of p)
    const zs = [2, 3, 4, 5, 6].filter((z) => z !== y && z !== x && p % z === 0 && p / z <= 12);
    if (form === 3 && !zs.length) return mulUnknown();
    const z = U.pick(zs.length ? zs : [1]);
    const shown = [`□ × ${y} = ${p}`, `${x} × □ = ${p}`, `${p} ÷ □ = ${y}`, `${x} × ${y} = □ × ${z}`][form];
    const ans = [x, y, x, p / z][form], meta = [[p, y], [p, x], [p, y], [p, z]][form];
    return tag(U.mcMiss(`What number makes this true?\n${shown}`, String(ans), [[String(p), `${p} is the product. Find the missing factor.`], [String(form === 3 ? p + z : p - (form === 1 ? x : y)), 'That subtracts or adds. Think of a multiplication fact instead.'], [String(ans + 1), `Check: ${ans + 1} in the box does not make it true.`]], { fig: Fig.picture(['✖️', '⚖️'], 'Both sides are the same amount'), meta: { kind: 'div', args: meta }, hint: form === 2 ? `Think: ${y} × □ = ${p}.` : form === 3 ? `${x} × ${y} = ${p}. What times ${z} is also ${p}?` : 'Which multiplication fact fits?', why: `${shown.replace('□', ans)} is true.` }, 3, () => ans + U.pick([-2, -1, 2, 3])), '3.OA.A.4', 194, 'algebra');
  }
  function storyEquation() {
    const [k, he] = kid(), t = thing(), a = U.int(12, 60), b = U.int(5, 30);
    const kind = U.pick(['gain', 'lose', 'start']);
    const q = kind === 'gain' ? `${k} has ${a} ${t}. ${cap(he)} gets ${b} more. Which equation can find how many ${t} ${he} has now?`
      : kind === 'lose' ? `${k} has ${a + b} ${t}. ${cap(he)} gives away ${b}. Which equation can find how many are left?`
      : `${k} had some ${t}. ${cap(he)} got ${b} more. Now ${he} has ${a + b}. Which equation can find how many ${t} ${he} had at first?`;
    const right = kind === 'gain' ? `${a} + ${b} = □` : kind === 'lose' ? `${a + b} − ${b} = □` : `□ + ${b} = ${a + b}`;
    const w = kind === 'gain' ? [[`${a} − ${b} = □`, '"Gets more" makes the group bigger.'], [`${a} + □ = ${b}`, 'The total is unknown, not one of the parts.'], [`${b} − □ = ${a}`, 'Read the story again: the group grows.']]
      : kind === 'lose' ? [[`${a + b} + ${b} = □`, '"Gives away" makes the group smaller.'], [`${b} − ${a + b} = □`, 'Start with the bigger number.'], [`□ − ${b} = ${a + b}`, `${a + b} is the start, not the end.`]]
      : [[`${a + b} + ${b} = □`, `${a + b} already includes the ${b} new ones.`], [`□ − ${b} = ${a + b}`, 'The group got bigger, so the start plus the change is the end.'], [`${b} + ${a + b} = □`, 'The start is the unknown.']];
    return tag(U.mcMiss(q, right, w, { fig: kind === 'gain' ? Fig.barModel('?', [a, b], t) : kind === 'lose' ? Fig.barModel(a + b, [b, '?'], t) : Fig.barModel(a + b, ['?', b], t), meta: { kind: 'storyEq', args: [kind, a, b] }, hint: 'Is the group getting bigger or smaller? What is unknown?', why: right }), '2.OA.A.1', 186, 'algebra');
  }
  function multiplyStory() {
    const g = U.int(3, 9), n = U.int(3, 9), items = U.pick([['boxes', 'crayons', '🖍️'], ['bags', 'apples', '🍎'], ['rows', 'chairs', '🪑'], ['packs', 'cards', '🃏']]);
    const total = g * n;
    return tag(U.mcMiss(`There are ${g} ${items[0]} with ${n} ${items[1]} in each. Which shows how to find the total number of ${items[1]}?`, `${g} × ${n}`, [[`${g} + ${n}`, `There are ${g} equal groups of ${n}: multiply.`], [`${total} ÷ ${g}`, 'Dividing would split the total into groups.'], [`${g} × ${n + 1}`, `Each ${items[0].slice(0, -1)} has ${n}.`]], { fig: Fig.groups(g, n, items[2]), meta: { kind: 'mulStory', args: [g, n] }, hint: 'Equal groups: number of groups × number in each group.', why: `${g} × ${n} = ${total} ${items[1]}` }), '3.OA.A.1', 194, 'algebra');
  }
  function twoStepEntry() {
    const [k] = kid(), a = U.int(25, 60), b = U.int(10, 30), c = U.int(5, 25);
    return tag(U.num(`${k} has ${a} stickers. A friend gives ${k} ${b} more. Then ${k} uses ${c} stickers on a card. How many stickers does ${k} have now?`, a + b - c, { unit: 'stickers', fig: Fig.barModel('?', [a, b], `then ${c} are used`), meta: { kind: 'expr', args: [`${a} + ${b} − ${c}`] }, miss: missMap([[a + b, 'That is only the first step.'], [a + b + c, `Using ${c} stickers means subtract.`]], a + b - c), hint: 'Two steps: add, then subtract.', why: `${a} + ${b} = ${a + b}; ${a + b} − ${c} = ${a + b - c}` }), '2.OA.A.1', 192, 'algebra');
  }

  // ===================== GEOMETRY; PROBABILITY & STATISTICS =====================
  function shapesHot(level) {
    const pool = level === 2 ? ['square', 'rectangle', 'rhombus', 'trapezoid', 'parallelogram', 'triangle', 'pentagon', 'hexagon', 'circle'] : ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'circle', 'trapezoid'];
    // Level 1: four shapes, upright, simple counts. Level 2: six shapes, some turned, vertices and "more than 4 sides".
    const prop = level === 2 ? U.pick(['quad', 'square corners']) : level === 1 ? U.pick(['4 vertices', '5 vertices', 'more than 4 sides', '6 sides', '4 sides']) : U.pick(['3 sides', '4 sides', '6 sides', 'no straight sides']);
    const has = (s) => ({ quad: ['square', 'rectangle', 'rhombus', 'trapezoid', 'parallelogram'].includes(s), 'square corners': ['square', 'rectangle'].includes(s), '3 sides': s === 'triangle', '4 sides': ['square', 'rectangle', 'trapezoid', 'rhombus', 'parallelogram'].includes(s), '5 vertices': s === 'pentagon', '4 vertices': ['square', 'rectangle', 'trapezoid', 'rhombus', 'parallelogram'].includes(s), 'more than 4 sides': ['pentagon', 'hexagon'].includes(s), '6 sides': s === 'hexagon', 'no straight sides': s === 'circle' }[prop]);
    let cells;
    const nCells = level === 0 ? 4 : level === 1 ? 6 : 5;
    do { cells = U.sample(pool, nCells); } while (!cells.some(has) || cells.every(has));
    const a = cells.map((c, i) => (has(c) ? i : -1)).filter((i) => i >= 0);
    const ask = { quad: 'quadrilaterals', 'square corners': 'shapes with 4 square corners', '3 sides': 'shapes with 3 sides', '4 sides': 'shapes with 4 sides', '5 vertices': 'shapes with 5 vertices (corners)', '4 vertices': 'shapes with 4 vertices (corners)', 'more than 4 sides': 'shapes with more than 4 sides', '6 sides': 'shapes with 6 sides', 'no straight sides': 'shapes with no straight sides' }[prop];
    return tag({ t: 'hot', q: `Tap all the ${ask}.`, cells: cells.map((c) => Fig.shape(c, c === 'circle' || level === 0 ? 0 : U.pick([0, 0, 20, 45]))), cellNames: cells, layout: 'grid', multi: true, a, meta: { kind: 'hotShape', args: [prop, cells] }, hint: 'Count the sides and corners of each shape.', why: `${pool.filter((c) => cells.includes(c) && has(c)).join(', ')}.` }, level === 2 ? '3.G.A.1' : '2.G.A.1', [168, 176, 196][level], 'geometry');
  }
  function estimateLength() {
    const items = [['a pencil', '7 inches', ['7 feet', '7 yards', '70 inches']], ['a door', '7 feet', ['7 inches', '70 feet', '7 yards']], ['a paper clip', '1 inch', ['1 foot', '10 inches', '1 yard']], ['a school bus', '40 feet', ['40 inches', '4 feet', '400 feet']], ['a crayon', '9 centimeters', ['9 meters', '90 centimeters', '1 centimeter']], ['a classroom', '10 meters', ['10 centimeters', '100 meters', '1 meter']]];
    const i = U.int(0, items.length - 1), [obj, right, wrong] = items[i];
    const icon = ['✏️', '🚪', '📎', '🚌', '🖍️', '🏫'][i];
    return tag(U.mcMiss(`About how long is ${obj}?`, right, wrong.map((w) => [w, 'Think about how big that really is.']), { fig: Fig.picture([icon]), meta: { kind: 'estFact', args: [i] }, hint: 'An inch is about the width of a quarter. A foot is about a ruler. A meter is a big step.', why: `${cap(obj)} is about ${right} long.` }), '2.M.A.3', 180, 'geometry');
  }
  function clockMC(level) {
    const h = U.int(1, 12), m = level ? U.intWhere(1, 59, (x) => x % 5 !== 0) : U.pick([5, 10, 20, 25, 35, 40, 50, 55]);
    const t = (H, M) => `${H}:${String(M).padStart(2, '0')}`;
    return tag(U.mcMiss('What time does the clock show?', t(h, m), [[t(h % 12 + 1, m), 'The hour hand has not reached the next number yet.'], [t(h, (m + 5) % 60), 'Count the minutes again.'], ...(m % 5 === 0 && m / 5 !== h ? [[t(m / 5, (h * 5) % 60), 'The hands are switched: short is hours, long is minutes.']] : [[t(h, (m + 1) % 60), 'Count the small marks carefully.']])], { fig: Fig.clock(h, m), meta: { kind: 'time', args: [h, m] }, hint: 'Short hand: hour. Long hand: count by 5s, then 1s.', why: `It is ${t(h, m)}.` }, 3, () => t(U.int(1, 12), U.int(0, 59))), level ? '3.M.A.1' : '2.M.C.7', level ? 196 : 174, 'geometry');
  }
  function moneyMC() {
    let list;
    do { list = ['q', 'd', 'n', 'p'].flatMap((k) => Array(U.int(0, 3)).fill(k)); } while (list.length < 3 || list.length > 9);
    const V = { q: 25, d: 10, n: 5, p: 1 }, total = list.reduce((t, k) => t + V[k], 0);
    return tag(U.mcMiss('How much money is shown?', `${total}¢`, [[`${list.length}¢`, 'That counts the coins, not what they are worth.'], [`${total + 5 * list.filter((k) => k === 'n').length}¢`, 'A nickel is 5¢.'], [`${total - 1}¢`, 'Count the pennies again.']], { fig: Fig.coins(list), meta: { kind: 'centsText', args: list }, hint: 'Start with the biggest coins and count on.', why: `${total}¢` }, 3, () => `${U.pick([10, -10, 25].map((d) => total + d).filter((v) => v > 0))}¢`), '2.M.C.8', 178, 'geometry');
  }
  function perimeterArea(level) {
    const w = U.int(2, level ? 12 : 8), h = U.intWhere(2, level ? 9 : 6, (x) => x !== w);
    const area = level === 2 || (level === 1 && U.pick([true, false]));
    const unit = U.pick(['cm', 'in', 'ft']);
    const ans = area ? w * h : 2 * (w + h);
    return tag(U.mcMiss(`What is the ${area ? 'area' : 'perimeter'} of the rectangle?`, `${ans} ${area ? 'square ' : ''}${unit}`, area ? [[`${2 * (w + h)} square ${unit}`, 'That is the perimeter. Area counts the squares inside.'], [`${w + h} square ${unit}`, 'Multiply the side lengths.']] : [[`${w * h} ${unit}`, 'That is the area. Perimeter goes around the outside.'], [`${w + h} ${unit}`, 'Add all 4 sides, not just 2.']], { fig: Fig.rect(w, h, { grid: area && level < 2, labels: true, unit }), meta: { kind: 'exprUnit', args: [area ? `${w} × ${h}` : `2 × (${w} + ${h})`, `${area ? 'square ' : ''}${unit}`] }, hint: area ? 'Area = length × width.' : 'Perimeter = all four sides added.', why: area ? `${w} × ${h} = ${w * h}` : `${w} + ${h} + ${w} + ${h} = ${2 * (w + h)}` }, 3, () => `${U.pick([2, -2, 4].map((d) => ans + d).filter((v) => v > 0))} ${area ? 'square ' : ''}${unit}`), area ? '3.M.B.5' : '3.M.C.6', [190, 198, 206][level], 'geometry');
  }
  function tallyQ(level) {
    const labels = U.pick([['Red', 'Blue', 'Green', 'Yellow'], ['Cats', 'Dogs', 'Fish', 'Birds'], ['Apple', 'Pear', 'Grape', 'Plum']]);
    const vals = U.sample([3, 4, 5, 6, 7, 8, 9, 11, 12], 4);
    const cats = labels.map((l, i) => [l, vals[i]]);
    const [i, j] = U.sample([0, 1, 2, 3], 2);
    if (level === 0) return tag(U.num(`How many votes did ${cats[i][0]} get?`, vals[i], { fig: tallyFig(cats, 'Votes'), meta: { kind: 'pick', args: [vals, i] }, miss: missMap([[vals[i] - 5 + 1, 'Each bundle with a line across is 5.']], vals[i]), hint: 'Count tally marks in fives: each bundle is 5.', why: `${cats[i][0]}: ${vals[i]}` }), '2.DL.B.4', 170, 'geometry');
    if (level === 1) return tag(U.num(`How many more votes did ${vals[i] > vals[j] ? cats[i][0] : cats[j][0]} get than ${vals[i] > vals[j] ? cats[j][0] : cats[i][0]}?`, Math.abs(vals[i] - vals[j]), { fig: tallyFig(cats, 'Votes'), meta: { kind: 'diff', args: [vals[i], vals[j]] }, miss: missMap([[vals[i] + vals[j], '"How many more" means subtract.']], Math.abs(vals[i] - vals[j])), hint: 'Count both, then subtract.', why: `${Math.max(vals[i], vals[j])} − ${Math.min(vals[i], vals[j])} = ${Math.abs(vals[i] - vals[j])}` }), '2.DL.B.4', 182, 'geometry');
    const total = vals.reduce((t, v) => t + v, 0);
    return tag(U.mcMiss('Which question can be answered using the tally chart?', `How many votes were there in all?`, [['Why do people like ' + cats[0][0].toLowerCase() + '?', 'The chart shows how many, not why.'], ['What will win next year?', 'The chart only shows this vote.'], ['How old are the voters?', 'The chart does not show ages.']], { fig: tallyFig(cats, 'Votes'), meta: { kind: 'dataQ', args: [] }, hint: 'The chart only shows counts of votes.', why: `Add all the counts: ${total} votes.` }), '3.DL.A.1', 194, 'geometry');
  }
  function graphCompare(level) {
    const scale = level === 2 ? U.pick([2, 5]) : 1;
    const vals = U.sample([...Array(level === 2 ? 9 : 10).keys()].map((i) => (i + 1) * scale), 4);
    const cats = [['Mon', vals[0]], ['Tue', vals[1]], ['Wed', vals[2]], ['Thu', vals[3]]];
    const most = cats.reduce((a, b) => (b[1] > a[1] ? b : a));
    if (level === 0) return tag(U.mcMiss('On which day were the most books read?', most[0], cats.filter((c) => c !== most).map((c) => [c[0], `${c[0]} had ${c[1]}, which is fewer.`]), { fig: Fig.barGraph('Books read', cats, scale), meta: { kind: 'maxLabel', args: [cats] }, hint: 'Find the tallest bar.', why: `${most[0]} has the tallest bar: ${most[1]}.` }), '2.DL.B.4', 168, 'geometry');
    const total = vals.reduce((t, v) => t + v, 0);
    return tag(U.num('How many books were read in all four days?', total, { fig: level === 2 ? Fig.picGraph('Books read', cats, '📕', scale) : Fig.barGraph('Books read', cats, scale), meta: { kind: 'sum', args: vals }, miss: missMap(level === 2 ? [[total / scale, `Each book picture stands for ${scale}.`]] : [], total), hint: level === 2 ? 'Read the key first.' : 'Add the four bars.', why: `${vals.join(' + ')} = ${total}` }), level === 2 ? '3.DL.B.3' : '2.DL.B.4', level === 2 ? 198 : 184, 'geometry');
  }

  // Safe arithmetic for checking equations (digits, + − × ÷ and spaces only).
  function ev(expr) { const js = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'); if (!/^[\d+\-*/ ().]+$/.test(js)) return NaN; return Function(`return (${js})`)(); }

  const lv = (title, std, desc, fns) => ({ title, std, desc, gen: () => U.mix(8, fns) });
  window.MAP_NEW = [
    { goal: 'number', id: 'mpv', name: 'Place value & number forms', icon: '🔢', levels: [
      lv('Digits and their places', '2.NBT.A.1', 'Tap the digit in a place.', [digitHot, digitHot, buildNumberPop]),
      lv('Value, order, and forms', '2.NBT.A.1 · 2.NBT.A.3 · 2.NBT.A.4', 'What is a digit worth?', [digitValue, orderPop, buildNumberPop]),
      lv('Closest hundred and big numbers', '3.NBT.A.1', 'Rounding with a number line.', [closestHundred, orderPop]) ] },
    { goal: 'number', id: 'mcomp', name: 'Computation', icon: '🧮', levels: [
      lv('Two-digit adding and subtracting', '2.NBT.B.5', 'Choose or type the answer.', [() => computeMC(0), () => computeEntry(0)]),
      lv('Three-digit adding and subtracting', '2.NBT.B.7', 'Regroup across places.', [() => computeMC(1), () => computeEntry(1)]),
      lv('Bigger numbers and multiplying', '4.NBT.B.4 · 4.NBT.B.5', 'A peek at Grade 4.', [() => computeMC(2)]) ] },
    { goal: 'number', id: 'mfrac', name: 'Fractions', icon: '🍰', levels: [
      lv('Which picture shows it?', '2.G.A.3', 'Halves, thirds, fourths.', [() => fractionPicture(0)]),
      lv('Fractions in pictures', '3.NF.A.1', 'Read a fraction from a picture.', [() => fractionPicture(1)]),
      lv('Compare fractions', '3.NF.A.3', 'Same top or same bottom.', [compareFractions, () => fractionPicture(1)]) ] },
    { goal: 'algebra', id: 'meq', name: 'Equations', icon: '⚖️', levels: [
      lv('True or false?', '2.OA.B.2', 'Check both sides.', [() => trueEquations(0), makeTruePop]),
      lv('Balance the equation', '2.OA.B.2', 'The = sign means "the same as".', [balance, () => trueEquations(1), makeTruePop]),
      lv('Equations for stories and unknown factors', '2.OA.A.1 · 3.OA.A.4', 'Which equation fits? What is missing?', [storyEquation, mulUnknown, mulUnknown]) ] },
    { goal: 'algebra', id: 'mpat', name: 'Patterns & rules', icon: '🔁', levels: [
      lv('Input and output', '2.OA.B.2', 'Find the rule, fill the table.', [() => ioTable(0)]),
      lv('Rules and patterns', '3.OA.D.9', 'How does it grow?', [() => ioTable(1), ruleMC]),
      lv('Multiplying rules', '3.OA.D.9', 'Tables that multiply.', [() => ioTable(2), ruleMC]) ] },
    { goal: 'algebra', id: 'mstory', name: 'Story problems', icon: '📘', levels: [
      lv('Which equation?', '2.OA.A.1', 'Match the story to an equation.', [storyEquation]),
      lv('Two-step stories', '2.OA.A.1', 'Two steps, one answer.', [twoStepEntry, storyEquation]),
      lv('Equal groups', '3.OA.A.1 · 3.OA.A.3', 'Multiply to find the total.', [multiplyStory, twoStepEntry]) ] },
    { goal: 'geometry', id: 'mshape', name: 'Shapes', icon: '🔷', levels: [
      lv('Find the shapes', '2.G.A.1', 'Sides and corners.', [() => shapesHot(0)]),
      lv('Sort shapes', '2.G.A.1', 'More shapes to tap.', [() => shapesHot(1)]),
      lv('Quadrilaterals', '3.G.A.1', 'Rectangles, rhombuses, squares.', [() => shapesHot(2)]) ] },
    { goal: 'geometry', id: 'mmeas', name: 'Measure, time & money', icon: '⏱️', levels: [
      lv('Time, money, estimates', '2.M.A.3 · 2.M.C.7 · 2.M.C.8', 'Everyday measuring.', [() => clockMC(0), moneyMC, estimateLength]),
      lv('Perimeter and time to the minute', '3.M.A.1 · 3.M.C.6', 'Around the shape.', [() => perimeterArea(0), () => clockMC(1)]),
      lv('Area and perimeter', '3.M.B.5 · 3.M.C.6', 'Inside and around.', [() => perimeterArea(1), () => perimeterArea(2)]) ] },
    { goal: 'geometry', id: 'mdata', name: 'Data', icon: '📊', levels: [
      lv('Read tallies and graphs', '2.DL.B.4', 'Count and compare.', [() => tallyQ(0), () => graphCompare(0)]),
      lv('Compare and total', '2.DL.B.4', 'How many more? How many in all?', [() => tallyQ(1), () => graphCompare(1)]),
      lv('Scaled graphs and data questions', '3.DL.A.1 · 3.DL.B.3', 'Each picture can stand for more.', [() => graphCompare(2), () => tallyQ(2)]) ] },
  ];
  window.MAP_TABLE_FIG = tableFig;
})();
