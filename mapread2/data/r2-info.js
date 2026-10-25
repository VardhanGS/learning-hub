// MAP Reading 2 — Nonfiction: text features, author's purpose and reasons, steps and connections (all original).
// Standards: NJSLS-ELA 2023, grades 2–3 (RI.TS text features and structure, RI.MF images, RI.PP purpose,
// RI.AA reasons, RI.CT comparing texts, RI.IT connections between steps and events).
(function () {
  const { P, passLevel, shortLevel, genLevel, solo, pageFig, listFig, diagramFig } = RK;
  const G = 'info';

  // ===================== TEXT FEATURES =====================
  const PAGES = [
    { heading: 'Frogs Need Water', icon: '🐸', caption: 'A frog rests on a lily pad.', bold: 'tadpole', means: 'a baby frog that lives in water' },
    { heading: 'Busy Bees', icon: '🐝', caption: 'Bees carry pollen on their legs.', bold: 'hive', means: 'the home where bees live' },
    { heading: 'How Volcanoes Erupt', icon: '🌋', caption: 'Hot lava flows down a volcano.', bold: 'lava', means: 'melted rock that comes out of a volcano' },
    { heading: 'The Moon at Night', icon: '🌙', caption: 'The moon looks bright in the sky.', bold: 'crater', means: 'a round hole on the moon\'s surface' },
    { heading: 'Penguins Stay Warm', icon: '🐧', caption: 'Penguins huddle close together.', bold: 'huddle', means: 'to crowd close together' },
    { heading: 'Seeds Start Small', icon: '🌱', caption: 'A seed sprouts in the soil.', bold: 'sprout', means: 'to begin to grow' },
    { heading: 'Whales Are Mammals', icon: '🐋', caption: 'A whale comes up for air.', bold: 'blowhole', means: 'the hole a whale breathes through' },
    { heading: 'Fire Trucks Help', icon: '🚒', caption: 'Firefighters climb a long ladder.', bold: 'hydrant', means: 'a pipe that gives water to fight fires' },
    { heading: 'Ants Work Together', icon: '🐜', caption: 'Ants carry a leaf back home.', bold: 'colony', means: 'a big group of ants that live together' },
    { heading: 'Rainbows After Rain', icon: '🌈', caption: 'A rainbow shines over a field.', bold: 'prism', means: 'glass that splits light into colors' },
  ];
  const PART = { heading: 'heading', caption: 'caption', bold: 'bold word', picture: 'photograph' };
  const PART_WHY = { heading: 'The heading is the title at the top. It tells what the page is about.', caption: 'A caption is the small sentence under a picture. It tells about the picture.', bold: 'A bold word is printed in dark letters because it is important.', picture: 'A photograph shows what the text is about.' };
  const fb = { base: 158, goal: G, std: 'RI.TS.2.4', tag: 'feature' };
  function partName() {
    const p = U.pick(PAGES), mark = U.pick(Object.keys(PART));
    return solo('What is the part with the question mark called?', PART[mark], Object.keys(PART).filter((k) => k !== mark).map((k) => [PART[k], PART_WHY[k]]), PART_WHY[mark], { ...fb, fig: pageFig({ ...p, mark }), hint: 'Look at where the question mark is on the page.' });
  }
  function headingTells() {
    const p = U.pick(PAGES), others = U.sample(PAGES.filter((x) => x !== p), 3);
    return solo(`Look at the page. What will this page MOSTLY be about?`, p.heading.toLowerCase().replace(/^the /, ''), others.map((o) => [o.heading.toLowerCase().replace(/^the /, ''), 'The heading at the top tells the topic of the page.']), `The heading "${p.heading}" tells the topic.`, { ...fb, base: 162, fig: pageFig(p), hint: 'Read the heading at the top.' });
  }
  function captionTells() {
    const p = U.pick(PAGES), others = U.sample(PAGES.filter((x) => x !== p), 3);
    return solo('Which sentence is the caption on this page?', p.caption, others.map((o) => [o.caption, 'Find the small sentence right under the picture.']), 'The caption is the sentence under the picture.', { ...fb, base: 160, fig: pageFig(p), hint: 'A caption sits right under a picture.' });
  }
  function boldWhy() {
    const p = U.pick(PAGES);
    return solo(`Why is the word "${p.bold}" printed in bold?`, 'It is an important word you can look up in the glossary.', [['It is the title of the whole book, printed on the cover.', 'The title is at the top. A bold word is inside the text.'], 'It is the name of the person who wrote the book.', ['It is spelled in a special way that is wrong.', 'Bold print shows a word is important.']], 'Bold words are important words, and a glossary tells what they mean.', { ...fb, base: 166, fig: pageFig({ ...p, mark: 'bold' }), hint: 'Authors put important words in dark print.' });
  }
  // Table of contents and glossary.
  const BOOKS = [
    { title: 'All About Sharks', ch: [['Sharks Are Fish', 4], ['Sharp Teeth', 8], ['What Sharks Eat', 12], ['Baby Sharks', 16]], q: [['what sharks eat', 'What Sharks Eat'], ['shark pups', 'Baby Sharks'], ['shark teeth', 'Sharp Teeth']] },
    { title: 'Life on a Farm', ch: [['Morning Chores', 3], ['Cows and Milk', 7], ['Planting Corn', 11], ['Harvest Time', 15]], q: [['how farmers get milk', 'Cows and Milk'], ['picking crops in the fall', 'Harvest Time'], ['jobs farmers do early in the day', 'Morning Chores']] },
    { title: 'Our Solar System', ch: [['The Sun', 2], ['The Planets', 6], ['The Moon', 10], ['Stars Far Away', 14]], q: [['what makes the moon glow', 'The Moon'], ['Mars and Jupiter', 'The Planets'], ['the star at the center', 'The Sun']] },
    { title: 'Amazing Insects', ch: [['Six Legs', 5], ['Wings and Flight', 9], ['Insect Homes', 13], ['Helpful Bugs', 17]], q: [['how a beetle flies', 'Wings and Flight'], ['where ants live', 'Insect Homes'], ['bugs that help gardens', 'Helpful Bugs']] },
  ];
  function tocPage() {
    const b = U.pick(BOOKS), [i] = U.sample([0, 1, 2, 3], 1), [name, page] = b.ch[i];
    return solo(`Look at the table of contents. On what page does "${name}" begin?`, String(page), b.ch.filter((_, k) => k !== i).map(([n, pg]) => [String(pg), `Page ${pg} is where "${n}" begins.`]), `"${name}" begins on page ${page}.`, { ...fb, base: 170, std: 'RI.TS.2.4', fig: listFig(`${b.title}: Contents`, b.ch), hint: 'Find the chapter name, then follow the dots to the page number.' });
  }
  function tocWhich() {
    const b = U.pick(BOOKS), [topic, ch] = U.pick(b.q);
    return solo(`Which chapter would MOST LIKELY tell about ${topic}?`, ch, b.ch.map(([n]) => n).filter((n) => n !== ch).map((n) => [n, 'Think about which chapter name matches the topic.']), `"${ch}" is the chapter that matches ${topic}.`, { ...fb, base: 176, tag: 'feature', fig: listFig(`${b.title}: Contents`, b.ch), hint: 'Match the topic to a chapter name.' });
  }
  function glossaryWord() {
    const ws = U.sample(PAGES, 4), w = ws[0];
    return solo(`Look at the glossary. What does "${w.bold}" mean?`, w.means, ws.slice(1).map((x) => [x.means, `That is what "${x.bold}" means.`]), `The glossary says "${w.bold}" means ${w.means}.`, { ...fb, base: 172, fig: listFig('Glossary', [...ws].sort((a, b) => a.bold.localeCompare(b.bold)).map((x) => [x.bold, x.means]), false), hint: 'Find the word in the list. The meaning is under it.' });
  }
  function whereLook() {
    const [need, a, why] = U.pick([['find what a word means', 'the glossary', 'A glossary lists important words and their meanings.'], ['find which page tells about a topic', 'the table of contents', 'The table of contents lists chapters and their pages.'], ['learn what a picture shows', 'the caption', 'A caption explains a picture.'], ['know what a page is mostly about', 'the heading', 'The heading tells the topic of the page.']]);
    return solo(`Where would you look to ${need}?`, a, ['the glossary', 'the table of contents', 'the caption', 'the heading'].filter((x) => x !== a).map((x) => [x, why]), why, { ...fb, base: 168, fig: pageFig(U.pick(PAGES)), hint: 'Think about the job of each text feature.' });
  }
  // Diagrams with short texts (Grade 3).
  const DIAGRAMS = [
    { passage: P('Parts of a Plant', 'Article', `A plant has parts that each do a job. The roots grow under the ground. They hold the plant in place and take in water.

The stem carries water from the roots up to the leaves. The leaves use sunlight to make food for the plant. The flower makes seeds, and the seeds can grow into new plants.`, [], '', diagramFig('Parts of a Plant', '🌻', ['flower', 'leaf', 'stem', 'roots'])),
      qs: [
        ['mc', 'Look at the diagram. Which part of the plant is under the ground?', 'The roots', [['The stem', 'The stem is above the ground.'], 'The leaf', 'The flower'], 'The roots grow under the ground.', 'feature'],
        ['mc', 'What is the job of the stem?', 'To carry water up to the leaves', [['To make seeds for new plants', 'That is the job of the flower.'], 'To hold the plant in place', 'To make food from sunlight'], 'The text says the stem carries water from the roots to the leaves.', 'detail'],
        ['ev', 'Which sentence tells how new plants can grow?', 'The flower makes seeds, and the seeds can grow into new plants.', 'Seeds from the flower grow into new plants.', 'evidence'],
        ['mc', 'How does the diagram help the reader?', 'It shows where each part is on the plant.', [['It tells how tall each kind of plant can grow.', 'A diagram with labels shows the parts and where they are.'], 'It tells a story about a plant.', 'It shows how to plant seeds.'], 'The labels show where the flower, leaf, stem, and roots are.', 'feature'],
        ['mc', 'What do the leaves need to make food?', 'Sunlight', ['Seeds', ['Soil', 'The text says leaves use sunlight.'], 'Flowers'], 'The leaves use sunlight to make food.', 'detail'],
        ['mc', 'What is this text MOSTLY about?', 'The jobs of the parts of a plant', [['How to water a garden the right way', 'The text tells what each part does.'], 'Why some flowers are prettier than others', 'Where seeds come from'], 'Each sentence tells what a part of the plant does.', 'main'],
      ] },
    { passage: P('A Bee\'s Body', 'Article', `A honeybee is small, but its body is built for work. Like all insects, a bee has six legs and three body parts: the head, the thorax, and the abdomen.

The head has two antennae. Bees use them to smell flowers. Four wings are attached to the thorax, the middle part of the body. The wings beat so fast that they make a buzzing sound. A bee's back legs have tiny baskets that carry pollen back to the hive.`, [], '', diagramFig('A Honeybee', '🐝', ['antennae', 'wings', 'head', 'legs'])),
      qs: [
        ['mc', 'How many legs does a bee have?', 'Six', ['Four', ['Eight', 'Spiders have eight legs. Insects have six.'], 'Two'], 'Like all insects, a bee has six legs.', 'detail'],
        ['mc', 'What do bees use their antennae for?', 'To smell flowers', [['To fly', 'The wings are for flying.'], 'To carry pollen', 'To make buzzing sounds'], 'The text says bees use antennae to smell flowers.', 'detail'],
        ['mc', 'What is the thorax?', 'The middle part of the body', [['The head', 'The text says the thorax is the middle part.'], 'A kind of wing that helps bees fly', 'The home where the bees live'], 'The wings attach to the thorax, "the middle part of the body."', 'vocab'],
        ['ev', 'Which sentence explains why bees buzz?', 'The wings beat so fast that they make a buzzing sound.', 'The fast wings make the buzzing sound.', 'evidence'],
        ['mc', 'Which part of the diagram would help you find the antennae?', 'The label at the top of the head', [['The caption under the title', 'Diagrams use labels to point to parts.'], 'The picture of the hive', 'The page number at the bottom'], 'A label points to where the antennae are.', 'feature'],
        ['mc', 'Why do bees have baskets on their legs?', 'To carry pollen back to the hive', [['To smell flowers', 'That is what antennae do.'], 'To help them fly faster to the hive', 'To keep warm'], 'The tiny baskets carry pollen back to the hive.', 'detail'],
      ] },
  ];

  // ===================== AUTHOR'S PURPOSE AND REASONS =====================
  const SP = (title, text, icons, q, a, ws, why, tag = 'purpose', dif = 0) => ({ passage: P(title, 'Short text', text, icons), dif, qs: [['mc', q, a, ws, why, tag]] });
  const PURPOSE = [
    SP('Brushing Your Teeth', 'First, put a small dot of toothpaste on your brush. Next, brush every tooth for two minutes. Then rinse your mouth with water.', ['🪥'], "What is the author's main purpose?", 'To explain how to brush your teeth', [['To tell a funny story about teeth', 'The text gives steps, not a story.'], 'To convince you to buy toothpaste', 'To describe what a dentist\'s office looks like'], 'The text gives steps: first, next, then.'),
    SP('The Silly Snowman', 'Frosty the snowman wanted a summer vacation. He packed his scarf and a bag of ice cubes. "Beach, here I come!" he shouted, already starting to drip.', ['☃️', '🏖️'], "Why did the author MOST LIKELY write this?", 'To entertain readers with a funny story', [['To teach facts about how snow is made', 'A snowman going on vacation is make-believe.'], 'To explain how to build a snowman', 'To tell readers to go to the beach'], 'A talking snowman packing for the beach is a funny, made-up story.'),
    SP('Come to the Book Fair!', 'The school book fair is the best event of the year! There are hundreds of books to choose from. Every book you buy helps our library get new books. Don\'t miss it!', ['📚', '🎉'], "What does the author want readers to do?", 'Go to the book fair', [['Read only library books', 'The author says "Don\'t miss it!"'], 'Write a book', 'Clean the library'], 'The author is trying to get readers to come to the book fair.'),
    SP('Why Owls Hunt at Night', 'Owls have large eyes that see well in the dark. Their soft feathers let them fly without a sound. These tools help owls catch mice at night.', ['🦉', '🌙'], "What question does this text answer?", 'How are owls able to hunt at night?', [['What do owls eat for breakfast?', 'The text tells how owls hunt in the dark.'], 'Why are most owls brown and white?', 'Where do owls build nests?'], 'The text explains the tools owls use to hunt at night.'),
    SP('A Trip to the Aquarium', 'Our class visited the aquarium on Tuesday. We saw a shark swim right over our heads in a glass tunnel. My favorite part was touching a starfish. It felt bumpy!', ['🦈', '⭐'], "What is the author's main purpose?", 'To tell about a class trip to the aquarium', [['To explain how sharks breathe', 'The author tells what the class did and saw.'], 'To ask readers to buy a starfish', 'To give rules for visiting the aquarium safely'], 'The author describes what happened on the trip.'),
    SP('Keep Our Park Clean', 'Our park is full of trash. Trash can hurt birds and squirrels. It also makes the park look messy. Everyone should throw trash in the bins!', ['🗑️', '🌳'], "What does the author want readers to believe?", 'People should keep the park clean.', [['Squirrels make the park messy.', 'The author says trash hurts animals and asks people to use the bins.'], 'The park needs more swings and slides.', 'Birds and squirrels like to eat trash.'], 'The author gives reasons and asks everyone to use the trash bins.'),
    SP('How Rain Forms', 'The sun warms water in lakes and oceans. The water rises into the air as tiny drops. The drops join together to form clouds. When the drops get heavy, they fall as rain.', ['☀️', '☁️', '🌧️'], "What is the author's main purpose?", 'To explain how rain forms', [['To tell a story about a cloud', 'The text gives science facts in order.'], 'To persuade people to save water', 'To describe a rainy day at school'], 'Each sentence explains a step in how rain forms.'),
    SP('The Best Pet', 'Dogs are the best pets. They can learn tricks. They love to play outside. And a dog will always be happy to see you when you come home!', ['🐕'], 'What is the author\'s opinion?', 'Dogs are the best pets.', [['Dogs can learn tricks.', 'That is a reason the author gives, not the opinion.'], 'Cats are better than dogs.', 'Pets need food and water.'], 'The first sentence tells the author\'s opinion; the others give reasons.', 'argument', 2),
  ];
  const REASONS = [
    { passage: P('Our School Needs a Garden', 'Opinion', `Our school should plant a garden. A garden would help us in many ways.

First, a garden would help us learn. We could watch seeds sprout and see how plants grow. We could measure our plants each week in math class.

Second, a garden would give us healthy food. We could grow carrots, lettuce, and beans. Then we could taste them at lunch.

Last, a garden would make our school beautiful. Flowers would bring butterflies and bees.

Let's ask our principal to help us plant a garden this spring!`, ['🌻', '🥕', '🏫'], 'A school garden'),
      qs: [
        ['mc', "What is the author's main point?", 'The school should plant a garden.', [['Gardens need lots of water.', 'The first sentence tells the author\'s point.'], 'Carrots are the healthiest food to eat.', 'Bees are important for every garden.'], 'The author says, "Our school should plant a garden."', 'argument'],
        ['mc', 'Which reason does the author give FIRST?', 'A garden would help students learn.', [['A garden would give healthy food.', 'That is the second reason.'], 'A garden would make the school beautiful.', 'A garden would bring the principal outside.'], '"First, a garden would help us learn."', 'sequence'],
        ['ev', 'Which sentence supports the reason that a garden would help students learn?', 'We could watch seeds sprout and see how plants grow.', 'Watching seeds grow is a way to learn.', 'evidence'],
        ['multi', 'Which TWO details support the reason about healthy food?', ['We could grow carrots, lettuce, and beans.', 'Then we could taste them at lunch.'], ['Flowers would bring butterflies and bees.', 'We could measure our plants each week in math class.'], 'Growing vegetables and tasting them at lunch are about healthy food.', 'argument'],
        ['mc', 'Why does the author use the words "First," "Second," and "Last"?', 'To show the order of the reasons', [['To tell when to plant seeds', 'These words list the author\'s reasons.'], 'To count the vegetables in the garden', 'To show the steps of a recipe'], 'The words help readers follow each reason in order.', 'structure'],
        ['mc', 'What does the author want readers to do?', 'Ask the principal to help plant a garden', [['Buy flowers at a store', 'Read the last sentence.'], 'Eat more carrots and lettuce at lunch', 'Count the butterflies in the garden'], 'The author ends, "Let\'s ask our principal to help us plant a garden."', 'purpose'],
      ] },
    { passage: P('Recess Should Be Longer', 'Opinion', `Recess at our school lasts only fifteen minutes. I think it should last thirty minutes.

Kids need time to move their bodies. Running and climbing make our muscles and hearts strong. After we play, it is easier to sit still and listen in class.

Recess also helps us make friends. On the playground, we learn to take turns and solve problems together.

Some people say a longer recess means less time for learning. But playing outside is learning, too! Thirty minutes of recess would help everyone have a better day.`, ['🛝', '⏱️', '🧒'], 'Time to play'),
      qs: [
        ['mc', 'How long does the author want recess to be?', 'Thirty minutes', [['Fifteen minutes', 'Fifteen minutes is how long recess is now.'], 'One hour', 'Ten minutes'], 'The author says, "I think it should last thirty minutes."', 'detail'],
        ['mc', 'Which reason does the author give for a longer recess?', 'It helps kids listen better in class.', [['It gives teachers a longer lunch.', 'Look for reasons about kids.'], 'The playground is too big to use in fifteen minutes.', 'Kids do not like sitting in class all day.'], 'The author says after playing, "it is easier to sit still and listen."', 'argument'],
        ['ev', 'Which sentence tells how recess helps kids make friends?', 'On the playground, we learn to take turns and solve problems together.', 'Taking turns and solving problems together helps kids become friends.', 'evidence'],
        ['mc', 'What do "some people" say about a longer recess?', 'It means less time for learning.', [['It is too cold outside.', 'Read the last paragraph.'], 'Kids get too tired to learn after recess.', 'It helps kids make new friends.'], 'Some people say a longer recess means less time for learning.', 'detail'],
        ['mc', 'How does the author answer what "some people" say?', 'Playing outside is learning, too.', [['Learning at school is not very important.', 'The author does not agree that playing is not learning.'], 'Recess should be shorter.', 'Kids should do their learning at home.'], 'The author says, "But playing outside is learning, too!"', 'argument'],
        ['mc', 'Is "Recess should last thirty minutes" a fact or an opinion?', 'An opinion, because it tells what the author thinks', [['A fact, because recess is real', 'A fact can be proven. This tells what someone believes.'], 'A fact, because the author is a kid', 'An opinion, because it is about how long recess is'], 'It is what the author thinks should happen, so it is an opinion.', 'argument'],
      ] },
  ];
  const PAIRS = [
    { passage: P('Two Texts About Honey', 'Two texts', `Text 1: How Bees Make Honey
Bees visit flowers and sip a sweet liquid called nectar. They carry the nectar back to the hive. There, worker bees fan it with their wings until it becomes thick. Then they store the honey in wax cells.

Text 2: A Visit to Grandpa's Hives
Grandpa keeps bees behind his barn. Last summer, I wore a white suit with a net over my face. Grandpa lifted a frame dripping with honey. He said each bee makes only a tiny bit of honey in its whole life. We tasted it on warm toast. It was the sweetest thing I ever ate!`, ['🐝', '🍯', '🍞'], 'Honey from the hive'),
      qs: [
        ['mc', 'What is the topic of BOTH texts?', 'Honey made by bees', [['Grandpa\'s barn and his farm', 'Only Text 2 is about Grandpa.'], 'How to make toast', 'Flowers that grow in the summer'], 'Both texts are about honey and bees.', 'compare'],
        ['mc', 'Text 1 tells HOW bees make honey. What does Text 2 mostly tell?', 'What it was like to visit beehives', [['Steps for making honey', 'Text 2 tells the writer\'s own experience.'], 'Why bees sting people who get close', 'How to build a barn for beehives'], 'Text 2 is about the writer\'s visit to Grandpa\'s hives.', 'compare'],
        ['ev', 'Which sentence from Text 1 tells what bees do with the nectar in the hive?', 'There, worker bees fan it with their wings until it becomes thick.', 'Worker bees fan the nectar until it becomes thick honey.', 'evidence'],
        ['mc', 'What fact is in Text 2 but NOT in Text 1?', 'Each bee makes only a tiny bit of honey in its life.', [['Bees visit flowers to sip sweet nectar.', 'Text 1 says bees visit flowers.'], 'Honey is stored in wax cells in the hive.', 'Bees use their wings to fan the nectar.'], 'Only Text 2 says each bee makes a tiny bit of honey.', 'compare'],
        ['mc', 'Why did the writer of Text 2 wear a white suit with a net?', 'To stay safe from bee stings', [['To keep warm', 'Think about why someone near bees would cover their face.'], 'To look like a bee so they would not notice', 'To catch the bees'], 'Beekeepers cover up so the bees do not sting them.', 'inference'],
        ['mc', 'How are the two texts DIFFERENT?', 'Text 1 gives facts, and Text 2 tells a personal story.', [['Text 1 is a poem, and Text 2 is a letter.', 'Both are written in sentences and paragraphs.'], 'Text 1 is about ants, and Text 2 is about bees.', 'They are not different in any way at all.'], 'Text 1 explains facts; Text 2 tells about "I" and Grandpa.', 'compare'],
      ] },
    { passage: P('Two Texts About the Snow', 'Two texts', `Text 1: Snowflakes
Snowflakes form high in cold clouds. A tiny drop of water freezes around a speck of dust. As it falls, more water freezes onto it, making six arms. No two snowflakes grow in exactly the same way.

Text 2: The Snow Day
When I woke up, the world was white. School was closed! My sister and I rolled three big balls of snow. We stacked them into a snowman taller than me. Later, I caught a snowflake on my black mitten. It had six tiny arms, just like the ones in my science book.`, ['❄️', '☃️', '🧤'], 'A snowy day'),
      qs: [
        ['mc', 'How many arms does a snowflake have, according to BOTH texts?', 'Six', ['Four', ['Eight', 'Both texts say six arms.'], 'Three'], 'Text 1 says snowflakes have six arms, and Text 2 says the same.', 'compare'],
        ['mc', 'What does Text 1 explain?', 'How snowflakes form', [['How to build a snowman', 'That is in Text 2.'], 'Why school closes', 'What mittens are made of'], 'Text 1 tells how a snowflake forms in a cloud.', 'main'],
        ['ev', 'Which sentence from Text 2 connects to the facts in Text 1?', 'It had six tiny arms, just like the ones in my science book.', 'The writer sees a six-armed snowflake, like the facts in Text 1.', 'evidence'],
        ['mc', 'What does a snowflake form around?', 'A speck of dust', [['A raindrop', 'Water freezes around something tiny.'], 'A black mitten', 'A piece of a cloud'], 'Text 1 says a drop freezes around a speck of dust.', 'detail'],
        ['mc', 'Why did the writer of Text 2 catch the snowflake on a BLACK mitten?', 'The white flake was easy to see on black.', [['Black mittens are warmer.', 'Think about how a white flake looks on a dark color.'], 'It was the only mitten the writer had.', 'Snow sticks better to black things.'], 'A white snowflake stands out on a black mitten.', 'inference'],
        ['mc', 'How are the texts ALIKE?', 'Both are about snow.', [['Both tell how to build a snowman.', 'Only Text 2 has a snowman.'], 'Both are stories about a sister.', 'Both explain how clouds form.'], 'Both texts are about snow and snowflakes.', 'compare'],
      ] },
  ];

  // ===================== STEPS AND CONNECTIONS =====================
  const STEPS = [
    [ // Grade 2 Starter: how-to texts
      { passage: P('How to Plant a Bean Seed', 'How-to', `You will need: a cup, some soil, a bean seed, and water.

First, fill the cup with soil almost to the top. Next, push your finger into the soil to make a small hole. Then, drop the bean seed into the hole and cover it with soil.

After that, pour in a little water. Do not pour too much, or the seed will rot. Finally, set the cup in a sunny window. In about a week, a green sprout will poke out of the soil!`, ['🫘', '🪴', '☀️'], 'Growing a bean'),
        qs: [
          ['mc', 'What do you do FIRST?', 'Fill the cup with soil.', [['Drop the bean seed in the hole.', 'That comes later.'], 'Pour in some water.', 'Set the cup in a window.'], 'The first step is to fill the cup with soil.', 'sequence'],
          ['mc', 'Why should you NOT pour too much water?', 'The seed will rot.', [['The cup will break.', 'Read the sentence after "pour in a little water."'], 'The sprout will grow too fast.', 'The soil will turn green.'], 'The text says, "or the seed will rot."', 'detail'],
          ['order', 'Put the steps in order.', ['Fill the cup with soil.', 'Make a small hole.', 'Drop in the seed and cover it.', 'Pour in a little water.'], 'The time words first, next, then, and after that show the order.', 'sequence'],
          ['mc', 'What does the list at the top tell you?', 'The things you need before you start', [['The steps to follow in order', 'The steps come after the list.'], 'How tall the plant will grow', 'Where to buy the seeds and soil'], '"You will need" lists the supplies.', 'feature'],
          ['ev', 'Which sentence tells what will happen in about a week?', 'In about a week, a green sprout will poke out of the soil!', 'After a week, a sprout comes out.', 'evidence'],
          ['mc', 'Why should the cup go in a sunny window?', 'Plants need sunlight to grow.', [['Sunlight keeps the cup clean.', 'Think about what plants need.'], 'The window is the only place for cups.', 'Sun makes the soil dry.'], 'Seeds need sunlight to grow into plants.', 'inference'],
        ] },
      { passage: P('How to Make a Paper Boat', 'How-to', `A paper boat is easy to make, and it really floats!

Start with a rectangle of paper. Fold it in half from top to bottom. Next, fold the two top corners down to the middle so they make a triangle. Then fold the bottom strips up on both sides.

Now gently open the bottom and pull the sides apart. Press it flat into a square. Pull the two top points away from each other, and your boat pops open!

Set it in a sink or a puddle. If you used thick paper, it will float longer.`, ['⛵', '📄', '💧'], 'A paper boat'),
        qs: [
          ['mc', 'What kind of paper do you start with?', 'A rectangle of paper', [['A square of paper', 'The paper becomes a square later.'], 'A round paper plate', 'A big circle of paper'], 'The text says, "Start with a rectangle of paper."', 'detail'],
          ['mc', 'What shape do the folded corners make?', 'A triangle', ['A circle', ['A square', 'Read the step about the top corners.'], 'A star'], 'The corners fold down "so they make a triangle."', 'detail'],
          ['mc', 'What happens when you pull the two top points apart?', 'The boat pops open.', [['The boat sinks.', 'This is the last folding step.'], 'The paper tears.', 'It turns into a hat.'], '"Your boat pops open!"', 'sequence'],
          ['ev', 'Which sentence tells how to make the boat float longer?', 'If you used thick paper, it will float longer.', 'Thick paper helps the boat float longer.', 'evidence'],
          ['mc', 'What does the word "gently" tell you about how to open the bottom?', 'Do it softly and carefully.', [['Do it as fast as you can.', 'Gently means without pulling hard.'], 'Use scissors to cut it open.', 'Ask a grown-up to do it.'], 'Gently means in a soft, careful way, so the paper does not tear.', 'vocab'],
          ['mc', 'Why did the author write this text?', 'To explain how to make a paper boat', [['To tell a story about sailing', 'The text gives steps to follow.'], 'To sell colorful paper to readers', 'To describe a real ship on the ocean'], 'The text gives the steps for making a paper boat.', 'purpose'],
        ] },
    ],
    [ // Grade 2 Star: cycles and events in order
      { passage: P('From Egg to Frog', 'Article', `A frog's life begins in a pond. A mother frog lays hundreds of tiny eggs in the water. The eggs are covered in clear jelly that keeps them safe.

After about a week, tadpoles hatch from the eggs. A tadpole looks like a little fish. It has a tail for swimming and breathes underwater.

As the tadpole grows, it changes. First, back legs appear. Then front legs grow, too. Its tail gets shorter and shorter.

After about twelve weeks, the tadpole has become a young frog. It hops out of the pond and breathes air. One day it will lay eggs of its own, and the cycle will start again.`, ['🥚', '🐸', '🪷'], 'A frog\'s life cycle'),
        qs: [
          ['mc', 'Where does a frog\'s life begin?', 'In a pond', ['In a nest', 'In a tree', ['In the grass', 'The first sentence tells where.']], 'The text says, "A frog\'s life begins in a pond."', 'detail'],
          ['mc', 'What keeps the eggs safe?', 'Clear jelly', [['The mother frog sits on them.', 'Read the sentence about the jelly.'], 'A hard shell', 'The tadpoles'], 'The eggs are covered in clear jelly that keeps them safe.', 'detail'],
          ['order', 'Put the stages of a frog\'s life in order.', ['eggs', 'tadpole', 'tadpole with legs', 'young frog'], 'The frog grows from egg to tadpole, then grows legs, then becomes a frog.', 'sequence'],
          ['mc', 'What grows FIRST as the tadpole changes?', 'Back legs', [['Front legs', 'Front legs grow after the back legs.'], 'A longer tail', 'Wings'], '"First, back legs appear."', 'sequence'],
          ['ev', 'Which sentence explains why the frog\'s life is called a cycle?', 'One day it will lay eggs of its own, and the cycle will start again.', 'The frog lays eggs, so the stages start over: that is a cycle.', 'evidence'],
          ['mc', 'How is a tadpole different from a grown frog?', 'A tadpole breathes underwater and has a tail.', [['A tadpole can hop on land.', 'A young frog hops out of the pond.'], 'A tadpole lays hundreds of eggs.', 'A tadpole has four long legs for hopping.'], 'Tadpoles have tails and breathe underwater; frogs breathe air.', 'compare'],
        ] },
      { passage: P('How a Letter Travels', 'Article', `Have you ever mailed a letter? It takes a long trip!

First, you write the address on the envelope and add a stamp. Then you drop the letter in a mailbox. A mail carrier picks it up and brings it to the post office.

At the post office, machines read the address and sort the letters by town. Trucks and sometimes airplanes carry the letters to a post office near the person you wrote to.

Last, a mail carrier there puts the letter in the right mailbox. In just a few days, your letter has traveled across the country!`, ['✉️', '🚚', '✈️'], 'A letter\'s trip'),
        qs: [
          ['mc', 'What do you do right after you add a stamp?', 'Drop the letter in a mailbox.', [['Sort the letters by town.', 'Machines do that at the post office.'], 'Write a reply to the letter.', 'Drive the letter to the post office.'], '"Then you drop the letter in a mailbox."', 'sequence'],
          ['mc', 'What do the machines at the post office do?', 'Read the address and sort the letters', [['Write the letters for people', 'Machines read and sort.'], 'Deliver letters to houses', 'Make new stamps for letters'], 'The machines read the address and sort letters by town.', 'detail'],
          ['order', 'Put the letter\'s trip in order.', ['You drop it in a mailbox.', 'Machines sort it.', 'A truck or plane carries it.', 'A mail carrier delivers it.'], 'This is the order of the letter\'s trip.', 'sequence'],
          ['ev', 'Which sentence tells how letters get to faraway places?', 'Trucks and sometimes airplanes carry the letters to a post office near the person you wrote to.', 'Trucks and airplanes carry letters long distances.', 'evidence'],
          ['mc', 'Why does the address need to be on the envelope?', 'So the letter can be sorted and delivered to the right place', [['So the letter looks nice', 'The machines read the address to sort the letters.'], 'So the stamp will stick to the envelope', 'So the mailbox will open when the letter arrives'], 'Machines read the address to send the letter to the right town.', 'inference'],
          ['mc', 'What is the text MOSTLY about?', 'The steps a letter goes through to be delivered', [['How to write a friendly letter', 'The text follows a letter from the mailbox to the house.'], 'The history of stamps in the United States', 'Why mail carriers wear uniforms'], 'The text tells each step of a letter\'s trip.', 'main'],
        ] },
    ],
    [ // Grade 3 Challenge: cause and effect, problem and solution
      { passage: P('Why Beavers Build Dams', 'Article', `Beavers are nature's builders. With their strong front teeth, they can cut down a small tree in just a few minutes.

Beavers build dams across streams using branches, rocks, and mud. The dam blocks the water, so a deep pond forms behind it. In the middle of the pond, beavers build a lodge, which is their home.

The deep water keeps beavers safe. Wolves and bears cannot easily reach the lodge, because its doors are underwater. Beavers can swim in and out, but their enemies cannot.

Beaver ponds help other animals, too. Fish, frogs, and ducks find homes in the still water. Because of this, scientists call beavers "keystone animals." Without them, many other living things would lose their homes.`, ['🦫', '🪵', '🦆'], 'A beaver dam'),
        qs: [
          ['mc', 'What happens because of a beaver dam?', 'A deep pond forms behind it.', [['The stream flows faster.', 'The dam blocks the water.'], 'The trees near the stream grow taller.', 'The beavers move away to a new stream.'], 'The dam blocks the water, "so a deep pond forms behind it."', 'structure'],
          ['mc', 'Why are wolves and bears unable to reach the lodge easily?', 'The doors of the lodge are underwater.', [['The lodge is up in a tree.', 'Read the third paragraph.'], 'Beavers chase them away with their sharp teeth.', 'Wolves and bears do not like water.'], 'The text says the lodge doors are underwater.', 'detail'],
          ['ev', 'Which sentence explains how beaver ponds help other animals?', 'Fish, frogs, and ducks find homes in the still water.', 'Other animals live in the beaver pond.', 'evidence'],
          ['mc', 'What does "keystone animals" mean in this text?', 'Animals that many other living things depend on', [['Animals that build with stones', 'Read the sentence after it: without them, others would lose their homes.'], 'Animals that live alone, far from others', 'Animals that only live near big stones'], 'Without beavers, many other living things would lose their homes.', 'vocab'],
          ['mc', 'How is this text MOSTLY organized?', 'It explains causes and effects.', [['It tells a story in time order.', 'The text explains what happens because of beaver dams.'], 'It compares two animals.', 'It gives steps to build a dam.'], 'The text tells what dams cause: ponds, safety, and homes for others.', 'structure'],
          ['multi', 'Which TWO things do beavers use to build dams?', ['branches', 'mud'], ['sand', 'leaves', 'shells'], 'The text says branches, rocks, and mud.', 'detail'],
        ] },
      { passage: P('The Town That Saved Its Bees', 'Article', `A few years ago, the farmers in Clover Valley noticed a problem. Their apple trees were making fewer apples. They soon found out why: there were fewer bees. Apple blossoms need bees to carry pollen from flower to flower. Without enough bees, fewer apples grow.

The town decided to help. Families planted wildflowers in their yards. The school turned an empty lot into a meadow. Farmers stopped spraying chemicals that harm bees.

It took time, but the plan worked. By the third spring, buzzing filled the orchards again. That fall, the farmers picked more apples than they had in ten years. Now the town holds a "Bee Day" festival every June to remember how working together solved a big problem.`, ['🐝', '🍎', '🌼'], 'Bees in the orchard'),
        qs: [
          ['mc', 'What problem did the farmers notice?', 'Their apple trees were making fewer apples.', [['Their trees were too tall to pick the apples.', 'Read the first paragraph.'], 'There were too many bees.', 'The town had no school for the farmers\' children.'], 'The farmers noticed fewer apples on the trees.', 'detail'],
          ['mc', 'What was the CAUSE of the problem?', 'There were fewer bees.', [['It rained too much.', 'The text says "They soon found out why."'], 'The farmers planted wildflowers.', 'The apples were picked too early.'], 'Fewer bees meant less pollen was carried, so fewer apples grew.', 'structure'],
          ['multi', 'Which TWO actions were part of the town\'s solution?', ['Families planted wildflowers.', 'Farmers stopped spraying chemicals.'], ['The town bought new apple trees.', 'The school closed for a week.', 'Farmers moved their bees away.'], 'The town planted flowers and stopped using harmful chemicals.', 'structure'],
          ['ev', 'Which sentence shows that the solution worked?', 'That fall, the farmers picked more apples than they had in ten years.', 'More apples showed that the bees had come back.', 'evidence'],
          ['mc', 'Why does the town hold "Bee Day" every June?', 'To remember how working together solved a problem', [['To sell honey from the town\'s bees', 'Read the last sentence.'], 'To count the bees in every orchard', 'To start the apple harvest'], 'The festival remembers how the town worked together.', 'detail'],
          ['mc', 'How is this text organized?', 'Problem and solution', [['Steps in a how-to', 'The text tells a problem and how the town fixed it.'], 'A list of facts about apples', 'A comparison of two towns'], 'First the problem (fewer apples), then the solution (helping bees).', 'structure'],
        ] },
    ],
  ];

  const allOf = (fns, n = 40) => () => fns.flatMap((f) => [...Array(Math.ceil(n / fns.length))].map(() => f()));
  READ_SKILLS.push(
    { goal: G, id: 'features', name: 'Text features', icon: '🗂️', levels: [
      genLevel('Parts of a page', 'RI.TS.2.4', 'Headings, captions, pictures, and bold words.', [partName, partName, headingTells, captionTells, boldWhy], allOf([partName, headingTells, captionTells, boldWhy])),
      genLevel('Contents and glossary', 'RI.TS.2.4', 'Find facts fast.', [tocPage, tocWhich, glossaryWord, whereLook], allOf([tocPage, tocWhich, glossaryWord, whereLook])),
      passLevel('Diagrams and labels', 'RI.MF.2.6 · RI.MF.3.6', 'Pictures that teach.', DIAGRAMS, G, 182),
    ] },
    { goal: G, id: 'purpose', name: "Author's purpose & reasons", icon: '✍️', passage: true, levels: [
      shortLevel('Why did the author write it?', 'RI.PP.2.5', 'Explain, describe, persuade, or entertain.', PURPOSE, G, 166),
      passLevel('Points and reasons', 'RI.AA.2.7', 'How reasons support a point.', REASONS, G, 176),
      passLevel('Two texts, one topic', 'RI.CT.2.8 · RI.CT.3.8', 'Alike and different.', PAIRS, G, 188),
    ] },
    { goal: G, id: 'steps', name: 'Steps & connections', icon: '🔗', passage: true, levels: [
      passLevel('How-to steps', 'RI.IT.2.3', 'Follow the steps in order.', STEPS[0], G, 162),
      passLevel('Cycles and journeys', 'RI.IT.2.3 · RI.TS.2.4', 'How one step leads to the next.', STEPS[1], G, 174),
      passLevel('Causes, effects, and solutions', 'RI.IT.3.3 · RI.TS.3.4', 'Why things happen.', STEPS[2], G, 188),
    ] },
  );
})();
