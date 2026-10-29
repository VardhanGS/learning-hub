// Math Quest 4: Grade 4 math (2023 NJSLS-Mathematics) with a Grade 5 level-up in every MAP Math 4 skill.
// The learning app for Grade 4, grouped by topic: MAP Math 4's 17 skills (borrowed as they are) plus 5 new ones.
window.APP = {
  id: 'mathquest4',
  name: 'Math Quest 4',
  short: 'Math Quest',
  tagline: 'Place Value · Multiply & Divide · Fractions · Measurement · Geometry',
  icon: '🧮',
  iconLabel: '',
  theme: { primary: '#6a3fb5', bg: '#f8f5fd' },
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
  speech: { frac: 'ordinal', split: true },
  features: { studio: false, katex: true },
  data: ['mathquest2:common.js', 'mapmath4:common4.js', 'mapmath4:number4.js', 'mapmath4:algebra4.js', 'mapmath4:geometry4.js', 'skills4.js', 'subjects4.js', 'mapmath4:lessons4.js', 'lessons-new4.js'],
  videosFrom: 'mapmath4',
  about: 'Math Quest 4 covers the Grade 4 New Jersey Student Learning Standards for Mathematics (2023), grouped by topic, with Grade 3 fact review and a Grade 5 Challenge level in most skills. The code on each level is the standard it practices. Its practice questions are shared with MAP Math 4, plus five skills of its own with step-by-step hints.',
};
