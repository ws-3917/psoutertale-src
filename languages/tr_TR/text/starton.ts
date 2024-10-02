import { asrielinter, epilogueOverride } from '../../../code/common';
import { blookGone, dateready, papreal, roomready, solo, trueSpaghettiState } from '../../../code/starton/extras';
import { game, renderer } from '../../../code/systems/core';
import {
   battler,
   calcHP,
   calcLV,
   choicer,
   fetchCharacters,
   instance,
   pager,
   player,
   postSIGMA,
   roomKills,
   world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../../../code/systems/storyteller';

// START-TRANSLATE

export default {
   a_starton: {
      telescope1: () => [
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* A standard-issue CITADEL long- range telescope, circa 261X.' ]),
         choicer.create('* (Use the telescope?)', 'Yes', 'No')
      ],
      telescopeMeetup1: [ '<25>{#p/kidd}{#f/2}* You do stargazing??' ],
      telescopeMeetup2: [
         '<25>{#p/kidd}{#f/1}* Yo... I bet you just saw something really cool.',
         '<25>{#f/7}* The last time I looked in a telescope, I saw a freaking SUPERNOVA!'
      ],
      telescopeMeetup3: [
         '<25>{#p/kidd}{#f/3}* Here.\n* Take this.',
         '<32>{#s/equip}{#p/human}* (The Premium Membership Voucher was added to your keyring.)',
         '<25>{#p/kidd}{#f/7}* Now you can use ANY telescope, even the \"premium\" ones!',
         '<25>{#f/1}* That short skeleton gave me a bunch of these earlier.',
         '<25>{#f/2}* He also gave me some digital thing with a lot of money...',
         '<25>{#f/1}* I guess he really likes me, haha.'
      ],
      telescopeMeetup4: [
         '<25>{#p/kidd}{#f/3}* Anyway, I kinda just wanted to give you the voucher.',
         '<25>{#f/1}* I hope you see something cool with it, though!'
      ],
      telescopeMeetup5: [ "<25>{#p/kidd}{#f/1}* I'll be in town!" ],
      telescope2: () =>
         SAVE.data.b.svr
            ? [ '<25>{#p/asriel1}{#f/17}* See anything you like?' ]
            : SAVE.data.b.oops || SAVE.data.b.s_state_chargazer
            ? [ '<32>{#p/basic}* Stargazing in space...\n* Truly, this is some outside- the-box thinking.' ]
            : ((SAVE.data.b.s_state_chargazer = true),
              [
                 '<32>{#p/basic}* ...',
                 '<32>* Asriel and I had a telescope just like this.',
                 "<32>* We'd point it in random directions, hoping to see something exciting...",
                 '<32>* ... we never saw much at all.',
                 "<32>* Despite that, it didn't seem to matter to him...",
                 '<32>* While I was focused on looking outward, he was just happy to spend time with me.',
                 '<32>* ...',
                 '<32>{#p/human}* (You hear a sigh.)',
                 "<32>{#p/basic}* ... uh, let's just get back to what we were doing."
              ]),
      notv: [ "<32>{#p/basic}* It doesn't seem like there's anything interesting to watch." ],
      nicecreamScoreReaction1a: [ '<32>{#p/basic}* Not bad for your first try...' ],
      nicecreamScoreReaction1b: [ '<32>{#p/basic}* Not bad for your first try.' ],
      nicecreamScoreReaction2a: [ '<32>{#p/basic}* You can do better than that...' ],
      nicecreamScoreReaction2b: [ '<32>{#p/basic}* You can do better than that.' ],
      nicecreamScoreReaction3a: [
         "<32>{#p/basic}* You beat the top scorer...?\n* I don't think I've ever seen anyone do that..."
      ],
      nicecreamScoreReaction3b: [
         "<32>{#p/basic}* You beat the top scorer?\n* I don't think I've ever seen anyone do that!"
      ],
      nicecreamScoreReaction4a: [ '<33>{#p/basic}* You seem pretty good at this...' ],
      nicecreamScoreReaction4b: [ '<32>{#p/basic}* You seem pretty good at this.' ],
      nicecreamScoreReaction5a: [ '<32>{#p/basic}* You beat your high score...?' ],
      nicecreamScoreReaction5b: [ '<32>{#p/basic}* Look at that, new high score!' ],
      nicecreamScoreReaction6a: [ '<32>{#p/basic}* For a second, I thought you were going to beat the top scorer...' ],
      nicecreamScoreReaction6b: [
         "<32>{#p/basic}* Woah, you could've beaten the top scorer!\n* Can you go all the way?"
      ],
      nicecreamScoreReaction7a: [ '<32>{#p/basic}* Looks like you could use some practice...' ],
      nicecreamScoreReaction7b: [ '<32>{#p/basic}* Looks like you could use some practice.' ],
      nicecreamScoreReaction8a: [ "<32>{#p/basic}* That's better..." ],
      nicecreamScoreReaction8b: [ "<32>{#p/basic}* That's more like it." ],
      nicecreamScoreReaction9a: [
         '<32>{#p/basic}* You beat the top scorer on your first try...?\n* How in the world...'
      ],
      nicecreamScoreReaction9b: [ "<32>{#p/basic}* You beat the top scorer on your first try?\n* You're a natural!" ],
      nicecreamScoreReaction10a: [ "<32>{#p/basic}* For a first try, that's pretty good..." ],
      nicecreamScoreReaction10b: [ "<32>{#p/basic}* For a first try, that's pretty good!" ],
      nicecreamScoreReaction11a: [ '<32>{#p/basic}* You keep getting so close...' ],
      nicecreamScoreReaction11b: [ '<32>{#p/basic}* Darn, you almost beat the top scorer again...\n* You can do it!' ],
      noteleport: [ "<32>{#p/human}* (It doesn't seem to be powered on anymore.)" ],
      evac: [ '<32>{#p/human}* (You feel the nearby monster presence dwindling.)' ],
      shopclosed: [ '<32>{#p/human}* (But there was nothing left for you to do here.)' ],
      jukebox0: [ "<32>{#p/basic}* It's out of service." ],
      jukebox1: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* (You reach for the jukebox...)'
            : "<32>{#p/basic}* This jukebox only plays music you've heard before.",
         choicer.create(
            '* (Play a song?)',
            SAVE.data.b.napsta_performance ? 'Track 01' : '???',
            2 <= SAVE.data.n.state_foundry_swansong ? 'Track 02' : '???',
            2 <= SAVE.data.n.state_starton_trashprogress ? 'Track 03' : '???',
            'Cancel'
         )
      ],
      jukebox1x1: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (But you couldn't play a song you didn't know yet.)" ]
            : [ "<32>{#p/basic}* The cover depicts a spooky DJ playing to the crowd.\n* You can't know this song." ],
      jukebox1x2: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (But you couldn't play a song you didn't know yet.)" ]
            : [ "<33>{#p/basic}* The cover depicts a spooky DJ at their computer.\n* You can't know this song." ],
      jukebox1x3: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (But you couldn't play a song you didn't know yet.)" ]
            : [
                 "<32>{#p/basic}* The cover depicts a little white dog surrounded by trash.\n* You can't know this song."
              ],
      jukebox1y: [ '<32>{*}{#p/human}* (You select the disc...){^40}{%}' ],
      jukebox2: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* (It sounds like a song is currently playing.)'
            : [
                 '<32>{#p/basic}* Currently playing \"Track 01\"',
                 '<32>{#p/basic}* Currently playing \"Track 02\"',
                 '<32>{#p/basic}* Currently playing \"Track 03\"'
              ][SAVE.data.n.state_starton_jukebox - 1],
         choicer.create('* (Stop playback?)', 'Yes', 'No')
      ],
      jukebox3a1: [ "<32>{#p/basic}{#npc/a}* That's more like it!" ],
      jukebox3a2: [ '<32>{#p/basic}{#npc/a}* (We love this kind of music.)' ],
      jukebox3b: [ '<32>{#p/basic}{#npc/a}* Is that the song making the rounds at the dance club?' ],
      jukebox3c: [
         '<32>{#p/basic}* ...\n* ...\n* ...',
         "<32>{#npc/a}* Grillbz says he's heard this song somewhere before."
      ],
      jukebox3d: [
         '<32>{#p/basic}{#npc/a}* You sure know a lot of music offhand, kid...',
         '<32>* You must be really tasty.'
      ],
      shockpapyrus0a: [
         '<15>{#p/papyrus}{#e/papyrus/27}WHAT ON KRIOS IS GOING ON HERE??',
         '<15>{#p/papyrus}{#e/papyrus/21}I ANSWER A PHONE CALL FROM MY BALCONY...',
         '<15>{#p/papyrus}{#e/papyrus/19}AND THIS IS WHERE IT LEADS ME!?',
         "<15>{#p/papyrus}{#e/papyrus/14}I'LL HAVE YOU KNOW, I'M A SHOE-IN FOR THE ROYAL GUARD.",
         '<15>{#p/papyrus}{#e/papyrus/15}SO, WHATEVER YOU TWO ARE PLANNING...'
      ],
      shockpapyrus0b: [
         '<15>{#p/papyrus}{#e/papyrus/24}... WAIT, THAT VOICE...',
         '<15>{#p/papyrus}{#e/papyrus/22}ARE YOU THE ONE WHO CALLED ME ON THE PHONE EARLIER!?'
      ],
      shockpapyrus0c: [
         '<15>{#p/papyrus}{#e/papyrus/20}... OF COURSE!\nTHAT EXPLAINS EVERYTHING!',
         "<15>{#p/papyrus}{#e/papyrus/10}WELL THEN.\nI'M GLAD TO HAVE FINALLY MET YOU.",
         '<15>{#p/papyrus}{#e/papyrus/24}TO BE HONEST, YOU KIND OF REMIND ME OF...',
         '<15>{#p/papyrus}{#e/papyrus/20}... HEY, WAIT A SECOND!!',
         '<15>{#p/papyrus}{#e/papyrus/22}DID YOU BRING A -HUMAN- WITH YOU!?!?',
         '<15>{#p/papyrus}{#e/papyrus/10}WOWIE!!\nTHIS JUST GETS BETTER AND BETTER!!',
         '<15>{#p/papyrus}{#e/papyrus/20}SO, WHAT ARE WE DOING HERE ANYWAY?'
      ],
      shockpapyrus1: () =>
         [
            [
               '<32>{#p/asriel2}* Ready, $(name)?',
               choicer.create('* (What should Asriel do?)', 'Mercy', 'Act', 'Magic', 'Fight')
            ],
            [ "<32>{#p/asriel2}* Let's just get this over with." ]
         ][Math.min(SAVE.flag.n.ga_asrielPapyrus, 1)],
      shockpapyrus2a: [
         '<32>{#p/asriel2}* Mercy, huh?',
         '<32>{#p/asriel2}* Mercy... I think I like that word.',
         '<32>{#p/asriel2}* Let\'s show him some \"Mercy.\"'
      ],
      shockpapyrus2b: [
         "<32>{#p/asriel2}* Act...?\n* I'll show you how to act.",
         '<32>{#p/asriel2}* First, you raise your arm...',
         '<32>{#p/asriel2}* Then...!'
      ],
      shockpapyrus2c: [
         '<32>{#p/asriel2}* Magic.\n* The force that binds us monsters together.',
         '<32>{#p/asriel2}* Or, in this case...',
         '<33>{#p/asriel2}* The force that rips them apart.'
      ],
      shockpapyrus2d: [ '<32>{#p/asriel2}* Fight... the ideal choice.', '<32>{#p/asriel2}* Hee hee hee...' ],
      sansDeath1: [ "<15>{#p/papyrus}{#e/papyrus/27}SANS!\nYOU'RE HURT!" ],
      sansDeath2: [ "<20>{#p/sans}papyrus, didn't i tell you to stay at home?", '{*}{#e/papyrus/21}{%}' ],
      sansDeath3: [ "<20>{#p/sans}... don't worry bro, it's just yamok sauce.", '{*}{#e/papyrus/26}{%}' ],
      sansDeath4: [ "<15>{#p/papyrus}{#e/papyrus/21}BUT YOU'RE HURT..." ],
      sansDeath5: [
         "<20>{#p/sans}yeah, that's what happens when you act on instinct.",
         '<20>{#p/sans}... not much i can do about it now.',
         '{*}{#e/papyrus/21}{%}'
      ],
      sansDeath6: [
         '<20>{#p/sans}so...',
         "<20>guess that's it, huh?",
         '<20>...',
         '<20>just...',
         "<20>promise me you'll be fine without me, bro.",
         "<20>promise me you'll be g-{^5}great.",
         '<20>...',
         '<20>after all...'
      ],
      sansDeath7: [ "<20>{|}{#p/sans}you're the... great p-{^5}papyrus.{^20}{%}" ],
      sansDeath8: [ '<15>{#p/papyrus}{#e/papyrus/33}N-NO...{^40}{%}' ],
      fast_food1: () => [
         SAVE.data.b.fryz
            ? "<32>{#p/human}{#npc}* (You got the Flamin' Grillby.)"
            : '<32>{#p/human}{#npc}* (You got the Sliders.)'
      ],
      fast_food2: [ "<32>{#p/human}{#npc}* (You're carrying too much.)" ],
      aussie: pager.create(
         0,
         () =>
            SAVE.data.n.state_starton_trashprogress < 1
               ? [
                    '<25>{#p/sans}{#f/0}* finally.',
                    "<25>{#f/3}* i've been wondering when you'd show up.",
                    '<25>{#f/0}* i dunno if you recall, but back when we first met...',
                    '<25>{#f/0}* i told papyrus to focus more on the \"gravity\" of the situation.',
                    '<25>{#f/0}* what did i mean by that, you ask?',
                    '<25>{#f/3}* well.',
                    "<25>{#f/2}* you're about to {@fill=#003cff}find out{@fill=#fff}."
                 ]
               : [ '<25>{#p/sans}{#f/0}* welcome back.', '<25>{#f/2}* ready to find out what awaits you?' ],
         () =>
            SAVE.data.n.state_starton_trashprogress < 1
               ? [ '<25>{#p/sans}{#f/0}* go on, take a look.', "<25>{#f/2}* it's right up there, bucko." ]
               : [ "<25>{#p/sans}{#f/2}* it's right up there, bucko." ],
         () =>
            SAVE.data.n.state_starton_trashprogress < 2
               ? [ "<25>{#p/sans}{#f/2}* don't worry, it's not dangerous... even if it tries to be." ]
               : [ '<25>{#p/sans}{#f/2}* thanks for the help.' ]
      ),
      trashhunt1: [
         '<25>{#p/sans}{#f/0}* sooo... whaddya think?',
         '<25>{#f/3}* i call it the \"trash planet.\"',
         "<25>{#f/0}* ... actually, this thing's been growing in size for quite a while.",
         '<25>{#f/0}* if it gets any larger, well...',
         "<25>{#f/2}* let's just say we'd be in a {@fill=#ff0}world{@fill=#fff} of trouble.",
         "<25>{#f/0}* don't worry, though.\n* with your help, it'll be gone in no time.",
         '<25>{#f/2}* i even found you some music to keep you motivated.'
      ],
      trashhunt2: '* Press [Z] repeatedly to shake\n  out all the trash!',
      trashhunt3: () => [
         '<25>{#p/sans}{#f/3}* wow.\n* all in one go, huh?',
         "<25>{#f/2}* ... well i'll be turned upside down.",
         '<25>{#f/0}* guess i gotta give you some kinda reward.',
         '<25>{#f/0}* ...\n* here.\n* have this on me.',
         '<32>{#p/human}* (Sans tossed you something.)',
         ...(SAVE.storage.inventory.size < 8
            ? [ '<32>{#s/equip}{#p/human}* (You got the Corn Dog Sword.)', '<25>{#p/sans}{#f/2}* use it wisely.' ]
            : [
                 "<32>{#p/human}* (You're carrying too much.)",
                 '<25>{#p/sans}{#f/3}* no room, huh?',
                 "<25>{#p/sans}{#f/2}* don't worry.\n* i'll leave it in my room for you."
              ])
      ],
      gravo1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (You look curiously at the seemingly useless device.)',
                 ...[ [ "<25>{#p/asriel1}{#f/17}* Too bad we don't have the remote for this thing, huh?" ], [] ][
                    Math.min(asrielinter.gravo1++, 1)
                 ]
              ]
            : [ '<32>{#p/basic}* It\'s a \"gravometric inverter.\"', '<32>* Whatever that means.' ],
      gravo3: () => [
         '<32>{#p/human}* (You use the Gravometric Inverter Remote.)\n* (Nothing happens.)',
         ...(SAVE.data.b.svr
            ? [ [ "<25>{#p/asriel1}{#f/21}* They're probably shutting off power for non-essential devices." ], [] ][
                 Math.min(asrielinter.gravo3++, 1)
              ]
            : [ '<32>{#p/basic}* It must be offline...' ])
      ],
      gravo2: [ '<32>{#p/human}* (You use the Gravometric Inverter Remote.)' ],
      sansdoor1: () =>
         SAVE.data.b.svr || world.runaway
            ? [ '<32>{#p/human}* (It looks to have been closed with a deadlock seal.)' ]
            : [ "<32>{#p/basic}* It's locked." ],
      sansdoor2: [ '<32>{#p/human}* (You use the Skeleton Key.)' ],
      sanscab1: () => [
         ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* There's an odd remote inside of this envelope." ]),
         '<32>{#s/equip}{#p/human}* (The Gravometric Inverter Remote was added to your keyring.)'
      ],
      sanscab2: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (But you already emptied the envelope of its contents.)' ]
            : [ "<32>{#p/basic}* It's just an empty envelope." ],
      sanscab3: () => [
         ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* There's an odd... item, inside of this envelope." ]),
         SAVE.storage.inventory.size < 8
            ? '<32>{#s/equip}{#p/human}* (You got the Corn Dog Sword.)'
            : "<32>{#p/human}* (You're carrying too much.)"
      ],
      cream_get: [ '<32>{#p/human}* (You got the Ice Dream.)' ],
      cream_deny: [ '<32>{#p/basic}* Nothing left.' ],
      cream_full: [ "<32>{#p/human}* (You're carrying too much.)" ],
      cream_get_archive: [
         '<32>{#p/human}* (You reach into the cart.)',
         '<32>{#p/human}{#s/equip}* (You got the Ice Dream.)'
      ],
      cream_empty_archive: [ '<32>{#p/human}* (You reach into the cart.)', '<32>{#p/human}* (...)' ],
      cream_full_archive: [ "<32>{#p/human}* (You're carrying too much to reach inside.)" ],
      bunbun: pager.create(
         0,
         () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* Mom says that we're going to a new homeworld soon.", "<32>* ... what's a homeworld?" ]
               : [
                    '<32>{#p/basic}* Mom says that sleeping could recover your health {@fill=#ff0}above your maximum HP{@fill=#fff}.',
                    "<32>* ... what's maximum HP?"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Do humans have a homeworld?' ]
               : [ '<32>{#p/basic}* Is it something monsters have?' ]
      ),
      emptytable1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The table strikes you as being rather lonesome.)' ]
            : [ "<32>{#p/basic}* It's just a lonely table.\n* Smells like frosting." ],
      emptytable2: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The table strikes you as being rather lonesome.)' ]
            : [ "<32>{#p/basic}* It's just a lonely table.\n* Smells like hair." ],
      balcony0: () => [ '<18>{#p/papyrus}ENJOYING THE VIEW?', choicer.create('* (What do you say?)', 'Yes', 'No') ],
      balcony1: [
         "<18>{#p/papyrus}{#f/9}GOOD!\nIT'S ABOUT TIME SOMEONE DID.",
         '<18>{#f/7}SANS BARELY EVER TAKES THE TIME TO LOOK OUTSIDE!!!'
      ],
      balcony2: [
         "<18>{#p/papyrus}{#f/5}OH...\nWELL, THAT'S OKAY...",
         '<18>{#f/4}(SIGH...)\nAT LEAST YOU TRIED WALKING OUT.',
         "<18>{#f/7}SANS WOULDN'T EVEN DO THAT!!!"
      ],
      bedbook1: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to understand the contents of this book.)" ]
            : [ "<32>{#p/basic}* It's a book, written in an ancient language." ],
      bedbook3a: [ '<32>{#p/basic}* Would you like me to read it?' ],
      bedbook3b: [ '<32>{#p/basic}* Read it again?' ],
      bedbook4: () => [ choicer.create('* (Have $(name) read the book?)', 'Yes', 'No') ],
      bedbook5: [
         '<32>{#p/basic}* Okay, here goes...',
         '<32>* \"Long ago, two species ruled the solar system: humans and monsters.\"',
         '<32>* \"At first, the monsters were only visitors, soon to return to their own star system.\"',
         '<32>* \"But the monsters became fascinated by humanity, and wanted to co-exist with them.\"',
         '<32>* \"As such, they shared their technology with the humans, and forged an alliance.\"',
         '<32>* \"Over the next few hundred years, monsters and humans lived in peace and harmony.\"',
         '<32>* \"One day, the humans began to fear something about the monsters...\"',
         '<32>* \"A fear that, without skilled leadership, was allowed to spiral out of control.\"',
         '<32>* \"As time passed, a war broke out between the two species.\"',
         '<32>* \"Many battles and skirmishes would occur all across the stars...\"',
         '<32>* \"But the humans, filled with fear and determination, easily took control.\"',
         '<32>* \"Then, on one fateful day, a massive weapon was fired at the monsters\' homeworld.\"',
         '<32>* \"After the monsters\' home planet was destroyed, humans declared victory.\"',
         '<32>* \"A settlement between the two species was signed, and...\"',
         '<32>* \"The remaining monsters were banished to an abandoned outpost.\"',
         '<32>* \"Then, the humans gathered seven of their brightest minds.\"',
         '<32>* \"Together, they formulated a plan, and eventually...\"',
         '<32>* \"A powerful force field was erected, and the monsters were sealed in.\"',
         "<32>* Well, that's the story."
      ],
      bedbook6: [ '<32>{#p/basic}* Well, if you ever want me to read it, let me know.' ],
      beddoor1: [ "<32>{#p/basic}{#npc/a}* If you want a room, you'll need to ask me first." ],
      beddoor2: [ "<32>{#p/basic}{#npc/a}* If you want a room again, you'll need to ask me first." ],
      beddoor3: [ '<32>{#p/basic}{#npc/a}* Sorry, munchkin!\n* No more vacancies left here!' ],
      candy1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : [
                 SAVE.data.b.svr
                    ? '<32>{#p/human}* (You approach the vending machine.)'
                    : "<32>{#p/basic}* It's an exoberry-exclusive vending machine.",
                 choicer.create('* (Buy the Exoberries for 8G?)', 'Yes', 'No')
              ],
      candy2: [ "<32>{#p/human}* (You don't have enough G.)" ],
      candy3: [ "<32>{#p/human}* (You're carrying too much.)" ],
      candy4: [ '<32>{#p/human}* (You got the Exoberries.)' ],
      candy5: [ '<32>{#p/human}* (You decide not to buy.)' ],
      capstation1: [
         '<32>{#p/human}* (You look behind the station and find a key.)',
         '<32>{#s/equip}{#p/human}* (The Rusty Key was added to your keyring.)',
         '<32>* (Check your CELL to see all acquired keys.)'
      ],
      capstation2: [ '<32>{#p/human}* (You look behind the station.)', '<32>{#p/basic}* Nothing new back here.' ],
      crossword0: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}* oh, hey there.',
                 '<25>{#p/sans}{#f/2}* if you liked that last puzzle, just wait until you see this one.'
              ]
            : [
                 '<18>{#p/papyrus}{#f/9}HUMAN!!',
                 '<18>{#f/9}YOU HAVE SEEN MY PUZZLES.',
                 '<18>{#f/4}BUT WHAT YOU ARE ABOUT TO SEE IS...'
              ],
      crossword1: () =>
         world.edgy
            ? [
                 '<26>{#p/sans}* no, really.\n* walk up and take a look.',
                 "<25>{#p/sans}* it's right there on the ground."
              ]
            : [
                 "<18>{#p/papyrus}{#f/7}SANS!!\nWHERE'S THE PUZZLE!?",
                 "<25>{#p/sans}* you're lookin' at it.",
                 '<18>{#p/papyrus}{#f/1}WHAT?\nTHAT TABLET LYING ON THE GROUND?',
                 '<18>{#f/4}OKAY...'
              ],
      crossword2: (check: boolean) =>
         world.edgy
            ? [
                 check
                    ? '<25>{#p/sans}* well, how was it?\n* ... too hot to handle?'
                    : "<25>{#p/sans}* can't even bring yourself to look at it, huh?",
                 "<25>* i guess i shouldn't have expected much.",
                 '<26>{#f/3}* oh well.\n* maybe a kakuro puzzle would be easier for you.',
                 '<26>{#f/0}* but i digress.'
              ]
            : [
                 check
                    ? "<18>{#p/papyrus}{#f/7}SANS!!!\nTHAT DIDN'T DO ANYTHING!"
                    : "<18>{#p/papyrus}{#f/7}SANS!!!\nTHEY DIDN'T EVEN LOOK AT IT!",
                 '<25>{#p/sans}* whoops.',
                 "<25>{#f/3}* i knew i should have used today's kakuro puzzle instead.",
                 '<18>{#p/papyrus}{#f/1}WHAT!? KAKURO!?',
                 "<18>{#f/9}I CAN'T BELIEVE YOU SAID THAT!!",
                 '<18>{#f/4}IN MY OPINION...',
                 '<18>{#f/0}SUDOKU IS EASILY THE HARDEST.',
                 '<25>{#p/sans}* what? really, dude?\n* that easy-peasy number shuffle?',
                 "<25>{#f/4}* that's for baby bones.",
                 '<18>{#p/papyrus}{#f/4}UN. BELIEVABLE.',
                 '<18>{#f/9}HUMAN!!!\nSOLVE THIS DISPUTE!',
                 choicer.create('* (Which is harder?)', 'Sudoku', 'Kakuro')
              ],
      crossword3a: [
         '<18>{#p/papyrus}HA! HA! YES!',
         '<18>HUMANS MUST BE VERY INTELLIGENT!',
         '<18>IF THEY ALSO FIND SUDOKU SO DIFFICULT!',
         '<18>{#f/9}NYEH! HEH! HEH HEH!'
      ],
      crossword3b: [
         '<18>{#p/papyrus}{#f/9}YOU TWO ARE WEIRD!',
         '<18>{#f/0}KAKURO PUZZLES ARE SO EASY.',
         "<18>IT'S THE SAME SOLUTION EVERY TIME.",
         '<18>{#f/4}I JUST FILL ALL THE BOXES IN WITH THE LETTER \"Z\"...',
         '<18>{#f/4}BECAUSE EVERY TIME I LOOK AT A KAKURO...',
         '<18>{#f/9}ALL I CAN DO IS SNORE!!!'
      ],
      crossword3c: [
         '<25>{#p/sans}{#f/3}* by the way, i think i saw a pair of dogs running around...',
         "<25>{#f/0}* i'd tread carefully if i were you."
      ],
      crossword4a: pager.create(0, [ '<25>{#p/sans}* hey, where ya goin there, bucko?' ], [ '<25>{#p/sans}* wrong way.' ]),
      crossword4b: pager.create(0, [ "<25>{#p/sans}* really?\n* it's not THAT bad." ], [ '<25>{#p/sans}* really?' ]),
      crossword5a: [
         '<25>{#p/sans}* thanks for saying \"sudoku\" just to appease my brother.',
         '<25>{#f/4}* yesterday he got stumped trying to \"solve\" a star chart.'
      ],
      crossword5b: [
         '<25>{#p/sans}* papyrus...\n* ... finds difficulty in interesting places.',
         '<25>{#f/4}* yesterday he got stumped trying to \"solve\" a star chart.'
      ],
      crossword6a: [
         "<25>{#p/sans}{#f/3}* i kinda figured you'd skip over it.",
         "<25>{#f/0}* that just seems like the sort of thing you'd do, doesn't it?"
      ],
      crossword6b: [
         "<25>{#p/sans}{#f/3}* i'm surprised.\n* i thought you'd walk right past it.",
         "<25>{#f/2}* perhaps you're not so terrible after all."
      ],
      crossword6c: [ '<25>{#p/sans}{#f/2}* heheh, made you look.' ],
      crossword6d: [
         "<25>{#p/sans}{#f/3}* i'm surprised.\n* i thought you weren't even interested.",
         "<25>{#f/2}* perhaps you're not so terrible after all."
      ],
      doggo1: [
         '<32>{#p/basic}* Did something move?\n* Was it just my imagination?',
         '<32>* If something WAS moving...\n* For example, a human...',
         "<32>* I'll make sure it never leaves my sight again!"
      ],
      doggo2: [
         [
            "<32>{#p/basic}* S-S-S-Something pet me...\n* Something that isn't even m-m-moving...!",
            "<32>* I'm gonna need some dog treats for this."
         ],
         [ '<32>{#p/basic}* A w-w-wrench appeared out of nowhere, h-huh!?!?', '<32>{#p/basic}* ... what a day!' ],
         [],
         [
            '<32>{#p/basic}* A h-h-human came up and attacked me...\n* Out of n-n-nowhere...!',
            "<32>{#p/basic}* I'm...\n* I'm gonna go to bed."
         ]
      ],
      doggo3: pager.create(
         0,
         [ '<32>{#p/basic}* Hello?\n* Is anybody there...?' ],
         [ '<32>{#p/basic}* Are you two playing a trick on me?\n* Real funny, guys.' ],
         [ '<32>{#p/basic}* Big lug?\n* Is that you?\n* Come on...' ],
         [ "<32>{#p/basic}* Well, it's not the tall skeleton...\n* He's too loud." ],
         [ '<32>{#p/basic}* Whoever you are, knock it off!!!' ],
         [ '<32>{#p/basic}* ...' ]
      ),
      doggo3x: [ '<32>{#p/basic}* (Snore... snore...)' ],
      drop_chip: [
         '<32>{#p/basic}* Did you just...\n* Drop the part of me I had given you?',
         '<32>* I have no words for you...\n* Begone!'
      ],
      drop_cream: [ "<32>{#p/basic}* You know, you're lucky I'm busy advertising." ],
      eat_chip: [
         '<32>{#p/basic}* Did you just...\n* Consume the part of me I had given you?',
         '<32>* I have no words for you...\n* Begone!'
      ],
      eat_cream: [ '<32>{#p/basic}* Nice to see you enjoying your Ice Dream!\n* Very nice!' ],
      genotext: {
         asriel1: () =>
            [ [ '<25>{#p/asriel2}{#f/9}* Just follow my lead...' ], [ '<25>{#p/asriel2}{#f/16}* This way.' ] ][
               Math.min(SAVE.flag.n.ga_asriel1++, 1)
            ],
         asriel2: () =>
            [
               [ "<25>{#p/asriel2}{#f/2}* Well, well... if it isn't the great Papyrus standing just ahead." ],
               [ '<25>{#p/asriel2}{#f/3}* Well, well... here we go again.' ]
            ][Math.min(SAVE.flag.n.killed_sans, 1)],
         asriel3: () =>
            [
               [ "<25>{#p/asriel2}{#f/1}* Let's go introduce ourselves, shall we?" ],
               [ '<25>{#p/asriel2}{#f/4}* You know the drill by now.' ]
            ][Math.min(SAVE.flag.n.killed_sans, 1)],
         asriel4: [ '<25>{*}{#p/asriel2}{#f/5}* Howdy!{^5}{%}' ],
         asriel5: [ '<18>{*}{#p/papyrus}{#f/1}WHAT THE- {%}' ],
         asriel6: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/13}* ... $(name), do you...',
                  '<25>{#f/17}* Do you think you could take over from here?',
                  "<25>{#f/15}* Not that anything's wrong with me, but...",
                  "<25>{#f/16}* I just think you'd be better at this than I am.",
                  "<25>{#f/17}* Yeah, that's it.\n* You're better at this sort of thing."
               ],
               [ "<25>{#p/asriel2}{#f/16}* Okay, yeah.\n* I'll, uh... let you take over now." ],
               [ '<25>{#p/asriel2}{#f/15}* So, uh... onwards?' ],
               [ '<25>{#p/asriel2}{#f/15}* ...' ]
            ][Math.min(SAVE.flag.n.ga_asriel6++, 3)],
         asriel9: [ "<25>{#p/asriel2}{#f/8}* Psst, let's wait and see what he does." ],
         asriel10: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/15}* Wow.\n* To see Papyrus in such a state...',
                  "<25>{#f/16}* ... it's certainly unexpected, isn't it?",
                  '<25>{#f/13}* Oh, $(name)...',
                  "<25>{#f/1}* I think we're going to have a lot of fun."
               ],
               [ '<25>{#p/asriel2}{#f/16}* Poor, poor Papyrus.' ]
            ][Math.min(SAVE.flag.n.ga_asriel10++, 1)],
         asriel17: () =>
            [ [ "<25>{#p/asriel2}{#f/16}* Golly... some people just don't get it." ], [ '<25>{#p/asriel2}{#f/4}* Tch.' ] ][
               Math.min(SAVE.flag.n.ga_asriel17++, 1)
            ],
         asriel24: () =>
            [ [ '<25>{#p/asriel2}{#f/4}* What a waste of time.' ], [ '<25>{#p/asriel2}{#f/3}* Huh.' ] ][
               Math.min(SAVE.flag.n.ga_asriel24++, 1)
            ],
         asriel26: () =>
            [
               [
                  "<26>{#p/asriel2}{#f/3}* Well, that's the canine unit gone.",
                  '<26>{#p/asriel2}{#f/4}* Only one bridge left between us and town.',
                  '<25>{#f/1}* ... stay behind me.'
               ],
               [ '<25>{#p/asriel2}{#f/3}* Into town we go...' ]
            ][Math.min(SAVE.flag.n.ga_asriel26++, 1)],
         asriel28: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* Okay, $(name).\n* The town's all yours.",
                  "<25>{#f/7}* In the meantime, I have to do something that'll be important later.",
                  "<25>{#f/1}* I'll be back before you know it."
               ],
               [ '<25>{#p/asriel2}{#f/1}* See you around the back of town.' ]
            ][Math.min(SAVE.flag.n.ga_asriel28++, 1)],
         asriel29: () =>
            [
               SAVE.data.b.papyrus_secret
                  ? [
                       '<25>{#p/asriel2}{#f/2}* Hee.\n* Hee.\n* Hee....',
                       "<25>{#f/10}* ... wait, where's Papyrus?",
                       '<25>{#f/10}* ...',
                       "<25>{#f/4}* Golly, $(name), I didn't think you'd kill him THAT quickly."
                    ]
                  : [
                       '<25>{#p/asriel2}{#f/2}* Hee.\n* Hee.\n* Hee....',
                       "<25>{#f/1}* It's about time that bonehead paid the price for his mercy.",
                       '<25>{#f/13}* Golly.\n* He wanted SO badly to forgive you.',
                       "<25>{#f/16}* But, let's be honest with ourselves here...",
                       "<25>{#f/1}* We've got bigger fish to fry."
                    ],
               [ '<25>{#p/asriel2}{#f/13}* Oh well.\n* The skeleton died for nothing again.' ],
               [
                  "<25>{#p/asriel2}{#f/13}* You know, they say the third time's the charm...",
                  '<25>{#f/16}* Too bad he only ever gets one.'
               ],
               [
                  "<25>{#p/asriel2}{#f/6}* That's four times you've killed him now.",
                  "<25>{#f/8}* I'm starting to think you enjoy this..."
               ],
               [ '<25>{#p/asriel2}{#f/15}* Again...?' ]
            ][Math.min(SAVE.flag.n.ga_asriel29++, 4)],
         asriel30: () => [
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#f/1}* Howdy, Asriel.',
            '<25>{#f/2}* ...',
            '<25>{#f/3}* We need to talk.',
            ...[
               [
                  '<25>{#p/asriel2}{#f/6}* Talk?\n* About what?',
                  '<25>{#f/6}* Why are you even here?',
                  "<25>{#f/7}* You know you'll just die to me anyway.",
                  '<25>{#f/8}* Speaking of which... {%15}'
               ],
               [
                  "<25>{#p/asriel2}{#f/8}* Talk?\n* Don't waste my time.",
                  "<25>{#f/6}* I KNOW you're just using a hologram.",
                  '<25>{|}{#p/asgore}{#f/5}* How did you- {%}',
                  '<25>{#p/asriel2}{#f/1}* Hush.'
               ]
            ][Math.min(SAVE.flag.n.ga_asriel30x, 1)]
         ],
         asriel30a: [
            '<25>{#p/asriel2}{#f/8}* Seriously?\n* A hologram?',
            '<25>{#f/6}* I knew you were a coward, but this is a whole new level.'
         ],
         asriel30b: [
            '<25>{#p/asgore}{#f/1}* Do you not have anything better to do?',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{|}{#p/asgore}{#f/3}* Look, son, I simply- {%}',
            "<25>{#p/asriel2}{#f/7}* I'm not your son.\n* I haven't BEEN your son for a long time.",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/1}* Alright, Asriel.\n* Do you not see what you are doing to yourself?',
            "<25>{#f/2}* You've become callous.\n* Unforgiving.",
            "<25>{#p/asriel2}{#f/8}* Ugh, don't say it like you actually care about me, dad.",
            '<25>{#p/asgore}{#f/5}* ...',
            '<25>{#p/asriel2}{#f/9}* Oh, sorry...\n* Did I say \"Dad?\"\n* I meant \"Asgore.\"',
            '<25>{#f/1}* Forgive me.',
            '<25>{#p/asgore}{#f/3}* ...\n* Really now...',
            '<25>{#f/5}* You must reconsider what you are doing, not for our sakes...',
            '<25>{#f/6}* But for yours!',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{#p/asriel2}{#f/7}* ... give me a break.',
            "<26>{#f/6}* It's OBVIOUS you're\n  just here to wind me up.",
            '<25>{#p/asgore}{#f/3}* ...',
            '<25>{#p/asriel2}{#f/6}* ...',
            '<25>{#p/asgore}{#f/7}* You must consider the gravity of your choices!',
            "<25>{#p/asriel2}{#f/15}* Or what? I'll float off into space, never to be seen again?",
            "<25>{#f/16}* Come on $(name), we're done here."
         ],
         asriel30c: [ '<25>{*}{#p/asgore}{#f/8}* Asriel, please!\n* I only want to help!{^999}' ],
         asriel30d: () =>
            [
               [ '<25>{#p/asriel2}{#f/3}* Ready yourself, $(name).', "<26>{#f/4}* This is Undyne's domain." ],
               [ '<25>{#p/asriel2}{#f/4}* Take us in.' ]
            ][Math.min(SAVE.flag.n.ga_asriel30d++, 1)],
         papyrusSolo1a: [
            '<18>{#p/papyrus}{#f/31}SANS?\nIS THAT A HUMAN?',
            "<18>{#f/5}IT IS, ISN'T IT?",
            '<18>{#f/32}NYEH...\nUNDYNE WILL FINALLY...',
            "<18>{#p/papyrus}{#f/31}I'LL GET TO JOIN THE ROYAL GUARD...",
            "<18>{#f/5}DOESN'T THAT MAKE YOU HAPPY?",
            "<25>{#p/asriel2}{#f/3}* You can't keep pretending, Papyrus.\n* He's gone.",
            '<18>{|}{#p/papyrus}{#f/5}BUT- {%}',
            "<25>{#p/asriel2}{#f/3}* It's over.\n* You're wasting your time on him.", 
            "<18>{#p/papyrus}{#f/6}BUT IT CAN'T BE...\nSANS, HE...",
            '<18>{#f/31}HE PROMISED...',
            "<25>{#p/asriel2}{#f/8}* That bonehead is the LAST person I'd trust to keep a promise.",
            "<26>{#f/9}* Not that I'm any better.", 
            '<18>{#p/papyrus}{#f/31}...',
            "<18>{#f/3}I'M SORRY.\nI HAVE TO GO..."
         ],
         papyrusSolo2a: [
            '<18>{#p/papyrus}{#f/31}WELL, I JUST GOT BACK FROM UNDYNE...',
            '<18>{#f/31}SHE TELLS ME THE KING HAS AN OFFER FOR YOU.',
            '<25>{#p/asriel2}{#f/6}* ...',
            '<18>{#p/papyrus}{#f/3}HIS EXACT WORDS WERE \"I WANT TO SEE MY SON.\"',
            '<18>{#f/7}...',
            
            "<18>{#f/7}I CAN'T BELIEVE THE PRINCE KILLED MY BROTHER!",
            '<25>{|}{#p/asriel2}{#f/8}* Actually, it was you we were trying to- {%}',
            '<18>{#p/papyrus}{#f/7}ENOUGH!!',
            '<18>{#f/7}YOU BETRAYED YOUR OWN SOCIETY!\nYOUR OWN PEOPLE!',
            '<18>{#f/7}AND FOR WHAT!?',
            '<18>{#f/7}A PETTY ATTEMPT AT SELF-AMUSEMENT?',
            "<25>{#p/asriel2}{#f/16}* Yes, Papyrus.\n* That's exactly what this is for.",
            '<18>{#p/papyrus}{#f/7}... UGH!!',
            '<18>{#p/papyrus}{#f/4}AS FOR YOU, HUMAN...',
            "<18>{#f/7}DON'T THINK I CAN'T SEE WHAT'S GOING ON.",
            "<18>{#f/7}IT'S OBVIOUS YOU'RE THE ONE CALLING THE SHOTS!",
            '<25>{#p/asriel2}{#f/8}* How observant.',
            '<25>{#f/7}* Guess we should just admit defeat to you here and now, huh?',
            '<18>{#p/papyrus}{#f/31}...',
            '<25>{#p/asriel2}{#f/4}* Let me be clear.\n* I do admire the effort.',
            "<25>{#f/3}* But we've got our own plans to see to.",
            "<18>{#p/papyrus}{#f/4}JUST SO YOU KNOW, UNDYNE'S PROBABLY WATCHING US.",
            '<25>{#p/asriel2}{#f/3}* And your point is?',
            "<25>{#f/4}* ... look Papyrus, it doesn't matter what you or anyone else does.",
            '<25>{#f/1}* When the two of us are together, NOTHING can bring us apart.',
            '<18>{#p/papyrus}{#f/7}WHATEVER!!!'
         ],
         papyrusSolo3: [ '<25>{#p/asriel2}{#f/3}* Howdy.' ],
         papyrusSolo3a: () => [
            '<18>{#p/papyrus}{#f/31}YOU KNOW...',
            '<18>{#f/31}I OVERHEARD DR. ALPHYS TALKING...',
            '<18>{#f/5}AND SHE MENTIONED SOMETHING LIKE \"TURN BACK TIME?\"',
            "<18>{|}{#f/32}{#x1}I CAN'T BE SURE, BUT IT SOUNDS LIKE- {%}",
            '<25>{#p/asriel2}{#f/6}* No.',
            '<18>{|}{#p/papyrus}{#f/6}BUT SHE SAID YOU MIGHT BE ABLE TO- {%}',
            ...(SAVE.flag.n.genocide_milestone < 5
               ? [ '<25>{#p/asriel2}{#f/6}* No.' ]
               : SAVE.flag.n.genocide_milestone < 6
               ? [ "<25>{#p/asriel2}{#f/6}* No.\n* Though, I'm sure she'd love it if I did." ]
               : [ "<25>{#p/asriel2}{#f/6}* No.\n* And she'll be dead in the end, anyway." ]),
            '<18>{#p/papyrus}{#f/31}BUT, IF YOU REALLY CAN ERASE WHAT HAPPENED...',
            '<18>{#f/5}THEN WHY NOT?',
            "<18>{#f/31}A-AND, IN THE NEXT TIMELINE... I'LL TAKE HIS PLACE.",
            "<18>{#f/3}THEN HE WOULDN'T HAVE TO DIE, RIGHT?",
            "<25>{#p/asriel2}{#f/6}* ...\n* Trust me, I've already seen that timeline.",
            "<25>{#f/7}* It's BORING.",
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/6}BUT WHAT IF I SHOW YOU THIS PUZZLE?',
            '<18>{#f/32}IT MIGHT HELP TO ALLEVIATE YOUR BOREDOM...',
            '<25>{#p/asriel2}{#f/15}* ...',
            '<25>{#p/asriel2}{#f/15}* If it makes you feel better, I guess.',
            '<18>{#p/papyrus}OH... OH!',
            "<18>{#f/0}THAT'S GREAT!!",
            "<18>{#f/0}YOU'RE ALREADY CHANGING YOUR MIND!!",
            '<25>{#p/asriel2}{#f/8}* ...',
            '<18>{#p/papyrus}{#f/6}...',
            '<18>{|}{#f/5}WELL, HERE ARE THE RULES OF THE- {%}',
            '<25>{#p/asriel2}{#f/7}* We already know the rules, idiot.',
            '<18>{#p/papyrus}{#f/31}... OH...',
            '<18>{#f/6}UH, WELL THEN!!\nWITHOUT FURTHER ADO...',
            "<18>{#f/9}LET'S FIND OUT WHAT OUR RANDOM NUMBER WILL BE!!"
         ],
         papyrusSolo4a: [
            '<18>{#p/papyrus}{#f/3}ASRIEL.',
            '<25>{#p/asriel2}{#f/6}* Papyrus.',
            '<18>{#p/papyrus}{#f/31}...',
            '<18>{#f/31}WHY?',
            '<18>{#f/31}WHY WOULD YOU DO THIS?',
            "<18>{#f/3}MONSTERS AREN'T SUPPOSED TO BE LIKE THIS...",
            "<18>{#f/5}WHERE'S YOUR LOVE?\nYOUR COMPASSION?",
            '<18>{#f/31}YOUR... MERCY...',
            '<25>{#p/asriel2}{#f/2}* ...\n* Oh, you sweet stellar star child...',
            '<25>{#f/1}* I lost those things a LONG time ago.',
            "<18>{#p/papyrus}{#f/31}BUT...\nI DON'T GET IT...",
            '<18>{#f/5}HOW CAN A MONSTER SO PURE OF MIND...',
            '<18>{#f/31}... BE TURNED SO COMPLETELY TO THE DARK SIDE?',
            '<25>{#p/asriel2}{#f/1}* You really wanna know?',
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/3}YES...',
            '<25>{#p/asriel2}{#f/10}* But do you really, really wanna know?',
            '<18>{#p/papyrus}{#f/31}YES.',
            '<25>{#p/asriel2}{#f/3}* Say it louder.',
            '<18>{#p/papyrus}{#f/5}YES!',
            '<26>{#p/asriel2}{#f/1}* With an exoberry on top.',
            '<18>{#p/papyrus}{#f/7}YES!\nWITH AN EXOBERRY ON TOP, DAMN IT!',
            '<25>{#p/asriel2}{#f/1}* Hee hee hee...',
            "<25>{#f/1}* Alright, I'll tell you.",
            "<25>{#f/15}* In fact, it'll only take one word...",
            '<18>{#p/papyrus}{#f/4}OH MY GOD, JUST SAY IT ALREADY...'
         ],
         papyrusSolo4b: [
            '<25>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* $(name).{%100}',
            '<18>{#p/papyrus}{#f/32}...!',
            '<25>{#p/asriel2}{#f/5}* Hah!\n* Hahaha!\n* The look on your face!'
         ],
         papyrusSolo4c: [ '<18>{#p/papyrus}{#f/31}I...', '<18>{#f/3}... NO...' ],
         papyrusSolo4d: [
            "<18>{#p/papyrus}{#f/7}NO, YOU'RE WRONG.",
            "<18>{#f/7}YOU ARE THE ONE WHO'S BEEN TRYING TO BRING ME DOWN.",
            "<18>{#f/7}YOU ARE THE ONE WHO'S FED ME LIE AFTER LIE.",
            '<18>{#f/9}BUT I, PAPYRUS...',
            '<18>{#f/9}FINALLY UNDERSTAND THE {@fill=#f00}REAL TRUTH{@fill=#fff}.',
            "<25>{#p/asriel2}{#f/13}* Oh?\n* And what's that?"
         ],
         papyrusSolo4e: [ "<18>{#p/papyrus}{#f/34}YOU'RE NOT {@fill=#f00}ASRIEL{@fill=#fff}." ],
         papyrusSolo4f: [
            '<18>{#f/31}{@fill=#f00}ASRIEL{@fill=#fff} WOULD NEVER ACT LIKE THIS.',
            '<18>{#f/5}{@fill=#f00}ASRIEL{@fill=#fff} WAS A KIND SOUL.',
            '<18>{#f/5}{@fill=#f00}ASRIEL{@fill=#fff} BELIEVED IN PEOPLE...',
            '<18>{#f/31}HE BELIEVED IN HUMANITY BEFORE ANYONE ELSE DID.',
            '<18>{#f/4}YOU, ON THE OTHER HAND...',
            '<18>{#f/7}YOU JUST WANT TO USE THEM FOR YOUR OWN ENDS!',
            "<18>{#f/4}AND FRANKLY, I DON'T CARE WHAT YOU HAVE TO SAY.",
            '<18>{#f/9}I STILL HAVE HOPE FOR THAT HUMAN.',
            "<25>{#p/asriel2}{#f/8}* Well, if you've got so much faith in them...",
            '<25>{#f/7}* Then prove me wrong.',
            "<25>{#f/3}* I'll let you take them on, one on one.",
            "<25>{#f/3}* If they spare you, then I'll admit I was wrong.",
            '<25>{#f/4}* But if they kill you, which they inevitably will...',
            "<25>{#f/1}* You'll realize that I was right, and that HE died for nothing.",
            '<25>{#f/1}* How does that sound?',
            '<18>{#p/papyrus}{#f/9}...\nI ACCEPT.',
            '<25>{#p/asriel2}{#f/3}* Splendid.',
            '<25>{#f/4}* See you never.'
         ]
      },
      houz: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (You place your hands on the heavily scratched door.)' ]
            : [ '<32>{#p/basic}* The door is covered in cat- claw scratches.' ],
      gonezo: () =>
         world.bulrun ? [ '<32>{#p/basic}* ... but everybody ran.' ] : [ '<32>{#p/basic}* ... but nobody came.' ],
      garbanzo: [ '<32>{#p/human}* (But there was nobody around to occupy the seat.)' ],
      doggonopoggo: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (But there was nobody here.)' ]
            : (game.room === 's_doggo' && SAVE.data.n.state_starton_doggo === 2) || // NO-TRANSLATE

              (game.room === 's_dogs' && SAVE.data.n.state_starton_dogs === 2) || // NO-TRANSLATE

              (game.room === 's_pacing' && SAVE.data.n.state_starton_lesserdog === 2) // NO-TRANSLATE

            ? [ '<32>{#p/basic}* ... but nobody came.' ]
            : [ "<32>{#p/basic}* Nobody's home." ],
      housebloc: () =>
         SAVE.data.b.svr ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ] : [ "<32>{#p/basic}* It's locked." ],
      innkeep1a: pager.create(
         0,
         () => [
            "<32>{#p/basic}{#npc/a}* Welcome to Starred Inn!\n* Starton's premier hotel!",
            '<32>* One night will cost you 60G.',
            choicer.create('* (Get a room?)', 'Yes', 'No')
         ],
         () => [
            '<32>{#p/basic}{#npc/a}* Changed your mind?',
            '<32>* Remember, one night is 60G.',
            choicer.create('* (Get a room?)', 'Yes', 'No')
         ]
      ),
      innkeep1b: pager.create(
         0,
         () => [
            '<32>{#p/basic}{#npc/a}* Back again?\n* Remember, one night is 60G.',
            choicer.create('* (Get a room again?)', 'Yes', 'No')
         ],
         () => [ '<32>{#p/basic}{#npc/a}* Changed your mind?', choicer.create('* (Get a room again?)', 'Yes', 'No') ]
      ),
      innkeep1c: pager.create(
         0,
         () => [
            '<33>{#p/basic}{#npc/a}* Back again?\n* Well, stay as long as you like!',
            choicer.create('* (Get a room again?)', 'Yes', 'No')
         ],
         () => [ '<32>{#p/basic}{#npc/a}* Changed your mind?', choicer.create('* (Get a room again?)', 'Yes', 'No') ]
      ),
      innkeep2a: [
         "<32>{#p/basic}{#npc/a}* ... you don't even have 60G?",
         "<32>* Oh! You poor thing.\n* I can only imagine what you've been through.",
         '<32>* One of the rooms upstairs is empty, you can sleep there for free, okay?'
      ],
      innkeep2b: [ "<32>{#p/basic}{#npc/a}* Here's your room key.\n* Remember to bundle up!" ],
      innkeep2c: [ "<32>{#p/basic}{#npc/a}* Sorry, you don't have enough G..." ],
      innkeep3a: [ '<32>{#p/basic}{#npc/a}* Hiya!\n* You look like you had a great sleep.' ],
      innkeep3b: [ '<32>* Which is incredible...\n* ... considering you were only up there for a few minutes.' ],
      innkeep3c: [ '<32>* Feel free to come back if you get tired.' ],
      innkeep3d: [ "<32>* Here's your money back.\n* You can pay me if you're going to stay overnight." ],
      innkeep4: [ "<32>{#p/basic}{#npc/a}* Not in a sleepy mood?\n* Well, I'll always be here if you need me!" ],
      innkeep5: [
         '<32>{#p/basic}{#npc/a}* Hello!\n* Sorry, no time for a nap...',
         '<32>* Starred Inn is shutting down so we can leave to find a new homeworld.'
      ],
      innkeep6: [
         "<32>{#p/basic}{#npc/a}* Oh, there you are.\n* I've been worrying about you!",
         '<32>* Things are going to be OK, you hear?',
         "<32>* We're all going to settle on a new homeworld soon...",
         "<32>* There's bound to be a place you can stay there!"
      ],
      kidd1: pager.create(
         2,
         [ "<25>{#p/kidd}{#f/1}* What's up?" ],
         [ '<25>{#p/kidd}{#f/1}* Yo, howzzitgoin?' ],
         [ '<25>{#p/kidd}{#f/1}* Hey, hey!' ],
         [ '<25>{#p/kidd}{#f/1}* Nice to see you, haha.' ],
         [ "<25>{#p/kidd}{#f/1}* Woah, dude, what's up?" ]
      ),
      kidd2: pager.create(
         0,
         () =>
            game.room === 's_town1' // NO-TRANSLATE

               ? [
                    "<25>{#p/kidd}{#f/1}* Yo, you're a kid too, right?",
                    "<25>{#p/kidd}{#f/1}* I can tell 'cause you're wearing a striped shirt."
                 ]
               : [
                    '<25>{#p/kidd}{#f/7}* Wait, you read books too!?',
                    '<25>{#p/kidd}{#f/1}* That librarby taught me everything I know about monster history!',
                    "<25>{#p/kidd}{#f/3}* I can't even imagine what living on a planet is like..."
                 ],
         () =>
            game.room === 's_town1' // NO-TRANSLATE

               ? [ '<25>{#p/kidd}{#f/1}* I wonder if that short skeleton is an adult or a kid.' ]
               : [ '<25>{#p/kidd}{#f/3}* Have you ever lived on a planet?' ]
      ),
      marriage1: [
         "<32>{#p/basic}* What's that smell?\n* (Where's that smell?)",
         "<32>* If you're a smell...\n* (... identify yoursmellf!)"
      ],
      marriage2: [
         "<32>{#p/basic}* Hmmm...\n* Here's that weird smell.",
         '<32>* It makes me want to eliminate...',
         '<32>* (... eliminate YOU!)'
      ],
      marriage3a: [
         '<32>{#p/basic}* Dogs can pet other dogs???\n* (A new world has opened up for us...)',
         '<32>* Thanks, weird puppy!'
      ],
      marriage3b: [
         '<32>{#p/basic}* Weird smells can bring good things...\n* (Friendly fun fetch!)',
         '<32>* Thanks, weird smell!\n* (It sure was fun to catch a \"wrench\" in the works!)'
      ],
      marriage3c: [
         "<32>{#p/basic}* It's getting harder and harder to sniff things...\n* (Getting harder to see...)",
         "<32>* Let's get out of here!"
      ],
      marriage3d: [
         '<32>{#p/basic}* That weird puppy came out of nowhere...\n* (Almost killed us...)',
         "<32>* Let's get out of here!"
      ],
      marriage3e: [
         "<32>{#p/basic}* Dogs can pet AND play fetch with other dogs???\n* (It's almost criminal...)",
         '<32>* Thanks, weird puppy!\n* (After this, our lives will never be the same!)'
      ],
      marriage4: [
         "<32>{#p/basic}* Where's the prince?\n* (Did we come the right way?)",
         '<32>* We must stop that menace...\n* (... and his human companion!)'
      ],
      marriage5: [ '<32>{#p/basic}* Hmmm...\n* Here they are...', "<32>* (Let's capture them!)" ],
      maze1: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}{#f/0}* welcome back.',
                 "<25>{#p/sans}{#f/3}* it's a shame papyrus can't be here, because...",
                 "<25>{#p/sans}{#f/2}* he's been working very hard on this puzzle for a long time.",
                 "<25>{#p/sans}{#f/0}* but that's alright.",
                 "<25>{#p/sans}{#f/0}* i promised him earlier that i'd show it to you, so here goes."
              ]
            : [
                 '<18>{#p/papyrus}OHO, THE HUMAN ARRIVES!',
                 '<18>MY BROTHER AND I HAVE CREATED MANY PUZZLES.',
                 '<18>{#f/9}ARE YOU UP FOR THE CHALLENGE, HUMAN!?',
                 choicer.create('* (What do you say?)', 'Yes', 'No'),
                 '<18>{#p/papyrus}CORRECT ANSWER!\nFOR YOU SEE...'
              ],
      maze2a: [
         '<18>{#x4}{#f/9}NO CRAFTSMAN HAS EVER MADE TRAPS AS FINE AS ME!',
         "<18>{#f/0}THEY'RE PRACTICALLY IRRESISTIBLE!",
         "<25>{#x1}{#p/sans}{#f/2}* maybe you're the one who's irresistible.",
         '<18>{#p/papyrus}{#f/1}REALLY!?'
      ],
      maze2b: [
         '<18>{#x4}{#f/9}NO HUMAN HAS EVER BESTED A PUZZLE BY THE GREAT PAPYRUS!',
         '<25>{#x1}{#p/sans}{#f/4}* no human has even had the chance to, bro.',
         "<18>{#p/papyrus}{#x3}{#f/7}UGH, THAT'S BESIDES THE POINT!!"
      ],
      maze3: [ '<18>{#x1}{#f/0}ANYWAY, THIS HERE IS WHAT I LIKE TO CALL...' ],
      maze3a: [
         '<18>\"THE WALL OF FIRE!!\"',
         '<25>{#p/sans}* couldn\'t you just call it \"the firewall?\"\n* it\'d save time.',
         "<18>{#p/papyrus}{#f/4}DR. ALPHYS WOULD THINK I'M MIS- USING THE TERM.",
         "<25>{#p/sans}* i dunno bro, she's really into that kinda stuff. in fact...",
         "<30>{#f/2}* i bet she'd find it {@fill=#ff0}hot{@fill=#fff}."
      ],
      maze4: [ '<18>{#p/papyrus}{#x3}{#f/7}NOT NOW, SANS!!' ],
      maze5: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}{#f/0}* it\'s called \"the firewall.\"',
                 "<25>{#p/sans}{#f/2}* y'know.\n* like the firewall on a computer.",
                 '<25>{#p/sans}* the idea behind this one is to get to the other side.',
                 '<25>{#p/sans}* simple, right?',
                 "<25>{#p/sans}{#f/3}* though, i've tested this puzzle myself, and i gotta say...",
                 "<25>{#p/sans}{#f/2}* it's not as easy as it looks."
              ]
            : [
                 '<18>{#p/papyrus}... ANYWAY, THE IDEA BEHIND THIS PUZZLE IS SIMPLE.',
                 '<18>BECAUSE ALL YOU HAVE TO DO...',
                 '<18>{#f/9}IS MAKE IT TO THE OTHER SIDE!!',
                 '<18>{#f/0}GOOD LUCK!!\nNYEH HEH HEH!!'
              ],
      maze6: pager.create(
         0,
         () =>
            world.edgy
               ? [
                    '<25>{#p/sans}{#f/0}* what are you going back there for, huh?',
                    '<25>{#p/sans}{#f/3}* come on.\n* at least try to be a good sport.'
                 ]
               : [ "<18>{#p/papyrus}{#x2}{#f/7}WHERE DO YOU THINK YOU'RE GOING!?" ],
         () => (world.edgy ? [ '<25>{#p/sans}{#f/0}* seriously?' ] : [ '<18>{#p/papyrus}{#x2}{#f/7}GET BACK HERE!!' ])
      ),
      maze7: [
         [
            '<18>{#p/papyrus}ARE YOU AFRAID OF THE FLAMES??',
            "<18>{#f/4}DON'T WORRY, THEY CAN'T ACTUALLY\nHARM YOU.",
            '<18>{#f/0}AS SANS WOULD SAY, THEY\'RE JUST \"PLEASANTLY WARM.\"',
            '<25>{#p/sans}* actually, i picked that saying up from a friend.',
            '<18>{#p/papyrus}{#f/4}... OH.'
         ],
         [
            '<18>{#p/papyrus}ARE YOU ANXIOUS ABOUT FAILING THE PUZZLE??',
            "<18>IF THAT'S THE CASE, THEN YOU MUST KNOW...",
            '<18>{#x4}{#f/9}I, THE GREAT PAPYRUS, WOULD NOT JUDGE YOU FOR IT!',
            '<18>{#f/0}AS EVERY STAR CHEF KNOWS, THE THOUGHT IS WHAT COUNTS.',
            '<18>{#x1}SO GO ON, DO TRY YOUR BEST!'
         ],
         [
            '<18>{#p/papyrus}{#f/4}(SANS, WHAT IS THE HUMAN DOING??)',
            '<25>{#p/sans}* they could just be studying the pattern.',
            '<18>{#p/papyrus}{#f/4}(OH, TRUE.)',
            '<18>{#f/9}IN THAT CASE, PROCEED WHEN READY!'
         ]
      ],
      maze8: () =>
         world.edgy
            ? [ '<25>{#p/sans}{#f/0}* whoops.\n* nice try, though.' ]
            : [
                 '<18>{#p/papyrus}NYEH HEH HEH!\nWELL THEN.',
                 "<18>{#f/9}IT SEEMS YOU'VE BEEN JAPED BY THE GREAT PAPYRUS!",
                 '<18>{#f/0}BUT FRET NOT!',
                 '<18>FOR YOU SEE, MY TRAPS ARE NO SLOUCH.',
                 "<18>{#f/9}YOU CAN'T BE BLAMED FOR FAILING ONE SO EASILY!!"
              ],
      maze9: () =>
         world.edgy
            ? [ "<25>{#p/sans}{#f/0}* huh.\n* guess you're smarter than you look." ]
            : [
                 '<18>{#p/papyrus}{#f/1}WHAT!?',
                 '<18>{#f/7}HOW DID YOU MANAGE TO DO THAT!?!?',
                 '<18>THAT WAS SUPPOSED TO BE TOTALLY IMPOSSIBLE!',
                 '<18>{#f/9}... WELL THEN!\nI SHALL HAVE TO STEP UP MY GAME!'
              ],
      maze10: () =>
         world.edgy
            ? [
                 "<25>{#p/sans}{#f/0}* well, that's it.",
                 '<25>{#p/sans}{#f/3}* ... thanks for playing along, at least.',
                 "<25>{#p/sans}{#f/0}* in the meantime, i've got another puzzle to set up.",
                 "<25>{#p/sans}{#f/2}* we'll be seeing each other again."
              ]
            : [
                 '<18>{#f/4}IN ANY CASE...',
                 '<18>{#f/0}I AM EXCITED FOR WHAT COMES NEXT!',
                 '<18>{#f/4}A PUZZLE SO CONFOUNDING...',
                 "<18>{#f/1}EVEN TERRESTRIA HERSELF COULDN'T SOLVE IT!!!",
                 "<25>{#p/sans}* terrestria?\n* isn't she literally the oldest monster alive?",
                 '<18>{|}{#p/papyrus}{#f/1}UH...\nWELL YES, BUT- {%}',
                 "<25>{#p/sans}* dang, i didn't know you thought THAT highly of me.",
                 '<18>{#p/papyrus}{#f/4}WHAT.',
                 "<25>{|}{#p/sans}* like, if even SHE can't do it, then- {%}",
                 '<18>{#p/papyrus}{#f/7}{#x3}I GET THE POINT!!'
              ],
      maze11: [ '<18>{#p/papyrus}{#f/7}SANS, WE HAVE PUZZLES TO PREPARE!!', '<18>COME ON!' ],

      nicecreamSc1: [
         "<32>{#p/basic}* I don't understand why these aren't selling...",
         "<32>* It's the perfect place for something nice..."
      ],
      nicecreamSc2: () => [
         SAVE.data.n.plot > 20.2
            ? '<32>{#p/basic}* OH!!!!\n* ... you came back!'
            : SAVE.data.b.s_state_scorereaction1 || SAVE.data.n.plot === 20.2
            ? "<32>{#p/basic}* WAIT!!!!\n* Maybe YOU'D like something!"
            : '<32>{#p/basic}* OH!!!!\n* A CUSTOMER!!',
         '<32>* Hello!\n* Would you like an Ice Dream?',
         SAVE.data.b.s_state_million
            ? '<32>* As the top scorer here, you get a handy discount!\n* 6G per Ice Dream!'
            : "<32>* It's the frozen treat that'll set your mind ablaze!\n* Now just 12G."
      ],
      nicecreamSc3: () => [
         "<32>{#p/basic}* Ice Dreams!\n* They're the frozen treats that'll set your mind ablaze!",
         SAVE.data.b.s_state_million ? '<32>* For you, 6G!' : '<32>* Now just 12G.'
      ],
      nicecreamPrompt1: () => [ choicer.create('* (Buy the Ice Dream for $(x)G?)', 'Yes', 'No') ],
      nicecreamPrompt2: () => [ choicer.create('* (Get an Ice Dream?)', 'Yes', 'No') ],
      nicecreamSc4: [
         '<32>{#p/basic}* Well then...\n* Tell your friends...',
         "<32>* There's ice cream out here...\n* In the middle of nowhere..."
      ],
      nicecreamFc1: [ '<32>{#p/basic}* I relocated my stand, but there are still no customers...' ],
      nicecreamFc2: [
         "<32>{#p/basic}* Fortunately, I've thought of a solution!!",
         '<32>* Postcards!',
         '<32>* Every time you buy an Ice Dream, you can take a postcard from the box.',
         '<32>* If you have three postcards, you can trade them for a free Ice Dream!',
         "<32>* They're sure to get the customers to come back!",
         '<32>* Oh, um, would you like an Ice Dream?',
         "<32>* It's the frozen treat that'll set your mind ablaze!\n* Now just 10G."
      ],
      nicecreamFc3a: [
         "<32>{#p/basic}* Ice Dreams!\n* They're the frozen treats that'll set your mind ablaze!",
         "<32>* You've got three postcards, would you like to redeem them?"
      ],
      nicecreamFc3b: [
         "<32>{#p/basic}* Ice Dreams!\n* They're the frozen treats that'll set your mind ablaze!",
         '<32>* Now just 10G.'
      ],
      nicecreamFc4: [
         '<32>{#p/basic}* Well then...\n* Tell your friends...',
         '<32>* Four Ice Dreams for the price of three...'
      ],
      nicecreamFc5: [ "<32>{#p/basic}* Don't forget to take a postcard from the box!" ],
      nicecreamNoFun1: [ "<32>{#p/basic}* Huh?\n* You don't have enough room in your pockets..." ],
      nicecreamNoFun2: [ '<32>{#p/basic}* I wish I could make Ice Dreams easier to store...' ],
      nicecreamNoMun1: [ "<32>{#p/basic}* Huh?\n* You don't have enough money..." ],
      nicecreamNoMun2: [ '<32>{#p/basic}* I wish I could make Ice Dreams for free...' ],
      nicecreamFree1: [ '<32>{#p/basic}* Tell you what, have your first one on me.' ],
      nicecreamFree2: [ '<32>{#p/basic}* Enjoy...' ],
      nicecreamReturnWithGoods: [ '<32>{#p/basic}* Well, you can always come back later.' ],
      nicecreamReturnWithNeeds: [ "<32>{#p/basic}* Oh, that's okay.", '<32>* Come again soon, kid!' ],
      nicecreamPurchase: [ '<32>{#p/basic}* Here you go!\n* Have a stellar starry night!' ],
      nicecreamGet: [ '<32>{#s/equip}{#p/human}* (You got the Ice Dream.)' ],
      nicecreamK1a: [ '<25>{#p/kidd}{#f/1}* Yo, can I get an Ice Dream?' ],
      nicecreamK1b: [ "<32>{#p/basic}* Sure, kid.\n* If you've got the money." ],
      nicecreamK1c: [ '<25>{#p/kidd}{#f/2}* (Psst, give them this.)' ],
      nicecreamK1d: [
         '<25>{#p/kidd}{#f/7}* Yo, they got free Ice Dreams here!?',
         '<25>{#p/kidd}{#f/1}* Get me one too!'
      ],
      nicecreamK2: [ '<32>{#p/basic}* W... where did you get that?' ],
      nicecreamK3a: [ '<32>* S-sure, kid... here you go!' ],
      nicecreamK3b: [
         '<32>{#s/equip}{#p/human}* (You hand the Ice Dream to Monster Kid.)',
         '<25>{#p/kidd}{#f/7}* AWESOME...'
      ],
      nicecreamE: pager.create(
         0,
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* Sold out again, I'm afraid!\n* The thought of freedom has drawn in many customers!",
                    ...(world.population_area('s') < 6 || world.population_area('f') < 6 || world.population < 2 // NO-TRANSLATE

                       ? [
                            "<32>* Not that I'd sell to you if I wasn't sold out...",
                            '<32>* If I sold Ice Dreams to a bully, my reputation would be in ruins!'
                         ]
                       : [
                            "<32>* With the recent success, I've been reflecting on my past, and remembering my father.",
                            "<32>* If he hadn't invented Ice Dreams, I'd still be selling cheap balloons."
                         ])
                 ]
               : [
                    "<32>{#p/basic}* Hey, kid!\n* I'd offer you an Ice Dream, but I'm all sold out!",
                    '<32>* Business is booming here like nothing ever been!',
                    "<32>* My supply just can't keep up!"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? world.population_area('s') < 6 || world.population_area('f') < 6 || world.population < 2 // NO-TRANSLATE

                  ? [ '<32>{#p/basic}* Nothing personal, of course.' ]
                  : [
                       '<32>{#p/basic}* Apparently, he sold his first Ice Dream in the middle of the Starton holo-forest.'
                    ]
               : [ '<32>{#p/basic}* Maybe it\'s time to start that \"Ice Dream\" chain I\'ve always dreamed of...' ]
      ),
      faunX: () =>
         [
            [ '<32>{#p/basic}{#npc/a}* I can tell you have absolutely no respect for life.\n* Good going, champ.' ],
            [ '<32>{#p/basic}{#npc/a}* Keep it up, champ.\n* See where it gets you.' ],
            [ '<32>{#p/basic}{#npc/a}* Really, champ?' ]
         ][Math.min(roomKills().s_greater++, 2)],
      snowdrakeX: [
         '<32>{#p/basic}{#npc/a}* Guh?\n* Did you just...',
         "<32>{#p/basic}{#npc/a}* ...\n* That's, uh, not very cool."
      ],
      moonrocksX1: [ '<32>{#p/basic}{#npc/a}* What the-\n* What was THAT for?' ],
      moonrocksX2: [ '<32>{#p/basic}{#npc/b}* For real, though~\n* How did THAT happen?' ],
      npcinter: {
         s_snowdrake: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* Hey.\n* You're pretty cool.",
                       '<32>* Just remember, if you get in a fight with someone, god or otherwise...',
                       "<32>* Remember to hold [X] to move twice as slowly.\n* That's very important."
                    ]
                  : roomKills().s_doggo > 0
                  ? [ "<32>{#p/basic}{#npc/a}* Get away from me, man!\n* I don't like you." ]
                  : SAVE.data.n.plot < 19
                  ? [
                       "<32>{#p/basic}{#npc/a}* I heard if you hold [X] in battle, you'll move twice as slow as normal!",
                       '<32>* I know... lame, right?',
                       "<32>* But I'll tell you a secret.\n* That dog over there... won't expect you to move slowly.",
                       '<32>* If you sneak up on him while holding [X], you might just get by undetected!',
                       '<32>* Guh huh huh... good luck.'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* So you came back to talk, huh?',
                       "<32>* That's cool.",
                       '<32>* Not as cool as me, but still pretty cool anyway.'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Very important.' ]
                  : roomKills().s_doggo > 0
                  ? [ "<32>{#p/basic}{#npc/a}* Didn't you hear me?\n* Get away!" ]
                  : SAVE.data.n.plot < 19
                  ? [ "<32>{#p/basic}* You're gonna need it." ]
                  : [ "<32>{#p/basic}* I'm ice cold." ]
         ),
         s_genokid: pager.create(
            0,
            () =>
               world.genocide
                  ? [
                       '<25>{#p/kidd}{#f/3}{#npc/a}* Yo, this kid came up to me and stuck something in my head.',
                       '<25>{#f/3}* Then, he went off to the Foundry so he could \"boost the signal...\"',
                       '<25>{#f/4}* ... kids can be so weird sometimes.'
                    ]
                  : [
                       '<25>{#p/kidd}{#f/3}{#npc/a}* Yo, everyone ran away and hid somewhere.',
                       '<25>{#f/3}* Man, adults can be so dumb sometimes, haha...',
                       "<25>{#f/1}* Don't they know we've got Undyne to protect us!?"
                    ],
            () =>
               world.genocide
                  ? [ "<25>{#p/kidd}{#f/7}{#npc/a}* You're cool, though!" ]
                  : [ "<25>{#p/kidd}{#f/1}{#npc/a}* Undyne's got our backs!" ]
         ),
         g_beautifulfish: pager.create(
            0,
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* You've got gumption walking in here after that, kid.",
                       '<32>* We all saw what happened on that TV screen up there.'
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       "<32>{#p/basic}{#npc/a}* It's surprising to see Sans back here after what happened last time.",
                       "<32>* ... actually, perhaps that's not too surprising."
                    ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* In the end, I never caught any \"girls\" on my voice-mail.',
                       '<32>* So kid, take it from me...',
                       "<32>* Don't try to catch fantastic space creatures with just your voice-mail."
                    ]
                  : papreal()
                  ? [
                       '<32>{#p/basic}{#npc/a}* Where the heck is Sans?',
                       '<32>* He told me he had a star chart I could use to find girls...',
                       '<32>* I mean, it was probably some kind of prank, but I wanted to know what the prank was!'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* I put out a call for some \"girls\" today.',
                       '<32>* Someone told me there are infinite possibilities among the stars...',
                       "<32>* Well, I'm taking that seriously.",
                       "<32>* I'm literally going to make out with a space creature."
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Wanna know what I think?',
                       '<32>* ... that robot was the one guy who made me wanna call for boys instead of girls.',
                       "<32>* It's sad to see him go."
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       "<32>{#p/basic}{#npc/a}* You're talking to me like you want the inside scoop.",
                       "<32>{#p/basic}{#npc/a}* Sorry kid.\n* Guess you'll just have to wait for the next news update."
                    ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* Mind you, there was a single missed call...',
                       '<32>* ... from a certain \"ONIONSAN.\"',
                       "<32>* They didn't leave me any voice-mail though."
                    ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Do you know where Sans is?' ]
                  : [
                       '<32>{#p/basic}{#npc/a}* I guess I could ask Undyne.\n* But I think she likes someone else already.'
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Here's hoping another cutie like him comes along..." ]
                  : SAVE.data.n.plot === 33
                  ? [ "<32>{#p/basic}{#npc/a}* Don't tell me you don't have an OuterNet account..." ]
                  : SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* What's an onionsan, anyway?" ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Let me know if you see him...' ]
                  : [ '<32>{#p/basic}{#npc/a}* Can I ever find love out here?' ]
         ),
         g_bigmouth: pager.create(
            0,
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Hmm...',
                       '<32>* I wonder what kind of food robots like.',
                       '<32>* Do they even eat food at all?',
                       "<32>* ... we'll never know, now."
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       '<32>{#p/basic}{#npc/a}* Sans has been a regular here since day one.',
                       ...(papreal()
                          ? [
                               '<32>* He usually orders the worst item off the menu...',
                               '<32>* Except for earlier today...',
                               '<32>* ... when he ordered the SECOND worst item off the menu instead.',
                               "<32>* That's something, right?"
                            ]
                          : [
                               '<32>* He always orders the worst item off the menu, and he never pays his tab.',
                               '<32>* But because he attracts so many other customers...',
                               '<32>* Grillby even gave him special arrangements.',
                               '<32>* ... what\'s a \"yamok\" anyway?'
                            ])
                    ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [
                          '<32>{#p/basic}{#npc/a}* I wonder what a human bully would taste like...',
                          "<32>* Are they tastier when they're meaner?\n* Or vice-versa?"
                       ]
                     : [
                          "<32>{#p/basic}{#npc/a}* As much as I would've liked to try human food...",
                          "<32>* Food from a whole new world... now that's even better."
                       ]
                  : papreal()
                  ? [
                       '<32>{#p/basic}{#npc/a}* Hmmm, this is around the time that Sans comes in.',
                       '<32>* Then, a little bit later, his brother comes in.',
                       '<32>* Yes, his brother.\n* Papyrus.',
                       '<32>* He always used to order milk, but nowadays, he picks a new item every time...',
                       "<32>* That replicator sure is a wonderous thing, isn't it?",
                       "<32>* It's too bad it only produces monster food."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* Hmmm...\n* Isn't human food different from monster food?",
                       '<32>* It does things like \"spoil.\"',
                       '<32>* And while monster food converts to energy instantly...',
                       '<32>* Human food has to pass all the way through their bodies first.',
                       '<32>* Which it somehow does, even on low gravity.',
                       "<32>* How strange.\n* I'd love to try it sometime."
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* How unfortunate.' ]
                  : SAVE.data.n.plot === 33
                  ? papreal()
                     ? world.dead_skeleton
                        ? [
                             "<32>{#p/basic}{#npc/a}* Come to think of it, that's not the only off-putting thing to have happened today..."
                          ]
                        : [ '<32>{#p/basic}{#npc/a}* How strange.' ]
                     : [ "<32>{#p/basic}{#npc/a}* We're blessed to have such a character in our midst." ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [
                          '<32>{#p/basic}{#npc/a}* For all we know, a last-minute redemption could make them the tastiest of all.'
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* For all we know, new world food spoils even faster than food made by humans.'
                       ]
                  : papreal()
                  ? [
                       '<32>{#p/basic}{#npc/a}* I hope he shows up today.\n* Him and his brother are great at making us laugh.'
                    ]
                  : [ '<32>{#p/basic}{#npc/a}* I\'ve also heard they have things called \"bathrooms.\"' ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* How unfortunate.' ]
                  : SAVE.data.n.plot === 33
                  ? papreal()
                     ? [ '<32>{#p/basic}{#npc/a}* How strange.' ]
                     : [ '<32>{#p/basic}{#npc/a}* How delightful.' ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [ '<32>{#p/basic}{#npc/a}* How... unexpected.' ]
                     : [ '<32>{#p/basic}{#npc/a}* How... delicious.' ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Skeletons are cool.' ]
                  : [ '<32>{#p/basic}{#npc/a}* Humans are weird.' ]
         ),
         g_bunbun: pager.create(
            0,
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* M-mettaton was the h-hottest guy around...',
                       '<32>* Without him, the outpost is s-s-so much colder!'
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       '<32>{#p/basic}{#npc/a}* Sansyyyy...\n* Come back and sit with me...!',
                       "<32>* Everything's so f-f-fun when you're around..."
                    ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* I w-wonder if the n-new world h-has h-hot guys...',
                       '<32>* A-and neat d-drinks...',
                       "<32>* Ooooooo, I'm ready!"
                    ]
                  : papreal()
                  ? [
                       "<32>{#p/basic}{#npc/a}* H-hey, isn't Sansy s'posed to come swinging in right about now??",
                       "<32>* C'mon Sansy!\n* You're the life of the party..."
                    ]
                  : world.dead_dog
                  ? [
                       "<32>{#p/basic}{#npc/a}* It's s-s-so quiet in here.",
                       '<32>* Lighten up everybody!\n* ...',
                       "<32>* I'm really starting to loathe this place."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* No matter where I go, it's the same menu, the same people...",
                       "<32>* Help!\n* I want new drinks an' h-h-h-hot guys!!"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* So c-c-cold...' ]
                  : SAVE.data.n.plot === 33
                  ? [ '<32>{#p/basic}{#npc/a}* Sansyyyy...' ]
                  : SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* S-soooooo ready!' ]
                  : papreal() || world.dead_dog
                  ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                  : [ "<32>{#p/basic}{#npc/a}* I guess the bartender's kind of h-h-h-hot..." ]
         ),
         g_dogamy: () =>
            SAVE.data.b.killed_mettaton
               ? [
                    "<32>{#p/basic}{#npc/a}* Everyone's up in arms about Mettaton, but me...?",
                    SAVE.data.n.state_starton_doggo === 2 && SAVE.data.n.state_starton_greatdog === 2
                       ? '<32>{#p/basic}{#npc/a}* I just want to know where the other dogs went.'
                       : SAVE.data.n.state_starton_doggo === 2
                       ? '<32>{#p/basic}{#npc/a}* I still want to know what happened to Doggo.'
                       : SAVE.data.n.state_starton_greatdog === 2
                       ? '<32>{#p/basic}{#npc/a}* I still miss seeing that big lug around here.'
                       : papreal()
                       ? '<32>{#p/basic}{#npc/a}* I still miss having Sans and his brother around.'
                       : '<32>{#p/basic}{#npc/a}* I just wish Sans would come back and give us more of his headpats.'
                 ]
               : SAVE.data.n.plot === 33
               ? [ '<32>{#p/basic}{#npc/a}* Shoot, I was hoping Sans came to give us a pat on the head.' ]
               : SAVE.data.n.plot === 72
               ? world.population < 2
                  ? [
                       "<32>{#p/basic}{#npc/a}* We're free!\n* Maybe now, Sans can finally give us a pat on the head.",
                       "<32>* It's better than worrying about a rogue bully tearing through town."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* We're free!\n* Maybe now, Sans can finally give us a pat on the head.",
                       "<32>* Or maybe our new company's clients will do that for us instead."
                    ]
               : SAVE.data.n.state_starton_doggo === 2 && SAVE.data.n.state_starton_greatdog === 2
               ? [ '<32>{#p/basic}{#npc/a}* Smells kinda... quiet.' ]
               : SAVE.data.n.state_starton_doggo === 2
               ? [ "<32>{#p/basic}{#npc/a}* I can't believe Doggo's gone missing..." ]
               : SAVE.data.n.state_starton_greatdog === 2
               ? [ "<32>{#p/basic}{#npc/a}* Where's that big lug?\n* We can't start until it shows up." ]
               : papreal()
               ? [ "<32>{#p/basic}{#npc/a}* Where's Sans...\n* He's supposed to give me a pat on the head..." ]
               : [
                    '<32>{#p/basic}{#npc/a}* You better watch where you sit down in here, kid.',
                    '<32>* That big lug WILL jump into your lap and give you lots of love and attention.'
                 ],
         g_dogaressa: () =>
            SAVE.data.b.killed_mettaton
               ? [
                    '<32>{#p/basic}{#npc/a}* (My hubby and I just want everyone to calm down.)',
                    "<32>{#p/basic}{#npc/a}* (Mettaton's death was tragic, but he's just a guy on TV!)"
                 ]
               : SAVE.data.n.plot === 33
               ? [ '<32>{#p/basic}{#npc/a}* (I like Sans.)\n* (Sometimes he feeds us scraps of food under the table.)' ]
               : SAVE.data.n.plot === 72
               ? world.population < 2
                  ? [
                       "<32>{#p/basic}{#npc/a}* (Now that we're free, we're planning on starting a marriage counseling company.)",
                       '<32>* (Our first curriculum will be called \"What it means to be in an abusive relationship.\")'
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* (Now that we're free, we're planning on starting a marriage counseling company.)",
                       '<32>* (Our first curriculum will be called \"The do\'s and dont\'s of marrying your mother.\")'
                    ]
               : SAVE.data.n.state_starton_doggo === 2 && SAVE.data.n.state_starton_greatdog === 2
               ? [
                    "<32>{#p/basic}{#npc/a}* (It's lonely in here today.)\n* (If our friends don't show up, would you like to play?)"
                 ]
               : SAVE.data.n.state_starton_doggo === 2
               ? [ "<32>{#p/basic}{#npc/a}* (Where's Doggo?)\n* (I hope he didn't get lost again.)" ]
               : SAVE.data.n.state_starton_greatdog === 2
               ? [ "<32>{#p/basic}{#npc/a}* (Where's Canis Major?)\n* (He was supposed to join us for this game.)" ]
               : papreal()
               ? [ '<32>{#p/basic}{#npc/a}* (Where are those skeletons?)\n* (I wanted to get a bone from them...)' ]
               : [
                    "<32>{#p/basic}{#npc/a}* (We're sentries, but we never get any respect.)",
                    '<32>* (I wish those skeletons would throw us more bones.)',
                    '<32>* (We love bones.)'
                 ],
         g_doggo: () =>
            SAVE.data.b.killed_mettaton
               ? [
                    '<32>{#p/basic}{#npc/a}* Losing Mettaton REALLY stinks, you know that?',
                    '<33>* Of all the guys on the outpost, he moved the most!',
                    "<32>* Without him, the only people on TV will probably be people who DON'T move all the time."
                 ]
               : SAVE.data.n.plot === 33
               ? [
                    '<32>{#p/basic}{#npc/a}* Huh?\n* Since when did you and Sans become friends...?',
                    "<32>* I'm not the biggest fan of that guy...",
                    '<32>* He loves to appear without moving.'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#npc/a}* I've been without cuddles for so long, but finally, someone opened up to me.",
                    '<32>* Ice Wolf is now my Nice Wolf.'
                 ]
               : SAVE.data.n.state_starton_dogs === 2 && SAVE.data.n.state_starton_greatdog === 2
               ? [
                    "<32>{#p/basic}{#npc/a}* Sometimes the others like to prank me. They sit still so I can't see them.",
                    '<32>* They must be here, playing a joke on me.',
                    "<32>* I'll just wait until one of them admits it..."
                 ]
               : SAVE.data.n.state_starton_dogs === 2
               ? [
                    "<32>{#p/basic}{#npc/a}* Where're the other two?\n* I can't play with this big lug alone...",
                    "<32>* It'd be too hard!"
                 ]
               : SAVE.data.n.state_starton_greatdog === 2
               ? [
                    "<32>{#p/basic}{#npc/a}* Where's the big lug?\n* I can't play with these two alone...",
                    "<32>* It'd be too easy!"
                 ]
               : papreal()
               ? [ '<32>{#p/basic}{#npc/a}* Papyrus?\n* Is that you?\n* Come on...' ]
               : [
                    "<32>{#p/basic}{#npc/a}* I'm thinking of letting my hair grow out a little to show off my personality.",
                    '<32>* It makes a statement like \"Give me a big, soft hug and cuddle me, please.\"'
                 ],
         g_grillby: () =>
            SAVE.data.b.killed_mettaton
               ? [
                    '<32>{#p/basic}* ...\n* ...\n* ...',
                    '<32>{#npc/a}* Grillbz said the grand finale was good for business.',
                    "<32>* I'm not sure if he likes that fact, though."
                 ]
               : SAVE.data.n.plot === 33
               ? SAVE.data.b.item_fast_food
                  ? [
                       '<32>{#p/basic}* ...\n* ...\n* ...',
                       '<32>{#npc/a}* Grillbz said he only lets Sans eat for free because he pulls in other customers.',
                       "<32>* I can't exactly disagree..."
                    ]
                  : [
                       '<32>{#p/basic}* ...\n* ...\n* ...',
                       '<32>{#npc/a}* Grillbz suggested taking your food with you before he has to throw it out.'
                    ]
               : SAVE.data.n.plot === 72
               ? world.population < 4
                  ? [ '<32>{#p/basic}* ...\n* ...\n* ... okay.' ]
                  : [ '<32>{#p/basic}* ...\n* ...\n* ... good job.' ]
               : postSIGMA()
               ? [
                    '<32>{#p/basic}* ...\n* ...\n* ...',
                    '<32>{#npc/a}* Grillbz says some of the bar equipment stopped working recently.',
                    "<32>* We'd pay someone to fix it, but since Mettaton cancelled his little show or whatever...",
                    "<32>* We've been seeing less and less profit by the minute."
                 ]
               : world.population < 4
               ? [
                    '<32>{#p/basic}* ...\n* ...\n* ...',
                    '<32>{#npc/a}* Grillbz is real sorry for the lack of other customers.',
                    "<32>* Personally, I think they're just afraid...",
                    '<32>* You know.\n* Of that bully.'
                 ]
               : [
                    '<32>{#p/basic}* ...\n* ...\n* ...',
                    '<32>{#npc/a}* Grillbz said he found his new colors in an e-magazine.',
                    "<32>* Personally, I prefer Grillbz' natural orange color.\n* But that's just me."
                 ],
         g_punkhamster: pager.create(
            0,
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* You really showed that big shot robot who's boss, huh?",
                       "<32>* ... if only he didn't make me feel bad for him."
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       '<32>{#p/basic}{#npc/a}* Sans certainly knows how to make you laugh, huh?',
                       '<32>* Good thing, too.\n* That skeleton practically pays the bills here.'
                    ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          "<32>{#p/basic}{#npc/a}* Y'know, I've taken a liking to your fighting spirit, kid.",
                          "<32>* Now that we're all back in town, it seems we'll become great friends.",
                          "<32>* ... but we're all moving out of here, huh?",
                          "<32>* Oh well.\n* Guess it can't all be a haven for the tough stuff."
                       ]
                     : [
                          "<32>{#p/basic}{#npc/a}* If we're free, people won't have to move in from the Citadel anymore!",
                          "<32>* Seems like we won't have to lose our local culture.",
                          "<32>* ... except we're all moving out of here, huh?",
                          "<32>* Oh well.\n* Guess it can't all be punk- peaches and punk-cream."
                       ]
                  : papreal() || world.dead_canine || world.population < 6
                  ? [
                       "<32>{#p/basic}{#npc/a}* The Citadel's getting pretty crowded, so I've heard they're going to start moving here.",
                       "<32>* ... who knows?\n* Maybe we'll have room for 'em."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* The Citadel's getting pretty crowded, so I've heard they're going to start moving here.",
                       "<32>* Hmmm...\n* I don't want to see the erasure of our local culture.",
                       "<32>* But it'd definitely be fun to teach those city slickers how we do things out here!"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ "<33>{#p/basic}{#npc/a}* I'm semi-conflicted about this." ]
                  : SAVE.data.n.plot === 33
                  ? [ "<32>{#p/basic}{#npc/a}* Regular?\n* Who, me?\n* Nah, I'm only semi-regular." ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          "<32>{#p/basic}{#npc/a}* Come to think of it, you've inspired me, kid.\n* I'm gonna start a fight club."
                       ]
                     : [ "<32>{#p/basic}{#npc/a}* We'll just have to come up with something new, eh?" ]
                  : [ "<32>{#p/basic}{#npc/a}* Yeah, bring 'em on!" ]
         ),
         g_redbird: pager.create(
            0,
            () =>
               SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Hoo hoo hoo!\n* That was really something!',
                       "<32>{#p/basic}{#npc/a}* ... um, am I the only one that thinks it's all a trick?"
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       "<32>{#p/basic}{#npc/a}* Sans is a royal sentry, but don't let his title fool ya.",
                       '<32>* Everyone knows he sits around at the edge of the holo-forest reading hovercar manuals.'
                    ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* Wow, a brand new world...',
                       '<32>* I might not get to translate for Grillbz anymore...',
                       "<32>* ... or maybe I will!\n* Grillbz, do you plan on movin' this place out there?",
                       '<32>{#npc}* ...\n* ...\n* ...',
                       ...(world.population < 4
                          ? [
                               "<32>{#npc/a}* Grillbz says he's more than happy to.",
                               '<33>* He must still be afraid of you.'
                            ]
                          : [ "<32>{#npc/a}* Grillbz says he'll think about it." ])
                    ]
                  : papreal()
                  ? [
                       '<32>{#p/basic}{#npc/a}* Grillby is getting nervous.',
                       "<32>* Sans is his best customer, and he hasn't shown up at all today..."
                    ]
                  : world.dead_dog
                  ? [
                       '<32>{#p/basic}{#npc/a}* Those dogs are part of the ROYAL GUARD, the...',
                       '<32>* Huh?\n* Where are they?\n* Weird...'
                    ]
                  : world.population < 4
                  ? [
                       "<32>{#p/basic}{#npc/a}* Word around town is there's a bully going and beating people up.",
                       '<32>* But Grillbz and I decided to keep the bar open.',
                       "<32>* No bully's gonna keep us from running THIS establishment!"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Those dogs are part of the ROYAL GUARD, the military group led by UNDYNE.',
                       "<32>* She's rude, loud, and beats up everybody hoo disrespects her...",
                       "<32>* It's no wonder all the kids want to be like her when they grow up!"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* You never know with those rudely rowdy TV hosts.' ]
                  : SAVE.data.n.plot === 33
                  ? [
                       "<32>{#p/basic}{#npc/a}* Don't ask me why he does it.",
                       "<32>* If I had to guess, though, I'd say it's got something to do with Papyrus."
                    ]
                  : SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* If he DOES open a Grillby's on the new homeworld...",
                       ...(world.population < 4
                          ? [ '<32>* We can only hope the travelers there are nicer.', "<32>* ... you're debatable." ]
                          : [
                               "<32>* We can only hope there isn't too much water around.",
                               "<32>* ... that'd be dangerous."
                            ])
                    ]
                  : papreal() || world.dead_dog
                  ? [ '<32>{#p/basic}{#npc/a}* Something feels off.' ]
                  : world.population < 4
                  ? [ "<32>{#p/basic}{#npc/a}* At least they're not out there killing everybody." ]
                  : [ '<32>{#p/basic}{#npc/a}* I want to be like UNDYNE when I grow up, too!\n* Hoo hoo hoo!' ]
         ),
         l_cupjake: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* Maybe now that we're free, that sweet lady will finally leave.",
                       '<32>* Then, I shall come to know the contents of that {@fill=#f00}odd book{@fill=#fff} for myself...'
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* There's an {@fill=#f00}odd book{@fill=#fff} that appears and disappears here at random...",
                       '<32>* But that sweet lady always seems to be in the way of it!',
                       '<32>* Do you know anything that could scare her off?'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Soon, I tell you.', '<32>* Soon.' ]
                  : [ "<32>{#p/basic}{#npc/a}* I know what you're thinking.", "<32>* Don't try it." ]
         ),
         l_kakurolady: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                       "<32>* This will be our news feed's last issue...",
                       '<32>* Why don\'t we just put a big \"THE END\" on the front and call it a day?'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                       '<33>* Back in school, teachers gave us spot-the-difference puzzles when we ran out of work.',
                       '<32>* I thought they were a waste of time.\n* But look at me now...',
                       "<33>* I'm the number-one spot-the- difference artist on the outpost!"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                       "<32>* Heck, why don't we just quit right here and now?"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                       "<33>* Trust me, kid.\n* You don't really want this job."
                    ]
         ),
         l_librarian: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* Welcome to the librarby.',
                       ...(world.population === 0
                          ? [ "<32>* If you beat up anyone else, you'll be really sorry." ]
                          : [ "<32>* This is the last day we'll be open, so make as much noise as you want." ])
                    ]
                  : postSIGMA()
                  ? [
                       "<32>{#p/basic}{#npc/a}* Welcome to the librarby.\n* The only place in town that doesn't run on electricity.",
                       '<32>* Which, is important, what with all the breakdowns happening lately.'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Welcome to the librarby.\n* Actually, that name started as a spelling mistake.',
                       '<32>* Now everybody calls it that...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population === 0
                     ? [ "<32>{#p/basic}{#npc/a}* You have feelings, don't you?" ]
                     : [ "<32>{#p/basic}{#npc/a}* Not that anyone would've stopped you before..." ]
                  : [ "<32>{#p/basic}{#npc/a}* This is what happens when you're too lazy to fix simple problems." ]
         ),
         l_sweetie: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* Oh my, there's so much news to report, I don't know where to begin!",
                       '<32>* How about this headline...\n* \"Monsters Finally Escape From the Outpost.\"',
                       "<32>* Nah, that doesn't have enough pizazz...",
                       '<32>* How about \"You Won\'t Believe Who Helped Us Escape From the Outpost!\"'
                    ]
                  : postSIGMA()
                  ? [
                       '<32>{#p/basic}{#npc/a}* Working the news feed has gotten tricky as of late.',
                       "<32>{#p/basic}{#npc/a}* Half of the time, I can't even log into my own account!",
                       '<32>{#p/basic}{#npc/a}* To fix it, I may just have to access the rec center servers in person...'
                    ]
                  : world.dead_dog || world.population < 6
                  ? SAVE.data.b.killed_mettaton
                     ? [
                          '<32>{#p/basic}{#npc/a}* Working the news feed is losing its appeal.',
                          '<32>* First, that terrible news from before, and now, what happened to that celebrity...',
                          "<32>* I'm thinking about quitting."
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* I love working the news feed.',
                          "<32>* Lately, though, I've had to report on something terrible...",
                          "<32>* I'm starting to second-guess my life choices."
                       ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* I love working the news feed.',
                       '<32>* Only problem is, if a celebrity dies...',
                       "<32>* That's all anyone ever wants me to report on for a while."
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* I love working the news feed.',
                       "<32>* There's so little to report that we just fill it with comics and games.",
                       '<32>* I sure hope nobody gets bored of those.'
                    ],
            () =>
               world.dead_dog || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* Have you ever felt like your life is just running in circles?' ]
                  : [ "<32>{#p/basic}{#npc/a}* Have you ever felt like you're just missing something?" ]
         ),
         s_faun: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [
                          "<32>{#p/basic}{#npc/a}* We're all free?",
                          "<32>* OK, OK...\n* And here I thought we'd all be covered in bruises.",
                          "<33>* What a surprise.\n* I'm sure that dog won't care."
                       ]
                     : [
                          "<32>{#p/basic}{#npc/a}* We're all free?",
                          "<32>* OK, OK...\n* I'll stop lounging around.\n* Does that dog know?",
                          "<33>* Hm, I'll be sure to go tell it."
                       ]
                  : roomKills().s_greater > 0
                  ? [ "<32>{#p/basic}{#npc/a}* Sorry, champ.\n* Now's not a good time." ]
                  : 30 <= SAVE.data.n.plot
                  ? [
                       '<32>{#p/basic}{#npc/a}* I heard that dog is a 4-D poker player...',
                       '<32>* Has it ever won a game?\n* I wonder.'
                    ]
                  : [
                       [
                          '<32>{#p/basic}{#npc/a}* A dog just rushed in here, filled with inspiration.',
                          '<32>* It kept trying to create a hologram that expressed its own emotions...',
                          '<32>* But, as it did, it kept getting more excited about the creation...',
                          '<32>* Its neck got longer and longer, and it added more and more light, until...',
                          "<32>* It was rather sad to watch, but I couldn't turn away."
                       ],
                       [
                          "<32>{#p/basic}{#npc/a}* That dog from earlier...?\n* It's at Grillby's.\n* I think.",
                          '<32>* After work, all of the dogs go there to play cards together.',
                          "<32>* But that dog doesn't really know how to express itself.",
                          '<32>* So, it ends up playing alone, instead of introducing itself to the others...'
                       ],
                       [
                          "<32>{#p/basic}{#npc/a}* Where's that dog?",
                          '<32>* It usually comes through here every day after work...'
                       ],
                       [
                          '<32>{#p/basic}{#npc/a}* A badly wounded dog just walked through here...',
                          '<32>* What kind of person would beat up a cute little dog?'
                       ]
                    ][SAVE.data.n.state_starton_lesserdog],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ "<32>{#p/basic}{#npc/a}* Don't worry, champ.\n* Most of them have probably forgiven ya by now." ]
                     : [ "<32>{#p/basic}{#npc/a}* Don't worry, champ.\n* I've got this covered for ya." ]
                  : roomKills().s_greater > 0
                  ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                  : 30 <= SAVE.data.n.plot
                  ? [ "<32>{#p/basic}{#npc/a}* The day that dog wins a game of 4-D poker, we're ALL doomed." ]
                  : [
                       [ '<32>{#p/basic}{#npc/a}* Too bad for the dog, huh?' ],
                       [ '<32>{#p/basic}{#npc/a}* So sad for the dog, huh?' ],
                       [ '<32>{#p/basic}{#npc/a}* Have you seen it?' ],
                       [ '<32>{#p/basic}{#npc/a}* Despicable.' ]
                    ][SAVE.data.n.state_starton_lesserdog]
         ),
         s_moonrocks1: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [
                          '<32>{#p/basic}{#npc/a}* Hah-\n* Incredible-',
                          '<32>* I knew my moon rocks were the real deal all along-',
                          "<32>* Even I'm surprised what your mean ways have led to for me-"
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* Tch-\n* Unbelievable-',
                          "<32>* I can't believe I'm gonna be working with that guy-",
                          '<32>* At least our sales figures should finally go up-'
                       ]
                  : roomKills().s_pacing > 0
                  ? [ "<32>{#p/basic}{#npc/a}* Tch-\n* Sorry, I don't sell to people like you-" ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* Man-\n* Sucks what happened to Mettaton, y'know-",
                       "<32>* But I'm willing to sell off my special edition moon rocks for the occasion-",
                       '<32>* Unlike that guy, who just lowers the prices on his basic rocks instead-'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Tch-\n* Unbelievable-',
                       '<32>* I got authentic moon rocks straight from a moon, unlike his phoned in crap-',
                       "<32>* That guy's rocks don't look anything like a moon-"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ '<32>{#p/basic}{#npc/a}* Yeah, I have you to thank-' ]
                     : [ "<32>{#p/basic}{#npc/a}* It's just good for business-" ]
                  : roomKills().s_pacing > 0
                  ? [ "<32>{#p/basic}{#npc/a}* Tch-\n* Sorry, I don't sell to people like you-" ]
                  : [ '<32>{#p/basic}{#npc/a}* The nerve of that guy-' ]
         ),
         s_moonrocks2: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [
                          "<32>{#p/basic}{#npc/a}* Ehhh~\n* I just couldn't deal with it anymore, man~",
                          "<32>* Between his badgering and your bullying, I've just about had enough~",
                          "<32>* His moon rocks may be fake, but if it gets me peace and quiet, I'll deal~"
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* Pfft~\n* Shaw man~',
                          "<32>* It's good to finally be working together on this thing~",
                          "<32>* Now we'll both be sellin' my authentic moon rocks~"
                       ]
                  : roomKills().s_pacing > 0
                  ? [ '<32>{#p/basic}{#npc/a}* Pfft~\n* No moon rocks for you~' ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Real shame what happened to the start of the underground~',
                       "<32>* Don't worry though~\n* Unlike that dude to my left, I won't raise my prices~",
                       '<32>* In fact, my moon rocks are going on sale~'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Pfft~\n* Shaw man~',
                       "<32>* That dude to my left be sellin' phoney baloney moon rocks, bruh~",
                       "<32>* Don't believe a word he says~"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ '<32>{#p/basic}{#npc/a}* Shaw man~\n* Sorry it had to come to this~' ]
                     : [ '<32>{#p/basic}{#npc/a}* Yeah, his were the real fake moon rocks all along~' ]
                  : roomKills().s_pacing > 0
                  ? [ '<32>{#p/basic}{#npc/a}* Pfft~\n* No moon rocks for you~' ]
                  : [ "<32>{#p/basic}{#npc/a}* The gall o' that dude~" ]
         ),
         t_bunny: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* My little Cinnamon's going to grow up one day...",
                       "<32>* Since he's my brother, I only want the best for him.",
                       '<32>* I sure hope our new world can accommodate for that.'
                    ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* Ah, it's so peaceful and quiet...",
                       '<32>* The people who usually bother me are too busy crying about something on TV!'
                    ]
                  : papreal()
                  ? [
                       "<32>{#p/basic}{#npc/a}* Ah, it's so peaceful and quiet...",
                       '<32>* Usually one of those skeletons chases my little Cinnamon around.'
                    ]
                  : world.dead_canine
                  ? [
                       "<32>{#p/basic}{#npc/a}* Ah, it's so peaceful and quiet...",
                       '<32>* Usually one of those dogs chases my little Cinnamon around.'
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* Isn't my little Cinnamon just the cutest?",
                       '<32>* Bun-buns are so adorable...\n* Tee hee!'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* It's not long now, bun-bun..." ]
                  : SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* I wonder what could have happened...' ]
                  : papreal() || world.dead_canine
                  ? [ '<32>{#p/basic}{#npc/a}* I wonder where they are...' ]
                  : [ '<32>{#p/basic}{#npc/a}* Bun-bun-bun-bun-bun...' ]
         ),
         t_icewolf: () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#npc/a}* Ice Wolf is happy today.\n* Sweet Doggo has finally been held in Ice Wolf's arms.",
                    '<32>* Ice Wolf is now his Nice Wolf.'
                 ]
               : SAVE.data.b.killed_mettaton
               ? [
                    '<32>{#p/basic}{#npc/a}* Ice Wolf notices the morale of the town slipping.',
                    '<32>* Ice Wolf just wants everyone to be happy.'
                 ]
               : world.dead_canine
               ? [
                    "<32>{#p/basic}{#npc/a}* Ice Wolf has not seen any of Ice Wolf's dog-friends today.",
                    '<32>* Ice Wolf is sad.'
                 ]
               : SAVE.data.n.state_starton_doggo === 2
               ? [
                    '<32>{#p/basic}{#npc/a}* Ice Wolf has not seen sweet Doggo at all today.',
                    '<32>* Ice Wolf is lonely.'
                 ]
               : papreal()
               ? [ '<32>{#p/basic}{#npc/a}* Ice Wolf has not seen any skeletons today.', '<32>* Ice Wolf is concerned.' ]
               : SAVE.data.n.state_starton_doggo === 1 &&
                 SAVE.data.n.state_starton_dogs === 1 &&
                 SAVE.data.n.state_starton_greatdog === 1 &&
                 SAVE.data.n.state_starton_lesserdog === 1
               ? [
                    "<32>{#p/basic}{#npc/a}* Ice Wolf is going to play fetch with Ice Wolf's dog-friends.",
                    '<32>* Ice Wolf is excited.'
                 ]
               : world.population < 6
               ? [
                    world.bullied
                       ? '<32>{#p/basic}{#npc/a}* Ice Wolf is wondering why so many monsters are hurt.'
                       : '<32>{#p/basic}{#npc/a}* Ice Wolf is wondering why so many monsters are gone.',
                    '<32>* Ice Wolf is concerned.'
                 ]
               : [
                    '<32>{#p/basic}{#npc/a}* Ice Wolf is wondering why Ice Wolf is Ice Wolf when there is no ice to throw around.',
                    '<32>* Ice Wolf is confused.'
                 ],
         t_imafraidjumitebeinagang: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* I asked Papyrus about his floss collection, and he said he'd help me start one, too.",
                       "<32>* Isn't he the best?"
                    ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* My MTT-brand toothbrush broke again, and I don't know how I'll fix it this time.",
                       "<32>* ... it's not like they're going to make any more of them, now."
                    ]
                  : papreal()
                  ? [
                       "<32>{#p/basic}{#npc/a}* I went to ask Papyrus about his floss collection, but he wasn't available.",
                       '<32>* Would you happen to know anything about that?'
                    ]
                  : world.popmax(0) - world.population > 4
                  ? [
                       "<32>{#p/basic}{#npc/a}* I'd lend you my MTT-brand toothbrush...",
                       "<32>* ... but I get the feeling you'd smash it a whole bunch."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* Those MTT-brand toothbrushes are so freakin' brittle.",
                       '<32>* Thing got crushed in my hands before I could even start!'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* I asked Papyrus about his floss collection, and he said he'd help me start one, too.",
                       "<32>* Isn't he the best?"
                    ]
                  : SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Guess I'll have to use an actually decent toothbrush from now on." ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Hmm...\n* I wonder how skeletons brush their teeth.' ]
                  : world.popmax(0) - world.population > 4
                  ? [
                       '<32>{#p/basic}{#npc/a}* Hanging out by the bar tells you a lot about this place...\n* For better or worse.'
                    ]
                  : [ '<32>{#p/basic}{#npc/a}* Then again, it was the cheapest option...' ]
         ),
         t_kabakk: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [
                          '<32>{#p/basic}{#npc/a}* HEY!',
                          "<32>* ... you're pretty weird.",
                          '<32>* You put us through hell, then went through hell to save us all.',
                          "<32>* I don't really know why.",
                          '<32>* ...',
                          '<32>* ...',
                          "<32>* I DON'T KNOW HOW TO HANDLE TO THIS SITUATION!\n* YEAH!"
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* HEY!',
                          "<32>* ... you're pretty cool.",
                          '<32>* Thanks for going through hell to save us all back there.',
                          '<32>* That was a real stand-up move.',
                          '<32>* ...',
                          '<32>* ...',
                          '<32>* ALL HAIL THE NEW AUTHORITY!\n* YEAH!'
                       ]
                  : world.meanie
                  ? [
                       '<32>{#p/basic}{#npc/a}* HEY!',
                       '<32>* What you been up to, huh KID?',
                       "<32>* You've got an awfully criminal look on your FACE...",
                       '<32>* ...',
                       '<32>* ...',
                       '<32>* Respect my AUTHORITY!\n* YEAH!'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* HEY!',
                       '<32>* You think you can just stand there and stare at ME?',
                       "<32>* Well, I've got some bad news for you, PAL.",
                       "<32>* I'm an officer of the LAW.",
                       '<32>* So, UH...',
                       '<32>* Respect my AUTHORITY!\n* YEAH!'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                     : [ '<32>{#p/basic}{#npc/a}* HAIL it, PAL.' ]
                  : [ '<32>{#p/basic}{#npc/a}* Respect it, PAL.' ]
         ),
         t_loverboy: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          '<32>{#p/basic}{#npc/a}* Hey hey...',
                          "<32>* ... despite what you've done, you still chose to...",
                          "<32>* Oh... oh gee...\n* You can't see it, but I think I'm gonna cry...",
                          "<32>* ... wait, don't hurt me!"
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* Hey hey...',
                          "<32>* ... thanks to you, we're...",
                          "<32>* Oh... oh gee...\n* You can't see it, but I think I'm gonna cry...",
                          '<32>* ... uh, can I cry?'
                       ]
                  : papreal() || world.dead_canine || SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* Hey hey, why's everyone so sad around this town?",
                       '<32>* Did something happen?'
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* Hey hey, nothing's ever going to change in my life!",
                       '<32>* Ha... ha...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ "<32>{#p/basic}{#npc/a}* I still think you're cool...!\n* Please don't hurt me." ]
                     : [ '<32>{#p/basic}{#npc/a}* I love you...!' ]
                  : papreal() || world.dead_canine || SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Maybe it's just my imagination." ]
                  : [ "<32>{#p/basic}{#npc/a}* Or maybe I'm just crazy." ]
         ),
         t_politics: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* I heard the king revealed the truth about the humans he supposedly killed.',
                       "<32>* Everyone felt so bad that they didn't know.\n* They all gave him a big hug.",
                       '<32>* Then they took the humans and adopted them for themselves.',
                       '<32>* Now the humans will get to live their lives with us.',
                       "<32>* Thaaaaaat's politics!"
                    ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* Hmmm, it's weird how everybody's been talking about TV lately.",
                       "<32>* What happened...?\n* I hope this doesn't affect our political system..."
                    ]
                  : papreal()
                  ? [
                       '<32>{#p/basic}{#npc/a}* Hmmm, usually Papyrus goes to meet with Undyne about now.',
                       '<32>* Where is he...?\n* I can feel our political system crumbling apart...'
                    ]
                  : world.popmax(0) - world.population > 4
                  ? [
                       '<32>{#p/basic}{#npc/a}* This town has no real police.\n* But maybe the fake police will scare off the bullies.',
                       '<32>* The politics carry on...'
                    ]
                  : world.trueKills > 0 || SAVE.data.n.bully > 0
                  ? [
                       '<32>{#p/basic}{#npc/a}* This town has no mayor.',
                       '<32>* But, if anything happens, a skeleton will tell a fish lady about it.',
                       "<32>* Thaaaaaat's politics!"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* This town is always so dreary.',
                       "<32>* But, if things keep going the way they are, maybe that'll change.",
                       '<32>* Is that politics?'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* You see?\n* Politics isn't all bad..." ]
                  : SAVE.data.b.killed_mettaton || papreal() || world.popmax(0) - world.population > 4
                  ? [ '<32>{#p/basic}{#npc/a}* Politics...' ]
                  : world.trueKills > 0 || SAVE.data.n.bully > 0
                  ? [ '<32>{#p/basic}{#npc/a}* Politics.' ]
                  : [ '<32>{#p/basic}{#npc/a}* Politics?' ]
         ),
         t_rabbit: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* Long ago, I heard they didn\'t have such fancy things as \"force fields.\"',
                       '<32>* All I can say... is that it feels good to be back.'
                    ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Long ago, I heard TV celebrities were all over the place.',
                       "<32>* Now, they're looking to become a thing of the past."
                    ]
                  : papreal()
                  ? [
                       '<32>{#p/basic}{#npc/a}* Long ago, I heard the outpost was a dreary place.',
                       "<32>* At this rate... we'll be back to having that same problem."
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Long ago, I heard they split the town into two halves.',
                       '<32>* I wonder what it looked like before...?'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Thanks for bringing us back.' ]
                  : SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* It's too bad we can't just magically bring them back." ]
                  : papreal()
                  ? [ "<32>{#p/basic}{#npc/a}* It's too bad we can't just magically fix these things." ]
                  : [ '<32>{#p/basic}{#npc/a}* We may never know.' ]
         ),
         t_smileguy: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          "<32>{#p/basic}{#npc/a}* So we're free, huh?",
                          "<32>* I guess I don't have to keep smiling anymore...",
                          "<32>* ... strange.\n* I don't feel like not smiling, but smiling also seems wrong.",
                          "<32>* This is too deep.\n* I'm sticking to what I know."
                       ]
                     : [
                          "<32>{#p/basic}{#npc/a}* So we're free, huh?",
                          "<32>* I guess I don't have to keep smiling anymore...",
                          "<32>* ... huh.\n* Then why can't I stop?",
                          "<32>* For some reason, I don't want to stop smiling now!"
                       ]
                  : papreal() || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* Just now, I felt my smile falter for a moment.', "<32>* What's wrong?" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* We all know things haven't gone how we'd hoped, but we smile anyway.",
                       '<32>* Why?',
                       '<32>* This is our reality, so why be morose about it?'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ '<32>{#p/basic}{#npc/a}* Smile smile.' ]
                     : [ '<32>{#p/basic}{#npc/a}* Smile smile!' ]
                  : papreal() || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* Smile smile?' ]
                  : [ '<32>{#p/basic}{#npc/a}* Smile smile.' ]
         ),
         t_wisconsin: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          '<32>{#p/basic}{#npc/a}* Freedom...',
                          "<32>* That means I don't have to worry about getting beat up anymore.",
                          '<32>* Haha.'
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* Freedom...',
                          "<32>* That means I don't have to worry about cracking jokes anymore.",
                          '<32>* ...',
                          '<32>* What does a mouse do when it finally gets the cheese?',
                          '<32>* ...',
                          '<32>* Well...',
                          "<32>* It probably doesn't worry about cracking jokes, that's for sure.",
                          '<32>* Haha.'
                       ]
                  : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* It just feels like...',
                       '<32>* Like everything is getting worse, and worse...\n* And worse.'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Everyone is always laughing and cracking jokes, trying to forget our modern crises...',
                       '<32>* Dreariness.\n* Crowding.\n* Lack of a homeworld.',
                       "<32>* I would join them, but I just don't feel like being funny."
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ "<32>{#p/basic}{#npc/a}* Sorry.\n* That wasn't funny." ]
                     : [
                          '<32>{#p/basic}{#npc/a}* Sorry.\n* I guess you could say...',
                          '<32>* That joke was a little too \"cheesy.\"'
                       ]
                  : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* And worse...' ]
                  : [ "<32>{#p/basic}{#npc/a}* At least I'm not making puns." ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ '<32>{#p/basic}{#npc/a}* You should leave before I stop being nice to you.' ]
                     : [ "<32>{#p/basic}{#npc/a}* Yes.\n* That was a pun.\n* I'm a pun mouse now." ]
                  : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* And worse still...' ]
                  : [ '<32>{#p/basic}{#npc/a}* For now.' ]
         ),
         t_zorren: pager.create(
            0,
            () => [
               "<32>{#p/basic}{#npc/a}* (Oh, hey, it's me, Zorren.)",
               ...(SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [
                          "<32>* (We, uh, can't thank you enough for doing what you did.)",
                          "<32>* (But...)\n* (You've, uh, not exactly been a model citizen.)",
                          "<32>* (Why'd you have to go and, make it all so complicated?)"
                       ]
                     : [
                          "<32>* (We, uh, can't thank you enough for doing what you did.)",
                          "<32>* (But...)\n* (You've, uh, probably heard enough of that, by now.)",
                          "<32>* (So I'll let you get back to, what you were doing.)"
                       ]
                  : world.meanie
                  ? SAVE.data.b.s_state_capstation
                     ? [
                          "<32>* (Something's, like, different about you now.)",
                          '<32>* (...)',
                          "<32>* (Yeah, you know, uh, I don't really like you anymore.)",
                          "<32>* (I'd take back they key I gave you, if only I could.)"
                       ]
                     : [
                          '<32>* (You uh, got a problem with our, uh, police force, or...?)',
                          '<32>* (...)',
                          "<32>* (Yeah, you know, uh, I don't really like you all that much.)",
                          "<32>* (There's just, something off, particularly about you.)"
                       ]
                  : [
                       ...(SAVE.data.b.oops
                          ? [
                               '<32>* (You uh, got a problem with our, uh, police force, or...?)',
                               '<32>* (No?)\n* (Hey, thanks for uh, not doing that.)'
                            ]
                          : [
                               "<32>* (Y'know, you seem like someone who likes to show respect.)",
                               '<32>* (So, thanks for, uh, doing that.)'
                            ]),
                       ...(SAVE.data.b.s_state_capstation
                          ? []
                          : ((SAVE.data.b.s_state_capstation = true),
                            [
                               '<32>* (In fact...)',
                               '<32>* (Here, kid.)\n* (Have a key, on us.)',
                               '<32>{#s/equip}{#p/human}* (The Rusty Key was added to your keyring.)',
                               '<32>* (Check your CELL to see all acquired keys.)',
                               "<32>{#p/basic}{#npc/a}* (We've, uh, got an armory somewhere, I think.)"
                            ])),
                       ...(SAVE.data.b.oops
                          ? [
                               '<32>* (Psst...)\n* (Just between us, Kabakk and I built this station ourselves.)',
                               '<32>* (Pretty cool, huh?)'
                            ]
                          : [
                               '<32>* (Psst...)\n* (Just between us, Kabakk and I built this station ourselves.)',
                               '<32>* (Pretty cool, huh?)'
                            ])
                    ])
            ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [ '<32>{#p/basic}{#npc/a}* (Do better, my friend.)\n* (Do better.)' ]
                     : [ '<32>{#p/basic}{#npc/a}* (Carry on, my friend.)\n* (Carry on.)' ]
                  : world.meanie
                  ? [ '<32>{#p/basic}{#npc/a}* (Get outta here.)' ]
                  : SAVE.data.b.oops
                  ? [ "<32>{#p/basic}{#npc/a}* (Yeah, we're not real police.)" ]
                  : [
                       '<32>{#p/basic}{#npc/a}* (We may not be real police, but people like you are worth protecting and serving.)'
                    ]
         )
      },
      objinter: {
         ctower0: () => [
            '<32>{#p/human}* (You activate the terminal.)',
            ...(SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The note describes reducing the total to zero by adding or subtracting powers of ten.)'
                 ]
               : [
                    '<32>{#p/basic}* There are written instructions tacked onto the side...',
                    '<33>* It\'s illegible chicken-scratch.\n* The only word you can make out is \"zero.\"'
                 ])
         ],
         ctower1: () =>
            SAVE.data.b.s_state_mathpass
               ? SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (But you already completed this puzzle beforehand.)' ]
                  : [ '<32>{#p/basic}* The terminal is now in an unlocked state.' ]
               : [ "<32>{#p/basic}* It's out of service." ],
         microwave0: [ '<32>{#p/human}* (You look behind the microwave...)', '<32>{#p/basic}* Nothing useful here.' ],
         microwave1: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (You look behind the microwave...)',
                    '<32>{#s/equip}{#p/human}* (You pulled the switch.)'
                 ]
               : [
                    '<32>{#p/human}* (You look behind the microwave...)',
                    "<32>{#p/basic}* There's a switch here...",
                    '<32>{#s/equip}{#p/human}* (You pulled the switch.)'
                 ],
         microwave2: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (You look behind the microwave...)',
                    '<32>{#p/human}* (But you already flipped the switch here.)'
                 ]
               : [ '<32>{#p/human}* (You look behind the microwave...)', '<32>{#p/basic}* Nothing new back here.' ],
         microwave3: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (But you didn't notice anything of note about this appliance.)" ]
               : [
                    '<32>{#p/basic}* A standard-issue CITADEL dielectric heater, circa 260X.',
                    "<32>* It's a microwave.\n* Can't be over a decade old."
                 ],
         microwave4: () => [
            '<32>{#p/basic}* It seems to be projecting some kind of gravity field.',
            ...(SAVE.data.b.oops ? [] : [ "<32>{#p/basic}* I wonder... if there's a switch somewhere..." ])
         ],
         papmail1: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (But you didn't have any mail to send.)" ]
               : [
                    '<32>{#p/basic}* This mailbox is labelled \"PAPYRUS.\"',
                    choicer.create('* (Look inside the mailbox?)', 'Yes', 'No')
                 ],
         papmail2: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/human}* (You look inside...)',
                       world.runaway
                          ? "<32>{#p/basic}* It's even emptier than before."
                          : "<32>{#p/basic}* It's not empty?"
                    ]
                  : [
                       '<32>{#p/human}* (You look inside...)',
                       "<32>{#p/basic}* It's empty.",
                       ...(31 <= SAVE.data.n.plot &&
                       SAVE.data.n.plot_date < 0.1 &&
                       SAVE.data.n.state_starton_papyrus !== 1
                          ? [
                               '<18>{#p/papyrus}{#f/0}HOW NICE OF YOU TO CHECK MY MAIL!',
                               "<18>{#p/papyrus}{#f/4}THANKFULLY, I'VE ALREADY COLLECTED IT ALL."
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/human}* (You look inside...)',
                       world.runaway
                          ? "<32>{#p/basic}* It's even emptier than before."
                          : "<32>{#p/basic}* It's not empty?"
                    ]
                  : [ '<32>{#p/human}* (You look inside...)', "<32>{#p/basic}* It's empty." ]
         ),
         papmail3: [ '<32>{#p/human}* (You decide not to look.)' ],
         puzzlechip: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But you already completed this puzzle beforehand.)' ]
               : [ '<32>{#p/basic}* The terminal is now in an unlocked state.' ],
         spagtable0: [ "<32>{#p/basic}* It's an unused plate." ],
         spagtable1: [
            '<32>{#p/human}* (You gaze upon the mouth- watering spaghetti.)',
            '<32>{#p/human}* (It appears to be just beyond your reach.)'
         ],
         spagtable2: [ '<32>{#p/human}* (You got the Spaghetti.)' ],
         spagtable2b: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
         spagtable3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You feel appreciative towards this plate for the food it served you.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* Why bother.\n* It's just a simple plate." ]
               : [ '<32>{#p/basic}* Once the home of a truly out- of-this-world creation.' ],
         xtower1: () => [
            ...(postSIGMA()
               ? [ "<32>{#p/basic}* It's out of service." ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The terminal appears to have been powered off.)',
                    ...[
                       [
                          "<25>{#p/asriel1}{#f/13}* The power's gone.\n* But it makes sense they'd shut this off.",
                          "<25>{#f/17}* Wouldn't want anyone to get distracted and miss the transport, right?"
                       ],
                       [
                          "<25>{#p/asriel1}{#f/13}* To be fair, I don't think they'd actually let someone miss it.",
                          '<25>{#f/13}* Dr. Alphys probably has some kind of thing to scan for SOULs, so...',
                          "<25>{#f/17}* They'd know if anyone was left behind.",
                          '<25>{#f/15}* Makes me wonder if they can see us out here right now...'
                       ],
                       [ "<25>{#p/asriel1}{#f/17}* Don't worry, Frisk.\n* The new homeworld will have plenty of games." ]
                    ][Math.min(asrielinter.xtower1++, 2)]
                 ]
               : [
                    '<32>{#p/human}* (You activate the terminal.)',
                    "<32>{#p/basic}* It's a game terminal...",
                    ...(SAVE.data.n.plot === 72 || world.postnoot
                       ? [ '<32>{#p/basic}* The power supply has been cut.' ]
                       : [ '<32>{#p/basic}* \"Shoot targets as fast as you can! Use [Z] to shoot.\"' ])
                 ])
         ]
      },
      papbooks1: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The books on this bookshelf consist of puzzler's guides and children's stories.)" ]
               : [
                    '<32>{#p/basic}* The bookshelf is filled with complex tomes about puzzle creation.',
                    "<32>* And children's books.",
                    ...(roomready()
                       ? [
                            '<18>{#p/papyrus}SOME OF MY FAVORITE BOOKS ARE ON THAT SHELF.',
                            '<18>{#f/4}LIKE \"ADVANCED PUZZLE CONSTRUCTS FOR BRIGHT MINDS.\"',
                            '<18>{#f/0}AND ANOTHER FAVORITE OF MINE?',
                            '<18>{#f/4}\"PEEK-A-BOO WITH FLUFFY BUNNY.\"',
                            '<18>{#f/8}THE ENDING ALWAYS GETS ME!'
                         ]
                       : [])
                 ],
         () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The books on this bookshelf consist of puzzler's guides and children's stories.)" ]
               : [ "<32>{#p/basic}* Complex manuals and children's books." ]
      ),
      papbooks2: pager.create(
         1,
         [
            '<32>{#p/human}* (You pick out a book...)',
            '<32>{#p/basic}* \"The cornerstone of a puzzle\'s interactive value is the player\'s affectation.\"',
            '<32>* \"The tacit drive within every player to explore, progress, and complete a given task.\"',
            '<32>* \"A puzzle that challenges and engages these motivations will ensure...\"',
            '<32>* \"The player remains focused and on task until the very end.\"',
            '<32>{#p/human}* (You put the book back on the shelf.)'
         ],
         [
            '<32>{#p/human}* (You pick out a book...)',
            '<32>{#p/basic}* \"\'Peek-A-Boo!\' said the human, appearing from behind the wall.\"',
            '<32>* \"The fluffy bunny, surprised, looked at the human excitedly.\"',
            '<32>* \"Then, the human moved away... no longer able to see them, the fluffy bunny was sad.\"',
            '<32>* \"It shook, thinking about how lonely it\'d be.\"',
            '<32>* \"It wanted to cry, thinking it\'d been abandoned for all eternity...\"',
            '<32>* \"But then, the human appeared once again, and all was right with the world.\"',
            '<32>* \"The human and the bunny gave each other a big, fluffy hug.\"',
            '<32>{#p/human}* (You put the book back on the shelf.)'
         ],
         () =>
            world.runaway
               ? [
                    '<32>{#p/human}* (You pick out a book...)',
                    '<23>{#p/papyrusnt}\"DEAR DAIRY, THE FORCE FIELD HAS BEEN DESTROYED.\"',
                    '<23>\"FRISK, THE HUMAN WHO CAME TO THE OUTPOST JUST A FEW DAYS AGO...\"',
                    '<23>\"IS NOW THE SUBJECT OF FEAR AMONG EVERYONE ON THE OUTPOST.\"',
                    '<23>\"WE\'RE ALL LEAVING RIGHT AWAY, BEFORE THEY WAKE UP.\"',
                    '<23>\"STILL, A PART HOPES THEY FIND THEIR WAY OFF THE OUTPOST, TOO.\"',
                    '<23>\"EVERYONE ELSE JUST SEEMS CONTENT LEAVING THEM TO DIE.\"',
                    '<32>{#p/human}* (You put the book back on the shelf.)'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/human}* (You pick out a book...)',
                    '<23>{#p/papyrusnt}\"DEAR DAIRY, THE FORCE FIELD HAS BEEN DESTROYED.\"',
                    '<23>\"FRISK, THE HUMAN WHO CAME TO THE OUTPOST JUST A FEW DAYS AGO...\"',
                    '<23>\"TOOK ON IMPOSSIBLE ODDS TO SAVE US FROM DESTRUCTION.\"',
                    '<23>\"MAYBE THIS IS WHAT\'LL INSPIRE SANS TO MOVE UP IN THE WORLD.\"',
                    '<23>\"I ONLY MENTION IT BECAUSE, I NEVER KNEW HIS SENTRY JOB...\"',
                    '<23>\"MEANT DOING SO LITTLE ACTUAL WORK.\"',
                    '<32>{#p/human}* (You put the book back on the shelf.)'
                 ]
               : [
                    '<32>{#p/human}* (You pick out a book...)',
                    '<23>{#p/papyrusnt}\"DEAR DAIRY, SANS HAS JUST BEEN MADE AN OFFICIAL ROYAL SENTRY.\"',
                    '<23>\"AT FIRST, I WAS CONFUSED AT HIM...\"',
                    '<23>\"AFTER ALL, WHY WOULD SOMEBODY SO LAZY WANT TO TAKE THIS ON?\"',
                    '<23>\"WELL, I DECIDED NOT TO QUESTION IT.\"',
                    '<23>\"THE TRUTH IS, I COULDN\'T BE MORE PROUD OF HIM!!!\"',
                    '<23>\"ONLY TIME WILL TELL WHAT GREAT THINGS THIS BRINGS FORTH.\"',
                    '<32>{#p/human}* (You put the book back on the shelf.)'
                 ]
      ),
      papcomputer1: pager.create(
         0,
         () =>
            postSIGMA()
               ? [ "<32>{#p/basic}* It's out of service." ]
               : [
                    ...(roomready()
                       ? [
                            "<18>{#p/papyrus}THE OUTERNET!\nI'M QUITE POPULAR THERE.",
                            "<18>{#f/4}I'M JUST A DOZEN AWAY...",
                            '<18>{#f/0}FROM A DOUBLE- DIGIT FOLLOWER COUNT!'
                         ]
                       : []),
                    SAVE.data.b.svr
                       ? '<32>{#p/human}* (You move towards the computer...)'
                       : "<32>{#p/basic}* The computer's web browser is opened to a social media site.",
                    choicer.create("* (Log in to Papyrus's account?)", 'Yes', 'No')
                 ],
         () =>
            postSIGMA()
               ? [ "<32>{#p/basic}* It's out of service." ]
               : [
                    SAVE.data.b.svr
                       ? '<32>{#p/human}* (You move towards the computer...)'
                       : "<32>{#p/basic}* The computer's web browser is opened to a social media site.",
                    choicer.create("* (Log in to Papyrus's account?)", 'Yes', 'No')
                 ]
      ),
      papcomputer2: [ '<32>{#p/human}* (You decide not to log in.)' ],
      papcomputer3: {
         a: 'COOLSKELETON95',
         b: '-2 FOLLOWERS',
         c: 'THIS ACCOUNT\nIS OWNED BY\nTHE GREAT\nPAPYRUS.\nHIGH-QUALITY\nPOSTS ONLY!',
         d: '- NEWS -',
         e: () =>
            world.runaway
               ? 'BREAKING:\n..\n..\n..\n.. WE ALL NEED\nTO LEAVE.'
               : SAVE.data.n.plot === 72
               ? 'BREAKING:\nWE CAN LEAVE.\nLIKE.. FOR REAL.\nSOURCE:\nLOOK OUTSIDE,\nPEOPLE!'
               : "BREAKING:\nMEW MEW STARFIRE\nIS.. SUPER BAD.\nSOURCE:\nLIKE, IT'S JUST\nTRUE?"
      },
      papcomputer4: [
         () =>
            world.runaway
               ? {
                    a: 'HOWDY!',
                    b: 'SAVE YOURSELVES...',
                    c: ''
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: 'HOWDY!',
                    b: 'FAILED TO CONNECT...',
                    c: ''
                 }
               : {
                    a: 'HOWDY!',
                    b: 'SHARE YOUR THOUGHTS...',
                    c: ''
                 },
         () =>
            world.runaway
               ? {
                    a: 'ALPHYS',
                    b: 'TODAY',
                    c: '< message deleted >'
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: 'SYSTEM',
                    b: 'TODAY',
                    c: 'The OuterNet is closed.'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: 'this is why i never go\nonline anymore... nothing\nmeaningful ever happens'
                 }
               : world.genocide
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: "but i'm a ghost..."
                 }
               : world.dead_skeleton
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: "umm... i'll just keep\nworking on this mix..."
                 }
               : {
                    a: 'lazybones.',
                    b: 'TODAY',
                    c: "let's just hope he\ndoesn't capture our SOULs~\n*finger guns*",
                    d: true
                 },
         () =>
            world.runaway
               ? {
                    a: 'lazybones.',
                    b: 'TODAY',
                    c: '< message deleted >',
                    d: true
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: 'ALPHYS',
                    b: 'TODAY',
                    c: 'whoops, i forgot to shut\noff the server'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: 'STRONGFISH91',
                    b: 'YESTERDAY',
                    c: 'uh... dont you say that\nEVERY day, Papyrus?'
                 }
               : world.genocide
               ? {
                    a: 'STRONGFISH91',
                    b: 'TODAY',
                    c: 'stay outta this blooky.\ni dont want you getting\nhurt too.'
                 }
               : world.dead_skeleton
               ? {
                    a: 'STRONGFISH91',
                    b: 'TODAY',
                    c: 'papyrus is gone blooky.\nthat human is going to\nPAY for what they did.'
                 }
               : {
                    a: 'STRONGFISH91',
                    b: 'TODAY',
                    c: 'well no...\nbut he did capture all of\nour hearts! FUHUHU!!'
                 },
         () =>
            world.runaway
               ? {
                    a: 'COOLSKELETON95',
                    b: 'TODAY',
                    c: '< message deleted >'
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '_Sp4ceAdv3ntur3r_',
                    b: 'TODAY',
                    c: '< Username Update >\nWas: _K1ll3rMann3qu1n_\nNow: _Sp4ceAdv3ntur3r_'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: 'COOLSKELETON95',
                    b: 'YESTERDAY',
                    c: "TODAY'S THE DAY I FINALLY\nCAPTURE A HUMAN!\nI CAN FEEL IT IN MY BONES!"
                 }
               : world.genocide
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: 'umm... is there anything\ni can do to help? things\nare getting worse...'
                 }
               : {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: 'so... did papyrus capture\na human yet? or...'
                 }
      ] as (() => { a: string; b: string; c: string; d?: boolean })[],
      papcomputer5: () =>
         world.runaway
            ? [ 'FRISK', "DON'T YOU", 'DARE COME', 'AFTER US' ]
            : SAVE.data.n.plot === 72
            ? [ 'SORRY', "BUT WE'RE", 'OFFLINE', 'LMAO' ]
            : [ 'REFRESH', 'MESSAGES', 'SETTINGS', 'LOG OUT' ],
      papcouch0: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to find anything in the couch.)" ]
            : [ "<32>{#p/basic}* It's been cleaned out." ],
      papcouch1: pager.create(
         0,
         () => [
            '<32>{#p/human}* (You hear a jangling sound within the couch.)',
            SAVE.data.b.svr
               ? '<32>{#p/human}* (It seems a cache of coins was left here...)'
               : '<32>{#p/basic}* There are a bunch of loose coins inside...',
            choicer.create('* (Take the coins?)', 'Yes', 'No')
         ],
         () => [
            SAVE.data.b.svr
               ? "<32>{#p/human}* (The coins within haven't moved from where they were.)"
               : '<32>{#p/basic}* The coins are still here.',
            choicer.create('* (Take the coins?)', 'Yes', 'No')
         ]
      ),
      papcouch2: [ '<32>{#p/human}* (You decide not to take anything.)' ],
      papcouch3: [ '<32>{#p/human}* (You found 10G.)' ],
      papcouch3a: [
         "<18>{#p/papyrus}{#f/1}YOU'RE CLEANING OUT THE COUCH FOR US!?",
         '<18>{#p/papyrus}{#f/5}AND OUT OF NOTHING BUT THE KINDNESS OF YOUR HEART...',
         '<18>{#p/papyrus}{#f/6}SUCH GENEROSITY!!!'
      ],
      paproom1: [
         '<18>{#p/papyrus}{#f/6}WHAT!?\nHOW DID YOU...',
         '<18>{#p/papyrus}{#f/5}YOU APPEARED RIGHT IN FRONT OF ME!'
      ],
      paproom2: [ '<18>{#p/papyrus}{#f/4}HAS SANS BEEN TEACHING YOU ABOUT SHORTCUTS...?' ],
      paproom3: [ '<18>{#p/papyrus}{#f/7}... UGH!\nSTOP DOING THAT!!' ],
      paproom4: [ "<18>{#p/papyrus}{#f/0}YOU'RE ASKING FOR TROUBLE, HUMAN." ],
      paproom5: [ '<18>{#p/papyrus}{#f/4}(SIGH...)' ],
      papdate0: () => [
         SAVE.data.b.flirt_papyrus
            ? "<18>{#p/papyrus}{#f/5}WOWIE, YOU'RE SO EAGER TO DATE..."
            : "<18>{#p/papyrus}{#f/5}WOWIE, YOU'RE SO EAGER TO HANG OUT WITH ME...",
         "<18>{#f/5}THAT YOU'RE TRYING TO GO IN MY HOUSE AHEAD OF ME!",
         "<18>{#f/6}THAT'S DEDICATION!"
      ],
      papdate1x: pager.create(
         0,
         [
            '<18>{#p/papyrus}{#f/0}HELLO, HUMAN!',
            '<18>{#f/5}I HOPE EVERYTHING IS ALRIGHT.',
            '<18>{#f/6}FEEL FREE TO TAKE A WALK AROUND TOWN...',
            '<18>{#f/0}... OR A LOOK IN MY HOUSE!'
         ],
         [ "<18>{#p/papyrus}{#f/4}JUST BE SURE TO AVOID SANS'S ROOM." ]
      ),
      papdate1: () => [
         SAVE.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}SO YOU CAME BACK TO HAVE A DATE WITH ME!'
            : '<18>{#p/papyrus}SO YOU CAME BACK TO SEE ME!',
         ...(world.dead_dog || world.population < 6
            ? [
                 "<18>{#f/0}THAT'S GREAT!!",
                 "<18>{#f/5}TRUTH BE TOLD, IT'S BEEN A LITTLE LONELY TODAY...",
                 '<18>{#f/5}A LOT OF PEOPLE ARE STRANGELY ABSENT...',
                 "<18>{#f/0}BUT YOU'RE STILL HERE!!",
                 '<18>{#f/0}THAT MEANS SOMETHING, RIGHT??'
              ]
            : [ '<18>{#f/4}YOU MUST BE REALLY SERIOUS ABOUT THIS...' ]),
         "<18>{#f/5}I'LL HAVE TO TAKE YOU SOMEPLACE REALLY SPECIAL...",
         '<18>{#f/0}A PLACE I LIKE TO SPEND A LOT OF TIME!!!'
      ],
      papdate2: [ '<18>{#p/papyrus}MY HOUSE!!!' ],
      papdate3: pager.create(
         0,
         [ '<18>{#p/papyrus}WELCOME TO SCENIC MY HOUSE!', '<18>ENJOY AND TAKE YOUR TIME!!!' ],
         [ "<18>{#p/papyrus}WHEN YOU'RE DONE, HEAD UPSTAIRS TO MY ROOM!" ]
      ),
      papdate3a: [ '<18>{#p/papyrus}{#f/6}WOW! BEING A GOOD HOST IS A REAL WORKOUT!' ],
      papdate3b: [
         "<18>{#p/papyrus}{#f/5}WOWIE, I CAN'T FEEL MY LEGS...",
         "<18>{#f/0}THAT MUST MEAN I'M BEING A GREAT HOST!!!"
      ],
      papdate4: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}THAT'S MY ROOM!",
            "<18>{#f/4}IF YOU'VE FINISHED LOOKING AROUND, WE COULD GO IN AND...",
            '<18>{#f/4}AND...',
            SAVE.data.b.flirt_papyrus
               ? '<18>{#f/9}DO WHATEVER PEOPLE DO WHEN THEY DATE!'
               : '<18>{#f/9}\"HANG OUT\" LIKE A PAIR OF VERY COOL FRIENDS!',
            choicer.create('* (What do you say?)', 'Yes', 'No')
         ],
         () => [ '<18>{#p/papyrus}READY?', choicer.create('* (What do you say?)', 'Yes', 'No') ]
      ),
      papdate4a: [ "<18>{#p/papyrus}OKAY, LET'S GO!" ],
      papdate4b: [ "<18>{#p/papyrus}I'LL KEEP WAITING HERE THEN!" ],
      papdate5: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}SO, UM...',
            "<18>{#f/5}IF YOU'VE SEEN EVERYTHING...",
            SAVE.data.b.flirt_papyrus
               ? '<18>{#f/6}DO YOU WANT TO START DATING?'
               : '<18>{#f/6}DO YOU WANT TO START HANGING OUT?',
            choicer.create('* (What do you say?)', 'Yes', 'No')
         ],
         () => [ '<18>{#p/papyrus}{#f/6}READY TO START?', choicer.create('* (What do you say?)', 'Yes', 'No') ]
      ),
      papdate5a: () => [
         SAVE.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}OKAY!!!\nDATING START!!!'
            : "<18>{#p/papyrus}OKAY!!!\nLET'S HANG TEN!!!"
      ],
      papdate5b: [ "<18>{#p/papyrus}TAKE YOUR TIME, I'LL WAIT FOR YOU." ],
      papdate6: () => [
         SAVE.data.b.flirt_papyrus
            ? '<#32>{#p/story}         DATING    START!'
            : '<#32>{#p/story}         HANGOUT   START!'
      ],
      papdate7: () => [
         '<15>{#p/papyrus}{#f/10}HERE WE ARE!!',
         SAVE.data.b.flirt_papyrus ? '<15>{#f/20}ON OUR DATE!!' : '<15>{#f/20}HANGING OUT!!',
         "<15>{#f/24}I'VE ACTUALLY NEVER DONE THIS BEFORE.",
         "<15>{#f/10}BUT DON'T WORRY!!!",
         '<15>{#f/20}PREPARATION IS MY (UNOFFICIAL) LAST NAME!'
      ],
      papdate8: () => [
         '<15>{#f/20}WHAT DO I HAVE HERE, YOU ASK?',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/10}AN OFFICIAL DATING GUIDE, STRAIGHT FROM THE LIBRARBY!'
            : '<15>{#p/papyrus}{#f/10}AN OFFICIAL HANGOUT GUIDE, STRAIGHT FROM THE LIBRARBY!',
         "<15>{#f/20}WITH THIS, WE'RE BOUND TO HAVE A GREAT TIME!"
      ],
      papdate9: () => [
         "<15>{#p/papyrus}{#f/25}LET'S SEE...",
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/25}STEP ONE: PRESS C OR CTRL TO OPEN THE {@fill=#f00}DATING HUD{@fill=#000}.'
            : '<15>{#f/25}STEP ONE: PRESS C OR CTRL TO OPEN THE {@fill=#f00}FRIENDSHIP HUD{@fill=#000}.'
      ],
      papdate10: () => [
         '<15>{#p/papyrus}{#f/24}... WAIT.',
         '<15>{#f/22}YOU ALREADY DID THAT!?!?',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/11}WOWIE, YOU MUST REALLY LOVE ME!'
            : '<15>{#f/11}WOWIE, YOU MUST REALLY LIKE ME!',
         "<15>{#f/10}IT'S ONTO STEP TWO, THEN!"
      ],
      papdate11: [
         '<15>{#p/papyrus}{#f/24}...',
         "<15>{#f/24}EH, WE DIDN'T NEED IT ANYWAY.",
         '<15>{#f/20}ONTO STEP TWO!'
      ],
      papdate12: [
         '<15>{#p/papyrus}{#f/11}WOWIE, I FEEL SO INFORMED!',
         "<15>{#f/24}IN FACT, I THINK WE'RE READY FOR STEP TWO..."
      ],
      papdate13: () => [
         SAVE.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/25}STEP TWO: ASK THEM ON A DATE.'
            : '<15>{#p/papyrus}{#f/25}STEP TWO: ASK THEM TO HANG OUT.'
      ],
      papdate13a: () => [
         '<15>{#f/24}\"AHEM.\"',
         '<15>{#f/20}HUMAN!\nI, THE GREAT PAPYRUS...',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/10}WOULD LIKE TO GO ON A DATE WITH YOU!'
            : '<15>{#f/10}WOULD LIKE TO HANG OUT WITH YOU!'
      ],
      papdate14: () => [ choicer.create('* (What do you say?)', 'Yes', 'No') ],
      papdate15a: [ '<15>{#p/papyrus}{#f/12}R-REALLY???', '<15>{#f/11}WOWIE!!!' ],
      papdate15a1: [ "<15>{#f/24}I GUESS THAT MEANS IT'S TIME FOR STEP THREE..." ],
      papdate15b: [ '<15>{#p/papyrus}{#f/21}OH...', '<15>{#f/27}F-FORTUNATELY, IT ONLY SAYS TO ASK.' ],
      papdate15c: [ "<15>{#f/24}WELL ANYWAY, IT'S TIME FOR STEP THREE..." ],
      papdate16: [ '<15>{#p/papyrus}{#f/25}STEP THREE: PUT ON NICE CLOTHES TO SHOW YOU CARE.' ],
      papdate16a: [ '<15>{#p/papyrus}{#f/24}...', '<15>{#f/24}WAIT A SECOND.' ],
      papdate17: () => [
         '<15>{#f/24}NICE CLOTHES...',
         (
            {
               spacesuit: "<15>{#f/26}THAT OLD SPACESUIT YOU'RE WEARING...",
               halo: '<15>{#f/26}THAT FANCY HALO ON YOUR HEAD...',
               eye: '<15>{#f/26}THAT FORCE FIELD AROUND YOU...',
               eye_x: '<15>{#f/26}THAT FORCE FIELD AROUND YOU...',
               temyarmor: "<15>{#f/26}THAT ARMOR YOU'RE WEARING...",
               goggles: '<15>{#f/26}THAT GADGET ON YOUR HEAD...',
               goggles_x: '<15>{#f/26}THAT GADGET ON YOUR HEAD...',
               visor: '<15>{#f/26}THAT VISOR IN FRONT OF YOUR EYES...',
               visor_x: '<15>{#f/26}THAT VISOR IN FRONT OF YOUR EYES...',
               sonic: "<15>{#f/26}THAT ODD DEVICE YOU'RE CARRYING...",
               heart_locket: '<15>{#f/26}THAT LOCKET AROUND YOUR NECK...'
            } as Partial<CosmosKeyed<string>>
         )[SAVE.data.s.armor] || '<15>{#f/26}THAT THING ON YOUR BODY...',
         "<15>{#f/20}YOU'RE WEARING CLOTHING RIGHT NOW!!!",
         '<15>{#f/24}AND NOT ONLY THAT...',
         '<15>{#f/20}EARLIER TODAY, YOU WERE ALSO WEARING CLOTHING!'
      ],
      papdate17a: () => [
         '<15>{#f/12}NO...!\nCOULD IT BE???',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/13}HAVE YOU WANTED TO DATE ME FROM THE VERY BEGINNING???'
            : '<15>{#f/13}HAVE YOU WANTED TO BEFRIEND ME FROM THE VERY BEGINNING???'
      ],
      papdate18a: () => [
         '<15>{#p/papyrus}{#f/22}NO!!',
         '<15>{#f/22}YOU PLANNED IT ALL!!!',
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/22}YOU MIGHT EVEN BE BETTER AT DATING THAN I AM!!!',
                 '<15>N-NOOOO!!!\nYOUR {@fill=#003cff}DATING POWER{@fill=#000}...!!!'
              ]
            : [
                 '<15>{#f/22}YOU MIGHT EVEN BE BETTER AT HANGING OUT THAN I AM!!!',
                 '<15>N-NOOOO!!!\nYOUR {@fill=#003cff}FRIENDSHIP POWER{@fill=#000}!!!'
              ])
      ],
      papdate18b: () => [
         '<15>{#p/papyrus}{#f/24}OH...',
         '<15>{#f/21}BUT DESPITE THAT...',
         '<15>{#f/21}YOU STILL CHOSE TO WEAR CLOTHING TODAY OF ALL DAYS...?',
         "<15>{#f/24}IT'S ALMOST LIKE...",
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/13}LIKE YOUR INTEREST IN ME WAS PREDESTINED~',
                 '<15>{#f/22}N-NOOOO!!!\nYOUR {@fill=#003cff}DATING POWER{@fill=#000}...!!!'
              ]
            : [
                 '<15>{#f/13}LIKE YOUR FRIENDSHIP WAS PREDESTINED~',
                 '<15>{#f/22}N-NOOOO!!!\nYOUR {@fill=#003cff}FRIENDSHIP POWER{@fill=#000}...!!!'
              ])
      ],
      papdate19: [ '<15>{#p/papyrus}{#f/15}NYEH!', '<15>{#f/15}NYEH HEH HEH!!!' ],
      papdate20: () => [
         "<15>{#p/papyrus}{#f/15}DON'T THINK YOU'VE BESTED ME YET!",
         '<15>{#f/20}I, THE GREAT PAPYRUS...',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/20}HAVE NEVER BEEN BEATEN AT DATING...'
            : '<15>{#f/20}HAVE NEVER BEEN BEATEN AT HANGING OUT...',
         '<15>{#f/15}AND I NEVER WILL!!',
         '<15>{#f/10}I CAN EASILY KEEP UP WITH YOU!!!',
         '<15>{#f/24}IN FACT...',
         '<15>{#f/20}I ALWAYS WEAR MY \"SPECIAL\" CLOTHES...',
         '<15>{#f/20}UNDERNEATH MY REGULAR ONES!!',
         '<15>{#f/15}BEHOLD!!'
      ],
      papdate21: [ '<15>{#p/papyrus}{#f/15}WHAT DO YOU THINK OF MY SECRET STYLE?' ],
      papdate22: () => [ choicer.create('* (What do you say?)', 'It rocks', 'It sucks') ],
      papdate23a: [ '<15>{#p/papyrus}{#f/13}NO!!!', '<15>{#f/13}A GENUINE COMPLIMENT...!' ],
      papdate23b: [ '<15>{#p/papyrus}{#f/13}NO!!!', '<15>{#f/13}A CRITICAL, YET HONEST REVIEW...!' ],
      papdate24: [
         '<15>{#p/papyrus}{#f/24}HOWEVER...',
         "<15>{#f/20}YOU DON'T TRULY UNDERSTAND THE {@fill=#f00}HIDDEN POWER{@fill=#000} OF THIS OUTFIT!",
         '<15>{#f/26}THEREFORE...'
      ],
      papdate24a: () => [
         '<15>{#f/15}WHAT YOU JUST SAID IS INVALID!!',
         SAVE.data.b.flirt_papyrus
            ? "<15>{#f/15}THIS DATE WON'T ESCALATE ANY FURTHER!"
            : "<15>{#f/15}THIS HANGOUT WON'T ESCALATE ANY FURTHER!",
         '<15>{#f/24}UNLESS...',
         '<15>{#f/20}YOU CAN FIND MY {@fill=#f00}SECRET{@fill=#000}.',
         "<15>{#f/15}BUT THAT WON'T HAPPEN!!"
      ],
      papdate24b: '* Move and inspect with [Z].',
      papdate25: [
         
         '<15>{#p/papyrus}{#f/21}THE WIG ON MY HEAD...?',
         '<15>{#f/16}THE WIG ON MY HEAD.',
         '<15>{#f/10}THE WIG... ON MY HEAD!!!',
         "<15>{#f/10}NYEH HEH HEH!\nTHAT'S VERY SIGNIFICANT INDEED!"
      ],
      papdate25a: [
         '<15>{#p/papyrus}{#f/21}OVERWHELMED BY THE SIGHT OF MY \"STELLAR\" OUTFIT?',
         '<15>{#f/24}NO, NO, I UNDERSTAND.',
         "<15>{#f/20}BUT YOU CAN'T BACK DOWN NOW!!!"
      ],
      papdate25b: [
         '<15>{#p/papyrus}{#f/26}THIS SHIRT DIDN\'T ORIGINALLY SAY \"STELLAR...\"',
         '<15>{#f/20}BUT I IMPROVED IT!',
         '<15>{#f/10}EXPERT TIP: ALL CLOTHING CAN BE IMPROVED THIS WAY.',
         "<15>{#f/20}... BUT THAT'S NOT A SECRET!\nTRY AGAIN!"
      ],
      papdate25c: [
         '<15>{#p/papyrus}{#f/24}I SEE, I SEE.',
         '<15>{#f/24}YOU LIKE FEELING MY ARM- PILLOWS WITH A FLOATING HEART.',
         "<15>{#f/20}BUT WHO DOESN'T!?\nTRY AGAIN!"
      ],
      papdate25d: [
         "<15>{#p/papyrus}{#f/13}HOLDING MY HAND SO I'LL TELL YOU THE ANSWER...?",
         '<15>{#f/14}N-NO, I MUST RESIST!!',
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25e: [
         "<15>{#p/papyrus}{#f/26}PILLOWS OR NOT, THERE'S NO SECRET TO MY LEGS.",
         '<15>{#f/10}ONLY HARD WORK AND PERSEVERANCE!',
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25f: [
         '<15>{#p/papyrus}{#f/24}THIS \"DRIP\" MAY BE UNDE- FEET-ABLE...',
         '<15>{#f/20}BUT EXPECTING A SECRET HERE IS TOTALLY UNREASONABLE!',
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25g: [
         '<15>{#p/papyrus}{#f/20}AH YES, MY TOP-OF-THE-LINE SPORTSWEAR!',
         "<15>{#f/24}YOU WON'T FIND ANY SECRETS HERE, THOUGH, BECAUSE...",
         "<15>{#f/20}I DON'T HAVE ANY POCKETS TO HIDE THEM IN!!!",
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25h: () => [
         '<15>{#p/papyrus}{#f/24}MY SHOULDERS...',
         '<15>{#f/10}ARE YOU ASKING FOR A PIGGYBACK RIDE??',
         SAVE.data.b.flirt_papyrus
            ? "<15>{#f/24}WELL, I'D GIVE IT TO YOU IF WE WEREN'T SO BUSY DATING."
            : "<15>{#f/24}WELL, I'D GIVE IT TO YOU IF WE WEREN'T SO BUSY HANGING OUT.",
         '<15>{#f/20}BUT WE ARE!\nSO TRY AGAIN!'
      ],
      papdate25i: [
         '<15>{#p/papyrus}{#f/14}SERIOUSLY??',
         "<15>{#f/19}I'M NOT JUST GOING TO -TELL- YOU THE SECRET...",
         "<15>{#f/20}YOU'LL HAVE TO TRY A LITTLE HARDER THAN THAT!"
      ],
      papdate25j: () =>
         calcLV() > 2
            ? [
                 '<15>{#p/papyrus}{#f/24}IF YOUR {@fill=#f00}LV{@fill=#000} IS THIS HIGH, THEN...',
                 SAVE.data.b.flirt_papyrus
                    ? '<15>{#f/28}YOUR {@fill=#f00}LOVE{@fill=#000} FOR ME MUST BE EVEN GREATER THAN I THOUGHT!'
                    : "<15>{#f/28}YOU'VE GOT MORE EXPERIENCE WITH {@fill=#f00}LOVE{@fill=#000} THAN I THOUGHT!",
                 "<15>{#f/24}STILL, THAT'S YOUR SECRET, NOT MINE.",
                 '<15>{#f/20}TRY AGAIN!'
              ]
            : calcLV() === 2
            ? [
                 '<15>{#p/papyrus}{#f/24}AN {@fill=#f00}LV{@fill=#000} OF TWO?',
                 '<15>{#f/27}DOES THAT MEAN...',
                 ...(SAVE.data.b.flirt_papyrus
                    ? [
                         '<15>{#f/28}YOU HAVE A SECRET SECOND {@fill=#f00}LOVE{@fill=#000} INTEREST...?',
                         '<15>{#f/20}WELL, THIS IS SUPPOSED TO BE ABOUT MY SECRET!!'
                      ]
                    : [
                         '<15>{#f/28}YOUR INTEREST IN ME IS SECRETLY TWO-FOLD?',
                         '<15>{#f/28}THAT DEEP DOWN, YOU {@fill=#f00}LOVE{@fill=#000} ME AS MUCH AS YOU LIKE ME?',
                         '<15>{#f/14}N-NO...!\nI WILL NOT SUCCUMB TO YOUR TRICKS!'
                      ]),
                 '<15>{#f/20}TRY AGAIN!'
              ]
            : SAVE.data.b.oops
            ? [
                 '<15>{#p/papyrus}{#f/24}AN {@fill=#f00}LV{@fill=#000} OF ONE?',
                 '<15>{#f/26}DOES THAT MEAN...',
                 "<15>{#f/28}THAT I'M YOUR ONE TRUE {@fill=#f00}LOVE{@fill=#000}...?",
                 ...(SAVE.data.b.flirt_papyrus
                    ? [ '<15>{#f/14}N-NO...!\nI WILL NOT SUCCUMB TO YOUR TRICKS!' ]
                    : [
                         "<15>{#f/24}WELL, THAT WOULDN'T MAKE SENSE IF WE'RE JUST FRIENDS.",
                         '<15>{#f/14}B-BUT... NO!\nI WILL NOT SUCCUMB TO YOUR TRICKS!'
                      ]),
                 '<15>{#f/20}TRY AGAIN!'
              ]
            : [
                 '<15>{#p/papyrus}{#f/24}AN {@fill=#f00}LV{@fill=#000} OF ZERO?',
                 "<15>{#f/26}OKAY, THAT'S WEIRD.",
                 "<15>{#f/21}SANS TOLD ME A HUMAN'S {@fill=#f00}LOVE{@fill=#000} STARTS AT ONE.",
                 '<15>{#f/24}HMM...',
                 '<15>{#f/24}IS THIS YOUR SECRET?',
                 '<15>{#f/20}WELL, THIS IS SUPPOSED TO BE ABOUT MY SECRET!',
                 '<15>{#f/20}TRY AGAIN!'
              ],
      papdate25k: () => [
         ...(SAVE.data.n.hp > calcHP()
            ? [
                 '<15>{#p/papyrus}{#f/22}WHAT!?\nAN HP EVEN -FULLER- THAN FULL!?',
                 '<15>{#f/10}YOU REALLY CAME PREPARED FOR ANYTHING!',
                 '<15>{#f/24}BUT THIS HAS NOTHING TO DO WITH MY SECRET.'
              ]
            : [
                 '<15>{#p/papyrus}{#f/24}YOUR HP MAY BE FULL, BUT WHEN IT COMES TO SECRETS...',
                 "<15>{#f/20}YOU'RE STILL RUNNING ON EMPTY!"
              ]),
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25l: [
         "<15>{#p/papyrus}{#f/20}SO THAT'S HOW IT IS...",
         '<15>{#f/24}YOU THINK BY SCRATCHING MY NECK...',
         '<15>{#f/21}AND CALLING ME A \"GOOD BOY...\"',
         "<15>{#f/24}I'LL BARK THE ANSWER AT YOU LIKE A DOG.",
         '<15>{#f/20}LAST I CHECKED, I WAS A SKELETON!\nSO TRY AGAIN!'
      ],
      papdate26: () => [
         '<15>{#p/papyrus}{#f/27}W-WELL THEN...',
         '<15>{#f/27}YOU FOUND MY SECRET!',
         '<15>{#f/24}I SUPPOSE I HAVE NO CHOICE BUT TO ADMIT THE TRUTH.',
         "<15>{#f/24}IT'S A PRESENT...",
         [ '<15>{#f/27}A PRESENT J-JUST FOR YOU!!!', '<15>{#f/27}A PRESENT FOR US TO SHARE!!!' ][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
         ],
         '<15>{#f/10}GO AHEAD!\nOPEN IT!'
      ],
      papdate27: () => [ choicer.create('* (What will you do?)', 'Open it', 'Do not') ],
      papdate28: [
         "<15>{#p/papyrus}{#f/21}YOU WON'T EVEN HARM MY DELICATE WRAPPING??",
         '<15>{#f/27}N-NO... THAT TECHNIQUE...',
         "<15>{#f/13}IT'S TOO MUCH!",
         '<15>{#f/14}B-BUT... AHA!\nCOUNTERATTACK!',
         "<15>{#f/15}I'LL OPEN THE PRESENT MYSELF!!"
      ],
      papdate29: [ '<15>{#p/papyrus}{#f/20}DO YOU KNOW WHAT -THIS- IS?' ],
      papdate30: () => [ choicer.create('* (Do you know what it is?)', 'Yes', 'No') ],
      papdate31a: [
         '<15>{#p/papyrus}{#f/26}SPAGHETTI.',
         "<15>{#f/24}THAT'S PROBABLY WHAT YOU'RE THINKING, ISN'T IT?",
         '<15>{#f/20}RIGHT!',
         '<15>{#f/15}BUT OH-SO-WRONG!'
      ],
      papdate31b: [
         "<15>{#p/papyrus}{#f/20}NYEH HEH HEH!\nTHAT'S RIGHT.",
         '<15>{#p/papyrus}{#f/15}YOU HAVE NO IDEA!',
         '<15>{#f/24}THOUGH THIS APPEARS TO BE SPAGHETTI...'
      ],
      papdate32: () => [
         "<15>{#p/papyrus}{#f/20}THIS ISN'T ANY PLAIN OL' PASTA!",
         "<15>{#f/20}THIS IS AN ARTISAN'S WORK!",
         '<15>{#f/24}SILKEN SPAGHETTI, FINELY AGED IN A TIME DILATION UNIT.',
         '<15>{#f/20}THEN PREPARED BY ME, MASTER CHEF PAPYRUS!',
         "<15>{#f/15}HUMAN!!!\nIT'S TIME TO END THIS!!",
         "<15>THERE'S NO WAY THIS CAN GO ANY FURTHER!",
         ...[ [ "<15>{#f/20}LET'S EAT THIS SPAGHETTI TOGETHER!!!" ], [ '<15>{#f/20}FEAST UPON MY ULTIMATE TECHNIQUE!!!' ] ][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
         ]
      ],
      papdate33: () => [ choicer.create('* (What will you do?)', 'Eat it', 'Do not') ],
      papdate33a: () => [
         '<32>{#p/human}* (You take a small bite.)\n* (You appear to be blushing from the taste.)',
         "<32>{#p/basic}* It's unbelievable...!",
         ...(SAVE.data.n.state_papyrus_spaghet === 1
            ? [ '<32>{#p/basic}* Papyrus seems to have enjoyed his bite just the same.' ]
            : [])
      ],
      papdate34a: () => [
         '<15>{#p/papyrus}{#f/10}WHAT A PASSIONATE EXPRESSION!!!',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/12}YOU MUST REALLY LOVE MY COOKING!'
            : '<15>{#f/12}YOU MUST REALLY LIKE MY COOKING!',
         ...[
            [
               '<15>{#f/24}WELL, I DID TOO...',
               SAVE.data.b.flirt_papyrus
                  ? '<15>{#f/20}BUT I THINK YOU LOVED IT EVEN MORE THAN ME!!!'
                  : '<15>{#f/20}BUT I THINK YOU LIKED IT EVEN MORE THAN ME!!!'
            ],
            [ '<15>{#f/10}AND BY EXTENSION, ME!', '<15>{#f/20}MAYBE EVEN MORE THAN I DO!!!' ]
         ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2],
         "<15>{#f/27}BUT... THAT'S IMPOSSIBLE...!",
         '<15>{#f/12}HOW DID YOU DO THAT!?!?'
      ],
      papdate34b: () => [
         '<15>{#p/papyrus}{#f/21}YOU MEAN...',
         "<15>{#f/18}YOU'RE LETTING ME HAVE IT INSTEAD?",
         ...[
            [
               '<15>{#f/24}I THOUGHT WHEN YOU SAID YOU WERE SHARING...',
               '<15>{#f/20}YOU WOULD AT LEAST WANT A LITTLE FOR YOURSELF.',
               '<15>{#f/27}BUT NO, ALL THIS TIME...',
               '<15>{#f/12}YOU WANTED ME, -ME-, TO HAVE IT ALL!!!'
            ],
            [
               '<15>{#f/21}EVEN AFTER WHAT YOU SAID BEFORE...',
               '<15>{#f/21}ABOUT WANTING MY SPAGHETTI FOR YOURSELF...',
               '<15>{#f/27}AT THE VERY PRECIPICE OF YOUR SATISFACTION, YOU...',
               '<15>{#f/12}YOU GAVE IT ALL UP FOR ME???'
            ]
         ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      papdate35: [ '<15>{*}{#p/papyrus}{#f/22}AUGH!!!{%15}' ],
      papdate36: [ '<15>{*}{#p/papyrus}{#f/22}URRRGH!!!{%15}' ],
      papdate37: [ '<15>{*}{#p/papyrus}{#f/22}NOOOOOOOO!!!{%15}' ],
      papdate38: () => [
         "<18>{#p/papyrus}{@random=1.1/1.1}HUMAN.\nIT'S CLEAR NOW.",
         SAVE.data.b.flirt_papyrus
            ? "<18>{@random=1.1/1.1}YOU'RE MADLY IN LOVE WITH ME."
            : "<18>{@random=1.1/1.1}YOU'RE COMPLETELY OBSESSED WITH ME.",
         '<99>{@random=1.1/1.1}EVERYTHING YOU DO.\nEVERYTHING YOU SAY.',
         "<18>{@random=1.1/1.1}IT'S ALL BEEN FOR MY SAKE.",
         '<18>{@random=1.1/1.1}HUMAN.\nI WANT YOU TO BE HAPPY, TOO.',
         "<18>{@random=1.1/1.1}IT'S TIME FOR ME TO EXPRESS MY FEELINGS...",
         "<18>{@random=1.1/1.1}IT'S TIME I TOLD YOU THE TRUTH."
      ],
      papdate39: () =>
         SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/21}HUMAN, THE TRUTH IS...',
                 "<15>{#f/21}I JUST DON'T LIKE YOU THE WAY YOU LIKE ME.",
                 '<15>{#f/24}ROMANTICALLY, I MEAN.',
                 '<15>{#f/27}I MEAN, I TRIED VERY HARD TO!',
                 '<15>{#f/27}I THOUGHT THAT BECAUSE YOU HAD FLIRTED WITH ME...',
                 '<15>{#f/27}THAT I WAS SUPPOSED TO GO ON A DATE WITH YOU.',
                 '<15>{#f/10}THEN, ON OUR DATE, FEELINGS WOULD BLOSSOM FORTH!!!',
                 '<15>{#f/20}I WOULD BE ABLE TO MATCH YOUR PASSION FOR ME!',
                 '<15>{#f/21}BUT ALAS...\nI, THE GREAT PAPYRUS...',
                 '<15>{#f/21}HAVE FAILED.',
                 '<15>{#f/21}I FEEL JUST THE SAME AS BEFORE.',
                 '<15>{#f/27}AND THE WORST PART IS, BY DATING YOU...',
                 '<15>{#f/22}I HAVE ONLY DRAWN YOU DEEPER INTO YOUR LOVE!',
                 '<15>{#f/21}A DARK PRISON OF PASSION FROM WHICH THERE IS NO ESCAPE.',
                 '<15>{#f/27}HOW COULD I HAVE DONE THIS TO MY DEAR FRIEND...?',
                 '<15>{#f/27}...',
                 '<15>{#f/27}... NO...'
              ]
            : [ '<15>{#f/24}HUMAN, THE TRUTH IS...' ],
      papdate39a: () => [
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 "<15>{#f/20}NO!\nTHAT'S WRONG!",
                 "<15>{#f/17}I CAN'T FAIL AT ANYTHING!!!",
                 "<15>{#f/20}HUMAN!!!\nI'LL HELP YOU THROUGH THESE TRYING TIMES!!!",
                 "<15>{#f/24}I'LL KEEP BEING YOUR COOL FRIEND...",
                 '<15>{#f/20}AND WE CAN FORGET THIS EVER HAPPENED.',
                 '<15>{#f/10}AFTER ALL, YOU, TOO, ARE VERY GREAT.',
                 '<15>{#f/20}IT WOULD BE TRAGIC TO LOSE YOUR FRIENDSHIP!',
                 '<15>{#f/21}SO, PLEASE....',
                 "<15>{#f/21}DON'T CRY BECAUSE I CAN'T KISS YOU.",
                 "<15>{#f/19}BESIDES, I DON'T EVEN HAVE LIPS!!!",
                 ...(SAVE.data.n.plot < 48
                    ? [
                         "<15>{#f/10}AND HEY, SOMEDAY, YOU'LL FIND SOMEONE JUST AS GREAT.",
                         "<15>{#f/24}WELL, NO.\nTHAT'S NOT TRUE.",
                         "<15>{#f/20}BUT I'LL HELP YOU SETTLE FOR SECOND BEST!!!"
                      ]
                    : [ "<15>{#f/10}AND HEY, UNDYNE'S NOT TOO FAR FROM HERE.", '<15>{#f/20}WE CAN HANG OUT WITH HER!' ])
              ]
            : [
                 '<15>{#f/10}I LIKE YOU TOO!',
                 '<15>{#f/10}YOU ARE A VERY NICE PERSON, AFTER ALL.',
                 '<15>{#f/21}BUT, MAYBE...',
                 "<15>{#f/21}YOU'D BE BETTER OFF IF YOU LIVED MORE FOR YOUR OWN SAKE.",
                 '<15>{#f/21}RATHER THAN JUST FOR MINE.',
                 '<15>{#f/10}FORTUNATELY, I KNOW THE SOLUTION!!!',
                 '<15>{#f/20}A HANGOUT WITH MY BOSS, UNDYNE!!!',
                 '<15>{#f/24}I THINK IF YOU SPREAD OUT YOUR FRIEND ENERGY A BIT MORE...',
                 "<15>{#f/10}YOU'D LEAD A MUCH HEALTHIER LIFESTYLE.",
                 ...(SAVE.data.n.plot < 48
                    ? [ "<15>{#f/20}I'LL LET YOU KNOW WHEN I'M READY!" ]
                    : [ "<15>{#f/20}SO LET'S DO IT!\nTOGETHER!!" ])
              ]),
         '<15>{#f/20}NYEH HEH HEH HEH HEH!!!'
      ],
      papdate40: () => [
         '<15>{#f/24}OH, AND IF YOU EVER NEED TO REACH ME...',
         "<15>{#f/10}HERE'S MY {@fill=#f00}PHONE NUMBER{@fill=#000}.",
         '<15>{#f/11}FEEL FREE TO CALL ME AT ANY TIME!',
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/24}PLATONICALLY, OF COURSE.',
                 ...(SAVE.data.n.plot < 48
                    ? [ '<15>{#f/10}WELL, GOTTA GO!' ]
                    : [ "<15>{#f/10}WELL, SEE YOU AT UNDYNE'S HOUSE!" ])
              ]
            : SAVE.data.n.plot < 48
            ? [ '<15>{#f/20}WELL, GOTTA GO!' ]
            : [ "<15>{#f/20}WELL, SEE YOU AT UNDYNE'S HOUSE!" ]),
         '<15>{#f/20}NYEH HEH HEH!'
      ],
      papdate41: {
         a: () => (SAVE.data.b.flirt_papyrus ? 'ROMANCE' : 'FRIENDSHIP'),
         b: 'POWER\nLEVELS',
         c: 'DATE: K-615.09',
         d: 'SPEED',
         e: 'GALAXY\nMAP',
         f: 'TENSION'
      },
      pappuzzle1: [
         '<18>{#p/papyrus}{#f/0}HUMAN!',
         '<18>{#f/0}THIS NEXT PUZZLE IS ONE OF MY FAVORITES.',
         "<18>{#f/4}IT'S LIKE MY BROTHER'S COTTON BALL COLLECTION...",
         '<18>{#f/0}AN ODDLY SATISFYING SERIES OF OBJECTS!',
         "<18>{#f/9}I'LL -TRY- NOT TO GIVE AWAY THE SOLUTION."
      ],
      pappuzzle1a: [ '<18>{#p/papyrus}{#f/0}HAVE AT IT!' ],
      pappuzzle1b: [
         '<18>{#p/papyrus}{#f/4}IT WOULD APPEAR THIS PUZZLE HAS BEEN SOLVED.',
         '<18>{#p/papyrus}{#f/4}BEHIND MY BACK.',
         '<18>{#p/papyrus}{#f/4}WITHOUT MY EXPRESS PERMISSION.',
         "<18>{#p/papyrus}{#f/0}WELL, SOMEBODY'S GOING TO HAVE A BAD DAY TODAY.",
         '<18>{#p/papyrus}{#f/5}...',
         '<18>{#p/papyrus}{#f/5}WITH ANY LUCK, THE NEXT PUZZLE WILL BE TAMPER-FREE.',
         "<18>{#p/papyrus}{#f/6}... I'LL MEET YOU IN THE NEXT ROOM."
      ],
      pappuzzle2: [ '<18>{#p/papyrus}WOW!\nYOU SOLVED IT!!' ],
      pappuzzle2a: [ '<18>AND YOU DID IT ALL WITHOUT MY HELP!!!' ],
      pappuzzle2b: [ "<18>AND I DIDN'T EVEN HAVE TO HELP YOU THAT MUCH!" ],
      pappuzzle2c: [ '<18>IT TOOK A BIT OF ENCOURAGEMENT, BUT YOU REALLY DID IT!' ],
      pappuzzle2d: [
         '<18>YOU MUST CARE ABOUT PUZZLES LIKE I DO!',
         "<18>WELL, I'M SURE YOU'LL LOVE THE NEXT PUZZLE, THEN!",
         '<18>IT MIGHT EVEN BE TOO EASY FOR YOU!!',
         '<18>NYEH!\nHEH HEH!\nHEHEHEH!!!'
      ],
      papsink0: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The dog residue in this sink appears to be arranged in the shape of a heart.)',
                 '<32>* (Somehow, this seems to put you at ease.)'
              ]
            : SAVE.data.n.plot < 72
            ? [ "<32>{#p/basic}* The sink is so tall, you can't even wash your hands..." ]
            : [ "<32>{#p/basic}* There's a pile of dog residue in the sink." ],
      papsink1: [
         '<18>{#p/papyrus}{#f/9}IMPRESSED?\nI INCREASED THE HEIGHT OF MY SINK.',
         '<18>{#f/0}NOW I CAN FIT MORE BONES UNDER IT!\nTAKE A LOOKSY!'
      ],
      papsink2: [ '<18>{#p/papyrus}{#f/8}NOO, THE DOG!' ],
      papsink3: [ '<18>{#p/papyrus}{#f/31}OH, YOU POOR, POOR PUPPY...', '<18>{#f/9}HERE, HAVE MY SPECIAL ATTACK!' ],
      papsink4: [ '<18>{#p/papyrus}WOW!!!\nIT LOVES IT!!!' ],
      papsink5: [ '<18>{#p/papyrus}{#f/7}SANS!', '<18>STOP PLAGUING MY LIFE WITH INCIDENTAL MUSIC!!' ],
      papsink6: [ '<18>{#p/papyrus}{#f/4}AND NOW THE DOG HAS DISAPPEARED WITH MY ATTACK.', '<18>OH WELL...' ],
      papsolu1: [
         '<18>{#p/papyrus}YOU LOOK LIKE YOU NEED A HINT.',
         '<18>{#f/4}HMM...',
         "<18>{#f/0}WELL, I'D PAY ATTENTION TO THE CIRCUITS.",
         "<18>{#f/0}BUT THAT'S JUST ME."
      ],
      papsolu2: [
         '<18>{#p/papyrus}{#f/5}STILL CONFUSED?',
         '<18>{#f/5}UM... MAYBE...',
         '<18>{#f/6}USE THE CIRCUITS AS A GUIDE TO THE SEQUENCE???',
         "<18>{#f/5}I'M TRYING VERY HARD NOT TO SPOIL IT..."
      ],
      papsolu3: [
         '<18>{#p/papyrus}{#f/6}STILL???',
         '<18>{#f/0}I MEAN, I COULD TOTALLY GIVE YOU THE SOLUTION.',
         "<18>{#f/4}I DON'T WANT TO SPOIL THE FUN, THOUGH..."
      ],
      papsolu3a: () => [
         '<18>{#p/papyrus}{#f/9}DO YOU ABSOLUTELY, DAPSOLUTELY WANT THE SOLUTION???',
         choicer.create('* (What do you say?)', 'Yes', 'No')
      ],
      papsolu3a1: () => [
         '<18>{#p/papyrus}THE! SOLUTION! IS!',
         '<18>{#f/4}(PLEASE IMAGINE A DRUMROLL IN YOUR HEAD...)',
         SAVE.data.b.s_state_pretrick
            ? '<18>{#f/0}... THAT TERMINAL AT THE BOTTOM LEFT OF THE ROOM!'
            : '<18>{#f/0}... THAT HOLO-TREE NEXT TO THE LAMP ON YOUR RIGHT!',
         '<18>CHECK IT OUTIE!!!'
      ],
      papsolu3a2: [
         "<18>{#p/papyrus}WOW... YOU'RE TRULY A PUZZLE PASSIONEER!",
         "<18>I'M ENTHUSED BY YOUR ENTHUSIASM!",
         '<18>YOU CAN DO IT, HUMAN!!!'
      ],
      papsolu4: [ "<18>{#p/papyrus}{#f/4}DON'T YOU REMEMBER THE SOLUTION I GAVE YOU...?" ],
      papsolu5: [ '<18>{#f/0}{#p/papyrus}ALMOST DONE!\nONLY ONE CIRCUIT LEFT TO ACTIVATE!' ],
      papspaghet1: (take: boolean) => [
         '<18>{#p/papyrus}{#f/1}WHAT!?\nHOW DID YOU AVOID MY TRAP?',
         '<18>{#f/4}AND, MORE IMPORTANTLY...',
         '<18>{#f/0}IS THERE ANY LEFT FOR ME???',
         choicer.create('* (What do you tell Papyrus\n  about his spaghetti?)', take ? 'Took it' : 'Left it', 'Ate it'),
         '<18>{#p/papyrus}REALLY!?'
      ],
      papspaghet1a: () => [
         '<18>{#p/papyrus}{#f/1}WHAT!?\nHOW DID YOU AVOID MY TRAP?',
         '<18>{#f/4}AND, MORE IMPORTANTLY...',
         '<18>{#f/0}IS THERE ANY LEFT FOR...',
         '<18>{#f/4}... WAIT.',
         "<18>{#f/0}IT'S RIGHT THERE IN YOUR ITEMS!!",
         '<18>{#f/9}WHAT WERE YOU PLANNING, HUMAN?',
         choicer.create("* (What will you do with\n  Papyrus' spaghetti?)", 'Share it', 'Eat it'),
         '<18>{#p/papyrus}REALLY!?'
      ],
      papspaghet2a: [
         "<18>{#f/5}YOU'D RESIST THE FLAVOR OF MY HOME- COOKED PASTA...",
         '<18>{#f/6}JUST SO YOU COULD SHARE IT WITH ME???',
         '<18>{#f/9}WELL THEN!!',
         '<18>FRET NOT HUMAN!\nFOR I, MASTER CHEF PAPYRUS...',
         '<18>WILL MAKE US ALL THE PASTA WE COULD EVER WANT!',
         '<18>{#f/0}HEH HEH HEH HEH HEH HEH NYEH!'
      ],
      papspaghet2b: [
         '<18>{#f/5}WOWIE...',
         '<19>{#f/6}FEW HAVE EVER ENJOYED MY COOKING LIKE THAT BEFORE...',
         '<18>{#f/9}WELL THEN!!',
         '<18>FRET NOT HUMAN!\nFOR I, MASTER CHEF PAPYRUS...',
         '<18>WILL MAKE YOU ALL THE PASTA YOU COULD EVER WANT!',
         '<18>{#f/0}HEH HEH HEH HEH HEH HEH NYEH!'
      ],
      paptv: pager.create(
         0,
         () => [
            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
               ? [ "<18>{#p/papyrus}OOH, IT'S MY FAVORITE TV SHOW!" ]
               : []),
            ...(SAVE.data.n.plot < 67.1
               ? [ '<33>{#p/mettaton}* \"STAY TUNED FOR A NEW PROGRAM!\"' ]
               : SAVE.data.b.killed_mettaton
               ? [ '<33>{#p/mettaton}* \"NETWORK UNREACHABLE.\"' ]
               : world.bad_robot
               ? [ '<33>{#p/mettaton}* \"SORRY, FOLKS!\"\n* \"THE PROGRAM\'S BEEN CANCELLED!\"' ]
               : [ '<32>{#p/mettaton}* \"HOPE YOU ENJOYED THE SHOW!\"' ]),
            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
               ? [
                    "<18>{#p/papyrus}{#f/7}WHAT!!!\nIT'S USUALLY BETTER THAN THIS!",
                    '<18>{#f/4}THIS IS JUST A BAD EPISODE.',
                    "<18>{#f/7}DON'T JUDGE ME!!!"
                 ]
               : [])
         ],
         [ '<33>{#p/mettaton}* \"STAY TUNED FOR A NEW PROGRAM!\"' ]
      ),
      papyrus1: [ '<18>{#p/papyrus}SO, AS I WAS SAYING ABOUT UNDYNE...' ],
      papyrus2: [
         '<18>{#p/papyrus}SANS!!\nOH MY GOD!!\nIS THAT...',
         '<18>A HUMAN!?!?',
         "<25>{#p/sans}{#f/2}* nah, it's just a human shaped hologram."
      ],
      papyrus3: [
         '<18>{#p/papyrus}{#f/4}OH.',
         '<18>{#f/4}...',
         '<18>{#f/4}WAIT...',
         "<18>{#f/7}YOU'RE LYING!!",
         '<25>{#p/sans}{#f/2}* sorry, meant to say \"hologram-shaped human.\"',
         '<18>{#p/papyrus}{#f/0}... SANS, WE FINALLY DID IT!',
         '<18>{#f/9}UNDYNE -HAS- TO LET ME INTO THE ROYAL GUARD NOW!!!',
         '<18>{#f/6}WE JUST HAVE TO...',
         '<18>{#f/5}TO...',
         '<18>{#f/4}...',
         "<18>{#f/4}I'M FORGETTING SOMETHING.",
         '<25>{#p/sans}{#f/2}* the speech, remember?',
         '<18>{#p/papyrus}{#f/4}OH, RIGHT.\n...\"AHEM.\"',
         "<18>{#f/9}HUMAN! YOU MAY THINK YOU'RE SAFE OUT HERE...",
         '<18>{#f/9}BUT I, THE GREAT PAPYRUS, INTEND TO CHANGE THAT!',
         "<18>{#f/4}FIRST, I'LL DAZZLE YOU WITH DR. ALPHYS' PUZZLES...",
         '<18>{#f/4}AND THEN, WHEN YOU LEAST EXPECT IT...',
         '<19>{#f/9}WHAM!\nCAPTURED!\nOFF TO THE CITADEL!',
         '<18>{#f/9}OUR BATTLE WILL BE AS LEGENDARY AS THEY COME!',
         '<18>{#f/4}IN ANY CASE...',
         '<18>{#f/9}CONTINUE... ONLY IF YOU DARE!!!'
      ],
      papyrus4: [ '<18>{#f/0}NYEH HEH HEH HEH HEH HEH HEH HEH!!!' ],
      papyrus5: [
         '<25>{#p/sans}* well, that went well.',
         "<25>* don't sweat it, bud.",
         "<25>{#f/2}* i'll keep an eyesocket out for ya."
      ],
      papyrus6x1: [ '<18>{#p/papyrus}{#f/5}H-HUMAN?\nIS THAT YOU...?' ],
      papyrus6x2: [
         "<18>{#p/papyrus}{#f/1}OH MY GOD!!!\nIT REALLY IS YOU, ISN'T IT!?!?",
         "<18>{#p/papyrus}{#f/0}I'VE BEEN EXCITED TO MEET YOU SINCE I HEARD ABOUT YOU!",
         "<18>{#p/papyrus}{#f/4}... AS FOR WHY I'M ONLY HERE NOW?",
         '<18>{#p/papyrus}{#f/6}WELL, I HAVE REASON TO BELIEVE...',
         '<18>{#p/papyrus}{#f/5}... MY BROTHER HAS BEEN TRYING TO KEEP YOU FROM ME.',
         '<18>{#p/papyrus}{#f/7}TYPICAL!!!',
         '<18>{#p/papyrus}{#f/0}BUT OUR LITTLE ALLIANCE CAN BE OUR LITTLE SECRET.',
         "<18>{#p/papyrus}{#f/9}HE DOESN'T HAVE TO KNOW A -DAMN- THING ABOUT IT!"
      ],
      papyrus6x3: [
         "<18>{#p/papyrus}{#f/5}GUESS I BETTER GO BEFORE HE FINDS OUT I'M HERE.",
         "<18>{|}{#p/papyrus}{#f/9}I'LL CATCH UP WITH YOU SOON, HU- {%}"
      ],
      papyrus6x4: [ '<32>{#p/without}* ... papyrus?' ],
      papyrus6: () => [
         '<18>{#p/papyrus}{#f/9}HUMAN!!',
         world.nootflags.has('s_puzzle2') // NO-TRANSLATE

            ? '<18>{#f/4}YOU MAY HAVE HAD AN EASY TIME BEFORE.'
            : '<18>{#f/4}YOU MAY HAVE PASSED MY OTHER CHALLENGES.',
         "<18>{#f/9}BUT NOW YOU WILL SURELY MEET YOUR WIT'S END!",
         '<18>FOR YOU SEE, THIS PUZZLE WAS MADE BY NONE OTHER...',
         '<18>{#f/0}THAN THE AMAZING DR. ALPHYS!',
         '<18>THE RULES ARE QUITE SIMPLE, REALLY.',
         '<18>THIS DISPLAY WILL READ OUT A NUMBER AT RANDOM.',
         '<18>{#f/9}... THE NUMBER OF SECONDS UNTIL YOU CAN PASS!',
         '<18>{#f/0}IF THE NUMBER IS ODD, YOU MUST DODGE PROJECTILES.',
         '<18>NUMBERS ENDING IN 1 GIVE YOU STAR- SHAPED ONES...',
         '<18>NUMBERS ENDING IN 3 GIVE YOU MOON- SHAPED ONES...',
         '<18>{#f/4}5 GIVES YOU COMETS, 7 GIVES YOU QUASARS...',
         "<18>{#f/9}AND IF IT ENDS IN A 9, IT'S ENTIRELY RANDOM!",
         '<18>{#f/0}IF THE NUMBER IS PRIME, THE GRAVITY WILL FLIP.',
         "<18>{#f/4}(ALTHOUGH, PRIMES BELOW TEN DON'T OFTEN TRIGGER IT.)",
         '<18>{#f/0}IF THE NUMBER IS EVEN, YOU WILL BE FINE AT FIRST...',
         '<18>{#f/9}BUT RANDOM MONSTER ENCOUNTERS WILL OCCUR!',
         '<18>ALSO, POWERS OF TWO WILL DOUBLE THE FREQUENCY!!',
         '<18>{#f/0}IF THE NUMBER REPEATS THE SAME DIGIT TWICE...',
         '<18>{#f/0}THE WAIT TIME WILL BE MULTIPLIED BY SAID DIGIT!',
         '<18>{#f/0}IF THE NUMBER IS A RUN, I.E. 1-2-3...',
         '<18>{#f/0}THE ROOM WILL SHAKE, CAUSING YOU TO STUMBLE!',
         '<18>{#f/0}AND IF THE NUMBER CONTAINS A 4 AT ALL...',
         '<18>{#f/9}SANS WILL RANDOMLY LEVITATE YOU WITH BLUE MAGIC!',
         "<25>{#p/sans}{#f/6}* check it out, it's my special yellow eye.",
         '<18>{#p/papyrus}{#f/7}NOT NOW, SANS!!',
         '<25>{#p/sans}* oh, heheh.\n* guess i got a little {@fill=#ff0}carried away{@fill=#fff}, huh?',
         '<18>{#p/papyrus}{#f/4}YEAH, YEAH...',
         '<18>{#f/9}WELL!\nDO YOU UNDERSTAND THE EXPLANATION?',
         choicer.create('* (What do you say?)', 'Yes', 'No')
      ],
      papyrus7: () => [
         "<18>{#p/papyrus}{#f/9}WELL, LET'S REVIEW THEN!",
         '<18>{#f/0}THIS DISPLAY GENERATES A RANDOM NUMBER OF SECONDS.',
         '<18>AKA, HOW LONG YOU MUST WAIT TO PASS THROUGH.',
         '<18>ODD NUMBERS MEAN DODGING PROJECTILES.',
         "<18>THE NUMBER'S LAST DIGIT DETERMINES THE TYPE.",
         '<18>1 FOR STARS, 3 FOR MOONS, 5 FOR QUASARS, 7 FOR...',
         '<18>{#f/5}WAIT, WHICH NUMBER WAS FOR QUASARS AGAIN??',
         '<18>{#f/9}UH, WELL, IF IT ENDS IN 9, THE TYPE IS RANDOM!',
         '<18>{#f/0}PRIME NUMBERS SHIFT THE GRAVITY AROUND...',
         '<18>{#f/0}EVEN NUMBERS TRIGGER RANDOM ENCOUNTERS...',
         '<18>{#f/5}WAIT, DID I SAY THE GRAVITY SHIFTS!?,',
         '<18>{#f/7}UGH, I MEANT TO SAY IT FLIPS!!',
         '<18>{#f/0}BUT POWERS OF TWO DOUBLE THE ENCOUNTER RATE.',
         '<18>RUNS CAUSE THE ROOM TO SHAKE, AND 4 MEANS...',
         '<18>{#f/6}UH, I THINK I FORGOT WHAT 4 MEANS.',
         "<25>{#p/sans}* wasn't that supposed to be my cue?",
         '<18>{#p/papyrus}{#f/6}MAYBE???',
         '<18>{#f/7}WHATEVER!!\nDO YOU UNDERSTAND IT NOW!?',
         choicer.create('* (What do you say?)', 'Sure', 'Even less')
      ],
      papyrus8: [
         '<18>{#p/papyrus}{#f/9}WELL... THEN...',
         "<18>{#f/9}YOU KNOW WHAT, I'LL LEAVE THE INSTRUCTIONS HERE!",
         '<18>{#f/0}THEN, YOU CAN READ THEM AT YOUR OWN PACE.',
         '<18>GOOD LUCK, HUMAN!!',
         '<18>{#f/5}NYEH... HEH HEH...'
      ],
      papyrus9: [
         '<18>{#p/papyrus}{#f/9}FEVKALADE O HALDE!',
         '<18>{#f/9}WELL, WITHOUT FURTHER ADO...',
         "<18>LET'S FIND OUT WHAT OUR RANDOM NUMBER WILL BE!!"
      ],
      papyrus10: [
         '<18>{#p/papyrus}{#f/9}HUMAN!',
         '<18>{#f/9}ARE YOU READY FOR YOUR GREATEST CHALLENGE YET?',
         '<18>{#f/9}INTRODUCING... THE GAUNTLET OF DEADLY TERROR!'
      ],
      papyrus11: [
         '<18>{#p/papyrus}{#f/9}ONCE I GIVE THE WORD, IT WILL FULLY ACTIVATE!',
         '<18>LASERS WILL FIRE!\nCOILS WILL CHARGE!\nBLADES WILL SLICE!',
         '<18>ALL IN A PRECISE AND TACTICAL MANNER!',
         '<18>{#f/4}WITHOUT PERFECT ACCURACY, YOU WILL SURELY FAIL.',
         '<18>{#f/9}NOW!!!\nARE YOU READY!?!?',
         '<18>BECAUSE!',
         '<18>I!',
         '<18>AM!',
         '<18>ABOUT!',
         '<18>TO DO IT!'
      ],
      papyrus12: [
         '<25>{#p/sans}* well?\n* are we doing this thing or what?',
         '<18>{#p/papyrus}{#f/7}...',
         "<25>{#p/sans}{#f/3}* that annoying dog's going to get impatient up there.",
         '<18>{#p/papyrus}{#f/7}ANY SECOND NOW!'
      ],
      papyrus13: [
         '<25>{#p/sans}* ready when you are.',
         '<18>{#p/papyrus}{#f/6}I...',
         "<18>{#f/6}I'M STARTING TO THINK THAT...",
         '<18>{#f/6}MAYBE...',
         '<18>{#f/6}THIS CHALLENGE...',
         '<18>{#f/6}...',
         '<18>{#f/4}... WAS A BIT OF A BAD IDEA.',
         '<18>{#f/5}TO THINK I CREATED SUCH A HARMFUL CHALLENGE...',
         '<18>{#f/9}BUT, HAVE NO FEAR!',
         '<18>{#f/9}I AM A SKELETON WITH STANDARDS!',
         '<18>{#f/4}AND, FRANKLY, A CHALLENGE YOU CANNOT SURVIVE...',
         '<18>{#f/7}IS A CHALLENGE FAR TOO CONTRIVED!',
         '<18>AWAY IT GOES!!'
      ],
      papyrus14: [
         '<18>{#p/papyrus}{#f/7}WHAT ARE YOU LOOKING AT!?',
         '<18>{#f/9}THIS WAS ANOTHER DECISIVE VICTORY FOR PAPYRUS!!',
         '<18>NYEH!',
         '<18>HEH!',
         '<18>{#f/4}...',
         '<18>... HEH?'
      ],
      papyrusFinal1: [
         '<23>{#p/papyrus}{#f/30}HUMAN.',
         '<23>ALLOW ME TO TELL YOU ABOUT SOME COMPLEX FEELINGS.',
         '<23>FEELINGS LIKE...'
      ],
      papyrusFinal2: () =>
         world.genocide
            ? [
                 '<23>THE SADNESS OF LOSING SOMEONE SPECIAL.',
                 '<23>THE GUILT OF NOT BEING ABLE TO SAVE THEM.',
                 '<23>THE DESIRE TO SEE THEM ONE LAST TIME.',
                 '<23>THESE FEELINGS...'
              ]
            : papreal()
            ? [
                 '<23>THE STRESS OF KNOWING SO MANY PEOPLE HAVE BEEN KILLED.',
                 "<23>THE HOPELESSNESS OF THINKING YOU CAN'T DO ANYTHING TO STOP IT.",
                 '<23>THE DESIRE TO MAKE A CHANGE FOR THE BETTER.',
                 '<23>THESE FEELINGS...'
              ]
            : [
                 '<23>THE JOY OF FINDING ANOTHER PASTA LOVER.',
                 "<23>THE ADMIRATION FOR ANOTHER'S PUZZLE- SOLVING SKILLS.",
                 '<23>THE DESIRE TO HAVE A COOL, SMART PERSON THINK YOU ARE COOL.',
                 '<23>THESE FEELINGS...'
              ],
      papyrusFinal3: () =>
         world.genocide || papreal()
            ? [
                 '<18>{#f/31}THEY MUST BE WHAT YOU ARE FEELING, RIGHT NOW.',
                 '<18>{#f/32}I CAN HARDLY IMAGINE WHAT THAT MUST FEEL LIKE...',
                 '<18>{#f/6}AFTER ALL, I AM VERY... GREAT...',
                 '<18>{#f/32}{#x1}...',
                 '<18>{#f/31}DESPITE EVERYTHING THAT HAS HAPPENED, I STILL...',
                 '<18>{#f/5}I STILL BELIEVE IN YOU, HUMAN.',
                 '<18>{#f/31}I KNOW YOU CAN DO BETTER.',
                 '<18>{#f/31}I KNOW YOU HAVE IT IN YOU TO CHANGE.',
                 ...(world.genocide
                    ? [ "<18>{#f/4}NO MATTER WHAT RIDICULOUS THING 'ASRIEL' SAYS..." ]
                    : [ '<18>{#f/5}NO MATTER HOW IRREDEEMABLE YOU THINK YOU ARE...' ]),
                 "<18>{#f/6}{#x2}I KNOW, DEEP DOWN, THERE'S STILL GOOD IN YOU!",
                 '<18>{#f/0}SO LET ME HELP YOU FIND THAT GOODNESS.',
                 '<18>{#f/0}LET ME HELP YOU DISCOVER YOUR TRUE POTENTIAL.',
                 '<18>{#f/4}AND MOST OF ALL...',
                 '<18>{#f/9}LET ME SHOW YOU THAT YOU CAN STILL BE GREAT!!!',
                 '<18>{#f/0}I, PAPYRUS, WELCOME YOU WITH OPEN ARMS!'
              ]
            : [
                 '<18>{#f/0}THEY MUST BE WHAT YOU ARE FEELING RIGHT NOW!!',
                 '<18>{#f/4}I CAN HARDLY IMAGINE WHAT THAT MUST FEEL LIKE.',
                 '<18>{#f/4}AFTER ALL, I AM VERY GREAT.',
                 '<18>I NEVER WONDER WHAT HAVING MANY FRIENDS IS LIKE.',
                 '<18>{#f/5}I PITY YOU, LONELY HUMAN...',
                 '<18>{#f/0}BUT WORRY NOT!!!\nYOU SHALL BE LONELY NO LONGER!',
                 '<18>{#f/9}FOR I, THE GREAT PAPYRUS, WILL BE YOUR...',
                 '<18>{#f/5}{#x1}...',
                 '<18>NO...',
                 '<18>{#f/7}{#x2}NO, THIS IS ALL WRONG!',
                 '<18>I CAN\'T BE YOUR \"FRIEND...\"',
                 '<18>YOU ARE A HUMAN!\nI MUST CAPTURE YOU!!!',
                 '<18>{#f/9}THEN, I CAN FULFILL MY LIFELONG DREAM!!!',
                 '<18>POWERFUL!\nPOPULAR!\nPRESTIGIOUS!!!',
                 "<18>THAT'S PAPYRUS!!!",
                 '<18>{#f/4}THE NEWEST MEMBER...',
                 '<18>{#f/9}OF THE ROYAL GUARD!!!'
              ],
      papyrusFinal4: (b: boolean) =>
         world.edgy || world.killed0
            ? [
                 '<18>{#p/papyrus}{#f/0}WOWIE!\nYOU DID IT!',
                 "<18>{#p/papyrus}{#f/5}YOU DIDN'T DO A VIOLENCE!",
                 '<18>{#p/papyrus}{#f/6}TO BE HONEST, I WAS A LITTLE AFRAID...',
                 "<18>{#p/papyrus}{#f/0}BUT YOU'RE ALREADY TAKING STEPS TO REDEEM YOURSELF!",
                 "<18>{#p/papyrus}{#f/8}I'M SO PROUD OF YOU, HUMAN!",
                 "<18>{#p/papyrus}{#f/4}... WAIT, WASN'T I SUPPOSED TO CAPTURE YOU?",
                 "<18>{#p/papyrus}{#f/0}OH WELL.\nIT'S NOT IMPORTANT RIGHT NOW.",
                 '<18>{#p/papyrus}{#f/0}I JUST WANT YOU TO BE THE BEST PERSON YOU CAN BE.',
                 "<18>{#p/papyrus}{#f/5}LET'S LET BYBONES BE BYBONES, HUH?",
                 "<18>{#p/papyrus}{#f/9}I'LL EVEN GIVE YOU DIRECTIONS TO THE EXIT!"
              ]
            : [
                 '<18>{#p/papyrus}{#f/5}NYOO HOO HOO...',
                 ...(b
                    ? [ "<18>I WASN'T STRONG ENOUGH TO STOP YOU..." ]
                    : [ "<18>I CAN'T EVEN STOP SOMEONE AS WEAK AS YOU..." ]),
                 "<18>{#f/7}UNDYNE'S GOING TO BE DISAPPOINTED!",
                 "<18>{#f/5}I'LL NEVER JOIN THE ROYAL GUARD... AND...",
                 '<18>{#f/7}MY FRIEND QUANTITY WILL REMAIN STAGNANT!',
                 "<99>{#p/human}* (How will you respond?){!}\n§shift=56§Let's be§shift=64§What a\n§shift=56§friends§shift=72§loser{#c/0/7/7}"
              ],
      papyrusFinal4a1: (b: boolean) =>
         b
            ? [
                 '<18>{#p/papyrus}{#f/5}A-ARE YOU SURE?\nYOU WANT TO BE FRIENDS WITH ME?',
                 '<18>{#f/6}EVEN AFTER THAT???',
                 "<18>{#f/0}WELL, OKAY THEN!!\nLET'S BE FRIENDS!!"
              ]
            : [
                 '<18>{#p/papyrus}{#f/1}REALLY!?\nYOU WANT TO BE FRIENDS WITH ME???',
                 '<18>{#f/6}WELL THEN...\nI GUESS...',
                 '<18>{#f/0}I CAN MAKE AN ALLOWANCE FOR YOU!'
              ],
      papyrusFinal4a2: (b: boolean) =>
         b
            ? [
                 '<18>{#p/papyrus}{#f/5}HUH? ARE YOU... TRYING TO BERATE ME???',
                 "<18>{#f/6}YOU THINK I'M NOT STRONG ENOUGH TO BE YOUR FRIEND?",
                 '<18>{#f/5}... N-NO...',
                 '<18>{#f/7}NO, WHAT AM I SAYING!!\nOF COURSE I AM!',
                 "<18>{#f/9}AND... I'LL PROVE IT BY BEING YOUR FRIEND ANYWAY!"
              ]
            : [
                 '<18>{#p/papyrus}{#f/1}HUH? WHY WOULD YOU BERATE YOURSELF SO LOUDLY???',
                 '<18>{#f/4}IS IT BECAUSE...',
                 "<18>{#f/7}YOU DON'T THINK YOU'RE GOOD ENOUGH TO BE MY FRIEND?",
                 "<18>{#f/9}NO, YOU'RE GREAT!\nI'LL BE YOUR FRIEND!!!"
              ],
      papyrusFinal4b1: [
         '<18>{#f/0}WOWIE!!',
         '<18>I FOUND A NEW FRIEND!!!',
         '<18>{#f/4}AND WHO KNEW THAT ALL I NEEDED TO DO IT...'
      ],
      papyrusFinal4b2: [
         '<18>{#f/0}WOWIE!!',
         "<18>{#f/0}WE HAVEN'T EVEN HAD OUR FIRST DATE...",
         "<18>{#f/0}AND I'VE ALREADY MANAGED TO HIT THE FRIEND ZONE!!!",
         '<18>{#f/4}WHO KNEW THAT ALL I HAD TO DO...'
      ],
      papyrusFinal4c1: [
         '<18>{#f/0}WAS TO GIVE PEOPLE AWFUL PUZZLES AND THEN FIGHT THEM?',
         '<18>YOU TAUGHT ME A LOT, HUMAN.',
         '<18>{#f/9}I HEREBY GRANT YOU PERMISSION TO PASS THROUGH!',
         "<18>{#f/0}AND I'LL GIVE YOU DIRECTIONS TO THE EXIT."
      ],
      papyrusFinal4c2: [
         '<18>CONTINUE FORWARD UNTIL YOU REACH THE CITADEL.',
         '<18>THEN, HOP IN A CRAFT AND CROSS THE {@fill=#ff0}FORCE FIELD{@fill=#fff}.',
         "<18>{#f/4}THAT'S THE THING TRAPPING US ALL ON THE OUTPOST.",
         '<18>ANYONE CAN ENTER THROUGH IT, BUT NOBODY CAN EXIT...',
         '<18>{#f/9}... EXCEPT SOMEONE WITH A POWERFUL SOUL.',
         '<18>{#f/0}LIKE YOU!!!'
      ],
      papyrusFinal4d: [
         '<18>{#f/4}OH, I ALMOST FORGOT TO MENTION.',
         '<18>TO REACH THE EXIT, YOU WILL HAVE TO PASS...',
         '<18>{#f/7}BY {@fill=#ff0}THE KING{@fill=#fff}.',
         '<18>{@fill=#ff0}THE KING OF ALL MONSTERS...',
         '<18>{@fill=#ff0}HE IS...',
         '<18>{@fill=#ff0}{#f/6}... WELL...'
      ],
      papyrusFinal4e: [
         "<18>{#f/0}HE'S A BIG FUZZY PUSHOVER!!!",
         '<18>EVERYBODY LOVES THAT GUY.',
         '<18>{#f/4}I AM CERTAIN IF YOU JUST SAY...',
         '<18>\"EXCUSE ME, MR. DREEMURR... CAN I PLEASE GO HOME?\"',
         "<18>{#f/0}HE'LL GUIDE YOU OVER TO THE LAUNCH BAY HIMSELF!",
         "<18>{#f/9}ANYWAY!!!\nTHAT'S ENOUGH TALKING!!!",
         "<18>{#f/0}I'LL BE AT HOME BEING A COOL FRIEND."
      ],
      papyrusFinal4f1: [ '<18>{#f/9}FEEL FREE TO COME BY AND HANG OUT!!!' ],
      papyrusFinal4f2: [ '<18>{#f/9}FEEL FREE TO COME BY AND HAVE THAT DATE!!!' ],
      papyrusFinal4f3: [ '<18>{#f/9}FEEL FREE TO COME BY AND SAY HELLO!!!' ],
      papyrusFinal4g: [ '<18>NYEH HEH HEH HEH HEH HEH HEH!!!' ],
      papyrusFinal5: [
         '<18>{#p/papyrus}{#f/5}OH, WHERE COULD THAT HUMAN HAVE GONE...',
         '<18>{#f/4}...\nWAIT.',
         "<18>{#f/1}IT'S RIGHT IN FRONT OF ME!!!",
         '<18>{#f/0}HELLO! I WAS WORRIED THAT YOU HAD GOTTEN LOST!',
         "<18>IT SURE IS A RELIEF TO SEE THAT YOU'RE HERE...",
         '<18>{#f/7}...\nWAIT A SECOND!!!',
         "<18>YOU'RE NOT SUPPOSED TO ESCAPE!!!",
         '<18>GET BACK THERE!!!'
      ],
      papyrusFinal6: [
         '<18>{#p/papyrus}{#f/4}BACK AGAIN, EH?',
         "<18>{#f/5}I SUPPOSE IT'S MY FAULT...",
         '<18>I TOLD YOU BEFORE THAT I WOULD MAKE YOU SPAGHETTI.',
         "<18>IT'S ONLY NATURAL THAT YOU WOULD WANT TO SEE ME...",
         '<18>IN THE DIRE HOPE THAT I WOULD MAKE YOU SOME.',
         '<18>{#f/0}WELL... I UNDERSTAND.',
         '<18>{#f/0}PAPYRUS IS HUNGRY, TOO!',
         '<18>{#f/7}HUNGRY FOR JUSTICE!'
      ],
      papyrusFinal7: () => [
         "<18>{#p/papyrus}{#f/1}YOU'RE BACK AGAIN!?!?",
         '<18>{#f/4}I FINALLY REALIZE THE TRUE REASON WHY.',
         '<18>{#f/5}YOU...',
         '<18>YOU JUST MISS SEEING MY FACE SO MUCH...',
         '<18>{#f/6}I...',
         "<18>{#f/31}I'M NOT SURE I CAN FIGHT SOMEONE WHO FEELS THIS WAY.",
         "<18>{#f/4}NOT TO MENTION, I'M GETTING TIRED OF CAPTURING YOU.",
         '<18>{#f/5}WOULD YOU LIKE TO PASS THROUGH...',
         '<18>{#f/5}... WITHOUT A BATTLE?',
         choicer.create('* (What do you say?)', 'Yes', 'No')
      ],
      papyrusFinal7a: [ '<18>{#p/papyrus}{#f/31}...\nOKAY...', "<18>{#f/3}I GUESS I'LL ACCEPT MY FAILURE." ],
      papyrusFinal7b: [ '<18>{#p/papyrus}{#f/4}WELL, IF YOU SAY SO, THEN...', '<18>{#f/9}BY ALL MEANS!!!' ],
      papyrusFinal8: () => [
         '<18>{#p/papyrus}{#f/1}AGAIN??',
         '<18>{#f/4}... WELL, OKAY...',
         '<18>{#f/9}WILL YOU FORGO THE BATTLE THIS TIME??',
         choicer.create('* (What do you say?)', 'Yes', 'No')
      ],
      papyrusFinal8a: [ '<18>{#p/papyrus}{#f/0}OKAY, HERE WE GO!' ],
      puzzle3: () => [
         '<32>{#p/human}* (You activate the terminal.)',
         '<32>{#p/basic}* There is a log of previous modifications...',
         world.edgy
            ? '<32>* \"Pattern last modified by user: ALPHYS\"'
            : '<32>* \"Pattern last modified by user: COOLSKELETON95\"',
         ...(!world.goatbro || SAVE.flag.n.genocide_milestone < 5 || SAVE.flag.n.ga_asrielAlphysCom1++ > 0
            ? []
            : [ "<25>{#p/asriel2}{#f/13}* She's been against us the whole time..." ]),
         '<32>{#p/basic}* \"Would you like to view the pattern?\"',
         choicer.create('* (View the pattern?)', 'Yes', 'No')
      ],
      robotx: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The robot appears to be asleep.)' ]
            : [ "<32>{#p/basic}* It's in sleep mode." ],
      robot1: pager.create(
         0,
         () => [
            '<32>{#p/basic}* Hello.\n* I am a builder bot.',
            '<32>* I want to see the galaxy...\n* But I cannot move.',
            '<32>* If you would be so kind, traveler, please...',
            '<32>* Take one of my computer chips and bring it to another computer very far away.',
            choicer.create('* (Take a chip?)', 'Yes', 'No')
         ],
         () => [
            '<32>{#p/basic}* If you would be so kind, traveler, please...',
            '<32>* Take one of my computer chips and bring it to another computer very far away.',
            choicer.create('* (Take a chip?)', 'Yes', 'No')
         ]
      ),
      robot2: () => [
         '<32>{#p/basic}* Thank you... good luck!',
         '<32>{#s/equip}{#p/human}* (You got the Computer Chip.)',
         ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
            ? [
                 "<25>{#p/asriel2}{#f/9}* Pfft, that's adorable.",
                 "<25>{#p/asriel2}{#f/13}* This robot has no idea what's going on here..."
              ]
            : [])
      ],
      robot3: [ '<32>{#p/basic}* It seems you do not have enough room for me.' ],
      robot4: () => [
         '<32>{#p/basic}* I see.\n* Good journey, then.',
         ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
            ? [
                 "<25>{#p/asriel2}{#f/9}* Pfft, that's adorable.",
                 "<25>{#p/asriel2}{#f/13}* This robot has no idea what's going on here..."
              ]
            : [])
      ],
      robot5: () => [
         '<32>{#p/basic}* Thank you for taking care of me.',
         ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
            ? [ "<25>{#p/asriel2}{#f/4}* It's alright, we don't need any more for now." ]
            : [])
      ],
      robot6: () => [
         '<32>{#p/basic}* How am I doing?\n* By \"I\" I mean the chip I gave you...',
         '<32>* Huh? You lost it...?\n* ... I suppose I can give you another one...',
         choicer.create('* (Take another chip?)', 'Yes', 'No')
      ],
      robot7: [
         '<32>{#p/basic}* Please be careful this time.',
         '<32>{#p/human}{#s/equip}* (You got the Computer Chip.)'
      ],
      robot8: [ '<32>{#p/basic}* I understand.\n* Safe journey, then...' ],
      robot9: () => [
         '<32>{#p/basic}* Thank you for... taking care of me...',
         ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
            ? [ "<25>{#p/asriel2}{#f/4}* It's alright, we don't need any more for now." ]
            : [])
      ],
      robot10: [
         '<32>{#p/basic}* How am I doing?',
         '<32>* Huh? Again...?',
         "<32>* I'm sorry... if I give you any more, there will be nothing left of me.",
         '<32>* I suppose it is true.\n* Traveling beyond our limits is but a fantasy.',
         "<32>* It's no different for anyone else.",
         '<32>* All of monsterkind are doomed to live out here forever...'
      ],
      robot11: [ '<32>{#p/basic}* Why did I give myself away so easily?' ],
      robot12: [ '<32>{#p/basic}* Begone!' ],
      sans1: [
         '<99>{#p/darksans}{#i/4}* {@spacing=2.25/0}Human.',
         "<99>* {@spacing=2.25/0}Don't you know how to{@spacing=}\n  {@spacing=2.25/0}greet a new pal?",
         '<99>* {@spacing=2.25/0}Turn around and shake{@spacing=}\n  {@spacing=2.25/0}my hand.'
      ],
      sans2: () => [
         ...(world.edgy
            ? [
                 "<25>{#p/sans}{#f/0}* huh?\n* what's with the face?",
                 "<25>{#p/sans}{#f/2}* ... didn't you like my whoopee cushion?",
                 '<25>{#f/0}* ... eh.\n* to each their own.'
              ]
            : [ "<25>{#p/sans}{#f/4}* heheh... nothin' like a good whoopee cushion." ]),
         "<25>{#f/0}* anyway, you're a human, right?",
         "<25>{#f/5}* that's fantastic.",
         "<25>{#f/0}* i'm sans.\n* sans the skeleton.",
         '<25>{#f/3}* as a royal sentry, my job is to capture humans.',
         "<25>{#f/4}* but... y'know...",
         ...(world.edgy
            ? [
                 "<25>{#f/2}* i don't really feel like doing much work today.",
                 '<25>{#f/0}* as for my brother, well...',
                 "<25>{#f/5}* he's OVERFLOWING with energy.",
                 '<25>{#f/0}* it took everything i had just to get him to stay home.'
              ]
            : [
                 "<25>{#f/2}* i've got better things to do.",
                 '<25>{#f/0}* as for my brother, well...',
                 '<25>{#f/5}* despite not being an actual sentry, he sure ACTS like one.',
                 "<25>{#f/0}* in fact, i think that's him over there."
              ]),
         '<25>* i have an idea.\n* jump across that gap, will ya?',
         '<26>{#f/4}* yeah, jump right across.\n* my bro set the gravity too low to stop anyone.'
      ],
      sans3: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}* well, here we are.',
                 "<25>{#f/3}* i'm afraid there's not much else i can show you right now...",
                 "<25>{#f/2}* but maybe i'll come up with something if you keep heading forward.",
                 "<25>{#f/0}* for now, i'll just hang around here."
              ]
            : [ '<25>{#p/sans}* quick, to the gravometric inverter.' ],
      sans4: [ "<25>{#p/sans}* 'sup, bro?" ],
      sans5: [
         '<18>{#p/papyrus}{#x2}{#f/7}YOU KNOW WHAT \"SUP,\" BROTHER!',
         '<18>YOU HAVE PUZZLES TO ATTEND TO!',
         "<18>I'VE GIVEN YOU PLENTY OF LEEWAY, BUT STILL...",
         '<18>YOU SIT AROUND AND DO NOTHING ALL DAY!',
         "<18>EVEN NOW, THAT'S WHAT YOU'RE DOING!",
         '<18>NOTHING!',
         "<25>{#p/sans}* actually, i'm playing with this gravometric thingy.",
         "<25>* it's really cool.",
         '<25>{#f/4}* do you wanna look?',
         "<18>{#p/papyrus}{#x3}{#f/7}NO!!\nI DON'T HAVE TIME FOR THAT!!",
         '<18>{#x2}IF A HUMAN COMES THROUGH HERE, I WANT TO BE READY!',
         '<18>I MUST BE THE ONE!\nI WILL BE THE ONE!',
         '<18>{#x1}{#f/9}I WILL FINALLY CAPTURE A HUMAN!',
         '<18>{#x4}{#f/0}THEN I, THE GREAT PAPYRUS...',
         '<18>WILL GET ALL THE THINGS I UTTERLY DESERVE!',
         '<18>RESPECT...\nRECOGNITION...',
         '<18>{#f/9}I WILL FINALLY BE ABLE TO JOIN THE ROYAL GUARD!',
         '<25>{#p/sans}* hmm...',
         '<25>{#f/2}* maybe this gadget will help you.',
         "<18>{#p/papyrus}{#x3}{#f/7}SANS, THAT WON'T DO ANYTHING!\nYOU LAZYBONES!",
         '<18>{#x1}{#f/5}YOU KNOW, YOU ARE CAPABLE OF SO MUCH MORE, YET...',
         '<18>{#x2}{#f/7}YOU CHOOSE TO SIT AROUND AND DO NOTHING ALL DAY!',
         "<18>{#x1}{#f/5}DON'T YOU WANT... MORE, OUT OF LIFE?",
         "<25>{#p/sans}* hey, take it easy.\n* i've got plenty of things in mind.",
         "<25>{#f/4}* perhaps you could even say i'm...",
         '<25>{#f/2}* shooting for the {@fill=#ff0}stars{@fill=#fff}?'
      ],
      sans6: [
         '<18>{#p/papyrus}{#x3}{#f/7}SANS!!',
         "<25>{#p/sans}{#f/5}* come on.\n* you're smiling.",
         '<18>{#p/papyrus}{#x2}{#f/7}I AM AND I UTTERLY DESPISE IT!',
         '<18>{#x1}{#f/4}(SIGH...)',
         '<18>{#f/5}WHY DOES SOMEONE\nAS GREAT AS MYSELF...',
         '<18>HAVE TO DO SO MUCH JUST TO GET SOME RECOGNITION??',
         '<25>{#p/sans}* heh.\n* perhaps you should focus more on, well...',
         '<25>* the {@fill=#ff0}gravity{@fill=#fff} of the situation.'
      ],
      sans7: [
         '<18>{#p/papyrus}{#x2}{#f/7}UGH!!',
         '<18>{#x1}{#f/4}I WILL ATTEND TO MY PUZZLES...',
         '<18>{#f/7}AS FOR YOUR WORK?',
         '<18>{#f/4}I EXPECT YOU TO DO A MORE...',
         '<18>{#f/9}{@fill=#ff0}\"STELLAR\"{@fill=#fff} JOB FROM NOW ON!!!',
         '<18>{#f/0}NYEHEHEHEHEHE\nHEHEHEHEHEHEH!!'
      ],
      sans8: [ '<18>{#p/papyrus}HEH!' ],
      sans9: [ '<25>{#p/sans}* ok, time to bring you back down.' ],
      sans10: [
         '<25>{#p/sans}{#f/0}* actually, hey...\n* before you go out there on your own...',
         "<25>{#f/3}* you should know the royal guard's on the lookout for you.",
         "<25>{#f/0}* don't worry, though.\n* all they've got out here are the canines.",
         "<25>{#f/0}* since you're a human, you should know what dogs love, right?",
         "<25>{#f/2}* they're almost as harmless as papyrus."
      ],
      sansbook0: [ '<32>{#p/human}* (It appears this joke book has no clear ending.)' ],
      sansbook1: [ '<32>{#p/basic}* It\'s a book about non-euclidian geometry.\n* Property of \"ALPHYS.\"' ],
      sansbook2: () => [ choicer.create('* (Take a look inside?)', 'Yes', 'No') ],
      sansbook3: [ '<32>{#p/human}* (You look inside the book...)' ],
      sansbook4: [ '<32>{#p/basic}* Inside the geometry book was a joke book.' ],
      sansbook5: [ '<32>{#p/basic}* Inside the joke book was another geometry book.' ],
      sansbook6: [ '<32>{#p/basic}* Inside the geometry book was another joke book.' ],
      sansbook7: [ "<32>{#p/basic}* It's another geometry book." ],
      sansbook8: [ "<32>{#p/basic}* It's another joke book." ],
      sansbook9: [ '<32>{#p/human}* (You decide not to look.)' ],
      sansbook10: () => [
         "<32>{#p/basic}* It's a note from Sans.",
         '<32>{#p/without}* \"why so serious?\"\n* \"it\'s just a bad joke.\"',
         '<33>{#p/without}* \"heh...\"',
         '<33>{#p/without}* \"don\'t read into it too deeply.\"',
         ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ... this is the worst joke I have ever experienced.' ])
      ],
      sansinter: {
         s_sans: pager.create(
            0,
            () =>
               world.edgy
                  ? [ "<25>{#p/sans}* 'sup." ]
                  : [
                       "<25>{#p/sans}* papyrus will be back soon, y'know.",
                       "<25>{#f/4}* i'd get going if i were you...",
                       "<25>{#f/2}* otherwise, you'll have to listen to more of my hilarious jokes."
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}* if my bro was here, you and i would have TONS of stuff to do.',
                       '<25>{#p/sans}{#f/3}* but, alas...',
                       "<25>{#p/sans}{#f/2}* he's busy solving the sudoku book i gave him."
                    ]
                  : [
                       "<25>{#p/sans}* look, there's nothin' to be afraid of.",
                       "<25>{#f/2}* he may seem scary, but papyrus is the nicest guy you'll ever meet."
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}* huh?\n* you want me to bring you to him?',
                       "<25>{#f/3}* look, bucko.\n* you're barking up the wrong holo-tree.",
                       "<25>{#p/sans}{#f/2}* if i were you, i'd be thankful for what you already have."
                    ]
                  : [ '<25>{#p/sans}* trust me.' ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/3}* ...',
                       "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Don't push your luck.",
                       '{*}{#s.resume}{%}'
                    ]
                  : [ '<25>{#p/sans}* trust me.' ],
            () => (world.edgy ? [] : [ '<25>{#p/sans}* trust me.' ])
         ),
         s_papyrus: pager.create(
            0,
            [
               "<25>{#p/sans}* hey, here's something important to remember.",
               '<25>* my brother has a very {@fill=#00a2e8}special attack{@fill=#fff}.',
               "<25>* if you see an {@fill=#ff993d}orange attack{@fill=#fff}, you'll get hurt if you're not moving.",
               "<25>{#f/3}* here's an easy way to keep it in mind.",
               "<25>{#f/0}* imagine hot coals.\n* you wouldn't stand still on those, right?",
               '<25>* hot coals are rocky.\n* so imagine boney hot coals instead.',
               '<25>{#f/2}* simple, right?\n* when fighting, think about boney hot coals.'
            ],
            [
               "<25>{#p/sans}{#f/0}* and no, you won't get hurt if you're moving slowly.",
               '<25>{#f/0}* you just have to be moving.',
               "<25>{#f/2}* there's likely someone out there who can explain it better."
            ],
            [ '<25>{#p/sans}{#f/2}* remember...\n* boney hot coals.' ]
         ),
         s_dogs: pager.create(
            0,
            [
               "<25>{#p/sans}* since you're a human, you've probably never heard of the W.T.F.",
               '<25>{#f/2}* that\'s short for \"wide- area troposphere framework.\"'
            ],
            [
               '<25>{#p/sans}* if the W.T.F. were to drop, the air around us would disappear.',
               "<25>{#f/3}* don't worry, though.\n* i {@fill=#ff0}swear{@fill=#fff} it's never happened before."
            ],
            [ '<25>{#p/sans}{#f/2}* wide-area troposphere framework.' ]
         ),
         s_jenga: pager.create(
            0,
            [
               '<25>{#p/sans}* actually, that spaghetti from earlier...',
               "<25>{#f/3}* it wasn't too bad for my brother.",
               "<25>{#f/0}* since he started cooking lessons, he's been improving a lot.",
               "<25>{#f/4}* i bet if he keeps it up, he'll even impress the king."
            ],
            () =>
               world.edgy || world.killed5
                  ? [ '<25>{#p/sans}{#f/2}* ... sure would be a good way for him to get away from you.' ]
                  : [ "<25>{#p/sans}{#f/2}* ... the man up top's a sucker for spaghetti." ]
         ),
         s_bridge: pager.create(
            0,
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/0}* i hope you liked that last puzzle i set for you.',
                       '<25>{#f/3}* i was kind of in a hurry, but papyrus insisted i prepare it.'
                    ]
                  : world.killed5
                  ? [
                       "<25>{#p/sans}{#f/3}* i hear the area's being evacuated right now...",
                       "<25>{#f/0}* if i were you, i'd be afraid for my life."
                    ]
                  : [
                       "<25>{#p/sans}{#f/3}* i don't know what my brother's going to do now.",
                       '<25>{#f/0}* if i were you, i would make sure i understand {@fill=#ff993d}orange attacks{@fill=#fff}.'
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/0}* what?\n* can you blame me?',
                       "<25>{#f/3}* it's hard to get ANYTHING done when i have you to consider."
                    ]
                  : world.killed5
                  ? [
                       '<25>{#p/sans}{#f/0}* thankfully, i have someone who cares about my well-being.',
                       "<25>{#f/2}* no matter what happens, i know he'll be there for me."
                    ]
                  : [ '<25>{#p/sans}{#f/2}* oh, and maybe {@fill=#00a2e8}blue attacks{@fill=#fff}, too.' ],
            () =>
               world.edgy
                  ? [ '<25>{#p/sans}{#f/3}* oh well.' ]
                  : world.killed5
                  ? [ '<25>{#p/sans}{#f/0}* am i wrong?' ]
                  : [ '<26>{#p/sans}{#f/0}* all sorts of attacks.' ]
         )
      },
      sansbredgey: () =>
         world.edgy
            ? 6 <= world.population
               ? [
                    '<25>{#p/sans}* by the way...',
                    "<25>* i know i've been harsh on you lately...",
                    '<25>{#f/3}* but thanks for trying to be a better person.',
                    '<25>{#f/2}* keep it up, ok?'
                 ]
               : world.bullied
               ? [
                    '<25>{#p/sans}* by the way...',
                    "<25>* i know you're still going around hurting people...",
                    '<25>{#f/3}* but i appreciate the effort not to outright kill them.',
                    "<25>{#f/2}* it's something, right?"
                 ]
               : [
                    '<25>{#p/sans}* by the way...',
                    '<25>* if you happen to run into my brother...',
                    '<25>{#f/3}* ...',
                    "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Don't even try it.",
                    '{*}{#s.resume}{%}'
                 ]
            : 6 <= world.population
            ? [
                 '<25>{#p/sans}* by the way...',
                 "<25>* i know it's kind of silly at times...",
                 "<25>{#f/3}* but thanks for going along with my brother's crazy schemes.",
                 "<25>{#f/2}* you're a champion."
              ]
            : world.bullied
            ? [
                 '<25>{#p/sans}* by the way...',
                 "<25>* i know you've been going around hurting people...",
                 '<25>{#f/3}* but i appreciate the effort not to outright kill them.',
                 "<25>{#f/2}* it's something, right?"
              ]
            : [
                 '<25>{#p/sans}* by the way...',
                 '<25>* if you happen to run into my brother...',
                 '<25>{#f/3}* ...',
                 "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Don't even try it.",
                 '{*}{#s.resume}{%}'
              ],
      sentryPapyrus1: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The narration on this sentry station predicts the future fame of its creator.)' ]
               : [
                    "<32>{#p/basic}* There's some narration on this cardboard box.",
                    ...(world.genocide || world.runaway
                       ? [
                            '<23>{#p/papyrus}{#f/30}\"PLEASE DO NOT DESTROY MY SENTRY STATION.\"',
                            '<23>\"I WORKED VERY HARD ON IT, AND IT\'D BE A SHAME IF IT WERE RUINED.\"',
                            '<23>\"... THAT IS ALL.\"',
                            '<23>(\"NOTE: I WOULD HAVE SAID MORE, BUT THERE\'S NOT ENOUGH ROOM.\")'
                         ]
                       : [
                            '<23>{#p/papyrus}{#f/30}\"YOU OBSERVE THE WELL- CRAFTED SENTRY STATION.\"',
                            '<23>\"WHO COULD HAVE BUILT THIS, YOU PONDER...?\"',
                            '<23>\"I BET IT WAS THAT VERY FAMOUS ROYAL GUARDSMAN!\"',
                            SAVE.data.n.plot === 72
                               ? '<32>{#p/basic}* The last line was crossed out.'
                               : '<23>(\"NOTE: NOT YET A VERY FAMOUS ROYAL GUARDSMAN.\")',
                            ...(SAVE.data.n.plot < 19 && !(world.edgy || world.killed5 || world.population < 6)
                               ? [
                                    "<25>{#p/sans}{#f/0}* admiring my bro's handiwork, are we?",
                                    "<25>{#p/sans}{#f/2}* i know.\n* it's pretty cool."
                                 ]
                               : [])
                         ])
                 ],
         () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The narration on this sentry station predicts the future fame of its creator.)' ]
               : [
                    "<32>{#p/basic}* There's some narration on this cardboard box.",
                    ...(world.genocide || world.runaway
                       ? [
                            '<23>{#p/papyrus}{#f/30}\"PLEASE DO NOT DESTROY MY SENTRY STATION.\"',
                            '<23>\"I WORKED VERY HARD ON IT, AND IT\'D BE A SHAME IF IT WERE RUINED.\"',
                            '<23>\"... THAT IS ALL.\"',
                            '<23>(\"NOTE: I WOULD HAVE SAID MORE, BUT THERE\'S NOT ENOUGH ROOM.\")'
                         ]
                       : [
                            '<23>{#p/papyrus}{#f/30}\"YOU OBSERVE THE WELL- CRAFTED SENTRY STATION.\"',
                            '<23>\"WHO COULD HAVE BUILT THIS, YOU PONDER...?\"',
                            '<23>\"I BET IT WAS THAT VERY FAMOUS ROYAL GUARDSMAN!\"',
                            SAVE.data.n.plot === 72
                               ? '<32>{#p/basic}* The last line was crossed out.\n* That checks out.'
                               : '<23>(\"NOTE: NOT YET A VERY FAMOUS ROYAL GUARDSMAN.\")'
                         ])
                 ]
      ),
      sentryPapyrus2: pager.create(0, () => [
         '<32>{#p/human}* (You look under the shelf...)',
         ...(SAVE.data.b.svr
            ? [
                 [
                    "<25>{#p/asriel1}{#f/17}* That's where Papyrus keeps all his wacky whatsits.",
                    '<25>{#f/20}* A fighter by night, and a tinkerer by... also night.'
                 ],
                 [
                    '<26>{#p/asriel1}{#f/13}* In one timeline, I encouraged Papyrus to\n  be a Royal Lab employee.',
                    '<25>{#f/17}* He kind of ended up doing his own thing...',
                    '<25>{#f/17}* ... working on personal science projects rather than official work.',
                    "<25>{#f/13}* Papyrus isn't someone who easily conforms to standard systems."
                 ],
                 [
                    '<26>{#p/asriel1}{#f/13}* One device Papyrus created was the legendary \"shickaxe.\"',
                    '<25>{#f/17}* A multi-tool that could efficiently break any material.',
                    '<25>{#f/15}* Its durability was... infinite, actually.',
                    '<25>{#f/13}* He only threw it away because, in his own words...',
                    '<25>{#f/13}* \"Having a tool that can do everything takes the fun out of it!\"'
                 ],
                 [ '<26>{#p/asriel1}{#f/20}* Papyrus certainly has a unique way of thinking.' ]
              ][Math.min(asrielinter.sentryPapyrus2++, 3)]
            : [ '<32>* Boxes upon boxes of unused cables and old tech can be found here.' ])
      ]),
      sentrySans1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (This sentry station strikes you as rather unimportant.)' ]
            : world.darker
            ? [ "<32>{#p/basic}* It's a sentry station." ]
            : SAVE.data.n.plot < 31
            ? [
                 "<32>{#p/basic}* Sans's sentry station...",
                 "<32>* Truly the most worthwhile investment the Royal Guard could've made."
              ]
            : SAVE.data.n.plot === 72
            ? [ "<32>{#p/basic}* Sans's sentry station...", "<32>* The quality of this investment hasn't changed a bit." ]
            : [ "<32>{#p/basic}* Sans's sentry station...", '<33>* A poor investment in hindsight.' ],
      sentrySans2: pager.create(
         0,
         () => [
            '<32>{#p/human}* (You look under the shelf...)',
            ...(SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/15}* As a star, there were some dark corners even I never dared search.',
                       "<25>{#f/20}* It's probably for the best if we leave this be."
                    ],
                    [ '<25>{#p/asriel1}{#f/20}* Please.\n* Anywhere but here.' ]
                 ][Math.min(asrielinter.sentrySans2++, 1)]
               : world.edgy
               ? [ "<32>{#p/basic}* It's mostly empty, save for the singular red crayon." ]
               : [ '<32>{#p/basic}* There are bottles of honey, alfredo, and yamok sauce stockpiled here.' ])
         ],
         () => [
            '<32>{#p/human}* (You look under the shelf...)',
            SAVE.data.b.svr
               ? '<25>{#p/asriel1}{#f/20}* Please.\n* Anywhere but here.'
               : world.edgy
               ? "<32>{#p/basic}* It's an unsettling reminder."
               : "<32>{#p/basic}* It's an unholy quantity of food toppings."
         ]
      ),
      whew1: () =>
         [
            [ '<32>{#p/basic}* The doggy bed is covered in annoying white fur.' ],
            [ '<32>{#p/basic}* Fighting Papyrus has begun to tire you, but not enough to sleep.' ],
            [
               '<32>{#p/basic}* After fighting Papyrus three times, you feel exhausted.',
               choicer.create('* (What will you do?)', 'Nothing', 'Sleep')
            ],
            [
               '<32>{#p/basic}* Continually fighting Papyrus has exhausted you.',
               choicer.create('* (What will you do?)', 'Nothing', 'Sleep')
            ]
         ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 3)],
      whew2: [ '<32>{#p/human}* (You let the doggy bed be.)' ],
      whew3: [ '<32>{#p/human}* (You lay in the doggy bed...)' ],
      whew4: [
         "<32>{#p/alphys}* And you say they're in here?",
         '<32>{#p/sans}{#f/7}* yup.\n* my brother made that pretty clear.',
         '<32>{#p/alphys}* O-okay...\n* Here goes nothing...',
         '<32>{#p/human}* (It sounds like a door is opening.)',
         '<32>{#p/alphys}* ...',
         '<32>{#p/alphys}* Well, there they are.',
         "<32>{#p/sans}{#f/7}* c'mon, let's make this quick.",
         "<32>{#p/sans}{#f/7}* i doubt it'll be long before undyne shows up.",
         '<32>{#p/alphys}* Going as f-fast as I can!'
      ],
      whew5: [
         '<32>{#p/human}* (It feels like someone is trying to carry you.)',
         '<32>{#p/alphys}* Oh god, w-were humans always this heavy!?'
      ],
      whew6: [
         '<32>{#p/basic}* Huh?\n* Where are...',
         "<32>* ...\n* Asgore's house.",
         "<32>* Come on, let's go find him..."
      ],
      trivia: {
         s_bbox: [ "<32>{#p/basic}* A bastion box.\n* There's a human inside..." ],
         
         ogkxsaucer: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You reach your hand deep into the dispenser.)\n* (It's a tad saucy.)" ]
               : [ "<32>{#p/basic}* It's a dispenser of some kind." ],
         mousehole: () =>
            [
               [ "<32>{#p/basic}* It's a mouse hole.\n* The mice inside are discussing your great battle." ],
               [ "<32>{#p/basic}* It's a mouse hole.\n* The mice inside are concerned for your safety." ],
               [ "<32>{#p/basic}* It's a mouse hole.\n* The mice inside are wondering if you should take a rest." ],
               [ "<32>{#p/basic}* It's a mouse hole.\n* The mice inside are concerned for your sanity." ]
            ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 3)],
         lamppost: pager.create(
            2,
            ...[
               [ "<32>{#p/basic}* It's a bounce lamp." ],
               [ '<32>{#p/basic}* A bouncy, bouncy lamp.' ],
               [ '<32>{#p/basic}* Such bounce.\n* Very lamp.' ],
               [ '<32>{#p/basic}* Lamp, bounce, lamp, bounce...' ],
               [ '<32>{#p/basic}* The lamp bounces up and down.' ],
               [ '<32>{#p/basic}* ... the bouncing never stops.' ],
               [ "<32>{#p/basic}* It's a little thing called perpetual motion." ]
            ].map(
               lines => () =>
                  SAVE.data.b.svr
                     ? [ '<32>{#p/human}* (You observe the strange lamp bouncing up and down.)' ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Just a lamp.' ]
                     : lines
            )
         ),
         ntower: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* I guess Alphys never did fix this thing.',
                       "<25>{#f/16}* I don't blame her.\n* That ruleset is kind of a nightmare.",
                       '<25>{#f/20}* Also, it kind of relies on Sans being there.',
                       '<25>{#f/15}* Getting him to participate is... kind of impossible.'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/17}* Yeah... Sans.\n* Great sense of humor, but not very active.',
                       '<25>{#f/13}* And by active, I mean physically.',
                       "<25>{#f/15}* And by physically, I mean he doesn't like to move.",
                       '<25>{#f/16}* And by move, I mean get up and walk around.',
                       '<25>{#f/13}* Yeah.\n* He usually just takes some kind of shortcut.',
                       '<25>{#f/15}* I still have no idea how those things work.'
                    ],
                    [
                       "<25>{#p/asriel1}{#f/17}* Guess you could say Alphys's choice to not fix this puzzle...",
                       '<25>{#f/20}* Was a little shortcut of her own.'
                    ],
                    [ '<25>{#p/asriel1}{#f/20}* ... maybe my sense of humor could use some work.' ]
                 ][Math.min(asrielinter.ntower++, 3)]
               : SAVE.data.b.s_state_puzzlenote || (!world.genocide && world.edgy)
               ? [ "<32>{#p/basic}* It's un-activated." ]
               : postSIGMA()
               ? [ "<32>{#p/basic}* It's out of service." ]
               : [ '<32>{#p/basic}* What an unfortunate outcome.' ],
         s_secret_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign mentions an escape.)' ]
               : SAVE.data.n.state_starton_trashprogress < 2 && SAVE.data.n.plot < 72
               ? [
                    '<32>{#p/basic}* \"It\'s taking a time-out.\"',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielDog++ < 1 ? [ '<25>{#p/asriel2}{#f/15}* What.' ] : [])
                 ]
               : [ '<32>{#p/basic}* \"It\'s escaped.\"' ],
         grillflower: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears this plant is very neon indeed.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a plant." ]
               : [
                    "<32>{#p/basic}* It's not just a plant...\n* It's a NEON plant.",
                    '<32>* What difference does it make?\n* None, none at all.'
                 ],
         librarbywindow1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But there was nothing of real interest to see here.)' ]
               : [ "<32>{#p/basic}* There's a plant in the window.\n* How interesting." ],
         librarbywindow2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You reach up to the window and put your hands on it.)' ]
               : [ "<32>{#p/human}* (You reach up to the window and put your hands on it.)\n* (You can't see inside.)" ],
         papwindow: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You peer into the window, but you couldn't see anybody inside.)" ]
               : SAVE.data.n.plot_date > 0 && SAVE.data.n.plot_date < 1 && SAVE.data.n.plot < 71.2
               ? [ '<32>{#p/basic}* ... seems Papyrus is waiting patiently for you.' ]
               : [ "<32>{#p/basic}* ... seems like nobody's home." ],
         s_puzzlenote: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The note describes the rules of a complex challenge.)' ]
               : SAVE.data.b.s_state_puzzlenote
               ? [ "<33>{#p/basic}* It's illegible chicken-scratch." ]
               : [],
         s_backrooms_lessdog: () =>
            SAVE.data.b.svr
               ? [
                    "<32>{#p/human}* (You run your hands through the nonexistent dog's fur.)\n* (The dog seems to like it.)",
                    ...[
                       [ '<25>{#p/asriel1}{#f/13}* Frisk, are you okay?' ],
                       [ "<25>{#p/asriel1}{#f/13}* Frisk.\n* There's nothing there." ],
                       [ '<25>{#p/asriel1}{#f/15}* ... okay?' ],
                       [ '<25>{#p/asriel1}{#f/15}* ...' ]
                    ][Math.min(asrielinter.s_backrooms_lessdog++, 3)]
                 ]
               : SAVE.data.n.state_starton_lesserdog === 2 || (world.population === 0 && !world.bullied)
               ? [ '<32>{#p/basic}* ... but nobody came.' ]
               : world.runaway || world.population === 0
               ? [ '<32>{#p/basic}* ... but everybody ran.' ]
               : SAVE.data.n.plot < 72
               ? [ "<32>{#p/basic}* It's playing a game of poker against itself.", '<32>* It appears to be losing...' ]
               : [
                    "<32>{#p/basic}* It's playing a game of poker against itself.",
                    '<32>* It appears to be winning...\n* Somehow.'
                 ],
         s_backrooms_lesstable: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You wonder if the Dog chow is edible for humans.)' ]
               : [ "<32>{#p/basic}* It's a table for 4-D poker, plus complimentary dog chow." ],
         s_beddinng_table: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You glance at the table.)\n* (You then glance away.)' ]
               : [ '<32>{#p/basic}* The obligatory table.\n* Despite its lack of purpose, it fills the space well.' ],
         s_bh_bone: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You admire the artisanship in this minimalistic painting.)' ]
                  : [
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}A CLASSIC IMAGE.',
                               "<18>IT ALWAYS REMINDS ME OF WHAT'S IMPORTANT IN LIFE."
                            ]
                          : []),
                       "<32>{#p/basic}* It's a minimalistic painting of a cartoon bone."
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You admire the artisanship in this minimalistic painting.)' ]
                  : [ "<32>{#p/basic}* It's a minimalistic painting of a cartoon bone." ]
         ),
         s_bh_cottonball: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The content of the notes attached to this pile of socks does not surprise you at all.)'
                 ]
               : [
                    "<32>{#p/basic}* It's a dirty cotton ball with a series of notes on it.",
                    '<23>{#p/papyrusnt}\"SANS!\"\n\"PLEASE PICK UP YOUR COTTON BALL!\"',
                    '<32>{#p/without}* \"ok.\"',
                    '<23>{#p/papyrusnt}\"DON\'T PUT IT BACK DOWN!\"\n\"MOVE IT!\"',
                    '<32>{#p/without}* \"ok.\"',
                    '<23>{#p/papyrusnt}\"YOU MOVED IT TWO MICRONS!\"\n\"MOVE IT TO YOUR ROOM!\"',
                    '<32>{#p/without}* \"ok.\"',
                    '<23>{#p/papyrusnt}\"AND DON\'T BRING IT BACK!\"',
                    '<32>{#p/without}* \"ok.\"',
                    '<23>{#p/papyrusnt}\"IT\'S STILL HERE!\"',
                    '<32>{#p/without}* \"didn\'t you just say not to bring it back to my room?\"',
                    '<23>{#p/papyrusnt}\"FORGET IT!\"'
                 ],
         s_paptrash: pager.create(
            0,
            ...[
               () => [
                  ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                     ? [
                          "<18>{#p/papyrus}{#f/9}I DIDN'T KNOW YOU WERE A FAN OF GARBAGE-HUNTING!",
                          '<18>{#f/0}DR. ALPHYS WOULD LIKE TO KNOW YOUR NUMBER.'
                       ]
                     : []),
                  world.darker ? "<32>{#p/basic}* It's a trash can." : '<32>{#p/basic}* It\'s a \"stellar\" trash can.'
               ],
               pager.create(
                  1,
                  ...[
                     [
                        '<32>{#p/basic}* You can tell this trash can is \"stellar\" because it has \"stellar\" written on the side.'
                     ],
                     [ '<32>{#p/basic}* A \"stellar\" dude with a \"stellar\" trash can.\n* What more could you want.' ],
                     [ '<32>{#p/basic}* The \"stellarest\" trash can this side of town.' ],
                     [ '<32>{#p/basic}* Or any side, for that matter.' ],
                     [ '<32>{#p/basic}* How \"stellar\" is that?' ],
                     [ '<32>{#p/basic}* Very?\n* Very very?\n* More \"stellar\" than anything?' ],
                     [ "<32>{#p/basic}* We've got options here, baby!" ],
                     [
                        '<33>{#p/basic}* But no matter how much time\n  has passed... the trash can\n  still strikes you as \"stellar.\"'
                     ],
                     [
                        '<32>{#p/basic}* Actually, the more I think about it, \"stellar\" doesn\'t begin to scratch the surface.'
                     ],
                     [ '<32>{#p/basic}* Like, maybe \"astronomical\" would be a better term for it.' ],
                     [ "<33>{#p/basic}* Actually, no.\n* That term's reserved for the higher-ups at the Royal Lab." ],
                     [ '<32>{#p/basic}* Hmm...\n* But what if the trash can is secretly a black hole!' ],
                     [ '<32>{#p/basic}* A black hole trash can...\n* Would you risk it?' ],
                     [ "<32>{#p/basic}* That's a weird question." ],
                     [
                        '<32>{#p/basic}* I guess you could say that, thanks to this trash can, I\'m getting all \"spaced out.\"'
                     ],
                     [ "<32>{#p/basic}* You might even say I'm feeling... otherworldly." ],
                     [ '<32>{#p/basic}* ...\n* Ignore that last statement.' ],
                     [ '<32>{#p/basic}* Actually, ignore the last nine things I said entirely.\n* This too.' ],
                     [ "<32>{#p/basic}* Truth is...\n* There's only one adjective this trash can could ever be." ],
                     [ "<32>{#p/basic}* What is it, you ask?\n* Well, I'll tell you... if you really want to know." ],
                     [ "<32>{#p/basic}* It's not an astronomical trash can, not by any means." ],
                     [ "<32>{#p/basic}* It's not black hole-ish in any capacity..." ],
                     [ "<32>{#p/basic}* Don't you remember?\n* Don't you remember how this all started?" ],
                     [ '<32>{#p/basic}* It was the first thing I ever said about this trash can.' ],
                     [ '<32>{#p/basic}* ...\n* I said...\n* Wait for it...' ],
                     [ '<32>{#p/basic}* It\'s a \"stellar\" trash can.' ]
                  ].map(lines => () => world.darker ? [ "<32>{#p/basic}* It's a trash can." ] : lines)
               )
            ].map(
               p => () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : CosmosUtils.provide(p)
            )
         ),
         s_bh_fridge: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The food in this fridge seems decent enough.)' ]
                  : world.runaway
                  ? [ "<32>{#p/basic}* It's been gutted." ]
                  : SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}* Oops, all spaghetti.' ]
                  : [
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}{#f/9}AH-HA!\nINTERESTED IN MY FOOD MUSEUM?',
                               '<18>{#f/0}PLEASE, FEEL FREE TO PERUSE MY CULINARY ARTSHOW.'
                            ]
                          : []),
                       '<32>{#p/basic}* Half of the fridge is filled with containers all labelled \"spaghetti.\"',
                       '<32>* The other half contains nothing but an empty bottle of orange soda.'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The food in this fridge seems decent enough.)' ]
                  : world.runaway
                  ? [ "<32>{#p/basic}* It's been gutted." ]
                  : SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}* Oops, all spaghetti.' ]
                  : [
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [ "<18>{#p/papyrus}GREAT FRIDGE, ISN'T IT?" ]
                          : []),
                       '<32>{#p/basic}* The bottle is labelled as property of \"ALPHYS.\"'
                    ]
         ),
         s_bh_rocktable: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You doubt the stardust is actually edible.)' ]
                  : [
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}AH YES, THE DINING TABLE.',
                               '<18>{#f/5}WE USED TO KEEP A PET MOON ROCK THERE...',
                               '<18>{#f/7}UNTIL ONE DAY, IT TOTALLY VANISHED!',
                               '<18>{#f/4}AT FIRST, I BLAMED THAT MEDDLING CANINE...',
                               '<18>{#f/7}BUT THEN I FOUND THAT SANS HAD USED IT TO TEST HIS...',
                               '<18>{#f/6}HIS... ACTUALLY USEFUL GADGET.\nWOWIE...',
                               "<18>{#f/0}YOU KNOW WHAT, I'LL GIVE IT TO HIM.",
                               '<18>{#f/0}HE GENUINELY TRIED PUTTING EFFORT INTO SOMETHING.',
                               '<18>{#f/4}EVEN IF IT COST US A VALUABLE MOON ROCK.',
                               "<18>{#f/0}YEAH!!\n'E' FOR EFFORT!!"
                            ]
                          : []),
                       "<32>{#p/basic}* It's covered in edible stardust."
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You doubt the stardust is actually edible.)' ]
                  : [ "<32>{#p/basic}* It's covered in edible stardust." ]
         ),
         s_bh_stove: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [
                       [
                          '<25>{#p/asriel1}{#f/13}* Tell me, Frisk...',
                          '<25>{#f/13}* Have you ever heard the tragedy of the abandoned cheesecake?',
                          '<25>{#f/16}* Right here in this pie tin, a confection was created...',
                          '<25>{#f/3}* Something beyond what its baker forsaw.'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/3}* See, Sans had created a cheesecake so sweet...',
                          '<25>{#f/4}* Anyone who tried it would become addicted to it.',
                          '<25>{#f/15}* If he wanted, he could take every customer on the outpost.'
                       ],
                       [
                          "<25>{#p/asriel1}{#f/13}* In the end, Sans knew he'd upstage his brother...",
                          "<25>{#f/15}* And that, by simply creating the cheescake, he'd gone too far.",
                          '<25>{#f/16}* So he stashed it away to avoid taking the responsibility.'
                       ],
                       [ '<25>{#p/asriel1}{#f/16}* Alas, the tragedy of the abandoned cheesecake.' ]
                    ][Math.min(asrielinter.s_bh_stove++, 3)]
                  : [
                       "<32>{#p/basic}* There's an empty pie tin inside the stove.",
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}MY BROTHER ALWAYS GOES OUT TO EAT.',
                               "<18>{#f/4}BUT RECENTLY, HE TRIED 'BAKING' SOMETHING...",
                               '<18>{#f/5}I THINK IT WAS... A CHEESECAKE?',
                               "<18>{#f/6}I'M NOT QUITE SURE."
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       [],
                       [
                          '<25>{#p/asriel1}{#f/13}* Basically, Sans had created a cheesecake so sweet...',
                          '<25>{#f/16}* Anyone who tried it would become addicted to it.',
                          '<25>{#f/3}* If he wanted, he could have the outpost all to himself.',
                          '<25>{#f/3}* The cheesecake, it would seem...',
                          '<25>{#f/4}* Was a pathway to success Papyrus could never approve of.'
                       ],
                       [
                          "<25>{#p/asriel1}{#f/13}* In the end, Sans knew he'd upstage his brother...",
                          "<25>{#f/15}* And that, by simply creating the cheescake, he'd gone too far.",
                          '<25>{#f/16}* So he stashed it away to avoid taking the responsibility.'
                       ],
                       [ '<25>{#p/asriel1}{#f/16}* Alas, the tragedy of the abandoned cheesecake.' ]
                    ][Math.min(asrielinter.s_bh_stove++, 3)]
                  : [ "<32>{#p/basic}* There's an empty pie tin inside the stove." ]
         ),
         s_chew: [ "<32>{#p/basic}* It's a squeaky chew toy labelled 'special attack.'" ],
         s_crossroads_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign espouses the many benefits of boxes.)' ]
               : [
                    '<32>{#p/basic}* \"This is a box.\"',
                    '<32>* \"You can put an item inside or take an item out.\"',
                    '<32>* \"The same box will appear later, so don\'t worry about coming back.\"',
                    '<32>* \"Sincerely, a box fan.\"'
                 ],
         s_doghouse: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The interior wall of this doghouse appears to be covered in strange round circles.)'
                 ]
               : SAVE.data.n.state_starton_greatdog === 2
               ? [ '<32>{#p/basic}* There must be a lot of empty space in this doghouse.' ]
               : world.genocide || world.edgy || world.darker
               ? [ '<32>{#p/basic}* A tiny doghouse.' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* I wonder if this doghouse also travels in time.' ]
               : [ '<32>{#p/basic}* What a tiny doghouse!', '<32>{#p/basic}* Seems bigger on the inside.' ],
         s_doghouse_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You struggle to explain what's written on this sign.)" ]
               : [ '<32>{#p/basic}* \"Woof.\"' ],
         s_dogs_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign rates the danger level of certain smells.)' ]
               : [
                    '<32>{#p/basic}* \"Smell Danger Ratings\"',
                    '<32>* \"Silicone Smell - Robot\"\n* \"WHITE rating\"\n* \"Can become {@fill=#2f2f2f}BLACK{@fill=#fff} rating.\"',
                    '<32>* \"Unsuspicious Smell - Puppy\"\n* \"{@fill=#003cff}BLUE{@fill=#fff} rating.\"\n* \"Smell of rolling around.\"',
                    world.runaway
                       ? '<32>* \"Weird Smell - Human\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} rating.\"\n* \"Escape at all costs!\"'
                       : SAVE.data.n.plot === 72
                       ? '<32>* \"Weird Smell - Human\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} rating.\"\n* \"Can defeat godlike beings.\"'
                       : SAVE.data.n.plot < 31
                       ? '<32>* \"Weird Smell - Human\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} rating.\"\n* \"Destroy at all costs!\"'
                       : '<32>* \"Weird Smell - Puppy?\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} rating.\"\n* \"Deep knowledge of petting.\"'
                 ],
         s_dogstandA: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It would appear this sign belongs to a male dog.)' ]
               : player.position.y > 50
               ? [ '<32>{#p/basic}* \"His.\"' ]
               : [ '<32>{#p/basic}* Inside is a magazine for fancy blue-and-grey furcuts.' ],
         s_dogstandB: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It would appear this sign belongs to a female dog.)' ]
               : player.position.y > 50
               ? [ '<32>{#p/basic}* \"Hers.\"' ]
               : [ '<32>{#p/basic}* Inside is a brochure for blunt heavy-duty weaponry.' ],
         s_dogstandC: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The signed letter inside looks to have been ignored.)' ]
               : world.genocide
               ? [
                    '<32>{#p/basic}* Inside, on the floor, is a signed Royal Guard letter about tactical retreat.',
                    '<32>{#p/basic}* The \"treat\" in \"retreat\" was nibbled off...'
                 ]
               : [
                    '<32>{#p/basic}* Inside, on the floor, is a signed Royal Guard letter about standard uniforms.',
                    "<32>{#p/basic}* It's covered in pawprints."
                 ],
         s_grillbys_beegstool: () =>
            SAVE.data.b.svr
               ? [ '<25>{#p/asriel1}{#f/20}* I think that might be a little tall for you.' ]
               : world.darker
               ? [ '<32>{#p/basic}* Just another barstool.' ]
               : [ '<32>{#p/basic}* A barstool...', '<32>* Seems like the right size for Sans.' ],
         s_grillbys_drinks: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't make out what's under the tray table...)" ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* It's a tray table.", '<32>* The camera on the underside has been taken away.' ]
               : [ "<32>{#p/basic}* It's a tray table.", "<32>* There's a camera hidden on its underside." ],
         s_grillbys_shelf: () =>
            SAVE.data.b.svr
               ? [
                    [
                       "<25>{#p/asriel1}{#f/16}* I don't think tasting any of these would be a good idea.",
                       '<25>{#f/15}* The last time someone had one, they burst into flames...'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/15}* Spoiler alert:\n* It was Grillby.',
                       "<25>{#f/20}* Golly.\n* I'm on fire today."
                    ],
                    [ "<25>{#p/asriel1}{#f/17}* Seriously, though.\n* You probably shouldn't drink these." ]
                 ][Math.min(asrielinter.s_grillbys_shelf++, 2)]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* A few of the beverages on this shelf have been used up.' ]
               : [
                    '<32>{#p/basic}* A shelf full of various party beverages and sickly liquids.',
                    '<32>{#p/basic}* And a single bottle of water labelled \"fire hazard.\"'
                 ],
         s_grillbys_sidestool: () =>
            SAVE.data.b.svr
               ? [ "<25>{#p/asriel1}{#f/20}* That one's definitely too tall for you." ]
               : world.darker
               ? [ '<32>{#p/basic}* Just another barstool.' ]
               : [ '<32>{#p/basic}* This barstool is labelled \"PAPYRUS.\"' ],
         s_grillbys_smolstool: () =>
            SAVE.data.b.svr
               ? [ '<25>{#p/asriel1}{#f/19}* This one seems like just your size.' ]
               : world.darker
               ? [ '<32>{#p/basic}* Just another barstool.' ]
               : SAVE.data.b.oops
               ? [ '<32>{#p/basic}* There is nothing special about this barstool.' ]
               : [
                    '<32>{#p/basic}* Something tells me this barstool is very special.',
                    ...(SAVE.data.n.plot === 33 ? [ '<32>* As for the whoopee cushion on top of it...' ] : [])
                 ],
         s_helipad: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/21}* Ah yes...\n* The hovercar terminal.',
                       "<25>{#f/4}* It's derelict now, but once upon a time...",
                       '<25>{#f/3}* An operator would stand here and direct traffic through the area.'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/3}* This terminal was used mainly when Starton was being built.',
                       '<25>{#f/4}* For the first new area built here, it seemed a wise precaution.',
                       "<25>{#f/13}* Ships carrying supplies from the factory's replicators...",
                       '<25>{#f/13}* Often had trouble landing safely without it.'
                    ],
                    [
                       "<25>{#p/asriel1}{#f/17}* Eventually, terminals like this weren't needed anymore.",
                       '<25>{#f/20}* The pilots of those supply ships got better at landing unaided.',
                       '<25>{#f/13}* And so, the terminal was forgotten...'
                    ],
                    [ '<25>{#p/asriel1}{#f/16}* Just one of many objects whose story is mostly forgotten.' ]
                 ][Math.min(asrielinter.s_helipad++, 3)]
               : [ '<32>{#p/basic}* A derelict terminal once used to direct hovercar landings.' ],
         s_jenga_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign describes the broken state of the display tower's quantum randomizer.)" ]
               : [ '<32>{#p/basic}* \"ATTENTION: The quantum randomizer in this display tower is still broken.\"' ],
         s_library_window: () => [
            '<32>{#p/human}* (You put your hands on window.)',
            ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* Smells like paint.' ])
         ],
         s_librarby_blueBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Then and Now.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Before the war, monsters were taught magic on a regular, day-to-day basis.\"',
                       '<32>* \"When most of our race died, so too did many of our teachers.\"',
                       '<32>* \"To account for this, monsters started learning in larger groups.\"',
                       '<32>* \"These new teaching methods were focused on skills to help us survive on the outpost.\"',
                       '<32>* \"By now, the population woes play a much smaller factor in our lives.\"',
                       '<32>* \"Though, we still stick to the new methods, because...\"',
                       '<32>* \"... we\'re honestly just too lazy to change back.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Then and Now.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Once upon a time, monsters used a wide variety of currencies.\"',
                       '<32>* \"JEWEL and KRIOTAAN were the most prominent... but only on the home planet.\"',
                       '<32>* \"When it came to interactions with humans, the only currency used was GOLD.\"',
                       '<32>* \"Our abundant supply of the shiny mineral granted us many favors...\"',
                       '<32>* \"But as a result, the other curriences lost their value in short time.\"',
                       '<32>* \"Now, we just use gold for everything!\"\n* \"It\'s the monster way.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Then and Now.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Since Erogot\'s fall, our king has done his best to uphold our homeworld\'s legacy.\"',
                       '<32>* \"Even if he lost the damn thing in the process...\"',
                       '<32>* \"We\'ve all come to accept what happened, and we don\'t really blame him anymore.\"',
                       '<32>* \"The past two centuries have been tough, but we grow ever-closer to freedom.\"',
                       '<32>* \"The angel is coming...\"',
                       '<32>* \"... for all we know, it might already be here, having read this very book.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         s_librarby_desk: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You observe the dust gathering on this check-out book.)' ]
               : [ "<32>{#p/basic}* The librarby's check-out book." ],
         s_librarby_greenBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* It\'s a bookshelf labelled \"Information.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"The OuterNet is a joint effort by the king and the royal scientist.\"',
                       '<32>* \"... well, mostly the royal scientist, since the king just wrote the welcome message.\"',
                       '<32>* \"Still, the website serves as a \'virtual town square\' for outpost residents.\"',
                       '<32>* \"All you have to do to create an account is...\"',
                       '<32>* \"Um... well...\"',
                       "<32>* \"The instructions weren't exactly 'clear...'\"",
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* It\'s a bookshelf labelled \"Information.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"If you wanna get around on the outpost, the traveler is your best bet.\"',
                       '<32>* \"They can take you anywhere you wanna go...\"',
                       '<32>* \"... given they\'re available at your nearest taxi stop.\"',
                       '<32>* \"Not gonna lie, the stuff they say seems kinda random.\"',
                       '<33>* \"What\'s \"dog justice\" anyway?\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* It\'s a bookshelf labelled \"Information.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Monsters are free to traverse any area of the outpost.\"',
                       '<32>* \"That is, any area short of the last corridor at the top of the Citadel.\"',
                       '<32>* \"Beyond this, only the royal scientist is allowed through...\"',
                       '<32>* \"... we still don\'t know why.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         s_librarby_ladder: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears the access hatch above this ladder was sealed shut.)' ]
               : [ "<32>{#p/basic}* A random ladder.\n* That's all there is to it." ],
         s_librarby_pinkBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* It\'s a bookshelf labelled \"Monster Biology.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Monster funerals, technically speaking, are cool as heck.\"',
                       '<32>* \"When monsters get old and kick the bucket, they turn into dust.\"',
                       '<32>* \"At funerals, we take that dust and spread it on that person\'s favorite thing.\"',
                       '<32>* \"Then their essence will live on in that thing...\"',
                       '<32>* \"Uhhh, am I at the page minimum yet?\"\n* \"I\'m tired of writing this.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* It\'s a bookshelf labelled \"Monster Biology.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Because they are made of magic, monsters\' bodies are attuned to their SOUL.\"',
                       '<32>* \"If a monster intends to cause harm, and truly believes in themselves...\"',
                       '<32>* \"Such a monster could become unusually powerful.\"',
                       '<32>* \"But most of our kind do not believe in fighting.\"\n* \"Not whole-heartedly.\"',
                       '<32>* \"If an enemy were to attack us again, with only an outpost to defend ourselves...\"',
                       '<32>* ...',
                       '<32>{#p/human}* (You feel it would be best to stop here.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* It\'s a bookshelf labelled \"Monster Biology.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"While monsters are mostly made of magic, humans are mostly made of water.\"',
                       '<32>* \"With their physical forms, humans are far stronger than us.\"',
                       '<32>* \"But, they will never know the joy of expressing themselves through magic.\"',
                       '<32>* \"They\'ll never get a bullet- pattern birthday card...\"',
                       '<32>* \"Or play hide-and-go seek with invisibility and clairvoyance...\"',
                       '<32>* \"Or even create wild light shows with electricity magic!\"',
                       '<32>* \"How unfortunate.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         s_librarby_purpleBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Homeworld History.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Each day on our homeworld was a sight to behold.\"',
                       '<32>* \"To start the morning, bright spires of magical energy pierced the skies.\"',
                       '<32>* \"Throughout the day, these magical formations began to resonate together...\"',
                       '<32>* \"All leading to a dazzling release that sent the planet into darkness.\"',
                       '<32>* \"At nightfall, the process of magical coalescense would begin anew.\"',
                       '<32>* \"Bolts of magical energy previously released struck back down from above.\"',
                       '<32>* \"Once enough energy hit the ground, the spires would rise again...\"',
                       '<32>* \"Such was the cycle that once governed our days and nights.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Homeworld History.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Monsters didn\'t always have such an organized structure, you know?\"',
                       '<32>* \"Long, long ago... thousands of years ago, in fact...\"',
                       '<32>* \"Our race frolicked wild and free, with no sense of order or direction.\"',
                       '<32>* \"Heck, we didn\'t even wear clothing back then!\"',
                       '<32>* \"But as time passed, we yearned for more.\"\n* \"We wanted to evolve...\"',
                       '<32>* \"During the great renaissance, even the very essence of our magic came into focus.\"',
                       '<32>* \"These developments begat our society, and eventually, our way of life.\"',
                       '<32>* \"... I still can\'t believe we just ran around naked for two thousand years.\"',
                       '<32>* \"Where\'s the class in that?\"\n* \"Where\'s the fashion?\"\n* \"Unbelievable.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Homeworld History.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"When monsterkind first met with humanity, Erogot was king.\"',
                       '<32>* \"Through his wisdom and guidance, monsters and humans lived in peace and harmony.\"',
                       '<32>* \"But when Erogot died of old age... things would never be the same.\"',
                       '<32>* \"He was a skilled leader, and one his son could never replace.\"',
                       '<32>* \"The war that followed was... sadly inevitable.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         s_librarby_yellowBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Monster Technology.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Gerson says the outpost used to just be a small space station.\"',
                       '<32>* \"Then, after twenty years of suffering, someone looked at the force field and said...\"',
                       "<32>* \"'Couldn't WE harvest some of that energy?'\"",
                       '<32>* \"A simple but brilliant idea!\"',
                       '<32>* \"As a result, the CORE was built, and with it came a stable power supply.\"',
                       '<32>* \"We\'re still using it to this very day!\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Monster Technology.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Ah, the wonders of artificial intelligence...\"',
                       '<32>* \"... or not.\"',
                       '<32>* \"After the builder bot tragedy of K-541.12, we abandoned the idea of a sentient AI.\"',
                       '<32>* \"In fact, the queen barred anyone from creating new AI programs altogether.\"',
                       '<32>* \"These days, there\'s only one monster who\'d have the skills and resources to do so...\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* This bookshelf is labelled \"Monster Technology.\"',
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Something people forget these days is that there\'s little to no gravity in space.\"',
                       '<32>* \"One of the earliest advancements made by monsters, even before the war...\"',
                       '<32>* \"Was our state-of-the-art gravity manipulation tech.\"',
                       '<32>* \"Even now, it\'s built into all areas of the outpost, both big and small...\"',
                       '<32>* \"You, reading this book, are probably standing on it right now.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         s_math_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't help but be confused at the contents of this sign.)" ]
               : [ '<32>{#p/basic}* \"Warning: Dog Justice\"' ],
         s_pacing_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't help but smile at the contents of this sign.)" ]
               : [ '<32>{#p/basic}* \"AWARE OF DOG\"\n* \"... pleas pet dog...\"' ],
         s_phonecard: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The note requests that you call a certain phone number.)',
                    '<32>{#s/phone}{#p/event}* Dialing...',
                    '<32>{#p/human}* (No connection.)'
                 ]
               : world.runaway
               ? [
                    "<32>{#p/basic}* It's a note.",
                    '<32>* \"Call me!\"\n* \"Here\'s my number!\"',
                    '<32>{#s/phone}{#p/event}* Dialing...',
                    '<32>{#p/basic}* The call went straight to voice-mail.',
                    '<32>{#p/basic}* \"Hello, lonely caller!\"\n* \"Would you like to escape the outpost with me?\"',
                    '<32>{#s/equip}{#p/event}* Click...'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* It's a note.",
                    '<32>* \"Call me!\"\n* \"Here\'s my number!\"',
                    '<32>{#s/phone}{#p/event}* Dialing...',
                    '<32>{#p/human}* (No connection.)'
                 ]
               : [
                    "<32>{#p/basic}* It's a note.",
                    '<32>* \"Call me!\"\n* \"Here\'s my number!\"',
                    '<32>{#s/phone}{#p/event}* Dialing...',
                    '<32>{#p/basic}* The call went straight to voice-mail.',
                    '<32>{#p/basic}* \"Hello, lonely caller!\"\n* \"I\'m so sorry I couldn\'t be here to greet you~\"',
                    '<32>{#s/equip}{#p/event}* Click...',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielVoicemail++ < 1
                       ? [ '<25>{#p/asriel2}{#f/10}* ... weird.' ]
                       : [])
                 ],
         s_sr_cottonball: () =>
            world.darker
               ? [ '<32>{#p/basic}* A series of cotton balls in the way of the closet.' ]
               : [
                    '<32>{#p/basic}* A series of neatly-organized cotton balls.',
                    ...(SAVE.data.b.s_state_inverter
                       ? [ "<32>{#p/basic}* ... makes you wonder why they're still in the way of the closet." ]
                       : [ "<32>{#p/basic}* ... makes you wonder where the rest of Sans's junk went." ])
                 ],
         s_sr_treadmill: [ "<32>{#p/basic}* It's a treadmill.", "<32>{#p/basic}* It's at its highest setting." ],
         s_sr_lamp: [
            "<32>{#p/basic}* It's a lamp with a large note hanging inside.",
            '<23>{#p/papyrusnt}\"SORRY, BUT I TOOK BACK THE FLASHLIGHT YOU WERE USING HERE.\"',
            '<23>{#p/papyrusnt}\"IT\'S NOT THAT I MIND YOU USING MY PROPERTY...\"',
            '<23>{#p/papyrusnt}\"BUT USING IT IN SUCH AN IMPROPER WAY IS ENTIRELY UNJUSTIFIED!\"',
            '<23>{#p/papyrusnt}\"I DON\'T KNOW ABOUT YOU, BUT THE LAST TIME I CHECKED...\"',
            '<23>{#p/papyrusnt}\"A FLASHLIGHT DID NOT COUNT AS A LIGHTBULB!!\"'
         ],
         s_sc_book: [
            "<32>{#p/basic}* It's an old logbook from the Royal Lab.",
            '<32>{#p/human}* (You turn to the opened page...)',
            '<32>{#p/basic}* \"Activity log, K-615.07\"',
            '<32>* \"An ideal subject has been picked from the grove.\"',
            '<32>* \"Preparations for the test substance are due to conclude in the coming days.\"',
            '<32>* \"Soon, the subject will be injected with it.\"',
            '<32>* \"With this, our freedom could be closer than ever...\"'
         ],
         s_sc_drawer: [
            "<32>{#p/basic}* There's a photo album inside the drawer.",
            '<32>{#p/basic}* Inside the album, there are photos of Sans and Alphys at the Royal Lab.',
            '<32>{#p/basic}* Running experiments, binge-watching old sci-fi anime...',
            '<32>{#p/basic}* They look happy.'
         ],
         s_sc_diagram: () => [
            "<32>{#p/basic}* On the table, there's a blueprint for a force field power drain device.",
            '<32>{#p/basic}* On the wall, there are diagrams of various other concepts...',
            '<33>{#p/basic}* A non-linear temporal accessor, a wormhole aperture stabilizer, and a monster-bound human SOUL.',
            ...(!SAVE.data.b.s_state_charasker
               ? ((SAVE.data.b.s_state_charasker = true),
                 [
                    '<32>{#p/basic}* ... is that possible?\n* A monster SOUL surviving within a human SOUL...?',
                    "<32>{#p/basic}* But the identity of the monster SOUL's owner would be lost...",
                    '<32>{#p/basic}* ...'
                 ])
               : [ '<32>{#p/basic}* ...' ])
         ],
         s_pr_papbed: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You appreciate the bed for being very awesome in general.)' ]
                  : [
                       '<32>{#p/basic}* A neatly-made hypercar bed.',
                       ...(roomready()
                          ? [
                               "<18>{#p/papyrus}THAT'S MY BED!",
                               '<18>{#f/4}IF I EVER GET TO EXPLORE THE STARS...',
                               "<18>{#f/0}I'D LIKE TO CRUISE DOWN A LONG INTER- STELLAR HIGHWAY.",
                               '<18>STATIC IN MY HAIR, STARLIGHT ON MY SKIN...',
                               "<18>{#f/4}OF COURSE, THAT'S JUST A DREAM.",
                               '<18>{#f/0}SO INSTEAD I CRUISE WHILE I SNOOZE.'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You thank the bed for being very awesome in general.)' ]
                  : [ '<32>{#p/basic}* A neatly-made hypercar bed.' ]
         ),
         s_pr_papbones: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [
                       "<32>{#p/basic}* (You reach into the box, but the bones don't deal any damage.)",
                       ...[
                          [ '<25>{#p/asriel1}{#f/21}* Careful, Frisk!\n* Those bones might still be active...' ],
                          [ '<25>{#p/asriel1}{#f/16}* ... or maybe not.' ],
                          [ "<25>{#p/asriel1}{#f/13}* I wonder if you're the kind of person who stands on hot coals." ],
                          [ '<25>{#p/asriel1}{#f/8}* Boney hot coals.' ]
                       ][Math.min(asrielinter.s_pr_papbones++, 3)]
                    ]
                  : [
                       '<32>{#p/basic}* A box of bones.',
                       ...(roomready()
                          ? [
                               '<18>{#p/papyrus}HEY, THOSE ARE ALL THE ATTACKS I USED ON YOU.',
                               '<18>GREAT MEMORIES, HUH?',
                               '<18>SEEMS LIKE IT WAS ONLY YESTERDAY...',
                               SAVE.data.n.plot < 42.1
                                  ? '<18>{#f/4}EVEN THOUGH IT BASICALLY JUST HAPPENED.'
                                  : '<18>{#f/4}EVEN THOUGH IT JUST HAPPENED EARLIER TODAY.'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       "<32>{#p/basic}* (You reach into the box, but the bones don't deal any damage.)",
                       ...[
                          [],
                          [ '<25>{#p/asriel1}{#f/16}* ... or maybe not.' ],
                          [ "<25>{#p/asriel1}{#f/13}* I wonder if you're the kind of person who stands on hot coals." ],
                          [ '<25>{#p/asriel1}{#f/8}* Boney hot coals.' ]
                       ][Math.min(asrielinter.s_pr_papbones++, 3)]
                    ]
                  : [ '<32>{#p/basic}* A box of bones.' ]
         ),
         s_pr_papcloset: pager.create(
            0,
            () => [
               '<32>{#p/human}* (You look inside the closet...)',
               ...(SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (It's hard for you to see in such a dark place.)" ]
                  : !world.runaway
                  ? [ '<32>{#p/basic}* The clothes inside have been frantically shifted around.' ]
                  : [
                       '<32>{#p/basic}* Clothes are hung up neatly inside.',
                       SAVE.data.n.plot === 72
                          ? '<32>* One of the clothes has \"Free Bones\" written on it.'
                          : '<32>* Many of the clothes have handwritten text drawn on them.'
                    ]),
               ...(roomready()
                  ? [
                       "<18>{#p/papyrus}DON'T WORRY, THE CLOSET IS SKELETON-FREE.",
                       "<18>{#f/4}UNLESS I'M CHANGING, OF COURSE."
                    ]
                  : [])
            ],
            () => [
               '<32>{#p/human}* (You look inside the closet...)',
               ...(SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (It's hard for you to see in such a dark place.)" ]
                  : !world.runaway
                  ? [ '<32>{#p/basic}* The clothes inside have been frantically shifted around.' ]
                  : [
                       '<32>{#p/basic}* Clothes are hung up neatly inside.',
                       SAVE.data.n.plot === 72
                          ? '<32>* One of the clothes has \"Free Bones\" written on it.'
                          : '<32>* Many of the clothes have handwritten text drawn on them.'
                    ])
            ]
         ),
         s_pr_papposter: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [
                       [
                          "<25>{#p/asriel1}{#f/17}* Ah.\n* That's Papyrus's special attack...",
                          '<25>{#f/13}* In previous timelines, this attack right here...',
                          '<25>{#f/15}* Caused me my fair share of defeats.',
                          "<25>{#f/16}* ... don't ask how or why I was fighting Papyrus."
                       ],
                       [ "<25>{#p/asriel1}{#f/10}* What?\n* It wasn't anything bad.\n* Not that time, anyway." ],
                       [
                          '<25>{#p/asriel1}{#f/16}* Okay, okay.\n* I might have disguised myself as a human.',
                          '<25>{#f/15}* ... yeah.\n* It looked as bad as you think it would.',
                          '<25>{#f/5}* But hey, I got a chance to battle the great Papyrus!'
                       ],
                       [ '<25>{#p/asriel1}{#f/20}* Totally worth it.' ]
                    ][Math.min(asrielinter.s_pr_papposter++, 3)]
                  : [
                       "<32>{#p/basic}* It's a flag with a menacing skull painted on it.",
                       ...(roomready()
                          ? [
                               "<18>{#p/papyrus}ISN'T THAT POSTER NEATO?",
                               '<18>UNDYNE FOUND IT ON A TRASH RUN.',
                               '<18>{#f/4}IT HAD A SKULL AND CROSSBONES ON IT AT FIRST...',
                               '<18>{#f/9}BUT I THOUGHT OF SOMETHING BETTER!'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       [],
                       [ "<25>{#p/asriel1}{#f/10}* What?\n* It wasn't anything bad.\n* Not that time, anyway." ],
                       [
                          '<25>{#p/asriel1}{#f/16}* Okay, okay.\n* I might have disguised myself as a human.',
                          '<25>{#f/15}* ... yeah.\n* It looked as bad as you think it would.',
                          '<25>{#f/5}* But hey, I got a chance to battle the great Papyrus!'
                       ],
                       [ '<25>{#p/asriel1}{#f/20}* Totally worth it.' ]
                    ][Math.min(asrielinter.s_pr_papposter++, 3)]
                  : [ "<32>{#p/basic}* It's a flag with a menacing skull painted on it." ]
         ),
         s_pr_paptable: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You marvel at the detail of these action figures...)' ]
                  : [
                       '<32>{#p/basic}* A set of action figures with tacky, matching uniforms.',
                       ...(roomready()
                          ? [
                               '<18>{#p/papyrus}AH, YES, ACTION FIGURES.',
                               '<18>A GREAT REFERENCE FOR THEORETICAL BATTLE SCENARIOS.',
                               '<18>{#f/4}BUT HOW DO I HAVE SO MANY?',
                               '<18>{#f/6}WELL, UMM...\nTHE KING GAVE THEM TO ME AS A GIFT...',
                               '<18>{#f/5}A GIFT I TRULY WISH I COULD REPAY HIM FOR.'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (Upon reflection, you realize who created these.)' ]
                  : [ '<32>{#p/basic}* A set of action figures with tacky, matching uniforms.' ]
         ),
         s_puzzle1_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes the basics of solving the puzzle.)' ]
               : [ '<32>{#p/basic}* \"Trigger each circuit in order.\"' ],
         s_puzzle2_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign defines a starting point for solving the puzzle.)' ]
               : [ '<32>{#p/basic}* \"Start at the left.\"' ],
         s_puzzle3_note: () =>
            SAVE.data.b.svr
               ? world.postnoot && world.nootflags.has('s_puzzle3') // NO-TRANSLATE

                  ? [
                       "<32>{#p/human}* (The note's brags about having solved a puzzle in advance.)",
                       ...[
                          [ '<25>{#p/asriel1}{#f/20}* Ha, uh, I wonder who wrote that note, huh?\n* Yeah...' ],
                          [ "<25>{#p/asriel1}{#f/20}* Couldn't be me!" ],
                          [ '<25>{#p/asriel1}{#f/13}* ...' ]
                       ][Math.min(asrielinter.s_puzzle3_note++, 2)]
                    ]
                  : [ '<32>{#p/human}* (The note remarks about how the puzzle solution was not modified as intended.)' ]
               : world.postnoot && world.nootflags.has('s_puzzle3') // NO-TRANSLATE

               ? [
                    [
                       "<32>{#p/basic}* It's a note from someone who didn't say who they were...",
                       '<32>* \"Puzzles like these can be so annoying, can\'t they?\"',
                       '<32>* \"Thankfully, I\'ve taken care of it for you.\"',
                       '<32>* \"Isn\'t that nice?\"\n* \"You should be thankful!\"',
                       '<#32>  - \"Sincerely,\"\n  Your Best Friend'
                    ],
                    [
                       "<32>{#p/basic}* It's a note from someone who didn't say who they were...",
                       '<32>* \"Don\'t worry.\"\n* \"No matter how many times you do this over...\"',
                       '<32>* \"I\'ll always be here to make sure you never have to deal with a puzzle again.\"',
                       '<32>* \"It\'s the least I can do.\"',
                       '<#32>  - \"Forevermore,\"\n  Your Best Friend'
                    ]
                 ][Math.min(SAVE.flag.n.neutral_twinkly_loop1, 1)]
               : !world.genocide && world.edgy
               ? [
                    "<32>{#p/basic}* It's a note from Sans...",
                    '<32>{#p/without}* \"welp.\"\n* \"seems my bro found out about you after all.\"',
                    '<32>* \"i told him everything you\'ve done up to now, and he\'s agreed to stay put.\"',
                    '<32>* \"it\'s a shame, isn\'t it?\"',
                    '<32>* \"papyrus shouldn\'t have to deal with this kinda stuff.\"',
                    '<32>* \"but i guess that\'s the galaxy we live in, now.\"',
                    '<32>* \"well.\n* good luck with the puzzle.\"',
                    '<32>* \"i\'m sure it\'ll take you no time at all.\"',
                    '<#32>  - \"with all due respect,\"\n  sans'
                 ]
               : [
                    "<32>{#p/basic}* It's a note from Papyrus...",
                    '<23>{#p/papyrus}{#f/30}\"HUMAN!! THIS PUZZLE IS NOT AS IT SEEMS.\"',
                    '<23>\"WHILE I WAS WAITING FOR YOU, I TRIED TO MODIFY IT...\"',
                    '<23>\"TO MAKE THE PATTERN RESEMBLE MY FACE, OF COURSE!\"',
                    '<23>\"BUT SOMETHING WENT WRONG...\"',
                    '<23>\"ALL I COULD CREATE WAS A LOUSY ARROW SHAPE!!!\"',
                    '<23>\"(IN OTHER WORDS, YOU WILL HAVE TO SOLVE IT YOURSELF.)\"',
                    '<23>\"BUT DON\'T WORRY!\"\n\"I KNOW YOU CAN DO IT, HUMAN!\"',
                    '<#23>  - \"WITH THE UTMOST FAITH,\"\n  PAPYRUS'
                 ],
         s_redbook: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The uniquely-colored book describes a secret weapon lost to time.)' ]
               : [
                    "<32>{#p/basic}* It's a bookshelf.",
                    '<32>{#p/human}* (You pick out the red book...)',
                    '<32>{#p/basic}* \"At the height of the war, a secret division of the royal forces was established.\"',
                    '<32>{#p/basic}* \"The so-called \'special weapons\' division, focused on experimental research.\"',
                    '<32>{#p/basic}* \"The division would develop a variety of artifacts, but all proved useless in battle...\"',
                    '<32>{#p/basic}* \"That is, all but one.\"\n* \"An enchanted tome known only as \'The Epiphany.\'\"',
                    '<32>{#p/basic}* \"Its power was so great, it was deemed too dangerous, even for use against humans.\"',
                    '<32>{#p/basic}* \"The tome was locked from the inside, and stowed away in short order.\"',
                    '<32>{#p/basic}* \"Some say the tome was taken aboard the transport ship used to reach the outpost.\"',
                    '<32>{#p/basic}* \"If so, where is it?\"\n* \"And how would one go about unlocking it?\"',
                    '<32>{#p/basic}* \"Perhaps these questions are better left unanswered.\"',
                    '<32>{#p/human}* (You put the book back on the shelf.)'
                 ],
         s_sansbox: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (Due to how full it is, you can't seem to see inside the mailbox.)" ]
               : SAVE.data.n.plot === 72 && !world.runaway
               ? [
                    '<32>{#p/basic}* Somehow, the mailbox has been stuffed with even more unread junk mail than before.',
                    ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ... color me surprised.' ])
                 ]
               : [
                    "<32>{#p/basic}* It's a mailbox overflowing with unread junk mail.",
                    ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ... he never reads the mail anyway.' ])
                 ],
         s_sheddoor: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ]
               : [ "<32>{#p/basic}* It's locked from the inside." ],
         s_slew: [ "<32>{#p/basic}* It's dog food.\n* The pieces look like bones." ],
         s_spagnote: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The note declares the brilliance of enticing you with a place of spaghetti.)' ]
               : !world.genocide && world.edgy
               ? [
                    "<32>{#p/basic}* It's a note from Sans...",
                    '<32>{#p/without}* \"whoops.\"\n* \"seems like you\'ve found my bro\'s spaghetti.\"',
                    '<32>* \"looks tasty, right?\"',
                    '<32>* \"well.\"\n* \"it turns out that\'s kind of the point.\"',
                    '<32>* \"i\'d be careful with it if i were you...\"',
                    '<32>* \"\'cause the more time you spend trying to take this...\"',
                    '<32>* \"the more time i have to prepare for the next puzzle.\"',
                    '<#23>  \"joke\'s on you,\"\n  sans'
                 ]
               : [
                    "<32>{#p/basic}* It's a note from Papyrus...",
                    '<23>{#p/papyrus}{#f/30}\"HUMAN!!\"\n\"PLEASE ENJOY THIS SPAGHETTI.\"',
                    '<23>(\"LITTLE DO YOU KNOW, THIS SPAGHETTI IS A TRAP...\")',
                    '<23>(\"DESIGNED TO ENTICE YOU!!!\")',
                    '<23>(\"YOU\'LL BE SO BUSY TRYING TO REACH IT...\")',
                    '<23>(\"THAT YOU WON\'T REALIZE THAT YOU AREN\'T PROGRESSING!!\")',
                    '<23>(\"THOROUGHLY JAPED AGAIN BY THE GREAT PAPYRUS!!!\")',
                    '<#23>  \"NYEH-HEH-HEH,\"\n  PAPYRUS'
                 ],
         s_town_camera1: () =>
            SAVE.data.b.svr
               ? []
               : world.runaway
               ? [
                    "<32>{#p/basic}* There's no longer anyone to spy on you through the camera hidden in these crystal pods."
                 ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* There's no longer a camera hidden in these crystal pods." ]
               : [ "<32>{#p/basic}* There's a camera hidden in these crystal pods." ],
         s_trapnote: () =>
            [
               [
                  "<32>{#p/basic}* It's a note from Papyrus...",
                  '<23>{#p/papyrus}{#f/30}\"SORRY, I HAVE TO LOCK YOU IN THE GUEST ROOM UNTIL UNDYNE ARRIVES.\"',
                  '<23>\"FEEL FREE TO MAKE YOURSELF AT HOME!!!\"',
                  '<22>\"REFRESHMENTS AND ACCOMODATIONS HAVE BEEN PROVIDED.\"',
                  '<#23>  \"NYEHFULLY YOURS,\"\n  PAPYRUS'
               ],
               [
                  "<32>{#p/basic}* It's a note from Papyrus...",
                  '<23>{#p/papyrus}{#f/30}\"PLEASE ASK BEFORE YOU ESCAPE!!!\"',
                  '<23>\"WHEN YOU WENT MISSING I GOT WORRIED SICK!!!\"',
                  '<#23>  \"SLIGHTLY BONETROUSLED,\"\n  PAPYRUS'
               ],
               [
                  "<32>{#p/basic}* It's a note from Papyrus...",
                  '<23>{#p/papyrus}{#f/30}\"IF YOU\'RE ONLY LOOKING FOR A PLACE TO STAY...\"',
                  '<23>\"JUST ASK!!! YOU DON\'T NEED TO FIGHT ME!!!\"',
                  '<#23>  \"YOUR HOST,\"\n  PAPYRUS'
               ]
            ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 2)],
         s_tree: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [
                       [
                          '<25>{#p/asriel1}{#f/20}* $(name) always liked to call this ant colony a \"civilization.\"',
                          '<25>{#f/17}* I guess it was their way of trying to sound smart.',
                          '<25>{#f/13}* I tried to sound smart too, but Mom and Dad saw right through me.',
                          '<25>{#f/13}* $(name) always was a better liar than me...'
                       ],
                       [
                          '<26>{#p/asriel1}{#f/13}* After $(name) arrived, they tried to convince us they were a diplomat.',
                          "<25>{#f/17}* Thankfully, even they couldn't lie THAT well.",
                          "<25>{#f/15}* Imagine how much worse things could've gone if they'd been believed..."
                       ],
                       [
                          "<26>{#p/asriel1}{#f/17}* I'm glad you're not a liar, Frisk.",
                          "<25>{#f/13}* I've had enough dishonesty in my life as it is.",
                          '<25>{#f/20}* ... sorry.\n* I guess this sorta came out of left field.'
                       ],
                       [ '<26>{#p/asriel1}{#f/15}* Life sure does like to throw curveballs at you sometimes...' ]
                    ][Math.min(asrielinter.s_tree++, 3)]
                  : world.darker
                  ? [ "<32>{#p/basic}* There's nothing special about this tree-like structure." ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}* Soon enough, this civilization will need to migrate once again.',
                       '<32>* Where shall they go?\n* Sooner or later, we will know.'
                    ]
                  : [
                       '<32>{#p/basic}* This innocent tree-like structure is actually the home of a civilization.',
                       '<32>* On the brink of extinction, they migrated here to save their species.'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       [],
                       [
                          '<26>{#p/asriel1}{#f/13}* After $(name) arrived, they tried to convince us they were a diplomat.',
                          "<25>{#f/17}* Thankfully, even they couldn't lie THAT well.",
                          "<25>{#f/15}* Imagine how much worse things could've gone if they'd been believed..."
                       ],
                       [
                          "<26>{#p/asriel1}{#f/17}* I'm glad you're not a liar, Frisk.",
                          "<25>{#f/13}* I've had enough dishonesty in my life as it is.",
                          '<25>{#f/20}* ... sorry.\n* I guess this sorta came out of left field.'
                       ],
                       [ '<26>{#p/asriel1}{#f/15}* Life sure does like to throw curveballs at you sometimes...' ]
                    ][Math.min(asrielinter.s_tree++, 3)]
                  : world.darker
                  ? [ '<32>{#p/basic}* ...' ]
                  : SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}* Don't worry.\n* They'll find their own way." ]
                  : [ "<32>{#p/basic}* Pro tip...\n* Don't shake the innocent tree- like structure." ]
         ),
         doginfo: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The dog treats inside look to have been somewhat devoured.)' ]
               : SAVE.data.n.state_starton_doggo === 2 || SAVE.data.n.plot > 27
               ? SAVE.data.b.oops
                  ? [ '<32>{#p/basic}* Inside is a half-empty pack of dog treats.' ]
                  : [ "<32>{#p/basic}* Inside is a pack of dog treats. It's half-full." ]
               : [
                    SAVE.data.n.state_starton_doggo === 3
                       ? '<32>{#p/basic}* Inside is a rather sleepy guard dog.\n* It cannot see you.'
                       : '<32>{#p/basic}* Inside is a rather confused guard dog.\n* It cannot see you.'
                 ]
      },
      truetext: {
         doggo1: [ '<32>{#p/basic}* Dog treats?\n* That dog needs a therapist.' ],
         doggo2: [ '<32>{#p/basic}* Fetch, huh?', "<33>{#p/basic}* Now we're getting places..." ],
         dogs1: [ '<32>{#p/basic}* The things we do for the good of the canines.' ],
         dogs2: [ '<33>{#p/basic}* The rusty wrench strikes again.' ],
         fetch: () =>
            [
               [ '<32>{#p/basic}* Fetch, huh?', "<33>{#p/basic}* Now we're getting places..." ],
               [ "<32>{#p/basic}* That's two for two on the rusty wrench method.", '<32>{#p/basic}* What else is new?' ],
               [ "<32>{#p/basic}* Wow, you can't keep getting away with this!" ]
            ][SAVE.data.n.state_starton_latefetch++],
         great1: [
            "<32>{#p/basic}* Aww, that's so cute!",
            "<32>{#p/basic}* It's a proven fact that little puppy kisses are the best."
         ],
         great2: [
            '<32>{#p/basic}* The entire canine unit, beaten with nothing but a wrench and a game of fetch.',
            '<32>* The lunacy speaks for itself.'
         ],
         great3: [ '<32>{#p/basic}* What just happened?' ],
         lesser1: [ '<32>{#p/basic}* Mysterious words about extending necks suddenly make a lot more sense.' ],
         lesser2: [
            "<32>{#p/basic}* That's two for two on the rusty spanner method.",
            '<32>{#p/basic}* What else is new?'
         ],
         papyrus1: [
            '<32>{#p/basic}* Papyrus is well-known for his spaghetti.',
            "<32>* What's not as well-known is that he uses a human recipe instead of a monster one.",
            '<32>* An honest mistake by his, uh, \"cooking instructor,\" but...',
            '<32>* Apart from himself, only a human would enjoy it.',
            '<32>* The irony is off the charts.'
         ],
         papyrus3: [ '<32>{#p/basic}* This is it...', "<32>* You're about to spar with the coolest skeleton in town." ],
         papyrus4: [
            '<32>{#p/basic}* He might as well have been waiting his whole life for this moment...',
            "<32>* If I were you, I wouldn't let it go to waste."
         ],
         papyrus5: [ "<32>{#p/basic}* Don't worry.", "<32>* With any luck, you'll be best friends in no time." ],
         puzzle1: () =>
            SAVE.data.b.svr
               ? [ "<25>{#p/asriel1}{#f/20}* Not bad, Frisk.\n* I didn't know you were a mathematics expert..." ]
               : [ '<32>{#p/basic}* Wow.\n* You actually solved it?' ],
         sans3: [ '<32>{#p/basic}* You tried.' ],
         sans4: [ '<32>{#p/basic}* Have you done this before...?' ],
         sans5: [ '<32>{#p/basic}* Really, Sans?\n* That \"puzzle\" wasn\'t even worth looking at.' ],
         sans6: [ '<32>{#p/basic}* Really, Sans?\n* That \"puzzle\" was impossible.' ],
         sans7: [ '<32>{#p/basic}* Well, that was anti-climactic.' ],
         sans8: [ "<32>{#p/basic}* I'm just as confused as you." ],
         sans9: [ '<32>{#p/basic}* Oh, come on!\n* I wanted to see it in action!', '<32>* ... oh well...' ],
         papdate: () => [
            '<32>{#p/basic}* So... Papyrus, huh?',
            SAVE.data.n.plot > 64.1
               ? '<32>* After all this time, you finally became friends.'
               : '<32>* Somehow I knew you two would end up as friends.',
            '<32>* ...\n* I watched that skeleton grow up here...',
            '<32>* Always setting a good example for those around him...',
            '<32>* ... and for me.',
            "<32>* It's too bad I can't tell him that myself.",
            "<32>* But that's okay.",
            '<32>* Seeing you two get along more than makes up for it.'
         ]
      },
      vegetoid: pager.create(
         0,
         () => [
            SAVE.data.n.plot === 72
               ? '<32>{#p/basic}* I heard the taxi driver will be here when everyone else is off the outpost.'
               : world.population === 0
               ? '<32>{#p/basic}* I heard the taxi driver will be here when everyone else is gone.'
               : "<32>{#p/basic}* I heard the taxi driver doesn't eat their greens.",
            '<33>{#p/basic}* Are they even a real monster...?'
         ],
         () => [
            SAVE.data.n.plot === 72
               ? "<32>{#p/basic}* A real monster wouldn't hesitate to escape this dreadful place."
               : world.population === 0
               ? '<32>{#p/basic}* ...'
               : '<32>{#p/basic}* Real monsters always eat their greens.'
         ]
      ),
      vegetoidx: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to find anyone down there.)" ]
            : world.bulrun
            ? [ '<32>{#p/basic}* ... but everybody ran.' ]
            : [ '<32>{#p/basic}* ... but nobody came.' ],
      xtowerHiscoreNames: {
         kidd: 'UNDYNEFAN10',
         napstablook: 'NAPSTABLOOK22',
         papyrus: 'COOLSKELETON95',
         sans: 'lazybones.',
         undyne: 'STRONGFISH91',
         you: '(Unknown)'
      },
      xtowerMessage1: 'New High Score!',
      xtowerMessage2: 'Better Luck Next Time...',
      xtowerMessage3: 'Thanks For Playing!',
      xtowerSans: () =>
         world.genocide
            ? [
                 '<32>{#p/event}* Ring, ring...',
                 "<32>{#p/alphys}* So... killing him wasn't g-good enough, huh?",
                 '<32>* You just had to go and beat his score on my... stupid m-minigame...',
                 '<32>* Ehehe...',
                 "<32>* You're truly disgusting...",
                 '<32>* ...',
                 '<32>{#s/equip}{#p/human}* (You lost all of your G.)',
                 ...(world.goatbro
                    ? SAVE.flag.n.genocide_milestone < 5
                       ? SAVE.flag.n.ga_asrielXtower++ < 1
                          ? [ "<25>{#p/asriel2}{#f/10}* Daring today, aren't we?" ]
                          : []
                       : SAVE.flag.n.genocide_milestone < 6
                       ? SAVE.flag.n.ga_asrielAlphysCom2++ < 1
                          ? [ "<25>{#p/asriel2}{#f/1}* Now THAT's the Alphys I like to see." ]
                          : []
                       : SAVE.flag.n.ga_asrielAlphysCom5++ < 1
                       ? [ "<25>{#p/asriel2}{#f/4}* Too bad this won't save her when she's dead." ]
                       : []
                    : [])
              ]
            : [
                 '<32>{#p/event}* Ring, ring...',
                 '<25>{#p/sans}* didja seriously just put in all that effort tryna beat my score?',
                 "<25>{#f/3}* wow.\n* you're even more stubborn than my bro.",
                 ...(SAVE.data.n.state_starton_papyrus === 1
                    ? [
                         '<25>{#f/3}* ...',
                         "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Too bad he's dead, huh?",
                         '{*}{#s.resume}{%}'
                      ]
                    : [
                         SAVE.data.n.plot === 72
                            ? "<25>{#f/0}* i'd give you a special reward, but i'm still looking for toriel."
                            : "<25>{#f/0}* i'd give you a special reward, but i'm on break right now.",
                         ...(world.edgy_x
                            ? [ '<25>{#f/0}* no hard feelings.', '<32>{#s/equip}{#p/event}* Click...' ]
                            : [
                                 "<25>{#f/2}* instead, i'll just send ya some pocket change.",
                                 '<32>{#s/equip}{#p/human}* (You got 10000G.)'
                              ])
                      ])
              ],
      xtowerAsriel: [
         '<25>{#p/asriel1}{#f/13}* ... you actually beat the high score?',
         '<25>{#f/17}* Wow.\n* I under-estimated you.',
         '<25>{#f/20}* Very cool, Frisk.'
      ],
      xtowerScore: 'Score: $(x)'
   },

   b_group_starton: {
      dogs: () => (world.goatbro ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ] : [ '<32>{#p/story}* Dogi assault you!' ]),
      spacetopJerry: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Tacky hats and fickle friends.' ]
            : [ '<32>{#p/story}* Astro Serf saunters in!\n* Jerry came too.' ],
      stardrakeSpacetop: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* The teenage idiot squad.' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake and Astro Serf pose like bad guys.' ]
            : [ '<32>{#p/story}* Stardrake and Astro Serf pose like bad guys.' ],
      stardrakeSpacetop2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* One left.' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake remains steady.' ]
            : [ '<32>{#p/story}* Stardrake remains steady.' ],
      stardrakeSpacetop2b: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Astro Serf remains steady.' ],
      stardrakeSpacetop2c: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Just Astro now.' ],
      stardrakeSpacetop2d: () => (world.goatbro ? [ '<32>{#p/asriel2}* Jerry.' ] : [ '<32>{#p/story}* Jerry.' ]),
      stardrakeSpacetopJerry: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* The teenage idiot squad.\n* Also, Jerry.' ]
            : SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry and friends appear!' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Astro Serf and Chilldrake confront you, sighing.\n* Jerry.' ]
            : [ '<32>{#p/story}* Astro Serf and Stardrake confront you, sighing.\n* Jerry.' ],
      stardrakeSpacetopJerry2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Two left.' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Astro Serf and Chilldrake remain steady.' ]
            : [ '<32>{#p/story}* Astro Serf and Stardrake remain steady.' ],
      stardrakeSpacetopJerry2b: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Two left.' ] : [ '<32>{#p/story}* Astro Serf remains steady.\n* Jerry.' ],
      stardrakeSpacetopJerry2c: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Two left.' ]
            : SAVE.data.b.s_state_chilldrake
            ? SAVE.data.b.spared_jerry
               ? [ '<32>{#p/story}* Chilldrake and Jerry remain steady!' ]
               : [ '<32>{#p/story}* Chilldrake remains steady.\n* Jerry.' ]
            : SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Stardrake and Jerry remain steady!' ]
            : [ '<32>{#p/story}* Stardrake remains steady.\n* Jerry.' ]
   },

   b_opponent_stardrake: {
      act_check: () =>
         world.goatbro
            ? SAVE.data.b.s_state_chilldrake
               ? [
                    '<32>{#p/asriel2}* Chilldrake, the teen rebel.\n* Nothing more pointless than a rebel without a cause.'
                 ]
               : [
                    '<32>{#p/asriel2}* Stardrake, the comedian.\n* A bigger joke than he himself could ever hope to tell.'
                 ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<33>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebels against everything!!\n* On the lookout for Starry.' ]
            : [ '<32>{#p/story}* STARDRAKE - ATK 12 DEF 7\n* This teen comedian fights to keep a captive audience.' ],
      act_check2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebels against everything!!\n* Looking for a way out.' ]
            : [ "<32>{#p/story}* STARDRAKE - ATK 12 DEF 7\n* This teen isn't taking your punchline very well." ],
      act_check3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebels against everything!!\n* Especially flirting!!' ]
            : [ '<32>{#p/story}* STARDRAKE - ATK 12 DEF 7\n* Flirting is no joke for this teen comedian.' ],
      act_check4: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* The rebellion is fading...' ]
            : [ '<32>{#p/story}* STARDRAKE - ATK 12 DEF 7\n* Things are looking up for this teen comedian.' ],
      act_flirt: () => [ '<32>{#p/human}* (You make a romantic joke.)' ],
      flirtTalk1: [ "<08>{#p/basic}{~}You're weird." ],
      flirtTalk2: [ "<08>{#p/basic}{~}You're mean AND weird." ],
      genoStatus: () =>
         SAVE.data.b.s_state_chilldrake ? [ '<32>{#p/asriel2}* Chilldrake.' ] : [ '<32>{#p/asriel2}* Stardrake.' ],
      heckleStatus: () =>
         world.goatbro
            ? SAVE.data.b.s_state_chilldrake
               ? [ '<32>{#p/asriel2}* Chilldrake.' ]
               : [ '<32>{#p/asriel2}* Stardrake.' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is puffed up...' ]
            : [ '<32>{#p/story}* Stardrake is puffed up...' ],
      heckleTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}No!!\nThis is the way!' ]
            : [ "<08>{#p/basic}{~}THIS won't be funny either!" ],
      heckleTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Filthy law- obider.' ]
            : [ '<08>{#p/basic}{~}Is your flesh rotten as you?' ],
      heckleTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ "<08>{#p/basic}{~}Defiance can't be defied!" ]
            : [ '<08>{#p/basic}{~}(Insults towards humans)' ],
      heckleText1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You denounce Chilldrake for its cause.)' ]
            : [ '<32>{#p/human}* (You boo Stardrake.)' ],
      heckleText2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You tell Chilldrake that they should be a rebel somewhere else.)' ]
            : [ "<32>{#p/human}* (You tell Stardrake that they aren't funny.)" ],
      heckleText3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [
                 '<32>{#p/human}* (You mock Chilldrake for protesting out in the middle of nowhere.)',
                 '<32>{#p/basic}* Chilldrake takes your mockery as advice, and saunters off to town...'
              ]
            : [
                 '<32>{#p/human}* (You tell Stardrake that no one will ever love them the way they are.)',
                 '<32>{#p/basic}* Stardrake struggles to make a retort, and slinks away utterly crushed...'
              ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Almost dead.' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is flaking apart.' ]
            : [ '<32>{#p/story}* Stardrake is flaking apart.' ],
      idleTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Brush my teeth?\nNo way in heck!' ]
            : [ '<08>{#p/basic}{~}Try not to get \"spaced\" out..' ],
      idleTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}No bedtime for this bird!' ]
            : [ '<08>{#p/basic}{~}I\'m just in my moon pun \"phase\"' ],
      idleTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Who needs parents anyway!?' ]
            : [ '<08>{#p/basic}{~}Haven\'t seen home in \"light- years..\"' ],
      idleTalk4: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Live wild and free, I say!' ]
            : [ '<08>{#p/basic}{~}Oh, it\'s on.\n\"Tachy- on.\"' ],
      idleTalk5: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Nobody tells ME what to do!' ]
            : [ '<08>{#p/basic}{~}Want a fight?\n\"Comet\" me, bro.' ],
      idleTalk6: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Authority be darned!' ]
            : [ '<08>{#p/basic}{~}Don\'t ruin the \"atmos- phere..\"' ],
      idleTalk7: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Trim my claws?\nNo way in heck!' ]
            : [ '<08>{#p/basic}{~}It\'s not free, it\'s \"zero G\"' ],
      jokeStatus: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is losing faith in its rebellion.' ]
            : [ '<32>{#p/story}* Stardrake is pleased with its \"stellar\" joke.' ],
      jokeTalk0: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}At least you admit it.' ]
            : [ "<08>{#p/basic}{~}That wasn't s'posed to be funny!" ],
      jokeTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ "<08>{#p/basic}{~}You don't know my cause!" ]
            : [ "<08>{#p/basic}{~}What are YOU laughin' at!?" ],
      jokeTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Do you..\nreally..' ]
            : [ '<08>{#p/basic}{~}See!?\nLaughs!\nMom was right!' ],
      jokeTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ "<08>{#p/basic}{~}I don't think you.." ]
            : [ "<08>{#p/basic}{~}Thanks, you're all great." ],
      jokeTalk4: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}To tell you the truth..' ]
            : [ '<08>{#p/basic}{~}You have good taste!!' ],
      jokeText0: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You agree with Chilldrake.)' ]
            : [ "<32>{#p/human}* (You laugh at Stardrake's remark.)" ],
      jokeText1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ "<32>{#p/human}* (But it hasn't said anything you could agree with yet.)" ]
            : [ "<32>{#p/human}* (But it hasn't said anything you could laugh at yet.)" ],
      jokeText2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You agree with Chilldrake.)' ]
            : [ "<32>{#p/human}* (You laugh at Stardrake's pun.)" ],
      jokeText3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You double down on your agreement with Chilldrake.)' ]
            : [ "<32>{#p/human}* (You continue to laugh at Stardrake's puns.)" ],
      name: () => (SAVE.data.b.s_state_chilldrake ? '* Chilldrake' : '* Stardrake'),
      punTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Only Starry can do that.' ]
            : [ "<08>{#p/basic}{~}Is that s'posed to be funny?" ],
      punTalk2: () =>
         SAVE.data.b.s_state_chilldrake ? [ "<08>{#p/basic}{~}You ain't Starry." ] : [ '<08>{#p/basic}{~}Ha.. Ha..' ],
      punTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Quit copying my friends.' ]
            : [ "<08>{#p/basic}{~}I've heard that one." ],
      punText1: [ '<32>{#p/human}* (You make a space pun.)' ],
      randStatus1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is wondering where Starry went.' ]
            : [ '<32>{#p/story}* Stardrake is assessing the crowd.' ],
      randStatus2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is chanting an anarchist spell.' ]
            : [ '<32>{#p/story}* Stardrake is practicing its next pun.' ],
      randStatus3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake starts a one- monster riot.' ]
            : [ '<32>{#p/story}* Stardrake is smiling at the thought of its next pun.' ],
      randStatus4: () => [ '<32>{#p/story}* Smells like wet pillows.' ],
      randStatus5: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Smells like body spray.' ]
            : [ '<32>{#p/story}* Stardrake sighs in relief, realizing its own name is in fact not a pun.' ],
      status1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake saunters up!' ]
            : [ '<32>{#p/story}* Stardrake flutters forth!' ]
   },
   b_opponent_jerry: {
      act_check: () =>
         SAVE.data.b.spared_jerry
            ? world.goatbro
               ? [
                    '<33>{#p/asriel2}* Jerry, the undisputable jerk.\n* I refuse to believe one flirt could have that much influence.'
                 ]
               : [
                    '<32>{#p/story}* JERRY - ATK 0 DEF 30\n* A born-again monster, awakened with the power of friendship!'
                 ]
            : world.goatbro
            ? [
                 '<32>{#p/asriel2}* Jerry, the undisputable jerk.\n* A worthless piece of garbage, nothing more, nothing less.'
              ]
            : [ '<32>{#p/story}* JERRY - ATK 0 DEF 30\n* Everyone knows Jerry.\n* Makes attacks last longer.' ],
      act_flirt: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/human}* (You flirt with Jerry.)\n* (It appreciates the compliment.)' ]
            : 5 <= world.flirt
            ? [ '<32>{#p/human}* (You call on your experience, and deliver a life-changing flirt.)' ]
            : [
                 '<32>{#p/human}* (You flirt with Jerry.)',
                 '<32>{#p/basic}* Jerry seems to like you a little too much now.'
              ],
      act_ditch: () => [ '<32>{#p/human}* (You ditch Jerry.)' ],
      act_kiss: () => [ '<32>{#p/human}* (You kiss Jerry.)' ],
      flirtStatus: [ "<32>{#p/story}* Jerry's redemption arc begins." ],
      flirtStatusWeird: [ '<32>{#p/story}* This is wrong on so many levels.' ],
      flirtTalk: [
         '<08>{#p/basic}{~}You... y-you...',
         "<08>{#p/basic}{~}Just for you, I'll...",
         "<08>{#p/basic}{~}I'll be the best person I can be!"
      ],
      flirtTalkWeird: [ '<08>{#p/basic}{~}\x00*licks lips*' ],
      genoStatus: [ '<32>{#p/asriel2}* Jerry.' ],
      hurtStatus: () => (world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Jerry is wounded.' ]),
      idleTalk1: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}I'm so glad we're here!" ]
            : [ "<08>{#p/basic}{~}Aren't you guys BORED?" ],
      idleTalk2: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Can we do this more often??' ]
            : [ '<08>{#p/basic}{~}Why are we doing this?' ],
      idleTalk3: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Hey, you guys are the BEST!' ]
            : [ '<08>{#p/basic}{~}Wow, you guys SUCK at this.' ],
      idleTalk4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Does anyone want a hug?' ]
            : [ '<08>{#p/basic}{~}SHHHH!\nLet me think, guys!!' ],
      idleTalkSolo1: () =>
         SAVE.data.b.spared_jerry ? [ '<08>{#p/basic}{~}Thanks for being here!' ] : [ '<08>{#p/basic}{~}Awkwarrd.' ],
      idleTalkSolo2: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}You're awesome!\nJust saying." ]
            : [ '<08>{#p/basic}{~}So like, what are you even doing?' ],
      idleTalkSolo3: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}Wouldn't trade ya for the galaxy." ]
            : [ '<08>{#p/basic}{~}The signal here sucks.' ],
      idleTalkSolo4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}I love humans!' ]
            : [ '<08>{#p/basic}{~}Must be nice being HUMAN..' ],
      name: '* Jerry',
      randStatus1: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry is living care-free.' ]
            : [ '<32>{#p/story}* Jerry eats powdery food and licks its hands proudly.' ],
      randStatus2: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry giggles from happiness.' ]
            : [ '<32>{#p/story}* Jerry sneezes without covering its nose.' ],
      randStatus3: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry lets out a squeal of excitement.' ]
            : [ '<32>{#p/story}* Jerry lets out a yawn.' ],
      randStatus4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Smells like...... Jerry?' ]
            : [ '<32>{#p/story}* Smells like...... Jerry.' ],
      status1: [ '<32>{#p/story}* Jerry clings to you!' ],
      kissTalk: [ '<08>{#p/basic}{~}Wow...', '<08>{#p/basic}{~}A kiss from my very best friend!' ],
      kissStatus: [ '<32>{#p/story}* ...' ],
      kissResult: () =>
         battler.alive.length === 2
            ? [ "<32>{#p/basic}* The other monster can't bear to watch..." ]
            : [ "<32>{#p/basic}* The other monsters can't bear to watch..." ],
      ditchResult: () =>
         battler.alive.length === 1
            ? [ "<32>{#p/basic}* The other monster celebrates Jerry's disappearance." ]
            : [ "<32>{#p/basic}* The other monsters celebrate Jerry's disappearance." ]
   },
   b_opponent_mouse: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Whizkarat, the homeless cat.\n* Lost its purpose in life a long time ago.' ]
            : [ '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This posh city cat wishes only to live the simple life.' ],
      act_check2: [
         "<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This posh city cat regrets going where it doesn't belong."
      ],
      act_check3: [
         '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This reformed country mouse is quite pleased with itself.'
      ],
      act_check4: [
         '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This reformed country mouse has taken a liking to you.'
      ],
      act_direct: [ '<32>{#p/human}* (You tell Whizkarat a mouse fact.)' ],
      act_direct2: [
         '<32>{#p/human}* (You tell Whizkarat everything you know about mice.)',
         '<32>{#p/basic}* Suddenly...!'
      ],
      act_direct3: [ "<32>{#p/human}* (You try to tell Whizkarat more, but it's already found its way.)" ],
      act_disown: [
         "<32>{#p/human}* (You pluck a whisker from Whizkarat's face.)",
         '<32>{#p/basic}* Whizkarat lets out a gnarly hiss!'
      ],
      act_disown2: [
         "<32>{#p/human}* (You pluck another whisker from Whizkarat's face.)",
         '<32>{#p/basic}* Whizkarat scurries away!'
      ],
      act_disown3: [ '<32>{#p/human}* (You try to pluck a whisker, but Whizkarat pretends it has none.)' ],
      act_flirt: [ "<32>{#p/human}* (You make a cute remark and scratch Whizkarat's neck.)" ],
      disownStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Whizkarat.' ] : [ '<32>{#p/story}* Whizkarat is losing its cool.' ],
      disownTalk1: [ '<08>{#p/basic}{~}Keep your paws off me..!' ],
      flirtTalk: [ '<08>{#p/basic}{~}No pussy- cats allowed.' ],
      flirtTalk2: [ '<08>{#p/basic}{~}\x00*purrs gently*' ],
      genoStatus: [ '<32>{#p/asriel2}* Whizkarat.' ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Whizkarat is nearing demise.' ],
      idleTalk1: [ '<08>{#p/basic}{~}What food do they eat?' ],
      idleTalk2: [ '<08>{#p/basic}{~}Where do they hide?' ],
      idleTalk3: [ '<08>{#p/basic}{~}How do they speak?' ],
      idleTalk4: [ '<08>{#p/basic}{~}Do they dream?' ],
      initTalk1: [ '<08>{#p/basic}{~}Alas, here I stand.' ],
      initTalk2: [ '<08>{#p/basic}{~}Oh, how I lose myself..' ],
      initTalk3: [ '<08>{#p/basic}{~}The si- tuation is not ideal.' ],
      initTalk4: [ '<08>{#p/basic}{~}Could you help me?' ],
      name: '* Whizkarat',
      randStatus1: [ '<32>{#p/story}* Whizkarat fantasizes about getting down on all fours.' ],
      randStatus2: [ '<32>{#p/story}* Whizkarat scans the area.' ],
      randStatus3: [ '<32>{#p/story}* Whizkarat is trying to pretend that it is small.' ],
      randStatus4: [ '<32>{#p/story}* Smells like top-twenty-cheese.' ],
      remindStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Whizkarat.' ]
            : [ '<32>{#p/story}* Whizkarat just needs a little more help.' ],
      remindTalk1: [ '<08>{#p/basic}{~}Live in holes, do they..?' ],
      remindTalk2: [ '<08>{#p/basic}{~}Squeak like toys, do they..?' ],
      remindTalk3: [ '<08>{#p/basic}{~}From now on, I shall live as a mouse.' ],
      safeStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* It's vulnerable." ] : [ '<32>{#p/story}* Whizkarat has found its way.' ],
      safeTalk1: [ '<08>{#p/basic}{~}Wonder- ful...' ],
      safeTalk2: [ '<08>{#p/basic}{~}Simply splen- did...' ],
      status1: [ '<32>{#p/story}* Whizkarat arrives!' ]
   },
   b_opponent_doggo: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Doggo, the unsightly dog.\n* How exactly did this idiot get a job again?' ]
            : [ '<32>{#p/story}* DOGGO - ATK 13 DEF 7\n* Easily excited by movement.\n* Hobbies include: Cuddles.' ],
      act_check2: [ '<32>{#p/story}* DOGGO - ATK 13 DEF 7\n* Struggling to even see itself...' ],
      act_check3: [ '<32>{#p/story}* DOGGO - ATK 13 DEF 7\n* A very excited dog, currently enjoying a hobby.' ],
      act_check4: [ '<32>{#p/story}* DOGGO - ATK 13 DEF 7\n* This dog strikes you as being lonely in life.' ],
      act_flirt: () => [ '<32>{#p/human}* (You flirt with Doggo.)' ],
      act_cuddle: () => [ '<32>{#p/human}* (You cuddle Doggo closely.)' ],
      fetch: () => [
         '<32>{#p/human}* (You throw the spanner.)\n* (The dog runs to get it.)\n* (You play fetch for a while.)'
      ],
      fetchTalk: pager.create(
         0,
         [ '<11>{#p/basic}{~}HUH!! A FUN WRENCH APPEARS!' ],
         [ '<11>{#p/basic}{~}HUH!! THERE IT IS AGAIN!' ]
      ),
      fetchTalkX1: [ "<11>{#p/basic}{~}WHERE'D IT GO!?" ],
      fetchTalkX2: [ "<11>{#p/basic}{~}WHERE'S MY WRENCH NOW!?" ],
      flirt1: [ '<11>{#p/basic}{~}(Blushes uncontrol- lably)' ],
      invisStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* He's vulnerable." ] : [ '<32>{#p/story}* Doggo has lost sight of you.' ],
      name: '* Doggo',
      fetchStatus: [ '<32>{#p/story}* Doggo loves fetch!' ],
      fetchpet: [ '<32>{#p/human}* (But the dog was too busy looking for the spanner to be pet.)' ],
      fetchflirt: [ '<32>{#p/human}* (But the dog was too busy looking for the spanner to hear you.)' ],
      fetchcuddle: [ '<32>{#p/human}* (But the dog was too busy looking for the spanner to be cuddled.)' ],
      normaStatus: () => (world.goatbro ? [ '<32>{#p/asriel2}* Doggo.' ] : [ "<32>{#p/story}* Doggo knows you're here." ]),
      pet: () => [
         '<32>{#p/human}* (You pet Doggo.)',
         ...(world.goatbro
            ? [
                 [],
                 [ '<32>{#p/asriel2}* ... again?' ],
                 [ "<32>{#p/asriel2}* It's not THAT funny..." ],
                 [ '<32>{#p/asriel2}* ... or is it?' ],
                 [ '<32>{#p/asriel2}* This is so stupid.' ],
                 [ '<32>{#p/asriel2}* Do you really need to do this?' ],
                 [ '<32>{#p/asriel2}* ... do you?' ],
                 [ '<32>{#p/asriel2}* I guess so.' ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* This is getting out of hand...' ],
                 [ '<32>{#p/asriel2}* Still?\n* Come on...' ],
                 [ '<32>{#p/asriel2}* Wow.\n* Just wow.' ],
                 [ '<32>{#p/asriel2}* You are enjoying this way too much.' ],
                 [ '<32>{#p/asriel2}* ...' ]
              ][Math.min(battler.volatile[0].vars.pet - 1, 13)]
            : [])
      ],
      cuddle: pager.create(
         0,
         [ '<11>{#p/basic}{~}CUDDLES!?!?\nWELL, AT LEAST I KNOW WHERE IT IS!' ],
         [ '<11>{#p/basic}{~}AGAIN!?!?' ]
      ),
      petStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* He's vulnerable." ] : [ '<32>{#p/story}* Doggo has been pet.' ],
      petTalk1: [ "<11>{#p/basic}{~}WHAT!!!\nI'VE BEEN PET!" ],
      petTalk2: [ "<11>{#p/basic}{~}WHERE'S THAT COMING FROM!?" ],
      petTalk3: [ "<11>{#p/basic}{~}THERE'S NO END TO IT!!" ],
      petTalk4: [ '<11>{#p/basic}{~}WELL, THIS IS THOROUGH!!!' ],
      petTalk5: [ '<11>{#p/basic}{~}(Dies)' ],
      petTalk6: [ '<11>{#p/basic}{~}(Comes back to life)' ],
      petTalk7: [ '<11>{#p/basic}{~}IT JUST KEEPS COMING!' ],
      petTalk8: [ '<11>{#p/basic}{~}AND COMING!!' ],
      petTalk9: [ '<11>{#p/basic}{~}AND COMINGGG!!!' ],
      petTalk10: [ "<11>{#p/basic}{~}OK.\nThat's enough." ],
      petTalk11: [ '<11>{#p/basic}{~}I said \"that\'s enough!\"' ],
      petTalk12: [ "<11>{#p/basic}{~}Oh my god, it just doesn't stop!" ],
      petTalk13: [ "<11>{#p/basic}{~}OH MY GOD, IT REALLY DOESN'T STOP!!" ],
      petTalk14: [ '<11>{#p/basic}{~}AHHHHHHH!!!' ],
      query1: [ '<11>{#p/basic}{~}No escape!' ],
      query2: [ "<11>{*}{#p/basic}{~}Ha!\nIt moved!\nIt couldn't NOT move!{^30}{%}" ],
      query3: [ '<11>{#p/basic}{~}Will it move this time?' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* Doggo.' ] : [ '<32>{#p/story}* Doggo blocks the way!' ]),
      sussy: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Doggo.' ] : [ '<32>{#p/basic}* Doggo is too suspicious of your actions.' ]
   },
   b_opponent_lesserdog: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Canis Minor, the ignorant dog.\n* It probably doesn't even know why it's here." ]
            : [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Wields a shiny dogger made of fido-nium.' ],
      act_check2: [
         '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Scarred for life, this puppy wants to turn tail and run.'
      ],
      act_check3: [
         "<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* It's necks-in-line for the galaxy's tallest monster."
      ],
      act_check4: [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Trying its best to decipher your advanced petting.' ],
      act_check5: [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* The journey for this puppy has only just begun.' ],
      act_flirt: [ '<32>{#p/human}* (You tell Canis Minor you love it by petting it in morse code.)' ],
      act_handshake: [
         "<32>{#p/human}* (You place your hand on Canis Minor's head, shaking and ruffling its fur to the core.)"
      ],
      act_inquire: [
         "<32>{#p/human}* (You pet Canis Minor and ask it who's a good dog. It barks its answer excitedly.)"
      ],
      act_tickle: [
         "<32>{#p/human}* (You tickle Canis Minor's sides, thereby petting it.)\n* (It's a frenzy of excitement.)"
      ],
      fetch: () => [
         '<32>{#p/human}* (You throw the spanner.)\n* (The dog elongates its neck to reach it.)',
         '<32>{#p/human}* (You play fetch for a while.)',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* But why though?' ] : [])
      ],
      fetchStatus: [ '<32>{#p/story}* Canis Minor loves fetch!' ],
      fetchTalk: [ '<11>{#p/basic}{~}(Pants fast)' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Almost dead.' ]
            : [ '<32>{#p/story}* Canis Minor tucks its tail between its legs.' ],
      name: '* Canis Minor',
      petTalk1: [ '<11>{#p/basic}{~}(Pant pant)' ],
      petTalk2: [ '<11>{#p/basic}{~}(Tiny bark)' ],
      petTalk3: [ '<11>{#p/basic}{~}(Wag wag)' ],
      petTalk4: [ '<11>{#p/basic}{~}(Thinks of food)' ],
      petTalk5: [ '<11>{#p/basic}{~}(Pant! Pant!)' ],
      petTalk6: [ '<11>{#p/basic}{~}(Excited noises)' ],
      petTalk7: [ '<11>{#p/basic}{~}(Motor revving)' ],
      petTalk8: [ '<11>{#p/basic}{~}(Plane takeoff)' ],
      petTalk9: [ '<11>{#p/basic}{~}(Kettle whistle)' ],
      petTalk10: [ '<11>{#p/basic}{~}(...)' ],
      petTalk11: [ '<11>{#p/basic}{~}(Faraway bark)' ],
      petTalk12: [ '<11>{#p/basic}{~}(Bark)' ],
      petText1: () => [ '<32>{#p/human}* (You barely lift your hand.)', '<32>{#p/basic}* How exciting!' ],
      petText2: () => [
         '<32>{#p/human}* (You lightly touch the dog.)',
         "<32>{#p/basic}* It's already overexcited...",
         ...(world.goatbro ? [ '<32>{#p/asriel2}* Dogs do love to be pet.' ] : [])
      ],
      petText3: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         "<32>{#p/basic}* It's raising its head to meet your hand.",
         ...(world.goatbro ? [ "<32>{#p/asriel2}* Okay, you've pet it.\n* There's really no reason to keep going." ] : [])
      ],
      petText4: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* It was a good dog.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* No reason to keep going?' ] : [])
      ],
      petText5: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* Its excitement knows no bounds...',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* No reason to keep going.' ] : [])
      ],
      petText6: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* Critical pet!\n* Dog excitement increased.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* Golly, $(name).' ] : [])
      ],
      petText7: () => [
         '<32>{#p/human}* (You have to jump up to pet the dog.)',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* We can't do this all day." ] : [])
      ],
      petText8: () => [
         '<32>{#p/human}* (You pet Canis Minor without even reaching it.)',
         '<32>{#p/basic}* It gets more excited.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* We CAN do this all day...?' ] : [])
      ],
      petText9: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* There is no way to stop this madness.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText10: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* Many small pets for a dog, one giant neck amongst dog-kind.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* Why are we still here.' ] : [])
      ],
      petText11: () => [
         '<32>{#p/human}* (You call Canis Minor, but it cannot hear you.)',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* There.\n* It's totally out of reach now." ] : [])
      ],
      petText12: () => [ '<32>{#p/basic}* ...', ...(world.goatbro ? [ '<32>{#p/asriel2}* ???' ] : []) ],
      petText13: () => [
         '<32>{#p/human}* (You can reach Canis Minor again.)',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* You've GOT to be kidding me." ] : [])
      ],
      petText14: () => [ '<32>{#p/human}* (You pet Canis Minor.)' ],
      petText15: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         "<32>{#p/basic}* It's possible that you may have a problem."
      ],
      petText16: () => [
         '<32>{#p/human}* (Canis Minor is unpettable, but appreciates the attempt.)',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* Stop.' ] : [])
      ],
      petText17: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* Perhaps mankind was not meant to pet this much.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* Please stop.' ] : [])
      ],
      petText18: () => [
         '<32>{#p/human}* (You pet Canis Minor.)',
         '<32>{#p/basic}* It continues.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText19: () => [
         '<32>{#p/human}* (But Canis Minor was beyond your reach.)',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* Okay, it's over.\n* Now kill this idiot already." ] : [])
      ],
      petText20: () => [
         '<32>{#p/human}* (Really now.)',
         '<32>{#p/basic}* ... really now.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* Really now...' ] : [])
      ],
      statusX: [ "<32>{#p/asriel2}* It's vulnerable." ],
      status0: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor appears.' ]),
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor tilts its head to one side.' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor thinks your weapon is a dog treat.' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor is not really paying attention.' ],
      status4: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Smells like dog chow.' ]),
      status5: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor is barking excitedly.' ],
      status6: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor is overstimulated.' ],
      status7: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor shows no signs of stopping.' ],
      status8: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor is lowering.' ],
      status9: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor learns to code.' ],
      status10: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ "<32>{#p/story}* Canis Minor is whining because it can't see you." ],
      status11: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Hello there.' ]),
      status12: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor is questioning your life choices.' ],
      status13: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor has gone where no dog has gone before.' ]
   },
   b_opponent_dogamy: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy, the pathetic dog.\n* Relies entirely on his over- aggressive partner.' ]
            : [ '<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* Husband of Dogaressa.\n* Knows only what he smells.' ],
      act_check2: [ '<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* Recently widowed.\n* Knows only the pain of loss.' ],
      act_check3: [ '<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* Husband of Dogaressa.\n* Knows more than ever before.' ],
      act_check4: [ "<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* Husband of Dogaressa.\n* Doesn't mind sharing...?" ],
      act_check5: [ "<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* Husband of Dogaressa.\n* Wouldn't mind leaving...?" ],
      fetchText: [
         '<32>{#p/human}* (You throw the spanner.)\n* (The dogs run to get it.)\n* (You play fetch for a while.)'
      ],
      fetchTextLone: () => [
         '<32>{#p/human}* (You throw the spanner.)\n* (Dogamy ignores it and lets it roll off the edge.)',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? [ '<32>{#p/asriel2}* Saw that coming.' ] : [])
      ],
      flirtTalk1: [ '<11>{#p/basic}{~}Ah!\nBut why...!?' ],
      flirtTalk2: [ '<11>{#p/basic}{~}Love is in the air?' ],
      flirtTalk3: [ "<11>{#p/basic}{~}You didn't just..." ],
      flirtTalk4: [ "<11>{#p/basic}{~}What's the puppy doing?" ],
      flirtText: [
         '<32>{#p/human}* (You flirt with Dogamy.)',
         "<32>{#p/basic}* Your... pheromones, reach Dogamy's snout."
      ],
      flirtTextLone: [ '<32>{#p/human}* (You flirt with Dogamy.)', "<32>{#p/basic}* Dogamy's expression is unchanged." ],
      loneStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* One left.' ]
            : [ '<32>{#p/story}* Dogaressa is intent on kicking human tail.' ],
      loneTalk1: [ '<11>{#p/basic}{~}Whine.' ],
      loneTalk2: [ '<11>{#p/basic}{~}Whimper.' ],
      loneTalk3: [ '<11>{#p/basic}{~}Shake.' ],
      name: '* Dogamy',
      fetchStatus: [ '<32>{#p/story}* Married dogs love fetch!' ],
      fetchStatusX: [ "<32>{#p/story}* The dogs' minds are expanding at an exponential rate." ],
      otherPet: [ '<11>{#p/basic}{~}...' ],
      petNeedStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* Dogaressa is looking for affection.' ],
      petStatus: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* They're vulnerable." ]
            : [ "<32>{#p/story}* The dogs' minds have been expanded." ],
      petTalk1: [ '<11>{#p/basic}{~}Paws off you smelly human.' ],
      petTalk1x: [ '<11>{#p/basic}{~}Paws off you weird puppy.' ],
      petTalk2: [ '<11>{#p/basic}{~}Wow!!!\nPet by another pup!!!' ],
      petTalk3: [ "<11>{#p/basic}{~}Stop!\nDon't touch her!" ],
      petTalk4: [ '<11>{#p/basic}{~}What\nabout\nme......' ],
      petTalk5: [ '<11>{#p/basic}{~}Thank\nyou...' ],
      petText: [ '<32>{#p/human}* (You pet Dogamy.)' ],
      petTextLone: [ '<32>{#p/human}* (You try to pet Dogamy, but he cowers in fear.)' ],
      randTalk1: () =>
         world.goatbro
            ? [ '<11>{#p/basic}{~}The prince has lost his mind...' ]
            : [ "<11>{#p/basic}{~}Take my wife...\n's fleas." ],
      randTalk2: () =>
         world.goatbro ? [ '<11>{#p/basic}{~}You have come far...' ] : [ "<11>{#p/basic}{~}Don't touch my hot dog." ],
      randTalk3: () =>
         world.goatbro
            ? [ "<11>{#p/basic}{~}We'll take you down!" ]
            : [ '<11>{#p/basic}{~}Number one puppy-dog eyes champs K-614!!' ],
      randTalk4: () =>
         world.goatbro ? [ "<11>{#p/basic}{~}You won't win this time..." ] : [ "<11>{#p/basic}{~}Let's kick human tail!!" ],
      resmellStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs think that you may be a lost puppy.' ],
      resmellText1: [
         '<32>{#p/human}* (You encourage the dogs to sniff you again.)',
         '<32>* (You smell just as weird as before.)'
      ],
      resmellText2: [
         '<32>{#p/human}* (You encourage the dogs to sniff you again.)',
         '<32>* (After rolling in the dirt, you smell alright.)'
      ],
      resmellText3: [
         '<32>{#p/human}* (You encourage the dogs to sniff you again, but they already know you smell fine.)'
      ],
      resmellTextFetch: [
         '<32>{#p/human}* (You encourage the dogs to sniff you, but they seem occupied with other things.)'
      ],
      resmellTextLone: [ "<32>{#p/human}* (You encourage Dogamy to sniff you, but he won't even lift up his snout.)" ],
      rollStatus: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* You're going to get your clothes dirty, $(name)." ]
            : [ '<32>{#p/story}* The dogs may want to re-smell you.' ],
      rollText: () => [
         '<32>{#p/human}* (You roll around in the dirt.)\n* (It appears to be synthetic.)',
         '<32>{#p/basic}* Your scent is changing...',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* I have questions.' ] : [])
      ],
      rollText2: [
         '<32>{#p/human}* (You roll around in the dirt.)\n* (It appears to be synthetic.)',
         '<33>{#p/basic}* Your scent has already changed.'
      ],
      rollTextLone: () => [
         "<32>{#p/human}* (You roll around in Dogaressa's remains.)",
         '<32>{#p/basic}* Dogamy looks even more defeated than before.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ "<11>{#p/basic}{~}Hm?\nWhat's that smell?" ],
      smellTalk2: [ '<11>{#p/basic}{~}What!\nSmells like a...' ],
      smellTalk3: [ '<11>{#p/basic}{~}Ah!\nSuch a lovely smell...' ],
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs keep shifting their axes to protect each other.' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs are re-evaluating your smell.' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs are practicing for the next couples contest.' ],
      status4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs are whispering sweet nothings to each other.' ],
      susText: [ "<32>{#p/basic}* The dogs still think you're a smelly human." ],
      fetchTalk: [ '<11>{#p/basic}{~}Fetch is so much fun!' ],
      fetchTalkX: [ '<11>{#p/basic}{~}Fetch with another pup!?' ]
   },
   b_opponent_dogaressa: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Dogaressa, the rowdy dog.\n* Without her hubby, she'd lose herself completely." ]
            : [ '<32>{#p/story}* DOGARESSA - ATK 14 DEF 5\n* This puppy finds her hubby lovely. SMELLS ONLY?' ],
      act_check2: [ '<32>{#p/story}* DOGARESSA - ATK 14 DEF 5\n* This puppy misses her hubby dearly. KILLS ONLY?' ],
      act_check3: [ '<32>{#p/story}* DOGARESSA - ATK 14 DEF 5\n* Things are going quite alright for this puppy.' ],
      act_check4: [
         "<32>{#p/story}* DOGARESSA - ATK 14 DEF 5\n* Her hubby isn't the only thing this puppy finds lovely."
      ],
      act_check5: [ "<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* This puppy is afraid for her hubby's safety." ],
      fetchTextLone: () => [
         '<32>{#p/human}* (You throw the spanner.)\n* (Dogaressa takes it and smashes it to pieces.)',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? [ '<32>{#p/asriel2}* Saw that coming.' ] : [])
      ],
      flirtTalk1: [ '<11>{#p/basic}{~}(Hey! Knock it off!)' ],
      flirtTalk2: [ '<11>{#p/basic}{~}(This just gets weirder and weirder.)' ],
      flirtTalk3: [ '<11>{#p/basic}{~}(... flirt with me! Ugh!)' ],
      flirtTalk4: [ '<11>{#p/basic}{~}(I think it loves me. A lot.)' ],
      flirtText: [
         '<32>{#p/human}* (You flirt with Dogaressa.)',
         "<32>{#p/basic}* Your... pheromones, reach Dogaressa's snout."
      ],
      flirtTextLone: [
         '<32>{#p/human}* (You flirt with Dogaressa.)',
         "<32>{#p/basic}* Dogaressa's expression is unchanged."
      ],
      loneStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Dogamy is brokenhearted.' ],
      loneTalk1: [ '<11>{#p/basic}{~}(Misery awaits you.)' ],
      loneTalk2: [ "<11>{#p/basic}{~}(You'll suffer for this.)" ],
      name: '* Dogaressa',
      otherPet: [ '<11>{#p/basic}{~}(...)' ],
      petNeedStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* Dogamy is looking for affection.' ],
      petTalk1: [ "<11>{#p/basic}{~}(That's not your husband, OK?)" ],
      petTalk2: [ "<11>{#p/basic}{~}(Well, don't leave me out!)" ],
      petTalk3: [ '<11>{#p/basic}{~}(Beware of dog.)' ],
      petTalk4: [ '<11>{#p/basic}{~}(A dog that pets dogs... amazing!)' ],
      petTalk5: [ "<11>{#p/basic}{~}(You're the best!)" ],
      petText: [ '<32>{#p/human}* (You pet Dogaressa.)' ],
      petTextLone: [ '<32>{#p/human}* (You try to pet Dogaressa, but she just growls at you.)' ],
      randTalk1: () => (world.goatbro ? [ '<11>{#p/basic}{~}(Indeed.)' ] : [ "<12>{#p/basic}{~}(Don't,\nactually...)" ]),
      randTalk2: () => (world.goatbro ? [ '<11>{#p/basic}{~}(Far enough.)' ] : [ '<11>{#p/basic}{~}(He means me.)' ]),
      randTalk3: () =>
         world.goatbro
            ? [ '<11>{#p/basic}{~}(By force, if necessary.)' ]
            : [ '<11>{#p/basic}{~}(Of course we were first.)' ],
      randTalk4: () =>
         world.goatbro ? [ "<11>{#p/basic}{~}(Time's up.)" ] : [ '<11>{#p/basic}{~}(Do humans have tails?)' ],
      resmellTalkLone: [ '<11>{#p/basic}{~}(Is that what you wanted??)\n(Huh?)' ],
      resmellTextLone: [
         '<33>{#p/human}* (You encourage Dogaressa to sniff you, and she forcefully shoves her snout in your face.)'
      ],
      rollTextLone: () => [
         "<32>{#p/human}* (You roll around in Dogamy's remains.)",
         '<32>{#p/basic}* Dogaressa looks even angrier than before.',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ '<11>{#p/basic}{~}(A smell mystery...)' ],
      smellTalk2: [ '<11>{#p/basic}{~}(Are you actually a little puppy!?)' ],
      smellTalk3: [ '<11>{#p/basic}{~}(The smell of a weird puppy!)' ],
      fetchTalk: [ '<11>{#p/basic}{~}(We love to play fetch.)' ],
      fetchTalkX: [ '<11>{#p/basic}{~}(This dog can do anything!)' ]
   },
   b_opponent_greatdog: {
      act_check: () =>
         world.goatbro
            ? [ '<33>{#p/asriel2}* Canis Major, the brainless dog.\n* The biggest and dumbest dog of the bunch.' ]
            : [ "<32>{#p/story}* CANIS MAJOR - ATK 15 DEF 8\n* It's so excited that it thinks fighting is just play." ],
      act_check2: [ '<32>{#p/story}* CANIS MAJOR - ATK 15 DEF 8\n* Desperate for some love and attention...' ],
      act_check3: [ '<32>{#p/story}* CANIS MAJOR - ATK 15 DEF 8\n* All tuckered out.' ],
      act_flirt: [
         '<32>{#p/human}* (You flirt with Canis Major.)',
         '<32>{#p/basic}* Canis Major awkwardly cocks its head to one side.'
      ],
      beckonText: [
         '<32>{#p/human}* (You call Canis Major.)',
         '<32>{#p/basic}* Canis Major bounds towards you, flecking slobber into your face.'
      ],
      closeStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major seeks affection.' ],
      closeText: [ "<32>{#p/human}* (You call Canis Major.)\n* (Only the dog's ears perk up.)" ],
      doneText: [ '<32>{#p/basic}* Canis Major decides you are too boring.' ],
      fetch: () =>
         world.goatbro
            ? [
                 '<32>{#p/human}* (You throw the spanner.)\n* (Canis Major absorbs it and carries on with its life.)',
                 '<32>{#p/asriel2}* Yeah... that makes sense.'
              ]
            : [
                 '<32>{#p/human}* (You throw the spanner.)\n* (The dog runs to get it.)\n* (You play fetch for a while.)'
              ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Canis Major is panting slowly.' ],
      ignoreStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Canis Major just wants some affection.' ],
      ignoreStatus2: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major is making puppy-dog eyes.' ],
      name: '* Canis Major',
      fetchStatus: [ '<32>{#p/story}* Canis Major loves fetch!' ],
      petStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Canis Major is patting the ground with its front paws.' ],
      petStatus2: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major wants some TLC.' ],
      petStatus3: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [ '<32>{#p/story}* Pet capacity now at forty percent.' ],
      petStatus4: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* It's vulnerable." ] : [ '<32>{#p/story}* Canis Major is contented.' ],
      petText0: [ '<32>{#p/human}* (But Canis Major was too far away to pet.)' ],
      petText1: [
         '<32>{#p/human}* (Canis Major curls up in your lap as it is pet by you.)',
         '<32>* (It gets so comfortable that it falls asleep.)',
         '<32>* (The dog snores, and snores some more...)',
         '<32>* (... until eventually, it wakes up.)',
         "<32>{#p/basic}* Canis Major's excitement begins rising without warning!"
      ],
      petText2: [
         '<32>{#p/human}* (You try to pet the dog...)',
         '<32>* (... but its excitement is generating an energy field that prevents petting.)'
      ],
      petText3: [
         '<32>{#p/human}* (You pet the dog.)\n* (It sinks its entire weight into you.)',
         "<32>* (Your movement slows, but you still haven't pet enough.)"
      ],
      petText4: [
         '<32>{#p/human}* (You pet decisively.)\n* (Pet capacity now at one- hundred percent.)',
         '<32>{#p/basic}* Canis Major flops over with its legs hanging in the air.'
      ],
      petText5: [
         '<32>{#p/human}* (You give the dog a tummy rub.)',
         '<32>{#p/basic}* Canis Major is whining in bliss...'
      ],
      playText1: [ '<32>{#p/human}* (But Canis Major was not excited enough to play with yet.)' ],
      playText2: [
         '<32>{#p/human}* (You conjure a hologram for the dog to chase after.)',
         '<32>* (Eventually, the hologram loses cohesion and dissipates.)',
         '<32>* (Canis Major collects all the residual energy in the area and brings it to you.)',
         '<32>{#p/basic}* Canis Major, tired, rests its head on you...'
      ],
      playText3: [ '<32>{#p/basic}* Canis Major is too tired to play.' ],
      playText4: [ '<32>{#p/human}* (But Canis Major was already in the middle of playing fetch.)' ],
      status0: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major appears.' ]),
      status1: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major is watching you intently.' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Canis Major is waiting for your command.' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Smells like fresh-squeezed puppy juice.' ],
      waitText: [ '<32>{#p/basic}* Canis Major moves closer.' ]
   },
   b_opponent_papyrus: {
      act_flirt: [ '<32>{#p/human}* (You flirt with Papyrus.)' ],
      act_insult: [ '<32>{#p/human}* (You insult Papyrus.)' ],
      spanner: [ '<32>{#p/human}* (You throw the spanner.)\n* (Papyrus catches it in his mouth and returns it to you.)' ],
      spannerTalk1: [ '<15>{#p/papyrus}{#f/20}WHAT A JAW- DROPPING MOVE!' ],
      spannerTalk2: [ '<15>{#p/papyrus}{#f/20}I COULD DO THIS ALL DAY!' ],
      spannerTalk3: [ '<15>{#p/papyrus}{#f/20}JUST LIKE THEY DO IT ON TV!' ],
      spannerTalk4: [ '<15>{#p/papyrus}{#f/20}NYEH HEH HEH!' ],
      sparableSpannerTalk1: [ '<15>{#p/papyrus}{#f/20}NOW, SHOW ME YOUR MERCY!' ],
      sparableSpannerTalk2: [ '<15>{#p/papyrus}{#f/20}...' ],
      bullySpareTalk: [
         '<15>{#p/papyrus}{#f/27}SAY... IS IT GETTING DARK OUT HERE?',
         "<15>{#f/27}MAYBE CAPTURING YOU WASN'T SUCH A GREAT IDEA...",
         "<15>{#f/15}YEAH!!! I CAN TELL YOU'RE DESPERATE FOR MY MERCY!",
         '<15>{#f/20}I, THE GREAT PAPYRUS, WILL OBLIGE YOU!!',
         '<15>{#f/20}I WILL {@fill=#f00}SPARE{@fill=#000} YOU, HUMAN!!!',
         "<15>{#f/27}SO... NOW'S YOUR CHANCE... TO ACCEPT MY {@fill=#f00}MERCY{@fill=#000}..."
      ],
      act_check: () =>
         world.genocide
            ? [ '<32>{#p/story}* PAPYRUS - ATK 3 DEF 3\n* Sans a brother.' ]
            : papreal()
            ? [ '<32>{#p/story}* PAPYRUS - ATK 3 DEF 3\n* Believes in you.' ]
            : [ '<32>{#p/story}* PAPYRUS - ATK 20 DEF 20\n* Likes to say \"Nyeh Heh Heh!\"' ],
      act_check2: [ '<32>{#p/story}* PAPYRUS - ATK 20 DEF 20\n* Everything is fine.' ],
      act_check3: [ '<32>{#p/story}* PAPYRUS - ATK 20 DEF 20\n* The most benevolent and merciful guardsman!' ],
      capture1: [
         "<15>{#p/papyrus}{#f/20}LOOKS LIKE YOU'RE GOING TO THE CAPTURE ZONE!!",
         '<15>{#f/24}... ALSO KNOWN AS THE GARAGE.',
         '<15>{#f/20}A HEAVILY FORTIFIED GARAGE, THAT IS!',
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture2: [
         '<15>{#p/papyrus}{#f/24}WELL!!! YOU MAY HAVE CLEVERLY ESCAPED BEFORE...',
         "<15>{#f/20}BUT THIS TIME, I'VE UPGRADED THE FACILITIES.",
         '<15>{#f/20}NOT ONLY WILL YOU BE STUCK...',
         "<15>{#f/15}BUT YOU WON'T EVEN WANT TO LEAVE!!!",
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture3: [
         '<15>{#p/papyrus}{#f/20}YOU ARE... DETERMINED!',
         "<15>BUT!!\nIT JUST WON'T WORK ON ME!",
         '<15>I AM THE DETERMINEST!',
         '<99>{#f/24}AND IF YOU\nTHINK YOU ARE\nDETERMINESTER...',
         '<15>{#f/20}THAT IS WRONG!\nGRAMATICALLY WRONG!',
         '<15>{#f/24}BECAUSE THE CORRECT FORM WOULD BE...',
         '<15>{#f/20}NOT AS DETERMINEST AS PAPYRUS, THE DETERMINESTEST!',
         '<15>{#f/10}I HOPE YOU ENJOYED THIS LESSON.',
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture4: [
         '<15>{#p/papyrus}{#f/24}ARE YOU SURE YOU CAN KEEP THIS UP?',
         '<15>{#f/21}BEING CAPTURED AGAIN MUST BE FRUSTRATING...',
         "<15>{#f/21}I DON'T WANT YOU TO GET MAD ABOUT FAILING REPEATEDLY...",
         '<15>{#f/20}PERHAPS NEXT TIME WE CAN SKIP THE BATTLE!',
         "<15>{#f/20}FOR NOW, THOUGH, IT'S OFF TO THE CAPTURE ZONE!!!",
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture5: [
         '<15>{#p/papyrus}{#f/27}WOWIE... AGAIN???',
         '<15>{#f/15}WELL, IF YOU INSIST...!',
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      checkTalk: [ '<15>{#p/papyrus}{#f/20}NYEH HEH HEH!' ],
      death1: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/27}N...\nN-NO...' ]
            : [ "<15>{#p/papyrus}{#f/21}WELL, THAT'S NOT WHAT I WAS EXPECTING..." ],
      death2: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/21}SANS, I...', '<15>{#f/33}{@random=1.1/1.1}I FAILED YOU...' ]
            : papreal()
            ? [
                 '<15>{#p/papyrus}{#f/27}... B-BUT I STILL BELIEVE IN YOU!',
                 '<15>{#p/papyrus}{#f/21}I KNOW... YOU CAN DO BETTER...',
                 '<15>{#p/papyrus}{#f/27}IF YOU JUST TRY...!'
              ]
            : [ '<15>{#p/papyrus}{#f/27}... A-AT LEAST I STILL HAVE MY HEAD!' ],
      dots: [ '<32>{#p/basic}* ...' ],
      flirt0: [ '<32>{#p/basic}* Cute.' ],
      flirt1: [
         '<15>{#p/papyrus}{#f/20}WHAT!?\nF-F-FLIRTING!?',
         '<15>SO YOU FINALLY REVEAL YOUR {@fill=#f00}ULTIMATE FEELINGS{@fill=#000}!',
         "<15>W-WELL!\nI'M A SKELETON WITH VERY HIGH STANDARDS!!!",
         '<15>WHAT CAN YOU DO IN RETURN FOR MY AFFECTION???'
      ],
      flirt2: [
         '<99>{#p/human}* (Your reply?){!}§shift=24§I have\n§shift=32§I can make§shift=32§zero redeeming\n§shift=32§spaghetti§shift=40§qualities{#c/0/4/2}'
      ],
      flirt3a: [ '<15>{#p/papyrus}{#f/24}THAT CONFIDENCE... IT REMINDS ME OF...' ],
      flirt3b: [ '<15>{#p/papyrus}{#f/24}THAT HUMILITY... IT REMINDS ME OF...' ],
      flirt4: [
         '<15>{#f/22}MYSELF!!!',
         "<15>{#f/10}YOU'RE MEETING ALL MY STANDARDS!!!",
         '<15>{#f/27}I GUESS THIS MEANS I HAVE TO GO ON A DATE WITH YOU...?'
      ],
      flirt5: [ "<15>{#p/papyrus}{#f/20}LET'S DATE L-LATER!!\nAFTER I CAPTURE YOU!" ],
      flirt6: [ "<32>{#p/human}* (No effect...)\n* (Seems acting won't escalate this battle any further.)" ],
      flirt7: [ '<32>{#p/human}* (But Papyrus was too busy fighting to hear you.)' ],
      flirtStatus1: [ '<32>{#p/story}* Papyrus is thinking about what to wear for his date.' ],
      flirtStatus2: [ '<32>{#p/story}* Papyrus dabs some Bone Cologne behind his ear.' ],
      flirtStatus3: [ '<32>{#p/story}* Papyrus is thinking about what to cook for his date.' ],
      flirtStatus4: [ '<32>{#p/story}* Papyrus dabs marinara sauce behind his ear.' ],
      flirtStatus5: [ '<32>{#p/story}* Papyrus is thinking about sexy rectangles.' ],
      flirtStatus6: [ '<32>{#p/story}* Papyrus dabs MTT-brand Bishie Cream behind his ear.' ],
      flirtStatus7: [ '<32>{#p/story}* Papyrus dabs MTT-brand Anime Powder behind his ear.' ],
      flirtStatus8: [ '<32>{#p/story}* Papyrus dabs MTT-brand Cute Juice behind his ear.' ],
      flirtStatus9: [ "<32>{#p/story}* Papyrus realizes he doesn't have ears." ],
      flirtStatus10: [ '<32>{#p/story}* Papyrus has random lumps of ointment on his head.' ],
      flirtStatus11: [ "<32>{#p/story}* ... he's still thinking about sexy rectangles." ],
      hurtStatus: [ '<32>{#p/story}* Papyrus is at the edge of defeat.' ],
      insult1: [ '<15>{#p/papyrus}{#f/20}HOW SELFLESS!', '<15>{#f/21}YOU WANT ME TO FEEL BETTER ABOUT FIGHTING YOU...' ],
      insult2: [ "<15>{#p/papyrus}{#f/15}THERE'S NO NEED TO LIE TO YOURSELF!!!" ],
      insult3: [ "<32>{#p/human}* (No effect...)\n* (Seems acting won't escalate this battle any further.)" ],
      insult4: [ '<32>{#p/human}* (But Papyrus was too busy fighting to hear you.)' ],
      name: '* Papyrus',
      randomStatus1: [ '<32>{#p/story}* Papyrus readies a bone attack.' ],
      randomStatus2: [ '<32>{#p/story}* Papyrus prepares a non-bone attack then spends a minute fixing his mistake.' ],
      randomStatus3: [ '<32>{#p/story}* Papyrus is cooking.' ],
      randomStatus4: [ '<32>{#p/story}* Papyrus whispers \"Nyeh heh heh!\"' ],
      randomStatus5: [ '<32>{#p/story}* Papyrus is rattling his bones.' ],
      randomStatus6: [ '<32>{#p/story}* Papyrus is trying hard to play it cool.' ],
      randomStatus7: [ '<32>{#p/story}* Papyrus is considering his options.' ],
      randomStatus8: [ '<32>{#p/story}* Smells like bones.' ],
      randomStatus9: [ '<32>{#p/story}* Papyrus remembered a good joke Sans told and is smiling.' ],
      spaghetti1: () => [
         '<15>{#p/papyrus}{#f/12}MY SPAGHETTI!',
         "<15>{#p/papyrus}{#f/13}AND YOU LOOK LIKE YOU'RE ENJOYING IT...",
         papreal()
            ? "<15>{#p/papyrus}{#f/27}WELL, I'M GLAD I COULD MAKE YOU HAPPY!"
            : [
                 '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO OUR MEAL TOGETHER!',
                 '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO MAKING SOME MORE FOR YOU!'
              ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      spaghetti2: [ "<32>{#p/basic}* If Papyrus wasn't so busy fighting, he might've noticed that." ],
      specialStatus0: [ "<32>{#p/story}* Papyrus's aura is rising." ],
      specialStatus1: [ '<32>{#p/story}* Special attack.' ],
      specialStatus2: [ '<32>{#p/story}* Papyrus is going all out.' ],
      specialStatus3: [ '<32>{#p/story}* Papyrus has thrown all logic out the window.' ],
      specialStatus4: [ '<32>{#p/story}* Papyrus notices the lack of logic and brings it back inside.' ],
      specialStatus5: [ '<32>{#p/story}* Papyrus is sweating.' ],
      specialStatus6: [ "<32>{#p/story}* Papyrus is at his wit's end." ],
      status1: [ '<32>{#p/story}* Papyrus is sparing you.' ],
      status2: [ '<32>{#p/story}* Papyrus blocks the way!' ],
      turnTalk0a: [ "<15>{#p/papyrus}{#f/24}SO, YOU'RE SERIOUS..." ],
      turnTalk0b: [ "<15>{#p/papyrus}{#f/24}SO, YOU WON'T FIGHT..." ],
      turnTalk0c: [ "<15>{#p/papyrus}{#f/20}THEN LET'S SEE HOW YOU HANDLE MY FABLED 'BLUE ATTACK!'" ],
      turnTalk0x: [
         "<15>{#p/papyrus}{#f/10}YOU'RE BLUE NOW.",
         "<15>{#f/10}THAT'S MY ATTACK!",
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      turnTalk1a: [ '<15>{#p/papyrus}{#f/20}BEHOLD!' ],
      turnTalk1b: [ '<15>{#p/papyrus}{#f/20}HMMM... I WONDER WHAT I SHOULD WEAR...' ],
      turnTalk2a: [ '<15>{#p/papyrus}{#f/20}HOW HIGH CAN YOU JUMP?' ],
      turnTalk2b: [ "<15>{#p/papyrus}{#f/22}WHAT!?\nI'M NOT THINKING ABOUT THE DATE!!" ],
      turnTalk3: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/21}... IS IT JUST ME, OR DOES THE AIR SEEM A LITTLE WEIRD?' ]
            : [ "<15>{#p/papyrus}{#f/20}YEAH!\nDON'T MAKE ME USE MY {@fill=#f00}SPECIAL ATTACK{@fill=#000}!" ],
      turnTalk4: () =>
         world.postnoot
            ? [ "<15>{#p/papyrus}{#f/20}OH WELL.\nI'M SURE IT'S NOTHING." ]
            : [ '<15>{#p/papyrus}{#f/20}I CAN ALMOST TASTE MY FUTURE POPULARITY!!!' ],
      turnTalk5: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/20}BESIDES, I SEE MARINARA SAUCE IN MY FUTURE!' ]
            : [ '<15>{#p/papyrus}{#f/20}PAPYRUS: UNPARALLELED SPAGHETTORE!' ],
      turnTalk6: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/20}AND A POSITION IN THE ELITE SQUAD!' ]
            : [ '<15>{#p/papyrus}{#f/20}PAPYRUS: ELITE SQUAD MEMBER!' ],
      turnTalk7: [ '<15>{#p/papyrus}{#f/10}UNDYNE WILL BE REALLY PROUD OF ME!!' ],
      turnTalk8: [ '<15>{#p/papyrus}{#f/20}THE KING WILL BUILD A STATUE OF ME IN THE CITADEL!!!' ],
      turnTalk9: [ "<15>{#p/papyrus}{#f/10}... AND I'LL MAKE SURE MY BROTHER GETS ONE TOO." ],
      turnTalk10: [ "<15>{#p/papyrus}{#f/27}WE'LL HAVE LOTS OF ADMIRERS!!\nBUT..." ],
      turnTalk11a: [ '<15>{#p/papyrus}{#f/20}HOW WILL I KNOW IF PEOPLE SINCERELY LIKE ME???' ],
      turnTalk11b: [ '<15>{#p/papyrus}{#f/20}WILL ANYONE LIKE ME LIKE YOU DO?' ],
      turnTalk12: [ '<15>{#p/papyrus}{#f/21}SOMEONE LIKE YOU IS REALLY RARE...' ],
      turnTalk13a: [ "<15>{#p/papyrus}{#f/21}I DON'T THINK THEY'LL LET YOU GO..." ],
      turnTalk13b: [ '<15>{#p/papyrus}{#f/21}AND DATING MIGHT BE KIND OF HARD...' ],
      turnTalk14: [ "<15>{#p/papyrus}{#f/26}AFTER YOU'RE CAPTURED AND SENT AWAY." ],
      turnTalk15: [ '<15>{#p/papyrus}{#f/17}URGH... WHO CARES!\nGIVE UP!!' ],
      turnTalk16: [ '<15>{#p/papyrus}{#f/15}GIVE UP OR FACE MY... {@fill=#f00}SPECIAL ATTACK{@fill=#000}!' ],
      turnTalk17: [ '<15>{#p/papyrus}{#f/20}YEAH!!!\nVERY SOON I WILL USE MY {@fill=#f00}SPECIAL ATTACK{@fill=#000}!' ],
      turnTalk18: [
         '<15>{#p/papyrus}{#f/20}THIS IS YOUR LAST CHANCE... BEFORE MY {@fill=#f00}SPECIAL ATTACK{@fill=#000}!'
      ],
      turnTalk19: [ '<15>{#p/papyrus}{#f/20}BEHOLD...!\nMY {@fill=#f00}SPECIAL ATTACK{@fill=#000}!' ],
      turnTalk19x: [
         '<15>{#p/papyrus}{#f/15}NYEH HEH HEH!',
         '<15>{#f/20}NO HUMAN HAS EVER BESTED MY {@fill=#f00}SPECIAL ATTACK{@fill=#000} BEFORE!',
         '<15>{#f/20}PREPARE TO BE CAPTURED, ONCE AND FOR ALL!'
      ],
      turnTalk20: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION ALPHA!!' ],
      turnTalk21: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION BETA!!' ],
      turnTalk22: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION GAMMA!!' ],
      turnTalk23: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION DELTA!!' ],
      turnTalk24: [
         '<15>{#p/papyrus}{#f/27}WOWIE!\nARE YOU STRONG!',
         '<15>{#f/20}BUT NO FEAR!\nI WILL NOT BE DETERRED BY YOUR STRENGTH!',
         '<15>{#f/14}... SPECIAL ATTACK...',
         '<15>{#f/17}FORMATION {@fill=#f00}SIGMA{@fill=#000}!!!'
      ],
      turnTalk24x: [
         "<15>{#p/papyrus}{#f/27}WELL...! *HUFF* IT'S CLEAR... YOU CAN'T! *HUFF* BEAT ME!",
         '<15>{#f/15}YEAH!!! I CAN SEE YOU SHAKING IN YOUR BOOTS!!',
         '<15>{#f/20}I, THE GREAT PAPYRUS, ELECT TO GRANT YOU PITY!!',
         '<15>{#f/20}I WILL {@fill=#f00}SPARE YOU{@fill=#000}, HUMAN!!!',
         "<15>{#f/10}NOW'S YOUR CHANCE TO ACCEPT MY {@fill=#f00}MERCY{@fill=#000}."
      ],
      idleTalk: [ '<15>{#p/papyrus}{#f/20}...' ],
      idleTalkBullied: [ '<18>{#p/papyrus}{#f/27}...' ],
      secretFlirt1: [ '<15>{#p/papyrus}{#f/27}YOU WISH TO REMAIN WITH ME... FOREVER?', '<15>{#p/papyrus}{#f/21}HMM...' ],
      secretFlirt2: [
         '<15>{#p/papyrus}{#f/27}SOMETHING IS TRYING TO TEAR OUR LOVE APART?',
         '<15>{#p/papyrus}{#f/21}I WONDER...'
      ],
      secretFlirt2x: [
         "<15>{#p/papyrus}{#f/27}SO YOU -DON'T- WISH TO REMAIN WITH ME?",
         "<15>{#p/papyrus}{#f/14}BUT THEN... WHY WON'T YOU ACCEPT MY MERCY AND LEAVE ME?"
      ],
      secretFlirt3: [
         "<15>{#p/papyrus}{#f/25}UH, I DON'T THINK WE'VE GOTTEN -THAT- FAR YET...",
         '<15>{#p/papyrus}{#f/15}... BUT WE CAN SURE TRY LATER!'
      ],
      secretFlirt3x: [ "<15>{#p/papyrus}{#f/27}WAIT, ARE -YOU- THE ONE WHO'S TRYING TO TEAR OUR LOVE APART?" ],
      secretFlirt4: [ '<15>{#p/papyrus}{#f/24}WAIT, ARE YOU SUGGESTING SOME KIND OF... LOVE TRIANGLE???' ],
      secretFlirt4x: [
         "<15>{#p/papyrus}{#f/26}... SO YOU -DON'T- WANT TO TRY THAT LATER?",
         '<15>{#p/papyrus}{#f/24}AND NOT ONLY THAT, BUT...',
         '<15>{#p/papyrus}{#f/22}YOU NEVER EVEN WANTED TO BE WITH ME TO BEGIN WITH!?'
      ],
      secretFlirt5: [ "<15>{#p/papyrus}{#f/22}OR MAYBE IT'S MORE LIKE... A LOVE TRAPEZOID!" ],
      secretFlirt5x: [
         "<15>{#p/papyrus}{#f/21}NO?\nIT'S ACTUALLY A LOVE DI-ANGLE INSTEAD?",
         "<15>{#p/papyrus}{#f/18}BUT... THAT'S NOT EVEN A REAL SHAPE!",
         "<15>{#p/papyrus}{#f/27}ARE YOU SAYING THAT OUR LOVE, ISN'T TRULY REAL AFTER ALL!?"
      ],
      secretFlirt6: [
         '<15>{#p/papyrus}{#f/14}WAIT... I THINK I GET IT NOW!',
         '<15>{#p/papyrus}{#f/15}THE PRINCE IS JEALOUS OF YOUR AFFECTION FOR ME!',
         '<15>{#p/papyrus}{#f/24}SO... HE SPRUNG A TRAP TO PREVENT US FROM BEING TOGETHER!'
      ],
      secretFlirt6x: [
         "<15>{#p/papyrus}{#f/27}NO?\nBUT AT LEAST I'M ON THE RIGHT TRACK?",
         '<15>{#p/papyrus}{#f/24}WAIT... TRAPEZOID...',
         "<15>{#p/papyrus}{#f/22}ARE YOU SAYING THAT YOU'RE TRAPPED WITH ME, RIGHT NOW!?",
         "<15>{#p/papyrus}{#f/14}BUT THEN... WHY WON'T YOU ACCEPT MY MERCY AND ESCAPE?",
         '<15>{#p/papyrus}{#f/21}... THERE MUST BE SOMETHING ELSE GOING ON HERE.',
         '<15>{#p/papyrus}{#f/26}NO... YES.',
         '<15>{#p/papyrus}{#f/20}YES, YES, YES!!!',
         '<15>{#p/papyrus}{#f/20}I FINALLY UNDERSTAND IT NOW!',
         '<15>{#p/papyrus}{#f/15}THIS MUST BE THE WORK OF THAT \"ASRIEL\" FELLOW!',
         "<15>{#p/papyrus}{#f/14}SOMEHOW, HE'S OUTRIGHT PREVENTED YOU FROM SHOWING MERCY TO ME!"
      ],
      secretFlirt7: [
         '<15>{#p/papyrus}{#f/14}WELL.\nTHIS SIMPLY WILL NOT STAND!',
         '<15>{#p/papyrus}{#f/20}IN FACT, I HAVE THE PERFECT SOLUTION ALREADY!',
         "<15>{#p/papyrus}{#f/10}TO AVOID ANY ROMANTIC DRAMA, I'LL LEAVE POLITELY.",
         "<15>{#p/papyrus}{#f/24}THEN, WHEN YOU'RE ALONE WITH HIM ONCE AGAIN...",
         "<15>{#p/papyrus}{#f/25}YOU'LL BE IN THE PERFECT POSITION...",
         '<15>{#p/papyrus}{#f/15}TO ENSURE HE DOES NOT GET IN THE WAY OF YOUR FEELINGS!',
         '<15>{#p/papyrus}{#f/20}NYEH HEH HEH HEH HEH HEH HEH HEH HEH HEH!'
      ],
      secretFlirt8: [
         '<15>{#p/papyrus}{#f/20}FRET NOT, HUMAN!',
         '<15>{#p/papyrus}{#f/14}I, PAPYRUS, WILL MAKE SURE NO HARM COMES TO EITHER OF US!',
         '<15>{#p/papyrus}{#f/20}I WILL SPARE MYSELF FOR YOU!',
         '<15>{#p/papyrus}{#f/20}AND THEN, I WILL FIND A VERY SAFE PLACE TO HIDE.',
         "<15>{#p/papyrus}{#f/15}DON'T WORRY, HUMAN!\nPAPYRUS HAS THIS UNDER CONTROL!"
      ],
      secretInsult1: [ '<15>{#p/papyrus}{#f/27}UH... THANKS???' ],
      secretInsult2: [ '<15>{#p/papyrus}{#f/21}IDIOT... WHERE HAVE I HEARD THAT BEFORE...' ],
      secretInsult2x: [
         '<15>{#p/papyrus}{#f/22}OR... NOT?',
         '<15>{#p/papyrus}{#f/24}SO, LET ME GET THIS STRAIGHT.',
         '<15>{#p/papyrus}{#f/27}YOU MEANT TO SAY YOU... LOVE ME???',
         '<15>{#p/papyrus}{#f/27}AND THAT SOMETHING IS TRYING TO TEAR OUR LOVE APART?'
      ],
      secretInsult3: [ '<15>{#p/papyrus}{#f/29}NOW WHAT...' ],
      secretInsult3x: [
         "<15>{#p/papyrus}{#f/27}YOU MEAN I'M AN IDIOT FOR NOT NOTICING HOW MUCH YOU LOVE ME?",
         '<15>{#p/papyrus}{#f/28}AND THAT YOU WANT TO... UH...',
         "<15>{#p/papyrus}{#f/25}I-I MEAN, I DON'T THINK WE'VE GOTTEN -THAT- FAR YET...",
         '<15>{#p/papyrus}{#f/15}... BUT WE CAN SURE TRY LATER!'
      ],
      secretInsult4: [ "<15>{#p/papyrus}{#f/27}I'M NOT SMART ENOUGH TO REALIZE WHAT'S GOING ON...?" ],
      secretInsult4x: [
         "<15>{#p/papyrus}{#f/27}SO... YOU MEANT TO SAY WE'RE IN A LOVE TRIANGLE?",
         "<15>{#p/papyrus}{#f/19}WELL, IT'D CERTAINLY EXPLAIN YOUR ABRASIVE ATTITUDE!"
      ],
      secretInsult5: [
         '<15>{#p/papyrus}{#f/27}HUH? SHOOT FOR THE STARS INSTEAD OF SHOOTING MYSELF?',
         '<15>{#p/papyrus}{#f/17}BUT WHAT DOES IT MEAN...!'
      ],
      secretInsult5x: [
         '<15>{#p/papyrus}{#f/25}WAIT... YOU WANTED ME TO REALIZE THAT YOU SECRETLY LOVED ME?',
         "<15>{#p/papyrus}{#f/22}AND THAT WE'RE ACTUALLY IN A... LOVE TRAPEZOID!?"
      ],
      secretInsult6: [
         '<15>{#p/papyrus}{#f/14}WAIT... I THINK I GET IT NOW!',
         '<15>{#p/papyrus}{#f/21}IDIOT...',
         '<15>{#p/papyrus}{#f/21}SHOOT FOR THE STARS...',
         '<15>{#p/papyrus}{#f/20}TWINKLY WAS A STAR, AND HE LOVED TO CALL PEOPLE IDIOTS!',
         '<15>{#p/papyrus}{#f/25}OBLIVIOUS...',
         "<15>{#p/papyrus}{#f/22}I'VE BEEN OBLIVIOUS THIS WHOLE TIME!",
         '<15>{#p/papyrus}{#f/20}THAT \"ASRIEL\" FELLOW SEEMS TO LOVE CALLING PEOPLE IDIOTS AS WELL!',
         '<15>{#p/papyrus}{#f/24}WHICH MEANS...',
         '<15>{#p/papyrus}{#f/22}THE \"STAR\" IN THIS SCENARIO MUST BE HIM!',
         '<15>{#p/papyrus}{#f/19}HE MUST HAVE DONE SOMETHING TO MAKE -ME- LOOK LIKE AN IDIOT!'
      ],
      secretInsult6x: [
         '<15>{#p/papyrus}{#f/10}OH... OH!',
         "<15>{#p/papyrus}{#f/10}YOU'RE THE STAR I'M SUPPOSED TO SHOOT FOR!",
         "<15>{#p/papyrus}{#f/20}YOU'VE BEEN TRYING TO WIN MY AFFECTION THIS WHOLE TIME!",
         '<15>{#p/papyrus}{#f/27}WOWIE... YOU SURE DO HAVE A STRANGE WAY OF GOING ABOUT IT...',
         '<15>{#p/papyrus}{#f/24}STRANGE ENOUGH...',
         "<15>{#p/papyrus}{#f/15}... THAT I'M CONVINCED THERE'S MORE GOING ON HERE!",
         "<15>{#p/papyrus}{#f/21}AFTER ALL, IF THAT'S WHAT YOU WANTED TO TELL ME...",
         '<15>{#p/papyrus}{#f/21}WHY GO TO ALL THIS TROUBLE...',
         '<15>{#p/papyrus}{#f/27}INSTEAD OF SPARING ME AND TALKING ABOUT IT AFTERWARDS?',
         "<15>{#p/papyrus}{#f/21}UNLESS... YOU REALLY -CAN'T- SPARE ME.",
         '<15>{#p/papyrus}{#f/26}NO... YES.',
         '<15>{#p/papyrus}{#f/20}YES, YES, YES!!!',
         '<15>{#p/papyrus}{#f/20}I FINALLY UNDERSTAND IT NOW!',
         '<15>{#p/papyrus}{#f/24}THAT \"ASRIEL\" FELLOW WAS SO SURE YOU\'D KILL ME...',
         "<15>{#p/papyrus}{#f/20}SOMETHING TELLS ME, HE MUST BE THE ONE WHO'S GETTING IN YOUR WAY!",
         "<15>{#p/papyrus}{#f/15}HE'S BEEN JEALOUS OF YOUR AFFECTION FOR ME ALL THIS TIME!"
      ],
      secretInsult7: [
         '<15>{#p/papyrus}{#f/14}WELL.\nI WILL NOT BE FOOLED BY THE LIKES OF HIM!',
         '<15>{#p/papyrus}{#f/20}I, PAPYRUS, WILL MAKE SURE HE NEVER FINDS ME AGAIN!',
         "<15>{#p/papyrus}{#f/15}DON'T WORRY, HUMAN!\nPAPYRUS HAS THIS UNDER CONTROL!"
      ],
      sparableFlirt1: [
         "<15>{#p/papyrus}{#f/27}YOU'RE SUPPOSED TO BE SPARING, NOT FLIRTING!",
         '<15>{#f/14}I MUST RESIST!'
      ],
      sparableFlirt1x: [
         '<15>{#p/papyrus}{#f/27}HUH?\nFLIRTING, AT A TIME LIKE THIS?',
         "<15>{#f/14}WELL, THAT'S ONE WAY TO REDEEM YOURSELF!"
      ],
      sparableFlirt2: [ '<15>{#p/papyrus}{#f/14}N-NO...!' ],
      sparableFlirt2x: [ '<15>{#p/papyrus}{#f/14}A-AH...!' ],
      sparableFlirt3: [ '<15>{#p/papyrus}{#f/14}...' ],
      sparableInsult1: [
         "<15>{#p/papyrus}{#f/20}HEY, THERE'S NO NEED TO INSULT YOURSELF!",
         '<15>{#f/21}I KNOW YOU DID YOUR BEST...'
      ],
      sparableInsult1x: [
         "<15>{#p/papyrus}{#f/20}HEY, THERE'S NO NEED TO INSULT YOURSELF!",
         "<15>{#f/15}YOU'RE HERE TO BETTER YOURSELF, REMEMBER?"
      ],
      sparableInsult2: [ '<15>{#p/papyrus}{#f/21}HUMAN...' ],
      sparableInsult2x: [ '<15>{#p/papyrus}{#f/15}COME ON...!' ],
      sparableInsult3: [ '<15>{#p/papyrus}{#f/21}...' ]
   },
   b_opponent_shockasgore: {
      act_check: [ '<32>{#p/asriel2}* Asgore.\n* The king who got his home planet destroyed.' ],
      act_hug: [ '<32>{#p/human}* (You attempt to hug Asgore...)' ],
      hugText: [ '<32>{#p/human}* (... but your body goes right through him.)', '<32>{#p/asriel2}* ... huh?' ],
      foodText: [ '<11>{#p/asgore}{#f/5}Is that...' ],
      idleText1: [ '<11>{#p/asgore}{#f/1}Really now...' ],
      idleText2: [ '<11>{#p/asgore}{#f/1}Must we resort to violence?' ],
      idleText3: [ '<11>{#p/asgore}{#f/1}Can we not settle this peacefully?' ],
      idleText4: [ '<11>{#p/asgore}{#f/1}Is this really necessary?' ],
      stickText: [
         '<32>{#p/human}* (You throw the spanner.)\n* (Asgore lets it pass right through him.)',
         '<32>{#p/asriel2}* ... huh?'
      ],
      miss: [
         '<11>{#p/asgore}{#f/2}...',
         '<11>{#f/1}I am not really here, Asriel.',
         "<11>{#f/2}It's just a projection."
      ],
      name: '* Asgore',
      status1: [ '<32>{#p/asriel2}* Kill him, $(name).' ],
      status2: [ '<32>{#p/asriel2}* ...' ]
   },

   i_berry: {
      battle: {
         description: 'A small branch of semi-translucent berries.',
         name: 'Exoberries'
      },
      drop: [ '<32>{#p/human}* (You throw away the Exoberries.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (7 HP.)' ]
            : [ '<32>{#p/basic}* \"Exoberries\" Heals 7 HP\n* A small branch of semi-translucent berries.' ],
      name: 'Exoberries',
      use: [ '<32>{#p/human}* (You eat the Exoberries.)' ]
   },
   i_blookpie: {
      battle: {
         description: 'Fresh exoberries, bathed in a sea of moist Jell-O.',
         name: 'Berry Pie'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Exoberry Pie.)',
         ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

            ? game.room === '_frontier4' // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ......... huh?' ]
               : [ '<32>{#p/napstablook}* oh..................' ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (99 HP.)' ]
            : [ '<32>{#p/basic}* \"Exoberry Pie\" Heals 99 HP\n* Fresh exoberries, bathed in a sea of moist Jell-O.' ],
      name: 'Exoberry Pie',
      use: () => [
         '<32>{#p/human}* (You eat the Exoberry Pie.)',
         ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

            ? game.room === '_frontier4' // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ......... huh?' ]
               : [ '<32>{#p/napstablook}* aw.........\n* i hope you like it.........' ]
            : [])
      ]
   },
   i_chip: {
      battle: {
         description: 'Please take this to the edge of the galaxy.',
         name: 'Chip'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Computer Chip.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [ "<25>{#p/asriel1}{#f/15}* Uh... weren't you going to protect that?" ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (45 HP. Rather than eating it, you feel you should keep this item safe.)' ]
            : [ '<32>{#p/basic}* \"Computer Chip\" Heals 45 HP\n* Please take this to the edge of the galaxy.' ],
      name: 'Computer Chip',
      use: () => [
         '<32>{#p/human}* (You bit into the Computer Chip.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [ "<25>{#p/asriel1}{#f/15}* Uh... weren't you going to protect that?" ]
            : world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : calcHP() - SAVE.data.n.hp > 45
            ? [ '<32>{#p/basic}* Seems your HP integer was increased.' ]
            : [ '<32>{#p/basic}* Seems your injuries have been overwritten.' ])
      ]
   },
   i_eye: {
      battle: {
         description: 'A portable force field.',
         name: 'Emitter'
      },
      drop: [ '<32>{#p/human}* (You throw away the Field Emitter.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (7 DF.)' ]
            : [ '<32>{#p/basic}* \"Field Emitter\" (7 DF)\n* A portable force field.' ],
      name: 'Field Emitter',
      use: [ '<32>{#p/human}* (You deployed the Field Emitter.)' ]
   },
   i_eye_x: {
      battle: {
         description: 'A somewhat underpowered portable force field.',
         name: 'Emitter?'
      },
      drop: [ '<32>{#p/human}* (You throw away the Field Emitter.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (5 DF.)' ]
            : [ '<32>{#p/basic}* \"Field Emitter?\" (5 DF)\n* A somewhat underpowered portable force field.' ],
      name: 'Field Emitter?',
      use: [ '<32>{#p/human}* (You deployed the Field Emitter.)' ]
   },
   i_fruit: {
      battle: {
         description: 'A non-euclidian fruit, bigger on the inside.',
         name: 'Ghost Fruit'
      },
      drop: [ '<32>{#p/human}* (You fold the Ghost Fruit in on itself.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (15 HP.)' ]
            : [ '<32>{#p/basic}* \"Ghost Fruit\" Heals 15 HP\n* A non-euclidian fruit, bigger on the inside.' ],
      name: 'Ghost Fruit',
      use: [ "<32>{#p/human}* (You unpacked the Ghost Fruit's many dimensions.)" ]
   },
   i_glove: {
      battle: {
         description: "A state-of-the-art bionic glove.\nIt's so bad.",
         name: 'Power Glove'
      },
      drop: [ '<32>{#p/human}* (You throw away the Power Glove.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (5 AT.)' ]
            : [ '<32>{#p/basic}* \"Power Glove\" (5 AT)\n* A state-of-the-art bionic glove. It\'s so bad.' ],
      name: 'Power Glove',
      use: [ '<32>{#p/human}* (You wear the Power Glove.)' ]
   },
   i_glove_x: {
      battle: {
         description: "It's not the original, but it still packs a punch.",
         name: 'Glove?'
      },
      drop: [ '<32>{#p/human}* (You throw away the Power Glove.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (3 AT.)' ]
            : [ '<32>{#p/basic}* \"Power Glove?\" (3 AT)\n* It\'s not the original, but it still packs a punch.' ],
      name: 'Power Glove?',
      use: [ '<32>{#p/human}* (You wear the Power Glove.)' ]
   },
   i_milkshake: {
      battle: {
         description: 'Made of an unknown, pearly-white substance.',
         name: 'Milkshake'
      },
      drop: [ '<32>{#p/human}* (You rid yourself of the Milkshake.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (18 HP.)' ]
            : [ '<32>{#p/basic}* \"Milkshake\" Heals 18 HP\n* Made of an unknown, pearly-white substance.' ],
      name: 'Milkshake',
      use: () => [
         '<32>{#p/human}* (You swallowed every last drop of the Milkshake.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : [ '<32>{#p/basic}* ... salty.' ])
      ]
   },
   i_nice_cream: {
      battle: {
         description: 'Instead of a joke, the wrapper says something fantastical.',
         name: 'Ice Dream'
      },
      drop: [ '<32>{#p/human}* (You throw away the Ice Dream.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (15 HP.)' ]
            : [ '<32>{#p/basic}* \"Ice Dream\" Heals 15 HP\n* Instead of a joke, the wrapper says something fantastical.' ],
      name: 'Ice Dream',
      use: pager.create(
         2,
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? '<32>* (The wrapper spoke of a world- saving adventure.)'
               : '<32>{#p/basic}* \"You\'re a grand adventurer, on a mission to save the world!\"'
         ],
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? '<32>* (The wrapper mentioned your role as a starship captain.)'
               : '<32>{#p/basic}* \"You\'re the captain of a starship, moving deeper into unexplored space!\"'
         ],
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? '<32>* (The wrapper claimed that you could uniquely solve a mystery.)'
               : '<32>{#p/basic}* \"A grand mystery unfolds, and you\'re the only one who can solve it!\"'
         ],
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? '<32>* (The wrapper talked of your time-traveling endeavour.)'
               : '<32>{#p/basic}* \"You\'ve traveled back in time to stop a terrible catastrophe!\"'
         ],
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? '<32>* (The wrapper stated your scientific brilliance.)'
               : '<32>{#p/basic}* \"You\'re a brilliant scientist on the verge of a massive breakthrough!\"'
         ],
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? "<32>* (The wrapper established the innocent world you've ended up in.)"
               : '<32>{#p/basic}* \"You stumble on a world of innocent creatures, and it\'s up to you what happens next!\"'
         ],
         () => [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            SAVE.data.b.svr
               ? '<32>* (The wrapper detailed your newfound power.)'
               : '<32>{#p/basic}* \"You\'ve gained the power to change the universe at your will! Use it wisely!\"'
         ],
         [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            "<32>{#p/human}* (It's a holographic illustration of you, finding a loving family.)"
         ]
      )
   },
   i_pop: {
      battle: {
         description: 'Alters your perception of time.',
         name: 'Vortex Pop'
      },
      drop: [ '<32>{#p/human}* (You throw away the Vortex Pop.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (11 HP.)' ]
            : [
                 '<33>{#p/basic}* \"Vortex Pop\" Heals 11 HP\n* Alters your perception of time.\n* Not viable outside of battle.'
              ],
      name: 'Vortex Pop',
      use: () => [
         '<32>{#p/human}* (You suck on the Vortex Pop.)',
         ...(battler.active
            ? game.vortex
               ? [ '<32>{#p/human}* (Your perception of time is already shifted.)' ]
               : [
                    '<32>{#p/human}* (Your perception of time begins to shift.)',
                    '<32>{#p/story}* FOCUS up for two turns!'
                 ]
            : [ '<32>{#p/human}* (No effect outside of battle.)' ])
      ]
   },
   i_spaghetti: {
      battle: {
         description: 'Silken spaghetti, finely aged in a time dilation unit.',
         name: 'Spaghetti'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Spaghetti.)',
         ...(game.room === 's_jenga' && SAVE.data.n.plot < 26 // NO-TRANSLATE

            ? []
            : !world.genocide && !world.runaway && (SAVE.data.n.state_papyrus_spaghet !== 0 || game.room === 's_bros') // NO-TRANSLATE

            ? game.room === 'f_kitchen' // NO-TRANSLATE

               ? [
                    SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* ...' : '<25>{#p/undyne}{#f/14}* ...',
                    "<25>{#p/undyne}{#f/17}* I'll scrape that off the floor and heat it up in the fridge later."
                 ]
               : SAVE.data.n.plot === 72 && game.room === 'c_asgore_kitchen' // NO-TRANSLATE

               ? [
                    '<18>{#p/papyrus}{#f/8}NOOO!!\nWHAT HAVE YOU DONE!?!?',
                    '<18>{#f/5}... THE SPAGHETTI I MADE FOR YOU...',
                    '<18>{#f/4}... IS... ACTUALLY KIND OF OLD, TO BE HONEST.',
                    '<18>{#f/0}YEAH!!\nMY NEW DISH WILL BE WAY BETTER!',
                    "<18>{#f/9}FEEL FREE TO SWING BY AND HAVE SOME WHEN IT'S DONE!",
                    '<25>{#p/sans}{#f/2}* trust me.\n* his new stuff is WAY too good to throw out.',
                    '<18>{#f/6}... YEAH!!'
                 ]
               : (game.room === 's_bonehouse' && dateready()) || // NO-TRANSLATE

                 (fetchCharacters()
                    .find(c => c.key === 'papyrus') // NO-TRANSLATE

                    ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
               ? [
                    '<18>{#p/papyrus}{#f/8}NOOO!!\nWHAT HAVE YOU DONE!?!?',
                    '<18>{#f/5}... THE SPAGHETTI I MADE FOR YOU...',
                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                       ? [
                            '<25>{#p/undyne}{#f/4}* Is perfectly fine!',
                            '<25>{#p/undyne}{#f/7}* Human!\n* Pick the spaghetti up off the floor NOW!',
                            "<18>{#p/papyrus}{#f/6}UNDYNE, PLEASE!!\nTHAT'S ENTIRELY UNSANITARY!!"
                         ]
                       : [ '<18>{#f/6}... IS CONSUMABLE NO LONGER!!' ]),
                    "<18>{#f/4}STILL... MAYBE IT'S FOR THE BEST.",
                    '<18>{#f/5}LIKE, MAYBE SEEING YOU THROW THAT AWAY...',
                    '<18>{#f/6}WILL ENCOURAGE ME TO MAKE A EVEN -BETTER- DISH!',
                    '<18>{#f/9}YEAH! LOOK AT HOW ENCOURAGED I AM RIGHT NOW!',
                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                       ? [ '<25>{#p/undyne}{#f/17}* YEAH!!\n* Look at how encouraged he is right now!!' ]
                       : []),
                    "<18>{#p/papyrus}{#f/9}I'LL MAKE THE BEST DISH THE GALAXY'S EVER SEEN!",
                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                       ? [
                            "<25>{#p/undyne}{#f/7}* And you're GOING to enjoy it this time!!",
                            "<18>{#p/papyrus}{#f/6}BUT IT'S OKAY IF YOU DON'T!!!",
                            '<25>{#p/undyne}{#f/17}* OKAY!!!!',
                            '<18>{#p/papyrus}{#f/9}OKAY!!!!!',
                            '<25>{#p/undyne}{#f/8}* OKAY!!!!!!',
                            '<18>{#p/papyrus}{#f/4}... OKAY.'
                         ]
                       : [])
                 ]
               : instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                 (fetchCharacters()
                    .find(c => c.key === 'sans') // NO-TRANSLATE

                    ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
               ? [
                    "<25>{#p/sans}{#f/0}* huh?\n* you don't like my bro's signature spaghetti?",
                    '<25>{#f/2}* more for me, i guess.'
                 ]
               : []
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (16 HP.)' ]
            : [ '<32>{#p/basic}* \"Spaghetti\" Heals 16 HP\n* Silken spaghetti, finely aged in a time dilation unit.' ],
      name: 'Spaghetti',
      use: () => [
         '<32>{#p/human}* (You eat the Spaghetti.)',
         ...(game.room === 's_jenga' && SAVE.data.n.plot < 26 // NO-TRANSLATE

            ? []
            : !battler.active &&
              !world.genocide &&
              !world.runaway &&
              (SAVE.data.n.state_papyrus_spaghet !== 0 || game.room === 's_bros') // NO-TRANSLATE

            ? game.room === 'f_kitchen' // NO-TRANSLATE

               ? [
                    SAVE.data.b.undyne_respecc
                       ? '<25>{#p/undyne}{#f/1}* Spaghetti, huh?'
                       : '<25>{#p/undyne}{#f/14}* Spaghetti, huh?',
                    "<25>{#p/undyne}{#f/8}* You better like it, 'cause it's MY recipe!!"
                 ]
               : SAVE.data.n.plot === 72 && game.room === 'c_asgore_kitchen' // NO-TRANSLATE

               ? [
                    '<18>{#p/papyrus}{#f/1}WHAT?\nDID YOU JUST EAT THAT SPAGHETTI?',
                    '<18>{#f/5}IT SURE HAS BEEN A WHILE SINCE I MADE IT...',
                    '<25>{#p/sans}{#f/2}* a few hours, at least.',
                    "<18>{#p/papyrus}{#f/6}WELL, I'D WAGER THAT IT'S OUT OF DATE BY NOW.",
                    "<18>{#f/6}AND BY THAT, I MEAN IT'S AN OLDER VERSION.",
                    "<18>{#f/4}BUT DON'T WORRY.\nTHIS NEW SPAGHETTI DISH HERE...",
                    '<18>{#f/9}... IS WAY BETTER THAN THE OLD STUFF!',
                    "<18>{#f/9}FEEL FREE TO SWING BY AND HAVE SOME WHEN IT'S DONE!"
                 ]
               : (game.room === 's_bonehouse' && dateready()) || // NO-TRANSLATE

                 (fetchCharacters()
                    .find(c => c.key === 'papyrus') // NO-TRANSLATE

                    ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
               ? SAVE.data.n.state_papyrus_spaghet === 0
                  ? ((SAVE.data.n.state_papyrus_spaghet = 2),
                    [
                       '<18>{#p/papyrus}{#f/1}WHAT?\nDID YOU JUST EAT THAT SPAGHETTI?',
                       "<18>{#f/5}I WAS GOING TO ASK YOU WHAT YOU'D DO WITH IT...",
                       '<18>{#f/6}BUT IT SEEMS I HAVE MY ANSWER NOW!',
                       '<18>{#f/0}THANK YOU, HUMAN, FOR EATING SO INFORMATIVELY.'
                    ])
                  : [
                       [
                          '<18>{#p/papyrus}{#f/1}WHAT?\nDID YOU JUST EAT THAT SPAGHETTI?',
                          '<18>{#f/7}I THOUGHT YOU WERE GOING TO SHARE IT!',
                          ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                             ? [
                                  "<25>{#p/undyne}{#f/7}* Well, maybe they didn't WANT to share it!",
                                  '<18>{#p/papyrus}{#f/6}BUT THEY PROMISED!'
                               ]
                             : []),
                          '<18>{#f/5}... PERHAPS MY COOKING IS AT FAULT HERE...',
                          "<18>{#f/6}IT WAS SO TASTY, YOU COULDN'T HELP BUT TAKE A BITE!",
                          '<18>{#f/5}AND ANOTHER, AND ANOTHER...',
                          "<18>{#f/6}BEFORE YOU KNEW IT, YOU'D EATEN THE ENTIRE PLATE!",
                          ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                             ? [ '<25>{#p/undyne}{#f/14}* Wow.\n* What a crime.' ]
                             : []),
                          '<18>{#p/papyrus}{#f/5}TO THINK MY COOKING MADE YOU BETRAY ME...',
                          "<18>{#f/9}N-NO...!\nI'LL FIX THIS!",
                          '<18>{#f/4}... \"AHEM.\"',
                          '<18>{#f/0}I, PAPYRUS, HEREBY DECLARE YOUR PROMISE VOID.',
                          '<18>{#f/0}THERE!\nNOW, YOU MAY EAT GUILT-FREE.',
                          ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                             ? [
                                  '<25>{#p/undyne}{#f/11}* ...',
                                  '<18>{#p/papyrus}{#f/4}(IT WOULD HELP IF YOU PLAYED ALONG.)',
                                  "<25>{#p/undyne}{#f/12}* Right!\n* Guilt-free!\n* That's how you'll eat!",
                                  '<18>{#p/papyrus}{#f/0}(THANK YOU.)'
                               ]
                             : [])
                       ],
                       [
                          '<18>{#p/papyrus}{#f/1}WHAT?\nDID YOU JUST EAT THAT SPAGHETTI?',
                          "<18>{#f/4}WELL, YOU DIDN'T SAY YOU WERE GOING TO SHARE IT...",
                          ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                             ? [
                                  "<25>{#p/undyne}{#f/11}* So what's the problem?",
                                  "<18>{#p/papyrus}{#f/0}OH, UH, I GUESS THERE ISN'T ONE."
                               ]
                             : [ "<18>{#f/0}HMM, I SUPPOSE THAT'S FOR THE BEST." ]),
                          '<18>{#f/5}AFTER ALL, IF YOU -HAD- MADE SUCH A STATEMENT...',
                          '<18>{#f/6}WE WOULD HAVE BEEN IN QUITE THE PERDICAMENT.',
                          "<18>{#f/0}BUT YOU DIDN'T!\nSO WE'RE GOOD!",
                          ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                             ? [
                                  '<25>{#p/undyne}{#f/12}* And all is right with the world, huh?',
                                  "<18>{#p/papyrus}{#f/7}HEY, THAT'S WHAT I WAS GOING TO SAY!",
                                  '<18>{#f/0}BUT YES.\nYES IT IS.'
                               ]
                             : [ '<18>{#f/0}AND ALL IS RIGHT WITH THE WORLD.' ])
                       ]
                    ][SAVE.data.n.state_papyrus_spaghet - 1]
               : instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                 (fetchCharacters()
                    .find(c => c.key === 'sans') // NO-TRANSLATE

                    ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
               ? [
                    "<25>{#p/sans}{#f/3}* it's pretty good, huh?",
                    "<25>{#f/2}* i should know.\n* i'm the one who got to taste test it."
                 ]
               : []
            : [])
      ]
   },
   i_swirl: {
      battle: {
         description: 'A glowing, colorful sugar roll.',
         name: 'Swirl'
      },
      drop: [ '<32>{#p/human}* (You throw away the Radiant Swirl.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (22 HP.)' ]
            : [ '<32>{#p/basic}* \"Radiant Swirl\" Heals 22 HP\n* A glowing, colorful sugar roll.' ],
      name: 'Radiant Swirl',
      use: [ '<32>{#p/human}* (You eat the Radiant Swirl.)' ]
   },
   i_voidy: {
      battle: {
         description: 'Leads to a mysterious place.\nNot viable in battle.',
         name: 'Sanctuary'
      },
      drop: [ '<32>{#p/human}* (You throw away the Sanctuary.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (A device whose origin is beyond the boundaries of existence.)' ]
            : [ '<32>{#p/basic}* Leads to a mysterious place.\n* Accessible on-the-go.' ],
      name: 'Sanctuary',
      use: () =>
         battler.active
            ? [ '<32>{#p/human}* (You use the Sanctuary.)', '<32>{#p/human}* (No effect in battle.)' ]
            : [ '<32>{#p/human}* (You use the Sanctuary.)' ]
   },
   i_corndog_sword: {
      battle: {
         description: 'A truly one-of-a-kind weapon.',
         name: 'Dog Sword'
      },
      drop: [ '<32>{#p/human}* (You try to throw away the Corn Dog Sword...)', '<32>{#p/human}* (... but it refuses.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (You decide not to question the logic of this weapon.)' ]
            : [ '<32>{#p/basic}* A truly one-of-a-kind weapon.' ],
      name: 'Corn Dog Sword',
      use: () =>
         battler.active && battler.alive[0].opponent.metadata.corndogger
            ? [
                 '<32>{#p/human}* (You equip the Corn Dog Sword.)',
                 "<32>{#p/human}* (You can't resist the urge to take a bite.)",
                 [
                    '<32>{#p/human}* (You consume the outer layer of breading...)',
                    '<32>{#p/human}* (You consume the tip...)',
                    '<32>{#p/human}* (You consume the blade...)',
                    '<32>{#p/human}* (You consume the hilt...)',
                    '<32>{#p/human}* (You consume the handle...)'
                 ][SAVE.data.n.corndogger++],
                 '<32>{#p/basic}* Suddenly...!'
              ]
            : [
                 '<32>{#p/human}* (You try to equip the Corn Dog Sword...)',
                 "<32>{#p/human}* (... but it didn't detect a high enough threat level!)"
              ]
   },
   i_fryz: {
      battle: {
         description: 'For once, it\'s not just \"pleasantly warm.\"',
         name: 'Grillby'
      },
      drop: [ "<32>{#p/human}* (You tossed the Flamin' Grillby like a molotov.)" ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (30 HP.)' ]
            : [ '<32>{#p/basic}* \"Flamin\' Grillby\" Heals 30 HP\n* For once, it\'s not just \"pleasantly warm.\"' ],
      name: "Flamin' Grillby",
      use: [ "<32>{#p/human}* (You consume the Flamin' Grillby.)" ]
   },
   i_burgerz: {
      battle: {
         description: 'Like burgers, but smaller.\nThree left.',
         name: 'Slider Trio'
      },
      drop: [ '<32>{#p/human}* (You throw away the Sliders.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (15 HP. Three uses left.)' ]
            : [ '<32>{#p/basic}* \"Sliders\" Heals 15 HP\n* Like burgers, but smaller.\n* Three left.' ],
      name: 'Slider Trio',
      use: [ '<32>{#p/human}* (You eat one of the Sliders.)' ]
   },
   i_burgerz_use1: {
      battle: {
         description: 'Like burgers, but smaller.\nTwo left.',
         name: 'Slider Duo'
      },
      drop: [ '<32>{#p/human}* (You throw away the Sliders.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (15 HP. Two uses left.)' ]
            : [ '<32>{#p/basic}* \"Sliders\" Heals 15 HP\n* Like burgers, but smaller.\n* Two left.' ],
      name: 'Slider Duo',
      use: [ '<32>{#p/human}* (You eat one of the Sliders.)' ]
   },
   i_burgerz_use2: {
      battle: {
         description: 'Like a burger, but smaller.',
         name: 'Slider'
      },
      drop: [ '<32>{#p/human}* (You throw away the Sliders.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (15 HP. One use left.)' ]
            : [ '<32>{#p/basic}* \"Sliders\" Heals 15 HP\n* Like burgers, but smaller.\n* One left.' ],
      name: 'Slider',
      use: [ '<32>{#p/human}* (You eat one of the Sliders.)' ]
   },

   k_premium: {
      name: 'Premium Membership Voucher',
      description: () =>
         SAVE.data.b.f_state_voucher
            ? 'Used in tandem with your nonexistent premium telescope subscription.'
            : 'Given to you by Monster Kid after using the telescope in Starton.'
   },

   k_inverter: {
      name: 'Gravometric Inverter Remote',
      description: () =>
         SAVE.data.b.s_state_inverter
            ? 'Used to operate the eponymous Gravometric Inverter.'
            : "Acquired from the unsealed envelope in Sans's room."
   },

   k_security: {
      name: 'Rusty Key',
      description: () =>
         SAVE.data.n.state_aerialis_lockup > 0
            ? 'Used to unlock the armory in the rec center.'
            : 'Acquired at the \"police station\" on the north side of Starton town.'
   },

   n_shop_blook: {
      exit: [ "<32>{#p/napstablook}{#k/0}* oh... you're leaving...", '<32>{#k/1}* well, cya next time i guess...' ],
      item: () =>
         blookGone()
            ? [
                 '§fill=#808080§--- UNAVAILABLE ---',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§--- UNAVAILABLE ---' : '0G - Exoberry Jell-O Pie',
                 '0G - Ghost Fruit',
                 '0G - Milkshake',
                 'Exit'
              ]
            : SAVE.data.n.plot === 72
            ? [
                 SAVE.data.b.item_voidy ? '§fill=#808080§--- UNAVAILABLE ---' : '432G - Sanctuary',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§--- UNAVAILABLE ---' : '80G - Exoberry Jell-O Pie',
                 '5G - Ghost Fruit',
                 '5G - Milkshake',
                 'Exit'
              ]
            : [
                 SAVE.data.b.item_voidy ? '§fill=#808080§--- UNAVAILABLE ---' : '432G - Sanctuary',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§--- UNAVAILABLE ---' : '100G - Exoberry Jell-O Pie',
                 '12G - Ghost Fruit',
                 '16G - Milkshake',
                 'Exit'
              ],
      itemInfo: [
         'Special:\nLeads to a\nmysterious\nplace.',
         'Heals 99HP\nGlows in\nthe dark.',
         "Heals 15HP\nIt's non-\neuclidian.",
         'Heals 18HP\nMay contain\nectoplasm.'
      ],
      itemPrompt: '<09>{#p/napstablook}{#k/3}see anything you like?',
      itemPurchase: [
         '<09>{#p/napstablook}{#k/3}heh... thank you...',
         "<09>{#p/napstablook}{#k/0}you don't have to buy it...",
         '<09>{#p/napstablook}{#k/0}sorry... not enough g...',
         "<10>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () => (blookGone() ? 'Take it?' : 'Buy it for\n$(x)G?'),
      itemUnavailable: () =>
         blookGone() ? '<09>{#p/basic}Nothing left.' : "<09>{#p/napstablook}{#k/0}oh... i don't have any more...",
      menu: () =>
         blookGone() ? [ 'Take', 'Steal', 'Read', 'Exit' ] : [ 'Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit' ],
      menuPrompt1: () =>
         [
            '<23>{#p/napstablook}{#k/3}* have a look around...',
            "<23>{#p/napstablook}{#k/3}* i hope you find what you're looking for...",
            "<23>{#p/napstablook}{#k/3}* have a look around... or not... it's your choice...",
            '<23>{#p/napstablook}{#k/3}* have a look around, i guess...',
            "<23>{#p/napstablook}{#k/3}* have a look around... or not... it's your choice..."
         ][Math.min(SAVE.data.n.state_wastelands_napstablook, 4)],
      menuPrompt2: '<23>{#p/napstablook}{#k/0}* feel free to leave at any time...',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ... but everybody ran.' : '<23>{#p/basic}* ... but nobody came.',
      note: () =>
         [ 'f_blooky', 'f_napstablook' ].includes(SAVE.data.s.state_foundry_deathroom) // NO-TRANSLATE

            ? [ "<32>{#p/basic}* There's no note here." ]
            : SAVE.data.b.killed_mettaton
            ? [ "<32>{#p/basic}* There's a note here.", '<32>{#p/napstablook}* \"it\'s all your fault...\"' ]
            : world.runaway
            ? [ "<32>{#p/basic}* There's a note here.", '<32>{#p/napstablook}* \"we had no choice...\"' ]
            : [ "<32>{#p/basic}* There's a note here.", '<32>{#p/napstablook}* \"sorry, i had to go...\"' ],
      sell1: () =>
         blookGone()
            ? [ '<30>{#p/human}* (You took 42G from behind the counter.)' ]
            : world.meanie
            ? [
                 "<30>{#p/napstablook}{#k/2}* oh... you're trying to steal from me...",
                 '<30>{#p/napstablook}{#k/5}* you must really need it...',
                 SAVE.data.b.item_voidy
                    ? "<30>{#k/0}* i'm so sorry... the only money i have came from you..."
                    : "<30>{#k/0}* i'm so sorry... i don't have much to give..."
              ]
            : [
                 '<30>{#p/napstablook}{#k/2}* oh... you wanted to sell something',
                 "<30>{#k/0}* i don't know if i can afford to buy anything... sorry..."
              ],
      sell2: () =>
         blookGone()
            ? [ '<30>{#p/basic}* Nothing left.' ]
            : world.meanie
            ? [
                 "<30>{#p/napstablook}{#k/5}* um...\n* i can't give you anything of real value...",
                 "<30>{#p/napstablook}{#k/0}* i know... it's pretty sad"
              ]
            : [
                 '<30>{#p/napstablook}{#k/5}* um... you could ask my cousin about selling...',
                 '<30>{#k/0}* they live with undyne, i think'
              ],
      talk: (name: string) =>
         SAVE.data.n.plot === 72
            ? [ 'Say Hello', 'What Happened', name, 'The Future', 'Exit' ]
            : [
                 'Say Hello',
                 'Ghosts',
                 'Sanctuary',
                 65 <= SAVE.data.n.plot
                    ? SAVE.data.b.a_state_hapstablook && 68 <= SAVE.data.n.plot
                       ? 'Family'
                       : 'Your Life'
                    : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                    ? 'Mettaton'
                    : 60 <= SAVE.data.n.plot
                    ? 'Mew Mew Doll'
                    : 48 <= SAVE.data.n.plot
                    ? 'Travels'
                    : SAVE.data.b.napsta_performance
                    ? 'DJ Blooky?'
                    : SAVE.data.n.state_wastelands_napstablook === 0
                    ? 'Dapper Blook?'
                    : 'Your Life',
                 'Exit'
              ],
      talkPrompt: '<09>{#p/napstablook}{#k/1}oh, you wanna chat?',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/napstablook}{#k/3}* oh, hey...',
                    '<32>{#k/0}* i think everybody dissappeared for a while...',
                    '<32>{#k/1}* but when they woke up, they all knew your name...',
                    "<32>{#k/3}* so... you're frisk, huh?",
                    '<32>{#k/4}* well, nice to see you, frisk'
                 ]
               : SAVE.data.b.a_state_napstadecline
               ? [ '<32>{#p/napstablook}{#k/2}* uh...', '<32>{#p/napstablook}{#k/2}* hey there...' ]
               : SAVE.data.n.state_wastelands_napstablook < 2
               ? [
                    [
                       '<32>{#p/napstablook}{#k/3}* oh, hey...',
                       '<32>{#p/napstablook}{#k/3}* oh, nice to see you again...'
                    ][SAVE.data.n.state_wastelands_napstablook],
                    ...(world.meanie
                       ? [ "<32>{#k/0}* what's that look for?\n* have i done something wrong..." ]
                       : [ '<32>{#k/4}* what have you been up to?' ])
                 ]
               : SAVE.data.n.state_wastelands_napstablook < 5
               ? [
                    "<32>{#p/napstablook}{#k/0}* oh...\n* i'm not sure what to say, really...",
                    '<32>{#k/3}* uhh... hello, i guess?'
                 ]
               : [
                    '<32>{#p/napstablook}{#k/4}* heh...\n* hey...',
                    '<32>{#k/3}* say, are you new around here?',
                    "<32>{#k/5}* you don't look familiar..."
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/napstablook}{#k/2}* honestly, i don't really know what happened...",
                    "<32>{#k/2}* same goes for everyone in my family.\n* we didn't get pulled in like everyone else.",
                    '<32>{#k/1}* we did see a bright light, but when it came by... we just sort of rejected it',
                    "<32>{#k/0}* still, even though we didn't see it ourselves...",
                    "<32>{#k/3}* we've heard all about what you did for us.",
                    '<32>{#k/3}* so... thanks.'
                 ]
               : [
                    '<32>{#p/napstablook}{#k/2}* you wanna know about ghosts?',
                    '<32>{#k/0}* well, the only ghosts i know are myself, my three cousins...',
                    '<32>{#k/3}* and the one behind you, of course',
                    "<32>{#k/1}* aside from that, there's not much to say",
                    '<32>{#k/0}* without a fused host body, we just sorta... exist',
                    '<32>{#k/0}* yeah, i know...\n* very interesting stuff...'
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/napstablook}{#k/2}* ...',
                    "<32>{#k/2}* they're... still behind you, aren't they?",
                    '<32>{#k/0}* yeah... i can see them...',
                    ...(SAVE.data.b.oops
                       ? [
                            "<32>{#k/0}* they... don't like the fact that i'm pointing them out...",
                            '<32>{#k/0}* oh no...'
                         ]
                       : [
                            '<32>{#k/2}* they look... happy?',
                            '<32>{#k/4}* frisk, if you were able to make them feel this way...',
                            '<32>{#k/3}* then you really are special.'
                         ])
                 ]
               : [
                    '<32>{#p/napstablook}{#k/3}* oh yeah... that...',
                    '<32>{#k/1}* well, one day, i found this box lying around...',
                    "<32>{#k/5}* when i opened it, i ended up in this mysterious place i haven't seen before...",
                    '<32>{#k/4}* now and then, i like to visit that place to relax',
                    "<32>{#k/3}* it's peaceful..."
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    SAVE.data.b.a_state_hapstablook
                       ? '<32>{#p/napstablook}{#k/0}* well, after me and my cousins resolved everything...'
                       : "<32>{#p/napstablook}{#k/0}* well, since i didn't really have anything else to do...",
                    '<32>{#k/0}* i figured it was time to try something new for once.',
                    '<32>{#k/3}* i heard about the humans in the archive, and felt bad for them...',
                    '<32>{#k/3}* so... i adopted one.',
                    '<32>{#k/1}* i just hope i can take care of them properly now.'
                 ]
               : 65 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_hapstablook
                  ? 68 <= SAVE.data.n.plot
                     ? [
                          '<32>{#p/napstablook}{#k/3}* hey, mettaton came by a little while ago.',
                          "<32>{#k/0}* we talked for a bit about what we've been up to...",
                          '<32>{#k/0}* about the family...',
                          "<32>{#k/3}* well, i don't think i've ever been this happy before.",
                          '<32>{#k/3}* what you did for us back there... it means a lot.'
                       ]
                     : [
                          "<32>{#p/napstablook}{#k/0}* hey... sorry things didn't work out the way we hoped...",
                          '<32>{#k/3}* it was nice to have you there, though......'
                       ]
                  : [
                       '<32>{#p/napstablook}{#k/7}* with every day that goes by, i feel a little further away from happiness......'
                    ]
               : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
               ? [
                    "<32>{#k/7}* oh... you're probably wondering about the meeting",
                    "<32>{#k/7}* don't worry, it's still happening...",
                    '<32>{#k/7}* i just came back here to check on my shop......'
                 ]
               : 60 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_napstadecline
                  ? [
                       '<32>{#k/7}* ...',
                       "<32>{#k/7}* i don't... really wanna talk about that...",
                       ...(SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

                          ? [ "<32>{#k/2}* especially when it's right there in your ITEMs......" ]
                          : [])
                    ]
                  : [
                       '<32>{#k/1}* oh... yeah......',
                       '<32>{#k/3}* thanks for agreeing to help me with that',
                       "<32>{#k/2}* mettaton's been acting kinda weird lately......",
                       "<32>{#k/0}* i'm not surprised he did this",
                       '<32>{#k/4}* alphys first had me watch mew mew space adventure with her a while ago...',
                       '<32>{#k/3}* we marathonned the entire fourth season in one night...',
                       '<32>{#k/6}* that finale...',
                       '<32>{#k/6}* was something else......'
                    ]
               : 48 <= SAVE.data.n.plot
               ? [
                    '<32>{#k/1}* yeah... this is mostly where i hang out now',
                    ...[
                       [ '<32>{#k/0}* sorry for interrupting whatever you were doing with my cousin...' ],
                       [ '<32>{#k/0}* ...\n* have you seen my cousin?' ],
                       [ '<32>{#k/3}* i heard my cousin really likes you...' ],
                       [
                          "<32>{#k/5}* my cousin tells me you're not the most interesting person to be with...",
                          '<32>{#k/5}* i disagree......'
                       ],
                       [],
                       []
                    ][SAVE.data.n.state_wastelands_toriel === 0 ? 2 : SAVE.data.n.state_foundry_maddummy],
                    '<32>* ...',
                    "<32>{#f/1}* anyway\n* i hope you're doing alright out there...",
                    '<32>{#f/2}* past starton, things get a bit... crazy'
                 ]
               : SAVE.data.b.napsta_performance
               ? [
                    '<32>{#p/napstablook}{#k/1}* yeah, i make music sometimes',
                    "<32>{#k/0}* people say it's great, but i know they're just lying to make me feel better...",
                    '<32>{#k/4}* thanks for coming to my little show, though...',
                    '<32>{#k/3}* seeing you made me happy...'
                 ]
               : [
                    [
                       '<32>{#p/napstablook}{#k/2}* you mean... that little hat trick i showed you...?',
                       '<32>{#k/1}* yeah, my cousin taught me that...',
                       '<32>{#k/3}* he and i used to spend so much time together...',
                       '<32>{#k/0}* then one day, he...',
                       '<32>{#k/6}* ...',
                       '<32>{#k/0}* never mind...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       '<32>{#k/3}* meeting you was the highlight of my weekend...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       '<32>{#k/6}* and thanks to people like you, there probably never will be...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       "<32>{#k/3}* i'm just... pluggin' along..."
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       '<32>{#k/6}* not that you... really care...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       "<32>{#k/0}* i'm just a ghost that tends to get lost in the mix"
                    ]
                 ][SAVE.data.n.state_wastelands_napstablook]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },
   n_shop_hare: {
      exit: [ '<32>{#p/basic}{#k/11}* Bye now!\n* Come again sometime!' ],
      item: () =>
         world.population === 0 || world.runaway
            ? [
                 '0G - Power Glove?',
                 SAVE.data.b.item_eye ? '0G - Field Emitter?' : '0G - Field Emitter',
                 '0G - Vortex Pop',
                 '0G - Radiant Swirl',
                 'Exit'
              ]
            : SAVE.data.n.plot === 72
            ? [
                 '10G - Power Glove?',
                 SAVE.data.b.item_eye ? '10G - Field Emitter?' : '20G - Field Emitter',
                 '8G - Vortex Pop',
                 '5G - Radiant Swirl',
                 'Exit'
              ]
            : [
                 '30G - Power Glove?',
                 SAVE.data.b.item_eye ? '30G - Field Emitter?' : '40G - Field Emitter',
                 '28G - Vortex Pop',
                 '20G - Radiant Swirl',
                 'Exit'
              ],
      itemInfo: () => [
         "Weapon: 3AT\n($(x) AT)\nKnock 'em.\nReplicated.",
         SAVE.data.b.item_eye
            ? 'Armor: 5DF\n($(x) DF)\nProtection\nfor one.\nReplicated.'
            : 'Armor: 7DF\n($(x) DF)\nProtection\nfor one.',
         'Heals 11HP\nSlows your\nperception\nof time.',
         "Heals 22HP\nIt's her own\nrecipe."
      ],
      itemPrompt: '<09>{#p/basic}{#k/0}What would you like to buy?',
      itemPurchase: [
         '<09>{#p/basic}{#k/4}Thanks for your purchase.',
         '<09>{#p/basic}{#k/7}Just looking?',
         "<09>{#p/basic}{#k/5}That's not enough money.",
         "<10>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () => (world.population === 0 || world.runaway ? 'Take it?' : 'Buy it for\n$(x)G?'),
      menu: () =>
         world.population === 0 || world.runaway
            ? [ 'Take', 'Steal', 'Read', 'Exit' ]
            : [ 'Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit' ],
      menuPrompt1: '<23>{#p/basic}{#k/0}* Hello, traveler.\n* How can I help you?',
      menuPrompt2: '<23>{#p/basic}{#k/0}* Take your time.',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ... but everybody ran.' : '<23>{#p/basic}* ... but nobody came.',
      note: () =>
         world.runaway
            ? [ "<32>{#p/basic}* There's a note here.", '<32>{#p/basic}* \"Please don\'t come after us.\"' ]
            : SAVE.data.n.plot === 72
            ? [ "<32>{#p/basic}* There's a note here.", '<33>{#p/basic}* \"I\'m sorry I couldn\'t come back.\"' ]
            : [ "<32>{#p/basic}* There's a note here.", '<33>{#p/basic}* \"Please don\'t hurt my family.\"' ],
      sell1: () =>
         world.population === 0 || world.runaway
            ? [ '<30>{#p/human}* (You took 758G from behind the counter.)' ]
            : world.meanie
            ? [
                 "<30>{#p/basic}{#k/1}* Huh?\n* Is this what we're resortin' to now?",
                 "<30>{#k/2}* If you want somethin', you'll have to buy it first.",
                 '<30>{#k/12}* No exceptions.'
              ]
            : [
                 "<30>{#p/basic}{#k/6}* Huh?\n* Sell somethin'?\n* Does this look like a pawn shop?",
                 "<30>{#k/3}* I don't know how it works where you come from... but...",
                 "<30>* If I started spending money on old wrenches and used spacesuits, I'd be out of business in a jiffy!"
              ],
      sell2: () =>
         world.population === 0 || world.runaway
            ? [ '<30>{#p/basic}* Nothing left.' ]
            : world.meanie
            ? [ "<30>{#p/basic}{#k/8}* I don't know what your game is, but it's not going to work on me." ]
            : [
                 "<30>{#p/basic}{#k/8}* If you're really hurtin' for cash, then maybe you could do some crowdfunding.",
                 '<30>{#k/2}* I hear people will pay for ANYTHING nowadays.'
              ],
      talk: () =>
         SAVE.data.n.plot === 72
            ? [ 'Say Hello', 'What Happened', 'Outlands', 'The Future', 'Exit' ]
            : [ 'Say Hello', 'What To Do Here', 'Town History', 'Your Life', 'Exit' ],
      talkPrompt: '<09>{#p/basic}{#k/0}Care to chat?',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#k/4}* Oh, it's you!\n* You're the one who gave us back our freedom!",
                    "<32>{#k/0}* Frisk, right?\n* Everyone's been talking about you.",
                    "<32>{#k/5}* We've all seen the same thing... we know you must just want some peace and quiet.",
                    "<32>{#k/4}* Still.\n* Can't help but get a little excited, now can we?"
                 ]
               : [
                    "<32>{#p/basic}{#k/4}* Hiya! Welcome to Starton!\n* I can't remember the last time I saw a fresh face around here.",
                    '<32>{#k/8}* Where did you come from?\n* The Citadel?',
                    "<32>{#k/7}* You don't look like a tourist.\n* Are you here by yourself?"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#k/8}* You DO know what happened, don't you?",
                    "<32>{#k/9}* Then again, you might've seen things a bit differently...",
                    "<32>{#k/0}* Here.\n* I'll tell you what I saw.",
                    '<32>{#k/0}* So we all got pulled in by this bright light...',
                    "<32>{#k/7}* Then we saw it... like we were watching from someone else's eyes.",
                    "<32>{#k/5}* You were being attacked on all sides, and I could've sworn you died...",
                    "<32>{#k/11}* But you're still here, so that can't be right.",
                    '<32>{#k/8}* Eventually, you said something in particular, and whoever was attacking you... stopped.',
                    '<32>{#k/9}* After that, we woke up, and the force field was gone.'
                 ]
               : [
                    '<32>{#p/basic}{#k/8}* You want to know what to do here in Starton?',
                    "<32>{#k/9}* Grillby's has food, and the librarby has information...",
                    "<32>{#k/2}* If you're tired, you can take a nap at the inn.\n* It's right nextdoor, my sister runs it.",
                    "<32>{#k/0}* And if you're bored, you can sit outside and watch those wacky skeletons do their thing.",
                    "<32>* There's two of 'em...\n* Brothers, I think.\n* They've been here for as long as I can remember.",
                    '<32>{#k/9}* Oh, I almost forgot.\n* Recently, a ghost fella decided to open a store on the south side of town.',
                    "<32>{#k/11}* It's not much, but if you drop by, be sure to say hello.\n* They could use the company."
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#k/12}* Didja hear?\n* About the Outlands?',
                    '<32>{#k/2}* Apparently the Queen had been hanging out there for who knows how long.',
                    '<32>{#k/8}* Pretty unbelievable, huh!?',
                    "<32>{#k/10}* I'm sure she was even more surprised than we were to find out the humans were alive."
                 ]
               : [
                    '<32>{#p/basic}{#k/9}* Think back to your history class...',
                    '<32>{#k/0}* A long time ago, monsters lived in what we now call the Foundry.',
                    '<32>* After a while, we invented the technology to build new areas onto the outpost.',
                    "<32>* The first of those areas was Starton, and they figured it'd be a good place for a town.",
                    "<32>{#k/10}* It's quaint, but I kinda like that, you know?"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#k/5}* Well, I suppose I'll move my store to the new homeworld...",
                    "<32>{#k/4}* ... haven't planned much more than that, I'm afraid."
                 ]
               : [
                    '<32>{#p/basic}* Life is the same as usual.',
                    '<32>{#k/5}* A little lonely...',
                    "<32>{#k/10}* But... we all know deep down that freedom is coming, don't we?",
                    '<32>{#k/9}* As long as we got that hope, we can grit our teeth and face the same struggles, day after day...',
                    "<32>{#k/0}* That's life, ain't it?"
                 ]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },

   c_name_starton: {
      papyrus: () =>
         SAVE.data.n.plot_date < 2 || (SAVE.data.n.exp > 0 && SAVE.data.b.a_state_fishbetray)
            ? "Papyrus's Phone"
            : 'Papyrus and Undyne'
   },

   c_call_papyrus: <Partial<CosmosKeyed<CosmosProvider<string[]>>>>{
      s_start: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}AH, THAT LONELY ROAD AT THE EDGE OF STARTON.',
            '<18>{#p/papyrus}{#f/5}IT MIGHT SEEM A LITTLE LARGE AND EMPTY, BUT...',
            '<18>{#p/papyrus}{#f/0}I HAVE MANY FOND MEMORIES OF IT!',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}FOR EXAMPLE, BACK WHEN WE WERE BABY BONES...',
                    '<18>{#p/papyrus}{#f/0}SANS AND I WOULD RACE OUR HOVERCARS SIDE BY SIDE.'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* Like what?',
                    '<18>{#p/papyrus}{#f/0}LIKE THE WAY SANS AND I USED TO RACE OUR HOVERCARS!',
                    "<18>{#p/papyrus}{#f/5}WE'D FLY DOWN THE ROAD, RACING SIDE BY SIDE..."
                 ]),
            '<18>{#p/papyrus}{#f/4}UNFORTUNATELY, NO MATTER HOW HARD I TRIED...',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/7}HE WOULD ALWAYS BE WAITING AT THE FINISH LINE!',
                    '<18>{#p/papyrus}{#f/5}YOU CAN IMAGINE MY FRUSTRATION.'
                 ]
               : [
                    '<25>{#p/undyne}{#f/17}* He always beat you to the end?',
                    "<25>{#p/undyne}{#f/4}* Yeah, that's 'cause he's a big fat CHEATER.",
                    '<25>{#p/undyne}{#f/5}* Have you SEEN his high score on the target practice machine?',
                    "<25>{#p/undyne}{#f/8}* It's like, a GAZILLION or something!!",
                    '<18>{#p/papyrus}{#f/4}OH, TRUST ME.\nI KNOW IT ALL TOO WELL.',
                    "<18>{#p/papyrus}{#f/7}I REALLY WISH HE WOULDN'T CHEAT ON THINGS LIKE THAT!",
                    '<18>{#p/papyrus}{#f/7}IT RUINS THE GAME FOR EVERYONE ELSE.',
                    '<25>{#p/undyne}{#f/1}* Or maybe...',
                    '<25>{#p/undyne}{#f/8}* It just provides a more interesting challenge!!',
                    '<18>{#p/papyrus}{#f/4}... NO.'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/5}SANS HAS... ALWAYS BEEN ONE TO TAKE SHORTCUTS.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/4}I SUSPECT THAT PLAYED A PART IN HIS VICTORIES.' ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S PRACTICALLY A LAW OF NATURE AT THIS POINT." ])
         ]
      ),
      s_sans: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}AND THIS HERE IS SANS'S SENTRY STATION.",
            '<18>{#p/papyrus}{#f/5}...',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}I HEARD HIM TALKING THE OTHER DAY...',
                    '<18>{#p/papyrus}{#f/6}... ABOUT HELPING SOMEONE AVOID THE OTHER GUARDS.',
                    "<18>{#p/papyrus}{#f/5}I CAN'T BE SURE, BUT FROM HOW IT SOUNDS...",
                    "<18>{#p/papyrus}{#f/5}THERE'S... A CHANCE MY BROTHER MIGHT BE A MOLE.",
                    '<18>{#p/papyrus}{#f/4}...',
                    '<18>{#p/papyrus}{#f/4}... OR WOULD THAT BE CALLED A RAT?'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/5}... WHAT MORE CAN I SAY?',
                    "<25>{#p/undyne}{#f/17}* Papyrus, don't you ever look... well, up?",
                    '<18>{#p/papyrus}{#f/6}WHAT!?',
                    "<18>{#p/papyrus}{#f/7}YOU KNOW I DON'T HAVE TIME FOR THAT!",
                    "<25>{#p/undyne}{#f/1}* But you're not even trying to capture anybody.",
                    '<18>{#p/papyrus}{#f/6}S-SURE I AM!\nJUST... NOT WHO YOU THINK!!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}WAIT...',
                    '<18>{#p/papyrus}{#f/1}... HAS MY BROTHER BEEN A MOLE-RAT THIS WHOLE TIME!?'
                 ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S SOMEONE... RECTANGULAR." ]
      ),
      s_crossroads: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}RECENTLY, PEOPLE HAVE BEEN LEAVING NOTES OUTSIDE.',
            '<18>DREAMS, WISHES, OFFERS OF ROMANCE...',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/9}PERSONALLY, I THINK IT'S EXCELLENT!",
                    "<18>{#p/papyrus}{#f/0}IT'S GREAT TO SEE PEOPLE MAKING AN EFFORT.",
                    '<18>{#p/papyrus}{#f/4}AS FOR MY BROTHER, WELL...',
                    "<18>{#p/papyrus}{#f/4}HE THINKS THEY'RE ALL JUST BEING LUNAR-TICKS."
                 ]
               : [
                    '<18>...',
                    "<18>WHAT'S -THAT- LOOK FOR, UNDYNE?",
                    '<25>{#p/undyne}{#f/3}* ... did you see any, uh...',
                    '<18>{#p/papyrus}{#f/0}... SEE ANY WHAT?',
                    '<25>{#p/undyne}{#f/15}* ... scientific notes?',
                    '<18>{#p/papyrus}{#f/0}OH.',
                    '<18>{#p/papyrus}{#f/0}... NO.',
                    '<25>{#p/undyne}{#f/1}* Darn it!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}I WONDER WHAT LIFE WOULD BE LIKE WITH A MOON IN ORBIT.' ]
               : [ "<18>{#p/papyrus}DON'T YOU HAVE ANY HOPES AND DREAMS TO SHARE?" ]
      ),
      s_human: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}ABOUT THAT GRAND SPEECH OF MINE...',
            '<18>{#p/papyrus}{#f/0}COINCIDENTALLY, I FIRST PRACTICED IT IN THIS VERY ROOM.',
            '<18>{#p/papyrus}{#f/9}AND WITH SANS, NO LESS!',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}BUT WE ARGUED ABOUT WHICH WAY WE SHOULD STAND.' ]
               : [
                    "<25>{#p/undyne}{#f/14}* I'm sure you had no arguments whatsoever.",
                    '<18>{#p/papyrus}{#f/0}OH, ON THE CONTRARY.',
                    '<18>{#p/papyrus}{#f/0}WE ARGUED CONSTANTLY WITH EACH OTHER!'
                 ]),
            "<18>{#p/papyrus}{#f/4}I'D ROTATE ONE WAY, AND SAY THAT WAS BETTER...",
            "<18>{#p/papyrus}{#f/4}THEN HE'D TURN, AND SAY HIS WAY WAS BEST.",
            '<18>{#p/papyrus}{#f/6}AS WE ARGUED, WE EACH ROTATED FASTER AND FASTER.',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}IT'S SINCE BECOME A RITUAL FOR US." ]
               : [
                    '<25>{#p/undyne}{#f/1}* ... that explains what I saw outside my house earlier.',
                    '<18>{#p/papyrus}{#f/1}YOU SAW THAT!?',
                    '<18>{#p/papyrus}{#f/6}UH, WAIT, I CAN EXPLAIN...',
                    '<18>{#p/papyrus}{#f/5}I MEAN, SANS WAS JUST WORRIED ABOUT... UH...',
                    "<18>{#p/papyrus}{#f/6}... WORRIED THAT I'M SPENDING TOO MUCH TIME THERE!",
                    '<18>{#p/papyrus}{#f/6}YEAH!!',
                    "<25>{#p/undyne}{#f/16}* ... he's your brother, isn't he?",
                    "<25>{#p/undyne}{#f/1}* He might've just wanted you to spend more time with him."
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}FUN FACT.',
                    '<18>{#p/papyrus}{#f/0}IF YOU TOTAL UP OUR ROTATION SPEED...',
                    "<18>{#p/papyrus}{#f/0}IT'D ACTUALLY COME OUT TO ZERO.",
                    '<18>{#p/papyrus}{#f/4}... WE ALWAYS SPIN IN THE OPPOSITE DIRECTION.'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}FAMILY TIME IS IMPORTANT, AFTER ALL.',
                    '<18>{#p/papyrus}{#f/9}SOMETIMES, IT EVEN NECESSITATES USING FLIGHT MAGIC!'
                 ]
      ),
      s_papyrus: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}NYEH HEH HEH!!\nIMPRESSED!?!',
            '<18>{#p/papyrus}{#f/0}NOT ONLY AM I GREAT AT PUZZLES...',
            "<18>{#p/papyrus}{#f/9}I'M ALSO AN ESTEEMED ARCHITECT!!!",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}I PLAN TO BUILD MORE WHEN I JOIN THE ROYAL GUARD.' ]
               : [
                    '<25>{#p/undyne}{#f/1}* Y\'know, I WAS thinking of renovating your \"sentry station...\"',
                    '<25>{#p/undyne}{#f/14}* Like... a surprise gift!',
                    '<18>{#p/papyrus}{#f/4}YOU WHAT?',
                    "<25>{#p/undyne}{#f/12}* But, uh, that'd be messing with perfection.",
                    '<18>{#p/papyrus}{#f/5}PERFECTION, YOU SAY?',
                    '<18>{#p/papyrus}{#f/6}BUT YOU ONCE SAID THINGS CAN ALWAYS BE IMPROVED!',
                    '<25>{|}{#p/undyne}{#f/17}* Well... yes!\n* I just meant that- {%}',
                    '<18>{#p/papyrus}ALMOST-PERFECTION.\nHOW ABOUT WE JUST CALL IT THAT.',
                    '<25>{#p/undyne}{#f/12}* That works.'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}I'M HOPING SANS CAN HELP ME FIND BETTER MATERIALS.",
                    '<18>{#p/papyrus}{#f/6}BOXES CAN ONLY TAKE YOU SO FAR!!'
                 ]
               : [ '<18>{#p/papyrus}THANK YOU, HUMAN...', '<18>FOR BEING MY ALMOST-PERFECT FRIEND.' ]
      ),
      s_doggo: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF DOGGO...',
            '<18>{#p/papyrus}{#f/5}ONE DAY, AFTER AN INCIDENT WITH THE OTHER DOGS...',
            "<18>{#p/papyrus}{#f/5}HE TOLD ME HE DIDN'T FEEL AT HOME ANYMORE.",
            '<18>{#p/papyrus}{#f/0}SO I GAVE HIM A HUG, AND TOLD HIM TO TALK IT OUT.',
            '<18>{#p/papyrus}{#f/4}OF COURSE, THE CANINE UNIT ARE A REASONABLE BUNCH.',
            "<18>{#p/papyrus}{#f/0}IT'S NO SURPRISE THINGS TURNED OUT JUST FINE!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* Oh yeah, I remember that incident...',
                    '<25>{#p/undyne}{#f/22}* He, uh...\n* He was thinking of...',
                    '<18>{#p/papyrus}{#f/5}THINKING OF...?',
                    '<25>{#p/undyne}{#f/9}* ... thanks for being there when you were.',
                    "<25>{#p/undyne}{#f/16}* Without you, he might've actually...",
                    '<18>{#p/papyrus}{#f/6}WHAT?\nWHAT IS IT??',
                    '<25>{#p/undyne}{#f/12}* ... uh, he would have quit the guard for a really long time.',
                    '<18>{#p/papyrus}{#f/0}OH, OKAY.',
                    '<18>{#p/papyrus}{#f/5}I GUESS THAT WOULD BE PRETTY BAD...'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}KINDNESS REALLY -IS- A VIRTUE!' ]
               : [ '<18>{#p/papyrus}{#f/9}NO DOG LEAVES THE ROYAL GUARD UNDER MY WATCH!' ]
      ),
      s_robot: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}LIFE AS A BUILDER BOT MUST BE TOUGH.',
            '<18>{#p/papyrus}{#f/5}BE NICE TO THOSE WHOSE INTELLIGENCE IS ARTIFICIAL.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* Yeah... especially as a robot living on the outpost these days.',
                    '<25>{#p/undyne}{#f/9}* I think we both know why that is.',
                    '<18>{#p/papyrus}{#f/5}UNFORTUNATELY.',
                    "<25>{#p/undyne}{#f/17}* But hey!\n* It's not all bad!!",
                    '<25>{#p/undyne}{#f/14}* After all, their chip could just be moved to a new computer.',
                    '<18>{#p/papyrus}{#f/0}OH! OH!\nI THINK I GET IT!',
                    "<18>{#p/papyrus}{#f/0}THEN THEY'D BE ABLE TO ACCESS THE OUTERNET!",
                    '<18>{#p/papyrus}{#f/0}AND THE TELESCOPE NETWORK!',
                    '<18>{#p/papyrus}{#f/0}AND SO MUCH MORE!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}YOU NEVER KNOW HOW LONG THEY'VE BEEN ALONE!!" ]
               : [
                    "<18>{#p/papyrus}{#f/0}I WONDER IF THEY'D BE ABLE TO SEE MY BROWSER HISTORY.",
                    '<18>{#p/papyrus}{#f/4}ALL THOSE RAW PASTA PHOTOS...'
                 ]
      ),
      s_maze: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}YES, YES, I KNOW MY PUZZLES CAN BE DIFFICULT...',
            ...(SAVE.data.b.papyrus_fire
               ? [
                    '<18>{#p/papyrus}{#f/9}BUT JUST THINK OF IT LIKE A LEARNING EXPERIENCE!',
                    '<18>{#p/papyrus}{#f/0}A TEST OF CHARACTER RATHER THAN SKILL.',
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/1}* Huh?\n* What happened?',
                            "<18>{#p/papyrus}{#f/5}THE HUMAN DIDN'T DO SO WELL ON THE WALL OF FIRE.",
                            '<25>{#p/undyne}{#f/10}* Ah...',
                            "<25>{#p/undyne}{#f/8}* So you're telling me they didn't just fly over it!?",
                            '<18>{#p/papyrus}{#f/6}HUMANS CAN FLY??',
                            '<25>{#p/undyne}{#f/17}* ...',
                            "<25>{#p/undyne}{#f/17}* So you're telling me they didn't just walk around it!?",
                            '<18>{#p/papyrus}{#f/6}UHHH...'
                         ])
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}BUT YOU, MY FRIEND, ARE QUITE THE PUZZLIST!',
                    "<18>{#p/papyrus}{#f/9}IT'S NOT EVERY DAY SOMEONE TROUSLES THIS BONE.",
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/1}* Huh?\n* What happened?',
                            '<18>{#p/papyrus}{#f/0}THE HUMAN BEAT MY INFAMOUS \"WALL OF FIRE\" EARLIER!',
                            '<25>{#p/undyne}{#f/8}* Let me guess!\n* They walked around it!!',
                            '<18>{#p/papyrus}{#f/4}NO, ACTUALLY.\nTHEY CLEVERLY WALKED THROUGH IT.',
                            '<25>{#p/undyne}{#f/1}* ... oh.',
                            '<25>{#p/undyne}{#f/14}* My next guess was going to be that they flew over it.',
                            '<18>{#p/papyrus}{#f/0}NOPE!\nJUST PRACTICE AND PERSEVERANCE!',
                            "<18>{#p/papyrus}{#f/5}THOUGH, I'M NOT SURE HOW THEY GOT THEIR PRACTICE...",
                            '<18>{#p/papyrus}{#f/4}CONSIDERING THAT WAS DEFINITELY THEIR FIRST TRY.',
                            ...(SAVE.data.b.undyne_respecc
                               ? [
                                    "<25>{#p/undyne}{#f/1}* Heh.\n* They've shown to have a taste for challenge.",
                                    "<25>{#p/undyne}{#f/12}* I'm not surprised they beat it so easily!"
                                 ]
                               : [
                                    '<25>{#p/undyne}{#f/17}* What?\n* Practice?\n* Screw that!!',
                                    '<25>{#p/undyne}{#f/7}* GIVE ME YOUR SECRETS NOW, PUNK!!!',
                                    '<18>{#p/papyrus}{#f/6}NO, LET THE PUZZLIST PUZZLE IN PEACE!'
                                 ])
                         ])
                 ])
         ],
         () =>
            SAVE.data.b.papyrus_fire
               ? solo()
                  ? [
                       '<18>{#p/papyrus}{#f/0}A PUZZLE A DAY KEEPS THE \"BRAIN ROT\" AWAY!',
                       '<18>{#p/papyrus}{#f/4}OR SO THEY SAY.'
                    ]
                  : [
                       "<18>{#p/papyrus}{#f/4}FOR THE RECORD, YOU CAN'T ACTUALLY WALK AROUND IT.",
                       "<18>{#p/papyrus}{#f/0}HOPEFULLY YOU DIDN'T TRY TO DO THAT JUST NOW."
                    ]
               : solo()
               ? [ '<18>{#p/papyrus}{#f/6}ON YOUR FIRST TRY, NO LESS!!!' ]
               : SAVE.data.b.undyne_respecc
               ? [
                    '<18>{#p/papyrus}{#f/5}PERHAPS THE FIRE ITSELF WAS INTIMIDATED...',
                    '<18>{#p/papyrus}{#f/4}BY YOUR DUBIOUSLY STRONG PRESENCE.'
                 ]
               : [ '<18>{#p/papyrus}{#f/5}IF ONLY WE -ALL- HAD YOUR PIECE OF THE PUZZLE.' ]
      ),
      s_dogs: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF DOGAMY AND DOGARESSA...',
            '<18>{#p/papyrus}{#f/0}SOMETIMES I WONDER WHAT MARRYING DOGS MUST FEEL LIKE.',
            "<18>{#p/papyrus}{#f/4}THOUGH, I'LL NEVER HAVE TO KNOW, BECAUSE...",
            "<18>{#p/papyrus}{#f/9}THE ONLY THING I'D MARRY IS A VERY HANDSOME SKELETON!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* So... yourself, then.',
                    "<18>{#p/papyrus}{#f/6}HUH?\nWHERE'D YOU GET THAT IDEA??",
                    "<25>{#p/undyne}{#f/12}* Isn't it obvious?\n* Who ELSE is as handsome as you are?",
                    '<18>{#p/papyrus}{#f/4}WELL, I SUPPOSE I DO HAVE A VERY DASHING LOOK...',
                    "<18>{#p/papyrus}{#f/0}BUT NONETHELESS, IT SIMPLY WASN'T MEANT TO BE!"
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/6}WHAT!?!?\nWE CAN'T MARRY!!",
                    ...(SAVE.data.b.flirt_papyrus
                       ? [ "<18>{#p/papyrus}{#f/0}WE AGREED THAT IT WOULDN'T WORK OUT, REMEMBER?" ]
                       : [
                            "<18>{#p/papyrus}{#f/0}WE'RE ALREADY VERY COOL FRIENDS!",
                            '<18>{#p/papyrus}{#f/5}AND IF I MARRIED YOU, WELL...',
                            "<18>{#p/papyrus}{#f/6}I WOULDN'T GET TO HAVE YOU AS A FRIEND ANYMORE!"
                         ])
                 ]
               : [ '<18>{#p/papyrus}{#f/4}SUCH A PAIRING WOULD BE... TOO POWERFUL.' ]
      ),
      s_lesser: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THIS ROOM USED TO BE CONNECTED WITH A BRIDGE.',
            '<18>{#p/papyrus}{#f/4}TWO HALVES, JOINED AT THE CENTERPOINT...',
            '<18>{#p/papyrus}{#f/9}LIKE THE SOULS OF TWO VERY INTREPID SKELETONS!',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}...',
                    "<18>{#p/papyrus}{#f/5}I DON'T KNOW EXACTLY WHAT SANS IS THINKING NOW...",
                    "<18>{#p/papyrus}{#f/4}BUT I'D IMAGINE IT HAS A LOT TO DO WITH CONDIMENTS.",
                    "<18>{#p/papyrus}{#f/5}IF ONLY HE'D STOP OBSESSING OVER THEM...",
                    '<18>{#p/papyrus}{#f/7}THEN, I WOULDN\'T HAVE TO \"YAMOK\" HIM FOR IT!!'
                 ]
               : [
                    "<25>{#p/undyne}{#f/1}* Oh yeah, aren't you guys linked or something?",
                    '<18>{#p/papyrus}{#f/0}FOR AS LONG AS WE CAN REMEMBER!',
                    '<25>{#p/undyne}{#f/14}* That kind of reminds me of those old stories...',
                    '<25>{#p/undyne}{#f/17}* ... of a skeleton who once experimented on himself.',
                    '<25>{#p/undyne}{#f/8}* For all we know, YOU and your brother could have been involved!!',
                    '<18>{#p/papyrus}{#f/1}ME, UNKNOWINGLY PART OF AN EXPERIMENT!?',
                    "<18>{#p/papyrus}{#f/7}THAT'S PREPOSTEROUS!",
                    '<25>{#p/undyne}{#f/15}* ... you never know...'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}I WISH I HAD MORE TO SAY...',
                    "<18>{#p/papyrus}{#f/4}BUT I CAN'T STOP THINKING ABOUT CONDIMENTS."
                 ]
               : [
                    "<18>{#p/papyrus}{#f/0}WELL, NOW I'M REALLY CURIOUS ABOUT MY PAST.",
                    "<18>{#p/papyrus}{#f/9}NOTHING A LITTLE RESEARCH CAN'T HELP WITH!",
                    "<25>{#p/undyne}{#f/14}* If you'd like, I could give you a hand...",
                    "<18>{#p/papyrus}{#f/5}NO, IT'S ALRIGHT.\nBESIDES, AS THE GUARD CAPTAIN...",
                    '<18>{#p/papyrus}{#f/4}YOU ALREADY HAVE WAY TOO MUCH ON YOUR PLATE.'
                 ]
      ),
      s_bros: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}THOSE SPOT-THE- DIFFERENCE PUZZLES SANS LIKES...',
            '<18>{#p/papyrus}{#f/5}WELL, THE ONES I USED TO SOLVE WERE STRAIGHTFORWARD.',
            "<18>{#p/papyrus}{#f/7}BUT LATELY, THEY'VE BECOME NIGH IMPOSSIBLE!",
            '<18>{#p/papyrus}{#f/4}SHORT OF SCANNING THE IMAGE PIXEL FOR PIXEL...',
            "<18>{#p/papyrus}{#f/7}THERE'S NO WAY ANYONE COULD SOLVE THEM!",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/7}IT'S RIDICULOUS!" ]
               : [
                    '<25>{#p/undyne}{#f/1}* That puzzle artist in the librarby makes them, I think.',
                    "<25>{#p/undyne}{#f/11}* ... something tells me she's really bored with her job.",
                    "<18>{#p/papyrus}{#f/4}NOW THERE'S A PUZZLE...",
                    '<18>{#p/papyrus}{#f/0}I\'LL JUST HAVE TO GO OVER THERE AND \"SOLVE\" IT!',
                    '<25>{#p/undyne}{#f/12}* Or maybe you could create your own...?',
                    '<18>{#p/papyrus}{#f/9}MAYBE I COULD!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}ARE YOU ASKING FOR MY HELP?',
                    '<18>{#p/papyrus}{#f/7}WELL, FORGET IT!',
                    "<18>{#p/papyrus}{#f/0}UNFAIR PUZZLES AREN'T WORTH SOLVING, ANYWAY."
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* Any time I get stuck on these things, I just send them to Alphys.',
                    "<25>{#p/undyne}{#f/14}* She's got some fancy image subtraction thing or whatever.",
                    '<18>{#p/papyrus}{#f/0}SUBTRACTION, HUH?',
                    '<18>{#p/papyrus}{#f/4}... WOULDN\'T THE MORE ACCURATE TERM BE \"COMPARISON?\"',
                    '<25>{#p/undyne}{#f/8}* Well, it sure does subtract from the headache!'
                 ]
      ),
      s_spaghetti: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}SOME SAY THE MICROWAVE IN THAT ROOM...',
            '<18>{#p/papyrus}{#f/0}HAS A SO-CALLED \"HIDDEN FUNCTION.\"',
            '<18>{#p/papyrus}{#f/5}THAT, UNBEKNOWNST TO MOST...',
            '<18>{#p/papyrus}{#f/4}ITS \"MICRO\" WAVES ARE IN FACT... GRAVITATIONAL.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* And here I thought my \"hot fridge\" was a big subversion.',
                    '<25>{#p/undyne}{#f/8}* But this \"gravitational wave\" takes the cake!',
                    '<25>{#p/undyne}{#f/11}* ... or would that be spaghetti?',
                    '<18>{#p/papyrus}ONLY IF IT WAS USED TO LIFT SUCH A DELIGHTFUL DISH.',
                    '<18>{#p/papyrus}{#f/6}BUT, WAIT!!\nIF THE GRAVITY WAS TOO STRONG...',
                    "<18>{#p/papyrus}{#f/6}IT'D TURN INTO A FLYING SPAGHETTI MONSTER!",
                    "<25>{#p/undyne}{#f/14}* ... now there's a religion I could believe in."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}IF ONLY THERE WAS A WAY TO TURN IT OFF.' ]
               : [
                    '<18>{#p/papyrus}{#f/5}WHEN IT COMES TO SPAGHETTI MONSTERS...',
                    '<18>{#p/papyrus}{#f/0}I PREFER MINE TO STAY PERFECTLY STILL.',
                    '<18>{#p/papyrus}{#f/0}SITTING PRETTY, AS A TESTAMENT TO GREAT COOKING...',
                    '<18>{#p/papyrus}{#f/4}ON THE PLATE FROM WHICH THEY ARE TO BE DEVOURED.'
                 ]
      ),
      s_puzzle1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}HMMM... THE SOLUTION TO THIS ONE...?',
            '<18>{#p/papyrus}{#f/5}WELL, SOMETIMES I JUST STEP OVER THE LASERS.',
            '<18>{#p/papyrus}{#f/0}SO, ONE SOLUTION IS TO BE TALL AND HANDSOME!',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}... DEFINITELY DON'T DO THIS IF YOU'RE TOO SMALL." ]
               : [
                    '<25>{#p/undyne}{#f/8}* And another one is to fly over it with your jetpack!!',
                    "<18>{#p/papyrus}{#f/4}JETPACKS AREN'T THE SOLUTION TO EVERYTHING.",
                    '<18>{#p/papyrus}{#f/7}WHATEVER HAPPENED TO APPRECIATING THE SCENERY?',
                    '<25>{#p/undyne}{#f/16}* ...',
                    '<25>{#p/undyne}{#f/16}* I\'ve been \"appreciating the scenery\" all my life, Papyrus.',
                    "<25>{#p/undyne}{#f/17}* Don't you ever get tired of that!?",
                    '<18>{#p/papyrus}{#f/6}NOT REALLY!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}I'M SOLVING IT AS WE SPEAK..." ]
               : [
                    '<18>{#p/papyrus}{#f/5}HMM...',
                    '<18>{#p/papyrus}{#f/0}UNDYNE SHOULD PROBABLY INVEST IN A TELESCOPE.',
                    '<18>{#p/papyrus}{#f/4}I HEARD MY BROTHER WAS OFFERING MEMBERSHIPS...'
                 ]
      ),
      s_puzzle2: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}I'VE BEEN TOLD THERE'S A TRICK TO THESE PUZZLES...",
            "<18>{#p/papyrus}{#f/5}INVOLVING WHAT'S DISPLAYED ON THE TILES.",
            '<18>{#p/papyrus}{#f/6}... AND HERE I THOUGHT IT WAS A GUESSING GAME!',
            '<18>{#p/papyrus}{#f/0}I GUESS YOU LEARN SOMETHING NEW EVERY DAY.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* Did you hear about the mandate Asgore put out recently?',
                    '<25>{#p/undyne}{#f/16}* Apparently, lasers are \"dangerous\" and \"hazardous\" to kids.',
                    '<18>{#p/papyrus}{#f/6}WELL, HE DOES HAVE A POINT...',
                    '<25>{#p/undyne}{#f/4}* Man!\n* Way to take the fun out of everything!',
                    '<25>{#p/undyne}{#f/12}* I, uh, used to play with those things all the time as a kid.',
                    '<18>{#p/papyrus}{#f/0}... AH.',
                    '<18>{#p/papyrus}{#f/4}OF COURSE YOU\'D FIND RISKING YOUR LIFE \"FUN.\"',
                    "<25>{#p/undyne}{#f/14}* Who wouldn't!?!?",
                    '<18>{#p/papyrus}{#f/6}UM... ME???'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}WAIT, THAT'S MY BROTHER'S LINE..." ]
               : [
                    "<18>{#p/papyrus}{#f/4}IT'S ONE THING TO RISK YOUR LIFE...",
                    '<18>{#p/papyrus}{#f/7}AND ANOTHER TO NEEDLESSLY THROW IT AWAY!'
                 ]
      ),
      s_jenga: pager.create(
         0,
         () =>
            SAVE.data.b.s_state_puzzlenote
               ? [
                    '<18>{#p/papyrus}{#f/5}THIS PUZZLE, EH?',
                    '<18>{#p/papyrus}{#f/5}A PUZZLE WHOSE OUTCOME WE MAY NEVER KNOW NOW.',
                    '<18>{#p/papyrus}{#f/4}IN FACT, THE ONLY THING I DO NOW KNOW...',
                    '<18>{#p/papyrus}{#f/5}IS THAT, BY NOW, WE BOTH NO LONGER KNOW HOW!',
                    ...(solo()
                       ? [ '<18>{#p/papyrus}{#f/6}WOW!!!' ]
                       : [
                            '<25>{#p/undyne}{#f/1}* Talk about a tongue-twister.',
                            "<18>{#p/papyrus}{#f/7}WHAT!?\nSKELETONS DON'T EVEN HAVE TONGUES!",
                            '<25>{#p/undyne}{#f/17}* Well, OBVIOUSLY.',
                            "<25>{#p/undyne}{#f/16}* It's... just a figure of speech.",
                            "<18>{#p/papyrus}{#f/4}HMM... TO THINK A SKELETON CAN'T HAVE A TONGUE...",
                            '<18>{#p/papyrus}{#f/5}WHILE A LITTLE YELLOW STAR CAN.',
                            '<25>{#p/undyne}{#f/12}* What are you even talking about?',
                            '<18>{#p/papyrus}{#f/6}... NEVER MIND!!!'
                         ])
                 ]
               : [
                    "<18>{#p/papyrus}{#f/5}AT FIRST, THIS PUZZLE'S OUTCOME DISAPPOINTED ME...",
                    '<18>{#p/papyrus}{#f/4}BUT THEN, I REALIZED...',
                    '<18>{#p/papyrus}{#f/0}THE CHANCES OF WHAT HAPPENED WERE SO LOW...',
                    '<18>{#p/papyrus}{#f/9}... THAT WE MAY BE THE ONLY ONES TO EVER SEE IT!!',
                    '<18>{#p/papyrus}{#f/0}HOW LUCKY YOU MUST FEEL RIGHT NOW.',
                    ...(solo()
                       ? []
                       : [
                            "<25>{#p/undyne}{#f/12}* Don't you get it?",
                            '<18>{#p/papyrus}{#f/0}GET WHAT?',
                            "<25>{#p/undyne}{#f/1}* I've been told there's a term for this sort of thing.",
                            '<25>{#p/undyne}{#f/1}* The \"jenga joke.\"',
                            '<25>{#p/undyne}{#f/14}* All those complicated rules, not to mention the wind-up...',
                            '<25>{#p/undyne}{#f/12}* Only to result in a big fat zero.',
                            "<18>{#p/papyrus}{#f/0}I DON'T KNOW WHAT YOU'RE TALKING ABOUT, BUT...",
                            '<18>{#p/papyrus}{#f/7}... HEY, HOW DO -YOU- KNOW WHAT HAPPENED HERE?',
                            "<25>{#p/undyne}{#f/15}* Well... I might've swung by the lab earlier, and...",
                            '<18>{#p/papyrus}{#f/7}YOU WERE SPYING ON ME!?',
                            '<25>{#p/undyne}{#f/8}* Not you, Papyrus!!',
                            '<18>{#p/papyrus}{#f/4}OH.',
                            '<18>{#p/papyrus}{#f/7}... SO YOU WERE SPYING ON THE HUMAN!?!?',
                            "<25>{#p/undyne}{#f/17}* I'm the captain of the Royal Guard!!\n* What do you think!"
                         ])
                 ],
         () =>
            solo()
               ? SAVE.data.b.s_state_puzzlenote
                  ? [ '<18>{#p/papyrus}{#f/5}OH, HOW MUCH WE DO NOT YET OR NO LONGER KNOW...' ]
                  : [ '<18>{#p/papyrus}LUCK IS ON OUR SIDE TODAY, HUMAN!' ]
               : SAVE.data.b.s_state_puzzlenote
               ? [ '<18>{#p/papyrus}{#f/5}MONSTER BIOLOGY IS WEIRD.' ]
               : [ '<18>{#p/papyrus}JOKE OR NOT, IT WAS STILL PRETTY LUCKY, HUH?' ]
      ),
      s_pacing: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF CANIS MINOR.',
            '<18>{#p/papyrus}{#f/4}ALSO THE FAVORED SPOT OF THOSE MOON ROCK SALESFOLK.',
            '<18>{#p/papyrus}{#f/5}HMM... I WONDER WHAT THESE ROCKS ARE MADE OF.',
            "<18>{#p/papyrus}{#f/4}THEY CAN'T BE MADE OF MOONS, BECAUSE...",
            '<18>{#p/papyrus}{#f/7}MOONS ARE JUST BIG ROCKS ANYWAY!',
            '<18>{#p/papyrus}{#f/5}DOES THAT MEAN MOONS ARE MOON ROCKS THEMSELVES?',
            '<18>{#p/papyrus}{#f/5}WHERE DOES \"MOON\" END AND \"MOON ROCK\" BEGIN?',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* I don't think there's any right answer to that, Papyrus.",
                    "<25>{#p/undyne}{#f/7}* ... not that you shouldn't think about it!!",
                    '<25>{#p/undyne}{#f/1}* Questions like that are great for exercising the brain!',
                    '<25>{#p/undyne}{#f/14}* Also known as the most important muscle in the body.',
                    '<18>{#p/papyrus}{#f/4}FOR A HUMAN, PERHAPS...',
                    "<18>{#p/papyrus}{#f/7}BUT FOR A MONSTER, IT'S ENTIRELY DIFFERENT!",
                    '<25>{|}{#p/undyne}{#f/12}* I know, I was just trying to make it easy for them to- {%}',
                    "<18>{#p/papyrus}{#f/0}YOU SEE, MONSTERS DON'T REALLY USE BRAINS TO THINK.",
                    "<18>{#p/papyrus}{#f/4}IT'S MORE LIKE... A SOUL THING.",
                    '<25>{#p/undyne}{#f/1}* As opposed to a SKULL thing.',
                    '<18>{#p/papyrus}{#f/7}OH MY GOD!!!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}PERHAPS US MORTALS ARE NOT WORTHY OF SUCH KNOWLEDGE.' ]
               : [ '<25>{#p/undyne}{#f/12}* Just call me \"pundyne.\"', "<18>{#p/papyrus}{#f/0}PLEASE DON'T." ]
      ),
      s_puzzle3: pager.create(
         0,
         [
            '<18>{#p/papyrus}{#f/5}SO...\nWHAT HAPPENED HERE, IS...',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/4}LET'S NOT TALK ABOUT THIS PUZZLE."
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}...' ]
               : [
                    "<25>{#p/undyne}{#f/12}* ... it can't be that bad, right?",
                    '<18>{#p/papyrus}{#f/5}TRUST ME.',
                    '<18>{#p/papyrus}{#f/4}IT WAS PRETTY BAD.',
                    '<25>{#p/undyne}{#f/11}* ... if you say so...'
                 ],
         () => (solo() ? [ '<18>{#p/papyrus}{#f/4}...' ] : [ '<25>{#p/undyne}{#f/7}* He said not to talk about it!!' ])
      ),
      s_greater: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF CANIS MAJOR...',
            '<18>{#p/papyrus}{#f/5}THAT DOG HAS A HEART OF GOLD- PRESSED LATINUM.',
            '<18>{#p/papyrus}{#f/4}IF ONLY -I- WAS IN THE ROYAL GUARD...',
            "<18>{#p/papyrus}{#f/0}THEN, I'D BE ABLE TO REPAY IT FOR ITS KINDNESS!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* I could repay it for you, if you like.',
                    "<18>{#p/papyrus}{#f/7}IT'S NOT THE SAME IF I DON'T DO IT MYSELF!",
                    "<25>{#p/undyne}{#f/17}* Couldn't you just wait until it gets home!?",
                    "<18>{#p/papyrus}{#f/7}IT'D MEAN MORE IF IT WAS AT ITS WORKPLACE!",
                    "<25>{#p/undyne}{#f/1}* You're right.\n* I'll let you appear as a hologram there.",
                    '<18>{#p/papyrus}{#f/7}UGH!!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}IT'S TOO BAD I MIGHT NEVER BE A ROYAL GUARD." ]
               : [ '<18>{#p/papyrus}{#f/7}NOTHING WILL EVER REPLACE FACE-TO- FACE CONVERSATION!' ]
      ),
      s_math: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}MATH -HAS- ALWAYS BEEN A PET PEEVE OF MINE.',
            '<18>{#p/papyrus}{#f/5}CALCULUS THIS, GEOMETRY THAT...',
            '<18>{#p/papyrus}{#f/4}WHATEVER HAPPENED TO COUNTING ON YOUR FINGERBONES?',
            '<18>{#p/papyrus}{#f/7}ALL THE \"ADVANCED\" MATH IS TOTALLY UNNECESSARY!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* You really believe that, don't you?",
                    "<25>{#p/undyne}{#f/17}* We'd still be living in the dark ages if it wasn't for that!",
                    "<25>{#p/undyne}{#f/16}* Then again, that WOULD also mean we'd still have a home planet...",
                    '<18>{#p/papyrus}{#f/5}I KNOW, I KNOW...',
                    "<18>{#p/papyrus}{#f/7}I JUST DON'T LIKE SOLVING IT!",
                    "<25>{#p/undyne}{#f/14}* Oh, no, I'm totally with you on that."
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}IF YOU REALLY WANT HELP WITH ADVANCED MATH...',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}THERE'S NOBODY BETTER THAN DR. ALPHYS!!",
                    "<18>{#p/papyrus}{#f/4}THEY SAY SHE'S LIKE A LIVING CALCULATOR...",
                    '<18>{#p/papyrus}{#f/0}AND A VERY SCIENTIFIC ONE AT THAT!'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* Just ask Dr. Alphys?',
                    '<18>{#p/papyrus}{#f/9}WOW, I WONDER WHAT GAVE YOU THAT IDEA!!',
                    '<18>{#p/papyrus}{#f/4}... OH WAIT.',
                    "<18>{#p/papyrus}{#f/4}IT'S BECAUSE SHE FILES ALL YOUR REPORTS FOR YOU.",
                    "<25>{#p/undyne}{#f/17}* She's good at sorting out the dates, okay??"
                 ])
         ]
      ),
      s_bridge: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}REMEMBER THE \"GAUNTLET OF DEADLY TERROR?\"',
            '<18>{#p/papyrus}{#f/4}BELIEVE IT OR NOT, IT HAS A SECRET SEVENTH WEAPON...',
            "<18>{#p/papyrus}{#f/6}WHICH WOULD'VE TRULY TAKEN YOUR BREATH AWAY!",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}...' ]
               : [
                    "<25>{#p/undyne}{#f/12}* What about the one that'd leave you speechless?",
                    "<18>{#p/papyrus}{#f/0}THAT'S THE ULTRA- SECRET EIGHTH WEAPON, ACTUALLY.",
                    '<25>{#p/undyne}{#f/1}* Ooh.\n* Sounds dangerous.',
                    "<18>{#p/papyrus}{#f/6}WHY DO YOU THINK I DIDN'T USE IT!?"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}... LITERALLY!!' ]
               : [
                    "<18>{#p/papyrus}{#f/4}DON'T EVEN GET ME STARTED...",
                    '<18>{#p/papyrus}{#f/4}ON THE HYPER- SECRET TENTH WEAPON.',
                    '<18>{#p/papyrus}{#f/6}... WAIT, I FORGOT THE MEGA-SECRET NINTH WEAPON!',
                    '<18>{#p/papyrus}{#f/0}THAT ONE WOULD TOTALLY KNOCK YOUR SOCKS OFF.'
                 ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}GOOD THING I DIDN'T USE IT, HUH?",
                    '<18>{#p/papyrus}{#f/4}NOT TO MENTION THE TWENTY OTHER WEAPONS I HAD.'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}AND YOUR SHIRT, AND YOUR SHOES...',
                    '<18>{#p/papyrus}{#f/6}... BUT MOST IMPORTANTLY, YOUR SERVICE!'
                 ]
      ),
      s_town1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}STARTON TOWN: THE NORTH SIDE!',
            "<18>{#p/papyrus}{#f/5}A SIDE I DON'T SPEND MUCH TIME ON.",
            '<18>{#p/papyrus}{#f/4}SANS, ON THE OTHER HAND...',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/4}... WELL, YOU CAN PROBABLY GUESS WHY HE DOES.' ]
               : [
                    "<25>{#p/undyne}{#f/14}* ... enjoys the new and improved food they're selling at Grillby's!",
                    '<18>{#p/papyrus}{#f/4}NEW AND IMPROVED, YOU SAY?',
                    '<18>{#p/papyrus}{#f/5}I SUPPOSE IT -IS- BETTER THAN BEFORE...',
                    '<18>{#p/papyrus}{#f/7}BUT STILL NOTHING COMPARED TO HOME- COOKED PASTA!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}IT HAS SOMETHING TO DO WITH GRILLBY'S." ]
               : [
                    '<18>{#p/papyrus}{#f/5}IF ONLY HE APPRECIATED WHAT I DO FOR HIM.',
                    '<18>{#p/papyrus}{#f/6}BROTHERS, AM I RIGHT?'
                 ]
      ),
      s_taxi: pager.create(
         0,
         () => [
            ...(SAVE.data.n.plot < 65
               ? [
                    '<18>{#p/papyrus}{#f/0}IS THE TAXI OUT YET TODAY?',
                    '<18>{#p/papyrus}{#f/5}HMM... IT TENDS TO COME OUT IN THE LATER HOURS.'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}I HEARD THE TAXI IS FINALLY OUT!',
                    "<18>{#p/papyrus}{#f/5}HMM... THAT MUST MEAN WE'RE IN THE LATER HOURS."
                 ]),
            '<18>{#p/papyrus}{#f/6}AS FOR HOW TO TELL THE LATER HOURS FROM EARLIER ONES?',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}... I'LL GET BACK TO YOU ON THAT." ]
               : [
                    '<25>{#p/undyne}{#f/12}* Uh... I think you just made those up.',
                    '<25>{#p/undyne}{#f/17}* There ARE no \"later hours\" on the outpost.',
                    '<18>{#p/papyrus}{#f/4}CORRECT...',
                    '<18>{#p/papyrus}{#f/9}... UNTIL NOW!',
                    '<18>{#p/papyrus}{#f/9}IN DUE TIME, EVERYONE WILL ADOPT MY SYSTEM!',
                    "<18>{#p/papyrus}{#f/0}IT'LL BE A GRAND TIMEKEEPING REVOLUTION!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}EVENTUALLY!!!' ]
               : [
                    '<18>{#p/papyrus}{#f/4}FOR OUR FIRST REVOLUTION MEETING...',
                    "<18>{#p/papyrus}{#f/0}WE'LL NEED TO AGREE ON A SPECIFIC TIME.",
                    "<18>{#p/papyrus}{#f/9}BUT NO WORRIES!\nI'LL JUST TELL THE PARTICIPANTS...",
                    '<18>{#p/papyrus}{#f/9}... TO ARRIVE IN THE EARLY HOURS!',
                    '<25>{#p/undyne}{#f/1}* And how will they know what those are?',
                    '<18>{#p/papyrus}{#f/4}RIGHT...',
                    "<18>{#p/papyrus}{#f/0}WE'LL HAVE TO DISCUSS THAT AT THE MEETING."
                 ]
      ),
      s_town2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}STARTON TOWN: THE SOUTH SIDE!',
            '<18>{#p/papyrus}{#f/4}OR AS I LIKE TO CALL IT...',
            '<18>{#p/papyrus}{#f/9}THE BEST SIDE IN THE COSMOS!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* No doubt because YOU live there.',
                    '<18>{#p/papyrus}{#f/4}NOT ONLY THAT...',
                    "<18>{#p/papyrus}{#f/0}IT'S ALSO THE SIDE THAT DOESN'T HAVE GRILLBY'S ON IT!!"
                 ])
         ],
         [
            "<18>{#p/papyrus}{#f/4}IT'S NO WONDER A FRIENDLY GHOST SET UP SHOP HERE...",
            "<18>{#p/papyrus}{#f/9}WHO WOULDN'T WANT TO BE IN PROXIMITY OF SUCH GREATNESS?",
            "<18>{#p/papyrus}{#f/0}I CERTAINLY COULDN'T RESIST."
         ]
      ),
      s_battle: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}STANDING AT THE SITE OF OUR LEGENDARY BATTLE?',
            "<18>{#p/papyrus}{#f/0}NO, NO, GO AHEAD.\nIT'S A PLACE OF HISTORICAL VALUE.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* Don't admire the view for too long, punk!",
                    "<25>{#p/undyne}{#f/7}* You've still gotta admire the site of OUR legendary battle!",
                    '<18>{#p/papyrus}{#f/6}HOW MANY LEGENDARY BATTLES HAVE THEY BEEN IN?',
                    '<25>{#p/undyne}{#f/8}* Who knows!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}THEY'LL HAVE TO PUT IT IN A MUSEUM SOMEDAY..." ]
               : [
                    '<25>{#p/undyne}{#f/1}* Regardless of what happens now...',
                    '<25>{#p/undyne}{#f/7}* You better not have a battle more legendary than OURS!',
                    '<25>{#p/undyne}{#f/14}* Not unless I get to be a part of it!\n* Fuhuhu!'
                 ]
      ),
      s_exit: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}CAREFUL NOW...',
            '<18>{#p/papyrus}{#f/0}THAT DOOR THERE IS THE ENTRANCE TO THE FOUNDRY.',
            '<18>{#p/papyrus}{#f/5}ONLY DARKNESS AWAITS YOU IN SUCH A PLACE.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* You'll get no arguments from me.",
                    '<25>{#p/undyne}{#f/16}* Half the time, I just use my jetpack as a flashlight...',
                    '<18>{#p/papyrus}{#f/6}WHAT ABOUT THE OTHER FLASHLIGHTS I GAVE YOU?',
                    '<25>{#p/undyne}{#f/1}* Oh, those?',
                    '<25>{#p/undyne}{#f/14}* ... yeah, I kinda dropped them all trying to use my jetpack.',
                    '<18>{#p/papyrus}{#f/4}OF COURSE...'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}DID I MENTION THE DARKNESS THAT AWAITS YOU?' ]
               : [
                    "<18>{#p/papyrus}IF I'VE LEARNED ONE THING FROM UNDYNE...",
                    "<18>{#p/papyrus}{#f/5}IT'S THAT IT ALL COMES BACK AROUND TO THAT JETPACK.",
                    '<18>{#p/papyrus}{#f/4}NO MATTER THE TIME, OR PLACE...',
                    "<18>{#p/papyrus}{#f/5}SHE'S ALWAYS GETTING INTO TROUBLE WITH IT.",
                    "<25>{#p/undyne}{#f/14}* And you wouldn't have it any other way!",
                    '<25>{#p/undyne}{#f/17}* Right?',
                    '<18>{#p/papyrus}{#f/6}... OF COURSE!!'
                 ]
      ),
      s_grillbys: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/5}SO... GRILLBY'S.",
            '<18>{#p/papyrus}{#f/5}IS IT TRUE THEY INSTALLED A YAMOK SAUCE MACHINE...',
            "<18>{#p/papyrus}{#f/6}JUST TO SATISFY MY BROTHER'S OUTRAGEOUS WHIMS?",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/13}* A what?',
                    '<18>{#p/papyrus}{#f/4}A YAMOK SAUCE MACHINE.',
                    '<18>{#p/papyrus}{#f/4}YOU KNOW, TO DISPENSE YAMOK SAUCE.'
                 ]),
            '<18>{#p/papyrus}{#f/4}...',
            '<18>{#p/papyrus}{#f/4}I NORMALLY HAVE HOPE FOR OUR KIND, BUT...',
            '<18>{#p/papyrus}{#f/4}NOT WHEN IT COMES TO THINGS LIKE THIS.',
            '<18>{#p/papyrus}{#f/5}... STILL.',
            "<18>{#p/papyrus}{#f/5}IT'S NICE THAT THEY FINALLY FIXED THE JUKEBOX.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* I KNOW RIGHT!?',
                    "<25>{#p/undyne}{#f/7}* That thing's been broken since before I was BORN."
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}TRACK THREE IS MY PERSONAL FAVORITE.',
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/1}* Mine's track four!" ])
         ]
      ),
      s_backrooms: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}SINCE THEY STARTED USING REPLICATORS HERE...',
            "<18>{#p/papyrus}{#f/5}I HAVEN'T BEEN SURE HOW TO FEEL ABOUT IT.",
            '<18>{#p/papyrus}{#f/0}ON ONE HAND, THE NEW FOOD IS WAY MORE HEALTHY.',
            "<18>{#p/papyrus}{#f/7}ON THE OTHER HAND, THEY'VE ABANDONED COOKING ENTIRELY!",
            "<18>{#p/papyrus}{#f/4}SEE THIS ROOM YOU'RE STANDING IN RIGHT NOW?",
            '<18>{#p/papyrus}{#f/7}GUESS WHAT THIS USED TO BE!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* Isn't this where Canis Minor likes to sit?",
                    '<25>{#p/undyne}{#f/10}* All alone...\n* Playing those card games with itself...',
                    "<18>{#p/papyrus}{#f/4}OH, COME ON.\nIT'S PERFECTLY CONTENT WITH THAT.",
                    '<18>{#p/papyrus}{#f/0}IT SEEMS TO HAVE ITS OWN AGENDA FOR LIFE...',
                    '<18>{#p/papyrus}{#f/9}INVOLVING CARD GAMES!! AND LOTS OF HEADPATS!',
                    "<25>{#p/undyne}{#f/14}* You're right about the headpats, that's for sure.",
                    '<25>{#p/undyne}{#f/17}* It once barged into a Royal Guard meeting just to BEG for them!',
                    '<18>{#p/papyrus}{#f/6}INTERESTING!!\nBUT WHAT DID YOU DO?',
                    '<25>{#p/undyne}{#f/12}* Well... we all gave it lots of headpats.',
                    "<25>{#p/undyne}{#f/8}* Like we'd ever NOT!!"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}SOME \"KITCHEN...\"',
                    '<18>{#p/papyrus}{#f/5}NOW THEY JUST USE IT FOR PRIVATE CARD GAMES.'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/4}IF THEY'RE NOT GOING TO USE THIS AS A KITCHEN...",
                    '<18>{#p/papyrus}{#f/5}PERHAPS A HEADPAT MACHINE WOULD BE A BETTER INVESTMENT.'
                 ]
      ),
      s_bonehouse: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}WHAT BETTER PLACE TO BE THAN MY HOUSE!',
            "<18>{#p/papyrus}{#f/0}WE'VE GOT EXTRA- TALL SINKS...\nPET MOON ROCKS...",
            '<18>{#p/papyrus}{#f/9}AND EVEN A BALCONY, PRIME FOR OUTDOOR LIVING!',
            "<18>{#p/papyrus}{#f/0}IT'S PRACTICALLY THE ONLY PLACE I FEEL AT HOME.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/16}* I'd say the same about MY house, but... y'know.",
                    '<18>{#p/papyrus}{#f/5}YEAH... IT MUST BE TOUGH NOT HAVING ONE.',
                    '<18>{#p/papyrus}{#f/6}... LIKE, WHERE -DO- YOU EVEN FEEL AT HOME NOW?',
                    "<25>{#p/undyne}{#f/1}* Honestly?\n* Here's pretty good!",
                    "<18>{#p/papyrus}{#f/5}BUT... HOW?\nWE'RE JUST STANDING AROUND!",
                    "<25>{#p/undyne}{#f/14}* When I'm with you, ANYWHERE's my home.\n* Fuhuhu.",
                    '<18>{#p/papyrus}{#f/5}... YOU REALLY MEAN THAT?',
                    '<25>{#p/undyne}{#f/8}* Of course!!',
                    "<18>{#p/papyrus}{#f/8}N-NO...!!\nYOU'RE GOING TO MAKE ME CRY!"
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}I WONDER WHAT HUMANS CALL HOME THESE DAYS.',
            '<18>{#p/papyrus}{#f/4}LAST I HEARD, THEY WERE STILL LIVING ON EARTH...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Actually, they say Earth is a decaying mess right now.',
                    '<25>{#p/undyne}{#f/12}* ... just something I overheard at the Royal Lab.',
                    '<25>{#p/undyne}{#f/13}* They\'d found some kind of \"evidence\" for a natural disaster...'
                 ])
         ]
      ),
      s_papyrusroom: pager.create(
         0,
         () =>
            SAVE.data.n.plot_date < 1.1
               ? [
                    '<18>{#p/papyrus}WOW, IT ONLY TOOK YOU FOUR SECONDS TO CALL ME!',
                    '<18>YOU MUST BE VERY DESPERATE FOR MY HELP!!!',
                    "<18>{#p/papyrus}{#f/9}BUT DO NOT FEAR.\nTHIS IS PAPYRUS'S HOTFUL HELPLINE!",
                    '<18>{#p/papyrus}{#f/9}JUST DESCRIBE YOUR LOCATION, AND...',
                    '<18>{#p/papyrus}{#f/4}... WAIT.',
                    "<18>{#p/papyrus}{#f/6}YOU'RE STILL IN MY ROOM??",
                    '<18>{#p/papyrus}{#f/5}...',
                    '<18>{#p/papyrus}{#f/5}HAVE YOU HEARD OF SOMETHING CALLED A... DOOR?',
                    "<18>{#p/papyrus}{#f/6}DON'T WORRY!!\nI'LL DRAW A DIAGRAM FOR YOU!"
                 ]
               : SAVE.data.n.plot_date < 1.2
               ? [
                    "<18>{#p/papyrus}{#f/1}WHAT??\nI THOUGHT YOU'D LEFT MY ROOM!!",
                    "<18>{#p/papyrus}{#f/4}WE'LL HAVE TO START OVER FROM SQUARE ONE...",
                    '<18>{#p/papyrus}{#f/5}FIRST, DO YOU KNOW WHO PAPYRUS IS!?'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/5}SO YOU CAME BACK TO MY ROOM, HUH?',
                    '<18>{#p/papyrus}{#f/5}(SIGH...)',
                    '<18>{#p/papyrus}{#f/5}I GUESS IT -IS- PRETTY COOL.',
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/1}* And what about my room?',
                            "<18>{#p/papyrus}{#f/4}WELL... THAT ROOM'S VERY HOT.",
                            '<18>{#p/papyrus}{#f/4}ON FIRE, IN FACT.',
                            '<25>{#p/undyne}{#f/17}* Good!!\n* I like hot things!'
                         ])
                 ],
         () =>
            SAVE.data.n.plot_date < 1.1
               ? [ "<18>{#p/papyrus}{#f/6}HOLD UP!\nI'M STILL DRAWING!" ]
               : SAVE.data.n.plot_date < 1.2
               ? [ '<18>{#p/papyrus}{#f/1}DO -I- KNOW WHO PAPYRUS IS!?!?' ]
               : [
                    ...(solo()
                       ? [
                            "<18>{#p/papyrus}{#f/6}HEY, UH, WHILE YOU'RE THERE...",
                            '<18>{#p/papyrus}{#f/6}WOULD YOU MIND LOOKING AFTER MY ACTION FIGURES??',
                            "<18>{#p/papyrus}{#f/5}THEY'VE BEEN... FEELING KIND OF LONELY LATELY.",
                            '<18>{#p/papyrus}{#f/5}... THANKS.'
                         ]
                       : [ "<25>{#p/undyne}{#f/8}* Especially when they're on fire!!!" ])
                 ]
      ),
      s_innterior: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}THE INN'S A GREAT PLACE TO STAY.",
            '<18>{#p/papyrus}THE BEDS ARE NICE, AND THE INN KEEPER IS EVEN NICER.',
            '<18>{#p/papyrus}{#f/5}BUT MOST OF ALL, I LIKE THE PHOTO ON THE WALL...',
            "<18>{#p/papyrus}{#f/0}IT'S A REMINDER OF WHAT MONSTERS ARE TRULY CAPABLE OF.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/16}* It's also one of the most well-known photos of our old homeworld...",
                    '<25>{#p/undyne}{#f/9}* One of the last ones still in existence.',
                    "<18>{#p/papyrus}{#f/5}... DO YOU THINK WE'LL EVER FIND ANY OTHERS?",
                    "<25>{#p/undyne}{#f/1}* Well, if we knew some way of scanning a monster's memories...",
                    '<26>{#p/undyne}{#f/14}* We could just use THAT on a monster who lived there!',
                    '<18>{#p/papyrus}{#f/0}WELL... THAT SOUNDS GREAT!',
                    '<18>{#p/papyrus}{#f/4}... IF ONLY WE KNEW SOME WAY OF DOING THAT.',
                    "<18>{#p/papyrus}{#f/4}WHICH WE DON'T.",
                    '<18>{#p/papyrus}{#f/4}SADLY.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}IF ONLY WE COULD TRAVEL BACK IN TIME...' ]
               : [
                    '<18>{#p/papyrus}{#f/5}I SUPPOSE, FOR THE TIME BEING...',
                    '<18>{#p/papyrus}{#f/4}TELLING EACH OTHER BEDTIME STORIES WILL HAVE TO DO.',
                    "<25>{#p/undyne}{#f/1}* Oh yeah, doesn't Sans read you those?",
                    "<18>{#p/papyrus}{#f/0}OF COURSE!\nTHEY'RE LIKE RAW IMAGINATION FUEL!",
                    '<25>{#p/undyne}{#f/1}* Imagine if you got a homeworld survivor to tell you stories...',
                    '<25>{#p/undyne}{#f/14}* Someone like THAT could provide you with a HUNDRED great bedtimes!',
                    '<18>{#p/papyrus}WITHOUT DOUBT!'
                 ]
      ),
      s_beddinng: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}ONCE IN A WHILE, SANS WILL READ ME A BEDTIME STORY.',
            '<18>{#p/papyrus}{#f/5}HAVE YOU EVER HEARD OF \"GENEROUS MONSTER?\"',
            '<18>{#p/papyrus}{#f/6}SANS READ IT TO ME LAST NIGHT, AND...',
            "<18>{#p/papyrus}{#f/8}... AUGH!\nI JUST COULDN'T STOP CRYING!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/10}* Ouch...\n* That's a rough one.",
                    '<25>{#p/undyne}{#f/16}* Especially for something written by a human.',
                    '<18>{#p/papyrus}{#f/6}... DO HUMANS ALWAYS WRITE BOOKS THIS TRAGIC!?',
                    "<25>{#p/undyne}{#f/14}* I wouldn't know.\n* It's the only one I've ever read.",
                    '<25>{#p/undyne}{#f/15}* Well, unless you count those \"books\" Alphys posted the other day...',
                    "<18>{#p/papyrus}{#f/4}... I DON'T EVEN WANT TO KNOW."
                 ])
         ],
         [
            "<18>{#p/papyrus}{#f/4}NEXT TIME, I'M HAVING SANS READ A HAPPY STORY.",
            '<18>{#p/papyrus}{#f/6}WITH AN -ACTUAL- HAPPY ENDING!',
            '<18>{#p/papyrus}{#f/5}WHERE EVERYBODY COMES AWAY SATISFIED!!',
            '<18>{#p/papyrus}{#f/7}AND WHERE NOBODY HAS TO DIE OR SAY GOODBYE!!!'
         ]
      ),
      s_librarby: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/6}SHH...\n(NO PHONE CALLS IN THE LIBRARBY!)',
            "<18>{#p/papyrus}{#f/0}(YOU CAN CALL ME BACK WHEN YOU'RE OUT, THOUGH!)",
            ...(solo() ? [] : [ '<25>{|}{#p/undyne}{#f/8}* YEAHHHH MAKE SOME NOI- {%}' ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}(REALLY...)' ]
               : [
                    '<18>{#p/papyrus}{#f/4}(YES, I HUNG UP TO STOP UNDYNE FROM DISTURBING YOU.)',
                    '<25>{|}{#p/undyne}{#f/8}* YEA- {%}'
                 ]
      ),
      f_start: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}BEHOLD THE OMINOUS ATMOSPHERE OF THE FACTORY.',
            '<18>{#p/papyrus}{#f/4}THEY SAY THERE ARE MONSTERS LIVING IN THE PIPES...',
            "<18>{#p/papyrus}{#f/0}AND THEY'D BE ABSOLUTELY RIGHT!",
            '<18>{#p/papyrus}{#f/5}SOME MONSTERS DO PREFER A DANK AND DIRTY ENVIRONMENT.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}UNLIKE ME!!' ]
               : [
                    "<25>{#p/undyne}{#f/1}* I hope they don't mind me using the pipes as a jungle gym.",
                    '<25>{#p/undyne}{#f/8}* I used to swing on them all the time!',
                    '<18>{#p/papyrus}{#f/6}UNDYNE, NO!\nTHOSE POOR, POOR PIPE DWELLERS!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}I PREFER THE SANITARY SIDE OF LIVING.' ]
               : [ '<18>{#p/papyrus}{#f/6}BE CAREFUL WHERE YOU JUNGLE GYM.' ]
      ),
      f_sans: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}MY BROTHER HAS A STATION HERE.',
            '<18>{#p/papyrus}{#f/4}INDEED, HE MANS TWO STATIONS AT THE SAME TIME.',
            "<18>{#p/papyrus}{#f/0}AMAZING, ISN'T HE?",
            '<18>{#p/papyrus}{#f/0}HE SLACKS OFF TWICE AS MUCH AS NORMAL!!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* Sounds to me like he's always watching.",
                    '<18>{#p/papyrus}{#f/0}AH, YES... ALWAYS WATCHING.',
                    '<18>{#p/papyrus}{#f/4}ALWAYS WATCHING A VARIETY OF ONLINE VIDEO CONTENT.',
                    "<25>{#p/undyne}{#f/3}* ... I wonder if he's a fan of Mew Mew Space Adventure.",
                    "<18>{#p/papyrus}{#f/7}YOU'RE MISSING THE POINT!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}WE WAKEFUL FOLK COULD ONLY DREAM OF SUCH SLOTH...' ]
               : [
                    "<18>{#p/papyrus}{#f/5}EVEN UNDYNE'S BEEN CAUGHT IN SANS'S BAD HABITS...",
                    '<25>{#p/undyne}{#f/17}* I have NOT!!',
                    "<18>{#p/papyrus}{#f/4}... JUST DON'T WATCH IT ON THE JOB, OKAY?",
                    '<25>{#p/undyne}{#f/17}* Okay!!'
                 ]
      ),
      f_corridor: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}WHAT'S IN YOUR DIMENSIONAL BOX?",
            "<18>{#p/papyrus}{#f/4}ACTUALLY, DON'T TELL ME.",
            "<18>{#p/papyrus}{#f/7}THAT'D BE A BLATANT VIOLATION OF YOUR PRIVACY!",
            ...(solo()
               ? []
               : SAVE.data.b.undyne_respecc
               ? [ '<25>{#p/undyne}{#f/17}* ...', "<25>{#p/undyne}{#f/14}* ... yeah, you're right." ]
               : [
                    '<25>{#p/undyne}{#f/8}* Wait, no!\n* I want to know!',
                    "<25>{#p/undyne}{#f/7}* You!\n* What've you been hiding, punk!?",
                    "<18>{#p/papyrus}{#f/6}NOTHING!\nTHAT'S WHAT!!",
                    "<25>{#p/undyne}{#f/17}* I wasn't asking you.",
                    "<25>{#p/undyne}{#f/14}* ... eh, I'll just search the dimensional storage array later.",
                    "<18>{#p/papyrus}{#f/6}WHAT!?\nTHAT'S A THING?",
                    '<18>{#p/papyrus}{#f/5}I GUESS THE ITEMS DO HAVE TO GO SOMEWHERE...'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}... AT LEAST TELL ME IT\'S NOT \"DOG RESIDUE.\"' ]
               : [
                    '<18>{#p/papyrus}{#f/4}JUST BETWEEN YOU AND I...',
                    "<18>{#p/papyrus}{#f/0}UNDYNE DOESN'T ACTUALLY WANT TO STEAL YOUR STUFF.",
                    "<25>{#p/undyne}{#f/12}* Me? Stealing?\n* Pfft, I dunno what you're talking about!",
                    "<18>{|}{#p/papyrus}SEE?\nSHE'S NOT- {%}",
                    SAVE.data.b.undyne_respecc
                       ? "<25>{#p/undyne}{#f/14}* I'd only steal from someone who ISN'T the bravest punk around!"
                       : "<25>{#p/undyne}{#f/14}* I'd only steal from someone who ISN'T the nicest punk around!",
                    "<18>{#p/papyrus}{#f/4}... SO YOU'D STEAL FROM ME, THEN.",
                    "<25>{#p/undyne}{#f/17}* Don't overthink it!"
                 ]
      ),
      f_doge: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}THEY SAY IT'S BEST TO LET SLEEPING DOGS LIE...",
            '<18>{#p/papyrus}{#f/7}BUT, TRUTHFULLY, I DISAGREE!',
            '<18>{#p/papyrus}{#f/5}AFTER ALL...',
            '<18>{#p/papyrus}{#f/6}A GOOD DOG SHOULD VALUE HONESTY ABOVE ALL ELSE!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* That reminds me...',
                    '<25>{#p/undyne}{#f/9}* ... one of my top guards, Doge, quit her job today.',
                    '<18>{#p/papyrus}{#f/6}WHY?\nWAS SHE DISHONEST!?',
                    "<25>{#p/undyne}{#f/1}* Actually, she's one of the most honest dogs I know.",
                    '<25>{#p/undyne}{#f/16}* I think I just went a little hard on her.',
                    '<18>{#p/papyrus}{#f/5}AH... WELL...',
                    '<18>{#p/papyrus}{#f/6}YOU CAN JUST APOLOGIZE TO HER LATER, RIGHT?',
                    "<25>{#p/undyne}{#f/12}* ... yeah, I guess that's a good place to start."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}IF ONLY THE DOG UNDER MY SINK HAD SUCH PRIORITIES...' ]
               : [ '<18>{#p/papyrus}{#f/0}WHEN IN DOUBT, JUST TALK IT OUT.', '<18>{#p/papyrus}{#f/9}WORKS EVERY TIME!' ]
      ),
      f_puzzle1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}WATCH OUT FOR THE ANCIENT HUMAN PYLON PUZZLES!',
            '<18>{#p/papyrus}{#f/4}THOUGH RUDIMENTARY IN THEIR METHOD OF CONSTRUCTION...',
            '<18>{#p/papyrus}{#f/6}THEIR DESIGN IS NOTHING SHORT OF PERPLEXING!',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}IT'S A WONDER WE MONSTERS CAN SOLVE THEM AT ALL." ]
               : [
                    '<25>{#p/undyne}{#f/1}* That makes sense.\n* Humans themselves are the same way...',
                    '<25>{#p/undyne}{#f/16}* Waging that perplexing war over something so stupidly simple.',
                    '<18>{#p/papyrus}{#f/6}... WELL THAT GOT DARK FAST!',
                    "<25>{#p/undyne}{#f/12}* ... thankfully, we've got this really nice human to offset it!",
                    '<18>{#p/papyrus}{#f/0}NOW -THAT- I CAN GET BEHIND.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}I WONDER IF HUMANS STRUGGLE WITH MONSTER PUZZLES.' ]
               : [ '<18>{#p/papyrus}{#f/0}HEH! NOT ALL HUMANS ARE BAD!' ]
      ),
      f_quiche: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}MY BROTHER CAME BY HERE THE OTHER DAY...',
            '<18>{#p/papyrus}{#f/5}SAYING HE HAD TO DROP SOMETHING OFF.',
            '<18>{#p/papyrus}{#f/5}I ASKED HIM ABOUT IT, AND HE ISSUED ME A CHALLENGE...',
            '<18>{#p/papyrus}{#f/4}A RIDDLE ABOUT A VERY \"CHEESY\" JOKE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* I think I know what he meant, Papyrus.',
                    '<18>{#p/papyrus}{#f/6}WHAT!?\nWHAT WAS IT?',
                    '<25>{#p/undyne}{#f/1}* Oh, come on.\n* You know your brother better than anyone.',
                    '<25>{#p/undyne}{#f/12}* Solving this one should be a piece of cake!',
                    '<18>{#p/papyrus}{#f/5}HMM...\nA CHEESY RIDDLE...',
                    '<18>{#p/papyrus}{#f/4}A PIECE OF CAKE...'
                 ])
         ],
         [ "<18>{#p/papyrus}{#f/6}I'LL GET BACK TO YOU WITH THE ANSWER SOON!" ]
      ),
      f_puzzle2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}MORE OFTEN THAN NOT, A PUZZLE MAY BE UNSOLVABLE...',
            "<18>{#p/papyrus}{#f/5}IF YOU DON'T TAKE THE TIME TO READ THE SIGNS.",
            "<18>{#p/papyrus}{#f/6}YOU'D THINK INTUITION WOULD BE ENOUGH, BUT... NO!",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}... I'VE BEEN EMBARRASSED THIS WAY MANY TIMES..." ]
               : [
                    '<25>{#p/undyne}{#f/14}* Yeah, having to read signs kinda stinks.',
                    '<25>{#p/undyne}{#f/8}* I just throw spears at the receiver and call it a day!',
                    "<18>{#p/papyrus}{#f/6}WON'T THAT BREAK THE PUZZLE FOR EVERYONE ELSE!?",
                    '<25>{#p/undyne}{#f/14}* Surprisingly, no.',
                    '<25>{#p/undyne}{#f/14}* Human-made puzzles are even more resillient than THEY are.',
                    "<25>{#p/undyne}{#f/7}* Trust me.\n* I've TRIED to break them on purpose."
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}I'VE SAID IT BEFORE, AND I'LL SAY IT AGAIN.",
                    '<18>{#p/papyrus}{#f/9}READ!\nTHOSE!!\nSIGNS!!!',
                    '<18>{#p/papyrus}{#f/4}AND DO NOTE THE RISING EXCLAMATION POINT COUNT.',
                    "<18>{#p/papyrus}{#f/7}IT MEANS IT'S VERY IMPORTANT!!!!"
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}WELL, YOU KNOW WHAT THEY SAY...',
                    "<18>{#p/papyrus}{#f/0}IF YOU CAN'T BREAK THEM, SOLVE THEM!",
                    '<18>{#p/papyrus}{#f/5}THOUGH, THAT DOES PUT US BACK AT SQUARE ONE.'
                 ]
      ),
      f_story1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}SIGNAL STARS ARE PRETTY NEAT, HUH?',
            '<18>{#p/papyrus}{#f/5}THOUGH, THEY ONLY RESET PERIODICALLY.',
            '<18>{#p/papyrus}{#f/4}UNTIL THEN, ONLY A SINGLE MESSAGE IS SAVED...',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/12}* So that's why my messages to Alphys aren't getting through.",
                    '<18>{#p/papyrus}{#f/6}YOU USED A SIGNAL STAR FOR THAT!?',
                    '<18>{#p/papyrus}{#f/5}OH...\nUNDYNE...',
                    "<25>{#p/undyne}{#f/17}* What?\n* I thought it'd send the message on demand!",
                    "<25>{#p/undyne}{#f/11}* That's how they used to work, right??",
                    '<18>{#p/papyrus}{#f/0}AH, NOT EXACTLY.',
                    '<18>{#p/papyrus}{#f/4}WHEN WE FIRST DISCOVERED THEM GROWING HERE...',
                    '<18>{#p/papyrus}{#f/9}THEY WERE A LOT MORE RECEPTIVE TO NEW SIGNALS!',
                    '<18>{#p/papyrus}{#f/5}THEN, AS THEY GREW OLDER, THEY BECAME SLOWER.',
                    '<25>{#p/undyne}{#f/1}* Huh.\n* Fascinating!',
                    "<25>{#p/undyne}{#f/12}* I guess I'll have to come up with something else, then."
                 ])
         ],
         [ "<18>{#p/papyrus}{#f/4}THIS PHONE CALL -PROBABLY- WON'T BE RECORDED." ]
      ),
      f_prechase: pager.create(
         0,
         () =>
            SAVE.data.n.plot < 37.11
               ? []
               : SAVE.data.n.plot < 48
               ? [
                    '<18>{#p/papyrus}THERE USED TO BE A BRIDGE HERE, BUT IT COLLAPSED.',
                    "<18>{#p/papyrus}{#f/5}HOPEFULLY THEY'LL BUILD A NEW ONE SOON...",
                    '<18>{#p/papyrus}{#f/6}RIDING ON A FLIMSY FLOATING PLATFORM IS FEAR-INDUCING!'
                 ]
               : [
                    '<18>{#p/papyrus}I HEARD THE WORKERS HERE BUILT A BRIDGE.',
                    '<18>{#p/papyrus}{#f/5}THANK THE COSMOS...',
                    "<18>{#p/papyrus}{#f/6}I'VE HAD MY FILL OF FLIMSY FLOATING PLATFORMS!!",
                    ...(solo()
                       ? []
                       : [
                            "<25>{#p/undyne}{#f/7}* You just don't know how to have fun.",
                            "<18>{#p/papyrus}{#f/4}YOU HAVE A JETPACK, SO YOU CAN'T FALL OFF.",
                            '<18>{#p/papyrus}{#f/6}I HAVE NO SUCH GUARANTEES!',
                            '<25>{#p/undyne}{#f/14}* Would it be so much to get you to live a little?',
                            "<25>{#p/undyne}{#f/4}* Even if you DID fall off, it's not like you'd get hurt.",
                            "<25>{#p/undyne}{#f/1}* You'd just... float around for a while.",
                            "<25>{#p/undyne}{#f/14}* And then I'd come and rescue you with my jetpack!",
                            "<18>{#p/papyrus}{#f/6}I'LL TAKE MY CHANCES WITH THE BRIDGE, THANK YOU!"
                         ])
                 ],
         [
            '<18>{#p/papyrus}{#f/0}NOTHING QUITE LIKE THE SAFETY AND SECURITY...',
            '<18>{#p/papyrus}{#f/0}OF A SOLID, STABLE, SOUNDLY- DESIGNED BRIDGE.',
            '<18>{#p/papyrus}{#f/9}A TRUE TESTAMENT TO SUPERB ENGINEERING!!'
         ]
      ),
      f_chase: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THE FIRST TIME I SAW THIS ROOM, I WAS TRULY AMAZED.',
            "<18>{#p/papyrus}{#f/4}SO MUCH SO, THAT I COULDN'T FIND MY WAY OUT.",
            '<18>{#p/papyrus}{#f/6}... NOT TO MENTION THE TRAPS!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Oh yeah, I forgot about those things...',
                    "<25>{#p/undyne}{#f/14}* Eh, most people know the way through.\n* It'll be fine.",
                    '<18>{#p/papyrus}{#f/6}THIS SEEMS LIKE A RECIPE FOR DISASTER.',
                    "<25>{#p/undyne}{#f/12}* Don't worry about it.\n* In fact, it's been kinda handy!",
                    '<25>{#p/undyne}{#f/1}* I think the canine unit even started using it as a training ground.',
                    '<18>{#p/papyrus}{#f/4}AND HOW DOES THAT WORK, EXACTLY?',
                    '<25>{#p/undyne}{#f/17}* It\'s something about \"tactical temptation avoidance?\"',
                    '<25>{#p/undyne}{#f/12}* They put treats behind the trap paths, and the dogs try to avoid them.',
                    "<18>{#p/papyrus}{#f/5}I TAKE IT BACK.\nIT'S NOT A RECIPE FOR DISASTER.",
                    "<18>{#p/papyrus}{#f/6}IT'S A PRE-COOKED DISASTER SERVED ON A SILVER PLATTER!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}I FIND IT BEST TO STEER CLEAR OF SCARY MAZE GAMES.' ]
               : [
                    "<25>{#p/undyne}{#f/1}* There used to be a lot more, actually.\n* It's not what it was.",
                    '<18>{#p/papyrus}{#f/6}HOW MUCH MORE?',
                    '<25>{#p/undyne}{#f/12}* ...\n* Many more.',
                    '<18>{#p/papyrus}{#f/5}HOW MANY?',
                    '<25>{#p/undyne}{#f/17}* Very many.',
                    '<18>{#p/papyrus}{#f/6}HOW VERY??',
                    '<25>{#p/undyne}{#f/7}* Knock it off!'
                 ]
      ),
      f_entrance: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}YOU'RE AT THE ENTRANCE TO WHAT'S KNOWN AS...",
            '<18>{#p/papyrus}{#f/9}THE \"DARK ZONE.\"',
            "<18>{#p/papyrus}{#f/4}YOU WOULDN'T BELIEVE HOW IT GOT ITS NAME...",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* You can thank Asgore for THAT brilliancy in naming.',
                    '<25>{#p/undyne}{#f/8}* He always has the BEST names for things!',
                    '<18>{#p/papyrus}{#f/0}I KNOW, RIGHT?\nEVERYTHING IS SO EASY TO GRASP!',
                    "<25>{#p/undyne}{#f/3}* ... you mean that seriously, don't you.",
                    "<18>{#p/papyrus}{#f/0}OF COURSE!\nIT'S A QUALITY OF HIS I APPRECIATE.",
                    '<25>{#p/undyne}{#f/1}* I see...',
                    '<18>{#p/papyrus}{#f/0}MORE IMPORTANTLY, YOU KNOW.',
                    "<18>{#p/papyrus}{#f/9}WITH HIM, YOU CAN'T -NOT- KNOW WHAT SOMETHING IS!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}SPOILER ALERT...', "<18>{#p/papyrus}{#f/4}... IT'S VERY DARK INSIDE." ]
               : [ "<18>{#p/papyrus}{#f/0}AREN'T THINGS BETTER WHEN YOU UNDERSTAND THEM?" ]
      ),
      f_lobby: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/6}I TOTALLY... CAN'T REACH YOU... AT THE MOMENT!",
            "<18>{#p/papyrus}{#f/6}THE CALL... IT'S DEFINITELY... GLITCHING OUT!",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}...',
                    "<18>{#p/papyrus}{#f/4}OKAY, I ADMIT IT'S NOT REALLY DOING THAT.",
                    '<18>{#p/papyrus}{#f/0}... BUT THAT TABLE CERTAINLY IS!'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* So would you say the call\'s getting \"sliced\" or \"shredded?\"',
                    "<18>{#p/papyrus}{#f/5}UNFORTUNATELY, IT'S SOMETHING FAR MORE DREADED."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}REALLY, THOUGH.\nWHAT'S WITH THAT THING, ANYWAY?" ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S ENCOURAGING UNDYNE TO MAKE CHEESE PUNS." ]
      ),
      f_error: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}ON A DIRECT ROUTE FROM THE BEGINNING OF STARTON...',
            '<18>{#p/papyrus}{#f/0}TO THE END OF THE FIRST FLOOR IN AERIALIS...',
            '<18>{#p/papyrus}{#f/0}THAT ROOM MARKS THE HALFWAY POINT OF YOUR JOURNEY.',
            '<18>{#p/papyrus}{#f/5}... WHEREVER YOU INTEND GO NEXT...',
            '<18>{#p/papyrus}{#f/6}YOUR JOURNEY IS AT -LEAST- HALFWAY OVER NOW!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/4}* What!?\n* Don't say it like THAT!",
                    "<18>{#p/papyrus}{#f/6}I-I MEAN, YOUR JOURNEY'S JUST GETTING STARTED!",
                    "<18>{#p/papyrus}{#f/6}THERE'S STILL PLENTY OF THINGS TO SEE!",
                    '<18>{#p/papyrus}{#f/6}AND PLENTY OF PLACES TO BE!',
                    '<18>{#p/papyrus}{#f/4}AND MOST OF ALL...',
                    '<18>{#p/papyrus}{#f/9}PLENTY OF NEW FRIENDS TO MEET!',
                    "<25>{#p/undyne}{#f/12}* That's better."
                 ])
         ],
         () =>
            solo()
               ? [ '<19>{#p/papyrus}{#f/5}HALFWAY OVER...' ]
               : [ "<19>{#p/papyrus}{#f/9}HERE'S TO THE LONG JOURNEY AHEAD!" ]
      ),
      f_telescope: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}MY BROTHER RUNS A TELESCOPE BUSINESS HERE.',
            '<18>{#p/papyrus}{#f/5}SUBSCRIPTIONS, MEMBERSHIPS, SIGN- UPS, VOUCHERS...',
            "<18>{#p/papyrus}{#f/6}IT'S AN ENDLESS MAZE OF TERMS AND CONDITIONS!",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}I DID ONCE TRY TO ENROLL, BUT...',
                    "<18>{#p/papyrus}{#f/4}EVEN I HAVE LIMITS TO WHAT I'M WILLING TO ENDURE."
                 ]
               : [
                    '<25>{#p/undyne}{#f/13}* I doubt a single person has managed to enroll properly.',
                    "<18>{#p/papyrus}{#f/5}YEAH... YOU'RE PROBABLY RIGHT.",
                    '<18>{#p/papyrus}{#f/6}DO THOSE \"PREMIUM\" TELESCOPES EVEN WORK AT ALL!?',
                    '<25>{#p/undyne}{#f/8}* Who knows!!',
                    "<25>{#p/undyne}{#f/1}* But it's fine, because the normal ones work well enough.",
                    '<25>{#p/undyne}{#f/14}* I use them all the time!'
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/4}LEAVE IT TO A PRANKSTER TO MAKE THINGS TRICKY...' ]
      ),
      f_bird: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}THE MOST INFAMOUS.',
            '<18>{#p/papyrus}{#f/9}THE MOST FEARLESS.',
            '<18>{#p/papyrus}{#f/9}THE MOST BRAVESTEST.',
            '<18>{#p/papyrus}{#f/9}THE MONSTER.\nTHE MYTH.\nTHE LEGEND...',
            '<18>{#p/papyrus}{#f/9}THE YELLOW BIRD.',
            ...(SAVE.data.n.plot < 42
               ? [
                    '<18>{#p/papyrus}{#f/9}...',
                    '<18>{#p/papyrus}{#f/4}... WAIT.',
                    "<18>{#p/papyrus}{#f/1}IT'S NOT THERE ANYMORE!?!?",
                    '<18>{#p/papyrus}{#f/8}HOW COULD THIS BE!!!'
                 ]
               : solo()
               ? [ '<18>{#p/papyrus}{#f/4}... NOT LIKE WE HAVE ANY OTHER WAY TO CROSS THE GAP.' ]
               : [
                    '<25>{#p/undyne}{#f/1}* That bird will carry anyone past the gap.\n* It NEVER says no.',
                    '<25>{#p/undyne}{#f/16}* When I was younger, it once gave ME a lift.\n* It took an hour...',
                    '<25>{#p/undyne}{#f/17}* But this bird NEVER once thought of giving up!!!',
                    '<25>{#p/undyne}{#f/1}* Cherish this bird.'
                 ])
         ],
         () =>
            SAVE.data.n.plot < 42
               ? [
                    "<18>{#p/papyrus}{#f/8}I JUST DON'T UNDERSTAND..!",
                    '<18>{#p/papyrus}{#f/8}HOW COULD THE ONE AND ONLY YELLOW BIRD ABANDON US???'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}TRUST ME, THE GAP IS EVEN LONGER THAN IT SEEMS.',
                    '<18>{#p/papyrus}{#f/4}AND POSSIBLY NON- EUCLIDIAN.',
                    ...(solo()
                       ? []
                       : [
                            "<25>{#p/undyne}{#f/7}* So you're telling me it also has to navigate through THAT!?",
                            '<25>{#p/undyne}{#f/8}* CHERISH THIS BIRD EVEN HARDER, DAMN IT!',
                            "<18>{#p/papyrus}{#f/6}I'M CHERISHING AS HARD AS I CAN!!",
                            '<25>{#p/undyne}{#f/7}* GOOD!!!'
                         ])
                 ]
      ),
      f_stand: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}LEGEND HAS IT...',
            '<18>THE LOCAL ICE CREAM GUY HANDS OUT POSTCARDS.',
            '<18>{#p/papyrus}{#f/4}SOURCES SAY THESE \"POSTCARDS\" HAVE UNSPOKEN POWER...',
            '<18>{#p/papyrus}{#f/9}... TO UNLOCK MORE TASTY TREATS!',
            ...(solo()
               ? []
               : [
                    '<26>{#p/undyne}{#f/8}* And I LOVE tasty treats!',
                    "<25>{#p/undyne}{#f/14}* Well, as long as they're not cold, anyway.",
                    "<25>{#p/undyne}{#f/17}* Then I don't love them that much!!"
                 ])
         ],
         [
            '<18>{#p/papyrus}{#f/0}I WONDER WHAT OTHER POWERS THESE POSTCARDS HAVE.',
            '<18>{#p/papyrus}{#f/4}THEY DO TEND TO RUN OUT QUITE SPEEDILY...'
         ]
      ),
      f_abyss: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}WE LOOK UPON THIS WINDING PATH FULL OF SIGNAL STARS...',
            '<18>{#p/papyrus}{#f/4}AND WE DEEM IT \"NORMAL.\"',
            '<18>{#p/papyrus}{#f/0}YOU KNOW WHAT ELSE IS \"NORMAL?\"',
            '<18>{#p/papyrus}{#f/0}THE FACT THAT THIS PHONE CALL EVEN GETS DOWN THERE!',
            '<18>{#p/papyrus}{#f/6}TOTALLY NORMAL!!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* So you're saying that's NOT normal, right?",
                    '<18>{#p/papyrus}{#f/0}RIGHT.',
                    '<25>{#p/undyne}{#f/14}* ... at this rate, you\'ll be a \"sarcasm sensei\" in no time!',
                    "<18>{#p/papyrus}{#f/4}I'M LOOKING FORWARD TO USING IT ON MY BROTHER.",
                    "<25>{#p/undyne}{#f/1}* Careful now.\n* He's the de-facto WIZARD of sarcasm.",
                    "<25>{#p/undyne}{#f/17}* If you want any chance of besting him, you've gotta train like CRAZY!",
                    "<18>{#p/papyrus}{#f/4}OH, BELIEVE ME, UNDYNE, I'M READY.",
                    "<25>{#p/undyne}{#f/8}* I hope you're not being sarcastic about that!"
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/6}I'M DEFINITELY NOT BEING SARCASTIC!!" ]
               : [ "<19>{#p/papyrus}{#f/4}SARCASM TRAINING'S -TOTALLY- THE EASIEST THING EVER." ]
      ),
      f_muffet: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}I WAS SURFING THE WEB THE OTHER DAY...',
            "<18>{#p/papyrus}{#f/6}TURNS OUT SPIDER SILK IS STRONGER THAN YOU'D THINK!",
            '<18>{#p/papyrus}{#f/4}WHICH WEB WAS I SURFING, YOU ASK?',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}... YOU PROBABLY DON'T WANT TO KNOW." ]
               : [
                    "<25>{#p/undyne}{#f/17}* ... seriously?\n* This is the second time you've done this!",
                    '<18>{#p/papyrus}{#f/6}I WANTED TO KNOW HOW THE STRINGS WERE ATTACHED!',
                    '<25>{#p/undyne}{#f/8}* That was your excuse last time!!',
                    '<18>{#p/papyrus}{#f/6}BUT WHAT ABOUT MY CURIOSITY!!!',
                    '<25>{#p/undyne}{#f/12}* ... maybe leave the web-crawling to spiders for now.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}IT WASN'T ON THE COMPUTER, THAT'S FOR SURE." ]
               : [ '<18>{#p/papyrus}{#f/4}PERHAPS I SHOULD GET A ROBOT TO CRAWL THE WEB...' ]
      ),
      f_shyren: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/5}I'VE HEARD A VERY SHY MONSTER LIVES HERE...",
            '<18>{#p/papyrus}{#f/0}WELL. IF YOU WANT SOMEONE TO OPEN UP...',
            '<18>{#p/papyrus}{#f/9}YOU SHOULD ENGAGE THEM IN COMBAT!',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}A SOUND STRATEGY FOR ANY OCCASION.' ]
               : [
                    "<25>{#p/undyne}{#f/8}* And don't forget to get loud in their face!!",
                    '<18>{#p/papyrus}{#f/6}... THAT MIGHT BE A BIT MUCH.',
                    '<25>{#p/undyne}{#f/14}* Well, it worked on the ELITE squad yesterday, so...',
                    '<18>{#p/papyrus}{#f/4}...',
                    "<18>{#p/papyrus}{#f/4}I'M STARTING TO RECONSIDER MY CAREER PATH...",
                    "<25>{#p/undyne}{#f/17}* No, wait!!\n* I wasn't talking about ALL the guards!",
                    '<18>{#p/papyrus}{#f/6}AND WHEN I -DO- BECOME AN ELITE SQUAD MEMBER???',
                    "<25>{#p/undyne}{#f/14}* ... I'll just be nice to you specifically!",
                    "<18>{#p/papyrus}{#f/7}BUT THAT WOULDN'T BE FAIR TO THE OTHER MEMBERS!!",
                    '<25>{#p/undyne}{#f/17}* I give up!!'
                 ])
         ],
         () => [ '<18>{#p/papyrus}{#f/0}HUM HUM HUM...', ...(solo() ? [] : [ '<25>{#p/undyne}{#f/12}* Hum hum hum...' ]) ]
      ),
      f_statue: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}A MYSTERIOUS STATUE...',
            '<18>{#p/papyrus}{#f/4}OUT IN THE MIDDLE OF THE FACTORY...',
            '<18>{#p/papyrus}{#f/6}... I WONDER WHAT THIS COULD MEAN!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/16}* That statue's been out there forever...",
                    '<25>{#p/undyne}{#f/17}* ... but nobody seems to know where it came from!',
                    '<25>{#p/undyne}{#f/1}* It has a cool music box inside, though.'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}BREAKING NEWS.',
                    '<18>{#p/papyrus}{#f/4}MYSTERIOUS STATUE IS MYSTERIOUS.',
                    "<18>{#p/papyrus}{#f/6}WHO WOULD'VE THOUGHT!!"
                 ]
               : [
                    '<25>{#p/undyne}{#f/11}* Some say the statue also contains a SECOND music box...',
                    "<25>{#p/undyne}{#f/12}* ... but I'll believe it when I hear it."
                 ]
      ),
      f_piano: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}IF ONLY THERE EXISTED A ROOM...',
            '<18>WHERE I COULD EXPRESS MYSELF THROUGH MUSIC.',
            '<18>A LONELY ROOM, SEPARATED FROM CIVILIZATION...',
            '<18>WITH NAUGHT BUT A SINGLE PIANO AT ITS CENTER...',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}... OH WAIT!\nTHAT'S THIS ROOM!" ]
               : [
                    '<25>{#p/undyne}{#f/10}* And maybe that piano would be used to solve puzzles...',
                    '<25>{#p/undyne}{#f/10}* Or practice combat by fighting the ivories...',
                    '<25>{#p/undyne}{#f/10}* Or play a certain melody that reminds you of someone special...',
                    '<25>{#p/undyne}{#f/7}* ... if only you were in that room RIGHT NOW!!',
                    '<18>{#p/papyrus}{#f/6}I WAS GOING TO MENTION THAT!!'
                 ])
         ],
         [ '<18>{#p/papyrus}NEXT TIME I COME HERE, I SHOULD WRITE A MUSICAL.', '<18>IT\'D BE CALLED \"STORY OF PAPYRUS.\"' ]
      ),
      f_artifact: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}I DON'T THINK I'VE EVER BEEN IN THIS ROOM BEFORE.",
            "<18>{#p/papyrus}{#f/6}WHAT'S IT LIKE?\nARE THERE UNTOLD TREASURES ABOUND?",
            '<18>{#p/papyrus}{#f/4}FOR THE RECORD, THAT QUESTION WAS RHETORICAL.',
            "<18>{#p/papyrus}{#f/7}I'D RATHER FIND OUT FOR MYSELF!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* Great to see you've still got a sense of adventure in you.",
                    '<18>{#p/papyrus}{#f/9}OF COURSE!!\nI, THE GREAT PAPYRUS...',
                    '<18>{#p/papyrus}{#f/9}HAVE A SENSE OF ADVENTURE BEYOND COMPARE!',
                    "<18>{#p/papyrus}{#f/4}WELL, THAT'S NOT -ENTIRELY- TRUE.",
                    '<18>{#p/papyrus}{#f/6}SANS FINDS A NEW WAY TO EXPLORE THE COUCH EVERY DAY.',
                    '<25>{#p/undyne}{#f/17}* ... ah.',
                    "<25>{#p/undyne}{#f/17}* So that's why that couch is so messy."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}NO SPOILERS!!!' ]
               : [ "<18>{#p/papyrus}{#f/4}AND THAT'S NOT EVEN HIS MOST IMPRESSIVE FEAT." ]
      ),
      f_path: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}KEEP GOING, AND YOU'LL WITNESS THE CITADEL.",
            "<18>{#p/papyrus}{#f/4}YOU CAN'T NORMALLY SEE IT FROM SO FAR AWAY, BUT...",
            '<18>{#p/papyrus}{#f/5}SOMETHING ABOUT THAT ONE ROOM...',
            '<18>... MAKES IT POSSIBLE TO VIEW...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* Maybe it\'s one of those \"spatial distortions\" Alphys talks about.',
                    '<25>{#p/undyne}{#f/1}* The ones that can slow down time if you get too close.',
                    '<18>{#p/papyrus}{#f/5}THE HUMAN SHOULD BE CAREFUL, THEN!',
                    '<18>{#p/papyrus}{#f/6}IF TIME WERE TO SLOW DOWN FULLY, COULD YOU ESCAPE??',
                    "<25>{#p/undyne}{#f/17}* ... there's nothing a little brute force can't solve!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}ENJOY THE VIEW WHILE YOU STILL CAN!' ]
               : [ '<18>{#p/papyrus}{#f/6}JUST BE CAREFUL!' ]
      ),
      f_view: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}YOU MUST BE A VERY GREAT MULTITASKER!',
            "<18>{#p/papyrus}{#f/4}IT'D TAKE ONE TO WANT TO CALL SOMEONE...",
            '<18>{#p/papyrus}{#f/5}WITH A VIEW LIKE -THAT- NEARBY.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* During human-chasing practice with the ELITE squad...',
                    '<25>{#p/undyne}{#f/17}* At least one guard ALWAYS gets distracted by it.',
                    "<25>{#p/undyne}{#f/10}* Whether it's Cozmo, debating the nature of aesthetics...",
                    '<25>{#p/undyne}{#f/10}* Or Terrestria obsessing over the \"beauty of the universe...\"',
                    "<25>{#p/undyne}{#f/9}* ... well, actually, it's just those two.",
                    '<18>{#p/papyrus}{#f/5}BUT... AS THE OLDEST MONSTERS ALIVE...',
                    '<18>{#p/papyrus}{#f/6}THEY SHOULD BE GREAT AT DOING THEIR JOB!!',
                    "<26>{#p/undyne}{#f/16}* They ARE good at their job, but... they don't take training seriously.",
                    "<18>{#p/papyrus}{#f/5}OH.\nWELL, THAT'S KIND OF UNFORTUNATE.",
                    "<25>{#p/undyne}{#f/1}* Lucky enough, no fancy view can catch THIS captain's eye!!",
                    '<25>{#p/undyne}{#f/12}* Which is why it usually falls to me to keep them in check.',
                    '<18>{#p/papyrus}{#f/6}WHILE THAT DOES SOUND HARD...',
                    "<18>{#p/papyrus}{#f/9}... I KNOW YOU'RE MORE THAN CAPABLE OF DOING IT!",
                    '<25>{#p/undyne}{#f/14}* Thanks, Papyrus.'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/7}WHAT ARE YOU DOING TRYING TO CALL ME?',
                    "<18>{#p/papyrus}{#f/7}YOU'VE GOT FANCY THINGS TO ADMIRE!"
                 ]
               : [
                    "<25>{#p/undyne}{#f/1}* Fortunately for you, you're not IN the Royal Guard, punk!",
                    '<25>{#p/undyne}{#f/12}* So...\n* Feel free to get as distracted as you like.'
                 ]
      ),
      f_plank: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/5}UNFORTUNATELY, THERE'S NOT A LOT TO SAY HERE.",
            '<18>{#p/papyrus}{#f/4}APART FROM THE BRIDGE TO NOWHERE I HEARD ABOUT...',
            '<18>{#p/papyrus}{#f/5}IT REALLY IS JUST A DEAD END.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* What bridge?\n* The one I cut down earlier??',
                    '<25>{#p/undyne}{#f/8}* THAT was just a piece of the old bridge in the factory!',
                    '<18>{#p/papyrus}{#f/6}THE ONE THEY FINALLY REPLACED JUST TODAY??',
                    '<18>{#p/papyrus}{#f/5}WOWIE... I THOUGHT THAT WAS GONE FOREVER...',
                    '<25>{#p/undyne}{#f/14}* Nope.\n* I kept it safe!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}PERHAPS YOU COULD CALL BACK SOMEWHERE ELSE?' ]
               : [ '<18>{#p/papyrus}{#f/4}SO THERE -WAS- SOMETHING TO SAY HERE...' ]
      ),
      f_tunnel: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}AH... THE TRASH DEPOSITORY.',
            '<18>{#p/papyrus}{#f/0}A GREAT PLACE TO DISPOSE OF UNDESIRABLE ITEMS.',
            '<18>{#p/papyrus}{#f/4}OR, ALTERNATIVELY...',
            '<18>{#p/papyrus}{#f/9}A GREAT PLACE TO FIND TREASURE AT NO PERSONAL COST!',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}I COME HERE WITH SANS SOMETIMES TO DO THAT.' ]
               : [
                    "<25>{#p/undyne}{#f/12}* Are you sure that's... uh, safe?",
                    "<25>{#p/undyne}{#f/10}* I get that one's trash is another's treasure, but-",
                    '<18>{#p/papyrus}{#f/0}IF BRATTY AND CATTY CAN DO IT OUT IN SPACE...',
                    '<18>{#p/papyrus}{#f/0}SANS AND I CAN DO IT IN ONE SINGLE ROOM.',
                    "<25>{#p/undyne}{#f/1}* When you put it like that, it doesn't seem so bad.",
                    '<25>{#p/undyne}{#f/17}* Just be sure to get out before the disposal box activates!',
                    "<18>{#p/papyrus}{#f/6}OF COURSE!!\nWE WOULDN'T WANT TO BE VAPORIZED!!"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}LAST TIME, WE EVEN MANAGED TO FIND A BONE PAINTING...',
                    '<18>{#p/papyrus}{#f/5}THAT WAS ONLY SLIGHTLY DIRTY!!'
                 ]
               : [ "<18>{#p/papyrus}{#f/6}PERHAPS IT'D BE BEST FOR YOU TO LEAVE THIS ROOM." ]
      ),
      f_chute: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}ON THE FLOOR HERE LAY THREE TABLETS.',
            '<18>{#p/papyrus}{#f/0}ONE ABOUT STARLING FLOWERS, ONE ABOUT WORMHOLES...',
            '<18>{#p/papyrus}{#f/4}AND ONE CONTAINING SCI-FI ANIME.',
            "<18>{#p/papyrus}{#f/0}PERSONALLY, -I- THINK THEY'RE ALL CONNECTED.",
            '<18>{#p/papyrus}{#f/5}AS IN, THE FLOWERS GOT HERE VIA THE WORMHOLES...',
            '<18>{#p/papyrus}{#f/5}AS FORETOLD BY THAT SCI-FI ANIME SERIES.',
            "<18>{#p/papyrus}{#f/6}IT'S THE ONLY WAY TO EXPLAIN IT ALL AT ONCE!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* So that's your theory.",
                    '<25>{#p/undyne}{#f/14}* That all of those tablets are connected in this way.',
                    '<18>{#p/papyrus}{#f/0}YES.',
                    '<25>{#p/undyne}{#f/1}* Okay.\n* Just one question...',
                    "<25>{#p/undyne}{#f/7}* WHERE's the PROOF!?",
                    '<18>{#p/papyrus}{#f/6}IN THE ANIME!!',
                    '<18>{#p/papyrus}{#f/4}THE SCI-FI ANIME.',
                    "<18>{#p/papyrus}{#f/4}WHICH I HAVE YET TO WATCH, BECAUSE I'M TOO BUSY.",
                    '<25>{#p/undyne}{#f/17}* Too busy for sci-fi!?',
                    "<25>{#p/undyne}{#f/8}* You're kidding!!"
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/5}ONE DAY, HUMAN...', '<18>{#p/papyrus}{#f/5}ONE DAY, I SHALL PROVE MY THEORIES RIGHT.' ]
      ),
      f_dummy: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}DON'T LOOK PAST THE HIDDEN PATH...",
            '<18>{#p/papyrus}{#f/5}CLOSE YOUR EYES, WALK STRAIGHT...',
            "<18>{#p/papyrus}{#f/5}AND FACE THE TEMMIES' WRATH.",
            "<18>{#p/papyrus}{#f/4}... IT'S A RIDDLE I'VE HEARD ABOUT THIS PLACE.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Hmm... \"don\'t look past the hidden path...\"',
                    '<25>{#p/undyne}{#f/11}* What hidden path?',
                    '<25>{#p/undyne}{#f/13}* And then... \"close your eyes...\"',
                    '<25>{#p/undyne}{#f/12}* Okay, no no no, hold it right there.',
                    "<26>{#p/undyne}{#f/8}* If I can't SEE anything, how am I supposed to FIND anything!",
                    '<18>{#p/papyrus}{#f/4}SADLY, RIDDLES DO TEND TO BE THIS WAY.',
                    '<18>{#p/papyrus}{#f/7}A BUNCH OF MOSTLY USELESS ADVICE!'
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/4}DO -YOU- KNOW HOW TO SOLVE THIS RIDDLE?' ]
      ),
      f_hub: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}IF YOU SEE A SHOP, YOU SHOULD STOP...',
            '<18>{#p/papyrus}{#f/4}DROP, AND ROLL...',
            '<18>{#p/papyrus}{#f/0}INTO SOME GREAT DEALS!!',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/9}BECAUSE WE'RE HAVING A FIRE SALE!!",
                    '<18>{#p/papyrus}{#f/5}AT MY IMAGINARY STORE, WHICH SELLS FLAMES.'
                 ]
               : [
                    "<25>{#p/undyne}{#f/1}* Like the ones at Gerson's shop?",
                    '<25>{#p/undyne}{#f/8}* I buy stuff from him ALL the time!',
                    "<18>{#p/papyrus}{#f/6}WHAT'S SO SPECIAL ABOUT HIS DEALS?",
                    '<25>{#p/undyne}{#f/17}* Are you kidding?\n* Gerson survived the human- monster war!',
                    "<25>{#p/undyne}{#f/14}* He's a REAL hero.",
                    '<18>{#p/papyrus}{#f/4}I WAS GOING TO SAY SOMETHING ELSE, BUT OKAY.',
                    '<18>{#p/papyrus}{#f/0}HOORAY FOR GERSON!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}IT'S YET ANOTHER DREAM OF MINE..." ]
               : [
                    "<18>{#p/papyrus}{#f/0}IT'S IMPORTANT TO ACKNOWLEDGE THE HEROES AMONGST US.",
                    '<18>{#p/papyrus}{#f/5}WITHOUT THEM, WE MIGHT NOT EVEN BE HERE TODAY...'
                 ]
      ),
      f_undyne: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}THAT'S UNDYNE'S HOUSE.",
            ...(SAVE.data.n.plot < 48 || world.trueKills > 0
               ? [ '<18>{#p/papyrus}{#f/9}THE IDEAL PLACE TO LEARN HOW TO COOK!' ]
               : SAVE.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/4}YOU KNOW, THE ONE WITH THE SKELETON IN FRONT.' ]
               : SAVE.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/9}DON'T HESITATE TO COME IN!" ]
               : SAVE.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/6}... YOU'RE STILL AT UNDYNE'S HOUSE??",
                    "<18>{#p/papyrus}{#f/5}SHE, UH, HASN'T EVEN MET UP WITH ME YET.",
                    '<18>{#p/papyrus}{#f/4}MAYBE LEAVE THE ROOM AND...',
                    '<18>{|}{#f/1}... {%}',
                    '<25>{#p/undyne}{#f/12}* Huff... puff...!',
                    "<25>{#p/undyne}{#f/8}* YEAH!!!\n* That's MY HOUSE!!!",
                    "<18>{#p/papyrus}{#f/6}UH, HI UNDYNE!\nHOW'D YOU GET HERE SO FAST?",
                    '<25>{#p/undyne}{#f/17}* I ran.',
                    '<18>{#p/papyrus}{#f/1}WHAT??\nTHEN YOU MUST HAVE SOMETHING...',
                    '<18>{#p/papyrus}{#f/9}EXTREMELY COOL TO SAY ABOUT YOUR HOUSE!!!',
                    '<25>{#p/undyne}{#f/14}* Nope!!!'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}AT LEAST IT WAS, UNTIL...',
                    '<25>{#p/undyne}{#f/12}* ... we set it on fire.',
                    '<25>{#p/undyne}{#f/8}* BUT WHO CARES??',
                    '<25>{#p/undyne}{#f/14}* Hanging out with Papyrus is the BEST!'
                 ])
         ],
         () =>
            SAVE.data.n.plot < 48 || world.trueKills > 0
               ? [
                    '<18>{#p/papyrus}{#f/0}PRO TIP: WHEN COOKING WITH UNDYNE...',
                    '<18>{#p/papyrus}{#f/4}IF SHE STARTS ASSAULTING THE VEGGIES...',
                    "<18>{#p/papyrus}{#f/5}... IT'S TIME TO BAIL."
                 ]
               : SAVE.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/0}NICE TO SEE YOU, TOO!' ]
               : SAVE.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/4}WE'RE STILL WAITING HERE, YOU KNOW..." ]
               : SAVE.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/0}I'M SURE SHE'LL COME UP WITH SOMETHING SOON.",
                    "<25>{#p/undyne}{#f/14}* Don't bet on it!"
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}JUST CALL ME THE \"HANGOUT HANDYMAN.\"',
                    '<18>{#p/papyrus}{#f/4}I MAY NOT BE ABLE TO REPAIR YOUR HOUSE...',
                    '<18>{#p/papyrus}{#f/9}BUT I CAN STILL \"FIX YOU UP\" A REALLY GREAT DAY!'
                 ]
      ),
      f_blooky: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}PERHAPS ONE DAY, I'LL LIVE THE QUIET LIFE.",
            '<18>{#p/papyrus}{#f/5}RAISING SNAILS, PRODUCING MUSIC...',
            '<18>{#p/papyrus}{#f/6}BEING SAD AND NOT LETTING ANYONE CHEER ME UP...',
            "<18>{#p/papyrus}{#f/5}ON SECOND THOUGHT, MAYBE THAT ISN'T FOR ME.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* They don't even let ME help them feel better!",
                    '<25>{#p/undyne}{#f/16}* ... guess not everyone can be made happier by hanging out with them.',
                    '<18>{#p/papyrus}{#f/5}YEAH... SANS CAN BE THE SAME WAY AT TIMES.',
                    "<18>{#p/papyrus}{#f/0}I MEAN, DON'T GET ME WRONG.\nHE'S USUALLY OKAY!",
                    '<18>{#p/papyrus}{#f/6}BUT, LIKE EVERYONE, HE HAS HIS BAD DAYS.',
                    '<25>{#p/undyne}{#f/14}* Like \"everyone,\" huh?\n* Does this \"everyone\" include Papyrus?',
                    '<18>{#p/papyrus}{#f/4}OKAY, OKAY...',
                    '<18>{#p/papyrus}{#f/0}ALMOST EVERYONE.'
                 ])
         ],
         [
            "<18>{#p/papyrus}{#f/0}ALAS, I'M MUCH MORE SUITED AS A CHEERER-UPPER.",
            '<18>{#p/papyrus}{#f/5}... RATHER THAN SOMEONE WHO NEEDS CHEERING UP.'
         ]
      ),
      f_snail: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}I'VE HEARD THERE'S A WAY TO BEAT THIS GAME...",
            '<18>{#p/papyrus}{#f/0}SOMETHING ABOUT OFFERING \"TIMELY ENCOURAGEMENT.\"',
            '<18>{#p/papyrus}{#f/5}TIMELY ENCOURAGEMENT...',
            "<18>{#p/papyrus}{#f/4}AS IF THERE'S ENCOURAGEMENT THAT -ISN'T- TIMELY.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* Yeah, sometimes it can be a little awkward...',
                    "<25>{#p/undyne}{#f/1}* But for the most part, you're right.",
                    '<18>{#p/papyrus}{#f/0}WHAT DO YOU MEAN?',
                    '<25>{#p/undyne}{#f/1}* Well... if you encourage again and again...',
                    "<25>{#p/undyne}{#f/1}* They might think you're just buttering them up.",
                    '<18>{#p/papyrus}{#f/7}WHAT!?\nI ONLY USE BUTTER FOR COOKING!',
                    "<25>{#p/undyne}{#f/16}* All I'm saying is, if you constantly encourage someone...",
                    "<25>{#p/undyne}{#f/16}* They won't even get a chance to process it.",
                    '<25>{#p/undyne}{#f/17}* So take it at a steady pace!!',
                    "<18>{#p/papyrus}{#f/4}... I'LL START PROCESSING THIS ADVICE RIGHT AWAY."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}I SUPPOSE TOO MUCH COULD BE OVERWHELMING...' ]
               : [ "<18>{#p/papyrus}{#f/6}I'LL GET BACK TO YOU WHEN I'M DONE PROCESSING!!!" ]
      ),
      f_taxi: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}HAVE YOU EVER NOTICED ANYTHING STRANGE HERE?',
            '<18>{#p/papyrus}{#f/4}I COULD SWEAR A MYSTERIOUS SONG WAS PLAYING...',
            '<18>{#p/papyrus}{#f/5}AND SOMETHING IN THE DISTANCE WAS VISIBLE, TOO...',
            "<18>{#p/papyrus}{#f/0}OH WELL.\nI'M SURE IT'S JUST MY IMAGINATION.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* Actually...\n* You're not the only one who's heard something.",
                    '<25>{#p/undyne}{#f/17}* I could have sworn there was something there, too.',
                    '<18>{#p/papyrus}{#f/5}LIKE A SOUND YOU KNOW IS IN THE ROOM WITH YOU...',
                    "<18>{#p/papyrus}{#f/4}... BUT CAN'T BE CONFIRMED WITH YOUR SENSES.",
                    "<25>{#p/undyne}{#f/1}* Yeah!!\n* That's the one!!"
                 ])
         ],
         () => [
            "<18>{#p/papyrus}{#f/0}MAYBE IT'S A SOUND FROM THE ORIGINS OF THE COSMOS.",
            '<18>{#p/papyrus}{#f/5}A LOST CALL FROM ACROSS THE STARS...',
            '<18>{#p/papyrus}{#f/5}TRACING BACK TO WHEN THE UNIVERSE BEGAN.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* And if the universe HAS no beginning??',
                    '<18>{#p/papyrus}{#f/1}N-NO...!!\nA CHALLENGE TO MY IMPECCABLE THEORY!',
                    '<18>{#p/papyrus}{#f/5}HOW WILL I EVER RECOVER MY LOST REPUTATION...'
                 ])
         ]
      ),
      f_prepuzzle: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}I OFTEN WONDER WHY THE HUMANS HAD TO TRAP US HERE.',
            '<18>{#p/papyrus}{#f/5}I GET THAT THEY WERE AFRAID OF US, BUT...',
            "<18>{#p/papyrus}{#f/6}COULDN'T THEY HAVE JUST RUN AWAY!?",
            '<18>{#p/papyrus}{#f/6}OR, EVEN BETTER, TALK TO US ABOUT IT!!',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}IT'S UNFORTUNATE THEY NEVER THOUGHT OF THOSE THINGS." ]
               : [
                    '<25>{#p/undyne}{#f/16}* Yeah, I often wonder about that too.',
                    "<25>{#p/undyne}{#f/17}* It's kind of impressive how dumb they are.",
                    "<18>{#p/papyrus}{#f/7}THEY'RE NOT DUMB!!",
                    '<18>{#p/papyrus}{#f/5}THEY JUST...',
                    "<18>{#p/papyrus}{#f/6}... WEREN'T ABLE TO THINK OF THOSE THINGS.",
                    "<25>{#p/undyne}{#f/12}* Well...\n* Maybe you're right.",
                    "<25>{#p/undyne}{#f/12}* Still doesn't make us any less trapped, though."
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/0}AT LEAST -I- WAS ABLE TO THINK OF THOSE THINGS!!' ]
      ),
      f_puzzle3: pager.create(
         0,
         ...[
            () => [
               '<18>{#p/papyrus}{#f/6}I CALL MYSELF A MASTER OF PUZZLES GALORE, BUT...',
               '<18>{#p/papyrus}{#f/5}I NEED TO COME CLEAN ABOUT THIS ONE.',
               "<18>{#p/papyrus}{#f/4}... I'VE NEVER SOLVED THIS PUZZLE FOR REALSIES.",
               "<18>{#p/papyrus}{#f/6}WAIT!!\nDON'T JUDGE ME TOO HARSHLY!!",
               '<18>{#p/papyrus}{#f/4}... THEY SHUT IT OFF BEFORE I COULD EVEN TRY.',
               ...(solo()
                  ? []
                  : [
                       "<25>{#p/undyne}{#f/17}* Even if it WASN'T shut off, do you think you'd be able to solve it??",
                       '<25>{#p/undyne}{#f/14}* Many have tried in the past, but very few have succeeded.',
                       "<18>{#p/papyrus}{#f/0}OH, I'M SURE IT WOULDN'T BE A PROBLEM.",
                       '<18>{#p/papyrus}{#f/0}I SOLVED THE OTHER PUZZLES OF THIS KIND VERY QUICKLY!',
                       '<25>{#p/undyne}{#f/14}* If by \"quickly,\" you mean several HOURS, then yes.',
                       '<18>{#p/papyrus}{#f/6}WHAT?? HOURS?',
                       '<18>{#p/papyrus}{#f/5}I SOLVED THOSE PUZZLES IN NO MORE THAN TEN SECONDS!',
                       '<25>{#p/undyne}{#f/17}* And the time you spent staring at them...?',
                       '<18>{#p/papyrus}{#f/7}... WAS JUST THE TIME SPENT WORKING OUT THE SOLUTION!!'
                    ])
            ],
            () =>
               solo()
                  ? [ '<18>{#p/papyrus}{#f/6}I KNOW, RIGHT!?\nSO UNFAIR!!' ]
                  : [
                       '<18>{#p/papyrus}{#f/0}THE LONGER YOU THINK, THE LESS YOU HAVE TO SOLVE.',
                       '<18>{#p/papyrus}{#f/9}A USEFUL TIP FOR ANY PUZZLE YOU MAY ENCOUNTER!'
                    ]
         ].map(
            lines => () =>
               SAVE.data.n.plot < 45
                  ? SAVE.data.b.f_state_password
                     ? [
                          '<18>{#p/papyrus}{#f/6}USE THE TERMINAL!!',
                          '<18>{#p/papyrus}{#f/6}NEAR THE RIGHT!!!',
                          '<18>{#p/papyrus}{#f/6}GOOD LUCK!!'
                       ]
                     : ((SAVE.data.b.f_state_password = true),
                       [
                          "<18>{#p/papyrus}{#f/4}OH... IT'S -THIS- PUZZLE, EH?",
                          "<18>{#p/papyrus}{#f/5}... YEAH.\nIT'S NOT EXACTLY THE EASIEST ONE.",
                          '<18>{#p/papyrus}{#f/9}THANKFULLY, I HAVE A SOLUTION!',
                          '<18>{#p/papyrus}{#f/0}READY?',
                          '<18>{#p/papyrus}{#f/0}YOU CAN USE IT AT THE TERMINAL NEAR THE RIGHT.',
                          '<32>{#p/human}* (Papyrus whispered something in your ear.)',
                          '<18>{#p/papyrus}{#f/6}HOPE THAT HELPS!'
                       ])
                  : lines()
         )
      ),
      f_prespear: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}IF I WERE YOU, I WOULD BE WARY OF THIS ROOM...',
            '<18>{#p/papyrus}{#f/5}UNDYNE OFTEN COMES HERE TO STAND MENACINGLY NEARBY.',
            "<18>{#p/papyrus}{#f/6}SHE'S STARTLED ME ON MORE THAN A FEW OCCASIONS!",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}EVEN IF I DID MAKE MYSELF AN EASY TARGET.' ]
               : [
                    '<25>{#p/undyne}{#f/14}* Correction.\n* I come here to PATROL and watch for humans.',
                    "<25>{#p/undyne}{#f/7}* That's my JOB.",
                    '<18>{#p/papyrus}{#f/6}WELL!!\nDO IT LESS MENACINGLY THEN!!',
                    "<25>{#p/undyne}{#f/14}* I am who I am, and there's nothing I can do to change that.",
                    '<18>{#p/papyrus}{#f/6}BUT I SAY ANYONE CAN CHANGE IF THEY JUST TRY!!',
                    "<25>{#p/undyne}{#f/17}* There's exceptions to EVERY rule!",
                    '<18>{#p/papyrus}{#f/7}THEN MY RULE IS AN EXCEPTION TO YOUR RULE!',
                    '<25>{#p/undyne}{#f/4}* ...',
                    '<25>{#p/undyne}{#f/5}* ...',
                    "<25>{#p/undyne}{#f/12}* ... okay, didn't see that one coming."
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}OH, AND THE SPEAR TRAPS THAT COME OUT OF NOWHERE.',
                    '<18>{#p/papyrus}{#f/5}WATCH OUT FOR THOSE TOO.'
                 ]
               : [ '<18>{#p/papyrus}{#f/4}WHY DO WE EVEN BOTHER ARGUING SOMETIMES...' ]
      ),
      f_spear: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THE TIME IT TAKES TO TRAVEL ACROSS THIS ROOM...',
            '<18>{#p/papyrus}{#f/5}... NEVER SEEMS TO BE THE SAME.',
            "<18>{#p/papyrus}{#f/4}SOMETIMES IT'S LONG, SOMETIMES IT'S NOT...",
            '<18>{#p/papyrus}{#f/4}AND SOMETIMES I WEAR POLKA-DOTS.',
            "<18>{#p/papyrus}{#f/0}EITHER WAY, IT DOESN'T REALLY MAKE SENSE.",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}MUCH LIKE WHAT I JUST SAID.' ]
               : [
                    "<25>{#p/undyne}{#f/12}* It's probably just a spatial disturbance.",
                    '<25>{#p/undyne}{#f/17}* I felt it earlier today, when I was chasing down the human.',
                    '<18>{#p/papyrus}{#f/4}PESKY DISTORTIONS, ALWAYS MEDDLING WITH SPACETIME...',
                    '<18>{#p/papyrus}{#f/7}WHEN WILL THEY EVER LEARN TO STOP!?',
                    "<25>{#p/undyne}{#f/1}* Well, it's not THEIR fault things get weird.",
                    '<25>{#p/undyne}{#f/14}* Spatial distortions are just a part of... well, space.',
                    '<18>{#p/papyrus}{#f/5}MY GOD... EVEN SPACE ITSELF IS IN ON IT!!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}DID I NOT MENTION THE POLKA-DOTS?' ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S A CONSPIRACY SPANNING THE WHOLE OF THE COSMOS..." ]
      ),
      f_corner: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THERE ARE PLENTY OF PLACES IN THE FACTORY...',
            '<18>{#p/papyrus}{#f/0}... WHICH ARE ONLY ACCESSIBLE VIA JUMPING.',
            '<18>{#p/papyrus}{#f/9}FOR EXAMPLE, THE TWO SIDE PATHS IN THIS VERY ROOM!',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}I'VE BEEN TOLD HUMANS CAN JUMP QUITE HIGH, SO...",
                    "<18>{#p/papyrus}{#f/0}YOU SHOULDN'T HAVE ANY ISSUE REACHING THEM."
                 ]
               : [
                    '<25>{#p/undyne}{#f/7}* And some places are only accessible via the air!',
                    '<18>{#p/papyrus}{#f/6}FOR EXAMPLE??',
                    '<25>{#p/undyne}{#f/8}* For example, the HOLE in the middle of that platform!',
                    '<18>{#p/papyrus}{#f/0}AH.',
                    ...(SAVE.data.b.f_state_kidd_betray
                       ? [
                            '<25>{#p/undyne}{#f/16}* But there was this kid who stumbled through it earlier...',
                            "<25>{#p/undyne}{#f/9}* And would've lost control if it wasn't for me.",
                            "<18>{#p/papyrus}{#f/9}... WELL!!\nIT'S A GOOD THING YOU WERE THERE!",
                            "<25>{#p/undyne}{#f/16}* Yeah, 'cause there definitely wasn't anyone else there.",
                            "<25>{#p/undyne}{#f/11}* Isn't that right, punk?",
                            '<18>{#p/papyrus}{#f/6}... HUH???'
                         ]
                       : [
                            '<25>{#p/undyne}{#f/1}* There was this kid who stumbled through it earlier, but...',
                            '<25>{#p/undyne}{#f/1}* The human rescued them before they lost control.',
                            "<18>{#p/papyrus}{#f/9}... WELL!!\nIT'S A GOOD THING THEY WERE THERE!",
                            '<18>{#p/papyrus}{#f/4}...\nWAIT A SECOND...',
                            '<18>{#p/papyrus}{#f/7}WHAT WERE -YOU- DOING THERE!?\nSTANDING AROUND!?',
                            '<25>{#p/undyne}{#f/7}The human rescued them very quickly!!'
                         ])
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/9}YOU CAN DO IT!!\nI BELIEVE IN YOU!' ]
               : SAVE.data.b.f_state_kidd_betray
               ? [ '<18>{#p/papyrus}{#f/6}PERHAPS YOU SHOULD CALL BACK SOMEWHERE ELSE.' ]
               : [ '<18>{#p/papyrus}{#f/0}I APPRECATE YOU BEING SUCH A SWIFT RESCUER OF KIDS.' ]
      ),
      f_story2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}SIGNAL STARS ARE PRETTY NEAT, HUH?',
            '<18>{#p/papyrus}{#f/5}THOUGH, THEY ONLY RESET PERIODICALLY.',
            '<18>{#p/papyrus}{#f/4}UNTIL THEN...',
            "<18>{#p/papyrus}{#f/6}WAIT, ISN'T THERE A ROOM LIKE THIS SOMEWHERE ELSE!?",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* It's easier to get lost in here than you think.",
                    '<25>{#p/undyne}{#f/4}* This one time, there was a search for a missing monster...',
                    '<25>{#p/undyne}{#f/7}* And I could have sworn the room I was in repeated!',
                    '<18>{#p/papyrus}{#f/0}LIKE HOW A SIGNAL STAR REPEATS ITS SIGNAL!',
                    '<25>{#p/undyne}{#f/10}* Not really...',
                    "<25>{#p/undyne}{#f/12}* It's more like the room got... longer, somehow.",
                    '<25>{#p/undyne}{#f/11}* ... huh.',
                    '<18>{#p/papyrus}{#f/5}... DID THE MONSTERS EVER GET FOUND?',
                    '<25>{#p/undyne}{#f/12}* Yeah, it just turned out to be some random kid.',
                    '<25>{#p/undyne}{#f/10}* I asked them where their home was, but... they...',
                    "<25>{#p/undyne}{#f/12}* ... uh, didn't have one.",
                    '<18>{#p/papyrus}{#f/6}THAT SEEMS... RATHER CONCERNING.',
                    '<25>{#p/undyne}{#f/17}* Tell me about it!!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}I SWEAR I'M JUST REPEATING MYSELF SOMETIMES." ]
               : [ "<18>{#p/papyrus}{#f/5}SOMETIMES I WONDER IF WE'RE ALL JUST GOING IN CIRCLES." ]
      ),
      f_pacing: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}THERE'S GENUINELY NOTHING TO SAY ABOUT THIS ROOM.",
            '<18>{#p/papyrus}{#f/4}ITS EXISTENCE ONLY SERVES TO MAKE YOU WALK FURTHER.',
            '<18>{#p/papyrus}{#f/5}TO MAKE EVERY STEP TOWARDS THE EXIT...',
            '<18>{#p/papyrus}{#f/4}FULL OF UTTER, UNENDING SUSPENSE.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/14}* That about sums it up.' ])
         ],
         [ '<18>{#p/papyrus}{#f/7}UTTER!\nUNENDING!!\nSUSPENSE!!!' ]
      ),
      f_battle: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}IN THIS ROOM, YOU WILL FIND UNDYNE'S GIANT TOWER.",
            '<19>{#p/papyrus}{#f/9}MADE FROM THE REMNANTS OF AN OLD ASTEROID!',
            "<18>{#p/papyrus}{#f/5}SHE'S ALWAYS POSING ATOP IT...",
            '<18>{#p/papyrus}{#f/4}MUMBLING SOMETHING TO HERSELF...',
            ...(solo()
               ? []
               : SAVE.data.b.undyne_respecc
               ? [
                    '<25>{#p/undyne}{#f/12}* Ah, right, the \"story of our people...\"',
                    "<25>{#p/undyne}{#f/1}* I didn't really bother telling it in the end.",
                    '<25>{#p/undyne}{#f/8}* The punk probably knows it already anyway!'
                 ]
               : [
                    '<25>{#p/undyne}{#f/12}* Ah, right, the \"story of our people...\"',
                    '<25>{#p/undyne}{#f/1}* Despite all the rehearsal, I just ended up going off the cuff.',
                    '<25>{#p/undyne}{#f/8}* Forget about some sappy pre-planned speech!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}I THINK IT'S SOMETHING SHE HAS TO MEMORIZE." ]
               : [ '<18>{#p/papyrus}{#f/9}FOR THE RECORD, I LOVE A GOOD PRE- PLANNED SPEECH!!' ]
      ),
      f_exit: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}THIS FLUID TANK WAS SPECIFICALLY PUT HERE...',
            '<18>{#p/papyrus}{#f/0}BECAUSE A CERTAIN ROYAL GUARD CAPTAIN...',
            "<18>{#p/papyrus}{#f/4}THINKS IT'S SAFE TO TAKE HER GIANT JETPACK...",
            '<18>{#p/papyrus}{#f/5}INTO AN AREA RIFE WITH STATIC ELECTRICITY.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}... ABSORBING IT ALL WOULD BE VERY, VERY DANGEROUS!!' ]
               : [
                    "<25>{#p/undyne}{#f/17}* Don't give me THAT!!\n* I was in a hurry!",
                    "<18>{#p/papyrus}{#f/4}YOU'VE BEEN IN A LOT OF HURRIES...",
                    "<25>{#p/undyne}{#f/7}* You think I don't know that!?!?",
                    '<18>{#p/papyrus}{#f/4}... YET YOU STILL GET INTO THEM ANYWAY.',
                    '<25>{#p/undyne}{#f/1}* Facing danger head-on is a part of being in the Royal Guard.',
                    "<18>{#p/papyrus}{#f/6}BUT YOU DON'T HAVE TO RISK YOUR LIFE??",
                    '<25>{#p/undyne}{#f/12}* No risk, no reward!',
                    "<18>{#p/papyrus}{#f/7}THAT'S THE WEIRDEST THING I'VE EVER HEARD!!"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}I ONLY HAVE ONE WORD FOR THAT GUARD CAPTAIN.',
                    '<18>{#p/papyrus}{#f/4}AND THAT WORD IS \"WATCH WHERE YOU\'RE GOING.\"'
                 ]
               : [ "<18>{#p/papyrus}{#f/5}I WORRY FOR UNDYNE'S SAFETY." ]
      ),
      f_napstablook: pager.create(
         0,
         () =>
            SAVE.data.n.plot <= 48.1 && SAVE.data.n.state_foundry_blookdate < 2
               ? [
                    "<18>{#p/papyrus}{#f/0}SO YOU'RE MAKING FRIENDS WITH A GHOST.",
                    '<18>{#p/papyrus}{#f/1}IS THERE NOTHING BEYOND YOUR GRASP OF FRIENDSHIP!?!?',
                    ...(solo()
                       ? [ '<18>{#p/papyrus}{#f/6}YOUR POWER LEVEL IS ALMOST FRIGHTENING!!' ]
                       : [
                            "<25>{#p/undyne}{#f/14}* So that's how they were able to befriend me.",
                            "<25>{#p/undyne}{#f/17}* You could have WARNED me, Papyrus!!\n* There's no escape now!",
                            '<18>{#p/papyrus}{#f/6}FRIENDSHIP IS NOT THE KIND OF SHIP YOU BAIL OUT ON!!'
                         ])
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}HMM...',
                    '<18>{#p/papyrus}{#f/4}WHY DO I HEAR BOSS MUSIC?',
                    ...(solo()
                       ? [
                            '<18>{#p/papyrus}{#f/0}... SORRY, DID I SAY \"BOSS\" MUSIC?',
                            '<18>{#p/papyrus}{#f/5}I MEANT \"BOSSA NOVA.\"'
                         ]
                       : [
                            "<25>{#p/undyne}{#f/8}* Because I'M here, silly!",
                            '<18>{#p/papyrus}{#f/6}OF COURSE!!\nHOW COULD I FORGET!!'
                         ])
                 ],
         () =>
            SAVE.data.n.plot <= 48.1 && SAVE.data.n.state_foundry_blookdate < 2
               ? solo()
                  ? [ '<18>{#p/papyrus}{#f/5}JUST WATCH OUT FOR THE ECTOPLASM.' ]
                  : [
                       "<18>{#p/papyrus}{#f/5}AT LEAST SHE'S LEARNED HER LESSON BY NOW...",
                       '<25>{#p/undyne}{#f/14}* Yeah... totally!'
                    ]
               : solo()
               ? [ '<18>{#p/papyrus}{#f/9}THAT GHOST HAS LOADS OF MUSIC ON THEIR STEREO!' ]
               : [ '<18>{#p/papyrus}{#f/0}BOSSY MUSIC FOR A BOSSY FISH LADY.', '<25>{#p/undyne}{#f/8}* Pretty much!!' ]
      ),
      f_hapstablook: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/6}HUH?\nWHERE ARE YOU?',
            "<18>{#p/papyrus}{#f/5}I'VE... NEVER BEEN IN HERE BEFORE.",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}NOR HAVE I... SEEN ANYONE ELSE HERE, EITHER.' ]
               : [
                    '<25>{#p/undyne}{#f/14}* ... yeah, that house has been abandoned for a long time.',
                    '<25>{#p/undyne}{#f/17}* Since before I was born, in fact!',
                    '<18>{#p/papyrus}{#f/6}HOW STRANGE!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}TO BE HONEST, I'M NOT SURE I WANT TO KNOW WHY..." ]
               : [ '<18>{#p/papyrus}{#f/5}TIME REALLY DOES FLY BY, HUH?', '<25>{#p/undyne}{#f/14}* That it does!' ]
      ),
      a_start: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}SO YOU'RE IN AERIALIS NOW, HUH?",
            "<18>{#p/papyrus}{#f/0}GUESS I'M NOT THE ONLY ONE WHO LIKES DECORATIVE SPIRES.",
            "<18>{#p/papyrus}{#f/4}EXCEPT... THEY'RE NOT JUST DECORATIVE.",
            '<18>{#p/papyrus}{#f/4}HUNDREDS OF PEOPLE LIVE THERE.',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}STILL, DOESN'T STOP THEM FROM BEING DECORATIVE!" ]
               : [
                    '<25>{#p/undyne}{#f/14}* Even Dr. Alphys used to live in one of those things.',
                    '<25>{#p/undyne}{#f/1}* With her childhood friends, Bratty and Catty...',
                    '<25>{#p/undyne}{#f/1}* She told me about this when she first became royal scientist.',
                    "<18>{#p/papyrus}{#f/0}OOH, I'M CURIOUS!\nI'LL ASK HER ABOUT IT LATER.",
                    '<25>{#p/undyne}{#f/12}* You do that.\n* I THINK she likes talking about it...?'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}THE ONE IN THE MIDDLE IS MY FAVORITE.' ]
               : [ '<18>{#p/papyrus}{#f/5}THE VIEW FROM A SPIRE HOUSE MUST BE BREATHTAKING...' ]
      ),
      a_lab_entry: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}AH, THE LAB.\nA GREAT PLACE TO HANG OUT!',
            '<18>{#p/papyrus}{#f/0}ESPECIALLY WHEN DR. ALPHYS IS AROUND.',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}SHE REALLY LOVES TALKING ABOUT \"SCI-FI\" STUFF...',
                    "<18>{#p/papyrus}{#f/9}SO IT'S A GOOD THING I DO TOO!"
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* Alphys is... always at the lab, Papyrus.',
                    '<26>{#f/17}* Her \"house\" is that purple cube on the upper floor.',
                    "<26>{#f/16}* Don't ask me how it works, because even though she told me...",
                    "<26>{#f/12}* I don't think either of us would understand it.",
                    '<18>{#p/papyrus}{#f/4}POINT TAKEN.',
                    '<18>{#p/papyrus}{#f/0}SO HOW DOES IT WORK?',
                    '<25>{#p/undyne}{#f/17}* ...',
                    "<25>{#p/undyne}{#f/14}* I'll tell you later."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}SHE DOES HAVE A HABIT OF SPOILING THINGS, THOUGH.' ]
               : [ "<25>{#p/undyne}{#f/8}* I'll tell you later!!!", '<18>{#p/papyrus}{#f/6}I KNOW!!!' ]
      ),
      a_lab_main: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}THE LAST TIME I WAS HERE...',
            solo()
               ? '<18>{#p/papyrus}{#f/0}... WAS JUST THIS WEEK, TO HANG OUT WITH DR. ALPHYS!'
               : '<18>{#p/papyrus}{#f/0}... WAS EARLIER TODAY, ON OUR WAY TO THE REC CENTER!',
            '<18>{#p/papyrus}{#f/5}BUT WHEN I WAS YOUNGER, SANS USED TO TAKE ME THERE.',
            '<18>{#p/papyrus}{#f/5}SO MANY SCIENTIFIC MARVELS TO BE MARVELLED AT...',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/6}IT'S A SHAME MORE PEOPLE DON'T TAKE AN INTEREST!" ]
               : [
                    '<18>{#p/papyrus}{#f/0}WHAT DO YOU THINK, UNDYNE?',
                    '<25>{#p/undyne}{#f/1}* What do I think?\n* Well...',
                    '<25>{#p/undyne}{#f/14}* The ice cream machine makes REALLY good ice cream.',
                    "<18>{#p/papyrus}{#f/4}... THAT'S IT?",
                    '<25>{#p/undyne}{#f/20}* I guess it IS cool how Alphys can track the human like that...',
                    '<18>{#p/papyrus}{#f/0}OH, YEAH!\nSHE CAN TRACK OTHER PEOPLE, TOO!',
                    '<25>{#p/undyne}{#f/13}* ...',
                    '<25>{#p/undyne}{#f/7}* AM I BEING TRACKED RIGHT NOW???'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}OH YEAH, I FORGOT TO MENTION...',
                    '<18>{#p/papyrus}{#f/0}MY BROTHER USED TO BE A LAB ASSISTANT.',
                    "<18>{#p/papyrus}{#f/6}I STILL DON'T KNOW WHY HE QUIT...",
                    '<18>{#p/papyrus}{#f/5}SINCE HE ENJOYED THE JOB SO MUCH.'
                 ]
               : [
                    '<25>{#p/undyne}{#f/7}* I am GOING to kill her.',
                    "<18>{#p/papyrus}{#f/5}BUT YOU DON'T EVEN KNOW IF SHE TRACKED YOU YET!",
                    "<25>{#p/undyne}{#f/8}* ... and you think she WOULDN'T do that!?",
                    "<18>{#p/papyrus}{#f/6}I DON'T KNOW!!",
                    "<25>{#p/undyne}{#f/14}* Don't worry, I'm not LITERALLY going to kill her.",
                    '<25>{#p/undyne}{#f/17}* Just metaphorically.',
                    "<18>{#p/papyrus}{#f/4}... WELL THAT'S ALRIGHT, THEN."
                 ]
      ),
      a_lab_upstairs: pager.create(
         0,
         () =>
            SAVE.data.b.water
               ? [
                    '<18>{#p/papyrus}{#f/5}THOSE RECYCLE BINS ARE NEVER ACTUALLY USED TO RECYCLE.',
                    "<18>{#p/papyrus}{#f/4}IF THEY WERE, ALPHYS WOULN'T HAVE PLANS...",
                    '<18>{#p/papyrus}{#f/5}FOR A MACHINE THAT SEPARATES ALL THE TRASH INSIDE.',
                    '<18>{#p/papyrus}{#f/6}FOR EXAMPLE, ELECTRO-DAMPENING FLUID!',
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/17}* Are they seriously still holding a cup?',
                            "<25>{#p/undyne}{#f/8}* You've gotta be KIDDING me!!",
                            "<18>{#p/papyrus}{#f/4}JUST BE GLAD THEY'RE NOT DRINKING IT.",
                            '<25>{#p/undyne}{#f/16}* Yeah, that might be kinda bad for them.',
                            "<25>{#p/undyne}{#f/14}* It's harmless for monsters, though!"
                         ])
                 ]
               : [
                    "<18>{#p/papyrus}{#f/0}THERE'S THIS ODD MACHINE IN THE LAB...",
                    '<18>{#p/papyrus}{#f/0}I HEARD ALPHYS USES IT TO MAKE ICE CREAM.',
                    '<18>{#p/papyrus}{#f/4}... WHICH SHE NO DOUBT EATS BINGING SCI-FI ANIME.',
                    ...(solo()
                       ? []
                       : [
                            "<25>{#p/undyne}{#f/17}* What??\n* She hasn't invited ME to any TV marathons...",
                            '<18>{#p/papyrus}{#f/4}HMM...',
                            '<18>{#p/papyrus}{#f/0}OH, I KNOW!',
                            '<18>{#p/papyrus}{#f/9}YOU JUST HAVE TO \"BREAK THE ICE CREAM!\" WITH HER!',
                            '<25>{#p/undyne}{#f/13}* ... what?',
                            '<18>{#p/papyrus}{#f/0}BREAK THE ICE CREAM!',
                            "<25>{#p/undyne}{#f/14}* That's so bad, I kind of love it."
                         ])
                 ],
         () => [
            '<18>{#p/papyrus}{#f/0}SPEAKING OF FOOD AND DRINK...',
            '<18>{#p/papyrus}{#f/0}I HEARD METTATON ONCE WANTED TO OPEN A FOOD SHOP.',
            '<18>{#p/papyrus}{#f/4}THE FEATURED ITEM WAS CALLED \"NEO ENERGY.\"',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}I DON'T KNOW WHAT IT MEANS." ]
               : [
                    '<25>{#p/undyne}{#f/12}* Sounds like some cheap knockoff brand.',
                    "<18>{#p/papyrus}{#f/7}WHAT??\nMETTATON WOULDN'T DO THAT!"
                 ])
         ]
      ),
      a_lab_downstairs: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THOSE FANCY DRINKS IN THE VENDING MACHINE...',
            '<18>{#p/papyrus}{#f/0}I KEEP MEANING TO TRY THEM, BUT...',
            '<18>{#p/papyrus}{#f/4}THE MACHINE SEEMS TO BE MISSING A DISPENSE FUNCTION.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/8}* If they're not coming out, just shake the entire box!",
                    "<18>{#p/papyrus}{#f/0}I'D RATHER FIX THE MACHINE PROPERLY, THANK YOU.",
                    "<25>{#p/undyne}{#f/1}* Shaking usually works just fine.\n* It's my go-to fix.",
                    '<18>{#p/papyrus}{#f/4}MAYBE YOU COULD TRY SHAKING UP MY CAREER, THEN.',
                    "<25>{#p/undyne}{#f/14}* Nah, that's fine just the way it is."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}MAYBE I'LL SETTLE FOR THE RED SODA ON THE TABLE." ]
               : [
                    '<25>{#p/undyne}{#f/1}* In addition to shaking...',
                    '<25>{#p/undyne}{#f/14}* That super-strong heat tape is my OTHER go-to fix.',
                    '<18>{#p/papyrus}{#f/0}OH YEAH, THAT STUFF CAN FIX ANYTHING.',
                    '<18>{#p/papyrus}{#f/4}... WELL, ALMOST ANYTHING.',
                    "<25>{#p/undyne}{#f/7}* It's FINE just the WAY IT IS!!"
                 ]
      ),
      a_lab_virt: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}IT'S A SHAME THE VIRTUALASIUM ISN'T OPEN ALL THE TIME.",
            "<18>{#p/papyrus}{#f/7}THINK OF ALL THE FUN I'M LOSING OUT ON RIGHT NOW!",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}... SUCH A PITY.',
                    "<18>{#p/papyrus}{#f/6}I CAN'T EVEN RUN MY WORLD-FAMOUS RESTAURANT!!"
                 ]
               : [
                    '<25>{#p/undyne}{#f/7}* \"Fun\" isn\'t exactly the word I\'d use.',
                    '<18>{#p/papyrus}{#f/5}CAN YOU REALLY BLAME A SKELETON SUCH AS MYSELF...',
                    '<18>{#p/papyrus}{#f/6}FOR WANTING TO RUN A WORLD-FAMOUS RESTAURANT??',
                    '<25>{#p/undyne}{#f/17}* That kind of thing can be stressful, Papyrus.',
                    '<18>{#p/papyrus}{#f/4}SAYS THE CAPTAIN OF THE ROYAL GUARD.',
                    '<25>{#p/undyne}{#f/14}* Captaining the Royal Guard is one thing.',
                    '<25>{#p/undyne}{#f/7}* Running a restaurant is something else ENTIRELY!'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}OH YEAH, ABOUT THE RESTAURANT...',
            '<18>{#p/papyrus}{#f/9}IT HAPPENS TO BE A GIANT SPACESHIP!',
            '<18>{#p/papyrus}{#f/4}POWERED BY MARINARA SAUCE.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/14}* ... that checks out.' ])
         ]
      ),
      a_path1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}I HEARD AERIALIS USED TO BE A STAGING AREA.',
            '<18>{#p/papyrus}{#f/5}THEY WERE GOING TO BUILD SO MANY COOL THINGS, BUT...',
            '<18>{#p/papyrus}{#f/4}AFTER THE LAB WAS DONE, THEY RAN OUT OF PURPLE.',
            '<18>{#p/papyrus}{#f/4}TRULY, A GIANT LEAP BACKWARDS FOR PAINT-KIND.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* You know they could've just made more of it, right?",
                    '<25>{#p/undyne}{#f/7}* The REAL reason they quit is because Mettaton took over!!',
                    "<18>{#p/papyrus}{#f/0}YOU SAY THAT LIKE IT'S A BAD THING.",
                    '<25>{#p/undyne}{#f/17}* ...',
                    '<25>{#p/undyne}{#f/17}* He CAN be a bit overbearing at times.',
                    "<18>{#p/papyrus}{#f/0}OH, I KNOW.\nTHAT'S WHY I DON'T BLAME THEM.",
                    '<18>{#p/papyrus}{#f/4}FEW CAN WITHSTAND HIS OVERPOWERING BEAUTY.',
                    '<25>{#p/undyne}{#f/12}* ... not what I meant, but okay.'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<19>{#p/papyrus}{#f/0}IT'S TOO BAD WE'LL NEVER GET TO SEE ITS FULL POTENTIAL.",
                    '<18>{#p/papyrus}{#f/5}ALL THOSE FANCY STRUCTURES AND MACHINES...',
                    "<18>{#p/papyrus}{#f/8}THINK OF THE NEAT GIZMOS I COULD'VE GOTTEN TO USE!"
                 ]
               : [
                    "<18>{#p/papyrus}{#f/4}IF ONLY METTATON WASN'T SO BEAUTIFUL.",
                    "<18>{#p/papyrus}{#f/6}WAIT, THAT'D BE BAD!!",
                    '<18>{#p/papyrus}{#f/5}BUT SO IS THE ABANDONMENT OF THE STAGING AREA...',
                    "<25>{#p/undyne}{#f/1}* I wonder if there's some gizmo that could fix this.",
                    '<18>{#p/papyrus}{#f/0}LIKE... A BEAUTY COMPENSATION FILTER!?',
                    '<25>{#p/undyne}{#f/18}* I was thinking more along the lines of his EGO.',
                    '<25>{#p/undyne}{#f/17}* An \"ego compensation filter\" if you will.',
                    '<18>{#p/papyrus}{#f/7}NEVER MIND!'
                 ]
      ),
      a_path2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THESE LIFTGATES ARE PRETTY FUN.',
            "<18>{#p/papyrus}{#f/0}SOMETIMES, WHEN NOBODY'S WATCHING...",
            "<18>{#p/papyrus}{#f/0}I'LL COME OUT THERE AND GO BACK AND FORTH ON THEM.",
            '<18>{#p/papyrus}{#f/4}IT DOES REQUIRE A SPECIAL PASS, THOUGH.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/4}* Hey, Alphys never gives ME liftgate passes!',
                    '<18>{#p/papyrus}{#f/0}MAYBE NEXT TIME YOU SHOULD ASK HER FOR ONE!',
                    '<25>{#p/undyne}{#f/3}* ...',
                    '<18>{#p/papyrus}{#f/6}...',
                    '<25>{#p/undyne}{#f/11}* ...',
                    '<25>{#p/undyne}{#f/8}* Like hell I will!',
                    '<18>{#p/papyrus}{#f/6}LANGUAGE!!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}GO ON, GIVE IT A TRY!',
                    "<18>{#p/papyrus}{#f/5}THEY'RE NOT DANGEROUS...",
                    '<18>{#p/papyrus}{#f/6}... USUALLY.'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}...',
                    "<18>{|}{#p/papyrus}{#f/4}I CAN'T BE THE ONLY ONE THAT THINKS YOU'RE- {%}",
                    '<25>{#p/undyne}{#f/8}* OH MY GOD PLEASE!!',
                    '<18>{#p/papyrus}{#f/6}OKAY, OKAY!'
                 ]
      ),
      a_path3: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}I HEARD TUITION IS HARD TO COME BY IN AERIALIS.',
            '<18>{#p/papyrus}{#f/6}IS IT TRUE??\nDO STUDENTS REALLY SUFFER THAT MUCH?',
            "<18>{#p/papyrus}{#f/8}I DON'T KNOW WHAT I'D BE WITHOUT MY EDUCATION...!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* I quit school when I was only ten years old!!',
                    '<18>{#p/papyrus}{#f/1}WHAT!?!?',
                    '<18>{#p/papyrus}{#f/6}HOW COULD YOU BETRAY THE SYSTEM SO COMPLETELY!',
                    '<25>{#p/undyne}{#f/1}* Not everyone walks the same path in life, Papyrus.',
                    '<25>{#p/undyne}{#f/1}* After I quit school, ASGORE became my teacher.',
                    '<25>{#p/undyne}{#f/14}* He was the best one I ever had.',
                    '<18>{#p/papyrus}{#f/5}... IT WOULD APPEAR I HAVE MUCH TO LEARN...'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/8}I WOULDN'T EVEN HAVE MY SPECIAL ATTACK!" ]
               : [ "<18>{#p/papyrus}{#f/6}DON'T WORRY, I'LL START LEARNING RIGHT AWAY!" ]
      ),
      a_rg1: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}IT'S INCREDIBLE HOW THE GUARDS AND TRAINEES HERE...",
            '<18>{#p/papyrus}{#f/4}NEVER SEEM TO GET LOST.',
            '<18>{#p/papyrus}{#f/5}ESPECIALLY WITH THE LACK OF...',
            '<18>{#p/papyrus}{#f/6}... WELL, ANYTHING!!',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/7}ALL THE ROOMS LOOK EXACTLY THE SAME!' ]
               : [
                    "<25>{#p/undyne}{#f/12}* Actually, you're not too far off...",
                    "<25>{#p/undyne}{#f/1}* They struggled for AGES trying to memorize the area's layout.",
                    '<18>{#p/papyrus}{#f/0}BUT THEY DID IT EVENTUALLY, RIGHT?',
                    '<25>{#p/undyne}{#f/16}* Well... after the hundredth failed memorization attempt...',
                    '<25>{#p/undyne}{#f/17}* I gave up and added a navigation module to their helmets.',
                    '<18>{#p/papyrus}{#f/1}WHAT!?!?',
                    '<18>{#p/papyrus}{#f/7}THIS IS TECHNOLOGICAL TREACHERY!!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I WONDER HOW -YOU- NEVER SEEM TO GET LOST...' ]
               : [
                    '<18>{#p/papyrus}{#f/4}I, THE GREAT AND NATURALLY-TALENTED PAPYRUS...',
                    '<18>{#p/papyrus}{#f/7}WOULD NEVER RELY ON TECHNOLOGY TO DO MY JOB FOR ME!',
                    "<18>{#p/papyrus}{#f/0}... I'D ONLY USE IT WHEN IT'S AVAILABLE."
                 ]
      ),
      a_path4: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}TALES SPEAK OF A PLACE WHERE TRASH TURNS TO TREASURE.',
            '<18>{#p/papyrus}{#f/9}A PLACE WHERE GARBAGE TURNS TO GOLD!',
            '<18>{#p/papyrus}{#f/4}AND A PLACE WHERE SPACE TUNA...',
            '<18>{#p/papyrus}{#f/5}WELL, THAT STUFF JUST STRAIGHT UP DISAPPEARS.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}DO YOU KNOW OF SUCH A PLACE??' ]
               : [
                    "<25>{#p/undyne}{#f/1}* Sounds like Bratty and Catty's place.",
                    '<25>{#p/undyne}{#f/14}* They love space tuna even more than they love selling junk!',
                    '<25>{#p/undyne}{#f/17}* And they REALLY love selling junk!!',
                    '<18>{#p/papyrus}{#f/0}WOWIE!',
                    '<18>{#p/papyrus}{#f/5}DO THEY SELL ANY NON-JUNK, BY CHANCE...?',
                    '<25>{#p/undyne}{#f/8}* Why WOULD they!?'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I\'LL TAKE THAT AS A RESOUNDING \"MAYBE.\"' ]
               : [
                    '<18>{#p/papyrus}{#f/0}SO BRATTY AND CATTY ARE JUNK DEALERS, HUH?',
                    "<18>{#p/papyrus}{#f/4}I'D BE SURPRISED IF THEY DIDN'T KNOW MY BROTHER."
                 ]
      ),
      a_barricade1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THIS ROOM MAY OR MAY NOT CONTAIN BARRICADES.',
            '<18>{#p/papyrus}{#f/4}THEY SAY YOU MUST ANSWER QUESTIONS TO UNLOCK THEM...',
            '<18>{#p/papyrus}{#f/1}COULD IT BE!?\nA SECRET AUDITION FOR A QUIZ SHOW!?',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* A quiz show, huh?',
                    '<18>{#p/papyrus}{#f/9}... REPLETE WITH TRIVIA QUESTIONS GALORE!!',
                    "<25>{#p/undyne}{#f/1}* Okay, here's a question for you.",
                    '<25>{#p/undyne}{#f/12}* Precisely how many boots would it take...',
                    "<25>{#p/undyne}{#f/7}* To kick that robot's BUTT into space!!",
                    '<18>{#p/papyrus}{#f/6}UH...',
                    '<18>{#p/papyrus}{#f/5}... WELL, UM...',
                    '<18>{#p/papyrus}{#f/4}ACTUALLY, THAT DEPENDS ON THE GRAVITY.',
                    '<25>{#p/undyne}{#f/8}* Papyrus!!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}IT -HAS- BEEN A WHILE SINCE HE'S DONE ONE." ]
               : [
                    "<25>{#p/undyne}{#f/1}* I've got another trivia question if you'd like to hear it.",
                    '<18>{#p/papyrus}{#f/5}... MAYBE LATER.',
                    "<18>{#p/papyrus}{#f/4}BESIDES, WE ALREADY KNOW WHERE IT'S GOING...",
                    '<25>{#p/undyne}{#f/7}* YEAH!!\n* Into SPACE!!'
                 ]
      ),
      a_puzzle1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}YOU KNOW, IT MIGHT JUST BE ME, BUT...',
            '<18>{#p/papyrus}{#f/4}THESE PUZZLES ARE REALLY WEIRD.',
            '<18>{#p/papyrus}{#f/4}... I ALWAYS END UP WALKING BY THE CORRECT TERMINAL.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}... OVER, AND OVER...' ]
               : [
                    '<25>{#p/undyne}{#f/1}* Yeah?\n* Well whenever I try solving these things...',
                    '<25>{#p/undyne}{#f/17}* The whole thing just goes crazy!!',
                    "<18>{#p/papyrus}{#f/6}DIDN'T ALPHYS EVER PULL YOU BACK TO SAFETY??",
                    '<25>{#p/undyne}{#f/12}* Well... I...',
                    '<18>{#p/papyrus}{#f/6}UNDYNE, WHAT DID YOU DO!?!?',
                    '<25>{#p/undyne}{#f/12}* ...',
                    "<25>{#p/undyne}{#f/12}* Nothin.'",
                    '<25>{#p/undyne}{#f/12}* Apart from almost erasing myself from existence, that is.',
                    '<18>{#p/papyrus}{#f/8}NO...!\nPLEASE BE MORE CAREFUL NEXT TIME!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I HAVE -ZERO- INTENTION OF EVER DOING ONE AGAIN.' ]
               : [ '<18>{#p/papyrus}{#f/4}THESE DIMENSIONAL TECHNOLOGIES ARE A REAL PROBLEM.' ]
      ),
      a_mettaton1: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}HERE'S A SMALL BIT OF ADVICE.",
            '<18>{#p/papyrus}{#f/4}WHEN METTATON SAYS TO DO SOMETHING ON HIS SHOW...',
            '<18>{#p/papyrus}{#f/4}YOU DO IT.',
            '<18>{#p/papyrus}{#f/0}NO IFS, ANDS, OR BUTS ABOUT IT!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* What about \"howevers?\"',
                    '<18>{#p/papyrus}{#f/4}...',
                    '<18>{#p/papyrus}{#f/4}THAT\'S JUST ANOTHER WAY OF SAYING \"BUT.\"',
                    '<25>{#p/undyne}{#f/17}* ... right.',
                    '<25>{#p/undyne}{#f/14}* And what about \"unlesses?\"',
                    '<18>{#p/papyrus}{#f/4}WE ALREADY RULED OUT ANDS.',
                    "<25>{|}{#p/undyne}{#f/8}* But I wasn't talking about the- {%}",
                    '<18>{#p/papyrus}{#f/6}NO BUTS!!!',
                    '<25>{|}{#p/undyne}{#f/7}* If you would just let me- {%}',
                    '<18>{#p/papyrus}{#f/7}NO IFS!!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}AND NO HOWEVERS, EITHER.' ]
               : [ '<18>{#p/papyrus}{#f/4}DON\'T EVEN GET ME STARTED ON \"PERHAPSES.\"' ]
      ),
      a_elevator1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}SO MANY ELEVATORS, SO LITTLE TIME...',
            "<18>{#p/papyrus}{#f/4}EXCEPT FOR WHEN THEY'RE NOT WORKING.",
            '<18>{#p/papyrus}{#f/6}I HAD TO WALK AROUND ON FOOT YESTERDAY!!',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}IF ONLY I KNEW WHY SOMEONE WOULD WANT THEM OFF...' ]
               : [
                    '<25>{#p/undyne}{#f/12}* I heard Mettaton shuts them off to run his shows.',
                    '<18>{#p/papyrus}{#f/4}HE... HE DOES?',
                    '<25>{#p/undyne}{#f/17}* As far as I know!',
                    '<18>{#p/papyrus}{#f/7}... THE -NERVE- OF THAT ROBOTICAL RECTANGLE!',
                    '<18>{#p/papyrus}{#f/7}I INTEND TO HAVE A WORD WITH HIM NOW!',
                    "<25>{#p/undyne}{#f/7}* And tell him to cancel those STUPID shows while you're at it!"
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}IT'S A CONSPIRACY ON SO MANY LEVELS." ]
               : [
                    '<18>{#p/papyrus}{#f/4}MAYBE...\nTHIS COULD BE MY CHANCE...',
                    '<18>{#p/papyrus}{#f/9}... TO SUGGEST THE CONSTRUCTION OF MORE LIFTGATES!'
                 ]
      ),
      a_lift: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}THIS ELEVATOR SHOULD RELEASE A MUSIC ALBUM!',
            '<18>{#p/papyrus}{#f/5}SO MANY PLEASANTLY BLUESY TUNES...',
            "<18>{#p/papyrus}{#f/6}IT'S A SHAME THE SOUND SYSTEM IS BROKEN RIGHT NOW.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/13}* Blues?\n* Seriously?',
                    "<25>{#p/undyne}{#f/14}* Everyone knows rock 'n' roll is the BEST.",
                    '<18>{#p/papyrus}{#f/4}WHAT!?\nROCK AND ROLL IS WEIRD...',
                    "<18>{#p/papyrus}{#f/9}IF YOU NEED HEAVY GUITARS, METAL IS WHERE IT'S AT!!",
                    '<25>{#p/undyne}{#f/8}* You listen to METAL!?',
                    '<25>{#p/undyne}{#f/4}* No, no, you need to listen to DUBSTEP.',
                    '<18>{#p/papyrus}{#f/6}DUBSTEP!?!?'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I MAY OR MAY NOT HAVE USED IT ONE TOO MANY TIMES.' ]
               : [
                    '<18>{#p/papyrus}{#f/0}BLUES IS NICE, BUT SKA IS MY FAVORITE OF ALL.',
                    '<18>{#p/papyrus}{#f/9}YOU CAN NEVER GET ENOUGH OF THOSE RIVETING TRUMPETS!'
                 ]
      ),
      a_elevator2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}WELCOME TO THE SECOND FLOOR OF AERIALIS.',
            '<18>{#p/papyrus}{#f/4}HERE, YOU WILL FIND MANY AMAZING THINGS...',
            '<18>{#p/papyrus}{#f/9}PUZZLES!\nBARRICADES!\nEVEN A TV SET!',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}... WAIT, ISN'T THAT WHAT'S ON THE FIRST FLOOR?" ]
               : [
                    "<25>{#p/undyne}{#f/14}* So... exactly the same as what's on the first floor, then.",
                    '<18>{#p/papyrus}{#f/6}I GUESS SO???',
                    '<25>{#p/undyne}{#f/1}* I mean, hey.\n* At least the second floor is bigger.',
                    '<18>{#p/papyrus}{#f/4}OH, GREAT.\nI CAN GET EVEN -MORE- LOST, NOW.',
                    '<25>{#p/undyne}{#f/17}* At least the second floor has more cool stuff to look at!!',
                    "<18>{#p/papyrus}{#f/6}WON'T DO ME MUCH GOOD IF I'M LOST!!"
                 ])
         ],
         [
            '<18>{#p/papyrus}{#f/5}WHOEVER MADE THIS AREA MUST BE A FAN OF BEING LAZY.',
            "<18>{#p/papyrus}{#f/4}IT'D CERTAINLY EXPLAIN THAT SENTRY STATION..."
         ]
      ),
      a_sans: pager.create(
         0,
         () => [
            '<19>{#p/papyrus}{#f/0}YES, MY BROTHER SELLS CORN DOGS AT HIS SENTRY STATION.',
            '<18>{#p/papyrus}{#f/4}IT\'S NOT EXACTLY WHAT I\'D CALL \"PALATABLE.\"',
            "<18>{#p/papyrus}{#f/5}I'D OPEN A FOOD STAND OF MY OWN TO OFFSET IT...",
            '<18>{#p/papyrus}{#f/5}BUT THE LAST TIME I TRIED...',
            '<18>{#p/papyrus}{#f/6}THE SPACE MAFIA WANTED A CUT OF THE PROFIT.',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/7}SERIOUSLY!?\nI'D NEVER SELL OUT TO THE MAFIA!!" ]
               : [
                    '<25>{#p/undyne}{#f/17}* ...',
                    '<25>{#p/undyne}{#f/17}* The WHAT?',
                    '<18>{#p/papyrus}{#f/0}THE SPACE MAFIA.',
                    '<18>{#p/papyrus}{#f/4}YOU KNOW, THE ONES IN THE VIRTUALASIUM.',
                    '<25>{#p/undyne}{#f/12}* Oh, THAT space mafia.'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}CREDIT WHERE IT'S DUE, THEY DO DRESS SPIFFINGLY.",
                    "<18>{#p/papyrus}{#f/7}NOT THAT IT'LL CHANGE MY MIND ABOUT THEM!",
                    '<18>{#p/papyrus}{#f/4}A GOOD DRESS SENSE CAN ONLY TAKE YOU SO FAR.'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* You think this \"space mafia\" takes a cut of Sans\'s corn dog sales?',
                    "<18>{#p/papyrus}{#f/0}WOW! THAT'S A GREAT QUESTION!",
                    '<25>{#p/undyne}{#f/14}* Really?',
                    "<18>{#p/papyrus}{#f/0}A GREAT QUESTION I DON'T WANT AN ANSWER TO!"
                 ]
      ),
      a_pacing: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}I GOT A STRANGE MESSAGE ON THE OUTERNET TODAY...',
            '<18>{#p/papyrus}{#f/4}ABOUT A COLONY OF MOLE-RATS, TRAPPED IN A FORCE FIELD.',
            '<18>{#p/papyrus}{#f/5}LIVING MOLE-RAT LIVES, EATING MOLE-RAT FOOD...',
            '<18>{#p/papyrus}{#f/4}YEARNING TO ONE DAY REACH THE MOLE-RAT STARS.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}... WHAT COULD THIS MEAN!?' ]
               : [
                    "<25>{#p/undyne}{#f/8}* You think that's strange?\n* Ha!",
                    '<25>{#p/undyne}{#f/7}* Just wait until you hear about the message I GOT the other day!',
                    '<18>{#p/papyrus}{#f/4}WAS IT ABOUT MOLE-RATS?',
                    '<25>{#p/undyne}{#f/14}* No.',
                    '<18>{#p/papyrus}{#f/4}DID IT INVOLVE A \"MONEY-MAKING OPPORTUNITY?\"',
                    '<25>{#p/undyne}{#f/14}* No.',
                    '<18>{#p/papyrus}{#f/6}DID IT PROMISE A WAY OFF THE OUTPOST??',
                    "<25>{#p/undyne}{#f/14}* ... actually, yes.\n* And that's when I blocked them.",
                    '<25>{#p/undyne}{#f/7}* NOBODY makes false promises of freedom and gets away with it!',
                    '<18>{#p/papyrus}{#f/0}YEAH!!',
                    '<18>{#p/papyrus}{#f/5}ESPECIALLY WHEN A -REAL- PROMISE OF FREEDOM...',
                    '<18>{#p/papyrus}{#f/6}IS ON THE PHONE WITH US RIGHT NOW!!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}I WONDER IF SUCH A COLONY ACTUALLY EXISTS.',
                    '<18>{#p/papyrus}{#f/4}THE UNIVERSE IS MADE OF INFINITES, AFTER ALL...',
                    '<18>{#p/papyrus}{#f/9}INFINITE DIVERSITY IN INFINITE COMBINATIONS!!'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/0}HERE'S TO THE PROMISE OF YOUR EVENTUAL FREEDOM.",
                    '<18>{#p/papyrus}{#f/6}AND MAYBE OURS TOO SOMEDAY!!'
                 ]
      ),
      a_prepuzzle: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}THOSE FLOWERS SCATTERED AROUND THE AREA...?',
            "<18>{#p/papyrus}{#f/0}OH, THOSE WERE ASGORE'S IDEA, ACTUALLY.",
            '<18>{#p/papyrus}{#f/4}IF THAT GUY WASN\'T THE \"CEO\" OF THE OUTPOST...',
            '<18>{#p/papyrus}{#f/5}HE\'D BE THE \"CGO\" INSTEAD.',
            '<18>{#p/papyrus}{#f/5}AN ACRONYM FOR \"CHIEF GARDENING OFFICER.\"',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* Oh yeah??\n* And who would I be?',
                    '<18>{#p/papyrus}{#f/0}RIGHT, I ALREADY CAME UP WITH ONE FOR YOU.',
                    '<18>{#p/papyrus}{#f/4}YOU\'D BE THE \"CSETPO.\"',
                    '<25>{#p/undyne}{#f/14}* ... and what does that ludicrous acronym stand for?',
                    '<18>{#p/papyrus}{#f/9}THE \"CHIEF SMASH- EVERYTHING-TO- PIECES OFFICER!\"',
                    '<25>{#p/undyne}{#f/8}* I LOVE IT!!!'
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/4}I MIGHT AS WELL BE THE \"CAO\" AROUND HERE...' ]
      ),
      a_puzzle2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/6}NO MATTER WHERE I GO, I END UP IN THE SAME PLACE!',
            "<18>{#p/papyrus}{#f/5}AT LEAST, THAT'S WHAT HAPPENS...",
            '<18>{#p/papyrus}{#f/4}WHENEVER I ATTEMPT TO SOLVE THIS PUZZLE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* Jeez.\n* Why even BOTHER.',
                    '<18>{#p/papyrus}{#f/6}BECAUSE!!',
                    '<18>{#p/papyrus}{#f/6}SOLVING PUZZLES IS SUPPOSED TO BE FUN!!',
                    "<25>{#p/undyne}{#f/12}* Couldn't you just use flight magic to get around it?",
                    '<18>{#p/papyrus}{#f/4}FLIGHT MAGIC IS RESERVED FOR EMERGENCIES.',
                    '<25>{#p/undyne}{#f/1}* That depends on your definition of an \"emergency.\"',
                    '<18>{#p/papyrus}{#f/7}AND PUZZLES FALL WELL OUTSIDE OF THAT DEFINITION!',
                    "<25>{#p/undyne}{#f/14}* Guess you'll have to suffer, then.",
                    '<18>{#p/papyrus}{#f/7}I GUESS I WILL!!!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}NUMBERS, NUMBERS EVERYWHERE!!',
                    '<18>{#p/papyrus}{#f/6}WHAT DOES IT ALL MEAN!?!?'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/5}FLYING AROUND EVERYWHERE JUST WOULDN'T BE FAIR.",
                    '<25>{#p/undyne}{#f/11}* And you like to make life hard on yourself because...?',
                    '<18>{#p/papyrus}{#f/9}BECAUSE NOTHING IS AS REWARDING AS HARD WORK!',
                    '<25>{#p/undyne}{#f/17}* ... that depends on your definition of \"work.\"'
                 ]
      ),
      a_mettaton2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}AH... THE TIME VERSUS MONEY TV SET.',
            ...(SAVE.data.n.plot < 60
               ? [
                    '<18>{#p/papyrus}{#f/4}JUST SO YOU KNOW...',
                    "<18>{#p/papyrus}{#f/5}I WON'T BE IN THE UPCOMING EPISODE.",
                    "<18>{#p/papyrus}{#f/6}... I'D BE TOO NERVOUS SITTING RIGHT NEXT TO HIM."
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}METTATON WANTED ME TO BE IN THE EPISODE, BUT...',
                    '<18>{#p/papyrus}{#f/5}AFTER SOME THOUGHT, I CAME TO REALIZE...',
                    "<18>{#p/papyrus}{#f/6}... HOW NERVOUS I'D BE SITTING RIGHT NEXT TO HIM."
                 ]),
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/12}* ... you really like him, don't you?",
                    '<18>{#p/papyrus}{#f/4}WELL, HE -IS- QUITE ATTRACTIVE...',
                    "<18>{#p/papyrus}{#f/6}... BUT I HAVEN'T COMMITTED TO ANYTHING YET!",
                    "<25>{#p/undyne}{#f/3}* That won't last long.",
                    '<18>{#p/papyrus}{#f/4}HUH?\nDID YOU JUST ASSUME...',
                    '<18>{#p/papyrus}{#f/7}... OUR RELATIONSHIP STATUS!?!?',
                    '<25>{#p/undyne}{#f/14}* Oh, no, of course not.',
                    "<25>{#p/undyne}{#f/17}* It's just so obvious that I couldn't help but state the facts.",
                    '<18>{#p/papyrus}{#f/5}(SIGH...)'
                 ])
         ],
         () =>
            solo()
               ? SAVE.data.n.plot < 60
                  ? [ '<18>{#p/papyrus}{#f/0}FORTUNATELY, I HAVE A REPLACEMENT ARRANGED.' ]
                  : SAVE.data.b.undyne_respecc
                  ? [ '<18>{#p/papyrus}{#f/0}THANKFULLY, UNDYNE WAS THERE TO TAKE MY PLACE.' ]
                  : [ '<18>{#p/papyrus}{#f/0}THANKFULLY, MY BROTHER WAS THERE TO TAKE MY PLACE.' ]
               : [ '<25>{#p/undyne}{#f/12}* Papyrus is too busy daydreaming to pick up the phone right now.' ]
      ),
      a_rg2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/6}BE CAREFUL OUT THERE, HUMAN!',
            '<18>{#p/papyrus}{#f/5}THE GUARDS IN THAT AREA ARE FRESH OUT OF TRAINING.',
            "<18>{#p/papyrus}{#f/6}WHO KNOWS WHICH ROYAL MEMOS THEY'LL IGNORE!",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}BY THE WAY, WHAT'S A ROYAL MEMO?" ]
               : [
                    '<25>{#p/undyne}{#f/16}* Tell me about it...',
                    '<18>{#p/papyrus}{#f/5}HUH?\nDO THEY IGNORE YOUR MEMOS OFTEN?',
                    '<25>{#p/undyne}{#f/14}* Oh, they follow mine just fine.',
                    "<25>{#p/undyne}{#f/10}* It's Alphys's memos they tend to ignore.",
                    "<18>{#p/papyrus}{#f/6}BUT SHE'S THE ROYAL SCIENTIST!",
                    "<18>{#p/papyrus}{#f/6}THE KING'S MOST TRUSTED ASSOCIATE!",
                    "<25>{#p/undyne}{#f/12}* Yeah... that's how things are supposed to work.",
                    "<25>{#p/undyne}{#f/16}* But after Professor Roman died, we weren't ready to replace him.",
                    "<26>{#p/undyne}{#f/10}* Most in the Royal Guard don't take his successor seriously, so...",
                    '<25>{#p/undyne}{#f/9}* That impacts how the trainees see her, too.',
                    '<18>{#p/papyrus}{#f/5}OH...',
                    "<25>{#p/undyne}{#f/17}* I know.\n* It's... not great.",
                    "<26>{#f/9}* But she's unwieldy, and she's still got lots to prove out there.",
                    '<26>{#f/16}* So... I kind of get it.',
                    "<18>{#p/papyrus}{#f/5}HOPEFULLY THEY'LL COME TO RESPECT HER IN TIME.",
                    '<26>{#p/undyne}{#f/14}* Hopefully.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}I WONDER HOW IT'S DIFFERENT FROM A NORMAL MEMO." ]
               : [ '<18>{#p/papyrus}{#f/4}HOPEFULLY, IT HAPPENS SOONER RATHER THAN LATER.' ]
      ),
      a_barricade2: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}I'M AFRAID I DON'T HAVE MUCH TO SAY ABOUT THIS ROOM.",
            '<18>{#p/papyrus}{#f/5}IN FACT, THE ONLY THING I DO HAVE TO SAY...',
            '<18>{#p/papyrus}{#f/6}... IS THAT I -HAVE- NOTHING TO SAY!',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}SO, ACTUALLY, I HAD SOMETHING TO SAY AFTER ALL.' ]
               : [
                    '<26>{#p/undyne}{#f/1}* I have something to say.',
                    '<18>{#p/papyrus}{#f/6}WHAT?\nWHAT IS IT?',
                    '<26>{#p/undyne}{#f/14}* This room may or may not contain barricades.',
                    "<18>{#p/papyrus}{#f/4}THERE'S ALREADY A ROOM LIKE THAT ON THE FIRST FLOOR.",
                    '<18>{#p/papyrus}{#f/7}DO SOMETHING ORIGINAL!!',
                    "<26>{#p/undyne}{#f/17}* I've got nothin.'",
                    '<18>{#p/papyrus}{#f/5}... NEVER MIND...'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}PERHAPS I'D HAVE MORE TO SAY IN ANOTHER SITUATION." ]
               : [ "<18>{#p/papyrus}{#f/0}PERHAPS THIS ROOM JUST ISN'T VERY INTERESTING." ]
      ),
      a_split: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}LOOK, IT'S THE EVER-FAMOUS METTATON FOUNTAIN!",
            '<18>{#p/papyrus}{#f/4}I HEARD IT TOOK A LOT OF TIME TO GET IT TO LOOK RIGHT.',
            '<18>{#p/papyrus}{#f/5}COUNTLESS HOURS OF TIRELESS, PAINFUL WORK...',
            '<18>{#p/papyrus}{#f/6}TO GET THAT IDEAL RECTANGULAR SHAPE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* Then he destroyed it just so he could do it all himself.',
                    '<18>{#p/papyrus}{#f/6}HE DID??',
                    '<25>{#p/undyne}{#f/1}* The first one wasn\'t up to his \"high standards.\"',
                    '<18>{#p/papyrus}{#f/4}WAIT, THERE WAS SOMETHING ABOUT THAT ON TV.',
                    '<25>{#p/undyne}{#f/14}* Oh yeah, he decided to broadcast it to the entire outpost.',
                    '<25>{#p/undyne}{#f/17}* He had to SHOW everyone that he knew better than them.',
                    '<18>{#p/papyrus}{#f/4}WELL, IT IS A STATUE -OF- HIM, AFTER ALL...'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}MY BROTHER TELLS ME THAT'S NOT ENTIRELY TRUE." ]
               : [
                    '<18>{#p/papyrus}{#f/5}I WONDER WHY HE HIRED SOMEONE ELSE TO BEGIN WITH.',
                    "<18>{#p/papyrus}{#f/4}I WOULD'VE JUST DONE IT MYSELF..."
                 ]
      ),
      a_offshoot1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}THE SIGNAL SEEMS TO BE A BIT WEAK.',
            "<18>{#p/papyrus}{#f/6}IT'S LIKE... INTERFERENCE OF SOME KIND??",
            "<18>{#p/papyrus}{#f/4}MAYBE IT'D BE A GOOD IDEA TO CALL BACK ELSEWHERE.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* They're probably near the old security tower in Aerialis.",
                    "<25>{#p/undyne}{#f/17}* There's something about the kind of metal they used to use there."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}DID MY MESSAGE NOT GET THROUGH THE FIRST TIME?' ]
               : [ "<25>{#p/undyne}{#f/14}* I wouldn't worry about a thing." ]
      ),
      a_elevator3: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}WHEN I FIRST CAME ACROSS THIS ROOM...',
            '<18>{#p/papyrus}{#f/6}I WAS ANNOYED HAVING TO USE YET ANOTHER ELEVATOR.',
            '<18>{#p/papyrus}{#f/5}THEN, I WAS RELIEVED SOMEWHAT...',
            '<18>{#p/papyrus}{#f/4}... WHEN I SAW THE LACK OF A TACKY BILLBOARD NEARBY.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* So do you LIKE using elevators or NOT?',
                    '<18>{#p/papyrus}{#f/6}WELL...',
                    '<18>{#p/papyrus}{#f/5}I LIKE THE MUSIC, BUT HAVING TO USE THEM IS A PAIN.',
                    '<18>{#p/papyrus}{#f/4}I DO ACKNOWLEDGE THEIR NECESSITY, THOUGH.',
                    "<25>{#p/undyne}{#f/1}* Well, just be glad you don't live in a spire house, then.",
                    '<18>{#p/papyrus}{#f/5}HOW COME?',
                    '<25>{#p/undyne}{#f/17}* Elevators EVERYWHERE.',
                    '<18>{#p/papyrus}{#f/6}N-NO...!',
                    "<25>{#p/undyne}{#f/7}* And they're not even NECESSARY.",
                    "<18>{#p/papyrus}{#f/8}IT CAN'T BE...!",
                    "<25>{#p/undyne}{#f/8}* AND THEY DON'T EVEN HAVE MUSIC!!!",
                    "<18>{#p/papyrus}{#f/1}IT'S UNFATHOMABLE!"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}IF ONLY THERE WAS A BETTER WAY TO GET AROUND.',
                    '<18>{#p/papyrus}{#f/0}... OH WAIT, THERE TOTALLY IS!',
                    '<18>{#p/papyrus}{#f/9}LIFTGATES!!!'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/5}AN ELEVATOR WITHOUT MUSIC IS LIKE...',
                    '<18>{#p/papyrus}{#f/5}A PLATE OF SPAGHETTI WITHOUT MARINARA SAUCE.',
                    '<18>{#p/papyrus}{#f/4}OR ALFREDO SAUCE, IF YOU HAPPEN TO BE MY BROTHER.',
                    "<18>{#p/papyrus}{#f/4}... AND PEOPLE SAY I'M THE WEIRD ONE."
                 ]
      ),
      a_elevator4: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}WHAT HAPPENS TO A SKELETON WHO WALKS THROUGH SECURITY?',
            '<19>{#p/papyrus}{#f/4}... OH YEAH.\nHE GETS ELECTROCUTED.',
            '<18>{#p/papyrus}{#f/6}JUST LIKE I WAS, THE FIRST TIME I CAME HERE!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* Sounds like quite the story you've got there.",
                    '<18>{#p/papyrus}{#f/4}OH, IT WAS QUITE A STORY, ALRIGHT...',
                    '<18>{#p/papyrus}{#f/5}JUST NOT A VERY GOOD ONE.',
                    '<25>{#p/undyne}{#f/14}* Could it be summed up as \"I had no idea what I was doing?\"',
                    "<18>{#p/papyrus}{#f/7}HEY, I -ALWAYS- KNOW WHAT I'M DOING!",
                    '<18>{#p/papyrus}{#f/5}IT\'S MORE OF AN \"I WAS POWERLESS TO STOP IT\" SCENARIO.',
                    '<25>{#p/undyne}{#f/17}* Wait, if you were electrocuted by the security field...',
                    "<25>{#p/undyne}{#f/17}* Wouldn't that make you the OPPOSITE of powerless?",
                    "<18>{#p/papyrus}{#f/4}ACTUALLY, THAT'S A GOOD POINT..."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/6}IT'S A LONG STORY." ]
               : [ "<18>{#p/papyrus}{#f/0}PERHAPS IT'S NOT SUCH A BAD STORY AFTER ALL." ]
      ),
      a_auditorium: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}MY BROTHER ONCE HOSTED A COMEDY SHOW HERE.',
            '<18>{#p/papyrus}{#f/4}IT WAS CALLED...',
            '<18>{#p/papyrus}{#f/4}... THE RIB-TICKLER.',
            "<18>{#p/papyrus}{#f/5}DESPITE THE TITLE, IT WASN'T A COMPLETE FAILURE.",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}IN FACT, IT DID PRETTY WELL!!' ]
               : [
                    "<25>{#p/undyne}{#f/1}* To be honest, I'm kind of surprised he stopped doing it.",
                    '<25>{#p/undyne}{#f/16}* But I guess he just really wanted to be a sentry or something.',
                    '<18>{#p/papyrus}{#f/5}YEAH.\nTHAT MUST BE IT.',
                    "<18>{#p/papyrus}{#f/4}THERE DEFINITELY ISN'T ANYTHING ELSE GOING ON.",
                    '<25>{#p/undyne}{#f/14}* ... what?'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}I'M AS SURPRISED AS YOU ARE." ]
               : [ "<18>{#p/papyrus}{#f/0}THERE ARE THINGS I PROBABLY SHOULDN'T MENTION RIGHT NOW." ]
      ),
      a_aftershow: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}SO THIS IS WHERE BRATTY AND CATTY WORK, HUH?',
            "<18>{#p/papyrus}{#f/0}IT'S CLEANER THAN I EXPECTED.",
            "<18>{#p/papyrus}{#f/4}AREN'T THESE TWO SUPPOSED TO BE TRASH DEALERS...?",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}... PERHAPS THE TRASH IS JUST VERY WELL ORGANIZED.' ]
               : [
                    "<25>{#p/undyne}{#f/14}* I think they're just protective about the trash they collect.",
                    '<25>{#p/undyne}{#f/16}* Alphys told me how she used to go trash- hunting with them...',
                    "<25>{#p/undyne}{#f/9}* It's more than just some wacky hobby.\n* It's a way of LIFE.",
                    '<18>{#p/papyrus}{#f/0}THAT SEEMS KIND OF FUN, HONESTLY.',
                    '<25>{#p/undyne}{#f/1}* Plus, all the coolest trinkets get found by people like them.',
                    '<18>{#p/papyrus}{#f/9}LIKE THE MEW MEW DOLL ON TV EARLIER!!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}ORGANIZED TRASH...',
                    "<18>{#p/papyrus}{#f/4}THE TWO WORDS I NEVER THOUGHT I'D UTTER TOGETHER."
                 ]
               : [ '<18>{#p/papyrus}{#f/0}I WONDER IF HUMANS WOULD LIKE HUNTING FOR MONSTER TRASH.' ]
      ),
      a_hub1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}AH... THE CENTRAL RING ROOM!',
            '<18>{#p/papyrus}{#f/4}AT FIRST, WHEN I HEARD THE TERM \"RING ROOM...\"',
            "<18>{#p/papyrus}{#f/5}I THOUGHT IT'D BE A ROOM FOR MAKING CALLS.",
            "<18>{#p/papyrus}{#f/0}GIVEN WHAT WE'RE DOING, THAT'S NOT ENTIRELY WRONG!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* The \"ring room,\" huh?',
                    "<26>{#p/undyne}{#f/14}* If I didn't know any better, I'd say you were a poet!",
                    '<18>{#p/papyrus}{#f/6}... ME, A POET!?',
                    "<18>{#p/papyrus}{#f/5}SOMEHOW I DOUBT THAT'D BE A GREAT USE OF MY TIME.",
                    "<25>{#p/undyne}{#f/17}* You're kidding, right?\n* You're a NATURAL.",
                    '<18>{#p/papyrus}{#f/4}IF YOU SAY SO...'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}NOT TO MENTION, THE RECEPTION IS WAY BETTER THERE.' ]
               : [ '<18>{#p/papyrus}{#f/0}PAPYRUS THE POET.', '<18>{#p/papyrus}{#f/5}WELL, IT DOES HAVE A RING TO IT...' ]
      ),
      a_dining: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/5}I DON'T KNOW ABOUT YOU, BUT THE FOOD IN THIS PLACE...",
            '<18>{#p/papyrus}{#f/6}... REALLY GRINDS MY GEARS!!',
            "<18>{#p/papyrus}{#f/4}IT'S LIKE EVERYONE FORGOT WHAT GOOD COOKING IS LIKE.",
            "<18>{#p/papyrus}{#f/7}WHERE'S MY PASTA- FLAVORED PASTA!?",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* You know, that reminds me...',
                    '<25>{#p/undyne}{#f/1}* I once wanted the Royal Guard to have a culinary division.',
                    "<25>{#p/undyne}{#f/16}* We'd have gourmet restaurants, exquisite food...",
                    '<25>{#p/undyne}{#f/17}* ... and then, Asgore tasted my cooking.',
                    '<18>{#p/papyrus}{#f/4}HMM...',
                    "<18>{#p/papyrus}{#f/9}MAYBE YOU JUST DIDN'T ADD ENOUGH MARINARA SAUCE!",
                    '<25>{#p/undyne}{#f/3}* No amount of marinara sauce could fix THAT atrocity.'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}THE LAST TIME I TRIED TO ORDER IT, THEY...',
                    "<18>{#p/papyrus}{#f/5}... LET'S JUST SAY THE CONCEPT WAS BEYOND THEM."
                 ]
               : [ '<18>{#p/papyrus}{#f/4}MAYBE I SHOULD HAVE BEEN THE ONE COOKING.' ]
      ),
      a_hub2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}LIFE IS LIKE A CHESS GAME.',
            '<18>{#p/papyrus}{#f/5}MINUS ALL OF THE BLUNDERING...',
            '<18>{#p/papyrus}{#f/5}AND CAPTURING OF PIECES...',
            '<18>{#p/papyrus}{#f/6}AND, UH...',
            '<18>{#p/papyrus}{#f/4}ACTUALLY, LIFE IS ALMOST NOTHING LIKE A CHESS GAME.',
            '<18>{#p/papyrus}{#f/0}BUT THEY DO HAVE ONE THING IN COMMON.',
            '<18>{#p/papyrus}{#f/9}WHICH IS THAT YOU NEVER KNOW WHAT TO EXPECT!!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* So, kind of like a box of tree saps, then.',
                    '<18>{#p/papyrus}{#f/0}YEAH, KIND OF LIKE THAT!',
                    "<18>{#p/papyrus}{#f/4}WAIT, ISN'T IT SUPPOSED TO BE A BOX OF CHOCOLATES?",
                    '<25>{#p/undyne}{#f/14}* That would be the human expression.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}PERHAPS IT'S MORE LIKE A BOX OF CHOCOLATES." ]
               : [ '<18>{#p/papyrus}{#f/0}CHOCOLATE AND TREE SAP TASTES VERY SIMILAR, ACTUALLY.' ]
      ),
      a_lookout: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}IN TIME, WE MAY ALL BE EXPLORERS AMONGST THE STARS.',
            '<18>{#p/papyrus}{#f/5}WE MAY VENTURE OUT INTO THE GREAT UNKNOWN...',
            '<18>{#p/papyrus}{#f/5}EJECTING OURSELVES FAR FROM THIS PRISON OF OLD.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* You didn't tell me you were planning a PRISON break!",
                    "<18>{#p/papyrus}{#f/5}DON'T WORRY, IT'S JUST AN ALLEGORY FOR FREEDOM.",
                    '<18>{#p/papyrus}{#f/4}A -REAL- PRISON BREAK WOULD BE FAR TOO SUSPICIOUS.',
                    '<25>{#p/undyne}{#f/16}* Yeah, yeah...',
                    '<18>{#p/papyrus}{#f/5}BESIDES, IF I WANTED TO DO ONE PROPERLY...',
                    "<18>{#p/papyrus}{#f/6}I'D HAVE TO PLAN ALL THE EMERGENCY MEETINGS!",
                    "<25>{#p/undyne}{#f/12}* Sheesh, that'd be quite the task."
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}LET'S JUST HOPE THAT, WHEN WE REACH THE STARS...",
                    "<18>WE DON'T MEET ANY OF THOSE MOLE-RAT IMPOSTORS."
                 ]
               : [ '<18>{#p/papyrus}{#f/5}MY APOLOGIES.', "<18>{#p/papyrus}{#f/4}I DIDN'T MEAN TO VENT." ]
      ),
      a_hub3: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/6}ISN'T THAT WHERE THE CHILLY FOLKS HANG OUT?",
            '<18>{#p/papyrus}{#f/5}I FEEL KIND OF BAD FOR THEM...',
            '<18>{#p/papyrus}{#f/9}... WHICH IS WHY I PLAN TO BUY THEM A FRIDGE SOMEDAY!',
            "<18>{#p/papyrus}{#f/0}THAT WAY, THEY'LL ALWAYS HAVE A COLD PLACE NEARBY.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Speaking of nearby...',
                    "<25>{#p/undyne}{#f/8}* We're RIGHT in the next room over!!",
                    '<18>{#p/papyrus}{#f/9}CORRECT!!\nRIGHT DOWN HERE!!',
                    '<25>{#p/undyne}{#f/17}* Over, not down.',
                    "<18>{#p/papyrus}{#f/6}... IT'S DOWN ON THE FLOOR PLAN!!",
                    '<25>{#p/undyne}{#f/14}* I doubt the human even knows what that looks like.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}ISN'T TECHNOLOGY WONDERFUL?" ]
               : [
                    '<18>{#p/papyrus}{#f/6}WHAT ARE YOU WAITING FOR!!!\nCOME ON DOWN!!',
                    '<25>{#p/undyne}{#f/7}* He means OVER!!'
                 ]
      ),
      a_plaza: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}THAT'S WHERE BURGIE'S SHOP IS.",
            '<18>{#p/papyrus}{#f/6}ALTHOUGH WHAT HE SELLS IS BASICALLY JUNK FOOD...',
            '<18>{#p/papyrus}{#f/5}HE DOES SEEM LIKE A REALLY GENUINE GUY.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/12}* That's definitely one way of putting it.",
                    '<18>{#p/papyrus}{#f/5}ADMITTEDLY, HE CAN BE A BIT STRESSFUL TO TALK TO.',
                    "<18>{#p/papyrus}{#f/6}BUT I DON'T THINK THAT'S HIS FAULT!!",
                    "<18>{#p/papyrus}{#f/4}IT'S... ACTUALLY KIND OF METTATON'S FAULT.",
                    "<18>{#p/papyrus}{#f/9}BUT DON'T WORRY!\nI'LL CONFRONT HIM LATER ABOUT IT!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}ONCE YOU EARN HIS RESPECT, OF COURSE.' ]
               : [ '<18>{#p/papyrus}{#f/4}THAT ROBOT AND I HAVE... A LOT TO DISCUSS.' ]
      ),
      a_elevator5: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}THIS \"REC CENTER\" IS CERTIANLY RECREATIONAL...',
            '<18>{#p/papyrus}{#f/5}... IN MORE WAYS THAN ONE.',
            "<18>{#p/papyrus}{#f/6}WHAT'S SO AMAZING ABOUT WISH FLOWERS, ANYWAY?",
            '<18>{#p/papyrus}{#f/4}DOES THEIR AURA MAKE ALL YOUR WISHES COME TRUE?',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}HMM... MAYBE I SHOULD TRY IT SOMETIME.' ]
               : [
                    "<25>{#p/undyne}{#f/14}* I don't think you'd enjoy it, Papyrus.",
                    "<25>{#p/undyne}{#f/17}* It's not your style.",
                    "<18>{#p/papyrus}{#f/5}YEAH, YOU'RE PROBABLY RIGHT.",
                    '<25>{#p/undyne}{#f/14}* Of course I am.',
                    '<18>{#p/papyrus}{#f/9}STILL, IT NEVER HURTS TO TRY!!',
                    '<25>{#p/undyne}{#f/17}* ...'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}BETTER NOT DO IT IN THE REC CENTER, THOUGH.',
            '<18>{#p/papyrus}{#f/4}TALK ABOUT BEING A NUSCIENCE.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/12}* Pfft, yeah...' ])
         ]
      ),
      a_hub4: pager.create(
         0,
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}SO THERE'S LOTS TO DO UP THERE, HUH?",
                    '<18>{#p/papyrus}{#f/9}SOUNDS LIKE A GREAT PLACE TO HANG OUT!!',
                    "<18>{#p/papyrus}{#f/0}I'LL HAVE TO VISIT SOMETIME.",
                    "<18>{#p/papyrus}{#f/4}I'D PREFER IT OVER STANDING IN FRONT OF UNDYNE'S HOUSE."
                 ]
               : [ "<25>{#p/undyne}{#f/8}* Wanna talk?\n* We're right here, punk!" ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}MAYBE, AFTER WE HANG OUT WITH HER...',
                    '<18>{#p/papyrus}{#f/0}WE COULD ALL COME HERE TOGETHER!'
                 ]
               : [ "<25>{#p/undyne}{#f/8}* Wanna talk?\n* We're right here, punk!" ]
      ),
      a_sleeping1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}I HEAR THIS HOTEL IS MADE IN EXTRA DIMENSIONS.',
            '<18>{#p/papyrus}{#f/4}DIMENSIONS...\nLAYERS...',
            '<18>{#p/papyrus}{#f/5}DO THEY GIVE US EXTRA BLANKETS TO TAKE NAPS WITH?',
            '<18>{#p/papyrus}{#f/0}ASKING FOR A FRIEND, OF COURSE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* Right, because YOU just stay awake all the time.',
                    "<18>{#p/papyrus}{#f/0}EXACTLY!\nI CAN'T WASTE MY TIME NAPPING.",
                    '<25>{#p/undyne}{#f/14}* What about sleeping?',
                    '<18>{#p/papyrus}{#f/6}SLEEPING???',
                    "<18>{#p/papyrus}{#f/4}... THAT'S JUST AN EXCUSE MY BROTHER USES TO TAKE NAPS.",
                    '<25>{#p/undyne}{#f/17}* Obviously!!'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}OH, ME?\nI DON'T TAKE NAPS.",
                    '<18>{#p/papyrus}{#f/4}I JUST HAPPEN TO CLOSE MY EYES FOR A WHILE.'
                 ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S A MIRACLE HE MAKES IT OUT OF BED ANYMORE." ]
      ),
      a_hub5: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/6}IF YOU'RE LEAVING THE REC CENTER, I...",
            "<18>{#p/papyrus}{#f/5}WON'T BE ABLE TO REACH YOU.",
            "<18>{#p/papyrus}{#f/4}IF YOU'RE ON THE RETURN TRIP, THOUGH...",
            "<18>{#p/papyrus}{#f/0}... THEN THERE'S NO NEED TO WORRY!!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* It's not like we're going anywhere.",
                    '<18>{#p/papyrus}{#f/6}NOT AT ALL!!',
                    '<18>{#p/papyrus}{#f/5}THOUGH, AT SOME POINT, WE WILL INEVITABLY LEAVE.',
                    "<25>{#p/undyne}{#f/16}* I mean, that's true, but...",
                    '<25>{#p/undyne}{#f/17}* This is no time to be worrying about that!',
                    '<18>{#p/papyrus}{#f/0}QUITE RIGHT.'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}SO ARE YOU COMING, OR GOING?',
                    "<18>{#p/papyrus}{#f/5}IT'S HARD TO TELL WHICH WAY IS WHICH AROUND HERE."
                 ]
               : [ '<18>{#p/papyrus}{#f/6}STOP WORRYING!!' ]
      )
   },

   s_save_starton: {
      s_crossroads: {
         name: 'Starton - Landing Zone',
         text: () =>
            SAVE.data.n.plot < 29
               ? world.edgy
                  ? [ '<32>{#p/human}* (Missing skeletons fill you with determination.)' ]
                  : [ "<32>{#p/human}* (The skeleton brothers' antics fill you with determination.)" ]
               : papreal() || world.runaway
               ? [ '<32>{#p/human}* (The box is so lonely, it fills you with determination anyway.)' ]
               : [ '<32>{#p/human}* (The box can rest easy now.)\n* (This, of course, fills you with determination.)' ]
      },
      s_pacing: {
         name: 'Starton - Moon Rock Road',
         text: () =>
            world.runaway || epilogueOverride(world.population < 6) || world.genocide || roomKills().s_pacing > 1
               ? SAVE.data.n.plot < 29
                  ? [ '<32>{#p/human}* (The starlight dims.)\n* (Somehow, this fills you with determination.)' ]
                  : [ '<32>{#p/human}* (The starlight has faded.)\n* (Indeed, this fills you with determination.)' ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The frivolous arguments once had in this room have ceased.)',
                    '<32>* (This fills you with determination.)'
                 ]
               : [
                    '<32>{#p/human}* (Moon rock merchants argue frivolously in the foreground.)',
                    '<32>* (This fills you with determination.)'
                 ]
      },
      s_spaghetti: {
         name: 'Starton - Spaghetti Junction',
         text: () =>
            [
               [ '<32>{#p/human}* (A plate of spaghetti defying the laws of physics fills you with determination.)' ],
               [
                  '<32>{#p/human}* (The spaghetti no longer defies the laws of physics.)',
                  '<32>{#p/human}* (This fills you with determination.)'
               ],
               [ '<32>{#p/human}* (The spaghetti is no more.)', '<32>{#p/human}* (This fills you with determination.)' ]
            ][trueSpaghettiState()]
      },
      s_town1: {
         name: 'Starton - Town',
         text: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The town may be abandoned, but its cuteness remains.)',
                    '<32>{#p/human}* (This fills you with determination.)'
                 ]
               : papreal() || world.runaway
               ? [ '<32>{#p/human}* (A shadow looms over town, filling you with determination.)' ]
               : [ '<32>{#p/human}* (This cute little town fills you with determination.)' ]
      }
   }
};


// END-TRANSLATE
