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
    # ---------- Topic 3: Human Body Systems ----------
    {
        'id': 'launch-t3', 'title': 'Topic 3: Human Body Systems', 'subject': 't3', 'color': 'c3', 'label': 'Topic launch',
        'desc': 'How the body is organized and how its systems work as a team.', 'practice': ['t3', 'bodyorg', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🫀', 'title': 'Human Body Systems', 'sub': 'Topic 3 launch', 'beats': [B('Your body is a team of systems, all working at once, even while you sleep.')]},
            bullets('In this topic', [
                ('🧩', 'Organization', 'cells to systems', 'First, how cells build tissues, organs, and organ systems.'),
                ('🍎', 'Energy', 'food and air', 'Then, how food and air supply your cells with energy.'),
                ('🩸', 'Materials', 'blood and kidneys', 'Next, how blood moves materials and kidneys clean it.'),
                ('🧠', 'Control', 'nerves and hormones', 'Finally, how nerves and hormones control it all.'),
            ], 'Here is the plan.'),
            image('One question to keep in mind', ["Fig.picture(['🏃', '🫀', '🫁'], 'What changes when you run?')"], ['Heart rate', 'Breathing rate'],
                  ['When you run, your heart beats faster.', 'You breathe harder too. By the end of this topic, you will be able to explain why.']),
            outro('Start with the lesson Body organization.'),
        ],
    },
    {
        'id': 'body-organization', 'title': 'From Cells to Systems', 'subject': 't3', 'color': 'c3', 'label': 'Body organization',
        'desc': 'Levels of organization, tissue types, and homeostasis.', 'practice': ['t3', 'bodyorg', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧍', 'title': 'From Cells to Systems', 'sub': 'Levels of organization', 'beats': [B('Your body is built in levels, like a building made of bricks, walls, and rooms.')]},
            image('Levels', ["Fig.nest(['organism', 'organ system', 'organ', 'tissue', 'cell'])"], ['Cells build tissues', 'Tissues build organs', 'Organs build systems'],
                  ['Similar cells form a tissue.', 'Different tissues form an organ, like the stomach.', 'Organs work together in an organ system, and the systems make up you.']),
            bullets('Four kinds of tissue', [
                ('💪', 'Muscle', 'contracts', 'Muscle tissue contracts and makes you move.'),
                ('⚡', 'Nerve', 'carries signals', 'Nerve tissue carries signals.'),
                ('🛡️', 'Epithelial', 'covers and lines', 'Epithelial tissue covers and lines body surfaces.'),
                ('🦴', 'Connective', 'supports and connects', 'Connective tissue, like bone and blood, supports and connects.'),
            ], 'The body has four main kinds of tissue.'),
            image('Keeping steady', ["Fig.cycle(['body gets hot', 'brain detects it', 'sweat forms', 'body cools'], 'homeostasis')"], ['Homeostasis', 'Steady inside'],
                  ['Your systems also keep conditions inside you steady. This is homeostasis.', 'When you get hot, your brain detects it, you sweat, and you cool back down.']),
            quiz('The stomach is an example of which level?', ['organ', 'tissue', 'cell'], 'organ', 'Quick check. The stomach is an example of which level?', 'An organ. It is made of several kinds of tissue working together.', fig="Fig.body('digestive', { label: 'stomach' })"),
            outro('Practice body organization in Science Quest 8.'),
        ],
    },
    {
        'id': 'systems-interact', 'title': 'Systems Working Together', 'subject': 't3', 'color': 'c3', 'label': 'Systems interacting',
        'desc': 'How body systems depend on each other, and how data shows it.', 'practice': ['t3', 'interact', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🤝', 'title': 'Systems Working Together', 'sub': 'One body, many systems', 'beats': [B('No body system works alone. Let us follow what happens when you run.')]},
            image('When you run', ["Fig.flow(['brain signals muscles', 'muscles need oxygen', 'lungs and heart speed up'])"], ['Nervous + muscular', 'Respiratory + circulatory'],
                  ['Your brain signals your leg muscles, and your muscles pull on your bones.', 'Those muscles need more oxygen, so your lungs and heart speed up.']),
            image('The data', ["Fig.trend('During a run', 'Minutes', 'Rate', [0, 5, 10, 15], { heart: [70, 120, 140, 90], breathing: [15, 30, 40, 20] })"], ['Both rise together', 'Both fall after'],
                  ['Here is evidence. Heart rate and breathing rate rise together during the run.', 'After the run, both fall back toward normal.']),
            bullets('Who does what', [
                ('🫁', 'Respiratory', 'brings in oxygen', 'The respiratory system brings in oxygen.'),
                ('🍽️', 'Digestive', 'brings in nutrients', 'The digestive system brings in nutrients.'),
                ('🩸', 'Circulatory', 'delivers them', 'The circulatory system delivers them to every cell.'),
            ], 'Three systems work together to fuel a cell.'),
            quiz('A student counts 30 heartbeats in 15 seconds. What is the heart rate per minute?', ['120', '30', '60'], '120', 'Quick check. Thirty heartbeats in fifteen seconds. What is the heart rate per minute?', '120 beats per minute. Thirty times four is one hundred twenty.', fig="Fig.picture(['⏱️', '🫀'])"),
            outro('Practice systems interacting in Science Quest 8.'),
        ],
    },
    {
        'id': 'supplying-energy', 'title': 'Food, Air, and Energy', 'subject': 't3', 'color': 'c3', 'label': 'Supplying energy',
        'desc': 'The digestive and respiratory systems, and cellular respiration.', 'practice': ['t3', 'supply', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🍎', 'title': 'Food, Air, and Energy', 'sub': 'Fueling your cells', 'beats': [B('Every cell needs energy. That energy starts with the food you eat and the air you breathe.')]},
            image('The path of food', ["Fig.body('digestive', { labels: true })"], ['Mouth to intestines', 'Most absorbed in the small intestine'],
                  ['Food moves from the mouth down the esophagus to the stomach, and then through the intestines.', 'Most nutrients enter the blood in the small intestine.']),
            image('The path of air', ["Fig.body('respiratory', { labels: true })"], ['Trachea to lungs', 'Alveoli exchange gases'],
                  ['Air moves through the trachea and bronchi to the lungs.', 'In tiny air sacs called alveoli, oxygen enters the blood and carbon dioxide leaves.']),
            image('Inside the cell', ["Fig.flow(['glucose + oxygen', 'mitochondrion', 'CO₂ + water + energy'])"], ['Cellular respiration', 'In the mitochondria'],
                  ['Inside your cells, mitochondria use glucose and oxygen to release energy.', 'Carbon dioxide and water are the leftovers, and you breathe out the carbon dioxide.']),
            quiz('Where is most food absorbed into the blood?', ['small intestine', 'stomach', 'esophagus'], 'small intestine', 'Quick check. Where is most food absorbed into the blood?', 'The small intestine. Tiny villi give it a huge surface area.', fig="Fig.body('digestive', { ask: 'small intestine' })"),
            outro('Practice supplying energy in Science Quest 8.'),
        ],
    },
    {
        'id': 'managing-materials', 'title': 'Blood and Waste', 'subject': 't3', 'color': 'c3', 'label': 'Managing materials',
        'desc': 'The heart, blood vessels, and kidneys.', 'practice': ['t3', 'manage', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🩸', 'title': 'Blood and Waste', 'sub': 'Moving and cleaning', 'beats': [B('Blood is the delivery service of the body, and your kidneys are the cleaning crew.')]},
            image('Two loops', ["Fig.cycle(['right side of heart', 'lungs', 'left side of heart', 'body'], 'double loop')"], ['Heart to lungs', 'Heart to body'],
                  ['Blood takes two loops. The right side of the heart sends it to the lungs to pick up oxygen.', 'The left side of the heart then pumps it out to the whole body.']),
            bullets('Blood vessels', [
                ('➡️', 'Arteries', 'away from the heart', 'Arteries carry blood away from the heart. A for away.'),
                ('🔬', 'Capillaries', 'one cell thick', 'Capillaries are so thin that materials can cross their walls.'),
                ('⬅️', 'Veins', 'back to the heart', 'Veins bring blood back, with valves that stop it from flowing backward.'),
            ], 'Blood travels in three kinds of vessels.'),
            image('The kidneys', ["Fig.body('excretory', { labels: true })"], ['Filter the blood', 'Keep what is useful', 'Remove wastes as urine'],
                  ['Your kidneys filter water and small molecules out of the blood.', 'They take back what the body needs, like glucose.', 'What is left is urine, which is stored in the bladder.']),
            quiz('Which vessels carry blood away from the heart?', ['arteries', 'veins', 'ureters'], 'arteries', 'Quick check. Which vessels carry blood away from the heart?', 'Arteries. They have thick walls for the high pressure.', fig="Fig.body('circulatory', { ask: 'artery' })"),
            outro('Practice managing materials in Science Quest 8.'),
        ],
    },
    {
        'id': 'controlling-processes', 'title': 'Nerves and Hormones', 'subject': 't3', 'color': 'c3', 'label': 'Controlling processes',
        'desc': 'Neurons, the brain, reflexes, and hormones.', 'practice': ['t3', 'control', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧠', 'title': 'Nerves and Hormones', 'sub': 'The body\'s two message systems', 'beats': [B('Your body sends messages in two ways: fast signals on nerves, and slower chemical signals called hormones.')]},
            image('A neuron', ["Fig.neuron({ labels: ['dendrite', 'cell body', 'axon', 'axon terminal'] })"], ['In at the dendrites', 'Along the axon', 'Out at the terminals'],
                  ['Dendrites receive a signal.', 'The signal travels through the cell body and along the axon.', 'At the end, it passes to the next cell.']),
            image('A reflex', ["Fig.flow(['skin receptor', 'spinal cord', 'muscle', 'hand moves'])"], ['Fast and automatic', 'Goes through the spinal cord'],
                  ['If you touch something hot, a signal rushes to your spinal cord and straight back to your muscles.', 'Your hand moves before your brain even feels the pain.']),
            image('Hormones', ["Fig.body('endocrine', { labels: true })"], ['Travel in the blood', 'Slower, longer lasting'],
                  ['Glands release hormones into your blood.', 'They act more slowly than nerves, but their effects last longer.']),
            quiz('Which signal is faster?', ['a nerve signal', 'a hormone', 'they are the same'], 'a nerve signal', 'Quick check. Which is faster, a nerve signal or a hormone?', 'A nerve signal. It can arrive in a tiny fraction of a second.', fig="Fig.neuron()"),
            outro('Practice controlling processes in Science Quest 8.'),
        ],
    },
    # ---------- Topic 4: Reproduction and Growth ----------
    {
        'id': 'launch-t4', 'title': 'Topic 4: Reproduction and Growth', 'subject': 't4', 'color': 'c4', 'label': 'Topic launch',
        'desc': 'How living things reproduce, and what shapes how they grow.', 'practice': ['t4', 'reppatterns', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌱', 'title': 'Reproduction and Growth', 'sub': 'Topic 4 launch', 'beats': [B('Every living thing comes from other living things. In this topic you will see how, and what shapes their growth.')]},
            bullets('In this topic', [
                ('🐣', 'Patterns', 'one parent or two', 'First, reproduction with one parent or with two.'),
                ('🌸', 'Plants', 'flowers and seeds', 'Then, how plant structures help them reproduce.'),
                ('🦚', 'Animals', 'behaviors', 'Next, how animal behaviors help the young survive.'),
                ('📈', 'Growth', 'genes and environment', 'Finally, how genes and the environment shape growth.'),
            ], 'Here is the plan.'),
            image('One question to keep in mind', ["Fig.picture(['🐢', '🥚', '🐘'], 'Many eggs or one calf?')"], ['100 eggs, no care', '1 calf, years of care'],
                  ['A sea turtle lays about a hundred eggs and swims away.', 'An elephant has one calf and cares for it for years. Why might both be good strategies?']),
            outro('Start with the lesson Patterns of reproduction.'),
        ],
    },
    {
        'id': 'patterns-reproduction', 'title': 'One Parent or Two', 'subject': 't4', 'color': 'c4', 'label': 'Patterns of reproduction',
        'desc': 'Asexual and sexual reproduction, and why variation matters.', 'practice': ['t4', 'reppatterns', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🐣', 'title': 'One Parent or Two', 'sub': 'Patterns of reproduction', 'beats': [B('Some living things need just one parent. Others need two. Each pattern has its own advantages.')]},
            bullets('Asexual reproduction', [
                ('🦠', 'Binary fission', 'bacteria split', 'Bacteria split in two.'),
                ('🌱', 'Budding', 'hydra and yeast', 'Hydra and yeast grow buds that break off.'),
                ('🥔', 'Plant parts', 'runners and potatoes', 'Plants can grow from runners and from potato eyes.'),
            ], 'In asexual reproduction, one parent makes offspring with the same genes.'),
            image('Sexual reproduction', ["Fig.flow(['egg + sperm', 'fertilization', 'zygote'])"], ['Half from each parent', '23 + 23 = 46'],
                  ['In sexual reproduction, an egg and a sperm join.', 'In humans, each carries 23 chromosomes, so the zygote has 46.']),
            image('Which is better?', ["Fig.table([['Feature', 'Asexual', 'Sexual'], ['Parents', '1', '2'], ['Speed', 'fast', 'slow'], ['Variety', 'little', 'much']])"], ['Fast, or varied'],
                  ['Asexual reproduction is fast and needs no mate.', 'Sexual reproduction gives variety, so some offspring may survive when conditions change.']),
            quiz('One bacterium divides every 20 minutes. How many after one hour?', ['8', '3', '6'], '8', 'Quick check. One bacterium divides every twenty minutes. How many are there after one hour?', 'Eight. Three doublings: one, two, four, eight.', fig="Fig.flow(['1', '2', '4', '8'])"),
            outro('Practice patterns of reproduction in Science Quest 8.'),
        ],
    },
    {
        'id': 'plant-reproduction', 'title': 'Flowers, Seeds, and Fruit', 'subject': 't4', 'color': 'c4', 'label': 'Plant structures',
        'desc': 'Parts of a flower, pollination, and how seeds spread.', 'practice': ['t4', 'plantrepro', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌸', 'title': 'Flowers, Seeds, and Fruit', 'sub': 'Plant reproduction', 'beats': [B('A flower is not just pretty. It is a structure for making seeds.')]},
            image('Parts of a flower', ["Fig.flower({ labels: ['anther', 'stigma', 'ovary', 'ovule', 'petal'] })"], ['Anther: pollen', 'Stigma: catches pollen', 'Ovary: holds ovules'],
                  ['The anther makes pollen.', 'The sticky stigma catches pollen.', 'The ovary at the base holds the ovules.']),
            image('From flower to seed', ["Fig.flow(['pollination', 'fertilization', 'seed', 'new plant'])"], ['Ovule becomes seed', 'Ovary becomes fruit'],
                  ['Pollen reaches the stigma and fertilizes the ovule, which becomes a seed.', 'The ovary around it grows into a fruit.']),
            bullets('Traveling seeds', [
                ('🌬️', 'Wind', 'wings and fluff', 'Dandelion fluff and maple wings ride the wind.'),
                ('🌊', 'Water', 'floating seeds', 'Coconuts float on water.'),
                ('🐦', 'Animals', 'hooks and fruit', 'Burrs hook onto fur, and birds drop berry seeds.'),
            ], 'Seeds need to spread out so they do not compete with the parent.'),
            quiz('After fertilization, what does the ovary become?', ['a fruit', 'a petal', 'a root'], 'a fruit', 'Quick check. After fertilization, what does the ovary become?', 'A fruit, which protects the seeds and helps spread them.', fig="Fig.flower({ ask: 'ovary' })"),
            outro('Practice plant reproduction in Science Quest 8.'),
        ],
    },
    {
        'id': 'animal-reproduction', 'title': 'Animal Behaviors for Reproduction', 'subject': 't4', 'color': 'c4', 'label': 'Animal behaviors',
        'desc': 'Courtship, parental care, and two strategies for raising young.', 'practice': ['t4', 'animalrepro', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦚', 'title': 'Animal Behaviors', 'sub': 'Finding mates and raising young', 'beats': [B('A peacock spreads its tail. A penguin warms an egg on its feet. Why do animals do these things?')]},
            bullets('Behaviors that help', [
                ('🦚', 'Courtship', 'displays and songs', 'Displays and songs attract mates of the same species.'),
                ('🪹', 'Nests', 'safe places', 'Nests protect eggs and young.'),
                ('🐧', 'Parental care', 'feeding and guarding', 'Parents may feed and guard their young.'),
            ], 'These behaviors raise the chance of leaving offspring.'),
            image('Two strategies', ["Fig.table([['Strategy', 'Example', 'Young', 'Care'], ['Many young', 'Sea turtle', 'about 100', 'none'], ['Few young', 'Elephant', '1', 'years']])"], ['Quantity', 'Quality'],
                  ['Some animals have many young and give little care, so that a few might survive.', 'Others have few young and give a lot of care.']),
            image('Testing a claim', ["Fig.table([['Nests', 'Eggs laid', 'Hatched'], ['Guarded', '100', '80'], ['Unguarded', '100', '30']])"], ['80% vs 30%'],
                  ['Scientists test these claims with data.', 'In this example, 80 percent of guarded eggs hatched, but only 30 percent of unguarded eggs.']),
            quiz('What does reproductive success measure?', ['offspring that survive', 'eggs laid', 'body size'], 'offspring that survive', 'Quick check. What does reproductive success measure?', 'Offspring that survive. A parent with fewer eggs may still do better.', fig="Fig.picture(['🐦', '🐣'])"),
            outro('Practice animal behaviors in Science Quest 8.'),
        ],
    },
    {
        'id': 'growth-factors', 'title': 'Genes and Environment', 'subject': 't4', 'color': 'c4', 'label': 'Factors influencing growth',
        'desc': 'How genes and the environment shape growth, and how to test it.', 'practice': ['t4', 'growth', 0],
        'scenes': [
            {'type': 'title', 'emoji': '📈', 'title': 'Genes and Environment', 'sub': 'What shapes growth', 'beats': [B('Why does one plant grow taller than another? The answer is usually both genes and environment.')]},
            bullets('Factors', [
                ('🧬', 'Genes', 'set the range', 'Genes set the range of what is possible.'),
                ('☀️', 'Light', 'for plants', 'Light lets plants make food.'),
                ('💧', 'Water', 'and nutrients', 'Water and nutrients support growth.'),
                ('🌡️', 'Temperature', 'speeds or slows', 'Temperature speeds up or slows down growth.'),
            ], 'Many factors matter.'),
            image('A fair test', ["Fig.trend('Plant height', 'Weeks', 'Height (cm)', [0, 2, 4, 6], { fertilizer: [2, 10, 22, 34], none: [2, 6, 12, 18] })"], ['Same seeds', 'One difference'],
                  ['To test a factor, use the same kind of seeds and change just one thing.', 'Here, fertilized plants grew taller than the others.']),
            image('The shortest supply', ["Fig.picture(['🌵', '💧'], 'In a desert, water is the limit')"], ['Limiting factor'],
                  ['Growth is held back by whatever is in shortest supply. This is the limiting factor.']),
            quiz('Clones grown in sun and shade differ. What causes the difference?', ['environment', 'genes', 'mutations'], 'environment', 'Quick check. Clones grown in sun and shade grow differently. What causes the difference?', 'The environment. Clones have the same genes, so the difference comes from the light.', fig="Fig.picture(['🌱', '☀️', '🌑'])"),
            outro('Practice factors influencing growth in Science Quest 8.'),
        ],
    },
    # ---------- Topic 5: Ecosystems ----------
    {
        'id': 'launch-t5', 'title': 'Topic 5: Ecosystems', 'subject': 't5', 'color': 'c5', 'label': 'Topic launch',
        'desc': 'How living things depend on each other and on their surroundings.', 'practice': ['t5', 'environment', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌎', 'title': 'Ecosystems', 'sub': 'Topic 5 launch', 'beats': [B('Living things are never really alone. They depend on each other, and on the world around them.')]},
            bullets('In this topic', [
                ('🏞️', 'Environment', 'resources and limits', 'First, how resources limit populations.'),
                ('⚡', 'Energy', 'food webs', 'Then, how energy flows through food webs.'),
                ('♻️', 'Matter', 'cycles', 'Finally, how water, carbon, and nitrogen cycle.'),
            ], 'Here is the plan.'),
            image('One question to keep in mind', ["Fig.picture(['🫙', '🌱', '☀️'], 'A sealed jar with a living plant')"], ['Sealed jar', 'Only light gets in'],
                  ['A plant can live for years in a sealed jar.', 'Only light gets in. How is that possible? You will be able to explain it by the end of the topic.']),
            outro('Start with the lesson Living things and the environment.'),
        ],
    },
    {
        'id': 'living-environment', 'title': 'Living Things and Their Environment', 'subject': 't5', 'color': 'c5', 'label': 'Living things and the environment',
        'desc': 'Biotic and abiotic factors, limiting factors, and carrying capacity.', 'practice': ['t5', 'environment', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🏞️', 'title': 'Living Things and Their Environment', 'sub': 'Resources and limits', 'beats': [B('A pond has frogs and algae, and also water and sunlight. All of these are parts of its ecosystem.')]},
            image('Levels', ["Fig.nest(['biosphere', 'ecosystem', 'community', 'population', 'organism'])"], ['Population: one species', 'Community: all species', 'Ecosystem: plus nonliving'],
                  ['All the frogs in a pond are a population.', 'All the species in the pond are a community.', 'Add the water, mud, and sunlight, and you have an ecosystem.']),
            image('Limits to growth', ["Fig.trend('Rabbits on an island', 'Years', 'Rabbits', [0, 2, 4, 6, 8], { rabbits: [20, 120, 400, 490, 500] })"], ['Limiting factors', 'Carrying capacity'],
                  ['Food, water, and space are limited.', 'A population levels off at the most its area can support, called the carrying capacity.']),
            image('Counting a population', ["Fig.flow(['count in small squares', 'find the average', 'multiply for the whole field'])"], ['Sampling'],
                  ['Scientists rarely count every plant. They count small squares, find the average, and multiply.']),
            quiz('A 10 square meter plot has 40 plants. What is the density?', ['4 per m²', '40 per m²', '400 per m²'], '4 per m²', 'Quick check. A ten square meter plot has forty plants. What is the density?', 'Four plants per square meter. Forty divided by ten.', fig="Fig.picture(['🌱', '📏'])"),
            outro('Practice living things and the environment in Science Quest 8.'),
        ],
    },
    {
        'id': 'energy-flow', 'title': 'Energy Flow', 'subject': 't5', 'color': 'c5', 'label': 'Energy flow',
        'desc': 'Food chains, food webs, and the 10 percent rule.', 'practice': ['t5', 'energyflow', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⚡', 'title': 'Energy Flow', 'sub': 'From the sun to the top predator', 'beats': [B('The energy in your lunch started as sunlight. Let us follow it.')]},
            image('A food chain', ["Fig.flow(['grass', 'rabbit', 'fox'])"], ['Producer', 'Consumers', 'Arrows show energy moving'],
                  ['Grass is a producer. It makes food using sunlight.', 'The rabbit and the fox are consumers.', 'The arrows show energy moving from the food to the eater.']),
            image('A food web', ["Fig.web([['hawk'], ['snake', 'mouse'], ['grass', 'seeds']], [['grass', 'mouse'], ['seeds', 'mouse'], ['mouse', 'snake'], ['snake', 'hawk'], ['mouse', 'hawk']])"], ['Many connected chains'],
                  ['Most animals eat many things, so real ecosystems form food webs of many connected chains.']),
            image('The 10 percent rule', ["Fig.energy(['hawks: 10 kJ', 'snakes: 100 kJ', 'mice: 1,000 kJ', 'grass: 10,000 kJ'])"], ['About 10% moves up', 'The rest is used or lost as heat'],
                  ['Only about ten percent of the energy passes from one level to the next.', 'The rest is used for life or lost as heat. That is why there are far fewer hawks than mice.']),
            quiz('Grass has 10,000 units of energy. About how many reach the rabbits?', ['1,000', '100', '5,000'], '1,000', 'Quick check. Grass has ten thousand units of energy. About how many reach the rabbits?', 'About one thousand. Ten percent passes to the next level.', fig="Fig.energy(['rabbits: ?', 'grass: 10,000'])"),
            outro('Practice energy flow in Science Quest 8.'),
        ],
    },
    {
        'id': 'cycles-matter', 'title': 'Cycles of Matter', 'subject': 't5', 'color': 'c5', 'label': 'Cycles of matter',
        'desc': 'The water, carbon, and nitrogen cycles, and how people change them.', 'practice': ['t5', 'cycles', 0],
        'scenes': [
            {'type': 'title', 'emoji': '♻️', 'title': 'Cycles of Matter', 'sub': 'Atoms get reused', 'beats': [B('Energy flows through ecosystems, but matter gets reused, over and over.')]},
            image('The water cycle', ["Fig.cycle(['evaporation', 'condensation', 'precipitation', 'runoff'], 'water')"], ['Sun drives it', 'Water changes form'],
                  ['The sun evaporates water, which condenses into clouds.', 'It falls as precipitation and runs off back to the sea.']),
            image('The carbon cycle', ["Fig.cycle(['CO₂ in air', 'plant', 'animal', 'respiration'], 'carbon')"], ['Photosynthesis removes CO₂', 'Respiration and burning add it'],
                  ['Plants take carbon dioxide from the air and build it into sugar.', 'Respiration, decay, and burning fuels return it to the air.']),
            image('The nitrogen cycle', ["Fig.cycle(['bacteria fix nitrogen', 'plants', 'animals', 'decomposers'], 'nitrogen')"], ['Bacteria are key'],
                  ['Most living things cannot use the nitrogen in air.', 'Bacteria change it into a form plants can use, and decomposers return it to the soil.']),
            quiz('Which process removes carbon dioxide from the air?', ['photosynthesis', 'respiration', 'burning'], 'photosynthesis', 'Quick check. Which process removes carbon dioxide from the air?', 'Photosynthesis. Plants use it to build sugar.', fig="Fig.cell('plant', { label: 'chloroplast' })"),
            outro('Practice cycles of matter in Science Quest 8.'),
        ],
    },
    # ---------- Topic 6: Populations, Communities, and Ecosystems ----------
    {
        'id': 'launch-t6', 'title': 'Topic 6: Populations, Communities, and Ecosystems', 'subject': 't6', 'color': 'c6', 'label': 'Topic launch',
        'desc': 'How species interact, how ecosystems change, and why variety matters.', 'practice': ['t6', 'interactions', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦌', 'title': 'Populations and Communities', 'sub': 'Topic 6 launch', 'beats': [B('When wolves returned to Yellowstone, even the rivers and trees were affected. How can one animal change so much?')]},
            bullets('In this topic', [
                ('🐝', 'Interactions', 'who helps, who hurts', 'First, how species help or hurt each other.'),
                ('🌋', 'Change', 'succession and resilience', 'Then, how ecosystems change and recover.'),
                ('🦋', 'Biodiversity', 'variety of life', 'Next, what biodiversity is and how to protect it.'),
                ('🌳', 'Services', 'nature\'s benefits', 'Finally, what ecosystems do for people.'),
            ], 'Here is the plan.'),
            image('One question to keep in mind', ["Fig.flow(['more wolves', 'fewer elk', 'more willows'])"], ['One change spreads'],
                  ['More wolves can mean fewer elk, and fewer elk can mean more young trees. Watch for this pattern.']),
            outro('Start with the lesson Interactions in ecosystems.'),
        ],
    },
    {
        'id': 'interactions', 'title': 'Interactions', 'subject': 't6', 'color': 'c6', 'label': 'Interactions',
        'desc': 'Competition, predation, and symbiosis.', 'practice': ['t6', 'interactions', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🐝', 'title': 'Interactions', 'sub': 'Who helps, who hurts', 'beats': [B('In every ecosystem, the same patterns of interaction appear again and again.')]},
            bullets('Patterns', [
                ('🦌', 'Competition', 'same resource', 'In competition, organisms need the same limited resource.'),
                ('🦉', 'Predation', 'one eats another', 'In predation, one organism eats another.'),
                ('🐝', 'Mutualism', 'both benefit', 'In mutualism, both species benefit.'),
                ('🪳', 'Parasitism', 'one is harmed', 'In parasitism, one benefits and the host is harmed.'),
            ], 'Learn these patterns, and you can predict what happens.'),
            image('Predators and prey', ["Fig.trend('Prey and predators', 'Years', 'Number', [0, 2, 4, 6, 8], { prey: [100, 160, 90, 60, 110], predators: [20, 28, 40, 24, 18] })"], ['Prey rise first', 'Predators follow'],
                  ['When prey increase, predators have more food, so they increase next.', 'Then the prey fall, and the predators follow them down.']),
            image('A keystone species', ["Fig.web([['otter'], ['urchin'], ['kelp']], [['kelp', 'urchin'], ['urchin', 'otter']])"], ['One species, big effect'],
                  ['Sea otters eat urchins, and urchins eat kelp. Without otters, urchins can destroy the kelp forest.']),
            quiz('A tick drinks a deer\'s blood. What is this?', ['parasitism', 'mutualism', 'commensalism'], 'parasitism', 'Quick check. A tick drinks a deer\'s blood. What is this interaction?', 'Parasitism. The tick benefits, and the deer is harmed.', fig="Fig.picture(['🦌', '🩸'])"),
            outro('Practice interactions in Science Quest 8.'),
        ],
    },
    {
        'id': 'resilient-ecosystems', 'title': 'Dynamic and Resilient Ecosystems', 'subject': 't6', 'color': 'c6', 'label': 'Dynamic and resilient ecosystems',
        'desc': 'Succession, disturbance, and arguing from evidence.', 'practice': ['t6', 'resilience', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌋', 'title': 'Ecosystems Change', 'sub': 'Succession and recovery', 'beats': [B('After a volcano or a fire, life comes back, in a surprisingly predictable order.')]},
            image('Primary succession', ["Fig.flow(['bare rock', 'lichens', 'grasses', 'shrubs', 'trees'])"], ['Starts with no soil', 'Pioneers first'],
                  ['On bare rock, pioneer species like lichens come first and begin to make soil.', 'Grasses, shrubs, and at last trees follow.']),
            image('A recovery story', ["Fig.trend('Bald eagle nesting pairs (U.S.)', 'Year', 'Pairs', [1963, 1984, 2000, 2006], { pairs: [417, 1757, 6471, 9789] })"], ['DDT banned in 1972', 'Eagles recovered'],
                  ['A pesticide called DDT thinned bald eagle eggshells, and the birds became rare.', 'After it was banned in 1972, their numbers recovered.']),
            bullets('A strong argument', [
                ('💬', 'Claim', 'what you think', 'A claim answers the question.'),
                ('📊', 'Evidence', 'data', 'Evidence is the data that supports it.'),
                ('🧠', 'Reasoning', 'why it fits', 'Reasoning explains why the evidence supports the claim.'),
            ], 'Scientists argue from evidence.'),
            quiz('Succession after a forest fire is called what?', ['secondary', 'primary', 'tertiary'], 'secondary', 'Quick check. Succession after a forest fire is called what?', 'Secondary succession. The soil and seeds are still there, so it goes faster.', fig="Fig.picture(['🔥', '🌱'])"),
            outro('Practice dynamic and resilient ecosystems in Science Quest 8.'),
        ],
    },
    {
        'id': 'biodiversity', 'title': 'Biodiversity', 'subject': 't6', 'color': 'c6', 'label': 'Biodiversity',
        'desc': 'What biodiversity is, what threatens it, and how to compare solutions.', 'practice': ['t6', 'biodiversity', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦋', 'title': 'Biodiversity', 'sub': 'The variety of life', 'beats': [B('A rain forest and a wheat field are both full of plants. Only one of them has great biodiversity.')]},
            bullets('Three levels', [
                ('🧬', 'Genes', 'within a species', 'There is variety in genes within a species.'),
                ('🐸', 'Species', 'many kinds', 'There is variety in species.'),
                ('🌳', 'Ecosystems', 'many habitats', 'And there is variety in ecosystems.'),
            ], 'Biodiversity has three levels.'),
            bullets('Threats', [
                ('🪓', 'Habitat loss', 'the biggest threat', 'Habitat loss is the biggest threat.'),
                ('🏭', 'Pollution', 'in air, water, and land', 'Pollution harms air, water, and land.'),
                ('🐚', 'Invasive species', 'few enemies', 'Invasive species spread with few natural enemies.'),
                ('🎣', 'Overharvesting', 'too many taken', 'Overhunting and overfishing take too many.'),
            ], 'What threatens biodiversity?'),
            image('Comparing solutions', ["Fig.table([['Solution', 'Cost', 'Toads saved'], ['Fence', '$2,000', '20'], ['Tunnel', '$5,000', '100'], ['Signs', '$500', '5']])"], ['Compare results and costs'],
                  ['When choosing a solution, compare how well it works with what it costs.', 'The tunnel costs the most, but saves the most per dollar.']),
            quiz('Which has higher biodiversity?', ['a rain forest', 'a wheat field', 'a lawn'], 'a rain forest', 'Quick check. Which has higher biodiversity?', 'A rain forest, with its huge variety of species.', fig="Fig.picture(['🌴', '🦜', '🐒'])"),
            outro('Practice biodiversity in Science Quest 8.'),
        ],
    },
    {
        'id': 'ecosystem-services', 'title': 'Ecosystem Services', 'subject': 't6', 'color': 'c6', 'label': 'Ecosystem services',
        'desc': 'What nature does for people, and how to weigh choices.', 'practice': ['t6', 'services', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🌳', 'title': 'Ecosystem Services', 'sub': 'What nature does for us', 'beats': [B('New York City gets clean water partly because it protects forests in the mountains. That is an ecosystem service.')]},
            bullets('Four types', [
                ('🍎', 'Provisioning', 'food, water, wood', 'Provisioning services give us goods like food and wood.'),
                ('🌾', 'Regulating', 'floods, clean water', 'Regulating services control floods and clean water.'),
                ('🪱', 'Supporting', 'soil, nutrient cycles', 'Supporting services build soil and cycle nutrients.'),
                ('🥾', 'Cultural', 'recreation, beauty', 'Cultural services include hiking and beauty.'),
            ], 'Ecosystem services come in four types.'),
            image('Marsh or seawall?', ["Fig.table([['Option', 'Habitat?', 'Clean water?'], ['Wall', 'no', 'no'], ['Marsh', 'yes', 'yes']])"], ['Trade-offs', 'Extra benefits'],
                  ['Choices have trade-offs. A wall may protect one spot.', 'A restored marsh can also give habitat and clean the water.']),
            quiz('Bees pollinating crops is what kind of service?', ['regulating', 'cultural', 'provisioning'], 'regulating', 'Quick check. Bees pollinating crops is what kind of service?', 'A regulating service. It keeps the processes we depend on working.', fig="Fig.picture(['🐝', '🍎'])"),
            outro('Practice ecosystem services in Science Quest 8.'),
        ],
    },
    # ---------- Topic 7: Genes and Heredity ----------
    {
        'id': 'launch-t7', 'title': 'Topic 7: Genes and Heredity', 'subject': 't7', 'color': 'c1', 'label': 'Topic launch',
        'desc': 'How traits pass from parents to children, and how we study and change genes.', 'practice': ['t7', 'inherit', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧬', 'title': 'Genes and Heredity', 'sub': 'Topic 7 launch', 'beats': [B('Why do you look a bit like your family, but not exactly? The answer is in your genes.')]},
            bullets('In this topic', [
                ('🟩', 'Inheritance', 'Punnett squares', 'First, patterns of inheritance and Punnett squares.'),
                ('🧵', 'Chromosomes', 'where genes are', 'Then, chromosomes, where genes are carried.'),
                ('🧶', 'Proteins', 'the code', 'Next, how genes code for proteins.'),
                ('🧪', 'Variation and tools', 'mutations, technology', 'Finally, mutations, variation, and genetic technology.'),
            ], 'Here is the plan.'),
            image('One question to keep in mind', ["Fig.pedigree('mf', 'mFMf')"], ['Parents without the trait', 'Children with it'],
                  ['Here is a family. Neither parent shows a trait, but two of their children do.', 'How can that happen? You will be able to explain it.']),
            outro('Start with the lesson Patterns of inheritance.'),
        ],
    },
    {
        'id': 'patterns-inheritance', 'title': 'Patterns of Inheritance', 'subject': 't7', 'color': 'c1', 'label': 'Patterns of inheritance',
        'desc': 'Alleles, dominant and recessive traits, and Punnett squares.', 'practice': ['t7', 'inherit', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🟩', 'title': 'Patterns of Inheritance', 'sub': 'Mendel\'s peas', 'beats': [B('In the 1860s, Gregor Mendel crossed thousands of pea plants and found the patterns of inheritance.')]},
            image('Alleles', ["Fig.chroms([['T', 't']])"], ['Different forms of a gene', 'One from each parent'],
                  ['A gene can come in different forms called alleles.', 'You get one allele from each parent. A dominant allele shows even with one copy, and a recessive one needs two.']),
            image('A Punnett square', ["Fig.punnett('Bb', 'Bb')"], ['One allele from each parent', '1 in 4 is bb'],
                  ['A Punnett square shows the chances. Write one parent on top and one on the side, then fill in the boxes.', 'Here, one box in four is little b, little b, so the chance of the recessive trait is one in four.']),
            image('Family charts', ["Fig.pedigree('mf', 'mFMf')"], ['Filled shapes show the trait', 'Both parents are carriers'],
                  ['A pedigree tracks a trait through a family. Filled shapes have the trait.', 'Neither parent here shows it, so it must be recessive, and both parents must be carriers.']),
            quiz('What is the chance of bb from Bb × Bb?', ['1 in 4', '1 in 2', '3 in 4'], '1 in 4', 'Quick check. What is the chance of little b, little b from two Bb parents?', 'One in four. One of the four boxes is little b, little b.', fig="Fig.punnett('Bb', 'Bb')"),
            outro('Practice patterns of inheritance in Science Quest 8.'),
        ],
    },
    {
        'id': 'chromosomes-inheritance', 'title': 'Chromosomes and Inheritance', 'subject': 't7', 'color': 'c1', 'label': 'Chromosomes and inheritance',
        'desc': '23 pairs, XX and XY, and traits on the X chromosome.', 'practice': ['t7', 'chromosomes', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧵', 'title': 'Chromosomes', 'sub': 'Where genes are', 'beats': [B('Your genes are carried on chromosomes, long coiled strands of DNA in the nucleus.')]},
            image('23 pairs', ["Fig.karyo('XY')"], ['46 chromosomes', 'One set from each parent', 'Last pair: XX or XY'],
                  ['Most people have 46 chromosomes, in 23 pairs.', 'One of each pair comes from each parent.', 'The last pair is usually X X or X Y.']),
            image('XX or XY', ["Fig.punnett(['X', 'Y'], ['X', 'X'])"], ['Eggs carry X', 'Sperm carry X or Y'],
                  ['An egg carries an X. A sperm carries an X or a Y.', 'So in this square, half the boxes are X X, and half are X Y.']),
            image('Traits on the X', ["Fig.picture(['🔴', '🟢'], 'Red-green color blindness')"], ['X-linked', 'More common in males'],
                  ['Some genes are on the X chromosome.', 'Red-green color blindness is more common in males, since they have only one X to carry a working copy.']),
            quiz('How many chromosomes are in a human sperm?', ['23', '46', '92'], '23', 'Quick check. How many chromosomes are in a human sperm?', 'Twenty-three, half the usual number.', fig="Fig.karyo('XX')"),
            outro('Practice chromosomes and inheritance in Science Quest 8.'),
        ],
    },
    {
        'id': 'genetic-coding', 'title': 'From DNA to Protein', 'subject': 't7', 'color': 'c1', 'label': 'Genetic coding',
        'desc': 'DNA, mRNA, codons, proteins, and mutations.', 'practice': ['t7', 'protein', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧶', 'title': 'From DNA to Protein', 'sub': 'The code of life', 'beats': [B('DNA is written in just four letters, yet it holds the instructions for building you.')]},
            image('Base pairs', ["Fig.dna('ATGC')"], ['A pairs with T', 'G pairs with C'],
                  ['DNA has four bases. A pairs with T.', 'And G pairs with C.']),
            image('Making a protein', ["Fig.flow(['DNA', 'mRNA', 'ribosome', 'protein'])"], ['Transcription', 'Translation', 'Three bases per amino acid'],
                  ['In transcription, DNA is copied into mRNA.', 'In translation, a ribosome reads the mRNA and links amino acids.', 'Every three bases, called a codon, stands for one amino acid.']),
            bullets('Mutations', [
                ('🔁', 'Substitution', 'one base swapped', 'A substitution swaps one base, which may or may not change the protein.'),
                ('✂️', 'Deletion', 'a base is lost', 'A deletion removes a base and shifts every codon after it.'),
                ('➕', 'Insertion', 'a base is added', 'An insertion adds a base, and also shifts the code.'),
            ], 'A mutation is a change in DNA.'),
            quiz('Which base pairs with G in DNA?', ['C', 'A', 'T'], 'C', 'Quick check. Which base pairs with G in DNA?', 'C. G always pairs with C, and A with T.', fig="Fig.dna('GATC', { bottom: '?TAG' })"),
            outro('Practice genetic coding in Science Quest 8.'),
        ],
    },
    {
        'id': 'trait-variations', 'title': 'Trait Variations', 'subject': 't7', 'color': 'c1', 'label': 'Trait variations',
        'desc': 'Where variation comes from, and why it can help or harm.', 'practice': ['t7', 'variation', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🎨', 'title': 'Trait Variations', 'sub': 'Why no two are the same', 'beats': [B('Look around any classroom. People vary in height, hair, and much more. Where does this come from?')]},
            bullets('Sources', [
                ('🧬', 'Mutations', 'new alleles', 'Mutations make new alleles.'),
                ('🔀', 'Gene mixing', 'meiosis and fertilization', 'Sexual reproduction mixes genes in new ways.'),
                ('☀️', 'Environment', 'not inherited', 'The environment also matters, though changes like a suntan are not inherited.'),
            ], 'Variation comes from three main sources.'),
            image('Measuring variation', ["Fig.trend('Heights in a class', 'Height (cm)', 'Students', [145, 150, 155, 160, 165], { students: [2, 6, 10, 6, 2] })"], ['A range of values', 'Many genes'],
                  ['When many genes affect a trait, you get a range of values.', 'Most people are near the middle.']),
            image('Helpful or harmful?', ["Fig.trend('Peppered moths near a city', 'Year', 'Percent dark', [1850, 1900, 1950, 2000], { dark: [2, 90, 90, 10] })"], ['It depends on the environment'],
                  ['Whether a trait helps depends on the environment.', 'Dark moths did well on sooty trees, and light moths did well after the air was cleaned up.']),
            quiz('Which trait is acquired, not inherited?', ['a scar', 'blood type', 'freckles'], 'a scar', 'Quick check. Which trait is acquired, not inherited?', 'A scar. It comes from something that happened during life, so it is not passed on through genes.', fig="Fig.picture(['🧬', '🩹'])"),
            outro('Practice trait variations in Science Quest 8.'),
        ],
    },
    {
        'id': 'genetic-technologies', 'title': 'Genetic Technologies', 'subject': 't7', 'color': 'c1', 'label': 'Genetic technologies',
        'desc': 'Selective breeding, genetic engineering, cloning, and gene editing.', 'practice': ['t7', 'gentech', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🧪', 'title': 'Genetic Technologies', 'sub': 'How people change genes', 'beats': [B('People have been changing the genes of plants and animals for thousands of years, long before anyone knew about DNA.')]},
            bullets('Tools', [
                ('🐕', 'Selective breeding', 'choosing parents', 'In selective breeding, people choose which organisms breed.'),
                ('💉', 'Genetic engineering', 'moving genes', 'In genetic engineering, genes are moved directly, as in bacteria that make insulin.'),
                ('🐑', 'Cloning', 'identical copies', 'Cloning makes genetically identical copies, like Dolly the sheep.'),
                ('✂️', 'CRISPR', 'editing genes', 'And CRISPR edits a chosen part of DNA.'),
            ], 'Here are four tools.'),
            image('Weighing the choices', ["Fig.trend('Herbicide-resistant weeds', 'Years', 'Species', [0, 5, 10, 15], { species: [1, 5, 12, 20] })"], ['Benefits and risks', 'Use good sources'],
                  ['These tools can help with food and medicine, but they have risks too.', 'Overused weed killers, for example, can select for resistant weeds.', 'To decide what you think, gather facts from reliable sources and weigh the benefits and risks.']),
            quiz('People choosing which dogs to breed is what?', ['selective breeding', 'gene editing', 'cloning'], 'selective breeding', 'Quick check. People choosing which dogs to breed is called what?', 'Selective breeding, also called artificial selection.', fig="Fig.picture(['🐕', '🐩', '🦮'])"),
            outro('Practice genetic technologies in Science Quest 8.'),
        ],
    },
    # ---------- Topic 8: Natural Selection and Change Over Time ----------
    {
        'id': 'launch-t8', 'title': 'Topic 8: Natural Selection and Change Over Time', 'subject': 't8', 'color': 'c2', 'label': 'Topic launch',
        'desc': 'How species change, and how we know.', 'practice': ['t8', 'earlystudy', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦕', 'title': 'Change Over Time', 'sub': 'Topic 8 launch', 'beats': [B('Fish fossils have been found on mountaintops, and whales have tiny hip bones. These are clues to the history of life.')]},
            bullets('In this topic', [
                ('⛵', 'Darwin', 'how it began', 'First, how Darwin and Wallace came to the idea.'),
                ('🦋', 'Natural selection', 'how it works', 'Then, how natural selection works.'),
                ('🐦', 'New species', 'how they form', 'Next, how new species form.'),
                ('🦴', 'Evidence', 'fossils, bones, DNA', 'Finally, the evidence from fossils, bones, and DNA.'),
            ], 'Here is the plan.'),
            image('One question to keep in mind', ["Fig.limbs(['human', 'bat', 'whale'])"], ['Same bones', 'Different jobs'],
                  ['A human arm, a bat wing, and a whale flipper all have the same bones.', 'Why would that be? You will be able to explain it.']),
            outro('Start with the lesson Early study of evolution.'),
        ],
    },
    {
        'id': 'early-evolution', 'title': 'Darwin and Wallace', 'subject': 't8', 'color': 'c2', 'label': 'Early study of evolution',
        'desc': 'The voyage of the Beagle, finches, and how the idea developed.', 'practice': ['t8', 'earlystudy', 0],
        'scenes': [
            {'type': 'title', 'emoji': '⛵', 'title': 'Darwin and Wallace', 'sub': 'How the idea began', 'beats': [B('In 1831, a young Charles Darwin set sail on a ship called the Beagle, on a voyage that would change biology.')]},
            image('Galápagos finches', ["Fig.table([['Finch type', 'Beak depth (mm)', 'Main food'], ['Warbler finch', '5', 'small insects'], ['Medium ground finch', '10', 'medium seeds'], ['Large ground finch', '16', 'large seeds']])"], ['Beak fits food', 'Differ by island'],
                  ['On the Galápagos Islands, finches had different beaks.', 'Each beak suits a different food, which suggests they came from one ancestor and changed.']),
            bullets('Ideas that helped', [
                ('🪨', 'Lyell', 'Earth is old', 'Charles Lyell argued that Earth is very old, which gives time for slow change.'),
                ('🌾', 'Breeders', 'selection works', 'Farmers showed that selection can change traits.'),
                ('📉', 'Malthus', 'not all survive', 'Thomas Malthus showed that more are born than can survive.'),
            ], 'Other ideas helped too.'),
            image('Lamarck or Darwin?', ["Fig.table([['Idea', 'Long neck comes from'], ['Lamarck', 'stretching, then passing it on'], ['Darwin', 'variation and survival']])"], ['Acquired traits are not inherited'],
                  ['Lamarck thought stretching gives a long neck that can be inherited.', 'We now know acquired traits are not passed on through genes, and variation comes first.']),
            quiz('Who else proposed natural selection with Darwin?', ['Wallace', 'Mendel', 'Pasteur'], 'Wallace', 'Quick check. Who proposed natural selection at about the same time as Darwin?', 'Alfred Russel Wallace. Their work was presented together in 1858.', fig="Fig.picture(['⛵', '🐦'])"),
            outro('Practice the early study of evolution in Science Quest 8.'),
        ],
    },
    {
        'id': 'natural-selection', 'title': 'Natural Selection', 'subject': 't8', 'color': 'c2', 'label': 'Natural selection',
        'desc': 'How helpful traits become common, with data to prove it.', 'practice': ['t8', 'natselect', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦋', 'title': 'Natural Selection', 'sub': 'How helpful traits spread', 'beats': [B('Natural selection is simple to say and powerful in action. Let us walk through it.')]},
            image('Four steps', ["Fig.cycle(['variation', 'competition', 'survival', 'reproduction'], 'natural selection')"], ['Individuals vary', 'More are born than survive', 'Helpful traits spread'],
                  ['Individuals in a population vary, and some of the variation is inherited.', 'More are born than can survive.', 'Those with helpful traits survive and reproduce more, so those traits become more common.']),
            image('Peppered moths', ["Fig.trend('Peppered moths near a city', 'Year', 'Percent dark', [1850, 1900, 1950, 2000], { dark: [2, 90, 90, 10] })"], ['Soot darkened bark', 'Clean air reversed it'],
                  ['When soot darkened tree bark, birds found light moths more easily, and dark moths became common.', 'After clean air laws, the pattern reversed.']),
            image('Selection in numbers', ["Fig.trend('Insects resisting a spray', 'Years', 'Percent resistant', [0, 2, 4, 6, 8], { resistant: [1, 5, 25, 60, 90] })"], ['Survivors pass it on'],
                  ['Spraying kills most insects, but the few resistant ones survive and pass on their genes.', 'After a few years, the spray hardly works.']),
            quiz('Did dark moths change color in order to hide?', ['No', 'Yes'], 'No', 'Quick check. Did dark moths change color in order to hide?', 'No. Dark moths were already in the population. They simply survived better.', fig="Fig.picture(['🦋', '🌳'])"),
            outro('Practice natural selection in Science Quest 8.'),
        ],
    },
    {
        'id': 'process-evolution', 'title': 'How New Species Form', 'subject': 't8', 'color': 'c2', 'label': 'The process of evolution',
        'desc': 'Isolation, speciation, gene flow, and drift.', 'practice': ['t8', 'evolprocess', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🐦', 'title': 'How New Species Form', 'sub': 'The process of evolution', 'beats': [B('A species is a group that can breed and have fertile offspring. So how does one species become two?')]},
            image('Speciation', ["Fig.flow(['one population', 'split', 'different changes', 'two species'])"], ['A barrier splits them', 'They change separately', 'They can no longer interbreed'],
                  ['A river, mountain, or sea can split a population.', 'Each group changes on its own, in its own conditions.', 'In time, they can no longer interbreed, and they are separate species.']),
            bullets('Forces of change', [
                ('🧬', 'Mutation', 'new alleles', 'Mutation adds new alleles.'),
                ('🦋', 'Selection', 'helpful traits', 'Selection favors helpful traits.'),
                ('✈️', 'Gene flow', 'moving alleles', 'Gene flow moves alleles between populations.'),
                ('🎲', 'Drift', 'chance', 'Drift changes allele frequency by chance, mostly in small groups.'),
            ], 'Four forces change populations.'),
            image('A bottleneck', ["Fig.trend('Two populations', 'Year', 'Number', [1, 2, 3, 4, 5], { A: [500, 510, 490, 505, 500], B: [500, 480, 20, 60, 200] })"], ['Few survivors', 'Less diversity'],
                  ['A disaster may leave only a few survivors.', 'Much of the gene variety is then lost, even when the numbers recover.']),
            quiz('A horse and donkey have a sterile mule. Are they one species?', ['No', 'Yes'], 'No', 'Quick check. A horse and a donkey have a sterile mule. Are they one species?', 'No. The offspring are not fertile, so they are two species.', fig="Fig.picture(['🐴', '🫏'])"),
            outro('Practice the process of evolution in Science Quest 8.'),
        ],
    },
    {
        'id': 'fossil-record', 'title': 'The Fossil Record', 'subject': 't8', 'color': 'c2', 'label': 'Evidence in the fossil record',
        'desc': 'How fossils form, how rocks are dated, and what the patterns show.', 'practice': ['t8', 'fossils', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦴', 'title': 'The Fossil Record', 'sub': 'Reading the rocks', 'beats': [B('Rock layers are like the pages of a very old book about the history of life.')]},
            image('Rock layers', ["Fig.strata([['Layer 1', '🌿'], ['Layer 2', '🦴'], ['Layer 3', '🐟'], ['Layer 4', '🐚']])"], ['Oldest at the bottom', 'Index fossils match layers'],
                  ['In undisturbed rock, the oldest layers are at the bottom. That is the law of superposition.', 'Fossils that lived for a short time, over wide areas, help match layers in different places.']),
            image('Half-life', ["Fig.trend('Radioactive decay', 'Half-lives', 'Percent left', [0, 1, 2, 3, 4], { parent: [100, 50, 25, 12.5, 6.25] })"], ['Half decays each time', 'Gives actual ages'],
                  ['To find actual ages, scientists use radioactive elements.', 'In each half-life, half of the atoms decay, so the amount left tells the age.']),
            bullets('What the fossils show', [
                ('🔄', 'Change', 'life changes', 'Life has changed over time.'),
                ('💀', 'Extinction', 'many are gone', 'Most species that ever lived are now extinct.'),
                ('🦖', 'Transitions', 'in-between forms', 'And transitional fossils link groups, such as Archaeopteryx.'),
            ], 'Fossils show three big patterns.'),
            quiz('In undisturbed rock, where is the oldest layer?', ['at the bottom', 'at the top', 'in the middle'], 'at the bottom', 'Quick check. In undisturbed rock, where is the oldest layer?', 'At the bottom. Newer layers are laid down on top.', fig="Fig.strata([['Young', ''], ['Middle', ''], ['Old', '']])"),
            outro('Practice the fossil record in Science Quest 8.'),
        ],
    },
    {
        'id': 'other-evidence', 'title': 'Bones, Embryos, and DNA', 'subject': 't8', 'color': 'c2', 'label': 'Other evidence of evolution',
        'desc': 'Homologous structures, embryos, vestigial parts, and DNA.', 'practice': ['t8', 'otherevidence', 0],
        'scenes': [
            {'type': 'title', 'emoji': '🦇', 'title': 'Bones, Embryos, and DNA', 'sub': 'More clues to common ancestry', 'beats': [B('Fossils are not the only evidence. Living things themselves carry clues to their past.')]},
            image('Same bones', ["Fig.limbs(['human', 'bat', 'whale', 'bird'])"], ['Homologous structures', 'Different jobs'],
                  ['These limbs have the same bones in the same order, marked by color.', 'They do different jobs, which points to a shared ancestor.']),
            image('Early embryos', ["Fig.embryos(['fish', 'chick', 'human'])"], ['Tail', 'Pouches at the neck'],
                  ['Early embryos of fish, chicks, and humans all have a tail.', 'They also have pouches at the neck, which develop differently later on.']),
            image('DNA', ["Fig.table([['Animal', 'Shared DNA with humans'], ['Chimpanzee', 'about 98.8%'], ['Gorilla', 'about 98.4%']])"], ['More shared DNA', 'Closer relatives'],
                  ['Comparing DNA shows how closely species are related. The more they share, the closer they are.', 'All of these lines of evidence agree.']),
            quiz('A bird wing and a butterfly wing are what?', ['analogous', 'homologous', 'vestigial'], 'analogous', 'Quick check. A bird wing and a butterfly wing are what kind of structures?', 'Analogous. They do the same job but have different origins.', fig="Fig.picture(['🐦', '🦋'])"),
            outro('Practice other evidence of evolution in Science Quest 8.'),
        ],
    },
]
