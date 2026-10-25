// MAP Reading 2 — fluency practice content (all original). Sentences for the timed silent check (does it make sense?)
// and grade 2 passages to read aloud (about 100–130 words), each with three literal comprehension questions.
window.FLUENCY = {
  sentences: [
    ['A dog can bark.', true], ['A fish can ride a bike.', false], ['We wear coats when it is cold.', true], ['The sun comes out at night.', false],
    ['Birds build nests in trees.', true], ['A cat has six legs.', false], ['You can eat soup with a spoon.', true], ['Ice is hot.', false],
    ['Books have pages.', true], ['A car can swim in the sea.', false], ['Cows say moo.', true], ['Snow is green.', false],
    ['We sleep in a bed.', true], ['An apple can sing.', false], ['A frog can hop.', true], ['Shoes go on your hands.', false],
    ['Rain falls from clouds.', true], ['A bus is smaller than a bug.', false], ['Bees make honey.', true], ['Grass is purple.', false],
    ['You brush your teeth.', true], ['A rock can laugh.', false], ['Ducks like to swim.', true], ['We hear with our toes.', false],
    ['A clock tells the time.', true], ['Trees grow upside down.', false], ['Milk comes from cows.', true], ['A pencil is made of soup.', false],
    ['The moon is in the sky.', true], ['Fish live in trees.', false], ['A baby is smaller than a grown-up.', true], ['We drink sand.', false],
    ['Flowers need water to grow.', true], ['A horse can fly to the moon.', false], ['You can read a map.', true], ['Lemons are sweet like candy.', false],
    ['Firefighters help put out fires.', true], ['A spoon can run a race.', false], ['Winter can be cold and snowy.', true], ['A window is made of bread.', false],
    ['People ride bikes to the park.', true], ['A turtle is faster than a rocket.', false], ['Leaves can change color in the fall.', true], ['We wear socks on our ears.', false],
    ['A teacher helps students learn.', true], ['The ocean is full of milk.', false], ['A kite can fly in the wind.', true], ['Elephants are as small as mice.', false],
    ['Bread is baked in an oven.', true], ['A chair can sing a song.', false], ['Stars shine at night.', true], ['Puppies grow into cats.', false],
    ['Seeds can grow into plants.', true], ['A boat sails on the road.', false], ['We use an umbrella in the rain.', true], ['Carrots grow on clouds.', false],
    ['Owls are awake at night.', true], ['A bike has ten wheels.', false], ['You can mail a letter.', true], ['The fish climbed a tree to read the newspaper.', false],
    ['Most people have two eyes.', true], ['A shoe can eat lunch.', false], ['Butterflies have wings.', true], ['Water is always dry.', false],
    ['A farmer grows food.', true], ['The library is a place to buy shoes.', false], ['Hats keep the sun off your face.', true], ['A goldfish can bark.', false],
  ],
  passages: [
    { id: 'f2-garden', title: 'The Window Garden', fig: Fig.picture(['🪴', '🍅', '🪟'], 'A garden in a window'), text: `Lily lived in a tall building with no yard. She wanted a garden anyway. Her mom gave her three empty pots and a bag of soil.

Lily planted tomato seeds in one pot and bean seeds in another. In the last pot, she planted a sunflower seed. She set the pots on the windowsill where the sun was bright.

Every day, Lily gave the seeds a little water. After a week, tiny green leaves popped up. By summer, the beans had climbed up a string, and red tomatoes hung from the vine. The sunflower was the tallest of all. Lily had a garden after all!`,
      qs: [['Why did Lily need pots for her garden?', 'She lived in a building with no yard.', ['She did not like dirt.', 'Her mom liked pots.', 'Her yard was too small.']], ['What did Lily plant in the last pot?', 'A sunflower seed', ['Tomato seeds', 'Bean seeds', 'A carrot seed']], ['Where did Lily put the pots?', 'On the windowsill', ['On the roof', 'Under her bed', 'In the hallway']]] },
    { id: 'f2-library', title: 'Library Day', fig: Fig.picture(['📚', '🦖'], 'Books about dinosaurs'), text: `On Thursdays, Mr. Grant's class went to the library. Sam always ran to the same shelf. He loved books about dinosaurs.

This Thursday, the dinosaur shelf was empty. Every book was checked out! Sam frowned and sat down on a beanbag.

The librarian, Ms. Hall, walked over with a smile. "Have you ever read about sharks?" she asked. She handed Sam a book with a huge shark on the cover.

Sam opened it. Sharks had been around even before the dinosaurs! He read the whole book before class was over. Now Sam has two favorite shelves.`,
      qs: [['What kind of books did Sam always look for?', 'Books about dinosaurs', ['Books about sharks', 'Books about trains', 'Books about space']], ['Why did Sam frown?', 'The dinosaur shelf was empty.', ['He lost his library card.', 'The library was closed.', 'He did not like Ms. Hall.']], ['What did Sam learn about sharks?', 'They were around before the dinosaurs.', ['They are smaller than fish.', 'They live in rivers.', 'They eat dinosaurs.']]] },
    { id: 'f2-snowday', title: 'The Snow Fort', fig: Fig.picture(['❄️', '🏰', '🧤'], 'Building a snow fort'), text: `When Jay woke up, the ground was covered with snow. School was closed for the day!

Jay and his sister Mia put on their boots, hats, and mittens. They wanted to build a snow fort. First, they packed snow into a bucket. Then they flipped the bucket over to make blocks.

They stacked the blocks into a wall. It took all morning. Their noses turned pink from the cold, but they did not stop.

At last, the fort was done. Mia made a flag out of a stick and a red scarf. Then Dad came out with two mugs of hot cocoa. It was the best snow day ever.`,
      qs: [['Why was school closed?', 'It snowed.', ['It was a holiday.', 'The bus was broken.', 'It was Saturday.']], ['How did Jay and Mia make the blocks?', 'They packed snow into a bucket and flipped it.', ['They rolled big snowballs.', 'They cut ice with a shovel.', 'They used boxes.']], ['What did Mia use to make a flag?', 'A stick and a red scarf', ['A mitten', 'A paper bag', 'A pencil']]] },
    { id: 'f2-owl', title: 'Night Hunters', fig: Fig.picture(['🦉', '🌙', '🐭'], 'An owl at night'), text: `Owls are birds that hunt at night. While most birds are sleeping, owls are wide awake.

Owls have very large eyes. Their eyes help them see in the dark. An owl cannot move its eyes like we can. Instead, it turns its whole head. Some owls can turn their heads almost all the way around!

Owls also have soft, fluffy feathers. These feathers let them fly without making a sound. A mouse in the grass will not hear an owl coming.

During the day, owls rest in trees or barns. When the sun goes down, they are ready to hunt again.`,
      qs: [['When do owls hunt?', 'At night', ['In the morning', 'At lunchtime', 'Only in winter']], ['How does an owl look to the side?', 'It turns its whole head.', ['It moves its eyes.', 'It flaps its wings.', 'It closes one eye.']], ['Why can owls fly without a sound?', 'They have soft, fluffy feathers.', ['They fly very slowly.', 'They have big eyes.', 'They only fly in barns.']]] },
    { id: 'f2-race', title: 'The Big Race', fig: Fig.picture(['🏃', '🏅'], 'Field day'), text: `It was Field Day at Elm School. Nina was in the running race. She had practiced every day after school.

The teacher blew the whistle, and the runners took off. Nina was in the middle of the group. Halfway through, her shoe came untied! She stopped to tie it quickly.

When she stood up, the other runners were far ahead. Nina did not give up. She pumped her arms and ran as fast as she could. She passed one runner, then two.

Nina crossed the finish line in third place. Her friends cheered. She got a bronze ribbon, and she was proud that she had kept going.`,
      qs: [['What happened halfway through the race?', "Nina's shoe came untied.", ['Nina fell down.', 'It started to rain.', 'The whistle broke.']], ['In what place did Nina finish?', 'Third place', ['First place', 'Second place', 'Last place']], ['Why was Nina proud?', 'She kept going after she stopped.', ['She won first place.', 'She had new shoes.', 'Her friends ran with her.']]] },
    { id: 'f2-recycle', title: 'Where Does It Go?', fig: Fig.picture(['♻️', '🧴', '📦'], 'Recycling'), text: `What happens to a plastic bottle after you put it in the recycling bin? It goes on a long trip.

First, a truck picks up the bin and takes everything to a recycling center. There, machines sort the paper, cans, and plastic into different piles.

Next, the plastic bottles are washed and cut into tiny flakes. The flakes are melted and made into new things. An old bottle might become a new bottle, a park bench, or even a warm jacket!

Recycling helps keep trash out of the ocean and saves materials. So the next time you finish a drink, think about where the bottle could go.`,
      qs: [['What do the machines at the recycling center do?', 'Sort the paper, cans, and plastic', ['Make juice', 'Drive the trucks', 'Plant trees']], ['What happens to the plastic flakes?', 'They are melted and made into new things.', ['They are thrown in the ocean.', 'They are buried.', 'They are eaten by birds.']], ['What could an old bottle become?', 'A park bench', ['A sandwich', 'A tree', 'A dog']]] },
    { id: 'f2-grandma', title: 'Baking With Grandma', fig: Fig.picture(['👵', '🍪', '🥛'], 'Cookies in the oven'), text: `Every Sunday, Theo bakes cookies with his grandma. Grandma reads the recipe out loud, and Theo measures everything.

Today they were making oatmeal cookies. Theo poured in two cups of oats and one cup of flour. He cracked an egg into the bowl. Only a tiny piece of shell fell in, and Grandma helped him scoop it out.

They stirred the dough until it was thick and sticky. Theo rolled the dough into little balls and placed them on a pan. After twelve minutes, the kitchen smelled sweet and warm.

Theo and Grandma ate two cookies each with cold milk. They saved the rest for Theo's mom.`,
      qs: [['What does Grandma do while they bake?', 'She reads the recipe out loud.', ['She washes the dishes.', 'She buys the oats.', 'She takes a nap.']], ['What fell into the bowl by mistake?', 'A tiny piece of eggshell', ['A spoon', 'Some salt', 'A raisin']], ['How long did the cookies bake?', 'Twelve minutes', ['Two minutes', 'One hour', 'Five minutes']]] },
    { id: 'f2-ladybug', title: 'Little Helpers', fig: Fig.picture(['🐞', '🌹'], 'A ladybug on a plant'), text: `Ladybugs are small beetles with round, shiny bodies. Most are red or orange with black spots.

Gardeners love ladybugs. That is because ladybugs eat tiny bugs called aphids. Aphids suck the juice out of plants and can make them sick. One ladybug can eat about fifty aphids in a single day!

Ladybugs also have a clever way to stay safe. When a bird tries to grab one, the ladybug can let out a yellow liquid that smells and tastes bad. The bird quickly learns to leave ladybugs alone.

If you see a ladybug in your garden, let it stay. It is working hard to help your plants.`,
      qs: [['Why do gardeners love ladybugs?', 'Ladybugs eat aphids that hurt plants.', ['Ladybugs water the plants.', 'Ladybugs are pretty colors.', 'Ladybugs make honey.']], ['About how many aphids can one ladybug eat in a day?', 'About fifty', ['About two', 'About five hundred', 'About ten']], ['How does a ladybug stay safe from birds?', 'It lets out a liquid that tastes bad.', ['It hides in the dirt.', 'It flies very high.', 'It changes color.']]] },
    { id: 'f2-move', title: 'A New Neighbor', fig: Fig.picture(['📦', '🏠', '👋'], 'Moving day'), text: `A big truck stopped in front of the house next door. Ava watched from her window as people carried out boxes and a bike.

A girl about Ava's age stood on the sidewalk. She held a cat in her arms and looked a little nervous.

Ava's dad said, "Why don't you go say hello?" Ava took a deep breath. She grabbed a ball and walked outside.

"Hi, I'm Ava," she said. "Do you want to play catch?"

The girl smiled. "I'm Rina. And this is Pepper." They tossed the ball back and forth until dinnertime. By the end of the day, Ava had a new friend next door.`,
      qs: [['What did Ava see from her window?', 'People carrying boxes from a truck', ['A dog in the yard', 'Her friend riding a bike', 'Rain falling']], ['What was the girl holding?', 'A cat', ['A ball', 'A box', 'A bike']], ['What did Ava bring outside?', 'A ball', ['A cookie', 'A book', 'Her cat']]] },
    { id: 'f2-moon', title: 'Shapes of the Moon', fig: Fig.picture(['🌑', '🌓', '🌕'], 'The moon changes shape'), text: `Have you noticed that the moon seems to change shape? Some nights it is a thin curve. Other nights it is a big, round circle.

The moon does not really change. It does not make its own light. Instead, the sun shines on it. As the moon travels around Earth, we see different amounts of its sunny side.

When we can see the whole sunny side, we call it a full moon. When we cannot see the sunny side at all, it is called a new moon. It takes about one month for the moon to go from one new moon to the next.

Tonight, look up and see what shape the moon is!`,
      qs: [['Where does the moon get its light?', 'From the sun', ['From the stars', 'It makes its own light', 'From Earth']], ['What do we call it when we see the whole sunny side?', 'A full moon', ['A new moon', 'A half moon', 'A blue moon']], ['About how long does it take to go from one new moon to the next?', 'About one month', ['About one day', 'About one year', 'About one week']]] },
  ],
};
