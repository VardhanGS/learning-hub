// MAP Reading 8 — Vocabulary and literary devices (all original).
// Standards: NJSLS-ELA 2023 L.VL.8.3 / L.VL.9–10.3 (context, Greek and Latin roots, technical meanings) and
// L.VI.8.4 / L.VI.9–10.4 (figures of speech, word relationships, connotation, tone).
(function () {
  const { solo, genLevel } = RK;
  const G = 'vocab';
  const pic = (icons, caption = '') => Fig.picture([].concat(icons), caption);
  const allOf = (fns, n = 48) => () => fns.flatMap((f) => [...Array(Math.ceil(n / fns.length))].map(() => f()));
  const bank = (B, base, std, q, tag = 'vocab') => () => {
    const [s, w, a, ws, icon, why] = U.pick(B);
    return solo(q(w), a, ws.map((x) => [x, 'Reread the sentence and look for clues to the meaning.']), why || `In this context, "${w}" means ${a}.`, { base, goal: G, std, tag, sentence: s, fig: pic(icon), hint: 'Use the sentence around the word as your clue.' });
  };

  // ===================== WORD MEANING =====================
  const CTX = [
    ['The senator\'s speech was so verbose that many listeners lost track of her main point.', 'verbose', 'using more words than needed', ['spoken in a loud voice', 'full of new ideas', 'very short and clear'], '🗣️'],
    ['After weeks of drought, the farmers welcomed the rain with palpable relief that everyone could see.', 'palpable', 'so strong it could almost be felt', ['quiet and hidden', 'brief and fading', 'false, pretended, and easy to ignore'], '🌧️'],
    ['The once-thriving mill town became desolate after the factory closed and families moved away.', 'desolate', 'empty and lifeless', ['crowded and busy', 'newly built', 'loud and cheerful'], '🏚️'],
    ['Rather than admit his mistake, Marcus tried to obfuscate the issue with long, confusing explanations.', 'obfuscate', 'to make something unclear on purpose', ['to explain something simply and clearly', 'to apologize for a mistake', 'to repeat something exactly'], '🌫️'],
    ['The judge remained impartial, listening to both sides without showing favor to either.', 'impartial', 'fair and not taking sides', ['angry and impatient', 'confused by the facts', 'eager to finish quickly'], '⚖️'],
    ['Her tenacious efforts finally paid off when, after eleven rejections, her story was published.', 'tenacious', 'refusing to give up', ['careless and quick', 'shy and nervous', 'lucky and carefree'], '💪'],
    ['The new evidence was so compelling that even the skeptics changed their minds.', 'compelling', 'convincing and powerful', ['weak and unclear', 'old and forgotten', 'funny and silly'], '🔎'],
    ['Because the instructions were ambiguous, half the class built the model one way and half another.', 'ambiguous', 'having more than one possible meaning', ['written in a language from another country', 'too long to read', 'perfectly clear'], '❓'],
  ];
  const ROOT8 = [
    ['benevolent', 'bene (good) + vol (wish)', 'kind and wishing others well', ['angry and wishing harm', 'quick to make a decision', 'unwilling to give help'], '🤝'],
    ['chronological', 'chron (time) + logic (study, order)', 'arranged in order of time', ['arranged in order of size', 'arranged by color', 'arranged at random'], '⏳'],
    ['philanthropist', 'phil (love) + anthrop (humanity)', 'a person who helps others, often by giving money', ['a person who studies plants', 'a person who writes stories about history', 'a person who avoids people'], '💝'],
    ['incredulous', 'in (not) + cred (believe)', 'unable to believe something', ['easy to fool', 'certain and confident', 'unable to hear'], '😮'],
    ['circumnavigate', 'circum (around) + nav (ship, sail)', 'to sail all the way around', ['to sail straight across', 'to stay in one place', 'to sink a ship'], '🌍'],
    ['malfunction', 'mal (bad) + function (working)', 'to fail to work properly', ['to work perfectly', 'to start for the first time', 'to be repaired'], '⚙️'],
    ['contradict', 'contra (against) + dict (say)', 'to say the opposite of', ['to agree with', 'to repeat exactly', 'to say quietly'], '🙅'],
    ['transcontinental', 'trans (across) + continent', 'crossing a whole continent', ['staying in one city', 'under the ocean', 'within a single state'], '🚂'],
  ];
  const TECH = [
    ['In the experiment, the independent variable was the amount of sunlight each plant received.', 'variable', 'a factor that can change in an experiment', ['a person who often changes their mind', 'a type of plant', 'the result of the test'], '🧪'],
    ['The colonists objected to taxation without representation in Parliament.', 'representation', 'having someone speak and vote for you', ['a drawing of a person', 'a type of tax', 'a meeting of the king\'s advisors'], '📜'],
    ['The author uses foreshadowing in the first chapter to hint at the tragedy to come.', 'foreshadowing', 'hints about what will happen later', ['a summary of the ending', 'a description of the setting', 'a list of characters'], '🔮'],
    ['A rise in demand, with no change in supply, usually causes prices to increase.', 'demand', 'how much of something people want to buy', ['an angry request', 'a company\'s profit', 'the cost of making and shipping a product'], '📈'],
    ['The cell membrane controls what enters and leaves the cell.', 'membrane', 'a thin layer that surrounds something', ['the center that controls the cell', 'a kind of food', 'a group of cells'], '🔬'],
    ['The treaty was ratified after two-thirds of the Senate voted to approve it.', 'ratified', 'formally approved', ['secretly rejected', 'written for the first time', 'translated'], '🖋️'],
    ['In the poem, the volta signals a shift from describing the storm to reflecting on loss.', 'volta', 'a turn or shift in a poem', ['the poem\'s title', 'a rhyming word', 'the last stanza\'s length'], '🔄'],
    ['The molecule\'s mass was measured in atomic mass units.', 'mass', 'the amount of matter in something', ['a large crowd', 'a religious service', 'the size of something\'s shadow'], '⚛️'],
  ];
  // Give the meaning of ONE word part only (like real items); the child works out the rest. The full breakdown is
  // shown in the explanation afterward.
  const oneClue = (w, parts, k) => { const p = parts.split(' + ')[k], m = p.match(/^(\S+) \((.+)\)$/); return m ? `In "${w}", the word part "${m[1]}" means "${m[2]}". What does "${w}" MOST LIKELY mean?` : `What does "${w}" MOST LIKELY mean?`; };
  const CLUE8 = { benevolent: 0, chronological: 0, philanthropist: 1, incredulous: 1, circumnavigate: 0, malfunction: 0, contradict: 0, transcontinental: 0 };
  function rootQ() {
    const [w, parts, a, ws, icon] = U.pick(ROOT8);
    return solo(oneClue(w, parts, CLUE8[w] || 0), a, ws.map((x) => [x, 'Combine the meanings of the parts.']), `${parts}, so "${w}" means ${a}.`, { base: 214, goal: G, std: 'L.VL.8.3', fig: pic(icon, w), hint: 'Put the meanings of the word parts together.' });
  }

  // ===================== TONE, CONNOTATION & FIGURES OF SPEECH =====================
  const CONNO = [
    ['Which word has the most POSITIVE connotation for describing someone who saves money?', 'thrifty', ['stingy', 'cheap', 'miserly'], 'All four describe saving, but "thrifty" suggests a good habit.', '💰'],
    ['Which word has the most NEGATIVE connotation for someone who keeps trying?', 'stubborn', ['determined', 'persistent', 'dedicated'], '"Stubborn" suggests refusing to change, a negative trait.', '🐂'],
    ['Which word suggests the most CONFIDENCE in how someone walks?', 'strode', ['shuffled', 'crept', 'stumbled'], '"Strode" means walked with long, confident steps.', '🚶'],
    ['Which word has the most POSITIVE connotation for a small home?', 'cozy', ['cramped', 'tiny', 'crowded'], '"Cozy" makes a small space sound warm and pleasant.', '🏠'],
    ['Which word suggests the most CURIOSITY?', 'inquisitive', ['nosy', 'prying', 'meddling'], '"Inquisitive" is positive; the others suggest intruding.', '🧐'],
    ['Which word has the most NEGATIVE connotation for a person who talks a lot?', 'chattering', ['talkative', 'outgoing', 'expressive'], '"Chattering" suggests annoying, constant talk.', '💬'],
  ];
  function connotation() {
    const [q, a, ws, why, icon] = U.pick(CONNO);
    return solo(q, a, ws.map((x) => [x, 'Words can mean the same thing but carry different feelings.']), why, { base: 196, goal: G, std: 'L.VI.8.4', tag: 'tone', fig: pic(icon), hint: 'Think about the feeling each word gives, not just its meaning.' });
  }
  const TONE = [
    ['The rain fell in sheets. The empty streets glistened under flickering lamps, and somewhere a door slammed and did not open again.', 'ominous and uneasy', ['cheerful and lighthearted', 'angry and accusing', 'silly and playful'], '🌧️'],
    ['Oh, wonderful. The bus is late again, it\'s pouring rain, and I forgot my umbrella. What a perfect morning.', 'sarcastic', ['grateful', 'calm', 'hopeful'], '☔'],
    ['Every morning, Grandpa set two cups on the table, though Grandma had been gone for three years. He poured her coffee anyway.', 'tender and sorrowful', ['humorous and teasing', 'angry and bitter', 'excited and curious'], '☕'],
    ['Ladies and gentlemen, the moment you have been waiting for! The greatest show on Earth begins NOW!', 'enthusiastic', ['gloomy', 'doubtful', 'bored'], '🎪'],
    ['The report finds that recycling rates rose by 4% last year. Further data are needed to determine the cause.', 'objective and neutral', ['angry and emotional', 'humorous and joking', 'sad and regretful'], '📊'],
    ['How dare they cut funding for the only library in town? Our children deserve better than this.', 'indignant', ['relaxed', 'amused', 'uncertain'], '📚'],
  ];
  function toneQ() {
    const [s, a, ws, icon] = U.pick(TONE);
    return solo('Which word BEST describes the tone of this passage?', a, ws.map((x) => [x, 'Tone comes from word choice and details. Look at specific words.']), `The word choices create a(n) ${a} tone.`, { base: 202, goal: G, std: 'L.VI.8.4', tag: 'tone', sentence: s, fig: pic(icon), hint: 'Which words show the writer\'s attitude?' });
  }
  const FIG8 = [
    ['"Great," said Jamal as his ice cream fell onto the sidewalk.', 'verbal irony', ['situational irony', 'hyperbole', 'alliteration'], 'Saying "great" about something bad is verbal irony.', '🍦'],
    ['A fire station burned down because its smoke alarm was broken.', 'situational irony', ['verbal irony', 'personification', 'simile'], 'The opposite of what you would expect happens: situational irony.', '🚒'],
    ['"I used to be a baker, but I couldn\'t make enough dough."', 'a pun', ['an analogy', 'a hyperbole', 'an allusion'], '"Dough" means both bread dough and money: a pun.', '🍞'],
    ['Finding the right word is like finding the right key: only one will open the lock.', 'an analogy', ['a pun', 'verbal irony', 'an oxymoron'], 'It explains one thing by comparing it to another: an analogy.', '🔑'],
    ['The silence in the room was deafening.', 'an oxymoron', ['an analogy', 'a pun', 'alliteration'], 'Silence cannot really be deafening; joining opposites is an oxymoron.', '🔇'],
    ['The waves whispered secrets to the sleeping shore.', 'personification', ['situational irony', 'a pun', 'an analogy'], 'Waves cannot whisper; giving them human actions is personification.', '🌊'],
  ];
  function figQ() {
    const [s, a, ws, why, icon] = U.pick(FIG8);
    return solo('Which figure of speech does the sentence use?', a, ws.map((x) => [x, 'Think about what the words are doing, not just what they say.']), why, { base: 220, goal: G, std: 'L.VI.8.4', tag: 'device', sentence: s, fig: pic(icon), hint: 'Is it saying the opposite? Joining opposites? Comparing? Playing on a double meaning?' });
  }
  const ANALOGY = [
    ['thermometer : temperature :: scale :', 'weight', ['height', 'color', 'speed'], 'A thermometer measures temperature; a scale measures weight.', '⚖️'],
    ['author : novel :: composer :', 'symphony', ['orchestra', 'painting', 'stage'], 'An author creates a novel; a composer creates a symphony.', '🎼'],
    ['drought : rain :: famine :', 'food', ['heat', 'water', 'crops'], 'A drought is a lack of rain; a famine is a lack of food.', '🌾'],
    ['timid : bold :: generous :', 'selfish', ['kind', 'wealthy', 'giving'], 'Timid and bold are opposites; generous and selfish are opposites.', '🔄'],
    ['chapter : book :: verse :', 'poem', ['song', 'author', 'line'], 'A chapter is part of a book; a verse is part of a poem.', '📖'],
  ];
  function analogyQ() {
    const [s, a, ws, why, icon] = U.pick(ANALOGY);
    return solo('Which word BEST completes the analogy?', a, ws.map((x) => [x, 'Find the relationship between the first pair, then match it.']), why, { base: 222, goal: G, std: 'L.VI.9–10.4', tag: 'vocab', sentence: s, fig: pic(icon), hint: 'Say the first relationship as a sentence, then use it on the second pair.' });
  }

  READ_SKILLS.push(
    { goal: G, id: 'words8', name: 'Word meaning', icon: '🔤', levels: [
      genLevel('Context clues', 'L.VL.8.3', 'Use the sentence to find the meaning.', [bank(CTX, 194, 'L.VL.8.3', (w) => `What does "${w}" mean in the sentence?`)], allOf([bank(CTX, 194, 'L.VL.8.3', (w) => `What does "${w}" mean in the sentence?`)])),
      genLevel('Greek and Latin roots', 'L.VL.8.3', 'Big words from ancient parts.', [rootQ], allOf([rootQ])),
      genLevel('Technical and subject meanings', 'L.VL.9–10.3', 'Words in science, history, and literature.', [bank(TECH, 224, 'L.VL.9–10.3', (w) => `What does "${w}" mean in this context?`)], allOf([bank(TECH, 224, 'L.VL.9–10.3', (w) => `What does "${w}" mean in this context?`)])),
    ] },
    { goal: G, id: 'tone8', name: 'Tone & figures of speech', icon: '🎨', levels: [
      genLevel('Connotation and tone', 'L.VI.8.4', 'Words carry feelings.', [connotation, toneQ], allOf([connotation, toneQ])),
      genLevel('Irony, puns, and oxymorons', 'L.VI.8.4', 'Figures of speech.', [figQ], allOf([figQ])),
      genLevel('Analogies and word relationships', 'L.VI.9–10.4', 'How words relate.', [analogyQ, figQ], allOf([analogyQ, figQ])),
    ] },
  );
})();
