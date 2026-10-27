// SAT Prep — more Math question types, from the patterns of the College Board practice tests (studied 2026-10-26;
// nothing copied): word problems with realistic numbers, "which equation/inequality represents this situation",
// "best interpretation of …", graph choices, Roman-numeral and NOT questions, dot plots, weighted means, estimating
// from a random sample, evaluating claims from studies, absolute value, and a line meeting a parabola.
// Each generator is added to an existing skill and level (SAT_MATH_EXTRA, read by sat-math.js).
const SAT_MATH_EXTRA = (() => {
  const { tag, mc4, spr, pic, bAt, fx, nz } = SAT;
  const pick = U.pick, done = (o, std, b, goal) => o && tag(o, std, b, goal);
  const commas = (n) => Number(n).toLocaleString('en-US');
  const sgn = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);

  // ---------- Algebra ----------
  // "Which equation represents this situation?" (linear equation in two variables)
  const MODELS = [
    ['In a quiz game, a team earns', 'points for each easy question it answers correctly and', 'points for each hard question it answers correctly. A team earned', 'points', 'easy questions answered correctly', 'hard questions answered correctly', [2, 3, 4], [5, 6, 7, 8], [60, 90, 120]],
    ['A bookstore sells used paperbacks for $', 'each and used hardcovers for $', 'each. On Saturday, the store took in $', 'from these books', 'paperbacks sold', 'hardcovers sold', [2, 3, 4], [6, 7, 9], [180, 240, 315]],
    ['A park rents beach chairs for $', 'per day and umbrellas for $', 'per day. Last month, the park collected $', 'from these rentals', 'beach chairs rented', 'umbrellas rented', [5, 8, 11], [12, 18, 15], [730, 940, 1210]],
  ];
  function modelEq(l) {
    const [s1, s2, s3, s4, xw, yw, as, bs, ts] = pick(MODELS), a = pick(as), b = pick(bs.filter((v) => v !== a)), t = pick(ts);
    const money = s1.endsWith('$');
    const q = `${s1}${a} ${s2}${b} ${s3}${t} ${s4}. Which equation represents this situation, where ${T('x')} is the number of ${xw} and ${T('y')} is the number of ${yw}?`;
    const E = (p, r, c) => T(`${p}x + ${r}y = ${c}`);
    return done(mc4(q, E(a, b, t), [E(b, a, t), T(`x + y = ${t}`), T(`${a + b}(x + y) = ${t}`)], { fig: pic([money ? '🧾' : '🏆'], money ? 'price × number + price × number = total' : 'points × number + points × number = total'), why: `Each of the ${xw} is worth ${money ? '$' : ''}${a}${money ? '' : ' points'}, so they give ${a}x; each of the ${yw} gives ${b}y; together they make ${t}.`, hint: 'Multiply each amount by its number, then add.' }), 'A.CED.A.2', bAt(l, 0.4), 'alg');
  }
  // Best interpretation of the slope or the intercept of a linear model
  const LINEAR = [
    ['C', 'h', 'total cost C, in dollars, to rent a pontoon boat for h hours', 'the cost per hour to rent the boat', 'a one-time fee, in dollars, to rent the boat', 'the total cost, in dollars, to rent the boat for one hour', 'the number of hours the boat is rented'],
    ['W', 'd', 'amount of water W, in liters, in a tank d days after it began to be filled', 'the number of liters added to the tank each day', 'the number of liters in the tank when filling began', 'the number of liters in the tank after one day', 'the number of days needed to fill the tank'],
    ['P', 'm', 'number of pages P that remain to be read in a novel after a student reads for m minutes', 'the number of pages the student reads each minute', 'the number of pages in the novel before the student starts reading', 'the number of pages left after one minute of reading', 'the number of minutes the student reads each day'],
  ];
  function interpret(l) {
    const [Y, X, what, rate, start, oneUnit, other] = pick(LINEAR), dec = Y === 'P', m = dec ? pick([0.8, 1.2, 1.5]) : pick([35, 45, 60, 12, 25]), b = dec ? pick([320, 384, 412]) : pick([90, 120, 150, 200]);
    const askRate = U.pick([true, false]), eq = dec ? `${Y} = ${b} - ${m}${X}` : `${Y} = ${m}${X} + ${b}`;
    const q = `The equation ${T(eq)} gives the ${what}. What is the best interpretation of ${askRate ? m : b} in this context?`;
    const right = askRate ? `It is ${rate}.` : `It is ${start}.`, wrongs = [askRate ? `It is ${start}.` : `It is ${rate}.`, `It is ${oneUnit}.`, `It is ${other}.`];
    return done(mc4(q, right, wrongs, { fig: pic(['📈'], 'starting value and rate of change'), why: askRate ? `${m} multiplies ${X}, so it is the change in ${Y} for each 1 unit of ${X}.` : `${b} is the value of ${Y} when ${X} = 0, the starting amount.`, hint: 'In y = mx + b, m is the rate of change and b is the starting value (when x = 0).' }), 'F.LE.B.5', bAt(l, 0.6), 'alg');
  }
  // "Which inequality represents …?" with prices like $1.87
  function ineqModel(l) {
    const [who, a, A, b, B] = pick([['Leo', 'containers', 'c', 'rolls of tape', 't'], ['Maya', 'notebooks', 'n', 'pens', 'p'], ['Omar', 'bags of soil', 's', 'flower pots', 'f']]);
    const pa = pick([1.87, 2.15, 3.40, 4.25]), pb = pick([2.40, 0.95, 1.60, 5.10]), cash = pick([15, 20, 25, 40]);
    const E = (u, v, op) => T(`${u.toFixed(2)}${A} + ${v.toFixed(2)}${B} ${op} ${cash}`);
    const q = `${who} has $${cash} to spend on ${a} that cost $${pa.toFixed(2)} each and ${b} that cost $${pb.toFixed(2)} each. Which inequality represents the possible numbers of ${a}, ${T(A)}, and ${b}, ${T(B)}, that ${who} can buy?`;
    return done(mc4(q, E(pa, pb, '\\le'), [E(pa, pb, '\\ge'), E(pb, pa, '\\le'), E(pb, pa, '\\ge')], { fig: pic(['🛒'], 'cost of the items ≤ money available'), why: `The cost ${pa.toFixed(2)}${A} + ${pb.toFixed(2)}${B} can be at most $${cash}, so “≤”.`, hint: 'Price times number for each item; the total must be no more than the money.' }), 'A.CED.A.3', bAt(l, 0.4), 'alg');
  }
  // NOT question: which point is NOT a solution of the inequality?
  function notSolution(l) {
    const m = nz(-3, 3), b = U.int(-4, 4), above = (x, y) => y > m * x + b, pts = [];
    let g = 0; while (pts.length < 3 && g++ < 200) { const x = U.int(-4, 4), y = m * x + b + U.int(1, 6); if (!pts.some((p) => p[0] === x)) pts.push([x, y]); }
    const x0 = U.int(-4, 4), bad = [x0, m * x0 + b - U.int(0, 4)]; // on or below the line: not a solution
    if (pts.length < 3 || !pts.every((p) => above(...p)) || above(...bad)) return notSolution(l);
    const P = (p) => `(${fx(p[0])}, ${fx(p[1])})`;
    return done(mc4(`Which of the following points is NOT a solution to the inequality ${T(`y > ${m === 1 ? '' : m === -1 ? '-' : m}x ${sgn(b)}`)}?`, P(bad), pts.map(P), { fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], range: [-8, 8], step: 4 }), why: `For ${P(bad)}: ${m}(${bad[0]}) ${sgn(b)} = ${m * bad[0] + b}, and ${bad[1]} is not greater than ${m * bad[0] + b}.`, hint: 'Substitute each point. A NOT question has exactly one point that fails.' }), 'A.REI.D.12', bAt(l, 0.7), 'alg');
  }
  // Roman numerals: which could be the other equation in a system with no / infinitely many solutions?
  function romanSystem(l) {
    const a = U.int(2, 6), b = nz(-7, 7), c = U.int(3, 20), k = pick([2, 3, 4]), d = c * k + nz(-5, 5), none = U.pick([true, false]);
    const L1 = T(`${k * a}x ${sgn(k * b)}y = ${d}`), L2 = T(`${k * a}x ${sgn(k * b)}y = ${c * k}`), first = U.pick([true, false]);
    const [I, II] = first ? [L1, L2] : [L2, L1], right = (none ? first : !first) ? 'I only' : 'II only';
    const q = `${T(`${a}x ${sgn(b)}y = ${c}`)}\nThe given equation is one of the two equations in a system of linear equations. If the system has ${none ? 'no solution' : 'infinitely many solutions'}, which of the following could be the other equation in the system?\nI. ${I}\nII. ${II}`;
    return done(mc4(q, right, ['I only', 'II only', 'I and II', 'Neither I nor II'].filter((o) => o !== right), { fig: pic(['✖️'], 'parallel lines or the same line'), why: `Multiplying the given equation by ${k} gives ${k * a}x ${sgn(k * b)}y = ${c * k}: that is the same line (infinitely many solutions). The same left side with a different number is a parallel line (no solution).`, hint: 'Multiply the given equation by a number. Same left side and same right side: same line. Same left side, different right side: parallel lines.' }), 'A.REI.C.6', bAt(2, 0.8), 'alg');
  }
  // Graph choice: which graph represents ax + by = c in context?
  function graphChoice(l) {
    const xi = pick([4, 5, 6, 8]), yi = pick([3, 6, 9, 10].filter((v) => v !== xi)), c = xi * yi, a = c / xi, b = c / yi;
    const lineFig = (m, bb) => Fig.graph({ fns: [{ kind: 'lin', m, b: bb }], range: { x: [0, 12], y: [0, 12] }, step: 2, w: 220 });
    const right = lineFig(-yi / xi, yi), wrongs = [lineFig(-xi / yi, xi), lineFig(yi / xi, 0), lineFig(-yi / xi, yi + 2)];
    const order = U.shuffle([0, 1, 2, 3]), svgs = [right, ...wrongs], k = order.indexOf(0);
    const q = `The equation ${T(`${a}x + ${b}y = ${c}`)} represents the possible numbers of small boxes, ${T('x')}, and large boxes, ${T('y')}, that fill a shelf. Which graph represents this situation?`;
    return done({ t: 'mc', q, a: 'ABCD'[k], opts: ['A', 'B', 'C', 'D'], fig: Fig.choices(order.map((i) => svgs[i])), meta: { kind: 'picChoice', args: [k] }, why: `When x = 0, y = ${c}/${b} = ${yi}; when y = 0, x = ${c}/${a} = ${xi}. The line falls from (0, ${yi}) to (${xi}, 0).`, hint: 'Find where the line crosses each axis: set x = 0, then set y = 0.' }, 'A.REI.D.10', bAt(l, 0.5), 'alg');
  }

  // ---------- Advanced Math ----------
  function absValue(l) {
    const a = nz(-9, 9), b = U.int(2, 12), ask = U.pick(['sum', 'pos']);
    if (ask === 'pos' && a - b > 0) return absValue(l);
    const v = ask === 'sum' ? 2 * a : a + b;
    return done(spr(`${T(`|x ${sgn(-a)}| = ${b}`)}\nWhat is ${ask === 'sum' ? 'the sum of the solutions to the given equation' : 'the positive solution to the given equation'}?`, v, { fig: Fig.numLine(a - b - 2, a + b + 2, 1, { labels: [a - b, a, a + b], marks: [{ v: a - b, label: fx(a - b) }, { v: a + b, label: fx(a + b) }] }), meta: { kind: 'evalAt', args: [ask === 'sum' ? `2*(${a})` : `${a}+${b}`, {}] }, why: `x ${sgn(-a)} = ${b} or x ${sgn(-a)} = −${b}, so x = ${a + b} or x = ${a - b}.`, hint: 'An absolute value equation |A| = b splits into A = b and A = −b.' }), 'A.CED.A.1', bAt(l, 0.6), 'adv');
  }
  function projectile(l) {
    const v0 = pick([32, 48, 64, 80]), s = pick([4, 6, 20, 36]), [thing, from] = pick([['ball', 'a platform'], ['model rocket', 'a launch tower'], ['water balloon', 'a balcony']]);
    return done(mc4(`The function ${T(`h(t) = -16t^{2} + ${v0}t + ${s}`)} gives the height, in feet, of a ${thing} ${T('t')} seconds after it is launched from ${from}. What is the best interpretation of ${s} in this context?`, `The ${thing} was ${s} feet above the ground when it was launched.`, [`The ${thing} reached a greatest height of ${s} feet.`, `The ${thing} was launched at a speed of ${s} feet per second.`, `The ${thing} was in the air for ${s} seconds.`], { fig: Fig.graph({ fns: [{ kind: 'quad', a: -16, h: v0 / 32, k: s + v0 * v0 / 64 }], range: { x: [0, Math.ceil(v0 / 16) + 1], y: [0, s + v0 * v0 / 64 + 10] } }), why: `At t = 0, h(0) = ${s}: the starting height.`, hint: 'The constant term is the value when t = 0.' }), 'F.IF.B.4', bAt(l, 0.5), 'adv');
  }
  function growthInitial(l) {
    const a = pick([150, 240, 600, 1200, 2500]), b = pick([1.5, 2, 3, 1.25]), what = pick(['bacteria in a growth medium', 'members of an online club', 'cells in a sample']);
    return done(spr(`The equation ${T(`y = ${a}(${b})^{x}`)} gives the predicted number of ${what}, ${T('y')}, ${T('x')} hours after the first count. According to the equation, what was the predicted number at the first count?`, a, { fig: pic(['🦠'], 'value when x = 0'), meta: { kind: 'evalAt', args: [`${a}*${b}^0`, {}] }, why: `At x = 0, ${b}⁰ = 1, so y = ${a}.`, hint: 'The first count is at x = 0. Any number to the power 0 is 1.' }), 'F.LE.B.5', bAt(l, 0.3), 'adv');
  }
  function lineParabola(l) {
    const r1 = nz(-5, 5), r2 = U.intWhere(-5, 5, (v) => v !== r1), c = U.int(-6, 6), m = r1 + r2, d = c - r1 * r2;
    const ask = U.pick(['sum', 'point']);
    const sys = `${T(`y = x^{2} ${c ? sgn(c) : ''}`)}\n${T(`y = ${m === 1 ? '' : m === -1 ? '-' : m === 0 ? '' : m}${m === 0 ? '' : 'x'} ${m === 0 ? d : sgn(d)}`)}`;
    if (ask === 'sum') return done(spr(`${sys}\nThe graphs of the given equations intersect at two points, ${T('(x_1, y_1)')} and ${T('(x_2, y_2)')}. What is the value of ${T('x_1 + x_2')}?`, m, { fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 0, k: c }, { kind: 'lin', m, b: d }], range: [-8, 8], step: 4 }), meta: { kind: 'evalAt', args: [`${r1}+${r2}`, {}] }, why: `Set x² ${sgn(c)} = ${m}x ${sgn(d)}: x² ${sgn(-m)}x ${sgn(c - d)} = 0, so x = ${r1} or x = ${r2}; the sum is ${m}.`, hint: 'Set the two expressions for y equal, then solve the quadratic.' }), 'A.REI.C.7', bAt(2, 0.6), 'adv');
    const P = (x) => `(${fx(x)}, ${fx(x * x + c)})`;
    return done(mc4(`${sys}\nWhich of the following is a solution to the given system of equations?`, P(r1), [`(${fx(-r1)}, ${fx(r1 * r1 + c)})`, `(${fx(r1)}, ${fx(r1 * r1 + c + 2)})`, `(${fx(r1 + r2)}, ${fx(d)})`], { fig: Fig.graph({ fns: [{ kind: 'quad', a: 1, h: 0, k: c }, { kind: 'lin', m, b: d }], range: [-8, 8], step: 4 }), why: `${P(r1)} makes both equations true: ${r1}² ${sgn(c)} = ${r1 * r1 + c} and ${m}(${r1}) ${sgn(d)} = ${m * r1 + d}.`, hint: 'A solution must make BOTH equations true. Test each point.' }), 'A.REI.C.7', bAt(l, 0.7), 'adv');
  }

  // ---------- Problem-Solving and Data Analysis ----------
  function pctContext(l) {
    const [who, n, thing, act] = pick([['Amara', pick([250, 400, 750, 1200]), 'cherry tomatoes she harvested', 'gave to her neighbors'], ['A school', pick([600, 840, 1250]), 'books in its library', 'donated to a reading program'], ['Ravi', pick([320, 480, 900]), 'photos he took on a trip', 'printed']]);
    const p = pick([10, 15, 20, 25, 40, 60]), v = (n * p) / 100;
    if (!Number.isInteger(v)) return pctContext(l);
    return done(spr(`${who} ${act} ${p}% of the ${n} ${thing}. How many is that?`, v, { fig: Fig.barModel(String(n), [`${p}%`, '']), meta: { kind: 'evalAt', args: [`${p}/100*${n}`, {}] }, why: `${p}% of ${n} = ${p / 100} × ${n} = ${v}.`, hint: `${p}% means ${p} out of every 100.` }), '7.RP.A.3', bAt(0, 0.2), 'psda');
  }
  function sampleEstimate(l) {
    const N = pick([12000, 20000, 30000, 45000]), n = pick([200, 300, 400, 500]), k = U.int(4, 40), v = (k * N) / n;
    if (!Number.isInteger(v) || v < 100) return sampleEstimate(l);
    const [org, ask] = pick([['A cable company with ' + commas(N) + ' customers', 'would be interested in a new service plan'], ['A city with ' + commas(N) + ' households', 'would use a new recycling pickup'], ['A museum with ' + commas(N) + ' members', 'would attend an evening lecture series']]);
    return done(mc4(`${org} selected ${n} of them at random and asked whether they ${ask}. Of those asked, ${k} said yes. Based on the survey, which of the following is the best estimate of the total number who ${ask}?`, commas(v), [commas(k), commas(v / 10), commas(v * 10)], { fig: pic(['📋'], `${k} out of ${n}`), why: `${k}/${n} of the sample said yes; ${k}/${n} × ${commas(N)} = ${commas(v)}.`, hint: 'A random sample estimates the whole group: use the same fraction.' }), 'S.IC.A.1', bAt(l, 0.5), 'psda');
  }
  function weightedMean(l) {
    const n1 = pick([120, 160, 240, 300]), n2 = pick([60, 80, 120, 200]), m1 = U.int(80, 95), m2 = U.int(m1 + 2, m1 + 12), tot = n1 * m1 + n2 * m2;
    if (tot % (n1 + n2)) return weightedMean(l);
    const v = tot / (n1 + n2), [what, g1, g2, unit] = pick([['gray seals', 'Muskeg Island', 'Sable Bay', 'inches long'], ['students', 'East High', 'West High', 'points on a test'], ['trees', 'the north plot', 'the south plot', 'feet tall']]);
    return done(spr(`A scientist measured ${n1} ${what} from ${g1} and ${n2} ${what} from ${g2}. The mean for the ${g1} group was ${m1} ${unit}, and the mean for the ${g2} group was ${m2} ${unit}. What was the mean for all ${n1 + n2} ${what}?`, v, { fig: Fig.table([['Group', 'Number', 'Mean'], [g1, String(n1), String(m1)], [g2, String(n2), String(m2)]]), meta: { kind: 'evalAt', args: [`(${n1}*${m1}+${n2}*${m2})/(${n1}+${n2})`, {}] }, miss: { [String((m1 + m2) / 2)]: 'The groups are different sizes, so you cannot just average the two means.' }, why: `(${n1} × ${m1} + ${n2} × ${m2}) ÷ ${n1 + n2} = ${commas(tot)} ÷ ${n1 + n2} = ${v}.`, hint: 'Total of all values = number × mean for each group. Then divide by the total number.' }), 'S.ID.A.2', bAt(l, 0.6), 'psda');
  }
  function dotPlotMedian(l) {
    let vals; do { vals = Array.from({ length: U.pick([9, 11, 13]) }, () => U.int(14, 20)); } while (new Set(vals).size < 4);
    const s = vals.slice().sort((a, b) => a - b), med = s[(s.length - 1) / 2], [what, unit] = pick([['sea stars in a tide pool', 'Diameter (inches)'], ['sunflowers in a garden', 'Height (dm)'], ['books on a shelf', 'Width (cm)']]);
    return done(spr(`The dot plot shows the measurements of ${vals.length} ${what}. What is the median of the measurements?`, med, { fig: Fig.linePlot(unit, 13, 21, vals), meta: { kind: 'median', args: [vals] }, why: `In order, the middle (number ${(s.length + 1) / 2}) value is ${med}.`, hint: 'Count the dots from the left until you reach the middle one.' }), 'S.ID.A.2', bAt(0, 0.4), 'psda');
  }
  function slopeEstimate(l) {
    const m = pick([0.4, 0.6, 1.5, 2.5]), b = U.int(1, 4), pts = [1, 2, 3, 4, 5, 6, 7, 8].map((x) => [x, Math.round((m * x + b + (Math.random() - 0.5) * 1.2) * 10) / 10]);
    const opts = [m, -m, +(m * 3).toFixed(1), +(1 / m).toFixed(1)].map((v) => String(v));
    if (new Set(opts).size < 4) return slopeEstimate(l);
    return done(mc4('The scatterplot shows the relationship between two variables, x and y. A line of best fit is also shown. Which of the following is closest to the slope of the line of best fit?', opts[0], opts.slice(1), { fig: Fig.graph({ fns: [{ kind: 'lin', m, b }], pts, range: { x: [0, 10], y: [0, Math.ceil(m * 10 + b + 2)] }, step: 2 }), why: `The line rises about ${m} for each 1 to the right.`, hint: 'Pick two points on the line and divide the rise by the run.' }), 'S.ID.C.7', bAt(l, 0.5), 'psda');
  }
  // Evaluating statistical claims: random sampling allows generalizing; random assignment allows cause-and-effect
  const STUDIES = [
    ['practicing an instrument for 20 minutes a day', 'test scores', 'students at a large high school', 'practiced for 20 minutes a day', 'did not change their routine'],
    ['using a sleep app', 'hours of sleep', 'adults in a city', 'used the app for a month', 'did not use the app'],
    ['a new reading program', 'reading speed', 'third graders in a school district', 'used the program for a semester', 'kept their usual lessons'],
  ];
  function claims(l) {
    const [treat, out, pop, did, didnt] = pick(STUDIES), design = pick(['both', 'assignOnly', 'sampleOnly']);
    const text = design === 'both' ? `Researchers selected 200 ${pop} at random. They randomly assigned half of them to a group that ${did} and the other half to a group that ${didnt}.`
      : design === 'assignOnly' ? `Researchers asked for volunteers among ${pop}, and 200 people volunteered. The researchers randomly assigned half of the volunteers to a group that ${did} and the other half to a group that ${didnt}.`
      : `Researchers selected 200 ${pop} at random and asked whether they had ${did.replace(/^used/, 'used').replace(/^practiced/, 'practiced')}. They compared the ${out} of those who had with those who had not.`;
    const C = {
      both: `${treat[0].toUpperCase() + treat.slice(1)} is likely to cause higher ${out} among ${pop}.`,
      assignOnly: `${treat[0].toUpperCase() + treat.slice(1)} is likely to cause higher ${out} among people like the volunteers, but the result cannot be generalized to all ${pop}.`,
      sampleOnly: `There is an association between ${treat} and higher ${out} among ${pop}, but the study does not show that one causes the other.`,
      none: `No conclusion about ${treat} and ${out} can be drawn from the study.`,
    };
    return done(mc4(`${text} The group that ${did} had noticeably higher ${out}. Which conclusion is best supported by the design of the study?`, C[design], Object.keys(C).filter((k) => k !== design).map((k) => C[k]), { fig: pic(['🔬'], 'random sample? random assignment?'), why: design === 'both' ? 'A random sample lets the result be generalized to the population, and random assignment supports cause and effect.' : design === 'assignOnly' ? 'Random assignment supports cause and effect, but volunteers are not a random sample, so the result applies only to people like them.' : 'Without random assignment, the study shows only an association; the random sample lets that association be generalized.', hint: 'Random SAMPLE → you can generalize to the population. Random ASSIGNMENT → you can conclude cause and effect.' }), 'S.IC.B.3', bAt(2, 0.6), 'psda');
  }

  // ---------- Geometry ----------
  function circleScale(l) {
    const h = nz(-6, 6), k = nz(-6, 6), r = U.int(2, 7), n = pick([2, 3]), v = (n * r) ** 2;
    const eq = (rr) => T(`(x ${sgn(-h)})^{2} + (y ${sgn(-k)})^{2} = ${rr}`);
    return done(spr(`Circle A in the xy-plane has the equation ${eq(r * r)}. Circle B has the same center as circle A, and its radius is ${n} times the radius of circle A. The equation of circle B is ${T(`(x ${sgn(-h)})^{2} + (y ${sgn(-k)})^{2} = m`)}, where ${T('m')} is a constant. What is the value of ${T('m')}?`, v, { fig: pic(['⭕'], `radius ${r} → ${n * r}`), meta: { kind: 'evalAt', args: [`(${n}*${r})^2`, {}] }, miss: { [String(n * r * r)]: 'The right side is the radius SQUARED: square the new radius.' }, why: `Circle A has radius ${r}; circle B has radius ${n * r}, so m = ${n * r}² = ${v}.`, hint: 'The right side of a circle equation is r². Find the new radius first, then square it.' }), 'G.GPE.A.1', bAt(l, 0.6), 'geo');
  }
  function areaContext(l) {
    const w = pick([12, 15, 18, 24]), len = pick([20, 28, 32, 40]), border = pick([2, 3]), inner = (len - 2 * border) * (w - 2 * border);
    return done(spr(`A rectangular garden is ${len} feet long and ${w} feet wide. A path ${border} feet wide runs along the inside edge of the garden, all the way around. What is the area, in square feet, of the part of the garden inside the path?`, inner, { fig: Fig.table([['Outer size', 'Path width', 'Inner size'], [`${len} × ${w}`, String(border), '? × ?']]), meta: { kind: 'evalAt', args: [`(${len}-2*${border})*(${w}-2*${border})`, {}] }, miss: { [String((len - border) * (w - border))]: 'The path is on BOTH sides of each length, so subtract it twice.' }, why: `Inner size: ${len - 2 * border} by ${w - 2 * border}, area ${inner}.`, hint: 'Subtract the path width from both ends of each side.' }), 'G.MG.A.3', bAt(l, 0.4), 'geo');
  }

  // more everyday contexts for skills that were mostly bare equations
  function ladder(l) {
    const [a, b, c] = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]]), askTop = U.pick([true, false]);
    const q = askTop ? `A ${c}-foot ladder leans against a vertical wall. The bottom of the ladder is ${a} feet from the base of the wall. How high up the wall, in feet, does the ladder reach?` : `A ramp rises ${a} feet over a horizontal distance of ${b} feet. What is the length, in feet, of the ramp?`;
    const v = askTop ? b : c;
    return done(spr(q, v, { fig: Fig.triangle ? pic(['🪜'], 'a right triangle') : pic(['🪜']), meta: { kind: 'evalAt', args: [askTop ? `√(${c}^2-${a}^2)` : `√(${a}^2+${b}^2)`, {}] }, why: askTop ? `${a}² + h² = ${c}², so h = √(${c * c} − ${a * a}) = ${b}.` : `√(${a}² + ${b}²) = √${a * a + b * b} = ${c}.`, hint: 'The wall, the ground, and the ladder (or ramp) make a right triangle. Use a² + b² = c².' }), 'G.SRT.C.8', bAt(l, 0.3), 'geo');
  }
  function ticketSystem(l) {
    const pa = pick([8, 10, 12, 15]), ps = pick([4, 5, 6]), A = U.int(20, 90), Sx = U.int(20, 90), n = A + Sx, tot = pa * A + ps * Sx;
    const [event] = pick([['a school play'], ['a choir concert'], ['a science fair']]);
    return done(spr(`Tickets to ${event} cost $${pa} for adults and $${ps} for students. A total of ${n} tickets were sold for $${tot}. How many adult tickets were sold?`, A, { fig: Fig.table([['', 'Adults', 'Students', 'Total'], ['Tickets', 'a', 's', String(n)], ['Money', `${pa}a`, `${ps}s`, `$${tot}`]]), meta: { kind: 'evalAt', args: [`(${tot}-${ps}*${n})/(${pa}-${ps})`, {}] }, why: `a + s = ${n} and ${pa}a + ${ps}s = ${tot}. Substituting s = ${n} − a: ${pa - ps}a = ${tot - ps * n}, so a = ${A}.`, hint: 'Write one equation for the number of tickets and one for the money, then solve the system.' }), 'A.REI.C.6', bAt(l, 0.5), 'alg');
  }
  function feeRate(l) {
    const fee = pick([15, 20, 25, 30]), rate = pick([8, 12, 15, 18]), x = U.int(3, 12), tot = fee + rate * x, [place, unit] = pick([['A gym charges a one-time fee', 'month'], ['A music school charges a registration fee', 'lesson'], ['A bike shop charges a fee', 'hour']]);
    return done(spr(`${place} of $${fee} plus $${rate} per ${unit}. Jordan paid a total of $${tot}. For how many ${unit}s did Jordan pay?`, x, { fig: pic(['🧾'], `$${fee} + $${rate} × ${unit}s = $${tot}`), meta: { kind: 'evalAt', args: [`(${tot}-${fee})/${rate}`, {}] }, why: `${fee} + ${rate}x = ${tot}, so ${rate}x = ${tot - fee} and x = ${x}.`, hint: 'Write fee + rate × number = total, then solve.' }), 'A.CED.A.1', bAt(0, 0.3), 'alg');
  }

  // Which skill and level each generator joins: [level 0, level 1, level 2]
  return {
    lin1: [[feeRate], [], []],
    lin2: [[], [modelEq, graphChoice], [interpret]],
    sys: [[], [modelEq, ticketSystem], [romanSystem]],
    ineq: [[], [ineqModel], [notSolution]],
    equiv: [[], [absValue], []],
    quad: [[], [projectile], [lineParabola]],
    expo: [[growthInitial], [], []],
    ratio: [[pctContext], [], []],
    stats: [[dotPlotMedian], [weightedMean, sampleEstimate, slopeEstimate], [claims]],
    circle: [[], [circleScale], []],
    trig: [[ladder], [], []],
    area: [[areaContext], [], []],
  };
})();
