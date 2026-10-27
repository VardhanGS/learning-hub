"""Puzzle Peak 2 video lessons (rendered by tools/make_videos.py contest2). Not rendered yet (cloud session 2026-10-27).
`text` is the caption; `say` (optional) is what the narrator speaks when it should differ from the caption."""


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
        'id': 'pp-contest2', 'title': 'How a Practice Contest Works', 'subject': 'look', 'color': 'c1', 'label': 'Practice contest',
        'desc': 'Points, timing, and why you should always make a guess.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🏁', 'title': 'Your Practice Contest', 'sub': 'Puzzles, points, and a clock', 'beats': [B('Hi, puzzle climber! Let us see how a practice contest works.')]},
            {'type': 'image', 'heading': 'Three kinds of puzzles', 'figs': ["Fig.table([['Puzzles', 'Points'], ['first 8', '3 each'], ['next 8', '4 each'], ['last 8', '5 each']])"], 'notes': ['Easier ones first', 'Harder ones are worth more', 'Most points: 96'],
             'beats': [B('A contest has 24 puzzles.'), B('The first ones are easier, and worth 3 points.'), B('Then they get harder, and are worth 4 points, then 5 points.'), B('If you get every one right, that is 96 points!')]},
            {'type': 'image', 'heading': 'Always guess!', 'note_from': 0, 'figs': ["Fig.picture(['✅', '🤔'])"], 'notes': ['Wrong answer: no points lost', 'Blank: no points either', 'So always pick one'],
             'beats': [B('Here is a secret.'), B('A wrong answer does not take away any points.'), B('So never leave a puzzle blank. Make your best guess!')]},
            {'type': 'image', 'heading': 'Use the clock wisely', 'note_from': 0, 'figs': ['Fig.clock(10, 15)'], 'notes': ['75 minutes', 'Stuck? Skip it', 'Come back later'],
             'beats': [B('You have 75 minutes.'), B('If a puzzle is too tricky, skip it and mark it.'), B('Then come back to it at the end.')]},
            quiz('Should you leave a puzzle blank?', ['Yes', 'No, always guess', 'Only the hard ones'], 'No, always guess', 'Quick quiz! Should you ever leave a puzzle blank?', 'No! A guess might be right, and a wrong answer costs nothing.', fig="Fig.picture(['🤔'])"),
            outro('Try a half contest in Puzzle Peak!'),
        ],
    },
    {
        'id': 'pp-count2', 'title': 'Counting Squares by Size', 'subject': 'look', 'color': 'c1', 'label': 'Look & Count',
        'desc': 'Small squares first, then bigger ones, so you never miss one.', 'practice': ['look', 'count', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔲', 'title': 'Counting Squares', 'sub': 'Small ones first, then bigger', 'beats': [B('How many squares are in a grid? More than you think!')]},
            {'type': 'image', 'heading': 'A 2 by 2 grid', 'figs': ['Fig.rect(2, 2, { grid: true })'], 'notes': ['4 small squares', '1 big square', '4 + 1 = 5'],
             'beats': [B('Look at this grid.'), B('There are 4 small squares.'), B('But the whole thing is a square too! That is 1 big square.'), B('4 plus 1 is 5 squares in all.')]},
            {'type': 'image', 'heading': 'A 2 by 3 grid', 'figs': ['Fig.rect(3, 2, { grid: true })'], 'notes': ['6 small squares', '2 bigger squares', '6 + 2 = 8'],
             'beats': [B('Now a grid with 2 rows of 3.'), B('Count the small squares: 6.'), B('Now look for 2-by-2 squares. One on the left, and one on the right. They overlap in the middle!'), B('6 plus 2 is 8 squares.')]},
            quiz('How many squares in a 3 by 3 grid?', ['9', '13', '14'], '14', 'Your turn! How many squares are in a 3 by 3 grid?', '14! 9 small, 4 middle-sized, and 1 big one.', fig='Fig.rect(3, 3, { grid: true })'),
            outro('Count squares in Puzzle Peak!'),
        ],
    },
    {
        'id': 'pp-backward2', 'title': 'Work Backward', 'subject': 'trail', 'color': 'c6', 'label': 'Summit Trail',
        'desc': 'Start at the end and undo each step.', 'practice': ['trail', 'tbackward', 0],
        'scenes': [
            {'type': 'title', 'emoji': '↩️', 'title': 'Work Backward', 'sub': 'Start at the end', 'beats': [B('Some puzzles tell you how things end. Then you can walk back to the start!')]},
            {'type': 'image', 'heading': 'Undo each step', 'figs': ["Fig.picture(['🤔', '➡️', '❓'], 'add 5 → 12')"], 'notes': ['Maya adds 5 and gets 12', 'Undo: 12 − 5', 'She started with 7'],
             'beats': [B('Maya thinks of a number. She adds 5 and gets 12.'), B('To go back, do the opposite. The opposite of adding 5 is taking away 5.'), B('12 take away 5 is 7. Maya started with 7!'), B('Check it: 7 plus 5 is 12. Yes!')]},
            {'type': 'image', 'heading': 'Hints, one step at a time', 'note_from': 0, 'figs': ["Fig.picture(['💡', '1️⃣', '2️⃣'])"], 'notes': ['Stuck? Tap Show a hint', 'One step at a time', 'Try before the next hint'],
             'beats': [B('On the Summit Trail, puzzles have hints.'), B('Tap Show a hint to see one step.'), B('Try that step yourself before you tap for the next one!')]},
            quiz('A number plus 4 is 10. What was it?', ['14', '6', '4'], '6', 'Your turn! A number plus 4 makes 10. What was the number?', '6! Take away 4 from 10.', fig="Fig.picture(['❓', '➕', '4️⃣'])"),
            outro('Climb the Summit Trail in Puzzle Peak!'),
        ],
    },
]
