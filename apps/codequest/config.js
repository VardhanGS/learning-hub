// Code Quest: block coding for Grades 2 and 4. Drag blocks, make characters move, build small games.
// The editor, stage, and levels come from the code mode (core/modes/code.js + core/code/), not the quiz engine.
window.APP = {
  id: 'codequest',
  name: 'Code Quest',
  short: 'Code Quest',
  tagline: 'Snap blocks together · Make characters move · Build your own games',
  icon: '🧩',
  iconLabel: '',
  theme: { primary: '#6a4fd0', bg: '#f6f4fe' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    g2: {
      label: 'Grade 2 · Picture blocks', short: 'Grade 2', ready: 'word blocks',
      levels: [{ short: 'Starter', grade: 'Grade 2', long: 'Grade 2 Starter' }, { short: 'Star', grade: 'Grade 2', long: 'Grade 2 Star' }, { short: 'Challenge', grade: 'Grade 3', long: 'Challenge' }],
    },
    g4: {
      label: 'Grade 4 · Word blocks', short: 'Grade 4', ready: 'bigger games',
      levels: [{ short: 'Starter', grade: 'Grade 4', long: 'Grade 4 Starter' }, { short: 'Star', grade: 'Grade 4', long: 'Grade 4 Star' }, { short: 'Challenge', grade: 'Grade 5', long: 'Challenge' }],
    },
  },
  ranks: ['Block Sprout', 'Block Stacker', 'Loop Explorer', 'Bug Finder', 'Script Builder', 'Event Wrangler', 'Logic Detective', 'Game Maker', 'Code Trailblazer', 'Code Legend'],
  features: { studio: false, katex: false, code: true },
  data: ['subjects.js', 'worlds.js'],
  voice: 'g2',
  voiceWords: {
    praise: ['Woo-hoo! You got it!', 'Yes! Super smart!', 'Amazing work!', 'High five!', 'You nailed it!', 'Wow, great thinking!', 'Boom! That is right!', 'Fantastic!', 'You are a code star!', 'Hooray!'],
    intros: ['Here is a neat trick!', 'Ready? Let us learn something cool!', 'Ooh, this one is fun!', 'Listen closely, code detective!', 'Guess what? This is easy once you see it!'],
  },
  speech: { math: false },
  about: 'Code Quest teaches block coding: sequences, loops, events, choices, and variables. All characters and levels are original. It is not affiliated with Scratch or the Scratch Foundation. Projects stay in each player\'s profile; there is no public sharing or chat.',
};
