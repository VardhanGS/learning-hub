// "Watch first" mini-lessons for MAP Math 4. Key: `${skillId}.${level}`. rule = what to know; ex = a worked example;
// fig = its picture; video = id of a video lesson (data/videos.js).
const LESSONS = {
  // ---- Place value ----
  'pv.0': { rule: 'Each place is worth 10 times the place to its right. A digit\'s value is the digit times its place.', ex: 'In 47,385 the 7 is in the thousands place: 7 × 1,000 = 7,000', fig: () => M4.placeChart6([47385]) },
  'pv.1': { rule: 'To compare big numbers, line up the places and compare from the left. Expanded form shows the value of every digit.', ex: '305,040 = 300,000 + 5,000 + 40 · 52,618 > 52,186', fig: () => M4.placeChart6([52618, 52186]) },
  'pv.2': { rule: 'Multiplying by 10, 100, or 1,000 moves each digit 1, 2, or 3 places to the left. Dividing moves them to the right.', ex: '4.7 × 100 = 470 · 3,600 ÷ 10 = 360', fig: () => Fig.table([['Power of ten', 'Value', 'Zeros'], ['10', '10', 1], ['10²', '100', 2], ['10³', '1,000', 3]]) },
  // ---- Rounding ----
  'round.0': { rule: 'To round, find the two numbers it is between. Look at the next digit to the right: 5 or more rounds up, less than 5 rounds down.', ex: '3,472 to the nearest hundred: between 3,400 and 3,500; the tens digit is 7, so 3,500', fig: () => Fig.roundLine(3472, 100) },
  'round.1': { rule: 'You can round to any place. Estimating with rounded numbers tells you if an exact answer makes sense.', ex: '4,872 + 3,195 ≈ 5,000 + 3,000 = 8,000', fig: () => Fig.table([['Number', 'Rounded'], ['4,872', '5,000'], ['3,195', '3,000']]) },
  'round.2': { rule: 'Decimals round the same way. Find the place, then look one digit to the right.', ex: '3.476 to the nearest tenth: the hundredths digit is 7, so 3.5', fig: () => Fig.numLine(3.4, 3.5, 100, { labels: [3.4, 3.45, 3.5], dec: 2, marks: [{ v: 3.476, label: '3.476' }] }) },
  // ---- Add & subtract ----
  'addsub.0': { rule: 'Line up the places. Start with the ones. When a place adds up to 10 or more, regroup to the next place.', ex: '2,768 + 1,459: 8 + 9 = 17 → write 7, carry 1 … = 4,227', fig: () => Fig.table([['Th', 'H', 'T', 'O'], ['2', '7', '6', '8'], ['1', '4', '5', '9']], 'Line up the places · +') },
  'addsub.1': { rule: 'The same steps work for numbers up to a million. To find a missing part, subtract the part you know from the whole.', ex: '□ + 2,345 = 6,000 → 6,000 − 2,345 = 3,655', fig: () => Fig.barModel('6,000', ['?', '2,345']) },
  'addsub.2': { rule: 'To add or subtract decimals, line up the decimal points. Write zeros in empty places.', ex: '4.6 + 2.75 → 4.60 + 2.75 = 7.35', fig: () => Fig.table([['Ones', '.', 'Tenths', 'Hundredths'], ['4', '.', '6', '0'], ['2', '.', '7', '5']], 'Line up the decimal points') },
  // ---- Multiply ----
  'mult.0': { rule: 'To multiply by one digit, split the big number into places, multiply each part, then add. That is the area model.', ex: '347 × 6 = 1,800 + 240 + 42 = 2,082', video: 'area-model', fig: () => Fig.areaModel(347, 6) },
  'mult.1': { rule: 'For two digits times two digits, split both numbers into tens and ones. There are four parts to add.', ex: '23 × 45 = 800 + 100 + 120 + 15 = 1,035', video: 'area-model', fig: () => Fig.areaModel(23, 45) },
  'mult.2': { rule: 'Multiply by the ones, then by the tens (write a zero in the ones place first), then add the two rows.', ex: '234 × 56: 234 × 6 = 1,404; 234 × 50 = 11,700; total 13,104', video: 'area-model', fig: () => Fig.table([['Step', 'Product'], ['234 × 6', '1,404'], ['234 × 50', '11,700'], ['Add', '13,104']], 'Two rows, then add') },
  // ---- Divide ----
  'div.0': { rule: 'Dividing is sharing into equal groups. Share the biggest place first. If a place is too small to share, write 0 there.', ex: '804 ÷ 4: 8 hundreds ÷ 4 = 2; 0 tens ÷ 4 = 0; 4 ones ÷ 4 = 1 → 201', video: 'divide', fig: () => Fig.shareBar('804', 4, { each: 201 }) },
  'div.1': { rule: 'Sometimes there are some left over: the remainder. It is always less than the number you divide by.', ex: '59 ÷ 4 = 14 R 3, because 4 × 14 = 56 and 56 + 3 = 59', video: 'divide', fig: () => Fig.shareBar('59', 4, { each: 14, r: 3 }) },
  'div.2': { rule: 'To divide by a two-digit number, use multiples of it: take away big groups, then smaller ones, and add up the groups.', ex: '936 ÷ 24: 24 × 30 = 720, 936 − 720 = 216, 24 × 9 = 216 → 39', video: 'divide', fig: () => Fig.table([['Try', 'Product'], ['24 × 10', '240'], ['24 × 30', '720'], ['24 × 9', '216']], 'Multiples of 24') },
  // ---- Equivalent & comparing fractions ----
  'frac.0': { rule: 'Equivalent fractions name the same amount. Multiply the top and the bottom by the same number.', ex: '2/3 = 4/6 = 8/12 (top and bottom × 2, then × 2 again)', video: 'fractions4', fig: () => Fig.fracStrips([[2, 3], [4, 6], [8, 12]]) },
  'frac.1': { rule: 'To compare fractions with different bottoms, compare each with one half, or rewrite them with a common denominator.', ex: '3/8 < 1/2 < 4/6, so 3/8 < 4/6 · 2/3 = 8/12 and 3/4 = 9/12, so 2/3 < 3/4', video: 'fractions4', fig: () => Fig.fracStrips([[3, 8], [1, 2], [4, 6]]) },
  'frac.2': { rule: 'To add fractions with different denominators, rewrite them with a common denominator, then add the tops.', ex: '1/2 + 1/3 = 3/6 + 2/6 = 5/6', video: 'fractions4', fig: () => Fig.fracStrips([[1, 2], [1, 3], [5, 6]]) },
  // ---- Fraction operations ----
  'fop.0': { rule: 'When the bottoms are the same, add or subtract the tops and keep the bottom. The pieces stay the same size.', ex: '3/8 + 2/8 = 5/8 · 2 3/4 + 1 2/4 = 3 5/4 = 4 1/4', fig: () => Fig.fracStrips([[3, 8], [2, 8], [5, 8]]) },
  'fop.1': { rule: 'A whole number times a fraction is that many groups of the fraction: multiply the top only.', ex: '4 × 2/3 = 8/3 = 2 2/3', fig: () => Fig.fracStrips([[2, 3], [2, 3], [2, 3], [2, 3]]) },
  'fop.2': { rule: 'To multiply two fractions, multiply top × top and bottom × bottom. It is a part of a part.', ex: '2/3 × 3/4 = 6/12 = 1/2', fig: () => M4.fracArea(2, 3, 3, 4) },
  // ---- Decimals ----
  'dec.0': { rule: 'Tenths have one place after the decimal point; hundredths have two.', ex: '7/10 = 0.7 · 7/100 = 0.07 · 45/100 = 0.45', video: 'decimals', fig: () => Fig.decimalGrid(45, 100) },
  'dec.1': { rule: 'To compare decimals, compare tenths first, then hundredths. More digits does not mean bigger. Tenths can be written as hundredths.', ex: '0.5 > 0.45 (5 tenths > 4 tenths) · 3/10 + 25/100 = 30/100 + 25/100 = 55/100', video: 'decimals', fig: () => Fig.pair(Fig.decimalGrid(50, 100), Fig.decimalGrid(45, 100)) },
  'dec.2': { rule: 'Thousandths have three places after the point. Write each decimal with the same number of places to compare.', ex: '4.07 = 4.070 > 4.065', video: 'decimals', fig: () => Fig.table([['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'], ['4', '.', '0', '7', '0'], ['4', '.', '0', '6', '5']]) },
  // ---- Times as many ----
  'times.0': { rule: '"Times as many" is multiplication: the bigger amount = how many times × the smaller amount.', ex: '35 is 5 times as many as 7: 35 = 5 × 7', fig: () => Fig.timesBars(7, 5, '7', '35', '35') },
  'times.1': { rule: 'To find the bigger amount, multiply. To find the smaller amount, divide. "Times as many" is not the same as "more than".', ex: '6 times as many as 4 is 24 · 4 more than 6 is 10', fig: () => Fig.timesBars(4, 6, 'Ana', 'Ben', '24') },
  'times.2': { rule: 'An expression records steps. The step done first goes in parentheses.', ex: '"Add 8 and 7, then multiply by 2" is 2 × (8 + 7)', fig: () => Fig.table([['First', 'Then'], ['add 8 and 7', 'multiply by 2']]) },
  // ---- Multi-step ----
  'steps.0': { rule: 'For a two-step problem, find what you need first, then use it in the second step.', ex: '4 boxes of 12 = 48; then 9 are given away: 48 − 9 = 39', fig: () => Fig.barModel('?', [12, 12, 12, 12], '4 boxes of 12, then − 9') },
  'steps.1': { rule: 'After dividing, ask what the remainder means: round up, leave it out, or give the remainder itself.', ex: '75 students, 8 per van: 75 ÷ 8 = 9 R 3, so 10 vans are needed', fig: () => Fig.shareBar(75, 9, { each: 8, r: 3 }) },
  'steps.2': { rule: 'Fractions and money work in stories too. Multiply when there are equal groups.', ex: '5 batches × 3/4 cup = 15/4 = 3 3/4 cups · 4 × $2.35 = $9.40', fig: () => Fig.fracStrips([[3, 4], [3, 4], [3, 4], [3, 4]]) },
  // ---- Factors ----
  'factors.0': { rule: 'A factor divides a number with nothing left over. A multiple is what you get when you skip count.', ex: 'Factors of 12: 1, 2, 3, 4, 6, 12 · Multiples of 4: 4, 8, 12, 16 …', fig: () => Fig.array(3, 4) },
  'factors.1': { rule: 'A prime number has exactly two factors: 1 and itself. A composite number has more than two.', ex: '7 is prime (1 × 7) · 12 is composite (1 × 12, 2 × 6, 3 × 4)', fig: () => Fig.pair(Fig.array(1, 7), Fig.array(3, 4)) },
  'factors.2': { rule: 'Do what is in parentheses first. Then multiply and divide. Then add and subtract.', ex: '3 × (4 + 6) − 5 = 3 × 10 − 5 = 25', fig: () => Fig.table([['First', 'Next', 'Last'], ['( )', '× and ÷', '+ and −']], 'Order of operations') },
  // ---- Patterns ----
  'pattern.0': { rule: 'A rule tells how a pattern grows. The 5th number is 4 jumps after the 1st.', ex: 'Start at 5, add 6: 5, 11, 17, 23, 29', fig: () => Fig.jumps(5, 6, 4) },
  'pattern.1': { rule: 'Patterns have features the rule does not say. Look for odd and even, or digits that repeat.', ex: 'Start at 3, add 4: 3, 7, 11, 15 … all odd (odd + even = odd)', fig: () => Fig.jumps(3, 4, 3) },
  'pattern.2': { rule: 'Two patterns side by side make ordered pairs. Compare matching numbers to find how they are related.', ex: 'A: 0, 3, 6, 9 · B: 0, 6, 12, 18 → each B is 2 times A', fig: () => Fig.table([['A', 0, 3, 6, 9], ['B', 0, 6, 12, 18]]) },
  // ---- Angles ----
  'angle.0': { rule: 'A right angle is a square corner: 90°. Acute angles are smaller. Obtuse angles are wider, up to a straight line (180°).', ex: '45° is acute · 90° is right · 130° is obtuse', video: 'angles', fig: () => Fig.pair(Fig.angle(45), Fig.angle(130)) },
  'angle.1': { rule: 'Put the protractor\'s center on the vertex and one ray on 0. Read the scale that starts at 0. Angle parts add up to the whole.', ex: 'The ray points to 50 on the scale that starts at 0, so it is 50° · 35° + 55° = 90°', video: 'angles', fig: () => Fig.protractor(50) },
  'angle.2': { rule: 'Shapes are named by their sides and angles. A square is also a rectangle, a rhombus, a parallelogram, and a quadrilateral.', ex: 'Right triangle: one 90° angle · Every rectangle is a parallelogram', fig: () => Fig.pair(Fig.triangle('right'), Fig.shape('square')) },
  // ---- Lines ----
  'lines.0': { rule: 'A line segment has two endpoints. A ray has one endpoint. A line goes on forever both ways. Parallel lines never meet; perpendicular lines meet at a square corner.', ex: 'The edges of a ruler are parallel · The corner of a book is perpendicular', fig: () => Fig.pair(Fig.lines('parallel'), Fig.lines('perpendicular')) },
  'lines.1': { rule: 'A line of symmetry folds a shape into two matching halves.', ex: 'A heart has 1 line of symmetry · A rectangle has 2 · A square has 4', fig: () => Fig.symmetry('heart', 'v') },
  'lines.2': { rule: 'A point on a coordinate grid is named (x, y): go across x first, then up y.', ex: 'Point A at (3, 5): 3 across, 5 up', fig: () => Fig.coordGrid([[3, 5, 'A']]) },
  // ---- Measurement ----
  'meas.0': { rule: 'To change a bigger unit into a smaller one, multiply by how many small units are in one big unit.', ex: '1 foot = 12 inches, so 4 feet = 4 × 12 = 48 inches', fig: () => Fig.table([['Feet', 'Inches'], [1, 12], [2, 24], [4, 48]]) },
  'meas.1': { rule: 'In measurement stories, change everything to the same unit first. 60 minutes make 1 hour.', ex: '3 lb 4 oz = 3 × 16 + 4 = 52 oz · 2:45 + 1 h 35 min = 4:20', fig: () => Fig.clock(2, 45) },
  'meas.2': { rule: 'Metric units change by 10, 100, or 1,000, so you move the decimal point. Bigger unit → smaller number.', ex: '250 cm = 2.5 m · 3.5 kg = 3,500 g', fig: () => Fig.table([['Meters', 'Centimeters'], [1, 100], ['2.5', 250]]) },
  // ---- Area ----
  'area.0': { rule: 'Area is the number of squares inside: length × width. Perimeter is the distance around: add all four sides.', ex: '8 cm by 5 cm: area = 40 square cm; perimeter = 26 cm', fig: () => Fig.rect(8, 5, { grid: true, labels: true, unit: 'cm' }) },
  'area.1': { rule: 'Use the formula backward to find a missing side: divide the area by the length, or take the lengths away from the perimeter.', ex: 'Area 72, length 9 → width = 72 ÷ 9 = 8', fig: () => Fig.rect(9, 8, { grid: false, labels: true, unit: 'ft', hLabel: '?' }) },
  'area.2': { rule: 'Volume is the number of unit cubes that fill a box: length × width × height.', ex: '4 × 3 × 2 = 24 cubic units', fig: () => Fig.prism(4, 3, 2) },
  // ---- Data ----
  'data.0': { rule: 'A line plot shows each measurement as an X above a number line.', ex: 'Three X marks above 2 ½ means three items measured 2 ½ inches', fig: () => Fig.linePlot('Lengths of pencils', 2, 4, [2, 2.5, 2.5, 2.5, 3, 3.5, 4], 2, 'inches') },
  'data.1': { rule: 'Use the line plot to add or subtract measurements. The longest minus the shortest is the difference.', ex: '3 ¾ − 1 ¼ = 2 2/4 = 2 ½ inches', fig: () => Fig.linePlot('Lengths of ribbons', 1, 4, [1.25, 2, 2.5, 3, 3.75], 4, 'inches') },
  'data.2': { rule: 'To share equally, add all the amounts, then divide by how many there are.', ex: 'Beakers of 1, 1 ½, and 2 ½ cups: total 5 cups ÷ 3 = 5/3 = 1 2/3 cups each', fig: () => Fig.linePlot('Water in beakers', 1, 3, [1, 1.5, 2.5], 2, 'cups') },
};
