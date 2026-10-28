"""MAP Reading 4 video lessons (rendered by tools/make_videos.py mapread4)."""


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


def quiz(q, opts, a, ask, reveal, fig=None):
    return {'type': 'quiz', 'q': q, 'opts': opts, 'a': a, 'fig': fig,
            'beats': [B(ask, role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B(reveal, role='reveal')]}


def outro(sub):
    return {'type': 'outro', 'title': 'Your turn!', 'sub': sub, 'beats': [B('Now it is your turn. ' + sub)]}


VIDEOS = [
    {
        'id': 'theme4', 'title': 'Finding the Theme', 'subject': 'lit', 'label': 'Theme',
        'desc': 'What a story teaches, and the evidence that shows it.', 'practice': ['lit', 'stories4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '💡', 'title': 'Theme', 'sub': 'The big idea of a story', 'beats': [B('Every good story has a big idea hiding inside it. That big idea is called the theme.')]},
            {'type': 'image', 'heading': 'Topic or theme?', 'figs': ["Fig.picture(['🌋', '🎀'], 'A science fair volcano')"], 'notes': ['Topic: a science fair', 'Theme: fixing a mistake can matter more than winning'],
             'beats': [B('A topic is what a story is about, like a science fair.'), B('A theme is the lesson, like: fixing a mistake can matter more than winning.'), B('A theme is a full sentence that could apply to anyone.')]},
            {'type': 'image', 'heading': 'How to find it', 'figs': ["Fig.picture(['😒', '➡️', '😊'], 'How did the character change?')"], 'notes': ['What does the character want?', 'What changes them?', 'What do they learn?'],
             'beats': [B('Ask three questions. What does the character want? What changes them? And what do they learn?'), B('The answer to the last question is often the theme.')]},
            {'type': 'image', 'heading': 'Prove it', 'figs': ["Fig.picture(['🔍', '📄'], 'Find the evidence')"], 'notes': ['Find a sentence that shows it', 'Look at the ending', 'Look at the turning point'],
             'beats': [B('Good readers prove the theme with evidence.'), B('Look closely at the turning point and the ending. That is where the lesson shows.')]},
            quiz('Sofia learns that a smooth handoff can win a relay. What is the theme?', ['Every part of a team matters.', 'Relays are hard to run.', 'Best friends compete.'], 'Every part of a team matters.', 'Quick quiz! Sofia learns that a smooth handoff can win a relay. What is the theme?', 'Every part of a team matters, even the parts no one cheers for!', fig="Fig.picture(['🏃'])"),
            outro('Find themes in MAP Reading 4!'),
        ],
    },
    {
        'id': 'poems-plays', 'title': 'Poems and Plays', 'subject': 'lit', 'label': 'Poems & plays',
        'desc': 'Verse, stanzas, rhythm, and the parts of a play.', 'practice': ['lit', 'poemsplays', 1],
        'scenes': [
            {'type': 'title', 'emoji': '🎭', 'title': 'Poems and Plays', 'sub': 'How they are built', 'beats': [B('Stories, poems, and plays are built in different ways. Let us compare them.')]},
            {'type': 'image', 'heading': 'Poems', 'figs': ["Fig.picture(['🍂', '📝'], 'Lines and stanzas')"], 'notes': ['Written in verse: lines', 'Stanzas: groups of lines', 'Rhythm and rhyme'],
             'beats': [B('Poems are written in verse, which means lines instead of paragraphs.'), B('Groups of lines are stanzas. Many poems have rhythm, a beat, and some have rhyme.')]},
            {'type': 'image', 'heading': 'Plays', 'figs': ["Fig.picture(['🎭', '📜'], 'A script')"], 'notes': ['Cast of characters', 'Setting', 'Dialogue', 'Stage directions'],
             'beats': [B('A play is written for actors.'), B('It begins with a cast of characters and a setting.'), B('Characters speak in dialogue, and stage directions in parentheses tell actors how to move and speak.')]},
            quiz('In a play, what do stage directions do?', ['Tell actors how to move and speak', 'List the rhyming words', 'Tell the theme'], 'Tell actors how to move and speak', 'Quick quiz! In a play, what do stage directions do?', 'They tell actors how to move and speak!', fig="Fig.picture(['🎬'])"),
            outro('Read poems and plays in MAP Reading 4!'),
        ],
    },
    {
        'id': 'pov4', 'title': 'Point of View', 'subject': 'lit', 'label': 'Point of view',
        'desc': 'First person, third person, and how a narrator shapes a story.', 'practice': ['lit', 'pov', 0],
        'scenes': [
            {'type': 'title', 'emoji': '👀', 'title': 'Point of View', 'sub': 'Who is telling the story?', 'beats': [B('Who is telling the story? The answer changes everything.')]},
            {'type': 'image', 'heading': 'First person', 'figs': ["Fig.picture(['🙋'], 'I · me · my')"], 'notes': ['Uses I, me, my', 'The narrator is a character', 'Knows only their own thoughts'],
             'beats': [B('In first person, the narrator says I and my. The narrator is in the story.'), B('A first person narrator knows their own thoughts, but has to guess about everyone else.')]},
            {'type': 'image', 'heading': 'Third person', 'figs': ["Fig.picture(['👀', '🧒', '👧'], 'he · she · they')"], 'notes': ['Uses he, she, they', 'The narrator is outside', 'Can show many characters'],
             'beats': [B('In third person, the narrator says he, she, and they.'), B('The narrator is outside the story, and can sometimes show what many characters think.')]},
            quiz('"My hands were shaking as I stepped onto the court." Which point of view?', ['First person', 'Third person', 'Second person'], 'First person', 'Quick quiz! My hands were shaking as I stepped onto the court. Which point of view is that?', 'First person! The narrator says my and I.', fig="Fig.picture(['🏀'])"),
            outro('Practice point of view in MAP Reading 4!'),
        ],
    },
    {
        'id': 'summary4', 'title': 'Main Idea and Summary', 'subject': 'info', 'label': 'Summary',
        'desc': 'Find the main idea and write a strong summary.', 'practice': ['info', 'articles4', 1],
        'scenes': [
            {'type': 'title', 'emoji': '📰', 'title': 'Summarizing', 'sub': 'The most important ideas, short', 'beats': [B('A summary tells the most important ideas of a text in just a few sentences.')]},
            {'type': 'image', 'heading': 'Main idea and details', 'figs': ["Fig.picture(['🐙', '🫙', '🪸'], 'The clever octopus')"], 'notes': ['Main idea: what it is mostly about', 'Details: facts that support it'],
             'beats': [B('First find the main idea: what is the whole text mostly about?'), B('Then find the key details that support it, like solving puzzles, changing color, and squirting ink.')]},
            {'type': 'image', 'heading': 'A strong summary', 'figs': ["Fig.picture(['✂️', '📄'], 'Keep it short')"], 'notes': ['Include the main idea', 'Keep events in order', 'Leave out small details and opinions'],
             'beats': [B('A strong summary includes the main idea and the most important points, in order.'), B('Leave out small details and your own opinions.')]},
            quiz('Which belongs in a summary?', ['The most important ideas', 'Every small detail', 'Your favorite part'], 'The most important ideas', 'Quick quiz! Which belongs in a summary?', 'The most important ideas! Small details and opinions stay out.', fig="Fig.picture(['📝'])"),
            outro('Practice summarizing in MAP Reading 4!'),
        ],
    },
    {
        'id': 'structure4', 'title': 'Text Structures', 'subject': 'info', 'label': 'Structure',
        'desc': 'Five ways authors organize nonfiction, and the signal words.', 'practice': ['info', 'structure4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🏗️', 'title': 'Text Structure', 'sub': 'How nonfiction is built', 'beats': [B('Authors organize nonfiction in five main ways. Knowing them helps you understand what you read.')]},
            {'type': 'image', 'heading': 'Five structures', 'figs': ["Fig.table([['Structure', 'Clue words'], ['Time order', 'first, then'], ['Compare', 'both, unlike'], ['Cause/effect', 'because, so'], ['Problem/solution', 'to fix this']], 'Text structures')"], 'notes': ['Chronological order', 'Compare and contrast', 'Cause and effect', 'Problem and solution'],
             'beats': [B('Chronological order tells events in time order.'), B('Compare and contrast shows how things are alike and different.'), B('Cause and effect explains why things happen. Problem and solution shows how a problem was fixed.'), B('And description tells what something is like.')]},
            {'type': 'image', 'heading': 'Signal words', 'figs': ["Fig.picture(['🔍', '🔤'])"], 'notes': ['however, unlike → contrast', 'because, as a result → cause and effect', 'first, finally → time order'],
             'beats': [B('Signal words are clues. However and unlike show contrast.'), B('Because and as a result show cause and effect.')]},
            quiz('"Because there was less sunlight, the leaves changed color." Which structure?', ['Cause and effect', 'Compare and contrast', 'Description'], 'Cause and effect', 'Quick quiz! Because there was less sunlight, the leaves changed color. Which structure is that?', 'Cause and effect! Because is the signal word.', fig="Fig.picture(['🍁'])"),
            outro('Practice text structure in MAP Reading 4!'),
        ],
    },
    {
        'id': 'context4', 'title': 'Context Clues', 'subject': 'vocab', 'label': 'Context clues',
        'desc': 'Definition, example, and contrast clues.', 'practice': ['vocab', 'context4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🕵️', 'title': 'Context Clues', 'sub': 'Figure out new words', 'beats': [B('When you meet a word you do not know, the words around it can help.')]},
            {'type': 'image', 'heading': 'Definition clues', 'figs': ["Fig.picture(['🏔️'], 'the summit, or the very top')"], 'notes': ['Look for "or" and "which means"', 'The meaning is right there'],
             'beats': [B('Sometimes the sentence tells you the meaning, after a comma or the word or.'), B('The hikers reached the summit, or the very top. So summit means the top.')]},
            {'type': 'image', 'heading': 'Example and contrast clues', 'figs': ["Fig.picture(['🐸', '🤐'])"], 'notes': ['such as, like → examples', 'unlike, but, although → opposites'],
             'beats': [B('Example clues use words like such as. Amphibians, such as frogs and toads.'), B('Contrast clues use words like unlike. Unlike his talkative sister, Ben was reserved. So reserved means quiet.')]},
            quiz('"Unlike the noisy hallway, the library was tranquil." Tranquil means…', ['calm and quiet', 'loud and busy', 'dark and cold'], 'calm and quiet', 'Try one! Unlike the noisy hallway, the library was tranquil. What does tranquil mean?', 'Calm and quiet! Unlike tells you it is the opposite of noisy.', fig="Fig.picture(['📚'])"),
            outro('Practice context clues in MAP Reading 4!'),
        ],
    },
    {
        'id': 'figurative4', 'title': 'Figurative Language', 'subject': 'vocab', 'label': 'Figurative language',
        'desc': 'Similes, metaphors, idioms, and allusions.', 'practice': ['vocab', 'figurative4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎨', 'title': 'Figurative Language', 'sub': 'Words that paint pictures', 'beats': [B('Writers use figurative language to paint pictures in your mind.')]},
            {'type': 'image', 'heading': 'Similes and metaphors', 'figs': ["Fig.picture(['🏃', '🦁'])"], 'notes': ['Simile: like or as', 'Metaphor: one thing is another'],
             'beats': [B('A simile compares using like or as. His legs felt like jelly.'), B('A metaphor says one thing is another. The classroom was a zoo.')]},
            {'type': 'image', 'heading': 'Idioms and allusions', 'figs': ["Fig.picture(['🍰', '💪'])"], 'notes': ['Idiom: a piece of cake = easy', 'Allusion: a Herculean task'],
             'beats': [B('An idiom is a saying that does not mean exactly what it says. A piece of cake means very easy.'), B('An allusion points to a famous story. A Herculean task needs the strength of Hercules.')]},
            quiz('"The stars were diamonds in the sky." This is a…', ['metaphor', 'simile', 'idiom'], 'metaphor', 'Quick quiz! The stars were diamonds in the sky. What kind of figurative language is that?', 'A metaphor! It says the stars ARE diamonds, with no like or as.', fig="Fig.picture(['✨'])"),
            outro('Practice figurative language in MAP Reading 4!'),
        ],
    },
    {
        'id': 'map-tips-r4', 'title': 'Your Reading Practice Test', 'subject': 'lit', 'color': 'c4', 'label': 'Practice test',
        'desc': 'What the MAP-style reading test is like, and strategies that help.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🧭', 'title': 'Your Reading Test', 'sub': 'Strategies that help', 'beats': [B('Ready for your reading practice test? Here are strategies that really help.')]},
            {'type': 'image', 'heading': 'Question first, then passage', 'figs': ["Fig.picture(['❓', '📖'])"], 'notes': ['Skim the question', 'Read the passage carefully', 'Then answer'],
             'beats': [B('Glance at the question first, so you know what to look for.'), B('Then read the passage carefully before you answer.')]},
            {'type': 'image', 'heading': 'Prove it with the text', 'figs': ["Fig.picture(['🔍', '📄'])"], 'notes': ['Find the sentence that proves it', 'Cross out choices that are not in the text', 'Watch for "NOT" and "BEST"'],
             'beats': [B('Find the sentence that proves your answer.'), B('Rule out choices the text does not support, and watch for words like NOT and BEST.')]},
            {'type': 'image', 'heading': 'It adapts to you', 'figs': ["Fig.picture(['⬆️', '⬇️'])"], 'notes': ['Hard questions are normal', 'Answers lock after Next', 'No time limit'],
             'beats': [B('The test adapts, so hard questions are normal and mean you are doing well.'), B('Your answer locks when you tap Next, and there is no time limit.')]},
            quiz('A question asks which detail BEST supports the main idea. What should you do?', ['Check each choice against the passage', 'Pick the longest choice', 'Pick the first choice'], 'Check each choice against the passage', 'Quick quiz! A question asks which detail best supports the main idea. What should you do?', 'Check each choice against the passage! The best answer is the one the text proves.', fig="Fig.picture(['✅'])"),
            {'type': 'outro', 'title': 'You are ready!', 'sub': 'Read carefully and prove your answers.', 'beats': [B('You are ready. Read carefully, prove your answers, and do your best!')]},
        ],
    },
    # ---- added 2026-10-27 (plan item 3): skills that had no video ----
    {
        'id': 'evidence4', 'title': 'Reasons and Evidence', 'subject': 'info', 'label': 'Reasons & evidence',
        'desc': 'Firsthand and secondhand accounts, claims with reasons and evidence, and two authors who disagree.', 'practice': ['info', 'evidence4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧾', 'title': 'Reasons and Evidence', 'sub': 'How authors back up what they say', 'beats': [B('Strong writers do not just say things. They prove them. Let us see how.')]},
            {'type': 'image', 'heading': 'Firsthand or secondhand?', 'note_from': 0, 'figs': ["Fig.picture(['🙋', '📰'], 'Firsthand · secondhand')"], 'notes': ['Firsthand: “I was there”', 'Uses I, my, we', 'Secondhand: learned from others'],
             'beats': [B('A firsthand account is written by someone who was there.'), B('It uses words like I, my, and we. "My fingers froze as I shoveled."'), B('A secondhand account is written by someone who learned about it from others, like a news report: 30 inches of snow fell.')]},
            {'type': 'image', 'heading': 'Claim, reason, evidence', 'figs': ["Fig.table([['Claim', 'Reason', 'Evidence'], ['Start school later', 'Kids need sleep', 'Doctors: 9–12 hours']])"], 'notes': ['Claim: what the author wants you to believe', 'Reason: why', 'Evidence: facts that prove it'],
             'beats': [B('A claim is what the author wants you to believe: school should start later.'), B('A reason tells why: kids need more sleep.'), B('Evidence proves the reason: doctors say kids need 9 to 12 hours of sleep.'), B('Facts, numbers, and expert opinions are all evidence.')]},
            {'type': 'image', 'heading': 'When authors disagree', 'figs': ["Fig.picture(['🦅', '⚖️', '🐘'], 'Two sides')"], 'notes': ['Author 1: zoos protect animals', 'Author 2: animals need the wild', 'Compare the evidence'],
             'beats': [B('Two authors can disagree about the same topic.'), B('One says zoos protect animals, and gives the example of condors saved by zoo programs.'), B('The other says big animals need the wild, because elephants walk miles every day.'), B('Compare each claim and the evidence behind it. They might even agree on some things!')]},
            quiz('"Bikes save money, because a bus pass costs $50 a month." Which part is the evidence?', ['Bikes save money', 'a bus pass costs $50 a month', 'because'], 'a bus pass costs $50 a month', 'Quick quiz! Bikes save money, because a bus pass costs fifty dollars a month. Which part is the evidence?', 'The bus pass costs fifty dollars a month. It is a fact that supports the claim.', fig="Fig.picture(['🚲', '💵'])"),
            outro('Find reasons and evidence in MAP Reading 4!'),
        ],
    },
    {
        'id': 'visuals4', 'title': 'Charts, Graphs, and Timelines', 'subject': 'info', 'label': 'Charts & timelines',
        'desc': 'Read the title, labels, and key, and use visuals together with the words.', 'practice': ['info', 'visuals4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📊', 'title': 'Reading Visuals', 'sub': 'Pictures that hold information', 'beats': [B('Articles often include graphs, tables, and timelines. They tell part of the story too!')]},
            {'type': 'image', 'heading': 'Title, labels, key', 'note_from': 0, 'figs': ["Fig.barGraph('Favorite recess activity', [['Tag', 12], ['Soccer', 9], ['Jump rope', 10]], 2)"], 'notes': ['Title: what it is about', 'Labels: what each bar means', 'Then read the numbers'],
             'beats': [B('Before you read the numbers, read the title. This graph is about favorite recess activities.'), B('Next, read the labels under each bar.'), B('Now read the numbers. Tag has 12 votes, the most.')]},
            {'type': 'image', 'heading': 'What does it add?', 'figs': ["Fig.table([['Month', 'Rain (in.)'], ['March', '4'], ['April', '6']], 'Monthly rainfall')"], 'notes': ['Text: spring is rainy', 'Table: exact inches', 'The visual adds details'],
             'beats': [B('A visual can support the words, or add something new.'), B('The text says spring is rainy.'), B('The table adds the exact numbers: 4 inches in March and 6 in April.'), B('Ask yourself: what does the visual show that the words do not?')]},
            {'type': 'image', 'heading': 'Timelines', 'figs': ["Fig.table([['Year', 'Event'], ['1876', 'First phone call'], ['1973', 'First mobile phone call']], 'Telephone timeline')"], 'notes': ['Events in time order', 'Earliest at the top', '1973 − 1876 = 97 years'],
             'beats': [B('A timeline shows events in the order they happened.'), B('The first telephone call was in 1876.'), B('The first mobile phone call was in 1973.'), B('Subtract to find how far apart they were: 97 years!')]},
            quiz('In the recess graph, which activity got 9 votes?', ['Tag', 'Soccer', 'Jump rope'], 'Soccer', 'Quick quiz! In the recess graph, which activity got 9 votes?', 'Soccer! Its bar stops at 9.', fig="Fig.barGraph('Favorite recess activity', [['Tag', 12], ['Soccer', 9], ['Jump rope', 10]], 2)"),
            outro('Read charts and timelines in MAP Reading 4!'),
        ],
    },
    {
        'id': 'roots4', 'title': 'Roots, Prefixes, and Suffixes', 'subject': 'vocab', 'label': 'Roots & affixes',
        'desc': 'Word parts carry meaning: prefixes, suffixes, and Greek and Latin roots.', 'practice': ['vocab', 'roots4', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧩', 'title': 'Word Parts', 'sub': 'Big words, small pieces', 'beats': [B('Big words are often built from small parts. If you know the parts, you can figure out the word.')]},
            {'type': 'image', 'heading': 'Prefixes and suffixes', 'figs': ["Fig.table([['Part', 'Means', 'Example'], ['dis-, in-', 'not', 'dishonest'], ['mis-', 'wrongly', 'misplace'], ['-ful', 'full of', 'hopeful'], ['-able', 'able to be', 'washable']])"], 'notes': ['Prefix: at the start', 'Suffix: at the end', 'mis + place = put in the wrong place'],
             'beats': [B('A prefix goes at the start of a word. A suffix goes at the end.'), B('Dis and in mean not. Dishonest means not honest.'), B('Mis means wrongly. To misplace something is to put it in the wrong place.'), B('Ful means full of, and able means able to be. Washable means able to be washed.')]},
            {'type': 'image', 'heading': 'Greek and Latin roots', 'figs': ["Fig.table([['Root', 'Means', 'Word'], ['tele', 'far', 'telescope'], ['port', 'carry', 'transport'], ['vis', 'see', 'visible'], ['aud', 'hear', 'audience']])"], 'notes': ['tele = far', 'port = carry', 'vis = see, aud = hear'],
             'beats': [B('Many English words come from Greek and Latin roots.'), B('Tele means far. A telescope helps you see things far away.'), B('Port means carry. To transport is to carry across.'), B('Vis means see, and aud means hear. An audience is the people who hear a show.')]},
            {'type': 'image', 'heading': 'Add up the parts', 'figs': ["Fig.table([['auto', 'bio', 'graph', 'y'], ['self', 'life', 'write', '(thing)']], 'autobiography')"], 'notes': ['auto = self', 'bio = life', 'graph = write → a story of your own life'],
             'beats': [B('Long words can have three or four parts.'), B('Auto means self.'), B('Bio means life.'), B('Graph means write. So an autobiography is a life story written by yourself!')]},
            quiz('What does "inaudible" mean?', ['not able to be heard', 'very loud', 'able to be seen'], 'not able to be heard', 'Quick quiz! In means not, aud means hear, and ible means able to be. What does inaudible mean?', 'Not able to be heard! Add up the parts.', fig="Fig.picture(['🤫'])"),
            outro('Practice word parts in MAP Reading 4!'),
        ],
    },
]
