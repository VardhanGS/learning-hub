"""MAP Reading 8 video lessons (rendered by tools/make_videos.py mapread8)."""


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


def quiz(q, opts, a, ask, reveal, fig=None):
    return {'type': 'quiz', 'q': q, 'opts': opts, 'a': a, 'fig': fig,
            'beats': [B(ask, role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B(reveal, role='reveal')]}


def outro(sub):
    return {'type': 'outro', 'title': 'Your turn', 'sub': sub, 'beats': [B('Now try it yourself. ' + sub)]}


VIDEOS = [
    {
        'id': 'evidence8', 'title': 'Citing Strong Evidence', 'subject': 'lit', 'label': 'Evidence',
        'desc': 'Support claims about a text with the strongest evidence.', 'practice': ['lit', 'g8stories', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔍', 'title': 'Text Evidence', 'sub': 'Claim, evidence, explanation', 'beats': [B('Every strong answer about a text has two parts: a claim, and the evidence that proves it.')]},
            {'type': 'image', 'heading': 'Claim + evidence', 'figs': ["Fig.table([['Claim', 'Evidence'], ['Theo is cautious', 'never touch anything without asking']], 'Pairing a claim with proof')"], 'notes': ['Make a specific claim', 'Point to the exact words', 'Explain how they prove it'],
             'beats': [B('Start with a specific claim, like: Theo is cautious.'), B('Then find the exact words that prove it.'), B('Finally, explain how those words support your claim.')]},
            {'type': 'image', 'heading': 'Part A and Part B', 'figs': ["Fig.picture(['🅰️', '🅱️'])"], 'notes': ['Part A: the answer', 'Part B: the evidence for Part A', 'They must match'],
             'beats': [B('Many tests ask in two parts. Part A asks for an answer. Part B asks which evidence supports it.'), B('Your Part B choice must prove your Part A answer, not just sound related.')]},
            quiz('Which is the STRONGEST evidence that a character is nervous?', ['Her hands trembled as she held the script.', 'She walked into the auditorium.', 'The spotlight was bright.'], 'Her hands trembled as she held the script.', 'Quick check. Which is the strongest evidence that a character is nervous?', 'Her hands trembled. It directly shows nervousness; the others are just setting details.', fig="Fig.picture(['🎭'])"),
            outro('Practice with evidence questions in MAP Reading 8.'),
        ],
    },
    {
        'id': 'central8', 'title': 'Central Ideas and Objective Summaries', 'subject': 'info', 'label': 'Central idea',
        'desc': 'Track a central idea through a text and summarize it without opinion.', 'practice': ['info', 'central8', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎯', 'title': 'Central Ideas', 'sub': 'What the whole text develops', 'beats': [B('The central idea is the main point an entire text develops, not just one paragraph.')]},
            {'type': 'image', 'heading': 'How it develops', 'figs': ["Fig.picture(['🏙️', '☀️', '🪣'], 'problem → solution → limits')"], 'notes': ['Each paragraph adds something', 'Problem, cause, solution, limit', 'Watch for words like "however"'],
             'beats': [B('Track how each paragraph builds the idea: a problem, a cause, a solution, or a limit.'), B('Words like however and still often signal a refinement of the idea.')]},
            {'type': 'image', 'heading': 'Objective summary', 'figs': ["Fig.picture(['📄', '✂️'])"], 'notes': ['Central idea + key points', 'No opinions', 'No minor details'],
             'beats': [B('An objective summary states the central idea and the key points.'), B('It leaves out opinions, like "fascinating," and minor details.')]},
            quiz('Which word does NOT belong in an objective summary?', ['amazing', 'researchers', 'strategies'], 'amazing', 'Quick check. Which word does not belong in an objective summary?', 'Amazing. It is an opinion, and objective summaries leave opinions out.', fig="Fig.picture(['🚫'])"),
            outro('Practice central ideas in MAP Reading 8.'),
        ],
    },
    {
        'id': 'arguments8', 'title': 'Evaluating Arguments', 'subject': 'info', 'label': 'Arguments',
        'desc': 'Claims, relevant and sufficient evidence, and flawed reasoning.', 'practice': ['info', 'g8argeval', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⚖️', 'title': 'Evaluating Arguments', 'sub': 'Is the reasoning sound?', 'beats': [B('An argument is only as strong as its evidence and reasoning. Here is how to test one.')]},
            {'type': 'image', 'heading': 'Relevant and sufficient', 'figs': ["Fig.picture(['✅', '🧱'])"], 'notes': ['Relevant: directly supports the claim', 'Sufficient: enough to convince', 'One story is not enough'],
             'beats': [B('Relevant evidence directly supports the claim.'), B('Sufficient evidence is enough of it. One person\'s story is not sufficient for a claim about everyone.')]},
            {'type': 'image', 'heading': 'Correlation is not cause', 'figs': ["Fig.picture(['📱', '😴', '❓'])"], 'notes': ['A link is not proof', 'Look for other explanations', 'Is there reverse cause?'],
             'beats': [B('Two things happening together does not prove one causes the other.'), B('Teens who use phones sleep less. But maybe teens who cannot sleep reach for their phones.')]},
            quiz('"Everyone is switching to this app, so it must be the best." This reasoning is…', ['bandwagon', 'sound', 'sufficient evidence'], 'bandwagon', 'Quick check. Everyone is switching to this app, so it must be the best. What kind of reasoning is that?', 'Bandwagon. Popularity is not evidence of quality.', fig="Fig.picture(['🐑', '🐑'])"),
            outro('Practice evaluating arguments in MAP Reading 8.'),
        ],
    },
    {
        'id': 'poetry8', 'title': 'Reading Poetry and Drama', 'subject': 'lit', 'label': 'Poetry & drama',
        'desc': 'Imagery, form, tone, and dramatic irony.', 'practice': ['lit', 'poetry8', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎭', 'title': 'Poetry and Drama', 'sub': 'Form shapes meaning', 'beats': [B('In poetry and drama, how something is written is part of what it means.')]},
            {'type': 'image', 'heading': 'Imagery and tone', 'figs': ["Fig.picture(['☕', '🌃'])"], 'notes': ['Images create mood', 'Word choice builds tone', 'Ask: how does it feel?'],
             'beats': [B('Imagery is language that appeals to the senses. A coffee pot that mutters creates a quiet, tired mood.'), B('Tone is the attitude behind the words: tender, bitter, playful.')]},
            {'type': 'image', 'heading': 'Dramatic irony', 'figs': ["Fig.picture(['👀', '🎈'])"], 'notes': ['The audience knows more', 'Builds tension or humor', 'Watch the stage directions'],
             'beats': [B('Dramatic irony happens when the audience knows something a character does not.'), B('Stage directions often reveal the secret, building tension or humor.')]},
            quiz('A character says "Worst birthday ever" while the audience can see a surprise party waiting. This is…', ['dramatic irony', 'a simile', 'an objective summary'], 'dramatic irony', 'Quick check. A character says worst birthday ever, while the audience can see the surprise party waiting. What is that?', 'Dramatic irony. We know about the party; she does not.', fig="Fig.picture(['🎂'])"),
            outro('Practice poetry and drama in MAP Reading 8.'),
        ],
    },
    {
        'id': 'myths8', 'title': 'Old Stories, New Stories', 'subject': 'lit', 'label': 'Myths retold',
        'desc': 'How modern stories draw on myths and fables.', 'practice': ['lit', 'myths8', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🏛️', 'title': 'Myths Retold', 'sub': 'What stays, what changes', 'beats': [B('Many modern stories are built on very old ones. Recognizing the pattern deepens the meaning.')]},
            {'type': 'image', 'heading': 'What the new story keeps', 'figs': ["Fig.picture(['🪶', '☀️', '🛸'], 'Icarus → a drone')"], 'notes': ['A pattern: a warning ignored', 'A character type', 'A lesson'],
             'beats': [B('Look for what the new story keeps: a pattern, a type of character, or a lesson.'), B('A drone that climbs too high echoes Icarus flying too close to the sun.')]},
            {'type': 'image', 'heading': 'What it changes', 'figs': ["Fig.picture(['🎻', '🔄'], 'Orpheus reversed')"], 'notes': ['New setting', 'New ending', 'A reversal can flip the theme'],
             'beats': [B('Then ask what changes. A new setting, a new ending, or even a reversal.'), B('When a modern character does not look back, the story turns Orpheus\'s loss into a reward for trust.')]},
            quiz('A boy keeps sending false alerts until no one believes the real one. Which story does this echo?', ['The Boy Who Cried Wolf', 'The Tortoise and the Hare', 'Persephone'], 'The Boy Who Cried Wolf', 'Quick check. A boy keeps sending false alerts until no one believes the real one. Which old story does that echo?', 'The Boy Who Cried Wolf. False alarms destroy trust.', fig="Fig.picture(['🐺'])"),
            outro('Practice myths retold in MAP Reading 8.'),
        ],
    },
    {
        'id': 'words8', 'title': 'Words, Tone, and Connotation', 'subject': 'vocab', 'label': 'Words & tone',
        'desc': 'Roots, context, connotation, irony, and analogies.', 'practice': ['vocab', 'tone8', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔤', 'title': 'Words and Tone', 'sub': 'Meaning and feeling', 'beats': [B('Words have meanings, but they also carry feelings. Both matter on a reading test.')]},
            {'type': 'image', 'heading': 'Roots unlock words', 'figs': ["Fig.picture(['😮'], 'in + cred = not believe')"], 'notes': ['cred = believe', 'chron = time', 'bene = good', 'mal = bad'],
             'beats': [B('Greek and Latin roots unlock long words. Cred means believe, so incredulous means unable to believe.')]},
            {'type': 'image', 'heading': 'Connotation', 'figs': ["Fig.picture(['😊', '😒'], 'thrifty or stingy?')"], 'notes': ['Same meaning, different feeling', 'thrifty (positive)', 'stingy (negative)'],
             'beats': [B('Thrifty and stingy both describe saving money, but thrifty sounds wise and stingy sounds mean.'), B('That difference is connotation, and it shapes a writer\'s tone.')]},
            quiz('"Oh, perfect. My phone died during the movie." The tone is…', ['sarcastic', 'grateful', 'neutral'], 'sarcastic', 'Quick check. Oh, perfect. My phone died during the movie. What is the tone?', 'Sarcastic. The speaker says perfect but means the opposite: verbal irony.', fig="Fig.picture(['📱'])"),
            outro('Practice words and tone in MAP Reading 8.'),
        ],
    },
    {
        'id': 'map-tips-r8', 'title': 'The Reading 6+ Practice Test', 'subject': 'lit', 'color': 'c4', 'label': 'Practice test',
        'desc': 'How the MAP-style test works and strategies for harder passages.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🧭', 'title': 'Reading 6+ Practice', 'sub': 'Strategies for harder passages', 'beats': [B('Here is how the practice test works, and how to handle harder passages.')]},
            {'type': 'image', 'heading': 'It adapts', 'figs': ["Fig.picture(['⬆️', '⬇️'])"], 'notes': ['About half will feel hard', 'Answers lock after Next', 'No time limit'],
             'beats': [B('The test adapts, so about half the questions should feel challenging. That means it is working.'), B('Answers lock when you tap Next, and there is no time limit.')]},
            {'type': 'image', 'heading': 'Read like an analyst', 'figs': ["Fig.picture(['🔍', '📄'])"], 'notes': ['Find the claim or central idea', 'Note shifts: however, yet, but', 'Prove every answer'],
             'beats': [B('Read for the central idea, and notice shifts signaled by words like however, yet, and but.'), B('For every answer, find the words in the text that prove it.')]},
            quiz('Two answers seem right. What should you do?', ['Choose the one the text supports most directly', 'Choose the longer answer', 'Choose the first one'], 'Choose the one the text supports most directly', 'Quick check. Two answers both seem right. What should you do?', 'Choose the one the text supports most directly. "Best" means best supported.', fig="Fig.picture(['✅'])"),
            {'type': 'outro', 'title': 'You are ready', 'sub': 'Read closely and prove your answers.', 'beats': [B('You are ready. Read closely, prove your answers, and do your best.')]},
        ],
    },
]
