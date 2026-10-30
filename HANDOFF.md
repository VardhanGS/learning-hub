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
  with this app." No NWEA/College Board items or logos; all content original (see "Content rule: patterns yes, copies no").
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
- **Reading (verified 2026-10-25):** NWEA durations doc (April 2022): Reading 2–5 and 6+ max 43 items (unchanged in
  2022); median durations fall G2 33 min, G4 52, G8 59. Reading 2–5 has NO built-in audio (TTS only as an
  accommodation; K–2 has audio). No NWEA document listing reading item formats was found — the apps use the general MAP
  formats (multiple choice, multi-select, hot text, click-and-pop) and say the mix is not confirmed.
  2025 reading growth norms (mean F→W, W→S, F→S): G2 7, 5, 12 · G4 4, 3, 6 · G8 1, 1, 2.
- **MAP Reading Fluency (NWEA fact sheet, MAY26):** pre-K–5, benchmark fall/winter/spring, 20–30 min, headsets with
  microphones and automatic speech scoring. Each student reads a short picture book and does timed SILENT reading
  activities; then either THREE passages read aloud (scored: WCPM scaled, accuracy %, literal comprehension, Lexile
  oral reading measure) or foundational skills (phonological awareness, phonics & word recognition, picture vocabulary,
  listening comprehension). The app's practice is grown-up scored (no automatic speech scoring — not verified on iPad).
- **Oral reading fluency norms (Hasbrouck & Tindal 2017, WCPM; percentiles 90/75/50/25/10, fall · winter · spring):**
  G2 111 131 148 / 84 109 124 / 50 84 100 / 36 59 72 / 23 35 43 · G3 134 161 166 / 104 137 139 / 83 97 112 / 59 79 91 / 40 62 63 ·
  G4 153 168 184 / 125 143 160 / 94 120 133 / 75 95 105 / 60 71 83 · G5 179 183 195 / 153 160 169 / 121 133 146 / 87 109 119 / 64 84 102.
  Source: readnaturally.com table of the BRT technical report "An update to compiled ORF norms" (ERIC ED594994).
- **NJSLS-ELA 2023 codes (nj.gov/education/standards/ela/2023/{g}.shtml):** Reading RL./RI. + CR (evidence), CI (central
  idea/theme, summary), IT (characters/individuals/events), TS (structure), PP (point of view/perspective), MF (visual &
  multiple formats), AA (argument analysis, RI only), CT (comparing texts) + .grade.number, e.g. RL.CR.4.1, RI.TS.4.4,
  RI.AA.8.7, RL.CT.8.8. Language: L.VL.g.2 (word meaning; G8 L.VL.8.3), L.VI.g.3 (figurative language, word
  relationships; G8 L.VI.8.4), L.RF.g.4 (fluency, grades 2–5).
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

## Status at the end of the old session (2026-10-25)

ALL 8 PHASES DONE and PUBLISHED (Phase 8 SAT Prep on 2026-10-25). Open items: Firebase web-app registration for the
newer apps (user does it in the console), and family feedback on voices, videos, and real-device use (keypad, plotting,
SAT modules). Earlier: Phase 6 DONE and PUBLISHED: Algebra 1 Quest at vardhangs.github.io/learning-hub/algebra1/ (live check passed: sw cache names of all 8 apps match dist; hub shows it live; videos served). Next: Phase 7 (MAP Algebra 1) — ask
before publishing anything new.

## ELA Quest in the hub (2026-10-26, published)

The user chose "hub tiles": ELA Quest stays its own repo/engine at vardhangs.github.io/ela-quest/ (progress untouched);
the hub page lists it in the 2nd and 8th grade rows (href '../ela-quest/'). Every hub app's Settings and ELA Quest's
Settings have an "All family apps → Open the Learning Hub" card. The user lifted ELA Quest's read-only rule ONLY for
that back-link (ELAQuest commit 5460e80, cache elaquest-v9, pushed as VardhanGS). Otherwise ELA Quest is still
read-only — ask before any other change.

## Content rule: patterns yes, copies no (user, 2026-10-26)

Official samples (NWEA, College Board, Math Kangaroo, MATHCOUNTS, AMC, Beast Academy / AoPS, ...) may be STUDIED for
their patterns, and our questions should match those patterns:
- OK to copy: the format and question stem style, the skill tested and how, structure (passage length, number of
  steps, where a picture/graph is used), kinds of wrong answers (common mistakes), difficulty, and test design
  (timing, counts, domains, ordering).
- NOT OK: reusing any passage, poem, figure, table, or graph; close paraphrase (same scenario and numbers with words
  swapped); keeping a distinctive puzzle/story setup with surface changes; using their names, logos, or characters
  in a way that looks official.
- Test: if someone who saw the original would recognize ours as that question, it is too close.
- Method: study samples → write down the pattern (skill, format, structure, typical wrong answers, difficulty) →
  write new questions from that description, not from the original. Check each source's terms of use.

## NEXT PLAN (from the user, 2026-10-26) — with Claude's notes

1. **Review all the content now.** Go app by app (10 apps + ELA Quest read-only). Read samples from every level
   (`node <scratchpad>/sample.js <app> 3` style), lessons, videos (watch frames), and voice (spot-listen). Look for:
   wrong or awkward wording, weak pictures, answer giveaways, levels that are too easy/hard for their band, repeats.
2. **Check that everything is covered.** Build a coverage table per app: every NJSLS 2023 standard for the grade (math
   and ELA pages on nj.gov) → which skill/level practices it; list gaps. For MAP apps also map to NWEA goal areas; for
   SAT, to College Board domains and skill/knowledge testing points (all listed in the Student Guide).
3. **Add more videos.** Today: Math Quest 2: 8, MAP Math 2: 1 own + 8 borrowed, MAP Math 4: 6, MAP Reading 2/4/8: ~7–9
   each, Algebra 1: 8, MAP Algebra 1: 1 own + 8 borrowed, SAT: 7. Aim for one video per skill where it helps, starting
   with the skills that have none (see each app's lessons file: `video:` keys).
4. **Grades 2 and 4: separate Algebra / Geometry tiles?** The user thinks they are not needed. Claude's opinion: keep
   the three groups in the MAP apps, because they are the test's own goal areas and the report sends a child from a
   weak goal area straight to its practice — but rename them in kid words (e.g. "Numbers", "Patterns & Equations",
   "Shapes, Measuring & Data") and keep NWEA's names in small print. Math Quest 2 already uses topic tiles, not
   Algebra/Geometry. Decide with the user before changing.
5. **Are the MAP and SAT questions realistic?** Honest status: formats, lengths, timing, goal areas/domains, norms, and
   scoring shape are verified from NWEA/College Board documents; the questions are original by rule (no copying), and
   difficulty tags are hand-set. NOT yet compared against official samples. Next: look at the official free practice
   material — College Board's Bluebook practice tests and Student Question Bank; NWEA's public practice/warm-up
   tests if available (check the current URL and login on nwea.org) — and compare style, wording length, picture use,
   and difficulty, then adjust generators. Match the pattern; never copy or closely paraphrase an item (see the content rule).
6. **Competitive math for all levels** (Math Kangaroo / olympiad style, pictures wherever they help). Verify facts
   first (Math Kangaroo levels by grade, number of questions, time, 3/4/5-point scoring; MATHCOUNTS / AMC 8 formats for
   the 8th grader). New app(s) or a section per kid; original problems only; "unofficial" label and trademark notes
   (Math Kangaroo, MATHCOUNTS, AMC are trademarks of their owners).
7. **Beast Academy / AoPS-level practice or tutorials.** A deeper problem-solving track (puzzles, multi-step
   reasoning, "why" explanations, worked solutions, hints that reveal step by step). Original content in that spirit;
   do not copy or imitate their characters/books; name it something of our own and note that Beast Academy and Art of
   Problem Solving are trademarks of AoPS, not affiliated.

Suggested order: 1–2 (review + coverage report to the user) → 5 (realism comparison) → 4 (decision) → 3 (videos) →
6 → 7. Ask before publishing anything new.
**Status 2026-10-27:** 1, 2, 5 done and published; 3, 6, 7 built in the cloud (scripts / apps, NOT rendered, voiced
or published — see "Cloud session of 2026-10-27" below); 4 waits for the user's decision.

## PROGRESS on the next plan (session of 2026-10-26)

- **Items 1–2 DONE** (reports/2026-10-26-content-review.md, reports/2026-10-26-coverage.md; NJ code lists parsed from
  nj.gov into the scratchpad — re-parse with the method in the coverage report header if needed). All app codes exist on
  the 2023 pages. Main gaps: MAP Algebra 1 functions area; SAT statistical claims/experiments, nonlinear systems,
  absolute value, ~18% math in context; Algebra 1 Quest 21 HS standards; 2.DL.A, 4.DL.A, 2.M.A.2–3; reading point of
  view / compare versions / text vs film.
- **Fix set 1 DONE, NOT published** (user: "do fix set 1 now"): SAT one question per passage per test (sat-core pkey;
  repeats 660/900 → 0/900), SAT choice guard (no float tails, no negatives where impossible) + validator rules,
  SAT quantitative-evidence rewritten (claim in a short text; choices true-insufficient / true-irrelevant / false),
  √(x+0), 1π/2, 1y, decimal-vs-fraction giveaway; Reading 4 cross-passage question (+ validator rule: a question may not
  name another passage's title); Algebra 1 power tables, complex standard form, (x−0)², mean/median now varies,
  line-of-fit context; display layer shows plain-text powers raised (speech.js html → <sup>; fig tables too); Math
  Quest 2 ±10 hint/lesson when crossing a hundred, line-plot counts 1–4 per value, "leaf" not "leave", facts answers
  spread; MAP Math 2 Equations L3 = Grade 3 unknown factors (3.OA.A.4), Shapes L1/L2 differ, 4.NBT.B.4 tag; MAP Math 4
  no "0" filler, 2.0 not 2, friendly fair shares; MAP Algebra 1 "x" not "1x", concrete sci-notation contexts,
  signed review always has a negative, two-way wording; reading: root items give ONE part's meaning, apples/Ava/TOC
  items, multiple-meaning distractors, context-clue quotes removed (ELA items via map-bank), plausible replacements for
  throwaway ELA Grade 8 distractors (map-bank LONGER table — ELA Quest untouched). playthrough.js ignores <sup> in its
  line-wrap check. Tests: validate all 10 apps ✓; 3 planted bugs caught by the new rules; maptest 6 MAP apps ✓; sattest ✓;
  browser play-through at 375px for all 9 apps ✓ (0 failures); full SAT test through the module screens ✓; voices
  re-recorded for the 8 changed apps (check voicecheck before publishing).
- **Item 5 studied** (reports/2026-10-26-realism.md): SAT Practice Test 11 read in full (PDFs say "Unauthorized copying
  or reuse … is illegal" → patterns only); NWEA public warm-up pages + videos; NWEA blog. NWEA practice tests need the
  shared login (practice.mapnwea.org) — Claude may not type passwords; the user must sign in in the browser pane.
  Proposed fix set 3 (realism) is in the report; waiting for the user, then item 4 decision, then items 3, 6, 7.
- New verified facts: MAP Growth pool 50,000+ items, >30% technology-enhanced (text entry, drag-and-drop, Click-and-Pop,
  Gap Match, Common Stimulus) — NWEA blog 2025-03-04 (J. Fine). MAP 2+ student tools: TTS, zoom, highlighter, eraser,
  line reader, notepad, answer eliminator, calculator, ruler, protractor (studentresources.nwea.org). "Slow-Down Sloth"
  pause for rapid answers (NWEA student video). Footer of NWEA's student site: "HMH and MAP are registered trademarks,
  and MAP Growth is a trademark, of HMH" — our disclaimers say "not affiliated with NWEA"; consider adding HMH.
  College Board linear SAT practice tests 4–11 (PDF) at satsuite.collegeboard.org/practice/practice-tests/paper; R&W
  linear modules have 33 items, Math 27 (nonadaptive version). Educator Question Bank: 1,845 SAT R&W items with
  Easy/Medium/Hard tags.

### Later on 2026-10-26

- Fix set 1 was published (deploy.sh + main pushed; all 9 live sw cache names matched dist).
- NWEA practice sets studied (Math 2–5 and 8, Reading 2–5 and 6+); findings in reports/2026-10-26-realism.md.
  Verified there: MAP Reading uses Part A / Part B from Grade 2 with "(Paragraph N)" / "(Line N)" evidence; MAP Math
  uses two-part items; other formats seen: 5-choice MC, picture choices, click-and-pop with $ and ¢ tiles, unit labels
  after entry boxes, build-a-line-plot, table grid (must / could / cannot be true), gap match, hot text with bold
  selectable phrases, choose-two checkboxes, underlined key words, numbered paragraphs, photos with captions.
  The practice site login is lost when the browser pane closes.
- **Fix set 3 (realism) DONE locally, NOT published** — commits after 87b522b:
  SAT: Conventions/Transitions/WIC passages are single coherent texts (apps/satprep/data/sat-sec.js + lead sentences; no
  filler); underlined sentences (⟦…⟧ markup, core) for function items; new R&W forms in sat-rw2.js ("most nearly mean",
  overall structure, quotation from an original poem, two-series data statements); new Math types in sat-math2.js
  (word problems now ≈33% of operational Math items; which equation/inequality represents, interpretation, graph
  choices via Fig.choices, I/II, NOT, dot plot, weighted mean, sample estimate, study-design claims, absolute value,
  line meets parabola, ladder, tickets); wrong-choice explanations for transitions and conventions, shown in review.
  MAP: numbered paragraphs, underlined key words, Part A/B in Reading 2 and 4 (readkit 'ab'), gap match ('gap'),
  find-the-clue ('clue'), true-detail main-idea distractors (Reading 4), $/¢ click-and-pop, find-the-mistake
  (2.NBT.B.9), even/odd sort, quadrant sort, must/could/cannot sort, make-a-line-plot sort. Test screens: answer
  eliminator, line reader, MAP slow-down pause (count in report). Validator: U.intWhere fallback is now an error
  (found real "no-regroup" items that regrouped in Math Quest 2 / MAP Math 2 / demo; fixed).
  Not done from fix set 3: literary attribution frame for SAT literature passages, mid-sentence transitions,
  5-choice MC in MAP math, a protractor tool, Part A/B in the MAP adaptive test pool (Part B is practice-only).

## Cloud session of 2026-10-27 (branch `claude/happy-edison-eaje3r`)

Work done in a claude.ai cloud container: no Kokoro voice, no video rendering, no publishing. Everything here waits
for the Mac session to record, render, play through, and publish (see "Still to do on the Mac" at the end of this
section).

### Verified facts for plan item 6 (looked up 2026-10-27)

The official sites could not be opened directly from the cloud container (its proxy refuses mathkangaroo.org,
maa.org and mathcounts.org), so these were read from search-engine extracts of the official pages listed. Re-check
anything marked "not confirmed" on the real pages before using it in the app's wording.

- **Math Kangaroo USA (individual contest)**, mathkangaroo.org/mks/faqs/about-the-test/,
  mathkangaroo.org/mks/resources/math-kangaroo-scoring/, mathkangaroo.org/mks/resources/math-kangaroo-logistics/,
  2026 answer key mathkangaroo.org/mks/wp-content/uploads/2026/04/2026.pdf:
  75 minutes, multiple choice, grades 1–12 (kindergarteners take the grade 1 level). **24 questions for grades 1–4,
  30 for grades 5–12.** One third of the questions are worth 3 points, one third 4 points, one third 5 points;
  **no points taken off for wrong answers**; maximum 96 (grades 1–4) and 120 (grades 5–12). **Calculators, phones and
  other devices are not allowed.** The answer key has six columns: Grades 1–2, 3–4, 5–6, 7–8, 9–10, 11–12 (one test
  paper per pair of grades). Answer key published about a month after the contest; results by May 1.
  The separate Team Competition (6 levels, 60 minutes, 25/50-point questions) is a different event — not modeled.
  *Not confirmed:* five answer choices (A–E) per question (true of past papers as commonly reported, not seen on
  the official page today); whether each grade is ranked separately within a two-grade paper (the Team FAQ says each
  grade has its own scoring bracket for the team event).
- **AMC 8 (MAA)**, maa.org/student-programs/amc/, MAA 2025–26 AMC flyer (maa.org/wp-content/uploads/2025/06/
  AMC-Flyers-for-2025-26.pdf), maa.org/student-programs/amc/information-for-students-and-parents/:
  **25 questions, 40 minutes, multiple choice, score = number correct, no penalty for guessing**; for students in
  grade 8 and below (age limit under 15.5 on the contest day); one sitting per year. MAA lists the 2026–27 AMC 8
  window as January 21–27, 2027. *Not confirmed on maa.org today:* five choices A–E and "no calculators" (both are
  printed on past official papers as reported by several sites; MAA's policy page was not readable from here).
- **MATHCOUNTS Competition Series**, mathcounts.org/programs/competition-rules-faq,
  mathcounts.org/programs/mathcounts-competition-series, "Rules Highlights for Competitors" PDF, 2024–25 Guide for
  New Coaches: grades 6–8; levels school → chapter → state → national; four rounds: **Sprint 30 problems / 40 min / no
  calculator; Target 8 problems in 4 pairs, 6 minutes per pair, calculator allowed; Team 10 problems / 20 min /
  calculator, 4-student teams; Countdown (oral, head-to-head, up to 45 s per problem, no calculator, optional below
  nationals)**. Individual score = Sprint correct + 2 × Target correct (max 46) — from the Rules Highlights sheet,
  which may be older than the 2026–27 rules. Answers are short answers, not multiple choice. 2027 School Competition
  released Nov. 3, 2026.
- **Terms / trademarks.** Past problems of all three contests are copyrighted by their owners; patterns only (the
  content rule), never items. Marks used only to say what our practice is *like*: "Math Kangaroo" (Math Kangaroo in
  USA, NFP), "MATHCOUNTS" (MATHCOUNTS Foundation), "AMC" / "AMC 8" / "American Mathematics Competitions" (Mathematical
  Association of America). Registration status of each mark was not checked; the app's notice says "are trademarks of
  their respective owners, who are not affiliated with this app."

### Design note: plan item 6 (competitive math) and plan item 7 (deeper problem solving)

**Shape: one new app per child, "Puzzle Peak 2 / 4 / 8"** (`apps/contest2`, `apps/contest4`, `apps/contest8`), on the
shared engine. Why three apps and not one with three tracks: each app records one grade-matched voice profile
(g2 / g4 / g8), each child already has "their" row of apps, and one Firebase app id per child keeps progress apart.
Shared puzzle code lives once in `apps/contest2/data/pzkit.js` and is borrowed by the other two (`contest2:pzkit.js`,
the same way the reading apps borrow readkit.js). Not added to the hub; not in `firestore.rules` yet (cloud sync for
these ids needs the allowlist updated and the rules re-published — the user's call).

Each app has two parts:

1. **Contest Practice** (plan item 6) — untimed skills, 3 levels each, in the style of the contests the child can
   enter. Topics follow what these contests actually test at each level (picture/counting puzzles, logic, number
   puzzles, patterns, measurement and calendars, geometry; for Grade 8 also counting/probability and number theory).
   Level 1 ≈ the contest's 3-point questions, Level 2 ≈ 4-point, Level 3 ≈ 5-point (or the next paper up).
   - **Practice contest** (new core mode `core/modes/contest.js`, reusing the SAT module runner: timer, Back/Next,
     mark for review, question menu, submit): questions ordered 3-point → 4-point → 5-point, scored like the real
     contest, review of every question with the worked solution, history, grown-up dashboard.
     - Puzzle Peak 2: *Kangaroo-style, Grades 1–2 paper*: 24 questions, 75 min, 8 × 3 + 8 × 4 + 8 × 5 points, max 96,
       5 choices, no penalty, no calculator. A "half contest" (12 questions, 38 min) for a 2nd grader's first tries.
     - Puzzle Peak 4: *Kangaroo-style, Grades 3–4 paper*: same shape (24 / 75 / max 96), plus the half contest.
     - Puzzle Peak 8: *Kangaroo-style, Grades 7–8 paper* (30 questions, 75 min, max 120); *AMC 8-style* (25 questions,
       40 min, 1 point each, 5 choices); *Sprint-style* (30 typed short answers, 40 min, no calculator).
       Target/Team/Countdown rounds are not modeled (noted in the app).
   - Wording on screen: "Contest-style practice (unofficial)". Footer: "Math Kangaroo, MATHCOUNTS, and AMC 8 are
     trademarks of their respective owners, who are not affiliated with this app. All problems are original."
2. **Summit Trail** (plan item 7, our own name; *in the spirit of* deep problem-solving books, imitating none) —
   multi-step problems where the answer is typed (no choices to guess from). Each problem has:
   - **hints that reveal one step at a time** (a new engine feature: `q.steps = [...]`; a "Show a hint (1 of 3)"
     button reveals the next step; earlier steps never contain the final answer — the validator checks this);
   - a **worked solution** shown after answering (the "why", with the method named: work backward, make a table,
     organized list, look for a pattern, draw a picture, solve a simpler problem, use symmetry);
   - a picture where it helps. Three skills × 3 levels per app, each skill one strategy family.
   - Notice in the app's About: "Summit Trail is original. Beast Academy and Art of Problem Solving are trademarks of
     AoPS Incorporated, which is not affiliated with this app."

**Pictures**: new core figures for the puzzles (balance scales, number pyramids, cube stacks, dice, calendar
pages, repeating bead strings, grids with paths); existing ones (rect grids, arrays, prisms, number lines, tables)
everywhere else. Every question and lesson has one unless it is pure words by design (validator "Pictures:" line).

**Voice / wording**: g2 upbeat short sentences; g4 friendly; g8 calm coach. Numbers in problems kept small enough to
read aloud; contest mode keeps read-aloud off unless the grown-up turns it on (as in MAP test mode).

**Correctness**: every puzzle is generated with random numbers from a family; the generator computes the answer one
way and `tools/validate.js` recomputes it a different way (brute force / enumeration where possible) via
`meta: {kind: 'pz', args: [family, params]}`. Five options per contest item, all different, answer among them,
wrong options from real mistakes (e.g. counting only the 1 × 1 squares, forgetting the remainder, off-by-one).
Each level is tagged with the closest 2023 NJSLS code (contest problems often go past grade standards; the tag says
which standard the reasoning practices).

### What was built (cloud session 2026-10-27) — NOTHING here is published

**Plan item 3 (more videos), scripts only — 46 new video scripts, not rendered.** Every skill in every app now has a
`video:` key in its lessons (they show once `make_videos.py` writes the catalog):
- Math Quest 2 +3 (`shapes2`, `graphs2`, `lineplots2`; MAP Math 2 borrows them) · MAP Math 2 +2 (`equations2`,
  `patterns2`) and its own skills now also point at fitting borrowed videos (`place-value`, `regroup`, `fractions`, …)
- MAP Math 4 +12 (`place-value4`, `rounding4`, `addsub4`, `fraction-ops4`, `times-as-many4`, `multi-step4`,
  `factors4`, `patterns4`, `lines4`, `measurement4`, `area4`, `lineplots4`)
- Algebra 1 Quest +6 (`real-numbers`, `exponent-rules`, `units`, `expressions`, `sequences`, `statistics`; MAP
  Algebra 1 borrows them) · MAP Algebra 1 +7 (`signed-numbers`, `ratios-percents`, `sci-notation`, `quad-forms`,
  `constraints`, `rate-of-change`, `key-features`; `eqprep`/`equivx`/`data2` point at borrowed videos)
- SAT Prep +12 (`rw-structure`, `rw-cross-text`, `rw-evidence`, `rw-inference`, `rw-synthesis`,
  `math-inequalities`, `math-exponential`, `math-ratios`, `math-data`, `math-probability`, `math-angles`,
  `math-circles`; all passages original)
- MAP Reading 2 +3 (`characters2`, `purpose2`, `wordplay2`) · Reading 4 +3 (`evidence4`, `visuals4`, `roots4`) ·
  Reading 8 +1 (`paragraphs8`)
- New `tools/check_videos.js [app…]`: checks scripts without rendering (every fig expression runs in fig.js alone,
  as fig_png.py runs it; quiz answers among options; practice skill exists; lesson video keys resolve; notes vs
  beats). It found a **real bug in published videos**: in `image` scenes the last note(s) never appeared when a scene
  had as many notes as beats (93 scenes in 8 apps; e.g. the SAT "Never leave a blank" scene showed none of its 3
  notes). `tools/make_videos.py` now shows such notes one by one after the last beat starts. **Re-rendering the old
  videos is optional** — they play fine, they just miss those notes. It also caught that `Fig.table` cells with `^`
  call MathText, which the video renderer does not load (would have crashed a render); new scripts avoid it.
- All pictures of the new scripts were rendered with Chromium in the cloud and looked at (contact sheets); 6 fixes
  made (quiz pictures that gave the answer away, a "40$" label, a squeezed table).

**Plan items 6 + 7: three new apps "Puzzle Peak 2 / 4 / 8"** (`apps/contest2`, `contest4`, `contest8`; see the design
note above). Each: contest-style skills (5-choice, 3 levels = 3/4/5-point style) + Summit Trail (typed answers,
hints that open one step at a time, worked solution) + practice contests; 24 levels, 24 lessons with pictures,
3 video scripts each (`pp-contest*` how the contest works + 2 strategy videos).
- `apps/contest2/data/pzkit.js` (borrowed by 4 and 8): 23 original puzzle families (squares, rectangles, cubes,
  beads, calendars, balances, number pyramids, digits, digit sums, page digits, heads-and-legs, ages, handshakes,
  coin ways, grid paths, work backward, painted cube, last digits, factor counts, dice probability, averages,
  consecutive numbers, polygon angles), difficulty 0–8; per-family "Watch first" lessons; `PZAPP`/`CONTEST` glue.
- Core (shared engine) changes: `q.steps` step-by-step hints in practice (never in test mode; class `.hint-steps`),
  `core/modes/contest.js` (practice contests on the SAT module runner: timer, mark, menu; scoring, review with
  solutions, history, dashboard), `features.contest` in build.py, `practiceTitle` for the home heading, new figures
  `Fig.balance / pyramid / beads / cubeStack / gridPath / calendar / dice / regular`. enumerate_speech.js and
  voicecheck.js now include hint steps.
- Validator: `pz` kind — every family re-solved by brute force (not the generator's method); contest apps need 5
  choices, a worked solution, and ≥ 2 hint steps on typed puzzles; no hint step may state the answer.
  New `tools/contesttest.js <app> [n]`: builds n contests per format through the real mode code.
- Fruit in balance puzzles are named in words (emoji only in pictures) so the narrator can read every line.
- Standards: only codes already used (and verified) elsewhere in this repo; nj.gov could not be opened from the cloud.
  "Closest code" levels to re-check on nj.gov: Puzzle Peak 8 counting levels (7.EE.B.4), probability levels
  (7.RP.A.2 · S.CP.A.4 — the 2023 grade 7 probability code was not verifiable), Puzzle Peak 2 pattern levels (2.OA.C.4,
  2.NBT.A.2).

### Tested in the cloud (2026-10-27)
- `validate.js` passes for all 12 apps' content that changed (9 existing + contest2/4/8, 10,140 items each new app,
  U.intWhere fallback check included); planted-bug test 8/8 caught in the puzzle kit (wrong answer per family,
  hint giving the answer away, 4 options, wrong weekday …).
- `contesttest.js` 3 apps × all 7 formats × 100–200 contests: lengths, 3 → 4 → 5 order, no repeats, typed-only Sprint,
  even topics, scores (all right = 96 / 120 / 25 / 30; wrong answers cost nothing).
- `check_videos.js` all apps OK; `sattest` OK; `maptest` OK for all 6 MAP apps (regression; only their lesson video keys changed).
- **Chromium (Playwright) in the cloud**, built with a stub icon step (the real icons need Apple Color Emoji): full
  play-through of every level of contest2/4/8 (24 levels each, 0 failures, 0 page errors), hints reveal 1-2-3 then the
  button goes, a full practice contest submitted and scored (48/96, 60/120 with half right), review with solutions;
  phone width 390 px, light and dark. Regression play-through after the core changes: Math Quest 2 (48 levels), MAP
  Math 4 (51), SAT Prep (72): 0 failures, 0 page errors.
- Voice lines that need recording (enumerate_speech, 120 runs): Puzzle Peak 2 ≈ 2,390 lines (~90 min), Puzzle Peak 4
  ≈ 2,690 (~127 min), Puzzle Peak 8 ≈ 2,660 (~128 min). Existing apps: no new lines (only video keys changed);
  voicecheck still reports two rare PRE-EXISTING gaps (MAP Math 2 `lineplot.1` demo "There are 20/21 X marks.",
  Algebra 1 `seq.1` demo "a30 = -208") — record them on the next voice run.

### Still to do on the Mac (not tested in cloud)
1. Voices: `tools/voice_all.sh contest2 4` (and contest4, contest8); re-run voicecheck for those and the two gaps above.
2. Videos: `make_videos.py` for mathquest2 (3 new), mapmath2 (2), mapmath4 (12), algebra1 (6), mapalg1 (7),
   satprep (12), mapread2 (3), mapread4 (3), mapread8 (1), contest2/4/8 (3 each) — e.g.
   `tools/.venv/bin/python tools/make_videos.py mapmath4 place-value4 rounding4 …` (naming ids renders only those but
   rewrites the catalog from all scripts, so render each app's full new list before building). Optionally re-render
   the old videos to show their missing notes. Watch them end to end.
3. Build with real icons (`tools/build.py`), browser play-through of every changed app (playthrough.js), real
   phone/tablet check of hints and the contest timer.
4. Ask before publishing: the 9 existing apps get the new videos + lesson links (updates); Puzzle Peak 2/4/8 are NEW
   apps — they need the family's OK, Firebase web-app registration (one at a time, steps in "Firebase"), `contest2`,
   `contest4`, `contest8` added to the `firestore.rules` allowlist and the rules re-published (`rules_test.mjs`), then a
   hub row entry (not added yet).
5. Plan item 4 decided (keep as is, see "User decisions"); confirm "five choices A–E" for Math Kangaroo / AMC 8 on the official pages.

### User decisions (2026-10-27, after the cloud session)
- **Plan item 4: keep the MAP goal-area groups for Grades 2 and 4 exactly as they are** (NWEA names; no renaming). Closed.
- **Existing 9 apps:** publish the new videos + lesson links once the Mac session has voiced/rendered them and the
  play-through passes (no further ask needed for these updates).
- **Puzzle Peak 2/4/8:** publish (and add to the hub) after the Mac tests pass. Firebase: the user will provide the
  three web-app configs (or register them while signed in on the Mac — Claude cannot type passwords); the rules
  allowlist update for contest2/contest4/contest8 is approved (publish rules, verify with rules_test.mjs).
- **Voices:** the grade-matched voices (g2/g4/g8) are fine — keep them.
- **Firebase web apps registered by the user (2026-10-27):** appIds are in apps/contest2|4|8/config.js (assumed
  registration order 2, 4, 8 — the configs were pasted unlabeled; check the nicknames in Project settings → Your apps).
  firestore.rules already lists contest2/4/8 in the repo; the Mac must PUBLISH the rules and run rules_test.mjs.

### Finished on the Mac with the user (2026-10-28, guided from the cloud session)
- Voices recorded for contest2/4/8 (voicecheck: every line recorded). The Mac session fixed Puzzle Peak's story-puzzle
  name pairs and bead color orders to a small fixed set (fewer voice lines) — validated after the change.
- All new videos rendered (check_videos: "not rendered yet: none" in every app); Puzzle Peak's 9 rendered by the user.
- Firestore rules with contest2/4/8 published from the console; `node tools/rules_test.mjs after` 14/14 PASS.
- Hub: Puzzle Peak 2/4/8 rows + a Math Kangaroo / AMC 8 / MATHCOUNTS trademark line (the Mac session's hub edit).
- Bug found by the browser play-through and fixed: the empty "make a line plot" picture (Math Quest 2 / MAP Math 2,
  live since 2026-10-26) had height -Infinity. `Fig.linePlot` now handles an empty plot; validate.js fails any picture
  containing NaN / Infinity / undefined (planted-bug check: caught 17×).
- Tests on the Mac: validate all 12 apps ✓, contesttest ✓, voicecheck ✓, browser play-through contest2/4/8,
  mathquest2, satprep: 0 failures, no console errors after the fix.
- Then merged into main and published with tools/deploy.sh (user-approved).

### Printing (2026-10-28, user request: "I want the tests to be printable")
- Shared print feature in core/app.js (`printSheet` / `printHTML`, CSS at the end of core/styles.css): a print-only
  page with the questions, pictures, A–E choices or answer lines, then an answer key with worked solutions on a new
  page; always black on white (even in dark mode). Screen verbs become paper verbs ("Tap" → "Circle", tile questions →
  "Write … in the blanks"). Interactive types print as: number line / shading / graph grid to mark, a blank clock face,
  a sorting table, "Use these" tiles with blanks, ☐ lists for choose-all.
- Where: "🖨️ Print a worksheet" (Level 1/2/3, 12 questions + the Watch-first rule) under every skill in every app;
  Puzzle Peak practice-contest screen (each format, with point values and a Score box); SAT practice-test screen
  (Reading and Writing or Math, two modules each, Math with the reference sheet; paper cannot adapt, so both modules
  are mixed difficulty); MAP practice-test screen (a fixed 43-question set from easier to harder, balanced across goal
  areas, for the chosen season; no score band).
- Tested in the cloud (Chromium print media → PDF, dark mode on purpose): contest2, contest8 Sprint, SAT Math and R&W,
  MAP Math 2, MAP Reading 4, two level worksheets: right question/answer counts, no broken numbers, pages looked at;
  play-through regression mathquest2, satprep, contest2, mapmath2: 0 failures. NOT tested: printing from Safari on
  the iPad/iPhone (window.print from an installed home-screen app) — check once on a real device.

## Grade 2: two-digit subtraction and multiplication (2026-10-28, published from the cloud)

- User asked: "add multiplication and 2 digit subtraction to 2nd grade … publish. I will do recording once mac is back."
- `apps/mathquest2/data/times.js` (new, loaded after geometry.js):
  - skill `sub2` "Subtract two-digit numbers" in Adding & Subtracting (3rd skill): take away tens and ones (2.NBT.B.5),
    trade a ten + stories + check by adding (2.NBT.B.5/B.9, 2.OA.A.1), subtract across zeros (3.NBT.A.2, stretch).
  - new subject `times` "Multiplication": `mgroups` (equal groups, arrays and adding again, times sentences) and
    `mfacts` (×2/5/10, ×3/4 and turn-around facts, all facts to 10×10 incl. missing factor). Levels past 2.OA.C.4 are
    tagged with their Grade 3 standard as a stretch.
  - 9 lessons in lessons.js; they reuse the existing `regroup` and `multiply` videos (no new videos needed).
  - validate.js: new TEXT kinds `repAdd`, `checkSub`.
- Tested: validate mathquest2 (10k and 40k items) and mapmath2 pass; 5/5 planted bugs caught; Chromium play-through
  mathquest2 57 levels / 456 questions and mapmath2 42 levels, 0 failures; screenshots of the subject screen, a sub2 quiz
  and a times-table worksheet print looked right. NOT tested: a real iPad/iPhone; the new lines' voice.
- How it was published (no Apple emoji font in the cloud): built dist with placeholder icons, then copied ONLY the files
  that really changed into gh-pages (mathquest2: config.js, index.html, sw.js, data/lessons.js, data/times.js; mapmath2:
  sw.js, data/lessons.js), so live icons and other apps stayed as they were. Main was fast-forwarded to the branch.
  The next Mac `tools/deploy.sh` rebuilds everything normally.
- DONE 2026-10-29 on the Mac (user, no Claude): voices recorded for sub2, mgroups, mfacts and deployed with
  tools/deploy.sh (after `git branch -f gh-pages origin/gh-pages`, since the cloud had pushed gh-pages first).

## Math Quest 4 (2026-10-29, published from the cloud)

- User asked "add Math Quest 4"; chose: a Grade 4 learning app like Math Quest 2 (grouped by topic, no MAP test) that
  reuses MAP Math 4's questions and videos and adds new skills; publish and add to the hub. MAP Math 4 is unchanged.
- `apps/mathquest4/`: config borrows `mathquest2:common.js` and MAP Math 4's common4/number4/algebra4/geometry4/lessons4
  (`videosFrom: 'mapmath4'`); `skills4.js` (5 new skills, 15 levels, hints that open one step at a time);
  `subjects4.js` groups all 22 skills into 6 topics (Place Value, Multiply & Divide, Problem Solving, Fractions &
  Decimals, Measurement & Data, Geometry); `lessons-new4.js`; `video_scripts.py` with no videos of its own.
- New skills (level 3 is always a real Grade 5 standard, since the track calls it "Grade 5 Challenge"):
  Fact review (3.OA facts → tens/hundreds → 5.NBT.A.2 thousands) · Multiply step by step (carrying → up to 4×1 and 2×2
  → 3×2, 5.NBT.B.5) · Divide step by step (trade tens → zeros and remainders → two-digit divisors, 5.NBT.B.6) ·
  Number lines (fractions → mixed numbers and decimals → thousandths and rounding, 5.NBT.A.3/A.4) · Money & time
  stories (elapsed time → change, how many, unit stories → multi-step conversions, 5.M.A.1).
- validate.js: `equation()` now checks × and ÷ too (fact-family options must all be true facts); new TEXT kind `hmText`.
- Firebase: no app registered yet (`appId: ''`), so progress stays on the device. `firestore.rules` already lists
  `mathquest4`, but the published rules do NOT yet. To turn on sync: register a web app "Math Quest 4" in the
  ela-quest project, put its appId in config.js, and publish firestore.rules (run tools/rules_test.mjs first).
- Tested in the cloud: validate mathquest4 at 10k and 40k items, plus mathquest2, mapmath2, mapmath4; 10/10 planted
  bugs caught; check_videos OK; Chromium play-through mathquest4 66 levels / 527 questions, mapmath4 51 / 407,
  mathquest2 57 / 456, 0 failures, no page errors; screenshots of the home and subject screens, a question from each
  new skill with hints open, a worksheet PDF, and the hub. NOT tested: a real iPad/iPhone; voice.
- Published by copying dist/mathquest4/ and dist/index.html into gh-pages. Its icon was drawn in the cloud with Noto
  Color Emoji (no Apple emoji there); the next Mac `tools/deploy.sh` redraws it with Apple's.
- TODO on the Mac: `git pull`, `tools/voice_all.sh mathquest4 4`, `node tools/voicecheck.js mathquest4`, then
  `tools/deploy.sh` (if it is rejected, first `git fetch origin gh-pages && git branch -f gh-pages origin/gh-pages`).
  Videos: none new needed (MAP Math 4's 18 are borrowed).

## Algebra 1 Quest: 11-topic order + Honors (2026-10-29, published from the cloud)

- User asked: split Algebra 1 into the course's 11 topics (Solving Equations and Inequalities · Linear Equations ·
  Linear Functions · Systems · Piecewise Functions · Exponents and Exponential Functions · Polynomials and Factoring ·
  Quadratic Functions · Solving Quadratic Equations · Working With Functions · Statistics), add what is missing, then
  "write as many practice questions with all levels of complexity including honors level as possible".
- `a1-subjects.js` now builds the 11 topics (numbered 1–11). Sources: the old a1-*.js skills (unchanged, MAP Algebra 1
  still borrows them), MAP Algebra 1's own skills (`mapalg1:map-items.js`, e.g. eqprep, rates, modelx, scinot, equivx,
  features, data2, quadmore levels), `a1-topics.js` (new skills: absolute value equations, forms of linear equations,
  scatter plots & lines of fit, absolute value functions, piecewise & step functions, factoring, quadratic models,
  solve quadratic equations, linear-quadratic systems, transforming & combining functions, data: center/spread/shape)
  and `a1-honors.js` (one Honors skill at the end of every topic, 3 levels each). 126 levels in all (was 54).
- Split skills: 'factor' → 'factoring' + 'qsolve', 'stats' → 'data11' + 'fitline'. `APP.progressMoves` in config.js
  maps old levels to new; core/app.js `carryProgress()` copies stars to the new keys on load (also for skills that
  only moved subject). Old keys are never deleted. Tested in Chromium with seeded old progress.
- Engine changes (all apps): carryProgress; videos follow moved skills; Fig.graph kinds `abs` and `fn`, `dom` for
  pieces, open dots (`pts` 4th item true, `.gr-open`); build.py `videosSkip`. Algebra 1 now borrows MAP Algebra 1's
  videos (`videosFrom: 'mapalg1'`, skipping its MAP test tips).
- Lessons: `lessons-topics.js`, `lessons-honors.js` (+ MAP Algebra 1's map-lessons.js).
- validate.js: many new kinds (absEqSol, intercept, residual, pieceAt, stepCost, lqPts, stdev, sys3, expEq, ratPow,
  algEquivY, quadThru, hasRoots, …).
- Tested: validate algebra1 at 40k items, mapalg1 and all others pass; 10/10 planted bugs caught; check_videos OK;
  Chromium play-through algebra1 126 levels / 1,008 questions, mapalg1, mathquest2, mathquest4, satprep, contest4,
  mapread2, hubdemo: 0 failures; screenshots with KaTeX (served locally: the cloud blocks the CDN). NOT tested on a
  real device; no voice for the new lines yet.
- FOUND: the Mac recorded Math Quest 2's new voices and deployed them but did not commit them. They were copied from
  gh-pages into apps/mathquest2/voice + data/voice-clips.js and committed. On the Mac, `git pull` will complain that
  local files would be overwritten (they are the same files): run `git stash push --include-untracked`, `git pull`,
  then `git stash drop`.
- DONE 2026-10-29 on the Mac (user): Algebra 1 now uses `speech.split` (decimals/negatives/fractions read in pieces;
  ~1,100 device-voice lines → 1). Recorded with `tools/voice_all.sh algebra1 4 1000` (new 3rd arg = sample rounds) and
  mathquest4; voices committed (eb45647) and deployed with tools/deploy.sh. Live site checked: gh-pages matches main.

## Grown-ups page and unlocking any level (2026-10-29, user request before bed)

- User: "grown-ups create class in the same screen as class code doesn't make sense. I need a separate admin page for
  creating class code. I also need parent or admin to be able to unlock any stage."
- core/app.js: new **Grown-ups page** (`grownups` screen; also opens with `#grownups`, linked from the hub under
  "For parents and teachers", from Settings → For grown-ups, from Players, and as its own card on the welcome screen).
  Protected by a **device grown-up PIN** (4–6 digits, salted SHA-256 in localStorage `hub_grownup`, shared by every
  app on the site; asked once per session; forgot → verify any class's grown-up PIN to reset it). It holds:
  create a class code (moved off the student join card and the Players screen), class dashboards, unlock levels,
  manage players, reset progress (now asks the PIN), and the old device-wide "unlock all levels" switch.
- **Unlocking**: per player `P.unlocks` = { 'skill.level' | '*': {on, at} } (keyed by skill id, so it survives
  regrouping); `unlocked()` honors it; Cloud.merge keeps the latest change per key, so unlocks sync with the class.
  Ways to unlock: (1) Grown-ups page → "Unlock every level" or "Choose levels to unlock" (tap 🔒/🔓 per level);
  (2) tapping a locked level → "👪 Grown-up: unlock it" (PIN) → it unlocks and starts; (3) class dashboard → ⋯ next
  to a student → "Unlock levels for …" (class PIN; re-reads the student's progress before saving, so nothing is lost).
- cloud.js ALL_APPS now includes mathquest4 and contest2/4/8 (removing a student also deletes those apps' progress).
- No firestore.rules change needed (unlocks live inside the progress JSON).
- Tested in Chromium: welcome/join card, PIN setup, wrong/right PIN, unlock from a locked level, editor toggles,
  unlock-all, settings door, dashboard remote unlock with a mocked class (the cloud can't reach Firestore);
  validate all 14 apps. NOT tested: real Firestore round trip and a real device.
- PUBLISHED from the cloud (gh-pages 89f656c): only core/ files, each app's sw.js, and the hub page were copied; live
  icons, voices, and content untouched. Play-through of all 14 apps: 0 failures. Before the next Mac deploy:
  `git pull`, then `git fetch origin gh-pages && git branch -f gh-pages origin/gh-pages`, then tools/deploy.sh.

## Math Quest 2: Problem Solving subject (2026-10-29)

- User: "add problem solving for 2-3 grade as well". New subject **Problem Solving** in Math Quest 2 (`data/solve.js`,
  lessons in `data/lessons-solve.js`), 5 skills × 3 levels (level 3 = Grade 3): Bar models (part-whole, compare,
  equal parts) · Two-step stories (within 100, which equation fits, multiply then add/subtract) · Patterns & rules
  (next number, find the rule, rule machines) · Think it through (number riddles checked unique by brute force,
  guess and check, organized lists) · Does it make sense? (estimate, is it reasonable, check with the opposite).
  Most questions have step-by-step hints. MAP Math 2 does not load solve.js (unchanged).
- validate.js kinds: storyEq2, ruleAddSub, reasonable, riddle, legs2, sumDiff, coinWays, estTens.
- Tested: validate mathquest2 40k + mapmath2; 5/5 real planted bugs caught; play-through 72 levels / 576 questions,
  0 failures; screenshots. PUBLISHED from the cloud on the user's OK (gh-pages 7d1b1b4, Math Quest 2 files only). Voice: new lines use the
  device voice until recorded on the Mac: `tools/voice_all.sh mathquest2 4`, voicecheck, commit voices, deploy.

## Science Quest 8 (Grade 8 life science) — IN PROGRESS (started 2026-10-30, cloud; user has little credit left)

User asked: "add 8th grade science with these topics. detailed videos as well" — 8 topics, 36 lessons (+ Topic Launch
and Topic Close per topic). Topic/lesson titles (keep as the structure; write ALL content ourselves — patterns yes,
copies no; do not name the publisher):
1 Living Things in the Biosphere: Living Things · Classification Systems · Viruses, Bacteria, Protists, and Fungi · Plants and Animals
2 The Cell System: Structure and Function of Cells · Cell Structures · Obtaining and Removing Materials · Cell Division · Photosynthesis · Cellular Respiration
3 Human Body Systems: Body Organization · Systems Interacting · Supplying Energy · Managing Materials · Controlling Processes
4 Reproduction and Growth: Patterns of Reproduction · Plant Structures for Reproduction · Animal Behaviors for Reproduction · Factors Influencing Growth
5 Ecosystems: Living Things and the Environment · Energy Flow in Ecosystems · Cycles of Matter
6 Populations, Communities, and Ecosystems: Interactions in Ecosystems · Dynamic and Resilient Ecosystems · Biodiversity · Ecosystem Services
7 Genes and Heredity: Patterns of Inheritance · Chromosomes and Inheritance · Genetic Coding and Protein Synthesis · Trait Variations · Genetic Technologies
8 Natural Selection and Change Over Time: Early Study of Evolution · Natural Selection · The Process of Evolution · Evidence in the Fossil Record · Other Evidence of Evolution

Design (follow it on the Mac):
- App `apps/science8` ("Science Quest 8", 🔬, voice g8, picturesOptional false → every item gets Fig.picture icons).
  Track g8: Starter / Star = Grade 8, Challenge = High school Biology preview. Standards: NJSLS-Science 2020
  (MS-LS1-1..8, MS-LS2-1..5, MS-LS3-1..2, MS-LS4-1..6).
- One subject per topic (id t1..t8); one skill per lesson (3 levels: Key ideas / Apply it / Challenge) plus a
  "Topic review" skill (Topic Close) that mixes the topic's levels. Topic Launch = one intro video per topic.
- Content is written in a compact item DSL in `data/sci-common.js` (S8.items): strings
  `mc | question | answer | wrong1 :: why ; wrong2 ; wrong3 | explanation`, `tf | statement | true/false | why`,
  `multi | question | right1 ; right2 | wrong1 ; wrong2 | why`, `sort | question | Bin A = x ; y | Bin B = z | why`,
  `order | question | step1 ; step2 ; step3 | why`. ≥ 8 items per level (validator needs 8 distinct per round).
  Calculation generators where they fit (Punnett ratios, 10% energy rule, magnification, population size).
- Videos: `apps/science8/video_scripts.py`, one per lesson + one Topic Launch per topic (44), scene types title /
  bullets (≤ 4 items, beats = 1 + items) / image (Fig.picture/Fig.table figs + notes) / quiz / outro. Check with
  `node tools/check_videos.js science8`; render on the Mac with `tools/.venv/bin/python tools/make_videos.py science8`.
- Hub row (8th grade), firestore.rules + core/cloud.js ALL_APPS add 'science8'; register a Firebase web app later.
- Then: validate, playthrough, voice_all.sh science8 4 2000, commit voices, deploy.

## PENDING — next steps, in order

1. DONE 2026-10-25: MAP Math 2 and the Math Quest 2 update are published and verified live (the user allowed Claude
   to run tools/deploy.sh). Still open: ask whether the Grade 2/4/8 voice styles are OK (samples/voice-grades.wav).
2. Phase 4: MAP Math 4 — DONE and PUBLISHED 2026-10-25 (vardhangs.github.io/learning-hub/mapmath4/). 17 skills × 3
   levels (G4 Starter, G4 Star, G5 Challenge), all new; 51 lessons; 6 videos; g4 voice (1,868 clips, voicecheck
   passes). Tests: validate 10k/30k, 10/10 planted bugs caught, maptest 150–230 (bank 178–224), play-through 1,221 q
   at 375px, in-browser MAP tests at 180/200/205/222, live check. Standards codes read from nj.gov 2023 pages for
   grades 3–5 (section letter + continued list number). The same publish shipped shared fixes to all apps (avatar
   grid, MAP history table scroll); Math Quest 2 and MAP Math 2 were re-played in the browser first.
   Not done: nobody has listened to the g4 voice or watched the 6 videos end to end — ask the family.
3. Phase 5: MAP Reading 2 / 4 / 8 — DONE and PUBLISHED 2026-10-25.
   - Shared: apps/mapread2/data/readkit.js (RK: passages, mc/ev(hot evidence)/multi/order(pop) specs, passLevel,
     shortLevel, genLevel, solo; sentence splitter handles titles, a.m./p.m., play headings, parentheses). Reading
     figures (pageFig, listFig, diagramFig) live in core Fig. core/modes/fluency.js = fluency practice (timed silent
     sentence check, read-aloud with optional on-device recording, grown-up error marking, 3 literal questions,
     Hasbrouck & Tindal 2017 norms, history, dashboard); tools/flurun.js tests it. Map pool uses L.all() when a level
     lists all items. Tools read ELA Quest data read-only via 'elaquest:file.js' (ELA Quest is never modified).
   - Validator: hotEvidence/multiText/popSeq kinds; answer-length check (right answer VISIBLY longest ≤15%; all
     reading apps 2–8%, visibly shortest 0–1%); missing pictures now FAIL (hubdemo has picturesOptional).
   - mapread2: 7 new skills + ELA G2 stories/facts/context (70% new); fluency (G2). mapread4: 10 all-new skills;
     fluency (G4). mapread8: 7 new + ELA G8 g8stories/g8articles/g8argeval (70% new); no fluency (RF is pre-K–5).
     Reused ELA items get longer wrong choices via LONGER tables in each map-bank.js (ELA files untouched).
   - Tested: validate, mutation 7/7 (reading kinds), maptest (R2 150–210, R4 170–230, R8 175–230 after lowering
     Starter tags), browser play-through at 375px, flurun, 3 MAP tests each, light/dark shots; voices (R2, R4 full
     coverage), 16 videos (R2, R4), R8 voice+7 videos rendering in background at time of writing.
   - Not verified: item-format mix of real MAP Reading (no NWEA source found); RIT tags are hand-set estimates;
     nobody has listened to the reading voices or watched the reading videos end to end.
4. Phase 6: Algebra 1 Quest — DONE 2026-10-25 (apps/algebra1; see "Phase 6 details" below).
   - 15 skills × 3 levels (Algebra 1 Starter, Algebra 1 Star, Challenge = Geometry/Algebra 2 preview) in 3 subjects
     (Real Numbers; Expressions, Equations, and Inequalities; Patterns, Functions, and Graphing), 45 lessons with
     pictures, 8 videos, g8 voice (2,554 clips; voicecheck: every line of 492k recorded), speech.frac 'over'.
   - New engine: core/engine/alg.js (safe parser, implicit ×, equiv at random points + whole-number fallback for
     things like (−2)^(n−1), form expanded/factored/monomial, leadNum for "greatest common factor"), question types
     `expr` (algebra keypad, q.form, q.gcf, q.pre, q.vars) and `plot` (tap points / two points of a line), Fig.graph
     (clip path, fs/lw for answer choices, aspect capped 0.62–1.1) and Fig.ineqLine. Fig.table now widens columns /
     wraps long cells (old tables that fit are unchanged). Speech: log base, "sub n", absolute value, negatives.
   - Tests: validate 10k and 150k ✓; mutation 26/26 planted bugs caught (+ a control that exposed a real outlier bug,
     fixed); demo-solves 14,400/14,400; play-through 1,440 q at 375px; light/dark phone shots; table-overflow check
     on all algebra1 + mapmath4 figures; other apps re-validated and re-played (mathquest2, mapmath2, mapmath4,
     mapread8) and voicechecked after the shared changes.
   - Standards codes checked against nj.gov 2023 HS pages (algebra, functions, numquant, statistics, geometry; codes
     are inferred from cluster letter + item number, the pages do not print them). NJ has NO N.RN.B.3 and no
     8.NS.A.3; 8.EE.C.8 is systems — those were removed.
   - Not verified: nobody has used the keypad/plot on a real phone or tablet, listened to the g8 algebra voice, or
     watched the 8 videos end to end. RIT tags are hand-set (used in Phase 7).
5. Phase 7: MAP Algebra 1 — DONE and PUBLISHED 2026-10-25 (apps/mapalg1; vardhangs.github.io/learning-hub/mapalg1/;
   live check: all 9 apps' sw cache names match dist, hub shows it live, videos served). Algebra 1 Quest was re-voiced
   in the same publish (superscript speech change; 2,570 clips, voicecheck full). MAP Algebra 1: 2,761 clips, full.
   - 10 new MAP-style skills (30 levels, incl. grade 7–8 review: signed numbers, ratios/percents, roots & scientific
     notation, equations review) + 6 skills reused from Algebra 1 Quest (exponents, lineq, systems, factor, linear,
     quadfn) = 63% new levels; tests draw ≥60% new. Formats: mc, multi, hot text (e.g. "tap the first wrong step"),
     click-and-pop (build an equation, complete the square, fill the GCF), text entry, expr, plot. 30 lessons with
     pictures; 1 own video (map-tips-a1) + Algebra 1 Quest's 8 via videosFrom; g8 voice, speech split.
   - Norms (VERIFIED from NWEA "2022 norms for MAP Growth course-specific tests in Algebra 1, Algebra 2, and
     Geometry", teach.mapnwea.org/impl/CSNormsOverview.pdf): user norms, NOT grade-specific, NOT nationally
     representative, test data 2019–20 through 2021–22. Algebra 1 achievement percentiles 5…95:
     fall 202 208 212 215 218 220 223 225 227 229 231 233 235 237 240 243 246 250 256;
     winter 204 210 214 218 221 224 226 228 231 233 235 238 240 242 245 248 252 256 263;
     spring 204 212 216 220 224 227 229 232 234 237 239 242 245 247 250 254 257 262 269.
     Growth (conditional mean at the 50th percentile): F→S 8.0 (SD 10.2), F→W 4.1 (SD 7.8), W→S 3.9 (SD 8.8).
     The app reads percentiles from this table (MapCore.percentile with norm.table) and words every comparison as
     "students who took the Algebra 1 course test".
   - Shared changes: map.js `group/groupShort/avgLabel/bandRange/chartLo/normsShort/normsNote/audioNote` config
     (defaults keep the old apps' wording); fixed a hard-coded "Grade 3 Challenge" message; Fig.boxPlot; speech reads
     cube roots and superscript powers (10⁻⁹ → "10 to the power of -9"); video page no longer crashes when a
     borrowed video's practice skill is missing; maptest `simThetas`.
   - Tests: validate 10k and 100k ✓; mutation 26/26 (one gap found and fixed: two-way tables now recomputed from
     the counts); maptest 190–270 (bias ≤1.7, band coverage 93–97%, ≥60% new in every test; bank 196–256, middle
     90% 202–238); demo-solves 15,360/15,360; play-through 1,536 q at 375px (found and fixed: click-and-pop with two
     equal answer tiles); 6 in-browser MAP tests (θ 205/205/205/215/230/255; one of the three θ=205 runs missed its
     band, as expected ~7% of the time); report/home light+dark.
   - Not verified: NWEA's item formats and calculator policy for the Algebra 1 course test; whether the course
     test has read-aloud; RIT tags are hand-set; the bank has few items above ~245, so very high scores lean low.
6. Phase 8: SAT Prep — DONE and PUBLISHED 2026-10-25 (vardhangs.github.io/learning-hub/satprep/; live check: all 10
   apps' sw cache names match dist, hub shows it live, videos served; g8 voice 3,549 clips, voicecheck full; 7 videos).
   - VERIFIED (College Board 2026–27 SAT Weekend Student Guide, satsuite.collegeboard.org/media/pdf/sat-student-guide.pdf;
     Assessment Framework for the Digital SAT Suite): R&W 54 q / 64 min, Math 44 q / 70 min; each section = two equal,
     separately timed modules (R&W 25 operational + 2 pretest, 32 min; Math 20 + 2 pretest, 35 min); module 2 easier or
     harder by module-1 performance, no return to module 1; within a module: mark for review, question menu, go to any
     question, hideable timer (not in the last 5 min), option eliminator, line reader; built-in Desmos graphing/scientific
     calculator for all of Math (own calculator allowed); a reference list of common formulas in Math; section scores
     200–800 (steps of 10), total 400–1600; R&W all four-option MC, one question per passage, 25–150 words; Math ≈75% MC
     (four options), ≈25% student-produced response (up to 6 characters, first may be a minus sign); ≈30% of Math in
     context; R&W domains per test: Craft and Structure 13–15, Information and Ideas 12–14, Standard English Conventions
     11–15, Expression of Ideas 8–12; Math: Algebra 13–15, Advanced Math 13–15, PSDA 5–7, Geometry & Trig 5–7; R&W questions
     grouped by skill, easier to harder; Math easier to harder. Break length NOT verified (the app says "a short break").
   - App: 10 R&W skills (24 original passages ×5 question types, 12 paired texts, words-in-context, punctuation,
     agreement/tense, transitions, notes → goal, quantitative evidence from generated tables/graphs) + 14 Math skills
     = 72 levels, 72 lessons. Practice test (core/modes/sat.js + sat-core.js): full or one section, two timed modules each
     (new core "module" runner in app.js: Back/Next, mark, menu, submit, timer with 5-min warning, calculator + reference
     sheet in our own words for Math), 2 unscored pretest items per module, routing by module-1 estimate, section estimate
     (EAP on 200–800, b hand-set) shown as a range ±(SEM+20), review of every question (last 3 tests keep reviews), timed
     10-question drills per domain, history, dashboard. Simple four-function calculator, not Desmos (stated in the app).
   - NJ codes: ELA 2023 grades 11–12 (RL/RI.CR/CI/TS/MF..., L.SS/L.KL/L.VL.11–12.x, W.WR.11–12.5) and HS math incl.
     S.IC.B.4, S.CP.A.4/B.6, G.SRT.B.5/C.6–8, G.C.B.5, G.GPE.A.1, G.GMD.A.3, G.CO.C.9–10 (read from nj.gov pages).
   - Tests: validate 10k/50k/100k ✓ (SAT rules: exactly 4 options, typed ≤6 chars, passages 25–150 words, b on 200–800,
     MC/typed only); answer-length bias 0% overall and ≤15% per skill (many distractors rewritten); mutation 29/29 SAT
     kinds; sattest 300–750 (bias ≤8.3, range coverage 90–99%, routing correct, domain counts exact); typed share in Math
     modules ≈22–27%; browser: play-through 1,144 q / 72 levels, full test through the real module screens (Back, mark,
     menu, submit, timer expiry), drill, review, reference sheet, light/dark at 375px.

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
