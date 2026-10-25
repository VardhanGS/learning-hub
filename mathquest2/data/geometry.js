// GEOMETRY — 2.G.A.1–3; Grade 3 level-ups 3.G.A.1, 3.NF.A.1, 3.NF.A.3, 3.M.B.5.
(function () {
  const { pl, tag, missMap, cap } = MQ;
  const SIDES = { triangle: 3, square: 4, rectangle: 4, rhombus: 4, trapezoid: 4, parallelogram: 4, pentagon: 5, hexagon: 6 };

  // ---------- Shapes ----------
  function nameShape() {
    const kind = U.pick(['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'circle', 'triangle', 'hexagon']);
    const w = [];
    if (kind === 'pentagon') w.push(['hexagon', 'Count the sides: a hexagon has 6, this shape has 5.']);
    if (kind === 'hexagon') w.push(['pentagon', 'Count the sides: a pentagon has 5, this shape has 6.'], ['octagon', 'An octagon has 8 sides.']);
    if (kind === 'square') w.push(['rectangle', 'A square IS a special rectangle, but its best name is square: all 4 sides are equal.']);
    if (kind === 'rectangle') w.push(['square', 'A square has 4 equal sides. These sides are not all equal.']);
    if (kind === 'triangle') w.push(['square', 'Count the sides. A triangle has 3.']);
    const all = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'circle'].filter((x) => x !== kind && !w.some(([v]) => v === x)).map((x) => [x, x === 'circle' ? 'A circle has no straight sides.' : `A ${x} has ${SIDES[x]} sides. Count again.`]);
    return tag(U.mcMiss('What is the name of this shape?', kind, [...w, ...U.shuffle(all)], { fig: Fig.shape(kind, kind === 'circle' ? 0 : U.pick([0, 0, 15, 30, 45, 90])), meta: { kind: 'shapeName', args: [kind] }, hint: 'Count the sides and corners.', why: kind === 'circle' ? 'It is round with no straight sides: a circle.' : `It has ${SIDES[kind]} sides${kind === 'square' ? ' that are all the same length' : ''}: a ${kind}.` }), '2.G.A.1', 164, 'geometry');
  }
  function countSides() {
    if (U.pick([true, false, false])) {
      const prop = U.pick(['faces', 'corners (vertices)', 'edges']);
      const ans = { faces: 6, 'corners (vertices)': 8, edges: 12 }[prop];
      const q = U.num(`How many ${prop} does a cube have?`, ans, { fig: Fig.shape('cube'), meta: { kind: 'cube', args: [prop] }, hint: prop === 'faces' ? 'A face is a flat side. Think of a dice: top, bottom, front, back, left, right.' : prop === 'edges' ? 'An edge is where two faces meet: 4 on top, 4 on the bottom, 4 going up.' : 'A corner is where edges meet: 4 on top and 4 on the bottom.', why: `A cube has 6 faces, 12 edges, and 8 corners.` });
      q.miss = missMap([[3, 'Some faces are hidden behind the cube. Count the ones you cannot see too.'], [4, 'Count the hidden parts at the back and bottom too.']], ans);
      return tag(q, '2.G.A.1', 182, 'geometry');
    }
    const kind = U.pick(['triangle', 'pentagon', 'hexagon', 'rectangle', 'trapezoid']), what = U.pick(['sides', 'angles', 'corners']);
    const q = U.num(`How many ${what} does this shape have?`, SIDES[kind], { fig: Fig.shape(kind), meta: { kind: 'sides', args: [kind] }, hint: `Touch each ${what.slice(0, -1)} as you count. ${what === 'sides' ? '' : 'A shape has the same number of angles as sides.'}`, why: `A ${kind} has ${SIDES[kind]} sides and ${SIDES[kind]} angles.` });
    return tag(q, '2.G.A.1', 172, 'geometry');
  }
  function fourSides() {
    const right = U.sample(['square', 'rectangle', 'trapezoid', 'rhombus'], U.int(2, 3));
    const wrong = U.sample(['triangle', 'pentagon', 'hexagon', 'circle'], 3);
    return tag(U.multi('Choose all the shapes that have exactly 4 sides.', right, wrong, { fig: Fig.shapeRow(U.shuffle([...right, ...wrong])), meta: { kind: 'sidesIs', args: [4] }, hint: 'Squares, rectangles, rhombuses, and trapezoids all have 4 sides.', why: 'Shapes with 4 sides are called quadrilaterals.' }), '2.G.A.1', 180, 'geometry');
  }
  function quads() {
    if (U.pick([true, false])) {
      const right = U.sample(['square', 'rectangle', 'rhombus', 'trapezoid', 'parallelogram'], U.int(2, 4));
      const wrong = U.sample(['triangle', 'pentagon', 'hexagon', 'circle'], 2);
      return tag(U.multi('Choose all the quadrilaterals.', right, wrong, { fig: Fig.shapeRow(U.shuffle([...right, ...wrong])), meta: { kind: 'sidesIs', args: [4] }, hint: '"Quad" means four. A quadrilateral has 4 sides and 4 angles.', why: 'Squares, rectangles, rhombuses, trapezoids, and parallelograms all have 4 sides.' }), '3.G.A.1', 196, 'geometry');
    }
    const facts = [
      ['Which shape has 4 equal sides and 4 square corners?', 'square', [['rhombus', 'A rhombus has 4 equal sides, but its corners are not always square.'], ['rectangle', 'A rectangle has 4 square corners, but its sides are not always all equal.']]],
      ['Which shape has 4 equal sides, but its corners are not always square?', 'rhombus', [['square', 'A square always has square corners.'], ['rectangle', 'A rectangle does not always have 4 equal sides.']]],
      ['Which shape always has 4 square corners, but not always 4 equal sides?', 'rectangle', [['rhombus', 'A rhombus does not always have square corners.'], ['square', 'A square always has 4 equal sides.']]],
      ['Which shape has exactly one pair of parallel sides (sides that never meet)?', 'trapezoid', [['rectangle', 'A rectangle has two pairs of parallel sides.'], ['triangle', 'A triangle has no parallel sides.']]],
    ];
    const i = U.int(0, facts.length - 1), [qq, a, w] = facts[i];
    return tag(U.mcMiss(qq, a, [...w, ['pentagon', 'A pentagon has 5 sides.']], { fig: Fig.shapeRow(['square', 'rhombus', 'rectangle', 'trapezoid']), meta: { kind: 'quadFact', args: [i] }, hint: 'Think about the sides AND the corners.', why: `That describes a ${a}.` }), '3.G.A.1', 202, 'geometry');
  }

  // ---------- Equal parts ----------
  const WORD = { 2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['fourth', 'fourths'], 6: ['sixth', 'sixths'], 8: ['eighth', 'eighths'] };
  const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const fracWords = (n, d) => `${NUMW[n]} ${WORD[d][n === 1 ? 0 : 1]}`;
  function shadeWords(maxN) {
    const d = U.pick([2, 3, 4]), n = maxN === 1 ? 1 : U.int(1, d - 1), shape = U.pick(['circle', 'bar']);
    return tag(U.shade(`Shade ${fracWords(n, d)} of the ${shape === 'circle' ? 'circle' : 'rectangle'}.`, n, { shape, parts: d }, { meta: { kind: 'count', args: [n] }, hint: `There are ${d} equal parts. Shade ${n} of them.`, why: `${cap(fracWords(n, d))} means ${n} of ${d} equal parts.` }), '2.G.A.3', maxN === 1 ? 166 : 176, 'geometry');
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
    const tex = (f) => T(`\\frac{${f.split('/')[0]}}{${f.split('/')[1]}}`);
    return tag(U.multi(`Choose all the fractions equal to ${T('\\frac{1}{2}')}.`, right.map(tex), wrong.map(tex), { fig: Fig.fraction('bar', 2, 1), meta: { kind: 'equivHalf', args: [] }, hint: 'A fraction equals one half when the top number is half of the bottom number.', why: '2/4, 3/6, and 4/8 are all equal to 1/2: the top is half of the bottom.' }), '3.NF.A.3', 198, 'number');
  }

  // ---------- Rows, columns, area ----------
  function countSquares() {
    const r = U.int(2, 5), c = U.int(2, 6);
    const q = U.num('The rectangle is split into equal squares. How many squares are there?', r * c, { fig: Fig.rect(c, r), meta: { kind: 'mul', args: [r, c] }, hint: `Count one row (${c}), then add a row at a time.`, why: `${pl(r, 'row')} of ${c}: ${Array(r).fill(c).join(' + ')} = ${r * c}` });
    q.miss = missMap([[r + c, 'That counts one row and one column. Count every square.'], [2 * (r + c) - 4, 'That counts only the squares around the edge.']], r * c);
    return tag(q, '2.G.A.2', 170, 'geometry');
  }
  function rowsColumns() {
    const r = U.int(2, 5), c = U.intWhere(2, 6, (x) => x !== r);
    const right = Array(r).fill(c).join(' + ') + ` = ${r * c}`;
    return tag(U.mcMiss(`A rectangle has ${pl(r, 'row')} with ${c} squares in each row. Which shows the total?`, right, [[`${r} + ${c} = ${r + c}`, 'Add the squares in every row, not just the rows and columns.'], [Array(r).fill(c + 1).join(' + ') + ` = ${r * (c + 1)}`, `Each row has ${c} squares.`], [Array(r + 1).fill(c).join(' + ') + ` = ${(r + 1) * c}`, `There are ${pl(r, 'row')}. Add ${c} only ${r} times.`]].filter(([v]) => v !== right), { fig: Fig.rect(c, r), meta: { kind: 'arrayEq', args: [r, c] }, hint: `Add ${c} once for each of the ${pl(r, 'row')}.`, why: right }), '2.G.A.2', 180, 'geometry');
  }
  function areaGrade3() {
    const w = U.int(3, 9), h = U.intWhere(2, 8, (x) => x !== w), unit = U.pick(['cm', 'in', 'm', 'ft']);
    const grid = U.pick([true, false]);
    const q = U.num(`What is the area of the rectangle?`, w * h, { unit: `square ${unit}`, fig: Fig.rect(w, h, { grid, labels: true, unit }), meta: { kind: 'area', args: [w, h] }, hint: 'Area = rows × squares in each row. Multiply the side lengths.', why: `${w} × ${h} = ${w * h} square ${unit}` });
    q.miss = missMap([[2 * (w + h), `${2 * (w + h)} is the perimeter (the distance around). Area is the squares inside.`], [w + h, `That is ${w} + ${h}. Area multiplies the sides.`]], w * h);
    return tag(q, '3.M.B.5', 198, 'geometry');
  }

  addSubject({
    id: 'geo', name: 'Geometry', icon: '🔷', color: 'c4', blurb: 'Shapes, equal parts, and area.',
    skills: [
      { id: 'shapes', name: 'Shapes', icon: '🔺', levels: [
        { title: 'Name the shape', std: '2.G.A.1', desc: 'Triangles to hexagons.', gen: () => U.mix(8, [nameShape]) },
        { title: 'Sides, angles, faces', std: '2.G.A.1', desc: 'Count the parts of a shape.', gen: () => U.mix(8, [countSides, countSides, fourSides]) },
        { title: 'Quadrilaterals', std: '3.G.A.1', desc: 'Squares, rhombuses, rectangles.', gen: () => U.mix(8, [quads]) },
      ] },
      { id: 'fparts', name: 'Equal parts', icon: '🥧', levels: [
        { title: 'Halves, thirds, fourths', std: '2.G.A.3', desc: 'Name and shade one equal part.', gen: () => U.mix(8, [() => shadeWords(1), nameShaded]) },
        { title: 'Parts of a whole', std: '2.G.A.3', desc: 'Two thirds, three fourths, and wholes.', gen: () => U.mix(8, [() => shadeWords(3), () => shadeWords(3), wholeParts]) },
        { title: 'Fractions and equal fractions', std: '3.NF.A.1 · 3.NF.A.3', desc: 'Read fractions like 3/4, and find equal ones.', gen: () => U.mix(8, [shadeGrade3, shadeGrade3, equalHalf]) },
      ] },
      { id: 'area', name: 'Rows & area', icon: '🟩', levels: [
        { title: 'Rows and columns of squares', std: '2.G.A.2', desc: 'Count the squares.', gen: () => U.mix(8, [countSquares]) },
        { title: 'Add the rows', std: '2.G.A.2 · 2.OA.C.4', desc: 'Repeated addition.', gen: () => U.mix(8, [rowsColumns, countSquares]) },
        { title: 'Area', std: '3.M.B.5', desc: 'Multiply the side lengths.', gen: () => U.mix(8, [areaGrade3]) },
      ] },
    ],
  });
})();
