// In-browser check of the reading fluency practice (open <app>/#debug, then run this file in the page).
// Plays the whole flow through the real screens: the timed sentence check (answers 10, then time runs out),
// a 45-second reading with 3 misread words and an early stop, and the questions (2 right, 1 wrong).
// Checks the words-correct-per-minute math, accuracy, the saved result, the norms band, and the history screen.
(async () => {
  const H = window.__hub, FL = window.__flu, out = { failures: [] };
  const fail = (m) => out.failures.push(m);
  const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));
  if (!FL) return { error: 'fluency mode not loaded (open with #debug)' };
  const before = (H.P().tests || []).filter((t) => t.kind === 'fluency').length;
  H.ACT.fluIntro(); await tick();
  if (H.view().name !== 'fluIntro') fail('intro did not open');
  H.ACT.fluBegin(); await tick();
  if (H.view().name !== 'fluSentences') fail('sentence check did not open');
  let R = FL.state();
  for (let i = 0; i < 10; i++) { const [, sense] = R.sent.list[R.sent.i % R.sent.list.length]; H.ACT.fluSent({ v: sense ? '1' : '0' }); await tick(); }
  H.ACT.fluSent({ v: R.sent.list[R.sent.i % R.sent.list.length][1] ? '0' : '1' }); await tick(); // one wrong on purpose
  if (R.sent.right !== 10 || R.sent.wrong !== 1) fail(`sentence score ${R.sent.right}/${R.sent.wrong}, expected 10/1`);
  R.sent.start = performance.now() - 61000; await tick(400);
  if (H.view().name !== 'fluReady') fail(`time did not run out (view ${H.view().name})`);
  await H.ACT.fluStartRead(); await tick();
  if (H.view().name !== 'fluRead') fail('reading screen did not open');
  if (!document.querySelector('.flu-read')) fail('passage not shown');
  R.read.start = performance.now() - 45000;
  H.ACT.fluDone(); await tick();
  if (H.view().name !== 'fluScore') fail('grown-up check did not open');
  const words = FL.words(R.passage.text), last = words.length - 6;
  [2, 5, 9].forEach((i) => H.ACT.fluWord({ i }));
  H.ACT.fluMarkLast(); H.ACT.fluWord({ i: last }); await tick();
  if (R.errors.size !== 3 || R.last !== last) fail(`errors ${R.errors.size}, last ${R.last}`);
  if (document.querySelectorAll('.fw.err').length !== 3) fail('misread words are not marked on screen');
  H.ACT.fluToQs(); await tick();
  const qs = R.passage.qs;
  for (let k = 0; k < qs.length; k++) { H.ACT.fluAns({ v: k === 1 ? qs[k][2][0] : qs[k][1] }); await tick(); }
  if (H.view().name !== 'fluResult') fail(`result did not open (view ${H.view().name})`);
  const t = (H.P().tests || []).filter((x) => x.kind === 'fluency').pop();
  const read = last + 1, wantW = Math.round(((read - 3) / R.read.secs) * 60), wantA = Math.round((100 * (read - 3)) / read);
  if (!t) fail('result was not saved');
  else {
    if (t.wcpm !== wantW) fail(`words correct per minute ${t.wcpm}, expected ${wantW}`);
    if (t.acc !== wantA) fail(`accuracy ${t.acc}, expected ${wantA}`);
    if (t.comp !== qs.length - 1 || t.compOf !== qs.length) fail(`questions ${t.comp}/${t.compOf}`);
    if (t.sent !== 10) fail(`sentences ${t.sent}`);
    const b = FL.band(t.wcpm, t.season), shown = document.querySelector('.desc');
    if (!shown || shown.textContent !== b.label) fail('norms band not shown correctly');
  }
  if ((H.P().tests || []).filter((x) => x.kind === 'fluency').length !== before + 1) fail('history count did not grow by one');
  H.go('fluHistory'); await tick();
  if (!document.querySelector('svg[aria-label="Words correct per minute over time"]')) fail('history chart missing');
  out.result = t && { wcpm: t.wcpm, acc: t.acc, comp: `${t.comp}/${t.compOf}`, sent: t.sent, secs: t.secs, words: t.words, errors: t.errors, band: FL.band(t.wcpm, t.season).label };
  return out;
})();
