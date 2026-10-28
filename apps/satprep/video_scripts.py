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
    # ---- added 2026-10-27 (plan item 3): one video for each skill that had none (all passages original) ----
    {
        'id': 'rw-structure', 'title': 'Text Structure and Purpose', 'subject': 'rw', 'label': 'Craft & Structure',
        'desc': 'Name what a sentence does, spot the old view → new evidence → conclusion pattern, and choose precise role answers.', 'practice': ['rw', 'tsp', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🏗️', 'title': 'Text Structure and Purpose', 'sub': 'What is this sentence doing?', 'beats': [B('Structure questions do not ask what a text says. They ask what a part of it does.')]},
            {'type': 'image', 'heading': 'Sentence jobs', 'figs': ["Fig.table([['Job', 'Clue'], ['introduce a topic', 'often the first sentence'], ['give an example', 'for instance, one case'], ['challenge a view', 'however, but, yet'], ['draw a conclusion', 'therefore, this suggests']])"], 'notes': ['Ask: what does it DO?', 'Clue words point to the job', 'Topic ≠ role'],
             'beats': [B('Every sentence has a job: introduce a topic, give an example, challenge a view, or draw a conclusion.'), B('So ask what the sentence does, not what it is about.'), B('Clue words help. However often signals a challenge. This suggests often signals a conclusion.'), B('An answer that only restates the topic is usually wrong.')]},
            {'type': 'image', 'heading': 'A common pattern', 'figs': ["Fig.table([['Part 1', 'Part 2', 'Part 3'], ['an old view', 'new evidence', 'a new conclusion']])"], 'notes': ['Old view: “Researchers long assumed…”', 'New evidence: “But a 2019 survey…”', 'New conclusion: “So…”'],
             'beats': [B('Many science and history passages follow one pattern.'), B('First, an old view: researchers long assumed something.'), B('Then new evidence that does not fit.'), B('Then a new conclusion. If you can label the three parts, most structure questions become easy.')]},
            {'type': 'image', 'heading': 'Precise, not extra', 'note_from': 0, 'figs': ["Fig.picture(['🎯', '✂️'], 'Describe the role exactly')"], 'notes': ['Right: matches the role exactly', 'Wrong: adds a claim', 'Wrong: too strong a word'],
             'beats': [B('In harder questions, two choices may both sound close.'), B('The right one describes the role exactly.'), B('Wrong choices add a claim the text never makes, or use a word that is too strong, like proves or rejects.')]},
            quiz('“Most bats were thought to hunt alone. However, new tracking data show some feed in groups.” What does the second sentence do?', ['Gives an example of the first claim', 'Presents evidence that complicates the first claim', 'Proves all bats feed in groups'], 'Presents evidence that complicates the first claim', 'Your turn. Most bats were thought to hunt alone. However, new tracking data show some feed in groups. What does the second sentence do?', 'It presents evidence that complicates the first claim. "Proves all bats" goes too far: the text says only some.', fig="Fig.picture(['🦇', '📡'])"),
            outro('Practice Text Structure and Purpose in SAT Prep.'),
        ],
    },
    {
        'id': 'rw-cross-text', 'title': 'Cross-Text Connections', 'subject': 'rw', 'label': 'Craft & Structure',
        'desc': 'Find each text’s claim, decide how Text 2 responds, and answer only from what Text 2 says.', 'practice': ['rw', 'ctc', 0],
        'scenes': [
            {'type': 'title', 'emoji': '↔️', 'title': 'Cross-Text Connections', 'sub': 'Two short texts, one conversation', 'beats': [B('Paired texts are a conversation between two authors. Your job is to hear how the second one answers the first.')]},
            {'type': 'image', 'heading': 'Claim first', 'note_from': 0, 'figs': ["Fig.table([['Text 1', 'Text 2'], ['claim', 'response'], ['', 'agree · disagree · add a condition']])"], 'notes': ['Underline each main claim', 'Then: how does Text 2 respond?', 'Agree, disagree, or “only if…”'],
             'beats': [B('Before reading the question, find each text\'s main claim in a few words.'), B('Then decide how Text 2 relates to Text 1.'), B('It usually agrees, disagrees, or adds a condition, like "only if" or "not always."')]},
            {'type': 'image', 'heading': 'Stay inside Text 2', 'note_from': 0, 'figs': ["Fig.picture(['📄', '🗣️'], 'How would the author of Text 2 respond?')"], 'notes': ['Use only what Text 2 says', 'No outside opinions', 'Partial agreement is common'],
             'beats': [B('When a question asks how the author of Text 2 would respond, answer as that author.'), B('Use only what Text 2 actually says, not your own opinion.'), B('Watch for partial agreement: Text 2 may accept the facts in Text 1 but reject its conclusion.')]},
            quiz('Text 1: city trees cool streets. Text 2: trees cool streets, but only where roots get enough water. How does Text 2 respond?', ['It rejects Text 1 completely', 'It agrees but adds a condition', 'It changes the topic'], 'It agrees but adds a condition', 'Your turn. Text 1 says city trees cool streets. Text 2 says they do, but only where roots get enough water. How does Text 2 respond?', 'It agrees but adds a condition. "Only where" is the signal.', fig="Fig.picture(['🌳', '💧'])"),
            outro('Practice Cross-Text Connections in SAT Prep.'),
        ],
    },
    {
        'id': 'rw-evidence', 'title': 'Command of Evidence', 'subject': 'rw', 'label': 'Information & Ideas',
        'desc': 'Choose the finding or data point that supports exactly the claim, and read graphs accurately.', 'practice': ['rw', 'coe', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔍', 'title': 'Command of Evidence', 'sub': 'Support exactly this claim', 'beats': [B('Evidence questions give you a claim and ask which fact supports it best. "Best" means exactly.')]},
            {'type': 'image', 'heading': 'True is not enough', 'note_from': 0, 'figs': ["Fig.table([['Choice', 'True?', 'About the claim?'], ['A', '✓', '✗'], ['B', '✓', '✓'], ['C', '✗', '✓']])"], 'notes': ['Restate the claim in your own words', 'Cross out true-but-unrelated', 'The answer is about exactly the claim'],
             'beats': [B('Start by restating the claim in your own words.'), B('Several choices may be true. Cross out any that are true but about something else.'), B('The answer must be about exactly what the claim says, no more and no less.')]},
            {'type': 'image', 'heading': 'Reading the data', 'note_from': 0, 'figs': ["Fig.barGraph('Riders (thousands)', [['R1', 6], ['R2', 9], ['R3', 14], ['R4', 8]], 2)"], 'notes': ['Read the title and axis', 'Find the bars the claim names', 'Check the numbers exactly'],
             'beats': [B('For a graph or table, read the title and the labels first.'), B('Then find only the values the claim is about.'), B('If the claim says Route 3 has the most riders, the right choice points to Route 3\'s bar being the tallest, and says so accurately.')]},
            {'type': 'image', 'heading': 'Strong evidence rules things out', 'note_from': 0, 'figs': ["Fig.picture(['⚖️', '🧪'], 'Same in every way but one')"], 'notes': ['Claim: X causes Y', 'Best test: change only X', 'Y changes → strong support'],
             'beats': [B('The strongest support for a cause rules out other explanations.'), B('Look for a comparison where only one thing changed.'), B('If only that thing changed, and the result changed too, the claim is well supported.')]},
            quiz('Claim: a new road salt harms fewer plants. Which finding supports it best?', ['The new salt costs less', 'Roadside plants survived more often with the new salt than the old', 'Many towns salt their roads'], 'Roadside plants survived more often with the new salt than the old', 'Your turn. Claim: a new road salt harms fewer plants. Which finding supports it best?', 'Plants survived more often with the new salt. It compares the two salts on exactly what the claim is about: harm to plants.', fig="Fig.picture(['🧂', '🌱'])"),
            outro('Practice Command of Evidence in SAT Prep.'),
        ],
    },
    {
        'id': 'rw-inference', 'title': 'Inferences', 'subject': 'rw', 'label': 'Information & Ideas',
        'desc': 'Pick the ending that must follow from the text, and match its careful wording.', 'practice': ['rw', 'inf', 0],
        'scenes': [
            {'type': 'title', 'emoji': '💭', 'title': 'Inferences', 'sub': 'What must follow?', 'beats': [B('Inference questions end with a blank. The right answer is the one the text logically leads to.')]},
            {'type': 'image', 'heading': 'Predict first', 'note_from': 0, 'figs': ["Fig.table([['Text says', 'So'], ['A caused B here', 'A might cause B elsewhere'], ['Only some cases', 'not “all cases”']])"], 'notes': ['Cover the choices', 'Finish the sentence yourself', 'Then match'],
             'beats': [B('Cover the choices and finish the last sentence yourself.'), B('Your prediction should follow directly from the facts given.'), B('Then pick the choice that matches it.')]},
            {'type': 'image', 'heading': 'Careful words', 'note_from': 0, 'figs': ["Fig.table([['Text uses', 'Answer should use'], ['may, some, often', 'may, some, often'], ['suggests', 'not “proves”']])"], 'notes': ['Match the qualifiers', '“All” and “proves” are red flags', 'True but off-topic = wrong'],
             'beats': [B('Notice careful words like may, some, and often.'), B('The right answer is just as careful. All, never, and proves are usually red flags.'), B('And a choice that is true in real life, but not supported by the text, is still wrong.')]},
            quiz('Gardens near a pond attracted more frogs, and those gardens had fewer slugs. Frogs eat slugs. So ___', ['frogs may help reduce slugs in gardens', 'all gardens should have ponds', 'slugs avoid water'], 'frogs may help reduce slugs in gardens', 'Your turn. Gardens near a pond attracted more frogs, and those gardens had fewer slugs. Frogs eat slugs. So, blank.', 'Frogs may help reduce slugs in gardens. It follows from the facts, and "may" keeps it careful. "All gardens should" goes too far.', fig="Fig.picture(['🐸', '🐌'])"),
            outro('Practice Inferences in SAT Prep.'),
        ],
    },
    {
        'id': 'rw-synthesis', 'title': 'Rhetorical Synthesis', 'subject': 'rw', 'label': 'Expression of Ideas',
        'desc': 'Every choice is true; pick the one that does exactly what the goal asks.', 'practice': ['rw', 'rsyn', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🗒️', 'title': 'Rhetorical Synthesis', 'sub': 'Notes in, one sentence out', 'beats': [B('These questions give you a student\'s notes and a goal. Every choice uses true facts from the notes. Only one meets the goal.')]},
            {'type': 'image', 'heading': 'Read the goal first', 'note_from': 0, 'figs': ["Fig.picture(['🎯', '🗒️'], 'Goal first, then the notes')"], 'notes': ['Skip to the question', 'Underline the goal words', 'The notes are all true'],
             'beats': [B('Skip straight to the question and find the goal.'), B('Underline its key words.'), B('You do not need to check facts. Every choice is accurate. You only need to check the goal.')]},
            {'type': 'image', 'heading': 'Goal words', 'figs': ["Fig.table([['Goal says', 'The sentence needs'], ['compare / contrast', 'both items, and how they differ'], ['introduce to a new audience', 'what it is, and where or who'], ['emphasize a detail', 'that exact detail, up front']])"], 'notes': ['Contrast: both items', 'Introduce: what + where', 'Emphasize: the detail itself'],
             'beats': [B('Different goals need different things.'), B('Compare or contrast needs both items in the sentence.'), B('Introduce to an unfamiliar audience needs what the thing is, and where or who.'), B('Emphasize needs that specific detail.')]},
            quiz('Goal: contrast the two lakes’ depths.', ['Lake Ora is 40 m deep.', 'Lake Ora is 40 m deep, while Lake Tem is only 9 m deep.', 'Both lakes are in the north.'], 'Lake Ora is 40 m deep, while Lake Tem is only 9 m deep.', 'Your turn. The goal is to contrast the two lakes\' depths. Which sentence does it?', 'The one with both depths and "while." A contrast needs both items.', reveal_say='The one with both depths, and the word "while." A contrast needs both items.', fig="Fig.compareBars(40, 9, 'Ora', 'Tem', 'm')"),
            outro('Practice Rhetorical Synthesis in SAT Prep.'),
        ],
    },
    {
        'id': 'math-inequalities', 'title': 'Linear Inequalities', 'subject': 'math', 'label': 'Algebra',
        'desc': 'Solve and flip, translate at most and at least, and test points in a system.', 'practice': ['math', 'ineq', 0],
        'scenes': [
            {'type': 'title', 'emoji': '↔️', 'title': 'Linear Inequalities', 'sub': 'Solve, flip, and test', 'beats': [B('Inequalities work like equations, with one extra rule and a few word clues.')]},
            {'type': 'image', 'heading': 'Flip when dividing by a negative', 'figs': ["Fig.ineqLine(-3, '<', -9, 3)"], 'notes': ['−2x + 5 > 11', '−2x > 6', '÷ (−2): x < −3'],
             'beats': [B('Solve negative 2x plus 5 is greater than 11.', 'Solve: negative two x plus five is greater than eleven.'), B('Subtract 5: negative 2x is greater than 6.', 'Subtract five. Negative two x is greater than six.'), B('Divide by negative 2, and flip the sign: x is less than negative 3.', 'Divide by negative two, and flip the sign. x is less than negative three.'), B('Check with x equals negative 4: 8 plus 5 is 13, which is greater than 11. It works.', 'Check with x equals negative four. Eight plus five is thirteen, which is greater than eleven. It works.')]},
            {'type': 'image', 'heading': 'Word clues', 'figs': ["Fig.table([['Words', 'Symbol'], ['at most, no more than', '≤'], ['at least, no fewer than', '≥'], ['more than', '>'], ['less than', '<']])"], 'notes': ['60 + 24t ≤ 300', '24t ≤ 240 → t ≤ 10', 'At most 10 tickets'],
             'beats': [B('At most means less than or equal to. At least means greater than or equal to.'), B('A club has 300 dollars, pays a 60 dollar fee, and tickets are 24 dollars: 60 plus 24t is at most 300.', 'A club has three hundred dollars, pays a sixty dollar fee, and tickets cost twenty-four dollars each. Sixty plus twenty-four t is at most three hundred.'), B('So 24t is at most 240, and t is at most 10.', 'So twenty-four t is at most two hundred forty, and t is at most ten.'), B('The club can buy at most 10 tickets.', 'The club can buy at most ten tickets.')]},
            {'type': 'image', 'heading': 'Test a point in a system', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 1, b: 1 }, { kind: 'lin', m: 0, b: 5 }], pts: [[1, 3, '(1, 3)']], range: [-6, 8], step: 2 })"], 'notes': ['y > x + 1: 3 > 2 ✓', 'y < 5: 3 < 5 ✓', 'Both true → solution'],
             'beats': [B('Is the point 1, 3 a solution of y greater than x plus 1, and y less than 5?', 'Is the point one, three a solution of: y greater than x plus one, and y less than five?'), B('First inequality: 3 is greater than 2. True.', 'First inequality: three is greater than two. True.'), B('Second: 3 is less than 5. True.', 'Second: three is less than five. True.'), B('Both are true, so it is a solution.')]},
            quiz('Solve: −3x ≥ 12', ['x ≥ −4', 'x ≤ −4', 'x ≤ 4'], 'x ≤ −4', 'Your turn. Solve negative 3x is at least 12.', 'x is less than or equal to negative 4. Dividing by negative 3 flips the sign.', ask_say='Your turn. Solve: negative three x is greater than or equal to twelve.', reveal_say='x is less than or equal to negative four. Dividing by negative three flips the sign.', fig="Fig.ineqLine(-4, '≤', -10, 2)"),
            outro('Practice Linear Inequalities in SAT Prep.'),
        ],
    },
    {
        'id': 'math-exponential', 'title': 'Exponential Functions', 'subject': 'math', 'label': 'Advanced Math',
        'desc': 'Percent growth and decay as a multiplier, composing functions, and half-life.', 'practice': ['math', 'expo', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🚀', 'title': 'Exponential Functions', 'sub': 'Multiply, do not add', 'beats': [B('Exponential models multiply by the same factor each period. Spot the factor, and the rest is easy.')]},
            {'type': 'image', 'heading': 'Growth and decay', 'figs': ["Fig.graph({ fns: [{ kind: 'exp', a: 1, b: 1.5 }, { kind: 'exp', a: 3, b: 0.7 }], range: { x: [0, 6], y: [0, 6] }, step: 1 })"], 'notes': ['Grow 8%: × 1.08', 'Shrink 15%: × 0.85', '500(1.08)ᵗ'],
             'beats': [B('Growing by p percent means multiplying by 1 plus p over 100.', 'Growing by p percent means multiplying by one plus p over one hundred.'), B('8 percent growth is times 1.08.', 'Eight percent growth is times one point zero eight.'), B('Shrinking by 15 percent is times 0.85.', 'Shrinking by fifteen percent is times zero point eight five.'), B('So 500 growing 8 percent a year is 500 times 1.08 to the t.', 'So five hundred growing eight percent a year is five hundred times one point zero eight to the t.')]},
            {'type': 'image', 'heading': 'Half-life', 'figs': ["Fig.table([['Hours', '0', '4', '8', '12'], ['Grams', '320', '160', '80', '40']])"], 'notes': ['Half-life: 4 hours', '12 hours = 3 half-lives', '320 ÷ 2 ÷ 2 ÷ 2 = 40 g'],
             'beats': [B('A half-life is the time it takes for an amount to be cut in half.'), B('The half-life here is 4 hours.', 'The half-life here is four hours.'), B('12 hours is 3 half-lives.', 'Twelve hours is three half-lives.'), B('Halve 320 three times: 160, 80, 40 grams.', 'Halve three hundred twenty three times: one sixty, eighty, forty grams.')]},
            {'type': 'image', 'heading': 'f(g(x)): inside first', 'note_from': 0, 'figs': ["Fig.table([['x', '2'], ['g(x) = 2x − 3', '1'], ['f(g(x)) = 1² + 1', '2']], 'Inside first')"], 'notes': ['g(2) = 1', 'f(1) = 2', 'Work from the inside out'],
             'beats': [B('A composition puts one function inside another. Work from the inside out.'), B('With g of x equals 2x minus 3, g of 2 is 1.', 'With g of x equals two x minus three, g of two is one.'), B('Then f of 1, with f of x equals x squared plus 1, is 2.', 'Then f of one, with f of x equals x squared plus one, is two.')]},
            quiz('A car worth $20,000 loses 10% of its value each year. Which model fits?', ['20,000(0.9)ᵗ', '20,000(0.1)ᵗ', '20,000 − 0.1t'], '20,000(0.9)ᵗ', 'Your turn. A car worth 20,000 dollars loses 10 percent of its value each year. Which model fits?', '20,000 times 0.9 to the t. Losing 10 percent leaves 90 percent each year.', ask_say='Your turn. A car worth twenty thousand dollars loses ten percent of its value each year. Which model fits?', reveal_say='Twenty thousand times zero point nine to the t. Losing ten percent leaves ninety percent each year.', fig="Fig.graph({ fns: [{ kind: 'exp', a: 20, b: 0.9 }], range: { x: [0, 10], y: [0, 22] }, step: 2 })"),
            outro('Practice Exponential Functions in SAT Prep.'),
        ],
    },
    {
        'id': 'math-ratios', 'title': 'Ratios, Rates, and Percents', 'subject': 'math', 'label': 'Problem Solving',
        'desc': 'Percent of a number, unit conversion with fractions equal to 1, and successive percent changes.', 'practice': ['math', 'ratio', 0],
        'scenes': [
            {'type': 'title', 'emoji': '％', 'title': 'Ratios, Rates, and Percents', 'sub': 'Problem-Solving essentials', 'beats': [B('Percents and rates are quick points if you set them up carefully.')]},
            {'type': 'image', 'heading': 'Percent of a number', 'note_from': 0, 'figs': ["Fig.barModel('80', ['35%', '65%'])"], 'notes': ['p% of n = (p/100) × n', '35% of 80 = 0.35 × 80', '= 28'],
             'beats': [B('Percent of a number means multiply by the percent over 100.', 'Percent of a number means multiply by the percent over one hundred.'), B('35 percent of 80 is 0.35 times 80.', 'Thirty-five percent of eighty is zero point three five times eighty.'), B('That is 28.', 'That is twenty-eight.')]},
            {'type': 'image', 'heading': 'Convert units', 'figs': ["Fig.table([['60 mi/h', '× 5,280 ft/mi', '÷ 3,600 s/h'], ['', '', '= 88 ft/s']])"], 'notes': ['Miles cancel', 'Hours cancel', '88 feet per second'],
             'beats': [B('Convert 60 miles per hour to feet per second.', 'Convert sixty miles per hour to feet per second.'), B('Multiply by 5,280 feet per mile, so miles cancel.', 'Multiply by five thousand two hundred eighty feet per mile, so miles cancel.'), B('Divide by 3,600 seconds per hour, so hours cancel.', 'Divide by three thousand six hundred seconds per hour, so hours cancel.'), B('The result is 88 feet per second.', 'The result is eighty-eight feet per second.')]},
            {'type': 'image', 'heading': 'Percent changes multiply', 'note_from': 0, 'figs': ["Fig.table([['Start', '+20%', '−20%'], ['100', '120', '96']])"], 'notes': ['× 1.2 then × 0.8', '1.2 × 0.8 = 0.96', 'A 4% decrease, not 0%'],
             'beats': [B('Up 20 percent, then down 20 percent. Back where you started? No!', 'Up twenty percent, then down twenty percent. Back where you started? No!'), B('Multiply: 1.2 times 0.8.', 'Multiply: one point two times zero point eight.'), B('That is 0.96, a 4 percent decrease.', 'That is zero point nine six, a four percent decrease.')]},
            quiz('A $50 item is marked up 30%. New price?', ['$65', '$80', '$15'], '$65', 'Your turn. A 50 dollar item is marked up 30 percent. What is the new price?', '65 dollars. 50 times 1.3 is 65. 15 dollars is only the markup.', ask_say='Your turn. A fifty dollar item is marked up thirty percent. What is the new price?', reveal_say='Sixty-five dollars. Fifty times one point three is sixty-five. Fifteen dollars is only the markup.', fig="Fig.barModel('?', ['$50', '30%'])"),
            outro('Practice Ratios, Rates, and Percents in SAT Prep.'),
        ],
    },
    {
        'id': 'math-data', 'title': 'Data and Inference', 'subject': 'math', 'label': 'Problem Solving',
        'desc': 'Mean, median, and outliers; predictions from a line of fit; margin of error.', 'practice': ['math', 'stats', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📊', 'title': 'Data and Inference', 'sub': 'Summaries and what they allow', 'beats': [B('Data questions test two things: computing a summary, and knowing what that summary lets you conclude.')]},
            {'type': 'image', 'heading': 'Mean, median, outliers', 'figs': ["Fig.table([['Data', '12', '15', '20', '21', '32']])"], 'notes': ['Mean: 100 ÷ 5 = 20', 'Median: middle value = 20', 'Change 32 to 82: mean 30, median 20'],
             'beats': [B('For 12, 15, 20, 21, and 32, the sum is 100.', 'For twelve, fifteen, twenty, twenty-one, and thirty-two, the sum is one hundred.'), B('The mean is 100 divided by 5, which is 20.', 'The mean is one hundred divided by five, which is twenty.'), B('The median, the middle value, is also 20.', 'The median, the middle value, is also twenty.'), B('If 32 became 82, the mean would jump to 30, but the median would stay 20.', 'If thirty-two became eighty-two, the mean would jump to thirty, but the median would stay twenty.')]},
            {'type': 'image', 'heading': 'Predict with a line of fit', 'figs': ["Fig.graph({ fns: [{ kind: 'lin', m: 2.5, b: 10 }], pts: [[2, 14], [4, 21], [6, 24], [8, 31], [10, 34]], range: { x: [0, 12], y: [0, 45] }, step: 2 })"], 'notes': ['y = 2.5x + 10', 'x = 12 → y = 40', 'A prediction, not a guarantee'],
             'beats': [B('A line of best fit models the trend in a scatter plot.'), B('This one is y equals 2.5x plus 10.', 'This one is y equals two point five x, plus ten.'), B('To predict y when x is 12, substitute: 30 plus 10 is 40.', 'To predict y when x is twelve, substitute. Thirty plus ten is forty.'), B('It is a prediction from the model, not a promise.')]},
            {'type': 'image', 'heading': 'Margin of error', 'note_from': 0, 'figs': ["Fig.numLine(35, 49, 1, { labels: [39, 42, 45], marks: [{ v: 42, label: '42%' }] })"], 'notes': ['42% ± 3%', 'Plausible: 39% to 45%', 'Random sample → whole population'],
             'beats': [B('A random sample found 42 percent, with a margin of error of 3 percent.', 'A random sample found forty-two percent, with a margin of error of three percent.'), B('Plausible values for the whole population run from 39 to 45 percent.', 'Plausible values for the whole population run from thirty-nine to forty-five percent.'), B('And conclusions only reach the population the sample was randomly drawn from.')]},
            quiz('A random sample of a school’s 9th graders: 60% ± 4% like the new schedule. What is a plausible value for ALL 9th graders there?', ['50%', '58%', '70%'], '58%', 'Your turn. A random sample of a school\'s ninth graders: 60 percent, plus or minus 4, like the new schedule. Which is a plausible value for all ninth graders there?', '58 percent. It is inside 56 to 64 percent.', ask_say='Your turn. In a random sample of a school\'s ninth graders, sixty percent, plus or minus four, like the new schedule. Which is a plausible value for all ninth graders there?', reveal_say='Fifty-eight percent. It is inside fifty-six to sixty-four percent.', fig="Fig.numLine(52, 68, 1, { labels: [56, 60, 64], marks: [{ v: 60, label: '60%' }] })"),
            outro('Practice Data and Inference in SAT Prep.'),
        ],
    },
    {
        'id': 'math-probability', 'title': 'Probability from Tables', 'subject': 'math', 'label': 'Problem Solving',
        'desc': 'Favorable over total, and which total to divide by for “and” versus “given.”', 'practice': ['math', 'prob', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎲', 'title': 'Probability', 'sub': 'Pick the right total', 'beats': [B('Most SAT probability questions come from a two-way table. The whole skill is choosing the right total.')]},
            {'type': 'image', 'heading': 'Favorable over total', 'figs': ["Fig.table([['', 'Yes', 'No', 'Total'], ['A', '12', '28', '40'], ['B', '15', '25', '40'], ['Total', '27', '53', '80']])"], 'notes': ['P = favorable ÷ total', 'P(A and yes) = 12/80', '= 3/20'],
             'beats': [B('Probability is favorable outcomes divided by total outcomes.'), B('Here 80 people answered a survey.', 'Here eighty people answered a survey.'), B('The probability that a random person is in group A and said yes is 12 out of 80.', 'The probability that a random person is in group A and said yes is twelve out of eighty.'), B('That simplifies to 3 twentieths.', 'That simplifies to three twentieths.')]},
            {'type': 'image', 'heading': '“Given” changes the total', 'note_from': 0, 'figs': ["Fig.table([['Row B', 'Yes 15', 'Total 40']], 'Divide by the row total')"], 'notes': ['“Of those in B” → only row B', '15 / 40', '= 3/8'],
             'beats': [B('Now: of the people in group B, what fraction said yes?'), B('"Of those in B" means only row B counts.', 'Of those in B, means only row B counts.'), B('15 out of 40, or 3 eighths.', 'Fifteen out of forty, or three eighths.')]},
            {'type': 'image', 'heading': 'Which total?', 'figs': ["Fig.table([['Question says', 'Divide by'], ['… and …', 'grand total'], ['of those / given', 'that row or column']])"], 'notes': ['“and”: grand total', '“given / of those”: that group'],
             'beats': [B('So read the question for one key phrase.'), B('"And" uses the grand total.', 'And, uses the grand total.'), B('"Given" or "of those" uses only that group\'s total.', 'Given, or of those, uses only that group\'s total.')]},
            quiz('Using the table: of those who said yes, what fraction are in A?', ['12/27', '12/40', '12/80'], '12/27', 'Your turn. Using the same table: of those who said yes, what fraction are in group A?', '12 over 27. "Of those who said yes" means divide by the yes column total, 27.', ask_say='Your turn. Using the same table: of those who said yes, what fraction are in group A?', reveal_say='Twelve over twenty-seven. Of those who said yes, means divide by the yes column total, twenty-seven.', fig="Fig.table([['', 'Yes', 'No', 'Total'], ['A', '12', '28', '40'], ['B', '15', '25', '40'], ['Total', '27', '53', '80']])"),
            outro('Practice Probability in SAT Prep.'),
        ],
    },
    {
        'id': 'math-angles', 'title': 'Lines, Angles, and Triangles', 'subject': 'math', 'label': 'Geometry',
        'desc': 'Triangle angle sums, parallel lines cut by a transversal, and similar triangles.', 'practice': ['math', 'tri', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📐', 'title': 'Lines, Angles, and Triangles', 'sub': 'Three facts, many questions', 'beats': [B('Three facts answer most angle and triangle questions on the SAT.')]},
            {'type': 'image', 'heading': 'Triangle angles add to 180°', 'figs': ["Fig.triangle('acute')"], 'notes': ['50° + 60° = 110°', '180° − 110° = 70°'],
             'beats': [B('The three angles of any triangle add up to 180 degrees.', 'The three angles of any triangle add up to one hundred eighty degrees.'), B('If two angles are 50 and 60 degrees, they make 110.', 'If two angles are fifty and sixty degrees, they make one hundred ten.'), B('The third angle is 180 minus 110, which is 70 degrees.', 'The third angle is one eighty minus one ten, which is seventy degrees.')]},
            {'type': 'image', 'heading': 'Parallel lines and a transversal', 'figs': ["Fig.pair(Fig.angle(65, { label: '65°' }), Fig.angle(115, { label: '115°' }))"], 'notes': ['Each angle: 65° or 115°', '65° + 115° = 180°', 'Look: acute or obtuse?'],
             'beats': [B('When a line crosses two parallel lines, it makes eight angles.'), B('Every one of them equals 65 degrees or 115 degrees.', 'Every one of them equals sixty-five degrees, or one hundred fifteen degrees.'), B('The two sizes add to 180.', 'The two sizes add to one hundred eighty.'), B('So just ask: is this angle acute or obtuse?')]},
            {'type': 'image', 'heading': 'Similar triangles', 'figs': ["Fig.table([['', 'Small', 'Large'], ['AB ↔ DE', '4', '10'], ['BC ↔ EF', '6', '?']])"], 'notes': ['Scale factor: 10 ÷ 4 = 2.5', 'EF = 6 × 2.5', '= 15'],
             'beats': [B('Similar triangles have the same angles, and their sides are proportional.'), B('Find the scale factor from one matching pair: 10 divided by 4 is 2.5.', 'Find the scale factor from one matching pair. Ten divided by four is two point five.'), B('Multiply any small side by it.'), B('6 times 2.5 is 15.', 'Six times two point five is fifteen.')]},
            quiz('Two angles of a triangle are 35° and 90°. The third?', ['55°', '65°', '145°'], '55°', 'Your turn. Two angles of a triangle are 35 and 90 degrees. What is the third?', '55 degrees. 180 minus 125.', ask_say='Your turn. Two angles of a triangle are thirty-five and ninety degrees. What is the third?', reveal_say='Fifty-five degrees. One eighty minus one twenty-five.', fig="Fig.triangle('right')"),
            outro('Practice Lines, Angles, and Triangles in SAT Prep.'),
        ],
    },
    {
        'id': 'math-circles', 'title': 'Circles', 'subject': 'math', 'label': 'Geometry',
        'desc': 'Reading center and radius from the equation, arc length, and completing the square.', 'practice': ['math', 'circle', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⭕', 'title': 'Circles', 'sub': 'Equation, arcs, and radius', 'beats': [B('Circle questions use one equation and one proportion. Learn both, and they are quick points.')]},
            {'type': 'image', 'heading': '(x − h)² + (y − k)² = r²', 'figs': ["Fig.graph({ pts: [[2, -5, '(2, −5)']], range: [-10, 10], step: 5 })"], 'notes': ['(x − 2)² + (y + 5)² = 49', 'Center (2, −5): signs flip', 'Radius √49 = 7'],
             'beats': [B('The circle x minus 2 squared plus y plus 5 squared equals 49.', 'Take the circle: x minus two, squared, plus y plus five, squared, equals forty-nine.'), B('Look at the equation pattern: the center is h, k.'), B('The signs flip: the center is 2, negative 5.', 'The signs flip. The center is two, negative five.'), B('The right side is r squared, so the radius is the square root of 49, which is 7.', 'The right side is r squared, so the radius is the square root of forty-nine, which is seven.')]},
            {'type': 'image', 'heading': 'Arc length', 'figs': ["Fig.angle(60, { label: '60°' })"], 'notes': ['Arc = (angle ÷ 360) × 2πr', 'r = 6: circumference 12π', '60/360 × 12π = 2π'],
             'beats': [B('An arc is a fraction of the circumference.'), B('The fraction is the central angle over 360.', 'The fraction is the central angle over three hundred sixty.'), B('With radius 6, the circumference is 12 pi.', 'With radius six, the circumference is twelve pi.'), B('A 60 degree arc is one sixth of it: 2 pi.', 'A sixty degree arc is one sixth of it: two pi.')]},
            {'type': 'image', 'heading': 'Not in standard form?', 'figs': ["Fig.table([['x² − 4x', '(x − 2)² − 4'], ['y² + 6y', '(y + 3)² − 9'], ['r²', '12 + 4 + 9 = 25']], 'x² + y² − 4x + 6y − 12 = 0')"], 'notes': ['Complete the square for x', 'Complete the square for y', '12 + 4 + 9 = 25 → r = 5'],
             'beats': [B('Sometimes the equation is expanded. Complete the square for x and for y.'), B('x squared minus 4x becomes x minus 2, squared, minus 4.', 'x squared minus four x becomes x minus two, squared, minus four.'), B('y squared plus 6y becomes y plus 3, squared, minus 9.', 'y squared plus six y becomes y plus three, squared, minus nine.'), B('Move the numbers over: 12 plus 4 plus 9 is 25. The radius is 5.', 'Move the numbers over. Twelve plus four plus nine is twenty-five. The radius is five.')]},
            quiz('(x + 1)² + (y − 4)² = 36. Center and radius?', ['(1, −4), r = 6', '(−1, 4), r = 6', '(−1, 4), r = 36'], '(−1, 4), r = 6', 'Your turn. x plus 1, squared, plus y minus 4, squared, equals 36. What are the center and radius?', 'Center negative 1, 4, and radius 6. The signs flip, and the radius is the square root of 36.', ask_say='Your turn. x plus one, squared, plus y minus four, squared, equals thirty-six. What are the center and the radius?', reveal_say='Center negative one, four, and radius six. The signs flip, and the radius is the square root of thirty-six.', fig="Fig.graph({ range: [-10, 10], step: 5 })"),
            outro('Practice Circles in SAT Prep.'),
        ],
    },
]
