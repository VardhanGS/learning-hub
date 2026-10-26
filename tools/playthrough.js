// Automated play-through, run inside the real app page (open <app>/#debug, then paste or inject this file).
// For every level it plays rounds through the real quiz engine and screens:
//   - question 2 is answered wrong once, then right (expects the "try again" path and half credit)
//   - question 3 is answered wrong twice (expects the answer to be shown and the item saved to Practice Mistakes)
//   - every other question is answered right on the first try
// and checks the rendered controls, the score on the results screen, and that the "Watch first" demo's steps
// really solve its sample question. Returns a summary object.
(async () => {
  const H = window.__hub;
  if (!H) return { error: 'Open the app with #debug first.' };
  const ROUNDS = window.PLAY_ROUNDS || 3;
  const out = { levels: 0, rounds: 0, questions: 0, failures: [] };
  const fail = (where, msg) => { if (out.failures.length < 40) out.failures.push(`${where}: ${msg}`); };
  const tick = () => new Promise((r) => setTimeout(r, 0));

  // A wrong answer in the shape of each question type.
  function wrongState(q) {
    const st = H.freshSt();
    if (q.t === 'mc') st.chosen = q.opts.find((o) => o !== q.a);
    if (q.t === 'num') { const v = N.parse(q.a); st.typed = v && v.n === 0 && v.d === 1 ? '1' : '0'; }
    if (q.t === 'multi') st.sel = [q.opts.find((o) => !q.a.includes(o))];
    if (q.t === 'line') { const right = H.answerFor(q).chosen; st.chosen = right === 0 ? 1 : 0; }
    if (q.t === 'shade') st.sel = q.a + 1 <= q.parts ? [...Array(q.a + 1).keys()] : [0, 1].slice(0, q.a === 1 ? 2 : 1);
    if (q.t === 'clock') { st.h = q.h % 12 + 1; st.m = q.m; }
    if (q.t === 'hot') { const w = q.cells.findIndex((_, i) => !q.a.includes(i)); st.sel = [w]; }
    if (q.t === 'pop') {
      const k = (q.template.match(/□/g) || []).length, acc = new Set(q.accept.map((x) => x.join('|')));
      const idx = [...q.tiles.keys()];
      for (let tries = 0; tries < 200; tries++) { const pick = U.sample(idx, k); if (!acc.has(pick.map((i) => q.tiles[i]).join('|'))) { st.picked = pick; break; } }
    }
    if (q.t === 'coins') st.picked = q.a === 1 ? ['n'] : ['p'];
    if (q.t === 'sort') { q.items.forEach((it, i) => { st.place[i] = (it.b + 1) % q.bins.length; }); }
    if (q.t === 'tap') st.sel = [q.words.findIndex((_, i) => !q.a.includes(i))];
    if (q.t === 'order' || q.t === 'build') st.picked = [];
    if (q.t === 'type' || q.t === 'spell') st.typed = 'zzzz';
    if (q.t === 'expr') st.typed = `${q.a}+1`;
    if (q.t === 'plot') {
      const [lo] = q.range || [-6, 6], P = q.plot;
      const bad = [[lo, lo], [lo + 1, lo], [lo, lo + 1]].filter(([x, y]) => !(P.kind === 'points' ? P.pts.some(([a, b]) => a === x && b === y) : P.kind === 'vline' ? x === P.x : Math.abs(y - (P.m * x + P.b)) < 1e-9));
      st.sel = bad.slice(0, q.n || 1).map(([x, y]) => `${x},${y}`);
    }
    return st;
  }
  // The controls each question type must show.
  function checkDom(where, q) {
    const app = document.getElementById('app');
    if (!app.querySelector('.prompt')) fail(where, 'no prompt on screen');
    const n = (sel) => app.querySelectorAll(sel).length;
    if (q.t === 'mc' && n('.opt') !== q.opts.length) fail(where, `expected ${q.opts.length} options, saw ${n('.opt')}`);
    if (q.t === 'multi' && n('.opt.multi') !== q.opts.length) fail(where, 'multi-select options missing');
    if (q.t === 'num' && n('.kp-key') < 12) fail(where, 'keypad missing');
    if (q.t === 'line') { const pts = ((q.max - q.min) * (q.den || 1)) / (q.step || 1) + 1; if (n('.nl-hit') !== pts) fail(where, `number line has ${n('.nl-hit')} points, expected ${pts}`); }
    if (q.t === 'shade' && n('.sh-part') !== q.parts) fail(where, `shape has ${n('.sh-part')} parts, expected ${q.parts}`);
    if (q.t === 'clock' && n('.ck-hit') !== 12 + 60 / (q.step || 5)) fail(where, `clock has ${n('.ck-hit')} targets`);
    if (q.t === 'hot' && n('.hot-cell') !== q.cells.length) fail(where, 'hot-text cells missing');
    if (q.t === 'pop' && n('.pop-slot') !== (q.template.match(/□/g) || []).length) fail(where, 'click-and-pop boxes missing');
    if (q.t === 'coins' && n('.coin[data-k]') !== (q.coins || ['q', 'd', 'n', 'p']).length) fail(where, 'coin tray missing');
    if (q.fig && !app.querySelector('.fig svg')) fail(where, 'figure missing');
    if (/⟪|⟫|\\frac/.test(app.querySelector('.qcard').textContent)) fail(where, 'raw math markup visible');
    // Every control must sit inside the question card (catches CSS name clashes that move things off the card).
    const card = app.querySelector('.qcard').getBoundingClientRect();
    app.querySelectorAll('.qcard .opt, .qcard .kp-key, .qcard .nl-hit, .qcard .sh-part, .qcard .fig svg, .qcard .ck-hit, .qcard .coin, .qcard .hot-cell, .qcard .pop-slot, .qcard .pop-tile').forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) fail(where, `${el.className.baseVal ?? el.className} has no size`);
      else if (b.left < card.left - 1 || b.right > card.right + 1 || b.top < card.top - 1 || b.bottom > card.bottom + 1) fail(where, `${el.getAttribute('class')} is outside the question card`);
    });
    // A one-word answer ("2:25", "1000", "35¢") must not break across lines on a phone.
    app.querySelectorAll('.qcard .opt').forEach((el) => {
      const t = el.textContent.trim();
      if (!t || /\s/.test(t) || el.querySelector('.katex')) return; // typeset math (a stacked fraction) is meant to have 2 rows
      // measure the text only (a multi-select checkbox beside the word is not a second line)
      const tops = new Set();
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        if (!n.textContent.trim() || n.parentElement.closest('sup, sub')) continue; // a raised power sits higher on the same line
        const r = document.createRange(); r.selectNodeContents(n);
        [...r.getClientRects()].filter((x) => x.width > 0).forEach((x) => tops.add(Math.round(x.top)));
      }
      if (tops.size > 1) fail(where, `answer "${t}" breaks across ${tops.size} lines at ${innerWidth}px`);
    });
  }

  for (const s of H.S) for (const k of s.skills) for (let l = 0; l < k.levels.length; l++) {
    const where = `${s.id}/${k.id}/L${l + 1}`;
    out.levels++;
    for (let r = 0; r < ROUNDS; r++) {
      H.startRound({ mode: 'skill', s: s.id, k: k.id, l, noExample: true });
      await tick();
      const Q = H.Q();
      const n = Q.qs.length;
      for (let i = 0; i < n; i++) {
        const q = Q.qs[Q.i];
        checkDom(`${where} q${i + 1}`, q);
        const right = H.answerFor(q);
        if (!H.isCorrect(q, right)) fail(`${where} q${i + 1}`, `the demo/answer path does not solve it (${q.t}: ${q.q})`);
        if (i === 1 || i === 2) {
          Object.assign(Q.st, wrongState(q));
          H.ACT.check();
          if (!Q.st.msg || Q.st.msg.kind !== 'try') fail(`${where} q${i + 1}`, 'first wrong answer did not say "try again"');
          if (i === 1) { Object.assign(Q.st, right, { tries: Q.st.tries, msg: null }); H.ACT.check(); if (!Q.st.correct) fail(`${where} q${i + 1}`, 'right answer after a miss was not accepted'); }
          else { Object.assign(Q.st, wrongState(q), { tries: Q.st.tries, msg: null }); H.ACT.check(); if (!Q.st.done || Q.st.correct !== false) fail(`${where} q${i + 1}`, 'second wrong answer did not end the question'); if (!document.querySelector('.fb-bad .fb-answer')) fail(`${where} q${i + 1}`, 'answer not shown after two misses'); }
        } else {
          Object.assign(Q.st, right);
          H.ACT.check();
          if (!Q.st.correct) fail(`${where} q${i + 1}`, `right answer rejected (${q.t}: ${q.q} → ${q.a})`);
        }
        out.questions++;
        H.ACT.next();
        await tick();
      }
      const want = Math.round(((n - 2) + 0.5) / n * 100);
      if (H.view().name !== 'results') fail(where, `ended on ${H.view().name}, not results`);
      else if (Q.result.pct !== want) fail(where, `score ${Q.result.pct}%, expected ${want}%`);
      out.rounds++;
    }
    // "Watch first": the demo's steps must solve the demo question.
    H.startRound({ mode: 'skill', s: s.id, k: k.id, l });
    await tick();
    const Q = H.Q();
    if (H.view().name !== 'example') fail(where, 'no "Watch first" screen');
    else {
      const st = H.freshSt();
      H.demoSteps(Q.demo).forEach((x) => x.apply(st));
      if (!H.isCorrect(Q.demo, st)) fail(where, 'the demo does not reach the right answer');
      if (!document.querySelector('.lesson .rule')) fail(where, 'no lesson rule on the Watch first screen');
    }
    H.ACT.startQuest(); await tick();
    H.go('home'); await tick();
  }
  return out;
})();
