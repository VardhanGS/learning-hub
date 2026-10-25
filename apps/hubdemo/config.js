// Phase 1 demo: three skills that exercise the shared engine (keypad entry, misconception distractors,
// number line, fraction shading, KaTeX, joined-clip voice, cloud sync).
window.APP = {
  id: 'hubdemo',
  name: 'Hub Demo',
  short: 'Hub Demo',
  tagline: 'Adding · Number lines · Fractions',
  icon: '🧪',
  theme: { primary: '#2b5fd0', bg: '#f5f8fd' },
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
  voice: 'g2', // grade-matched narrator (tools/sweet_voice.py PROFILES)
  speech: { frac: 'ordinal' },   // "3 fourths" (elementary); Algebra apps use 'over' ("3 over 4")
  features: { studio: false, katex: true },
  data: ['skills.js', 'lessons.js'],
  about: 'A small demo of the Learning Hub engine. Standards are the 2023 New Jersey Student Learning Standards for Mathematics.',
  disclaimer: null,
};
