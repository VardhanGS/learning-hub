// SAT Prep: the practice subjects (one per test section, skills grouped by content domain) and the test's item pool.
// Every question in this app is new (the SAT app does not reuse questions from the other apps).
const SATBANK = (() => {
  const levels = [];
  [['rw', 'Reading and Writing', '📖', 'c1', 'Craft and Structure · Information and Ideas · Standard English Conventions · Expression of Ideas'],
   ['math', 'Math', '📐', 'c3', 'Algebra · Advanced Math · Problem-Solving and Data Analysis · Geometry and Trigonometry']].forEach(([id, name, icon, color, blurb]) => {
    const order = APP.features.sat.goals.filter((g) => g.section === id).map((g) => g.id);
    const skills = SAT_SKILLS.filter((k) => k.section === id).sort((a, b) => order.indexOf(a.goal) - order.indexOf(b.goal));
    skills.forEach((k) => k.levels.forEach((L, l) => levels.push({ gen: L.gen, where: `${k.id}.${l}`, section: id })));
    addSubject({ id, name, icon, color, blurb, skills });
  });
  return { levels };
})();
