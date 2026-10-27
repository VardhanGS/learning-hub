// SAT Prep — more Reading and Writing question forms, from the patterns of the College Board practice tests (studied
// 2026-10-26; nothing copied): "As used in the text, what does the word … most nearly mean?" (the word underlined),
// "Which choice best describes the overall structure of the text?", "Which quotation from the poem most effectively
// illustrates the claim?", and "Which choice most effectively uses data from the graph to complete the statement?"
// with two data series. All passages, poems, people, and studies are original and invented.
const SAT_RW_EXTRA = (() => {
  const { tag, mc4, passage, pic, bAt } = SAT;
  const mk = (q, a, w, extra, std, b, goal) => { const o = mc4(q, a, w, extra); return o && tag(o, std, b, goal); };

  // ---- Words in Context, "most nearly mean": [level, text with ⟦word⟧, word, right meaning, wrong meanings, why] ----
  const NEAR = [
    [0, 'The new library was designed to be bright and welcoming. Large windows line every wall, and on most afternoons the reading room is ⟦flooded⟧ with sunlight, so few readers ever need to switch on a lamp.', 'flooded', 'filled', ['soaked', 'damaged', 'surrounded'], 'Sunlight “floods” the room in the sense of filling it completely; nothing is wet or damaged.'],
    [0, 'Before the bridge opened, the town council held a series of meetings so that residents could ⟦voice⟧ their concerns about traffic and noise. Dozens of people spoke at each meeting.', 'voice', 'express', ['sing', 'whisper', 'record'], 'To “voice” concerns is to express them; the residents spoke at the meetings.'],
    [0, 'The Hallam Museum recently opened a gallery of musical instruments made by local craftspeople. Its collection of folk instruments ⟦spans⟧ three centuries, from hand-carved flutes of the 1700s to electric guitars built in the 1990s.', 'spans', 'covers', ['crosses over', 'measures', 'connects'], 'The collection “spans” three centuries: it covers that whole range of time.'],
    [0, 'Engineer Hana Ito wanted her water filter to be cheap enough for any family to buy. She chose simple materials, such as sand and charcoal, and kept the design as ⟦plain⟧ as possible.', 'plain', 'simple', ['ugly', 'obvious', 'flat'], 'A design kept “plain” is simple, matching the simple materials and low cost.'],
    [1, 'Critics agreed that the pianist’s performance was technically flawless. Some, however, found it ⟦cold⟧: every note was correct, but the music seemed to carry little feeling.', 'cold', 'unemotional', ['chilly', 'unfriendly', 'stale'], 'The colon explains “cold”: correct notes with little feeling, so it means unemotional.'],
    [1, 'For decades, historians treated the farmer’s diary as a minor document. Recent studies, however, have ⟦raised⟧ its standing among scholars, who now see it as one of the best records of daily life in the colony.', 'raised', 'improved', ['lifted', 'collected', 'built'], 'The diary went from “minor” to among the best records: its standing was improved.'],
    [1, 'The biologist’s first experiment produced puzzling results. Rather than abandon the idea, she decided to ⟦pursue⟧ it further, designing three new tests to check whether the effect was real.', 'pursue', 'continue to investigate', ['chase after', 'follow behind', 'argue for'], 'Designing new tests means she continued to investigate the idea.'],
    [1, 'Many early photographs were blurry because exposures took several seconds. Photographer Ines Moll found a way to ⟦arrest⟧ motion with a fast shutter, capturing birds in mid-flight for the first time.', 'arrest', 'stop', ['capture by law', 'attract', 'slow down'], 'A fast shutter “arrests” motion in the sense of stopping it in the picture.'],
    [2, 'The composer’s late works are spare and quiet. Yet listeners who expect simplicity are often surprised, for beneath that calm surface the harmonies are ⟦dense⟧, with several melodies moving against one another at once.', 'dense', 'complex', ['heavy', 'stupid', 'crowded'], 'Several melodies moving at once under a calm surface: the harmonies are complex.'],
    [2, 'Economists once regarded the town’s weekly market as a ⟦marginal⟧ part of the regional economy. Records of prices and tolls now suggest that the market set prices for goods sold in cities hundreds of miles away.', 'marginal', 'minor', ['written in the margins', 'barely profitable', 'located at the edge'], 'The contrast with setting prices far away shows that “marginal” here means minor or unimportant.'],
    [2, 'In her novel, the narrator ⟦entertains⟧ the idea of leaving the village for weeks before she finally tells her family. Each chapter shows her weighing what she would gain and what she would lose.', 'entertains', 'considers', ['amuses', 'hosts', 'performs'], 'Weighing gains and losses for weeks means she considers the idea.'],
    [2, 'Although the treaty’s language was ⟦measured⟧, its effects were dramatic: within a decade, trade between the two nations had tripled and a shared court settled their disputes.', 'measured', 'restrained', ['calculated', 'sized', 'regular'], '“Although … measured, its effects were dramatic” sets calm, restrained wording against dramatic results.'],
  ];
  function nearItem(l) {
    const [, t, w, a, ws, why] = U.pick(NEAR.filter((x) => x[0] === l));
    return mk(`As used in the text, what does the word “${w}” most nearly mean?`, a, ws, { passage: passage(t), fig: pic(['📝']), why, hint: 'Several choices are real meanings of the word. Pick the one that fits THIS sentence.' }, 'L.VL.11–12.3', bAt(l, 0.6), 'cs');
  }

  // ---- Overall structure: [level, text, right description, wrong descriptions] ----
  const STRUCT = [
    [0, 'In 1910, the city of Harlow had no public parks. As factories expanded, residents complained that children had nowhere to play. In response, the city bought an empty rail yard and turned it into a park with a pond and playing fields. Today it is the city’s most visited public space.', 'It describes a problem in a city and then explains how the city solved it.', ['It compares two cities and then explains why one grew faster.', 'It presents a claim about parks and then gives evidence against it.', 'It describes a park and then explains why it was later closed.']],
    [0, 'Octopuses can change the color of their skin in less than a second. Special cells called chromatophores, each filled with pigment, stretch open or squeeze shut when tiny muscles around them move. Signals from the brain control these muscles, letting an octopus match a rock or a patch of sand almost instantly.', 'It states an ability of octopuses and then explains how that ability works.', ['It describes an experiment and then reports its unexpected results.', 'It presents two views about octopuses and then supports one of them.', 'It lists several animals and then compares their skin.']],
    [1, 'Many historians have described the farm towns of the 1800s as isolated places. Recently, however, historian Rosa Aguilar studied thousands of letters mailed from one such town and found that residents wrote regularly to relatives in distant cities. Aguilar concludes that the towns were far more connected than earlier accounts suggested.', 'It presents a common view, describes research that challenges it, and gives the researcher’s conclusion.', ['It describes a town, explains how it was founded, and predicts its future.', 'It summarizes a set of letters and then explains why they were written.', 'It presents a researcher’s conclusion and then lists objections to it.']],
    [1, 'Engineers testing a new kind of road surface laid it on a busy street for one winter. The surface absorbed heat during the day and released it at night, keeping ice from forming. The engineers now hope to test whether the surface lasts as long as ordinary asphalt.', 'It reports a test and its result and then identifies a question for further study.', ['It explains why ice forms on roads and then describes a method to remove it.', 'It describes a problem with asphalt and then rejects one possible solution.', 'It compares two road surfaces and then recommends the cheaper one.']],
    [1, 'The poet Adaeze Obi rarely revised her poems after they were published. Her late collection is an exception. Comparing the first and second editions, scholars found that she rewrote almost every poem, often cutting them in half. Some critics argue that these revisions are her finest work.', 'It states a general pattern, presents an exception, and describes how some critics view that exception.', ['It describes a poet’s early life and then explains why she stopped writing.', 'It compares two poets and then argues that one was more important.', 'It summarizes a collection and then explains why it was never published.']],
    [2, 'Ecologists have long assumed that wolves affect plant life mainly by reducing the number of deer that graze. A study in one valley complicates that view. Where wolves returned, deer did not decline much in number, but they began avoiding open meadows, and young trees there grew taller. The study suggests that fear of predators can matter as much as the predators’ direct effect on deer numbers.', 'It presents an assumption, describes findings that complicate it, and offers a refined explanation.', ['It describes an ecosystem, explains its decline, and proposes a way to restore it.', 'It presents two competing studies and then explains why both are flawed.', 'It reports a finding and then explains why it confirms the assumption completely.']],
    [2, 'Most accounts of the invention of the telephone focus on a single famous inventor. Yet patent records show that at least four people were working on similar devices at the same time, several of them filing papers within weeks of one another. Historian Jun Park argues that the telephone is better understood as the product of a shared moment than of one person’s genius.', 'It notes a common way of telling a story, offers evidence that complicates it, and presents a historian’s alternative view.', ['It explains how the telephone works and then traces its later improvements.', 'It describes a legal dispute and then reports how a court resolved it.', 'It praises one inventor and then lists the awards he received.']],
    [2, 'For centuries, the island’s stone towers puzzled visitors, who assumed they were built for defense. Archaeologist Lina Moreau noticed that every tower faces the sunrise on the longest day of the year. She also found pottery used in festivals buried beneath their floors. Moreau proposes that the towers served as gathering places for seasonal ceremonies.', 'It describes a long-held interpretation, presents new observations, and offers an alternative interpretation based on them.', ['It describes the towers and then explains how they were built.', 'It compares the towers with forts on other islands and finds them similar.', 'It presents a theory about the towers and then disproves it with new pottery dates.']],
  ];
  function structItem(l) {
    const [, t, a, w] = U.pick(STRUCT.filter((x) => x[0] === l));
    return mk('Which choice best describes the overall structure of the text?', a, w, { passage: passage(t), fig: pic(['🏗️']), why: a, hint: 'Name what each sentence does in order (claim, evidence, problem, solution, conclusion …), then find the choice that matches that order.' }, 'RI.TS.11–12.4', bAt(l, 0.5), 'cs');
  }

  // ---- Command of Evidence: quotation from a poem that illustrates a claim (original poems) ----
  const POEMS = [
    { lv: 1, title: 'Lighthouse Keeper', lines: ['All night I tend the turning light', 'above the cold and restless bay;', 'the ships go by like passing thoughts', 'and none of them will know my name.', 'Still, I am glad to climb these stairs,', 'unthanked, to keep the lantern lit:', 'enough that every sailor finds', 'the harbor mouth because of it.'],
      claim: 'the speaker takes satisfaction in work for which no one gives thanks', a: 4, w: [0, 2, 6],
      note: 'Only this quotation shows both parts of the claim: the speaker is “glad” and the work is “unthanked.”' },
    { lv: 1, title: 'Grandmother’s Garden', lines: ['She planted beans in crooked rows', 'and talked to every stubborn root;', 'she never measured, never read', 'the seed packets for their advice.', 'Her hands could tell when soil was ready', 'the way some ears can tell a tune,', 'and every summer, without fail,', 'the crooked rows came back to bloom.'],
      claim: 'the grandmother could sense, without being told, when the soil was ready for planting', a: 4, w: [0, 2, 6],
      note: 'Her hands “could tell when soil was ready,” the way an ear senses a tune: that is sensing without being told.' },
    { lv: 2, title: 'Departure Gate', lines: ['We talked of weather and of trains,', 'of what to pack and what to leave;', 'we did not talk of how the house', 'would sound without your step at night.', 'The clock above the gate kept time', 'in large, indifferent numbers; then', 'you turned toward the gate and found', 'your ticket in your second pocket.'],
      claim: 'the speaker deliberately avoids putting a strong emotion into words', a: 2, w: [0, 4, 6],
      note: 'The speaker names what they “did not talk of”: the emptiness of the house, the feeling left unsaid.' },
    { lv: 2, title: 'The Old Map', lines: ['The map is folded into eighths', 'and softened at its creases now;', 'it shows a river, bright and blue,', 'that bends past fields we never knew.', 'We trace the line with careful hands', 'and talk of who might live there now;', 'the paper keeps a promise that', 'the land itself has long forgot.'],
      claim: 'the map is more faithful to the past than the land itself is', a: 6, w: [0, 2, 4],
      note: 'The paper “keeps a promise” that the land “has long forgot”: the map is more faithful than the land.' },
  ];
  function quoteItem(l) {
    const P0 = U.pick(POEMS.filter((p) => p.lv === l || (l === 0 && p.lv === 1))), line2 = (i) => `“${P0.lines[i]} / ${P0.lines[i + 1]}”`;
    const text = `“${P0.title}” is a poem written by a student for a school poetry anthology. In the poem, the speaker suggests that ${P0.claim}.`;
    return mk('Which quotation from the poem most effectively illustrates the claim?', line2(P0.a), P0.w.filter((i) => i + 1 < P0.lines.length).map(line2), { passage: passage(`${text}\n\n${P0.lines.join('\n')}`), fig: pic(['📜']), why: P0.note, hint: 'Find the claim first. Then test each quotation: does it show exactly that idea, not just mention the topic?' }, 'RL.CR.11–12.1', bAt(Math.max(1, l), 0.6), 'ii');
  }

  // ---- Command of Evidence: complete a statement using data from a graph with two series ----
  const SERIES = [
    { what: 'Percent of residents who biked to work', a: 'City A', b: 'City B', years: [2005, 2010, 2015, 2020], unit: '%', who: 'A transportation researcher' },
    { what: 'Number of nesting pairs of two seabird species', a: 'puffins', b: 'terns', years: [2000, 2005, 2010, 2015], unit: ' pairs', who: 'An ecologist' },
  ];
  function seriesItem(l) {
    const S = U.pick(SERIES), up = U.pick([true, false]);
    // series A rises steadily; series B falls, or stays about the same; they cross once (or never, at random)
    const A = [U.int(8, 14), 0, 0, 0], B = [U.int(20, 30), 0, 0, 0];
    for (let i = 1; i < 4; i++) { A[i] = A[i - 1] + U.int(4, 8); B[i] = up ? B[i - 1] + U.int(-1, 1) : B[i - 1] - U.int(2, 5); }
    const y = S.years, crossIdx = A.findIndex((v, i) => v > B[i]);
    const facts = {
      rise: `the value for ${S.a} increased from each year shown to the next, from ${A[0]}${S.unit} in ${y[0]} to ${A[3]}${S.unit} in ${y[3]}`,
      cross: crossIdx > 0 ? `${S.a} first had a higher value than ${S.b} in ${y[crossIdx]}` : null,
    };
    const fact = facts.cross && U.pick([true, false]) ? 'cross' : 'rise';
    const right = facts[fact];
    const incB = B.every((v, i) => !i || v > B[i - 1]), aAlwaysHigher = A.every((v, i) => v > B[i]), bAlwaysHigher = B.every((v, i) => v > A[i]);
    const cand = [
      [`the value for ${S.a} decreased from ${A[3]}${S.unit} in ${y[0]} to ${A[0]}${S.unit} in ${y[3]}`, false],
      [`the value for ${S.b} was higher than the value for ${S.a} in every year shown`, bAlwaysHigher],
      [`${S.a} had a higher value than ${S.b} in every year shown`, aAlwaysHigher],
      [`the value for ${S.b} increased from each year shown to the next`, incB],
      [`${S.b} first had a higher value than ${S.a} in ${y[3]}`, false],
    ].filter(([t, truth]) => !truth && t !== right);
    const wrongs = U.sample(cand.map((c) => c[0]), 3);
    if (wrongs.length < 3) return seriesItem(l);
    const fig = Fig.table([['Year', ...y.map(String)], [S.a, ...A.map((v) => `${v}${S.unit.trim()}`)], [S.b, ...B.map((v) => `${v}${S.unit.trim()}`)]], S.what);
    const text = `${S.who} gathered data on the ${S.what.toLowerCase()} from ${y[0]} to ${y[3]}, as shown in the table. Comparing the two series, the researcher concluded that ______`;
    return mk('Which choice most effectively uses data from the table to complete the statement?', `${right}.`, wrongs.map((w) => `${w}.`), { passage: passage(text, fig), fig: pic(['📊']), why: `The table shows that ${right}.`, hint: 'Check each choice against both rows of the table, year by year.' }, 'RI.MF.11–12.6', bAt(2, 0.5), 'ii');
  }

  return { wic: [[nearItem], [nearItem], [nearItem]], tsp: [[structItem], [structItem], [structItem]], coe: [[], [quoteItem], [quoteItem, seriesItem]] };
})();
