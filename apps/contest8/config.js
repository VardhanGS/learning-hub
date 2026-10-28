// Puzzle Peak 8: contest-style math for an 8th grader (in the style of the Grades 7–8 paper of Math Kangaroo, the AMC 8,
// and the MATHCOUNTS Sprint Round), plus Summit Trail, a deeper problem-solving track with step-by-step hints. Unofficial; all problems are original.
window.APP = {
  id: 'contest8',
  name: 'Puzzle Peak 8',
  short: 'Puzzle Peak',
  tagline: 'Contest-style math (unofficial) · Kangaroo 7–8 · AMC 8 · Sprint · Summit Trail',
  icon: '🏔️',
  iconLabel: '',
  theme: { primary: '#c42f69', bg: '#fdf5f8' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '1:327475844624:web:f4c5f15d857729d63a5c95' }, // registered 2026-10-27 as "Puzzle Peak 8"
  tracks: {
    g8: {
      label: 'Grades 7–8 contests', short: 'Grade 8', ready: 'High school',
      levels: [
        { short: 'Base Camp', grade: 'Grades 7–8', long: 'Base Camp' },
        { short: 'Ridge', grade: 'Grades 7–8', long: 'Ridge' },
        { short: 'Summit', grade: 'Grades 7–8+', long: 'Summit' },
      ],
    },
  },
  voice: 'g8',
  speech: { frac: 'over' },
  features: {
    studio: false, katex: true,
    contest: {
      blurb: 'Three timed formats: Kangaroo-style (Grades 7–8 paper: 30 questions, 75 min, 3/4/5 points), AMC 8–style (25 questions, 40 min), and Sprint-style (30 typed answers, 40 min). No calculator.',
      practiceTitle: 'Practice by topic',
      formats: [
        { id: 'k78', name: 'Kangaroo-style · Grades 7–8', short: 'Kangaroo-style', per: [10, 10, 10], points: [3, 4, 5], secs: 75 * 60 },
        { id: 'amc8', name: 'AMC 8–style', short: 'AMC 8–style', per: [8, 8, 9], points: null, secs: 40 * 60, note: 'AMC 8–style: score = number right, no penalty for guessing.' },
        { id: 'sprint', name: 'Sprint-style (typed answers)', short: 'Sprint-style', per: [10, 10, 10], points: null, secs: 40 * 60, typed: true, note: 'Sprint-style: answers are typed, as in the MATHCOUNTS Sprint Round (Target, Team, and Countdown rounds are not modeled).' },
      ],
      scoring: 'Checked 2026-10-27 (search extracts of the official sites; see HANDOFF.md): Math Kangaroo USA grades 5–12 answer 30 multiple-choice questions in 75 minutes, a third each worth 3, 4, and 5 points, no penalty, maximum 120. The AMC 8 has 25 multiple-choice questions in 40 minutes; the score is the number right, with no penalty for guessing. The MATHCOUNTS Sprint Round has 30 problems in 40 minutes without a calculator, answered in short form. Questions here are original and ordered easier to harder. Scores are practice scores, not contest results.',
      notice: 'Contest-style practice (unofficial). Math Kangaroo, MATHCOUNTS, AMC, and AMC 8 are trademarks of their respective owners, which are not affiliated with this app. Summit Trail is original; Beast Academy and Art of Problem Solving are trademarks of AoPS Incorporated, which is not affiliated with this app. All problems are original.',
    },
  },
  data: ['contest2:pzkit.js', 'pz8.js'],
  about: 'Puzzle Peak 8 has contest-style practice for an 8th grader (counting and probability, number theory, algebra and logic, geometry) with Kangaroo-, AMC 8–, and Sprint-style practice contests, and Summit Trail, deeper multi-step problems with hints that open one step at a time and a worked solution. Every level is tagged with the closest 2023 New Jersey math standard; contest puzzles often reach beyond grade level.',
  disclaimer: 'Contest-style practice (unofficial). Math Kangaroo, MATHCOUNTS, AMC, and AMC 8 are trademarks of their respective owners, which are not affiliated with this app. Beast Academy and Art of Problem Solving are trademarks of AoPS Incorporated, which is not affiliated with this app. All problems are original.',
};
