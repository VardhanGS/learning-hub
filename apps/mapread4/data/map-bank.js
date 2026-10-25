// MAP Reading 4: the practice subjects (the three MAP goal areas) and the adaptive test's question pool.
// Every skill is new to this app, so the share of new questions is 100%.
const MAPBANK = (() => {
  const levels = [];
  APP.features.map.goals.forEach((g) => {
    const skills = READ_SKILLS.filter((k) => k.goal === g.id).map((k) => ({ ...k, fresh: true }));
    skills.forEach((k) => k.levels.forEach((L, l) => levels.push({ gen: L.gen, all: L.all, where: `${k.id}.${l}`, fresh: true })));
    addSubject({ id: g.id, name: g.name, icon: g.icon, color: g.color, blurb: g.sub, skills });
  });
  return { levels, freshShare: 1, MIN_FRESH: 0.6 };
})();
