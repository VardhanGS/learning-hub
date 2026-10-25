// MAP Algebra 1: MAP Growth–style practice (unofficial) for NWEA's course-specific Algebra 1 test, with practice in
// its three goal areas, including grade 7–8 prerequisite review. Most questions are new; 6 skills come from Algebra 1 Quest.
// NWEA 2022 course-specific user norms, Algebra 1: achievement percentiles 5, 10, … 95 (scores by season).
const A1_NORMS = {
  fall: [202, 208, 212, 215, 218, 220, 223, 225, 227, 229, 231, 233, 235, 237, 240, 243, 246, 250, 256],
  winter: [204, 210, 214, 218, 221, 224, 226, 228, 231, 233, 235, 238, 240, 242, 245, 248, 252, 256, 263],
  spring: [204, 212, 216, 220, 224, 227, 229, 232, 234, 237, 239, 242, 245, 247, 250, 254, 257, 262, 269],
};
// mean = the 50th percentile; sd ≈ (95th − 5th) / 3.29 (used only for the starting estimate and beyond the table)
const a1Norm = (t) => ({ mean: t[9], sd: +((t[18] - t[0]) / 3.29).toFixed(1), table: t });
window.APP = {
  id: 'mapalg1',
  name: 'MAP Algebra 1',
  short: 'MAP Algebra 1',
  tagline: 'Algebra 1 · MAP Growth–style practice (unofficial) · course test',
  icon: '📊',
  iconLabel: '',
  theme: { primary: '#3d4fb5', bg: '#f4f5fd' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    a1: {
      label: 'Algebra 1 · NJ', short: 'Algebra 1', ready: 'Geometry / Algebra 2',
      levels: [
        { short: 'Starter', grade: 'Algebra 1', long: 'Algebra 1 Starter' },
        { short: 'Star', grade: 'Algebra 1', long: 'Algebra 1 Star' },
        { short: 'Challenge', grade: 'Challenge', long: 'Algebra 1 Challenge' },
      ],
    },
  },
  voice: 'g8', // grade-matched narrator (tools/sweet_voice.py PROFILES)
  speech: { frac: 'over', split: true }, // decimals and fractions are read from short recorded pieces ("105 point 6", "3 over 10")
  features: {
    studio: false, katex: true,
    map: {
      test: 'Algebra 1', grade: 'Algebra 1', items: 43,
      // Goal areas of NWEA's course-specific MAP Growth Algebra 1 test (NWEA-aligned version, instructional areas v1.1).
      goals: [
        { id: 'real', name: 'Real Numbers', sub: 'Number types · Exponents · Units · Grade 7–8 review', icon: '🔢', color: 'c1' },
        { id: 'eei', name: 'Expressions, Equations, and Inequalities', sub: 'Expressions · Equations · Systems · Quadratics', icon: '⚖️', color: 'c2' },
        { id: 'func', name: 'Patterns, Functions, and Graphing', sub: 'Functions · Rates · Graphs · Data', icon: '📈', color: 'c3' },
      ],
      norms: { fall: a1Norm(A1_NORMS.fall), winter: a1Norm(A1_NORMS.winter), spring: a1Norm(A1_NORMS.spring) },
      // median conditional growth at the 50th percentile: fall→spring 8.0, fall→winter 4.1, winter→spring 3.9
      growth: { fallToSpring: 8, fallToWinter: 4, winterToSpring: 4 },
      normsSource: 'NWEA, 2022 norms for MAP Growth course-specific tests in Algebra 1, Algebra 2, and Geometry (user norms; test data from 2019–2020 through 2021–2022)',
      normsShort: 'NWEA 2022 course norms',
      normsNote: 'Course norms are not grade-specific: they compare with everyone who took the Algebra 1 course test that season, and they are user norms, not nationally representative.',
      group: 'students who took the Algebra 1 course test', groupShort: 'vs course', avgLabel: 'median',
      bandRange: [180, 280], chartLo: 195,
      simThetas: [190, 200, 210, 220, 230, 240, 250, 260, 270],
      audioNote: 'Grown-ups: allow read-aloud during the test (only if the school gives your child text-to-speech)',
    },
  },
  data: ['algebra1:a1-common.js', 'algebra1:a1-real.js', 'algebra1:a1-eei.js', 'algebra1:a1-func.js', 'algebra1:lessons-a1.js', 'map-items.js', 'map-lessons.js', 'map-bank.js'],
  videosFrom: 'algebra1',
  about: 'MAP Algebra 1 gives MAP Growth–style practice (unofficial) for the course-specific Algebra 1 test, with practice in its three goal areas, including grade 7–8 review. Questions are original and tagged with the 2023 New Jersey Student Learning Standards for Mathematics.',
  disclaimer: 'MAP Growth–style practice (unofficial). This app is not made by or affiliated with NWEA. Scores are practice estimates, not RIT scores.',
};
