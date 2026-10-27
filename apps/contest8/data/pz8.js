// Puzzle Peak 8 content: puzzle families from contest2:pzkit.js at difficulty 6–8 (≈ the Grades 7–8 paper's 3-, 4-, and
// 5-point questions, and the easy, middle, and hard thirds of an AMC 8–style contest).
// Standards: closest 2023 NJSLS-Mathematics code (contest topics like counting and number theory go past the grade
// standards; HANDOFF.md lists which codes are only "closest").
(function () {
  const count = [
    { id: 'counting8', name: 'Counting', icon: '🔢', titles: ['Organized counting', 'Paths and pairs', 'Harder counting'], descs: ['Lists, pairs, and digits.', 'Corners, lines, and handshakes.', 'Put the methods together.'],
      levels: [[['rects', 6], ['handshake', 6], ['digitSum', 6]], [['paths', 7], ['rects', 7], ['handshake', 7]], [['paths', 8], ['rects', 8], ['digitSum', 8], ['pages', 8]]] },
    { id: 'prob8', name: 'Probability & cycles', icon: '🎲', titles: ['Two dice', 'At least…', 'Cycles and chances'], descs: ['36 equally likely outcomes.', 'Count the pairs that work.', 'Remainders and repeating patterns.'],
      levels: [[['dice', 6], ['beads', 6]], [['dice', 7], ['calendar', 7], ['beads', 7]], [['dice', 8], ['beads', 8], ['calendar', 8]]] },
  ];
  const num = [
    { id: 'numth8', name: 'Number theory', icon: '🧮', titles: ['Factors and last digits', 'Cycles and sums', 'Number sense'], descs: ['Factor pairs and powers.', 'Consecutive numbers.', 'Mixed number puzzles.'],
      levels: [[['divisors', 6], ['lastDigit', 6], ['consec', 6]], [['divisors', 7], ['lastDigit', 7], ['consec', 7]], [['divisors', 8], ['lastDigit', 8], ['consec', 8], ['digits', 8]]] },
    { id: 'alg8', name: 'Algebra & logic', icon: '⚖️', titles: ['Ages, averages, balances', 'Systems in disguise', 'Work backward'], descs: ['Totals, not averages.', 'Three scales, two kinds.', 'Undo the steps.'],
      levels: [[['ages', 6], ['avg', 6], ['balance', 6]], [['legs', 7], ['ages', 7], ['balance', 7]], [['avg', 8], ['back', 8], ['pyramid', 8], ['legs', 8]]] },
  ];
  const geo = [
    { id: 'geo8', name: 'Geometry', icon: '📐', titles: ['Angles and grids', 'Painted cubes', 'Shapes inside shapes'], descs: ['Polygons and squares.', 'Corners, edges, faces.', 'Count every size.'],
      levels: [[['polygon', 6], ['squares', 6], ['painted', 6]], [['polygon', 7], ['painted', 7], ['squares', 7]], [['painted', 8], ['polygon', 8], ['squares', 8], ['rects', 8]]] },
  ];
  const trail = [
    { id: 'tcube8', name: 'Look inside the cube', icon: '🧊', titles: ['Where does it sit?', 'Bigger cubes', 'Count every kind'], descs: ['Corners, edges, faces, inside.', 'Use the pattern.', 'Check the total.'],
      levels: [[['painted', 6], ['cubes', 6]], [['painted', 7], ['squares', 7]], [['painted', 8], ['rects', 8]]] },
    { id: 'tpascal8', name: 'Paths and pyramids', icon: '🔺', titles: ['Add as you go', 'Pascal’s pattern', 'Work backward'], descs: ['Each corner adds two numbers.', 'Pyramids and paths share a pattern.', 'Find the hidden brick.'],
      levels: [[['paths', 6], ['pyramid', 6]], [['paths', 7], ['pyramid', 7]], [['paths', 8], ['pyramid', 8]]] },
    { id: 'tcycle8', name: 'Patterns that repeat', icon: '🔁', titles: ['Find the cycle', 'Pairs and balance', 'Big counts'], descs: ['Last digits repeat.', 'Balance around the middle.', 'Group, then add.'],
      levels: [[['lastDigit', 6], ['consec', 6]], [['lastDigit', 7], ['handshake', 7]], [['lastDigit', 8], ['digitSum', 8], ['pages', 8]]] },
  ];
  const STD = {
    counting8: ['7.EE.B.4', '7.EE.B.4', '7.EE.B.4'], prob8: ['7.RP.A.2', '7.RP.A.2', '7.RP.A.2 · S.CP.A.4'],
    numth8: ['4.OA.B.4 · 8.EE.A.1', '4.OA.B.4 · 7.EE.B.4', '8.EE.A.1 · 7.EE.B.4'], alg8: ['7.EE.B.4', '7.EE.B.4 · 8.EE.C.7', '7.EE.B.4 · A.CED.A.1'],
    geo8: ['G.CO.C.10 · 7.G.B.6', '7.G.B.6', '7.G.B.6 · G.CO.C.10'],
    tcube8: ['7.G.B.6', '7.G.B.6', '7.G.B.6'], tpascal8: ['7.EE.B.4', '7.EE.B.4', '7.EE.B.4'], tcycle8: ['8.EE.A.1', '8.EE.A.1 · 7.EE.B.4', '8.EE.A.1 · 7.EE.B.4'],
  };
  PZAPP.addContest({ id: 'count8', name: 'Counting & Probability', icon: '🎲', color: 'c1', blurb: 'Organized counting, paths, dice, and cycles.' }, count, STD);
  PZAPP.addContest({ id: 'num8', name: 'Numbers & Algebra', icon: '🧮', color: 'c2', blurb: 'Factors, last digits, averages, ages, and balances.' }, num, STD);
  PZAPP.addContest({ id: 'geom8', name: 'Geometry', icon: '📐', color: 'c3', blurb: 'Polygon angles, grids, and painted cubes.' }, geo, STD);
  PZAPP.addTrail({ id: 'trail8', name: 'Summit Trail', icon: '🏔️', color: 'c6', blurb: 'Deeper problems with step-by-step hints and worked solutions.' }, trail, STD);
  PZAPP.lessonsFor([...count, ...num, ...geo, ...trail], {
    'tcube8.0': { rule: 'Before counting, ask WHERE a small cube must sit to have that many painted faces. Then count those places on the big cube.', ex: '4 × 4 × 4: 2 painted faces → on an edge but not a corner: 12 edges × 2 = 24', fig: () => Fig.prism(4, 4, 4) },
    'tpascal8.0': { rule: 'Paths to a corner = paths to the corner below + paths to the corner on the left. The same adding rule builds a number pyramid (Pascal’s triangle).', ex: '3 by 2 grid: 1, 1, 1, 1 / 1, 2, 3, 4 / 1, 3, 6, 10 → 10 paths', fig: () => Fig.gridPath(3, 2) },
    'tcycle8.0': { rule: 'When something repeats, find the length of the cycle. Then only the remainder matters.', ex: '7^n ends in 7, 9, 3, 1, 7, … (cycle 4) → 7^50: 50 = 4 × 12 + 2 → ends in 9', fig: () => Fig.table([['Power', '7^1', '7^2', '7^3', '7^4'], ['Last digit', '7', '9', '3', '1']]) },
  });
})();
