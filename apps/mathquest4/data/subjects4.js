// Math Quest 4: the subjects, grouped by topic the way a Grade 4 class meets them (not by MAP goal area).
// MAP Math 4's skills (M4_SKILLS) are used as they are; the skills new in this app (MQ4_NEW) go next to the
// skill they build on.
(function () {
  const TOPICS = [
    { id: 'place', name: 'Place Value', icon: '🔢', color: 'c1', blurb: 'Big numbers, rounding, adding and subtracting.', skills: ['pv', 'round', 'addsub'] },
    { id: 'muldiv', name: 'Multiply & Divide', icon: '✖️', color: 'c2', blurb: 'Facts, multiplying, and dividing, step by step.', skills: ['mult', 'div'] },
    { id: 'algebra', name: 'Problem Solving', icon: '🧩', color: 'c3', blurb: 'Times as many, multi-step problems, factors, and patterns.', skills: ['times', 'steps', 'factors', 'pattern'] },
    { id: 'fractions', name: 'Fractions & Decimals', icon: '🍕', color: 'c4', blurb: 'Equivalent fractions, number lines, and decimals.', skills: ['frac', 'fop', 'dec'] },
    { id: 'measure', name: 'Measurement & Data', icon: '📏', color: 'c5', blurb: 'Units, money, time, area, and line plots.', skills: ['meas', 'area', 'data'] },
    { id: 'geometry', name: 'Geometry', icon: '📐', color: 'c6', blurb: 'Angles, lines, shapes, and symmetry.', skills: ['angle', 'lines'] },
  ];
  const byId = Object.fromEntries(M4_SKILLS.map((k) => [k.id, k]));
  TOPICS.forEach((t) => {
    const ids = [...t.skills];
    MQ4_NEW.filter((k) => k.subject === t.id).forEach((k) => {
      const at = k.before ? ids.indexOf(k.before) : k.after ? ids.indexOf(k.after) + 1 : ids.length;
      ids.splice(at < 0 ? ids.length : at, 0, k.id);
      byId[k.id] = k;
    });
    addSubject({ id: t.id, name: t.name, icon: t.icon, color: t.color, blurb: t.blurb, skills: ids.map((id) => byId[id]) });
  });
  const used = new Set(SUBJECTS.flatMap((s) => s.skills.map((k) => k.id)));
  const missing = [...M4_SKILLS, ...MQ4_NEW].filter((k) => !used.has(k.id)).map((k) => k.id);
  if (missing.length) throw new Error(`Math Quest 4: skills not in any subject: ${missing.join(', ')}`);
})();
