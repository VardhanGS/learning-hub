// Video-script checker (no rendering): node tools/check_videos.js [appId ...]   (default: every app with video_scripts.py)
//   - every scene type is one make_videos.py can draw; every image/quiz scene has a picture
//   - every fig expression runs in core/engine/fig.js (the same file fig_png.py uses) and returns an SVG
//   - image scenes: `show` has one entry per beat and points at a real fig; every note is revealed by some beat
//   - quiz scenes: the answer is one of the options, options differ, beats are ask / count / reveal
//   - video ids are unique; `practice` points at a real skill and level (here or, for borrowed videos, in the borrower)
//   - every lesson `video:` key names a video in this app or in its videosFrom app
//   - more notes than beats / a `show` list of the wrong length: an error in a new (unrendered) video, a warning in an
//     already-rendered one
// It reports how many videos exist on paper but are not rendered yet (no entry in data/videos.js).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const TYPES = new Set(['title', 'bullets', 'wordmath', 'sentence', 'sort', 'quiz', 'tablelegs', 'boxes', 'beforeafter', 'oreo', 'levels', 'outro', 'image']);
const COLORS = new Set(['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'number', 'algebra', 'geometry', 'lit', 'info', 'vocab', 'real', 'eei', 'func', 'rw', 'math', 'phonics', 'grammar', 'reading', 'writing', 'mix', 'spelling']);
const figCtx = { window: {} };
vm.createContext(figCtx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'core/engine/fig.js'), 'utf8') + ';this.Fig = Fig;', figCtx);

const scripts = (a) => JSON.parse(cp.execFileSync('python3', ['-c', `import sys,json;sys.path.insert(0,${JSON.stringify(path.join(ROOT, 'apps', a))});from video_scripts import VIDEOS;print(json.dumps(VIDEOS))`]).toString());
function appData(appId) {
  const ctx = { console, window: {}, CSS: { escape: (s) => s } };
  ctx.window = ctx;
  vm.createContext(ctx);
  const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  load(`apps/${appId}/config.js`);
  vm.runInContext('var APP = window.APP;', ctx);
  ['core/speech.js', 'core/U.js', 'core/engine/fig.js', 'core/engine/alg.js'].forEach(load);
  const dp = (f) => (f.startsWith('elaquest:') ? `../ELAQuest/data/${f.split(':')[1]}` : f.includes(':') ? `apps/${f.split(':')[0]}/data/${f.split(':')[1]}` : `apps/${appId}/data/${f}`);
  for (const f of ctx.APP.data) load(dp(f));
  vm.runInContext('this.S = SUBJECTS; this.L = typeof LESSONS === "undefined" ? {} : LESSONS;', ctx);
  return { APP: ctx.APP, S: ctx.S, L: ctx.L };
}
const rendered = (a) => { const f = path.join(ROOT, 'apps', a, 'data', 'videos.js'); return fs.existsSync(f) ? new Set([...fs.readFileSync(f, 'utf8').matchAll(/"id": "([^"]+)"/g)].map((m) => m[1])) : new Set(); };

const apps = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(ROOT, 'apps')).filter((a) => fs.existsSync(path.join(ROOT, 'apps', a, 'video_scripts.py')));
const borrowers = {};
for (const a of fs.readdirSync(path.join(ROOT, 'apps'))) { const d = appData(a); if (d.APP.videosFrom) (borrowers[d.APP.videosFrom] ||= []).push(a); }
let errors = 0, warnings = 0;
const err = (a, v, msg) => { errors++; console.log(`  ✗ ${a}/${v}: ${msg}`); };
let isNew = () => true;
// Timing warnings are errors in videos that are not rendered yet (new scripts must sync every note to a beat).
const warn = (a, v, msg) => { if (isNew(v)) return err(a, v, msg); warnings++; if (process.env.VERBOSE) console.log(`  ! ${a}/${v}: ${msg}`); };
for (const a of apps) {
  const d = appData(a);
  const own = scripts(a);
  const borrowed = d.APP.videosFrom ? scripts(d.APP.videosFrom) : [];
  const r = rendered(a);
  isNew = (id) => !r.has(id);
  const ids = new Set();
  let figs = 0, beats = 0;
  const skillOK = (data, p) => { const s = data.S.find((x) => x.id === p[0]) || data.S.find((x) => x.skills.some((k) => k.id === p[1])); const k = s && s.skills.find((x) => x.id === p[1]); return k && p[2] >= 0 && p[2] <= 2; };
  for (const v of own) {
    if (ids.has(v.id) || borrowed.some((b) => b.id === v.id)) err(a, v.id, 'duplicate video id');
    ids.add(v.id);
    for (const k of ['title', 'subject', 'label', 'desc', 'scenes']) if (!v[k]) err(a, v.id, `missing ${k}`);
    if (!COLORS.has(v.color || v.subject)) err(a, v.id, `no color for ${v.color || v.subject}`);
    if (v.practice && !skillOK(d, v.practice) && !(borrowers[a] || []).some((b) => skillOK(appData(b), v.practice))) err(a, v.id, `practice ${v.practice} is not a skill/level`);
    v.scenes.forEach((sc, si) => {
      const where = `scene ${si + 1} (${sc.type})`;
      if (!TYPES.has(sc.type)) err(a, v.id, `${where}: unknown type`);
      if (!sc.beats || !sc.beats.length) err(a, v.id, `${where}: no beats`);
      beats += (sc.beats || []).length;
      for (const b of sc.beats || []) if (!b.silent && !(b.text || '').trim()) err(a, v.id, `${where}: empty beat`);
      const fx = [...(sc.figs || []), ...(sc.fig ? [sc.fig] : [])];
      for (const e of fx) {
        figs++;
        try { const s = vm.runInContext(e, figCtx); if (typeof s !== 'string' || !s.startsWith('<svg') || /NaN|undefined/.test(s)) err(a, v.id, `${where}: fig gives a bad SVG: ${e}`); } catch (x) { err(a, v.id, `${where}: fig throws (${x.message}): ${e}`); }
      }
      if (sc.type === 'image') {
        if (!fx.length) err(a, v.id, `${where}: no picture`);
        const show = sc.show || [];
        if (sc.show && show.length !== sc.beats.length) warn(a, v.id, `${where}: show has ${show.length} entries for ${sc.beats.length} beats`);
        if (show.some((k) => k !== null && (k < 0 || k >= sc.figs.length))) err(a, v.id, `${where}: show points past the figs`);
        const from = sc.note_from || 1;
        if ((sc.notes || []).length && (sc.notes.length - 1 + from) >= sc.beats.length) warn(a, v.id, `${where}: ${sc.notes.length} notes for ${sc.beats.length} beats (extra notes pop in after the last beat starts)`);
      }
      if (sc.type === 'quiz') {
        if (!sc.opts.includes(sc.a)) err(a, v.id, `${where}: answer not among options`);
        if (new Set(sc.opts).size !== sc.opts.length) err(a, v.id, `${where}: duplicate options`);
        if (sc.beats.map((b) => b.role).join() !== 'ask,count,reveal') err(a, v.id, `${where}: beats must be ask, count, reveal`);
        if (!sc.fig && !sc.passage) err(a, v.id, `${where}: no picture`);
      }
    });
  }
  const all = new Set([...own, ...borrowed].map((v) => v.id));
  for (const [key, les] of Object.entries(d.L)) if (les.video && !all.has(les.video)) err(a, key, `lesson video '${les.video}' is not a video of this app`);
  // skills that still have no video at any level
  const none = [];
  for (const s of d.S) for (const k of s.skills) if (![0, 1, 2].some((l) => (d.L[`${k.id}.${l}`] || {}).video)) none.push(k.id);
  const todo = own.filter((v) => !r.has(v.id)).map((v) => v.id);
  console.log(`${a}: ${own.length} own videos (+${borrowed.length} borrowed), ${figs} pictures, ${beats} beats; not rendered yet: ${todo.length ? todo.join(' ') : 'none'}; skills with no video: ${none.length ? none.join(' ') : 'none'}`);
}
if (warnings) console.log(`\n${warnings} timing warning(s) in already-rendered videos (VERBOSE=1 lists them)`);
console.log(errors ? `\n${errors} problem(s)` : '\nAll video scripts OK');
process.exit(errors ? 1 : 0);
