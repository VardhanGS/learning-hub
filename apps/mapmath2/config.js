// MAP Math 2: MAP Growth–style practice (unofficial) for the Math 2–5 test, on Math Quest 2's question bank.
window.APP = {
  id: 'mapmath2',
  name: 'MAP Math 2',
  short: 'MAP Math 2',
  tagline: 'MAP Growth–style practice (unofficial) · Math 2–5',
  icon: '📈',
  iconLabel: '',
  theme: { primary: '#2b5fd0', bg: '#f5f8fd' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    g2: {
      label: 'Grade 2 · Math 2–5 practice', short: 'Grade 2', ready: 'Grade 3',
      levels: [
        { short: 'Starter', grade: 'Grade 2', long: 'Grade 2 Starter' },
        { short: 'Star', grade: 'Grade 2', long: 'Grade 2 Star' },
        { short: 'Challenge', grade: 'Grade 3', long: 'Grade 3 Challenge' },
      ],
    },
  },
  voice: 'g2', // grade-matched narrator (tools/sweet_voice.py PROFILES)
  speech: { frac: 'ordinal' },
  features: {
    studio: false, katex: true,
    map: {
      test: 'Math 2–5', grade: 2, items: 43,
      // Goal areas of NWEA's 2025 "Growth: Math 2-5" (NWEA-aligned version, instructional areas v1.1, May 2025).
      // A school using a Common Core or state-aligned version may see different goal names on its reports.
      goals: [
        { id: 'number', name: 'Number', sub: 'Computation · Number Sense', icon: '🔢', color: 'c1' },
        { id: 'algebra', name: 'Algebra', sub: 'Equations, Expressions, Inequalities & Functions', icon: '🧩', color: 'c2' },
        { id: 'geometry', name: 'Geometry; Probability & Statistics', sub: 'Measurement · Geometric Relationships · Statistics', icon: '📐', color: 'c3' },
      ],
      // NWEA 2025 MAP Growth norms quick reference: mathematics student achievement norms, grade 2
      // (fall 2022–spring 2024 data). Used only to turn practice estimates into approximate percentiles.
      norms: { fall: { mean: 173, sd: 15 }, winter: { mean: 181, sd: 16 }, spring: { mean: 187, sd: 16 } },
      growth: { fallToSpring: 15, fallToWinter: 8, winterToSpring: 6 },
      normsSource: 'NWEA, 2025 MAP Growth Norms Quick Reference (mathematics student achievement norms, grade 2; data from fall 2022 to spring 2024)',
    },
  },
  data: ['mathquest2:common.js', 'mathquest2:add.js', 'mathquest2:place.js', 'mathquest2:measure.js', 'mathquest2:data.js', 'mathquest2:geometry.js', 'mathquest2:lessons.js', 'map-items.js', 'map-lessons.js', 'map-bank.js'],
  videosFrom: 'mathquest2',
  about: 'MAP Math 2 gives MAP Growth–style practice on Grade 2 math (with Grade 3 stretch questions). Questions are original and tagged with the 2023 New Jersey math standards.',
  disclaimer: 'MAP Growth–style practice (unofficial). This app is not made by or affiliated with NWEA. Scores are practice estimates, not RIT scores.',
};
