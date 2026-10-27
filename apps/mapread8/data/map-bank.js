// MAP Reading 8: the practice subjects (the three MAP goal areas) and the adaptive test's question pool.
// Seven new skills plus three reused from ELA Quest's Grade 8 reading (literary analysis, articles, evaluating
// arguments): 70% of levels are new.
const MAPBANK = (() => {
  const ela = SUBJECTS.splice(0).flatMap((s) => s.skills);
  const byId = Object.fromEntries(ela.map((k) => [k.id, k]));
  const REUSED = { g8stories: 'lit', g8articles: 'info', g8argeval: 'info' };
  const BASE = [200, 214, 226];
  const TAG_OFFSET = { 'Key details': -5, Inference: 3, Theme: 4, 'Main idea': 2, Evidence: 4, 'Point of view': 4, Structure: 4, Irony: 4 };
  const ICONS = { 'The Map Room': ['🗺️'], Static: ['🎤'], 'Second Chair': ['🎻'], 'Low Tide': ['⛵'], "The Lighthouse Keeper's Log": ['🗼'], 'The Surprise': ['🎭'], 'The Wizard of Menlo Park': ['💡'], 'The Pine Barrens': ['🌲'], 'The Problem Too Small to See': ['🔬'], 'Let Teens Sleep': ['😴'], 'Should Homework Be Limited? Two Views': ['📝'], 'Disaster at Lakehurst': ['🎈'] };
  // Longer wrong choices for some ELA Quest questions, so the right answer is not visibly the longest one
  // (a reader should not be able to guess by length). ELA Quest's own files are not changed.
  const LONGER = {
    'Both of them are afraid of the librarian.': 'Both of them are afraid of breaking the library\'s rules about the archive.',
    'Whether to walk home or take the bus': 'Whether to walk home together or take the bus after school',
    'He is afraid to talk to adults alone.': 'He is afraid to talk to adults alone, so he needs June there.',
    'Theo will report June to their parents.': 'Theo will report June to their parents as soon as they get home.',
    'The importance of owning old technology': 'The importance of keeping and repairing old family technology',
    'To reveal that she won the tournament': 'To reveal that she won the whole speech tournament after all',
    'He becomes angrier because the boat is sold.': 'He becomes angrier and more distant because the boat is being sold.',
    'It convinces him to become a fisherman.': 'It convinces him that he should become a fisherman like his father.',
    'He truly does not care about the boat.': 'He truly does not care about the boat or his father at all.',
    'It shows that the weather is dangerous.': 'It shows that the weather on the water is dangerous and unpredictable for small boats.',
    'She really is relieved to be second chair.': 'She really is relieved to be second chair and no longer play the solo.',
    'It is better to be first than to be kind.': 'It is always better to be first than to be kind to your rivals.',
    'Malik knows about the party, but his friends do not.': 'Malik knows about the party, but his friends do not realize he knows.',
    'MALIK, 14, stands at his locker.': 'JADE and RORY whisper nearby, then stop when he turns around.',
    'It makes the audience dislike Malik.': 'It makes the audience dislike Malik for being rude to his loyal friends.',
    'Jade is lying about her grades.': 'Jade is lying about her grades so that Malik will feel jealous.',
    'To reveal that Malik made the banner': 'To reveal that Malik made the banner himself and spelled it wrong',
    "It hides the keeper's feelings from the reader.": "It hides the keeper's true feelings from the reader until the end.",
    'He begins happy but becomes miserable.': 'He begins happy but becomes miserable and wants to leave the island.',
    'He thinks the man was in danger.': 'He thinks the man on the ship was in danger and needed help.',
    'A fascinating, heartwarming story about the best job in the world.': 'A fascinating, heartwarming story about a man who has the best and most important job in the world.',
    'To argue that the region should be farmed': 'To argue that the region should be cleared and farmed',
    'Pitch pines release chemicals.': 'Pitch pine trees release chemicals into the water.',
    '"The Pine Barrens are also rich in stories."': '"The Pine Barrens are also rich in stories, including the legend of the Jersey Devil."',
    'The phonograph was more important than the light bulb.': 'The phonograph was a more important invention than the electric light bulb.',
    'By comparing Edison to other inventors': 'By comparing Edison to other inventors of his time',
    'It was too expensive for Edison to make.': 'It was too expensive for Edison to make in large numbers.',
    '"Newspapers began calling Edison the Wizard of Menlo Park."': '"Newspapers began calling Edison the Wizard of Menlo Park after he invented the phonograph."',
    'As a problem and a single solution': 'As a problem followed by a single solution',
    'Microplastics are definitely harmful to humans.': 'Microplastics are definitely harmful to humans and must be banned everywhere.',
    'The author claims microplastics cause serious diseases.': 'The author claims that microplastics cause serious diseases in people.',
    'To list where microplastics are found': 'To list all of the places where microplastics are found',
    '"Fish and other animals often mistake them for food."': '"Fish and other animals often mistake them for food, which can harm them."',
    'Bus schedules are impossible to change.': 'Bus schedules are impossible for most school districts to change.',
    'Districts have adjusted their bus routes.': 'Districts that changed start times have adjusted their bus routes.',
    'By agreeing that schools should start earlier': 'By agreeing that schools should start earlier to save money',
    '"Every school morning, millions of American teenagers drag themselves…"': '"Every school morning, millions of American teenagers drag themselves out of bed before sunrise…"',
    'The airship was too long to land.': 'The airship was too long to land safely at the field.',
    'It convinced people airships were safe.': 'It convinced people that airships were still a safe way to travel.',
    'The author states the cause with total certainty.': 'The author states the cause of the fire with total certainty.',
    'A list of unrelated facts': 'A list of unrelated facts about airships and their history',
    'Grades are the only purpose of homework.': 'Grades are the only real purpose of assigning homework.',
    'Homework should be eliminated completely.': 'Homework should be eliminated completely in all grades.',
    'Statistics about college admissions': 'Statistics about college admissions and test scores',
    'The nurse focuses on grades, the principal on sleep.': 'The nurse focuses on grades, while the principal focuses on student sleep.',
    'Many students like the cafeteria pizza.': 'Many students say they like the pizza served in the cafeteria.',
    // Throwaway wrong choices replaced with plausible ones that still do not answer the question (2026-10-26 review).
    'Sports are more important than school.': 'Teenagers should spend less time on sports and more time on homework.',
    'It caused the fire.': 'It kept people from learning what had happened for many years.',
    'Teenagers are lazy.': 'Teenagers sleep late because they stay up using their phones.',
    'Sleep cures all illnesses.': 'Getting more sleep will completely end teens\' stress.',
    'Adults sleep too much.': 'Adults need more sleep than teenagers do.',
    'The program has colorful books.': 'Teachers said the program\'s books looked more interesting than the old ones.',
    'By attacking critics personally': 'By claiming that critics have not read the research',
    'He decides to buy the boat back.': 'He decides to keep working on the boat for the new owner.',
    'It reminds him that he is a bad artist.': 'It reminds him of how much he disliked fishing trips.',
    'He has poor eyesight.': 'He is not sure the ship was really there.',
    'He dislikes fishermen.': 'He wants the ship to come closer to the island.',
    'Skateboards have four wheels.': 'Most skateboards are about 32 inches long.',
    'The town has a library.': 'The town built a new library downtown two years ago.',
    'Some phones are very expensive.': 'Many new phones cost more than $500.',
    'Recycling bins come in many colors.': 'Recycling bins in some cities come in several colors.',
    "My cousin's school has a nice gym.": "Our school repainted the cafeteria last summer.",
    'One student said she liked the program.': 'One student said she liked the program and read more books.',
    'The bridge should be repaired because I do not like driving on it.': 'The bridge should be repaired because I do not like driving on it during rush hour.',
    'Phones were invented in the 1800s.': 'The first telephones were invented in the 1800s by Alexander Graham Bell.',
    'Skateboarding became popular in the 1960s.': 'Skateboarding first became popular in California in the 1960s.',
    'Stress is caused only by homework.': 'Stress in teenagers is caused only by homework.',
  };
  const longer = (q) => (q.opts ? { ...q, opts: q.opts.map((o) => (o !== q.a && LONGER[o]) || o) } : q);
  const figFor = (q) => Fig.picture(ICONS[q.passage && q.passage.title] || (q.passage ? ['📖'] : ['⚖️']), '');
  function wrap(id, k) {
    const goal = REUSED[id];
    return { ...k, fresh: false, goal, levels: k.levels.map((L, l) => {
      const tagIt = (q0) => { const q = longer(q0); return { ...q, goal, std: q.std || L.std, rit: BASE[l] + (TAG_OFFSET[q.tag] ?? 0), passage: q.passage ? { ...q.passage, fig: figFor(q) } : q.passage, fig: q.passage ? q.fig : (q.fig || figFor(q)) }; };
      // ELA Quest rounds have 5–6 questions; keep drawing until a round has 8.
      const gen = () => { const seen = new Set(), out = []; for (let t = 0; t < 40 && out.length < 8; t++) L.gen({}).forEach((q) => { const key = q.q + q.a; if (!seen.has(key)) { seen.add(key); out.push(q); } }); return out.map(tagIt); };
      const all = () => { const seen = new Set(), out = []; for (let r = 0; r < 30; r++) L.gen({}).forEach((q) => { const key = q.q + q.a + (q.passage ? q.passage.title : ''); if (!seen.has(key)) { seen.add(key); out.push(tagIt(q)); } }); return out; };
      return { ...L, gen, all };
    }) };
  }
  const levels = [];
  APP.features.map.goals.forEach((g) => {
    const fresh = READ_SKILLS.filter((k) => k.goal === g.id).map((k) => ({ ...k, fresh: true }));
    const reused = Object.keys(REUSED).filter((id) => REUSED[id] === g.id).map((id) => wrap(id, byId[id]));
    const skills = [...reused, ...fresh];
    skills.forEach((k) => k.levels.forEach((L, l) => levels.push({ gen: L.gen, all: L.all, where: `${k.id}.${l}`, fresh: k.fresh })));
    addSubject({ id: g.id, name: g.name, icon: g.icon, color: g.color, blurb: g.sub, skills });
  });
  return { levels, freshShare: levels.filter((L) => L.fresh).length / levels.length, MIN_FRESH: 0.6 };
})();
