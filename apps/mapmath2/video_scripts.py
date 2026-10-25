"""MAP Math 2's own video (rendered by tools/make_videos.py mapmath2). It also shows Math Quest 2's 8 math videos."""


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
]
