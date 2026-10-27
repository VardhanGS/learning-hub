"""MAP Math 2's own videos (rendered by tools/make_videos.py mapmath2). It also shows Math Quest 2's math videos."""


def quiz(q, opts, a, ask, reveal, ask_say=None, reveal_say=None, fig=None):
    return {'type': 'quiz', 'q': q, 'opts': opts, 'a': a, 'fig': fig,
            'beats': [B(ask, ask_say, role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B(reveal, reveal_say, role='reveal')]}


def outro(sub):
    return {'type': 'outro', 'title': 'Your turn!', 'sub': sub, 'beats': [B('Now it is your turn. ' + sub)]}


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


VIDEOS = [
    {
        'id': 'map-tips', 'title': 'How Your Practice Test Works', 'subject': 'number', 'color': 'c1', 'label': 'Practice test',
        'desc': 'What the MAP-style practice test is like, and how to do your best.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🧭', 'title': 'Your Practice Test', 'sub': 'How it works, and how to do your best', 'beats': [B('Hi, math explorer! Let us get ready for your practice test.')]},
            {'type': 'image', 'heading': 'Questions that change', 'figs': ["Fig.picture(['⬆️', '⬇️'])"], 'notes': ['Right answer: a bit harder', 'Missed one: a bit easier', 'Hard ones are normal!'],
             'beats': [B('This test is a little bit magic. It changes as you go.'), B('When you get one right, the next question is a little harder.'), B('When you miss one, the next question is a little easier.'), B('So everyone gets some hard questions. That is totally normal!')]},
            {'type': 'image', 'heading': 'Tap, then Next', 'figs': ["Fig.picture(['👆', '🔒'])"], 'notes': ['Change your mind before Next', 'After Next, it is locked', 'No time limit'],
             'beats': [B('Tap your answer. You can change your mind as many times as you like.'), B('When you tap Next, your answer is locked. You cannot go back.'), B('And there is no time limit, so take your time!')]},
            {'type': 'image', 'heading': 'Use the picture', 'figs': ["Fig.barGraph('Books read', [['Mon', 4], ['Tue', 7], ['Wed', 5]])"], 'notes': ['Read the title', 'Check the numbers', 'Then answer'],
             'beats': [B('Many questions have a picture, like this graph.'), B('Read the title first.'), B('Then look carefully at the numbers.'), B('The picture often holds the answer!')]},
            {'type': 'quiz', 'q': 'You get a really hard question. What should you do?', 'opts': ['Give up', 'Try your best, then keep going', 'Tap the first answer'], 'a': 'Try your best, then keep going', 'fig': "Fig.picture(['💪'])",
             'beats': [B('Quick quiz! You get a really, really hard question. What should you do?', role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B('Try your best, then keep going! A hard question means you are doing great.', role='reveal')]},
            {'type': 'outro', 'title': 'You are ready!', 'sub': 'Take a deep breath and do your best.', 'beats': [B('You are ready! Take a deep breath, and do your best. Good luck!')]},
        ],
    },
    # ---- added 2026-10-27 (plan item 3): MAP Math 2's own skills that had no video ----
    {
        'id': 'equations2', 'title': 'The Equal Sign', 'subject': 'algebra', 'color': 'c2', 'label': 'Equations',
        'desc': 'The equal sign means "the same as": true or false, and finding the missing number.', 'practice': ['algebra', 'meq', 1],
        'scenes': [
            {'type': 'title', 'emoji': '⚖️', 'title': 'The Equal Sign', 'sub': 'It means "the same as"', 'beats': [B('The equal sign is not a "the answer is" sign. It means "the same as."')]},
            {'type': 'image', 'heading': 'True or false?', 'figs': ['Fig.bond(12, 7, 5)'], 'notes': ['7 + 5 = 12 ✓ true', '9 + 4 = 12 ✗ false (13)'],
             'beats': [B('An equation is true when both sides are the same amount.'), B('7 plus 5 equals 12. Both sides are 12, so it is true.'), B('9 plus 4 equals 12? 9 plus 4 is 13, not 12. So it is false.')]},
            {'type': 'image', 'heading': '8 + 6 = □ + 5', 'figs': ["Fig.barModel(14, ['?', 5])"], 'notes': ['Left side: 8 + 6 = 14', 'Right side must be 14 too', '9 + 5 = 14, so □ = 9'],
             'beats': [B('Here is a tricky one. 8 plus 6 equals box plus 5.'), B('Work out the left side first. 8 plus 6 is 14.'), B('The right side must be the same, 14.'), B('What plus 5 makes 14? 9! So the box is 9, not 14.')]},
            {'type': 'image', 'heading': 'Both sides balance', 'figs': ["Fig.picture(['⚖️'], '10 + 3 = 6 + 7')"], 'notes': ['10 + 3 = 13', '6 + 7 = 13', 'Balanced!'],
             'beats': [B('Think of a balance scale.'), B('On one side, 10 plus 3 is 13.'), B('On the other side, 6 plus 7 is 13.'), B('Same amount on both sides. It balances, so the equation is true!')]},
            quiz('5 + 7 = □ + 4', ['8', '12', '16'], '8', 'Your turn! 5 plus 7 equals box plus 4. What goes in the box?', '8! 5 plus 7 is 12, and 8 plus 4 is 12 too.', fig="Fig.barModel(12, ['?', 4])"),
            outro('Practice equations in MAP Math 2!'),
        ],
    },
    {
        'id': 'patterns2', 'title': 'Patterns and Rules', 'subject': 'algebra', 'color': 'c2', 'label': 'Patterns',
        'desc': 'Find the rule in a growing pattern and in an In and Out table.', 'practice': ['algebra', 'mpat', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔁', 'title': 'Patterns and Rules', 'sub': 'Find the rule, then use it', 'beats': [B('A pattern follows a rule. If you find the rule, you can find what comes next!')]},
            {'type': 'image', 'heading': 'A growing pattern', 'figs': ['Fig.jumps(4, 5, 3)'], 'notes': ['4, 9, 14, 19', 'Each jump: + 5', 'Next: 19 + 5 = 24'],
             'beats': [B('Look at these numbers: 4, 9, 14, 19.'), B('How much does it grow each time? 4 to 9 is a jump of 5. 9 to 14 is 5 again.'), B('The rule is add 5.'), B('So the next number is 19 plus 5. That is 24.', 'So the next number is 19 plus 5. That is twenty-four.')]},
            {'type': 'image', 'heading': 'An In and Out table', 'figs': ["Fig.table([['In', '2', '5', '8'], ['Out', '7', '10', '?']], 'Find the rule')"], 'notes': ['2 → 7: add 5', '5 → 10: add 5 ✓', '8 + 5 = 13'],
             'beats': [B('This is an In and Out table. A number goes in, and the rule changes it.'), B('2 goes in and 7 comes out. That is add 5.'), B('Check it with the next pair. 5 plus 5 is 10. Yes!'), B('So when 8 goes in, 13 comes out.')]},
            {'type': 'image', 'heading': 'Check every pair', 'figs': ["Fig.table([['In', '2', '4', '5'], ['Out', '6', '12', '?']], 'Is it add 4?')"], 'notes': ['2 + 4 = 6 ✓', '4 + 4 = 8 ✗ (not 12)', 'Rule: times 3 → 15'],
             'beats': [B('Careful! A rule must work for every pair.'), B('2 to 6 could be add 4.'), B('But 4 plus 4 is 8, not 12. So add 4 is not the rule.'), B('Try times 3. 2 times 3 is 6, and 4 times 3 is 12. It works! So 5 times 3 is 15.')]},
            quiz('3, 7, 11, 15, … What comes next?', ['16', '19', '20'], '19', 'Your turn! 3, 7, 11, 15. What comes next?', '19! The rule is add 4, and 15 plus 4 is 19.', fig='Fig.jumps(3, 4, 3)'),
            outro('Find more rules in MAP Math 2!'),
        ],
    },
]
