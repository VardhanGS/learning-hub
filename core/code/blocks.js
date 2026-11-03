// Code Quest blocks: every block's look, the sprite and backdrop catalogs, and the toolbox for each grade track.
// Grade 2 sees picture labels (`pic`); Grade 4 sees words (`msg`). compile.js gives the blocks their meaning.
const CodeBlocks = (() => {
  const COLORS = { events: '#d9a514', motion: '#3f7fe0', looks: '#8a5fd6', sound: '#c95fc0', control: '#e08a2b', sensing: '#2ea8c9', ops: '#3fa65a', vars: '#e0622b', pen: '#129a86' };

  // Costumes. facing: -1 means the picture looks left, so the stage flips it to point the way the sprite is heading.
  const SPRITES = [
    ['🤖', 'Bolt'], ['🦊', 'Fox'], ['🐸', 'Frog'], ['🐼', 'Panda'], ['🐱', 'Kitty'], ['🐶', 'Puppy'], ['🦄', 'Unicorn'], ['🐵', 'Monkey'],
    ['🐢', 'Turtle', -1], ['🐟', 'Fish', -1], ['🐇', 'Bunny', -1], ['🐘', 'Elephant', -1], ['🦖', 'Dino', -1], ['🐉', 'Dragon', -1], ['🐝', 'Bee', -1], ['🦋', 'Butterfly'],
    ['🚗', 'Car', -1], ['🚌', 'Bus', -1], ['🚀', 'Rocket'], ['🛸', 'Saucer'], ['⚽', 'Ball'], ['🏀', 'Hoop Ball'], ['🎈', 'Balloon'], ['🪁', 'Kite'],
    ['🍎', 'Apple'], ['🍕', 'Pizza'], ['🍩', 'Donut'], ['⭐', 'Star'], ['💎', 'Gem'], ['🪙', 'Coin'], ['❤️', 'Heart'], ['👻', 'Ghost'],
    ['👾', 'Alien'], ['🧙', 'Wizard'], ['🧱', 'Wall'], ['🌳', 'Tree'], ['🏠', 'House'], ['☁️', 'Cloud'], ['🌈', 'Rainbow'], ['🔥', 'Fire'],
  ].map(([emoji, name, facing]) => ({ emoji, name, facing: facing || 1 }));

  const BACKDROPS = [['blank', 'Plain'], ['meadow', 'Meadow'], ['night', 'Night'], ['ocean', 'Ocean'], ['city', 'City'], ['space', 'Space'], ['desert', 'Desert'], ['grid', 'Grid']];
  // [value, label]. Blockly's menus want [label, value], so opts() swaps them.
  const opts = (list) => list.map(([value, label]) => [label, value]);
  const KEYS = [['space', 'space'], ['up', '↑ up'], ['down', '↓ down'], ['left', '← left'], ['right', '→ right'], ['a', 'a'], ['s', 's'], ['d', 'd'], ['w', 'w'], ['any', 'any key']];
  const MSGS = ['go', 'stop', 'win', 'lose', 'next', 'jump'].map((m) => [m, m]);
  const SOUNDS = [['pop', 'pop'], ['tap', 'tick'], ['whoosh', 'whoosh'], ['correct', 'yay'], ['wrong', 'oops'], ['star', 'ding'], ['fanfare', 'fanfare'], ['unlock', 'magic']];
  const NOTES = [['60', 'do'], ['62', 're'], ['64', 'mi'], ['65', 'fa'], ['67', 'so'], ['69', 'la'], ['71', 'ti'], ['72', 'high do']];
  const PENS = [['#6a4fd0', 'purple'], ['#e0352b', 'red'], ['#1f8f4e', 'green'], ['#2b5fd0', 'blue'], ['#f2b01e', 'yellow'], ['#111111', 'black'], ['#ffffff', 'white']];

  // What the editor currently offers in the sprite and variable menus.
  const live = { sprites: [], vars: ['score'] };
  const dd = (name, options) => ({ type: 'field_dropdown', name, options });
  const val = (name) => ({ type: 'input_value', name });
  const cond = (name) => ({ type: 'input_value', name, check: 'Boolean' });
  const varMenu = () => (live.vars.length ? live.vars : ['score']).map((v) => [v, v]);
  const whatMenu = () => [['edge', '_edge'], ['pointer', '_mouse'], ...live.sprites.map((s) => [s.name, s.id])];

  // [type, group, shape, words, picture label or null, args]
  const DEFS = [
    ['cq_flag', 'events', 'hat', 'when 🚩 is pressed', '🚩 start', []],
    ['cq_tap', 'events', 'hat', 'when this sprite is tapped', '👆 tap me', []],
    ['cq_key', 'events', 'hat', 'when %1 key is pressed', '⌨️ %1', [dd('KEY', opts(KEYS))]],
    ['cq_recv', 'events', 'hat', 'when I get message %1', '📩 %1', [dd('MSG', MSGS)]],
    ['cq_send', 'events', 'stack', 'send message %1', '📨 %1', [dd('MSG', MSGS)]],
    ['cq_move', 'motion', 'stack', 'move %1 steps', '👣 %1', [val('N')]],
    ['cq_turn_r', 'motion', 'stack', 'turn ↻ %1 degrees', '↻ %1', [val('N')]],
    ['cq_turn_l', 'motion', 'stack', 'turn ↺ %1 degrees', '↺ %1', [val('N')]],
    ['cq_goto', 'motion', 'stack', 'go to x %1 y %2', '📍 x %1 y %2', [val('X'), val('Y')]],
    ['cq_glide', 'motion', 'stack', 'glide %1 secs to x %2 y %3', '🛝 ⏱ %1 x %2 y %3', [val('SECS'), val('X'), val('Y')]],
    ['cq_point', 'motion', 'stack', 'point in direction %1', '🧭 %1', [val('N')]],
    ['cq_changex', 'motion', 'stack', 'change x by %1', '↔️ %1', [val('N')]],
    ['cq_changey', 'motion', 'stack', 'change y by %1', '↕️ %1', [val('N')]],
    ['cq_setx', 'motion', 'stack', 'set x to %1', 'x = %1', [val('N')]],
    ['cq_sety', 'motion', 'stack', 'set y to %1', 'y = %1', [val('N')]],
    ['cq_bounce', 'motion', 'stack', 'if on edge, bounce', '🏓 edge', []],
    ['cq_rotstyle', 'motion', 'stack', 'turn style %1', '🔄 %1', [dd('STYLE', [['spin all around', 'all'], ['left and right', 'flip'], ["don't spin", 'none']])]],
    ['cq_say', 'looks', 'stack', 'say %1 for %2 secs', '💬 %1 ⏱ %2', [val('TEXT'), val('SECS')]],
    ['cq_saynow', 'looks', 'stack', 'say %1', '💬 %1', [val('TEXT')]],
    ['cq_costume', 'looks', 'stack', 'change costume to %1', '👕 %1', [dd('EMOJI', SPRITES.map((s) => [s.emoji, s.emoji]))]],
    ['cq_size_set', 'looks', 'stack', 'set size to %1 %', '📏 = %1', [val('N')]],
    ['cq_size_change', 'looks', 'stack', 'change size by %1', '📏 + %1', [val('N')]],
    ['cq_show', 'looks', 'stack', 'show', '👀 show', []],
    ['cq_hide', 'looks', 'stack', 'hide', '🫥 hide', []],
    ['cq_backdrop', 'looks', 'stack', 'change backdrop to %1', '🖼 %1', [dd('NAME', BACKDROPS.map(([id, n]) => [n, id]))]],
    ['cq_pendown', 'pen', 'stack', 'pen down', '✏️ down', []],
    ['cq_penup', 'pen', 'stack', 'pen up', '✏️ up', []],
    ['cq_pencolor', 'pen', 'stack', 'pen color %1', '🎨 %1', [dd('COLOR', PENS.map(([c, n]) => [n, c]))]],
    ['cq_penclear', 'pen', 'stack', 'erase all drawing', '🧽 erase', []],
    ['cq_sfx', 'sound', 'stack', 'play sound %1', '🔊 %1', [dd('NAME', opts(SOUNDS))]],
    ['cq_note', 'sound', 'stack', 'play note %1 for %2 beats', '🎵 %1 ⏱ %2', [dd('NOTE', opts(NOTES)), val('BEATS')]],
    ['cq_wait', 'control', 'stack', 'wait %1 secs', '⏱ %1', [val('SECS')]],
    ['cq_repeat', 'control', 'c', 'repeat %1', '🔁 %1', [val('N')]],
    ['cq_forever', 'control', 'cend', 'forever', '♾️', []],
    ['cq_if', 'control', 'c', 'if %1 then', '❓ %1', [cond('COND')]],
    ['cq_ifelse', 'control', 'cc', 'if %1 then', '❓ %1', [cond('COND')]],
    ['cq_waituntil', 'control', 'stack', 'wait until %1', '⏱ until %1', [cond('COND')]],
    ['cq_stop', 'control', 'end', 'stop %1', '🛑 %1', [dd('WHAT', [['all', 'all'], ['this script', 'this']])]],
    ['cq_clone', 'control', 'stack', 'make a clone of me', '👯 clone', []],
    ['cq_clone_start', 'control', 'hat', 'when I start as a clone', '👯 new clone', []],
    ['cq_delete_clone', 'control', 'end', 'delete this clone', '🗑 clone', []],
    ['cq_timer_reset', 'sensing', 'stack', 'reset timer', '⏲ reset', []],
    ['cq_touching', 'sensing', 'bool', 'touching %1 ?', '💥 %1', [{ type: 'field_dropdown', name: 'WHAT', options: whatMenu }]],
    ['cq_keydown', 'sensing', 'bool', 'key %1 pressed?', '⌨️ %1', [dd('KEY', opts(KEYS))]],
    ['cq_mousedown', 'sensing', 'bool', 'pointer down?', '👆 down', []],
    ['cq_mousex', 'sensing', 'value', 'pointer x', '👆 x', []],
    ['cq_mousey', 'sensing', 'value', 'pointer y', '👆 y', []],
    ['cq_timer', 'sensing', 'value', 'timer', '⏲', []],
    ['cq_x', 'motion', 'value', 'x position', 'x', []],
    ['cq_y', 'motion', 'value', 'y position', 'y', []],
    ['cq_dir', 'motion', 'value', 'direction', '🧭', []],
    ['cq_math', 'ops', 'value', '%1 %2 %3', null, [val('A'), dd('OP', [['+', 'add'], ['−', 'sub'], ['×', 'mul'], ['÷', 'div'], ['remainder', 'mod']]), val('B')]],
    ['cq_cmp', 'ops', 'bool', '%1 %2 %3', null, [val('A'), dd('OP', [['<', 'lt'], ['=', 'eq'], ['>', 'gt']]), val('B')]],
    ['cq_logic', 'ops', 'bool', '%1 %2 %3', null, [cond('A'), dd('OP', [['and', 'and'], ['or', 'or']]), cond('B')]],
    ['cq_not', 'ops', 'bool', 'not %1', null, [cond('A')]],
    ['cq_rand', 'ops', 'value', 'random %1 to %2', '🎲 %1 to %2', [val('A'), val('B')]],
    ['cq_var', 'vars', 'value', '%1', null, [{ type: 'field_dropdown', name: 'VAR', options: varMenu }]],
    ['cq_setvar', 'vars', 'stack', 'set %1 to %2', null, [{ type: 'field_dropdown', name: 'VAR', options: varMenu }, val('VAL')]],
    ['cq_changevar', 'vars', 'stack', 'change %1 by %2', null, [{ type: 'field_dropdown', name: 'VAR', options: varMenu }, val('VAL')]],
    ['cq_showvar', 'vars', 'stack', 'show %1 on stage', null, [{ type: 'field_dropdown', name: 'VAR', options: varMenu }]],
    ['cq_hidevar', 'vars', 'stack', 'hide %1', null, [{ type: 'field_dropdown', name: 'VAR', options: varMenu }]],
    // Grid puzzles (levels only, not in the Free Build toolbox).
    ['cq_gstep', 'motion', 'stack', 'step forward', '⬆️ step', []],
    ['cq_gleft', 'motion', 'stack', 'turn left', '↰ left', []],
    ['cq_gright', 'motion', 'stack', 'turn right', '↱ right', []],
    ['cq_gpick', 'motion', 'stack', 'pick up coin', '🤏 coin', []],
    ['cq_gpath', 'sensing', 'bool', 'path %1 ?', '🛤️ %1', [dd('WAY', [['⬆️ ahead', 'ahead'], ['↰ left', 'left'], ['↱ right', 'right']])]],
    ['cq_gcoin', 'sensing', 'bool', 'on a coin?', '🪙 here', []],
  ];
  const TYPES = new Set(DEFS.map((d) => d[0]).concat(['cq_num', 'cq_str']));

  // Blockly's block definitions, using the labels for this grade. Safe to call again when the player changes.
  function define(track) {
    const out = DEFS.map(([type, group, shape, msg, pic, args]) => {
      const j = { type, message0: track === 'g2' && pic ? pic : msg, args0: args, colour: COLORS[group], inputsInline: true, tooltip: msg.replace(/%\d/g, '…') };
      if (shape === 'hat') j.nextStatement = null;
      if (['stack', 'c', 'cc'].includes(shape)) { j.previousStatement = null; j.nextStatement = null; }
      if (['end', 'cend'].includes(shape)) j.previousStatement = null;
      if (shape === 'value') j.output = null;
      if (shape === 'bool') j.output = 'Boolean';
      if (['c', 'cc', 'cend'].includes(shape)) { j.message1 = '%1'; j.args1 = [{ type: 'input_statement', name: 'DO' }]; }
      if (shape === 'cc') { j.message2 = track === 'g2' ? '🔀' : 'else'; j.message3 = '%1'; j.args3 = [{ type: 'input_statement', name: 'ELSE' }]; }
      return j;
    });
    out.push({ type: 'cq_num', message0: '%1', args0: [{ type: 'field_number', name: 'NUM', value: 0 }], output: null, colour: '#ffffff' });
    out.push({ type: 'cq_str', message0: '%1', args0: [{ type: 'field_input', name: 'TEXT', text: '' }], output: null, colour: '#ffffff' });
    Blockly.common.defineBlocksWithJsonArray(out);
  }

  // A level's toolbox is one open tray holding only the blocks that level needs.
  const tray = (contents) => ({ kind: 'flyoutToolbox', contents });

  const N = (name, v) => ({ [name]: { shadow: { type: 'cq_num', fields: { NUM: v } } } });
  const S = (name, v) => ({ [name]: { shadow: { type: 'cq_str', fields: { TEXT: v } } } });
  const b = (type, inputs) => ({ kind: 'block', type, ...(inputs ? { inputs } : {}) });
  const cat = (name, group, contents) => ({ kind: 'category', name, colour: COLORS[group], contents });

  // Grade 2 starts with the blocks a young coder needs; Grade 4 gets the whole set.
  function toolbox(track) {
    const full = track !== 'g2';
    return {
      kind: 'categoryToolbox',
      contents: [
        cat('Start', 'events', [b('cq_flag'), b('cq_tap'), b('cq_key'), b('cq_recv'), b('cq_send')]),
        cat('Move', 'motion', [b('cq_move', N('N', 20)), b('cq_turn_r', N('N', 90)), b('cq_turn_l', N('N', 90)), b('cq_goto', { ...N('X', 0), ...N('Y', 0) }), b('cq_glide', { ...N('SECS', 1), ...N('X', 100), ...N('Y', 0) }), b('cq_changex', N('N', 20)), b('cq_changey', N('N', 20)), b('cq_point', N('N', 90)), b('cq_bounce'), b('cq_rotstyle'),
          ...(full ? [b('cq_setx', N('N', 0)), b('cq_sety', N('N', 0)), b('cq_x'), b('cq_y'), b('cq_dir')] : [])]),
        cat('Looks', 'looks', [b('cq_say', { ...S('TEXT', 'Hello!'), ...N('SECS', 2) }), b('cq_saynow', S('TEXT', 'Hello!')), b('cq_costume'), b('cq_size_change', N('N', 20)), b('cq_size_set', N('N', 100)), b('cq_show'), b('cq_hide'), b('cq_backdrop')]),
        cat('Sound', 'sound', [b('cq_sfx'), b('cq_note', N('BEATS', 1))]),
        cat('Draw', 'pen', [b('cq_pendown'), b('cq_penup'), b('cq_pencolor'), b('cq_penclear')]),
        cat('Control', 'control', [b('cq_wait', N('SECS', 1)), b('cq_repeat', N('N', 4)), b('cq_forever'),
          ...(full ? [b('cq_if'), b('cq_ifelse'), b('cq_waituntil'), b('cq_stop'), b('cq_clone'), b('cq_clone_start'), b('cq_delete_clone')] : [b('cq_if'), b('cq_stop')])]),
        cat('Sense', 'sensing', [b('cq_touching'), b('cq_keydown'), b('cq_mousedown'), b('cq_mousex'), b('cq_mousey'), b('cq_timer'), b('cq_timer_reset')]),
        ...(full ? [cat('Math', 'ops', [b('cq_math', { ...N('A', 0), ...N('B', 0) }), b('cq_rand', { ...N('A', 1), ...N('B', 10) }), b('cq_cmp', { ...N('A', 0), ...N('B', 10) }), b('cq_logic'), b('cq_not')])] : [cat('Math', 'ops', [b('cq_rand', { ...N('A', 1), ...N('B', 10) })])]),
        cat('Numbers', 'vars', [{ kind: 'button', text: '＋ Make a number box', callbackKey: 'cqNewVar' }, b('cq_var'), b('cq_setvar', N('VAL', 0)), b('cq_changevar', N('VAL', 1)), b('cq_showvar'), b('cq_hidevar')]),
      ],
    };
  }

  // A block's look as plain text and color, for pictures of blocks outside the workspace.
  function chip(type, track) {
    const d = DEFS.find((x) => x[0] === type);
    return d ? { text: ((track === 'g2' && d[4]) || d[3]).replace(/\s*%\d/g, ' …').trim(), color: COLORS[d[1]] } : null;
  }

  // The fixed choices of a block's menu, or null when the block has no such menu or its choices change as you build.
  function menu(type, name) {
    const d = DEFS.find((x) => x[0] === type), a = d && d[5].find((x) => x.name === name);
    return a && Array.isArray(a.options) ? a.options.map((o) => o[1]) : null;
  }

  return { define, toolbox, tray, chip, menu, live, SPRITES, BACKDROPS, TYPES };
})();
if (typeof module !== 'undefined') module.exports = CodeBlocks;
