// MAP Reading 2: Grade 2 reading (with Grade 3 level-ups), MAP Growth–style practice (unofficial) for the
// Reading 2–5 test, and reading fluency practice modeled on the parts of MAP Reading Fluency.
window.APP = {
  id: 'mapread2',
  name: 'MAP Reading 2',
  short: 'MAP Reading 2',
  tagline: 'Grade 2 reading · MAP Growth–style practice (unofficial) · Reading 2–5',
  icon: '📖',
  iconLabel: '',
  theme: { primary: '#c42f69', bg: '#fdf5f8' },
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
  voice: 'g2',
  speech: { frac: 'ordinal' },
  features: {
    studio: false, katex: false,
    map: {
      test: 'Reading 2–5', grade: 2, items: 43,
      // Goal areas of NWEA's 2025 "Growth: Reading 2-5" (NWEA-aligned version, instructional areas v1.1, May 2025).
      // A school using a Common Core or state-aligned version may see different goal names on its reports.
      goals: [
        { id: 'lit', name: 'Fiction, Poetry, and Drama', sub: 'Stories · Poems · Characters', icon: '📚', color: 'c4' },
        { id: 'info', name: 'Nonfiction', sub: 'Facts · Text features · Author\'s purpose', icon: '🔎', color: 'c1' },
        { id: 'vocab', name: 'Vocabulary and Literary Devices', sub: 'Word meaning · Word parts · Figurative language', icon: '🧩', color: 'c2' },
      ],
      // NWEA 2025 MAP Growth norms quick reference: reading student achievement and growth norms, grade 2.
      norms: { fall: { mean: 170, sd: 17 }, winter: { mean: 177, sd: 17 }, spring: { mean: 182, sd: 17 } },
      growth: { fallToSpring: 12, fallToWinter: 7, winterToSpring: 5 },
      normsSource: 'NWEA, 2025 MAP Growth Norms Quick Reference (reading student achievement norms, grade 2; data from fall 2022 to spring 2024)',
      noAudioNote: 'MAP Growth Reading 2–5 has no built-in read-aloud (text-to-speech only as a school accommodation).',
    },
    fluency: {
      grade: 2,
      // Hasbrouck & Tindal (2017) oral reading fluency norms, grade 2, words correct per minute: 10th, 25th, 50th, 75th, 90th percentiles.
      norms: { fall: [23, 36, 50, 84, 111], winter: [35, 59, 84, 109, 131], spring: [43, 72, 100, 124, 148] },
      normsSource: 'Hasbrouck & Tindal (2017), "An update to compiled ORF norms," grade 2',
      disclaimer: 'Practice modeled on the parts of MAP Reading Fluency (unofficial). A grown-up scores the reading; it is not an NWEA score.',
    },
  },
  data: ['elaquest:reading.js', 'readkit.js', 'r2-lit.js', 'r2-info.js', 'r2-vocab.js', 'fluency2.js', 'lessons-r2.js', 'map-bank.js'],
  about: 'MAP Reading 2 teaches Grade 2 reading (with Grade 3 level-ups), gives MAP Growth–style practice, and has reading fluency practice. New passages are original; some stories and facts come from ELA Quest. Questions are tagged with the 2023 New Jersey Student Learning Standards for English Language Arts.',
  disclaimer: 'MAP Growth–style practice (unofficial). This app is not made by or affiliated with NWEA. Scores are practice estimates, not RIT scores.',
};
