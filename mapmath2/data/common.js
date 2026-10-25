// Shared pieces for Math Quest 2 content. Every answer is computed in code; meta {kind, args} lets
// tools/validate.js recompute it independently. Goal areas follow MAP Growth Math 2–5 (NWEA 2025):
// number, algebra, geometry (Geometry; Probability & Statistics, which includes measurement and data).
const MQ = (() => {
  // Kept short on purpose: every name × object pair in a story is a separately recorded voice clip.
  const KIDS = [['Maya', 'she'], ['Leo', 'he'], ['Aarav', 'he'], ['Sofia', 'she'], ['Kenji', 'he'], ['Zara', 'she'], ['Omar', 'he'], ['Priya', 'she']];
  const THINGS = ['stickers', 'marbles', 'shells', 'crayons', 'stamps', 'beads', 'cards', 'blocks'];
  const pl = (n, w, many) => `${n} ${n === 1 ? w : many || w + 's'}`;
  const tag = (q, std, rit, goal) => Object.assign(q, { std, rit, goal });
  const ones = (n) => n % 10, tens = (n) => Math.floor(n / 10) % 10;
  const kid = () => U.pick(KIDS);
  const thing = () => U.pick(THINGS);
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  // Misconception notes for a + b (both under 1,000).
  function addMisses(a, b) {
    const s = a + b, w = [];
    const os = ones(a) + ones(b);
    if (os >= 10) {
      w.push([s - 10, `It looks like the 10 ones were not regrouped. ${ones(a)} + ${ones(b)} = ${os}, which is 1 ten and ${pl(os - 10, 'one')}.`]);
      if (a < 100 && b < 100) w.push([`${Math.floor(a / 10) + Math.floor(b / 10)}${os}`, `It looks like all ${os} ones were written down. Trade 10 ones for 1 ten first.`]);
    }
    if (tens(a) + tens(b) + (os >= 10 ? 1 : 0) >= 10 && s >= 100) w.push([s - 100, 'It looks like 10 tens were not regrouped as 1 hundred.']);
    if (b < 10) w.push([a + 10 * b, `It looks like ${b} was added to the tens. ${b} is ${pl(b, 'one')}, so add it to the ones.`]);
    w.push([s + 10, 'That is 10 too many. Check how many tens you carried.']);
    w.push([Math.abs(a - b), `That is ${Math.max(a, b)} − ${Math.min(a, b)}. The question asks you to add.`]);
    return w.filter(([v]) => +v !== s && +v >= 0);
  }
  // Misconception notes for a − b.
  function subMisses(a, b) {
    const d = a - b, w = [];
    const sfb = [100, 10, 1].reduce((acc, p) => acc + Math.abs(Math.floor(a / p) % 10 - Math.floor(b / p) % 10) * p, 0);
    if (sfb !== d) w.push([sfb, 'In each place the smaller digit was taken from the bigger one. When the top digit is smaller, regroup first.']);
    if (ones(a) < ones(b)) w.push([d + 10, 'A ten was regrouped, but it was not taken away from the tens place.']);
    w.push([a + b, `That is ${a} + ${b}. The question asks you to subtract.`]);
    w.push([d - 10, 'That is 10 too few. Check the tens place.']);
    return w.filter(([v]) => +v !== d && +v >= 0);
  }
  const missMap = (w, a) => Object.fromEntries(w.filter(([v]) => String(v) !== String(a)).map(([v, why]) => [String(v), why]));
  return { KIDS, THINGS, pl, tag, ones, tens, kid, thing, cap, addMisses, subMisses, missMap };
})();
