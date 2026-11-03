// Code Quest levels, Worlds 1–6. All characters and puzzles are original. Every level's solution is run by
// tools/codetest.js: it must reach the goal, an empty program must not, and every line here gets a recorded voice.
//   map: rows of . floor, # wall, R Bolt's start, * gem, o coin. maps: several maps one program must solve.
//   palette: the blocks in the tray. start: blocks already on the workspace (default: one start block).
//   goal: what the run must do, plus { uses: [...] } for the blocks the level is teaching.
//   sim: taps and key presses that the goal clip and the tests act out.
const CODE_LINES = {
  bump: 'Bump! Bolt walked into a wall. Look for the block that goes the wrong way.',
  short: 'Bolt stopped too soon. Bolt needs more blocks to reach the gem.',
  coin: 'Bolt missed a coin. Get every coin, then go to the gem.',
  wrongPick: 'There was no coin there. Only pick up a coin when Bolt is on one.',
  noStart: 'Snap your blocks under a start block, then press Go.',
  needs: 'That works! Now try it again with the new block.',
  tryAgain: 'Not quite yet. Watch the goal, then try again.',
  waiting: 'Good. Keep going!',
  variant: 'It worked this time! But the path can change. Use a check, so it works every time.',
  hintBlock: 'Try this block next.',
  hintNumber: 'Change the number in this block.',
  hintField: 'Open the menu on this block, and pick another choice.',
  hintExtra: 'This block is extra. Drag it away.',
  hintOther: 'This character looks ready. Now pick the other character.',
  hintDone: 'Your blocks look right. Press Go!',
  newBlock: 'Here is a new block!',
  win1: 'You did it!',
  win2: 'Great coding! Two stars!',
  win3: 'Amazing! Three stars!',
  overLimit: 'Can you do it with fewer blocks?',
  keepBuilding: 'Now make it yours! Keep building it in Free Build.',
};

const CODE_WORLDS = (() => {
  const who = (id, name, emoji, x = 0, y = 0, more = {}) => ({ id, name, emoji, x, y, dir: 90, size: 100, rot: 'none', facing: 1, ...more });
  const REP = ['repeat', 3];
  const grid = ['step', 'left', 'right'];
  const turtle = (x, y) => [who('turtle', 'Turtle', '🐢', x, y, { rot: 'all', facing: -1 })];
  const draw = ['pendown', 'move', 'turnL', 'turnR', 'repeat'];
  // A finger that stays on a moving character, for the goal clips and tests of games played with the pointer.
  const follow = (id, from, to) => { const out = []; for (let t = from; t < to; t += 3) out.push({ t, mouse: id }); return out; };
  const score = (n) => ['changevar', 'score', n];
  const basket = [['flag', ['forever', [['setx', ['mousex']]]]]];
  const fall = ['if', ['cmp', ['y'], 'lt', -170], [['goto', ['rand', -200, 200], 170]]];
  const apple = [['flag', ['forever', [['changey', -8], fall]]]];
  const ballMove = [['move', 8], 'bounce'];
  const paddle = [['flag', ['forever', [['setx', ['mousex']]]]]];
  const hit = ['if', ['touching', 'paddle'], [['point', ['rand', -45, 45]]]];
  const appleSprites = () => [who('basket', 'Basket', '🧺', 0, -140), who('apple', 'Apple', '🍎', 60, 170)];
  const pongSprites = () => [who('ball', 'Ball', '⚽'), who('paddle', 'Paddle', '🟦', 0, -130)];
  const mazeSprites = (fire) => [who('mouse', 'Mouse', '🐭', -180, -130), who('gem', 'Gem', '💎', 170, 120), ...(fire ? [who('fire', 'Fire', '🔥', 0, -130)] : [])];
  const keyMove = [['if', ['keydown', 'right'], [['changex', 5]]], ['if', ['keydown', 'up'], [['changey', 5]]]];
  const win = ['if', ['touching', 'gem'], [['saynow', 'I win!']]];

  return [
    {
      id: 'w1', icon: '👣', name: 'First Steps', idea: 'Put blocks in order. Find and fix bugs.',
      intro: 'Code is a list of steps. The computer does them in order.',
      levels: [
        { id: 'w1-1', icon: '👣', title: 'Two Steps', map: ['R.*'], palette: ['step'], goal: ['grid'], solution: [['flag', 'step', 'step']], learn: ['cq_gstep'],
          say: 'Help Bolt reach the gem! Drag a step block under the start block. Bolt needs two steps.', hint: 'Snap two step blocks under the start block.' },
        { id: 'w1-2', icon: '🚶', title: 'Long Walk', map: ['R....*'], palette: ['step'], goal: ['grid'], solution: [['flag', 'step', 'step', 'step', 'step', 'step']],
          say: 'The gem is far away now. Count the squares, and give Bolt enough steps.', hint: 'Count the squares from Bolt to the gem. That is how many steps you need.' },
        { id: 'w1-3', icon: '↱', title: 'Turn Right', map: ['R..', '##.', '##*'], palette: grid, goal: ['grid'], solution: [['flag', 'step', 'step', 'right', 'step', 'step']], learn: ['cq_gright'],
          say: 'The path goes around a corner. Walk to the corner, turn right, then walk to the gem. The red arrow shows which way Bolt is facing.', hint: 'Two steps, then turn right, then two more steps.' },
        { id: 'w1-4', icon: '↰', title: 'Turn Left', map: ['##*', '##.', 'R..'], palette: grid, goal: ['grid'], solution: [['flag', 'step', 'step', 'left', 'step', 'step']], learn: ['cq_gleft'],
          say: 'This time the path turns the other way. Which turn does Bolt need?', hint: 'Two steps, then turn left, then two more steps.' },
        { id: 'w1-5', icon: '⚡', title: 'Zig Zag', map: ['R.##', '#..#', '##.*'], palette: grid, goal: ['grid'], solution: [['flag', 'step', 'right', 'step', 'left', 'step', 'right', 'step', 'left', 'step']],
          say: 'Zig and zag! Follow the path one square at a time.', hint: 'Step, turn right, step, turn left. Then do that again, and take one last step.' },
        { id: 'w1-6', icon: '🪙', title: 'Coin Hunt', map: ['R.o.', '###.', '*...'], palette: grid, goal: ['grid'], solution: [['flag', 'step', 'step', 'step', 'right', 'step', 'step', 'right', 'step', 'step', 'step']],
          say: 'Walk over the coin on your way to the gem. Bolt must get every coin.', hint: 'Walk along the top, turn right to go down, then turn right again to walk to the gem.' },
        { id: 'w1-7', icon: '🐞', title: 'Fix the Bug', map: ['R..', '##.', '##*'], palette: grid, goal: ['grid'], start: [['flag', 'step', 'step', 'left', 'step', 'step']], solution: [['flag', 'step', 'step', 'right', 'step', 'step']],
          say: 'A bug is a mistake in code. This code has a bug! Press Go and watch. Then fix the block that is wrong.', hint: 'Bolt turns the wrong way. Change the turn left block to a turn right block.' },
        { id: 'w1-8', icon: '🔍', title: 'Bug Hunt', map: ['R.#', '#..', '##*'], palette: grid, goal: ['grid'], start: [['flag', 'step', 'right', 'step', 'step', 'right', 'step']], solution: [['flag', 'step', 'right', 'step', 'left', 'step', 'right', 'step']],
          say: 'This code is missing a block, so Bolt bumps into a wall. Find where it goes.', hint: 'After Bolt walks down one square, Bolt needs to turn left.' },
        { id: 'w1-9', icon: '🗺️', title: 'Long Trip', map: ['R.o.##', '###.##', '##..##', '##.o.*'], palette: grid, goal: ['grid'], solution: [['flag', 'step', 'step', 'step', 'right', 'step', 'step', 'right', 'step', 'left', 'step', 'left', 'step', 'step', 'step']],
          say: 'This is the longest trip yet! Get both coins, then the gem. Go one piece at a time, and press Go to test.', hint: 'First walk to the end of the top row. Press Go to test it before you add more.' },
      ],
    },
    {
      id: 'w2', icon: '🔁', name: 'Loop Land', idea: 'Use repeat so you write less. Draw shapes with loops.',
      intro: 'A loop does the same blocks again and again, so you do not have to snap them over and over.',
      levels: [
        { id: 'w2-1', icon: '🔁', title: 'Repeat It', map: ['R......*'], palette: ['step', REP], goal: ['grid', { uses: ['cq_repeat'] }], solution: [['flag', ['repeat', 7, ['step']]]], learn: ['cq_repeat'],
          say: 'That is a lot of steps! Put one step block inside the repeat block, then change the number.', hint: 'Bolt needs seven steps. Put a step inside repeat, and make the number seven.' },
        { id: 'w2-2', icon: '🪜', title: 'Up the Stairs', map: ['###*', '##..', '#..#', 'R.##'], palette: [...grid, REP], goal: ['grid', { uses: ['cq_repeat'] }], solution: [['flag', ['repeat', 3, ['step', 'left', 'step', 'right']]]],
          say: 'Each stair is the same. Build one stair inside repeat, and Bolt climbs them all.', hint: 'One stair is step, turn left, step, turn right. There are three stairs.' },
        { id: 'w2-3', icon: '🟩', title: 'Around the Rocks', map: ['R..o', '.##.', '.##.', 'o..o'], palette: [...grid, REP], goal: ['grid', { uses: ['cq_repeat'] }], solution: [['flag', ['repeat', 3, ['step', 'step', 'step', 'right']]]],
          say: 'Get all three coins. Look for the part that happens again and again.', hint: 'Three steps, then turn right. That part happens three times.' },
        { id: 'w2-4', icon: '⬜', title: 'Draw a Square', draw: true, sprites: turtle(-50, -50), palette: draw, goal: [{ pen: true }, { uses: ['cq_repeat'] }], solution: [['flag', 'pendown', ['repeat', 4, [['move', 100], ['turnL', 90]]]]], learn: ['cq_pendown', 'cq_move'],
          say: 'Now Turtle can draw! Put the pen down, then draw over the dotted square. A square has four sides that are all the same.', hint: 'Pen down first. Then repeat four times: move one hundred, turn ninety.' },
        { id: 'w2-5', icon: '🔺', title: 'Draw a Triangle', draw: true, sprites: turtle(-60, -50), palette: draw, goal: [{ pen: true }, { uses: ['cq_repeat'] }], solution: [['flag', 'pendown', ['repeat', 3, [['move', 120], ['turnL', 120]]]]],
          say: 'A triangle has three sides. Turtle has to turn farther at each corner.', hint: 'Repeat three times: move one hundred twenty, turn one hundred twenty.' },
        { id: 'w2-6', icon: '➖', title: 'Dashed Line', draw: true, sprites: turtle(-150, 0), palette: ['pendown', 'penup', 'move', 'repeat'], goal: [{ pen: true }, { uses: ['cq_repeat'] }], solution: [['flag', ['repeat', 5, ['pendown', ['move', 30], 'penup', ['move', 30]]]]], learn: ['cq_penup'],
          say: 'Make a dashed line. Draw a little, lift the pen, move a little, and do it again.', hint: 'Repeat five times: pen down, move thirty, pen up, move thirty.' },
        { id: 'w2-7', icon: '🐞', title: 'Loop Bug', draw: true, sprites: turtle(-30, -60), palette: draw, goal: [{ pen: true }, { uses: ['cq_repeat'] }], start: [['flag', 'pendown', ['repeat', 5, [['move', 60], ['turnL', 60]]]]], solution: [['flag', 'pendown', ['repeat', 6, [['move', 60], ['turnL', 60]]]]],
          say: 'This should draw a shape with six sides, but one side is missing. Press Go, then fix the bug.', hint: 'Count the sides. The repeat block needs a bigger number.' },
        { id: 'w2-8', icon: '🌀', title: 'Loop in a Loop', map: ['R...o', '.###.', '.###.', '.###.', 'o...o'], palette: ['right', 'step', REP], goal: ['grid', { uses: ['cq_repeat'] }], solution: [['flag', ['repeat', 3, [['repeat', 4, ['step']], 'right']]]],
          say: 'A loop can go inside a loop! Use one repeat for the steps, and another repeat around it.', hint: 'Inside: repeat four, step. Then turn right. Put all of that inside repeat three.' },
        { id: 'w2-9', icon: '🌸', title: 'Square Flower', draw: true, sprites: turtle(0, 0), palette: draw, goal: [{ pen: true }, { uses: ['cq_repeat'] }], solution: [['flag', 'pendown', ['repeat', 6, [['repeat', 4, [['move', 50], ['turnL', 90]]], ['turnL', 60]]]]],
          say: 'Draw a square, turn a little, and do it again. Six squares make a flower!', hint: 'The inside loop draws a square. After it, turn sixty. Repeat all of that six times.' },
      ],
    },
    {
      id: 'w3', icon: '🎉', name: 'Click City', idea: 'Start code with taps and keys. Make characters work together.',
      intro: 'Events start your code. A tap, a key, or a message can each make something happen.',
      levels: [
        { id: 'w3-1', icon: '💬', title: 'Say Hello', backdrop: 'meadow', sprites: [who('fox', 'Fox', '🦊')], palette: ['say'], goal: [{ said: 'fox' }], solution: [['flag', ['say', 'Hello!', 2]]], learn: ['cq_say'],
          say: 'Make Fox say hello! You can type any words you like in the block.', hint: 'Snap the say block under the start block.' },
        { id: 'w3-2', icon: '👆', title: 'Tap Me', backdrop: 'meadow', sprites: [who('fox', 'Fox', '🦊')], start: [], palette: ['tap', 'say'], input: true, prompt: 'Now tap Fox on the stage!', sim: [{ t: 12, tap: 'fox' }], goal: [{ said: 'fox', after: 'tap' }], solution: [['tap', ['say', 'You tapped me!', 2]]], learn: ['cq_tap'],
          say: 'This block starts code when you tap Fox. Make Fox talk when you tap.', hint: 'Snap a say block under the tap block. Then tap Fox on the stage.' },
        { id: 'w3-3', icon: '⌨️', title: 'Walk with Keys', backdrop: 'city', sprites: [who('fox', 'Fox', '🦊', -100, -80)], start: [], palette: ['key', 'changex'], input: true, prompt: 'Now press the right arrow three times.', sim: [{ t: 10, key: 'right' }, { t: 22, key: 'right' }, { t: 34, key: 'right' }], goal: [{ minX: { s: 'fox', x: -40 } }], solution: [[['key', 'right'], ['changex', 20]]], learn: ['cq_key'],
          say: 'Move Fox with a key! Pick the right arrow in the key block. Each press should move Fox to the right.', hint: 'Open the menu on the key block and pick right. Snap the move block under it.' },
        { id: 'w3-4', icon: '👯', title: 'Two Friends', backdrop: 'meadow', sprites: [who('kitty', 'Kitty', '🐱', -110, -40), who('puppy', 'Puppy', '🐶', 110, -40)], palette: ['say'], start: { kitty: [['flag']], puppy: [['flag']] }, goal: [{ said: 'kitty' }, { said: 'puppy' }], solution: { kitty: [['flag', ['say', 'Hi!', 2]]], puppy: [['flag', ['say', 'Woof!', 2]]] },
          say: 'Each character has its own code. Tap a character under the stage to see its blocks. Make both of them talk.', hint: 'Give Kitty a say block. Then tap Puppy under the stage, and give Puppy one too.' },
        { id: 'w3-5', icon: '🕺', title: 'Dance Party', backdrop: 'night', sprites: [who('frog', 'Frog', '🐸', 0, -30, { rot: 'all', size: 150 })], palette: ['turnR', 'turnL', ['wait', 0.2], REP], goal: [{ count: { type: 'turn', s: 'frog', min: 8 } }, { uses: ['cq_repeat', 'cq_wait'] }], solution: [['flag', ['repeat', 4, [['turnR', 30], ['wait', 0.2], ['turnL', 30], ['wait', 0.2]]]]],
          say: 'Make Frog dance! Turn one way, wait, turn back, and wait. Repeat it four times.', hint: 'Without a wait, the turns go too fast to see. Use turn, wait, turn, wait, inside repeat four.' },
        { id: 'w3-6', icon: '📨', title: 'Pass the Message', backdrop: 'ocean', sprites: [who('frog', 'Frog', '🐸', -110, -60), who('fox', 'Fox', '🦊', 110, -60)], start: [], palette: ['tap', 'send', 'recv', 'say'], input: true, prompt: 'Now tap Frog on the stage!', sim: [{ t: 12, tap: 'frog' }], goal: [{ said: 'fox', after: 'send' }], solution: { frog: [['tap', ['send', 'go']]], fox: [[['recv', 'go'], ['say', 'Got it!', 2]]] }, learn: ['cq_send', 'cq_recv'],
          say: 'Characters can send messages. When you tap Frog, Frog sends a message. When Fox gets it, Fox talks.', hint: 'Frog gets tap, then send message. Then tap Fox under the stage. Fox gets the message block, then say.' },
        { id: 'w3-7', icon: '🗣️', title: 'Take Turns', backdrop: 'city', sprites: [who('kitty', 'Kitty', '🐱', -110, -60), who('puppy', 'Puppy', '🐶', 110, -60)], palette: ['say', 'wait'], start: { kitty: [['flag']], puppy: [['flag']] }, goal: [{ order: ['kitty', 'puppy'] }, { uses: ['cq_wait'] }], solution: { kitty: [['flag', ['say', 'Hello!', 2]]], puppy: [['flag', ['wait', 2], ['say', 'Hi there!', 2]]] },
          say: 'Kitty talks first. Puppy should wait until Kitty is done, then talk.', hint: 'Kitty says something for two seconds. Puppy waits two seconds, then talks.' },
        { id: 'w3-8', icon: '🌙', title: 'Night Time', backdrop: 'meadow', sprites: [who('moon', 'Moon', '🌙', 150, 110)], start: [], palette: ['tap', 'backdrop'], input: true, prompt: 'Now tap the moon!', sim: [{ t: 12, tap: 'moon' }], goal: [{ backdrop: 'night' }], solution: [['tap', ['backdrop', 'night']]], learn: ['cq_backdrop'],
          say: 'Tap the moon to make it night. Pick Night in the backdrop block.', hint: 'Snap the backdrop block under the tap block, and open its menu to pick Night.' },
        { id: 'w3-9', icon: '🎵', title: 'Little Song', backdrop: 'meadow', sprites: [who('bunny', 'Bunny', '🐇', 0, -40, { facing: -1 })], palette: ['note'], goal: [{ notes: [60, 62, 64] }], solution: [['flag', ['note', '60', 1], ['note', '62', 1], ['note', '64', 1]]], learn: ['cq_note'],
          say: 'Play a song for Bunny. Play do, then re, then mi.', hint: 'Use three note blocks, and open each menu. Pick do, then re, then mi.' },
      ],
    },
    {
      id: 'w4', icon: '❓', name: 'Choice Cave', idea: 'Use if and else so your code can decide.',
      intro: 'An if block checks something. The blocks inside only run when the answer is yes.',
      levels: [
        { id: 'w4-1', icon: '🪙', title: 'Coin Check', pickBlock: true, maps: [['Ro..o*'], ['R.oo.*'], ['Roo..*']], palette: ['step', 'pick', ['repeat', 5], 'if', 'coin'], goal: ['grid', { uses: ['cq_if'] }], solution: [['flag', ['repeat', 5, ['step', ['if', 'coin', ['pick']]]]]], learn: ['cq_if', 'cq_gcoin'],
          say: 'The coins move every time! Bolt must check each square. If there is a coin, pick it up.', hint: 'Inside repeat five: step, then if on a coin, pick up the coin.' },
        { id: 'w4-2', icon: '🚧', title: 'Wall Ahead', maps: [['##*', '##.', 'R..'], ['#####', 'R...*']], palette: ['step', 'left', 'forever', 'ifelse', 'path'], goal: ['grid', { uses: ['cq_ifelse'] }], solution: [['flag', ['forever', [['ifelse', ['path', 'ahead'], ['step'], ['left']]]]]], learn: ['cq_ifelse', 'cq_gpath', 'cq_forever'],
          say: 'The path can change! If the path ahead is open, step. If not, turn left. Forever keeps checking until Bolt gets the gem.', hint: 'Inside forever, use if else. If path ahead, step. Otherwise, turn left.' },
        { id: 'w4-3', icon: '🐌', title: 'Spiral', map: ['R....', '####.', '.*##.', '.###.', '.....'], palette: ['step', 'right', 'forever', 'ifelse', 'path'], goal: ['grid', { uses: ['cq_ifelse'] }], solution: [['flag', ['forever', [['ifelse', ['path', 'ahead'], ['step'], ['right']]]]]],
          say: 'You could use a lot of blocks here, or just a few! Teach Bolt one rule that walks the whole spiral.', hint: 'If path ahead, step. Otherwise, turn right. Put that inside forever.' },
        { id: 'w4-4', icon: '🐭', title: 'Maze Runner', map: ['R..##', '##.##', '##...', '###.#', '*...#'], slack: 1, palette: ['step', 'left', 'right', 'forever', 'ifelse', 'path'], goal: ['grid', { uses: ['cq_ifelse'] }], solution: [['flag', ['forever', [['ifelse', ['path', 'left'], ['left', 'step'], [['ifelse', ['path', 'ahead'], ['step'], ['right']]]]]]]],
          say: 'Here is a trick for mazes: keep one hand on the left wall. If you can go left, go left. If not, go ahead. If you cannot, turn right.', hint: 'If path left: turn left and step. Otherwise, put a second if else inside: if path ahead, step. Otherwise, turn right.' },
        { id: 'w4-5', icon: '🚗', title: 'Turn Around', backdrop: 'city', sprites: [who('car', 'Car', '🚗', 0, -120, { rot: 'flip', facing: -1 })], palette: [['move', 10], ['turnR', 180], 'forever', 'if', ['touching', '_edge']], goal: [{ count: { type: 'turn', s: 'car', min: 2 } }, { uses: ['cq_if'] }], solution: [['flag', ['forever', [['move', 10], ['if', ['touching', '_edge'], [['turnR', 180]]]]]]],
          say: 'Drive the car back and forth. If the car touches the edge, turn it around.', hint: 'Inside forever: move ten, then if touching edge, turn one hundred eighty.' },
        { id: 'w4-6', icon: '🏃', title: 'Hold to Run', backdrop: 'meadow', sprites: [who('fox', 'Fox', '🦊', -120, -80)], input: true, prompt: 'Press Go, then hold down the right arrow.', sim: [{ t: 8, key: 'right', for: 34 }], palette: ['forever', 'if', ['keydown', 'right'], ['changex', 5]], goal: [{ minX: { s: 'fox', x: 0 } }, { uses: ['cq_if'] }], solution: [['flag', ['forever', [['if', ['keydown', 'right'], [['changex', 5]]]]]]], learn: ['cq_keydown'],
          say: 'This time Fox keeps running while you hold the key. Keep checking: is the key down?', hint: 'Inside forever: if the right key is pressed, move five. Pick right in the key menu.' },
        { id: 'w4-7', icon: '🦋', title: 'Keep Away', backdrop: 'meadow', sprites: [who('fly', 'Butterfly', '🦋', 0, 0)], input: true, prompt: 'Press Go, then try to tap the butterfly.', sim: [{ t: 10, mouse: 'fly' }, { t: 25, mouse: 'fly' }], palette: ['forever', 'if', ['touching', '_mouse'], 'goto', 'rand'], goal: [{ count: { type: 'goto', s: 'fly', min: 2 } }, { uses: ['cq_if', 'cq_rand'] }], solution: [['flag', ['forever', [['if', ['touching', '_mouse'], [['goto', ['rand', -200, 200], ['rand', -140, 140]]]]]]]], learn: ['cq_rand'],
          say: 'Make a butterfly you can never catch! If your finger touches it, it jumps to a random place.', hint: 'Inside forever: if touching pointer, go to. Put a random block in each number of the go to block.' },
        { id: 'w4-8', icon: '🍎', title: 'Yum!', backdrop: 'desert', sprites: [who('fox', 'Fox', '🦊', -130, -60), who('apple', 'Apple', '🍎', 90, -60)], start: { fox: [['flag']] }, input: true, prompt: 'Press Go, then hold down the right arrow.', sim: [{ t: 8, key: 'right', for: 45 }], palette: ['forever', 'if', ['keydown', 'right'], ['changex', 5], ['touching', 'apple'], ['saynow', 'Yum!']], goal: [{ said: 'fox' }, { uses: ['cq_if', 'cq_keydown', 'cq_touching'] }], solution: { fox: [['flag', ['forever', [['if', ['keydown', 'right'], [['changex', 5]]], ['if', ['touching', 'apple'], [['saynow', 'Yum!']]]]]]] },
          say: 'Your first little game! Fox runs when you hold the key. If Fox touches the apple, Fox says Yum.', hint: 'Forever holds two if blocks. One checks the key and moves Fox. The other checks touching the apple and says Yum.' },
      ],
    },
    {
      id: 'w5', icon: '🔢', name: 'Number Fort', idea: 'Keep score with number boxes. Use random numbers and a timer.',
      intro: 'A number box keeps a number while your code runs. Games use them for the score and the time.',
      levels: [
        { id: 'w5-1', icon: '📦', title: 'Number Box', vars: ['score'], backdrop: 'grid', sprites: [who('fox', 'Fox', '🦊')], palette: [['setvar', 'score', 0], ['showvar', 'score']], goal: [{ var: { name: 'score', eq: 5 } }, { uses: ['cq_showvar'] }], solution: [['flag', ['setvar', 'score', 5], ['showvar', 'score']]], learn: ['cq_setvar', 'cq_showvar'],
          say: 'This box is named score. Set it to five, then show it on the stage.', hint: 'Set score to five, then snap the show block under it.' },
        { id: 'w5-2', icon: '👆', title: 'Count the Taps', vars: ['score'], backdrop: 'meadow', sprites: [who('frog', 'Frog', '🐸')], start: [['flag', ['showvar', 'score']]], palette: ['tap', score(1)], input: true, prompt: 'Now tap Frog three times.', sim: [{ t: 10, tap: 'frog' }, { t: 22, tap: 'frog' }, { t: 34, tap: 'frog' }], goal: [{ var: { name: 'score', min: 3 } }], solution: [['flag', ['showvar', 'score']], ['tap', score(1)]], learn: ['cq_changevar'],
          say: 'Add one to the score every time you tap Frog.', hint: 'Put the change block under the tap block. Then press Go and tap Frog.' },
        { id: 'w5-3', icon: '🔁', title: 'Loop the Score', vars: ['score'], backdrop: 'city', sprites: [who('fox', 'Fox', '🦊')], palette: [score(1), REP, ['showvar', 'score']], goal: [{ var: { name: 'score', eq: 10 } }, { uses: ['cq_repeat', 'cq_changevar'] }], solution: [['flag', ['showvar', 'score'], ['repeat', 5, [score(2)]]]],
          say: 'Make the score ten, using a repeat five times. How much should each pass add?', hint: 'Five times two is ten. Repeat five times, and change score by two.' },
        { id: 'w5-4', icon: '🎲', title: 'Roll the Dice', vars: ['roll'], backdrop: 'blank', sprites: [who('dice', 'Dice', '🎲', 0, -30, { size: 150 })], start: [], palette: ['tap', ['setvar', 'roll', 0], ['rand', 1, 6], ['say', 'Hello!', 1], ['var', 'roll']], input: true, prompt: 'Now tap the dice!', sim: [{ t: 12, tap: 'dice' }], goal: [{ said: 'dice', after: 'tap', num: [1, 6] }, { uses: ['cq_rand', 'cq_var'] }], solution: [['tap', ['setvar', 'roll', ['rand', 1, 6]], ['say', ['var', 'roll'], 1]]],
          say: 'Build a dice! When you tap it, put a random number from one to six in the box. Then say the box.', hint: 'Drop the random block into set roll. Drop the round roll block into say.' },
        { id: 'w5-5', icon: '⏱️', title: 'Stopwatch', backdrop: 'night', sprites: [who('fox', 'Fox', '🦊')], palette: ['timerreset', ['waituntil', ['cmp', ['timer'], 'gt', 0]], ['say', 'Time is up!', 2]], goal: [{ said: 'fox', minT: 85 }, { uses: ['cq_timer', 'cq_waituntil'] }], solution: [['flag', 'timerreset', ['waituntil', ['cmp', ['timer'], 'gt', 3]], ['say', 'Time is up!', 2]]], learn: ['cq_timer_reset', 'cq_waituntil'],
          say: 'Start the timer. Wait until it is more than three seconds. Then say that time is up.', hint: 'Reset the timer, wait until the timer is more than three, then say.' },
        { id: 'w5-6', icon: '🤔', title: 'Guess the Number', vars: ['guess', 'secret'], backdrop: 'desert', sprites: [who('fox', 'Fox', '🦊', 0, -40)], start: [['flag', ['setvar', 'secret', ['rand', 1, 5]], ['showvar', 'guess']]], palette: ['tap', ['changevar', 'guess', 1], 'if', ['cmp', ['var', 'guess'], 'eq', ['var', 'secret']], ['say', 'You got it!', 2]], input: true, prompt: 'Press Go, then tap Fox until Fox says you got it.', sim: [10, 22, 34, 46, 58].map((t) => ({ t, tap: 'fox' })), goal: [{ said: 'fox', after: 'tap' }, { uses: ['cq_if', 'cq_cmp'] }], solution: [['flag', ['setvar', 'secret', ['rand', 1, 5]], ['showvar', 'guess']], ['tap', ['changevar', 'guess', 1], ['if', ['cmp', ['var', 'guess'], 'eq', ['var', 'secret']], [['say', 'You got it!', 2]]]]],
          say: 'Fox is hiding a secret number. Each tap adds one to your guess. If your guess equals the secret, Fox says you got it.', hint: 'Under the tap block: change guess by one. Then if guess equals secret, say you got it.' },
        { id: 'w5-7', icon: '⭐', title: 'Star Catcher', vars: ['score'], backdrop: 'space', sprites: [who('star', 'Star', '⭐')], start: [['flag', ['showvar', 'score']]], palette: ['tap', score(1), ['goto', ['rand', -200, 200], ['rand', -140, 140]], 'if', ['cmp', ['var', 'score'], 'eq', 5], ['say', 'You win!', 2]], input: true, prompt: 'Press Go, then catch the star five times.', sim: [10, 24, 38, 52, 66].map((t) => ({ t, tap: 'star' })), goal: [{ var: { name: 'score', min: 5 } }, { said: 'star' }, { uses: ['cq_if', 'cq_goto'] }], solution: [['flag', ['showvar', 'score']], ['tap', score(1), ['goto', ['rand', -200, 200], ['rand', -140, 140]], ['if', ['cmp', ['var', 'score'], 'eq', 5], [['say', 'You win!', 2]]]]],
          say: 'Tap the star to score a point. Then it jumps somewhere new. At five points, you win!', hint: 'Under tap: change score, go to a random place, then if score equals five, say you win.' },
      ],
    },
    {
      id: 'w6', icon: '🎮', name: 'Game Studio', idea: 'Build real games, one piece at a time.',
      intro: 'Big programs are built from small pieces. Build one piece, test it, then add the next.',
      levels: [
        { id: 'w6-1', icon: '🧺', title: 'Apples: the Basket', keep: true, backdrop: 'meadow', sprites: appleSprites(), start: { basket: [['flag']] }, input: true, prompt: 'Press Go, then move your finger on the stage.', sim: [{ t: 10, xy: [120, 0] }], palette: ['forever', 'setx', 'mousex'], goal: [{ minX: { s: 'basket', x: 100 } }, { uses: ['cq_setx', 'cq_mousex'] }], solution: { basket },
          say: 'Let us build Catch the Apples! First, make the basket follow your finger, forever.', hint: 'Inside forever: set x to pointer x. Drop the round pointer block into set x.', learn: ['cq_setx', 'cq_mousex'] },
        { id: 'w6-2', icon: '🍎', title: 'Apples: Falling', keep: true, backdrop: 'meadow', sprites: appleSprites(), start: { basket }, palette: ['flag', 'forever', 'changey', 'if', ['cmp', ['y'], 'lt', -170], ['goto', ['rand', -200, 200], 170]], goal: [{ count: { type: 'goto', s: 'apple', min: 2 } }, { uses: ['cq_changey', 'cq_cmp'] }], solution: { basket, apple },
          say: 'Now tap Apple under the stage. Make it fall forever. When it gets to the bottom, send it back to the top.', hint: 'Tap Apple first. Forever: change y by minus eight. Then if y is less than minus one seventy, go to the top.' },
        { id: 'w6-3', icon: '🏆', title: 'Apples: Keep Score', keep: true, vars: ['score'], backdrop: 'meadow', sprites: appleSprites(), start: { basket, apple }, input: true, prompt: 'Press Go, then catch three apples.', sim: follow('apple', 6, 800), palette: ['if', ['touching', 'basket'], score(1), ['goto', ['rand', -200, 200], 170]], goal: [{ var: { name: 'score', min: 3 } }, { uses: ['cq_touching', 'cq_changevar'] }], solution: { basket, apple: [['flag', ['forever', [['changey', -8], fall, ['if', ['touching', 'basket'], [score(1), ['goto', ['rand', -200, 200], 170]]]]]]] },
          say: 'Add the last piece. If Apple touches the basket, add one to the score, and send Apple back to the top.', hint: 'Tap Apple. At the end of forever: if touching basket, change score by one, and go to the top.' },
        { id: 'w6-4', icon: '⚽', title: 'Pong: the Ball', keep: true, backdrop: 'grid', sprites: pongSprites(), start: { ball: [['flag']] }, palette: ['point', 'forever', ['move', 8], 'bounce'], goal: [{ count: { type: 'bounce', s: 'ball', min: 3 } }], solution: { ball: [['flag', ['point', 45], ['forever', ballMove]]] }, learn: ['cq_point', 'cq_bounce'],
          say: 'Now build Pong! Point the ball on a slant. Then, forever, move it and bounce it off the edges.', hint: 'Point in direction forty five. Inside forever: move eight, then the bounce block.' },
        { id: 'w6-5', icon: '🏓', title: 'Pong: the Paddle', keep: true, backdrop: 'grid', sprites: pongSprites(), start: { ball: [['flag', ['point', 45], ['forever', ballMove]]], paddle: [['flag']] }, input: true, prompt: 'Press Go, then hit the ball with the paddle.', sim: follow('ball', 6, 700), palette: ['forever', 'setx', 'mousex', 'if', ['touching', 'paddle'], ['point', ['rand', -45, 45]]], goal: [{ count: { type: 'point', s: 'ball', min: 2 } }, { uses: ['cq_touching'] }], solution: { ball: [['flag', ['point', 45], ['forever', [...ballMove, hit]]]], paddle },
          say: 'The paddle needs to follow your finger. Then tell the ball: if you touch the paddle, go back up in a random direction.', hint: 'Paddle: forever set x to pointer x. Ball: add if touching paddle, point in a random direction.' },
        { id: 'w6-6', icon: '💀', title: 'Pong: Game Over', keep: true, backdrop: 'grid', sprites: pongSprites(), start: { ball: [['flag', ['point', 45], ['forever', [...ballMove, hit]]]], paddle }, input: true, prompt: 'Press Go, then let the ball go past the paddle.', sim: [{ t: 5, xy: [-225, 0] }], palette: ['if', ['cmp', ['y'], 'lt', -150], ['say', 'Game over!', 1], ['stop', 'all']], goal: [{ said: 'ball' }, { uses: ['cq_stop'] }], solution: { ball: [['flag', ['point', 45], ['forever', [...ballMove, hit, ['if', ['cmp', ['y'], 'lt', -150], [['say', 'Game over!', 1], ['stop', 'all']]]]]]], paddle }, learn: ['cq_stop'],
          say: 'A game needs a way to lose. Tell the ball: if you get below the paddle, say game over, and stop everything.', hint: 'Tap Ball. At the end of forever: if y is less than minus one fifty, say game over, then stop all.' },
        { id: 'w6-7', icon: '🐭', title: 'Maze Run: Moving', keep: true, backdrop: 'night', sprites: mazeSprites(false), start: { mouse: [['flag']] }, input: true, prompt: 'Press Go. Hold the right arrow, then the up arrow.', sim: [{ t: 8, key: 'right', for: 72 }, { t: 85, key: 'up', for: 52 }], palette: ['forever', 'if', ['keydown', 'right'], ['changex', 5], ['keydown', 'up'], ['changey', 5], ['touching', 'gem'], ['saynow', 'I win!']], goal: [{ said: 'mouse' }, { uses: ['cq_keydown', 'cq_touching'] }], solution: { mouse: [['flag', ['forever', [...keyMove, win]]]] },
          say: 'Build a maze game! Move Mouse with the arrow keys. If Mouse touches the gem, Mouse says I win.', hint: 'Forever holds three if blocks: right key, up key, and touching the gem.' },
        { id: 'w6-8', icon: '🔥', title: 'Maze Run: Danger', keep: true, backdrop: 'night', sprites: mazeSprites(true), start: { mouse: [['flag', ['forever', [...keyMove, win]]]] }, input: true, prompt: 'Press Go. Run into the fire, then go around it to the gem.', sim: [{ t: 8, key: 'right', for: 40 }, { t: 52, key: 'up', for: 52 }, { t: 108, key: 'right', for: 72 }], palette: ['if', ['touching', 'fire'], ['goto', -180, -130]], goal: [{ count: { type: 'goto', s: 'mouse', min: 1 } }, { said: 'mouse' }], solution: { mouse: [['flag', ['forever', [...keyMove, win, ['if', ['touching', 'fire'], [['goto', -180, -130]]]]]]] },
          say: 'Add some danger! If Mouse touches the fire, send Mouse back to the start.', hint: 'At the end of forever: if touching fire, go to x minus one eighty, y minus one thirty.' },
        { id: 'w6-9', icon: '📖', title: 'My Story', keep: true, backdrop: 'meadow', sprites: [who('kitty', 'Kitty', '🐱', -170, -60), who('puppy', 'Puppy', '🐶', 120, -60)], start: { kitty: [['flag']] }, palette: [['say', 'Hello!', 2], ['glide', 1, -20, -60], ['send', 'go'], ['recv', 'go'], ['backdrop', 'night']], goal: [{ order: ['kitty', 'puppy'] }, { backdrop: 'night' }, { uses: ['cq_glide', 'cq_send', 'cq_recv'] }], solution: { kitty: [['flag', ['say', 'Hello!', 2], ['glide', 1, -20, -60], ['send', 'go']]], puppy: [[['recv', 'go'], ['say', 'Let us play!', 2], ['backdrop', 'night']]] }, learn: ['cq_glide'],
          say: 'Tell a story! Kitty says hello, walks over, and sends a message. When Puppy gets it, Puppy talks, and night comes.', hint: 'Kitty: say, glide, send message. Puppy: get message, say, then the night backdrop.' },
      ],
    },
  ];
})();
if (typeof module !== 'undefined') module.exports = { CODE_WORLDS, CODE_LINES };
