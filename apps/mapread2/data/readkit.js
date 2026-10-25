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
    const keep = (x) => x.replace(/\b(Mr|Ms|Mrs|Dr|St)\./g, '$1\u2024'), back = (x) => x.replace(/\u2024/g, '.');
    text.split('\n').forEach((line) => { (keep(line).match(/[^.!?]+[.!?]+["”’')]*|[^.!?]+$/g) || []).forEach((s) => { const t = back(s.trim()); if (t.length > 2) out.push(t); }); });
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
  // ---- pictures of nonfiction pages (text features) ----
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // A book page: heading, a picture with a caption, text lines with one bold word, and an optional mark ('?')
  // pointing at one part: 'heading' | 'caption' | 'bold' | 'picture'.
  function pageFig({ heading, icon, caption, bold, mark = null }) {
    const W = 320, H = 230;
    let b = `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="10" class="pc-cell"/>`;
    b += `<text x="20" y="34" class="fg-text" font-size="19" font-weight="800">${esc(heading)}</text>`;
    b += `<rect x="20" y="48" width="120" height="96" rx="8" class="pc-head"/><text x="80" y="110" font-size="44" text-anchor="middle">${icon}</text>`;
    b += `<text x="80" y="162" class="fg-text" font-size="11" text-anchor="middle" font-style="italic">${esc(caption)}</text>`;
    for (let i = 0; i < 6; i++) b += `<rect x="156" y="${54 + i * 16}" width="${i === 5 ? 90 : 140}" height="7" rx="3" class="gr-grid" style="fill:var(--line)"/>`;
    b += `<text x="156" y="168" class="fg-text" font-size="14" font-weight="800">${esc(bold)}</text><rect x="156" y="174" width="140" height="7" rx="3" style="fill:var(--line)"/><rect x="20" y="190" width="276" height="7" rx="3" style="fill:var(--line)"/><rect x="20" y="206" width="200" height="7" rx="3" style="fill:var(--line)"/>`;
    const at = { heading: [W - 40, 28], caption: [150, 160], bold: [W - 18, 164], picture: [150, 96] }[mark];
    if (at) b += `<circle cx="${at[0]}" cy="${at[1]}" r="13" class="tf-a"/><text x="${at[0]}" y="${at[1] + 6}" class="fg-text" font-size="16" text-anchor="middle">?</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="A page with the heading ${esc(heading)}, a picture with a caption, and a bold word${mark ? `; a question mark points at the ${mark}` : ''}">${b}</svg>`;
  }
  // A table of contents or a glossary/index as a picture.
  function listFig(title, rows, right = true) {
    const W = 300, H = 46 + rows.length * 30;
    let b = `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="10" class="pc-cell"/><text x="${W / 2}" y="32" class="fg-text" font-size="17" font-weight="800" text-anchor="middle">${esc(title)}</text>`;
    rows.forEach(([l, r], i) => { const y = 60 + i * 30; b += `<text x="20" y="${y}" class="fg-text" font-size="14">${esc(l)}</text>${right ? `<text x="${W - 20}" y="${y}" class="fg-text" font-size="14" text-anchor="end">${esc(r)}</text><line x1="${20 + l.length * 7.6}" y1="${y - 4}" x2="${W - 24 - String(r).length * 8}" y2="${y - 4}" class="gr-grid" style="stroke-dasharray:2 4"/>` : `<text x="20" y="${y + 14}" class="fg-text" font-size="12" style="opacity:.75">${esc(r)}</text>`}`; });
    return `<svg viewBox="0 0 ${W} ${right ? H : H + rows.length * 14}" width="${W}" role="img" aria-label="${esc(title)}: ${rows.map((r) => r.join(' ')).join('; ')}">${b}</svg>`;
  }
  // A labeled diagram: an emoji in the middle with labels around it.
  function diagramFig(title, icon, labels) {
    const W = 320, H = 230, cx = 160, cy = 125;
    let b = `<text x="${cx}" y="24" class="fg-text" font-size="16" font-weight="800" text-anchor="middle">${esc(title)}</text><text x="${cx}" y="${cy + 30}" font-size="90" text-anchor="middle">${icon}</text>`;
    const spots = [[30, 70, 110, 95], [290, 70, 210, 95], [30, 200, 115, 160], [290, 200, 205, 160]];
    labels.slice(0, 4).forEach((l, i) => { const [lx, ly, tx, ty] = spots[i]; b += `<line x1="${lx < cx ? lx + 50 : lx - 50}" y1="${ly - 4}" x2="${tx}" y2="${ty}" class="fg-stroke" style="stroke-width:1.5"/><text x="${lx}" y="${ly}" class="fg-text" font-size="14" text-anchor="${lx < cx ? 'start' : 'end'}">${esc(l)}</text>`; });
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="Diagram: ${esc(title)}, labeled ${labels.join(', ')}">${b}</svg>`;
  }
  return { P, sentences, item, passLevel, shortLevel, genLevel, solo, TAG_RIT, TAG_NAME, pageFig, listFig, diagramFig };
})();
const READ_SKILLS = [];
