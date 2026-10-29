// Algebra 1 Quest: the subjects, in the course's 11-topic order (the order of a typical Algebra 1 course book).
// Skills come from a1-real/a1-eei/a1-func.js, from MAP Algebra 1's own skills (map-items.js, MAP_NEW), and from
// a1-topics.js (A1_NEW). Three earlier skills were split across topics: 'factor' (Factoring & quadratics) became
// 'factoring' and 'qsolve', and 'stats' became 'data11' and 'fitline'. APP.progressMoves carries their stars over.
(function () {
  const pool = Object.fromEntries([...A1_SKILLS, ...MAP_NEW, ...A1_NEW].map((k) => [k.id, k]));
  // A level made from other levels' questions (shuffled, no repeats).
  const merge = (title, std, desc, levels) => ({ title, std, desc, gen: () => { const seen = new Set(), out = []; for (const q of U.shuffle(levels.flatMap((L) => L.gen()))) { const k = U.qkey(q); if (!seen.has(k) && out.length < 8) { seen.add(k); out.push(q); } } return out; } });
  const L = (id, l) => pool[id].levels[l];
  const X = A1_NEW.extra;
  pool.factoring.levels = [L('factor', 0), ...X.factoring];
  pool.qsolve.levels = [
    { ...L('factor', 1), title: 'Solve by factoring' },
    merge('Square roots and completing the square', 'A.REI.B.4 · A.SSE.B.3', 'Take square roots; complete the square.', [L('quadmore', 0), L('quadmore', 1)]),
    { ...L('factor', 2), title: 'The quadratic formula and the discriminant' },
  ];
  pool.data11.levels = [L('stats', 0), L('stats', 1), ...X.data11];
  pool.fitline.levels = [{ ...L('stats', 2), title: 'Scatter plots and lines of fit' }, ...X.fitline];
  const TOPICS = [
    ['eqineq', 'Solving Equations and Inequalities', '⚖️', ['realnum', 'exprs', 'eqprep', 'lineq', 'units', 'ineq', 'absval']],
    ['lineqs', 'Linear Equations', '📈', ['linear', 'forms']],
    ['linfns', 'Linear Functions', '🔁', ['functions', 'rates', 'seq', 'fitline']],
    ['systems', 'Systems of Linear Equations and Inequalities', '✖️', ['systems', 'modelx']],
    ['piecewise', 'Piecewise Functions', '🪜', ['absfn', 'piecewise']],
    ['expo', 'Exponents and Exponential Functions', '🚀', ['exponents', 'scinot', 'expo']],
    ['polys', 'Polynomials and Factoring', '🧱', ['polys', 'factoring', 'equivx']],
    ['quadfns', 'Quadratic Functions', '⛰️', ['quadfn', 'quadmodel']],
    ['quadeqs', 'Solving Quadratic Equations', '🎯', ['qsolve', 'linquad']],
    ['workfns', 'Working With Functions', '🔧', ['features', 'workfn']],
    ['stats', 'Statistics', '📊', ['data11', 'data2']],
  ];
  // Each topic ends with its Honors skill (a1-honors.js).
  const HON = ['honEq', 'honLin', 'honFn', 'honSys', 'honPw', 'honExp', 'honPoly', 'honQf', 'honQe', 'honWf', 'honSt'];
  TOPICS.forEach(([id, name, icon, ids], i) => addSubject({ id, name: `${i + 1}. ${name}`, icon, color: `c${(i % 6) + 1}`, blurb: ids.map((k) => pool[k].name).join(' · '), skills: [...ids.map((k) => pool[k]), A1_HONORS[HON[i]]] }));
})();
