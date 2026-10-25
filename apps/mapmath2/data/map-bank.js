// MAP Math 2: the practice skills and the test's question pool.
// At least 60% is new: the 9 MAP-style skills in map-items.js (27 levels) plus 5 skills reused from Math Quest 2
// (15 levels) = 64% new levels, and the adaptive test draws at least 60% of its questions from the new skills.
const MAPBANK = (() => {
  const original = SUBJECTS.splice(0);
  const mq2 = Object.fromEntries(original.flatMap((s) => s.skills.map((k) => [k.id, k])));
  const REUSED = { number: ['big'], algebra: ['facts', 'groups'], geometry: ['length', 'lineplot'] };
  const levels = [];
  APP.features.map.goals.forEach((g) => {
    const fresh = MAP_NEW.filter((k) => k.goal === g.id).map((k) => ({ ...k, fresh: true }));
    const reused = REUSED[g.id].map((id) => ({ ...mq2[id], fresh: false }));
    const skills = [...fresh, ...reused];
    skills.forEach((k) => k.levels.forEach((L, l) => levels.push({ gen: L.gen, where: `${k.id}.${l}`, fresh: k.fresh })));
    addSubject({ id: g.id, name: g.name, icon: g.icon, color: g.color, blurb: g.sub, skills });
  });
  const freshShare = levels.filter((L) => L.fresh).length / levels.length;
  return { levels, freshShare, MIN_FRESH: 0.6 };
})();
