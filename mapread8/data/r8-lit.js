// MAP Reading 8 — Fiction, Poetry, and Drama: poetry and drama, and modern stories that draw on myths and
// traditional tales (all original). Standards: NJSLS-ELA 2023, grades 8 and 9–10 (RL.CR, RL.CI, RL.IT, RL.TS,
// RL.PP, RL.CT, L.VI).
(function () {
  const { P, passLevel } = RK;
  const G = 'lit';

  // ===================== POETRY & DRAMA =====================
  const PD = [
    [ // Grade 8 Starter
      { passage: P('Night Shift at the Diner', 'Poem', `At 2 a.m. the coffee pot
still mutters on its burner,
and Rosa wipes the counter clean
in slow, unhurried circles.

A trucker taps his spoon on porcelain,
a nurse in faded blue
stares out at the empty highway,
and nobody says much.

But Rosa knows their orders
the way a mother knows a cry:
black, no sugar; toast, dry;
the eggs, as always, runny.

Outside, the whole town sleeps.
In here, beneath the humming lights,
a few tired strangers keep
each other company.`, ['☕', '🌃', '🍳'], 'A diner after midnight'),
        qs: [
          ['mc', 'What is the setting of the poem?', 'A diner late at night', [['A hospital waiting room at dawn', 'Look for clues like "2 a.m." and "the counter."'], 'A busy highway at rush hour', 'A kitchen in a family home'], 'The poem is set at a diner counter at 2 a.m.', 'setting'],
          ['mc', 'What does "the coffee pot / still mutters on its burner" suggest?', 'The pot makes a low, steady sound.', [['The coffee pot is broken and needs repair.', '"Mutters" gives the pot a human, quiet sound.'], 'Someone is talking to the coffee pot.', 'The coffee has gone cold for hours.'], 'Personification: the pot "mutters," making a soft, constant noise.', 'device'],
          ['mc', 'The simile "the way a mother knows a cry" shows that Rosa', 'knows her customers deeply and by instinct', [['is the mother of one of the customers', 'This is a comparison, not a fact about her family.'], 'is annoyed by the noise in the diner', 'has forgotten what the customers want'], 'A mother knows a cry without thinking; Rosa knows the orders the same way.', 'device'],
          ['ev', 'Which line BEST shows the quiet mood inside the diner?', 'and nobody says much.', 'The customers sit without talking, creating a quiet, tired mood.', 'evidence'],
          ['mc', 'How does the last stanza develop the poem\'s central idea?', 'It contrasts the sleeping town with the small community inside.', [['It explains why Rosa decided to work the night shift at the diner.', 'Look at "Outside" and "In here."'], 'It describes the food that Rosa cooks.', 'It reveals that the customers are angry.'], 'The contrast shows how strangers find company in the late-night diner.', 'theme'],
          ['mc', 'Which BEST describes the tone of the poem?', 'Quiet and tender', [['Angry and bitter', 'Think about how the speaker describes Rosa and the customers.'], 'Excited and joyful', 'Fearful and tense'], 'The gentle details and the ending create a quiet, tender tone.', 'tone'],
        ] },
      { passage: P('The Audition (Scene)', 'Drama', `CHARACTERS: NIA, 13 · MR. PATEL, the drama teacher · DEVON, 13, Nia's best friend

SETTING: An empty school auditorium. A single spotlight shines on center stage.

(NIA stands in the spotlight, holding a script. Her hands tremble. DEVON sits in the front row. MR. PATEL sits beside him with a clipboard.)

MR. PATEL: Whenever you're ready, Nia.

NIA: (reading too fast) "I never asked to be queen. I never asked for any of this—" (She stops.) Sorry. Can I start over?

MR. PATEL: (gently) Of course.

(NIA lowers the script. She looks at DEVON. He mouths, "Breathe.")

NIA: (slowly, her voice steadier) "I never asked to be queen." (She lifts her chin.) "But I am. And I will not let this kingdom fall."

(Silence. MR. PATEL writes something on his clipboard. DEVON grins.)

MR. PATEL: Thank you, Nia. That second start—that was the queen.

(NIA exits. In the wings, she leans against the wall and lets out a breath she seems to have been holding all day.)`, ['🎭', '👑', '🔦'], 'An audition on stage'),
        qs: [
          ['mc', 'What do the stage directions at the start reveal about Nia?', 'She is nervous about the audition.', [['She is bored and wants to leave.', 'Notice her trembling hands.'], 'She is confident and has done this before.', 'She is angry at Mr. Patel.'], '"Her hands tremble" shows that she is nervous.', 'character'],
          ['mc', 'Why does Devon mouth the word "Breathe"?', 'To help Nia calm down and slow down', [['To tell Nia she forgot her lines', 'Think about how Nia read the first time.'], 'To make the teacher laugh', 'To ask Nia to leave the stage'], 'Nia read too fast, so Devon reminds her to breathe and slow down.', 'inference'],
          ['ev', 'Which stage direction shows the moment Nia begins to feel like the character?', '(She lifts her chin.)', 'Lifting her chin shows new confidence, like a queen.', 'evidence'],
          ['mc', 'What does Mr. Patel mean by "that was the queen"?', 'Nia finally sounded like the character.', [['Nia has been chosen to be the real queen.', 'He is talking about her performance.'], 'Nia should read the queen\'s lines again.', 'The queen in the play is Nia\'s mother.'], 'Her second reading captured the queen\'s strength.', 'inference'],
          ['mc', 'How do Nia\'s lines from the play connect to her real situation?', 'Like the queen, she rises to a challenge she fears.', [['Like the queen, she wants to leave the kingdom.', 'Think about "I never asked... But I am."'], 'She has no connection to the queen at all.', 'She wants to be a real queen someday.'], 'Nia, like the queen, finds strength despite her fear.', 'theme'],
          ['mc', 'What is the effect of the final stage direction?', 'It reveals how much the audition cost her.', [['It shows that she failed the audition.', 'She lets out a breath "she seems to have been holding all day."'], 'It introduces a new character.', 'It shows that the play is a comedy.'], 'Alone, she finally releases the tension she hid on stage.', 'structure'],
        ] },
    ],
    [ // Grade 8 Star: sound, structure, and dramatic irony
      { passage: P('The Tide Pool', 'Poem', `Twice a day the ocean leaves
a little world behind:
a bowl of stone, a ring of weed,
a crab of the sideways kind.

Anemones bloom, then fold their fists
when shadows cross the glass;
a sculpin, freckled like the rock,
waits for the hour to pass.

It is a kingdom, small and brief,
ruled by a patient sea,
that will return, as oceans do,
and take it back to be

a single drop among the waves,
unnamed, and vast, and free.`, ['🦀', '🌊', '🪸'], 'A tide pool'),
        qs: [
          ['mc', 'What is the rhyme scheme in the first stanza?', 'The second and fourth lines rhyme.', [['Every line rhymes with the next.', 'Compare "behind" and "kind."'], 'None of the lines rhyme.', 'The first and third lines rhyme.'], '"Behind" and "kind" rhyme; lines 1 and 3 do not.', 'device'],
          ['mc', '"Anemones bloom, then fold their fists" — what does this image suggest?', 'The anemones open and then close up tight.', [['The anemones are fighting with each other.', 'Think about what a flower and a fist look like.'], 'The anemones are being picked by visitors.', 'The anemones are growing taller.'], 'They open like flowers and close like fists when shadows pass.', 'device'],
          ['mc', 'Why is the sculpin described as "freckled like the rock"?', 'It blends in with its surroundings.', [['It has a skin disease.', 'Look at the comparison to the rock.'], 'It is made of stone.', 'It is the largest fish in the pool.'], 'Its spots match the rock, so it is camouflaged.', 'device'],
          ['ev', 'Which line shows that the tide pool will not last?', 'It is a kingdom, small and brief,', '"Brief" tells that the tide pool\'s world is short-lived.', 'evidence'],
          ['mc', 'How does the poem\'s structure support its meaning?', 'The last sentence runs past the stanza break, like the sea flowing back in.', [['Each stanza describes a different beach.', 'Look at how the last sentence crosses into the final two lines.'], 'The poem gets shorter and shorter to show that the crab is leaving the pool.', 'The rhymes stop to show that the sea is angry.'], 'The sentence spills over the break, mirroring the tide reclaiming the pool.', 'structure'],
          ['mc', 'Which theme does the poem express?', 'Small worlds are part of something larger.', [['Crabs are the rulers of the ocean.', 'Think about what happens to the pool at the end.'], 'The ocean destroys everything it touches.', 'People should not visit tide pools.'], 'The pool returns to the sea as "a single drop among the waves."', 'theme'],
        ] },
      { passage: P('The Surprise Party (Scene)', 'Drama', `CHARACTERS: OLIVIA, 14 · HER MOTHER · SAM, Olivia's younger brother

SETTING: The family kitchen, evening. A calendar on the wall has today circled in red: OLIVIA'S BIRTHDAY.

(OLIVIA enters, drops her backpack, and slumps at the table. SAM, holding a balloon behind his back, slips out the door before she sees him.)

OLIVIA: Nobody remembered. Not one person.

MOTHER: (stirring a pot, not turning around) Remembered what, sweetheart?

OLIVIA: (staring at her) Seriously?

MOTHER: (glancing at the clock) Could you run to the garage and get the big flashlight? The bulb in the basement is out.

OLIVIA: (sighing) Fine. Sure. Why not.

(OLIVIA trudges toward the garage door. Through the window behind her, the audience can see SAM and a dozen friends crouching in the dark garage, holding a banner.)

OLIVIA: (hand on the doorknob, muttering) Worst birthday ever.

(She opens the door.)

EVERYONE: SURPRISE!`, ['🎈', '🎂', '🚪'], 'A birthday scene'),
        qs: [
          ['mc', 'What does the audience know that Olivia does not?', 'Her friends are hiding in the garage.', [['Her mother forgot her birthday.', 'The audience sees through the window.'], 'Sam is going to move away.', 'The basement light is broken.'], 'The stage directions show friends crouching in the garage.', 'pov'],
          ['mc', 'What type of irony does this scene use?', 'Dramatic irony', [['Verbal irony', 'Verbal irony is saying the opposite of what you mean.'], 'Situational irony', 'No irony at all'], 'The audience knows something the character does not: dramatic irony.', 'device'],
          ['ev', 'Which stage direction creates the irony?', 'Through the window behind her, the audience can see SAM and a dozen friends crouching in the dark garage, holding a banner.', 'This shows the audience the secret that Olivia cannot see.', 'evidence'],
          ['mc', 'Why does the mother ask Olivia to get the flashlight?', 'To send her to the garage where the party is', [['Because the basement really needs a light', 'Notice that she glances at the clock first.'], 'To punish Olivia for being rude', 'To keep Olivia away from the kitchen'], 'The errand leads Olivia straight to the surprise.', 'inference'],
          ['mc', 'What is the effect of Olivia saying "Worst birthday ever" just before the surprise?', 'It makes the surprise more powerful.', [['It shows that the party will go badly.', 'Think about the timing of the line.'], 'It reveals that she knew about the party.', 'It makes the scene less funny.'], 'Her complaint right before "SURPRISE!" heightens the contrast and the humor.', 'structure'],
          ['mc', 'How do the mother\'s stage directions ("not turning around," "glancing at the clock") build the scene?', 'They hint that she is hiding something.', [['They show that she is too busy to care.', 'A reader rereading the scene notices these hints.'], 'They show that she is angry with Olivia.', 'They show that dinner is almost ready.'], 'Avoiding eye contact and checking the time are clues that she is in on the surprise.', 'character'],
        ] },
    ],
    [ // Grade 9 Challenge: comparing a poem and a prose text on one theme
      { passage: P('Two Texts About Leaving Home', 'Two texts', `Text 1: "Departure" (a poem)
The suitcase knows. It sits beside the door
with all my years folded inside its dark,
while Mother, who has never cried before,
pretends the kitchen needs her. On the mark

of the doorframe, pencil lines climb up:
age four, age nine, age twelve, a final dash.
I touch the highest. Someone fills a cup.
Outside, the taxi idles. I go fast.

Text 2: From a memoir
The morning I left for college, my mother made pancakes she knew I wouldn't eat. She kept her back to me, flipping each one with great concentration, as though the pancakes were the most important thing in the world. I understood. If she turned around, one of us would break. On my way out, I noticed the height marks on the kitchen doorframe, the ones she'd made every birthday. I didn't stop. If I had stopped, I might not have left.`, ['🧳', '🚕', '📏'], 'Leaving home'),
        qs: [
          ['mc', 'What experience do both texts describe?', 'A young person leaving home while a mother hides her feelings', [['A whole family moving together to a new house in a new town', 'In both texts, only one person leaves.'], 'A child\'s first day of kindergarten', 'A mother leaving for a new job'], 'Both show a departure and a mother who hides her sadness.', 'compare'],
          ['mc', 'In Text 1, why does the mother "pretend the kitchen needs her"?', 'To avoid showing that she is sad', [['Because she has to cook a big meal', 'The poem says she "has never cried before."'], 'Because she is angry about the trip', 'Because she forgot the speaker was leaving'], 'Busying herself keeps her from crying in front of the speaker.', 'inference'],
          ['multi', 'Which TWO details appear in BOTH texts?', ['height marks on a doorframe', 'a mother keeping busy instead of facing her child'], ['a taxi waiting outside', 'pancakes no one eats', 'a suitcase by the door'], 'Both include the doorframe marks and the mother keeping busy.', 'compare'],
          ['mc', 'How does the form of Text 1 shape its effect differently from Text 2?', 'Its rhyme and line breaks compress the moment into vivid images.', [['It gives more background about where the speaker is going.', 'The poem gives fewer facts than the memoir.'], 'It explains the mother\'s thoughts directly.', 'It tells the story in the order the memoir does.'], 'The poem\'s compressed, rhymed lines focus on images; the memoir explains more.', 'structure'],
          ['ev', 'Which sentence from Text 2 states an idea the poem only suggests?', 'If she turned around, one of us would break.', 'The memoir says directly what the poem implies through the mother\'s actions.', 'evidence'],
          ['mc', 'What shared theme do the texts develop?', 'Love can be shown by holding feelings back.', [['Leaving home is always exciting.', 'Think about why the mother and child do not face each other.'], 'Families should never be apart.', 'Breakfast is the most important meal.'], 'Both mother and child hide their feelings out of love.', 'theme'],
        ] },
      { passage: P('The Builder and the Wall (Scene and Poem)', 'Two texts', `Text 1: A scene
CHARACTERS: TOMÁS, an old stonemason · ELENA, his granddaughter

(A half-built stone wall. TOMÁS sets a stone in place, then taps it with his trowel.)

ELENA: You've been building this wall for three summers, Abuelo. It's not even finished.

TOMÁS: (not looking up) It isn't supposed to be finished. Not by me.

ELENA: Then who?

TOMÁS: (handing her the trowel) You, maybe. Or someone after you. A wall like this outlives the hands that start it.

(ELENA hesitates, then lifts a stone and sets it beside his.)

Text 2: A poem
I set my stone where his stone sat,
and his where hers had been,
a wall of hands, of this and that,
of every hand between.`, ['🧱', '👴', '👧'], 'Building a wall'),
        qs: [
          ['mc', 'Why does Tomás say the wall "isn\'t supposed to be finished. Not by me"?', 'He sees the wall as work passed down through generations.', [['He is too tired and too old to keep building it by himself.', 'Read what he says when he hands Elena the trowel.'], 'He wants Elena to tear it down.', 'He is unhappy with how it looks.'], 'He says the wall "outlives the hands that start it."', 'inference'],
          ['mc', 'What does Elena\'s final action show?', 'She accepts a part in continuing the work.', [['She refuses to help her grandfather.', 'She lifts a stone and sets it beside his.'], 'She decides to build a new wall elsewhere.', 'She is angry about the unfinished wall.'], 'Setting a stone beside his shows she joins the work.', 'character'],
          ['ev', 'Which line from the scene BEST states its central idea?', 'TOMÁS: (handing her the trowel) You, maybe.', 'Passing the trowel shows the work moving to the next generation.', 'evidence'],
          ['mc', 'How does the poem extend the idea of the scene?', 'It imagines the wall as built by many hands over time.', [['It argues that walls should not be built.', 'Look at "a wall of hands... of every hand between."'], 'It describes Tomás\'s life before he built walls.', 'It tells what happens to Elena years later.'], 'The poem broadens the idea from two people to "every hand between."', 'compare'],
          ['mc', 'What is the effect of the repeated sound in "his stone sat, / and his where hers had been"?', 'The pattern echoes stones being laid one after another.', [['It makes the poem sound angry and harsh, like stones crashing.', 'Listen to how the words repeat and alternate.'], 'It shows that the speaker is confused.', 'It hides the meaning of the poem.'], 'The repeated, alternating pattern mirrors the steady placing of stones.', 'device'],
          ['mc', 'Which theme do both texts share?', 'Meaningful work connects generations.', [['Old people should stop working.', 'Think about Tomás passing the trowel.'], 'Walls keep people apart.', 'Finishing a task is all that matters.'], 'Both present the wall as shared work across generations.', 'theme'],
        ] },
    ],
  ];

  // ===================== MYTHS IN MODERN STORIES =====================
  const MYTH = [
    [ // Grade 8 Starter
      { passage: P('Icarus, Revised', 'Two texts', `Text 1: The Myth (summary)
In Greek mythology, the inventor Daedalus built wings of feathers and wax so that he and his son, Icarus, could escape from an island prison. He warned Icarus not to fly too close to the sun, which would melt the wax, or too close to the sea, which would soak the feathers. But Icarus, thrilled by flight, soared higher and higher. The wax melted, and he fell into the sea.

Text 2: A Modern Story
Jalen's drone was the best in the robotics club. His coach had one rule for the regional competition: keep it under 400 feet. "The higher you go," she said, "the more wind you fight, and the faster the battery drains."

During the final round, the crowd cheered as Jalen's drone climbed. Higher. Higher. The cheering grew louder, and so did the warning beep on his controller. He pushed the stick forward anyway. At 600 feet, the battery died. The drone tumbled into the pond beside the field.

Later, wringing water out of the propellers, Jalen laughed in spite of himself. "Icarus," his coach said, shaking her head. "Next year, we fly smarter."`, ['🪶', '☀️', '🛸'], 'Flying too high'),
        qs: [
          ['mc', 'Which element of the myth does the modern story keep?', 'A warning not to go too high that is ignored', [['A father building a pair of wings for his son', 'The story has a coach and a drone instead.'], 'An escape from an island prison', 'A fall caused by melting wax'], 'Like Icarus, Jalen ignores a warning and flies too high.', 'compare'],
          ['mc', 'In the modern story, what plays the role of the melting wax?', 'The draining battery', [['The cheering crowd', 'Think about what makes the drone fall.'], 'The robotics club', 'The pond beside the field'], 'Just as the wax melted, the battery dies when the drone climbs too high.', 'compare'],
          ['ev', 'Which sentence shows Jalen choosing to ignore the warning?', 'He pushed the stick forward anyway.', 'Despite the warning beep, he kept climbing.', 'evidence'],
          ['mc', 'Why does the coach call Jalen "Icarus"?', 'He made the same mistake as the boy in the myth.', [['His drone is named after a Greek god.', 'Think about how the drone fell.'], 'He invented wings for his drone.', 'He was the winner of the whole regional competition.'], 'Like Icarus, he flew too high and fell.', 'inference'],
          ['mc', 'How is the ending of the modern story DIFFERENT from the myth?', 'Jalen survives and plans to learn from it.', [['Jalen falls into the sea like Icarus.', 'Jalen laughs and the coach says "next year."'], 'The coach builds Jalen a new drone.', 'Jalen wins the competition anyway.'], 'Unlike Icarus, Jalen gets a second chance: "Next year, we fly smarter."', 'compare'],
          ['mc', 'Which theme do both texts share?', 'Ignoring wise limits can lead to a fall.', [['Machines are better than wings.', 'Think about why both characters fall.'], 'Crowds always know best.', 'Inventors should not have children.'], 'Both characters ignore warnings and fall.', 'theme'],
        ] },
      { passage: P('The Tortoise Index', 'Two texts', `Text 1: The Fable (summary)
In Aesop's fable, a boastful hare challenges a slow tortoise to a race. The hare sprints ahead, then naps, sure he cannot lose. The tortoise keeps walking steadily, passes the sleeping hare, and wins.

Text 2: A Modern Story
Everyone in Ms. Kaur's class assumed Dev would win the reading challenge. He read two books the first week and bragged about it at lunch. Priya read a little every night, twenty pages, no more, no less. She tracked them on an index card she called "the tortoise index."

By the third week, Dev had discovered a new video game. His reading log stopped growing. Priya's index card filled up, row by careful row.

On the last day, Ms. Kaur announced the winner. Dev looked up from his game, surprised. Priya simply turned her index card over and started a new one.`, ['🐢', '🐇', '📚'], 'A reading challenge'),
        qs: [
          ['mc', 'Which character in the modern story matches the hare?', 'Dev', [['Priya', 'Priya reads slowly and steadily, like the tortoise.'], 'Ms. Kaur', 'The video game'], 'Dev starts fast, brags, and then stops, like the hare.', 'compare'],
          ['mc', 'Why does Priya call her card "the tortoise index"?', 'She reads slowly and steadily like the tortoise.', [['She keeps a pet tortoise at home.', 'Think about how much she reads each night.'], 'She wants to lose the challenge.', 'Her teacher gave that name to every student\'s card.'], 'Like the tortoise, she keeps a steady pace: twenty pages every night.', 'inference'],
          ['ev', 'Which sentence shows the "nap" that matches the hare\'s?', 'By the third week, Dev had discovered a new video game.', 'The video game is Dev\'s version of the hare\'s nap.', 'evidence'],
          ['mc', 'What does Priya\'s final action suggest about her?', 'Reading is a habit for her, not just a contest.', [['She is upset that the reading contest is over now.', 'She starts a new card right away.'], 'She wants to brag about winning.', 'She plans to quit reading now.'], 'She simply starts a new card, showing reading is part of her routine.', 'character'],
          ['mc', 'How does the modern story update the fable?', 'It sets the race in a classroom reading challenge.', [['It changes the ending so that the hare wins the race.', 'The steady reader still wins.'], 'It adds talking animals.', 'It removes the moral completely.'], 'The race becomes a reading challenge; the lesson stays the same.', 'compare'],
          ['mc', 'Which theme do both texts share?', 'Steady effort can beat fast but careless effort.', [['Reading books is always better than playing video games.', 'That is not the main lesson of both texts.'], 'Bragging helps you win.', 'Teachers decide who wins.'], 'In both, slow and steady wins.', 'theme'],
        ] },
    ],
    [ // Grade 8 Star
      { passage: P('Persephone at the Bus Stop', 'Two texts', `Text 1: The Myth (summary)
In Greek mythology, Persephone, daughter of the harvest goddess Demeter, was taken to the underworld by Hades. Demeter's grief caused the earth to grow cold and barren. Eventually, a bargain was struck: Persephone would spend part of each year with her mother and part in the underworld. When she returns, spring comes; when she leaves, winter falls.

Text 2: A Modern Story
Every September, Lina's mother drove her to the bus that took her to her father's house in the city for the school year. Every June, she came back.

Her mother never said much at the bus stop. But Lina noticed that the garden, which her mother tended all summer, went untouched the moment she left. The tomatoes rotted on the vine. The roses went wild.

And when Lina stepped off the bus each June, the first thing she saw was her mother kneeling in the dirt, planting something new.`, ['🌱', '🚌', '❄️'], 'Seasons of a family'),
        qs: [
          ['mc', 'How does the modern story connect to the myth?', 'A daughter\'s yearly leaving and returning shapes her mother\'s "seasons."', [['A daughter is taken away to the underworld by a god every year.', 'The modern story is realistic, not magical.'], 'A mother is a goddess of the harvest.', 'A father causes winter to fall.'], 'Like Persephone, Lina leaves and returns each year, and her mother\'s garden mirrors it.', 'compare'],
          ['mc', 'What does the neglected garden represent?', 'The mother\'s grief while Lina is gone', [['The mother\'s dislike of gardening', 'Think about Demeter\'s grief in the myth.'], 'A drought in the town', 'Lina\'s father\'s anger'], 'Like Demeter\'s barren earth, the untended garden reflects sorrow.', 'device'],
          ['ev', 'Which sentence shows the "spring" of the myth in the modern story?', 'And when Lina stepped off the bus each June, the first thing she saw was her mother kneeling in the dirt, planting something new.', 'Planting when Lina returns mirrors spring returning with Persephone.', 'evidence'],
          ['mc', 'Why does the author use few words to describe the mother\'s feelings?', 'To let her actions show her emotions', [['Because the mother has no feelings', 'The garden shows what she does not say.'], 'Because the story is told by the mother', 'To make the story shorter for readers'], 'Her actions with the garden reveal what she does not say.', 'purpose'],
          ['mc', 'How does the author transform the myth?', 'She turns a story about gods into a quiet family story.', [['She makes the myth more violent.', 'The story has no gods or underworld.'], 'She keeps every detail of the myth.', 'She tells the whole myth from the point of view of Hades.'], 'The supernatural myth becomes a realistic story about a family.', 'compare'],
          ['mc', 'Which theme do both texts share?', 'Love and loss can shape a person\'s whole world.', [['Gardens grow best in the city.', 'Think about how the mother and Demeter respond.'], 'Children should always live with both of their parents.', 'Bus stops are lonely places.'], 'Both mothers\' worlds change with their daughters\' absence.', 'theme'],
        ] },
      { passage: P('Anansi and the Group Project', 'Two texts', `Text 1: The Folktale (summary)
In West African and Caribbean folktales, Anansi is a clever spider who tricks others. In one tale, Anansi wants all the wisdom in the world for himself. He gathers it into a pot and tries to hide it at the top of a tree. But the pot keeps slipping. His young son suggests tying the pot to his back. Realizing that a child had wisdom he lacked, Anansi drops the pot, and wisdom scatters across the world for everyone to share.

Text 2: A Modern Story
Marcus had always been the smart one. When Ms. Obi assigned the group project, he told his partners he would do the research himself. "You two can just make the poster," he said.

But the night before it was due, Marcus was still stuck. His notes were a mess. His sister, a second grader, peeked over his shoulder. "Why don't you just put it in order, like a timeline?" she asked.

Marcus stared at her. Then he laughed, texted his partners, and asked them what they had found. By midnight, the three of them had built the best project in the class—together.`, ['🕷️', '🏺', '📊'], 'Sharing what you know'),
        qs: [
          ['mc', 'How is Marcus like Anansi at the start?', 'He wants to keep all the work and credit for himself.', [['He tricks his partners into doing the research.', 'He keeps the research for himself.'], 'He climbs a tree to hide his notes.', 'He asks his sister for help right away.'], 'Like Anansi hoarding wisdom, Marcus keeps the research to himself.', 'compare'],
          ['mc', 'Who plays the role of Anansi\'s son?', 'Marcus\'s little sister', [['Ms. Obi', 'Think about who gives the simple, wise idea.'], 'Marcus\'s partners', 'Marcus himself'], 'His young sister gives the simple idea he missed, like Anansi\'s son.', 'compare'],
          ['ev', 'Which sentence is the turning point in the modern story?', 'Then he laughed, texted his partners, and asked them what they had found.', 'This is when Marcus chooses to share the work.', 'evidence'],
          ['mc', 'What is the "pot of wisdom" in the modern story?', 'The research Marcus tries to keep to himself', [['The poster his partners make', 'Think about what Marcus would not share.'], 'The timeline that his little sister suggests', 'The grade on the project'], 'Marcus hoards the research the way Anansi hoards wisdom.', 'device'],
          ['mc', 'How does the ending of the modern story echo the folktale?', 'Knowledge is shared, and everyone benefits.', [['Marcus loses all of his research forever.', 'They build "the best project in the class—together."'], 'The sister takes all the credit.', 'Ms. Obi punishes the group.'], 'Like wisdom scattering for all, the group shares what they know.', 'compare'],
          ['mc', 'Which theme do both texts share?', 'No one person holds all the wisdom.', [['Spiders are the cleverest animals.', 'Think about who has the best idea in each text.'], 'Group projects are always unfair.', 'Older people are always wiser.'], 'In both, a young person has wisdom the "smart one" lacked.', 'theme'],
        ] },
    ],
    [ // Grade 9 Challenge
      { passage: P('Orpheus Does Not Look Back', 'Two texts', `Text 1: The Myth (summary)
In Greek mythology, the musician Orpheus traveled to the underworld to bring back his wife, Eurydice, who had died. His music moved Hades, who agreed to let her follow Orpheus to the world above on one condition: Orpheus must not look back at her until they had both reached the sunlight. Just before the end, doubt overcame him. He turned to see if she was there, and she vanished forever.

Text 2: A Modern Story
The hospital hallway was long and white, and Ms. Varga had walked it every day for six weeks. Her husband was in the rehabilitation wing, learning to walk again after his stroke.

"Don't watch me," he had told her that morning. "If you watch, I'll try too hard and I'll fall. Go to the end of the hall. Wait for me there."

So she went. She stood at the window at the end of the hall, her back to him, listening. She heard the squeak of the walker. A pause. A shuffling step. Another pause, longer this time. Every part of her wanted to turn around.

She did not turn around.

The footsteps came closer, uneven but steady, until a hand touched her shoulder.`, ['🎻', '🏥', '🚶'], 'Do not look back'),
        qs: [
          ['mc', 'Which condition from the myth does the modern story echo?', 'The rule not to look back until the end', [['The journey to the underworld', 'The story is set in a hospital.'], 'Music that softens a ruler\'s heart', 'A wife who is lost forever'], 'Like Orpheus, Ms. Varga is told not to look back.', 'compare'],
          ['mc', 'Why does the husband ask Ms. Varga not to watch him?', 'Watching would make him try too hard and fall.', [['He is embarrassed to be seen at the hospital.', 'Read his exact words.'], 'He wants her to go home and rest.', 'The doctor told her to leave.'], 'He says, "If you watch, I\'ll try too hard and I\'ll fall."', 'detail'],
          ['ev', 'Which sentence marks the key difference from the myth?', 'She did not turn around.', 'Unlike Orpheus, she resists the urge to look back.', 'evidence'],
          ['mc', 'Why does the author place "She did not turn around." in a paragraph by itself?', 'To emphasize the importance of her choice', [['To show that the story is ending early', 'A one-line paragraph slows the reader.'], 'To show that she is angry', 'To change the point of view'], 'Isolating the line highlights the moment of decision.', 'structure'],
          ['mc', 'How does the modern ending transform the myth?', 'Trust is rewarded instead of punished by doubt.', [['The husband disappears forever, just like Eurydice.', 'A hand touches her shoulder.'], 'Ms. Varga becomes a musician.', 'The couple travels underground.'], 'Where Orpheus\'s doubt ends in loss, her trust ends in reunion.', 'compare'],
          ['mc', 'Which statement BEST expresses the theme of Text 2?', 'Love sometimes means trusting enough to let go.', [['Hospitals are frightening places to spend time.', 'Think about why she does not turn around.'], 'Myths are always sad.', 'Walking is harder than music.'], 'By not watching, she gives her husband the trust he needs.', 'theme'],
        ] },
      { passage: P('The Boy Who Cried Data', 'Two texts', `Text 1: The Fable (summary)
In Aesop's fable, a shepherd boy, bored while watching his flock, cries "Wolf!" to trick the villagers into running up the hill. He does it twice and laughs at them. When a real wolf comes, he cries out again, but no one believes him, and the wolf scatters the flock.

Text 2: A Modern Story
The weather app called LIVEWIRE promised "Extreme Alerts" to keep users safe. At first, people loved it. But LIVEWIRE sent alerts for everything: a little wind, a chance of drizzle, a slightly hot afternoon. EXTREME HEAT! DANGEROUS WINDS! Phones buzzed so often that people stopped reading the alerts. Many turned them off.

In August, meteorologists tracked a real flash flood heading toward the river valley. LIVEWIRE sent its alert, flashing red: EXTREME FLOOD WARNING. EVACUATE NOW.

Most of the phones in the valley were silent. Their owners had turned off the alerts months before.`, ['🐺', '📱', '🌊'], 'Too many warnings'),
        qs: [
          ['mc', 'What in the modern story matches the boy crying "Wolf!"?', 'The app sending alerts for small weather', [['The meteorologists tracking a real flood', 'They are tracking something real.'], 'People turning off their phones', 'The river valley flooding'], 'Like the boy, the app warns about dangers that are not real or serious.', 'compare'],
          ['mc', 'Why does the modern story end with silent phones?', 'To show the cost of warnings that people stopped trusting', [['To show that the phones were broken', 'The owners had turned off the alerts.'], 'To show that the flood was not real and the app was wrong', 'To show that the app worked well'], 'Like the villagers, people ignored the real warning because of false ones.', 'theme'],
          ['ev', 'Which sentence shows the result of too many alerts?', 'Phones buzzed so often that people stopped reading the alerts.', 'Too many alerts led people to ignore them.', 'evidence'],
          ['mc', 'How does the modern story change who is to blame?', 'An app, not a person, causes the lost trust.', [['The villagers are blamed for being lazy.', 'Think about who sent the false alarms.'], 'The meteorologists are to blame.', 'No one is to blame at all.'], 'The app replaces the boy as the source of false alarms.', 'compare'],
          ['mc', 'What is the effect of using all capital letters for the alerts?', 'It imitates how loud and constant the alerts felt.', [['It shows that the alerts were always correct.', 'Think about how capital letters "sound."'], 'It shows the alerts were written by the boy.', 'It makes the story harder to read on purpose.'], 'The capitals feel like shouting, matching the constant alarms.', 'device'],
          ['mc', 'Which theme do both texts share?', 'False alarms destroy trust when it matters most.', [['Technology always keeps people safe.', 'Both texts end with an ignored real warning.'], 'Wolves are far more dangerous than any flood.', 'People should never use weather apps.'], 'In both, real danger is ignored because of earlier false alarms.', 'theme'],
        ] },
    ],
  ];

  READ_SKILLS.push(
    { goal: G, id: 'poetry8', name: 'Poetry & drama', icon: '🎭', passage: true, levels: [
      passLevel('Imagery, tone, and stage directions', 'RL.CR.8.1 · RL.TS.8.4 · L.VI.8.4', 'What the details reveal.', PD[0], G, 198),
      passLevel('Sound, structure, and irony', 'RL.TS.8.4 · RL.PP.8.5', 'How form and irony shape meaning.', PD[1], G, 216),
      passLevel('Comparing poem, prose, and drama', 'RL.CT.9–10.8 · RL.TS.9–10.4', 'One theme, different forms.', PD[2], G, 226),
    ] },
    { goal: G, id: 'myths8', name: 'Myths in modern stories', icon: '🏛️', passage: true, levels: [
      passLevel('Fables and myths retold', 'RL.CT.8.8', 'What the new story keeps.', MYTH[0], G, 200),
      passLevel('Transforming a myth', 'RL.CT.8.8 · RL.CI.8.2', 'What changes, and why.', MYTH[1], G, 218),
      passLevel('Echoes and reversals', 'RL.CT.9–10.8', 'When a modern story answers an old one.', MYTH[2], G, 228),
    ] },
  );
})();
