// MAP Reading 2 — Fiction, Poetry, and Drama: poems and character stories (all original).
// Standards: NJSLS-ELA 2023, grades 2–3 (RL.CR evidence, RL.CI central message, RL.IT characters, RL.TS structure,
// L.VI figurative and sensory language).
(function () {
  const { P, passLevel } = RK;

  // ===================== POEMS =====================
  const POEMS = [
    [ // Grade 2 Starter: short rhyming poems
      { passage: P('Puddle Jumping', 'Poem', `I put my yellow boots on,
I zip my coat up tight.
I run outside to find the rain,
It is a happy sight!

I jump in every puddle,
I splash from left to right.
My dog jumps in beside me,
We make a muddy fright!

Mom calls us in for supper,
We drip from head to toe.
Tomorrow, if it rains again,
Outside we'll both go!`, ['🌧️', '👢', '🐕'], 'Splashing in the rain'),
        qs: [
          ['mc', 'What does the child put on first?', 'Yellow boots', [['A rain hat', 'Look at the first line of the poem.'], 'A warm scarf', 'Red mittens'], 'The first line says, "I put my yellow boots on."', 'detail'],
          ['mc', 'Who jumps in the puddles with the child?', 'The dog', ['Mom', 'A friend', ['A frog', 'The poem says "My dog jumps in beside me."']], 'The second stanza says the dog jumps in beside the child.', 'detail'],
          ['mc', 'Which word rhymes with "tight"?', 'sight', [['coat', 'Rhyming words end with the same sound. "Coat" ends with -oat.'], 'rain', 'run'], '"Tight" and "sight" both end with -ight.', 'device'],
          ['mc', 'How does the child feel about the rain?', 'Happy', [['Scared', 'Look for clue words. The poem calls the rain "a happy sight."'], 'Bored', 'Sleepy'], 'The child says the rain is "a happy sight" and wants to go out again.', 'feeling'],
          ['ev', 'Which line shows that the child and the dog got very wet?', 'We drip from head to toe.', 'Dripping from head to toe means they are wet all over.', 'evidence'],
          ['mc', 'What does the child want to do tomorrow?', 'Go outside in the rain again', [['Stay inside and watch the rain from the window', 'The last lines say they will both go outside.'], 'Give the dog a bath', 'Buy a new pair of yellow boots'], 'The poem ends, "Tomorrow, if it rains again, outside we\'ll both go!"', 'inference'],
        ] },
      { passage: P('My Cat Biscuit', 'Poem', `My cat is named Biscuit,
She's orange and round.
She sleeps in the sunshine
And won't make a sound.

She chases a feather,
She bats at a string.
She climbs up the curtains,
Then sits like a king.

At night she curls up
On the end of my bed.
She purrs like a motor
And rests her soft head.`, ['🐈', '🧶', '🛏️'], 'Biscuit the cat'),
        qs: [
          ['mc', 'What color is Biscuit?', 'Orange', ['Black', 'Gray', ['White', 'The second line tells her color.']], 'The poem says, "She\'s orange and round."', 'detail'],
          ['mc', 'What does Biscuit do in the sunshine?', 'She sleeps.', [['She chases a feather.', 'She chases a feather, but in the sunshine she sleeps.'], 'She climbs the curtains.', 'She eats her food.'], 'The poem says, "She sleeps in the sunshine."', 'detail'],
          ['mc', 'Which word rhymes with "string"?', 'king', ['feather', ['chases', '"Chases" does not end with the -ing sound.'], 'climbs'], '"String" and "king" end with the same sound: -ing.', 'device'],
          ['mc', '"She purrs like a motor." What does this tell you about Biscuit\'s purr?', 'It makes a steady humming sound.', [['It is very quiet.', 'A motor hums. The poem compares the purr to that sound.'], 'It is loud enough to scare the birds.', 'It means she is hungry.'], 'The purr is compared to a motor, which hums.', 'device'],
          ['ev', 'Which line shows where Biscuit sleeps at night?', 'On the end of my bed.', 'At night, Biscuit curls up on the end of the bed.', 'evidence'],
          ['order', 'Put what Biscuit does in the order of the poem.', ['She sleeps in the sunshine.', 'She chases a feather.', 'She climbs up the curtains.', 'She curls up on the bed.'], 'The poem goes from the day to the night.', 'sequence'],
        ] },
    ],
    [ // Grade 2 Star: repeated lines, stanzas, sound and sense words
      { passage: P('Rain on the Roof', 'Poem', `Tap, tap, tap on the roof,
The rain begins to play.
It drums upon the windows
And washes dust away.

Tap, tap, tap on the roof,
The flowers lift their heads.
The worms come up to wiggle
Out of their muddy beds.

Tap, tap, tap on the roof,
Then slowly, it is through.
The sun peeks out to see the world,
All shiny, fresh, and new.`, ['🌧️', '🏠', '🌸'], 'A rainy day'),
        qs: [
          ['mc', 'Which line is repeated at the start of each stanza?', 'Tap, tap, tap on the roof,', [['The rain begins to play.', 'That line is only in the first stanza.'], 'The flowers lift their heads.', 'The sun peeks out to see the world,'], 'Every stanza begins with "Tap, tap, tap on the roof."', 'structure'],
          ['mc', 'Why does the poet repeat "Tap, tap, tap"?', 'To sound like rain falling', [['To show that someone is knocking', 'The poem is about the rain on the roof.'], 'To tell how many flowers there are', 'To make the poem shorter'], '"Tap, tap, tap" sounds like raindrops hitting the roof.', 'device'],
          ['mc', 'How many stanzas does this poem have?', '3', [['12', 'That is the number of lines. A stanza is a group of lines.'], '4', '1'], 'The poem has three groups of lines, so it has three stanzas.', 'structure'],
          ['mc', 'What do the worms do in the rain?', 'They come up to wiggle.', ['They hide deep under the rocks until it stops.', 'They wash the windows.', ['They lift their heads.', 'The flowers lift their heads, not the worms.']], 'The poem says the worms "come up to wiggle."', 'detail'],
          ['ev', 'Which line tells what happens when the rain stops?', 'The sun peeks out to see the world,', 'When the rain is through, the sun comes out.', 'evidence'],
          ['mc', 'What does "it is through" mean in the last stanza?', 'The rain is finished.', [['The rain came through the roof.', 'Read the next line: the sun comes out, so the rain has ended.'], 'The worms went through the mud.', 'The window is open.'], 'After the rain is through, the sun peeks out, so "through" means finished.', 'vocab'],
        ] },
      { passage: P('The Snack Shelf', 'Poem', `Crunchy apples, red and sweet,
Crackers salty, crisp, and neat.
Cheese that's yellow, soft, and mild,
Juicy grapes for every child.

Popcorn pops with a cheerful sound,
Pop! Pop! Pop! It jumps around.
Warm bread smells like Saturday,
When Grandpa comes to bake and play.

Which snack is best? I cannot say,
I'd like to taste them all today!`, ['🍎', '🍿', '🍞'], 'Snacks to try'),
        qs: [
          ['mc', 'Which words in the poem describe the apples?', 'red and sweet', [['salty, crisp', 'Those words describe the crackers.'], 'yellow, soft', 'a cheerful sound'], '"Crunchy apples, red and sweet" tells about the apples.', 'detail'],
          ['mc', 'Which sense does "Pop! Pop! Pop!" help you use?', 'Hearing', [['Smell', 'Popping is a sound.'], 'Touch', 'Sight'], 'You hear popcorn pop, so the words use the sense of hearing.', 'device'],
          ['ev', 'Which line uses the sense of smell?', 'Warm bread smells like Saturday,', 'The bread "smells like Saturday," so this line is about smell.', 'evidence'],
          ['mc', 'Why does warm bread make the speaker think of Saturday?', 'Grandpa comes on Saturday to bake.', [['Bread is only sold on Saturday.', 'Read the next line about Grandpa.'], 'The speaker eats bread every day.', 'It always rains on Saturdays at the speaker\'s house.'], 'The next line says Grandpa comes on Saturday "to bake and play."', 'inference'],
          ['mc', 'Which word rhymes with "mild"?', 'child', ['cheese', 'soft', ['grapes', '"Grapes" does not end with the -ild sound.']], '"Mild" and "child" end with the same sound.', 'device'],
          ['mc', 'What is the speaker\'s answer to "Which snack is best?"', 'The speaker cannot pick just one.', [['Popcorn is the best because it pops.', 'The speaker says, "I cannot say."'], 'Apples are the best.', 'Warm bread from Grandpa is the best.'], 'The speaker cannot say and wants to taste them all.', 'inference'],
        ] },
    ],
    [ // Grade 3 Challenge: speaker, figurative language, central message
      { passage: P('The Oak and the Acorn', 'Poem', `A tiny acorn fell one fall
Beside a giant oak.
"I'll never be so big and tall,"
The little acorn spoke.

The oak just rustled, calm and wise,
"I was as small as you.
I grew beneath these patient skies,
One ring a year, I grew."

So winter came and spring returned,
The acorn found its root.
And every year, the acorn learned
To stretch a little shoot.

Now children climb a sturdy tree
Where once an acorn lay.
It did not grow in one big leap,
But one small step each day.`, ['🌰', '🌳', '🧒'], 'From acorn to oak'),
        qs: [
          ['mc', 'What is the acorn worried about at the beginning?', 'That it will never grow big', [['That the oak will fall on it', 'Read what the acorn says in the first stanza.'], 'That winter is too cold', 'That children will step on it'], 'The acorn says, "I\'ll never be so big and tall."', 'character'],
          ['mc', 'How does the oak answer the acorn?', 'It says it was once small too.', [['It laughs at the acorn.', 'The oak is described as "calm and wise."'], 'It tells the acorn to go away.', 'It promises to grow the acorn quickly.'], 'The oak says, "I was as small as you."', 'detail'],
          ['mc', '"One ring a year, I grew." What does this line suggest about how trees grow?', 'Slowly, a little at a time', [['Very fast, all at once', 'One ring each year is slow, steady growth.'], 'Only in the winter', 'Only when children climb them'], 'Trees add one ring each year, so they grow slowly.', 'inference'],
          ['mc', 'What is the central message of the poem?', 'Big things grow from small, steady steps.', [['Acorns are better than oak trees.', 'Think about what the acorn learns by the end.'], 'Winter is the best season for growing.', 'Children should climb tall trees every day.'], 'The last lines say it grew "one small step each day."', 'theme'],
          ['ev', 'Which line BEST supports the message of the poem?', 'But one small step each day.', 'This line tells the big idea: growing happens little by little.', 'evidence'],
          ['mc', 'In the last stanza, what does "sturdy" mean?', 'Strong', [['Tiny', 'The acorn has grown into a big tree children can climb.'], 'Old', 'Wet'], 'Children can climb the tree, so it must be strong.', 'vocab'],
        ] },
      { passage: P('Lunch Box Trade', 'Poem', `I looked inside my lunch box,
And frowned at what I saw:
A sandwich, plain as paper,
A carrot, bright and raw.

But Jada's lunch had dumplings,
And Leo's had a plum.
"I'll trade you!" I said, grinning,
"My carrot for your crumb!"

Jada laughed and shook her head,
Then gave me half her treat.
"We don't need trades," she told me.
"Let's share the food we eat."

So now we spread a picnic,
Each lunch a different flavor.
My plain old sandwich tastes the best
When friendship is the favor.`, ['🥪', '🥟', '🍑'], 'Sharing lunch'),
        qs: [
          ['mc', 'Who is the speaker of the poem?', 'A child at lunch', [['Jada', 'Jada is a friend the speaker talks to.'], 'A teacher watching the lunchroom', 'Leo'], 'The speaker says "I looked inside my lunch box."', 'pov'],
          ['mc', '"A sandwich, plain as paper." What does this comparison tell you?', 'The sandwich seems boring.', [['The sandwich is made of paper.', 'This is a comparison, not a real fact.'], 'The sandwich is very tasty.', 'The sandwich is white.'], 'Plain paper is not exciting, so the speaker thinks the sandwich is boring.', 'device'],
          ['mc', 'How does the speaker feel at the start of the poem?', 'Disappointed', [['Proud', 'The speaker "frowned at what I saw."'], 'Excited', 'Angry at Jada'], 'Frowning shows the speaker is disappointed with the lunch.', 'feeling'],
          ['mc', 'What does Jada do instead of trading?', 'She shares half of her treat.', [['She trades her dumplings for a carrot.', 'She shakes her head at trading.'], 'She eats lunch alone.', 'She gives the speaker a plum.'], 'Jada "gave me half her treat" and says, "Let\'s share."', 'detail'],
          ['ev', 'Which line shows how the speaker changes by the end?', 'My plain old sandwich tastes the best', 'At first the sandwich seemed boring; at the end it tastes the best.', 'evidence'],
          ['mc', 'What lesson does the speaker learn?', 'Sharing with friends makes things better.', [['Always trade for the best food.', 'Jada says they do not need trades.'], 'Plain food is the healthiest.', 'Never bring a plain sandwich to school.'], 'The picnic with friends makes the plain sandwich taste the best.', 'lesson'],
        ] },
    ],
  ];

  // ===================== CHARACTER STORIES =====================
  const STORIES = [
    [ // Grade 2 Starter
      { passage: P('Max and the Missing Shoe', 'Story', `Max was ready for the soccer game. He had his shin guards and his water bottle. But where was his left shoe?

He looked under his bed. He looked in the closet. He even looked in the bathtub! No shoe.

"We have to leave in five minutes," Dad called.

Max sat down on the stairs and took a deep breath. "Where did I take my shoes off?" he asked himself. Then he remembered. He had played catch in the backyard after school.

Max ran outside. There, by the fence, was his left shoe. It was a little wet, but it was there. Max laced it up just as Dad started the car.`, ['⚽', '👟', '🏡'], 'Max looks for his shoe'),
        qs: [
          ['mc', 'What problem does Max have?', 'He cannot find his left shoe.', [['He is late for school.', 'The story is about getting ready for soccer.'], 'He lost his water bottle.', 'His dad cannot find the car keys.'], 'Max has his gear, "But where was his left shoe?"', 'detail'],
          ['mc', 'Where does Max look FIRST?', 'Under his bed', [['In the backyard', 'He finds it in the backyard at the end.'], 'In the closet', 'In the bathtub'], 'The story says, "He looked under his bed" before anywhere else.', 'sequence'],
          ['mc', 'Why does Max sit down and take a deep breath?', 'To calm down and think', [['Because he is tired from soccer', 'The game has not started yet.'], 'Because he found the shoe', 'Because Dad told him to rest'], 'After the deep breath, he asks himself where he took his shoes off.', 'character'],
          ['ev', 'Which sentence tells how Max solved his problem?', 'Then he remembered.', 'Max remembered where he had played, and that is how he found the shoe.', 'evidence'],
          ['mc', 'Why was the shoe wet?', 'It was left outside in the backyard.', [['Max put it in the bathtub.', 'He only looked in the bathtub; the shoe was outside.'], 'Dad washed it before the soccer game.', 'Water spilled on it in the kitchen.'], 'The shoe was outside by the fence, where the ground was wet.', 'inference'],
          ['order', 'Put the events in order.', ['Max cannot find his shoe.', 'Max looks in the bathtub.', 'Max remembers playing catch.', 'Max finds the shoe by the fence.'], 'This is the order of the events in the story.', 'sequence'],
        ] },
      { passage: P('The Biggest Pumpkin', 'Story', `Nora and her grandpa planted pumpkin seeds in May. Every morning, Nora carried a watering can to the garden. Some days it was hot, and some days she wanted to play instead. But she watered the plants anyway.

By September, one pumpkin was bigger than all the rest. It was as big as a beach ball! Nora and Grandpa took it to the town fair.

The judge measured every pumpkin. Nora's pumpkin did not win first place. It won second place and a blue ribbon.

"Are you sad?" Grandpa asked.

Nora smiled. "No way! I grew it myself. Next year, I will water it even more!"`, ['🎃', '🎀', '👴'], 'Nora and her pumpkin'),
        qs: [
          ['mc', 'Who helps Nora plant the seeds?', 'Her grandpa', ['Her teacher', 'The judge', ['Her brother', 'The first sentence tells who planted with Nora.']], 'Nora and her grandpa planted the seeds.', 'detail'],
          ['mc', 'What does Nora do every morning?', 'She waters the pumpkin plants.', [['She goes to the fair with Grandpa.', 'The fair is in September.'], 'She measures the pumpkins.', 'She picks the biggest pumpkin.'], 'She carried a watering can to the garden every morning.', 'detail'],
          ['mc', 'Which word BEST describes Nora?', 'Hardworking', [['Lazy', 'She watered the plants even when she wanted to play.'], 'Shy', 'Bossy'], 'Nora watered the plants every day, even on hot days.', 'character'],
          ['ev', 'Which sentence shows that Nora kept going even when it was hard?', 'But she watered the plants anyway.', 'Even when she wanted to play, she still watered.', 'evidence'],
          ['mc', 'How does Nora feel about winning second place?', 'Proud and happy', [['Sad and upset', 'She says "No way!" when Grandpa asks if she is sad.'], 'Angry at the judge', 'Bored'], 'Nora smiles and says, "I grew it myself."', 'feeling'],
          ['mc', 'What will Nora do next year?', 'Water her pumpkin even more', [['Stop growing pumpkins', 'She is excited to try again.'], 'Ask the judge for first place', 'Buy a pumpkin at the store'], 'Nora says, "Next year, I will water it even more!"', 'detail'],
        ] },
    ],
    [ // Grade 2 Star
      { passage: P("Rosa's Turn", 'Story', `Every Friday, Ms. Patel's class had Show and Share. Each student brought something special to talk about. This week was Rosa's turn, and her stomach felt full of butterflies.

Rosa had brought a seashell from her trip to the beach. It was pink inside, like the sky at sunset. She had practiced what to say with her big sister three times.

When it was her turn, Rosa walked to the front of the room. Her hands shook. For a moment, she could not remember a single word. Then she looked at the shell. She thought about the warm sand and the waves.

"I found this shell on the best day of my summer," Rosa began. The words came more easily after that. When she finished, her friend Eli asked, "Can you hold it up to your ear?" Rosa did, and the whole class leaned in to listen.`, ['🐚', '🏖️', '🧑‍🏫'], 'Show and Share'),
        qs: [
          ['mc', '"Her stomach felt full of butterflies." What does this mean?', 'Rosa felt nervous.', [['Rosa was hungry.', 'This is a saying about a feeling, not food.'], 'Rosa had a pet butterfly.', 'Rosa felt sick from lunch.'], 'Butterflies in your stomach is a way to say you feel nervous.', 'device'],
          ['mc', 'What did Rosa bring to Show and Share?', 'A seashell', ['A photo of the beach', 'A bucket of sand', ['A butterfly', 'The butterflies are a way to describe her feeling.']], 'Rosa brought a seashell from her trip.', 'detail'],
          ['mc', 'How did Rosa get ready for her turn?', 'She practiced with her sister.', [['She asked Eli to talk for her.', 'Eli asks a question at the end.'], 'She wrote a long story.', 'She skipped her turn.'], 'She practiced three times with her big sister.', 'detail'],
          ['ev', 'Which sentence shows the moment Rosa started to feel better?', 'Then she looked at the shell.', 'Looking at the shell helped her remember the beach and find her words.', 'evidence'],
          ['mc', 'Why did the class lean in at the end?', 'They wanted to hear the sound in the shell.', [['They could not see Rosa from their seats.', 'Rosa holds the shell to her ear first.'], 'It was almost time to go to lunch.', 'Ms. Patel told them to.'], 'Eli asked about holding it to her ear, and the class leaned in to listen.', 'inference'],
          ['mc', 'How does Rosa change from the beginning to the end?', 'She goes from nervous to confident.', [['She goes from happy to sad.', 'At the start her hands shook; at the end the words came easily.'], 'She goes from shy to angry at Eli.', 'She stays nervous the whole time.'], 'At first she is nervous; then the words come more easily.', 'character'],
        ] },
      { passage: P('A Note for Coach Lee', 'Story', `Coach Lee had taught the second graders how to jump rope all year. Tomorrow was her last day before she moved to a new town.

"Let's make her a surprise," whispered Omar. The class agreed. But what should they make?

"A cake!" said Zoe. But they could not bake at school.

"A song!" said Ben. But no one could agree on the words.

Then Omar had an idea. Each student would write one sentence about something Coach Lee had taught them. They would tape the sentences onto a long jump rope.

The next morning, the class held up the rope. It stretched across the whole gym. Coach Lee read every sentence. When she reached the end, she wiped her eyes and laughed. "This is the best rope I have ever seen," she said.`, ['🪢', '💌', '🏫'], 'A surprise for the coach'),
        qs: [
          ['mc', 'Why does the class want to make a surprise?', 'Coach Lee is moving away.', [['It is Coach Lee\'s birthday.', 'The story says tomorrow is her last day.'], 'They won a jump rope contest.', 'Omar is moving away.'], 'Tomorrow was her last day before she moved to a new town.', 'detail'],
          ['mc', 'Why didn\'t the class make a cake?', 'They could not bake at school.', [['Coach Lee does not like cake.', 'Zoe\'s idea did not work because of where they were.'], 'Omar said a cake was a bad idea.', 'They did not have enough time to bake.'], 'The story says, "But they could not bake at school."', 'detail'],
          ['order', 'Put the ideas in the order the students said them.', ['a cake', 'a song', 'sentences on a jump rope'], 'Zoe said cake, Ben said song, and then Omar had the jump rope idea.', 'sequence'],
          ['ev', 'Which sentence tells Omar\'s idea?', 'Each student would write one sentence about something Coach Lee had taught them.', 'Omar\'s idea was to write sentences and tape them to a jump rope.', 'evidence'],
          ['mc', 'Why is a jump rope a good choice for the surprise?', 'Coach Lee taught them to jump rope.', [['Jump ropes are easy to buy.', 'Think about what Coach Lee taught all year.'], 'It was the only thing in the gym.', 'Coach Lee asked the class for a new rope.'], 'Coach Lee had taught them jump rope all year, so the rope fits.', 'inference'],
          ['mc', 'How does Coach Lee feel at the end?', 'Touched and happy', [['Angry', 'She laughs and says it is the best rope.'], 'Confused', 'Bored'], 'She wipes her eyes and laughs, which shows she is moved and happy.', 'feeling'],
        ] },
    ],
    [ // Grade 3 Challenge: fables and character traits
      { passage: P('The Turtle Who Wanted Wings', 'Fable', `Long ago, a turtle named Tam watched the geese fly south every autumn. "If only I had wings," Tam sighed. "Then I would be important."

One day, two geese offered to help. "Bite this stick," they said. "We will each hold one end and carry you through the sky." Tam bit down hard, and up they went.

From high above, Tam saw the forest, the river, and the tiny houses of the village. The animals below pointed and cheered. Tam felt very important indeed.

"Look at the flying turtle!" shouted a rabbit. Tam wanted to answer, "Yes, it is I!" But the moment he opened his mouth, he let go of the stick.

Tam tumbled down and landed with a splash in the river. He was not hurt, but he was very wet. As he paddled to shore, Tam smiled. "Perhaps," he said, "I am fine just as I am."`, ['🐢', '🪿', '🌊'], 'Tam flies with the geese'),
        qs: [
          ['mc', 'Why does Tam want wings?', 'He thinks wings would make him important.', [['He wants to go south for the winter.', 'Tam says what he thinks wings would make him.'], 'He is afraid of the animals in the river.', 'The geese told him that turtles should fly.'], 'Tam says, "Then I would be important."', 'character'],
          ['mc', 'How do the geese carry Tam?', 'Tam bites a stick and they hold the ends.', [['Tam rides on a goose\'s back.', 'Read the geese\'s plan in the second paragraph.'], 'They tie Tam to a leaf with a long string.', 'Tam grows wings and flaps beside them.'], 'The geese say, "Bite this stick... We will each hold one end."', 'detail'],
          ['ev', 'Which sentence shows why Tam fell?', 'But the moment he opened his mouth, he let go of the stick.', 'Opening his mouth to brag made him let go of the stick.', 'evidence'],
          ['mc', 'Which word BEST describes Tam when he is in the sky?', 'Proud', [['Scared', 'He feels "very important indeed."'], 'Sleepy', 'Kind'], 'Tam feels very important and wants to show off.', 'character'],
          ['mc', 'What is the moral of the fable?', 'Be happy with who you are.', [['Never trust the geese who offer help.', 'Think about what Tam says at the end.'], 'Always learn to swim before you fly.', 'Rivers are dangerous.'], 'Tam ends by saying, "I am fine just as I am."', 'lesson'],
          ['mc', 'What does the word "tumbled" mean in the story?', 'Fell and rolled over', [['Flew higher', 'He was falling toward the river.'], 'Swam quickly', 'Shouted loudly'], 'Tam let go of the stick and tumbled down into the river.', 'vocab'],
        ] },
      { passage: P("Ava's Brave Idea", 'Story', `The playground at Hill Street School had one big problem: the swings. There were only four of them, and every recess, the same older kids got there first. The younger kids just watched.

Ava was in second grade, and she was tired of watching. But she did not want to start a fight. Instead, she made a plan. She counted how long recess was: twenty minutes. If each person swung for five minutes, sixteen kids could have a turn every day.

Ava wrote her idea on a poster with a big clock drawn on it. Her hands shook as she knocked on the principal's door. Ms. Rivera listened carefully. Then she smiled. "Would you like to explain this to the student council?" she asked.

The next week, a sign-up sheet hung beside the swings. Some older kids grumbled at first. But by Friday, everyone agreed that waiting a few minutes was fair. And Ava finally got her turn to fly.`, ['🛝', '⏰', '📋'], 'Taking turns on the swings'),
        qs: [
          ['mc', 'What is the problem at the playground?', 'The same older kids always get the swings.', [['The swings are broken.', 'There are swings, but the same kids use them.'], 'Recess is too short for everyone to play.', 'There is no teacher on the playground.'], 'Every recess, the same older kids got the four swings first.', 'detail'],
          ['mc', 'Why does Ava make a plan instead of arguing?', 'She does not want to start a fight.', [['She is afraid of the swings.', 'The story tells what she did not want to do.'], 'The principal told her to.', 'She does not like the older kids at all.'], 'The story says, "But she did not want to start a fight."', 'character'],
          ['mc', 'How did Ava figure out that sixteen kids could swing?', 'She used the four swings and five-minute turns in a twenty-minute recess.', [['There are sixteen kids in her second grade class.', 'She used the length of recess and the number of swings.'], 'The principal told her the number.', 'She asked the older kids how many could swing.'], 'With four swings and four five-minute turns, sixteen kids can swing.', 'inference'],
          ['ev', 'Which sentence shows that Ava was nervous?', "Her hands shook as she knocked on the principal's door.", 'Shaking hands show that Ava was nervous.', 'evidence'],
          ['multi', 'Which TWO words describe Ava?', ['brave', 'fair'], ['selfish', 'lazy', 'rude'], 'She spoke up even though she was nervous, and her plan gave everyone a turn.', 'character'],
          ['mc', 'What does "grumbled" mean in the story?', 'Complained quietly', [['Cheered loudly', 'At first the older kids did not like the change.'], 'Ran away', 'Signed their names'], 'The older kids grumbled at first, but later agreed it was fair.', 'vocab'],
        ] },
    ],
  ];

  READ_SKILLS.push(
    { goal: 'lit', id: 'poems', name: 'Poems', icon: '🎵', passage: true, levels: [
      passLevel('Rhymes and rhythm', 'RL.CR.2.1 · RL.TS.2.4', 'Rhyming words and details in poems.', POEMS[0], 'lit', 164),
      passLevel('Stanzas and sound words', 'RL.TS.2.4 · L.VI.2.3', 'Repeated lines, stanzas, and the senses.', POEMS[1], 'lit', 174),
      passLevel('The message of a poem', 'RL.CI.3.2 · L.VI.3.3', 'Speakers, comparisons, and big ideas.', POEMS[2], 'lit', 186),
    ] },
    { goal: 'lit', id: 'characters', name: 'Characters & lessons', icon: '🧒', passage: true, levels: [
      passLevel('Problems and feelings', 'RL.CR.2.1 · RL.IT.2.3', 'What happens and how characters feel.', STORIES[0], 'lit', 164),
      passLevel('How characters change', 'RL.IT.2.3 · RL.CI.2.2', 'Why characters act and how they change.', STORIES[1], 'lit', 176),
      passLevel('Fables and character traits', 'RL.CI.3.2 · RL.IT.3.3', 'Morals and what characters are like.', STORIES[2], 'lit', 188),
    ] },
  );
})();
