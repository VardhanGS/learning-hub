"""MAP Algebra 1 video lessons (rendered by tools/make_videos.py mapalg1). The math lessons are borrowed from
Algebra 1 Quest (config videosFrom); this app adds a video about the practice test itself and one for each of its own skills."""


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


def quiz(q, opts, a, ask, reveal, ask_say=None, reveal_say=None, fig=None):
    return {'type': 'quiz', 'q': q, 'opts': opts, 'a': a, 'fig': fig,
            'beats': [B(ask, ask_say, role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B(reveal, reveal_say, role='reveal')]}


def outro(sub):
    return {'type': 'outro', 'title': 'Your turn!', 'sub': sub, 'beats': [B('Now it is your turn. ' + sub)]}


VIDEOS = [
    {
        'id': 'map-tips-a1', 'title': 'How Your Practice Test Works', 'subject': 'real', 'color': 'c1', 'label': 'Practice test',
        'desc': 'What the MAP-style Algebra 1 practice test is like, and how to do your best.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🧭', 'title': 'Your Practice Test', 'sub': 'How it works, and how to do your best', 'beats': [B('Ready for your Algebra 1 practice test? Here is how it works.')]},
            {'type': 'image', 'heading': 'It adapts to you', 'figs': ["Fig.picture(['⬆️', '⬇️'])"], 'notes': ['Right answer: a bit harder', 'Missed one: a bit easier', 'About half will feel hard'],
             'beats': [B('This test adapts as you go.'), B('Get one right, and the next question is a little harder. Miss one, and the next is a little easier.'), B('So about half the questions will feel hard. That is how it is supposed to work.')]},
            {'type': 'image', 'heading': 'Review questions too', 'figs': ["Fig.table([['Goal area', 'Includes'], ['Real Numbers', 'signed numbers, percents, roots'], ['Expressions, Equations, Inequalities', 'equations, systems, quadratics'], ['Patterns, Functions, Graphing', 'functions, rates, data']])"], 'notes': ['Three goal areas', 'Some grade 7 and 8 review', 'Show your work on paper'],
             'beats': [B('The questions come from three goal areas.'), B('Some are review from grades 7 and 8, like negative numbers and percents. Do not rush those.'), B('Keep scratch paper next to you and write out your steps.')]},
            {'type': 'image', 'heading': 'Answers lock', 'figs': ["Fig.picture(['👆', '🔒'])"], 'notes': ['Change your mind before Next', 'No going back', 'No time limit'],
             'beats': [B('You can change your answer until you tap Next. After that, it is locked.'), B('There is no time limit, so check your work before you move on. Substitute your answer back in when you can.')]},
            {'type': 'quiz', 'q': 'You solved for x. What is the best quick check?', 'opts': ['Pick the longest answer', 'Put x back into the equation', 'Skip to the next one'], 'a': 'Put x back into the equation', 'fig': "Fig.picture(['🤔'])",
             'beats': [B('Quick quiz! You solved an equation for x. What is the best quick check?', role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B('Put x back into the equation! If both sides match, you can tap Next with confidence.', role='reveal')]},
            {'type': 'outro', 'title': 'You are ready!', 'sub': 'Take your time and do your best.', 'beats': [B('You are ready. Take your time, and do your best. Good luck!')]},
        ],
    },
    # ---- added 2026-10-27 (plan item 3): videos for MAP Algebra 1's own skills ----
    {
        'id': 'signed-numbers', 'title': 'Signed Numbers Review', 'subject': 'real', 'label': 'Signed numbers',
        'desc': 'Adding and subtracting negatives on a number line, sign rules, and where the minus sign sits.', 'practice': ['real', 'signed', 0],
        'scenes': [
            {'type': 'title', 'emoji': '➖', 'title': 'Signed Numbers', 'sub': 'The review questions that catch people', 'beats': [B('Negative numbers are review, but they cause more lost points than almost anything else. Let us make them automatic.')]},
            {'type': 'image', 'heading': 'Adding and subtracting', 'figs': ["Fig.numLine(-10, 10, 1, { labels: [-10, -5, 0, 5, 10], marks: [{ v: -7, label: '−7' }, { v: -4, label: '−4' }] })"], 'notes': ['−7 + 3: move right 3 → −4', 'a − b = a + (−b)', '5 − (−8) = 5 + 8 = 13'],
             'beats': [B('On a number line, adding a positive moves right.'), B('Negative 7 plus 3: start at negative 7, move right 3, land on negative 4.', 'Negative seven plus three. Start at negative seven, move right three, and land on negative four.'), B('Subtracting is adding the opposite.'), B('So 5 minus negative 8 is 5 plus 8, which is 13.', 'So five minus negative eight is five plus eight, which is thirteen.')]},
            {'type': 'image', 'heading': 'Multiplying and dividing', 'figs': ["Fig.table([['Signs', 'Answer'], ['same (+ +) or (− −)', 'positive'], ['different (+ −)', 'negative']])"], 'notes': ['(−6)(−4) = 24', '−36 ÷ 9 = −4'],
             'beats': [B('For multiplying and dividing, do the numbers first, then decide the sign.'), B('Same signs give a positive. Negative 6 times negative 4 is 24.', 'Same signs give a positive. Negative six times negative four is twenty-four.'), B('Different signs give a negative. Negative 36 divided by 9 is negative 4.', 'Different signs give a negative. Negative thirty-six divided by nine is negative four.')]},
            {'type': 'image', 'heading': 'Where is the minus sign?', 'figs': ["Fig.table([['−3²', '(−3)²'], ['−(3 · 3) = −9', '(−3)(−3) = 9']])"], 'notes': ['−3²: square first, then the minus', '(−3)²: the minus is inside', 'Exponents come before the minus'],
             'beats': [B('Here is the classic trap.'), B('Negative 3 squared, with no parentheses, means the opposite of 3 squared: negative 9.', 'Negative three squared, with no parentheses, means the opposite of three squared. That is negative nine.'), B('With parentheses, negative 3 is the thing being squared: positive 9.', 'With parentheses, negative three is the thing being squared. That is positive nine.'), B('The exponent happens before the minus sign, unless parentheses say otherwise.')]},
            quiz('−2² + 5(1 − 4) = ?', ['−19', '−11', '19'], '−19', 'Your turn. Negative 2 squared, plus 5 times 1 minus 4.', 'Negative 19. Negative 2 squared is negative 4, and 5 times negative 3 is negative 15. Negative 11 comes from squaring negative 2 as positive 4.', ask_say='Your turn. Negative two squared, plus five times the quantity one minus four. What is it?', reveal_say='Negative nineteen. Negative two squared is negative four, and five times negative three is negative fifteen. Negative eleven comes from treating it as positive four.', fig="Fig.numLine(-20, 0, 1, { labels: [-20, -15, -10, -5, 0], marks: [{ v: -19, label: '?' }] })"),
            outro('Practice signed numbers in MAP Algebra 1.'),
        ],
    },
    {
        'id': 'ratios-percents', 'title': 'Proportions and Percents', 'subject': 'real', 'label': 'Ratios & percents',
        'desc': 'Scaling proportions, percent of a number, percent change, and several percent steps in a row.', 'practice': ['real', 'ratio', 0],
        'scenes': [
            {'type': 'title', 'emoji': '％', 'title': 'Proportions and Percents', 'sub': 'Equal ratios, one step at a time', 'beats': [B('Proportions and percents show up all over the Algebra 1 test, often hidden in a story.')]},
            {'type': 'image', 'heading': 'x / 24 = 5 / 8', 'figs': ["Fig.table([['x', '5'], ['24', '8']], '× 3 on both')"], 'notes': ['24 is 3 × 8', 'So x is 3 × 5', 'x = 15'],
             'beats': [B('A proportion says two ratios are equal.'), B('Look at the bottoms: 24 is 3 times 8.', 'Look at the bottoms. Twenty-four is three times eight.'), B('So the top must be 3 times 5 as well.', 'So the top must be three times five as well.'), B('x equals 15. Cross-multiplying gives the same answer.', 'x equals fifteen. Cross-multiplying gives the same answer.')]},
            {'type': 'image', 'heading': 'Percent of, and percent change', 'figs': ["Fig.barModel('80', ['35%', '65%'])"], 'notes': ['35% of 80 = 0.35 × 80 = 28', '$50 → $60: change 10', '10 ÷ 50 = 20% increase'],
             'beats': [B('Percent means per hundred.'), B('35 percent of 80 is 0.35 times 80, which is 28.', 'Thirty-five percent of eighty is zero point three five times eighty, which is twenty-eight.'), B('For percent change, find the change first. 50 dollars to 60 dollars is a change of 10.', 'For percent change, find the change first. Fifty dollars to sixty dollars is a change of ten.'), B('Divide by the ORIGINAL amount: 10 over 50 is a 20 percent increase.', 'Then divide by the original amount. Ten over fifty is a twenty percent increase.')]},
            {'type': 'image', 'heading': 'Two percent steps', 'figs': ["Fig.table([['Start', '25% off', '+10% tax'], ['$80', '$60', '$66']])"], 'notes': ['80 × 0.75 = 60', '60 × 1.10 = 66', 'Not 80 × 0.85!'],
             'beats': [B('A jacket costs 80 dollars. It is 25 percent off, then there is a 10 percent tax.', 'A jacket costs eighty dollars. It is twenty-five percent off, then there is a ten percent tax.'), B('Do one step at a time. 25 percent off leaves 75 percent: 60 dollars.', 'Do one step at a time. Twenty-five percent off leaves seventy-five percent. That is sixty dollars.'), B('The tax multiplies by 1.10: 66 dollars.', 'The tax multiplies by one point one zero. That is sixty-six dollars.'), B('You cannot just combine them into 15 percent off. That gives 68, which is wrong.', 'You cannot just combine them into fifteen percent off. That gives sixty-eight, which is wrong.')]},
            quiz('A price goes from $40 to $30. What is the percent change?', ['25% decrease', '33% decrease', '10% decrease'], '25% decrease', 'Your turn. A price drops from 40 dollars to 30 dollars. What is the percent change?', 'A 25 percent decrease. The change is 10, and 10 over the original 40 is one fourth. 33 percent divides by the new price by mistake.', ask_say='Your turn. A price drops from forty dollars to thirty dollars. What is the percent change?', reveal_say='A twenty-five percent decrease. The change is ten, and ten over the original forty is one fourth. Thirty-three percent divides by the new price, by mistake.', fig="Fig.compareBars(40, 30, 'Before', 'After', '$')"),
            outro('Practice ratios and percents in MAP Algebra 1.'),
        ],
    },
    {
        'id': 'sci-notation', 'title': 'Roots and Scientific Notation', 'subject': 'real', 'label': 'Scientific notation',
        'desc': 'Square and cube roots, writing numbers in scientific notation, and multiplying and comparing them.', 'practice': ['real', 'scinot', 1],
        'scenes': [
            {'type': 'title', 'emoji': '🔬', 'title': 'Scientific Notation', 'sub': 'Huge and tiny numbers, made simple', 'beats': [B('Scientists write very big and very small numbers in a short, standard way. You can too.')]},
            {'type': 'image', 'heading': 'Roots undo powers', 'figs': ["Fig.table([['n', '2', '3', '4', '5'], ['n²', '4', '9', '16', '25'], ['n³', '8', '27', '64', '125']])"], 'notes': ['√81 = 9 because 9² = 81', '∛64 = 4 because 4³ = 64'],
             'beats': [B('A square root undoes squaring, and a cube root undoes cubing.'), B('The square root of 81 is 9, because 9 squared is 81.', 'The square root of eighty-one is nine, because nine squared is eighty-one.'), B('The cube root of 64 is 4, because 4 cubed is 64.', 'The cube root of sixty-four is four, because four cubed is sixty-four.')]},
            {'type': 'image', 'heading': 'a × 10ⁿ, with 1 ≤ a < 10', 'figs': ["Fig.table([['Standard', 'Scientific'], ['45,000', '4.5 × 10⁴'], ['0.0062', '6.2 × 10⁻³']])"], 'notes': ['First part: from 1 up to 10', 'Big number: positive power', 'Small number: negative power'],
             'beats': [B('In scientific notation, the first number is at least 1 and less than 10.', 'In scientific notation, the first number is at least one and less than ten.'), B('Then it is multiplied by a power of 10.', 'Then it is multiplied by a power of ten.'), B('45,000 is 4.5 times 10 to the fourth.', 'Forty-five thousand is four point five times ten to the fourth.'), B('A small number like 0.0062 gets a negative power: 6.2 times 10 to the negative 3.', 'A small number, like zero point zero zero six two, gets a negative power. Six point two times ten to the negative three.')]},
            {'type': 'image', 'heading': 'Multiplying', 'figs': ["Fig.table([['Numbers', 'Powers of 10'], ['3 × 4 = 12', '10⁴ × 10² = 10⁶'], ['12 × 10⁶', '= 1.2 × 10⁷']])"], 'notes': ['Multiply the numbers', 'Add the exponents', 'Fix it: 12 → 1.2 × 10'],
             'beats': [B('Multiply 3 times 10 to the fourth by 4 times 10 squared.', 'Multiply three times ten to the fourth, by four times ten squared.'), B('Multiply the number parts: 3 times 4 is 12.', 'Multiply the number parts. Three times four is twelve.'), B('Add the exponents: 10 to the sixth.', 'Add the exponents. Ten to the sixth.'), B('12 is too big for the first part, so it becomes 1.2 times 10 to the seventh.', 'Twelve is too big for the first part, so the answer becomes one point two times ten to the seventh.')]},
            quiz('How many times larger is 6 × 10⁸ than 2 × 10⁵?', ['3 × 10³', '4 × 10³', '3 × 10¹³'], '3 × 10³', 'Your turn. How many times larger is 6 times 10 to the eighth than 2 times 10 to the fifth?', '3 times 10 cubed, or 3,000 times. Divide 6 by 2, and subtract the exponents, 8 minus 5.', ask_say='Your turn. How many times larger is six times ten to the eighth, than two times ten to the fifth?', reveal_say='Three times ten cubed, which is three thousand times. Divide six by two, and subtract the exponents, eight minus five.', fig="Fig.picture(['🐳', '🐭'], 'How many times larger?')"),
            outro('Practice scientific notation in MAP Algebra 1.'),
        ],
    },
    {
        'id': 'quad-forms', 'title': 'Square Roots and Completing the Square', 'subject': 'eei', 'label': 'Quadratic forms',
        'desc': 'Solve by taking square roots, complete the square, and find the vertex of a thrown ball.', 'practice': ['eei', 'quadmore', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🟦', 'title': 'Quadratic Forms', 'sub': 'The same parabola, written three ways', 'beats': [B('A quadratic can be written in different forms. Each form makes a different question easy.')]},
            {'type': 'image', 'heading': '(x − 3)² = 16', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 3, k: -16 }], pts: [[-1, 0, '−1'], [7, 0, '7']], range: { x: [-4, 10], y: [-18, 6] }, step: 2 })"], 'notes': ['x − 3 = 4 or x − 3 = −4', 'x = 7 or x = −1', 'Two answers: ±'],
             'beats': [B('When something squared equals 16, that something could be 4, or negative 4.', 'When something squared equals sixteen, that something could be four, or negative four.'), B('So x minus 3 is 4, or x minus 3 is negative 4.', 'So x minus three is four, or x minus three is negative four.'), B('That gives x equals 7, or x equals negative 1.', 'That gives x equals seven, or x equals negative one.'), B('On the graph, those are the two places the parabola crosses the x-axis. Forgetting the negative root loses half the answer.')]},
            {'type': 'image', 'heading': 'Completing the square', 'figs': ["Fig.table([['x² + 6x + 4'], ['(x + 3)² = x² + 6x + 9'], ['so x² + 6x + 4 = (x + 3)² − 5']], 'Half of 6 is 3')"], 'notes': ['Half of b: 6 ÷ 2 = 3', '(x + 3)² gives + 9', 'We need + 4, so subtract 5'],
             'beats': [B('Rewrite x squared plus 6x plus 4 as a square plus a number.', 'Rewrite x squared plus six x plus four, as a square plus a number.'), B('Take half of the middle coefficient: half of 6 is 3.', 'Take half of the middle coefficient. Half of six is three.'), B('x plus 3, squared, is x squared plus 6x plus 9.', 'x plus three, squared, is x squared plus six x plus nine.'), B('We only want plus 4, so subtract 5. The vertex is at negative 3, negative 5.', 'We only want plus four, so subtract five. The vertex is at negative three, negative five.')]},
            {'type': 'image', 'heading': 'Highest point of a throw', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: -16, h: 2, k: 64 }], pts: [[2, 64, '(2, 64)']], range: { x: [0, 4.5], y: [0, 80] }, step: 1 })"], 'notes': ['h = −16t² + 64t', 't = −b / (2a) = 64 / 32 = 2', 'h(2) = −64 + 128 = 64 ft'],
             'beats': [B('A ball\'s height is h equals negative 16 t squared plus 64 t.', 'A ball\'s height is h equals negative sixteen t squared, plus sixty-four t.'), B('The top of the parabola is at t equals negative b over 2a: 64 over 32, which is 2 seconds.', 'The top of the parabola is at t equals negative b over two a. Sixty-four over thirty-two is two seconds.'), B('Put 2 back in: negative 64 plus 128 is 64 feet.', 'Put two back in. Negative sixty-four plus one hundred twenty-eight is sixty-four feet.'), B('The ball is highest after 2 seconds, at 64 feet.', 'The ball is highest after two seconds, at sixty-four feet.')]},
            quiz('Solve (x + 2)² = 25', ['x = 3', 'x = 3 or x = −7', 'x = 23'], 'x = 3 or x = −7', 'Your turn. Solve x plus 2, squared, equals 25.', 'x equals 3 or negative 7. x plus 2 is 5 or negative 5. Just 3 forgets the negative root.', ask_say='Your turn. Solve: x plus two, squared, equals twenty-five.', reveal_say='x equals three, or x equals negative seven. x plus two is five, or negative five. Answering only three forgets the negative root.', fig="Fig.graph({ fns: [{ kind: 'quad', a: 1, h: -2, k: -25 }], pts: [[3, 0], [-7, 0]], range: { x: [-10, 6], y: [-28, 6] }, step: 2 })"),
            outro('Practice quadratic forms in MAP Algebra 1.'),
        ],
    },
    {
        'id': 'constraints', 'title': 'Modeling with Constraints', 'subject': 'eei', 'label': 'Modeling',
        'desc': 'At most and at least, two-equation stories, and points that satisfy every inequality.', 'practice': ['eei', 'modelx', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎡', 'title': 'Constraints', 'sub': 'Turning limits into inequalities', 'beats': [B('Real problems come with limits: a budget, a time, a number of seats. In algebra, limits become inequalities.')]},
            {'type': 'image', 'heading': 'At most 80 dollars', 'figs': ["Fig.ineqLine(5.16, '≤', 0, 8)"], 'notes': ['18 + 12n ≤ 80', '12n ≤ 62 → n ≤ 5.16…', 'Whole rides: at most 5'],
             'beats': [B('A fair charges 18 dollars to enter and 12 dollars per ride. You have at most 80 dollars.', 'A fair charges eighteen dollars to enter, and twelve dollars per ride. You have at most eighty dollars.'), B('At most means less than or equal to: 18 plus 12n is at most 80.', 'At most means less than or equal to. Eighteen plus twelve n is at most eighty.'), B('Subtract 18, then divide by 12: n is at most 5.16.', 'Subtract eighteen, then divide by twelve. n is at most five point one six.'), B('You cannot take part of a ride, so the answer is 5 rides.', 'You cannot take part of a ride, so the answer is five rides.')]},
            {'type': 'image', 'heading': 'Two facts, two equations', 'figs': ["Fig.table([['', 'Adult', 'Student', 'Total'], ['Tickets', 'x', 'y', '30'], ['Money', '8x', '3y', '165']])"], 'notes': ['Count: x + y = 30', 'Money: 8x + 3y = 165', 'Solve: x = 15, y = 15'],
             'beats': [B('30 tickets were sold. Adult tickets cost 8 dollars, student tickets 3, and the total was 165 dollars.', 'Thirty tickets were sold. Adult tickets cost eight dollars, student tickets three, and the total was one hundred sixty-five dollars.'), B('One equation counts the tickets: x plus y equals 30.', 'One equation counts the tickets. x plus y equals thirty.'), B('The other adds the money: 8x plus 3y equals 165.', 'The other adds the money. Eight x plus three y equals one hundred sixty-five.'), B('Solving gives 15 adult and 15 student tickets. Check: 120 plus 45 is 165.', 'Solving gives fifteen adult and fifteen student tickets. Check it: one hundred twenty plus forty-five is one hundred sixty-five.')]},
            {'type': 'image', 'heading': 'Does (4, 5) work?', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: -1, b: 10 }, { kind: 'lin', m: -2, b: 15 }], pts: [[4, 5, '(4, 5)']], range: [0, 12], step: 2 })"], 'notes': ['L + S ≤ 10: 9 ≤ 10 ✓', '8L + 4S ≤ 60: 52 ≤ 60 ✓', 'Both true → a solution'],
             'beats': [B('A solution to a system of inequalities must make every one of them true.'), B('Test the point 4, 5 in L plus S is at most 10: 9 is at most 10. True.', 'Test the point four, five in L plus S is at most ten. Nine is at most ten. True.'), B('Now 8L plus 4S is at most 60: 32 plus 20 is 52. True.', 'Now eight L plus four S is at most sixty. Thirty-two plus twenty is fifty-two. True.'), B('Both are true, so 4, 5 is a solution. If even one failed, it would not be.', 'Both are true, so four, five is a solution. If even one failed, it would not be.')]},
            quiz('"At least 12 people" means…', ['p < 12', 'p ≤ 12', 'p ≥ 12'], 'p ≥ 12', 'Your turn. A bus needs at least 12 people. Which inequality fits?', 'p is greater than or equal to 12. At least means 12 or more.', ask_say='Your turn. A bus needs at least twelve people. Which inequality fits?', reveal_say='p is greater than or equal to twelve. At least means twelve or more.', fig="Fig.ineqLine(12, '≥', 6, 18)"),
            outro('Practice modeling in MAP Algebra 1.'),
        ],
    },
    {
        'id': 'rate-of-change', 'title': 'Rate of Change', 'subject': 'func', 'label': 'Rate of change',
        'desc': 'Average rate of change from a table, rate and start in a linear model, and rate of change on a curve.', 'practice': ['func', 'rates', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📈', 'title': 'Rate of Change', 'sub': 'How fast the output changes', 'beats': [B('Rate of change answers one question: when the input goes up by one, how much does the output change?')]},
            {'type': 'image', 'heading': 'From a table', 'figs': ["Fig.table([['x', '2', '6'], ['f(x)', '7', '19']], 'Rise 12, run 4')"], 'notes': ['Change in output: 19 − 7 = 12', 'Change in input: 6 − 2 = 4', '12 ÷ 4 = 3 per unit'],
             'beats': [B('The average rate of change is the change in output over the change in input.'), B('The output goes from 7 to 19: a change of 12.', 'The output goes from seven to nineteen. That is a change of twelve.'), B('The input goes from 2 to 6: a change of 4.', 'The input goes from two to six. That is a change of four.'), B('12 over 4 is 3. The output grows 3 for each 1 the input grows.', 'Twelve over four is three. The output grows three for each one the input grows.')]},
            {'type': 'image', 'heading': 'Rate and start in a model', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 2.5, b: 4 }], pts: [[0, 4, 'start 4']], range: { x: [0, 8], y: [0, 24] }, step: 2 })"], 'notes': ['C = 2.5m + 4', '2.5: dollars per mile (rate)', '4: dollars at 0 miles (start)'],
             'beats': [B('A taxi costs C equals 2.5 m plus 4.', 'A taxi costs C equals two point five m, plus four.'), B('The number multiplied by m is the rate: 2.50 dollars per mile.', 'The number multiplied by m is the rate: two dollars and fifty cents per mile.'), B('The number added alone is the start: 4 dollars before you go anywhere.', 'The number added alone is the start: four dollars before you go anywhere.'), B('On the graph, the start is where the line meets the y-axis, and the rate is its slope.')]},
            {'type': 'image', 'heading': 'On a curve', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 0, k: 0 }, { kind: 'lin', m: 4, b: -3 }], pts: [[1, 1], [3, 9]], range: { x: [-2, 5], y: [-4, 12] }, step: 1 })"], 'notes': ['f(x) = x², from 1 to 3', '(9 − 1) ÷ (3 − 1) = 4', 'Slope of the line through the ends'],
             'beats': [B('A curve has no single slope, but it still has an average rate of change over an interval.'), B('For x squared from 1 to 3, the outputs are 1 and 9.', 'For x squared from one to three, the outputs are one and nine.'), B('9 minus 1 is 8, over 3 minus 1, which is 2: the rate is 4.', 'Nine minus one is eight, over three minus one, which is two. The rate is four.'), B('That is the slope of the line through the two end points.')]},
            quiz('g(1) = 10 and g(5) = 2. Average rate of change?', ['−2', '2', '−8'], '−2', 'Your turn. g of 1 is 10, and g of 5 is 2. What is the average rate of change?', 'Negative 2. The output changes by negative 8 while the input changes by 4. Negative 8 forgets to divide by the run.', ask_say='Your turn. g of one is ten, and g of five is two. What is the average rate of change?', reveal_say='Negative two. The output changes by negative eight while the input changes by four. Negative eight forgets to divide by the run.', fig="Fig.table([['x', '1', '5'], ['g(x)', '10', '2']])"),
            outro('Practice rate of change in MAP Algebra 1.'),
        ],
    },
    {
        'id': 'key-features', 'title': 'Key Features and Comparing Functions', 'subject': 'func', 'label': 'Key features',
        'desc': 'Increasing and decreasing, comparing a formula with a table, and exponential versus linear growth.', 'practice': ['func', 'features', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔎', 'title': 'Key Features', 'sub': 'Reading a function at a glance', 'beats': [B('A good reader of graphs can describe a function in a few words: where it rises, where it falls, where it starts.')]},
            {'type': 'image', 'heading': 'Increasing and decreasing', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 2, k: -3 }], pts: [[2, -3, 'vertex']] })"], 'notes': ['Read left to right', 'Decreasing for x < 2', 'Increasing for x > 2'],
             'beats': [B('Always read a graph from left to right, like a sentence.'), B('Going downhill means decreasing.'), B('This parabola decreases until x equals 2, at its vertex.', 'This parabola decreases until x equals two, at its vertex.'), B('After that it increases.')]},
            {'type': 'image', 'heading': 'Formula versus table', 'figs': ["Fig.table([['x', '0', '1', '2'], ['g(x)', '4', '6', '8']], 'g: slope 2, intercept 4')"], 'notes': ['f(x) = 3x + 1: slope 3, intercept 1', 'g: slope 2, intercept 4', 'f is steeper; g starts higher'],
             'beats': [B('Compare f of x equals 3x plus 1 with the function g in this table.', 'Compare f of x equals three x plus one, with the function g in this table.'), B('f has slope 3 and starts at 1.', 'f has slope three and starts at one.'), B('In the table, g goes up 2 each step and starts at 4.', 'In the table, g goes up two each step, and starts at four.'), B('So f is steeper, but g has the greater y-intercept. Compare the same feature in each.')]},
            {'type': 'image', 'heading': 'Exponential wins eventually', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 10, b: 0 }, { kind: 'exp', a: 1, b: 2 }], range: { x: [0, 8], y: [0, 100] }, step: 1 })"], 'notes': ['At x = 5: 2⁵ = 32 < 50', 'At x = 6: 2⁶ = 64 > 60', 'Growing exponential passes any line'],
             'beats': [B('Compare 2 to the x with 10x.', 'Compare two to the x, with ten x.'), B('At x equals 5, the exponential is only 32, while the line is at 50.', 'At x equals five, the exponential is only thirty-two, while the line is at fifty.'), B('At x equals 6, the exponential is 64 and the line is 60. It has passed!', 'At x equals six, the exponential is sixty-four and the line is sixty. It has passed!'), B('A growing exponential always passes a linear function eventually.')]},
            quiz('Which grows faster in the long run?', ['y = 100x', 'y = 1.5ˣ', 'They grow the same'], 'y = 1.5ˣ', 'Your turn. Which grows faster in the long run: y equals 100x, or y equals 1.5 to the x?', 'y equals 1.5 to the x. It starts small, but multiplying always beats adding in the long run.', ask_say='Your turn. Which grows faster in the long run: y equals one hundred x, or y equals one point five to the x?', reveal_say='y equals one point five to the x. It starts small, but multiplying always beats adding in the long run.', fig="Fig.graph({ fns: [{ kind: 'exp', a: 1, b: 1.5 }], range: { x: [0, 10], y: [0, 60] }, step: 2 })"),
            outro('Practice key features in MAP Algebra 1.'),
        ],
    },
]
