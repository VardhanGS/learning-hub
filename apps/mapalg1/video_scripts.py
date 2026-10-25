"""MAP Algebra 1 video lessons (rendered by tools/make_videos.py mapalg1). The math lessons are borrowed from
Algebra 1 Quest (config videosFrom); this app adds one video about the practice test itself."""


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


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
]
