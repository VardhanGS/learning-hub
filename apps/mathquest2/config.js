// Math Quest 2: Grade 2 math (2023 NJSLS-Mathematics) with a Grade 3 level-up in every skill.
window.APP = {
  id: 'mathquest2',
  name: 'Math Quest 2',
  short: 'Math Quest',
  tagline: 'Add & Subtract · Place Value · Measurement · Data · Geometry',
  icon: '🔢',
  iconLabel: '',
  theme: { primary: '#1f8f4e', bg: '#f4fbf7' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    g2: {
      label: 'Grade 2 → 3 · NJ', short: 'Grade 2', ready: 'Grade 3',
      levels: [
        { short: 'Starter', grade: 'Grade 2', long: 'Grade 2 Starter' },
        { short: 'Star', grade: 'Grade 2', long: 'Grade 2 Star' },
        { short: 'Challenge', grade: 'Grade 3', long: 'Grade 3 Challenge' },
      ],
    },
  },
  speech: { frac: 'ordinal' },
  features: { studio: false, katex: true },
  data: ['common.js', 'add.js', 'place.js', 'measure.js', 'data.js', 'geometry.js', 'lessons.js'],
  about: 'Math Quest 2 covers the Grade 2 New Jersey Student Learning Standards for Mathematics (2023), with a Grade 3 Challenge level in every skill. The code on each level is the standard it practices.',
};
