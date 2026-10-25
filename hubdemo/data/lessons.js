// "Watch first" mini-lessons. Key: `${skillId}.${level}`. rule = what to know; ex = a worked example.
const LESSONS = {
  'addsub.0': { rule: 'To add, put tens with tens and ones with ones. Add the ones first, then add the tens.', ex: '34 + 25: 4 + 5 = 9 ones, 3 + 2 = 5 tens → 59' },
  'addsub.1': { rule: 'When the ones add up to 10 or more, regroup: trade 10 ones for 1 ten. Then add the tens, and remember the extra ten.', ex: '47 + 35: 7 + 5 = 12 ones = 1 ten and 2 ones. 4 + 3 + 1 = 8 tens → 82' },
  'addsub.2': { rule: 'To subtract, start with the ones. If the top digit is smaller, regroup: trade 1 ten for 10 ones, or 1 hundred for 10 tens.', ex: '352 − 128: 12 − 8 = 4, 4 − 2 = 2, 3 − 1 = 2 → 224' },
  'nline.0': { rule: 'A number line shows numbers in order. Start at 0 and count the jumps to find a number.', ex: 'To find 7, count 7 jumps from 0.' },
  'nline.1': { rule: 'Read the labels to see what each jump is worth. To add on a number line, start at the first number and jump forward.', ex: '0, 10, 20, 30: each jump is 10 · 8 + 5: start at 8, jump 5 → 13' },
  'nline.2': { rule: 'Cut the space from 0 to 1 into equal parts. The bottom number of a fraction tells how many parts. The top number tells how many jumps from 0.', ex: '3/4: cut 0 to 1 into 4 parts, then jump 3 parts.' },
  'fparts.0': { rule: 'Equal parts are the same size. 2 equal parts are halves, 3 are thirds, and 4 are fourths.', ex: 'A pizza cut into 4 equal slices: each slice is one fourth.' },
  'fparts.1': { rule: 'Count the equal parts, then count the shaded parts. A whole is all the parts together.', ex: '3 of 4 parts shaded = three fourths · four fourths = one whole' },
  'fparts.2': { rule: 'In a fraction, the bottom number is how many equal parts, and the top number is how many we count. Fractions can name the same amount.', ex: '3/8 = 3 of 8 equal parts · 1/2 = 2/4 = 4/8' },
};
