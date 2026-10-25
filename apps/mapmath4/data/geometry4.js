// MAP Math 4 — Geometry; Probability & Statistics (Measurement, Geometric Relationships, Statistics).
// Original questions; 2023 NJSLS-Mathematics codes.
(function () {
  const { tag, kid, cap, c, dec, decTrim, fx, ftyped, simp, missMap, lv } = M4;
  const angleType = (d) => (d < 90 ? 'acute' : d === 90 ? 'right' : d < 180 ? 'obtuse' : 'straight');

  // ===================== ANGLES =====================
  function angleKind() {
    const d = U.pick([U.int(20, 75), 90, U.int(105, 165), 180]);
    const right = angleType(d);
    const why = { acute: 'smaller than a square corner (less than 90°)', right: 'a square corner (exactly 90°)', obtuse: 'wider than a square corner but less than a straight line', straight: 'a straight line (180°)' }[right];
    return tag(M4.mc('What kind of angle is this?', right, ['acute', 'right', 'obtuse', 'straight'].filter((k) => k !== right).map((k) => [k, `Compare it with a square corner (90°): this angle is ${why}.`]), { fig: Fig.angle(d, { start: U.pick([0, 0, 10, 20]) }), meta: { kind: 'angleType', args: [d] }, hint: 'Compare the angle with the corner of a sheet of paper (90°).', why: `It is ${right}: ${why}.` }), '4.G.A.1', 188, 'geometry');
  }
  function angleHot() {
    const want = U.pick(['acute', 'obtuse']), ds = U.shuffle([U.int(25, 70), U.int(30, 80), 90, U.int(100, 160), U.int(110, 170)]);
    const a = ds.map((d, i) => (angleType(d) === want ? i : -1)).filter((i) => i >= 0);
    return tag({ t: 'hot', q: `Tap all the ${want} angles.`, cells: ds.map((d) => Fig.angle(d, { start: U.pick([0, 15, 30]) })), cellNames: ds.map((d) => `an angle`), layout: 'grid', multi: true, a, fig: Fig.angle(90, { label: '90°' }), meta: { kind: 'hotPred', args: [want, 0, ds] }, hint: `${want === 'acute' ? 'Acute angles are smaller than' : 'Obtuse angles are wider than'} a square corner (90°).`, why: `${want === 'acute' ? 'Acute: less than 90°' : 'Obtuse: between 90° and 180°'}.` }, '4.G.A.1', 192, 'geometry');
  }
  function protractorRead() {
    const d = U.pick([U.int(2, 8) * 10, U.int(10, 17) * 10, U.int(3, 16) * 10 + 5].filter((x) => x !== 90));
    return tag(M4.mc('Use the protractor. What is the measure of the angle?', `${d}°`, [[`${180 - d}°`, 'One ray is on 0 of the OUTER scale, so read the outer scale.'], [`${d + 10}°`, 'Count the marks again: each long mark is 10°.'], [`${d - 5}°`, 'Count the small marks: each one is 5°.']], { fig: Fig.protractor(d), meta: { kind: 'deg', args: [d] }, hint: 'Find the scale that starts at 0 on the ray along the bottom. Read that scale.', why: `The angle measures ${d}°.` }), '4.M.B.5', 200, 'geometry');
  }
  function angleAdd() {
    const a = U.int(2, 12) * 5, b = U.int(2, 14) * 5, whole = U.pick([a + b, 90, 180]);
    const B = whole === a + b ? b : whole - a;
    if (B <= 5) return angleAdd();
    const unknownWhole = whole === a + b && U.pick([true, false]);
    if (unknownWhole) return tag(U.num(`An angle is split into two parts: ${a}° and ${B}°. What is the measure of the whole angle?`, String(a + B), { unit: '°', fig: Fig.angleSplit(a, B, `${a}°`, `${B}°`), meta: { kind: 'expr', args: [`${a} + ${B}`] }, miss: missMap([[Math.abs(B - a), 'The parts add up to the whole.']], String(a + B)), hint: 'The whole angle is the sum of its parts.', why: `${a}° + ${B}° = ${a + B}°` }), '4.M.B.6', 198, 'geometry');
    const w = whole === 90 ? 'a right angle (90°)' : whole === 180 ? 'a straight angle (180°)' : `${whole}°`;
    return tag(U.num(`Together the two angles make ${w}. One part is ${a}°. What is the other part?`, String(whole - a), { unit: '°', fig: Fig.angleSplit(a, whole - a, `${a}°`, '?', `${whole}°`), meta: { kind: 'expr', args: [`${whole} - ${a}`] }, miss: missMap([[whole + a, 'The whole is bigger than each part. Subtract.']], String(whole - a)), hint: `Whole minus the part you know: ${whole} − ${a}.`, why: `${whole}° − ${a}° = ${whole - a}°` }), '4.M.B.6', 202, 'geometry');
  }
  function shapeNames() {
    const shapes = { square: ['rectangle', 'rhombus', 'parallelogram', 'quadrilateral'], rectangle: ['parallelogram', 'quadrilateral'], rhombus: ['parallelogram', 'quadrilateral'], parallelogram: ['quadrilateral'] };
    const s = U.pick(Object.keys(shapes)), right = shapes[s];
    const wrong = ['square', 'rectangle', 'rhombus', 'triangle', 'pentagon'].filter((x) => x !== s && !right.includes(x));
    return tag({ ...U.multi(`Choose all the names that ALWAYS describe a ${s}.`, right, U.sample(wrong, Math.min(wrong.length, 6 - right.length))), fig: Fig.shape(s), meta: { kind: 'shapeIs', args: [s] }, hint: 'Square → rectangle and rhombus → parallelogram → quadrilateral. A name lower in the list is more general.', why: `A ${s} is always a ${right.join(', a ')}.` }, '5.G.B.4', 208, 'geometry');
  }
  function triangleHot() {
    const kinds = U.shuffle(['right', 'right', 'acute', 'obtuse', U.pick(['acute', 'obtuse'])]), want = U.pick(['right', 'obtuse']);
    const a = kinds.map((k, i) => (k === want ? i : -1)).filter((i) => i >= 0);
    return tag({ t: 'hot', q: `Tap all the ${want} triangles.`, cells: kinds.map((k) => Fig.triangle(k)), cellNames: kinds.map(() => 'a triangle'), layout: 'grid', multi: true, a, fig: Fig.angle(90, { label: '90°' }), meta: { kind: 'hotTri', args: [want, kinds] }, hint: want === 'right' ? 'A right triangle has one square corner (90°).' : 'An obtuse triangle has one angle wider than a square corner.', why: `${a.length} ${want} triangle${a.length > 1 ? 's' : ''}.` }, '4.G.A.2', 200, 'geometry');
  }

  // ===================== LINES, SYMMETRY, COORDINATES =====================
  const LINE_NAMES = { point: 'point', segment: 'line segment', ray: 'ray', line: 'line', parallel: 'parallel lines', perpendicular: 'perpendicular lines', intersecting: 'intersecting lines that are not perpendicular' };
  function lineKind() {
    const group = U.pick([['point', 'segment', 'ray', 'line'], ['parallel', 'perpendicular', 'intersecting']]), k = U.pick(group);
    const notes = { point: 'A point is one exact spot.', segment: 'A line segment has two endpoints.', ray: 'A ray has one endpoint and goes on forever in one direction.', line: 'A line goes on forever in both directions (arrows on both ends).', parallel: 'Parallel lines never meet.', perpendicular: 'Perpendicular lines meet in a square corner.', intersecting: 'These lines cross, but not at a square corner.' };
    return tag(M4.mc('What does the picture show?', LINE_NAMES[k], group.filter((x) => x !== k).map((x) => [LINE_NAMES[x], notes[k]]), { fig: Fig.lines(k), meta: { kind: 'lineKind', args: [k] }, hint: 'Look at the ends: dots are endpoints, arrows go on forever. Do the lines meet? At a square corner?', why: notes[k] }), '4.G.A.1', 186, 'geometry');
  }
  function symYesNo() {
    const kinds = Object.keys(Fig.SYM_LINES), k = U.pick(kinds), fold = U.pick(['v', 'h', 'd'].filter((f) => f !== 'd' || ['square', 'rectangle'].includes(k)));
    const yes = Fig.SYM_LINES[k].includes(fold);
    return tag(U.mcFixed('Is the dashed line a line of symmetry?', yes ? 'Yes' : 'No', ['Yes', 'No'], { fig: Fig.symmetry(k, fold), meta: { kind: 'symYN', args: [k, fold] }, miss: { [yes ? 'No' : 'Yes']: yes ? 'Fold along the dashed line: both halves match exactly.' : 'Fold along the dashed line: the two halves do not match.' }, hint: 'Imagine folding the shape on the dashed line. Do the two halves land exactly on each other?', why: yes ? 'Yes: the two halves match when folded.' : 'No: the halves do not match when folded.' }), '4.G.A.3', 194, 'geometry');
  }
  function symHot() {
    const ks = U.sample(Object.keys(Fig.SYM_LINES), 5), a = ks.map((k, i) => (Fig.SYM_LINES[k].length ? i : -1)).filter((i) => i >= 0);
    if (!a.length || a.length === 5) return symHot();
    return tag({ t: 'hot', q: 'Tap all the shapes that have at least one line of symmetry.', cells: ks.map((k) => Fig.symmetry(k)), cellNames: ks.map((k) => (k === 'L' ? 'an L-shape' : `a ${k}`)), layout: 'grid', multi: true, a, fig: Fig.symmetry('heart', 'v'), meta: { kind: 'hotSym', args: [ks] }, hint: 'Can you fold it so both halves match? The heart folds in half down the middle.', why: 'Each shape you should tap can be folded so the two halves match.' }, '4.G.A.3', 196, 'geometry');
  }
  function coordRead() {
    const pts = [], L = ['A', 'B', 'C'];
    while (pts.length < 3) { const x = U.int(1, 9), y = U.int(1, 9); if (x !== y && !pts.some((p) => p[0] === x && p[1] === y)) pts.push([x, y, L[pts.length]]); }
    const [x, y, l] = U.pick(pts);
    return tag(M4.mc(`What are the coordinates of point ${l}?`, `(${x}, ${y})`, [[`(${y}, ${x})`, 'The first number is how far across (x). The second is how far up (y).'], [`(${x}, ${y + 1})`, 'Count up from 0 again.'], [`(${x - 1}, ${y})`, 'Count across from 0 again.']], { fig: Fig.coordGrid(pts), meta: { kind: 'point', args: [x, y] }, hint: 'Start at 0. Go across first (x), then up (y).', why: `Point ${l} is ${x} across and ${y} up: (${x}, ${y}).` }), '5.G.A.1', 208, 'geometry');
  }
  function coordFind() {
    const pts = [], L = ['A', 'B', 'C', 'D'];
    while (pts.length < 4) { const x = U.int(1, 9), y = U.int(1, 9); if (!pts.some((p) => (p[0] === x && p[1] === y) || (p[0] === y && p[1] === x))) pts.push([x, y, L[pts.length]]); }
    const [x, y, l] = U.pick(pts.filter((p) => p[0] !== p[1]).length ? pts.filter((p) => p[0] !== p[1]) : pts);
    return tag(U.mcFixed(`Which point is at (${x}, ${y})?`, l, L, { fig: Fig.coordGrid(pts), meta: { kind: 'pointLabel', args: [x, y, pts] }, hint: 'Go across x first, then up y.', why: `(${x}, ${y}) is point ${l}.` }), '5.G.A.2', 206, 'geometry');
  }

  // ===================== MEASUREMENT =====================
  const CONV = [['feet', 'inches', 12, '📏'], ['yards', 'feet', 3, '📏'], ['meters', 'centimeters', 100, '📐'], ['kilometers', 'meters', 1000, '🛣️'], ['kilograms', 'grams', 1000, '⚖️'], ['liters', 'milliliters', 1000, '🧃'], ['hours', 'minutes', 60, '⏰'], ['minutes', 'seconds', 60, '⏱️'], ['pounds', 'ounces', 16, '⚖️']];
  function convertTable() {
    const [big, small, f] = U.pick(CONV), n = U.int(2, f >= 1000 ? 9 : 12), rows = [[cap(big), cap(small)], [1, c(f)], [2, c(2 * f)], [n, '?']];
    return tag(U.num(`1 ${big.replace(/s$/, '').replace('inche', 'inch').replace('feet', 'foot')} = ${c(f)} ${small}. How many ${small} are in ${n} ${big}?`, String(n * f), { unit: small, fig: Fig.table(n === 2 ? rows.filter((_, i) => i !== 2) : rows), meta: { kind: 'expr', args: [`${n} × ${f}`] }, miss: missMap([[n + f, 'Each one is worth ' + c(f) + ' ' + small + '. Multiply.']], String(n * f)), hint: `Each ${big.replace(/s$/, '').replace('feet', 'foot')} is ${c(f)} ${small}. Multiply by ${n}.`, why: `${n} × ${c(f)} = ${c(n * f)} ${small}` }), '4.M.A.1', 188, 'geometry');
  }
  function mixedUnits() {
    const [big, small, f] = U.pick(CONV.filter((x) => x[2] <= 100)), n = U.int(2, 9), r = U.int(1, f - 1);
    return tag(U.num(`How many ${small} are in ${n} ${big} ${r} ${small}?`, String(n * f + r), { unit: small, fig: Fig.barModel('?', [`${n} ${big}`, `${r} ${small}`]), meta: { kind: 'expr', args: [`${n} × ${f} + ${r}`] }, miss: missMap([[n * f, `Add the extra ${r} ${small}.`], [n + r, `Change the ${big} into ${small} first: 1 is ${f}.`], [n * 10 + r, `1 of the bigger unit is ${f} ${small}, not 10.`]], String(n * f + r)), hint: `Change ${n} ${big} into ${small}, then add ${r}.`, why: `${n} × ${f} + ${r} = ${n * f + r} ${small}` }), '4.M.A.2', 198, 'geometry');
  }
  function elapsed() {
    const h = U.int(1, 10), m = U.int(0, 11) * 5, dh = U.int(0, 2), dm = U.pick([15, 20, 25, 35, 40, 45, 50]), d = dh * 60 + dm;
    const t = (hh, mm) => `${hh}:${String(mm).padStart(2, '0')}`, wrap = (x) => ((x - 1) % 12 + 12) % 12 + 1;
    const end = (h * 60 + m + d) % 720, eh = Math.floor(end / 60) || 12, em = end % 60, carry = m + dm >= 60;
    const back = ((h * 60 + m - d) % 720 + 720) % 720;
    const [name] = kid();
    const w = [
      [t(wrap(h + dh + (carry ? 0 : 1)), (m + dm) % 60), carry ? 'When the minutes pass 60, add 1 to the hour.' : 'The minutes did not pass 60, so the hour does not change again.'],
      [t(eh, (em + 10) % 60), 'Count the minutes again.'],
      [t(Math.floor(back / 60) || 12, back % 60), 'That counts back. The practice ends LATER than it starts.'],
    ].filter(([v]) => v !== t(eh, em));
    return tag(M4.mc(`${name}'s soccer practice starts at ${t(h, m)}. It lasts ${dh ? `${dh} hour${dh > 1 ? 's' : ''} ` : ''}${dm} minutes. What time does it end?`, t(eh, em), w, { fig: Fig.clock(h, m), meta: { kind: 'elapsed', args: [h, m, d] }, hint: 'Add the hours, then the minutes. 60 minutes make 1 hour.', why: `${t(h, m)} plus ${dh ? `${dh} hour${dh > 1 ? 's' : ''} and ` : ''}${dm} minutes is ${t(eh, em)}.` }, 3, () => t(U.int(1, 12), U.int(0, 11) * 5)), '3.M.A.1 · 4.M.A.2', 186, 'geometry');
  }
  function moneyChange() {
    const paid = U.pick([500, 1000, 2000]), price = U.intWhere(105, paid - 50, (x) => x % 5 === 0 && x % 100 !== 0), ch = paid - price;
    const [name, he] = kid(), $ = (k) => `$${dec(k, 2)}`;
    const w = [
      [$(M4.subMisses(paid, price)[0]?.[0] ?? ch + 100), 'In each place the smaller digit was taken from the bigger one. Regroup the dollars into dimes and cents first.'],
      [$(ch + 100), 'A dollar was regrouped but not taken away.'],
      [$(paid - Math.floor(price / 100) * 100), 'Take away the cents too.'],
    ].filter(([v]) => v !== $(ch));
    return tag(M4.mc(`${name} buys a book for ${$(price)} and pays with a $${paid / 100} bill. How much change should ${he} get?`, $(ch), w, { fig: Fig.picture(['📘', '💵'], `${$(price)} · paid $${paid / 100}`), meta: { kind: 'moneyText', args: [paid, price] }, hint: `Subtract: $${paid / 100}.00 − ${$(price)}. Or count up from the price.`, why: `${$(paid)} − ${$(price)} = ${$(ch)}` }, 3, () => $(ch + U.pick([5, -5, 50]))), '4.M.A.2', 196, 'geometry');
  }
  function convertDec() {
    const pairs = [['centimeters', 'meters', 100], ['grams', 'kilograms', 1000], ['milliliters', 'liters', 1000], ['meters', 'kilometers', 1000]];
    const [small, big, f] = U.pick(pairs), toBig = U.pick([true, false]);
    if (toBig) {
      const n = U.intWhere(f / 10 + 1, f * 9, (x) => x % (f / 100 || 1) === 0 && x % f !== 0), ans = decTrim(n * (1000 / f), 3);
      return tag(U.num(`${c(n)} ${small} = ? ${big}`, ans, { keys: 'dec', unit: big, fig: Fig.table([[cap(big), cap(small)], [1, c(f)], ['?', c(n)]]), meta: { kind: 'dexpr', args: [`${n} / ${f}`] }, miss: missMap([[String(n * f), `Going to a BIGGER unit gives a smaller number. Divide by ${c(f)}.`], [decTrim(n * (1000 / f) * 10, 3), 'Count the places when you divide by ' + c(f) + '.']], ans), hint: `${c(f)} ${small} make 1 ${big.replace(/s$/, '')}. Divide by ${c(f)}.`, why: `${c(n)} ÷ ${c(f)} = ${ans} ${big}` }), '5.M.A.1', 210, 'geometry');
    }
    const k = U.intWhere(11, 99, (x) => x % 10 !== 0), v = decTrim(k * 100, 3), ans = k * f / 10;
    return tag(U.num(`${v} ${big} = ? ${small}`, String(ans), { unit: small, fig: Fig.table([[cap(big), cap(small)], [1, c(f)], [v, '?']]), meta: { kind: 'dexpr', args: [`${v} * ${f}`] }, miss: missMap([[decTrim(k * 100 / f * 1000, 3), 'Going to a smaller unit gives a bigger number. Multiply.'], [String(k * f), `Keep the decimal: ${v} × ${c(f)}.`]], String(ans)), hint: `1 ${big.replace(/s$/, '')} is ${c(f)} ${small}. Multiply by ${c(f)}.`, why: `${v} × ${c(f)} = ${c(ans)} ${small}` }), '5.M.A.1', 208, 'geometry');
  }

  // ===================== AREA, PERIMETER & VOLUME =====================
  function areaCount() {
    const w = U.int(3, 8), h = U.int(2, 6);
    return tag(M4.mc('Each square is 1 square unit. What is the area of the rectangle?', `${w * h} square units`, [[`${2 * (w + h)} square units`, 'That counts around the edge. Area counts the squares inside.'], [`${w + h} square units`, `Multiply: ${h} rows of ${w}.`], [`${w * h + w} square units`, 'Count the rows again.']], { fig: Fig.rect(w, h, { grid: true }), meta: { kind: 'exprUnit', args: [`${w} × ${h}`, 'square units'] }, hint: `${h} rows of ${w} squares.`, why: `${h} × ${w} = ${w * h} square units` }), '3.M.B.5', 180, 'geometry');
  }
  function areaPerim() {
    const w = U.int(6, 25), h = U.intWhere(3, 15, (x) => x !== w), unit = U.pick(['cm', 'm', 'ft', 'in']), area = U.pick([true, false]), ans = area ? w * h : 2 * (w + h);
    const u = { cm: 'centimeters', m: 'meters', ft: 'feet', in: 'inches' }[unit];
    return tag(M4.mc(`What is the ${area ? 'area' : 'perimeter'} of the rectangle?`, `${ans} ${area ? 'square ' : ''}${u}`, area ? [[`${2 * (w + h)} square ${u}`, 'That is the perimeter. Area = length × width.'], [`${w + h} square ${u}`, 'Multiply the length and width.']] : [[`${w * h} ${u}`, 'That is the area. Perimeter adds all four sides.'], [`${w + h} ${u}`, 'There are four sides, not two: 2 × (length + width).']], { fig: Fig.rect(w, h, { grid: false, labels: true, unit }), meta: { kind: 'exprUnit', args: [area ? `${w} × ${h}` : `2 × (${w} + ${h})`, `${area ? 'square ' : ''}${u}`] }, hint: area ? 'Area = length × width.' : 'Perimeter = 2 × length + 2 × width.', why: area ? `${w} × ${h} = ${w * h} square ${u}` : `2 × (${w} + ${h}) = ${2 * (w + h)} ${u}` }, 3, () => `${ans + U.pick([2, 10, -2])} ${area ? 'square ' : ''}${u}`), '4.M.A.3', 192, 'geometry');
  }
  function missingSide() {
    const w = U.int(4, 15), h = U.int(3, 12), unit = U.pick(['feet', 'meters', 'inches']), byArea = U.pick([true, false]);
    if (byArea) return tag(U.num(`A rectangle has an area of ${w * h} square ${unit}. Its length is ${w} ${unit}. What is its width?`, String(h), { unit, fig: Fig.rect(w, h, { grid: false, labels: true, unit: unit === 'feet' ? 'ft' : unit === 'meters' ? 'm' : 'in', hLabel: '?' }), meta: { kind: 'expr', args: [`${w * h} ÷ ${w}`] }, miss: missMap([[w * h - w, 'Area is length × width, so divide the area by the length.']], String(h)), hint: `${w} × ? = ${w * h}`, why: `${w * h} ÷ ${w} = ${h} ${unit}` }), '4.M.A.3', 200, 'geometry');
    const P = 2 * (w + h);
    return tag(U.num(`A rectangle has a perimeter of ${P} ${unit}. Its length is ${w} ${unit}. What is its width?`, String(h), { unit, fig: Fig.rect(w, h, { grid: false, labels: true, unit: unit === 'feet' ? 'ft' : unit === 'meters' ? 'm' : 'in', hLabel: '?' }), meta: { kind: 'sideFromPerim', args: [P, w] }, miss: missMap([[P - w, 'There are TWO lengths. Subtract both, then split what is left between the two widths.'], [P - 2 * w, 'That is both widths together. Halve it.']], String(h)), hint: `Two lengths: ${w} + ${w} = ${2 * w}. The two widths make the rest.`, why: `${P} − ${2 * w} = ${P - 2 * w}; ${P - 2 * w} ÷ 2 = ${h} ${unit}` }), '4.M.A.3', 204, 'geometry');
  }
  function volume(entry) {
    const l = U.int(2, 6), w = U.int(2, 4), h = U.int(2, 5), v = l * w * h;
    if (entry) return tag(U.num(`A box is ${l} cm long, ${w} cm wide, and ${h} cm tall. What is its volume in cubic centimeters?`, String(v), { unit: 'cubic cm', fig: Fig.prism(l, w, h), meta: { kind: 'expr', args: [`${l} × ${w} × ${h}`] }, miss: missMap([[l + w + h, 'Volume multiplies the three edges.'], [l * w, 'That is one layer. Multiply by the number of layers.']], String(v)), hint: 'Volume = length × width × height.', why: `${l} × ${w} × ${h} = ${v} cubic cm` }), '5.M.B.4', 212, 'geometry');
    const faces = l * h + w * h + l * w;
    return tag(M4.mc('The box is made of unit cubes. How many cubes are in the whole box?', String(v), [[String(faces), 'That counts only the cubes you can see. Count the hidden ones too: layers × cubes in each layer.'], [String(l * w), 'That is one layer. Multiply by the number of layers.'], [String(l + w + h), 'Multiply the edges, do not add them.']], { fig: Fig.prism(l, w, h), meta: { kind: 'expr', args: [`${l} × ${w} × ${h}`] }, hint: `Each layer is ${l} × ${w}. How many layers?`, why: `${l} × ${w} = ${l * w} in a layer; ${l * w} × ${h} = ${v} cubes` }, 3, () => String(v + U.pick([l, w, -l]))), '5.M.B.3', 208, 'geometry');
  }

  // Two boxes side by side: add the volumes (harder Grade 5).
  function compositeVolume() {
    const a = [U.int(2, 5), U.int(2, 3), U.int(2, 4)], b = [U.int(2, 4), U.int(2, 3), U.int(1, 3)], va = a[0] * a[1] * a[2], vb = b[0] * b[1] * b[2];
    return tag(U.num(`A shape is made of two boxes. Box A is ${a.join(' by ')} units. Box B is ${b.join(' by ')} units. What is the total volume?`, String(va + vb), { unit: 'cubic units', fig: Fig.pair(Fig.prism(...a), Fig.prism(...b)), meta: { kind: 'expr', args: [`${a.join(' × ')} + ${b.join(' × ')}`] }, miss: missMap([[va * vb, 'Find each volume, then ADD them.'], [va, 'Add box B too.']], String(va + vb)), hint: 'Find the volume of each box (length × width × height), then add.', why: `${va} + ${vb} = ${va + vb} cubic units` }), '5.M.B.4', 224, 'geometry');
  }

  // ===================== LINE PLOTS & DATA =====================
  const PLOTS = [['Lengths of pencils', 'inches', 'pencils'], ['Heights of seedlings', 'inches', 'seedlings'], ['Lengths of ribbons', 'inches', 'ribbons'], ['Water in beakers', 'cups', 'beakers']];
  function makePlot(den) {
    const base = U.int(1, 4), n = U.int(7, 11), vals = [];
    const span = den === 8 ? 1 : 2; // eighths over one unit, so every label on the plot can be read
    const choices = [...Array(den * span + 1).keys()].map((i) => base + i / den);
    for (let i = 0; i < n; i++) vals.push(choices[Math.min(choices.length - 1, Math.floor(Math.random() * choices.length))]);
    return { base, vals, choices, top: base + span };
  }
  const fracOf = (v, den) => simp([Math.round(v * den), den]); // in simplest form: 5 2/8 → 5 1/4
  function plotCount() {
    const den = U.pick([2, 4, 8]), [title, unit, things] = U.pick(PLOTS), { base, vals, top } = makePlot(den);
    const v = U.pick(vals), cnt = vals.filter((x) => x === v).length;
    return tag(U.num(`How many ${things} ${unit === 'cups' ? 'hold' : 'measure'} ${fx(fracOf(v, den), true)} ${unit}?`, String(cnt), { fig: Fig.linePlot(title, base, top, vals, den, unit), meta: { kind: 'countVal', args: [vals, v] }, hint: 'Find that mark on the line. Count the X marks above it.', why: `There are ${cnt} X marks above ${fx(fracOf(v, den), true)}.` }), '4.DL.B.5', 190, 'geometry');
  }
  function plotDiff() {
    const den = U.pick([2, 4, 8]), [title, unit] = U.pick(PLOTS), { base, vals, top } = makePlot(den);
    const mx = Math.max(...vals), mn = Math.min(...vals);
    if (mx === mn) return plotDiff();
    const ans = simp(fracOf(mx - mn, den));
    return tag(U.num(`What is the difference between the longest and shortest? (${title.toLowerCase()})\nType a fraction or a mixed number.`, ftyped(ans, true), { keys: 'mixed', unit, fig: Fig.linePlot(title, base, top, vals, den, unit), meta: { kind: 'fexpr', args: [fracOf(mx, den), '−', fracOf(mn, den)] }, miss: missMap([[ftyped(simp(fracOf(mx + mn, den)), true), 'Difference means subtract.']], ftyped(ans, true)), hint: 'Find the X farthest right and the X farthest left. Subtract.', why: `${fx(fracOf(mx, den), true)} − ${fx(fracOf(mn, den), true)} = ${fx(ans, true)}` }), '4.DL.B.5', 202, 'geometry');
  }
  function plotMost() {
    const den = U.pick([2, 4]), [title, unit] = U.pick(PLOTS), { base, vals, top: end } = makePlot(den);
    const counts = {}; vals.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
    const top = Math.max(...Object.values(counts)), modes = Object.keys(counts).filter((k) => counts[k] === top);
    if (modes.length > 1) return plotMost();
    const m = +modes[0], others = U.sample(Object.keys(counts).map(Number).filter((v) => v !== m), Math.min(3, Object.keys(counts).length - 1));
    if (others.length < 2) return plotMost();
    const lab = (v) => `${fx(fracOf(v, den), true)} ${unit}`;
    return tag(M4.mc(`Which measurement appears most often? (${title.toLowerCase()})`, lab(m), others.map((v) => [lab(v), `${lab(v)} has ${counts[v]} X marks. Find the tallest stack.`]), { fig: Fig.linePlot(title, base, end, vals, den, unit), meta: { kind: 'plotMode', args: [vals, den, unit] }, hint: 'Find the tallest stack of X marks.', why: `${lab(m)} has ${top} X marks.` }), '4.DL.A.4', 194, 'geometry');
  }
  function plotShare() {
    const den = U.pick([2, 4]), [title, unit] = U.pick(PLOTS.filter((p) => p[1] === 'cups')), { base, vals, top } = makePlot(den);
    const total = fracOf(vals.reduce((t, v) => t + v, 0), den), n = vals.length, ans = simp([total[0], total[1] * n]);
    return tag(U.num(`The water in all ${n} beakers is poured together and shared equally among the ${n} beakers. How much water will each beaker have?\nType a fraction or a mixed number.`, ftyped(ans, true), { keys: 'mixed', unit: 'cups', fig: Fig.linePlot(title, base, top, vals, den, unit), meta: { kind: 'fexpr', args: [total, '÷', [n, 1]] }, miss: missMap([[ftyped(simp(total), true), 'That is the total. Share it among the beakers: divide.']], ftyped(ans, true)), hint: 'Add all the amounts, then divide by the number of beakers.', why: `Total ${fx(simp(total), true)} cups ÷ ${n} = ${fx(ans, true)} cups each` }), '5.DL.B.5', 214, 'geometry');
  }

  M4_SKILLS.push(
    { goal: 'geometry', id: 'angle', name: 'Angles', icon: '📐', levels: [
      lv('Kinds of angles', '4.G.A.1 · 4.M.B.4', 'Acute, right, obtuse.', [angleKind, angleHot]),
      lv('Measure and add angles', '4.M.B.5 · 4.M.B.6', 'Protractors and missing angles.', [protractorRead, angleAdd, angleAdd]),
      lv('Shapes and their names', '4.G.A.2 · 5.G.B.4', 'Triangles and quadrilaterals.', [triangleHot, shapeNames]) ] },
    { goal: 'geometry', id: 'lines', name: 'Lines, symmetry & grids', icon: '📍', levels: [
      lv('Points, lines, and rays', '4.G.A.1', 'Endpoints and arrows.', [lineKind]),
      lv('Lines of symmetry', '4.G.A.3', 'Fold it in half.', [symYesNo, symHot, symYesNo]),
      lv('The coordinate grid', '5.G.A.1 · 5.G.A.2', 'Across, then up.', [coordRead, coordFind]) ] },
    { goal: 'geometry', id: 'meas', name: 'Measurement', icon: '⚖️', levels: [
      lv('Convert units', '3.M.A.1 · 4.M.A.1', 'Bigger units into smaller ones.', [convertTable, convertTable, elapsed]),
      lv('Measurement problems', '4.M.A.2', 'Time, money, and mixed units.', [mixedUnits, moneyChange, elapsed]),
      lv('Metric conversions with decimals', '5.M.A.1', 'Move the decimal point.', [convertDec]) ] },
    { goal: 'geometry', id: 'area', name: 'Area, perimeter & volume', icon: '🟦', levels: [
      lv('Area and perimeter', '3.M.B.5 · 4.M.A.3', 'Inside and around.', [areaCount, areaPerim, areaPerim]),
      lv('Find the missing side', '4.M.A.3', 'Use the formula backward.', [missingSide, areaPerim]),
      lv('Volume', '5.M.B.3 · 5.M.B.4', 'Count the cubes.', [() => volume(false), () => volume(true), compositeVolume]) ] },
    { goal: 'geometry', id: 'data', name: 'Line plots & data', icon: '📊', levels: [
      lv('Read a line plot', '4.DL.A.4 · 4.DL.B.5', 'Count the X marks.', [plotCount, plotMost]),
      lv('Solve with line plots', '4.DL.B.5', 'Add and subtract fractions.', [plotDiff, plotCount]),
      lv('Share equally', '5.DL.B.5', 'Even out the amounts.', [plotShare]) ] },
  );
})();
