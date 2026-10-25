// Algebra 1 Quest: the full Algebra 1 course (2023 NJSLS-Mathematics, high school Algebra, Functions, Number &
// Quantity, Statistics), with a Geometry or Algebra 2 preview as the Challenge level of every skill.
window.APP = {
  id: 'algebra1',
  name: 'Algebra 1 Quest',
  short: 'Algebra 1',
  tagline: 'Equations · Functions · Graphs · Quadratics · Statistics',
  icon: '✖️',
  iconLabel: '',
  theme: { primary: '#5b3fb5', bg: '#f6f4fd' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    a1: {
      label: 'Algebra 1 · NJ', short: 'Algebra 1', ready: 'Geometry / Algebra 2',
      levels: [
        { short: 'Starter', grade: 'Algebra 1', long: 'Algebra 1 Starter' },
        { short: 'Star', grade: 'Algebra 1', long: 'Algebra 1 Star' },
        { short: 'Challenge', grade: 'Preview', long: 'Challenge: Geometry / Algebra 2 preview' },
      ],
    },
  },
  voice: 'g8', // grade-matched narrator (tools/sweet_voice.py PROFILES)
  speech: { frac: 'over' },
  features: { studio: false, katex: true },
  data: ['a1-common.js', 'a1-real.js', 'a1-eei.js', 'a1-func.js', 'a1-subjects.js', 'lessons-a1.js'],
  about: 'Algebra 1 Quest covers the high school Algebra 1 course in the 2023 New Jersey Student Learning Standards for Mathematics. Every skill has a Challenge level that previews Geometry or Algebra 2. Type answers like 3x + 2 or (x − 1)(x + 4), and graph lines by tapping points. The code on each level is the standard it practices.',
};
