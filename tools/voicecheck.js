// Voice coverage check: does every line the app can speak have a recorded clip (whole, or phrases + numbers)?
// Draws fresh random questions (independent of the draws tools/enumerate_speech.js used to choose what to record),
// builds exactly what the app would say for each, and asks voice.js whether it can play it from clips.
// Anything reported here would fall back to the device's text-to-speech voice.
// Usage: node tools/voicecheck.js <appId> [runsPerLevel=300]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const appId = process.argv[2];
if (!appId) { console.log('Usage: node tools/voicecheck.js <appId> [runsPerLevel]'); process.exit(2); }
const RUNS = +(process.argv[3] || 300);
const clipsFile = path.join(ROOT, 'apps', appId, 'data', 'voice-clips.js');
if (!fs.existsSync(clipsFile)) { console.log(`✗ ${appId}: no data/voice-clips.js — run tools/voice_all.sh ${appId} 4`); process.exit(1); }

const ctx = { console, window: {}, CSS: { escape: (s) => s }, TextEncoder };
ctx.window = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
load(`apps/${appId}/config.js`);
vm.runInContext('var APP = window.APP;', ctx);
load(`apps/${appId}/data/voice-clips.js`); // must come before voice.js, which reads VOICE_CLIPS when it loads
['core/speech.js', 'core/voice.js', 'core/U.js', 'core/engine/fig.js', 'core/engine/alg.js'].forEach(load);
for (const f of ctx.APP.data) load(f.startsWith('elaquest:') ? `../ELAQuest/data/${f.split(':')[1]}` : f.includes(':') ? `apps/${f.split(':')[0]}/data/${f.split(':')[1]}` : `apps/${appId}/data/${f}`);
vm.runInContext('this.Voice = Voice; this.SUBJECTS = SUBJECTS; this.LESSONS = typeof LESSONS === "undefined" ? {} : LESSONS;', ctx);
const { Voice, SUBJECTS, LESSONS } = ctx;

let checked = 0;
const missing = new Map(); // line -> where it was seen
function check(p, where) {
  const part = typeof p === 'string' ? { text: p } : p;
  if (!part.text || !/[a-z0-9]/i.test(Voice.clean(Voice.norm(part.text)))) return;
  checked++;
  if (!Voice.hasClip(part.text, part.kind || '')) if (!missing.has(part.text)) missing.set(part.text, where);
}

[...Voice.PRAISE, ...Object.values(Voice.LINES)].forEach((t) => check(t, 'common'));
let levels = 0;
for (const s of SUBJECTS) for (const k of s.skills) k.levels.forEach((L, l) => {
  levels++;
  const where = `${k.id}.${l}`;
  if (LESSONS[where]) Voice.build.lesson(LESSONS[where]).forEach((p) => check(p, `${where} lesson`));
  for (let r = 0; r < RUNS; r++) for (const q of L.gen({})) {
    Voice.build.question(q).forEach((p) => check(p, where));
    if (q.passage) Voice.build.passage(q.passage).forEach((p) => check(p, where));
    Voice.build.demoEnd(q).forEach((p) => check(p, `${where} demo`));
    (q.steps || []).forEach((s) => check(s, `${where} hint step`)); // step-by-step hints (Puzzle Peak)
  }
});

console.log(`${appId}: ${Voice.clipCount()} clips; checked ${checked} spoken lines across ${levels} levels (${RUNS} rounds each)`);
if (!missing.size) { console.log('✓ every line has a recorded voice'); process.exit(0); }
console.log(`✗ ${missing.size} distinct line(s) would use the device voice:`);
[...missing].slice(0, 40).forEach(([t, w]) => console.log(`  [${w}] ${t.slice(0, 110)}`));
if (missing.size > 40) console.log(`  … and ${missing.size - 40} more`);
process.exit(1);
