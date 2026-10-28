"""Algebra 1 Quest video lessons (rendered by tools/make_videos.py algebra1).
`text` is the caption; `say` (optional) is what the narrator speaks when it should differ from the caption
(symbols like x², ≤, and fractions are written out in words so the narrator reads them the way a teacher would)."""


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
        'id': 'equations', 'title': 'Solving Linear Equations', 'subject': 'eei', 'label': 'Equations',
        'desc': 'Keep the balance: undo each step on both sides.', 'practice': ['eei', 'lineq', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⚖️', 'title': 'Solving Equations', 'sub': 'Keep both sides balanced', 'beats': [B('An equation is like a balance. Whatever you do to one side, you do to the other.')]},
            {'type': 'image', 'heading': '3x + 5 = 20', 'figs': ["Fig.table([['Step', 'Left', '=', 'Right'], ['Start', '3x + 5', '=', '20'], ['− 5', '3x', '=', '15'], ['÷ 3', 'x', '=', '5']])"], 'notes': ['Undo + 5: subtract 5', 'Undo × 3: divide by 3', 'Check: 3(5) + 5 = 20 ✓'],
             'beats': [B('Solve 3x + 5 = 20.', 'Solve three x plus five equals twenty.'), B('First undo the adding. Subtract 5 from both sides: 3x = 15.', 'First, undo the adding. Subtract five from both sides. Now three x equals fifteen.'),
                       B('Then undo the multiplying. Divide both sides by 3: x = 5.', 'Then undo the multiplying. Divide both sides by three. x equals five.'), B('Check it: 3 times 5, plus 5, is 20. It works!', 'Check it. Three times five, plus five, is twenty. It works!')]},
            {'type': 'image', 'heading': '5x − 3 = 2x + 9', 'figs': ["Fig.table([['Step', 'Left', '=', 'Right'], ['Start', '5x − 3', '=', '2x + 9'], ['− 2x', '3x − 3', '=', '9'], ['+ 3', '3x', '=', '12'], ['÷ 3', 'x', '=', '4']])"], 'notes': ['Collect the x terms on one side', 'Then solve the two-step equation', 'x = 4'],
             'beats': [B('What if x is on both sides?', 'What if x is on both sides?'), B('Subtract 2x from both sides, so all the x terms are on the left: 3x − 3 = 9.', 'Subtract two x from both sides, so all the x terms are on the left. Three x minus three equals nine.'),
                       B('Now it is a two-step equation. Add 3, then divide by 3. x = 4.', 'Now it is a two-step equation. Add three, then divide by three. x equals four.')]},
            quiz('Solve: 4x − 7 = 13', ['x = 5', 'x = 1.5', 'x = 20'], 'x = 5', 'Your turn. Solve 4x − 7 = 13.', 'x = 5. Add 7 to get 4x = 20, then divide by 4.', ask_say='Your turn. Solve four x minus seven equals thirteen.', reveal_say='x equals five. Add seven to get four x equals twenty, then divide by four.', fig="Fig.table([['Left', '=', 'Right'], ['4x − 7', '=', '13']], '⚖️ Keep both sides balanced')"),
            outro('Practice equations in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'inequalities', 'title': 'Inequalities and the Flip', 'subject': 'eei', 'label': 'Inequalities',
        'desc': 'Solve like an equation, graph on a number line, and know when the sign flips.', 'practice': ['eei', 'ineq', 1],
        'scenes': [
            {'type': 'title', 'emoji': '↔️', 'title': 'Inequalities', 'sub': 'Many answers at once', 'beats': [B('An inequality has many solutions, not just one. We show them all on a number line.')]},
            {'type': 'image', 'heading': '2x + 1 > 7', 'figs': ["Fig.ineqLine(3, '>', -3, 9)"], 'notes': ['Solve like an equation: x > 3', 'Open circle: 3 is not included', 'Arrow right: bigger numbers'],
             'beats': [B('Solve 2x + 1 > 7 just like an equation. Subtract 1, then divide by 2: x > 3.', 'Solve two x plus one is greater than seven, just like an equation. Subtract one, then divide by two. x is greater than three.'),
                       B('On the number line, use an open circle at 3, because 3 itself is not a solution.', 'On the number line, use an open circle at three, because three itself is not a solution.'), B('The arrow points right, toward the bigger numbers.')]},
            {'type': 'image', 'heading': '−3x ≤ 12', 'figs': ["Fig.ineqLine(-4, '≥', -8, 4)"], 'notes': ['Divide by −3: FLIP the sign', 'x ≥ −4', 'Closed circle: −4 is included'],
             'beats': [B('Here is the big rule. Solve −3x ≤ 12.', 'Here is the big rule. Solve negative three x is less than or equal to twelve.'), B('We divide both sides by −3. When you divide by a negative number, flip the sign!', 'We divide both sides by negative three. When you divide by a negative number, flip the sign!'),
                       B('So x ≥ −4. The circle is closed, because −4 is included.', 'So x is greater than or equal to negative four. The circle is closed, because negative four is included.')]},
            quiz('Solve: −2x > 10', ['x > −5', 'x < −5', 'x < 5'], 'x < −5', 'Quick check! Solve −2x > 10.', 'x < −5. Dividing by −2 flips the sign.', ask_say='Quick check! Solve negative two x is greater than ten.', reveal_say='x is less than negative five. Dividing by negative two flips the sign.', fig="Fig.ineqLine(-5, '<', -9, 3)"),
            outro('Practice inequalities in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'systems', 'title': 'Systems of Equations', 'subject': 'eei', 'label': 'Systems',
        'desc': 'Where two lines meet, and solving by elimination.', 'practice': ['eei', 'systems', 0],
        'scenes': [
            {'type': 'title', 'emoji': '✖️', 'title': 'Systems of Equations', 'sub': 'One point, two equations', 'beats': [B('A system is two equations at the same time. The solution makes both of them true.')]},
            {'type': 'image', 'heading': 'Where the lines cross', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 1, b: 1 }, { kind: 'lin', m: -1, b: 5 }], pts: [[2, 3, '(2, 3)']] })"], 'notes': ['y = x + 1', 'y = −x + 5', 'They cross at (2, 3)'],
             'beats': [B('Here are two lines: y = x + 1, and y = −x + 5.', 'Here are two lines. y equals x plus one, and y equals negative x plus five.'), B('Every point on a line makes its equation true.'),
                       B('The one point on BOTH lines is where they cross: (2, 3). That is the solution.', 'The one point on both lines is where they cross: two, three. That is the solution.')]},
            {'type': 'image', 'heading': 'Elimination', 'figs': ["Fig.table([['x + y = 10'], ['x − y = 4'], ['add: 2x = 14'], ['x = 7, y = 3']], 'Add to cancel y')"], 'notes': ['+y and −y cancel', '2x = 14, so x = 7', 'Then 7 + y = 10, y = 3'],
             'beats': [B('You can also solve without a graph.'), B('Add the two equations. The y terms cancel, and you get 2x = 14.', 'Add the two equations. The y terms cancel, and you get two x equals fourteen.'),
                       B('So x = 7. Put it back in: 7 + y = 10, so y = 3.', 'So x equals seven. Put it back in. Seven plus y equals ten, so y equals three.')]},
            quiz('x + y = 8 and x − y = 2. What is x?', ['3', '5', '6'], '5', 'Try one. If x + y = 8 and x − y = 2, what is x?', 'x = 5. Adding gives 2x = 10.', ask_say='Try one. If x plus y equals eight, and x minus y equals two, what is x?', reveal_say='x equals five. Adding the equations gives two x equals ten.', fig="Fig.graph({ fns: [{ kind: 'lin', m: -1, b: 8 }, { kind: 'lin', m: 1, b: -2 }], range: [-2, 10] })"),
            outro('Practice systems in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'factoring', 'title': 'Multiplying and Factoring', 'subject': 'eei', 'label': 'Factoring',
        'desc': 'The area model for multiplying binomials, and factoring it back.', 'practice': ['eei', 'factor', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧱', 'title': 'Multiply and Factor', 'sub': 'Two directions on one path', 'beats': [B('Multiplying and factoring are opposites. Learn one, and you can do the other.')]},
            {'type': 'image', 'heading': '(x + 3)(x + 4)', 'figs': ["Fig.table([['×', 'x', '4'], ['x', 'x²', '4x'], ['3', '3x', '12']], 'Area model')"], 'notes': ['Four boxes, four products', '4x + 3x = 7x', 'x² + 7x + 12'],
             'beats': [B('Multiply x + 3 by x + 4 with an area model.', 'Multiply x plus three by x plus four with an area model.'), B('Each box is one product: x squared, 4x, 3x, and 12.', 'Each box is one product: x squared, four x, three x, and twelve.'),
                       B('Combine the two middle terms: x² + 7x + 12.', 'Combine the two middle terms. You get x squared plus seven x plus twelve.')]},
            {'type': 'image', 'heading': 'Factor x² + 7x + 12', 'figs': ["Fig.table([['multiply to 12', 'add to 7'], ['1 · 12', '13'], ['2 · 6', '8'], ['3 · 4', '7 ✓']])"], 'notes': ['Find two numbers', 'that multiply to 12', 'and add to 7: 3 and 4'],
             'beats': [B('Now go backward. To factor x² + 7x + 12, find two numbers that multiply to 12 and add to 7.', 'Now go backward. To factor x squared plus seven x plus twelve, find two numbers that multiply to twelve, and add to seven.'),
                       B('3 and 4 work! So it factors as (x + 3)(x + 4).', 'Three and four work! So it factors as x plus three, times x plus four.')]},
            {'type': 'image', 'heading': 'Solve by factoring', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 1, h: -3.5, k: -0.25 }], pts: [[-3, 0, '−3'], [-4, 0, '−4']], range: { x: [-7, 2], y: [-3, 6] }, step: 1 })"], 'notes': ['(x + 3)(x + 4) = 0', 'x + 3 = 0 or x + 4 = 0', 'x = −3 or x = −4'],
             'beats': [B('If (x + 3)(x + 4) = 0, one of the factors must be zero.', 'If x plus three, times x plus four, equals zero, one of the factors must be zero.'), B('So x = −3 or x = −4. That is where the graph crosses the x-axis.', 'So x equals negative three, or x equals negative four. That is where the graph crosses the x axis.')]},
            quiz('Factor x² + 5x + 6', ['(x + 1)(x + 6)', '(x + 2)(x + 3)', '(x + 5)(x + 1)'], '(x + 2)(x + 3)', 'Your turn. Factor x² + 5x + 6.', '(x + 2)(x + 3). 2 times 3 is 6, and 2 plus 3 is 5.', ask_say='Your turn. Factor x squared plus five x plus six.', reveal_say='x plus two, times x plus three. Two times three is six, and two plus three is five.', fig="Fig.table([['multiply to 6', 'add to 5']])"),
            outro('Practice factoring in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'functions', 'title': 'What Is a Function?', 'subject': 'func', 'label': 'Functions',
        'desc': 'Inputs, outputs, function notation, and the vertical line test.', 'practice': ['func', 'functions', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔁', 'title': 'Functions', 'sub': 'Put something in, get one thing out', 'beats': [B('A function is a rule. You put in an input, and you get exactly one output.')]},
            {'type': 'image', 'heading': 'f(x) = 2x − 1', 'figs': ["Fig.table([['Input x', '0', '1', '2', '3'], ['Output f(x)', '−1', '1', '3', '5']], 'Function machine: input → output')"], 'notes': ['f(3) means: put in 3', '2(3) − 1 = 5', 'So f(3) = 5'],
             'beats': [B('Here is the function f(x) = 2x − 1.', 'Here is the function f of x equals two x minus one.'), B('f(3) means: put in 3. Two times 3, minus 1, is 5.', 'f of three means: put in three. Two times three, minus one, is five.'), B('So f(3) = 5.', 'So f of three equals five.')]},
            {'type': 'image', 'heading': 'The vertical line test', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 0.5, h: 0, k: -2 }] })", "Fig.graph({ fns: [{ kind: 'v', x: 2 }] })"], 'show': [0, 0, 1], 'notes': ['Parabola: a function', 'Vertical line: not a function', 'One x, many y values'],
             'beats': [B('On a graph, slide a vertical line across.'), B('If it never touches the graph twice, the graph is a function. This parabola passes.'), B('A vertical line fails: one input, x = 2, has many outputs.', 'A vertical line fails. One input, x equals two, has many outputs.')]},
            quiz('If f(x) = 3x + 4, what is f(2)?', ['9', '10', '18'], '10', 'Quick check! If f(x) = 3x + 4, what is f(2)?', '10. Three times 2 is 6, plus 4 is 10.', ask_say='Quick check! If f of x equals three x plus four, what is f of two?', reveal_say='Ten. Three times two is six, plus four is ten.', fig="Fig.table([['Input x', '2'], ['Output f(x)', '?']], 'Function machine: input → output')"),
            outro('Practice functions in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'slope', 'title': 'Slope and y = mx + b', 'subject': 'func', 'label': 'Lines',
        'desc': 'Rise over run, the y-intercept, and graphing a line.', 'practice': ['func', 'linear', 1],
        'scenes': [
            {'type': 'title', 'emoji': '📈', 'title': 'Slope', 'sub': 'How steep is the line?', 'beats': [B('Slope tells you how steep a line is, and which way it goes.')]},
            {'type': 'image', 'heading': 'Rise over run', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 3, b: -1 }], pts: [[1, 2, '(1, 2)'], [3, 8, '(3, 8)']], range: [-2, 10], step: 2 })"], 'notes': ['Rise: 8 − 2 = 6', 'Run: 3 − 1 = 2', 'Slope = 6 / 2 = 3'],
             'beats': [B('Go from (1, 2) to (3, 8).', 'Go from the point one, two, to the point three, eight.'), B('The line rises 6 and runs 2.', 'The line rises six, and runs two.'), B('Slope is rise over run: 6 over 2, which is 3.', 'Slope is rise over run. Six over two, which is three.')]},
            {'type': 'image', 'heading': 'y = 2x − 3', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 2, b: -3 }], pts: [[0, -3, '(0, −3)'], [1, -1], [2, 1]] })"], 'notes': ['m = 2: the slope', 'b = −3: the y-intercept', 'Start at (0, −3), up 2, right 1'],
             'beats': [B('In y = mx + b, m is the slope and b is where the line crosses the y-axis.', 'In y equals m x plus b, m is the slope, and b is where the line crosses the y axis.'),
                       B('For y = 2x − 3, start at (0, −3).', 'For y equals two x minus three, start at zero, negative three.'), B('Then go up 2 and right 1, again and again. Connect the dots.', 'Then go up two and right one, again and again. Connect the dots.')]},
            quiz('What is the slope of y = −4x + 1?', ['1', '−4', '4'], '−4', 'Your turn. What is the slope of y = −4x + 1?', '−4. The slope is the number in front of x.', ask_say='Your turn. What is the slope of y equals negative four x plus one?', reveal_say='Negative four. The slope is the number in front of x.', fig="Fig.graph({ fns: [{ kind: 'lin', m: -4, b: 1 }] })"),
            outro('Practice graphing lines in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'exponential', 'title': 'Linear vs. Exponential', 'subject': 'func', 'label': 'Exponential',
        'desc': 'Adding the same amount versus multiplying by the same amount.', 'practice': ['func', 'expo', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🚀', 'title': 'Exponential Growth', 'sub': 'Multiply, multiply, multiply', 'beats': [B('Some things grow by adding. Others grow by multiplying, and that is much faster.')]},
            {'type': 'image', 'heading': 'Add or multiply?', 'figs': ["Fig.table([['x', '0', '1', '2', '3', '4'], ['Linear: + 3', '1', '4', '7', '10', '13'], ['Exponential: × 3', '1', '3', '9', '27', '81']])"], 'notes': ['Linear: add the same amount', 'Exponential: multiply by the same amount', 'Exponential wins in the long run'],
             'beats': [B('Linear functions add the same amount each step: 1, 4, 7, 10.', 'Linear functions add the same amount each step. One, four, seven, ten.'),
                       B('Exponential functions multiply by the same amount: 1, 3, 9, 27.', 'Exponential functions multiply by the same amount. One, three, nine, twenty-seven.'), B('Early on they are close. Later, the exponential one races ahead.')]},
            {'type': 'image', 'heading': 'y = a(b)ˣ', 'figs': ["Fig.graph({ fns: [{ kind: 'exp', a: 1, b: 1.5 }, { kind: 'exp', a: 4, b: 0.6 }], range: { x: [0, 6], y: [0, 6] }, step: 1 })"], 'notes': ['a = the starting amount', 'b > 1: growth', 'b < 1: decay'],
             'beats': [B('In y = a times b to the x, a is where you start, and b is the factor each step.', 'In y equals a times b to the x, a is where you start, and b is the factor each step.'),
                       B('If b is more than 1, it grows. A base of 1.08 means growth of 8 percent.', 'If b is more than one, it grows. A base of one point oh eight means growth of eight percent.'), B('If b is less than 1, it decays, like a cooling cup of cocoa.', 'If b is less than one, it decays, like a cooling cup of cocoa.')]},
            quiz('2, 6, 18, 54, … is…', ['linear', 'exponential', 'neither'], 'exponential', 'Quick quiz! Is 2, 6, 18, 54 linear or exponential?', 'Exponential! Each term is multiplied by 3.', ask_say='Quick quiz! Is two, six, eighteen, fifty-four linear, or exponential?', reveal_say='Exponential! Each term is multiplied by three.', fig="Fig.table([['x', '0', '1', '2', '3'], ['y', '2', '6', '18', '54']])"),
            outro('Practice exponential functions in Algebra 1 Quest!'),
        ],
    },
    {
        'id': 'parabolas', 'title': 'Parabolas', 'subject': 'func', 'label': 'Quadratics',
        'desc': 'The vertex, the zeros, and sliding a parabola around.', 'practice': ['func', 'quadfn', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⛰️', 'title': 'Parabolas', 'sub': 'The shape of a quadratic', 'beats': [B('The graph of a quadratic function is a U-shaped curve called a parabola.')]},
            {'type': 'image', 'heading': 'y = (x − 3)² + 1', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 3, k: 1 }, { kind: 'v', x: 3 }], pts: [[3, 1, '(3, 1)']], range: [-2, 8], step: 2 })"], 'notes': ['Vertex form: a(x − h)² + k', 'Vertex (h, k) = (3, 1)', 'Axis of symmetry: x = 3'],
             'beats': [B('In vertex form, y = a times (x − h)² + k, the vertex is (h, k).', 'In vertex form, y equals a times x minus h, squared, plus k. The vertex is the point h, k.'),
                       B('For (x − 3)² + 1, the vertex is (3, 1). Watch the sign: minus 3 inside means 3.', 'For x minus three, squared, plus one, the vertex is three, one. Watch the sign: minus three inside means positive three.'), B('The parabola is a mirror image across the line x = 3.', 'The parabola is a mirror image across the line x equals three.')]},
            {'type': 'image', 'heading': 'Zeros and direction', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: -1, h: 3, k: 4 }], pts: [[1, 0, '1'], [5, 0, '5']], range: { x: [-2, 8], y: [-5, 5] } })"], 'notes': ['a < 0: opens down', 'The vertex is a maximum', 'Zeros: x = 1 and x = 5'],
             'beats': [B('When a is negative, the parabola opens down, and the vertex is the highest point.'), B('The zeros are where it crosses the x-axis. This one crosses at 1 and 5.', 'The zeros are where it crosses the x axis. This one crosses at one and five.')]},
            quiz('Vertex of y = (x + 2)² − 5?', ['(2, −5)', '(−2, −5)', '(−2, 5)'], '(−2, −5)', 'Your turn. What is the vertex of y = (x + 2)² − 5?', '(−2, −5). Plus 2 inside means h is −2.', ask_say='Your turn. What is the vertex of y equals x plus two, squared, minus five?', reveal_say='Negative two, negative five. Plus two inside means h is negative two.', fig="Fig.graph({ fns: [{ kind: 'quad', a: 1, h: -2, k: -5 }], range: [-7, 5] })"),
            outro('Practice quadratic functions in Algebra 1 Quest!'),
        ],
    },
    # ---- added 2026-10-27 (plan item 3): one video for each skill that had none ----
    {
        'id': 'real-numbers', 'title': 'Rational, Irrational, and Properties', 'subject': 'real', 'label': 'Real numbers',
        'desc': 'Which numbers are rational, where irrational numbers sit on the line, and the three properties.', 'practice': ['real', 'realnum', 0],
        'scenes': [
            {'type': 'title', 'emoji': '♾️', 'title': 'The Real Numbers', 'sub': 'Rational, irrational, and the rules they follow', 'beats': [B('Every point on the number line is a real number. Some can be written as fractions, and some never can.')]},
            {'type': 'image', 'heading': 'Rational or irrational?', 'figs': ["Fig.table([['Number', 'As a fraction?', 'Type'], ['0.25', '1/4', 'rational'], ['0.333…', '1/3', 'rational'], ['√49', '7/1', 'rational'], ['√20', 'never', 'irrational'], ['π', 'never', 'irrational']])"], 'notes': ['Ends or repeats → rational', 'Perfect square root → rational', 'Never ends, never repeats → irrational'],
             'beats': [B('A rational number can be written as a fraction of two integers.'), B('Decimals that end, like 0.25, or repeat, like 0.333, are rational.', 'Decimals that end, like zero point two five, or repeat, like zero point three three three, are rational.'),
                       B('The square root of a perfect square is rational too: root 49 is 7.', 'The square root of a perfect square is rational too. The square root of forty-nine is seven.'), B('But root 20 and pi never end and never repeat. They are irrational.', 'But the square root of twenty, and pi, never end and never repeat. They are irrational.')]},
            {'type': 'image', 'heading': 'Placing them on the line', 'figs': ["Fig.numLine(0, 5, 1, { marks: [{ v: 1.41421356, label: '√2' }, { v: 3.14159265, label: 'π' }, { v: 4.47213595, label: '√20' }] })"], 'notes': ['√2 ≈ 1.41', 'π ≈ 3.14', '√20: between 4 and 5 (16 < 20 < 25)'],
             'beats': [B('Irrational numbers still have exact places on the number line.'), B('Root 2 is about 1.41.', 'The square root of two is about one point four one.'), B('Pi is about 3.14.', 'Pi is about three point one four.'),
                       B('Root 20 is between 4 and 5, because 20 is between 16 and 25.', 'The square root of twenty is between four and five, because twenty is between sixteen and twenty-five.')]},
            {'type': 'image', 'heading': 'Three properties', 'figs': ["Fig.table([['Property', 'Example'], ['Commutative', 'x + 5 = 5 + x'], ['Associative', '(2 + x) + 3 = 2 + (x + 3)'], ['Distributive', '3(x + 4) = 3x + 12']])"], 'notes': ['Order changes', 'Grouping changes', 'Multiply every term inside'],
             'beats': [B('Three properties let you rewrite expressions safely.'), B('Commutative: the order can change. x plus 5 equals 5 plus x.', 'Commutative: the order can change. x plus five equals five plus x.'), B('Associative: the grouping can change.'),
                       B('Distributive: a number outside parentheses multiplies every term inside. 3 times x plus 4 is 3x plus 12.', 'Distributive: a number outside parentheses multiplies every term inside. Three times the quantity x plus four is three x plus twelve.')]},
            quiz('Which number is irrational?', ['√36', '0.454545…', '√15'], '√15', 'Your turn. Which number is irrational: root 36, zero point four five repeating, or root 15?', 'Root 15. 15 is not a perfect square, so its root never ends or repeats. Root 36 is 6, and a repeating decimal is rational.', ask_say='Your turn. Which number is irrational: the square root of thirty-six, zero point four five repeating, or the square root of fifteen?', reveal_say='The square root of fifteen. Fifteen is not a perfect square, so its root never ends and never repeats. The square root of thirty-six is six, and a repeating decimal is rational.', fig="Fig.numLine(3, 7, 1, { marks: [{ v: 3.87298335, label: '√15' }, { v: 6, label: '√36' }] })"),
            outro('Practice real numbers in Algebra 1 Quest.'),
        ],
    },
    {
        'id': 'exponent-rules', 'title': 'Exponent Rules and Radicals', 'subject': 'real', 'label': 'Exponents',
        'desc': 'Add, subtract, or multiply exponents; zero and negative exponents; simplifying square roots.', 'practice': ['real', 'exponents', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔺', 'title': 'Exponent Rules', 'sub': 'Shortcuts you can prove', 'beats': [B('Every exponent rule comes from one idea: an exponent counts how many times a base is multiplied.')]},
            {'type': 'image', 'heading': 'Same base: three rules', 'figs': ["Fig.table([['Rule', 'Example', 'Why'], ['multiply → add', 'x³ · x⁴ = x⁷', '3 x\\'s and 4 more x\\'s'], ['divide → subtract', 'x⁸ / x² = x⁶', '2 x\\'s cancel'], ['power of a power → multiply', '(x²)³ = x⁶', '3 groups of 2']])"], 'notes': ['x³ · x⁴ = x⁷', 'x⁸ / x² = x⁶', '(x²)³ = x⁶'],
             'beats': [B('All three rules need the same base.'), B('Multiply, and you add the exponents. x cubed times x to the fourth is x to the seventh, because that is 7 x\'s in all.', 'Multiply, and you add the exponents. x cubed times x to the fourth is x to the seventh, because that is seven x\'s in all.'),
                       B('Divide, and you subtract. x to the eighth over x squared is x to the sixth.'), B('A power of a power multiplies. x squared, cubed, is x to the sixth.')]},
            {'type': 'image', 'heading': 'Zero and negative exponents', 'figs': ["Fig.table([['2³', '2²', '2¹', '2⁰', '2⁻¹', '2⁻²'], ['8', '4', '2', '1', '1/2', '1/4']], 'Divide by 2 each step')"], 'notes': ['Each step left to right: ÷ 2', '2⁰ = 1', '2⁻² = 1/2² = 1/4'],
             'beats': [B('Why is anything to the zero power equal to 1? Follow the pattern.'), B('Each time the exponent goes down by 1, we divide by 2.', 'Each time the exponent goes down by one, we divide by two.'), B('8, 4, 2, then 1. So 2 to the zero is 1.', 'Eight, four, two, then one. So two to the zero is one.'), B('Keep going: 2 to the negative 2 is one over 2 squared, one fourth.', 'Keep going. Two to the negative two is one over two squared, one fourth.')]},
            {'type': 'image', 'heading': 'Simplifying √72', 'figs': ["Fig.table([['Find a perfect square factor', '72 = 36 × 2'], ['Take its root', '√36 = 6'], ['Answer', '6√2']])"], 'notes': ['Biggest perfect square: 36', '√72 = √36 · √2', '= 6√2'],
             'beats': [B('To simplify a square root, look for the biggest perfect square factor.', ), B('72 is 36 times 2.', 'Seventy-two is thirty-six times two.'), B('Root 72 is root 36 times root 2.', 'The square root of seventy-two is the square root of thirty-six times the square root of two.'), B('That is 6 root 2.', 'That is six root two.')]},
            quiz('Simplify: x⁵ · x³', ['x¹⁵', 'x⁸', 'x²'], 'x⁸', 'Your turn. Simplify x to the fifth times x cubed.', 'x to the eighth. Multiplying with the same base adds the exponents: 5 plus 3. x to the fifteenth is the common mistake.', fig="Fig.table([['x⁵', '·', 'x³'], ['5 x\\'s', '', '3 x\\'s']])"),
            outro('Practice exponents in Algebra 1 Quest.'),
        ],
    },
    {
        'id': 'units', 'title': 'Unit Rates and Converting Units', 'subject': 'real', 'label': 'Units',
        'desc': 'Rates per one unit, converting with fractions equal to 1, and density.', 'practice': ['real', 'units', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📏', 'title': 'Units and Rates', 'sub': 'Let the units do the work', 'beats': [B('Units are not decoration. If you track them, they tell you whether to multiply or divide.')]},
            {'type': 'image', 'heading': 'Unit rate: per one', 'figs': ["Fig.table([['Pounds', '4', '1'], ['Cost ($)', '18', '4.50']], '÷ 4 to get one pound')"], 'notes': ['$18 for 4 pounds', '18 ÷ 4 = 4.50', '$4.50 per pound'],
             'beats': [B('A unit rate tells you how much for one unit.'), B('Apples cost 18 dollars for 4 pounds.', 'Apples cost eighteen dollars for four pounds.'), B('Divide by 4 to get one pound: 18 divided by 4 is 4.50.', 'Divide by four to get one pound. Eighteen divided by four is four fifty.'), B('That is 4 dollars and 50 cents per pound.', 'That is four dollars and fifty cents per pound.')]},
            {'type': 'image', 'heading': 'Convert by multiplying by 1', 'figs': ["Fig.table([['3 miles / 1 min', '× 60 min / 1 h', '= 180 miles / h']], 'Minutes cancel')"], 'notes': ['60 min / 1 h is equal to 1', 'min on top cancels min below', '180 miles per hour'],
             'beats': [B('To convert 3 miles per minute into miles per hour, multiply by a fraction equal to 1.', 'To convert three miles per minute into miles per hour, multiply by a fraction equal to one.'), B('60 minutes over 1 hour equals 1, because they are the same amount of time.', 'Sixty minutes over one hour equals one, because they are the same amount of time.'),
                       B('Minutes on the bottom cancel minutes on the top, just like numbers.'), B('What is left is 180 miles per hour.', 'What is left is one hundred eighty miles per hour.')]},
            {'type': 'image', 'heading': 'Density: amount per area', 'figs': ["Fig.picture(['🏘️', '🏘️', '🏘️'], '1,200 people in 3 square miles')"], 'notes': ['1,200 ÷ 3 = 400', '400 people per square mile'],
             'beats': [B('Density is an amount per unit of area or volume.'), B('1,200 people live in 3 square miles. 1,200 divided by 3 is 400.', 'Twelve hundred people live in three square miles. Twelve hundred divided by three is four hundred.'), B('The density is 400 people per square mile.', 'The density is four hundred people per square mile.')]},
            quiz('A car goes 150 miles in 3 hours. What is its unit rate?', ['50 miles per hour', '450 miles per hour', '153 miles per hour'], '50 miles per hour', 'Your turn. A car goes 150 miles in 3 hours. What is its unit rate?', '50 miles per hour. Miles per hour means miles divided by hours: 150 divided by 3.', ask_say='Your turn. A car goes one hundred fifty miles in three hours. What is its unit rate?', reveal_say='Fifty miles per hour. Miles per hour means miles divided by hours: one hundred fifty divided by three.', fig="Fig.table([['Hours', '3', '1'], ['Miles', '150', '?']])"),
            outro('Practice units in Algebra 1 Quest.'),
        ],
    },
    {
        'id': 'expressions', 'title': 'Expressions: Terms, Distributing, Combining', 'subject': 'eei', 'label': 'Expressions',
        'desc': 'The parts of an expression, evaluating with negatives, distributing, combining like terms, and factoring out the GCF.', 'practice': ['eei', 'exprs', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧩', 'title': 'Expressions', 'sub': 'Read them, rewrite them', 'beats': [B('Before you solve equations, you need to read and rewrite expressions with confidence.')]},
            {'type': 'image', 'heading': 'Parts of an expression', 'figs': ["Fig.table([['Term', '3x²', '−2x', '+5'], ['Kind', 'coefficient 3', 'coefficient −2', 'constant']])"], 'notes': ['Terms are added parts', 'Coefficient: multiplies the variable', 'Constant: no variable'],
             'beats': [B('Here is 3x squared minus 2x plus 5.', 'Here is three x squared, minus two x, plus five.'), B('It has three terms. Terms are the parts that are added.'), B('A coefficient multiplies a variable. The minus sign goes with it, so this coefficient is negative 2.', 'A coefficient multiplies a variable. The minus sign goes with it, so this coefficient is negative two.'), B('A constant, like 5, has no variable.', 'A constant, like five, has no variable.')]},
            {'type': 'image', 'heading': 'Evaluate at x = −1', 'figs': ["Fig.table([['Term', '3x²', '−2x', '+5'], ['x = −1', '3(−1)² = 3', '−2(−1) = 2', '5'], ['Total', '', '10', '']])"], 'notes': ['Put −1 in parentheses', '(−1)² = 1, so 3x² = 3', '3 + 2 + 5 = 10'],
             'beats': [B('To evaluate, replace x with its value, in parentheses.'), B('Use x equals negative 1.', 'Use x equals negative one.'), B('Negative 1 squared is positive 1, so the first term is 3.', 'Negative one squared is positive one, so the first term is three.'), B('Negative 2 times negative 1 is positive 2. Add them: 3 plus 2 plus 5 is 10.', 'Negative two times negative one is positive two. Add them up: three plus two plus five is ten.')]},
            {'type': 'image', 'heading': 'Distribute, then combine', 'figs': ["Fig.table([['', '2x', '−4'], ['3', '6x', '−12']], '3(2x − 4) + 5x')"], 'notes': ['3 times EVERY term', '6x − 12 + 5x', '= 11x − 12'],
             'beats': [B('Simplify 3 times 2x minus 4, plus 5x.', 'Simplify three times the quantity two x minus four, plus five x.'), B('Distribute: 3 multiplies every term inside. That gives 6x minus 12.', 'Distribute. Three multiplies every term inside. That gives six x minus twelve.'), B('Now we have 6x minus 12 plus 5x.', 'Now we have six x minus twelve plus five x.'), B('Combine like terms: 6x plus 5x is 11x. The answer is 11x minus 12.', 'Combine like terms. Six x plus five x is eleven x. The answer is eleven x minus twelve.')]},
            {'type': 'image', 'heading': 'Factoring undoes distributing', 'figs': ["Fig.table([['', '2x', '3'], ['6', '12x', '18']], '12x + 18 = 6(2x + 3)')"], 'notes': ['GCF of 12 and 18: 6', 'Divide each term by 6', '6(2x + 3)'],
             'beats': [B('Factoring goes the other way.'), B('For 12x plus 18, the greatest common factor is 6.', 'For twelve x plus eighteen, the greatest common factor is six.'), B('Divide each term by 6: 2x and 3.', 'Divide each term by six: two x, and three.'), B('So 12x plus 18 equals 6 times 2x plus 3.', 'So twelve x plus eighteen equals six times the quantity two x plus three.')]},
            quiz('Simplify: 4(x + 2) − x', ['3x + 8', '3x + 2', '5x + 8'], '3x + 8', 'Your turn. Simplify 4 times x plus 2, minus x.', '3x plus 8. Distribute to get 4x plus 8, then 4x minus x is 3x. 3x plus 2 forgets to multiply the 2.', ask_say='Your turn. Simplify four times the quantity x plus two, minus x.', reveal_say='Three x plus eight. Distribute to get four x plus eight, then four x minus x is three x. Three x plus two forgets to multiply the two.', fig="Fig.table([['', 'x', '+2'], ['4', '4x', '+8']])"),
            outro('Practice expressions in Algebra 1 Quest.'),
        ],
    },
    {
        'id': 'sequences', 'title': 'Arithmetic and Geometric Sequences', 'subject': 'func', 'label': 'Sequences',
        'desc': 'Add the same amount or multiply by the same amount, and jump to any term with a formula.', 'practice': ['func', 'seq', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🪜', 'title': 'Sequences', 'sub': 'Patterns with a formula', 'beats': [B('A sequence is a list of numbers in order. Two kinds show up again and again.')]},
            {'type': 'image', 'heading': 'Add, or multiply?', 'figs': ["Fig.table([['Arithmetic', '5', '8', '11', '14', '+3 each'], ['Geometric', '2', '6', '18', '54', '× 3 each']])"], 'notes': ['Arithmetic: common difference', 'Geometric: common ratio', 'Next: 17 and 162'],
             'beats': [B('Arithmetic sequences add the same number each time.'), B('5, 8, 11, 14 adds 3 each time. That 3 is the common difference.', 'Five, eight, eleven, fourteen adds three each time. That three is the common difference.'), B('Geometric sequences multiply by the same number. 2, 6, 18, 54 multiplies by 3, the common ratio.', 'Geometric sequences multiply by the same number. Two, six, eighteen, fifty-four multiplies by three, the common ratio.'), B('So the next terms are 17 and 162.', 'So the next terms are seventeen and one hundred sixty-two.')]},
            {'type': 'image', 'heading': 'Jump to the 20th term', 'figs': ["Fig.table([['n', '1', '2', '3', '…', '20'], ['aₙ', '4', '7', '10', '…', '?']], 'a₁ = 4, d = 3')"], 'notes': ['aₙ = a₁ + d(n − 1)', 'a₂₀ = 4 + 3 · 19', '= 61'],
             'beats': [B('You do not have to list 20 terms to find the 20th.', 'You do not have to list twenty terms to find the twentieth.'), B('Use the formula: a sub n equals a sub 1 plus d times n minus 1.', 'Use the formula: a sub n equals a sub one, plus d times the quantity n minus one.'), B('The 20th term is 19 steps after the first: 4 plus 3 times 19.', 'The twentieth term is nineteen steps after the first: four plus three times nineteen.'), B('That is 61.', 'That is sixty-one.')]},
            {'type': 'image', 'heading': 'Write the formula', 'figs': ["Fig.table([['n', '1', '2', '3'], ['5n + 2', '7', '12', '17']], 'Check: it matches')"], 'notes': ['7, 12, 17: a₁ = 7, d = 5', '7 + 5(n − 1) = 5n + 2', 'Check n = 1: 7 ✓'],
             'beats': [B('Write a formula for 7, 12, 17, and so on.', 'Write a formula for seven, twelve, seventeen, and so on.'), B('The first term is 7 and the difference is 5.', 'The first term is seven and the difference is five.'), B('7 plus 5 times n minus 1 simplifies to 5n plus 2.', 'Seven plus five times the quantity n minus one simplifies to five n plus two.'), B('Always check: when n is 1, 5 plus 2 is 7. It matches.', 'Always check. When n is one, five plus two is seven. It matches.')]},
            quiz('3, 12, 48, 192, … What is the next term?', ['207', '576', '768'], '768', 'Your turn. 3, 12, 48, 192. What comes next?', '768. Each term is 4 times the one before, so it is geometric with ratio 4.', ask_say='Your turn. Three, twelve, forty-eight, one hundred ninety-two. What comes next?', reveal_say='Seven hundred sixty-eight. Each term is four times the one before, so it is geometric with ratio four.', fig="Fig.table([['3', '12', '48', '192', '?'], ['', '× 4', '× 4', '× 4', '× ?']])"),
            outro('Practice sequences in Algebra 1 Quest.'),
        ],
    },
    {
        'id': 'statistics', 'title': 'Center, Spread, and Correlation', 'subject': 'func', 'label': 'Statistics',
        'desc': 'Mean and median, IQR and outliers, scatter plots, lines of fit, and correlation versus causation.', 'practice': ['func', 'stats', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📊', 'title': 'Statistics', 'sub': 'What data can and cannot tell you', 'beats': [B('Statistics turns a pile of numbers into a few honest summaries.')]},
            {'type': 'image', 'heading': 'Mean and median', 'figs': ["Fig.table([['In order', '3', '4', '8', '9'], ['Middle?', '', '✓', '✓', '']], 'Median = (4 + 8) / 2 = 6')"], 'notes': ['Mean: 24 ÷ 4 = 6', 'Median: middle of the ordered list', 'Two middles: average them'],
             'beats': [B('Take the data 3, 9, 4, and 8.', 'Take the data three, nine, four, and eight.'), B('The mean adds them and divides by how many: 24 divided by 4 is 6.', 'The mean adds them and divides by how many. Twenty-four divided by four is six.'), B('The median is the middle value, once the list is in order.'), B('Here there are two middle values, 4 and 8, so the median is their average, 6.', 'Here there are two middle values, four and eight, so the median is their average, six.')]},
            {'type': 'image', 'heading': 'Spread: the IQR', 'figs': ["Fig.boxPlot([2, 4, 8, 12, 14], 0, 16, 2, 'Data: 2, 4, 6, 8, 10, 12, 14')"], 'notes': ['Q1 = 4, Q3 = 12', 'IQR = 12 − 4 = 8', 'An outlier pulls the mean, not the median'],
             'beats': [B('The interquartile range measures the spread of the middle half.'), B('Here the first quartile is 4 and the third quartile is 12.', 'Here the first quartile is four and the third quartile is twelve.'), B('The I Q R is 12 minus 4, which is 8.', 'The I. Q. R. is twelve minus four, which is eight.'), B('One huge outlier would drag the mean a lot, but barely move the median.')]},
            {'type': 'image', 'heading': 'Scatter plots and lines of fit', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 0.8, b: 1 }], pts: [[1, 2], [2, 2], [3, 4], [4, 4], [5, 5], [6, 6], [7, 7], [8, 7]], range: [0, 10] })"], 'notes': ['Up to the right: positive correlation', 'The line makes predictions', 'Correlation is not causation'],
             'beats': [B('A scatter plot shows pairs of data as points.'), B('These points rise to the right, so there is a positive correlation.'), B('A line of best fit lets us predict values we did not measure.'), B('But careful: two things moving together does not prove one causes the other.')]},
            quiz('Ice cream sales and sunburns rise together. What is the best conclusion?', ['Eating ice cream causes sunburns', 'Hot weather may cause both', 'Sunburns make people want ice cream'], 'Hot weather may cause both', 'Your turn. Ice cream sales and sunburns rise together. What is the best conclusion?', 'They are correlated, and a third thing, hot sunny weather, may cause both. Correlation alone does not prove causation.', fig="Fig.picture(['🍦', '☀️', '🧴'])"),
            outro('Practice statistics in Algebra 1 Quest.'),
        ],
    },
]
