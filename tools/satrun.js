// In-page check of the SAT-style practice test through the real screens (open <app>/#debug, then inject this file).
// A simulated student at ability SAT_THETA answers each question right with the model's chance, moving through the
// module with Next, marking some questions, using Back once, opening the question menu, and submitting. One module can
// be ended by the timer instead (SAT_TIMEUP = true). Returns the scores from the report and any failures.
(async () => {
  const H = window.__hub, A = H.ACT, THETA = window.SAT_THETA || 550, out = { failures: [], modules: [] };
  const fail = (m) => out.failures.push(m), tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));
  const kind = window.SAT_KIND || 'full';
  A.satStart({ kind }); await tick();
  for (let mod = 0; mod < (kind === 'full' ? 4 : 2); mod++) {
    const Q = H.Q_(); if (!Q || !Q.module) { fail(`module ${mod + 1} did not start`); break; }
    const n = Q.qs.length, title = Q.module.title;
    if (!document.getElementById('mtimer')) fail(`${title}: no timer shown`);
    if (Q.module.calc && !document.querySelector('[data-act="calcToggle"]')) fail(`${title}: no calculator button`);
    if (Q.module.reference && !document.querySelector('[data-act="mRef"]')) fail(`${title}: no reference sheet button`);
    for (let i = 0; i < n; i++) {
      const q = Q.qs[Q.i], st = Q.st, right = Math.random() < SatCore.pRight(THETA, { b: q.b, c: SatCore.guess(q) });
      if (Q.i !== i) fail(`${title}: expected question ${i + 1}, at ${Q.i + 1}`);
      if (Math.random() < 0.05) { A.check(); await tick(); continue; } // leave a few blank
      const ans = H.answerFor(q);
      if (q.t === 'mc') st.chosen = right ? ans.chosen : q.opts.find((o) => o !== q.a);
      else st.typed = right ? ans.typed : String(+N.parse(q.a).n + 1);
      if (H.isCorrect(q, st) !== right) fail(`${title} q${i + 1}: correctness check disagrees`);
      if (i === 3) A.mMark();
      if (i === 5) { A.mPrev(); await tick(); if (H.Q_().i !== 4) fail('Back did not go back'); A.check(); await tick(); }
      A.check(); await tick();
    }
    if (!document.querySelector('.qmenu')) fail(`${title}: the question menu did not open at the end`);
    if (!document.querySelector('.qm.mark')) fail(`${title}: the marked question is not shown in the menu`);
    if (window.SAT_TIMEUP && mod === 1) { H.Q_().ends = Date.now() - 1000; await tick(1300); } else A.mSubmit();
    await tick();
    const v = H.view().name; out.modules.push({ title, n, next: v });
    if (v === 'satBetween') { A.satNext(); await tick(); }
  }
  if (H.view().name !== 'satReport') fail(`ended on ${H.view().name}, not the report`);
  out.report = [...document.querySelectorAll('.band-num')].map((e) => e.textContent);
  out.text = document.querySelector('.report') ? document.querySelector('.report').innerText.slice(0, 400) : '';
  return out;
})();
