"""MAP Math 4 video lessons (rendered by tools/make_videos.py mapmath4).
`text` is the caption; `say` (optional) is what the narrator speaks when it should differ from the caption
(fractions and decimals are written out in words so the narrator reads them the way a teacher would)."""


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
        'id': 'area-model', 'title': 'Multiplying with an Area Model', 'subject': 'number', 'label': 'Multiply',
        'desc': 'Split numbers into places, multiply each part, and add.', 'practice': ['number', 'mult', 1],
        'scenes': [
            {'type': 'title', 'emoji': '🟧', 'title': 'The Area Model', 'sub': 'Big multiplications, one piece at a time', 'beats': [B('Big multiplication problems get easy when you break them into pieces.')]},
            {'type': 'image', 'heading': '347 × 6', 'figs': ['Fig.areaModel(347, 6)'], 'notes': ['300 × 6 = 1,800', '40 × 6 = 240', '7 × 6 = 42', '1,800 + 240 + 42 = 2,082'],
             'beats': [B('Here is 347 times 6.', 'Here is three hundred forty-seven times six.'), B('Split 347 into 300, 40, and 7. Each piece gets its own box.', 'Split three hundred forty-seven into three hundred, forty, and seven. Each piece gets its own box.'),
                       B('300 times 6 is 1,800. 40 times 6 is 240. 7 times 6 is 42.', 'Three hundred times six is one thousand eight hundred. Forty times six is two hundred forty. Seven times six is forty-two.'),
                       B('Add the boxes: 2,082.', 'Add the boxes, and you get two thousand eighty-two.')]},
            {'type': 'image', 'heading': '23 × 45', 'figs': ['Fig.areaModel(23, 45)'], 'notes': ['20 × 40 = 800', '20 × 5 = 100', '3 × 40 = 120', '3 × 5 = 15', 'Total: 1,035'],
             'beats': [B('Two digits times two digits? Split both numbers.', ), B('20 and 3 across the top. 40 and 5 down the side. That makes four boxes.', 'Twenty and three across the top. Forty and five down the side. That makes four boxes.'),
                       B('800, 100, 120, and 15.', 'Eight hundred, one hundred, one hundred twenty, and fifteen.'), B('Add them all: 1,035.', 'Add them all up: one thousand thirty-five.')]},
            quiz('34 × 6 = ?', ['184', '204', '1,824'], '204', 'Your turn. What is 34 times 6?', '204! 30 times 6 is 180, and 4 times 6 is 24. 180 plus 24 is 204.', ask_say='Your turn. What is thirty-four times six?', reveal_say='Two hundred four! Thirty times six is one hundred eighty, and four times six is twenty-four. Add them: two hundred four.', fig='Fig.areaModel(34, 6, { hide: [0, 1] })'),
            outro('Practice multiplying in MAP Math 4!'),
        ],
    },
    {
        'id': 'divide', 'title': 'Dividing and Remainders', 'subject': 'number', 'label': 'Divide',
        'desc': 'Share one place at a time, and what to do with what is left over.', 'practice': ['number', 'div', 1],
        'scenes': [
            {'type': 'title', 'emoji': '➗', 'title': 'Dividing', 'sub': 'Equal shares and leftovers', 'beats': [B('Dividing means sharing into equal groups. Let us see how it works with big numbers.')]},
            {'type': 'image', 'heading': '804 ÷ 4', 'figs': ["Fig.shareBar('804', 4, { each: 201 })"], 'notes': ['8 hundreds ÷ 4 = 2 hundreds', '0 tens ÷ 4 = 0 tens', '4 ones ÷ 4 = 1', 'Answer: 201'],
             'beats': [B('Let us share 804 into 4 equal groups.', 'Let us share eight hundred four into four equal groups.'), B('8 hundreds shared by 4 is 2 hundreds each.'), B('There are 0 tens. So write a 0 in the tens place. Do not skip it!', 'There are zero tens. So write a zero in the tens place. Do not skip it!'),
                       B('4 ones shared by 4 is 1. The answer is 201.', 'Four ones shared by four is one. The answer is two hundred one.')]},
            {'type': 'image', 'heading': '59 ÷ 4', 'figs': ["Fig.shareBar('59', 4, { each: 14, r: 3 })"], 'notes': ['4 × 14 = 56', '59 − 56 = 3 left over', '59 ÷ 4 = 14 R 3'],
             'beats': [B('Sometimes things do not share evenly.'), B('59 shared by 4: each group gets 14, because 4 times 14 is 56.', 'Fifty-nine shared by four: each group gets fourteen, because four times fourteen is fifty-six.'),
                       B('3 are left over. That is the remainder.', 'Three are left over. That is the remainder.'), B('The remainder is always smaller than the number you divide by.')]},
            {'type': 'image', 'heading': 'What does the remainder mean?', 'figs': ["Fig.picture(['🚐'], '75 students, 8 per van')"], 'notes': ['75 ÷ 8 = 9 R 3', '3 students still need a seat', 'So 10 vans!'],
             'beats': [B('In a story, think about what the remainder means.'), B('75 students ride in vans that hold 8. 75 divided by 8 is 9, remainder 3.', 'Seventy-five students ride in vans that hold eight. Seventy-five divided by eight is nine, remainder three.'),
                       B('Those 3 students still need a seat, so we need 10 vans!', 'Those three students still need a seat, so we need ten vans!')]},
            quiz('47 ÷ 5 = ?', ['9 R 2', '8 R 7', '9 R 5'], '9 R 2', 'Try one. What is 47 divided by 5?', '9 remainder 2. 5 times 9 is 45, and 2 are left over.', ask_say='Try one. What is forty-seven divided by five?', reveal_say='Nine, remainder two. Five times nine is forty-five, and two are left over.', fig="Fig.shareBar('47', 5)"),
            outro('Practice dividing in MAP Math 4!'),
        ],
    },
    {
        'id': 'fractions4', 'title': 'Equivalent Fractions', 'subject': 'number', 'label': 'Fractions',
        'desc': 'Same amount, different names, and how to compare fractions.', 'practice': ['number', 'frac', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🍕', 'title': 'Equivalent Fractions', 'sub': 'Same amount, different names', 'beats': [B('Two fractions can look different and still be the same amount.')]},
            {'type': 'image', 'heading': '2/3 = 4/6 = 8/12', 'figs': ['Fig.fracStrips([[2, 3], [4, 6], [8, 12]])'], 'notes': ['× 2 top and bottom', 'More pieces, smaller pieces', 'Same amount shaded'],
             'beats': [B('Look at these three strips.'), B('Two thirds. Four sixths. Eight twelfths.', 'Two thirds. Four sixths. Eight twelfths.'), B('The shaded parts are exactly the same length!'),
                       B('Multiply the top and the bottom by the same number, and you get an equivalent fraction.')]},
            {'type': 'image', 'heading': 'Compare with one half', 'figs': ['Fig.fracStrips([[3, 8], [1, 2], [4, 6]])'], 'notes': ['3/8 is less than 1/2', '4/6 is more than 1/2', 'So 3/8 < 4/6'],
             'beats': [B('To compare fractions, one half is a great helper.'), B('3 eighths is less than one half.', 'Three eighths is less than one half.'), B('4 sixths is more than one half.', 'Four sixths is more than one half.'), B('So 3 eighths is less than 4 sixths.', 'So three eighths is less than four sixths.')]},
            quiz('Which is equal to 3/4?', ['6/8', '4/5', '3/8'], '6/8', 'Quick check! Which fraction is equal to 3 fourths?', 'Six eighths! Multiply the top and bottom of 3 fourths by 2.', ask_say='Quick check! Which fraction is equal to three fourths?', reveal_say='Six eighths! Multiply the top and the bottom of three fourths by two.', fig='Fig.fracStrips([[3, 4], [6, 8]])'),
            outro('Practice fractions in MAP Math 4!'),
        ],
    },
    {
        'id': 'decimals', 'title': 'Tenths and Hundredths', 'subject': 'number', 'label': 'Decimals',
        'desc': 'What decimals mean, and how to compare them.', 'practice': ['number', 'dec', 0],
        'scenes': [
            {'type': 'title', 'emoji': '💯', 'title': 'Decimals', 'sub': 'Tenths and hundredths', 'beats': [B('Decimals are another way to write fractions with 10 or 100 on the bottom.', 'Decimals are another way to write fractions with ten or one hundred on the bottom.')]},
            {'type': 'image', 'heading': '45 hundredths', 'figs': ['Fig.decimalGrid(45, 100)'], 'notes': ['100 small squares = 1 whole', '45 shaded', '45/100 = 0.45'],
             'beats': [B('This big square is one whole, cut into 100 tiny squares.', 'This big square is one whole, cut into one hundred tiny squares.'), B('45 are shaded. That is 45 hundredths.', 'Forty-five are shaded. That is forty-five hundredths.'),
                       B('We write it as 0.45. Hundredths use two places after the decimal point.', 'We write it as zero point four five. Hundredths use two places after the decimal point.')]},
            {'type': 'image', 'heading': '0.5 or 0.45?', 'figs': ['Fig.pair(Fig.decimalGrid(50, 100), Fig.decimalGrid(45, 100))'], 'notes': ['0.5 = 5 tenths = 50 hundredths', '0.45 = 45 hundredths', '0.5 > 0.45'],
             'beats': [B('Which is bigger, 0.5 or 0.45?', 'Which is bigger, zero point five, or zero point four five?'), B('Many people pick 0.45 because it has more digits. But look!', 'Many people pick zero point four five because it has more digits. But look!'),
                       B('0.5 is 5 tenths, which is 50 hundredths. That is more than 45 hundredths.', 'Zero point five is five tenths, which is fifty hundredths. That is more than forty-five hundredths.'), B('Compare the tenths first!')]},
            quiz('Which is greater?', ['0.7', '0.65', 'They are equal'], '0.7', 'Your turn. Which is greater: 0.7 or 0.65?', '0.7! It has 7 tenths, and 0.65 has only 6 tenths.', ask_say='Your turn. Which is greater: zero point seven, or zero point six five?', reveal_say='Zero point seven! It has seven tenths, and zero point six five has only six tenths.', fig='Fig.pair(Fig.decimalGrid(70, 100), Fig.decimalGrid(65, 100))'),
            outro('Practice decimals in MAP Math 4!'),
        ],
    },
    {
        'id': 'angles', 'title': 'Angles and Protractors', 'subject': 'geometry', 'label': 'Angles',
        'desc': 'Acute, right, and obtuse angles, and how to read a protractor.', 'practice': ['geometry', 'angle', 1],
        'scenes': [
            {'type': 'title', 'emoji': '📐', 'title': 'Angles', 'sub': 'Measure the turn', 'beats': [B('An angle is made when two rays meet at a point. Let us measure them!')]},
            {'type': 'image', 'heading': 'Three kinds of angles', 'figs': ['Fig.angle(45)', 'Fig.angle(90)', 'Fig.angle(130)'], 'show': [0, 0, 1, 2], 'notes': ['Acute: less than 90°', 'Right: exactly 90°', 'Obtuse: more than 90°'],
             'beats': [B('Angles come in kinds.'), B('An acute angle is smaller than a square corner.'), B('A right angle is exactly a square corner: 90 degrees.', 'A right angle is exactly a square corner: ninety degrees.'), B('An obtuse angle is wider than a square corner.')]},
            {'type': 'image', 'heading': 'Reading a protractor', 'figs': ['Fig.protractor(50)'], 'notes': ['Center on the corner', 'One ray on 0', 'Read its scale'],
             'beats': [B('A protractor measures angles in degrees.'), B('Put the center on the corner, and line up one ray with zero.'), B('Here is the tricky part: a protractor has two scales.'),
                       B('Read the scale that starts at zero on your ray. This angle is 50 degrees, not 130.', 'Read the scale that starts at zero on your ray. This angle is fifty degrees, not one hundred thirty.')]},
            quiz('What kind of angle is 120°?', ['acute', 'right', 'obtuse'], 'obtuse', 'Quick quiz! What kind of angle measures 120 degrees?', 'Obtuse! It is wider than 90 degrees.', ask_say='Quick quiz! What kind of angle measures one hundred twenty degrees?', reveal_say='Obtuse! It is wider than ninety degrees.', fig='Fig.angle(120)'),
            outro('Practice angles in MAP Math 4!'),
        ],
    },
    {
        'id': 'map-tips4', 'title': 'How Your Practice Test Works', 'subject': 'number', 'color': 'c1', 'label': 'Practice test',
        'desc': 'What the MAP-style practice test is like, and how to do your best.', 'practice': None,
        'scenes': [
            {'type': 'title', 'emoji': '🧭', 'title': 'Your Practice Test', 'sub': 'How it works, and how to do your best', 'beats': [B('Ready for your practice test? Here is how it works.')]},
            {'type': 'image', 'heading': 'It adapts to you', 'figs': ["Fig.picture(['⬆️', '⬇️'])"], 'notes': ['Right answer: a bit harder', 'Missed one: a bit easier', 'About half will feel hard'],
             'beats': [B('This test adapts as you go.'), B('Get one right, and the next question is a little harder. Miss one, and the next is a little easier.'), B('That means about half the questions will feel hard. That is how it is supposed to work!')]},
            {'type': 'image', 'heading': 'Answers lock', 'figs': ["Fig.picture(['👆', '🔒'])"], 'notes': ['Change your mind before Next', 'No going back', 'No time limit'],
             'beats': [B('You can change your answer until you tap Next. After that, it is locked.'), B('There is no time limit, so check your work before you move on.')]},
            {'type': 'image', 'heading': 'Use scratch paper', 'figs': ['Fig.areaModel(23, 45, { showTotals: false })'], 'notes': ['Draw a model', 'Estimate first', 'Check with the opposite operation'],
             'beats': [B('Keep scratch paper next to you.'), B('Draw a model, estimate first, and check your answer with the opposite operation.')]},
            {'type': 'quiz', 'q': 'An answer choice matches your first guess, but you are not sure. What should you do?', 'opts': ['Pick it right away', 'Check it, then tap Next', 'Skip the question'], 'a': 'Check it, then tap Next', 'fig': "Fig.picture(['🤔'])",
             'beats': [B('Quick quiz! An answer matches your first guess, but you are not sure. What should you do?', role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B('Check it, then tap Next! Wrong choices are often common mistakes, so a quick check helps.', role='reveal')]},
            {'type': 'outro', 'title': 'You are ready!', 'sub': 'Take your time and do your best.', 'beats': [B('You are ready. Take your time, and do your best. Good luck!')]},
        ],
    },
]
