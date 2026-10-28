// Puzzle Peak's shared puzzle kit (borrowed by contest4 and contest8 as 'contest2:pzkit.js').
// Every problem is ORIGINAL: families of puzzle *patterns* that contests like Math Kangaroo, AMC 8, and MATHCOUNTS use
// (counting squares, balances, number pyramids, repeating patterns, calendars, heads-and-legs, handshakes, grid paths,
// painted cubes, last digits, …), filled with random numbers. No contest item is copied.
//
// A family is fam(d) → a "core" {q, a, why, fig, wrongs: [[value, why it is wrong]], meta, steps?, opts?}, where d is the
// difficulty 0–8 (0–2 ≈ the Grades 1–2 paper's 3/4/5-point questions, 3–5 ≈ Grades 3–4, 6–8 ≈ Grades 7–8 / AMC 8).
// The generator works the answer out one way; tools/validate.js recomputes it another way (usually brute force) from
// meta {kind: 'pz', args: [family, params]}. PZ.mc() turns a core into a 5-choice question, PZ.num() into a typed one
// (with step-by-step hints when the family gives steps: Summit Trail).
const PZ = (() => {
  const R = (lo, hi) => U.int(lo, hi);
  const pick = (a) => U.pick(a);
  const NAMES = ['Maya', 'Leo', 'Aarav', 'Sofia', 'Kenji', 'Zara', 'Omar', 'Lily', 'Diego', 'Ava', 'Noah', 'Priya', 'Mateo', 'Hana', 'Eli', 'Nia'];
  // A fixed set of name pairs (not any 2 of 16): each pair is a recorded voice line, and 240 pairs were too many to record.
  const PAIRS = [['Maya', 'Leo'], ['Aarav', 'Sofia'], ['Kenji', 'Zara'], ['Omar', 'Lily'], ['Diego', 'Ava'], ['Noah', 'Priya'], ['Mateo', 'Hana'], ['Eli', 'Nia']];
  const two = () => U.shuffle(pick(PAIRS).slice());
  const c = (n) => Number(n).toLocaleString('en-US');
  const pl = (n, w, ws = w + 's') => `${n} ${n === 1 ? w : ws}`;
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const frac = (n, d) => { const g = gcd(n, d); return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`; };
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const COLORS = { r: 'red', g: 'green', b: 'blue', y: 'yellow', p: 'purple' };
  const ord = (n) => `${n}${[11, 12, 13].includes(n % 100) ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`;
  const sq = (k) => `${k}-by-${k}`; // "2-by-2": clearer than 2 × 2 for young children
  const sing = (w) => w.replace(/s$/, '');
  const core = (fam, params, x) => ({ meta: { kind: 'pz', args: [fam, params] }, wrongs: [], ...x });

  // ---------- counting squares in a grid ----------
  const SQ = [[[2, 2], [2, 3], [3, 2], [2, 4], [4, 2]], [[3, 3], [2, 4], [4, 2], [3, 2], [2, 5]], [[3, 4], [2, 5]], [[3, 3], [3, 4]], [[4, 4], [3, 5]], [[4, 5], [5, 5]], [[5, 5], [4, 6]], [[5, 6], [6, 6]], [[6, 6], [6, 7]]];
  function squares(d) {
    const [a, b] = pick(SQ[d]), m = Math.min(a, b);
    const bySize = []; for (let k = 1; k <= m; k++) bySize.push((a - k + 1) * (b - k + 1));
    const total = bySize.reduce((s, v) => s + v, 0);
    if (m >= 2 && Math.random() < 0.35) { // one size only: "how many 2 × 2 squares?"
      const k = d <= 4 ? 2 : U.int(2, m), cnt = bySize[k - 1];
      return core('squares', [a, b, k], { q: `How many ${sq(k)} squares can you find in this ${a} by ${b} grid? (They may overlap.)`, a: cnt, fig: Fig.rect(b, a, { grid: true }),
        why: `A ${sq(k)} square fits in ${pl(b - k + 1, 'place')} across and ${pl(a - k + 1, 'place')} down: ${b - k + 1} × ${a - k + 1} = ${cnt}.`,
        wrongs: [[Math.floor(a / k) * Math.floor(b / k), 'The squares may overlap: slide the frame one square at a time.'], [a * b, 'That counts the small 1-by-1 squares.'], [cnt + 1, 'Check the last place the frame fits.'], [total, 'That counts every size.']],
        steps: [`Put a ${sq(k)} frame in the top-left corner.`, 'Slide it one square at a time to the right. How many places does it fit in a row?', 'How many rows of places are there? Multiply.'] });
    }
    const list = bySize.map((v, i) => `${sq(i + 1)} squares: ${v}`).join('; ');
    return core('squares', [a, b], {
      q: `How many squares of any size are in this ${a} by ${b} grid?`, a: total, fig: Fig.rect(b, a, { grid: true }),
      why: `Count by size: ${list}. In all: ${bySize.join(' + ')} = ${total}.`,
      wrongs: [[a * b, `That counts only the small 1-by-1 squares. Bigger squares are made of several small ones.`], [a * b + 1, 'That counts the small squares and the whole grid, but misses the middle sizes.'],
        [total - bySize[bySize.length - 1], `That misses the biggest squares (${sq(m)}).`], [total + 1, 'Check each size again: one square was counted twice.']],
      steps: [`Count the small 1-by-1 squares first: ${a} rows of ${b}.`, `Now count the 2-by-2 squares. Slide a 2-by-2 frame across a row: how many places does it fit? How many rows?`, m > 2 ? `Keep going with each bigger size, up to ${sq(m)}, and add all the sizes together.` : 'Add the two sizes together.'],
    });
  }
  // ---------- counting rectangles ----------
  const RC = [null, null, null, [[1, 4], [1, 5]], [[1, 6], [2, 2]], [[2, 3], [1, 7]], [[2, 4], [3, 3]], [[3, 4], [2, 5]], [[4, 4], [3, 5]]];
  function rects(d) {
    const [a, b] = pick(RC[Math.max(3, d)]), ca = (a * (a + 1)) / 2, cb = (b * (b + 1)) / 2, total = ca * cb;
    return core('rects', [a, b], {
      q: a === 1 ? `How many rectangles of any size are in this strip of ${b} squares? (A square counts as a rectangle.)` : `How many rectangles of any size are in this ${a} by ${b} grid? (Squares count too.)`,
      a: total, fig: Fig.rect(b, a, { grid: true }),
      why: a === 1 ? `A rectangle in the strip is picked by its left and right edges. There are ${b + 1} edge lines, and the number of ways to pick 2 of them is ${b + 1} × ${b} ÷ 2 = ${total}.`
        : `Pick 2 of the ${b + 1} up-and-down lines (${cb} ways) and 2 of the ${a + 1} side-to-side lines (${ca} ways). ${cb} × ${ca} = ${total}.`,
      wrongs: [[a * b, 'That counts only the small squares.'], [ca + cb, 'Add? No: every choice of left and right sides goes with every choice of top and bottom, so multiply.'], [total - 1, 'Did you leave out the whole grid itself?'], [b * (b + 1) * a, 'Pick the lines in pairs: the order of the two lines does not matter, so divide by 2.']],
      steps: [`A rectangle is fixed by its left side, right side, top, and bottom.`, `Count the ways to choose 2 of the ${b + 1} up-and-down lines.`, a === 1 ? 'There is only one top and one bottom, so that count is the answer.' : `Count the ways to choose 2 of the ${a + 1} side-to-side lines, then multiply the two counts.`],
    });
  }
  // ---------- cubes: stairs and boxes ----------
  function cubes(d) {
    if (d <= 1 && Math.random() < 0.6 || (d === 2 && Math.random() < 0.5)) {
      const k = d === 0 ? R(3, 5) : d === 1 ? R(4, 6) : R(5, 7), hs = Array.from({ length: k }, (_, i) => i + 1), total = (k * (k + 1)) / 2;
      return core('stairs', [hs], { q: `How many cubes are in this staircase?`, a: total, fig: Fig.cubeStack(hs),
        why: `Count column by column: ${hs.join(' + ')} = ${total}.`,
        wrongs: [[k, 'That counts the columns, not the cubes.'], [total - 1, 'Count every column, from 1 cube up to the tallest.'], [k * k, 'Not every column is full height: they go 1, 2, 3, …'], [total + k, 'Each column is counted once.']],
        steps: ['Count the cubes in each column, from left to right.', 'Add the columns together.'] });
    }
    const L = d <= 2 ? R(2, 3) : R(3, 5), W = d <= 2 ? 2 : R(2, 4), H = d === 0 ? R(1, 2) : d <= 2 ? 2 : R(2, 4), total = L * W * H;
    return core('box', [L, W, H], { q: `This box is built from small cubes with no gaps. How many small cubes are there?`, a: total, fig: Fig.prism(L, W, H),
      why: `One layer is ${L} × ${W} = ${L * W} cubes. There are ${pl(H, 'layer')}: ${L * W} × ${H} = ${total}.`,
      wrongs: [[L * W, 'That is only the top layer.'], [L + W + H, 'Multiply, do not add: count one layer, then the layers.'], [L * W * H - L * W, 'Count every layer, including the bottom one.'], [2 * (L * W + W * H + L * H), 'That counts the square faces on the outside, not the cubes.']],
      steps: ['Count the cubes in the top layer: rows times cubes in each row.', 'Count how many layers there are, then multiply.'] });
  }
  // ---------- repeating patterns ----------
  function beadsQ(d) {
    const k = d === 0 ? 2 : d <= 2 ? 3 : d <= 4 ? 4 : 5;
    // Counting puzzles name the colors aloud, so they use a few fixed 5-color orders (any order made 120 voice lines).
    const pat = d >= 5 ? pick([['r', 'b', 'y', 'g', 'p'], ['g', 'y', 'p', 'r', 'b'], ['b', 'p', 'r', 'y', 'g'], ['y', 'g', 'b', 'p', 'r']]).slice() : U.sample(['r', 'g', 'b', 'y', 'p'], k), N = d === 0 ? R(7, 12) : d === 1 ? R(10, 20) : d === 2 ? R(20, 40) : d <= 4 ? R(30, 99) : R(100, 300);
    const shown = pat.concat(pat).slice(0, k + Math.min(k, 3));
    if (d >= 5 && Math.random() < 0.5) {
      const col = pick(pat), per = Math.floor(N / k), extra = pat.slice(0, N % k).filter((x) => x === col).length, total = per + extra;
      return core('beadCount', [pat, N, col], { q: `A necklace repeats this pattern: ${pat.map((x) => COLORS[x]).join(', ')}, again and again. How many ${COLORS[col]} beads are among the first ${N}?`, a: total, fig: Fig.beads(shown, 1),
        why: `${N} ÷ ${k} = ${per} full patterns with ${N % k} left over. That gives ${per} ${COLORS[col]} beads${extra ? ` plus ${extra} in the leftover part` : ''}: ${total}.`,
        wrongs: [[per, 'Do not forget the beads left over after the full patterns.'], [per + 1, 'Check whether the leftover beads include that color.'], [Math.round(N / 2), 'Not half: only one bead in each pattern has that color.'], [N - per, 'That counts the other colors.']].filter(([v]) => v !== total),
        steps: [`The pattern has ${k} beads. How many full patterns fit in ${N} beads?`, 'Each full pattern has one bead of that color.', 'Look at the leftover beads at the end: are any of them that color?'] });
    }
    const ans = COLORS[pat[(N - 1) % k]];
    return core('bead', [pat, N], { q: `This string of beads repeats the same pattern. What color is bead number ${N}?`, a: ans, fig: Fig.beads(shown, 1),
      opts: Object.values(COLORS), why: `The pattern has ${k} beads. ${N} ÷ ${k} = ${Math.floor(N / k)} remainder ${N % k}, so bead ${N} is like bead ${((N - 1) % k) + 1} of the pattern: ${ans}.`,
      wrongs: [[COLORS[pat[N % k]], 'That is the next bead. Check the remainder again.'], [COLORS[pat[(N + k - 2) % k]], 'That is the bead just before.']],
      steps: [`How many beads are in one pattern? Count until it starts again.`, `Divide ${N} by the pattern length. The remainder tells where in the pattern bead ${N} falls.`] });
  }
  // ---------- calendars ----------
  function calendar(d) {
    const first = R(0, 6);
    if (d >= 4) {
      const n = d === 4 ? R(40, 70) : R(80, 200), ans = DAYS[(first + n - 1) % 7];
      return core('dayN', [first, n], { q: `Day 1 of a long school project is a ${DAYS[first]}. What day of the week is day ${n} of the project?`, a: ans, opts: DAYS, fig: Fig.calendar(first, 28, { 1: '★' }, 'Day 1 is starred'),
        why: `Every 7 days the weekday repeats. Day ${n} is ${n - 1} days after day 1, and ${n - 1} ÷ 7 = ${Math.floor((n - 1) / 7)} remainder ${(n - 1) % 7}. Count ${pl((n - 1) % 7, 'day')} on from ${DAYS[first]}: ${ans}.`,
        wrongs: [[DAYS[(first + n) % 7], 'Day 1 is the starting day, so count n − 1 days after it, not n.'], [DAYS[(first + n - 2) % 7], 'Check the remainder: count on one more day.']],
        steps: ['The days of the week repeat every 7 days.', `How many days after day 1 is day ${n}? Divide that by 7 and look at the remainder.`] });
    }
    const days = R(28, 31), n = d === 0 ? R(8, 14) : d === 1 ? R(15, 22) : R(23, days), ans = DAYS[(first + n - 1) % 7];
    return core('dayOf', [first, n], { q: `In this month, the 1st is a ${DAYS[first]}. What day of the week is the ${ord(n)}?`, a: ans, opts: DAYS, fig: Fig.calendar(first, days, { [n]: '?' }),
      why: `Every 7 days the weekday comes back. The ${[1, 8, 15, 22, 29].filter((x) => x <= n).map(ord).join(', ').replace(/, ([^,]*)$/, ' and $1')} are all ${DAYS[first]}s. Count on from there to the ${ord(n)}: ${ans}.`,
      wrongs: [[DAYS[(first + n) % 7], 'Count again: the 1st is day one, so you count n − 1 days after it.'], [DAYS[(first + n - 2) % 7], 'Count on one more day.']],
      steps: [`The 1st, 8th, 15th, 22nd and 29th are all the same weekday. Why?`, `Find the one of those just before the ${ord(n)}, then count on.`] });
  }
  // ---------- balances ----------
  // Fruit are drawn as emoji in the pictures but NAMED in the words, so the narrator can read every sentence.
  const FRUIT = ['🍎', '🍐', '🍊', '🍋', '🍓', '🥝'];
  const FN = { '🍎': ['apple', 'apples'], '🍐': ['pear', 'pears'], '🍊': ['orange', 'oranges'], '🍋': ['lemon', 'lemons'], '🍓': ['strawberry', 'strawberries'], '🥝': ['kiwi', 'kiwis'] };
  const fw = (e, n = 1) => FN[e][n === 1 ? 0 : 1];
  function balanceQ(d) {
    const [X, Y, Z] = U.sample(FRUIT, 3), x1 = fw(X), y1 = fw(Y), z1 = fw(Z);
    if (d === 0) {
      const x = R(2, 6), k = R(2, 3), W = k * x;
      return core('bal1', [k, W], { q: `The scale is balanced. Each block weighs 1. How much does one ${x1} weigh?`, a: x, fig: Fig.balance(Array(k).fill(X), [String(W)]),
        why: `${k} ${fw(X, k)} weigh ${W}, so one weighs ${W} ÷ ${k} = ${x}.`, wrongs: [[W, `That is what all ${k} weigh together.`], [W - k, 'Share the weight equally: divide.'], [x + 1, 'Check: does it balance?']],
        steps: [`${k} ${fw(X, k)} weigh ${W} in all.`, 'Share the weight equally among them.'] });
    }
    if (d <= 2) {
      const x = R(2, 5), k1 = R(2, 3), m = d === 1 ? 1 : R(1, 2), n = R(2, 3) * m, y = (n * x) / m;
      return core('bal2', [k1, k1 * x, m, n], { q: `Both scales are balanced. How much does one ${y1} weigh?`, a: y,
        fig: Fig.pair(Fig.balance(Array(k1).fill(X), [String(k1 * x)]), Fig.balance(Array(m).fill(Y), Array(n).fill(X))),
        why: `First scale: ${k1} ${fw(X, k1)} weigh ${k1 * x}, so one ${x1} weighs ${x}. Second scale: ${m === 1 ? `one ${y1} weighs` : `${m} ${fw(Y, m)} weigh`} the same as ${n} ${fw(X, n)}, which is ${n * x}${m === 1 ? '' : `, so one ${y1} weighs ${n * x} ÷ ${m}`}. One ${y1} weighs ${y}.`,
        wrongs: [[x, `That is one ${x1}. Use the second scale too.`], [n * x, `That is ${m} ${fw(Y, m)} together.`], [n, `That counts the ${fw(X, 2)}, not their weight.`], [k1 * x, `That is the first scale's weight.`]].filter(([v]) => v !== y),
        steps: [`Use the first scale to find what one ${x1} weighs.`, `On the second scale, swap each ${x1} for its weight.`, m === 1 ? `Now read off what one ${y1} weighs.` : `That is the weight of ${m} ${fw(Y, m)}. Share it.`] });
    }
    if (d <= 5) {
      const x = R(2, 9), y = R(2, 9) + (d >= 4 ? R(0, 6) : 0), S = x + y, T = 2 * x + y, askY = d >= 4 && Math.random() < 0.5;
      const fig = Fig.pair(Fig.balance([X, Y], [String(S)]), Fig.balance([X, X, Y], [String(T)]));
      if (askY) return core('bal3', [S, T, 'y'], { q: `Both scales are balanced. How much does one ${y1} weigh?`, a: y, fig,
        why: `The second scale has one more ${x1} than the first and weighs ${T} − ${S} = ${x} more, so one ${x1} weighs ${x}. Then on the first scale, the ${y1} weighs ${S} − ${x} = ${y}.`,
        wrongs: [[x, `That is the ${x1}. One more step!`], [S, `That is the ${x1} and the ${y1} together.`], [T - x, 'Use the first scale for the last step.'], [y + 1, 'Check: does the first scale balance?']].filter(([v]) => v !== y && v > 0),
        steps: ['Compare the two scales. What is on the second one that is not on the first?', `That tells you what one ${x1} weighs.`, `Now use the first scale to find the ${y1}.`] });
      return core('bal3', [S, T], { q: `Both scales are balanced. How much does one ${x1} weigh?`, a: x, fig,
        why: `The second scale has one more ${x1} than the first, and it weighs ${T} − ${S} = ${x} more. So one ${x1} weighs ${x} (and the ${y1} weighs ${S} − ${x} = ${y}).`,
        wrongs: [[y, `That is the ${y1}.`], [S, `That is the ${x1} and the ${y1} together.`], [T - x, 'Compare the two scales: what is different?'], [Math.round(T / 3), 'The fruits do not all weigh the same.']].filter(([v]) => v !== x && v > 0),
        steps: ['Compare the two scales. What is on the second one that is not on the first?', 'The extra weight on the second scale belongs to that extra fruit.'] });
    }
    const x = R(3, 15), y = R(3, 15), z = R(3, 15), S = x + y, T = y + z, Uu = x + z, all = x + y + z;
    const askAll = Math.random() < 0.5, facts = `An ${x1} and a ${y1} weigh ${S}, the ${y1} and a ${z1} weigh ${T}, and the ${x1} and the ${z1} weigh ${Uu}.`.replace(/\bAn ([^aeiou])/, 'A $1').replace(/\ba ([aeiou])/g, 'an $1');
    return core('bal4', [S, T, Uu, askAll ? 'all' : 'x'], { q: `${facts} ${askAll ? 'How much do all three fruits weigh together?' : `How much does the ${x1} weigh?`}`,
      a: askAll ? all : x, fig: Fig.table([['On the scale', 'Weight'], [`${X} + ${Y}`, String(S)], [`${Y} + ${Z}`, String(T)], [`${X} + ${Z}`, String(Uu)]], 'Three balanced scales'),
      why: `Put all three scales together: every fruit appears twice, so twice the weight of all three is ${S} + ${T} + ${Uu} = ${2 * all}, and all three weigh ${all}.${askAll ? '' : ` Then the ${x1} weighs ${all} − ${T} = ${x} (all three, minus the ${y1} and ${z1}).`}`,
      wrongs: askAll ? [[2 * all, 'Each fruit was counted twice: divide by 2.'], [S + T, 'Use all three scales.'], [all + 1, 'Check the addition.']] : [[all, 'That is all three fruits.'], [y, `That is the ${y1}.`], [z, `That is the ${z1}.`], [S - x + z, 'Subtract the right pair from the total.']].filter(([v]) => v !== x),
      steps: ['Add all three scales together. How many times does each fruit appear?', 'So the three totals add up to twice the weight of all three fruits.', askAll ? 'Halve it.' : `Now take away the scale that has no ${x1}.`] });
  }
  // ---------- number pyramids ----------
  const top = (row) => { let r = row; while (r.length > 1) r = r.slice(1).map((v, i) => v + r[i]); return r[0]; };
  const build = (row) => { const rows = [row]; while (rows[0].length > 1) rows.unshift(rows[0].slice(1).map((v, i) => v + rows[0][i])); return rows; };
  function pyramidQ(d) {
    const n = d <= 2 ? 3 : d <= 5 ? 4 : R(4, 5), hi = d <= 2 ? 9 : d <= 5 ? 12 : 20;
    const row = Array.from({ length: n }, () => R(1, hi)), T = top(row), rows = build(row);
    const blank = (rs) => rs.map((r, i) => (i === rs.length - 1 ? r.map(String) : r.map(() => '')));
    if (d === 0 || d === 3 || (d === 6 && Math.random() < 0.3)) {
      const shown = blank(rows); shown[0] = ['?'];
      return core('pyrTop', [row], { q: `Each brick is the sum of the two bricks under it. What number goes in the top brick?`, a: T, fig: Fig.pyramid(shown),
        why: `Work up row by row: ${rows.slice(0, -1).reverse().map((r) => r.join(', ')).join(' → ')}. The top is ${T}.`,
        wrongs: [[row.reduce((s, v) => s + v, 0), 'Adding the bottom row once is not enough: the middle bricks are used more than once.'], [T + row[1], 'Check each sum again.'], [T - row[0], 'Did you skip a brick?']].filter(([v]) => v !== T),
        steps: ['Fill in the row above the bottom: add each pair of neighbors.', 'Keep going up, one row at a time.'] });
    }
    // a missing bottom brick (the middle one at higher levels): work backward from the top
    const mi = d === 1 || d === 4 ? pick([0, n - 1]) : R(1, n - 2), shown = rows.map((r, i) => (i === rows.length - 1 ? r.map((v, j) => (j === mi ? '?' : String(v))) : i === 0 ? [String(T)] : r.map(() => '')));
    const w = (n === 3 ? [1, 2, 1] : n === 4 ? [1, 3, 3, 1] : [1, 4, 6, 4, 1])[mi];
    return core('pyrMiss', [row.map((v, j) => (j === mi ? null : v)), T], { q: `Each brick is the sum of the two bricks under it. The top brick is ${T}. What number is missing from the bottom row?`, a: row[mi], fig: Fig.pyramid(shown),
      why: `On the way up, the bottom bricks are counted ${(n === 3 ? '1, 2, 1' : n === 4 ? '1, 3, 3, 1' : '1, 4, 6, 4, 1')} times (left to right). The known bricks give ${T - w * row[mi]} of the top. That leaves ${T} − ${T - w * row[mi]} = ${w * row[mi]}${w === 1 ? ', which is the missing brick itself' : `, which is ${w} times the missing brick`}: ${row[mi]}. Check by filling the pyramid in.`,
      wrongs: [[T - row.reduce((s, v, j) => s + (j === mi ? 0 : v), 0), 'The top is not just the sum of the bottom row: middle bricks count more than once.'], [w * row[mi], `That is how much the missing brick adds to the top, not the brick itself.`], [row[mi] + 1, 'Check by filling the pyramid in.'], [row[mi] + 2, 'Check by filling the pyramid in.']].filter(([v]) => v !== row[mi] && v > 0),
      steps: ['Try a number in the empty brick and fill the pyramid in. Is the top too big or too small?', `Each bottom brick is counted ${n === 3 ? '1, 2, 1' : n === 4 ? '1, 3, 3, 1' : '1, 4, 6, 4, 1'} times in the top. How much do the known bricks give?`, w === 1 ? 'What is left must be the missing brick.' : `What is left is the missing brick counted ${w} times.`] });
  }
  // ---------- digits ----------
  const perms = (ds, k) => { const out = []; const go = (cur, left) => { if (cur.length === k) { out.push(cur); return; } left.forEach((x, i) => go([...cur, x], left.filter((_, j) => j !== i))); }; go([], ds); return out; };
  function digitsQ(d) {
    const zero = d >= 2 && Math.random() < 0.5, ds = U.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], zero ? 2 : 3).concat(zero ? [0] : []);
    const k = d === 0 ? 2 : 3, nums = perms(ds, k).filter((p) => p[0] !== 0).map((p) => +p.join('')), mx = Math.max(...nums), mn = Math.min(...nums);
    const kind = d === 0 ? 'max2' : d === 1 ? pick(['max', 'min']) : d === 2 ? 'min' : d <= 4 ? 'diff' : pick(['count', 'diff']);
    const list = ds.join(', ');
    if (kind === 'count') return core('digCount', [ds, k], { q: `How many different ${k}-digit numbers can you make with the digits ${list}, using each digit at most once? (A number cannot start with 0.)`, a: nums.length, fig: Fig.picture(ds.map((x) => ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'][x])),
      why: `${zero ? `The first digit can be any of the 2 that are not 0, then 2 choices, then 1: 2 × 2 × 1 = ${nums.length}.` : `3 choices for the first digit, 2 for the second, 1 for the last: 3 × 2 × 1 = ${nums.length}.`}`,
      wrongs: [[6, 'A number cannot start with 0.'], [9, 'Each digit is used at most once.'], [3, 'Each digit can go in more than one place.'], [27, 'Each digit is used at most once.']].filter(([v]) => v !== nums.length),
      steps: ['Pick the first digit. How many choices are there?', 'Then the second digit, then the last. Multiply the numbers of choices.'] });
    const ans = kind === 'max' || kind === 'max2' ? mx : kind === 'min' ? mn : mx - mn;
    return core('dig', [ds, k, kind], { q: kind === 'diff' ? `Using each of the digits ${list} once, make the largest and the smallest ${k}-digit numbers. What is their difference?${zero ? ' (A number cannot start with 0.)' : ''}` : `Using the digits ${list}, each at most once, what is the ${kind === 'min' ? 'smallest' : 'largest'} ${k}-digit number you can make?${zero && kind === 'min' ? ' (A number cannot start with 0.)' : ''}`,
      a: ans, fig: Fig.picture(ds.map((x) => ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'][x])),
      why: kind === 'diff' ? `Largest: biggest digits first, ${mx}. Smallest: smallest digit that is not 0 first, ${mn}. ${mx} − ${mn} = ${ans}.` : kind === 'min' ? `Put the smallest digit first${zero ? ' (but not 0)' : ''}, then the rest from smallest to largest: ${mn}.` : `Put the biggest digit first, then the next biggest: ${mx}.`,
      wrongs: kind === 'diff' ? [[mx - +[...ds].sort((a, b) => a - b).join('').slice(0, k), 'A number cannot start with 0.'], [mx + mn, 'Difference means subtract.'], [mx - mn - 10, 'Check the subtraction.'], [mx - mn + 9, 'Check the subtraction.']]
        : kind === 'min' ? [[mx, 'That is the largest.'], [+[...ds].sort((a, b) => a - b).slice(0, k).reverse().join(''), 'Smallest digit goes FIRST.'], [mn + 9, 'Try the digits in other orders.'], [+[...ds].sort((a, b) => b - a).slice(-k).join(''), 'Use the smallest digits.']]
          : [[mn, 'That is the smallest.'], [+[...ds].sort((a, b) => a - b).slice(-k).join(''), 'Biggest digit goes FIRST.'], [+[...ds].sort((a, b) => b - a).slice(0, k).reverse().join(''), 'Put the biggest digit in the biggest place.'], [mx - 1, 'Try the digits in every order.']],
      steps: ['The leftmost place is worth the most.', kind === 'diff' ? 'Build the largest number, then the smallest one, then subtract.' : 'Decide which digit goes there first.'] });
  }
  // How many numbers have digits that add up to s?
  function digitSumQ(d) {
    const three = d >= 6, s = three ? R(4, 12) : R(5, 13);
    let n = 0; if (three) { for (let a = 1; a <= 9; a++) for (let b = 0; b <= 9; b++) { const cc = s - a - b; if (cc >= 0 && cc <= 9) n++; } } else { for (let a = 1; a <= 9; a++) { const b = s - a; if (b >= 0 && b <= 9) n++; } }
    return core('digSum', [three ? 3 : 2, s], { q: `How many ${three ? 'three' : 'two'}-digit numbers have digits that add up to ${s}?`, a: n, fig: Fig.table(three ? [['hundreds', 'tens', 'ones'], ['a', 'b', 'c'], ['a + b + c', '=', String(s)]] : [['tens', 'ones'], ['a', 'b'], ['a + b', `= ${s}`]]),
      why: three ? `Make an organized list by the hundreds digit: for each first digit a from 1 to 9, count the pairs (b, c) of digits with b + c = ${s} − a. In all: ${n}.` : `List them by the tens digit: ${Array.from({ length: 9 }, (_, i) => i + 1).filter((a) => s - a >= 0 && s - a <= 9).map((a) => `${a}${s - a}`).join(', ')}. That is ${n}.`,
      wrongs: [[n + 1, s <= 9 ? 'A two-digit number cannot start with 0.' : 'Each digit is at most 9.'], [n - 1, 'Check the ends of your list.'], [s, 'Not every split of the sum works: digits go from 0 to 9.'], [2 * n, 'Each number was counted once.']].filter(([v]) => v !== n && v > 0),
      steps: ['Make an organized list. Start with the smallest possible first digit.', 'Remember: digits go from 0 to 9, and the first digit cannot be 0.', 'Count your list.'] });
  }
  // How many digits to number the pages 1 to n?
  function pagesQ(d) {
    const n = d <= 5 ? R(15, 99) : R(100, 400);
    let t = 0; for (let p = 1; p <= n; p++) t += String(p).length;
    const f = n < 100 ? `9 one-digit pages (9 digits) and ${n - 9} two-digit pages (${2 * (n - 9)} digits)` : `9 one-digit pages, 90 two-digit pages (180 digits), and ${n - 99} three-digit pages (${3 * (n - 99)} digits)`;
    return core('pages', [n], { q: `A book has pages numbered 1 to ${n}. How many digits are printed in all the page numbers?`, a: t, fig: Fig.picture(['📖'], `pages 1 to ${n}`),
      why: `${f}: 9 + ${n < 100 ? 2 * (n - 9) : `180 + ${3 * (n - 99)}`} = ${t}.`,
      wrongs: [[n, 'That counts pages, not digits.'], [n < 100 ? 2 * n : 3 * n, 'Pages 1 to 9 have only one digit each.'], [t - 9, 'Count pages 1 to 9 as well.'], [t + (n < 100 ? 2 : 3), 'Check where each group of pages ends.']].filter(([v]) => v !== t),
      steps: ['Split the pages into groups: one-digit pages, two-digit pages, three-digit pages.', 'Count the pages in each group, then the digits they use.', 'Add the groups.'] });
  }
  // ---------- heads and legs ----------
  function legsQ(d) {
    const pair = d <= 2 ? pick([['bikes', 'trikes', 2, 3, '🚲', '🛺'], ['chickens', 'dogs', 2, 4, '🐔', '🐕']]) : pick([['chickens', 'dogs', 2, 4, '🐔', '🐕'], ['bikes', 'cars', 2, 4, '🚲', '🚗'], ['spiders', 'beetles', 8, 6, '🕷️', '🪲']]);
    const [A, B, la, lb, ea, eb] = pair, total = d === 0 ? R(3, 4) : d <= 2 ? R(4, 7) : d <= 5 ? R(8, 20) : R(20, 60), nb = R(1, total - 1), na = total - nb, L = na * la + nb * lb;
    const unit = A === 'bikes' ? 'wheels' : 'legs';
    return core('legs', [total, la, lb, L], { q: `A ${A === 'bikes' ? 'yard' : 'farm'} has ${total} ${A} and ${B} in all, with ${L} ${unit}. How many ${B} are there?`, a: nb, fig: Fig.picture([ea, eb], `${total} in all · ${L} ${unit}`),
      why: `Pretend all ${total} are ${A}: that is ${total * la} ${unit}. The real count, ${L}, is ${Math.abs(L - total * la)} ${L > total * la ? 'more' : 'fewer'}. Swapping one ${sing(A)} for one ${sing(B)} changes the count by ${Math.abs(lb - la)}. So there are ${Math.abs(L - total * la)} ÷ ${Math.abs(lb - la)} = ${nb} ${nb === 1 ? sing(B) : B} (and ${na} ${na === 1 ? sing(A) : A}). Check: ${na} × ${la} + ${nb} × ${lb} = ${L}.`,
      wrongs: [[na, `That is the number of ${A}.`], [Math.round(L / lb), `Not all of them are ${B}.`], [L - total * la, `That is the extra ${unit}. Each of the ${B} adds more than one.`], [nb + 1, 'Check: count the ' + unit + ' again.']].filter(([v]) => v !== nb && v > 0),
      steps: [`Pretend every one of the ${total} is one of the ${A}. How many ${unit} would that be?`, `How far off is that? Each ${sing(B)} you swap in changes it by ${Math.abs(lb - la)}.`, 'So how many of them must there be? Check your answer.'] });
  }
  // ---------- ages ----------
  function agesQ(d) {
    const [p1, p2] = two();
    if (d <= 2) {
      const a = R(5, 9), dif = R(2, 5), t = R(2, 6), b = a + dif;
      return core('age1', [a, dif, t], { q: `${p1} is ${a} years old. ${p2} is ${dif} years older than ${p1}. How old will ${p2} be in ${t} years?`, a: b + t, fig: Fig.picture(['🎂', '➕'], `${a} · +${dif} · in ${t} years`),
        why: `${p2} is ${a} + ${dif} = ${b} now. In ${t} years: ${b} + ${t} = ${b + t}.`, wrongs: [[b, `That is ${p2}'s age now.`], [a + t, `That is ${p1}'s age then.`], [b + t + 1, 'Check the adding.'], [a + dif - t, 'In the future means add.']].filter(([v]) => v !== b + t),
        steps: [`First find ${p2}'s age now.`, `Then add ${t} years.`] });
    }
    const y = d <= 5 ? R(3, 9) : R(6, 15), k = d <= 5 ? 2 : pick([2, 3]), t = R(2, 12), x = k * (y + t) - t;
    return core('ageTimes', [x, y, k], { q: `${p1} is ${x} and ${p2} is ${y}. In how many years will ${p1} be ${k === 2 ? 'twice' : 'three times'} as old as ${p2}?`, a: t, fig: Fig.table([['Years from now', '0', '…', '?'], [p1, String(x), '…', ''], [p2, String(y), '…', '']]),
      why: `The age difference is always ${x} − ${y} = ${x - y}. When ${p1} is ${k === 2 ? 'twice' : 'three times'} as old as ${p2}, that difference is ${k === 2 ? `the same as ${p2}'s age` : `2 times ${p2}'s age`}, so ${p2} will be ${(x - y) / (k - 1)}. That is ${(x - y) / (k - 1)} − ${y} = ${t} years from now. Check: ${x + t} = ${k} × ${y + t}.`,
      wrongs: [[x - k * y, k === 2 ? 'Close! Check: is the age then really twice?' : 'Both ages grow by the same number of years.'], [t + 1, 'Check with the table.'], [Math.abs(x - y), 'That is the age difference, which never changes.'], [t * 2, 'Check: both of them get older.']].filter(([v]) => v !== t && v > 0),
      steps: [`Both ${p1} and ${p2} get one year older each year, so the difference ${x - y} stays the same.`, `Make a table: years from now, ${p1}'s age, ${p2}'s age. When is the first age ${k === 2 ? 'twice' : 'three times'} the second?`] });
  }
  // ---------- handshakes and games ----------
  function handshakeQ(d) {
    const n = d <= 4 ? R(4, 7) : d === 5 ? R(6, 10) : R(8, 20), twice = d >= 6 && Math.random() < 0.4, games = (n * (n - 1)) / 2 * (twice ? 2 : 1);
    return core('hand', [n, twice ? 2 : 1], { q: twice ? `In a chess club, each of the ${n} players plays every other player twice. How many games are played?` : `${n} friends meet, and each one shakes hands with every other friend once. How many handshakes are there?`, a: games, fig: Fig.picture(['🤝'], `${n} ${twice ? 'players' : 'friends'}`),
      why: `Each person meets the other ${n - 1}. That counts every ${twice ? 'pair' : 'handshake'} twice (once for each person), so there are ${n} × ${n - 1} ÷ 2 = ${(n * (n - 1)) / 2}${twice ? `, and twice that many games: ${games}` : ''}.`,
      wrongs: [[n * (n - 1) * (twice ? 2 : 1), 'Each handshake was counted twice, once for each person.'], [n * (twice ? 2 : 1), 'Each person shakes many hands.'], [((n - 1) * (n - 2)) / 2 * (twice ? 2 : 1), 'Check: count everyone.'], [(n * (n + 1)) / 2 * (twice ? 2 : 1), 'Nobody shakes their own hand.']].filter(([v]) => v !== games),
      steps: ['The first person shakes hands with everyone else. How many?', 'The second person has already shaken the first person\'s hand. How many new handshakes?', `Keep going and add: (${n - 1}) + (${n - 2}) + … + 1.`] });
  }
  // ---------- making amounts with coins ----------
  function coinWaysQ(d) {
    const C = d <= 3 ? pick([20, 25, 30, 35]) : d <= 5 ? pick([40, 45, 50]) : pick([50, 60, 75]), withQ = d >= 4;
    const set = withQ ? [25, 10, 5] : [10, 5], ways = (amt, coins) => { if (!coins.length) return amt === 0 ? 1 : 0; let t = 0; for (let k = 0; k * coins[0] <= amt; k++) t += ways(amt - k * coins[0], coins.slice(1)); return t; };
    const w = ways(C, set);
    return core('coins', [C, set], { q: `How many different ways can you make ${C}¢ using only ${withQ ? 'quarters, dimes, and nickels' : 'dimes and nickels'}?`, a: w, fig: Fig.coins(withQ ? ['q', 'd', 'n'] : ['d', 'n']),
      why: `Make an organized list${withQ ? ' by the number of quarters, then dimes' : ' by the number of dimes'}; the nickels fill in the rest. There are ${w} ways.`,
      wrongs: [[w - 1, 'Did you leave out the way with no dimes (all nickels)?'], [w + 1, 'A way with a leftover that nickels cannot make does not count.'], [Math.floor(C / 5), 'That is the number of nickels in one way, not the number of ways.'], [w + 2, 'Check your list for repeats.']].filter(([v]) => v !== w && v > 0),
      steps: [withQ ? 'Start with the most quarters you can use, then fewer.' : 'Start with the most dimes you can use.', 'For each choice, the nickels make up the rest (if they can).', 'Count every line of your list.'] });
  }
  // ---------- grid paths ----------
  function pathsQ(d) {
    const [w, h] = pick(d <= 4 ? [[2, 1], [2, 2], [3, 1]] : d === 5 ? [[2, 3], [3, 2], [3, 3]] : d === 6 ? [[3, 3], [3, 4]] : d === 7 ? [[4, 4], [3, 5]] : [[4, 5], [5, 5]]);
    let p = 1; for (let i = 1; i <= h; i++) p = (p * (w + i)) / i;
    return core('paths', [w, h], { q: `Walking only along the streets, always right or up, how many different shortest paths go from A to B?`, a: p, fig: Fig.gridPath(w, h),
      why: `Write at each corner the number of ways to reach it: corners on the bottom edge and left edge get 1, and every other corner gets the number below it plus the number to its left. B gets ${p}.`,
      wrongs: [[w * h, 'That multiplies the sides; the paths can turn many times.'], [w + h, 'That is the length of each shortest path, not how many there are.'], [p - 1, 'Check the corners again: add the number below and the number to the left.'], [2 ** (w + h - 1), 'Not every choice is free: you must use exactly the right number of steps each way.']].filter(([v]) => v !== p && v > 0),
      steps: ['Every shortest path goes right ' + w + ' times and up ' + h + ' times.', 'Write a 1 at every corner on the bottom row and the left side: there is only one way to reach them.', 'Every other corner: add the number below it and the number to its left. Work toward B.'] });
  }
  // ---------- work backward ----------
  function backQ(d) {
    const ops = d <= 1 ? [pick([['add', R(3, 9)], ['sub', R(2, 5)]])] : d <= 3 ? [['add', R(2, 9)], ['mul', R(2, 3)]] : [['mul', R(2, 4)], ['add', R(3, 12)], pick([['half', 2], ['sub', R(2, 9)]])];
    const start = R(d <= 1 ? 6 : 3, d <= 1 ? 15 : 20);
    let v = start, ok = true;
    for (const [o, k] of ops) { v = o === 'add' ? v + k : o === 'sub' ? v - k : o === 'mul' ? v * k : v / 2; if (!Number.isInteger(v) || v < 0) ok = false; }
    if (!ok) return backQ(d); // every step must stay a whole number
    const words = { add: (k) => `add ${k}`, sub: (k) => `take away ${k}`, mul: (k) => `multiply by ${k}`, half: () => 'halve it' };
    const does = { add: (k) => `adds ${k}`, sub: (k) => `takes away ${k}`, mul: (k) => `multiplies it by ${k}`, half: () => 'halves it' };
    const undo = { add: (k) => `take away ${k}`, sub: (k) => `add ${k}`, mul: (k) => `divide by ${k}`, half: () => 'double it' };
    const [p1] = two();
    return core('back', [ops, v], { q: `${p1} thinks of a number, ${ops.map(([o, k]) => does[o](k)).join(', then ')}, and gets ${v}. What number did ${p1} start with?`, a: start, fig: Fig.picture(['🤔', '➡️', '❓'], ops.map(([o, k]) => words[o](k)).join(' → ') + ` → ${v}`),
      why: `Work backward from ${v}, undoing each step in reverse order: ${[...ops].reverse().map(([o, k]) => undo[o](k)).join(', then ')}. That gives ${start}. Check it forward.`,
      wrongs: [[ops.reduce((x, [o, k]) => (o === 'add' ? x - k : o === 'sub' ? x + k : o === 'mul' ? Math.round(x / k) : x * 2), v) === start ? start + 2 : ops.reduce((x, [o, k]) => (o === 'add' ? x - k : o === 'sub' ? x + k : o === 'mul' ? Math.round(x / k) : x * 2), v), 'Undo the steps in REVERSE order, starting with the last one.'], [start + 1, 'Check by doing the steps forward.'], [v, 'That is where the number ended up.'], [start + (ops[0][0] === 'add' ? ops[0][1] : 3), 'Check by doing the steps forward.']].filter(([v2]) => v2 !== start && v2 > 0),
      steps: [`Start at the end, ${v}.`, `Undo the last step first: the opposite of "${words[ops[ops.length - 1][0]](ops[ops.length - 1][1])}".`, 'Keep undoing steps until you reach the start. Then check it forward.'] });
  }
  // ---------- painted cube ----------
  function paintedQ(d) {
    const n = d <= 6 ? 3 : R(4, 5), k = pick([0, 1, 2, 3]);
    const f = [(n - 2) ** 3, 6 * (n - 2) ** 2, 12 * (n - 2), 8][k];
    return core('paint', [n, k], { q: `A ${n} × ${n} × ${n} cube made of small cubes is painted on the outside, then taken apart. How many small cubes have ${k === 0 ? 'no painted faces' : `exactly ${k} painted face${k === 1 ? '' : 's'}`}?`, a: f, fig: Fig.prism(n, n, n),
      why: [`Only the hidden inside cubes have no paint: a ${n - 2} × ${n - 2} × ${n - 2} block, ${f}.`, `One painted face: the middle of each of the 6 faces, ${n - 2} × ${n - 2} each: 6 × ${(n - 2) ** 2} = ${f}.`, `Two painted faces: along the 12 edges, not counting corners, ${n - 2} each: 12 × ${n - 2} = ${f}.`, 'Three painted faces: the 8 corners.'][k],
      wrongs: [[n ** 3 - f, 'That counts all the others.'], [[(n - 2) ** 3, 6 * (n - 2) ** 2, 12 * (n - 2), 8][(k + 1) % 4], 'That is a different number of painted faces.'], [[(n - 1) ** 3, 6 * n * n, 12 * n, 6][k], 'Corners and edges belong to more than one face: do not count them in the middle.'], [f + 1, 'Check the count.']].filter(([v]) => v !== f),
      steps: ['Where on the big cube does a small cube with that many painted faces sit: a corner, an edge, the middle of a face, or hidden inside?', 'Count how many such places the big cube has.', 'For edges and faces, leave out the corners and edges they share.'] });
  }
  // ---------- last digit of a power ----------
  function lastDigitQ() {
    const a = pick([2, 3, 4, 7, 8, 9, 12, 13, 17, 18, 19, 23, 27, 33]), n = R(12, 99), cyc = []; let x = a % 10; while (!cyc.includes(x)) { cyc.push(x); x = (x * a) % 10; }
    const L = cyc.length, ans = cyc[(n - 1) % L];
    return core('last', [a, n], { q: `What is the last digit of ${a}^${n}?`, a: ans, fig: Fig.table([['Power', `${a}^1`, `${a}^2`, `${a}^3`, `${a}^4`, `${a}^5`], ['Last digit', String(cyc[0]), String(cyc[1 % L]), '?', '?', '?']]),
      why: `The last digits repeat in a cycle of ${L}: ${cyc.join(', ')}. ${n} ÷ ${L} leaves remainder ${n % L}, so ${a}^${n} ends like ${a}^${((n - 1) % L) + 1}: ${ans}.`,
      wrongs: [[cyc[n % L], 'Check the remainder: the cycle starts at the first power.'], [(a * n) % 10, 'Powers multiply the number by itself; they do not multiply by the exponent.'], [a % 10, 'The last digit changes as the powers grow.'], [(ans + 2) % 10, 'Write out more powers to see the cycle.']].filter(([v]) => v !== ans),
      fill: () => R(0, 9),
      steps: ['Write the last digits of the first few powers.', 'They repeat. How long is the cycle?', `Divide ${n} by the cycle length and use the remainder.`] });
  }
  // ---------- number of factors ----------
  function divisorsQ(d) {
    const N = d <= 5 ? pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 50, 60, 72]) : pick([60, 72, 84, 90, 96, 100, 120, 144, 180, 200, 210, 240]);
    const f = []; for (let i = 1; i * i <= N; i++) if (N % i === 0) { f.push(i); if (i * i !== N) f.push(N / i); }
    f.sort((a, b) => a - b);
    return core('divs', [N], { q: `How many whole numbers divide ${N} exactly (with no remainder), counting 1 and ${N}?`, a: f.length, fig: Fig.table([['Factor pairs of ' + N], ...f.filter((x) => x * x <= N).slice(0, 2).map((x) => [`${x} × ${N / x}`]), ['…']]),
      why: `List factor pairs: ${f.filter((x) => x * x <= N).map((x) => `${x} × ${N / x}`).join(', ')}. That is ${f.length} factors.`,
      wrongs: [[f.length - 2, 'Count 1 and the number itself too.'], [f.length / 2 | 0, 'Each pair has two factors.'], [f.length + 1, Number.isInteger(Math.sqrt(N)) ? 'A square root pairs with itself: count it once.' : 'Check your pairs.'], [f.length - 1, 'Check your list of pairs.']].filter(([v]) => v !== f.length && v > 0),
      steps: ['Write factor pairs: 1 × ' + N + ', 2 × …, and so on.', 'Stop when the pairs start to repeat. Count every factor.'] });
  }
  // ---------- dice probability ----------
  function diceQ(d) {
    const atLeast = d >= 7 && Math.random() < 0.5, s = atLeast ? R(8, 11) : R(3, 11);
    let k = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (atLeast ? a + b >= s : a + b === s) k++;
    const ans = frac(k, 36);
    return core('dice', [s, atLeast ? 'ge' : 'eq'], { q: `Two fair dice are rolled. What is the probability that the sum is ${atLeast ? `at least ${s}` : s}?`, a: ans, fig: Fig.dice(R(1, 6), R(1, 6)),
      why: `There are 6 × 6 = 36 equally likely outcomes. ${k} of them give a sum ${atLeast ? `of ${s} or more` : `of ${s}`}, so the probability is ${k}/36 = ${ans}.`,
      wrongs: [[frac(1, 11), 'The 11 sums from 2 to 12 are not equally likely.'], [frac(k, 12), 'There are 36 outcomes, not 12.'], [frac(Math.max(1, k - 1), 36), 'List the pairs carefully: (1, 2) and (2, 1) are different outcomes.'], [frac(k + 1, 36), 'Check the list of pairs.'], [frac(k, 6), 'Two dice give 36 outcomes.']].filter(([v]) => v !== ans),
      steps: ['How many outcomes are there for two dice? Each die has 6 faces.', 'List the pairs that work. (1, 2) and (2, 1) are different.', 'Probability = pairs that work ÷ all pairs.'] });
  }
  // ---------- averages ----------
  function avgQ() {
    const k = R(3, 6), m = R(78, 88), m2 = m + R(1, 3), need = (k + 1) * m2 - k * m;
    if (need > 100) return avgQ();
    return core('avg', [k, m, m2], { q: `After ${k} tests, Kai's average is ${m}. What score on the next test raises the average to ${m2}?`, a: need, fig: Fig.table([['Tests', String(k), String(k + 1)], ['Average', String(m), String(m2)], ['Total', '?', '?']]),
      why: `Total so far: ${k} × ${m} = ${k * m}. Needed total: ${k + 1} × ${m2} = ${(k + 1) * m2}. Next score: ${(k + 1) * m2} − ${k * m} = ${need}.`,
      wrongs: [[m2, 'The new score must pull the whole average up.'], [m2 + (m2 - m), 'Each earlier test also needs raising: use totals.'], [need - (m2 - m), 'Use totals: average × number of tests.'], [need + 1, 'Check the totals.']].filter(([v]) => v !== need),
      steps: ['Average × number of tests = total. Find the total so far.', 'Find the total needed for the new average after one more test.', 'The next score is the difference.'] });
  }
  // ---------- consecutive numbers ----------
  function consecQ(d) {
    const k = d <= 5 ? pick([3, 5]) : pick([4, 5, 6, 7]), s0 = R(5, 40), S = k * s0 + (k * (k - 1)) / 2, big = s0 + k - 1;
    return core('consec', [k, S], { q: `${k} consecutive whole numbers add up to ${S}. What is the largest of them?`, a: big, fig: Fig.table([Array.from({ length: k }, () => '□'), ['sum', '=', String(S), ...Array(k - 3).fill('')]]),
      why: `The middle of the numbers is the average, ${S} ÷ ${k} = ${S / k}. They run from ${s0} to ${big}.`,
      wrongs: [[s0, 'That is the smallest one.'], [Math.round(S / k), k % 2 ? 'That is the middle one.' : 'Close: that is near the middle.'], [big + 1, 'Check: add them up.'], [big - 1, 'Check: add them up.']].filter(([v]) => v !== big),
      steps: ['Consecutive numbers are balanced around their middle.', `The middle is the average: ${S} ÷ ${k}.`, 'Count up from the middle to the largest.'] });
  }
  // ---------- polygon angles ----------
  function polygonQ() {
    const n = pick([5, 6, 8, 9, 10, 12, 15, 18, 20]), each = ((n - 2) * 180) / n, sum = (n - 2) * 180, askSum = Math.random() < 0.3;
    return core('poly', [n, askSum ? 'sum' : 'each'], { q: askSum ? `What is the sum of the inside angles of a polygon with ${n} sides (in degrees)?` : `Each inside angle of a regular polygon with ${n} sides measures how many degrees?`, a: askSum ? sum : each, fig: Fig.regular(n),
      why: askSum ? `A polygon with ${n} sides splits into ${n - 2} triangles from one corner: ${n - 2} × 180 = ${sum}.` : `The ${n} inside angles add to (${n} − 2) × 180 = ${sum}, so each is ${sum} ÷ ${n} = ${each}. (Or: each outside angle is 360 ÷ ${n} = ${360 / n}, and 180 − ${360 / n} = ${each}.)`,
      wrongs: askSum ? [[n * 180, 'From one corner you get n − 2 triangles, not n.'], [360, 'That is the sum of the OUTSIDE angles.'], [(n - 1) * 180, 'From one corner you get n − 2 triangles.']] : [[360 / n, 'That is each OUTSIDE angle.'], [180 / n * (n - 1) | 0, 'Use n − 2 triangles.'], [sum, 'That is all the angles together.'], [180 - 180 / n, 'Each outside angle is 360 ÷ n.']].filter(([v]) => v !== each && v > 0),
      steps: ['Split the polygon into triangles from one corner. How many triangles?', 'Each triangle has 180°.', askSum ? 'Multiply.' : 'In a regular polygon all the inside angles are equal: share the total.'] });
  }

  const FAM = { squares, rects, cubes, beads: beadsQ, calendar, balance: balanceQ, pyramid: pyramidQ, digits: digitsQ, digitSum: digitSumQ, pages: pagesQ, legs: legsQ, ages: agesQ,
    handshake: handshakeQ, coinWays: coinWaysQ, paths: pathsQ, back: backQ, painted: paintedQ, lastDigit: lastDigitQ, divisors: divisorsQ, dice: diceQ, avg: avgQ, consec: consecQ, polygon: polygonQ };
  // Families whose answer is a number (usable as a typed answer: Sprint-style contests and Summit Trail).
  const NUMERIC = (cr) => /^\d+$/.test(String(cr.a));

  // A whole-number filler distractor near the answer (never negative, never equal to it).
  const near = (a) => () => Math.max(1, a + U.pick([-3, -2, -1, 1, 2, 3, 4, 5, 10]));
  // 5-choice multiple choice (as on the contests), wrong choices from real mistakes first.
  function mc(fam, d, extra = {}) {
    const cr = FAM[fam](d);
    const base = { meta: cr.meta, fig: cr.fig, why: cr.why, hint: cr.steps ? cr.steps[0] : undefined, ...extra };
    if (cr.opts) { // word answers (colors, weekdays): five fixed choices including the answer
      const pool = U.shuffle(cr.opts.filter((o) => o !== cr.a));
      const miss = {}; cr.wrongs.forEach(([v, w]) => { if (v !== cr.a && cr.opts.includes(v) && !(v in miss)) miss[v] = w; });
      const others = [...Object.keys(miss), ...pool.filter((o) => !(o in miss))].slice(0, 4);
      const q = { t: 'mc', q: cr.q, a: cr.a, opts: U.shuffle([cr.a, ...others]), miss: Object.fromEntries(Object.entries(miss).filter(([k]) => others.includes(k))), ...base };
      return q;
    }
    const isFrac = /\//.test(String(cr.a));
    return U.mcMiss(cr.q, cr.a, cr.wrongs, base, 4, cr.fill || (isFrac ? () => frac(R(1, 11), 36) : near(+cr.a)));
  }
  // Typed answer with step-by-step hints (Summit Trail and Sprint-style).
  function num(fam, d, extra = {}) {
    let cr = FAM[fam](d), guard = 0;
    while (!NUMERIC(cr) && guard++ < 20) cr = FAM[fam](d);
    const miss = Object.fromEntries(cr.wrongs.filter(([v, w]) => w && String(v) !== String(cr.a) && /^\d+$/.test(String(v))).map(([v, w]) => [String(v), w]));
    return U.num(cr.q, cr.a, { keys: 'int', meta: cr.meta, fig: cr.fig, why: cr.why, steps: cr.steps, miss, ...extra });
  }
  return { FAM, mc, num, NUMERIC, DAYS, COLORS };
})();

// Contest data helper: each Puzzle Peak app lists its skills as {id, name, icon, levels: [[[family, d], ...] × 3]}.
// Practice rounds use 5-choice questions (contest skills) or typed answers with hints (Summit Trail); the practice
// contest (core/modes/contest.js) draws from the contest skills: tier 0/1/2 = level 1/2/3.
const PZAPP = {
  addContest(subject, skills, lessonsStd) {
    addSubject({ ...subject, skills: skills.map((k) => ({ id: k.id, name: k.name, icon: k.icon, levels: k.levels.map((fams, l) => ({ title: k.titles[l], std: lessonsStd[k.id][l], desc: k.descs[l],
      gen: () => U.mix(8, fams.map(([f, d]) => () => Object.assign(PZ.mc(f, d), { where: `${k.id}.${l}` }))) })) })) });
    PZAPP.contest.push(...skills);
  },
  addTrail(subject, skills, lessonsStd) {
    addSubject({ ...subject, skills: skills.map((k) => ({ id: k.id, name: k.name, icon: k.icon, levels: k.levels.map((fams, l) => ({ title: k.titles[l], std: lessonsStd[k.id][l], desc: k.descs[l],
      gen: () => U.mix(6, fams.map(([f, d]) => () => Object.assign(PZ.num(f, d), { where: `${k.id}.${l}` }))) })) })) });
  },
  contest: [],
};
// What core/modes/contest.js asks for.
const CONTEST = {
  // families that cannot be typed (word or fraction answers) are left out of typed contests
  fams: (k, tier, typed) => (k.levels[tier] || []).filter(([f]) => !typed || !['beads', 'calendar', 'dice'].includes(f)),
  skills: (tier, typed) => PZAPP.contest.filter((k) => CONTEST.fams(k, tier, typed).length),
  draw(tier, typed) {
    const ks = CONTEST.skills(tier, typed), k = U.pick(ks);
    const fams = CONTEST.fams(k, tier, typed);
    if (!fams.length) return null;
    const [f, d] = U.pick(fams);
    const q = typed ? PZ.num(f, d) : PZ.mc(f, d);
    if (typed) { delete q.steps; } // no hints during a contest
    return Object.assign(q, { where: `${k.id}.${tier}` });
  },
};

// "Watch first" lessons: one per puzzle family (the strategy), each with a worked example and a picture. A level's
// lesson is the lesson of its first family (an app may override any of them in LESSONS).
const LESSONS = {};
const PZLESSON = {
  squares: { rule: 'Count squares by SIZE: first the small ones, then the 2-by-2 ones, then bigger. A frame of each size slides one square at a time.', ex: '3 by 3 grid: 9 small + 4 two-by-two + 1 big = 14 squares', fig: () => Fig.rect(3, 3, { grid: true }) },
  rects: { rule: 'A rectangle is fixed by two up-and-down lines and two side-to-side lines. Count the ways to pick each pair, then multiply.', ex: 'A strip of 4 squares has 5 lines: 5 × 4 ÷ 2 = 10 rectangles', fig: () => Fig.rect(4, 1, { grid: true }) },
  cubes: { rule: 'Count cubes in an organized way: column by column, or one layer at a time. Hidden cubes count too!', ex: 'Staircase 1 + 2 + 3 + 4 = 10 cubes · box 3 × 2 × 2: one layer 6, two layers 12', fig: () => Fig.cubeStack([1, 2, 3, 4]) },
  beads: { rule: 'Find the part that repeats. Divide by its length: the remainder tells you where you land in the pattern.', ex: 'red, blue, green, red, blue, green… bead 14: 14 ÷ 3 = 4 remainder 2 → like bead 2: blue', fig: () => Fig.beads(['r', 'b', 'g', 'r', 'b', 'g'], 1) },
  calendar: { rule: 'Weekdays repeat every 7 days. Jump by 7s, then count the few days left.', ex: 'The 1st is a Monday → the 8th, 15th, 22nd, 29th are Mondays → the 17th is a Wednesday', fig: () => Fig.calendar(1, 30, { 17: '?' }) },
  balance: { rule: 'A balanced scale means both sides weigh the same. Swap things for what they weigh, and compare two scales to see what is different.', ex: 'apple + pear = 9 and apple + apple + pear = 13 → the extra apple weighs 13 − 9 = 4', fig: () => Fig.pair(Fig.balance(['🍎', '🍐'], ['9']), Fig.balance(['🍎', '🍎', '🍐'], ['13'])) },
  pyramid: { rule: 'Each brick is the sum of the two bricks under it. Work up to find the top, or work backward (try a number, then adjust) to find a missing brick.', ex: 'Bottom 2, 5, 3 → middle 7, 8 → top 15', fig: () => Fig.pyramid([['15'], ['7', '8'], ['2', '5', '3']]) },
  digits: { rule: 'The leftmost digit is worth the most. For the largest number put the biggest digit first; for the smallest, the smallest digit (but never 0) first.', ex: 'Digits 4, 0, 7: largest 740, smallest 407', fig: () => Fig.picture(['4️⃣', '0️⃣', '7️⃣']) },
  digitSum: { rule: 'Make an organized list: start with the smallest first digit and go up. Digits go from 0 to 9, and the first digit is never 0.', ex: 'Two-digit numbers with digit sum 5: 14, 23, 32, 41, 50 → 5 numbers', fig: () => Fig.table([['tens', 'ones'], ['1', '4'], ['2', '3'], ['…', '…']]) },
  pages: { rule: 'Group the pages by how many digits their numbers have: 1–9, 10–99, 100–999. Count each group.', ex: 'Pages 1 to 30: 9 one-digit + 21 two-digit pages (42 digits) = 51 digits', fig: () => Fig.picture(['📖'], 'pages 1 to 30') },
  legs: { rule: 'Pretend they are all the same kind. Count the legs (or wheels) that would give, then fix the difference: each swap changes the count by the same amount.', ex: '5 chickens and dogs, 14 legs: all chickens → 10 legs; 4 too few; each dog adds 2 → 2 dogs', fig: () => Fig.picture(['🐔', '🐕'], '5 animals · 14 legs') },
  ages: { rule: 'Everyone gets older at the same speed, so a difference in ages never changes. A table of "years from now" helps.', ex: 'Ana 20, Ben 6: in 8 years 28 and 14 → twice as old', fig: () => Fig.table([['Years from now', '0', '4', '8'], ['Ana', '20', '24', '28'], ['Ben', '6', '10', '14']]) },
  handshake: { rule: 'Count in order: the first person greets everyone else, the next person greets everyone not yet greeted, and so on. Or: n × (n − 1) ÷ 2.', ex: '5 friends: 4 + 3 + 2 + 1 = 10 handshakes', fig: () => Fig.picture(['🤝'], '4 + 3 + 2 + 1') },
  coinWays: { rule: 'List ways in order, starting with the most of the biggest coin. Let the smallest coin fill in the rest.', ex: '20¢ with dimes and nickels: 2 dimes · 1 dime + 2 nickels · 4 nickels → 3 ways', fig: () => Fig.coins(['d', 'd']) },
  paths: { rule: 'Write at every corner how many ways reach it: edge corners get 1, every other corner adds the number below and the number to the left.', ex: 'A 2 by 2 grid: 1, 1, 1 / 1, 2, 3 / 1, 3, 6 → 6 paths', fig: () => Fig.gridPath(2, 2) },
  back: { rule: 'Work backward: start at the end and undo each step in reverse order: adding is undone by taking away, multiplying by dividing. Then check forward.', ex: 'Think of a number, double it, add 5, get 17 → 17 − 5 = 12, 12 ÷ 2 = 6', fig: () => Fig.picture(['🤔', '➡️', '❓'], 'double → add 5 → 17') },
  painted: { rule: 'Small cubes with 3 painted faces sit at corners, 2 on edges, 1 in the middle of faces, 0 hidden inside.', ex: '3 × 3 × 3 cube: 8 corners, 12 edge cubes, 6 face centers, 1 hidden', fig: () => Fig.prism(3, 3, 3) },
  lastDigit: { rule: 'The last digits of powers repeat in a short cycle. Find the cycle, then use the remainder.', ex: '3, 9, 27, 81, 243 … last digits 3, 9, 7, 1 repeat → 3^10 ends in 9', fig: () => Fig.table([['Power', '3^1', '3^2', '3^3', '3^4'], ['Last digit', '3', '9', '7', '1']]) },
  divisors: { rule: 'List factors in pairs that multiply to the number. Stop when the pairs start to repeat.', ex: '36: 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6 → 9 factors', fig: () => Fig.array(4, 9) },
  dice: { rule: 'Two dice have 6 × 6 = 36 equally likely outcomes. Count the pairs that work, then divide by 36.', ex: 'Sum 4: (1, 3), (2, 2), (3, 1) → 3/36 = 1/12', fig: () => Fig.dice(1, 3) },
  avg: { rule: 'Average × number of values = total. Work with totals, not averages.', ex: '4 tests averaging 80 = 320 points; to average 82 after 5 tests you need 410 → score 90', fig: () => Fig.table([['Tests', '4', '5'], ['Average', '80', '82'], ['Total', '320', '410']]) },
  consec: { rule: 'Consecutive numbers are balanced around their middle, and the middle is the average (total ÷ how many).', ex: '5 numbers add to 60: middle 12 → 10, 11, 12, 13, 14', fig: () => Fig.table([['10', '11', '12', '13', '14']]) },
  polygon: { rule: 'From one corner, a polygon with n sides splits into n − 2 triangles of 180°. The outside angles of any polygon add to 360°.', ex: 'Hexagon: 4 triangles → 720°; each angle of a regular hexagon 720 ÷ 6 = 120°', fig: () => Fig.regular(6) },
};
PZAPP.lessonsFor = (skills, extra = {}) => { skills.forEach((k) => k.levels.forEach((fams, l) => { const key = `${k.id}.${l}`; if (!LESSONS[key]) LESSONS[key] = { ...(extra[key] || PZLESSON[fams[0][0]]) }; })); };
