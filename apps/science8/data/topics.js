// Science Quest 8: one subject per topic (t1.js … t8.js push into SCI_TOPICS), each ending with a Topic review
// skill (the "Topic Close") that mixes questions from every lesson in the topic at the same level.
(function () {
  const COLORS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  SCI_TOPICS.forEach((t, i) => {
    const rid = `${t.id}review`;
    const review = { id: rid, name: 'Topic review', icon: '🏁', levels: [0, 1, 2].map((l) => {
      const all = t.skills.flatMap((k) => k.levels[l].items.map((line) => [line, k.levels[l]]));
      LESSONS[`${rid}.${l}`] = { rule: `A mix of every lesson in ${t.name}. Read each question carefully and use what you learned in the lessons.`, ex: t.skills.map((k) => k.name).join(' · '), video: t.launch, fig: () => Fig.picture([t.icon]) };
      return { title: ['Review the key ideas', 'Apply across the topic', 'Topic challenge'][l], std: [...new Set(t.skills.map((k) => k.levels[l].std))].join(' · '), desc: 'Questions from every lesson.', gen: () => U.mix(8, t.skills.map((k) => () => k.levels[l].gen()[0])) };
    }) };
    addSubject({ id: t.id, name: `${i + 1}. ${t.name}`, icon: t.icon, color: COLORS[i % 6], blurb: t.skills.map((k) => k.name).join(' · '), skills: [...t.skills, review] });
  });
})();
