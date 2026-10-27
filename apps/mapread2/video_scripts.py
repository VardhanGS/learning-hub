"""MAP Reading 2 video lessons (rendered by tools/make_videos.py mapread2)."""


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
        'id': 'story-parts', 'title': 'The Parts of a Story', 'subject': 'lit', 'label': 'Stories',
        'desc': 'Characters, setting, problem, and solution.', 'practice': ['lit', 'stories', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📖', 'title': 'Story Parts', 'sub': 'Who, where, and what happens', 'beats': [B('Every story has parts. Let us find them together!')]},
            {'type': 'image', 'heading': 'Characters and setting', 'figs': ["Fig.picture(['🧒', '🐕', '🏞️'], 'Mia, Pip, and the park')"], 'notes': ['Characters: who is in the story', 'Setting: where and when'],
             'beats': [B('The characters are who the story is about. Here, Mia and her dog Pip.'), B('The setting is where and when the story happens. Like a snowy park in winter.')]},
            {'type': 'image', 'heading': 'Problem and solution', 'figs': ["Fig.picture(['🧤', '❓', '🐕'], 'The lost mitten')"], 'notes': ['Problem: what goes wrong', 'Solution: how it gets fixed'],
             'beats': [B('Most stories have a problem. Oh no, Mia lost her mitten!'), B('The solution is how the problem gets fixed. Pip digs in the snow and finds it!')]},
            {'type': 'image', 'heading': 'Beginning, middle, end', 'figs': ["Fig.picture(['1️⃣', '2️⃣', '3️⃣'])"], 'notes': ['Beginning: meet the characters', 'Middle: the problem', 'End: the solution'],
             'beats': [B('Stories go in order: a beginning, a middle, and an end.'), B('When you retell a story, tell the parts in that order.')]},
            quiz('Where a story happens is called the…', ['setting', 'character', 'problem'], 'setting', 'Quick quiz! Where a story happens is called the what?', 'The setting! It tells where and when.', fig="Fig.picture(['🏞️'])"),
            outro('Read a story in MAP Reading 2!'),
        ],
    },
    {
        'id': 'main-idea2', 'title': 'Finding the Main Idea', 'subject': 'info', 'label': 'Main idea',
        'desc': 'What a text is mostly about, and the details that tell more.', 'practice': ['info', 'facts', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎯', 'title': 'The Main Idea', 'sub': 'What is it mostly about?', 'beats': [B('When you read facts, ask yourself: what is this mostly about?')]},
            {'type': 'image', 'heading': 'A table and its legs', 'figs': ["Fig.picture(['🦉', '🌙'], 'Owls hunt at night')"], 'notes': ['Main idea = the tabletop', 'Details = the legs', 'Details hold up the main idea'],
             'beats': [B('Think of a table. The main idea is the top.'), B('The details are the legs. They hold up the main idea.'), B('Big eyes, quiet wings, and sharp ears are details. They all tell us that owls are built to hunt at night.')]},
            {'type': 'image', 'heading': 'Not just one detail', 'figs': ["Fig.picture(['⛄', '🛷', '☕'])"], 'notes': ['Sledding is a detail', 'Snow forts are a detail', 'Main idea: winter can be fun'],
             'beats': [B('The main idea is bigger than one detail.'), B('Sledding, snow forts, and hot cocoa are details. Together they say: winter can be fun!')]},
            quiz('Bees make honey. Bees help flowers grow. Bees live in hives. What is the main idea?', ['Bees are busy and important.', 'Bees live in hives.', 'Honey is sweet.'], 'Bees are busy and important.', 'Your turn. Bees make honey. Bees help flowers grow. Bees live in hives. What is the main idea?', 'Bees are busy and important! The other two are just details.', fig="Fig.picture(['🐝', '🍯', '🌸'])"),
            outro('Find main ideas in MAP Reading 2!'),
        ],
    },
    {
        'id': 'context-clues', 'title': 'Be a Word Detective', 'subject': 'vocab', 'label': 'Word meaning',
        'desc': 'Use the words around a new word to figure it out.', 'practice': ['vocab', 'context', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🕵️', 'title': 'Context Clues', 'sub': 'Be a word detective', 'beats': [B('What do you do when you meet a word you do not know? Be a word detective!')]},
            {'type': 'image', 'heading': 'Look around the word', 'figs': ["Fig.picture(['🐶', '✋'], 'The puppy was so tiny it fit in my hand.')"], 'notes': ['New word: tiny', 'Clue: it fit in my hand', 'tiny = very small'],
             'beats': [B('Read this: The puppy was so tiny it fit in my hand.'), B('If it fits in your hand, it must be very small. So tiny means very small!')]},
            {'type': 'image', 'heading': 'Clues in the next sentence', 'figs': ["Fig.picture(['🏜️', '☀️'], 'The desert is arid. It hardly ever rains.')"], 'notes': ['New word: arid', 'Clue: it hardly ever rains', 'arid = dry'],
             'beats': [B('Sometimes the clue is in the next sentence.'), B('The desert is arid. It hardly ever rains there. So arid means very dry.')]},
            quiz('Sam was famished, so he ate two sandwiches. Famished means…', ['very hungry', 'very sleepy', 'very happy'], 'very hungry', 'Try one! Sam was famished, so he ate two sandwiches. What does famished mean?', 'Very hungry! Eating two sandwiches is the clue.', fig="Fig.picture(['🥪', '🥪'])"),
            outro('Practice context clues in MAP Reading 2!'),
        ],
    },
    {
        'id': 'poems2', 'title': 'Reading Poems', 'subject': 'lit', 'label': 'Poems',
        'desc': 'Lines, stanzas, rhymes, and sound words.', 'practice': ['lit', 'poems', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎵', 'title': 'Poems', 'sub': 'Lines, stanzas, and rhymes', 'beats': [B('Poems are like songs made of words. Let us learn how they work.')]},
            {'type': 'image', 'heading': 'Lines and stanzas', 'figs': ["Fig.picture(['📝'], 'A stanza is a group of lines')"], 'notes': ['A poem is written in lines', 'A stanza is a group of lines', 'Like a paragraph in a story'],
             'beats': [B('A poem is written in lines, not long paragraphs.'), B('A group of lines is called a stanza. It is a little like a paragraph.')]},
            {'type': 'image', 'heading': 'Rhymes and sounds', 'figs': ["Fig.picture(['🌧️', '🏠'], 'Tap, tap, tap on the roof')"], 'notes': ['Rhymes: tight, sight', 'Sound words: tap, pop, buzz', 'Repeated lines'],
             'beats': [B('Many poems rhyme. Tight and sight end with the same sound.'), B('Poets use sound words, like tap, tap, tap, so you can hear the rain.'), B('Some poems repeat a line to make a pattern.')]},
            quiz('Which word rhymes with "cake"?', ['lake', 'cook', 'cape'], 'lake', 'Quick quiz! Which word rhymes with cake?', 'Lake! Cake and lake both end with the -ake sound.', fig="Fig.picture(['🎂', '🏞️'])"),
            outro('Read poems in MAP Reading 2!'),
        ],
    },
    {
        'id': 'text-features', 'title': 'Text Features', 'subject': 'info', 'label': 'Text features',
        'desc': 'Headings, captions, bold words, and the table of contents.', 'practice': ['info', 'features', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🗂️', 'title': 'Text Features', 'sub': 'Tools for finding facts', 'beats': [B('Nonfiction books have special tools that help you find facts fast.')]},
            {'type': 'image', 'heading': 'Parts of a page', 'figs': ["Fig.pageFig({ heading: 'Frogs Need Water', icon: '🐸', caption: 'A frog rests on a lily pad.', bold: 'tadpole' })"], 'notes': ['Heading: the topic', 'Caption: tells about a picture', 'Bold word: important!'],
             'beats': [B('The heading at the top tells what the page is about.'), B('The caption under the picture tells about the picture.'), B('A bold word is an important word. You can look it up in the glossary.')]},
            {'type': 'image', 'heading': 'Table of contents', 'figs': ["Fig.listFig('All About Sharks: Contents', [['Sharks Are Fish', 4], ['Sharp Teeth', 8], ['What Sharks Eat', 12]])"], 'notes': ['Chapters and page numbers', 'Find a chapter fast'],
             'beats': [B('The table of contents lists the chapters and their page numbers.'), B('Want to read about sharp teeth? Turn to page 8!', 'Want to read about sharp teeth? Turn to page eight!')]},
            quiz('Where do you look to find what a word means?', ['the glossary', 'the heading', 'the caption'], 'the glossary', 'Quick quiz! Where do you look to find what a word means?', 'The glossary! It lists important words and their meanings.', fig="Fig.listFig('Glossary', [['hive', 'the home where bees live']], false)"),
            outro('Practice text features in MAP Reading 2!'),
        ],
    },
    {
        'id': 'steps2', 'title': 'Steps and Sequence', 'subject': 'info', 'label': 'Steps',
        'desc': 'Time words, how-to steps, and causes and effects.', 'practice': ['info', 'steps', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔗', 'title': 'In Order', 'sub': 'First, next, then, finally', 'beats': [B('Some texts tell steps or events in order. Let us follow them.')]},
            {'type': 'image', 'heading': 'Time words', 'figs': ["Fig.picture(['1️⃣', '2️⃣', '3️⃣', '4️⃣'])"], 'notes': ['First', 'Next', 'Then', 'Finally'],
             'beats': [B('Look for time words: first, next, then, and finally.'), B('They tell you what to do and when.')]},
            {'type': 'image', 'heading': 'A life cycle', 'figs': ["Fig.picture(['🥚', '🐸'], 'egg → tadpole → frog')"], 'notes': ['egg', 'tadpole', 'frog'],
             'beats': [B('Some texts tell how one thing leads to the next.'), B('A frog starts as an egg, then becomes a tadpole, then grows into a frog.')]},
            {'type': 'image', 'heading': 'Cause and effect', 'figs': ["Fig.picture(['🦫', '🪵', '🌊'], 'A dam makes a pond')"], 'notes': ['Cause: why it happens', 'Effect: what happens'],
             'beats': [B('A cause is why something happens. An effect is what happens.'), B('A beaver builds a dam. Because of that, a pond forms.')]},
            quiz('What do you do FIRST to plant a seed?', ['Fill the cup with soil', 'Water the sprout', 'Pick the flower'], 'Fill the cup with soil', 'Your turn. What do you do first to plant a seed?', 'Fill the cup with soil! You need soil before the seed.', fig="Fig.picture(['🪴'])"),
            outro('Practice steps in MAP Reading 2!'),
        ],
    },
    {
        'id': 'word-parts', 'title': 'Word Parts', 'subject': 'vocab', 'label': 'Word parts',
        'desc': 'Compound words, prefixes, and suffixes.', 'practice': ['vocab', 'wordparts', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧩', 'title': 'Word Parts', 'sub': 'Big words have small pieces', 'beats': [B('Big words are often made of smaller pieces. Let us take them apart!')]},
            {'type': 'image', 'heading': 'Compound words', 'figs': ["Fig.picture(['🌧️', '➕', '🧥'], 'rain + coat = raincoat')"], 'notes': ['rain + coat = raincoat', 'sun + flower = sunflower'],
             'beats': [B('A compound word is two words stuck together.'), B('Rain plus coat makes raincoat: a coat you wear in the rain.')]},
            {'type': 'image', 'heading': 'Prefixes and suffixes', 'figs': ["Fig.picture(['🔁', '📖'], 're + read = read again')"], 'notes': ['un- = not', 're- = again', '-ful = full of', '-less = without'],
             'beats': [B('A prefix goes at the start of a word. Un means not, and re means again.'), B('A suffix goes at the end. Ful means full of, and less means without.'), B('So fearless means without fear!')]},
            quiz('What does "unhappy" mean?', ['not happy', 'happy again', 'very happy'], 'not happy', 'Quick quiz! What does unhappy mean?', 'Not happy! The prefix un means not.', fig="Fig.picture(['😟'])"),
            outro('Practice word parts in MAP Reading 2!'),
        ],
    },
    {
        'id': 'map-tips-r2', 'title': 'Your Reading Practice Test', 'subject': 'lit', 'color': 'c4', 'label': 'Practice test',
        'desc': 'What the MAP-style reading test is like, and how to do your best.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🧭', 'title': 'Your Reading Test', 'sub': 'How it works, and how to do your best', 'beats': [B('Hi, reader! Let us get ready for your reading practice test.')]},
            {'type': 'image', 'heading': 'Read it yourself', 'figs': ["Fig.picture(['📖', '🤫'])"], 'notes': ['No read-aloud on this test', 'Read the passage first', 'Then read the question'],
             'beats': [B('On this test, you read the passages yourself. No one reads them to you.'), B('Read the passage first. Then read the question carefully.')]},
            {'type': 'image', 'heading': 'Go back to the text', 'figs': ["Fig.picture(['🔍', '📄'])"], 'notes': ['The answer is in the text', 'Look back to check', 'Tap the sentence that proves it'],
             'beats': [B('The answer is usually right there in the text. Look back to check!'), B('Some questions ask you to tap the sentence that proves your answer.')]},
            {'type': 'image', 'heading': 'It changes as you go', 'figs': ["Fig.picture(['⬆️', '⬇️'])"], 'notes': ['Right: a bit harder', 'Missed: a bit easier', 'No time limit'],
             'beats': [B('The test changes as you go. Hard questions mean you are doing great.'), B('There is no time limit, so take your time.')]},
            quiz('You are not sure of an answer. What should you do?', ['Look back at the passage', 'Pick the longest answer', 'Skip it'], 'Look back at the passage', 'Quick quiz! You are not sure of an answer. What should you do?', 'Look back at the passage! The answer is in the text.', fig="Fig.picture(['🔍'])"),
            {'type': 'outro', 'title': 'You are ready!', 'sub': 'Read carefully and do your best.', 'beats': [B('You are ready. Read carefully, and do your best!')]},
        ],
    },
    # ---- added 2026-10-27 (plan item 3): skills that had no video ----
    {
        'id': 'characters2', 'title': 'Characters and How They Feel', 'subject': 'lit', 'label': 'Characters',
        'desc': 'What a character wants, how they feel, how they change, and what they are like inside.', 'practice': ['lit', 'characters', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧒', 'title': 'Characters', 'sub': 'Who they are and how they change', 'beats': [B('The people and animals in a story are called characters. Let us get to know them!')]},
            {'type': 'image', 'heading': 'Want, problem, feeling', 'figs': ["Fig.picture(['👟', '❓', '😟'], 'Max cannot find his shoe')"], 'notes': ['Want: go to the park', 'Problem: a lost shoe', 'Feeling: worried'],
             'beats': [B('Max wants to go to the park.'), B('But he cannot find his shoe! That is his problem.'), B('How does he feel? Worried.'), B('Good readers notice what a character wants, what goes wrong, and how they feel.')]},
            {'type': 'image', 'heading': 'Characters change', 'figs': ["Fig.picture(['😟', '➡️', '😊'], 'Beginning → end')"], 'notes': ['Beginning: nervous', 'Something happens', 'End: proud'],
             'beats': [B('Rosa is nervous about reading her poem to the class.'), B('Then her friend gives her a thumbs up, and she reads it out loud.'), B('At the end, Rosa feels proud. She changed!'), B('Ask: how did the character feel at the start, and at the end? Why?')]},
            {'type': 'image', 'heading': 'What are they like inside?', 'figs': ["Fig.picture(['🧒', '🦁', '⚖️'], 'brave · fair')"], 'notes': ['Clue: what they say', 'Clue: what they do', 'Trait: brave, fair, kind…'],
             'beats': [B('A character trait tells what someone is like inside.'), B('Look at what the character says.'), B('And look at what the character does.'), B('Ava shares the last cookie in half, so it is fair for both. Ava is fair!')]},
            quiz('Leo helps a new kid find the lunchroom. What is Leo like?', ['helpful', 'sleepy', 'silly'], 'helpful', 'Your turn! Leo helps a new kid find the lunchroom. What is Leo like?', 'Helpful! What Leo does is the clue.', fig="Fig.picture(['🧒', '🤝', '🧒'])"),
            outro('Meet more characters in MAP Reading 2!'),
        ],
    },
    {
        'id': 'purpose2', 'title': 'Why Did the Author Write It?', 'subject': 'info', 'label': "Author's purpose",
        'desc': 'To explain, to entertain, or to persuade; a point and its reasons; two texts on one topic.', 'practice': ['info', 'purpose', 0],
        'scenes': [
            {'type': 'title', 'emoji': '✍️', 'title': "Author's Purpose", 'sub': 'Why did they write it?', 'beats': [B('Every author has a reason for writing. Let us be detectives and find it!')]},
            {'type': 'image', 'heading': 'Three big reasons', 'figs': ["Fig.picture(['📘', '😂', '📣'], 'Explain · entertain · persuade')"], 'notes': ['Explain: teach facts or steps', 'Entertain: tell a fun story', 'Persuade: make you think or do'],
             'beats': [B('Authors write for three big reasons.'), B('To explain: to teach you facts, or how to do something.'), B('To entertain: to tell a fun story, like a talking snowman!'), B('To persuade: to make you think something, or do something.')]},
            {'type': 'image', 'heading': 'A point and its reasons', 'figs': ["Fig.picture(['🌻', '🥕', '🏫'], 'Our school needs a garden')"], 'notes': ['Point: we need a garden', 'Reason: we can learn', 'Reason: we can grow food'],
             'beats': [B('When an author wants you to agree, they give a point and reasons.'), B('The point: our school needs a garden.'), B('One reason: we can learn about plants.'), B('Another reason: we can grow healthy food. Reasons hold up the point!')]},
            {'type': 'image', 'heading': 'Two texts, one topic', 'figs': ["Fig.table([['Text 1', 'Text 2'], ['facts about bees', 'a story about a beehive visit'], ['to explain', 'to entertain']])"], 'notes': ['Same topic: bees', 'Text 1 tells facts', 'Text 2 tells a story'],
             'beats': [B('Two texts can be about the same topic.'), B('Both of these are about bees.'), B('Text 1 tells true facts about how bees make honey.'), B('Text 2 tells a story about visiting a beehive. Same topic, different ways!')]},
            quiz('"Ten Steps to Wash a Dog." Why did the author write it?', ['to explain', 'to entertain', 'to persuade'], 'to explain', 'Your turn! A text is called Ten Steps to Wash a Dog. Why did the author write it?', 'To explain! Steps teach you how to do something.', fig="Fig.picture(['🐕', '🛁', '🧽'])"),
            outro("Find the author's purpose in MAP Reading 2!"),
        ],
    },
    {
        'id': 'wordplay2', 'title': 'Fun with Words', 'subject': 'vocab', 'label': 'Word play',
        'desc': 'Stronger and weaker words, opposites, words with two meanings, similes, and sayings.', 'practice': ['vocab', 'wordplay', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎈', 'title': 'Fun with Words', 'sub': 'Shades, opposites, and two meanings', 'beats': [B('Words can be strong or weak, opposite, or even have two meanings. Let us play!')]},
            {'type': 'image', 'heading': 'Weaker to stronger', 'figs': ["Fig.picture(['😌', '🥶', '🧊'], 'cool → cold → freezing')"], 'notes': ['cool: a little cold', 'cold', 'freezing: very, very cold'],
             'beats': [B('Some words mean almost the same thing, but one is stronger.'), B('Cool is a little bit cold.'), B('Cold is more.'), B('Freezing is very, very cold! It is the strongest word.')]},
            {'type': 'image', 'heading': 'Opposites', 'figs': ["Fig.picture(['🫙', '↔️', '🍯'], 'empty ↔ full')"], 'notes': ['empty ↔ full', 'quiet ↔ loud'],
             'beats': [B('Opposites mean completely different things.'), B('Empty and full are opposites.'), B('Quiet and loud are opposites too.')]},
            {'type': 'image', 'heading': 'One word, two meanings', 'figs': ["Fig.picture(['🦇', '🏏'], 'bat and bat')"], 'notes': ['The bat flew: an animal', 'Leo swung the bat: a stick', 'The sentence tells you which'],
             'beats': [B('Some words have two meanings.'), B('The bat flew out of the cave. Here a bat is an animal.'), B('Leo swung the bat. Here a bat is a stick for hitting a ball.'), B('Read the whole sentence to know which one it is.')]},
            {'type': 'image', 'heading': 'Not exactly what it says', 'figs': ["Fig.picture(['🐱', '☁️'], 'as soft as a cloud')"], 'notes': ['Simile: like or as', 'as soft as a cloud = very soft', 'a piece of cake = easy'],
             'beats': [B('Some words do not mean exactly what they say.'), B('A simile compares two things with like or as.'), B('The kitten is as soft as a cloud. That means very, very soft.'), B('And a piece of cake can mean something is easy, not a real cake!')]},
            quiz('Which word is the STRONGEST?', ['big', 'huge', 'large'], 'huge', 'Your turn! Which word is the strongest: big, huge, or large?', 'Huge! It means very, very big.', fig="Fig.picture(['🐘'])"),
            outro('Play with words in MAP Reading 2!'),
        ],
    },
]
