// Code Detective: "What will this code do?" quizzes for each world, on the shared quiz engine. Pictures are drawn here.
// A question's answer is worked out in its generator, and `check` holds the same program for tools/codetest.js to run
// on the real runtime, so a wrong answer here would fail the tests. Programs use the same short form as worlds.js.
// Standards: CSTA K–12 CS Standards (2017), 1A = grades K–2, 1B = grades 3–5.
const LESSONS = {};
const CODE_DET = (() => {
  const C = { events: '#d9a514', motion: '#3f7fe0', looks: '#8a5fd6', sound: '#c95fc0', control: '#e08a2b', sensing: '#2ea8c9', ops: '#3fa65a', vars: '#e0622b', pen: '#129a86' };
  // name: [group, words, picture label]. The words match blocks.js (tools/codetest.js compares them).
  const LBL = {
    flag: ['events', 'when 🚩 is pressed', '🚩 start'], tap: ['events', 'when this sprite is tapped', '👆 tap me'], key: ['events', 'when %1 key is pressed', '⌨️ %1'],
    recv: ['events', 'when I get message %1', '📩 %1'], send: ['events', 'send message %1', '📨 %1'],
    step: ['motion', 'step forward', '⬆️ step'], left: ['motion', 'turn left', '↰ left'], right: ['motion', 'turn right', '↱ right'], pick: ['motion', 'pick up coin', '🤏 coin'],
    move: ['motion', 'move %1 steps', '👣 %1'], turnL: ['motion', 'turn ↺ %1 degrees', '↺ %1'], turnR: ['motion', 'turn ↻ %1 degrees', '↻ %1'], goto: ['motion', 'go to x %1 y %2', '📍 x %1 y %2'],
    changex: ['motion', 'change x by %1', '↔️ %1'], changey: ['motion', 'change y by %1', '↕️ %1'], setx: ['motion', 'set x to %1', 'x = %1'], bounce: ['motion', 'if on edge, bounce', '🏓 edge'], point: ['motion', 'point in direction %1', '🧭 %1'],
    y: ['motion', 'y position', 'y'],
    say: ['looks', 'say %1 for %2 secs', '💬 %1 ⏱ %2'], saynow: ['looks', 'say %1', '💬 %1'], pendown: ['pen', 'pen down', '✏️ down'],
    wait: ['control', 'wait %1 secs', '⏱ %1'], repeat: ['control', 'repeat %1', '🔁 %1'], forever: ['control', 'forever', '♾️'], if: ['control', 'if %1 then', '❓ %1'], ifelse: ['control', 'if %1 then', '❓ %1'], stop: ['control', 'stop %1', '🛑 %1'],
    path: ['sensing', 'path %1 ?', '🛤️ %1'], coin: ['sensing', 'on a coin?', '🪙 here'], touching: ['sensing', 'touching %1 ?', '💥 %1'], mousex: ['sensing', 'pointer x', '👆 x'],
    cmp: ['ops', '%1 %2 %3', null], logic: ['ops', '%1 %2 %3', null], math: ['ops', '%1 %2 %3', null], rand: ['ops', 'random %1 to %2', '🎲 %1 to %2'],
    var: ['vars', '%1', null], setvar: ['vars', 'set %1 to %2', null], changevar: ['vars', 'change %1 by %2', null],
  };
  const BODY = { repeat: [1], forever: [0], if: [1], ifelse: [1, 2] };
  const WORD = { gt: '>', lt: '<', eq: '=', add: '+', mul: '×', and: 'and', or: 'or', right: '→ right', left: '← left', up: '↑ up', ahead: '⬆️ ahead', _edge: 'edge', _mouse: 'pointer', all: 'all' };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const nameOf = (spec) => (typeof spec === 'string' ? spec : spec[0]);
  function text(spec, t) {
    const n = nameOf(spec), a = typeof spec === 'string' ? [] : spec.slice(1), L = LBL[n], body = BODY[n] || [];
    const args = a.filter((_, i) => !body.includes(i));
    return ((t === 'g2' && L[2]) || L[1]).replace(/%(\d)/g, (_, k) => { const v = args[k - 1]; return Array.isArray(v) ? text(v, t) : (WORD[v] ?? v); });
  }
  const bodiesOf = (spec) => (typeof spec === 'string' ? [] : (BODY[spec[0]] || []).map((i) => spec[i + 1] || []));

  // ---------- pictures ----------
  const ROW = 30;
  const widthOf = (s) => [...s].reduce((w, ch) => w + (ch.charCodeAt(0) > 0x2000 ? 16 : 8.4), 22);
  // Draws a stack of blocks at (x, y). Returns { body, y, w }.
  function rows(list, t, x, y, num) {
    let body = '', w = 0;
    list.forEach((spec) => {
      const label = text(spec, t), color = C[LBL[nameOf(spec)][0]], inner = bodiesOf(spec);
      const n = num && !['flag', 'tap', 'key', 'recv'].includes(nameOf(spec)) ? ++num.n : 0, lw = widthOf(label) + (n ? 22 : 0);
      const head = (yy, ww, l, badge) => `<rect x="${x}" y="${yy}" width="${ww}" height="${ROW - 2}" rx="7" fill="${color}"/>${badge ? `<circle cx="${x + 13}" cy="${yy + 14}" r="9" fill="#fff"/><text x="${x + 13}" y="${yy + 19}" font-size="13" font-weight="700" text-anchor="middle" fill="#1d2333">${badge}</text>` : ''}<text x="${x + (badge ? 28 : 9)}" y="${yy + 19}" font-size="14" font-weight="600" fill="#fff">${esc(l)}</text>`;
      if (!inner.length) { body += head(y, lw, label, n); w = Math.max(w, lw); y += ROW; return; }
      const start = y, parts = [];
      let yy = y + ROW, iw = 0;
      inner.forEach((b, i) => {
        const r = rows(b.length ? b : [], t, x + 14, yy, num);
        parts.push(r.body);
        iw = Math.max(iw, r.w);
        yy = r.y + (b.length ? 0 : 12);
        if (i < inner.length - 1) { parts.push(`@ELSE${yy}@`); yy += 24; }
      });
      const bw = Math.max(lw, iw + 14 + 8);
      body += `<rect x="${x}" y="${start + ROW - 4}" width="14" height="${yy - start - ROW + 8}" fill="${color}"/>${head(start, bw, label, n)}`;
      parts.forEach((p) => { const m = /^@ELSE(\d+)@$/.exec(p); body += m ? `<rect x="${x}" y="${m[1]}" width="${bw}" height="22" rx="6" fill="${color}"/><text x="${x + 9}" y="${+m[1] + 16}" font-size="13" font-weight="600" fill="#fff">${t === 'g2' ? '🔀' : 'else'}</text>` : p; });
      body += `<rect x="${x}" y="${yy}" width="${bw}" height="10" rx="5" fill="${color}"/>`;
      w = Math.max(w, bw);
      y = yy + 14;
    });
    return { body, y, w };
  }
  const flat = (list, t) => list.flatMap((s) => [text(s, t), ...bodiesOf(s).flatMap((b) => flat(b, t))]);
  const stackPart = (list, t, title, num) => {
    const top = title ? 24 : 2, r = rows(list, t, 2, top, num);
    return { w: Math.max(r.w + 4, title ? widthOf(title) : 0), h: r.y + 2, body: (title ? `<text x="2" y="17" font-size="15" font-weight="700" class="fg-text">${esc(title)}</text>` : '') + r.body, label: flat(list, t).join(', ') };
  };
  // A puzzle map: walls, coins, the gem, Bolt with its heading, and letters on some squares.
  function mapPart(map, face = 90, letters = {}) {
    const S = 36, h = map.length, w = Math.max(...map.map((r) => r.length));
    let body = '';
    map.forEach((row, r) => [...row.padEnd(w, '#')].forEach((ch, c) => {
      const x = c * S, y = r * S, cx = x + S / 2, cy = y + S / 2, emo = (e, size = 22) => `<text x="${cx}" y="${cy + size * 0.36}" font-size="${size}" text-anchor="middle">${e}</text>`;
      body += `<rect x="${x}" y="${y}" width="${S}" height="${S}" fill="${ch === '#' ? '#6d5a48' : (c + r) % 2 ? '#dff2cf' : '#cfeab9'}" stroke="#fff"/>`;
      if (ch === 'o') body += emo('🪙');
      if (ch === '*') body += emo('💎');
      if (letters[`${c},${r}`]) body += `<text x="${cx}" y="${cy + 6}" font-size="17" font-weight="700" text-anchor="middle" fill="#2a2350">${letters[`${c},${r}`]}</text>`;
      if (ch === 'R') body += `${emo('🤖', 24)}<g transform="translate(${cx} ${cy}) rotate(${face})"><path d="M0 -18 L6 -11 L-6 -11 Z" fill="#e0352b" stroke="#fff"/></g>`;
    }));
    return { w: w * S, h: h * S, body, label: `A map with ${w} columns and ${h} rows` };
  }
  function fig(...parts) {
    let x = 0, body = '';
    const H = Math.max(...parts.map((p) => p.h));
    parts.forEach((p) => { body += `<g transform="translate(${x} 0)">${p.body}</g>`; x += p.w + 18; });
    return `<svg viewBox="0 0 ${Math.ceil(x - 18)} ${Math.ceil(H)}" width="${Math.ceil(x - 18)}" role="img" aria-label="${esc(parts.map((p) => p.label).join('. ')).replace(/"/g, '')}">${body}</svg>`;
  }

  // ---------- helpers ----------
  const near = (a, lo, hi) => { const out = new Set(); for (let g = 0; out.size < 3 && g < 80; g++) { const v = a + U.int(-4, 4); if (v !== a && v >= lo && v <= hi) out.add(v); } for (let v = lo; out.size < 3; v++) if (v !== a) out.add(v); return [...out]; };
  const Q = (q, a, wrongs, f, why, hint, check) => U.mcFixed(q, String(a), U.shuffle([a, ...wrongs].map(String)), { fig: f, why, hint, check });
  const FACES = ['up', 'right', 'down', 'left'], DIR = { up: 0, right: 90, down: 180, left: -90 };
  const turned = (i, list) => list.reduce((k, b) => (b === 'right' ? (k + 1) % 4 : b === 'left' ? (k + 3) % 4 : k), i);
  const blankMap = (cols, rows, c, r) => Array.from({ length: rows }, (_, y) => Array.from({ length: cols }, (_, x) => (x === c && y === r ? 'R' : '.')).join(''));
  const VEC = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  // A random walk that stays on the map.
  function walk(n, cols, rows, c, r) {
    const list = [];
    let f = 1, x = c, y = r, walked = 0;
    while (list.length < n) {
      const nx = x + VEC[f][0], ny = y + VEC[f][1], can = nx >= 0 && ny >= 0 && nx < cols && ny < rows;
      if (can && (Math.random() < 0.65 || !list.length || list[list.length - 1] !== 'step')) { list.push('step'); x = nx; y = ny; walked++; } else { const t = U.pick(['left', 'right']); list.push(t); f = t === 'right' ? (f + 1) % 4 : (f + 3) % 4; }
    }
    return { list, c: x, r: y, walked };
  }

  // ---------- question families. Each takes the track. ----------
  const F = {
    facing: (n) => (t) => {
      const list = Array.from({ length: U.int(n, n + 1) }, () => U.pick(['left', 'right'])), a = FACES[turned(1, list)], map = ['...', '.R.', '...'];
      return Q('Bolt starts out facing right. Which way does Bolt face at the end?', a, FACES.filter((d) => d !== a), fig(mapPart(map), stackPart(['flag', ...list], t)), 'Follow the turns one at a time. Turning right goes clockwise, and turning left goes the other way.', 'Turn your own body as you read each block.', { map, prog: [['flag', ...list]], read: 'facing', want: a });
    },
    steps: (n) => (t) => {
      const w = walk(U.int(n, n + 2), 8, 6, 2, 2), map = blankMap(8, 6, 2, 2);
      return Q('How many squares does Bolt walk?', w.walked, near(w.walked, 0, 10), fig(stackPart(['flag', ...w.list], t)), 'Only the step blocks move Bolt. Turning does not use up a square.', 'Count just the step blocks.', { map, prog: [['flag', ...w.list]], read: 'steps', want: w.walked });
    },
    where: (n) => (t) => {
      const w = walk(U.int(n, n + 2), 4, 4, 0, 0), map = blankMap(4, 4, 0, 0);
      const spots = ['A', 'B', 'C', 'D'], others = U.sample(map.flatMap((row, r) => [...row].map((_, c) => `${c},${r}`)).filter((k) => k !== `${w.c},${w.r}` && k !== '0,0'), 3);
      const letters = {}, order = U.shuffle([`${w.c},${w.r}`, ...others]);
      if (w.c === 0 && w.r === 0) return F.facing(2)(t); // the walk came home, so no letter can sit there under Bolt
      order.forEach((k, i) => { letters[k] = spots[i]; });
      const a = letters[`${w.c},${w.r}`];
      return Q('Where does Bolt end up?', a, spots.filter((s) => s !== a), fig(mapPart(map, 90, letters), stackPart(['flag', ...w.list], t)), 'Put your finger on Bolt, and move it one block at a time.', 'The red arrow shows which way Bolt faces first.', { map, prog: [['flag', ...w.list]], read: 'cell', want: `${w.c},${w.r}` });
    },
    bug: () => (t) => {
      const [map, good] = U.pick([
        [['R..', '##.', '##*'], ['step', 'step', 'right', 'step', 'step']],
        [['##*', '##.', 'R..'], ['step', 'step', 'left', 'step', 'step']],
        [['R.##', '#..#', '##.*'], ['step', 'right', 'step', 'left', 'step', 'right', 'step', 'left', 'step']],
        [['R.#', '#..', '##*'], ['step', 'right', 'step', 'left', 'step', 'right', 'step']],
        [['###*', '##..', '#..#', 'R.##'], ['step', 'left', 'step', 'right', 'step', 'left', 'step', 'right', 'step', 'left', 'step']],
        [['R..', '##.', '*..'], ['step', 'step', 'right', 'step', 'step', 'right', 'step', 'step']],
      ]);
      const turns = good.map((b, i) => (b === 'step' ? -1 : i)).filter((i) => i >= 0), at = U.pick(turns), bad = good.map((b, i) => (i !== at ? b : b === 'left' ? 'right' : 'left'));
      const a = `Block ${at + 1}`, wrong = U.sample(good.map((_, i) => `Block ${i + 1}`).filter((b) => b !== a), 3);
      return Q('This code should take Bolt to the gem. Which block has the bug?', a, wrong, fig(mapPart(map), stackPart(['flag', ...bad], t, null, { n: 0 })), 'Bolt turns the wrong way at that block. Every block before it was fine.', 'Follow the code on the map until Bolt goes off the path.', { map, prog: [['flag', ...bad]], fixed: [['flag', ...good]], read: 'bug', want: true });
    },
    loopLine: () => (t) => {
      const n = U.int(2, 7), map = ['R.......'];
      return Q('How many squares does Bolt walk?', n, near(n, 1, 9), fig(stackPart(['flag', ['repeat', n, ['step']]], t)), 'The repeat number says how many times the step inside happens.', 'Look at the number on the repeat block.', { map, prog: [['flag', ['repeat', n, ['step']]]], read: 'steps', want: n });
    },
    loopRing: () => (t) => {
      const n = U.int(2, 6), k = U.int(1, 2), inner = [...Array(k).fill('step'), 'right'], map = blankMap(8, 6, 1, 1);
      return Q('How many squares does Bolt walk?', n * k, near(n * k, 1, 16), fig(stackPart(['flag', ['repeat', n, inner]], t)), 'Multiply: the number of repeats times the steps inside.', 'How many steps happen each time around?', { map, prog: [['flag', ['repeat', n, inner]]], read: 'steps', want: n * k });
    },
    nested: () => (t) => {
      const a = U.int(2, 4), b = U.int(2, 3), inner = [['repeat', b, ['step']], 'right'], map = blankMap(8, 6, 1, 1);
      return Q('How many squares does Bolt walk?', a * b, near(a * b, 1, 16), fig(stackPart(['flag', ['repeat', a, inner]], t)), 'The inside loop runs all the way through, each time the outside loop goes around.', 'Work out the inside loop first.', { map, prog: [['flag', ['repeat', a, inner]]], read: 'steps', want: a * b });
    },
    shape: () => (t) => {
      const [n, name] = U.pick([[3, 'triangle'], [4, 'square'], [5, 'pentagon'], [6, 'hexagon'], [8, 'octagon']]), prog = ['flag', 'pendown', ['repeat', n, [['move', 60], ['turnL', 360 / n]]]];
      return Q('What shape does Turtle draw?', name, ['triangle', 'square', 'pentagon', 'hexagon', 'octagon'].filter((s) => s !== name).slice(0, 3), fig(stackPart(prog, t)), 'Each pass around the loop draws one side, so the repeat number is the number of sides.', 'How many sides will it have?', { sprites: [{ id: 'turtle', name: 'Turtle', emoji: '🐢', x: 0, y: 0, dir: 90, size: 100 }], prog: [prog], read: 'sides', want: n });
    },
    repeatNeeded: () => (t) => {
      const n = U.pick([3, 4, 5, 6, 8]), d = 360 / n, show = ['flag', 'pendown', ['repeat', '?', [['move', 60], ['turnL', d]]]], prog = ['flag', 'pendown', ['repeat', n, [['move', 60], ['turnL', d]]]];
      return Q('Which number goes in the repeat block, so the shape closes up?', n, [3, 4, 5, 6, 8].filter((x) => x !== n).slice(0, 3), fig(stackPart(show, t)), 'All the turns must add up to one full turn, which is 360 degrees.', 'How many of these turns make a full turn of 360 degrees?', { sprites: [{ id: 'turtle', name: 'Turtle', emoji: '🐢', x: 0, y: 0, dir: 90, size: 100 }], prog: [prog], read: 'closed', want: true });
    },
    hat: () => (t) => {
      const [hat, a] = U.pick([['flag', 'pressing the green flag'], ['tap', 'tapping the character'], [['key', 'right'], 'pressing the right arrow'], [['recv', 'go'], 'getting a message']]);
      return Q('What makes this code start?', a, ['pressing the green flag', 'tapping the character', 'pressing the right arrow', 'getting a message'].filter((x) => x !== a), fig(stackPart([hat, ['say', 'Hello!', 2]], t)), 'The top block of a stack is the event that starts it.', 'Look at the block on the very top.');
    },
    first: () => (t) => {
      const a = U.int(0, 3); let b = U.int(0, 3); if (b === a) b = (a + 1) % 4;
      const k = [['flag', ['wait', a], ['say', 'Hi!', 1]]], p = [['flag', ['wait', b], ['say', 'Woof!', 1]]], ans = a < b ? 'Kitty' : 'Puppy';
      return Q('Who talks first?', ans, [ans === 'Kitty' ? 'Puppy' : 'Kitty', 'They talk at the same time', 'Nobody talks'], fig(stackPart(k[0], t, '🐱 Kitty'), stackPart(p[0], t, '🐶 Puppy')), 'Both start together when the flag is pressed. The shorter wait talks first.', 'Compare the two wait blocks.', { sprites: [{ id: 'Kitty', name: 'Kitty', emoji: '🐱' }, { id: 'Puppy', name: 'Puppy', emoji: '🐶' }], prog: { Kitty: k, Puppy: p }, read: 'first', want: ans });
    },
    message: () => (t) => {
      const fm = U.pick(['go', 'stop']), km = U.pick(['go', 'stop']), sent = U.pick(['go', 'stop']), ans = fm === sent && km === sent ? 'both Fox and Kitty' : fm === sent ? 'only Fox' : km === sent ? 'only Kitty' : 'nobody';
      const frog = [['tap', ['send', sent]]], fox = [[['recv', fm], ['say', 'Hi!', 1]]], kitty = [[['recv', km], ['say', 'Hello!', 1]]];
      return Q('You tap Frog. Who talks?', ans, ['both Fox and Kitty', 'only Fox', 'only Kitty', 'nobody'].filter((x) => x !== ans), fig(stackPart(frog[0], t, '🐸 Frog'), stackPart(fox[0], t, '🦊 Fox'), stackPart(kitty[0], t, '🐱 Kitty')), 'A character only reacts to the exact message its block is waiting for.', 'Which message does Frog send? Who is waiting for that one?', { sprites: [{ id: 'frog', name: 'Frog' }, { id: 'fox', name: 'Fox' }, { id: 'kitty', name: 'Kitty' }], prog: { frog, fox, kitty }, sim: [{ t: 3, tap: 'frog' }], read: 'talkers', want: ans });
    },
    keyX: () => (t) => {
      const x0 = U.pick([0, 10, 20]), step = U.pick([10, 20]), k = U.int(2, 4), a = x0 + step * k, prog = [[['key', 'right'], ['changex', step]]];
      return Q(`Fox starts at x ${x0}. You press the right arrow ${k} times. What is x now?`, a, near(a / 10, 0, 11).map((v) => v * 10), fig(stackPart(prog[0], t)), 'Each press runs the code once, so x changes once for each press.', 'Add the change once for each press.', { sprites: [{ id: 'fox', name: 'Fox', x: x0 }], prog, sim: Array.from({ length: k }, (_, i) => ({ t: 3 + i * 8, key: 'right' })), read: 'x', want: a });
    },
    seconds: () => (t) => {
      const a = U.int(1, 3), b = U.int(1, 3), prog = [['flag', ['wait', a], ['say', 'Hi!', b], ['say', 'Bye!', 1]]];
      return Q('How many seconds after the flag does Fox say Bye?', a + b, near(a + b, 1, 8), fig(stackPart(prog[0], t)), 'Blocks run in order, so the times add up.', 'Add the time of each block before the Bye block.', { sprites: [{ id: 'fox', name: 'Fox' }], prog, read: 'byeSecs', want: a + b });
    },
    ifNum: (hard) => (t) => {
      const v = U.int(1, 9), c = U.int(1, 9), op = hard ? U.pick(['lt', 'gt', 'eq']) : 'gt', test = op === 'gt' ? v > c : op === 'lt' ? v < c : v === c;
      const yes = hard === 2 ? test && v > 2 : test, cond = hard === 2 ? ['logic', ['cmp', ['var', 'n'], op, c], 'and', ['cmp', ['var', 'n'], 'gt', 2]] : ['cmp', ['var', 'n'], op, c];
      const list = ['flag', ['setvar', 'n', v], ['ifelse', cond, [['say', 'Yes', 1]], [['say', 'No', 1]]]], a = yes ? 'Yes' : 'No';
      return Q('What does Fox say?', a, [yes ? 'No' : 'Yes', 'Yes, and then No', 'Nothing'], fig(stackPart(list, t)), 'Check the question in the if block. A true answer runs the top part, and a false answer runs the else part.', 'Put the number from the box into the question.', { sprites: [{ id: 'fox', name: 'Fox' }], vars: ['n'], prog: [list], read: 'said', want: a });
    },
    ifPath: () => (t) => {
      const way = U.pick(['ahead', 'left', 'right']), open = U.pick([true, false]), other = U.pick(['left', 'right']), map = way === 'ahead' ? (open ? ['...', '.R.', '...'] : ['...', '.R#', '...']) : way === 'left' ? (open ? ['...', '.R.', '...'] : ['.#.', '.R.', '...']) : (open ? ['...', '.R.', '...'] : ['...', '.R.', '.#.']);
      const list = ['flag', ['ifelse', ['path', way], ['step'], [other]]], a = open ? 'takes a step' : other === 'left' ? 'turns left' : 'turns right';
      return Q('What does Bolt do?', a, ['takes a step', 'turns left', 'turns right', 'does nothing'].filter((x) => x !== a).slice(0, 3), fig(mapPart(map), stackPart(list, t)), 'The if block checks the path. An open path runs the top part, and a blocked path runs the else part.', 'Look at the map: is that way open or blocked?', { map, prog: [list], read: 'act', want: a });
    },
    coins: () => (t) => {
      const cells = Array.from({ length: 6 }, () => (Math.random() < 0.45 ? 'o' : '.')), k = U.int(3, 6), a = cells.slice(0, k).filter((c) => c === 'o').length, map = [`R${cells.join('')}`];
      const list = ['flag', ['repeat', k, ['step', ['if', 'coin', ['pick']]]]];
      return Q('How many coins does Bolt pick up?', a, near(a, 0, 6), fig(mapPart(map), stackPart(list, t)), 'Bolt only reaches as many squares as the repeat number, and picks up a coin only when it is on one.', 'Count the squares Bolt reaches, then the coins on them.', { map, pickBlock: true, prog: [list], read: 'picks', want: a });
    },
    scoreAdd: () => (t) => {
      const a = U.int(0, 5), b = U.int(1, 5), c = U.int(1, 4), list = ['flag', ['setvar', 'score', a], ['changevar', 'score', b], ['changevar', 'score', c]], v = a + b + c;
      return Q('What number is in score at the end?', v, near(v, 0, 16), fig(stackPart(list, t)), 'Set puts a new number in the box. Change adds to the number already there.', 'Start with the set block, then add each change.', { sprites: [{ id: 'fox', name: 'Fox' }], vars: ['score'], prog: [list], read: 'score', want: v });
    },
    setTwice: () => (t) => {
      const a = U.int(1, 9), b = U.int(1, 9), c = U.int(1, 3), list = ['flag', ['setvar', 'score', a], ['setvar', 'score', b], ['changevar', 'score', c]], v = b + c;
      return Q('What number is in score at the end?', v, [...new Set([a + b + c, a + c, b, a])].filter((x) => x !== v).concat(near(v, 0, 22)).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 3), fig(stackPart(list, t)), 'A box holds one number. A new set block throws away the old number.', 'The second set block replaces the first number.', { sprites: [{ id: 'fox', name: 'Fox' }], vars: ['score'], prog: [list], read: 'score', want: v });
    },
    scoreLoop: () => (t) => {
      const a = U.int(0, 5), n = U.int(2, 5), b = U.int(1, 3), list = ['flag', ['setvar', 'score', a], ['repeat', n, [['changevar', 'score', b]]]], v = a + n * b;
      return Q('What number is in score at the end?', v, near(v, 0, 22), fig(stackPart(list, t)), 'The change runs once each time around the loop.', 'Multiply the repeats by the change, then add the start.', { sprites: [{ id: 'fox', name: 'Fox' }], vars: ['score'], prog: [list], read: 'score', want: v });
    },
    scoreIf: () => (t) => {
      const n = U.int(3, 6), b = U.int(1, 3), c = U.int(2, 6);
      let v = 0; for (let i = 0; i < n; i++) { v += b; if (v > c) v -= 1; }
      const list = ['flag', ['setvar', 'score', 0], ['repeat', n, [['changevar', 'score', b], ['if', ['cmp', ['var', 'score'], 'gt', c], [['changevar', 'score', -1]]]]]];
      return Q('What number is in score at the end?', v, near(v, 0, 18), fig(stackPart(list, t)), 'Go around the loop one pass at a time, and check the if block on each pass.', 'Write the score down after each pass.', { sprites: [{ id: 'fox', name: 'Fox' }], vars: ['score'], prog: [list], read: 'score', want: v });
    },
    randBad: () => (t) => {
      const lo = U.int(1, 3), hi = lo + U.int(3, 5), a = U.pick([lo - 1, hi + 1]), ok = U.sample(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i), 3), list = ['flag', ['setvar', 'score', ['rand', lo, hi]]];
      return Q('Which number can never go in score?', a, ok, fig(stackPart(list, t)), 'A random block only picks numbers from its first number to its last number.', 'Is the number between the two numbers on the block?');
    },
    mathSet: () => (t) => {
      const a = U.int(1, 4), b = U.int(1, 4), c = U.int(2, 3), list = ['flag', ['setvar', 'score', ['math', ['math', a, 'add', b], 'mul', c]]], v = (a + b) * c;
      return Q('What number is in score at the end?', v, near(v, 0, 26), fig(stackPart(list, t)), 'Work out the inside block first, then the block around it.', 'The block inside gets worked out first.', { sprites: [{ id: 'fox', name: 'Fox' }], vars: ['score'], prog: [list], read: 'score', want: v });
    },
    position: () => (t) => {
      const a = U.pick([0, 20]), b = U.pick([0, 20]), c = U.pick([20, -20, 40]), d = U.pick([20, -20, 40]), ax = a + c, ay = b + d, list = ['flag', ['goto', a, b], ['changex', c], ['changey', d]], s = (x, y) => `x ${x}, y ${y}`;
      return Q('Where is the ball at the end?', s(ax, ay), [s(ay, ax), s(a, b), s(ax, b), s(a, ay), s(ax + 20, ay)].filter((o, i, arr) => o !== s(ax, ay) && arr.indexOf(o) === i).slice(0, 3), fig(stackPart(list, t)), 'Change x moves left and right, and change y moves up and down.', 'Start at the go to numbers, then add each change.', { sprites: [{ id: 'ball', name: 'Ball' }], prog: [list], read: 'xy', want: s(ax, ay) });
    },
  };
  // Questions about pieces of real games. [question, answer, wrong answers, picture, why].
  const fallCode = ['flag', ['forever', [['changey', -8], ['if', ['cmp', ['y'], 'lt', -170], [['goto', 0, 170]]]]]];
  const ballCode = ['flag', ['point', 45], ['forever', [['move', 8], 'bounce']]];
  const padCode = ['flag', ['forever', [['setx', ['mousex']]]]];
  const scoreCode = ['flag', ['forever', [['if', ['touching', 'basket'], [['changevar', 'score', 1], ['goto', 0, 170]]]]]];
  const overCode = ['flag', ['forever', [['if', ['cmp', ['y'], 'lt', -150], [['say', 'Game over!', 1], ['stop', 'all']]]]]];
  const BANK = {
    read: [
      ['What does this apple do?', 'falls, then starts again at the top', ['flies up and away', 'stays in one place', 'walks to the right'], fallCode, 'Change y by a negative number moves it down. At the bottom, go to sends it back to the top.'],
      ['What does this ball do?', 'moves on a slant and bounces off the edges', ['falls straight down', 'spins in one place', 'follows your finger'], ballCode, 'It points on a slant, then moves forever, and the bounce block turns it at each edge.'],
      ['What does this paddle do?', 'follows your finger left and right', ['moves up and down', 'bounces off the edges', 'runs away from your finger'], padCode, 'Forever, it sets its x to wherever the pointer is. Its y never changes.'],
      ['When does the score go up?', 'when the apple touches the basket', ['every second', 'when you press a key', 'when the apple hits the ground'], scoreCode, 'The change block is inside the if block, which checks touching the basket.'],
      ['When does this game end?', 'when the ball goes below the paddle', ['when the ball hits the top', 'after one second', 'when you tap the ball'], overCode, 'The if block checks whether y is less than minus 150, which is near the bottom of the stage.'],
      ['Why is the forever block needed here?', 'so the check keeps happening all game', ['to make the game end sooner', 'so the check happens one time only', 'to change the backdrop'], scoreCode, 'One check would happen once, at the very start. Forever keeps checking while the game runs.'],
    ],
    fix: [
      ['The apple falls off the stage and never comes back. Which piece is missing?', 'an if block that sends it to the top', ['a wait block', 'a bounce block', 'a turn block'], ['flag', ['forever', [['changey', -8]]]], 'Something has to notice the apple reached the bottom, and send it back up.'],
      ['The score never goes up. What is the bug?', 'the change block is not inside the if block', ['the apple is too small', 'forever should be repeat', 'the backdrop is wrong'], ['flag', ['changevar', 'score', 0], ['forever', [['if', ['touching', 'basket'], []]]]], 'The if block is empty, so nothing happens when the apple touches the basket.'],
      ['The ball goes off the edge and gets stuck. Which block is missing?', 'if on edge, bounce', ['pen down', 'say Hello', 'wait 1 secs'], ['flag', ['point', 45], ['forever', [['move', 8]]]], 'Without the bounce block, the ball keeps moving into the edge.'],
      ['The paddle moves one time, and then stops. What is the bug?', 'the block is not inside forever', ['x should be y', 'the paddle is too wide', 'the ball is too fast'], ['flag', ['setx', ['mousex']]], 'With no forever block, it follows your finger only once, at the very start.'],
      ['The game says game over, but the ball keeps moving. Which block is missing?', 'stop all', ['change score', 'turn right', 'point in direction'], ['flag', ['forever', [['move', 8], ['if', ['cmp', ['y'], 'lt', -150], [['say', 'Game over!', 1]]]]]], 'Stop all ends every script, so the ball stops moving too.'],
      ['Both characters talk at the same time. How can you make them take turns?', 'add a wait block to the second one', ['add a bounce block', 'change the backdrop', 'make them bigger'], ['flag', ['say', 'Hi!', 2]], 'A wait as long as the first speech lets the second one start after the first is done.'],
    ],
  };
  const bank = (list) => list.map(([q, a, wrong, code, why]) => (t) => Q(q, a, wrong, fig(stackPart(code, t)), why, 'Read the blocks from the top, one at a time.'));

  // [id, name, icon, level titles, rules, examples, standard per track, per level families]
  const SKILLS = [
    ['w1', 'First Steps', '👣', ['1A-AP-10', '1B-AP-10'], [
      ['Read code in order', 'Code runs from the top down, one block at a time.', 'Step, then turn right, then step.', [F.facing(1), F.steps(3), F.where(2)]],
      ['Follow the path', 'To read code, pretend you are the character, and do each block yourself.', 'Move your finger on the map for every block.', [F.facing(2), F.steps(5), F.where(4)]],
      ['Find the bug', 'A bug is a mistake in code. Follow the code until something goes wrong.', 'If Bolt leaves the path, the bug is at that block.', [F.bug(), F.where(5), F.facing(3)]],
    ], ['1A-AP-14', '1B-AP-15']],
    ['w2', 'Loop Land', '🔁', ['1A-AP-10', '1B-AP-10'], [
      ['Count the loops', 'A repeat block runs the blocks inside it again and again.', 'Repeat 3 with one step inside takes 3 steps.', [F.loopLine(), F.loopRing()]],
      ['Shapes with loops', 'Each pass of a drawing loop makes one side of the shape.', 'Repeat 4 makes a shape with 4 sides.', [F.shape(), F.loopRing(), F.nested()]],
      ['Loops in loops', 'The inside loop runs all the way through, for each pass of the outside loop.', 'Repeat 2 around repeat 3 takes 6 steps.', [F.nested(), F.repeatNeeded(), F.shape()]],
    ]],
    ['w3', 'Click City', '🎉', ['1A-AP-10', '1B-AP-10'], [
      ['What starts it', 'The top block of a stack is the event that starts the code.', 'A flag, a tap, a key, or a message.', [F.hat(), F.first()]],
      ['Who goes when', 'Stacks with the same start run together. Wait blocks make them take turns.', 'A wait of 2 starts 2 seconds later.', [F.first(), F.message(), F.seconds()]],
      ['Follow the events', 'Each tap or key press runs the code once.', 'Three presses change x three times.', [F.keyX(), F.message(), F.seconds()]],
    ]],
    ['w4', 'Choice Cave', '❓', ['1A-AP-10', '1B-AP-10'], [
      ['If and else', 'An if block asks a question. The answer picks which blocks run.', 'If 5 is more than 3, the top part runs.', [F.ifNum(0), F.ifPath()]],
      ['Check first', 'Code can look at the world, then decide what to do.', 'If the path ahead is open, step.', [F.ifPath(), F.ifNum(1), F.coins()]],
      ['Tricky choices', 'And means both questions must be true.', '5 is more than 3, and 5 is more than 2.', [F.ifNum(2), F.coins(), F.ifNum(1)]],
    ]],
    ['w5', 'Number Fort', '🔢', ['1A-AP-09', '1B-AP-09'], [
      ['Number boxes', 'A number box keeps one number. Set replaces it, and change adds to it.', 'Set to 2, then change by 3, makes 5.', [F.scoreAdd(), F.setTwice()]],
      ['Boxes in loops', 'A change inside a loop happens on every pass.', 'Repeat 3, change by 2, adds 6.', [F.scoreLoop(), F.randBad(), F.setTwice()]],
      ['Number puzzles', 'Follow the box one pass at a time, and write down its number.', 'Inside blocks get worked out first.', [F.scoreIf(), F.mathSet(), F.scoreLoop()]],
    ]],
    ['w6', 'Game Studio', '🎮', ['1A-AP-10', '1B-AP-10'], [
      ['Read a game', 'A game is made of small pieces. Read each piece to see what it does.', 'Forever keeps a check going all game.', bank(BANK.read)],
      ['Where is it', 'X moves left and right. Y moves up and down.', 'Change x by 20 moves right.', [...bank(BANK.read), F.position(), F.position(), F.position()]],
      ['Fix the game', 'When a game goes wrong, ask which piece is missing or in the wrong place.', 'A block outside forever runs only once.', [...bank(BANK.fix), F.position()]],
    ], ['1A-AP-14', '1B-AP-15']],
  ];
  [['g2', 0], ['g4', 1]].forEach(([track, ix]) => {
    addSubject({
      id: `det${track}`, track, name: 'Code Detective', icon: '🕵️', color: 'c3', blurb: 'What will this code do? Read code like a detective.',
      skills: SKILLS.map(([wid, name, icon, std, levels, last]) => {
        const id = `${track}${wid}`;
        return { id, name, icon, levels: levels.map(([title, rule, ex, fams], l) => {
          LESSONS[`${id}.${l}`] = { rule, ex, fig: () => Fig.picture([icon, '🕵️']) };
          return { title, std: l === 2 && last ? last[ix] : std[ix], desc: rule, gen: () => U.mix(8, fams.map((f) => () => f(track))) };
        }) };
      }),
    });
  });
  return { LBL, text };
})();
if (typeof module !== 'undefined') module.exports = { CODE_DET, LESSONS };
