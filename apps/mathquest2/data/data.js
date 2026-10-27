// DATA — 2.DL.B.3, 2.DL.B.4; Grade 3 level-ups 3.DL.B.3, 3.DL.B.4.
(function () {
  const { tag, missMap } = MQ;
  const SETS = [
    ['Favorite fruit', ['Apples', 'Bananas', 'Grapes', 'Pears'], '🍎', 'students chose'],
    ['Pets at home', ['Dogs', 'Cats', 'Fish', 'Birds'], '🐾', 'students have'],
    ['Favorite sport', ['Soccer', 'Swim', 'Tennis', 'Biking'], '⚽', 'students chose'],
    ['Books read', ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], '📕', 'books were read on'],
    ['Birds we saw', ['Robins', 'Crows', 'Jays', 'Wrens'], '🐦', 'birds were'],
  ];
  // Random data: n categories, values from lo to hi in steps of `step`, all different.
  function makeData(n, lo, hi, step = 1) {
    const [title, labels, icon, verb] = U.pick(SETS);
    const vals = U.sample([...Array(Math.floor((hi - lo) / step) + 1)].map((_, i) => lo + i * step), n);
    return { title, icon, verb, cats: labels.slice(0, n).map((l, i) => [l, vals[i]]) };
  }
  const askOne = (D, i) => {
    const l = D.cats[i][0];
    if (D.verb.endsWith('on')) return `How many books were read on ${l}?`;
    if (D.verb === 'birds were') return `How many ${l.toLowerCase()} were seen?`;
    return `How many ${D.verb} ${l.toLowerCase()}?`;
  };

  function readGraph() {
    const D = makeData(U.int(3, 4), 1, 9);
    const i = U.int(0, D.cats.length - 1), v = D.cats[i][1];
    const pic = U.pick([true, false]);
    const fig = pic ? Fig.picGraph(D.title, D.cats, D.icon, 1) : Fig.barGraph(D.title, D.cats, 1);
    const q = U.num(askOne(D, i), v, { fig, meta: { kind: 'pick', args: [D.cats.map((c) => c[1]), i] }, hint: pic ? 'Count the pictures in that row.' : 'Go to the top of the bar, then look across to the number.', why: `${D.cats[i][0]}: ${v}.` });
    q.miss = missMap(D.cats.filter((_, j) => j !== i).map((c) => [c[1], `That is ${c[0]}. Find the row or bar for ${D.cats[i][0]}.`]), v);
    return tag(q, '2.DL.B.4', 164, 'geometry');
  }
  function compareGraph(scale = 1) {
    const step = scale === 1 ? 1 : scale;
    const D = makeData(U.int(3, 4), step, scale === 1 ? 12 : scale * 9, step);
    const [i, j] = U.sample([...D.cats.keys()], 2);
    const a = D.cats[i][1], b = D.cats[j][1];
    const pic = scale > 1 && U.pick([true, false]);
    const fig = pic ? Fig.picGraph(D.title, D.cats, D.icon, scale) : Fig.barGraph(D.title, D.cats, scale);
    const kind = U.pick(['more', 'total', 'all']);
    if (kind === 'all') {
      const tot = D.cats.reduce((t, c) => t + c[1], 0);
      const q = U.num(`How many ${D.title.toLowerCase().includes('books') ? 'books' : 'in all'} are shown in the graph?`, tot, { fig, meta: { kind: 'sum', args: D.cats.map((c) => c[1]) }, hint: 'Add every bar (or row).', why: `${D.cats.map((c) => c[1]).join(' + ')} = ${tot}` });
      if (pic) q.miss = missMap([[tot / scale, `Each picture stands for ${scale}, so count by ${scale}s.`]], tot);
      return tag(q, scale > 1 ? '3.DL.B.3' : '2.DL.B.4', scale > 1 ? 196 : 182, 'geometry');
    }
    if (kind === 'more') {
      const [big, small] = a >= b ? [i, j] : [j, i];
      const d = Math.abs(a - b);
      const q = U.num(`How many more for ${D.cats[big][0]} than for ${D.cats[small][0]}?`, d, { fig, meta: { kind: 'diff', args: [a, b] }, hint: 'Find both numbers, then subtract the smaller from the bigger.', why: `${Math.max(a, b)} − ${Math.min(a, b)} = ${d}` });
      q.miss = missMap([[a + b, 'That is the total. "How many more" means subtract.'], ...(pic ? [[d / scale, `Each picture stands for ${scale}.`]] : [])], d);
      return tag(q, scale > 1 ? '3.DL.B.3' : '2.DL.B.4', scale > 1 ? 198 : 180, 'geometry');
    }
    const q = U.num(`How many for ${D.cats[i][0]} and ${D.cats[j][0]} together?`, a + b, { fig, meta: { kind: 'sum', args: [a, b] }, hint: 'Find both numbers, then add.', why: `${a} + ${b} = ${a + b}` });
    q.miss = missMap([[Math.abs(a - b), '"Together" means add.'], ...(pic ? [[(a + b) / scale, `Each picture stands for ${scale}.`]] : [])], a + b);
    return tag(q, scale > 1 ? '3.DL.B.3' : '2.DL.B.4', scale > 1 ? 195 : 176, 'geometry');
  }

  // ---------- Line plots ----------
  function plotData(den) {
    // Each used value gets 1–4 X marks (not uniform random picks), so "how many are N long" is not usually 1, and the
    // spread from shortest to longest varies.
    const min = U.int(1, 3), max = min + U.int(4, 6);
    const pts = [];
    for (let v = min; v <= max; v += 1 / den) pts.push(Math.round(v * den) / den);
    const inner = pts.slice(0, -1), k = den === 1 ? U.int(2, inner.length) : U.int(4, 6);
    const used = den === 1 && Math.random() < 0.5 ? inner.slice(U.int(0, inner.length - k)).slice(0, k) : U.sample(inner, Math.min(k, inner.length)).sort((a, b) => a - b);
    const vals = U.shuffle(used.flatMap((v) => Array(U.int(1, 4)).fill(v)));
    return { min, max, vals, pts };
  }
  const OBJ = [['pencils', 'Pencil lengths'], ['leaves', 'Leaf lengths'], ['crayons', 'Crayon lengths'], ['shells', 'Shell lengths']];
  const fracLabel = (v) => { const w = Math.floor(v), f = v - w; const p = f === 0.5 ? '½' : f === 0.25 ? '¼' : f === 0.75 ? '¾' : ''; return `${w || ''}${w && p ? ' ' : ''}${p}`.trim() || '0'; };
  const fracText = (v) => { const w = Math.floor(v), f = v - w; const p = f === 0.5 ? '1/2' : f === 0.25 ? '1/4' : f === 0.75 ? '3/4' : ''; return w && p ? `${w} ${p}` : p || String(w); };
  function plotCount(den) {
    const D = plotData(den), [obj, title] = U.pick(OBJ);
    const target = U.pick([...new Set(D.vals)]); // pick a value, not an X mark, so every count is equally likely
    const n = D.vals.filter((v) => v === target).length;
    const q = U.num(`The line plot shows the lengths of some ${obj}. How many ${obj} are ${den > 1 ? fracText(target) : target} inches long?`, n, { fig: Fig.linePlot(title, D.min, D.max, D.vals, den, 'inches'), meta: { kind: 'countVal', args: [D.vals, target] }, hint: `Find ${den > 1 ? fracLabel(target) : target} on the line. Count the X marks above it.`, why: `There ${n === 1 ? 'is 1 X' : `are ${n} X marks`} above ${den > 1 ? fracLabel(target) : target}.` });
    q.miss = missMap([[D.vals.length, `That is all the ${obj}. Count only the X marks above ${den > 1 ? fracLabel(target) : target}.`]], n);
    return tag(q, den > 1 ? '3.DL.B.4' : '2.DL.B.3', den > 1 ? 194 : 172, 'geometry');
  }
  // Make a line plot from a list of measurements (2.DL.B.3 says "show the measurements by making a line plot"):
  // tap each measurement, then tap the number it goes above.
  function plotBuild() {
    const [obj, title] = U.pick(OBJ), min = U.int(1, 3), vals = Array.from({ length: U.int(4, 6) }, () => U.int(min, min + 4)).sort((a, b) => a - b);
    if (new Set(vals).size < 3) return plotBuild();
    const marks = [min, min + 1, min + 2, min + 3, min + 4];
    return tag({ t: 'sort', q: `Jai measured some ${obj}: ${vals.map((v) => `${v} inches`).join(', ')}. Make a line plot: put each measurement above its number.`, bins: marks.map(String), items: vals.map((v) => ({ w: `${v} in`, b: marks.indexOf(v) })), fig: Fig.linePlot(title, min, min + 4, [], 1, 'inches'), meta: { kind: 'sortPlot', args: [] }, hint: 'Each measurement gets one X above its number on the line.', why: `One X above its number for each of the ${vals.length} ${obj}: ${vals.join(', ')}.` }, '2.DL.B.3', 176, 'geometry');
  }
  function plotCompare() {
    const D = plotData(1), [obj, title] = U.pick(OBJ);
    const lo = Math.min(...D.vals), hi = Math.max(...D.vals);
    if (hi === lo) return plotCompare();
    if (U.pick([true, false])) {
      const q = U.num(`How much longer is the longest ${{ leaves: 'leaf' }[obj] || obj.slice(0, -1)} than the shortest one?`, hi - lo, { unit: 'inches', fig: Fig.linePlot(title, D.min, D.max, D.vals, 1, 'inches'), meta: { kind: 'diff', args: [hi, lo] }, hint: 'Find the X farthest right and the X farthest left. Subtract.', why: `${hi} − ${lo} = ${hi - lo} inches` });
      q.miss = missMap([[hi, 'That is the longest one. Subtract the shortest.'], [D.max - D.min, 'Use the lengths that have X marks, not the ends of the line.']], hi - lo);
      return tag(q, '2.DL.B.3', 184, 'geometry');
    }
    const q = U.num(`How many ${obj} were measured in all?`, D.vals.length, { fig: Fig.linePlot(title, D.min, D.max, D.vals, 1, 'inches'), meta: { kind: 'size', args: [D.vals] }, hint: 'Each X is one object. Count all the X marks.', why: `There are ${D.vals.length} X marks.` });
    return tag(q, '2.DL.B.3', 176, 'geometry');
  }

  addSubject({
    id: 'data', name: 'Data', icon: '📊', color: 'c5', blurb: 'Bar graphs, picture graphs, and line plots.',
    skills: [
      { id: 'graphs', name: 'Bar & picture graphs', icon: '📊', levels: [
        { title: 'Read a graph', std: '2.DL.B.4', desc: 'Find the bar, read the number.', gen: () => U.mix(8, [readGraph]) },
        { title: 'Compare and combine', std: '2.DL.B.4', desc: 'How many more? How many in all?', gen: () => U.mix(8, [() => compareGraph(1)]) },
        { title: 'Scaled graphs', std: '3.DL.B.3', desc: 'Each picture can stand for 2 or 5.', gen: () => U.mix(8, [() => compareGraph(U.pick([2, 5])), () => compareGraph(U.pick([2, 5, 10]))]) },
      ] },
      { id: 'lineplot', name: 'Line plots', icon: '✖️', levels: [
        { title: 'Read and make a line plot', std: '2.DL.B.3', desc: 'Each X is one object.', gen: () => U.mix(8, [() => plotCount(1), () => plotCount(1), plotBuild]) },
        { title: 'Compare lengths', std: '2.DL.B.3', desc: 'Longest, shortest, how many.', gen: () => U.mix(8, [plotCompare]) },
        { title: 'Halves and quarters of an inch', std: '3.DL.B.4', desc: 'Lengths like 2 ½ inches.', gen: () => U.mix(8, [() => plotCount(U.pick([2, 4]))]) },
      ] },
    ],
  });
})();
