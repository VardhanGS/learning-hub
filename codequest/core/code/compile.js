// Code Quest compiler: Blockly's saved workspace JSON → a plain program the runtime can run. No eval, and no Blockly
// or DOM needed, so tests and level solutions can run in Node.
//   script: { event: {type, key?, msg?}, body: [statement] }
//   statement: { op, id, ...args }   expression: { k: literal } | { op, ...args }
const CodeCompile = (() => {
  const HATS = {
    cq_flag: () => ({ type: 'flag' }),
    cq_tap: () => ({ type: 'tap' }),
    cq_key: (b) => ({ type: 'key', key: field(b, 'KEY') }),
    cq_recv: (b) => ({ type: 'recv', msg: field(b, 'MSG') }),
    cq_clone_start: () => ({ type: 'clone' }),
  };
  const field = (b, name) => (b.fields ? b.fields[name] : undefined);
  const child = (b, name) => { const i = b.inputs && b.inputs[name]; return i ? i.block || i.shadow || null : null; };

  // Expressions. An empty slot reads as 0 (or false, for a condition).
  function expr(b) {
    if (!b) return { k: 0 };
    const v = (n) => expr(child(b, n));
    switch (b.type) {
      case 'cq_num': return { k: Number(field(b, 'NUM')) || 0 };
      case 'cq_str': return { k: String(field(b, 'TEXT') ?? '') };
      case 'cq_math': return { op: 'math', f: field(b, 'OP'), a: v('A'), b: v('B') };
      case 'cq_cmp': return { op: 'cmp', f: field(b, 'OP'), a: v('A'), b: v('B') };
      case 'cq_logic': return { op: 'logic', f: field(b, 'OP'), a: v('A'), b: v('B') };
      case 'cq_not': return { op: 'not', a: v('A') };
      case 'cq_rand': return { op: 'rand', a: v('A'), b: v('B') };
      case 'cq_var': return { op: 'var', name: field(b, 'VAR') };
      case 'cq_touching': return { op: 'touching', what: field(b, 'WHAT') };
      case 'cq_keydown': return { op: 'keydown', key: field(b, 'KEY') };
      case 'cq_mousedown': return { op: 'mousedown' };
      case 'cq_mousex': return { op: 'mousex' };
      case 'cq_mousey': return { op: 'mousey' };
      case 'cq_timer': return { op: 'timer' };
      case 'cq_x': return { op: 'x' };
      case 'cq_y': return { op: 'y' };
      case 'cq_dir': return { op: 'dir' };
      case 'cq_gpath': return { op: 'gpath', way: field(b, 'WAY') };
      case 'cq_gcoin': return { op: 'gcoin' };
      default: return { k: 0 };
    }
  }

  function stmt(b) {
    const v = (n) => expr(child(b, n));
    const f = (n) => field(b, n);
    const s = (args) => ({ id: b.id, ...args });
    switch (b.type) {
      case 'cq_move': return s({ op: 'move', n: v('N') });
      case 'cq_turn_r': return s({ op: 'turn', n: v('N'), sign: 1 });
      case 'cq_turn_l': return s({ op: 'turn', n: v('N'), sign: -1 });
      case 'cq_goto': return s({ op: 'goto', x: v('X'), y: v('Y') });
      case 'cq_glide': return s({ op: 'glide', secs: v('SECS'), x: v('X'), y: v('Y') });
      case 'cq_point': return s({ op: 'point', n: v('N') });
      case 'cq_changex': return s({ op: 'changex', n: v('N') });
      case 'cq_changey': return s({ op: 'changey', n: v('N') });
      case 'cq_setx': return s({ op: 'setx', n: v('N') });
      case 'cq_sety': return s({ op: 'sety', n: v('N') });
      case 'cq_bounce': return s({ op: 'bounce' });
      case 'cq_rotstyle': return s({ op: 'rotstyle', style: f('STYLE') });
      case 'cq_say': return s({ op: 'say', text: v('TEXT'), secs: v('SECS') });
      case 'cq_saynow': return s({ op: 'saynow', text: v('TEXT') });
      case 'cq_costume': return s({ op: 'costume', emoji: f('EMOJI') });
      case 'cq_size_set': return s({ op: 'sizeset', n: v('N') });
      case 'cq_size_change': return s({ op: 'sizechange', n: v('N') });
      case 'cq_show': return s({ op: 'visible', on: true });
      case 'cq_hide': return s({ op: 'visible', on: false });
      case 'cq_backdrop': return s({ op: 'backdrop', name: f('NAME') });
      case 'cq_pendown': return s({ op: 'pen', on: true });
      case 'cq_penup': return s({ op: 'pen', on: false });
      case 'cq_pencolor': return s({ op: 'pencolor', color: f('COLOR') });
      case 'cq_penclear': return s({ op: 'penclear' });
      case 'cq_sfx': return s({ op: 'sfx', name: f('NAME') });
      case 'cq_note': return s({ op: 'note', n: f('NOTE'), beats: v('BEATS') });
      case 'cq_wait': return s({ op: 'wait', secs: v('SECS') });
      case 'cq_repeat': return s({ op: 'repeat', n: v('N'), body: chain(child(b, 'DO')) });
      case 'cq_forever': return s({ op: 'forever', body: chain(child(b, 'DO')) });
      case 'cq_if': return s({ op: 'if', c: v('COND'), body: chain(child(b, 'DO')), other: [] });
      case 'cq_ifelse': return s({ op: 'if', c: v('COND'), body: chain(child(b, 'DO')), other: chain(child(b, 'ELSE')) });
      case 'cq_waituntil': return s({ op: 'waituntil', c: v('COND') });
      case 'cq_stop': return s({ op: 'stop', what: f('WHAT') });
      case 'cq_clone': return s({ op: 'clone' });
      case 'cq_delete_clone': return s({ op: 'delclone' });
      case 'cq_send': return s({ op: 'send', msg: f('MSG') });
      case 'cq_timer_reset': return s({ op: 'timerreset' });
      case 'cq_gstep': return s({ op: 'gstep' });
      case 'cq_gleft': return s({ op: 'gturn', sign: -1 });
      case 'cq_gright': return s({ op: 'gturn', sign: 1 });
      case 'cq_gpick': return s({ op: 'gpick' });
      case 'cq_setvar': return s({ op: 'setvar', name: f('VAR'), v: v('VAL') });
      case 'cq_changevar': return s({ op: 'changevar', name: f('VAR'), v: v('VAL') });
      case 'cq_showvar': return s({ op: 'showvar', name: f('VAR'), on: true });
      case 'cq_hidevar': return s({ op: 'showvar', name: f('VAR'), on: false });
      default: return null;
    }
  }

  function chain(b) {
    const out = [];
    for (let cur = b; cur; cur = cur.next && cur.next.block) {
      const s = stmt(cur);
      if (s) out.push(s);
    }
    return out;
  }

  // Only stacks under a hat run, as in other block languages; loose blocks are just left on the workspace.
  function scripts(ws) {
    const tops = (ws && ws.blocks && ws.blocks.blocks) || [];
    return tops.filter((b) => HATS[b.type]).map((b) => ({ event: HATS[b.type](b), hatId: b.id, body: chain(b.next && b.next.block) }));
  }

  // Counts every real block (not the number and text shadows), for block limits.
  function countBlocks(ws) {
    let n = 0;
    const walk = (b) => {
      if (!b) return;
      n++;
      Object.values(b.inputs || {}).forEach((i) => walk(i.block));
      if (b.next) walk(b.next.block);
    };
    ((ws && ws.blocks && ws.blocks.blocks) || []).forEach(walk);
    return n;
  }

  return { scripts, countBlocks };
})();
if (typeof module !== 'undefined') module.exports = CodeCompile;
