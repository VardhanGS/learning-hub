// MAP Reading 4 — Fiction, Poetry, and Drama (all original).
// Standards: NJSLS-ELA 2023, grades 4–5 (RL.CR evidence, RL.CI theme and summary, RL.IT characters and events,
// RL.TS poems, drama, prose, RL.PP point of view, RL.CT comparing texts).
(function () {
  const { P, passLevel, shortLevel } = RK;
  const G = 'lit';

  // ===================== THEME & CHARACTERS =====================
  const STORIES = [
    [ // Grade 4 Starter
      { passage: P('The Volcano That Would Not Erupt', 'Story', `Priya had spent two weeks building her volcano for the science fair. She shaped the mountain out of clay, painted it brown and gray, and tucked a small cup inside the top. On the morning of the fair, she poured in baking soda, added red food coloring, and waited for the judges.

When the first judge arrived, Priya poured vinegar into the cup. Nothing happened. A few tired bubbles rose and popped. The judge waited politely while Priya's face grew hot.

"I'm sorry," Priya said. "It worked at home." She looked at the cup and noticed a wet clump of powder stuck to the bottom. The baking soda had gotten damp overnight and turned into paste.

Instead of giving up, Priya took a deep breath. "I think I know what went wrong," she said. She explained that baking soda needs to stay dry to react quickly, and that the damp powder had already used up some of its fizz. Then she scooped out the paste, added fresh baking soda from her backpack, and tried again.

This time, red foam spilled down the sides of the mountain. The judge smiled and wrote something on her clipboard.

Priya did not win first place. But on her ribbon, the judge had written: "Excellent problem solving."`, ['🌋', '🧪', '🎀'], 'A science fair volcano'),
        qs: [
          ['mc', 'What happened when Priya first poured in the vinegar?', 'Only a few bubbles rose and popped.', [['Red foam spilled down the sides.', 'That happened on the second try.'], 'The clay mountain cracked in half.', 'The judge decided to walk away.'], 'The story says, "Nothing happened. A few tired bubbles rose and popped."', 'detail'],
          ['mc', 'Why did the volcano not erupt the first time?', 'The baking soda had become damp.', [['Priya forgot to add the vinegar.', 'She did pour in vinegar.'], 'The food coloring stopped the fizz.', 'The cup was too small for foam.'], 'The powder "had gotten damp overnight and turned into paste."', 'inference'],
          ['ev', 'Which sentence shows that Priya decided to keep trying?', 'Instead of giving up, Priya took a deep breath.', 'This sentence is the turning point: Priya chooses not to give up.', 'evidence'],
          ['mc', 'Which word BEST describes Priya?', 'Determined', [['Careless', 'She worked for two weeks and fixed the problem.'], 'Boastful', 'Impatient'], 'She figures out the problem and tries again.', 'character'],
          ['mc', 'What is a theme of the story?', 'Fixing a mistake can matter more than winning.', [['Science fairs are not worth the hard work.', 'Think about what the judge praised.'], 'Baking soda is the best part of a volcano.', 'You should always bring two of everything.'], 'Priya does not win, but she is praised for solving the problem.', 'theme'],
          ['mc', 'Why does the author end the story with the note on the ribbon?', 'To show what the judge valued most', [['To explain who won first place', 'The note praises her problem solving.'], 'To show that Priya was still upset', 'To tell how to build a volcano'], 'The note shows the judge valued Priya\'s problem solving.', 'structure'],
        ] },
      { passage: P("Mr. Okafor's Garden Boxes", 'Story', `Every spring, Mr. Okafor planted tomatoes and peppers in the wooden boxes behind his apartment building. Kenji often watched from his window, where he could see Mr. Okafor kneeling in the dirt and humming.

This year, the boxes stayed empty. April passed, then May. One afternoon, Kenji saw Mr. Okafor walking slowly with a cane.

"Are you going to plant your garden?" Kenji asked.

Mr. Okafor shook his head. "My knees won't let me kneel anymore," he said. "Maybe next year."

That night, Kenji couldn't stop thinking about the empty boxes. The next morning, he knocked on Mr. Okafor's door. "What if you tell me what to do," Kenji said, "and I do the kneeling?"

For the rest of the spring, they worked together. Mr. Okafor sat in a folding chair and explained how deep to dig and how far apart to space the seeds. Kenji did the digging and watering. When a storm knocked over the young pepper plants, Kenji tied them to sticks the way Mr. Okafor showed him.

By August, the boxes were overflowing. Mr. Okafor handed Kenji the first ripe tomato. "You grew this," he said.

"We grew it," Kenji answered.`, ['🍅', '🌶️', '🪑'], 'A garden behind the building'),
        qs: [
          ['mc', 'Why were the garden boxes empty this year?', "Mr. Okafor's knees made kneeling too hard.", [['Mr. Okafor had moved to a new building.', 'He still lived there; something kept him from planting.'], 'A storm had broken all of the boxes.', 'Kenji had already planted flowers there.'], 'He says, "My knees won\'t let me kneel anymore."', 'detail'],
          ['mc', 'What does Kenji offer to do?', 'Do the kneeling while Mr. Okafor gives directions', [['Buy vegetables for Mr. Okafor at the store', 'Kenji wants to help him plant his own garden.'], 'Plant flowers in the boxes by himself', 'Fix the boxes so they are taller'], 'Kenji says, "What if you tell me what to do, and I do the kneeling?"', 'detail'],
          ['ev', 'Which sentence shows that Kenji kept thinking about the problem?', "That night, Kenji couldn't stop thinking about the empty boxes.", 'He could not stop thinking about the boxes, so he came up with a plan.', 'evidence'],
          ['mc', 'How does Mr. Okafor help with the garden?', 'He explains how to dig and space the seeds.', [['He does all of the digging himself.', 'Kenji does the digging and watering.'], 'He pays Kenji to water the plants.', 'He builds new, taller boxes for the whole garden.'], 'He sits in a chair and explains how deep to dig and how far apart to plant.', 'detail'],
          ['mc', 'Why does Kenji say, "We grew it"?', 'They both did important parts of the work.', [['He wants to take credit for the tomato.', 'Think about who gave directions and who dug.'], 'He did not want the tomato after all.', 'Mr. Okafor did not do anything at all.'], 'Mr. Okafor gave the knowledge and Kenji did the work, so they grew it together.', 'inference'],
          ['mc', 'What is a theme of the story?', 'People can do more when they work together.', [['Gardens are too much work for one person.', 'The story shows two people sharing the work.'], 'Older people should not try to garden.', 'Storms are the biggest danger to plants.'], 'Together, Kenji and Mr. Okafor grow a full garden.', 'theme'],
        ] },
    ],
    [ // Grade 4 Star
      { passage: P('Second Chair', 'Story', `When the orchestra list went up on the music room door, Sofia found her name right away: Violin, Second Chair. Her best friend Mateo's name was above hers. First Chair.

Sofia smiled and congratulated him, but inside she felt like a balloon slowly losing air. She had practiced every night for a month. Mateo had practiced too, of course, but she had been so sure.

At the first rehearsal, Sofia barely looked at Mateo. She played her part a little too loudly, as if she could prove that she deserved his seat. Ms. Delgado tapped her baton on the stand. "Second violins," she said, "you're not the melody here. You're the floor the melody stands on."

Sofia frowned. A floor? Nobody listened to a floor.

But that night, she listened to a recording of the piece. She heard the first violins soar above the rest, and then, underneath them, she heard something steady and warm. It was the second violins, holding the whole song together. Without them, the melody sounded thin, like a voice singing alone in an empty room.

At the next rehearsal, Sofia played softly and evenly. When the piece ended, Mateo turned around. "That sounded amazing," he whispered. "I could hear you keeping us together."

For the first time all week, Sofia smiled for real.`, ['🎻', '🎼', '🪑'], 'The school orchestra'),
        qs: [
          ['mc', '"Inside she felt like a balloon slowly losing air." What does this show about Sofia?', 'She felt disappointed even though she smiled.', [['She was excited for Mateo\'s good news.', 'Her smile on the outside does not match how she feels inside.'], 'She felt sick and needed to go home.', 'She was angry at Ms. Delgado for the list.'], 'A balloon losing air shows her happiness draining away.', 'device'],
          ['mc', 'Why does Sofia play too loudly at the first rehearsal?', 'She wants to prove she deserves first chair.', [['Ms. Delgado asked her to play louder.', 'Read the sentence right after she plays loudly.'], 'She cannot hear the rest of the orchestra.', 'She wants Mateo to hear her mistakes.'], 'She played "as if she could prove that she deserved his seat."', 'character'],
          ['mc', 'What does Ms. Delgado mean by "the floor the melody stands on"?', 'The second violins support the main tune.', [['The second violins sit on the floor.', 'This is a comparison, not a fact about where they sit.'], 'The second violins should play the melody.', 'The second violins are the least important.'], 'A floor holds things up, just as the second violins support the melody.', 'device'],
          ['ev', 'Which sentence shows when Sofia begins to understand her part?', 'It was the second violins, holding the whole song together.', 'Hearing the recording, she realizes how important her part is.', 'evidence'],
          ['mc', 'How does Sofia change from the beginning to the end?', 'She goes from jealous to proud of her role.', [['She goes from proud to embarrassed by the orchestra.', 'At the end she smiles "for real."'], 'She goes from shy to bossy with Mateo.', 'She does not change during the week.'], 'She starts out jealous of Mateo and ends up proud of supporting the orchestra.', 'character'],
          ['mc', 'Which statement BEST expresses the theme?', 'Every part of a team matters, even the quiet ones.', [['The loudest player is always the best player.', 'Think about what Sofia learns from the recording.'], 'Best friends should never compete with each other.', 'Practicing every night guarantees first place.'], 'Sofia learns that the second violins hold the song together.', 'theme'],
        ] },
      { passage: P('The Night the Lights Went Out', 'Story', `The storm began right after dinner. Thunder rattled the windows, and then, with a loud pop, every light in the house went dark.

"Great," said Dev's older sister, Anika. "No internet, no TV, no anything."

Dad found a flashlight and three candles. Mom set them on the kitchen table, and the family sat in the flickering light, listening to the rain.

At first, no one talked. Dev kept checking his tablet out of habit, even though the battery was low and there was nothing to load. Anika sighed loudly every few minutes.

Then Grandma, who was visiting from Pune, cleared her throat. "When I was your age," she said, "the power went out nearly every week during the monsoon. Do you know what we did?"

Dev shook his head.

"We told stories." And she began one about a clever monkey who outsmarted a crocodile to save his friends. She made the crocodile's voice deep and grumbly and the monkey's voice quick and squeaky. Soon Anika was laughing. Dev scooted closer.

When Grandma finished, Dad told a story about getting lost at a county fair when he was seven. Then Anika made up a story about a haunted refrigerator. Dev laughed so hard his stomach hurt.

At ten o'clock, the lights blinked back on. Everyone groaned. "Can we turn them off again?" Dev asked.`, ['🕯️', '⛈️', '👵'], 'Stories by candlelight'),
        qs: [
          ['mc', 'How do Dev and Anika feel right after the lights go out?', 'Bored and annoyed', [['Scared of the thunder and the dark', 'Look at what Anika says and how she sighs.'], 'Excited for a special family night', 'Hungry because dinner was not ready'], 'Anika complains and sighs; Dev keeps checking his tablet.', 'feeling'],
          ['mc', 'Why does Grandma start telling a story?', 'She remembers what her family did in the dark.', [['Dev asks her to tell a story before bedtime.', 'Grandma starts on her own.'], 'She wants everyone to go to sleep.', 'The flashlight battery runs out.'], 'She says the power went out often when she was young, and they told stories.', 'inference'],
          ['ev', 'Which sentence shows that Dev is starting to enjoy the evening?', 'Dev scooted closer.', 'Moving closer shows Dev is interested in the story.', 'evidence'],
          ['mc', 'Why does the author describe the different voices Grandma uses?', 'To show how lively and fun her storytelling is', [['To explain why Grandma is visiting from Pune', 'The voices make the story exciting.'], 'To prove that crocodiles can really talk', 'To show that Grandma is tired and grumpy'], 'The funny voices make Anika laugh and Dev scoot closer.', 'purpose'],
          ['mc', 'What does Dev\'s question at the end show?', 'He enjoyed the time without electricity.', [['He is afraid the storm will come back.', 'He wants the lights OFF again.'], 'He wants to go to bed right away.', 'He thinks the lights are too bright.'], 'He wants to turn the lights off again so the stories can continue.', 'inference'],
          ['mc', 'What is the theme of the story?', 'Simple time together can be better than screens.', [['Storms are the most dangerous kind of weather.', 'Think about how the family changes during the night.'], 'Grandparents always know the best stories.', 'Everyone should own a big flashlight.'], 'Without screens, the family discovers the fun of telling stories together.', 'theme'],
        ] },
    ],
    [ // Grade 5 Challenge
      { passage: P('The Map in the Attic', 'Story', `Zara had always thought of her grandmother's attic as a place where old things went to be forgotten. But on the rainy Saturday she was sent up to find a box of winter blankets, she found something else: a long cardboard tube with her grandmother's maiden name written on it in faded ink.

Inside was a hand-drawn map. It wasn't a map of any country Zara knew. It showed a small town with crooked streets, a bakery shaped like a loaf of bread, a river curling like a ribbon, and dozens of tiny houses, each one labeled with a family name.

"That's Deir al-Asal," Grandma said when Zara carried it downstairs. Her voice was quiet. "The village where I grew up. I drew it the year we left, so I would never forget it."

She traced the streets with one finger as if she were walking them. Here was the well where children dared each other to lean over the edge. There was the olive tree her father had planted the day she was born. The bakery, she said, opened before sunrise, and the whole village woke to the smell of bread.

"Is it still there?" Zara asked.

Grandma was quiet for a long moment. "Some of it," she said. "Mostly, it lives here now." She touched the map, and then her own heart.

That evening, Zara found a blank sheet of paper and a pencil. She began to draw her own neighborhood: the corner store, the basketball court, the maple tree outside her window. Grandma watched over her shoulder and smiled.

"Label everything," she said. "One day, someone will want to know."`, ['🗺️', '🏘️', '🫒'], 'A hand-drawn village map'),
        qs: [
          ['mc', 'What does Zara think about the attic at the beginning?', 'It is where old things are forgotten.', [['It is the best place in the house to play.', 'Read the first sentence.'], 'It is full of treasure from long ago.', 'It is a scary place she will not enter.'], 'She "thought of her grandmother\'s attic as a place where old things went to be forgotten."', 'detail'],
          ['mc', 'Why did Grandma draw the map?', 'So she would never forget her village', [['So she could find her way back home', 'Grandma explains her reason right away.'], 'So she could sell it to a museum', 'So Zara could learn to draw maps'], 'She says, "I drew it the year we left, so I would never forget it."', 'detail'],
          ['mc', 'What does Grandma mean when she touches the map and then her heart?', 'The village lives on in her memories.', [['She is feeling sick and needs to rest.', 'She says the village "mostly lives here now."'], 'She wants Zara to keep the map in a safe place.', 'The village has been moved to a new country.'], 'Touching her heart shows the village now lives in her memory.', 'inference'],
          ['ev', 'Which sentence BEST shows how strongly Grandma remembers the village?', 'She traced the streets with one finger as if she were walking them.', 'Tracing the streets "as if she were walking them" shows how vivid her memories are.', 'evidence'],
          ['mc', 'Why does Zara start drawing her own neighborhood?', "Grandma's map shows her why places are worth remembering.", [['She wants to make a better and bigger map than Grandma did.', 'Think about what she learns from Grandma\'s story.'], 'Her teacher gave her a map assignment.', 'She is bored because it is raining outside.'], 'After hearing about the village, Zara wants to record her own place.', 'character'],
          ['multi', 'Which TWO statements express themes of the story?', ['Memories of a place can stay with us after we leave.', 'Recording our lives helps others understand them later.'], ['Attics are good places to store blankets.', 'Rainy days are the best days for exploring.', 'Old things should always be thrown away.'], 'Grandma\'s memories and her advice to "label everything" show both themes.', 'theme'],
        ] },
      { passage: P('Comet', 'Story', `The first time Omar volunteered at the animal shelter, every dog in the hallway barked and pressed its nose to the bars. Every dog except one.

In the last kennel, a skinny gray dog lay curled in the corner with his back to the door. The card on his kennel read: COMET. AGE 3. SHY. NEEDS PATIENCE.

"He came in from the street two months ago," said Ms. Reyes, the shelter manager. "Nobody's been able to get near him."

Omar was not a patient person. He liked fast games and fast answers. But something about the gray dog made him want to try. Every Saturday, he sat on the floor outside Comet's kennel and read aloud from whatever book he had in his backpack. He did not reach in. He did not call the dog's name. He just read.

For three Saturdays, Comet did not move. On the fourth, one ear turned toward Omar's voice. On the sixth, Comet lifted his head. On the eighth, he crept across the kennel and lay down on the other side of the bars, close enough that Omar could hear him breathing.

Omar held his breath. Slowly, he slid two fingers through the bars. Comet sniffed them for a long time. Then he licked them, once.

"Well," said Ms. Reyes, who had been watching from the doorway. "I've worked here for eleven years, and I've never seen that." She paused. "Maybe the card should say something different now."

The next week, Comet's card had a new line: LIKES STORIES.`, ['🐕', '📚', '🏠'], 'Reading at the animal shelter'),
        qs: [
          ['mc', 'How is Comet different from the other dogs at first?', 'He stays curled in the corner and ignores visitors.', [['He barks louder than all the other dogs.', 'Every dog barks "except one."'], 'He jumps up and presses his nose to the bars.', 'He is the biggest and oldest dog there.'], 'Comet lies in the corner with his back to the door.', 'detail'],
          ['mc', 'Why is it surprising that Omar keeps visiting Comet?', 'Omar is usually not a patient person.', [['Omar is afraid of all dogs.', 'Read what the story says about Omar\'s personality.'], 'Omar does not like to read books.', 'Ms. Reyes told him to stay away.'], 'The story says "Omar was not a patient person."', 'character'],
          ['order', 'Put Comet\'s changes in the order they happen.', ['One ear turns toward Omar.', 'Comet lifts his head.', 'Comet lies down near the bars.', 'Comet licks Omar\'s fingers.'], 'The story moves through the Saturdays in order.', 'sequence'],
          ['ev', 'Which sentence shows that Omar was careful not to scare Comet?', 'He did not reach in.', 'Not reaching in shows he gave Comet space.', 'evidence'],
          ['mc', 'Why does Ms. Reyes say the card "should say something different now"?', 'Comet has changed because of Omar\'s patience.', [['Comet is going to be adopted that day.', 'Think about what Comet just did.'], 'The old card had the wrong age on it.', 'Ms. Reyes wants Omar to stop visiting.'], 'Comet trusted Omar enough to lick his fingers, so "SHY" no longer fits.', 'inference'],
          ['mc', 'How does the structure of the story build toward its ending?', 'It counts the Saturdays to show slow, steady progress.', [['It jumps back and forth between the past and the present.', 'The story moves forward week by week.'], 'It tells the ending first and then explains how it happened.', 'It switches the narrator in each paragraph.'], 'Counting the Saturdays shows how slowly Comet learns to trust.', 'structure'],
        ] },
    ],
  ];

  // ===================== POEMS & PLAYS =====================
  const PD = [
    [ // Grade 4 Starter: poems (verse, stanza, rhythm, rhyme)
      { passage: P('Recipe for Autumn', 'Poem', `Take one cup of crispy air,
A pinch of chill to tease your hair,
A bowl of leaves in red and gold,
And mix them till the day turns cold.

Add apples picked from orchard rows,
A scarf to warm a pinkish nose,
Then stir in geese that honk and fly
Across a wide and pearl-gray sky.

Now bake it slow in amber light,
And let it cool through starry night.
Serve warm with cider, sweet and brown:
Autumn's ready, all over town!`, ['🍂', '🍎', '🧣'], 'Autumn ingredients'),
        qs: [
          ['mc', 'Why does the poet write the poem like a recipe?', 'To describe autumn as a mix of many things', [['To teach readers how to bake an apple pie', 'The "ingredients" are air, leaves, and geese.'], 'To list the foods that people eat in fall', 'To show that autumn is a kind of soup'], 'The poem lists parts of autumn as if they were ingredients.', 'device'],
          ['mc', 'How many stanzas are in the poem?', 'Three', [['Twelve', 'Twelve is the number of lines.'], 'Four', 'Six'], 'The poem has three groups of four lines.', 'structure'],
          ['mc', 'What is the rhyme pattern in each stanza?', 'Pairs of lines rhyme with each other.', [['Every line ends with the same sound.', 'Look at "air/hair" and "gold/cold."'], 'None of the lines in the stanza rhyme.', 'Only the first and last lines rhyme.'], 'Lines 1 and 2 rhyme, then lines 3 and 4: air/hair, gold/cold.', 'device'],
          ['ev', 'Which line uses the sense of hearing?', 'Then stir in geese that honk and fly', 'You can hear geese "honk."', 'evidence'],
          ['mc', 'What does "pearl-gray" describe?', 'The color of the sky', [['The color of the apples', 'Read the whole line: "pearl-gray sky."'], 'The color of the geese', 'The color of the cider'], '"A wide and pearl-gray sky" describes the sky.', 'vocab'],
          ['mc', 'What is the main difference between this poem and a real recipe?', 'Its "ingredients" are feelings and sights, not foods.', [['It is much shorter than the recipes in a cookbook.', 'Think about what is being "mixed."'], 'It does not have any steps to follow.', 'It tells you to use the oven.'], 'The ingredients are things like crispy air and honking geese.', 'compare'],
        ] },
      { passage: P('The Bridge', 'Poem', `I am the bridge
over the slow brown river.

Trucks rumble across my back
before the sun is up.
Bicycles hum.
Children stop in the middle
to drop sticks on one side
and race to the other
to see whose stick wins.

At night, I hold up the lights
like a necklace
for the water to wear.

I do not go anywhere.
But everything goes
because of me.`, ['🌉', '🚚', '🌊'], 'A bridge over a river'),
        qs: [
          ['mc', 'Who is the speaker of the poem?', 'The bridge', [['A child dropping sticks', 'Read the first line: "I am the bridge."'], 'A truck driver', 'The river'], 'The poem begins, "I am the bridge."', 'pov'],
          ['mc', 'How is this poem different from "Recipe for Autumn"?', 'It does not use a regular rhyme pattern.', [['It has more rhyming words in every stanza.', 'Look at the ends of the lines.'], 'It is written as one long paragraph.', 'It does not have any line breaks.'], 'This is free verse: its lines do not follow a rhyme pattern.', 'structure'],
          ['mc', 'What does the bridge compare its lights to?', 'A necklace', [['A row of stars', 'Find the word "like" in the third stanza.'], 'A string of sticks', 'A bicycle bell'], '"I hold up the lights like a necklace."', 'device'],
          ['ev', 'Which line shows the bridge\'s main point about itself?', 'because of me.', 'The bridge says everything moves "because of me" even though it stays still.', 'evidence'],
          ['mc', 'What does "Bicycles hum" help the reader imagine?', 'The soft sound of bikes rolling across', [['Bicycles singing a song together', 'Bikes cannot really sing. Think about the sound.'], 'Bicycles that are broken and noisy', 'Bicycles parked on the bridge at night'], '"Hum" describes a soft, steady sound.', 'device'],
          ['mc', 'What is the central message of the poem?', 'Things that stay still can still help everything move.', [['Bridges are dangerous places for children.', 'Read the last stanza.'], 'Rivers are slower than trucks or bicycles.', 'Nighttime is the best time for trucks to cross a bridge.'], 'The bridge does not go anywhere, but everything goes because of it.', 'theme'],
        ] },
    ],
    [ // Grade 4 Star: drama
      { passage: P('The Missing Library Book', 'Play', `CAST: MAYA, a fourth grader · LEO, her younger brother · MS. CHEN, the school librarian

SETTING: The school library, just before the morning bell.

(MAYA rushes in, out of breath. LEO follows, dragging his backpack.)

MAYA: Ms. Chen, I have to tell you something. I lost the book about volcanoes. I've looked everywhere.

MS. CHEN: (calmly) Where did you last see it?

MAYA: On the kitchen table. Then it was gone. I think I left it on the bus.

LEO: (quietly, looking at his shoes) Um. Maya?

MAYA: (ignoring him) I'll pay for it with my allowance. I know it's my fault.

LEO: (louder) Maya!

MAYA: What, Leo?

LEO: (unzipping his backpack and pulling out the book) I borrowed it. I wanted to see the pictures of lava. I'm sorry I didn't ask.

(MAYA stares at the book, then at LEO. MS. CHEN tries not to smile.)

MS. CHEN: Well, it seems the volcano erupted from an unexpected place.

MAYA: (laughing) Next time, ask first. And next time, I'll read it to you.`, ['📕', '🌋', '🎭'], 'A scene in the library'),
        qs: [
          ['mc', 'What is the purpose of the words in parentheses?', 'They tell how characters move and speak.', [['They are lines that the audience reads aloud.', 'These are stage directions, not spoken lines.'], 'They show what Ms. Chen is thinking about.', 'They give the setting of the next scene.'], 'Stage directions like "(calmly)" tell actors how to move and speak.', 'structure'],
          ['mc', 'Which part of the play tells where the action happens?', 'The setting line', [['The cast list', 'The cast list names the characters.'], 'The first stage direction', 'Maya\'s first line'], '"SETTING: The school library" tells where it happens.', 'structure'],
          ['mc', 'Why does Leo look at his shoes and speak quietly?', 'He feels guilty about taking the book.', [['He is too tired to talk to the librarian.', 'Think about what he is about to admit.'], 'He is scared of Ms. Chen.', 'He does not like the library.'], 'He is about to admit he borrowed the book without asking.', 'inference'],
          ['ev', 'Which line shows that Maya is willing to take responsibility?', "MAYA: (ignoring him) I'll pay for it with my allowance.", 'Maya offers to pay with her own allowance.', 'evidence'],
          ['mc', 'What does Ms. Chen mean by "the volcano erupted from an unexpected place"?', 'The book showed up somewhere no one expected.', [['A real volcano erupted near the school.', 'She is making a joke about the volcano book.'], 'Leo is about to start crying.', 'The book was damaged by lava.'], 'She jokes that the volcano book "erupted" out of Leo\'s backpack.', 'device'],
          ['mc', 'How is reading a play different from reading a story?', 'A play uses dialogue and stage directions instead of a narrator.', [['A play does not have any characters in it.', 'This play has a cast of three.'], 'A play is always written as a long poem that rhymes.', 'A play never has a problem to solve.'], 'Plays show the story through what characters say and stage directions.', 'compare'],
        ] },
      { passage: P('Partners', 'Play', `CAST: JADA · SAM · A CUSTOMER

SETTING: A lemonade stand on a hot July afternoon. A sign reads: LEMONADE 50¢.

(JADA arranges cups in a perfect row. SAM sits on a cooler, fanning himself with the sign's corner.)

JADA: We've sold four cups. Four! At this rate we'll never earn enough for the new basketball.

SAM: Maybe people don't like plain lemonade.

JADA: Everybody likes plain lemonade.

SAM: (standing up) What if we added strawberries? My grandma puts them in hers. It turns pink.

JADA: (crossing her arms) That's not real lemonade.

(A CUSTOMER walks up, wiping her forehead.)

CUSTOMER: Do you have anything... different? I've had plain lemonade at three stands today.

(JADA and SAM look at each other.)

SAM: (slowly) We could have pink lemonade. In five minutes.

JADA: (after a pause, uncrossing her arms) Sam, get the strawberries. I'll make a new sign.

(Lights dim. When they rise, the sign reads PINK LEMONADE 75¢. A line of customers stretches off stage.)

JADA: (to SAM) Okay. Your idea was good.

SAM: Our stand was good. My idea just helped.`, ['🍋', '🍓', '🏀'], 'A lemonade stand'),
        qs: [
          ['mc', 'What problem do Jada and Sam have at the start?', 'They are not selling enough lemonade.', [['They have run out of cups for the stand.', 'Jada says they have sold only four cups.'], 'The sign blew away in the wind.', 'Their lemonade is too sour to drink.'], 'Jada says, "We\'ve sold four cups... we\'ll never earn enough."', 'detail'],
          ['mc', 'What does the stage direction "(crossing her arms)" show about Jada?', 'She does not like Sam\'s idea.', [['She is cold even though it is July.', 'Think about what crossing your arms can show.'], 'She is getting ready to make lemonade.', 'She is waving to the customer.'], 'Crossing her arms shows she disagrees with Sam.', 'inference'],
          ['ev', 'Which line shows that Jada changes her mind?', "JADA: (after a pause, uncrossing her arms) Sam, get the strawberries.", 'Uncrossing her arms and asking for strawberries shows she accepts the idea.', 'evidence'],
          ['mc', 'What causes Jada to change her mind?', 'A customer asks for something different.', [['Sam promises to pay for the basketball.', 'Read what happens just before she changes her mind.'], 'Her grandma calls to give advice.', 'They run out of plain lemonade.'], 'The customer says she has had plain lemonade at three stands.', 'structure'],
          ['mc', 'What does the stage direction about the lights show?', 'Time has passed and the stand is now busy.', [['A storm is coming and it is getting dark.', 'When the lights rise, there is a long line.'], 'The play is over and everyone goes home.', 'The customer has turned off the lights.'], 'The lights dim and rise to show time passing.', 'structure'],
          ['mc', 'What does Sam\'s last line show about him?', 'He cares more about the team than credit.', [['He wants Jada to admit she was wrong.', 'He says "Our stand was good."'], 'He wants to quit the stand.', 'He thinks his idea did not help at all.'], 'Sam shares the success: "Our stand was good. My idea just helped."', 'character'],
        ] },
    ],
    [ // Grade 5 Challenge: how parts fit together; comparing versions
      { passage: P('Two Tellings of the Weaver', 'Two texts', `Text 1: A Story
Long ago, a weaver named Ama lived at the edge of a village. She was poor, but her cloth was the finest anyone had seen. One day, the chief demanded a cloth woven from moonlight. "If you cannot make it by the new moon," he said, "you must leave the village."

Ama did not argue. Each night, she sat by the river and wove while the moon shone on the water. She wove its silver reflection into her threads. When the new moon came, she laid a shimmering cloth at the chief's feet. The chief was so ashamed of his unfair demand that he made Ama the village's honored weaver.

Text 2: A Poem
Ama sat where the river turned,
Her shuttle quick, her fingers sure,
While silver from the moonlight burned
Upon the water, cold and pure.

The chief had asked for something wild,
A thing no one could hope to make.
But Ama only bent and smiled
And wove the moon from off the lake.`, ['🧵', '🌙', '🏞️'], 'Weaving by moonlight'),
        qs: [
          ['mc', 'What do BOTH texts describe?', 'Ama weaving moonlight from the river', [['The chief punishing the whole village', 'Look for what appears in the story and the poem.'], 'Ama leaving the village forever', 'Ama teaching the chief to weave'], 'Both tell how Ama wove the moon\'s reflection on the water.', 'compare'],
          ['mc', 'What information is in Text 1 but NOT in Text 2?', 'How the chief reacts to the finished cloth', [['That Ama sat by the river to weave', 'Both texts say she wove by the river.'], 'That the chief asked for something impossible', 'That the moon shone on the water'], 'Only the story tells that the chief was ashamed and honored Ama.', 'compare'],
          ['mc', 'How does the structure of Text 2 differ from Text 1?', 'It uses rhyming stanzas instead of paragraphs.', [['It tells the events in a different order.', 'Both tell the events in order.'], 'It is told by the chief instead of a narrator.', 'It has more characters and more dialogue.'], 'The poem has two rhyming stanzas; the story has paragraphs.', 'structure'],
          ['ev', 'Which line from the poem shows that the chief\'s request was unfair?', 'A thing no one could hope to make.', 'The poem calls the request something no one could make.', 'evidence'],
          ['mc', 'What does "her fingers sure" suggest about Ama?', 'She is skilled and confident.', [['She is nervous about the chief.', '"Sure" fingers do not hesitate.'], 'She has hurt her hands.', 'She is weaving very slowly.'], 'Sure fingers move with confidence and skill.', 'vocab'],
          ['mc', 'Which theme do both texts share?', 'Patient skill can overcome an unfair challenge.', [['Rivers are the best place to work at night.', 'Think about how Ama answers the chief.'], 'Leaders are always fair to their people.', 'The moon is too far away to reach.'], 'Ama calmly uses her skill to meet an impossible demand.', 'theme'],
        ] },
      { passage: P('The Long Way Home', 'Story', `Scene 1: Morning
Luis checked his watch for the third time. The bus to his cousin's quinceañera left at noon, and his mother had made him promise to walk his little sister, Rosa, to Grandpa's first. "Take the long way, by the park," his mother had said. "She likes the ducks."

Luis did not want to take the long way. He wanted to take the shortcut through the parking lot.

Scene 2: The Park
Rosa stopped at every bench, every flower, every puddle. At the pond, she pulled bread from her pocket and fed the ducks one crumb at a time. "Hurry up," Luis groaned. Rosa looked at him with wide eyes. "Mama said you like the ducks too," she said. "When you were little."

Luis didn't remember that. But when a small brown duckling waddled right up to his shoe, he found himself crouching down and holding out a crumb.

Scene 3: Grandpa's Porch
They reached Grandpa's house at 11:40. Luis was sweaty, and his good shoes were muddy. Grandpa laughed. "The long way?" he asked.

"The long way," Luis said. And to his own surprise, he was smiling.`, ['🦆', '🌳', '👟'], 'A walk through the park'),
        qs: [
          ['mc', 'Why does the author divide the story into scenes?', 'To show the walk in stages, each in a new place', [['To show that three different narrators tell it', 'Each scene has a place in its title.'], 'To skip over the most important part', 'To show that the events happen on different days'], 'The scenes move from morning, to the park, to Grandpa\'s porch.', 'structure'],
          ['mc', 'How does Scene 1 prepare the reader for Scene 2?', 'It shows that Luis does not want to take the long way.', [['It explains why Rosa likes ducks so much.', 'Scene 1 sets up Luis\'s problem.'], 'It describes the parking lot shortcut in detail.', 'It introduces Grandpa as the main character.'], 'Luis wanting the shortcut sets up his impatience in the park.', 'structure'],
          ['ev', 'Which sentence in Scene 2 is the turning point for Luis?', 'But when a small brown duckling waddled right up to his shoe, he found himself crouching down and holding out a crumb.', 'This is when Luis stops hurrying and joins in.', 'evidence'],
          ['mc', 'What does Rosa\'s comment about the ducks reveal?', 'Luis once enjoyed the same things she does.', [['Rosa wants Luis to buy her more bread.', 'She says he liked the ducks when he was little.'], 'Mama wants them to be late on purpose.', 'Luis is afraid of the ducks.'], 'Rosa reminds Luis that he liked the ducks when he was little.', 'inference'],
          ['mc', 'How is Luis in Scene 3 different from Luis in Scene 1?', 'He is happy he took the long way.', [['He is angry that his shoes are muddy.', 'He is smiling "to his own surprise."'], 'He is worried about missing the bus.', 'He is tired and wants to go to sleep.'], 'In Scene 1 he wanted the shortcut; in Scene 3 he is smiling.', 'character'],
          ['mc', 'What is the theme of the story?', 'Slowing down can help you enjoy life.', [['Shortcuts are always the smartest choice.', 'Think about why Luis is smiling.'], 'Little sisters are hard to take care of.', 'Ducks should not be fed bread.'], 'Taking the long way helps Luis enjoy the walk with Rosa.', 'theme'],
        ] },
    ],
  ];

  // ===================== POINT OF VIEW (short excerpts) =====================
  const X = (title, text, icons, q, a, ws, why, tag = 'pov', dif = 0) => ({ passage: P(title, 'Excerpt', text, icons), dif, qs: [['mc', q, a, ws, why, tag]] });
  const FIRST = 'First person: the narrator is a character in the story.', THIRD = 'Third person: the narrator is outside the story.';
  const POV0 = [
    X('The Tryout', 'My hands were shaking as I stepped onto the court. I could hear my heart thumping louder than the bouncing basketballs. Coach blew the whistle, and I took my first shot.', ['🏀'], 'From which point of view is this told?', FIRST, [[THIRD, 'Look for the words "I" and "my."'], 'Second person: the narrator speaks to "you."', 'No point of view: it is only dialogue.'], 'The narrator uses "I" and "my," so the narrator is in the story.'),
    X('The Kite', 'Mira ran across the field, pulling the kite string behind her. The wind caught the red kite and lifted it high above the trees. She laughed and let out more string.', ['🪁'], 'From which point of view is this told?', THIRD, [[FIRST, 'The narrator says "she" and "her," not "I."'], 'Second person: the narrator speaks to "you."', 'No point of view: it is only dialogue.'], 'The narrator uses "she" and "her," telling about Mira from outside.'),
    X('Moving Day', 'We packed the last box into the truck. I looked back at our old house, at the window of my bedroom, and tried to remember every detail.', ['📦'], 'Which word is the BEST clue to the point of view?', '"I"', [['"truck"', 'Look for a pronoun that shows who is telling the story.'], '"house"', '"window"'], '"I" shows that the narrator is a character in the story.'),
    X('The Storm', 'The wind howled outside. Grandpa lit a candle, and the twins huddled under a blanket. None of them said a word as the thunder rolled.', ['⛈️'], 'Who is telling this story?', 'A narrator who is not one of the characters', [['Grandpa, who lights the candle', 'The narrator calls him "Grandpa," not "I."'], 'One of the twins, who is scared of the thunder', 'The wind, which is howling'], 'The narrator describes everyone with "he," "they," and names.'),
    X('Lunch Line', 'I always grab the last chocolate milk. Today, though, the kid in front of me took it. I almost said something, but then I saw his face. He looked like he needed it more than I did.', ['🥛'], 'What can the narrator know because of this point of view?', "The narrator's own thoughts and feelings", [['What every person in the cafeteria is thinking', 'A first-person narrator only knows his own mind.'], 'What will happen tomorrow at lunch', 'How the other kid feels inside'], 'A first-person narrator shares his own thoughts but must guess about others.'),
    X('The Garden Gate', 'Elena pushed open the creaky gate. She had never been inside Mrs. Park\'s garden before. Mrs. Park, watching from the kitchen window, smiled for the first time in weeks.', ['🌷'], 'What does this third-person narrator show that a first-person Elena could NOT?', 'That Mrs. Park smiled from the window', [['That Elena pushed open the gate', 'Elena could tell that herself.'], 'That the gate was creaky', 'That Elena had never been in the garden'], 'Elena could not see Mrs. Park smile inside; the outside narrator can.'),
    X('Recess', 'You step onto the playground, and the noise hits you like a wave. You look for your friends, but everyone is running too fast to see.', ['🛝'], 'Which point of view is used here?', 'Second person: the narrator speaks to "you."', [[FIRST, 'Look at the word the narrator uses for the main character.'], THIRD, 'It is a conversation between two people.'], 'The narrator uses "you," which is second person.', 'pov', 2),
    X('Spelling Bee', 'Theo stared at the word on the card. He knew it. He had practiced it a hundred times. But in front of the whole school, the letters scrambled in his head like puzzle pieces.', ['🐝'], 'How does the third-person narrator help readers understand Theo?', 'It tells what Theo is thinking and feeling.', [['It lets Theo speak directly to the reader.', 'Theo does not say "I."'], 'It hides how Theo feels from the reader.', 'It tells the story from the judge\'s view.'], 'The narrator shares Theo\'s thoughts: "He knew it."'),
  ];
  const POV1 = [
    X('Two Views of the Game', 'Account A: I scored the winning goal! I could not believe it when the ball hit the net.\nAccount B: Aisha\'s kick was lucky. The goalie slipped on the wet grass just before she kicked.', ['⚽'], 'How do the two accounts differ?', 'A is proud of the goal; B says it was luck.', [['A and B agree that the goalie made a mistake.', 'Account A never mentions the goalie.'], 'A is about soccer; B is about baseball.', 'Both are told by Aisha herself.'], 'Account A celebrates; Account B credits the goalie slipping.', 'compare'),
    X('The New Teacher', 'I think Mr. Santos is strict. He made us redo our homework. But my brother says Mr. Santos is the best teacher he ever had, because he never lets anyone give up.', ['🧑‍🏫'], 'Why do the narrator and the brother see Mr. Santos differently?', 'They focus on different things he does.', [['The brother has never met Mr. Santos.', 'Both know him, but they notice different things.'], 'The narrator is older than the brother.', 'Mr. Santos is two different people.'], 'The narrator notices the redo; the brother notices that he never lets students give up.'),
    X('The Puppy', 'From my mom\'s point of view, the puppy is a muddy, chewing machine. From my point of view, he is the best thing that ever happened to our family.', ['🐶'], 'What does this excerpt show about point of view?', 'Two people can see the same thing in different ways.', [['Puppies are always muddy and chewy.', 'This is about how people see things.'], 'The narrator does not like the puppy at all anymore.', 'Mom has never seen the puppy.'], 'Mom and the narrator describe the same puppy very differently.'),
    X('A Storm Report', 'News report: Heavy rain flooded Main Street on Tuesday, closing six shops.\nShop owner: I watched the water creep under my door. Ten years of work, ruined in an hour.', ['🌧️'], 'How is the shop owner\'s account different from the news report?', 'It shares personal feelings about the flood.', [['It gives more exact numbers about the shops.', 'The report gives the numbers.'], 'It says the flood never happened.', 'It was written before the storm.'], 'The owner\'s firsthand account shows feelings; the report gives facts.', 'compare'),
    X('Grandma\'s Visit', 'Kai was thrilled that Grandma was coming. He cleaned his room and made a sign. His sister, Lani, was not so sure. Grandma always made them eat vegetables.', ['👵'], 'How does the narrator show two points of view?', 'By telling both Kai\'s and Lani\'s feelings', [['By letting Grandma tell the story herself', 'Grandma is described, not narrating.'], 'By using "I" for both children', 'By describing only what Grandma thinks'], 'The narrator shares what Kai feels and what Lani feels.'),
    X('The Field Trip', 'I could not wait to see the dinosaur bones. But when we got there, my friend Ben just stared at the gift shop. "Bones are boring," he whispered.', ['🦖'], 'What point of view does Ben have about the museum?', 'He is more interested in the gift shop.', [['He is the most excited about the bones.', 'Read what Ben whispers.'], 'He is scared of the dinosaur bones.', 'He wants to go home because he is sick.'], 'Ben stares at the gift shop and says bones are boring.'),
  ];
  const POV2 = [
    X('The Old House', 'The house sagged at the end of the street like a tired old man. Its windows were dark and its paint peeled in long, sad strips. I knew, the moment I saw it, that I would never sleep there.', ['🏚️'], 'How does the narrator\'s point of view affect the description?', 'Her dread makes the house seem gloomy.', [['Her excitement makes the house seem cheerful.', 'Look at words like "tired" and "sad."'], 'She describes only facts with no feelings.', 'She describes the house from the house\'s view.'], 'Words like "sagged," "tired," and "sad" reflect the narrator\'s dread.', 'pov'),
    X('Same Day, Two Diaries', 'Ana\'s diary: The rain ruined our beach trip. Worst Saturday ever.\nMarco\'s diary: Rain! We stayed in and built the biggest blanket fort in history.', ['⛱️', '⛺'], 'What causes the two diary entries to be so different?', 'Each writer focuses on a different part of the day.', [['They are writing about two different Saturdays.', 'Both are about the same rainy day.'], 'Marco was not at home that day.', 'Ana built the fort and Marco went to the beach.'], 'Ana focuses on the lost trip; Marco focuses on the fort.', 'compare'),
    X('The Dragon\'s Side', 'Everyone says the knight was brave. But I was only guarding my eggs. When the knight came clanking up my mountain, waving his sword, what was I supposed to do?', ['🐉', '🛡️'], 'How does this narrator change a familiar kind of story?', 'It tells a knight story from the dragon\'s side.', [['It tells a dragon story from the knight\'s side.', 'The narrator says "my eggs" and "my mountain."'], 'It turns the dragon into the villain again.', 'It shows that the knight was the narrator.'], 'The dragon narrates and explains its reasons.', 'pov'),
    X('The Lost Dog Poster', 'Lost: one brown dog, very old, answers to Pepper. To the people walking by, it was just another sign on a pole. To Wen, who had walked Pepper every morning for twelve years, every word on that poster was a small, sharp ache.', ['🐕', '📋'], 'How does Wen\'s point of view shape the description of the poster?', 'Her love for Pepper makes every word painful.', [['Her worry makes her ignore the poster.', 'Read the last sentence.'], 'She sees the poster the same way strangers do.', 'She thinks the poster is badly written.'], 'To strangers it is "just another sign," but to Wen each word is "a small, sharp ache."', 'pov'),
    X('The First Snow', 'From the window, Grandpa saw only work: a driveway to shovel, a car to scrape, a sidewalk to salt. Beside him, five-year-old Ben saw a sky full of falling stars.', ['❄️', '👴'], 'What is the effect of showing both Grandpa\'s and Ben\'s views?', 'It shows how age can change what people notice.', [['It shows that Grandpa does not like Ben.', 'Both are looking at the same snow.'], 'It shows that snow is dangerous for children.', 'It shows that Ben has to shovel the driveway.'], 'Grandpa sees chores; Ben sees "a sky full of falling stars."', 'compare'),
    X('Losing the Game', 'We lost by one point. As I walked off the court, I was sure everyone was staring at me, the girl who missed the last shot. Later, my coach told me no one had even noticed the miss. They were all watching the clock.', ['🏀', '⏱️'], 'What does the ending reveal about the narrator\'s point of view?', 'Her feelings made her believe something untrue.', [['Everyone in the gym really was staring at her.', 'The coach says no one noticed the miss.'], 'She does not care that the team lost.', 'The coach also missed the last shot.'], 'She felt watched, but the coach shows that it was her worry, not the truth.', 'pov'),
    X('Two Letters Home', 'Letter from camp, Day 1: The cabins are tiny and there is a spider in my shoe. I want to come home.\nLetter from camp, Day 6: I caught a fish, I learned to paddle a canoe, and I have three new best friends. Can I stay another week?', ['🏕️', '✉️'], 'What explains the change between the two letters?', 'The writer\'s experience at camp changed her view.', [['The two letters were written by different campers.', 'Both letters are from the same camper.'], 'The camp got rid of all of the spiders.', 'Her parents told her to like camp.'], 'After six days of new experiences, the camper wants to stay.', 'compare'),
    X('Night Shift', 'To the people on the bus, the city at 3 a.m. looked empty and cold. To Ms. Ruiz, who drove it, the city was full of friends: the baker unloading flour, the street sweeper waving, the nurse heading home.', ['🚌', '🌃'], 'What does the narrator show by describing two views of the city?', 'What you notice depends on who you are.', [['The city is dangerous late at night.', 'Both views describe the same city.'], 'Bus riders and drivers are always friends.', 'The city is the same for everyone.'], 'Riders see emptiness; Ms. Ruiz sees friends she knows.', 'theme'),
  ];

  READ_SKILLS.push(
    { goal: G, id: 'stories4', name: 'Theme & characters', icon: '📖', passage: true, levels: [
      passLevel('Characters and themes', 'RL.CR.4.1 · RL.CI.4.2', 'What happens, why, and the big idea.', STORIES[0], G, 186),
      passLevel('How characters change', 'RL.IT.4.3 · RL.CI.4.2', 'Motives, feelings, and figurative language.', STORIES[1], G, 198),
      passLevel('Deeper themes and structure', 'RL.CI.5.2 · RL.TS.5.4', 'Theme, evidence, and how parts fit together.', STORIES[2], G, 208),
    ] },
    { goal: G, id: 'poemsplays', name: 'Poems & plays', icon: '🎭', passage: true, levels: [
      passLevel('Verse, rhythm, and rhyme', 'RL.TS.4.4 · L.VI.4.3', 'How poems are built.', PD[0], G, 188),
      passLevel('Reading a play', 'RL.TS.4.4', 'Cast, setting, dialogue, and stage directions.', PD[1], G, 196),
      passLevel('Scenes, stanzas, and versions', 'RL.TS.5.4 · RL.CT.5.8', 'How parts fit, and comparing tellings.', PD[2], G, 208),
    ] },
    { goal: G, id: 'pov', name: 'Point of view', icon: '👀', passage: true, levels: [
      shortLevel('First and third person', 'RL.PP.4.5', 'Who is telling the story?', POV0, G, 186),
      shortLevel('Different points of view', 'RL.PP.4.5 · RI.PP.4.5', 'Two people, two views.', POV1, G, 198),
      shortLevel('How the narrator shapes the story', 'RL.PP.5.5', 'Point of view changes what we see.', POV2, G, 210),
    ] },
  );
})();
