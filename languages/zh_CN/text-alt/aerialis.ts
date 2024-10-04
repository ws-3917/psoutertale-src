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
               ? ["<32>{#p/basic}* 核心控制台。\n* 看来，能量所剩不多了。"]
               : [
                  world.postnoot
                     ? "<32>{#p/basic}* 核心控制台。\n* 近期，大气系统被人动过手脚。"
                     : world.bad_robot && 68 <= SAVE.data.n.plot
                        ? "<32>{#p/basic}* 核心控制台。\n* 看来，能量所剩无几了。"
                        : "<32>{#p/basic}* 核心控制台。\n* 看来一切正常。",
                  ...(!world.genocide && !world.badder_lizard && SAVE.data.b.a_state_corecall && SAVE.data.n.plot < 68
                     ? [
                        ["<25>{#p/alphys}{#g/alphysOhGodNo}* 请别碰！！"],
                        ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 别玩了。'],
                        ['<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'],
                        []
                     ][Math.min(SAVE.data.n.state_aerialis_terminter++, 3)]
                     : [])
               ]),
         ...(world.meanie && !world.genocide && world.badder_lizard
            ? [
               "<32>{#p/human}* （你发现四下无人。）",
               "<32>{#p/human}* （你萌生了一个想法。）\n* （虽然你深知，这会直接摧毁\n  整个前哨站的大气系统，但...）",
               choicer.create('* （砸烂控制台吗？）', '是', '否')
            ]
            : [])
      ],
      termsmash1: ['<32>{#p/human}* （你放弃了砸终端的念头。）'],
      termsmash2: ['<32>{#p/human}* （你挥动武器，砸了下去...）'],
      puzzlenoot1: () => [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         world.nootflags.has('a_barricade1') // NO-TRANSLATE

            ? '<25>{#p/alphys}{#g/alphysInquisitive}* Did the puzzle solve itself as well?'
            : "<25>{#p/alphys}{#g/alphysInquisitive}* Huh, the puzzle looks like it's already been solved.",
         '<25>{#p/alphys}{#g/alphysFR}* How strange.',
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      puzzlenoot2: () => [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         world.nootflags.has('a_puzzle1') // NO-TRANSLATE

            ? "<25>{#p/alphys}{#g/alphysWelp}* And this one.\n* This one's solved as well."
            : "<25>{#p/alphys}{#g/alphysWelp}* Huh... seems like the puzzle's already been done by someone.",
         "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* We'll take it!!",
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      noequip: ['<32>{#p/human}* （你打算不这么做。）'],
      evac: ['<32>{#p/human}* （你感觉周围的怪物越来越少了。）'],
      endo: ['<32>{#p/human}* (You note the poor quality of this table.)'],
      businessKILLER: [
         '<32>{#p/basic}{#npc/a}* Just so ya know, kiddo...',
         "<32>* The Royal Guard'll be all over ya for that sorta thing.",
         "<32>* If I were ya, I'd quit while I was ahead.",
         "<32>* But that's just my take."
      ],
      harpyKILLER: ["<32>{#p/basic}* Huhehehaw...\n* Golly gosharoo, I think I'm in mortal danger!"],
      shopclosed: ['<32>{#p/human}* （没必要再踏足了。）'],
      afear: [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         '<25>{#p/alphys}{#g/alphysNervousLaugh}* Uh, h-hey...',
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* Sorry about... running off and stuff...',
         '<25>{#p/alphys}{#g/alphysIDK}* ...',
         "<25>{#p/alphys}{#g/alphysNervousLaugh}* You'll be fine, right?\n* You won't...",
         "<25>{#p/alphys}{#g/alphysNervousLaugh}* You won't get into any more trouble, will you?",
         '<25>{#p/alphys}{#g/alphysSideSad}* ...',
         "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* Please...\n* D-don't do anything crazy, okay?",
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      escape: [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         '<25>{#p/alphys}{#g/alphysCutscene1}* 你做到了！',
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
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      approachescape: ['<32>{#p/human}* (You hear footsteps fading into the distance.)'],
      puzzlehelp: [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         "<25>{#p/alphys}{#g/alphysWelp}* 打你电话只是跟你\n  说一下，如果遇到困难\n  可以随时找我帮忙。",
         "<25>{#p/alphys}{#g/alphysCutscene2}* I'll keep my phone available while you're in the room!",
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      riverboi1: () => [
         '<32>{#p/basic}{#npc/a}* 我是旅人。\n* 我可以驾驶我的运输船\n  带你周游前哨站。',
         '<32>* 你想去哪呢？',
         choicer.create(
            '* （你要怎么回答？）',
            game.room === 'w_wonder' // NO-TRANSLATE

               ? '取消'
               : '外域',
            game.room === 's_taxi' // NO-TRANSLATE

               ? '取消'
               : '星港',
            game.room === 'f_taxi' // NO-TRANSLATE

               ? '取消'
               : '铸厂',
            game.room === 'a_lookout' // NO-TRANSLATE

               ? '取消'
               : '空境'
         )
      ],
      riverboi2: pager.create(
         2,
         ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速开的很快。\n* 运气不错..."],
         ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速开的很快。\n* 运气有点背..."],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 有时候也记得要休息一下...'],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 大家都知道那首从音乐盒里传来的老歌...',
            '<32>{#p/basic}{#npc/a}* ... 你知道它还有别的版本吗?\n* 前几段还行。'
         ],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 不要把手脚伸出船外...',
            '<32>{#p/basic}{#npc/a}* ... 当然，还有你的灵魂。'
         ],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 我听闻托丽尔有一款钟情的饮品。'],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 我听闻艾斯戈尔有一款钟情的美食。'],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 谨记我们伟大的国王艾罗戈...',
            '<32>{#p/basic}{#npc/a}* ... 还有他的子嗣。'
         ],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 提米村庄...',
            '<32>{#p/basic}{#npc/a}* ... 坐落在短梯子左边的房间里。'
         ],
         ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 要不要和我一同轻唱几声?\n* 恰啦啦。"],
         ["<32>{#p/basic}{#npc/a}* 嗯哼哼...\n* 嗯哼哼...\n* 这是我的小型音乐会。"],
         ['<32>{#p/basic}{#npc/a}* 摸摸摸...\n* 脖子延伸到宇宙。'],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 记得付路费...',
            '<32>{#p/basic}{#npc/a}* ... 时间与空间都弥足珍贵。'
         ],
         ['<32>{#p/basic}{#npc/a}* 人类，怪物...\n* 群星。'],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 玉米热狗，多多益善...',
            '<32>{#p/basic}{#npc/a}* ... 要是它们能一直待在你头上就好了。'
         ],
         [
            "<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 别随便偷看别人的工作场所...",
            '<32>{#p/basic}{#npc/a}* ... 他们可能会把你当成小偷。'
         ],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速路上有点颠簸。'],
         ['<33>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速路上很平稳。'],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦\n* 皇家科学员也有自己的秘密...'],
         ['<32>{#p/basic}{#npc/a}* 一，二，三，四，五，六...', '<32>* ... 已经到极限了。'],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 那个机器人巨星也有着不幸的过去...'],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 嘀哩哩。\n* 啼嘞嘞。'],
         
         ['<32>{#p/basic}{#npc/a}* 叮咯咯。\n* 吐噜噜。', '<32>* ... 啊啦，拟音字都用完了。'],
         [
            '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 记得每天都要吃一个幽灵水果。',
            "<32>{#p/basic}{#npc/a}* ... 为什么？\n* 这样我就知道你有听我的话了..."
         ],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 你有没有听说过群星之歌？'],
         [
            "<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 有什么游戏可以和狗狗一起玩呢？",
            '<32>{#p/basic}{#npc/a}* ... 问问你的朋友吧。'
         ],
         ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 狗的正义，狗的正义遍布各处。']
      ),
      riverboi2x: ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 没时间闲言碎语了。'],
      riverboi3: () => [
         '<32>{#p/basic}{#npc/a}* 我是旅人。\n* 艾菲斯博士让我到这儿来。',
         '<32>* 你想到空境去，是吗？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      riverboi4: ['<32>{#p/basic}{#npc/a}* 感谢你乘坐我的运输船。\n* 我的任务完成了。'],
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
            "<25>{#p/sans}{#f/0}* 我在这卖点玉米热狗，\n  5G一个，喜欢就尝尝。",
            choicer.create('* （花5G买一个热狗吗？）', '是', '否')
         ],
         () => ['<25>{#p/sans}{#f/0}* 玉米热狗，5G一个。', choicer.create('* （花5G买一个热狗吗？）', '是', '否')]
      ),
      corndog2: [
         "<32>{#p/human}* （你带的东西太多了。）",
         "<25>{#p/sans}{#f/2}* tell you what, i'll just drop it right here."
      ],
      corndog2b: ['<25>{#p/sans}{#f/2}* here you go.'],
      corndog3: ["<32>{#p/human}* （你的钱不够。）"],
      corndog3x: () =>
         [
            [
               "<25>{#p/sans}{#f/0}* 你连5G都没有？",
               '<25>{#p/sans}{#f/3}* 要不...\n* 我给你点钱吧。',
               '<32>{#s/equip}{#p/human}* （你得到了100G。）',
               '<25>{#p/sans}{#f/2}* 希望这点钱能帮到你。'
            ],
            [
               '<25>{#p/sans}{#f/0}* 又没钱了？',
               "<25>{#p/sans}{#f/3}* ...呃。\n* 没事。",
               "<25>{#p/sans}{#f/2}* 我也不差那5G，就请你吃吧。"
            ]
         ][SAVE.data.n.cornmoney++],
      corndog4: () =>
         [
            ['<32>{#p/human}* （你得到了玉米热狗。）', '<25>{#p/sans}{#f/2}* 请慢用。'],
            [
               '<32>{#p/human}* （你得到了玉米热羊。）',
               '<25>{#p/sans}{#f/2}* 哎呀，不好意思。\n  应该是狗狗的。'
            ],
            ['<32>{#p/human}* （你得到了玉米热狗。）']
         ][Math.min(SAVE.data.n.state_aerialis_corngoat++, 2)],
      corndog5: ['<32>{#p/human}* （你决定先不买。）'],
      corndog6: () =>
         SAVE.data.b.svr
            ? ['<32>{#p/human}* (This sentry station strikes you as rather outrageous.)']
            : world.darker
               ? ["<32>{#p/basic}* 一个哨站。"]
               : ['<32>{#p/basic}* Just another sentry station for the one and only Sans.'],
      sanscall1: () => [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
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
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      tvm1: ['<32>{#p/human}* （你获得了一台老式收音机。）', '<32>{#p/basic}{#npc/a}* Hope you like your new radio!'],
      tvm2: ['<32>{#p/human}* （你获得了一箱烟花。）', '<32>{#p/basic}{#npc/a}* Hope you enjoy the fireworks!'],
      tvm3: ["<32>{#p/human}* （你带的东西太多了。）"],
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
         '<32>{#s/equip}{#p/human}{#npc}* （你获得了999G。）',
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
      tvm8: ['<32>{#p/human}* （你获得了一台老式收音机。）'],
      tvm9: ['<32>{#p/human}* （你获得了一箱烟花。）'],
      lockup0: () =>
         SAVE.data.b.svr ? ["<32>{#p/human}* (But you didn't have the key.)"] : ["<32>{#p/basic}* 锁住了。"],
      lockup1: () => [
         '<32>{#p/human}* （你用生锈的钥匙打开了保险箱。）',
         ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* 柜子上的标签写着\n  “古老的地球武器”。'])
      ],
      lockup2: ['<32>{#p/human}* （你拿走了一把电击枪。）'],
      lockup3: ['<32>{#p/human}* （你拿走了一颗瞌睡弹。）'],
      lockup4: ['<32>{#p/human}* （你拿走了一瓶糖雾喷。）'],
      lockup5: () =>
         SAVE.data.b.svr
            ? ["<32>{#p/human}* （里面已经空空如也。）"]
            : ["<32>{#p/basic}* 空空如也。"],
      lockup6: ["<32>{#p/human}* （你带的东西太多了。）"],
      gonezo: () =>
         world.bulrun ? ['<32>{#p/basic}* ...但是大家都逃走了。'] : ['<32>{#p/basic}* ...但是谁也没有来。'],
      spidershop1: () => [
         SAVE.data.n.plot === 72
            ? choicer.create('* （在蜘蛛网里放36G吗？）', '是', '否')
            : choicer.create('* （在蜘蛛网里放56G吗？）', '是', '否')
      ],
      spidershop2: [
         '<32>{#p/basic}* 几只蜘蛛爬了下来，\n  并给了你一样东西。',
         '<32>{#s/equip}{#p/human}* （你得到了豪华涡旋棒棒糖。）'
      ],
      spidershop3: ["<32>{#p/human}* （你带的东西太多了。）"],
      spidershop4: ["<32>{#p/human}* （你的钱不够。）"],
      spidershop5: ['<32>{#p/human}* （你不打算这么做。）'],
      spidershop6: [
         "<32>{#p/basic}* 蛛网编织成了一行字。",
         '<32>{#p/basic}* “安息吧，蜘蛛女王。”'
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
               choicer.create('* (Take the food?)', '是', '否')
            ]
            : ["<33>{#p/basic}* It's a kind of mysterious food.", choicer.create('* (Take the food?)', '是', '否')],
      hotelfood1: () => [
         '<32>{#p/human}* （你拿走了神秘食物。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [
               "<25>{#p/asriel1}{#f/15}* That... thing... can't be healthy for you.",
               '<25>{#f/16}* I hope you realize that.'
            ]
            : [])
      ],
      hotelfood2: ["<32>{#p/human}* （你带的东西太多了。）"],
      hotelfood3: ['<32>{#p/human}* （你不打算这么做。）'],
      sonic1: () => [
         '<32>{#p/human}* （你捡到了一个声波谐振器。）',
         choicer.create('* （启动声波谐振器吗？）', '是', '否')
      ],
      sonic2: ["<32>{#p/human}* （你带的东西太多，装不下它了。）"],
      tablaphone1: () => [
         '<32>{#p/human}* （你捡到了一架塔布拉木琴。）',
         choicer.create('* （架起塔布拉木琴吗？）', '是', '否')
      ],
      tablaphone2: ["<32>{#p/human}* （你带的东西太多，装不下它了。）"],
      moonpie1: () => [
         '<32>{#p/human}* （你拿走了月派。）',
         ...(SAVE.data.b.svr
            ? ['<32>{#p/human}* (The attached note describes an intention to help someone in need.)']
            : [
               "<32>{#p/basic}* 派的上面粘着一张字条...",
               '<32>{#p/basic}* “我知道，自己与众不同。\n   在前哨站，我总是不合群。”',
               '<32>{#p/basic}* “但也许在某处，\n   也有个像我一样的人。”',
               '<32>{#p/basic}* “他十分善良，却常常被误解...”',
               '<32>{#p/basic}* “他需要额外的生命值用以自保...”',
'<32>{#p/basic}* “我希望，能用这块派帮到他。”'
            ])
      ],
      moonpie2: ["<32>{#p/human}* （你带的东西太多，装不下它了。）"],
      ratings: '$(x)人正在看',
      gold: '获胜奖金 $(x)G',
      secretcall: [
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         '<18>{#p/papyrus}{#f/5}PAPYRUS HERE.',
         "<18>{#f/5}I'VE DECIDED I CAN'T HIDE AWAY ANY LONGER.",
         '<18>{#f/6}THE PEOPLE OUT THERE NEED MY HELP!',
         '<18>{#f/5}AND, ULTIMATELY...',
         "<18>{#f/6}I'D LIKE TO CATCH UP WITH YOU IN PERSON AGAIN.",
         '<18>{#f/7}IF \"ASRIEL\" SEES ME ALIVE, THEN SO BE IT!',
         '<18>{#f/7}I REFUSE TO STAND AROUND AND DO NOTHING ALL DAY.',
         '<18>{#f/4}...',
         '<18>{#f/4}SEE YOU SOON.',
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      story: {
         phonegrabber1: () => [
            game.room === 'a_lab_downstairs' // NO-TRANSLATE

               ? "<33>{#p/basic}* 艾菲斯的备用机。\n* 自带一张升降机通行证\n  和两个次元箱子。"
               : "<32>{#p/basic}* 一部智能手机。\n* 自带一张升降机通行证\n  和两个次元箱子。",
            ...(world.genocide
               ? ['<32>{#p/basic}* 很奇怪，\n  一次性便携飞行器的槽\n  居然是空的。']
               : ['<32>{#p/basic}* 此外，\n  还有个一次性的便携式喷气背包。'])
         ],
         phonegrabber2: ['<32>{#p/human}* （你有了一部新手机。）'],
         phonegrabber3: () =>
            SAVE.flag.n.ga_asrielGetThePhone > 1
               ? ['<25>{#p/asriel2}{#f/10}* 终于啊。']
               : ["<25>{#p/asriel2}{#f/10}* 不知道上面有没有聊天记录。"],
         alphys1: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? ['<25>{#p/alphys}{#f/2}* 我的天啊！', '<25>{#f/3}* How did you...']
               : ['<25>{#p/alphys}{#f/2}* 我的天啊！', '<25>{#f/3}* 你怎么这么快就到了！？'],
         alphys2: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? ["<25>{#p/alphys}{#f/10}* O-oh... you're the human who...", '<25>{#f/3}* Who... uh...']
               : ["<25>{#f/4}* 我刚接完电话，\n  还没检查实验室...", '<25>{#f/17}* ...'],
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
                        '<25>{#f/1}* 嗯，呃，你-你好！',
                        "<25>{#f/1}* 我是艾菲斯博士。\n* 皇家科学部门的负责人。",
                        '<25>{#f/10}* 但是，呃，\n  我不是那些“坏家伙”！',
                        "<25>{#f/17}* 实际上，从你刚刚走出\n  外域时，我就...",
                        '<25>{#f/5}* 诶嘿，用我的安全控制台\n  “观察”你。',
                        '<25>{#f/8}* 你的战斗...\n* 你的朋友们...',
                        '<25>{#f/1}* 你的一切！',
                        '<25>{#f/9}* 哦！然后我\n  最喜欢的部分就是...',
                        ...(SAVE.data.b.s_state_million
                           ? [
                              "<25>{#f/16}* ...看到你超过了\n  衫斯作弊打出来的分数！",
                              '<25>{#f/12}* 太厉害了...'
                           ]
                           : SAVE.data.b.f_state_thundersnail_win
                              ? [
                                 '<25>{#f/16}* ...看到你赢了一局\n  雷霆蜗牛！',
                                 '<25>{#f/12}* 太厉害了...'
                              ]
                              : !SAVE.data.b.papyrus_fire
                                 ? [
                                    '<25>{#f/16}* ...看到你第一次尝试\n  就通过了火焰之墙！',
                                    '<25>{#f/12}* 太厉害了...'
                                 ]
                                 : SAVE.data.b.s_state_mathpass
                                    ? [
                                       '<25>{#f/16}* ...看到你靠自己一个人\n  破解了数字中和谜题！',
                                       '<25>{#f/12}* 太厉害了...'
                                    ]
                                    : ['<25>{#f/16}* ...看到了你和\n  安黛因战斗？？？']),
                        "<25>{#f/18}* 但是，呃，你需要\n  我的引导来通过空境！"
                     ],
                     [
                        '<25>{#f/8}* 嗯，你-你好...',
                        "<25>{#f/9}* 我是...艾菲斯博士。\n* 皇家科学部门的负责人。",
                        "<25>{#f/4}* 从你刚刚走出外域时，\n  我就...",
                        '<25>{#f/4}* 诶嘿，用我的安全控制台\n  “观察”你。',
                        '<25>{#f/11}* 你的战斗...\n* 你的朋友们...',
                        '<25>{#f/11}* ...',
                        ...(SAVE.data.n.state_starton_papyrus === 1
                           ? ["<25>{#f/13}* 甚至...\n* 帕派瑞斯的死-死亡..."]
                           : SAVE.data.n.state_foundry_doge === 1 && SAVE.data.n.state_foundry_muffet === 1
                              ? ["<25>{#f/13}* ... even the deaths of Undyne's ELITE s-squad..."]
                              : SAVE.data.n.state_starton_dogs === 2 ||
                                 (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                                 (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
                                 (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) >
                                 1
                                 ? ['<25>{#f/13}* ... even the deaths of the c-canine unit...']
                                 : SAVE.data.n.state_starton_doggo === 2
                                    ? ["<25>{#f/13}* 甚至...\n* 遁狗的死-死亡..."]
                                    : SAVE.data.n.state_foundry_muffet === 1
                                       ? ["<25>{#f/13}* 甚至...\n* 玛菲特的死-死亡..."]
                                       : SAVE.data.n.state_foundry_doge === 1
                                          ? ["<25>{#f/13}* 甚至...\n* 督吉的死-死亡..."]
                                          : SAVE.data.n.state_starton_greatdog === 2
                                             ? ["<25>{#f/13}* 甚至...\n* 大犬座的死-死亡..."]
                                             : SAVE.data.n.state_starton_lesserdog === 2
                                                ? ["<25>{#f/13}* 甚至...\n* 小犬座的死-死亡..."]
                                                : ["<25>{#f/13}* ...甚至那些怪物们的\n  死-死亡..."]),
                        "<25>{#f/10}* ...不过，嘿，也不\n  全是坏事，是吧？",
                        "<25>{#g/alphysCutscene2}* 你还活着，\n  你完好无损地\n  来到了这里...",
                        '<25>{#f/3}* 这是很重要的，\n  对吧？？？',
                        '<25>{#g/alphysIDK}* ...',
                        "<25>{#g/alphysIDK}* 话虽如此，你可能\n  需要我指导你\n  穿过空境。"
                     ]
                  ][world.bad_lizard],
                  '<25>{#f/15}* 是的... 这里不是个\n  “对人类友好”的地方...',
                  '<25>{#f/17}* 致命的陷阱...\n* 不可能的谜题...\n* 皇家守卫...',
                  '<25>{|}{#f/15}* 更不用说- {%}'
               ],
         alphys4: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? ['<25>{#g/alphysIDK}* 不... 不不不不不...']
               : ['<25>{#f/20}* 镁塔顿。'],
         alphys5: () =>
            SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* 别是在这...\n  也别是现在啊...'] : ['<25>{#f/3}* 诶嘿...'],
         alphys6: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* ...'] : ['<25>{#f/20}* ...']),
         alphys7: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/23}* 哦天啊。'] : ['<25>{#f/11}* 哦不。']),
         alphys8: () => [
            SAVE.data.n.state_foundry_undyne > 0 ? '<32>{#p/mettaton}* 哦哦哦天啊！' : '<32>{#p/mettaton}* 哦哦哦耶！',
            '<32>{#p/mettaton}* 欢迎，美人儿们...'
         ],
         alphys9: ["<32>{#p/mettaton}* 来到今天的\n  达人秀节目！"],
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
                  "<32>{#p/mettaton}* 我已经预感到了\n  这次会是个超棒的节目哦！",
                  "<32>* 让我们以热烈的掌声\n  欢迎我们的新选手...",
                  '<33>* 唯一一位的人类访客！'
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
               : ['<32>{#p/mettaton}* 从来没有玩过吗，幸运儿？', "<32>* 没关系，很简单。"],
         alphys11a: () => [
            choicer.create(
               '* (Which name will you choose?)',
               '黄天霸主',
               '风云剑客',
               '狂怒剑皇',
               '星际游侠'
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
               : ["<32>* 实际上，规则只有一个！", '<32>* 拿出你一生中\n  最好的表现...'],
         alphys12: () =>
            iFancyYourVilliany()
               ? ['<32>{*}{#p/mettaton}* 把它搬上舞台！！！{^20}{%}']
               : ['<32>{*}{#p/mettaton}* 否则就会死！！！{^20}{%}'],
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
                        '<25>{#p/alphys}{#f/5}* 嘿...',
                        '<25>{#f/8}* 我知道这么说有点\n  莫名其妙，但是...\n  你真-真的很酷。'
                     ]
                     : [
                        '<25>{#p/alphys}{#f/5}* 嘿...',
                        '<25>{#f/8}* I know that kinda came outta nowhere, but...',
                        '<25>* You handled it p-pretty well.'
                     ]),
                  "<25>{#f/9}* 总之，呃，就像我说的，\n  你会需要我的帮助的。",
                  "<25>{#f/17}* 让我看看你身上\n  都带了些什么..."
               ],
         alphys14: [
            '<25>{#p/alphys}{#f/21}* ...',
            '<25>{#f/21}* 这是啥。',
            '<25>{#f/21}* 这是谁给你的。',
            '<25>{#f/22}* 谁还用这样的\n  老古董啊？？？',
            '<25>{#f/22}* ...',
            "<25>{#f/23}* 我马上回来。"
         ],
         alphys15: () =>
            world.bad_lizard < 1
               ? [
                  '<25>{#p/alphys}{#g/alphysCutscene1}* 好了，我给你搞了个\n  新手机！',
                  "<25>* 里面有升降机通行证，\n  次元箱子...",
                  '<25>{#g/alphysHellYeah}* 还有你自己的域外网账号！',
                  '<25>{#g/alphysSmileSweat}* 我顺便加了你的好友，\n  这样你需要帮助的时候\n  随时都能联系我了！',
                  '<25>{#g/alphysUhButHeresTheDeal}* 好耶！！',
                  '<32>{#s/equip}{#p/human}* （你有了一部新手机。）'
               ]
               : [
                  '<25>{#p/alphys}{#g/alphysWelp}* Sorry, but that thing you were using was a glorified brick.',
                  "<25>{#g/alphysSide}* This new phone's got a liftgate pass, dimensional boxes...",
                  '<25>{#g/alphysSmileSweat}* And your very own OuterNet account!',
                  "<25>{#g/alphysNervousLaugh}* Don't worry, I made us friends so you can ping me for help if needed.",
                  '<32>{#s/equip}{#p/human}* （你有了一部新手机。）'
               ],
         alphys16: ["<25>{#p/alphys}{#g/alphysWelp}* 我先去办公了。"],
         rg1a: () =>
            world.bad_lizard > 1
               ? world.goatbro
                  ? ['<32>{#p/basic}{#x1}* 你俩，站住！{#x3}']
                  : ['<32>{#p/basic}{#x1}* 你，站住！{#x3}']
               : ['<32>{#p/basic}{#x1}* 孩子，你好！{#x3}'],
         rg1b1: () =>
            world.bad_lizard > 1
               ? ['<32>{#p/basic}{#x1}* 前面的，那个，给个说法：\n  为啥把人都杀了？{#x3}']
               : ['<32>{#p/basic}{#x1}* 请问，那个，你知道\n  附近哪里有卖冰淇淋的吗？{#x3}'],
         rg1b2: () =>
            world.bad_lizard > 1
               ? ["<32>{#p/basic}{#x1}* 我和我男朋友...\n  觉得这事很蠢唉。{#x3}"]
               : ['<32>{#p/basic}{#x1}* 我和我男朋友附近都找遍了，\n  就是找不着！{#x3}'],
         rg1c: () =>
            world.bad_lizard > 1
               ? ['<33>{#p/basic}{#x2}* 草。\n* 兄弟，那个，\n  我看咱必须得干掉他们了。{#x3}']
               : [
                  '<32>{#p/basic}{#x1}* 孩子，你没事吧？{#x3}',
                  "<32>{#x1}* 那个，\n  你这行为举止有点不对劲...{#x3}",
                  '<32>{#x1}* 就好像，你一点都\n  “不想搭理我们”...{#x3}',
                  '<32>{#x1}* 呃...{#x3}'
               ],
         rg1d1: () =>
            world.bad_lizard > 1
               ? ["<32>{#p/basic}{#x1}* 对哦...\n* 这不就是咱们的任务嘛？{#x3}"]
               : ["<32>{#p/basic}{#x1}* 兄弟，别在意。\n* 我感觉这孩子只是\n  没看见咱们而已。{#x3}"],
         rg1d2: [
            '<32>{#p/basic}{#x2}* 但我想吃冰淇淋！{#x3}',
            "<32>{#p/basic}{#x1}* 别想什么冰淇淋啦，兄弟。\n* 摸鱼一时爽，被抓火葬场啊。{#x3}"
         ],
         rg1d3: ['<32>* ...', '<32>{#x2}* 唉，好吧。{#x3}'],
         rg1e: [
            '<32>{#p/basic}{#x1}* 那，回头见吧...{#x3}',
            "<32>{#x2}* 要是我们找到冰淇淋了，\n  下次见面，肯定告诉你！{#x3}"
         ],
         rg1f: [
            '<33>{#p/basic}{#x1}* 兄弟...\n  咱俩还是快走吧！{#x3}',
            '<32>{#x2}* 哦对。\n  那个，对不起了安黛因！{#x3}'
         ],
         robocaller1: () =>
            [
               [
                  '<32>{#p/mettaton}* 来了啊。',
                  '<32>{#z03}* 也许你不认得我，\n  但我认得你...',
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
                  '<32>{#z11}* 好吧，回见！'
               ],
               [
                  '<32>{#p/mettaton}* 小鬼，你来啦。',
                  '<32>{#z03}* 也许你不认得我，\n  但我认得你...',
                  '<32>{#z21}* 听着，你干了些什么缺德事，\n  我和艾菲斯可都看得清清楚楚。',
                  "<32>{#z00}* 要是你只是犯了点小错，\n  我们都能理解...",
                  '<32>* 真见鬼，\n  艾菲斯和我本来都很喜欢人类的。',
                  "<32>{#z03}* 结果你所表现出来的\n  只有无尽的暴力。",
                  "<32>{#z21}* 今天，艾菲斯...\n  也不打算掺和这破事了...",
                  "<32>{#z00}* 亲眼目睹你的暴行之后，\n 这对她也好。",
                  '<32>{#z21}* 我请你别再杀害无辜了，\n  你答应吗？',
                  '<32>{#z21}* ...',
                  '<32>{#z11}* 好吧，回见！'
               ],
               [
                  '<32>{#p/mettaton}* 来了啊。',
                  '<32>{#z03}* 也许你们不认得我，\n  不过...',
                  '<32>* ...',
                  '<32>{#z00}* ...',
                  "<32>* 我就实话实说吧。",
                  '<32>{#z11}* 你们就知道不停地杀杀杀。',
'<32>{#z11}* 开始我还很生气。\n* 但死得太多，\n  现在我都看麻木了。',
                  "<32>{#z00}* 但有一个人，我不能抛下。",
                  ...(SAVE.flag.n.genocide_milestone < 5
                     ? [
                        "<32>* 她不接电话...",
                        "<32>{#z21}* 她一直在线，\n  但就是不回消息。",
                        '<32>{#z11}* 她刚刚走的时候，\n  还留下一番话...',
                        '<32>{#z00}* ...让我很担心。'
                     ]
                     : [
                        "<32>{|}* 她不接- {%}",
                        '<25>{#z21}{#p/asriel2}{#f/8}* 告诉你，\n  她是准备要干掉我们呢。',
                        "<32>{#z00}{#p/mettaton}* 嗯，你说什么？\n* 打断别人说话，真没礼貌。"
                     ]),
                  '<32>* 人类，我听艾菲斯说，\n  你有一种特殊的能力。',
                  "<32>* 要是你还有点良心的话...",
                  '<32>* 就用它... \n  重置这条时间线吧。',
                  "<32>{#z11}* 不然，\n  你要是想一条道走到黑...",
                  "<32>{#z02}* 就等着遭报应吧。"
               ]
            ][Math.max(world.bad_lizard - 1, 0)],
         robocaller1x: [
            "<25>{#p/asriel2}{#f/13}* 就你，还敢威胁我们？",
            "<25>{#f/9}* 笑死我了。"
         ],
         robocaller2: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? [
                  '<32>{#p/mettaton}{#z11}* 哦？\n* 原来你们不知道啊，亲。',
                  '<32>{#z02}* 哈哈哈...',
                  '<32>{#z03}* 总之，你们给我记着...',
                  "<32>{#z12}* 不听劝的话，后果自负。",
                  '<32>{#z21}* ...',
                  '<32>{#z11}* 好吧，回见！'
               ]
               : [
                  "<32>{#p/mettaton}{#z11}* 无意冒犯，亲。\n* 但你说的也太离谱了。",
                  "<32>{#z03}* 艾菲斯不擅长战斗，\n  这可是她亲口说的。",
                  '<32>{#z12}* ...但我知道，\n  有个人，会好好收拾你们的。',
                  '<32>{#z02}* 哈哈哈...',
                  '<32>{#z21}* ...',
                  '<32>{#z11}* 好吧，回见！'
               ],
         robocaller2x: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? ['<25>{#p/asriel2}{#f/13}* 是吗？']
               : ['<25>{#p/asriel2}{#f/16}* 酷哦。'],
         status: '$(x)有新消息',
         barricade1: () => [
            '<32>{#p/event}* 铃铃，铃铃...',
            "<25>{#p/alphys}{#g/alphysSideSad}* I don't think you can get through that...",
            '<25>{#g/alphysSmileSweat}* Let me see if I can do anything to help.',
            '<32>{#p/human}* (It sounds like someone is furiously typing at a keyboard.)',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Security... w-what?',
            '<32>{#p/human}* (More typing can be heard.)',
            '<32>{#p/human}* （...）',
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
                  choicer.create('* （你要怎么回答？）', '艾菲斯', '艾斯戈尔', '帕派瑞斯', '安黛因')
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
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysCutscene2}* Okay, so the question for this one is...',
            '<25>{|}{#g/alphysCutscene1}* \"Who is Mettaton\'s- {%}',
            '<25>{#g/alphysGarbo}* Are they all seriously about himself?',
            '<25>{#g/alphysGarboCenter}* Man.',
            '<25>{#g/alphysWelp}* \"What is Mettaton\'s most successful product line?\"',
            choicer.create('* （你要怎么回答？）', '镁塔美妆', '镁塔厨具', '镁塔科技', '镁塔卫视')
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
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* 最后一个问题...',
            '<25>{#g/alphysNeutralSweat}* “镁塔顿的真实身份\n   是什么？”',
            '<25>{#g/alphysNeutralSweat}* ...',
            choicer.create('* （你要怎么回答？）', '42型机器人', '纳普斯乐', '阿德里安', '镁塔顿') 
         ],
         barricade3b1: [
            '<25>{#p/alphys}{#g/alphysCutscene2}* 啊，关于这个...',
            "<25>{#p/alphys}{#g/alphysCutscene3}* 我... 只完成过一个\n  镁塔顿的模型。",
            "<25>{#p/alphys}{#g/alphysFR}* 所以我知道\n  不可能是它。"
         ],
         barricade3b2: [
            '<25>{#p/alphys}{#g/alphysShocked}* 什...',
            '<25>{#g/alphysOhGodNo}* 你是怎么知道的？',
            "<25>{#g/alphysOhGodNo}* 不应该有人知道\n  这个的啊！！！",
            '<25>{#g/alphysNeutralSweat}* 你-你有告诉过\n  其他人吗？？',
            '<25>{#g/alphysNeutralSweat}* Are you planning to!?',
            '<25>{#g/alphysNeutralSweat}* ...',
            "<25>{#g/alphysNervousLaugh}* 行吧...\n  这至少不是镁塔顿的\n  真实身份。"
         ],
         barricade3b3: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* Aidrian?',
            '<25>{#g/alphysInquisitive}* 这又是什么逆天东西？',
            "<25>{#g/alphysSmileSweat}* 嗯，肯定不是它。"
         ],
         barricade3b4: [
            "<25>{#p/alphys}{#g/alphysCutscene1}* 所以说...\n  镁塔顿的真实身份\n  其实就是镁塔顿，嗯？",
            '<25>{#x1}* ...',
            '<25>{#p/alphys}{#g/alphysWelp}* Oh.\n* I guess it is.',
            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* The more you know!'
         ],
         barricade3c: [
            '<25>* ...',
            '<25>{#p/alphys}{#g/alphysSide}* 嗯... 我有个主意。',
            '<32>{#p/human}* (The typing from earlier resumes.)',
            '<25>{#p/alphys}{#g/alphysCutscene1}{#x1}* ...',
            '<25>{#p/alphys}{#g/alphysSmileSweat}* There!!!',
            '<25>{#g/alphysUhButHeresTheDeal}* Well, that was fun.'
         ],
         barricadeFail1: [
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
            "<25>{#g/alphysNeutralSweat}* 也不对...\n  看来我得对其进行覆写了。",
            '<25>{#g/alphysWelp}* ...',
            '<25>{#g/alphysWelp}* 这可能得花些时间。',
            "<25>{#g/alphysUhButHeresTheDeal}* 完事之后我会跟-\n  跟你说一声的！"
         ],
         barricadeFail2: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysSmileSweat}* 好-好了，\n  覆写已经完成。'
         ],
         barricadeFail2x: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* ...',
            '<25>{#g/alphysInquisitive}* 你是离开了那个房间吗？',
            '<25>{#g/alphysSide}* 呃，行吧。\n  现在路障已经消失了。'
         ],
         barricadeFail3: ['<25>{#p/alphys}{#g/alphysCutscene1}* 希望对你有所帮助！'],
         barricade4: () => [
            '<32>{#p/event}* 铃铃，铃铃...',
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
            '<32>{#s/equip}{#p/event}* 滴...'
         ],
         puzzleReaction1: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysHellYeah}* You did it!!',
            '<25>{#g/alphysNeutralSweat}* ...',
            '<25>{#g/alphysCutscene2}* C... congratulations.'
         ],
         cooker1a: ['<32>{#p/mettaton}* 你好啊。'],
         cooker1b: ["<32>{*}{#p/mettaton}* 欢迎来到前哨站的首期\n  创艺工坊节目！{^30}{%}"],
         cooker2a1: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* WHAT ARE WE MAKING TODAY?\n* SOMETHING FUN, OF COURSE!']
               : ['<32>{#p/mettaton}* 大家的工具都充好电了吗？\n  我们马上就要来搞一些\n  “劲爆”的玩意了！'],
         cooker2a2: () =>
            iFancyYourVilliany()
               ? ["<32>{#p/mettaton}* AFTER ALL, IT'S UP TO US TO SET A GOOD EXAMPLE!"]
               : ['<32>{#p/mettaton}* 哈哈哈...'],
         cooker2b: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/mettaton}* THIS BOISTEROUS BULLY WILL GATHER THE SUPPLIES.',
                  '<32>{#p/mettaton}* EVERYONE GIVE THEM THE SILENT TREATMENT THEY DESERVE!'
               ]
               : [
                  '<32>{#p/mettaton}* 我可爱的助手会去准备用品。',
                  '<32>* 请大家给予热烈的掌声！'
               ],
         cooker3a: () => [
            "<32>{#p/mettaton}* 我们需要三件重要的物品。",
            iFancyYourVilliany()
               ? '<32>* {@fill=#ff0}HAPPY POWDER{@fill=#fff}, {@fill=#ff0}TINGLE SERUM{@fill=#fff}, AND {@fill=#ff0}LOVE OIL{@fill=#fff}.'
               : '<32>* {@fill=#ff0}环三亚甲基三硝胺{@fill=#fff}，\n  {@fill=#ff0}己二酸二正辛酯{@fill=#fff}，和{@fill=#ff0}矿物油{@fill=#fff}。'
         ],
         cooker3b: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* HOP TO IT, $(moniker2u)!']
               : ['<32>{#p/mettaton}* 开始吧，甜心！'],
         cooker4a: ['<32>{#p/mettaton}* 好极了！', '<32>* 现在，让我...'],
         cooker4b: ['<32>{#p/mettaton}* 搞定！', "<32>* 我们要用这些东西..."],
         cooker5: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* ... TO MAKE MTT-BRAND {@fill=#003cff}FUN SLIME{@fill=#fff}! (TM)']
               : ['<32>{#p/mettaton}* ...来制作{@fill=#f00}塑性炸药{@fill=#fff}！'],
         cooker6: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* HERE IT COMES!']
               : ['<32>{#p/mettaton}* 祈祷吧，美人儿！'],
         cooker7a: () =>
            iFancyYourVilliany()
               ? [
                  '<32>{#p/event}* 铃铃，铃铃...',
                  '<25>{#p/alphys}{#g/alphysShocked}* Uh, w-wait!',
                  "<25>{#g/alphysOhGodNo}* That's not {@fill=#003cff}fun slime{@fill=#fff}...",
                  "<25>{#g/alphysUhButHeresTheDeal}* That's {@fill=#f00}plastic explosive{@fill=#fff}!"
               ]
               : [
                  '<32>{#p/event}* 铃铃，铃铃...',
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
         cooker7c: ['<32>{#p/mettaton}* 等等，这很可能让人丧命。'],
         cooker8a1: () =>
            iFancyYourVilliany()
               ? [
                  "<32>{#p/mettaton}* DON'T WORRY, THOUGH.",
                  '<32>* WITH ANY LUCK, THIS WILL SERVE AS A VALUABLE LESSON IN HOW NOT TO SABOTAGE MY SHOW.'
               ]
               : [
                  '<32>{#p/mettaton}* 抱歉，各位...',
                  "<32>* 看来我们今天\n  不会【制作】任何炸药了。"
               ],
         cooker8a2: () =>
            iFancyYourVilliany()
               ? [
                  "<32>* WHAT!?!?\n* THE ARTS 'N' CRAFTS WAS JUST A DISTRACTION FOR THIS!?!?",
                  "<32>* OH MY, $(moniker1u)'S VILLAINY TRULY KNOWS NO BOUNDS!"
               ]
               : ['<32>* 幸好我提前做了一些，对吧？'],
         cooker8b: () =>
            iFancyYourVilliany()
               ? [
                  '<32>* WELL, DEAR $(moniker2u), I STILL HAVE ONE LAST TRICK UP MY METAPHORICAL SLEEVE.',
                  "<32>* IF YOU DON'T CROSS THIS FIELD OF BOMBS IN {@fill=#ff0}NINETY SECONDS{@fill=#fff}..."
               ]
               : [
                  "<32>* 然后，为了增加紧张感，\n  你需要在{@fill=#ff0}九十秒{@fill=#fff}内飞过这片虚空..."
               ],
         cooker9: () =>
            iFancyYourVilliany()
               ? [
                  "<32>{#p/mettaton}* I'LL USE YOUR OWN CREATION AGAINST YOU AND {@fill=#f00}BLOW YOU TO SMITHEREENS{@fill=#fff}!"
               ]
               : ["<32>{#p/mettaton}* 不然就会被{@fill=#f00}炸成碎片{@fill=#fff}！"],
         cooker10: ['<32>{#p/mettaton}* 你最好现在开跑！！！'],
         cooker11: ["<32>{#p/basic}* 看起来靠你自己是无法穿越这里的。"],
         cooker12: () =>
            SAVE.data.n.state_foundry_undyne > 0
               ? [
                  '<32>{#p/event}* 铃铃，铃铃...',
                  '<25>{#p/alphys}{#f/20}* Uh... I...',
                  "<25>{#g/alphysIDK}* I d-don't know if this is a good idea...",
                  "<25>{#f/16}* B-but I'd rather help you than let you die!!",
                  "<25>{#f/10}* Wouldn't want to... s-stoop to that level, am I right?",
                  '<25>{#f/5}* So... basically, most cell phones around here...',
                  '<25>{#f/6}* Have a one-time use portable jetpack.',
                  '<25>{#f/10}* Maybe... your phone has one too??'
               ]
               : [
                  '<32>{#p/event}* 铃铃，铃铃...',
                  '<25>{#p/alphys}{#g/alphysSide}* Hey, uh...',
                  '<25>{#g/alphysCutscene1}* I think I know a way you can get across!',
                  "<25>{#g/alphysNervousLaugh}* It's... well...",
                  "<25>{#g/alphysSmileSweat}* It's not as good as Undyne's, but, the phone I gave you...",
                  '<25>{#g/alphysHellYeah}* It has a one-time use portable jetpack!',
                  '<25>{#g/alphysNervousLaugh}* Maybe... now would be a good time to try it??'
               ],
         cooker12x: ["<32>{#p/basic}* ...你意识到艾菲斯的手机\n  配备了个喷气背包。"],
         cooker13: () => [
            '<32>{#p/human}* （你激活了喷气背包。）',
            SAVE.data.n.state_foundry_undyne > 0
               ? '<25>{#p/alphys}{#f/3}* G-good luck?'
               : "<25>{#p/alphys}{#g/alphysHellYeah}* Now we're cooking!",
            '<32>{#s/equip}{#p/event}* 滴...',
            ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* This is absolutely bonkers.'])
         ],
         cooker13x: ['<32>{#p/human}* （你激活了喷气背包。）'],
         cooker14: ' $(x)',
         cooker15: '$(x)%',
         cooker16a: ['<32>{#p/mettaton}* 你知道在这儿会有生命危险...\n  对吧？'],
         cooker16b: ['<32>* ...'],
         cooker16c: ['<32>* 也许我们的嘉宾精神不太稳定。', '<32>* 这样的话...'],
         cooker16d: [
            "<32>* 这期节目就得被剪辑了！",
            "<32>* 不过，别担心。",
            "<32>* 我们的下一期节目甚至\n  【不需要】你保持理智！"
         ],
         cooker16e: () => [
            "<32>{#p/mettaton}* 好吧，到此为止。",
            ...(iFancyYourVilliany()
               ? [
                  '<32>* JUST KNOW THIS, \"$(moniker2u)...\"',
                  '<32>* THE NEXT TIME WE MEET, SANITY WILL BE THE LEAST OF YOUR WORRIES!'
               ]
               : ['<32>* 那么，下回再说吧...', '<32>* 让我们祝愿人类平安无事。'])
         ],
         cooker16f: [
            '<32>{#p/basic}* Huh??',
            "<32>* You could've gotten yourself killed right there!",
            "<32>* ... as if I didn't already know this was all just for show.",
            "<32>* Doesn't make it any less entertaining, though!"
         ],
         cooker17a: [
            '<32>{#p/mettaton}* 哎呀呀...',
            "<32>* 看起来... 你甚至一半都没走到？",
            "<32>* 天啊。\n* 这么说你要死了。",
            '<32>* 哈哈哈...',
            '<32>* ...',
            '<32>* ...开玩笑的。',
            '<32>* 你得安然无恙地参加下一期节目。'
         ],
         cooker17b: [
            '<32>{#p/mettaton}* 哎呀呀...',
            "<32>* LOOKS LIKE YOU DIDN'T QUITE MAKE IT, HUH?",
            "<32>* BUT HEY.\n* JUST BECAUSE YOU'RE SUCH A GOOD SPORT, I'LL LET YOU GO."
         ],
         cooker17c: () => [
            "<32>{#p/mettaton}* 好吧，到此为止。",
            ...(iFancyYourVilliany()
               ? [
                  '<32>* JUST KNOW THIS, \"$(moniker2u)...\"',
                  "<32>* THE NEXT TIME WE MEET, THINGS WON'T BE SO EASY FOR YOU!"
               ]
               : ['<32>* 那么，下回再说吧...', '<32>* 再见了各位！'])
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
            '<32>{#p/mettaton}* 哎呀呀...',
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
               : ['<32>* 那么，下回再说吧...', '<32>* 再见了各位！'])
         ],
         cooker19a: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysCutscene1}* You did it!!',
            '<25>{#g/alphysCutscene2}* ...',
            "<25>{#g/alphysUhButHeresTheDeal}* I guess I should've expected that."
         ],
         cooker19b: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysSideSad}* ...',
            '<25>{#g/alphysSmileSweat}* I guess... you did it??',
            '<25>{#p/alphys}{#g/alphysCutscene1}* Yeah!\n* You did it!!',
            '<25>{#g/alphysWelp}* ...'
         ],
         cooker19c: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
            '<25>{#g/alphysNeutralSweat}* ...',
            '<25>{#g/alphysFR}* You have a death wish.'
         ],
         robocaller3: [
            '<32>{#p/event}* 铃铃，铃铃...',
            "<32>{#p/mettaton}* 看来你们到片场了呢。",
            '<32>* 对着镜头，笑一个。'
         ],
         robocaller4: [
            "<32>* 因为，你们现在上电视了呢，\n  大明星！",
            "<32>* 真遗憾呀，\n  我只能在幕后主持节目了呢...",
            "<32>* 不过别气馁，听说现在\n  很流行这种“幕后主持人”哦，\n  你俩该不会不知道吧？",
            '<32>* 哎呀呀，你们又没有喷气背包，\n  怎么才能飞过那片虚空呢？',
            '<32>* 我好像也不知道呢...',
'<32>* 苦恼吧，挣扎吧。\n  观众别走哦，现在有好戏看啦。',
            '<32>* 祝好！'
         ],
         robocaller4x: [
            '<25>{#p/asriel2}{#f/8}* “祝好”？\n* 你个蠢货，扯什么淡呢？',
            '<25>{#f/6}* 祝福也得挑挑人啊。',
            "<25>{#f/7}* 前头有个升降机。\n* 走，咱去看看。"
         ],
         cookerX1: [
            '<32>{#p/basic}* 啊，是你们...\n* 我就知道...',
            '<32>* 这个升降机\n  是用来疏散民众的。',
            "<32>* 现在疏散工作已经完成，\n  所以... 我不会再放人了。",
            '<32>{|}* 所以你俩还是- {%}'
         ],
         cookerX2: ['<25>{#p/asriel2}{#f/6}* 滚。'],
         cookerX3: ["<32>{#p/basic}* 啊！\n* 对不起... 我不敢..."],
         cookerX4: [
            '<32>{#p/basic}* 我-我是说...\n  我会破例的...',
            "<32>* 求... 求你们别告诉老板..."
         ],
         cookerX5a: ['<25>{#p/asriel2}{#f/2}* 哦？\n* 打算放我们过去，是吗？'],
         cookerX5b: ['<25>{#f/1}* 这还差不多。'],
         cookerX6: ["<32>{#p/basic}* ...当-当然！\n* 我-我保证不拦你们！"],
         cookerX7: ['<25>{#p/asriel2}{#f/3}* 识时务者为俊杰。'],
         cookerX8: ["<25>{#p/asriel2}{#f/3}* 咱们走。"],
         cookerX9: [
            '<32>{#p/event}* 铃铃，铃铃...',
            "<32>{#p/mettaton}* 你俩就这么飞过虚空了。",
            '<32>* ...',
            '<32>* 看来...',
            '<32>* 派一个低级服务员\n  去守升降机...\n* 是我失策了。',
            
            '<32>* ...',
            '<32>* 唉，好吧。',
            "<32>* 反正，我早晚灭了你们。"
         ],
         whatthefuck: [
            '<32>{#p/basic}* 别担心，我不会有事的！',
'<32>{#p/basic}* 这些光圈能证明，\n  就算老板炒我鱿鱼，\n  我也肯定能复职的...'
         ],
         puzzleReaction2a: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysSide}* You got to the checkpoint!',
            '<25>{#g/alphysWelp}* But, uh, that was only the f-first one.',
            "<25>{#g/alphysNeutralSweat}* There's still two more left to go."
         ],
         puzzleReaction2b: ['<32>{#p/event}* 铃铃，铃铃...', '<25>{#p/alphys}{#g/alphysWelp}* One left.'],
         puzzleReaction2c: [
            '<32>{#p/event}* 铃铃，铃铃...',
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
                     "<32>{#p/mettaton}* 你迟到了，亲爱的...",
                     "<32>{#p/mettaton}* 要是你不再杀人，\n  那不成问题的。"
                  ]
                  : ['<32>{#p/mettaton}* SALUTATIONS, HUMAN.', "<32>* YOU'RE JUST A FEW MOMENTS EARLY FOR THE SHOW."],
         moneyPre2: () =>
            iFancyYourVilliany()
               ? ['<32>* ... STILL, DO YOU HAVE WHAT IT TAKES TO KEEP THIS UP?']
               : ['<32>* ...你介意先去到舞台左侧吗？'],
         moneyPre3: () => [
            ...(iFancyYourVilliany()
               ? ["<32>{#p/mettaton}* 呃，现在我得先让你\n  去到舞台左侧。"]
               : []),
            '<32>* 等我叫你之后，\n  你再回到画面里来。'
         ],
         moneyPre4: ['<32>{#p/basic}* 过了一会儿...'],
         moneyIntro1: [
            "<32>{#p/mettaton}* 伙计们，\n  今天我们要做点不一样的事。",
            '<32>{#z2}* 欢迎各位来到...',
            '<32>{*}{#z0}* {#x1}特别节目：{^10}\n* {#x2}时过！{^10}\n* {#x3}金迁！{^30}{%}'
         ],
         moneyIntro2: ["<32>{#p/mettaton}{#z1}* 让我们热烈欢迎选手们..."],
         moneyIntro3a: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/mettaton}{#z0}* 卫队队长，安黛因！']
               : ['<32>{#p/mettaton}{#z0}* 骷髅衫斯！'],
         moneyIntro3b: () =>
            iRespeccYourVilliany()
               ? ['<25>{#p/undyne}{#f/1}* 没错！']
               : world.dead_skeleton
                  ? [
                     '<25>{#p/sans}{#g/sansWink}* 这大概是我今天\n  唯一的好事了。',
                     '<25>* 如果这能\n  称之为好事的话。'
                  ]
                  : ['<25>{#p/sans}{#g/sansWink}* loving the pre-recorded applause you got there.'],
         moneyIntro4a: ['<32>{#p/mettaton}* 纳普斯特！'],
         moneyIntro4b: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/napstablook}* you don't always have to use the same applause..."]
               : alphysPhoneDisplay() && SAVE.data.n.state_foundry_undyne === 1
                  ? ['<32>{#p/napstablook}* 大家好']
                  : ['<32>{#p/napstablook}* 大家好...'],
         moneyIntro5a: () =>
            iFancyYourVilliany() ? ['<32>{#p/mettaton}* $(moniker1u)！'] : ['<32>{#p/mettaton}* 神秘的人类！'],
         moneyIntro6a: ['<32>{#p/mettaton}* 以及... 随便找的小孩！'],
         moneyIntro6b: () =>
            SAVE.data.b.f_state_kidd_betray ? ['<25>{#p/kidd}{#f/3}* 大家好。'] : ['<25>{#p/kidd}{#f/1}* 哟！'],
         moneyIntro7: [
            '<32>{#p/mettaton}{#z0}* 非常感谢各位的到来！',
            "<32>{#z2}* 首先，先聊一点关于\n  你们自己的事，如何？"
         ],
         moneyIntro8: [
            '<32>{#p/mettaton}{#z0}* ...',
            '<32>{#z1}* ...',
            "<32>* 那位选手好像不来了。",
            '<32>* ...',
            '<32>* 这就有点麻烦了。',
            '<32>* ...',
            '<32>{#z2}* 有人想代替那位吗？',
            '<32>* 有人吗？'
         ],
         moneyIntro9: ['<32>{#p/tem}* 你吼！！\n* 我素提米！！！'],
         moneyIntro10: [
            '<32>{#p/mettaton}{#z5}* 意料之外的嘉宾！？！？\n* 哇，这个节目越来越疯狂了！',
            '<32>{#p/mettaton}{#z2}* 这嘉宾好像背对着舞台...\n* 算了。'
         ],
         moneyIntro11: ['<32>{#p/mettaton}{#z1}* 新面孔除外...'],
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
                  ? ['<25>{#p/sans}{#g/sansNormal}* 你好啊。']
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
                  ? ['<32>{#p/mettaton}* 还有吗？']
                  : ['<32>{#p/mettaton}* GOT ANY OF YOUR LAME JOKES FOR US TODAY?'],
         moneyChat1b: () =>
            iRespeccYourVilliany()
               ? ['<25>{#p/undyne}{#f/8}* To see $(moniker1), of course!\n* Fuhuhu!']
               : world.dead_skeleton
                  ? ['<25>{#p/sans}{#g/sansNormal}* 没有。']
                  : [
                     "<25>{#p/sans}{#g/sansLaugh1}* 蹩脚？\n* 哇塞，镁塔顿，你还有脸\n  对我说教？",
                     "<25>{#g/sansBlink}* 不要再如玩游戏般乱闹。\n* 你的所有电视节目主持都是\n  一个样貌。",
                     "<25>{#g/sansNormal}* 但是，呃，如果我们现在\n  是在开玩笑...\n* 那就未免有点枯燥。",
                     '<25>{#g/sansLaugh1}* speaking of, i heard you tried to host a comedy show...',
                     '<25>{|}{#g/sansLaugh2}* but nobody- {%}'
                  ],
         moneyChat1c: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/mettaton}* RIGHT.']
               : world.dead_skeleton
                  ? ["<32>{#p/mettaton}* 有人今天不舒服，是吗？"]
                  : ['<32>{#p/mettaton}* VERY FUNNY.'],
         moneyChat2: ['<32>{#p/napstablook}* 轮到... 我讲了吗...'],
         moneyChat2a: () =>
            iRespeccYourVilliany()
               ? ["<25>{#p/undyne}{#f/14}* It's certainly not mine anymore, is it?"]
               : world.dead_skeleton
                  ? ['<25>{#p/sans}{#g/sansBlink}* ...']
                  : ["<25>{#p/sans}{#g/sansBlink}* go on, don't be afraid."],
         moneyChat2b: () => [
            iRespeccYourVilliany()
               ? '<32>{#p/napstablook}* 哦...\n* 嗨......'
               : world.dead_skeleton
                  ? "<32>{#p/napstablook}* 看来，是的........."
                  : '<32>{#p/napstablook}* 嗯.........\n* 大家好............',
            ...(world.scared_ghost
               ? ["<32>* ............我叫纳普斯特。"]
               : [
                  "<32>* 呃... 我叫纳普斯特",
                  '<32>* 我很喜欢做音乐，我...',
                  '<32>* 我...',
                  '<32>* 呃... 我...'
               ])
         ],
         moneyChat2c: () =>
            world.scared_ghost ? ['<32>{#p/mettaton}{#z1}* AND...?'] : ['<32>{#p/mettaton}{#z1}* ...你想说什么？'],
         moneyChat2d: () =>
            world.scared_ghost
               ? ["<32>{#p/napstablook}* um...... can't we just go to the next person"]
               : ["<32>{#p/napstablook}* 我...\n* 我介绍完了", '<32>* 抱歉...............'],
         moneyChat2e: () =>
            world.scared_ghost
               ? ['<32>{#p/mettaton}{#z0}* ... OKAY...']
               : [
                  "<32>{#p/mettaton}{#z0}* 没关系，小幽...",
                  "<32>* 我们都有紧张的时候，\n  不是吗，表-",
                  '<32>{#z2}* 呃... 宝贵！\n* 因为这次机会确实很难得！',
                  '<32>{#z4}* 哈哈哈...'
               ],
         moneyChat3: () =>
            world.scared_ghost
               ? ["<32>{#p/napstablook}* it's your turn.", "<32>{#p/human}* (但你没什么可说的。)"]
               : [
                  '<32>{#p/napstablook}* 呃......',
                  '<32>* 你可以开始讲了？',
                  "<32>{#p/human}* (但你没什么可说的。)"
               ],
         moneyChat3a: () =>
            iFancyYourVilliany()
               ? [
                  '<33>{#p/mettaton}* WELL, YOU KNOW WHAT THEY SAY...',
                  '<32>{#p/mettaton}* THE BIGGER THE TALK, THE SMALLER THE ACTION!',
                  "<32>{#p/mettaton}* IT'S NO SURPRISE THIS BULLY OF BULLIES WOULD BE SO RELUCTANT TO PART WITH THEIR WORDS."
               ]
               : ['<32>{#p/mettaton}* “神秘的人类”，\n  果然名副其实。'],
         moneyChat4: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? SAVE.data.b.colleg
                  ? ['<32>{#p/tem}* 提咪... 去了大鞋，']
                  : ['<32>{#p/tem}* 提咪... 上了电视！！']
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
               ? ['<32>{#p/mettaton}* 然后呢...?']
               : ["<32>{#p/mettaton}* WAIT, THAT'S YOUR ACTUAL NAME?"],
         moneyChat4b: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? SAVE.data.b.colleg
                  ? ['<32>{#p/tem}* 提咪知道了所有的价格！！']
                  : ['<32>{#p/tem}* 提咪... 喜欢上电视！！']
               : SAVE.data.b.f_state_kidd_betray
                  ? ['<25>{#p/kidd}{#f/4}* ...']
                  : ["<25>{#p/kidd}{#f/1}* Why wouldn't it be?"],
         moneyChat4c1: ['<32>{#p/mettaton}* 呃...'],
         moneyChat5: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/mettaton}* 好了，\n  我们的介绍环节\n  算是结束了。']
               : ['<32>{#p/mettaton}* HEH. I THINK THAT WRAPS UP OUR INTRODUCTIONS QUITE NICELY.'],
         moneyTr1: [
            '<32>* 是这样，\n  这个游戏是关于价格的。',
            "<32>* 我们今天准备了三件\n  稀有的地球文物。",
            "<32>* 将由你们几位选手来竞猜\n  这些东西的准确价格！",
            '<32>* 猜得最接近【且不超过】的人\n  就能把它带回家！'
         ],
         moneyTr2: ["<32>{*}* 我宣布..."],
         moneyTr3: ['<32>{*}* {#x1}时过！{^10}\n* {#x2}金迁！{^10}\n* {#x3}正式开始！{^30}{%}'],
         moneyHelper: '* 按←和→调整价格，\n  然后按[Z]确认。§fill=#ff0§$(x)G',
         moneyHelperConfirmed: '* 按←和→调整价格，\n  然后按[Z]确认。§fill=#f00§$(x)G',
         moneyItem1: {
            a: [
               '<32>{#p/mettaton}* 我们的第一件物品\n  是我最近找到的...',
               '<32>* 在地球上，这个装置是用来接收\n  所谓“无线电台”的\n  播送内容的。',
               "<32>* 包括新闻，天气，音乐...\n* 甚至是你现在正参加的\n  游戏节目！",
               "<32>* 我们来看看场上有没有人\n  了解这种设备。"
            ],
            b: [
               "<32>{#p/mettaton}* 那么，大家都决定好了？",
               '<32>* 好极了！',
               "<32>* 现在，让我们揭晓一下价格..."
            ],
            c: ['<32>{#p/mettaton}* 80G！'],
            d: () =>
               SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                  ? [
                     "<32>{#p/mettaton}* 恭喜你，提米。\n* 你赢得了属于你自己的\n  老式地球收音机！",
                     '<32>{#p/tem}* 呜哇哦哇哦哇哦.....'
                  ]
                  : [
                     "<32>{#p/mettaton}* 恭喜你，小幽。\n* 你赢得了属于你自己的\n  老式地球收音机！",
                     world.scared_ghost ? '<32>{#p/napstablook}* 酷' : '<32>{#p/napstablook}* 唔唔唔唔唔唔唔'
                  ],
            e: () =>
               iFancyYourVilliany()
                  ? ["<32>{#p/mettaton}* 好样的，$(moniker3u)。\n* 你赢得了属于你自己的\n  老式地球收音机！"]
                  : ["<32>{#p/mettaton}* 恭喜你，人类。\n* 你赢得了属于你自己的\n  老式地球收音机！"],
            f: () =>
               SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                  ? [
                     iFancyYourVilliany()
                        ? '<32>{#p/mettaton}* 提米，\n  由于你比$(moniker3u)先一步作答...'
                        : '<32>{#p/mettaton}* 提米，\n  由于你比人类先一步作答...',
                     "<32>{#p/mettaton}* 恭喜！\n* 你赢得了属于你自己的\n  老式地球收音机！",
                     '<32>{#p/tem}* 呜哇哦哇哦哇哦.....'
                  ]
                  : [
                     iFancyYourVilliany()
                        ? '<32>{#p/mettaton}* 小幽，\n  由于你比$(moniker3u)先一步作答...'
                        : '<32>{#p/mettaton}* 小幽，\n  由于你比人类先一步作答...',
                     "<32>{#p/mettaton}* 恭喜！\n* 你赢得了属于你自己的\n  老式地球收音机！",
                     world.scared_ghost ? '<32>{#p/napstablook}* 酷' : '<32>{#p/napstablook}* 唔唔唔唔唔唔唔'
                  ],
            g: () => [
               SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                  ? iFancyYourVilliany()
                     ? '<32>{#p/mettaton}* 好样的，$(moniker3u)。\n* 由于你比提米先一步作答...'
                     : '<32>{#p/mettaton}* 人类，\n  由于你比提米先一步作答...'
                  : iFancyYourVilliany()
                     ? '<32>{#p/mettaton}* 好样的，$(moniker3u)。\n* 由于你比小幽先一步作答...'
                     : '<32>{#p/mettaton}* 人类，\n  由于你比小幽先一步作答...',
               "<32>{#p/mettaton}* 恭喜！\n* 你赢得了属于你自己的\n  老式地球收音机！"
            ]
         },
         moneyVote1: () => [
            '<32>{#p/mettaton}* 好了，选手们，\n  这一轮到此结束。',
            "<32>* 由于这是第一轮，\n  你们得投票决定谁被淘汰。",
            ...(world.scared_ghost
               ? []
               : [
                  '<32>{#p/napstablook}* 嘿，呃.........\n* 我有个问题.........',
                  "<32>{#p/mettaton}* 不，小幽，\n  你不能投自己。",
                  '<32>{#p/napstablook}* 噢............'
               ]),
            iRespeccYourVilliany()
               ? "<32>{#p/mettaton}* 淘汰时间到了，伙计们！\n* 安黛因，你先来。"
               : "<32>{#p/mettaton}* 淘汰时间到了，伙计们！\n* 衫斯，你先来。",
            "<32>{#p/mettaton}* 你要票谁？"
         ],
         moneyVote2: () =>
            iRespeccYourVilliany()
               ? [
                  "<25>{#p/undyne}{#f/14}* 嗯... 我打算投纳普斯特。",
                  "<26>{#p/undyne}{#f/16}* 不是针对他...\n* 我只是跟其他选手更熟罢了。"
               ]
               : world.dead_skeleton
                  ? ['<25>{#p/sans}* ...', "<25>{#p/sans}{#g/sansBlink}* 呃，我现在没心情。"]
                  : ['<25>{#p/sans}* 小鸡。'],
         moneyVote2a: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/mettaton}* 小幽，你想票掉谁呢？']
               : world.dead_skeleton
                  ? ["<32>{#p/mettaton}* 好吧，少了一票。", '<32>{#p/mettaton}* 小幽，你想票掉谁呢？']
                  : [
                     '<32>{#p/mettaton}* 嗯...',
                     '<32>* 什么“小鸡”？',
                     "<25>{#p/sans}{#g/sansLaugh1}* 我真是受够这个\n  叽叽喳喳的小鸡器人了。",
                     "<32>{#p/mettaton}* 你被取消比赛资格了！",
                     '<25>{#p/sans}{#g/sansLaugh2}* 呵呵，值了。',
                     '<32>{#p/mettaton}* 呃... 小幽，你想票掉谁呢？'
                  ],
         moneyVote3a: () =>
            iRespeccYourVilliany()
               ? [
                  '<32>{#p/napstablook}* ...............',
                  "<32>* 我... \n  并不想给他们中的\n  任何一人投票...",
                  "<32>* 安黛因是皇家卫队队长，\n  而另外两个...",
                  "<32>* 他们只是小孩子......"
               ]
               : [
                  '<32>{#p/napstablook}* ...............',
                  '<32>* 呃... 衫斯，我...',
                  "<32>* 我不是针对你，我只是... \n  不大了解你... \n  抱歉......",
                  ...(world.dead_skeleton
                     ? ['<25>{#p/sans}{#g/sansNormal}* ...', "<25>{#p/sans}{#g/sansBlink}* 没事的。"]
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
               ? ['<32>{#p/napstablook}* 人类。']
               : [
                  '<32>{#p/napstablook}* ...............',
                  '<32>* 人类吧',
                  "<32>* 那人...\n  对我不是特别好......"
               ],
         moneyVote3y: ['<32>{#p/mettaton}* ...'],
         moneyVote4p: () => [
            iFancyYourVilliany()
               ? '<32>{#p/mettaton}* 你要给谁投票吗，亲爱的$(moniker2u)？'
               : '<32>{#p/mettaton}* 你要给谁投票吗，人类？',
            choicer.create('* （你要怎么回答？）', '是', '否')
         ],
         moneyVote4: () => [
            '<32>{#p/mettaton}* 不，我该问你要\n  给【谁】投票？',
            choicer.create(
               '* (你要给谁投票？)',
               iRespeccYourVilliany() ? '安黛因' : '衫斯',
               '纳普斯特',
               SAVE.data.n.state_foundry_muffet === 1 ? '提米' : '怪物小孩',
               '$(name)'
            )
         ],
         moneyVote4a1: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/mettaton}* 嗯，嗯...', '<32>{#p/mettaton}* 那提米，你呢？']
               : ['<32>{#p/mettaton}* 嗯，嗯...', '<32>{#p/mettaton}* 那怪物小孩，你呢？'],
         moneyVote4a2: ["<32>{#p/mettaton}* 看来你是【不打算】\n  给谁投票了。", '<32>* 好的。'],
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
               ? ['<32>{#p/mettaton}* ...提米，你呢？']
               : ['<32>{#p/mettaton}* ...怪物小孩，你呢？'],
         moneyVote5a: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? ['<32>{#p/tem}* 提咪投... 阔爱幽灵！', '<32>* 提咪住的离阔爱幽灵近... \n  喜欢阔爱幽灵！']
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
         moneyVote5b: ['<32>{#p/mettaton}* 你确定吗？\n  你不知道这个投票环节\n  是要投掉你想淘汰的人吗？'],
         moneyVote5c: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                  '<32>{#p/tem}* 等等...',
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
               ? ['<25>{#p/sans}* ...', '<25>{#p/sans}{#f/3}* 我还是自己走吧。']
               : ['<25>{#p/sans}* 好吧。', "<25>{#p/sans}{#g/sansWink}* i'm {@fill=#ff0}boned{@fill=#fff}."],
         moneyPun1a: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/napstablook}* 没关系的....................."]
               : world.dead_skeleton
                  ? ['<32>{#p/mettaton}* 嗯，你确实该走。']
                  : ['<32>{#p/mettaton}* YES, YOU MOST CERTAINLY ARE.'],
         moneyPun1b: ["<32>{#p/mettaton}* 哇，你对自己烦人的程度\n  还蛮有自知之明。"],
         moneyVote5x2b: ['<32>{#p/human}* （你感到罪恶爬上了\n  你的脊梁。）'],
         moneyVote6a: () =>
            iRespeccYourVilliany()
               ? ["<32>{#p/mettaton}* 很遗憾，小幽。\n* 但时间差不多了。\n* 再见。"]
               : ["<32>{#p/mettaton}* 很遗憾，衫斯。\n* 但时间差不多了。\n* 再见。"],
         moneyVote6b: () => (iRespeccYourVilliany() ? [] : ['<25>{#p/sans}* 拜了个拜啊，大伙。']),
         moneyVote7: [
            '<32>{#p/mettaton}* 好吧，看起来比分打平了！',
            '<32>* 在平局的情况下，\n  就由主持人选择谁会离开。',
            '<32>* ...不对。',
            "<32>* 我就是主持人！"
         ],
         moneyVote8: ["<32>{#p/mettaton}* 很遗憾，人类。\n* 但时间差不多了。\n* 再见。"],
         moneyItem2: {
            a: [
               '<32>{#p/mettaton}* 我们的下一件物品，\n  就像已故的教授所说的一样，\n  是个很有技术性的东西。',
               '<32>* 或者说...\n* 很有烟火星？',
               '<32>* 这些叫“烟花”的东西，\n  在地球上是用来把天空\n  变得令人眼花缭乱的。',
               '<32>* 烟花的花样很多，\n  绽放出妙不可言的美景。',
               "<32>* 你们认为这东西值多少钱呢？"
            ],
            b: ['<32>{#p/mettaton}* 都猜好了吗...？', "<32>* 很好。\n* 接下来，我们来瞧瞧\n  真正的价格..."],
            c: ['<32>{#p/mettaton}* 哇，250G！', "<32>{#p/mettaton}* 这谁能想到！？"],
            d: () =>
               SAVE.data.n.state_foundry_muffet === 1
                  ? [
                     "<32>{#p/mettaton}* 恭喜你，提米！\n* 你赢得了镁塔官方\n  认证的烟花！",
                     "<32>* 虽然不是镁塔牌，\n  但也仅次于它了！(TM)",
                     '<32>{#p/tem}* 啊呀呀！'
                  ]
                  : [
                     "<32>{#p/mettaton}* 恭喜你，怪物小孩！\n* 你赢得了镁塔官方\n  认证的烟花！",
                     "<32>* 虽然不是镁塔牌，\n  但也仅次于它了！(TM)",
                     '<25>{#p/kidd}{#f/1}* 哟-！！！'
                  ],
            e: () => [
               iFancyYourVilliany()
                  ? "<32>{#p/mettaton}* 好样的，$(moniker3u)。\n* 你赢得了镁塔官方\n  认证的烟花。"
                  : "<32>{#p/mettaton}* 恭喜你，人类！\n* 你赢得了镁塔官方\n  认证的烟花！",
               "<32>* 虽然不是镁塔牌，\n  但也仅次于它了！(TM)"
            ],
            f: () => [
               iFancyYourVilliany()
                  ? '<32>{#p/mettaton}* 由于你比$(moniker3u)先一步作答...'
                  : '<32>{#p/mettaton}* 由于你比人类先一步作答...',
               ...(SAVE.data.n.state_foundry_muffet === 1
                  ? [
                     "<32>{#p/mettaton}* 恭喜你，提米！\n* 你赢得了镁塔官方\n  认证的烟花！",
                     "<32>* 虽然不是镁塔牌，\n  但也仅次于它了！(TM)",
                     '<32>{#p/tem}* 啊呀呀！'
                  ]
                  : [
                     "<32>{#p/mettaton}* 恭喜你，怪物小孩！\n* 你赢得了镁塔官方\n  认证的烟花！",
                     "<32>* 虽然不是镁塔牌，\n  但也仅次于它了！(TM)",
                     '<25>{#p/kidd}{#f/1}* 哟-！！！'
                  ])
            ],
            g: () => [
               SAVE.data.n.state_foundry_muffet === 1
                  ? '<32>{#p/mettaton}* 由于你比提米先一步作答...'
                  : '<32>{#p/mettaton}* 由于你比怪物小孩先一步作答...',
               iFancyYourVilliany()
                  ? "<32>* 好样的，$(moniker3u)。\n* 你赢得了镁塔官方\n  认证的烟花。"
                  : "<32>{#p/mettaton}* 恭喜你，人类！\n* 你赢得了镁塔官方\n  认证的烟花！",
               "<32>* 虽然不是镁塔牌，\n  但也仅次于它了！(TM)"
            ]
         },
         moneyFinal0a: () => [
            '<32>{#p/mettaton}* 现在，由于这已经是第二轮...',
            "<32>* 我们就不投票了。",
            "<32>* 取而代之的是，\n  我想淘汰谁就淘汰谁！\n* 我的节目，我来做主...",
            ...(iRespeccYourVilliany()
               ? ["<32>* 很遗憾，安黛因。\n* 但时间差不多了。\n* 再见。"]
               : SAVE.data.n.state_foundry_muffet === 1
                  ? ["<32>* 很遗憾，提米。\n* 但时间差不多了。\n* 再见。"]
                  : ["<32>* 很遗憾，怪物小孩。\n* 但时间差不多了。\n* 再见。"])
         ],
         moneyFinal0b: () =>
            iRespeccYourVilliany()
               ? ['<25>{#p/undyne}{#f/14}* ...你认真的？']
               : SAVE.data.n.state_foundry_muffet === 1
                  ? SAVE.data.b.colleg
                     ? [
                        '<32>{#p/tem}* 你赶走我只因为\n  你知道我会赢。',
                        '<32>* 但也行！！',
                        '<32>* 记得来光顾提咪商店！！'
                     ]
                     : ['<32>{#p/tem}* nu...', '<32>* tem will be OKs tho...', '<32>* 记得来光顾提咪商店！！']
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
            "<32>* 哎呀... 现在只剩下两位选手了，\n  是时候开始最后一轮了。",
            "<32>* 这一轮所展示的物品\n  将会是与众不同的。",
            '<32>* 女士们，先生们...\n* 睁大你们的双眼...',
            '<32>{#z3}* ...瞧瞧这个精妙绝伦的\n  等身喵喵玩偶！'
         ],
         moneyFinal2: () =>
            iRespeccYourVilliany()
               ? ['<32>{#p/kidd}{#f/14}* 哇哦...']
               : world.scared_ghost
                  ? ['<32>{#p/napstablook}* .........']
                  : ['<32>{#p/napstablook}* 我的天............'],
         moneyFinal3: ['<32>{#p/mettaton}* 哈哈哈，心动了吧？', '<32>{#p/mettaton}{#z2}* 它被发现于...'],
         moneyFinal4: () => [
            ...(SAVE.data.n.state_foundry_undyne === 1
               ? [
                  '<32>{#p/event}* 铃铃，铃铃...',
                  "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* M-mettaton, come on!\n* I've had enough of a bad day as it is!",
                  '<32>{#p/mettaton}* ...',
                  "<32>* WELL, THAT'S A SHAME, THEN!\n* BECAUSE, YOU SEE..."
               ]
               : [
                  '<32>{#p/event}* 铃铃，铃铃...',
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
            '<32>{#p/mettaton}* 哈哈哈，心动了吧？',
            '<32>{#p/mettaton}{#z2}* 它被发现一个遨游在星际之间的\n  废弃集装箱里。',
            '<32>* 在发现它的踪迹后，\n  搜索团队花了几个月来寻找它...',
            '<32>* 它的空前绝后...\n* 嗯...',
            '<32>* 不言自明。',
            '<32>{#z3}* 我亲爱的观众朋友们，\n  究竟谁会得到它呢？'
         ],
         moneyItem3: {
            a: [
               "<32>{#z0}* 既然这是最后一轮，\n  就不限时了。",
               "<32>{#z0}* 让我们再猜最后一次！"
            ],
            b: [
               '<32>{#p/mettaton}* 终于到了这一刻...',
               '<32>{#p/mettaton}{#z3}* 谁会赢得大奖呢？',
               '<32>{#p/mettaton}{#z0}* 价，\n* 格，\n* 是...'
            ],
            c: ['<32>{#p/mettaton}{#z5}* ...999G！！！'],
            d: () =>
               iRespeccYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* 怪物小孩！',
                     '<32>* 我很荣幸\n  将这份礼物赠予你。',
                     '<25>{#p/kidd}{#f/4}* 哈... 啊?',
                     '<25>{#f/7}* ...',
                     '<25>{#f/14}* 哟噢噢噢噢!!!!'
                  ]
                  : ['<32>{#p/mettaton}{#z0}* 小幽！', '<32>* 我很荣幸\n  将这份礼物赠予你。'],
            e: () =>
               iFancyYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* 好样的，$(moniker3u)。',
                     '<32>{#p/mettaton}* 我很荣幸\n  将这份礼物赠予你。'
                  ]
                  : ['<32>{#p/mettaton}{#z0}* 人类！', '<32>* 我很荣幸\n  将这份礼物赠予你。'],
            f: () =>
               iRespeccYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* 怪物小孩！',
                     "<32>* 你和$(moniker3u)猜的答案一样，\n  但你率先作答。",
                     '<32>* 因此，我很荣幸\n  将这份礼物赠予你。',
                     '<25>{#p/kidd}{#f/4}* 哈... 啊?',
                     '<25>{#f/7}* ...',
                     '<25>{#f/14}* 哟噢噢噢噢!!!!'
                  ]
                  : [
                     '<32>{#p/mettaton}{#z0}* 小幽！',
                     iFancyYourVilliany()
                        ? "<32>* 你和$(moniker3u)猜的答案一样，\n  但你率先作答。"
                        : "<32>* 你和人类猜的答案一样，\n  但你率先作答。",
                     '<32>* 因此，我很荣幸\n  将这份礼物赠予你。'
                  ],
            g: () =>
               iRespeccYourVilliany()
                  ? [
                     '<32>{#p/mettaton}{#z0}* 好样的，$(moniker3u)。',
                     "<32>* 你和怪物小孩猜的答案一样，\n  但你率先作答。",
                     '<32>* 因此，我很荣幸\n  将这份礼物赠予你。'
                  ]
                  : [
                     iFancyYourVilliany()
                        ? '<32>{#p/mettaton}{#z0}* 好样的，$(moniker3u)。'
                        : '<32>{#p/mettaton}{#z0}* 人类！',
                     "<32>* 你和小幽猜的答案一样，\n  但你率先作答。",
                     '<32>* 因此，我很荣幸\n  将这份礼物赠予你。'
                  ]
         },
         moneyTrash1: ['<32>* 等等，BLOOK，你这是上哪...', '<32>* ...去...', '<32>{#z1}* ...'],
         moneyTrash2: ["<32>{#z0}* I GUESS THEY DIDN'T WANT TO BE HERE ANY LONGER."],
         moneyItemPut1: ['<32>{#p/human}* （你获得了一台老式收音机。）'],
         moneyItemPut2: ['<33>{#p/human}* （你获得了一箱烟花。）'],
         moneyItemPut3: ['<32>{#p/human}* （你获得了喵喵玩偶。）'],
         moneyItemPut4: [
            "<32>{#p/human}* （你带的东西太多了。）",
            '<32>{#p/mettaton}* 东西装不下了，嗯？',
            '<32>{#p/mettaton}* 好吧，别担心。\n* 你可以到休闲回廊\n  领取你的奖品。'
         ],
         moneyOutro1: [
            "<32>{#p/mettaton}* 亲爱的观众朋友们，\n  如果你也想在这样的\n  电视直播节目中赢取奖品...",
            "<32>* 请不要犹豫，\n  直接在域外网联系我！",
            "<32>* 不然，就没有下一期了节目了...",
            '<32>* 敬请期待下期节目，\n  《舞动命运》！',
            '<32>{#z3}* 当然，还请各位保持完美！'
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
            choicer.create('* （你要怎么回答？）', '是', '否')
         ],
         moneyWhisper2a: ['<32>{#p/napstablook}* (thanks...)'],
         moneyWhisper2b: ['<32>{#p/napstablook}* （..................）'],
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
            "<32>* 我... 还有点事\n  要跟你说........",
            '<32>* 在前面等我，就在那个\n  大镁塔顿喷泉那里。',
            '<32>* 喷泉见............'
         ],
         truemtt3: [
            '<32>{#p/basic}* 小幽...',
            '<32>* ...',
            '<32>* I get the feeling things could turn serious here.'
         ],
         moneyX1: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<32>{#p/mettaton}* 哦，我是眼花了吗？',
            "<32>* 没想到，这里居然藏着...",
            '<32>* 一个陷阱呢！',
            '<32>* 而且...'
         ],
         moneyX2a: [
            "<32>* 你们又上电视啦！",
            '<32>* 这次，两人又会上演什么\n  “死里逃生”的戏码呢？',
            '<32>* 哈哈哈...'
         ],
         moneyX2b: ['<32>* 就让【时间】告诉我们答案吧...{%200}'],
         moneyX3: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/10}* 让我想想...{%100}',
                  '<25>* 前面有个平台，\n  而控制器就在平台上...{%100}',
                  '<25>{#f/16}* ...{%100}',
                  '<25>{#f/13}* 我有办法了，\n  但这办法有点尴尬...{%100}',
                  '<25>{#f/13}* 我跪在平台前面...{%100}',
                  '<25>{#f/16}* 你就可以...\n  踩住我的肩膀，爬上平台，\n  关掉计时器。{%100}',
                  '<25>{#f/15}* 希望能奏效...{%100}'
               ],
               ['<25>{#p/asriel2}{#f/13}* ...{%100}', '<25>{#f/4}* $(name)，按计划行事吧。{%100}']
            ][Math.min(SAVE.flag.n.ga_asrielMoneyX3++, 1)],
         moneyT1: (i: number) =>
            [
               ['<25>{#p/asriel2}{#f/15}* 你想... 试一试吗？{%200}'],
               ["<25>{#p/asriel2}{#f/16}* ...没空胡闹了。{%200}"],
               ['<25>{#p/asriel2}{#f/15}* 别磨蹭了。{%200}'],
               []
            ][Math.min(i, 3)],
         moneyT2: (i: number) =>
            [
               ['<25>{#p/asriel2}{#f/16}* 难道你想这么傻站着，\n  浪费时间吗？{%200}'],
               ["<25>{#p/asriel2}{#f/13}* $(name)，求你了...\n* 别磨蹭了...{%200}"],
               []
            ][Math.min(i, 2)],
         moneyT3: (i: number) =>
            [
               ['<25>{#p/asriel2}{#f/13}* 还真是。{%200}'],
               ['<25>{#p/asriel2}{#f/3}* ...\n* 他们看咱们，就跟看小丑一样。{%200}'],
               []
            ][Math.min(i, 2)],
         moneyT4: (i: number) =>
            [
               [
                  "<25>{#p/asriel2}{#f/5}* 吃饭了吗？{%200}",
                  '<25>{#p/asriel2}{#f/13}* ...\n* 就当你吃过了吧。{%200}'
               ],
               []
            ][Math.min(i, 1)],
         moneyT5: (i: number) =>
            [["<25>{#p/asriel2}{#f/4}* 我就很好奇，\n  你就这么杵着，有意思吗？{%200}"], []][
            Math.min(i, 1)
            ],
         moneyT6: (i: number) => [['<25>{#p/asriel2}{#f/3}* ...\n* $(name)？{%200}'], []][Math.min(i, 1)],
         moneyT7: (i: number) => [['<25>{#p/asriel2}{#f/13}* $(name)。{%200}'], []][Math.min(i, 1)],
         moneyT8: (i: number) =>
            [["<25>{#p/asriel2}{#f/7}* 你要是不搁着磨蹭，\n  现在我都离开前哨站了。{%200}"], []][Math.min(i, 1)],
         moneyT9: (i: number) =>
            [['<25>{#p/asriel2}{#f/6}* ...\n* 算我求你了。{%200}'], ['<25>{#p/asriel2}{#f/15}* 可算熬到头了...']][
            Math.min(i, 1)
            ],
         moneyX4: () =>
            [['<25>{#p/asriel2}{#f/13}* 呃... 上来吧。{%200}'], ['<25>{#p/asriel2}{#f/13}* 别磨蹭...{%200}']][
            Math.min(SAVE.flag.n.ga_asrielMoneyX4++, 1)
            ],
         moneyX4a: ['<25>{#p/asriel2}{#f/1}* 搞定。'],
         moneyX4b: ['<25>{#p/asriel2}{#f/6}* ...', '<25>{#p/asriel2}{#f/7}* 浪费这么长时间，\n  为了啥？'],
         moneyX5a: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<32>{#p/mettaton}* 这通操作把我CPU干烧了。', 
            "<32>* 对不起，亲爱的观众朋友们，\n  这节目，怎一个“烂”字了得？",
            '<32>* 明明是“烂透了”！',
            "<32>* 这么差劲的节目，\n  多看一眼，都是脏了观众的眼睛。"
         ],
         moneyX5b: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<32>{#p/mettaton}* 呃，真是...',
            "<32>* 呃... 该说点什么好呢...",
            '<32>* “感谢各位的耐心与理解”？',
            '<32>* 不过，你们这一等，\n  我的事确实好办多了。'
         ],
         moneyX5c: [
            '<32>* ...',
            '<32>* 我马上就准备好了。',
            '<32>* 两位，要是有遗言，\n  就现在对电视机前的观众说。',
            '<32>* 不然，就再也没机会咯。'
         ],
         moneyX6a: ['<25>{#p/asriel2}{#f/15}* ...'],
         moneyX6b: ['<25>{#f/2}* 没有。'],
         moneyX7: ['<25>{#p/asriel2}{#f/6}* 下来吧。'],
         moneyX8: ['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/6}* 去电梯。'],
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
            choicer.create('* （你要怎么回答？）', '是', '否')
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
            '<32>{#p/event}* 铃铃，铃铃...',
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
                  '<32>{#p/basic}* ...？',
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
               ? ["<25>{#p/asriel2}{#f/1}* 是时候动手了。"]
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
         opera14a: ['<32>{#p/alphys}{#g/alphysGarbo}* 镁塔顿。'],
         opera14b: ['<32>{#p/mettaton}* 天啊...'],
         opera14c: ['<32>* 快看，是谁来了！'],
         opera15: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* 难道是...', '<32>* ...我的梦中情敌？']
               : ['<32>{#p/mettaton}* 难道是...', '<32>* ...我的真命天子？'],
         opera16: [
            '<25>{*}{#p/alphys}{#g/alphysGarbo}* 你这破铁皮盒子\n  到底想干啥...{^30}{%}',
            '<32>{*}{#p/mettaton}{#x1}* 咋了博士？{^30}{%}',
            "<32>{*}{#x2}* 我要演节目啊。{^30}{%}",
            '<25>{*}{#p/alphys}{#g/alphysWTF}* ...{^30}{%}'
         ],
         opera16b: [
            '<32>{*}* 苍天啊，大地啊...{^30}{%}',
            "<32>{*}{#x1}* 真是太遗憾了！\n* 这么棒的演出，\n  艾菲斯居然无福消受啊！{^30}{%}",
            "<32>{*}{#x2}* 她要是在的话，\n  肯定非常喜欢。{^30}{%}"
         ],
         opera17: () =>
            world.genocide ? '朋|友|啊...' : iFancyYourVilliany() ? '我|心|悲...' : '爱|人|啊...',
         opera18: () =>
            world.genocide
               ? "光|阴|将|尽..."
               : iFancyYourVilliany()
                  ? '看|你|憔|悴...'
                  : '请|你|速|离...',
         opera19: () =>
            world.genocide
               ? "终|有|悔..."
               : iFancyYourVilliany()
                  ? '白|白|将... '
                  : '怪|物|王...',
         opera20: () =>
            world.genocide
               ? "过|往|深|罪..."
               : iFancyYourVilliany()
                  ? '光|阴|浪|费...'
                  : '要|把|你|挡...',
         opera20a: () =>
            iFancyYourVilliany()
               ? ['<25>{*}{#p/alphys}{#g/alphysInquisitive}* 哈？{^40}{%}']
               : ['<25>{*}{#p/alphys}{#g/alphysWelp}* 你别说，还挺好听...{^40}{%}'],
         opera21: () =>
            world.genocide ? '但|在|此...' : iFancyYourVilliany() ? "我|承|认..." : '人|类|都...',
         opera22: () =>
            world.genocide
               ? '我|将|你|灭...'
               : iFancyYourVilliany()
                  ? '你|有|天|分...'
                  : '应|住|远|方...',
         opera23: () =>
            world.genocide ? "且|回|首..." : iFancyYourVilliany() ? "但|你|我..." : '即|使|将...',
         opera24: () =>
            world.genocide
               ? "过|往|一|切..."
               : iFancyYourVilliany()
                  ? '没|有|缘|分...'
                  : '我|心|给|伤...',
         opera25: () =>
            world.genocide
               ? '生|为|王...'
               : iFancyYourVilliany()
                  ? '千|里|马...'
                  : "你|会|被...",
         opera25a: () =>
            iFancyYourVilliany()
               ? ['<25>{*}{#p/alphys}{#g/alphysGarboCenter}* 服了。{^40}{%}']
               : ['<25>{*}{#p/alphys}{#g/alphysCutscene1}* 是樱花花瓣！{^40}{%}'],
         opera26: () =>
            world.genocide
               ? '众|人|期|望...'
               : iFancyYourVilliany()
                  ? '难|觅|伯|乐...'
                  : '太|空|流|放...',
         opera27: () =>
            world.genocide
               ? "你|能|将..."
               : iFancyYourVilliany()
                  ? '可|怜|啊...'
                  : "那|太|糟...|\n（确实|啊）",
         opera28: () =>
            world.genocide
               ? '王|国|解|放...'
               : iFancyYourVilliany()
                  ? "你|终|究\n|会|陨|落。"
                  : "你|定|会\n|死|翘|翘。",
         opera28a: () =>
            iFancyYourVilliany()
               ? ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}']
               : ["<25>{*}{#p/alphys}{#g/alphysGarbo}* 哦，原来如此。{^40}{%}"],
         opera29: () => (world.genocide ? '奈|何|啊...' : '悲|戚|戚...'),
         opera30: () => (world.genocide ? '误|入|歧|途...' : "你|要|死|掉..."),
         opera31: () => (world.genocide ? '只|能|让... ' : '哭|哭|哭...'),
         opera31a: ['<25>{*}{#p/alphys}{#g/alphysCutscene3}* 懂了懂了...{^40}{%}'],
         opera32: () =>
            world.genocide
               ? "汝|等\n|归|于|尘|土。"
               : iFancyYourVilliany()
                  ? "你|早|就\n|该|知|道"
                  : "你|可|真|是\n|难|熬。",
         opera33: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/mettaton}* 太惨了。', '<32>{#p/mettaton}* 你永远只能扮演反派，\n  真是太惨了。']
               : ['<32>{#p/mettaton}* 太遗憾了。', "<32>{#p/mettaton}* 你马上就要被流放太空，\n  真是太遗憾了。"],
         opera34: () =>
            !world.badder_lizard
               ? [
                  '<25>{#p/alphys}{#g/alphysGarboCenter}* 闹够了没有？',
                  '<32>{#p/mettaton}{#x1}* 等等嘛，急啥...',
                  '<32>{|}{#x2}* 我还得- {%}'
               ]
               : ['<32>{#p/mettaton}{#x1}* 人类，准备好...', "<32>{|}{#x2}* 我马上就送你上- {%}"],
         opera35: () => [
            ...(SAVE.data.b.killed_glyde
               ? [
                  !world.badder_lizard
                     ? "<32>{#p/mettaton}{#x0}* ...难怪艾菲斯刚刚跑掉了。"
                     : "<32>{#p/mettaton}{#x0}* ...难怪艾菲斯不想跟你\n  待在一块。",
                  '<32>{#x1}* 你还要脸吗？',
                  "<32>{#x0}* 我得马上下播，\n  不能脏了观众的眼睛！",
                  !world.badder_lizard
                     ? "<32>{#x0}* 真倒霉..."
                     : "<32>{#x0}* 真丢脸..."
               ]
               : [
                  ...(!world.badder_lizard
                     ? ['<25>{#p/alphys}{#g/alphysWelp}* 那...\n  现-现在干啥？', '<32>{#p/mettaton}{#x0}* 现在？']
                     : []),
                  '<32>{#p/mettaton}{#x0}* 呃...\n  相信我，亲...',
                  '<32>{#x2}* 我也想让节目圆满收官，\n  但...'
               ]),
            ...(world.bad_robot
               ? [
                  '<32>{#x0}* 但你别慌。',
'<32>{#x1}* 在压轴好戏上映前，\n  我还得准备一会。',
                  '<32>{#x3}* 很快，你就知道...',
                  "<32>{*}* 遇到我，\n  你就倒了八辈子血霉了，亲。{^30}{#x4}{%}"
               ]
               : [
                  "<32>{#x1}* 很快，你将见证一场\n  超——震撼的演出！",
                  '<32>{#x3}* 所以...\n* 请你整装待发，保持形象，\n  准备迎接最终的...',
                  '<32>{*}* 压轴好戏！{^30}{#x4}{%}'
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
                        choicer.create('* (Give back the Mew Mew doll?)', '是', '否')
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
               ['<25>{#p/asriel2}{#f/8}* 有人吗？'],
               ['<25>{#p/asriel2}{#f/8}* 出来吧。'],
               ['<25>{#p/asriel2}{#f/8}* ...']
            ][Math.min(SAVE.flag.n.ga_asriel53++, 1)],
         operaX2: () => [
            ...[
               ['<32>{#p/mettaton}* 两位亲，你们好。'],
               ['<32>{#p/mettaton}* 那我就出来了哦，亲！'],
               ['<32>{#p/mettaton}* 笑一个嘛！']
            ][Math.min(SAVE.flag.n.ga_asriel53 - 1, 2)],
            "<32>* 来，快到聚光灯下。"
         ],
         operaX3: [
            "<32>{#p/mettaton}* 好多了...",
            '<32>{#p/mettaton}* 就让我送你们一支小曲吧。'
         ],
         operaX4: () =>
            [
               [
                  "<25>{*}{#p/asriel2}{#f/10}* 跟我说说，\n  你要唱啥呢？{^30}{%}",
                  '<32>{*}{#p/mettaton}{#x1}* 艾斯利尔啊...{^30}{%}',
                  '<32>{*}{#x2}* 我要是说了，\n  不就“剧透”了吗？{^30}{%}',
                  '<25>{*}{#p/asriel2}{#f/6}* 猜到了。{^30}{%}'
               ],
               [
                  "<25>{*}{#p/asriel2}{#f/7}* 你要唱我，早知道了。{^30}{%}",
                  '<32>{*}{#p/mettaton}{#x1}* 哦，你知道了啊。{^30}{%}',
                  "<32>{*}{#x2}* 你知道，关我什么事？\n* 以为这样，我就不唱了？{^30}{%}",
                  '<25>{*}{#p/asriel2}{#f/8}* ...{^30}{%}'
               ]
            ][Math.min(SAVE.flag.n.ga_asriel54++, 1)],
         operaX5: () => [
            "<32>{#p/mettaton}* 好，我唱完了。",
            "<32>{#x1}* 哦，忘了告诉你，\n  我本人不在这。\n* 你看到的，就是个空壳。",
            '<32>* 我的主控芯片\n  早就安装到新身体上了。',
            ...(SAVE.flag.n.ga_asriel55++ < 1
               ? [
                  '<25>{#p/asriel2}{#f/10}* ...新身体？',
                  '<32>{#p/mettaton}* 怎么，想看？',
                  "<32>* 别着急，一会你们就能看到了。"
               ]
               : []),
            '<32>{#p/mettaton}* 拜拜咯...'
         ],
         operaX7: ["<25>{#p/asriel2}{#f/8}* 看来事情不简单。"],
         operaY1: ['<25>{*}{#p/asriel2}{#f/13}* 你说什-  {%}'],
         operaY2: ['<25>{*}{#p/asriel2}{#f/15}* $(name)。\n* 你在干啥。{^40}{%}'],
         operaY3: ["<25>{*}{#p/asriel2}{#f/15}* 快停下...{^40}{%}"],
         operaY4: ['<25>{*}{#p/asriel2}{#f/16}* $(name)，\n  用不着这样。{^40}{%}'],
         end1: (rgk: boolean) => [
            '<32>{#p/mettaton}* 终于...',
            ...(SAVE.flag.b.legs
               ? [
                  '<32>* 终于，在命运的...',
                  '<32>{#e/mettaton/4}* ...',
                  "<32>{#e/mettaton/25}* 我的传感器探测到\n  你正试图往我身后看。",
                  iFancyYourVilliany()
                     ? '<32>{#e/mettaton/30}* 你肯定特别想动我的开关，\n  是不是啊，“$(moniker2u)”？'
                     : '<32>{#e/mettaton/30}* 你肯定特别想动我的开关，\n  是不是啊，亲？',
                  ...(!world.badder_lizard
                     ? [
                        '<32>{#e/mettaton/28}* 你早就知道那里有开关。\n* 毕竟，我那点小秘密\n  艾菲斯肯定没藏住。',
                        '<32>{#e/mettaton/3}* 真是一猜就中...'
                     ]
                     : [
                        '<32>{#e/mettaton/28}* 你早就知道那里有开关。\n* 毕竟，看一眼皇家实验室的记录\n  就知道了。',
                        '<32>{#e/mettaton/3}* 真是一猜就中...'
                     ]),
                  "<32>{#e/mettaton/12}* 那我就不浪费时间\n  长篇大论了。",
                  ...(SAVE.data.b.a_state_hapstablook
                     ? ["<32>{#e/mettaton/3}* 只说一句话：\n  现在，我有点不在状态。"]
                     : iFancyYourVilliany()
                        ? ["<32>{#e/mettaton/31}* 只说一句话：\n  这次，我不会再手下留情！"]
                        : !world.badder_lizard
                           ? ["<32>{#e/mettaton/31}* 只说一句话：\n  这次演出精彩与否，就看你的了！"]
                           : ["<32>{#e/mettaton/19}* 只说一句话：\n  我不能对你的转变视而不见。"])
               ]
               : [
                  '<32>* 终于，在命运的指引下，\n  我们再度相会于此。',
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
                        '<32>{#e/mettaton/4}* 我得承认...',
                        '<32>{#e/mettaton/34}* 如果没有你，\n  我也走不到现在这一步。',
                        "<32>{#e/mettaton/5}* 一路下来，我们让观众\n  看到了自己最精彩的一面。",
                        "<32>{#e/mettaton/6}* 而即将到来的，\n  正是你我梦寐以求的重头好戏。",
                        '<32>{#e/mettaton/23}* 不过，我得说...',
                        ...(SAVE.data.b.a_state_hapstablook
                           ? [
                              "<32>{#e/mettaton/5}* 事情的发展有点超出\n  我的预料。",
                              '<32>{#e/mettaton/6}* 那些家长里短的破事\n  偏偏这时候冒出来...',
                              "<32>* ...给我搅得心神不宁。",
                              "<32>{#e/mettaton/11}* 不过，让我们先把\n  眼前这场表演圆满收尾，\n  再去处理那些事。",
                              '<32>{#e/mettaton/5}* 观众们肯定都迫不及待了。',
                              '<32>{#e/mettaton/6}* 所以，别让观众失望，好吗？'
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
         end2: ['<32>{#e/mettaton/11}* 摄影师！\n* 现在开拍！'],
         endX1: [
            '<32>{#p/mettaton}* 哎呀，哎呀...\n* 让您这么长途跋涉，\n  真是辛苦了，“亲”。',
            '<32>* 跟你扯这些客套话，\n  真是浪费时间。',
            '<32>* ...怎么？\n* 你还真当自己是块宝？',
            '<32>* 真是蠢的可以。',
            '<32>* 我只是想演一出好戏。',
            '<32>* 所谓一出好戏呢...',
            "<32>* 也不过是对对台词，摆摆姿势。",
            '<32>* 然后，借着演出展现我超强的实力，\n  顺便捞点名声和权力，',
            '<32>* 和“乐趣”“友谊”什么的...\n  根本不搭边。',
            '<32>* ...说回正题。',
            "<32>* 给我听好。\n* 犯了事，就休想逃。",
            '<32>* 管你怎么哭爹喊娘。\n* 管你怎么垂死挣扎。\n* 管你怎么跪地求饶。',
            '<32>* 你想咋的都行。',
            "<32>* 很快，我就会成为伸张正义的英雄。\n* 而你？\n  就是地上的一摊烂泥罢了。",
            "<32>* 看呐，我已经接管了整个核心，\n  让它源源不断地给我输送能量。",
            "<32>* 我和艾菲斯原来没打算这么做，\n  不过没什么大碍。",
            '<32>* 只要我一声令下，连上电缆，\n  就等着受死吧。',
            "<32>* 其实，你应该能预感到\n  我要这么做...",
            "<32>* 不过，一个满脑子\n  只知道杀杀杀的人\n  应该没那个智商。"
         ],
         endX1x: [
            '<32>{#p/mettaton}* 哎呀，哎呀...',
            '<32>* ...',
            '<32>* ...耷拉个脸干什么？\n* 就这么想被我打成肉酱？',
            '<32>* 还敢顶嘴？\n* 好，这是你自找的...'
         ],
         endX2: ["<32>{#e/mettaton/17}* 艾菲斯，过来！\n* 让它瞧瞧咱们的真本事！"],
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
            '<32>{#e/mettaton/6}* 女士们，先生们...',
            SAVE.flag.b.legs
               ? "<33>{#e/mettaton/11}* 压轴好戏，现在开始！"
               : '<32>{#e/mettaton/10}* 都准备好了吗？！\n  压轴好戏，即将开始！'
         ],
         end4: [
            '<32>{*}{#e/mettaton/11}* 高潮迭起！！\n* 扣人心弦！！\n* 腥风血雨！！{^20}{%}',
            '<32>{*}{#e/mettaton/20}* 尽在最新节目...{^20}{%}',
            '<32>{*}{#e/mettaton/17}* “杀人机器来袭”！{^20}{%}'
         ],
         end5: () =>
            SAVE.data.b.killed_mettaton
               ? !world.badder_lizard
                  ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* 我的天，你们俩还...']
                  : [
                     '<25>{#p/alphys}{#g/alphysWelp}* ...',
                     '<25>{#g/alphysInquisitive}* 你看我干嘛？',
                     SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                        ? "<26>{#g/alphysCutscene3}* 我才离开..."
                        : "<25>{#g/alphysCutscene3}* 我只是来..."
                  ]
               : !world.badder_lizard
                  ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* 我的天，你们俩还好吗？']
                  : [
                     '<25>{#p/alphys}{#g/alphysWelp}* ...',
                     '<25>{#g/alphysInquisitive}* 你看我干嘛？',
                     SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                        ? "<26>{#g/alphysCutscene3}* 我才离开一会工夫而已。"
                        : "<25>{#g/alphysCutscene3}* 我只是来看看镁塔顿还好吗。"
                  ],
         end6: () =>
            SAVE.data.b.killed_mettaton
               ? ["<25>{#p/alphys}{#f/10}* ...镁-镁塔顿在哪？", '<25>{#p/alphys}{#f/3}* 你-你把他给...']
               : !world.badder_lizard
                  ? [
                     '<25>{#p/alphys}{#g/alphysInquisitive}* 嗯... 还好你没事...',
                     '<25>{#p/alphys}{#g/alphysWelp}* 对不起，刚刚失联了。',
                     "<25>{#g/alphysWelp}* 不知为什么，\n  电话到这里就没信号了。"
                  ]
                  : [
                     '<25>{#g/alphysHaveSomeCompassion}* ...',
                     '<25>{#g/alphysHaveSomeCompassion}* 对了，呃... \n  现在跟我来下个房间。',
                     world.baddest_lizard
                        ? "<25>{#g/alphysNeutralSweat}* 我-我有事要告诉你。"
                        : "<25>{#g/alphysNeutralSweat}* 没-没事，你准备好\n  再跟过来就行。"
                  ],
         end7: () =>
            SAVE.data.b.killed_mettaton
               ? [
                  "<25>{#p/alphys}{#f/10}* 对-对不起。\n* 我该走了。",
                  "<25>{*}{#p/alphys}{#f/3}* 别-别跟着我！{%}"
               ]
               : [
                  "<25>{#p/alphys}{#g/alphysCutscene2}* 呃，别-别担心镁塔顿，\n  他只融合进了控制芯片。",
                  "<25>{#p/alphys}{#g/alphysCutscene2}* 所以我修好他的能量供应\n  就可以了。"
               ],
         end8: [
            '<25>{#p/alphys}{#g/alphysWelp}* 我先走了。',
            '<25>{#g/alphysNeutralSweat}* 不-不过，呃...\n* 你愿意跟过来吗？',
            '<25>{#g/alphysNervousLaugh}* 怪物们的未来... 需要...'
         ],
         end9: [
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* 不-不过！\n* 你别着急，等你准备好了...",
            '<25>{#g/alphysNeutralSweat}* 再跟过来就行。',
            '<25>{#g/alphysSideSad}* ...',
            "<25>{#g/alphysNeutralSweat}* 对-对不起。\n* 我们别无选择。"
         ],
         end10: () => [
            world.baddest_lizard
               ? "<32>{#p/mettaton}* 嗯...\n* 你最好现在跟她走，亲。"
               : "<32>{#p/mettaton}* 别担心，亲。\n* 说不定，她只是想带你去看\n  新一季的超赞科幻动漫呢。",
            '<32>* 至于我？',
            '<32>* ...\n* 等艾菲斯把我的芯片\n  装回到旧身体之后...',
            SAVE.data.b.a_state_hapstablook
               ? '<32>* 我想回家看看亲人。'
               : SAVE.data.n.state_starton_papyrus === 1
                  ? "<32>* 我还没想好做什么。"
                  : "<32>* 我要处理点事情。",
            ...(SAVE.data.b.oops
               ? []
               : [
                  '<32>* 哦，还有你，\n  $(name)...',
                  '<32>{#p/basic}* 怎么了？',
                  '<32>{#p/mettaton}* ...也祝你家里的事\n  能早日解决。',
                  '<32>{#p/basic}* 我家... 嗯。',
                  '<32>{#p/basic}* 会的。',
                  '<32>{#p/basic}* ...谢谢你，镁塔顿。'
               ]),
            '<32>{#p/mettaton}* 那么...',
            world.bad_lizard > 1
               ? '<32>* 有缘再见...\n* ...\n* ...小鬼。'
               : iFancyYourVilliany()
                  ? '<32>* 多谢捧场...\n* ...\n* ...$(moniker2)。'
                  : '<32>* 待会见...\n* ...\n* ...亲。'
         ],
         end11: () => [
            '<32>{#p/human}* （你听见一声叹息。）',
            '<32>{#p/basic}* ...我从镁塔顿和家人的冲突\n  看到了自己的影子。',
            "<32>* 那些事...\n  并不全都是小幽的错。",
            '<32>* ...',
            "<32>* 现在，还是别想太多，\n  继续前进吧...",
            '<32>* ...\n* 走吧，搭档。',
            "<32>* 我们一起回家。"
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
               : ["<32>{#p/basic}* 一张桌子。\n* 上面的餐盘，刀叉\n  只是印在桌布上的图案。"],
         doublefridge1: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your ear against the fridge door.)\n* (A fizzing can be heard.)']
               : ["<32>{#p/basic}* 一台非常安全的冰箱。\n* 两边都装满了橙汁汽水。"],
         doublefridge2: () => [
            ...(SAVE.data.b.svr
               ? ['<32>{#p/human}* (It sounds like one of the bottles inside was opened...)']
               : ['<32>{#p/basic}* 有一瓶汽水已经拧开了...']),
            choicer.create('* （拿走那瓶汽水吗？）', '是', '否')
         ],
         doublefridge3: ["<32>{#p/human}* （你带的东西太多了。）"],
         doublefridge4: ['<32>{#p/human}* （你拿了一瓶橙汁汽水。）'],
         doublefridge5: ['<32>{#p/human}* （你不打算这么做。）'],
         labcamera2: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The display appears to be completely offline.)']
                  : SAVE.data.n.plot === 72
                     ? world.darker
                        ? ["<32>{#p/basic}* It's offline."]
                        : ['<32>{#p/basic}* Anonymity at last.']
                     : ["<32>{#p/basic}* 别问这玩意是怎么工作的。\n* 接受就好。"],
         labdisplay: '-人类实时数据-\nEXP　$(x)\nHP 　$(y)\n金钱 $(z)\n距离 $(w)',
         exofountain1: () => [
            SAVE.data.b.svr
               ? '<32>{#p/human}* （看着喷泉中的果酒，\n  你忍不住想抿一口。）'
               : '<32>{#p/basic}* 喷泉中盛满了洋梅果酒。\n* 真奢侈。',
            choicer.create('* （抿一口吗？）', '是', '否')
         ],
         exofountain2a: ['<32>{#p/human}* （你打算不这么做。）'],
         exofountain2b: () => [
            '<32>{#p/human}* （你抿了一口果酒。）\n* （HP已回满。）',
            ...(world.genocide && SAVE.flag.n.ga_asrielDrink++ < 1
               ? ['<25>{#p/asriel2}{#f/15}* 你脑子没坏吧。']
               : [])
         ],
         kneeler: [
            "<32>{#p/human}* （你检查了艾斯利尔的肩膀。）\n* （看来托你上去没啥问题。）",
            '<25>{#p/asriel2}{#f/16}* 为啥非得这样。'
         ],
         kneeler2: ['<25>{#p/asriel2}{#f/8}* 真没必要。'],
         topdesk1: () =>
            SAVE.data.b.svr || world.bad_lizard > 1 || world.genocide || SAVE.data.n.state_foundry_undyne === 2
               ? ["<32>{#p/human}* （屏幕上的图像令你叹为观止。）\n* （你不会在做白日梦吧。）"]
               : [
                  '<32>{#p/basic}* 电脑休眠了。\n* 要开机吗？',
                  choicer.create('* （开机吗？）', '是', '否')
               ],
         topdesk2: ['<32>{#p/human}* （你不打算开机。）'],
         topdesk3: ["<32>{#p/basic}* 电脑屏幕上显示着\n  某个模拟器的游戏界面。"],
         labstationA: ["<32>{#p/basic}* 电脑屏幕上显示着\n  天文观测网络的控制面板。"],
         labstationB: ["<32>{#p/basic}* 电脑屏幕上显示着\n  一个全息场景的设计图。"],
         laserbarrrier1: () =>
            world.darker
               ? ["<32>{#p/basic}* 一道安保屏障。"]
               : ["<32>{#p/basic}* As per the crafter's guild standard, an impassable force field surrounds the area."],
         
         laserbarrrier2: pager.create(
            0,
            ['<32>{#p/basic}* 现在只有唯一的出路。'],
            ["<32>{#p/basic}* 这没什么特别的。"],
            ['<32>{#p/basic}* ...'],
            ['<32>{#p/basic}* ...'],
            ['<32>{#p/basic}* 真的。'],
            ['<32>{#p/basic}* ...'],
            ['<32>{#p/basic}* ...'],
            ["<32>{#p/basic}* 你就没有更明智的事可做吗？"]
         ),
         barricade: ['<32>{#p/basic}* The barricade blocks your way.'],
         puzzle1done: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stare into the blank screen of the terminal.)']
               : ["<32>{#p/basic}* 没反应。"],
         lablizard: {
            a: pager.create(
               0,
               () =>
                  SAVE.data.n.plot < 51
                     ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* 关于镁塔顿的事，\n  我很抱歉...',
                        '<25>{#g/alphysSideSad}* 他，呃...',
                        '<25>{#g/alphysNervousLaugh}* 他有时会有点躁动，\n  呃呵呵。'
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
                        "<26>{#p/alphys}{#g/alphysWelp}* 不过这也不能怪他。",
                        "<25>{#g/alphysWelp}* 他是你在这里见过的\n  最热爱人类的家伙。"
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
         mettacrafter1a: ['<32>{#p/mettaton}* 机不可失！'],
         mettacrafter1b: ["<32>{#p/mettaton}* 我认为你还漏了点什么。"],
         mettacrafter1c: ["<32>{#p/mettaton}* I THINK YOU'RE STILL MISSING SOMETHING."],
         mettacrafter2a: ['<32>{#p/mettaton}* 干得好！\n* 把所有东西放上我左边的操作台。'],
         mettacrafter2b: ['<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE THE REST ON THE COUNTER TO MY LEFT.'],
         mettacrafter2c: ['<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE THE LAST ITEM ON THE COUNTER TO MY LEFT.'],
         platformDeny: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : [
                  "<32>{#p/basic}* 需要特殊通行证\n  才能使用升降机。",
                  ...(world.goatbro
                     ? SAVE.data.n.plot < 49
                        ? !SAVE.flag.b.asriel_phone && SAVE.flag.n.ga_asrielGate++ < 1
                           ? [
                              "<25>{#p/asriel2}{#f/3}* 艾菲斯的实验室里\n  肯定有通行证。\n* 我们先进去找找。"
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
                  ? [choicer.create('* （你想去哪里？）', '右二层', '取消')]
                  : [choicer.create('* （你想去哪里？）', '右二层', '左二层', '左三层', '取消')],
            elevatorStory2: () =>
               SAVE.data.n.plot < 64
                  ? [choicer.create('* （你想去哪里？）', '右一层', '取消')]
                  : [choicer.create('* （你想去哪里？）', '右一层', '左二层', '左三层', '取消')],
            elevatorStory3: () => [
               choicer.create('* （你想去哪里？）', '左三层', '右一层', '右二层', '取消')
            ],
            elevatorStory4: () => [
               choicer.create('* （你想去哪里？）', '左二层', '右一层', '右二层', '取消')
            ],
            elevatorStory5: () => [
               "<32>{#p/basic}* 动力已关闭。",
               ...(world.goatbro && SAVE.flag.n.ga_asrielLiftE++ < 1
                  ? ["<25>{#p/asriel2}{#f/8}* Guess there's only one way forward now."]
                  : [])
            ],
            elevatorStory6: (citadel = false) =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The elevator appears to be powered down.)']
                  : postSIGMA()
                     ? ["<32>{#p/basic}* 停机了。"]
                     : [
                        "<32>{#p/basic}* 动力已关闭。",
                        ...(world.goatbro && (citadel ? SAVE.flag.n.ga_asrielLiftC++ : SAVE.flag.n.ga_asrielLift++) < 1
                           ? citadel
                              ? ['<25>{#p/asriel2}{#f/8}* 咱们没电梯好乘喽。']
                              : ["<25>{#p/asriel2}{#f/8}* 只能换条路走了。"]
                           : [])
                     ],
            elevator1: () => [
               '<32>{#p/human}* （你想去哪里？）',
               choicer.create('', '左一层', '取消', '左二层', '右二层', '左三层', '右三层')
            ],
            elevator2: () => [
               '<32>{#p/human}* （你想去哪里？）',
               choicer.create('', '左一层', '右一层', '左二层', '取消', '左三层', '右三层')
            ],
            elevator3: () => [
               '<32>{#p/human}* （你想去哪里？）',
               choicer.create('', '左一层', '右一层', '取消', '右二层', '左三层', '右三层')
            ],
            elevator4: () => [
               '<32>{#p/human}* （你想去哪里？）',
               choicer.create('', '左一层', '右一层', '左二层', '右二层', '取消', '右三层')
            ],
            elevator5: () => [
               '<32>{#p/human}* （你想去哪里？）',
               choicer.create('', '左一层', '右一层', '左二层', '右二层', '左三层', '取消')
            ],
            elevator6: () => [
               '<32>{#p/human}* （你想去哪里？）',
               choicer.create('', '取消', '右一层', '左二层', '右二层', '左三层', '右三层')
            ]
         },
         terminal1: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一些工作日志。）',
                        '<32>{#p/basic}* “工作日志，克历615年9月”',
                        '<32>* “自动数据分析器已证实：\n   近期，几颗恒星的位置坐标\n   发生了多次突变。”',
                        '<32>* “这些位置突变...\n  导致了力场内的时间乱流。”',
                        '<32>* “经推算，乱流导致时间落后了\n  十个公转周期。”',
'<32>* “当前的真实时间\n  应为克历625年9月。”'
                     ]
                     : [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一些工作日志。）',
                        '<32>{#p/basic}* “工作日志，克历615年8月”',
                        '<32>* “短时间内，研究对象无人看管。”',
                        '<32>* “...”',
                        '<32>* “那花不见了。”',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielTerminal1++ < 1
                           ? ['<25>{#p/asriel2}{#f/9}* 哎呀，真好奇发生什么了呢。']
                           : [])
                     ],
         terminal2: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                        '<32>{#p/basic}* “皇家实验室已关停！”\n* “在此感谢各位的辛勤付出。”'
                     ]
                     : world.bad_lizard < 2
                        ? [
                           '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                           '<#32>{#p/basic}* “呀哈哈，老滑头在此！”\n  - 老滑头'
                        ]
                        : [
                           '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                           '<32>{#p/basic}* “各位，我很抱歉...”'
                        ],
         terminal3: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                        '<32>{#p/basic}* “皇家实验室已关停！”\n* “在此感谢各位的辛勤付出。”'
                     ]
                     : [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                        '<32>{#p/basic}* “皇家实验室各位员工：\n   请做好垃圾分类。”'
                     ],
         terminal4: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                        '<32>{#p/basic}* “皇家实验室已关停！”\n* “在此感谢各位的辛勤付出。”'
                     ]
                     : [
                        '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                        ...(world.bad_lizard > 1 || world.genocide
                           ? ['<32>{#p/basic}* “皇家实验室已不再安全，\n   请尽快撤离。”']
                           : ['<32>{#p/basic}* “欢迎来到皇家实验室。”'])
                     ],
         terminal5: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The terminal appears to have been powered off.)']
                  : [
                     '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
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
                        : ['<32>{#p/basic}* “暂无可用数据。”'])
                  ],
         recycler: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the recycle bin...)"]
               : ["<32>{#p/basic}* 一个垃圾站。"],
         recyclerX: ['<32>{#p/human}* （你丢掉了电阻尼液。）'],
         ingredient1: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/human}* (You found the happy powder.)']
               : ['<32>{#p/human}* （你找到了环三亚甲基三硝胺。）'],
         ingredient2: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/human}* (You found the tingle serum.)']
               : ['<32>{#p/human}* （你找到了己二酸二正辛酯。）'],
         ingredient3: () =>
            iFancyYourVilliany()
               ? ['<32>{#p/human}* (You found the love oil.)']
               : ['<32>{#p/human}* （你找到了矿物油。）'],
         boop: () =>
            [
               ['<25>{#p/asriel2}{#f/13}* $(name), uh...', '<25>{#p/asriel2}{#f/18}* What are you doing...?'],
               ['<25>{#p/asriel2}{#f/18}* Wh-\n* $(name)!', '<25>{#p/asriel2}{#f/18}* Did you just... poke my snout?'],
               ['<25>{#p/asriel2}{#f/18}* Ah-\n* Stop that!'],
               ['<25>{#p/asriel2}{#f/18}* Cut it out!'],
               ['<25>{#p/asriel2}{#f/13}* ... $(name)?'],
               ['<25>{#p/asriel2}{#f/15}* $(name)。'],
               ['<25>{#p/asriel2}{#f/13}* Are you okay, $(name)?'],
               ["<25>{#p/asriel2}{#f/16}* ... I'll wait."],
               ['<25>{#p/asriel2}{#f/15}* ...']
            ][Math.min(SAVE.flag.n.ga_asrielBoop++, 8)],
         nuzzle: () =>
            [
               ['<25>{#p/asriel1}{#f/13}* 弗里斯克...？', '<25>{#p/asriel1}{#f/17}* Personal space...'],
               ['<25>{#p/asriel1}{#f/18}* Wh-\n* Frisk!', '<25>{#p/asriel1}{#f/18}* Did you just... nuzzle my snout?'],
               ['<25>{#p/asriel1}{#f/18}* Ah-\n* That tickles, Frisk!'],
               ['<25>{#p/asriel1}{#f/18}* 弗里斯克——！'],
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
                  : ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
            pager.create(
               2,
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* 一丛年代久远的蒲公罂而已。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : [
                           '<32>{#p/basic}* 这朵蒲公罂的最大粟求\n  便是继续保持着蒲公罂的样子。',
                           power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* 毫无罂姿的蒲公罂。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : [
                           "<33>{#p/basic}* 向蒲公罂粟求。\n* 等下，听起来有点不对劲。",
                           power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : [
                           '<32>{#p/basic}* 一朵蒲公罂能回罂\n  多少简蒲的粟求呢？',
                           power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* 一朵蒲公罂...\n  里面载满着粟求。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
               (power = false) =>
                  SAVE.data.b.svr
                     ? [
                        "<32>{#p/human}* (You take in the wish flower's aura.)",
                        power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                     ]
                     : world.darker
                        ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                        : ['<32>{#p/basic}* 又是一朵蒲公罂。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
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
                  ? ['<33>{#p/basic}* 无聊的广告。']
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
                  ? ['<33>{#p/basic}* 无聊的广告。']
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
                  : ["<32>{#p/basic}* 一个电力控制器。"],
         a_virt: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (It appears the terminal is beyond your access level.)']
               : SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}* It's a virtualasium.\n* Maybe one day you'll have the access level required."]
                  : ["<32>{#p/basic}* 一个虚拟空间。\n* 你未被授权，无法使用它。"],
         metposter: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You look closely at the promotional poster.)']
               : SAVE.data.n.plot === 72
                  ? [
                     "<32>{#p/basic}* 这是镁塔顿首映的宣传海报。",
                     '<32>* A signed note has been scrawled out and replaced with a correction...',
                     '<32>* \"I\'m sorry I\'ve been such a burden to you.\"'
                  ]
                  : [
                     "<32>{#p/basic}* 这是镁塔顿首映的宣传海报。",
                     "<32>* 上面有张镁塔顿的签名字条，\n  字迹难以辨认...",
                     '<32>* “谢谢你让我梦想成真。”'
                  ],
         bedbox: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You shrug at the sight of such an ordinary box.)']
               : world.darker
                  ? ['<32>{#p/basic}* 不起眼的盒子。']
                  : SAVE.data.n.plot === 72
                     ? [
                        "<32>{#p/basic}* To be honest, this isn't actually a non-euclidian housing unit.",
                        "<32>* It's a non-euclidian box-life mansion deluxe!"
                     ]
                     : [
                        '<32>{#p/basic}* 这个看似普通的盒子\n  是一个最先进的\n  非欧住房单元。',
                        "<33>* ...外面比里面看起来小。"
                     ],
         a_lab_books1: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of various unrelated contents.)']
                  : [
                     "<32>{#p/basic}* 这是个书架。",
                     '<32>{#p/human}* （你取下了一本书...）',
                     '<32>{#p/basic}* “怪物的身体是\n   自身灵魂的反映。”',
                     '<32>* “通常，父母会决定\n   他们的孩子会成为\n   什么样的怪物...”',
                     '<32>* “把他们的意志烙印在\n   孩子的灵魂深处。”',
                     '<32>* “但如果另一个生物，比如一个\n   人类，吸收了一个灵魂，\n   会发生什么呢？”',
                     '<32>* \"Legends speak of humans who absorbed the SOULs of dead boss monsters in the war...\"',
                     '<32>* “在一处特别的记载中，\n   据说有个人类变成了\n   一架飞机的形态。”',
                     '<32>{#p/human}* （你把书放回了书架。）'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of various unrelated contents.)']
                  : [
                     "<32>{#p/basic}* 这是个书架。",
                     '<32>{#p/human}* （你取下了一本书...）',
                     '<32>{#p/basic}* \"So you wanna design a robot, huh? Well, Fabulous Faraday\'s got you covered!\"',
                     '<32>* \"You see, here on Earth, we like to do things with a dash of flavor.\"',
                     '<32>* \"You can\'t just build a metal box and call it a day, you catch my drift?\"',
                     '<32>* \"You\'ve got to give it style, features dazzling and dynamic, like wheels and dials!\"',
                     '<32>* \"And, for maximum razz, do something creative with its mobility!\"',
                     '<32>* \"Like, I dunno, a unicycle?\"\n* \"Yeah, something like that.\"',
                     '<32>{#p/human}* （你把书放回了书架。）'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The books on this bookshelf consist of various unrelated contents.)']
                  : [
                     "<32>{#p/basic}* 这是个书架。",
                     '<32>{#p/human}* （你取下了一本书...）',
                     '<32>* \"Unfortunately, monsters do not deal with illness very well.\"',
                     '<32>* \"When a monsters\' death is imminent, they lie down, immobile.\"',
                     '<32>* \"We call this state \'Fallen Down.\'\"',
                     '<32>* \"During the war, this confusing situation was all too familiar...\"',
                     '<32>* \"Death, in those times, was sadly unavoidable.\"',
                     '<32>{#p/human}* （你把书放回了书架。）'
                  ]
         ),
         paperbook: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The book details a somewhat unrealistic story involving an intrepid adventurer.)']
               : [
                  '<32>{#p/human}* （你把书拿了起来...）',
                  '<32>{#p/basic}* “《喵喵航天行：梦境奇旅》”\n  “（同人故事）”',
                  '<32>* “...就在那时，\n   喵喵终于亲眼看到了。”',
                  '<32>* “那是相当壮观的景色。\n   孤身一人站在太空深处，\n   颇有遗世独立之感...”',
                  '<32>* “...但是喵喵心里可明白得很！”\n  * “她很快就发现了我们的困境。”',
                  '<32>* “稍微施展一下那广为人知的华丽丽光线，\n   她便击穿了立场！”',
                  '<32>* “这就是喵喵拯救怪物一族的故事。”',
                  '<32>{#p/human}* （你把书放回了桌子上。）'
               ],
         a_lab_books2: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* （书架上放着一系列笔记。）']
                  : [
                     "<32>{#p/basic}* 这是个书架。",
                     '<32>{#p/human}* （你取下了一本书...）',
                     '<32>{#p/basic}* “教授的笔记，第76页。”',
                     '<32>* “核心现在已经上线，\n   前哨站的建设计划\n   已在进行中。”',
                     '<32>* “我不知道该如何看待\n   这种发展...”',
                     '<32>* “不过，能让我们\n   在外面的生活更舒适一点\n   是件好事...”',
                     '<32>* “就这样安顿下来的话，我们是不是\n   相当于在承认，没有人类的灵魂\n   我们就无法逃脱？”',
                     '<32>* “自从我被任命为皇家科学员，\n   我就下定决心要解放我们大家。”',
                     '<32>* “现在，恐怕其他怪物\n   已经安于等待了...”',
                     '<32>{#p/human}* （你把书放回了书架。）'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* （书架上放着一系列笔记。）']
                  : [
                     "<32>{#p/basic}* 这是个书架。",
                     '<32>{#p/human}* （你取下了一本书...）',
                     '<32>{#p/basic}* “教授的笔记，第195页。”',
                     '<32>* “今天是怪物一族无比黑暗的一天，王室分崩离析了。”',
                     '<32>* “托丽尔女王放弃了王位。\n   仅仅因为艾斯戈尔的几句话。”',
                     '<32>* “但那些话估计要对我们产生长期的影响了...”',
                     '<32>* “现在，\n   大家都希望他主动夺取人类的灵魂。”',
                     '<32>* “这简直是一场灾难”',
                     '<32>{#p/human}* （你把书放回了书架。）'
                  ],
            () =>
               SAVE.data.b.svr
                  ? ['<32>{#p/human}* （书架上放着一系列笔记。）']
                  : [
                     "<32>{#p/basic}* 这是个书架。",
                     '<32>{#p/human}* （你取下了一本书...）',
                     '<32>{#p/basic}* “教授的笔记，第310页。”',
                     '<32>* “嗯...他同意这个计划了...\n   当然，我相当肯定他会的。”',
                     '<32>* “天赐良机。”\n  * “今天，自$(name)之后的第一个人类抵达前哨站了”',
                     "<32>* “我们还不知道它能不能容纳人类，\n   但结果马上揭晓”",
                     '<32>* “祈祷吧。”',
                     '<32>{#p/human}* （你把书放回了书架。）'
                  ]
         ),
         cream_machine: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You wonder what kind of ice cream this ice cream machine produces.)']
               : SAVE.data.n.plot === 72
                  ? ["<32>{#p/basic}* This overly complicated ice cream machine doesn't look like it'll get any more use."]
                  : ["<32>{#p/basic}* 一台构造十分复杂的冰淇淋机。\n* 好像复杂过头了。"],
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
               : ['<32>{#p/basic}* 一桶冰淇淋。'],
         mewposter: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (Your eyes follow the poster as it's animated subject bobs up and down.)"]
               : SAVE.data.n.state_aerialis_basekill > 29
                  ? ['<32>{#p/basic}* 一张小众科幻动漫系列的\n  大海报。']
                  : SAVE.data.n.state_aerialis_basekill > 14
                     ? ['<32>{#p/basic}* 一张科幻动漫系列的\n  大海报。']
                     : ['<32>{#p/basic}* 一张人气科幻动漫系列的\n  大海报。'],
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
                  ? ["<32>{#p/basic}* 一袋半空的狗粮。"]
                  : ["<32>{#p/basic}* 一袋半满的狗粮。"],
         virtsign: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign depicts what appears to be a lizard in a virtual environment.)']
               : ["<32>{#p/basic}* 一个虚拟空间人物标志。"],
         starlingtable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : ['<32>{#p/basic}* 星花。'],
         starling: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* 星花。']
                  : ['<32>{#p/basic}* A patch of Starling flowers.'],
         starling2: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* 星花。']
                  : ['<32>{#p/basic}* A little trio of Starling flowers.'],
         starling3: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* 星花。']
                  : ['<32>{#p/basic}* A densely-packed group of Starling flowers.'],
         starling5: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flowers.)']
               : world.darker
                  ? ['<32>{#p/basic}* 星花。']
                  : ['<32>{#p/basic}* A Starling flower couple.\n* Cute...?'],
         dttubes: () =>
            SAVE.data.b.svr
               ? [["<25>{#p/asriel1}{#f/3}* This stuff?\n* Ha... don't remind me."], ['<25>{#p/asriel1}{#f/4}* ...']][
               Math.min(asrielinter.dttubes++, 1)
               ]
               : [
                  '<32>{#p/basic}* 一排试管，里面盛放着不明物质。',
                  ...(world.genocide
                     ? world.goatbro &&
                        (SAVE.flag.n.genocide_milestone < 5
                           ? SAVE.flag.n.ga_asrielLab3++
                           : SAVE.flag.n.genocide_milestone < 6
                              ? SAVE.flag.n.ga_asrielLab4++
                              : SAVE.flag.n.ga_asrielLab5++) < 1
                        ? SAVE.flag.n.genocide_milestone < 5
                           ? [
                              '<25>{#p/asriel2}{#f/10}* 她给我用的那支注射器\n  跑哪去了...',
                              '<26>{#f/4}* 搞不好给弄丢了，哈哈。'
                           ]
                           : SAVE.flag.n.genocide_milestone < 6
                              ? [
                                 '<25>{#p/asriel2}{#f/15}* 那支注射器...',
                                 '<25>{#f/10}* 她是不是给自己用了那个，\n  才变得那么强？'
                              ]
                              : [
                                 '<25>{#p/asriel2}{#f/2}* 她还真以为\n  那破玩意能帮上她...',
                                 '<25>{#f/1}* 真是个大蠢货。'
                              ]
                        : []
                     : ['<32>{#p/basic}* There is also a used syringe with trace amounts of the same substance.'])
               ],
         papertable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The plans on the table describe some form of energy conversion process.)']
               : ["<32>{#p/basic}* 一张工作桌，\n  上面的图纸不伦不类。"],
         vender1: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You observe the mysterious contents behind the glass of the storage unit.)']
               : ['<32>{#p/basic}* 一个真空储物箱。\n* 里面放着各种不明物质的\n  试剂瓶。'],
         vender2: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You observe the mysterious contents behind the glass of the storage unit.)']
               : ['<32>{#p/basic}* 一个真空储物箱。\n* 里面放着各种不明物质的\n  试剂瓶。'],
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
                  "<32>{#p/basic}* 架子上挂着一些老工具，\n  看上去，都吃灰好几年了。",
                  ...(SAVE.data.n.plot === 72 ? ['<33>* ...现在更是没人用得着了。'] : [])
               ],
         spycamera1: () =>
            postSIGMA()
               ? ["<32>{#p/basic}* 停机了。"]
               : SAVE.data.b.svr
                  ? ['<32>{#p/human}* (The display appears to be completely offline.)']
                  : SAVE.data.n.plot === 72 && !world.runaway
                     ? ['<32>{#p/basic}* Privacy at last.']
                     : [
                        '<32>{#p/basic}* 这个监视器经校准后，\n  可以实时跟踪你的动作。',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielLab1++ < 1
                           ? ["<25>{#p/asriel2}{#f/5}* 真好奇艾菲斯监视我们时\n  脸上挂着什么表情..."]
                           : [])
                     ],
         gameshow_terminal1: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the humorous console.)']
               : world.darker
                  ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                  : SAVE.data.b.a_state_moneyfish
                     ? ['<32>{#p/basic}* 一个游戏节目操作台。\n* 这就是精彩比赛的一手见证。']
                     : ['<32>{#p/basic}* 一个游戏节目操作台。\n* 糟糕双关笑话的一手见证。'],
         gameshow_terminal2: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the sympathetic console.)']
               : world.darker
                  ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                  : ['<32>{#p/basic}* 一个游戏节目操作台。\n* 看上去是专门给幽灵准备的。'],
         gameshow_terminal3: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the familiar console.)']
               : world.darker
                  ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                  : ["<33>{#p/basic}* 一个游戏节目操作台。\n* 为你量身定做的。"],
         gameshow_terminal4: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You place your hands on the friendly console.)']
               : world.darker
                  ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                  : SAVE.data.n.state_foundry_muffet === 1
                     ? ['<32>{#p/basic}* 一个游戏节目操作台。\n* 有一股...山寨品的味道。']
                     : ['<32>{#p/basic}* 一个游戏节目操作台。\n* 有了这样的操作台，\n  谁还用手臂呢？'],
         a_path2_sign: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign establishes a limit for the number of monsters a liftgate can hoist.)']
               : [
                  '<32>{#p/basic}* “请务必小心，\n   升降机一次最多只能搭乘\n   两个怪物。”',
                  ...(world.genocide && SAVE.flag.n.ga_asrielSkySign1++ < 1
                     ? ['<25>{#p/asriel2}{#f/1}* 正好够用。']
                     : [])
               ],
         a_path4_sign: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign informs people of the closure of a collection agency.)']
               : SAVE.data.n.plot === 72
                  ? ['<#32>{#p/basic}* \"Sorry, but the collection agency is closed for good!\"\n  - Bratty and Catty']
                  : ['<#32>{#p/basic}* “将你的废弃用品放在这儿吧，\n   我们会想办法把它卖掉的！”\n  - 布莱蒂和凯蒂'],
         a_puzzle1_sign: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (The sign's contents seem to have been crossed out.)"]
               : SAVE.data.n.plot < 68
                  ? ['<32>{#p/basic}* “警告：前方或有节目正在拍摄。”']
                  : ['<32>{#p/basic}* “更新：节目停播。”'],
         labcounter: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You run your hands across the countertop.)\n* (It's pleasantly smooth.)"]
               : [
                  world.darker
                     ? "<32>{#p/basic}* 一个普通操作台。"
                     : SAVE.data.n.plot === 72
                        ? "<32>{#p/basic}* Ah, the humble countertop.\n* No better place to go after you've won the day!"
                        : "<32>{#p/basic}* Ah, the humble countertop.\n* No better place to practice your arts 'n' crafts!",
                  ...(mtt ? ["<32>{#p/mettaton}* 把材料放那里去。"] : [])
               ],
         chesstable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (It appears this game board is entirely empty.)']
               : world.darker
                  ? ["<32>{#p/basic}* 一张棋盘。"]
                  : SAVE.data.n.plot < 65 || SAVE.data.b.ubershortcut || world.genocide
                     ? ["<32>{#p/basic}* 一张棋盘。\n* 上面没有棋子。"]
                     : ["<32>{#p/basic}* It's a chess board.\n* It's black's turn, but there's no good moves to play..."],
         roomtable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The guidebook explains, in detail, the nature of multi- dimensional living.)']
               : [
                  "<32>{#p/basic}* 一本关于“跨时空旅行”的指导手册。",
                  '<32>* 你翻到书签夹着的那一页...',
                  '<32>* “...也就是说：在特定的参考系下，\n   你所处房间的三维空间坐标\n   恒定不变...”',
                  '<32>* “...但在四维时空坐标系下，\n   这一实体会具有不同的时间坐标。”',
                  '<32>* “一般，将这种现象称为‘时间位移’。”',
                  '<32>* “时间位移是一个复杂的过程，\n   涉及引力场能量密度及曲率的重新分布...”',
                  '<33>* ...\n* 谢天谢地，这页就写这些。'
               ],
         flowertable: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You stop to see the flower.)']
               : world.darker
                  ? ['<32>{#p/basic}* 一盆星花。']
                  : ['<32>{#p/basic}* 快看，是一盆孤独的星花。'],
         coredoor: ["<32>{#p/basic}* 锁住了。"],
         deadbot: ["<32>{#p/basic}* 就是个空壳。"],
         deadbot2: ["<32>{#p/basic}* 没电了。"],
         corenote1: [
            '<32>{#p/basic}* 一盒录音带，标着“托丽尔”。',
            '<32>{#p/human}* （你听了听内容...）',
            '<32>{#p/alphys}* 艾斯戈尔总跟我提起你。',
            '<32>* 他说，你做得一手好派，\n  讲故事也是一把好手。',
'<32>* 他说，你风趣幽默，\n  总能用笑话逗他发笑。',
            '<32>* 他还说，你心地善良，\n  会把满满的爱送给\n  每一位受困的人类。',
            '<32>* 尽管与艾斯戈尔存在误会，\n  但你仍努力成为温暖的光芒。',
            "<32>* 因为我，\n  你再也无法用光芒照亮世界。"
         ],
         corenote2: [
            '<32>{#p/basic}* 一盒录音带，标着“衫斯”。',
            '<32>{#p/human}* （你听了听内容...）',
            "<32>{#p/alphys}* 曾经，我们一起工作，\n  完成一个个项目...",
            '<32>* 曾经，我们联手\n  一起捉弄帕派瑞斯...',
            '<32>* 曾经，我们还\n  跟布莱蒂和凯蒂一起\n  来了场“垃圾大冒险”。',
'<32>* 那些珍贵的回忆，\n  我至死都不会忘。',
            '<32>* 我们虽做不到形影不离。\n* 但关键时刻，你从未缺席。',
            "<32>* 因为我，\n  你再也不能继续出力。"
         ],
         corenote3: [
            '<32>{#p/basic}* 一盒录音带，标着“帕派瑞斯”。',
            '<32>{#p/human}* （你听了听内容...）',
            "<32>{#p/alphys}* 我最自豪的事情之一，\n  就是我能和你一样，\n  喜欢谜题，热爱谜题。",
            '<32>* 小时候，你总是鼓励我，\n  不要畏惧，勇敢尝试...',
            '<32>* 你的鼓励，\n  让这世界多了一位科学家。',
            '<32>* 至今，我仍没有勇气直面一切。',
'<32>* 但我知道，你一直坚守本心，\n  做最棒的自己。\n* 直到最后一刻。',
            "<32>* 因为我，\n  你永远无法成为\n  “最伟大的帕派瑞斯”了。"
         ],
         corenote4: [
            '<32>{#p/basic}* 一盒录音带，标着“安黛因”。',
            '<32>{#p/human}* （你听了听内容...）',
            '<32>{#p/alphys}* 安黛因...\n* 每当我孤独，每当我难过，\n  你总会出现在我的身边，加油打气。',
            '* 尽管我们偶尔会意见不和，\n  闹点小脾气。\n* 但彼此的情谊坚不可摧。',
            '<32>* 我梦想着，\n  如果有朝一日，我们一起逃出去，\n  一定要做好多好多事！',
            "<32>* 我们一起上九天揽月，\n  一起在太空自由翱翔。\n* 没有拘束，只有欢乐。",
            "<32>* 因为我，\n  你再也无法和我一同探索\n  星辰大海。"
         ],
         corenote5: [
            '<32>{#p/basic}* 一盒录音带，标着“镁塔顿”。',
            '<32>{#p/human}* （你听了听内容...）',
            "<32>{#p/alphys}* 一开始，我们相处得不太愉快。\n* 但如果没有你，\n  我就走不到今天这一步。",
            "<32>* 镁塔顿，如果你在听...\n  我想对你说，你很棒。",
            "<32>* 整个前哨站，我只为你一人\n  做过新的身体。",
            "<32>* 其实... 我也考虑过\n  给纳普斯特做个身体。\n* 但是，纳普斯特不适合派去战斗。",
            '<32>* 总之，\n  加油，镁塔顿。'
         ],
         corenote6: () => [
            '<32>{#p/basic}* 一盒录音带，标着“艾斯戈尔”。',
            '<32>{#p/human}* （你听了听内容...）',
            "<32>{#p/alphys}* 我知道，自己并不擅长\n  这份工作...",
            '<32>* 但有你的支持，让我觉得\n  自己的努力有了意义。',
            '<32>* 整个前哨站的大家\n  都支持着我们...',
            '<32>* 所以，即便实验风险再大，\n  我也暗下决心：\n  一定要让大家逃出去。',
            "<32>* 最终... 我们成功了。\n* 您终于不用在这个破前哨站\n  苦苦等待人类到来。",
            '<32>* 但我就顾着高兴，\n  居然没预感到\n  实验会出岔子...',
            '<32>* 居然没注意到\n  尘埃落到了那朵星花上...',
            '<32>* 要是我早点发现，\n  果断把那朵星花隔离起来...\n  就不会出事。',
            "<32>* 但我没有在意。",
            '<32>* 因为我，因为我的自负，\n  那孩子走上了不归路。',
            "<32>* 许多朋友也因我而死...",
            '<32>* 我在实验室眼睁睁地\n  看着他们一个接一个死去，\n  自己却只是袖手旁观。',
            "<32>* 镁塔顿说，\n  会尽全力阻止他们。",
            "<32>* 但他要是失败了...\n* 下一个遭殃的就是你。",
            "<32>* 我不知道，\n  当又一个挚友死在我面前时，\n  我该如何应对。",
            "<32>* 我不知道，在你身处危险时\n  我要是再一次选择袖手旁观，\n  又该怎么面对自己。",
            "<32>* 我只知道，你不会还手。\n  而他们会毫不留情地杀了你。",
            "<32>* 要是我再磨蹭下去...",
            '<32>* ...',
            '<32>{#p/human}* （你听到放下录音机，\n  冲向电梯的声音。）',
            ...(SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.n.ga_asrielCorenote++ < 1
                  ? [
                     '<25>{#p/asriel2}{#f/3}* 艾菲斯又逃跑了，我理解。',
                     '<25>{#p/asriel2}{#f/4}* 毕竟她就是个窝囊废。'
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
               : ['<32>{#p/basic}* “未经授权，严禁闯入。”'],
         coresign2: () =>
            SAVE.data.b.svr
               ? [
                  '<32>{#p/human}* (The sign describes the longest- sustained accident- free period of time here.)',
                  "<25>{#p/asriel1}{#f/3}* If not for that one builder bot incident, it'd be flawless..."
               ]
               : ['<32>{#p/basic}* “核心无事故最长纪录：38690天。”'],
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
                  '<32>{#p/basic}* “年度最佳员工：查尔斯”\n  “感谢您一直努力工作，辛勤奉献。”'
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
               : ['<32>{#p/basic}* “谨上  T. N. 罗曼教授”\n  “愿您的足迹永存世间。”'],
         coresign5: () =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (The sign lists off what lies in each direction.)']
               : ['<32>{#p/basic}* “向左 - 四号舞台”\n* “向右 - 核心出口”'],
         pottedtable: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You get the sense you've seen this table somewhere else before.)"]
               : SAVE.data.n.plot === 72 && !world.runaway
                  ? ["<32>{#p/basic}* 一张眼熟的桌子。\n* 看出来这桌子是从哪来的吗？"]
                  : ['<32>{#p/basic}* 一张眼熟的桌子。'],
         potchair: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You get the sense you've seen this chair somewhere else before.)"]
               : SAVE.data.n.plot === 72 && !world.runaway
                  ? ['<32>{#p/basic}* 一把眼熟的椅子。\n* 他们可真会搞混搭。']
                  : ['<32>{#p/basic}* 一把眼熟的椅子。'],
         cardboard1: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the box...)"]
               : [
                  "<32>{#p/basic}* 一堆纸箱，几乎全是空的。",
                  '<32>{#p/basic}* 棕箱子的箱底放着几支试管。'
               ],
         cardboard2: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the box...)"]
               : [
                  "<32>{#p/basic}* 一堆纸箱，几乎全是空的。",
                  '<32>{#p/basic}* 高箱子里放着一些奇怪的化学试剂。'
               ],
         cardboard3: () =>
            SAVE.data.b.svr
               ? ["<32>{#p/human}* (You can't make out what's in the box...)"]
               : [
                  "<32>{#p/basic}* 一堆纸箱，几乎全是空的。",
                  '<32>{#p/basic}* 小箱子里装着一些研究论文，\n  论文的字体很奇怪。'
               ],
         labchem: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (This setup strikes you as rather dangerous.)']
               : [
                  world.darker
                     ? '<32>{#p/basic}* 传送带上有几瓶化学试剂。'
                     : SAVE.data.n.plot === 72
                        ? "<32>{#p/basic}* Chemicals on conveyor belts.\n* Somehow, nothing's ever gone wrong with this."
                        : '<32>{#p/basic}* Chemicals on conveyor belts.\n* What could possibly go wrong?',
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* 没有什么比镁塔超安全级传送带\n  发出的平静嗡嗡声更好了!',
                        '<32>* 它不仅让你不必再\n  多伸两微米去拿东西...',
                        '<32>* 还能让你在有烧杯从边上掉下来，\n  猛烈地摔破时...',
                        '<32>* 免费得到一个意外的化学反应！'
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
                     ? "<32>{#p/basic}* 一个“地球仪”。"
                     : SAVE.data.n.plot === 72
                        ? "<32>{#p/basic}* 一个“地球仪”，\n  展现着怪物...曾经的家园。"
                        : "<32>{#p/basic}* 一个“地球仪”，\n  展现着怪物伟大的故园。",
                  ...(mtt
                     ? [
                        "<32>{#p/mettaton}* 没有必备的“地球仪”，\n  这里就不能叫做科学实验室。",
                        "<32>* 这里大部分的东西\n  都是镁塔牌的产品，\n  但这一件算是个例外。",
                        '<32>* 不过，既然艾菲斯为我制作了它，\n  况且【我】自己也出自她之手...',
                        "<32>* 就没有理由怀疑它的质量！"
                     ]
                     : [])
               ],
         labrando: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You interact with the device, but it does nothing of use.)']
               : [
                  world.darker
                     ? '<33>{#p/basic}* 意义不明的装置。'
                     : SAVE.data.n.plot === 72
                        ? '<32>{#p/basic}* Disappointingly, the passage of time has not given this device a greater purpose.'
                        : '<32>{#p/basic}* The purpose of this device is explicitly unclear.',
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* 啊，没错，这就是\n  永远都好用的镁塔牌\n  中子流偏振器。',
                        '<32>* 它好到可以至少用十次...',
                        '<32>* 每年十次！！！'
                     ]
                     : [])
               ],
         labsink: (mtt: boolean) =>
            SAVE.data.b.svr
               ? ['<32>{#p/human}* (You run the nigh-invisible water over your hands.)']
               : [
                  "<32>{#p/basic}* 一个水槽，通过复制器供水。",
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* 材料越复杂，\n  就需要越多时间来复制。',
                        '<32>* 毕竟，核心的供能是有限的。',
                        '<32>* 好在水是最简单的物质之一！'
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
                  '<32>{#p/basic}* 标准规格的精密电子显微镜，\n  皇家出品。\n* 261X年前后制成。',
                  ...(mtt
                     ? [
                        '<32>{#p/mettaton}* 这些先进的显微镜是\n  几年前刚推出的。',
                        '<32>* 这是镁塔牌产品与时俱进的又一个例子！'
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
                     '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysShocked}* Woah, stop!!',
                     "<25>{#g/alphysOhGodNo}* You're g-going to fall out of the normal plane...",
                     '<25>{#g/alphysSideSad}* I should p-probably pull you back.',
                     '<25>{#g/alphysThatSucks}* Sorry...',
                     '<32>{#s/equip}{#p/event}* 滴...'
                  ]
                  : [
                     '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysShocked}* Woah, stop!!',
                     "<25>{#g/alphysOhGodNo}* You c-c-can't... g-go that far out...",
                     "<26>{#g/alphysNeutralSweat}* I'd pull you back, but I'm... not at my desk.",
                     "<26>{#f/10}* S-so don't be stupid!",
                     '<32>{#s/equip}{#p/event}* 滴...'
                  ],
            () =>
               SAVE.data.n.state_foundry_undyne !== 1
                  ? [
                     '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                     "<25>{#p/alphys}{#g/alphysSideSad}* It's not safe to go that far...",
                     "<25>{#g/alphysNeutralSweat}* I'm gonna pull you back now.",
                     '<32>{#s/equip}{#p/event}* 滴...'
                  ]
                  : [
                     '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysShocked}* W-what are you doing!?',
                     "<26>{#f/3}* You're almost at the edge!",
                     '<32>{#s/equip}{#p/event}* 滴...'
                  ],
            () =>
               SAVE.data.n.state_foundry_undyne !== 1
                  ? [
                     '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysWTF}* ...',
                     '<32>{#s/equip}{#p/event}* 滴...'
                  ]
                  : [
                     '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysIDK2}* ...',
                     "<25>{#p/alphys}{#g/alphysIDK3}* I guess... there's nothing I can say to stop you.",
                     '<32>{#s/equip}{#p/event}* 滴...'
                  ]
         ),
         puzzlestop1b: () =>
            [
               ['<25>{#p/asriel2}{#f/13}* 呃... $(name)？', "<25>* 咱俩好像走过头了。"],
               ['<25>{#p/asriel2}{#f/13}* ...$(name)？'],
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
                     '<32>{#p/basic}{#npc/a}* 刚刚，保安们全去参加派对了，\n  但我想留在这，吸点仙气。',
                     '<32>* 毕竟，什么聚会，什么派对...',
                     '<32>* ...哪有吸蒲公罂的仙气爽...'
                  ]
                  : SAVE.data.b.ubershortcut
                     ? [
                        "<32>{#p/basic}{#npc/a}* 感觉好没意思。\n  所以我就来这吸点“仙气”。",
                        "<32>* 这朵的劲儿还挺足，\n  但附近应该还有更爽的...",
                        "<32>* ...说不定一不小心就找到了呢。"
                     ]
                     : [
                        "<32>{#p/basic}{#npc/a}* 那蒲公罂仙气十足。\n* 我就闻了下，结果保安把我轰出来了。",
                        SAVE.data.b.killed_mettaton
                           ? '<32>* 这会，大家都在悼念那个大明星，\n  所以我可以溜进休闲回廊...'
                           : world.genocide
                              ? '<32>* 不久前，灯突然灭了，\n  所以我现在可以溜进休闲回廊...'
                              : '<32>* 这会，警卫全下班了，\n  所以我可以溜进休闲回廊...',
                        "<32>* 但是... 啊...\n* 闻了这么多，就这朵劲最足..."
                     ],
            ["<32>{#p/basic}{#npc/a}* 别管我，\n  我正搁这... 吸仙气呢。"]
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
                        ? ['<32>{#p/basic}* ...但是大家都逃走了。']
                        : ['<32>{#p/basic}* ...但是谁也没有来。']
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
                        ? ['<32>{#p/basic}* ...但是大家都逃走了。']
                        : ['<32>{#p/basic}* ...但是谁也没有来。']
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
               ['<25>{#p/asriel2}{#f/10}* 为啥还要回来呢？'],
               ["<25>{#p/asriel2}{#f/7}* 完全没必要啊。"]
            ][Math.min(SAVE.flag.n.ga_asrielTimewaster++, 1)],
         asriel46: ['<25>{#p/asriel2}{#f/13}* 哎呀...\n  身边多个人，总感觉瘆得慌。'],
         asriel47: [
            "<25>{#p/asriel2}{#f/4}* 感觉就好像...\n  和好朋友一起上战场。",
            "<25>{#f/3}* 你别说，这地方\n  还真有战场的感觉。"
         ],
         asriel48: [
            '<25>{#p/asriel2}{#f/13}* 其实吧...\n  这里比战场还恐怖。',
            '<25>{#p/asriel2}{#f/13}* ...还好\n  我们俩可以相互扶持，\n  你说是吧？'
         ],
         asriel49: [
            '<25>{#p/asriel2}{#f/13}* 想象一下...\n  在空境，一座城市拔地而起。',
            "<25>{#f/16}* 真可惜，\n  “空境城”项目烂尾了。"
         ],
         asriel50: [
            "<25>{#p/asriel2}{#f/3}* 要是建成了，\n  估计会有首塔的两倍大。",
            '<25>{#f/4}* 想象一下，假如有一天，\n  我们登上城市之巅，\n  将它的辉煌尽收眼底...',
            "<25>{#f/3}* 那该多棒啊。"
         ],
         asriel51: [
            '<25>{#p/asriel2}{#f/4}* 不过，城市要是真建那么大，\n  就有点荒唐了。',
            '<25>{#f/13}* 你也知道，\n  异想天开永远不会有好下场。'
         ],
         asriel52: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* 这破电梯，\n  该不会没法直达三楼吧？",
                  '<25>{#f/8}* ...',
                  "<25>{#f/7}* 早该知道，这电梯\n  肯定要跟咱们对着干。"
               ],
               ['<25>{#p/asriel2}{#f/8}* 走完一层，\n  还要走两层...']
            ][Math.min(SAVE.flag.n.ga_asriel52++, 1)],

         hotel0: () =>
            SAVE.flag.b.asriel_electrics
               ? [['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/7}* 果然。'], []][
               Math.min(SAVE.flag.n.ga_asrielElectrics0++, 1)
               ]
               : [
                  [
                     "<25>{#p/asriel2}{#f/6}* 真奇怪，\n  这里不该这么黑啊。",
                     "<25>{#f/7}* 肯定是有人\n  把供电系统弄短路了。"
                  ],
                  ['<25>{#p/asriel2}{#f/10}* 真想知道，\n  到底是谁把灯弄灭的？'],
                  []
               ][Math.min(SAVE.flag.n.ga_asrielHotel0++, 1)],
         hotel1: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.b.asriel_electrics
                  ? [
                     '<25>{#p/asriel2}{#f/15}* 我想了一下...',
                     '<25>{#f/16}* 这应该是魔法导致的停电。',
                     "<26>{#f/3}* 大概明白了。"
                  ]
                  : [
                     '<25>{#p/asriel2}{#f/10}* ...安保屏障也没了？',
                     '<25>{#f/10}{#x1}* 快看，\n  这安检门都烧坏了。'
                  ]
               : [
                  '<25>{#p/asriel2}{#f/13}* ...一想到这么严重的破坏\n  都是她的魔法造成的...',
                  '<25>{#p/asriel2}{#f/1}* 我就感到后怕。'
               ],
         hotelElectrics: [
            '<25>{#p/asriel2}{#f/10}* 柜台上那几张字条\n  你看了吗？',
            '<25>{#f/6}* 如果艾菲斯来过这，\n  那灯的情况就说得通了。',
            '<25>{#f/15}* 不过才来那么会，\n  就把电器全烧坏了？',
            "<25>{#f/16}* ...这也太离谱了..."
         ],
         hotel2: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/3}* 果然。\n* 这里也废弃了。",
                  "<25>{#f/4}* ...不管了，去核心。"
               ],
               []
            ][Math.min(SAVE.flag.n.ga_asrielHotel2++, 1)],
         core0: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* 可算到了...',
                  '<25>{#f/4}* 核心，整个前哨站的能量中心。',
                  '<25>{#p/asriel2}{#f/8}* 跟紧我。\n  搞不好特战队有埋伏。'
               ],
               []
            ][Math.min(SAVE.flag.n.ga_asrielCore0++, 1)],
         core1: ['<25>{#p/asriel2}{#f/10}* ...居然没人？', '<25>{#f/15}* 哎呀呀...\n  他们真是吓破胆了。'],
         core2: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* 总算到总控室了。',
                  "<25>{#f/3}* 这里的系统控制着\n  整个前哨站的重力、\n  供暖、大气...",
                  '<25>{#f/15}* 所以，咱们到了这，\n  就无所不能了。',
                  '<25>{#f/4}* 操纵重力，改变供暖，\n  管理大气... \n  统统不在话下。',
                  "<25>{#f/3}* 让我试试我的皇室访问码\n  还能不能用。",
                  "<25>{#f/2}* 他们估计都忘了重设权限..."
               ],
               [
                  '<25>{#p/asriel2}{#f/6}* 我们又回来了。',
                  ...(SAVE.flag.b.asriel_access ? [] : ["<25>{#f/7}* 我用皇室访问码试试。"])
               ]
            ][Math.min(SAVE.flag.n.ga_asrielCore2++, 1)],
         core3: () => [
            '<26>{*}{#p/asriel2}{#f/6}* 艾斯利尔呼叫系统，\n  请开启伸缩桥。\n* 授权码：STARLING-4-7-7-4。{^40}{%}',
            ...(SAVE.flag.b.asriel_access ? [] : ['<25>{*}{#f/6}* ...{^40}{%}', '<25>{*}{#f/7}* 看来没- {%}'])
         ],
         core4a: ['<25>{#p/asriel2}{#f/10}* 看来能用。'],
         core4b: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* 我在这篡改系统，\n  你去把后门解开。',
                  '<25>{#f/4}* 两条路：左或右。\n* 选一条，按下尽头开关。',
                  "<25>{#f/1}* 等你好消息。"
               ],
               ["<25>{#f/4}* 你忙你的，我忙我的。"]
            ][Math.min(SAVE.flag.n.ga_asrielCore4++, 1)],
         core5: ['<25>{#p/asriel2}{#f/8}* $(name)，回来。'],
         core6a: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/16}* 来的正是时候。\n* 咱们出发吧。',
                  "<25>{#f/1}* 接下来，我们只需要\n  找到一艘逃生飞船，坐船跑路...",
                  '<25>{#f/9}* 然后，把这里炸了...',
                  '<25>{#f/2}* 最终，飞向自由的彼岸。',
                  "<25>{#f/17}* ...$(name)，\n  兴不兴奋？高不高兴？",
                  
                  "<25>{#f/18}* ...\n* 咱俩很快就自由了！"
               ],
               ['<25>{#p/asriel2}{#f/9}* $(name)，\n  等你准备好，咱们就出发。']
            ][Math.min(SAVE.flag.n.ga_asrielCore5++, 1)],
         core6b: ["<25>{#p/asriel2}{#f/16}* 你来带路。"],
         core7a: ['<25>{#p/asriel2}{#f/8}* 等等，好像有人。'],
         core7b: [
            "<25>{#p/asriel2}{#f/3}* 是镁塔顿。\n* 他在里面等着我们。",
            '<25>{#f/10}* 不过，只能看清背影...',
            '<25>{#f/6}* 咱悄悄溜到他身后，\n  兴许能打他个措手不及。'
         ],
         core7c: ['<25>{#p/asriel2}{#f/7}* 你知道该做什么。'],
         core8a: [
            "<32>{#p/mettaton}* 真以为\n  我会轻易放你们走？",
            "<25>{#p/asriel2}{#f/8}* ...\n* 少跟我拐弯抹角。",
            "<25>{#p/asriel2}{#f/7}* 不过，你爱放不放，\n  我们才懒得管。\n* 毕竟，你早晚都得死。"
         ],
         core8aX: () => [
            "<32>{#p/mettaton}* 真以为\n  我会轻易放你们走？",
            "<25>{#p/asriel2}{#f/8}* 别废话了，蠢货。\n  这台词我都听腻了。",
            '<32>{#p/mettaton}* 呃...',
            "<32>{#p/mettaton}* 那不正好说明，\n  你们死在了我的手下吗？",
            ...(SAVE.flag.n.genocide_milestone < 4
               ? [
                  "<32>{#p/mettaton}* 呵... 别担心，亲。\n* 这次，就让你死得更痛快。"
               ]
               : [
                  '<25>{#p/asriel2}{#f/2}* 哎呀，你可真蠢。',
                  "<25>{#p/asriel2}{#f/1}* 看清楚，死的人其实是你。\n* 不过，我们很乐意\n  再把你送进地狱。",
                  '<32>{#p/mettaton}* ...',
                  "<32>{#p/mettaton}* 说得好... \n  不过我可不吃你这一套。"
               ])
         ],
         core8b: [
            "<25>{#p/asriel2}{#f/4}* 啧啧，变成破铜烂铁之前，\n  让我问问你...",
            "<25>{#f/3}* 抛弃亲人，\n  离家出走的时候...",
            '<25>{#f/1}* 就没考虑过他们的感受？',
            '<32>{#p/mettaton}* 我的家人看到我正在做的，\n  肯定会以我为荣。',
            '<32>* ...至于你呢？',
            "<32>* 那就不好说了。",
            "<25>{#p/asriel2}{#f/6}* 我才不在乎那些废物。",
            '<25>{#f/8}* 而你放不下家人，\n  就有了一个致命的软肋。',
            '<25>{#f/6}* 光凭这点，你就注定要输。'
         ],
         core8c: [
            '<32>{#p/mettaton}* 听好了，小子。',
            "<32>* 你那点威胁，对我屁用没有。",
            "<32>* 反正，你马上就要死在我的手里。",
            '<32>* 看来，你只会大放厥词，\n  四处炫耀。',
            '<32>* 自吹自擂，\n  说自己是常胜将军的时候...',
            "<32>* 却忽视了最关键的一点。"
         ],
         core8d: ['<25>{#p/asriel2}{#f/10}* 忽视了什么？'],
         core8e: ['<32>{*}{#p/mettaton}{#f/1}* NEO之力。{^40}{%}'],
         azzyBpants: ['<25>{#p/asriel2}{#f/8}* 我去。\n* 这家伙咋不走呢。']
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
                  : ["<32>{#p/basic}* 这个开关不想再被按下了。\n* ...没错，它卡住了。"],
      nosleep: () =>
         SAVE.data.b.svr ? ["<32>{#p/human}* (You can't seem to find a way in.)"] : ["<32>{#p/basic}* 锁住了。"],
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
         choicer.create('* （你想去哪里？）', '取消', '核心入口', '核心出口', '首塔')
      ],
      elevatorStory1: () => [choicer.create('* （你想去哪里？）', '核心入口', '取消')],
      elevator2: () => [
         choicer.create('* （你想去哪里？）', '空境', '取消', '核心出口', '首塔')
      ],
      elevatorStory2: () => [choicer.create('* （你想去哪里？）', '空境', '取消')],
      elevator3: () => [
         choicer.create('* （你想去哪里？）', '空境', '核心入口', '取消', '首塔')
      ],
      elevatorStory3: () => [choicer.create('* （你想去哪里？）', '首塔', '取消')],
      elevator4: () => [
         choicer.create('* （你想去哪里？）', '空境', '核心入口', '核心出口', '取消')
      ],
      dinnerdate1: pager.create(
         0,
         () => [
            "<25>{#p/sans}* hey, i heard you're visiting here.",
            '<25>{#p/sans}{#f/2}* mind grabbing some dinner with me real quick?',
            choicer.create('* （共进晚餐吗？）', '是', '否')
         ],
         () => ['<25>{#p/sans}{#f/2}* changed your mind?', choicer.create('* （共进晚餐吗？）', '是', '否')]
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
         '<25>{#p/sans}{#f/2}* 然后我拿起长号\n  吹了一段骨乐。',
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
      onionsan1: ['<32>{#p/basic}* 欢迎呀...\n* 看到你啦...'],
      onionsan1a: ["<32>{#p/basic}* 我是洋葱桑！\n* 听到没，洋葱桑！"],
      onionsan2: () =>
         world.goatbro
            ? ["<32>{#p/basic}* 你俩...\n  看着不像是好人..."]
            : ["<32>{#p/basic}* 哎呀...\n  你肯定经历了长途跋涉\n  才到这里..."],
      onionsan2a: () =>
         world.goatbro
            ? ["<32>{#p/basic}* 别担心！\n  在休闲回廊，人们都很大度！\n* 我爱死这里了。"]
            : ["<32>{#p/basic}* 别担心！休闲回廊，就是专为\n  我们这些旅者服务的！\n* 我爱死这里了。"],
      onionsan3: [
         "<32>{#p/basic}* 可惜...\n* 我太大了，进不去呐...",
         '<32>{#p/basic}* 太空无拘无束，\n  洋葱的成长也无拘无束了...'
      ],
      onionsan3a: () =>
         world.goatbro
            ? [
               "<32>{#p/basic}* 不过，这都不是事儿，\n* 很快，情况就会好转了！\n  你听到没！",
               "<32>{#p/basic}* 他们会打破力场的，\n  你听到没！\n* 真是太棒啦！"
            ]
            : [
               "<32>{#p/basic}* 不过，这都不是事儿！\n* 很快，我就有家了，你听到没！",
               "<32>{#p/basic}* 他们会打破力场的，\n  你听到没！\n* 真是太棒啦！"
            ],
      onionsan4: ["<32>{#p/basic}* 力场一破...\n* 我就能在漫漫宇宙...\n* 四处畅游了..."],
      onionsan4a: ["<32>{*}{#p/basic}* 自由要来啦啊啊啊啊啊啊啊啊啊啊{^999}"],
      onionsan4x: ['<25>{#p/asriel2}{#f/8}* 对对对，你说得都对。'],
      candy1: () =>
         postSIGMA()
            ? ["<32>{#p/basic}* 停机了。"]
            : [
               SAVE.data.b.svr
                  ? '<32>{#p/human}* (You approach the vending machine.)'
                  : "<32>{#p/basic}* 这是个专卖灯芯的自动售货机。",
               choicer.create('* （花40G买五根灯芯吗？）', '是', '否')
            ],
      candy2: ["<32>{#p/human}* （你的钱不够。）"],
      candy3: ["<32>{#p/human}* （你带的东西太多了。）"],
      candy4: ['<32>{#p/human}* （你买了一些灯芯。）'],
      candy5: ['<32>{#p/human}* （你决定先不买。）'],
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
                     choicer.create('* (Own a room?)', '是', '否')
                  ],
         () =>
            SAVE.data.n.plot === 72
               ? ['<32>{#p/basic}{#npc/a}* See you on the homeworld.']
               : SAVE.data.b.killed_mettaton
                  ? ['<32>{#p/basic}{#npc/a}* Until next time!']
                  : [
                     '<32>{#p/basic}{#npc/a}* 300G to own a junior suite.\n* Interested?{#npc}',
                     choicer.create('* (Own a room?)', '是', '否')
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
         '<32>{#p/event}* 铃铃，铃铃...',
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...你-你好呀。',
         "<25>* 那是去往首塔的电梯。",
         "<25>{#g/alphysInquisitive}* 我没有想阻拦你的意思，\n  但是...",
         "<25>{#g/alphysWelp}* 这玩意... 出了点问题。",
         "<25>{#g/alphysCutscene3}* 现在你得通过核心\n  才能去到首塔。",
         "<25>{#g/alphysUhButHeresTheDeal}* 等你准备好了，\n  就往那边走吧，\n  到时我会再给你回电话的！"
      ],
      core2a: () =>
         [
            [
               '<32>{#p/event}* 铃铃，铃铃...',
               "<25>{#p/alphys}{#g/alphysSmileSweat}* 好，你到了。",
               "<25>{#g/alphysSmileSweat}* 你在核心的这段时间，\n  我会和你保持电话联系...",
               '<25>{#g/alphysWelp}* ...以防有什么意外。',
               ...(SAVE.data.n.plot < 66.2
                  ? [
                     '<25>{#g/alphysInquisitive}* 在这里巡逻的特战队成员\n  现在本该在休息，\n  不过...',
                     "<25>{#g/alphysNeutralSweat}* ...呃，我担保不了。"
                  ]
                  : [
                     "<25>{#g/alphysInquisitive}* 我们提前到了，\n  特战队应该没在执勤。",
                     "<25>{#g/alphysNeutralSweat}* ...希望这一路上畅通无阻。"
                  ])
            ],
            SAVE.data.n.plot < 66.2
               ? [
                  '<32>{#p/event}* 铃铃，铃铃...',
                  '<25>{#p/alphys}{#g/alphysWelp}* 准备好继续前进了吗？',
                  '<25>{#g/alphysNeutralSweat}* 别忘了，你-你得\n  留意那些特战队成员。'
               ]
               : SAVE.data.n.plot < 67
                  ? [
                     '<32>{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysWelp}* 准备好继续前进了吗？',
                     '<25>{#g/alphysNeutralSweat}* 别忘了，你-你得\n  把那扇门给打开。'
                  ]
                  : [
                     '<32>{#p/event}* 铃铃，铃铃...',
                     '<25>{#p/alphys}{#g/alphysWelp}* 准备好继续前进了吗？',
                     "<25>{#g/alphysNeutralSweat}* 欸，我们都快到头了..."
                  ],
            ['<32>{#p/event}* 铃铃，铃铃...', "<25>{#p/alphys}{#g/alphysWelp}* 我会一直在线的。"]
         ][Math.min(SAVE.data.n.state_aerialis_coreenter++, 2)],
      core2b: () =>
         [
            [
               "<25>{#p/alphys}{#g/alphysInquisitive}* 如果你打算离开核心，\n  我就先把电话挂了。",
               "<25>{#g/alphysCutscene2}* 等你-你回来\n  我再打给你！"
            ],
            ['<25>{#p/alphys}{#g/alphysNervousLaugh}* 又要走了？', '<25>{#g/alphysWelp}* 那好吧。'],
            [
               '<25>{#p/alphys}{#g/alphysFR}* ...',
               '<25>{#g/alphysFR}* 你最好不是为了\n  看我有什么反应\n  才这么做的。'
            ],
            ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
         ][Math.min(SAVE.data.n.state_aerialis_coreleave++, 3)],
      core3: ['<25>{*}{#p/alphys}{#g/alphysShocked}* 小心！{^999}'],
      core4: () =>
         SAVE.data.b.legendary_madjick
            ? ["<25>{#p/alphys}{#g/alphysCutscene3}* 啊？\n* 那东西是咋回事？"]
            : SAVE.data.b.assist_madjick
               ? [
                  '<25>{#p/alphys}{#g/alphysCutscene3}* 什么鬼... 你做了啥？？',
                  '<25>* 你说了啥，\n  怎么会就这样走开了！？',
                  '<32>{#p/basic}* 呵呵。\n* 有时候你只需念出恰当的魔咒。'
               ]
               : !SAVE.data.b.killed_madjick
                  ? [
                     '<25>{#p/alphys}{#g/alphysNervousLaugh}* 呼...',
                     "<25>{#g/alphysNeutralSweat}* 希-希望别再发生\n  这种事了。",
                     ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ...看来你根本用不着我帮忙。"])
                  ]
                  : world.bad_lizard === 0
                     ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* 不... 为什么...',
                        '<25>{#g/alphysWorried}* ...',
                        "<25>* 难道就没有... 别的方法吗？"
                     ]
                     : [
                        '<25>{#p/alphys}{#g/alphysSideSad}* 不... 为什么...',
                        '<25>{#g/alphysThatSucks}* ...',
                        "<25>* 至少我们很快\n  就能出去了。"
                     ],
      core5: ['<25>{*}{#p/alphys}{#g/alphysOhGodNo}* 等下！！！{^999}'],
      core6: () =>
         SAVE.data.b.legendary_knightknight
            ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
               ? [
                  "<25>{#p/alphys}{#g/alphysWTF}* 我不敢相信我的眼睛...",
                  ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                     ? []
                     : ["<32>{#p/basic}* ...看来你这回用不着我帮，是吗？"])
               ]
               : ["<25>{#p/alphys}{#g/alphysCutscene3}* 啊？\n* 那东西是咋回事？"]
            : SAVE.data.b.assist_knightknight
               ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
                  ? [
                     "<25>{#p/alphys}{#g/alphysWTF}* 我不敢相信我的眼睛...",
                     '<32>{#p/basic}* 相信我吧。\n* 我心思可细腻了！',
                     '<32>{#p/basic}* 魔咒和战歌可是\n  这帮故园老英雄的命脉。'
                  ]
                  : [
                     '<25>{#p/alphys}{#g/alphysCutscene3}* 什么鬼... 你做了啥？？',
                     '<25>* 你说了啥，\n  怎么会就这样走开了！？',
                     '<32>{#p/basic}* 呵呵。\n* 有时候你只需唱出恰当的高音。'
                  ]
               : !SAVE.data.b.killed_knightknight
                  ? [
                     '<25>{#p/alphys}{#g/alphysWelp}* ...',
                     ...(SAVE.data.b.killed_madjick
                        ? ['<25>{#g/alphysWelp}* 至少你俩都活下来了。']
                        : [
                           '<25>* 咱们该去下个房间了吧。',
                           ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                              ? []
                              : ["<32>{#p/basic}* ...看来你这回用不着我帮，是吗？"])
                        ])
                  ]
                  : SAVE.data.b.killed_madjick || world.bad_lizard === 0
                     ? ['<25>{#p/alphys}{#g/alphysThatSucks}* ...', '<32>{#p/human}* （你听到了一声长叹。）']
                     : [
                        '<25>{#p/alphys}{#g/alphysWorried}* ...',
                        '<25>{#g/alphysWorried}* That should be the l-last of the engineers.'
                     ],
      core7: [
         '<25>{#p/alphys}{#g/alphysWelp}* 嗯... 这就是核心。\n* 或者说，核心的“核心”。',
         '<25>{#g/alphysInquisitive}* 想打开后面那扇门\n  有-有两条路可以走...',
         "<25>* 左边的是智者之路，\n  而右边的是勇者之路。",
         '<25>{#g/alphysFR}* 两边都... 蛮难走的。\n* 不过...',
         "<25>{#g/alphysWelp}* 我推荐你-你走智者之路。",
         "<25>{#g/alphysSideSad}* 当然了，这取决于你...",
         "<25>{#g/alphysHaveSomeCompassion}* 至少，往那边走，\n  你不会有... 发生冲突的风险。"
      ],
      core8a: (nooted: boolean) => [
         "<25>{#p/alphys}{#g/alphysSide}* 看来你决定走智者之路。",
         '<25>{#g/alphysWelp}* 这大抵是个明智的选择。',
         ...(nooted
            ? [
               '<25>{#g/alphysCutscene3}* 这些谜题...',
               '<25>{#f/10}* ...已经被解决了。',
               '<25>{#f/3}* 它一直是这样的吗？'
            ]
            : [
               "<25>{#g/alphysCutscene3}* 这些谜题... \n  呃，如果你会的话，就很简单。",
               "<25>{#g/alphysCutscene2}* 总而言之，它就只是个...\n  大号的密码锁。",
               '<25>{#g/alphysWelp}* Use the switches to flip each segment until they all line up.'
            ])
      ],
      core8a1: () => ["<25>{#p/alphys}{#g/alphysInquisitive}* 莫非你更想走另一条路...？"],
      core8b: ["<25>{#p/alphys}{#g/alphysCutscene2}* 你搞定一个迷题了。"],
      core8b1: () => ["<25>{#p/alphys}{#g/alphysWelp}* 看来现在我们又往这边走了。"],
      core8c: ['<25>{#p/alphys}{#g/alphysCutscene1}* 你成功了！\n* 去下个房间把开关按下吧！'],
      core8c1: [
         '<25>{#p/alphys}{#g/alphysInquisitive}* 你在干什么...？',
         "<25>{#p/alphys}{#g/alphysFR}* 别告诉我你现在\n  又要换条路走了..."
      ],
      core8c2: (nooted: boolean) =>
         nooted
            ? [
               '<25>{#p/alphys}{#g/alphysWTF}* 我说你啊。\n* 你还真往另一条...',
               '<25>{#g/alphysFR}* ...',
               '<25>{#g/alphysFR}* 这玩意啥时候被解决的？'
            ]
            : ['<25>{#p/alphys}{#g/alphysWTF}* 我说你啊。\n* 你还真往另一条路走啊。'],
      core8c3: [
         '<25>{#p/alphys}{#g/alphysWelp}* 这下你两个开关都能按了。',
         '<25>{#p/alphys}{#g/alphysCutscene3}* 得了吧！'
      ],
      core8c4: ['<25>{#p/alphys}{#g/alphysGarboCenter}* ...', '<25>* 你现在真是在\n  考验我的耐心啊。'],
      core9a: () => [
         "<25>{#p/alphys}{#g/alphysNeutralSweat}* 看来你决定走勇者之路。",
         ...(SAVE.data.b.killed_knightknight && (SAVE.data.b.killed_madjick || world.bad_lizard === 1)
            ? ['<25>* ...', '<25>{#g/alphysCutscene3}* 如果可以的话...\n* 你能... 别再杀人了吗？']
            : SAVE.data.b.killed_knightknight || SAVE.data.b.killed_madjick
               ? ['<25>* ...', '<25>* 这选择感觉不怎么样。']
               : [
                  "<25>{#g/alphysWelp}* 这无疑让我们有一种\n  要去冒险的感觉。",
                  "<25>* 其实这没什么大不了的，\n  你只需要安全通过那些守卫。",
                  '<25>{#g/alphysCutscene2}* 呃... 祝你好运？',
                  '<25>{#g/alphysCutscene3}* ...',
                  "<25>* 别死在他们手上了。"
               ])
      ],
      core9a1: (nooted: boolean) =>
         nooted
            ? [
               "<25>{#p/alphys}{#g/alphysSide}* 噢，你又跑来...",
               '<25>{#p/alphys}{#g/alphysCutscene3}* ...这条谜题已经被解完的路了。',
               '<25>{#p/alphys}{#f/3}* 它一直是这样的吗？'
            ]
            : [
               "<25>{#p/alphys}{#g/alphysSide}* 噢，你又跑来这条路了。",
               "<25>{#g/alphysInquisitive}* 智者之路，对吗？"
            ],
      core9b: () =>
         1 <= battler.exp
            ? [
               '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
               corefriendly() ? '<25>* 你真-真的... 有必要这么做吗？' : '<32>{#p/human}* （你听见一声叹息。）'
            ]
            : SAVE.data.b.a_state_nooted1
               ? [
                  "<25>{#p/alphys}{#g/alphysInquisitive}* 你知道吗，我不明白\n  你为什么还在这里。",
                  "<25>{#p/alphys}{#g/alphysCutscene3}* 你问我为什么？\n* 智者之路的谜题\n  都已经被解完了！"
               ]
               : ["<25>{#p/alphys}{#g/alphysCutscene2}* 你安全通过了第一组守卫！\n* 准备好下一场战斗吧。"],
      core9b1: (nooted: boolean) =>
         1 <= battler.exp && corefriendly()
            ? nooted
               ? [
                  "<25>{#p/alphys}{#g/alphysInquisitive}* 莫非，我是说当然了，\n  你打算...",
                  '<25>{#p/alphys}{#g/alphysCutscene3}* ...换另一条\n  谜题已经被解完的路走。',
                  '<25>{#p/alphys}{#f/3}* 它一直是这样的吗？'
               ]
               : ["<25>{#p/alphys}{#g/alphysInquisitive}* 莫非，我是说当然了，\n  你打算换另一条路走...?"]
            : nooted
               ? [
                  '<25>{#p/alphys}{#g/alphysInquisitive}* 你改变...',
                  "<25>{#p/alphys}{#g/alphysCutscene3}* ...噢，这已经被解决了。",
                  '<25>{#p/alphys}{#f/3}* 它一直是这样的吗？'
               ]
               : ['<25>{#p/alphys}{#g/alphysInquisitive}* 你改变主意了...?'],
      core9c: () =>
         calm_lizard()
            ? ['<25>{#p/alphys}{#g/alphysCutscene1}* 你做到了！\n* 去下个房间把开关按下吧！']
            : [
               '<25>{#p/alphys}{#g/alphysSideSad}* ...',
               SAVE.data.n.state_aerialis_corepath_puzzle < 3
                  ? "<25>{#p/alphys}{#g/alphysSideSad}* 去下个房间把开关按下，\n  然后我们就能离开这里了。"
                  : '<25>{#p/alphys}{#g/alphysSideSad}* 去下个房间把开关按下，\n  就完事了。'
            ],
      core10a: ['<25>{#p/alphys}{#g/alphysCutscene2}* 好了，你现-现在应该\n  可以继续前进了。'],
      core10b: [
         '<25>{#p/alphys}{#g/alphysWelp}* 噢，你回来了。',
         '<25>{#g/alphysCutscene2}* 好，你现-现在应该\n  可以继续前进了。'
      ],
      core10c: ['<25>{#p/alphys}{#g/alphysFR}* 终于啊。'],
      core11: (nooted: boolean) =>
         nooted
            ? [
               '<25>{#p/alphys}{#g/alphysInquisitive}* 你为啥要往...',
               '<25>{#f/21}* ...',
               '<25>{#f/22}* 这鬼地方的谜题\n  早就被解完了吗！？'
            ]
            : ['<25>{#p/alphys}{#g/alphysInquisitive}* 你为啥要往这边走？', '<25>{#g/alphysFR}* ...'],
      core12: (nooted: boolean) =>
         nooted
            ? [
               
               '<25>{#p/alphys}{#g/alphysInquisitive}* 这玩意啥时候被解决的？',
               "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 呃，\n  这样就能节省很多时间了！"
            ]
            : SAVE.data.b.a_state_nooted1 && game.room === 'a_core_left2' // NO-TRANSLATE

               ? ['<25>{#p/alphys}{#g/alphysCutscene3}* 到底是怎样啊...']
               : ['<25>{#p/alphys}{#g/alphysCutscene3}* 你现在本应该已经到首塔了。'],
      core12x: [
         '<25>{#p/alphys}{#g/alphysInquisitive}* 这玩意啥时候被解决的？',
         '<25>{#p/alphys}{#f/3}* 它一直是这样的吗？'
      ],
      core13: [
         "<25>{#p/alphys}{#g/alphysGarbo}* 俩开关你都按了。",
         '<25>{#p/alphys}{#g/alphysGarboCenter}* 这下满意了？'
      ],
      core14: () => [
         "<25>{#p/alphys}{#g/alphysWelp}* 停，前-前面有东西。",
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* 让我看看，\n  这回能不能直接清除障碍...',
         SAVE.data.b.ubershortcut
            ? '<32>{#p/human}* (It sounds like someone is furiously typing at a keyboard.)'
            : '<32>{|}{#p/human}* （又是强制- {%}',
         "<25>{#p/alphys}{#g/alphysCutscene3}* 内网系统的名单上没有它。",
         "<25>{#g/alphysUhButHeresTheDeal}* 它甚至连守卫都不是！",
         '<25>{#g/alphysWelp}* ...不妙。'
      ],
      core14a: [
         '<32>{#p/basic}* 以为想去对面，\n  只需要过座桥吗？',
         "<32>* 哦呼呼呼...\n* 真可惜啊，冤家路窄..."
      ],
      core14b: ["<32>{#p/basic}* 想过桥，先好好掂量掂量\n  自己几斤几两！{%20}"],
      core15: () =>
         !world.killed_mushketeer
            ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 结... 结束了？', '<25>* 能走了吗？']
            : [
               '<26>{#p/alphys}{#g/alphysNeutralSweat}* 你... 你把它...',
               '<25>{#g/alphysHaveSomeCompassion}* ...好吧...'
            ]
   },

   b_group_aerialis: {
      froggitexWhimsalot: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 这-这是第一组守卫。']
            : ['<32>{#p/story}* 终极蛙吉特和飘游䗁士\n  出现在你的面前！'],
      froggitexWhimsalotX: (whimmer: boolean) =>
         whimmer ? ['<32>{#p/story}* 飘游䗁士独自飞着。'] : ['<32>{#p/story}* 终极蛙吉特没了伙伴，\n  独自蹦跳。'],
      astigmatism: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 怎么是他们啊...']
            : world.genocide
               ? ['<32>{#p/story}* 迎面走来的，是一只笑眼！']
               : ['<32>{#p/story}* 迎面走来的，是两双笑眼！'],
      rg: () => (world.goatbro ? ['<32>{#p/asriel2}* 一号守卫，二号守卫。'] : ['<32>{#p/story}* 皇家卫队来袭！']),
      spacetopTsundere: () =>
         world.goatbro ? ['<32>{#p/asriel2}* 一群疯子...'] : ["<32>{#p/story}* 太空配星舰，噩梦滚滚来！"],
      spacetopTsundereX: (spacetop: boolean) =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 只剩一个了。']
            : spacetop
               ? ['<32>{#p/story}* 这里只剩太空帽了。']
               : ['<32>{#p/story}* 这里只剩傲娇飞船了。'],
      pyropeTsundere: () =>
         world.goatbro ? ['<32>{#p/asriel2}* “爱上火”两人组来袭。'] : ["<32>{#p/story}* 烈火骑兵来袭！"],
      pyropeTsundereX: (pyrope: boolean) =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 只剩一个了。']
            : pyrope
               ? ['<32>{#p/story}* 这里只剩烈焰热线了。']
               : ['<32>{#p/story}* 这里只剩傲娇飞船了。'],
      astigmatismMigospelX: ['<32>{#p/story}* 眼行者掌控了战局！']
   },

   b_opponent_glyde: {
      name: '* 老滑头',
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
      intro1: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}呀哈哈，\n吃我这招，臭机器人！'],
      intro2a: () =>
         !world.badder_lizard
            ? ['<20>{#p/mettaton}你明知道艾菲斯\n和我还在这。']
            : ["<20>{#p/mettaton}你明知道我还在这儿。"],
      intro2b: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}闭嘴！这现在是\n我的舞台了，机器怪。'],
      intro2c: ['<20>{#p/mettaton}（还蛮有意思。）'],
      intro3: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}哥们我有故事要讲！'],
      status1: ['<32>{#p/story}* 老滑头扑了过来！'],
      turn1a: () => [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/10}你不跟我战斗吗？',
         iFancyYourVilliany()
            ? '<20>{#p/basic}{~}{#e/glyde/0}... surprising, coming from a common villain like you.'
            : '<20>{#p/basic}{~}{#e/glyde/0}...我猜你会的。'
      ],
      turn1b: () => [
         '<20>{#p/basic}{#p/basic}{~}{#e/glyde/7}噢，\n我喜欢你的斗志。',
         iFancyYourVilliany()
            ? '<20>{#p/basic}{~}{#e/glyde/10}Way to live up to your moniker, eh?'
            : "<20>{#p/basic}{~}{#e/glyde/10}那会对你\n很有帮助的..."
      ],
      turn1c: ["<20>{#p/basic}{~}{#e/glyde/10}Kahaha... no offense, but you're kinda sorta the wrong species."],
      turn1d: ["<20>{#p/basic}{~}{#e/glyde/9}Yeah, sorry, but I don't give out stats for free."],
      turn1e: [
         "<20>{#p/basic}{~}{#e/glyde/4}几周前，\n我在思考\n关于赚钱的事...",
         '<20>{#p/basic}{~}{#e/glyde/0}然后我注意到\n利润下降了。'
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
         '<20>{#p/mettaton}汉堡裤！',
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
      name: '* 镁塔顿',
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
            ? ['<32>{#p/story}* 镁塔顿开始行动了！']
            : ['<32>{#p/story}* 镁塔顿又回来了！'],
      act_check: () =>
         SAVE.data.n.plot < 67
            ? ['<32>{#p/story}* 镁塔顿 - 攻击30 防御255\n* 他的金属制的身体\n  使他无懈可击。']
            : ['<32>{#p/story}* 镁塔顿 - 攻击30 防御255\n* 没想到，他的金属身体\n  竟然使他无懈可击！'],
      act_flirt: ['<32>{#p/human}* （你向镁塔顿调情。）'],

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

      checkTalk: ["<20>{#p/mettaton}欣赏艾菲斯的\n令人惊叹的技术了？\n我不予置评。"],
      attackTalk: () =>
         SAVE.data.n.plot < 67
            ? ["<20>{#p/mettaton}YOU SILLY GOOSE.\nTHAT'S NOT GOING TO WORK ON ME, SWEETHEART!"]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}LISTEN, SWEETHEART.\nI'VE HAD ENOUGH PAIN TODAY AS IT IS.\nDO YOU MIND?"]
               : ["<20>{#p/mettaton}LISTEN, SWEETHEART.\nATTACKING ME WON'T DO YOU ANY FAVORS.\nESPECIALLY NOT NOW."],
      flirtTalk: ['<20>{#p/mettaton}哦哦哦...', '<20>GETTING FRISKY, EH?', "<20>我会记住的，亲爱的~"],

      turn1: [
         "<20>{#p/mettaton}我们先从\n简单的开始...",
         '<20>唱歌！',
         '<20>{|}你能够- {%}'
      ],
      turn1a1: ['<20>...\n等一下。', '<20>是我的错觉，\n还是...', '<20>你今天看起来\n有点“红”呢？'],
      turn1a2: ['<20>博士，如果\n你可以的话...'],
      turn1b1: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ["<20>{#p/alphys}好，好！\n我-我会的！"]
            : world.bad_lizard < 1
               ? ['<20>{#p/alphys}呃，好！']
               : ['<20>{#p/alphys}...嗯？'],
      turn1b2: () =>
         SAVE.data.n.state_foundry_undyne > 0 || world.bad_lizard < 1
            ? ['<20>{#p/alphys}请-请原谅我...']
            : ['<20>{#p/alphys}O-oh yeah, that.'],
      turn1c: ['<20>{*}{#p/mettaton}好多了。{^30}{%}'],
      turn1d: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{*}{#p/alphys}现-现在按[Z]\n来传送。{^30}{%}']
            : world.bad_lizard < 1
               ? ['<20>{*}{#p/alphys}所以...\n你-你可以四处移动，\n然后按[Z]传送！{^30}{%}']
               : ['<20>{*}{#p/alphys}四处移动，\n然后按[Z]传送。{^30}{%}'],
      turn1e: ['<20>{*}{#p/mettaton}艾菲斯，艾菲斯，艾菲斯...{^30}{%}'],
      turn1f: ['<20>{*}我不是跟你说过\n不要给提示吗？{^30}{%}'],
      turn1g: ['<20>{*}...{^30}{%}', '<20>{*}总之...{^30}{%}', "<20>{*}我们开始表演吧！{^30}{%}"],

      turn2: ["<20>{#p/mettaton}不要错过任何一个\n音符，亲爱的！"],
      turn3: ["<20>{#p/mettaton}我们来玩点\n刺激的吧。"],

      turn4a1: [
         "<20>{#p/mettaton}I MUST SAY, YOU'RE HANDLING THIS LIKE A TRUE ICON.",
         '<20>BUT, CAN YOU GO FIN-TO-FIN WITH OUR SPECIAL GUEST?'
      ],
      turn4a2: [
         "<20>{#p/mettaton}我得说，到目前\n为止你的表现\n还不是最好的。",
         '<20>也许你需要的\n是一点竞争的\n刺激！'
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

      turn5a1: ["<20>{#p/mettaton}使出全力吧，\n害羞塞壬！"],
      turn5a2: () =>
         SAVE.data.b.bullied_shyren
            ? ['<20>{#p/mettaton}害羞塞壬...？']
            : [
               '<20>{#p/mettaton}很迷人，哈？',
               "<20>{#p/mettaton}别着急。\n害羞塞壬的歌声\n对每个人来说\n都是这样的。"
            ],

      turn5end1: () =>
         SAVE.data.b.bullied_shyren
            ? [
               "<20>{#p/mettaton}... MAYBE SHYREN'S JUST NOT FEELING IT TODAY.",
               '<20>HOW TRAGIC.',
               '<20>BY THE WAY, DID I MENTION YOUR VOICE IS GETTING BORING?'
            ]
            : [
               "<20>{#p/mettaton}哦，\n害羞塞壬太可爱了，\n是吧？",
               "<20>如果按我的方式，\n她早就是\n超级巨星了...",
               '<20>哦。对了，\n我有说过你\n声音越来越\n无聊了吗？'
            ],
      turn5end2: [
         "<20>但别担心，\n解决办法\n显而易见。",
         "<20>任何优秀的\n节目机器人都\n知道...",
         '<20>...没有舞蹈\n就没有音乐！'
      ],

      turn6: ['<20>{#p/mettaton}放马来吧！'],

      turn7a: [
         '<20>{#p/mettaton}听到了吗，\n亲爱的...？',
         "<20>...那就对了。",
         '<20>观众们可是\n很希望看到\n节目效果的！',
         '<20>现在有请\n愤怒的人偶。'
      ],
      turn7b1: ['<20>{#p/basic}又是你。'],
      turn7b2: ['<20>{#p/basic}又是你！'],
      turn7b3: ['<20>{#p/basic}又-是-你！！！'],
      turn7c: ['<20>{#p/mettaton}哦，你们两个\n彼此认识吗？'],
      turn7d1: ['<20>{#p/basic}...\n可能认识吧。\n也可能不认识。'],
      turn7d2: ["<20>{#p/basic}反正你又\n不在乎！"],
      turn7e: [
         '<20>{#p/mettaton}哇，没必要\n对我这么\n充满敌意...',
         '<20>{#p/mettaton}这只是一场\n不起眼的\n达人秀表演！'
      ],
      turn7f: [
         "<20>{#p/basic}这是你两周内\n第二次让我\n上节目了！",
         '<20>{#p/basic}你是喜欢我\n还是怎么的！？'
      ],
      turn7g1: [
         "<20>{#p/mettaton}...\n别胡说八道。",
         "<20>{#p/mettaton}我找你来只是\n因为你很有\n节目效果！"
      ],
      turn7g2: ["<20>{#p/basic}（我表亲以前\n也是这么说的...）"],
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

      turn8a1: ['<20>{#p/mettaton}要不遗余力！'],
      turn8a2: ['<20>{#p/mettaton}应付不了这么多的\n棉花，是吗？', '<20>{#p/mettaton}哎呀，太糟糕了！'],

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
         "<20>{#p/mettaton}...我真不明白\n你的成绩怎么\n这么糟糕。",
         '<20>明明早些时候\n你表现得\n很不错来着。',
         '<20>哦好吧。\n可能，这也是\n常有的事吧。'
      ],
      turn8end3b: [
         '<20>{#p/mettaton}... 没人告诉过你\n你有多菜吗？',
         '<20>搞砸一场声乐表演\n是一回事。',
         '<20>但这个呢...？\n这真的是太悲哀了。'
      ],
      turn8end4: ['<20>{#p/mettaton}唉...\n我们还有一场表演\n需要完成。'],
      turn8end5: ['<20>{#p/mettaton}女士们，先生们...', '<20>掌声有请...'],
      turn8end6: ['<20>举世无双的\n艾菲斯博士！'],

      turn9a: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{|}{#p/mettaton}HOW WELL WILL YOU FARE AGAINST- {%}']
            : ['<20>{#p/mettaton}你将如何应对，\n这最后的挑战呢？'],
      turn9b: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ['<20>{#p/alphys}不-不！']
            : world.bad_lizard < 1
               ? ['<20>{*}{#p/alphys}你-你在开玩笑吗？{^30}{%}']
               : ['<20>{*}{#p/alphys}{#e/alphys/7}...'],
      turn9bx: ["<20>{#p/alphys}You can't force me to do something I don't want to."],
      turn9c: ["<20>{*}{#p/alphys}我不能...{^30}{%}"],
      turn9d: ['<20>{*}{#p/alphys}我...{^30}{%}'],
      turn9e: () =>
         world.bad_lizard < 1
            ? ["<20>{#p/alphys}我-我做不到！"]
            : ["<20>{#p/alphys}{#e/alphys/4}I'm not sure if this is a good idea."],

      turn9end1: ['<20>{#p/mettaton}有什么问题吗，\n亲爱的？'],
      turn9end2: () => [
         ...[
            [
               "<20>{#p/alphys}{#e/alphys/4}我-我不想伤害人类，\n镁塔顿...",
               '<20>{#p/alphys}{#e/alphys/7}我们先前和他们的关系\n可能有点紧张，但是...',
               "<20>{#e/alphys/6}这并不意味着这个人类\n与以前的人类一样，\n是吧？",
               "<20>{#e/alphys/8}所以我觉得...\n就这样继续攻击人类\n有点太不公平了。"
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
            : ['<20>{#p/mettaton}嗯...', '<20>你的观点还挺有趣的，\n博士。'],
      turn9end4: ["<20>但我不敢\n苟同你的观点。{#e/alphys/1}"],
      turn9end5: () =>
         SAVE.data.n.state_foundry_undyne > 0
            ? ["<20>IT'S JUST A SHAME THE VIEWERS WON'T GET TO SEE WHAT HAPPENS.{#e/alphys/28}"]
            : [
               '<20>在我看来，\n一场优质电视剧的核心\n便是冲突与矛盾！{#e/alphys/2}',
               '<20>又有谁能\n拒绝这一点呢？'
            ],
      turn9end6: [
         "<20>{#p/mettaton}{#e/alphys/0}行吧，总而言之\n我们的时间\n已经所剩无几了。",
         "<20>所以...\n今天的节目到此结束！",
         '<21>STAY TUNED, FOLKS!\nTHE NEXT EPISODE IS ALREADY IN THE WORKS.',
         "<20>你一定不想错过！"
      ],
      turn9end7a: ['<20>{#p/alphys}好吧。'],
      turn9end7b: ["<20>{#p/alphys}Seriously?\nYou didn't even miss a single time."],
      turn9end7c: ['<20>{#p/alphys}...'],

      turn1status: ["<32>{#p/story}* 电击时间到了。"],
      turn2status: ['<32>{#p/story}* 镁塔顿鼓起了机器手掌。'],
      turn3status: ["<32>{#p/story}* 一连串的八度音。"],
      turn4status: ["<32>{#p/story}* 害羞塞壬的歌声\n  在实验室里回响。"],
      turn4statusX: ['<32>{#p/story}* 镁塔顿不敢落下一滴眼泪。'],
      turn5status: ['<32>{#p/story}* 镁塔顿展示了一个舞蹈动作。'], 
      turn6status: ['<32>{#p/story}* 放克音乐空前热烈。'],
      turn7status: ['<32>{#p/story}* 闻起来像疯人院。'],
      turn7statusX: ['<32>{#p/story}* 镁塔顿正在摆弄着\n  他的麦克风。'],
      turn8status: ['<32>{#p/story}* 镁塔顿引人注目地指着镜头。'],

      turn2react1: ['<20>{#p/mettaton}干得漂亮！'],
      turn3react1: ['<20>{#p/mettaton}非常好！'],
      turn4react1: ['<20>{#p/mettaton}太棒了！'],
      turn5react1: ['<20>{#p/mettaton}优秀！'],
      turn6react1: ['<20>{#p/mettaton}真让人\n“星”动！'],
      turn7react1: ["<20>{#p/mettaton}就是这样！"],
      turn8react1: ["<20>{#p/mettaton}SHOW 'EM HOW IT'S DONE!"],
      turn8reactMD1a: ['<20>{#p/basic}Well, that was a blast!', '<20>{#p/basic}See ya next time, human!'],
      turn8reactMD2a: ['<20>{#p/basic}...', '<20>{#p/basic}别再来了。'],

      turn2react2: ['<20>{#p/mettaton}啊哦...'],
      turn3react2: ['<20>{#p/mettaton}就差一点...'],
      turn4react2: ['<20>{#p/mettaton}真倒霉...'],
      turn5react2: ['<20>{#p/mettaton}真不幸...'],
      turn6react2: ['<20>{#p/mettaton}废物！'],
      turn7react2: ['<20>{#p/mettaton}真令人失望。'],
      turn8react2: ['<20>{#p/mettaton}那。是。啥。'],
      turn8reactMD1b: ["<20>{#p/basic}Hope I didn't go too hard on you.", '<20>{#p/basic}See ya next time, human!'],
      turn8reactMD2b: ['<20>{#p/basic}可悲。\n可悲！\n可-悲-！', '<20>{#p/basic}你活该。'],
      missIndicator: '漏击：$(x)',

      idleTalk1: () =>
         world.bad_lizard < 2 && !iFancyYourVilliany()
            ? [
               "<20>{#p/mettaton}SO WE'VE MADE IT TO THE END, EH?",
               "<20>{#p/mettaton}马上就能摇身一变，\n成为超级巨星，\n感想如何？"
            ]
            : [
               "<20>{#p/mettaton}SO WE'VE MADE IT TO THE END, EH?",
               "<20>{#p/mettaton}生命快走到头了，\n感想如何？"
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
      idleTalk5: ["<20>{#p/mettaton}（快让我转身。）"],
      idleTalk6: ['<20>{#p/mettaton}...'],
      flirtTalk1: () =>
         SAVE.data.b.flirt_mettaton
            ? [
               '<20>{#p/mettaton}BACK TO YOUR FLIRTATIOUS WAYS, EH...?',
               '<20>{#p/mettaton}YOU, MY FRIEND, ARE A TRUE MENACE TO SOCIETY.'
            ]
            : ['<20>{#p/mettaton}哦哦哦...', '<20>...', '<20>MAYBE YOU SHOULD HOLD OFF ON THAT FOR NOW.'],
      flirtTalk2: () =>
         SAVE.data.b.flirt_mettaton
            ? ["<20>{#p/mettaton}DON'T YOU EVER KNOW WHEN TO QUIT?"]
            : ['<20>{#p/mettaton}OR YOU COULD JUST KEEP GOING.'],
      flirtTalk3: () =>
         SAVE.data.b.flirt_mettaton ? ['<20>{#p/mettaton}I GUESS NOT.'] : ['<20>{#p/mettaton}AND GOING.'],
      flirtTalk4: ["<20>{#p/mettaton}...\nI FEEL LIKE THERE'S SOMETHING BETTER YOU COULD BE DOING."],
      flirtTalk5: ['<20>{#p/mettaton}...'],
      act_turn: ["<32>{#p/human}* （你告诉镁塔顿，\n  他后面有一面镜子。）"],
      turnTalk1: ['<20>{#p/mettaton}镜子？', '<20>哦对，这场压轴好戏，\n仪容仪表可不能差！'],
      turnTalk2: ["<20>{#p/mettaton}嗯... 在哪呢？\n我怎么没看见..."],
      turnTalk3: ['<20>{#p/mettaton}你是不是', '<20>动了', '<20>我的开关？'],
      turnTalk4: () =>
         world.bad_robot
            ? [
               '<18>{#p/mettaton}哦吼吼...',
               '<18>如果你对我的\n飒爽英姿期待已久，\n那么，就请好好欣赏...',
               '<18>这副前所未有的\n更快，更强，\n更轻的身躯。',
               "<18>我已经和身体\n融为一体。",
               "<19>真是遗憾啊，\n只有在现场直播中，\n观众才能将你的暴行\n尽收眼底。",
               "<19>不过没事。",
               '<18>就此一回，为了你，\n豁出去了...'
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
            ? ["<18>{*}...我们下播。"]
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
      name: () => (world.genocide ? '* 镁塔顿 NEO' : world.bad_robot ? '* 镁塔顿 SIGMA' : '* 镁塔顿 EX'),
      spannerReaction: (repeat: boolean) =>
         world.genocide
            ? ['<32>{#p/human}* （你把扳手扔了出去。）\n* （镁塔顿直接将它炸成了碎片。）']
            : world.bad_robot
               ? [
                  '<32>{#p/human}* （你把扳手扔了出去。）\n* （镁塔顿接住扳手，\n  朝你的头砸了过去。）',
                  "<32>{#p/basic}* 疼死了！"
               ]
               : repeat
                  ? iFancyYourVilliany()
                     ? [
                        '<32>{#p/human}* （你把扳手扔了出去。）\n* （镁塔顿又热情地踢了回来。）',
                        '<32>{#p/basic}* 观众开始打哈欠了...'
                     ]
                     : [
                        '<32>{#p/human}* （你把扳手扔了出去。）\n* （镁塔顿用嘴接住，叼了回来。）',
                        '<32>{#p/basic}* 观众开始打哈欠了...'
                     ]
                  : iFancyYourVilliany()
                     ? [
                        '<32>{#p/human}* （你把扳手扔了出去。）\n* （镁塔顿又热情地踢了回来。）',
                        '<32>{#p/basic}* 观众沸腾了！'
                     ]
                     : [
                        '<32>{#p/human}* （你把扳手扔了出去。）\n* （镁塔顿用嘴接住，叼了回来。）',
                        '<32>{#p/basic}* 观众沸腾了！'
                     ],
      old_gun_text: () =>
         world.genocide || world.bad_robot
            ? ['<32>{#p/human}* （你开了一枪。）\n* （什么都没发生。）']
            : ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 观众都吓坏了！'],
      old_bomb_text: () =>
         world.genocide || world.bad_robot
            ? ['<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）\n* （除此之外，什么都没发生。）']
            : [
               '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
               '<32>{#p/basic}* 观众纷纷做起了白日梦！'
            ],
      old_spray_text: () =>
         world.genocide || world.bad_robot
            ? ['<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）\n* （什么都没发生。）']
            : ['<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）', '<32>{#p/basic}* 观众乱作一团。'],
      act_check: () =>
         world.genocide
            ? ["<32>{#p/asriel2}* 镁塔顿。\n* 发什么呆？快去攻击他啊！"]
            : world.bad_robot
               ? [
                  '<33>{#p/story}* 镁塔顿 SIGMA - 攻击255 防御42\n* 一台超频过载的杀人机器。\n  攻击力大幅提升，但也付出了代价。'
               ]
               : ['<32>{#p/story}* 镁塔顿 EX - 攻击47 防御47\n* 弱点是心形核心。'],
      act_cut1: ['<32>{#p/human}* （你把剪刀搭到了电线上...）'],
      act_cut2: ['<32>{#p/human}* （你继续剪电线...）'],
      act_cut3: ['<32>{#p/human}* （可是电线已经全都剪断了。）'],
      tvmReaction: {
         blookpie: () =>
            world.genocide || world.bad_robot
               ? [
                  '<32>{#p/basic}* 这块点心使镁塔顿想起\n  某个需要他去守护的人...',
                  "<32>{#p/story}* 镁塔顿的攻击力提升了！\n* 镁塔顿的防御力提升了！"
               ]
               : [
                  SAVE.data.b.a_state_hapstablook
                     ? '<32>{#p/basic}* 这块点心使镁塔顿想起\n  一位重要的亲人...'
                     : '<32>{#p/basic}* 这块点心使镁塔顿想起\n  某个熟悉的人...',
                  "<32>{#p/story}* 镁塔顿的攻击力下降了！\n* 镁塔顿的防御力下降了！"
               ],
         radio: () =>
            world.bad_robot
               ? [
                  '<32>{#p/human}* （你把收音机递给了镁塔顿。）\n* （他放起了死亡重金属音乐，\n  并朝你大吼大叫。）'
               ]
               : iFancyYourVilliany()
                  ? [
                     '<32>{#p/human}* （你把收音机递给了镁塔顿。）\n* （他放了一段交响乐，\n  以此振奋士气。）'
                  ]
                  : [
                     '<32>{#p/human}* （你把收音机递给了镁塔顿。）\n* （他来了一首卡拉OK，\n  观众也跟着一起唱了起来。）'
                  ],
         fireworks: () =>
            world.bad_robot
               ? [
                  '<32>{#p/human}* （你把烟花递给了镁塔顿。）\n* （他把烟花绑到火箭发射器上，\n  随即引燃火箭。）'
               ]
               : iFancyYourVilliany()
                  ? [
                     '<32>{#p/human}* （你把烟花递给了镁塔顿。）\n* （他将烟花融入到攻击中，\n  制造戏剧效果。）'
                  ]
                  : [
                     '<32>{#p/human}* （你把烟花递给了镁塔顿。）\n* （他点燃了烟花，观众都惊叹不已。）'
                  ],
         mewmew: () =>
            world.bad_robot
               ? [
                  '<32>{#p/human}* （你把玩偶递给了镁塔顿。）\n* （他把玩偶撕成碎片，\n  表演了一手“天女散花”。）'
               ]
               : iFancyYourVilliany()
                  ? [
                     "<32>{#p/human}* （你把玩偶递给了镁塔顿。）\n* （他不知道拿玩偶怎么办，\n  最后丢掉了。）"
                  ]
                  : [
                     '<32>{#p/human}* （你把玩偶递给了镁塔顿。）\n* （他从容地展示给观众，\n  观众都被迷住了。）'
                  ]
      },
      act_boast: [
         "<32>{#p/human}* （你说自己下个回合能无伤。）",
         "<32>{#p/basic}* 镁塔顿的人气\n  将在下一回合持续上升！"
      ],
      act_heel: [
         '<32>{#p/human}* （你性情大变，嘲笑观众。）',
         "<32>{#p/basic}* 观众希望你这回合死得很惨！"
      ],
      act_pose0: () =>
         iFancyYourVilliany()
            ? [
               ['<32>{#p/human}* （你摆出攻势，杀意满满。）', '<32>{#p/basic}* 观众已经看腻歪了。'],
               ['<32>{#p/human}* （你摆出攻势，杀意满满。）', '<32>{#p/basic}* 观众似乎很生气。']
            ]
            : [
               ['<32>{#p/human}* （你摆出夸张的姿势。）', '<32>{#p/basic}* 观众已经看腻歪了。'],
               ['<32>{#p/human}* （你摆出夸张的姿势。）', '<32>{#p/basic}* 观众似乎很生气。']
            ],
      act_pose1: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你摆出攻势，杀意满满。）',
               '<32>{#p/basic}* 你的动作超有范儿，\n  观众都被迷住了！'
            ]
            : ['<32>{#p/human}* （你摆出夸张的姿势。）', '<32>{#p/basic}* 观众赞许地点点头。'],
      act_pose2: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你摆出攻势，杀意满满。）',
               "<32>{#p/basic}* 观众觉得你的动作力道不够，\n  兴趣不高。"
            ]
            : ['<32>{#p/human}* （你摆出夸张的姿势。）', '<32>{#p/basic}* 观众为你热烈鼓掌。'],
      act_pose3: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你摆出攻势，杀意满满。）',
               '<32>{#p/basic}* 你的样子简直弱不禁风，\n  观众都翻白眼了...'
            ]
            : [
               '<32>{#p/human}* （尽管受了重伤，\n  你还是尽力摆出漂亮的姿势。）',
               '<32>{#p/basic}* 观众都为你欢呼。'
            ],
      act_pose4: () =>
         iFancyYourVilliany()
            ? ['<32>{#p/human}* （你摆出攻势，杀意满满。）', '<32>{#p/basic}* 观众被你的... 愚蠢震撼到了？']
            : [
               '<32>{#p/human}* （你用尽最后的力气，摆出了漂亮的姿势。）',
               '<32>{#p/basic}* 观众全都惊呼起来。'
            ],
      act_scream0: [
         [
            '<32>{#p/human}* （你大声尖叫。）',
            "<32>{#p/basic}* 观众有点厌倦了。\n* 本回合，你的移速减慢。"
         ],
         [
            '<32>{#p/human}* （你大声尖叫。）',
            "<32>{#p/basic}* 观众有些厌烦了。\n* 本回合，你的移速减慢。"
         ]
      ],
      act_scream: [
         '<32>{#p/human}* （你大声尖叫。）',
         "<32>{#p/basic}* 观众也跟着兴奋起来！\n* 本回合，你的移速减慢。"
      ],
      act_flirt0: [
         ['<32>{#p/human}* （你向观众调情。）', '<32>{#p/basic}* 观众有点厌倦了...'],
         ['<32>{#p/human}* （你向观众调情。）', '<32>{#p/basic}* 观众有些厌烦了...']
      ],
      act_flirt1: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你向观众调情。）',
               '<32>{#p/basic}* 观众没想到你会这么做，\n  全都大吃一惊！'
            ]
            : ['<32>{#p/human}* （你向观众调情。）', '<32>{#p/basic}* 观众一时半会还接受不了...'],
      act_flirt2: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你向观众调情。）',
               '<32>{#p/basic}* 又一次调情！\n* 观众陷入了疯狂！'
            ]
            : ['<32>{#p/human}* （你向观众调情。）', '<32>{#p/basic}* 观众开始朝你这边看了。'],
      act_flirt3: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你向观众调情。）',
               '<32>{#p/basic}* 观众开始对这些甜言蜜语\n  感到恶心了...'
            ]
            : ['<32>{#p/human}* （你向观众调情。）', '<32>{#p/basic}* 这次，你成功吸引了观众的目光！'],
      act_flirt4: () =>
         iFancyYourVilliany()
            ? [
               '<32>{#p/human}* （你向观众调情。）',
               "<32>{#p/basic}* 观众愈发感到困惑。"
            ]
            : ['<32>{#p/human}* （你向观众调情。）', '<32>{#p/basic}* 观众被你深深折服！'],
      status1: (azzy_neo: number) =>
         [
            [
               "<33>{#p/asriel2}* 我会尝试用一道法术\n  突破他的护甲。\n* 接住那些黄色的符文！"
            ],
            ['<32>{#p/asriel2}* 再来一次。']
         ][Math.min(azzy_neo, 1)],
      statusX: (hint = false) =>
         world.genocide
            ? ["<32>{#p/asriel2}* 我们迟早会赢的。"]
            : world.bad_robot
               ? hint
                  ? ["<32>{#p/story}* Seems fighting won't get you any further here."]
                  : ['<32>{#p/story}* 电流贯穿了整个房间。']
               : ['<32>{#p/story}* 镁塔顿。'],
      statusY: ["<32>{#p/story}* 高压电极速回流，化作旋风！"],
      turnTalk1: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}真是抱歉啊，亲。\n但我要是不把你\n千刀万剐...",
               "<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/3}我就会马上爆炸！"
            ]
            : ['<20>{#p/mettaton}灯光！\n镜头！\n开拍！'],
      turnTalk2: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...鱼死网破，\n倘若“余”不死，\n休想“破”我网。",
               '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...呵。\n还挺有诗意的。'
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}Ghosts!\nDummies!\n... snails?']
               : !world.badder_lizard
                  ? ['<20>{#p/mettaton}Drama!\nRomance!\nBloodshed!']
                  : ['<20>{#p/mettaton}Karma!\nVengeance!\nPayback!'],
      turnTalk3: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/24}{#a.la/3}{#a.ra/0}别人会轻言放弃，\n但我可不会愿赌服输。"]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}It's an emotional rollercoaster!"]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}It's time to put you in your place!"]
                  : !world.badder_lizard
                     ? ["<20>{#p/mettaton}I'm the idol everyone craves!"]
                     : ["<20>{#p/mettaton}I'll be the galaxy's superstar!"],
      turnTalk4: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}只有这样，\n我才能脱颖而出。"]
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
               "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/9}{#a.ra/10}现在，就让我亲手\n把那腐烂的心肠\n从你身体扯出！"
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
               '<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}什么？\n那又冷又硬的东西，\n还配叫“心”？',
               '<20>{#p/mettaton}{#e/mettaton/30}{#a.la/9}{#a.ra/10}...呵。\n给你瞧瞧，\n什么才是真正的“心”。'
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
            ? ["<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}尽情垂死挣扎吧..."]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}It's not like I never loved the old life."]
               : iFancyYourVilliany()
                  ? ['<20>{#p/mettaton}You may be a demon, but can you dance like the devil?']
                  : !world.badder_lizard
                     ? ['<20>{#p/mettaton}Introducing... the double DJ disco!']
                     : ["<20>{#p/mettaton}The battle's only just begun!"],
      turnTalk8: () =>
         world.bad_robot
            ? ['<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}迟早，\n你将败在我的手下。']
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}But it wasn't exactly glamorous, either..."]
               : iFancyYourVilliany()
                  ? ["<20>{#p/mettaton}It's time to bring your a-game!"]
                  : !world.badder_lizard
                     ? ['<20>{#p/mettaton}Can you keep up the pace?']
                     : ['<20>{#p/mettaton}Turn it up to eleven!'],
      turnTalk9: () =>
         world.bad_robot
            ? ['<20>{#p/mettaton}{#e/mettaton/9}{#a.la/0}{#a.ra/5}那时，\n我族就能重见天日。']
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}Whatever, Who cares!']
               : !world.badder_lizard
                  ? ['<20>{#p/mettaton}Lights!\nCamera!\nPlastic explosives!']
                  : ['<20>{#p/mettaton}Destruction!\nAnnihilation!\nArmageddon!'],
      turnTalk10: () =>
         world.bad_robot
            ? ["<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/7}...而我，就是帮他们\n摆脱桎梏的英雄！"]
            : SAVE.data.b.a_state_hapstablook
               ? ["<20>{#p/mettaton}Nobody, that's who!"]
               : !world.badder_lizard
                  ? ['<20>{#p/mettaton}Things are blowing up!']
                  : ['<20>{#p/mettaton}Things are getting crazy!'],
      turnTalk11: () =>
         world.bad_robot
            ? [
               "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}真是遗憾，我身边的人，\n只要遇到点困难\n全就躲得老远。",
               '<20>{#e/mettaton/12}{#a.la/8}{#a.ra/8}艾菲斯，艾斯戈尔，\n还有那堆表亲，\n全是一个熊样。'
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
               "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}而我呢？\n我可不搞他们\n卿卿我我那一套。",
               '<20>{#p/mettaton}{#e/mettaton/23}{#a.la/1}{#a.ra/6}而是切中要害\n直入核心！'
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
               '<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}...切。',
               "<20>{#e/mettaton/25}{#a.la/8}{#a.ra/8}你还不知道\n自己就是个招人烦的\n烂虫子吗？"
            ]
            : SAVE.data.b.a_state_hapstablook
               ? ['<20>{#p/mettaton}A... and besides, how can I even trust them now?']
               : SAVE.data.b.a_state_armwrecker
                  ? ['<20>{#p/mettaton}A... arms?\nWh... who needs arms with legs like these?']
                  : ["<20>{#p/mettaton}I... is that all you've got?"],
      turnTalk14: () =>
         world.bad_robot
            ? [
               '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}但你知道，\n大家对于你这种虫豸\n是什么态度，对吧？',
               "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/9}{#a.ra/10}就是一个\n亟待解决的祸患而已。"
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
               "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/10}{#a.ra/0}说实话，\n我挺佩服你这股\n负隅顽抗的劲。",
               '<20>{#p/mettaton}{#e/mettaton/19}{#a.la/0}{#a.ra/10}不过，\n给你个温馨提示...',
               "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}你去打力场，\n都比在这对付我\n来得实在。"
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
               "<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/0}怎么了？\n听我说话耳根子难受？",
               '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...哼。\n真可惜啊，亲！'
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
               '<20>{#p/mettaton}{#e/mettaton/14}{#a.la/3}{#a.ra/0}果然。\n有的人就是不知悔改...',
               "<20>{#e/mettaton/13}{#a.la/8}{#a.ra/8}不过\n我也懒得跟你废话了。",
               "<20>{#e/mettaton/7}{#a.la/9}{#a.ra/10}从现在开始，\n我会用心干掉你！"
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
      turnTalkX1a: ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...？'],
      turnTalkX1b: [
         '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/0}{#a.ra/0}...果然。',
         "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}你以为没有这些电线\n我就完了，是不是？",
         '<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/10}哎呀，您可真笨...\n蠢得不能再蠢的小崽子。',
         "<20>{#p/mettaton}{#e/mettaton/23}{#a.la/10}{#a.ra/0}大错特错。",
         "<20>{#p/mettaton}{#e/mettaton/24}{#a.la/2}{#a.ra/3}这段时间，我已经把\n整个核心的力量\n全吸了过来...",
         "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}这么多的能量，\n可不能白白浪费了。"
      ],
      turnTalkX1c: ["<20>{*}{#p/mettaton}{#e/mettaton/27}{#a.la/8}{#a.ra/8}就让我瞧瞧\n你现在还有什么能耐？"],
      turnTalkX2: [
         '<20>{#p/mettaton}{#e/mettaton/26}...呃啊...',
         '<20>{#e/mettaton/25}你赢了。',
         '<20>{#e/mettaton/19}看来，我...\n又低估你了。',
         "<20>{#e/mettaton/13}不过，没关系。",
         '<20>{#e/mettaton/14}一定，一定有其他人...\n在某处...',
         "<20>{#e/mettaton/19}等待着你，\n等待着彻底终结\n这场闹剧。",
         '<20>{#e/mettaton/9}到那时...',
         "<20>{#e/mettaton/10}自由..." 
      ],
      turnTalkX3: [
         '<20>{#p/mettaton}{#e/mettaton/26}...难以置信...',
         "<20>{#e/mettaton/25}我都来不及使上全力。",
         "<20>{#e/mettaton/10}不过...\n也许这样反而更好。",
         '<20>{#e/mettaton/9}...\n毕竟...',
         '<20>{#e/mettaton/18}假如我们真的\n已经毫无希望...',
         "<20>{#e/mettaton/10}那还不如就此\n放弃抵抗。",
         '<20>{#e/mettaton/9}...',
         '<20>{#e/mettaton/9}唉...'
      ],
      audienceRec1: () => [
         '<21>{#p/event}铃铃，铃铃...',
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
         "<20>{*}{#p/mettaton}你变{@fill=#ff993d}橙{@fill=#000}了。{^30}{%}",
         "<20>{*}{#e/mettaton/4}这就是我的攻击。{^30}{%}",
         "<20>{*}{#e/mettaton/12}...嘿，临死之前，\n何不找点乐子呢？{^30}{%}",
         '<20>{*}{#e/mettaton/0}配合一下，\n按[Z]释放冲击波。{^30}{%}',
         '<20>{*}{#e/mettaton/0}不过要小心...{^30}{%}',
         "<20>{*}{#e/mettaton/0}不停释放冲击波的话，\n你就会走不动。{^30}{%}",
         '<20>{*}{#e/mettaton/12}不废话了。{^30}{%}',
         "<20>{*}{#e/mettaton/4}现在，\n送你们下地狱吧。{^30}{%}"
      ],
      mettahero1: [
         '<20>{#p/mettaton}{#e/mettaton/6}...',
         "<20>{#e/mettaton/9}看-看来...\n和新身体融合，\n就是这般下场。",
         "<20>{#e/mettaton/11}再也没有人...",
         '<20>{#e/mettaton/7}...能拦住你们了...'
      ],
      mettahero2: ['<20>{#e/mettaton/7}...', '<20>{#e/mettaton/10}永别了...\n...\n...亲。'],
      napstahero1: ['<20>{#p/finalghost}{~}...', '<20>{~}镁塔顿...'],
      napstahero2: [
         '<20>{#p/finalghost}{~}你们这群杀人魔...',
         '<20>{~}...',
         '<20>{~}我等候多时，\n就为了亲手结果你们。',
         '<20>{~}现在，\n终于可以付诸实行了。',
         '<20>{~}你们不会魔法，\n伤不了我，\n注定要止步于此。',
         '<20>{|}{~}给我去- {%}'
      ],
      napstahero3: () =>
         [
            [
               "<20>{#p/asriel2}真当我傻？\n我的魔法是不强，\n但也没差到那种地步。",
               '<20>{#x1}别来烦我了...'
            ],
            ['<20>{#p/asriel2}...']
         ][Math.min(SAVE.flag.n.ga_asrielNapstakill++, 1)],
      qq: () =>
         SAVE.data.b.a_state_hapstablook
            ? '你愿意原谅某个幽灵吗？'
            : !world.badder_lizard
               ? '你会亲幽灵吗？'
               : '你会揍幽灵吗？',
      qa: () =>
         SAVE.data.b.a_state_hapstablook
            ? ["我原谅你", "不会原谅", '抱抱就好啦！', '放下过去吧。']
            : !world.badder_lizard
               ? ['没问题', '必须的', '那当然！', '现在就\n亲一个']
               : ['我会', '我当然会', '我肯定会', '我必须会'],
      q0: () =>
         SAVE.data.b.a_state_hapstablook
            ? ["<20>{#p/mettaton}时间到。{^40}{%}"]
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
      hitIndicator: '破甲：$(x)次',
      shieldIndicator: '护甲：$(x)%',
      ratings: {
         pose1: () => (iFancyYourVilliany() ? '有两下子' : '精彩'),
         pose2: () => (iFancyYourVilliany() ? '一般般' : '小心点'),
         pose3: () => (iFancyYourVilliany() ? '笑死' : '危险啊'),
         pose4: () => (iFancyYourVilliany() ? '您可真棒呢' : '别出人命了'),
         flirt1: () => (iFancyYourVilliany() ? '超级反转' : '萌萌哒'),
         flirt2: () => (iFancyYourVilliany() ? '疯狂加码' : '好可爱'),
         flirt3: () => (iFancyYourVilliany() ? '三倍奉还' : '好浪漫'),
         flirt4: () => (iFancyYourVilliany() ? '撩得飞起' : '真迷人'),
         boast1: '白吹牛了',
         boast2: '真尴尬',
         boast3: '有两下子',
         heel1: '正义执行',
         heel2: '使劲揍',
         heel3: '惩罚呢？',
         hurt: '痛快',
         crit: '打得准',
         dead: '一击致命',
         bomb: '炸裂',
         scream: '激情满满',
         hopbox: '整得行',
         hearthurt: '会心一击',
         item: {
            artifact: '没意思',
            old_gun: '震撼人心',
            old_bomb: '迷糊了',
            old_spray: '味道不错',
            tvm_radio: '好听',
            tvm_fireworks: '璀璨夺目',
            tvm_mewmew: '这都敢放？',
            spanner: '优雅',
            armor: '蛮时髦',
            weapon: '有想法',
            repeat: '看过了',
            repeat_x: '看腻歪了',
            pain: '看着都疼',
            blookpie: '熟悉的味道'
         },
         smooch: '回答正确',
         nosmooch: '回答错误'
      }
   },

   b_opponent_madjick: {
      name: '* 谜宇人',
      spanner: ['<32>{#p/human}* （你挥舞着扳手。）\n* （谜宇人并没有把它\n  误认为是魔杖。）'],
      epiphaNOPE: ['<20>{#p/basic}{~}那种魔法...', '<20>{#p/basic}{~}...我不会\n向它的力量屈服！'],
      hint: ['<33>{#p/basic}* 慢着。\n* 我觉得我有办法。'],
      assistTalk1: ['<20>{#p/basic}{~}呃...'],
      artifact_text: ['<32>{#p/basic}* 谜宇人认出来了神器，\n  并认为你值得它的尊敬！'],
      artifactTalk: [
         '<20>{#p/basic}{~}真的假的？\n那是王室的吊坠？',
         '<20>{#p/basic}{~}我不该再妨碍你了！'
      ],
      assistAction: [
         '<32>{*}{#p/basic}* 古老的世界。{^5}\n  魔法的世界。{^25}{%}',
         '<32>{*}{#p/basic}* 无论多么暗无天日，\n  我们都要向阳而生...{^60}{%}',
         '<32>{*}{#p/basic}* 并铭记一切。{^40}{%}'
      ],
      assistTalk2: ['<20>{#p/basic}{~}记忆中的世界！', '<20>{#p/basic}{~}你知道这魔咒！'],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 谜宇人被击倒了！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 谜宇人被击倒了！'
      ],
      old_spray_text: ['<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）', '<32>{#p/basic}* 谜宇人被击倒了！'],
      status1: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* 糟糕。'] : ['<32>{#p/story}* 谜宇人在刹那间突然现身！'],
      act_check: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 谜宇人就是一个你所说的\n  “传统”意义上的魔法师。\n* 它的力量源自于它的魔球...']
            : ['<32>{#p/story}* 谜宇人 - 攻击29 防御24\n* 这个高深莫测的特战队成员\n  总念着魔咒。'],
      act_check2: ['<32>{#p/story}* 谜宇人 - 攻击29 防御24\n* 智障。'],
      act_check3: ['<32>{#p/story}* 谜宇人 - 攻击29 防御24\n* 一个魔法师，但他没花招了...'],
      act_check4: ['<32>{#p/story}* 谜宇人 - 攻击29 防御24\n* 再没有魔咒能帮到\n  这位老魔法师了。'],
      act_check5: [
         '<32>{#p/story}* 谜宇人 - 攻击29 防御24\n* 爱的力量比最古老的魔法还要强大。'
      ],
      idleStatus1: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* 这是谜宇人。"] : ['<32>{#p/story}* 谜宇人跳着不可思议的舞蹈。'],
      idleStatus2: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这是谜宇人。"]
            : ['<32>{#p/story}* 谜宇人气势汹汹地卖弄着它的魔球。'],
      idleStatus3: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这是谜宇人。"]
            : ['<32>{#p/story}* 谜宇人嘀咕着艰深晦涩的脏话。'],
      idleStatus4: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这是谜宇人。"]
            : ['<32>{#p/story}* 谜宇人以火眼金睛凝视着你。'],
      idleStatus5: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* 这是谜宇人。"] : ['<32>{#p/story}* ...魔法的味道扑面而来。'],
      idleTalk1: ['<20>{#p/basic}{~}急急如律令。'],
      idleTalk2: ['<20>{#p/basic}{~}变变变！！'],
      idleTalk3: ['<20>{#p/basic}{~}神明啊，显灵吧。'],
      idleTalk4: ['<20>{#p/basic}{~}嘛咪嘛咪哄。'],
      idleTalk5: ['<21>{#p/basic}{~}请，谢谢。'],
      danceText1: ['<32>{#p/human}* （你选择跳舞。）', "<32>{#p/basic}* 谜宇人的牵引魔球\n  离你越来越近..."],
      danceTalk1: ['<20>{#p/basic}{~}Magnum gravitas!!'],
      danceStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 那个魔球停息了...']
            : ["<32>{#p/story}* 谜宇人的牵引魔球\n  弱化了它的引力。"],
      danceText2: () => [
         '<32>{#p/human}* （你选择跳舞。）',
         "<32>{#p/basic}* 谜宇人的惊雷魔球开始充能...",
         ...(!world.badder_lizard ? ["<32>{#p/alphys}* 对，就是这样！\n* 你-你快要成功了！"] : [])
      ],
      danceTalk2: ['<20>{#p/basic}{~}Vulu voltika!'],
      danceTalk3: ["<20>{#p/basic}{~}我受够了！！！"],
      danceStatus2: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 太好了！！！\n* 魔球都耗尽能量了！']
            : ["<32>{#p/story}* 谜宇人的惊雷魔球\n  穷尽了它的能量。"],
      danceText3: ['<32>{#p/human}* （你选择跳舞。）\n* （没发生什么变化。）'],
      danceText4: [
         '<32>{#p/human}* （你选择跳舞。）',
         "<32>{#p/basic}* 谜宇人百思不得其解，\n  再也忍不下去了！"
      ],
      danceIdleTalk1: ['<20>{#p/basic}{~}难过了...'],
      danceIdleTalk2: ['<20>{#p/basic}{~}落败了...'],
      danceIdleTalk3: ['<20>{#p/basic}{~}失利了...'],
      danceStatus3: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 你现在大概可以饶恕它了。']
            : ['<32>{#p/story}* 谜宇人无计可施。'],
      playdeadText1: () => [
         '<32>{#p/human}* （你选择装死。）',
         "<32>{#p/basic}* 谜宇人的两个魔球都变得\n  不大对劲...",
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 搞什么...？'] : [])
      ],
      playdeadTalk: ['<20>{#p/basic}{~}\x00*困惑地吟唱*'],
      playdeadStatus: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 我想，这起作用了...？']
            : ["<32>{#p/story}* 谜宇人的魔球不知道该怎么办。"],
      playdeadIdleTalk1: ['<20>{#p/basic}{~}实在灰心丧气。'],
      playdeadIdleTalk2: ['<20>{#p/basic}{~}彻底心烦意乱。'],
      playdeadIdleTalk3: ['<20>{#p/basic}{~}完全乱成一团。'],
      playdeadText2: ['<32>{#p/human}* （你选择装死。）\n* （没发生什么变化。）'],
      flirtText0: () => [
         '<32>{#p/human}* （你向谜宇人调情。）\n* （没什么效果。）',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 嗯，祝你好运...'] : [])
      ],
      flirtText1: () => [
         '<32>{#p/human}* （你运用自身经验，\n  念了一句调情的咒语。）',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 啊...？'] : [])
      ],
      flirtTalk1: ['<20>{#p/basic}{~}啊！\n一位巫师同伴！'],
      flirtStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 我的老天。\n* 再来一次！！！']
            : ['<32>{#p/story}* 谜宇人如同乘坐着爱之列车。'],
      flirtText2: () => [
         '<32>{#p/human}* （你运用自身经验，\n  背了一段浪漫的铭文。）',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 效果越来越好了。'] : [])
      ],
      flirtTalk2: ["<20>{#p/basic}{~}啊！\n这感觉真奇妙！"],
      flirtStatus2: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 哇... 我想就这样吧。"]
            : ['<32>{#p/story}* 谜宇人欣喜若狂。'],
      flirtText3: () => [
         '<32>{#p/human}* （你选择调情。）\n* （没发生什么变化。）',
         ...(!world.badder_lizard ? ["<32>{#p/alphys}* 啐，别太得寸进尺。"] : [])
      ],
      flirtIdleTalk1: ['<20>{#p/basic}{~}多么可爱...'],
      flirtIdleTalk2: ['<20>{#p/basic}{~}多么迷人...'],
      flirtIdleTalk3: ['<20>{#p/basic}{~}多么体贴...'],
      perilStatus: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* 它不剩多少HP了...'] : ['<32>{#p/story}* 谜宇人坚持着。']
   },

   b_opponent_knightknight: {
      name: '* 特雷莉亚',
      epiphaNOPE: ['<20>{#p/basic}{~}...这魔法... 是个禁忌...'],
      hint: ['<32>{#p/basic}* 等下...\n* 让我来试试看。'],
      assistTalk1: ['<20>{#p/basic}{~}...\n...\n...\n哼？'],
      assistAction: [
         '<32>{*}{#p/human}* （...）{^30}{%}',
         '<32>{*}{#p/human}* （一首古老的歌谣\n  在房间里回响起来。）{^100}{%}'
      ],
      assistTalk2: [
         '<20>{#p/basic}{~}与我们阔别的世界中的\n一首老歌...',
         '<20>{#p/basic}{~}想必宇宙中也\n仍然存在着美好吧。'
      ],
      artifact_text: ['<32>{#p/basic}* 特雷莉亚认出来了神器，\n  并认为你值得她的信任！'],
      artifactTalk: [
         '<20>{#p/basic}{~}与我们阔别的世界中的\n一件神器...',
         '<20>{#p/basic}{~}想必它的传奇\n会在你心中永存。'
      ],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 特雷莉亚被击倒了！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 特雷莉亚被击倒了！'
      ],
      old_spray_text: [
         '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
         '<32>{#p/basic}* 特雷莉亚被击倒了！'
      ],
      status1: () =>
         !world.badder_lizard
            ? SAVE.data.b.assist_madjick
               ? ['<32>{#p/alphys}* 你还能再用上次那招么？']
               : ['<32>{#p/alphys}* 又来了。']
            : ['<32>{#p/story}* 特雷莉亚挡住了去路！'],
      act_check: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 特雷莉亚是个权杖使用者，\n  她十分热爱我们的故园。"]
            : [
               '<32>{#p/story}* 特雷莉亚 - 攻击36 防御36\n* 这个高大挺拔的特战队成员\n  使用着行星法杖。'
            ],
      act_check2: ['<32>{#p/story}* 特雷莉亚 - 攻击36 防御36\n* 这世界正在分崩离析。'],
      act_check3: ["<32>{#p/story}* 特雷莉亚 - 攻击36 防御36\n* 事情变得没那么糟糕了。"],
      act_check4: ['<32>{#p/story}* 特雷莉亚 - 攻击36 防御36\n* 大地在她那双破旧的靴子下颤抖。'],
      act_check5: ['<32>{#p/story}* 特雷莉亚 - 攻击36 防御36\n* 她的注意力被偷走了，\n  世间一切如同消失。'],
      idleStatus1: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这是特雷莉亚。"]
            : ['<32>{#p/story}* 特雷莉亚紧紧握着她的法杖。'],
      idleStatus2: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* 这是特雷莉亚。"] : ['<32>{#p/story}* 特雷莉亚深吸了一口气。'],
      idleStatus3: () =>
         !world.badder_lizard ? ["<32>{#p/alphys}* 这是特雷莉亚。"] : ['<32>{#p/story}* 特雷莉亚静静地看着你。'],
      idleStatus4: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这是特雷莉亚。"]
            : ["<32>{#p/story}* 特雷莉亚的盔甲\n  发出了微弱的黄光。"],
      idleStatus5: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这是特雷莉亚。"]
            : ['<32>{#p/story}* 被忘却之遗物的味道\n  扑面而来。'],
      idleTalk1: ['<20>{#p/basic}{~}好梦骑程。'],
      idleTalk2: ['<20>{#p/basic}{~}慢走。'],
      idleTalk3: ['<20>{#p/basic}{~}回见。'],
      idleTalk4: ['<20>{#p/basic}{~}闭上眼睛...'],
      idleTalk5: ['<20>{#p/basic}{~}再会。'],
      comfortText1: () => [
         '<32>{#p/human}* （你走近特雷莉亚并抚摸她，\n  告诉她一切都会好起来的。）',
         ...(!world.badder_lizard ? ["<32>{#p/alphys}* 这... 呃..."] : [])
      ],
      comfortTalk1: ['<20>{#p/basic}{~}...\n...\n...\n真的吗？'],
      comfortStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 她在... 哭吗？']
            : ["<32>{#p/story}* 特雷莉亚的立场动摇了。"],
      comfortText2: () => [
         '<32>{#p/human}* （你拥抱特雷莉亚，提醒她宇宙中\n  仍然存在着美好。）',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 唔...'] : [])
      ],
      comfortTalk2: ['<20>{#p/basic}{~}...\n...\n谢谢你...'],
      comfortStatus2: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 这一幕... 真令人开心。"]
            : ['<32>{#p/story}* 特雷莉亚找到了\n  新的生活目标。'],
      comfortTalk3: ['<20>{#p/basic}{~}...\n...\n好...'],
      comfortText3: ['<32>{#p/human}* （你安抚了特雷莉亚。）\n* （没发生什么变化。）'],
      comfortText4: [
         '<32>{#p/human}* （你安抚了特雷莉亚。）',
         '<32>{#p/basic}* 特雷莉亚放下了她的法杖，\n  并接受了你的和平提议。'
      ],
      comfortIdleTalk1: ['<20>{#p/basic}{~}赏钱拿好。'],
      comfortIdleTalk2: ['<20>{#p/basic}{~}感激不尽。'],
      comfortIdleTalk3: ['<20>{#p/basic}{~}多谢了。'],
      comfortStatus3: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 我想你可以饶恕她了...']
            : ['<32>{#p/story}* 特雷莉亚平静下来了。'],
      flashText1: () => [
         '<32>{#p/human}* （你使你的手机屏幕发出闪光。）',
         '<32>{#p/basic}* 特雷莉亚惊慌失措！',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 你在干什么！？'] : [])
      ],
      flashTalk: ['<20>{#p/basic}{~}\x00*无声的恐慌*'],
      flashStatus: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 她-她瞎了！"]
            : ['<32>{#p/story}* 特雷莉亚因为这场战斗\n  失去了视觉。'],
      flashIdleTalk1: ['<20>{#p/basic}{~}丧失了视觉...'],
      flashIdleTalk2: ["<20>{#p/basic}{~}我看不见你..."],
      flashIdleTalk3: ['<20>{#p/basic}{~}你在哪里...'],
      flashText2a: [
         '<32>{#p/human}* （你使你的手机屏幕发出闪光。）\n* （特雷莉亚正忙着做关于你的白日梦，\n  没注意到。）'
      ],
      flashText2b: ['<32>{#p/human}* （你使你的手机屏幕发出闪光。）\n* （特雷莉亚放松了自我，\n  没注意到。）'],
      flashText2c: ['<32>{#p/human}* （你使你的手机屏幕发出闪光。）\n* （没发生什么变化。）'],
      flirtText0: () => [
         '<32>{#p/human}* （你向特雷莉亚调情。）\n* (没什么效果。)',
         ...(!world.badder_lizard
            ? ['<32>{#p/alphys}* 是啊，特战队训练有素，\n  能防止被迷惑。']
            : [])
      ],
      flirtText1: () => [
         '<32>{#p/human}* （你运用自身经验，\n  讲了句简单而自信的恭维话。）',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 呃...'] : [])
      ],
      flirtTalk1: ['<20>{#p/basic}{~}真令人高兴...'],
      flirtStatus1: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 你得想办法让这起作用..."]
            : ['<32>{#p/story}* 特雷莉亚开始喜欢上你了。'],
      flirtText2: () => [
         "<32>{#p/human}* （你运用自身经验，\n  久久凝视着特雷莉亚的双眼。）",
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 噢噢噢好啊。'] : [])
      ],
      flirtTalk2: ['<20>{#p/basic}{~}那将是多么美好...'],
      flirtStatus2: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* 好-好啊。\n* 这...了不得。']
            : ['<32>{#p/story}* 特雷莉亚情意绵绵。'],
      flirtText3: () => [
         '<32>{#p/human}* （你选择调情。）\n* （没发生什么变化。）',
         ...(!world.badder_lizard ? ['<32>{#p/alphys}* 你疯了吧。'] : [])
      ],
      flirtIdleTalk1: ['<20>{#p/basic}{~}好惊喜...'],
      flirtIdleTalk2: ['<20>{#p/basic}{~}太完美...'],
      flirtIdleTalk3: ['<20>{#p/basic}{~}真秀丽...'],
      perilStatus: () =>
         !world.badder_lizard
            ? ["<32>{#p/alphys}* 她快死了..."]
            : ["<32>{#p/story}* 特雷莉亚呼吸急促。"]
   },

   b_opponent_froggitex: {
      name: '* 终极蛙吉特',
      epiphany: [
         
         ['<08>{#p/basic}{~}从你的\n仁慈中，\n我看到了\n智慧。', '<08>{#p/basic}{~}我的愿望\n实现了。'],
         () =>
            world.meanie
               ? 
               [
                  '<08>{#p/basic}{~}我没有\n预见到\n这个结果。',
                  '<08>{#p/basic}{~}我得\n避开深渊..'
               ]
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}蹦蹦，\n跳跳。', '<08>{#p/basic}{~}愿爱在\n我们心中\n闪耀。']
                  : SAVE.data.b.oops
                     ? 
                     ['<08>{#p/basic}{~}我们\n将成为\n最好的\n朋友。']
                     : 
                     ['<08>{#p/basic}{~}你的友善\n温暖着\n我的心。'],
         
         ['<08>{#p/basic}{~}咕呱，\n咕呱。', '<08>{#p/basic}{~}我的日子\n到头了。'],
         
         ['<08>{#p/basic}{~}愿你得到\n所渴望的\n财富。']
      ],
      genostatus: ['<32>{#p/asriel2}* ...'],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 终极蛙吉特被击倒了！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 终极蛙吉特被击倒了！'
      ],
      old_spray_text: [
         '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
         '<32>{#p/basic}* 终极蛙吉特被击倒了！'
      ],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ["<32>{#p/alphys}* 终极蛙吉特，它就像蛙吉特一样，\n  但更加华丽。\n* 它用一种古怪的语言说话。"]
                  : ["<32>{#p/alphys}* 这只是终极蛙吉特罢了。"]
               : ['<32>{#p/story}* 终极蛙吉特 - 攻击30 防御24\n* 这个怪物前途无量。'],
      act_check2: [
         '<32>{#p/story}* 终极蛙吉特 - 攻击30 防御24\n* 这个怪物会用它的智慧\n  继续生存下去。'
      ],
      act_check3: ['<32>{#p/story}* 终极蛙吉特 - 攻击30 防御24\n* 这个怪物明白了\n  你真正的欲望。'],
      act_check4: ['<32>{#p/story}* 终极蛙吉特 - 攻击30 防御24\n* 这个怪物对自己的话很满意。'],
      idleText1: ['<08>{#p/basic}{~}咕呱，\n咕呱。'],
      idleText2: ['<08>{#p/basic}{~}吱咕，\n吱咕。'],
      idleText3: ['<08>{#p/basic}{~}蹦蹦，\n跳跳。'],
      idleText4: ['<08>{#p/basic}{~}咕噜。'],
      status1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* The battlefield is engulfed in the smell of leola root.'],
      status2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 终极蛙吉特想求得解悟。'],
      status3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 终极蛙吉特希望能够\n  分享它的智慧。'],
      act_flirt: () => [
         '<32>{#p/human}* （你向终极蛙吉特调情。）',
         '<32>* 终极蛙吉特对你的话\n  有一定赏识。',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 呵呵...'] : [])
      ],
      flirtText: () =>
         world.meanie ? ['<08>{#p/basic}{~}(深吸了\n一口气)\n咕呱。'] : ['<08>{#p/basic}{~}（脸涨得\n通红）\n咕呱。'],
      act_translate1: () => [
         '<32>{#p/human}* （还没有什么话\n  需要你来翻译。）',
         ...(!world.badder_lizard
            ? ['<32>{#p/alphys}* 也许你应该... \n  先等它说点什么？']
            : [])
      ],
      act_translate2: ["<32>{#p/human}* （你翻译了终极蛙吉特的话。）"],
      translateText1: () =>
         world.meanie
            ? ["<08>{#p/basic}{~}（不要\n杀人，\n也不要\n被杀。）"]
            : ['<08>{#p/basic}{~}（时间\n可以治愈\n一切。）'],
      translateText2: () =>
         world.meanie
            ? ['<08>{#p/basic}{~}（别让\n愤怒\n掌控了\n你。）']
            : ['<09>{#p/basic}{~}（勇往\n直前。）'],
      translateText3: () =>
         world.meanie
            ? ['<08>{#p/basic}{~（你总能\n保持\n进步。）']
            : ['<08>{#p/basic}{~}（忠于\n自己。）'],
      translateText4: () =>
         world.meanie ? ['<08>{#p/basic}{~}（别向\n恐惧\n屈服。）'] : ['<08>{#p/basic}{~}（尽力\n而为。）'],
      translateText5: () =>
         world.meanie
            ? ['<08>{#p/basic}{~}（为刻薄\n忏悔。）']
            : ['<08>{#p/basic}{~}（无悔于\n行善。）'],
      mercyStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* 我想你现在可以\n  饶恕终极蛙吉特了。']
               : ['<32>{#p/alphys}* 我想你现在可以饶恕它了。']
            : ['<32>{#p/story}* 终极蛙吉特似乎\n  不愿意和你战斗了。'],
      act_mystify: ['<32>{#p/human}* （你干了件很有迷惑性的事情，\n  但终极蛙吉特没有被影响到。）'],
      act_threaten: ['<32>{#p/human}* （你干了件很有威胁性的事情，\n  但终极蛙吉特没有被影响到。）'],
      perilStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* 呃...']
               : ['<32>{#p/alphys}* 不...']
            : ['<32>{#p/story}* 终极蛙吉特绝不退缩。']
   },

   b_opponent_whimsalot: {
      name: '* 飘游䗁士',
      epiphany: [
         
         ['<08>{#p/basic}{~}谢天\n谢地..', '<08>{#p/basic}{~}我还怕\n我永远\n逃不掉了\n呢。）'],
         () =>
            world.meanie
               ? 
               ['<08>{#p/basic}{~}我在\n想什么..', '<08>{#p/basic}{~}我得离开\n这里..！']
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}如果你真\n这么想..', '<08>{#p/basic}{~}那我也得\n这么做..！']
                  : SAVE.data.b.oops
                     ? 
                     ["<08>{#p/basic}{~}没问题..", '<08>{#p/basic}{~}如果你\n想的话，\n我们可以\n做朋友..']
                     : 
                     ['<08>{#p/basic}{~}求求你..', "<08>{#p/basic}{~}别-别\n松\n手.."],
         
         ["<08>{#p/basic}{~}我很\n抱歉..", "<08>{#p/basic}{~}我知道我\n不够格.."],
         
         ["<08>{#p/basic}{~}这是\n给你的\n钱..", '<08>{#p/basic}{~}请.. \n饶恕我..']
      ],
      genostatus: ['<32>{#p/asriel2}* ...'],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 飘游䗁士被击倒了！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 飘游䗁士被击倒了！'
      ],
      old_spray_text: [
         '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
         '<32>{#p/basic}* 飘游䗁士被击倒了！'
      ],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* 飘游䗁士... 它似乎看起来很紧张，\n  或者是我的问题？']
                  : ["<32>{#p/alphys}* 这只是飘游䗁士罢了。"]
               : [
                  '<32>{#p/story}* 飘游䗁士 - 攻击34 防御12\n* 这个怪物有着过大的责任感。'
               ],
      act_check2: ['<32>{#p/story}* 飘游䗁士 - 攻击34 防御12\n* 它躲在后头，怕令人失望。'],
      act_check3: ['<32>{#p/story}* 飘游䗁士 - 攻击34 防御12\n* 它的翅膀如释重负。'],
      act_check4: ["<32>{#p/story}* 飘游䗁士 - 攻击34 防御12\n* 在扑腾的可不只有它的翅膀..."],
      act_perch1: () => [
         '<32>{#p/human}* （你伸出胳膊，\n  供飘游䗁士在上面栖息。）',
         '<32>{#p/basic}* 飘游䗁士考虑\n  接受你的提议...',
         ...(!world.badder_lizard && calm_lizard() ? ["<32>{#p/alphys}* 你已经成功一半了。"] : [])
      ],
      act_perch2: () =>
         world.meanie
            ? [
               '<32>{#p/human}* （你继续伸着胳膊。）',
               '<32>{#p/basic}* 飘游䗁士担心会有生命危险，\n  退缩了...',
               '<32>* 飘游䗁士想走了。',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 搞定了...？'] : [])
            ]
            : [
               '<32>{#p/human}* （你继续伸着胳膊。）',
               '<32>{#p/basic}* 飘游䗁士飞了过来\n  并落在了你的手臂上。',
               '<32>* 飘游䗁士可以休息了。',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 搞定了！'] : [])
            ],
      act_perch3: () =>
         world.meanie
            ? [
               '<32>{#p/human}* （你为飘游䗁士\n  伸出了又一只胳膊。）',
               '<33>{#p/basic}* 飘游䗁士已经看够了...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ...天哪。'] : [])
            ]
            : [
               '<32>{#p/human}* （你为飘游䗁士\n  伸出了又一只胳膊。）',
               '<32>{#p/basic}* 飘游䗁士不知所措，\n  决定飞走...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ...啊。'] : [])
            ],
      act_flirt: () =>
         world.meanie
            ? [
               '<32>{#p/human}* （你向飘游䗁士调情。）',
               '<32>{#p/basic}* 飘游䗁士很惊讶，\n  心里感到很矛盾...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 呃...'] : [])
            ]
            : [
               '<32>{#p/human}* （你向飘游䗁士调情。）',
               '<32>{#p/basic}* 飘游䗁士很惊讶，\n  但还是接受了...',
               ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 可爱...'] : [])
            ],
      flirtTalk: () =>
         world.meanie ? ['<08>{#p/basic}{~}这我该\n咋办呀..'] : ['<08>{#p/basic}{~}谢谢\n谢谢..'],
      act_poke1: () => [
         '<32>{#p/human}* （你戳了戳飘游䗁士\n  以让它失去平衡。）',
         '<32>{#p/basic}* 飘游䗁士抖了一下，\n  但很快就重整旗鼓。',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 你这是在干什么...?'] : [])
      ],
      act_poke2: () => [
         '<32>{#p/human}* （你戳了戳飘游䗁士\n  以让它失去平衡。）',
         '<32>{#p/basic}* 飘游䗁士掉了下去并逃之夭夭！',
         ...(!world.badder_lizard && calm_lizard()
            ? ["<32>{#p/alphys}* 我就当没看见。"]
            : [])
      ],
      preperchText1: ['<08>{#p/basic}{~}我该\n去吗..？'],
      preperchText2: ['<08>{#p/basic}{~}我可以\n去吗..？'],
      preperchText3: ['<08>{#p/basic}{~}我要\n去吗..？'],
      perchText1: ['<08>{#p/basic}{~}\x00*疲惫的\n叹息声*'],
      perchText2: ['<08>{#p/basic}{~}终于能\n休息了。'],
      perchText3: ['<08>{#p/basic}{~}谢谢你。'],
      perchText4: ['<08>{#p/basic}{~}我不知道\n自己有\n多累。'],
      perchText5: ["<08>{#p/basic}{~}我不知道\n自己干了\n多久活。"],
      idleTalk1: ["<08>{#p/basic}{~}我会做好\n分内的\n事.."],
      idleTalk2: ["<08>{#p/basic}{~}一切为了\n大局.."],
      idleTalk3: ["<08>{#p/basic}{~}他们都\n指望着\n我.."],
      idleTalk4: ['<08>{#p/basic}{~}The future depends on this..'],
      idleTalk5: ['<08>{#p/basic}{~}\x00*飞来\n飞去*'],
      perilStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* 呃...']
               : ['<32>{#p/alphys}* 不...']
            : ['<32>{#p/story}* 飘游䗁士大难临头。'],
      status1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* 飘游䗁士继续嘟囔着\n  那些正当理由。'],
      status2: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 飘游䗁士在徘徊着。']),
      status3: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 梨的味道扑面而来。']),
      status4: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 飘游䗁士的呼吸缓慢而平稳。'],
      status5: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 飘游䗁士思考着未来。'],
      spareStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* 看来飘游䗁士准备接受你的仁慈。']
               : ["<32>{#p/alphys}* 看来它准备接受你的仁慈。"]
            : ['<32>{#p/story}* 飘游䗁士正在休息。']
   },

   b_opponent_astigmatism: {
      name: '* 眼行者',
      epiphany: [
         
         ['<08>{#p/basic}{~}眼不见，\n心不念。'],
         () =>
            world.meanie
               ? 
               [
                  '<08>{#p/basic}{~}你比我还\n居心不良！',
                  "<08>{#p/basic}{~}我还是\n适可而止\n为好。"
               ]
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}你的眼睛\n真美..', "<08>{#p/basic}{~}可别跟\n族人们说！"]
                  : SAVE.data.b.oops
                     ? 
                     ['<08>{#p/basic}{~}友谊..', '<08>{#p/basic}{~}真是令我\n大开眼界！']
                     : 
                     ["<08>{#p/basic}{~}别太用力，\n好吗？"],
         
         ['<08>{#p/basic}{~}我作为\n首领，\n应骄傲地\n死去。'],
         
         ["<08>{#p/basic}{~}切..\n给你！", '<08>{#p/basic}{~}不用还钱。']
      ],
      genostatus: ['<32>{#p/asriel2}* ...'],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 眼行者被击倒了！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 眼行者被击倒了！'
      ],
      old_spray_text: [
         '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
         '<32>{#p/basic}* 眼行者被击倒了！'
      ],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ["<32>{#p/alphys}* Eyewalker Prime...?\n* They're probably the leader of the Eyewalker clan."]
                  : ["<32>{#p/alphys}* 这只是眼行者而已。"]
               : ["<33>{#p/story}* 眼行者 - 攻击32 防御26\n* 这个怪物比看起来还要难应付。"],
      act_check2: [
         '<33>{#p/story}* 眼行者 - 攻击32 防御26\n* 很满意你对家族传统的遵循。'
      ],
      act_check3: ['<32>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* Considers you to be quite the \"looker\" now.'],
      act_check4: [
         '<32>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* For this monster, tradition always comes before safety.'
      ],
      act_stare: ['<32>{#p/human}* （你紧盯着眼行者。）'],
      act_smile: ['<32>{#p/human}* （你对着眼行者微笑。）'],
      act_flirt: () => [
         '<32>{#p/human}* （你对着眼行者眨眼。）',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 噢，得了吧。'] : [])
      ],
      status1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* 眼行者正凝视着你的灵魂。'],
      status2: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ['<32>{#p/story}* 眼行者露出了\n  凶狠的笑容。'],
      status3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ["<32>{#p/story}* 眼行者可不是省油的灯。"],
      status4: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ["<32>{#p/story}* 眼行者想到了\n  他们家族的荣誉。"],
      status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 漱口水的味道扑面而来。']),
      perilStatus: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* 呃...'] : ['<32>{#p/story}* 眼行者在流泪。'],
      idleTalk1: ['<08>{#p/basic}{~}放马过来！'],
      idleTalk2: ['<08>{#p/basic}{~}让我\n见识一下\n你的怒火！'],
      idleTalk3: ["<08>{#p/basic}{~}不要\n打退堂鼓！"],
      idleTalk4: ['<08>{#p/basic}{~}Show me your looks!'],
      idleTalk5: ['<08>{#p/basic}{~}你有\n啥实力？'],
      flirtTalk: ["<08>{#p/basic}{~}哈。\n想得美。\n我已经\n有伴了！"],
      partialTalk1: ["<08>{#p/basic}{~}已经成功\n一半了.."],
      partialTalk2: ["<08>{#p/basic}{~}就差\n一点了.."],
      partialTalk3: ["<08>{#p/basic}{~}你快要\n做到了.."],
      partialStatus1: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* 我觉得你现在应该\n  做另一件事。']
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
               ? ['<32>{#p/alphys}* 去-去做另一件事！']
               : ['<32>{#p/alphys}* ...']
            : ["<32>{#p/story}* 眼行者希望你能\n  听从它的指示。"],
      fullStatus: () =>
         !world.badder_lizard
            ? calm_lizard()
               ? ['<32>{#p/alphys}* 眼行者现在\n  看起来很满意...']
               : ['<32>{#p/alphys}* 它现在看起来很满意...']
            : ['<32>{#p/story}* 眼行者很高兴。'],
      partialIdleTalk1: ['<08>{#p/basic}{~}你在\n等什么？'],
      partialIdleTalk2: ['<08>{#p/basic}{~}你要\n做什么吗，\n还是...'],
      partialIdleTalk3: ["<08>{#p/basic}{~}你就这点\n本事吗？"],
      fullIdleTalk1: ['<08>{#p/basic}{~}很高兴\n我们\n看对眼了。'],
      fullIdleTalk2: ['<08>{#p/basic}{~}伙计，你\n看起来\n不错。'],
      fullIdleTalk3: ["<08>{#p/basic}{~}就是这样。"],
      flirtTalkFull: ['<08>{#p/basic}{~}嗯..', '<08>{#p/basic}{~}你的举动\n让我\n心悦诚服..'],
      hurtTalk: ["<08>{#p/basic}{~}我不是\n那个意思！"]
   },
   b_opponent_migospel: {
      genostatus: ['<32>{#p/asriel2}* ...'],
      epiphany: [
         
         ["<08>{#p/basic}{~}反正\n我也不想\n跟你打。"],
         () =>
            world.meanie
               ? 
               ['<08>{#p/basic}{~}我就知道\n这是个\n坏主意。']
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ['<08>{#p/basic}{~}你这人\n很怪。', '<08>{#p/basic}{~}但还是\n挺迷人。']
                  : SAVE.data.b.oops
                     ? 
                     ["<08>{#p/basic}{~}行啊，\n我们来\n做朋友吧。", "<08>{#p/basic}{~}那样\n比较好。"]
                     : 
                     ['<08>{#p/basic}{~}嗯..', "<08>{#p/basic}{~}想抱的话\n你就抱吧。"],
         
         ["<08>{#p/basic}{~}是时候了..", '<08>{#p/basic}{~}..我该\n停止逃避\n死亡了。'],
         
         ["<08>{#p/basic}{~}这钱\n你能比我\n用得更好。", '<08>{#p/basic}{~}你只管\n拿着。']
      ],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 默之蟑逃走了！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 默之蟑逃走了！'
      ],
      old_spray_text: ['<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）', '<32>{#p/basic}* 默之蟑逃走了！'],
      act_check: () =>
         world.goatbro && SAVE.data.n.plot > 66.2
            ? ['<32>{#p/asriel2}* ...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* 默之蟑是吗？\n* 啊，这家伙经常到处乱跑。']
                  : ["<32>{#p/alphys}* 这只是默之蟑罢了。"]
               : ['<32>{#p/story}* 默之蟑 - 攻击28 防御17\n* 无耻而懦弱。\n* 来凑热闹的。'],
      act_flirt: () => [
         '<32>{#p/human}* （你向默之蟑调情。）',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 好吧...'] : [])
      ],
      flirtTalk: ["<09>{#p/basic}{~}你真可爱。"],
      act_insult: ['<32>{#p/human}* （你辱骂了默之蟑。）\n* （没什么效果。）'],
      groupStatus1: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 默之蟑对他人视而不见。'],
      groupStatus2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Smells like a pit stop.'],
      groupTalk1: ['<08>{#p/basic}给我\n让开。'],
      groupTalk2: ['<08>{#p/basic}You people are slow.'],
      groupTalk3: ["<08>{#p/basic}I'm not partici- pating."],
      groupTalk4: ['<08>{#p/basic}可别\n聚在一块。'],
      groupTalk5: ['<08>{#p/basic}Danger is for fools.'],
      groupTalk6: ['<08>{#p/basic}能不能\n走开。'],
      name: '* 默之蟑',
      soloStatus: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* Looks like it never wanted to do this to begin with.']
            : ["<32>{#p/story}* 默之蟑不需要任何人\n  在它身边。"],
      soloTalk1: ["<08>{#p/basic}{~}I'll get along alright."],
      soloTalk2: ['<08>{#p/basic}{~}Partners are over- rated.'],
      soloTalk3: ['<08>{#p/basic}{~}终于可以\n独处了。'],
      soloTalk4: ['<08>{#p/basic}{~}恰，\n恰。'],
      soloTalk5: ['<08>{#p/basic}{~}I dance in peace.'],
      perilTalk: ["<08>{#p/basic}{~}我要\n走了。"]
   },
   b_opponent_mushketeer: {
      name: '* 蘑炮手',
      epiphany: [
         
         ["<08>{#p/basic}{~}这样\n我就只好\n饶恕你了！"],
         () =>
            world.meanie
               ? 
               ["<08>{#p/basic}{~}我的\n蘑菇帽\n要掉了！\n撤退！"]
               : SAVE.data.b.oops && world.flirt > 9
                  ? 
                  ["<08>{#p/basic}{~}All's fair in love 'n' war!"]
                  : SAVE.data.b.oops
                     ? 
                     ['<08>{#p/basic}{~}从今往后，\n我们就是\n盟友了！']
                     : 
                     ['<08>{#p/basic}{~}拥抱真是\n和平的\n关键！'],
         
         ['<08>{#p/basic}{~}冲突的\n恶性循环\n该结束了！'],
         
         ['<08>{#p/basic}{~}战利品\n归你了！']
      ],
      old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<33>{#p/basic}* 蘑炮手遇上了个劲敌！'],
      old_bomb_text: [
         '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
         '<32>{#p/basic}* 蘑炮手投降了！'
      ],
      old_spray_text: [
         '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
         '<32>{#p/basic}* Mushketeer has been impaired!'
      ],
      idleTalk1: () =>
         world.genocide
            ? ['<08>{#p/basic}{~}你的\n恐怖统治\n结束了！']
            : ['<08>{#p/basic}{~}来和我\n一起\n上前线。'],
      idleTalk2: () =>
         world.genocide
            ? ['<08>{#p/basic}{~}等着被\n处决吧！']
            : ["<08>{#p/basic}{~}All's fair in love..\n.. and CORE."],
      idleTalk3: () =>
         world.genocide
            ? ['<08>{#p/basic}{~}Nobody outguns Mush- keteer!']
            : ['<08>{#p/basic}{~}没有比\n战时\n更美好的\n时刻了..'],
      hurtStatus: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* 离死不远了。']
            : ['<32>{#p/story}* 蘑炮手开始了最后的攻势。'],
      genoStatus: ['<32>{#p/asriel2}* 蘑炮手。'],
      status0: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* 怎么这玩意也要挡我们路？']
            : !world.badder_lizard
               ? ["<32>{#p/alphys}* 可别死了。"]
               : ['<32>{#p/story}* 蘑炮手挡住了去路！'],
      status1: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手坚定不移。']),
      status2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手想做一个英雄。'],
      status3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手在为交火做准备。'],
      status4: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手伸手去拿枪。'],
      status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 干燥泥土的味道扑面而来。']),
      travelStatus1: () =>
         !world.badder_lizard
            ? ['<32>{#p/alphys}* ...']
            : ["<32>{#p/story}* Mushketeer, the pray 'n' spray specialist."],
      travelStatus2: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手紧张不安。'],
      travelStatus3: () =>
         !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手急速扫视着四周。'],
      act_check: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* Mushketeer, the gun-toter.\n* The dirty elder cousin of a mushroom far away...']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* 蘑炮手。\n* 我不知道这是谁。']
                  : ["<32>{#p/alphys}* 这只是蘑炮手罢了。"]
               : ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Product of its upbringing.\n* Gun-toter.'],
      act_check2: ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Reconsidering its upbringing.\n* Gun-tosser.'],
      act_check3: ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Forgetting its upbringing.\n* Heart-warmer.'],
      act_check4: ['<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* The war stops for no mushroom.'],
      act_flirt: () => [
         '<32>{#p/human}* （你邀请蘑炮手来参加\n  一场私下的枪战。）',
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 别吧。'] : [])
      ],
      flirtTalk: ["<08>{#p/basic}{~}Hey!\nWe don't do that here."],
      flirtTalk2: ["<08>{#p/basic}{~}Well..\nIf it's what you're into.."],
      flirtStatus: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* 蘑炮手。']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ["<32>{#p/alphys}* 好吧，那行不通。"]
                  : ['<32>{#p/alphys}* ...']
               : ['<32>{#p/story}* 坏了，蘑炮手是认真的。'],
      flirtStatus2: () =>
         world.genocide
            ? ['<32>{#p/asriel2}* 蘑炮手。']
            : !world.badder_lizard
               ? calm_lizard()
                  ? ['<32>{#p/alphys}* 等等，成了？']
                  : ['<32>{#p/alphys}* ...']
               : ['<32>{#p/story}* 好了，蘑炮手是认真的。'],
      act_travel1: () => [
         '<32>{#p/human}* （你靠近了蘑炮手。）',
         "<32>{#p/basic}* 蘑炮手的攻击变得更加猛烈！",
         ...(world.genocide
            ? ['<32>{#p/asriel2}* ...？']
            : !world.badder_lizard && calm_lizard()
               ? ['<32>{#p/alphys}* 小心...']
               : [])
      ],
      act_travel2: () => [
         '<32>{#p/human}* （你来到蘑炮手身边。）',
         "<32>{#p/basic}* 蘑炮手的攻击开始疯狂起来！",
         ...(world.genocide
            ? ['<32>{#p/asriel2}* $(name)...？']
            : !world.badder_lizard && calm_lizard()
               ? ['<32>{#p/alphys}* 我的老天，小心点啊...！']
               : [])
      ],
      act_travel3: () => [
         '<32>{#p/human}* （但你已经在蘑炮手身边了。）',
         ...(world.genocide
            ? ['<32>{#p/asriel2}* I am starting to get worried.']
            : !world.badder_lizard && calm_lizard()
               ? ['<32>{#p/alphys}* 干-干点别的事吧！！！']
               : [])
      ],
      travelTalk1: ["<08>{#p/basic}{~}你以为\n你在\n干什么！"],
      travelTalk2: ["<08>{#p/basic}{~}你在\n搞什么鬼！"],
      act_disarm1: () => [
         "<32>{#p/human}* （你试图缴蘑炮手的械，\n  但你离得太远了。）",
         ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 你可以试着再靠近点。'] : [])
      ],
      act_disarm2: () => [
         "<32>{#p/human}* （你试图缴蘑炮手的械，\n  但你就是够不着。）",
         ...(!world.badder_lizard && calm_lizard()
            ? ['<32>{#p/alphys}* 我想...\n* 你得再靠近点...']
            : [])
      ],
      act_disarm3: () => ['<32>{#p/human}* （你缴了蘑炮手的械。）'],
      act_disarm3x: ['<32>{#p/human}* （但蘑炮手已经被缴械了。）'],
      act_disarm4: pager.create(
         0,
         [
            '<32>{#p/human}* (You try to disarm Mushketeer, but Mushketeer knocks you back to where you started.)',
            "<32>{#p/asriel2}* 我们在浪费时间。"
         ],
         [
            '<32>{#p/human}* (You try to disarm Mushketeer, but Mushketeer knocks you back to where you started.)',
            '<32>{#p/asriel2}* ...'
         ]
      ),
      disarmTalk: [
         '<08>{#p/basic}{~}我想\n这意味着\n停战了..？',
         '<08>{#p/basic}{~}\x00*叹气*',
         "<08>{#p/basic}{~}也许\n这样是\n最好的吧。"
      ],
      disarmStatus: ['<32>{#p/story}* 蘑炮手等待着\n  这场战斗的结束。'],
      postDisarmTalk1: ['<08>{#p/basic}{~}噢好吧..'],
      postDisarmTalk2: ['<08>{#p/basic}{~}事实就是\n这样了..']
   },

   
   b_opponent_pyrope: {
      name: '* 烈焰热线',
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
      genoStatus: ['<32>{#p/asriel2}* 烈焰热线。'],
      genoSpareStatus: ["<32>{#p/asriel2}* 不堪一击。"],
      act_check: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 烈焰热线，说唱呆子。\n* 脑子这么活络，\n  却把才华浪费在这种小儿科上。']
            : ['<32>{#p/story}* 烈焰热线 - 攻击 29 防御 14\n* 这种怪物很狡猾，任何计划对它来说都不复杂。'],
      act_check2: [
         '<32>{#p/story}* 烈焰热线 - 攻击 29 防御 14\n* 这个怪物点燃的火花正在熄灭。'
      ],
      act_check3: ["<32>{#p/story}* 烈焰热线 - 攻击 29 防御 14\n* 这个冒烟蠢货的押韵词容易着火。"],
      act_check4: ['<32>{#p/story}* 烈焰热线 - 攻击 29 防御 14\n* 重新点燃了对说唱的热爱，每次一句。'],
      act_flirt: ['<32>{#p/human}* （你对烈焰热线调情。）', '<32>{#p/basic}* 烈焰热线也向你调情！'],
      act_diss: ['<32>{#p/human}* （你使劲贬损烈焰热线。）'],
      dissTalk1: ['<08>{#p/basic}{~}你若骂我不会说唱', '<08>{#p/basic}{~}我可得说你行你上！'],
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
      sparkText1: ["<32>{#p/human}* （你点亮了烈焰热线的引线。）", "<32>{#p/basic}* 烈焰热线的自信不断增加。"],
      sparkText2: ["<32>{#p/human}* （你点亮了烈焰热线的引线。）", '<32>{#p/basic}* 烈焰热线达到了巅峰！'],
      sparkText3: ["<32>{#p/human}* （你点亮了烈焰热线的引线。）", '<32>{#p/basic}* 烈焰热线已经通电了。'],
      rapText1: ['<32>{#p/human}* （你向烈焰热线说唱。）', '<32>{#p/basic}* 烈焰热线对你很冷漠。'],
      rapText2: ['<32>{#p/human}* （你向烈焰热线说唱。）', '<32>{#p/basic}* 烈焰热线对你很失望。'],
      rapText3: ['<32>{#p/human}* （你向烈焰热线说唱。）', '<32>{#p/basic}* 烈焰热线感到你很恶心。'],
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
      status1: ['<32>{#p/story}* 烈焰热线正在寻找额外的动力。'],
      status2: ['<32>{#p/story}* 烈焰热线吟唱起了一场风暴。'],
      status3: ['<32>{#p/story}* 烈焰热线被它迷人的微笑保护了起来。'],
      status4: ['<32>{#p/story}* 烈焰热线尝试涡轮增压。'],
      status5: ['<32>{#p/story}* Smells like lyricism.'],
      sparkStatus1A: ['<32>{#p/story}* 烈焰热线被它的辉煌震惊了。'],
      sparkStatus2A: ['<32>{#p/story}* 烈焰热线启动了点火程序...手动地。'],
      sparkStatus3A: ['<32>{#p/story}* 不管我们喜不喜欢，烈焰热线仍然我行我素。'],
      sparkStatus1B: ['<32>{#p/story}* 烈焰热线很兴奋。'],
      sparkStatus2B: ['<32>{#p/story}* 烈焰热线的能力完全释放了出来。'],
      sparkStatus3B: ['<32>{#p/story}* 烈焰热线正在涡轮增压。'],
      hurtStatus: () =>
         world.goatbro ? ['<32>{#p/asriel2}* 离死不远了。'] : ['<32>{#p/story}* 烈焰热线要失控了。']
   },

   b_opponent_perigee: {
      name: '* 呦呦鸡',
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
      genoStatus: ['<32>{#p/asriel2}* 呦呦鸡。'],
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
         world.goatbro ? ['<32>{#p/asriel2}* 呦呦鸡。'] : ['<32>{#p/story}* Perigee awaits your gesture.'],
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
         world.goatbro ? ["<32>{#p/asriel2}* 不堪一击。"] : ['<32>{#p/story}* Perigee is satisfied.'],
      hurtStatus: () =>
         world.goatbro ? ['<32>{#p/asriel2}* 离死不远了。'] : ["<32>{#p/story}* Perigee's time is near."]
   },

   b_opponent_tsundere: {
      name: '* 傲娇飞船',
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
            ? ['<32>{#p/asriel2}* 傲娇飞船，\n  这家伙，我无话可说。']
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
            ? ['<32>{#p/asriel2}* 傲娇飞船。']
            : ['<32>{#p/story}* Tsunderidex looks over, then turns up its nose.'],
      status2: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 傲娇飞船。']
            : ['<32>{#p/story}* Tsunderidex shakes its nose dimissively at you.'],
      status3: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 傲娇飞船。']
            : ['<32>{#p/story}* Tsunderidex \"accidentally\" bumps you with its nacelles.'],
      status4: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 傲娇飞船。']
            : ['<32>{#p/story}* Tsunderidex sets its cannons to \"stun.\"'],
      status5: () =>
         world.goatbro ? ['<32>{#p/asriel2}* 傲娇飞船。'] : ['<32>{#p/story}* Smells like space cacti.'],
      status6: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* 不堪一击。"]
            : ['<32>{#p/story}* Tsunderidex is looking away shyly.'],
      hurtStatus: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 离死不远了。']
            : ["<32>{#p/story}* Tsunderidex's engines are leaking plasma."]
   },

   b_opponent_rg01: {
      name: () => (world.bad_lizard > 1 ? '* 一号守卫' : '* 三号守卫'),
      epiphaNOPE: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}那个，\n你在干啥呢？']
            : ["<11>{#p/basic}{~}This ain't it, chief."],
      act_check: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* 一号守卫...\n* 这俩货我没啥好说的。"]
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
      randTalk1: () => ['<11>{#p/basic}{~}组合技。'],
      randTalk2: () =>
         world.bad_lizard > 1 ? ["<11>{#p/basic}{~}我们会\n阻止你的。"] : ["<11>{#p/basic}{~}We're just friends..."],
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
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}下地狱吧。']
            : ["<11>{#p/basic}{~}{@random=1.1/1.1}I'll never know..."],
      randTalkLone2: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}死有余辜。']
            : ["<11>{#p/basic}{~}{@random=1.1/1.1}It's too late..."],
      randTalkLone3: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}禽兽不如。']
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}I missed my chance...'],
      randTalkLone4: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}给我去死。']
            : ["<11>{#p/basic}{~}{@random=1.1/1.1}It can't be..."],
      randStatusLone: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 只剩一个了。']
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
      act_whisper_alt: ['<32>{#p/human}* （你和三号守卫说悄悄话。）\n* （什么都没发生。）'],

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
            ? ['<32>{#p/asriel2}* 离死不远了。']
            : world.bad_lizard > 1
               ? ["<32>{#p/story}* 01's gaze pans downwards to the floor."]
               : ["<32>{#p/story}* 03's breathing intensifies."]
   },

   b_opponent_rg02: {
      name: () => (world.bad_lizard > 1 ? '* 二号守卫' : '* 四号守卫'),
      epiphaNOPE: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}I don't get this at all..."]
            : ["<11>{#p/basic}{~}That won't work on me."],
      act_check: () =>
         world.goatbro
            ? ["<32>{#p/asriel2}* 二号守卫...\n* 这俩货我没啥好说的。"]
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
      randTalk1: () => ['<11>{#p/basic}{~}组合技！'],
      randTalk2: () =>
         world.bad_lizard > 1 ? ['<11>{#p/basic}{~}一劳永逸！'] : ['<11>{#p/basic}{~}Absolutely!'],
      randTalk3: () =>
         world.bad_lizard > 1 ? ["<11>{#p/basic}{~}You don't stand a chance!"] : ['<11>{#p/basic}{~}No romance here!'],
      randTalk4: () =>
         world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Totally, bro!'] : ['<11>{#p/basic}{~}Oh you know it, girl!'],
      randTalkLone1: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}{@random=1.1/1.1}你完蛋了！！"]
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}How could you do this to me...!?'],
      randTalkLone2: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}{@random=1.1/1.1}休想得逞！！"]
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}She was my only friend...!'],
      randTalkLone3: () =>
         world.bad_lizard > 1
            ? ['<11>{#p/basic}{~}{@random=1.1/1.1}老子\n宰了你！！']
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}She was everything to me...!'],
      randTalkLone4: () =>
         world.bad_lizard > 1
            ? ["<11>{#p/basic}{~}{@random=1.1/1.1}血债血偿！"]
            : ['<11>{#p/basic}{~}{@random=1.1/1.1}What kind of creature are you...!?'],
      randStatusLone: () =>
         world.goatbro
            ? ['<32>{#p/asriel2}* 只剩一个了。']
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
      act_whisper_alt: ['<32>{#p/human}* （你和四号守卫说悄悄话。）\n* （什么都没发生。）'],

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
            ? ['<32>{#p/asriel2}* 离死不远了。']
            : world.bad_lizard > 1
               ? ['<32>{#p/story}* 02 holds his head high.']
               : ["<32>{#p/story}* 04's breathing intensifies."]
   },

   b_use: {
      old_spray: () =>
         battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
            ? []
            : ['<32>{#p/human}* （你取出了糖雾喷。）', '<32>{#p/human}* （什么都没发生。）'],
      old_gun: () =>
         battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
            ? []
            : ['<32>{#p/human}* （你取出了电击枪。）', '<32>{#p/human}* （什么都没发生。）'],
      old_bomb: () =>
         battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
            ? []
            : ['<32>{#p/human}* （你取出了瞌睡弹。）', '<32>{#p/human}* （什么都没发生。）']
   },

   c_name_aerialis: {
      alphys: "给艾菲斯打电话",
      puzzle: '谜题求助',
      dimboxA: '次元箱子A',
      dimboxB: '次元箱子B',
      pms: () => (SAVE.data.n.plot_pmcheck < pms().length ? '§fill=#ff0§域外网（有新消息）' : '域外网')
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
         description: '一台来自地球的老式收音机。',
         name: '收音机'
      },
      drop: ['<32>{#p/human}* （你把老式收音机扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (This artifact looks a lot like other things you're used to seeing all the time.)"]
            : ["<32>{#p/basic}* 一台来自地球的老式收音机。"],
      name: '老式收音机',
      use: () =>
         !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
            ? []
            : ['a_lookout', 'f_taxi', 's_taxi', 'w_wonder'].includes(game.room) // NO-TRANSLATE

               ? [
                  '<32>{#p/human}* （你打开了收音机。）',
                  '<32>{#p/event}{#a.radiostart}* ...',
                  '{*}{#a.radiostop}{%}'
               ]
               : ['<32>{#p/human}* （你打开了收音机。）\n* （没有信号。）']
   },
   i_tvm_fireworks: {
      battle: {
         description: '一箱来自地球的烟花。',
         name: '烟花'
      },
      drop: ['<32>{#p/human}* （你把整箱烟花全扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* (This supposed artifact looks like nothing else you've seen.)"]
            : ["<32>{#p/basic}* 一箱来自地球的烟花。"],
      name: '烟花',
      use: () =>
         !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
            ? []
            : [
               '<32>{#p/human}* （你往装烟花的箱子里\n  瞅了一眼。）',
               "<32>* （看来，你还不会放烟花。）"
            ]
   },
   i_tvm_mewmew: {
      battle: {
         description: '一只等身大的喵喵玩偶。',
         name: '喵喵玩偶'
      },
      drop: () => [
         '<32>{#p/human}* （你把喵喵玩偶扔掉了。）',
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
      info: ["<32>{#p/basic}* 一只等身大的喵喵玩偶。\n  不然还能是别的吗？"],
      name: '喵喵玩偶',
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
                        ? ['<32>{#p/napstablook}* 噢............']
                        : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                           ? []
                           : ['<32>{#p/basic}* What were you even expecting to happen here...?'])
            ]
   },
   i_starfait: {
      battle: {
         description: '明显加糖加多了。',
         name: '新星咖啡'
      },
      drop: ['<32>{#p/human}* （你把新星咖啡扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （23 HP。）']
            : ['<32>{#p/basic}* “新星咖啡” 回复23 HP\n* 明显加糖加多了。'],
      name: '新星咖啡',
      use: ['<32>{#p/human}* （你喝掉了新星咖啡。）']
   },
   i_legendary_hero: {
      battle: {
         description: "回合中保护，回合后回血，\n这三明治简直碉堡了。",
         name: '星园烁宠'
      },
      drop: ['<32>{#p/human}* （你把星园烁宠扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （40 HP。）']
            : [
               '<33>{#p/basic}* “星园烁宠” 回复40 HP\n* 回合中保护，回合后回血，\n  这三明治简直碉堡了。'
            ],
      name: '星园烁宠',
      use: () =>
         battler.active
            ? [
               '<32>{#p/human}* （你自豪地挥舞着星园烁宠。）',
               '<32>{#p/story}* 本回合，你的防御力提升！'
            ]
            : ['<32>{#p/human}* （你吃掉了猛男汉堡。）']
   },
   i_glamburger: {
      battle: {
         description: '汉堡火辣辣，打人顶呱呱。',
         name: '猛男汉堡'
      },
      drop: () => [
         '<32>{#p/human}* （你拿猛男汉堡来了个全垒打。）',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : ["<32>{#p/basic}* 明明是本垒打！"])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （34 HP。）']
            : ['<32>{#p/basic}* “猛男汉堡” 回复34 HP\n* 汉堡火辣辣，打人顶呱呱。'],
      name: '猛男汉堡',
      use: () => [
         '<32>{#p/human}* （你猛得吞下猛男汉堡。）',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : ["<32>{#p/basic}* 小心，里面放了好几种辣椒呢！"])
      ]
   },
   i_face_steak: {
      battle: {
         description: '这就叫“攻守易形”。',
         name: "老滑头的爱"
      },
      drop: ["<32>{#p/human}* （你把老滑头的爱扔掉了。）"],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （55 HP。）']
            : ['<32>{#p/basic}* “老滑头的爱” 回复55 HP\n* 这就叫“攻守易形”。'],
      name: "老滑头的爱",
      use: ["<32>{#p/human}* （你尽情享受着老滑头的爱。）"]
   },
   i_starfait_x: {
      battle: {
         description: '...',
         name: '新星吗啡'
      },
      drop: ['<32>{#p/human}* （你把“新星吗啡”扔掉了。）'],
      info: ['<32>{#p/basic}* “新星吗啡” 回复-23 HP\n* ...'],
      name: '新星吗啡',
      use: ['<32>{#p/human}* （你吸食了新星吗啡。）']
   },
   i_legendary_hero_x: {
      battle: {
         description: '...',
         name: '猩猿硕虫'
      },
      drop: ['<32>{#p/human}* （你把猩猿硕虫扔掉了。）'],
      info: ['<32>{#p/basic}* “猩猿硕虫” 回复-40 HP\n* ...'],
      name: '猩猿硕虫',
      use: () =>
         battler.active
            ? [
               '<32>{#p/human}* （你慌乱地挥舞着猩猿硕虫。）',
               '<32>{#p/story}* 本回合，你的防御力降低！'
            ]
            : ['<32>{#p/human}* （你吃掉了猩猿硕虫。）']
   },
   i_glamburger_x: {
      battle: {
         description: '...',
         name: '猛烂汉堡'
      },
      drop: ['<32>{#p/human}* （你把猛烂汉堡扔到了垃圾堆。）'],
      info: ['<32>{#p/basic}* “猛烂汉堡” 回复-34 HP\n* ...'],
      name: '猛烂汉堡',
      use: ['<32>{#p/human}* （你猛地吞下了猛烂汉堡。）']
   },
   i_face_steak_x: {
      battle: {
         description: '...',
         name: '安黛因的哀'
      },
      drop: ["<32>{#p/human}* （你把安黛因的哀扔掉了。）"],
      info: ['<32>{#p/basic}* “安黛因的哀” 回复-55 HP\n* ...'],
      name: "安黛因的哀",
      use: ["<32>{#p/human}* （你把安黛因的哀都咽到肚子里。）"]
   },
   i_trash: {
      battle: {
         description: '你敢尝尝真正的垃圾\n是什么味道吗？',
         name: '太空垃圾'
      },
      drop: ['<32>{#p/human}* （你把太空垃圾扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （?? HP。）']
            : ['<32>{#p/basic}* “太空垃圾” 回复?? HP\n* 你敢尝尝真正的垃圾\n  是什么味道吗？'],
      name: '太空垃圾',
      use: () => [
         '<32>{#p/human}* （你吃掉了太空垃圾。）',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* 饶了我吧。'])
      ]
   },
   i_laser: {
      battle: {
         description: '精准命中，威力无穷。',
         name: '激光步枪'
      },
      drop: ['<32>{#p/human}* （你把激光步枪扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （12攻击。）']
            : ['<32>{#p/basic}* “激光步枪” （12攻击）\n* 精准命中，威力无穷。'],
      name: '激光步枪',
      use: ['<32>{#p/human}* （你扛起了激光步枪。）']
   },
   i_laser_x: {
      battle: {
         description: '精准命中，火力十足。',
         name: '激光步枪？'
      },
      drop: ['<32>{#p/human}* （你把激光步枪扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （10攻击。）']
            : ['<32>{#p/basic}* “激光步枪？” （10攻击）\n* 精准命中，火力十足。'],
      name: '激光步枪？',
      use: ['<32>{#p/human}* （你扛起了激光步枪。）']
   },
   i_visor: {
      battle: {
         description: '能延长攻击瞄准时间。',
         name: '护目镜'
      },
      drop: ['<32>{#p/human}* （你把护目镜扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （12防御。）']
            : ['<32>{#p/basic}* “战术护目镜” （12防御）\n* 能延长攻击瞄准时间。'],
      name: '战术护目镜',
      use: ['<32>{#p/human}* （你戴上了护目镜。）']
   },
   i_visor_x: {
      battle: {
         description: '略微延长瞄准时间，\n效果不如正品。',
         name: '护目镜？'
      },
      drop: ['<32>{#p/human}* （你把护目镜扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （10防御。）']
            : [
               '<32>{#p/basic}* “战术护目镜？” （10防御）\n* 略微延长瞄准时间，\n  效果不如正品。'
            ],
      name: '战术护目镜？',
      use: ['<32>{#p/human}* （你戴上了护目镜。）']
   },
   i_filament: {
      battle: {
         description: '一组弯弯绕绕的灯芯，风味独特！\n还剩五根。',
         name: '灯芯'
      },
      drop: ['<32>{#p/human}* （你把这些灯芯全扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （30 HP。）']
            : ['<32>{#p/basic}* “灯芯” 回复30 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩五根。'],
      name: '五根灯芯',
      use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
   },
   i_filament_use1: {
      battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n还剩四根。', name: '灯芯' },
      drop: ['<32>{#p/human}* （你把这些灯芯全扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （25 HP。）']
            : ['<32>{#p/basic}* “灯芯” 回复25 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩四根。'],
      name: '四根灯芯',
      use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
   },
   i_filament_use2: {
      battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n还剩三根。', name: '灯芯' },
      drop: ['<32>{#p/human}* （你把这些灯芯全扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （20 HP。）']
            : ['<32>{#p/basic}* “灯芯” 回复20 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩三根。'],
      name: '三根灯芯',
      use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
   },
   i_filament_use3: {
      battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n还剩两根。', name: '灯芯' },
      drop: ['<32>{#p/human}* （你把这些灯芯全扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （15 HP。）']
            : ['<32>{#p/basic}* “灯芯” 回复15 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩两根。'],
      name: '两根灯芯',
      use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
   },
   i_filament_use4: {
      battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n只剩一根。', name: '灯芯' },
      drop: ['<32>{#p/human}* （你把这些灯芯全扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （10 HP。）']
            : ['<32>{#p/basic}* “灯芯” 回复10 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 只剩一根。'],
      name: '灯芯',
      use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
   },
   i_tablaphone: {
      battle: {
         description: '表面平坦，但边缘锋利。\n每回合受伤后回复一定量HP。',
         name: '塔布拉木琴'
      },
      drop: ['<32>{#p/human}* （你把塔布拉木琴扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （10攻击。）']
            : ['<32>{#p/basic}* “塔布拉木琴” （10攻击）\n* 表面平坦，但边缘锋利。\n  每回合受伤后回复一定量HP。'],
      name: '塔布拉木琴',
      use: ['<32>{#p/human}* （你架好了塔布拉木琴。）']
   },
   i_sonic: {
      battle: {
         description: "受到弹幕攻击时，\n小概率转变为回血效果。",
         name: '谐振器'
      },
      drop: ['<32>{#p/human}* （你把声波谐振器扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （11防御。）']
            : [
               '<32>{#p/basic}* “声波谐振器” （11防御）\n* 受到弹幕攻击时，\n  小概率转变为回血效果。'
            ],
      name: '声波谐振器',
      use: ['<32>{#p/human}* （你启动了声波谐振器。）']
   },
   i_mystery_food: {
      battle: {
         description: '这种食物在休闲回廊十分常见。',
         name: '神秘食物'
      },
      drop: ['<32>{#p/human}* （你把神秘食物扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （13 HP。）']
            : ['<32>{#p/basic}* “神秘食物” 回复13 HP\n* 这种食物在休闲回廊十分常见。'],
      name: '神秘食物',
      use: ['<32>{#p/human}* （你吃掉了神秘食物。）']
   },
   i_super_pop: {
      battle: {
         description: '可改变主观时间流速。',
         name: '豪华棒棒糖'
      },
      drop: ['<32>{#p/human}* （你把豪华涡旋棒棒糖扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （22 HP。）']
            : [
               '<33>{#p/basic}* “豪华涡旋棒棒糖” 回复22 HP\n* 可改变主观时间流速。\n* 仅在战斗中有效。'
            ],
      name: '豪华涡旋棒棒糖',
      use: () => [
         '<32>{#p/human}* （你把超级涡旋棒棒糖舔没了。）',
         ...(battler.active
            ? game.vortex
               ? ['<32>{#p/human}* （主观时间流速之前已改变。）']
               : [
                  '<32>{#p/human}* （你的主观时间流速开始改变。）',
                  '<32>{#p/story}* 两回合内，你的专注力提升！'
               ]
            : ['<32>{#p/human}* （战斗外使用无效。）'])
      ]
   },
   i_old_gun: {
      battle: {
         description: '无害的一次性武器。',
         name: '电击枪'
      },
      drop: ['<32>{#p/human}* （你把电击枪扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* （你感觉这东西并没有想象中那么便携。）"]
            : ['<32>{#p/basic}* 无害的一次性武器。\n* 只能在战斗中使用。'],
      name: '电击枪',
      use: () =>
         battler.active
            ? []
            : ['<32>{#p/human}* （你取出了电击枪。）', '<32>{#p/human}* （战斗外使用无效。）']
   },
   i_old_bomb: {
      battle: {
         description: '无害的一次性武器。',
         name: '瞌睡炸弹'
      },
      drop: ['<32>{#p/human}* （你把瞌睡炸弹扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* （你感觉这东西并没有想象中那么镇静。）"]
            : ['<32>{#p/basic}* 无害的一次性武器。\n* 只能在战斗中使用。'],
      name: '瞌睡炸弹',
      use: () =>
         battler.active
            ? []
            : ['<32>{#p/human}* （你取出了瞌睡弹。）', '<32>{#p/human}* （战斗外使用无效。）']
   },
   i_old_spray: {
      battle: {
         description: '无害的一次性武器。',
         name: '糖雾喷剂'
      },
      drop: ['<32>{#p/human}* （你扔掉了糖雾喷剂。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ["<32>{#p/human}* （你感觉这东西并没有想象中那么甜。）"]
            : ['<32>{#p/basic}* 无害的一次性武器。\n* 只能在战斗中使用。'],
      name: '糖雾喷剂',
      use: () =>
         battler.active
            ? []
            : ['<32>{#p/human}* （你取出了糖雾喷。）', '<32>{#p/human}* （战斗外使用无效。）']
   },
   i_corndog: {
      battle: {
         description: '刚从微波炉里拿出来。',
         name: '玉米热狗'
      },
      drop: ['<32>{#p/human}* （你把玉米热狗扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （10 HP。）']
            : ['<32>{#p/basic}* “玉米热狗” 回复10 HP\n* 刚从微波炉里拿出来。'],
      name: '玉米热狗',
      use: ['<32>{#p/human}* （你吃掉了玉米热狗。）']
   },
   i_corngoat: {
      battle: {
         description: "很像玉米热狗，但更加软糯蓬松。\n别问为啥。",
         name: '玉米热羊'
      },
      drop: () => [
         '<32>{#p/human}* （你把玉米热羊扔掉了。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom ? ['<25>{#p/asriel1}{#f/15}* ...'] : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （20 HP。）']
            : ['<32>{#p/basic}* “玉米热羊” 回复20 HP\n* 很像玉米热狗，但更加软糯蓬松。\n* 别问为啥。'],
      name: '玉米热羊',
      use: () => [
         '<32>{#p/human}* （你吃掉了玉米热羊。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? ["<25>{#p/asriel1}{#f/13}* Please don't tell me that's symbolic of anything..."]
            : [])
      ]
   },
   i_moon_pie: {
      battle: {
         description: "一小块源自地球夜空的糕点。",
         name: '月派'
      },
      drop: ['<32>{#p/human}* （你把月派扔掉了。）'],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （99 HP。）']
            : ['<32>{#p/basic}* “月派” 回复99 HP\n* 一小块源自地球夜空的糕点。'],
      name: '月派',
      use: ['<32>{#p/human}* （你吃掉了月派。）']
   },
   i_orange_soda: {
      battle: {
         description: '一瓶超级难喝的橙汁汽水。\n捏着鼻子，也不是不能喝。',
         name: '橙汁汽水'
      },
      drop: () => [
         '<32>{#p/human}* （你把橙汁汽水全倒掉了。）',
         ...((fetchCharacters()
            .find(c => c.key === 'alphys') // NO-TRANSLATE

            ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
            ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>* Did you just throw away a perfectly good orange soda?']
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? ['<32>{#p/human}* （16 HP。）']
            : ['<32>{#p/basic}* “橙汁汽水” 回复16 HP\n* 一瓶超级难喝的橙汁汽水。\n* 捏着鼻子，也不是不能喝。'],
      name: '橙汁汽水',
      use: () =>
         world.meanie
            ? [
               '<32>{#p/human}* （你喝掉了橙汁汽水，\n  喝完了，还不忘把瓶子捏烂。）',
               battler.active
                  ? `<32>{#p/story}* 你的攻击力提升了${8 + battler.at_bonus}点！`
                  : '<32>{#p/human}* （战斗外使用无效。）',
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
            : ['<32>{#p/human}* （你喝掉了橙汁汽水。）']
   },
   i_demise: {
      battle: {
         description: '...',
         name: '自作孽不可活'
      },
      drop: ["<32>{#p/human}* （你把“自作孽不可活”扔掉了。）"],
      info: ['<32>{#p/basic}* “自作孽不可活” 回复-99 HP\n* ...'],
      name: "自作孽不可活",
      use: ["<32>{#p/human}* （你吃掉了“自作孽不可活”。）"]
   },

   k_liftgate: {
      name: '升降机通行证',
      description: '新手机上自带。\n可以用来启动升降机。'
   },

   k_mystery: {
      name: '神秘钥匙',
      description: () =>
         SAVE.data.b.f_state_hapstadoor
            ? "用它解锁了镁塔顿家的大门。"
            : "从布莱蒂和凯蒂在休闲回廊\n开的杂货铺获得该钥匙。"
   },

   m_aerialis: {
      sidebarCellPms1: () => (world.bad_lizard < 2 ? '帖子（按时间倒序）' : '私聊（按时间倒序）'),
      sidebarCellPms2: '按 [X] 返回',
      sidebarCellPms3: {
         alphysBadLizard: {
            author: '系统消息',
            pm: '您所在的地区已发布疏散预警。\n请立即撤离。'
         },
         alphys0: {
            author: '系统消息',
            pm: "欢迎使用前哨站首屈一指的\n社交网络！"
         },
         alphys1: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? '呃呃呃应该就我看到了吧' 
                  : [
                     '终于见到人类了，有点伤脑筋www', 
                     '见到那人了' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys2: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? '哦那就行' 
                  : [
                     iFancyYourVilliany()
                        ? '没想到镁塔顿居然给那人\n起外号了？？？离谱'
                        : '没想到镁塔顿居然让我跟\n那人打？？？离谱', 
                     '那人好像... 还行？' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys3: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? '不然尴尬死了' 
                  : [
                     iFancyYourVilliany()
                        ? '行吧希望这事别上热搜'
                        : '行吧希望别再整出这事', 
                     '行吧希望别出啥岔子' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys4: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne
                  ? '吓死我了\n还以为那些家伙要惹人类' 
                  : [
                     '不是哥们？\n馋 冰 淇 淋 你 去 休 闲 回 廊 啊', 
                     '离谱' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys6: {
            author: '艾菲斯',
            pm: '哦不。'
         },
         alphys7: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '镁塔顿求你别这么搞我了求求了' 
                  : SAVE.data.n.state_aerialis_crafterresult === 0
                     ? '哎呀\n说实话真没想到这招居然好使233' 
                     : SAVE.data.n.bad_lizard < 1
                        ? [
                           '哇，我怎么没想到\n这些炸弹全是节目道具呢233', 
                           '不不不不不马上就赢了啊', 
                           "耶耶耶人类赢啦", 
                           '太精彩了\n谁没看到真就亏大发了' 
                        ][SAVE.data.n.state_aerialis_crafterresult - 1]
                        : '唉，那是我最后一个\n一次性飞行器了' 
         },
         alphys8: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '怪事了 我明明没给那人通行证\n那咋过来的' 
                  : '哦对了还有谁看过\n喵喵航天行吗？？？'
         },
         alphys9: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '是不是偷我备用机了' 
                  : '我刚开始看最后一季\n感觉还不错草'
         },
         alphys10: {
            author: '纳普斯特22',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '艾菲斯... 可以看一眼私信吗...\n给我回个话吧...' 
                  : '那次... 咱俩一起看的...'
         },
         alphys11: {
            author: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '纳普斯特22'
                  : SAVE.data.n.state_starton_papyrus === 0
                     ? '酷炫骷髅95'
                     : '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? "我好担心你..." 
                  : SAVE.data.n.state_starton_papyrus === 0
                     ? '你俩说的是什么“电视节目”吗？\n酷欸！' 
                     : '哦哦哦我想起来了' 
         },
         alphys12: {
            author: () => (SAVE.data.n.plot === 72 ? '_舟亢忝洐_' : '_摋掱亾耦_'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '喂，艾菲斯！\n敢把我表亲当空气是吧？！？！' 
                  : '喵喵航天行？？？\n哈，那玩意就是一坨，唐完了都。'
         },
         alphys13: {
            author: () => (SAVE.data.n.state_foundry_undyne === 1 ? '纳普斯特22' : '艾菲斯'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '别这样' 
                  : [
                     '我盲猜你是喵喵星火系列看多了吧\n对不对', 
                     '呃呃呃' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys14: {
            author: () => (SAVE.data.n.plot === 72 ? '_舟亢忝洐_' : '_摋掱亾耦_'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? "嗯？那我就眼睁睁看着\n表亲没人搭理？" 
                  : [
                     '啊对对对你说的都对但请问\n喵喵航天腥有爆炸场面吗？！', 
                     "哟嗬，咋没话了？\n我看是没本事，斗不过我吧？" 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys15: {
            author: () => (SAVE.data.n.state_foundry_undyne === 1 ? '纳普斯特22' : '艾菲斯'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '闭嘴\n不然我生气了。' 
                  : [
                     '哈哈哈笑死我了还航天腥呢\n乐子哥连打字都打不明白呢家人们', 
                     '真后悔当时忘加拉黑功能了' 
                  ][SAVE.data.n.bad_lizard]
         },
         alphys16: {
            author: () => (SAVE.data.n.state_foundry_undyne === 1 ? '纳普斯特22' : '艾菲斯'),
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '我得走了。' 
                  : '咋又开播了？？？'
         },
         alphys17: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? '呃... 我回来了\n看一眼你之前给我发了啥' 
                  : '郑重声明：\n喵喵玩偶一事，谁都当没看见。'
         },
         alphys18: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_foundry_undyne === 1
                  ? SAVE.data.n.state_aerialis_royalguards === 1
                     ? '不... 不要...\n明明警告过她们别抓人的' 
                     : "吓死我了...\n还以为她们肯定死翘翘了" 
                  : '都说了别抓人别抓人\n搞什么？？？'
         },
         alphysX0: {
            author: '系统消息',
            pm: '聊天记录已清空。'
         },
         alphysX1: {
            author: '懒骨.',
            pm: '以防万一。'
         },
         alphysX2: {
            author: '艾菲斯',
            pm: '嗯\n我都给删了'
         },
         alphysX3: {
            author: '懒骨.',
            pm: '嘿... 还记得有一次，\n教授显摆他的重力操纵板吗？'
         },
         alphysX4: {
            author: '艾菲斯',
            pm: '就他把一窝子东西整上天那次？\n哦呦 当然记得www'
         },
         alphysX5: {
            author: '懒骨.',
            pm: '噗，他当时可是信心满满呢。'
         },
         alphysX6: {
            author: '艾菲斯',
            pm: '艾斯戈尔搁那使劲够来够去的\n那场面 我记得老清楚了www'
         },
         alphysX7: {
            author: '艾菲斯',
            pm: '累死我了\n好想念当年咱们共事的时光啊衫斯'
         },
         alphysX8: {
            author: '懒骨.',
            pm: "我明白。\n但我有工作在在在在"
         },
         alphysX9: {
            author: '艾菲斯',
            pm: '...\n跑哪去了？'
         },
         alphysY1: {
            author: '懒骨.',
            pm: '抱歉，有个人类突然出现了，\n打得我措手不及。'
         },
         alphysY2: {
            author: '懒骨.',
            pm: '我没开玩笑。'
         },
         alphysY3: {
            author: '艾菲斯',
            pm: '哦... 等等，有人类来了？'
         },
         alphysY4: {
            author: '懒骨.',
            pm: "我不会为了说个双关\n还特意撒谎吧？"
         },
         alphysY5: {
            author: '艾菲斯',
            pm: '知道我要说什么吧。'
         },
         alphysY6: {
            author: '懒骨.',
            pm: "别担心，艾菲斯。\n有我在，没事的。"
         },
         alphysY7: {
            author: '艾菲斯',
            pm: '那就行'
         },
         alphysY7A1: {
            author: '艾菲斯',
            pm: '哇... 看到了吗？'
         },
         alphysY7A2: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? '帕派瑞斯和人类刚打了一架\n真是惊险'
                  : '帕派瑞斯和人类刚打了一架\n好奇怪'
         },
         alphysY7A3: {
            author: '懒骨.',
            pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? '哦？\n他没事？' : '咋了？\n出什么事了？')
         },
         alphysY7A4: {
            author: '艾菲斯',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? '嗯嗯嗯放心他没事'
                  : '呃 帕派瑞斯打人类 人类败\n人类回来接着打 又败 最后...'
         },
         alphysY7A5: {
            author: '懒骨.',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? "嘿嘿... 能感觉出来\n帕派瑞斯真是够肝的。"
                  : "嘿，快告诉我他没事。"
         },
         alphysY7A6: {
            author: '艾菲斯',
            pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? '说的太对了' : '他没事')
         },
         alphysY7A7: {
            author: '懒骨.',
            pm: () =>
               SAVE.data.n.state_papyrus_capture < 3
                  ? "等他回家，\n肯定要好好庆祝一下。"
                  : '嗯... 那就好。'
         },
         alphysYdoggo1: {
            author: '艾菲斯',
            pm: '不... 遁狗...'
         },
         alphysYdoggo2: {
            author: '懒骨.',
            pm: '啊？出什么事了？'
         },
         alphysYdoggo3: {
            author: '艾菲斯',
            pm: '他失明后 每次下班\n都会来我的实验室...'
         },
         alphysYdoggo4: {
            author: '艾菲斯',
            pm: '我和他做游戏\n靠这些游戏帮他锻炼听觉'
         },
         alphysYdoggo5: {
            author: '艾菲斯',
            pm: '每次离开时 \n都能看到他灿烂的微笑 可现在...'
         },
         alphysYdoggo6: {
            author: '懒骨.',
            pm: '明白了。'
         },
         alphysY8A1: {
            author: '艾菲斯',
            pm: '知道吗？\n那人正在星港猎杀怪物'
         },
         alphysY8A1a: {
            author: '艾菲斯',
            pm: '平民百姓都不放过'
         },
         alphysY8A1b: {
            author: '艾菲斯',
            pm: '而且专杀哨兵'
         },
         alphysY8A1c: {
            author: '艾菲斯',
            pm: '所有人都难逃厄运'
         },
         alphysY8A1d: {
            author: '艾菲斯',
            pm: '除了遁狗 其他民众也有危险'
         },
         alphysY8A2: {
            author: '懒骨.',
            pm: "知道。我正在努力疏散民众。\n不然就来不及了。"
         },
         alphysY8A3: {
            author: '艾菲斯',
            pm: '那就好'
         },
         alphysYdrake1: {
            author: '艾菲斯',
            pm: '你知道吗... \n星铁龙的妈妈前几天刚来过'
         },
         alphysYdrake2: {
            author: '艾菲斯',
            pm: '她跟我说 看到儿子交到新朋友了\n感到很骄傲...'
         },
         alphysYdrake3: {
            author: '艾菲斯',
            pm: '现在我还怎么有脸面对她？'
         },
         alphysYdrake4: {
            author: '懒骨.',
            pm: "你就跟她说，身为皇家科学员，\n你会竭尽所能。"
         },
         alphysYdrake5: {
            author: '艾菲斯',
            pm: '是啊... 也只能这么说了'
         },
         alphysYdrake6: {
            author: '懒骨.',
            pm: "起码比啥都不说强。"
         },
         alphysY8A4: {
            author: '艾菲斯',
            pm: '好险'
         },
         alphysY8A5: {
            author: '懒骨.',
            pm: "嗯...\n真不愧是我的兄弟。"
         },
         alphysY8A6: {
            author: '艾菲斯',
            pm: '嗯...'
         },
         alphysY8A7: {
            author: '艾菲斯',
            pm: '白高兴了\n那人又开始杀人了'
         },
         alphysY8A8: {
            author: '懒骨.',
            pm: '唉。'
         },
         alphysY8B1: {
            author: '艾菲斯',
            pm: '衫斯'
         },
         alphysY8B2: {
            author: '艾菲斯',
            pm: '帕派瑞斯被那人杀了'
         },
         alphysY8B3: {
            author: '艾菲斯',
            pm: '快点回消息啊衫斯别吓我'
         },
         alphysY8B4a: {
            author: '懒骨.',
            pm: "我在。怪我没看住他。"
         },
         alphysY8B4b: {
            author: '懒骨.',
            pm: "我在。怪我把他丢外面了，\n没看好他。"
         },
         alphysY8B5: {
            author: '艾菲斯',
            pm: '现在咋办？'
         },
         alphysY8B6: {
            author: '懒骨.',
            pm: '我直说吧，艾菲斯。'
         },
         alphysY8B7: {
            author: '懒骨.',
            pm: "还能咋办？\n我啥也做不了。"
         },
         alphysY8B8: {
            author: '艾菲斯',
            pm: '衫斯...'
         },
         alphysY8B9: {
            author: '懒骨.',
            pm: "错不在你，这就是命。"
         },
         alphysY8B10: {
            author: '艾菲斯',
            pm: '啥意思？'
         },
         alphysY8B11: {
            author: '懒骨.',
            pm: '帕派瑞斯的性格，你也清楚。'
         },
         alphysY8B12: {
            author: '懒骨.',
            pm: "他太善良了，\n看着别人一个个死去..."
         },
         alphysY8B13: {
            author: '艾菲斯',
            pm: '绝不会像我们一样，\n坐视不管，对吧？'
         },
         alphysY8B14: {
            author: '懒骨.',
            pm: '对。'
         },
         alphysY8B15: {
            author: '艾菲斯',
            pm: '...'
         },
         alphysY8B16: {
            author: '艾菲斯',
            pm: '事态没有任何好转'
         },
         alphysY8B17: {
            author: '懒骨.',
            pm: "我猜猜看，\n那人现在又盯上铸厂居民了?"
         },
         alphysY8B18: {
            author: '艾菲斯',
            pm: '嗯\n你会帮我疏散的对吧？'
         },
         alphysY8B18x: {
            author: '艾菲斯',
            pm: '不好说\n咱们得快点疏散大家了'
         },
         alphysY8B19: {
            author: '懒骨.',
            pm: "不保证一定行，\n但我会尽力。"
         },
         alphysY8B20: {
            author: '艾菲斯',
            pm: '谢了'
         },
         alphysY8C1: {
            author: '艾菲斯',
            pm: '衫斯 铸厂居民有难了'
         },
         alphysY8C2a: {
            author: '艾菲斯',
            pm: '那人到处惹事... \n连特战队都没拦住'
         },
         alphysY8C2b: {
            author: '艾菲斯',
            pm: '那人到处惹事... \n平民百姓都遭殃了'
         },
         alphysY8C2c: {
            author: '艾菲斯',
            pm: '见过那人的... 全死了'
         },
         alphysY8C3a: {
            author: '懒骨.',
            pm: '哦，还好还好。\n你快去疏散大家啊。'
         },
         alphysY8C3b: {
            author: '懒骨.',
            pm: "嘿，你快去疏散大家啊。"
         },
         alphysY8C4: {
            author: '艾菲斯',
            pm: '哦对我现在就去'
         },
         alphysY8C5: {
            author: '艾菲斯',
            pm: '出发'
         },
         alphysY8C6: {
            author: '懒骨.',
            pm: "加油，艾菲斯。\n到时候我会尽力帮你。"
         },
         alphysY8C7: {
            author: '艾菲斯',
            pm: '谢了'
         },
         alphysY8C8: {
            author: '艾菲斯',
            pm: '坏了'
         },
         alphysY8C9: {
            author: '艾菲斯',
            pm: '安黛因要跟那人开打了'
         },
         alphysY8C10a: {
            author: '艾菲斯',
            pm: '有点慌'
         },
         alphysY8C10b: {
            author: '艾菲斯',
            pm: '说实话\n还蛮兴奋的'
         },
         alphysY8C11a: {
            author: '艾菲斯',
            pm: '不不不我都快慌死了'
         },
         alphysY8C11b: {
            author: '艾菲斯',
            pm: '不过也有点慌'
         },
         alphysY8C12a: {
            author: '懒骨.',
            pm: "你是不是该做点啥？"
         },
         alphysY8C12b: {
            author: '懒骨.',
            pm: "你不是说，\n会想办法避免战斗吗？"
         },
         alphysY8C13a: {
            author: '艾菲斯',
            pm: '是啊\n但安黛因肯定不听我劝'
         },
         alphysY8C13b: {
            author: '艾菲斯',
            pm: '没必要啦 那人都走到这了\n想过安黛因这关就是洒洒水啦'
         },
         alphysY8C14: {
            author: '懒骨.',
            pm: '这样啊。\n那好吧。'
         },
         alphysY8D1: {
            author: '艾菲斯',
            pm: '哦'
         },
         alphysY8D1a1: {
            author: '艾菲斯',
            pm: '看来对那人来说\n杀了帕派瑞斯还不过瘾'
         },
         alphysY8D1a2: {
            author: '艾菲斯',
            pm: '看来对那人来说\n杀光特战队还不过瘾'
         },
         alphysY8D1a3: {
            author: '艾菲斯',
            pm: '看来对那人来说\n杀光犬卫队还不过瘾'
         },
         alphysY8D1a4: {
            author: '艾菲斯',
            pm: '看来对那人来说\n杀了铸厂居民还不过瘾'
         },
         alphysY8D1a5: {
            author: '艾菲斯',
            pm: '看来对那人来说\n杀了星港居民还不过瘾'
         },
         alphysY8D1b: {
            author: '艾菲斯',
            pm: '算了'
         },
         alphysY8D1c1: {
            author: '艾菲斯',
            pm: '糟透了'
         },
         alphysY8D1c2: {
            author: '懒骨.',
            pm: '咋了？'
         },
         alphysY8D1c3: {
            author: '艾菲斯',
            pm: '为了抓住人类 她到处追赶\n结果踩到金属电网...'
         },
         alphysY8D1c4: {
            author: '艾菲斯',
            pm: '她是不是... 陨落了'
         },
         alphysY8D1x: {
            author: '艾菲斯',
            pm: '好耶\n那人饶恕她了'
         },
         alphysY8D2a: {
            author: '懒骨.',
            pm: "对不起，艾菲斯。\n我想帮忙，但无能为力。"
         },
         alphysY8D2b: {
            author: '懒骨.',
            pm: "对不起，艾菲斯。\n你救不了她的。"
         },
         alphysY8D2x: {
            author: '艾菲斯',
            pm: '不过这么看 那人也快到这了\n不想应付他了'
         },
         alphysY8D3a: {
            author: '艾菲斯',
            pm: () =>
               world.bad_lizard < 2
                  ? '衫斯我居然啥都没做\n眼睁睁地看着她死，啥都没做'
                  : '我当初为什么不早点\n离开实验室呢'
         },
         alphysY8D3b1: {
            author: '艾菲斯',
            pm: '也许只是个意外\n但我不敢打包票'
         },
         alphysY8D3b2: {
            author: '艾菲斯',
            pm: '不知道那人接下来\n还要干啥坏事呢'
         },
         alphysY8D3x: {
            author: '艾菲斯',
            pm: '还是离开实验室比较保险'
         },
         alphysY8D4: {
            author: '懒骨.',
            pm: () =>
               world.bad_lizard < 2
                  ? "还是给自己留点时间\n好好缓缓吧。"
                  : "行，你走吧。\n我会继续监视那人。"
         },
         alphysY8D4x: {
            author: '懒骨.',
            pm: "想走就走吧。\n我会继续监视那人。"
         },
         alphysY8D5: {
            author: '艾菲斯',
            pm: () =>
               world.bad_lizard < 2
                  ? '嗯... 确实得缓缓'
                  : '谢了 但别离太近\n那人随时可能下手'
         },
         alphysY8D6: {
            author: '懒骨.',
            pm: () =>
               world.bad_lizard < 2
                  ? '那就好，记得带上备用机，\n这样出了实验室也能联系。'
                  : "我没事，记得带上备用机，\n这样出了实验室也能联系。"
         },
         alphysY8D7: {
            author: '艾菲斯',
            pm: '哦对我差点忘了'
         },
         alphysY8D8: {
            author: '懒骨.',
            pm: "还有，走之前记得\n清空聊天记录。"
         },
         alphysY8D9: {
            author: '艾菲斯',
            pm: '放心我会清空的'
         },
         alphysZ1: {
            author: '艾菲斯',
            pm: '...\n跑哪去了？'
         },
         alphysZ2: {
            author: '艾菲斯',
            pm: '衫斯你别吓我'
         },
         alphysZ3: {
            author: '艾菲斯',
            pm: '不不不不不不不\n你肯定在整我对吧快回消息啊'
         },
         alphysZ4: {
            author: '艾菲斯',
            pm: '别开玩笑了衫斯\n你不会死的你肯定不会死的'
         },
         alphysZ5: {
            author: '艾菲斯',
            pm: '衫斯你还活着对吧\n快告诉我'
         },
         alphysZ6: {
            author: '艾菲斯',
            pm: '要是我说错话惹到你了我道歉'
         },
         alphysZ7: {
            author: '艾菲斯',
            pm: '求求你了回个消息吧衫斯\n别一直沉默啊'
         },
         alphysZ8: {
            author: '艾菲斯',
            pm: '唉... 我回来了\n你兄弟死了'
         },
         alphysZ9: {
            author: '艾菲斯',
            pm: '刚办了点事 一回来他就不见了\n肯定是死了'
         },
         alphysZ10: {
            author: '艾菲斯',
            pm: '嗯... 衫斯'
         },
         alphysZ11: {
            author: '艾菲斯',
            pm: '我不知道你有没有在天之灵\n但是'
         },
         alphysZ12: {
            author: '艾菲斯',
            pm: '安黛因死了'
         },
         alphysZ13: {
            author: '艾菲斯',
            pm: '安黛因死了\n我他妈却不知道该怎么办'
         },
         alphysZ14: {
            author: '艾菲斯',
            pm: '对不起'
         },
         alphysZ15: {
            author: '艾菲斯',
            pm: '我要走了。'
         },
         alphysZ16: {
            author: '艾菲斯',
            pm: '见鬼\n我他妈为啥还在和你发消息'
         },
         alphysZ17: {
            author: '艾菲斯',
            pm: '哦对了'
         },
         alphysZ18: {
            author: '艾菲斯',
            pm: '一直是那朵星花在搞鬼'
         }
      },
      sidebarCellPms4: '（新消息）'
   },

   n_shop_bpants: {
      exit: () =>
         world.population === 0 || burger()
            ? world.bullied && !world.genocide && !burger()
               ? ['<32>{#p/basic}{#k/6}* 欢迎下次光临，小恶霸。']
               : ['<32>{#p/basic}{#k/6}* 欢迎下次光临，小魔头。']
            : ['<32>{#p/basic}{#k/6}* 欢迎下次光临，小家伙。'],
      item: () =>
         world.runaway
            ? [
               '0G - 新星咖啡',
               '0G - 星园烁宠',
               '0G - 猛男汉堡',
               SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "0G - 老滑头的爱",
               '离开'
            ]
            : SAVE.data.n.plot === 72
               ? [
                  '5G - 新星咖啡',
                  '10G - 星园烁宠',
                  '5G - 猛男汉堡',
                  SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "49G - 老滑头的爱",
                  '离开'
               ]
               : world.genocide || world.killed0 || burger()
                  ? [
                     '32G - 新星吗啡',
                     '60G - 猩猿硕虫',
                     '48G - 猛烂汉堡',
                     SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "138G - 安黛因的哀",
                     '离开'
                  ]
                  : [
                     '16G - 新星咖啡',
                     '30G - 星园烁宠',
                     '24G - 猛男汉堡',
                     SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "69G - 老滑头的爱",
                     '离开'
                  ],
      itemInfo: () =>
         world.genocide || world.killed0 || burger()
            ? [
               '回复-23 HP\n换谁来尝\n都得齁死。',
               '回复-40 HP\n算个屁的\n英雄。',
               '回复-34 HP\n抗争与否，\n都会被伤害。',
               '回复-55 HP\n天打雷劈\n劈不死你，\n就把它给你。'
            ]
            : [
               '回复23 HP\n有人嫌太甜\n有人超留恋。',
               '回复40 HP\n英雄，\n不再只是个\n传说。',
               '回复34 HP\n不想被伤害\n就要去抗争。',
               "Heals 55HP\n这事...\n说来话长啊。"
            ],
      itemPrompt: () =>
         world.population === 0 || burger()
            ? '<09>{#p/basic}{#k/7}您想\n要点什么？'
            : '<09>{#p/basic}{#k/0}你想\n买点什么？',
      itemPurchase: () =>
         world.population === 0 || burger()
            ? [
               world.bullied && !world.genocide && !burger()
                  ? '<09>{#p/basic}{#k/5}谢谢惠顾，\n小恶霸。'
                  : '<09>{#p/basic}{#k/5}谢谢惠顾，\n小魔头。',
               '<09>{#p/basic}{#k/7}您是\n买东西呢，\n还是...？',
               "<09>{#p/basic}{#k/6}这点钱...\n对不上账啊。",
               "<10>{#p/human}(你带的东西\n太多了。）"
            ]
            : [
               '<09>{#p/basic}{#k/0}谢了，\n小家伙。',
               '<09>{#p/basic}{#k/1}不想买东西，\n是想...？',
               "<09>{#p/basic}{#k/6}这点钱...\n对不上账啊。",
               "<10>{#p/human}(你带的东西\n太多了。）"
            ],
      itemPurchasePrompt: () => (world.runaway ? '偷走吗？' : '花$(x)G\n买它吗？'),
      itemUnavailable: () =>
         world.runaway
            ? '<09>{#p/basic}空无一物。'
            : world.population === 0 || burger()
               ? '<09>{#p/basic}{#k/5}真抱歉呢，\n只有一块。'
               : '<09>{#p/basic}{#k/4}抱歉，\n只有一块。',
      menu: () =>
         world.runaway ? ['拿取', '偷窃', '阅读', '离开'] : ['购买', world.meanie ? '偷窃' : '出售', '交谈', '离开'],
      menuPrompt1: () =>
         world.population === 0 || burger()
            ? world.bullied && !world.genocide && !burger()
               ? '<23>{#p/basic}{#k/5}* 哎呀欢迎光临啊小恶霸。'
               : '<23>{#p/basic}{#k/5}* 哎呀欢迎光临啊小魔头。'
            : '<23>{#p/basic}{#k/0}* 想来点什么呢，小家伙？',
      menuPrompt2: () =>
         world.population === 0 || burger()
            ? '<23>{#p/basic}{#k/7}* 您还有何贵干？'
            : '<23>{#p/basic}{#k/0}* 还想来点别的吗？',
      menuPrompt3: '<23>{#p/basic}* ...但是大家都逃走了。',
      note: ['<32>{#p/human}* （但没有人给你留字条。）'],
      sell1: () =>
         world.runaway
            ? ['<30>{#p/human}* （你从柜台后面拿走了2048G。）']
            : world.genocide || world.killed0 || burger()
               ? [
                  '<30>{#p/basic}{#k/7}* ...',
                  ...(SAVE.storage.inventory.size < 8
                     ? [
                        '<30>{#k/4}* 好。\n* 给您。',
                        "<30>{#k/5}* 这是专门给阁下准备的，\n  独一无二的东西呢。",
                        "<30>{#p/human}* （你获得了“自作孽不可活”。）"
                     ]
                     : [
                        '<30>{#p/basic}{#k/7}* 您既然这么想偷东西，\n  事先怎么不给口袋腾点地方呢？'
                     ])
               ]
               : world.meanie
                  ? ['<30>{#p/basic}{#k/1}* ...', '<30>{#k/4}* ...', '<30>{#k/3}* 想干啥？']
                  : [
                     '<30>{#p/basic}{#k/1}* ...',
                     '<30>{#k/4}* ...',
                     "<30>{#k/6}* 哇，你可真是个大聪明。",
                     "<30>{#k/7}* 嗯...\n* 我觉得，你要是想卖东西的话，\n  就去找布莱蒂和凯蒂试试。",
                     '<30>{#k/0}* 你好好推销推销，\n  她们指定会... \n  呃... “上钩”的。'
                  ],
      sell2: () =>
         world.runaway
            ? ['<30>{#p/basic}* 空无一物。']
            : SAVE.data.b.a_state_freesell
               ? ['<30>{#p/basic}{#k/6}* 不好意思。\n  一位杀人魔限领一份哦。']
               : ["<30>{#p/basic}{#k/6}* 这事找我没戏，小家伙。"],
      talk: () =>
         SAVE.data.n.plot === 72
            ? ['Romantic Advice', '镁塔顿', 'Where To Go Next', 'My Future', '离开']
            : [
               ['人生感悟', '§fill=#ff0§Taking Charge (NEW)', 'Taking Charge'][
               Math.min(SAVE.data.n.shop_bpants_advice, 2)
               ],
               '镁塔顿',
               postSIGMA()
                  ? '突然停电'
                  : ['我们在哪', '§fill=#ff0§Glyde (NEW)', '老滑头'][Math.min(SAVE.data.n.shop_bpants_hub, 2)],
               '你的未来',
               '离开'
            ],
      talkPrompt: () =>
         world.population === 0 || burger()
            ? world.bullied && !world.genocide && !burger()
               ? '<09>{#p/basic}{#k/0}小恶霸，\n想来套话？'
               : '<09>{#p/basic}{#k/0}小魔头，\n想来套话？'
            : '<09>{#p/basic}{#k/0}给你传授点\n经验，\n小家伙。',
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
                     '<32>{#p/basic}{#k/6}* 人生感悟...',
                     "<32>{#k/6}* 哎呀，真没想到呢。\n  阁下在这方面不是\n  经验丰富，知识渊博吗？",
                     "<32>{#k/5}* 依我看，阁下根本不擅长“人生”，\n  只擅长它的反义词——“兽死”吧。"
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
                  ? ['<32>{#p/basic}{#k/8}* 镁塔顿。', '<32>{#k/4}* ...', "<32>{#k/6}* 嗯，死了。"]
                  : (world.genocide || world.bad_robot) && 68 <= SAVE.data.n.plot
                     ? SAVE.data.n.shop_bpants_mtt2++ < 1
                        ? [
                           '<32>{#p/basic}{#k/4}* 镁塔顿...',
                           "<32>{#k/4}* 我本想骂他两句，但，呃...\n* 既然您杀了他...",
                           "<32>{#k/5}* 那我无话可说了。"
                        ]
                        : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* 一句话我不想说第二遍。"]
                     : SAVE.data.n.shop_bpants_mtt1++ < 1
                        ? world.population === 0 || burger()
                           ? [
                              '<32>{#p/basic}{#k/4}* 镁塔顿...',
                              "<32>{#k/6}* 要是换平常，我肯定骂他两句，\n* 但跟您一比，他简直就是天使啊。",
                              '<32>{#k/5}* 您也是真有本事，\n  能把人恶心成这样...\n  也算是前无古人了。'
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
                        : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* 一句话我不想说第二遍。"],
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
                     '<32>{#p/basic}{#k/7}* 你一说，我也发现，\n  附近突然都变得好安静。',
                     "<32>{#k/6}* 只是这么一整，\n  就我这里电力还好好的。\n* 不停电，都闲不住呢。",
                     '<32>{#k/4}* 说不定是因为\n  前不久我从核心拉了一条线\n  直接供电，才没断电。',
                     "<32>{#k/5}* 嘘... 别告诉其他人。\n  这可是商业秘密。"
                  ]
                  : world.population === 0 || burger()
                     ? [
                        '<32>{#p/basic}{#k/0}* ...',
                        "<32>{#k/0}* 朋友，我们在地狱。\n* 无间地狱。",
                        '<32>{#k/1}* ...',
                        "<32>{#k/3}* 哈哈哈跟您聊天真是太有意思了\n  您说是不是呀亲爱的？！？！"
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
                        '<32>{#p/basic}{#k/5}* 我的未来？\n* 小恶霸，你问我，我也不知道啊...',
                        '<32>{#p/basic}{#k/6}* 之后怎么活，\n  我还想问你呢。'
                     ]
                     : [
                        '<32>{#p/basic}{#k/5}* 哎呦呦呦我最最亲爱的哭哭啼啼\n  又蠢又苯嗜血成性臭不要脸\n  唐的不要不要的小魔头啊...',
                        "<32>{#k/6}* 我的未来还轮不到你操心。",
                        "<32>{#k/2}* 而且，有个老伙计告诉过我，\n  我在这待着肯定安全。",
                        "<32>{#k/5}* 因为你根本打不了我。"
                     ]
                  : [
                     '<32>{#p/basic}{#k/0}* 我的未来？\n* 小家伙啊，操心我的前途之前...',
                     '<32>{#k/3}* 先想想自己怎么过活吧！',
                     '<32>{#k/4}* ...',
                     "<32>{#k/6}* 伙计你放心。\n* 只要我摆脱了那个臭铁皮盒子，\n  马上就能转运了。"
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
               '0G - 太空垃圾',
               SAVE.data.b.item_laser ? '0G - 激光步枪？' : '0G - 激光步枪',
               SAVE.data.b.item_visor ? '0G - 战术护目镜？' : '0G - 战术护目镜',
               SAVE.data.b.item_mystery_key ? '§fill=#808080§---- 售罄 ----' : '0G - 神秘钥匙',
               '离开'
            ]
            : [
               '5G - 太空垃圾',
               SAVE.data.b.item_laser ? '60G - 激光步枪？' : '70G - 激光步枪',
               SAVE.data.b.item_visor ? '60G - 战术护目镜？' : '70G - 战术护目镜',
               SAVE.data.b.item_mystery_key ? '§fill=#808080§---- 售罄 ----' : '400G - 神秘钥匙',
               '离开'
            ],
      itemInfo: () => [
         '回复?? HP\n可能是垃圾，\n也可能是\n战斗机。',
         SAVE.data.b.item_laser
            ? '武器：12攻击\n(当前攻击$(x))\n难用，但有力。\n仿制品。'
            : '武器：12攻击\n(当前攻击$(x))\n不易驾驭，\n却威力十足。',
         SAVE.data.b.item_visor
            ? '防具：12防御\n(当前防御$(x))\n瞄准更容易。\n仿制品。'
            : '防具：12防御\n(当前防御$(x))\n让武器\n瞄准更容易。',
         '特殊物品：\n也许能帮你\n进入某处。'
      ],
      itemPrompt: '<99>{#p/basic}{#k/0/9}{@fill=#d4bbff}You\nshould\nbuy ALL\nour stuff!',
      itemPurchase: [
         "<09>{#p/basic}{#k/1/8}{@fill=#d4bbff}Bratty!\nWe're gonna be rich!",
         '<09>{#p/basic}{#k/0/4}{@fill=#d4bbff}So are you gonna buy it??',
         '<09>{#p/basic}{#k/4/5}{@fill=#d4bbff}You need WAY more money.',
         "<10>{#p/human}(你带的东西\n太多了。）"
      ],
      itemPurchasePrompt: () =>
         adultEvac()
            ? shopper.listIndex === 3
               ? '挂到钥匙串\n上面吗？'
               : '偷走吗？'
            : shopper.listIndex === 3
               ? '花$(x)G买下，\n挂到钥匙串\n上面吗？'
               : '花$(x)G\n买它吗？',
      itemUnavailable: () =>
         adultEvac()
            ? '<09>{#p/basic}空无一物。'
            : "<09>{#p/basic}{#k/5/1}{@fill=#d4bbff}We're all sold out!\nMee-YOW!",
      menu: () =>
         adultEvac() ? ['拿取', '偷窃', '阅读', '离开'] : ['购买', world.meanie ? '偷窃' : '出售', '交谈', '离开'],
      menuPrompt1: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* Check it out!',
      menuPrompt2: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* No rush or anything.',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是谁也没有来。',
      note: () => [
         "<32>{#p/basic}* 你找到几张字条。",
         {
            b: '<16>* “既然你看到了\n   这段话...”',
            c: world.bullied
               ? '<16>* “那么，有个坏消息\n   等着你，\n   招人烦的怪胎！”'
               : '“那么，有个坏消息\n   等着你，\n   没良心的怪胎！”'
         },
         ...(SAVE.data.n.plot === 72 && !world.runaway
            ? [
               {
                  b: '<16>* “我们才不想\n   再回到这，等着...”',
                  c: '<16>* “...等着你把我们\n  都揍个遍。”'
               },
               {
                  b: '<16>* “我们要去新世界啦！\n   在那里...”',
                  c: '<16>* “...我们富得\n   流油呢！”'
               },
               {
                  b: '<16>* “所以，\n   小店就送给你啦。”',
                  c: '<16>* “对对对！！”\n* “那些破烂\n   你随便偷！”'
               },
               {
                  b: '<16>* “彩笔快用完了，\n   所以...”',
                  c: '<16>* “就写这些吧。”'
               },
               {
                  b: '<16>* “字条你爱看看，\n  不看拉倒！”',
                  c: '<16>* “喵哈哈！！！”'
               },
               { b: '<16>* “以上，\n   布莱蒂 <3”', c: '<16>* “以上，\n   凯蒂 <3”' }
            ]
            : [
               ...[
                  [
                     !world.badder_lizard
                        ? {
                           b: '<16>* “我们才不想\n   在这傻等，等着...”',
                           c: '<16>* “...等着你把我们\n  都揍个遍。”'
                        }
                        : {
                           b: '<16>* “刚刚，\n   艾菲斯来到这里，\n   把我们带到...”',
                           c: '<16>* “...带到一个\n   炒鸡安全的地方！”'
                        },
                     {
                        b: '<16>* “不过，走之前，\n   我们得把这些彩笔\n   用完。”',
                        c: !world.badder_lizard
                           ? '<16>* “是的呢。\n   咱可不能糟蹋笔！”'
                           : '<16>* “是啊。”\n* “冷静点，艾菲斯！\n   咱可不能糟蹋笔！”'
                     },
                     {
                        b: '<16>* “对了，\n   想偷我们的宝贝？\n   门都没有！”',
                        c: '<16>* “是啊，\n   你个大垃圾！”\n* “别碰我们的\n   垃圾！”'
                     },
                     {
                        b: '<16>* “说清楚点，明明是\n   ‘二手旧垃圾’。”',
                        c: '<16>* “是的呢。\n   我们的古董店\n   里面全是宝！”'
                     }
                  ],
                  [
                     {
                        b: '<16>* “刚刚，\n   镁塔顿来这里，\n   把我们带到...”',
                        c: '<16>* “...带到一个\n   炒鸡安全的地方！”'
                     },
                     { b: '<16>* “不过，艾菲斯...”', c: '<16>* “对，艾菲斯。”' },
                     { b: '<16>* “她看起来...”', c: '<16>* “...肺都要气炸了。”' },
                     {
                        b: '<16>* “第一次看到她\n   气成那样。”',
                        c: '<16>* “第一次看到\n   有人会气成那样。”',
                        s: true
                     },
                     { b: '<16>* “而且，\n  镁塔顿...”', c: '<16>* “...也不咋高兴。”' },
                     {
                        b: '<16>* “他说要扇死你。”',
                        c: '<16>* “他说要踹死你！”',
                        s: true
                     },
                     { b: '<16>* “哦，他好像还说\n   要彻底灭了你。\n   ...是吧？”', c: '<16>* “呃... 忘了。”' },
                     { b: '<16>* “反正，看到这，\n  你肯定都\n  吓尿裤子了呢。”', c: '<16>* “哎呀，说得太对了...”' }
                  ]
               ][Math.max(world.bad_lizard - 2, 0)],
               {
                  b: '<16>* “总之，\n   你就是个废物，\n   彻头彻尾的废物。”',
                  c: '<16>* “对！”\n* “废物！！”\n* “喵哈哈！！！”'
               },
               { b: '<16>* “以上，\n   布莱蒂 <3”', c: '<16>* “以上，\n   凯蒂 <3”', s: true }
            ])
      ],
      sell1: () =>
         adultEvac()
            ? ['<30>{#p/human}* （你从收银机里拿走了5G。）']
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
            ? ['<30>{#p/basic}* 空无一物。']
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
            ? ['Is Everyone Okay', 'Godlike Being', 'OuterNet Shutdown', 'The Humans', '离开']
            : [
               'About You Two',
               SAVE.data.n.plot < 68 ? 'Thrift Shop' : SAVE.data.b.killed_mettaton ? '镁塔顿' : 'Grand Finale',
               ['Area Ownership', '§fill=#ff0§Burgie (NEW)', '堡堡'][Math.min(SAVE.data.n.shop_gossip_hub, 2)],
               ['艾菲斯', '§fill=#ff0§Royal Scientist (NEW)', '§fill=#ff0§Asgore (NEW)', '艾斯戈尔'][
               Math.min(SAVE.data.n.shop_gossip_alphys, 3)
               ],
               '离开'
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
                     c: '<16>* 喵哈哈！',
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
                        c: '<16>* 喵哈哈！',
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
         name: '空境 - 实验室',
         text: () =>
            SAVE.data.n.plot < 65
               ? ['<32>{#p/human}* （皇家实验室就在眼前，\n  这使你充满了决心。）']
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
         name: '空境 - 升降机',
         text: ['<32>{#p/human}* （从一个地方\n  传送到另一个地方\n  使你充满了决心。）']
      },
      a_elevator1: {
         name: '空境 - 电梯右一层',
         text: () =>
            SAVE.data.n.plot < 65
               ? ['<32>{#p/human}* （用爆炸来飞渡穿行，\n  这使你充满了决心。）']
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
         name: '空境 - 二号舞台',
         text: () =>
            SAVE.data.n.plot < 65
               ? SAVE.data.b.a_state_hapstablook
                  ? [
                     '<32>{#p/human}* （思考着这位电视明星的故事，\n  这使你充满了决心。）'
                  ]
                  : ["<32>{#p/human}* （镁塔顿这番荒唐的胡闹\n  使你充满了决心。）"]
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
         name: '空境 - 喷泉',
         text: () =>
            SAVE.data.n.plot < 65
               ? SAVE.data.b.a_state_hapstablook
                  ? ["<32>{#p/human}* (The anticipation of Mettaton's intervention fills you with determination.)"]
                  : ['<32>{#p/human}* （这座建在荒无人烟的地方的喷泉\n  使你充满了决心。）']
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
         name: '空境 - 休闲回廊',
         text: () =>
            SAVE.data.b.ubershortcut
               ? ['<32>{#p/human}* (Taxi rides to unfamiliar places fill you with determination.)']
               : 68 <= SAVE.data.n.plot
                  ? ['<32>{#p/human}* (Returning to this corner of corny comforts fills you with determination.)']
                  : SAVE.data.b.a_state_hapstablook
                     ? ["<32>{#p/human}* (Learning Mettaton's backstory fills you with determination.)"]
                     : ['<32>{#p/human}* （那场过于戏剧化的音乐剧\n  使你充满了决心。）']
      },
      a_core_entry1: {
         name: '空境 - 核心',
         text: ['<32>{#p/human}* (The cold and computerized aesthetic in this area fills you with determination.)']
      },
      a_core_checkpoint: {
         name: '核心 - 维护区',
         text: () =>
            SAVE.data.b.ubershortcut
               ? ['<32>{#p/human}* (The air is calm and peaceful, filling you with determination.)']
               : SAVE.data.n.plot < 68
                  ? ["<32>{#p/human}* (The anticipation of Mettaton's grand finale fills you with determination.)"]
                  : SAVE.data.n.plot === 72
                     ? [
                        '<32>{#p/human}* （核心的能量即将耗竭...）',
                        '<32>{#p/human}* （这使你充满了决心。）'
                     ]
                     : [
                        '<32>{#p/human}* (The thought of unnecessarily backtracking to the CORE...)',
                        '<32>{#p/human}* （这使你充满了决心。）'
                     ]
      }
   }
};


// END-TRANSLATE
