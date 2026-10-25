// Reading fluency practice (grades 2–5), modeled on the parts NWEA describes for MAP Reading Fluency: a timed silent
// sentence check, a passage read aloud, and literal comprehension questions. Unlike MAP Reading Fluency there is no
// speech scoring: a grown-up listens and taps the words that were misread or skipped. Words correct per minute are
// compared with Hasbrouck & Tindal (2017) oral reading fluency norms. Unofficial practice, not an NWEA score.
// Content: window.FLUENCY = { sentences: [[text, makesSense], …], passages: [{id, title, text, fig, qs:[[q, a, [wrong…]]]}] }.
(window.HubModes = window.HubModes || []).push((api) => {
  const { APP, esc } = api;
  const F = APP.features.fluency;
  if (!F || typeof FLUENCY === 'undefined') return {};
  const P = () => api.P();
  const SEASONS = ['fall', 'winter', 'spring'], SEASON_NAME = { fall: 'Fall', winter: 'Winter', spring: 'Spring' };
  const seasonOf = (d = new Date()) => { const m = d.getMonth(); return m >= 7 && m <= 10 ? 'fall' : m === 11 || m <= 2 ? 'winter' : 'spring'; };
  const runs = () => (P().tests || []).filter((t) => t.kind === 'fluency').sort((a, b) => a.at - b.at);
  const latest = () => runs()[runs().length - 1];
  const SENT_SECS = 60;
  let season = seasonOf();
  let R = null; // current practice: {step, passage, sent:{i, right, wrong, start}, read:{start, secs}, errors:Set, last, answers:[], rec}
  let tick = null;

  // Percentile band for a WCPM score (norm rows are the 10th, 25th, 50th, 75th, 90th percentiles).
  function band(wcpm, s) {
    const [p10, p25, p50, p75, p90] = F.norms[s];
    if (wcpm >= p90) return { label: 'above the 90th percentile', cls: 'd-high' };
    if (wcpm >= p75) return { label: 'between the 75th and 90th percentiles', cls: 'd-high' };
    if (wcpm >= p50) return { label: 'between the 50th and 75th percentiles', cls: 'd-hiavg' };
    if (wcpm >= p25) return { label: 'between the 25th and 50th percentiles', cls: 'd-avg' };
    if (wcpm >= p10) return { label: 'between the 10th and 25th percentiles', cls: 'd-loavg' };
    return { label: 'below the 10th percentile', cls: 'd-low' };
  }
  const words = (text) => text.split(/\s+/).filter(Boolean);
  const pickPassage = () => {
    const done = new Set(runs().map((t) => t.passage));
    const fresh = FLUENCY.passages.filter((p) => !done.has(p.id));
    return U.pick(fresh.length ? fresh : FLUENCY.passages);
  };
  const stopTick = () => { if (tick) { clearInterval(tick); tick = null; } };

  // ---------- home card ----------
  function home() {
    const t = latest();
    return `<section class="card flu-card">
      <div class="row-between"><h2>🗣️ Reading fluency practice</h2><span class="tag-unofficial">Unofficial</span></div>
      <p class="muted">Read sentences silently, then read a passage out loud to a grown-up and answer questions — the same kinds of parts as MAP Reading Fluency.</p>
      ${t ? `<p>Last time (${SEASON_NAME[t.season]}): <b>${t.wcpm} words correct per minute</b>, ${t.acc}% accuracy, ${t.comp}/${t.compOf} questions right.</p>` : ''}
      <div class="row"><button class="btn primary big" data-act="fluIntro">Start fluency practice</button>${runs().length ? '<button class="btn" data-act="nav" data-to="fluHistory">My reading speed</button>' : ''}</div>
    </section>`;
  }

  // ---------- intro ----------
  function intro() {
    const rec = !!(window.MediaRecorder && navigator.mediaDevices);
    return `<section class="card">
      <h1>🗣️ Reading fluency practice</h1>
      <p class="tag-unofficial">Unofficial practice · not an NWEA score</p>
      <ol class="flu-steps">
        <li><b>Sentence check</b> (1 minute, silent): read each sentence to yourself and tap whether it makes sense. Go quickly but carefully!</li>
        <li><b>Read aloud</b>: read a short passage out loud to a grown-up. Read the way you talk — not too fast.</li>
        <li><b>Grown-up check</b>: the grown-up taps any word that was misread or skipped.</li>
        <li><b>Questions</b>: answer three questions about the passage.</li>
      </ol>
      <p>When is this practice? ${SEASONS.map((s) => `<button class="chip ${s === season ? 'sel' : ''}" data-act="fluSeason" data-s="${s}">${SEASON_NAME[s]}</button>`).join(' ')}</p>
      ${rec ? `<label class="toggle"><input type="checkbox" id="fluRec" ${api.settings().fluRecord ? 'checked' : ''} data-set="fluRecord"><span>Grown-ups: record the reading so you can listen back (kept on this device only, deleted when you leave)</span></label>` : '<p class="fine">This browser cannot record audio, so the grown-up listens live.</p>'}
      <div class="row"><button class="btn primary big" data-act="fluBegin">Begin the sentence check</button><button class="btn" data-act="nav" data-to="home">Back</button></div>
      <p class="fine">${esc(F.disclaimer || '')}</p>
    </section>`;
  }

  // ---------- 1. sentence check (silent, timed) ----------
  function sentences() {
    const s = R.sent, left = Math.max(0, SENT_SECS - Math.floor((performance.now() - s.start) / 1000));
    const [text] = s.list[s.i % s.list.length];
    return `<section class="card flu-sent">
      <div class="row-between"><h2>Sentence check</h2><span class="pill" id="fluLeft">${left} s</span></div>
      <div class="flu-bar"><i id="fluBar" style="width:${(left / SENT_SECS) * 100}%"></i></div>
      <p class="flu-sentence">${esc(text)}</p>
      <div class="flu-yn"><button class="btn big yes" data-act="fluSent" data-v="1">👍 Makes sense</button><button class="btn big no" data-act="fluSent" data-v="0">👎 Does not</button></div>
      <p class="fine">${s.right + s.wrong} answered</p>
    </section>`;
  }
  function beginSentences() {
    R = { step: 'sent', passage: pickPassage(), sent: { list: U.shuffle(FLUENCY.sentences), i: 0, right: 0, wrong: 0, start: performance.now() }, errors: new Set(), last: null, answers: [] };
    api.go('fluSentences');
    stopTick();
    tick = setInterval(() => {
      const left = Math.max(0, SENT_SECS - Math.floor((performance.now() - R.sent.start) / 1000));
      const el = document.getElementById('fluLeft'), bar = document.getElementById('fluBar');
      if (el) el.textContent = `${left} s`;
      if (bar) bar.style.width = `${(left / SENT_SECS) * 100}%`;
      if (left <= 0) { stopTick(); api.go('fluReady'); }
    }, 250);
  }
  function answerSentence(v) {
    if (!R || R.step !== 'sent') return;
    const s = R.sent, [, sense] = s.list[s.i % s.list.length];
    if ((v === '1') === sense) s.right++; else s.wrong++;
    s.i++;
    api.render();
  }

  // ---------- 2. read aloud ----------
  function ready() {
    return `<section class="card">
      <h2>Time's up! ⏱️</h2>
      <p>You answered <b>${R.sent.right + R.sent.wrong}</b> sentences: <b>${R.sent.right}</b> right.</p>
      <h2>Next: read out loud</h2>
      <p>When you tap <b>Start</b>, the passage appears. Read it out loud to your grown-up. Tap <b>I'm done</b> at the end.</p>
      <div class="row"><button class="btn primary big" data-act="fluStartRead">Start</button></div>
    </section>`;
  }
  async function startRead() {
    R.step = 'read';
    R.read = { start: performance.now(), secs: 0 };
    if (api.settings().fluRecord && window.MediaRecorder && navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const rec = new MediaRecorder(stream), chunks = [];
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = () => { stream.getTracks().forEach((t) => t.stop()); R.audio = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' })); api.render(); };
        rec.start();
        R.rec = rec;
      } catch { R.rec = null; } // no permission: the grown-up listens live
      R.read.start = performance.now();
    }
    api.go('fluRead');
    stopTick();
    tick = setInterval(() => { const el = document.getElementById('fluClock'); if (el) el.textContent = `${Math.floor((performance.now() - R.read.start) / 1000)} s`; }, 500);
  }
  function read() {
    const p = R.passage;
    return `<section class="card flu-read">
      <div class="row-between"><h2>${esc(p.title)}</h2><span class="pill">⏱️ <span id="fluClock">0 s</span>${R.rec ? ' · 🔴 recording' : ''}</span></div>
      ${p.fig ? `<div class="fig">${p.fig}</div>` : ''}
      ${p.text.split('\n\n').map((x) => `<p>${esc(x)}</p>`).join('')}
      <div class="row"><button class="btn primary big" data-act="fluDone">I'm done</button></div>
    </section>`;
  }
  function doneRead() {
    R.read.secs = Math.max(1, (performance.now() - R.read.start) / 1000);
    stopTick();
    if (R.rec && R.rec.state !== 'inactive') R.rec.stop();
    R.step = 'score';
    api.go('fluScore');
  }

  // ---------- 3. grown-up check ----------
  function score() {
    const w = words(R.passage.text), last = R.last ?? w.length - 1;
    return `<section class="card flu-score">
      <h2>Grown-up check</h2>
      <p class="muted">Tap each word that was <b>misread or skipped</b> (tap again to undo). Self-corrections count as correct.${R.markLast ? ' <b>Now tap the last word that was read.</b>' : ''}</p>
      ${R.audio ? `<audio controls src="${R.audio}" class="flu-audio"></audio>` : ''}
      <div class="flu-words">${w.map((x, i) => `<button class="fw ${R.errors.has(i) ? 'err' : ''} ${i > last ? 'unread' : ''}" data-act="fluWord" data-i="${i}">${esc(x)}</button>`).join(' ')}</div>
      <div class="row"><button class="btn small" data-act="fluMarkLast">${R.markLast ? 'Cancel' : 'Stopped early? Mark the last word read'}</button></div>
      <p>${R.errors.size} error${R.errors.size === 1 ? '' : 's'} · ${last + 1} of ${w.length} words read · ${Math.round(R.read.secs)} seconds</p>
      <div class="row"><button class="btn primary big" data-act="fluToQs">Next: questions</button></div>
    </section>`;
  }
  function tapWord(i) {
    i = +i;
    if (R.markLast) { R.last = i; R.markLast = false; [...R.errors].forEach((e) => { if (e > i) R.errors.delete(e); }); }
    else if (R.last == null || i <= R.last) { if (R.errors.has(i)) R.errors.delete(i); else R.errors.add(i); }
    api.render();
  }

  // ---------- 4. questions ----------
  function questions() {
    const p = R.passage, k = R.answers.length, [q, a, w] = p.qs[k];
    if (!R.opts || R.opts.k !== k) R.opts = { k, list: U.shuffle([a, ...w]) };
    return `<section class="card">
      <div class="row-between"><h2>Question ${k + 1} of ${p.qs.length}</h2><button class="btn small" data-act="fluLook">${R.look ? 'Hide the passage' : 'Look back'}</button></div>
      ${R.look ? `<div class="flu-look">${p.text.split('\n\n').map((x) => `<p>${esc(x)}</p>`).join('')}</div>` : ''}
      <p class="prompt">${esc(q)}</p>
      <div class="opts long">${R.opts.list.map((o) => `<button class="opt" data-act="fluAns" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>
    </section>`;
  }
  function answer(v) {
    const p = R.passage, k = R.answers.length;
    R.answers.push(v === p.qs[k][1]);
    R.look = false;
    if (R.answers.length < p.qs.length) { api.render(); return; }
    finish();
  }
  function finish() {
    const w = words(R.passage.text), read = (R.last ?? w.length - 1) + 1, errs = [...R.errors].filter((i) => i < read).length;
    const wcpm = Math.round(((read - errs) / R.read.secs) * 60), acc = Math.round((100 * (read - errs)) / read);
    const t = { id: `flu-${Date.now()}`, kind: 'fluency', at: Date.now(), season, passage: R.passage.id, title: R.passage.title, wcpm, acc, comp: R.answers.filter(Boolean).length, compOf: R.answers.length, sent: R.sent.right, sentWrong: R.sent.wrong, secs: Math.round(R.read.secs), words: read, errors: errs };
    api.setP((P0) => { P0.tests = [...(P0.tests || []), t]; });
    api.save(); api.sync();
    R.result = t;
    api.go('fluResult');
  }

  // ---------- 5. results and growth ----------
  function result() {
    const t = R && R.result ? R.result : latest();
    if (!t) return '<section class="card"><p>No fluency practice yet.</p></section>';
    const b = band(t.wcpm, t.season), p50 = F.norms[t.season][2];
    return `<section class="card">
      <h1>Your reading 🎉</h1>
      <p class="tag-unofficial">Unofficial practice · not an NWEA score</p>
      <div class="flu-stats">
        <div><b>${t.wcpm}</b><span>words correct per minute</span></div>
        <div><b>${t.acc}%</b><span>accuracy</span></div>
        <div><b>${t.comp}/${t.compOf}</b><span>questions right</span></div>
        <div><b>${t.sent}</b><span>sentences right in 1 minute</span></div>
      </div>
      <p>For grade ${F.grade} in the ${SEASON_NAME[t.season].toLowerCase()}, ${t.wcpm} words correct per minute is <span class="desc ${b.cls}">${b.label}</span>. The middle (50th percentile) is ${p50}.</p>
      <p class="muted">${t.acc < 95 ? 'Tip: accuracy matters more than speed. Slow down a little and read each word carefully.' : t.wcpm < p50 ? 'Tip: reading the same passage a few times out loud builds smooth, quick reading.' : 'Great reading! Keep reading books you enjoy, out loud and silently.'}</p>
      <p class="fine">Fluency comparison: ${esc(F.normsSource)}. One reading of one passage varies a lot — look at several practices over time.</p>
      <div class="row"><button class="btn primary" data-act="nav" data-to="fluHistory">My reading speed</button><button class="btn" data-act="nav" data-to="home">Home</button></div>
    </section>`;
  }
  function chart(list) {
    const W = 340, H = 160, x0 = 34, max = Math.max(F.norms.spring[4], ...list.map((t) => t.wcpm)) + 10;
    const x = (i) => x0 + (list.length === 1 ? (W - x0) / 2 : (i * (W - x0 - 14)) / (list.length - 1)), y = (v) => 10 + (H - 30) * (1 - v / max);
    let body = '';
    for (let v = 0; v <= max; v += 40) body += `<line x1="${x0}" y1="${y(v)}" x2="${W}" y2="${y(v)}" class="gr-grid"/><text x="${x0 - 6}" y="${y(v) + 4}" class="fg-text" font-size="10" text-anchor="end">${v}</text>`;
    list.forEach((t, i) => { body += `<line x1="${x(i) - 9}" y1="${y(F.norms[t.season][2])}" x2="${x(i) + 9}" y2="${y(F.norms[t.season][2])}" class="fg-stroke" style="stroke-dasharray:3 3"/>`; });
    body += `<polyline points="${list.map((t, i) => `${x(i)},${y(t.wcpm)}`).join(' ')}" class="jp-arc"/>` + list.map((t, i) => `<circle cx="${x(i)}" cy="${y(t.wcpm)}" r="5" class="tf-a"/><text x="${x(i)}" y="${H - 4}" class="fg-text" font-size="9" text-anchor="middle">${SEASON_NAME[t.season].slice(0, 3)} ${new Date(t.at).getMonth() + 1}/${new Date(t.at).getDate()}</text>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Words correct per minute over time">${body}</svg><p class="fine">Dots: your words correct per minute. Dashes: the 50th percentile for grade ${F.grade} that season (Hasbrouck & Tindal 2017).</p>`;
  }
  function history() {
    const list = runs();
    return `<h1>My reading speed</h1>
      ${list.length ? `<section class="card">${chart(list)}</section>
      <section class="card dash-wrap"><div class="dash-scroll"><table class="dash"><thead><tr><th>Date</th><th>Passage</th><th>Words correct / min</th><th>Accuracy</th><th>Questions</th></tr></thead><tbody>
        ${[...list].reverse().map((t) => `<tr><td>${new Date(t.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td><td>${esc(t.title)}</td><td class="num"><b>${t.wcpm}</b></td><td class="num">${t.acc}%</td><td class="num">${t.comp}/${t.compOf}</td></tr>`).join('')}
      </tbody></table></div></section>` : '<section class="card"><p>No fluency practice yet.</p></section>'}
      <p class="fine">${esc(F.disclaimer || '')}</p>`;
  }
  function dashboard(rows) {
    const withRuns = rows.filter((r) => (r.st.prog.data.tests || []).some((t) => t.kind === 'fluency'));
    if (!withRuns.length) return '';
    return `<h2 class="sec">Reading fluency practice</h2><section class="card dash-wrap"><div class="dash-scroll"><table class="dash"><thead><tr><th>Student</th><th>Last words correct / min</th><th>Accuracy</th><th>Practices</th></tr></thead><tbody>
      ${withRuns.map((r) => { const l = r.st.prog.data.tests.filter((t) => t.kind === 'fluency').sort((a, b) => a.at - b.at); const t = l[l.length - 1]; return `<tr><td>${esc(r.st.name)}</td><td class="num"><b>${t.wcpm}</b></td><td class="num">${t.acc}%</td><td class="num">${l.length}</td></tr>`; }).join('')}
    </tbody></table></div></section>`;
  }
  function studentView() { const l = runs(); return l.length ? `<section class="card"><h2>Reading fluency practice</h2>${chart(l)}</section>` : ''; }

  if (location.hash === '#debug') window.__flu = { band, words, state: () => R, F };
  return {
    homeTop: home, dashboard, studentView,
    screens: { fluIntro: intro, fluSentences: sentences, fluReady: ready, fluRead: read, fluScore: score, fluQs: questions, fluResult: result, fluHistory: history },
    acts: {
      fluIntro: () => api.go('fluIntro'),
      fluSeason: (ds) => { season = ds.s; api.render(); },
      fluBegin: () => beginSentences(),
      fluSent: (ds) => answerSentence(ds.v),
      fluStartRead: () => startRead(),
      fluDone: () => doneRead(),
      fluWord: (ds) => tapWord(ds.i),
      fluMarkLast: () => { R.markLast = !R.markLast; api.render(); },
      fluToQs: () => { R.step = 'qs'; api.go('fluQs'); },
      fluLook: () => { R.look = !R.look; api.render(); },
      fluAns: (ds) => answer(ds.v),
    },
    // for the automated test (tools/flurun.js)
    _test: { band, words, state: () => R },
  };
});
