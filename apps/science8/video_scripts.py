"""Science Quest 8 video lessons (rendered by tools/make_videos.py science8). All content is original."""


def B(text, say=None, **kw):
    d = {'text': text, **kw}
    if say:
        d['say'] = say
    return d


def quiz(q, opts, a, ask, reveal, fig=None):
    return {'type': 'quiz', 'q': q, 'opts': opts, 'a': a, 'fig': fig,
            'beats': [B(ask, role='ask'), {'silent': 3.2, 'cap': 'Think about it…', 'role': 'count'}, B(reveal, role='reveal')]}


def outro(sub):
    return {'type': 'outro', 'title': 'Your turn', 'sub': sub, 'beats': [B('Now try it yourself. ' + sub)]}


def bullets(heading, items, intro):
    """items: (emoji, main, sub, narration). Beats: the intro, then one per item."""
    return {'type': 'bullets', 'heading': heading, 'items': [(e, m, s) for e, m, s, _ in items],
            'beats': [B(intro)] + [B(n) for *_, n in items]}


def image(heading, figs, notes, beats):
    # notes appear one per beat from the first beat on, so there may be as many notes as beats
    return {'type': 'image', 'heading': heading, 'figs': figs, 'notes': notes, 'note_from': 0, 'beats': [B(b) for b in beats]}


VIDEOS = [
    # ---------- Topic 1: Living Things in the Biosphere ----------
    {
        'id': 'launch-t1', 'title': 'Topic 1: Living Things in the Biosphere', 'subject': 't1', 'color': 'c1', 'label': 'Topic launch',
        'desc': 'What makes something alive, and how scientists sort millions of living things.', 'practice': ['t1', 'living', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌍', 'title': 'Living Things', 'sub': 'Topic 1 launch', 'beats': [B('Earth is home to millions of kinds of living things. In this topic you will learn what they have in common and how scientists sort them.')]},
            bullets('In this topic', [
                ('🐸', 'Living things', 'The signs of life', 'First, the signs that tell us something is alive.'),
                ('🗂️', 'Classification', 'From domain to species', 'Then, how scientists name and group organisms.'),
                ('🦠', 'Microbes', 'Viruses, bacteria, protists, fungi', 'Next, the tiny organisms all around us, and viruses, which are not alive.'),
                ('🌿', 'Plants and animals', 'Structure fits function', 'Finally, how plants and animals are built for the way they live.'),
            ], 'Here is the plan for the topic.'),
            image('One question to keep in mind', ["Fig.picture(['🌱', '🪨', '🔥'], 'Which ones are alive?')"], ['A seed', 'A rock', 'A flame'],
                  ['Keep this question in mind: a seed, a rock, and a flame.', 'Which ones are alive, and how can you tell?', 'By the end of the first lesson, you will be able to explain your answer like a scientist.']),
            outro('Start with the lesson Living things.'),
        ],
    },
    {
        'id': 'living-things', 'title': 'The Signs of Life', 'subject': 't1', 'color': 'c1', 'label': 'Living things',
        'desc': 'The characteristics every living thing shares, and how scientists test for them.', 'practice': ['t1', 'living', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🐸', 'title': 'Is It Alive?', 'sub': 'The characteristics of life', 'beats': [B('How do scientists decide whether something is alive? They look for a set of characteristics.')]},
            bullets('Every living thing', [
                ('🧫', 'Is made of cells', 'one cell or many', 'Every living thing is made of one or more cells.'),
                ('⚡', 'Uses energy', 'from food or sunlight', 'It uses energy, from food or from sunlight.'),
                ('👀', 'Responds to stimuli', 'a change around it', 'It responds to changes around it, called stimuli.'),
                ('🌱', 'Grows, develops, reproduces', 'and has DNA', 'And it grows, develops, reproduces, and contains DNA.'),
            ], 'Every living thing shares these characteristics.'),
            image('Stimulus and response', ["Fig.flow(['stimulus: bright light', 'response: pupils shrink'])"], ['Stimulus = a change', 'Response = a reaction'],
                  ['A stimulus is a change in the surroundings, like a bright light.', 'The response is what the organism does about it: your pupils get smaller.']),
            image('Life comes from life', ["Fig.flow(['boil broth in a curved flask', 'microbes cannot get in', 'nothing grows'])"], ['Pasteur, 1860s', 'No spontaneous generation'],
                  ['People once thought life could appear from nonliving things, like broth or meat.', 'Pasteur boiled broth in a flask with a curved neck. Dust and microbes were trapped in the curve, and nothing grew. Life comes only from life.']),
            image('Keeping things steady', ["Fig.picture(['🥵', '💧', '🥶'], 'sweat to cool, shiver to warm')"], ['Homeostasis', 'Steady inside, changing outside'],
                  ['Living things keep conditions inside them steady. This is called homeostasis.', 'When you are hot, you sweat. When you are cold, you shiver.']),
            quiz('A crystal grows bigger in salt water. Is it alive?', ['No', 'Yes'], 'No', 'Quick check. A crystal grows bigger in salt water. Is it alive?', 'No. It grows, but it has no cells, uses no energy, and does not reproduce on its own.', fig="Fig.picture(['💎'])"),
            outro('Practice the signs of life in Science Quest 8.'),
        ],
    },
    {
        'id': 'classification', 'title': 'Classifying Living Things', 'subject': 't1', 'color': 'c1', 'label': 'Classification',
        'desc': 'The levels of classification, scientific names, domains and kingdoms, and branching trees.', 'practice': ['t1', 'classify', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🗂️', 'title': 'Classification', 'sub': 'Sorting millions of species', 'beats': [B('Scientists have named nearly two million species. To keep track of them, they sort them into groups.')]},
            image('Eight levels', ["Fig.nest(['Domain', 'Kingdom', 'Phylum', 'Class', 'Order'])"], ['Domain, Kingdom, Phylum, Class', 'Order, Family, Genus, Species', 'Dear King Philip Came Over For Good Soup'],
                  ['Organisms are classified into eight levels.', 'They go from the broadest, domain, to the most specific, species.', 'A memory trick: Dear King Philip Came Over For Good Soup.']),
            image('Two-part names', ["Fig.table([['Scientific name', 'Genus', 'Species'], ['Felis catus', 'Felis', 'catus'], ['Canis lupus', 'Canis', 'lupus']])"], ['Genus first, capitalized', 'Species second', 'Same name everywhere'],
                  ['Each species has a two-part scientific name.', 'First comes the genus, then the species.', 'Common names change from place to place. Scientific names are the same everywhere.']),
            bullets('Three domains', [
                ('🦠', 'Bacteria', 'no nucleus', 'Bacteria are single cells with no nucleus.'),
                ('♨️', 'Archaea', 'no nucleus, often extreme places', 'Archaea also have no nucleus, and many live in extreme places like hot springs.'),
                ('🌳', 'Eukarya', 'protists, fungi, plants, animals', 'Eukarya have cells with a nucleus. They include protists, fungi, plants, and animals.'),
            ], 'All life fits into three domains.'),
            image('Branching trees', ["Fig.tree(['shark', 'frog', 'lizard', 'mouse'], ['legs', 'amniotic egg', 'hair'])"], ['Branch points = common ancestors', 'Later branches share more traits'],
                  ['A cladogram shows how groups are related. Each branch point stands for a common ancestor.', 'The lizard and the mouse split most recently, so they are the most closely related here.']),
            quiz('Ursus arctos and Ursus maritimus share which level?', ['genus', 'species', 'no level'], 'genus', 'Quick check. Ursus arctos and Ursus maritimus. Which level do they share?', 'Genus. Both names start with Ursus, but they are different species.', fig="Fig.picture(['🐻', '🐻‍❄️'])"),
            outro('Practice classification in Science Quest 8.'),
        ],
    },
    {
        'id': 'microbes', 'title': 'Viruses, Bacteria, Protists, and Fungi', 'subject': 't1', 'color': 'c1', 'label': 'Microbes',
        'desc': 'The tiny organisms around us, what they do, and why viruses are not alive.', 'practice': ['t1', 'microbes', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦠', 'title': 'Tiny but Mighty', 'sub': 'Microbes and viruses', 'beats': [B('Most living things are too small to see. Let us meet bacteria, protists, and fungi, and find out why viruses are different.')]},
            image('A virus is not a cell', ["Fig.cell('virus', { labels: true })"], ['Genetic material', 'Protein coat', 'Needs a host cell'],
                  ['A virus is genetic material inside a protein coat.', 'It has no cell, no cytoplasm, and no ribosomes.', 'It can be copied only inside a living host cell, so most scientists do not call it alive.']),
            image('A bacterium', ["Fig.cell('bacterium', { labels: ['cell wall', 'DNA', 'ribosome', 'flagellum'] })"], ['One cell, no nucleus', 'Splits in two', 'Most are helpful'],
                  ['A bacterium is one small cell with no nucleus.', 'Its DNA is a loop in the cytoplasm, and it reproduces by splitting in two.', 'Most bacteria are harmless or helpful. They make yogurt, help digestion, and break down dead matter.']),
            bullets('Protists and fungi', [
                ('🌊', 'Protists', 'mostly one cell, with a nucleus', 'Protists are mostly one-celled eukaryotes, like amoebas and algae.'),
                ('🍄', 'Fungi', 'absorb food, chitin walls', 'Fungi, like mushrooms, molds, and yeast, absorb their food.'),
                ('♻️', 'Decomposers', 'recycle nutrients', 'Many fungi and bacteria are decomposers that recycle nutrients.'),
            ], 'Two more groups of microbes.'),
            image('A virus copies itself', ["Fig.cycle(['attaches to a host cell', 'injects its genetic material', 'host makes new viruses', 'cell bursts open'])"], ['Attach, inject, copy, burst'],
                  ['A virus attaches to a host cell and injects its genetic material.', 'The cell is forced to make new viruses, then bursts open and releases them.']),
            quiz('Will antibiotics cure a cold?', ['No', 'Yes'], 'No', 'Quick check. Will antibiotics cure a cold?', 'No. Colds are caused by viruses, and antibiotics only work on bacteria.', fig="Fig.picture(['🤧', '💊'])"),
            outro('Practice microbes in Science Quest 8.'),
        ],
    },
    {
        'id': 'plants-animals', 'title': 'Plants and Animals', 'subject': 't1', 'color': 'c1', 'label': 'Plants and animals',
        'desc': 'How plants and animals are built, and how structure fits function.', 'practice': ['t1', 'plantsanimals', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌿', 'title': 'Plants and Animals', 'sub': 'Structure fits function', 'beats': [B('Plants and animals are both many-celled eukaryotes. But they get energy in very different ways.')]},
            image('Plant and animal cells', ["Fig.cell('plant')", "Fig.cell('animal')"], ['Plant: wall, chloroplasts, big vacuole', 'Animal: no wall, no chloroplasts'],
                  ['Plant cells have a stiff wall, chloroplasts for making food, and one large vacuole.', 'Animal cells have none of these. Animals must eat to get energy.']),
            image('Water through a plant', ["Fig.flow(['roots', 'xylem in the stem', 'leaves', 'out through stomata'])"], ['Xylem carries water up', 'Phloem carries sugar'],
                  ['Vascular plants have tubes. Xylem carries water up from the roots.', 'Phloem carries sugar from the leaves to the rest of the plant.']),
            image('Stomata', ["Fig.stoma(true)", "Fig.stoma(false)"], ['Open: gases in and out', 'Closed: saves water'],
                  ['Tiny openings in leaves, called stomata, let carbon dioxide in.', 'On hot, dry days, guard cells close them to save water.']),
            bullets('Animal adaptations', [
                ('🐧', 'Endotherms', 'make their own heat', 'Birds and mammals make their own body heat.'),
                ('🦎', 'Ectotherms', 'warm up from surroundings', 'Reptiles, amphibians, and fish warm up from their surroundings.'),
                ('🦋', 'Symmetry', 'radial or bilateral', 'Most animals have bilateral symmetry. Jellyfish and sea stars have radial symmetry.'),
            ], 'Animals are adapted to where they live.'),
            quiz('Which part of a plant cell makes food?', ['chloroplast', 'vacuole', 'cell wall'], 'chloroplast', 'Quick check. Which part of a plant cell makes food?', 'The chloroplast. It captures light energy to make sugar.', fig="Fig.cell('plant', { ask: 'chloroplast' })"),
            outro('Practice plants and animals in Science Quest 8.'),
        ],
    },
    # ---------- Topic 2: The Cell System ----------
    {
        'id': 'launch-t2', 'title': 'Topic 2: The Cell System', 'subject': 't2', 'color': 'c2', 'label': 'Topic launch',
        'desc': 'Cells are the basic unit of life. This topic looks inside them.', 'practice': ['t2', 'cells', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧫', 'title': 'The Cell System', 'sub': 'Topic 2 launch', 'beats': [B('You are made of about thirty trillion cells. In this topic, we look inside them.')]},
            bullets('In this topic', [
                ('🔬', 'Cells', 'the cell theory and cell shapes', 'First, the cell theory and why cells come in different shapes.'),
                ('🧬', 'Cell structures', 'organelles and their jobs', 'Then, the organelles inside a cell and how they work together.'),
                ('🚪', 'In and out', 'diffusion, osmosis, transport', 'Next, how materials move into and out of cells.'),
            ], 'Here is the plan.'),
            image('A cell is like a factory', ["Fig.cell('animal', { labels: ['nucleus', 'mitochondrion', 'ribosome', 'cell membrane'] })"], ['Nucleus = office', 'Mitochondria = power plant', 'Ribosomes = workers', 'Membrane = gate'],
                  ['Think of a cell as a factory. The nucleus is the office with the plans.', 'Mitochondria are the power plant.', 'Ribosomes are the workers.', 'And the cell membrane is the gate.']),
            outro('Start with the lesson Structure and function of cells.'),
        ],
    },
    {
        'id': 'cell-theory', 'title': 'The Cell Theory', 'subject': 't2', 'color': 'c2', 'label': 'Cells',
        'desc': 'How cells were discovered, the cell theory, specialized cells, and why cells stay small.', 'practice': ['t2', 'cells', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🔬', 'title': 'The Cell Theory', 'sub': 'The basic unit of life', 'beats': [B('Cells were discovered when microscopes were invented. Over two hundred years, scientists built the cell theory.')]},
            bullets('The cell theory', [
                ('🧫', 'All living things are made of cells', None, 'One: all living things are made of one or more cells.'),
                ('🧱', 'Cells are the basic unit of life', None, 'Two: the cell is the basic unit of structure and function.'),
                ('➗', 'All cells come from other cells', None, 'Three: all cells come from cells that already exist.'),
            ], 'The cell theory has three parts.'),
            image('Magnification', ["Fig.table([['Eyepiece', 'Objective', 'Total'], ['10×', '4×', '40×'], ['10×', '40×', '400×']])"], ['Multiply the two lenses'],
                  ['A microscope has two lenses. To find the total magnification, multiply them.', 'A ten times eyepiece and a forty times objective give four hundred times.']),
            bullets('Shape fits the job', [
                ('⚡', 'Nerve cells', 'long, with branches', 'Nerve cells are long and branched to carry signals.'),
                ('🩸', 'Red blood cells', 'small, bendy disks', 'Red blood cells are bendy disks that squeeze through tiny vessels.'),
                ('🌱', 'Root hair cells', 'long and thin', 'Root hair cells are long and thin to absorb more water.'),
            ], 'In a many-celled organism, cells are specialized.'),
            image('Why cells stay small', ["Fig.table([['Cube side', 'Surface', 'Volume', 'Ratio'], ['1', '6', '1', '6 to 1'], ['2', '24', '8', '3 to 1'], ['3', '54', '27', '2 to 1']])"], ['Volume grows faster than surface', 'Big cells cannot feed their insides'],
                  ['As a cell grows, its volume grows faster than its surface.', 'A big cell cannot bring in materials fast enough, so cells divide to stay small.']),
            quiz('A 10× eyepiece and a 40× objective. Total magnification?', ['400×', '50×', '4×'], '400×', 'Quick check. A ten times eyepiece and a forty times objective. What is the total magnification?', 'Four hundred times. Multiply the lenses: ten times forty.', fig="Fig.picture(['🔬'])"),
            outro('Practice cells in Science Quest 8.'),
        ],
    },
    {
        'id': 'cell-parts', 'title': 'Inside a Cell', 'subject': 't2', 'color': 'c2', 'label': 'Cell structures',
        'desc': 'Organelles, how they work together to make a protein, and prokaryotes versus eukaryotes.', 'practice': ['t2', 'organelles', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧬', 'title': 'Inside a Cell', 'sub': 'Organelles and their jobs', 'beats': [B('A cell is full of tiny structures called organelles. Each one has a job.')]},
            image('Animal cell', ["Fig.cell('animal', { labels: ['nucleus', 'mitochondrion', 'ribosome', 'endoplasmic reticulum', 'Golgi apparatus', 'cell membrane'] })"], ['Nucleus: DNA', 'Mitochondria: energy', 'Ribosomes: proteins'],
                  ['The nucleus holds the DNA.', 'Mitochondria release energy from sugar, and ribosomes build proteins.', 'The endoplasmic reticulum moves materials, and the Golgi apparatus packages them.']),
            image('Plant cell extras', ["Fig.cell('plant', { labels: ['cell wall', 'chloroplast', 'vacuole'] })"], ['Cell wall: support', 'Chloroplasts: make food', 'Large vacuole: stores water'],
                  ['Plant cells also have a stiff cell wall for support.', 'They have chloroplasts that make food.', 'And a large central vacuole that stores water.']),
            image('Making a protein', ["Fig.flow(['nucleus', 'ribosome', 'endoplasmic reticulum', 'Golgi apparatus', 'vesicle'])"], ['Organelles work as a system'],
                  ['Organelles work together like an assembly line.', 'Instructions leave the nucleus, a ribosome builds the protein, the ER carries it, the Golgi packages it, and a vesicle ships it out.']),
            image('Two kinds of cells', ["Fig.cell('bacterium')", "Fig.cell('animal')"], ['Prokaryote: no nucleus', 'Eukaryote: nucleus and organelles'],
                  ['Prokaryotes, like bacteria, have no nucleus and no membrane-bound organelles.', 'Eukaryotes, like your cells, keep their DNA in a nucleus.']),
            quiz('Which organelle releases energy from sugar?', ['mitochondrion', 'ribosome', 'nucleus'], 'mitochondrion', 'Quick check. Which organelle releases energy from sugar?', 'The mitochondrion, the power plant of the cell.', fig="Fig.cell('animal', { ask: 'mitochondrion' })"),
            outro('Practice cell structures in Science Quest 8.'),
        ],
    },
    {
        'id': 'cell-transport', 'title': 'In and Out of Cells', 'subject': 't2', 'color': 'c2', 'label': 'Transport',
        'desc': 'Diffusion, osmosis, active transport, and what happens to cells in different solutions.', 'practice': ['t2', 'transport', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🚪', 'title': 'In and Out', 'sub': 'How materials cross the membrane', 'beats': [B('Cells must take in food and oxygen and get rid of wastes. The cell membrane controls what goes in and out.')]},
            image('Diffusion', ["Fig.membrane(12, 4, { move: 'out' })"], ['High to low concentration', 'No energy needed'],
                  ['In diffusion, particles spread from where there are many to where there are few.', 'It needs no energy from the cell. It is passive transport.']),
            image('Osmosis', ["Fig.membrane(3, 12, { water: true, move: 'in' })"], ['Diffusion of water', 'Toward more solute'],
                  ['Osmosis is the diffusion of water across a membrane.', 'Water moves toward the side with more dissolved salt or sugar.']),
            image('Active transport', ["Fig.membrane(10, 3, { move: 'in' })"], ['Low to high concentration', 'Uses energy', 'Protein pumps'],
                  ['Sometimes a cell needs to move particles from low to high concentration.', 'That takes energy, like pushing a ball uphill.', 'Protein pumps in the membrane do this, using energy from the mitochondria.']),
            bullets('Cells in solutions', [
                ('🧂', 'Hypertonic', 'more solute outside: cell shrinks', 'In a hypertonic solution, water leaves the cell and it shrinks.'),
                ('💧', 'Hypotonic', 'less solute outside: cell swells', 'In a hypotonic solution, water enters and the cell swells.'),
                ('⚖️', 'Isotonic', 'balanced: no change', 'In an isotonic solution, there is no net change.'),
            ], 'What happens to a cell in different solutions?'),
            quiz('A red blood cell is put in pure water. What happens?', ['It swells', 'It shrinks', 'No change'], 'It swells', 'Quick check. A red blood cell is put in pure water. What happens?', 'It swells, and it can burst. Pure water is hypotonic, so water rushes in.', fig="Fig.membrane(3, 12, { water: true, move: '?' })"),
            outro('Practice cell transport in Science Quest 8.'),
        ],
    },
]
