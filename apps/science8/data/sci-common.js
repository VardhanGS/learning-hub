// Science Quest 8: shared pieces. Questions are written in a compact item language, one string per question:
//   mc | question | answer | wrong1 :: why it is wrong ; wrong2 ; wrong3 | explanation
//   tf | statement | true or false | explanation
//   multi | question | right1 ; right2 | wrong1 ; wrong2 | explanation
//   sort | question | Bin A = x ; y | Bin B = z ; w | explanation
//   order | question | first ; second ; third | explanation
// A level is [title, desc, rule, example, items]; a lesson becomes a skill with three levels and "Watch first"
// lessons made from rule and example. Topics are added in topics.js (one subject per topic, plus a Topic review).
const LESSONS = {};
const S8 = (() => {
  const split = (s) => s.split(';').map((x) => x.trim()).filter(Boolean);
  function item(line, icons) {
    const [kind, q, ...f] = line.split(' | ').map((x) => x.trim());
    const fig = Fig.picture(icons), base = { fig, hint: 'Think about the key words in the question, then check each choice.' };
    if (kind === 'mc') {
      const wrongs = split(f[1]).map((w) => { const [v, why] = w.split('::').map((x) => x.trim()); return [v, why || '']; });
      const o = U.mcMiss(q, f[0], wrongs, { ...base, why: f[2] });
      Object.keys(o.miss).forEach((k) => { if (!o.miss[k]) delete o.miss[k]; });
      return o;
    }
    if (kind === 'tf') return U.mcFixed(`True or false?\n${q}`, f[0] === 'true' ? 'True' : 'False', ['True', 'False'], { ...base, why: f[1] });
    if (kind === 'multi') return U.multi(`${q} Choose all that are right.`, split(f[0]), split(f[1]), { ...base, why: f[2], meta: { kind: 'sciKey', args: [split(f[0]), split(f[1])] } });
    if (kind === 'sort') {
      const bins = f.slice(0, -1).map((b) => b.split('=')[0].trim()), items = f.slice(0, -1).flatMap((b, i) => split(b.split('=')[1]).map((w) => ({ w, b: i })));
      return { t: 'sort', q, bins, items: U.shuffle(items), ...base, why: f[f.length - 1] };
    }
    if (kind === 'order') return U.order(q, split(f[0]), { ...base, list: true, why: f[1] });
    throw new Error(`Science Quest 8: unknown item kind "${kind}" in: ${line}`);
  }
  const tag = (q, std) => Object.assign(q, { std, rit: 220, goal: 'sci' });
  // A lesson skill: levels [[title, desc, rule, example, items], …] (3 levels). video = id in video_scripts.py.
  function lesson(id, name, icon, icons, std, levels, video) {
    return {
      id, name, icon,
      levels: levels.map(([title, desc, rule, ex, items], l) => {
        LESSONS[`${id}.${l}`] = { rule, ex, video, fig: () => Fig.picture(icons) };
        const s = Array.isArray(std) ? std[l] : std;
        return { title, std: s, desc, gen: () => U.shuffle(items).slice(0, 8).map((line) => tag(item(line, icons), s)), items };
      }),
    };
  }
  return { lesson, item };
})();
const SCI_TOPICS = [];
