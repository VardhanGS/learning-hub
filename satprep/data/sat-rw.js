// SAT Prep — Reading and Writing skills. Four content domains (College Board): Craft and Structure (cs),
// Information and Ideas (ii), Standard English Conventions (sec), Expression of Ideas (eoi).
// Standards: NJSLS-ELA 2023, grades 11–12. All passages and questions are original.
(function () {
  const { tag, mc4, passage, pic, lv, bAt } = SAT;
  const PS = SAT_PASSAGES;
  const atLv = (list, l) => list.filter((x) => x.lv === l);
  const text = (p) => p.s.join(' ');
  const ORD = ['first', 'second', 'third', 'fourth', 'fifth'];
  const mk = (q, a, w, extra, std, b, goal) => { const o = mc4(q, a, w, extra); return o && tag(o, std, b, goal); };

  // ===================== CRAFT AND STRUCTURE =====================
  // ---- Words in Context: [level, sentence with ______, best word, three wrong words, why] ----
  const WIC = [
    [0, 'After weeks of rain, the farmers were ______ to see the sun, and they hurried out to plant their fields.', 'relieved', ['annoyed', 'puzzled', 'reluctant'], '“Relieved” fits: after weeks of rain, they hurried out happily.'],
    [0, 'The museum’s new exhibit is so ______ that visitors often need two full days to see everything.', 'extensive', ['brief', 'fragile', 'silent'], 'Needing two days to see everything means the exhibit is large: “extensive.”'],
    [0, 'Because the bridge was old and ______, the city closed it until engineers could repair it.', 'unstable', ['decorative', 'popular', 'narrow'], 'A bridge closed for repair is “unstable,” not safe to use.'],
    [0, 'The coach praised the team for its ______ effort, noting that no player gave up even when they were far behind.', 'persistent', ['careless', 'occasional', 'hesitant'], 'Never giving up describes a “persistent” effort.'],
    [0, 'Scientists were ______ by the results, which were the opposite of what every earlier study had found.', 'surprised', ['comforted', 'bored', 'convinced'], 'Results opposite to every earlier study would be surprising.'],
    [0, 'The recipe is very ______: it uses only four ingredients and takes ten minutes to prepare.', 'simple', ['expensive', 'elaborate', 'ancient'], 'Four ingredients and ten minutes describe a “simple” recipe.'],
    [0, 'To ______ water during the drought, the town asked residents not to water their lawns.', 'conserve', ['waste', 'measure', 'purify'], 'Asking people not to water lawns is a way to “conserve” (save) water.'],
    [0, 'The two sisters look so ______ that even their friends sometimes confuse them.', 'similar', ['distant', 'cheerful', 'different'], 'People who are confused for each other look “similar.”'],
    [1, 'Although the novelist’s early books sold poorly, her later work earned ______ praise from critics across the country.', 'widespread', ['reluctant', 'private', 'meager'], '“Although … sold poorly” sets up a contrast: later praise was broad, “widespread.”'],
    [1, 'The engineer’s design was ______: it solved a difficult problem with just a few inexpensive parts.', 'ingenious', ['clumsy', 'conventional', 'fragile'], 'Solving a hard problem simply and cheaply is “ingenious.”'],
    [1, 'Rather than ______ the committee’s decision, the mayor publicly supported it and urged residents to do the same.', 'oppose', ['endorse', 'announce', 'celebrate'], '“Rather than” signals a contrast with “supported”: the opposite is “oppose.”'],
    [1, 'The historian warned that the diary’s account should be treated with caution, since its author was often ______ about dates.', 'imprecise', ['meticulous', 'enthusiastic', 'secretive'], 'Caution about dates suggests the author was “imprecise.”'],
    [1, 'The new policy had an ______ effect: it was meant to reduce traffic but actually made it worse.', 'unintended', ['immediate', 'expected', 'minor'], 'An effect opposite to the goal is “unintended.”'],
    [1, 'Some species of coral can ______ warmer water for short periods, but long heat waves still damage them.', 'tolerate', ['avoid', 'produce', 'prefer'], '“For short periods, but long heat waves still damage them” means they can “tolerate” (survive) it briefly.'],
    [1, 'The speaker’s argument was ______; each point followed logically from the one before it.', 'coherent', ['rambling', 'emotional', 'repetitive'], 'Points that follow logically make an argument “coherent.”'],
    [1, 'The village’s population has remained ______ for decades, rising and falling by only a few people each year.', 'stable', ['volatile', 'enormous', 'mysterious'], 'Changing by only a few people means “stable.”'],
    [2, 'Critics found the film’s ending frustratingly ______: it could be read as either a triumph or a tragedy, and the director refused to say which.', 'ambiguous', ['predictable', 'conclusive', 'melodramatic'], 'An ending open to two readings is “ambiguous.”'],
    [2, 'The researcher’s claims were ______ by later studies, which repeated her experiments and obtained the same results.', 'corroborated', ['undermined', 'anticipated', 'obscured'], 'Repeating experiments with the same results supports, or “corroborates,” the claims.'],
    [2, 'Though often described as ______, the composer kept detailed notebooks showing that each piece took years of careful revision.', 'spontaneous', ['deliberate', 'methodical', 'prolific'], '“Though” contrasts the description with years of careful work: people called him “spontaneous.”'],
    [2, 'The treaty was ______ rather than permanent, setting rules only until a fuller agreement could be negotiated.', 'provisional', ['binding', 'ceremonial', 'unanimous'], 'Rules that last only until a fuller agreement are “provisional” (temporary).'],
    [2, 'Far from being ______, the desert supports hundreds of plant species adapted to its long dry seasons.', 'barren', ['fertile', 'diverse', 'temperate'], '“Far from being” sets up a contrast with hundreds of plants: the desert is not “barren.”'],
    [2, 'The author’s tone toward the inventor is ______: she admires his talent but questions many of his choices.', 'ambivalent', ['adoring', 'indifferent', 'scornful'], 'Mixed admiration and doubt is an “ambivalent” tone.'],
    [2, 'Early reviewers ______ the poet’s plain style as a lack of skill; only later did critics see it as a deliberate choice.', 'dismissed', ['celebrated', 'imitated', 'translated'], 'Treating the style as a lack of skill means reviewers “dismissed” it.'],
    [2, 'The data were too ______ to support firm conclusions: the study included only twelve participants over a single week.', 'limited', ['robust', 'precise', 'surprising'], 'Twelve people over one week is a small, “limited” data set.'],
  ];
  const wicItem = (l) => { const [, s, a, w, why] = U.pick(WIC.filter((x) => x[0] === l)); return mk('Which choice completes the text with the most logical and precise word or phrase?', a, w, { passage: passage(withCtx(s)), fig: pic(['📝']), why, hint: 'Read the whole sentence. Look for clue words like “although,” “rather than,” or a description that explains the blank.' }, 'L.VL.11–12.3', bAt(l), 'cs'); };

  // ---- Text Structure and Purpose: function of one sentence, and the main purpose ----
  function tspItem(l) {
    const p = U.pick(atLv(PS, l)), f = p.fn;
    return mk(`Which choice best describes the function of the ${ORD[f.i]} sentence in the text as a whole?`, f.a, f.w, { passage: passage(text(p)), fig: pic([p.icon]), why: f.a, hint: 'Ask what the sentence DOES for the passage: introduce, give evidence, contrast, conclude…' }, 'RI.TS.11–12.4', bAt(l), 'cs');
  }
  // ---- Cross-Text Connections ----
  function ctcItem(l) {
    const pr = U.pick(atLv(SAT_PAIRS, l)), Q = U.pick([pr.q1, pr.q2]);
    return mk(Q.q, Q.a, Q.w, { passage: passage(`Text 1\n${pr.t1}\n\nText 2\n${pr.t2}`), fig: pic([pr.icon, '↔️']), why: Q.a, hint: 'Find each text’s main claim first. Then ask: does Text 2 agree, disagree, or add a condition?' }, 'RI.MF.11–12.6', bAt(l), 'cs');
  }

  // ===================== INFORMATION AND IDEAS =====================
  function mainItem(l) {
    const p = U.pick(atLv(PS, l)), lit = p.area === 'literature';
    if (U.pick([true, false])) return mk(lit ? 'Which choice best states the main idea of the text?' : 'Which choice best states the main idea of the text?', p.main[0], p.main.slice(1), { passage: passage(text(p)), fig: pic([p.icon]), why: p.main[0], hint: 'The main idea covers the whole passage, not just one detail.' }, lit ? 'RL.CI.11–12.2' : 'RI.CI.11–12.2', bAt(l), 'ii');
    return mk(p.detail.q, p.detail.a, p.detail.w, { passage: passage(text(p)), fig: pic([p.icon]), why: `The text says so directly: ${p.detail.a}.`, hint: 'Find the exact sentence in the text that answers the question.' }, lit ? 'RL.CR.11–12.1' : 'RI.CR.11–12.1', bAt(l, 0.2), 'ii');
  }
  function infItem(l) {
    const p = U.pick(atLv(PS, l));
    return mk('Which choice most logically completes the text?', p.inf.a, p.inf.w, { passage: passage(`${text(p)} ${p.inf.stem}`), fig: pic([p.icon]), why: p.inf.a, hint: 'Pick the choice that follows from the information in the text, not one that just sounds true.' }, 'RI.CR.11–12.1', bAt(l), 'ii');
  }
  function evTextItem(l) {
    const p = U.pick(atLv(PS, l));
    return mk(`Which finding, if true, would most directly support this claim? “${p.ev.claim}”`, p.ev.a, p.ev.w, { passage: passage(text(p)), fig: pic([p.icon, '🔍']), why: p.ev.a, hint: 'The right finding is about exactly what the claim says. True but unrelated facts do not support it.' }, 'RI.CR.11–12.1', bAt(l), 'ii');
  }
  // ---- Command of Evidence, quantitative: a table or bar graph and a claim ----
  const DATA = [
    { icon: '🌱', what: 'average plant height (cm) after six weeks', unit: 'cm', groups: ['no fertilizer', 'fertilizer A', 'fertilizer B', 'fertilizer C'], who: 'a student', topic: 'fertilizer' },
    { icon: '🚌', what: 'average weekday riders (thousands)', unit: 'thousand riders', groups: ['Route 1', 'Route 2', 'Route 3', 'Route 4'], who: 'a transit planner', topic: 'bus route' },
    { icon: '🐦', what: 'birds counted per hour', unit: 'birds', groups: ['meadow', 'forest edge', 'wetland', 'farm field'], who: 'an ecologist', topic: 'habitat' },
    { icon: '📚', what: 'books borrowed per month (hundreds)', unit: 'hundred books', groups: ['2019', '2020', '2021', '2022'], who: 'a librarian', topic: 'year' },
  ];
  function evQuantItem(l) {
    const D = U.pick(DATA), vals = D.groups.map(() => U.int(2, 18)), maxI = vals.indexOf(Math.max(...vals)), minI = vals.indexOf(Math.min(...vals));
    if (vals.filter((v) => v === vals[maxI]).length > 1 || vals.filter((v) => v === vals[minI]).length > 1) return evQuantItem(l);
    const fig = l === 0 ? Fig.table([[D.topic[0].toUpperCase() + D.topic.slice(1), ...D.groups], [D.what.split(' (')[0], ...vals.map(String)]], D.what) : Fig.barGraph(D.what, D.groups.map((g, i) => [g, vals[i]]), 2);
    const other = U.pick([0, 1, 2, 3].filter((i) => i !== maxI)), cmp = vals[maxI] - vals[other];
    const right = `The ${D.what.split(' (')[0]} for ${D.groups[maxI]} was greater than for any other ${D.topic}.`;
    const ws = [`The ${D.what.split(' (')[0]} for ${D.groups[minI]} was greater than for any other ${D.topic}.`, `The ${D.what.split(' (')[0]} was about the same for every ${D.topic}.`, `The ${D.what.split(' (')[0]} for ${D.groups[other]} was greater than for ${D.groups[maxI]}.`];
    const q = `${D.who[0].toUpperCase() + D.who.slice(1)} claims that ${D.groups[maxI]} had the highest ${D.what.split(' (')[0]} of the ${D.groups.length} groups shown. Which choice best describes data from the ${l === 0 ? 'table' : 'graph'} that support this claim?`;
    const o = mc4(q, right, ws, { fig, meta: { kind: 'quantEv', args: [D.groups, vals, D.what.split(' (')[0], D.topic] }, why: `${D.groups[maxI]}: ${vals[maxI]}, the largest value (${cmp} more than ${D.groups[other]}).`, hint: 'Find the largest value in the data, then pick the choice that states it accurately.' });
    return o && tag(o, 'RI.MF.11–12.6', bAt(l, 0.3), 'ii');
  }

  // ===================== STANDARD ENGLISH CONVENTIONS =====================
  // Independent clause pairs [first, second] (each a full sentence without its end mark).
  // A sentence of context put before each Standard English Conventions item (SAT texts are at least 25 words).
  const CTX = [
    'Local newspapers covered the story for weeks, and many readers wrote letters about it.',
    'The details below come from a community newsletter that is mailed to every home in town.',
    'This short account appeared in a school magazine last spring, written by two students.',
    'A brief report, later shared with the town council, described what happened next.',
    'Many residents still talk about the event today, and some keep photographs of it.',
    'The following passage comes from a student’s research notes for a history project.',
    'An article in the regional paper summed up the situation in just a few sentences.',
    'Here is how one reporter described the situation in a story published that week.',
  ];
  // one context sentence, or two when the item itself is short (SAT texts are 25–150 words)
  // The same item always gets the same context (picked from its text), so each passage is stable and recorded once.
  const hash = (t) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const withCtx = (t) => { const h = hash(t), c1 = CTX[h % CTX.length], c2 = CTX[(h + 3) % CTX.length], one = `${c1} ${t}`; return one.split(/\s+/).length >= 27 ? one : `${c1} ${c2} ${t}`; };
  const CLAUSES = [
    ['The storm knocked out power across the county', 'crews worked through the night to restore it'],
    ['Maya practiced the piano for an hour every day', 'her teacher noticed a big improvement'],
    ['The museum reopened after a long renovation', 'thousands of visitors lined up on the first morning'],
    ['The river flooded the lower fields in April', 'the farmers planted their corn two weeks late'],
    ['Astronomers spotted a new comet last winter', 'it will pass closest to the Sun next year'],
    ['The team’s first design was too heavy to fly', 'the engineers replaced the steel frame with aluminum'],
    ['The novel was translated into forty languages', 'its author still answers letters from readers by hand'],
    ['The city planted two thousand trees along its avenues', 'summer temperatures on those streets dropped noticeably'],
    ['Octopuses can change color in a fraction of a second', 'special cells in their skin expand and shrink'],
    ['The bakery sells out of bread by noon', 'customers often arrive before it opens'],
  ];
  const INTRO = [['After the long winter', 'the first warm day brought everyone outside'], ['Unlike most frogs', 'the glass frog has see-through skin on its belly'], ['Before the invention of the printing press', 'books were copied by hand'], ['Despite the heavy rain', 'the parade went on as planned'], ['Within a few hours of hatching', 'baby sea turtles crawl toward the ocean']];
  const APPOS = [['Dr. Lena Ortiz', 'a marine biologist', 'studies how whales communicate'], ['The Ravel Bridge', 'the longest bridge in the region', 'opened in 1987'], ['Halvorsen', 'the town’s oldest bakery', 'still uses its original oven'], ['Kofi Mensah', 'a high school chemistry teacher', 'won the state science award']];
  const LISTS = [['The recipe needs only three ingredients', ['flour', 'water', 'salt']], ['The expedition carried the essentials', ['tents', 'maps', 'two weeks of food']], ['The study measured three things', ['sleep', 'mood', 'test scores']]];
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const lowFirst = (s) => (/^(The|Her|Its|Their|It|They|Some|Many|Every|Most|Each)\b/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
  // Each kind: [passage with ______, right choice, three wrong choices, why]
  function boundItem(l) {
    const kind = l === 0 ? U.pick(['semi', 'intro', 'period']) : l === 1 ? U.pick(['semi', 'appos', 'colon', 'conj']) : U.pick(['appos', 'colon', 'however', 'conj']);
    let s, a, w, why;
    if (kind === 'semi') { const [x, y] = U.pick(CLAUSES); s = `${x}______ ${lowFirst(y)}.`; a = ';'; w = [',', '(no punctuation)', ', which']; why = 'Two complete sentences can be joined with a semicolon. A comma alone would make a comma splice.'; }
    else if (kind === 'period') { const [x, y] = U.pick(CLAUSES); s = `${x}______ ${cap(y)}.`; a = '.'; w = [',', '(no punctuation)', ', and']; why = 'The second part starts a new complete sentence (with a capital letter), so a period ends the first one.'; }
    else if (kind === 'conj') { const [x, y] = U.pick(CLAUSES); s = `${x}______ ${lowFirst(y)}.`; a = ', and'; w = ['and,', ',', '; and,']; why = 'Joining two complete sentences with “and” takes a comma before “and.”'; }
    else if (kind === 'intro') { const [x, y] = U.pick(INTRO); s = `${x}______ ${y}.`; a = ','; w = [';', ':', '.']; why = 'An introductory phrase is followed by a comma. A semicolon, colon, or period would leave a fragment.'; }
    else if (kind === 'appos') { const [n, ap, rest] = U.pick(APPOS); s = `${n}, ${ap}______ ${rest}.`; a = ','; w = [';', '(no punctuation)', ':']; why = `“${ap}” is extra information about ${n}, so it is set off by a comma on both sides.`; }
    else if (kind === 'colon') { const [x, items] = U.pick(LISTS); s = `${x}______ ${items[0]}, ${items[1]}, and ${items[2]}.`; a = ':'; w = [';', ', such as:', '(no punctuation)']; why = 'A colon introduces a list after a complete sentence.'; }
    else { const [x, y] = U.pick(CLAUSES); s = `${x}______ however, ${lowFirst(y)}.`; a = ';'; w = [',', '(no punctuation)', ':']; why = '“However” between two complete sentences needs a semicolon (or a period) before it and a comma after it.'; }
    return mk('Which choice completes the text so that it conforms to the conventions of Standard English?', a, w, { passage: passage(withCtx(s)), fig: pic(['✍️']), meta: { kind: 'boundary', args: [kind, a] }, why, hint: 'Is each part on both sides of the blank a complete sentence? A comma alone cannot join two sentences.' }, 'L.SS.11–12.1', bAt(l), 'sec');
  }
  // Subject–verb agreement and verb form, with a phrase between subject and verb.
  // [subject phrase, right verb, three wrong forms, rest of the sentence, singular subject?]
  const AGREE = [
    ['The collection of rare stamps', 'was', ['were', 'are', 'have been'], 'donated to the town museum in 1990', true],
    ['The members of the city council', 'were', ['was', 'is', 'has been'], 'divided on the new budget', false],
    ['Each of the paintings in the gallery', 'has', ['have', 'are having', 'having'], 'a small card describing its history', true],
    ['The results of the survey', 'suggest', ['suggests', 'is suggesting', 'has suggested'], 'that most residents want more parks', false],
    ['A flock of geese', 'flies', ['fly', 'are flying', 'have flown'], 'over the lake every October', true],
    ['The instructions on the box', 'explain', ['explains', 'is explaining', 'has explained'], 'how to assemble the shelf in ten minutes', false],
    ['Neither of the two candidates', 'has', ['have', 'are', 'were'], 'agreed to a second debate', true],
    ['The sound of the waves', 'helps', ['help', 'are helping', 'have helped'], 'many visitors fall asleep', true],
    ['The bridges across the river', 'need', ['needs', 'is needing', 'has needed'], 'repairs after the spring floods', false],
    ['The list of required books', 'is', ['are', 'were', 'have been'], 'posted on the classroom door', true],
  ];
  const TENSE = [
    ['Last summer, the research team', 'traveled', ['travels', 'will travel', 'is traveling'], 'to the Arctic to measure melting ice', '“Last summer” means the past tense: “traveled.”'],
    ['By the time the guests arrived, the chef', 'had prepared', ['prepares', 'will prepare', 'is preparing'], 'all twelve courses', 'An action finished before another past action takes “had prepared.”'],
    ['Next year, the school', 'will open', ['opened', 'had opened', 'was opening'], 'a new science wing', '“Next year” points to the future: “will open.”'],
    ['Every morning, the baker', 'arrives', ['arrived', 'had arrived', 'will have arrived'], 'at four o’clock to start the bread', '“Every morning” describes a habit in the present: “arrives.”'],
  ];
  function fssItem(l) {
    if (l === 0 || U.pick([true, false])) {
      const [subj, right, w, rest, sing] = U.pick(AGREE), head = subj.replace(/ of .*/, '');
      return mk('Which choice completes the text so that it conforms to the conventions of Standard English?', right, w, { passage: passage(withCtx(`${subj} ______ ${rest}.`)), fig: pic(['🔤']), meta: { kind: 'agree', args: [subj, right, sing] }, why: `The subject is “${head},” which is ${sing ? 'singular' : 'plural'}, so the verb is “${right}.” Skip the phrase in between.`, hint: 'Find the real subject. Skip over the “of …” phrase between the subject and the verb.' }, 'L.SS.11–12.1', bAt(l, sing ? 0.4 : 0.6), 'sec');
    }
    const [lead, a, w, rest, why] = U.pick(TENSE);
    return mk('Which choice completes the text so that it conforms to the conventions of Standard English?', a, w, { passage: passage(withCtx(`${lead} ______ ${rest}.`)), fig: pic(['⏳']), why, hint: 'Look for time words (last, next, every, by the time) that tell you the tense.' }, 'L.SS.11–12.1', bAt(l, 0.5), 'sec');
  }

  // ===================== EXPRESSION OF IDEAS =====================
  // ---- Transitions: [level, sentence 1, sentence 2 (starts after the transition), relation] ----
  const TR = {
    contrast: ['However', 'Nevertheless', 'In contrast', 'Still'],
    result: ['Therefore', 'As a result', 'Consequently', 'Thus'],
    addition: ['Moreover', 'In addition', 'Furthermore', 'Additionally'],
    example: ['For example', 'For instance'],
    sequence: ['Later', 'Then', 'Afterward'],
    similar: ['Similarly', 'Likewise'],
  };
  const TRS = [
    [0, 'The first bridge across the river was made of wood.', 'it washed away in a flood after only six years.', 'sequence'],
    [0, 'Most cacti grow in deserts.', 'some species grow in tropical rainforests, clinging to trees.', 'contrast'],
    [0, 'The team trained hard all summer.', 'they won their first five games of the season.', 'result'],
    [0, 'Many birds use tools.', 'crows bend twigs into hooks to pull insects out of logs.', 'example'],
    [0, 'Bees help pollinate crops.', 'they produce honey that people have eaten for thousands of years.', 'addition'],
    [0, 'The library extended its hours on weekdays.', 'it added Sunday hours for students preparing for exams.', 'addition'],
    [0, 'Some metals, such as iron, rust when exposed to water.', 'gold does not rust at all.', 'contrast'],
    [0, 'The road was covered in ice.', 'the school delayed the start of classes by two hours.', 'result'],
    [1, 'Early telescopes made distant planets look blurry.', 'astronomers could not see the rings around Saturn clearly.', 'result'],
    [1, 'Some languages have no word for “left” or “right.”', 'speakers describe locations using directions such as north and south.', 'example'],
    [1, 'The new medicine eased symptoms in most patients.', 'a small number reported side effects, so doctors kept monitoring them.', 'contrast'],
    [1, 'Wolves were reintroduced to the park in 1995.', 'elk began avoiding open valleys, allowing young trees to grow.', 'result'],
    [1, 'Painters in the movement rejected traditional subjects.', 'composers of the same period abandoned familiar melodies.', 'similar'],
    [1, 'The author’s first novel was rejected by eight publishers.', 'it went on to sell more than a million copies.', 'contrast'],
    [1, 'The solar panels lower the school’s energy bills.', 'they give students real data to analyze in science class.', 'addition'],
    [1, 'Mangrove forests protect coastlines from storms.', 'coral reefs reduce the force of waves before they reach shore.', 'similar'],
    [2, 'Historians long assumed the letters were written by one author.', 'differences in handwriting and spelling now suggest at least three writers.', 'contrast'],
    [2, 'The experiment’s sample was small and drawn from a single school.', 'its results should be applied to other groups with caution.', 'result'],
    [2, 'The city’s population nearly doubled between 1950 and 1970.', 'the number of public schools stayed almost the same, crowding classrooms.', 'contrast'],
    [2, 'Some musicians in the region adopted the new recording technology quickly.', 'others refused, fearing it would replace live performance.', 'contrast'],
    [2, 'Glaciers move too slowly to observe with the eye.', 'scientists compare photos taken years apart to measure their flow.', 'result'],
    [2, 'The treaty reduced tariffs on farm goods.', 'it created a court to settle trade disputes between the nations.', 'addition'],
    [2, 'The poet rarely used rhyme in her early work.', 'her later collections are filled with intricate rhyme schemes.', 'contrast'],
    [2, 'Bats find insects by listening to echoes of their own calls.', 'dolphins locate fish by sending out clicks and reading the returning sound.', 'similar'],
  ];
  function transItem(l) {
    const [, s1, s2, rel] = U.pick(TRS.filter((x) => x[0] === l)), a = U.pick(TR[rel]);
    const others = U.shuffle(Object.keys(TR).filter((r) => r !== rel && !(rel === 'addition' && r === 'similar') && !(rel === 'similar' && r === 'addition') && !(rel === 'result' && r === 'sequence') && !(rel === 'sequence' && r === 'result'))).slice(0, 3).map((r) => U.pick(TR[r]));
    return mk('Which choice completes the text with the most logical transition?', a, others, { passage: passage(withCtx(`${s1} ______, ${s2}`)), fig: pic(['🔗']), meta: { kind: 'transition', args: [rel, a, others] }, why: `The second sentence ${{ contrast: 'contrasts with', result: 'is a result of', addition: 'adds to', example: 'gives an example of', sequence: 'comes later than', similar: 'is similar to' }[rel]} the first, so “${a}” fits.`, hint: 'Decide how the two sentences relate first: contrast, cause and result, addition, example, time order, or similarity.' }, 'L.KL.11–12.2', bAt(l), 'eoi');
  }
  // ---- Rhetorical Synthesis: notes + a goal; the right choice meets the goal using the notes ----
  const NOTES = [
    { icon: '🌋', name: 'Mount Kessel', kind: 'volcano', facts: ['Mount Kessel is a volcano in the Varan Islands.', 'It last erupted in 1911.', 'Its summit is 2,140 meters high.', 'Mount Pira, also in the Varan Islands, last erupted in 1998.', 'Mount Pira’s summit is 1,350 meters high.'],
      goals: [['emphasize a difference in when the two volcanoes last erupted', 'Mount Kessel last erupted in 1911, while Mount Pira erupted much more recently, in 1998.', ['Mount Kessel and Mount Pira are both volcanoes found in the Varan Islands.', 'Mount Kessel’s summit is 2,140 meters high, taller than Mount Pira’s.', 'Mount Pira is a volcano in the Varan Islands whose summit is 1,350 meters high.']],
               ['introduce Mount Kessel to an audience unfamiliar with it', 'Mount Kessel, a 2,140-meter volcano in the Varan Islands, last erupted in 1911.', ['Mount Kessel erupted in 1911, about 87 years before Mount Pira erupted in 1998.', 'Both Mount Kessel and Mount Pira are found in the Varan Islands.', 'Mount Pira’s summit is about 800 meters lower than Mount Kessel’s.']]] },
    { icon: '🎨', name: 'Rosa Vela', kind: 'artist', facts: ['Rosa Vela was a painter born in 1902.', 'She painted large murals of factory workers.', 'Her murals used bright reds and golds.', 'Her friend Tomas Ruiz painted small portraits.', 'Ruiz used mostly grays and blues.'],
      goals: [['contrast the two artists’ use of color', 'Vela filled her murals with bright reds and golds, while Ruiz painted mostly in grays and blues.', ['Vela, born in 1902, painted large murals of factory workers.', 'Vela and Ruiz were close friends who both worked as painters in the same city for many years.', 'Ruiz is known for painting small, quiet portraits rather than large murals.']],
               ['describe the subject of Vela’s murals', 'Vela’s large murals depicted factory workers.', ['Vela was a painter who was born in 1902.', 'Vela’s friend Tomas Ruiz painted small portraits.', 'Ruiz used mostly grays and blues in his work.']]] },
    { icon: '🐢', name: 'leatherback turtle', kind: 'animal', facts: ['The leatherback is the largest living turtle.', 'Adults can weigh up to 900 kilograms.', 'Leatherbacks eat mainly jellyfish.', 'The green sea turtle eats mainly seagrass.', 'Green sea turtles weigh up to about 300 kilograms.'],
      goals: [['compare the diets of the two turtles', 'Leatherbacks eat mainly jellyfish, whereas green sea turtles eat mainly seagrass.', ['The leatherback is the largest of all living turtles, weighing up to 900 kilograms.', 'Adult leatherbacks can weigh up to 900 kilograms.', 'Green sea turtles weigh up to about 300 kilograms, far less than leatherbacks.']],
               ['emphasize the leatherback’s size', 'Weighing up to 900 kilograms, the leatherback is the largest living turtle.', ['Leatherbacks eat mainly jellyfish, while green sea turtles eat mainly seagrass.', 'Green sea turtles, which eat mainly seagrass, weigh up to about 300 kilograms.', 'Leatherbacks and green sea turtles are both sea turtles that eat different foods.']]] },
    { icon: '📡', name: 'the Orin telescope', kind: 'telescope', facts: ['The Orin telescope was completed in 2016.', 'Its main dish is 300 meters wide.', 'It detects radio waves from distant galaxies.', 'The older Bellam telescope has a 76-meter dish.', 'The Bellam telescope was completed in 1957.'],
      goals: [['emphasize how much larger the Orin dish is than the Bellam dish', 'At 300 meters wide, the Orin telescope’s dish is nearly four times as wide as the Bellam telescope’s 76-meter dish.', ['The Orin telescope, which was completed in 2016, detects radio waves coming from distant galaxies.', 'The Bellam telescope was completed in 1957, nearly sixty years before the Orin telescope was finished.', 'Both the Orin telescope and the older Bellam telescope have large main dishes for detecting radio waves.']],
               ['state what the Orin telescope detects', 'The Orin telescope detects radio waves from distant galaxies.', ['The Orin telescope was completed in the year 2016.', 'The Orin telescope’s main dish is 300 meters wide.', 'The older Bellam telescope has a 76-meter main dish.']]] },
    { icon: '🍯', name: 'Lake Orrin', kind: 'lake', facts: ['Lake Orrin is a freshwater lake in the Teller Valley.', 'It is 41 meters deep at its deepest point.', 'Its water stays below 10°C all year.', 'Nearby Lake Sorel is only 6 meters deep.', 'Lake Sorel’s water warms to 24°C in summer.'],
      goals: [['contrast the temperatures of the two lakes', 'Lake Orrin stays below 10°C all year, while Lake Sorel warms to 24°C in summer.', ['Lake Orrin and Lake Sorel are both freshwater lakes in the Teller Valley.', 'Lake Orrin is 41 meters deep, much deeper than nearby Lake Sorel.', 'Lake Sorel is only 6 meters deep and lies close to Lake Orrin.']],
               ['emphasize the depth of Lake Orrin', 'At its deepest point, Lake Orrin reaches 41 meters.', ['Lake Orrin’s water stays below 10°C all year.', 'Lake Orrin is a freshwater lake in the Teller Valley.', 'Lake Sorel’s water warms to 24°C each summer.']]] },
    { icon: '🧪', name: 'the Ferris study', kind: 'study', facts: ['Researcher Ana Ferris studied 200 tomato plants.', 'Half were watered every day; half every three days.', 'Plants watered every three days grew sweeter fruit.', 'Plants watered daily grew larger fruit.', 'The study lasted one growing season.'],
      goals: [['present the study’s aim and method', 'To test how watering affects tomatoes, Ferris watered half of 200 plants daily and half every three days.', ['Ferris found that plants watered every three days grew sweeter fruit than the plants watered daily.', 'Ferris’s study of tomato plants lasted for one full growing season in her garden.', 'Plants watered every day in Ferris’s study grew larger fruit than the other plants.']],
               ['present the study’s two main findings', 'Daily watering produced larger tomatoes, while watering every three days produced sweeter ones.', ['Ferris studied 200 tomato plants, watering half of them every single day and half less often.', 'The study, which lasted one growing season, was carried out by Ana Ferris.', 'Half of Ferris’s 200 plants were watered once every three days.']]] },
    { icon: '🚂', name: 'the Corva Railway', kind: 'railway', facts: ['The Corva Railway opened in 1869.', 'It connected the mining town of Elm Hollow to the port of Vesta.', 'Before it opened, the trip took four days by wagon.', 'By train, the trip took six hours.', 'The railway closed in 1955.'],
      goals: [['emphasize how much the railway shortened the trip', 'The Corva Railway cut the trip from Elm Hollow to Vesta from four days by wagon to six hours.', ['The Corva Railway opened in 1869 and closed in 1955, after nearly ninety years.', 'The Corva Railway connected the mining town of Elm Hollow to the port of Vesta.', 'Before the Corva Railway opened, travelers between the towns went by wagon.']],
               ['state when the railway operated', 'The Corva Railway ran from 1869 until 1955.', ['The trip by train took about six hours.', 'The railway linked Elm Hollow and Vesta.', 'The trip by wagon took about four days.']]] },
    { icon: '🎼', name: 'Mira Holt', kind: 'composer', facts: ['Mira Holt was a composer born in 1931.', 'She wrote music for silent films.', 'She often used only a piano and a cello.', 'Her friend Leo Vance wrote music for large orchestras.', 'Vance’s pieces often used over eighty players.'],
      goals: [['contrast the sizes of the groups the two composers wrote for', 'Holt often wrote for just a piano and a cello, while Vance’s pieces often used over eighty players.', ['Holt, a composer born in 1931, wrote music to accompany silent films.', 'Holt and Vance were friends who both composed music during the same years in the same city.', 'Vance was known for writing music for large orchestras rather than films.']],
               ['describe what Holt wrote music for', 'Holt wrote music for silent films.', ['Holt was born in the year 1931.', 'Holt was a friend of Leo Vance.', 'Vance wrote for large orchestras.']]] },
    { icon: '🏛️', name: 'the Halden Library', kind: 'building', facts: ['The Halden Library opened in 1932.', 'Architect Clara Moss designed it.', 'It has a glass dome over the reading room.', 'Moss also designed the Petra train station.', 'The train station opened in 1940.'],
      goals: [['present Clara Moss as the architect of two buildings', 'Architect Clara Moss designed both the Halden Library, which opened in 1932, and the Petra train station.', ['The Halden Library, which opened in 1932, has a glass dome over its main reading room and long oak tables.', 'The Petra train station, also designed by an architect, opened to travelers in 1940.', 'The Halden Library opened in 1932, eight years before the Petra train station opened.']],
               ['describe a feature of the Halden Library', 'The Halden Library’s reading room sits beneath a glass dome.', ['The Halden Library was designed by architect Clara Moss.', 'Clara Moss also designed the Petra train station.', 'The Petra train station opened in the year 1940.']]] },
  ];
  function rsynItem(l) {
    const N0 = U.pick(NOTES), [goal, a, w] = U.pick(N0.goals);
    return mk(`While researching a topic, a student has taken the following notes.\nThe student wants to ${goal}. Which choice most effectively uses relevant information from the notes to accomplish this goal?`, a, w, { passage: passage(N0.facts.map((f) => `• ${f}`).join('\n')), fig: pic([N0.icon, '📝']), why: `Only this choice does exactly what the goal asks: ${goal}.`, hint: 'Ignore whether a choice is true — all of them come from the notes. Pick the one that matches the GOAL.' }, 'W.WR.11–12.5', bAt(l, 0.5), 'eoi');
  }

  SAT_SKILLS.push(
    { goal: 'cs', section: 'rw', id: 'wic', name: 'Words in Context', icon: '🔤', levels: [0, 1, 2].map((l) => lv(['Everyday words', 'Precise words', 'Advanced words'][l], 'L.VL.11–12.3', 'Pick the most logical, precise word.', [() => wicItem(l)])) },
    { goal: 'cs', section: 'rw', id: 'tsp', name: 'Text Structure and Purpose', icon: '🏗️', levels: [0, 1, 2].map((l) => lv(['What a sentence does', 'Structure of a text', 'Purpose in complex texts'][l], 'RI.TS.11–12.4', 'How a sentence or text is built, and why.', [() => tspItem(l)])) },
    { goal: 'cs', section: 'rw', id: 'ctc', name: 'Cross-Text Connections', icon: '↔️', levels: [0, 1, 2].map((l) => lv(['Two short texts', 'Agree, disagree, or add', 'Weighing two arguments'][l], 'RI.MF.11–12.6', 'How two texts relate.', [() => ctcItem(l)])) },
    { goal: 'ii', section: 'rw', id: 'cid', name: 'Central Ideas and Details', icon: '🎯', levels: [0, 1, 2].map((l) => lv(['Main idea and details', 'Main idea in longer texts', 'Main idea in complex texts'][l], l ? 'RI.CI.11–12.2' : 'RI.CI.11–12.2 · RL.CI.11–12.2', 'What the text is mostly about.', [() => mainItem(l)])) },
    { goal: 'ii', section: 'rw', id: 'coe', name: 'Command of Evidence', icon: '🔍', levels: [0, 1, 2].map((l) => lv(['Evidence and tables', 'Evidence and graphs', 'Strongest evidence'][l], 'RI.CR.11–12.1 · RI.MF.11–12.6', 'Which evidence supports a claim.', [() => evTextItem(l), () => evQuantItem(l)])) },
    { goal: 'ii', section: 'rw', id: 'inf', name: 'Inferences', icon: '💭', levels: [0, 1, 2].map((l) => lv(['Logical endings', 'Drawing conclusions', 'Subtle inferences'][l], 'RI.CR.11–12.1', 'What most logically completes the text.', [() => infItem(l)])) },
    { goal: 'sec', section: 'rw', id: 'bound', name: 'Boundaries', icon: '✍️', levels: [0, 1, 2].map((l) => lv(['Sentences and commas', 'Semicolons, colons, and extra information', 'Tricky boundaries'][l], 'L.SS.11–12.1', 'Punctuation between and inside sentences.', [() => boundItem(l)])) },
    { goal: 'sec', section: 'rw', id: 'fss', name: 'Form, Structure, and Sense', icon: '🔧', levels: [0, 1, 2].map((l) => lv(['Subject–verb agreement', 'Verb tense and agreement', 'Agreement with tricky subjects'][l], 'L.SS.11–12.1', 'Verbs that match their subjects and time.', [() => fssItem(l)])) },
    { goal: 'eoi', section: 'rw', id: 'trans', name: 'Transitions', icon: '🔗', levels: [0, 1, 2].map((l) => lv(['Clear connections', 'Logical connections', 'Subtle connections'][l], 'L.KL.11–12.2', 'Words that connect ideas logically.', [() => transItem(l)])) },
    { goal: 'eoi', section: 'rw', id: 'rsyn', name: 'Rhetorical Synthesis', icon: '🗒️', levels: [0, 1, 2].map((l) => lv(['Use the notes', 'Match the goal', 'Precise goals'][l], 'W.WR.11–12.5', 'Use notes to meet a writing goal.', [() => rsynItem(l)])) },
  );
})();
