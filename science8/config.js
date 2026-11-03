// Science Quest 8: Grade 8 life science (NJSLS-Science 2020, middle school life science), 8 topics in a typical course
// order, with a high school Biology preview as the Challenge level of every lesson. All questions are original.
window.APP = {
  id: 'science8',
  name: 'Science Quest 8',
  short: 'Science 8',
  tagline: 'Life science · Cells · Body systems · Ecosystems · Heredity · Evolution',
  icon: '🔬',
  iconLabel: '',
  theme: { primary: '#0f7a5c', bg: '#f2fbf7' },
  firebase: { apiKey: 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo', projectId: 'ela-quest', appId: '' },
  tracks: {
    g8: {
      label: 'Grade 8 Life Science · NJ', short: 'Grade 8', ready: 'Biology',
      levels: [
        { short: 'Starter', grade: 'Grade 8', long: 'Grade 8 Starter' },
        { short: 'Star', grade: 'Grade 8', long: 'Grade 8 Star' },
        { short: 'Challenge', grade: 'Biology', long: 'Challenge: Biology preview' },
      ],
    },
  },
  voice: 'g8',
  speech: { frac: 'over', split: true },
  features: { studio: false, katex: false },
  data: ['sci-common.js', 't1.js', 't1-living.js', 't1-classify.js', 't1-microbes.js', 't1-plants.js', 't2.js', 't2-cells.js', 't2-organelles.js', 't2-transport.js', 't3.js', 't3-bodyorg.js', 't3-interact.js', 't3-supply.js', 't3-manage.js', 't3-control.js', 't4.js', 't4-patterns.js', 't4-plants.js', 't4-animals.js', 't4-growth.js', 't5.js', 't5-environment.js', 't5-energy.js', 't5-cycles.js', 't6.js', 't6-interactions.js', 't6-resilience.js', 't6-biodiversity.js', 't6-services.js', 't7.js', 't7-inherit.js', 't7-chromosomes.js', 't7-protein.js', 't7-variation.js', 't7-gentech.js', 't8.js', 't8-early.js', 't8-selection.js', 't8-process.js', 't8-fossils.js', 't8-otherevidence.js', 'topics.js'],
  about: 'Science Quest 8 covers Grade 8 life science (New Jersey Student Learning Standards for Science, 2020): living things, cells, body systems, reproduction, ecosystems, heredity, and evolution. Each lesson has a Biology preview as its Challenge level. The code on each level is the standard it practices.',
};
