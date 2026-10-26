// SAT Prep: practice for the digital SAT (Reading and Writing, Math) with timed, two-stage practice tests,
// untimed skill practice, and timed drills. Unofficial: SAT® is a trademark of the College Board, which is not
// affiliated with this app. Test facts below are from College Board's 2026–27 SAT Student Guide and the Assessment
// Framework for the Digital SAT Suite (see HANDOFF.md).
window.APP = {
  id: 'satprep',
  name: 'SAT Prep',
  short: 'SAT Prep',
  tagline: 'Digital SAT practice (unofficial) · Reading and Writing · Math',
  icon: '🎯',
  iconLabel: '',
  theme: { primary: '#b5462f', bg: '#fdf6f3' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    sat: {
      label: 'Digital SAT · practice', short: 'SAT', ready: 'Test-ready',
      levels: [
        { short: 'Starter', grade: 'SAT', long: 'SAT Starter' },
        { short: 'Star', grade: 'SAT', long: 'SAT Star' },
        { short: 'Challenge', grade: 'SAT', long: 'SAT Challenge' },
      ],
    },
  },
  voice: 'g8', // grade-matched narrator (tools/sweet_voice.py PROFILES)
  speech: { frac: 'over', split: true },
  features: {
    studio: false, katex: true,
    sat: {
      // Per module (College Board): Reading and Writing 25 scored + 2 pretest questions in 32 minutes;
      // Math 20 scored + 2 pretest questions in 35 minutes. Domain counts per test: R&W Craft and Structure 13–15,
      // Information and Ideas 12–14, Standard English Conventions 11–15, Expression of Ideas 8–12; Math Algebra 13–15,
      // Advanced Math 13–15, Problem-Solving and Data Analysis 5–7, Geometry and Trigonometry 5–7.
      sections: {
        rw: { name: 'Reading and Writing', short: 'R&W', n: 27, secs: 32 * 60, spec: [['cs', 7], ['ii', 6], ['sec', 7], ['eoi', 5]], calc: false, grouped: true },
        math: { name: 'Math', short: 'Math', n: 22, secs: 35 * 60, spec: [['alg', 7], ['adv', 7], ['psda', 3], ['geo', 3]], calc: true, grouped: false },
      },
      goals: [
        { id: 'cs', section: 'rw', name: 'Craft and Structure', icon: '🏗️' },
        { id: 'ii', section: 'rw', name: 'Information and Ideas', icon: '🔍' },
        { id: 'sec', section: 'rw', name: 'Standard English Conventions', icon: '✍️' },
        { id: 'eoi', section: 'rw', name: 'Expression of Ideas', icon: '🔗' },
        { id: 'alg', section: 'math', name: 'Algebra', icon: '⚖️' },
        { id: 'adv', section: 'math', name: 'Advanced Math', icon: '🚀' },
        { id: 'psda', section: 'math', name: 'Problem-Solving and Data Analysis', icon: '📊' },
        { id: 'geo', section: 'math', name: 'Geometry and Trigonometry', icon: '📐' },
      ],
      // A reference sheet in this app's own words (the real test provides its own formula list).
      reference: `<h2>📐 Reference sheet</h2><div class="refsheet">
        <p><b>Circle:</b> area = πr², circumference = 2πr. A full circle is 360°, which is 2π radians.</p>
        <p><b>Rectangle:</b> area = length × width. <b>Triangle:</b> area = ½ × base × height.</p>
        <p><b>Right triangle:</b> a² + b² = c² (c is the hypotenuse).</p>
        <p><b>Special right triangles:</b> 30°-60°-90° sides are x, x√3, 2x. 45°-45°-90° sides are x, x, x√2.</p>
        <p><b>Box:</b> volume = length × width × height. <b>Cylinder:</b> volume = πr²h.</p>
        <p><b>Sphere:</b> volume = (4/3)πr³. <b>Cone:</b> volume = (1/3)πr²h. <b>Pyramid:</b> volume = (1/3) × length × width × height.</p>
        <p>The angles of a triangle add up to 180°.</p></div>`,
    },
  },
  data: ['sat-common.js', 'sat-passages.js', 'sat-rw.js', 'sat-math.js', 'sat-bank.js', 'sat-lessons.js'],
  about: 'SAT Prep gives practice for the digital SAT: timed two-stage practice tests, untimed practice in every skill, and timed drills. All passages and questions are original. Levels are tagged with the 2023 New Jersey Student Learning Standards (ELA grades 11–12 and high school mathematics).',
  disclaimer: 'Unofficial practice. SAT® is a trademark of the College Board, which is not affiliated with this app. Scores are practice estimates, not SAT scores.',
};
