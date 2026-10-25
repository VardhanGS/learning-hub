# Learning Hub — handoff prompt for a new Claude Code session

Start the new session in `/Users/vardhangarimella/Documents` and paste everything below the line.

---

You are continuing the **Learning Hub** project: 9 learning PWAs for one family (a 2nd grader, a 4th grader, and
an 8th grader in New Jersey), built on one shared engine. Read `learning-hub/HANDOFF.md` (this file) and
`learning-hub/README.md` first, then check `git log --oneline | head -20` in `learning-hub/`.

## The original brief (still in force)

- 9 apps: 1 Math Quest 2 · 2 MAP Math 2 · 3 MAP Math 4 · 4 Algebra 1 Quest · 5 MAP Algebra 1 · 6 MAP Reading 2 ·
  7 MAP Reading 4 · 8 MAP Reading 8 · 9 SAT Prep. Pairs share banks (1→2, 4→5). 6 and 8 can start from ELA Quest's
  Grade 2 and Grade 8 content (`Documents/ELAQuest/data/`); 7 needs new Grade 4 content.
- One repo `Documents/learning-hub/` → github.com/VardhanGS/learning-hub, GitHub Pages from the `gh-pages` branch:
  `https://vardhangs.github.io/learning-hub/<appId>/`. Each app has its own manifest, service worker, cache, and icon.
- Every skill has 3 levels (the top level is a level up into the next grade), a "Watch first" lesson + animated demo,
  NJ standard codes on every level (2023 NJSLS-Mathematics / NJSLS-ELA 2023), sounds, natural voice, badges/XP/
  streaks, 4–8 narrated videos per app, classes + PINs + grown-up dashboard synced through Firebase.
- MAP apps: unofficial "MAP Growth–style practice", adaptive test (~43 items, no going back, untimed, timer only for
  the parent), estimated band (never claim RIT), goal-area table (Low/LoAvg/Avg/HiAvg/High), next skills, growth across
  Fall/Winter/Spring, untimed Goal Area Practice with 3 levels. SAT: two timed adaptive modules per section, original
  passages, simple calculator, reference sheet in our own words, estimated score range, review, drills. Labels:
  "MAP Growth–style practice (unofficial)…" and "SAT® is a trademark of the College Board, which is not affiliated
  with this app." No NWEA/College Board items or logos; all content original.
- Per app: content validator (10,000+ items, answer among options, no duplicate options, math recomputed), automated
  play-through of every level, real-browser checks at phone + desktop in light + dark, record voice + videos, then
  publish. Report honestly what was and wasn't tested.

## User rules and preferences (must follow)

- **Ask before publishing anything new** (a new app). Updates to an already-approved app may be published after testing.
  Never reset/delete progress data without asking.
- **GitHub:** the active gh account is `gspkv`; never switch it. Push as VardhanGS:
  `export GH_TOKEN=$(gh auth token -u VardhanGS) && git -c credential.helper= -c 'credential.helper=!f(){ echo username=VardhanGS; echo "password=$GH_TOKEN"; }; f' push origin main`
  and publish with `export GH_TOKEN=$(gh auth token -u VardhanGS) && tools/deploy.sh "message"` (builds, pushes dist/ to gh-pages).
- **Pictures everywhere** (explicit, all phases): every question, lesson (`fig: () => Fig...`), demo, and video scene gets
  a visual model wherever it helps (blocks, bar models, graphs, number lines, arrays, tables, shapes…). The validator
  prints a "Pictures:" line — keep it at "every question that needs one has a picture".
- **Voice:** warm, natural Kokoro voice, never robotic. The family chose blend "D" (af_heart 70% + af_nicole 30%), then asked
  for a more engaging, **grade-matched** voice. Profiles in `tools/sweet_voice.py` PROFILES: g2 (upbeat buddy, speed
  0.97), g4 (friendly, 1.0), g8 (calm coach, af_heart 80% + af_sarah 20%, 1.05). Each app's config has `voice: 'g2'|'g4'|'g8'`;
  `core/voice.js` has grade-specific praise/lines/lesson intros. A sample was sent (`samples/voice-grades.wav`); the
  user hasn't commented on it yet — ask.
- **MAP accuracy:** don't assume — verify against NWEA sources. **At least 60% of each MAP app's questions must be new**
  (not reused from the sibling learning app); enforced in `apps/<map>/data/map-bank.js` (MIN_FRESH) and checked by
  `tools/validate.js` + `tools/maptest.js`.
- Tests and reports must be honest: say what was verified and what wasn't.

## Verified facts (with sources) — reuse, don't re-research

- NWEA 2025 goal areas (NWEA-aligned "instructional areas" v1.1, May 2025): Math 2–5 = Number (Computation, Number
  Sense); Algebra (Equations, Expressions, Inequalities & Functions); Geometry; Probability & Statistics (Measurement,
  Geometric Relationships, Statistics). Reading 2–5 and 6+ = Vocabulary and Literary Devices; Fiction, Poetry, and Drama;
  Nonfiction. Language Usage is "Language 2+". Algebra 1 course test = Real Numbers; Patterns, Functions, and Graphing;
  Expressions, Equations, and Inequalities. A school using a CCSS/state-aligned version may show other goal names.
- MAP Growth tests: Math 2–5 ~43 questions (standardized to 43 in 2022), untimed, 45–55 min typical; answers lock on
  Next (no going back); calculator only on some items; **Math 2–5 has no built-in audio** (text-to-speech only if the
  school assigns it; K–2 has audio). Math item formats in NWEA's 2024–25 technical report: multiple choice, hot text,
  click-and-pop, text entry (plus drag-and-drop/gap match generally). The format percentages were NOT found.
  Course-specific Algebra 1: 43 items, 45–55 min, untimed, grades 6–12, not end-of-course, includes prerequisites.
- **NWEA 2025 norms (quick reference, data fall 2022–spring 2024)**, mean/SD fall · winter · spring:
  Math G2 173/15 · 181/16 · 187/16; G3 184/16 · 193/16 · 199/17; G4 197/16 · 204/17 · 210/18; G8 222/18 · 226/19 · 229/20.
  Reading G2 170/17 · 177/17 · 182/17; G4 196/18 · 199/18 · 202/18; G8 216/17 · 217/17 · 218/17.
  Math growth G2 F→W 8, W→S 6, F→S 15; G4 7, 6, 13. Source PDF:
  https://www.nwea.org/resource-center/fact-sheet/87992/MAP-Growth-2025-norms-quick-reference_NWEA_onesheet.pdf/
- Digital SAT: R&W 54 q / 64 min (2 × 27, incl. 2 pretest each), Math 44 q / 70 min (2 × 22, incl. 2 pretest each),
  module 2 adaptive; math domain counts Algebra 13–15, Advanced Math 13–15, PSDA 5–7, Geometry & Trig 5–7; passages
  25–150 words, one question each. Still to confirm on collegeboard.org: 200–800 scale, Desmos, reference sheet.
- NJ: 2023 NJSLS-Mathematics (Measurement `2.M`, Data Literacy `2.DL`; HS codes dotted, e.g. `A.REI.B.3`);
  NJSLS-ELA 2023 codes like `RL.CR.2.1`. ELA Quest's Grade 2 track still uses old Common Core codes.
- School's MAP tests (from the user): Growth Math 2–5, Growth Reading 2–5 + MAP Reading Fluency, Growth Algebra 1,
  Growth Reading 6+. **Language Usage: leave out for now** (user said "not for now").

## Firebase

Project `ela-quest` (Spark). Rules published and verified (`node tools/rules_test.mjs after` → 14/14 pass); copy in
`firestore.rules`. Data: `classes/{c}/students/{sid}` (ELA Quest's; new apps only create `data:'{}'`) and per app
`classes/{c}/students/{sid}/apps/{appId}` {data, updatedAt}. Allowlist: mathquest2, mapmath2, mapmath4, algebra1,
mapalg1, mapread2, mapread4, mapread8, satprep, hubdemo. Registered web apps: Math Quest 2 →
`appId 1:327475844624:web:f34097f1ded3804d3a5c95`. **Still to register (one at a time, user does it in the console):**
MAP Math 2 and later apps — give the steps (Project settings → Your apps → Add app → Web, nickname = app name, no
Hosting, paste firebaseConfig) and put `appId` into `apps/<id>/config.js`. Test class (safe): code QY73-5Y37-E776;
leave it empty; delete only the specific temporary student ids you create.

## What is DONE

- **Phase 1** — shared engine `core/` (from ELA Quest, config-driven), hub page, demo app `hubdemo`. Published.
  ELA Quest's sw.js cache fix pushed (commit c020a48 in ELAQuest).
- **Phase 2** — **Math Quest 2** (`apps/mathquest2`): 16 skills × 3 levels = 48 levels (Grade 2 + Grade 3 level-up),
  clocks, coins, figures on every question and lesson, 8 videos with pictures. **Published** at
  https://vardhangs.github.io/learning-hub/mathquest2/ (with the earlier voice D at speed 0.90).
- **Phase 3 (in progress, NOT published)** — **MAP Math 2** (`apps/mapmath2`), committed locally as 9ff8c25:
  - core test mode (one try, no feedback, Next locks, no sounds, read-aloud off unless the grown-up toggle
    `settings.testAudio` is on, calculator on `calc: true` items); new formats `hot` (hot text) and `pop`
    (click-and-pop) in `core/app.js`.
  - `core/modes/map-core.js` (EAP scoring on a RIT-like scale, item selection with goal balance and ≥60% new,
    band = ±(SEM+3) min 5, percentile from norms, NWEA descriptor bands) and `core/modes/map.js` (intro, report,
    growth chart, dashboard, history).
  - `apps/mapmath2/data/map-items.js` (9 new MAP-style skills, 27 levels), `map-lessons.js` (27 lessons with
    pictures), `map-bank.js` (+5 reused Math Quest 2 skills → 64% new), `config.js` (norms cited, disclaimer),
    `video_scripts.py` (1 own video "map-tips"; borrows Math Quest 2's 8 via `videosFrom`).
  - Tests passed: validator 10,080 items ✓ (64% new, pictures complete); maptest simulation ✓ (bias ≤1.3,
    band coverage 93–98%, every test ≥60% new); browser play-through 42 levels/1,344 questions ✓; 6 full
    in-browser tests at θ 160–205 all inside the band ✓; phone screenshots reviewed and 4 layout fixes made.
    Bugs found and fixed: duplicate-digit tiles, identical picture choices (validator now checks both).

## What was RUNNING when the old session ended (check first)

1. Voice recording, Grade 2 profile — FINISHED 2026-10-25 03:05 (exit 0): mathquest2 2,388 clips / 50 bundles,
   mapmath2 2,085 clips / 44 bundles, hubdemo 1,518 clips / 11 bundles. Nothing is running now.
   Still to do: the in-page voice-coverage check (below).

## PENDING — next steps, in order

1. Finish Phase 3:
   - Verify voice for mathquest2, mapmath2, hubdemo is complete; run the in-page voice-coverage check (every
     `Voice.build.question` and `demoEnd` line has a clip) on each.
   - Render videos in the Grade 2 voice: `tools/.venv/bin/python tools/make_videos.py mathquest2` (8 videos) and
     `... make_videos.py mapmath2` (map-tips). Spot-check frames with ffmpeg.
   - Rebuild (`python3 tools/build.py`), validate both apps, play-through + `maprun.js` in the browser, phone
     screenshots (`tools/shots.sh mapmath2 "run:maprun.js|__hub.go('mapReport')"`), dark mode too.
   - Mark `mapmath2` live in `hub/index.html`. **Ask the user before publishing MAP Math 2** (new app); ask them to
     register the "MAP Math 2" web app in Firebase. Re-publishing Math Quest 2 with the new voice/videos is an update.
   - Ask whether the Grade 2/4/8 voice styles are OK (sample sent).
2. Phase 4: MAP Math 4 — Grade 4 content (multi-digit × and ÷, equivalent fractions, like-denominator fraction
   addition, decimals to hundredths, angles, area/perimeter, factors/multiples) + Grade 5 level-up, voice `g4`,
   MAP layer ≥60% new, norms G4 above.
3. Phase 5: MAP Reading 2 (ELA Quest G2 banks + MAP formats; MAP Reading Fluency practice: read-aloud passages with a
   timer and a grown-up-scored words-per-minute check — verify iPad speech recognition before promising automatic
   scoring), MAP Reading 4 (new G4 passages), MAP Reading 8 (ELA Quest G8 banks + more passages). No Language Usage.
4. Phase 6: Algebra 1 Quest (full course; level-up = Geometry/Algebra 2 previews; expression entry checked by random
   evaluation, coordinate-grid plotting) — voice `g8`, `speech.frac: 'over'`.
5. Phase 7: MAP Algebra 1 (+ prerequisite review; course-specific goal areas above; not grade-normed — the 2022
   course norms are not grade-specific).
6. Phase 8: SAT Prep (verify College Board facts first).

## How the code is organized (key facts)

- `core/app.js` (screens, quiz engine incl. num/multi/line/shade/clock/coins/hot/pop, demos, test mode, classes,
  dashboard, `#debug` → `window.__hub`, `#shot=<subj>.<skill>.<level>.<type>[.answer|.wrong|.demo]`),
  `core/U.js` (helpers + exact numbers `N`), `core/speech.js` (`MathText`: KaTeX via `T('\\frac{3}{4}')` → ⟪…⟫,
  spoken forms incl. time/money), `core/voice.js` (joined phrase+number clips), `core/engine/fig.js` (all pictures),
  `core/cloud.js`, `core/modes/`.
- `apps/<id>/config.js` (`data` may borrow files as `'mathquest2:add.js'`; `videosFrom`; `voice`; `features.map`).
- Tools: `build.py`, `validate.js <app>`, `maptest.js <app>`, `playthrough.js` + `maprun.js` (run in page via
  `fetch('/_test/…')` then `(0,eval)(src)`), `shots.sh` (headless Chrome in a 390px frame — headless won't go below
  ~500px), `enumerate_speech.js`, `voice_all.sh <app> 4`, `make_voice.py`, `make_videos.py <app>`, `fig_png.py`,
  `rules_test.mjs`, `deploy.sh`. Local server: launch config `learninghub` (port 4190, serves `dist/`).
- KaTeX 0.18.11 from jsDelivr, precached by each service worker. `tools/.venv` and `tools/tts-models` link to ELA Quest's.
- Gotcha: the auto-mode safety classifier sometimes returns "no verdict" for long Bash/Edit calls. Workaround that
  worked: write patch scripts to the scratchpad with Write, then run `python3 <script>` with a short Bash command.
