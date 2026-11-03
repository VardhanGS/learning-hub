// Code Quest levels: turns the short programs in worlds.js into Blockly's saved format, builds a level's stage, and
// judges a run against the level's goal. No Blockly or DOM here, so every level can be checked in Node.
//   A program is a list of scripts: [hat, ...statements]. A statement is 'name' or ['name', ...args].
//   A level with several characters writes its programs as { spriteId: program }.
const CodeLevels = (() => {
  const Compile = typeof CodeCompile !== 'undefined' ? CodeCompile : require('./compile.js');
  const Runtime = (typeof CodeRuntime !== 'undefined' ? CodeRuntime : require('./runtime.js')).Runtime;

  // name: [block type, ...slots]. Slot kinds: n number, s text, f menu choice, e condition or value, b blocks inside.
  const BLOCKS = {
    flag: ['cq_flag'], tap: ['cq_tap'], key: ['cq_key', 'KEY:f'], recv: ['cq_recv', 'MSG:f'], send: ['cq_send', 'MSG:f'],
    step: ['cq_gstep'], left: ['cq_gleft'], right: ['cq_gright'], pick: ['cq_gpick'], path: ['cq_gpath', 'WAY:f'], coin: ['cq_gcoin'],
    move: ['cq_move', 'N:n'], turnR: ['cq_turn_r', 'N:n'], turnL: ['cq_turn_l', 'N:n'], goto: ['cq_goto', 'X:n', 'Y:n'], changex: ['cq_changex', 'N:n'],
    say: ['cq_say', 'TEXT:s', 'SECS:n'], saynow: ['cq_saynow', 'TEXT:s'], backdrop: ['cq_backdrop', 'NAME:f'],
    pendown: ['cq_pendown'], penup: ['cq_penup'], note: ['cq_note', 'NOTE:f', 'BEATS:n'],
    var: ['cq_var', 'VAR:f'], setvar: ['cq_setvar', 'VAR:f', 'VAL:n'], changevar: ['cq_changevar', 'VAR:f', 'VAL:n'], showvar: ['cq_showvar', 'VAR:f'],
    cmp: ['cq_cmp', 'A:n', 'OP:f', 'B:n'], logic: ['cq_logic', 'A:e', 'OP:f', 'B:e'], math: ['cq_math', 'A:n', 'OP:f', 'B:n'], timer: ['cq_timer'], timerreset: ['cq_timer_reset'], waituntil: ['cq_waituntil', 'COND:e'], stop: ['cq_stop', 'WHAT:f'],
    mousex: ['cq_mousex'], y: ['cq_y'], setx: ['cq_setx', 'N:n'], changey: ['cq_changey', 'N:n'], point: ['cq_point', 'N:n'], bounce: ['cq_bounce'], glide: ['cq_glide', 'SECS:n', 'X:n', 'Y:n'],
    wait: ['cq_wait', 'SECS:n'], repeat: ['cq_repeat', 'N:n', 'DO:b'], forever: ['cq_forever', 'DO:b'],
    if: ['cq_if', 'COND:e', 'DO:b'], ifelse: ['cq_ifelse', 'COND:e', 'DO:b', 'ELSE:b'],
    touching: ['cq_touching', 'WHAT:f'], keydown: ['cq_keydown', 'KEY:f'], rand: ['cq_rand', 'A:n', 'B:n'],
  };
  // What a block shows when it sits in the tray.
  const TRAY_ARGS = { move: [50], turnR: [90], turnL: [90], goto: [0, 0], changex: [20], say: ['Hello!', 2], saynow: ['Hello!'], note: ['60', 1], wait: [1], repeat: [2], rand: [-150, 150], setx: [0], changey: [-8], point: [45], glide: [1, 0, 0], cmp: [0, 'eq', 0] };

  let nid = 0;
  const shadow = (kind, v) => (kind === 'n' ? { shadow: { type: 'cq_num', fields: { NUM: v } } } : { shadow: { type: 'cq_str', fields: { TEXT: String(v) } } });
  function block(spec, withIds = true) {
    const [name, ...args] = typeof spec === 'string' ? [spec] : spec;
    const def = BLOCKS[name];
    if (!def) throw new Error(`unknown block name: ${name}`);
    const out = { type: def[0] };
    if (withIds) out.id = `lv${++nid}`;
    def.slice(1).forEach((slot, i) => {
      const [input, kind] = slot.split(':'), a = args[i];
      if (a === undefined) return;
      if (kind === 'f') (out.fields = out.fields || {})[input] = a;
      else if (kind === 'b') { if (a.length) (out.inputs = out.inputs || {})[input] = { block: stack(a) }; }
      else if (kind === 'e') (out.inputs = out.inputs || {})[input] = { block: block(a) };
      else if (Array.isArray(a)) (out.inputs = out.inputs || {})[input] = { ...shadow(kind, 0), block: block(a) };
      else (out.inputs = out.inputs || {})[input] = shadow(kind, a);
    });
    return out;
  }
  function stack(list) {
    const blocks = list.map((s) => block(s));
    blocks.forEach((b, i) => { if (blocks[i + 1]) b.next = { block: blocks[i + 1] }; });
    return blocks[0];
  }
  // Saved-workspace JSON for one character's scripts. Start blocks that came with the level can't be thrown away.
  function workspace(scripts, keepHats) {
    return { blocks: { languageVersion: 0, blocks: (scripts || []).map((sc, i) => {
      const top = stack(sc);
      top.x = 40 + i * 30; top.y = 40 + i * 190;
      if (keepHats) top.deletable = false;
      return top;
    }) } };
  }
  const trayBlock = (spec) => {
    const [name, ...args] = typeof spec === 'string' ? [spec] : spec;
    const given = args.length ? args : (TRAY_ARGS[name] || []);
    return { kind: 'block', ...block([name, ...given], false) };
  };
  const tray = (level) => (level.palette || []).map(trayBlock);

  const spritesOf = (level) => level.sprites || [{ id: 'bolt', name: 'Bolt', emoji: '🤖', dir: level.face ?? 90 }];
  const mapsOf = (level) => level.maps || (level.map ? [level.map] : null);
  // A level's programs for each character. `which` is 'solution' or 'start'.
  function programs(level, which) {
    const p = level[which], first = spritesOf(level)[0].id;
    if (which === 'start' && p === undefined) return { [first]: [['flag']] };
    return Array.isArray(p) ? { [first]: p } : (p || {});
  }
  const startWs = (level) => {
    const p = programs(level, 'start'), buggy = level.start !== undefined;
    return Object.fromEntries(spritesOf(level).map((s) => [s.id, workspace(p[s.id] || [], !buggy)]));
  };
  const solutionWs = (level) => {
    const p = programs(level, 'solution');
    return Object.fromEntries(spritesOf(level).map((s) => [s.id, workspace(p[s.id] || [])]));
  };
  const totalBlocks = (wsBy) => Object.values(wsBy).reduce((n, w) => n + Compile.countBlocks(w), 0);
  const limitOf = (level) => { if (level._limit == null) level._limit = totalBlocks(solutionWs(level)) + (level.slack || 0); return level._limit; };

  function model(level, wsBy, opts = {}) {
    return {
      seed: opts.seed ?? 12345, variant: opts.variant || 0, maps: mapsOf(level), pickBlock: !!level.pickBlock,
      backdrop: level.backdrop || (level.draw ? 'grid' : 'blank'), vars: level.vars || [],
      sprites: spritesOf(level).map((s) => ({ ...s, scripts: Compile.scripts(wsBy[s.id]) })),
    };
  }

  // ---------- drawing goals ----------
  // Pen lines become a set of small squares, centered on the drawing, so a drawing passes wherever it started and
  // whichever way around it went.
  const CELL = 8;
  function penPoints(pen) {
    const pts = [];
    pen.forEach((p) => {
      const n = Math.max(1, Math.ceil(Math.hypot(p.x1 - p.x0, p.y1 - p.y0) / 4));
      for (let i = 0; i <= n; i++) pts.push([p.x0 + ((p.x1 - p.x0) * i) / n, p.y0 + ((p.y1 - p.y0) * i) / n]);
    });
    if (!pts.length) return pts;
    const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    return pts.map(([x, y]) => [x - cx, y - cy]);
  }
  const cells = (pts) => new Set(pts.map(([x, y]) => `${Math.round(x / CELL)},${Math.round(y / CELL)}`));
  const near = (set, key) => {
    const [x, y] = key.split(',').map(Number);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (set.has(`${x + a},${y + b}`)) return true;
    return false;
  };
  const TURNS = [([x, y]) => [x, y], ([x, y]) => [-y, x], ([x, y]) => [-x, -y], ([x, y]) => [y, -x], ([x, y]) => [x, -y], ([x, y]) => [-x, y], ([x, y]) => [y, x], ([x, y]) => [-y, -x]];
  function samePen(a, b) {
    const pa = penPoints(a), pb = cells(penPoints(b));
    if (!pa.length || !pb.size) return false;
    return TURNS.some((f) => {
      const ca = cells(pa.map(f));
      return [...ca].every((k) => near(pb, k)) && [...pb].every((k) => near(ca, k));
    });
  }
  function solutionPen(level) {
    if (!level._pen) {
      const rt = new Runtime(model(level, solutionWs(level)));
      rt.flag();
      for (let i = 0; i < 3000 && rt.running; i++) rt.tick();
      level._pen = rt.pen;
    }
    return level._pen;
  }

  // ---------- judging a run ----------
  const eventsOf = (rt, type, s) => rt.events.filter((e) => e.type === type && (!s || e.s === s));
  const CLAUSE = {
    grid: (c, rt) => !!rt.grid && rt.grid.won,
    said: (c, rt) => {
      const says = eventsOf(rt, 'say', c.said);
      if (!says.length) return false;
      if (c.minT && !says.some((e) => e.t >= c.minT)) return false;
      if (c.num && !says.some((e) => Number(e.text) >= c.num[0] && Number(e.text) <= c.num[1])) return false;
      if (!c.after) return true;
      const first = rt.events.find((e) => e.type === c.after);
      return !!first && says.some((e) => e.t >= first.t);
    },
    // Each one finishes talking before the next one starts.
    order: (c, rt) => {
      let t = -1;
      return c.order.every((id) => { const e = eventsOf(rt, 'say', id).find((x) => x.t >= t); if (!e) return false; t = e.until; return true; });
    },
    notes: (c, rt) => { const got = eventsOf(rt, 'note').map((e) => e.n).join(','), want = c.notes.join(','); return got === want; },
    backdrop: (c, rt) => rt.backdrop === c.backdrop,
    var: (c, rt) => { const v = Number(rt.vars[c.var.name]); return c.var.eq !== undefined ? v === c.var.eq : v >= c.var.min; },
    count: (c, rt) => eventsOf(rt, c.count.type, c.count.s).length >= c.count.min,
    minX: (c, rt) => { const s = rt.sprites.find((x) => x.id === c.minX.s); return !!s && s.x >= c.minX.x; },
    pen: (c, rt, level) => !rt.running && samePen(rt.pen, solutionPen(level)),
  };
  const clauseKind = (c) => (c === 'grid' ? 'grid' : Object.keys(c).find((k) => CLAUSE[k]));
  const passes = (level, rt) => (level.goal || []).filter((c) => c.uses === undefined).every((c) => CLAUSE[clauseKind(c)](c, rt, level));

  // Block types inside scripts that can actually run (loose blocks don't count).
  function usedTypes(wsBy) {
    const out = new Set();
    const walk = (b) => {
      if (!b) return;
      out.add(b.type);
      Object.values(b.inputs || {}).forEach((i) => walk(i.block));
      if (b.next) walk(b.next.block);
    };
    Object.values(wsBy).forEach((w) => ((w.blocks && w.blocks.blocks) || []).forEach((top) => { if (/^cq_(flag|tap|key|recv|clone_start)$/.test(top.type)) walk(top); }));
    return out;
  }
  const missingBlocks = (level, wsBy) => {
    const used = usedTypes(wsBy), want = (level.goal || []).flatMap((c) => c.uses || []);
    return want.filter((t) => !used.has(t));
  };

  // Which CODE_LINES entry says why the run did not reach the goal.
  function whyNot(level, rt, wsBy) {
    if (!Object.values(wsBy).some((w) => Compile.scripts(w).some((s) => s.body.length))) return 'noStart';
    const g = rt.grid;
    if (g) {
      if (g.bumped) return 'bump';
      if (g.wrongPick) return 'wrongPick';
      if (g.coins.size) return g.goal && `${g.c},${g.r}` === g.goal ? 'coin' : (level.pickBlock ? 'coin' : 'short');
      return 'short';
    }
    return 'tryAgain';
  }

  const expandSim = (sim) => (sim || []).flatMap((a) => (a.key ? [{ t: a.t, press: a.key }, { t: a.t + (a.for || 3), release: a.key }] : [a])).sort((p, q) => p.t - q.t);
  function applySim(rt, a) {
    if (a.tap) { const s = rt.sprites.find((x) => x.id === a.tap); if (s) rt.tap(s); }
    if (a.press) rt.press(a.press);
    if (a.release) rt.release(a.release);
    if (a.mouse) { const s = rt.sprites.find((x) => x.id === a.mouse); if (s) rt.setMouse(s.x, s.y); }
    if (a.xy) rt.setMouse(a.xy[0], a.xy[1]);
  }

  // Runs a program with no screen. ok: reached the goal. needs: blocks the level still wants used.
  function run(level, wsBy, opts = {}) {
    const rt = new Runtime(model(level, wsBy, opts));
    const sim = expandSim(level.sim), lastSim = sim.length ? sim[sim.length - 1].t : 0, max = opts.maxTicks || 1500;
    rt.flag();
    let i = 0;
    for (let t = 1; t <= max; t++) {
      while (i < sim.length && sim[i].t <= t) applySim(rt, sim[i++]);
      rt.tick();
      if (passes(level, rt)) return { ok: true, needs: missingBlocks(level, wsBy), ticks: t, rt };
      if (!rt.running && t > lastSim + 2) break;
    }
    return { ok: false, needs: missingBlocks(level, wsBy), why: whyNot(level, rt, wsBy), rt };
  }
  // A map with variants only counts as solved when the same program solves every variant.
  function verify(level, wsBy) {
    const n = (mapsOf(level) || [0]).length;
    for (let v = 0; v < n; v++) { const r = run(level, wsBy, { variant: v }); if (!r.ok) return { ok: false, variant: v, why: r.why }; }
    return { ok: true };
  }
  const stars = (level, wsBy, hinted) => 1 + (totalBlocks(wsBy) <= limitOf(level) ? 1 : 0) + (hinted ? 0 : 1);

  // ---------- hints ----------
  // Lists a stack's blocks in reading order, to find the first one that differs from the level's solution.
  function flatten(top) {
    const out = [];
    const walk = (b) => {
      if (!b) return;
      const nums = {};
      Object.entries(b.inputs || {}).forEach(([k, i]) => { const s = i.shadow; if (!i.block && s && s.type === 'cq_num') nums[k] = Number(s.fields.NUM); });
      out.push({ id: b.id, type: b.type, nums, fields: b.fields || {} });
      Object.entries(b.inputs || {}).forEach(([k, i]) => { if (k !== 'DO' && k !== 'ELSE') walk(i.block); });
      if (b.inputs && b.inputs.DO) walk(b.inputs.DO.block);
      if (b.inputs && b.inputs.ELSE) walk(b.inputs.ELSE.block);
      if (b.next) walk(b.next.block);
    };
    walk(top);
    return out;
  }
  const sameHat = (a, b) => a.type === b.type && JSON.stringify(a.fields || {}) === JSON.stringify(b.fields || {});
  // What to point at next for this character: { kind: 'block', type, wrong } | 'number' | 'field' | 'extra' | 'done'.
  function nextHint(level, spriteId, ws) {
    const want = solutionWs(level)[spriteId].blocks.blocks, have = ((ws.blocks && ws.blocks.blocks) || []).slice();
    for (const top of want) {
      const a = flatten(top), i = have.findIndex((h) => sameHat(h, top));
      if (i < 0) return { kind: 'block', type: top.type };
      const b = flatten(have.splice(i, 1)[0]);
      for (let n = 0; n < a.length; n++) {
        if (!b[n]) return { kind: 'block', type: a[n].type };
        if (b[n].type !== a[n].type) return { kind: 'block', type: a[n].type, wrong: b[n].id };
        if (JSON.stringify(a[n].fields) !== JSON.stringify(b[n].fields)) return { kind: 'field', id: b[n].id };
        const bad = Object.keys(a[n].nums).find((k) => k !== 'SECS' && k !== 'BEATS' && a[n].nums[k] !== b[n].nums[k]);
        if (bad) return { kind: 'number', id: b[n].id, want: a[n].nums[bad] };
      }
      if (b.length > a.length) return { kind: 'extra', id: b[a.length].id };
    }
    if (have.length) return { kind: 'extra', id: have[0].id };
    return { kind: 'done' };
  }

  return { BLOCKS, workspace, tray, spritesOf, mapsOf, startWs, solutionWs, totalBlocks, limitOf, model, passes, missingBlocks, whyNot, expandSim, applySim, run, verify, stars, nextHint, solutionPen, samePen };
})();
if (typeof module !== 'undefined') module.exports = CodeLevels;
