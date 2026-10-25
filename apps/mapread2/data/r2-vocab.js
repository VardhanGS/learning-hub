// MAP Reading 2 — Vocabulary and literary devices: word parts and word play (all original).
// Standards: NJSLS-ELA 2023 L.VL.2.2 / L.VL.3.2 (word parts, context, multiple-meaning words) and
// L.VI.2.3 / L.VI.3.3 (shades of meaning, word relationships, figurative language).
(function () {
  const { solo, genLevel } = RK;
  const G = 'vocab';
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);

  // ===================== WORD PARTS =====================
  const COMPOUNDS = [['sunflower', 'sun', 'flower', '🌻', 'a tall flower that turns toward the sun'], ['raincoat', 'rain', 'coat', '🧥', 'a coat you wear in the rain'], ['snowman', 'snow', 'man', '☃️', 'a figure made of snow'], ['toothbrush', 'tooth', 'brush', '🪥', 'a brush for cleaning teeth'], ['football', 'foot', 'ball', '🏈', 'a ball used in a game'], ['cupcake', 'cup', 'cake', '🧁', 'a small cake baked in a cup'], ['starfish', 'star', 'fish', '⭐', 'a sea animal shaped like a star'], ['backpack', 'back', 'pack', '🎒', 'a bag you carry on your back'], ['rainbow', 'rain', 'bow', '🌈', 'curved colors in the sky after rain'], ['bedroom', 'bed', 'room', '🛏️', 'a room with a bed'], ['mailbox', 'mail', 'box', '📫', 'a box for letters'], ['popcorn', 'pop', 'corn', '🍿', 'corn that pops when heated']];
  const vb = (base, std, tag = 'vocab') => ({ base, goal: G, std, tag });
  function compoundParts() {
    const [w, a, b, icon] = U.pick(COMPOUNDS), others = U.sample(COMPOUNDS.filter((c) => c[0] !== w), 3);
    return solo(`Which two words make the compound word "${w}"?`, `${a} + ${b}`, others.map((o) => [`${o[1]} + ${o[2]}`, `Those words make "${o[0]}".`]), `"${w}" is made of "${a}" and "${b}".`, { ...vb(156, 'L.VL.2.2'), fig: pic(icon, w), hint: 'Find two small words inside the big word.' });
  }
  function compoundMeaning() {
    const [w, , , icon, means] = U.pick(COMPOUNDS), others = U.sample(COMPOUNDS.filter((c) => c[0] !== w), 3);
    return solo(`What does "${w}" mean?`, means, others.map((o) => [o[4], `That is what "${o[0]}" means.`]), `"${w}" means ${means}.`, { ...vb(160, 'L.VL.2.2'), fig: pic(icon), hint: 'Use the two smaller words to figure out the meaning.' });
  }
  const PREFIX = { un: 'not', re: 'again', pre: 'before' }, SUFFIX = { ful: 'full of', less: 'without', er: 'a person who' };
  // [word, affix, base, meaning, icon, [wrong meanings: each the base with a different affix's meaning]]
  const AFFIX_WORDS = [
    ['unhappy', 'un', 'happy', 'not happy', '😟', ['happy again', 'full of happy', 'very happy']], ['unlock', 'un', 'lock', 'the opposite of lock', '🔓', ['lock again', 'lock before', 'a person who locks']],
    ['unkind', 'un', 'kind', 'not kind', '😠', ['kind again', 'very kind', 'kind before']], ['retell', 're', 'tell', 'tell again', '🗣️', ['not tell', 'tell before', 'a person who tells']],
    ['reread', 're', 'read', 'read again', '📖', ['not read', 'read before', 'a person who reads']], ['refill', 're', 'fill', 'fill again', '🥤', ['not fill', 'fill before', 'without filling']],
    ['preheat', 'pre', 'heat', 'heat before', '♨️', ['heat again', 'not heat', 'without heat']], ['preschool', 'pre', 'school', 'school before kindergarten', '🧸', ['school again', 'not school', 'without school']],
    ['helpful', 'ful', 'help', 'full of help', '🤝', ['without help', 'help again', 'not help']], ['careful', 'ful', 'care', 'full of care', '🦺', ['without care', 'care again', 'care before']],
    ['fearless', 'less', 'fear', 'without fear', '🦁', ['full of fear', 'fear again', 'a person who fears']], ['helpless', 'less', 'help', 'without help', '😥', ['full of help', 'help again', 'help before']],
    ['painter', 'er', 'paint', 'a person who paints', '🎨', ['paint again', 'without paint', 'paint before']], ['teacher', 'er', 'teach', 'a person who teaches', '🧑‍🏫', ['teach again', 'not teach', 'teach before']],
    ['baker', 'er', 'bake', 'a person who bakes', '🧑‍🍳', ['bake again', 'bake before', 'not bake']],
  ];
  const affixMean = (aff) => PREFIX[aff] || SUFFIX[aff];
  function affixWord() {
    const [w, aff, base, means, icon, wrongs] = U.pick(AFFIX_WORDS);
    return solo(`What does the word "${w}" mean?`, means, wrongs.map((x) => [x, `"${w}" has the ${PREFIX[aff] ? 'prefix' : 'suffix'} "${aff}," which means "${affixMean(aff)}."`]), `"${aff}" means "${affixMean(aff)}," so "${w}" means ${means}.`, { ...vb(170, 'L.VL.2.2'), fig: pic(icon, `${PREFIX[aff] ? `${aff}- + ${base}` : `${base} + -${aff}`}`), hint: 'Cover the prefix or suffix. Find the base word. Then add the meaning of the part.' });
  }
  function whichWord() {
    const [w, aff, base, means, icon] = U.pick(AFFIX_WORDS);
    const others = U.sample(AFFIX_WORDS.filter((x) => x[0] !== w && x[1] !== aff), 3).map((x) => [x[0], `"${x[0]}" means ${x[3]}.`]);
    return solo(`Which word means "${means}"?`, w, others, `"${w}" = ${PREFIX[aff] ? `${aff} (${affixMean(aff)}) + ${base}` : `${base} + ${aff} (${affixMean(aff)})`}.`, { ...vb(174, 'L.VL.2.2'), fig: pic(icon), hint: `Think: which prefix or suffix means "${affixMean(aff)}"?` });
  }
  function affixMeaning() {
    const all = { ...PREFIX, ...SUFFIX }, aff = U.pick(Object.keys(all)), ex = U.pick(AFFIX_WORDS.filter((x) => x[1] === aff));
    return solo(`In the word "${ex[0]}," what does "${aff}" mean?`, all[aff], Object.keys(all).filter((k) => k !== aff).map((k) => [all[k], `"${k}" means "${all[k]}."`]).slice(0, 3), `"${aff}" means "${all[aff]}": ${ex[0]} means ${ex[3]}.`, { ...vb(172, 'L.VL.2.2'), fig: pic(ex[4], ex[0]), hint: 'Think of other words with the same part.' });
  }
  // Grade 3: more suffixes and Latin/Greek roots kids meet early.
  const G3_WORDS = [['comfortable', '-able', 'able to be comfortable', ['🛋️'], 'able to'], ['washable', '-able', 'able to be washed', ['🧺'], 'able to'], ['kindness', '-ness', 'the state of being kind', ['💗'], 'the state of being'], ['darkness', '-ness', 'the state of being dark', ['🌑'], 'the state of being'], ['quickly', '-ly', 'in a quick way', ['🏃'], 'in a way that is'], ['softly', '-ly', 'in a soft way', ['🤫'], 'in a way that is'], ['dislike', 'dis-', 'to not like', ['👎'], 'not'], ['misspell', 'mis-', 'to spell wrong', ['✏️'], 'wrongly'], ['nonstop', 'non-', 'without stopping', ['⏩'], 'not']];
  const ROOTS = [['tele', 'far', 'telephone', '☎️'], ['graph', 'write or draw', 'autograph', '✍️'], ['port', 'carry', 'transport', '🚚'], ['bio', 'life', 'biology', '🧬'], ['phon', 'sound', 'microphone', '🎤'], ['aqua', 'water', 'aquarium', '🐠']];
  function g3Suffix() {
    const [w, part, means, icon, partMeans] = U.pick(G3_WORDS);
    const ws = U.sample(G3_WORDS.filter((x) => x[1] !== part), 3).map((x) => [x[2], `That would need "${x[1]}," which means "${x[4]}."`]);
    return solo(`What does "${w}" mean?`, means, ws, `"${part}" means "${partMeans}," so "${w}" means ${means}.`, { ...vb(184, 'L.VL.3.2'), fig: pic(icon, w), hint: 'Split the word into its base word and the added part.' });
  }
  function rootMeaning() {
    const [root, means, ex, icon] = U.pick(ROOTS);
    const ws = U.sample(ROOTS.filter((r) => r[0] !== root), 3).map((r) => [r[1], `"${r[0]}" means "${r[1]}."`]);
    return solo(`The root "${root}" is in the word "${ex}." What does "${root}" MOST LIKELY mean?`, means, ws, `"${root}" means "${means}," as in ${ex}.`, { ...vb(190, 'L.VL.3.2'), fig: pic(icon, ex), hint: 'Think about what the whole word means.' });
  }

  // ===================== WORD PLAY =====================
  const SHADES = [[['cool', 'cold', 'freezing'], '🥶'], [['warm', 'hot', 'boiling'], '🔥'], [['nibble', 'eat', 'gobble'], '🍔'], [['whisper', 'talk', 'shout'], '📣'], [['walk', 'jog', 'sprint'], '🏃'], [['glad', 'happy', 'thrilled'], '🤩'], [['damp', 'wet', 'soaked'], '💦'], [['tiny', 'small', 'little'], '🐜']].filter((s) => s[0][2] !== 'little');
  function shadesOrder() {
    const [words, icon] = U.pick(SHADES);
    return { t: 'pop', q: 'Put the words in order from weakest to strongest.', template: '□ → □ → □', tiles: U.shuffle(words), accept: [words], meta: { kind: 'popSeq', args: [words] }, fig: pic(icon), hint: 'Which word means the least? Which means the most?', why: words.join(' → '), std: 'L.VI.2.3', goal: G, rit: 166, tag: 'Word relationships' };
  }
  function strongest() {
    const [words, icon] = U.pick(SHADES), other = U.pick(SHADES.filter((s) => s[0] !== words));
    return solo('Which word shows the STRONGEST feeling or action?', words[2], [[words[0], `"${words[0]}" is the weakest of these.`], [words[1], `"${words[1]}" is in the middle.`], [other[0][0], `"${other[0][0]}" is about something else.`]], `"${words[2]}" is stronger than "${words[1]}" and "${words[0]}."`, { ...vb(168, 'L.VI.2.3'), fig: pic(icon), hint: 'Picture each word. Which is the most?' });
  }
  const OPPOSITES = [['empty', 'full', '🥛'], ['early', 'late', '⏰'], ['quiet', 'loud', '🔊'], ['shallow', 'deep', '🌊'], ['smooth', 'rough', '🪨'], ['above', 'below', '⬆️'], ['dull', 'shiny', '✨'], ['narrow', 'wide', '↔️']];
  function antonym() {
    const [a, b, icon] = U.pick(OPPOSITES), others = U.sample(OPPOSITES.filter((o) => o[0] !== a), 3);
    return solo(`Which word means the OPPOSITE of "${a}"?`, b, others.map((o) => [o[U.pick([0, 1])], 'Opposites mean completely different things.']), `"${a}" and "${b}" are opposites.`, { ...vb(160, 'L.VI.2.3'), fig: pic(icon), hint: 'Opposites: hot and cold, up and down.' });
  }
  const MULTI = [['bat', ['The bat flew out of the cave at night.', 'a flying animal'], ['Leo hit the ball with a bat.', 'a stick for hitting a ball'], '🦇'], ['park', ['We had a picnic at the park.', 'a place with grass and trees'], ['Dad will park the car in the garage.', 'to stop a car and leave it'], '🌳'], ['watch', ['Grandma wears a gold watch.', 'a small clock you wear'], ['Let\'s watch the parade.', 'to look at'], '⌚'], ['bark', ['The bark on the tree felt rough.', 'the outside of a tree'], ['My dog will bark at the mail carrier.', 'the sound a dog makes'], '🐕'], ['ring', ['Mom wears a ring on her finger.', 'a circle worn as jewelry'], ['Did you hear the bell ring?', 'to make a bell sound'], '💍'], ['fly', ['A fly landed on my sandwich.', 'a small insect'], ['Birds fly south in the fall.', 'to move through the air'], '🪰'], ['rock', ['I found a smooth rock by the lake.', 'a stone'], ['Mom will rock the baby to sleep.', 'to move gently back and forth'], '🪨'], ['light', ['Turn on the light, please.', 'something that helps you see'], ['The box is so light I can lift it.', 'not heavy'], '💡']];
  function multiMeaning() {
    const [w, m1, m2, icon] = U.pick(MULTI), [s, means] = U.pick([m1, m2]), other = means === m1[1] ? m2[1] : m1[1];
    const extra = U.sample(MULTI.filter((m) => m[0] !== w), 2).map((m) => [m[1][1], `That is a meaning of "${m[0]}."`]);
    return solo(`What does "${w}" mean in this sentence?`, means, [[other, `"${w}" can mean ${other}, but not in this sentence.`], ...extra], `In this sentence, "${w}" means ${means}.`, { ...vb(176, 'L.VL.2.2'), sentence: s, fig: pic(icon), hint: 'Read the whole sentence. Which meaning makes sense?' });
  }
  const FIG = [
    ['simile', 'The kitten was as soft as a cloud.', 'The kitten was very soft.', ['The kitten was made of clouds.', 'The kitten liked the sky.', 'The kitten was wet.'], '🐱'],
    ['simile', 'Jamal ran like the wind.', 'Jamal ran very fast.', ['Jamal ran outside on a windy day.', 'Jamal was cold.', 'Jamal blew away.'], '💨'],
    ['simile', 'The lake was as smooth as glass.', 'The water was very still and flat.', ['The lake was made of glass.', 'The lake was very deep.', 'The lake was frozen solid.'], '🏞️'],
    ['idiom', 'It is raining cats and dogs!', 'It is raining very hard.', ['Pets are falling from the sky.', 'It is a little bit cloudy.', 'Cats and dogs are playing in the rain.'], '🌧️'],
    ['idiom', 'This test is a piece of cake.', 'The test is very easy.', ['The test is about baking.', 'There is cake at school.', 'The test is very hard.'], '🍰'],
    ['idiom', 'Mom said, "Hold your horses!"', 'Wait and slow down.', ['Hold on to a horse.', 'Go to the farm.', 'Run very fast.'], '🐴'],
    ['personification', 'The wind whispered through the trees.', 'The wind made a soft sound.', ['The wind told a secret.', 'The trees were talking.', 'The wind was very loud.'], '🍃'],
    ['personification', 'The sun smiled down on the picnic.', 'The sun was shining brightly.', ['The sun had a face.', 'It was nighttime.', 'The picnic was cancelled.'], '☀️'],
    ['hyperbole', 'I am so hungry I could eat a horse!', 'I am very hungry.', ['I want to eat a horse.', 'I just ate lunch.', 'I am not hungry at all.'], '🍽️'],
    ['hyperbole', 'My backpack weighs a ton!', 'My backpack is very heavy.', ['My backpack weighs exactly one ton.', 'My backpack is empty.', 'My backpack is very small.'], '🎒'],
  ];
  function figMeaning() {
    const [, s, a, ws, icon] = U.pick(FIG);
    return solo('What does the sentence REALLY mean?', a, ws.map((w, i) => [w, i === 0 ? 'That is what the words say exactly. The writer means something else.' : 'Think about what the writer is trying to show.']), `"${s}" is not meant word for word. It means: ${a.toLowerCase()}`, { ...vb(186, 'L.VI.3.3', 'device'), sentence: s, fig: pic(icon), hint: 'This sentence does not mean exactly what the words say.' });
  }
  function figKind() {
    const [kind, s, , , icon] = U.pick(FIG.filter((f) => f[0] === 'simile' || f[0] === 'personification'));
    const right = kind === 'simile' ? 'It compares two things using "like" or "as."' : 'It gives a thing human actions.';
    return solo('Which describes this sentence?', right, [kind === 'simile' ? ['It gives a thing human actions.', 'Look for the words "like" or "as."'] : ['It compares two things using "like" or "as."', 'Look for an action only people do.'], 'It tells the steps of a recipe.', 'It asks a question.'], kind === 'simile' ? 'A simile compares using "like" or "as."' : 'Personification gives human actions to things.', { ...vb(190, 'L.VI.3.3', 'device'), sentence: s, fig: pic(icon), hint: 'Does it use "like" or "as"? Does a thing act like a person?' });
  }
  function literal() {
    const [, s, a, , icon] = U.pick(FIG.filter((f) => f[0] === 'idiom' || f[0] === 'hyperbole'));
    const lit = U.pick(['The cat sat on the mat.', 'We ate lunch at noon.', 'The bus is yellow.', 'Ella read a book about frogs.']);
    return solo('Which sentence should NOT be read word for word?', s, [[lit, 'This sentence means exactly what it says.'], ...U.sample(['Our dog sleeps on a blue rug.', 'It rained all morning.', 'The store opens at nine.', 'Max ate an apple.'], 2)], `"${s}" means "${a.toLowerCase()}" — not exactly what it says.`, { ...vb(184, 'L.VI.3.3', 'device'), fig: pic(icon), hint: 'Which one would sound silly if it really happened?' });
  }

  const allOf = (fns, n = 48) => () => fns.flatMap((f) => [...Array(Math.ceil(n / fns.length))].map(() => f()));
  READ_SKILLS.push(
    { goal: G, id: 'wordparts', name: 'Word parts', icon: '🧩', levels: [
      genLevel('Compound words', 'L.VL.2.2', 'Two small words make a big one.', [compoundParts, compoundMeaning], allOf([compoundParts, compoundMeaning])),
      genLevel('Prefixes and suffixes', 'L.VL.2.2', 'un-, re-, pre-, -ful, -less, -er.', [affixWord, whichWord, affixMeaning], allOf([affixWord, whichWord, affixMeaning])),
      genLevel('More word parts and roots', 'L.VL.3.2', '-able, -ness, -ly, and roots.', [g3Suffix, rootMeaning], allOf([g3Suffix, rootMeaning])),
    ] },
    { goal: G, id: 'wordplay', name: 'Word play', icon: '🎈', levels: [
      genLevel('Shades of meaning', 'L.VI.2.3', 'Weak, stronger, strongest.', [shadesOrder, strongest, antonym], allOf([shadesOrder, strongest, antonym])),
      genLevel('Words with two meanings', 'L.VL.2.2 · L.VI.2.3', 'Use the sentence to choose.', [multiMeaning], allOf([multiMeaning])),
      genLevel('Similes, idioms, and more', 'L.VI.3.3', 'Words that paint pictures.', [figMeaning, figKind, literal], allOf([figMeaning, figKind, literal])),
    ] },
  );
})();
