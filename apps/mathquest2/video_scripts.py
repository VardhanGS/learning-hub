"""Math Quest 2 video lessons (rendered by tools/make_videos.py mathquest2).
`text` is the caption; `say` (optional) is what the narrator speaks when it should differ from the caption."""


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


def quiz(q, opts, a, ask, reveal, ask_say=None, reveal_say=None):
    return {'type': 'quiz', 'q': q, 'opts': opts, 'a': a,
            'beats': [B(ask, ask_say, role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B(reveal, reveal_say, role='reveal')]}


def outro(sub):
    return {'type': 'outro', 'title': 'Your turn!', 'sub': sub, 'beats': [B('Now it is your turn. ' + sub)]}


VIDEOS = [
    {
        'id': 'regroup', 'title': 'Regrouping: 10 Ones Make a Ten', 'subject': 'add', 'label': 'Add & Subtract',
        'desc': 'Adding and subtracting two-digit numbers when the ones need regrouping.', 'practice': ['add', 'addsub', 1],
        'scenes': [
            {'type': 'title', 'emoji': '🧮', 'title': 'Regrouping', 'sub': '10 ones make 1 ten', 'beats': [B("Let's learn how to regroup when we add and subtract.")]},
            {'type': 'image', 'heading': '47 + 35', 'figs': ['Fig.addBlocks(47, 35)'], 'notes': ['7 ones + 5 ones = 12 ones', '12 ones = 1 ten + 2 ones', '4 tens + 3 tens + 1 ten = 8 tens'],
             'beats': [B('Here is 47 plus 35, in tens and ones.', 'Here is forty-seven plus thirty-five, in tens and ones.'), B('First add the ones. 7 plus 5 is 12 ones.'), B('12 ones is too many for the ones place. Trade 10 ones for 1 ten. Now we have 1 ten and 2 ones.'), B('Now add the tens: 4 tens plus 3 tens, plus the 1 ten we made, is 8 tens.')]},
            {'type': 'wordmath', 'heading': 'Put it together', 'rows': [('8 tens', '+', '2 ones', '82', None)],
             'beats': [B('8 tens and 2 ones make 82. So 47 plus 35 equals 82.', '8 tens and 2 ones make eighty-two. So forty-seven plus thirty-five equals eighty-two.')]},
            {'type': 'bullets', 'heading': 'Subtracting: trade a ten for ones', 'items': [('🔢', '52 − 27', 'Can we take 7 ones from 2 ones? Not yet!'), ('🔁', 'Trade 1 ten for 10 ones', '4 tens and 12 ones'), ('✅', '12 − 7 = 5, 4 − 2 = 2', 'The answer is 25')],
             'beats': [B('Subtracting works the other way.'), B('52 minus 27. We cannot take 7 ones from 2 ones.', 'Fifty-two minus twenty-seven. We cannot take 7 ones from 2 ones.'), B('So we trade 1 ten for 10 ones. Now there are 4 tens and 12 ones.'), B('12 minus 7 is 5. 4 tens minus 2 tens is 2 tens. The answer is 25.', '12 minus 7 is 5. 4 tens minus 2 tens is 2 tens. The answer is twenty-five.')]},
            quiz('36 + 47 = ?', ['73', '83', '713'], '83', 'Try one. What is 36 plus 47?', '83! 6 plus 7 is 13, so we regroup 1 ten. 3 plus 4 plus 1 is 8 tens.', ask_say='Try one. What is thirty-six plus forty-seven?', reveal_say='Eighty-three! 6 plus 7 is 13, so we regroup 1 ten. 3 plus 4 plus 1 is 8 tens.'),
            outro('Practice regrouping in Math Quest!'),
        ],
    },
    {
        'id': 'place-value', 'title': 'Hundreds, Tens, and Ones', 'subject': 'place', 'label': 'Place Value',
        'desc': 'What each digit in a three-digit number means.', 'practice': ['place', 'pv', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧱', 'title': 'Hundreds, Tens, and Ones', 'sub': 'Place value to 1,000', 'beats': [B('Every digit in a number has a job.')]},
            {'type': 'bullets', 'heading': 'Three kinds of blocks', 'layout': 'tiles', 'items': [('🟫', '1', 'a one'), ('📏', '10', 'a ten'), ('🟧', '100', 'a hundred')],
             'beats': [B('We can build numbers with blocks.'), B('A small cube is one.'), B('A rod is ten ones stuck together. That makes a ten.'), B('A flat is ten tens. That is one hundred!')]},
            {'type': 'image', 'heading': '3 hundreds, 4 tens, 6 ones', 'figs': ['Fig.blocks(346)'], 'notes': ['3 hundreds = 300', '4 tens = 40', '6 ones = 6', '300 + 40 + 6 = 346'],
             'beats': [B('Look at these blocks.'), B('3 flats are 3 hundreds. That is 300.', '3 flats are 3 hundreds. That is three hundred.'), B('4 rods are 4 tens. That is 40.', '4 rods are 4 tens. That is forty.'), B('6 cubes are 6 ones.'), B('Put them together: 346.', 'Put them together: three hundred forty-six.')]},
            {'type': 'image', 'heading': 'Zero holds a place', 'figs': ['Fig.blocks(702)'], 'notes': ['7 hundreds', '0 tens', '2 ones → 702'],
             'beats': [B('What if there are no tens?'), B('Here there are 7 hundreds.'), B('There are no rods, so we write a zero in the tens place.'), B('And 2 ones. The number is 702, not 72.', 'And 2 ones. The number is seven hundred two, not seventy-two.')]},
            quiz('Which number is 5 hundreds, 0 tens, 8 ones?', ['58', '508', '580'], '508', 'Which number has 5 hundreds, 0 tens, and 8 ones?', '508! The zero holds the tens place.', reveal_say='Five hundred eight! The zero holds the tens place.'),
            outro('Build numbers in Math Quest!'),
        ],
    },
    {
        'id': 'clock', 'title': 'Telling Time', 'subject': 'measure', 'label': 'Measurement',
        'desc': 'The hour hand, the minute hand, and counting by 5s.', 'practice': ['measure', 'time', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⏰', 'title': 'Telling Time', 'sub': 'Hour hand and minute hand', 'beats': [B("Let's learn to read a clock.")]},
            {'type': 'image', 'heading': 'Two hands', 'figs': ['Fig.clock(3, 0)'], 'notes': ['Short hand: the hour', 'Long hand: the minutes', "3 o'clock"],
             'beats': [B('A clock has two hands.'), B('The short hand points to the hour.'), B('The long hand shows the minutes.'), B("When the long hand points straight up at the 12, it is something o'clock. This is 3 o'clock.")]},
            {'type': 'image', 'heading': 'Count by 5s', 'figs': ['Fig.clock(3, 0)', 'Fig.clock(3, 15)', 'Fig.clock(3, 30)', 'Fig.clock(3, 45)'], 'show': [0, 1, 2, 3],
             'beats': [B('Each number is 5 minutes for the long hand.'), B('On the 3, it is 15 minutes past. 3:15.', 'On the 3, it is fifteen minutes past. Three fifteen.'), B('On the 6, it is 30 minutes past. 3:30.', 'On the 6, it is thirty minutes past. Three thirty.'), B('On the 9, count by 5s: 5, 10, 15, 20, 25, 30, 35, 40, 45. It is 3:45.', 'On the 9, count by fives: 5, 10, 15, 20, 25, 30, 35, 40, 45. It is three forty-five.')]},
            {'type': 'bullets', 'heading': 'The hour hand moves too', 'items': [('🐢', 'The hour hand moves slowly', 'At 3:45 it is between 3 and 4'), ('⚠️', 'Still 3 o\'clock time', 'Read the number it just passed')],
             'beats': [B('As the minutes go by, the hour hand slowly moves too.'), B('At 3:45 it is almost at the 4.', 'At three forty-five it is almost at the 4.'), B('But it has not reached the 4 yet, so the hour is still 3.')]},
            quiz('Short hand past 7, long hand on the 6. What time is it?', ['6:07', '7:30', '7:06'], '7:30', 'The short hand is just past the 7. The long hand is on the 6. What time is it?', '7:30! The long hand on the 6 means 30 minutes.', reveal_say='Seven thirty! The long hand on the 6 means thirty minutes.'),
            outro('Practice reading clocks in Math Quest!'),
        ],
    },
    {
        'id': 'money', 'title': 'Counting Coins', 'subject': 'measure', 'label': 'Measurement',
        'desc': 'Quarters, dimes, nickels, and pennies, and how to count them.', 'practice': ['measure', 'money', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🪙', 'title': 'Counting Coins', 'sub': 'Quarters, dimes, nickels, pennies', 'beats': [B("Let's learn what our coins are worth.")]},
            {'type': 'image', 'heading': 'Four coins', 'figs': ["Fig.coins(['q', 'd', 'n', 'p'])"], 'notes': ['quarter = 25¢', 'dime = 10¢', 'nickel = 5¢', 'penny = 1¢'],
             'beats': [B('Here are four coins.'), B('A quarter is worth 25 cents.', 'A quarter is worth twenty-five cents.'), B('A dime is worth 10 cents. It is the smallest coin, but it is worth more than a nickel!', 'A dime is worth ten cents. It is the smallest coin, but it is worth more than a nickel!'), B('A nickel is worth 5 cents.'), B('A penny is worth 1 cent.')]},
            {'type': 'image', 'heading': 'Count on from the biggest', 'figs': ["Fig.coins(['q', 'd', 'd', 'n', 'p', 'p'])"], 'notes': ['25', '35, 45', '50', '51, 52¢'],
             'beats': [B('To count coins, start with the coin worth the most.'), B('The quarter: 25.', 'The quarter: twenty-five.'), B('Count on by 10 for each dime: 35, 45.', 'Count on by ten for each dime: thirty-five, forty-five.'), B('Add 5 for the nickel: 50.', 'Add five for the nickel: fifty.'), B('Then 1 for each penny: 51, 52 cents.', 'Then one for each penny: fifty-one, fifty-two cents.')]},
            quiz('2 dimes and 3 pennies = ?', ['5¢', '23¢', '32¢'], '23¢', 'How much is 2 dimes and 3 pennies?', '23 cents! 10, 20, then 21, 22, 23.', ask_say='How much is two dimes and three pennies?', reveal_say='Twenty-three cents! 10, 20, then 21, 22, 23.'),
            outro('Count and make money in Math Quest!'),
        ],
    },
    {
        'id': 'fractions', 'title': 'Halves, Thirds, and Fourths', 'subject': 'geo', 'label': 'Geometry',
        'desc': 'Equal parts of a whole, and what the numbers in a fraction mean.', 'practice': ['geo', 'fparts', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🍕', 'title': 'Equal Parts', 'sub': 'Halves, thirds, and fourths', 'beats': [B("Let's share things fairly, in equal parts.")]},
            {'type': 'image', 'heading': 'Equal parts', 'figs': ["Fig.fraction('circle', 2, 1)", "Fig.fraction('circle', 3, 1)", "Fig.fraction('circle', 4, 1)"], 'show': [0, 0, 1, 2],
             'beats': [B('Equal parts are all the same size.'), B('Two equal parts are halves. One part is one half.'), B('Three equal parts are thirds. One part is one third.'), B('Four equal parts are fourths. One part is one fourth.')]},
            {'type': 'image', 'heading': 'Three fourths', 'figs': ["Fig.fraction('bar', 4, 3)"], 'notes': ['4 equal parts', '3 are shaded', 'three fourths'],
             'beats': [B('Look at this bar.'), B('It is cut into 4 equal parts.'), B('3 of the parts are shaded.'), B('So three fourths of the bar is shaded.')]},
            {'type': 'bullets', 'heading': 'Grade 3: fraction numbers', 'items': [('⬇️', 'Bottom number', 'how many equal parts'), ('⬆️', 'Top number', 'how many we count'), ('🧩', '3/4', '3 of 4 equal parts')],
             'beats': [B('In Grade 3, we write fractions with numbers.'), B('The bottom number tells how many equal parts.'), B('The top number tells how many parts we count.'), B('3 over 4, three fourths, means 3 of 4 equal parts.')]},
            quiz('A pizza is cut into 4 equal slices. You eat 1. What part did you eat?', ['one half', 'one third', 'one fourth'], 'one fourth', 'A pizza has 4 equal slices. You eat 1. What part did you eat?', 'One fourth! 1 of 4 equal parts.'),
            outro('Practice fractions in Math Quest!'),
        ],
    },
    {
        'id': 'multiply', 'title': 'Equal Groups', 'subject': 'place', 'label': 'Place Value',
        'desc': 'Arrays, repeated addition, and the start of multiplying and dividing.', 'practice': ['place', 'groups', 1],
        'scenes': [
            {'type': 'title', 'emoji': '🔵', 'title': 'Equal Groups', 'sub': 'Arrays and multiplying', 'beats': [B("Let's count things that come in equal groups.")]},
            {'type': 'image', 'heading': 'An array', 'figs': ['Fig.array(3, 4)'], 'notes': ['3 rows', '4 in each row', '4 + 4 + 4 = 12'],
             'beats': [B('This is an array. Things are lined up in equal rows.'), B('There are 3 rows.'), B('Each row has 4 dots.'), B('Add the rows: 4 plus 4 plus 4 equals 12.')]},
            {'type': 'wordmath', 'heading': 'Grade 3: multiply', 'rows': [('3 × 4', '→', '4 + 4 + 4', '12', '3 groups of 4'), ('12 ÷ 3', '→', 'share in 3', '4', '4 in each group')],
             'beats': [B('In Grade 3, we write this as multiplication.'), B('3 times 4 means 3 groups of 4. That is 12.'), B('Division shares equally. 12 divided into 3 equal groups gives 4 in each group.')]},
            quiz('5 rows of 3. How many in all?', ['8', '15', '53'], '15', 'An array has 5 rows with 3 in each row. How many in all?', '15! 3 plus 3 plus 3 plus 3 plus 3 is 15.', reveal_say='Fifteen! 3 plus 3 plus 3 plus 3 plus 3 is fifteen.'),
            outro('Practice equal groups in Math Quest!'),
        ],
    },
    {
        'id': 'area-perimeter', 'title': 'Area and Perimeter', 'subject': 'geo', 'label': 'Geometry',
        'desc': 'Counting squares inside a shape, and the distance around it.', 'practice': ['geo', 'area', 2],
        'scenes': [
            {'type': 'title', 'emoji': '🟩', 'title': 'Area and Perimeter', 'sub': 'Inside and around', 'beats': [B("Let's measure the inside and the outside of a rectangle.")]},
            {'type': 'image', 'heading': 'Rows of squares', 'figs': ['Fig.rect(5, 3)'], 'notes': ['3 rows', '5 squares in each row', '5 + 5 + 5 = 15 squares'],
             'beats': [B('This rectangle is split into equal squares.'), B('There are 3 rows.'), B('Each row has 5 squares.'), B('5 plus 5 plus 5 is 15 squares.')]},
            {'type': 'image', 'heading': 'Area: the squares inside', 'figs': ["Fig.rect(5, 3, { grid: true, labels: true, unit: 'cm' })"], 'notes': ['Area = 5 × 3', '= 15 square cm'],
             'beats': [B('In Grade 3, the number of squares inside is called the area.'), B('For a rectangle, multiply the sides: 5 times 3.'), B('The area is 15 square centimeters.')]},
            {'type': 'image', 'heading': 'Perimeter: the distance around', 'figs': ["Fig.rect(5, 3, { grid: false, labels: true, unit: 'cm' })"], 'notes': ['5 + 3 + 5 + 3', '= 16 cm'],
             'beats': [B('Perimeter is the distance all the way around the outside.'), B('Add all 4 sides: 5 plus 3 plus 5 plus 3.'), B('The perimeter is 16 centimeters.')]},
            quiz('A rectangle is 4 cm by 2 cm. What is its area?', ['6 square cm', '8 square cm', '12 square cm'], '8 square cm', 'A rectangle is 4 centimeters by 2 centimeters. What is its area?', '8 square centimeters! 4 times 2 is 8. The perimeter would be 12.'),
            outro('Practice area in Math Quest!'),
        ],
    },
    {
        'id': 'word-problems', 'title': 'Solving Word Problems', 'subject': 'add', 'label': 'Add & Subtract',
        'desc': 'How to tell whether a story is asking you to add or subtract.', 'practice': ['add', 'story', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📖', 'title': 'Word Problems', 'sub': 'Add or subtract?', 'beats': [B('A word problem is a math story. Let\'s learn how to solve one.')]},
            {'type': 'bullets', 'heading': 'Three questions to ask', 'items': [('📈', 'Does the group get bigger?', 'Add'), ('📉', 'Does the group get smaller?', 'Subtract'), ('⚖️', 'Are we comparing two groups?', 'Subtract to find how many more')],
             'beats': [B('Read the story. Then ask yourself:'), B('Does the group get bigger? Then add.'), B('Does the group get smaller? Then subtract.'), B('Are we comparing two groups? Subtract to find how many more.')]},
            {'type': 'wordmath', 'heading': 'Maya has 24 shells. She finds 13 more.', 'rows': [('24', '+', '13', '37', 'shells')],
             'beats': [B('Maya has 24 shells. She finds 13 more.', 'Maya has twenty-four shells. She finds thirteen more.'), B('Her group gets bigger, so we add: 24 plus 13 is 37 shells.', 'Her group gets bigger, so we add. Twenty-four plus thirteen is thirty-seven shells.')]},
            {'type': 'wordmath', 'heading': 'Leo has 45 cards. Zara has 28.', 'rows': [('45', '−', '28', '17', 'more cards')],
             'beats': [B('Leo has 45 cards. Zara has 28. How many more does Leo have?', 'Leo has forty-five cards. Zara has twenty-eight. How many more does Leo have?'), B('We are comparing, so we subtract: 45 minus 28 is 17 more cards.', 'We are comparing, so we subtract. Forty-five minus twenty-eight is seventeen more cards.')]},
            quiz('Omar had 50 stickers. He gave away 20. How many are left?', ['30', '70', '20'], '30', 'Omar had 50 stickers. He gave away 20. How many are left?', '30! Giving away makes the group smaller, so subtract.', reveal_say='Thirty! Giving away makes the group smaller, so subtract.'),
            outro('Solve word problems in Math Quest!'),
        ],
    },
]

# Each video uses its subject's color (the subject colors in data/*.js).
for _v in VIDEOS:
    _v['color'] = {'add': 'c1', 'place': 'c2', 'measure': 'c3', 'data': 'c5', 'geo': 'c4'}[_v['subject']]
