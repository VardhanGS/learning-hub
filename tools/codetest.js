// Code Quest runtime tests: builds programs as saved-workspace JSON, compiles them, and runs them with no browser.
// Usage: node tools/codetest.js
const assert = require('assert');
const { scripts, countBlocks } = require('../core/code/compile.js');
const { Runtime, FPS } = require('../core/code/runtime.js');

let nid = 1;
const num = (n) => ({ shadow: { type: 'cq_num', id: `n${nid++}`, fields: { NUM: n } } });
const str = (t) => ({ shadow: { type: 'cq_str', id: `s${nid++}`, fields: { TEXT: t } } });
const val = (block) => ({ block });
// A stack from a list: each block's `next` is the one after it.
const stack = (...list) => { list.forEach((b, i) => { if (list[i + 1]) b.next = { block: list[i + 1] }; }); return list[0]; };
const B = (type, inputs, fields) => ({ type, id: `b${nid++}`, ...(inputs ? { inputs } : {}), ...(fields ? { fields } : {}) });
const ws = (...tops) => ({ blocks: { blocks: tops } });
const flag = () => B('cq_flag');
const sprite = (id, w, extra = {}) => ({ id, name: id, emoji: '🤖', x: 0, y: 0, dir: 90, size: 100, scripts: scripts(w), ...extra });
const rt = (sprites, more = {}) => new Runtime({ sprites, vars: [], seed: 7, ...more }, more.hooks || {});
const ticks = (r, n) => { for (let i = 0; i < n; i++) r.tick(); };

const tests = {
  'sequence runs in order in one tick': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_move', { N: num(10) }), B('cq_turn_l', { N: num(90) }), B('cq_move', { N: num(5) }))))]);
    r.flag(); r.tick();
    assert.strictEqual(r.sprites[0].x, 10);
    assert.strictEqual(r.sprites[0].y, 5);
    assert.strictEqual(r.sprites[0].dir, 0);
  },
  'repeat yields once per pass and counts exactly': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_repeat', { N: num(4), DO: { block: B('cq_move', { N: num(1) }) } }))))]);
    r.flag(); r.tick();
    assert.strictEqual(r.sprites[0].x, 1, 'one pass per tick');
    ticks(r, 10);
    assert.strictEqual(r.sprites[0].x, 4);
    assert.strictEqual(r.running, false, 'finished');
  },
  'forever never blocks the tick, even when empty': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_forever', {}))))]);
    r.flag(); ticks(r, 1000);
    assert.strictEqual(r.running, true);
  },
  'stop all ends a forever': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_forever', { DO: { block: B('cq_move', { N: num(1) }) } }))), )]);
    r.flag(); ticks(r, 5);
    r.stopAll(); const x = r.sprites[0].x; ticks(r, 5);
    assert.strictEqual(r.sprites[0].x, x);
  },
  'threads run in start order, side by side': () => {
    const a = stack(flag(), B('cq_setvar', { VAL: num(1) }, { VAR: 'v' }));
    const b = stack(flag(), B('cq_setvar', { VAL: num(2) }, { VAR: 'v' }));
    const r = rt([sprite('a', ws(a, b))], { vars: ['v'] });
    r.flag(); r.tick();
    assert.strictEqual(r.vars.v, 2, 'second script ran last');
  },
  'wait lasts the right number of ticks': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_wait', { SECS: num(1) }), B('cq_move', { N: num(9) }))))]);
    r.flag(); ticks(r, FPS);
    assert.strictEqual(r.sprites[0].x, 0);
    r.tick();
    assert.strictEqual(r.sprites[0].x, 9);
  },
  'glide ends exactly on target': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_glide', { SECS: num(0.5), X: num(100), Y: num(-30) }))))]);
    r.flag(); ticks(r, Math.round(FPS / 2) - 1);
    assert.notStrictEqual(r.sprites[0].x, 100);
    ticks(r, 3);
    assert.deepStrictEqual([r.sprites[0].x, r.sprites[0].y], [100, -30]);
  },
  'broadcast starts receivers on another sprite, and restarts them': () => {
    const send = stack(flag(), B('cq_send', null, { MSG: 'go' }));
    const recv = stack(B('cq_recv', null, { MSG: 'go' }), B('cq_changevar', { VAL: num(1) }, { VAR: 'n' }));
    const r = rt([sprite('a', ws(send)), sprite('b', ws(recv))], { vars: ['n'] });
    r.flag(); ticks(r, 3);
    assert.strictEqual(r.vars.n, 1);
    r.broadcast('go'); ticks(r, 2);
    assert.strictEqual(r.vars.n, 2);
  },
  'a held key does not pile up threads': () => {
    const r = rt([sprite('a', ws(stack(B('cq_key', null, { KEY: 'space' }), B('cq_wait', { SECS: num(5) }))))]);
    r.press('space'); r.tick(); r.release('space'); r.press('space'); r.tick();
    assert.strictEqual(r.threads.length, 1);
  },
  'clones copy state, run their own script, and can be deleted': () => {
    const main = stack(flag(), B('cq_goto', { X: num(50), Y: num(20) }), B('cq_clone'));
    const onClone = stack(B('cq_clone_start'), B('cq_changex', { N: num(5) }), B('cq_changevar', { VAL: num(1) }, { VAR: 'c' }), B('cq_delete_clone'));
    const r = rt([sprite('a', ws(main, onClone))], { vars: ['c'] });
    r.flag(); r.tick();
    assert.strictEqual(r.sprites.length, 2);
    assert.strictEqual(r.sprites[1].x, 50);
    ticks(r, 2);
    assert.strictEqual(r.vars.c, 1);
    assert.strictEqual(r.sprites.length, 1, 'clone removed');
    assert.strictEqual(r.sprites[0].x, 50, 'original not moved');
  },
  'the clone limit holds': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_forever', { DO: { block: B('cq_clone') } }))))]);
    r.flag(); ticks(r, 300);
    assert.strictEqual(r.sprites.length, 101);
  },
  'delete clone does nothing on the original': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_delete_clone'), B('cq_move', { N: num(3) }))))]);
    r.flag(); r.tick();
    assert.strictEqual(r.sprites[0].x, 3);
  },
  'if / else picks the right side': () => {
    const c = B('cq_cmp', { A: num(2), B: num(3) }, { OP: 'lt' });
    const r = rt([sprite('a', ws(stack(flag(), B('cq_ifelse', { COND: val(c), DO: { block: B('cq_move', { N: num(1) }) }, ELSE: { block: B('cq_move', { N: num(99) }) } }))))]);
    r.flag(); r.tick();
    assert.strictEqual(r.sprites[0].x, 1);
  },
  'wait until waits for the condition': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_waituntil', { COND: val(B('cq_keydown', null, { KEY: 'space' })) }), B('cq_move', { N: num(4) }))))]);
    r.flag(); ticks(r, 5);
    assert.strictEqual(r.sprites[0].x, 0);
    r.press('space'); r.tick();
    assert.strictEqual(r.sprites[0].x, 4);
  },
  'touching: other sprite, edge, and hidden sprites': () => {
    const c = B('cq_touching', null, { WHAT: 'b' });
    const hit = stack(flag(), B('cq_if', { COND: val(c), DO: { block: B('cq_setvar', { VAL: num(1) }, { VAR: 'hit' }) } }));
    let r = rt([sprite('a', ws(hit)), sprite('b', ws(), { x: 30 })], { vars: ['hit'] });
    r.flag(); r.tick();
    assert.strictEqual(r.vars.hit, 1);
    r = rt([sprite('a', ws(hit)), sprite('b', ws(), { x: 200 })], { vars: ['hit'] });
    r.flag(); r.tick();
    assert.strictEqual(r.vars.hit, 0);
    r = rt([sprite('a', ws(hit)), sprite('b', ws(), { x: 30, visible: false })], { vars: ['hit'] });
    r.flag(); r.tick();
    assert.strictEqual(r.vars.hit, 0);
  },
  'bounce turns back at the edge and stays on stage': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_forever', { DO: { block: stack(B('cq_move', { N: num(10) }), B('cq_bounce')) } }))))]);
    r.flag(); ticks(r, 1000);
    assert.ok(Math.abs(r.sprites[0].x) <= 240, `x ${r.sprites[0].x}`);
    assert.strictEqual(Math.abs(r.sprites[0].dir), 90);
  },
  'math is safe: divide by zero, text in a number slot': () => {
    const d = B('cq_math', { A: num(5), B: num(0) }, { OP: 'div' });
    const t = B('cq_math', { A: str('cat'), B: num(2) }, { OP: 'add' });
    const r = rt([sprite('a', ws(stack(flag(), B('cq_setvar', { VAL: val(d) }, { VAR: 'd' }), B('cq_setvar', { VAL: val(t) }, { VAR: 't' }), B('cq_move', { N: str('x') }))))], { vars: ['d', 't'] });
    r.flag(); r.tick();
    assert.strictEqual(r.vars.d, 0);
    assert.strictEqual(r.vars.t, 2);
    assert.strictEqual(r.sprites[0].x, 0);
  },
  'compare treats number-like text as numbers, other text without case': () => {
    const mk = (a, b) => B('cq_cmp', { A: str(a), B: str(b) }, { OP: 'eq' });
    const r = rt([sprite('a', ws(stack(flag(), B('cq_setvar', { VAL: val(mk('10', '10.0')) }, { VAR: 'n' }), B('cq_setvar', { VAL: val(mk('Cat', 'cat')) }, { VAR: 't' }))))], { vars: ['n', 't'] });
    r.flag(); r.tick();
    assert.deepStrictEqual([r.vars.n, r.vars.t], [true, true]);
  },
  'random is repeatable with a seed and stays in range': () => {
    const prog = () => rt([sprite('a', ws(stack(flag(), B('cq_repeat', { N: num(50), DO: { block: B('cq_setvar', { VAL: val(B('cq_rand', { A: num(1), B: num(6) })) }, { VAR: 'r' }) } }))))], { vars: ['r'] });
    const seen = (r) => { const out = []; r.flag(); for (let i = 0; i < 50; i++) { r.tick(); out.push(r.vars.r); } return out; };
    const a = seen(prog()), b = seen(prog());
    assert.deepStrictEqual(a, b);
    assert.ok(a.every((n) => n >= 1 && n <= 6 && Number.isInteger(n)));
    assert.strictEqual(new Set(a).size, 6);
  },
  'flag resets to the starting state': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_changex', { N: num(10) }), B('cq_changevar', { VAL: num(1) }, { VAR: 'n' }))), { x: 5 })], { vars: ['n'] });
    r.flag(); r.tick(); r.flag(); r.tick();
    assert.strictEqual(r.sprites[0].x, 15);
    assert.strictEqual(r.vars.n, 1);
  },
  'pen draws segments only while down': () => {
    const r = rt([sprite('a', ws(stack(flag(), B('cq_move', { N: num(5) }), B('cq_pendown'), B('cq_move', { N: num(5) }), B('cq_penup'), B('cq_move', { N: num(5) }))))]);
    r.flag(); r.tick();
    assert.strictEqual(r.pen.length, 1);
    assert.deepStrictEqual([r.pen[0].x0, r.pen[0].x1], [5, 10]);
  },
  'loose blocks without a hat do not run; empty slots are harmless': () => {
    const r = rt([sprite('a', ws(B('cq_move', { N: num(5) }), stack(flag(), B('cq_move', {}), B('cq_if', {}))))]);
    r.flag(); r.tick();
    assert.strictEqual(r.sprites[0].x, 0);
  },
  'stop this script leaves other scripts running': () => {
    const a = stack(flag(), B('cq_stop', null, { WHAT: 'this' }), B('cq_move', { N: num(50) }));
    const b = stack(flag(), B('cq_forever', { DO: { block: B('cq_changey', { N: num(1) }) } }));
    const r = rt([sprite('a', ws(a, b))]);
    r.flag(); ticks(r, 5);
    assert.strictEqual(r.sprites[0].x, 0);
    assert.strictEqual(r.sprites[0].y, 5);
  },
  'stop all halts everything': () => {
    const a = stack(flag(), B('cq_wait', { SECS: num(0.1) }), B('cq_stop', null, { WHAT: 'all' }));
    const b = stack(flag(), B('cq_forever', { DO: { block: B('cq_changey', { N: num(1) }) } }));
    const r = rt([sprite('a', ws(a, b))]);
    r.flag(); ticks(r, 20);
    const y = r.sprites[0].y; ticks(r, 5);
    assert.strictEqual(r.sprites[0].y, y);
    assert.strictEqual(r.running, false);
  },
  'countBlocks counts real blocks but not number shadows': () => {
    const w = ws(stack(flag(), B('cq_repeat', { N: num(4), DO: { block: B('cq_move', { N: num(1) }) } })));
    assert.strictEqual(countBlocks(w), 3);
  },
};

// Sync: Cloud.merge is the shared function every app uses, so load the real file.
const vm = require('vm');
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(require('fs').readFileSync(require('path').join(__dirname, '../core/cloud.js'), 'utf8') + ';this.Cloud = Cloud;', ctx);
const merge = (a, b) => JSON.parse(JSON.stringify(ctx.Cloud.merge(a, b))); // plain objects: the vm has its own Array
tests['sync keeps projects from both devices, newest copy wins'] = () => {
  const a = { code: { projects: [{ id: 'p1', name: 'old', updatedAt: 1 }, { id: 'p2', name: 'only a', updatedAt: 5 }], levels: {} } };
  const b = { code: { projects: [{ id: 'p1', name: 'new', updatedAt: 9 }, { id: 'p3', name: 'only b', updatedAt: 2 }], levels: {} } };
  const m = merge(a, b);
  assert.deepStrictEqual(m.code.projects.map((p) => p.name).sort(), ['new', 'only a', 'only b']);
};
tests['sync: a deleted project stays deleted, and stars never go down'] = () => {
  const a = { gone: ['p1'], code: { projects: [], levels: { w1: { stars: 3 } } } };
  const b = { code: { projects: [{ id: 'p1', updatedAt: 99 }], levels: { w1: { stars: 1 }, w2: { stars: 2 } } } };
  const m = merge(a, b);
  assert.strictEqual(m.code.projects.length, 0);
  assert.strictEqual(m.code.levels.w1.stars, 3);
  assert.strictEqual(m.code.levels.w2.stars, 2);
};
tests['sync leaves other apps alone (no code field added)'] = () => {
  assert.strictEqual('code' in merge({ xp: 1 }, { xp: 2 }), false);
};

// Every level: the solution reaches the goal on every map, and blank or broken programs do not. Each test also
// proves the checker can fail, so a goal that always passes can't hide here.
const Levels = require('../core/code/levels.js');
const { CODE_WORLDS, CODE_LINES } = require('../apps/codequest/data/worlds.js');
const LEVELS = CODE_WORLDS.flatMap((w) => w.levels);
const blank = (level) => Object.fromEntries(Levels.spritesOf(level).map((s) => [s.id, { blocks: { blocks: [] } }]));
// Every block type used in a saved workspace.
const typesIn = (wsBy) => { const out = new Set(); const walk = (b) => { if (!b) return; out.add(b.type); Object.values(b.inputs || {}).forEach((i) => walk(i.block)); if (b.next) walk(b.next.block); }; Object.values(wsBy).forEach((w) => w.blocks.blocks.forEach(walk)); return out; };
// A copy of a solution with its last stacked block removed.
function dropLast(wsBy) {
  const c = JSON.parse(JSON.stringify(wsBy));
  let longest = null;
  Object.values(c).forEach((w) => w.blocks.blocks.forEach((top) => {
    for (let b = top, prev = null; b; prev = b, b = b.next && b.next.block) if (prev && !b.next) longest = prev;
  }));
  if (longest) delete longest.next;
  return longest ? c : null;
}
tests['levels: ids are unique and the worlds hold enough levels'] = () => {
  const ids = LEVELS.map((l) => l.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  assert.ok(LEVELS.length >= 32, `${LEVELS.length} levels`);
};
LEVELS.forEach((level) => {
  tests[`level ${level.id}: solution passes on every map and meets the block limit`] = () => {
    const sol = Levels.solutionWs(level), v = Levels.verify(level, sol);
    assert.ok(v.ok, `failed on map ${v.variant}: ${v.why}`);
    assert.deepStrictEqual(Levels.missingBlocks(level, sol), []);
    assert.ok(Levels.totalBlocks(sol) <= Levels.limitOf(level));
    assert.strictEqual(Levels.stars(level, sol, false), 3);
    assert.strictEqual(Levels.stars(level, sol, true), 2);
  };
  tests[`level ${level.id}: an empty program and the starting blocks do not pass`] = () => {
    assert.strictEqual(Levels.run(level, blank(level)).ok, false, 'empty program passed');
    const r = Levels.verify(level, Levels.startWs(level));
    assert.strictEqual(r.ok && Levels.missingBlocks(level, Levels.startWs(level)).length === 0, false, 'starting blocks passed');
  };
  tests[`level ${level.id}: the tray holds every block the solution needs, and hints finish`] = () => {
    const have = typesIn({ tray: { blocks: { blocks: Levels.tray(level) } } });
    Object.values(Levels.startWs(level)).forEach((w) => w.blocks.blocks.forEach((b) => have.add(b.type)));
    const start = typesIn(Levels.startWs(level));
    typesIn(Levels.solutionWs(level)).forEach((t) => assert.ok(have.has(t) || start.has(t), `${t} not in the tray`));
    Levels.spritesOf(level).forEach((s) => {
      assert.strictEqual(Levels.nextHint(level, s.id, Levels.solutionWs(level)[s.id]).kind, 'done');
    });
    assert.ok(level.say && level.hint && level.title && level.icon, 'text missing');
  };
});
tests['levels: taking the last block off a grid solution fails it (planted bug)'] = () => {
  let checked = 0;
  LEVELS.filter((l) => Levels.mapsOf(l) && !l.solution.some((sc) => JSON.stringify(sc).includes('forever') || JSON.stringify(sc).includes('repeat'))).forEach((level) => {
    const broken = dropLast(Levels.solutionWs(level));
    assert.strictEqual(Levels.verify(level, broken).ok, false, level.id);
    checked++;
  });
  assert.ok(checked >= 9, `only ${checked} checked`);
};
tests['levels: code that fits only one map does not pass a level with several maps (planted bug)'] = () => {
  const level = LEVELS.find((l) => l.id === 'w4-2');
  const one = Object.fromEntries([['bolt', Levels.workspace([['flag', 'step', 'step', 'left', 'step', 'step']])]]);
  assert.strictEqual(Levels.run(level, one, { variant: 0 }).ok, true, 'fits map 0');
  assert.strictEqual(Levels.verify(level, one).ok, false);
};
tests['levels: a wrong drawing fails; the same drawing turned the other way passes'] = () => {
  const level = LEVELS.find((l) => l.id === 'w2-4');
  const run = (prog) => Levels.run(level, { turtle: Levels.workspace(prog) }).ok;
  assert.strictEqual(run([['flag', 'pendown', ['repeat', 3, [['move', 100], ['turnL', 90]]]]]), false, 'three sides');
  assert.strictEqual(run([['flag', 'pendown', ['repeat', 4, [['move', 60], ['turnL', 90]]]]]), false, 'too small');
  assert.strictEqual(run([['flag', ['repeat', 4, [['move', 100], ['turnL', 90]]]]]), false, 'pen left up');
  assert.strictEqual(run([['flag', 'pendown', ['repeat', 4, [['move', 100], ['turnR', 90]]]]]), true, 'clockwise square');
};
tests['levels: a bump, a missed coin, and missing blocks each report the right reason'] = () => {
  const coin = LEVELS.find((l) => l.id === 'w1-6');
  const r = (level, prog) => Levels.run(level, { bolt: Levels.workspace(prog) });
  assert.strictEqual(r(coin, [['flag', 'left', 'step']]).why, 'bump');
  assert.strictEqual(r(coin, [['flag', 'step']]).why, 'short');
  assert.strictEqual(r(coin, []).why, 'noStart');
  const pick = LEVELS.find((l) => l.id === 'w4-1');
  assert.strictEqual(r(pick, [['flag', 'pick']]).why, 'wrongPick');
  assert.strictEqual(r(pick, [['flag', ['repeat', 5, ['step']]]]).why, 'coin');
  const loop = LEVELS.find((l) => l.id === 'w2-1'), longhand = [['flag', 'step', 'step', 'step', 'step', 'step', 'step', 'step']], res = r(loop, longhand);
  assert.ok(res.ok, 'the long way reaches the gem');
  assert.deepStrictEqual(res.needs, ['cq_repeat'], 'but the level still wants repeat');
};
tests['levels: hints point at the first difference'] = () => {
  const level = LEVELS.find((l) => l.id === 'w1-7');
  const h = Levels.nextHint(level, 'bolt', Levels.startWs(level).bolt);
  assert.strictEqual(h.kind, 'block'); assert.strictEqual(h.type, 'cq_gright'); assert.ok(h.wrong);
  const n = LEVELS.find((l) => l.id === 'w2-7');
  const nh = Levels.nextHint(n, 'turtle', Levels.startWs(n).turtle);
  assert.strictEqual(nh.kind, 'number'); assert.strictEqual(nh.want, 6);
  const extra = Levels.nextHint(LEVELS[0], 'bolt', Levels.workspace([['flag', 'step', 'step', 'step']]));
  assert.strictEqual(extra.kind, 'extra');
};
// Blockly quietly swaps a menu value it doesn't know for the first choice, so a wrong value here would change the program.
const Blocks = require('../core/code/blocks.js');
tests['blocks: menus give the runtime values it understands'] = () => {
  assert.ok(Blocks.menu('cq_key', 'KEY').includes('right'));
  assert.ok(Blocks.menu('cq_keydown', 'KEY').includes('up'));
  assert.ok(Blocks.menu('cq_note', 'NOTE').every((n) => Number(n) >= 60));
  const sfx = require('fs').readFileSync(require('path').join(__dirname, '../core/sound.js'), 'utf8');
  Blocks.menu('cq_sfx', 'NAME').forEach((n) => assert.ok(new RegExp(`\\b${n}\\s*[:(]`).test(sfx), `no sound named ${n}`));
};
LEVELS.forEach((level) => {
  tests[`level ${level.id}: every menu choice exists in its block`] = () => {
    const walk = (b) => {
      if (!b) return;
      Object.entries(b.fields || {}).forEach(([k, v]) => { const m = Blocks.menu(b.type, k); if (m) assert.ok(m.includes(v), `${b.type}.${k} = ${v}`); });
      Object.values(b.inputs || {}).forEach((i) => walk(i.block));
      if (b.next) walk(b.next.block);
    };
    [Levels.solutionWs(level), Levels.startWs(level)].forEach((by) => Object.values(by).forEach((w) => w.blocks.blocks.forEach(walk)));
    Levels.tray(level).forEach(walk);
  };
});
tests['levels: every fixed line has text'] = () => {
  ['bump', 'short', 'coin', 'wrongPick', 'noStart', 'needs', 'tryAgain', 'variant', 'hintBlock', 'hintNumber', 'hintField', 'hintExtra', 'hintOther', 'hintDone', 'win1', 'win2', 'win3'].forEach((k) => assert.ok(CODE_LINES[k], k));
};

// Code Detective: every answer is worked out in the question's generator; here the same program runs on the real runtime.
const qctx = { console, CSS: { escape: (s) => s } };
qctx.window = qctx;
vm.createContext(qctx);
const fs = require('fs'), path = require('path');
const qload = (f) => vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), qctx, { filename: f });
qload('apps/codequest/config.js');
vm.runInContext('var APP = window.APP;', qctx);
['core/speech.js', 'core/U.js', 'core/engine/fig.js', 'apps/codequest/data/subjects.js'].forEach(qload);
vm.runInContext('this.SUBJECTS = SUBJECTS; this.CODE_DET = CODE_DET; this.LESSONS = LESSONS;', qctx);
const FACES = { 0: 'up', 90: 'right', 180: 'down', '-90': 'left' };
function runCheck(c, prog = c.prog) {
  const level = { map: c.map, sprites: c.sprites && c.sprites.map((s) => ({ emoji: '🤖', x: 0, y: 0, dir: 90, size: 100, ...s })), pickBlock: c.pickBlock, vars: c.vars, solution: prog };
  const r = new Runtime(Levels.model(level, Levels.solutionWs(level)));
  const sim = Levels.expandSim(c.sim);
  r.flag();
  let i = 0;
  for (let t = 1; t < 1500; t++) {
    while (i < sim.length && sim[i].t <= t) Levels.applySim(r, sim[i++]);
    r.tick();
    if (!r.running && i >= sim.length && !r.events.length && t > 60) break;
    if (!r.running && i >= sim.length && t > (sim.length ? sim[sim.length - 1].t + 10 : 2)) break;
  }
  return r;
}
const READ = {
  facing: (r) => FACES[r.sprites[0].dir],
  steps: (r) => r.events.filter((e) => e.type === 'step').length,
  cell: (r) => `${r.grid.c},${r.grid.r}`,
  bug: (r, c) => !runCheck(c).grid.won && runCheck(c, c.fixed).grid.won,
  sides: (r) => r.pen.length,
  closed: (r) => { const a = r.pen[0], z = r.pen[r.pen.length - 1]; return Math.hypot(a.x0 - z.x1, a.y0 - z.y1) < 1; },
  first: (r) => r.events.find((e) => e.type === 'say').s,
  talkers: (r) => { const who = new Set(r.events.filter((e) => e.type === 'say').map((e) => e.s)); return who.has('fox') && who.has('kitty') ? 'both Fox and Kitty' : who.has('fox') ? 'only Fox' : who.has('kitty') ? 'only Kitty' : 'nobody'; },
  x: (r) => r.sprites[0].x,
  byeSecs: (r) => Math.floor(r.events.find((e) => e.text === 'Bye!').t / FPS),
  said: (r) => r.events.find((e) => e.type === 'say').text,
  act: (r) => { const e = r.events[0]; return e.type === 'step' ? 'takes a step' : r.sprites[0].dir === 0 ? 'turns left' : 'turns right'; },
  picks: (r) => r.events.filter((e) => e.type === 'pick').length,
  score: (r) => Number(r.vars.score),
  xy: (r) => `x ${r.sprites[0].x}, y ${r.sprites[0].y}`,
};
tests['Code Detective: answers match the real runtime, in both grades'] = () => {
  let checked = 0, bank = 0;
  vm.runInContext('SUBJECTS', qctx).forEach((s) => s.skills.forEach((k) => k.levels.forEach((L) => {
    for (let round = 0; round < 40; round++) L.gen({}).forEach((q) => {
      assert.ok(q.opts.includes(q.a), `answer not offered: ${q.q}`);
      assert.strictEqual(new Set(q.opts).size, q.opts.length, `repeated option: ${q.q} ${q.opts}`);
      assert.ok(q.opts.length >= 3, `too few options: ${q.q}`);
      assert.ok(q.fig && q.fig.includes('<svg') && !/NaN|undefined/.test(q.fig), `bad picture: ${q.q}`);
      if (!q.check) { bank++; return; }
      const got = READ[q.check.read](runCheck(q.check), q.check);
      assert.strictEqual(got, q.check.want, `${k.id}: ${q.q} ${JSON.stringify(q.check.prog)}`);
      checked++;
    });
  })));
  assert.ok(checked > 3000, `only ${checked} checked`);
  assert.ok(bank < checked, 'most questions should be checked');
};
tests['Code Detective: block labels match the real blocks'] = () => {
  const { LBL } = vm.runInContext('CODE_DET', qctx);
  Object.entries(LBL).forEach(([name, [group, words, pic]]) => {
    const type = Levels.BLOCKS[name] ? Levels.BLOCKS[name][0] : null;
    if (!type || pic === null) return;
    ['g2', 'g4'].forEach((t) => assert.strictEqual(Blocks.chip(type, t).text, (t === 'g2' ? pic : words).replace(/\s*%\d/g, ' …').trim(), `${name} ${t}`));
  });
};

let bad = 0;
for (const [name, fn] of Object.entries(tests)) {
  try { fn(); console.log(`  ok  ${name}`); } catch (e) { bad++; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
console.log(`${Object.keys(tests).length - bad}/${Object.keys(tests).length} passed`);
process.exit(bad ? 1 : 0);
