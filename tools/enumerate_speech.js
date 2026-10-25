// Collects every line an app can speak by running each level's generator many times, and writes
// apps/<appId>/.speech-lines.json for tools/make_voice.py.
// Lines without numbers are recorded whole. Lines with numbers (random math questions) are split into the phrases
// around the numbers plus the numbers themselves; voice.js joins them back together when it plays them.
// Numbers 0–1,000 are always recorded, so any whole number in that range can be spoken.
// Usage: node tools/enumerate_speech.js <appId> [runs=250]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const appId = process.argv[2];
if (!appId) { console.log('Usage: node tools/enumerate_speech.js <appId> [runs]'); process.exit(2); }
const RUNS = +(process.argv[3] || 250);
const WHOLE_LIMIT = 150; // a level with at most this many distinct number lines records them whole

const ctx = { console, window: {}, CSS: { escape: (s) => s }, TextEncoder };
ctx.window = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
load(`apps/${appId}/config.js`);
vm.runInContext('var APP = window.APP;', ctx);
['core/speech.js', 'core/voice.js', 'core/U.js', 'core/engine/fig.js'].forEach(load);
for (const f of ctx.APP.data) load(`apps/${appId}/data/${f}`);
vm.runInContext('this.Voice = Voice; this.MathText = MathText; this.SUBJECTS = SUBJECTS; this.LESSONS = typeof LESSONS === "undefined" ? {} : LESSONS;', ctx);
const { Voice, MathText, SUBJECTS, LESSONS } = ctx;

const lines = new Map();
let bundle = 'common';
function addOne(text, kind = '', say) {
  const t = Voice.clean(kind === 'num' ? text : Voice.norm(text));
  if (!t || !/[a-z0-9]/i.test(t)) return;
  const key = Voice.keyOf(text, kind);
  if (!lines.has(key)) lines.set(key, { key, text: t, say: say || (kind || !Voice.MATH ? t : Voice.clean(MathText.sayWords(text))), kind, bundle: kind === 'num' ? 'numbers' : bundle });
}
// A spoken line: whole if it has no numbers (or `whole` is set), otherwise phrases + numbers.
function add(p, whole = false) {
  const part = typeof p === 'string' ? { text: p } : p;
  if (!part.text) return;
  if (whole || part.kind || !Voice.MATH || !MathText.hasNum(part.text)) { addOne(part.text, part.kind || ''); return; }
  for (const piece of MathText.pieces(part.text)) {
    if (piece.num) addOne(piece.num, 'num', MathText.numWords(piece.num));
    else addOne(piece.text);
  }
}

const fixed = ['Type a number', 'Use the number keys. For a fraction like 3/4, type 3, then /, then 4.', 'Almost! Simplify it.', 'That is equal to the answer. Write it in simplest form.', 'Not quite. Try again!', 'Here is the answer:'];
[...Voice.PRAISE, ...Object.values(Voice.LINES), ...fixed].forEach((t) => add(t, true));
for (let n = 0; n <= 1000; n++) addOne(String(n), 'num', String(n));

for (const s of SUBJECTS) for (const k of s.skills) k.levels.forEach((L, l) => {
  bundle = `${k.id}-${l}`;
  const les = LESSONS[`${k.id}.${l}`];
  if (les) Voice.build.lesson(les).forEach((p) => add(p, true));
  // First collect every distinct line this level can say. A line with numbers is recorded whole when it has only
  // a few variants (it sounds smoother); lines with many random variants are split into phrases + numbers.
  const seen = new Map();
  const note = (p) => { const part = typeof p === 'string' ? { text: p } : p; if (part.text) seen.set(Voice.keyOf(part.text, part.kind || ''), part); };
  let stale = 0;
  for (let r = 0; r < RUNS && stale < 120; r++) {
    const before = seen.size;
    for (const q of L.gen({})) {
      Voice.build.question(q).forEach(note);
      [q.hint, q.why, ...Object.values(q.miss || {})].filter(Boolean).forEach(note);
      if (q.passage) Voice.build.passage(q.passage).forEach(note);
      Voice.build.demoEnd(q).forEach(note);
    }
    stale = seen.size === before ? stale + 1 : 0;
  }
  const withNums = [...seen.values()].filter((p) => MathText.hasNum(p.text));
  const whole = withNums.length <= WHOLE_LIMIT || stale >= 120 && withNums.length <= WHOLE_LIMIT * 2;
  for (const p of seen.values()) add(p, whole);
});

const out = [...lines.values()];
fs.writeFileSync(path.join(ROOT, 'apps', appId, '.speech-lines.json'), JSON.stringify(out));
const chars = out.reduce((a, l) => a + l.say.length, 0);
const byB = {};
out.forEach((l) => { byB[l.bundle] = (byB[l.bundle] || 0) + 1; });
console.log(`${out.length} lines, ${chars} characters (~${Math.round(chars / 15 / 60)} min of audio) · ${Object.entries(byB).map(([b, n]) => `${b} ${n}`).join(', ')}`);
