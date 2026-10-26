"""SAT Prep video lessons (rendered by tools/make_videos.py satprep).
`text` is the caption; `say` (optional) is what the narrator speaks when it should differ from the caption.
Test facts come from College Board's 2026-27 SAT Student Guide (see HANDOFF.md)."""


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
        'id': 'sat-tips', 'title': 'How the Digital SAT Works', 'subject': 'rw', 'color': 'c1', 'label': 'Test basics',
        'desc': 'Two sections, two modules each, and how the second module adapts.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🎯', 'title': 'The Digital SAT', 'sub': 'How the test is built', 'beats': [B('Here is how the digital SAT works, so nothing on test day surprises you.')]},
            {'type': 'image', 'heading': 'Two sections', 'figs': ["Fig.table([['Section', 'Questions', 'Time'], ['Reading and Writing', '54', '64 min'], ['Math', '44', '70 min']])"], 'notes': ['Two modules per section', 'A break between sections', 'Scores: 200–800 each'],
             'beats': [B('The test has two sections: Reading and Writing, then Math.'), B('Reading and Writing has 54 questions in 64 minutes. Math has 44 questions in 70 minutes.', 'Reading and Writing has fifty-four questions in sixty-four minutes. Math has forty-four questions in seventy minutes.'),
                       B('Each section is scored from 200 to 800, for a total from 400 to 1600.', 'Each section is scored from two hundred to eight hundred, for a total from four hundred to sixteen hundred.')]},
            {'type': 'image', 'heading': 'The second module adapts', 'figs': ["Fig.picture(['1️⃣', '➡️', '2️⃣'])"], 'notes': ['Module 1: a mix', 'Module 2: easier or harder', 'No going back to module 1'],
             'beats': [B('Each section has two timed modules.'), B('How you do on module 1 decides whether module 2 is easier or harder.'), B('Inside a module, you can skip, go back, and mark questions for review. Once time is up, the module is locked.')]},
            {'type': 'image', 'heading': 'Never leave a blank', 'figs': ["Fig.picture(['✅'])"], 'notes': ['A blank is never right', 'Eliminate, then guess', 'Watch the clock'],
             'beats': [B('A blank answer can never be right. If you are unsure, cross out what you can and make your best guess.')]},
            quiz('Inside a module, can you go back to an earlier question?', ['Yes, until time runs out', 'No, never', 'Only in Math'], 'Yes, until time runs out', 'Quick quiz! Inside a module, can you go back to an earlier question?', 'Yes, until time runs out or you submit the module.', fig="Fig.picture(['↩️'])"),
            outro('Try a practice test in SAT Prep!'),
        ],
    },
    {
        'id': 'rw-strategy', 'title': 'Reading Short Passages', 'subject': 'rw', 'label': 'Reading',
        'desc': 'Main ideas, word choice, and clue words in short texts.', 'practice': ['rw', 'cid', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📖', 'title': 'Short Passages', 'sub': 'One passage, one question', 'beats': [B('Every Reading and Writing question has its own short passage. Here is how to read them fast and well.')]},
            {'type': 'image', 'heading': 'Main idea: the whole text', 'figs': ["Fig.table([['Too narrow', 'Just right', 'Too broad'], ['one detail', 'the whole text', 'beyond the text']])"], 'notes': ['Read every sentence', 'Look for the turn: however, but', 'Pick the choice that covers it all'],
             'beats': [B('For a main idea question, the right answer covers the whole passage, not just one detail.'), B('Watch for turning words like however or but. The idea after the turn is often the main point.')]},
            {'type': 'image', 'heading': 'Words in context', 'figs': ["Fig.table([['Signal', 'Means'], ['although, rather than', 'contrast'], ['because, so', 'cause'], ['colon', 'explanation']])"], 'notes': ['Cover the choices', 'Predict your own word', 'Match meaning and tone'],
             'beats': [B('For a missing word, cover the choices and predict your own word first.'), B('Clue words help. Although and rather than signal a contrast. Because signals a cause.')]},
            quiz('“Rather than ___ the plan, the mayor supported it.”', ['oppose', 'announce', 'celebrate'], 'oppose', 'Your turn. Rather than blank the plan, the mayor supported it. Which word fits?', 'Oppose! Rather than signals the opposite of supported.', fig="Fig.picture(['🔤'])"),
            outro('Practice Central Ideas in SAT Prep!'),
        ],
    },
    {
        'id': 'rw-punctuation', 'title': 'Sentence Boundaries and Agreement', 'subject': 'rw', 'label': 'Conventions',
        'desc': 'Commas, semicolons, colons, and verbs that match their subjects.', 'practice': ['rw', 'bound', 0],
        'scenes': [
            {'type': 'title', 'emoji': '✍️', 'title': 'Conventions', 'sub': 'Punctuation and agreement', 'beats': [B('Grammar questions test a small set of rules. Learn them once, and you can use them every time.')]},
            {'type': 'image', 'heading': 'Joining two sentences', 'figs': ["Fig.table([['Between two sentences', 'OK?'], ['period', '✓'], ['semicolon', '✓'], [', and', '✓'], ['comma alone', '✗']])"], 'notes': ['Two complete sentences', 'Period or semicolon', 'Or comma plus and'],
             'beats': [B('If both sides of a blank are complete sentences, you need a period, a semicolon, or a comma with and.', 'If both sides of a blank are complete sentences, you need a period, a semicolon, or a comma with "and."'), B('A comma alone is not enough. That mistake is called a comma splice.')]},
            {'type': 'image', 'heading': 'Subject and verb', 'figs': ["Fig.table([['Subject', 'Verb'], ['The collection of stamps', 'was'], ['The members of the council', 'were']])"], 'notes': ['Find the real subject', 'Skip the “of …” phrase', 'Singular or plural?'],
             'beats': [B('For verb questions, find the real subject. Skip over phrases like of the stamps.', 'For verb questions, find the real subject. Skip over phrases like "of the stamps."'), B('The collection was donated, because collection is singular, even though stamps is plural.', 'The collection was donated, because "collection" is singular, even though "stamps" is plural.')]},
            quiz('The storm hit___ crews worked all night.', ['a comma', 'a semicolon', 'no punctuation'], 'a semicolon', 'Your turn. The storm hit, blank, crews worked all night. What goes in the blank?', 'A semicolon! Both sides are complete sentences.', fig="Fig.picture(['✍️'])"),
            outro('Practice Boundaries in SAT Prep!'),
        ],
    },
    {
        'id': 'rw-transitions', 'title': 'Transitions', 'subject': 'rw', 'label': 'Transitions',
        'desc': 'Pick the word that shows how two ideas connect.', 'practice': ['rw', 'trans', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔗', 'title': 'Transitions', 'sub': 'How ideas connect', 'beats': [B('A transition word shows how two sentences connect. First decide the connection, then pick the word.')]},
            {'type': 'image', 'heading': 'Four common connections', 'figs': ["Fig.table([['Connection', 'Words'], ['contrast', 'however, in contrast'], ['result', 'therefore, as a result'], ['addition', 'moreover, in addition'], ['example', 'for example']])"], 'notes': ['Contrast: a surprise', 'Result: because of that', 'Addition: and also'],
             'beats': [B('If the second sentence surprises you, it is a contrast: however.'), B('If it happens because of the first, it is a result: therefore.'), B('If it simply adds more, it is an addition: moreover. If it gives a case, it is an example.')]},
            quiz('The road was icy. ___, school started late.', ['However', 'Therefore', 'For example'], 'Therefore', 'Your turn. The road was icy. Blank, school started late. Which transition fits?', 'Therefore! The late start is a result of the ice.', fig="Fig.picture(['🔗'])"),
            outro('Practice Transitions in SAT Prep!'),
        ],
    },
    {
        'id': 'math-linear', 'title': 'Linear Equations and Systems', 'subject': 'math', 'label': 'Algebra',
        'desc': 'Solve linear equations, read slope, and solve systems.', 'practice': ['math', 'lin1', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⚖️', 'title': 'Linear Algebra', 'sub': 'The biggest part of SAT Math', 'beats': [B('Algebra is one of the biggest parts of SAT Math. Here are the moves you will use most.')]},
            {'type': 'image', 'heading': 'Solve for x', 'figs': ["Fig.table([['3x + 7 = 31'], ['3x = 24'], ['x = 8']])"], 'notes': ['Undo adding first', 'Then undo multiplying', 'Check your answer'],
             'beats': [B('To solve 3x + 7 = 31, subtract 7, then divide by 3. x = 8.', 'To solve three x plus seven equals thirty-one, subtract seven, then divide by three. x equals eight.')]},
            {'type': 'image', 'heading': 'Systems', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: -1, b: 7 }, { kind: 'lin', m: 1, b: -1 }], pts: [[4, 3, '(4, 3)']], range: [-2, 10], step: 2 })"], 'notes': ['Where the lines cross', 'Add to eliminate', 'Parallel lines: no solution'],
             'beats': [B('The solution to a system is where the two lines cross.'), B('x + y = 7 and x − y = 1. Add them: 2x = 8, so x = 4 and y = 3.', 'x plus y equals seven, and x minus y equals one. Add them: two x equals eight, so x is four and y is three.'), B('If the lines are parallel, they never cross, so there is no solution.')]},
            quiz('Solve: 5x − 4 = 21', ['x = 5', 'x = 3.4', 'x = 25'], 'x = 5', 'Your turn. Solve 5x − 4 = 21.', 'x = 5. Add 4, then divide by 5.', ask_say='Your turn. Solve five x minus four equals twenty-one.', reveal_say='x equals five. Add four, then divide by five.', fig="Fig.picture(['⚖️'])"),
            outro('Practice Algebra in SAT Prep!'),
        ],
    },
    {
        'id': 'math-quadratics', 'title': 'Quadratics on the SAT', 'subject': 'math', 'label': 'Advanced Math',
        'desc': 'Factoring, the vertex, and the discriminant.', 'practice': ['math', 'quad', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⛰️', 'title': 'Quadratics', 'sub': 'Advanced Math essentials', 'beats': [B('Quadratics show up often in Advanced Math. Three ideas cover most of them.')]},
            {'type': 'image', 'heading': 'Factor to solve', 'figs': ["Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 0.5, k: -12.25 }], pts: [[4, 0, '4'], [-3, 0, '−3']], range: { x: [-6, 7], y: [-14, 8] }, step: 2 })"], 'notes': ['x² − x − 12 = 0', '(x − 4)(x + 3) = 0', 'x = 4 or x = −3'],
             'beats': [B('To solve x² − x − 12 = 0, factor: (x − 4)(x + 3) = 0. So x = 4 or x = −3.', 'To solve x squared minus x minus twelve equals zero, factor it: x minus four, times x plus three. So x is four, or x is negative three.')]},
            {'type': 'image', 'heading': 'The discriminant', 'figs': ["Fig.table([['b² − 4ac', '> 0', '= 0', '< 0'], ['Real solutions', '2', '1', '0']])"], 'notes': ['b² − 4ac', 'Zero means one solution', 'Negative means none'],
             'beats': [B('The discriminant, b² − 4ac, tells how many real solutions there are.', 'The discriminant, b squared minus four a c, tells how many real solutions there are.'), B('Positive: two. Zero: one. Negative: none.')]},
            quiz('Sum of the solutions of x² − 7x + 10 = 0?', ['7', '10', '−7'], '7', 'Your turn. What is the sum of the solutions of x² − 7x + 10 = 0?', '7. The solutions are 2 and 5.', ask_say='Your turn. What is the sum of the solutions of x squared minus seven x plus ten equals zero?', reveal_say='Seven. The solutions are two and five.', fig="Fig.picture(['➕'])"),
            outro('Practice Advanced Math in SAT Prep!'),
        ],
    },
    {
        'id': 'math-geometry', 'title': 'Triangles and Circles', 'subject': 'math', 'label': 'Geometry',
        'desc': 'The Pythagorean theorem, trig ratios, and circles.', 'practice': ['math', 'trig', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📐', 'title': 'Geometry and Trig', 'sub': 'Right triangles and circles', 'beats': [B('Geometry and Trigonometry questions lean on a few key formulas. You also get a reference sheet.')]},
            {'type': 'image', 'heading': 'Right triangles', 'figs': ["Fig.triangle('right')", "Fig.table([['sin', 'cos', 'tan'], ['opp/hyp', 'adj/hyp', 'opp/adj']])"], 'show': [0, 1, 1], 'notes': ['a² + b² = c²', 'SOH CAH TOA', 'Special: 30-60-90, 45-45-90'],
             'beats': [B('In a right triangle, a² + b² = c², where c is the hypotenuse.', 'In a right triangle, a squared plus b squared equals c squared, where c is the hypotenuse.'), B('SOH CAH TOA: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, tangent is opposite over adjacent.')]},
            {'type': 'image', 'heading': 'Circles', 'figs': ["Fig.angle(60, { label: '60°' })"], 'notes': ['(x − h)² + (y − k)² = r²', 'Arc = angle/360 × 2πr', 'Area = πr²'],
             'beats': [B('A circle with center h, k and radius r has equation (x − h)² + (y − k)² = r².', 'A circle with center h, k and radius r has the equation: x minus h, squared, plus y minus k, squared, equals r squared.'), B('An arc is a fraction of the circumference: the angle over 360, times 2πr.', 'An arc is a fraction of the circumference: the angle over three sixty, times two pi r.')]},
            quiz('Legs 6 and 8. Hypotenuse?', ['10', '14', '48'], '10', 'Your turn. A right triangle has legs 6 and 8. What is the hypotenuse?', '10. 36 + 64 = 100, and the square root of 100 is 10.', ask_say='Your turn. A right triangle has legs six and eight. What is the hypotenuse?', reveal_say='Ten. Thirty-six plus sixty-four is one hundred, and the square root of one hundred is ten.', fig="Fig.triangle('right')"),
            outro('Practice Geometry in SAT Prep!'),
        ],
    },
]
