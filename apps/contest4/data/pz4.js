// Puzzle Peak 4 content: puzzle families from contest2:pzkit.js at difficulty 3–5 (≈ the Grades 3–4 paper's 3-, 4-,
// and 5-point questions; 6 = a first taste of the next paper up).
// Standards: closest 2023 NJSLS-Mathematics code for the reasoning practiced (contest puzzles go beyond grade level).
(function () {
  const look = [
    { id: 'count4', name: 'Count it all', icon: '🔲', titles: ['Squares and boxes', 'Rectangles and paths', 'Every size'], descs: ['Squares by size, cubes by layer.', 'Pick two lines; count corner by corner.', 'Count without missing any.'],
      levels: [[['squares', 3], ['cubes', 3], ['rects', 3]], [['squares', 4], ['rects', 4], ['paths', 4]], [['squares', 5], ['rects', 5], ['paths', 5]]] },
    { id: 'cycle4', name: 'Patterns & calendars', icon: '📅', titles: ['Repeating patterns', 'Days far ahead', 'Big numbers, small cycles'], descs: ['Use the remainder.', 'Weekdays repeat every 7.', 'Count beads, days, and digits.'],
      levels: [[['beads', 3], ['calendar', 3]], [['beads', 4], ['calendar', 4], ['pages', 4]], [['beads', 5], ['calendar', 5], ['pages', 5]]] },
  ];
  const think = [
    { id: 'balance4', name: 'Balances', icon: '⚖️', titles: ['Two scales', 'Find both weights', 'Three scales'], descs: ['Compare the two scales.', 'What is different?', 'Add all the scales.'],
      levels: [[['balance', 3], ['digits', 3]], [['balance', 4], ['digits', 4]], [['balance', 5], ['balance', 6], ['digits', 5]]] },
    { id: 'pyramid4', name: 'Pyramids & digits', icon: '🔺', titles: ['Build the pyramid', 'A missing corner', 'The hidden middle'], descs: ['Four rows of bricks.', 'Work backward.', 'Middle bricks count three times.'],
      levels: [[['pyramid', 3], ['digitSum', 3]], [['pyramid', 4], ['digitSum', 4], ['digits', 4]], [['pyramid', 5], ['digitSum', 5], ['digits', 5]]] },
    { id: 'story4', name: 'Story puzzles', icon: '🐔', titles: ['Legs, ages, handshakes', 'Coins and ages', 'Puzzle stories'], descs: ['Pretend, then fix.', 'Organized lists.', 'Several steps.'],
      levels: [[['legs', 3], ['ages', 3], ['handshake', 3]], [['legs', 4], ['ages', 4], ['coinWays', 4]], [['legs', 5], ['ages', 5], ['coinWays', 5], ['back', 5]]] },
  ];
  const trail = [
    { id: 'tbackward4', name: 'Work backward', icon: '↩️', titles: ['Undo the steps', 'Three steps back', 'Backward and forward'], descs: ['Start at the end.', 'Reverse order.', 'Check it forward.'],
      levels: [[['back', 3], ['pyramid', 4]], [['back', 4], ['pyramid', 5]], [['back', 5], ['pyramid', 6], ['ages', 5]]] },
    { id: 'ttable4', name: 'Pretend and fix', icon: '🧮', titles: ['Make a table', 'Swap and fix', 'Two things at once'], descs: ['Try, check, adjust.', 'Each swap changes the total by the same amount.', 'Use two facts together.'],
      levels: [[['legs', 3], ['ages', 3]], [['legs', 4], ['balance', 4], ['coinWays', 4]], [['legs', 5], ['balance', 6], ['coinWays', 5]]] },
    { id: 'torganize4', name: 'Count in order', icon: '🗂️', titles: ['Organized counting', 'Corners and lines', 'Leave nothing out'], descs: ['Count by size.', 'Write numbers at the corners.', 'Group, then add.'],
      levels: [[['squares', 3], ['handshake', 3]], [['rects', 4], ['paths', 4], ['digitSum', 4]], [['paths', 5], ['rects', 5], ['pages', 5]]] },
  ];
  const STD = {
    count4: ['3.M.C.6', '4.OA.C.5', '4.OA.C.5 · 5.M.B.4'], cycle4: ['4.NBT.B.6', '4.NBT.B.6', '4.NBT.B.6 · 4.OA.C.5'],
    balance4: ['4.OA.A.2', '4.OA.A.3', '4.OA.A.3'], pyramid4: ['4.NBT.B.4', '4.NBT.B.4 · 4.NBT.A.2', '4.NBT.B.4 · 4.NBT.A.2'], story4: ['4.OA.A.3', '4.OA.A.3 · 4.M.A.2', '4.OA.A.3 · 4.M.A.2'],
    tbackward4: ['4.OA.A.3', '4.OA.A.3', '4.OA.A.3 · 5.OA.A.1'], ttable4: ['4.OA.A.3', '4.OA.A.3 · 4.M.A.2', '4.OA.A.3'], torganize4: ['3.M.C.6 · 4.OA.A.3', '4.OA.C.5', '4.OA.C.5 · 4.NBT.B.4'],
  };
  PZAPP.addContest({ id: 'look4', name: 'Look & Count', icon: '👀', color: 'c1', blurb: 'Squares, rectangles, paths, patterns, and calendars.' }, look, STD);
  PZAPP.addContest({ id: 'think4', name: 'Number Puzzles', icon: '🧩', color: 'c2', blurb: 'Balances, pyramids, digits, and puzzle stories.' }, think, STD);
  PZAPP.addTrail({ id: 'trail4', name: 'Summit Trail', icon: '🏔️', color: 'c6', blurb: 'Deeper puzzles with step-by-step hints.' }, trail, STD);
  PZAPP.lessonsFor([...look, ...think, ...trail], {
    'tbackward4.0': { rule: 'When a puzzle gives the END, start there. Undo the last step first, then the one before, all the way back. Always check forward.', ex: 'Multiply by 3, add 4, get 31 → 31 − 4 = 27, 27 ÷ 3 = 9. Check: 9 × 3 + 4 = 31 ✓', fig: () => Fig.picture(['🏁', '↩️', '🚩'], 'start at the end') },
    'ttable4.0': { rule: 'Pretend everything is the same kind, see how far off you are, then fix it: each swap changes the total by the same amount.', ex: '10 bikes and cars, 28 wheels: all bikes → 20; 8 short; each car adds 2 → 4 cars', fig: () => Fig.picture(['🚲', '🚗'], '10 in all · 28 wheels') },
    'torganize4.0': { rule: 'Organized counting: split the job into groups (by size, by first digit, by the first person), count each group, then add.', ex: '6 friends: 5 + 4 + 3 + 2 + 1 = 15 handshakes', fig: () => Fig.picture(['🤝'], '5 + 4 + 3 + 2 + 1') },
  });
})();
