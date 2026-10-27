// Puzzle Peak 2 content: which puzzle families (data/pzkit.js) each level uses, at which difficulty (0–2 = the
// Grades 1–2 paper's 3-, 4-, and 5-point questions; 3 = a first taste of the Grades 3–4 paper).
// Standards: closest 2023 NJSLS-Mathematics code for the reasoning practiced (contest puzzles go beyond grade level).
(function () {
  const look = [
    { id: 'count', name: 'Count the shapes', icon: '🔲', titles: ['Squares and cubes', 'Bigger grids and stacks', 'Every size, every cube'], descs: ['Count squares and cubes carefully.', 'Squares of more than one size.', 'Count by size, layer by layer.'],
      levels: [[['squares', 0], ['cubes', 0]], [['squares', 1], ['cubes', 1]], [['squares', 2], ['cubes', 2], ['squares', 3]]] },
    { id: 'pattern', name: 'Patterns & calendars', icon: '📿', titles: ['What comes next?', 'Far along the pattern', 'Big jumps'], descs: ['Repeating beads and weekdays.', 'Find bead 20 and the 18th day.', 'Use groups to jump ahead.'],
      levels: [[['beads', 0], ['calendar', 0]], [['beads', 1], ['calendar', 1]], [['beads', 2], ['calendar', 2], ['beads', 3]]] },
  ];
  const think = [
    { id: 'balance', name: 'Balance scales', icon: '⚖️', titles: ['One scale', 'Two scales', 'Compare the scales'], descs: ['Share the weight equally.', 'Swap fruit for its weight.', 'What is different between two scales?'],
      levels: [[['balance', 0], ['digits', 0]], [['balance', 1], ['digits', 1]], [['balance', 2], ['balance', 3], ['digits', 2]]] },
    { id: 'pyramid', name: 'Number pyramids', icon: '🔺', titles: ['Build to the top', 'A missing brick', 'The middle brick'], descs: ['Add pairs of bricks.', 'Work backward from the top.', 'The middle brick counts twice.'],
      levels: [[['pyramid', 0], ['back', 0]], [['pyramid', 1], ['back', 1]], [['pyramid', 2], ['back', 2], ['pyramid', 3]]] },
    { id: 'story', name: 'Story puzzles', icon: '🐔', titles: ['Legs, wheels, and ages', 'Pretend, then fix', 'Puzzle stories'], descs: ['Count legs and wheels.', 'Pretend they are all the same.', 'Bigger stories.'],
      levels: [[['legs', 0], ['ages', 0]], [['legs', 1], ['ages', 1]], [['legs', 2], ['ages', 2], ['handshake', 3]]] },
  ];
  const trail = [
    { id: 'tbackward', name: 'Work backward', icon: '↩️', titles: ['Undo one step', 'Undo two steps', 'Undo and check'], descs: ['Start at the end.', 'Undo in reverse order.', 'Then check it forward.'],
      levels: [[['back', 0], ['pyramid', 1]], [['back', 1], ['pyramid', 1], ['back', 2]], [['back', 2], ['pyramid', 2], ['back', 3]]] },
    { id: 'ttable', name: 'Pretend and fix', icon: '🧮', titles: ['Try and check', 'Make a table', 'Fix the difference'], descs: ['Guess, check, adjust.', 'Write each try in a table.', 'Each swap changes the total the same way.'],
      levels: [[['legs', 0], ['balance', 0]], [['legs', 1], ['balance', 1]], [['legs', 2], ['balance', 2], ['ages', 3]]] },
    { id: 'torganize', name: 'Count in order', icon: '🗂️', titles: ['Count by size', 'Organized lists', 'Leave nothing out'], descs: ['Small ones first, then bigger.', 'List in order so nothing is missed.', 'Count every size and every case.'],
      levels: [[['squares', 0], ['cubes', 0]], [['squares', 1], ['cubes', 1], ['digits', 1]], [['squares', 2], ['handshake', 3], ['coinWays', 3]]] },
  ];
  const STD = {
    count: ['2.G.A.2', '2.G.A.2 · 2.OA.C.4', '2.G.A.2 · 3.M.C.6'], pattern: ['2.OA.C.4', '2.NBT.A.2', '2.NBT.A.2 · 4.OA.C.5'],
    balance: ['2.OA.A.1', '2.OA.A.1', '2.OA.A.1 · 3.OA.D.8'], pyramid: ['2.NBT.B.5', '2.NBT.B.5', '2.NBT.B.6'], story: ['2.OA.A.1', '2.OA.A.1', '2.OA.A.1 · 3.OA.D.8'],
    tbackward: ['2.OA.A.1', '2.OA.A.1', '3.OA.D.8'], ttable: ['2.OA.A.1', '2.OA.A.1', '3.OA.D.8'], torganize: ['2.G.A.2', '2.G.A.2 · 2.NBT.A.1', '2.G.A.2 · 3.M.C.6'],
  };
  PZAPP.addContest({ id: 'look', name: 'Look & Count', icon: '👀', color: 'c1', blurb: 'Count shapes, cubes, beads, and calendar days.' }, look, STD);
  PZAPP.addContest({ id: 'think', name: 'Number Puzzles', icon: '🧩', color: 'c2', blurb: 'Balances, pyramids, and puzzle stories.' }, think, STD);
  PZAPP.addTrail({ id: 'trail', name: 'Summit Trail', icon: '🏔️', color: 'c6', blurb: 'Deeper puzzles with step-by-step hints.' }, trail, STD);
  PZAPP.lessonsFor([...look, ...think, ...trail], {
    'tbackward.0': { rule: 'Some puzzles tell you the END. Start there and undo each step, last step first. Then check by going forward.', ex: 'Add 5 and get 12 → undo: 12 − 5 = 7. Check: 7 + 5 = 12 ✓', fig: () => Fig.picture(['🏁', '↩️', '🚩'], 'start at the end') },
    'ttable.0': { rule: 'Make a guess, check it, and fix it. Each new try should be closer than the last.', ex: '4 bikes and trikes, 10 wheels: all bikes → 8 wheels; 2 short; each trike adds 1 → 2 trikes', fig: () => Fig.picture(['🚲', '🛺'], '4 in all · 10 wheels') },
    'torganize.0': { rule: 'To count without missing any, go in order: the smallest ones first, then the next size up.', ex: '2 by 3 grid: 6 small squares + 2 bigger ones = 8', fig: () => Fig.rect(3, 2, { grid: true }) },
  });
  // video lessons (video_scripts.py; they appear once rendered on the Mac)
  Object.entries({ 'count.0': 'pp-count2', 'count.1': 'pp-count2', 'count.2': 'pp-count2', 'torganize.0': 'pp-count2', 'torganize.1': 'pp-count2', 'tbackward.0': 'pp-backward2', 'tbackward.1': 'pp-backward2', 'tbackward.2': 'pp-backward2', 'pyramid.1': 'pp-backward2' }).forEach(([k, v]) => { LESSONS[k].video = v; });
})();
