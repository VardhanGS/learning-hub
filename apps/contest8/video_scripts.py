"""Puzzle Peak 8 video lessons (rendered by tools/make_videos.py contest8). Not rendered yet (cloud session 2026-10-27).
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
        'id': 'pp-contest8', 'title': 'Three Contest Formats', 'subject': 'count8', 'color': 'c1', 'label': 'Practice contests',
        'desc': 'Kangaroo-style, AMC 8–style, and Sprint-style practice: what changes, and how to pace yourself.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🏁', 'title': 'Practice Contests', 'sub': 'Three formats, one strategy', 'beats': [B('Puzzle Peak 8 has three practice contest formats. Here is what each one is like.')]},
            {'type': 'image', 'heading': 'The formats', 'figs': ["Fig.table([['Format', 'Questions', 'Time', 'Scoring'], ['Kangaroo-style', '30', '75 min', '3 / 4 / 5 points'], ['AMC 8–style', '25', '40 min', '1 point each'], ['Sprint-style', '30', '40 min', 'typed answers']])"], 'notes': ['Easier to harder', 'No penalty for guessing', 'No calculator'],
             'beats': [B('Kangaroo-style: 30 questions in 75 minutes, worth 3, 4, or 5 points.', 'Kangaroo style: thirty questions in seventy-five minutes, worth three, four, or five points.'), B('AMC 8 style: 25 questions in 40 minutes, one point each.', 'A. M. C. 8 style: twenty-five questions in forty minutes, one point each.'), B('Sprint style: 30 typed answers in 40 minutes, with no choices to pick from.', 'Sprint style: thirty typed answers in forty minutes, with no choices to pick from.'), B('All three: no calculator, and no penalty for a wrong answer.')]},
            {'type': 'image', 'heading': 'Pacing', 'note_from': 0, 'figs': ["Fig.picture(['⏱️', '🚩'])"], 'notes': ['Do the easy ones fast', 'Mark and skip', 'Guess before time runs out'],
             'beats': [B('The early questions are quicker, so bank that time.'), B('If a problem stalls you for more than a couple of minutes, mark it and move on.'), B('In the last minute, fill in a guess for every blank.')]},
            quiz('AMC 8–style: you have 1 minute and 3 blanks. Best move?', ['Leave them', 'Guess all three', 'Check one old answer'], 'Guess all three', 'Quick check. In the AMC 8 style contest you have one minute left and three blanks. What is the best move?', 'Guess all three. A blank can never score, and a wrong guess costs nothing.', fig="Fig.picture(['⏳'])"),
            outro('Try a practice contest in Puzzle Peak 8.'),
        ],
    },
    {
        'id': 'pp-painted8', 'title': 'The Painted Cube', 'subject': 'trail8', 'color': 'c6', 'label': 'Summit Trail',
        'desc': 'Corners, edges, faces, and the hidden core: where a cube sits decides its paint.', 'practice': ['trail8', 'tcube8', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧊', 'title': 'The Painted Cube', 'sub': 'Location decides the count', 'beats': [B('A big cube made of small cubes is painted, then taken apart. How many small cubes have each amount of paint?')]},
            {'type': 'image', 'heading': 'Where does it sit?', 'figs': ['Fig.prism(4, 4, 4)'], 'notes': ['Corner: 3 faces', 'Edge: 2 faces', 'Face middle: 1 face', 'Inside: 0 faces'],
             'beats': [B('Do not count blindly. First ask where a small cube sits.'), B('A corner cube touches 3 painted faces.'), B('An edge cube, not at a corner, touches 2.'), B('A cube in the middle of a face touches 1.'), B('And a hidden inside cube has no paint at all.')]},
            {'type': 'image', 'heading': 'A 4 × 4 × 4 cube', 'figs': ["Fig.table([['Painted faces', 'Where', 'How many'], ['3', '8 corners', '8'], ['2', '12 edges × 2', '24'], ['1', '6 faces × 4', '24'], ['0', 'inside 2 × 2 × 2', '8']])"], 'notes': ['8 + 24 + 24 + 8 = 64', '= 4 × 4 × 4 ✓'],
             'beats': [B('A cube always has 8 corners.'), B('Each of the 12 edges has 2 cubes that are not corners: 24.', 'Each of the twelve edges has two cubes that are not corners: twenty-four.'), B('Each of the 6 faces has a 2 by 2 middle: 24 more. The inside is a 2 by 2 by 2 block: 8. And 8 plus 24 plus 24 plus 8 is 64, every cube. The check works!', 'Each of the six faces has a two by two middle: twenty-four more. The inside is a two by two by two block: eight. And eight plus twenty-four plus twenty-four plus eight is sixty-four, every cube. The check works!')]},
            quiz('5 × 5 × 5 cube: how many have exactly 2 painted faces?', ['24', '36', '48'], '36', 'Your turn. In a 5 by 5 by 5 cube, how many small cubes have exactly two painted faces?', '36. Each of the 12 edges has 3 non-corner cubes.', ask_say='Your turn. In a five by five by five cube, how many small cubes have exactly two painted faces?', reveal_say='Thirty-six. Each of the twelve edges has three non-corner cubes.', fig='Fig.prism(5, 5, 5)'),
            outro('Look inside the cube on the Summit Trail.'),
        ],
    },
    {
        'id': 'pp-cycles8', 'title': 'Patterns That Repeat', 'subject': 'trail8', 'color': 'c6', 'label': 'Summit Trail',
        'desc': 'Last digits of powers, weekdays, and beads: find the cycle, then use the remainder.', 'practice': ['trail8', 'tcycle8', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔁', 'title': 'Patterns That Repeat', 'sub': 'Find the cycle, use the remainder', 'beats': [B('Huge numbers can hide a small repeating pattern. Find it, and the problem shrinks.')]},
            {'type': 'image', 'heading': 'Last digits of 7ⁿ', 'note_from': 0, 'figs': ["Fig.table([['Power', '7¹', '7²', '7³', '7⁴', '7⁵'], ['Last digit', '7', '9', '3', '1', '7']])"], 'notes': ['7, 9, 3, 1, then 7 again', 'Cycle length 4', 'Only the remainder matters'],
             'beats': [B('Write the last digits of the powers of 7: 7, 9, 3, 1.'), B('Then 7 again. The cycle has length 4.'), B('So for any power, only the remainder when you divide by 4 matters.')]},
            {'type': 'image', 'heading': '7 to the 50th', 'note_from': 0, 'figs': ["Fig.table([['50 ÷ 4', '= 12 remainder 2'], ['remainder 2', '→ like 7²'], ['last digit', '9']])"], 'notes': ['50 = 4 × 12 + 2', 'Like the 2nd power', 'Ends in 9'],
             'beats': [B('What is the last digit of 7 to the 50th?', 'What is the last digit of seven to the fiftieth power?'), B('50 divided by 4 is 12, remainder 2.', 'Fifty divided by four is twelve, remainder two.'), B('So it ends like 7 squared, which ends in 9.', 'So it ends like seven squared, which ends in nine.')]},
            quiz('Last digit of 3^21?', ['3', '7', '9'], '3', 'Your turn. What is the last digit of 3 to the 21st power?', '3. The cycle is 3, 9, 7, 1, and 21 leaves remainder 1.', ask_say='Your turn. What is the last digit of three to the twenty-first power?', reveal_say='Three. The cycle is three, nine, seven, one, and twenty-one leaves remainder one.', fig="Fig.table([['3¹', '3²', '3³', '3⁴'], ['3', '9', '7', '1']])"),
            outro('Find cycles on the Summit Trail.'),
        ],
    },
]
