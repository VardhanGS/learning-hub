// Puzzle Peak 2: contest-style math puzzles for a 2nd grader (in the style of the Grades 1–2 paper of Math Kangaroo),
// plus Summit Trail, a deeper problem-solving track with step-by-step hints. Unofficial; all problems are original.
window.APP = {
  id: 'contest2',
  name: 'Puzzle Peak 2',
  short: 'Puzzle Peak',
  tagline: 'Contest-style math puzzles (unofficial) · Grades 1–2 · Summit Trail',
  icon: '🧗',
  iconLabel: '',
  theme: { primary: '#6a4fd0', bg: '#f7f5fd' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '1:327475844624:web:cc70cfae86fdd3163a5c95' }, // registered 2026-10-27 as "Puzzle Peak 2"
  tracks: {
    g2: {
      label: 'Grades 1–2 puzzles', short: 'Grade 2', ready: 'Grades 3–4',
      levels: [
        { short: 'Base Camp', grade: 'Grades 1–2', long: 'Base Camp' },
        { short: 'Ridge', grade: 'Grades 1–2', long: 'Ridge' },
        { short: 'Summit', grade: 'Grades 1–2+', long: 'Summit' },
      ],
    },
  },
  voice: 'g2',
  speech: { frac: 'ordinal' },
  features: {
    studio: false, katex: true,
    contest: {
      blurb: 'A timed practice contest like the Grades 1–2 paper: 24 picture and story puzzles in 75 minutes, worth 3, 4, or 5 points, five choices each. A wrong answer costs nothing!',
      practiceTitle: 'Practice puzzles',
      formats: [
        { id: 'k12', name: 'Practice contest · Grades 1–2', short: 'Full contest', per: [8, 8, 8], points: [3, 4, 5], secs: 75 * 60 },
        { id: 'k12half', name: 'Half contest · Grades 1–2', short: 'Half contest', per: [4, 4, 4], points: [3, 4, 5], secs: 38 * 60, note: 'New to contests? Start with the half contest: 12 puzzles in 38 minutes.' },
      ],
      scoring: 'Like Math Kangaroo USA (checked 2026-10-27 on mathkangaroo.org): grades 1–4 answer 24 multiple-choice questions in 75 minutes; a third are worth 3 points, a third 4, a third 5; wrong answers lose nothing; the maximum is 96. Calculators are not allowed. Questions here are original and get harder in the same 3 → 4 → 5 order. The score is a practice score, not a contest result.',
      notice: 'Contest-style practice (unofficial). Math Kangaroo is a trademark of its owner, which is not affiliated with this app. Summit Trail is original; Beast Academy and Art of Problem Solving are trademarks of AoPS Incorporated, which is not affiliated with this app. All problems are original.',
    },
  },
  data: ['pzkit.js', 'pz2.js'],
  about: 'Puzzle Peak 2 has contest-style math puzzles for Grades 1–2 (counting shapes, patterns, calendars, balances, number pyramids, story puzzles) and Summit Trail, deeper multi-step problems with hints that open one step at a time and a worked solution. Every level is tagged with the closest 2023 New Jersey math standard; contest puzzles often reach beyond grade level.',
  disclaimer: 'Contest-style practice (unofficial). Math Kangaroo is a trademark of its owner, which is not affiliated with this app. Beast Academy and Art of Problem Solving are trademarks of AoPS Incorporated, which is not affiliated with this app. All problems are original.',
};
