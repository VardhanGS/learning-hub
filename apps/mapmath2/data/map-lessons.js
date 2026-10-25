// "Watch first" lessons for MAP Math 2's new skills (each with a picture of its worked example).
Object.assign(LESSONS, {
  // Place value & number forms
  'mpv.0': { rule: 'Every digit has a place: hundreds, tens, ones, from left to right.', ex: 'In 472: 4 is in the hundreds place, 7 in the tens, 2 in the ones', fig: () => Fig.placeChart([472]) },
  'mpv.1': { rule: 'A digit\'s value depends on its place. To order numbers, compare hundreds first, then tens, then ones.', ex: 'The 7 in 472 is worth 70 · 318 < 381 < 403', fig: () => Fig.placeChart([318, 381, 403], '', 1) },
  'mpv.2': { rule: 'To find the closest hundred, see whether the number is before or after the halfway mark.', ex: '374 is after the halfway mark, 350, so 374 is closest to 400', fig: () => Fig.roundLine(374, 100) },
  // Computation
  'mcomp.0': { rule: 'Line up tens and ones. Add or subtract the ones first. Regroup when you need to.', ex: '47 + 35: 7 + 5 = 12 → 1 ten, 2 ones → 82', fig: () => Fig.addBlocks(47, 35) },
  'mcomp.1': { rule: 'For three-digit numbers, work one place at a time: ones, tens, hundreds.', ex: '352 − 128 = 224', fig: () => Fig.placeChart([352, 128], '−') },
  'mcomp.2': { rule: 'To multiply a two-digit number, multiply the tens and the ones, then add.', ex: '23 × 4 = 20 × 4 + 3 × 4 = 80 + 12 = 92', fig: () => Fig.tensGroups(4, 2) },
  // Fractions
  'mfrac.0': { rule: 'Halves, thirds, and fourths must be EQUAL parts. Count all the parts, then the shaded ones.', ex: '1 of 4 equal parts shaded = one fourth', fig: () => Fig.fraction('circle', 4, 1) },
  'mfrac.1': { rule: 'In a fraction, the bottom number is how many equal parts. The top number is how many are shaded.', ex: '3/8: 8 equal parts, 3 shaded', fig: () => Fig.fraction('bar', 8, 3) },
  'mfrac.2': { rule: 'Same bottom number: more parts is bigger. Same top number: the smaller bottom number has bigger pieces.', ex: '3/4 > 1/4 · 1/3 > 1/6', fig: () => Fig.fraction('bar', 3, 1) + Fig.fraction('bar', 6, 1) },
  // Equations
  'meq.0': { rule: 'An equation is true when both sides are the same amount. Work out each side.', ex: '7 + 5 = 12 is true · 9 + 4 = 12 is false', fig: () => Fig.bond(12, 7, 5) },
  'meq.1': { rule: 'The = sign means "is the same as". Both sides must balance.', ex: '8 + 6 = □ + 5: 8 + 6 = 14, and 9 + 5 = 14, so the box is 9', fig: () => Fig.barModel(14, ['?', 5]) },
  'meq.2': { rule: 'To write an equation for a story, ask: is the group getting bigger or smaller, and what is unknown?', ex: '24 shells, finds 13 more: 24 + 13 = □', fig: () => Fig.barModel('?', [24, 13], 'shells') },
  // Patterns & rules
  'mpat.0': { rule: 'An input-output table follows one rule. Find how each In number changes into its Out number.', ex: 'In 2 → Out 7, In 5 → Out 10: the rule is add 5', fig: () => MAP_TABLE_FIG([['In', 2, 5, 8], ['Out', 7, 10, '?']], 'Rule: add 5') },
  'mpat.1': { rule: 'In a growing pattern, find how much it grows each time.', ex: '4, 9, 14, 19 … grows by 5 each time', fig: () => Fig.jumps(4, 5, 3) },
  'mpat.2': { rule: 'Some rules multiply. Check the rule with every pair in the table.', ex: 'In 2 → 6, In 4 → 12: the rule is multiply by 3', fig: () => MAP_TABLE_FIG([['In', 2, 4, 5], ['Out', 6, 12, '?']], 'Rule: × 3') },
  // Story problems
  'mstory.0': { rule: 'Bigger group: add. Smaller group: subtract. Missing start: start + change = end.', ex: 'Had some, got 12, now 30: □ + 12 = 30', fig: () => Fig.barModel(30, ['?', 12]) },
  'mstory.1': { rule: 'For two steps, solve the first part, then use that answer for the second part.', ex: '35 + 20 = 55, then 55 − 15 = 40', fig: () => Fig.barModel('?', [35, 20], 'then 15 are used') },
  'mstory.2': { rule: 'Equal groups: multiply the number of groups by the number in each group.', ex: '4 bags with 6 apples: 4 × 6 = 24', fig: () => Fig.groups(4, 6, '🍎') },
  // Shapes
  'mshape.0': { rule: 'Count sides and corners (vertices). Triangle 3, quadrilateral 4, pentagon 5, hexagon 6. A circle has none.', ex: '5 vertices → pentagon', fig: () => Fig.shapeRow(['triangle', 'square', 'pentagon', 'hexagon']) },
  'mshape.1': { rule: 'Shapes keep their names when you turn them. Count the sides every time.', ex: 'A turned square is still a square', fig: () => Fig.shape('square', 45) },
  'mshape.2': { rule: 'Quadrilaterals have 4 sides. Squares and rectangles have 4 square corners; a rhombus has 4 equal sides.', ex: 'square, rectangle, rhombus, trapezoid', fig: () => Fig.shapeRow(['square', 'rectangle', 'rhombus', 'trapezoid']) },
  // Measure, time & money
  'mmeas.0': { rule: 'Use what you know: an inch is small, a foot is about a ruler, a meter is a big step. Count coins from the biggest.', ex: 'A pencil is about 7 inches · 25¢ + 10¢ + 1¢ = 36¢', fig: () => Fig.coins(['q', 'd', 'p']) },
  'mmeas.1': { rule: 'Perimeter: add all the sides. Time to the minute: count by 5s, then by 1s.', ex: '5 + 3 + 5 + 3 = 16 cm', fig: () => Fig.rect(5, 3, { grid: false, labels: true, unit: 'cm' }) },
  'mmeas.2': { rule: 'Area is the squares inside: length × width. Perimeter is the distance around.', ex: '6 × 4 = 24 square cm · 6 + 4 + 6 + 4 = 20 cm', fig: () => Fig.rect(6, 4, { grid: true, labels: true, unit: 'cm' }) },
  // Data
  'mdata.0': { rule: 'Tally marks are counted in fives: a bundle with a line across is 5. On a bar graph, read the top of the bar.', ex: 'A bundle of 5 and 3 more marks = 8', fig: () => Fig.barGraph('Books read', [['Mon', 3], ['Tue', 6], ['Wed', 4]]) },
  'mdata.1': { rule: '"How many more" means subtract. "How many in all" means add.', ex: '9 − 4 = 5 more · 9 + 4 = 13 in all', fig: () => Fig.barGraph('Votes', [['Red', 9], ['Blue', 4]]) },
  'mdata.2': { rule: 'In a scaled graph, read the key. A graph shows how many, not why.', ex: 'Key 📕 = 2: four books stand for 8', fig: () => Fig.picGraph('Books read', [['Mon', 8], ['Tue', 4]], '📕', 2) },
});
