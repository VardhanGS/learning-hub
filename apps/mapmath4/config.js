// MAP Math 4: Grade 4 math (with a Grade 5 level-up) and MAP Growth–style practice (unofficial) for the Math 2–5 test.
// All questions are new (there is no separate Grade 4 learning app to share with).
window.APP = {
  id: 'mapmath4',
  name: 'MAP Math 4',
  short: 'MAP Math 4',
  tagline: 'Grade 4 math · MAP Growth–style practice (unofficial) · Math 2–5',
  icon: '📐',
  iconLabel: '',
  theme: { primary: '#c2571a', bg: '#fdf7f2' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    g4: {
      label: 'Grade 4 → 5 · NJ', short: 'Grade 4', ready: 'Grade 5',
      levels: [
        { short: 'Starter', grade: 'Grade 4', long: 'Grade 4 Starter' },
        { short: 'Star', grade: 'Grade 4', long: 'Grade 4 Star' },
        { short: 'Challenge', grade: 'Grade 5', long: 'Grade 5 Challenge' },
      ],
    },
  },
  voice: 'g4', // grade-matched narrator (tools/sweet_voice.py PROFILES)
  speech: { frac: 'ordinal', split: true }, // split: decimals and fractions are read from short pieces ("4 point 6 4 7", "8 and 4 fifteenths")
  features: {
    studio: false, katex: true,
    map: {
      test: 'Math 2–5', grade: 4, items: 43,
      // Goal areas of NWEA's 2025 "Growth: Math 2-5" (NWEA-aligned version, instructional areas v1.1, May 2025).
      // A school using a Common Core or state-aligned version may see different goal names on its reports.
      goals: [
        { id: 'number', name: 'Number', sub: 'Computation · Number Sense', icon: '🔢', color: 'c1' },
        { id: 'algebra', name: 'Algebra', sub: 'Equations, Expressions, Inequalities & Functions', icon: '🧩', color: 'c2' },
        { id: 'geometry', name: 'Geometry; Probability & Statistics', sub: 'Measurement · Geometric Relationships · Statistics', icon: '📐', color: 'c3' },
      ],
      // NWEA 2025 MAP Growth norms quick reference: mathematics student achievement norms, grade 4
      // (fall 2022–spring 2024 data). Used only to turn practice estimates into approximate percentiles.
      norms: { fall: { mean: 197, sd: 16 }, winter: { mean: 204, sd: 17 }, spring: { mean: 210, sd: 18 } },
      growth: { fallToSpring: 13, fallToWinter: 7, winterToSpring: 6 },
      normsSource: 'NWEA, 2025 MAP Growth Norms Quick Reference (mathematics student achievement norms, grade 4; data from fall 2022 to spring 2024)',
    },
  },
  data: ['mathquest2:common.js', 'common4.js', 'number4.js', 'algebra4.js', 'geometry4.js', 'lessons4.js', 'map-bank.js'],
  about: 'MAP Math 4 teaches Grade 4 math (with Grade 5 level-ups) and gives MAP Growth–style practice. Questions are original and tagged with the 2023 New Jersey Student Learning Standards for Mathematics.',
  disclaimer: 'MAP Growth–style practice (unofficial). This app is not made by or affiliated with NWEA. Scores are practice estimates, not RIT scores.',
};
