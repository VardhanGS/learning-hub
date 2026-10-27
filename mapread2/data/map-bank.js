// MAP Reading 2: the practice subjects (the three MAP goal areas) and the adaptive test's question pool.
// New skills (poems, characters, text features, purpose, steps, word parts, word play) plus three skills reused from
// ELA Quest's Grade 2 reading (stories, facts, context clues) — 70% of levels are new. (ELA Quest's main-idea bank is
// too small for full rounds, so main-idea questions come from the new passages instead.)
const MAPBANK = (() => {
  const ela = SUBJECTS.splice(0).flatMap((s) => s.skills);
  const byId = Object.fromEntries(ela.map((k) => [k.id, k]));
  // ELA Quest's questions get a goal area, a difficulty, a picture, and the 2023 NJSLS codes.
  const REUSED = {
    stories: { goal: 'lit', std: ['RL.CR.2.1 · RL.IT.2.3', 'RL.CI.2.2 · RL.TS.2.4', 'RL.CI.3.2 · RL.IT.3.3'] },
    facts: { goal: 'info', std: ['RI.CR.2.1 · RI.CI.2.2', 'RI.IT.2.3 · RI.PP.2.5', 'RI.CI.3.2 · RI.IT.3.3'] },
    context: { goal: 'vocab', std: ['L.VL.2.2', 'L.VL.2.2', 'L.VL.3.2'] },
  };
  const BASE = [166, 176, 188];
  const TAG_OFFSET = { 'Key details': -5, Sequence: -3, 'Character feelings': -2, Character: 0, 'Word meaning': -1, 'Main idea': 2, Inference: 3, Lesson: 3, 'Cause & effect': 2, 'Character traits': 2, "Author's purpose": 3, Moral: 4 };
  const ICONS = { 'The Lost Mitten': ['🧤', '🐕'], "Ben's Big Seed": ['🌱', '🌻'], 'The Class Pet': ['🐹'], "Rosa's Kite": ['🪁'], 'The Quiet Drummer': ['🥁'], 'The Crow and the Fox': ['🐦‍⬛', '🦊', '🧀'], 'Frogs Grow Up': ['🐸'], 'Busy Bees': ['🐝'], 'How Do Plants Drink?': ['🌿', '💧'], Penguins: ['🐧'], 'Our Neighbor, the Moon': ['🌕'], 'Give It a Second Life': ['♻️'] };
  // Longer wrong choices for some ELA Quest questions, so the right answer is not always the longest one
  // (a child should not be able to guess by length). ELA Quest's own files are not changed.
  const LONGER = {
    'What did Ben do to help the seed grow?': { 'He threw it outside.': 'He threw it outside in the backyard.', 'He put it in the fridge.': 'He put it in the fridge to keep it cold.' },
    'What is a lesson from this story?': { 'Flowers are small.': 'Flowers are always small and short.', 'Never plant seeds.': 'Never plant seeds in a lunch box.' },
    'Why did Leo skip to the car on Friday?': { 'He was cold.': 'He was cold and wanted to sit in the car.', 'He lost his shoe.': 'He lost his shoe and was looking for it.' },
    'Why did Leo make a list?': { 'To go shopping': 'To go shopping for a new hamster cage', 'To plan a party': 'To plan a party for his whole class' },
    'What did Leo learn?': { 'Lists are not helpful.': 'Lists are not helpful when you are busy.' },
    'How did they solve the problem?': { 'They went home.': 'They went home and played inside.', 'Rosa ran slower.': 'Rosa ran slower across the field.' },
    'What is the lesson of the story?': { 'Fish can swim in the sky.': 'Fish can swim in the sky on windy days.' },
    'How did Jada help Amara?': { 'She gave her new spoons.': 'She gave her new spoons and a bucket.' },
    'Why did Amara practice every night?': { 'She was bored.': 'She was bored and had nothing else to do.', 'Her teacher made her.': 'Her teacher made her practice before bed each night.' },
    'What does the last sentence mean?': { 'She lost her voice.': 'She lost her voice after the show.', 'The show was silent.': 'The show was silent with no music at all.' },
    'Why did the crow drop the cheese?': { 'The wind blew it.': 'The wind blew it out of her beak.', 'The branch broke.': 'The branch broke under her feet.' },
    'What is the moral of this fable?': { 'Crows sing beautifully.': 'Crows sing more beautifully than any other bird.', 'Foxes are good friends.': 'Foxes are good friends to have in the forest.' },
    'What does "hungry and wiser" tell you about the crow at the end?': { 'She was happy.': 'She was happy because the fox was her friend.', 'She became a fox.': 'She became a fox by the end of the story.' },
    'What is a life cycle?': { 'A kind of bike': 'A kind of bike with three wheels', "A frog's home": "A frog's home at the bottom of a pond" },
    'How do bees help plants?': { 'They dig holes.': 'They dig holes for the plants to grow in.', 'They eat the leaves.': 'They eat the old leaves off the plants.' },
    'Why do bees do the waggle dance?': { 'To scare birds': 'To scare away birds that come near the hive', 'To stay warm': 'To stay warm on cold winter mornings' },
    'What is the celery experiment meant to show?': { 'Plants need music.': 'Plants need music to grow tall and green.', 'Celery tastes good.': 'Celery tastes better with colored water.' },
    'What would happen FIRST in the experiment?': { 'Wait one day.': 'Wait one whole day before you start.', 'Eat the celery.': 'Eat the celery and the leaves.' },
    'What is the main idea of this text?': { 'Fish are fast.': 'Fish are too fast for penguins to catch in the sea.', 'Antarctica is hot.': 'Antarctica is a hot place where penguins swim.' },
    'How do emperor penguins stay warm?': { 'They wear coats.': 'They wear coats made of soft snow.', 'They fly south.': 'They fly south to warmer beaches.' },
    'What does the mom do while the dad keeps the egg warm?': { 'Flies away': 'Flies away to a warmer place', 'Sleeps on the egg': 'Sleeps on top of the egg all winter' },
    'Why does the Moon look bright at night?': { 'It is on fire.': 'It is on fire like a big campfire.', 'It is covered in lamps.': 'It is covered in lamps that people put there.' },
    'What caused the craters?': { 'Wind and rain': 'Wind and rain wearing down the ground', 'Astronauts digging': 'Astronauts digging holes with shovels' },
    "Why are Neil Armstrong's footprints probably still there?": { 'Someone guards them.': 'Someone guards them so no one steps there.', 'He made them very deep.': 'He made them very deep with heavy boots.' },
    'What does "recycling" mean?': { 'Buying new things': 'Buying new things at the store every week' },
    'Which is one way recycling helps Earth?': { 'It uses more oil.': 'It uses more oil to make new things.', 'It cuts down trees.': 'It cuts down trees to make new paper.' },
    'What does the author want readers to do?': { 'Visit a landfill': 'Visit a landfill to see all the trash', 'Stop drinking water': 'Stop drinking water from plastic bottles' },
    'What does "heavy" mean?': { 'very soft': 'soft and easy to squish in your hand' },
  };
  const longer = (q) => { const L = LONGER[q.q.split('\n').pop()]; return L && q.opts ? { ...q, opts: q.opts.map((o) => (o !== q.a && L[o]) || o) } : q; };
  const figFor = (q) => Fig.picture(ICONS[q.passage && q.passage.title] || (q.passage ? ['📖'] : ['🔍']), '');
  function wrap(id, k) {
    const R = REUSED[id];
    return { ...k, fresh: false, goal: R.goal, levels: k.levels.map((L, l) => {
      // context clues: ELA Quest puts the word in quotes inside the sentence (“famished”, so …); MAP shows a plain
      // sentence and names the word in the question
      const tagIt = (q0) => { const q = id === 'context' ? { ...longer(q0), q: q0.q.replace(/“([^”]+)”/g, '$1') } : longer(q0); return { ...q, goal: R.goal, std: R.std[l], rit: BASE[l] + (TAG_OFFSET[q.tag] ?? 0), passage: q.passage ? { ...q.passage, fig: figFor(q) } : q.passage, fig: q.passage ? q.fig : (q.fig || figFor(q)) }; };
      // ELA Quest rounds have 4–5 questions; two rounds make one practice round of 8–10.
      const gen = () => {
        const seen = new Set(), out = [];
        for (let t = 0; t < 40 && out.length < 8; t++) L.gen({}).forEach((q) => { const key = q.q + q.a; if (!seen.has(key)) { seen.add(key); out.push(q); } });
        return out.map(tagIt);
      };
      const all = () => { const seen = new Set(), out = []; for (let r = 0; r < 30; r++) L.gen({}).forEach((q) => { const key = q.q + q.a + (q.passage ? q.passage.title : ''); if (!seen.has(key)) { seen.add(key); out.push(tagIt(q)); } }); return out; };
      return { ...L, std: R.std[l], gen, all };
    }) };
  }
  const levels = [];
  APP.features.map.goals.forEach((g) => {
    const fresh = READ_SKILLS.filter((k) => k.goal === g.id).map((k) => ({ ...k, fresh: true }));
    const reused = Object.keys(REUSED).filter((id) => REUSED[id].goal === g.id).map((id) => wrap(id, byId[id]));
    const skills = [...reused.filter((k) => k.id === 'stories' || k.id === 'facts'), ...fresh, ...reused.filter((k) => k.id !== 'stories' && k.id !== 'facts')];
    skills.forEach((k) => k.levels.forEach((L, l) => levels.push({ gen: L.gen, all: L.all, where: `${k.id}.${l}`, fresh: k.fresh })));
    addSubject({ id: g.id, name: g.name, icon: g.icon, color: g.color, blurb: g.sub, skills });
  });
  return { levels, freshShare: levels.filter((L) => L.fresh).length / levels.length, MIN_FRESH: 0.6 };
})();
