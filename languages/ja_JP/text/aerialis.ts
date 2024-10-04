import { alphysPhoneDisplay } from '../../../code/aerialis/bootstrap';
import {
   adultEvac,
   burger,
   calm_lizard,
   childEvac,
   corefriendly,
   glade,
   iRespeccYourVilliany
} from '../../../code/aerialis/extras';
import { asrielinter } from '../../../code/common';
import { pms } from '../../../code/common/extras';
import { music } from '../../../code/systems/assets';
import { game, renderer } from '../../../code/systems/core';
import {
   ateThreshold,
   battler,
   choicer,
   fetchCharacters,
   iFancyYourVilliany,
   instance,
   pager,
   postSIGMA,
   roomKills,
   shopper,
   world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';

// START-TRANSLATE

export default {
   a_aerialis: {
      coreterminal: () => [
         ...(SAVE.data.b.svr
            ? ['<32>{#p/human}* (It appears the terminal is beyond your access level.)']
            : world.runaway
               ? ["<32>{#p/basic}* It's a CORE terminal.\n* It doesn't seem to be getting a lot of power."]
               : [
                  world.postnoot
                     ? "<32>{#p/basic}* It's a CORE terminal.\n* The atmospheric systems have been accessed recently."
                     : world.bad_robot && 68 <= SAVE.data.n.plot
                        ? "<32>{#p/basic}* It's a CORE terminal.\n* It seems to be running low on power."
                        : "<32>{#p/basic}* It's a CORE terminal.\n* It seems to be running well.",
                  ...(!world.genocide && !world.badder_lizard && SAVE.data.b.a_state_corecall && SAVE.data.n.plot < 68
                     ? [
                        ["<25>{#p/alphys}{#g/alphysOhGodNo}* Please don't touch those!!"],
                        ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Seriously.'],
                        ['<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'],
                        []
                     ][Math.min(SAVE.data.n.state_aerialis_terminter++, 3)]
                     : [])
               ]),
         ...(world.meanie && !world.genocide && world.badder_lizard
            ? [
               "<32>{#p/human}* (You notice you're alone.)",
               "<32>{#p/human}* (Despite knowing it'd collapse the outpost's atmosphere, you consider something.)",
               choicer.create('* (Smash the terminal?)', 'Yes', 'No')
            ]
            : [])
      ],
      termsmash1: ['<32>{#p/human}* (You decide not to smash.)'],
      termsmash2: ['<32>{#p/human}* (You take a swing...)'],
      puzzlenoot1: () => [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         world.nootflags.has('a_barricade1') // NO-TRANSLATE

            ? '<25>{#p/alphys}{#g/alphysInquisitive}* Did the puzzle solve itself as well?'
            : "<25>{#p/alphys}{#g/alphysInquisitive}* Huh, the puzzle looks like it's already been solved.",
         '<25>{#p/alphys}{#g/alphysFR}* How strange.',
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      puzzlenoot2: () => [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         world.nootflags.has('a_puzzle1') // NO-TRANSLATE

            ? "<25>{#p/alphys}{#g/alphysWelp}* And this one.\n* This one's solved as well."
            : "<25>{#p/alphys}{#g/alphysWelp}* Huh... seems like the puzzle's already been done by someone.",
         "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* We'll take it!!",
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      noequip: ['<32>{#p/human}* (You decide not to equip.)'],
      evac: ['<32>{#p/human}* (You feel the nearby monster presence dwindling.)'],
      endo: ['<32>{#p/human}* (You note the poor quality of this table.)'],
      businessKILLER: [
         '<32>{#p/basic}{#npc/a}* Just so ya know, kiddo...',
         "<32>* The Royal Guard'll be all over ya for that sorta thing.",
         "<32>* If I were ya, I'd quit while I was ahead.",
         "<32>* But that's just my take."
      ],
      harpyKILLER: ["<32>{#p/basic}* Huhehehaw...\n* Golly gosharoo, I think I'm in mortal danger!"],
      shopclosed: ['<32>{#p/human}* (But there was nothing left for you to do here.)'],
      afear: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         '<25>{#p/alphys}{#g/alphysNervousLaugh}* Uh, h-hey...',
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* Sorry about... running off and stuff...',
         '<25>{#p/alphys}{#g/alphysIDK}* ...',
         "<25>{#p/alphys}{#g/alphysNervousLaugh}* You'll be fine, right?\n* You won't...",
         "<25>{#p/alphys}{#g/alphysNervousLaugh}* You won't get into any more trouble, will you?",
         '<25>{#p/alphys}{#g/alphysSideSad}* ...',
         "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* Please...\n* D-don't do anything crazy, okay?",
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      escape: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         '<25>{#p/alphys}{#g/alphysCutscene1}* You made it!',
         '<25>{#g/alphysInquisitive}* Oh, uh, sorry about not using my camera before.',
         '<25>{#g/alphysYeahYouKnowWhatsUp}* I was trying to keep a \"low profile...\"',
         "<25>{#g/alphysIDK}* Anyway, I'll admit I was... getting k-kind of worried there.",
         '<25>{#g/alphysNervousLaugh}* But I guess things worked out in the end?',
         '<25>{#g/alphysNeutralSweat}* ... hmm.',
         "<25>* To tell you the truth, Undyne hasn't stopped l-looking for you.",
         '<25>{#g/alphysNervousLaugh}* I did lock down the elevators to Aerialis, but...',
         "<25>{#g/alphysNeutralSweat}* Sooner or later, she'll just use her jetpack to get up here.",
         '<25>* So... y-you should probably get going right away.',
         "<25>* The other elevator's just a few rooms ahead.\n* You can't miss it!",
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      approachescape: ['<32>{#p/human}* (You hear footsteps fading into the distance.)'],
      puzzlehelp: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         "<25>{#p/alphys}{#g/alphysWelp}* Just calling to let you know that I'm here if you need my help.",
         "<25>{#p/alphys}{#g/alphysCutscene2}* I'll keep my phone available while you're in the room!",
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      riverboi1: () => [
         '<32>{#p/basic}{#npc/a}* I am the traveler.\n* My taxi and I can take you to many places on the outpost.',
         '<32>* Where would you like to go?',
         choicer.create(
            '* (What do you say?)',
            game.room === 'w_wonder' // NO-TRANSLATE

               ? 'Cancel'
               : 'アウトランド',
            game.room === 's_taxi' // NO-TRANSLATE

               ? 'Cancel'
               : 'スタートン',
            game.room === 'f_taxi' // NO-TRANSLATE

               ? 'Cancel'
               : 'ファウンドリー',
            game.room === 'a_lookout' // NO-TRANSLATE

               ? 'Cancel'
               : 'エアリアル'
         )
      ],
      riverboi2: pager.create(
         2,
         ["<32>{#p/basic}{#npc/a}* Tra la la.\n* The underspace is fast today.\n* That's good luck..."],
         ["<32>{#p/basic}{#npc/a}* Tra la la.\n* The underspace is fast today.\n* That's bad luck..."],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Remember to take a break every-so-often...'],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* Everyone knows the old song from the music box...',
            '<32>{#p/basic}{#npc/a}* ... but do you know its counterpart?\n* The first thirteen are fine.'
         ],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* Keep your hands and feet inside the vehicle...',
            '<32>{#p/basic}{#npc/a}* ... and most of all, your SOUL.'
         ],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* I heard Toriel has a favorite drink.'],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* I heard Asgore has a favorite food.'],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* Remember the great King Erogot...',
            '<32>{#p/basic}{#npc/a}* ... and his son.'
         ],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* Temmie village...',
            '<32>{#p/basic}{#npc/a}* ... the room to the left of the short ladder.'
         ],
         ["<32>{#p/basic}{#npc/a}* Tra la la.\n* Why don't you sing with me?\n* Tra la la."],
         ["<32>{#p/basic}{#npc/a}* Hum hum hum...\n* Hum hum hum...\n* I'm having a little concert."],
         ['<32>{#p/basic}{#npc/a}* Pet pet pet...\n* The neck stretches infinitely into the cosmos.'],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* Remember to pay your fare...',
            '<32>{#p/basic}{#npc/a}* ... time and space are quite the valuable commodities.'
         ],
         ['<32>{#p/basic}{#npc/a}* Humans, monsters...\n* Stars.'],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* You can never have too many corn-dogs...',
            '<32>{#p/basic}{#npc/a}* ... if only they stayed atop your head.'
         ],
         [
            "<32>{#p/basic}{#npc/a}* Tra la la.\n* Don't snoop behind people's stations...",
            '<32>{#p/basic}{#npc/a}* ... you might be mistaken for a thief.'
         ],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* The underspace is bumpy today.'],
         ['<33>{#p/basic}{#npc/a}* Tra la la.\n* The underspace is smooth today.'],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* The royal scientist has a secret...'],
         ['<32>{#p/basic}{#npc/a}* One, two, three, four, five, six...', '<32>* ... reaching full capacity.'],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* That robot superstar has a troubled past...'],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Tri li li.\n* Tre le le.'],
         
         ['<32>{#p/basic}{#npc/a}* Tro lo lo.\n* Tru lu lu.', '<32>* ... alas, the vowels reach their end.'],
         [
            '<32>{#p/basic}{#npc/a}* Tra la la.\n* Eat a ghost fruit every day.',
            "<32>{#p/basic}{#npc/a}* ... why?\n* Then I know you're listening to me..."
         ],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Have you not heard the song of the stars?'],
         [
            "<32>{#p/basic}{#npc/a}* Tra la la.\n* What's a game you can play with a dog?",
            '<32>{#p/basic}{#npc/a}* ... asking for a friend.'
         ],
         ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Dog justice, dog justice everywhere.']
      ),
      riverboi2x: ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Idle dialogue is not available at this time.'],
      riverboi3: () => [
         '<32>{#p/basic}{#npc/a}* I am the traveler.\n* Dr. Alphys has requested my presence at this location.',
         '<32>* You would like to go to Aerialis, would you not?',
         choicer.create('* (What do you say?)', 'Yes', 'No')
      ],
      riverboi4: ['<32>{#p/basic}{#npc/a}* Thank you for taking this ride on my taxi.\n* My assignment is fulfilled.'],
      papinter1: pager.create(
         0,
         () =>
            SAVE.data.b.a_state_fishbetray
               ? [
                  '<18>{#p/papyrus}HELLO, HUMAN!',
                  "<18>{#p/papyrus}I'M GLAD YOU FINALLY SPOKE TO ME.",
                  "<18>{#f/4}THERE'S SO MANY INTERESTING THINGS TO DO HERE...",
                  '<18>{#f/0}HAVE YOU TRIED THE BOWLING ALLEY YET?',
                  '<18>{#f/9}OR, EVEN BETTER, THE SWIMMING POOL!',
                  ...(SAVE.data.b.killed_mettaton
                     ? [
                        '<18>{#f/4}BOTH OF WHICH ARE CLOSED AT THE MOMENT...',
                        '<18>{#f/5}... IN HONOR OF METTATON\'S SO- CALLED \"DEATH.\"'
                     ]
                     : [
                        '<18>{#f/4}BOTH OF WHICH ARE ACCESSIBLE VIA THE TAXI...',
                        '<18>{#f/5}... FOR ANYONE AGED TEN AND UP.'
                     ])
               ]
               : [
                  '<18>{#p/papyrus}HELLO, HUMAN!',
                  "<18>{#p/papyrus}IT'S ABOUT TIME YOU GOT HERE.",
                  "<18>{#f/4}THERE'S SO MANY INTERESTING THINGS TO DO...",
                  '<18>{#f/0}HAVE YOU TRIED THE BOWLING ALLEY YET?',
                  '<25>{#p/undyne}{#f/17}* Really, Papyrus?\n* Bowling?',
                  '<25>{#p/undyne}{#f/8}* The magical arts club is OBVIOUSLY better!',
                  "<18>{#p/papyrus}{#f/4}YOU'RE NOT AFRAID OF HUMAN GAMES, ARE YOU?",
                  '<25>{#p/undyne}{#f/4}* What!?\n* Of course not!',
                  "<25>{#p/undyne}{#f/5}* I'm just...",
                  "<25>{#p/undyne}{#f/12}* I'm just an avid believer in the beauty of artistry.",
                  "<18>{#p/papyrus}{#f/5}SO YOU'LL JOIN ME AT THE JAZZ AND BLUES MUSIC CLUB?",
                  "<25>{#p/undyne}{#f/8}* Oh my god, for the last time, I'm NOT playing a saxophone again!!"
               ],
         () =>
            SAVE.data.b.a_state_fishbetray
               ? SAVE.data.b.killed_mettaton
                  ? [
                     "<18>{#p/papyrus}{#f/6}DON'T BUY INTO IT!\nIT'S AN MTT-BRAND MARKETING STUNT!",
                     "<18>{#p/papyrus}{#f/5}METTATON'S QUITE INFAMOUS FOR THIS SORT OF THING.",
                     "<18>{#p/papyrus}{#f/4}... I DON'T LIKE IT ANY MORE THAN YOU DO."
                  ]
                  : [
                     "<18>{#p/papyrus}{#f/0}THAT'S TEN IN KRIOS-YEARS, BY THE WAY.",
                     '<18>{#p/papyrus}{#f/4}I HAVE NO IDEA HOW MANY EARTH-YEARS THAT IS...',
                     "<18>{#p/papyrus}{#f/5}THOUGH I'VE HEARD THE DIFFERENCE ISN'T THAT BIG."
                  ]
               : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                  ? [
                     "<18>{#p/papyrus}{#f/5}IT'S TOO BAD.\nUNDYNE WOULD BE A GREAT MUSICIAN.",
                     "<18>{#p/papyrus}{#f/4}IMAGINE ALL THE WARRIOR SONGS SHE'D WRITE...",
                     '<25>{#p/undyne}{#f/1}* Yeah, I guess.',
                     '<25>{#p/undyne}{#f/12}* That does sound kind of cool...',
                     "<18>{#p/papyrus}{#f/0}I KNOW, RIGHT?\nIT'D BE TOTALLY FISH-TASTITC!",
                     '<25>{#p/undyne}{#f/3}* ...',
                     '<25>{#p/undyne}{#f/3}* Never say that to me again.'
                  ]
                  : [
                     "<18>{#p/papyrus}IF YOU'RE LOOKING FOR THE ICE CREAM, IT'S TO MY RIGHT.",
                     '<25>{#p/undyne}{#f/3}* Don\'t you mean \"left?\"',
                     '<18>{#p/papyrus}{#f/5}TECHNICALLY, THE ICE CREAM STAND -IS- TO MY LEFT.',
                     "<18>{#p/papyrus}{#f/4}BUT TO THE HUMAN, IT'S ACTUALLY ON MY RIGHT.",
                     '<25>{#p/undyne}{#f/14}* Ah.\n* How considerate of you!',
                     "<25>{#p/undyne}{#f/17}* Just don't be surprised if they get lost."
                  ],
         () =>
            SAVE.data.b.a_state_fishbetray
               ? SAVE.data.b.killed_mettaton
                  ? ["<18>{#p/papyrus}{#f/5}HE SHOULDN'T HAVE TO LIE TO PROMOTE HIS BRAND..."]
                  : ['<18>{#p/papyrus}{#f/5}KEEPING TIME IS HARD SOMETIMES.']
               : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                  ? ['<18>{#p/papyrus}{#f/4}MY LIPS ARE SEALED.']
                  : ['<18>{#p/papyrus}{#f/5}DIRECTIONS CAN BE HARD SOMETIMES.']
      ),
      papinter2: () => [
         '<18>{#p/papyrus}{#f/0}HELLO, HUMAN.',
         '<18>{#p/papyrus}{#f/5}(SIGH...)',
         "<18>YOU'RE PROBABLY WONDERING WHY UNDYNE'S NOT HERE.",
         '<18>HOW DO I PUT IT...',
         "<18>{#f/6}LET'S SAY UNDYNE HAD TO LEAVE FOR... REASONS.",
         ...(SAVE.data.b.killed_mettaton
            ? [
               '<18>{#f/5}... INVOLVING HER THINKING THAT YOU...',
               '<18>{#f/1}KILLED SOMEONE!?!?',
               '<18>{#f/4}I MEAN, I UNDERSTAND WHY SHE DOES.',
               '<18>{#f/5}METTATON\'S \"DEATH\" -WAS- PRETTY CONVINCING.',
               "<18>{#f/0}STILL, EVERYBODY KNOWS THAT'S JUST FOR SHOW.",
               '<18>{#f/4}EVERYBODY EXCEPT FOR UNDYNE, OF COURSE.',
               '<18>{#f/5}I SWEAR...',
               '<18>{#f/5}THE THINGS THAT GO THROUGH HER HEAD SOMETIMES...',
               '<18>{#f/5}...'
            ]
            : [
               '<18>{#f/5}... INVOLVING HER FINDING OUT THAT YOU...',
               '<18>{#f/1}KILLED SOMEONE!?!?',
               "<18>{#f/0}BUT I'M SURE SHE'S JUST MISTAKEN.",
               "<18>{#f/5}YOU WOULDN'T DO ANYTHING LIKE THAT... RIGHT?",
               "<18>{#f/6}S-SO, I'VE DECIDED TO STAY.",
               '<18>{#f/9}SOMEONE HAS TO STAND UP FOR THE \"LITTLE GUY\" HERE!',
               '<18>{#f/0}OR GIRL. OR WHATEVER NAME YOU SO CHOOSE.',
               "<18>{#f/4}WAIT, WHAT IF YOU DON'T HAVE THAT KIND OF NAME...",
               '<18>{#f/8}WHAT WOULD I CALL YOU THEN!?!?'
            ]),
         "<18>{#f/0}WELL, I'LL BE HERE IF YOU WANT TO CHAT.",
         "<18>{#f/5}I'D BE HERE TO CALL, TOO, BUT...",
         "<18>{#f/5}UNDYNE SMASHED MY PHONE WHEN I SAID I'D CALL YOU.",
         "<18>{#f/6}SHE'S VERY PROTECTIVE, IT WOULD SEEM!"
      ],
      undinter: pager.create(
         0,
         () =>
            SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
               ? iRespeccYourVilliany()
                  ? [
                     '<25>{#p/undyne}{#f/1}* Hey, punk.\n* Long time no see.',
                     "<18>{#p/papyrus}{#f/6}WEREN'T YOU JUST ON TV WITH THEM A MOMENT AGO???",
                     "<25>{#p/undyne}{#f/14}* I mean, yeah, but a moment's a long time.",
                     "<18>{#p/papyrus}{#f/0}THAT'S TRUE.",
                     '<18>{#p/papyrus}{#f/5}WOW... IMAGINE ALL I COULD DO IF I HAD A MOMENT...',
                     "<18>{#p/papyrus}{#f/4}... WHERE I DIDN'T HAVE TO STOP SANS FROM SLACKING OFF.",
                     '<25>{#p/undyne}{#f/17}* Tell me about it.'
                  ]
                  : [
                     '<25>{#p/undyne}{#f/1}* Hey, punk.\n* Nice to see you.',
                     "<18>{#p/papyrus}{#f/6}WEREN'T YOU JUST ENEMIES WITH THEM EARLIER TODAY???",
                     "<25>{#p/undyne}{#f/14}* I mean, yeah, but that's all in the past now.",
                     '<18>{#p/papyrus}{#f/0}IF YOU SAY SO.',
                     '<18>{#p/papyrus}{#f/5}WOW... IMAGINE ALL I COULD DO IF SANS MEANT IT...',
                     '<18>{#p/papyrus}{#f/4}... EVERY TIME HE SAID SOMETHING WAS \"IN THE PAST.\"',
                     '<25>{#p/undyne}{#f/17}* Old habits die hard.'
                  ]
               : [
                  '<25>{#p/undyne}{#f/1}* Hey, punk.\n* Papyrus had some \"business\" to see to.',
                  "<25>{#f/14}* At least, that's what he tells me.",
                  "<25>{#f/7}* But that means I'M the only friend you've got up here!",
                  '<25>{#f/4}* ... so you better not do anything STUPID!'
               ],
         () =>
            SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
               ? [
                  '<25>{#p/undyne}{#f/1}* If you ever want to join me in the magical arts club...',
                  '<25>{#p/undyne}{#f/3}* ... er, I doubt the taxi would wanna take a kid there, actually.',
                  "<25>{#p/undyne}{#f/12}* Maybe they'll let you visit after you've grown up a little."
               ]
               : ["<25>{#p/undyne}{#f/11}* I've got my eye on you."]
      ),
      corndog1: pager.create(
         0,
         () => [
            "<25>{#p/sans}{#f/0}* i'm selling corn dogs for 5G a piece, if you're interested.",
            choicer.create('* (Buy the Corn Dog for 5G?)', 'Yes', 'No')
         ],
         () => ['<25>{#p/sans}{#f/0}* corn dogs for 5G.', choicer.create('* (Buy the Corn Dog for 5G?)', 'Yes', 'No')]
      ),
      corndog2: [
         "<32>{#p/human}* (You're carrying too much.)",
         "<25>{#p/sans}{#f/2}* tell you what, i'll just drop it right here."
      ],
      corndog2b: ['<25>{#p/sans}{#f/2}* here you go.'],
      corndog3: ["<32>{#p/human}* (You don't have enough G.)"],
      corndog3x: () =>
         [
            [
               "<25>{#p/sans}{#f/0}* you don't even have 5G?",
               '<25>{#p/sans}{#f/3}* ... here.\n* take some of mine.',
               '<32>{#s/equip}{#p/human}* (You got 100G.)',
               '<25>{#p/sans}{#f/2}* hope that helps.'
            ],
            [
               '<25>{#p/sans}{#f/0}* outta cash again?',
               "<25>{#p/sans}{#f/3}* ... eh.\n* don't worry about it.",
               "<25>{#p/sans}{#f/2}* i don't REALLY need the 5G, anyway."
            ]
         ][SAVE.data.n.cornmoney++],
      corndog4: () =>
         [
            ['<32>{#p/human}* (You got the Corn Dog.)', '<25>{#p/sans}{#f/2}* enjoy.'],
            [
               '<32>{#p/human}* (You got the Corn Goat.)',
               '<25>{#p/sans}{#f/2}* oops, that was supposed to be a dog.\n* my mistake.'
            ],
            ['<32>{#p/human}* (You got the Corn Dog.)']
         ][Math.min(SAVE.data.n.state_aerialis_corngoat++, 2)],
      corndog5: ['<32>{#p/human}* (You decide not to buy.)'],
      corndog6: () =>
         SAVE.data.b.svr
            ? ['<32>{#p/human}* (This sentry station strikes you as rather outrageous.)']
            : world.darker
               ? ["<32>{#p/basic}* It's a sentry station."]
               : ['<32>{#p/basic}* Just another sentry station for the one and only Sans.'],
      sanscall1: () => [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         ...(world.dead_skeleton
            ? [
               '<25>{#p/sans}{#f/0}* so, how was the show?',
               '<25>{#f/0}* good...?\n* bad...?',
               "<25>{#f/3}* eh, i'm just the guy with the puns.",
               "<25>{#f/2}* someone like me wouldn't know the difference anyway.",
               ...(world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                  ? ["<26>{#f/3}* but... hey.\n* i wasn't really paying attention, so it's fine."]
                  : ["<25>{#f/3}* but... hey.\n* i wasn't even there to see it, so it's fine."]),
               '<25>{#f/0}* i only ask, because...\n* frankly...',
               "<25>{#f/0}* it'd be nice to know if a part of you still cared about something.",
               "<25>{#f/3}* i hope that's not asking too much."
            ]
            : [
               '<25>{#p/sans}{#f/0}* so, how was the show?',
               ...(SAVE.data.b.a_state_moneyfish
                  ? [
                     '<25>{#p/sans}{#f/2}* trade blows with undyne, didja?',
                     "<25>{#f/3}* heh.\n* sorry i couldn't make it.",
                     '<25>{#f/0}* once undyne applied, i basically had no chance.',
                     ...(SAVE.data.b.bad_lizard
                        ? ['<25>{#f/3}* besides...', '<25>{#f/0}* i have people like you to worry about nowadays.']
                        : ['<25>{#f/0}* the \"captain of the royal guard\" is far better for ratings.'])
                  ]
                  : world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                     ? [
                        '<25>{#p/sans}{#f/2}* lose out early, did ya?',
                        "<25>{#f/3}* heh.\n* guess you're not as popular as i thought.",
                        "<25>{#f/0}* but that's fine.",
                        ...(SAVE.data.b.bad_lizard
                           ? ['<25>{#f/0}* it kind of makes sense after you made everyone run away.']
                           : ['<25>{#f/0}* at least you were a good sport about it.'])
                     ]
                     : [
                        '<25>{#p/sans}{#f/2}* carry on without me, did ya?',
                        "<25>{#f/3}* don't worry, i'm used to being the odd one of the bunch.",
                        "<25>{#f/2}* it's just that, usually, nobody else knows about it.",
                        ...(SAVE.data.b.bad_lizard
                           ? [
                              "<25>{#f/3}* ... and, considering what you've been up to lately...",
                              "<25>{#f/0}* that's undoubtedly for the best."
                           ]
                           : ["<25>{#f/0}* well.\n* i'm glad you had fun."])
                     ]),
               '<25>{#f/3}* ... by the way...',
               '<25>{#f/2}* if you see any bouncy armored guards up there, let me know.',
               '<25>{#f/3}* i lost track of them on the way out here.'
            ]),
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      tvm1: ['<32>{#p/human}* (You got the Old Radio.)', '<32>{#p/basic}{#npc/a}* Hope you like your new radio!'],
      tvm2: ['<32>{#p/human}* (You got the Fireworks.)', '<32>{#p/basic}{#npc/a}* Hope you enjoy the fireworks!'],
      tvm3: ["<32>{#p/human}* (You're carrying too much.)"],
      tvm4: pager.create(0, ['<32>{#p/basic}{#npc/a}* Your winnings are on the table there, little one.']),
      tvm5: pager.create(
         0,
         () =>
            SAVE.data.n.plot === 72
               ? [
                  "<32>{#p/basic}{#npc/a}* I decided I'd rather quit than be fired again.",
                  '<32>* Working for Mettaton was nice, but a new homeworld means a new me.',
                  "<32>* Don't worry.\n* I'll find the perfect job..."
               ]
               : [
                  '<32>{#p/basic}{#npc/a}* I work for Mettaton.\n* I like my job.\n* My co-workers do not.',
                  '<32>* Each ring on my body represents a time I survived the firing process.',
                  "<32>* Don't worry.\n* I always get re-hired later."
               ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  "<32>{#p/basic}{#npc/a}* I'm thinking of becoming an expert on the mating rituals of space creatures."
               ]
               : ["<32>{#p/basic}{#npc/a}* I'm thinking of getting a ring on my face next time."]
      ),
      tvm6: () => [
         '<32>{#p/basic}{#npc/a}* There was a Mew Mew doll here for you, but Mettaton had it recalled for personal reasons.',
         "<32>{#p/basic}{#npc/a}* As compensation, here's its full value in G.",
         '<32>{#s/equip}{#p/human}{#npc}* (You got 999G.)',
         ...((SAVE.data.b.a_state_moneyitemA && !SAVE.data.b.item_tvm_radio) ||
            (SAVE.data.b.a_state_moneyitemB && !SAVE.data.b.item_tvm_fireworks)
            ? ['<32>{#p/basic}{#npc/a}* The rest of your winnings are still available for pickup.']
            : ['<32>{#p/basic}{#npc/a}* I apologize for the trouble.'])
      ],
      tvm7: () =>
         SAVE.data.b.svr
            ? ['<32>{#p/human}* (The note etched into the table apologizes for retaking an item.)']
            : [
               "<32>{#p/basic}* There's a note etched into the table here.",
               '<32>{#p/mettaton}* \"SORRY, BUT I HAD TO TAKE THE MEW MEW DOLL BACK WITH ME.\"\n* \"NOTHING PERSONAL, OF COURSE.\"'
            ],
      tvm8: ['<32>{#p/human}* (You got the Old Radio.)'],
      tvm9: ['<32>{#p/human}* (You got the Fireworks.)'],
      lockup0: () =>
         SAVE.data.b.svr ? ["<32>{#p/human}* (But you didn't have the key.)"] : ["<32>{#p/basic}* It's locked."],
      lockup1: () => [
         '<32>{#p/human}* (You unlocked the safe with the Rusty Key.)',
         ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* The shelves are labelled \"old earth weaponry.\"'])
      ],
      lockup2: ['<32>{#p/human}* (You got the Stun Gun.)'],
      lockup3: ['<32>{#p/human}* (You got the Sleep Bomb.)'],
      lockup4: ['<32>{#p/human}* (You got the Sugar Spray.)'],
      lockup5: () =>
         SAVE.data.b.svr
            ? ["<32>{#p/human}* (But there wasn't anything left to take here.)"]
            : ["<32>{#p/basic}* It's empty."],
      lockup6: ["<32>{#p/human}* (You're carrying too much.)"],
      gonezo: () =>
         world.bulrun ? ['<23>{#p/basic}＊…しかし　みんな　にげてしまいました。'] : ['<32>{#p/basic}* ... but nobody came.'],
      spidershop1: () => [
         SAVE.data.n.plot === 72
            ? choicer.create('* (Leave 36G in the web?)', 'Yes', 'No')
            : choicer.create('* (Leave 56G in the web?)', 'Yes', 'No')
      ],
      spidershop2: [
         '<32>{#p/basic}* Some spiders crawled out and gave you an item.',
         '<32>{#s/equip}{#p/human}* (You got the Hyper Vortex Pop.)'
      ],
      spidershop3: ["<32>{#p/human}* (You're carrying too much.)"],
      spidershop4: ["<32>{#p/human}* (You don't have enough G.)"],
      spidershop5: ['<32>{#p/human}* (You decide not to leave anything.)'],
      spidershop6: [
         "<32>{#p/basic}* There's a message woven into the web.",
         '<32>{#p/basic}* \"At peace, spider queen.\"'
      ],
      spidershop7: () =>
         SAVE.data.b.svr
            ? [
               '<32>{#p/human}* (You run your hand through the spider web.)',
               ...[
                  [
                     "<25>{#p/asriel1}{#f/10}* Frisk, there's nothing in there except spider silk.",
                     "<25>* You're going to make a mess."
                  ],
                  [
                     '<25>{#p/asriel1}{#f/13}* Please trust me.\n* This will take forever to wash away.',
                     '<25>{#f/15}* I have... experience.'
                  ],
                  ['<25>{#p/asriel1}{#f/15}* Or... you could just keep doing it.', "<26>{#f/16}* That's your loss."],
                  ['<25>{#p/asriel1}{#f/13}* Really now...']
               ][Math.min(asrielinter.spiderweb++, 3)]
            ]
            : ['<32>{#p/basic}* The web is empty.'],
      hotelfood0: () =>
         SAVE.data.b.svr
            ? [
               "<32>{#p/human}* (You dip your hands into the strange bowl of food.)\n* (It's quite slimy.)",
               choicer.create('* (Take the food?)', 'Yes', 'No')
            ]
            : ["<33>{#p/basic}* It's a kind of mysterious food.", choicer.create('* (Take the food?)', 'Yes', 'No')],
      hotelfood1: () => [
         '<32>{#p/human}* (You got the Mysteryfood.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [
               "<25>{#p/asriel1}{#f/15}* That... thing... can't be healthy for you.",
               '<25>{#f/16}* I hope you realize that.'
            ]
            : [])
      ],
      hotelfood2: ["<32>{#p/human}* (You're carrying too much.)"],
      hotelfood3: ['<32>{#p/human}* (You decide not to take anything.)'],
      sonic1: () => [
         '<32>{#p/human}* (You got the Sonic Resonator.)',
         choicer.create('* (Equip the Sonic Resonator?)', 'Yes', 'No')
      ],
      sonic2: ["<32>{#p/human}* (You're carrying too much to take that.)"],
      tablaphone1: () => [
         '<32>{#p/human}* (You got the Tablaphone.)',
         choicer.create('* (Equip the Tablaphone?)', 'Yes', 'No')
      ],
      tablaphone2: ["<32>{#p/human}* (You're carrying too much to take that.)"],
      moonpie1: () => [
         '<32>{#p/human}* (You got the Moon Pie.)',
         ...(SAVE.data.b.svr
            ? ['<32>{#p/human}* (The attached note describes an intention to help someone in need.)']
            : [
               "<32>{#p/basic}* There's a note attached...",
               '<32>{#p/basic}* \"I know I\'m different. I don\'t fit in with most people on the outpost.\"',
               '<32>{#p/basic}* \"But maybe, with this simple slice of pie, I can help someone out.\"',
               '<32>{#p/basic}* \"Someone kind, but misunderstood like myself...\"',
               '<32>{#p/basic}* \"... someone in need of some extra health.\"'
            ])
      ],
      moonpie2: ["<32>{#p/human}* (You're carrying too much to take that.)"],
      ratings: 'RATINGS $(x)',
      gold: 'GOLD $(x)',
      secretcall: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         '<18>{#p/papyrus}{#f/5}PAPYRUS HERE.',
         "<18>{#f/5}I'VE DECIDED I CAN'T HIDE AWAY ANY LONGER.",
         '<18>{#f/6}THE PEOPLE OUT THERE NEED MY HELP!',
         '<18>{#f/5}AND, ULTIMATELY...',
         "<18>{#f/6}I'D LIKE TO CATCH UP WITH YOU IN PERSON AGAIN.",
         '<18>{#f/7}IF \"ASRIEL\" SEES ME ALIVE, THEN SO BE IT!',
         '<18>{#f/7}I REFUSE TO STAND AROUND AND DO NOTHING ALL DAY.',
         '<18>{#f/4}...',
         '<18>{#f/4}SEE YOU SOON.',
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      story: {
         phonegrabber1: () => [
            game.room === 'a_lab_downstairs' // NO-TRANSLATE

               ? "<33>{#p/basic}* It's Alphys's spare cell phone.\n* Comes with a liftgate pass and two dimensional boxes."
               : "<32>{#p/basic}* It's a smart cell phone.\n* Comes with a liftgate pass and two dimensional boxes.",
            ...(world.genocide
               ? ['<32>{#p/basic}* The one-time use portable jetpack slot is notably empty.']
               : ['<32>{#p/basic}* Additionally, a one-time use portable jetpack is available.'])
         ],
         phonegrabber2: ['<32>{#p/human}* (You got the upgraded CELL.)'],
         phonegrabber3: () =>
            SAVE.flag.n.ga_asrielGetThePhone > 1
               ? ['<25>{#p/asriel2}{#f/10}* Finally.']
               : ["<25>{#p/asriel2}{#f/10}* I wonder if there's any old messages on it."],
         alphys1: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? ['<25>{#p/alphys}{#f/2}* Oh my god!', '<25>{#f/3}* How did you...']
               : ['<25>{#p/alphys}{#f/2}* Oh my god!', '<25>{#f/3}* How did you get here so fast!?'],
         alphys2: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? ["<25>{#p/alphys}{#f/10}* O-oh... you're the human who...", '<25>{#f/3}* Who... uh...']
               : ["<25>{#f/4}* I just got off the phone, I still haven't checked the lab...", '<25>{#f/17}* ...'],
         alphys3: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? [
                  "<25>{#g/alphysWhyOhWhy}* You know what, there's no problem here!",
                  "<25>{#g/alphysUhButHeresTheDeal}* You didn't do anything wrong at all!",
                  "<25>{#g/alphysCutscene1}* Nope!\n* You're just a...",
                  '<25>{#g/alphysCutscene2}* A perfect little angel who never did a single wrong thing.',
                  '<25>{#f/20}* ...',
                  "<25>{#f/10}* A-anyway, you're, like, new to Aerialis, right!?",
                  '<25>{#g/alphysIDK}* Well, then... y-you...',
                  "<25>{#f/3}* You're g-g-gonna need my help!",
                  "<25>{#f/5}* 'Cause... like...",
                  '<25>{#f/10}* I-it\'s not really a... \"human friendly\" place.',
                  '<25>{#f/3}* Deadly traps...\n* Impossible puzzles...\n* ... and, uh...',
                  '<25>{|}{#g/alphysIDK}* C-crud, what was I going to- {%}'
               ]
               : [
                  ...[
                     [
                        '<25>{#f/1}* Well, uh, h-hiya!',
                        "<25>{#f/1}* I'm Dr. Alphys.\n* Head of the royal science division.",
                        '<25>{#f/10}* But, uh, I\'m not actually one of the \"bad guys!\"',
                        "<25>{#f/17}* Actually, since you left the Outlands, I've been...",
                        '<25>{#f/5}* Eheh, \"observing\" you through my security consoles.',
                        '<25>{#f/8}* Your fights...\n* Your friendships...',
                        '<25>{#f/1}* Everything!',
                        '<25>{#f/9}* OH! And my favorite part of all...',
                        ...(SAVE.data.b.s_state_million
                           ? [
                              "<25>{#f/16}* ... was watching you destroy Sans's cheated h-high score!",
                              '<25>{#f/12}* So awesome...'
                           ]
                           : SAVE.data.b.f_state_thundersnail_win
                              ? [
                                 '<25>{#f/16}* ... was how you actually won a game o-of electrosnail!',
                                 '<25>{#f/12}* So awesome...'
                              ]
                              : !SAVE.data.b.papyrus_fire
                                 ? [
                                    '<25>{#f/16}* ... was how you got through the wall of fire on your first try!',
                                    '<25>{#f/12}* So awesome...'
                                 ]
                                 : SAVE.data.b.s_state_mathpass
                                    ? [
                                       '<25>{#f/16}* ... was how you beat the number neutralizer puzzle by y-yourself!',
                                       '<25>{#f/12}* So awesome...'
                                    ]
                                    : ['<25>{#f/16}* ... was watching you fight Undyne???']),
                        "<25>{#f/18}* But, uh, you're gonna need my help to get through Aerialis!"
                     ],
                     [
                        '<25>{#f/8}* Well, h-hiya...',
                        "<25>{#f/9}* I'm... Dr. Alphys.\n* Head of the royal science division.",
                        "<25>{#f/4}* Ever since you left the Outlands, I've been...",
                        '<25>{#f/4}* Eheh, \"observing\" you through my security consoles.',
                        '<25>{#f/11}* Your fights...\n* Your friendships...',
                        '<25>{#f/11}* ...',
                        ...(SAVE.data.n.state_starton_papyrus === 1
                           ? ["<25>{#f/13}* Even...\n* Papyrus's d-death..."]
                           : SAVE.data.n.state_foundry_doge === 1 && SAVE.data.n.state_foundry_muffet === 1
                              ? ["<25>{#f/13}* ... even the deaths of Undyne's ELITE s-squad..."]
                              : SAVE.data.n.state_starton_dogs === 2 ||
                                 (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                                 (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
                                 (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) >
                                 1
                                 ? ['<25>{#f/13}* ... even the deaths of the c-canine unit...']
                                 : SAVE.data.n.state_starton_doggo === 2
                                    ? ["<25>{#f/13}* Even...\n* Doggo's d-death..."]
                                    : SAVE.data.n.state_foundry_muffet === 1
                                       ? ["<25>{#f/13}* Even...\n* Muffet's d-death..."]
                                       : SAVE.data.n.state_foundry_doge === 1
                                          ? ["<25>{#f/13}* Even...\n* Doge's d-death..."]
                                          : SAVE.data.n.state_starton_greatdog === 2
                                             ? ["<25>{#f/13}* Even...\n* Canis Major's d-death..."]
                                             : SAVE.data.n.state_starton_lesserdog === 2
                                                ? ["<25>{#f/13}* Even...\n* Canis Minor's d-death..."]
                                                : ["<25>{#f/13}* ... even those monsters' d-deaths..."]),
                        "<25>{#f/10}* ... but hey, it's not all bad... right?",
                        "<25>{#g/alphysCutscene2}* You're alive, you made it here in one piece...",
                        '<25>{#f/3}* That has to count for something, right???',
                        '<25>{#g/alphysIDK}* ...',
                        "<25>{#g/alphysIDK}* That being said, you're probably gonna need my help in Aerialis."
                     ]
                  ][world.bad_lizard],
                  '<25>{#f/15}* Yeah... it\'s not really a \"human friendly\" place...',
                  '<25>{#f/17}* Deadly traps...\n* Impossible puzzles...\n* Royal guards...',
                  '<25>{|}{#f/15}* Not to mention- {%}'
               ],
         alphys4: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? ['<25>{#g/alphysIDK}* No... no no no no no...']
               : ['<25>{#f/20}* Mettaton.'],
         alphys5: () =>
            SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* Not here... not now...'] : ['<25>{#f/3}* Eheh...'],
         alphys6: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* ...'] : ['<25>{#f/20}* ...']),
         alphys7: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/23}* Oh god.'] : ['<25>{#f/11}* Oh no.']),
         alphys8: () => [
            SAVE.data.n.state_foundry_undyne > 0 ? '<32>{#p/mettaton}* OHHHH MY!' : '<32>{#p/mettaton}* OHHHH YES!',
            '<32>{#p/mettaton}* WELCOME, BEAUTIES...'
         ],
         alphys9: ["<32>{#p/mettaton}* TO TODAY'S TALENT SHOW!"],
         alphys10: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/mettaton}* YOU KNOW, FOR A SEEMINGLY \"INNOCENT\" HUMAN CHILD...',
                  '<32>* YOU SURE KNOW HOW TO LAY DOWN THE HURT!',
                  '<32>* BEING BROADCAST TO YOUR SCREENS NOW IS REAL FOOTAGE OF THEIR VILLAINOUS ACTS!',
                  SAVE.data.n.state_foundry_undyne > 0
                     ? '<25>{#p/alphys}{#f/2}* M-mettaton, wait!!\n* What are you...'
                     : '<25>{#p/alphys}{#g/alphysGarbo}* Huh?\n* Did you steal security footage again?'
               ]
               : [
                  "<32>{#p/mettaton}* I CAN ALREADY TELL IT'S GONNA BE A GREAT SHOW!",
                  "<32>* LET'S GIVE A ROUND OF APPLAUSE TO OUR NEW CONTESTANT...",
                  '<33>* THE ONE AND ONLY HUMAN VISITOR!'
               ],
         alphys10a: () => [
            '<32>{#p/mettaton}* (PLEASE WAIT AS THE AUDIENCE WATCHES THE FOOTAGE.)',
            SAVE.data.n.state_foundry_undyne > 0
               ? "<25>{#p/alphys}{#f/21}* ...\n* I just can't win."
               : "<26>{#p/alphys}{#g/alphysGarboCenter}* I'll take that as a yes."
         ],
         alphys11: () =>
            iFancyYourVilliany()
               ? [
                  "<32>{#p/mettaton}* ANYWAY, THAT BEING SAID, WE'LL NEED TO GIVE THEM A MONIKER!",
                  ...(world.flirt > 9
                     ? [
                        '<32>{#p/mettaton}* WHEN IT COMES TO VILLAINS, ALL THE GREATS HAVE ONE.\n* BUT YOU...',
                        "<32>{#p/mettaton}* FOR A FLIRTATIOUS BULLY LIKE YOU, THERE'S ONLY ONE NAME THAT FITS!",
                        '<32>{#p/mettaton}* ... $(moniker1u)!'
                     ]
                     : [
                        "<32>{#p/mettaton}* WHEN IT COMES TO VILLAINS, ALL THE GREATS HAVE ONE.\n* SO WHAT'LL IT BE?"
                     ])
               ]
               : ['<32>{#p/mettaton}* NEVER PLAYED BEFORE, GORGEOUS?', "<32>* WELL, IT'S SIMPLE."],
         alphys11a: () => [
            choicer.create(
               '* (Which name will you choose?)',
               'Yellow Kid',
               'Oncoming Storm',
               'Hyper Rage',
               'Space Invader'
            )
         ],
         alphys11b: () =>
            iFancyYourVilliany()
               ? world.flirt > 9
                  ? ["<32>{#p/mettaton}* SO, $(moniker2u), LET'S SEE IF YOUR SKILLS ON THE BATTLEFIELD..."]
                  : [
                     '<32>{#p/mettaton}* $(moniker1u), HUH?\n* MY, WHAT AN EXCELLENT CHOICE!',
                     "<32>{#p/mettaton}* WELL, $(moniker2u), LET'S SEE IF YOUR SKILLS ON THE BATTLEFIELD..."
                  ]
               : ["<32>* IN FACT, THERE'S ONLY ONE RULE!", '<32>* PUT ON THE BEST PERFORMANCE OF YOUR LIFE...'],
         alphys12: () =>
            iFancyYourVilliany()
               ? ['<32>{*}{#p/mettaton}* TRANSLATE TO THE STAGE!!!{^20}{%}']
               : ['<32>{*}{#p/mettaton}* OR DIE TRYING!!!{^20}{%}'],
         alphys13: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? [
                  '<25>{#p/alphys}{#f/10}* Y... you know what?',
                  '<25>{#f/10}* You can do whatever you want.',
                  "<25>{#f/23}* 'Cause... I'm leaving.",
                  '<25>{#f/23}* Forever.',
                  '<25>{#f/5}* And if you need me for something...',
                  '<25>{#f/5}* Well...',
                  '<25>{|}{#f/16}* Too bad!!!{%}'
               ]
               : [
                  ...(world.bad_lizard < 1
                     ? [
                        '<25>{#p/alphys}{#f/5}* Hey...',
                        '<25>{#f/8}* I know that kinda came outta nowhere, but... you were p-pretty cool.'
                     ]
                     : [
                        '<25>{#p/alphys}{#f/5}* Hey...',
                        '<25>{#f/8}* I know that kinda came outta nowhere, but...',
                        '<25>* You handled it p-pretty well.'
                     ]),
                  "<25>{#f/9}* Anyway, uh, as I was saying, you're gonna need my help.",
                  "<25>{#f/17}* Let's see what you've got on you..."
               ],
         alphys14: [
            '<25>{#p/alphys}{#f/21}* ...',
            '<25>{#f/21}* What is this.',
            '<25>{#f/21}* Who gave you this.',
            '<25>{#f/22}* WHO IS STILL USING TECHNOLOGY LIKE THIS???',
            '<25>{#f/22}* ...',
            "<25>{#f/23}* I'll be right back."
         ],
         alphys15: () =>
            world.bad_lizard < 1
               ? [
                  '<25>{#p/alphys}{#g/alphysCutscene1}* Okay, I got you a new cell phone!',
                  "<25>* It's got a liftgate pass, dimensional boxes...",
                  '<25>{#g/alphysHellYeah}* And your very own OuterNet account!',
                  '<25>{#g/alphysSmileSweat}* I also made us friends so you can ping me for help at any time!',
                  '<25>{#g/alphysUhButHeresTheDeal}* So yeah!!',
                  '<32>{#s/equip}{#p/human}* (You got the upgraded CELL.)'
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysWelp}* Sorry, but that thing you were using was a glorified brick.',
                  "<25>{#g/alphysSide}* This new phone's got a liftgate pass, dimensional boxes...",
                  '<25>{#g/alphysSmileSweat}* And your very own OuterNet account!',
                  "<25>{#g/alphysNervousLaugh}* Don't worry, I made us friends so you can ping me for help if needed.",
                  '<32>{#s/equip}{#p/human}* (You got the upgraded CELL.)'
               ],
         alphys16: ["<25>{#p/alphys}{#g/alphysWelp}* I'll be at my desk."],
         rg1a: () =>
            world.bad_lizard > 1
               ? world.goatbro
                  ? ['<32>{#p/basic}{#x1}* You two!{#x3}']
                  : ['<32>{#p/basic}{#x1}* You there!{#x3}']
               : ['<32>{#p/basic}{#x1}* Hey kid!{#x3}'],
         rg1b1: () =>
            world.bad_lizard > 1
               ? ['<32>{#p/basic}{#x1}* Can you like, tell us why you killed those people?{#x3}']
               : ['<32>{#p/basic}{#x1}* Can you like, help us find the nearest ice cream stand?{#x3}'],
         rg1b2: () =>
            world.bad_lizard > 1
               ? ["<32>{#p/basic}{#x1}* My boyfriend and I... think it's kind of uncool.{#x3}"]
               : ['<32>{#p/basic}{#x1}* My boyfriend and I have been looking all over the place!{#x3}'],
         rg1c: () =>
            world.bad_lizard > 1
               ? ['<33>{#p/basic}{#x2}* Damn, bro.\n* I think we, like, have to kill them and stuff.{#x3}']
               : [
                  '<32>{#p/basic}{#x1}* You okay, kid?{#x3}',
                  "<32>{#x1}* You're acting, like, pretty weird and stuff...{#x3}",
                  '<32>{#x1}* You know, with the whole \"not talking to us\" thing and all...{#x3}',
                  '<32>{#x1}* So, uh...{#x3}'
               ],
         rg1d1: () =>
            world.bad_lizard > 1
               ? ["<32>{#p/basic}{#x1}* Yeah...\n* Guess that's kind of our job now, huh?{#x3}"]
               : ["<32>{#p/basic}{#x1}* Forget it, bro.\n* I don't think they even know we're standing here.{#x3}"],
         rg1d2: [
            '<32>{#p/basic}{#x2}* But the ice cream!{#x3}',
            "<32>{#p/basic}{#x1}* Come on, bro.\n* We can't stay away from training all day.{#x3}"
         ],
         rg1d3: ['<32>* ...', '<32>{#x2}* Yeah, okay.{#x3}'],
         rg1e: [
            '<32>{#p/basic}{#x1}* Well, see ya, I guess...{#x3}',
            "<32>{#x2}* We'll let ya know how that ice cream thing goes later!{#x3}"
         ],
         rg1f: [
            '<33>{#p/basic}{#x1}* Bro... we gotta get outta here!{#x3}',
            '<32>{#x2}* Yeah, like, sorry Undyne!{#x3}'
         ],
         robocaller1: () =>
            [
               [
                  '<32>{#p/mettaton}* THERE YOU ARE.',
                  '<32>{#z03}* YOU MAY NOT KNOW ME, BUT I KNOW YOU...',
                  "<32>{#z21}* YOU'RE THE ONE WHO HAD AN ENCOUNTER WITH THE CAPTAIN OF THE GUARD.",
                  "<32>{#z30}* AN ENCOUNTER WHICH ENDED IN THAT CAPTAIN'S DEATH.",
                  "<32>{#z31}* NOW, PERSONALLY, I'M NOT THE BIGGEST FAN OF UNDYNE.",
                  '<32>{#z30}* BUT ALPHYS... VERY MUCH WAS.',
                  "<32>{#z21}* AND SHE'S TAKING THIS ALL PRETTY HARD.",
                  "<32>{#z21}* I'M NOT SAYING YOU'RE A BAD PERSON, BUT YOUR CHOICES... HURT MY FRIEND.",
                  "<33>{#z30}* ... LET'S JUST SAY SHE ISN'T GOING TO BE AROUND FOR A WHILE.",
                  "<32>{#z03}* DON'T WORRY, THOUGH.\n* IF YOU EVER FEEL LONELY, YOU CAN REST ASSURED...",
                  "<32>{#z02}* I'LL BE WATCHING YOUR EVERY MOVE.",
                  '<32>{#z21}* ...',
                  '<32>{#z11}* WELL, TOODLES!'
               ],
               [
                  '<32>{#p/mettaton}* THERE YOU ARE, BRAT.',
                  '<32>{#z03}* YOU MAY NOT KNOW ME, BUT I KNOW YOU...',
                  '<32>{#z21}* ALPHYS AND I WATCHED YOU DO SOME PRETTY BAD THINGS.',
                  "<32>{#z00}* YOU SEE, WE'D UNDERSTAND IF IT WAS JUST A FEW SMALL MISTAKES...",
                  '<32>* HECK, ALPHYS AND I ARE BIG BELIEVERS IN HUMANS.',
                  "<32>{#z03}* BUT THERE'S ONLY SO MUCH VIOLENCE YOU CAN EXCUSE.",
                  "<32>{#z21}* ALPHYS... ISN'T GOING TO BE JOINING US FOR TODAY...",
                  "<32>{#z00}* AFTER WHAT YOU'VE DONE, IT'S PROBABLY FOR THE BEST.",
                  '<32>{#z21}* TRY NOT TO KILL ANYONE ELSE, WILL YOU?',
                  '<32>{#z21}* ...',
                  '<32>{#z11}* WELL, TOODLES!'
               ],
               [
                  '<32>{#p/mettaton}* THERE YOU ARE.',
                  '<32>{#z03}* YOU MAY NOT KNOW ME, BUT...',
                  '<32>* ...',
                  '<32>{#z00}* ...',
                  "<32>* LOOK.\n* I'LL BE HONEST.",
                  "<32>{#z11}* I'M TO THE POINT WHERE ALL THIS DEATH YOU TWO HAVE CAUSED JUST FEELS... NUMB.",
                  "<32>{#z00}* BUT THERE'S ONE PERSON I CAN'T GO WITHOUT.",
                  ...(SAVE.flag.n.genocide_milestone < 5
                     ? [
                        "<32>* SHE WON'T ANSWER HER PHONE...",
                        "<32>{#z21}* SHE WON'T REPLY TO MY OUTERNET MESSAGES, EVEN THOUGH SHE'S BLATANTLY ONLINE.",
                        '<32>{#z11}* AND, THE THINGS SHE SAID TO ME BEFORE SHE LEFT, JUST MOMENTS AGO...?',
                        '<32>{#z00}* HAVE ME VERY CONCERNED.'
                     ]
                     : [
                        "<32>{|}* SHE WON'T ANSWER HER- {%}",
                        '<25>{#z21}{#p/asriel2}{#f/8}* For your information, SHE is planning to fight us.',
                        "<32>{#z00}{#p/mettaton}* UM, EXCUSE ME?\n* IT'S RUDE TO INTERRUPT PEOPLE WHEN THEY'RE TALKING."
                     ]),
                  '<32>* HUMAN, IF YOU HAVE ANY SHRED OF DECENCY LEFT...',
                  "<32>* YOU'LL DO WHAT ALPHYS SAID YOU HAD THE POWER TO DO...",
                  '<32>* AND RESET THE TIMELINE.',
                  "<32>{#z11}* OTHERWISE, WITH THE WAY YOU'RE GOING RIGHT NOW...?",
                  "<32>{#z02}* YOU'RE IN FOR A BAD TIME."
               ]
            ][Math.max(world.bad_lizard - 1, 0)],
         robocaller1x: [
            "<25>{#p/asriel2}{#f/13}* You really think you're a threat to me?",
            "<25>{#f/9}* Don't make me LAUGH."
         ],
         robocaller2: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? [
                  '<32>{#p/mettaton}{#z11}* OH, SWEETHEART...\n* YOU HAVE NO IDEA, DO YOU...?',
                  '<32>{#z02}* HAHAHA...',
                  '<32>{#z03}* JUST REMEMBER, YOU TWO...',
                  "<32>{#z12}* YOU'VE BEEN WARNED.",
                  '<32>{#z21}* ...',
                  '<32>{#z11}* WELL, TOODLES!'
               ]
               : [
                  "<32>{#p/mettaton}{#z11}* NO OFFENSE, SWEETHEART, BUT THAT'S UTTERLY RIDICULOUS.",
                  "<32>{#z03}* ALPHYS ISN'T A FIGHTER, IN FACT, SHE TOLD ME SO HERSELF.",
                  '<32>{#z12}* ... BUT I KNOW SOMEONE WHO IS.',
                  '<32>{#z02}* HAHAHA...',
                  '<32>{#z21}* ...',
                  '<32>{#z11}* WELL, TOODLES!'
               ],
         robocaller2x: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? ['<25>{#p/asriel2}{#f/13}* Okay?']
               : ['<25>{#p/asriel2}{#f/16}* Cool.'],
         status: '$(x)が近況を更新しました',
         barricade1: () => [
            '<32>{#p/event}* Ring, ring...',
            "<25>{#p/alphys}{#g/alphysSideSad}* I don't think you can get through that...",
            '<25>{#g/alphysSmileSweat}* Let me see if I can do anything to help.',
            '<32>{#p/human}* (It sounds like someone is furiously typing at a keyboard.)',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Security... w-what?',
            '<32>{#p/human}* (More typing can be heard.)',
            '<32>{#p/human}* (...)',
            '<32>{#p/human}* (The typing stops.)',
            "<25>{#p/alphys}{#g/alphysWelp}* So... looks like we're gonna have to answer security questions.",
            "<25>{#g/alphysGarbo}* Mettaton's security questions...",
            '<25>{#g/alphysNeutralSweat}* Do you... happen to know anything useful about Mettaton?',
            '<25>{#g/alphysTheFactIs}* ... probably not, considering you just met him...',
            "<25>{#g/alphysUhButHeresTheDeal}* Well, uh, maybe you'll know the answer to the first one.",
            '<25>{|}{#g/alphysIDK}* \"Who has the bi- {%}',
            ...(world.postnoot
               ? []
               : [
                  "<25>{#g/alphysWTF}* Oh my god of course he'd use that as a security question.",
                  '<25>{#g/alphysNervousLaugh}* \"Who has the biggest crush on Mettaton?\"',
                  choicer.create('* (What do you say?)', 'Alphys', 'Asgore', 'Papyrus', 'Undyne')
               ])
         ],
         barricade1x: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* ... huh?',
            '<25>{#g/alphysWelp}* The barricades just... lifted themselves.',
            '<25>{#g/alphysCutscene1}* Okay then!\n* That makes things easy!'
         ],
         barricade1b1: [
            '<25>{#p/alphys}{#g/alphysFR}* ...',
            '<25>{#g/alphysFR}* I do NOT have a crush on Mettaton.',
            "<25>{#g/alphysCutscene2}* Let's try... Asgore."
         ],
         barricade1b2: ['<25>{#p/alphys}{#g/alphysSmileSweat}* Hmm... okay.'],
         barricade1b3: () => [
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* You sure?',
            '<25>{#p/alphys}{#x1}* ...',
            ...(SAVE.data.n.state_starton_papyrus === 1
               ? [
                  '<25>{#p/alphys}{#g/alphysSideSad}* Oh, I guess that was the right answer.',
                  '<25>{#g/alphysHaveSomeCompassion}* ...'
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysWelp}* Oh wow, that was the right answer.',
                  '<25>{#g/alphysFR}* ...',
                  "<25>{#g/alphysFR}* That's an oddly specific thing to know about Papyrus.",
                  '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* But okay!!'
               ])
         ],
         barricade1b4: () => [
            ...(SAVE.data.n.state_foundry_undyne === 1
               ? [
                  "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* ...\n* I don't think she really liked him.",
                  "<25>{#g/alphysSideSad}* Let's try... Asgore."
               ]
               : [
                  "<25>{#p/alphys}{#g/alphysCutscene3}* Pfft...\n* You're kidding, right?",
                  "<25>* She TOLERATES him.\n* There's no way that's the answer.",
                  "<25>{#g/alphysCutscene2}* Let's try... Asgore."
               ])
         ],
         barricade2: () => [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene2}* Okay, so the question for this one is...',
            '<25>{|}{#g/alphysCutscene1}* \"Who is Mettaton\'s- {%}',
            '<25>{#g/alphysGarbo}* Are they all seriously about himself?',
            '<25>{#g/alphysGarboCenter}* Man.',
            '<25>{#g/alphysWelp}* \"What is Mettaton\'s most successful product line?\"',
            choicer.create('* (What do you say?)', 'MTT Beauty', 'MTT Cooking', 'MTT Tech', 'MTT TV')
         ],
         barricade2b1: [
            "<25>{#p/alphys}{#g/alphysCutscene2}* Yeah... that's probably the right answer.",
            '<25>{#g/alphysTheFactIs}* He really wants his TV shows to take off, but...',
            '<25>{#g/alphysUhButHeresTheDeal}* People do love their beauty products!'
         ],
         barricade2b2: [
            '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* There sure are a lot of MTT-brand kitchen appliances around...',
            "<25>{#g/alphysWelp}* Heck, Undyne has one, and she doesn't even like the guy.",
            "<25>{#g/alphysSmileSweat}* ... yeah, let's try it."
         ],
         barricade2b3: [
            '<25>{#p/alphys}{#g/alphysFR}* ...',
            "<25>{#g/alphysFR}* I'm gonna pretend you didn't say that.",
            "<25>{#g/alphysHellYeah}* Everyone knows I'm the one you go to for tech!",
            '<25>{#g/alphysHellYeah}* ...',
            "<25>{#g/alphysWelp}* How about... Mettaton's cooking products?"
         ],
         barricade2b4: [
            '<25>{#p/alphys}{#g/alphysWorried}* I dunno...',
            "<25>{#g/alphysWelp}* Mettaton's TV shows haven't been doing too well lately.",
            '<25>{#g/alphysWTF}{#x1}* ...',
            '<25>{#g/alphysWTF2}* That was RIGHT!?',
            '<25>{#g/alphysCutscene3}* ... how do you know all of this stuff?',
            '<25>{#g/alphysUhButHeresTheDeal}* Well, one more to go!'
         ],
         barricade3: () => [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Last question...',
            '<25>{#g/alphysNeutralSweat}* \"What is Mettaton\'s true identity?\"',
            '<25>{#g/alphysNeutralSweat}* ...',
            choicer.create('* (What do you say?)', 'Model 42', 'Hapstablook', 'Aidrian', 'Mettaton') 
         ],
         barricade3b1: [
            '<25>{#p/alphys}{#g/alphysCutscene2}* Ah, about that...',
            "<25>{#p/alphys}{#g/alphysCutscene3}* I've... only ever completed one Mettaton model.",
            "<25>{#p/alphys}{#g/alphysFR}* So, I know that can't be it."
         ],
         barricade3b2: [
            '<25>{#p/alphys}{#g/alphysShocked}* Wh...',
            '<25>{#g/alphysOhGodNo}* How do you know that?',
            "<25>{#g/alphysOhGodNo}* Nobody's supposed to know that!!",
            '<25>{#g/alphysNeutralSweat}* H-have you told anyone else??',
            '<25>{#g/alphysNeutralSweat}* Are you planning to!?',
            '<25>{#g/alphysNeutralSweat}* ...',
            "<25>{#g/alphysNervousLaugh}* Well... this isn't Mettaton's true identity anyway."
         ],
         barricade3b3: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* Aidrian?',
            '<25>{#g/alphysInquisitive}* Who the heck is Aidrian?',
            "<25>{#g/alphysSmileSweat}* Well, that's not it."
         ],
         barricade3b4: [
            "<25>{#p/alphys}{#g/alphysCutscene1}* So... Mettaton's true identity is Mettaton, huh?",
            '<25>{#x1}* ...',
            '<25>{#p/alphys}{#g/alphysWelp}* Oh.\n* I guess it is.',
            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* The more you know!'
         ],
         barricade3c: [
            '<25>* ...',
            '<25>{#p/alphys}{#g/alphysSide}* Hmm... I think I have an idea.',
            '<32>{#p/human}* (The typing from earlier resumes.)',
            '<25>{#p/alphys}{#g/alphysCutscene1}{#x1}* ...',
            '<25>{#p/alphys}{#g/alphysSmileSweat}* There!!!',
            '<25>{#g/alphysUhButHeresTheDeal}* Well, that was fun.'
         ],
         barricadeFail1: [
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
            "<25>{#g/alphysNeutralSweat}* Nope... guess I'm gonna have to override it.",
            '<25>{#g/alphysWelp}* ...',
            '<25>{#g/alphysWelp}* This could take a while.',
            "<25>{#g/alphysUhButHeresTheDeal}* I'll c-call you back when I'm done!"
         ],
         barricadeFail2: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSmileSweat}* O-okay, the override is complete.'
         ],
         barricadeFail2x: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* ...',
            '<25>{#g/alphysInquisitive}* Did you leave the room?',
            '<25>{#g/alphysSide}* Well, uh, the barricades are gone now.'
         ],
         barricadeFail3: ['<25>{#p/alphys}{#g/alphysCutscene1}* Hope that helps!'],
         barricade4: () => [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSideSad}* Not this again...',
            '<25>{#g/alphysSideSad}* ...',
            "<25>{#g/alphysWelp}* Wait, I'm still logged into Mettaton's account.",
            '<25>{#g/alphysNervousLaugh}* Maybe I c-can just unlock it right away!',
            '<32>{|}{#p/human}* (The typing from earlier resu- {%}',
            '<25>{#p/alphys}{#g/alphysHellYeah}{#x1}* Got it!',
            '<25>{#g/alphysWelp}* ...',
            "<25>{#g/alphysGarboCenter}* I really hope that's the last time we have to deal with that.",
            ...(SAVE.data.b.failshow
               ? []
               : SAVE.data.b.item_tvm_mewmew &&
                  !SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                  !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                  !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                  ? [
                     '<25>{#g/alphysTheFactIs}* Oh, a-and, uh, about that Mew Mew doll...',
                     '<25>* Well...',
                     '<25>{#f/10}* Wait, did you...',
                     '<25>{#f/3}* D-did you throw it away or something?',
                     '<25>{#f/3}* ...',
                     '<25>{#g/alphysUhButHeresTheDeal}* Sure, okay!'
                  ]
                  : [
                     '<25>{#g/alphysTheFactIs}* Oh, a-and, uh, about that Mew Mew doll...',
                     '<25>* Well...',
                     "<25>{#g/alphysUhButHeresTheDeal}* Actually, you don't even have it, so never mind.",
                     '<25>{|}{#g/alphysCutscene3}* Anyway see you at the elevator baiiii- {%}'
                  ]),
            '<32>{#s/equip}{#p/event}* Click...'
         ],
         puzzleReaction1: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysHellYeah}* You did it!!',
            '<25>{#g/alphysNeutralSweat}* ...',
            '<25>{#g/alphysCutscene2}* C... congratulations.'
         ],
         cooker1a: ['<32>{#p/mettaton}* HELLO THERE.'],
         cooker1b: ["<32>{*}{#p/mettaton}* AND WELCOME TO THE OUTPOST'S PREMIERE ARTS AND CRAFTS SHOW!{^30}{%}"],
         cooker2a1: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* WHAT ARE WE MAKING TODAY?\n* SOMETHING FUN, OF COURSE!']
               : ['<32>{#p/mettaton}* CHARGE UP YOUR CRAFTING KITS, BECAUSE WE\'RE IN FOR A \"BANGER.\"'],
         cooker2a2: () =>
            iFancyYourVilliany()
               ? ["<32>{#p/mettaton}* AFTER ALL, IT'S UP TO US TO SET A GOOD EXAMPLE!"]
               : ['<32>{#p/mettaton}* HAHAHA...'],
         cooker2b: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/mettaton}* THIS BOISTEROUS BULLY WILL GATHER THE SUPPLIES.',
                  '<32>{#p/mettaton}* EVERYONE GIVE THEM THE SILENT TREATMENT THEY DESERVE!'
               ]
               : [
                  '<32>{#p/mettaton}* MY LOVELY ASSISTANT HERE WILL GATHER THE SUPPLIES.',
                  '<32>* EVERYONE GIVE THEM A BIG ROUND OF APPLAUSE!'
               ],
         cooker3a: () => [
            "<32>{#p/mettaton}* WE'LL NEED THREE KEY SUBSTANCES...",
            iFancyYourVilliany()
               ? '<32>* {@fill=#ff0}HAPPY POWDER{@fill=#fff}, {@fill=#ff0}TINGLE SERUM{@fill=#fff}, AND {@fill=#ff0}LOVE OIL{@fill=#fff}.'
               : '<32>* {@fill=#ff0}HEXOGEN{@fill=#fff}, {@fill=#ff0}DIOCTYL ADIPATE{@fill=#fff}, AND {@fill=#ff0}MINERAL OIL{@fill=#fff}.'
         ],
         cooker3b: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* HOP TO IT, $(moniker2u)!']
               : ['<32>{#p/mettaton}* HOP TO IT, SWEETHEART!'],
         cooker4a: ['<32>{#p/mettaton}* PERFECT!', '<32>* NOW, IF I MAY...'],
         cooker4b: ['<32>{#p/mettaton}* OKAY!', "<32>* THAT'S EVERYTHING WE NEED..."],
         cooker5: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* ... TO MAKE MTT-BRAND {@fill=#003cff}FUN SLIME{@fill=#fff}! (TM)']
               : ['<32>{#p/mettaton}* ... TO MAKE {@fill=#f00}PLASTIC EXPLOSIVE{@fill=#fff}!'],
         cooker6: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* HERE IT COMES!']
               : ['<32>{#p/mettaton}* SAY YOUR PRAYERS, BEAUTIFUL!'],
         cooker7a: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/event}* Ring, ring...',
                  '<25>{#p/alphys}{#g/alphysShocked}* Uh, w-wait!',
                  "<25>{#g/alphysOhGodNo}* That's not {@fill=#003cff}fun slime{@fill=#fff}...",
                  "<25>{#g/alphysUhButHeresTheDeal}* That's {@fill=#f00}plastic explosive{@fill=#fff}!"
               ]
               : [
                  '<32>{#p/event}* Ring, ring...',
                  '<25>{#p/alphys}{#g/alphysShocked}* Uh, w-wait!',
                  '<25>{#g/alphysOhGodNo}* If you synthesize that right now...',
                  "<25>{#g/alphysUhButHeresTheDeal}* You'll destroy h-half of Aerialis!"
               ],
         cooker7b: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/mettaton}* HUH...?\n* ARE YOU SAYING OUR SPECIAL GUEST SWAPPED THE INGREDIENTS?',
                  '<25>{#p/alphys}{#g/alphysTheFactIs}* W-well...\n* Not exactly...',
                  '<32>{#p/mettaton}* OH DEAR...\n* I DO BELIEVE OUR SPECIAL GUEST SWAPPED THE INGREDIENTS!',
                  "<25>{#p/alphys}{#g/alphysSmileSweat}* That's not what I- {%}",
                  '<32>{#p/mettaton}* HOW TREACHEROUS!\n* TO THINK OUR SPECIAL GUEST COULD DO SUCH A THING...'
               ]
               : [
                  '<32>{#p/mettaton}* AND WHY IS THAT...?',
                  "<25>{#p/alphys}{#g/alphysTheFactIs}* B-because...\n* It's...",
                  "<25>{#g/alphysHellYeah}* Because there's a tachyon excitation field in effect!!",
                  '<32>{#p/mettaton}* A WHAT?',
                  '<25>{#p/alphys}{#f/3}* I had to turn it on for an experiment today.',
                  '<32>{#p/mettaton}* OH.'
               ],
         cooker7c: ['<32>{#p/mettaton}* WAIT, THIS MIGHT ACTUALLY GET SOMEONE KILLED.'],
         cooker8a1: () =>
            iFancyYourVilliany()
               ? [
                  "<32>{#p/mettaton}* DON'T WORRY, THOUGH.",
                  '<32>* WITH ANY LUCK, THIS WILL SERVE AS A VALUABLE LESSON IN HOW NOT TO SABOTAGE MY SHOW.'
               ]
               : [
                  '<32>{#p/mettaton}* APOLOGIES, EVERYONE...',
                  "<32>* LOOKS LIKE WE WON'T BE -MAKING- ANY EXPLOSIVES TODAY."
               ],
         cooker8a2: () =>
            iFancyYourVilliany()
               ? [
                  "<32>* WHAT!?!?\n* THE ARTS 'N' CRAFTS WAS JUST A DISTRACTION FOR THIS!?!?",
                  "<32>* OH MY, $(moniker1u)'S VILLAINY TRULY KNOWS NO BOUNDS!"
               ]
               : ['<32>* GOOD THING I MADE SOME IN ADVANCE, THEN, HUH?'],
         cooker8b: () =>
            iFancyYourVilliany()
               ? [
                  '<32>* WELL, DEAR $(moniker2u), I STILL HAVE ONE LAST TRICK UP MY METAPHORICAL SLEEVE.',
                  "<32>* IF YOU DON'T CROSS THIS FIELD OF BOMBS IN {@fill=#ff0}NINETY SECONDS{@fill=#fff}..."
               ]
               : [
                  "<32>* AND, JUST TO RAMP UP THE TENSION, YOU'LL HAVE {@fill=#ff0}NINETY SECONDS{@fill=#fff} TO CROSS THE GAP..."
               ],
         cooker9: () =>
            iFancyYourVilliany()
               ? [
                  "<32>{#p/mettaton}* I'LL USE YOUR OWN CREATION AGAINST YOU AND {@fill=#f00}BLOW YOU TO SMITHEREENS{@fill=#fff}!"
               ]
               : ["<32>{#p/mettaton}* BEFORE YOU'RE {@fill=#f00}BLOWN TO SMITHEREENS{@fill=#fff}!"],
         cooker10: ['<32>{#p/mettaton}* BETTER START RUNNING!!!'],
         cooker11: ["<32>{#p/basic}* It doesn't look like you'll be crossing this on your own."],
         cooker12: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? [
                  '<32>{#p/event}* Ring, ring...',
                  '<25>{#p/alphys}{#f/20}* Uh... I...',
                  "<25>{#g/alphysIDK}* I d-don't know if this is a good idea...",
                  "<25>{#f/16}* B-but I'd rather help you than let you die!!",
                  "<25>{#f/10}* Wouldn't want to... s-stoop to that level, am I right?",
                  '<25>{#f/5}* So... basically, most cell phones around here...',
                  '<25>{#f/6}* Have a one-time use portable jetpack.',
                  '<25>{#f/10}* Maybe... your phone has one too??'
               ]
               : [
                  '<32>{#p/event}* Ring, ring...',
                  '<25>{#p/alphys}{#g/alphysSide}* Hey, uh...',
                  '<25>{#g/alphysCutscene1}* I think I know a way you can get across!',
                  "<25>{#g/alphysNervousLaugh}* It's... well...",
                  "<25>{#g/alphysSmileSweat}* It's not as good as Undyne's, but, the phone I gave you...",
                  '<25>{#g/alphysHellYeah}* It has a one-time use portable jetpack!',
                  '<25>{#g/alphysNervousLaugh}* Maybe... now would be a good time to try it??'
               ],
         cooker12x: ["<32>{#p/basic}* ... then you realize Alphys's phone came equipped with a jetpack."],
         cooker13: () => [
            '<32>{#p/human}* (You activated the jetpack.)',
            SAVE.data.n.state_foundry_undyne > 0
               ? '<25>{#p/alphys}{#f/3}* G-good luck?'
               : "<25>{#p/alphys}{#g/alphysHellYeah}* Now we're cooking!",
            '<32>{#s/equip}{#p/event}* Click...',
            ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* This is absolutely bonkers.'])
         ],
         cooker13x: ['<32>{#p/human}* (You activated the jetpack.)'],
         cooker14: ':$(x)',
         cooker15: '$(x)%',
         cooker16a: ['<32>{#p/mettaton}* YOU DO REALIZE YOUR LIFE IS IN DANGER HERE... RIGHT?'],
         cooker16b: ['<32>* ...'],
         cooker16c: ['<32>* PERHAPS OUR GUEST IS... MENTALLY UNSTABLE.', '<32>* IN WHICH CASE...'],
         cooker16d: [
            "<32>* WE'LL HAVE TO CUT THIS EPISODE SHORT!",
            "<32>* DON'T WORRY, THOUGH.",
            "<32>* OUR NEXT EPISODE WON'T EVEN -REQUIRE- YOU TO BE SANE!"
         ],
         cooker16e: () => [
            "<32>{#p/mettaton}* WELL, THAT'S ALL FOR NOW.",
            ...(iFancyYourVilliany()
               ? [
                  '<32>* JUST KNOW THIS, \"$(moniker2u)...\"',
                  '<32>* THE NEXT TIME WE MEET, SANITY WILL BE THE LEAST OF YOUR WORRIES!'
               ]
               : ['<32>* SO, UNTIL NEXT TIME...', '<32>* LET US WISH THE HUMAN WELL.'])
         ],
         cooker16f: [
            '<32>{#p/basic}* Huh??',
            "<32>* You could've gotten yourself killed right there!",
            "<32>* ... as if I didn't already know this was all just for show.",
            "<32>* Doesn't make it any less entertaining, though!"
         ],
         cooker17a: [
            '<32>{#p/mettaton}* WELL, WELL, WELL...',
            "<32>* LOOKS LIKE... YOU DIDN'T EVEN MAKE IT HALFWAY THERE?",
            "<32>* MY MY.\n* IT SEEMS YOU'RE GOING TO DIE.",
            '<32>* HAHAHA...',
            '<32>* ...',
            '<32>* ... JUST KIDDING.',
            '<32>* I NEED YOU IN ONE PIECE FOR THE NEXT EPISODE.'
         ],
         cooker17b: [
            '<32>{#p/mettaton}* WELL, WELL, WELL...',
            "<32>* LOOKS LIKE YOU DIDN'T QUITE MAKE IT, HUH?",
            "<32>* BUT HEY.\n* JUST BECAUSE YOU'RE SUCH A GOOD SPORT, I'LL LET YOU GO."
         ],
         cooker17c: () => [
            "<32>{#p/mettaton}* WELL, THAT'S ALL FOR NOW.",
            ...(iFancyYourVilliany()
               ? [
                  '<32>* JUST KNOW THIS, \"$(moniker2u)...\"',
                  "<32>* THE NEXT TIME WE MEET, THINGS WON'T BE SO EASY FOR YOU!"
               ]
               : ['<32>* SO, UNTIL NEXT TIME...', '<32>* I BID YOU ALL FAREWELL!'])
         ],
         cooker17d: [
            '<32>{#p/basic}* That sure was the \"bomb!\"',
            "<32>{#p/basic}* I wonder how well you'll do in the next one."
         ],
         cooker17e: [
            '<32>{#p/basic}* That sure was the \"bomb!\"',
            "<32>{#p/basic}* Too bad you couldn't make it to the end in time."
         ],
         cooker18a: [
            '<32>{#p/mettaton}* WELL, WELL, WELL...',
            "<32>* IT SEEMS YOU'VE MADE IT JUST IN TIME.",
            "<32>* CONGRATULATIONS!\n* YOU DON'T COMPLETELY SUCK."
         ],
         cooker18b: [
            '<32>{#p/mettaton}* WOW!\n* A PHOTO FINISH!',
            "<32>* YOU'RE A LUCKY ONE, DARLING.",
            "<32>* JUST A FEW MOMENTS MORE, AND YOU'D BE TOAST!"
         ],
         cooker18c: () => [
            "<32>{#p/mettaton}* WELL, I'D LOVE TO KEEP GOING, BUT I -AM- ON A BIT OF A SCHEDULE HERE.",
            ...(iFancyYourVilliany()
               ? [
                  '<32>* JUST KNOW THIS, \"$(moniker2u)...\"',
                  '<32>* THE NEXT TIME WE MEET, TIME WILL -NOT- BE ON YOUR SIDE!'
               ]
               : ['<32>* SO, UNTIL NEXT TIME...', '<32>* I BID YOU ALL FAREWELL!'])
         ],
         cooker19a: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene1}* You did it!!',
            '<25>{#g/alphysCutscene2}* ...',
            "<25>{#g/alphysUhButHeresTheDeal}* I guess I should've expected that."
         ],
         cooker19b: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSideSad}* ...',
            '<25>{#g/alphysSmileSweat}* I guess... you did it??',
            '<25>{#p/alphys}{#g/alphysCutscene1}* Yeah!\n* You did it!!',
            '<25>{#g/alphysWelp}* ...'
         ],
         cooker19c: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
            '<25>{#g/alphysNeutralSweat}* ...',
            '<25>{#g/alphysFR}* You have a death wish.'
         ],
         robocaller3: [
            '<32>{#p/event}* Ring, ring...',
            "<32>{#p/mettaton}* I SEE YOU'VE ARRIVED ON SET.",
            '<32>* SMILE FOR THE CAMERAS, HOTSHOTS...'
         ],
         robocaller4: [
            "<32>* BECAUSE YOU'RE ON LIVE TV!",
            "<32>* IT'S A TRUE SHAME I CAN'T BE THERE IN PERSON, BUT HEY...",
            "<32>* THAT -IS- HOW IT TENDS TO GO THESE DAYS, ISN'T IT?",
            '<32>* ANYWAY. THE SMALL AUDIENCE WE HAVE LEFT IS GOING TO ENJOY WATCHING YOU STRUGGLE.',
            '<32>* HOW WILL YOU GET ACROSS THE GAP WITH NO JETPACK?\n* OH, IF ONLY I KNEW...',
            '<32>* WELL, BEST OF LUCK!'
         ],
         robocaller4x: [
            '<25>{#p/asriel2}{#f/8}* Really?\n* \"Best of luck?\"',
            '<25>{#f/6}* Be careful what you wish for, dolt.',
            "<25>{#f/7}* There's a liftgate straight ahead of us."
         ],
         cookerX1: [
            '<32>{#p/basic}* Ah, there you are...\n* I thought you might show up...',
            '<32>* This liftgate was placed here to help the others evacuate.',
            "<32>* Now that they have, though, I'm afraid I can't let anyone else through.",
            '<32>{|}* So, if you could just- {%}'
         ],
         cookerX2: ['<25>{#p/asriel2}{#f/6}* Stay out of our way.'],
         cookerX3: ["<32>{#p/basic}* Ah...!\n* I don't think...\n* I can really do that..."],
         cookerX4: [
            '<32>{#p/basic}* I-I mean...\n* I could make an exception...',
            "<32>* Just... don't tell the boss..."
         ],
         cookerX5a: ['<25>{#p/asriel2}{#f/2}* Oh?\n* So you ARE going to let us through?'],
         cookerX5b: ['<25>{#f/1}* Good.'],
         cookerX6: ["<32>{#p/basic}* ... y-yeah!\n* O-of course I'll let you through!"],
         cookerX7: ['<25>{#p/asriel2}{#f/3}* That was probably a smart choice.'],
         cookerX8: ["<25>{#p/asriel2}{#f/3}* Let's go."],
         cookerX9: [
            '<32>{#p/event}* Ring, ring...',
            "<32>{#p/mettaton}* I SEE YOU'VE MADE IT ACROSS THE GAP.",
            '<32>* ...',
            '<32>* PERHAPS...',
            '<32>* TRUSTING A LOW-LEVEL SERVICE WORKER TO GUARD THAT LIFTGATE...',
            "<32>* WASN'T THE GREATEST PLAN.",
            '<32>* ...',
            '<32>* OH WELL.',
            "<32>* I'M GOING TO KILL YOU ANYWAY."
         ],
         whatthefuck: [
            "<32>{#p/basic}* Don't worry, I'll be okay!\n* Just look at these rings!\n* I can't be fired forever..."
         ],
         puzzleReaction2a: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSide}* You got to the checkpoint!',
            '<25>{#g/alphysWelp}* But, uh, that was only the f-first one.',
            "<25>{#g/alphysNeutralSweat}* There's still two more left to go."
         ],
         puzzleReaction2b: ['<32>{#p/event}* Ring, ring...', '<25>{#p/alphys}{#g/alphysWelp}* One left.'],
         puzzleReaction2c: [
            '<32>{#p/event}* Ring, ring...',
            "<25>{#p/alphys}{#g/alphysHellYeah}* Yes!!\n* That's the last one!!",
            '<25>{#g/alphysCutscene2}* Eheh...',
            '<25>{#f/10}* ...',
            "<25>{#f/3}* Don't judge me, I just like rooting for you."
         ],
         moneyPre1: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/mettaton}* AH, THERE YOU ARE.',
                  '<32>{#p/mettaton}* YOU\'VE DONE WELL TO PLAY ALONG THUS FAR, DEAR \"$(moniker2u).\"'
               ]
               : world.bad_robot
                  ? [
                     "<32>{#p/mettaton}* YOU'RE LATE, DARLING...",
                     "<32>{#p/mettaton}* MAYBE IF YOU'D STOPPED KILLING PEOPLE, THAT WOULDN'T BE A PROBLEM."
                  ]
                  : ['<32>{#p/mettaton}* SALUTATIONS, HUMAN.', "<32>* YOU'RE JUST A FEW MOMENTS EARLY FOR THE SHOW."],
         moneyPre2: () =>
            iFancyYourVilliany()
               ? ['<32>* ... STILL, DO YOU HAVE WHAT IT TAKES TO KEEP THIS UP?']
               : ['<32>* ... WOULD YOU MIND MOVING STAGE LEFT FOR ME?'],
         moneyPre3: () => [
            ...(iFancyYourVilliany()
               ? ["<32>{#p/mettaton}* WELL, FOR NOW, I'LL NEED YOU TO MOVE LEFT OF THE STAGE."]
               : []),
            '<32>* YOU CAN COME BACK INTO FRAME WHEN I CALL OUT FOR YOU.'
         ],
         moneyPre4: ['<32>{#p/basic}* A few moments later...'],
         moneyIntro1: [
            "<32>{#p/mettaton}* FOLKS, TODAY WE'RE GOING TO DO SOMETHING A LITTLE DIFFERENT.",
            '<32>{#z2}* WELCOME, ONE AND ALL...',
            '<32>{*}{#z0}* TO {#x1}TIME!{^10}\n* {#x2}VERSUS!{^10}\n* {#x3}MONEY!{^30}{%}'
         ],
         moneyIntro2: ["<32>{#p/mettaton}{#z1}* LET'S GIVE A WARM WELCOME TO OUR CONTESTANTS..."],
         moneyIntro3a: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/mettaton}{#z0}* UNDYNE, CAPTAIN OF THE GUARD!']
               : ['<32>{#p/mettaton}{#z0}* SANS THE SKELETON!'],
         moneyIntro3b: () =>
            iRespeccYourVilliany()
               ? ['<25>{#p/undyne}{#f/1}* Right on!']
               : world.dead_skeleton
                  ? [
                     '<25>{#p/sans}{#g/sansWink}* this is just about the only good thing to happen to me today.',
                     '<25>* if you could even call it a good thing.'
                  ]
                  : ['<25>{#p/sans}{#g/sansWink}* loving the pre-recorded applause you got there.'],
         moneyIntro4a: ['<32>{#p/mettaton}* NAPSTABLOOK!'],
         moneyIntro4b: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/napstablook}* you don't always have to use the same applause..."]
               : alphysPhoneDisplay() && SAVE.data.n.state_foundry_undyne === 1
                  ? ['<32>{#p/napstablook}* hi everyone']
                  : ['<32>{#p/napstablook}* hi everyone...'],
         moneyIntro5a: () =>
            iFancyYourVilliany() ? ['<32>{#p/mettaton}* $(moniker1u)!'] : ['<32>{#p/mettaton}* THE ENIGMATIC HUMAN!'],
         moneyIntro6a: ['<32>{#p/mettaton}* AND... SOME RANDOM KID!'],
         moneyIntro6b: () =>
            SAVE.data.b.f_state_kidd_betray ? ['<25>{#p/kidd}{#f/3}* Hey, guys.'] : ['<25>{#p/kidd}{#f/1}* YO!'],
         moneyIntro7: [
            '<32>{#p/mettaton}{#z0}* THANK YOU ALL SO MUCH FOR COMING!',
            "<32>{#z2}* WHY DON'T YOU SHARE A LITTLE ABOUT YOURSELVES, HMM?"
         ],
         moneyIntro8: [
            '<32>{#p/mettaton}{#z0}* ...',
            '<32>{#z1}* ...',
            "<32>* MY CONTESTANT DOESN'T SEEM TO BE SHOWING UP.",
            '<32>* ...',
            '<32>* THIS IS GOING TO BE A PROBLEM.',
            '<32>* ...',
            '<32>{#z2}* WOULD ANYONE ELSE LIKE TO PLAY IN THEIR PLACE?',
            '<32>* ANYONE AT ALL?'
         ],
         moneyIntro9: ['<32>{#p/tem}* hOI!!\n* im temmie!!!'],
         moneyIntro10: [
            '<32>{#p/mettaton}{#z5}* A SURPRISE GUEST!?!?\n* WOW, THIS SHOW GETS CRAZIER BY THE SECOND!',
            '<32>{#p/mettaton}{#z2}* THEY DO APPEAR TO BE FACING THE WRONG WAY, BUT... OH WELL.'
         ],
         moneyIntro11: ['<32>{#p/mettaton}{#z1}* NEW FACES ASIDE...'],
         moneyChat1: () =>
            iRespeccYourVilliany()
               ? [
                  '<25>{#p/undyne}{#f/17}* Huh?\n* You want ME to talk?',
                  "<25>{#p/undyne}{#f/1}* Well, to be honest, I think you're an annoying piece of junk.",
                  '<25>{#p/undyne}{#f/7}* Not only that, but you treat your employees like garbage!',
                  "<25>{#p/undyne}{#f/12}* But, uh, that's not why I took Papyrus's place.",
                  '<25>{#p/undyne}{#f/16}* Actually, I only really came for one reason.'
               ]
               : world.dead_skeleton
                  ? ['<25>{#p/sans}{#g/sansNormal}* heya.']
                  : [
                     '<25>{#p/sans}{#g/sansLaugh2}* oh, heheh...',
                     "<25>{#g/sansNormal}* i'm sans.\n* sans the skeleton.",
                     '<25>{#g/sansLaugh1}* technically, my job is to capture humans like that one over there.',
                     "<25>{#g/sansBlink}* but, uh...\n* seeing as we're on a television program...",
                     "<25>{#g/sansWink}* i s'pose that'll have to wait for now."
                  ],
         moneyChat1a: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/mettaton}* AND WHAT'S THAT?"]
               : world.dead_skeleton
                  ? ['<32>{#p/mettaton}* ANYTHING ELSE?']
                  : ['<32>{#p/mettaton}* GOT ANY OF YOUR LAME JOKES FOR US TODAY?'],
         moneyChat1b: () =>
            iRespeccYourVilliany()
               ? ['<25>{#p/undyne}{#f/8}* To see $(moniker1), of course!\n* Fuhuhu!']
               : world.dead_skeleton
                  ? ['<25>{#p/sans}{#g/sansNormal}* nope.']
                  : [
                     "<25>{#p/sans}{#g/sansLaugh1}* lame?\n* woah there, mettaton, what's with the blame?",
                     "<25>{#g/sansBlink}* don't play games.\n* all you tv show hosts are the same.",
                     "<25>{#g/sansNormal}* but, uh, if we're talking jokes, well...\n* that's kinda tame.",
                     '<25>{#g/sansLaugh1}* speaking of, i heard you tried to host a comedy show...',
                     '<25>{|}{#g/sansLaugh2}* but nobody- {%}'
                  ],
         moneyChat1c: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/mettaton}* RIGHT.']
               : world.dead_skeleton
                  ? ["<32>{#p/mettaton}* SOMEONE'S NOT FEELING THEMSELVES TODAY, EH?"]
                  : ['<32>{#p/mettaton}* VERY FUNNY.'],
         moneyChat2: ['<32>{#p/napstablook}* is it... my turn to talk...'],
         moneyChat2a: () =>
            iRespeccYourVilliany()
               ? ["<25>{#p/undyne}{#f/14}* It's certainly not mine anymore, is it?"]
               : world.dead_skeleton
                  ? ['<25>{#p/sans}{#g/sansBlink}* ...']
                  : ["<25>{#p/sans}{#g/sansBlink}* go on, don't be afraid."],
         moneyChat2b: () => [
            iRespeccYourVilliany()
               ? '<32>{#p/napstablook}* oh...\n* heh......'
               : world.dead_skeleton
                  ? "<32>{#p/napstablook}* it is, isn't it........."
                  : '<32>{#p/napstablook}* oh.........\n* okay............',
            ...(world.scared_ghost
               ? ["<32>* ............ i'm napstablook."]
               : [
                  "<32>* so, um... i'm napstablook",
                  '<32>* i really like making music, and...',
                  '<32>* i...',
                  '<32>* uh... i...'
               ])
         ],
         moneyChat2c: () =>
            world.scared_ghost ? ['<32>{#p/mettaton}{#z1}* AND...?'] : ['<32>{#p/mettaton}{#z1}* YOU...?'],
         moneyChat2d: () =>
            world.scared_ghost
               ? ["<32>{#p/napstablook}* um...... can't we just go to the next person"]
               : ["<32>{#p/napstablook}* i...\n* i think that's all", '<32>* sorry...............'],
         moneyChat2e: () =>
            world.scared_ghost
               ? ['<32>{#p/mettaton}{#z0}* ... OKAY...']
               : [
                  "<32>{#p/mettaton}{#z0}* THAT'S ALRIGHT, BLOOKY...",
                  "<32>* WE ALL GET NERVOUS SOMETIMES, DON'T WE, COUS-",
                  '<32>{#z2}* ER... CUISINE!\n* BECAUSE THIS OPPORTUNITY SURE IS A TASTY ONE!',
                  '<32>{#z4}* HAHAHA...'
               ],
         moneyChat3: () =>
            world.scared_ghost
               ? ["<32>{#p/napstablook}* it's your turn.", "<32>{#p/human}* (But you didn't have anything to say.)"]
               : [
                  '<32>{#p/napstablook}* uh......',
                  '<32>* you can talk now?',
                  "<32>{#p/human}* (But you didn't have anything to say.)"
               ],
         moneyChat3a: () =>
            iFancyYourVilliany()
               ? [
                  '<33>{#p/mettaton}* WELL, YOU KNOW WHAT THEY SAY...',
                  '<32>{#p/mettaton}* THE BIGGER THE TALK, THE SMALLER THE ACTION!',
                  "<32>{#p/mettaton}* IT'S NO SURPRISE THIS BULLY OF BULLIES WOULD BE SO RELUCTANT TO PART WITH THEIR WORDS."
               ]
               : ['<32>{#p/mettaton}* THE \"ENIGMATIC HUMAN\" SURE IS LIVING UP TO THEIR TITLE.'],
         moneyChat4: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? SAVE.data.b.colleg
                  ? ['<32>{#p/tem}* tem... went to cool leg,']
                  : ['<32>{#p/tem}* tem... on TV!!']
               : [
                  '<25>{#p/kidd}{#f/1}* Haha, I guess so.',
                  ...(SAVE.data.b.f_state_kidd_betray
                     ? [
                        "<25>{#f/1}* OH!\n* It's my turn, I think.",
                        "<25>{#f/4}* Today's... not really been the greatest...",
                        '<25>{#f/8}* Haha...',
                        "<25>{#f/5}* ... well, I'm Monster Kid."
                     ]
                     : [
                        "<25>{#f/1}* OH!\n* It's my turn, right??",
                        "<25>{#f/4}* I'm... not really sure if my parents are watching, but...",
                        "<25>{#f/1}* I hope they're not!!\n* I... don't think they'd like me being here.",
                        '<25>{#f/1}* Haha.',
                        "<25>{#f/2}* Anyway, I'm Monster Kid."
                     ])
               ],
         moneyChat4a: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/mettaton}* AND...?']
               : ["<32>{#p/mettaton}* WAIT, THAT'S YOUR ACTUAL NAME?"],
         moneyChat4b: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? SAVE.data.b.colleg
                  ? ['<32>{#p/tem}* tem know ALL PRICES!!']
                  : ['<32>{#p/tem}* tem... love to be on TV!!']
               : SAVE.data.b.f_state_kidd_betray
                  ? ['<25>{#p/kidd}{#f/4}* ...']
                  : ["<25>{#p/kidd}{#f/1}* Why wouldn't it be?"],
         moneyChat4c1: ['<32>{#p/mettaton}* HUH...'],
         moneyChat5: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/mettaton}* WELL, I GUESS THAT WRAPS UP OUR INTRODUCTIONS.']
               : ['<32>{#p/mettaton}* HEH. I THINK THAT WRAPS UP OUR INTRODUCTIONS QUITE NICELY.'],
         moneyTr1: [
            '<32>* SO. THIS GAME IS ALL ABOUT VALUE.',
            "<32>* TODAY, WE'VE GOT A TRIO OF RARE EARTH ARTIFACTS...",
            "<32>* IT'S UP TO YOU CONTESTANTS TO DETERMINE THEIR EXACT COST!",
            '<32>* WHOEVER GUESSES THE CLOSEST -WITHOUT GOING OVER- GETS TO TAKE IT HOME!'
         ],
         moneyTr2: ["<32>{*}* LET'S PLAY..."],
         moneyTr3: ['<32>{*}* {#x1}TIME!{^10}\n* {#x2}VERSUS!{^10}\n* {#x3}MONEY!{^30}{%}'],
         moneyHelper: '* Use left and right to adjust,\nthen confirm with [Z]. §fill=#ff0§$(x)G',
         moneyHelperConfirmed: '* Use left and right to adjust,\nthen confirm with [Z]. §fill=#f00§$(x)G',
         moneyItem1: {
            a: [
               '<32>{#p/mettaton}* OUR FIRST ITEM TODAY IS SOMETHING I FOUND RATHER RECENTLY...',
               '<32>* ON EARTH, THIS DEVICE WAS USED TO RECEIVE TRANSMISSIONS ON SO-CALLED \"RADIO STATIONS.\"',
               "<32>* NEWS, WEATHER, MUSIC...\n* EVEN GAME SHOWS LIKE THE ONE YOU'RE ON RIGHT NOW!",
               "<32>* LET'S SEE IF ANYONE HERE KNOWS THEIR TECH."
            ],
            b: [
               "<32>{#p/mettaton}* EVERYONE'S DECIDED, THEN?",
               '<32>* SPLENDID!',
               "<32>* NOW, LET'S REVEAL THE PRICE..."
            ],
            c: ['<32>{#p/mettaton}* 80G!'],
            d: () =>
               SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                  ? [
                     "<32>{#p/mettaton}* CONGRATULATIONS, TEMMIE.\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!",
                     '<32>{#p/tem}* uwawawawah.....'
                  ]
                  : [
                     "<32>{#p/mettaton}* CONGRATULATIONS, BLOOKY.\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!",
                     world.scared_ghost ? '<32>{#p/napstablook}* cool' : '<32>{#p/napstablook}* oooooooooooooooo'
                  ],
            e: () =>
               iFancyYourVilliany()
                  ? ["<32>{#p/mettaton}* WELL PLAYED, $(moniker3u).\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!"]
                  : ["<32>{#p/mettaton}* CONGRATULATIONS, HUMAN.\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!"],
            f: () =>
               SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                  ? [
                     iFancyYourVilliany()
                        ? '<32>{#p/mettaton}* TEMMIE, SINCE YOU GUESSED BEFORE $(moniker3u)...'
                        : '<32>{#p/mettaton}* TEMMIE, SINCE YOU GUESSED BEFORE THE HUMAN...',
                     "<32>* CONGRATULATIONS!\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!",
                     '<32>{#p/tem}* uwawawawah.....'
                  ]
                  : [
                     iFancyYourVilliany()
                        ? '<32>{#p/mettaton}* BLOOKY, SINCE YOU GUESSED BEFORE $(moniker3u)...'
                        : '<32>{#p/mettaton}* BLOOKY, SINCE YOU GUESSED BEFORE THE HUMAN...',
                     "<32>* CONGRATULATIONS!\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!",
                     world.scared_ghost ? '<32>{#p/napstablook}* cool' : '<32>{#p/napstablook}* oooooooooooooooo'
                  ],
            g: () => [
               SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                  ? iFancyYourVilliany()
                     ? '<32>{#p/mettaton}* WELL PLAYED, $(moniker3u).\n* SINCE YOU GUESSED BEFORE TEMMIE...'
                     : '<32>{#p/mettaton}* HUMAN, SINCE YOU GUESSED BEFORE TEMMIE...'
                  : iFancyYourVilliany()
                     ? '<32>{#p/mettaton}* WELL PLAYED, $(moniker3u).\n* SINCE YOU GUESSED BEFORE BLOOKY...'
                     : '<32>{#p/mettaton}* HUMAN, SINCE YOU GUESSED BEFORE BLOOKY...',
               "<32>* CONGRATULATIONS!\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!"
            ]
         },
         moneyVote1: () => [
            '<32>{#p/mettaton}* WELL, CONTESTANTS, THAT CONCLUDES THIS ROUND.',
            "<32>* SINCE THIS IS THE FIRST ROUND, YOU'LL VOTE ON WHO YOU THINK SHOULD BE ELIMINATED.",
            ...(world.scared_ghost
               ? []
               : [
                  '<32>{#p/napstablook}* hey, um.........\n* i have a question.........',
                  "<32>{#p/mettaton}* NO, BLOOKY, YOU CAN'T VOTE FOR YOURSELF.",
                  '<32>{#p/napstablook}* oh............'
               ]),
            iRespeccYourVilliany()
               ? "<32>{#p/mettaton}* IT'S ELIMINATION TIME, PEOPLE!\n* UNDYNE, YOU'RE UP FIRST."
               : "<32>{#p/mettaton}* IT'S ELIMINATION TIME, PEOPLE!\n* SANS, YOU'RE UP FIRST.",
            "<32>{#p/mettaton}* WHO'S IT GONNA BE?"
         ],
         moneyVote2: () =>
            iRespeccYourVilliany()
               ? [
                  "<25>{#p/undyne}{#f/14}* Yeah... I'm gonna vote for Napstablook.",
                  "<26>{#p/undyne}{#f/16}* It's nothing personal...\n* I just know the other contestants better."
               ]
               : world.dead_skeleton
                  ? ['<25>{#p/sans}* ...', "<25>{#p/sans}{#g/sansBlink}* eh, i'm not really in the mood."]
                  : ['<25>{#p/sans}* anne.'],
         moneyVote2a: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/mettaton}* HOW ABOUT YOU, BLOOKY?']
               : world.dead_skeleton
                  ? ["<32>{#p/mettaton}* WELL, THAT'S ONE VOTE GONE.", '<32>{#p/mettaton}* HOW ABOUT YOU, BLOOKY?']
                  : [
                     '<32>{#p/mettaton}* HMM...',
                     '<32>* WHY \"ANNE?\"',
                     "<25>{#p/sans}{#g/sansLaugh1}* 'cause this ANNE droid is driving me crazy.",
                     "<32>{#p/mettaton}* YOU'RE DISQUALIFIED!",
                     '<25>{#p/sans}{#g/sansLaugh2}* heheheh, worth it.',
                     '<32>{#p/mettaton}* UGH... HOW ABOUT YOU, BLOOKY?'
                  ],
         moneyVote3a: () =>
            iRespeccYourVilliany()
               ? [
                  '<32>{#p/napstablook}* ...............',
                  "<32>* i... don't really want to vote for any of these guys...",
                  "<32>* undyne's the captain of the royal guard, and the other two...",
                  "<32>* they're just kids......"
               ]
               : [
                  '<32>{#p/napstablook}* ...............',
                  '<32>* s... sans, i guess...',
                  "<32>* i don't have anything against you, i just... don't really know you... sorry......",
                  ...(world.dead_skeleton
                     ? ['<25>{#p/sans}{#g/sansNormal}* ...', "<25>{#p/sans}{#g/sansBlink}* that's okay."]
                     : [
                        "<25>{#p/sans}{#g/sansBlink}* nah, that's okay.\n* besides, i'm only here 'cause my bro declined.",
                        '<25>{#g/sansWink}* he gets nervous around you, mettaton.'
                     ])
               ],
         moneyVote3b: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/mettaton}* WELL, ALRIGHT.\n* I WON'T COUNT YOUR VOTE, THEN."]
               : world.dead_skeleton
                  ? []
                  : ["<32>{#p/mettaton}* HMM...\n* I'LL HAVE TO ASK HIM ABOUT THAT LATER.", '<32>* I WONDER...'],
         moneyVote3x: () =>
            world.scared_ghost
               ? ['<32>{#p/napstablook}* the human.']
               : [
                  '<32>{#p/napstablook}* ...............',
                  '<32>* the human, i guess',
                  "<32>* they just... don't really seem to care about me that much......"
               ],
         moneyVote3y: ['<32>{#p/mettaton}* ...'],
         moneyVote4p: () => [
            iFancyYourVilliany()
               ? '<32>{#p/mettaton}* YOU VOTING FOR ANYONE, DEAR $(moniker2u)?'
               : '<32>{#p/mettaton}* YOU VOTING FOR ANYONE, HUMAN?',
            choicer.create('* (What do you say?)', 'Yes', 'No')
         ],
         moneyVote4: () => [
            '<32>{#p/mettaton}* NO, I MEAN -WHO- WILL YOU BE VOTING FOR?',
            choicer.create(
               '* (Who will you vote for?)',
               iRespeccYourVilliany() ? 'Undyne' : 'Sans',
               'Napstablook',
               SAVE.data.n.state_foundry_muffet === 1 ? 'Temmie' : 'Monster Kid',
               '$(name)'
            )
         ],
         moneyVote4a1: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/mettaton}* MHM, MHM...', '<32>{#p/mettaton}* AND TEMMIE, YOUR VOTE?']
               : ['<32>{#p/mettaton}* MHM, MHM...', '<32>{#p/mettaton}* AND MONSTER KID, YOUR VOTE?'],
         moneyVote4a2: ["<32>{#p/mettaton}* SO YOU'RE -NOT- VOTING FOR ANYONE, THEN.", '<32>* GOT IT.'],
         moneyVote4a3: () => [
            "<32>{#p/mettaton}* REALLY? JUST BECAUSE THEY'RE STUCK WITH YOU DOESN'T MAKE THEM A CONTESTANT.",
            '<33>* CONSIDER YOURSELF DISQUALIFIED!',
            ...(SAVE.data.b.oops
               ? []
               : [
                  '<32>{#p/basic}* Gee, thanks Mettaton.',
                  "<32>{#p/mettaton}* LISTEN, DARLING.\n* IT'S KIND OF HARD TO INCLUDE YOU WHEN YOU'RE INVISIBLE.",
                  '<32>{#p/basic}* Hmph.'
               ])
         ],
         moneyVote4a4: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/mettaton}* ... TEMMIE, YOUR VOTE?']
               : ['<32>{#p/mettaton}* ... MONSTER KID, YOUR VOTE?'],
         moneyVote5a: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/tem}* tem vote... CYOOT GHOST!', '<32>* tem live near cyoot ghost... love cyoot ghost!']
               : [
                  iFancyYourVilliany()
                     ? "<25>{#p/kidd}{#f/1}* I'm voting for $(moniker1) because they're AWESOME!"
                     : "<25>{#p/kidd}{#f/1}* I'm voting for the human because they're AWESOME!",
                  '<25>{#f/7}* Not only did they face off against UNDYNE...',
                  "<25>* ... who's one of the strongest monsters EVER...",
                  '<25>* But when I was about to DIE...',
                  '<25>* ... they pulled me down at the LAST second and saved me!',
                  '<25>{#f/2}* IN FRONT OF UNDYNE!!!',
                  ...(iRespeccYourVilliany()
                     ? [
                        "<25>{#p/undyne}{#f/14}* Uh, kid, I'm right here, you know.",
                        '<25>{#p/kidd}{#f/3}* Oh, right.\n* Uh, s-sorry Undyne!\n* Haha.',
                        "<25>{#p/undyne}{#f/1}* Nah, don't worry.\n* You're a good kid...",
                        '<25>{#p/kidd}{#f/3}* Aw... thanks, Undyne.\n* But $(moniker1) is WAY cooler than me.'
                     ]
                     : ['<25>{#f/3}* I... kind of owe them my life, haha...'])
               ],
         moneyVote5b: ['<32>{#p/mettaton}* YOU DO REALIZE THAT THE VOTE IS A VOTE TO ELIMINATE, RIGHT?'],
         moneyVote5c: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                  '<32>{#p/tem}* wait...',
                  '<32>{#p/tem}* ... nu!!!\n* tem dont wana elimnat cyoot ghost!',
                  '<32>{#p/tem}* tem vote for skely instead!'
               ]
               : iRespeccYourVilliany()
                  ? [
                     '<25>{#p/kidd}{#f/4}* ... it is?',
                     '<25>{#p/undyne}{#f/3}* I was about to say the same thing.',
                     "<25>{#p/kidd}{#f/1}* Oh... then I won't vote for them, because OBVIOUSLY, and...",
                     "<25>{#f/2}* Voting for Undyne... I just can't do it!",
                     "<25>{#f/3}* So... I guess it'll be Napstablook.\n* Please don't be sad..."
                  ]
                  : [
                     '<25>{#p/kidd}{#f/4}* ... it is?',
                     "<25>{#f/1}* Hmm... then I won't vote for them, because OBVIOUSLY, and...",
                     '<25>{#f/4}* Voting for Napstablook might hurt their feelings...',
                     "<25>{#f/3}* So... I guess it'll be Sans."
                  ],
         moneyVote5x: ['<32>{#p/kidd}{#f/8}* ...', '<32>{#f/8}* The human.'],
         moneyVote5x1: ["<32>{#p/mettaton}* SHEESH, SOMEBODY'S NOT HAPPY TODAY."],
         moneyVote5x2a: ['<32>{#p/mettaton}* BUT EVEN WITH THAT VOTE, SANS STILL HAS THE LOSING EDGE.'],
         moneyPun1: () =>
            world.dead_skeleton
               ? ['<25>{#p/sans}* ...', '<25>{#p/sans}{#f/3}* i might as well show myself out.']
               : ['<25>{#p/sans}* welp.', "<25>{#p/sans}{#g/sansWink}* i'm {@fill=#ff0}boned{@fill=#fff}."],
         moneyPun1a: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/napstablook}* it's okay....................."]
               : world.dead_skeleton
                  ? ['<32>{#p/mettaton}* YES, YOU MOST CERTAINLY SHALL.']
                  : ['<32>{#p/mettaton}* YES, YOU MOST CERTAINLY ARE.'],
         moneyPun1b: ["<32>{#p/mettaton}* WOW, IT'S ALMOST LIKE YOU KNOW HOW ANNOYING YOU ARE."],
         moneyVote5x2b: ['<32>{#p/human}* (You feel your sins crawling on your back.)'],
         moneyVote6a: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/mettaton}* I'M SORRY, BLOOKY.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE."]
               : ["<32>{#p/mettaton}* I'M SORRY, SANS.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE."],
         moneyVote6b: () => (iRespeccYourVilliany() ? [] : ['<25>{#p/sans}* too-da-loo, folks.']),
         moneyVote7: [
            '<32>{#p/mettaton}* WELL, IT LOOKS LIKE WE HAVE A TIE!',
            '<32>* IN A TIE SITUATION, THE HOST GETS TO CHOOSE WHO GOES.',
            '<32>* ... OH WAIT.',
            "<32>* I'M THE HOST!"
         ],
         moneyVote8: ["<32>{#p/mettaton}* I'M SORRY, HUMAN.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE."],
         moneyItem2: {
            a: [
               '<32>{#p/mettaton}* OUR NEXT ITEM IS, AS THE LATE PROFESSOR WOULD SAY, HIGHLY TECHNICAL.',
               '<32>* OR SHOULD I SAY...\n* PYROTECHNICAL?',
               '<32>* THESE \"FIREWORKS\" WERE USED ON EARTH TO CREATE DAZZLING DISPLAYS IN THE SKY.',
               '<32>* ALL DIFFERENT COLORS AND SHAPES, EXPLODING WITH INDESCRIBABLE BEAUTY.',
               "<32>* WHADDYA THINK THEY'RE WORTH?"
            ],
            b: ['<32>{#p/mettaton}* THE GUESSES ARE IN...?', "<32>* GOOD.\n* NOW, LET'S SEE THE PRICE..."],
            c: ['<32>{#p/mettaton}* WOW, 250G!', "<32>{#p/mettaton}* WHO WOULD'VE THOUGHT!?"],
            d: () =>
               SAVE.data.n.state_foundry_muffet === 1
                  ? [
                     "<32>{#p/mettaton}* CONGRATULATIONS, TEMMIE!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS!",
                     "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                     '<32>{#p/tem}* AYAYA!'
                  ]
                  : [
                     "<32>{#p/mettaton}* CONGRATULATIONS, MONSTER KID!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS!",
                     "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                     '<25>{#p/kidd}{#f/1}* YOOOOOO!!!'
                  ],
            e: () => [
               iFancyYourVilliany()
                  ? "<32>{#p/mettaton}* WELL PLAYED, $(moniker3u).\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS."
                  : "<32>{#p/mettaton}* CONGRATULATIONS, HUMAN!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS!",
               "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)"
            ],
            f: () => [
               iFancyYourVilliany()
                  ? '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE $(moniker3u)...'
                  : '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE THE HUMAN...',
               ...(SAVE.data.n.state_foundry_muffet === 1
                  ? [
                     "<32>{#p/mettaton}* CONGRATULATIONS, TEMMIE!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS!",
                     "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                     '<32>{#p/tem}* AYAYA!'
                  ]
                  : [
                     "<32>{#p/mettaton}* CONGRATULATIONS, MONSTER KID!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS!",
                     "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                     '<25>{#p/kidd}{#f/1}* YOOOOOO!!!'
                  ])
            ],
            g: () => [
               SAVE.data.n.state_foundry_muffet === 1
                  ? '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE TEMMIE...'
                  : '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE MONSTER KID...',
               iFancyYourVilliany()
                  ? "<32>* WELL PLAYED, $(moniker3u).\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS."
                  : "<32>{#p/mettaton}* CONGRATULATIONS, HUMAN!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS!",
               "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)"
            ]
         },
         moneyFinal0a: () => [
            '<32>{#p/mettaton}* NOW, SINCE THIS IS THE END OF THE SECOND ROUND...',
            "<32>* THERE WON'T BE ANY VOTING.",
            "<32>* INSTEAD, I'LL JUST GET RID OF WHOEVER I FEEL LIKE!\n* MY SHOW, MY RULES...",
            ...(iRespeccYourVilliany()
               ? ["<32>* I'M SORRY, UNDYNE.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE."]
               : SAVE.data.n.state_foundry_muffet === 1
                  ? ["<32>* I'M SORRY, TEMMIE.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE."]
                  : ["<32>* I'M SORRY, MONSTER KID.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE."])
         ],
         moneyFinal0b: () =>
            iRespeccYourVilliany()
               ? ['<25>{#p/undyne}{#f/14}* ... seriously?']
               : SAVE.data.n.state_foundry_muffet === 1
                  ? SAVE.data.b.colleg
                     ? [
                        '<32>{#p/tem}* You only remove me because you know I would win.',
                        '<32>* but OKs!!',
                        '<32>* be sure to check TEM SHOP!!'
                     ]
                     : ['<32>{#p/tem}* nu...', '<32>* tem will be OKs tho...', '<32>* be sure to check TEM SHOP!!']
                  : SAVE.data.b.f_state_kidd_betray
                     ? ['<25>{#p/kidd}{#f/3}* See ya later, dudes...']
                     : [
                        '<25>{#p/kidd}{#f/3}* Aw man...',
                        '<25>{#f/1}* Well, thanks for letting me be on the show, Metatron.',
                        '<25>{#f/1}* My friends are gonna be so stoked when I tell them about this!!!'
                     ],
         moneyFinal0c: ['<32>{#p/mettaton}* SERIOUSLY.\n* NOW GET OFF THE STAGE.'],
         moneyFinal0d: [
            '<25>{#p/undyne}{#f/8}* PFFT!\n* HOW STUPID IS THAT!',
            '<25>{#f/1}* You know, that human might be mean, but at least they play fair.',
            '<25>{#f/5}* As for YOU?',
            '<25>{#f/7}* You just make up the rules as you go along!',
            "<25>{#f/9}* ... guess I shouldn't have expected anything else, though.",
            "<25>{#f/11}* You've got a reputation for this sort of thing."
         ],
         moneyFinal1: () => [
            iRespeccYourVilliany()
               ? '<32>{#p/mettaton}* GOOD RIDDANCE.'
               : SAVE.data.n.state_foundry_muffet === 1
                  ? SAVE.data.b.colleg
                     ? "<32>{#p/mettaton}* ... JEEZ, AT LEAST SHE'S GONE."
                     : "<32>{#p/mettaton}* AT LEAST SHE'S... HAPPY?"
                  : SAVE.data.b.f_state_kidd_betray
                     ? "<32>{#p/mettaton}* AT LEAST THEY'RE... HAPPY?\n* I CAN'T REALLY SAY FOR SURE, TO BE HONEST..."
                     : '<32>{#p/mettaton}* AT LEAST THEY\'RE HAPPY.\n* AND FOR THE RECORD, IT\'S \"METTATON,\" NOT \"METATRON.\"',
            "<32>* ALAS... WITH ONLY TWO CONTESTANTS LEFT, IT'S TIME FOR THE FINAL ROUND.",
            "<32>* THE ONE ITEM WE'LL BE PRESENTING THIS ROUND IS TRULY UNLIKE ANY OTHER.",
            '<32>* BEAUTIES AND GENTLEBEAUTIES...\n* FEAST YOUR EYES...',
            '<32>{#z3}* ... UPON THIS ABSOLUTELY GORGEOUS LIFE-SIZED MEW MEW DOLL!'
         ],
         moneyFinal2: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/kidd}{#f/14}* Woah...']
               : world.scared_ghost
                  ? ['<32>{#p/napstablook}* .........']
                  : ['<32>{#p/napstablook}* oh my............'],
         moneyFinal3: ['<32>{#p/mettaton}* HAHAHA, IMPRESSED?', '<32>{#p/mettaton}{#z2}* IT WAS FOUND IN...'],
         moneyFinal4: () => [
            ...(SAVE.data.n.state_foundry_undyne === 1
               ? [
                  '<32>{#p/event}* Ring, ring...',
                  "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* M-mettaton, come on!\n* I've had enough of a bad day as it is!",
                  '<32>{#p/mettaton}* ...',
                  "<32>* WELL, THAT'S A SHAME, THEN!\n* BECAUSE, YOU SEE..."
               ]
               : [
                  '<32>{#p/event}* Ring, ring...',
                  "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* H-hey! You can't give that away, that's... I own that!",
                  '<32>{#p/mettaton}* OH, DO YOU NOW?',
                  "<32>* I APOLOGIZE.\n* I WASN'T AWARE.\n* BUT...",
                  '<25>{#p/alphys}{#g/alphysWTF2}* BUT???',
                  "<32>{#p/mettaton}* I'M AFRAID IT'S TOO LATE, DR. ALPHYS..."
               ]),
            '<32>{#z3}* THE CONTESTANTS HAVE ALREADY GOTTEN THEIR HOPES UP.',
            '<25>{#p/alphys}{#g/alphysWTF}{#z0}* Are you serious?',
            '<25>{|}{#p/alphys}{#g/alphysCutscene3}* I spent months looking for- {%}'
         ],
         moneyFinal5: [
            '<32>{#p/mettaton}* OH NO.\n* THE CONNECTION SEEMS TO HAVE BEEN TERMINATED.',
            '<32>* POOR DR. ALPHYS.\n* NO MEW MEW DOLL FOR HER.',
            '<32>{#z2}* INSTEAD, ONE OF YOU WILL GET TO KEEP IT!',
            '<32>{#z3}* BUT WHO?'
         ],
         moneyFinal6: [
            '<32>{#p/mettaton}* HAHAHA, IMPRESSED?',
            '<32>{#p/mettaton}{#z2}* IT WAS FOUND IN AN ABANDONED SHIPPING CONTAINER, ADRIFT AMONGST THE STARS...',
            '<32>* THE SEARCH TEAM SPENT MONTHS LOOKING FOR IT AFTER THE INITIAL TRACE WAS DETECTED...',
            '<32>* AND ITS RARITY...\n* WELL...',
            '<32>* THAT SPEAKS FOR ITSELF.',
            '<32>{#z3}* BUT WHO, MY DEAR VIEWERS, WILL GET TO KEEP IT?'
         ],
         moneyItem3: {
            a: [
               "<32>{#z0}* SINCE THIS IS THE FINAL ROUND, THERE WON'T BE A TIME LIMIT.",
               "<32>{#z0}* LET'S RUN THIS ONE LAST TIME!"
            ],
            b: [
               '<32>{#p/mettaton}* THIS IS IT...',
               '<32>{#p/mettaton}{#z3}* WHO WILL WIN THE GRAND PRIZE?',
               '<32>{#p/mettaton}{#z0}* THE.\n* PRICE.\n* IS...'
            ],
            c: ['<32>{#p/mettaton}{#z5}* ... 999G!!!'],
            d: () =>
               iRespeccYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* MONSTER KID!',
                     '<32>* IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.',
                     '<25>{#p/kidd}{#f/4}* H... huh?',
                     '<25>{#f/7}* ...',
                     '<25>{#f/14}* YOOOOOOOOOOO!!!!'
                  ]
                  : ['<32>{#p/mettaton}{#z0}* BLOOKY!', '<32>* IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'],
            e: () =>
               iFancyYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* WELL PLAYED, $(moniker3u).',
                     '<32>{#p/mettaton}* IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'
                  ]
                  : ['<32>{#p/mettaton}{#z0}* HUMAN!', '<32>* IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'],
            f: () =>
               iRespeccYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* MONSTER KID!',
                     "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS $(moniker3u)'S, BUT YOU MADE YOURS FIRST.",
                     '<32>* THEREFORE, IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.',
                     '<25>{#p/kidd}{#f/4}* H... huh?',
                     '<25>{#f/7}* ...',
                     '<25>{#f/14}* YOOOOOOOOOOO!!!!'
                  ]
                  : [
                     '<32>{#p/mettaton}{#z0}* BLOOKY!',
                     iFancyYourVilliany()
                        ? "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS $(moniker3u)'S, BUT YOU MADE YOURS FIRST."
                        : "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS THE HUMAN'S, BUT YOU MADE YOURS FIRST.",
                     '<32>* THEREFORE, IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'
                  ],
            g: () =>
               iRespeccYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* WELL PLAYED, $(moniker3u).',
                     "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS MONSTER KID'S, BUT YOU MADE YOURS FIRST.",
                     '<32>* THEREFORE, IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'
                  ]
                  : [
                     iFancyYourVilliany()
                        ? '<32>{#p/mettaton}{#z0}* WELL PLAYED, $(moniker3u).'
                        : '<32>{#p/mettaton}{#z0}* HUMAN!',
                     "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS BLOOKY'S, BUT YOU MADE YOURS FIRST.",
                     '<32>* THEREFORE, IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'
                  ]
         },
         moneyTrash1: ['<32>* WAIT, BLOOKY, WHERE ARE YOU...', '<32>* ... GOING...', '<32>{#z1}* ...'],
         moneyTrash2: ["<32>{#z0}* I GUESS THEY DIDN'T WANT TO BE HERE ANY LONGER."],
         moneyItemPut1: ['<32>{#p/human}* (You got the Old Radio.)'],
         moneyItemPut2: ['<33>{#p/human}* (You got the Fireworks.)'],
         moneyItemPut3: ['<32>{#p/human}* (You got the Mew Mew Doll.)'],
         moneyItemPut4: [
            "<32>{#p/human}* (You're carrying too much.)",
            '<32>{#p/mettaton}* TOO MUCH TO HANDLE, HUH?',
            '<32>{#p/mettaton}* WELL, NO WORRIES.\n* YOUR PRIZES WILL BE AVAILABLE FOR PICKUP AT THE REC CENTER.'
         ],
         moneyOutro1: [
            "<32>{#p/mettaton}* DEAR VIEWERS, IF YOU'D LIKE TO WIN PRIZES ON LIVE TV LIKE THESE...",
            "<32>* THEN DON'T HESITATE TO CONTACT ME VIA THE OUTERNET!",
            "<32>* OTHERWISE, THAT'LL BE ALL...",
            '<32>* STAY TUNED FOR THE NEXT EPISODE, TITLED \"A DANCE WITH DESTINY!\"',
            '<32>{#z3}* AND, OF COURSE, STAY FABULOUS!'
         ],
         moneyWhisper1: () => [
            '<32>{#p/napstablook}* (psst... hey...)',
            '<32>* (i, um...)',
            ...(SAVE.data.b.f_state_blookbetray
               ? ["<32>* (i know you... probably wish i wasn't here, but...)"]
               : SAVE.data.n.state_wastelands_napstablook === 2
                  ? ["<32>* (i know you... probably don't like me, but...)"]
                  : SAVE.data.n.state_wastelands_napstablook === 4
                     ? ["<32>* (i know we... aren't on the best of terms, but...)"]
                     : SAVE.data.n.state_foundry_blookdate > 1
                        ? ["<32>* (i hope it's not too much to ask, even if we're friends, but...)"]
                        : ["<32>* (i hope it's not too much to ask, but...)"]),
            '<32>* (i think that... after the show...)',
            '<32>* (we should return the mew mew doll to alphys)',
            ...(SAVE.data.n.state_foundry_undyne === 1
               ? [
                  "<32>* (she's been feeling kind of down today, and...)",
                  "<32>* (well...... it'd be nice to give it back to her, don't you think?)"
               ]
               : [
                  '<32>* (i watched mew mew space adventure with her one time...)',
                  '<32>* (she was... so happy......)'
               ]),
            choicer.create('* (What do you say?)', 'Yes', 'No')
         ],
         moneyWhisper2a: ['<32>{#p/napstablook}* (thanks...)'],
         moneyWhisper2b: ['<32>{#p/napstablook}* (..................)'],
         moneyWhisper3: ["<32>{#p/mettaton}* WHAT'S THE HOLDUP?"],
         moneyWhisper4: [
            '<32>{#p/napstablook}* (i guess... we should make a guess now...)',
            '<32>{#p/napstablook}* (heh)'
         ],
         napchat0: ['<32>{#p/human}* (You gave the Mew Mew Doll to Napstablook.)'],
         napchat1: () =>
            SAVE.data.n.state_foundry_undyne === 1
               ? ["<32>{#p/napstablook}* i'll make sure she knows what you did for her"]
               : ["<32>{#p/napstablook}* i'll get this back to her as soon as i can"],
         napchat2a: ['<32>{#p/napstablook}* until next time............'],
         napchat2b: [
            "<32>* there's... another thing i want to talk to you about........",
            '<32>* meet me up ahead, by the big mettaton fountain',
            '<32>* cya there............'
         ],
         truemtt3: [
            '<32>{#p/basic}* Blooky...',
            '<32>* ...',
            '<32>* I get the feeling things could turn serious here.'
         ],
         moneyX1: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* OH DEAR, IS THAT...\n* IS THAT WHAT IT LOOKS LIKE?',
            "<32>* OH, I DO BELIEVE THAT IT'S...",
            '<32>* A TRAP!',
            '<32>* AND, OF COURSE...'
         ],
         moneyX2a: [
            "<32>* YOU'RE ON LIVE TV AGAIN!",
            '<32>* HOW WILL YOU TWO ESCAPE THE ROOM THIS TIME?',
            '<32>* HAHAHA...'
         ],
         moneyX2b: ['<32>* ONLY -TIME- WILL TELL...{%200}'],
         moneyX3: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/10}* Hmm...{%100}',
                  '<25>* The control console is up on that platform...{%100}',
                  '<25>{#f/16}* ...{%100}',
                  '<25>{#f/13}* This is going to be a little embarrassing, but...{%100}',
                  '<25>{#f/13}* If I kneel in front of the platform...{%100}',
                  '<25>{#f/16}* You can... maybe climb onto me to get up there and cancel the timer.{%100}',
                  '<25>{#f/15}* I hope this works...{%100}'
               ],
               ['<25>{#p/asriel2}{#f/13}* ...{%100}', '<25>{#f/4}* You know what we have to do, $(name).{%100}']
            ][Math.min(SAVE.flag.n.ga_asrielMoneyX3++, 1)],
         moneyT1: (i: number) =>
            [
               ['<25>{#p/asriel2}{#f/15}* Are we...\n* ... going to do this?{%200}'],
               ["<25>{#p/asriel2}{#f/16}* ... we don't have time for this.{%200}"],
               ['<25>{#p/asriel2}{#f/15}* Not again.{%200}'],
               []
            ][Math.min(i, 3)],
         moneyT2: (i: number) =>
            [
               ['<25>{#p/asriel2}{#f/16}* Or are we just going to stand here.{%200}'],
               ["<25>{#p/asriel2}{#f/13}* $(name), please...\n* Don't do this again...{%200}"],
               []
            ][Math.min(i, 2)],
         moneyT3: (i: number) =>
            [
               ['<25>{#p/asriel2}{#f/13}* I guess we are.{%200}'],
               ['<25>{#p/asriel2}{#f/3}* ...\n* This is so stupid.{%200}'],
               []
            ][Math.min(i, 2)],
         moneyT4: (i: number) =>
            [
               [
                  "<25>{#p/asriel2}{#f/5}* So how's your day been, huh?{%200}",
                  '<25>{#p/asriel2}{#f/13}* Pretty good?\n* ...{%200}'
               ],
               []
            ][Math.min(i, 1)],
         moneyT5: (i: number) =>
            [["<25>{#p/asriel2}{#f/4}* I'm amazed at how you can just stand there without getting bored.{%200}"], []][
            Math.min(i, 1)
            ],
         moneyT6: (i: number) => [['<25>{#p/asriel2}{#f/3}* ...\n* $(name)?{%200}'], []][Math.min(i, 1)],
         moneyT7: (i: number) => [['<25>{#p/asriel2}{#f/13}* $(name).{%200}'], []][Math.min(i, 1)],
         moneyT8: (i: number) =>
            [["<25>{#p/asriel2}{#f/7}* We could've been off the outpost by this point.{%200}"], []][Math.min(i, 1)],
         moneyT9: (i: number) =>
            [['<25>{#p/asriel2}{#f/6}* ...\n* Please.{%200}'], ['<25>{#p/asriel2}{#f/15}* Almost there...']][
            Math.min(i, 1)
            ],
         moneyX4: () =>
            [['<25>{#p/asriel2}{#f/13}* Uh... ready.{%200}'], ['<25>{#p/asriel2}{#f/13}* Come on...{%200}']][
            Math.min(SAVE.flag.n.ga_asrielMoneyX4++, 1)
            ],
         moneyX4a: ['<25>{#p/asriel2}{#f/1}* There.'],
         moneyX4b: ['<25>{#p/asriel2}{#f/6}* ...', '<25>{#p/asriel2}{#f/7}* Did we seriously just wait for that?'],
         moneyX5a: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* DO MY SENSORS DECIEVE?', 
            "<32>* DEAR VIEWERS, WE MIGHT HAVE TO CHANGE THIS SHOW'S RATING...",
            '<32>* FROM \"SHAMEFUL\" TO \"ULTRA SHAMEFUL\" OF COURSE!',
            "<32>* I CAN'T SAY MANY IN YOUR PLACE WOULD BE WILLING TO HUMILIATE THEMSELVES LIKE THAT."
         ],
         moneyX5b: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* WELL, THAT WAS...',
            "<32>* UH... I DON'T REALLY KNOW WHAT TO CALL THAT.",
            '<32>* THANKS FOR WAITING, I GUESS?',
            '<32>* IT SURE MADE MY JOB A WHOLE LOT EASIER.'
         ],
         moneyX5c: [
            '<32>* ...',
            '<32>* MY PREPARATIONS ARE NEARLY COMPLETE.',
            '<32>* IF YOU HAVE ANY LAST WORDS FOR THE RESIDENTS OF THE OUTPOST...',
            '<32>* NOW WOULD BE THE PERFECT TIME TO SHARE THEM.'
         ],
         moneyX6a: ['<25>{#p/asriel2}{#f/15}* ...'],
         moneyX6b: ['<25>{#f/2}* Nah.'],
         moneyX7: ['<25>{#p/asriel2}{#f/6}* Come on, get down.'],
         moneyX8: ['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/6}* Onward to the elevator.'],
         rg2a: ["<32>{#p/basic}{#x1}* Halt!\n* You've gone far enough!{#x3}"],
         rg2b: () =>
            world.genocide
               ? ["<32>{#p/basic}{#x1}* We aren't going to let you get away that easily, are we, girl?{#x3}"]
               : [
                  ...(iFancyYourVilliany()
                     ? [
                        '<32>{#p/basic}{#x1}* So, you\'re the kid going by \"$(moniker2)\" now, huh?{#x3}',
                        iRespeccYourVilliany()
                           ? '<32>{#x2}* Yeah, we saw.\n* We also saw how easily Undyne gave up on stopping you.{#x3}'
                           : "<33>{#x2}* Yeah, we saw.\n* We also know you're not as tough as you may seem.{#x3}",
                        "<32>{#x1}* Pathetic, isn't it?{#x3}"
                     ]
                     : [
                        "<32>{#p/basic}{#x1}* Word is there's a human roaming around this area.{#x3}",
                        "<32>{#x2}* We wouldn't normally suspect anything, but kid, you were just on live TV...{#x3}",
                        "<32>{#x1}* It's a little hard to ignore a thing like that, now, isn't it?{#x3}"
                     ]),
                  '<32>* ...',
                  "<32>{#x2}* That's what I thought.{#x3}"
               ],
         rg2c1: ["<32>{#p/basic}{#x1}* Girl, you thinkin' what I'm thinkin'?{#x3}"],
         rg2c2: ['<32>{#p/basic}* ...', '<32>{#p/basic}{#x1}{#x2}* Oh, for sure.{#x3}', '<32>{#p/basic}* ...'],
         rg2c3: ['<32>{#p/basic}* ...'],
         rg2d: () =>
            world.genocide
               ? [
                  "<32>{#p/basic}{#x1}* Come on, girl.\n* Let's show Undyne what we're worth...{#x3}",
                  '<32>{#x1}{#x2}* ... and whoop some traitor backside.{#x3}'
               ]
               : [
                  "<32>{#p/basic}{#x1}* Come on, girl.\n* Let's show Undyne what we're worth...{#x3}",
                  iFancyYourVilliany()
                     ? '<32>{#x1}{#x2}* ... and whoop some bully backside.{#x3}'
                     : '<32>{#x1}{#x2}* ... and whoop some human backside.{#x3}'
               ],
         rg2e: ['<32>{#p/basic}* Wow.\n* That was...', '<32>{#p/basic}* ... something.'],
         rg2f: [
            '<32>{#p/basic}{#x1}* Girl, this human thing might not be worth the trouble.{#x3}',
            "<32>{#x2}* Yeah, we'll let the boys handle this one... if Undyne thinks they're up for it.{#x3}"
         ],
         hapsta1: () => [
            '<32>{#p/napstablook}* so, uh...',
            '<32>* do you think...\n* you can you help me with something...?',
            "<33>* it's... kind of important......",
            choicer.create('* (What do you say?)', 'Yes', 'No')
         ],
         hapsta1a: ['<32>{#p/napstablook}* okay.........', '<32>* this way.........'],
         hapsta1b: ['<32>{#p/napstablook}* oh.........', "<32>* i'll get out of your way, then........."],
         hapsta2: ['<32>{#p/napstablook}* well... here we are', "<32>* as for why we're here......"],
         hapsta3a: [
            "<32>{#p/napstablook}* i've been thinking more and more that mettaton is my long lost cousin.........",
            "<32>* ever since he disappeared, i've been worried about him"
         ],
         hapsta3b: ['<32>* i just want him to be okay.'],
         hapsta4: ['<32>{#p/napstablook}* take a look at this'],
         hapsta5: ["<32>{#p/napstablook}* it's a private recording i found at the royal lab."],
         hapsta6: [
            '<32>{#p/alphys}* Completing your final body is going to take some time...',
            '<32>* Are you sure you want this right now?',
            "<32>{#p/hapstablook}* i'm ready, doctor.",
            "<32>{#p/alphys}* Okay... I'm b-bringing Mettaton online right now.",
            '<32>* This control chip will allow you to use any body I build for you...',
            "<32>* When I finish your new body, I'll just t-transfer it there.",
            '<32>* Will that, uh, work?',
            "<32>{#p/hapstablook}* it's marvelous, doctor.\n* marvelous!",
            "<32>{#p/alphys}* Heh... that's...\n* Very nice of you...",
            '<32>{#p/hapstablook}* so when do i get to start?',
            '<32>{#p/alphys}* O-oh, um, you can try right now if you like?',
            "<32>* It's a universal chip, so you don't need to fuse with it to control it.",
            '<32>{#p/hapstablook}* oooh, fancy...',
            '<32>{#p/hapstablook}* being able to upgrade my body will be useful on my path to superstardom!',
            '<32>{#s/echostop}{#p/event}* Playback complete.'
         ],
         hapsta7: [
            "<32>{#p/napstablook}* well, that's it",
            "<32>{|}{#p/napstablook}* if i didn't know any better, i'd say that's- {%}"
         ],
         hapsta8: ["<32>{#p/finalghost}* Sorry, I'm late."],
         hapsta9: ['<32>* Oh.\n* Hello, human.'],
         hapsta10: ['<32>* Cousin Blooky.\n* Why is the human here?'],
         hapsta11: ['<32>{#p/napstablook}* i thought......\n* they might be able to help......'],
         hapsta12a: () => [
            ...[
               ['<32>{#p/finalghost}* Hm.\n* It would be nice to have them on our side.'],
               ["<32>{#p/finalghost}* Hm.\n* They'll have to curtail their violent side."],
               ["<32>{#p/finalghost}* Hm.\n* We can only hope they don't run away this time."],
               [
                  "<32>{#p/finalghost}* Hm.\n* Last time I saw them, they didn't seem very intelligent.",
                  '<32>* But who knows.'
               ],
               ['<32>{#p/finalghost}* Hm.\n* They were pretty nice to me...'],
               ['<32>{#p/finalghost}* Hm.\n* We can only hope they keep their hands to themself.'],
               ["<32>{#p/finalghost}* Hm.\n* They'll need to keep their flirtatious attitude in check."]
            ][SAVE.data.n.state_wastelands_dummy]
         ],
         hapsta12b: ['<32>* Are we ready to make the call?'],
         hapsta13: ['<32>{#p/napstablook}* well, hold on...', "<32>{|}* where's- {%}"],
         hapsta14: ['<32>{#p/basic}* RIGHT HERE, BOZO!'],
         hapsta15: ['<32>{#p/finalghost}* Do you always have to do that.'],
         hapsta16: [
            '<32>{#p/basic}* Human.\n* Human!\n* HUMAN!!!',
            '<32>* WHAT HAVE YOU DONE TO MY COUSIN THIS TIME!?'
         ],
         hapsta17: ["<32>{#p/finalghost}* They didn't do anything to me.\n* You're overreacting."],
         hapsta18: ['<32>{#p/basic}* Jeez, I was only kidding...'],
         hapsta19: ['<32>{#p/finalghost}* Sure you were.\n* Now, for the matter at hand...'],
         hapsta20: ["<32>{#p/finalghost}* We all know why we're here.\n* Our cousin is..."],
         hapsta21: ["<32>{#p/basic}* Our cousin's a SELLOUT."],
         hapsta22: [
            '<32>{#p/finalghost}* ...',
            '<32>* Our cousin is many things, but a \"sellout\" is not one of them.',
            '<32>* In fact, after Blooky and I read his diaries... I fear we may be the ones at fault.'
         ],
         hapsta23: ['<32>{#p/napstablook}* .........\n* ......... should we call him?'],
         hapsta24: ["<32>{#p/finalghost}* I don't see a reason not to."],
         hapsta25: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* BLOOKY!\n* WHAT A WONDERFUL SURPRISE!\n* WHAT IS IT YOU NEED?',
            '<32>{#p/napstablook}* um... i wanted to talk to you about something',
            '<32>{#p/mettaton}* WELL, HEY, WE CAN DO IT RIGHT HERE, WHAT DO YOU NEED?',
            '<32>{#p/napstablook}* in private.........',
            '<32>{#p/mettaton}* OH.',
            "<32>{#p/mettaton}* I'M AFRAID I CAN'T DO THAT RIGHT NOW SINCE I'M PREPARING FOR ANOTHER SHOW.",
            "<32>* HOW ABOUT WE MEET UP ONCE THAT'S OVER WITH?"
         ],
         hapsta26: ['<32>{|}{#p/basic}* Anything to avoid- {%}'],
         hapsta27: ['<32>{#p/finalghost}* Quiet!'],
         hapsta28: [
            '<32>{#p/napstablook}* that works...',
            '<32>{#p/mettaton}* FABULOUS, DARLING.',
            "<32>* I'LL CATCH UP WITH YOU THEN!"
         ],
         hapsta29: [
            '<32>{#p/basic}* I knew it.\n* I knew it!\n* I KNEW IT!',
            '<32>* This was doomed to fail from the very beginning.'
         ],
         hapsta30: [
            "<32>{#p/finalghost}* Just because Mettaton isn't here right now doesn't mean we've failed.",
            "<32>* We'll just have to be patient."
         ],
         hapsta31: ['<32>{#p/basic}* Fine...'],
         hapsta32: () => [
            '<32>{#p/finalghost}* Well, it was nice to talk to you again.',
            "<32>* We'll see each other soon."
         ],
         hapsta34: () => [
            '<32>{#p/napstablook}* heh...',
            ...(SAVE.data.b.oops
               ? ['<32>{#p/napstablook}* see you then, i guess']
               : [
                  '<32>{#p/napstablook}* and $(namel)?',
                  '<32>{#p/basic}* ...?',
                  '<32>{#p/napstablook}* .........\n* thanks for sticking around.'
               ])
         ],
         hapsta35: ['<32>{#p/basic}* I just hope I can be useful for once...'],
         opera1: () =>
            SAVE.data.n.state_foundry_undyne === 1
               ? [
                  '<25>{#p/alphys}{#g/alphysSideSad}* ... hey, uh...',
                  "<25>{#f/30}* I'm sorry I ran off like that earlier.",
                  "<25>{#f/32}* It's just... been really hard...",
                  '<25>{#f/20}* After seeing you leave Undyne behind on the platform like that.',
                  "<25>{#f/5}* Still, I...\n* I get that it probably wasn't your fault.",
                  '<25>{#f/20}* You were trying to run away from someone chasing you.',
                  '<25>{#f/31}* I just... had a hard time accepting what had happened to her.',
                  '<25>{#f/31}* ...',
                  '<25>{#f/20}* Well, we should probably head up to the rec center now.'
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysNervousLaugh}* Ah, there you are!',
                  ...(world.bad_lizard === 1
                     ? [
                        "<25>{#g/alphysSideSad}* I've been... worried, about what you'd do if I didn't escort you.",
                        "<25>{#g/alphysOhGodNo}* Uh, not that you'd do anything bad!",
                        '<25>{#g/alphysWorried}* Just...',
                        "<25>{#g/alphysCutscene2}* I feel like it's important that I help you, you know?",
                        '<25>{#g/alphysCutscene2}* ...',
                        "<25>{#g/alphysWelp}* One thing's for sure, those guards were NOT supposed to attack you."
                     ]
                     : [
                        "<25>{#g/alphysSideSad}* I've been really w-worried about you...",
                        '<25>{#g/alphysSideSad}* About the puzzles, and about Mettaton, and...',
                        '<25>{#g/alphysHaveSomeCompassion}* ...',
                        '<25>{#g/alphysHaveSomeCompassion}* Those guards were NOT supposed to attack you.'
                     ]),
                  "<25>{#g/alphysUhButHeresTheDeal}* Maybe my royal memos didn't reach them???\n* For some reason???",
                  '<25>{#g/alphysTheFactIs}* I mean, they WERE only just hired today...',
                  ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                     ? [
                        "<25>{#g/alphysWelp}* Well, uh, anyway, it looks like you're fine, so...",
                        '<25>{#g/alphysCutscene2}* I guess we can go.'
                     ]
                     : [
                        "<25>{#g/alphysWelp}* Well, uh, anyway, it looks like you're fine.",
                        "<25>{#g/alphysFR}* Apart from that Mew Mew doll that doesn't belong to you."
                     ])
               ],
         opera2: ['<25>{#p/alphys}{#g/alphysInquisitive}* Are you coming?'],
         opera3: ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}'],
         opera4: () =>
            world.genocide
               ? ["<25>{#p/asriel2}{#f/1}* It's time to end this."]
               : world.bad_lizard === 1
                  ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Here we are.']
                  : [
                     "<25>{#p/alphys}{#g/alphysCutscene1}* Okay, we're here!",
                     '<25>{#g/alphysSmileSweat}* B-better stay behind me while we get through security.'
                  ],
         opera5: ['<25>{#p/alphys}{#g/alphysSmileSweat}* H-hiya.', "<32>{#p/basic}{#x1}* 'Sup.{#x3}"],
         opera5b: ['<25>{#p/alphys}{#g/alphysSmileSweat}* O-oh, I guess there is no security.'],
         opera6: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Uh, y-yeah!\n* Hi!'],
         opera7: () =>
            world.bad_lizard === 1
               ? [
                  "<25>{#p/alphys}{#g/alphysWelp}* It's a good thing you didn't attack the human earlier...",
                  "<25>{#g/alphysNeutralSweat}* If you had, they might've..."
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysWelp}* Well uh, thanks for... not attacking the human earlier.',
                  '<25>{#g/alphysGarbo}* The other guards didn\'t really \"get the memo,\" so to speak.'
               ],
         opera8: ['<32>{#p/basic}{#x1}* ... human?{#x3}', '<32>{#x1}* What human?{#x3}'],
         opera9: [
            "<25>{|}{#p/alphys}{#g/alphysTheFactIs}* Uhhhhh I don't know I'm just trying to escor- {%}",
            "<32>{#p/basic}{#x1}* Alphys, you're like, the second highest authority on the outpost.{#x3}",
            "<32>{#x2}* Yeah, you don't need to ask us for permission, haha.{#x3}",
            "<32>{#p/basic}{#x1}{#x2}* We haven't even made it out of guard training yet!{#x3}"
         ],
         opera10: [
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Oh.\n* I see.',
            "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* We'll be on our way through, then!"
         ],
         opera11: ['<32>{#p/basic}{#x1}* (Bro... is she okay?){#x3}', '<32>{#x2}* (You tell me...){#x3}'],
         opera12: ['<32>{#p/basic}* Meanwhile...'],
         opera13: [
            "<25>{#p/alphys}{#g/alphysSideSad}* It's so dark in here...",
            '<25>* Maybe we should turn back. Find another way.',
            "<25>{|}* Unless it's- {%}"
         ],
         opera14a: ['<32>{#p/alphys}{#g/alphysGarbo}* Mettaton.'],
         opera14b: ['<32>{#p/mettaton}* OH MY...'],
         opera14c: ['<32>* WHAT DO WE HAVE HERE?'],
         opera15: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* COULD IT BE?', '<32>* THE NEMESIS OF MY DREAMS...?']
               : ['<32>{#p/mettaton}* COULD IT BE?', '<32>* MY ONE TRUE LOVE...?'],
         opera16: [
            '<25>{*}{#p/alphys}{#g/alphysGarbo}* What the heck are you doing to them now...{^30}{%}',
            '<32>{*}{#p/mettaton}{#x1}* EXCUSE ME?{^30}{%}',
            "<32>{*}{#x2}* I'M TRYING TO RUN A SHOW HERE.{^30}{%}",
            '<25>{*}{#p/alphys}{#g/alphysWTF}* ...{^30}{%}'
         ],
         opera16b: [
            '<32>{*}* MY, MY...{^30}{%}',
            "<32>{*}{#x1}* IT'S A SHAME ALPHYS ISN'T HERE TO SEE THIS.{^30}{%}",
            "<32>{*}{#x2}* SHE WOULD'VE LOVED IT.{^30}{%}"
         ],
         opera17: () =>
            world.genocide ? 'Oh |my |friends...' : iFancyYourVilliany() ? 'Oh |how |sad...' : 'Oh |my |love...',
         opera18: () =>
            world.genocide
               ? "Time's |run|ning |thin..."
               : iFancyYourVilliany()
                  ? 'It |is |to |see...'
                  : 'Please |run |a|way...',
         opera19: () =>
            world.genocide
               ? "Soon |you'll |wish..."
               : iFancyYourVilliany()
                  ? 'Some |one |waste... '
                  : 'Mon|ster |king...',
         opera20: () =>
            world.genocide
               ? "You |ha|dn't |sinned..."
               : iFancyYourVilliany()
                  ? 'Their |time |on |me...'
                  : 'For|bids |your |stay...',
         opera20a: () =>
            iFancyYourVilliany()
               ? ['<25>{*}{#p/alphys}{#g/alphysInquisitive}* Huh?{^40}{%}']
               : ['<25>{*}{#p/alphys}{#g/alphysWelp}* Hey, this is actually pretty good...{^40}{%}'],
         opera21: () =>
            world.genocide ? 'But |be|fore...' : iFancyYourVilliany() ? "I'll |ad|mit..." : 'Hu|mans |must...',
         opera22: () =>
            world.genocide
               ? 'I |kill |you |dead...'
               : iFancyYourVilliany()
                  ? 'I |was |in|trigued...'
                  : 'Live |far |a|part...',
         opera23: () =>
            world.genocide ? "Let's |re|hearse..." : iFancyYourVilliany() ? "But |you're |just..." : 'E|ven |if...',
         opera24: () =>
            world.genocide
               ? "The |life |you've |led..."
               : iFancyYourVilliany()
                  ? 'Not |in |my |league...'
                  : 'It |breaks |my |heart...',
         opera25: () =>
            world.genocide
               ? 'Born |a |prince...'
               : iFancyYourVilliany()
                  ? 'You |should |find...'
                  : "They'll |cast |you...",
         opera25a: () =>
            iFancyYourVilliany()
               ? ['<25>{*}{#p/alphys}{#g/alphysGarboCenter}* Jeez.{^40}{%}']
               : ['<25>{*}{#p/alphys}{#g/alphysCutscene1}* The sakura leaves...!{^40}{%}'],
         opera26: () =>
            world.genocide
               ? 'We |were |con|vinced...'
               : iFancyYourVilliany()
                  ? 'Some|one |more |kind...'
                  : 'Out |in|to |space...',
         opera27: () =>
            world.genocide
               ? "That |you'd |see..."
               : iFancyYourVilliany()
                  ? 'At |least |then...'
                  : "I|t'll |suck...|\n(quite |literally)",
         opera28: () =>
            world.genocide
               ? 'Our |king|dom |free...'
               : iFancyYourVilliany()
                  ? "You |woul|dn't\n|have |to |die."
                  : "And |then |you'll\n|die |a |lot.",
         opera28a: () =>
            iFancyYourVilliany()
               ? ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}']
               : ["<25>{*}{#p/alphys}{#g/alphysGarbo}* Oh, so this is where it's going.{^40}{%}"],
         opera29: () => (world.genocide ? 'Then |one |day...' : 'Real|ly |sad...'),
         opera30: () => (world.genocide ? 'You |lost |your |way...' : "You're |gon|na |die..."),
         opera31: () => (world.genocide ? 'Now |my |friends... ' : 'Cry |cry |cry...'),
         opera31a: ['<25>{*}{#p/alphys}{#g/alphysCutscene3}* We get the point...{^40}{%}'],
         opera32: () =>
            world.genocide
               ? "Let's |bring |this\n|to |an |end."
               : iFancyYourVilliany()
                  ? "That's |what |you\n|get |for |being a\ndirty rotten meatbag"
                  : "So |sad |it's\n|hap|pen|ing.",
         opera33: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* TOO BAD.', '<32>{#p/mettaton}* TOO BAD YOU HAD TO GO AND PLAY THE VILLAIN.']
               : ['<32>{#p/mettaton}* SO SAD.', "<32>{#p/mettaton}* SO SAD YOU'RE GOING TO BE EJECTED."],
         opera34: () =>
            !world.badder_lizard
               ? [
                  '<25>{#p/alphys}{#g/alphysGarboCenter}* You done now?',
                  '<32>{#p/mettaton}{#x1}* WELL, HOLD ON...',
                  '<32>{|}{#x2}* I STILL HAVE TO- {%}'
               ]
               : ['<32>{#p/mettaton}{#x1}* GET READY, HUMAN...', "<32>{|}{#x2}* 'CAUSE I'M ABOUT TO BLOW YOUR- {%}"],
         opera35: () => [
            ...(SAVE.data.b.killed_glyde
               ? [
                  !world.badder_lizard
                     ? "<32>{#p/mettaton}{#x0}* ... I'M NOT SURPRISED ALPHYS RAN AWAY FROM YOU JUST NOW."
                     : "<32>{#p/mettaton}{#x0}* ... NO WONDER ALPHYS DOESN'T WANT TO BE AROUND YOU.",
                  '<32>{#x1}* DO YOU HAVE NO SHAME?',
                  "<32>{#x0}* I HAD TO CUT THE LIVE TV FEED JUST TO PROTECT MY PRECIOUS VIEWERS' EYES!",
                  !world.badder_lizard
                     ? "<32>{#x0}* HOW UNFORTUNATE...\n* BUT DON'T YOU BREAK A SWEAT!"
                     : "<32>{#x0}* HOW DISGRACEFUL...\n* BUT DON'T YOU BREAK A SWEAT!"
               ]
               : [
                  ...(!world.badder_lizard
                     ? ['<25>{#p/alphys}{#g/alphysWelp}* S-so... what now?', '<32>{#p/mettaton}{#x0}* WHAT NOW?']
                     : []),
                  '<32>{#p/mettaton}{#x0}* WELL, AS MUCH AS I WOULD HAVE LOVED TO FINISH THAT EPISODE...',
                  '<32>{#x2}* AND BELIEVE ME DARLING, I DEFINITELY WOULD HAVE...'
               ]),
            ...(world.bad_robot
               ? [
                  "<32>{#x1}* THERE'S SOMETHING I NEED TO DO BEFORE OUR NEXT AND FINAL EPISODE.",
                  '<32>{#x3}* SOON, DARLING...',
                  "<32>{*}* SOON, I'LL MAKE YOU WISH YOU'D NEVER MET ME.{^30}{#x4}{%}"
               ]
               : [
                  "<32>{#x1}* THERE'S SOMETHING MUCH, -MUCH- MORE EXCITING IN STORE COMING VERY SOON.",
                  '<32>{#x3}* SO, UNTIL THE NEXT AND FINAL EPISODE...',
                  '<32>{*}* STAY FABULOUS!{^30}{#x4}{%}'
               ])
         ],
         
         hapsta36: () => [
            "<32>{#p/mettaton}{#e/mettaton/0}* OH... RIGHT.\n* I'D FORGOTTEN ABOUT THAT.",
            ...(SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
               ? [
                  "<32>{#p/mettaton}{#e/mettaton/5}* ... I SUGGEST WE GO TO ANOTHER AREA FIRST, THOUGH.\n* IT'S NOT SAFE HERE."
               ]
               : [])
         ],
         hapsta37: () =>
            SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
               ? ['<32>{#p/napstablook}* well, alright......\n* if you really want to, we can do it alone......']
               : [
                  '<32>{#p/napstablook}* hey, um......',
                  '<32>{#p/napstablook}* i was looking through old lab recordings, and...'
               ],
         hapsta38: ['<32>{#p/mettaton}{#e/mettaton/34}* YES...?'],
         hapsta39: [
            '<32>{#p/napstablook}* well, there was this voice that sounded like......',
            '<32>{#p/napstablook}* like......'
         ],
         hapsta40: ["<33>{#p/mettaton}{#e/mettaton/11}* WE DON'T HAVE ALL DAY, DARLING."],
         hapsta41: [
            '<32>{#p/napstablook}* it was you',
            '<32>{#p/napstablook}{#e/mettaton/3}* .........\n* the real you.'
         ],
         hapsta42: [
            '<32>{#p/mettaton}{#e/mettaton/2}* THE \"REAL ME\" EH?',
            "<32>{#e/mettaton/0}* NOW HOLD ON, LET'S NOT JUMP TO CONCLUSIONS HERE."
         ],
         hapsta43: ["<32>{#p/finalghost}* They're telling the truth."],
         hapsta44: ['<32>{#p/mettaton}{#e/mettaton/6}* ... AND NOW THE GHOSTS ARE GANGING UP ON ME.\n* LOVELY.'],
         hapsta45: ['<25>{#p/alphys}{#g/alphysTheFactIs}* Uh, I s-swear I had nothing to do with this...'],
         hapsta46: [
            "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}{#e/mettaton/3}* I-I'll just, get out of your guys' way..."
         ],
         hapsta47: [
            "<32>{#p/basic}* Excuse me, WHERE do you think you're going?",
            "<32>{#p/basic}* You're the one who started all this in the first place!",
            "<32>{#p/basic}* If it wasn't for your stupid tape, I wouldn't have to be here right now."
         ],
         hapsta48: ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Whoops.'],
         hapsta49a: [
            "<32>{#p/mettaton}{#e/mettaton/9}* SO THAT'S IT, THEN.",
            "<32>{#e/mettaton/7}* YOU'RE ALL HERE... NO DOUBT TO BRING ME BACK HOME."
         ],
         hapsta49b: ['<32>{#e/mettaton/8}* SO MUCH FOR \"CHASING YOUR DREAMS,\" EH BLOOKY?'],
         hapsta50: ['<32>{|}{#p/napstablook}* cousin, i- {%}'],
         hapsta51a: ['<32>{#p/mettaton}{#e/mettaton/18}* OH, DON\'T \"COUSIN\" ME.'],
         hapsta51b: [
            "<32>{#p/mettaton}{#e/mettaton/20}* IF IT WASN'T FOR YOU, I MIGHT'VE ACTUALLY ENJOYED THE QUIET LIFE...",
            '<32>{#p/mettaton}{#e/mettaton/17}* ... BUT NO.\n* YOU JUST -HAD- TO GET ME IN ON THE FAMILY BUSINESS.',
            '<32>{#p/mettaton}{#e/mettaton/19}* A BUSINESS, MIGHT I ADD, WHOSE SALES FIGURES HAVE BEEN IN THE RED SINCE DAY ONE.'
         ],
         hapsta52: ['<32>{#p/napstablook}{#e/mettaton/3}* .........\n* i know.'],
         hapsta53: [
            '<32>{#p/mettaton}{#e/mettaton/17}* OH, REALLY NOW?\n* DO YOU REALLY KNOW WHAT IT WAS LIKE FOR ME?'
         ],
         hapsta54: ["<32>{#p/finalghost}* Considering we've all read your diaries, I'm sure they do..."],
         hapsta55a: [
            "<32>{#p/mettaton}{#e/mettaton/19}* I DON'T CARE IF THEY'VE READ MY DIARIES, I WANT THEM TO HEAR IT FROM ME.",
            '<32>{#p/mettaton}{#e/mettaton/3}* ...\n* LISTEN, \"COUSIN.\"\n* THE WORK WAS NEVER THE ISSUE.',
            '<32>{#p/mettaton}{#e/mettaton/14}* SNAIL FARMING MAY NOT BE THE MOST GLAMOROUS PASS TIME, BUT I LIKED IT FOR WHAT IT WAS.',
            "<32>{#p/mettaton}{#e/mettaton/13}* NO... IT ONLY STARTED BECOMING A PROBLEM WHEN EVERY SECOND I WASN'T ON THE FARM...",
            "<32>{#p/mettaton}* ... WAS A SECOND YOU PEOPLE DIDN'T SEEM TO CARE ABOUT ME."
         ],
         hapsta55b: [
            '<32>{#p/mettaton}{#e/mettaton/16}* NO CALLS, NO VISITS... JUST THE OCCASIONAL \"HEY, WHEN ARE YOU COMING BACK TO WORK?\"',
            "<32>{#p/mettaton}{#e/mettaton/15}* IT WAS PRETTY OBVIOUS TO ME THAT AT SOME POINT, I'D BECOME NOTHING BUT A TOOL...",
            '<32>{#p/mettaton}{#e/mettaton/11}* A MERE COG IN THE GRAND BLOOK FAMILY MACHINE.'
         ],
         hapsta56: ['<32>{#p/napstablook}* ...............'],
         hapsta57a: ['<32>{#p/mettaton}{#e/mettaton/2}* NOTHING TO SAY?\n* NO, NO, I EXPECTED AS MUCH.'],
         hapsta57b: [
            "<32>{#p/mettaton}{#e/mettaton/5}* HONESTLY, THOUGH, I COULDN'T CARE LESS ABOUT WHAT YOU HAVE TO SAY.",
            "<32>{#p/mettaton}{#e/mettaton/10}* I'VE GOT EVERYTHING I WANT IN LIFE, AND LOOK AT YOU...",
            '<32>{#p/mettaton}{#e/mettaton/12}* CLINGING TO TRAINING DUMMIES AND BEGGING FOR SCRAPS.'
         ],
         hapsta58: ["<32>{#p/finalghost}* You say you don't care about us, yet you invite us onto your shows."],
         hapsta59: [
            '<32>* You even gave Blooky special treatment during that last show...',
            "<32>* Kicking that other contestant so it'd be them against the human in the final round."
         ],
         hapsta60: ['<32>{#p/mettaton}{#e/mettaton/5}* ... THAT WAS ONLY OUT OF PITY.'],
         hapsta61: ['<32>{#p/basic}* Or... part of you secretly wants to come back!'],
         hapsta62: ['<32>{#p/mettaton}{#e/mettaton/11}* HAHAHA...\n* NOT A CHANCE IN THE GALAXY.'],
         hapsta63: ["<32>{#p/napstablook}* i'm sorry, cousin."],
         hapsta64: ['<32>{#p/mettaton}{#e/mettaton/21}* ... OH?'],
         hapsta65a: [
            "<32>{#p/napstablook}* after you left, we couldn't keep up with our customers...",
            "<32>{#p/napstablook}{#e/mettaton/15}* we had to scale down\n* the farm... isn't what it was......"
         ],
         hapsta65b: ['<32>{#p/napstablook}* and i never realized how much you did for us...... until you were gone'],
         hapsta65c: ["<32>{#p/napstablook}{#e/mettaton/4}* so... i'm sorry.\n* for everything........."],
         hapsta66a: [
            '<32>{#p/mettaton}* I SEE.',
            '<32>{#p/mettaton}{#e/mettaton/6}* ... I SEE.',
            "<32>{#p/mettaton}{#e/mettaton/5}* SO YOU'RE THE TYPE TO APOLOGIZE ONLY -AFTER- YOU'VE BEEN CALLED OUT, HUH?"
         ],
         hapsta66b: ['<32>{#p/mettaton}{#e/mettaton/0}* I SHOULD HAVE KNOWN.'],
         hapsta67: ["<32>{|}{#p/napstablook}* that's not- {%}"],
         hapsta68a: [
            '<32>{#p/mettaton}{#e/mettaton/3}* NO, I GET IT. YOU WANT ME TO FORGIVE YOU AND MOVE ON FROM IT LIKE NOTHING HAPPENED.',
            "<32>{#p/mettaton}{#e/mettaton/5}* WELL, I'M AFRAID THAT'S NOT HOW THINGS WORK ANYMORE, BLOOKY."
         ],
         hapsta68b: ["<32>{#p/mettaton}{#e/mettaton/6}* ... ANYWAY, I'VE GOT A GRAND FINALE TO PREPARE..."],
         hapsta68c: ["<32>{#p/mettaton}{#e/mettaton/11}* SO, IF YOU DON'T MIND, I'LL BE ON MY WAY NOW."],
         hapsta69: ['<32>{#p/basic}* Get back here.\n* Get back here!\n* GET BACK HERE!!!'],
         hapsta70: ["<33>{#p/finalghost}* I don't think he's coming back."],
         hapsta71: [
            '<32>{#p/napstablook}* maybe... he just needs a little space......',
            '<32>{#p/napstablook}* we have to give him a chance.........'
         ],
         hapsta72: ["<32>{#p/basic}* What a giant waste of time.\n* I'm going back to Undyne's house now."],
         hapsta73: ['<32>{#p/finalghost}* It was a nice try, Blooky.', '<32>{#p/finalghost}* A nice try.'],
         hapsta74: ['<32>{#p/napstablook}* no............'],
         hapsta75: () =>
            SAVE.data.b.oops
               ? [
                  "<25>{#p/alphys}{#g/alphysCutscene2}* Hey...\n* Don't listen to them.",
                  "<25>{#p/alphys}{#g/alphysCutscene2}* I've known Mettaton f-for quite a while now...",
                  "<25>{#p/alphys}{#g/alphysCutscene2}* He wouldn't leave like that unless he needed time to think.",
                  '<32>{#p/napstablook}* yeah...',
                  '<32>{#p/napstablook}* i guess......'
               ]
               : [
                  "<32>{#p/basic}* You know he's done this in the past, right?",
                  "<32>{#p/basic}* He'll be back.",
                  '<32>{#p/napstablook}* heh...\n* $(namel)......',
                  '<25>{#p/alphys}{#g/alphysInquisitive}* $(name)...?',
                  "<32>{#p/napstablook}* uh, it's a long story",
                  '<25>{#p/alphys}{#g/alphysWelp}* ... I guess you can tell me later.',
                  '<32>{#p/napstablook}* ...\n* thank you, $(namel)\n* for everything......',
                  "<32>* you've done so much for our family just by being here",
                  "<32>* even if... it's not the family you really wanted......",
                  '<32>{#p/basic}* Blooky, I...',
                  '<32>{#p/napstablook}* $(namel), if...\n* no, when you see him again...',
                  "<32>* don't ever let him forget how much you cared about him in life... alright?"
               ],
         hapsta76: [
            "<32>{#p/napstablook}* here's your mew mew doll",
            "<32>* i hope i wasn't too late......",
            "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* No, i-it's okay.\n* Thank you."
         ],
         hapsta77: ['<32>{#p/napstablook}* well, cya......'],
         opera36a: () => [
            '<25>{#p/alphys}{#g/alphysWelp}* That was certainly an unexpected turn of events.',
            ...(SAVE.data.b.a_state_hapstablook && !SAVE.data.b.oops
               ? [
                  '<25>{#p/alphys}{#g/alphysInquisitive}* Not to mention the whole \"$(name)\" thing...',
                  "<25>* Last I checked, they've been dead for a hundred years...",
                  "<25>{#g/alphysWelp}* Oh well.\n* I guess they'll tell me about it later.",
                  "<25>{#g/alphysWelp}{#x5}* Speaking of which, you'll probably want to get going..."
               ]
               : [
                  "<25>{#p/alphys}{#g/alphysInquisitive}* Looks like we're in the clear, though...",
                  "<25>{#g/alphysWelp}{#x5}* Which means... you'll probably want to get going..."
               ]),
            '<25>{#g/alphysTheFactIs}{#x6}* And I should probably get back to the lab...',
            '<25>{#g/alphysNervousLaugh}{#x5}* So... see you around, I guess?',
            ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
               ? [
                  "<25>{#g/alphysUhButHeresTheDeal}* Uh, b-but don't worry!\n* I'll ring you as soon as you...",
                  '<25>{#g/alphysNervousLaugh}* You...',
                  "<25>{#g/alphysHellYeah}* I-I'll stay in contact!"
               ]
               : [
                  ...(!SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                     !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                     !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                     ? ((SAVE.data.b.mewget = true),
                        [
                           '<25>{#g/alphysNervousLaugh}* ...',
                           '<25>{#g/alphysFR}* ... actually, before I go, I thought you should know.',
                           '<25>{#f/33}* I found the Mew Mew doll you let go of.',
                           "<25>{#g/alphysCutscene3}* It's mine now.\n* And I'm never letting it go again.",
                           '<25>{#g/alphysHellYeah}* S-so yeah!'
                        ])
                     : [
                        '<25>{#g/alphysNeutralSweat}{#x5}* But, uh, b-before I go...',
                        '<25>{#f/10}* Would you mind... giving me back my Mew Mew doll?',
                        '<25>{#f/3}* Please?',
                        choicer.create('* (Give back the Mew Mew doll?)', 'Yes', 'No')
                     ])
               ])
         ],
         opera36b1: [
            '<32>{#p/human}* (You gave the Mew Mew Doll to Alphys.)',
            '<25>{#p/alphys}{#g/alphysCutscene2}* Thanks.'
         ],
         opera36b2: [
            '<32>{#p/human}* (You decide not to give.)',
            '<25>{#p/alphys}{#g/alphysWTF}* ...',
            '<25>{#g/alphysCutscene2}* Okay, you know what?\n* You can keep it.',
            "<25>{#g/alphysCutscene2}* It's all yours.",
            "<25>{#f/33}* What?\n* It's not like I care about it or anything."
         ],
         opera37: (gib: boolean) =>
            SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew
               ? ['<25>{#p/alphys}{#g/alphysSmileSweat}* T-take care!!']
               : gib
                  ? ["<25>{#p/alphys}{#f/10}* I-I'll stay in contact."]
                  : ['<25>{#p/alphys}{#f/3}* N-not at all!!'],
         opera38: [
            '<32>{#p/basic}* ... now I understand why Blooky feels how they do all the time.',
            "<32>* That guilt, thinking you could've done more to care about someone...",
            "<32>* Hmph.\n* Maybe there's something more I can do to help here.",
            '<32>* Remember what happened with Toriel?',
            '<32>* The way you called out for me, and I was able to talk?',
            '<32>* I know things about monsters.\n* Things that could help us get through more quickly.',
            '<32>* So, if I think of something...',
            '<32>* Call out for me like you did before, okay?'
         ],
         operaX1: () =>
            [
               ['<25>{#p/asriel2}{#f/8}* Hello?'],
               ['<25>{#p/asriel2}{#f/8}* Here we go.'],
               ['<25>{#p/asriel2}{#f/8}* ...']
            ][Math.min(SAVE.flag.n.ga_asriel53++, 1)],
         operaX2: () => [
            ...[
               ['<32>{#p/mettaton}* HELLO, DARLING.'],
               ['<32>{#p/mettaton}* HERE WE GO INDEED, DARLING!'],
               ['<32>{#p/mettaton}* WHY HELLO!']
            ][Math.min(SAVE.flag.n.ga_asriel53 - 1, 2)],
            "<32>* WHY DON'T YOU TWO COME INTO THE LIMELIGHT?"
         ],
         operaX3: [
            "<32>{#p/mettaton}* THAT'S BETTER...",
            '<32>{#p/mettaton}* NOW, ALLOW ME TO SING YOU TWO A LITTLE SONG.'
         ],
         operaX4: () =>
            [
               [
                  "<25>{*}{#p/asriel2}{#f/10}* So tell me, what's this little song about?{^30}{%}",
                  '<32>{*}{#p/mettaton}{#x1}* OH, ASRIEL...{^30}{%}',
                  '<32>{*}{#x2}* HAVEN\'T YOU HEARD OF A THING CALLED \"SPOILERS?\"{^30}{%}',
                  '<25>{*}{#p/asriel2}{#f/6}* Figures.{^30}{%}'
               ],
               [
                  "<25>{*}{#p/asriel2}{#f/7}* I already know this show's just about me.{^30}{%}",
                  '<32>{*}{#p/mettaton}{#x1}* OH, DO YOU NOW?{^30}{%}',
                  "<32>{*}{#x2}* WELL, I'M AFRAID THAT WON'T STOP ME FROM DOING IT.{^30}{%}",
                  '<25>{*}{#p/asriel2}{#f/8}* ...{^30}{%}'
               ]
            ][Math.min(SAVE.flag.n.ga_asriel54++, 1)],
         operaX5: () => [
            "<32>{#p/mettaton}* WELL, THAT'S ALL.",
            "<32>{#x1}* OH, AND, I FORGOT TO MENTION THAT I'M NOT REALLY HERE.",
            '<32>* MY CONTROL CHIP IS ALREADY INSTALLED IN THE NEW BODY.',
            ...(SAVE.flag.n.ga_asriel55++ < 1
               ? [
                  '<25>{#p/asriel2}{#f/10}* ... a new body?',
                  '<32>{#p/mettaton}* OH, YOU WANT TO SEE IT?',
                  "<32>* WELL.\n* YOU WON'T HAVE TO WAIT MUCH LONGER."
               ]
               : []),
            '<32>{#p/mettaton}* SEE YOU SOON...'
         ],
         operaX7: ["<25>{#p/asriel2}{#f/8}* Something tells me this won't be as easy as we'd hoped."],
         operaY1: ['<25>{*}{#p/asriel2}{#f/13}* What are you- {%}'],
         operaY2: ['<25>{*}{#p/asriel2}{#f/15}* $(name).\n* What are you doing.{^40}{%}'],
         operaY3: ["<25>{*}{#p/asriel2}{#f/15}* This can't go on...{^40}{%}"],
         operaY4: ['<25>{*}{#p/asriel2}{#f/16}* Thanks anyway, $(name).{^40}{%}'],
         end1: (rgk: boolean) => [
            '<32>{#p/mettaton}* AT LAST...',
            ...(SAVE.flag.b.legs
               ? [
                  '<32>* AT LAST WE MEET ON THIS FATEFUL...',
                  '<32>{#e/mettaton/4}* ...',
                  "<32>{#e/mettaton/25}* MY SENSORS TELL ME YOU'RE LOOKING OVER MY SHOULDER.",
                  iFancyYourVilliany()
                     ? '<32>{#e/mettaton/30}* YOU MUST BE EAGER TO FLIP THAT SWITCH OF MINE, EH \"$(moniker2u)?\"'
                     : '<32>{#e/mettaton/30}* YOU MUST BE EAGER TO FLIP THAT SWITCH OF MINE, EH DARLING?',
                  ...(!world.badder_lizard
                     ? [
                        '<32>{#e/mettaton/28}* A SWITCH YOU NO DOUBT KNOW ABOUT THANKS TO ALPHYS SHARING MY SECRETS WITH YOU.',
                        '<32>{#e/mettaton/3}* HOW PREDICTABLE...'
                     ]
                     : [
                        '<32>{#e/mettaton/28}* A SWITCH YOU NO DOUBT LEARNED OF BY SPELUNKING INTO THE ROYAL LAB RECORDINGS.',
                        '<32>{#e/mettaton/3}* HOW PREDICTABLE...'
                     ]),
                  "<32>{#e/mettaton/12}* SUFFICE IT TO SAY, I WON'T WASTE YOUR TIME WITH A MONOLOGUE.",
                  ...(SAVE.data.b.a_state_hapstablook
                     ? ["<32>{#e/mettaton/3}* JUST KNOW THAT I'M NOT IN THE MOOD FOR GAMES."]
                     : iFancyYourVilliany()
                        ? ["<32>{#e/mettaton/31}* JUST KNOW THAT I WON'T GO EASY ON YOU FOR A SECOND!"]
                        : !world.badder_lizard
                           ? ["<32>{#e/mettaton/31}* JUST KNOW THAT I'M COUNTING ON YOU TO BRING YOUR A-GAME!"]
                           : ["<32>{#e/mettaton/19}* JUST KNOW THAT I COULDN'T CARE LESS ABOUT WHAT HAPPENS TO YOU."])
               ]
               : [
                  '<32>* AT LAST WE MEET ON THIS FATEFUL STAGE.',
                  ...(iFancyYourVilliany()
                     ? [
                        '<32>{#e/mettaton/3}* WELL THEN.',
                        "<32>{#e/mettaton/35}* IT -IS- INCREDIBLE HOW YOU'VE MANAGED TO KEEP UP THE ACT FOR SO LONG...",
                        '<32>{#e/mettaton/6}* BUT NOW, COMES THE MOMENT WHERE YOUR MASK IS SURE TO SLIP.',
                        '<32>{#e/mettaton/5}* DID YOU REALLY THINK I WAS GOING TO GO EASY ON YOU, DEAR \"$(moniker2u)?\"',
                        "<32>{#e/mettaton/0}* WELL, OF COURSE YOU DIDN'T.\n* BUT YOU STILL WON'T BE READY FOR WHAT COMES NEXT.",
                        '<32>{#e/mettaton/10}* IF YOU THINK YOU HAVE WHAT IT TAKES, THEN DO BE MY GUEST...',
                        "<32>{#e/mettaton/31}* JUST DON'T BLAME -ME- FOR YOUR DEFEAT WHEN IT FINALLY HAPPENS!"
                     ]
                     : [
                        '<32>{#e/mettaton/4}* BUT THEN...',
                        '<32>{#e/mettaton/34}* WHERE WOULD I BE WITHOUT YOU?',
                        "<32>{#e/mettaton/5}* FOR BETTER OR WORSE, YOU'VE GIVEN US BOTH THE OPPORTUNITY TO SHINE OUR BEST.",
                        "<32>{#e/mettaton/6}* BUT NOW, COMES THE MOMENT YOU'VE BEEN DYING FOR.",
                        '<32>{#e/mettaton/23}* THOUGH, I MUST ADMIT...',
                        ...(SAVE.data.b.a_state_hapstablook
                           ? [
                              "<32>{#e/mettaton/5}* THINGS DIDN'T QUITE WORK OUT THE WAY I EXPECTED.",
                              '<32>{#e/mettaton/6}* ALL THIS OLD FAMILY NONSENSE COMING BACK OUT OF THE BLUE...',
                              "<32>* ... ISN'T SOMETHING I'M PARTICULARLY HAPPY ABOUT.",
                              "<32>{#e/mettaton/11}* STILL, I'VE GOT A GRAND FINALE TO PERFORM, SO I MIGHT AS WELL GET IT OVER WITH.",
                              '<32>{#e/mettaton/5}* TRY NOT TO BE TOO MUCH OF A BORE, WILL YOU?',
                              '<32>{#e/mettaton/6}* THE AUDIENCE IS STARVING FOR SOME GENUINE ACTION.'
                           ]
                           : !world.badder_lizard
                              ? [
                                 "<32>{#e/mettaton/25}* I'M COUNTING ON YOU TO MAKE IT PAST ME IN ONE PIECE.",
                                 "<32>{#e/mettaton/0}* DON'T GET ME WRONG, I'D LOVE TO TAKE A HUMAN SOUL AND BECOME HUMANITY'S STAR.",
                                 '<32>{#e/mettaton/3}* BUT TAKING -YOUR- SOUL WOULD BE... BITTERSWEET.',
                                 "<32>{#e/mettaton/6}* WE'VE BEEN THROUGH SO MUCH TOGETHER, WHAT WITH ALL THE SHOWS AND ALL.",
                                 "<32>{#e/mettaton/4}* PLUS, FOR A HUMAN WHO HAS TO DEAL WITH ALL THESE SHORT- SIGHTED MONSTERS' ANTICS...",
                                 "<33>{#e/mettaton/0}* YOU'VE BEEN VERY UNDERSTANDING.",
                                 '<32>{#e/mettaton/5}* OH WELL.\n* IF YOU DO KICK THE BUCKET, YOU CAN REST ASSURED...',
                                 "<32>* YOUR SOUL WON'T GO TO WASTE.",
                                 "<32>{#e/mettaton/10}* NOW, SHOW ME YOU'VE GOT WHAT IT TAKES TO BE A -REAL- SUPERSTAR!"
                              ]
                              : [
                                 '<32>{#e/mettaton/5}* AT FIRST, I CONSIDERED GOING HARD ON YOU.',
                                 ...(SAVE.data.n.bad_lizard < 2
                                    ? [
                                       ...(SAVE.data.n.state_foundry_undyne === 1
                                          ? [
                                             '<32>{#e/mettaton/10}* AFTER ALL... YOU DID DO SOMETHING WHICH HURT A FRIEND OF MINE VERY DEARLY.',
                                             '<32>{#e/mettaton/3}* BUT THEN I REMEMBERED YOUR BETTER HALF.',
                                             '<32>{#e/mettaton/6}* AND THE FACT THAT, FOR THE MOST PART, YOU -HAVE- BEEN DOING FAIRLY WELL.',
                                             "<32>{#e/mettaton/2}* GRANTED, I HAVEN'T BEEN KEEPING AS CLOSE AN EYE ON YOU LATELY...",
                                             "<32>{#e/mettaton/12}* BUT JUDGING BY HOW YOU WERE BEFORE, I DOUBT YOU'D DO ANYTHING RASH."
                                          ]
                                          : [
                                             "<32>{#e/mettaton/10}* AFTER ALL... YOU HAVEN'T REALLY BEEN THE GREATEST PERSON.",
                                             '<32>{#e/mettaton/3}* BUT THEN I REMEMBERED YOUR BETTER HALF.',
                                             '<32>{#e/mettaton/6}* AND THE FACT THAT, FOR A TIME, YOU -WERE- DOING REALLY WELL THERE.'
                                          ]),
                                       "<32>{#e/mettaton/5}* WHO KNOWS.\n* MAYBE I'M GIVING YOU TOO MUCH CREDIT.",
                                       '<32>{#e/mettaton/0}* OR MAYBE I JUST WANT TO AVOID ANY UNNECESSARY TROUBLE.',
                                       "<32>{#e/mettaton/20}* STILL, THAT DOESN'T MEAN WE'RE BEST FRIENDS ALL OF A SUDDEN."
                                    ]
                                    : [
                                       ...(SAVE.data.n.state_starton_papyrus === 1
                                          ? SAVE.data.n.state_foundry_undyne === 2
                                             ? rgk
                                                ? [
                                                   '<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL JUST ABOUT EVERYBODY I COULD LIST OFF BY NAME.'
                                                ]
                                                : [
                                                   '<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL PAPYRUS, AS WELL AS UNDYNE.'
                                                ]
                                             : rgk
                                                ? [
                                                   '<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL PAPYRUS, ALONG WITH SEVERAL ROYAL GUARD MEMBERS.'
                                                ]
                                                : ['<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL PAPYRUS.']
                                          : SAVE.data.n.state_foundry_undyne === 2
                                             ? rgk
                                                ? [
                                                   '<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL UNDYNE, ALONG WITH SEVERAL ROYAL GUARD MEMBERS.'
                                                ]
                                                : ['<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL UNDYNE.']
                                             : rgk
                                                ? [
                                                   '<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL SEVERAL ROYAL GUARD MEMBERS.'
                                                ]
                                                : [
                                                   '<32>{#e/mettaton/10}* AFTER ALL... YOU DID GO AND KILL ALL THOSE PEOPLE.'
                                                ]),
                                       '<32>{#e/mettaton/3}* BUT THEN I REMEMBERED THE WARNING I GAVE YOU AT THE LAB.',
                                       "<32>{#e/mettaton/6}* AND THE FACT THAT, SINCE THEN, YOU'VE BEEN BEHAVING MUCH BETTER.",
                                       '<32>{#e/mettaton/5}* WELL, WELL.\n* IT SEEMS YOU CAN CHANGE YOUR WAYS AFTER ALL.',
                                       '<32>{#e/mettaton/0}* GOOD ON YOU.',
                                       "<32>{#e/mettaton/20}* BUT DON'T THINK THAT MEANS I'M JUST GOING TO FORGET ABOUT WHAT YOU DID."
                                    ]),
                                 '<32>{#e/mettaton/29}* ONLY THAT, FOR THE SAKE OF PUTTING ON A GOOD SHOW...',
                                 "<32>{#e/mettaton/26}* I'LL AGREE TO PLAY FAIR.",
                                 "<32>{#e/mettaton/5}* ... MAYBE, BY THE END, YOU'LL EVEN EARN MY RESPECT.",
                                 "<32>{#e/mettaton/35}* NOW.\n* SHOW ME YOU'RE MORE THAN A RUTHLESS KILLER.",
                                 "<32>{#e/mettaton/31}* SHOW ME YOU'VE GOT WHAT IT TAKES TO BE A -REAL- SUPERSTAR!"
                              ])
                     ])
               ])
         ],
         end2: ['<32>{#e/mettaton/11}* PRODUCERS!\n* GET THOSE CAMERAS ROLLING!'],
         endX1: [
            '<32>{#p/mettaton}* MY, MY...\n* IT SURE TOOK -YOU- LONG ENOUGH, EH \"DARLING?\"',
            '<32>* BUT THE TIME FOR SURFACE-LEVEL DIALOGUE IS BEHIND US.',
            '<32>* ... WHAT?\n* DID YOU REALLY THINK I LIKED YOU ALL THIS TIME?',
            '<32>* YOU POOR, NAIVE CHILD.',
            '<32>* ALL I WANTED WAS TO PUT ON A SHOW, AND THAT I DID.',
            '<32>* SAYING ALL THE RIGHT WORDS, MAKING ALL THE RIGHT MOVES...',
            "<32>* THAT'S WHAT SHOWBUSINESS IS -REALLY- ABOUT.",
            '<32>* IT HAS NOTHING TO DO WITH \"FUN\" OR \"FRIENDSHIP...\"',
            '<32>* ALL THAT MATTERS IS POWER, AND THE UNASSAILABLE MIGHT OF ROBOTICS!',
            '<32>* ...\n* NOW YOU LISTEN TO ME.',
            "<32>* AFTER WHAT YOU DID OUT THERE, THERE'S NO WAY I'M LETTING YOU GET PAST ME.",
            '<32>* YOU CAN SCREAM.\n* YOU CAN STRUGGLE.\n* YOU CAN BEG FOR YOUR LIFE.',
            '<32>* YOU CAN DO WHATEVER YOU WANT.',
            "<32>* WHEN I'M DONE WITH YOU, YOU'LL BE NOTHING MORE THAN A STAIN ON THE CUTTING ROOM FLOOR.",
            "<32>* SEE, I'VE RIGGED THE CORE TO DELIVER POWER STRAIGHT TO MY BODY.",
            "<32>* IT'S NOT HOW ALPHYS AND I ORIGINALLY PLANNED IT, BUT IT'LL DO JUST AS WELL.",
            '<32>* WHEN I GIVE THE SIGNAL, THE CABLES WILL FALL, AND THE BATTLE WILL ALREADY BE OVER.',
            "<32>* HONESTLY, YOU SHOULD'VE SEEN THIS COMING...",
            "<32>* BUT MAYBE THAT'S EXPECTING TOO MUCH FROM SOMEONE WHO ONLY KNOWS HOW TO KILL."
         ],
         endX1x: [
            '<32>{#p/mettaton}* MY, MY...',
            '<32>* ...',
            '<32>* ... WHY THE LONG FACE?\n* ARE YOU REALLY THAT DESPERATE TO GET BEATEN TO A PULP?',
            '<32>* YOU ARE?\n* WELL, IF YOU INSIST...'
         ],
         endX2: ["<32>{#e/mettaton/17}* NOW, ALPHYS!\n* GIVE IT EVERYTHING YOU'VE GOT!"],
         endY1: [
            '<25>{#p/alphys}{#g/alphysSmileSweat}* Okay, you made it!',
            '<25>{#f/3}* Eheh... that was more difficult than it had to be, huh?',
            "<25>{#g/alphysYeahYouKnowWhatsUp}* I mean, not for you, since, y'know...",
            '<25>{#g/alphysNeutralSweat}* You, uh... seem content with just about anything.',
            '<25>* ...',
            '<25>{#g/alphysTheFactIs}* ... a-anyway, we should probably head towards the Citadel now.',
            '<25>{#g/alphysIDK}* The elevator should be fixed by now, so...'
         ],
         endY2: [
            "<25>{#p/alphys}{#g/alphysWelp}* Y-you know what, I'll just let you decide.",
            "<25>{#g/alphysSmileSweat}* If you want to go now, so be it!\n* Going later's fine too!",
            '<25>* Whatever \"powers your ship,\" am I right?',
            '<25>{#g/alphysTheFactIs}* Like, you know, how ships need certain fuel to...',
            '<25>{#g/alphysNeutralSweat}* A-and how you tend to be specific in how you...',
            '<26>{#g/alphysWelp}* Uh, you get what I mean.'
         ],
         endY3: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Well, see ya!'],
         end3: () => [
            '<32>{#e/mettaton/6}* BEAUTIES AND GENTLEBEAUTIES...',
            SAVE.flag.b.legs
               ? "<33>{#e/mettaton/11}* IT'S TIME FOR THE GRAND FINALE!"
               : '<32>{#e/mettaton/10}* ARE YOU READY FOR THE GRAND FINALE!?!?'
         ],
         end4: [
            '<32>{*}{#e/mettaton/11}* REAL DRAMA!!\n* REAL ROMANCE!!\n* REAL BLOODSHED!!{^20}{%}',
            '<32>{*}{#e/mettaton/20}* ON OUR NEW SHOW...{^20}{%}',
            '<32>{*}{#e/mettaton/17}* \"ATTACK OF THE KILLER ROBOT!\"{^20}{%}'
         ],
         end5: () =>
            SAVE.data.b.killed_mettaton
               ? !world.badder_lizard
                  ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* Oh my god, are you guys...']
                  : [
                     '<25>{#p/alphys}{#g/alphysWelp}* ...',
                     '<25>{#g/alphysInquisitive}* What are you looking at me for?',
                     SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                        ? "<26>{#g/alphysCutscene3}* I wasn't away for..."
                        : "<25>{#g/alphysCutscene3}* I'm only here to..."
                  ]
               : !world.badder_lizard
                  ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* Oh my god, are you guys alright??']
                  : [
                     '<25>{#p/alphys}{#g/alphysWelp}* ...',
                     '<25>{#g/alphysInquisitive}* What are you looking at me for?',
                     SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                        ? "<26>{#g/alphysCutscene3}* I wasn't away for THAT long."
                        : "<25>{#g/alphysCutscene3}* I'm only here to check on Mettaton."
                  ],
         end6: () =>
            SAVE.data.b.killed_mettaton
               ? ["<25>{#p/alphys}{#f/10}* Wh... where's Mettaton?", '<25>{#p/alphys}{#f/3}* D-did you...']
               : !world.badder_lizard
                  ? [
                     '<25>{#p/alphys}{#g/alphysInquisitive}* Hmm, you look okay...',
                     '<25>{#p/alphys}{#g/alphysWelp}* Sorry about vanishing on the phone earlier, by the way.',
                     "<25>{#g/alphysWelp}* The phone signal wouldn't reach here for some reason."
                  ]
                  : [
                     '<25>{#g/alphysHaveSomeCompassion}* ...',
                     '<25>{#g/alphysHaveSomeCompassion}* Look, just... come with me into the next room.',
                     world.baddest_lizard
                        ? "<25>{#g/alphysNeutralSweat}* Th-there's something I need to tell you."
                        : "<25>{#g/alphysNeutralSweat}* W-when you're ready, of course."
                  ],
         end7: () =>
            SAVE.data.b.killed_mettaton
               ? [
                  "<25>{#p/alphys}{#f/10}* I-I'm sorry.\n* I don't think I should be here right now.",
                  "<25>{*}{#p/alphys}{#f/3}* D-don't come after me!{%}"
               ]
               : [
                  "<25>{#p/alphys}{#g/alphysCutscene2}* Well, uh, d-don't worry about Mettaton, I can fix his power supply.",
                  "<25>{#p/alphys}{#g/alphysCutscene2}* He's only fused with the control chip, after all."
               ],
         end8: [
            '<25>{#p/alphys}{#g/alphysWelp}* I should get going now.',
            '<25>{#g/alphysNeutralSweat}* B-but, uh, I kind of need you to come with me.',
            '<25>{#g/alphysNervousLaugh}* The future of monsterkind might... d-depend on it...'
         ],
         end9: [
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* Just...\n* W-when you're ready...",
            '<25>{#g/alphysNeutralSweat}* Come with me into the next room.',
            '<25>{#g/alphysSideSad}* ...',
            "<25>{#g/alphysNeutralSweat}* I-I'm sorry.\n* There's no other way."
         ],
         end10: () => [
            world.baddest_lizard
               ? "<32>{#p/mettaton}* Well, darling...\n* It'd probably be a good idea to go along with her."
               : "<32>{#p/mettaton}* Don't worry, darling, it's probably just a new season of a sci-fi anime she likes.",
            '<32>* As for me?',
            '<32>* ...\n* After Alphys puts me back in my old body...',
            SAVE.data.b.a_state_hapstablook
               ? '<32>* I should go pay my family a visit.'
               : SAVE.data.n.state_starton_papyrus === 1
                  ? "<32>* I'm not really sure what I'm going to do."
                  : "<32>* I'm going to have some business to attend to.",
            ...(SAVE.data.b.oops
               ? []
               : [
                  '<32>* Oh, and by the way, $(name)...',
                  '<32>{#p/basic}* Huh?',
                  '<32>{#p/mettaton}* ... I wish you luck with your family business as well.',
                  '<32>{#p/basic}* My... oh.',
                  '<32>{#p/basic}* Yeah.',
                  '<32>{#p/basic}* ... thanks, Mettaton.'
               ]),
            '<32>{#p/mettaton}* Heh...',
            world.bad_lizard > 1
               ? '<32>* Until next time...\n* ...\n* ... brat.'
               : iFancyYourVilliany()
                  ? '<32>* Thanks for the ride...\n* ...\n* ... $(moniker2).'
                  : '<32>* See you around...\n* ...\n* ... darling.'
         ],
         end11: () => [
            '<32>{#p/human}* (You hear a sigh.)',
            '<32>{#p/basic}* ... all this family stuff with Mettaton has been hitting a little close to home.',
            "<32>* Blooky's... not the only one who's made those kinds of mistakes with people.",
            '<32>* ...',
            "<32>* I guess, for now, I'll just have to do my best to keep moving forward...",
            '<32>* ...\n* Come on, partner.',
            "<32>* Let's go home."
         ],
         endwalk0: () => [
            ...(SAVE.data.b.water
               ? [
                  "<25>{#p/alphys}{#g/alphysFR}* Don't tell me you're bringing that thing all the way to the Citadel.",
                  world.badder_lizard ? '<25>{#g/alphysNeutralSweat}* ...' : '<25>{#g/alphysWelp}* ...'
               ]
               : []),
            world.badder_lizard
               ? '<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* Follow me.'
               : '<25>{#p/alphys}{#g/alphysWelp}* This way.'
         ],
         endwalk1: () =>
            !world.badder_lizard
               ? [
                  '<25>{#p/alphys}{#g/alphysCutscene2}* So... Mettaton, huh?',
                  "<25>* Eheh... that was sure something, wasn't it?",
                  "<25>{#g/alphysSideSad}* I-I mean, I'd hoped his batteries would last longer, but...",
                  "<25>{#g/alphysUhButHeresTheDeal}* Well, i-it's just a tiny oversight, really.\n* Easily fixed!",
                  "<25>{#g/alphysWelp}* ... but that's not why you're here."
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysNeutralSweat}* ... look, I...',
                  ...(world.alphys_percieved_kills < 10
                     ? [
                        "<25>{#g/alphysHaveSomeCompassion}* I'm sorry for running away like that.",
                        ...(SAVE.data.n.state_foundry_undyne === 0
                           ? ["<25>{#g/alphysSideSad}* It's just... after those deaths in Aerialis, I..."]
                           : world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                              ? ["<25>{#g/alphysSideSad}* It's just... after Undyne's d-death, I..."]
                              : [
                                 "<25>{#g/alphysSideSad}* It's just... after Undyne's d-death, and...",
                                 '<25>{#g/alphysSideSad}* After those deaths in Aerialis, I...'
                              ]),
                        "<25>{#g/alphysThatSucks}* ... I didn't know what to do."
                     ]
                     : [
                        "<25>{#g/alphysHaveSomeCompassion}* I know you've killed a lot of people.",
                        ...(SAVE.data.n.kills_aerialis / 2 +
                           SAVE.data.n.corekills +
                           (SAVE.data.b.killed_knightknight ? 1 : 0) +
                           (SAVE.data.b.killed_madjick ? 1 : 0) >
                           2
                           ? [
                              "<25>{#g/alphysSideSad}* Even after I left the lab, I've s-still been watching you...",
                              '<25>{#g/alphysSideSad}* Through the staging area...\n* Through the CORE...'
                           ]
                           : [
                              "<25>{#g/alphysSideSad}* From the lab, I'd b-been watching you since you appeared...",
                              '<25>{#g/alphysSideSad}* Through Starton...\n* Through the Foundry...'
                           ]),
                        "<25>{#g/alphysNeutralSweat}* Didn't you ever stop to think about those monsters' lives?",
                        '<25>{#g/alphysThatSucks}* About what their... f-friends and family might think?',
                        ...(world.alphys_percieved_kills < 20
                           ? [
                              '<25>{#g/alphysNeutralSweat}* ...',
                              '<25>{#g/alphysNeutralSweat}* I know I could have done a better job escorting you, so...',
                              "<25>{#g/alphysHaveSomeCompassion}* Maybe I'm partly at fault for that."
                           ]
                           : [
                              "<25>{#g/alphysIDK3}* Because I've been thinking about it a lot.",
                              '<25>{#g/alphysHaveSomeCompassion}* I blamed myself for letting this happen, but...',
                              '<25>{#g/alphysIDK2}* Is it really my fault that you chose to kill all those people?'
                           ])
                     ])
               ],
         endwalk2: () =>
            !world.baddest_lizard
               ? [
                  ...(!world.badder_lizard
                     ? ["<25>{#p/alphys}{#g/alphysWelp}* Look, I'll just get to the point."]
                     : [
                        "<25>{#p/alphys}{#f/3}* But, uh, I don't really want to dwell on that right now, so...",
                        "<25>{#p/alphys}{#f/20}* ... I'll just get to the point."
                     ]),
                  "<25>{#g/alphysNeutralSweat}* There's... a reason I've been watching over you like this.",
                  '<25>* ...',
                  '<25>{#g/alphysFR}* To put it simply...',
                  "<25>{#g/alphysFR}* ASGORE's got a {@fill=#003cff}secret{@fill=#fff}."
               ]
               : [
                  ...(SAVE.data.n.state_foundry_undyne === 2
                     ? [
                        ...(world.alphys_percieved_kills < 10
                           ? ['<25>{#p/alphys}{#g/alphysIDK3}* ...']
                           : ['<25>{#p/alphys}{#g/alphysIDK3}* What hurts most of all, though, is... Undyne.']),
                        '<25>{#p/alphys}{#g/alphysIDK3}* If there was one monster who wanted us to go free...',
                        '<25>{#p/alphys}{#g/alphysIDK2}* More than anyone else, it was her.',
                        '<25>{#p/alphys}{#g/alphysSideSad}* She stood for freedom, and for justice...',
                        ...(world.alphys_percieved_kills < 10
                           ? [
                              '<25>{#p/alphys}{#g/alphysSmileSweat}* And maybe she was a little harsh towards you...',
                              '<25>{#p/alphys}{#g/alphysNeutralSweat}* ... but...'
                           ]
                           : [
                              "<25>{#p/alphys}{#g/alphysNeutralSweat}* And it's like you didn't even care.",
                              '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'
                           ]),
                        '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* She was my hero.',
                        '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* A person I... looked up to.',
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* A person who gave me hope.',
                        '<25>{#p/alphys}{#g/alphysThatSucks}* ... but to see her be killed so easily, it was like...',
                        '<25>{#p/alphys}{#g/alphysIDK2}* ... like watching that hope be torn away.',
                        '<25>{#p/alphys}{#g/alphysIDK2}* Ripped to pieces.',
                        '<25>{#p/alphys}{#g/alphysIDK3}* Gone forever.',
                        "<25>{#p/alphys}{#g/alphysIDK3}* And you're the one who made that happen.",
                        '<25>{#p/alphys}{#g/alphysIDK2}* ...'
                     ]
                     : ['<25>{#p/alphys}{#g/alphysThatSucks}* ...']),
                  "<25>* In any case, there's... nothing else I can do.",
                  "<25>{#p/alphys}{#g/alphysNeutralSweat}* What happens now isn't up to me anymore."
               ],
         endwalk3: () =>
            !world.baddest_lizard
               ? [
                  "<25>{#p/alphys}{#g/alphysSideSad}* I... can't say much about it now, but...",
                  '<25>{#g/alphysNeutralSweat}* As royal scientist, my duty is to escort you safely to the king.',
                  "<26>{#g/alphysWorried}* If anyone f-found out, they'd think we're against our own freedom.",
                  "<25>{#g/alphysHaveSomeCompassion}* ...\n* We're just trying to do the right thing."
               ]
               : world.alphys_percieved_kills < 10
                  ? [
                     "<25>{#p/alphys}{#g/alphysIDK2}* ... not that I'm complaining or anything.",
                     "<25>{#p/alphys}{#g/alphysIDK3}* I wasn't fit to escort you anyway."
                  ]
                  : world.alphys_percieved_kills < 20 || SAVE.data.n.state_foundry_undyne !== 2
                     ? [
                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* ... not that I'm complaining or anything.",
                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* I don't really want to be around you."
                     ]
                     : [
                        "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* ... you're lucky, you know.",
                        "<26>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* If it wasn't my job to protect you, I'd kill you myself."
                     ],
         endwalk4: () =>
            !world.baddest_lizard
               ? [
                  "<25>{#p/alphys}{#g/alphysWelp}* ... you go on ahead.\n* I'll try not to get too far behind.",
                  "<25>{#g/alphysSide}* Everything's gonna be fine, alright?",
                  ...(world.postnoot
                     ? world.nootflags.has('undyne') // NO-TRANSLATE

                        ? ['<25>{#g/alphysWelp}* ... despite the malfunctioning atmospheric system.']
                        : ["<25>{#g/alphysInquisitive}* ... even if there's something strange in the air..."]
                     : [])
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysThatSucks}* ... go.\n* Do whatever ASGORE wants you to do.',
                  "<25>{#g/alphysNeutralSweat}* You're not my problem anymore.",
                  ...(world.postnoot
                     ? world.nootflags.has('undyne') // NO-TRANSLATE

                        ? ['<25>{#g/alphysFR}* ... the atmospheric system, though...']
                        : ["<25>{#g/alphysFR}* ... whatever's in the air, though..."]
                     : [])
               ]
      },
      overworld: {
         DINNERTIME: () =>
            SAVE.data.b.svr
               ? [
                  "<32>{#p/human}* (You bend over and look at the table from the side.)\n* (It's flatter than it seems.)",
                  ...[
                     [
                        "<26>{#p/asriel1}{#f/20}* Yeah.\n* There aren't actually any dishes here...",
                        '<26>{#f/15}* Mettaton, uh, had some plans for this room.'
                     ],
                     [
                        '<25>{#p/asriel1}{#f/13}* If I remember correctly... he wanted to host a sitcom here.',
                        '<25>{#f/15}* About dinner parties.',
                        "<25>{#f/16}* ... it would've been just as boring as it sounds."
                     ],
                     [
                        "<26>{#p/asriel1}{#f/17}* Fortunately, most monster food doesn't need real dishes to eat.",
                        '<25>{#f/20}* When they do, the dishes are usually part of the food...',
                        "<25>{#f/17}* But I guess you'd be used to that by now."
                     ],
                     ['<25>{#p/asriel1}{#f/4}* Just be glad that awful show never happened.']
                  ][Math.min(asrielinter.dinnertime++, 3)]
               ]
               : ["<32>{#p/basic}* It's a table.\n* The plates and cutlery are painted on."],
         doublefridge1: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your ear against the fridge door.)\n* (A fizzing can be heard.)']
               : ["<32>{#p/basic}* It's a high-security fridge.\n* Both sides are filled with orange soda."],
         doublefridge2: () => [
            ...(SAVE.data.b.svr
               ? ['<32>{#p/human}* (It sounds like one of the bottles inside was opened...)']
               : ['<32>{#p/basic}* One of the bottles has already been opened...']),
            choicer.create('* (Take the opened bottle?)', 'Yes', 'No')
         ],
         doublefridge3: ["<32>{#p/human}* (You're carrying too much.)"],
         doublefridge4: ['<32>{#p/human}* (You got the Orange Soda.)'],
         doublefridge5: ['<32>{#p/human}* (You decide not to take anything.)'],
         labcamera2: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The display appears to be completely offline.)']
                  : SAVE.data.n.plot === 72
                     ? world.darker
                        ? ["<32>{#p/basic}* It's offline."]
                        : ['<32>{#p/basic}* Anonymity at last.']
                     : ["<32>{#p/basic}* It's probably best not to question how this works."],
         labdisplay: 'The Human\nEXP $(x)\nHP  $(y)\nG   $(z)\nDIS $(w)',
         exofountain1: () => [
            SAVE.data.b.svr
               ? '<32>{#p/human}* (You feel the urge to drink from a fountain of punch.)'
               : '<32>{#p/basic}* This extravagant fountain is filled with exoberry punch.',
            choicer.create('* (Take a sip?)', 'Yes', 'No')
         ],
         exofountain2a: ['<32>{#p/human}* (You chose not to take a sip.)'],
         exofountain2b: () => [
            '<32>{#p/human}* (You drink from the fountain.)\n* (HP fully restored.)',
            ...(world.genocide && SAVE.flag.n.ga_asrielDrink++ < 1
               ? ['<25>{#p/asriel2}{#f/15}* You are properly crazy.']
               : [])
         ],
         kneeler: [
            "<32>{#p/human}* (You check Asriel's head to make sure it's safe to climb up.)",
            '<25>{#p/asriel2}{#f/16}* Why are you like this.'
         ],
         kneeler2: ['<25>{#p/asriel2}{#f/8}* Thanks, I guess.'],
         topdesk1: () =>
            SAVE.data.b.svr || world.bad_lizard > 1 || world.genocide || SAVE.data.n.state_foundry_undyne === 2
               ? ["<32>{#p/human}* (You marvel at the imagery on the computer's screen.)\n* (It must be daydreaming.)"]
               : [
                  '<32>{#p/basic}* The computer is on standby.\n* Turn it on?',
                  choicer.create('* (Turn on the computer?)', 'Yes', 'No')
               ],
         topdesk2: ['<32>{#p/human}* (You decide not to turn it on.)'],
         topdesk3: ["<32>{#p/basic}* It's opened to a video game emulator of some kind."],
         labstationA: ["<32>{#p/basic}* It's opened to a control panel for a telescope network."],
         labstationB: ["<32>{#p/basic}* It's opened to a set of design plans for a holographic environment."],
         laserbarrrier1: () =>
            world.darker
               ? ["<32>{#p/basic}* It's a security field."]
               : ["<32>{#p/basic}* As per the crafter's guild standard, an impassable force field surrounds the area."],
         
         laserbarrrier2: pager.create(
            0,
            ['<32>{#p/basic}* Only one way forward now.'],
            ["<32>{#p/basic}* There's nothing special here."],
            ['<32>{#p/basic}* ...'],
            ['<32>{#p/basic}* ...'],
            ['<32>{#p/basic}* Really now.'],
            ['<32>{#p/basic}* ...'],
            ['<32>{#p/basic}* ...'],
            ["<32>{#p/basic}* Don't you have anything more intelligent to do?"]
         ),
         barricade: ['<32>{#p/basic}* The barricade blocks your way.'],
         puzzle1done: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stare into the blank screen of the terminal.)']
               : ["<32>{#p/basic}* It's inert."],
         lablizard: {
            a: pager.create(
               0,
               () =>
                  SAVE.data.n.plot < 51
                     ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* Sorry about all that stuff with Mettaton...',
                        '<25>{#g/alphysSideSad}* He, uh...',
                        '<25>{#g/alphysNervousLaugh}* He can get a little antsy at times, ehehe.'
                     ]
                     : SAVE.data.n.plot < 52
                        ? [
                           "<25>{#p/alphys}{#g/alphysCutscene2}* Thank GOD those guards didn't attack you.",
                           "<25>{#g/alphysNeutralSweat}* I've been trying to put out a royal memo to get them off your back...",
                           '<25>{#g/alphysWelp}* Hopefully it, uh, actually r-reached them.'
                        ]
                        : SAVE.data.n.plot < 54
                           ? [
                              "<25>{#p/alphys}{#g/alphysInquisitive}* L-look, I don't know the answers in here any more than out there...",
                              "<25>{#g/alphysSmileSweat}* I'll call you when you get back to the barricades."
                           ]
                           : SAVE.data.n.plot < 56
                              ? [
                                 "<25>{#p/alphys}{#g/alphysSideSad}* The p-puzzles in Aerialis haven't been upgraded yet...",
                                 "<25>{#g/alphysWelp}* It's just so hard to find the time when I'm this busy with my work."
                              ]
                              : SAVE.data.n.plot < 58
                                 ? [
                                    '<25>{#p/alphys}{#g/alphysCutscene1}* I have a habit of forgetting to turn off m-my experiments.',
                                    "<25>{#g/alphysCutscene2}* For a second there, I thought that habit might've saved you!",
                                    '<25>{#g/alphysUhButHeresTheDeal}* But, uh, I guess Mettaton had a backup plan.'
                                 ]
                                 : SAVE.data.n.plot < 59
                                    ? [
                                       '<25>{#p/alphys}{#g/alphysWelp}* Don\'t tell me.\n* Sans is selling his weird \"hotdogs\" again.',
                                       "<25>{#g/alphysCutscene2}* Yeah, that's like... a thing he does.\n* It's perfectly normal."
                                    ]
                                    : SAVE.data.n.plot < 60
                                       ? [
                                          "<25>{#p/alphys}{#g/alphysCutscene2}* I think Mettaton's getting ready for another show.",
                                          "<25>{#g/alphysTheFactIs}* I'd... be c-careful if I were you..."
                                       ]
                                       : SAVE.data.n.plot < 61
                                          ? SAVE.data.b.a_state_moneyitemC
                                             ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* I know what you did.']
                                             : [
                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                '<25>* Mettaton is becoming more and more reckless by the day.'
                                             ]
                                          : SAVE.data.n.plot < 66.1
                                             ? [
                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                "<25>{#g/alphysCutscene1}* Isn't it amazing when royal guards don't follow my orders!"
                                             ]
                                             : SAVE.data.n.plot < 67.1
                                                ? ["<25>{#p/alphys}{#g/alphysWelp}* At this rate, you're never getting through the CORE."]
                                                : [
                                                   "<25>{#p/alphys}{#g/alphysCutscene2}* Yeah, I'm... s-still here and all.",
                                                   '<25>{#g/alphysWelp}* Not that I have much left to do.'
                                                ],
               () =>
                  SAVE.data.n.plot < 51
                     ? [
                        "<26>{#p/alphys}{#g/alphysWelp}* Can't blame him, though.",
                        "<25>{#g/alphysWelp}* He's the biggest fan of humanity you'll ever meet out here."
                     ]
                     : SAVE.data.n.plot < 52
                        ? ['<25>{#p/alphys}{#g/alphysCutscene3}* You never know these days...']
                        : SAVE.data.n.plot < 54
                           ? [
                              '<25>{#p/alphys}{#g/alphysWelp}* I guess if things really go wrong, I can just override them.',
                              "<25>{#g/alphysNeutralSweat}* B-but that'd put them out of action for a while."
                           ]
                           : SAVE.data.n.plot < 56
                              ? ["<25>{#p/alphys}{#g/alphysWelp}* You wouldn't believe how long I've been stuck on this level."]
                              : SAVE.data.n.plot < 58
                                 ? SAVE.data.n.state_aerialis_crafterresult === 0
                                    ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Shame you never checked your new phone...']
                                    : ['<25>{#p/alphys}{#g/alphysCutscene2}* Not gonna lie, seeing you use that jetpack was great.']
                                 : SAVE.data.n.plot < 59
                                    ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* Perfectly normal.']
                                    : SAVE.data.n.plot < 60
                                       ? ["<25>{#p/alphys}{#g/alphysWelp}* Who knows what kind of antics he'll pull."]
                                       : SAVE.data.n.plot < 61
                                          ? SAVE.data.b.a_state_moneyitemC
                                             ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                                             : ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
                                          : SAVE.data.n.plot < 67.1
                                             ? ['<25>{#p/alphys}{#g/alphysFR}* It\'s called \"sarcasm.\"']
                                             : ['<25>{#p/alphys}{#g/alphysCutscene3}* Mettaton must be waiting so patiently right now.']
            )
         },
         mettacrafter1a: ['<32>{#p/mettaton}* NO TIME LIKE THE PRESENT!'],
         mettacrafter1b: ["<32>{#p/mettaton}* I THINK YOU'RE STILL MISSING SOME THINGS."],
         mettacrafter1c: ["<32>{#p/mettaton}* I THINK YOU'RE STILL MISSING SOMETHING."],
         mettacrafter2a: ['<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE EVERYTHING ON THE COUNTER TO MY LEFT.'],
         mettacrafter2b: ['<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE THE REST ON THE COUNTER TO MY LEFT.'],
         mettacrafter2c: ['<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE THE LAST ITEM ON THE COUNTER TO MY LEFT.'],
         platformDeny: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : [
                  "<32>{#p/basic}* You'll need a special pass to access the liftgate network.",
                  ...(world.goatbro
                     ? SAVE.data.n.plot < 49
                        ? !SAVE.flag.b.asriel_phone && SAVE.flag.n.ga_asrielGate++ < 1
                           ? [
                              "<25>{#p/asriel2}{#f/3}* No doubt a pass will be in Alphys's lab.\n* Let's go there first."
                           ]
                           : [] 
                        : SAVE.flag.b.asriel_phone
                           ? 
                           SAVE.flag.n.ga_asrielGetThePhone > 0
                              ? 
                              SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                 ? [
                                    "<25>{#p/asriel2}{#f/6}* Seriously, $(name)?\n* You know where Alphys's spare cell phone is.",
                                    '<25>{#p/asriel2}{#f/7}* Go back to her desk and grab it.'
                                 ]
                                 : 
                                 []
                              : 
                              SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                 ? [
                                    "<25>{#p/asriel2}{#f/3}* Remember, we need that cell phone from Alphys's lab.",
                                    "<25>{#p/asriel2}{#f/4}* I'm pretty sure it was on her desk..."
                                 ]
                                 : 
                                 ["<25>{#p/asriel2}{#f/3}* Remember, the cell phone from Alphys's lab."]
                           : 
                           [
                              [
                                 '<25>{#p/asriel2}{#f/3}* Alphys usually keeps liftgate passes on her cell phones.',
                                 '<25>* I think I saw one back in the lab.\n* Go get it.'
                              ],
                              [
                                 "<25>{#p/asriel2}{#f/7}* $(name), we can't make progress without that pass.",
                                 '<25>{#f/6}* Find it.'
                              ],
                              ['<25>{#p/asriel2}{#f/13}* Uh... $(name)?'],
                              ['<25>{#p/asriel2}{#f/13}* ...']
                           ][Math.min(SAVE.flag.n.ga_asrielGetThePhone++, 3)]
                     : world.bad_lizard > 1 && 49 <= SAVE.data.n.plot
                        ? ["<32>* Wasn't there a spare cell phone on Alphys's desk?"]
                        : SAVE.data.n.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne === 1 && 49 <= SAVE.data.n.plot
                           ? ["<32>* ... maybe there'd be one in the lab somewhere?"]
                           : [])
               ],
         lift: {
            elevatorStory1: () =>
               SAVE.data.n.plot < 64
                  ? [choicer.create('* (Where would you like to go?)', 'Floor R2', 'Cancel')]
                  : [choicer.create('* (Where would you like to go?)', 'Floor R2', 'Floor L2', 'Floor L3', 'Cancel')],
            elevatorStory2: () =>
               SAVE.data.n.plot < 64
                  ? [choicer.create('* (Where would you like to go?)', 'Floor R1', 'Cancel')]
                  : [choicer.create('* (Where would you like to go?)', 'Floor R1', 'Floor L2', 'Floor L3', 'Cancel')],
            elevatorStory3: () => [
               choicer.create('* (Where would you like to go?)', 'Floor L3', 'Floor R1', 'Floor R2', 'Cancel')
            ],
            elevatorStory4: () => [
               choicer.create('* (Where would you like to go?)', 'Floor L2', 'Floor R1', 'Floor R2', 'Cancel')
            ],
            elevatorStory5: () => [
               "<32>{#p/basic}* It's de-activated.",
               ...(world.goatbro && SAVE.flag.n.ga_asrielLiftE++ < 1
                  ? ["<25>{#p/asriel2}{#f/8}* Guess there's only one way forward now."]
                  : [])
            ],
            elevatorStory6: (citadel = false) =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The elevator appears to be powered down.)']
                  : postSIGMA()
                     ? ["<32>{#p/basic}* It's out of service."]
                     : [
                        "<32>{#p/basic}* It's de-activated.",
                        ...(world.goatbro && (citadel ? SAVE.flag.n.ga_asrielLiftC++ : SAVE.flag.n.ga_asrielLift++) < 1
                           ? citadel
                              ? ['<25>{#p/asriel2}{#f/8}* No elevator for us.']
                              : ["<25>{#p/asriel2}{#f/8}* Guess we'll have to find another way up."]
                           : [])
                     ],
            elevator1: () => [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', 'Floor L1', 'Cancel', 'Floor L2', 'Floor R2', 'Floor L3', 'Floor R3')
            ],
            elevator2: () => [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', 'Floor L1', 'Floor R1', 'Floor L2', 'Cancel', 'Floor L3', 'Floor R3')
            ],
            elevator3: () => [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', 'Floor L1', 'Floor R1', 'Cancel', 'Floor R2', 'Floor L3', 'Floor R3')
            ],
            elevator4: () => [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', 'Floor L1', 'Floor R1', 'Floor L2', 'Floor R2', 'Cancel', 'Floor R3')
            ],
            elevator5: () => [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', 'Floor L1', 'Floor R1', 'Floor L2', 'Floor R2', 'Floor L3', 'Cancel')
            ],
            elevator6: () => [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', 'Cancel', 'Floor R1', 'Floor L2', 'Floor R2', 'Floor L3', 'Floor R3')
            ]
         },
         terminal1: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* (You activate the terminal and read the info logs.)',
                        '<32>{#p/basic}* \"Activity log, K-615.09\"',
                        '<32>* \"Automated data analysis confirms several sudden shifts in the positions of stars.\"',
                        '<32>* \"Conclusion... the logical flow of time within the force field was disrupted.\"',
                        '<32>* \"Estimated time differential places real date at roughly K-625.09, ten orbits later.\"'
                     ]
                     : [
                        '<32>{#p/human}* (You activate the terminal and read the info logs.)',
                        '<32>{#p/basic}* \"Activity log, K-615.08\"',
                        '<32>* \"The subject was left unattended for a short time.\"',
                        '<32>* \"...\"',
                        '<32>* \"The flower\'s gone.\"',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielTerminal1++ < 1
                           ? ['<25>{#p/asriel2}{#f/9}* I wonder what happened here.']
                           : [])
                     ],
         terminal2: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* (You activate the terminal and read the message.)',
                        '<32>{#p/basic}* \"The Royal Lab is closed!\"\n* \"Thank you everyone for your hard work and dedication.\"'
                     ]
                     : world.bad_lizard < 2
                        ? [
                           '<32>{#p/human}* (You activate the terminal and read the message.)',
                           '<#32>{#p/basic}* \"Kahaha, Glyde was here!\"\n  - Glyde'
                        ]
                        : [
                           '<32>{#p/human}* (You activate the terminal and read the message.)',
                           '<32>{#p/basic}* \"I\'m sorry, everyone...\"'
                        ],
         terminal3: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* (You activate the terminal and read the message.)',
                        '<32>{#p/basic}* \"The Royal Lab is closed!\"\n* \"Thank you everyone for your hard work and dedication.\"'
                     ]
                     : [
                        '<32>{#p/human}* (You activate the terminal and read the message.)',
                        '<32>{#p/basic}* \"Dear employees of the Royal Lab, please place waste in the appropriate receptacles.\"'
                     ],
         terminal4: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* (You activate the terminal and read the message.)',
                        '<32>{#p/basic}* \"The Royal Lab is closed!\"\n* \"Thank you everyone for your hard work and dedication.\"'
                     ]
                     : [
                        '<32>{#p/human}* (You activate the terminal and read the message.)',
                        ...(world.bad_lizard > 1 || world.genocide
                           ? ['<32>{#p/basic}* \"The Royal Lab is no longer safe. Evacuation procedure in effect.\"']
                           : ['<32>{#p/basic}* \"Welcome to the Royal Lab.\"'])
                     ],
         terminal5: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : [
                     '<32>{#p/human}* (You activate the terminal and read the message.)',
                     ...(world.bad_lizard < 2 && SAVE.data.n.plot < 72
                        ? [
                           [
                              '<32>{#p/basic}* Tower two, clocking out.',
                              "<32>* We'll be at the rec center...",
                              "<32>* ... won't we, girl?"
                           ],
                           [
                              '<32>{#p/basic}* Tower two, reporting in.',
                              "<32>* We've spotted the human heading towards the elevator.",
                              '<32>* Sorry, Alphys...',
                              "<32>* ... we didn't train to capture humans all this time just to protect them."
                           ]
                        ][SAVE.data.n.state_aerialis_royalguards]
                        : ['<32>{#p/basic}* \"No data available.\"'])
                  ],
         recycler: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the recycle bin...)"]
               : ["<32>{#p/basic}* It's a recycle bin."],
         recyclerX: ['<32>{#p/human}* (You discarded the electro- dampening fluid.)'],
         ingredient1: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/human}* (You found the happy powder.)']
               : ['<32>{#p/human}* (You found the hexogen.)'],
         ingredient2: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/human}* (You found the tingle serum.)']
               : ['<32>{#p/human}* (You found the dioctyl adipate.)'],
         ingredient3: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/human}* (You found the love oil.)']
               : ['<32>{#p/human}* (You found the mineral oil.)'],
         boop: () =>
            [
               ['<25>{#p/asriel2}{#f/13}* $(name), uh...', '<25>{#p/asriel2}{#f/18}* What are you doing...?'],
               ['<25>{#p/asriel2}{#f/18}* Wh-\n* $(name)!', '<25>{#p/asriel2}{#f/18}* Did you just... poke my snout?'],
               ['<25>{#p/asriel2}{#f/18}* Ah-\n* Stop that!'],
               ['<25>{#p/asriel2}{#f/18}* Cut it out!'],
               ['<25>{#p/asriel2}{#f/13}* ... $(name)?'],
               ['<25>{#p/asriel2}{#f/15}* $(name).'],
               ['<25>{#p/asriel2}{#f/13}* Are you okay, $(name)?'],
               ["<25>{#p/asriel2}{#f/16}* ... I'll wait."],
               ['<25>{#p/asriel2}{#f/15}* ...']
            ][Math.min(SAVE.flag.n.ga_asrielBoop++, 8)],
         nuzzle: () =>
            [
               ['<25>{#p/asriel1}{#f/13}* Frisk...?', '<25>{#p/asriel1}{#f/17}* Personal space...'],
               ['<25>{#p/asriel1}{#f/18}* Wh-\n* Frisk!', '<25>{#p/asriel1}{#f/18}* Did you just... nuzzle my snout?'],
               ['<25>{#p/asriel1}{#f/18}* Ah-\n* That tickles, Frisk!'],
               ['<25>{#p/asriel1}{#f/18}* Friiisk...!'],
               ['<25>{#p/asriel1}{#f/17}* ... Frisk...\n* ... have mercy...'],
               ["<25>{#p/asriel1}{#f/20}* ... you're too sweet, Frisk."],
               ['<25>{#p/asriel1}{#f/13}* Uh, Frisk, you can stop that now.'],
               ["<25>{#p/asriel1}{#f/16}* I guess there's nothing I can do about this."],
               ['<25>{#p/asriel1}{#f/15}* ...']
            ][Math.min(SAVE.data.n.svr_nuz++, 8)]
      },
      trivia: {
         a_bbox: ["<32>{#p/basic}* A bastion box.\n* There's a human inside..."],
         a_wishflower: pager.create(
            0,
            (power = false) =>
               SAVE.data.b.svr
                  ? [
                     "<32>{#p/human}* (You take in the wish flower's aura.)",
                     power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                  ]
                  : ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
            pager.create(
               2,
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* Just any old wish flower.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : [
                           '<32>{#p/basic}* This wish flower wishes to remain a wish flower.',
                           power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* A wishy-washy wish flower.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : [
                           "<33>{#p/basic}* Wish upon a flower.\n* Wait, that doesn't sound right.",
                           power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : [
                           '<32>{#p/basic}* How many wishes can a wish flower flower?',
                           power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* A flower... made of wishes.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* It's a wish flower.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* Yet another wish flower.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
            )
         ),
         signposter1: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (You glance at the poster.)',
                  ...[
                     [
                        "<25>{#p/asriel1}{#f/7}* This really was a new low for Mettaton's ad department.",
                        '<26>{#f/15}* I mean, you could have at least given credit...',
                        '<26>{#f/20}* For the most obvious sci-fi anime inspiration of all time.'
                     ],
                     [
                        "<25>{#p/asriel1}{#f/13}* It's based on a scene from season two, episode seventeen.",
                        '<25>{#f/13}* Called \"Mew Mew\'s all- in-one kitchen.\"',
                        "<25>{#f/15}* ... let's just say the species she encountered that day...",
                        '<25>{#f/15}* ... had an unhealthy obsession with kitchen appliances.'
                     ],
                     [
                        '<25>{#p/asriel1}{#f/10}* What?\n* I lived a hundred years worth of lifetimes.',
                        8 <= SAVE.flag.n.ga_asrielMonologue
                           ? "<25>{#f/16}* We've been over this before, Frisk.\n* Come on."
                           : '<25>{#f/10}* You think I just sat around doing nothing when I got bored?'
                     ],
                     [
                        8 <= SAVE.flag.n.ga_asrielMonologue
                           ? '<25>{#p/asriel1}{#f/13}* You should know me by now.'
                           : '<25>{#p/asriel1}{#f/16}* ... you WOULD think about it like that...'
                     ]
                  ][Math.min(asrielinter.signposter1++, 3)]
               ]
               : world.darker
                  ? ['<33>{#p/basic}* Just a pointless advertisement.']
                  : [
                     "<32>{#p/basic}* It's an advertisement for a fancy MTT-brand stove...",
                     SAVE.data.n.plot === 72
                        ? '<32>{#p/basic}* A great appliance, for life on any homeworld.'
                        : '<32>{#p/basic}* How delightfully over the top.'
                  ],
         signposter2: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (You glance at the poster.)',
                  ...[
                     [
                        "<25>{#p/asriel1}{#f/17}* Hey look, it's you.",
                        '<25>{#f/13}* And Mettaton.',
                        '<25>{#f/17}* Kind of cute, honestly.'
                     ],
                     SAVE.flag.b.asriel_earpull
                        ? [
                           "<25>{#p/asriel1}{#f/13}* I'll admit, I never understood why you...",
                           '<25>{#f/15}* Uh, did what you did when we went through here.',
                           '<25>{#f/17}* I guess that was your way of saying...',
                           '<25>{#f/13}* ... you wanted to be friends?'
                        ]
                        : [
                           "<25>{#p/asriel1}{#f/17}* I'll admit, I got a kick out of watching you do this show.",
                           '<25>{#f/15}* The way you just stood completely still...\n* Doing nothing...',
                           "<25>{#f/13}* It was very weird.\n* But you're very weird in general.",
                           '<25>{#f/13}* Like me, I guess.'
                        ],
                     SAVE.flag.b.asriel_earpull
                        ? [
                           '<25>{#p/asriel1}{#f/17}* ... thanks, Frisk.',
                           '<25>{#f/23}* For trying so hard to be my friend.'
                        ]
                        : [
                           "<25>{#p/asriel1}{#f/2}* From now on, we'll have to call ourselves...",
                           '<25>{#f/1}* \"The Proud Weirdo Collective.\"',
                           '<25>{#f/15}* Actually, that sounded better in my head.\n* Never mind.'
                        ],
                     ['<25>{#p/asriel1}{#f/20}* You really like this poster, huh?']
                  ][Math.min(asrielinter.signposter2++, 3)]
               ]
               : world.darker
                  ? ['<33>{#p/basic}* Just a pointless advertisement.']
                  : SAVE.data.n.plot < 65
                     ? [
                        "<32>{#p/basic}* It's an advertisement for an upcoming show...",
                        iFancyYourVilliany()
                           ? "<32>{#p/basic}* Naturally, you're the villain."
                           : "<32>{#p/basic}* Naturally, you're the star."
                     ]
                     : [
                        "<32>{#p/basic}* It's an advertisement for an already-aired show...",
                        SAVE.data.n.plot === 72
                           ? '<32>{#p/basic}* We can only hope a new homeworld brings new entertainment.'
                           : '<32>{#p/basic}* Naturally, you were great.'
                     ],
         powerline: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You touch the power node.)\n* (It feels tingly.)']
               : SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}* It's a power node... that's mostly been powered down."]
                  : ["<32>{#p/basic}* It's a power node."],
         a_virt: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (It appears the terminal is beyond your access level.)']
               : SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}* It's a virtualasium.\n* Maybe one day you'll have the access level required."]
                  : ["<32>{#p/basic}* It's a virtualasium.\n* You don't have the access level required to use it."],
         metposter: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You look closely at the promotional poster.)']
               : SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}* It's a promotional poster for Mettaton's initial premiere.",
                     '<32>* A signed note has been scrawled out and replaced with a correction...',
                     '<32>* \"I\'m sorry I\'ve been such a burden to you.\"'
                  ]
                  : [
                     "<32>{#p/basic}* It's a promotional poster for Mettaton's initial premiere.",
                     "<32>* Though difficult to read, there's a signed note from Mettaton...",
                     '<32>* \"Thank you for making my dreams come true.\"'
                  ],
         bedbox: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You shrug at the sight of such an ordinary box.)']
               : world.darker
                  ? ['<32>{#p/basic}* An unremarkable box.']
                  : SAVE.data.n.plot === 72
                     ? [
                        "<32>{#p/basic}* To be honest, this isn't actually a non-euclidian housing unit.",
                        "<32>* It's a non-euclidian box-life mansion deluxe!"
                     ]
                     : [
                        '<32>{#p/basic}* This seemingly ordinary box is a state-of-the-art non- euclidian housing unit.',
                        "<33>* ... it's smaller on the outside."
                     ],
         a_lab_books1: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of various unrelated contents.)']
                  : [
                     "<32>{#p/basic}* It's a bookshelf.",
                     '<32>{#p/human}* (You pick out a book...)',
                     '<32>{#p/basic}* \"A monster\'s body is a reflection of its SOUL.\"',
                     '<32>* \"Normally, parents decide what kind of monsters their children will be...\"',
                     '<32>* \"Imprinting their will into the very essence of the child.\"',
                     '<32>* \"But what would happen if another being, like a human, absorbed a SOUL instead?\"',
                     '<32>* \"Legends speak of humans who absorbed the SOULs of dead boss monsters in the war...\"',
                     '<32>* \"In one particular account, a human was said to have taken the form of a plane.\"',
                     '<32>{#p/human}* (You put the book back on the shelf.)'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of various unrelated contents.)']
                  : [
                     "<32>{#p/basic}* It's a bookshelf.",
                     '<32>{#p/human}* (You pick out a book...)',
                     '<32>{#p/basic}* \"So you wanna design a robot, huh? Well, Fabulous Faraday\'s got you covered!\"',
                     '<32>* \"You see, here on Earth, we like to do things with a dash of flavor.\"',
                     '<32>* \"You can\'t just build a metal box and call it a day, you catch my drift?\"',
                     '<32>* \"You\'ve got to give it style, features dazzling and dynamic, like wheels and dials!\"',
                     '<32>* \"And, for maximum razz, do something creative with its mobility!\"',
                     '<32>* \"Like, I dunno, a unicycle?\"\n* \"Yeah, something like that.\"',
                     '<32>{#p/human}* (You put the book back on the shelf.)'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of various unrelated contents.)']
                  : [
                     "<32>{#p/basic}* It's a bookshelf.",
                     '<32>{#p/human}* (You pick out a book...)',
                     '<32>* \"Unfortunately, monsters do not deal with illness very well.\"',
                     '<32>* \"When a monsters\' death is imminent, they lie down, immobile.\"',
                     '<32>* \"We call this state \'Fallen Down.\'\"',
                     '<32>* \"During the war, this confusing situation was all too familiar...\"',
                     '<32>* \"Death, in those times, was sadly unavoidable.\"',
                     '<32>{#p/human}* (You put the book back on the shelf.)'
                  ]
         ),
         paperbook: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The book details a somewhat unrealistic story involving an intrepid adventurer.)']
               : [
                  '<32>{#p/human}* (You pick up the book...)',
                  '<32>{#p/basic}* \"MMSA: Dreams (Fanmade Story)\"',
                  '<32>* \"... and that\'s when Mew Mew finally saw it with her own two eyes.\"',
                  '<32>* \"It was quite a sight, standing alone in deep space, seemingly abandoned...\"',
                  '<32>* \"... but Mew Mew knew better!\"\n* \"And it wasn\'t long before she learned of our plight.\"',
                  '<32>* \"With a single blast of her infamous LAZER DELUXE, she punched through with ease!\"',
                  '<32>* \"And so it was that Mew Mew became monsterkind\'s savior.\"',
                  '<32>{#p/human}* (You put the book back on the table.)'
               ],
         a_lab_books2: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of a series of notes.)']
                  : [
                     "<32>{#p/basic}* It's a bookshelf.",
                     '<32>{#p/human}* (You pick out a book...)',
                     '<32>{#p/basic}* \"Professor\'s notes, page 76.\"',
                     '<32>* \"The CORE is now online, and outpost construction plans are already underway.\"',
                     '<32>* \"I\'m not sure how to feel about this development...\"',
                     '<32>* \"It will be nice to make our lives more comfortable out here, however...\"',
                     '<32>* \"By settling in like this, are we admitting that we can\'t escape without human SOULs?\"',
                     '<32>* \"Since I was appointed as the royal scientist, I\'ve set my mind on breaking us free.\"',
                     '<32>* \"Now, I fear the other monsters have acquiesced to waiting...\"',
                     '<32>{#p/human}* (You put the book back on the shelf.)'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of a series of notes.)']
                  : [
                     "<32>{#p/basic}* It's a bookshelf.",
                     '<32>{#p/human}* (You pick out a book...)',
                     '<32>{#p/basic}* \"Professor\'s notes, page 195.\"',
                     '<32>* \"It\'s a dark day for monsterkind, the royal family is in pieces.\"',
                     '<32>* \"Queen Toriel has abandoned the throne over a few rushed words from Asgore.\"',
                     '<32>* \"But those words may have long-lasting implications for us...\"',
                     '<32>* \"Now, everyone expects him to take the human SOULs by force.\"',
                     '<32>* \"This is a disaster.\"',
                     '<32>{#p/human}* (You put the book back on the shelf.)'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of a series of notes.)']
                  : [
                     "<32>{#p/basic}* It's a bookshelf.",
                     '<32>{#p/human}* (You pick out a book...)',
                     '<32>{#p/basic}* \"Professor\'s notes, page 310.\"',
                     '<32>* \"Well, he\'s agreed to the plan... of course, I was almost certain he would.\"',
                     '<32>* \"The timing is fortunate.\"\n* \"The first human since $(name) arrived on the outpost today.\"',
                     "<32>* \"We don't know if it'll be able to contain them yet, but we'll find out soon enough...\"",
                     '<32>* \"Fingerbones crossed.\"',
                     '<32>{#p/human}* (You put the book back on the shelf.)'
                  ]
         ),
         cream_machine: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You wonder what kind of ice cream this ice cream machine produces.)']
               : SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}* This overly complicated ice cream machine doesn't look like it'll get any more use."]
                  : ["<32>{#p/basic}* It's an overly complicated ice cream machine."],
         cream_bucket: () =>
            SAVE.data.b.svr
               ? [
                  "<32>{#p/human}* (You dip your hands into the bucket of ice cream.)\n* (It's rather cold.)",
                  ...[
                     [
                        "<25>{#p/asriel1}{#f/15}* Uh, just don't get any of that stuff on me.",
                        "<25>{#p/asriel1}{#f/15}* I'd have to shake myself like a dog to get it off."
                     ],
                     ['<25>{#p/asriel1}{#f/8}* ...', "<26>{#p/asriel1}{#f/31}* Don't you get any ideas."],
                     ['<25>{#p/asriel1}{#f/31}* ...']
                  ][Math.min(asrielinter.cream_bucket++, 2)]
               ]
               : ['<32>{#p/basic}* A bucket of ice cream.'],
         mewposter: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (Your eyes follow the poster as it's animated subject bobs up and down.)"]
               : SAVE.data.n.state_aerialis_basekill > 29
                  ? ['<32>{#p/basic}* A large poster for a niche sci-fi anime franchise.']
                  : SAVE.data.n.state_aerialis_basekill > 14
                     ? ['<32>{#p/basic}* A large poster for a sci-fi anime franchise.']
                     : ['<32>{#p/basic}* A large poster for a popular sci-fi anime franchise.'],
         dogfood: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (You stare anxiously at the bag of dog food.)',
                  ...[
                     ["<25>{#p/asriel1}{#f/24}* Frisk, I know what you're thinking.\n* It's not worth it."],
                     ["<25>{#p/asriel1}{#f/24}* It's going to taste awful, Frisk.\n* Just don't."],
                     [
                        '<25>{#p/asriel1}{#f/15}* Listen.',
                        "<25>* I'm telling you this because I'm your... friend.",
                        "<25>* ... that felt weird to say, but I guess I'm getting used to it."
                     ],
                     ['<25>{#p/asriel1}{#f/16}* You must not have anything better to do.']
                  ][Math.min(asrielinter.dogfood++, 3)]
               ]
               : SAVE.data.b.oops
                  ? ["<32>{#p/basic}* It's a half-empty bag of dog food."]
                  : ["<32>{#p/basic}* It's a bag of dog food.\n* It's half-full."],
         virtsign: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign depicts what appears to be a lizard in a virtual environment.)']
               : ["<32>{#p/basic}* It's a sign depicting someone in a virtualasium."],
         starlingtable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : ['<32>{#p/basic}* Starling flowers.'],
         starling: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* Starling flowers.']
                  : ['<32>{#p/basic}* A patch of Starling flowers.'],
         starling2: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* Starling flowers.']
                  : ['<32>{#p/basic}* A little trio of Starling flowers.'],
         starling3: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* Starling flowers.']
                  : ['<32>{#p/basic}* A densely-packed group of Starling flowers.'],
         starling5: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* Starling flowers.']
                  : ['<32>{#p/basic}* A Starling flower couple.\n* Cute...?'],
         dttubes: () =>
            SAVE.data.b.svr
               ? [["<25>{#p/asriel1}{#f/3}* This stuff?\n* Ha... don't remind me."], ['<25>{#p/asriel1}{#f/4}* ...']][
               Math.min(asrielinter.dttubes++, 1)
               ]
               : [
                  '<32>{#p/basic}* A set of test tubes with an unknown substance.',
                  ...(world.genocide
                     ? world.goatbro &&
                        (SAVE.flag.n.genocide_milestone < 5
                           ? SAVE.flag.n.ga_asrielLab3++
                           : SAVE.flag.n.genocide_milestone < 6
                              ? SAVE.flag.n.ga_asrielLab4++
                              : SAVE.flag.n.ga_asrielLab5++) < 1
                        ? SAVE.flag.n.genocide_milestone < 5
                           ? [
                              '<25>{#p/asriel2}{#f/10}* Funny, the syringe she used on me is missing...',
                              '<26>{#f/4}* Maybe she threw it away.'
                           ]
                           : SAVE.flag.n.genocide_milestone < 6
                              ? [
                                 '<25>{#p/asriel2}{#f/15}* The missing syringe...',
                                 '<25>{#f/10}* Is this why she was so strong against us?'
                              ]
                              : [
                                 '<25>{#p/asriel2}{#f/2}* She really thought this stuff would save her...',
                                 '<25>{#f/1}* What an IDIOT.'
                              ]
                        : []
                     : ['<32>{#p/basic}* There is also a used syringe with trace amounts of the same substance.'])
               ],
         papertable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The plans on the table describe some form of energy conversion process.)']
               : ["<32>{#p/basic}* It's a work table with some nondescript plans on it."],
         vender1: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You observe the mysterious contents behind the glass of the storage unit.)']
               : ['<32>{#p/basic}* A vacuum-sealed storage unit.\n* Inside are vials of various unknown substances.'],
         vender2: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You observe the mysterious contents behind the glass of the storage unit.)']
               : ['<32>{#p/basic}* A vacuum-sealed storage unit.\n* Inside are vials of various unknown substances.'],
         toolrack: () =>
            SAVE.data.b.svr
               ? [
                  [
                     '<25>{#p/asriel1}{#f/27}* As far as I know, those tools were never used at all.',
                     "<25>* In fact, I think they're just for decoration."
                  ],
                  [
                     "<25>{#p/asriel1}{#f/13}* Tools like these aren't necessary when you can just use magic.",
                     '<25>{#f/17}* Like, that mouse who works at the CORE?\n* Charles, I think?',
                     '<25>{#f/15}* That little mouse has the power of telekinesis.',
                     "<25>{#f/16}* Don't ask me how I know that."
                  ],
                  [
                     '<25>{#p/asriel1}{#f/13}* Uh, let me put it this way...',
                     '<25>{#f/16}* When I screwed around in the past, I learned to avoid that one.',
                     '<25>{#f/15}* That kind of power makes it difficult to... do anything.'
                  ],
                  ["<25>{#p/asriel1}{#f/16}* ... let's just leave it at that."]
               ][Math.min(asrielinter.toolrack++, 3)]
               : [
                  "<32>{#p/basic}* A rack of dusty old tools.\n* Doesn't look like they've been used in years.",
                  ...(SAVE.data.n.plot === 72 ? ['<33>* ... and now they never will be.'] : [])
               ],
         spycamera1: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* It's out of service."]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The display appears to be completely offline.)']
                  : SAVE.data.n.plot === 72 && !world.runaway
                     ? ['<32>{#p/basic}* Privacy at last.']
                     : [
                        '<32>{#p/basic}* This monitor is calibrated to follow your movement.',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielLab1++ < 1
                           ? ["<25>{#p/asriel2}{#f/5}* If only we could've seen Alphys's face as she watched us..."]
                           : [])
                     ],
         gameshow_terminal1: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the humorous console.)']
               : world.darker
                  ? ['<32>{#p/basic}* A game show console.']
                  : SAVE.data.b.a_state_moneyfish
                     ? ['<32>{#p/basic}* A game show console.\n* The first-hand witness to an awesome competition.']
                     : ['<32>{#p/basic}* A game show console.\n* The unfortunate first-hand witness to an awful pun.'],
         gameshow_terminal2: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the sympathetic console.)']
               : world.darker
                  ? ['<32>{#p/basic}* A game show console.']
                  : ['<32>{#p/basic}* A game show console.\n* This console seems specially- equipped for ghosts.'],
         gameshow_terminal3: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the familiar console.)']
               : world.darker
                  ? ['<32>{#p/basic}* A game show console.']
                  : ["<33>{#p/basic}* A game show console.\n* This one's tailor-made for you."],
         gameshow_terminal4: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the friendly console.)']
               : world.darker
                  ? ['<32>{#p/basic}* A game show console.']
                  : SAVE.data.n.state_foundry_muffet === 1
                     ? ['<32>{#p/basic}* A game show console.\n* Smells like... a substitution.']
                     : ['<32>{#p/basic}* A game show console.\n* Who needs arms with consoles like these?'],
         a_path2_sign: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign establishes a limit for the number of monsters a liftgate can hoist.)']
               : [
                  '<32>{#p/basic}* \"Please be aware that at most, a liftgate may only hoist two monsters at a time.\"',
                  ...(world.genocide && SAVE.flag.n.ga_asrielSkySign1++ < 1
                     ? ['<25>{#p/asriel2}{#f/1}* Works for us.']
                     : [])
               ],
         a_path4_sign: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign informs people of the closure of a collection agency.)']
               : SAVE.data.n.plot === 72
                  ? ['<#32>{#p/basic}* \"Sorry, but the collection agency is closed for good!\"\n  - Bratty and Catty']
                  : ['<#32>{#p/basic}* \"Leave your junk here, and we\'ll find a way to sell it!\"\n  - Bratty and Catty'],
         a_puzzle1_sign: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (The sign's contents seem to have been crossed out.)"]
               : SAVE.data.n.plot < 68
                  ? ['<32>{#p/basic}* \"Warning: Television filming may be in progress nearby.\"']
                  : ['<32>{#p/basic}* \"Update: Television filming on indefinite hiatus.\"'],
         labcounter: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You run your hands across the countertop.)\n* (It's pleasantly smooth.)"]
               : [
                  world.darker
                     ? "<32>{#p/basic}* It's just a countertop."
                     : SAVE.data.n.plot === 72
                        ? "<32>{#p/basic}* Ah, the humble countertop.\n* No better place to go after you've won the day!"
                        : "<32>{#p/basic}* Ah, the humble countertop.\n* No better place to practice your arts 'n' crafts!",
                  ...(mtt ? ["<32>{#p/mettaton}* THAT'S WHERE THE INGREDIENTS GO."] : [])
               ],
         chesstable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (It appears this game board is entirely empty.)']
               : world.darker
                  ? ["<32>{#p/basic}* It's a chess board."]
                  : SAVE.data.n.plot < 65 || SAVE.data.b.ubershortcut || world.genocide
                     ? ["<32>{#p/basic}* It's a chess board.\n* It's empty."]
                     : ["<32>{#p/basic}* It's a chess board.\n* It's black's turn, but there's no good moves to play..."],
         roomtable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The guidebook explains, in detail, the nature of multi- dimensional living.)']
               : [
                  "<32>{#p/basic}* It's a guidebook for multi- dimensional living.",
                  '<32>* You open it to the bookmarked page...',
                  '<32>* \"... which is to say your room exists at the same point in three-dimensional space...\"',
                  '<32>* \"... but on a different point along the fourth dimension.\"',
                  '<32>* \"This fourth-dimensional positioning is more commonly referred to as phasing.\"',
                  '<32>* \"Phasing is a complex process which involves re-saturating the negative field of the...\"',
                  '<33>* Thankfully, the page ends here.'
               ],
         flowertable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flower.)']
               : world.darker
                  ? ['<32>{#p/basic}* A Starling flower.']
                  : ['<32>{#p/basic}* Beware, the lone Starling flower.'],
         coredoor: ["<32>{#p/basic}* It's locked."],
         deadbot: ["<32>{#p/basic}* It's just a husk."],
         deadbot2: ["<32>{#p/basic}* He's all out of juice."],
         corenote1: [
            '<32>{#p/basic}* There\'s a recording on the ground labelled \"Toriel.\"',
            '<32>{#p/human}* (You play the recording...)',
            '<32>{#p/alphys}* Asgore has told me a lot about you.',
            '<32>* Your pies, your stories, even the way you made him laugh...',
            '<32>* And your loving care for the humans who come here.',
            '<32>* Despite your misconceptions about Asgore, you tried to be a positive light.',
            "<32>* Because of me, you'll never get to share that light again."
         ],
         corenote2: [
            '<32>{#p/basic}* There\'s a recording on the ground labelled \"Sans.\"',
            '<32>{#p/human}* (You play the recording...)',
            "<32>{#p/alphys}* I'll never forget those days where we worked together on projects...",
            '<32>* Or that time I helped you pull a prank on Papyrus...',
            '<32>* Or even the time we went garbage-hunting with Bratty and Catty.',
            '<32>* You might not have stuck around, but you always came back when it really mattered.',
            "<32>* Because of me, you'll never be able to come back."
         ],
         corenote3: [
            '<32>{#p/basic}* There\'s a recording on the ground labelled \"Papyrus.\"',
            '<32>{#p/human}* (You play the recording...)',
            "<32>{#p/alphys}* Our shared love of puzzles is something I'll always be fond of.",
            '<32>* When we were kids, you inspired me to do so many things...',
            '<32>* If not for you, I might not be a scientist at all.',
            "<32>* Though I couldn't bring myself to watch, I know you stayed true to yourself to the end.",
            "<32>* Because of me, you'll never be yourself again."
         ],
         corenote4: [
            '<32>{#p/basic}* There\'s a recording on the ground labelled \"Undyne.\"',
            '<32>{#p/human}* (You play the recording...)',
            '<32>{#p/alphys}* Undyne...\n* We were going to do so much together when we escaped...',
            '<32>* I can picture it now.\n* A cruise around the galaxy, with nobody to get in our way.',
            '<32>* Whenever I felt sad or lonely, you were always there to cheer me up.',
            "<32>* Even if you and I disagreed on some things, you didn't let it get in the way of friendship.",
            "<32>* Because of me, you'll never get to explore the galaxy."
         ],
         corenote5: [
            '<32>{#p/basic}* There\'s a recording on the ground labelled \"Mettaton.\"',
            '<32>{#p/human}* (You play the recording...)',
            "<32>{#p/alphys}* I know we got off to a rough start, but I wouldn't be the same person without you.",
            "<32>* If you're hearing this, Mettaton, I want you to know that you're beautiful.",
            "<32>* There's not another monster on the outpost I'd rather design a new body for.",
            "<32>* Well, maybe Napstablook.\n* But they're not really the fighting type.",
            '<32>* Good luck, Mettaton.'
         ],
         corenote6: () => [
            '<32>{#p/basic}* There\'s a recording on the ground labelled \"Asgore.\"',
            '<32>{#p/human}* (You play the recording...)',
            "<32>{#p/alphys}* I know I haven't always been the best at my job, but...",
            '<32>* You always made me feel like I was contributing something.',
            '<32>* And, even though those experiments were risky...',
            '<32>* I had the support of the whole outpost to find us a faster way out of here.',
            "<32>* Well, boss... we did it.\n* You won't have to live another day on this stupid outpost.",
            '<32>* I should have known something would go wrong...',
            '<32>* I should have noticed the dust on that Starling flower...',
            '<32>* I should have contained it while I had the chance...',
            "<32>* But I didn't.",
            '<32>* Because of me, and my hubris, that child has carved a path of destruction.',
            "<32>* I've lost so many people that I care about already...",
            '<32>* Seeing them die from the comfort of my own lab, while I do nothing to stop it.',
            "<32>* Mettaton's going to give it his all, but if he fails...",
            "<32>* ... you're next.",
            "<32>* I don't know what I'd do if I had to watch another one of my friends die.",
            "<32>* I don't know how I'd feel if I knew I could have done something to save you.",
            "<32>* I do know you're not going to fight back, and I do know they're not going to care.",
            "<32>* If I don't do something before it's too late...",
            '<32>* ...',
            '<32>{#p/human}* (You hear Alphys drop the recorder and run into the elevator.)',
            ...(SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.n.ga_asrielCorenote++ < 1
                  ? [
                     '<25>{#p/asriel2}{#f/3}* Alphys running away as always, I take it.',
                     '<25>{#p/asriel2}{#f/4}* A pity.'
                  ]
                  : []
               : SAVE.flag.n.ga_asrielAlphysCom4++ < 1
                  ? ['<25>{#p/asriel2}{#f/8}* If only I knew what she was doing the first time around...']
                  : [])
         ],
         coresign1: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (The sign prohibits any unauthorized presence in the area.)',
                  '<25>{#p/asriel1}{#f/4}* For obvious reasons, you can ignore this warning.'
               ]
               : ['<32>{#p/basic}* \"Any unauthorized presence in this area is strictly prohibited.\"'],
         coresign2: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (The sign describes the longest- sustained accident- free period of time here.)',
                  "<25>{#p/asriel1}{#f/3}* If not for that one builder bot incident, it'd be flawless..."
               ]
               : ['<32>{#p/basic}* \"Longest streak without an accident: 38690 days.\"'],
         coresign3: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (The sign congratulates the current worker of the year.)',
                  ...[
                     ['<25>{#p/asriel1}{#f/17}* That little guy has the biggest heart...'],
                     [
                        '<25>{#p/asriel1}{#f/17}* Back when I was trying to be nice to everyone...',
                        '<25>{#f/17}* I asked it to come along with me, and it just did.',
                        '<25>{#f/20}* No questions asked.',
                        "<25>{#f/18}* I couldn't believe it!"
                     ],
                     [
                        "<25>{#p/asriel1}{#f/13}* Despite all I've done, people like Charles have something I...",
                        '<25>{#f/15}* Something I could never get back on my own.',
                        '<25>{#f/23}* ... a pure and true form of happiness.',
                        '<25>{#f/22}* But maybe with you...'
                     ],
                     ['<25>{#p/asriel1}{#f/13}* I really hope this works out, Frisk.']
                  ][Math.min(asrielinter.coresign3++, 3)]
               ]
               : [
                  '<32>{#p/basic}* \"Worker of the year: Charles\"\n* \"Thank you for your continued effort and dedication.\"'
               ],
         coresign4: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (The plaque dedicates itself to a certain individual.)',
                  ...[
                     [
                        '<25>{#p/asriel1}{#f/13}* You might find this surprising, but...',
                        '<26>{#f/27}* I never really knew him.',
                        '<25>{#f/4}* He died before Alphys brought me back, so...',
                        '<25>{#f/3}* My only memories of him are from when I was born.'
                     ],
                     [
                        '<25>{#p/asriel1}{#f/13}* Yeah... monsters may have infinite space for memories...',
                        "<25>{#f/17}* But we can't remember something if it never happened.",
                        '<25>{#f/20}* Kind of hard to get around THAT limitation.'
                     ],
                     [
                        '<25>{#p/asriel1}{#f/17}* I did hear he nearly perfected wormhole travel...',
                        '<25>{#f/13}* Maybe, if that technology could be compacted down...',
                        "<25>{#f/15}* ... implanted in monsters' minds...",
                        '<25>{#f/16}* ... you could pull memories from other places.'
                     ],
                     ['<25>{#p/asriel1}{#f/20}* I must be crazy.']
                  ][Math.min(asrielinter.coresign4++, 3)]
               ]
               : ['<32>{#p/basic}* \"This plaque is dedicated to Professor T. N. Roman.\"\n* \"May your legacy live on.\"'],
         coresign5: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign lists off what lies in each direction.)']
               : ['<32>{#p/basic}* \"Left - Stage Four\"\n* \"Right - Elevator\"'],
         pottedtable: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You get the sense you've seen this table somewhere else before.)"]
               : SAVE.data.n.plot === 72 && !world.runaway
                  ? ["<32>{#p/basic}* A familiar-looking table.\n* Don't you recognize where this table is from?"]
                  : ['<32>{#p/basic}* A familiar-looking table.'],
         potchair: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You get the sense you've seen this chair somewhere else before.)"]
               : SAVE.data.n.plot === 72 && !world.runaway
                  ? ['<32>{#p/basic}* A familiar-looking chair.\n* They really know how to vary up the design.']
                  : ['<32>{#p/basic}* A familiar-looking chair.'],
         cardboard1: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the box...)"]
               : [
                  "<32>{#p/basic}* It's a bunch of mostly-empty cardboard boxes.",
                  '<32>{#p/basic}* This dull box has a few test tubes lying at the bottom.'
               ],
         cardboard2: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the box...)"]
               : [
                  "<32>{#p/basic}* It's a bunch of mostly-empty cardboard boxes.",
                  '<32>{#p/basic}* This tall box reeks of exotic chemicals.'
               ],
         cardboard3: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the box...)"]
               : [
                  "<32>{#p/basic}* It's a bunch of mostly-empty cardboard boxes.",
                  '<32>{#p/basic}* This small box contains papers all written in an odd font.'
               ],
         labchem: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (This setup strikes you as rather dangerous.)']
               : [
                  world.darker
                     ? '<32>{#p/basic}* Chemicals on conveyor belts.'
                     : SAVE.data.n.plot === 72
                        ? "<32>{#p/basic}* Chemicals on conveyor belts.\n* Somehow, nothing's ever gone wrong with this."
                        : '<32>{#p/basic}* Chemicals on conveyor belts.\n* What could possibly go wrong?',
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* NOTHING LIKE THE CALMING WHIR OF AN MTT-TRIPLE-A-SAFE-RATED CONVEYOR BELT!',
                        '<32>* NOT ONLY DOES IT SAVE YOU FROM HAVING TO REACH AN EXTRA TWO MICRONS TO GRAB THINGS...',
                        '<32>* BUT WHEN FLASKS FALL OFF THE SIDE AND VIOLENTLY BREAK OPEN...',
                        '<32>* YOU GET A SURPRISE CHEMICAL REACTION, FREE OF CHARGE!'
                     ]
                     : [])
               ],
         labglobe: (mtt: boolean) =>
            SAVE.data.b.svr
               ? [
                  [
                     '<25>{#p/asriel1}{#f/13}* This is Krios...\n* A simple representation of it, anyway.',
                     "<25>{#f/17}* I hear it's more colorful than it looks from outer space."
                  ],
                  [
                     '<25>{#p/asriel1}{#f/13}* So, one time, out of desperate curiosity...',
                     '<25>{#f/17}* I managed to organize the construction of a new outpost section.',
                     '<26>{#f/20}* And when I say organize, it was more like...\n* I kinda forced them to.',
                     '<25>{#f/13}* It was... a re-creation of a part of the homeworld.'
                  ],
                  [
                     "<25>{#p/asriel1}{#f/13}* The re-creation wasn't perfect...",
                     '<25>{#f/15}* Probably because nobody really wanted to build it...',
                     '<25>{#f/17}* But I understood why that old world is so highly spoken of.',
                     "<25>{#f/23}* It was... beautiful.\n* I'd never seen anything like it."
                  ],
                  ["<25>{#p/asriel1}{#f/17}* I'll always remember the re-creation of the sky..."]
               ][Math.min(asrielinter.labglobe++, 3)]
               : [
                  world.darker
                     ? "<32>{#p/basic}* It's a globe."
                     : SAVE.data.n.plot === 72
                        ? "<32>{#p/basic}* It's a globe of monsterkind's... former homeworld."
                        : "<32>{#p/basic}* It's a globe of monsterkind's great homeworld.",
                  ...(mtt
                     ? [
                        "<32>{#p/mettaton}* IT WOULDN'T BE A SCIENCE LAB WITHOUT THE OBLIGATORY GLOBE.",
                        "<32>* UNLIKE MOST OF WHAT'S HERE, IT'S NOT AN MTT-BRAND ITEM.",
                        '<32>* STILL, SINCE ALPHYS MADE IT FOR ME, AND MADE -ME- MYSELF...',
                        "<32>* THERE'S NO REASON TO DOUBT ITS QUALITY FOR A SECOND!"
                     ]
                     : [])
               ],
         labrando: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You interact with the device, but it does nothing of use.)']
               : [
                  world.darker
                     ? '<33>{#p/basic}* A device with no clear purpose.'
                     : SAVE.data.n.plot === 72
                        ? '<32>{#p/basic}* Disappointingly, the passage of time has not given this device a greater purpose.'
                        : '<32>{#p/basic}* The purpose of this device is explicitly unclear.',
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* AH YES, THE EVER-HANDY MTT-BRAND NEUTRON FLOW POLARIZER.',
                        '<32>* A DEVICE SO USEFUL, IT GETS ACCESSED AT LEAST TEN TIMES...',
                        '<32>* PER YEAR!!!'
                     ]
                     : [])
               ],
         labsink: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You run the nigh-invisible water over your hands.)']
               : [
                  "<32>{#p/basic}* It's a sink with a replicator- powered water supply.",
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* THE MORE COMPLEX THE MATERIAL, THE MORE POWER IT TAKES TO REPLICATE.',
                        '<32>* THE CORE ONLY PROVIDES SO MUCH POWER, AFTER ALL.',
                        '<32>* THANKFULLY, WATER IS ONE OF THE SIMPLEST SUBSTANCES AROUND!'
                     ]
                     : [])
               ],
         labscope: (mtt: boolean) =>
            SAVE.data.b.svr
               ? [
                  "<32>{#p/human}* (You point the microscope at Asriel's face...)",
                  '<32>* (Through the lens, you witness a dazzling array of bright, glowing particles.)',
                  ...[
                     ['<25>{#p/asriel1}{#f/17}* Monsters are only made of magic, Frisk.\n* You know that, right?'],
                     ['<25>{#p/asriel1}{#f/13}* You can probably stop doing that now.'],
                     ['<25>{#p/asriel1}{#f/15}* ...']
                  ][Math.min(asrielinter.labscope++, 2)]
               ]
               : [
                  '<32>{#p/basic}* A standard-issue CITADEL high- precision electron microscope, circa 261X.',
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* THESE ADVANCED MICROSCOPES WERE ONLY RELEASED A FEW YEARS AGO.',
                        '<32>* JUST ANOTHER EXAMPLE OF HOW MTT-BRAND PRODUCTS NEVER FAIL TO STAY UP TO DATE!'
                     ]
                     : [])
               ]
      },
      puzzle: {
         puzzlestop1a: pager.create(
            0,
            () =>
               SAVE.data.n.state_foundry_undyne !== 1
                  ? [
                     '<32>{#s/phone}{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysShocked}* Woah, stop!!',
                     "<25>{#g/alphysOhGodNo}* You're g-going to fall out of the normal plane...",
                     '<25>{#g/alphysSideSad}* I should p-probably pull you back.',
                     '<25>{#g/alphysThatSucks}* Sorry...',
                     '<32>{#s/equip}{#p/event}* Click...'
                  ]
                  : [
                     '<32>{#s/phone}{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysShocked}* Woah, stop!!',
                     "<25>{#g/alphysOhGodNo}* You c-c-can't... g-go that far out...",
                     "<26>{#g/alphysNeutralSweat}* I'd pull you back, but I'm... not at my desk.",
                     "<26>{#f/10}* S-so don't be stupid!",
                     '<32>{#s/equip}{#p/event}* Click...'
                  ],
            () =>
               SAVE.data.n.state_foundry_undyne !== 1
                  ? [
                     '<32>{#s/phone}{#p/event}* Ring, ring...',
                     "<25>{#p/alphys}{#g/alphysSideSad}* It's not safe to go that far...",
                     "<25>{#g/alphysNeutralSweat}* I'm gonna pull you back now.",
                     '<32>{#s/equip}{#p/event}* Click...'
                  ]
                  : [
                     '<32>{#s/phone}{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysShocked}* W-what are you doing!?',
                     "<26>{#f/3}* You're almost at the edge!",
                     '<32>{#s/equip}{#p/event}* Click...'
                  ],
            () =>
               SAVE.data.n.state_foundry_undyne !== 1
                  ? [
                     '<32>{#s/phone}{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysWTF}* ...',
                     '<32>{#s/equip}{#p/event}* Click...'
                  ]
                  : [
                     '<32>{#s/phone}{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysIDK2}* ...',
                     "<25>{#p/alphys}{#g/alphysIDK3}* I guess... there's nothing I can say to stop you.",
                     '<32>{#s/equip}{#p/event}* Click...'
                  ]
         ),
         puzzlestop1b: () =>
            [
               ['<25>{#p/asriel2}{#f/13}* Uh, $(name)...?', "<25>* I think we've gone a little too far."],
               ['<25>{#p/asriel2}{#f/13}* $(name)...?'],
               ['<25>{#p/asriel2}{#f/13}* ...']
            ][Math.min(SAVE.flag.n.ga_asrielPuzzleStop1++, 2)]
      },
      npc: {
         picnic_mushketeer: pager.create(
            0,
            () =>
               SAVE.data.b.bullied_mushketeer
                  ? [
                     "<32>{#p/basic}{#npc/a}* Oh...\n* It's you...",
                     "<32>* Well, did you really think I'd be beaten so easily!?",
                     '<32>* Because...\n* You were right.',
                     "<32>* I'm not fit to be a soldier anymore..."
                  ]
                  : [
                     "<32>{#p/basic}{#npc/a}* At ease, soldier!\n* You've done enough here!",
                     "<32>* ... well, if it isn't the brash human that dared to disarm me of my weapon.",
                     "<32>* You're an interesting one!\n* That's definitely not how I planned to end that conflict!",
                     '<32>* But, somehow, you always seem to find a way to make things work in your favor.'
                  ],
            () =>
               SAVE.data.b.bullied_mushketeer
                  ? ['<32>{#p/basic}{#npc/a}* Future soldiers would be wise... to stay away from you.']
                  : [
                     '<32>{#p/basic}{#npc/a}* Future soldiers would be wise to observe your tactics!',
                     "<32>* But for now...\n* It's off to the new homeworld with you, soldier!"
                  ],
            () =>
               SAVE.data.b.bullied_mushketeer
                  ? ['<32>{#p/basic}{#npc/a}* ...']
                  : ['<32>{#p/basic}{#npc/a}* You may be on your way now.']
         ),
         a_dresslion: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* Mettaton said I could use the company funds to make a dress of my own...',
                     "<32>* I've never been so...!\n* Ha ha ha!"
                  ]
                  : SAVE.data.n.plot < 60
                     ? [
                        "<32>{#p/basic}{#npc/a}* As Mettaton's costume designer, it's my job to get him the right outfit.",
                        '<32>* He needed a suit and tie today, and a dress for another upcoming show...',
                        '<32>* For some reason...\n* The idea of him in a dress...',
                        '<32>* Seems really cool...'
                     ]
                     : SAVE.data.n.plot < 65
                        ? [
                           "<32>{#p/basic}{#npc/a}* It's about to start!\n* Any time now, the new costume will be on full display!",
                           "<32>* I can't wait..."
                        ]
                        : SAVE.data.n.plot < 68
                           ? [
                              '<32>{#p/basic}{#npc/a}* That...\n* Was so beautiful...!',
                              "<32>* Makes me wonder if I'd also look pretty...\n* In a dress..."
                           ]
                           : [
                              '<32>{#p/basic}{#npc/a}* Oh... my goodness...',
                              '<32>* For a minute there, I thought Mettaton was going to die!',
                              "<32>* I don't know what I'd do with myself then..."
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<33>{#p/basic}{#npc/a}* I should make one for you, too!']
                  : SAVE.data.n.plot < 60
                     ? [
                        "<32>{#p/basic}{#npc/a}* I'm thinking of something bright and golden.\n* It'll really make him shine."
                     ]
                     : SAVE.data.n.plot < 65
                        ? ["<32>{#p/basic}{#npc/a}* It's as shiny and bright as I could have hoped for!"]
                        : SAVE.data.n.plot < 68
                           ? [
                              "<32>{#p/basic}{#npc/a}* I'll have to ask him for the funding, though, and good luck getting that."
                           ]
                           : ['<32>{#p/basic}{#npc/a}* I might disappear off the face of the outpost!']
         ),
         picnic_darkman1: pager.create(
            0,
            [
               "<32>{#p/basic}{#npc/a}* Cha.\n* We're the shadow-people.\n* We serve our summoners.",
               '<32>* Terrestria first summoned me back in the human-monster war... good times, yo.',
               "<32>* But that battle's over now.\n* And so's yours."
            ],
            [
               '<32>{#p/basic}{#npc/a}* I recall all the battles fought by my summoner.',
               "<32>* Let me tell you about one of my favorites, ya see.\n* So we're on some coast.",
               "<32>* The terran military thought it'd be a good idea to set spy drones below sea level, right?",
               '<32>* But we knew they were there.\n* So I got summoned, did some recon, came back and told all.',
               "<32>* Next thing you know, we're stormin' in, and we take 'em all out real good.",
               "<32>* Wasn't much in the grand scheme, but it sure felt great."
            ],
            [
               "<32>{#p/basic}{#npc/a}* Ha, from what my summoner tells me, I'm sure you've got a few stories to tell, too."
            ]
         ),
         picnic_darkman2: pager.create(
            0,
            [
               '<32>{#p/basic}{#npc/a}* Sooooo...\n* The thing about us is...',
               "<32>* We're not really here.\n* I mean, we are.\n* But not really.",
               "<32>* It's hard to explain."
            ],
            [
               '<32>{#p/basic}{#npc/a}* My summoner, Cozmo, once put it like this...',
               "<32>* We're like a part of their personality that can move outside their body.",
               "<32>* Aaaaand... we come out whenever we've got something to do.",
               "<32>* I came out because I thought it'd be cool to see the outpost before we go.",
               "<32>* When you're in the heat of action, you uhhhhh... can't really take anything in."
            ],
            [
               "<32>{#p/basic}{#npc/a}* We don't usually get to relax when we're in the physical realm, sooooo... this is nice."
            ]
         ),
         eblocker: pager.create(
            0,
            [
               "<32>{#p/basic}{#npc/a}* Ever since I quit Glyde's business, I've been realizing how terrible it was ;(",
               "<32>{#p/basic}{#npc/a}* Sorry if I sold you anything for too high a price ;(\n* That's on me ;(",
               "<32>{#p/basic}{#npc/a}* Now, if you'll excuse me, I'd like to flex in solitude ;(",
               "<32>{#p/basic}{#npc/a}* I'll be done soon, okay? ;("
            ],
            ['<32>{#p/basic}{#npc/a}* Sorry, lassy ;(\n* I need some time to myself right now ;(']
         ),
         a_bowtie: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* I'm an art student.\n* But I'm thinking of quitting.",
                     '<32>* The constant praise, all of which may be undeserved...',
                     '<32>* In what way would this ever help me improve?'
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* I'm an art student.\n* I've struggled for inspiration for a long time.",
                        '<32>* Only now, after a recent tragedy, have I been feeling quite motivated indeed.',
                        '<32>* Is it right to be inspired by such misfortune?'
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* I'm an art student.\n* In art, it's said that you only improve with time.",
                        '<32>* However, my art teacher thinks everything I do is amazing.',
                        '<32>* Should I be concerned?'
                     ],
            () =>
               SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}{#npc/a}* As a slime, I'm still not sure how to feel about this."]
                  : ["<32>{#p/basic}{#npc/a}* As a slime, I'm not sure how to feel about this."]
         ),
         a_thisisnotabomb: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        '<32>{#p/basic}{#npc/a}* Are you ready for my \"explosive\" return???',
                        '<32>* You kinda scared everyone off, but some of us came back after what you did later.',
                        "<32>* Can't say I blame the ones who didn't, but hey...",
                        "<32>* I figured I'd give your choice to do the right thing some impact."
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* It was bad enough not knowing what kinda species I was on the old homeworld...',
                        "<32>* And now, on the new one, there'll be a whole load of new species I don't know.",
                        "<32>* I might just have to live with the fact that I'll be a bomb... forever...",
                        '<32>* Talk about emotional fallout.'
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/basic}{#npc/a}* Wow.\n* Talk about explosive.',
                        '<32>* That grand finale really had us all shaken!',
                        '<32>* Literally.\n* It shook this entire area of the outpost.'
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* Well this place sure is the bomb, huh???',
                        "<32>* Psst, listen up kid...\n* I'll let you in on a secret.",
                        "<32>* I'm... not really a bomb.",
                        "<32>* Hey, don't be shell-shocked.\n* It's just that people call me a bomb so much...",
                        "<32>* ... that I've just accepted it at this point."
                     ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        '<32>{#p/basic}{#npc/a}* I mean, come on, why does everyone have to live on such a short fuse?',
                        '<32>* If a little bullying is all it takes to set you off, then you might as well explode!',
                        "<32>* But that's just me."
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* I mean, at this point, if I WERE to find out what kinda plant I really am...',
                        '<32>* ... the realization of such a long-withheld fact would be...',
                        '<32>* ... explosive.'
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* Maybe, if I was actually a bomb, I'd be envious of it.",
                        "<32>* But I'm not, so... I'm not.",
                        "<32>* I'm mostly just pissed off about it, really."
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* Turns out I'm supposed to look like a rare homeworld plant.",
                        '<32>* That old-timer who came by to talk to Burgie last week said it in passing, I think.',
                        "<32>* ... oh, what I'd give to understand what I really am..."
                     ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? ["<32>{#p/basic}{#npc/a}* ... still don't blame 'em, though."]
                     : ["<32>{#p/basic}{#npc/a}* ... it's better to stick to what you know."]
                  : SAVE.data.b.killed_mettaton
                     ? ["<32>{#p/basic}{#npc/a}* ... you're lucky I don't explode on you right now."]
                     : ["<32>{#p/basic}{#npc/a}* ... don't you ever wonder what you really are?"]
         ),
         a_blackfire: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* So we're free now, huh?\n* What crazy times we must be living in.",
                     "<32>* Without my job at the Royal Lab, I'll have to find work elsewhere...",
                     '<32>* ... or, we could just establish a new Royal Lab on the homeworld.'
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/basic}{#npc/a}* Normally, I do astronomical research at the Royal Lab.',
                        '<32>* I was planning on returning to work after today...',
                        "<32>* But, after what happened to Mettaton, I'm not so sure."
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* Normally, I do astronomical research at the Royal Lab.',
                        '<32>* Earlier, though, Alphys told us we can take the day off.',
                        '<32>* I wonder why...'
                     ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* Imagine how much better it'll be to stargaze with solid ground to roast on."
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/basic}{#npc/a}* Maybe, somewhere out there, his heart still lives on in those constellations...'
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* Being an astronomer can be fun, but it never hurts to stargaze with your own eyes.'
                     ]
         ),
         a_businessdude: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [
                        '<32>{#p/basic}{#npc/a}* Yeah, sometimes I wonder how a person like ya can exist.',
                        "<32>* Ya saved us in the end, but what's it worth if we're all scared to leave our homes?",
                        "<32>* I'm not judgin' ya or anything, but ya DO see the irony in that, right?"
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* Our virtualasium project never got off the ground, but maybe...',
                        "<32>* ... that's just a sign of things to come?",
                        "<32>* After all, on a new homeworld, it won't have to leave the ground."
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/basic}{#npc/a}* What a tragedy, huh?',
                        "<32>* ... it's a good thing most people don't know what ya look like up close."
                     ]
                     : roomKills().a_elevator1 > 0
                        ? ["<32>{#p/basic}{#npc/a}* Ya heard me.\n* Quit while ya're ahead."]
                        : SAVE.data.n.plot < 58
                           ? iFancyYourVilliany()
                              ? [
                                 '<32>{#p/basic}{#npc/a}* So, ya go by \"$(moniker2)\" now, huh kid?',
                                 "<32>* ... that's pretty cool."
                              ]
                              : [
                                 [
                                    '<32>{#p/basic}{#npc/a}* Boy, ya really missed the mark on that one, huh kid?',
                                    "<32>* ... that's a cryin' shame."
                                 ],
                                 [
                                    '<32>{#p/basic}{#npc/a}* Kid, I got one question for ya, and one question only.',
                                    '<32>* ... were ya even trying?'
                                 ],
                                 [
                                    "<32>{#p/basic}{#npc/a}* Hey, don't feel bad.\n* Ya gave it ya best shot.",
                                    "<32>* ... still sucks that ya didn't make it to the end, though."
                                 ],
                                 [
                                    "<32>{#p/basic}{#npc/a}* Gee, talk about cuttin' it close, huh kid?",
                                    "<32>* That's an ending for the ages!"
                                 ],
                                 [
                                    '<32>{#p/basic}{#npc/a}* Ya did pretty well for someone with no real practice.',
                                    "<32>* ... beginner's luck, perhaps?"
                                 ]
                              ][SAVE.data.n.state_aerialis_crafterresult]
                           : [
                              "<32>{#p/basic}{#npc/a}* Workin' at the lab is a treat, I tell ya.",
                              '<32>* Have ya ever been inside the virtualasium?',
                              "<32>* Wonderful place.\n* Though they say ya shouldn't go out of bounds."
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? ["<32>{#p/basic}{#npc/a}* Why don't ya go find someone else to bully, eh?"]
                     : [
                        '<32>{#p/basic}{#npc/a}* I only hope we can expand our userbase past that one eccentric skeleton fellow.'
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? ["<32>{#p/basic}{#npc/a}* If they did, ya'd be in some deep doo-doo by now."]
                     : roomKills().a_elevator1 > 0
                        ? ["<32>{#p/basic}{#npc/a}* Or don't.\n* Just don't make me say I told ya so, ya got me?"]
                        : SAVE.data.n.plot < 58
                           ? iFancyYourVilliany()
                              ? ["<32>{#p/basic}{#npc/a}* It's not like I had a moniker at ya age or anything."]
                              : [
                                 ["<32>{#p/basic}{#npc/a}* It's a wonder ya even made it here at all."],
                                 ["<32>{#p/basic}{#npc/a}* Kinda seems like ya weren't."],
                                 ['<32>{#p/basic}{#npc/a}* Ya might get another chance on the next episode.'],
                                 ['<32>{#p/basic}{#npc/a}* Maybe next time ya could, I dunno, win more comfortably?'],
                                 ['<32>{#p/basic}{#npc/a}* Or maybe MTT just went a little easy on ya.']
                              ][SAVE.data.n.state_aerialis_crafterresult]
                           : [
                              '<32>{#p/basic}{#npc/a}* Yeah, ya heard that right.\n* Out of bounds.',
                              '<32>* Now what the heck is that supposed to mean?'
                           ]
         ),
         a_greenfire: pager.create(
            0,
            () =>
               SAVE.data.n.plot < 56
                  ? [
                     "<32>{#p/basic}* Don't worry about me, school went well today.",
                     "<32>* I'm just really looking forward to MTT's next show!",
                     "<32>{#p/basic}* Do you know when it'll be on?"
                  ]
                  : SAVE.data.n.plot < 68
                     ? [
                        '<32>{#p/basic}* That show was amazing!\n* The human almost looked real this time!',
                        '<32>* Wait, have I seen you before?'
                     ]
                     : world.bad_robot
                        ? ["<32>{#p/basic}* Ack, what a letdown.\n* To think he'd cancel his big show just like that..."]
                        : SAVE.data.b.killed_mettaton
                           ? [
                              '<32>{#p/basic}* Did you... do that?\n* Did you kill Mettaton for real?',
                              "<32>{#p/basic}* No... it has to be fake.\n* Mettaton's just too popular to die!"
                           ]
                           : [
                              '<32>{#p/basic}* So the human WAS real...\n* Wow, Mettaton must be REALLY good at networking!',
                              '<32>{#p/basic}* Your performance was great, by the way.'
                           ],
            () =>
               SAVE.data.n.plot < 56
                  ? ['<32>{#p/basic}* Mettaton usually has a schedule, but he forgot to make one this time.']
                  : SAVE.data.n.plot < 68
                     ? ['<32>{#p/basic}* I swear you look like the actor Mettaton brought on...']
                     : world.bad_robot
                        ? ['<32>{#p/basic}* Oh well, maybe next time.']
                        : SAVE.data.b.killed_mettaton
                           ? ["<32>{#p/basic}* I can't believe I almost fell for it!"]
                           : ["<32>{#p/basic}* I can't believe I didn't notice you were a human before!"]
         ),
         a_harpy: pager.create(
            0,
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                     "<32>{#p/basic}* I'm a reporter!\n* Today's news story is one I really don't want to report!",
                     "<32>{#p/basic}* I'm gonna lose my marbles!!\n* Huhehehaw!"
                  ]
                  : roomKills().a_sans > 0
                     ? [
                        "<32>{#p/basic}* I'm a reporter!\n* Today's news story is about death 'n' destruction!",
                        "<32>{#p/basic}* Did ya know someone's been killed right in front of me??\n* Huhehehaw!"
                     ]
                     : !world.badder_lizard
                        ? [
                           "<32>{#p/basic}* I'm a reporter!\n* Today's news story is about metal 'n' magic!",
                           "<32>{#p/basic}* Did ya know Mettaton's actually made of it??\n* Huhehehaw!"
                        ]
                        : [
                           "<32>{#p/basic}* I'm a reporter!\n* Today's news story is about death 'n' destruction!",
                           "<32>{#p/basic}* Did ya know I'm likely goin'a die in a few short hours??\n* Huhehehaw!"
                        ],
            ['<32>{#p/basic}* Oh dear!\n* I really do love my job!']
         ),
         a_madguy: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        "<32>{#p/basic}{#npc/a}* Who, me?\n* Someone who'd evacuate?",
                        '<32>* Never.\n* I only went with them because they said I had to.',
                        '<32>* I get that you were some kinda bully or something...',
                        "<32>* ... but it's not as if you were going to kill me."
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* Everyone else around here's been invited to that hangout.",
                        "<32>* But me?\n* I'm not even interested.",
                        "<32>* Sure, I'm glad you went and saved us and all...",
                        "<32>* ... but that doesn't mean I have to stand around and indulge in the Madrigal plant."
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/basic}{#npc/a}* Poor, poor Mettaton, whatever will you do.',
                        '<32>* ...',
                        "<32>* Oh, that's right.\n* Nothing."
                     ]
                     : world.bad_robot && 68 <= SAVE.data.n.plot
                        ? [
                           '<32>{#p/basic}{#npc/a}* For once, Mettaton did the right thing, and cancelled a show.',
                           "<32>* That grand finale wouldn't have ended well for him.",
                           '<32>* Why?\n* Just a feeling.'
                        ]
                        : SAVE.data.n.bad_lizard < 2
                           ? [
                              '<32>{#p/basic}{#npc/a}* I was one of the builders of the ORIGINAL fountain here.',
                              "<32>* Y'know.\n* Before Mettaton decided to rebuild the whole thing.",
                              "<32>* Like, who does that? Who'd rebuild it all just to change a single, tiny detail?",
                              '<32>* Kind of petty if you ask me.'
                           ]
                           : [
                              "<32>{#p/basic}{#npc/a}* I can't BELIEVE Mettaton's running his TV shows when there's a killer on the loose.",
                              '<32>* Does he not see how dangerous that could be?',
                              "<32>* Someone's going to end up getting killed doing that nonsense.",
                              '<32>* Kind of idiotic if you ask me.'
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        '<32>{#p/basic}{#npc/a}* Like, really, people?',
                        "<32>* Did you seriously think I'd want to run away like that?",
                        "<32>* Come on.\n* I'm not THAT soft.",
                        '<32>* ... ugh, never mind.'
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* Mind you.\n* I've never been one for parties.",
                        '<32>* My main hobbies and interests consist primarily...',
                        '<32>* ... of pointing out and picking apart poor imitations.',
                        '<32>* Like this fountain.'
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* As far as I'm concerned, this is all his fault.",
                        '<32>* He got too over-confident, and he paid the price.',
                        "<32>* Too bad, so sad, be glad I'm not your dad."
                     ]
                     : world.bad_robot && 68 <= SAVE.data.n.plot
                        ? [
                           '<32>{#p/basic}{#npc/a}* The more he stays out of our lives, the better.',
                           "<32>* I'd ask him never to show up again, but...",
                           "<32>* ... then I wouldn't have anything to be upset about."
                        ]
                        : SAVE.data.n.bad_lizard < 2
                           ? [
                              "<32>{#p/basic}{#npc/a}* Mind you.\n* I'm not the only one.",
                              '<32>* Ever heard of a \"Mr. Sepluv?\"',
                              '<32>* Yeah, he was in charge of the original build project here.',
                              '<32>* But now... he sells moon rocks for a living.'
                           ]
                           : [
                              "<32>{#p/basic}{#npc/a}* Mind you.\n* I'm standing out here, too.",
                              "<32>* So I guess I'm just as guilty."
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? ["<32>{#p/basic}{#npc/a}* Embarrassing, isn't it?"]
                     : ["<32>{#p/basic}{#npc/a}* Pointless, isn't it?"]
                  : ["<32>{#p/basic}{#npc/a}* Ironic, isn't it?"]
         ),
         a_proskater: pager.create(
            0,
            () =>
               SAVE.data.n.plot < 60
                  ? [
                     "<32>{#p/basic}{#npc/a}* Finally got outta school, I don't know why I still go there anymore...",
                     "<32>* Luckily, I hear Mettaton's got something exciting planned for his next show.",
                     "<32>* I can't wait, brah..."
                  ]
                  : SAVE.data.n.plot < 68
                     ? [
                        '<32>{#p/basic}{#npc/a}* Brah... that was crazy.',
                        '<32>* And... kinda weird?',
                        '<32>* I mean, some of that stuff looked like junk, but that last item...',
                        '<32>* ... hot diggity damn!'
                     ]
                     : world.bad_robot
                        ? [
                           "<32>{#p/basic}{#npc/a}* I'm ruined, brah...\n* Mettaton just uppin' cancelled his latest show.",
                           '<32>* Now what excuses will I have to skip class...?'
                        ]
                        : SAVE.data.b.killed_mettaton
                           ? [
                              "<32>{#p/basic}{#npc/a}* Brah.\n* I'm feeling pretty hurt about Mettaton's death.",
                              "<32>* I'll have an excuse to skip classes for a little while, but after that, I'm ruined!"
                           ]
                           : [
                              "<32>{#p/basic}{#npc/a}* Brah.\n* I'm glad Mettaton's staying around.",
                              "<32>* If it weren't for him, I'd have way less excuses to skip class."
                           ],
            () =>
               SAVE.data.n.plot < 60
                  ? ['<32>{#p/basic}{#npc/a}* I hope he gets interesting contestants this time...']
                  : SAVE.data.n.plot < 68
                     ? ["<32>{#p/basic}{#npc/a}* Tell me YOU wouldn't want a life-sized sci-fi anime doll."]
                     : world.bad_robot
                        ? ["<32>{#p/basic}{#npc/a}* It's a cryin' shame, brah."]
                        : SAVE.data.b.killed_mettaton
                           ? ['<32>{#p/basic}{#npc/a}* Real inconsiderate, Mettaton.\n* Real inconsiderate.']
                           : ["<32>{#p/basic}{#npc/a}* As a matter of fact, I'm skipping one right now..."]
         ),
         a_clamguy: pager.create(
            0,
            [
               '<32>{#p/basic}{#npc/a}* They say things can get pretty weird if you go too far out in these repeating rooms.',
               '<32>* Time tunnels...\n* Invariant spatial flexures...',
               "<32>* Eh, don't ask me what any of that means, I just overheard Alphys one time.",
               "<32>* If it wasn't her saying it, I'd probably just think it was made up..."
            ],
            ["<32>{#p/basic}{#npc/a}* As long as you can still see clearly, you're probably fine."]
         ),
         a_pyrope: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        "<32>{#p/basic}{#npc/a}* You've been a bully in the past, but you might've redeemed yourself...",
                        '<32>* We just came back to ask, were you really being yourself?',
                        '<33>* Not everybody likes you, and some are still afraid...',
                        "<32>* But I guess that's how it goes when you've got violence in your veins."
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* When we get to the new homeworld, we're comin' out straightforward.",
                        "<32>* With bars and rhymes so toward they'll beat other writers to their foreword.",
                        "<33>* For anyone who challenges us, we've got but four words...",
                        '<32>* This is our world.'
                     ]
                  : [
                     '<32>{#p/basic}{#npc/a}* Vulkin and I make up the rap group \"The Pyromaniacs.\"',
                     '<32>* Our beats? Fantastic.\n* Our flows? Pyroclastic.',
                     "<33>* When I hop on stage, I'm bomb- astically elastic, I make the crowd melt like molten plastic.",
                     "<32>* And with Vulkin?\n* It's a one-stop shop for hot mic-drop classics."
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? ["<32>{#p/basic}{#npc/a}* Don't worry.", '<32>* We can forgive your brutish ways.']
                     : ["<32>{#p/basic}{#npc/a}* Don't worry.", '<32>* Our flows are ALL above board.']
                  : ["<32>{#p/basic}{#npc/a}* Don't worry.", "<32>* Our measures aren't TOO drastic."]
         ),
         a_vulkin: pager.create(
            0,
            pager.create(
               2,
               () =>
                  SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/basic}{#npc/a}* A new home means new crowds...',
                        '<32>{#p/basic}{#npc/a}* Even spicier than before.'
                     ]
                     : ['<32>{#p/basic}{#npc/a}* Oh...\n* When the crowd cheers for us, it feels... so spicey.'],
               () =>
                  SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/basic}{#npc/a}* A new home means new crowds...',
                        '<32>{#p/basic}{#npc/a}* Even nicier than before.'
                     ]
                     : ['<32>{#p/basic}{#npc/a}* Oh...\n* When the crowd cheers for us, it feels... so nicey.']
            ),
            pager.create(
               2,
               () =>
                  SAVE.data.n.plot === 72
                     ? ['<32>{#p/basic}{#npc/a}* Spicier than before.']
                     : ['<32>{#p/basic}{#npc/a}* So spicey.'],
               () =>
                  SAVE.data.n.plot === 72
                     ? ['<32>{#p/basic}{#npc/a}* Nicier than before.']
                     : ['<32>{#p/basic}{#npc/a}* So nicey.']
            )
         ),
         a_heats: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     ...(world.population < 6
                        ? [
                           '<32>{#p/basic}{#npc/a}* Those guards who evacuated me disrespected my name...',
                           '<32>* So I came back to respect yours, Frisk!'
                        ]
                        : [
                           '<32>{#p/basic}{#npc/a}* You may or may not know MY name...',
                           '<32>* But I know yours, Frisk!'
                        ]),
                     '<32>* Ha!\n* I said it!',
                     "<32>* And I'm never going to forget it!",
                     '<32>* Not now.',
                     '<32>* Not ONCE!!',
                     '<32>* Not EVERRRRR!!!!',
                     '<32>* I shall NEVER, EVER forget your name, Frisk!!!!!!!!'
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* Do YOU know my name!?',
                     '<32>* ...',
                     "<32>* Wait, don't answer that.",
                     '<32>* You...\n* Y-you LOOK like you know.',
                     '<32>* You SMELL...\n* ...\n* ... like you know.',
                     '<32>* ...',
                     "<32>* I bet if I touched you, it'd FEEL like you know.",
                     "<32>* (It'd also be way, WAYYYYYY too hot for you.)",
                     '<32>* But why do you know...?',
                     '<32>* How... do you know...',
                     '<32>* This I will never ever know.' 
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}{#npc/a}* I. Will. Never. Ever. FORGEEEET!']
                  : ['<32>{#p/basic}{#npc/a}* I. Will. Never. Ever. KNOWWWW!']
         ),
         a_slime_father: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* My wife and children have shown me the truth.\n* Life isn't so bad.",
                     '<32>* You may want to believe yourself to be a certain way, because you have \"matured...\"',
                     '<32>* But even the most stoic monster or human is just a child on the inside.',
                     "<32>* Tap into the child.\n* Believe in the child's will.",
                     '<32>* Even in your darkest moment, make the child a part of you, and you will be happier.'
                  ]
                  : ['<33>{#p/basic}{#npc/a}* Ah, to be young again.\n* The cosmos sure felt boundless.'],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}{#npc/a}* No matter who you are, it is the truest part of you.']
                  : ['<32>{#p/basic}{#npc/a}* You look young...', "<32>* Go play!\n* The cosmos aren't so scary."],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}{#npc/a}* Never forget it...']
                  : ['<32>{#p/basic}{#npc/a}* Go on...']
         ),
         a_slime_mother: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* Hubby's only just begun to learn what he needs.\n* But remember...",
                     '<32>* You must still try new things, and do so often.',
                     '<32>* Without that, you will lose yourself behind a mask of your own making again.'
                  ]
                  : [
                     "<32>{#p/basic}{#npc/a}* Hubby thinks that because he's old, he can't enjoy life anymore.",
                     "<32>* But really, he just doesn't like trying new things.",
                     childEvac()
                        ? '<33>* We took our kids to a safezone, but it was new for them, so they were happy!'
                        : '<32>* Our kids try new things all the time, and look how happy they are!'
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* Now that we're free, the horizons for new things to try have expanded.",
                     '<32>* Visit a new world, discover more about the ones you know, or even create one yourself...',
                     '<32>* Anything is possible.'
                  ]
                  : [
                     "<32>{#p/basic}{#npc/a}* If you're ever bored with life, try something new.",
                     childEvac()
                        ? '<32>* It could be a movie, a hobby, or even the stress of safe- guarding your children...'
                        : '<32>* It could be a movie, a hobby, or even a language...',
                     '<32>* Anything is possible!'
                  ],
            ['<32>{#p/basic}{#npc/a}* What are you waiting for?']
         ),
         a_slime_kid1: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}{#npc/a}* Now we'll get to play Monsters...", '<32>* ... and monsters.']
                  : ['<32>{#p/basic}{#npc/a}* Do you wanna play Monsters and Humans!?'],
            () =>
               SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}{#npc/a}* Maybe this isn't a good idea."]
                  : ["<32>{#p/basic}{#npc/a}* I'll be the human."]
         ),
         a_slime_kid2: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* I heard Starry's mom say the humans won't be on our new homeworld...",
                     "<32>* Maybe I'll have to learn how to play smart monster games instead."
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* I wanna learn how to play smart human games like chess.',
                     "<32>* Starry's mom over there is the best... she can beat anyone!"
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}{#npc/a}* What\'s a \"4-D poker?\"']
                  : ['<32>{#p/basic}{#npc/a}* What\'s a \"zugzwang?\"']
         ),
         a_diamond1: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* So your name was actually Frisk, huh?',
                     '<32>* Your performance with Mettaton was cool and all...',
                     '<32>* But that \"god battle\" of yours was even more insane!'
                  ]
                  : SAVE.data.b.ubershortcut
                     ? [
                        "<32>{#p/basic}{#npc/a}* We've only just got here, and Mettaton's already working on his first show!",
                        '<32>* It\'s called \"The search for humanity\'s star.\"'
                     ]
                     : SAVE.data.n.plot < 68
                        ? [
                           "<32>{#p/basic}{#npc/a}* We came to see Mettaton's grand finale, but...",
                           ...(iFancyYourVilliany()
                              ? [
                                 "<32>* I didn't think I'd get to see $(moniker1) up close!",
                                 '<32>* ... you are $(moniker1), right?'
                              ]
                              : [
                                 "<32>* I didn't think I'd get to see the human up close!",
                                 '<32>* ... you are the human, right?'
                              ])
                        ]
                        : SAVE.data.b.killed_mettaton
                           ? [
                              iFancyYourVilliany()
                                 ? "<32>{#p/basic}{#npc/a}* So you're $(moniker1), huh?"
                                 : "<32>{#p/basic}{#npc/a}* So you're the human, huh?",
                              '<32>* ...'
                           ]
                           : [
                              iFancyYourVilliany()
                                 ? "<32>{#p/basic}{#npc/a}* Hey, you're $(moniker1), the best TV villain ever!"
                                 : "<32>{#p/basic}{#npc/a}* Hey, you're the human who beat Mettaton at his own game!",
                              '<32>* What a performance!'
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}{#npc/a}* The best part is, we all got front row seats!']
                  : SAVE.data.b.ubershortcut
                     ? ['<32>{#p/basic}{#npc/a}* Where could they be...']
                     : SAVE.data.n.plot < 68
                        ? ["<32>{#p/basic}{#npc/a}* I'm rooting for you!"]
                        : SAVE.data.b.killed_mettaton
                           ? ['<32>{#p/basic}{#npc/a}* ... get away from me.']
                           : ['<32>{#p/basic}{#npc/a}* ... do you do autographs?']
         ),
         a_diamond2: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* Don't you wish you could do that all over again!?",
                     '<32>* A battle, not just for show, but for the lives of everyone on the outpost...',
                     '<32>* How cool is that!'
                  ]
                  : SAVE.data.b.ubershortcut
                     ? [
                        '<32>{#p/basic}{#npc/a}* After what Burgie did, I thought Mettaton would be done doing TV shows.',
                        '<32>* But now...'
                     ]
                     : SAVE.data.n.plot < 68
                        ? [
                           "<32>{#p/basic}{#npc/a}* Aren't you excited for the grand finale!?",
                           iFancyYourVilliany()
                              ? '<32>* The final showdown between Mettaton and the human villain, $(moniker2)...'
                              : '<32>* The final showdown between Mettaton and his human star...',
                           '<32>* One last dramatic stand for all the glory in the galaxy!'
                        ]
                        : SAVE.data.b.killed_mettaton
                           ? ["<32>{#p/basic}{#npc/a}* He's gone...\n* Mettaton's actually...", '<32>* ...']
                           : [
                              '<32>{#p/basic}{#npc/a}* Mettaton really had us there at the end...',
                              "<32>{#p/basic}{#npc/a}* For a moment, I thought he'd be leaving for good!"
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}{#npc/a}* It's a shame it didn't last longer."]
                  : SAVE.data.b.ubershortcut
                     ? ["<32>{#p/basic}{#npc/a}* It's good to have him back."]
                     : SAVE.data.n.plot < 68
                        ? ["<32>{#p/basic}{#npc/a}* I'm rooting for Mettaton!"]
                        : SAVE.data.b.killed_mettaton
                           ? ['<32>{#p/basic}{#npc/a}* I wanna go home...']
                           : ["<32>{#p/basic}{#npc/a}* I wonder what he'll do next..."]
         ),
         a_gyftrot: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* If we're settling on a new homeworld, I'll be able to find somewhere cold to live.",
                     "<32>* It's not like I need to.\n* But at least this bear would stop giving me pity gifts."
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* This bear insists on gifting me ornaments to put on my head.',
                     '<32>* I know it means well, but head ornaments are the last thing I need...'
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}{#npc/a}* ... hmm, maybe the teenagers weren't so bad."]
                  : ["<32>{#p/basic}{#npc/a}* ... at least it's not hugging me like the teenagers."]
         ),
         a_giftbear: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* I am starting to think that my pity for Gyftrot was a reflection of my own sadness.',
                     '<32>* I have longed for a cold environment myself, for as long as I can remember...',
                     '<32>* When we reach our destination, I will seek one out.'
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* I feel bad for Gyftrot.\n* It, like many of us, has never lived in its natural habitat.',
                     '<32>* Alphys has said recently that the force field might be broken soon...',
                     '<32>* Perhaps when that happens, we may all find some respite.'
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* For now, I'll stay by Gyftrot.\n* Giving gifts is the only way I know how to cope."
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* For now, I will try my best to improve the lives of those less fortunate than I.'
                  ]
         ),
         a_boomer: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        "<32>{#p/basic}{#npc/a}* Honestly, chief?\n* I'm thankful you bullied everyone before.",
                        "<32>* They might've been scared...",
                        '<33>* But at least they could finally live puzzle-free.'
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* The new homeworld's gonna be a riot, chief.",
                        '<32>* Can you take a guess why?',
                        "<33>* That's right.\n* No crappy puzzles to be solved."
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* I don't get what the fuss is with that Mettaton guy.",
                        '<32>* You get me, chief?',
                        "<32>* If you don't know someone personally, why be all upset?"
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* You know why I love hanging out here?',
                        "<32>* It's simple, chief.",
                        "<32>* There's no crappy puzzles to figure out here."
                     ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        '<32>{#p/basic}{#npc/a}* Yeah, you heard me.',
                        "<32>* I'd rather be afraid for my life than have to deal with those puzzles.",
                        "<32>* That's just how it is, chief."
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* Yeah, I STILL said it.',
                        '<32>* I STILL said crappy.',
                        "<32>* It'll ALWAYS be a fact, chief."
                     ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* I'm just being honest.",
                        "<32>* Most of us don't really know who he is as a person.",
                        "<32>* It's just a fact, chief."
                     ]
                     : [
                        '<32>{#p/basic}{#npc/a}* Yeah, I said it.',
                        '<32>* I said crappy.',
                        "<32>* It's just a fact, chief."
                     ],
            ['<32>{#p/basic}{#npc/a}* Chief.']
         ),
         a_artgirl: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* I'm an art teacher.\n* But I'm thinking of quitting.",
                     "<32>* I'd rather have a job where I don't have to criticize people...",
                     '<32>* A job where all I have to do is make them happy.'
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* I'm an art teacher.\n* Art's supposed to be fun and positive, right?",
                        '<32>* But one of my students recently started drawing all this sad artwork.',
                        "<32>* It hurts to look at...\n* I want to help him, but I don't want to stop him, either."
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* I'm an art teacher.\n* In art, it's said that there's no right or wrong way.",
                        '<32>* But one of my students thinks that everything he does is a mistake...',
                        "<32>* He won't stop apologizing...\n* I want to help him, but I'm at a loss for what to do."
                     ],
            () =>
               SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}{#npc/a}* Wouldn't that be nice?"]
                  : SAVE.data.b.killed_mettaton
                     ? ["<32>{#p/basic}{#npc/a}* Why can't everyone just make nice things all the time?"]
                     : ['<33>{#p/basic}{#npc/a}* Why is teaching a subjective subject so objectively difficult?']
         ),
         a_drakemom: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* So. A new homeworld, eh?\n* My son and I will get to do so many great things together.',
                     "<32>* So many great things.\n* Especially that place the old art teacher's got in mind.",
                     "<32>* Then, we'll go to dinner, and the movies... and his father can come along, too.",
                     "<32>* Growing boys have so many needs, don't they?\n* So it's only fair.",
                     "<32>* I wonder if my son's friends would be interested...?"
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        "<32>{#p/basic}{#npc/a}* Did something happen?\n* I've been so focused on this here game, I hadn't noticed.",
                        "<32>* But that's fine, you see.\n* The game is too important to abandon it now."
                     ]
                     : postSIGMA()
                        ? [
                           "<32>{#p/basic}{#npc/a}* All the lights went out a little while ago, you see.\n* So I'm in a bit of a pickle.",
                           '<32>* If I forfeit now, my opponent might return and steal the win out from under my feathers!'
                        ]
                        : SAVE.data.b.ubershortcut || world.population === 0
                           ? [
                              '<33>{#p/basic}{#npc/a}* Well. I sat at this here table.\n* And organized this here game.\n* But my opponent?',
                              '<32>* Nowhere! Nowhere to be seen in this fine establishment!'
                           ]
                           : [
                              "<32>{#p/basic}{#npc/a}* Well. I played this here move.\n* Pawn to king's knight four?\n* So my opponent walked off.",
                              "<32>* Now, you see, I have to wait.\n* It'll take a while for that clock to run out, for sure."
                           ],
            () =>
               SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}{#npc/a}* Fun for the whole family.']
                  : SAVE.data.b.killed_mettaton
                     ? ['<32>{#p/basic}{#npc/a}* All that matters is the game.']
                     : postSIGMA()
                        ? ['<32>{#p/basic}{#npc/a}* You never know what sorts of tricks your opponents will pull on you.']
                        : SAVE.data.b.ubershortcut || world.population === 0
                           ? ["<32>{#p/basic}{#npc/a}* It's a true disappointment.\n* Immeasurable, even."]
                           : ["<32>{#p/basic}{#npc/a}* There's no way I can chronologically recover from this."]
         ),
         a_drakedad: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                        '<32>{#p/basic}{#npc/a}* Yah may have scared us off, but at least yah saved us.',
                        "<32>* Can't say I'm not a little afraid of yah though."
                     ]
                     : SAVE.data.b.s_state_chilldrake
                        ? [
                           "<32>{#p/basic}{#npc/a}* Apology or not, yah more than made up for mah son's injuries.",
                           '<32>* Thank yah for yah kind deed.'
                        ]
                        : [
                           "<32>{#p/basic}{#npc/a}* Now that we're free, being a waitah may no longer suit me.",
                           "<32>* Our Son's returned, so I'll have to find mahself a new job..."
                        ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/basic}{#npc/a}* Everything around here is falling apart now.\n* People want their stah back.',
                        "<32>* They've stopped coming to eat at our fancy restaraunt...",
                        '<32>* In favah of fast food.'
                     ]
                     : SAVE.data.b.s_state_chilldrake
                        ? [
                           "<32>{#p/basic}{#npc/a}* I heard about yah from my son's friends, they tell me he's been bruised all ovah...",
                           "<32>* Could yah apologize to him latah for me?\n* It'd mean the unahverse."
                        ]
                        : [
                           "<32>{#p/basic}{#npc/a}* I'm a waitah.\n* My wife is a chess playah, and my son is a comedian.",
                           '<32>* They say being a waitah is a boring job, but it suits me.',
                           "<32>* Of course, I'm also a fathah.\n* I worry about my son, since he doesn't come home often...",
                           '<32>* Instead, he tells jokes with his friends in Starton.'
                        ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? ['<32>{#p/basic}{#npc/a}* Just try to be kindah from now on, will yah?']
                     : SAVE.data.b.s_state_chilldrake
                        ? ['<32>{#p/basic}{#npc/a}* Thank yah very much.']
                        : ["<32>{#p/basic}{#npc/a}* Maybe I'll become a bartendah."]
                  : SAVE.data.b.killed_mettaton
                     ? ["<32>{#p/basic}{#npc/a}* If things keep going like this, I fear I'll be out of a job."]
                     : SAVE.data.b.s_state_chilldrake
                        ? ['<32>{#p/basic}{#npc/a}* Just prahmise yah will.']
                        : ['<32>{#p/basic}{#npc/a}* At least the jokes are funny.']
         ),
         a_reg: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* Security left for the party a while ago, but I decided to stay for now.',
                     '<32>* After all, why go anywhere else, when you can take in the aura...',
                     '<32>* ... of a wish flower...'
                  ]
                  : SAVE.data.b.ubershortcut
                     ? [
                        "<32>{#p/basic}{#npc/a}* I was bored, so I started taking in the wish flowers' auras.",
                        "<32>* This one's not TOO bad, but there might be a better one somewhere else...",
                        "<32>* ... maybe I'll stumble across that one later."
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* Security kicked me out for taking in the wish flowers' auras.",
                        SAVE.data.b.killed_mettaton
                           ? '<32>* That famous guy has everyone distracted, so I could probably go back in...'
                           : world.genocide
                              ? '<32>* The lights went off a while ago, so I could probably go back in...'
                              : '<32>* The guards have clocked out, so I could probably go back in...',
                        "<32>* ... but, ahh, this here's the best one I've found so far..."
                     ],
            ["<32>{#p/basic}{#npc/a}* Don't worry about me, I'm just here... taking in a wish flower's aura."]
         ),
         a_oni: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* After all our hard work, we've made it out alive.",
                     "<32>* Frankly, I'm tired of this job.\n* But it's been a good run.",
                     "<32>* Maybe, when we get to the new homeworld, I'll be a factory worker instead.",
                     "<32>* And don't tell me that's the same thing as bein' a CORE worker.",
                     "<32>* For one, we won't have those two girls breathin' down our necks all the time...",
                     "<32>* No, Catty, I don't want to sleep over with ya!\n* End of story!"
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* Long ago, they found a weak spot in the force field, about where the Outlands is now.',
                     "<32>* It doesn't mean we can escape through it, but it does mean any human who comes here...",
                     '<32>* ... will have to crash-land right around that area.',
                     '<32>* So we built the outpost to be long and winding to slow down a potential invasion.',
                     "<32>* We quickly realized it was a dumb idea, but by then, it'd become a tradition.",
                     "<32>* Now, you can't go two seconds without getting lost..."
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}{#npc/a}* She's always been gettin' up on my case like that.",
                     '<32>* Eh...\n* I guess it could be worse.',
                     "<32>* We could still be workin' for that dumb robot."
                  ]
                  : [
                     "<32>{#p/basic}{#npc/a}* At least the CORE wasn't designed with this idea.",
                     "<32>* Can you imagine how bad it'd be if we had to go through mazes to do maintenance?"
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/basic}{#npc/a}* Go on, you two...']
                  : SAVE.data.n.plot === 72
                     ? ["<32>{#p/basic}{#npc/a}* Let's just be glad it's over."]
                     : ['<32>{#p/basic}{#npc/a}* Please and no thank you.']
         ),
         a_charles: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* So looks like my job is over.\n* No more CORE.',
                     '<32>* Actually, yes more core.\n* But not for us no more.',
                     '<32>* Any time now, we leave, and we never return.',
                     '<32>* What will my future be?',
                     '<32>* Boy, do I sure wish I knew!'
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* I work at the CORE.\n* The floor plan is designed to look like a bird.',
                     '<32>* Oh! I bet you don\'t know what \"CORE\" stands for!',
                     '<32>* It stands for \"Charged Onium- ion Refactorization Engine.\"',
                     '<32>* What does it mean?',
                     '<32>* I have no idea, no idea at all!'
                  ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/basic}{#npc/a}* Perhaps, in an alternate timeline, I could be king.',
                     '<32>* It is I the good King Charles at your service!',
                     "<32>* Wouldn't that be nice!"
                  ]
                  : [
                     "<32>{#p/basic}{#npc/a}* Something else that's cool about the CORE is the override switches.",
                     "<32>* They're both heavily guarded, but one is guarded by puzzles instead of actual guards!",
                     '<32>* I sure do love PUZZLE!'
                  ]
         ),
         a_dragon: pager.create(
            0,
            [
               "<32>{#p/basic}{#npc/a}* So you're telling me the next comedy show isn't gonna be for another two weeks??",
               '<32>* I thought it was today!'
            ],
            [
               "<32>{#p/basic}{#npc/a}* So you're telling me I can't re-schedule my seat for a later date?",
               '<32>* This place is a total folly!'
            ]
         ),
         a_foodreceptionist: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (You rest your arm on the abandoned countertop.)']
                  : adultEvac()
                     ? world.bulrun
                        ? ['<23>{#p/basic}＊…しかし　みんな　にげてしまいました。']
                        : ['<32>{#p/basic}* ... but nobody came.']
                     : SAVE.data.n.plot === 72
                        ? [
                           '<32>{#p/basic}{#npc/a}* Blub blub...\n* (All reservations cancelled.)\n* (Section two, freedom clause.)',
                           "<32>* (Haven't you read the terms and conditions...?)"
                        ]
                        : music.sansdate.instances.length > 0
                           ? [
                              '<32>{#p/basic}{#npc/a}* Blub blub...\n* (I hope you and your date had a pleasant dining experience.)',
                              '<32>* (That looked like quite the nice little chat.)'
                           ]
                           : SAVE.data.b.killed_mettaton
                              ? [
                                 '<32>{#p/basic}{#npc/a}* Blub blub...\n* (Half-price reservations with our limited-time MTT coupon!)'
                              ]
                              : world.population < 2
                                 ? ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (Day by day, the days grow ever lonelier...)']
                                 : [
                                    "<32>{#p/basic}{#npc/a}* Blub blub...\n* (You'll have to reserve a table to eat here.)",
                                    "<32>* (The girls get antsy when the reservations aren't in order.)"
                                 ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (You rest your arm on the abandoned countertop.)']
                  : adultEvac()
                     ? world.bulrun
                        ? ['<23>{#p/basic}＊…しかし　みんな　にげてしまいました。']
                        : ['<32>{#p/basic}* ... but nobody came.']
                     : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (See you on the homeworld...)']
                        : SAVE.data.b.killed_mettaton
                           ? ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (The coupon expires tomorrow.)']
                           : ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (There are no reservations available at this time.)']
         )
      },
      genotext: {
         timewaster: () =>
            [
               ['<25>{#p/asriel2}{#f/10}* Why are we going back this way again?'],
               ["<25>{#p/asriel2}{#f/7}* We really don't need to do this."]
            ][Math.min(SAVE.flag.n.ga_asrielTimewaster++, 1)],
         asriel46: ['<25>{#p/asriel2}{#f/13}* Golly... feels weird to be back here with you by my side.'],
         asriel47: [
            "<25>{#p/asriel2}{#f/4}* It's like... walking into a warzone with your best friend.",
            "<25>{#f/3}* 'Cause that's what this place was like for me."
         ],
         asriel48: [
            '<25>{#p/asriel2}{#f/13}* Could be worse, though.',
            '<25>{#p/asriel2}{#f/13}* ... at least we have each other, right?'
         ],
         asriel49: [
            '<25>{#p/asriel2}{#f/13}* Imagine it... the city of Aerialis.',
            "<25>{#f/16}* It's a shame it was never finished."
         ],
         asriel50: [
            "<25>{#p/asriel2}{#f/3}* Apparently, it would've been twice the size of the Citadel.",
            '<25>{#f/4}* Just think of us, standing atop all that splendor...',
            "<25>{#f/3}* Wouldn't that be nice?"
         ],
         asriel51: [
            '<25>{#p/asriel2}{#f/4}* Anyway, a city that big is probably just a silly idea.',
            '<25>{#f/13}* And you know how those always go for us.'
         ],
         asriel52: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* Let me guess, the elevator couldn't take us to the third floor?",
                  '<25>{#f/8}* ...',
                  "<25>{#f/7}* I should have known he'd make us take the long way up."
               ],
               ['<25>{#p/asriel2}{#f/8}* One floor down, two floors to go...']
            ][Math.min(SAVE.flag.n.ga_asriel52++, 1)],

         hotel0: () =>
            SAVE.flag.b.asriel_electrics
               ? [['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/7}* Right.'], []][
               Math.min(SAVE.flag.n.ga_asrielElectrics0++, 1)
               ]
               : [
                  [
                     "<25>{#p/asriel2}{#f/6}* It's dark... this isn't normal at all.",
                     "<25>{#f/7}* Someone must've come through and shorted out the electrics."
                  ],
                  ['<25>{#p/asriel2}{#f/10}* Seriously, who turned out the lights?'],
                  []
               ][Math.min(SAVE.flag.n.ga_asrielHotel0++, 1)],
         hotel1: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.b.asriel_electrics
                  ? [
                     '<25>{#p/asriel2}{#f/15}* Come to think of it...',
                     '<25>{#f/16}* This does look like it was caused by magic.',
                     "<26>{#f/3}* So that's that, I guess."
                  ]
                  : [
                     '<25>{#p/asriel2}{#f/10}* No security field...?',
                     '<25>{#f/10}{#x1}* And look, the emitters are burnt out.'
                  ]
               : [
                  '<25>{#p/asriel2}{#f/13}* ... to think this damage was caused by her magic...',
                  '<25>{#p/asriel2}{#f/1}* What fearsome power.'
               ],
         hotelElectrics: [
            '<25>{#p/asriel2}{#f/10}* That note on the counter, did you see it?',
            '<25>{#f/6}* If Alphys was here earlier, that could explain the lights.',
            '<25>{#f/15}* But to short circuit the entirety of the rec center in one go...',
            "<25>{#f/16}* ... that shouldn't even be possible..."
         ],
         hotel2: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/3}* Abandoned.\n* As you'd expect.",
                  "<25>{#f/4}* ... come on, let's get to the CORE."
               ],
               []
            ][Math.min(SAVE.flag.n.ga_asrielHotel2++, 1)],
         core0: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* At last...',
                  '<25>{#f/4}* The central source of power for the outpost.',
                  '<25>{#p/asriel2}{#f/8}* Stay close. ELITE squad members might be lurking nearby.'
               ],
               []
            ][Math.min(SAVE.flag.n.ga_asrielCore0++, 1)],
         core1: ['<25>{#p/asriel2}{#f/10}* No guards...?', '<25>{#f/15}* Golly... they really ARE afraid of us.'],
         core2: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* Finally, the central control room.',
                  "<25>{#f/3}* From here, there's practically a control for everything.",
                  '<25>{#f/15}* Gravity plating, heat distribution, even the atmosphere...',
                  '<25>{#f/4}* It all runs through this system.',
                  "<25>{#f/3}* Let's see if my royal access codes still hold weight.",
                  "<25>{#f/2}* I wouldn't put it past them to forget..."
               ],
               [
                  '<25>{#p/asriel2}{#f/6}* Okay, we made it back.',
                  ...(SAVE.flag.b.asriel_access ? [] : ["<25>{#f/7}* Let's give those royal access codes a try."])
               ]
            ][Math.min(SAVE.flag.n.ga_asrielCore2++, 1)],
         core3: () => [
            '<26>{*}{#p/asriel2}{#f/6}* System, extend the bridge, authorization Asriel STARLING-4-7-7-4.{^40}{%}',
            ...(SAVE.flag.b.asriel_access ? [] : ['<25>{*}{#f/6}* ...{^40}{%}', '<25>{*}{#f/7}* I guess no- {%}'])
         ],
         core4a: ['<25>{#p/asriel2}{#f/10}* I guess so.'],
         core4b: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* Think you can get the back door unlocked while I set this up?',
                  '<25>{#f/4}* Pick a side, left or right, and hit the switch at the end.',
                  "<25>{#f/1}* I'll be waiting."
               ],
               ["<25>{#f/4}* You do your part, and I'll do mine."]
            ][Math.min(SAVE.flag.n.ga_asrielCore4++, 1)],
         core5: ['<25>{#p/asriel2}{#f/8}* Wrong way, $(name).'],
         core6a: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/16}* Perfect timing.\n* We should be all set to go now.',
                  "<25>{#f/1}* All that's left is to make it to an escape shuttle...",
                  '<25>{#f/9}* Set off the blast...',
                  '<25>{#f/2}* And ride the shockwave to freedom.',
                  "<25>{#f/17}* ... aren't you excited, $(name)?",
                  "<25>{#f/17}* Aren't you happy?",
                  "<25>{#f/18}* ...\n* We're going to be free!"
               ],
               ['<25>{#p/asriel2}{#f/9}* Ready when you are, $(name).']
            ][Math.min(SAVE.flag.n.ga_asrielCore5++, 1)],
         core6b: ["<25>{#p/asriel2}{#f/16}* I'm right behind you."],
         core7a: ['<25>{#p/asriel2}{#f/8}* Wait, I think I hear something.'],
         core7b: [
            "<25>{#p/asriel2}{#f/3}* It's Mettaton.\n* He's waiting in the next room.",
            '<25>{#f/10}* I can only make out a silhouette...',
            '<25>{#f/6}* Maybe if we sneak up on him, we can take him by surprise.'
         ],
         core7c: ['<25>{#p/asriel2}{#f/7}* You know what to do.'],
         core8a: [
            "<32>{#p/mettaton}* Do you really think I'm going to let you get away that easily?",
            "<25>{#p/asriel2}{#f/8}* ...\n* Don't be coy, Mettaton.\n* It's obvious you won't.",
            "<25>{#p/asriel2}{#f/7}* It just won't matter when you're dead."
         ],
         core8aX: () => [
            "<32>{#p/mettaton}* Do you really think I'm going to let you get away that easily?",
            "<25>{#p/asriel2}{#f/8}* We've had this chat before, pal.",
            '<32>{#p/mettaton}* Ah...',
            "<32>{#p/mettaton}* But that means I've killed you once before, doesn't it?",
            ...(SAVE.flag.n.genocide_milestone < 4
               ? [
                  "<32>{#p/mettaton}* Heh... don't worry, darling.\n* I'll make your death even quicker this time around."
               ]
               : [
                  '<25>{#p/asriel2}{#f/2}* Oh, how naive you are.',
                  "<25>{#p/asriel2}{#f/1}* It's YOU who's died to us already, and we can make it happen again.",
                  '<32>{#p/mettaton}* ...',
                  "<32>{#p/mettaton}* Nice try... but I won't be tricked so easily."
               ])
         ],
         core8b: [
            "<25>{#p/asriel2}{#f/4}* ... say, since you're about to be spare parts...",
            "<25>{#f/3}* Haven't you thought about your family?",
            '<25>{#f/1}* You know.\n* With how you abandoned them, and all.',
            '<32>{#p/mettaton}* My family would be proud of me if they knew what I was doing.',
            '<32>* As for you...?',
            "<32>* I can't exactly say the same.",
            "<25>{#p/asriel2}{#f/6}* I guess it's a good thing I don't care about them, then.",
            '<25>{#f/8}* You, however, have an emotional weakness...',
            '<25>{#f/6}* With that alone, this battle was over before it even started.'
         ],
         core8c: [
            '<32>{#p/mettaton}* Listen, darling.',
            "<32>* Whatever you have to say, doesn't matter.",
            "<32>* All that matters is that you're going to lose to me.",
            '<32>* For all your talk of victory and inevitability...',
            '<32>* For all the showboating you love to go around doing...',
            "<32>* There's one power you failed to consider."
         ],
         core8d: ['<25>{#p/asriel2}{#f/10}* And what is that?'],
         core8e: ['<32>{*}{#p/mettaton}{#f/1}* The power of NEO.{^40}{%}'],
         azzyBpants: ['<25>{#p/asriel2}{#f/8}* Golly.\n* Why is HE still around.']
      },
      coreswitched: () =>
         SAVE.data.b.svr
            ? ["<32>{#p/human}* (You can't seem to operate the switch any further.)"]
            : world.darker
               ? ["<32>{#p/basic}* It's stuck, like always."]
               : SAVE.data.n.plot === 72
                  ? ["<33>{#p/basic}* The switch is... zero-time use.\n* That's totally a thing that can happen, honest."]
                  : ['<32>{#p/basic}* The switch is... one-time use.\n* And totally not stuck like all the other ones.'],
      puzzlesolved: () =>
         SAVE.data.b.svr
            ? ["<32>{#p/human}* (You can't seem to operate the switch any further.)"]
            : world.darker
               ? ["<32>{#p/basic}* It's stuck, like always."]
               : SAVE.data.n.plot === 72
                  ? ['<32>{#p/basic}* The switch looks even more resistant to pressing than it was before.']
                  : ["<32>{#p/basic}* The switch no longer wants to be pressed.\n* ... yes, it's stuck."],
      nosleep: () =>
         SAVE.data.b.svr ? ["<32>{#p/human}* (You can't seem to find a way in.)"] : ["<32>{#p/basic}* It's locked."],
      rg1chat: pager.create(
         0,
         [
            '<32>{#p/basic}{#x1}* My boyfriend and I got lost looking for ice cream during training...{#x3}',
            '<32>{#x1}* Eventually, we just gave up and settled for pizza.{#x3}',
            "<32>{#x1}* Then we took up security duty at this post since that's the most we're qualified to do.{#x3}"
         ],
         [
            "<32>{#p/basic}{#x1}* I've been told us security folks get SUPER exclusive discounts at the shop.{#x3}",
            '<32>{#x1}* Totally not part of the reason we came here, though.{#x3}'
         ]
      ),
      rg2chat: pager.create(
         0,
         [
            "<32>{#p/basic}{#x2}* Hey, aren't you like, that one quiet kid we saw earlier?{#x3}",
            '<32>{#x2}* I wonder why Alphys had to escort you...{#x3}',
            '<32>{#x2}* You must be... MEGA important.{#x3}'
         ],
         [
            "<32>{#p/basic}{#x2}* If you're gonna be famous, then don't forget about us when you make it there, yeah?{#x3}",
            "<32>{#x2}* Always gotta remember the lil' bros you meet along the way.{#x3}"
         ]
      ),
      elevator1: () => [
         choicer.create('* (Where would you like to go?)', 'Cancel', 'CORE Start', 'CORE End', 'シタデル')
      ],
      elevatorStory1: () => [choicer.create('* (Where would you like to go?)', 'CORE Start', 'Cancel')],
      elevator2: () => [
         choicer.create('* (Where would you like to go?)', 'エアリアル', 'Cancel', 'CORE End', 'シタデル')
      ],
      elevatorStory2: () => [choicer.create('* (Where would you like to go?)', 'エアリアル', 'Cancel')],
      elevator3: () => [
         choicer.create('* (Where would you like to go?)', 'エアリアル', 'CORE Start', 'Cancel', 'シタデル')
      ],
      elevatorStory3: () => [choicer.create('* (Where would you like to go?)', 'シタデル', 'Cancel')],
      elevator4: () => [
         choicer.create('* (Where would you like to go?)', 'エアリアル', 'CORE Start', 'CORE End', 'Cancel')
      ],
      dinnerdate1: pager.create(
         0,
         () => [
            "<25>{#p/sans}* hey, i heard you're visiting here.",
            '<25>{#p/sans}{#f/2}* mind grabbing some dinner with me real quick?',
            choicer.create('* (Have dinner?)', 'Yes', 'No')
         ],
         () => ['<25>{#p/sans}{#f/2}* changed your mind?', choicer.create('* (Have dinner?)', 'Yes', 'No')]
      ),
      dinnerdate2a: pager.create(
         0,
         ["<25>{#p/sans}{#f/3}* eh, fair enough.\n* i'll be here if you change your mind."],
         ['<25>{#p/sans}{#f/3}* ok then.']
      ),
      dinnerdate2b: ['<25>{#p/sans}{#p/sans}{#f/0}* sweet.'],
      dinnerdate3: ['<25>{#p/sans}{#f/2}* right this way.'],
      dinnerdate4: ['<25>{#p/sans}* here we are.'],
      dinnerdate5: ['<25>{#p/sans}* this table looks good.'],
      dinnerdate5b: ["<25>{#f/2}* i'll take right, you take left."],
      dinnerdate8: () => [
         '<25>{#p/sans}* so...',
         "<25>{#f/3}* your journey's almost over, huh?",
         '<25>{#f/0}* you must really wanna get outta here.',
         '<25>{#f/0}* ... heh.\n* trust me, i know the feeling, buddo.',
         ...(world.bad_lizard < 1 && SAVE.data.n.bully < 15
            ? [
               "<25>{#f/3}* ... i also know you've got a lot to leave behind.",
               "<25>{#f/0}* out here, you've got food, drink, friends...",
               '<25>{#f/2}* would staying with us really be so bad?'
            ]
            : [
               "<25>{#f/3}* ... i also know you've got a lot on your mind.",
               "<25>{#f/0}* but whatever you may've done...",
               '<25>* is getting out of here really worth all that trouble?'
            ])
      ],
      dinnerdate10: ['<25>{#f/0}* ...'],
      dinnerdate11: () => [
         '<25>{#f/3}* lemme tell you a story.',
         "<25>{#f/0}* so, i'm a royal sentry, right?",
         '<25>{#f/0}* my job is to sit out there and watch for humans.',
         "<25>{#f/3}* though, i'm sure you've realized by now...",
         '<25>{#f/2}* i actually took the job so i could PROTECT you guys instead.',
         ...(SAVE.data.n.state_foundry_undyne > 0
            ? [
               "<25>{#f/3}* i'd worry about someone finding out, but... y'know.",
               "<25>{#f/0}* not many people around these days who'd care."
            ]
            : world.bad_lizard < 1 && SAVE.data.n.bully < 15
               ? ["<25>{#f/4}* shh, don't tell undyne i said that.\n* she wouldn't like it."]
               : ["<25>{#f/0}* ... ironic, isn't it?"]),
         "<25>{#f/0}* anyway, i've got this super boring job, right?",
         "<25>{#f/0}* fortunately, there's a little place near the edge of starton.",
         "<25>{#f/0}* and at the end of the bridge to this place lies a big ol' door.",
         '<25>{#f/4}* now this door was PERFECT for practicing knock knock jokes.',
         "<25>{#f/0}* one day, i'm knockin' em out like usual...",
         '<25>{#f/0}* and i knock on the door and say \"knock knock.\"\n* like usual.',
         '<25>{#f/0}* but then, from the other side...',
         "<25>{#f/3}* i hear a woman's voice.",
         '<32>{#p/soriel}* \"Who is there?\"',
         '<25>{#p/sans}{#f/0}* naturally, i respond.',
         '<25>{#f/2}* \"water.\"',
         '<32>{#p/soriel}* \"Water who?\"',
         '<25>{#p/sans}{#f/4}* \"water you doing all the way out here?\"',
         '<25>{#f/0}* and she just LOSES it.',
         "<25>* like it's the first joke she's heard in a hundred years.",
         '<25>{#f/2}* so, naturally, i tell her some more.',
         '<25>{#f/0}* after about a half dozen or so, SHE knocks and says...',
         '<32>{#p/soriel}* \"Knock knock!\"',
         '<25>{#p/sans}* i say \"who\'s there?\"',
         '<32>{#p/soriel}* \"You.\"',
         '<25>{#p/sans}* \"you who?\"',
         '<32>{#p/soriel}* \"I\'m not a dog, mister!\"',
         '<25>{#p/sans}{#f/0}* ... heh.',
         '<25>{#f/2}* needless to say, this woman knew her stuff.',
         '<25>{#f/0}* we kept going for a while, but eventually, she had to go.',
         '<25>{#f/0}* the next day, though...',
         '<25>* she was waiting for me when i returned.',
         '<25>{#f/3}* ... and boy did she have a lot to say.',
         '<32>{#p/soriel}* \"... I just felt it was the right thing to do...\"',
         '<32>{#p/soriel}* \"... I have to protect them...\"',
         '<32>{#p/soriel}* \"... it\'ll never be like it was before...\"',
         '<25>{#p/sans}{#f/3}* turns out, there was more to this woman than meets the ear.',
         '<25>{#f/0}* oh, and she also had a ton of weird stuff to say about asgore.',
         "<25>{#f/3}* i'll spare you on the details, but let's just say...",
         "<25>{#f/2}* isolation can really screw with a person's world view."
      ],
      dinnerdate13: ['<25>{#p/sans}{#f/0}* shoot, i forgot to order something, huh?', '<25>* ...'],
      dinnerdate14: ["<25>{#f/3}* i'll be right back."],
      dinnerdate14comment: () =>
         world.darker
            ? ['<32>{#p/basic}* ...']
            : SAVE.data.b.oops
               ? ['<32>{#p/basic}* Truly, there is no experience like waiting for food.']
               : [
                  '<32>{#p/basic}* You know...',
                  "<32>{#p/basic}* I would've said more to her back there, but at the same time...",
                  '<32>{#p/basic}* ... would it really have made any difference?'
               ],
      dinnerdate15: () =>
         SAVE.data.b.water
            ? [
               '<25>{#p/sans}* look at that, you even brought a drink.',
               "<25>{#p/sans}{#f/2}* don't worry.\n* i already had mine at the counter."
            ]
            : [
               "<25>{#p/sans}* now we're talking.",
               "<25>{#p/sans}{#f/2}* don't worry.\n* i already had my food at the counter."
            ],
      dinnerdate16: () => [
         '<25>{#f/0}* anyway, like i was saying...',
         '<25>{#f/3}* this woman was under a lot of stress.',
         '<25>{#f/0}* so i asked her...',
         '<25>{#f/2}* \"wanna know what a skeleton does to pass the time?\"',
         '<32>{#p/soriel}* \"What do they do?\"',
         '<25>{#p/sans}{#f/2}* i then proceeded to play a tune on my trombone.',
         '<25>{#f/4}* her being her, she INSTANTLY got the joke.',
         "<25>{#f/0}* ... that night ended up being the best we'd ever have.",
         '<25>{#f/0}* fast-forward to today, and well...',
         "<25>{#f/2}* i've mostly just been watching over you.",
         "<25>{#f/0}* but hey, i'd say i'm doing a pretty good job, wouldn't you?",
         '<25>{#f/3}* i mean, look at yourself...',
         "<25>{#f/0}* you haven't died a single time.",
         ...(SAVE.flag.n._deaths > 0
            ? ['<25>{#f/0}* ...', "<25>{#f/0}* hey, what's that look supposed to mean?", '<25>{#f/2}* am i wrong...?']
            : SAVE.flag.n._hits > 0
               ? ['<25>{#f/2}* heh.\n* chalk it up to my great skills.']
               : ["<25>{#f/2}* heh.\n* i doubt you've even got a scratch on you."])
      ],
      dinnerdate18: () => [
         ...(SAVE.flag.n._deaths > 0 ? ['<25>{#p/sans}{#f/0}* heh.'] : []),
         '<25>{#p/sans}{#f/0}* well, enjoy the food, and... i hope you learned something.' 
      ],
      dinnerdate19: () => [
         "<25>{#f/3}* just remember, we're all rootin' for ya, bud.",
         ...(SAVE.data.n.exp <= 0
            ? SAVE.data.n.state_foundry_undyne === 1
               ? ["<25>{#f/0}* ... regardless of who you could've saved."]
               : ["<25>{#f/2}* ... even undyne's probably on your side by now."]
            : world.bad_lizard < 1 && SAVE.data.n.bully < 15
               ? ["<25>{#f/0}* ... regardless of what you've done."]
               : ['<25>{#f/0}* ... well, most of us, anyway.'])
      ],
      onionsan1: ['<32>{#p/basic}* Hey there...\n* Noticed you were here...'],
      onionsan1a: ["<32>{#p/basic}* I'm Onionsan!\n* Onionsan, y'hear!"],
      onionsan2: () =>
         world.goatbro
            ? ["<32>{#p/basic}* You two, don't look like you're up to any good..."]
            : ["<32>{#p/basic}* You, look like you've traveled a long way to get here..."],
      onionsan2a: () =>
         world.goatbro
            ? ["<32>{#p/basic}* Good thing, the rec center people will always forgive us!\n* It's my Big Favorite."]
            : ["<32>{#p/basic}* Good thing, people like us are who the rec center is for!\n* It's my Big Favorite."],
      onionsan3: [
         "<32>{#p/basic}* Though...\n* I'm too wide to fit inside...",
         '<32>{#p/basic}* Outer space makes onions grow Super Duper Fast.'
      ],
      onionsan3a: () =>
         world.goatbro
            ? [
               "<32>{#p/basic}* But I'll find a path to betterment soon, y'hear!",
               "<32>{#p/basic}* They're, gonna break the force field real good, y'hear!"
            ]
            : [
               "<32>{#p/basic}* But I'll find a home soon, y'hear!",
               "<32>{#p/basic}* They're, gonna break the force field real good, y'hear!"
            ],
      onionsan4: ["<32>{#p/basic}* And then...\n* I'll venture out...\n* To the cosmos..."],
      onionsan4a: ["<32>{*}{#p/basic}* We're all gonna be freeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeee{^999}"],
      onionsan4x: ['<25>{#p/asriel2}{#f/8}* Sure, whatever.'],
      candy1: () =>
         postSIGMA()
            ? ["<32>{#p/basic}* It's out of service."]
            : [
               SAVE.data.b.svr
                  ? '<32>{#p/human}* (You approach the vending machine.)'
                  : "<32>{#p/basic}* It's a filament-exclusive vending machine.",
               choicer.create('* (Buy the Filament for 40G?)', 'Yes', 'No')
            ],
      candy2: ["<32>{#p/human}* (You don't have enough G.)"],
      candy3: ["<32>{#p/human}* (You're carrying too much.)"],
      candy4: ['<32>{#p/human}* (You got the Filament.)'],
      candy5: ['<32>{#p/human}* (You decide not to buy.)'],
      bedreceptionist1: pager.create(
         0,
         () =>
            SAVE.data.n.plot === 72
               ? [
                  "<32>{#p/basic}{#npc/a}* Welcome to Four Dimensions.\n* We're closed.\n* Section two, freedom clause.",
                  '<32>* People never read the terms and conditions...'
               ]
               : SAVE.data.b.killed_mettaton
                  ? [
                     '<32>{#p/basic}{#npc/a}* Welcome to Four Dimensions, the hotel where sleep meets the edge of perception.',
                     '<32>* All of our currently allocated rooms have been reserved.',
                     '<32>* Please return at a later time, when more space has been allocated.'
                  ]
                  : [
                     '<32>{#p/basic}{#npc/a}* Welcome to Four Dimensions, the hotel where sleep meets the edge of perception.',
                     "<32>* Once you reserve a room with us, it's yours forever.",
                     "<32>* We've got a junior suite open on the left stack for 300G.\n* Interested?{#npc}",
                     choicer.create('* (Own a room?)', 'Yes', 'No')
                  ],
         () =>
            SAVE.data.n.plot === 72
               ? ['<32>{#p/basic}{#npc/a}* See you on the homeworld.']
               : SAVE.data.b.killed_mettaton
                  ? ['<32>{#p/basic}{#npc/a}* Until next time!']
                  : [
                     '<32>{#p/basic}{#npc/a}* 300G to own a junior suite.\n* Interested?{#npc}',
                     choicer.create('* (Own a room?)', 'Yes', 'No')
                  ]
      ),
      bedreceptionist2a: [
         '<32>{#p/basic}{#npc/a}* Thanks, we look forward to seeing you sleep safely and comfortably!'
      ],
      bedreceptionist2b: ["<32>{#p/basic}{#npc/a}* Well, you're always welcome to change your mind."],
      bedreceptionist3: ["<32>{#p/basic}{#npc/a}* I'm afraid you don't have enough G for that."],
      bedreceptionist4: () =>
         SAVE.data.n.plot === 72
            ? [
               '<32>{#p/basic}{#npc/a}* As always, we thank you for purchasing a room.',
               "<32>* We'll be closing soon, so make the most of your room while you still can!"
            ]
            : [
               '<32>{#p/basic}{#npc/a}* Thanks for purchasing a room at Four Dimensions!',
               ...(SAVE.data.b.killed_mettaton ? ['<32>* You were fortunate to have done so when you did.'] : [])
            ],
      core1: [
         '<32>{#p/event}* Ring, ring...',
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* ... h-hiya.',
         "<25>* That's the elevator to the Citadel.",
         "<25>{#g/alphysInquisitive}* I'd have you go there straight away, but...",
         "<25>{#g/alphysWelp}* It's... kind of not working right now.",
         "<25>{#g/alphysCutscene3}* You'll have to go through the CORE instead.",
         "<25>{#g/alphysUhButHeresTheDeal}* When you're ready, head down there and I'll call you back!"
      ],
      core2a: () =>
         [
            [
               '<32>{#p/event}* Ring, ring...',
               "<25>{#p/alphys}{#g/alphysSmileSweat}* Okay, you're here.",
               "<25>{#g/alphysSmileSweat}* I'll keep an open line between us while you're down here...",
               '<25>{#g/alphysWelp}* ... just in case something bad happens.',
               ...(SAVE.data.n.plot < 66.2
                  ? [
                     '<25>{#g/alphysInquisitive}* The ELITE squad members who patrol here SHOULD be on break, but...',
                     "<25>{#g/alphysNeutralSweat}* ... well, I can't make any guarantees."
                  ]
                  : [
                     "<25>{#g/alphysInquisitive}* Since we're here ahead of schedule, the ELITE squad is off-duty.",
                     "<25>{#g/alphysNeutralSweat}* ... let's hope that makes things easier."
                  ])
            ],
            SAVE.data.n.plot < 66.2
               ? [
                  '<32>{#p/event}* Ring, ring...',
                  '<25>{#p/alphys}{#g/alphysWelp}* Okay, ready to continue?',
                  '<25>{#g/alphysNeutralSweat}* Remember, g-gotta keep an eye out for the ELITE squad members.'
               ]
               : SAVE.data.n.plot < 67
                  ? [
                     '<32>{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysWelp}* Okay, ready to continue?',
                     '<25>{#g/alphysNeutralSweat}* Remember, g-gotta unlock that door...'
                  ]
                  : [
                     '<32>{#p/event}* Ring, ring...',
                     '<25>{#p/alphys}{#g/alphysWelp}* Okay, ready to continue?',
                     "<25>{#g/alphysNeutralSweat}* We're almost to the end, you know..."
                  ],
            ['<32>{#p/event}* Ring, ring...', "<25>{#p/alphys}{#g/alphysWelp}* I'll be on the line."]
         ][Math.min(SAVE.data.n.state_aerialis_coreenter++, 2)],
      core2b: () =>
         [
            [
               "<25>{#p/alphys}{#g/alphysInquisitive}* If you're leaving the CORE, I'll hang up the phone for now.",
               "<25>{#g/alphysCutscene2}* I'll call you back when y-you return here!"
            ],
            ['<25>{#p/alphys}{#g/alphysNervousLaugh}* Leaving again?', '<25>{#g/alphysWelp}* Alright then.'],
            [
               '<25>{#p/alphys}{#g/alphysFR}* ...',
               '<25>{#g/alphysFR}* You better not be doing this just to see how I react.'
            ],
            ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
         ][Math.min(SAVE.data.n.state_aerialis_coreleave++, 3)],
      core3: ['<25>{*}{#p/alphys}{#g/alphysShocked}* Watch out!{^999}'],
      core4: () =>
         SAVE.data.b.legendary_madjick
            ? ["<25>{#p/alphys}{#g/alphysCutscene3}* Huh?\n* What's with that item?"]
            : SAVE.data.b.assist_madjick
               ? [
                  '<25>{#p/alphys}{#g/alphysCutscene3}* What the... what did you just DO??',
                  '<25>* What did you SAY to them to make them walk away like that!?',
                  '<32>{#p/basic}* Heh.\n* Sometimes all you need are the right words.'
               ]
               : !SAVE.data.b.killed_madjick
                  ? [
                     '<25>{#p/alphys}{#g/alphysNervousLaugh}* Phew...',
                     "<25>{#g/alphysNeutralSweat}* L-let's hope that doesn't happen again.",
                     ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ... guess you didn't need my help after all."])
                  ]
                  : world.bad_lizard === 0
                     ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* No... why...',
                        '<25>{#g/alphysWorried}* ...',
                        "<25>* Couldn't there have been... another way?"
                     ]
                     : [
                        '<25>{#p/alphys}{#g/alphysSideSad}* No... why...',
                        '<25>{#g/alphysThatSucks}* ...',
                        "<25>* At least it won't be long until we're outta here."
                     ],
      core5: ['<25>{*}{#p/alphys}{#g/alphysOhGodNo}* Wait!!!{^999}'],
      core6: () =>
         SAVE.data.b.legendary_knightknight
            ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
               ? [
                  "<25>{#p/alphys}{#g/alphysWTF}* I can't believe what I'm seeing...",
                  ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                     ? []
                     : ["<32>{#p/basic}* ... guess you don't need my help this time, huh?"])
               ]
               : ["<25>{#p/alphys}{#g/alphysCutscene3}* Huh?\n* What's with that item?"]
            : SAVE.data.b.assist_knightknight
               ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
                  ? [
                     "<25>{#p/alphys}{#g/alphysWTF}* I can't believe what I'm seeing...",
                     '<32>{#p/basic}* Take it from me.\n* Sentimentality is my specialty!',
                     '<32>{#p/basic}* Magic words and warrior songs are the lifeblood of these old homeworld heroes.'
                  ]
                  : [
                     '<25>{#p/alphys}{#g/alphysCutscene3}* What the... what did you just DO??',
                     '<25>* What did you SAY to them to make them walk away like that!?',
                     '<32>{#p/basic}* Heh.\n* Sometimes all you need are the right high notes.'
                  ]
               : !SAVE.data.b.killed_knightknight
                  ? [
                     '<25>{#p/alphys}{#g/alphysWelp}* ...',
                     ...(SAVE.data.b.killed_madjick
                        ? ['<25>{#g/alphysWelp}* At least you both survived this time.']
                        : [
                           '<25>* The next room awaits.',
                           ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                              ? []
                              : ["<32>{#p/basic}* ... guess you don't need my help this time, huh?"])
                        ])
                  ]
                  : SAVE.data.b.killed_madjick || world.bad_lizard === 0
                     ? ['<25>{#p/alphys}{#g/alphysThatSucks}* ...', '<32>{#p/human}* (You hear a long sigh.)']
                     : [
                        '<25>{#p/alphys}{#g/alphysWorried}* ...',
                        '<25>{#g/alphysWorried}* That should be the l-last of the engineers.'
                     ],
      core7: [
         '<25>{#p/alphys}{#g/alphysWelp}* So... this is the CORE.\n* Or rather, the \"core\" of the CORE.',
         '<25>{#g/alphysInquisitive}* There are two p-paths you can take to unlock the door behind it...',
         "<25>* The puzzler's to the left, and the fighter's to the right.",
         '<25>{#g/alphysFR}* Both are... difficult.\n* But...',
         "<25>{#g/alphysWelp}* I'd suggest t-taking the puzzler's path.",
         "<25>{#g/alphysSideSad}* It's up to you, of course...",
         "<25>{#g/alphysHaveSomeCompassion}* But at least that way, you won't... risk a conflict."
      ],
      core8a: (nooted: boolean) => [
         "<25>{#p/alphys}{#g/alphysSide}* So you've decided on the puzzler's path.",
         '<25>{#g/alphysWelp}* Probably a smart choice.',
         ...(nooted
            ? [
               '<25>{#g/alphysCutscene3}* The puzzles here are...',
               '<25>{#f/10}* ... already unlocked.',
               '<25>{#f/3}* Has it been like this the whole time?'
            ]
            : [
               "<25>{#g/alphysCutscene3}* The puzzles here are... uh, simple if you know what you're doing.",
               "<25>{#g/alphysCutscene2}* To summarize, though, it's really just a... big c-combination lock.",
               '<25>{#g/alphysWelp}* Use the switches to flip each segment until they all line up.'
            ])
      ],
      core8a1: () => ["<25>{#p/alphys}{#g/alphysInquisitive}* Unless you'd prefer the other path...?"],
      core8b: ["<25>{#p/alphys}{#g/alphysCutscene2}* That's one puzzle down."],
      core8b1: () => ["<25>{#p/alphys}{#g/alphysWelp}* I guess we're going this way now."],
      core8c: ['<25>{#p/alphys}{#g/alphysCutscene1}* You did it!\n* Now hit the switch in the next room!'],
      core8c1: [
         '<25>{#p/alphys}{#g/alphysInquisitive}* What are you doing...?',
         "<25>{#p/alphys}{#g/alphysFR}* Don't tell me you're switching paths NOW..."
      ],
      core8c2: (nooted: boolean) =>
         nooted
            ? [
               '<25>{#p/alphys}{#g/alphysWTF}* You are.\n* You are going down the other...',
               '<25>{#g/alphysFR}* ...',
               '<25>{#g/alphysFR}* Since when was this unlocked?'
            ]
            : ['<25>{#p/alphys}{#g/alphysWTF}* You are.\n* You are going down the other path.'],
      core8c3: [
         '<25>{#p/alphys}{#g/alphysWelp}* Now you have access to both switches.',
         '<25>{#p/alphys}{#g/alphysCutscene3}* Come on!'
      ],
      core8c4: ['<25>{#p/alphys}{#g/alphysGarboCenter}* ...', '<25>* You are seriously testing my patience right now.'],
      core9a: () => [
         "<25>{#p/alphys}{#g/alphysNeutralSweat}* So you've decided on the fighter's path.",
         ...(SAVE.data.b.killed_knightknight && (SAVE.data.b.killed_madjick || world.bad_lizard === 1)
            ? ['<25>* ...', '<25>{#g/alphysCutscene3}* Can you... maybe not kill anyone else?\n* If possible?']
            : SAVE.data.b.killed_knightknight || SAVE.data.b.killed_madjick
               ? ['<25>* ...', '<25>* This could be bad.']
               : [
                  "<25>{#g/alphysWelp}* We're certainly feeling adventurous today.",
                  "<25>* There's not much to it, you just gotta get through the guards.",
                  '<25>{#g/alphysCutscene2}* Uh... good luck?',
                  '<25>{#g/alphysCutscene3}* ...',
                  "<25>* Please don't die to these guys."
               ])
      ],
      core9a1: (nooted: boolean) =>
         nooted
            ? [
               "<25>{#p/alphys}{#g/alphysSide}* Oh, you're...",
               '<25>{#p/alphys}{#g/alphysCutscene3}* ... over here where the path is already unlocked.',
               '<25>{#p/alphys}{#f/3}* Has it been like this the whole time?'
            ]
            : [
               "<25>{#p/alphys}{#g/alphysSide}* Oh, you're over here now.",
               "<25>{#g/alphysInquisitive}* Puzzler's path it is?"
            ],
      core9b: () =>
         1 <= battler.exp
            ? [
               '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
               corefriendly() ? '<25>* D-did you... really have to do that?' : '<32>{#p/human}* (You hear a sigh.)'
            ]
            : SAVE.data.b.a_state_nooted1
               ? [
                  "<25>{#p/alphys}{#g/alphysInquisitive}* I don't understand why you're still over here, you know.",
                  "<25>{#p/alphys}{#g/alphysCutscene3}* Why?\n* The puzzler's path is already unlocked!"
               ]
               : ["<25>{#p/alphys}{#g/alphysCutscene2}* You're past the first group!\n* Now for the second."],
      core9b1: (nooted: boolean) =>
         1 <= battler.exp && corefriendly()
            ? nooted
               ? [
                  "<25>{#p/alphys}{#g/alphysInquisitive}* Unless, of course, you're...",
                  '<25>{#p/alphys}{#g/alphysCutscene3}* ... gonna take the other path which is already unlocked.',
                  '<25>{#p/alphys}{#f/3}* Has it been like this the whole time?'
               ]
               : ["<25>{#p/alphys}{#g/alphysInquisitive}* Unless, of course, you're gonna take the other path...?"]
            : nooted
               ? [
                  '<25>{#p/alphys}{#g/alphysInquisitive}* Changed your...',
                  "<25>{#p/alphys}{#g/alphysCutscene3}* ... oh, it's already unlocked over here.",
                  '<25>{#p/alphys}{#f/3}* Has it been like this the whole time?'
               ]
               : ['<25>{#p/alphys}{#g/alphysInquisitive}* Changed your mind...?'],
      core9c: () =>
         calm_lizard()
            ? ['<25>{#p/alphys}{#g/alphysCutscene1}* You made it!\n* Now hit the switch in the next room!']
            : [
               '<25>{#p/alphys}{#g/alphysSideSad}* ...',
               SAVE.data.n.state_aerialis_corepath_puzzle < 3
                  ? "<25>{#p/alphys}{#g/alphysSideSad}* Hit the switch in the next room, and we'll be outta this place."
                  : '<25>{#p/alphys}{#g/alphysSideSad}* Hit the switch in the next room, and just be done with it.'
            ],
      core10a: ['<25>{#p/alphys}{#g/alphysCutscene2}* Okay, y-you should be able to continue forward now.'],
      core10b: [
         '<25>{#p/alphys}{#g/alphysWelp}* Oh, you came back.',
         '<25>{#g/alphysCutscene2}* Well, y-you should be able to continue forward now.'
      ],
      core10c: ['<25>{#p/alphys}{#g/alphysFR}* Finally.'],
      core11: (nooted: boolean) =>
         nooted
            ? [
               '<25>{#p/alphys}{#g/alphysInquisitive}* Why are you going...',
               '<25>{#f/21}* ...',
               '<25>{#f/22}* HAS THIS BEEN UNLOCKED THE WHOLE TIME!?'
            ]
            : ['<25>{#p/alphys}{#g/alphysInquisitive}* Why are you going back this way?', '<25>{#g/alphysFR}* ...'],
      core12: (nooted: boolean) =>
         nooted
            ? [
               
               '<25>{#p/alphys}{#g/alphysInquisitive}* Since when was this unlocked?',
               "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Well, that's gonna save a lot of time!"
            ]
            : SAVE.data.b.a_state_nooted1 && game.room === 'a_core_left2' // NO-TRANSLATE

               ? ['<25>{#p/alphys}{#g/alphysCutscene3}* What in the world...']
               : ['<25>{#p/alphys}{#g/alphysCutscene3}* You could have reached the capital by now.'],
      core12x: [
         '<25>{#p/alphys}{#g/alphysInquisitive}* Since when was this unlocked?',
         '<25>{#p/alphys}{#f/3}* Has it been like this the whole time?'
      ],
      core13: [
         "<25>{#p/alphys}{#g/alphysGarbo}* You've hit both switches.",
         '<25>{#p/alphys}{#g/alphysGarboCenter}* Happy now?'
      ],
      core14: () => [
         "<25>{#p/alphys}{#g/alphysWelp}* W-wait, there's someone ahead.",
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* Let me see if I can clear the way this time...',
         SAVE.data.b.ubershortcut
            ? '<32>{#p/human}* (It sounds like someone is furiously typing at a keyboard.)'
            : '<32>{|}{#p/human}* (Yet again, the obligatory- {%}',
         "<25>{#p/alphys}{#g/alphysCutscene3}* They're not on the intercom system.",
         "<25>{#g/alphysUhButHeresTheDeal}* They're not even part of the guard!",
         '<25>{#g/alphysWelp}* ... this is not good.'
      ],
      core14a: [
         '<32>{#p/basic}* So you think you can just cross a bridge and make it to the other side, do you?',
         "<32>* Oouhuhu...\n* I'm afraid, dear comm-raid..."
      ],
      core14b: ["<32>{#p/basic}* You'll have to THINK AGAIN!{%20}"],
      core15: () =>
         !world.killed_mushketeer
            ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Is... is that it?', '<25>* Are we clear?']
            : [
               '<26>{#p/alphys}{#g/alphysNeutralSweat}* Did... did you really...',
               '<25>{#g/alphysHaveSomeCompassion}* ... okay...'
            ]
   },

   b_group_aerialis: {
      froggitexWhimsalot: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* The f-first pair of guards.']
            : ['<32>{#p/story}* Final Froggit and Flutterknyte appeared before you!'],
      froggitexWhimsalotX: (whimmer: boolean) =>
         whimmer ? ['<32>{#p/story}* Flutterknyte now flies solo.'] : ['<32>{#p/story}* Final Froggit hops alone.'],
      astigmatism: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Not these guys...']
            : world.genocide
               ? ['<32>{#p/story}* A smiling eye steps forth!']
               : ['<32>{#p/story}* The smiling eyes step forth!'],
      rg: () => (world.goatbro ? ['<32>{#p/asriel2}* RG 01 and 02.'] : ['<32>{#p/story}* The Royal Guard attacks!']),
      spacetopTsundere: () =>
         world.goatbro ? ['<32>{#p/asriel2}* These crazies...'] : ["<32>{#p/story}* It's a space-faring nightmare!"],
      spacetopTsundereX: (spacetop: boolean) =>
         world.goatbro
            ? ['<32>{#p/asriel2}* One left.']
            : spacetop
               ? ['<32>{#p/story}* Only Astro Serf remains.']
               : ['<32>{#p/story}* Only Tsunderidex remains.'],
      pyropeTsundere: () =>
         world.goatbro ? ['<32>{#p/asriel2}* The hot-headed army arrives.'] : ["<32>{#p/story}* It's a fiery cavalry!"],
      pyropeTsundereX: (pyrope: boolean) =>
         world.goatbro
            ? ['<32>{#p/asriel2}* One left.']
            : pyrope
               ? ['<32>{#p/story}* Only Hotwire remains.']
               : ['<32>{#p/story}* Only Tsunderidex remains.'],
      astigmatismMigospelX: ['<32>{#p/story}* Eyewalker Prime takes charge of this battle!']
   },

   b_opponent_glyde: {
      name: '* Glyde',
      epiphaNOPE: ['<11>{#p/basic}{~}{#e/glyde/10}Get that thing out of my face, will you?'],
      act_check: ['<32>{#p/story}* GLYDE - ATK YES DEF YES\n* Refuses to give more details about its statistics.'],
      act_secret: () =>
         glade()
            ? SAVE.data.b.w_state_steak && SAVE.data.b.w_state_soda
               ? ['<32>{#p/human}* (You tell Glyde the password given to you by Aaron.)']
               : ["<32>{#p/human}* (You try to tell Glyde a password, but you don't have any passwords to tell.)"]
            : ['<33>{#p/human}* (You try to tell Glyde a password, but it shakes its head and interrupts you.)'],
      act_flirt1: ['<32>{#p/human}* (You flirt with Glyde.)'],
      act_flirt2: ["<32>{#p/human}* (You try flirting with Glyde, but it doesn't elicit a response.)"],
      act_berate: ['<32>{#p/human}* (You berate Glyde.)\n* (Glyde laughs at the attempt.)'],
      fightEnder1: [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}... huh?',
         '<20>{#p/basic}{~}Did you just say \"triple beefcake deluxe?\"',
         '<20>{#p/basic}{~}{#e/glyde/9}...',
         '<20>{#p/basic}{~}{#e/glyde/10}So...',
         "<20>{#p/basic}{~}{#e/glyde/5}YOU'RE the one who purchased my product in the Outlands!",
         '<20>{#p/basic}{~}And, not only that...',
         '<20>{#p/basic}{~}But you remembered the password, too!'
      ],
      fightEnder2: [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}... huh?',
         '<20>{#p/basic}{~}Did you just say \"triple beefcake deluxe?\"',
         '<20>{#p/basic}{~}{#e/glyde/9}...',
         '<20>{#p/basic}{~}{#e/glyde/10}So...',
         '<20>{#p/basic}{~}{#e/glyde/5}Not only have you purchased my product...',
         '<20>{#p/basic}{~}{#e/glyde/12}But you even remembered the password??'
      ],
      fightEnder3: [
         "<20>{#p/basic}{~}{#e/glyde/5}Boy, you don't know how long I've been waiting to hear those wonderful words.",
         "<20>{#p/basic}{~}{#e/glyde/12}What can I say except you're one freakadacious fella!",
         '<20>{#p/basic}{~}{#e/glyde/9}...',
         "<20>{#p/basic}{~}{#e/glyde/10}Tell you what.\nSince you're so kind, I'll get outta your way and go bother someone else.",
         '<20>{#p/basic}{~}{#e/glyde/5}Kahaha!\nCatch ya on the flipside, G!'
      ],
      fightItem1: (zero: boolean) => [
         '<20>{#p/basic}{~}Woah, hey, is that what I think it is?',
         "<20>{#p/basic}{~}Well I'll be stoked!\nAlways good to meet a happy customer.",
         ...(zero ? [] : ['<20>{#p/basic}{~}Anyway, as I was saying...'])
      ],
      fightItem2: () => [
         '<20>{#p/basic}{~}{#e/glyde/5}That too!?',
         iFancyYourVilliany()
            ? '<20>{#p/basic}{~}{#e/glyde/12}Well gee, \"$(moniker2)\", you\'re not too shabby!'
            : "<20>{#p/basic}{~}{#e/glyde/12}Well gee, human, you're not too shabby!",
         '<20>{#p/basic}{~}{#e/glyde/9}...',
         "<20>{#p/basic}{~}{#e/glyde/10}Tell you what.\nSince you're so kind, I'll get outta your way and go bother someone else.",
         '<20>{#p/basic}{~}{#e/glyde/5}Kahaha!\nCatch ya on the flipside, G!'
      ],
      intro1: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}Kahaha, take that ya stupid robot!'],
      intro2a: () =>
         !world.badder_lizard
            ? ['<20>{#p/mettaton}ALPHYS AND I ARE STILL HERE, YOU KNOW.']
            : ["<20>{#p/mettaton}I'M STILL HERE, YOU KNOW."],
      intro2b: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}Quiet!\nThis is MY stage now, robo-freak.'],
      intro2c: ['<20>{#p/mettaton}(THIS IS ACTUALLY PRETTY INTERESTING.)'],
      intro3: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}Boy have I got a story to tell!'],
      status1: ['<32>{#p/story}* Glyde crashes in!'],
      turn1a: () => [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/10}Not gonna fight me, huh?',
         iFancyYourVilliany()
            ? '<20>{#p/basic}{~}{#e/glyde/0}... surprising, coming from a common villain like you.'
            : '<20>{#p/basic}{~}{#e/glyde/0}... you do you, I guess.'
      ],
      turn1b: () => [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/7}Ooh, I like your fighting spirit.',
         iFancyYourVilliany()
            ? '<20>{#p/basic}{~}{#e/glyde/10}Way to live up to your moniker, eh?'
            : "<20>{#p/basic}{~}{#e/glyde/10}That'll serve you well very soon..."
      ],
      turn1c: ["<20>{#p/basic}{~}{#e/glyde/10}Kahaha... no offense, but you're kinda sorta the wrong species."],
      turn1d: ["<20>{#p/basic}{~}{#e/glyde/9}Yeah, sorry, but I don't give out stats for free."],
      turn1e: [
         "<20>{#p/basic}{~}{#e/glyde/4}Some weeks ago, I'm musing over the moolah...",
         '<20>{#p/basic}{~}{#e/glyde/0}And I notice a drop in profits.'
      ],
      turnStatus1: ['<32>{#p/story}* Glyde sees its reflection and gets jealous.'],
      turn2: [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}It turns out my one- hundred percent legit business...',
         '<20>{#p/basic}{~}{#e/glyde/8}Is under fire for being a fraud!',
         '<20>{#p/basic}{~}{#e/glyde/1}And I\'m thinking to myself \"you\'ve gotta be kidding me.\"'
      ],
      turnStatus2: ['<32>{#p/story}* Glyde is thinking of new slang for the word \"cool.\"'],
      turn3: [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}I can assure you that my steak enterprise is the rarest thing out there.',
         '<20>{#p/basic}{~}Nothing compares to these fine fillets!',
         '<20>{#p/basic}{~}You hear me?\nNothing!'
      ],
      turnStatus3: ['<32>{#p/story}* An arrogant-smelling wind blows through.'],
      turn4: [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/0}Why should you care?',
         '<20>{#p/basic}{~}{#e/glyde/2}Because...',
         '<20>{#p/basic}{~}{#e/glyde/2}Er...',
         "<20>{#p/basic}{~}{#e/glyde/5}Because you're the only one who can save my sales figures!"
      ],
      turnStatus4: ['<32>{#p/story}* Glyde does fancy flips.'],
      turn5: () => [
         iFancyYourVilliany()
            ? '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}With the infamous \"$(moniker2)\" by my side, nothing can stop me!'
            : "<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}With MTT's precious human on my side, nothing can stop me!",
         "<20>{#p/basic}{~}{#e/glyde/7}Even the great Papa Gliden could only dream of the profits we'd make together!"
      ],
      turn5a: ["<20>{#p/alphys}I don't think attacking them is a great way to get them on your side."],
      turn5b: [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/1}It\'s called a \"show of strength,\" buck-teeth{#x1}.',
         '<20>{#p/basic}{~}{#e/glyde/9}How else am I supposed to earn the respect of my business partners?'
      ],
      turn5c: ["<20>{#p/basic}{~}{#e/glyde/10}Exactly.\nYou don't know anything."],
      turnStatus5: ['<32>{#p/story}* Glyde is giving itself a high five... somehow.'],
      turn6a: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}So whaddya say, huh?'],
      turn6b: ['<20>{#p/basic}{#p/basic}{~}Crud.'],
      turn6c: () => [
         '<20>{#p/basic}{#e/bpants/12}Why do I ALWAYS end up taking out the trash around here?',
         '<20>...',
         '<20>{#e/bpants/0}Sorry for the trouble, little buddy.',
         "<20>{#e/bpants/11}I'm Burgie.\nNice to meet ya.",
         ...(ateThreshold() || (world.badder_lizard && world.bad_lizard > 1)
            ? [
               "<20>{#e/bpants/6}Glyde's been a problem around here for...",
               "<20>{#e/bpants/12}... hey, you're that kid who's been killing people!"
            ]
            : burger()
               ? [
                  "<20>{#e/bpants/6}Glyde's been a problem around here for...",
                  "<20>{#e/bpants/12}... hey, you're that kid who killed everyone in Starton!"
               ]
               : world.population === 0 && world.bullied
                  ? [
                     "<20>{#e/bpants/6}Glyde's been a problem around here for...",
                     "<20>{#e/bpants/12}... hey, aren't you that kid who's been beating everyone up?"
                  ]
                  : [
                     "<20>{#e/bpants/6}Glyde's been a problem around here for quite a while...",
                     "<20>{#e/bpants/1}Hopefully this latest stunt will get it to realize nobody's buying its crap anymore."
                  ])
      ],
      turn6d: [
         '<20>{#p/mettaton}BURGERPANTS!',
         "<20>IT'S SO VERY GREAT TO SEE YOU.",
         "<20>(DON'T WORRY, I CUT THE LIVE TV FEED AS SOON AS I SAW YOU COMING.)"
      ],
      turn6e: () =>
         ateThreshold()
            ? [
               "<20>{#p/basic}{#e/bpants/12}Don't you realize what you're dealing with here?",
               '<20>{#e/bpants/3}What the HELL are you doing putting THEM on TV!?'
            ]
            : ["<20>{#p/basic}{#e/bpants/12}I don't work for you anymore. Get lost."],
      turn6f: () =>
         ateThreshold()
            ? ['<20>{#p/mettaton}WOW, SORRY...', "<20>I DIDN'T KNOW IT WAS A CRIME TO HOST A TV SHOW."]
            : ['<20>{#p/mettaton}WOW, SORRY...', "<20>I DIDN'T KNOW YOU DISLIKED ME THAT MUCH."],
      turn6g: [
         '<20>{#p/basic}{#e/bpants/12}...',
         "<20>{|}{#p/basic}{#e/bpants/2}I seriously just can't with this guy I swear to go- {%}"
      ],
      turn6h: [
         "<20>{#p/mettaton}A-NY-WAY WE HAVE THINGS TO GET TO SO IF YOU DON'T MIND {%}",
         '<20>WOULD YOU KINDLY GET OFF THE STAGE PLEASE AND THANK YOU HAVE A GREAT DAY.'
      ],
      hurtStatus: ['<32>{#p/story}* Glyde is in danger.']
   },

   b_opponent_mettaton1: {
      artifact: ['<33>{#p/human}* (Mettaton shrugs at the sight.)'],
      name: '* Mettaton',
      epiphaNOPE: ["<20>{#p/mettaton}I DON'T THINK SO, DARLING..."],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)\n* (Mettaton absorbs its charge.)'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)\n* (Mettaton is unaffected.)'
      ],
      old_spray_text: ['<32>{#p/human}* (You use the spray.)\n* (Sweet...)\n* (Mettaton eats it up.)'],
      old_gun_talk: ['<20>{#p/mettaton}HOW STUNNING A MOVE.'],
      old_bomb_talk: ["<20>{#p/mettaton}IT'S LIKE A RENT-FREE MIST MACHINE!"],
      old_spray_talk: ['<20>{#p/mettaton}SPICY.'],
      status1: () =>
         SAVE.data.n.plot < 67
            ? ['<32>{#p/story}* Mettaton swings into action!']
            : ['<32>{#p/story}* Mettaton returns!'],
      act_check: () =>
         SAVE.data.n.plot < 67
            ? ['<32>{#p/story}* METTATON - ATK 30 DEF 255\n* His metal body renders him invulnerable to attack.']
            : ['<32>{#p/story}* METTATON - ATK 30 DEF 255\n* Seriously, his metal body is invulnerable!'],
      act_flirt: ['<32>{#p/human}* (You flirt with Mettaton.)'],

      yellow1: () =>
         world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
            ? [
               '<20>{#p/mettaton}WHAT IS IT WITH YOU AND THE COLOR RED?{^40}{%}',
               "<20>{#p/mettaton}{#x1}YOU SHOULD KNOW BY NOW THAT'S NOT GOING TO FLY HERE...{^40}{%}"
            ]
            : [
               "<20>{#p/mettaton}OH, DARLING, WHAT'S THAT I SEE?\nTHE COLOR RED?{^40}{%}",
               "<20>{#p/mettaton}{#x1}MY, MY... YOU'VE GOTTEN AWAY WITH THAT COLOR FOR FAR TOO LONG!{^40}{%}"
            ],
      yellow2: () => [
         world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
            ? '<20>{#p/mettaton}WOW!!!\nSO MUCH BETTER!!!\nNOW YOU CAN PRESS [Z] TO SHOOT!!!{^40}{%}'
            : "<20>{#p/mettaton}ISN'T MAGIC JUST A WONDERFUL THING???\nNOW YOU CAN PRESS [Z] TO SHOOT!!!{^40}{%}",
         "<20>{#p/mettaton}(YOU CAN ALSO HOLD [C] TO SHOOT, BUT WHERE'S THE FUN IN THAT.){^40}{%}"
      ],

      checkTalk: ["<20>{#p/mettaton}ADMIRING ALPHYS'S FABULOUS BODYWORK?\nI WON'T JUDGE."],
      attackTalk: () =>
         SAVE.data.n.plot < 67
            ? ["<20>{#p/mettaton}YOU SILLY GOOSE.\nTHAT'S NOT GOING TO WORK ON ME, SWEETHEART!"]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}LISTEN, SWEETHEART.\nI'VE HAD ENOUGH PAIN TODAY AS IT IS.\nDO YOU MIND?"]
               : ["<20>{#p/mettaton}LISTEN, SWEETHEART.\nATTACKING ME WON'T DO YOU ANY FAVORS.\nESPECIALLY NOT NOW."],
      flirtTalk: ['<20>{#p/mettaton}OHOHO...', '<20>GETTING FRISKY, EH?', "<20>I'LL HAVE TO REMEMBER THAT, DARLING~"],

      turn1: [
         "<20>{#p/mettaton}LET'S START WITH SOMETHING SIMPLE...",
         '<20>SINGING!',
         '<20>{|}DO YOU HAVE WHAT IT TAKES TO- {%}'
      ],
      turn1a1: ['<20>...\nWAIT A SECOND.', '<20>IS IT JUST ME, OR...', '<20>DO YOU LOOK A LITTLE \"RED\" TODAY?'],
      turn1a2: ['<20>DOCTOR, IF YOU COULD...'],
      turn1b1: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ["<20>{#p/alphys}Okay, okay!\nI-I'll do it!"]
            : world.bad_lizard < 1
               ? ['<20>{#p/alphys}Uh, sure!']
               : ['<20>{#p/alphys}... hm?'],
      turn1b2: () =>
         SAVE.data.n.state_foundry_undyne > 0 || world.bad_lizard < 1
            ? ['<20>{#p/alphys}F-forgive me...']
            : ['<20>{#p/alphys}O-oh yeah, that.'],
      turn1c: ['<20>{*}{#p/mettaton}MUCH BETTER.{^30}{%}'],
      turn1d: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{*}{#p/alphys}N-now try pressing\n[Z] to teleport.{^30}{%}']
            : world.bad_lizard < 1
               ? ['<20>{*}{#p/alphys}So... y-you move around, then you press [Z] to teleport!{^30}{%}']
               : ['<20>{*}{#p/alphys}Move around, then press [Z] to teleport.{^30}{%}'],
      turn1e: ['<20>{*}{#p/mettaton}ALPHYS, ALPHYS, ALPHYS...{^30}{%}'],
      turn1f: ['<20>{*}WHAT HAVE I TOLD YOU ABOUT HANDING OUT HINTS?{^30}{%}'],
      turn1g: ['<20>{*}...{^30}{%}', '<20>{*}ANYWAY...{^30}{%}', "<20>{*}LET'S GET THIS SHOW ON THE ROAD!{^30}{%}"],

      turn2: ["<20>{#p/mettaton}DON'T MISS A SINGLE NOTE, MY DEAR!"],
      turn3: ["<20>{#p/mettaton}LET'S KICK THINGS UP A NOTCH."],

      turn4a1: [
         "<20>{#p/mettaton}I MUST SAY, YOU'RE HANDLING THIS LIKE A TRUE ICON.",
         '<20>BUT, CAN YOU GO FIN-TO-FIN WITH OUR SPECIAL GUEST?'
      ],
      turn4a2: [
         "<20>{#p/mettaton}I MUST SAY, YOUR PERFORMANCE THUS FAR HASN'T BEEN THE BEST.",
         '<20>PERHAPS WHAT YOU NEED IS A LITTLE COMPETITION!'
      ],
      turn4e: ['<20>{#p/mettaton}...', '<20>WHERE IS...'],
      turn4f: ["<20>{#p/basic}She's dead."],
      turn4g: ["<20>{#p/mettaton}OH.\nTHAT'S A SHAME."],
      turn4h: ['<20>{#p/mettaton}DEAR AUDIENCE... LET US OFFER A MOMENT OF SILENCE FOR SHYREN.'],
      turn4i: ['<20>{#p/mettaton}OKAY, MOMENT OVER.'],
      turn4j: () => [
         iFancyYourVilliany() ? '<20>{#p/mettaton}LUCKY YOU, $(moniker3u)!' : '<20>{#p/mettaton}LUCKY YOU!',
         '<20>I GUESS YOU GET TO SKIP THIS PART.',
         "<20>IT'S A REAL SHAME WE CAN'T KEEP SINGING, BUT HEY...",
         '<20>WHEN ONE ACT ENDS, ANOTHER MUST BEGIN.',
         "<20>... LET'S DANCE!"
      ],

      turn5a1: ["<20>{#p/mettaton}GIVE IT ALL YOU'VE GOT, SHYREN!"],
      turn5a2: () =>
         SAVE.data.b.bullied_shyren
            ? ['<20>{#p/mettaton}SHYREN...?']
            : [
               '<20>{#p/mettaton}ENCHANTING, EH?',
               "<20>{#p/mettaton}DON'T WORRY.\nSHYREN'S VOICE DOES THAT TO EVERYONE."
            ],

      turn5end1: () =>
         SAVE.data.b.bullied_shyren
            ? [
               "<20>{#p/mettaton}... MAYBE SHYREN'S JUST NOT FEELING IT TODAY.",
               '<20>HOW TRAGIC.',
               '<20>BY THE WAY, DID I MENTION YOUR VOICE IS GETTING BORING?'
            ]
            : [
               "<20>{#p/mettaton}OH, SHYREN IS JUST LOVELY, ISN'T SHE?",
               "<20>IF I HAD MY WAY WITH HER, SHE'D BE A SUPERSTAR ALREADY...",
               '<20>OH WELL. BY THE WAY, DID I MENTION YOUR VOICE IS GETTING BORING?'
            ],
      turn5end2: [
         "<20>BUT DON'T WORRY, THE SOLUTION HERE IS OBVIOUS.",
         "<20>AS ANY GOOD SHOW-BOT KNOWS, YOU CAN'T HAVE THE SONG...",
         '<20>... WITHOUT THE DANCE!'
      ],

      turn6: ['<20>{#p/mettaton}BRING IT ON!'],

      turn7a: [
         '<20>{#p/mettaton}DO YOU HEAR THAT, DARLING...?',
         "<20>... THAT'S RIGHT.",
         '<20>THE VIEWERS ARE STARVING FOR SOME DRAMA!',
         '<20>QUEUE THE OBLIGATORY ANGRY MANNEQUIN.'
      ],
      turn7b1: ['<20>{#p/basic}You again.'],
      turn7b2: ['<20>{#p/basic}You again!'],
      turn7b3: ['<20>{#p/basic}YOU AGAIN!!!'],
      turn7c: ['<20>{#p/mettaton}OH, DO YOU TWO KNOW EACH OTHER?'],
      turn7d1: ['<20>{#p/basic}...\nMaybe.\nMaybe not.'],
      turn7d2: ["<20>{#p/basic}LIKE YOU'D CARE!"],
      turn7e: [
         '<20>{#p/mettaton}WOAH, NO NEED TO GET HOSTILE...',
         '<20>{#p/mettaton}THIS IS BUT A HUMBLE TALENT SHOW!'
      ],
      turn7f: [
         "<20>{#p/basic}And this is the second time in two weeks that you've had me on!",
         '<20>{#p/basic}Do you have a crush on me or something!?'
      ],
      turn7g1: [
         "<20>{#p/mettaton}...\nDON'T BE RIDICULOUS.",
         "<20>{#p/mettaton}I'VE ONLY BROUGHT YOU ON BECAUSE YOU'RE A MAGNET FOR DRAMA!"
      ],
      turn7g2: ["<20>{#p/basic}(That's what my cousin used to say...)"],
      turn7h: ['<20>{#p/basic}Oh, hey.\nGood to see you!'],
      turn7i: ["<20>{#p/mettaton}THAT'S IT...?", '<20>{#p/mettaton}NOTHING ELSE TO SAY...?'],
      turn7j1: ["<20>{#p/basic}You know, Mettaton, I'm not ALWAYS mad at everyone."],
      turn7j2: ["<20>{#p/basic}... didn't I tell you this when you brought me on two weeks ago?"],
      turn7k: [
         "<20>{#p/mettaton}OH.\nTHAT'S NICE.",
         "<20>{#p/mettaton}BUT WE DON'T HAVE TIME FOR YOUR LOVEY-DOVEY NONSENSE."
      ],
      turn7l1: ['<20>{#p/basic}Yeah, yeah...', "<20>{#p/basic}(Wait, that's what my cousin used to say...)"],
      turn7l2: ["<20>Okay, I'll deal."],
      turn7l3: ["<20>If a fight's what you want, then a fight's what you'll get!"],
      turn7m: ['<20>{#p/mettaton}WELL, THIS SHOULD BE INTERESTING.'],
      turn7n: ['<20>{#p/mettaton}UH... HELLO?'],
      turn7o1: () => [
         ...(iFancyYourVilliany()
            ? ['<20>{#p/mettaton}...', '<20>IT SEEMS OUR DEAR $(moniker2u) HAS BEEN LEFT WITHOUT A DANCE PARTNER.']
            : ['<20>{#p/mettaton}...', '<20>IT SEEMS OUR POOR, POOR HUMAN HAS BEEN LEFT WITHOUT A DANCE PARTNER.']),
         '<20>HOW UNFORTUNATE...',
         '<20>BUT THE SHOW MUST GO ON!'
      ],
      turn7o2: [
         '<20>{#p/mettaton}...',
         "<20>YOU'RE ON A HOT STREAK TODAY, DARLING.",
         "<20>SEEMS NOBODY'S INTERESTED OR ALIVE ENOUGH TO FACE YOU.",
         '<20>OH WELL...',
         '<20>THE SHOW MUST GO ON!'
      ],

      turn8a1: ['<20>{#p/mettaton}NO HOLDING BACK!'],
      turn8a2: ['<20>{#p/mettaton}TOO MUCH COTTON TO HANDLE, HUH?', '<20>{#p/mettaton}WELL, TOO BAD!'],

      turn8end1a: [
         "<20>{#p/mettaton}TO SAY I'M IMPRESSED WOULD BE AN UNDERSTATEMENT!",
         "<20>YOU'VE ABSOLUTELY NAILED IT.",
         '<20>DEAR VIEWERS, DO TAKE NOTES...',
         '<20>-THIS- IS HOW YOU PUT ON A SHOW.'
      ],
      turn8end1b: [
         '<20>{#p/mettaton}YOU MAY NOT HAVE THE GREATEST VOCAL CHOPS, BUT THIS DANCING... OOOOH!',
         '<20>SIMPLY SUPERB.'
      ],
      turn8end2b: () => [
         ...[
            [
               '<20>{#p/mettaton}WITH A NAME LIKE \"$(moniker1u),\" IT\'S NO SURPRISE YOU WERE SUCH A LETDOWN!',
               '<20>{#p/mettaton}I -HAD- WISHED FOR A BETTER OUTCOME...'
            ],
            ['<20>{#p/mettaton}WITH A NAME LIKE \"$(moniker1u),\" YOU\'D EXPECT A MORE -YOUTHFUL- SHOWING!'],
            ['<20>{#p/mettaton}WITH A NAME LIKE \"$(moniker1u),\" YOU\'D HOPE TO BE BLOWN AWAY!'],
            ['<20>{#p/mettaton}WITH A NAME LIKE \"$(moniker1u),\" YOU\'D THINK YOUR SKILLS WOULD BE MAD!'],
            ['<20>{#p/mettaton}WITH A NAME LIKE \"$(moniker1u),\" YOU\'D HOPE TO HAVE STOLEN THE SHOW!']
         ][SAVE.data.n.state_aerialis_moniker],
         "<20>{#p/mettaton}BUT I GUESS IT JUST WASN'T MEANT TO BE."
      ],
      turn8end2a: () => [
         ...[
            [
               "<20>{#p/mettaton}WELL, $(moniker3u), I CAN'T SAY I EXPECTED THIS!",
               '<20>{#p/mettaton}I -WAS- EXPECTING ANOTHER LETDOWN, BUT...'
            ],
            ['<20>{#p/mettaton}WELL, DEAR $(moniker1u)...', "<20>IT'S SAFE TO SAY YOUR SKILLS ARE BEYOND YOUR YEARS!"],
            ['<20>{#p/mettaton}WELL, DEAR $(moniker1u)...', '<20>THIS PERFORMANCE DESERVES THUNDEROUS APPLAUSE!'],
            ['<20>{#p/mettaton}WELL, DEAR $(moniker1u)...', '<20>IT SEEMS OUR VIEWERS ARE FIRED UP!'],
            ['<20>{#p/mettaton}WELL, DEAR $(moniker1u)...', "<20>YOU'VE REALLY MADE THIS STAGE YOUR OWN!"]
         ][SAVE.data.n.state_aerialis_moniker],
         "<20>{#p/mettaton}PERHAPS THERE'S HOPE FOR YOU AFTER ALL."
      ],
      turn8end3a: [
         "<20>{#p/mettaton}... I HONESTLY DON'T UNDERSTAND HOW YOU CAN BE THIS BAD.",
         '<20>ESPECIALLY AFTER YOU DID SO WELL EARLIER.',
         '<20>OH WELL.\nIT HAPPENS, I GUESS.'
      ],
      turn8end3b: [
         '<20>{#p/mettaton}... HAS ANYONE EVER TOLD YOU HOW MUCH YOU SUCK?',
         '<20>SCREWING UP A VOCAL PERFORMANCE WAS ONE THING.',
         '<20>BUT THIS...?\nTHIS IS JUST SAD.'
      ],
      turn8end4: ['<20>{#p/mettaton}ALAS... WE STILL HAVE ONE MORE ACT TO FOLLOW.'],
      turn8end5: ['<20>{#p/mettaton}BEAUTIES AND GENTLEBEAUTIES...', '<20>GIVE IT UP...'],
      turn8end6: ['<20>FOR THE ONE AND ONLY DR. ALPHYS!'],

      turn9a: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{|}{#p/mettaton}HOW WELL WILL YOU FARE AGAINST- {%}']
            : ['<20>{#p/mettaton}HOW WELL WILL YOU FARE AGAINST THIS, THE FINAL CHALLENGE?'],
      turn9b: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{#p/alphys}N-no!']
            : world.bad_lizard < 1
               ? ['<20>{*}{#p/alphys}Are you k-kidding?{^30}{%}']
               : ['<20>{*}{#p/alphys}{#e/alphys/7}...'],
      turn9bx: ["<20>{#p/alphys}You can't force me to do something I don't want to."],
      turn9c: ["<20>{*}{#p/alphys}I don't...{^30}{%}"],
      turn9d: ['<20>{*}{#p/alphys}I...{^30}{%}'],
      turn9e: () =>
         world.bad_lizard < 1
            ? ["<20>{#p/alphys}I c-can't do it!"]
            : ["<20>{#p/alphys}{#e/alphys/4}I'm not sure if this is a good idea."],

      turn9end1: ['<20>{#p/mettaton}IS THERE A PROBLEM, DEAR?'],
      turn9end2: () => [
         ...[
            [
               "<20>{#p/alphys}{#e/alphys/4}I don't want t-to hurt them, Mettaton...",
               '<20>{#p/alphys}{#e/alphys/7}We might have a rough history with humans, but...',
               "<20>{#e/alphys/6}That doesn't mean this human can't be different, right?",
               "<20>{#e/alphys/8}So... I think it's totally unfair to keep attacking them for it."
            ],
            [
               "<20>{#p/alphys}{#e/alphys/7}I know they've made some... pretty bad mistakes...",
               '<20>{#p/alphys}{#e/alphys/6}But, then again, with the way some monsters have treated them...?',
               "<20>{#p/alphys}{#e/alphys/8}That's no surprise.",
               "<20>{#p/alphys}{#e/alphys/4}And also, I'm... k-kind of afraid I might hurt them..."
            ]
         ][world.bad_lizard]
      ],
      turn9end3: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{#p/mettaton}WELL...', '<20>IF YOU SAY SO, DOCTOR.']
            : ['<20>{#p/mettaton}HMM...', '<20>YOU MAKE AN INTERESTING POINT, DOCTOR.'],
      turn9end4: ["<20>BUT I'M AFRAID I HAVE TO DISAGREE.{#e/alphys/1}"],
      turn9end5: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ["<20>IT'S JUST A SHAME THE VIEWERS WON'T GET TO SEE WHAT HAPPENS.{#e/alphys/28}"]
            : [
               '<20>FOR ONE, CONFLICT IS THE HEART OF GOOD TV DRAMA!{#e/alphys/2}',
               '<20>AND WHO COULD SAY NO TO THAT.'
            ],
      turn9end6: [
         "<20>{#p/mettaton}{#e/alphys/0}WELL, ANYWAY, WE'RE KIND OF OUT OF TIME.",
         "<20>SO... THAT'LL HAVE TO BE ALL FOR NOW.",
         '<21>STAY TUNED, FOLKS!\nTHE NEXT EPISODE IS ALREADY IN THE WORKS.',
         "<20>YOU WON'T WANT TO MISS IT."
      ],
      turn9end7a: ['<20>{#p/alphys}Welp.'],
      turn9end7b: ["<20>{#p/alphys}Seriously?\nYou didn't even miss a single time."],
      turn9end7c: ['<20>{#p/alphys}...'],

      turn1status: ["<32>{#p/story}* It's electro-shockin' time."],
      turn2status: ['<32>{#p/story}* Mettaton claps his robo-hands.'],
      turn3status: ["<32>{#p/story}* It's a flurry of octaves."],
      turn4status: ["<32>{#p/story}* Shyren's voice echoes through the laboratory."],
      turn4statusX: ['<32>{#p/story}* Mettaton dare not shed a tear.'],
      turn5status: ['<32>{#p/story}* Mettaton busts a move.'], 
      turn6status: ['<32>{#p/story}* Funk overload in progress.'],
      turn7status: ['<32>{#p/story}* Smells like a madhouse.'],
      turn7statusX: ['<32>{#p/story}* Mettaton is fiddling with his microphone.'],
      turn8status: ['<32>{#p/story}* Mettaton points dramatically at the camera.'],

      turn2react1: ['<20>{#p/mettaton}NICE!'],
      turn3react1: ['<20>{#p/mettaton}VERY NICE!'],
      turn4react1: ['<20>{#p/mettaton}FABULOUS!'],
      turn5react1: ['<20>{#p/mettaton}OUTSTANDING!'],
      turn6react1: ['<20>{#p/mettaton}STELLAR!'],
      turn7react1: ["<20>{#p/mettaton}THAT'S THE WAY!"],
      turn8react1: ["<20>{#p/mettaton}SHOW 'EM HOW IT'S DONE!"],
      turn8reactMD1a: ['<20>{#p/basic}Well, that was a blast!', '<20>{#p/basic}See ya next time, human!'],
      turn8reactMD2a: ['<20>{#p/basic}...', '<20>{#p/basic}Never again.'],

      turn2react2: ['<20>{#p/mettaton}OOPS...'],
      turn3react2: ['<20>{#p/mettaton}SO CLOSE...'],
      turn4react2: ['<20>{#p/mettaton}HOW UNLUCKY...'],
      turn5react2: ['<20>{#p/mettaton}HOW UNFORTUNATE...'],
      turn6react2: ['<20>{#p/mettaton}FAILURE!'],
      turn7react2: ['<20>{#p/mettaton}DISAPPOINTING.'],
      turn8react2: ['<20>{#p/mettaton}WHAT. WAS. THAT.'],
      turn8reactMD1b: ["<20>{#p/basic}Hope I didn't go too hard on you.", '<20>{#p/basic}See ya next time, human!'],
      turn8reactMD2b: ['<20>{#p/basic}Pathetic.\nPathetic!\nPATHETIC!', '<20>{#p/basic}Serves you right.'],
      missIndicator: 'Misses: $(x)',

      idleTalk1: () =>
         world.bad_lizard < 2 && !iFancyYourVilliany()
            ? [
               "<20>{#p/mettaton}SO WE'VE MADE IT TO THE END, EH?",
               "<20>{#p/mettaton}HOW DOES IT FEEL KNOWING YOU'RE ABOUT TO BE A SUPERSTAR?"
            ]
            : [
               "<20>{#p/mettaton}SO WE'VE MADE IT TO THE END, EH?",
               "<20>{#p/mettaton}HOW DOES IT FEEL KNOWING YOU'RE ABOUT TO MEET YOUR END?"
            ],
      idleTalk2: () =>
         iFancyYourVilliany()
            ? ['<20>{#p/mettaton}THOSE YOU\'VE HURT ARE SURELY \"TURNING\" IN THEIR SLEEP.']
            : world.bad_lizard < 2
               ? ['<20>{#p/mettaton}I\'M SURE YOU\'RE ITCHING TO \"TURN\" YOUR LIFE AROUND.']
               : ['<20>{#p/mettaton}THOSE YOU\'VE KILLED ARE SURELY \"TURNING\" IN THEIR GRAVES.'],
      idleTalk3: ['<20>{#p/mettaton}LET\'S JUST HOPE THINGS DON\'T TAKE A \"TURN\" FOR THE WORST.'],
      idleTalk4: () =>
         world.bad_lizard < 2
            ? ['<20>{#p/mettaton}I MUST SAY, HAVING YOU ON STAGE WITH ME IS A REAL \"TURN\" ON.']
            : ['<20>{#p/mettaton}I MUST SAY, THIS WHOLE SITUATION IS A REAL \"TURN\" OFF.'],
      idleTalk5: ["<20>{#p/mettaton}(YOU'RE SUPPOSED TO TURN ME AROUND.)"],
      idleTalk6: ['<20>{#p/mettaton}...'],
      flirtTalk1: () =>
         SAVE.data.b.flirt_mettaton
            ? [
               '<20>{#p/mettaton}BACK TO YOUR FLIRTATIOUS WAYS, EH...?',
               '<20>{#p/mettaton}YOU, MY FRIEND, ARE A TRUE MENACE TO SOCIETY.'
            ]
            : ['<20>{#p/mettaton}OHOHO...', '<20>...', '<20>MAYBE YOU SHOULD HOLD OFF ON THAT FOR NOW.'],
      flirtTalk2: () =>
         SAVE.data.b.flirt_mettaton
            ? ["<20>{#p/mettaton}DON'T YOU EVER KNOW WHEN TO QUIT?"]
            : ['<20>{#p/mettaton}OR YOU COULD JUST KEEP GOING.'],
      flirtTalk3: () =>
         SAVE.data.b.flirt_mettaton ? ['<20>{#p/mettaton}I GUESS NOT.'] : ['<20>{#p/mettaton}AND GOING.'],
      flirtTalk4: ["<20>{#p/mettaton}...\nI FEEL LIKE THERE'S SOMETHING BETTER YOU COULD BE DOING."],
      flirtTalk5: ['<20>{#p/mettaton}...'],
      act_turn: ["<32>{#p/human}* (You tell Mettaton there's a mirror behind him.)"],
      turnTalk1: ['<20>{#p/mettaton}A MIRROR, YOU SAY?', '<20>OH RIGHT, I HAVE TO LOOK PERFECT FOR OUR GRAND FINALE!'],
      turnTalk2: ["<20>{#p/mettaton}HMM, WHERE IS IT?\nI DON'T SEE IT..."],
      turnTalk3: ['<20>{#p/mettaton}DID YOU.', '<20>JUST FLIP.', '<20>MY SWITCH??'],
      turnTalk4: () =>
         world.bad_robot
            ? [
               '<18>{#p/mettaton}Ohoho...',
               '<18>If you thought I had style before, just wait until you see me now.',
               '<18>Faster.\nStronger.\nLighter than ever.',
               "<18>I've fused with my own body.",
               "<19>It's a shame you can only be so violent on live TV, don't you think?",
               "<19>But that's alright.",
               '<18>Just this once, just for you...'
            ]
            : [
               '<18>{#p/mettaton}Ohhhh my.',
               '<18>If you flipped my switch, that can only mean one thing.',
               ...(iFancyYourVilliany()
                  ? [
                     "<18>You're desperate to face off against my final form.",
                     '<18>How impatient...',
                     "<18>Lucky for you, I've been aching to whip it out for a long time.",
                     "<18>So, as thanks, I'll make sure you go out in style.",
                     "<18>I'll make this final confrontation..."
                  ]
                  : [
                     "<18>You're desperate for the premiere of my new body.",
                     '<18>How impatient...',
                     "<18>Lucky for you, I've been aching to show it off for a long time.",
                     "<18>So, as thanks, I'll give you a handsome reward.",
                     "<18>I'll make your last living moments..."
                  ])
            ],
      turnTalk5: () =>
         world.bad_robot
            ? ["<18>{*}... we're going off the air."]
            : iFancyYourVilliany()
               ? ['<18>{#p/mettaton}{*}... absolutely fantastic!']
               : ['<18>{#p/mettaton}{*}... absolutely beautiful!'],
      act_burn: ['<32>{#p/human}* (You roast Mettaton on his own TV show.)'],
      burnTalk1: ['<20>{#p/mettaton}IS THAT THE BEST YOU CAN MANAGE?'],
      burnTalk2: ['<20>{#p/mettaton}EVEN ALPHYS COULD DO BETTER THAN THAT.'],
      burnTalk3: ["<20>{#p/mettaton}NO OFFENSE, BUT YOU'RE NOT VERY GOOD AT THIS."],
      burnTalk4: ['<20>{#p/mettaton}...\nMAYBE YOU SHOULD TRY DOING SOMETHING ELSE.'],
      burnTalk5: ['<20>{#p/mettaton}...']
   },

   b_opponent_mettaton2: {
      artifact: () => [
         '<33>{#p/human}* (Mettaton shrugs at the sight.)',
         ...(world.genocide || world.bad_robot ? [] : ['<32>{#p/basic}* The audience shrugs, too.'])
      ],
      epiphaNOPE: () =>
         world.genocide || world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/25}That party trick won't work on me, darling."]
            : iFancyYourVilliany()
               ? ["<20>{#p/mettaton}{#e/mettaton/19}You know, this doesn't seem like your style."]
               : ['<20>{#p/mettaton}{#e/mettaton/19}Time and a place, darling...'],
      hint: ["<32>{#p/basic}* Okay, partner...\n* It's all up to you now."],
      name: () => (world.genocide ? '* Mettaton NEO' : world.bad_robot ? '* Mettaton SIGMA' : '* Mettaton EX'),
      spannerReaction: (repeat: boolean) =>
         world.genocide
            ? ['<32>{#p/human}* (You throw the spanner.)\n* (Mettaton blasts it right out of the air.)']
            : world.bad_robot
               ? [
                  '<32>{#p/human}* (You throw the spanner.)\n* (Mettaton takes it and breaks it over your head.)',
                  "<32>{#p/basic}* That's gotta hurt!"
               ]
               : repeat
                  ? iFancyYourVilliany()
                     ? [
                        '<32>{#p/human}* (You throw the spanner.)\n* (Mettaton kicks it back at you with a passion.)',
                        '<32>{#p/basic}* The crowd yawns...'
                     ]
                     : [
                        '<32>{#p/human}* (You throw the spanner.)\n* (Mettaton catches it in his mouth and tosses it back.)',
                        '<32>{#p/basic}* The crowd yawns...'
                     ]
                  : iFancyYourVilliany()
                     ? [
                        '<32>{#p/human}* (You throw the spanner.)\n* (Mettaton kicks it back at you with a passion.)',
                        '<32>{#p/basic}* The crowd goes wild!'
                     ]
                     : [
                        '<32>{#p/human}* (You throw the spanner.)\n* (Mettaton catches it in his mouth and tosses it back.)',
                        '<32>{#p/basic}* The crowd goes wild!'
                     ],
      old_gun_text: () =>
         world.genocide || world.bad_robot
            ? ['<32>{#p/human}* (You fire the gun.)\n* (Nothing happens.)']
            : ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* The audience is stunned!'],
      old_bomb_text: () =>
         world.genocide || world.bad_robot
            ? ['<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)\n* (Nothing happens.)']
            : [
               '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
               '<32>{#p/basic}* The audience is daydreaming!'
            ],
      old_spray_text: () =>
         world.genocide || world.bad_robot
            ? ['<32>{#p/human}* (You use the spray.)\n* (Sweet...)\n* (Nothing happens.)']
            : ['<32>{#p/human}* (You use the spray.)\n* (Sweet...)', '<32>{#p/basic}* The audience is in shambles!'],
      act_check: () =>
         world.genocide
            ? ["<32>{#p/asriel2}* Mettaton.\n* Shouldn't you be attacking him or something?"]
            : world.bad_robot
               ? [
                  '<33>{#p/story}* METTATON SIGMA - ATK 255 DEF 42\n* An over-clocked, double-edged, human-killing machine.'
               ]
               : ['<32>{#p/story}* METTATON EX - ATK 47 DEF 47\n* His weak point is his heart-shaped core.'],
      act_cut1: ['<32>{#p/human}* (You begin to cut a wire...)'],
      act_cut2: ['<32>{#p/human}* (You resume cutting the wire...)'],
      act_cut3: ['<32>{#p/human}* (But there were no more wires to cut.)'],
      tvmReaction: {
         blookpie: () =>
            world.genocide || world.bad_robot
               ? [
                  '<32>{#p/basic}* The confection reminds Mettaton of someone he has to protect...',
                  "<32>{#p/story}* Mettaton's ATTACK up!\n* Mettaton's DEFENSE up!"
               ]
               : [
                  SAVE.data.b.a_state_hapstablook
                     ? '<32>{#p/basic}* The confection reminds Mettaton of someone special to him...'
                     : '<32>{#p/basic}* The confection reminds Mettaton of someone he once knew...',
                  "<32>{#p/story}* Mettaton's ATTACK down!\n* Mettaton's DEFENSE down!"
               ],
         radio: () =>
            world.bad_robot
               ? [
                  '<32>{#p/human}* (You give Mettaton the radio.)\n* (Mettaton plays death metal and screams in your face.)'
               ]
               : iFancyYourVilliany()
                  ? [
                     '<32>{#p/human}* (You give Mettaton the radio.)\n* (Mettaton plays orchestral music to hype up the battle.)'
                  ]
                  : [
                     '<32>{#p/human}* (You give Mettaton the radio.)\n* (Mettaton does karaoke, and the audience sings along.)'
                  ],
         fireworks: () =>
            world.bad_robot
               ? [
                  '<32>{#p/human}* (You give Mettaton fireworks.)\n* (Mettaton straps them to a rocket launcher and fires.)'
               ]
               : iFancyYourVilliany()
                  ? [
                     '<32>{#p/human}* (You give Mettaton fireworks.)\n* (Mettaton coordinates his attacks for dramatic effect.)'
                  ]
                  : [
                     '<32>{#p/human}* (You give Mettaton fireworks.)\n* (Mettaton sets them off, and the audience is left in awe.)'
                  ],
         mewmew: () =>
            world.bad_robot
               ? [
                  '<32>{#p/human}* (You give Mettaton the doll.)\n* (Mettaton rips it up and tosses the shreds asunder.)'
               ]
               : iFancyYourVilliany()
                  ? [
                     "<32>{#p/human}* (You give Mettaton the doll.)\n* (Mettaton isn't sure what to do and casts it away.)"
                  ]
                  : [
                     '<32>{#p/human}* (You give Mettaton the doll.)\n* (Mettaton presents it boldly, and the audience is in love.)'
                  ]
      },
      act_boast: [
         "<32>{#p/human}* (You say you aren't going to get hit at ALL.)",
         "<32>{#p/basic}* Ratings gradually increase during Mettaton's turn."
      ],
      act_heel: [
         '<32>{#p/human}* (You turn and scoff at the audience.)',
         "<32>{#p/basic}* They're rooting for your destruction this turn."
      ],
      act_pose0: () =>
         iFancyYourVilliany()
            ? [
               ['<32>{#p/human}* (You pose menacingly.)', '<32>{#p/basic}* The audience seems bored.'],
               ['<32>{#p/human}* (You pose menacingly.)', '<32>{#p/basic}* The audience seems annoyed.']
            ]
            : [
               ['<32>{#p/human}* (You pose dramatically.)', '<32>{#p/basic}* The audience seems bored.'],
               ['<32>{#p/human}* (You pose dramatically.)', '<32>{#p/basic}* The audience seems annoyed.']
            ],
      act_pose1: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You pose menacingly.)',
               '<32>{#p/basic}* The audience is impressed by your strong aura!'
            ]
            : ['<32>{#p/human}* (You pose dramatically.)', '<32>{#p/basic}* The audience nods.'],
      act_pose2: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You pose menacingly.)',
               "<32>{#p/basic}* The audience isn't impressed by your weak aura."
            ]
            : ['<32>{#p/human}* (You pose dramatically.)', '<32>{#p/basic}* The audience applauds.'],
      act_pose3: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You pose menacingly.)',
               '<32>{#p/basic}* Your aura is so weak, the audience rolls their eyes...'
            ]
            : [
               '<32>{#p/human}* (Despite being wounded, you pose dramatically.)',
               '<32>{#p/basic}* The audience gasps.'
            ],
      act_pose4: () =>
         iFancyYourVilliany()
            ? ['<32>{#p/human}* (You pose menacingly.)', '<32>{#p/basic}* The audience is impressed by your stupidity?']
            : [
               '<32>{#p/human}* (With the last of your power, you pose dramatically.)',
               '<32>{#p/basic}* The audience screams.'
            ],
      act_scream0: [
         [
            '<32>{#p/human}* (You scream.)',
            "<32>{#p/basic}* The audience seems bored.\n* You'll move slower this turn."
         ],
         [
            '<32>{#p/human}* (You scream.)',
            "<32>{#p/basic}* The audience seems annoyed.\n* You'll move slower this turn."
         ]
      ],
      act_scream: [
         '<32>{#p/human}* (You scream.)',
         "<32>{#p/basic}* The audience gets riled up!\n* You'll move slower this turn."
      ],
      act_flirt0: [
         ['<32>{#p/human}* (You flirt with the audience.)', '<32>{#p/basic}* The audience seems bored...'],
         ['<32>{#p/human}* (You flirt with the audience.)', '<32>{#p/basic}* The audience seems annoyed...']
      ],
      act_flirt1: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You flirt with the audience.)',
               '<32>{#p/basic}* Your unexpected move takes the audience by surprise!'
            ]
            : ['<32>{#p/human}* (You flirt with the audience.)', '<32>{#p/basic}* The audience seems unreceptive...'],
      act_flirt2: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You flirt with the audience.)',
               '<32>{#p/basic}* Doubling down has the audience in a frenzy!'
            ]
            : ['<32>{#p/human}* (You flirt with the audience.)', '<32>{#p/basic}* The audience looks your way.'],
      act_flirt3: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You flirt with the audience.)',
               '<32>{#p/basic}* All this teasing is making the audience queasy...'
            ]
            : ['<32>{#p/human}* (You flirt with the audience.)', '<32>{#p/basic}* That got their attention!'],
      act_flirt4: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* (You flirt with the audience.)',
               "<32>{#p/basic}* The audience's confusion grows ever deeper."
            ]
            : ['<32>{#p/human}* (You flirt with the audience.)', '<32>{#p/basic}* The audience is enthralled!'],
      status1: (azzy_neo: number) =>
         [
            [
               "<33>{#p/asriel2}* I'm gonna try using a spell to wedge open the shield.\n* Get as many pickups as you can!"
            ],
            ['<32>{#p/asriel2}* Here we go again.']
         ][Math.min(azzy_neo, 1)],
      statusX: (hint = false) =>
         world.genocide
            ? ["<32>{#p/asriel2}* It's only a matter of time."]
            : world.bad_robot
               ? hint
                  ? ["<32>{#p/story}* Seems fighting won't get you any further here."]
                  : ['<32>{#p/story}* Electricity permeates through the room.']
               : ['<32>{#p/story}* Mettaton.'],
      statusY: ["<32>{#p/story}* It's a whirlwind of high- voltage electricity!"],
      turnTalk1: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}Sorry, darling... but if I DON'T go overkill...",
               "<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/3}I'd simply explode!"
            ]
            : ['<20>{#p/mettaton}Lights!\nCamera!\nAction!'],
      turnTalk2: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}... heh.\nPoetic, isn't it?",
               '<20>{#p/mettaton}{#e/mettaton/20}{#a.la/8}{#a.ra/8}Killing you is the only thing keeping me alive!'
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}Ghosts!\nDummies!\n... snails?']
               : !world.badder_lizard
                  ? ['<20>{#p/mettaton}Drama!\nRomance!\nBloodshed!']
                  : ['<20>{#p/mettaton}Karma!\nVengeance!\nPayback!'],
      turnTalk3: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/24}{#a.la/3}{#a.ra/0}But that's what sets me apart from all the others."]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}It's an emotional rollercoaster!"]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}It's time to put you in your place!"]
                  : !world.badder_lizard
                     ? ["<20>{#p/mettaton}I'm the idol everyone craves!"]
                     : ["<20>{#p/mettaton}I'll be the galaxy's superstar!"],
      turnTalk4: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}I couldn't give up even if I wanted to..."]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}It's a shame things had to be this way..."]
               : iFancyYourVilliany()
                  ? ['<20>{#p/mettaton}Smile for the camera, $(moniker2)!']
                  : !world.badder_lizard
                     ? ['<20>{#p/mettaton}Smile for the camera, darling!']
                     : ['<20>{#p/mettaton}Smile for the camera, hotshot!'],
      turnTalk5: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/9}{#a.ra/10}Now just you watch.\nI'll tear that rotten organ right out of your body!"
            ]
            : SAVE.data.b.a_state_hapstablook
               ? [
                  '<20>{#p/mettaton}But maybe you can help me make a choice here.',
                  '<20>{#p/mettaton}Queue the all- important pop quiz!'
               ]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}Oooh, it's time for a pop quiz!", '<20>Can your brains hold a candle to your brawn?']
                  : !world.badder_lizard
                     ? [
                        "<20>{#p/mettaton}Oooh, it's time for a pop quiz!",
                        '<20>{#p/mettaton}I sure hope you know your multiple- choice...'
                     ]
                     : [
                        "<20>{#p/mettaton}Oooh, here's a quiz for you.",
                        "<20>{#p/mettaton}Don't like multiple- choice?\nToo bad!"
                     ],
      turnTalk6: () =>
         world.bad_robot
            ? [
               '<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}What?\nYou call that cold thing a heart?',
               '<20>{#p/mettaton}{#e/mettaton/30}{#a.la/9}{#a.ra/10}... no.\nLet me show you what a REAL one looks like.'
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}Not so simple, is it?', '<20>... perhaps a heart to heart will lead us to the answer.']
               : SAVE.data.n.state_aerialis_mttanswer === 0
                  ? ['<20>{#p/mettaton}Your \"answer\" sure was underwhelming...', "<20>{#p/mettaton}But this won't be!"]
                  : iFancyYourVilliany()
                     ? [
                        '<20>{#p/mettaton}So you ARE smarter than you look.',
                        '<20>But a battle takes more than just basic knowledge.',
                        '<20>It takes heart!'
                     ]
                     : !world.badder_lizard
                        ? [
                           "<20>{#p/mettaton}Your answer really showed everyone what's on your mind.",
                           "<20>{#p/mettaton}Why don't I show you what's in my heart?"
                        ]
                        : ['<20>{#p/mettaton}So you DO like multiple choice.', "<20>{#p/mettaton}Well, you won't like this!"],
      turnTalk7: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}It's only a matter of time..."]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}It's not like I never loved the old life."]
               : iFancyYourVilliany()
                  ? ['<20>{#p/mettaton}You may be a demon, but can you dance like the devil?']
                  : !world.badder_lizard
                     ? ['<20>{#p/mettaton}Introducing... the double DJ disco!']
                     : ["<20>{#p/mettaton}The battle's only just begun!"],
      turnTalk8: () =>
         world.bad_robot
            ? ['<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}Until you inevitably lose to me.']
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}But it wasn't exactly glamorous, either..."]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}It's time to bring your a-game!"]
                  : !world.badder_lizard
                     ? ['<20>{#p/mettaton}Can you keep up the pace?']
                     : ['<20>{#p/mettaton}Turn it up to eleven!'],
      turnTalk9: () =>
         world.bad_robot
            ? ['<20>{#p/mettaton}{#e/mettaton/9}{#a.la/0}{#a.ra/5}Then, our kind will get to see the stars...']
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}Whatever, Who cares!']
               : !world.badder_lizard
                  ? ['<20>{#p/mettaton}Lights!\nCamera!\nPlastic explosives!']
                  : ['<20>{#p/mettaton}Destruction!\nAnnihilation!\nArmageddon!'],
      turnTalk10: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/7}... and I'm the one who's going to send them there!"]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}Nobody, that's who!"]
               : !world.badder_lizard
                  ? ['<20>{#p/mettaton}Things are blowing up!']
                  : ['<20>{#p/mettaton}Things are getting crazy!'],
      turnTalk11: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}It's a shame, really.\nAlphys, Asgore, even my cousins...",
               '<20>{#e/mettaton/12}{#a.la/8}{#a.ra/8}Those closest to me are all quick to avoid conflict.'
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}Let's just take a moment to think."]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}Nothing like a break to quell the enemy's fire!"]
                  : !world.badder_lizard
                     ? ['<21>{#p/mettaton}Time for our council- regulated break!']
                     : ["<20>{#p/mettaton}Can't catch a break?\nSucks to be you!"],
      turnTalk12: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}But me?\nI don't play by their lovey-dovey rules.",
               '<20>{#p/mettaton}{#e/mettaton/23}{#a.la/1}{#a.ra/6}I get straight to the heart of it!'
            ]
            : SAVE.data.b.a_state_hapstablook
               ? [
                  "<20>{#p/mettaton}I don't get why they had to be so confrontational...",
                  '<20>{#p/mettaton}... am I supposed to believe it was out of love?'
               ]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}It's time we got back to the heart of this conflict!"]
                  : !world.badder_lizard
                     ? [
                        "<20>{#p/mettaton}We've grown so distant, darling...",
                        '<20>{#p/mettaton}How about another heart-to-heart?'
                     ]
                     : [
                        "<20>{#p/mettaton}I think it's time you learned your lesson.",
                        "<20>{#p/mettaton}Here's something you can take to heart!"
                     ],
      turnTalk13: () =>
         world.bad_robot
            ? [
               '<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}... jeez.',
               "<20>{#e/mettaton/25}{#a.la/8}{#a.ra/8}You really are an annoying little bug, aren't you?"
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}A... and besides, how can I even trust them now?']
               : SAVE.data.b.a_state_armwrecker
                  ? ['<20>{#p/mettaton}A... arms?\nWh... who needs arms with legs like these?']
                  : ["<20>{#p/mettaton}I... is that all you've got?"],
      turnTalk14: () =>
         world.bad_robot
            ? [
               '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}But hey, you know what they say about a bug, right?',
               "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/9}{#a.ra/10}It's just another problem that needs fixing."
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}I d-don't... know what to think anymore..."]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}Let's h-hear... hear one last roar from the audience!"]
                  : !world.badder_lizard
                     ? ['<20>{#p/mettaton}Shoutout t-to... to Dr. Alphys for making my dreams come true!']
                     : ["<20>{#p/mettaton}Shoutout t-to... to the ones who've given their lives to protect us!"],
      turnTalk15: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/10}{#a.ra/0}Look.\nI don't blame you for fighting so valiantly.",
               '<20>{#p/mettaton}{#e/mettaton/19}{#a.la/0}{#a.ra/10}But, and I mean this in the best possible way...',
               "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}You'd have better chances against a wall of reinforced polycarbide."
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}Could it be that they're tr... truly sorry?"]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}There's no way I'm giv... giving up now!"]
                  : !world.badder_lizard
                     ? ["<20>{#p/mettaton}Now it's my turn to ful... fulfill all yours!"]
                     : ["<20>{#p/mettaton}I'll make sure your efforts we... weren't in vain!"],
      turnTalk16: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/0}What's that?\nYou don't care what I have to say?",
               '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}... feh.\nYour loss, darling!'
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}Or is it ju... just a ploy to get into the spotlight?']
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}Not after al... all we've been through!"]
                  : !world.badder_lizard
                     ? ["<20>{#p/mettaton}I wouldn't ha... have it any other way!"]
                     : ["<20>{#p/mettaton}It's the le... least I can do!"],
      turnTalk17: () =>
         world.bad_robot
            ? ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...']
            : ['<20>{#p/mettaton}{#e/mettaton/12}H... haah...\nH... haah...'],
      turnTalk18: () =>
         world.bad_robot
            ? [
               '<20>{#p/mettaton}{#e/mettaton/14}{#a.la/3}{#a.ra/0}Oh well.\nSome people just never learn...',
               "<20>{#e/mettaton/13}{#a.la/8}{#a.ra/8}But that's enough out of me.",
               "<20>{#e/mettaton/7}{#a.la/9}{#a.ra/10}I'll let my heart take it from here!"
            ]
            : ['<20>{#p/mettaton}{#e/mettaton/13}The show must go on...!'],
      audienceRec0: () =>
         SAVE.data.b.a_state_hapstablook
            ? [
               '<20>{#p/mettaton}{#e/mettaton/11}(Sigh...)',
               '<20>{#e/mettaton/29}Well...',
               '<20>{#e/mettaton/10}Would you look at that.',
               "<20>{#e/mettaton/20}This is the most viewers I've ever had...",
               "<20>{#e/mettaton/17}By now, we've reached the viewer call-in milestone.",
               '<20>{#e/mettaton/14}...',
               "<20>{#e/mettaton/15}Let's see what the audience has to say...",
               '<20>{#e/mettaton/12}... before we finish off our saga for good.'
            ]
            : [
               '<20>{#p/mettaton}{#e/mettaton/8}Ooh, look at these ratings...',
               "<20>{#e/mettaton/5}This is the most viewers I've ever had!",
               "<20>{#e/mettaton/7}By now, we've reached the viewer call-in milestone.",
               "<20>{#e/mettaton/15}Let's see what the audience has to say...",
               iFancyYourVilliany()
                  ? '<20>{#e/mettaton/19}... before the battle is over for real!'
                  : '<20>{#e/mettaton/19}... before we finish off our saga for good!'
            ],
      turnTalkX0a: () =>
         SAVE.data.b.a_state_hapstablook
            ? [
               '<20>{#p/mettaton}{#e/mettaton/15}No... I...',
               '<20>{#p/mettaton}{#e/mettaton/14}I still have to...',
               '<20>{#p/mettaton}{#e/mettaton/9}...',
               "<20>{#p/mettaton}{#e/mettaton/9}Blooky, if you're watching this, then...",
               "<20>{#p/mettaton}{#e/mettaton/10}Please don't feel bad, alright?",
               "<20>{#p/mettaton}{#e/mettaton/9}I shouldn't have pushed you away.",
               "<20>{#p/mettaton}{#e/mettaton/19}I shouldn't have acted like I didn't care.",
               '<20>{#p/mettaton}{#e/mettaton/17}Because... regardless of what happened in the past...',
               '<20>{#p/mettaton}{#e/mettaton/10}You, Lurksalot... all of you...',
               "<20>{#p/mettaton}{#e/mettaton/20}You're still my family!",
               "<20>{#p/mettaton}{#e/mettaton/15}So... forget everything else I've said.",
               "<20>{#p/mettaton}{#e/mettaton/9}From now on, it doesn't matter.",
               '<20>{#p/mettaton}{#e/mettaton/10}All that matters...'
            ]
            : iFancyYourVilliany()
               ? [
                  '<20>{#p/mettaton}{#e/mettaton/14}...',
                  "<20>{#p/mettaton}{#e/mettaton/15}So that's how it is, is it?",
                  '<20>{#p/mettaton}{#e/mettaton/19}... heh, I think...',
                  '<20>{#p/mettaton}{#e/mettaton/20}I think I understand now.',
                  '<20>{#p/mettaton}{#e/mettaton/10}All this time...',
                  "<20>{#p/mettaton}{#e/mettaton/10}I've only been acting like we're enemies.",
                  '<20>{#p/mettaton}{#e/mettaton/11}A story for the audience to get invested in.',
                  '<20>{#p/mettaton}{#e/mettaton/19}But you...',
                  '<20>{#p/mettaton}{#e/mettaton/17}You believed it.',
                  '<20>{#p/mettaton}{#e/mettaton/17}You brought our rivalry to life.',
                  '<20>{#p/mettaton}{#e/mettaton/10}And by the end...',
                  '<20>{#p/mettaton}{#e/mettaton/9}You lived up perfectly to the role I gave to you.',
                  '<20>{#p/mettaton}{#e/mettaton/19}...',
                  '<20>{#p/mettaton}{#e/mettaton/14}Well then, dear $(moniker2).',
                  "<20>{#p/mettaton}{#e/mettaton/12}I guess it's only fair I live up to mine."
               ]
               : !world.badder_lizard
                  ? [
                     '<20>{#p/mettaton}{#e/mettaton/9}...',
                     '<20>{#p/mettaton}{#e/mettaton/10}Ha... darling...',
                     '<20>{#p/mettaton}{#e/mettaton/17}You do know what happens when my HP reaches zero...',
                     "<20>{#p/mettaton}{#e/mettaton/17}... don't you?",
                     '<20>{#p/mettaton}{#e/mettaton/18}...',
                     '<20>{#p/mettaton}{#e/mettaton/9}But before I go.',
                     '<20>{#p/mettaton}{#e/mettaton/10}I just wanted to say...',
                     "<20>{#p/mettaton}{#e/mettaton/17}... you're the greatest guest star I've ever had.",
                     '<20>{#p/mettaton}{#e/mettaton/19}All those people, watching us...',
                     '<20>{#p/mettaton}{#e/mettaton/19}Cheering us on...',
                     "<20>{#p/mettaton}{#e/mettaton/17}They're here because of you.",
                     '<20>{#p/mettaton}{#e/mettaton/10}To see your story unfold.',
                     '<20>{#p/mettaton}{#e/mettaton/9}So... darling.',
                     "<20>{#p/mettaton}{#e/mettaton/13}Don't underestimate yourself, alright?",
                     "<20>{#p/mettaton}{#e/mettaton/14}And don't worry about me.",
                     '<20>{#p/mettaton}{#e/mettaton/12}Because, even if my story came to an end...'
                  ]
                  : [
                     '<20>{#p/mettaton}{#e/mettaton/14}...',
                     '<20>{#p/mettaton}{#e/mettaton/14}... you...',
                     "<20>{#p/mettaton}{#e/mettaton/12}I should have known you'd betray me.",
                     '<20>{#p/mettaton}{#e/mettaton/15}...',
                     '<20>{#p/mettaton}{#e/mettaton/15}I wanted to give you a chance.',
                     ...(SAVE.data.n.bad_lizard < 2
                        ? [
                           '<20>{#p/mettaton}{#e/mettaton/14}I wanted to believe there was still good in you.',
                           '<20>{#p/mettaton}{#e/mettaton/19}But now...',
                           "<20>{#p/mettaton}{#e/mettaton/22}I know there's no hope of it coming back."
                        ]
                        : [
                           "<20>{#p/mettaton}{#e/mettaton/14}I wanted to believe that you'd changed.",
                           '<20>{#p/mettaton}{#e/mettaton/19}But now...',
                           '<20>{#p/mettaton}{#e/mettaton/22}I know you never had good in you to begin with.'
                        ]),
                     '<20>{#p/mettaton}{#e/mettaton/30}... you poor thing.',
                     '<20>{#p/mettaton}{#e/mettaton/30}I really must apologize.',
                     '<20>{#p/mettaton}{#e/mettaton/20}If I had just been a little more pragmatic...',
                     "<20>{#p/mettaton}{#e/mettaton/23}I could've given you the death you so utterly deserve.",
                     '<20>{#p/mettaton}{#e/mettaton/30}...',
                     "<20>{#p/mettaton}{#e/mettaton/30}Well, that's fine.",
                     '<20>{#p/mettaton}{#e/mettaton/24}You live and learn, darling.',
                     '<20>{#p/mettaton}{#e/mettaton/30}And in the end...'
                  ],
      turnTalkX0b: () =>
         SAVE.data.b.a_state_hapstablook
            ? ['<20>{*}{#p/mettaton}{#e/mettaton/31}... is that I forgive you!{^20}{%}']
            : iFancyYourVilliany()
               ? ["<20>{*}{#p/mettaton}{#e/mettaton/30}... let's end this rivalry off with a bang.{^20}{%}"]
               : !world.badder_lizard
                  ? ['<20>{*}{#p/mettaton}{#e/mettaton/30}... at least it ended off with a bang.{^20}{%}']
                  : ["<20>{*}{#p/mettaton}{#e/mettaton/27}... you'll realize not everything's going to go your way!{^20}{%}"],
      turnTalkX1a: ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...?'],
      turnTalkX1b: [
         '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/0}{#a.ra/0}... of course.',
         "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}You thought I'd be done for without the wires... right?",
         '<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/10}Oh, darling... you poor, poor little excuse of a child.',
         "<20>{#p/mettaton}{#e/mettaton/23}{#a.la/10}{#a.ra/0}You simply couldn't be more wrong.",
         "<20>{#p/mettaton}{#e/mettaton/24}{#a.la/2}{#a.ra/3}All this time, I've been absorbing the CORE's power...",
         "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}Did you really think I'd let it go to waste?"
      ],
      turnTalkX1c: ["<20>{*}{#p/mettaton}{#e/mettaton/27}{#a.la/8}{#a.ra/8}Let's see how you like me NOW!"],
      turnTalkX2: [
         '<20>{#p/mettaton}{#e/mettaton/26}... ugh...',
         '<20>{#e/mettaton/25}You beat me.',
         '<20>{#e/mettaton/19}After all of that, I underestimated you... again.',
         "<20>{#e/mettaton/13}But that's okay.",
         '<20>{#e/mettaton/14}Someone, somewhere out there...',
         "<20>{#e/mettaton/19}They'll put a stop to this madness.",
         '<20>{#e/mettaton/9}And when that time comes...',
         "<20>{#e/mettaton/10}We'll all..." 
      ],
      turnTalkX3: [
         '<20>{#p/mettaton}{#e/mettaton/26}... unbelievable...',
         "<20>{#e/mettaton/25}You didn't even let me use my full power.",
         "<20>{#e/mettaton/10}But... maybe that's for the best.",
         '<20>{#e/mettaton/9}...\nAfter all...',
         '<20>{#e/mettaton/18}If there really is no hope for us here...',
         "<20>{#e/mettaton/10}Then maybe we should've just let you win.",
         '<20>{#e/mettaton/9}...',
         '<20>{#e/mettaton/9}Oh well...'
      ],
      audienceRec1: () => [
         '<21>{#p/event}Ring, ring...',
         '<21>{#p/napstablook}{~}.....',
         '<21>{#e/mettaton/9}{~}oh........',
         '<21>{~}hi...\nmettaton...',
         ...(SAVE.data.b.a_state_hapstablook
            ? [
               "<21>{#e/mettaton/18}{~}i know it's been weird since the meeting...\nbut...",
               '<21>{~}seeing you for who you really are, doing what you really want...',
               '<21>{#e/mettaton/10}{~}brought a happy tear to my eye...',
               "<21>{#e/mettaton/9}{~}i can't tell, but...\ni guess this is the last episode...?",
               "<21>{#e/mettaton/11}{~}i'll miss you...\ncousin......"
            ]
            : [
               ...(iFancyYourVilliany()
                  ? [
                     '<21>{#e/mettaton/18}{~}i really liked seeing your rivalry...',
                     ...(SAVE.data.n.kills < 10
                        ? [
                           "<21>{~}it's not usually the sort of thing i'm into...\nbut...",
                           '<21>{#e/mettaton/10}{~}because you did it, i enjoyed it...\nvicariously'
                        ]
                        : [
                           '<21>{~}a lot of people have gone missing lately...\nbut...',
                           '<21>{#e/mettaton/10}{~}seeing you battle it out like that helped me feel better'
                        ])
                  ]
                  : [
                     '<21>{#e/mettaton/18}{~}i really liked watching your show...',
                     ...(SAVE.data.n.kills < 10
                        ? [
                           '<21>{~}my life is pretty boring...\nbut...',
                           '<21>{#e/mettaton/10}{~}seeing you on tv brought excitement to my life...\nvicariously'
                        ]
                        : [
                           '<21>{~}a lot of people have gone missing lately...\nbut...',
                           '<21>{#e/mettaton/10}{~}seeing you on tv helped me feel better'
                        ])
                  ]),
               "<21>{#e/mettaton/9}{~}i can't tell, but...\ni guess this is the last episode...?",
               "<21>{#e/mettaton/11}{~}i'll miss you...\nmettaton......"
            ])
      ],
      audienceRec2: [
         '<20>{#p/mettaton}{#e/mettaton/19}No, wait!\nWait, bl...',
         '<20>{#e/mettaton/9}Th... they already hung up.',
         '<20>{#e/mettaton/19}...',
         "<20>{#e/mettaton/20}I'll take another caller!!!"
      ],
      audienceRec3a: () =>
         iFancyYourVilliany()
            ? ['<21>{#p/basic}Mettaton, you really did us proud!']
            : ['<21>{#p/basic}Mettaton, your show made us so happy!'],
      audienceRec3b: () =>
         iFancyYourVilliany()
            ? ["<21>{#p/basic}Mettaton, who's going to fight the villains without you!"]
            : ["<21>{#p/basic}Mettaton, I don't know what I'll watch without you!"],
      audienceRec3c: () =>
         iFancyYourVilliany()
            ? ["<21>{#e/mettaton/10}{#p/basic}There's a reason you're the shining star of the outpost!"]
            : ["<21>{#e/mettaton/10}{#p/basic}There's a Mettaton- shaped hole in my Mettaton-shaped heart!"],
      audienceRec4: () => [
         '<20>{#p/mettaton}Ah... I see.',
         '<20>{#e/mettaton/9}...',
         '<20>{#e/mettaton/19}Everyone... thank you so much.',
         ...(SAVE.data.b.a_state_hapstablook
            ? [
               '<20>{#e/mettaton/20}And Blooky...',
               "<20>{#e/mettaton/20}I never thought I'd forgive you and the others, but...",
               '<20>{#e/mettaton/9}That farm was your passion project, right?',
               '<20>{#e/mettaton/9}After having several of my own... I think I get it.',
               '<20>{#e/mettaton/19}You just wanted us to be successful together...',
               '<20>{#e/mettaton/19}You, Lurksalot... all of you...',
               '<20>{#e/mettaton/20}You all just wanted us to be happy.',
               '<20>{#e/mettaton/20}... heh.',
               '<20>{#e/mettaton/9}But as for my show...',
               '<20>{#e/mettaton/10}I think I might take a break for a while.'
            ]
            : ['<20>{#e/mettaton/20}But you misunderstand...', "<20>{#e/mettaton/10}I'm... not going anywhere."]),
         '<20>...',
         "<20>{#e/mettaton/20}I guess it's for the best, though.",
         ...(SAVE.data.b.a_state_hapstablook
            ? [
               "<20>{#e/mettaton/15}I've been away from the family for far too long...",
               "<20>{#e/mettaton/14}It's about time I told them what's going on.",
               '<20>{#e/mettaton/19}In short...'
            ]
            : [
               "<20>{#e/mettaton/15}The truth is, this form's energy consumption is...",
               '<20>{#e/mettaton/14}Inefficient.',
               "<20>{#e/mettaton/19}In a few moments, I'll run out of battery power, and..."
            ]),
         '<20>{#e/mettaton/10}Well.',
         "<20>I'll be alright.",
         iFancyYourVilliany()
            ? '<20>{#e/mettaton/9}See you around, $(moniker2).'
            : '<20>{#e/mettaton/9}Fly safe, darling.',
         '<20>{#e/mettaton/19}And everyone... thank you.',
         "<20>{#e/mettaton/20}You've been a great audience!"
      ],
      neointro: [
         "<20>{*}{#p/mettaton}You're orange now.{^30}{%}",
         "<20>{*}{#e/mettaton/4}That's my attack.{^30}{%}",
         "<20>{*}{#e/mettaton/12}... heh.\nWho says we can't have a little fun?{^30}{%}",
         '<20>{*}{#e/mettaton/0}Now, be a good darling and press [Z] to explode.{^30}{%}',
         '<20>{*}{#e/mettaton/0}But be careful...{^30}{%}',
         "<20>{*}{#e/mettaton/0}The more you do it, the slower you'll move.{^30}{%}",
         '<20>{*}{#e/mettaton/12}... but enough with words.{^30}{%}',
         "<20>{*}{#e/mettaton/4}It's time to put you in the grave.{^30}{%}"
      ],
      mettahero1: [
         '<20>{#p/mettaton}{#e/mettaton/6}...',
         "<20>{#e/mettaton/9}G... guess that's what I get for fusing with my body...",
         "<20>{#e/mettaton/11}Now... there'll be nobody left...",
         '<20>{#e/mettaton/7}... to stop you...'
      ],
      mettahero2: ['<20>{#e/mettaton/7}...', '<20>{#e/mettaton/10}Goodbye...\n...\n... darling.'],
      napstahero1: ['<20>{#p/finalghost}{~}...', '<20>{~}Mettaton...'],
      napstahero2: [
         '<20>{#p/finalghost}{~}So this is what it comes to.',
         '<20>{~}...',
         '<20>{~}I have waited long for a chance to put an end to you, and now I have one.',
         '<20>{~}As you cannot use magic, you cannot kill me.',
         '<20>{~}Therefore, you have no method of getting past me.',
         '<20>{|}{~}Your time has- {%}'
      ],
      napstahero3: () =>
         [
            [
               "<20>{#p/asriel2}Seriously?\nI know my magic's limited, but it's not THAT bad.",
               '<20>{#x1}Cut me some slack...'
            ],
            ['<20>{#p/asriel2}...']
         ][Math.min(SAVE.flag.n.ga_asrielNapstakill++, 1)],
      qq: () =>
         SAVE.data.b.a_state_hapstablook
            ? 'Would you forgive a ghost?'
            : !world.badder_lizard
               ? 'Would you smooch a ghost?'
               : 'Would you attack a ghost?',
      qa: () =>
         SAVE.data.b.a_state_hapstablook
            ? ['Yes', 'No', 'Hug it out!', 'Forgive\nand forget.']
            : !world.badder_lizard
               ? ['Heck Yeah', 'HELL YEAH', 'Absolutely!', 'Without\nHesitation.']
               : ['I Could', 'I Should', 'I Will', 'If I\nHave To.'],
      q0: () =>
         SAVE.data.b.a_state_hapstablook
            ? ["<20>{#p/mettaton}Time's up.{^40}{%}"]
            : !world.badder_lizard
               ? ["<20>{#p/mettaton}Time's up, darling.\nI'll take that as a yes~{^40}{%}"]
               : ["<20>{#p/mettaton}Time's up, darling.\nI'll take that as a yes...{^40}{%}"],
      q1: () =>
         SAVE.data.b.a_state_hapstablook
            ? ['<20>{#p/mettaton}Straight to the point, I see.{^40}{%}']
            : !world.badder_lizard
               ? ['<20>{#p/mettaton}Great answer!\nI love it!!!{^40}{%}']
               : ["<20>{#p/mettaton}I'd like to see you try.{^40}{%}"],
      q2: () =>
         SAVE.data.b.a_state_hapstablook
            ? ["<20>{#p/mettaton}... but I can't keep running away.{^40}{%}"]
            : !world.badder_lizard
               ? ["<20>{#p/mettaton}Now THAT's how you answer a question!{^40}{%}"]
               : ['<20>{#p/mettaton}So you just lack the courage, hmm?{^40}{%}'],
      q3: () =>
         SAVE.data.b.a_state_hapstablook
            ? ["<20>{#p/mettaton}Woah, I wouldn't go that far.{^40}{%}"]
            : !world.badder_lizard
               ? ['<20>{#p/mettaton}I like your attitude!{^40}{%}']
               : ['<20>{#p/mettaton}The truth is so refreshing!{^40}{%}'],
      q4: () =>
         SAVE.data.b.a_state_hapstablook
            ? ["<20>{#p/mettaton}Well, that's confidence...{^40}{%}"]
            : !world.badder_lizard
               ? ["<20>{#p/mettaton}Oooh, you're serious about this.{^40}{%}"]
               : ["<20>{#p/mettaton}Don't lie to yourself, dear...{^40}{%}"],
      hitIndicator: 'Hits: $(x)',
      shieldIndicator: 'Shield: $(x)%',
      ratings: {
         pose1: () => (iFancyYourVilliany() ? 'Impressive' : 'Dramatic'),
         pose2: () => (iFancyYourVilliany() ? 'Unimpressive' : 'Risky'),
         pose3: () => (iFancyYourVilliany() ? 'Laughable' : 'Crazy'),
         pose4: () => (iFancyYourVilliany() ? 'Impressive?' : 'Showstopping'),
         flirt1: () => (iFancyYourVilliany() ? 'Plot Twist' : 'Cute'),
         flirt2: () => (iFancyYourVilliany() ? 'Doubling Down' : 'Flirty'),
         flirt3: () => (iFancyYourVilliany() ? 'Tripling Down' : 'Romantic'),
         flirt4: () => (iFancyYourVilliany() ? 'Flirtatious' : 'Enthralling'),
         boast1: 'Disappointing',
         boast2: 'Embarrassing',
         boast3: 'Impressive',
         heel1: 'Satisfying',
         heel2: 'Decadent',
         heel3: 'Unsatisfying',
         hurt: 'Violent',
         crit: 'Accurate',
         dead: 'Deadly',
         bomb: 'Explosive',
         scream: 'Enthusiastic',
         hopbox: 'Acrobatic',
         hearthurt: 'Even More Violent',
         item: {
            artifact: 'Unremarkable',
            old_gun: 'Stunning',
            old_bomb: 'Narcotic',
            old_spray: 'Spicy',
            tvm_radio: 'Musical',
            tvm_fireworks: 'Extravagant',
            tvm_mewmew: 'Brazen',
            spanner: 'Choreography',
            armor: 'Fashionable',
            weapon: 'Tactical',
            repeat: 'Repetitive',
            repeat_x: 'Super Repetitive',
            pain: 'Painful',
            blookpie: 'Familiar'
         },
         smooch: 'Correct',
         nosmooch: 'Incorrect'
      }
   },

   b_opponent_madjick: {
      name: '* Cozmo',
      spanner: ['<32>{#p/human}* (You brandish the spanner.)\n* (Cozmo does not mistake it for a magic wand.)'],
      epiphaNOPE: ['<20>{#p/basic}{~}That magic...', '<20>{#p/basic}{~}... I shall not give into its power!'],
      hint: ['<33>{#p/basic}* Hold on.\n* I think I know what to do here.'],
      assistTalk1: ['<20>{#p/basic}{~}Er...'],
      artifact_text: ['<32>{#p/basic}* Cozmo recognizes the artifact and deems you worthy of its respect!'],
      artifactTalk: [
         '<20>{#p/basic}{~}Could it be?\nThe pendant of kings and rulers?',
         '<20>{#p/basic}{~}I shall be in your way no longer!'
      ],
      assistAction: [
         '<32>{*}{#p/basic}* World of old. {^5}World of magic.{^25}{%}',
         '<32>{*}{#p/basic}* But no matter how tragic, we must live on...{^60}{%}',
         '<32>{*}{#p/basic}* And remember.{^40}{%}'
      ],
      assistTalk2: ['<20>{#p/basic}{~}Memoria mundi!', '<20>{#p/basic}{~}You know the words!'],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* Cozmo is knocked out!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Cozmo is knocked out!'
      ],
      old_spray_text: ['<32>{#p/human}* (You use the spray.)\n* (Sweet...)', '<32>{#p/basic}* Cozmo is knocked out!'],
      status1: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* Uh oh.'] : ['<32>{#p/story}* Cozmo came through in a flash!'],
      act_check: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Cozmo\'s what you\'d call a \"traditional\" magic user.\n* Its orbs are its strength...']
            : ['<32>{#p/story}* COZMO - ATK 29 DEF 24\n* This enigmatic ELITE squad member speaks in magic words.'],
      act_check2: ['<32>{#p/story}* COZMO - ATK 29 DEF 24\n* Not playing with a full deck.'],
      act_check3: ['<32>{#p/story}* COZMO - ATK 29 DEF 24\n* A magician, out of tricks...'],
      act_check4: ['<32>{#p/story}* COZMO - ATK 29 DEF 24\n* No magic words could save this old magician now.'],
      act_check5: [
         '<32>{#p/story}* COZMO - ATK 29 DEF 24\n* The power of love is stronger than even the oldest magic.'
      ],
      idleStatus1: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* It's Cozmo."] : ['<32>{#p/story}* Cozmo does a mysterious jig.'],
      idleStatus2: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* It's Cozmo."]
            : ['<32>{#p/story}* Cozmo flaunts its orbs in a menacing manner.'],
      idleStatus3: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* It's Cozmo."]
            : ['<32>{#p/story}* Cozmo whispers non-terrestrial swear words.'],
      idleStatus4: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* It's Cozmo."]
            : ['<32>{#p/story}* Cozmo peers at you with piercing eyes.'],
      idleStatus5: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* It's Cozmo."] : ['<32>{#p/story}* Smells like... magic.'],
      idleTalk1: ['<20>{#p/basic}{~}Abra cadabra.'],
      idleTalk2: ['<20>{#p/basic}{~}A la kazam!!'],
      idleTalk3: ['<20>{#p/basic}{~}Tinkle tinkle hoy.'],
      idleTalk4: ['<20>{#p/basic}{~}Hocus pocus.'],
      idleTalk5: ['<21>{#p/basic}{~}Please and thank you.'],
      danceText1: ['<32>{#p/human}* (You dance.)', "<32>{#p/basic}* Cozmo's gravity orb grows near..."],
      danceTalk1: ['<20>{#p/basic}{~}Magnum gravitas!!'],
      danceStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* One orb down...']
            : ["<32>{#p/story}* Cozmo's gravity orb has relented its pull."],
      danceText2: () => [
         '<32>{#p/human}* (You dance.)',
         "<32>{#p/basic}* Cozmo's shocker orb powers up...",
         ...(!world.badder_lizard ? ["<32>{#p/alphys}* Yes, that's it!\n* Y-you're almost there!"] : [])
      ],
      danceTalk2: ['<20>{#p/basic}{~}Vulu voltika!'],
      danceTalk3: ["<20>{#p/basic}{~}It's too much!!!"],
      danceStatus2: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Yes!!!\n* The orbs are out of power!']
            : ["<32>{#p/story}* Cozmo's shocker orb is drained of energy."],
      danceText3: ['<32>{#p/human}* (You dance.)\n* (Nothing changes.)'],
      danceText4: [
         '<32>{#p/human}* (You dance.)',
         "<32>{#p/basic}* Cozmo's confusion increases to an unbearable degree!"
      ],
      danceIdleTalk1: ['<20>{#p/basic}{~}Saddened...'],
      danceIdleTalk2: ['<20>{#p/basic}{~}Defeated...'],
      danceIdleTalk3: ['<20>{#p/basic}{~}Failed...'],
      danceStatus3: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* You can probably spare it now.']
            : ['<32>{#p/story}* Cozmo is out of options.'],
      playdeadText1: () => [
         '<32>{#p/human}* (You play dead.)',
         "<32>{#p/basic}* Cozmo's orbs begin to act strangely to each other...",
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* What the...?'] : [])
      ],
      playdeadTalk: ['<20>{#p/basic}{~}\x00*chants of confusion*'],
      playdeadStatus: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* I guess that works...?']
            : ["<32>{#p/story}* Cozmo's orbs don't know how to handle this."],
      playdeadIdleTalk1: ['<20>{#p/basic}{~}Utter inconfidence.'],
      playdeadIdleTalk2: ['<20>{#p/basic}{~}Total vexation.'],
      playdeadIdleTalk3: ['<20>{#p/basic}{~}Radical confusion.'],
      playdeadText2: ['<32>{#p/human}* (You play dead.)\n* (Nothing changes.)'],
      flirtText0: () => [
         '<32>{#p/human}* (You flirt with Cozmo.)\n* (No effect.)',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* Yeah, good luck with that...'] : [])
      ],
      flirtText1: () => [
         '<32>{#p/human}* (You call on your experience, and invoke a flirtatious incantation.)',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* Huh...?'] : [])
      ],
      flirtTalk1: ['<20>{#p/basic}{~}Ah!\nA fellow wizard!'],
      flirtStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Oh my god.\n* Do it again!!!']
            : ['<32>{#p/story}* Cozmo is on the love train.'],
      flirtText2: () => [
         '<32>{#p/human}* (You call on your experience, and recite a romantic scribe.)',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* It just gets better and better.'] : [])
      ],
      flirtTalk2: ["<20>{#p/basic}{~}Ah!\nIt's amazing!"],
      flirtStatus2: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* Wow... I guess that's that."]
            : ['<32>{#p/story}* Cozmo is enchanted.'],
      flirtText3: () => [
         '<32>{#p/human}* (You flirt.)\n* (Nothing changes.)',
         ...(!world.badder_lizard ? ["<32>{#p/alphys}* Pfft, don't push your luck."] : [])
      ],
      flirtIdleTalk1: ['<20>{#p/basic}{~}How lovely...'],
      flirtIdleTalk2: ['<20>{#p/basic}{~}How sweet...'],
      flirtIdleTalk3: ['<20>{#p/basic}{~}How thoughtful...'],
      perilStatus: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* Its HP is low...'] : ['<32>{#p/story}* Cozmo is holding on.']
   },

   b_opponent_knightknight: {
      name: '* Terrestria',
      epiphaNOPE: ['<20>{#p/basic}{~}... this magic... is forbidden...'],
      hint: ['<32>{#p/basic}* Wait...\n* Let me try something.'],
      assistTalk1: ['<20>{#p/basic}{~}...\n...\n...\nHmm?'],
      assistAction: [
         '<32>{*}{#p/human}* (...){^30}{%}',
         '<32>{*}{#p/human}* (The sound of an ancient song echoes through the room.){^100}{%}'
      ],
      assistTalk2: [
         '<20>{#p/basic}{~}A song of our long- lost world...',
         '<20>{#p/basic}{~}Perhaps there is still beauty in the universe.'
      ],
      artifact_text: ['<32>{#p/basic}* Terrestria recognizes the artifact and deems you worthy of her trust!'],
      artifactTalk: [
         '<20>{#p/basic}{~}An artifact from our long-lost world...',
         '<20>{#p/basic}{~}Perhaps its legend will live on in you.'
      ],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* Terrestria is knocked out!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Terrestria is knocked out!'
      ],
      old_spray_text: [
         '<32>{#p/human}* (You use the spray.)\n* (Sweet...)',
         '<32>{#p/basic}* Terrestria is knocked out!'
      ],
      status1: () =>
         !world.badder_lizard
            ? SAVE.data.b.assist_madjick
               ? ['<32>{#p/alphys}* You think you can repeat that last trick?']
               : ['<32>{#p/alphys}* Not again.']
            : ['<32>{#p/story}* Terrestria blocks the way!'],
      act_check: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* Terrestria is a staff-wielder, and she's REALLY passionate about the homeworld."]
            : [
               '<32>{#p/story}* TERRESTRIA - ATK 36 DEF 36\n* This heavy ELITE squad member wields the Planetary Staff.'
            ],
      act_check2: ['<32>{#p/story}* TERRESTRIA - ATK 36 DEF 36\n* The world is crumbling.'],
      act_check3: ["<32>{#p/story}* TERRESTRIA - ATK 36 DEF 36\n* Things aren't so bad anymore."],
      act_check4: ['<32>{#p/story}* TERRESTRIA - ATK 36 DEF 36\n* The ground shakes beneath her ever-worn boots.'],
      act_check5: ['<32>{#p/story}* TERRESTRIA - ATK 36 DEF 36\n* Her attention stolen, the world falls away.'],
      idleStatus1: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* It's Terrestria."]
            : ['<32>{#p/story}* Terrestria tightens her grip on the staff.'],
      idleStatus2: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* It's Terrestria."] : ['<32>{#p/story}* Terrestria breathes deeply.'],
      idleStatus3: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* It's Terrestria."] : ['<32>{#p/story}* Terrestria watches quietly.'],
      idleStatus4: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* It's Terrestria."]
            : ["<32>{#p/story}* Terrestria's armor emits a faint, yellow glow."],
      idleStatus5: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* It's Terrestria."]
            : ['<32>{#p/story}* Smells like a forgotten relic.'],
      idleTalk1: ['<20>{#p/basic}{~}Good knight.'],
      idleTalk2: ['<20>{#p/basic}{~}Farewell.'],
      idleTalk3: ['<20>{#p/basic}{~}Adieu.'],
      idleTalk4: ['<20>{#p/basic}{~}Close your eyes...'],
      idleTalk5: ['<20>{#p/basic}{~}Goodbye.'],
      comfortText1: () => [
         '<32>{#p/human}* (You move in closer and caress Terrestria, telling her things will be okay.)',
         ...(!world.badder_lizard ? ["<32>{#p/alphys}* That's... uh..."] : [])
      ],
      comfortTalk1: ['<20>{#p/basic}{~}...\n...\n...\nTruly?'],
      comfortStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Is she... crying?']
            : ["<32>{#p/story}* Terrestria's stance weakens."],
      comfortText2: () => [
         '<32>{#p/human}* (You embrace Terrestria, reminding her there is still beauty in the universe.)',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* Awww...'] : [])
      ],
      comfortTalk2: ['<20>{#p/basic}{~}...\n...\nThank you...'],
      comfortStatus2: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* That's... honestly very sweet."]
            : ['<32>{#p/story}* Terrestria has found a new purpose in life.'],
      comfortTalk3: ['<20>{#p/basic}{~}...\n...\nThere you are...'],
      comfortText3: ['<32>{#p/human}* (You comfort Terrestria.)\n* (Nothing changes.)'],
      comfortText4: [
         '<32>{#p/human}* (You comfort Terrestria.)',
         '<32>{#p/basic}* Terrestria drops her staff and accepts your offer of peace.'
      ],
      comfortIdleTalk1: ['<20>{#p/basic}{~}Gratuities.'],
      comfortIdleTalk2: ['<20>{#p/basic}{~}Much obliged.'],
      comfortIdleTalk3: ['<20>{#p/basic}{~}Many thanks.'],
      comfortStatus3: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* I think you can spare her...']
            : ['<32>{#p/story}* Terrestria is at peace.'],
      flashText1: () => [
         '<32>{#p/human}* (You flash your phone screen.)',
         '<32>{#p/basic}* Terrestria goes into a panic!',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* What are you doing!?'] : [])
      ],
      flashTalk: ['<20>{#p/basic}{~}\x00*silent panic*'],
      flashStatus: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* She's b-blinded!"]
            : ['<32>{#p/story}* Terrestria has lost her sense of sight for this battle.'],
      flashIdleTalk1: ['<20>{#p/basic}{~}No vision...'],
      flashIdleTalk2: ["<20>{#p/basic}{~}Can't see you..."],
      flashIdleTalk3: ['<20>{#p/basic}{~}Where are you...'],
      flashText2a: [
         '<32>{#p/human}* (You flash your phone screen.)\n* (Terrestria is too busy day- dreaming about you to notice.)'
      ],
      flashText2b: ['<32>{#p/human}* (You flash your phone screen.)\n* (Terrestria is too relaxed to notice.)'],
      flashText2c: ['<32>{#p/human}* (You flash your phone screen.)\n* (Nothing changes.)'],
      flirtText0: () => [
         '<32>{#p/human}* (You flirt with Terrestria.)\n* (No effect.)',
         ...(!world.badder_lizard
            ? ['<32>{#p/alphys}* Yeah, the ELITE squad is sort of trained against swooning.']
            : [])
      ],
      flirtText1: () => [
         '<32>{#p/human}* (You call on your experience, and whisper a simple but confident compliment.)',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* Uh...'] : [])
      ],
      flirtTalk1: ['<20>{#p/basic}{~}What delight...'],
      flirtStatus1: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* Of course you'd find a way to make it work..."]
            : ['<32>{#p/story}* Terrestria is beginning to like you.'],
      flirtText2: () => [
         "<32>{#p/human}* (You call on your experience, and gaze long into Terrestria's eyes.)",
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* Ohhhh kay.'] : [])
      ],
      flirtTalk2: ['<20>{#p/basic}{~}What beauty to be seen...'],
      flirtStatus2: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* W-well.\n* This is... something.']
            : ['<32>{#p/story}* Terrestria is enamoured.'],
      flirtText3: () => [
         '<32>{#p/human}* (You flirt.)\n* (Nothing changes.)',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* You are insane.'] : [])
      ],
      flirtIdleTalk1: ['<20>{#p/basic}{~}Quite breath-taking...'],
      flirtIdleTalk2: ['<20>{#p/basic}{~}How wonderful...'],
      flirtIdleTalk3: ['<20>{#p/basic}{~}So beautiful...'],
      perilStatus: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* She's close to death..."]
            : ["<32>{#p/story}* Terrestria's breath shakes."]
   },

   b_opponent_froggitex: {
      name: '* Final Froggit',
      epiphany: [
         
         ['<08>{#p/basic}{~}In your mercy, I see wisdom.', '<08>{#p/basic}{~}My hopes have been ful- filled.'],
         () =>
            world.meanie
               ? 
               [
                  '<08>{#p/basic}{~}I did not forsee this outcome.',
                  '<08>{#p/basic}{~}I must steer clear of the abyss..'
               ]
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}Skip, jump.', '<08>{#p/basic}{~}May love radiate through our hearts.']
                  : SAVE.data.b.oops
                     ? 
                     ['<08>{#p/basic}{~}We shall be the best of friends.']
                     : 
                     ['<08>{#p/basic}{~}Your kindness warms my heart.'],
         
         ['<08>{#p/basic}{~}Robbit, robbit.', '<08>{#p/basic}{~}My time has come.'],
         
         ['<08>{#p/basic}{~}May you have the wealth that you desire.']
      ],
      genostatus: ['<32>{#p/asriel2}* ...'],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* Final Froggit is knocked out!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Final Froggit is knocked out!'
      ],
      old_spray_text: [
         '<32>{#p/human}* (You use the spray.)\n* (Sweet...)',
         '<32>{#p/basic}* Final Froggit is knocked out!'
      ],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ["<32>{#p/alphys}* Final Froggit, it's like Froggit, but fancier.\n* It talks in an odd language."]
                  : ["<32>{#p/alphys}* It's just Final Froggit."]
               : ['<32>{#p/story}* FINAL FROGGIT - ATK 30 DEF 24\n* The future is boundless for this monster.'],
      act_check2: [
         '<32>{#p/story}* FINAL FROGGIT - ATK 30 DEF 24\n* This monster may soon live on through its wisdom.'
      ],
      act_check3: ['<32>{#p/story}* FINAL FROGGIT - ATK 30 DEF 24\n* This monster understands your true desires.'],
      act_check4: ['<32>{#p/story}* FINAL FROGGIT - ATK 30 DEF 24\n* This monster is satisfied with its message.'],
      idleText1: ['<08>{#p/basic}{~}Robbit, robbit.'],
      idleText2: ['<08>{#p/basic}{~}Creak, creak.'],
      idleText3: ['<08>{#p/basic}{~}Skip, jump.'],
      idleText4: ['<08>{#p/basic}{~}Purr.'],
      status1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* The battlefield is engulfed in the smell of leola root.'],
      status2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Final Froggit seeks an understanding.'],
      status3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Final Froggit hopes to share its wisdom.'],
      act_flirt: () => [
         '<32>{#p/human}* (You flirt with Final Froggit.)',
         '<32>* Final Froggit shows modest appreciation for your remarks.',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Ehehe...'] : [])
      ],
      flirtText: () =>
         world.meanie ? ['<08>{#p/basic}{~}(Sighs deeply.)\nRobbit.'] : ['<08>{#p/basic}{~}(Blushes deeply.)\nRobbit.'],
      act_translate1: () => [
         '<32>{#p/human}* (But there was nothing for you to translate yet.)',
         ...(!world.badder_lizard
            ? ['<32>{#p/alphys}* Maybe you should, like... wait for it to say something first?']
            : [])
      ],
      act_translate2: ["<32>{#p/human}* (You translate Final Froggit's message.)"],
      translateText1: () =>
         world.meanie
            ? ["<08>{#p/basic}{~}(Don't kill and don't be killed.)"]
            : ['<08>{#p/basic}{~}(Time heals all wounds.)'],
      translateText2: () =>
         world.meanie
            ? ['<08>{#p/basic}{~}(Let not the rage consume you.)']
            : ['<09>{#p/basic}{~}(Keep moving forward.)'],
      translateText3: () =>
         world.meanie
            ? ['<08>{#p/basic}{~}(You can always do better.)']
            : ['<08>{#p/basic}{~}(Stay true to your- self.)'],
      translateText4: () =>
         world.meanie ? ['<08>{#p/basic}{~}(Never give into fear.)'] : ['<08>{#p/basic}{~}(Always try your best.)'],
      translateText5: () =>
         world.meanie
            ? ['<08>{#p/basic}{~}(Regret when you were mean.)']
            : ['<08>{#p/basic}{~}(Never regret being kind.)'],
      mercyStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* I think you can spare Final Froggit now.']
               : ['<32>{#p/alphys}* I think you can spare it now.']
            : ['<32>{#p/story}* Final Froggit seems reluctant to fight you.'],
      act_mystify: ['<32>{#p/human}* (You do something mysterious, but Final Froggit is unaffected.)'],
      act_threaten: ['<32>{#p/human}* (You do something threatening, but Final Froggit is unaffected.)'],
      perilStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* Uh...']
               : ['<32>{#p/alphys}* No...']
            : ['<32>{#p/story}* Final Froggit stands its ground.']
   },

   b_opponent_whimsalot: {
      name: '* Flutterknyte',
      epiphany: [
         
         ['<08>{#p/basic}{~}Thank good- ness..', '<08>{#p/basic}{~}I feared I would never escape.'],
         () =>
            world.meanie
               ? 
               ['<08>{#p/basic}{~}What was I think- ing..', '<08>{#p/basic}{~}I have to get out of here..!']
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}If you truly feel this way..', '<08>{#p/basic}{~}I am obliged to as well..!']
                  : SAVE.data.b.oops
                     ? 
                     ["<08>{#p/basic}{~}It's okay..", '<08>{#p/basic}{~}We can be friends if you want..']
                     : 
                     ['<08>{#p/basic}{~}Please..', "<08>{#p/basic}{~}D-don't let go.."],
         
         ["<08>{#p/basic}{~}I'm so sorry..", "<08>{#p/basic}{~}I knew I wasn't cut out for this.."],
         
         ["<08>{#p/basic}{~}Here's your pay- ment..", '<08>{#p/basic}{~}Please.. spare me..']
      ],
      genostatus: ['<32>{#p/asriel2}* ...'],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* Flutterknyte is knocked out!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Flutterknyte is knocked out!'
      ],
      old_spray_text: [
         '<32>{#p/human}* (You use the spray.)\n* (Sweet...)',
         '<32>{#p/basic}* Flutterknyte is knocked out!'
      ],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* Flutterknyte... is it just me, or does it seem nervous?']
                  : ["<32>{#p/alphys}* It's just Flutterknyte."]
               : [
                  '<32>{#p/story}* FLUTTERKNYTE - ATK 34 DEF 12\n* This monster carries a bloated sense of responsibility.'
               ],
      act_check2: ['<32>{#p/story}* FLUTTERKNYTE - ATK 34 DEF 12\n* Stays behind, afraid of being a disappointment.'],
      act_check3: ['<32>{#p/story}* FLUTTERKNYTE - ATK 34 DEF 12\n* A weight has been lifted from its wings.'],
      act_check4: ["<32>{#p/story}* FLUTTERKNYTE - ATK 34 DEF 12\n* Its wings aren't the only things fluttering..."],
      act_perch1: () => [
         '<32>{#p/human}* (You offer an arm for Flutterknyte to perch on.)',
         '<32>{#p/basic}* Flutterknyte thinks about accepting your offer...',
         ...(!world.badder_lizard && calm_lizard() ? ["<32>{#p/alphys}* You're halfway there."] : [])
      ],
      act_perch2: () =>
         world.meanie
            ? [
               '<32>{#p/human}* (You continue offering.)',
               '<32>{#p/basic}* Flutterknyte backs away, fearing for its life...',
               '<32>* Flutterknyte wants to go now.',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* There you go...?'] : [])
            ]
            : [
               '<32>{#p/human}* (You continue offering.)',
               '<32>{#p/basic}* Flutterknyte moves towards your arm and lands.',
               '<32>* Flutterknyte can rest now.',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* There you go!'] : [])
            ],
      act_perch3: () =>
         world.meanie
            ? [
               '<32>{#p/human}* (You offer your other arm for Flutterknyte.)',
               '<33>{#p/basic}* Flutterknyte has seen enough...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ... jeez.'] : [])
            ]
            : [
               '<32>{#p/human}* (You offer your other arm for Flutterknyte.)',
               '<32>{#p/basic}* Flutterknyte, overwhelmed by choices, decides to fly away...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ... what.'] : [])
            ],
      act_flirt: () =>
         world.meanie
            ? [
               '<32>{#p/human}* (You flirt with Flutterknyte.)',
               '<32>{#p/basic}* Flutterknyte is surprised, and feels conflicted...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Er...'] : [])
            ]
            : [
               '<32>{#p/human}* (You flirt with Flutterknyte.)',
               '<32>{#p/basic}* Flutterknyte is surprised, but accepts it nonetheless...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Cute...'] : [])
            ],
      flirtTalk: () =>
         world.meanie ? ['<08>{#p/basic}{~}What to do what to say..'] : ['<08>{#p/basic}{~}Thank you thank you..'],
      act_poke1: () => [
         '<32>{#p/human}* (You poke Flutterknyte to knock it off its balance.)',
         '<32>{#p/basic}* Flutterknyte is shaken, but quickly regains focus.',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Mean...?'] : [])
      ],
      act_poke2: () => [
         '<32>{#p/human}* (You poke Flutterknyte to knock it off its balance.)',
         '<32>{#p/basic}* Flutterknyte falls and skitters away!',
         ...(!world.badder_lizard && calm_lizard()
            ? ["<32>{#p/alphys}* I'm gonna pretend like you didn't just do that."]
            : [])
      ],
      preperchText1: ['<08>{#p/basic}{~}Should I..?'],
      preperchText2: ['<08>{#p/basic}{~}Can I..?'],
      preperchText3: ['<08>{#p/basic}{~}Will I..?'],
      perchText1: ['<08>{#p/basic}{~}\x00*ex- hausted sigh*'],
      perchText2: ['<08>{#p/basic}{~}Rest, at last.'],
      perchText3: ['<08>{#p/basic}{~}Thank you.'],
      perchText4: ['<08>{#p/basic}{~}I knew not how tired I was.'],
      perchText5: ["<08>{#p/basic}{~}I know not how long it's been."],
      idleTalk1: ["<08>{#p/basic}{~}I'll do what I must.."],
      idleTalk2: ["<08>{#p/basic}{~}It's for the greater good.."],
      idleTalk3: ["<08>{#p/basic}{~}They're counting on me.."],
      idleTalk4: ['<08>{#p/basic}{~}The future depends on this..'],
      idleTalk5: ['<08>{#p/basic}{~}\x00*shuffle shuffle*'],
      perilStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* Uh...']
               : ['<32>{#p/alphys}* No...']
            : ['<32>{#p/story}* Flutterknyte is in serious trouble.'],
      status1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* Flutterknyte continues to mutter justifications.'],
      status2: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte is hovering.']),
      status3: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Smells like pears.']),
      status4: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte takes slow, steady breaths.'],
      status5: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte ponders their future.'],
      spareStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* Looks like Flutterknyte will accept your mercy now.']
               : ["<32>{#p/alphys}* Looks like it'll accept your mercy now."]
            : ['<32>{#p/story}* Flutterknyte is at rest.']
   },

   b_opponent_astigmatism: {
      name: '* Eyewalker Prime',
      epiphany: [
         
         ['<08>{#p/basic}{~}Out of sight, out of mind.'],
         () =>
            world.meanie
               ? 
               [
                  '<08>{#p/basic}{~}Your ma- lice is stronger than my own!',
                  "<08>{#p/basic}{~}I won't test it further."
               ]
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}Such beauty in your eyes..', "<08>{#p/basic}{~}Don't tell the clan about this!"]
                  : SAVE.data.b.oops
                     ? 
                     ['<08>{#p/basic}{~}Friend- ship..', '<08>{#p/basic}{~}This could be a real eye- opener!']
                     : 
                     ["<08>{#p/basic}{~}Don't squeeze too hard, okay?"],
         
         ['<08>{#p/basic}{~}I shall die proudly as a leader.'],
         
         ["<08>{#p/basic}{~}Tch.. don't try to pay me back.", '<08>{#p/basic}{~}This is for you!']
      ],
      genostatus: ['<32>{#p/asriel2}* ...'],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* Eyewalker Prime is knocked out!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Eyewalker Prime is knocked out!'
      ],
      old_spray_text: [
         '<32>{#p/human}* (You use the spray.)\n* (Sweet...)',
         '<32>{#p/basic}* Eyewalker Prime is knocked out!'
      ],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ["<32>{#p/alphys}* Eyewalker Prime...?\n* They're probably the leader of the Eyewalker clan."]
                  : ["<32>{#p/alphys}* It's just Eyewalker Prime."]
               : ["<33>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* There's more to this monster than meets the eye."],
      act_check2: [
         '<32>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* Satisfied with your following of family traditions.'
      ],
      act_check3: ['<32>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* Considers you to be quite the \"looker\" now.'],
      act_check4: [
         '<32>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* For this monster, tradition always comes before safety.'
      ],
      act_stare: ['<32>{#p/human}* (You stare at Eyewalker Prime.)'],
      act_smile: ['<32>{#p/human}* (You smile at Eyewalker Prime.)'],
      act_flirt: () => [
         '<32>{#p/human}* (You wink at Eyewalker Prime.)',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Oh come on.'] : [])
      ],
      status1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* Eyewalker Prime is staring into your SOUL.'],
      status2: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* Eyewalker Prime offers up a menacing grin.'],
      status3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ["<32>{#p/story}* Eyewalker Prime isn't messing around."],
      status4: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ["<32>{#p/story}* Eyewalker Prime thinks of their family's honor."],
      status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Smells like mouthwash.']),
      perilStatus: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* Uh...'] : ['<32>{#p/story}* Eyewalker Prime is watering.'],
      idleTalk1: ['<08>{#p/basic}{~}Bring it on!'],
      idleTalk2: ['<08>{#p/basic}{~}Show me your teeth!'],
      idleTalk3: ["<08>{#p/basic}{~}Don't hold back!"],
      idleTalk4: ['<08>{#p/basic}{~}Show me your looks!'],
      idleTalk5: ['<08>{#p/basic}{~}What are YOU made of?'],
      flirtTalk: ["<08>{#p/basic}{~}Hah.\nNice try.\nBut I'm taken!"],
      partialTalk1: ["<08>{#p/basic}{~}That's partly right.."],
      partialTalk2: ["<08>{#p/basic}{~}You've almost got it.."],
      partialTalk3: ["<08>{#p/basic}{~}You're getting there.."],
      partialStatus1: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* I think you need to do the other thing now.']
               : ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* Eyewalker Prime is looking for more.'],
      partialStatus2: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* Eyewalkers love it when you smile and stare at them.']
               : ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* Eyewalker Prime wants to see the full picture.'],
      partialStatus3: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* D-do the other thing!']
               : ['<32>{#p/alphys}* ...']
            : ["<32>{#p/story}* Eyewalker Prime wishes you'd follow its directive."],
      fullStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* Eyewalker Prime seems content now...']
               : ['<32>{#p/alphys}* It seems content now...']
            : ['<32>{#p/story}* Eyewalker Prime is pleased.'],
      partialIdleTalk1: ['<08>{#p/basic}{~}What are you waiting for?'],
      partialIdleTalk2: ['<08>{#p/basic}{~}You gonna do some- thing, or..'],
      partialIdleTalk3: ["<08>{#p/basic}{~}Is that all you've got?"],
      fullIdleTalk1: ['<08>{#p/basic}{~}Glad we see eye to eye.'],
      fullIdleTalk2: ['<08>{#p/basic}{~}Looking good, pal.'],
      fullIdleTalk3: ["<08>{#p/basic}{~}That's the way."],
      flirtTalkFull: ['<08>{#p/basic}{~}Hmm..', '<08>{#p/basic}{~}You make a con- vincing move..'],
      hurtTalk: ["<08>{#p/basic}{~}That's not what I meant!"]
   },
   b_opponent_migospel: {
      genostatus: ['<32>{#p/asriel2}* ...'],
      epiphany: [
         
         ["<08>{#p/basic}{~}I didn't want to fight you anyway."],
         () =>
            world.meanie
               ? 
               ['<08>{#p/basic}{~}I knew this was a bad idea.']
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}You are very strange.', '<08>{#p/basic}{~}but charming none- theless.']
                  : SAVE.data.b.oops
                     ? 
                     ["<08>{#p/basic}{~}Sure, let's be friends.", "<08>{#p/basic}{~}It's better that way."]
                     : 
                     ['<08>{#p/basic}{~}Um..', "<08>{#p/basic}{~}If that's what you really want?"],
         
         ["<08>{#p/basic}{~}It's time I stopped run- ning..", '<08>{#p/basic}{~}.. from my death.'],
         
         ["<08>{#p/basic}{~}You'll get more out of this than me.", '<08>{#p/basic}{~}By all means, take it.']
      ],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<32>{#p/basic}* Silencio escapes!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Silencio escapes!'
      ],
      old_spray_text: ['<32>{#p/human}* (You use the spray.)\n* (Sweet...)', '<32>{#p/basic}* Silencio escapes!'],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* Silencio, huh?\n* Yeah, this one gets around a lot, actually.']
                  : ["<32>{#p/alphys}* It's just Silencio."]
               : ['<32>{#p/story}* SILENCIO - ATK 28 DEF 17\n* Shamelessly cowardly.\n* Along for the ride.'],
      act_flirt: () => [
         '<32>{#p/human}* (You flirt with Silencio.)',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Alright then...'] : [])
      ],
      flirtTalk: ["<09>{#p/basic}{~}You're adorable."],
      act_insult: ['<32>{#p/human}* (You insult Silencio.)\n* (No effect.)'],
      groupStatus1: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Silencio is ignoring the others.'],
      groupStatus2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Smells like a pit stop.'],
      groupTalk1: ['<08>{#p/basic}Out of the way.'],
      groupTalk2: ['<08>{#p/basic}You people are slow.'],
      groupTalk3: ["<08>{#p/basic}I'm not partici- pating."],
      groupTalk4: ['<08>{#p/basic}Reject the swarm.'],
      groupTalk5: ['<08>{#p/basic}Danger is for fools.'],
      groupTalk6: ['<08>{#p/basic}Leave me alone.'],
      name: '* Silencio',
      soloStatus: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Looks like it never wanted to do this to begin with.']
            : ["<32>{#p/story}* Silencio doesn't need anyone else around."],
      soloTalk1: ["<08>{#p/basic}{~}I'll get along alright."],
      soloTalk2: ['<08>{#p/basic}{~}Partners are over- rated.'],
      soloTalk3: ['<08>{#p/basic}{~}At last, alone time.'],
      soloTalk4: ['<08>{#p/basic}{~}Cha, cha.'],
      soloTalk5: ['<08>{#p/basic}{~}I dance in peace.'],
      perilTalk: ["<08>{#p/basic}{~}I'm outta here."]
   },
   b_opponent_mushketeer: {
      name: '* Mushketeer',
      epiphany: [
         
         ["<08>{#p/basic}{~}It's only fair to spare you too!"],
         () =>
            world.meanie
               ? 
               ["<08>{#p/basic}{~}I'm in over my mushroom cap!\nRetreat!"]
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ["<08>{#p/basic}{~}All's fair in love 'n' war!"]
                  : SAVE.data.b.oops
                     ? 
                     ['<08>{#p/basic}{~}From now on, we fight as allies!']
                     : 
                     ['<08>{#p/basic}{~}Hugging really is the key to peace!'],
         
         ['<08>{#p/basic}{~}This cycle of conflict must end!'],
         
         ['<08>{#p/basic}{~}The spoils of war are yours!']
      ],
      old_gun_text: ['<32>{#p/human}* (You fire the gun.)', '<33>{#p/basic}* Mushketeer has met their match!'],
      old_bomb_text: [
         '<32>{#p/human}* (You deploy the bomb.)\n* (The mist scatters about.)',
         '<32>{#p/basic}* Mushketeer surrenders!'
      ],
      old_spray_text: [
         '<32>{#p/human}* (You use the spray.)\n* (Sweet...)',
         '<32>{#p/basic}* Mushketeer has been impaired!'
      ],
      idleTalk1: () =>
         world.genocide
            ? ['<08>{#p/basic}{~}Your reign of terror is over!']
            : ['<08>{#p/basic}{~}Join me on the front- line.'],
      idleTalk2: () =>
         world.genocide
            ? ['<08>{#p/basic}{~}Prepare for exe- cution!']
            : ["<08>{#p/basic}{~}All's fair in love..\n.. and CORE."],
      idleTalk3: () =>
         world.genocide
            ? ['<08>{#p/basic}{~}Nobody outguns Mush- keteer!']
            : ['<08>{#p/basic}{~}No time like war time..'],
      hurtStatus: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* Almost dead.']
            : ['<32>{#p/story}* Mushketeer sets out on its final push.'],
      genoStatus: ['<32>{#p/asriel2}* Mushketeer.'],
      status0: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* Why is this thing in our way?']
            : !world.badder_lizard
               ? ["<32>{#p/alphys}* Please don't die."]
               : ['<32>{#p/story}* Mushketeer blocks the way!'],
      status1: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer stands firm.']),
      status2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer wants to be a hero.'],
      status3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer is preparing for a shootout.'],
      status4: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer reaches around for their gun.'],
      status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Smells like dry dirt.']),
      travelStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ["<32>{#p/story}* Mushketeer, the pray 'n' spray specialist."],
      travelStatus2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer is on edge.'],
      travelStatus3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer darts their eyes around.'],
      act_check: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* Mushketeer, the gun-toter.\n* The dirty elder cousin of a mushroom far away...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* Mushketeer.\n* I have no idea who this is.']
                  : ["<32>{#p/alphys}* It's just Mushketeer."]
               : ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Product of its upbringing.\n* Gun-toter.'],
      act_check2: ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Reconsidering its upbringing.\n* Gun-tosser.'],
      act_check3: ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Forgetting its upbringing.\n* Heart-warmer.'],
      act_check4: ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* The war stops for no mushroom.'],
      act_flirt: () => [
         '<32>{#p/human}* (You invite Mushketeer to a private shootout.)',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Nahhhh.'] : [])
      ],
      flirtTalk: ["<08>{#p/basic}{~}Hey!\nWe don't do that here."],
      flirtTalk2: ["<08>{#p/basic}{~}Well..\nIf it's what you're into.."],
      flirtStatus: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* Mushketeer.']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ["<32>{#p/alphys}* Welp, that didn't work."]
                  : ['<32>{#p/alphys}* ...']
               : ['<32>{#p/story}* Oh no, Mushketeer is serious.'],
      flirtStatus2: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* Mushketeer.']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* Wait, that worked?']
                  : ['<32>{#p/alphys}* ...']
               : ['<32>{#p/story}* Oh yes, Mushketeer is serious.'],
      act_travel1: () => [
         '<32>{#p/human}* (You come closer to Mushketeer.)',
         "<32>{#p/basic}* Mushketeer's attacks get more intense!",
         ...(world.genocide
            ? ['<32>{#p/asriel2}* ...?']
            : !world.badder_lizard && calm_lizard()
               ? ['<32>{#p/alphys}* Careful...']
               : [])
      ],
      act_travel2: () => [
         '<32>{#p/human}* (You come right next to Mushketeer.)',
         "<32>{#p/basic}* Mushketeer's attacks go insane!",
         ...(world.genocide
            ? ['<32>{#p/asriel2}* $(name)...?']
            : !world.badder_lizard && calm_lizard()
               ? ['<32>{#p/alphys}* Oh my god, be careful...!']
               : [])
      ],
      act_travel3: () => [
         '<32>{#p/human}* (But you were already right next to Mushketeer.)',
         ...(world.genocide
            ? ['<32>{#p/asriel2}* I am starting to get worried.']
            : !world.badder_lizard && calm_lizard()
               ? ['<32>{#p/alphys}* D-do anything other than this!!!']
               : [])
      ],
      travelTalk1: ["<08>{#p/basic}{~}What do you think you're doing!"],
      travelTalk2: ["<08>{#p/basic}{~}What're you playin' at!"],
      act_disarm1: () => [
         "<32>{#p/human}* (You try to disarm Mushketeer, but it's too far away.)",
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* You might try getting closer.'] : [])
      ],
      act_disarm2: () => [
         "<32>{#p/human}* (You try to disarm Mushketeer, but it's just out of reach.)",
         ...(!world.badder_lizard && calm_lizard()
            ? ['<32>{#p/alphys}* I guess...\n* If you have to get closer...']
            : [])
      ],
      act_disarm3: () => ['<32>{#p/human}* (You disarm Mushketeer.)'],
      act_disarm3x: ['<32>{#p/human}* (But Mushketeer had already been disarmed.)'],
      act_disarm4: pager.create(
         0,
         [
            '<32>{#p/human}* (You try to disarm Mushketeer, but Mushketeer knocks you back to where you started.)',
            "<32>{#p/asriel2}* We're wasting time."
         ],
         [
            '<32>{#p/human}* (You try to disarm Mushketeer, but Mushketeer knocks you back to where you started.)',
            '<32>{#p/asriel2}* ...'
         ]
      ),
      disarmTalk: [
         '<08>{#p/basic}{~}I guess this means no war..?',
         '<08>{#p/basic}{~}\x00*sigh*',
         "<08>{#p/basic}{~}Maybe it's for the best."
      ],
      disarmStatus: ['<32>{#p/story}* Mushketeer awaits confirmation of the end of this battle.'],
      postDisarmTalk1: ['<08>{#p/basic}{~}Oh well..'],
      postDisarmTalk2: ['<08>{#p/basic}{~}It is what it is..']
   },

   
   b_opponent_pyrope: {
      name: '* Hotwire',
      epiphany: [
         ['<08>{#p/basic}{~}No need to worry, pal', "<08>{#p/basic}{~}I'll be out of your way now."],
         () =>
            world.meanie
               ? [
                  "<08>{#p/basic}{~}Your at- titude's got me petri- fied",
                  '<08>{#p/basic}{~}Escape is all but justi- fied!'
               ]
               : SAVE.data.b.oops && world.flirt > 9
                  ? ['<08>{#p/basic}{~}No need to push and shove', "<08>{#p/basic}{~}We're already falling in love!"]
                  : SAVE.data.b.oops
                     ? ['<08>{#p/basic}{~}I vow to be your friend', '<08>{#p/basic}{~}Regard- less of what happens!']
                     : [
                        '<08>{#p/basic}{~}This sensa- tion is astound- ing',
                        '<08>{#p/basic}{~}I can feel you all around me!'
                     ],
         ["<08>{#p/basic}{~}It's like I told my mum", '<08>{#p/basic}{~}I knew this day would come.'],
         ['<08>{#p/basic}{~}Only a train wreck', "<08>{#p/basic}{~}Wouldn't offer you a pay- check!"]
      ],
      genoStatus: ['<32>{#p/asriel2}* Hotwire.'],
      genoSpareStatus: ["<32>{#p/asriel2}* It's vulnerable."],
      act_check: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Hotwire, the rhyming machine.\n* Such cleverness wasted on a pointless pass time.']
            : ['<32>{#p/story}* HOTWIRE - ATK 29 DEF 14\n* For this devious monster, no scheme is too complex.'],
      act_check2: [
         '<32>{#p/story}* HOTWIRE - ATK 29 DEF 14\n* The spark is fading for this otherwise ignited monster.'
      ],
      act_check3: ["<32>{#p/story}* HOTWIRE - ATK 29 DEF 14\n* This smoking hothead's rhymes might just catch fire."],
      act_check4: ['<32>{#p/story}* HOTWIRE - ATK 29 DEF 14\n* Re-kindling its love for rap, a-one-liner at a time.'],
      act_flirt: ['<32>{#p/human}* (You flirt with Hotwire.)', '<32>{#p/basic}* Hotwire flirts back!'],
      act_diss: ['<32>{#p/human}* (You let your best diss track loose on Hotwire.)'],
      dissTalk1: ['<08>{#p/basic}{~}If you wanna call me crap', '<08>{#p/basic}{~}You better know how to rap!'],
      dissTalk2: [
         '<08>{#p/basic}{~}Your disses are trash',
         '<08>{#p/basic}{~}So you might as well dash',
         '<08>{#p/basic}{~}Before I turn you to ash!'
      ],
      dissTalk3: [
         "<08>{#p/basic}{~}Bet you think you're so chic",
         "<08>{#p/basic}{~}You're just a wimpy pip- squeak",
         "<08>{#p/basic}{~}I'm the original hot streak",
         '<08>{#p/basic}{~}I make your insults look weak!'
      ],
      sparkText1: ["<32>{#p/human}* (You spark Hotwire's cables.)", "<32>{#p/basic}* Hotwire's confidence grows."],
      sparkText2: ["<32>{#p/human}* (You spark Hotwire's cables.)", '<32>{#p/basic}* Hotwire is peaking!'],
      sparkText3: ["<32>{#p/human}* (You spark Hotwire's cables.)", '<32>{#p/basic}* Hotwire is already powered up.'],
      rapText1: ['<32>{#p/human}* (You rap at Hotwire.)', '<32>{#p/basic}* Hotwire is indifferent towards you.'],
      rapText2: ['<32>{#p/human}* (You rap at Hotwire.)', '<32>{#p/basic}* Hotwire is disappointed in you.'],
      rapText3: ['<32>{#p/human}* (You rap at Hotwire.)', '<32>{#p/basic}* Hotwire is disgusted at you.'],
      idleTalk1: ['<08>{#p/basic}{~}No shame on this flame', '<08>{#p/basic}{~}I cannot be tamed!'],
      idleTalk2: ["<08>{#p/basic}{~}The name's Hotwire", "<08>{#p/basic}{~}I'm super hot fire!"],
      idleTalk3: ['<08>{#p/basic}{~}Even a noose', "<08>{#p/basic}{~}Won't stop me letting loose!"],
      idleTalk4: ["<08>{#p/basic}{~}I'm ablaze and unfazed", "<08>{#p/basic}{~}Can't step to my ways!"],
      idleTalk5: ["<08>{#p/basic}{~}I'm in the hot seat", '<08>{#p/basic}{~}So bring on the heat!'],
      flirtTalk: ['<08>{#p/basic}{~}My flirting is un- matched', "<08>{#p/basic}{~}There's no quip I won't catch!"],
      sparkTalk1A: [
         "<08>{#p/basic}{~}I'll serve you a hot one",
         "<08>{#p/basic}{~}Even if you're not one",
         '<08>{#p/basic}{~}Fire off like a shotgun!'
      ],
      sparkTalk2A: [
         "<08>{#p/basic}{~}This mark's about to get bruised",
         '<08>{#p/basic}{~}Four little words to describe the hurt',
         '<08>{#p/basic}{~}Lost, con- fused, beaten, abused!'
      ],
      sparkTalk3A: [
         '<08>{#p/basic}{~}Danger, danger, in comes a long- ranger',
         "<08>{#p/basic}{~}A sniper so wack, it's a life- changer",
         '<08>{#p/basic}{~}Only need one bullet in the chamber!'
      ],
      sparkFlirtTalkA: [
         '<08>{#p/basic}{~}I see you like it lovey dovey',
         '<08>{#p/basic}{~}Ready, steady, hot and heavy',
         "<08>{#p/basic}{~}This track's a real heart attack!"
      ],
      sparkTalk1B: [
         "<08>{#p/basic}{~}I flow like I'm stream- ing",
         '<08>{#p/basic}{~}Winsome smile is beaming',
         "<08>{#p/basic}{~}I'll whip you so bad, ooh",
         "<08>{#p/basic}{~}You'll wish you were dreaming"
      ],
      sparkTalk2B: [
         '<08>{#p/basic}{~}On a mission, consum- mated',
         "<09>{#p/basic}{~}I'm bi- partisan, nomi- nated",
         "<08>{#p/basic}{~}You're just a citizen, domi- nated",
         '<08>{#p/basic}{~}Even your SOUL is unculti- vated!'
      ],
      sparkTalk3B: [
         "<08>{#p/basic}{~}I'm a bonafide killer",
         "<08>{#p/basic}{~}You're a waste dist- iller",
         '<08>{#p/basic}{~}Your bars are lame fillers',
         '<08>{#p/basic}{~}Whereas mine are straight thril- lers!'
      ],
      sparkFlirtTalkB: [
         "<08>{#p/basic}{~}You're flirting with fire, bud",
         "<08>{#p/basic}{~}No shot you'll step to this stud",
         '<08>{#p/basic}{~}One mistake is all it takes',
         '<08>{#p/basic}{~}Before I land a rhyme in your face!'
      ],
      status1: ['<32>{#p/story}* Hotwire is looking for that extra little boost.'],
      status2: ['<32>{#p/story}* Hotwire is rhyming up a storm.'],
      status3: ['<32>{#p/story}* Hotwire is protected by its winsome smile.'],
      status4: ['<32>{#p/story}* Hotwire reaches for the turbocharger.'],
      status5: ['<32>{#p/story}* Smells like lyricism.'],
      sparkStatus1A: ['<32>{#p/story}* Hotwire is shocked at its own brilliance.'],
      sparkStatus2A: ['<32>{#p/story}* Hotwire begins its ignition sequence... manually.'],
      sparkStatus3A: ['<32>{#p/story}* Hotwire gets things going whether we like it or not.'],
      sparkStatus1B: ['<32>{#p/story}* Hotwire is feeling electric.'],
      sparkStatus2B: ['<32>{#p/story}* Hotwire has reached its true level.'],
      sparkStatus3B: ['<32>{#p/story}* Hotwire is turbocharged.'],
      hurtStatus: () =>
         world.goatbro ? ['<32>{#p/asriel2}* Almost dead.'] : ['<32>{#p/story}* Hotwire is spiraling out of control.']
   },

   b_opponent_perigee: {
      name: '* Perigee',
      epiphany: [
         ['<08>{#p/basic}{~}I shall be else- where.'],
         () =>
            world.meanie
               ? ['<08>{#p/basic}{~}It is no longer safe for me here.']
               : SAVE.data.b.oops && world.flirt > 9
                  ? ['<08>{#p/basic}{~}Is this love?']
                  : SAVE.data.b.oops
                     ? ['<08>{#p/basic}{~}I look forward to our friend- ship.']
                     : ['<08>{#p/basic}{~}Thank you..\nSo very much..'],
         ['<08>{#p/basic}{~}I under- stand why I must die.', '<08>{#p/basic}{~}Please..\nLive on in my name..'],
         ['<08>{#p/basic}{~}Take as much as you need.']
      ],
      genoStatus: ['<32>{#p/asriel2}* Perigee.'],
      act_check: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Perigee, the lethargic bird.\n* Spends too much time in its own happy-go-lucky head.']
            : ['<32>{#p/story}* PERIGEE - ATK 25 DEF 0\n* This bird of peace believes its feathers heal all wounds.'],
      act_check2: [
         '<33>{#p/story}* PERIGEE - ATK 25 DEF 0\n* This bird of peace is trying\n  to use its feathers to recover.'
      ],
      act_check3: ['<32>{#p/story}* PERIGEE - ATK 25 DEF 0\n* This bird of peace is also a patron of the arts.'],
      act_check4: [
         '<32>{#p/story}* PERIGEE - ATK 25 DEF 0\n* This bird of peace appreciates your love songs platonically.'
      ],
      act_flirt: ['<32>{#p/human}* (You flirt with Perigee.)'],
      act_yell: ['<32>{#p/human}* (You shout at Perigee.)'],
      idleTalk1: ['<08>{#p/basic}{~}Chirp, chirp.'],
      idleTalk2: ['<08>{#p/basic}{~}\x00*calming whistle*'],
      idleTalk3: ['<08>{#p/basic}{~}Life is good.'],
      idleTalk4: ['<08>{#p/basic}{~}\x00*flap- ping sounds*'],
      idleTalk5: ['<08>{#p/basic}{~}Peace and tran- quility.'],
      flirtTalk: ["<08>{#p/basic}{~}Hm?\nI don't under- stand..."],
      yellTalk1: ["<08>{#p/basic}{~}It's okay, I can help you feel better."],
      yellTalk2: ["<08>{#p/basic}{~}Here, I'll help you calm down."],
      yellTalk3: ["<08>{#p/basic}{~}Don't be upset.", '<08>{#p/basic}{~}You can always whistle another tune.'],
      flirtTalkX: [
         '<08>{#p/basic}{~}Ah, that cute remark was your song?',
         '<08>{#p/basic}{~}I accept it, and your gesture.'
      ],
      whistleTalkX: ['<08>{#p/basic}{~}I accept your gesture.'],
      whistleTalk: ['<08>{#p/basic}{~}\x00*intent whistle*'],
      whistleStatus: () =>
         world.goatbro ? ['<32>{#p/asriel2}* Perigee.'] : ['<32>{#p/story}* Perigee awaits your gesture.'],
      act_bow1: ['<32>{#p/human}* (But there was nothing to bow for yet.)'],
      act_bow2: ['<32>{#p/human}* (You bow.)\n* (Perigee bows back.)\n* (An understanding is reached.)'],
      act_whistle: [
         '<32>{#p/human}* (You whistle a tranquil tune.)\n* (Perigee whistles back.)\n* (The song goes on and on...)'
      ],
      status1: ['<32>{#p/story}* Perigee orbits closeby.'],
      status2: ['<32>{#p/story}* Perigee is living fancy-free.'],
      status3: ['<32>{#p/story}* Perigee is as happy as could be.'],
      status4: ['<32>{#p/story}* Perigee maintains a feather- light touch.'],
      status5: ['<32>{#p/story}* Smells like spare bread.'],
      status6: () =>
         world.goatbro ? ["<32>{#p/asriel2}* It's vulnerable."] : ['<32>{#p/story}* Perigee is satisfied.'],
      hurtStatus: () =>
         world.goatbro ? ['<32>{#p/asriel2}* Almost dead.'] : ["<32>{#p/story}* Perigee's time is near."]
   },

   b_opponent_tsundere: {
      name: '* Tsunderidex',
      epiphany: [
         ["<08>{#p/basic}{~}Y-yeah, I didn't want you around anyway!"],
         () =>
            world.meanie
               ? ['<08>{#p/basic}{~}Y-yeah!\nGet outta my way!']
               : SAVE.data.b.oops && world.flirt > 9
                  ? ['<08>{#p/basic}{~}Um..\nW-well..', '<08>{#p/basic}{~}.. well, I love you too!']
                  : SAVE.data.b.oops
                     ? ['<08>{#p/basic}{~}J-just friends, huh?', '<08>Sure thing, I guess..']
                     : ['<08>{#p/basic}{~}Eeeh?\nWhat are you..', '<08>{#p/basic}{~}.. oh..\nThanks, eheh..'],
         ["<08>{#p/basic}{~}If it's what you want..", "<08>{#p/basic}{~}I-I'll do it!"],
         ["<08>{#p/basic}{~}D-don't think it means I like you!"]
      ],
      act_check: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Tsunderidex, a monster I have utterly no words for.']
            : ['<32>{#p/story}* TSUNDERIDEX - ATK 25 DEF 26\n* Seems mean, but does it secretly like you?'],
      act_check2: [
         '<32>{#p/story}* TSUNDERIDEX - ATK 25 DEF 26\n* Caught in the self-sustaining battle of the tsunderes.'
      ],
      act_check3: ["<32>{#p/story}* TSUNDERIDEX - ATK 25 DEF 26\n* This hesitant lover's engine is now yours to ride."],
      act_check4: ['<32>{#p/story}* TSUNDERIDEX - ATK 25 DEF 26\n* Seems... jealous.'],
      act_check5: ['<32>{#p/story}* TSUNDERIDEX - ATK 25 DEF 26\n* Ready to burst.'],
      act_ignore: ["<32>{#p/human}* (You intentionally ignore Tsunderidex's presence.)"],
      flirtText1: ['<32>{#p/human}* (You tell Tsunderidex it has an impressive shield.)'],
      flirtText2: ['<32>{#p/human}* (You tell Tsunderidex it has nice cannons.)'],
      flirtText3: ['<32>{#p/human}* (You tell Tsunderidex it has a powerful jump drive.)'],
      flirtText4: ['<32>{#p/human}* (You tell Tsunderidex that you like its taste in virtual novels.)'],
      flirtText5: ['<32>{#p/human}* (You tell Tsunderidex that it has cute engine struts.)'],
      flirtText6: ["<32>{#p/human}* (You tell Tsunderidex that you'd like to supercharge its capacitor.)"],
      flirtText7: ["<32>{#p/human}* (You tell Tsunderidex that you'd like to clean it to a sparkle.)"],
      flirtText8: ['<32>{#p/human}* (You tell Tsunderidex its nose should be nuzzling yours.)'],
      flirtText9: ['<32>{#p/human}* (You tell Tsunderidex its roof scoop is second to none.)'],
      flirtText10: ['<32>{#p/human}* (You tell Tsunderidex it has breathtaking wings.)'],
      flirtText11: ['<32>{#p/human}* (You tell Tsunderidex it has a captivating underglow.)'],
      flirtText12: ["<32>{#p/human}* (You tell Tsunderidex you'd like to go where no human has gone before.)"],
      stealText: ['<32>{#p/human}* (You move in close to Tsunderidex to siphon its battery power.)'],
      upgradeText1: ["<32>{#p/human}* (You activate the slipstream flight module on Tsunderidex's engines.)"],
      upgradeText2: ["<32>{#p/human}* (You activate the transphasic firing mechanism on Tsunderidex's cannons.)"],
      upgradeText3: ["<32>{#p/human}* (You activate the auto-adaptive modulation on Tsunderidex's shields.)"],
      upgradeText4: [
         "<33>{#p/human}* (You can't activate further.)\n* (All of Tsunderidex's body parts are fully activated.)"
      ],
      idleTalk1: ["<08>{#p/basic}{~}It's not like I LIKE you."],
      idleTalk2: ['<08>{#p/basic}{~}Id.. idiot!'],
      idleTalk3: ["<08>{#p/basic}{~}Hmph!\nDon't get in my way."],
      idleTalk4: ['<08>{#p/basic}{~}(Eep..!)\nHuman..'],
      idleTalk5: ['<08>{#p/basic}{~}..\nH-human\n..\n..?'],
      flirtTalk1: ['<08>{#p/basic}{~}Huh!?\nY-you sicko!'],
      flirtTalk2: ['<08>{#p/basic}{~}I.. I think not!\nHmph!'],
      flirtTalk3: ['<08>{#p/basic}{~}Is that true..?'],
      flirtTalk4: ['<08>{#p/basic}{~}I..\nTh-thank you..'],
      flirtTalk5: ['<08>{#p/basic}{~}W-what?\nRight now???', '<08>{#p/basic}{~}This is too much..'],
      jellyTalk1: ["<08>{#p/basic}{~}H-hey!\nThat's not fair!"],
      jellyTalk2: ['<08>{#p/basic}{~}Ugh, you two are being weird.'],
      jellyTalk3: ['<08>{#p/basic}{~}S-stay away from them!'],
      upgradeTalk1: ['<08>{#p/basic}{~}Wh.. what are you doing??'],
      upgradeTalk2: ['<08>{#p/basic}{~}Um.\nHuman.'],
      upgradeTalk3: ['<08>{#p/basic}{~}Oh..\n..\nW-wow..'],
      stealTalk1: ["<08>{#p/basic}{~}D-don't do that!\nPlease."],
      stealTalk2: ['<08>{#p/basic}{~}..\n..\n(Why..)'],
      stealTalk3: ['<08>{#p/basic}{~}Quit stealing my thunder!'],
      ignoreTalk1: ['<08>{#p/basic}{~}Hmph!\nIgnore me all you want!'],
      ignoreTalk2: ["<08>{#p/basic}{~}Yeah!\nIt's not like I want you here!"],
      upgradeStatus1: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Are you actually going to do this right now?']
            : ['<32>{#p/story}* Tsunderidex is checking out its newly activated parts.'],
      upgradeStatus2: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* This is a waste of time...']
            : ['<32>{#p/story}* Tsunderidex is obsessing over its newly activated parts.'],
      upgradeStatus3: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* ...']
            : ['<32>{#p/story}* Tsunderidex is worried about its newly activated parts.'],
      status1: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Tsunderidex.']
            : ['<32>{#p/story}* Tsunderidex looks over, then turns up its nose.'],
      status2: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Tsunderidex.']
            : ['<32>{#p/story}* Tsunderidex shakes its nose dimissively at you.'],
      status3: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Tsunderidex.']
            : ['<32>{#p/story}* Tsunderidex \"accidentally\" bumps you with its nacelles.'],
      status4: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Tsunderidex.']
            : ['<32>{#p/story}* Tsunderidex sets its cannons to \"stun.\"'],
      status5: () =>
         world.goatbro ? ['<32>{#p/asriel2}* Tsunderidex.'] : ['<32>{#p/story}* Smells like space cacti.'],
      status6: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* It's vulnerable."]
            : ['<32>{#p/story}* Tsunderidex is looking away shyly.'],
      hurtStatus: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Almost dead.']
            : ["<32>{#p/story}* Tsunderidex's engines are leaking plasma."]
   },

   b_opponent_rg01: {
      name: () => (world.bad_lizard > 1 ? '* RG 01' : '* RG 03'),
      epiphaNOPE: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}Like, what are you even doing?']
            : ["<11>{#p/basic}{~}This ain't it, chief."],
      act_check: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* RG 01...\n* There's really not much to say about these guys."]
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* RG 01 - ATK 30 DEF 20\n* A confident lover who seems intent on ending you.']
               : ['<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Conspicuous cowgirl attitude.\n* Skeptic.'],
      act_check2: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* RG 01.\n* Only one left."]
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* RG 01 - ATK 30 DEF 20\n* Intent on ending you, even if it kills him.']
               : ['<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Planning on sharpening her falchion soon.'],
      act_check3: ['<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Re-united at last...'],
      act_check4: ['<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Broken.'],
      act_check5: ['<33>{#p/story}* RG 03 - ATK 30 DEF 20\n* Wants badly to say something...'],
      act_check6: ['<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Eager to make up for her lack of conviction.'],
      randTalk1: () => ['<11>{#p/basic}{~}Team attack.'],
      randTalk2: () =>
         world.bad_lizard > 1 ? ["<11>{#p/basic}{~}We'll stop you..."] : ["<11>{#p/basic}{~}We're just friends..."],
      randTalk3: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}You're no match for us."]
            : ["<11>{#p/basic}{~}You best not be shippin' us..."],
      randTalk4: () =>
         world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Careful, bro.'] : ['<11>{#p/basic}{~}Careful, girl.'],
      randStatus1: () =>
         world.bad_lizard > 1
            ? ['<32>{#p/story}* 01 and 02 attack in sync.']
            : ["<33>{#p/story}* 03 is living in the friendzone.\n* 04 doesn't question it."],
      randStatus2: () =>
         world.bad_lizard > 1
            ? ['<32>{#p/story}* 01 and 02 prepare their next assault.']
            : ['<32>{#p/story}* 03 casts her doubts aside for just a moment.\n* 04 breathes a sigh of relief.'],
      randStatus3: () =>
         world.bad_lizard > 1
            ? ['<32>{#p/story}* 01 and 02 slam their bodies together brotastically.']
            : ["<32>{#p/story}* 03 ponders about 04's history.\n* 04 shrugs."],
      randStatus4: () =>
         world.bad_lizard > 1
            ? ["<32>{#p/story}* Smells like men's body spray."]
            : ['<32>{#p/story}* Smells like perfume.'],
      randStatus5: () =>
         world.bad_lizard > 1
            ? ['<32>{#p/story}* 01 and 02 refer to themselves as \"brotally swagical.\"']
            : ['<32>{#p/story}* 03 puts on a brave face.\n* 04 replies non-verbally with her own bravery.'],
      randTalkLone1: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Suffer.']
            : ["<11>{#p/basic}{~}{@random=1.1/1.1}I'll never know..."],
      randTalkLone2: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}No mercy.']
            : ["<11>{#p/basic}{~}{@random=1.1/1.1}It's too late..."],
      randTalkLone3: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Unforgiv- able.']
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}I missed my chance...'],
      randTalkLone4: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Die.']
            : ["<11>{#p/basic}{~}{@random=1.1/1.1}It can't be..."],
      randStatusLone: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* One left.']
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* 01 seems even more focused than before.']
               : ['<32>{#p/story}* 03 is in disarray.'],

      act_flirt: ['<32>{#p/human}* (You flirt with 03.)'],
      flirtTalk1: ['<11>{#p/basic}{~}Flirting is strictly forbidden.'],
      flirtTalk2: ["<11>{#p/basic}{~}You think that's gonna work on us?"],
      flirtTalkNervy1: ['<11>{#p/basic}{~}Flirting is... ack...'],
      flirtTalkNervy2: ["<11>{#p/basic}{~}That's not really... ack..."],
      flirtTalkLone: ['<11>{#p/basic}{~}...'],
      flirtStatus: ['<32>{#p/story}* 03 struggles to contain her feelings.\n* 04 seems confused...'],
      flirtStatusNervy: ["<32>{#p/story}* 03's feelings are bursting at the seams.\n* 04 seems concerned..."],
      act_flirt_happy: [
         '<32>{#p/human}* (You flirt with 03.)\n* (She accepts the compliment, but remains focused on 04.)'
      ],
      act_flirt_nada: ["<32>{#p/human}* (You flirt with 01.)\n* (He doesn't seem to react in any significant way.)"],

      act_tug: ["<32>{#p/human}* (You try to pull on 03's glove, but she slaps your hand away.)"],
      tugTalk1: ['<11>{#p/basic}{~}Paws off, sister.'],
      tugTalk2: ['<11>{#p/basic}{~}No touchy.'],
      tugTalk3: ["<11>{#p/basic}{~}That's off- limits to you."],
      tugTalk4: ['<11>{#p/basic}{~}Nope.'],
      tugStatus: ['<32>{#p/story}* It would seem some boundaries are better left uncrossed.'],
      act_tug_lone: ["<32>{#p/human}* (You try to pull on 03's glove, but she raises it out of your reach.)"],
      tugTalkLone: ['<11>{#p/basic}{~}...'],
      tugStatusLone: ['<32>{#p/story}* 03 towers above you, masking her true expression.'],
      act_tug_happy: [
         "<32>{#p/human}* (You hold 03's paw.)",
         '<32>{#p/basic}* 03 mistakenly believes 04 is holding her paw...'
      ],

      tugShock: ['<11>{#p/basic}{~}04...!', '<11>{#p/basic}{~}...', '<11>{#p/basic}{~}That bracelet...'],
      nervyTalk1: ['<11>{#p/basic}{~}04, I...'],
      nervyTalk2: ['<11>{#p/basic}{~}04, we...'],
      nervyTalk3: ['<11>{#p/basic}{~}04, you...'],
      nervyTalk4: ["<11>{#p/basic}{~}04, it's..."],
      nervyStatus: ['<32>{#p/story}* The solar winds begin to shift towards your favor.'],

      act_whisper: ['<32>{#p/human}* (You whisper to 03 to open up about her feelings.)'],
      act_whisper_alt: ['<32>{#p/human}* (You whisper to 03.)\n* (Nothing happens.)'],

      confess1: ['<11>{#p/basic}{~}04...'],
      confess2: ['<11>{#p/basic}{~}...', '<11>{#p/basic}{~}... yeah, 03?'],
      confess3: ['<11>{#p/basic}{~}Look at me, 04...'],
      confess4: ["<11>{#p/basic}{~}But that's..."],
      confess5: ['<11>{#p/basic}{~}The bracelet of unity...', '<11>{#p/basic}{~}Remember?'],
      confess6: [
         "<11>{#p/basic}{~}It's you...",
         "<11>{#p/basic}{~}I thought I'd lost you, all those years ago...",
         "<11>{#p/basic}{~}I thought I'd never see you again.",
         "<11>{#p/basic}{~}But now...\nAfter graduating from Undyne's training..."
      ],
      confess7: [
         "<11>{#p/basic}{~}We're together again, 04.\nJust like before.",
         '<11>{#p/basic}{~}And, no matter what names we go by...',
         '<11>{#p/basic}{~}I will always love you.'
      ],
      confess8: ['<11>{#p/basic}{~}03, I...', '<11>{#p/basic}{~}I love you too!'],
      confess9: ['<11>{#p/basic}{~}... do you wanna get some ice cream?'],
      confess10: ['<11>{#p/basic}{~}Salmon- flavored?'],
      confess11: ['<11>{#p/basic}{~}You know it!'],

      happyTalk1: ['<11>{#p/basic}{~}I missed you...'],
      happyTalk2: ["<11>{#p/basic}{~}I'm glad you're here..."],
      happyTalk3: ['<11>{#p/basic}{~}To think it was you, all this time...'],
      happyTalk4: ['<11>{#p/basic}{~}To think I forgot about those beautiful eyes...'],
      happyStatus: ['<32>{#p/story}* 03 and 04 are looking happily at each other.'],

      horrorTalk1: [
         '<11>{#p/basic}{~}{@random=1.1/1.1}N... no...',
         '<11>{#p/basic}{~}{@random=1.1/1.1}We were gonna be... so happy together...'
      ],
      horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}I can't go on..."],
      horrorTalk3: ["<11>{#p/basic}{~}{@random=1.1/1.1}I don't want to live like this anymore..."],
      horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],
      horrorStatus: ['<32>{#p/story}* ...'],

      dangerStatus: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Almost dead.']
            : world.bad_lizard > 1
               ? ["<32>{#p/story}* 01's gaze pans downwards to the floor."]
               : ["<32>{#p/story}* 03's breathing intensifies."]
   },

   b_opponent_rg02: {
      name: () => (world.bad_lizard > 1 ? '* RG 02' : '* RG 04'),
      epiphaNOPE: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}I don't get this at all..."]
            : ["<11>{#p/basic}{~}That won't work on me."],
      act_check: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* RG 02...\n* There's really not much to say about these guys."]
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* RG 02 - ATK 30 DEF 20\n* A confident lover who seems intent on stopping you.']
               : ["<33>{#p/story}* RG 04 - ATK 30 DEF 20\n* Believes in friendship, but isn't against something more..."],
      act_check2: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* RG 02.\n* Only one left."]
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* RG 02 - ATK 30 DEF 20\n* Intent on stopping you, no matter what it takes.']
               : ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Planning on shopping for new armor soon.'],
      act_check3: ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Re-united at last...'],
      act_check4: ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Broken.'],
      act_check5: ['<33>{#p/story}* RG 04 - ATK 30 DEF 20\n* Feeling somewhat exposed...'],
      act_check6: ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Eager to see you dead.'],
      randTalk1: () => ['<11>{#p/basic}{~}Team attack!'],
      randTalk2: () =>
         world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Once and for all!'] : ['<11>{#p/basic}{~}Absolutely!'],
      randTalk3: () =>
         world.bad_lizard > 1 ? ["<11>{#p/basic}{~}You don't stand a chance!"] : ['<11>{#p/basic}{~}No romance here!'],
      randTalk4: () =>
         world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Totally, bro!'] : ['<11>{#p/basic}{~}Oh you know it, girl!'],
      randTalkLone1: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}{@random=1.1/1.1}It's over for you!!"]
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}How could you do this to me...!?'],
      randTalkLone2: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}{@random=1.1/1.1}Don't even try!!"]
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}She was my only friend...!'],
      randTalkLone3: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Prepare to be wiped out!!']
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}She was everything to me...!'],
      randTalkLone4: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}{@random=1.1/1.1}I'm gonna make you pay!!"]
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}What kind of creature are you...!?'],
      randStatusLone: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* One left.']
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* 02 has lost his temper.']
               : ['<32>{#p/story}* 04 is in shambles.'],

      act_flirt: ['<32>{#p/human}* (You flirt with 04.)'],
      flirtTalk1: ["<11>{#p/basic}{~}It's in the rules!"],
      flirtTalk2: ["<11>{#p/basic}{~}It won't!"],
      flirtTalkNervy1: ["<11>{#p/basic}{~}It's against the rules!"],
      flirtTalkNervy2: ["<11>{#p/basic}{~}It's not our thing!"],
      flirtTalkLone: ['<11>{#p/basic}{~}...'],
      act_flirt_happy: [
         "<32>{#p/human}* (You flirt with 04.)\n* (She's flattered, but her eyes remain locked with 03.)"
      ],
      act_flirt_nada: ["<32>{#p/human}* (You flirt with 02.)\n* (He doesn't seem to react in any significant way.)"],

      act_tug: ["<32>{#p/human}* (You pull on 04's glove.)", "<32>{#p/basic}* 04's glove seems loose..."],
      tugTalk1: ['<11>{#p/basic}{~}W-what are you doing?'],
      tugTalk2: ["<11>{#p/basic}{~}Don't tell me you're going to..."],
      tugTalk3: ['<11>{#p/basic}{~}I...\nThis is...'],
      tugTalk4: ['<11>{#p/basic}{~}...'],
      tugStatus: ["<32>{#p/story}* 04's glove is slipping."],
      act_tug_lone: ["<32>{#p/human}* (You pull on 04's glove.)", "<32>* 04's glove comes right off!"],
      tugTalkLone: ['<11>{#p/basic}{~}...'],
      tugStatusLone: ['<32>{#p/story}* 04 shows no resistance.'],
      act_tug_hold: ["<32>{#p/human}* (You hold 04's claw.)"],
      holdTalk: ['<11>{#p/basic}{~}Uh...'],
      holdStatus: ['<32>{#p/story}* 04 is not really sure what to make of this.'],
      act_tug_hold_lone: ["<32>{#p/human}* (You hold 04's claw.)\n* (Nothing happens.)"],
      holdTalkLone: ['<11>{#p/basic}{~}...'],
      holdStatusLone: ['<32>{#p/story}* 04 just lets it happen.'],
      act_tug_happy: [
         "<32>{#p/human}* (You hold 04's claw.)",
         '<32>{#p/basic}* 04 mistakenly believes 03 is holding her claw...'
      ],
      tugSuccessStatus: ['<32>{#p/story}* The veil has been lifted.'],

      tugShock: ["<11>{#p/basic}{~}My glove...\nIt's coming off...!"],
      nervyTalk1: ['<11>{#p/basic}{~}03...?'],
      nervyTalk2: ['<11>{#p/basic}{~}Why are you looking at me that way?'],
      nervyTalk3: ["<11>{#p/basic}{~}What's with that face, 03?"],
      nervyTalk4: ['<11>{#p/basic}{~}Are you okay?'],

      act_whisper: ['<32>{#p/human}* (You whisper to 04, but she just seems confused.)'],
      act_whisper_alt: ['<32>{#p/human}* (You whisper to 04.)\n* (Nothing happens.)'],

      happyTalk1: ['<11>{#p/basic}{~}I missed you too!'],
      happyTalk2: ["<11>{#p/basic}{~}I'm glad YOU'RE here!"],
      happyTalk3: ['<11>{#p/basic}{~}Haha, yeah...'],
      happyTalk4: ['<11>{#p/basic}{~}Think nothing of it, sweetheart!'],

      horrorTalk1: [
         '<11>{#p/basic}{~}{@random=1.1/1.1}N... no...',
         '<11>{#p/basic}{~}{@random=1.1/1.1}We were gonna do... so much together...'
      ],
      horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}I can't accept it..."],
      horrorTalk3: ['<11>{#p/basic}{~}{@random=1.1/1.1}Just... kill me...'],
      horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],

      dangerStatus: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* Almost dead.']
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* 02 holds his head high.']
               : ["<32>{#p/story}* 04's breathing intensifies."]
   },

   b_use: {
      old_spray: () =>
         battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
            ? []
            : ['<32>{#p/human}* (You took out the Sugar Spray.)', '<32>{#p/human}* (Nothing happens.)'],
      old_gun: () =>
         battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
            ? []
            : ['<32>{#p/human}* (You took out the Stun Gun.)', '<32>{#p/human}* (Nothing happens.)'],
      old_bomb: () =>
         battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
            ? []
            : ['<32>{#p/human}* (You took out the Sleep Bomb.)', '<32>{#p/human}* (Nothing happens.)']
   },

   c_name_aerialis: {
      alphys: "Alphys's Phone",
      puzzle: 'Puzzle Help',
      dimboxA: 'Dimensional Box A',
      dimboxB: 'Dimensional Box B',
      pms: () => (SAVE.data.n.plot_pmcheck < pms().length ? '§fill=#ff0§OuterNet (NEW)' : 'OuterNet')
   },

   c_call_aerialis: {
      puzzle2a: () =>
         [
            [
               '<25>{#p/alphys}{#g/alphysCutscene1}* Oh, h-hey!',
               '<25>{#g/alphysCutscene2}* So... this puzzle is actually kinda simple.',
               '<25>{#g/alphysSide}* Each time you pass by a terminal, it alters your phase.',
               "<25>{#g/alphysSmileSweat}* Or, in layman's terms, how far you are along the fourth dimension.",
               "<25>{#g/alphysInquisitive}* Except it's not really a dimension, but... you get the idea.",
               '<25>{#g/alphysNervousLaugh}* Anyway, to pass through the puzzle, just align your local phase...',
               '<25>{#g/alphysHellYeah}* ... with the global phase shift of the room!',
               '<25>{#g/alphysCutscene2}* Which you can do by walking forwards and backwards, of course.',
               '<25>{#g/alphysSmileSweat}* A-and, the terminals are set to display your local phase offset...',
               "<25>{#g/alphysSide}* That way, you'll know when you're properly aligned.",
               '<25>{#g/alphysCutscene1}* Well, g-good luck!'
            ],
            [
               '<25>{#p/alphys}{#g/alphysInquisitive}* ... still stuck?',
               '<25>{#g/alphysCutscene2}* Hmmm...',
               '<25>* I guess my explanation WAS a bit wordy...\n* Ehehe.',
               '<25>{#g/alphysSide}* Really, you just have to get to the terminal that says zero on it.',
               "<25>{#g/alphysNervousLaugh}* Again, it's all about phase offset.",
               '<25>{#g/alphysCutscene2}* As long as your local phase is aligned...',
               '<25>{#g/alphysCutscene2}* ...',
               "<25>{#g/alphysUhButHeresTheDeal}* Just g-get to zero and you're home free!!"
            ],
            [
               '<25>{#p/alphys}{#g/alphysInquisitive}* ... still?',
               '<25>{#g/alphysSmileSweat}* Uh, uh...\n* Walk forwards, until...',
               '<25>{#g/alphysSideSad}* ... wait, what if you already went past it?',
               '<25>{#g/alphysNeutralSweat}* ...',
               "<25>{#g/alphysCutscene3}* You're smart, f-figure it out yourself!"
            ]
         ][SAVE.data.n.cell_puzzleA1++],
      puzzle2b: () =>
         [
            [
               '<25>{#p/alphys}{#g/alphysCutscene1}* Oh, h-hey!',
               '<25>{#p/alphys}{#g/alphysCutscene2}* This puzzle is a little more complicated than the last one.',
               "<25>{#p/alphys}{#g/alphysWelp}* Y'know, b-because of the whole extra dimension added.",
               '<25>{#p/alphys}{#g/alphysCutscene3}* Sometimes I question whether that actually makes it harder.',
               '<25>{#p/alphys}{#g/alphysSmileSweat}* Well, uh, l-like the last one, you just need to align your phase.',
               "<25>{#p/alphys}{#g/alphysFR}* If you don't know what that is by now...",
               "<25>{#p/alphys}{#g/alphysSide}* I'd say you've probably b-been living in an asteroid all this time."
            ],
            [
               '<25>{#p/alphys}{#g/alphysInquisitive}* ... so you HAVE been living in an asteroid.',
               '<25>{#p/alphys}{#g/alphysDontGetAllDreamyEyedOnMeNow}* Jeez, just find the terminal that says zero on it!'
            ]
         ][SAVE.data.n.cell_puzzleA2++]
   },

   i_tvm_radio: {
      battle: {
         description: 'An old earth radio.',
         name: 'Radio'
      },
      drop: ['<32>{#p/human}* (You throw away the Old Radio.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (This artifact looks a lot like other things you're used to seeing all the time.)"]
            : ["<32>{#p/basic}* It's an old earth radio."],
      name: 'Old Radio',
      use: () =>
         !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
            ? []
            : ['a_lookout', 'f_taxi', 's_taxi', 'w_wonder'].includes(game.room) // NO-TRANSLATE

               ? [
                  '<32>{#p/human}* (You turned on the Old Radio.)',
                  '<32>{#p/event}{#a.radiostart}* ...',
                  '{*}{#a.radiostop}{%}'
               ]
               : ['<32>{#p/human}* (You turned on the Old Radio.)\n* (No signal.)']
   },
   i_tvm_fireworks: {
      battle: {
         description: 'A box of fireworks from earth.',
         name: 'Fireworks'
      },
      drop: ['<32>{#p/human}* (You throw away the Fireworks box.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (This supposed artifact looks like nothing else you've seen.)"]
            : ["<32>{#p/basic}* It's a box of fireworks from earth."],
      name: 'Fireworks',
      use: () =>
         !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
            ? []
            : [
               '<32>{#p/human}* (You peered into the Fireworks box.)',
               "<32>* (You can't seem to figure out how to use these.)"
            ]
   },
   i_tvm_mewmew: {
      battle: {
         description: 'A life-sized Mew Mew doll.',
         name: 'Doll'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Mew Mew Doll.)',
         ...((fetchCharacters()
            .find(c => c.key === 'alphys') // NO-TRANSLATE

            ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
            ? ((SAVE.data.b.mewget = true),
               [
                  "<25>{#p/alphys}{#f/23}* Wow, you're so kind for leaving that there for me.",
                  '<25>{#p/alphys}{#f/22}* It only TOOK YOU LONG ENOUGH!!!',
                  '<25>{#p/alphys}{#g/alphysCutscene2}* ... thanks, I guess.'
               ])
            : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

               ? [
                  "<32>{#p/basic}* You're leaving it here??",
                  '<32>{#p/basic}* Well... what makes you think I want it, HUH!?',
                  "<32>{#p/basic}* Because, I DON'T!\n* It's... just a stupid doll!",
                  '<32>{#p/basic}* I guess... it is kind of cute, though...',
                  "<32>{#p/basic}* W-what are you looking at!?\n* I'm not blushing!",
                  '<32>{#p/basic}* Not on the outside, anyway...',
                  '<32>{#p/basic}* ...'
               ]
               : [])
      ],
      info: ["<32>{#p/basic}* It's a life-sized Mew Mew doll, what else would it be?"],
      name: 'Mew Mew Doll',
      use: () =>
         !world.genocide &&
            battler.active &&
            (battler.alive[0].opponent.metadata.reactTVM || battler.alive[0].opponent.metadata.reactMewMew)
            ? []
            : [
               '<32>{#p/human}* (You use the Mew Mew Doll.)',
               ...((fetchCharacters()
                  .find(c => c.key === 'alphys') // NO-TRANSLATE

                  ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                  ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                  : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

                     ? ['<32>{#p/basic}* Would you quit waving that thing around?']
                     : game.room === 'f_blooky' && // NO-TRANSLATE

                        !world.genocide &&
                        SAVE.data.n.plot !== 47.2 &&
                        !SAVE.data.b.a_state_napstadecline
                        ? ['<32>{#p/napstablook}* oh............']
                        : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                           ? []
                           : ['<32>{#p/basic}* What were you even expecting to happen here...?'])
            ]
   },
   i_starfait: {
      battle: {
         description: 'There is such a thing as too much sugar.',
         name: 'Starfaint'
      },
      drop: ['<32>{#p/human}* (You throw away the Starfaint.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (23 HP.)']
            : ['<32>{#p/basic}* \"Starfaint\" Heals 23 HP\n* There is such a thing as too much sugar.'],
      name: 'Starfaint',
      use: ['<32>{#p/human}* (You consume the Starfaint.)']
   },
   i_legendary_hero: {
      battle: {
         description: "A shieldwich you can hold to heal after the opponent's turn.",
         name: 'H.Y.G.'
      },
      drop: ['<32>{#p/human}* (You throw away the Hold Yer Grane.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (40 HP.)']
            : [
               '<33>{#p/basic}* \"Hold Yer Grane\" Heals 40 HP\n* A shieldwich you can hold to heal after the opponent\'s turn.'
            ],
      name: 'Hold Yer Grane',
      use: () =>
         battler.active
            ? [
               '<32>{#p/human}* (You brandish the Hold Yer Grane proudly.)',
               '<32>{#p/story}* DEFENSE up for this turn!'
            ]
            : ['<32>{#p/human}* (You eat the Hold Yer Grane.)']
   },
   i_glamburger: {
      battle: {
         description: 'This high-octane hamburger harbors a certain spicy kick.',
         name: 'Slamburger'
      },
      drop: () => [
         '<32>{#p/human}* (You knocked the Slamburger out of the park.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : ["<32>{#p/basic}* And that's a home run!"])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (34 HP.)']
            : ['<32>{#p/basic}* \"Slamburger\" Heals 34 HP\n* This high-octane hamburger harbors a certain spicy kick.'],
      name: 'Slamburger',
      use: () => [
         '<32>{#p/human}* (You slammed down the Slamburger.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : ["<32>{#p/basic}* Careful, it's hot in more ways than one!"])
      ]
   },
   i_face_steak: {
      battle: {
         description: 'How the turns have tabled.',
         name: "G's Envy"
      },
      drop: ["<32>{#p/human}* (You throw away the Glyde's Envy.)"],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (55 HP.)']
            : ['<32>{#p/basic}* \"Glyde\'s Envy\" Heals 55 HP\n* How the turns have tabled.'],
      name: "Glyde's Envy",
      use: ["<32>{#p/human}* (You consume the Glyde's Envy.)"]
   },
   i_starfait_x: {
      battle: {
         description: '...',
         name: 'Startaint'
      },
      drop: ['<32>{#p/human}* (You throw away the Startaint.)'],
      info: ['<32>{#p/basic}* \"Startaint\" Heals -23 HP\n* ...'],
      name: 'Startaint',
      use: ['<32>{#p/human}* (You consume the Startaint.)']
   },
   i_legendary_hero_x: {
      battle: {
         description: '...',
         name: 'H.Y.P.'
      },
      drop: ['<32>{#p/human}* (You throw away the Hold Yer Pain.)'],
      info: ['<32>{#p/basic}* \"Hold Yer Pain\" Heals -40 HP\n* ...'],
      name: 'Hold Yer Pain',
      use: () =>
         battler.active
            ? [
               '<32>{#p/human}* (You brandish the Hold Yer Pain anxiously.)',
               '<32>{#p/story}* DEFENSE down for this turn!'
            ]
            : ['<32>{#p/human}* (You eat the Hold Yer Pain.)']
   },
   i_glamburger_x: {
      battle: {
         description: '...',
         name: 'Slamdunker'
      },
      drop: ['<32>{#p/human}* (You dunk the Slamdunker into the trash.)'],
      info: ['<32>{#p/basic}* \"Slamdunker\" Heals -34 HP\n* ...'],
      name: 'Slamdunker',
      use: ['<32>{#p/human}* (You slammed down the Slamdunker.)']
   },
   i_face_steak_x: {
      battle: {
         description: '...',
         name: 'Envy'
      },
      drop: ["<32>{#p/human}* (You throw away the Undyne's Envy.)"],
      info: ['<32>{#p/basic}* \"Undyne\'s Envy\" Heals -55 HP\n* ...'],
      name: "Undyne's Envy",
      use: ["<32>{#p/human}* (You eat the Undyne's Envy.)"]
   },
   i_trash: {
      battle: {
         description: 'Are you brave enough to eat literal garbage?',
         name: 'Space Junk'
      },
      drop: ['<32>{#p/human}* (You throw away the Space Junk.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (?? HP.)']
            : ['<32>{#p/basic}* \"Space Junk\" Heals ?? HP\n* Are you brave enough to eat literal garbage?'],
      name: 'Space Junk',
      use: () => [
         '<32>{#p/human}* (You eat the Space Junk.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* Dear god.'])
      ]
   },
   i_laser: {
      battle: {
         description: 'Critical hits with this weapon deal MASSIVE damage.',
         name: 'Laser Rifle'
      },
      drop: ['<32>{#p/human}* (You throw away the Laser Rifle.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (12 AT.)']
            : ['<32>{#p/basic}* \"Laser Rifle\" (12 AT)\n* Critical hits with this weapon deal MASSIVE damage.'],
      name: 'Laser Rifle',
      use: ['<32>{#p/human}* (You equip the Laser Rifle.)']
   },
   i_laser_x: {
      battle: {
         description: 'Critical hits with this weapon are decent enough.',
         name: 'Rifle?'
      },
      drop: ['<32>{#p/human}* (You throw away the Laser Rifle.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (10 AT.)']
            : ['<32>{#p/basic}* \"Laser Rifle?\" (10 AT)\n* Critical hits with this weapon are decent enough.'],
      name: 'Laser Rifle?',
      use: ['<32>{#p/human}* (You equip the Laser Rifle.)']
   },
   i_visor: {
      battle: {
         description: 'Increases aim time in battle.',
         name: 'Visor'
      },
      drop: ['<32>{#p/human}* (You throw away the Tactical Visor.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (12 DF.)']
            : ['<32>{#p/basic}* \"Tactical Visor\" (12 DF)\n* Increases aim time in battle.'],
      name: 'Tactical Visor',
      use: ['<32>{#p/human}* (You wear the Tactical Visor.)']
   },
   i_visor_x: {
      battle: {
         description: 'A bit less tactical than the original. Increases aim time.',
         name: 'Visor?'
      },
      drop: ['<32>{#p/human}* (You throw away the Tactical Visor.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (10 DF.)']
            : [
               '<32>{#p/basic}* \"Tactical Visor?\" (10 DF)\n* A bit less tactical than the original. Increases aim time.'
            ],
      name: 'Tactical Visor?',
      use: ['<32>{#p/human}* (You wear the Tactical Visor.)']
   },
   i_filament: {
      battle: {
         description: 'A winding wick of flavors!\nFive uses left.',
         name: 'Filament'
      },
      drop: ['<32>{#p/human}* (You throw away the Filament.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (30 HP.)']
            : ['<32>{#p/basic}* \"Filament\" Heals 30 HP\n* A winding wick of flavors!\n* Five uses left.'],
      name: 'Quintuple Filament',
      use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
   },
   i_filament_use1: {
      battle: { description: 'A winding wick of flavors!\nFour uses left.', name: 'Filament' },
      drop: ['<32>{#p/human}* (You throw away the Filament.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (25 HP.)']
            : ['<32>{#p/basic}* \"Filament\" Heals 25 HP\n* A winding wick of flavors!\n* Four uses left.'],
      name: 'Quadruple Filament',
      use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
   },
   i_filament_use2: {
      battle: { description: 'A winding wick of flavors!\nThree uses left.', name: 'Filament' },
      drop: ['<32>{#p/human}* (You throw away the Filament.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (20 HP.)']
            : ['<32>{#p/basic}* \"Filament\" Heals 20 HP\n* A winding wick of flavors!\n* Three uses left.'],
      name: 'Triple Filament',
      use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
   },
   i_filament_use3: {
      battle: { description: 'A winding wick of flavors!\nTwo uses left.', name: 'Filament' },
      drop: ['<32>{#p/human}* (You throw away the Filament.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (15 HP.)']
            : ['<32>{#p/basic}* \"Filament\" Heals 15 HP\n* A winding wick of flavors!\n* Two uses left.'],
      name: 'Double Filament',
      use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
   },
   i_filament_use4: {
      battle: { description: 'A winding wick of flavors!\nOne use left.', name: 'Filament' },
      drop: ['<32>{#p/human}* (You throw away the Filament.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (10 HP.)']
            : ['<32>{#p/basic}* \"Filament\" Heals 10 HP\n* A winding wick of flavors!\n* One use left.'],
      name: 'Filament',
      use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
   },
   i_tablaphone: {
      battle: {
         description: 'Flat, but sharp. Restores some lost HP after each turn.',
         name: 'Tablaphone'
      },
      drop: ['<32>{#p/human}* (You throw away the Tablaphone.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (10 AT.)']
            : ['<32>{#p/basic}* \"Tablaphone\" (10 AT)\n* Flat, but sharp. Restores some lost HP after each turn.'],
      name: 'Tablaphone',
      use: ['<32>{#p/human}* (You equip the Tablaphone.)']
   },
   i_sonic: {
      battle: {
         description: "Your opposition's attacks have a small chance to heal you.",
         name: 'Resonator'
      },
      drop: ['<32>{#p/human}* (You throw away the Sonic Resonator.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (11 DF.)']
            : [
               '<32>{#p/basic}* \"Sonic Resonator\" (11 DF)\n* Your opposition\'s attacks have a small chance to heal you.'
            ],
      name: 'Sonic Resonator',
      use: ['<32>{#p/human}* (You equip the Sonic Resonator.)']
   },
   i_mystery_food: {
      battle: {
         description: 'The kind of food you expect to find at a rec center.',
         name: 'Mysteryfood'
      },
      drop: ['<32>{#p/human}* (You throw away the Mysteryfood.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (13 HP.)']
            : ['<32>{#p/basic}* \"Mysteryfood\" Heals 13 HP\n* The kind of food you expect to find at a rec center.'],
      name: 'Mysteryfood',
      use: ['<32>{#p/human}* (You eat the Mysteryfood.)']
   },
   i_super_pop: {
      battle: {
         description: 'Alters your perception of time.',
         name: 'Hyper Pop'
      },
      drop: ['<32>{#p/human}* (You throw away the Hyper Vortex Pop.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (22 HP.)']
            : [
               '<33>{#p/basic}* \"Hyper Vortex Pop\" Heals 22 HP\n* Alters your perception of time.\n* Not viable outside of battle.'
            ],
      name: 'Hyper Vortex Pop',
      use: () => [
         '<32>{#p/human}* (You sucked on the Hyper Vortex Pop.)',
         ...(battler.active
            ? game.vortex
               ? ['<32>{#p/human}* (Your perception of time is already shifted.)']
               : [
                  '<32>{#p/human}* (Your perception of time begins to shift.)',
                  '<32>{#p/story}* FOCUS up for two turns!'
               ]
            : ['<32>{#p/human}* (No effect outside of battle.)'])
      ]
   },
   i_old_gun: {
      battle: {
         description: 'A non-violent single-use weapon.',
         name: 'Stun Gun'
      },
      drop: ['<32>{#p/human}* (You throw away the Stun Gun.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (You get the sense this item shouldn't be carried as lightly as one might think.)"]
            : ['<32>{#p/basic}* A non-violent single-use weapon.\n* Not viable outside of battle.'],
      name: 'Stun Gun',
      use: () =>
         battler.active
            ? []
            : ['<32>{#p/human}* (You took out the Stun Gun.)', '<32>{#p/human}* (No effect outside of battle.)']
   },
   i_old_bomb: {
      battle: {
         description: 'A non-violent single-use weapon.',
         name: 'Sleep Bomb'
      },
      drop: ['<32>{#p/human}* (You throw away the Sleep Bomb.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (You get the sense this item wouldn't be as calming as one would hope.)"]
            : ['<32>{#p/basic}* A non-violent single-use weapon.\n* Not viable outside of battle.'],
      name: 'Sleep Bomb',
      use: () =>
         battler.active
            ? []
            : ['<32>{#p/human}* (You took out the Sleep Bomb.)', '<32>{#p/human}* (No effect outside of battle.)']
   },
   i_old_spray: {
      battle: {
         description: 'A non-violent single-use weapon.',
         name: 'Sugar Spray'
      },
      drop: ['<32>{#p/human}* (You throw away the Sugar Spray.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (You get the sense this item isn't as sweet as it seems.)"]
            : ['<32>{#p/basic}* A non-violent single-use weapon.\n* Not viable outside of battle.'],
      name: 'Sugar Spray',
      use: () =>
         battler.active
            ? []
            : ['<32>{#p/human}* (You took out the Sugar Spray.)', '<32>{#p/human}* (No effect outside of battle.)']
   },
   i_corndog: {
      battle: {
         description: 'Fresh from the microwave.',
         name: 'Corn Dog'
      },
      drop: ['<32>{#p/human}* (You throw away the Corn Dog.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (10 HP.)']
            : ['<32>{#p/basic}* \"Corn Dog\" Heals 10 HP\n* Fresh from the microwave.'],
      name: 'Corn Dog',
      use: ['<32>{#p/human}* (You eat the Corn Dog.)']
   },
   i_corngoat: {
      battle: {
         description: "Like a corn dog, but fluffier.\nDon't question it.",
         name: 'Corn Goat'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Corn Goat.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom ? ['<25>{#p/asriel1}{#f/15}* ...'] : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (20 HP.)']
            : ['<32>{#p/basic}* \"Corn Goat\" Heals 20 HP\n* Like a corn dog, but fluffier.\n* Don\'t question it.'],
      name: 'Corn Goat',
      use: () => [
         '<32>{#p/human}* (You eat the Corn Goat.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? ["<25>{#p/asriel1}{#f/13}* Please don't tell me that's symbolic of anything..."]
            : [])
      ]
   },
   i_moon_pie: {
      battle: {
         description: "A slice of pie from the Earth's night sky.",
         name: 'Moon Pie'
      },
      drop: ['<32>{#p/human}* (You throw away the Moon Pie.)'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (99 HP.)']
            : ['<32>{#p/basic}* \"Moon Pie\" Heals 99 HP\n* A slice of pie from the Earth\'s night sky.'],
      name: 'Moon Pie',
      use: ['<32>{#p/human}* (You eat the Moon Pie.)']
   },
   i_orange_soda: {
      battle: {
         description: 'A crushingly orange soda.\nTolerable.',
         name: 'Orange Soda'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Orange Soda.)',
         ...((fetchCharacters()
            .find(c => c.key === 'alphys') // NO-TRANSLATE

            ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
            ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>* Did you just throw away a perfectly good orange soda?']
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* (16 HP.)']
            : ['<32>{#p/basic}* \"Orange Soda\" Heals 16 HP\n* A crushingly orange soda.\n* Tolerable.'],
      name: 'Orange Soda',
      use: () =>
         world.meanie
            ? [
               '<32>{#p/human}* (You drink the Orange Soda, and crush it in your hands.)',
               battler.active
                  ? `<32>{#p/story}* ATTACK up by ${8 + battler.at_bonus}!`
                  : '<32>{#p/human}* (No effect outside of battle.)',
               ...((fetchCharacters()
                  .find(c => c.key === 'alphys') // NO-TRANSLATE

                  ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                  ? [
                     '<25>{#p/alphys}{#g/alphysOhGodNo}* W-was that my drink!?',
                     '<25>{#p/alphys}{#f/10}* Oh... my god...',
                     '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* You did not hold back!'
                  ]
                  : [])
            ]
            : ['<32>{#p/human}* (You drink the Orange Soda.)']
   },
   i_demise: {
      battle: {
         description: '...',
         name: 'Demise'
      },
      drop: ["<32>{#p/human}* (You throw away the Plunderer's Demise.)"],
      info: ['<32>{#p/basic}* \"Plunderer\'s Demise\"\n* Heals -99 HP\n* ...'],
      name: "Plunderer's Demise",
      use: ["<32>{#p/human}* (You eat the Plunderer's Demise.)"]
   },

   k_liftgate: {
      name: 'Liftgate Pass',
      description: 'Acquired from your upgraded CELL.\nUsed to access the liftgate network.'
   },

   k_mystery: {
      name: 'Mystery Key',
      description: () =>
         SAVE.data.b.f_state_hapstadoor
            ? "Used to unlock the door to Mettaton's house."
            : "Acquired from Bratty and Catty's shop in the rec center."
   },

   m_aerialis: {
      sidebarCellPms1: () => (world.bad_lizard < 2 ? 'POSTS (NEWEST FIRST)' : 'PRIVATE MESSAGES (NEWEST FIRST)'),
      sidebarCellPms2: 'Press [X] to Finish',
      sidebarCellPms3: {
         alphysBadLizard: {
            author: 'SYSTEM',
            pm: 'An evacuation notice has been issued in your area. Vacate at once.'
         },
         alphys0: {
            author: 'SYSTEM',
            pm: "Thank you for creating an account on the outpost's #1 social network!"
         },
         alphys1: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? 'uhhhh nobody saw that right' 
                  : [
                     'finally met the human that was kinda nervewracking LOL', 
                     'well i just met the human' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys2: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? 'ok good' 
                  : [
                     iFancyYourVilliany()
                        ? 'still cant believe mettaton gave them a moniker???'
                        : 'still cant believe mettaton wanted me to fight them???', 
                     'they seem... nice?' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys3: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? 'yeah that wouldve been pretty embarrasing otherwise' 
                  : [
                     iFancyYourVilliany()
                        ? 'yeah lets hope that doesnt get blown out of proportion'
                        : 'yeah lets hope that doesnt happen again', 
                     'yeah lets hope nothing bad happens' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys4: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? 'oh my god i thought those guys were about to provoke the human' 
                  : [
                     'really guys?\nTHERES ICE CREAM AT THE REC CENTER', 
                     'awkward' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys6: {
            author: 'ALPHYS',
            pm: 'oh no.'
         },
         alphys7: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'ok mettaton could you like not keep doing this to me thanks' 
                  : SAVE.data.n.state_aerialis_crafterresult === 0
                     ? 'ok ill be honest i have no idea how that worked out LOL' 
                     : SAVE.data.n.bad_lizard < 1
                        ? [
                           'wow, i shouldve known those bombs were just TV props LOL', 
                           'NOOOO they were so close', 
                           "let's go the human made it to the end", 
                           'anyone who wasnt watching just now missed out big time' 
                        ][SAVE.data.n.state_aerialis_crafterresult - 1]
                        : 'well, there goes my last one-time use portable jetpack' 
         },
         alphys8: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'wait how did the human get here if i never gave them a liftgate pass' 
                  : 'BTW has anyone else seen mew mew space adventure???'
         },
         alphys9: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'like did they just steal my spare cell phone or something' 
                  : 'i finally started watching the last season and its actually good WTF'
         },
         alphys10: {
            author: 'NAPSTABLOOK22',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'alphys... can you please respond to my private messages...' 
                  : 'we did... that one time...'
         },
         alphys11: {
            author: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'NAPSTABLOOK22'
                  : SAVE.data.n.state_starton_papyrus === 0
                     ? 'COOLSKELETON95'
                     : 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? "i'm... getting worried" 
                  : SAVE.data.n.state_starton_papyrus === 0
                     ? 'ARE WE WATCHING \"TV SHOWS\" NOW?\nSOUNDS EXCITING!' 
                     : 'ooh i remember that' 
         },
         alphys12: {
            author: () => (SAVE.data.n.plot === 72 ? '_Sp4ceAdv3ntur3r_' : '_K1ll3rMann3qu1n_'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'Alphys, HUH?\nAre you IGNORING MY COUSIN!?!?' 
                  : 'Mew Mew SPACE ADVENTURE???\nHAH! WHAT A LOAD OF HOT GARBAGE!'
         },
         alphys13: {
            author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'please stay out of this' 
                  : [
                     'let me guess youre one of those mew mew starfire fans arent you', 
                     'uhhhh' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys14: {
            author: () => (SAVE.data.n.plot === 72 ? '_Sp4ceAdv3ntur3r_' : '_K1ll3rMann3qu1n_'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? "oh, so i'm just supposed to IGNORE my cousins' problems, AM I?" 
                  : [
                     'yeah, okay, but ask yourself this:\ndoes space venture have EXPLOSIONS!?', 
                     "whats the matter, huh?\nSCARED YOU'LL LOSE AN ARGUMENT!?" 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys15: {
            author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'with all due respect\nplease shut up.' 
                  : [
                     'LOLLLLLLLLLLL SPACE VENTURE\naverage starfire fan cant spell XD', 
                     'im really starting to regret not adding a block function' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys16: {
            author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'gotta go.' 
                  : 'another show already???'
         },
         alphys17: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? 'well... alright\nill look at what you sent me now' 
                  : 'for the record this mew mew doll thing never happened.'
         },
         alphys18: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? SAVE.data.n.state_aerialis_royalguards === 1
                     ? 'no... come on... i thought i told them not to go after anyone' 
                     : "phew... i thought they'd be killed for sure there" 
                  : 'i thought i told the royal guard not to go after anyone WTF???'
         },
         alphysX0: {
            author: 'SYSTEM',
            pm: 'Your private message history was successfully cleared.'
         },
         alphysX1: {
            author: 'lazybones.',
            pm: 'just to be on the safe side.'
         },
         alphysX2: {
            author: 'ALPHYS',
            pm: 'yeah just cleared it out now'
         },
         alphysX3: {
            author: 'lazybones.',
            pm: 'heh... remember that time he showed off the new gravity plating?'
         },
         alphysX4: {
            author: 'ALPHYS',
            pm: 'and the whole set just started floating into the sky? OMG YES LMAO'
         },
         alphysX5: {
            author: 'lazybones.',
            pm: 'pfft, he really thought that would work, huh?'
         },
         alphysX6: {
            author: 'ALPHYS',
            pm: 'i remember asgore trying everything he could to hold it down XD'
         },
         alphysX7: {
            author: 'ALPHYS',
            pm: 'man what a day\ni really miss working with you sans'
         },
         alphysX8: {
            author: 'lazybones.',
            pm: "i know you do.\nbut i've got a different job to dddd"
         },
         alphysX9: {
            author: 'ALPHYS',
            pm: '...\nhello?'
         },
         alphysY1: {
            author: 'lazybones.',
            pm: 'sorry, a human just showed up, totally caught me off guard.'
         },
         alphysY2: {
            author: 'lazybones.',
            pm: 'no pun intended.'
         },
         alphysY3: {
            author: 'ALPHYS',
            pm: 'right... wait really?'
         },
         alphysY4: {
            author: 'lazybones.',
            pm: "i wouldn't lie about making a pun, would i?"
         },
         alphysY5: {
            author: 'ALPHYS',
            pm: 'you know what i mean.'
         },
         alphysY6: {
            author: 'lazybones.',
            pm: "don't worry, alphys.\ni've got this under control."
         },
         alphysY7: {
            author: 'ALPHYS',
            pm: 'sure okay'
         },
         alphysY7A1: {
            author: 'ALPHYS',
            pm: 'woah... did you see that?'
         },
         alphysY7A2: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? 'papyrus and the human just fought and it was so intense'
                  : 'papyrus and the human just fought and it was kinda weird'
         },
         alphysY7A3: {
            author: 'lazybones.',
            pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? 'what?\nis he okay?' : 'what?\nwhat happened?')
         },
         alphysY7A4: {
            author: 'ALPHYS',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? 'yeah yeah hes fine dont worry'
                  : 'well papyrus kept beating them and they kept coming back and...'
         },
         alphysY7A5: {
            author: 'lazybones.',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? "heh... i could feel it from here.\nhe must've really given it his all."
                  : "hey, just tell me if he's okay."
         },
         alphysY7A6: {
            author: 'ALPHYS',
            pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? 'yeah thats one way of putting it' : 'hes okay.')
         },
         alphysY7A7: {
            author: 'lazybones.',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? "guess i'll have to congratulate him when he gets back home."
                  : 'heh... glad to hear it.'
         },
         alphysYdoggo1: {
            author: 'ALPHYS',
            pm: 'no... doggo...'
         },
         alphysYdoggo2: {
            author: 'lazybones.',
            pm: 'huh? what happened?'
         },
         alphysYdoggo3: {
            author: 'ALPHYS',
            pm: 'after he lost his eyesight he would come to my lab after work...'
         },
         alphysYdoggo4: {
            author: 'ALPHYS',
            pm: 'id teach him to use his ears with these little games we played'
         },
         alphysYdoggo5: {
            author: 'ALPHYS',
            pm: 'he would always leave with a big smile on his face. but now...'
         },
         alphysYdoggo6: {
            author: 'lazybones.',
            pm: 'i see.'
         },
         alphysY8A1: {
            author: 'ALPHYS',
            pm: 'you know the human is killing monsters in starton right?'
         },
         alphysY8A1a: {
            author: 'ALPHYS',
            pm: 'theyre going after regular citizens'
         },
         alphysY8A1b: {
            author: 'ALPHYS',
            pm: 'theyre targeting the sentries'
         },
         alphysY8A1c: {
            author: 'ALPHYS',
            pm: 'theyre going after everyone'
         },
         alphysY8A1d: {
            author: 'ALPHYS',
            pm: 'its not just doggo theyre after'
         },
         alphysY8A2: {
            author: 'lazybones.',
            pm: "i know. i'm doing my best to get people out before it's too late."
         },
         alphysY8A3: {
            author: 'ALPHYS',
            pm: 'okay good'
         },
         alphysYdrake1: {
            author: 'ALPHYS',
            pm: 'yknow... stardrakes mom came in the other day'
         },
         alphysYdrake2: {
            author: 'ALPHYS',
            pm: 'she told me how proud she is of her son and the new friends he made...'
         },
         alphysYdrake3: {
            author: 'ALPHYS',
            pm: 'what am i supposed to tell her now?'
         },
         alphysYdrake4: {
            author: 'lazybones.',
            pm: "you tell her that you'll do the best you can in your position."
         },
         alphysYdrake5: {
            author: 'ALPHYS',
            pm: 'yeah... i guess thats all i really can tell her huh'
         },
         alphysYdrake6: {
            author: 'lazybones.',
            pm: "it's better than nothing."
         },
         alphysY8A4: {
            author: 'ALPHYS',
            pm: 'that was close'
         },
         alphysY8A5: {
            author: 'lazybones.',
            pm: "yeah... guess i shouldn't have doubted my bro, heh."
         },
         alphysY8A6: {
            author: 'ALPHYS',
            pm: 'yeah...'
         },
         alphysY8A7: {
            author: 'ALPHYS',
            pm: 'never mind the human is back to killing again'
         },
         alphysY8A8: {
            author: 'lazybones.',
            pm: 'welp.'
         },
         alphysY8B1: {
            author: 'ALPHYS',
            pm: 'sans'
         },
         alphysY8B2: {
            author: 'ALPHYS',
            pm: 'the human just killed papyrus'
         },
         alphysY8B3: {
            author: 'ALPHYS',
            pm: 'please tell me youre there'
         },
         alphysY8B4a: {
            author: 'lazybones.',
            pm: "i'm here. and i should've kept a closer eye on him."
         },
         alphysY8B4b: {
            author: 'lazybones.',
            pm: "i'm here. and i shouldn't have left him alone out there."
         },
         alphysY8B5: {
            author: 'ALPHYS',
            pm: 'what are you gonna do now?'
         },
         alphysY8B6: {
            author: 'lazybones.',
            pm: 'honestly, alphys?'
         },
         alphysY8B7: {
            author: 'lazybones.',
            pm: "i don't feel like doing anything."
         },
         alphysY8B8: {
            author: 'ALPHYS',
            pm: 'sans...'
         },
         alphysY8B9: {
            author: 'lazybones.',
            pm: "it's not your fault.\nthis would always have happened."
         },
         alphysY8B10: {
            author: 'ALPHYS',
            pm: 'what do you mean?'
         },
         alphysY8B11: {
            author: 'lazybones.',
            pm: 'you know how papyrus can be.'
         },
         alphysY8B12: {
            author: 'lazybones.',
            pm: "he's just too damn good to stand by and watch as people die."
         },
         alphysY8B13: {
            author: 'ALPHYS',
            pm: 'unlike us right?'
         },
         alphysY8B14: {
            author: 'lazybones.',
            pm: 'yeah.'
         },
         alphysY8B15: {
            author: 'ALPHYS',
            pm: '...'
         },
         alphysY8B16: {
            author: 'ALPHYS',
            pm: 'things arent getting any better'
         },
         alphysY8B17: {
            author: 'lazybones.',
            pm: "let me guess, they're going after people in the foundry now?"
         },
         alphysY8B18: {
            author: 'ALPHYS',
            pm: 'yeah but youre gonna help me evacuate right?'
         },
         alphysY8B18x: {
            author: 'ALPHYS',
            pm: 'i mean i think so? maybe we should start evacuating or something'
         },
         alphysY8B19: {
            author: 'lazybones.',
            pm: "i can't make any promises.\nbut i'll try."
         },
         alphysY8B20: {
            author: 'ALPHYS',
            pm: 'thanks'
         },
         alphysY8C1: {
            author: 'ALPHYS',
            pm: 'sans people in the foundry are in serious danger'
         },
         alphysY8C2a: {
            author: 'ALPHYS',
            pm: 'its the human... even the elite squad cant stop it'
         },
         alphysY8C2b: {
            author: 'ALPHYS',
            pm: 'its the human... theyre going after the residents down there'
         },
         alphysY8C2c: {
            author: 'ALPHYS',
            pm: 'its the human... theyre killing everybody down there'
         },
         alphysY8C3a: {
            author: 'lazybones.',
            pm: 'well, it was nice while it lasted.\nyou gonna start evacuating people?'
         },
         alphysY8C3b: {
            author: 'lazybones.',
            pm: "well, aren't you gonna start evacuating people?"
         },
         alphysY8C4: {
            author: 'ALPHYS',
            pm: 'oh right i need to do that'
         },
         alphysY8C5: {
            author: 'ALPHYS',
            pm: 'gotta go'
         },
         alphysY8C6: {
            author: 'lazybones.',
            pm: "good luck, alphys.\ni'll help evacuate if i can."
         },
         alphysY8C7: {
            author: 'ALPHYS',
            pm: 'thanks'
         },
         alphysY8C8: {
            author: 'ALPHYS',
            pm: 'oh no'
         },
         alphysY8C9: {
            author: 'ALPHYS',
            pm: 'undyne and the human are about to fight'
         },
         alphysY8C10a: {
            author: 'ALPHYS',
            pm: 'this is kind of worrying'
         },
         alphysY8C10b: {
            author: 'ALPHYS',
            pm: 'not gonna lie im kind of excited'
         },
         alphysY8C11a: {
            author: 'ALPHYS',
            pm: 'and by kind of i mean very'
         },
         alphysY8C11b: {
            author: 'ALPHYS',
            pm: 'but like really scared at the same time'
         },
         alphysY8C12a: {
            author: 'lazybones.',
            pm: "don't you think you should do something about it?"
         },
         alphysY8C12b: {
            author: 'lazybones.',
            pm: "didn't you say you were trying to avoid this earlier?"
         },
         alphysY8C13a: {
            author: 'ALPHYS',
            pm: 'yeah i dont really think undyne would listen to me'
         },
         alphysY8C13b: {
            author: 'ALPHYS',
            pm: 'if the human got this far they can make it past her'
         },
         alphysY8C14: {
            author: 'lazybones.',
            pm: 'well, okay.\nif you say so, i guess.'
         },
         alphysY8D1: {
            author: 'ALPHYS',
            pm: 'oh'
         },
         alphysY8D1a1: {
            author: 'ALPHYS',
            pm: 'i guess killing papyrus wasnt enough for them then'
         },
         alphysY8D1a2: {
            author: 'ALPHYS',
            pm: 'i guess slaughtering the elite squad wasnt enough for them then'
         },
         alphysY8D1a3: {
            author: 'ALPHYS',
            pm: 'i guess slaughtering the canine unit wasnt enough for them then'
         },
         alphysY8D1a4: {
            author: 'ALPHYS',
            pm: 'i guess killing people in the foundry wasnt enough for them then'
         },
         alphysY8D1a5: {
            author: 'ALPHYS',
            pm: 'i guess killing people in starton wasnt enough for them then'
         },
         alphysY8D1b: {
            author: 'ALPHYS',
            pm: 'never mind'
         },
         alphysY8D1c1: {
            author: 'ALPHYS',
            pm: 'that cant be good'
         },
         alphysY8D1c2: {
            author: 'lazybones.',
            pm: 'what happened?'
         },
         alphysY8D1c3: {
            author: 'ALPHYS',
            pm: 'she was trying to keep up with them and she stepped on something and...'
         },
         alphysY8D1c4: {
            author: 'ALPHYS',
            pm: 'i see it...\ni think shes... fallen down'
         },
         alphysY8D1x: {
            author: 'ALPHYS',
            pm: 'okay they spared her'
         },
         alphysY8D2a: {
            author: 'lazybones.',
            pm: "i'm sorry, alphys. i wish i could do something, but i can't."
         },
         alphysY8D2b: {
            author: 'lazybones.',
            pm: "i guess there's nothing you can do, then. i'm sorry, alphys."
         },
         alphysY8D2x: {
            author: 'ALPHYS',
            pm: 'though i dont think i want to be here after everything that happened'
         },
         alphysY8D3a: {
            author: 'ALPHYS',
            pm: () =>
               world.bad_lizard < 2
                  ? 'i let this happen sans... i watched her die and did nothing to stop it'
                  : 'i should probably leave the lab while i still have the chance'
         },
         alphysY8D3b1: {
            author: 'ALPHYS',
            pm: 'i get that it could have been an accident but i cant know for sure'
         },
         alphysY8D3b2: {
            author: 'ALPHYS',
            pm: 'who knows what theyll do next?'
         },
         alphysY8D3x: {
            author: 'ALPHYS',
            pm: 'its probably safer just to leave the lab anyway.'
         },
         alphysY8D4: {
            author: 'lazybones.',
            pm: () =>
               world.bad_lizard < 2
                  ? "maybe it'd be best if you took some time off for a while."
                  : "yeah, you do that.\ni'll try to keep tabs on 'em though."
         },
         alphysY8D4x: {
            author: 'lazybones.',
            pm: "you can leave the lab if you want.\ni'll try to keep tabs on 'em though."
         },
         alphysY8D5: {
            author: 'ALPHYS',
            pm: () =>
               world.bad_lizard < 2
                  ? 'yeah... youre probably right'
                  : 'ok but dont get too close. they could kill someone at any moment'
         },
         alphysY8D6: {
            author: 'lazybones.',
            pm: () =>
               world.bad_lizard < 2
                  ? 'sounds good. just be sure to get a phone that works outside the lab.'
                  : "i'll be fine, just be sure to get a phone that works outside the lab."
         },
         alphysY8D7: {
            author: 'ALPHYS',
            pm: 'oh yeah i almost forgot thanks'
         },
         alphysY8D8: {
            author: 'lazybones.',
            pm: "oh, and be sure to clear the message history while you're at it."
         },
         alphysY8D9: {
            author: 'ALPHYS',
            pm: 'yeah ill do that dont worry'
         },
         alphysZ1: {
            author: 'ALPHYS',
            pm: '...\nhello?'
         },
         alphysZ2: {
            author: 'ALPHYS',
            pm: 'sans im kinda getting worried'
         },
         alphysZ3: {
            author: 'ALPHYS',
            pm: 'いいいいいやだもう\nじょうだん　でしょうね'
         },
         alphysZ4: {
            author: 'ALPHYS',
            pm: 'じょうだん　やめよ　おまえ\nしなないでしょう'
         },
         alphysZ5: {
            author: 'ALPHYS',
            pm: 'sans please tell me that youre alive and safe'
         },
         alphysZ6: {
            author: 'ALPHYS',
            pm: 'im sorry if i upset you for some reason or did something bad'
         },
         alphysZ7: {
            author: 'ALPHYS',
            pm: 'its just been tough on me since you left and i dont know what to do'
         },
         alphysZ8: {
            author: 'ALPHYS',
            pm: 'well... im back\nlooks like they got your brother'
         },
         alphysZ9: {
            author: 'ALPHYS',
            pm: 'i went to go do something and when i came back he was gone'
         },
         alphysZ10: {
            author: 'ALPHYS',
            pm: 'um... sans'
         },
         alphysZ11: {
            author: 'ALPHYS',
            pm: 'i dont know if youre there in some form or not but'
         },
         alphysZ12: {
            author: 'ALPHYS',
            pm: 'アンダインが　しんだ'
         },
         alphysZ13: {
            author: 'ALPHYS',
            pm: 'どうしたらいいか　わかんない\nこのやくただずおれは'
         },
         alphysZ14: {
            author: 'ALPHYS',
            pm: 'ごめん'
         },
         alphysZ15: {
            author: 'ALPHYS',
            pm: 'そろそろ　いっか。'
         },
         alphysZ16: {
            author: 'ALPHYS',
            pm: 'くそ　なぜメールしてるのか　わからん'
         },
         alphysZ17: {
            author: 'ALPHYS',
            pm: 'あ　ちなみに'
         },
         alphysZ18: {
            author: 'ALPHYS',
            pm: 'it was the starling flower all along'
         }
      },
      sidebarCellPms4: '(NEW)'
   },

   n_shop_bpants: {
      exit: () =>
         world.population === 0 || burger()
            ? world.bullied && !world.genocide && !burger()
               ? ['<32>{#p/basic}{#k/6}* Any time, little bully.']
               : ['<32>{#p/basic}{#k/6}* Any time, little murderer.']
            : ['<32>{#p/basic}{#k/6}* Any time, little buddy.'],
      item: () =>
         world.runaway
            ? [
               '0G - Starfaint',
               '0G - Hold Yer Grane',
               '0G - Slamburger',
               SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "0G - Glyde's Envy",
               'Exit'
            ]
            : SAVE.data.n.plot === 72
               ? [
                  '5G - Starfaint',
                  '10G - Hold Yer Grane',
                  '5G - Slamburger',
                  SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "49G - Glyde's Envy",
                  'Exit'
               ]
               : world.genocide || world.killed0 || burger()
                  ? [
                     '32G - Startaint',
                     '60G - Hold Yer Pain',
                     '48G - Slamdunker',
                     SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "138G - Undyne's Envy",
                     'Exit'
                  ]
                  : [
                     '16G - Starfaint',
                     '30G - Hold Yer Grane',
                     '24G - Slamburger',
                     SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "69G - Glyde's Envy",
                     'Exit'
                  ],
      itemInfo: () =>
         world.genocide || world.killed0 || burger()
            ? [
               'Heals -23HP\nSugar over-\ndose assured.',
               'Heals -40HP\nNot quite a\nhero of\nany kind.',
               'Heals -34HP\nFace the\npain either\nway.',
               'Heals -55HP\nOnly for the\nmost die-\nhard folk.'
            ]
            : [
               'Heals 23HP\nSugar over-\ndose likely.',
               'Heals 40HP\nNot quite a\n\"legendary\nhero.\"',
               'Heals 34HP\nSlam it\ndown or face\nthe pain.',
               "Heals 55HP\nIt's a long\nstory."
            ],
      itemPrompt: () =>
         world.population === 0 || burger()
            ? '<09>{#p/basic}{#k/7}What do YOU want from me?'
            : '<09>{#p/basic}{#k/0}What do you want from me?',
      itemPurchase: () =>
         world.population === 0 || burger()
            ? [
               world.bullied && !world.genocide && !burger()
                  ? '<09>{#p/basic}{#k/5}Thanks, little bully.'
                  : '<09>{#p/basic}{#k/5}Thanks, little murderer.',
               '<09>{#p/basic}{#k/7}You gonna buy something or...?',
               "<09>{#p/basic}{#k/6}That's the wrong amount of money.",
               "<10>{#p/human}(You're carrying too much.)"
            ]
            : [
               '<09>{#p/basic}{#k/0}Thanks, little buddy.',
               '<09>{#p/basic}{#k/1}You gonna buy something or...?',
               "<09>{#p/basic}{#k/6}That's the wrong amount of money.",
               "<10>{#p/human}(You're carrying too much.)"
            ],
      itemPurchasePrompt: () => (world.runaway ? 'Take it?' : 'Buy it for\n$(x)G?'),
      itemUnavailable: () =>
         world.runaway
            ? '<09>{#p/basic}Nothing left.'
            : world.population === 0 || burger()
               ? '<09>{#p/basic}{#k/5}Sorry, that was one of a kind.'
               : '<09>{#p/basic}{#k/4}Sorry, that was one of a kind.',
      menu: () =>
         world.runaway ? ['Take', 'Steal', 'Read', 'Exit'] : ['Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit'],
      menuPrompt1: () =>
         world.population === 0 || burger()
            ? world.bullied && !world.genocide && !burger()
               ? '<23>{#p/basic}{#k/5}* Heyyyy little bully.'
               : '<23>{#p/basic}{#k/5}* Heyyyy little murderer.'
            : '<23>{#p/basic}{#k/0}* What can I do for you, little buddy?',
      menuPrompt2: () =>
         world.population === 0 || burger()
            ? '<23>{#p/basic}{#k/7}* Need anything else?'
            : '<23>{#p/basic}{#k/0}* Need anything else?',
      menuPrompt3: '<23>{#p/basic}＊…しかし　みんな　にげてしまいました。',
      note: ['<32>{#p/human}* (But there was no note for you to read.)'],
      sell1: () =>
         world.runaway
            ? ['<30>{#p/human}* (You took 2048G from behind the counter.)']
            : world.genocide || world.killed0 || burger()
               ? [
                  '<30>{#p/basic}{#k/7}* ...',
                  ...(SAVE.storage.inventory.size < 8
                     ? [
                        '<30>{#k/4}* Okay.\n* Here you go.',
                        "<30>{#k/5}* It's a one-of-a-kind item, just for you.",
                        "<30>{#p/human}* (You got the Plunderer's Demise.)"
                     ]
                     : [
                        '<30>{#p/basic}{#k/7}* For someone who wants to steal something, you sure seem well off with your ITEMs.'
                     ])
               ]
               : world.meanie
                  ? ['<30>{#p/basic}{#k/1}* ...', '<30>{#k/4}* ...', '<30>{#k/3}* Excuse me?']
                  : [
                     '<30>{#p/basic}{#k/1}* ...',
                     '<30>{#k/4}* ...',
                     "<30>{#k/6}* You think you're real sly, huh?",
                     "<30>{#k/7}* Hmm...\n* Why don't you try selling that to Bratty and Catty?",
                     '<30>{#k/0}* I\'m sure they\'ll, uh, \"bite.\"'
                  ],
      sell2: () =>
         world.runaway
            ? ['<30>{#p/basic}* Nothing left.']
            : SAVE.data.b.a_state_freesell
               ? ['<30>{#p/basic}{#k/6}* Sorry, one free sample per murderer.']
               : ["<30>{#p/basic}{#k/6}* It's not happening, pal."],
      talk: () =>
         SAVE.data.n.plot === 72
            ? ['Romantic Advice', 'Mettaton', 'Where To Go Next', 'My Future', 'Exit']
            : [
               ['Life Advice', '§fill=#ff0§Taking Charge (NEW)', 'Taking Charge'][
               Math.min(SAVE.data.n.shop_bpants_advice, 2)
               ],
               'Mettaton',
               postSIGMA()
                  ? 'Power Outage'
                  : ['Where We Are', '§fill=#ff0§Glyde (NEW)', 'Glyde'][Math.min(SAVE.data.n.shop_bpants_hub, 2)],
               'Your Future',
               'Exit'
            ],
      talkPrompt: () =>
         world.population === 0 || burger()
            ? world.bullied && !world.genocide && !burger()
               ? '<09>{#p/basic}{#k/0}Take it from me, little bully.'
               : '<09>{#p/basic}{#k/0}Take it from me, little murderer.'
            : '<09>{#p/basic}{#k/0}Take it from me, little buddy.',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                  '<32>{#p/basic}{#k/7}* Romantic advice?',
                  "<32>{#k/0}* Little buddy, I've only got one piece of advice when it comes to getting romantic.",
                  "<32>{#k/1}* ... don't even try.",
                  "<32>{#k/4}* When the right person comes along, it'll be as dainty as dancing in the dark.",
                  '<32>{#k/0}* The fat old mole-rat might even like you back.'
               ]
               : world.population === 0 || burger()
                  ? [
                     '<32>{#p/basic}{#k/6}* Life advice...',
                     "<32>{#k/6}* Shucks, I'd have thought you'd be pretty knowledgable in that department.",
                     "<32>{#k/5}* Or maybe you're just more experienced with the opposite of life."
                  ]
                  : [
                     [
                        "<32>{#p/basic}{#k/6}* Listen up.\n* If you want to get ahead in life, you've got to learn to take charge.",
                        '<32>{#k/4}* My boss pushed me around for way too long, and I wasted way too much of my short life not telling him \"no.\"',
                        '<32>{#k/0}* When I finally stood up to him, well...',
                        '<32>{#k/2}* It did us both some good.'
                     ],
                     [
                        "<32>{#p/basic}{#k/6}* I'll try to make this as simple as possible for you, little buddy.",
                        '<32>* As nice as people are, sometimes they get caught in bad ways of thinking.',
                        '<32>{#k/4}* Short-sightedness.\n* Carelessness.\n* Abuse.',
                        '<33>{#k/4}* The nicest thing you can do for someone like that is to give them a piece of your mind. Tell them how wrong they are and make them think about it.',
                        '<32>{#k/7}* The more you let someone get comfortable with their bad way of life, the more they get stuck in those ways.',
                        "<32>{#k/0}* Don't let people get stuck."
                     ],
                     [
                        "<32>{#p/basic}{#k/1}* I'm not your counselor, pal.",
                        '<32>{#k/7}* ...',
                        '<32>{#k/0}* Sorry.\n* Just... remember my words.'
                     ]
                  ][Math.min(SAVE.data.n.shop_bpants_advice++, 2)],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  '<32>{#p/basic}{#k/2}* ...',
                  "<32>{#k/4}* I guess I can't make fun of the bastard forever.",
                  "<32>{#k/0}* One day, I'll have to do something new with my life...",
                  '<32>{#k/7}* ... and that day is coming up on me quickly now.',
                  '<32>{#k/6}* Don\'t worry, though.\n* My \"boyish charm\" isn\'t going anywhere ANY time soon.'
               ]
               : SAVE.data.b.killed_mettaton
                  ? ['<32>{#p/basic}{#k/8}* Mettaton.', '<32>{#k/4}* ...', "<32>{#k/6}* Yeah, he's dead."]
                  : (world.genocide || world.bad_robot) && 68 <= SAVE.data.n.plot
                     ? SAVE.data.n.shop_bpants_mtt2++ < 1
                        ? [
                           '<32>{#p/basic}{#k/4}* Mettaton...',
                           "<32>{#k/4}* I'd rant about him, but uh...\n* Since you killed him...",
                           "<32>{#k/5}* I don't really think there's much to say."
                        ]
                        : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* I'm not going to repeat myself."]
                     : SAVE.data.n.shop_bpants_mtt1++ < 1
                        ? world.population === 0 || burger()
                           ? [
                              '<32>{#p/basic}{#k/4}* Mettaton...',
                              "<32>{#k/6}* I'd rant about HIM, but YOU make him look like a saint.",
                              '<32>{#k/5}* I guess you could call that an accomplishment... of a terrible, terrible sort.'
                           ]
                           : [
                              '<32>{#p/basic}{#k/4}* Why does it always have to be about him...',
                              "<32>{#k/0}* Yeah, he's a bit of an icon around here.\n* Everybody loves him...",
                              '<32>{#k/6}* Except for yours truly, of course. I spit on him with every breath I take.',
                              "<32>{#k/5}* No, really.\n* I've got a little figurine of him under the counter, and I make sure as much saliva as possible hits his face.",
                              "<32>{#k/4}* You wouldn't BELIEVE the crap he put me through working here...",
                              '<32>{#k/6}* After he got out of my way I gracefully stripped the shop of all the MTT-brand trimmings.',
                              '<32>* Oh, and of course I renamed all the food items.',
                              '<32>{#k/5}* I wanted to rename \"Legendary Hero\" to \"Her Ye Olde Gran\" but I figured that wouldn\'t fly well with the older folks.',
                              '<32>{#k/0}* ...',
                              '<32>{#k/7}* What?\n* Were you expecting me to talk about his business or something?'
                           ]
                        : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* I'm not going to repeat myself."],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  '<32>{#p/basic}{#k/4}* Where to go, where to go...',
                  "<32>{#k/0}* On the new homeworld, I'd like to start a new shop with that old buddy of mine, Gerson.",
                  "<32>{#k/7}* He said he's content with just doing the finances, and that works for me.",
                  '<32>{#k/0}* ... as long as I get to spend some time with him.'
               ]
               : postSIGMA()
                  ? [
                     '<32>{#p/basic}{#k/7}* Come to think of it, it HAS started getting quiet around here.',
                     "<32>{#k/6}* Only problem is, I'm too busy enjoying my WORKING electricity.",
                     '<32>{#k/4}* Which may or may not be because I rigged a direct power feed from the CORE a while back.',
                     "<32>{#k/5}* Shh... don't tell anyone I told you that.\n* It's a trade secret."
                  ]
                  : world.population === 0 || burger()
                     ? [
                        '<32>{#p/basic}{#k/0}* ...',
                        "<32>{#k/0}* We're in hell, my friend.\n* Absolute hell.",
                        '<32>{#k/1}* ...',
                        "<32>{#k/3}* Gosh, isn't talking to you JUST SO MUCH FUN!?!?"
                     ]
                     : [
                        [
                           '<32>{#p/basic}{#k/6}* Where we are, eh?',
                           '<32>{#k/4}* This place is... a little weird...',
                           '<32>{#k/0}* King Asgore had it built as a way to \"bring monsters together.\"',
                           "<32>{#k/7}* Now it's... just kind of this place that exists.\n* There's food, there's rest, and sometimes they run shows here.",
                           '<32>{#k/6}* Oh, and, this is where they host the OuterNet.\n* Bratty and Catty are in charge of the news.',
                           "<32>{#k/4}* Well, actually, they're in charge of this place as a whole.",
                           "<32>{#k/0}* After Mettaton left, I told them they could take over.\n* Besides, I've got my own thing going for me now...",
                           "<32>{#k/2}* I guess I'm just a little tired.",
                           "<32>{#k/3}* But hey, who has time for THAT when you've got people like GLYDE hanging around, huh!?"
                        ],
                        [
                           '<32>{#p/basic}{#k/6}* Haha... let me tell you about this showboating know-it-all.',
                           '<32>{#k/0}* Back when I worked for Mettaton, I regularly had to make this thing called a \"face steak.\"',
                           '<32>{#k/1}* For the record, that\'s a steak with Mettaton\'s \"fabulous\" face on it.',
                           '<32>{#k/3}* But Glyde?\n* Glyde loved it so much it decided to make its own \"steak enterprise\" by putting ITS face on steaks instead!',
                           "<32>{#k/3}* And, as if that wasn't crazy enough, Glyde BID on me to be its first employee!\n* Like I'm up for auction or something!",
                           "<32>{#k/4}* Of course, Mettaton wasn't going to let me go that easily, so I ended up staying here.",
                           '<32>{#k/0}* In the end, Glyde never got what it wanted, and now it just goes around demanding people join its \"crusade.\"',
                           '<32>{#k/1}* Oh well.\n* If things get really bad, I can just turn off the lights again...',
                           "<32>{#k/7}* Maniacs like that fear the dark because they can't stand not being in control of every last situation they're in."
                        ],
                        [
                           "<32>{#p/basic}{#k/4}* I've told you all I really know about Glyde.",
                           "<32>{#k/7}* Maybe there's something buried somewhere in its past to explain why it acts this way...",
                           "<32>{#k/1}* But that's anyone's guess."
                        ]
                     ][Math.min(SAVE.data.n.shop_bpants_hub++, 2)],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  '<32>{#p/basic}{#k/1}* What do I look like, a fortune teller?',
                  "<32>{#k/2}* I have no idea what's in your future.",
                  "<32>{#k/4}* But if I had to guess, it'll be better than your past.",
                  '<32>{#k/7}* From what Asgore was saying, humans never come here for particularly good reasons.',
                  '<32>{#k/0}* Except for that brawny kid.\n* They were just a really big fan of monsters, I guess.'
               ]
               : world.population === 0 || burger()
                  ? world.bullied && !burger()
                     ? [
                        '<32>{#p/basic}{#k/5}* My future, huh?\n* I dunno, little bully...',
                        '<32>{#p/basic}{#k/6}* You tell me.'
                     ]
                     : [
                        '<32>{#p/basic}{#k/5}* Ohhhhh trust me, my little whiny-heinie death-defying slaughter-happy murderer...',
                        "<32>{#k/6}* My future's secure.",
                        "<32>{#k/2}* Besides, an old buddy of mine told me how I can't be hurt here.",
                        "<32>{#k/5}* You're NEVER getting me."
                     ]
                  : [
                     '<32>{#p/basic}{#k/0}* MY future?\n* Little buddy...',
                     '<32>{#k/3}* You should be thinking about your future!',
                     '<32>{#k/4}* ...',
                     "<32>{#k/6}* Don't worry, pal.\n* With that rectangular rabble- rouser off my back, things are looking brighter by the day."
                  ]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },
   n_shop_gossip: {
      exit: [
         {
            b: '<16>{#k/0/0}* Like, see you later!',
            c: '<16>* Like, later and stuff!',
            s: true
         }
      ],
      item: () =>
         adultEvac()
            ? [
               '0G - Space Junk',
               SAVE.data.b.item_laser ? '0G - Laser Rifle?' : '0G - Laser Rifle',
               SAVE.data.b.item_visor ? '0G - Tactical Visor?' : '0G - Tactical Visor',
               SAVE.data.b.item_mystery_key ? '§fill=#808080§--- UNAVAILABLE ---' : '0G - Mystery Key',
               'Exit'
            ]
            : [
               '5G - Space Junk',
               SAVE.data.b.item_laser ? '60G - Laser Rifle?' : '70G - Laser Rifle',
               SAVE.data.b.item_visor ? '60G - Tactical Visor?' : '70G - Tactical Visor',
               SAVE.data.b.item_mystery_key ? '§fill=#808080§--- UNAVAILABLE ---' : '400G - Mystery Key',
               'Exit'
            ],
      itemInfo: () => [
         'Heals ??HP\nCould be\nanything.',
         SAVE.data.b.item_laser
            ? 'Weapon: 10AT\n($(x) AT)\nDifficult,\nbut powerful.\nReplicated.'
            : 'Weapon: 12AT\n($(x) AT)\nDifficult,\nbut powerful.',
         SAVE.data.b.item_visor
            ? 'Armor: 10DF\n($(x) DF)\nAiming made\neasier.\nReplicated.'
            : 'Armor: 12DF\n($(x) DF)\nAiming made\neasier.',
         'Special:\nCould lead\nanywhere.'
      ],
      itemPrompt: '<99>{#p/basic}{#k/0/9}{@fill=#d4bbff}You\nshould\nbuy ALL\nour stuff!',
      itemPurchase: [
         "<09>{#p/basic}{#k/1/8}{@fill=#d4bbff}Bratty!\nWe're gonna be rich!",
         '<09>{#p/basic}{#k/0/4}{@fill=#d4bbff}So are you gonna buy it??',
         '<09>{#p/basic}{#k/4/5}{@fill=#d4bbff}You need WAY more money.',
         "<10>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () =>
         adultEvac()
            ? shopper.listIndex === 3
               ? 'Add to your\nkeyring?'
               : 'Take it?'
            : shopper.listIndex === 3
               ? 'Add to your\nkeyring for\n$(x)G?'
               : 'Buy it for\n$(x)G?',
      itemUnavailable: () =>
         adultEvac()
            ? '<09>{#p/basic}Nothing left.'
            : "<09>{#p/basic}{#k/5/1}{@fill=#d4bbff}We're all sold out!\nMee-YOW!",
      menu: () =>
         adultEvac() ? ['Take', 'Steal', 'Read', 'Exit'] : ['Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit'],
      menuPrompt1: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* Check it out!',
      menuPrompt2: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* No rush or anything.',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}＊…しかし　みんな　にげてしまいました。' : '<23>{#p/basic}* ... but nobody came.',
      note: () => [
         "<32>{#p/basic}* There's a series of notes here.",
         {
            b: '<16>* \"If you\'re reading this...\"',
            c: world.bullied
               ? '<16>* \"Then, like, bad news you mega-annoying weirdo!\"'
               : '<16>* \"Then, like, bad news you mega-evil weirdo!\"'
         },
         ...(SAVE.data.n.plot === 72 && !world.runaway
            ? [
               {
                  b: '<16>* \"We\'re not gonna come back here after you, like...\"',
                  c: '<16>* \"... beat everyone up and stuff.\"'
               },
               {
                  b: '<16>* \"The new homeworld\'s calling, and it\'s gonna make us...\"',
                  c: '<16>* \"... super duper rich!\"'
               },
               {
                  b: '<16>* \"So, we don\'t, like, even need that shop anymore.\"',
                  c: '<16>* \"Yeah!!\"\n* \"Take whatever you want!\"'
               },
               {
                  b: '<16>* \"Anyway, these gel pens are running out, so...\"',
                  c: '<16>* \"That\'s about all we can say.\"'
               },
               {
                  b: '<16>* \"Not that you\'d care!\"',
                  c: '<16>* \"Nya ha ha!!!\"'
               },
               { b: '<16>* \"Signed,\n  Bratty <3\"', c: '<16>* \"Signed,\n  Catty <3\"' }
            ]
            : [
               ...[
                  [
                     !world.badder_lizard
                        ? {
                           b: '<16>* \"We\'re not gonna stick around while you just...\"',
                           c: '<16>* \"... beat everyone up and stuff.\"'
                        }
                        : {
                           b: '<16>* \"Alphys came through here, and she\'s taking us...\"',
                           c: '<16>* \"... somewhere super duper safe!\"'
                        },
                     {
                        b: '<16>* \"But first, we gotta use up these gel pens.\"',
                        c: !world.badder_lizard
                           ? '<16>* \"Yeah, we don\'t wanna waste pens!\"'
                           : '<16>* \"Yeah, chill, Alphys!\"\n* \"We don\'t wanna waste pens!\"'
                     },
                     {
                        b: '<16>* \"And don\'t even think about stealing our stuff.\"',
                        c: '<16>* \"Yeah, creep!\"\n* \"Leave our junk alone!\"'
                     },
                     {
                        b: '<16>* \"Old second-hand junk, to be specific.\"',
                        c: '<16>* \"Yeah, our used antique store is CRAZY valuable!\"'
                     }
                  ],
                  [
                     {
                        b: '<16>* \"Mettaton came through here, and he\'s taking everyone...\"',
                        c: '<16>* \"... somewhere super duper safe!\"'
                     },
                     { b: '<16>* \"But Alphys...\"', c: '<16>* \"Alphys.\"' },
                     { b: '<16>* \"She seemed...\"', c: '<16>* \"... super duper pissed.\"' },
                     {
                        b: '<16>* \"I\'ve never seen her like that before.\"',
                        c: '<16>* \"I\'ve never seen ANYTHING like that before.\"',
                        s: true
                     },
                     { b: '<16>* \"And Mettaton...\"', c: '<16>* \"... isn\'t very happy either.\"' },
                     {
                        b: '<16>* \"He says he\'s gonna slap your face.\"',
                        c: '<16>* \"He says he\'s gonna kick your butt!\"',
                        s: true
                     },
                     { b: '<16>* \"Or did he say he\'d destroy you...?\"', c: '<16>* \"Uh... I forgot.\"' },
                     { b: '<16>* \"Well, I\'d be CRAZY afraid if I were you.\"', c: '<16>* \"God, TELL me about it...\"' }
                  ]
               ][Math.max(world.bad_lizard - 2, 0)],
               {
                  b: '<16>* \"Anyway, in closing, you\'re a total loser.\"',
                  c: '<16>* \"Yeah!\"\n* \"Loser!!\"\n* \"Nya ha ha!!!\"'
               },
               { b: '<16>* \"Signed,\n  Bratty <3\"', c: '<16>* \"Signed,\n  Catty <3\"', s: true }
            ])
      ],
      sell1: () =>
         adultEvac()
            ? ['<30>{#p/human}* (You took 5G from the till.)']
            : world.meanie
               ? [
                  {
                     b: '<16>{#k/2/6}* Um, excuse me?',
                     c: '<16>{#k/2/6}* Like, what are you doing?'
                  },
                  {
                     b: "<16>{#k/1/0}* We don't hand out stuff for free.",
                     c: '<16>{#k/1/0}* Yeah, go steal somewhere else!'
                  }
               ]
               : SAVE.storage.inventory.has('glamburger') // NO-TRANSLATE

                  ? [
                     {
                        b: '<16>{#k/7/0}* Oh, wow.\n* You actually got one of those new \"Slamburgers.\"',
                        c: "<16>{#k/2/2}* GIMME GIMME!!\nI'll take your entire stock!!"
                     },
                     {
                        b: '<16>{#k/4/6}* God, Catty.\n* Try to have some self- control.',
                        c: '<16>{#k/4/4}* Sorry...'
                     },
                     {
                        b: "<16>{#k/3/5}* 'Cause they OBVIOUSLY brought that for ME.",
                        c: '<16>{#k/5/8}* NOOO WAYY!!!'
                     }
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        {
                           b: "<16>{#k/0/6}* Thanks, but we, like, don't really need anything.",
                           c: ''
                        },
                        {
                           b: '',
                           c: "<16>{#k/0/0}* Well, maybe you're right."
                        }
                     ]
                     : [
                        {
                           b: "<16>{#k/0/0}* Thanks, but we, like, don't really need anything.",
                           c: '<16>{#k/0/8}* Oh my god, can you get us those new \"Slamburgers?\"'
                        },
                        {
                           b: "<16>{#k/2/8}* We don't.\n* Really need.\n* Anything.",
                           c: "<16>{#k/1/7}* Wait! I'll pay 1000G if you get Mettaton to autograph my butt!"
                        }
                     ],
      sell2: () =>
         adultEvac()
            ? ['<30>{#p/basic}* Nothing left.']
            : world.meanie
               ? [
                  {
                     b: '<16>{#k/2/4}* ...',
                     c: '<16>{#k/2/4}* ...'
                  },
                  {
                     b: "<16>{#k/5/1}* We'd kick you out if this wasn't so silly.",
                     c: "<16>{#k/5/1}* We'd kick you out if you weren't so cute.",
                     s: true
                  }
               ]
               : [
                  {
                     b: '<16>{#k/1/0}* If you really want us to have something...',
                     c: '<16>{#k/1/2}* ... you could drop it off at the pickup location in Aerialis!'
                  },
                  {
                     b: '<16>{#k/2/0}* But how would they know where it is?',
                     c: "<16>{#k/2/4}* OMG you're right... they probably don't..."
                  },
                  {
                     b: "<16>{#k/5/8}* Guess you'll have to find it for yourself!",
                     c: "<16>* Guess you'll need to look for it yourself!",
                     s: true
                  }
               ],
      talk: () =>
         SAVE.data.n.plot === 72
            ? ['Is Everyone Okay', 'Godlike Being', 'OuterNet Shutdown', 'The Humans', 'Exit']
            : [
               'About You Two',
               SAVE.data.n.plot < 68 ? 'Thrift Shop' : SAVE.data.b.killed_mettaton ? 'Mettaton' : 'Grand Finale',
               ['Area Ownership', '§fill=#ff0§Burgie (NEW)', 'Burgie'][Math.min(SAVE.data.n.shop_gossip_hub, 2)],
               ['Alphys', '§fill=#ff0§Royal Scientist (NEW)', '§fill=#ff0§Asgore (NEW)', 'Asgore'][
               Math.min(SAVE.data.n.shop_gossip_alphys, 3)
               ],
               'Exit'
            ],
      talkPrompt: "<09>{#p/basic}{#k/0/0}{@fill=#ffbbdc}So, like, what's up?",
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                  {
                     b: '<16>{#k/4/6}* Huh?',
                     c: '<16>{#k/4/4}* Are we okay?'
                  },
                  {
                     
                     b: '<16>{#k/2/6/0}',
                     c: '',
                     s: true
                  },
                  '{*}{#s/meow}{%}',
                  {
                     b: "<16>{#k/6/8}* Mmm hm hm, you're too cute.",
                     c: "<16>* Of course we're okay!",
                     s: true
                  },
                  '{*}{#k/0/0/1}{%}'
               ]
               : [
                  {
                     b: "<16>{#k/0/0}* I'm Bratty, and this is my best friend, Catty.",
                     c: "<16>* I'm Catty, and this is my best friend, Bratty.",
                     s: true
                  },
                  {
                     
                     b: '<16>{#k/2/6/0}',
                     c: '',
                     s: true
                  },
                  '{*}{#s/meow}{%}',
                  {
                     b: '<16>{#k/5/8}* Mmm hm hm!',
                     c: '<16>* Nya ha ha!',
                     s: true
                  },
                  '{*}{#k/0/0/1}{%}'
               ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  {
                     b: '<16>{#k/0/6}* It was like... woah.',
                     c: '<16>{#k/0/2}* No it was like... OH MY GOD.'
                  },
                  {
                     b: '',
                     c: '<16>{#k/0/1}* And if I ever met them...',
                     s: true
                  },
                  {
                     b: "<16>{#k/2/6}* Don't tell me.",
                     c: '',
                     s: true
                  },
                  {
                     b: "<16>{#k/5/8}* You'd totally just hang out them!",
                     c: "<16>* I'd totally date them!",
                     s: true
                  },
                  {
                     b: '<16>{#k/6/0}* Oh. Right. Of course you would.',
                     c: "<16>{#k/6/7}* Who WOULDN't want to date a being with godlike powers?"
                  }
               ]
               : SAVE.data.n.plot < 68
                  ? [
                     {
                        b: "<16>{#k/0/6}* It's like, a second-hand store.",
                        c: "<16>{#k/0/2}* No it's like, a BARGAIN outlet!"
                     },
                     {
                        b: '',
                        c: '<16>{#k/2/9}* And get a load of our GENIUS business model...',
                        s: true
                     },
                     {
                        b: '<16>{#k/0/6}* People send us their old junk...',
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/5/8}* ... so we can sell it like new again!',
                        c: '<16>* ... so we can sell it like new again!',
                        s: true
                     },
                     {
                        b: "<16>{#k/0/1}* You won't find a shop this sick anywhere else.",
                        c: "<16>* You won't find stuff like ours anywhere else.",
                        s: true
                     }
                  ]
                  : SAVE.data.b.killed_mettaton
                     ? [
                        {
                           b: '<16>{#k/4/4}* Mettaton, right?',
                           c: '<16>* Mettaton, huh?',
                           s: true
                        },
                        {
                           b: '<16>{#k/2/6/0}',
                           c: '',
                           s: true
                        },
                        {
                           b: "<16>{#k/7/5}* We don't really want to talk about him.",
                           c: "<16>{#k/7/5}* He's WAY better than you."
                        }
                     ]
                     : [
                        {
                           b: '<16>{#k/1/7}* Of course.',
                           c: '<16>* OMG yes!',
                           s: true
                        },
                        {
                           b: '<16>{#k/0/0}* You and Mettaton really put on a performance!',
                           c: '<16>{#k/0/2}* Yeah, you guys really knocked it outta the park!'
                        },
                        {
                           b: '<16>{#k/4/6}* I wish I could move like that on stage...',
                           c: '',
                           s: true
                        },
                        {
                           b: '',
                           c: "<16>{#k/0/8}* You wanna see some moves?\n* I've got moves!",
                           s: true
                        },
                        {
                           b: '<16>{#k/1/8}* I could totally set up a dance off for you guys.',
                           c: "<16>{#k/2/7}* You should totally invite the human while you're at it!"
                        },
                        {
                           b: "<16>{#k/0/0}* ... we'll see.",
                           c: '',
                           s: true
                        }
                     ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  {
                     b: '<16>{#k/0/6}* Yeah, it uses WAY too much power now.',
                     c: "<16>{#k/0/5}* The force field was the CORE's main energy source."
                  },
                  {
                     b: '<16>{#k/2/6}* But when we get to the new homeworld...',
                     c: '<16>* But when we settle into our new home...',
                     s: true
                  },
                  {
                     b: '',
                     c: "<16>{#k/0/1}* We'll be back in business.",
                     s: true
                  },
                  {
                     b: '<16>{#k/2/6}* Running a new OuterNet could make us a lot of money...',
                     c: '',
                     s: true
                  },
                  {
                     b: '',
                     c: '<16>{#k/4/0}* We could buy a lifetime supply of Slamburgers!',
                     s: true
                  },
                  {
                     b: '<16>{#k/0/6}* Catty.\n* Why is that your priority.',
                     c: "<16>{#k/0/7}* Why WOULDN'T it be my priority!"
                  }
               ]
               : [
                  [
                     {
                        b: "<16>{#k/2/1}* Oh yeah, we're technically the owners here.",
                        c: '<16>* Oh yeah, we practically RULE this zone.', 
                        s: true
                     },
                     ...(SAVE.data.b.killed_mettaton
                        ? [
                           {
                              b: '<16>{#k/2/6}* So like, originally...',
                              c: '<16>* ... yeah?'
                           },
                           {
                              b: '<16>{#k/0/5}* Um...\n* Never mind.',
                              c: ''
                           },
                           {
                              b: '',
                              c: "<16>{#k/6/8}* Oh, gotcha.\n* Yeah, let's not bring THAT up!"
                           },
                           {
                              b: "<16>{#k/1/0}* Anyway, Burgie's the one who put us in charge.",
                              c: "<16>* We haven't questioned it since."
                           }
                        ]
                        : [
                           {
                              b: '<16>{#k/2/1}* So like, originally, Mettaton was in charge here, right?',
                              c: '<16>{#k/1/1}* Totally in charge.'
                           },
                           {
                              b: '<16>{#k/2/5}* But then...',
                              c: '<16>* Then...'
                           },
                           {
                              b: '<16>{#k/4/4}* Burgie decided to \"overthrow\" him.',
                              c: '',
                              s: true
                           },
                           {
                              b: '',
                              c: '<16>{#k/2/4}* By having, like, a really strong word with him or something.',
                              s: true
                           },
                           {
                              b: '<16>{#k/2/6/0}',
                              c: '',
                              s: true
                           },
                           {
                              b: '<16>{#k/2/6}* I think he blackmailed him.',
                              c: '<16>* I think he had an accomplice.',
                              s: true
                           },
                           {
                              b: '<16>{#k/1/0/1}* Anyway, he said we could be the new owners.',
                              c: "<16>* We haven't questioned it since."
                           }
                        ])
                  ],
                  [
                     {
                        b: '<16>{#k/2/0}* Burgie?',
                        c: '',
                        s: true
                     },
                     {
                        b: "<16>{#k/0/5}* Yeah, he's alright.",
                        c: "<16>* Eh, he's cool.",
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* He used to act all weird around us, but...',
                        c: '<16>* ... he kinda keeps to himself now.'
                     },
                     {
                        b: '<16>{#k/0/5}* Like, the last time we heard from him...',
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/0/5}* He said he was \"done chasing fantasies\" or something.',
                        c: '<16>* He said he was \"done seeking love\" or whatever.',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* Kinda sounds like...',
                        c: '<16>* Sorta feels like...',
                        s: true
                     },
                     {
                        b: '<16>{#k/5/8}* He TOTALLY saw us as a fantasy.',
                        c: '<16>* He DEFINITELY had a crush on us.',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/4/5}* Too bad he never asked us out, huh?',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/5}* Catty, we would have said no.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/2/1}* ... or would we have said yes?',
                        s: true
                     },
                     {
                        b: '<16>{#k/4/1}* No.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/4/8}* Yes.',
                        s: true
                     },
                     {
                        b: '<16>{#k/1/8}* No.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/1/7}* YES!',
                        s: true
                     },
                     {
                        b: '<16>{#k/4/7}* ...',
                        c: '',
                        s: true
                     },
                     {
                        b: "<16>{#k/5/6}* Catty, don't you have ANY standards?",
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/5/8}* Nope!!!',
                        s: true
                     }
                  ],
                  [
                     {
                        b: "<16>{#k/0/0}* There's not much more to say about Burgie, but-",
                        c: '<16>{#k/0/8}* ... no, wait!\n* Can you go ask him to make us some food?'
                     },
                     {
                        b: '<16>{#k/4/8}* Catty!',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: "<16>{#k/4/1}* What?\n* You know I'd take it from a bad boy like him any day.",
                        s: true
                     },
                     {
                        b: '<16>{#k/2/4/0}',
                        c: '',
                        s: true
                     },
                     '{*}{#s/meow}{%}',
                     {
                        b: '<16>{#k/2/8}* You did not just say that out loud.',
                        c: '<16>* Mee-YOW!',
                        s: true
                     },
                     '{*}{#k/0/0/1}{%}'
                  ]
               ][Math.min(SAVE.data.n.shop_gossip_hub++, 2)],
         () =>
            SAVE.data.n.plot === 72
               ? [
                  {
                     b: '<16>{#k/2/0}* The humans?',
                     c: '',
                     s: true
                  },
                  {
                     b: '',
                     c: '<16>{#k/0/0}* Oh yeah, Alphys totally had us adopt one.',
                     s: true
                  },
                  {
                     b: "<16>{#k/2/5}* I mean, they're kind of asleep right now, but...",
                     c: '',
                     s: true
                  },
                  {
                     b: '',
                     c: "<16>{#k/7/5}* ... they'll wake up eventually.",
                     s: true
                  },
                  {
                     b: '<16>{#k/2/6}* I wonder what they\'ll have to say about that \"archive\" thing...',
                     c: '<16>{#k/2/6}* Yeah, THAT thing...'
                  },
                  {
                     b: '',
                     c: "<16>{#k/2/4}* Isn't that where Asgore was keeping ALL the humans?",
                     s: true
                  },
                  {
                     b: '<16>{#k/0/0}* How can you keep a secret like that.',
                     c: '<16>* How was that even POSSIBLE!',
                     s: true
                  }
               ]
               : [
                  [
                     { b: '<16>{#k/4/4}* Oh my god.\n* Alphys.', c: '<16>* Oh my god, ALPHYS.', s: true },
                     {
                        b: '<16>{#k/5/8}* She used to live in our housing spire!',
                        c: '<16>* She was like a big sister!',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* I mean, like, if your big sister...',
                        c: '<16>{#k/2/2}* ... takes you on rip- roaring interstellar trash hunts!'
                     },
                     {
                        b: '<16>{#k/0/0}* She showed us the coolest ways to find stuff.',
                        c: '<16>* She built up a WICKED sci-fi collection.',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/4}* Then she became the royal scientist...',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: "<16>{#k/0/5}* ... she doesn't really have time for trash-hunting anymore.",
                        s: true
                     }
                  ],
                  [
                     {
                        b: '<16>{#k/0/6}* So Alphys has always been, like...',
                        c: '<16>{#k/0/0}* ... super duper smart.'
                     },
                     { b: '<16>{#k/2/4}* Like...', c: '<16>* UNNATURALLY smart.' },
                     {
                        b: '<16>{#k/0/0}* Like, she can calculate a derivative in her head...',
                        c: '<16>{#k/0/2}* ... in five seconds FLAT!'
                     },
                     {
                        b: "<16>{#k/0/0}* It's MEGA impressive and all...",
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/5}* ... but as a result, she struggles with her impulses sometimes.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/1/6}* I remember that time she called in half the Royal Guard...',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/5/4}* ... when she thought she saw some \"interesting trash.\"',
                        s: true
                     },
                     {
                        b: "<16>{#k/2/6}* It's like...",
                        c: "<16>* She doesn't process things the way most people do."
                     },
                     {
                        b: "<16>{#k/5/8}* But we love her for that, don't we?",
                        c: "<16>* But we still think she's A-MAZ-ING!",
                        s: true
                     },
                     {
                        b: '<16>{#k/4/0}* So like... OBVIOUSLY Asgore made her the royal scientist.',
                        c: '<16>{#k/0/2}* Oh, for sure!'
                     }
                  ],
                  [
                     {
                        b: '<16>{#k/0/0}* Oh right, THAT goofy goober.',
                        c: '<17>{#k/0/8}* Oh yeah, THAT furry fuzzball!',
                        s: true
                     },
                     {
                        b: "<16>{#k/2/0}* So like, here's the thing about Asgore...",
                        c: "<16>* ... he's one of the NICEST guys you'll ever meet."
                     },
                     ...[
                        [
                           {
                              b: '<16>{#k/2/0}* But, at the same time...',
                              c: '<16>{#k/2/4}* ... the stuff everyone wants him to do...'
                           },
                           {
                              b: "<16>{#k/4/5}* ... it's kind of gross.",
                              c: "<16>* ... it's just plain awful.",
                              s: true
                           },
                           {
                              b: '<16>{#k/2/6}* I heard Undyne lobbied to expand the Royal Guard.',
                              c: "<16>{#k/2/6}* Yeah, didn't Asgore, like, not even want one to begin with?"
                           }
                        ],
                        [
                           {
                              b: '<16>{#k/2/0}* But, at the same time...',
                              c: "<16>{#k/2/4}* ... the stuff you've been up to out there..."
                           },
                           {
                              b: "<16>{#k/4/5}* ... well, it's making his job a little tougher.",
                              c: "<16>* ... well, it's making his life a little harder.",
                              s: true
                           },
                           {
                              b: '<16>{#k/2/6}* Like...',
                              c: "<16>{#k/2/6}* ... maybe try NOT to kill anyone else, y'know?"
                           }
                        ]
                     ][world.bad_lizard],
                     {
                        b: '<16>{#k/3/6}* Gosh.\n* I really wanna give him a hug right now.',
                        c: '<16>{#k/3/2}* Yeah, we should TOTALLY squeeze the life outta him later!'
                     },
                     {
                        b: '<16>{#k/4/5/0}* ...',
                        c: '<16>* ...',
                        s: true
                     },
                     '{*}{#s/meow}{%}',
                     {
                        b: '<16>{#k/5/8}* Catty, no!',
                        c: '<16>* Nya ha ha!',
                        s: true
                     },
                     '{*}{#k/0/0/1}{%}'
                  ],
                  [
                     [
                        {
                           b: "<16>{#k/0/0}* Hey, there's no need to be afraid of him.",
                           c: '',
                           s: true
                        },
                        {
                           b: '',
                           c: "<16>{#k/0/1}* Yeah, he's WAY too adorable for that.",
                           s: true
                        },
                        {
                           b: '<16>{#k/5/1}* Way too adorable!',
                           c: '',
                           s: true
                        }
                     ],
                     [
                        {
                           b: "<16>{#k/0/0}* Hey, I'm sure he'll understand why you did what you did.",
                           c: '',
                           s: true
                        },
                        {
                           b: '',
                           c: "<16>{#k/0/2}* Yeah, he's like, Asgore after all!",
                           s: true
                        },
                        {
                           b: "<16>{#k/4/6}* It's basically his job.",
                           c: '',
                           s: true
                        }
                     ]
                  ][world.bad_lizard]
               ][Math.min(SAVE.data.n.shop_gossip_alphys++, 3)]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },

   s_save_aerialis: {
      a_start: {
         name: 'ラボ',
         text: () =>
            SAVE.data.n.plot < 65
               ? ['<32>{#p/human}* (The Royal Lab looms ahead, filling you with determination.)']
               : SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/human}* (Knowing most of your journey has been recorded from inside the Royal Lab...)',
                     '<32>* (The thought fills you with determination.)'
                  ]
                  : [
                     '<32>{#p/human}* (Knowing your every move is being recorded from inside the Royal Lab...)',
                     '<32>* (The thought fills you with determination.)'
                  ]
      },
      a_path3: {
         name: 'リフト',
         text: ['<32>{#p/human}* (Hovering from place to place fills you with determination.)']
      },
      a_elevator1: {
         name: 'R1エレベーター',
         text: () =>
            SAVE.data.n.plot < 65
               ? ['<32>{#p/human}* (Explosion-fueled joyrides fill you with determination.)']
               : SAVE.data.n.plot === 72
                  ? [
                     '<32>{#p/human}* (Despite the fact you might never get to use a jetpack again...)',
                     "<32>{#p/human}* (The adventures you've had on the outpost as a whole fill you with determination.)"
                  ]
                  : [
                     '<32>{#p/human}* (Despite the fact you might never get to use a jetpack again...)',
                     "<32>{#p/human}* (The adventures you've had thus far fill you with determination.)"
                  ]
      },
      a_mettaton2: {
         name: 'だい2ステージ',
         text: () =>
            SAVE.data.n.plot < 65
               ? SAVE.data.b.a_state_hapstablook
                  ? [
                     '<32>{#p/human}* (Pondering the backstory of a certain TV superstar fills you with determination.)'
                  ]
                  : ["<32>{#p/human}* (Mettaton's ludicrous hijinks fill you with determination.)"]
               : SAVE.data.n.plot < 68
                  ? ['<32>{#p/human}* (Taking a step back before your upcoming performance fills you with determination.)']
                  : world.bad_robot
                     ? ['<32>{#p/human}* (Reflecting on your road to conflict fills you with determination.)']
                     : SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/human}* (Reflecting on such an anti- climactic ending fills you with determination.)']
                        : SAVE.data.b.a_state_hapstablook
                           ? ['<32>{#p/human}* (Knowing how far Mettaton has come fills you with determination.)']
                           : ['<32>{#p/human}* (Reflecting on your road to superstardom fills you with determination.)']
      },
      a_split: {
         name: 'ふんすい',
         text: () =>
            SAVE.data.n.plot < 65
               ? SAVE.data.b.a_state_hapstablook
                  ? ["<32>{#p/human}* (The anticipation of Mettaton's intervention fills you with determination.)"]
                  : ['<32>{#p/human}* (This fountain in the middle of nowhere fills you with determination.)']
               : SAVE.data.n.plot < 68
                  ? ['<32>{#p/human}* (Gazing upon this fountain once again fills you with determination.)']
                  : world.bad_robot || SAVE.data.b.killed_mettaton
                     ? [
                        '<32>{#p/human}* (The punch in the fountain has turned bitter.)',
                        '<32>* (This, of course, fills you with determination.)'
                     ]
                     : SAVE.data.b.a_state_hapstablook
                        ? [
                           '<32>{#p/human}* (The punch in the fountain has turned savory.)',
                           '<32>* (This, of course, fills you with determination.)'
                        ]
                        : [
                           '<32>{#p/human}* (The punch in the fountain tastes the same as before.)',
                           '<32>* (This, of course, fills you with determination.)'
                        ]
      },
      a_aftershow: {
         name: 'かいてんほろう',
         text: () =>
            SAVE.data.b.ubershortcut
               ? ['<32>{#p/human}* (Taxi rides to unfamiliar places fill you with determination.)']
               : 68 <= SAVE.data.n.plot
                  ? ['<32>{#p/human}* (Returning to this corner of corny comforts fills you with determination.)']
                  : SAVE.data.b.a_state_hapstablook
                     ? ["<32>{#p/human}* (Learning Mettaton's backstory fills you with determination.)"]
                     : ['<32>{#p/human}* (Over-dramatic musicals fill you with determination.)']
      },
      a_core_entry1: {
         name: 'コア',
         text: ['<32>{#p/human}* (The cold and computerized aesthetic in this area fills you with determination.)']
      },
      a_core_checkpoint: {
         name: 'メンテナンスエリア',
         text: () =>
            SAVE.data.b.ubershortcut
               ? ['<32>{#p/human}* (The air is calm and peaceful, filling you with determination.)']
               : SAVE.data.n.plot < 68
                  ? ["<32>{#p/human}* (The anticipation of Mettaton's grand finale fills you with determination.)"]
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* (Knowing the CORE will soon run out of power...)',
                        '<32>{#p/human}* (It fills you with determination.)'
                     ]
                     : [
                        '<32>{#p/human}* (The thought of unnecessarily backtracking to the CORE...)',
                        '<32>{#p/human}* (It fills you with determination.)'
                     ]
      }
   }
};


// END-TRANSLATE
