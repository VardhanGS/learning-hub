// MAP Algebra 1: the practice subjects (one per goal area of NWEA's Algebra 1 course test) and the test's question pool.
// At least 60% is new: the 10 MAP-style skills in map-items.js (30 levels) plus 6 skills reused from Algebra 1 Quest
// (18 levels) = 62.5% new levels, and the adaptive test draws at least 60% of its questions from the new skills.
const MAPBANK = (() => {
  const a1 = Object.fromEntries(A1_SKILLS.map((k) => [k.id, k]));
  const REUSED = { real: ['exponents'], eei: ['lineq', 'systems', 'factor'], func: ['linear', 'quadfn'] };
  const levels = [];
  APP.features.map.goals.forEach((g) => {
    const fresh = MAP_NEW.filter((k) => k.goal === g.id).map((k) => ({ ...k, fresh: true }));
    const reused = REUSED[g.id].map((id) => ({ ...a1[id], fresh: false }));
    const skills = [...fresh, ...reused];
    skills.forEach((k) => k.levels.forEach((L, l) => levels.push({ gen: L.gen, where: `${k.id}.${l}`, fresh: k.fresh })));
    addSubject({ id: g.id, name: g.name, icon: g.icon, color: g.color, blurb: g.sub, skills });
  });
  const freshShare = levels.filter((L) => L.fresh).length / levels.length;
  return { levels, freshShare, MIN_FRESH: 0.6 };
})();
