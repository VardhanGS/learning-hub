// Reading kit shared by MAP Reading 2, 4 and 8: passages and their questions in a compact form, turned into practice
// rounds and MAP-style test items. Formats follow the general MAP Growth item types: multiple choice, multi-select,
// hot text (tap the sentence in the passage that shows the answer) and click-and-pop (put events in order).
// Every passage and question is original. Difficulty tags (rit) are hand-set estimates, not NWEA calibrations.
const RK = (() => {
  // How hard each kind of question tends to be, relative to its level (added to the level's base difficulty).
  const TAG_RIT = { detail: -5, sequence: -3, vocab: -1, character: 0, setting: -3, feeling: -2, main: 2, inference: 3, theme: 4, lesson: 3, evidence: 4, structure: 4, purpose: 3, pov: 4, compare: 5, summary: 4, device: 2, feature: -1, tone: 4, argument: 5 };
  const TAG_NAME = { detail: 'Key details', sequence: 'Sequence', vocab: 'Word meaning', character: 'Characters', setting: 'Setting', feeling: 'Feelings', main: 'Main idea', inference: 'Inference', theme: 'Theme', lesson: 'Lesson', evidence: 'Text evidence', structure: 'Text structure', purpose: "Author's purpose", pov: 'Point of view', compare: 'Compare texts', summary: 'Summary', device: 'Literary devices', feature: 'Text features', tone: 'Tone & word choice', argument: 'Arguments & claims' };

  // A passage: icons and a caption make its picture (Fig.picture) unless a ready-made SVG is given.
  function P(title, kind, text, icons = [], caption = '', svg = null) {
    return { title, kind, text: text.trim().replace(/[ \t]+\n/g, '\n'), fig: svg || (icons.length ? Fig.picture(icons, caption) : null) };
  }
  // The sentences of a passage, in order (poem and play lines count as sentences too).
  function sentences(text) {
    const out = [];
    // titles like "Ms." and "Dr." do not end a sentence
    const keep = (x) => x.replace(/\b([ap])\.m\.(?=\s+[a-z])/g, '$1\u2024m\u2024').replace(/\b([ap])\.m\./g, '$1\u2024m.').replace(/\b(Mr|Ms|Mrs|Dr|St)\./gi, '$1\u2024'), back = (x) => x.replace(/\u2024/g, '.');
    text.split('\n').forEach((line) => { (keep(line).match(/[^.!?]+[.!?]+["”’')]*|[^.!?]+$/g) || []).forEach((s) => { let t = back(s.trim());
      // a sentence split out of a stage direction keeps only its own parenthesis
      if (t.startsWith('(') && !t.includes(')')) t = t.slice(1); if (t.endsWith(')') && !t.includes('(')) t = t.slice(0, -1); if (t.length > 2 && !/^(CAST|SETTING|Text \d|Scene \d|Account [A-Z]|Act \d)\b/.test(t)) out.push(t); }); }); // headings are not sentences
    return out;
  }
  const wrongOf = (w) => (Array.isArray(w) ? w : [w, '']);

  // One question spec → one item. Specs:
  //   ['mc', q, answer, [wrong | [wrong, why] …], why, tag]
  //   ['ev', q, answer sentence (or [sentences]), why, tag]       hot text: tap the sentence(s) in the passage
  //   ['multi', q, [right …], [wrong …], why, tag]
  //   ['order', q, [event 1, event 2, …], why, tag]              click-and-pop: tap the events in order
  function item(passage, spec, base, goal, std) {
    const [type] = spec, tag = spec[spec.length - 1];
    const rit = base + (TAG_RIT[tag] ?? 0);
    const common = { passage, std, rit, goal, tag: TAG_NAME[tag] || tag };
    if (type === 'mc') {
      const [, q, a, ws, why] = spec, miss = {};
      ws.map(wrongOf).forEach(([w, note]) => { if (note) miss[w] = note; });
      return { t: 'mc', q, a, opts: U.shuffle([a, ...ws.map((w) => wrongOf(w)[0])]), miss, why, ...common };
    }
    if (type === 'ev') {
      const [, q, ans, why] = spec, want = [].concat(ans), all = sentences(passage.text);
      const others = U.sample(all.filter((s) => !want.includes(s)), Math.max(2, 4 - want.length));
      const cells = all.filter((s) => want.includes(s) || others.includes(s)); // keep the passage's order
      return { t: 'hot', q, cells, layout: 'list', multi: want.length > 1, a: cells.map((c, i) => (want.includes(c) ? i : -1)).filter((i) => i >= 0), meta: { kind: 'hotEvidence', args: [want] }, why, ...common, rit: rit + (want.length > 1 ? 2 : 0) };
    }
    if (type === 'multi') {
      const [, q, right, wrong, why] = spec;
      return { ...U.multi(q, right, wrong), meta: { kind: 'multiText', args: [right] }, why, ...common, rit: rit + 3 };
    }
    if (type === 'order') {
      const [, q, events, why] = spec;
      return { t: 'pop', q, template: events.map(() => '□').join(' → '), tiles: U.shuffle(events), accept: [events], meta: { kind: 'popSeq', args: [events] }, why, ...common };
    }
    throw new Error(`unknown question type ${type}`);
  }

  // A practice level made of passages: each round is one passage with all its questions (shuffled a little,
  // keeping evidence questions after the question they prove). `all` lists every item, for the test's pool.
  function passLevel(title, std, desc, passages, goal, base) {
    const build = (p) => p.qs.map((spec) => item(p.passage, spec, base + (p.dif || 0), goal, std));
    return { title, std, desc, gen: () => build(U.pick(passages)), all: () => passages.flatMap(build) };
  }
  // Short passages with one or two questions each (the MAP style): a round mixes 8 of them.
  function shortLevel(title, std, desc, entries, goal, base) {
    const build = (e) => e.qs.map((spec) => item(e.passage, spec, base + (e.dif || 0), goal, std));
    return { title, std, desc, gen: () => U.mix(8, entries.map((e) => () => U.pick(build(e)))), all: () => entries.flatMap(build) };
  }
  // A level made from generator functions that return finished items (vocabulary and devices).
  function genLevel(title, std, desc, fns, all) { return { title, std, desc, gen: () => U.mix(8, fns), all }; }
  // A question that needs no passage (a sentence or a word); tag gives the difficulty offset.
  function solo(q, a, ws, why, { fig = null, tag = 'vocab', base, goal, std, hint = '', sentence = null }) {
    const miss = {};
    ws.map(wrongOf).forEach(([w, note]) => { if (note) miss[w] = note; });
    return { t: 'mc', q: sentence ? `${sentence}\n\n${q}` : q, a, opts: U.shuffle([a, ...ws.map((w) => wrongOf(w)[0])]), miss, why, hint, fig, std, goal, rit: base + (TAG_RIT[tag] ?? 0), tag: TAG_NAME[tag] || tag };
  }
  const { pageFig, listFig, diagramFig } = Fig; // drawn in core/engine/fig.js (videos use them too)
  return { P, sentences, item, passLevel, shortLevel, genLevel, solo, TAG_RIT, TAG_NAME, pageFig, listFig, diagramFig };
})();
const READ_SKILLS = [];
