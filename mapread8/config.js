// MAP Reading 8: Grade 8 reading (with Grade 9–10 level-ups) and MAP Growth–style practice (unofficial) for the
// Reading 6+ test. No fluency practice: MAP Reading Fluency is for pre-K–5.
window.APP = {
  id: 'mapread8',
  name: 'MAP Reading 8',
  short: 'MAP Reading 8',
  tagline: 'Grade 8 reading · MAP Growth–style practice (unofficial) · Reading 6+',
  icon: '🔍',
  iconLabel: '',
  theme: { primary: '#6a4fd0', bg: '#f6f4fd' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    g8: {
      label: 'Grade 8 → 9 · NJ', short: 'Grade 8', ready: 'Grade 9',
      levels: [
        { short: 'Starter', grade: 'Grade 8', long: 'Grade 8 Starter' },
        { short: 'Star', grade: 'Grade 8', long: 'Grade 8 Star' },
        { short: 'Challenge', grade: 'Grade 9', long: 'Grade 9 Challenge' },
      ],
    },
  },
  voice: 'g8',
  speech: { frac: 'over' },
  features: {
    studio: false, katex: false,
    map: {
      test: 'Reading 6+', grade: 8, items: 43,
      // Goal areas of NWEA's 2025 "Growth: Reading 6+" (NWEA-aligned version, instructional areas v1.1, May 2025).
      goals: [
        { id: 'lit', name: 'Fiction, Poetry, and Drama', sub: 'Theme · Poetry and drama · Myths retold', icon: '📚', color: 'c4' },
        { id: 'info', name: 'Nonfiction', sub: 'Central idea · Arguments · Conflicting sources', icon: '🔎', color: 'c1' },
        { id: 'vocab', name: 'Vocabulary and Literary Devices', sub: 'Word meaning · Tone · Figures of speech', icon: '🧩', color: 'c2' },
      ],
      // NWEA 2025 MAP Growth norms quick reference: reading student achievement and growth norms, grade 8.
      norms: { fall: { mean: 216, sd: 17 }, winter: { mean: 217, sd: 17 }, spring: { mean: 218, sd: 17 } },
      growth: { fallToSpring: 2, fallToWinter: 1, winterToSpring: 1 },
      normsSource: 'NWEA, 2025 MAP Growth Norms Quick Reference (reading student achievement norms, grade 8; data from fall 2022 to spring 2024)',
    },
  },
  data: ['elaquest:g8-reading.js', 'mapread2:readkit.js', 'r8-lit.js', 'r8-info.js', 'r8-vocab.js', 'lessons-r8.js', 'map-bank.js'],
  about: 'MAP Reading 8 teaches Grade 8 reading (with Grade 9–10 level-ups) and gives MAP Growth–style practice for the Reading 6+ test. New passages are original; some stories, articles, and argument questions come from ELA Quest. Questions are tagged with the 2023 New Jersey Student Learning Standards for English Language Arts.',
  disclaimer: 'MAP Growth–style practice (unofficial). This app is not made by or affiliated with NWEA. Scores are practice estimates, not RIT scores.',
};
