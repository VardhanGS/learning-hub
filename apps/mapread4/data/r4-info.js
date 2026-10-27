// MAP Reading 4 — Nonfiction (all original). Standards: NJSLS-ELA 2023, grades 4–5 (RI.CR evidence, RI.CI main idea
// and summary, RI.TS structure, RI.PP accounts, RI.MF graphics, RI.AA reasons and evidence, RI.CT comparing texts).
(function () {
  const { P, passLevel, shortLevel } = RK;
  const G = 'info';

  // ===================== MAIN IDEA & SUMMARY =====================
  const ARTICLES = [
    [ // Grade 4 Starter
      { passage: P('The Remarkable Octopus', 'Article', `With eight arms, three hearts, and blue blood, the octopus may be one of the strangest animals in the ocean. It is also one of the smartest.

Octopuses can solve puzzles. In aquariums, scientists have watched them unscrew the lids of jars to reach the crabs inside. Some octopuses have even learned to escape from their tanks by squeezing through tiny gaps. Because an octopus has no bones, it can fit through any opening larger than its beak.

Octopuses are also masters of disguise. Special cells in their skin let them change color in less than a second. An octopus can turn the same color as a rock, a patch of sand, or a clump of seaweed. Some can even change the texture of their skin to look bumpy like coral.

When disguise does not work, an octopus has one more trick. It can squirt a cloud of dark ink into the water. While a hungry fish is confused by the ink, the octopus jets away.

From solving puzzles to hiding in plain sight, the octopus has many clever ways to survive in the sea.`, ['🐙', '🫙', '🪸'], 'A clever octopus'),
        qs: [
          ['mc', 'What is the main idea of the article?', 'Octopuses have many clever ways to survive.', [['Octopuses have three hearts and blue blood.', 'That is an interesting detail, not the main idea.'], 'Octopuses are the largest animals in the sea.', 'Octopuses should not be kept in aquariums.'], 'The last sentence sums it up: the octopus has many clever ways to survive.', 'main'],
          ['mc', 'How can an octopus squeeze through tiny gaps?', 'It has no bones in its body.', [['It can change the color of its skin.', 'Color change helps it hide, not squeeze.'], 'It can squirt ink to make a path.', 'It has eight very strong arms.'], 'Because it has no bones, it fits through any opening larger than its beak.', 'detail'],
          ['ev', 'Which sentence gives evidence that octopuses can solve puzzles?', 'In aquariums, scientists have watched them unscrew the lids of jars to reach the crabs inside.', 'Unscrewing jar lids is an example of solving a puzzle.', 'evidence'],
          ['ab', 'Why does the author describe the octopus as a master of disguise?', 'It can quickly make itself look like the things around it.', ['It can hide inside empty jars at the aquarium.', 'It has three hearts and blue blood.', 'It can squeeze through very small gaps.'], 'An octopus can turn the same color as a rock, a patch of sand, or a clump of seaweed.', ['Octopuses can solve puzzles.', 'It can squirt a cloud of dark ink into the water.', 'With eight arms, three hearts, and blue blood, the octopus may be one of the strangest animals in the ocean.'], 'Matching the color of rocks, sand, or seaweed is what makes it a master of disguise.', 'inference'],
          ['mc', 'What does "masters of disguise" mean in the article?', 'Animals that are very good at hiding', [['Animals that teach other animals', 'Read the sentences that follow about changing color.'], 'Animals that live in the deepest water', 'Animals that are the leaders of a group'], 'The paragraph explains how octopuses hide by changing color and texture.', 'vocab'],
          ['mc', 'Which BEST summarizes the article?', 'Octopuses solve puzzles, hide by changing color, and escape with ink.', [['Octopuses live in aquariums and eat crabs from jars.', 'A summary includes the most important ideas, not one detail.'], 'An octopus is a fish with eight arms, three hearts, and blue blood.', 'Octopuses are strange animals that are hard to see.'], 'A good summary covers each main point: puzzles, disguise, and ink.', 'summary'],
          ['mc', 'Why does the author describe the ink cloud last?', 'It is the trick the octopus uses when hiding fails.', [['It is the octopus\'s most famous body part.', 'Read the first words of that paragraph.'], 'It is the only trick that scientists have seen.', 'It is the reason octopuses have no bones.'], 'The paragraph begins, "When disguise does not work..."', 'structure'],
        ] },
      { passage: P('Why We Have Leap Years', 'Article', `Most years have 365 days. But every four years, February gets an extra day: February 29. That year is called a leap year. Why do we need it?

The answer has to do with Earth's trip around the sun. A year is the time it takes Earth to travel all the way around the sun once. That trip does not take exactly 365 days. It takes about 365 and one-fourth days.

That extra quarter of a day might not seem like much. But it adds up. After four years, those quarters add up to one whole day. If we ignored them, our calendar would slowly drift away from the seasons. After a few hundred years, summer would begin in what the calendar called spring!

To keep the calendar in step with the seasons, we add one day every four years. People born on February 29 are sometimes called "leaplings." They only get to celebrate on their real birthday once every four years.

So the next time you see February 29 on a calendar, remember: it is there to keep our year in step with Earth's journey around the sun.`, ['📅', '🌍', '☀️'], 'February 29'),
        qs: [
          ['mc', 'What is the article mostly about?', 'Why the calendar has an extra day every four years', [['How Earth travels around the sun each year', 'That fact helps explain the main topic.'], 'What it is like to be born on February 29', 'Why February is the shortest month'], 'The article explains why we need leap years.', 'main'],
          ['mc', 'How long does Earth take to travel around the sun?', 'About 365 and one-fourth days', [['Exactly 365 days', 'The article says it does NOT take exactly 365.'], 'Exactly 366 days', 'About four whole years'], 'It "takes about 365 and one-fourth days."', 'detail'],
          ['ev', 'Which sentence explains what would happen without leap years?', 'If we ignored them, our calendar would slowly drift away from the seasons.', 'Without leap years, the calendar would drift from the seasons.', 'evidence'],
          ['mc', 'Why does the author include the example about summer starting in spring?', 'To show how big the problem would become over time', [['To explain why summer is a warm season', 'Think about what would happen after hundreds of years.'], 'To show that seasons change every year', 'To prove that calendars are always wrong about the seasons'], 'The example shows how the small extra time would cause a big problem.', 'purpose'],
          ['mc', 'What are "leaplings"?', 'People born on February 29', [['Years that have 366 days', 'Read the sentence with the word in quotation marks.'], 'Animals that jump very high', 'Calendars that show February 29'], 'People born on February 29 are called "leaplings."', 'vocab'],
          ['mc', 'Which is the BEST summary of the article?', 'Earth takes about 365¼ days to orbit, so we add a day every four years.', [['February has 29 days in a leap year.', 'A summary tells the main idea and why, not just one fact.'], 'Leaplings celebrate their birthdays only once every four years.', 'Summer would begin in spring after a few hundred years.'], 'This summary includes the cause and the solution.', 'summary'],
        ] },
    ],
    [ // Grade 4 Star
      { passage: P('The Great Molasses Flood', 'Article', `On a warm January day in 1919, the people of Boston's North End heard a sound like a train roaring past. But it was not a train. A giant storage tank, filled with more than two million gallons of molasses, had burst open.

Molasses is a thick, sticky syrup used to make sugar and other products. Usually, it moves very slowly. That is why people say "as slow as molasses in January." But on that day, a wave of molasses about 25 feet high rushed through the streets at about 35 miles per hour. It knocked down buildings, tipped over train cars, and trapped people and horses.

Why did the tank fail? Investigators later found that the tank had been built too quickly and never properly tested. People living nearby had complained that it leaked, but the company painted it brown so the leaks would be harder to see. The day before the disaster, the weather had warmed suddenly, which may have added pressure inside the tank.

The flood led to important changes. Courts ruled that the company was responsible. Afterward, cities began requiring engineers and architects to check their work and to sign their building plans. These rules help keep people safe today.

Bostonians say that on hot summer days, the North End still smelled like molasses for years afterward.`, ['🛢️', '🌊', '🏙️'], 'Boston, 1919'),
        qs: [
          ['mc', 'What is the central idea of the article?', 'A poorly built tank caused a disaster that led to safety rules.', [['Molasses is a thick syrup that moves very slowly.', 'That is a detail that explains why the flood was surprising.'], 'Boston was the biggest city in the United States in 1919.', 'Trains and horses were common in Boston long ago.'], 'The article tells what happened, why, and what changed afterward.', 'main'],
          ['mc', 'Why was the molasses flood so surprising?', 'Molasses usually moves very slowly.', [['It happened during a hot summer.', 'It happened in January.'], 'No one knew the tank existed.', 'Molasses is not dangerous at all.'], 'People say "as slow as molasses in January," yet this wave moved fast.', 'inference'],
          ['multi', 'Which TWO details explain why the tank failed?', ['The tank had been built too quickly and never properly tested.', 'The weather had warmed suddenly the day before.'], ['The molasses was used to make sugar.', 'The wave was about 25 feet high.', 'The North End smelled like molasses for years.'], 'The rushed building and the sudden warm weather explain the failure.', 'evidence'],
          ['ev', 'Which sentence shows that the company tried to hide a problem?', 'People living nearby had complained that it leaked, but the company painted it brown so the leaks would be harder to see.', 'Painting the tank brown hid the leaks.', 'evidence'],
          ['mc', 'How is the third paragraph organized?', 'It explains the causes of the disaster.', [['It tells the events in time order.', 'The paragraph begins, "Why did the tank fail?"'], 'It compares molasses to other syrups.', 'It describes the people who lived nearby.'], 'The paragraph answers "Why did the tank fail?" with causes.', 'structure'],
          ['mc', 'Which summary BEST fits the article?', 'In 1919 a weak tank burst and flooded Boston, leading to new safety rules.', [['Molasses is sticky and was used to make sugar long ago.', 'A summary needs the main events and their results.'], 'A huge wave knocked down buildings and tipped over train cars in Boston.', 'The North End smelled like molasses for many years.'], 'This summary includes what happened, why it mattered, and the result.', 'summary'],
        ] },
      { passage: P('Ants: The Tiny Farmers', 'Article', `People are not the only living things that farm. Some ants have been growing their own food for millions of years.

Leafcutter ants live in the rain forests of Central and South America. Every day, long lines of them march into the trees and cut pieces of leaves with their sharp jaws. Each ant carries a piece many times heavier than its own body back to the nest. From a distance, the moving lines of green look like tiny parades of umbrellas.

But leafcutter ants do not eat the leaves. Instead, they chew them into a paste and spread it in underground rooms. A special fungus grows on the paste, and that fungus is what the ants eat. The ants take care of their fungus gardens carefully. They pull out harmful molds, and some ants even make a natural medicine on their bodies that keeps the gardens healthy.

A leafcutter colony works like a well-organized city. Large soldier ants guard the nest. Medium-sized ants cut and carry leaves. The smallest ants tend the gardens and care for the young. A single colony can have more than five million ants.

These tiny farmers show that working together, even the smallest creatures can build something remarkable.`, ['🐜', '🍃', '🍄'], 'Leafcutter ants'),
        qs: [
          ['mc', 'What is the main idea of the article?', 'Leafcutter ants grow and care for their own food.', [['Leafcutter ants are the strongest insects.', 'Strength is one detail; focus on what the whole article explains.'], 'Rain forests have many kinds of insects.', 'Ants eat the leaves they carry home.'], 'The article explains how the ants farm fungus.', 'main'],
          ['mc', 'What do leafcutter ants actually eat?', 'Fungus that grows on chewed leaves', [['The leaves they cut from the trees', 'The article says "leafcutter ants do not eat the leaves."'], 'Smaller insects in the rain forest', 'Molds they pull from the gardens'], 'A fungus grows on the leaf paste, and the ants eat the fungus.', 'detail'],
          ['mc', 'Why does the author compare the lines of ants to "tiny parades of umbrellas"?', 'To help readers picture ants carrying leaves', [['To show that ants carry umbrellas in the rain', 'This is a comparison to help you imagine the scene.'], 'To explain why the ants march in lines', 'To show that ants are slow walkers'], 'Leaf pieces held up high look like little umbrellas.', 'device'],
          ['ev', 'Which sentence shows how ants keep their gardens healthy?', 'They pull out harmful molds, and some ants even make a natural medicine on their bodies that keeps the gardens healthy.', 'Pulling out molds and making medicine keep the gardens healthy.', 'evidence'],
          ['mc', 'How does the fourth paragraph support the main idea?', 'It shows how different ants share the work.', [['It explains how to find a leafcutter nest.', 'Read about the soldier, medium, and small ants.'], 'It compares ants to people in a city.', 'It lists the foods that ants like to eat.'], 'Each size of ant has a job, which helps the farm work.', 'structure'],
          ['mc', 'What is the author\'s purpose?', 'To inform readers about how leafcutter ants farm', [['To persuade readers to keep ants as pets', 'The author explains facts.'], 'To entertain readers with a story about ants', 'To teach readers how to grow fungus'], 'The article gives facts about how the ants farm.', 'purpose'],
        ] },
    ],
    [ // Grade 5 Challenge: two or more main ideas
      { passage: P('The Return of the Wolves', 'Article', `In 1995, scientists released fourteen gray wolves into Yellowstone National Park. Wolves had been missing from the park for about seventy years, after people hunted them until none were left. What happened next surprised almost everyone.

Without wolves, the elk in Yellowstone had grown in number. They spent long hours grazing in open river valleys, eating young willow and aspen trees before the trees could grow tall. When the wolves returned, the elk began to move more often and to avoid places where they could be trapped. In some valleys, young trees began to grow again.

The trees brought other changes. Songbirds returned to nest in the willows. Beavers, which use willows for food and for building dams, increased from one colony to nine. Their dams created ponds that became homes for fish, frogs, and otters.

Not every scientist agrees about how much of this change was caused by wolves. Some point out that the climate, the number of bears, and human hunting outside the park also changed during those years. Ecosystems, they argue, are complicated, and one animal rarely explains everything.

Still, almost all scientists agree on one point. The return of the wolves reminded people that every animal is connected to many others, sometimes in ways no one expects.`, ['🐺', '🦌', '🦫'], 'Wolves in Yellowstone'),
        qs: [
          ['multi', 'Which TWO statements are main ideas of the article?', ['The return of wolves set off changes across the ecosystem.', 'Scientists debate how much the wolves caused.'], ['Elk eat willow and aspen trees.', 'Beavers increased from one colony to nine.', 'Wolves were released in 1995.'], 'The article explains the changes and the debate about their cause.', 'main'],
          ['mc', 'How did the elk change after the wolves returned?', 'They moved more and avoided risky places.', [['They disappeared from the park completely.', 'The elk changed their behavior; they did not vanish.'], 'They began to eat fish from beaver ponds.', 'They grew larger and stopped grazing.'], 'The elk "began to move more often and to avoid places where they could be trapped."', 'detail'],
          ['order', 'Put the chain of events in order.', ['Wolves return to the park.', 'Elk change where they graze.', 'Young trees grow again.', 'Beavers build more dams.'], 'Each change led to the next.', 'structure'],
          ['ev', 'Which sentence shows that some scientists disagree?', 'Not every scientist agrees about how much of this change was caused by wolves.', 'This sentence introduces the other point of view.', 'evidence'],
          ['mc', 'Why does the author include the fourth paragraph?', 'To show that the evidence can be read in more than one way', [['To prove that the wolves did not matter at all', 'The author presents other causes, not a final answer.'], 'To explain why wolves were hunted by people long ago', 'To describe the animals that live in the park'], 'It presents other explanations, giving a balanced view.', 'argument'],
          ['mc', 'Which BEST describes how the article is organized?', 'Cause and effect, then other views about the causes', [['Problem and solution, then a list of animals', 'The article traces effects and then discusses causes.'], 'A story in time order with no other views', 'A comparison of two national parks'], 'It traces effects of the wolves, then discusses other possible causes.', 'structure'],
        ] },
      { passage: P('Plastic in the Ocean: A Problem and Some Solutions', 'Article', `Every year, millions of tons of plastic end up in the world's oceans. Some of it is trash that blows off beaches. Some flows down rivers from cities far inland. Once in the ocean, plastic can last for hundreds of years.

Plastic harms sea animals in two main ways. Larger pieces, like bags and fishing nets, can tangle turtles, seals, and seabirds. Smaller pieces can be mistaken for food. Over time, sunlight and waves break plastic into tiny bits called microplastics, which are now found everywhere from the deepest ocean trenches to Arctic ice.

People around the world are working on solutions. Some countries have banned single-use plastic bags. In several cities, floating barriers catch trash in rivers before it can reach the sea. Scientists are testing materials made from seaweed and mushrooms that break down naturally in a few weeks.

Young people are helping, too. In 2013, a teenager in the Netherlands designed a system to collect floating plastic, and his idea grew into a large cleanup project. Students in many schools organize beach cleanups and track the kinds of trash they find.

No single solution will solve the problem. But when laws, inventions, and everyday choices work together, they can make a real difference for the ocean.`, ['🌊', '🐢', '♻️'], 'Plastic and the ocean'),
        qs: [
          ['mc', 'How is the article mainly organized?', 'It describes a problem and then several solutions.', [['It tells events in the order they happened.', 'Look at the title and the order of paragraphs.'], 'It compares two oceans to each other.', 'It describes one sea animal in detail.'], 'The title says it: a problem and some solutions.', 'structure'],
          ['mc', 'What are microplastics?', 'Tiny bits that come from plastic breaking down', [['Large fishing nets that tangle turtles and seals', 'Those are larger pieces of plastic.'], 'New materials made from seaweed', 'Barriers that catch trash in rivers'], 'Sunlight and waves break plastic into tiny bits called microplastics.', 'vocab'],
          ['ev', 'Which sentence shows how far microplastics have spread?', 'Over time, sunlight and waves break plastic into tiny bits called microplastics, which are now found everywhere from the deepest ocean trenches to Arctic ice.', 'Finding them from deep trenches to Arctic ice shows how widespread they are.', 'evidence'],
          ['multi', 'Which TWO are solutions described in the article?', ['Floating barriers that catch trash in rivers', 'Materials that break down in a few weeks'], ['Throwing plastic into deep ocean trenches', 'Feeding sea animals in the Arctic', 'Building more plastic factories near rivers'], 'Both barriers and new materials are described as solutions.', 'detail'],
          ['mc', 'Why does the author include the teenager from the Netherlands?', 'To show that young people can help solve the problem', [['To prove that only inventors can help the ocean', 'The paragraph begins, "Young people are helping, too."'], 'To explain how plastic is made', 'To show where most plastic comes from'], 'The example supports the idea that young people are helping.', 'purpose'],
          ['mc', 'What is the author\'s main point in the last paragraph?', 'Many solutions working together can make a difference.', [['Plastic will soon disappear on its own.', 'The author says "No single solution will solve the problem."'], 'Only new laws can protect the ocean.', 'The ocean problem is too big for anyone to fix.'], 'Laws, inventions, and choices "working together" can help.', 'main'],
        ] },
    ],
  ];

  // ===================== TEXT STRUCTURE =====================
  const S = (title, text, icons, q, a, ws, why, dif = 0, tag = 'structure') => ({ passage: P(title, 'Excerpt', text, icons), dif, qs: [['mc', q, a, ws, why, tag]] });
  const ST = ['chronological order', 'compare and contrast', 'cause and effect', 'problem and solution', 'description'];
  const st = (a, note) => ST.filter((x) => x !== a).slice(0, 3).map((x, i) => (i === 0 ? [x, note] : x));
  const STRUCT0 = [
    S('A Butterfly Grows', 'First, a butterfly lays a tiny egg on a leaf. Next, a caterpillar hatches and eats and eats. Then it forms a chrysalis. Finally, a butterfly breaks out and dries its wings.', ['🦋'], 'How is this text organized?', 'chronological order', st('chronological order', 'Look for the words first, next, then, and finally.'), 'Time words show the steps in order.'),
    S('Frogs and Toads', 'Frogs and toads are both amphibians that lay eggs in water. However, frogs have smooth, wet skin, while toads have dry, bumpy skin. Frogs have long legs for leaping, but toads have short legs for hopping.', ['🐸'], 'How is this text organized?', 'compare and contrast', st('compare and contrast', 'Words like "both," "however," and "while" are clues.'), 'It tells how frogs and toads are alike and different.'),
    S('Why Leaves Change', 'In fall, the days get shorter. Because there is less sunlight, trees stop making chlorophyll, the chemical that makes leaves green. As a result, the yellow and orange colors hidden in the leaves begin to show.', ['🍁'], 'How is this text organized?', 'cause and effect', st('cause and effect', 'Words like "because" and "as a result" are clues.'), 'Less sunlight causes trees to stop making chlorophyll, which causes color change.'),
    S('The Crowded Bike Rack', 'Our school had only one small bike rack, and many students had nowhere to lock their bikes. To fix this, the student council raised money with a bake sale. They bought two new racks, and now everyone has a spot.', ['🚲'], 'How is this text organized?', 'problem and solution', st('problem and solution', 'Look for "to fix this."'), 'It describes a problem (too few racks) and how it was solved.'),
    S('The Giant Sequoia', 'Giant sequoias are some of the largest trees on Earth. Their trunks can be wider than a car is long. Their reddish bark is thick and spongy, and their tiny cones are about the size of an egg.', ['🌲'], 'How is this text organized?', 'description', st('description', 'The text tells what the tree is like, not events or causes.'), 'It describes the features of the sequoia.'),
    S('Building the Brooklyn Bridge', 'Work on the Brooklyn Bridge began in 1869. By 1876, its two huge towers were finished. Workers then spun the steel cables, and in 1883 the bridge finally opened to the public.', ['🌉'], 'How is this text organized?', 'chronological order', st('chronological order', 'The years show events in order.'), 'Dates show the events in the order they happened.'),
    S('Bats and Birds', 'Bats and birds both fly, but they are very different animals. Birds have feathers and lay eggs. Bats have fur, give birth to live babies, and feed them milk, just like other mammals.', ['🦇', '🐦'], 'How is this text organized?', 'compare and contrast', st('compare and contrast', 'The text shows how two animals are alike and different.'), 'It compares bats and birds.'),
    S('Too Much Screen Time', 'Many kids in our town were spending hours on screens and not enough time outside. So the library started an outdoor reading club that meets in the park every Saturday. Now dozens of families join each week.', ['📚', '🌳'], 'How is this text organized?', 'problem and solution', st('problem and solution', 'Look for what the library did about the problem.'), 'It states a problem and the library\'s solution.'),
  ];
  const STRUCT1 = [
    S('The Dust Bowl', 'In the 1930s, farmers plowed up the grasses that held the soil of the Great Plains in place. When a long drought arrived, the dry soil blew away in huge dust storms. As a result, thousands of families lost their farms.', ['🌾', '🌪️'], 'Which words are clues to the structure of this text?', '"When" and "as a result"', [['"In the 1930s" and "thousands"', 'Those words tell when and how many, not the structure.'], '"farmers" and "families"', '"grasses" and "soil"'], '"As a result" signals an effect.'),
    S('Two Kinds of Rocks', 'Igneous rocks form when hot, melted rock cools and hardens. Sedimentary rocks, on the other hand, form when layers of sand and mud are pressed together over many years.', ['🪨'], 'Which phrase signals the structure of this text?', '"on the other hand"', [['"over many years"', 'That tells time, not the overall structure.'], '"hot, melted rock"', '"layers of sand"'], '"On the other hand" signals a contrast between two kinds of rocks.'),
    S('The Lost Hikers', 'Two hikers lost the trail when fog rolled in. They stayed in one place, blew a whistle every few minutes, and used a mirror to flash sunlight when the fog lifted. A ranger saw the flash and guided them back.', ['🥾', '🌫️'], 'Which sentence states the problem?', 'Two hikers lost the trail when fog rolled in.', [['A ranger saw the flash and guided them back.', 'That is how the problem was solved.'], 'They stayed in one place and blew a whistle.', 'The fog lifted after a while.'], 'The first sentence tells the problem.'),
    S('A Day in Ancient Rome', 'At dawn, Roman children woke and ate a breakfast of bread and cheese. By mid-morning, many boys and some girls were at lessons. In the afternoon, families visited the public baths. At sunset, they gathered for the main meal of the day.', ['🏛️'], 'How does the author organize the day?', 'From morning to evening', [['From most to least important', 'Look at the time words: dawn, mid-morning, afternoon, sunset.'], 'From problem to solution', 'From cause to effect'], 'Time words move from dawn to sunset.'),
    S('Saving Water', 'Because our town had a dry summer, the reservoir dropped to its lowest level in fifty years. Therefore, the mayor asked everyone to water lawns only twice a week.', ['💧'], 'What effect did the dry summer have?', 'The reservoir dropped very low.', [['The mayor watered her lawn twice a week.', 'That was the response to the effect.'], 'The town got more rain than usual.', 'Lawns grew greener than ever.'], '"Because our town had a dry summer, the reservoir dropped."'),
    S('Comparing Two Planets', 'Venus and Earth are almost the same size, and both are rocky planets. Unlike Earth, though, Venus is covered in thick clouds that trap heat, making it the hottest planet in our solar system.', ['🪐'], 'Which signal words show contrast?', '"Unlike" and "though"', [['"almost the same" and "both"', 'Those words show how the planets are alike.'], '"making it" and "hottest"', '"covered in" and "trap"'], '"Unlike" and "though" signal a difference.'),
  ];
  const STRUCT2 = [
    { passage: P('Two Articles About Honeybees', 'Two texts', `Article 1: The Life of a Honeybee
A worker honeybee lives about six weeks in summer. During her first days, she cleans the cells of the hive. Next, she feeds the young bees. After about three weeks, she begins guarding the entrance. Finally, in her last weeks, she flies out to gather nectar and pollen.

Article 2: Why the Bees Are Disappearing
In some places, honeybee colonies are shrinking. Scientists think there are several causes. Some chemicals sprayed on crops can harm bees. Tiny mites attach to bees and spread disease. And when fields grow only one crop, bees cannot find enough different flowers to eat. As a result, farmers who need bees to pollinate their crops are worried.`, ['🐝', '🌼'], 'Two articles about bees'),
      qs: [
        ['mc', 'How is Article 1 organized?', 'Chronological order', [['Cause and effect', 'Article 1 follows a bee\'s life from her first days to her last.'], 'Problem and solution', 'Compare and contrast'], 'Time words like "first days," "next," "finally" show order.', 'structure'],
        ['mc', 'How is Article 2 organized?', 'Cause and effect', [['Chronological order', 'Article 2 explains WHY bees are disappearing.'], 'Description', 'Compare and contrast'], 'It lists causes and ends with "As a result."', 'structure'],
        ['ev', 'Which sentence from Article 2 states an effect of the bee problem?', 'As a result, farmers who need bees to pollinate their crops are worried.', '"As a result" introduces the effect on farmers.', 'evidence'],
        ['multi', 'According to Article 2, which TWO are possible causes of shrinking colonies?', ['Chemicals sprayed on crops', 'Mites that spread disease'], ['Bees guarding the entrance', 'Bees cleaning the cells of the hive', 'Bees living about six weeks'], 'Article 2 lists chemicals, mites, and one-crop fields.', 'detail'],
        ['mc', 'Why would a reader read Article 1 instead of Article 2?', 'To learn what jobs a bee does in her life', [['To learn why bees are disappearing', 'That is what Article 2 explains.'], 'To learn how farmers grow crops', 'To learn how to stop mites'], 'Article 1 describes a worker bee\'s jobs in order.', 'compare'],
        ['mc', 'How do the two articles work together?', 'One explains bee life; the other explains a threat to bees.', [['Both explain the same causes in exactly the same order.', 'They have different purposes and structures.'], 'Article 2 disagrees with the facts in Article 1.', 'Both articles are about farmers.'], 'Together they show how bees live and why they are in danger.', 'compare'],
      ] },
    { passage: P('Two Ways to Tell About a Volcano', 'Two texts', `Text A: The Eruption of Mount St. Helens
For two months in 1980, small earthquakes shook Mount St. Helens in Washington State. A bulge grew on the mountain's north side. Then, on the morning of May 18, an earthquake caused the bulge to collapse. The volcano exploded sideways, flattening forests for miles. Ash rose 15 miles into the sky.

Text B: Volcanoes and Mountains
Both volcanoes and ordinary mountains can be tall and rocky. But ordinary mountains usually form slowly, as huge pieces of Earth's crust push against each other. Volcanoes, in contrast, are built by melted rock that rises from deep inside Earth and hardens on the surface. Unlike most mountains, a volcano can grow or change shape in a single day.`, ['🌋', '⛰️'], 'Volcanoes'),
      qs: [
        ['mc', 'Which structure does Text A use?', 'Chronological order', [['Compare and contrast', 'Text A tells events of 1980 in order.'], 'Problem and solution', 'Description'], 'Text A tells what happened before and on May 18 in order.', 'structure'],
        ['mc', 'Which structure does Text B use?', 'Compare and contrast', [['Chronological order', 'Text B compares volcanoes with ordinary mountains.'], 'Cause and effect', 'Problem and solution'], 'Words like "both," "but," and "in contrast" compare two things.', 'structure'],
        ['ev', 'Which sentence from Text B shows a difference between volcanoes and mountains?', 'Unlike most mountains, a volcano can grow or change shape in a single day.', '"Unlike" signals a difference.', 'evidence'],
        ['mc', 'What caused the bulge on Mount St. Helens to collapse?', 'An earthquake on the morning of May 18', [['Melted rock hardening on the surface', 'Read Text A for the cause on May 18.'], 'Ash rising 15 miles into the sky', 'Forests falling for miles'], '"An earthquake caused the bulge to collapse."', 'detail'],
        ['mc', 'How does Text B help a reader understand Text A?', 'It explains how volcanoes differ from other mountains.', [['It tells what happened after May 18.', 'Text B is not about the 1980 eruption.'], 'It disagrees with the facts about what happened in Text A.', 'It lists every volcano in the world.'], 'Text B gives background on how volcanoes form and change.', 'compare'],
        ['mc', 'Why might the author of Text A have chosen time order?', 'To show how the eruption built up step by step', [['To compare two different volcanoes', 'Text A is about one volcano.'], 'To argue that volcanoes are too dangerous to study', 'To describe the shape of the mountain'], 'Time order shows the build-up before the eruption.', 'purpose'],
      ] },
  ];

  // ===================== REASONS, EVIDENCE & ACCOUNTS =====================
  const ACCT = [
    S('The Big Snow', 'I woke up and the snow was up to our windows! Dad and I dug a tunnel to the mailbox. My fingers froze, but it was the best morning of my life.', ['❄️'], 'What kind of account is this?', 'A firsthand account by someone who was there', [['A secondhand account by someone who read about it', 'The writer says "I" and describes being there.'], 'A secondhand account from an encyclopedia', 'A made-up story with no narrator'], 'The writer describes what he saw and did himself.', 0, 'pov'),
    S('The Big Snow (News)', 'On February 3, a storm dropped 30 inches of snow on the city, closing schools and roads. Officials said it was the largest snowfall in fifty years.', ['📰'], 'What kind of account is this?', 'A secondhand account that reports facts', [['A firsthand account of one person\'s morning', 'It reports facts without "I" or personal feelings.'], 'A poem about winter weather', 'A personal diary entry'], 'It reports facts about the storm from the outside.', 0, 'pov'),
    S('Two Accounts of the Big Snow', 'Firsthand: My fingers froze, but it was the best morning of my life.\nSecondhand: A storm dropped 30 inches of snow, the most in fifty years.', ['❄️', '📰'], 'What does the secondhand account give that the firsthand account does not?', 'The exact amount of snow that fell', [['How it felt to dig in the snow', 'That feeling is in the firsthand account.'], 'What the writer did with Dad', 'Why the morning was the best ever'], 'Only the news report gives "30 inches."', 0, 'compare'),
    S('The Moon Landing', 'My grandmother was nine in 1969. She says the whole family crowded around a tiny black-and-white TV, and when the astronaut stepped onto the moon, her father cried.', ['🌕', '📺'], 'Is this a firsthand or secondhand account of the moon landing TV broadcast?', 'Secondhand, because the writer heard it from Grandmother', [['Firsthand, because the writer watched the TV that night', 'The writer is telling what Grandmother says.'], 'Firsthand, because it uses the word "I"', 'Secondhand, because it is about space'], 'The writer was not there; Grandmother told the story.', 2, 'pov'),
    S('Field Trip Journal', 'Today we toured the chocolate factory. The air smelled so sweet it made my stomach growl. I watched a machine pour a river of chocolate into molds.', ['🍫'], 'Which detail could ONLY come from a firsthand account?', 'The smell made the writer\'s stomach growl.', [['The factory makes chocolate.', 'Anyone could report that fact.'], 'Machines pour chocolate into molds.', 'Factories can be toured by students.'], 'Only someone who was there would know how it felt.', 0, 'pov'),
    S('A Letter From a Soldier', '"Dear Mother, the winter here at Valley Forge is bitter. Many of us have no shoes, and we wrap our feet in rags." — a letter from 1778', ['✉️', '🥶'], 'Why is this letter useful to historians?', 'It is a firsthand account from someone who lived it.', [['It is a secondhand account written much later.', 'It was written in 1778 by someone at Valley Forge.'], 'It gives exact temperatures for every day.', 'It explains why the war began.'], 'A letter from a soldier at Valley Forge is a firsthand source.', 2, 'pov'),
  ];
  const REASONS4 = [
    { passage: P('Should Schools Start Later?', 'Opinion', `Many middle and high schools start before 8:00 a.m. I believe schools should start later in the morning.

First, students need more sleep. Doctors recommend that children ages 6 to 12 get 9 to 12 hours of sleep each night, and teenagers need 8 to 10. But many students go to bed late because of homework and activities, and an early start cuts their sleep short.

Second, well-rested students learn better. When students are tired, it is harder for them to pay attention and remember what they learn. Some schools that moved their start times later have reported better attendance and fewer students falling asleep in class.

Some people worry that a later start would make it harder for parents to get to work or would push after-school sports later. These are real concerns. But schools could offer early drop-off programs and adjust practice times.

Getting enough sleep is one of the most important things students can do to stay healthy and succeed. Starting school later would help them do just that.`, ['⏰', '😴', '🏫'], 'School start times'),
      qs: [
        ['mc', "What is the author's main claim?", 'Schools should start later in the morning.', [['Students should do less homework each night.', 'The claim is in the first paragraph.'], 'Doctors know the most about sleep.', 'Sports practice should be held earlier.'], '"I believe schools should start later in the morning."', 'argument'],
        ['mc', 'Which reason does the author give in the second paragraph?', 'Students need more sleep than they are getting.', [['Well-rested students learn better.', 'That is the second reason, in the third paragraph.'], 'Parents need to get to work on time in the morning.', 'Teenagers like to stay up late.'], '"First, students need more sleep."', 'argument'],
        ['ev', 'Which sentence gives evidence from experts?', 'Doctors recommend that children ages 6 to 12 get 9 to 12 hours of sleep each night, and teenagers need 8 to 10.', 'The doctors\' recommendation is expert evidence.', 'evidence'],
        ['mc', 'Why does the author include the fourth paragraph?', 'To answer what people who disagree might say', [['To change the author\'s main claim', 'The author still supports a later start.'], 'To explain how sports practices work', 'To prove that parents do not care about sleep'], 'It names concerns and responds with possible solutions.', 'argument'],
        ['mc', 'How does the evidence about schools that changed their start times support the claim?', 'It shows that a later start has helped real schools.', [['It shows that students do not like school.', 'Read about attendance and sleeping in class.'], 'It shows that teachers want school to start later too.', 'It shows that homework is too hard.'], 'Better attendance and fewer students sleeping support a later start.', 'argument'],
        ['multi', 'Which TWO details support the reason that rested students learn better?', ['Tired students find it harder to pay attention.', 'Some schools saw fewer students falling asleep in class.'], ['Many schools start before 8:00 a.m.', 'Schools could offer early drop-off programs.', 'Teenagers need 8 to 10 hours of sleep.'], 'Both details connect rest to learning.', 'evidence'],
      ] },
    { passage: P('The Case for Library Cards', 'Opinion', `Every student in our district should get a free public library card in kindergarten. A library card opens doors that nothing else can.

A library card gives every child access to books, no matter how much money their family has. A single new book can cost fifteen dollars or more. With a card, a child can borrow hundreds of books a year for free.

Libraries offer much more than books, too. They have computers, homework help, science kits, and even musical instruments to borrow. In our town, the library runs a summer reading program with prizes, and last year more than 2,000 kids joined.

Research shows that children who read over the summer keep the skills they learned during the school year. Children who do not read often fall behind. Giving every child a library card is a simple way to help keep everyone's reading strong.

Some people say families can sign up for cards on their own. But many parents do not know cards are free, or they are too busy to visit. Signing students up at school would make sure no one is left out.`, ['📚', '🪪', '🎒'], 'A card for every student'),
      qs: [
        ['mc', 'What does the author want the district to do?', 'Give every student a free library card in kindergarten', [['Build a new library in every school in the district', 'Read the first sentence.'], 'Buy every student fifteen new books', 'Close the library during the summer'], 'The author says every student should get a free card in kindergarten.', 'argument'],
        ['ev', 'Which sentence uses a fact about cost to support the claim?', 'A single new book can cost fifteen dollars or more.', 'The cost of a new book shows why free borrowing matters.', 'evidence'],
        ['mc', 'How does the third paragraph support the author\'s claim?', 'It shows that libraries offer many resources.', [['It explains why books are expensive.', 'It lists computers, homework help, and more.'], 'It describes how to sign up for a card.', 'It admits that libraries are too crowded.'], 'It shows a card gives access to much more than books.', 'argument'],
        ['mc', 'What does the research in the fourth paragraph show?', 'Summer reading helps children keep their skills.', [['Children read more in the winter than summer.', 'Read the sentence beginning "Research shows."'], 'Library cards are free in every town.', 'Prizes are the reason children read.'], 'Children who read over the summer keep their skills.', 'detail'],
        ['mc', 'How does the author respond to people who disagree?', 'By explaining why families might not sign up on their own', [['By agreeing that cards are not needed', 'The author still supports the plan.'], 'By saying that busy parents do not care about reading', 'By offering to pay for every card'], 'The author says many parents do not know cards are free or are too busy.', 'argument'],
        ['mc', 'Which statement is an opinion rather than a fact?', 'A library card opens doors that nothing else can.', [['A single new book can cost fifteen dollars or more.', 'That can be checked.'], 'Last year more than 2,000 kids joined.', 'The library runs a summer reading program.'], 'This tells what the author believes and cannot be proven.', 'argument'],
      ] },
  ];
  const PAIRED5 = [
    { passage: P('Two Views on Zoos', 'Two texts', `Text 1: Zoos Protect Animals
Modern zoos do far more than display animals. Many work to save endangered species. The California condor, a huge vulture, was nearly extinct in 1987, when only 27 remained. Zoos bred condors and released them into the wild. Today there are more than 500. Zoos also teach millions of visitors each year about protecting wildlife.

Text 2: Animals Belong in the Wild
Even the best zoo cannot give an animal the space it would have in nature. In the wild, an elephant may walk 30 miles in a day. In a zoo, it may have less than an acre. Some animals in zoos pace back and forth for hours, a sign of stress. Instead of zoos, we should protect wild habitats, where animals can live as nature intended.`, ['🦅', '🐘'], 'Should we have zoos?'),
      qs: [
        ['mc', 'What is the main claim of Text 1?', 'Zoos help protect animals.', [['Elephants need lots of space to walk.', 'That evidence is from Text 2.'], 'Condors are a kind of vulture.', 'Zoos should all be closed.'], 'Text 1 argues that zoos save species and teach visitors.', 'argument'],
        ['mc', 'What is the main claim of Text 2?', 'Animals should live in protected wild habitats.', [['Zoos are the best homes for elephants and other animals.', 'Text 2 argues against zoos.'], 'Condors were nearly extinct in 1987.', 'Zoos teach millions of visitors.'], 'Text 2 says we should protect wild habitats instead of using zoos.', 'argument'],
        ['ev', 'Which sentence from Text 1 gives the strongest evidence for its claim?', 'Today there are more than 500.', 'The condor population grew from 27 to over 500 because of zoos.', 'evidence'],
        ['mc', 'How does Text 2 use the example of the elephant?', 'To show that zoos have much less space than nature', [['To show that elephants are endangered in the wild', 'Compare 30 miles a day with less than an acre.'], 'To show that elephants like zoos', 'To explain how condors were saved'], 'It contrasts 30 miles a day in the wild with a small zoo space.', 'argument'],
        ['mc', 'On which point would BOTH authors most likely agree?', 'Protecting wild animals is important.', [['Zoos should breed more condors.', 'Only Text 1 discusses breeding.'], 'Elephants should not live anywhere.', 'Visitors should not learn about wildlife.'], 'Both care about protecting animals, even though they disagree about zoos.', 'compare'],
        ['multi', 'Which TWO details does Text 2 use as evidence?', ['An elephant may walk 30 miles in a day.', 'Some zoo animals pace back and forth for hours.'], ['Only 27 condors remained in 1987.', 'Zoos teach millions of visitors each year.', 'More than 500 condors live today.'], 'Both details come from Text 2 and support its claim.', 'evidence'],
      ] },
    { passage: P('Should Kids Have Homework?', 'Two texts', `Text 1: Homework Builds Habits
Homework gives students practice that helps them remember what they learn in class. It also builds habits that matter for life: planning time, working without help, and finishing a task. A teacher in our district found that students who practiced multiplication facts for ten minutes a night learned them weeks faster than students who did not.

Text 2: Let Kids Be Kids
After seven hours at school, children need time to play, rest, and be with their families. Too much homework can cause stress and leave less time for sleep and exercise. Some schools have replaced nightly homework with reading for fun, and teachers report that students arrive happier and more ready to learn.`, ['📝', '⚽'], 'The homework debate'),
      qs: [
        ['mc', 'What does Text 1 claim about homework?', 'It helps students remember lessons and build habits.', [['It causes stress and should be replaced with reading.', 'That is Text 2\'s view.'], 'It should only be done on weekends.', 'It is only useful for reading.'], 'Text 1 says homework gives practice and builds life habits.', 'argument'],
        ['mc', 'What evidence does Text 1 give?', 'Students who practiced facts nightly learned them faster.', [['Students arrived at school happier.', 'That evidence is in Text 2.'], 'Children need more time to play and rest after school.', 'Seven hours of school is enough.'], 'A teacher found that nightly practice helped students learn faster.', 'evidence'],
        ['ev', 'Which sentence from Text 2 gives a reason against too much homework?', 'Too much homework can cause stress and leave less time for sleep and exercise.', 'Stress and lost sleep are reasons against too much homework.', 'evidence'],
        ['mc', 'What do schools in Text 2 do instead of nightly homework?', 'Ask students to read for fun', [['Give homework only to older students', 'Read the last sentence of Text 2.'], 'Make the school day longer', 'Cancel all reading assignments'], 'Some schools replaced homework with reading for fun.', 'detail'],
        ['mc', 'How are the two texts different?', 'They disagree about whether nightly homework is helpful.', [['They agree that too much homework causes stress.', 'Text 1 supports homework; Text 2 questions it.'], 'One is about math and one is about science.', 'They both describe the same teacher.'], 'Text 1 supports homework; Text 2 argues for less.', 'compare'],
        ['mc', 'Which question would be BEST answered by reading both texts?', 'What are the benefits and drawbacks of homework?', [['How do you learn multiplication facts quickly?', 'Only Text 1 mentions multiplication.'], 'How long is the school day?', 'What do children do for exercise?'], 'Together the texts give both sides of the debate.', 'compare'],
      ] },
  ];

  // ===================== CHARTS & TIMELINES =====================
  const VIS = [
    { passage: P('Recess Choices', 'Chart', 'Students voted for their favorite recess activity. The results are in the bar graph. Tag was the most popular choice, but jump rope and soccer were close behind.', [], '', Fig.barGraph('Favorite recess activity', [['Tag', 12], ['Soccer', 9], ['Jump rope', 10], ['Swings', 5]], 2)), qs: [
      ['mc', 'According to the graph, how many students chose jump rope?', '10', ['12', ['9', 'Nine students chose soccer.'], '5'], 'The jump rope bar reaches 10.', 'feature'],
      ['mc', 'What does the graph show that the text does NOT say?', 'Exactly how many students chose swings', [['That tag was the most popular', 'The text says that too.'], 'That students voted for recess activities', 'That soccer and jump rope were close'], 'Only the graph shows the number for swings: 5.', 'feature'],
    ] },
    { passage: P('Rain in Our Town', 'Chart', 'Spring is the rainiest season in our town. The table shows the inches of rain each month from March to June.', [], '', Fig.table([['Month', 'Rain (inches)'], ['March', '4'], ['April', '6'], ['May', '5'], ['June', '2']], 'Monthly rainfall')), qs: [
      ['mc', 'Which month had the most rain?', 'April', ['March', ['May', 'May had 5 inches; check April.'], 'June'], 'April had 6 inches, the most.', 'feature'],
      ['mc', 'How does the table support the first sentence of the text?', 'It shows rain amounts for each spring month.', [['It shows that June is the rainiest month.', 'June had the least rain.'], 'It shows rain for every month of the year.', 'It shows the temperature each month.'], 'The table gives evidence for how rainy spring is.', 'feature'],
    ] },
    { passage: P('The Story of Flight', 'Timeline', 'People have dreamed of flying for thousands of years. The timeline shows some important steps.', [], '', Fig.table([['Year', 'Event'], ['1783', 'First hot-air balloon flight'], ['1903', 'Wright brothers\' first airplane flight'], ['1927', 'First solo flight across the Atlantic'], ['1969', 'People land on the moon']], 'Timeline of flight')), qs: [
      ['mc', 'Which event happened FIRST?', 'The first hot-air balloon flight', [['The Wright brothers\' first airplane flight', 'Check the years: 1783 comes before 1903.'], 'The first solo flight across the Atlantic', 'People landing on the moon'], '1783 is the earliest year.', 'feature'],
      ['mc', 'How many years passed between the Wright brothers\' flight and the moon landing?', '66 years', ['24 years', ['42 years', 'Subtract 1903 from 1969.'], '186 years'], '1969 − 1903 = 66.', 'feature'],
    ] },
    { passage: P('Water Use at Home', 'Chart', 'Families use water in many ways every day. The picture graph shows how one family used water in one day. Each drop stands for 10 gallons.', [], '', Fig.picGraph('Gallons used in one day', [['Shower', 40], ['Toilet', 30], ['Laundry', 20], ['Dishes', 10]], '💧', 10)), qs: [
      ['mc', 'How many gallons did the family use for the shower?', '40', ['4', ['30', 'Count the drops for the shower: each one is 10.'], '10'], 'Four drops × 10 gallons = 40 gallons.', 'feature'],
      ['mc', 'Why is the key important for reading this graph?', 'It tells how many gallons each drop stands for.', [['It tells which activity uses the least water.', 'The key explains the picture symbol.'], 'It tells the name of the family.', 'It tells how many days the family was counted.'], 'Without the key, you would not know each drop means 10 gallons.', 'feature'],
    ] },
    { passage: P('The Nile River', 'Map text', 'The Nile is one of the longest rivers in the world. It flows north for about 4,100 miles through eleven countries before reaching the Mediterranean Sea. The diagram shows the main parts of a river.', [], '', Fig.diagramFig('Parts of a river', '🏞️', ['source', 'tributary', 'mouth', 'delta'])), qs: [
      ['mc', 'Which part of the diagram is where a river begins?', 'The source', [['The mouth', 'The mouth is where a river ends.'], 'The delta', 'The tributary'], 'The source is where a river begins.', 'feature'],
      ['mc', 'In which direction does the Nile flow?', 'North', ['South', ['East', 'Read the second sentence.'], 'West'], '"It flows north for about 4,100 miles."', 'detail'],
    ] },
    { passage: P('Sleep by Age', 'Chart', 'People need different amounts of sleep at different ages. The bar graph shows the hours of sleep recommended for each age group. Babies need the most, and adults need the least.', [], '', Fig.barGraph('Recommended hours of sleep', [['Baby', 14], ['Child', 10], ['Teen', 9], ['Adult', 8]], 2)), qs: [
      ['mc', 'How many hours of sleep are recommended for a child?', '10', ['14', ['9', 'Nine hours is for teens.'], '8'], 'The child bar reaches 10.', 'feature'],
      ['mc', 'How does the graph support the last sentence of the text?', 'Babies have the tallest bar and adults the shortest.', [['Teens have the tallest bar, and babies have the shortest.', 'Look at which bar is tallest.'], 'All of the bars are the same height.', 'Children need the least sleep of all.'], 'The tallest bar is babies, the shortest is adults.', 'feature'],
    ] },
  ];
  const VIS2 = [
    { passage: P('A Plan for the School Garden', 'Article', `Our class wants to build a garden behind the gym. We measured the space and found that it is 20 feet long and 10 feet wide. We plan to divide it into four equal beds, one for each season's crops.

The chart shows the cost of the supplies we need. The biggest cost is wood for the raised beds. To raise the money, we will hold a plant sale in April and ask local businesses for donations.

If the garden works well, we hope younger classes can use it too. Gardening teaches science, math, and patience, and the food we grow can be shared with families in our school.`, ['🌱', '🧾'], '', Fig.table([['Supply', 'Cost'], ['Wood', '$120'], ['Soil', '$60'], ['Seeds', '$25'], ['Tools', '$45']], 'Garden supplies')),
      qs: [
        ['mc', 'According to the chart, what is the biggest cost?', 'Wood', ['Soil', ['Tools', 'Tools cost $45; wood costs more.'], 'Seeds'], 'Wood costs $120, the most.', 'feature'],
        ['mc', 'What is the total cost of all the supplies?', '$250', ['$120', ['$205', 'Add all four costs: 120 + 60 + 25 + 45.'], '$190'], '$120 + $60 + $25 + $45 = $250.', 'feature'],
        ['ev', 'Which sentence explains how the class will pay for the supplies?', 'To raise the money, we will hold a plant sale in April and ask local businesses for donations.', 'The plant sale and donations will raise the money.', 'evidence'],
        ['mc', 'How does the chart support the article?', 'It shows exactly what the garden will cost.', [['It shows what the class will grow each season.', 'The chart lists supplies and costs.'], 'It shows the size of the garden.', 'It shows which businesses will donate.'], 'The chart gives the costs the article mentions.', 'feature'],
        ['mc', 'Why does the author mention younger classes?', 'To show the garden could help more students', [['To show that younger students will pay for it', 'Read the last paragraph.'], 'To complain that the garden is too small', 'To explain how to measure the space'], 'The garden could teach science, math, and patience to more students.', 'purpose'],
        ['mc', 'What is the author\'s main purpose?', 'To explain and support a plan for a school garden', [['To tell a story about a funny garden mistake', 'The article describes a plan and its costs.'], 'To teach readers how to build raised beds', 'To compare gardens at different schools'], 'It describes the plan, the costs, and the benefits.', 'purpose'],
      ] },
    { passage: P('Timeline of the Telephone', 'Article', `Today, many people carry a phone in their pocket. But the telephone has changed a great deal since it was first invented.

In 1876, Alexander Graham Bell made the first successful telephone call. Early phones were connected by wires, and a person called an operator connected each call by hand. In 1973, an engineer made the first call on a handheld mobile phone, which weighed about two and a half pounds. In 2007, smartphones with touch screens became popular, combining a phone, a camera, and a computer in one device.

Each change made it easier for people to communicate across long distances. What will the next change be?`, ['☎️', '📱'], '', Fig.table([['Year', 'Event'], ['1876', 'First successful telephone call'], ['1878', 'First telephone operators'], ['1973', 'First handheld mobile phone call'], ['2007', 'Touch-screen smartphones become popular']], 'Telephone timeline')),
      qs: [
        ['mc', 'Which event on the timeline is NOT described in the text?', 'The first telephone operators in 1878', [['The first successful telephone call', 'The text describes Bell\'s call in 1876.'], 'The first handheld mobile phone call', 'Touch-screen smartphones becoming popular'], 'The text mentions operators but not the year 1878.', 'feature'],
        ['mc', 'How many years after the first telephone call was the first mobile phone call?', '97 years', ['134 years', ['34 years', 'Subtract 1876 from 1973.'], '131 years'], '1973 − 1876 = 97.', 'feature'],
        ['ev', 'Which sentence explains how early telephone calls were connected?', 'Early phones were connected by wires, and a person called an operator connected each call by hand.', 'Operators connected each call by hand.', 'evidence'],
        ['mc', 'How is the second paragraph organized?', 'In time order', [['From problem to solution', 'The years go from 1876 to 2007.'], 'By comparing two inventors', 'By listing causes and effects'], 'The years show the order of events.', 'structure'],
        ['mc', 'What is the main idea of the article?', 'The telephone has changed greatly since it was invented.', [['Alexander Graham Bell made the first telephone call in 1876.', 'That is one detail.'], 'Smartphones have cameras and computers.', 'Early mobile phones were heavy.'], 'The article traces how the telephone has changed.', 'main'],
        ['mc', 'How does the timeline help readers?', 'It shows the major changes in order at a glance.', [['It explains how a telephone works inside.', 'A timeline shows events in order.'], 'It shows what phones will look like next.', 'It gives the names of every inventor.'], 'The timeline puts the key events in order.', 'feature'],
      ] },
  ];

  READ_SKILLS.push(
    { goal: G, id: 'articles4', name: 'Main idea & summary', icon: '📰', passage: true, levels: [
      passLevel('Main idea and details', 'RI.CR.4.1 · RI.CI.4.2', 'What is it mostly about?', ARTICLES[0], G, 186),
      passLevel('Summarize an article', 'RI.CI.4.2 · RI.IT.4.3', 'The most important ideas, in order.', ARTICLES[1], G, 198),
      passLevel('More than one main idea', 'RI.CI.5.2 · RI.AA.5.7', 'Main ideas and different views.', ARTICLES[2], G, 210),
    ] },
    { goal: G, id: 'structure4', name: 'Text structure', icon: '🏗️', passage: true, levels: [
      shortLevel('Five text structures', 'RI.TS.4.4', 'Time order, compare, cause, problem, description.', STRUCT0, G, 188),
      shortLevel('Signal words', 'RI.TS.4.4', 'The words that show the structure.', STRUCT1, G, 198),
      passLevel('Comparing structures', 'RI.TS.5.4 · RI.CT.5.8', 'Two texts, two structures.', STRUCT2, G, 208),
    ] },
    { goal: G, id: 'evidence4', name: 'Reasons & evidence', icon: '⚖️', passage: true, levels: [
      shortLevel('Firsthand and secondhand', 'RI.PP.4.5', 'Who was there?', ACCT, G, 190),
      passLevel('Reasons and evidence', 'RI.AA.4.7', 'How authors support a claim.', REASONS4, G, 200),
      passLevel('Two sides of an issue', 'RI.AA.5.7 · RI.CT.5.8', 'Compare claims and evidence.', PAIRED5, G, 210),
    ] },
    { goal: G, id: 'visuals4', name: 'Charts & timelines', icon: '📊', passage: true, levels: [
      shortLevel('Graphs and tables', 'RI.MF.4.6', 'What does the picture show?', VIS.map((e) => ({ ...e, qs: [e.qs[0]] })), G, 188),
      shortLevel('Visuals and text together', 'RI.MF.4.6', 'How a visual supports the text.', VIS.map((e) => ({ ...e, qs: [e.qs[1]] })), G, 196),
      passLevel('Reading a visual in an article', 'RI.MF.5.6 · RI.CR.5.1', 'Charts and timelines in longer texts.', VIS2, G, 206),
    ] },
  );
})();
