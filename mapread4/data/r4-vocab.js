// MAP Reading 4 — Vocabulary and literary devices (all original).
// Standards: NJSLS-ELA 2023 L.VL.4.2 / L.VL.5.2 (context, roots and affixes, multiple-meaning academic words) and
// L.VI.4.3 / L.VI.5.3 (similes, metaphors, idioms, adages, proverbs, allusions, word relationships).
(function () {
  const { solo, genLevel } = RK;
  const G = 'vocab';
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);
  const allOf = (fns, n = 48) => () => fns.flatMap((f) => [...Array(Math.ceil(n / fns.length))].map(() => f()));
  // A bank question: [sentence, word, meaning, [wrong meanings], icon]; the word is shown in quotes.
  const fromBank = (bank, base, std, q = (w) => `What does "${w}" mean in the sentence?`, tag = 'vocab') => () => {
    const [s, w, a, ws, icon, why] = U.pick(bank);
    return solo(q(w), a, ws.map((x) => [x, 'Reread the sentence and look for clue words.']), why || `The clues in the sentence show that "${w}" means "${a}."`, { base, goal: G, std, tag, sentence: s, fig: pic(icon), hint: 'Look at the words and sentences around it for a clue.' });
  };

  // ===================== CONTEXT CLUES =====================
  const CTX0 = [ // definition and restatement clues
    ['The hikers reached the summit, or the very top, of the mountain just before sunset.', 'summit', 'the highest point', ['the bottom of a valley', 'a narrow mountain path', 'a cave in the rock'], '🏔️'],
    ['Bears hibernate, which means they sleep through the cold winter months.', 'hibernate', 'to sleep through the winter', ['to hunt for food in snow', 'to move to a warmer place', 'to build a new den each fall'], '🐻'],
    ['The dentist gave me a toothbrush and floss, a thin string for cleaning between teeth.', 'floss', 'a string for cleaning teeth', ['a kind of soft toothpaste', 'a tool for whitening teeth', 'a cup for rinsing your mouth'], '🦷'],
    ['Maya is a vegetarian; in other words, she does not eat meat.', 'vegetarian', 'a person who does not eat meat', ['a person who only eats vegetables', 'a person who grows a garden', 'a person who cooks dinner'], '🥗'],
    ['The museum has many artifacts, objects made by people long ago.', 'artifacts', 'old objects made by people', ['paintings made last year', 'bones of ancient animals', 'maps of the museum'], '🏺'],
    ['A meteorologist is a scientist who studies weather and makes forecasts.', 'meteorologist', 'a scientist who studies weather', ['a scientist who studies rocks', 'a person who studies stars', 'a person who sells weather radios'], '🌦️'],
    ['The cactus can endure, or put up with, months without any rain.', 'endure', 'to put up with something hard', ['to grow quickly in the sun', 'to soak up water from the air', 'to fall over in strong wind'], '🌵'],
    ['The baby was drowsy; she was so sleepy that she could barely keep her eyes open.', 'drowsy', 'sleepy', ['hungry', 'grumpy', 'excited'], '😴'],
  ];
  const CTX1 = [ // example and contrast clues
    ['Unlike his talkative sister, Ben was reserved and rarely shared his thoughts.', 'reserved', 'quiet and keeping thoughts to oneself', ['loud, silly, and full of jokes', 'kind and very helpful', 'tired and ready for bed'], '🤐'],
    ['Instead of being fragile like a glass vase, the plastic cup is sturdy and will not break.', 'fragile', 'easy to break', ['very heavy to carry', 'shiny and colorful', 'hard to clean'], '🏺'],
    ['Amphibians, such as frogs, toads, and salamanders, live part of their lives in water.', 'amphibians', 'animals like frogs that live in water and on land', ['animals with fur that live high in trees', 'birds that dive into the water', 'fish that live in deep oceans'], '🐸'],
    ['Although the first part of the trail was easy, the second part was strenuous and left us tired.', 'strenuous', 'needing a lot of effort', ['short and very simple', 'flat and very shady', 'full of pretty flowers'], '🥾'],
    ['Our town has many places to recycle, including bins at school, the library, and every park.', 'recycle', 'to make used things into new things', ['to throw things in the trash', 'to buy new things at a store', 'to clean up a messy room'], '♻️'],
    ['The first pancake was perfect, but the second was a disaster, burnt black and stuck to the pan.', 'disaster', 'something that goes very badly', ['something that tastes sweet', 'something made very fast', 'something cooked just right'], '🥞'],
    ['Root vegetables, like carrots, beets, and potatoes, grow under the ground.', 'root vegetables', 'vegetables that grow under the ground', ['vegetables that grow on long vines', 'vegetables that grow on trees', 'vegetables that grow in water'], '🥕'],
    ['The once-noisy classroom became tranquil when everyone began reading silently.', 'tranquil', 'calm and quiet', ['crowded and messy', 'loud and busy', 'dark and empty'], '📚'],
  ];
  const CTX2 = [ // multiple-meaning academic and domain words (Grade 5)
    ['In science class, we learned that a solution forms when salt dissolves in water.', 'solution', 'a mixture where one thing dissolves in another', ['the answer to a hard problem in math', 'a plan to fix something', 'a tool for measuring water'], '🧪'],
    ['The colonists did not want to pay a tax without having a voice in the government.', 'voice', 'a say in decisions', ['the sound a person makes', 'a loud shout', 'a singing part in a choir'], '📜'],
    ['On the map, the scale shows that one inch stands for ten miles.', 'scale', 'a guide that shows real distance on a map', ['a machine for weighing things like fruit', 'a hard plate on a fish', 'to climb up something steep'], '🗺️'],
    ['The rock showed many layers, each one formed over thousands of years.', 'layers', 'flat bands of material on top of each other', ['hens that lay eggs', 'pieces of clothing', 'workers who lay bricks for a wall'], '🪨'],
    ['Plants need light energy from the sun to make their food.', 'energy', 'the power to make things happen', ['a feeling of being excited', 'a kind of drink for athletes', 'a loud noise'], '☀️'],
    ['The teacher asked us to find the product of 6 and 7.', 'product', 'the answer when numbers are multiplied', ['something that a company makes and sells', 'the result of hard work', 'a vegetable from a farm'], '✖️'],
    ['The current in the river was so strong that it pulled the canoe downstream.', 'current', 'water moving in one direction', ['happening right now', 'a flow of electricity', 'a dried fruit like a raisin'], '🛶'],
    ['During the experiment, we recorded each observation in our notebooks.', 'observation', 'something noticed by watching carefully', ['a tall tower for watching', 'a guess before an experiment', 'a rule that must be followed in class'], '🔬'],
  ];

  // ===================== WORD PARTS =====================
  const AFF = [ // [word, part, meaning, wrongs, icon, why]
    ['disagree', 'dis-', 'to not agree', ['to agree again', 'to agree before', 'to agree too much'], '🙅', '"dis-" means "not" or "opposite of."'],
    ['misplace', 'mis-', 'to put in the wrong place', ['to put back in place', 'to place again', 'to place before'], '🔎', '"mis-" means "wrongly."'],
    ['incorrect', 'in-', 'not correct', ['very correct', 'correct again', 'correct before'], '❌', '"in-" can mean "not."'],
    ['nonfiction', 'non-', 'not made up', ['made up again', 'made up before', 'very made up'], '📘', '"non-" means "not."'],
    ['powerful', '-ful', 'full of power', ['without power', 'a person with power', 'power again'], '💪', '"-ful" means "full of."'],
    ['darkness', '-ness', 'the state of being dark', ['a person who is dark', 'to make something dark', 'full of light'], '🌑', '"-ness" means "the state of being."'],
    ['enjoyable', '-able', 'able to be enjoyed', ['not able to enjoy', 'a person who enjoys', 'enjoy again'], '🎢', '"-able" means "able to be."'],
    ['preview', 'pre-', 'to see before', ['to see again', 'to see wrongly', 'to not see'], '🎬', '"pre-" means "before."'],
    ['rebuild', 're-', 'to build again', ['to build wrongly', 'to build before', 'to not build'], '🏗️', '"re-" means "again."'],
    ['submarine', 'sub-', 'a ship that goes under the sea', ['a ship that goes over the sea', 'a ship that sails backward', 'a ship that is very small'], '🌊', '"sub-" means "under."'],
  ];
  const ROOTS = [ // [root, meaning, example word, wrong meanings, icon]
    ['tele', 'far', 'telescope', ['near', 'small', 'bright'], '🔭'], ['graph', 'write or draw', 'autograph', ['hear', 'carry', 'break'], '✍️'],
    ['photo', 'light', 'photograph', ['sound', 'water', 'earth'], '📷'], ['auto', 'self', 'automatic', ['many', 'under', 'across'], '🚗'],
    ['port', 'carry', 'transport', ['see', 'build', 'speak'], '🚚'], ['rupt', 'break', 'erupt', ['carry', 'look', 'write'], '🌋'],
    ['struct', 'build', 'construct', ['break', 'hear', 'carry'], '🏗️'], ['aud', 'hear', 'audience', ['see', 'build', 'run'], '👂'],
    ['vis', 'see', 'visible', ['hear', 'carry', 'speak'], '👀'], ['dict', 'say or speak', 'dictionary', ['see', 'break', 'carry'], '🗣️'],
    ['bio', 'life', 'biology', ['earth', 'light', 'sound'], '🧬'], ['geo', 'earth', 'geography', ['life', 'water', 'sky'], '🌍'],
  ];
  function affixQ() {
    const [w, part, a, ws, icon, why] = U.pick(AFF);
    return solo(`What does "${w}" mean?`, a, ws.map((x) => [x, why]), `${why} So "${w}" means ${a}.`, { base: 186, goal: G, std: 'L.VL.4.2', fig: pic(icon, w), hint: 'Find the prefix or suffix, then the base word.' });
  }
  function affixPart() {
    const [w, part, , , icon, why] = U.pick(AFF);
    const others = U.sample(AFF.filter((x) => x[1] !== part), 3).map((x) => [x[1], x[5]]);
    return solo(`Which part of "${w}" changes the meaning of the base word?`, part, others, why, { base: 188, goal: G, std: 'L.VL.4.2', fig: pic(icon, w), hint: 'Look at the beginning or end of the word.' });
  }
  function rootQ() {
    const [root, a, ex, ws, icon] = U.pick(ROOTS);
    return solo(`The root "${root}" appears in "${ex}." What does "${root}" mean?`, a, ws.map((x) => [x, `Think about what "${ex}" means.`]), `"${root}" means "${a}," as in ${ex}.`, { base: 198, goal: G, std: 'L.VL.4.2', fig: pic(icon, ex), hint: 'What does the whole word mean? Which part of that meaning comes from the root?' });
  }
  function rootWord() {
    const [root, a, ex, , icon] = U.pick(ROOTS), others = U.sample(ROOTS.filter((r) => r[0] !== root), 3);
    return solo(`Which word has a root that means "${a}"?`, ex, others.map((r) => [r[2], `"${r[2]}" has the root "${r[0]}," which means "${r[1]}."`]), `"${ex}" has the root "${root}," which means "${a}."`, { base: 200, goal: G, std: 'L.VL.4.2', fig: pic(icon), hint: 'Find the root in each word.' });
  }
  const FAMILIES = [ // Grade 5: two parts together
    ['telephone', 'tele (far) + phone (sound)', 'a tool that carries sound far away', ['a tool that takes pictures of sound', 'a tool that writes words by itself', 'a tool for seeing tiny things'], '☎️'],
    ['biography', 'bio (life) + graph (write)', 'a written story of a person\'s life', ['a drawing of the planet Earth', 'a book about how to stay healthy', 'a chart of the weather each day'], '📕'],
    ['autobiography', 'auto (self) + bio (life) + graph (write)', 'a story of a person\'s life written by that person', ['a story about cars and how they work', 'a story written by someone about a famous animal', 'a list of facts about many people'], '📔'],
    ['geology', 'geo (earth) + logy (study of)', 'the study of rocks and the earth', ['the study of living things', 'the study of maps and roads', 'the study of stars in space'], '🪨'],
    ['inaudible', 'in (not) + aud (hear) + ible (able to be)', 'not able to be heard', ['able to be heard far away', 'heard again and again', 'too loud to listen to'], '🔇'],
    ['portable', 'port (carry) + able (able to be)', 'able to be carried', ['able to be broken', 'not able to move', 'able to be built'], '🎒'],
    ['disruption', 'dis (apart) + rupt (break) + tion (act of)', 'an act of breaking something apart', ['an act of building something up', 'an act of speaking out loud', 'an act of carrying something far'], '🚧'],
    ['invisible', 'in (not) + vis (see) + ible (able to be)', 'not able to be seen', ['able to be seen clearly', 'seen again later', 'too bright to look at'], '👻'],
  ];
  function familyQ() {
    const [w, parts, a, ws, icon] = U.pick(FAMILIES);
    return solo(`"${w}" = ${parts}. What does "${w}" mean?`, a, ws.map((x) => [x, 'Put the meanings of the word parts together.']), `${parts}, so "${w}" means ${a}.`, { base: 208, goal: G, std: 'L.VL.5.2', fig: pic(icon, w), hint: 'Add up the meanings of the parts.' });
  }

  // ===================== FIGURATIVE LANGUAGE =====================
  const SIM = [ // [sentence, kind, meaning, wrongs, icon]
    ['After running the race, Leo\'s legs felt like jelly.', 'simile', 'His legs felt weak and shaky.', ['His legs were sticky and sweet.', 'His legs were strong and fast.', 'His legs were cold and wet.'], '🏃'],
    ['The classroom was a zoo after the fire drill.', 'metaphor', 'The classroom was wild and noisy.', ['The classroom had animals in it.', 'The classroom was quiet and calm.', 'The classroom was outside.'], '🦁'],
    ['Her smile was as bright as the sun.', 'simile', 'Her smile was very happy and warm.', ['Her smile hurt people\'s eyes.', 'Her smile was hot to touch.', 'She smiled only in the morning.'], '😊'],
    ['The stars were diamonds scattered across the night sky.', 'metaphor', 'The stars sparkled like jewels.', ['The stars were made of real gems.', 'The stars were falling down.', 'The night sky was very cloudy.'], '✨'],
    ['Grandpa\'s hands were as rough as sandpaper.', 'simile', 'His hands felt very rough and dry.', ['His hands were covered in sand.', 'His hands were soft and smooth.', 'His hands were very small.'], '🤲'],
    ['The snow was a white blanket over the town.', 'metaphor', 'The snow covered the whole town.', ['Someone put a blanket on the town.', 'The snow kept everyone warm.', 'The snow was melting fast.'], '❄️'],
    ['Dad was as busy as a bee getting ready for the party.', 'simile', 'Dad was working hard on many jobs.', ['Dad was buzzing and flying around.', 'Dad was resting before the party.', 'Dad was making honey for dessert.'], '🐝'],
    ['The thunder was a drum rolling across the sky.', 'metaphor', 'The thunder made a deep, rumbling sound.', ['Someone played drums in the clouds.', 'The thunder was very quiet.', 'The sky was full of music.'], '⛈️'],
  ];
  const IDIOM = [ // idioms, adages, proverbs
    ['When Jada saw the surprise party, she was on cloud nine.', 'on cloud nine', 'very happy', ['very confused', 'very tired', 'very scared'], '🥳'],
    ['Don\'t worry about the spilled juice. It\'s no use crying over spilled milk.', 'no use crying over spilled milk', 'don\'t be upset about what can\'t be changed', ['always clean up any mess right away', 'milk is better than juice to drink', 'try not to drink near the couch'], '🥛'],
    ['Mom told Sam to hit the books before his test.', 'hit the books', 'to study hard', ['to stack books on a shelf', 'to throw books on the floor', 'to read a funny story'], '📚'],
    ['The early bird catches the worm, so Rosa got to the sale first.', 'the early bird catches the worm', 'people who start early often succeed', ['birds eat worms in the morning', 'sales always start very early', 'it is good to sleep late'], '🐦'],
    ['Learning to ride a bike was a piece of cake for Kai.', 'a piece of cake', 'very easy', ['very tasty', 'very messy', 'very slow'], '🚲'],
    ['Look before you leap, Grandma said, when I wanted to buy the first bike I saw.', 'look before you leap', 'think carefully before you act', ['always jump over puddles', 'look at the sky before you run', 'buy things as fast as you can'], '🤔'],
    ['I have butterflies in my stomach before every piano recital.', 'butterflies in my stomach', 'a nervous feeling', ['a hungry feeling', 'a sleepy feeling', 'a sick feeling'], '🎹'],
    ['Two heads are better than one, so let\'s solve this puzzle together.', 'two heads are better than one', 'people working together can solve more', ['people with big heads are smart', 'puzzles need two players', 'one person should always lead'], '🧩'],
  ];
  const ALLUSION = [ // Grade 5: allusions, personification, hyperbole
    ['Cleaning the whole garage in one day was a Herculean task.', 'Herculean', 'needing great strength and effort', ['needing very little time', 'needing a lot of money to finish', 'needing many tools'], '💪', 'Hercules was a hero in Greek myths known for his great strength.'],
    ['When Mia opened the door to her brother\'s messy room, she felt she had opened Pandora\'s box.', "Pandora's box", 'something that causes many problems', ['a box full of treasure', 'a gift wrapped in paper', 'a closet full of clean clothes'], '📦', 'In a Greek myth, Pandora opened a box that let troubles out into the world.'],
    ['The tiny team faced the champions like David facing Goliath.', 'David facing Goliath', 'a small side facing a much bigger one', ['two teams that are the same size', 'a team that never plays', 'a giant that wins easily'], '🏆', 'In an old story, a young boy named David defeats a giant named Goliath.'],
    ['The old car groaned as it climbed the steep hill.', 'groaned', 'made a low, struggling sound', ['laughed at the other cars', 'stopped and fell asleep', 'drove up very quickly'], '🚗', 'Personification: the car "groans" like a tired person.'],
    ['I have told you a million times to close the door!', 'a million times', 'many, many times', ['exactly one million times', 'only one time', 'never before today'], '🚪', 'Hyperbole: an exaggeration to make a point.'],
    ['The wind howled angrily through the empty streets.', 'howled angrily', 'blew with a loud, wild sound', ['blew softly and gently', 'stopped blowing at all', 'blew warm summer air'], '🌬️', 'Personification: the wind "howls angrily" like a person or animal.'],
    ['Marco has the Midas touch: everything he sells makes money.', 'the Midas touch', 'the ability to make things successful', ['the ability to fix broken things', 'the ability to run very fast', 'the ability to make friends easily'], '👑', 'In a myth, King Midas turned everything he touched into gold.'],
    ['This backpack weighs a ton!', 'weighs a ton', 'is very heavy', ['weighs exactly one ton', 'is very light', 'is the wrong color'], '🎒', 'Hyperbole: the backpack does not really weigh a ton.'],
  ];
  function simileQ() {
    const [s, kind, a, ws, icon] = U.pick(SIM);
    return solo('What does the sentence mean?', a, ws.map((x, i) => [x, i === 0 ? 'That is what the words say exactly. The writer is making a comparison.' : 'Think about what the comparison shows.']), `This ${kind} means: ${a.toLowerCase()}`, { base: 188, goal: G, std: 'L.VI.4.3', tag: 'device', sentence: s, fig: pic(icon), hint: 'A simile or metaphor compares two things.' });
  }
  function simileKind() {
    const [s, kind, , , icon] = U.pick(SIM);
    const a = kind === 'simile' ? 'a simile, because it compares using "like" or "as"' : 'a metaphor, because it says one thing is another';
    const w = kind === 'simile' ? ['a metaphor, because it says one thing is another', 'personification, because a thing acts human', 'an idiom, because it is a common saying'] : ['a simile, because it compares using "like" or "as"', 'personification, because a thing acts human', 'an idiom, because it is a common saying'];
    return solo('What kind of figurative language is this?', a, w.map((x) => [x, 'Check for "like" or "as."']), `It is ${a}.`, { base: 192, goal: G, std: 'L.VI.4.3', tag: 'device', sentence: s, fig: pic(icon), hint: 'Does it use "like" or "as"?' });
  }
  const bankQ = (bank, base, std) => () => {
    const [s, phrase, a, ws, icon, note] = U.pick(bank);
    return solo(`What does "${phrase}" mean?`, a, ws.map((x) => [x, 'This phrase does not mean exactly what the words say.']), note ? `${note} So "${phrase}" means ${a}.` : `"${phrase}" means ${a}.`, { base, goal: G, std, tag: 'device', sentence: s, fig: pic(icon), hint: 'Think about what the speaker really means.' });
  };

  READ_SKILLS.push(
    { goal: G, id: 'context4', name: 'Context clues', icon: '🕵️', levels: [
      genLevel('Definition and restatement clues', 'L.VL.4.2', 'The meaning is right there.', [fromBank(CTX0, 186, 'L.VL.4.2')], allOf([fromBank(CTX0, 186, 'L.VL.4.2')])),
      genLevel('Example and contrast clues', 'L.VL.4.2', 'Look for "such as," "unlike," and "but."', [fromBank(CTX1, 196, 'L.VL.4.2')], allOf([fromBank(CTX1, 196, 'L.VL.4.2')])),
      genLevel('Words with school meanings', 'L.VL.5.2', 'Science, math, and history words.', [fromBank(CTX2, 206, 'L.VL.5.2')], allOf([fromBank(CTX2, 206, 'L.VL.5.2')])),
    ] },
    { goal: G, id: 'roots4', name: 'Roots & affixes', icon: '🌱', levels: [
      genLevel('Prefixes and suffixes', 'L.VL.4.2', 'dis-, mis-, in-, -ful, -ness, -able.', [affixQ, affixPart], allOf([affixQ, affixPart])),
      genLevel('Greek and Latin roots', 'L.VL.4.2', 'tele, graph, port, rupt, and more.', [rootQ, rootWord], allOf([rootQ, rootWord])),
      genLevel('Putting word parts together', 'L.VL.5.2', 'Big words from small parts.', [familyQ], allOf([familyQ])),
    ] },
    { goal: G, id: 'figurative4', name: 'Figurative language', icon: '🎨', levels: [
      genLevel('Similes and metaphors', 'L.VI.4.3', 'Comparisons that paint pictures.', [simileQ, simileKind], allOf([simileQ, simileKind])),
      genLevel('Idioms, adages, and proverbs', 'L.VI.4.3', 'Sayings that mean more than their words.', [bankQ(IDIOM, 196, 'L.VI.4.3')], allOf([bankQ(IDIOM, 196, 'L.VI.4.3')])),
      genLevel('Allusions and more', 'L.VI.5.3', 'Myths, exaggeration, and things that act human.', [bankQ(ALLUSION, 208, 'L.VI.5.3')], allOf([bankQ(ALLUSION, 208, 'L.VI.5.3')])),
    ] },
  );
})();
