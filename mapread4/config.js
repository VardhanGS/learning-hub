// MAP Reading 4: Grade 4 reading (with Grade 5 level-ups), MAP Growth–style practice (unofficial) for the
// Reading 2–5 test, and reading fluency practice modeled on the parts of MAP Reading Fluency. All passages are new.
window.APP = {
  id: 'mapread4',
  name: 'MAP Reading 4',
  short: 'MAP Reading 4',
  tagline: 'Grade 4 reading · MAP Growth–style practice (unofficial) · Reading 2–5',
  icon: '📚',
  iconLabel: '',
  theme: { primary: '#0d8585', bg: '#f2fbfb' },
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
  voice: 'g4',
  speech: { frac: 'ordinal' },
  features: {
    studio: false, katex: false,
    map: {
      test: 'Reading 2–5', grade: 4, items: 43,
      // Goal areas of NWEA's 2025 "Growth: Reading 2-5" (NWEA-aligned version, instructional areas v1.1, May 2025).
      goals: [
        { id: 'lit', name: 'Fiction, Poetry, and Drama', sub: 'Theme · Characters · Poems and plays · Point of view', icon: '📚', color: 'c4' },
        { id: 'info', name: 'Nonfiction', sub: 'Main idea · Structure · Evidence · Visuals', icon: '🔎', color: 'c1' },
        { id: 'vocab', name: 'Vocabulary and Literary Devices', sub: 'Context · Roots · Figurative language', icon: '🧩', color: 'c2' },
      ],
      // NWEA 2025 MAP Growth norms quick reference: reading student achievement and growth norms, grade 4.
      norms: { fall: { mean: 196, sd: 18 }, winter: { mean: 199, sd: 18 }, spring: { mean: 202, sd: 18 } },
      growth: { fallToSpring: 6, fallToWinter: 4, winterToSpring: 3 },
      normsSource: 'NWEA, 2025 MAP Growth Norms Quick Reference (reading student achievement norms, grade 4; data from fall 2022 to spring 2024)',
    },
    fluency: {
      grade: 4,
      // Hasbrouck & Tindal (2017) oral reading fluency norms, grade 4, words correct per minute: 10th, 25th, 50th, 75th, 90th.
      norms: { fall: [60, 75, 94, 125, 153], winter: [71, 95, 120, 143, 168], spring: [83, 105, 133, 160, 184] },
      normsSource: 'Hasbrouck & Tindal (2017), "An update to compiled ORF norms," grade 4',
      disclaimer: 'Practice modeled on the parts of MAP Reading Fluency (unofficial). A grown-up scores the reading; it is not an NWEA score.',
    },
  },
  data: ['mapread2:readkit.js', 'r4-lit.js', 'r4-info.js', 'r4-vocab.js', 'fluency4.js', 'lessons-r4.js', 'map-bank.js'],
  about: 'MAP Reading 4 teaches Grade 4 reading (with Grade 5 level-ups), gives MAP Growth–style practice, and has reading fluency practice. Every passage and question is original and tagged with the 2023 New Jersey Student Learning Standards for English Language Arts.',
  disclaimer: 'MAP Growth–style practice (unofficial). This app is not made by or affiliated with NWEA. Scores are practice estimates, not RIT scores.',
};
