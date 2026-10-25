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
]
