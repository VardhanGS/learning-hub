# Learning Hub

Nine learning and practice apps for one family (Grade 2, Grade 4, Grade 8 / Algebra 1 / SAT), built on one shared
engine. The engine started as [ELA Quest](https://github.com/VardhanGS/ela-quest)'s app shell. ELA Quest itself is separate and unchanged.

Each app is its own installable PWA at `https://vardhangs.github.io/learning-hub/<appId>/` with its own manifest,
service worker, cache, and icon. All apps share one Firebase project (`ela-quest`), so a family class code and each
child's PIN work everywhere. Each app keeps its progress in `classes/{classId}/students/{sid}/apps/{appId}`.

```
core/          shared engine: app.js (screens, quiz engine, demos, progress, classes, dashboard), U.js (question
               helpers, exact numbers), speech.js (math display + speech), voice.js, sound.js, cloud.js, styles.css,
               engine/ (figures), modes/ (MAP, SAT), sw.template.js
apps/<appId>/  config.js, data/*.js (content + lessons), voice/ (recorded clips)
hub/           the landing page
tools/         build.py, validate.js, playthrough.js, rules_test.mjs, enumerate_speech.js, make_voice.py,
               make_videos.py, make_icons.py, serve.py, deploy.sh
dist/          build output (what GitHub Pages serves)
firestore.rules
```

## Everyday commands

```bash
python3 tools/build.py                          # build every app into dist/ (or: build.py <appId>)
node tools/validate.js <appId>                  # 10,000+ generated items, answers recomputed
python3 tools/serve.py                          # http://localhost:4190/<appId>/  (add #debug for tests)
node tools/rules_test.mjs before|after          # Firestore rules over the REST API
node tools/enumerate_speech.js <appId>          # list every spoken line
tools/.venv/bin/python tools/make_voice.py <appId>   # record them (Kokoro af_heart, offline)
```

Play-through: open `http://localhost:4190/<appId>/#debug`, then run `tools/playthrough.js` in the page
(it is copied to `/_test/playthrough.js` on the local server and never published).

`tools/.venv` and `tools/tts-models` link to ELA Quest's copies (Kokoro-82M, Apache-2.0, voice `af_heart`).
Fonts: Andika and Fredoka (SIL Open Font License). Math: KaTeX 0.18.11 from jsDelivr (MIT).

MAP Growth–style practice apps are unofficial and not affiliated with NWEA; their scores are practice estimates, not
RIT scores. SAT® is a trademark of the College Board, which is not affiliated with this app. All passages and
questions are original.
