"""Puzzle Peak 4 video lessons (rendered by tools/make_videos.py contest4). Not rendered yet (cloud session 2026-10-27).
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
        'id': 'pp-contest4', 'title': 'How a Practice Contest Works', 'subject': 'look4', 'color': 'c1', 'label': 'Practice contest',
        'desc': '24 questions, 3/4/5 points, 75 minutes, and smart guessing.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🏁', 'title': 'Your Practice Contest', 'sub': 'Points, time, and strategy', 'beats': [B('Ready for a practice contest? Here is how it works, and how to score well.')]},
            {'type': 'image', 'heading': 'Points', 'note_from': 0, 'figs': ["Fig.table([['Questions', 'Points each'], ['1 to 8', '3'], ['9 to 16', '4'], ['17 to 24', '5']])"], 'notes': ['Harder = more points', 'Most points: 96', 'Wrong answers lose nothing'],
             'beats': [B('There are 24 questions, and they get harder as you go.'), B('The first eight are worth 3 points, the next eight 4 points, and the last eight 5 points.'), B('A wrong answer costs nothing, so always make your best guess.')]},
            {'type': 'image', 'heading': 'Pace yourself', 'note_from': 0, 'figs': ['Fig.clock(9, 45)'], 'notes': ['75 minutes', 'About 3 minutes each', 'Skip, mark, come back'],
             'beats': [B('You have 75 minutes, about 3 minutes per question.'), B('If one is taking too long, mark it and move on.'), B('Come back to marked questions at the end.')]},
            quiz('Which question is worth the most?', ['Question 3', 'Question 12', 'Question 20'], 'Question 20', 'Quick quiz! Which question is worth the most points?', 'Question 20! The last eight are worth 5 points each.', fig="Fig.picture(['🏆'])"),
            outro('Try a practice contest in Puzzle Peak 4!'),
        ],
    },
    {
        'id': 'pp-pretend4', 'title': 'Pretend, Then Fix', 'subject': 'trail4', 'color': 'c6', 'label': 'Summit Trail',
        'desc': 'Heads-and-legs puzzles: pretend they are all the same, then fix the difference.', 'practice': ['trail4', 'ttable4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🐔', 'title': 'Pretend, Then Fix', 'sub': 'A clever way to solve legs puzzles', 'beats': [B('A farm has chickens and dogs. You know how many animals and how many legs. How many dogs?')]},
            {'type': 'image', 'heading': '10 animals, 28 legs', 'figs': ["Fig.picture(['🐔', '🐕'], '10 animals · 28 legs')"], 'notes': ['Pretend: all chickens', '10 × 2 = 20 legs', '28 − 20 = 8 legs missing'],
             'beats': [B('There are 10 animals with 28 legs.'), B('Pretend they are all chickens.'), B('That would be 10 times 2, which is 20 legs.'), B('But there are 28 legs. We are 8 legs short.')]},
            {'type': 'image', 'heading': 'Fix it', 'note_from': 0, 'figs': ["Fig.table([['Dogs', '0', '1', '2', '3', '4'], ['Legs', '20', '22', '24', '26', '28']])"], 'notes': ['Each dog adds 2 legs', '8 ÷ 2 = 4 dogs', 'Check: 6 × 2 + 4 × 4 = 28'],
             'beats': [B('Every time we swap a chicken for a dog, we add 2 legs.'), B('We need 8 more legs, so 8 divided by 2 is 4 dogs.'), B('Check: 6 chickens have 12 legs, 4 dogs have 16 legs. 12 plus 16 is 28!')]},
            quiz('8 bikes and trikes, 19 wheels. Trikes?', ['3', '5', '11'], '3', 'Your turn! 8 bikes and trikes have 19 wheels. How many trikes?', '3! All bikes would be 16 wheels. 3 wheels short, and each trike adds 1.', fig="Fig.picture(['🚲', '🛺'])"),
            outro('Try Pretend and Fix on the Summit Trail!'),
        ],
    },
    {
        'id': 'pp-paths4', 'title': 'Counting Paths', 'subject': 'look4', 'color': 'c1', 'label': 'Look & Count',
        'desc': 'Write a number at each corner: add the one below and the one to the left.', 'practice': ['look4', 'count4', 1],
        'scenes': [
            {'type': 'title', 'emoji': '🗺️', 'title': 'Counting Paths', 'sub': 'Corner by corner', 'beats': [B('How many shortest ways can you walk across a grid of streets? Let us count without drawing every path.')]},
            {'type': 'image', 'heading': 'From A to B', 'note_from': 0, 'figs': ['Fig.gridPath(2, 2)'], 'notes': ['Only right or up', 'Edges: 1 way each', 'Inside: below + left'],
             'beats': [B('You may only walk right or up.'), B('The corners along the bottom and the left side can be reached only one way. Write 1 there.'), B('Every other corner: add the number below it and the number to its left.')]},
            {'type': 'image', 'heading': 'Fill in the corners', 'note_from': 0, 'figs': ["Fig.table([['1', '3', '6'], ['1', '2', '3'], ['1', '1', '1']], 'Ways to reach each corner')"], 'notes': ['1 + 1 = 2', '2 + 1 = 3, 1 + 2 = 3', '3 + 3 = 6 ways to B'],
             'beats': [B('The middle corner gets 1 plus 1, which is 2.'), B('The next corners get 2 plus 1, which is 3.'), B('And B gets 3 plus 3. There are 6 shortest paths!')]},
            quiz('A 3 by 1 grid. How many paths?', ['3', '4', '6'], '4', 'Your turn! A grid 3 blocks wide and 1 block tall. How many shortest paths?', '4! The top row gets 1, 2, 3, 4.', fig='Fig.gridPath(3, 1)'),
            outro('Count paths in Puzzle Peak 4!'),
        ],
    },
]
