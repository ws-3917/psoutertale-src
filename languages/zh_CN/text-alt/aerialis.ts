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
    frontEnder,
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
                ? ['<32>{#p/human}* （看来控制台\n  超出了你的访问级别。）']
                : world.runaway
                    ? ["<32>{#p/basic}* 核心控制台。\n* 看来，能量所剩不多了。"]
                    : [
                        world.postnoot
                            ? "<32>{#p/basic}* 核心控制台。\n* 近期，供气系统被人动过手脚。"
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
                    choicer.create('* （砸烂控制台吗？）', '砸烂', '算了')
                ]
                : [])
        ],
        termsmash1: ['<32>{#p/human}* （你放弃了砸终端的念头。）'],
        termsmash2: ['<32>{#p/human}* （你挥动武器，砸了下去...）'],
        puzzlenoot1: () => [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            world.nootflags.has('a_barricade1') // NO-TRANSLATE

                ? '<25>{#p/alphys}{#g/alphysInquisitive}* 这谜题自己被解决了？'
                : "<25>{#p/alphys}{#g/alphysInquisitive}* 啊，这谜题\n  已经被解决了。",
            '<25>{#p/alphys}{#g/alphysFR}* 怪事。',
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        puzzlenoot2: () => [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            world.nootflags.has('a_puzzle1') // NO-TRANSLATE

                ? "<25>{#p/alphys}{#g/alphysWelp}* 还有这个。\n* 也被解决了。"
                : "<25>{#p/alphys}{#g/alphysWelp}* 啊...\n  看来这谜题已经被某人解决了。",
            "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 还挺省事的！！",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        noequip: ['<32>{#p/human}* （你打算不这么做。）'],
        evac: ['<32>{#p/human}* （你感觉周围的怪物越来越少了。）'],
        endo: ['<32>{#p/human}* （你注意到这桌子的质量堪忧。）'],
        businessKILLER: [
            '<32>{#p/basic}{#npc/a}* 只是想让你知道，小子...',
            "<32>* 皇家卫队很快\n  就会将你绳之以法。",
            "<32>* 所以啊，准备跑路吧小子。",
            "<32>* 但这只是我的态度罢了。"
        ],
        harpyKILLER: ["<32>{#p/basic}* 呼嘿嘿吼...\n* 我嘞个天，\n  我感觉我有性命之忧！"],
        shopclosed: ['<32>{#p/human}* （没必要再踏足了。）'],
        afear: [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* 呃，嘿...',
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* 抱歉让你...\n  逃跑什么的...',
            '<25>{#p/alphys}{#g/alphysIDK}* ...',
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* 你还好对吧？\n* 你没有...",
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* 你没有再惹出什么麻烦，\n  对吧？",
            '<25>{#p/alphys}{#g/alphysSideSad}* ...',
            "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* 请...\n* 别再做什么疯狂的事了，\n  好吗？",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        escape: [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysCutscene1}* 太好了，你逃过来了！',
            '<25>{#g/alphysInquisitive}* 对了，刚才打电话时，\n  我怕被发现，就没开视频...',
            '<25>{#g/alphysYeahYouKnowWhatsUp}* 你别介意...',
            "<25>{#g/alphysIDK}* 当时...\n  我-我真挺慌的。",
            '<25>{#g/alphysNervousLaugh}* 不过我给你支的招\n  好像挺有用？',
            '<25>{#g/alphysNeutralSweat}* 呃，其实...',
            "<25>* 安黛因还在追杀你。",
            '<25>{#g/alphysNervousLaugh}* 我把空境的电梯停掉了，\n  可她有喷气背包，\n  早晚也会飞过来的。',
            
            '<25>{#g/alphysNeutralSweat}* 所以...\n  你-你千万别逗留，快走。',
            "<25>* 另一台电梯离这儿不远。\n* 你肯定找得到！",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        approachescape: ['<32>{#p/human}* （你听到脚步声逐渐消失在远方。）'],
        puzzlehelp: [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            "<25>{#p/alphys}{#g/alphysWelp}* 打你电话只是跟你\n  说一下，如果遇到困难\n  可以随时找我帮忙。",
            "<25>{#p/alphys}{#g/alphysCutscene2}* 你在这个房间探索的时候，\n  我会把我的手机\n  一直开着的！",
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
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 大家都知道\n  那首从音乐盒里传来的老歌...',
                '<32>{#p/basic}{#npc/a}* ...你知道它还有别的版本吗？\n* 前几段还行。'
            ],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 不要把手脚伸出船外...',
                '<32>{#p/basic}{#npc/a}* ...当然，\n  管好你的灵魂才是最重要的。'
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 我听闻托丽尔有一款钟情的饮品。'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 我听闻艾斯戈尔有一款钟情的美食。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 谨记我们伟大的国王艾罗戈...',
                '<32>{#p/basic}{#npc/a}* ...以及他的儿子。'
            ],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 提米村庄...',
                '<32>{#p/basic}{#npc/a}* ...坐落在短梯子左边的房间里。'
            ],
            ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 要不要和我一同轻唱几声？\n* 恰啦啦。"],
            ["<32>{#p/basic}{#npc/a}* 嗯哼哼...\n* 嗯哼哼...\n* 这是我的小型音乐会。"],
            ['<32>{#p/basic}{#npc/a}* 摸摸摸...\n* 脖子延伸到宇宙。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 记得付路费...',
                '<32>{#p/basic}{#npc/a}* ...时间与空间都弥足珍贵。'
            ],
            ['<32>{#p/basic}{#npc/a}* 人类，怪物...\n* 群星。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 玉米热狗，多多益善...',
                '<32>{#p/basic}{#npc/a}* ...要是它们能一直\n  待在你头上就好了。'
            ],
            [
                "<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 别随便偷看别人的工作场所...",
                '<32>{#p/basic}{#npc/a}* ...他们可能会把你当成小偷。'
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速路上有点颠簸。'],
            ['<33>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速路上很平稳。'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦\n* 皇家科学员也有自己的秘密...'],
            ['<32>{#p/basic}{#npc/a}* 一，二，三，四，五，六...', '<32>* ...已经到极限了。'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 那个机器人巨星也有着不幸的过去...'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 嘀哩哩。\n* 啼嘞嘞。'],
            
            ['<32>{#p/basic}{#npc/a}* 叮咯咯。\n* 吐噜噜。', '<32>* ...啊啦，拟音字都用完了。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 记得每天都要吃一个幽灵水果。',
                "<32>{#p/basic}{#npc/a}* ...为什么？\n* 这样我就知道你有听我的话了..."
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 你有没有听说过群星之歌？'],
            [
                "<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 有什么游戏可以和狗狗一起玩呢？",
                '<32>{#p/basic}{#npc/a}* ...问问你的朋友吧。'
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 狗子的公道，\n  何处不是狗子的公道。']
        ),
        riverboi2x: ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 没时间闲言碎语了。'],
        riverboi3: () => [
            '<32>{#p/basic}{#npc/a}* 我是旅人。\n* 艾菲斯博士叫我来接你。',
            '<32>* 去空境吗？',
            choicer.create('* （你要怎么回答？）', '出发', '再等等')
        ],
        riverboi4: ['<32>{#p/basic}{#npc/a}* 感谢乘坐运输船。\n* 我的任务完成了。'],
        papinter1: pager.create(
            0,
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? [
                        '<18>{#p/papyrus}你好，人类！',
                        "<18>{#p/papyrus}很高兴你终于\n和我说话了。",
                        "<18>{#f/4}这地方有好多\n好玩的...",
                        '<18>{#f/0}你去过\n保龄球馆了吗？',
                        '<18>{#f/9}或者更棒的\n游泳池！',
                        ...(SAVE.data.b.killed_mettaton
                            ? [
                                '<18>{#f/4}这俩现在\n都关门了...',
                                '<18>{#f/5}...就只是为了纪念\n镁塔顿所谓的\n“死亡”。'
                            ]
                            : [
                                '<18>{#f/4}这俩地方都可以\n乘坐运输船到达...',
                                '<18>{#f/5}...但这俩地方只适\n合10岁以上的人。'
                            ])
                    ]
                    : [
                        '<18>{#p/papyrus}你好，人类！',
                        "<18>{#p/papyrus}你终于到这里了。",
                        "<18>{#f/4}这地方有好多\n好玩的...",
                        '<18>{#f/0}你去过\n保龄球馆了吗？',
                        '<25>{#p/undyne}{#f/17}* 认真的，帕派瑞斯？\n* 保龄球？',
                        '<25>{#p/undyne}{#f/8}* 魔法艺术俱乐部\n  显然更好！',
                        "<18>{#p/papyrus}{#f/4}你不会害怕人类\n的游戏吧？",
                        '<25>{#p/undyne}{#f/4}* 啥？\n* 不可能！',
                        "<25>{#p/undyne}{#f/5}* 我只是...",
                        "<25>{#p/undyne}{#f/12}* 我只是艺术之美的\n  狂热粉丝。",
                        "<18>{#p/papyrus}{#f/5}那你会和我去爵士乐\n与布鲁斯蓝调\n俱乐部吗？",
                        "<25>{#p/undyne}{#f/8}* 我的天哪，\n  在最后说一次，\n  我再也不会吹萨克斯了！！"
                    ],
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? SAVE.data.b.killed_mettaton
                        ? [
                            "<18>{#p/papyrus}{#f/6}别买这东西！\n这是镁塔牌的\n营销手段！",
                            "<18>{#p/papyrus}{#f/5}镁塔顿在这种事上\n真的臭名昭著。",
                            "<18>{#p/papyrus}{#f/4}...我和你一样\n不喜欢它。"
                        ]
                        : [
                            "<18>{#p/papyrus}{#f/0}顺带说一下，\n这大概持续了\n10个克历年了。",
                            '<18>{#p/papyrus}{#f/4}我不知道换算成\n地球年又是多少...',
                            "<18>{#p/papyrus}{#f/5}虽然好像差别\n不大罢了。"
                        ]
                    : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                        ? [
                            "<18>{#p/papyrus}{#f/5}太糟糕了。\n安黛因会成为一个\n伟大的音乐家的。",
                            "<18>{#p/papyrus}{#f/4}设想一下由她作词\n的战士之歌...",
                            '<25>{#p/undyne}{#f/1}* 大概会吧。',
                            '<25>{#p/undyne}{#f/12}* 听起来确实很酷...',
                            "<18>{#p/papyrus}{#f/0}我知道啊！\n那简直可以说是\n“鱼”味无穷啊！",
                            '<25>{#p/undyne}{#f/3}* ...',
                            '<25>{#p/undyne}{#f/3}* 别再对我这么说了。'
                        ]
                        : [
                            "<18>{#p/papyrus}如果你想买冰激凌，\n就在我右边。",
                            '<25>{#p/undyne}{#f/3}* 不应该是“左边”吗？',
                            '<18>{#p/papyrus}{#f/5}按理说，\n冰激凌摊确实是\n在我左边。',
                            "<18>{#p/papyrus}{#f/4}但对人类来说，\n冰激凌摊却在\n我的右边。",
                            '<25>{#p/undyne}{#f/14}* 啊。\n* 你真的很体贴呢！',
                            "<25>{#p/undyne}{#f/17}* 只希望人类不会\n  因此迷路。"
                        ],
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? SAVE.data.b.killed_mettaton
                        ? ["<18>{#p/papyrus}{#f/5}他不该为推广\n自己的品牌而撒谎..."]
                        : ['<18>{#p/papyrus}{#f/5}守时间\n有时真的很难。']
                    : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                        ? ['<18>{#p/papyrus}{#f/4}我的嘴\n被贴上了封条。']
                        : ['<18>{#p/papyrus}{#f/5}辨别方向有时\n真的很难。']
        ),
        papinter2: () => [
            '<18>{#p/papyrus}{#f/0}你好，人类。',
            '<18>{#p/papyrus}{#f/5}（唉...）',
            "<18>你可能在想为啥\n安黛因没来。",
            '<18>怎么说呢...',
            "<18>{#f/6}假设，安黛因\n离开的原因是...",
            ...(SAVE.data.b.killed_mettaton
                ? [
                    '<18>{#f/5}...甚至她自己\n也这么说...',
                    '<18>{#f/1}你杀了某个人！？！？',
                    '<18>{#f/4}我是说，\n我理解她为何离开。',
                    '<18>{#f/5}镁塔顿的“死亡”\n对此【特别】有\n说服力。',
                    "<18>{#f/0}然而，每个人都知道\n那只是节目效果。",
                    '<18>{#f/4}自然，\n除了安黛因以外。',
                    '<18>{#f/5}我保证...',
                    '<18>{#f/5}有时她想的\n那些东西...',
                    '<18>{#f/5}...'
                ]
                : [
                    '<18>{#f/5}...包括她说发现\n你的做为...',
                    '<18>{#f/1}你杀了某个人！？！？',
                    "<18>{#f/0}但那肯定是个误会。",
                    "<18>{#f/5}你不会那样做的\n... 对吗？",
                    "<18>{#f/6}所-所以，\n我决定留下。",
                    '<18>{#f/9}必须有人站出来\n为“小男孩”发声！',
                    '<18>{#f/0}或者小女孩，\n或者你自己选的\n那个外号。',
                    "<18>{#f/4}等等，如果你没有\n外号怎么办...",
                    '<18>{#f/8}那我该叫你啥！？！？'
                ]),
            "<18>{#f/0}好吧，想聊天的话，\n就来这里找我好了。",
            "<18>{#f/5}我也可以在这跟你\n打电话，但是...",
            "<18>{#f/5}安黛因听见我想\n跟你打电话，\n就把我手机砸了。",
            "<18>{#f/6}看起来，\n她保护欲很强！"
        ],
        undinter: pager.create(
            0,
            () =>
                SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                    ? iRespeccYourVilliany()
                        ? [
                            '<25>{#p/undyne}{#f/1}* 嘿，小混蛋。\n* 好久不见。',
                            "<18>{#p/papyrus}{#f/6}你不是刚才\n和人类一起上了\n电视吗？？？",
                            "<25>{#p/undyne}{#f/14}* 我是说，对，\n  刚才已经够久了。",
                            "<18>{#p/papyrus}{#f/0}确实。",
                            '<18>{#p/papyrus}{#f/5}哇... 想象我有\n时间会做什么...',
                            "<18>{#p/papyrus}{#f/4}...我可以不阻止\n衫斯偷懒。",
                            '<25>{#p/undyne}{#f/17}* 跟我说说。'
                        ]
                        : [
                            '<25>{#p/undyne}{#f/1}* 嘿，小混蛋。\n* 很高兴见到你。',
                            "<18>{#p/papyrus}{#f/6}今天早些时候你们\n不还是敌人吗？？？",
                            "<25>{#p/undyne}{#f/14}* 我是说，对，\n  但这都过去了。",
                            '<18>{#p/papyrus}{#f/0}就按你这么说了。',
                            '<18>{#p/papyrus}{#f/5}哇哦...\n就像平常衫斯\n说的那样...',
                            '<18>{#p/papyrus}{#f/4}...他每次都是说有\n些事已经“过去了”。',
                            '<25>{#p/undyne}{#f/17}* 积习难改啊。'
                        ]
                    : [
                        '<25>{#p/undyne}{#f/1}* 嘿，小混蛋。\n* 帕派瑞斯要处理件“私事”。',
                        "<25>{#f/14}* 至少，他就这么讲的。",
                        "<25>{#f/7}* 但这意味着，我是你\n  待在这儿唯一的朋友了嘛！",
                        '<25>{#f/4}* ...所以你最好\n  别给我出洋相了！'
                    ],
            () =>
                SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                    ? [
                        '<25>{#p/undyne}{#f/1}* 如果你想加入我的\n  魔法艺术俱乐部...',
                        '<25>{#p/undyne}{#f/3}* ...呃，我不确定运输船\n  会不会载一个孩子\n  去那里。',
                        "<25>{#p/undyne}{#f/12}* 也许当你大一点\n  就会载你去了。"
                    ]
                    : ["<25>{#p/undyne}{#f/11}* 我会盯着你的。"]
        ),
        corndog1: pager.create(
            0,
            () => [
                "<25>{#p/sans}{#f/0}* 我在这卖点玉米热狗，\n  5G一个，喜欢就尝尝。",
                choicer.create('* （花5G买个热狗吗？）', '买', '不买')
            ],
            () => ['<25>{#p/sans}{#f/0}* 玉米热狗，5G一个。', choicer.create('* （花5G买个热狗吗？）', '买', '不买')]
        ),
        corndog2: [
            "<32>{#p/human}* （你带的东西太多了。）",
            "<25>{#p/sans}{#f/2}* 这样吧，\n  我就放在这里好了。"
        ],
        corndog2b: ['<25>{#p/sans}{#f/2}* 给你。'],
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
                ? ['<32>{#p/human}* （这个哨站给你\n  所带来的印象相当离谱。）']
                : world.darker
                    ? ["<32>{#p/basic}* 一个哨站。"]
                    : ['<32>{#p/basic}* 哨站有多个，衫斯只有一个。'],
        sanscall1: () => [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            ...(world.dead_skeleton
                ? [
                    '<25>{#p/sans}{#f/0}* 所以，节目怎么样？',
                    '<25>{#f/0}* 棒...？\n* 还是烂...？',
                    "<25>{#f/3}* 嗯，我只是个会说双关\n  的家伙罢了。",
                    "<25>{#f/2}* 像我这样的永远也\n  看不出这俩有啥区别。",
                    ...(world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                        ? ["<26>{#f/3}* 但是吧...\n* 我对这并不咋关心，\n  所以也没事。"]
                        : ["<25>{#f/3}* 但是吧...\n* 我都没去看，所以也没事。"]),
                    '<25>{#f/0}* 我这么问是因为...\n* 老实说吧...',
                    "<25>{#f/0}* 要是了解到你还在乎\n  什么那也挺不错的。",
                    "<25>{#f/3}* 无意冒犯而已。"
                ]
                : [
                    '<25>{#p/sans}{#f/0}* 所以，节目怎么样？',
                    ...(SAVE.data.b.a_state_moneyfish
                        ? [
                            '<25>{#p/sans}{#f/2}* 你和安黛因\n  贸似互吹了一顿哈？',
                            "<25>{#f/3}* 嘿。\n* 很抱歉我没有来。",
                            '<25>{#f/0}* 一旦安黛因想要上场，\n  我就完全没有\n  上场机会了。',
                            ...(SAVE.data.b.bad_lizard
                                ? ['<25>{#f/3}* 除此之外...', '<25>{#f/0}* 我目前还有跟你那样\n  的人要担心。']
                                : ['<25>{#f/0}* “皇家卫队队长”\n  可太出名了。'])
                        ]
                        : world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                            ? [
                                '<25>{#p/sans}{#f/2}* 第一个被淘汰，是吧？',
                                "<25>{#f/3}* 嘿。\n* 我想你也没那么受欢迎。",
                                "<25>{#f/0}* 但其实也没关系。",
                                ...(SAVE.data.b.bad_lizard
                                    ? ['<25>{#f/0}* 其实这也正常，\n  因为你把大家都吓跑了。']
                                    : ['<25>{#f/0}* 至少你宽宏大量，\n  没有对此斤斤计较。'])
                            ]
                            : [
                                '<25>{#p/sans}{#f/2}* 没有我你也可以加油，\n  是吧？',
                                "<25>{#f/3}* 别担心，我已经习惯\n  成为一群人中最怪的\n  那个了。",
                                "<25>{#f/2}* 只不过，\n  通常没人知道这件事。",
                                ...(SAVE.data.b.bad_lizard
                                    ? [
                                        "<25>{#f/3}* ...考虑到你最近\n  都忙的是什么...",
                                        "<25>{#f/0}* 其实这也挺好的。"
                                    ]
                                    : ["<25>{#f/0}* 总之，\n  你开心了，我就很满足了。"])
                            ]),
                    '<25>{#f/3}* ...对了...',
                    '<25>{#f/2}* 如果你看到\n  全副武装的警卫了，\n  别忘了告诉我。',
                    '<25>{#f/3}* 我在来这里的路上\n  跟丢了。'
                ]),
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        tvm1: ['<32>{#p/human}* （你获得了一台老式收音机。）', '<32>{#p/basic}{#npc/a}* 希望你喜欢你觉得新收音机！'],
        tvm2: ['<32>{#p/human}* （你获得了一箱烟花。）', '<32>{#p/basic}{#npc/a}* 希望你能享受你的烟花！'],
        tvm3: ["<32>{#p/human}* （你带的东西太多了。）"],
        tvm4: pager.create(0, ['<32>{#p/basic}{#npc/a}* 小家伙，你的奖品就在桌上。']),
        tvm5: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* 在再次被解雇前，\n  我决定主动辞职。",
                        '<32>* 为镁塔顿工作是很好，\n  但我更想在新家园\n  开始新的生活。',
                        "<32>* 别担心。\n* 我会找到更好的工作的..."
                    ]
                    : [
                        '<32>{#p/basic}{#npc/a}* 我为镁塔顿工作。\n* 我爱我工作。\n* 我同事不爱。',
                        '<32>* 我身上的每一枚圆环\n  都代表我被公司炒鱿鱼时\n  的重聘次数。',
                        "<32>* 别担心。\n* 我总能被重新聘用。"
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* 我想成为\n  太空生物交配仪式学专家。"
                    ]
                    : ["<32>{#p/basic}{#npc/a}* 下次我想在脸上戴个圆环。"]
        ),
        tvm6: () => [
            '<32>{#p/basic}{#npc/a}* 本来是要给你一个喵喵玩偶的，\n  但镁塔顿却因为一些\n  个人原因把它收回了。',
            "<32>{#p/basic}{#npc/a}* 作为补偿，\n  我将给你与其同等价值的G。",
            '<32>{#s/equip}{#p/human}{#npc}* （你获得了999G。）',
            ...((SAVE.data.b.a_state_moneyitemA && !SAVE.data.b.item_tvm_radio) ||
                (SAVE.data.b.a_state_moneyitemB && !SAVE.data.b.item_tvm_fireworks)
                ? ['<32>{#p/basic}{#npc/a}* 其他的奖品\n  还是可以正常领取的。']
                : ['<32>{#p/basic}{#npc/a}* 很抱歉给你带来了困扰。'])
        ],
        tvm7: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* （桌子上的便条\n  描述了为收回某件东西\n  而感到抱歉。）']
                : [
                    "<32>{#p/basic}* 这桌子上有一张便条。",
                    '<32>{#p/mettaton}* “抱歉，\n   我得把喵喵玩偶带回去。”\n* “当然这并没有针对你。”'
                ],
        tvm8: ['<32>{#p/human}* （你获得了一台老式收音机。）'],
        tvm9: ['<32>{#p/human}* （你获得了一箱烟花。）'],
        lockup0: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* （但是你没有钥匙。）"] : ["<32>{#p/basic}* 锁住了。"],
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
                ? choicer.create('* （在蜘蛛网里放36G吗？）', '放', '不放')
                : choicer.create('* （在蜘蛛网里放56G吗？）', '放', '不放')
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
                    '<32>{#p/human}* （你将手穿过蛛网。）',
                    ...[
                        [
                            "<25>{#p/asriel1}{#f/10}* 弗里斯克，这里空无一物，\n  除了蛛丝。",
                            "<25>* 你的手会黏上蛛丝的。"
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* 信我的。\n* 这得花很长时间才能洗掉。',
                            '<25>{#f/15}* 我对此... 富有经验。'
                        ],
                        ['<25>{#p/asriel1}{#f/15}* 或者... 你可以继续。', "<26>{#f/16}* 反正不关我事。"],
                        ['<25>{#p/asriel1}{#f/13}* 我认真的...']
                    ][Math.min(asrielinter.spiderweb++, 3)]
                ]
                : ['<32>{#p/basic}* 蛛网上什么都没有。'],
        hotelfood0: () =>
            SAVE.data.b.svr
                ? [
                    "<32>{#p/human}* （你将手伸进碗里的食物中。）\n* （好黏。）",
                    choicer.create('* （拿走食物吗？）', '拿走', '算了')
                ]
                : ["<33>{#p/basic}* 这是某种神秘的食物。", choicer.create('* （拿走食物吗？）', '拿走', '算了')],
        hotelfood1: () => [
            '<32>{#p/human}* （你拿走了神秘食物。）',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? [
                    "<25>{#p/asriel1}{#f/15}* 那玩意...\n  对你不咋健康。",
                    '<25>{#f/16}* 我希望你应该知道。'
                ]
                : [])
        ],
        hotelfood2: ["<32>{#p/human}* （你带的东西太多了。）"],
        hotelfood3: ['<32>{#p/human}* （你不打算这么做。）'],
        sonic1: () => [
            '<32>{#p/human}* （你捡到了一个声波谐振器。）',
            choicer.create('* （启动声波谐振器吗？）', '启动', '算了')
        ],
        sonic2: ["<32>{#p/human}* （你带的东西太多，装不下它了。）"],
        tablaphone1: () => [
            '<32>{#p/human}* （你捡到了一架塔布拉木琴。）',
            choicer.create('* （架起塔布拉木琴吗？）', '架起', '算了')
        ],
        tablaphone2: ["<32>{#p/human}* （你带的东西太多，装不下它了。）"],
        moonpie1: () => [
            '<32>{#p/human}* （你拿走了月派。）',
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* （附带的纸条描述了\n  希望帮助有需要的人的意图。）']
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
            '<18>{#p/papyrus}{#f/5}我是帕派瑞斯。',
            "<18>{#f/5}我不能再躲躲藏藏了。",
            '<18>{#f/6}人们需要我的帮助！',
            '<18>{#f/5}而且...',
            "<18>{#f/6}我到底还是\n想再见见你。",
            '<18>{#f/7}就算让“艾斯利尔”\n知道我还活着\n又怎么样！',
            '<18>{#f/7}我决不容忍自己\n就这么杵在这，无所事事。',
            '<18>{#f/4}...',
            '<18>{#f/4}待会见。',
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        story: {
            phonegrabber1: () => [
                game.room === 'a_lab_downstairs' // NO-TRANSLATE

                    ? "<33>{#p/basic}* 艾菲斯的备用机。\n* 自带一张升降机通行证\n  和两个次元箱子。"
                    : "<32>{#p/basic}* 一部智能手机。\n* 自带一张升降机通行证\n  和两个次元箱子。",
                ...(world.genocide
                    ? ['<32>{#p/basic}* 很奇怪，\n  一次性便携飞行器的槽\n  居然是空的。']
                    : ['<32>{#p/basic}* 此外，\n  还有个一次性的便携式飞行器。'])
            ],
            phonegrabber2: ['<32>{#p/human}* （你有了一部新手机。）'],
            phonegrabber3: () =>
                SAVE.flag.n.ga_asrielGetThePhone > 1
                    ? ['<25>{#p/asriel2}{#f/10}* 终于啊。']
                    : ["<25>{#p/asriel2}{#f/10}* 不知道上面有没有聊天记录。"],
            alphys1: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ['<25>{#p/alphys}{#f/2}* 我的天啊！', '<25>{#f/3}* 你怎么...']
                    : ['<25>{#p/alphys}{#f/2}* 我的天啊！', '<25>{#f/3}* 你怎么这么快就到了！？'],
            alphys2: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ["<25>{#p/alphys}{#f/10}* 哦... 你是那个人类...", '<25>{#f/3}* 那个...']
                    : ["<25>{#f/4}* 我刚接完电话，\n  还没检查实验室...", '<25>{#f/17}* ...'],
            alphys3: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        "<25>{#g/alphysWhyOhWhy}* 呃，没事没事，一切都好！",
                        "<25>{#g/alphysUhButHeresTheDeal}* 请放一万个心，\n  你一点儿错都没有！",
                        "<25>{#g/alphysCutscene1}* 啥跟啥啊！\n* 你就是个...",
                        '<25>{#g/alphysCutscene2}* 没干过坏事的小天使，哈哈。',
                        '<25>{#f/20}* ...',
                        "<25>{#f/10}* 那-那个，话说，\n  你是新来的，对吧！？",
                        '<25>{#g/alphysIDK}* 你可-可能...',
                        "<25>{#f/3}* 你可能需要我的帮助！",
                        "<25>{#f/5}* 因-因为...",
                        '<25>{#f/10}* 空境对-对人类来说...\n  不太安全。',
                        '<25>{#f/3}* 陷阱随-随时会要你命...\n* 谜题压-压根就解不开...\n* 还有...',
                        '<25>{|}{#g/alphysIDK}* 该-该死，我要怎么- {%}'
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
                                                '<25>{#f/16}* ...看到你第一次尝试\n  就通过了躲避烈火之墙！',
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
                                "<25>{#f/9}* 我是... 艾菲斯博士。\n* 皇家科学部门的负责人。",
                                "<25>{#f/4}* 从你刚刚走出外域时，\n  我就...",
                                '<25>{#f/4}* 诶嘿，用我的安全控制台\n  “观察”你。',
                                '<25>{#f/11}* 你的战斗...\n* 你的朋友们...',
                                '<25>{#f/11}* ...',
                                ...(SAVE.data.n.state_starton_papyrus === 1
                                    ? ["<25>{#f/13}* 甚至...\n* 帕派瑞斯的死-死亡..."]
                                    : SAVE.data.n.state_foundry_doge === 1 && SAVE.data.n.state_foundry_muffet === 1
                                        ? ["<25>{#f/13}* ...甚至由安黛因带领的\n  特战队的覆-覆灭..\n"]
                                        : SAVE.data.n.state_starton_dogs === 2 ||
                                            (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                                            (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
                                            (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) >
                                            1
                                            ? ['<25>{#f/13}* ...甚至犬卫队的\n  覆-覆灭...']
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
                        '<25>{#f/15}* 呃对...\n  这儿对人类来说\n  可能有点危险...',
                        '<25>{#f/3}* 陷阱随时会要你命...\n* 谜题也难得离谱...\n* 还有那些皇家守卫...',
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
                        '<32>{#p/mettaton}* 我们每个人要知道，\n  通常我们看到一个看似\n  “无辜”的人类小孩...',
                        '<32>* 很容易让我们对其放下戒心...\n* 在此，我想告诉大家，\n  永远不要以貌取人...',
                        '<32>* 现在展示在你们屏幕上的，\n  是这个卑鄙无耻的人类在前哨站\n  为非作歹的真实录像！',
                        SAVE.data.n.state_foundry_undyne > 0
                            ? '<25>{#p/alphys}{#f/2}* 镁塔顿，等-等一下！\n* 你在干什...'
                            : '<25>{#p/alphys}{#g/alphysGarbo}* 啊？\n* 你又顺走监控录像了？'
                    ]
                    : [
                        "<32>{#p/mettaton}* 我敢说这期节目会超棒哦！",
                        "<32>* 让我们以热烈的掌声\n  欢迎我们的新选手...",
                        '<33>* 唯一一位的人类访客！'
                    ],
            alphys10a: () => [
                '<32>{#p/mettaton}* （等观众看完再说。）',
                SAVE.data.n.state_foundry_undyne > 0
                    ? "<25>{#p/alphys}{#f/21}* ...\n* 真就说不过你。"
                    : "<26>{#p/alphys}{#g/alphysGarboCenter}* 所以你承认喽。"
            ],
            alphys11: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* 不管怎么说，\n  我们需要给这人类\n  取个外号！",
                        ...(world.flirt > 9
                            ? [
                                '<32>{#p/mettaton}* 毕竟所有恶劣至极的反派，\n  都拥有一个外号。\n* 除了你以外...',
                                "<32>{#p/mettaton}* 像你这样\n  喜欢沾花惹草的恶霸，\n  只有一个外号会适合你！",
                                '<32>{#p/mettaton}* ... $(moniker1u)！'
                            ]
                            : [
                                "<32>{#p/mettaton}* 毕竟所有恶劣至极的反派，\n  都拥有一个外号。\n* 那你的将是什么呢？"
                            ])
                    ]
                    : ['<32>{#p/mettaton}* 从来没有玩过吗，幸运儿？', "<32>* 没关系，很简单。"],
            alphys11a: () => [
                choicer.create(
                    '* （你打算起啥外号呢？）',
                    '黄天霸主',
                    '风云剑客',
                    '狂怒剑皇',
                    '星际游侠'
                )
            ],
            alphys11b: () =>
                iFancyYourVilliany()
                    ? world.flirt > 9
                        ? ["<32>{#p/mettaton}* 所以，$(moniker2u)，\n  拿出你的战斗技巧..."]
                        : [
                            '<32>{#p/mettaton}* $(moniker1u)吗？\n* 天呐，这名真不错！',
                            "<32>{#p/mettaton}* 行，$(moniker2u)，\n  拿出你的战斗技巧..."
                        ]
                    : ["<32>* 实际上，规则只有一个！", '<32>* 拿出你一生中\n  最好的表现...'],
            alphys12: () =>
                iFancyYourVilliany()
                    ? ['<32>{*}{#p/mettaton}* 把它搬上舞台！！！{^20}{%}']
                    : ['<32>{*}{#p/mettaton}* 否则就会死！！！{^20}{%}'],
            alphys13: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        '<25>{#p/alphys}{#f/10}* 你... 你知道吗？',
                        '<25>{#f/10}* 你想做啥都行。',
                        "<25>{#f/23}* 因为我...\n  我得离开了。",
                        '<25>{#f/23}* 永远。',
                        '<25>{#f/5}* 还有你要是想\n  吩咐我什么...',
                        '<25>{#f/5}* 嗯...',
                        '<25>{|}{#f/16}* 算了吧！！！{%}'
                    ]
                    : [
                        ...(world.bad_lizard < 1
                            ? [
                                '<25>{#p/alphys}{#f/5}* 嘿...',
                                '<25>{#f/8}* 我知道这么说有点\n  莫名其妙，但是...\n  你真-真的很酷。'
                            ]
                            : [
                                '<25>{#p/alphys}{#f/5}* 嘿...',
                                '<25>{#f/8}* 我知道这有点莫名其妙，\n  但是...',
                                '<25>* 你做的很-很好。'
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
                        '<25>{#p/alphys}{#g/alphysWelp}* 抱歉，但实话说，\n  你那手机和砖头没啥区别，\n  就是好看点。',
                        "<25>{#g/alphysSide}* 拿去，这新手机里面有\n  升降机通行证，\n  次元箱子...",
                        '<25>{#g/alphysSmileSweat}* 还有你自己的域外网账号！',
                        "<25>{#g/alphysNervousLaugh}* 别担心，我们加了好友，\n  这样你需要帮助\n  就能联系我了。",
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
                    ? ['<33>{#p/basic}{#x2}* 草。\n* 兄弟，那个，\n  我看咱必须得干掉那人了。{#x3}']
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
                        "<32>{#z21}* 你是那个和皇家卫队\n  大队长战斗的人类。",
                        "<32>{#z30}* 那场对峙，\n  让她丧了命。",
                        "<32>{#z31}* 其实，安黛因是死是活，\n  我倒不咋在乎。",
                        '<32>{#z30}* 但对艾菲斯来说...\n  安黛因非常重要。',
                        "<32>{#z21}* 她的死，\n  让艾菲斯备受打击。",
                        "<32>{#z21}* 倒不是责备你，\n  只是... 你的所作所为\n  伤害了艾菲斯。",
                        "<33>{#z30}* ...希望她只是出去散散心了，\n  一会就回来。",
                        "<32>{#z03}* 别上火。\n* 要是感到孤独，不用担心...",
                        "<32>{#z02}* 我会在暗中陪伴你。",
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
                        "<32>{#z00}* 亲眼目睹你的暴行之后，\n  这对她也好。",
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
                        '<32>* 就用它...\n  重置这条时间线吧。',
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
                "<25>{#p/alphys}{#g/alphysSideSad}* 你估计过不去...",
                '<25>{#g/alphysSmileSweat}* 我看看能不能帮到你。',
                '<32>{#p/human}* （你听到了一阵狂敲键盘的声音。）',
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 安保问... 啥-啥玩意？',
                '<32>{#p/human}* （你又听到了一阵敲键盘的声音。）',
                '<32>{#p/human}* （...）',
                '<32>{#p/human}* （敲键盘的声音停下来了。）',
                "<25>{#p/alphys}{#g/alphysWelp}* 嗯... 我们得回答\n  几个安保问题才行。",
                "<25>{#g/alphysGarbo}* 镁塔顿设的...",
                '<25>{#g/alphysNeutralSweat}* 你... 了解镁塔顿吗？\n  也许知道点有用的消息？',
                '<25>{#g/alphysTheFactIs}* ...想想就知道不可能，\n  你才碰上他多久...',
                "<25>{#g/alphysUhButHeresTheDeal}* 呃，说是这么说，\n  也许你答得上来第一问。",
                '<25>{|}{#g/alphysIDK}* “谁最喜- {%}',
                ...(world.postnoot
                    ? []
                    : [
                        "<25>{#g/alphysWTF}* 天呐，我就知道\n  他会拿这个当安保问题。",
                        '<25>{#g/alphysNervousLaugh}* “谁最喜欢镁塔顿？”',
                        choicer.create('* （你要怎么回答？）', '艾菲斯', '艾斯戈尔', '帕派瑞斯', '安黛因')
                    ])
            ],
            barricade1x: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* ...啊？',
                '<25>{#g/alphysWelp}* 路障好像...\n  自行解除了。',
                '<25>{#g/alphysCutscene1}* 没事了！\n* 那事情就好办多了！'
            ],
            barricade1b1: [
                '<25>{#p/alphys}{#g/alphysFR}* ...',
                '<25>{#g/alphysFR}* 我喜欢镁塔顿就怪了。',
                "<25>{#g/alphysCutscene2}* 我试试... 艾斯戈尔。"
            ],
            barricade1b2: ['<25>{#p/alphys}{#g/alphysSmileSweat}* 嗯... 行。'],
            barricade1b3: () => [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 当真？',
                '<25>{#p/alphys}{#x1}* ...',
                ...(SAVE.data.n.state_starton_papyrus === 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* 哦，你好像答对了。',
                        '<25>{#g/alphysHaveSomeCompassion}* ...'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* 哇哦，你答对了。',
                        '<25>{#g/alphysFR}* ...',
                        "<25>{#g/alphysFR}* 没想到帕派瑞斯\n  在人后还有这么一面。\n  奇怪的冷知识增加了。",
                        '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 不过我接受得了！！'
                    ])
            ],
            barricade1b4: () => [
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* ...\n* 我可不这么觉得。",
                        "<25>{#g/alphysSideSad}* 还是试试... 艾斯戈尔吧。"
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysCutscene3}* 噗...\n* 你肯定没上心，对吧？",
                        "<25>* 她很敷衍他的。\n* 不可能是正确答案的。",
                        "<25>{#g/alphysCutscene2}* 我试试... 艾斯戈尔。"
                    ])
            ],
            barricade2: () => [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysCutscene2}* 好，这次的问题是...',
                '<25>{|}{#g/alphysCutscene1}* “镁塔顿最成- {%}',
                '<25>{#g/alphysGarbo}* 他是认真的吗？',
                '<25>{#g/alphysGarboCenter}* 不是吧。',
                '<25>{#g/alphysWelp}* “镁塔顿最成功的\n   节目是哪个？”',
                choicer.create('* （你要怎么回答？）', '镁塔美妆', '镁塔厨具', '镁塔科技', '镁塔卫视')
            ],
            barricade2b1: [
                "<25>{#p/alphys}{#g/alphysCutscene2}* 没错...\n  估计这就是正确答案。",
                '<25>{#g/alphysTheFactIs}* 他真的很希望他的电视节目\n  火起来，但是...',
                '<25>{#g/alphysUhButHeresTheDeal}* 大家确实很喜欢他的\n  美容产品！'
            ],
            barricade2b2: [
                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* 这附近肯定有很多\n  镁塔牌的厨房用电器...',
                "<25>{#g/alphysWelp}* 可恶，安黛因倒是有一个，\n  但她根本就不喜欢那家伙。",
                "<25>{#g/alphysSmileSweat}* ...行吧，咱们试一下。"
            ],
            barricade2b3: [
                '<25>{#p/alphys}{#g/alphysFR}* ...',
                "<25>{#g/alphysFR}* 我就当作没听到。",
                "<25>{#g/alphysHellYeah}* 你在路上随便拉个人\n  都知道科研是我的活啊！",
                '<25>{#g/alphysHellYeah}* ...',
                "<25>{#g/alphysWelp}* 要不试试... 镁塔厨具？"
            ],
            barricade2b4: [
                '<25>{#p/alphys}{#g/alphysWorried}* 我说不准...',
                "<25>{#g/alphysWelp}* 镁塔顿的节目\n  最近不温不火的。",
                '<25>{#g/alphysWTF}{#x1}* ...',
                '<25>{#g/alphysWTF2}* 答对了！？',
                '<25>{#g/alphysCutscene3}* ...你都咋知道的？',
                '<25>{#g/alphysUhButHeresTheDeal}* 算了，把剩下一个解了就行！'
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
                '<25>{#g/alphysNeutralSweat}* 你有这个打算吗！？',
                '<25>{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysNervousLaugh}* 行吧...\n  这至少不是镁塔顿的\n  真实身份。"
            ],
            barricade3b3: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* 阿德里安？',
                '<25>{#g/alphysInquisitive}* 这又是什么逆天东西？',
                "<25>{#g/alphysSmileSweat}* 嗯，肯定不是它。"
            ],
            barricade3b4: [
                "<25>{#p/alphys}{#g/alphysCutscene1}* 所以说...\n  镁塔顿的真实身份\n  其实就是镁塔顿，嗯？",
                '<25>{#x1}* ...',
                '<25>{#p/alphys}{#g/alphysWelp}* 哦。\n* 看来对了。',
                '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 你懂的真多！'
            ],
            barricade3c: [
                '<25>* ...',
                '<25>{#p/alphys}{#g/alphysSide}* 嗯... 我有个主意。',
                '<32>{#p/human}* （敲键盘的声音又响了起来。）',
                '<25>{#p/alphys}{#g/alphysCutscene1}{#x1}* ...',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* 成啦！！！',
                '<25>{#g/alphysUhButHeresTheDeal}* 还蛮有意思的。'
            ],
            barricadeFail1: [
                '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysNeutralSweat}* 也不对...\n  看来我得手动介入了。",
                '<25>{#g/alphysWelp}* ...',
                '<25>{#g/alphysWelp}* 可能得花些时间。',
                "<25>{#g/alphysUhButHeresTheDeal}* 完事之后我会跟-\n  跟你说一声的！"
            ],
            barricadeFail2: [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* 好-好了，\n  终于改好了。'
            ],
            barricadeFail2x: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* ...',
                '<25>{#g/alphysInquisitive}* 你跑别的房间去了？',
                '<25>{#g/alphysSide}* 呃，行吧。\n  现在路障已经消失了。'
            ],
            barricadeFail3: ['<25>{#p/alphys}{#g/alphysCutscene1}* 希望对你有所帮助！'],
            barricade4: () => [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysSideSad}* 咋又来...',
                '<25>{#g/alphysSideSad}* ...',
                "<25>{#g/alphysWelp}* 等下，镁塔顿的账号\n  我还登着呢。",
                '<25>{#g/alphysNervousLaugh}* 我应该可以直-直接就\n  解锁的！',
                '<32>{|}{#p/human}* （敲键盘的声音又- {%}',
                '<25>{#p/alphys}{#g/alphysHellYeah}{#x1}* 搞定！',
                '<25>{#g/alphysWelp}* ...',
                "<25>{#g/alphysGarboCenter}* 真心希望能\n  别再碰上那玩意了。",
                ...(SAVE.data.b.failshow
                    ? []
                    : SAVE.data.b.item_tvm_mewmew &&
                        !SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                        !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                        !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                        ? [
                            '<25>{#g/alphysTheFactIs}* 哦，还-还有，\n  那个喵喵玩偶...',
                            '<25>* 嗯...',
                            '<25>{#f/10}* 等下，你是...',
                            '<25>{#f/3}* 你-你是直接把它\n  给扔了吗？',
                            '<25>{#f/3}* ...',
                            '<25>{#g/alphysUhButHeresTheDeal}* 当然，没事的！'
                        ]
                        : [
                            '<25>{#g/alphysTheFactIs}* 哦，还-还有，\n  那个喵喵玩偶...',
                            '<25>* 嗯...',
                            SAVE.data.b.item_tvm_mewmew
                                ? "<25>{#g/alphysUhButHeresTheDeal}* 待会我再和你谈谈。"
                                : "<25>{#g/alphysUhButHeresTheDeal}* 其实都不在你手上，\n  没事了。",
                            '<25>{|}{#g/alphysCutscene3}* 总之电梯见，\n  拜拜啦啊啊- {%}'
                        ]),
                '<32>{#s/equip}{#p/event}* 滴...'
            ],
            puzzleReaction1: [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysHellYeah}* 你做到了！！',
                '<25>{#g/alphysNeutralSweat}* ...',
                '<25>{#g/alphysCutscene2}* 恭... 恭喜你啊。'
            ],
            cooker1a: ['<32>{#p/mettaton}* 你好啊。'],
            cooker1b: ["<32>{*}{#p/mettaton}* 欢迎来到前哨站的首期\n  创艺工坊节目！{^30}{%}"],
            cooker2a1: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 我们今天要做些啥呢？\n* 反正肯定是些好玩的！']
                    : ['<32>{#p/mettaton}* 大家的工具都充好电了吗？\n  我们马上就要来搞一些\n  “劲爆”的玩意了！'],
            cooker2a2: () =>
                iFancyYourVilliany()
                    ? ["<32>{#p/mettaton}* 毕竟，要做什么好东西\n  还不是我们说了算！"]
                    : ['<32>{#p/mettaton}* 哈哈哈...'],
            cooker2b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* 这位暴燥的恶霸\n  将会去准备用品。',
                        '<32>{#p/mettaton}* 我们大家\n  都应该一起孤立那恶霸！'
                    ]
                    : [
                        '<32>{#p/mettaton}* 我可爱的助手会去准备用品。',
                        '<32>* 请大家给予热烈的掌声！'
                    ],
            cooker3a: () => [
                "<32>{#p/mettaton}* 我们需要三件重要的物品。",
                iFancyYourVilliany()
                    ? '<32>* {@fill=#ff0}幸福闪粉{@fill=#fff}，{@fill=#ff0}激情水浆{@fill=#fff}，\n  和{@fill=#ff0}博爱甘油{@fill=#fff}。'
                    : '<32>* {@fill=#ff0}环三亚甲基三硝胺{@fill=#fff}，\n  {@fill=#ff0}己二酸二正辛酯{@fill=#fff}，和{@fill=#ff0}矿物油{@fill=#fff}。'
            ],
            cooker3b: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 开始吧，$(moniker2u)！']
                    : ['<32>{#p/mettaton}* 开始吧，甜心！'],
            cooker4a: ['<32>{#p/mettaton}* 好极了！', '<32>* 现在，让我...'],
            cooker4b: ['<32>{#p/mettaton}* 搞定！', "<32>* 我们要用这些东西..."],
            cooker5: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* ...来制作镁塔牌{@fill=#003cff}乐乐史莱姆{@fill=#fff}！(TM)']
                    : ['<32>{#p/mettaton}* ...来制作{@fill=#f00}塑性炸药{@fill=#fff}！'],
            cooker6: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 我要开始喽！']
                    : ['<32>{#p/mettaton}* 祈祷吧，美人儿！'],
            cooker7a: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/alphys}{#g/alphysShocked}* 呃，等-等一下！',
                        "<25>{#g/alphysOhGodNo}* 啥{@fill=#003cff}乐乐史莱姆{@fill=#fff}...",
                        "<25>{#g/alphysUhButHeresTheDeal}* 那就是个{@fill=#f00}塑性炸药{@fill=#fff}！"
                    ]
                    : [
                        '<32>{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/alphys}{#g/alphysShocked}* 呃，等-等一下！',
                        '<25>{#g/alphysOhGodNo}* 你要是现在就把它\n  做出来的话...',
                        "<25>{#g/alphysUhButHeresTheDeal}* 可是会把半-半个空境\n  毁了的！"
                    ],
            cooker7b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* ...啊？\n* 你是说我们的特邀嘉宾\n  把材料掉包了？',
                        '<25>{#p/alphys}{#g/alphysTheFactIs}* 我-我...\n  不是那个意思...',
                        '<32>{#p/mettaton}* 亲们...\n* 看来我们的特邀嘉宾\n  真把材料掉包了！',
                        "<25>{#p/alphys}{#g/alphysSmileSweat}* 我没这么说- {%}",
                        '<32>{#p/mettaton}* 怎么能搞这种小动作呢...\n* 为人也太阴险了点吧！'
                    ]
                    : [
                        '<32>{#p/mettaton}* 可是为什么呢...？',
                        "<25>{#p/alphys}{#g/alphysTheFactIs}* 因-因为...\n* 这...",
                        "<25>{#g/alphysHellYeah}* 因为这片区域有一块\n  超光速粒子励磁场！！",
                        '<32>{#p/mettaton}* 有一块啥？',
                        '<25>{#p/alphys}{#f/3}* 我今天得用这块励磁场\n  做个实验。',
                        '<32>{#p/mettaton}* 哦。'
                    ],
            cooker7c: ['<32>{#p/mettaton}* 等等，这很可能让人丧命。'],
            cooker7d: [
                "<32>{#p/mettaton}* 等等！不对劲...",
                "<32>{#p/mettaton}* 这压根就不是镁塔牌的\n  {@fill=#003cff}乐乐史莱姆{@fill=#fff}！",
                '<32>{#p/mettaton}* 这...这是{@fill=#f00}塑性炸药{@fill=#fff}！',
                "<32>{#p/mettaton}* 肯定是我们的特邀嘉宾\n  把材料掉包了！",
                '<32>{#p/mettaton}* 怎么能搞这种小动作呢...\n* 为人也太阴险了点吧！'
            ],
            cooker8a1: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* 不过别担心。",
                        '<32>* 运气好的话，\n  那恶霸会学到教训，\n  下次不会来破坏我的节目。'
                    ]
                    : [
                        '<32>{#p/mettaton}* 抱歉，各位...',
                        "<32>* 看来我们【今天】\n  不会制作任何炸药了。"
                    ],
            cooker8a2: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>* 啥！？！？\n* 办创艺工坊只是个障眼法！？！？\n  真家伙竟然在这！？！？",
                        "<32>* 天呐，$(moniker1u)可真是坏得没边了！"
                    ]
                    : ['<32>* 幸好我提前做了一些，对吧？'],
            cooker8b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>* 哎呀呀，亲爱的$(moniker2u)，\n  对你这种人，我还是留了一手的。\n  （只是个比喻。）',
                        "<32>* 要是那你没能在{@fill=#ff0}九十秒{@fill=#fff}内\n  飞过这片虚空..."
                    ]
                    : [
                        "<32>* 然后，为了增加紧张感，\n  你需要在{@fill=#ff0}九十秒{@fill=#fff}内飞过这片虚空..."
                    ],
            cooker9: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* 我就用你的自制武器\n  把你{@fill=#f00}炸成碎片{@fill=#fff}！"
                    ]
                    : ["<32>{#p/mettaton}* 不然就会被{@fill=#f00}炸成碎片{@fill=#fff}！"],
            cooker10: ['<32>{#p/mettaton}* 你最好现在开跑！！！'],
            cooker11: ["<32>{#p/basic}* 看起来靠你自己是无法穿越这里的。"],
            cooker12: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        '<32>{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/alphys}{#f/20}* 呃... 我...',
                        "<25>{#g/alphysIDK}* 不-不确定这个法子\n  有没有用...",
                        "<25>{#f/16}* 不-不过说出来\n  总比干等着看你死好！！",
                        "<25>{#f/10}* 都走到这了...\n  你-你也不想放弃吧？",
                        '<25>{#f/5}* 是这样，这儿的手机...',
                        '<25>{#f/6}* 大多都配有\n  一次性便携飞行器。',
                        '<25>{#f/10}* ...你那台应该也有吧？？'
                    ]
                    : [
                        '<32>{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/alphys}{#g/alphysSide}* 嘿，呃...',
                        '<25>{#g/alphysCutscene1}* 我知道个法子\n  能让你飞过去！',
                        "<25>{#g/alphysNervousLaugh}* 就是...",
                        "<25>{#g/alphysSmileSweat}* 虽然比不上安黛因的，\n  但是，我给你的那部\n  手机里...",
                        '<25>{#g/alphysHellYeah}* 有个一次性的\n  便携式喷气背包！',
                        '<25>{#g/alphysNervousLaugh}* 或许...\n  现在正好能用用看？？'
                    ],
            cooker12x: ["<32>{#p/basic}* ...你意识到艾菲斯的手机\n  配备了个喷气背包。"],
            cooker13: () => [
                '<32>{#p/human}* （你激活了喷气背包。）',
                SAVE.data.n.state_foundry_undyne > 0
                    ? '<25>{#p/alphys}{#f/3}* 祝-祝你好运？'
                    : "<25>{#p/alphys}{#g/alphysHellYeah}* 上吧！",
                '<32>{#s/equip}{#p/event}* 滴...',
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* 实在太癫了。'])
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
                        '<32>* 听好了，“$(moniker2u)”...',
                        '<32>* 下次再让我碰上你，\n  能不能保持你的理智\n  就不是你该操心的事儿了！'
                    ]
                    : ['<32>* 那么，下回再说吧...', '<32>* 让我们祝愿人类平安无事。'])
            ],
            cooker16f: [
                '<32>{#p/basic}* 喂？？',
                "<32>* 傻站在这你会死的！",
                "<32>* ...要是不知道这是节目需要，\n  我肯定会这么说。",
                "<32>* 不过你也别整太无聊了啊！"
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
                "<32>* 能力有限，是不是？",
                "<32>* 不过没关系。\n* 看在你输得起的分上，我放你过关了。"
            ],
            cooker17c: () => [
                "<32>{#p/mettaton}* 好吧，到此为止。",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* 听好了，“$(moniker2u)”...',
                        "<32>* 下次再见，可别指望我手下留情了！"
                    ]
                    : ['<32>* 那么，下回再说吧...', '<32>* 再见了各位！'])
            ],
            cooker17d: [
                '<32>{#p/basic}* 真是太“炸裂”了！',
                "<32>{#p/basic}* 不知道你下次的表现\n  会不会也这么好。"
            ],
            cooker17e: [
                '<32>{#p/basic}* 真是太“炸裂”了！',
                "<32>{#p/basic}* 没赶上时间，真可惜。"
            ],
            cooker18a: [
                '<32>{#p/mettaton}* 哎呀呀...',
                "<32>* 看来你还是赶上时间了呢。",
                "<32>* 恭喜恭喜！\n* 您也没笨得那么彻底。"
            ],
            cooker18b: [
                '<32>{#p/mettaton}* 哇哦！\n* 掐点到达！',
                "<32>* 亲爱的，运气不错哦。",
                "<32>* 就差那么几秒，\n  你就得被炸成爆米花了！"
            ],
            cooker18c: () => [
                "<32>{#p/mettaton}* 好吧，我很想继续陪你玩玩，\n  但我【现在】的日程\n  有点排不开了。",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* 听好了，“$(moniker2u)”...',
                        '<32>* 下次见面时，\n  时间【可不会】等你的！'
                    ]
                    : ['<32>* 那么，下回再说吧...', '<32>* 再见了各位！'])
            ],
            cooker19a: [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysCutscene1}* 你做到了！！',
                '<25>{#g/alphysCutscene2}* ...',
                "<25>{#g/alphysUhButHeresTheDeal}* 其实算在我意料之中吧。"
            ],
            cooker19b: [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                '<25>{#g/alphysSmileSweat}* ...做到了？？',
                '<25>{#p/alphys}{#g/alphysCutscene1}* 哦耶！\n* 你做到了！！',
                '<25>{#g/alphysWelp}* ...'
            ],
            cooker19c: [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                '<25>{#g/alphysNeutralSweat}* ...',
                '<25>{#g/alphysFR}* 这么喜欢寻死？'
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
                '<25>{#p/alphys}{#g/alphysSide}* 你找到检查点了！',
                '<25>{#g/alphysWelp}* 不过，呃，这才只是\n  第-第一个呢。',
                "<25>{#g/alphysNeutralSweat}* 还有两个要找。"
            ],
            puzzleReaction2b: ['<32>{#p/event}* 铃铃，铃铃...', '<25>{#p/alphys}{#g/alphysWelp}* 还剩一个。'],
            puzzleReaction2c: [
                '<32>{#p/event}* 铃铃，铃铃...',
                "<25>{#p/alphys}{#g/alphysHellYeah}* 好！！\n* 最后一个也搞定了！！",
                '<25>{#g/alphysCutscene2}* 诶嘿...',
                '<25>{#f/10}* ...',
                "<25>{#f/3}* 不用评判我，\n  我就是喜欢给你\n  加油打气而已。"
            ],
            moneyPre1: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* 你来了啊。',
                        '<32>{#p/mettaton}* 迄今为止，\n  你配合的很好，\n  亲爱的“$(moniker2u)”。'
                    ]
                    : world.bad_robot
                        ? [
                            "<32>{#p/mettaton}* 你迟到了，亲爱的...",
                            "<32>{#p/mettaton}* 要是你不再杀人，\n  那不成问题的。"
                        ]
                        : ['<32>{#p/mettaton}* 你来了啊，人类。', "<32>* 你比演出时间开始\n  早到了几分钟呢。"],
            moneyPre2: () =>
                iFancyYourVilliany()
                    ? ['<32>* ...不过，\n  你可以继续保持下去吗？']
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
                        : ['<25>{#p/sans}{#g/sansWink}* 我真的爱死你这个\n  事先预录好的掌声了。'],
            moneyIntro4a: ['<32>{#p/mettaton}* 纳普斯特！'],
            moneyIntro4b: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/napstablook}* 没必要老用那个鼓掌音效的..."]
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
                "<32>{#z2}* 各位，先做个简短的\n  自我介绍吧，如何？"
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
                        '<25>{#p/undyne}{#f/17}* 啊？\n* 你在教我说话？',
                        "<25>{#p/undyne}{#f/1}* 得得得，我可不跟你客气。\n  要我说，你就是个\n  烦人的破铁皮盒子。",
                        '<25>{#p/undyne}{#f/7}* 不仅如此，\n  你还把你的员工\n  当垃圾一样对待！',
                        "<25>{#p/undyne}{#f/12}* 呃，我抢了帕派瑞斯的名额\n  才不是为了你呢。",
                        '<25>{#p/undyne}{#f/16}* 我来这，就一个原因。'
                    ]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansNormal}* 你好啊。']
                        : [
                            '<25>{#p/sans}{#g/sansLaugh2}* 哦，嘿嘿...',
                            "<25>{#g/sansNormal}* 我是衫斯。\n* 骷髅衫斯。",
                            '<25>{#g/sansLaugh1}* 按理说，我的工作\n  就是抓捕长得像那边\n  那个家伙一样的人类。',
                            "<25>{#g/sansBlink}* 不过嘛，嗯...\n* 既然我们现在都在\n  电视节目上了...",
                            "<25>{#g/sansWink}* 那应该就得等一等了。"
                        ],
            moneyChat1a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* 是什么呢？"]
                    : world.dead_skeleton
                        ? ['<32>{#p/mettaton}* 还有吗？']
                        : ['<32>{#p/mettaton}* 你今天也给我们准备\n  蹩脚的烂笑话了吗？'],
            moneyChat1b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/8}* 当然是为了见见$(moniker1)啦！\n* 呋呼呼！']
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansNormal}* 没有。']
                        : [
                            "<25>{#p/sans}{#g/sansLaugh1}* 蹩脚？\n* 哇塞，镁塔顿，你还有脸\n  对我说教？",
                            "<25>{#g/sansBlink}* 不要再如玩游戏般乱闹。\n* 你的所有电视节目主持都是\n  一个样貌。",
                            "<25>{#g/sansNormal}* 但是，呃，如果我们现在\n  是在开玩笑...\n* 那就未免有点枯燥。",
                            '<25>{#g/sansLaugh1}* 说起来，我听说你想\n  主持一档喜剧节目...',
                            '<25>{|}{#g/sansLaugh2}* 但谁都- {%}'
                        ],
            moneyChat1c: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}* 行吧。']
                    : world.dead_skeleton
                        ? ["<32>{#p/mettaton}* 有人今天不舒服，是吗？"]
                        : ['<32>{#p/mettaton}* 真有趣。'],
            moneyChat2: ['<32>{#p/napstablook}* 轮到... 我讲了吗...'],
            moneyChat2a: () =>
                iRespeccYourVilliany()
                    ? ["<25>{#p/undyne}{#f/14}* 不是你还是谁，\n  难道又回到我了？"]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansBlink}* ...']
                        : ["<25>{#p/sans}{#g/sansBlink}* 放宽心，别害怕嘛。"],
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
                world.scared_ghost ? ['<32>{#p/mettaton}{#z1}* 还有吗...？'] : ['<32>{#p/mettaton}{#z1}* ...你想说什么？'],
            moneyChat2d: () =>
                world.scared_ghost
                    ? ["<32>{#p/napstablook}* 呃......... \n  不能让下一个人说吗"]
                    : ["<32>{#p/napstablook}* 我...\n* 我介绍完了", '<32>* 抱歉...............'],
            moneyChat2e: () =>
                world.scared_ghost
                    ? ['<32>{#p/mettaton}{#z0}* ...好吧...']
                    : [
                        "<32>{#p/mettaton}{#z0}* 没关系，小幽...",
                        "<32>* 我们都有紧张的时候，\n  不是吗，表-",
                        '<32>{#z2}* 呃... 宝贵！\n* 因为这次机会确实很难得！',
                        '<32>{#z4}* 哈哈哈...'
                    ],
            moneyChat3: () =>
                world.scared_ghost
                    ? ["<32>{#p/napstablook}* 到你了。", "<32>{#p/human}* （可是，你没什么想说的。）"]
                    : [
                        '<32>{#p/napstablook}* 呃......',
                        '<32>* 你可以开始讲了？',
                        "<32>{#p/human}* （可是，你没什么想说的。）"
                    ],
            moneyChat3a: () =>
                iFancyYourVilliany()
                    ? [
                        '<33>{#p/mettaton}* 好吧，总能听到...',
                        '<32>{#p/mettaton}* 有些人啊，雷声大雨点小！',
                        "<32>{#p/mettaton}* 而我们这位恶霸王中王\n  就当然不会轻易开口了。"
                    ]
                    : ['<32>{#p/mettaton}* “神秘的人类”，\n  果然名副其实。'],
            moneyChat4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? SAVE.data.b.colleg
                        ? ['<32>{#p/tem}* 提咪... 去了大鞋，']
                        : ['<32>{#p/tem}* 提咪... 上了电视！！']
                    : [
                        '<25>{#p/kidd}{#f/1}* 哈哈，确实。',
                        ...(SAVE.data.b.f_state_kidd_betray
                            ? [
                                "<25>{#f/1}* 哦！\n* 轮到我了是吗？",
                                "<25>{#f/4}* 今天...\n  真的不怎么样...",
                                '<25>{#f/8}* 哈哈...',
                                "<25>{#f/5}* ...好吧，我叫怪物小孩。"
                            ]
                            : [
                                "<25>{#f/1}* 哦！\n* 应该是轮到我了吧？？",
                                "<25>{#f/4}* 不清楚...\n  我的父母有没有\n  在看这档节目，不过...",
                                "<25>{#f/1}* 他们最好没在看吧！！\n* 他们... 应该不喜欢我上这儿。",
                                '<25>{#f/1}* 哈哈。',
                                "<25>{#f/2}* 话说回来，我叫怪物小孩。"
                            ])
                    ],
            moneyChat4a: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* 然后呢...？']
                    : ["<32>{#p/mettaton}* 等下，确定是真名？"],
            moneyChat4b: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? SAVE.data.b.colleg
                        ? ['<32>{#p/tem}* 提咪知道了所有的价格！！']
                        : ['<32>{#p/tem}* 提咪... 喜欢上电视！！']
                    : SAVE.data.b.f_state_kidd_betray
                        ? ['<25>{#p/kidd}{#f/4}* ...']
                        : ["<25>{#p/kidd}{#f/1}* 不行吗？"],
            moneyChat4c1: ['<32>{#p/mettaton}* 呃...'],
            moneyChat5: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* 好了，\n  我们的介绍环节\n  算是结束了。']
                    : ['<32>{#p/mettaton}* 好了，\n  我们的介绍环节\n  算是圆满结束了。'],
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
                            world.scared_ghost ? '<32>{#p/napstablook}* 酷' : '<32>{#p/napstablook}* 呜呜呜呜呜呜呜'
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
                            world.scared_ghost ? '<32>{#p/napstablook}* 酷' : '<32>{#p/napstablook}* 呜呜呜呜呜呜呜'
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
                            "<25>{#p/sans}{#g/sansLaugh1}* 小{@fill=#ff0}鸡{@fill=#fff}器人{@fill=#ff0}你太镁{@fill=#fff}了。",
                            "<32>{#p/mettaton}* 你出局！",
                            '<25>{#p/sans}{#g/sansLaugh2}* 呵呵，值了。',
                            '<32>{#p/mettaton}* 呃... 小幽，你想票掉谁呢？'
                        ],
            moneyVote3a: () =>
                iRespeccYourVilliany()
                    ? [
                        '<32>{#p/napstablook}* ...............',
                        "<32>* 我...\n  并不想给他们中的\n  任何一人投票...",
                        "<32>* 安黛因是皇家卫队队长，\n  而另外两个...",
                        "<32>* 他们只是小孩子......"
                    ]
                    : [
                        '<32>{#p/napstablook}* ...............',
                        '<32>* 呃... 衫斯，我...',
                        "<32>* 我不是针对你，我只是...\n  不大了解你...\n  抱歉......",
                        ...(world.dead_skeleton
                            ? ['<25>{#p/sans}{#g/sansNormal}* ...', "<25>{#p/sans}{#g/sansBlink}* 没事的。"]
                            : [
                                "<25>{#p/sans}{#g/sansBlink}* 没事，无所谓的。\n* 我能来这里也只是因为\n  我兄弟不想来而已。",
                                '<25>{#g/sansWink}* 他看到你会紧张的，\n  镁塔顿。'
                            ])
                    ],
            moneyVote3b: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* 好吧。\n* 那我就不计入你的投票了。"]
                    : world.dead_skeleton
                        ? []
                        : ["<32>{#p/mettaton}* 嗯...\n* 我等下去问问他吧。", '<32>* 那么...'],
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
                    ? '<32>{#p/mettaton}* 你要投票吗，亲爱的$(moniker2u)？'
                    : '<32>{#p/mettaton}* 你要投票吗，人类？',
                choicer.create('* （你要怎么回答？）', '投票', '弃权')
            ],
            moneyVote4: () => [
                '<32>{#p/mettaton}* 不，我该问你要\n  【票掉】谁吗？',
                choicer.create(
                    '* （你要票掉谁？）',
                    iRespeccYourVilliany() ? '安黛因' : '衫斯',
                    '纳普斯特',
                    SAVE.data.n.state_foundry_muffet === 1 ? '提米' : '怪物小孩',
                    frontEnder.name.value_true
                )
            ],
            moneyVote4a1: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* 嗯，嗯...', '<32>{#p/mettaton}* 那提米，你呢？']
                    : ['<32>{#p/mettaton}* 嗯，嗯...', '<32>{#p/mettaton}* 那怪物小孩，你呢？'],
            moneyVote4a2: ["<32>{#p/mettaton}* 看来你是【不打算】投票了。", '<32>* 好的。'],
            moneyVote4a3: () => [
                "<32>{#p/mettaton}* 认真的？\n  那位也在台上是不假，\n  但可惜并不与你竞争。",
                '<33>* 所以你的投票无效！',
                ...(SAVE.data.b.oops
                    ? []
                    : [
                        '<32>{#p/basic}* 好家伙，谢啦镁塔顿。',
                        "<32>{#p/mettaton}* 听着，亲爱的。\n* 你隐形时我很难\n  把你算入参赛者中。",
                        '<32>{#p/basic}* 哼。'
                    ])
            ],
            moneyVote4a4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* ...提米，你呢？']
                    : ['<32>{#p/mettaton}* ...怪物小孩，你呢？'],
            moneyVote5a: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/tem}* 提咪投... 阔爱幽灵！', '<32>* 提咪住的离阔爱幽灵近...\n  喜欢阔爱幽灵！']
                    : [
                        iFancyYourVilliany()
                            ? "<25>{#p/kidd}{#f/1}* 我要给$(moniker1)投一票，\n  人类酷毙了！"
                            : "<25>{#p/kidd}{#f/1}* 我要给人类投一票，\n  人类酷毙了！",
                        '<25>{#f/7}* 那个人类不仅直面了\n  有史以来...',
                        "<25>* ...最最强大的怪物之一，\n  安黛因...",
                        '<25>* 还在我差点没命的时候...',
                        '<25>* ...在最后一秒钟拉住了我，\n  把我救了下来！',
                        '<25>{#f/2}* 当着安黛因的面呢！！！',
                        ...(iRespeccYourVilliany()
                            ? [
                                "<25>{#p/undyne}{#f/14}* 呃，小子，\n  我就在这呢，你没忘吧。",
                                '<25>{#p/kidd}{#f/3}* 对哦。\n* 呃，安黛因，对不起啦！\n* 哈哈。',
                                "<25>{#p/undyne}{#f/1}* 没必要。\n* 我知道你是个乖孩子...",
                                '<25>{#p/kidd}{#f/3}* 呀... 谢了，安黛因。\n* 不过$(moniker1)比我酷太多了。'
                            ]
                            : ['<25>{#f/3}* 可以说...\n  我欠他一条命，哈哈...'])
                    ],
            moneyVote5b: ['<32>{#p/mettaton}* 你确定吗？\n  你不知道这个投票环节\n  是要投掉你想淘汰的人吗？'],
            moneyVote5c: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<32>{#p/tem}* 等等...',
                        '<32>{#p/tem}* ...卜！！！\n* 提咪卜想漂阔爱幽灵！',
                        '<32>{#p/tem}* 提咪要投骨骨！'
                    ]
                    : iRespeccYourVilliany()
                        ? [
                            '<25>{#p/kidd}{#f/4}* ...原来是这样？',
                            '<25>{#p/undyne}{#f/3}* 我也想说来着。',
                            "<25>{#p/kidd}{#f/1}* 哦... 那我不投人类了，\n  都不用说了。\n  那么...",
                            "<25>{#f/2}* 叫我票掉安黛因... \n  我可做不到！",
                            "<25>{#f/3}* 我投纳普斯特吧。\n* 希望你别难过..."
                        ]
                        : [
                            '<25>{#p/kidd}{#f/4}* ...原来是这样？',
                            "<25>{#f/1}* 嗯... 那我肯定就\n  不这么投了...",
                            '<25>{#f/4}* 票掉纳普斯特\n  可能太伤感情了...',
                            "<25>{#f/3}* 我投衫斯吧。"
                        ],
            moneyVote5x: ['<32>{#p/kidd}{#f/8}* ...', '<32>{#f/8}* 票掉人类。'],
            moneyVote5x1: ["<32>{#p/mettaton}* 咦呀，看来今天有人不咋高兴。"],
            moneyVote5x2a: ['<32>{#p/mettaton}* 但即使投票结果变成这样，\n  衫斯还是没有优势。'],
            moneyPun1: () =>
                world.dead_skeleton
                    ? ['<25>{#p/sans}* ...', '<25>{#p/sans}{#f/3}* 我还是自己走吧。']
                    : ['<25>{#p/sans}* 好吧。', "<25>{#p/sans}{#g/sansWink}* 我{@fill=#ff0}骨-啊{@fill=#fff}掉了。"],
            moneyPun1a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/napstablook}* 没关系的....................."]
                    : world.dead_skeleton
                        ? ['<32>{#p/mettaton}* 嗯，你确实该走。']
                        : ['<32>{#p/mettaton}* 嗯，你确实是。'],
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
                            : ['<32>{#p/tem}* 卜...', '<32>* 提咪没油事...', '<32>* 记得来光顾提咪商店！！']
                        : SAVE.data.b.f_state_kidd_betray
                            ? ['<25>{#p/kidd}{#f/3}* 待会见，伙计们...']
                            : [
                                '<25>{#p/kidd}{#f/3}* 天啊...',
                                '<25>{#f/1}* 没关系，谢谢你让我上节目，\n  威塔顿。',
                                '<25>{#f/1}* 我的朋友要是知道了，\n  肯定会兴奋坏了的！！！'
                            ],
            moneyFinal0c: ['<32>{#p/mettaton}* 认真的。\n* 请离开舞台。'],
            moneyFinal0d: [
                '<25>{#p/undyne}{#f/8}* 噗！\n* 你个大蠢蛋！',
                '<25>{#f/1}* 你知道，\n  那人类虽然很凶狠，\n  但至少会与大家公平竞争。',
                '<25>{#f/5}* 而你呢？',
                '<25>{#f/7}* 随心所欲，规则说改就改！',
                "<25>{#f/9}* ...对你真没啥好期待的。",
                "<25>{#f/11}* 在这点，你可是出了名的。"
            ],
            moneyFinal1: () => [
                iRespeccYourVilliany()
                    ? '<32>{#p/mettaton}* 谢天谢地。'
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? SAVE.data.b.colleg
                            ? "<32>{#p/mettaton}* ...天，至少她走了。"
                            : "<32>{#p/mettaton}* 她看起来... 很开心？"
                        : SAVE.data.b.f_state_kidd_betray
                            ? "<32>{#p/mettaton}* 那小孩看起来... 很开心？\n* 老实说，我不确定..."
                            : '<32>{#p/mettaton}* 开心就好。\n* 郑重声明，我叫“镁塔顿”，\n  不是“威塔顿”。',
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
                        "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* 喂，镁塔顿！\n* 你这是在往我伤口上\n  撒盐吗？！",
                        '<32>{#p/mettaton}* ...',
                        "<32>* 好吧，太遗憾了！\n* 因为，你们也知道..."
                    ]
                    : [
                        '<32>{#p/event}* 铃铃，铃铃...',
                        "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* 打-打住！\n  你不能把那个随便送人，\n  我... 那是我的财产！",
                        '<32>{#p/mettaton}* 哦，你知道了啊？',
                        "<32>* 我之前不知情，向你致歉。\n* 不过...",
                        '<25>{#p/alphys}{#g/alphysWTF2}* 不过？？？',
                        "<32>{#p/mettaton}* 艾菲斯博士，\n  恐怕来不及了哦..."
                    ]),
                '<32>{#z3}* 选手们已经起兴致了。',
                '<25>{#p/alphys}{#g/alphysWTF}{#z0}* 你玩我呢？',
                '<25>{|}{#p/alphys}{#g/alphysCutscene3}* 我花了好几个月才- {%}'
            ],
            moneyFinal5: [
                '<32>{#p/mettaton}* 哎呀呀。\n* 信号好像不好。',
                '<32>* 可怜的艾菲斯博士。\n* 她的喵喵玩偶要\n  拱手相让给别人了。',
                '<32>{#z2}* 让给在场的其中一位！',
                '<32>{#z3}* 但是要给谁呢？'
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
                            '<25>{#p/kidd}{#f/4}* 哈... 啊？',
                            '<25>{#f/7}* ...',
                            '<25>{#f/14}* 哟噢噢噢噢！！！！'
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
                            '<25>{#p/kidd}{#f/4}* 哈... 啊？',
                            '<25>{#f/7}* ...',
                            '<25>{#f/14}* 哟噢噢噢噢！！！！'
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
            moneyTrash1: ['<32>* 等等，小幽，你这是上哪...', '<32>* ...去...', '<32>{#z1}* ...'],
            moneyTrash2: ["<32>{#z0}* 看来小幽不想\n  呆在这了。"],
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
                "<32>* 不然，就没有下一期节目了...",
                '<32>* 敬请期待下期节目，\n  《舞动命运》！',
                '<32>{#z3}* 当然，还请各位保持完美！'
            ],
            moneyWhisper1: () => [
                '<32>{#p/napstablook}* （呐呐... 嘿...）',
                '<32>* （我，呃...）',
                ...(SAVE.data.b.f_state_blookbetray
                    ? ["<32>* （我明白...\n  你可能不想见到我，不过...）"]
                    : SAVE.data.n.state_wastelands_napstablook === 2
                        ? ["<32>* （我明白...\n  你可能不喜欢我，不过...）"]
                        : SAVE.data.n.state_wastelands_napstablook === 4
                            ? ["<32>* （我明白...\n  你和我关系还没那么好，不过...）"]
                            : SAVE.data.n.state_foundry_blookdate > 1
                                ? ["<32>* （我希望我的请求不算过分，\n  虽然我们是朋友，但是...）"]
                                : ["<32>* （我希望我的请求不算过分，\n  但是...）"]),
                '<32>* （我在想... 节目结束之后...）',
                '<32>* （我们得把喵喵玩偶还给艾菲斯）',
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        "<32>* （她今天有点郁闷，\n  而且...）",
                        "<32>* （不说了......\n  也算做了件好事，你不觉得吗？）"
                    ]
                    : [
                        '<32>* （我跟她一起看过一次\n  《喵喵航天行》...）',
                        '<32>* （那天她... 真的很开心......）'
                    ]),
                choicer.create('* （你要怎么回答？）', '好啊', '不要')
            ],
            moneyWhisper2a: ['<32>{#p/napstablook}* （谢谢你...）'],
            moneyWhisper2b: ['<32>{#p/napstablook}* （..................）'],
            moneyWhisper3: ["<32>{#p/mettaton}* 怎么了吗？"],
            moneyWhisper4: [
                '<32>{#p/napstablook}* （那我们... 就来猜吧...）',
                '<32>{#p/napstablook}* （嘿）'
            ],
            napchat0: ['<32>{#p/human}* （你把喵喵玩偶\n  递给了纳普斯特。）'],
            napchat1: () =>
                SAVE.data.n.state_foundry_undyne === 1
                    ? ["<32>{#p/napstablook}* 我会让他知道你为她\n  做了什么的"]
                    : ["<32>{#p/napstablook}* 我会尽快把这个还给她的"],
            napchat2a: ['<32>{#p/napstablook}* 下次再见吧............'],
            napchat2b: [
                "<32>* 我... 还有点事\n  要跟你说........",
                '<32>* 在前面等我，就在那个\n  大镁塔顿喷泉那里。',
                '<32>* 喷泉见............'
            ],
            truemtt3: [
                '<32>{#p/basic}* 小幽...',
                '<32>* ...',
                '<32>* 我现在有种不好的预感。'
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
                    ['<25>{#p/asriel2}{#f/13}* ...{%100}', '<25>{#f/4}* $(name)，\n  按计划行事吧。{%100}']
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
            rg2a: ["<32>{#p/basic}{#x1}* 站住！\n* 你走得有点太远了！{#x3}"],
            rg2b: () =>
                world.genocide
                    ? ["<32>{#p/basic}{#x1}* 我们不会就这么放你走的，\n  对吧姑娘？{#x3}"]
                    : [
                        ...(iFancyYourVilliany()
                            ? [
                                '<32>{#p/basic}{#x1}* 所以，\n  你就是那个叫“$(moniker2)”\n  的小孩，对吧？{#x3}',
                                iRespeccYourVilliany()
                                    ? '<32>{#x2}* 对，我们从电视上看到了。\n* 我们也看到安黛因\n  就那样放弃了抓你。{#x3}'
                                    : "<33>{#x2}* 对，我们从电视上看到了。\n* 我们也知道你并没有看上去\n  那么凶残。{#x3}",
                                "<32>{#x1}* 多么可怜啊，不是吗？{#x3}"
                            ]
                            : [
                                "<32>{#p/basic}{#x1}* 我们听说有个人类\n  在这附近游荡。{#x3}",
                                "<32>{#x2}* 我们通常不会随便起疑心，\n  但是孩子，你刚刚才上了\n  电视直播...{#x3}",
                                "<32>{#x1}* 那我们就很难忽略你了，\n  对吧？{#x3}"
                            ]),
                        '<32>* ...',
                        "<32>{#x2}* 我就是这么想的。{#x3}"
                    ],
            rg2c1: ["<32>{#p/basic}{#x1}* 宝贝，你跟我现在的想法\n  一模一样？{#x3}"],
            rg2c2: ['<32>{#p/basic}* ...', '<32>{#p/basic}{#x1}{#x2}* 哦，那是当然。{#x3}', '<32>{#p/basic}* ...'],
            rg2c3: ['<32>{#p/basic}* ...'],
            rg2d: () =>
                world.genocide
                    ? [
                        "<32>{#p/basic}{#x1}* 一起上吧，宝贝。\n* 我们就让安黛因瞧瞧\n  我们的实力...{#x3}",
                        '<32>{#x1}{#x2}* ...好好教训一下这个叛徒吧。{#x3}'
                    ]
                    : [
                        "<32>{#p/basic}{#x1}* 一起上吧，宝贝。\n* 我们就让安黛因瞧瞧\n  我们的实力...{#x3}",
                        iFancyYourVilliany()
                            ? '<32>{#x1}{#x2}* ...好好教训一下这个\n  横行霸道的家伙吧。{#x3}'
                            : '<32>{#x1}{#x2}* ...好好教训一下这个人类吧。{#x3}'
                    ],
            rg2e: ['<32>{#p/basic}* 哇。\n* 真是...', '<32>{#p/basic}* ...有点东西啊。'],
            rg2f: [
                '<32>{#p/basic}{#x1}* 姑娘，抓个人类不该遭这种罪。{#x3}',
                "<32>{#x2}* 没错，还是让男孩儿解决吧...\n  如果安黛因觉得这活需要他们的话。{#x3}"
            ],
            hapsta1: () => [
                '<32>{#p/napstablook}* 呃...',
                '<32>* 你能...\n* ...帮我个忙吗？',
                "<33>* 那事... 挺重要的......",
                choicer.create('* （你要怎么回答？）', '好的', '我很忙')
            ],
            hapsta1a: ['<32>{#p/napstablook}* 好.........', '<32>* 跟我来吧.........'],
            hapsta1b: ['<32>{#p/napstablook}* 哦........', "<32>* 那我不麻烦你了........."],
            hapsta2: ['<32>{#p/napstablook}* 我们到了...', "<32>* 你可能想问来这做什么......"],
            hapsta3a: [
                "<32>{#p/napstablook}* 最近我越看镁塔顿\n  越觉得他是我失踪的表亲.........",
                "<32>* 自他失踪以来，\n  我一直很担心他"
            ],
            hapsta3b: ['<32>* 我只是希望他没事。'],
            hapsta4: ['<32>{#p/napstablook}* 来看看这个'],
            hapsta5: ["<32>{#p/napstablook}* 我在皇家实验室\n  找到了这份私密录音文件"],
            hapsta6: [
                '<32>{#p/alphys}* 你最后的身体还需要\n  一些时间完成...',
                '<32>* 现在你还确定想这样做吗？',
                "<32>{#p/hapstablook}* 博士，我准备好了。",
                "<32>{#p/alphys}* 行...\n  我给镁塔顿联-联下网。",
                '<32>* 有了这块控制芯片，\n  你就能操控我为你制作的\n  任何一台身体...',
                "<32>* 等我做完新身体，\n  就-就把芯片插到那上面。",
                '<32>* 你觉得这样... 可以吗？',
                "<32>{#p/hapstablook}* 博士，这法子太神了。\n* 太神了！",
                "<32>{#p/alphys}* 嘿嘿... 你...\n* 你人真好...",
                '<32>{#p/hapstablook}* 所以我什么时候可以开始？',
                '<32>{#p/alphys}* 哦，呃，可以现在就试试？',
                "<32>* 这是块通用芯片，\n  你不用和它融合也能操作。",
                '<32>{#p/hapstablook}* 哦~，棒欸...',
                '<32>{#p/hapstablook}* 一台可升级的身体\n  会让我的星途更平坦的！',
                '<32>{#s/echostop}{#p/event}* 回放完毕。'
            ],
            hapsta7: [
                "<32>{#p/napstablook}* 就是这样",
                "<32>{|}{#p/napstablook}* 如果我不知道其他更好的可能，\n  那我就觉得这是- {%}"
            ],
            hapsta8: ["<32>{#p/finalghost}* 对不起，我迟到了。"],
            hapsta9: ['<32>* 哦。\n* 你好啊，人类。'],
            hapsta10: ['<32>* 小幽表亲。\n* 人类咋也在。'],
            hapsta11: ['<32>{#p/napstablook}* 我觉得......\n* 人类可能帮得上忙......'],
            hapsta12a: () => [
                ...[
                    ['<32>{#p/finalghost}* 嗯。\n* 不过人类最好可以站在我们这边。'],
                    ["<32>{#p/finalghost}* 嗯。\n* 不过人类得学着少用暴力。"],
                    ["<32>{#p/finalghost}* 嗯。\n* 不过人类这次可别再逃跑了。"],
                    [
                        "<32>{#p/finalghost}* 嗯。\n* 上次见到人类，\n  感觉有点不太聪明的样子。",
                        '<32>* 谁知道呢？'
                    ],
                    ['<32>{#p/finalghost}* 嗯。\n* 人类对我挺好的...'],
                    ['<32>{#p/finalghost}* 嗯。\n* 不过人类最好老实点。'],
                    ["<32>{#p/finalghost}* 嗯。\n* 不过人类最好不要随便搭讪。"]
                ][SAVE.data.n.state_wastelands_dummy]
            ],
            hapsta12b: ['<32>* 我们准备打电话了吗？'],
            hapsta13: ['<32>{#p/napstablook}* 额，等等吧...', "<32>{|}* 所以- {%}"],
            hapsta14: ['<32>{#p/basic}* 呆子们，我来了！'],
            hapsta15: ['<32>{#p/finalghost}* 你就非得这么\n  大张旗鼓的吗？'],
            hapsta16: [
                '<32>{#p/basic}* 人类。\n* 人类！\n* 人-类！！！',
                '<32>* 这会又和我表亲作甚？'
            ],
            hapsta17: ["<32>{#p/finalghost}* 人类没做啥。\n* 你反应也太夸张了。"],
            hapsta18: ['<32>{#p/basic}* 哎呀，开个玩笑嘛..'],
            hapsta19: ['<32>{#p/finalghost}* 自然。\n* 现在，对于手头上的事情...'],
            hapsta20: ["<32>{#p/finalghost}* 我们都知道\n  我们为何相聚于此。\n* 我们的表亲..."],
            hapsta21: ["<32>{#p/basic}* 我们的表亲是个叛徒。"],
            hapsta22: [
                '<32>{#p/finalghost}* ...',
                '<32>* 我们的表亲可以是任何东西，\n  但绝对不会是个“叛徒”。',
                '<32>* 实际上，我和小幽\n  在读了表亲的日记后...\n  我才知道这是我们的错。'
            ],
            hapsta23: ['<32>{#p/napstablook}* .........\n* .........\n  我们要给他打电话吗？'],
            hapsta24: ["<32>{#p/finalghost}* 我没意见。"],
            hapsta25: [
                '<32>{#p/event}* 铃铃，铃铃...',
                '<32>{#p/mettaton}* 小幽！\n* 多棒的惊喜啊！\n* 你需要什么不？',
                '<32>{#p/napstablook}* 额... 我想跟你聊聊',
                '<32>{#p/mettaton}* 好啊，我们当然可以聊天，\n  你想聊啥呢？',
                '<32>{#p/napstablook}* 可以私下聊吗.........',
                '<32>{#p/mettaton}* 哦。',
                "<32>{#p/mettaton}* 恐怕现在不行，\n  我还在准备另一场演出。",
                "<32>* 等完事我们见个面怎么样？"
            ],
            hapsta26: ['<32>{|}{#p/basic}* 你一直在回避- {%}'],
            hapsta27: ['<32>{#p/finalghost}* 闭嘴！'],
            hapsta28: [
                '<32>{#p/napstablook}* 那些工作...',
                '<32>{#p/mettaton}* 棒极了，亲爱的。',
                "<32>* 到时候我会见面\n  跟你说说的！"
            ],
            hapsta29: [
                '<32>{#p/basic}* 我知道了。\n* 我知道了！\n* 我知道了！',
                '<32>* 这计划从一开始\n  就注定要失败。'
            ],
            hapsta30: [
                "<32>{#p/finalghost}* 就只是因为\n  镁塔顿现在不在这吗，\n  但这并不代表我们的计划会失败。",
                "<32>* 我们必须要有耐心。"
            ],
            hapsta31: ['<32>{#p/basic}* 好吧...'],
            hapsta32: () => [
                '<32>{#p/finalghost}* 好吧，\n  聊天很愉快再见。',
                "<32>* 我们很快就会再见面的。"
            ],
            hapsta34: () => [
                '<32>{#p/napstablook}* 嘿...',
                ...(SAVE.data.b.oops
                    ? ['<32>{#p/napstablook}* 回见，人类']
                    : [
                        '<32>{#p/napstablook}* 还有$(namel)？',
                        '<32>{#p/basic}* ...？',
                        '<32>{#p/napstablook}* .........\n* 谢谢你能陪着。'
                    ])
            ],
            hapsta35: ['<32>{#p/basic}* 真希望自己能帮上忙，\n  一次也行...'],
            opera1: () =>
                SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* ...嘿，额...',
                        "<25>{#f/30}* 对不起，\n  我刚才就那样跑掉了。",
                        "<25>{#f/32}* 那件事真的...\n  很难接受...",
                        '<25>{#f/20}* 看到你将安黛因\n  就那么丢在那里\n  放任不管。',
                        "<25>{#f/5}* 不过，我...\n* 我知道这并非你的本意...",
                        '<25>{#f/20}* 你只是出于害怕，\n  想尽快逃离对你\n  紧追不舍的追捕者。',
                        '<25>{#f/31}* 就算这样解释...\n  我还是不能接受\n  她就那么...',
                        '<25>{#f/31}* ...',
                        '<25>{#f/20}* 好了，\n  我们该去休闲回廊了。'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysNervousLaugh}* 啊，你来了！',
                        ...(world.bad_lizard === 1
                            ? [
                                "<25>{#g/alphysSideSad}* 我一直在... 担心，\n  如果我不陪同你，\n  你会做出什么。",
                                "<25>{#g/alphysOhGodNo}* 啊，没说你\n  会做出什么坏事！",
                                '<25>{#g/alphysWorried}* 就只是...',
                                "<25>{#g/alphysCutscene2}* 你知道吗，\n  我觉得为你提供帮助\n  真的非常重要。",
                                '<25>{#g/alphysCutscene2}* ...',
                                "<25>{#g/alphysWelp}* 有一件事是肯定的，\n  那些守卫不应该攻击你。"
                            ]
                            : [
                                "<25>{#g/alphysSideSad}* 我真-真的很担心你...",
                                '<25>{#g/alphysSideSad}* 又是谜题，\n  又是镁塔顿，\n  还有...',
                                '<25>{#g/alphysHaveSomeCompassion}* ...',
                                '<25>{#g/alphysHaveSomeCompassion}* 那些本来不应该\n  攻击你的守卫。'
                            ]),
                        "<25>{#g/alphysUhButHeresTheDeal}* 也许出于某种原因？？？\n* 她们没收到消息？？？",
                        '<25>{#g/alphysTheFactIs}* 我是说，\n  她们是今天才新来的...',
                        ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                            ? [
                                "<25>{#g/alphysWelp}* 好，呃，总之，\n  看起来你状态还不错，\n  所以...",
                                '<25>{#g/alphysCutscene2}* 我们应该可以走了。'
                            ]
                            : [
                                "<25>{#g/alphysWelp}* 好，呃，总之，\n  看起来你状态还不错。",
                                "<25>{#g/alphysFR}* 除了那个不属于你的\n  喵喵玩偶。"
                            ])
                    ],
            opera2: ['<25>{#p/alphys}{#g/alphysInquisitive}* 跟上吧？'],
            opera3: ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}'],
            opera4: () =>
                world.genocide
                    ? ["<25>{#p/asriel2}{#f/1}* 是时候动手了。"]
                    : world.bad_lizard === 1
                        ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 我们到了。']
                        : [
                            "<25>{#p/alphys}{#g/alphysCutscene1}* 好，咱到了！",
                            '<25>{#g/alphysSmileSweat}* 过安检的时候，\n  最-最好跟着我。'
                        ],
            opera5: ['<25>{#p/alphys}{#g/alphysSmileSweat}* 你-你们好呀。', "<32>{#p/basic}{#x1}* 好啊。{#x3}"],
            opera5b: ['<25>{#p/alphys}{#g/alphysSmileSweat}* 哦-哦，\n  我觉得这里应该\n  没有守卫。'],
            opera6: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 呃，是-是啊！\n* 你好！'],
            opera7: () =>
                world.bad_lizard === 1
                    ? [
                        "<25>{#p/alphys}{#g/alphysWelp}* 幸好你们之前\n  没有攻击人类....",
                        "<25>{#g/alphysNeutralSweat}* 要是你们攻击了人类，\n  那你们可能..."
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* 好呃，谢谢你们...\n  早些时候没有攻击人类。',
                        '<25>{#g/alphysGarbo}* 感觉别的守卫都没有\n  真正理解我的意思。'
                    ],
            opera8: ['<32>{#p/basic}{#x1}* ...人类？{#x3}', '<32>{#x1}* 哪有人类？{#x3}'],
            opera9: [
                "<25>{|}{#p/alphys}{#g/alphysTheFactIs}* 呃呃呃我不知道我就是\n  想着帮- {%}",
                "<32>{#p/basic}{#x1}* 艾菲斯，你可是，就，\n  前哨站的二把手啊。{#x3}",
                "<32>{#x2}* 对啊，你都不用问，\n  我们就会让你通过的，\n  哈哈。{#x3}",
                "<32>{#p/basic}{#x1}{#x2}* 我们还没完成\n  卫队的训练呢！{#x3}"
            ],
            opera10: [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 哦。\n* 我知道了。',
                "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 那我们就走了！"
            ],
            opera11: ['<32>{#p/basic}{#x1}* （老兄... 她真的没问题吗？）{#x3}', '<32>{#x2}* （你问我，我问谁啊...）{#x3}'],
            opera12: ['<32>{#p/basic}* 与此同时...'],
            opera13: [
                "<25>{#p/alphys}{#g/alphysSideSad}* 这里太暗了...",
                '<25>* 我们可能得回头。\n  找一条别的路过去。',
                "<25>{|}* 除非是- {%}"
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
                        : '去|往|远|方...',
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
                            ? "<32>{#x0}* 真倒霉...\n* 你倒挺镇定！"
                            : "<32>{#x0}* 真丢脸...\n* 你倒挺镇定！"
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
                "<32>{#p/mettaton}{#e/mettaton/0}* 对哦...\n* 差点忘了这茬了。",
                ...(SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
                    ? [
                        "<32>{#p/mettaton}{#e/mettaton/5}* ...咱要不去别的地方聊？\n* 这儿不太安全。"
                    ]
                    : [])
            ],
            hapsta37: () =>
                SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
                    ? ['<32>{#p/napstablook}* 呃，好吧......\n* 你真想聊的话，\n  私下聊也不是不行......']
                    : [
                        '<32>{#p/napstablook}* 嘿，呃......',
                        '<32>{#p/napstablook}* 我看到了以前的实验室记录...'
                    ],
            hapsta38: ['<32>{#p/mettaton}{#e/mettaton/34}* 所以...？'],
            hapsta39: [
                '<32>{#p/napstablook}* 嗯，有一段声音听起来像是...',
                '<32>{#p/napstablook}* 像是......'
            ],
            hapsta40: ["<33>{#p/mettaton}{#e/mettaton/11}* 亲爱的，\n  可以快点吗，\n  我们可没那么多时间。"],
            hapsta41: [
                '<32>{#p/napstablook}* 像是你。',
                '<32>{#p/napstablook}{#e/mettaton/3}* .........\n* 真正的你。'
            ],
            hapsta42: [
                '<32>{#p/mettaton}{#e/mettaton/2}* “真正的我”是吧？',
                "<32>{#e/mettaton/0}* 等下，先别急着下结论。"
            ],
            hapsta43: ["<32>{#p/finalghost}* 那段话是事实。"],
            hapsta44: ['<32>{#p/mettaton}{#e/mettaton/6}* ...现在幽灵们\n  联手来对付我了啊。\n* 真可爱。'],
            hapsta45: ['<25>{#p/alphys}{#g/alphysTheFactIs}* 和-和我没关系，\n  我-我保证...'],
            hapsta46: [
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}{#e/mettaton/3}* 那-那我就不打扰了..."
            ],
            hapsta47: [
                "<32>{#p/basic}* 请问，你这是打算溜哪去啊？",
                "<32>{#p/basic}* 这一堆麻烦事\n  还不是你起的头！",
                "<32>{#p/basic}* 还不是你录了音，\n  害得我现在非得来这！"
            ],
            hapsta48: ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 哎呀。'],
            hapsta49a: [
                "<32>{#p/mettaton}{#e/mettaton/9}* 对，就是这样。",
                "<32>{#e/mettaton/7}* 你们都出现在这里... \n  就是为了来带我回家的对吧。"
            ],
            hapsta49b: ['<32>{#e/mettaton/8}* “追逐梦想”就到此为止了，\n  是吧小幽？'],
            hapsta50: ['<32>{|}{#p/napstablook}* 表亲，我- {%}'],
            hapsta51a: ['<32>{#p/mettaton}{#e/mettaton/18}* 哦，别叫我“表亲”。'],
            hapsta51b: [
                "<32>{#p/mettaton}{#e/mettaton/20}* 如果不是因为你，\n  我也许还会继续享受\n  这种平静的生活...",
                '<32>{#p/mettaton}{#e/mettaton/17}* ...但并没有。\n* 你就是想让我重新【加入】到\n  家族企业。',
                '<32>{#p/mettaton}{#e/mettaton/19}* 容我补充一下，\n  这家企业从经营第一天开始\n  就一直在亏损。'
            ],
            hapsta52: ['<32>{#p/napstablook}{#e/mettaton/3}* .........\n* 我知道了。'],
            hapsta53: [
                '<32>{#p/mettaton}{#e/mettaton/17}* 哦，你知道什么！\n* 你真的理解\n  这对我的感受吗？'
            ],
            hapsta54: ["<32>{#p/finalghost}* 考虑到我们都读过你的日记，\n  我觉得应该会的..."],
            hapsta55a: [
                "<32>{#p/mettaton}{#e/mettaton/19}* 我不在乎你们是否读过我的日记，\n  我只想让你们从我这里听到...",
                '<32>{#p/mettaton}{#e/mettaton/3}* ...\n* 听着，“表亲”。\n* 这一切都与这个工作无关。',
                '<32>{#p/mettaton}{#e/mettaton/14}* 养蜗牛的这份工作也许不是\n  最迷人的消遣，\n  但我喜欢它本来的样子。',
                "<32>{#p/mettaton}{#e/mettaton/13}* 但是... \n  我一离开农场，\n  这就会成为一个问题...",
                "<32>{#p/mettaton}* ...你们这些人都不愿意\n  拿出即使是一秒钟的时间\n  用来关心我吗？"
            ],
            hapsta55b: [
                '<32>{#p/mettaton}{#e/mettaton/16}* 关怀的电话...\n  突如其来的拜访...\n  这些都不存在...',
'<32>{#p/mettaton}{#e/mettaton/16}* 唯一就是偶尔问一句\n  “嘿，你啥时候回来工作？”',
                "<32>{#p/mettaton}{#e/mettaton/15}* 这对我来说很明显，\n  在某些时刻，\n  我只是个顺手的工具罢了...",
                '<32>{#p/mettaton}{#e/mettaton/11}* 只是这个伟大的\n  幽灵家族机器上的一个齿轮。'
            ],
            hapsta56: ['<32>{#p/napstablook}* ...............'],
            hapsta57a: ['<32>{#p/mettaton}{#e/mettaton/2}* 无话可说了是吧？\n* 对，我就知道会这样。'],
            hapsta57b: [
                "<32>{#p/mettaton}{#e/mettaton/5}* 老实说，\n  我压根不在乎\n  你们会说啥。",
                "<32>{#p/mettaton}{#e/mettaton/10}* 我已经得到了\n  生活中我想要的一切，\n  再看看你们...",
                '<32>{#p/mettaton}{#e/mettaton/12}* 依附训练人偶，\n  乞求残羹剩饭。'
            ],
            hapsta58: ["<32>{#p/finalghost}* 你说你压根不关心我们，\n  但你还是会邀请我们\n  参与你的节目。"],
            hapsta59: [
                '<32>* 在最近的节目中，\n  你甚至给了小幽\n  特殊的待遇...',
                "<32>* 踢出其他选手，\n  令其在最后一轮\n  与人类竞争。"
            ],
            hapsta60: ['<32>{#p/mettaton}{#e/mettaton/5}* ...只是怜悯罢了。'],
            hapsta61: ['<32>{#p/basic}* 又或者... 其实在你内心深处\n  也有想要回来的想法！'],
            hapsta62: ['<32>{#p/mettaton}{#e/mettaton/11}* 哈哈哈...\n* 开什么银河系玩笑。'],
            hapsta63: ["<32>{#p/napstablook}* 我很抱歉，表亲"],
            hapsta64: ['<32>{#p/mettaton}{#e/mettaton/21}* ...哦？'],
            hapsta65a: [
                "<32>{#p/napstablook}* 在你走后，\n  我们就跟不上客户的需求了...",
                "<32>{#p/napstablook}{#e/mettaton/15}* 为此，\n  我们必须缩小农场规模\n* 现在农场... 再不如前..."
            ],
            hapsta65b: ['<32>{#p/napstablook}* 在你离开前，\n  我们从来都没意识到\n  你对我们的重要性...'],
            hapsta65c: ["<32>{#p/napstablook}{#e/mettaton/4}* 所以... 为曾发生过的一切\n* 我真的感到抱歉........."],
            hapsta66a: [
                '<32>{#p/mettaton}* 我知道了。',
                '<32>{#p/mettaton}{#e/mettaton/6}* ...我知道了。',
                "<32>{#p/mettaton}{#e/mettaton/5}* 你就是那种被提溜着耳朵出来骂\n  才会库库下跪磕头\n  道歉的人是吧？"
            ],
            hapsta66b: ['<32>{#p/mettaton}{#e/mettaton/0}* 呵，我早该知道的。'],
            hapsta67: ["<32>{|}{#p/napstablook}* 不是- {%}"],
            hapsta68a: [
                '<32>{#p/mettaton}{#e/mettaton/3}* 不，我明白了。\n  你想让我原谅你然后你就可以拍拍\n  屁股走人当一切都没发生过对吧？',
                "<32>{#p/mettaton}{#e/mettaton/5}* 好吧，恐怕事情发展\n  不会如你所愿，小幽。"
            ],
            hapsta68b: ["<32>{#p/mettaton}{#e/mettaton/6}* ...总之，\n  我要去准备一场\n  压轴演出..."],
            hapsta68c: ["<32>{#p/mettaton}{#e/mettaton/11}* 所以，如果你不介意，\n  我现在就会走人。"],
            hapsta69: ['<32>{#p/basic}* 给老子回来。\n* 给老子回来！\n* 给-老-子-回-来！！！'],
            hapsta70: ["<33>{#p/finalghost}* 我觉得他不会回来的。"],
            hapsta71: [
                '<32>{#p/napstablook}* 也许...\n  他只是需要一点\n  私人空间而已......',
                '<32>{#p/napstablook}* 我们应该给他一个机会.........'
            ],
            hapsta72: ["<32>{#p/basic}* 纯纯浪费时间。\n* 我回安黛因家去了。"],
            hapsta73: ['<32>{#p/finalghost}* 小幽，干得不错。', '<32>{#p/finalghost}* 干得不错。'],
            hapsta74: ['<32>{#p/napstablook}* 不............'],
            hapsta75: () =>
                SAVE.data.b.oops
                    ? [
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 嘿...\n* 别听他们的。",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 我认-认识镁塔顿\n  已经有一段时间了。",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 除非他需要时间思考，\n  否则不会那样离开的。",
                        '<32>{#p/napstablook}* 是啊...',
                        '<32>{#p/napstablook}* 应该是......'
                    ]
                    : [
                        "<32>{#p/basic}* 你也知道他来过这套吧？",
                        "<32>{#p/basic}* 他会回来的。",
                        '<32>{#p/napstablook}* $(namel)......\n* 嗯...',
                        '<25>{#p/alphys}{#g/alphysInquisitive}* $(name)...？',
                        "<32>{#p/napstablook}* 呃，说来话长",
                        '<25>{#p/alphys}{#g/alphysWelp}* ...可以等会和我聊聊？',
                        '<32>{#p/napstablook}* ...\n* $(namel)，谢谢你\n* 谢谢你支持我......',
                        "<32>* 虽说只是在一旁陪着，\n  但你真的为我们家做了很多",
                        "<32>* 即使... 这不是你真正\n  所需要的家庭......",
                        '<32>{#p/basic}* 小幽，我...',
                        '<32>{#p/napstablook}* $(namel)，如果...\n* 不，当你再见到他时...',
                        "<32>* 永远不要让他忘记你\n  在生活中有多在乎他...\n  好吗？"
                    ],
            hapsta76: [
                "<32>{#p/napstablook}* 对了，喵喵玩偶还你",
                "<32>* 我希望还没有太迟......",
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* 不，没-没问题的。\n* 谢谢你。"
            ],
            hapsta77: ['<32>{#p/napstablook}* 嗯，回见......'],
            opera36a: () => [
                '<25>{#p/alphys}{#g/alphysWelp}* 真是个让人\n  始料不及的转折。',
                ...(SAVE.data.b.a_state_hapstablook && !SAVE.data.b.oops
                    ? [
                        '<25>{#p/alphys}{#g/alphysInquisitive}* 更不用提\n  “$(name)”的事了...',
                        "<25>* 据我所知，\n  那人死了将近一百年了...",
                        "<25>{#g/alphysWelp}* 哦算了。\n* 他们以后\n  应该会告诉我的。",
                        "<25>{#g/alphysWelp}{#x5}* 说到这里，\n  你应该想要出发了..."
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* 不过看起来，\n  我们是平安无事了...",
                        "<25>{#g/alphysWelp}{#x5}* 这意味着...\n  你应该想要出发了..."
                    ]),
                '<25>{#g/alphysTheFactIs}{#x6}* 我大概也得回到\n  实验室去了...',
                '<25>{#g/alphysNervousLaugh}{#x5}* 所以...\n  我们，回头见？',
                ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                    ? [
                        "<25>{#g/alphysUhButHeresTheDeal}* 呃，但-但别担心！\n* 我会给你打电话的！\n  等你到...",
                        '<25>{#g/alphysNervousLaugh}* 等你...',
                        "<25>{#g/alphysHellYeah}* 我-我会跟你保持\n  联络的！"
                    ]
                    : [
                        ...(!SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                            !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                            !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                            ? ((SAVE.data.b.mewget = true),
                                [
                                    '<25>{#g/alphysNervousLaugh}* ...',
                                    '<25>{#g/alphysFR}* ...其实，在走之前，\n  我想跟你说一声。',
                                    '<25>{#f/33}* 我找到了\n  被你抛弃的喵喵玩偶。',
                                    "<25>{#g/alphysCutscene3}* 现在物归原主了。\n* 我永远不会再次抛弃它。",
                                    '<25>{#g/alphysHellYeah}* 好-好耶！'
                                ])
                            : [
                                '<25>{#g/alphysNeutralSweat}{#x5}* 但是，呃，\n  在走之前...',
                                '<25>{#f/10}* 你能不能... 把我的\n  喵喵玩偶还给我呢？',
                                '<25>{#f/3}* 求你了？',
                                choicer.create('* （把喵喵玩偶还给艾菲斯？）', '还给她', '才不要')
                            ])
                    ])
            ],
            opera36b1: [
                '<32>{#p/human}* （你把喵喵玩偶递给了艾菲斯。）',
                '<25>{#p/alphys}{#g/alphysCutscene2}* 谢谢你。'
            ],
            opera36b2: [
                '<32>{#p/human}* （你决定不还。）',
                '<25>{#p/alphys}{#g/alphysWTF}* ...',
                '<25>{#g/alphysCutscene2}* 得得得，\n  给你就是了。',
                "<25>{#g/alphysCutscene2}* 现在归你了好吧？",
                "<25>{#f/33}* 啥？\n* 我才不关心呢。"
            ],
            opera37: (gib: boolean) =>
                SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew
                    ? ['<25>{#p/alphys}{#g/alphysSmileSweat}* 路-路上小心！！']
                    : gib
                        ? ["<25>{#p/alphys}{#f/10}* 我-我会和你保持联系的。"]
                        : ['<25>{#p/alphys}{#f/3}* 一点也不！！！'],
            opera38: [
                '<32>{#p/basic}* ...现在我明白为什么小幽\n  总是有那种感觉了。',
                "<32>* 那种自责的感觉，\n  觉得自己明明为了关心某人\n  可以做得更好的感觉...",
                "<32>* 嗯哼。\n* 我应该能帮上更多的忙的。",
                '<32>* 你还记得在托丽尔那里\n  发生的事吗？',
                '<32>* 你把我叫了出来，\n  然后我就开始跟她对话？',
                '<32>* 我是了解那些怪物的。\n* 这应该可以帮助咱们\n  更快地通过这片区域。',
                '<32>* 所以，\n  我要是想起来什么了的话...',
                '<32>* 你就像之前那样把我叫出来，\n  好吗？'
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
            operaY1: ['<25>{*}{#p/asriel2}{#f/13}* 你说什- {^5}{%}'],
            operaY2: ['<25>{*}{#p/asriel2}{#f/15}* $(name)。\n* 你在干啥。{^40}{%}'],
            operaY3: ["<25>{*}{#p/asriel2}{#f/15}* 快停下...{^40}{%}"],
            operaY4: ['<25>{*}{#p/asriel2}{#f/16}* $(name)，\n  用不着这样。{^40}{%}'],
            end1: (rgk: boolean) => [
                '<32>{#p/mettaton}* 终于...',
                ...(world.mttvar
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
                                '<32>{#e/mettaton/3}* 干的不错。',
                                "<32>{#e/mettaton/35}* 这样的行为能保持【这么】\n  长时间真是不可思议啊...",
                                '<32>{#e/mettaton/6}* 但现在，\n  是时候该展现出你的\n  庐山真面目了。',
                                '<32>{#e/mettaton/5}* 可别真以为\n  我会对你手下留情，\n  亲爱的“$(moniker2u)”。',
                                "<32>{#e/mettaton/0}* 好吧，你当然不这么认为。\n* 但你并没有为接下来的发展\n  做好准备。",
                                '<32>{#e/mettaton/10}* 如果你认为你已经准备好了，\n  那就请便吧。',
                                "<32>{#e/mettaton/31}* 当你最终【失败】时，\n  可别将过错归咎于我！"
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
                                            "<32>{#e/mettaton/25}* 这次演出，我会放放水，\n  让你赢。",
                                            "<32>{#e/mettaton/0}* 别误会。\n* 要是我能干掉人类，拿到灵魂，\n  肯定会成为超级大明星。",
                                            '<32>{#e/mettaton/3}* 但你我一起表演，一起欢笑，\n  一起度过那么多快乐的时光。',
                                            "<32>{#e/mettaton/6}* 所以，让我杀了你，\n  扯出你的灵魂，\n  我... 于心不忍。",
                                            "<32>{#e/mettaton/4}* 而且，不少怪物看节目\n  不在乎逻辑，只图刺激...",
                                            "<33>{#e/mettaton/0}* 为了应付这些脑残观众，\n  你也付出了很多。",
                                            '<32>{#e/mettaton/5}* 哦对。\n* 你要是不小心挂了，\n  也别担心...',
                                            "<32>* 我们会妥善安置你的灵魂，\n  不会让你白死的。",
                                            "<32>{#e/mettaton/10}* 现在，你是主角。\n* 就让我瞧瞧这位“真正的”\n  超级明星到底有多少能耐吧！"
                                        ]
                                        : [
                                            '<32>{#e/mettaton/5}* 一开始，\n  我想好好教训你一顿。',
                                            ...(SAVE.data.n.bad_lizard < 2
                                                ? [
                                                    ...(SAVE.data.n.state_foundry_undyne === 1
                                                        ? [
                                                            '<32>{#e/mettaton/10}* 毕竟...\n  她是我非常要好的朋友，\n  你却狠狠伤了她的心。',
                                                            '<32>{#e/mettaton/3}* 但我转念一想，\n  你也有好的一面。',
                                                            '<32>{#e/mettaton/6}* 其实，大多数时候\n  你挺友善的，',
                                                            "<32>{#e/mettaton/2}* 当然，我不可能像监控一样\n  盯着你的一举一动...",
                                                            "<32>{#e/mettaton/12}* 但既然你能为了自保见死不救，\n  也保不准会为了自保\n  冲动干傻事。"
                                                        ]
                                                        : [
                                                            "<32>{#e/mettaton/10}* 毕竟...\n  你还是干了不少坏事。",
                                                            '<32>{#e/mettaton/3}* 但我转念一想，\n  你也有好的一面。',
                                                            '<32>{#e/mettaton/6}* 其实，正常相处时\n  你挺友善的。'
                                                        ]),
                                                    "<32>{#e/mettaton/5}* 你到底是好是坏，谁也不知道。\n* 也许你根本不咋地，\n  是我把你捧太高了。",
                                                    '<32>{#e/mettaton/0}* 也有可能，\n  我不想惹不必要的麻烦，\n  才逼自己这么想。',
                                                    "<32>{#e/mettaton/20}* 不过，别以为我说几句好话，\n  就是把你当朋友。"
                                                ]
                                                : [
                                                    ...(SAVE.data.n.state_starton_papyrus === 1
                                                        ? SAVE.data.n.state_foundry_undyne === 2
                                                            ? rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 毕竟...\n  除了艾菲斯，我能想到的人\n  你几乎都给弄死了。'
                                                                ]
                                                                : [
                                                                    '<32>{#e/mettaton/10}* 毕竟...\n  你杀了帕派瑞斯还不过瘾，\n  又杀了安黛因。'
                                                                ]
                                                            : rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 毕竟...\n  你杀了帕派瑞斯不过瘾，\n  又干掉了一对皇家守卫。'
                                                                ]
                                                                : ['<32>{#e/mettaton/10}* 毕竟...\n  你把帕派瑞斯弄死了。']
                                                        : SAVE.data.n.state_foundry_undyne === 2
                                                            ? rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 毕竟...\n  你杀了安黛因还不过瘾，\n  又干掉了一对皇家守卫。'
                                                                ]
                                                                : ['<32>{#e/mettaton/10}* 毕竟...\n  你把安黛因给杀了。']
                                                            : rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 毕竟...\n  你杀了好几个皇家守卫。'
                                                                ]
                                                                : [
                                                                    '<32>{#e/mettaton/10}* 毕竟...\n  你杀了那么多人。'
                                                                ]),
                                                    '<32>{#e/mettaton/3}* 但我转念一想，\n  之前在实验室的时候\n  警告过你。',
                                                    "<32>{#e/mettaton/6}* 你也确实听劝。\n  警告完，就老实多了。",
                                                    '<32>{#e/mettaton/5}* 哎呀，哎呀。\n* 这不是知道自己错了，\n  知道回头嘛。',
                                                    '<32>{#e/mettaton/0}* 算你走运。',
                                                    "<32>{#e/mettaton/20}* 但别以为我不收拾你，\n  之前那些账\n  就一笔勾销了。"
                                                ]),
                                            '<32>{#e/mettaton/29}* 不过，为了观众，\n  为了把节目演好...',
                                            "<32>{#e/mettaton/26}* 我先不收拾你。",
                                            "<32>{#e/mettaton/5}* ...现在，好好演戏。\n* 看看你能不能演好，\n  演得我心服口服。",
                                            "<32>{#e/mettaton/35}* 让我知道...",
                                            "<32>{#e/mettaton/31}* 你，不光能当冷血的杀人机器，\n  还能当舞台上最耀眼的\n  “超级明星”！"
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
                '<25>{#p/alphys}{#g/alphysSmileSweat}* 太好了，你终于到了！',
                '<25>{#f/3}* 嘿... 一路走到这，\n  是不是挺惊险的？',
                "<25>{#g/alphysYeahYouKnowWhatsUp}* 呃，估计是我想多了...",
                '<25>{#g/alphysNeutralSweat}* 我就感觉，\n  不管经历啥，你都无所谓。\n  那副表情始终都不带变的。',
                '<25>* ...',
                '<25>{#g/alphysTheFactIs}* ...说回正题，\n  我们该去首塔了。',
                '<25>{#g/alphysIDK}* 电梯应该已经修好了，\n  那咱们...'
            ],
            endY2: [
                "<25>{#p/alphys}{#g/alphysWelp}* 算了，我不逼你，\n  你自己看着办。",
                "<25>{#g/alphysSmileSweat}* 你想跟过来，行！\n* 你想再等等，也行！",
                '<25>* 毕竟，\n  “强扭的瓜不甜”，对吧？',
                '<25>{#g/alphysTheFactIs}* 呃，不是请你吃瓜，\n  是植物生长都必须...',
                '<25>{#g/alphysNeutralSweat}* 而-而且你还有自己的...',
                '<26>{#g/alphysWelp}* 呃，你应该听明白了吧。'
            ],
            endY3: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 好，待会见！'],
            end3: () => [
                '<32>{#e/mettaton/6}* 女士们，先生们...',
                world.mttvar
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
                            '<25>{#g/alphysHaveSomeCompassion}* 对了，呃...\n  现在跟我来下个房间。',
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
                        : "<32>* 我要去忙点正事。",
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
                        "<25>{#p/alphys}{#g/alphysFR}* 别告诉我你要把那液体\n  一直带到首塔。",
                        world.badder_lizard ? '<25>{#g/alphysNeutralSweat}* ...' : '<25>{#g/alphysWelp}* ...'
                    ]
                    : []),
                world.badder_lizard
                    ? '<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* 跟上我。'
                    : '<25>{#p/alphys}{#g/alphysWelp}* 这边走。'
            ],
            endwalk1: () =>
                !world.badder_lizard
                    ? [
                        
                        "<25>* 诶嘿... 镁塔顿的演出\n  有点含金量吧？",
                        "<25>{#g/alphysSideSad}* 就-就是，他的续航\n  要是能再长点就好了，\n  不过...",
                        "<25>{#g/alphysUhButHeresTheDeal}* 呃，就-就是个小疏忽，\n  这问题可好修了！",
                        "<25>{#g/alphysWelp}* ...但让你来这里\n  可不是为了看演出。"
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...听着，我...',
                        ...(world.alphys_percieved_kills < 10
                            ? [
                                "<25>{#g/alphysHaveSomeCompassion}* 我很抱歉就那样跑掉了。",
                                ...(SAVE.data.n.state_foundry_undyne === 0
                                    ? ["<25>{#g/alphysSideSad}* 只是... \n  那些空境居民的死亡..."]
                                    : world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                                        ? ["<25>{#g/alphysSideSad}* 只是...\n  安黛因的死-死亡..."]
                                        : [
                                            "<25>{#g/alphysSideSad}* 只是...\n  安黛因的死-死亡...",
                                            '<25>{#g/alphysSideSad}* 还有那些空境居民的死亡...'
                                        ]),
                                "<25>{#g/alphysThatSucks}* ...我不知道我该做什么..."
                            ]
                            : [
                                "<25>{#g/alphysHaveSomeCompassion}* 我知道你\n  杀了那么多人民。",
                                ...(SAVE.data.n.kills_aerialis / 2 +
                                    SAVE.data.n.corekills +
                                    (SAVE.data.b.killed_knightknight ? 1 : 0) +
                                    (SAVE.data.b.killed_madjick ? 1 : 0) >
                                    2
                                    ? [
                                        "<25>{#g/alphysSideSad}* 即使在我离开实验室后，\n  我还-还是在继续\n  观察着你...",
                                        '<25>{#g/alphysSideSad}* 穿过了待命区...\n* 又穿过了核心...'
                                    ]
                                    : [
                                        "<25>{#g/alphysSideSad}* 自从你来到这里，\n  我就一直在实验室\n  观-观察着你...",
                                        '<25>{#g/alphysSideSad}* 穿过星港...\n* 又穿过铸厂...'
                                    ]),
                                "<25>{#g/alphysNeutralSweat}* 你就没有停下来为\n  那些怪物的生命着想吗？",
                                '<25>{#g/alphysThatSucks}* 没想过他们的...\n  家人朋友知道了会怎么样？',
                                ...(world.alphys_percieved_kills < 20
                                    ? [
                                        '<25>{#g/alphysNeutralSweat}* ...',
                                        '<25>{#g/alphysNeutralSweat}* 我知道我本可以\n  更好地护送你...',
                                        "<25>{#g/alphysHaveSomeCompassion}* 也许我也得为此担责。"
                                    ]
                                    : [
                                        "<25>{#g/alphysIDK3}* 因为我一直在为此思考。",
                                        '<25>{#g/alphysHaveSomeCompassion}* 我责怪自己为什么\n  要让这些发生，但是...',
                                        '<25>{#g/alphysIDK2}* 杀死那些人是你的选择\n  我为何要为此担责？'
                                    ])
                            ])
                    ],
            endwalk2: () =>
                !world.baddest_lizard
                    ? [
                        ...(!world.badder_lizard
                            ? ["<25>{#p/alphys}{#g/alphysWelp}* 听着，\n  我就直说了。"]
                            : [
                                "<25>{#p/alphys}{#f/3}* 但是，呃，\n  我不想为此多说，所以...",
                                "<25>{#p/alphys}{#f/20}* ...我就开门见山了。"
                            ]),
                        "<25>{#g/alphysNeutralSweat}* 我一直监视着你...\n  并非没有原因。",
                        '<25>* ...',
                        '<25>{#g/alphysFR}* 简单来说...',
                        "<25>{#g/alphysFR}* 艾斯戈尔有一个{@fill=#003cff}秘密{@fill=#fff}。"
                    ]
                    : [
                        ...(SAVE.data.n.state_foundry_undyne === 2
                            ? [
                                ...(world.alphys_percieved_kills < 10
                                    ? ['<25>{#p/alphys}{#g/alphysIDK3}* ...']
                                    : ['<25>{#p/alphys}{#g/alphysIDK3}* 最令我痛心的是... 安黛因。']),
                                '<25>{#p/alphys}{#g/alphysIDK3}* 如果有一个怪物\n  想将我们从这牢笼中\n  解救出来...',
                                '<25>{#p/alphys}{#g/alphysIDK2}* 最应该是的就是她。',
                                '<25>{#p/alphys}{#g/alphysSideSad}* 她代表自由，代表正义...',
                                ...(world.alphys_percieved_kills < 10
                                    ? [
                                        '<25>{#p/alphys}{#g/alphysSmileSweat}* 也许她对你有点无情...',
                                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...但是...'
                                    ]
                                    : [
                                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* 你好像根本不在乎。",
                                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'
                                    ]),
                                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* 她是我的英雄。',
                                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* 我仰望着的那一位。',
                                '<25>{#p/alphys}{#g/alphysNeutralSweat}* 给我希望的那一位。',
                                '<25>{#p/alphys}{#g/alphysThatSucks}* ...但看到她就这么\n  被杀害了，就像...',
                                '<25>{#p/alphys}{#g/alphysIDK2}* ...就像看着\n  希望在眼前被撕碎。',
                                '<25>{#p/alphys}{#g/alphysIDK2}* 被撕成满天的碎片。',
                                '<25>{#p/alphys}{#g/alphysIDK3}* 变得荡然无存。',
                                "<25>{#p/alphys}{#g/alphysIDK3}* 而这一切的始作俑者，\n  ...就是你。",
                                '<25>{#p/alphys}{#g/alphysIDK2}* ...'
                            ]
                            : ['<25>{#p/alphys}{#g/alphysThatSucks}* ...']),
                        "<25>* 无论如何，\n  我对此无能为力。",
                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* 现在我也只是\n  心有余而力不足。"
                    ],
            endwalk3: () =>
                !world.baddest_lizard
                    ? [
                        "<25>{#p/alphys}{#g/alphysSideSad}* 我... \n  我现在不能为此说太多...",
                        '<25>{#g/alphysNeutralSweat}* 作为皇家科学员，\n  我的职责就是护送你安全地\n  见到国王。',
                        "<26>{#g/alphysWorried}* 如果被其他人发-发现了，\n  他们就会认为我们在阻碍\n  我们一族的自由。",
                        "<25>{#g/alphysHaveSomeCompassion}* ...\n* 我们只是想做正确的事。"
                    ]
                    : world.alphys_percieved_kills < 10
                        ? [
                            "<25>{#p/alphys}{#g/alphysIDK2}* ...我并不是\n  在抱怨什么的。",
                            "<25>{#p/alphys}{#g/alphysIDK3}* 无论如何，\n  我根本就不适合护送你。"
                        ]
                        : world.alphys_percieved_kills < 20 || SAVE.data.n.state_foundry_undyne !== 2
                            ? [
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* ...我并不是\n  在抱怨什么的。",
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* 我真的不想和你在一起。"
                            ]
                            : [
                                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* ...要知道，你很幸运。",
                                "<26>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* 要不是因为职责所在，\n  不然我就会亲手杀了你。"
                            ],
            endwalk4: () =>
                !world.baddest_lizard
                    ? [
                        "<25>{#p/alphys}{#g/alphysWelp}* ...你先去吧。\n* 我待会就会跟上的。",
                        "<25>{#g/alphysSide}* 一切都会没事的，好吗？",
                        ...(world.postnoot
                            ? world.nootflags.has('undyne') // NO-TRANSLATE

                                ? ['<25>{#g/alphysWelp}* ...即使供气系统发生故障。']
                                : ["<25>{#g/alphysInquisitive}* ...即使空气里\n  有种奇怪的味道..."]
                            : [])
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysThatSucks}* ...去吧。\n* 做艾斯戈尔让你做的事。',
                        "<25>{#g/alphysNeutralSweat}* 从此你过你的阳关道，\n  我走我的独木桥。",
                        ...(world.postnoot
                            ? world.nootflags.has('undyne') // NO-TRANSLATE

                                ? ['<25>{#g/alphysFR}* ...尽管供气系统...']
                                : ["<25>{#g/alphysFR}* ...不管空气里有什么..."]
                            : [])
                    ]
        },
        overworld: {
            DINNERTIME: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* （你弯腰从侧面看桌子。）\n* （它比看起来要平。）",
                        ...[
                            [
                                "<26>{#p/asriel1}{#f/20}* 是啊。\n* 这里根本没有菜...",
                                '<26>{#f/15}* 镁塔顿，呃，\n  对这房间有一些计划。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* 没记错的话...\n  他想在这主持个\n  喜剧节目。',
                                '<25>{#f/15}* 关于晚宴的。',
                                "<25>{#f/16}* ...这跟听起来一样无聊。"
                            ],
                            [
                                "<26>{#p/asriel1}{#f/17}* 幸运的是，\n  大多数怪物食物\n  并不需要真正的盘子来装。",
                                '<25>{#f/20}* 当他们这么做时，\n  那盘子也得被吃掉了。',
                                "<25>{#f/17}* 但我觉得你大概习惯了。"
                            ],
                            ['<25>{#p/asriel1}{#f/4}* 很高兴那个烂节目\n  没有演出过。']
                        ][Math.min(asrielinter.dinnertime++, 3)]
                    ]
                    : ["<32>{#p/basic}* 一张桌子。\n* 上面的餐盘，刀叉\n  只是印在桌布上的图案。"],
            doublefridge1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你将耳朵贴到冰箱上。）\n* （可以听到呲呲声。）']
                    : ["<32>{#p/basic}* 一台非常安全的冰箱。\n* 两边都装满了橙汁汽水。"],
            doublefridge2: () => [
                ...(SAVE.data.b.svr
                    ? ['<32>{#p/human}* （听起来里面的一瓶汽水\n  被拧开了...）']
                    : ['<32>{#p/basic}* 有一瓶汽水已经拧开了...']),
                choicer.create('* （拿走那瓶汽水吗？）', '拿走', '算了')
            ],
            doublefridge3: ["<32>{#p/human}* （你带的东西太多了。）"],
            doublefridge4: ['<32>{#p/human}* （你拿了一瓶橙汁汽水。）'],
            doublefridge5: ['<32>{#p/human}* （你不打算这么做。）'],
            labcamera2: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停机了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （显示器已经离线了。）']
                        : SAVE.data.n.plot === 72
                            ? world.darker
                                ? ["<32>{#p/basic}* 离线了。"]
                                : ['<32>{#p/basic}* 终于匿名了。']
                            : ["<32>{#p/basic}* 别问这玩意是怎么工作的。\n* 接受就好。"],
            labdisplay: '-人类实时数据-\nEXP $(x)\n血量 $(y)\n金钱 $(z)\n距离 $(w)',
            exofountain1: () => [
                SAVE.data.b.svr
                    ? '<32>{#p/human}* （看着喷泉中的果酒，\n  你忍不住想抿一口。）'
                    : '<32>{#p/basic}* 喷泉中盛满了洋梅果酒。\n* 真奢侈。',
                choicer.create('* （抿一口吗？）', '抿一口', '算了')
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
                        choicer.create('* （开机吗？）', '开机', '算了')
                    ],
            topdesk2: ['<32>{#p/human}* （你不打算开机。）'],
            topdesk3: ["<32>{#p/basic}* 电脑屏幕上显示着\n  某个模拟器的游戏界面。"],
            labstationA: ["<32>{#p/basic}* 电脑屏幕上显示着\n  天文观测网络的控制面板。"],
            labstationB: ["<32>{#p/basic}* 电脑屏幕上显示着\n  一个全息场景的设计图。"],
            laserbarrrier1: () =>
                world.darker
                    ? ["<32>{#p/basic}* 一道安保屏障。"]
                    : ["<32>{#p/basic}* 按照创艺协会规范，\n  附近布下了无法跨越的力场。"],
            
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
            barricade: ['<32>{#p/basic}* 路障挡住了你的去路。'],
            puzzle1done: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你盯着终端的空白屏幕。）']
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
                                    "<25>{#p/alphys}{#g/alphysCutscene2}* 谢天谢地，\n  那些守卫没有攻击你。",
                                    "<25>{#g/alphysNeutralSweat}* 我正在发布一份\n  皇家备忘录，让他们别再\n  找你麻烦了。",
                                    '<25>{#g/alphysWelp}* 希望他们都-都能接收到。'
                                ]
                                : SAVE.data.n.plot < 54
                                    ? [
                                        "<25>{#p/alphys}{#g/alphysInquisitive}* 听-听着，\n  我对那些谜题的答案\n  真的一无所知...",
                                        "<25>{#g/alphysSmileSweat}* 等你回到那里\n  我再跟你打电话。"
                                    ]
                                    : SAVE.data.n.plot < 56
                                        ? [
                                            "<25>{#p/alphys}{#g/alphysSideSad}* 空境中的谜-谜题\n  都还没有升级过...",
                                            "<25>{#g/alphysWelp}* 只是因为工作太忙，\n  根本不能抽出时间\n  来管这些。"
                                        ]
                                        : SAVE.data.n.plot < 58
                                            ? [
                                                '<25>{#p/alphys}{#g/alphysCutscene1}* 我有个习惯，\n  就是经常忘记\n  关闭我的实验。',
                                                "<25>{#g/alphysCutscene2}* 突然觉得，\n  这个习惯好像无形中\n  救了你一命！",
                                                '<25>{#g/alphysUhButHeresTheDeal}* 但我想，\n  镁塔顿总会留一个\n  备用计划。'
                                            ]
                                            : SAVE.data.n.plot < 59
                                                ? [
                                                    '<25>{#p/alphys}{#g/alphysWelp}* 别跟我说。\n* 衫斯又在卖他那\n  奇怪的“热狗”了。',
                                                    "<25>{#g/alphysCutscene2}* 对，这就像... \n  他经常做的那样。\n* 说实话挺正常的。"
                                                ]
                                                : SAVE.data.n.plot < 60
                                                    ? [
                                                        "<25>{#p/alphys}{#g/alphysCutscene2}* 我觉得镁塔顿\n  正在准备另一个节目。",
                                                        "<25>{#g/alphysTheFactIs}* 我是你的话...\n  我会对此格外小心..."
                                                    ]
                                                    : SAVE.data.n.plot < 61
                                                        ? SAVE.data.b.a_state_moneyitemC
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* 我知道你会那样做的。']
                                                            : [
                                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                                '<25>* 如今镁塔顿做事\n  越来越不计后果了。'
                                                            ]
                                                        : SAVE.data.n.plot < 66.1
                                                            ? [
                                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                                "<25>{#g/alphysCutscene1}* 皇家守卫居然\n  都不听从我的命令，\n  真是不可思议啊！"
                                                            ]
                                                            : SAVE.data.n.plot < 67.1
                                                                ? ["<25>{#p/alphys}{#g/alphysWelp}* 照这个速度，\n  你永远也过不了核心。"]
                                                                : [
                                                                    "<25>{#p/alphys}{#g/alphysCutscene2}* 对，我还会在这里\n  ...做-做什么的。",
                                                                    '<25>{#g/alphysWelp}* 好像也没什么事要做了。'
                                                                ],
                    () =>
                        SAVE.data.n.plot < 51
                            ? [
                                "<26>{#p/alphys}{#g/alphysWelp}* 不过这也不能怪他。",
                                "<25>{#g/alphysWelp}* 他是你在这里见过的\n  最热爱人类的家伙。"
                            ]
                            : SAVE.data.n.plot < 52
                                ? ['<25>{#p/alphys}{#g/alphysCutscene3}* 你永远都不知道\n  这些天...']
                                : SAVE.data.n.plot < 54
                                    ? [
                                        '<25>{#p/alphys}{#g/alphysWelp}* 如果这些玩意真的\n  出错了，我想我可以\n  对其手动控制。',
                                        "<25>{#g/alphysNeutralSweat}* 但-但是这会让其\n  暂时无法运行。"
                                    ]
                                    : SAVE.data.n.plot < 56
                                        ? ["<25>{#p/alphys}{#g/alphysWelp}* 你不会相信\n  我被困在这有多久了。"]
                                        : SAVE.data.n.plot < 58
                                            ? SAVE.data.n.state_aerialis_crafterresult === 0
                                                ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 真可惜你从来都没\n  检查过你的新手机...']
                                                : ['<25>{#p/alphys}{#g/alphysCutscene2}* 实话说，\n  看到你使用喷气背包\n  真的太棒了。']
                                            : SAVE.data.n.plot < 59
                                                ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* 这完全正常。']
                                                : SAVE.data.n.plot < 60
                                                    ? ["<25>{#p/alphys}{#g/alphysWelp}* 谁知道他会做出\n  什么样的古怪动作。"]
                                                    : SAVE.data.n.plot < 61
                                                        ? SAVE.data.b.a_state_moneyitemC
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                                                            : ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
                                                        : SAVE.data.n.plot < 67.1
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* 这真“讽刺”。']
                                                            : ['<25>{#p/alphys}{#g/alphysCutscene3}* 镁塔顿现在一定在\n  耐心等待着你。']
                )
            },
            mettacrafter1a: ['<32>{#p/mettaton}* 机不可失！'],
            mettacrafter1b: ["<32>{#p/mettaton}* 我认为你还漏了点什么。"],
            mettacrafter1c: ["<32>{#p/mettaton}* 我认为你还漏了个什么。"],
            mettacrafter2a: ['<32>{#p/mettaton}* 干得好！\n* 把所有东西放上我左边的操作台。'],
            mettacrafter2b: ['<32>{#p/mettaton}* 干得好！\n* 现在把剩下的东西放上\n  我左边的操作台。'],
            mettacrafter2c: ['<32>{#p/mettaton}* 干得好！\n* 现在把最后一样东西放上\n  我左边的操作台。'],
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
                                                '<25>{#p/asriel2}{#f/6}* $(name)，\n  你脑子没坏吧？',
'<25>{#p/asriel2}{#f/6}* 你明明知道\n  艾菲斯的备用机在哪。',
                                                '<25>{#p/asriel2}{#f/7}* 还不快回她办公桌拿去。'
                                            ]
                                            : 
                                            []
                                        : 
                                        SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                            ? [
                                                "<25>{#p/asriel2}{#f/3}* 别忘了，我们要用\n  艾菲斯的备用机。",
                                                "<25>{#p/asriel2}{#f/4}* 我敢打赌，\n  就在她办公桌上..."
                                            ]
                                            : 
                                            ["<25>{#p/asriel2}{#f/3}* 别忘了艾菲斯实验室里\n  那台手机。"]
                                    : 
                                    [
                                        [
                                            '<25>{#p/asriel2}{#f/3}* 艾菲斯一直会给手机\n  配好升降机通行证的。',
                                            '<25>* 实验室里我看到有一部。\n* 快去拿。'
                                        ],
                                        [
                                            "<25>{#p/asriel2}{#f/7}* $(name)，\n  没通行证我们过不去。",
                                            '<25>{#f/6}* 快去找找。'
                                        ],
                                        ['<25>{#p/asriel2}{#f/13}* 呃... $(name)？'],
                                        ['<25>{#p/asriel2}{#f/13}* ...']
                                    ][Math.min(SAVE.flag.n.ga_asrielGetThePhone++, 3)]
                            : world.bad_lizard > 1 && 49 <= SAVE.data.n.plot
                                ? ["<32>* 艾菲斯的桌子上不是\n  有个备用机吗？"]
                                : SAVE.data.n.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne === 1 && 49 <= SAVE.data.n.plot
                                    ? ["<32>* ...也许实验室里会有一个？"]
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
                        ? ["<25>{#p/asriel2}{#f/8}* 看来现在\n  只有一条路可走了。"]
                        : [])
                ],
                elevatorStory6: (citadel = false) =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （电梯似乎断电了。）']
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
                        ? ['<32>{#p/human}* （终端似乎已经停机了。）']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （你激活了终端。）\n* （上面有一些工作日志。）',
                                '<32>{#p/basic}* “工作日志，克历615年9月”',
                                '<32>* “自动数据分析器已证实：\n   近期，几颗恒星的位置坐标\n   发生了多次突变。”',
                                '<32>* “这些位置突变...\n   导致了力场内的时间乱流。”',
                                '<32>* “经推算，乱流导致时间落后了\n   十个公转周期。”',
'<32>* “当前的真实时间\n   应为克历625年9月。”'
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
                        ? ['<32>{#p/human}* （终端似乎已经停机了。）']
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
                        ? ['<32>{#p/human}* （终端似乎已经停机了。）']
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
                        ? ['<32>{#p/human}* （终端似乎已经停机了。）']
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
                        ? ['<32>{#p/human}* （终端似乎已经停机了。）']
                        : [
                            '<32>{#p/human}* （你激活了终端。）\n* （上面有一条新消息。）',
                            ...(world.bad_lizard < 2 && SAVE.data.n.plot < 72
                                ? [
                                    [
                                        '<32>{#p/basic}* 二号塔台，打卡完毕。',
                                        "<32>* 我们去休闲回廊吧...",
                                        "<32>* ...你觉得呢，宝贝？"
                                    ],
                                    [
                                        '<32>{#p/basic}* 二号塔台，报告情况。',
                                        "<32>* 我们发现那人类\n  正朝电梯走去。",
                                        '<32>* 抱歉，艾菲斯...',
                                        "<32>* ...我们一直训练抓捕人类的\n  目的可不是保护人类。"
                                    ]
                                ][SAVE.data.n.state_aerialis_royalguards]
                                : ['<32>{#p/basic}* “暂无可用数据。”'])
                        ],
            recycler: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你看不清回收站里有什么...）"]
                    : ["<32>{#p/basic}* 一个回收站。"],
            recyclerX: ['<32>{#p/human}* （你丢掉了电阻尼液。）'],
            ingredient1: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* （你找到了幸福闪粉。）']
                    : ['<32>{#p/human}* （你找到了环三亚甲基三硝胺。）'],
            ingredient2: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* （你找到了激情水浆。）']
                    : ['<32>{#p/human}* （你找到了己二酸二正辛酯。）'],
            ingredient3: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* （你找到了博爱甘油。）']
                    : ['<32>{#p/human}* （你找到了矿物油。）'],
            boop: () =>
                [
                    ['<25>{#p/asriel2}{#f/13}* 呃... $(name)...', '<25>{#p/asriel2}{#f/18}* ...你搞啥呢？'],
                    ['<25>{#p/asriel2}{#f/18}* 什-\n* $(name)！', '<25>{#p/asriel2}{#f/18}* 你刚才..\n  是不是戳了下我的鼻子？'],
                    ['<25>{#p/asriel2}{#f/18}* 啊-\n* 快停下！'],
                    ['<25>{#p/asriel2}{#f/18}* 别闹了！'],
                    ['<25>{#p/asriel2}{#f/13}* ...$(name)？'],
                    ['<25>{#p/asriel2}{#f/15}* $(name)。'],
                    ['<25>{#p/asriel2}{#f/13}* 你没事吧，$(name)？'],
                    ["<25>{#p/asriel2}{#f/16}* ...行，我等着。"],
                    ['<25>{#p/asriel2}{#f/15}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielBoop++, 8)],
            nuzzle: () =>
                [
                    ['<25>{#p/asriel1}{#f/13}* 弗里斯克...？', '<25>{#p/asriel1}{#f/17}* 一个私密空间...'],
                    ['<25>{#p/asriel1}{#f/18}* 什—\n* 弗里斯克！', '<25>{#p/asriel1}{#f/18}* 你刚才...\n  是不是戳了下我的鼻子？'],
                    ['<25>{#p/asriel1}{#f/18}* 啊—\n* 好痒啊，弗里斯克！'],
                    ['<25>{#p/asriel1}{#f/18}* 弗里斯克——！'],
                    ['<25>{#p/asriel1}{#f/17}* ... 弗里斯克...\n* ...不要啦...'],
                    ["<25>{#p/asriel1}{#f/20}* ...你真可爱，\n  弗里斯克。"],
                    ['<25>{#p/asriel1}{#f/13}* 呃，弗里斯克，\n  你可以停下来了。'],
                    ["<25>{#p/asriel1}{#f/16}* 我无能为力了。"],
                    ['<25>{#p/asriel1}{#f/15}* ...']
                ][Math.min(SAVE.data.n.svr_nuz++, 8)]
        },
        trivia: {
            a_bbox: ["<32>{#p/basic}* 这是个休眠舱。\n* 有个人类在里头..."],
            a_wishflower: pager.create(
                0,
                (power = false) =>
                    SAVE.data.b.svr
                        ? [
                            "<32>{#p/human}* （你吸了一口仙气。）",
                            power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ]
                        : ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                pager.create(
                    2,
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙气。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 一丛年代久远的蒲公罂而已。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙气。）",
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
                                "<32>{#p/human}* （你吸了一口仙气。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 毫无罂姿的蒲公罂。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙气。）",
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
                                "<32>{#p/human}* （你吸了一口仙气。）",
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
                                "<32>{#p/human}* （你吸了一口仙气。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罂。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 一朵蒲公罂...\n  里面载满着粟求。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙气。）",
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
                        '<32>{#p/human}* （你看了一眼海报。）',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/7}* 这真是镁塔顿的\n  广告部门所制作过的\n  最烂的广告。",
                                '<26>{#f/15}* 好吧，\n  除了这产品可以赊账...',
                                '<26>{#f/20}* 主要是，\n  这明显就是通过科幻动漫\n  来获取的灵感。'
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* 是根据第二季\n  第十七集的一个场景\n  改编的。",
                                '<25>{#f/13}* 那一集叫做\n  “喵喵的一体化厨房”。',
                                "<25>{#f/15}* ...这么说吧，\n  她那一天遭遇的物种...",
                                '<25>{#f/15}* ...对厨房电器有一种\n  几乎走火入魔般的痴迷。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/10}* 怎么了？\n* 我可是活了\n  整整100年的时间。',
                                8 <= SAVE.flag.n.ga_asrielMonologue
                                    ? "<25>{#f/16}* 这个我以前就告诉\n  过你了，弗里斯克。"
                                    : '<25>{#f/10}* 喂。\n* 要不然你以为我那些无聊\n  的时光是怎么熬过去的。'
                            ],
                            [
                                8 <= SAVE.flag.n.ga_asrielMonologue
                                    ? '<25>{#p/asriel1}{#f/13}* 现在你应该知道了。'
                                    : '<25>{#p/asriel1}{#f/16}* ...你好好想想吧...'
                            ]
                        ][Math.min(asrielinter.signposter1++, 3)]
                    ]
                    : world.darker
                        ? ['<33>{#p/basic}* 无聊的广告。']
                        : [
                            "<32>{#p/basic}* 这是个高档镁塔牌炉子的广告...",
                            SAVE.data.n.plot === 72
                                ? '<32>{#p/basic}* 任何母星的生活\n  都离不开这件伟大的电器。'
                                : '<32>{#p/basic}* 可真是风光。'
                        ],
            signposter2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你看了一眼海报。）',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/17}* 看，那是你。",
                                '<25>{#f/13}* 和镁塔顿。',
                                '<25>{#f/17}* 老实说，还挺可爱。'
                            ],
                            SAVE.flag.b.asriel_earpull
                                ? [
                                    "<25>{#p/asriel1}{#f/13}* 我承认，\n  我一直不明白你为什么...",
                                    '<25>{#f/15}* 呃，把上次我们来这里时\n  做的事重复了一遍。',
                                    '<25>{#f/17}* 我想这是你\n  那独特的表达方式...',
                                    '<25>{#f/13}* ...你是不是想当\n  我的朋友？'
                                ]
                                : [
                                    "<25>{#p/asriel1}{#f/17}* 我承认，\n  看到你演这个节目\n  让我很兴奋。",
                                    '<25>{#f/15}* 你就那样站着不动...\n* 啥也没做...',
                                    "<25>{#f/13}* 挺奇怪的。\n* 但你本来就很奇怪。",
                                    '<25>{#f/13}* 感觉和我一样。'
                                ],
                            SAVE.flag.b.asriel_earpull
                                ? [
                                    '<25>{#p/asriel1}{#f/17}* ...谢谢你，弗里斯克。',
                                    '<25>{#f/23}* 谢谢你这么努力地\n  想成为我的朋友。'
                                ]
                                : [
                                    "<25>{#p/asriel1}{#f/2}* 从现在开始，\n  我们要称自己为...",
                                    '<25>{#f/1}* “傲世双壁奇侠”。',
                                    '<25>{#f/15}* ...这么威风的名字\n  念出来咋没气势呢。\n* 哎，算了。'
                                ],
                            ['<25>{#p/asriel1}{#f/20}* 你真的很喜欢\n  这张海报，是吧？']
                        ][Math.min(asrielinter.signposter2++, 3)]
                    ]
                    : world.darker
                        ? ['<33>{#p/basic}* 无聊的广告。']
                        : SAVE.data.n.plot < 65
                            ? [
                                "<32>{#p/basic}* 这是个即将播出的\n  节目的广告...",
                                iFancyYourVilliany()
                                    ? "<32>{#p/basic}* 当然，你是反派角色。"
                                    : "<32>{#p/basic}* 当然，你可是主角。"
                            ]
                            : [
                                "<32>{#p/basic}* 这是个早已播出的\n  节目的广告...",
                                SAVE.data.n.plot === 72
                                    ? '<32>{#p/basic}* 也许新的家园\n  能带来新的娱乐。'
                                    : '<32>{#p/basic}* 当然，你很棒。'
                            ],
            powerline: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你触碰了电力控制器。）\n* （又麻又疼。）']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* 一个电力控制器...\n  电力基本上被关闭了。"]
                        : ["<32>{#p/basic}* 一个电力控制器。"],
            a_virt: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （看来控制台\n  超出了你的访问级别。）']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* 一个虚拟空间。\n* 也许有一天你将得到\n  其所需的访问权限。"]
                        : ["<32>{#p/basic}* 一个虚拟空间。\n* 你未被授权，无法使用它。"],
            metposter: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你仔细看着宣传海报。）']
                    : SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}* 这是镁塔顿首映的宣传海报。",
                            '<32>* 上面的签名字条的原内容\n  被涂掉了，并附上了新的内容...',
                            '<32>* “很抱歉，我给你带来了\n  这么多负担。”'
                        ]
                        : [
                            "<32>{#p/basic}* 这是镁塔顿首映的宣传海报。",
                            "<32>* 上面有张镁塔顿的签名字条，\n  字迹难以辨认...",
                            '<32>* “谢谢你让我梦想成真。”'
                        ],
            bedbox: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你对这么普通的盒子不感兴趣。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 不起眼的盒子。']
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* 老实说，\n  这实际上并不是一个\n  非欧住房单元。",
                                "<32>* 这是一个非欧豪宅居住系统！"
                            ]
                            : [
                                '<32>{#p/basic}* 这个看似普通的盒子\n  是一个最先进的\n  非欧住房单元。',
                                "<33>* ...外面比里面看起来小。"
                            ],
            a_lab_books1: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （这个书架上\n  的书的内容互不相关。）']
                        : [
                            "<32>{#p/basic}* 这是个书架。",
                            '<32>{#p/human}* （你取下了一本书...）',
                            '<32>{#p/basic}* “怪物的身体是\n   自身灵魂的反映。”',
                            '<32>* “通常，父母会决定\n   他们的孩子会成为\n   什么样的怪物...”',
                            '<32>* “把他们的意志烙印在\n   孩子的灵魂深处。”',
                            '<32>* “但如果另一个生物，比如一个\n   人类，吸收了一个灵魂，\n   会发生什么呢？”',
                            '<32>* “传说中，人类在战争中吸收了\n   死去的王级怪物的灵魂...”',
                            '<32>* “在一处特别的记载中，\n   据说有个人类变成了\n   一架飞机的形态。”',
                            '<32>{#p/human}* （你把书放回了书架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （这个书架上\n  的书的内容互不相关。）']
                        : [
                            "<32>{#p/basic}* 这是个书架。",
                            '<32>{#p/human}* （你取下了一本书...）',
                            '<32>{#p/basic}* “你想设计一个机器人吗？\n   那么，由了不起的法拉第\n   帮你搞定吧！”',
                            '<32>* “你看，地球上的人们，\n   喜欢在生活中添加一些趣味。”',
                            '<32>* “你总不能造个金属盒子\n   就收工吧，\n   明白我的意思吗？”',
                            '<32>* “你必须赋予它风格和\n   令人眼花缭乱、充满活力的功能，\n   譬如，投{@fill=#ff0}机{@fill=#fff}倒{@fill=#ff0}把{@fill=#fff}！”',
                            '<32>* “另外，为了最大限度地吸引别人，\n   可以用它的机动性做一些\n   有创意的事情！”',
                            '<32>* “譬如，呃... 独轮车那种？”\n* “反正就，类似那样的。”',
                            '<32>{#p/human}* （你把书放回了书架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （这个书架上\n  的书的内容互不相关。）']
                        : [
                            "<32>{#p/basic}* 这是个书架。",
                            '<32>{#p/human}* （你取下了一本书...）',
                            '<32>* “不幸的是，\n   怪物不能很好地应对疾病。”',
                            '<32>* “当怪物的死亡迫在眉睫时，\n   他们就卧倒，再不动弹。”',
                            '<32>* “我们把这种状态称之为\n   ‘陨落’。”',
                            '<32>* “在战争期间，\n   这种令人困惑的情况\n   再熟悉不过了...”',
                            '<32>* “可悲的是，在那个时代，\n   死亡是不可避免的。”',
                            '<32>{#p/human}* （你把书放回了书架。）'
                        ]
            ),
            paperbook: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （书上详细描述了一部幻想故事，\n  主角是一个勇敢的冒险家。）']
                    : [
                        '<32>{#p/human}* （你把书拿了起来...）',
                        '<32>{#p/basic}* “《喵喵航天行：梦境奇旅》”\n  “（同人故事）”',
                        '<32>* “...就在那时，\n   喵喵终于亲眼看到了。”',
                        '<32>* “那是相当壮观的景色。\n   孤身一人站在太空深处，\n   颇有遗世独立之感...”',
                        '<32>* “...但是喵喵心里可明白得很！”\n  “她很快发现了我们的困境。”',
                        '<32>* “稍微施展一下\n   那广为人知的华丽丽光线，\n   她便击穿了力场！”',
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
                            '<32>* “今天是怪物一族\n   无比黑暗的一天，\n   王室分崩离析了。”',
                            '<32>* “托丽尔王后\n   放弃了王位。\n   仅仅因为艾斯戈尔的几句话。”',
                            '<32>* “但那些话\n   估计要对我们\n   产生长期的影响了...”',
                            '<32>* “现在，\n   大家都希望\n   他主动夺取人类的灵魂。”',
                            '<32>* “这简直是一场灾难。”',
                            '<32>{#p/human}* （你把书放回了书架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （书架上放着一系列笔记。）']
                        : [
                            "<32>{#p/basic}* 这是个书架。",
                            '<32>{#p/human}* （你取下了一本书...）',
                            '<32>{#p/basic}* “教授的笔记，第310页。”',
                            '<32>* “嗯...\n   果然如我所料，\n   他同意了这个计划。”',
                            '<32>* “真是天赐良机。”\n* “$(name)死后，一个新的人类\n   抵达了前哨站。”',
                            "<32>* “我们还不知道\n   它能不能容纳人类，\n   结果马上揭晓...”",
                            '<32>* “祈祷吧。”',
                            '<32>{#p/human}* （你把书放回了书架。）'
                        ]
            ),
            cream_machine: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你想知道\n  这台冰激淋机生产的\n  是什么冰激淋。）']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* 这个构造十分复杂的冰激淋机\n  再也不会被使用了。"]
                        : ["<32>{#p/basic}* 一台构造十分复杂的冰淇淋机。\n* 好像复杂过头了。"],
            cream_bucket: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* （你把手伸进冰激淋桶里。）\n* （好冰。）",
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/15}* 呃，别把那东西\n  弄我身上就行。",
                                "<25>{#p/asriel1}{#f/15}* 我必须像狗一样\n  抖动身体才能弄下来。"
                            ],
                            ['<25>{#p/asriel1}{#f/8}* ...', "<26>{#p/asriel1}{#f/31}* ...别想。"],
                            ['<25>{#p/asriel1}{#f/31}* ...']
                        ][Math.min(asrielinter.cream_bucket++, 2)]
                    ]
                    : ['<32>{#p/basic}* 一桶冰淇淋。'],
            mewposter: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你的目光紧盯着\n  这张动漫海报的动态部分。）"]
                    : SAVE.data.n.state_aerialis_basekill > 29
                        ? ['<32>{#p/basic}* 一张小众科幻动漫系列的\n  大海报。']
                        : SAVE.data.n.state_aerialis_basekill > 14
                            ? ['<32>{#p/basic}* 一张科幻动漫系列的\n  大海报。']
                            : ['<32>{#p/basic}* 一张人气科幻动漫系列的\n  大海报。'],
            dogfood: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你焦虑地盯着那袋狗粮。）',
                        ...[
                            ["<25>{#p/asriel1}{#f/24}* 弗里斯克，\n  我知道你在想啥。\n* 这不值得。"],
                            ["<25>{#p/asriel1}{#f/24}* 这玩意一点\n  都不好吃，弗里斯克。\n* 别那么做。"],
                            [
                                '<25>{#p/asriel1}{#f/15}* 听着。',
                                "<25>* 我告诉你这些是因为\n  我... 是你的朋友。",
                                "<25>* ...说起来很奇怪，\n  我好像已经习惯了。"
                            ],
                            ['<25>{#p/asriel1}{#f/16}* 你没更好的事要做吗？']
                        ][Math.min(asrielinter.dogfood++, 3)]
                    ]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* 一袋半空的狗粮。"]
                        : ["<32>{#p/basic}* 一袋半满的狗粮。"],
            virtsign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （该标志描绘了\n  一只虚拟空间中的蜥蜴。）']
                    : ["<32>{#p/basic}* 一个虚拟空间人物标志。"],
            starlingtable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下脚步看了看这些花。）']
                    : ['<32>{#p/basic}* 星花。'],
            starling: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下脚步看了看这些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 一丛星花。'],
            starling2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下脚步看了看这些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 三小簇星花。'],
            starling3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下脚步看了看这些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 一大丛星花。'],
            starling5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下脚步看了看这些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 一对星花。\n* 还挺可爱...？'],
            dttubes: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/3}* 这个玩意？\n* 哈... 我不想回忆。"], ['<25>{#p/asriel1}{#f/4}* ...']][
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
                            : ['<32>{#p/basic}* 还有一个用过的注射器，\n  里面有着少许相同的物质。'])
                    ],
            papertable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （工作桌上的图纸描述了\n  某种形式的能量转化过程。）']
                    : ["<32>{#p/basic}* 一张工作桌，\n  上面的图纸不伦不类。"],
            vender1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你注视着储物箱\n  玻璃后面的神秘物质。）']
                    : ['<32>{#p/basic}* 一个真空储物箱。\n* 里面放着各种不明物质的\n  试剂瓶。'],
            vender2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你注视着储物箱\n  玻璃后面的神秘物质。）']
                    : ['<32>{#p/basic}* 一个真空储物箱。\n* 里面放着各种不明物质的\n  试剂瓶。'],
            toolrack: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/27}* 据我所知，\n  这些工具根本没被用过。',
                            "<25>* 实际上，\n  我认为这些工具唯一的\n  用途就是挂在墙上。"
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* 有了魔法，\n  谁还用工具呢？",
                            '<25>{#f/17}* 就像，那个在\n  核心工作的小老鼠？\n* 好像叫查尔斯？',
                            '<25>{#f/15}* 那只小老鼠拥有一种\n  名为心灵控制的能力。',
                            "<25>{#f/16}* 别问我咋知道的。"
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* 呃，这么说吧...',
                            '<25>{#f/16}* 过去瞎搞时，\n  我一直努力避免这种情况。',
                            '<25>{#f/15}* 即使是“重置”的力量，\n  也不能完全地...\n  随心所欲。'
                        ],
                        ["<25>{#p/asriel1}{#f/16}* ...此问题结束。"]
                    ][Math.min(asrielinter.toolrack++, 3)]
                    : [
                        "<32>{#p/basic}* 架子上挂着一些老工具，\n  看上去，都吃灰好几年了。",
                        ...(SAVE.data.n.plot === 72 ? ['<33>* ...现在更是没人用得着了。'] : [])
                    ],
            spycamera1: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停机了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （显示器已经离线了。）']
                        : SAVE.data.n.plot === 72 && !world.runaway
                            ? ['<32>{#p/basic}* 终于有隐私了。']
                            : [
                                '<32>{#p/basic}* 这个监视器经校准后，\n  可以实时跟踪你的动作。',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielLab1++ < 1
                                    ? ["<25>{#p/asriel2}{#f/5}* 真好奇艾菲斯监视我们时\n  脸上挂着什么表情..."]
                                    : [])
                            ],
            gameshow_terminal1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在幽默的操作台上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                        : SAVE.data.b.a_state_moneyfish
                            ? ['<32>{#p/basic}* 一个游戏节目操作台。\n* 这就是精彩比赛的一手见证。']
                            : ['<32>{#p/basic}* 一个游戏节目操作台。\n* 糟糕双关笑话的一手见证。'],
            gameshow_terminal2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在同情的操作台上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                        : ['<32>{#p/basic}* 一个游戏节目操作台。\n* 看上去是专门给幽灵准备的。'],
            gameshow_terminal3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在熟悉的操作台上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                        : ["<33>{#p/basic}* 一个游戏节目操作台。\n* 为你量身定做的。"],
            gameshow_terminal4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在友好的操作台上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一个游戏节目操作台。']
                        : SAVE.data.n.state_foundry_muffet === 1
                            ? ['<32>{#p/basic}* 一个游戏节目操作台。\n* 有一股... 山寨品的味道。']
                            : ['<32>{#p/basic}* 一个游戏节目操作台。\n* 有了这样的操作台，\n  谁还用手臂呢？'],
            a_path2_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （牌子制定了\n  升降机可搭乘的\n  怪物数量的限制。）']
                    : [
                        '<32>{#p/basic}* “请务必小心，升降机一次\n   最多只能搭乘两个怪物。”',
                        ...(world.genocide && SAVE.flag.n.ga_asrielSkySign1++ < 1
                            ? ['<25>{#p/asriel2}{#f/1}* 正好够用。']
                            : [])
                    ],
            a_path4_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （牌子告知了人们\n  回收机构关闭了。）']
                    : SAVE.data.n.plot === 72
                        ? ['<#32>{#p/basic}* “抱歉，\n  回收机构永远关门了！”\n  - 布莱蒂和凯蒂']
                        : ['<#32>{#p/basic}* “将你的废弃用品放在这儿吧，\n   我们会想办法把它卖掉的！”\n  - 布莱蒂和凯蒂'],
            a_puzzle1_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （牌子上的内容被划掉了。）"]
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/basic}* “警告：前方或有节目正在拍摄。”']
                        : ['<32>{#p/basic}* “更新：节目停播。”'],
            labcounter: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你将手从操作台上滑过。）\n* （很光滑。）"]
                    : [
                        world.darker
                            ? "<32>{#p/basic}* 一个普通操作台。"
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* 啊，简陋的工作台。\n* 没有比这更好的地方来\n  庆祝你的胜利了！"
                                : "<32>{#p/basic}* 啊，简陋的工作台。\n* 没有比这更好的地方\n  来练习你的工艺美术了！",
                        ...(mtt ? ["<32>{#p/mettaton}* 把材料放那里去。"] : [])
                    ],
            chesstable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （这个棋盘上啥也没有。）']
                    : world.darker
                        ? ["<32>{#p/basic}* 一张棋盘。"]
                        : SAVE.data.n.plot < 65 || SAVE.data.b.ubershortcut || world.genocide
                            ? ["<32>{#p/basic}* 一张棋盘。\n* 上面没有棋子。"]
                            : ["<32>{#p/basic}* 这是个棋盘。\n* 轮到黑棋了，\n  但看起来是回天无术了。"],
            roomtable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （这本指导手册详细地\n  解释了“跨时空旅行”的本质。）']
                    : [
                        "<32>{#p/basic}* 一本关于“跨时空旅行”的指导手册。",
                        '<32>* 你翻到书签夹着的那一页...',
                        '<32>* “...也就是说：在特定参考系下，\n   你所处房间的三维空间坐标\n   不随时间变化...”',
                        '<32>* “...但在四维时空坐标系下，\n   这一实体的坐标将动态变化。”',
                        '<32>* “我们一般将这种现象\n   称为‘时间位移’。”',
                        '<32>* “时间位移是一个复杂的过程，\n   涉及引力场的能量密度\n   及空间曲率的重新分布...”',
                        '<33>* ...\n* 谢天谢地，这页到头了。'
                    ],
            flowertable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下来看了看这些花。）']
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
                '<32>* 尽管我们偶尔会意见不和，\n  闹点小脾气。\n* 但彼此的情谊坚不可摧。',
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
                        ? ['<25>{#p/asriel2}{#f/8}* 之前怎么就没想到\n  她是准备应战去了...']
                        : [])
            ],
            coresign1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （该标志描述了\n  禁止任何未经授权的人\n  进入该区域。）',
                        '<25>{#p/asriel1}{#f/4}* 由于某种\n  显而易见的原因，\n  你可以忽略这条警告。'
                    ]
                    : ['<32>{#p/basic}* “未经授权，严禁闯入。”'],
            coresign2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （牌子上写着：\n  核心拥有最长的\n  无事故事件记录。）',
                        "<25>{#p/asriel1}{#f/3}* 要不是因为那次\n  建筑机器人事件，\n  核心就完美无瑕了..."
                    ]
                    : ['<32>{#p/basic}* “核心无事故最长纪录：38690天。”'],
            coresign3: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （该标志为\n  年度最佳员工表达了祝贺。）',
                        ...[
                            ['<25>{#p/asriel1}{#f/17}* 个子虽小，胸怀却大...'],
                            [
                                '<25>{#p/asriel1}{#f/17}* 当我尝试\n  善意对待每个人时...',
                                '<25>{#f/17}* 我让它跟着我一起，\n  它直接就答应了。',
                                '<25>{#f/20}* 毫不犹豫。',
                                "<25>{#f/18}* 我简直不敢相信！"
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* 尽管我与\n  像查尔斯那样的，\n  一同做了这么多...",
                                '<25>{#f/15}* 有些东西我却再也\n  找不回来了。',
                                '<25>{#f/23}* ...那是一种纯真的幸福。',
                                '<25>{#f/22}* 但也许和你一起...\n  我将失而复得。'
                            ],
                            ['<25>{#p/asriel1}{#f/13}* 我们将共享\n  那种幸福，弗里斯克。']
                        ][Math.min(asrielinter.coresign3++, 3)]
                    ]
                    : [
                        '<32>{#p/basic}* “年度最佳员工：查尔斯”\n  “感谢您一直努力工作，辛勤奉献。”'
                    ],
            coresign4: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （这块匾是献给某个人的。）',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/13}* 你可能会觉得很惊讶，\n  但是...',
                                '<26>{#f/27}* 我对他根本不怎么了解。',
                                '<25>{#f/4}* 他在艾菲斯带我回来\n  前就死了，所以...',
                                '<25>{#f/3}* 我对他唯一的记忆\n  是从我出生后开始的。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* 对...\n  怪物拥有无限的\n  记忆空间...',
                                "<25>{#f/17}* 但如果没见证过，\n  我们怎能记住呢？",
                                '<25>{#f/20}* 很难绕过这种限制。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* 我听说他几乎完美地\n  完成过虫洞旅行...',
                                '<25>{#f/13}* 也许，如果技术\n  可以被压缩...',
                                "<25>{#f/15}* ... 并植入怪物的大脑...",
                                '<25>{#f/16}* ... 你就能从\n  其他地方提取记忆。'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* 我一定是疯了。']
                        ][Math.min(asrielinter.coresign4++, 3)]
                    ]
                    : ['<32>{#p/basic}* “谨上  T.N.罗曼教授”\n  “愿您的足迹永存世间。”'],
            coresign5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （该标志列出了各个方向的场所。）']
                    : ['<32>{#p/basic}* “向左 - 四号舞台”\n* “向右 - 核心出口”'],
            pottedtable: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你觉得你之前见过这张桌子。）"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ["<32>{#p/basic}* 一张眼熟的桌子。\n* 看出来这桌子是从哪来的吗？"]
                        : ['<32>{#p/basic}* 一张眼熟的桌子。'],
            potchair: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你觉得你之前见过这把椅子。）"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ['<32>{#p/basic}* 一把眼熟的椅子。\n* 他们可真会搞混搭。']
                        : ['<32>{#p/basic}* 一把眼熟的椅子。'],
            cardboard1: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你无法辨认出\n  箱子里有什么...）"]
                    : [
                        "<32>{#p/basic}* 一堆纸箱，几乎全是空的。",
                        '<32>{#p/basic}* 棕箱子的箱底放着几支试管。'
                    ],
            cardboard2: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你无法辨认出\n  箱子里有什么...）"]
                    : [
                        "<32>{#p/basic}* 一堆纸箱，几乎全是空的。",
                        '<32>{#p/basic}* 高箱子里放着一些奇怪的化学试剂。'
                    ],
            cardboard3: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你无法辨认出\n  箱子里有什么...）"]
                    : [
                        "<32>{#p/basic}* 一堆纸箱，几乎全是空的。",
                        '<32>{#p/basic}* 小箱子里装着一些研究论文，\n  论文的字体很奇怪。'
                    ],
            labchem: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （这个装置让你感到很危险。）']
                    : [
                        world.darker
                            ? '<32>{#p/basic}* 传送带上有几瓶化学试剂。'
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* 传送带上有几瓶化学试剂。\n* 怪了，竟然没出岔子。"
                                : '<32>{#p/basic}* 传送带上有几瓶化学试剂。\n* 能出啥岔子呢？',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* 没有什么比镁塔超安全级传送带\n  发出的平静嗡嗡声更好了！',
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
                            '<25>{#p/asriel1}{#f/13}* 这是克里乌斯...\n* 好吧，这只是一个\n  简单的模型。',
                            "<25>{#f/17}* 我听说它实际上比\n  从外太空看到的\n  更加丰富多彩。"
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* 有一次，\n  出于极度渴望的好奇心...',
                            '<25>{#f/17}* 我设法组织建设了\n  一个新的前哨区。',
                            '<26>{#f/20}* 说是组织...\n  其实更像... 强迫。',
                            '<25>{#f/13}* 是为了让母星的...\n  一部分重现。'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* 虽然这并不怎么完美...",
                            '<25>{#f/15}* 可能是出于被强迫的\n  原因，使得人们\n  并不愿意认真建造。',
                            '<25>{#f/17}* 但我至少明白了，\n  旧世界为什么会让\n  人们交口称誉。',
                            "<25>{#f/23}* 它是... 如此的美丽。\n* 可以称得上为\n  心目中的世外桃源。"
                        ],
                        ["<25>{#p/asriel1}{#f/17}* 我永远不会\n  忘记那天的重现。"]
                    ][Math.min(asrielinter.labglobe++, 3)]
                    : [
                        world.darker
                            ? "<32>{#p/basic}* 一个“地球仪”。"
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* 一个“地球仪”，\n  展现着怪物... 曾经的家园。"
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
                    ? ['<32>{#p/human}* （你试图与这个装置互动...\n  无事发生。）']
                    : [
                        world.darker
                            ? '<33>{#p/basic}* 意义不明的装置。'
                            : SAVE.data.n.plot === 72
                                ? '<32>{#p/basic}* 令人失望的是，\n  过了这么久这个装置\n  还是没啥作用。'
                                : '<32>{#p/basic}* 用途不明的装置。',
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
                    ? ['<32>{#p/human}* （你让几乎透明的水\n  从你的指缝间流过。）']
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
                        "<32>{#p/human}* （你将显微镜对准艾斯利尔的脸...）",
                        '<32>* （透过镜头，\n  你看到了一排耀眼的\n  发光粒子。）',
                        ...[
                            ['<25>{#p/asriel1}{#f/17}* 怪物只由\n  魔法构成，弗里斯克。\n* 你知道的，对吧？'],
                            ['<25>{#p/asriel1}{#f/13}* 你现在可以\n  停止这样做了。'],
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
                            '<25>{#p/alphys}{#g/alphysShocked}* 啊，快停下！！',
                            "<25>{#g/alphysOhGodNo}* 你-你这样会从垂直面\n  掉下去的...",
                            '<25>{#g/alphysSideSad}* 我得把你传-传回去。',
                            '<25>{#g/alphysThatSucks}* 抱歉...',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/alphys}{#g/alphysShocked}* 啊，快停下！！',
                            "<25>{#g/alphysOhGodNo}* 你不-不能...\n  走-走这么远...",
                            "<26>{#g/alphysNeutralSweat}* 我该把你传回去，不过...\n  我不在办公桌。",
                            "<26>{#f/10}* 所以...\n  千万别做傻事！",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ],
                () =>
                    SAVE.data.n.state_foundry_undyne !== 1
                        ? [
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            "<25>{#p/alphys}{#g/alphysSideSad}* 走这么远不安全...",
                            "<25>{#g/alphysNeutralSweat}* 我得把你传回去。",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/alphys}{#g/alphysShocked}* 你-你在干啥！？',
                            "<26>{#f/3}* 你快到边界了！",
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
                            "<25>{#p/alphys}{#g/alphysIDK3}* ...看来我也说不动你。",
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
                            "<32>{#p/basic}{#npc/a}* 哦...\n* 是你小子...",
                            "<32>* 咋的，你以为我就这么输了！？",
                            '<32>* 毕竟...\n* 哎，你也没想错。',
                            "<32>* 我不适合继续当兵了..."
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 士兵，稍息！\n* 你的任务已经完成了，\n  接下来就好好休息吧！",
                            "<32>* ...欸，你不是那个\n  无礼的人类小鬼嘛，\n  之前还把我武器抢了。",
                            "<32>* 你可真有趣！\n* 这绝对不是我计划解决\n  那场冲突的方式！",
                            '<32>* 你似乎总能另辟蹊径，\n  创造有利局面。'
                        ],
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? ['<32>{#p/basic}{#npc/a}* 兵苗子可得... 离你远点。']
                        : [
                            '<32>{#p/basic}{#npc/a}* 兵苗子可得学学你这种战略！',
                            "<32>* 但现在...\n* 是时候向新家园进军了，士兵！"
                        ],
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? ['<32>{#p/basic}{#npc/a}* ...']
                        : ['<32>{#p/basic}{#npc/a}* 你现在可能已经上路了。']
            ),
            a_dresslion: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 镁塔顿说我可以用公司资金\n  来制作一套自己的衣服...',
                            "<32>* 我从来没这么...！\n* 哈哈哈！"
                        ]
                        : SAVE.data.n.plot < 60
                            ? [
                                "<32>{#p/basic}{#npc/a}* 作为镁塔顿的服装设计师，\n  我的工作就是给他挑\n  合适的衣服。",
                                '<32>* 他今天要穿西装打领带，\n  还要为下一场演出准备裙子...',
                                '<32>* 我也说不清楚...\n* 但是他说穿裙子...',
                                '<32>* 听起来真酷...'
                            ]
                            : SAVE.data.n.plot < 65
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 马上就开始了！\n* 新服装随时都会亮相！",
                                    "<32>* 我等不及了..."
                                ]
                                : SAVE.data.n.plot < 68
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* 那简直...\n* 简直太美了...！',
                                        "<32>* 想知道我穿着裙子...\n* 是否也会很漂亮..."
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* 哦... 我的天...',
                                        '<32>* 有那么一会，\n  我以为镁塔顿要死了呢！',
                                        "<32>* 要是他死了，\n  我都不知道该怎么办..."
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<33>{#p/basic}{#npc/a}* 我也可以给你做一套！']
                        : SAVE.data.n.plot < 60
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我在考虑一些亮闪闪\n  又发金光的东西。\n* 肯定会让他大放异彩的。"
                            ]
                            : SAVE.data.n.plot < 65
                                ? ["<32>{#p/basic}{#npc/a}* 那服装和我想的那样光泽鲜艳！"]
                                : SAVE.data.n.plot < 68
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* 不过，我得向他要那些\n  设计资金，祝我好运吧。"
                                    ]
                                    : ['<32>{#p/basic}{#npc/a}* 如果不顺利的话，\n  我可能会消失在前哨站！']
            ),
            picnic_darkman1: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* 恰。\n* 我们是阴影人。\n* 我们侍奉召唤师。",
                    '<32>* 特雷莉亚第一次召唤我\n  是在人怪战争...\n  多美好的时光，哟。',
                    "<32>* 但是那场战争已经结束了。\n* 你的也一样。"
                ],
                [
                    '<32>{#p/basic}{#npc/a}* 我回想起我的召唤师\n  所参与的所有战斗。',
                    "<32>* 让我告诉你我最喜欢的一个，\n  听好。\n* 那时我们在一个海岸上。",
                    "<32>* 人类军方想要将无人侦察机\n  设置在海平面以下，他们以为\n  这会是个好主意是吧？",
                    '<32>* 但我们知道了他们这个行动。\n* 所以我被召见，去做一些侦查，\n  回来告诉所有人。',
                    "<32>* 接下来就如你想的那样，\n  我们冲了进去，\n  将他们全都解决掉了。",
                    "<32>* 虽然算不上什么大事，\n  但这确实很棒。"
                ],
                [
                    "<32>{#p/basic}{#npc/a}* 哈，这是我的召唤师告诉我的，\n  我相信你也有你的故事。"
                ]
            ),
            picnic_darkman2: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* 那么——...\n* 关于我们的事...',
                    "<32>* 我们并不是真的在这里。\n* 我的意思是，我们是在这。\n* 但却实际上却并不在这里。",
                    "<32>* 这很难解释。"
                ],
                [
                    '<32>{#p/basic}{#npc/a}* 我的召唤师谜宇人曾经说过...',
                    "<32>* 我们就像他们人格的一部分，\n  可以脱离他们的身体。",
                    "<32>* 还有——...\n  有事需要做时\n  我们就会脱离出来。",
                    "<32>* 我出来是因为在出发前\n  看看前哨站会很酷。",
                    "<32>* 当你情绪很激动时，\n  你呃——...\n  什么都不能做。"
                ],
                [
                    "<32>{#p/basic}{#npc/a}* 一般来说我们的形态显现时，\n  通常都得工作...\n  所以——... 这样挺好的。"
                ]
            ),
            eblocker: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* 我从老滑头的公司辞了职，\n  这下我才明白那工作有多烂 ;(",
                    "<32>{#p/basic}{#npc/a}* 我卖给你食品的价格太高了，\n  为此我很抱歉。 ;(\n* 这是我的责任。 ;(",
                    "<32>{#p/basic}{#npc/a}* 现在的话，如果可以，\n  我想一个人秀会肌肉 ;(",
                    "<32>{#p/basic}{#npc/a}* 不会太久的，放心 ;("
                ],
                ['<32>{#p/basic}{#npc/a}* 抱歉咯，小娘娘腔 ;(\n* 我想自己待一会 ;(']
            ),
            a_bowtie: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我是一名艺术学生。\n* 但我考虑不再写生。",
                            '<32>* 赞美无穷无尽，毫无意义...',
                            '<32>* 这对我有何帮助呢？'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我是一名艺术学生。\n* 为寻灵感我努力了漫长时光。",
                                '<32>* 直到现在，\n  在最近的一场悲剧后，\n  我才真正得到动力。',
                                '<32>* 从这样的不幸中\n  受到鼓舞是正确的吗？'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 我是一名艺术学生。\n* 在艺术上，据说你会\n  随着时间的推移而逐渐进步。",
                                '<32>* 然而，我的艺术老师\n  认为我所做的一切\n  都是无与伦比的。',
                                '<32>* 我应该为此担忧吗？'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 以粘液之名，\n  我仍不知对此如何看待。"]
                        : ["<32>{#p/basic}{#npc/a}* 以粘液之名，\n  我不知对此如何看待。"]
            ),
            a_thisisnotabomb: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 准备好迎接我的\n  “炸裂”回归了吗？？？',
                                '<32>* 之前，你确实把大伙全吓跑了，\n  不过干完这事之后，\n  有一些怪物又回来了。',
                                "<32>* 我说这事，不是想责备那些\n  现在还躲着你的人...",
                                "<32>* 只是我想给你一个\n  浪子回头的机会。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 不知道自己在原来的母星上\n  是什么物种已经够糟糕了...',
                                "<32>* 现在，在新的母星上，\n  又将会多出一堆\n  我叫不出来名的新物种。",
                                "<32>* 我也许不得不接受\n  我是个炸弹了... 永远都是...",
                                '<32>* 真是应了那句话啊，\n  “伤筋‘咚’骨，久久难愈”。\n* 情感这东西也是这样啊。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 哇哦。\n* 真是一场炸裂的谈话啊。',
                                '<32>* 那场压轴演出真的\n  把我们全都震撼到了！',
                                '<32>* 不夸张的说。\n* 这使整个前哨站都震动了。'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 嗯哼这地方有一个炸弹，\n  是吧？？？',
                                "<32>* 嘘，听着孩子...\n* 告诉你一个秘密。",
                                "<32>* 我... 真的不是炸弹。",
                                "<32>* 嘿，别这么磺里磺张的。\n* 只是人们都爱叫我炸弹。",
                                "<32>* ...我已经接受了这一点。"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 得了吧，\n  咱为啥表现就像\n  跟引信被剪了一样？',
                                '<32>* 一个小恶霸就能让你跑路，\n  那你还不如原地爆炸呢！',
                                "<32>* 但只是我的想法罢了。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 我是说，\n  如果我能发现我是什么植物...',
                                '<32>* ...这一尘封已久的真相...',
                                '<32>* ...就像拆开早已埋下的地雷。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 假如，我真是一个炸弹，\n  那我会很激动的。",
                                "<32>* 但我并不是，\n  所以... 并没有。",
                                "<32>* 我对这事很恼火，真的。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 原本我应该像一个\n  稀有的母星植物。",
                                '<32>* 这是上个星期来找\n  堡兄聊天的老人家\n  随口说的。',
                                "<32>* ...哦，我愿付出一切\n  来了解真实的自己..."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* ...但还是不能责怪他们。"]
                            : ["<32>{#p/basic}{#npc/a}* ...不过在此之前，\n  最好还是接受炸弹这个事实吧。"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* ...你真该庆幸\n  我没在你身边爆炸。"]
                            : ["<32>{#p/basic}{#npc/a}* ...你就没想过你是什么吗？"]
            ),
            a_blackfire: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 所以我们现在自由了？\n* 这个时代是多么疯狂啊。",
                            "<32>* 没有了皇家实验室，\n  我还得去其他地方找新工作...",
                            '<32>* ...或者，我们可以在新世界\n  建立一个新皇家实验室。'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 通常，\n  我都在皇家实验室内\n  做天文研究。',
                                '<32>* 我本来打算过了今天\n  就回去工作的...',
                                "<32>* 但是，看到镁塔顿\n  身上发生的事情后，\n  我就没那么确定了。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 通常，\n  我都在皇家实验室内\n  做天文研究。',
                                '<32>* 但早些时候，\n  艾菲斯告诉我们\n  可以休息一天。',
                                '<32>* 我想知道为什么...'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 想象一下，\n  在有坚实地面的地方上\n  仰望星空有多好。"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 也许，在外面的某个地方，\n  他的心化作了一颗星星\n  存在于某个星座里...'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 进行天文研究或许很有趣，\n  但有时用自己的眼睛仰望星空\n  也永远不会有啥坏处。'
                            ]
            ),
            a_businessdude: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? [
                                '<32>{#p/basic}{#npc/a}* 对，有时我很好奇\n  像你这样的人是\n  怎么还敢活着的。',
                                "<32>* 就算你最后救了我们，\n  但我们如果都不敢离开家，\n  那还有什么用呢？",
                                "<32>* 我不是在批评你，\n  但你确实看到了其中的讽刺，\n  对吧？"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 我们的虚拟空间计划\n  从来都没成功过，\n  但也许...',
                                "<32>* ...这是未来的一种预兆？",
                                "<32>* 毕竟，在新的世界，\n  并不需要离开地面。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 真是个悲剧，是吧？',
                                "<32>* ...其实也算件好事，\n  大部分人都不知道\n  你具体长啥样。"
                            ]
                            : roomKills().a_elevator1 > 0
                                ? ["<32>{#p/basic}{#npc/a}* 听着。\n* 快走。"]
                                : SAVE.data.n.plot < 58
                                    ? iFancyYourVilliany()
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* 所以，孩子，\n  你现在叫“$(moniker2)”，\n  是吧？',
                                            "<32>* ...还挺酷的。"
                                        ]
                                        : [
                                            [
                                                '<32>{#p/basic}{#npc/a}* 天呐，孩子，\n  你就没理解到点子上，\n  对吧？',
                                                "<32>* ...真可悲。"
                                            ],
                                            [
                                                '<32>{#p/basic}{#npc/a}* 孩子，我有个问题要问你，\n  就一个问题。',
                                                '<32>* ...你试过吗？'
                                            ],
                                            [
                                                "<32>{#p/basic}{#npc/a}* 嘿，别难过。\n* 你尽力了。",
                                                "<32>* ...但你没能坚持到底\n  还是挺糟糕的。"
                                            ],
                                            [
                                                "<32>{#p/basic}{#npc/a}* 天呐，孩子，\n  还挺快的。",
                                                "<32>* 这是一个时代的终结！"
                                            ],
                                            [
                                                '<32>{#p/basic}{#npc/a}* 对于一个没实际练习过的人来说，\n  你已经做得很好了。',
                                                "<32>* ...这大概就是新手运吧？"
                                            ]
                                        ][SAVE.data.n.state_aerialis_crafterresult]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 我告诉你，\n  在实验室工作是一种享受。",
                                        '<32>* 你进入到过虚拟空间吗？',
                                        "<32>* 一个极佳的地方。\n* 虽然他们说\n  你不能越过边界。"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? ["<32>{#p/basic}{#npc/a}* 为什么你不去欺负别人呢？"]
                            : [
                                '<32>{#p/basic}{#npc/a}* 我只希望我们的关注量\n  能超越那个古怪的\n  骷髅小子。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* 不然，\n  你现在就有大麻烦了。"]
                            : roomKills().a_elevator1 > 0
                                ? ["<32>{#p/basic}{#npc/a}* 或者不会。\n* 总之别逼我再说一遍，\n  知道了吗？"]
                                : SAVE.data.n.plot < 58
                                    ? iFancyYourVilliany()
                                        ? ["<32>{#p/basic}{#npc/a}* 我年轻时\n  可没什么外号之类的。"]
                                        : [
                                            ["<32>{#p/basic}{#npc/a}* 你能出现在这真是个奇迹。"],
                                            ["<32>{#p/basic}{#npc/a}* 看起来你不是。"],
                                            ['<32>{#p/basic}{#npc/a}* 下一期你可能\n  还会有机会的。'],
                                            ['<32>{#p/basic}{#npc/a}* 也许下次你可以，\n  我不到...\n  赢得更轻松？'],
                                            ['<32>{#p/basic}{#npc/a}* 要么就单纯是镁塔节目组他们\n  对你手下留情了。']
                                        ][SAVE.data.n.state_aerialis_crafterresult]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* 对，你没听错。\n* 越过边界。',
                                        '<32>* 这到底啥意思？'
                                    ]
            ),
            a_greenfire: pager.create(
                0,
                () =>
                    SAVE.data.n.plot < 56
                        ? [
                            "<32>{#p/basic}* 不用担心我，\n  今天上学很顺利。",
                            "<32>* 我真的很期待镁塔的\n  下一个节目！",
                            "<32>{#p/basic}* 你知道什么时候上映吗？"
                        ]
                        : SAVE.data.n.plot < 68
                            ? [
                                '<32>{#p/basic}* 那个节目太精彩了！\n* 那个人类看起来跟真的一样！',
                                '<32>* 等等，我好像见过你？'
                            ]
                            : world.bad_robot
                                ? ["<32>{#p/basic}* 哎呀，真让人失望。\n* 他就这样取消了\n  那场大型演出..."]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        '<32>{#p/basic}* 你不会...\n* 你不会真杀掉了镁塔顿？',
                                        "<32>{#p/basic}* 不... 骗人的吧。\n* 镁塔顿的死亡\n  一定是节目效果！"
                                    ]
                                    : [
                                        '<32>{#p/basic}* 所以，人类是真的...\n* 镁塔顿一定是个交际花！',
                                        '<32>{#p/basic}* 顺便说一下，\n  你的表演很棒。'
                                    ],
                () =>
                    SAVE.data.n.plot < 56
                        ? ['<32>{#p/basic}* 镁塔顿通常都有时间安排的，\n  但这次他搞忘了。']
                        : SAVE.data.n.plot < 68
                            ? ['<32>{#p/basic}* 感觉你很像镁塔顿\n  带进来的演员...']
                            : world.bad_robot
                                ? ['<32>{#p/basic}* 好吧，\n  下次再说吧。']
                                : SAVE.data.b.killed_mettaton
                                    ? ["<32>{#p/basic}* 真不敢相信\n  我差点就被骗了！"]
                                    : ["<32>{#p/basic}* 真不敢相信\n  我之前没注意到\n  你是个人类！"]
            ),
            a_harpy: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            "<32>{#p/basic}* 本台记者为您报道！\n* 今天的主题我实在是不想报道！",
                            "<32>{#p/basic}* 我快疯掉了！！\n* 笑鼠了！"
                        ]
                        : roomKills().a_sans > 0
                            ? [
                                "<32>{#p/basic}* 本台记者为您报道！\n* 今天的主题是死亡与毁灭！",
                                "<32>{#p/basic}* 你们知道有个家伙在我面前\n  被杀掉了吗？？\n* 笑鼠了！"
                            ]
                            : !world.badder_lizard
                                ? [
                                    "<32>{#p/basic}* 本台记者为您报道！\n* 今天的主题是金属与魔法！",
                                    "<32>{#p/basic}* 大家知道镁塔顿就是由\n  这两样东西组成的吗？\n* 笑鼠了！"
                                ]
                                : [
                                    "<32>{#p/basic}* 本台记者为您报道！\n* 今天的主题是死亡与毁灭！",
                                    "<32>{#p/basic}* 你们知道我会在\n  短时间内去世吗？？\n* 笑鼠了！"
                                ],
                ['<32>{#p/basic}* 天啊！\n* 我真的好喜欢自己的工作！']
            ),
            a_madguy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* 你在跟谁说话，我吗？\n* 那个被疏散的？",
                                '<32>* 才怪。\n* 我是被迫跟他们走的，\n  只是因为他们说我必须走。',
                                '<32>* 我知道你是个小恶霸\n  或什么之类的...',
                                "<32>* ...但这并不代表你会杀了我。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 这里的每个人\n  都被邀请参加\n  那个派对了。",
                                "<32>* 但我不去。\n* 我不感兴趣。",
                                "<32>* 当然，我很高兴你\n  救了我们所有人...",
                                "<32>* ...但不意味着我必须\n  去往那里，沉迷于情歌植物。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 可怜的，可怜的镁塔顿，\n  不管你做了什么。',
                                '<32>* ...',
                                "<32>* 哦，对了。\n* 没事。"
                            ]
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 这一次，\n  镁塔顿做了一件正确的事，\n  取消了一场演出。',
                                    "<32>* 他的那场压轴演出\n  可不会圆满结束。",
                                    '<32>* 你问我为什么？\n* 直觉而已。'
                                ]
                                : SAVE.data.n.bad_lizard < 2
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* 我是这里原来的喷泉的\n  其中一个建筑师。',
                                        "<32>* 你懂的。\n* 那是在镁塔顿决定把整个喷泉\n  全重建之前的事了。",
                                        "<32>* 我真想问问，谁会这么做啊？\n  就为了改动一个微乎其微的细节，\n  把整个东西全给重建了？",
                                        '<32>* 要我说，实在是有点小家子气。'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 真不敢相信\n  在一个杀手逍遥法外时，\n  镁塔顿竟还在制作节目。",
                                        '<32>* 他不知道这有多危险吗？',
                                        "<32>* 某人会因对此不屑一顾\n  而付出代价的。",
                                        '<32>* 要我说，\n  他这样真的太蠢了。'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 大家，\n  这样做，\n  认真的？',
                                "<32>* 我可不会像他们一样跑掉。",
                                "<32>* 毕竟。\n* 我可没那么胆小。",
                                '<32>* ...呃，我认真的。'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 你要知道。\n* 我不喜欢派对。",
                                '<32>* 我的主要兴趣爱好包括...',
                                '<32>* ...指出并批评\n  拙劣的仿制品。',
                                '<32>* 就像这个喷泉。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 在我看来，\n  这都是他的错。",
                                '<32>* 他过于刚愎自用，以卵击石，\n  最终为此付出了生命。',
                                "<32>* 真是可惜，我想哭泣，\n  不是你爹我真有福气。"
                            ]
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 他离我们越远越好。',
                                    "<32>* 我本想叫他再也不要出现，\n  但是...",
                                    "<32>* ...现在我没什么好心烦的了。"
                                ]
                                : SAVE.data.n.bad_lizard < 2
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* 我得跟你说。\n* 我不是唯一一个。",
                                        '<32>* 你听说过“赛普洛夫先生”吗？',
                                        '<32>* 没错，他本来负责这里\n  最初的建筑项目。',
                                        '<32>* 可现在呢... 他为了谋生，\n  去卖月岩了。'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 说真的。\n* 我也要站出来。",
                                        "<32>* 所以我也感到惭愧。"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* 挺尴尬的，对吧？"]
                            : ["<32>{#p/basic}{#npc/a}* 毫无意义，不是吗？"]
                        : ["<32>{#p/basic}{#npc/a}* 很讽刺，是吧？"]
            ),
            a_proskater: pager.create(
                0,
                () =>
                    SAVE.data.n.plot < 60
                        ? [
                            "<32>{#p/basic}{#npc/a}* 可算从学校里溜出来了，\n  搞不懂了，我去那找罪受干嘛...",
                            "<32>* 对了，听说镁塔顿要给下期节目\n  来点带劲的。",
                            "<32>* 我等不及了啊，老兄..."
                        ]
                        : SAVE.data.n.plot < 68
                            ? [
                                '<32>{#p/basic}{#npc/a}* 老兄，这期节目是挺带劲的...',
                                '<32>* 但也挺奇怪...',
                                '<32>* 就是，那些奖品看着和垃圾差不多，\n  更别说最终大奖了...',
                                '<32>* ...那什么鬼东西啊！'
                            ]
                            : world.bad_robot
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 完了完了...\n* 好端端的，镁塔顿\n  咋就把节目取消了呢。",
                                    '<32>* ...这下我上哪找借口翘课啊，老兄？'
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* 老兄，镁塔顿死了。\n* 挺难过的...",
                                        "<32>* 这下来悼念他，我还能翘会课，\n  但这事过去后，我就完了啊！"
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 老兄，镁塔顿还在这，真好。",
                                        "<32>* 要不是他，\n  我哪来这么多借口翘课。"
                                    ],
                () =>
                    SAVE.data.n.plot < 60
                        ? ['<32>{#p/basic}{#npc/a}* 也不知道他这次\n  能不能找点有意思的选手...']
                        : SAVE.data.n.plot < 68
                            ? ["<32>{#p/basic}{#npc/a}* 你也不想抱着一个\n  等身科幻番玩偶回家吧。"]
                            : world.bad_robot
                                ? ["<32>{#p/basic}{#npc/a}* 我也太不走运了吧。"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* 镁塔顿，你欠考虑了啊...\n  欠考虑了啊...']
                                    : ["<32>{#p/basic}{#npc/a}* 说起来，我现在就在翘课呢..."]
            ),
            a_clamguy: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* 有人说，如果你在这些\n  反反复复的房间里走得太远，\n  就会发生一些怪事。',
                    '<32>* 时间隧道...\n* 恒定空间扭曲...',
                    "<32>* 呃，别问我是什么意思，\n  我就是偶然听到过艾菲斯\n  这么说过一次。",
                    "<32>* 要不是她亲口说过，\n  我都会觉得这都是胡编乱造的..."
                ],
                ["<32>{#p/basic}{#npc/a}* 只要你还能看清东西，\n  你就还是安全的。"]
            ),
            a_pyrope: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* 你以前是个恶霸，\n  但你可能已经改过自新了...",
                                '<32>* 我们回来只是想问，\n  你真的做回你自己了吗？',
                                '<33>* 并不是所有人都会喜欢你，\n  有些人仍然对你感到害怕...',
                                "<32>* 但我想这很正常，\n  毕竟那时你的血液可是\n  流淌着暴力。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 等咱来到新家前沿，\n  直面一切毫不遮掩。",
                                "<32>* 最猛韵脚最美诗篇，\n  对手服输站到一边。",
                                "<33>* 主动挑战丢人现眼？\n  我们只有两句真言...",
                                '<32>* 这是我的世界，\n  你们休想改变。'
                            ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 迷你火山和我组了个说唱组合\n  叫“热火朝天”。',
                            '<32>* 唱一首天籁你最帅。\n* 来一段摇摆一起嗨。',
                            "<33>* 听我妙语连炸就等我登上舞台，\n  瞧观众被我绝杀看你作何抵赖。",
                            "<32>* 至于迷你火山？\n* 人家出招完爆求饶拉倒\n  让你气恼承认自己的失败。"
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* 不用担心。", '<32>* 我们可以原谅\n  你的野蛮行径。']
                            : ["<32>{#p/basic}{#npc/a}* 不用担心。", '<32>* 节拍炫的震天，\n  靓仔美若天仙！']
                        : ["<32>{#p/basic}{#npc/a}* 不用担心。", "<32>* 我们的功底还不算太赖。"]
            ),
            a_vulkin: pager.create(
                0,
                pager.create(
                    2,
                    () =>
                        SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}{#npc/a}* 新的家园，新的观众...',
                                '<32>{#p/basic}{#npc/a}* 甚至比以前都刺激。'
                            ]
                            : ['<32>{#p/basic}{#npc/a}* 哦...\n* 每当人群为我们欢呼，\n  我都感觉... 好刺激。'],
                    () =>
                        SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}{#npc/a}* 新的家园，新的观众...',
                                '<32>{#p/basic}{#npc/a}* 甚至比以前都开心。'
                            ]
                            : ['<32>{#p/basic}{#npc/a}* 哦...\n* 每当人群为我们欢呼，\n  我都感觉... 好开心。']
                ),
                pager.create(
                    2,
                    () =>
                        SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}{#npc/a}* 比以前都刺激。']
                            : ['<32>{#p/basic}{#npc/a}* 好刺激。'],
                    () =>
                        SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}{#npc/a}* 比以前都开心。']
                            : ['<32>{#p/basic}{#npc/a}* 好开心。']
                )
            ),
            a_heats: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            ...(world.population < 6
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 那些负责疏散我的守卫\n  并不尊重我的名字...',
                                    '<32>* 所以我回来就是为了\n  尊重你的名字，弗里斯克！'
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* 你可能知道也可能不知道\n  我的名字...',
                                    '<32>* 但我知道你的名字，弗里斯克！'
                                ]),
                            '<32>* 哈！\n* 我说对了！',
                            "<32>* 而且我永远也不会\n  忘掉这个！",
                            '<32>* 现在不会。',
                            '<32>* 一次也不会！！',
                            '<32>* 永远都不会——！！！！',
                            '<32>* 我永远，永远都不会忘掉\n  你的名字，弗里斯克！！！！！！！！'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 你知道我的名字吗！？',
                            '<32>* ...',
                            "<32>* 等会，你先别回答我。",
                            '<32>* 你...\n* 你-你看起来知道。',
                            '<32>* 你闻起来...\n* ...\n* ...也知道。',
                            '<32>* ...',
                            "<32>* 我敢打赌我要是摸摸你，\n  你摸起来也是知道。",
                            "<32>* （对你来说可能会超级，\n  超-级-火热吧。）",
                            '<32>* 但你为什么知道...？',
                            '<32>* 你是... 怎么知道的...',
                            '<32>* 这我就永远都没法知道了。' 
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 我。永。远。都。忘-不-掉-！']
                        : ['<32>{#p/basic}{#npc/a}* 我。永。远。都。不-知-道-！']
            ),
            a_slime_father: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我的老婆和孩子让我\n  懂得了一个道理。\n* 要对生活满怀憧憬。",
                            '<32>* 你也许早已“成熟”，\n  只愿生活安稳如初，\n  知足常乐...',
                            '<32>* 但即使是最强大的怪物或\n  人类，内心深处却仍然\n  是个孩子。',
                            "<32>* 深入发掘孩童之心。\n* 信任遵循孩童之愿。",
                            '<32>* 即使处于至暗之时，\n  保持心怀童真，\n  亦可朝气蓬勃，享受生活。'
                        ]
                        : ['<33>{#p/basic}{#npc/a}* 啊，又有了年轻时的感觉。\n* 这宇宙果然无边无际。'],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 无论你成为了什么，\n  这一面永远都会是你\n  最真实的一面。']
                        : ['<32>{#p/basic}{#npc/a}* 你还年轻...', "<32>* 去畅玩一番吧！\n* 宇宙没有那么可怕的。"],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 请对此刻骨铭心...']
                        : ['<32>{#p/basic}{#npc/a}* 去吧...']
            ),
            a_slime_mother: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我的老公刚刚才了解自己\n  真正的需求。\n* 但是记住...",
                            '<32>* 你也必须要尝试新的事物，\n  而且永不停息。',
                            '<32>* 不然你也将迷失于自己的世界，\n  失去对未来的方向。'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 我老公认为他现在老了，\n  就不能再享受生活了。",
                            "<32>* 但说实话，\n  他就是不喜欢尝试新东西。",
                            childEvac()
                                ? '<33>* 我们把孩子们带到安全区，\n  但这对他们来说是一种全新的体验，\n  所以他们很开心！'
                                : '<32>* 我们的孩子一直在尝试新东西，\n  看看他们多开心！'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 现在我们自由了，\n  可以尝试更多的新事物了。",
                            '<32>* 去到新世界，\n  发现更多你所知道的，\n  甚至发现创造一个新事物...',
                            '<32>* 一切皆有可能。'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 如果你厌倦了生活，\n  就去尝试点新的东西吧。",
                            childEvac()
                                ? '<32>* 可以是一部电影，一个爱好，\n  甚至是为保护好孩子\n  而感受到的压力...'
                                : '<32>* 可以是一部电影，一个爱好，\n  甚至是一门语言...',
                            '<32>* 一切皆有可能！'
                        ],
                ['<32>{#p/basic}{#npc/a}* 还在等什么呢？']
            ),
            a_slime_kid1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 我们现在来玩...", '<32>* “怪物... 与怪物”的游戏。']
                        : ['<32>{#p/basic}{#npc/a}* 我们玩“怪物与人类”的\n  游戏吧！！'],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 也许不是个好主意。"]
                        : ["<32>{#p/basic}{#npc/a}* 我来当人类。"]
            ),
            a_slime_kid2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我听星儿的妈妈说，\n  在我们的新家园上没有人类...",
                            "<32>* 也许我该学着玩\n  “聪明的怪物”的游戏。"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 我想学习如何玩人类的益智游戏，\n  比如国际象棋。',
                            "<32>* 那边的星儿的妈妈\n  是最擅长这个的...\n  她可以打遍天下无敌手！"
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* “4D扑克牌”是什么呀？']
                        : ['<32>{#p/basic}{#npc/a}* “迫移局面”是什么意思啊？']
            ),
            a_diamond1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 所以你的名字\n  是叫弗里斯克对吧？',
                            '<32>* 你和镁塔顿的表演太酷了...',
                            '<32>* 但是你那个“终神之战”更疯狂！'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我们刚到这里时，\n  镁塔顿就已经在\n  准备他的第一场演出了！",
                                '<32>* 叫做“寻找人类之星”。'
                            ]
                            : SAVE.data.n.plot < 68
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 我们是来看镁塔顿的大结局的，\n  但是...",
                                    ...(iFancyYourVilliany()
                                        ? [
                                            "<32>* 我没想到我可以这么近距离地\n  看到$(moniker1)！",
                                            '<32>* ...你就是$(moniker1)，是吧？'
                                        ]
                                        : [
                                            "<32>* 我没想到我可以这么近距离地\n  看到那个人类！",
                                            '<32>* ...你就是那个人类，是吧？'
                                        ])
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        iFancyYourVilliany()
                                            ? "<32>{#p/basic}{#npc/a}* 所以你就是那个\n  $(moniker1)，对吧？"
                                            : "<32>{#p/basic}{#npc/a}* 所以你就是那个人类，对吧？",
                                        '<32>* ...'
                                    ]
                                    : [
                                        iFancyYourVilliany()
                                            ? "<32>{#p/basic}{#npc/a}* 嘿，是$(moniker1)！\n  史上最棒的反派演员！"
                                            : "<32>{#p/basic}{#npc/a}* 嘿，你是那个在镁塔顿\n  的节目中击败他的人类！",
                                        '<32>* 表演超精彩的！'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 更好的是，\n  我们都坐到了第一排！']
                        : SAVE.data.b.ubershortcut
                            ? ['<32>{#p/basic}{#npc/a}* 人类会在哪里呢...']
                            : SAVE.data.n.plot < 68
                                ? ["<32>{#p/basic}{#npc/a}* 我支持你！"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* ...离我远点。']
                                    : ['<32>{#p/basic}{#npc/a}* ...能给我签名吗？']
            ),
            a_diamond2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 你不想再看一遍吗？",
                            '<32>* 为了拯救前哨站所有人\n  的生命，从而陷入一场看似\n  没有“镜头”的苦战...',
                            '<32>* 太酷炫了！'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                '<32>{#p/basic}{#npc/a}* 在堡兄做了那些事后，\n  我以为镁塔顿不会再做\n  电视节目了。',
                                '<32>* 但现在...'
                            ]
                            : SAVE.data.n.plot < 68
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 你难道不为大结局\n  感到兴奋吗！？",
                                    iFancyYourVilliany()
                                        ? '<32>* 镁塔顿和那个人类反派，\n  $(moniker2)之间的最后对决...'
                                        : '<32>* 镁塔顿和那个人类明星\n  之间的最后对决...',
                                    '<32>* 为了银河系的荣耀，\n  最后一次戏剧性的对峙！'
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? ["<32>{#p/basic}{#npc/a}* 镁塔顿他竟然真的...\n* 永远离开了我们...", '<32>* ...']
                                    : [
                                        '<32>{#p/basic}{#npc/a}* 镁塔顿最后真的把我们\n  都骗到了...',
                                        "<32>{#p/basic}{#npc/a}* 有那么一刻，\n  我以为再也见不到他了！"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 遗憾的是时间太短没看够。"]
                        : SAVE.data.b.ubershortcut
                            ? ["<32>{#p/basic}{#npc/a}* 他回来真好。"]
                            : SAVE.data.n.plot < 68
                                ? ["<32>{#p/basic}{#npc/a}* 我支持镁塔顿！"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* 我想回家了...']
                                    : ["<32>{#p/basic}{#npc/a}* 我想知道他接下来会做什么..."]
            ),
            a_gyftrot: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 等我们到达新家园时，\n  我要去找个寒冷的地方定居。",
                            "<32>* 尽管我不需要这么做。\n* 但这样的话这只熊就不会\n  出于同情给我送礼物了。"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 这只熊坚持要给我\n  头上作些装饰。',
                            '<32>* 我知道它送我礼物是出于好意，\n  但是我根本不需要头饰...'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* ...额，也许青少年也没那么坏。"]
                        : ["<32>{#p/basic}{#npc/a}* ...至少它不像青少年那样抱我。"]
            ),
            a_giftbear: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 我开始觉得我对礼物鹿的同情\n  有点过于推己及人了。',
                            '<32>* 从我记事起，\n  我就很渴望一个\n  寒冷的居住环境...',
                            '<32>* 当我们到达新家园时，\n  我会去找一个。'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 我为礼物鹿感到难过。\n* 和我们许多人一样，它从来\n  没在自己的自然栖息地生活过。',
                            '<32>* 艾菲斯最近说过\n  力场很快就会崩溃。',
                            '<32>* 也许当那发生时，\n  我们就都可以休息一下了。'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 目前，我仍将继续陪伴礼物鹿。\n* 送礼物是我唯一知道的\n  互动方式。"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 但现在，我将尽我最大努力\n  去改善那些比我还不幸\n  的人的生活。'
                        ]
            ),
            a_boomer: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* 老实说，头儿。\n* 我很感谢\n  你以前欺负过所有人。",
                                "<32>* 尽管他们因此恐惧...",
                                '<33>* 但至少他们终于\n  放下谜题来生活了。'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 新家园将会发生\n  一场狂欢，头儿。",
                                '<32>* 你猜猜为啥？',
                                "<33>* 对咯。\n* 没有烂谜题等待着解决。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我不明白人们为什么\n  要为那个叫镁塔顿的家伙\n  感到紧张不安。",
                                '<32>* 懂我意思吗，头儿？',
                                "<32>* 为什么要对一个陌生人\n  感到心烦意乱呢？"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 你知道为什么我这么\n  喜欢在这消遣吗？',
                                "<32>* 原因很简单，头儿。",
                                "<32>* 这里没有烂谜题\n  需要解决。"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 对，你听到我说的了。',
                                "<32>* 我宁愿命悬一线，\n  也不愿处理谜题。",
                                "<32>* 就是这样，头儿。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 对，我还是这么说。',
                                '<32>* 我还是说它很烂。',
                                "<32>* 这个事实永远也不会改变，\n  头儿。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 实话实说而已。",
                                "<32>* 我们大部分人都不了解他。",
                                "<32>* 这是事实，头儿。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 对，我就这么说了。',
                                '<32>* 我说谜题就是很烂。',
                                "<32>* 这是事实，头儿。"
                            ],
                ['<32>{#p/basic}{#npc/a}* 头儿。']
            ),
            a_artgirl: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我是一个艺术老师。\n* 但我现在考虑辞职。",
                            "<32>* 我要找一份不用批评别人\n  的工作...",
                            '<32>* 一份能让人们开心的工作。'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我是一名艺术老师。\n* 艺术应该让人感到积极快乐，\n  对吧？",
                                '<32>* 但我一个学生最近开始\n  画那些悲伤的画作。',
                                "<32>* 看着就让人心痛...\n* 我想帮助他，\n  但又不能阻止他。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 我是一名艺术老师。\n* 在艺术上，\n  据说没有对与错之分。",
                                '<32>* 但我一个学生认为他\n  所做的一切都是错误的...',
                                "<32>* 他不停地道歉...\n* 我想帮助他，\n  可我不知道该怎么做。"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 那不是很棒吗？"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* 为什么大家都不能\n  保持积极向上呢？"]
                            : ['<33>{#p/basic}{#npc/a}* 为什么教一门主观课程\n  在客观上那么困难？']
            ),
            a_drakemom: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 所以，一个新家园，是吧？\n* 我和我的儿子将会一起做\n  许多伟大的事情。',
                            "<32>* 那些事情真的特别棒。\n* 特别是前往那个老艺术老师\n  向往的那个地方。",
                            "<32>* 然后，我们会一起吃饭，\n  一起看电影... 他爹\n  也可以一起来。",
                            "<32>* 成长中的男孩总是会有\n  不同的需求，不是吗？\n* 所以这样才合理。",
                            "<32>* 不知我儿子的朋友\n  是否感兴趣...？"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 发生什么了吗？\n* 我一直在专注于这场比赛，\n  没注意到。",
                                "<32>* 但也没事。\n* 毕竟这比赛非常重要，不能\n  因别的事就被转移注意力啊。"
                            ]
                            : postSIGMA()
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 刚才所有的灯都灭了。\n* 这让我现在有点为难。",
                                    '<32>* 但我如果放弃了，\n  我的对手可能会回来，\n  将胜利从我的羽毛下偷走！'
                                ]
                                : SAVE.data.b.ubershortcut || world.population === 0
                                    ? [
                                        '<33>{#p/basic}{#npc/a}* 嗯，我站在这桌子旁。\n* 然后组织了这场比赛。\n* 但是我的对手呢？',
                                        '<32>* 没有！这么好的地方\n  一个想当我对手的人都没有！'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 我下了这步棋。\n* 所谓“兵走国王马前四”吧？\n* 然后我的对手就走掉了。",
                                        "<32>* 所以呢，现在我得等了。\n* 肯定得等上好长一段时间，\n  那个钟才能转完。"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 全家人都会快乐。']
                        : SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* 比赛永远是第一。']
                            : postSIGMA()
                                ? ['<32>{#p/basic}{#npc/a}* 你永远不知道你的对手\n  会对你耍什么花招。']
                                : SAVE.data.b.ubershortcut || world.population === 0
                                    ? ["<32>{#p/basic}{#npc/a}* 真让人失望。\n* 甚至于万念俱灰。"]
                                    : ["<32>{#p/basic}{#npc/a}* 我不可能按时间顺序\n  从这件事中恢复过来。"]
            ),
            a_drakedad: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 尽管恁曾把我们都吓跑过，\n  但恁至少拯救了我们。',
                                "<32>* 所以我对恁是敬而远之。"
                            ]
                            : SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 不管恁道不道歉，\n  恁这个功已经大于了\n  恁曾对我儿子造成的伤害。",
                                    '<32>* 感谢恁的善举。'
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* 既然我们自由了，\n  当服务员儿可能\n  不再适合我了。",
                                    "<32>* 我们的儿子回来了，\n  所以我得给我自己儿\n  找份新工作了..."
                                ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 这里的一切都在分崩离析。\n* 人们想让他们的明星儿回来。',
                                "<32>* 他们不再来我们的\n  餐厅儿吃饭了...",
                                '<32>* 都去儿吃快餐了。'
                            ]
                            : SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 我从我儿子的朋友\n  那听说过恁，\n  他朋友说他全身都是伤...",
                                    "<32>* 恁能过会\n  替我向他道歉吗？\n* 那会让他不敢冒险。"
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* 我是个服务员儿。\n* 我老婆是下棋的，\n  儿子是演喜剧的。",
                                    '<32>* 别人都说当服务员儿挺无聊的，\n  但我觉着挺适合我。',
                                    "<32>* 当然，我还是个当爹的。\n* 我挺担心我儿子的，\n  他最近不经常回家...",
                                    '<32>* 反倒是经常去星港\n  给他朋友讲笑话。'
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ['<32>{#p/basic}{#npc/a}* 恁以后可以当个良人吗？']
                            : SAVE.data.b.s_state_chilldrake
                                ? ['<32>{#p/basic}{#npc/a}* 非常感谢儿。']
                                : ["<32>{#p/basic}{#npc/a}* 也许我可以当一名酒保儿。"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* 如果事情\n  继续这样发展下去，\n  我就会失业的。"]
                            : SAVE.data.b.s_state_chilldrake
                                ? ['<32>{#p/basic}{#npc/a}* 我向恁保证。']
                                : ['<32>{#p/basic}{#npc/a}* 至少他讲的笑话还算好笑。']
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
                                        : '<32>* 这会，守卫全下班了，\n  所以我可以溜进休闲回廊...',
                                "<32>* 但是... 啊...\n* 闻了这么多，就这朵劲最足..."
                            ],
                ["<32>{#p/basic}{#npc/a}* 别管我，\n  我正搁这... 吸仙气呢。"]
            ),
            a_oni: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 经过一番努力，\n  我们终于可以逃脱了。",
                            "<32>* 老实说，\n  我已经厌倦了这工作。\n* 但这是一段不错的历程。",
                            "<32>* 也许，\n  当我们到达新的世界后，\n  我会成为一名工厂工人。",
                            "<32>* 别告诉我这跟\n  做核心工人是一回事。",
                            "<32>* 比如说，那两个女孩\n  就没法盯着我们的脖子了。",
                            "<32>* 不，凯蒂，\n  我不想和你一起过夜！\n* 故事结束了！"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 很久以前，\n  有人在力场发现了一个弱点，\n  就是外域所在的那个位置。',
                            "<32>* 这不代表我们就可以从那里逃出去了，\n  而是代表着任何经过那里的人类...",
                            '<32>* ...都必须在那个地方紧急迫降。',
                            '<32>* 所以我们把前哨建得\n  又长又曲折，\n  来阻碍潜在的入侵可能性。',
                            "<32>* 我们很快就意识到\n  这点子实在不聪明。\n  但那时候，大家都墨守成规了。",
                            "<32>* 现在，\n  你走不到两秒钟\n  就会在那里迷路..."
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 她总是那样跟我\n  鸡蛋里面挑骨头。",
                            '<32>* 呃...\n* 也许情况会更糟。',
                            "<32>* 也许我们还要为那个\n  愚蠢的机器人工作。"
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 至少核心的设计理念\n  不是这样的。",
                            "<32>* 你能想象到我们去修个东西\n  都得走一遍迷宫的样子吗？"
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/basic}{#npc/a}* 继续下去吧，你们两个...']
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}{#npc/a}* 还好一切都结束了。"]
                            : ['<32>{#p/basic}{#npc/a}* 别了吧，我可领教不来。']
            ),
            a_charles: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 看来我的工作要结束了。\n* 不再会有更多的核心了。',
                            '<32>* 确实，更多的核心。\n* 但不会属于我们了。',
                            '<32>* 马上，我们都会离开，\n  而且永不回来。',
                            '<32>* 我的未来在何方？',
                            '<32>* 天，真希望我知道！'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 我在核心工作。\n* 那里的平面图设计看起来\n  就像一只鸟。',
                            '<32>* 哦！我敢说你肯定不知道\n  “核心”的意思是什么！',
                            '<32>* 它的全称是“\u4dc0离子核重构\n  电力引擎中心”。',
                            '<32>* 你问这是什么意思？',
                            '<32>* 我反正不知道，毫无头绪！'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 也许，在另一条时间线，\n  我会当上一个国王。',
                            '<32>* 我是善良的查尔斯国王，\n  随时为您服务！',
                            "<32>* 那不是很棒吗！"
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 核心的另一个很酷的地方\n  在于它的超控开关。",
                            "<32>* 它们都受着严密的保护，\n  但其中一个是被谜题保护着，\n  不是真正的那种守卫在保护！",
                            '<32>* 我真的爱死谜题了！'
                        ]
            ),
            a_dragon: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* 所以你是说下一期喜剧节目\n  两周后才会播出？？",
                    '<32>* 我还以为是今天呢！'
                ],
                [
                    "<32>{#p/basic}{#npc/a}* 所以你是说我不能改天\n  再安排我的座位了？",
                    '<32>* 这地方简直太蠢了！'
                ]
            ),
            a_foodreceptionist: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （你靠在这个\n  废弃的台面上趴了一会。）']
                        : adultEvac()
                            ? world.bulrun
                                ? ['<32>{#p/basic}* ...但是大家都逃走了。']
                                : ['<32>{#p/basic}* ...但是谁也没有来。']
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （所有预定已取消。）\n* （依据条款第二节，自由条款。）',
                                    "<32>* （你没看过服务条款吗...？）"
                                ]
                                : music.sansdate.instances.length > 0
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （我希望你与你的约会对象\n  可以用餐愉快。）',
                                        '<32>* （那看起来是一段\n  很愉快的小谈话。）'
                                    ]
                                    : SAVE.data.b.killed_mettaton
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （使用我们的镁塔限时优惠券，\n  预订可享受半折优惠！）'
                                        ]
                                        : world.population < 2
                                            ? ['<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （这一天天的，\n  陪我的人越来越少了...）']
                                            : [
                                                "<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （想在这吃东西的话，\n  你得先预约一张桌子。）",
                                                "<32>* （那帮事多的人\n  只要没见着预约按顺序排好\n  就会感到不安。）"
                                            ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （你靠在这个\n  废弃的台面上趴了一会。）']
                        : adultEvac()
                            ? world.bulrun
                                ? ['<32>{#p/basic}* ...但是大家都逃走了。']
                                : ['<32>{#p/basic}* ...但是谁也没有来。']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （新家园见...）']
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （截止到明天。）']
                                    : ['<32>{#p/basic}{#npc/a}* 咕噜咕噜...\n* （现在的预定已经都满了。）']
            )
        },
        genotext: {
            timewaster: () =>
                [
                    ['<25>{#p/asriel2}{#f/10}* 为啥还要回来呢？'],
                    ["<25>{#p/asriel2}{#f/7}* 完全没必要啊。"]
                ][Math.min(SAVE.flag.n.ga_asrielTimewaster++, 1)],
            asriel46: ['<25>{#p/asriel2}{#f/13}* 哎呀...\n  跟你一块来这，\n  总感觉瘆得慌。'],
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
                        '<25>{#f/4}* 操纵重力，改变供暖，\n  管理大气...\n  统统不在话下。',
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
                        "<32>{#p/mettaton}* 说得好...\n  不过我可不吃你这一套。"
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
                ? ["<32>{#p/human}* （你无法再按下开关了。）"]
                : world.darker
                    ? ["<32>{#p/basic}* 果然，又卡住了。"]
                    : SAVE.data.n.plot === 72
                        ? ["<33>{#p/basic}* 这个开关...\n  一次都没被按下过。\n* 老实说，这确实有可能发生。"]
                        : ['<32>{#p/basic}* 这个开关...\n  在一瞬间就被按下了。\n* 而且不像和其他的那样被卡住。'],
        puzzlesolved: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* （你无法再按下开关了。）"]
                : world.darker
                    ? ["<32>{#p/basic}* 果然，又卡住了。"]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* 看起来这开关\n  比以前更耐按了。']
                        : ["<32>{#p/basic}* 这个开关不想再被按下了。\n* ...没错，它卡住了。"],
        nosleep: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* （你似乎找不到入口。）"] : ["<32>{#p/basic}* 锁住了。"],
        rg1chat: pager.create(
            0,
            [
                '<32>{#p/basic}{#x1}* 我跟我男朋友在训练的时候\n  去找冰淇淋，结果迷路了...{#x3}',
                '<32>{#x1}* 最后，我们放弃了，\n  吃了顿披萨当弥补了。{#x3}',
                "<32>{#x1}* 然后我们就在这个岗位上\n  担任安保工作，毕竟我们\n  最擅长的就是这个了。{#x3}"
            ],
            [
                "<32>{#p/basic}{#x1}* 听说我们这帮安保人员\n  在店里可以享受超级优惠。{#x3}",
                '<32>{#x1}* 当然我们完全不是冲这个来的。{#x3}'
            ]
        ),
        rg2chat: pager.create(
            0,
            [
                "<32>{#p/basic}{#x2}* 嘿，你不就是那个，\n  我们早些时候看到的\n  那个安静的孩子吗？{#x3}",
                '<32>{#x2}* 不知道为什么艾菲斯\n  一定要护送你...{#x3}',
                '<32>{#x2}* 你一定... 特别重要吧。{#x3}'
            ],
            [
                "<32>{#p/basic}{#x2}* 你要是成名了的话，\n  等你飞黄腾达了之后\n  别忘了我们，好吗？{#x3}",
                "<32>{#x2}* 永远都要记住你在路上\n  遇到的哥们啊。{#x3}"
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
                "<25>{#p/sans}* 嘿，听说你要来这了。",
                '<25>{#p/sans}{#f/2}* 介不介意来和我吃一顿？\n  要不了多久的。',
                choicer.create('* （共进晚餐吗？）', '好啊', '我很忙')
            ],
            () => ['<25>{#p/sans}{#f/2}* 改主意了吗？', choicer.create('* （共进晚餐吗？）', '好啊', '我很忙')]
        ),
        dinnerdate2a: pager.create(
            0,
            ["<25>{#p/sans}{#f/3}* 嗯，没关系。\n* 你要是改主意了，\n  随时来找我。"],
            ['<25>{#p/sans}{#f/3}* 那好。']
        ),
        dinnerdate2b: ['<25>{#p/sans}{#p/sans}{#f/0}* 挺好。'],
        dinnerdate3: ['<25>{#p/sans}{#f/2}* 这边走。'],
        dinnerdate4: ['<25>{#p/sans}* 我们到了。'],
        dinnerdate5: ['<25>{#p/sans}* 咱们就坐这张桌子吧。'],
        dinnerdate5b: ["<25>{#f/2}* 我坐右边，你坐左边。"],
        dinnerdate8: () => [
            '<25>{#p/sans}* 所以...',
            "<25>{#f/3}* 你的旅程就快结束了，\n  是吧？",
            '<25>{#f/0}* 你一定迫不及待地\n  想离开这里了。',
            '<25>{#f/0}* ...嘿。\n* 相信我，我知道那种感觉，\n  伙计。',
            ...(world.bad_lizard < 1 && SAVE.data.n.bully < 15
                ? [
                    "<25>{#f/3}* ...我也知道，\n  你有很多事要忙。",
                    "<25>{#f/0}* 在这里，你已经有了\n  美食，饮料，朋友...",
                    '<25>{#f/2}* 为什么就不能和我们\n  待在一起呢？'
                ]
                : [
                    "<25>{#f/3}* ...我也知道，\n  你有很多烦心事。",
                    "<25>{#f/0}* 但不管你做过什么事...",
                    '<25>* 离开这里真的需要这么\n  大费周章吗？'
                ])
        ],
        dinnerdate10: ['<25>{#f/0}* ...'],
        dinnerdate11: () => [
            '<25>{#f/3}* 给你讲个故事吧。',
            "<25>{#f/0}* 你知道我是皇家哨兵，\n  对吧？",
            '<25>{#f/0}* 我的工作就是坐在外面，\n  监视人类。',
            "<25>{#f/3}* 不过，我相信你现在\n  应该已经意识到了...",
            '<25>{#f/2}* 我揽下这个工作，\n  实际上是为了保护\n  你们这帮人。',
            ...(SAVE.data.n.state_foundry_undyne > 0
                ? [
                    "<25>{#f/3}* 我担心过事情败露，\n  但是... 你懂的。",
                    "<25>{#f/0}* 这年头，\n  还能有多少人在乎呢。"
                ]
                : world.bad_lizard < 1 && SAVE.data.n.bully < 15
                    ? ["<25>{#f/4}* 嘘，你别跟安黛因说\n  是我说的。\n* 她可不喜欢听这些。"]
                    : ["<25>{#f/0}* ...很讽刺，是吗？"]),
            "<25>{#f/0}* 总之，这份工作\n  超级无聊，对吧？",
            "<25>{#f/0}* 幸运的是，在星港深处，\n  有一个不大点的地方。",
            "<25>{#f/0}* 在通往这地方的桥的尽头\n  有一扇老旧的大门。",
            '<25>{#f/4}* 现在这扇大门，\n  是练习敲门笑话的\n  最佳场所。',
            "<25>{#f/0}* 有一天，\n  我就像往常一样敲着门...",
            '<25>{#f/0}* 我敲了敲那扇门，然后\n  说：“敲门，咚咚咚。”\n* 一如既往。',
            '<25>{#f/0}* 但突然，在门后面...',
            "<25>{#f/3}* 传来了一个女人的声音。",
            '<32>{#p/soriel}* “是谁？”',
            '<25>{#p/sans}{#f/0}* 自然而然，\n  我就接了下去。',
            '<25>{#f/2}* “大佬。”',
            '<32>{#p/soriel}* “哪个大佬？”',
            '<25>{#p/sans}{#f/4}* “大佬远跑这里来\n  干什么呢？”',
            '<25>{#f/0}* 然后她就大笑了起来。',
            "<25>* 好像她有一百年\n  没听过这么好笑的\n  笑话了一样。",
            '<25>{#f/2}* 所以，自然而然，\n  我就继续讲了好多笑话。',
            '<25>{#f/0}* 接着，\n  在我讲了十几个之后，\n  她就先起了头...',
            '<32>{#p/soriel}* “敲门，咚咚咚！”',
            '<25>{#p/sans}* 我说：“是谁？”',
            '<32>{#p/soriel}* “咪。”',
            '<25>{#p/sans}* “什么咪？”',
            '<32>{#p/soriel}* “哎呀，我才不是什么\n   ‘小猫咪’！”',
            '<25>{#p/sans}{#f/0}* ...嘿。',
            '<25>{#f/2}* 不用多说，\n  这个女人真的很懂笑话。',
            '<25>{#f/0}* 我们就这么讲了一阵子，\n  但最后，她必须得走了。',
            '<25>{#f/0}* 不过，第二天...',
            '<25>* 等我回去找她的时候，\n  她在那里等着我。',
            '<25>{#f/3}* ...你知道吗，\n  她对我说了好多好多。',
            '<32>{#p/soriel}* “我希望我做的事情\n   是对的...”',
            '<32>{#p/soriel}* “...我必须保护\n   那孩子...”',
            '<32>{#p/soriel}* “...不能再像之前\n   那样了...”',
            '<25>{#p/sans}{#f/3}* 事实证明，\n  这个女人远没有听上去\n  那么简单。',
            '<25>{#f/0}* 哦，她还说了一大堆\n  关于艾斯戈尔的\n  奇怪的事情。',
            "<25>{#f/3}* 细节就不跟你赘述了，\n  但我就这么跟你说吧...",
            "<25>{#f/2}* 隔阂真的会轻易改变\n  一个人的世界观。"
        ],
        dinnerdate13: ['<25>{#p/sans}{#f/0}* 哎呀，我忘了点菜了，\n  是吧？', '<25>* ...'],
        dinnerdate14: ["<25>{#f/3}* 我马上回来。"],
        dinnerdate14comment: () =>
            world.darker
                ? ['<32>{#p/basic}* ...']
                : SAVE.data.b.oops
                    ? ['<32>{#p/basic}* 实话说，\n  没有比期待美食上桌\n  更好的体验了。']
                    : [
                        '<32>{#p/basic}* 你知道吗...',
                        "<32>{#p/basic}* 我当时本来想和她多说几句的，\n  但我转念一想...",
                        '<32>{#p/basic}* ...就算多说了，\n  能有什么别的作用吗？'
                    ],
        dinnerdate15: () =>
            SAVE.data.b.water
                ? [
                    '<25>{#p/sans}* 你看，\n  你甚至带了杯喝的过来。',
                    "<25>{#p/sans}{#f/2}* 不用担心我。\n* 我已经在柜台那边喝过了。"
                ]
                : [
                    "<25>{#p/sans}* 我们继续聊。",
                    "<25>{#p/sans}{#f/2}* 不用担心我。\n* 我已经在柜台那边\n  吃过东西了。"
                ],
        dinnerdate16: () => [
            '<25>{#f/0}* 总之，就像我说的...',
            '<25>{#f/3}* 这个女人承受了\n  很大的压力。',
            '<25>{#f/0}* 所以我问她...',
            '<25>{#f/2}* “想知道骷髅是怎么\n   打发时间的吗？”',
            '<32>{#p/soriel}* “怎么打发的？”',
            '<25>{#p/sans}{#f/2}* 然后我拿起长号\n  吹了一段骨乐。',
            '<25>{#f/4}* 该说不愧是她，\n  很快就理解了我的笑话。',
            "<25>{#f/0}* ...那天晚上是我们\n  有史以来过得最\n  开心的一晚。",
            '<25>{#f/0}* 然后时间就这样过去，\n  看看现在吧...',
            "<25>{#f/2}* 我把大部分时间都\n  花在照顾你上了。",
            "<25>{#f/0}* 但是，嘿，\n  该说不说，我做得不错吧？",
            '<25>{#f/3}* 我是说，\n  看看你自己吧...',
            "<25>{#f/0}* 你连一次都没死过呢。",
            ...(SAVE.flag.n._deaths > 0
                ? ['<25>{#f/0}* ...', "<25>{#f/0}* 嘿，\n  你那表情是什么意思？", '<25>{#f/2}* 难道我说错了吗...？']
                : SAVE.flag.n._hits > 0
                    ? ['<25>{#f/2}* 嘿。\n* 该说都是我的功劳吧。']
                    : ["<25>{#f/2}* 嘿。\n* 我敢说你身上\n  一点小伤口都没有。"])
        ],
        dinnerdate18: () => [
            ...(SAVE.flag.n._deaths > 0 ? ['<25>{#p/sans}{#f/0}* 嘿。'] : []),
            '<25>{#p/sans}{#f/0}* 总之，好好吃饭吧...\n  也希望你都能理解\n  我说的话。' 
        ],
        dinnerdate19: () => [
            "<25>{#f/3}* 记住，\n  我们都支持你，孩子。",
            ...(SAVE.data.n.exp <= 0
                ? SAVE.data.n.state_foundry_undyne === 1
                    ? ["<25>{#f/0}* ...这无关乎你都\n  拯救过谁。"]
                    : ["<25>{#f/2}* ...甚至安黛因现在\n  都站在你这边了。"]
                : world.bad_lizard < 1 && SAVE.data.n.bully < 15
                    ? ["<25>{#f/0}* ...这无关乎你做过\n  什么事情。"]
                    : ['<25>{#f/0}* ...好吧，至少是，\n  我们中的大多数人。'])
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
                    "<32>{#p/basic}* 不过，这都不是事儿！\n* 很快，情况就会好转了！\n  你听到没！",
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
                        ? '<32>{#p/human}* （你走近了自动售货机。）'
                        : "<32>{#p/basic}* 这是个专卖灯芯的自动售货机。",
                    choicer.create('* （花40G买五根灯芯吗？）', '买', '不买')
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
                        "<32>{#p/basic}{#npc/a}* 欢迎来到四维酒店。\n* 我们打烊了。\n* 依据条款第二节，自由条款。",
                        '<32>* 人们从来都不看服务条款...'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* 欢迎来到四维酒店，\n  在这里，\n  睡眠与感知的边缘相遇。',
                            '<32>* 我们目前分配的房间\n  都已被预订。',
                            '<32>* 当分配了更多空间时，\n  欢迎您再来。'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 欢迎来到四维酒店，\n  在这里，\n  睡眠与感知的边缘相遇。',
                            "<32>* 只要你在我们这订了房间，\n  这房间将永远都会属于你。",
                            "<32>* 我们在左边有一间普通套房，\n  价格为300G。\n* 感兴趣不？{#npc}",
                            choicer.create('* （订一间房吗？）', '订', '不订')
                        ],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/basic}{#npc/a}* 新世界见。']
                    : SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* 那下次见！']
                        : [
                            '<32>{#p/basic}{#npc/a}* 300G订一套\n  你自己的套房。\n* 感兴趣不？{#npc}',
                            choicer.create('* （订一间房吗？）', '订', '不订')
                        ]
        ),
        bedreceptionist2a: [
            '<32>{#p/basic}{#npc/a}* 谢谢，我们期待\n  你能睡得安全舒适！'
        ],
        bedreceptionist2b: ["<32>{#p/basic}{#npc/a}* 好吧，\n  等您改变主意时，\n  欢迎您再来。"],
        bedreceptionist3: ["<32>{#p/basic}{#npc/a}* 你的钱不够。"],
        bedreceptionist4: () =>
            SAVE.data.n.plot === 72
                ? [
                    '<32>{#p/basic}{#npc/a}* 和往常一样，\n  我们感谢你能购买房间。',
                    "<32>* 我们马上就要打烊了，\n  所以趁还有时间，\n  好好享受你的房间吧！"
                ]
                : [
                    '<32>{#p/basic}{#npc/a}* 感谢您在四维酒店购买房间！',
                    ...(SAVE.data.b.killed_mettaton ? ['<32>* 您的选择是绝佳的。'] : [])
                ],
        core1: [
            '<32>{#p/event}* 铃铃，铃铃...',
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...你-你好。',
            "<25>* 这座电梯直通首塔，\n  到了那里，你就安全了。",
            "<25>{#g/alphysInquisitive}* 但是...\n  这玩意出了点故障。",
            
            "<25>{#g/alphysCutscene3}* 所以，你只能先到核心，\n  自己走到出口，\n  才能去首塔。",
            "<25>{#g/alphysUhButHeresTheDeal}* 等你准备好了，就出发吧。\n* 到时我再给你回电话！"
        ],
        core2a: () =>
            [
                [
                    '<32>{#p/event}* 铃铃，铃铃...',
                    "<25>{#p/alphys}{#g/alphysSmileSweat}* 好，这里就是核心。",
                    "<25>{#g/alphysSmileSweat}* 这段时间里\n  我会常和你联系，\n  以防出什么意外。",
                    
                    ...(SAVE.data.n.plot < 66.2
                        ? [
                            '<25>{#g/alphysInquisitive}* 按理说，\n  特战队应该不会\n  来找你麻烦。',
                            "<25>{#g/alphysNeutralSweat}* ...但就怕万一。"
                        ]
                        : [
                            "<25>{#g/alphysInquisitive}* 我们来的早。\n* 这会儿，\n  特战队还没上班。",
                            "<25>{#g/alphysNeutralSweat}* ...希望一路上畅通无阻。"
                        ])
                ],
                SAVE.data.n.plot < 66.2
                    ? [
                        '<32>{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/alphys}{#g/alphysWelp}* 所以，准备好了吧？',
                        '<25>{#g/alphysNeutralSweat}* 一定要小-小心特战队成员！'
                    ]
                    : SAVE.data.n.plot < 67
                        ? [
                            '<32>{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/alphys}{#g/alphysWelp}* 所以，准备好了吧？',
                            '<25>{#g/alphysNeutralSweat}* 前面还有道门，\n  别-别忘了开...'
                        ]
                        : [
                            '<32>{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/alphys}{#g/alphysWelp}* 所以，准备好了吧？',
                            "<25>{#g/alphysNeutralSweat}* 我们离出口不远了..."
                        ],
                ['<32>{#p/event}* 铃铃，铃铃...', "<25>{#p/alphys}{#g/alphysWelp}* 我会一直在线的。"]
            ][Math.min(SAVE.data.n.state_aerialis_coreenter++, 2)],
        core2b: () =>
            [
                [
                    "<25>{#p/alphys}{#g/alphysInquisitive}* 你要是想离开核心，\n  那我就先挂电话了。",
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
                                '<25>{#g/alphysWorried}* 那应该是\n  最-最后一个工程师了。'
                            ],
        core7: [
            '<25>{#p/alphys}{#g/alphysWelp}* 嗯... 这就是核心。\n* 或者说，核心的“核心”。',
            '<25>{#g/alphysInquisitive}* 后面那扇门锁住了\n* 想-想打开它，\n  有两条路可以走...',
            "<25>* 左边的是智者之路，\n  而右边的是勇者之路。",
            '<25>{#g/alphysFR}* 两边都... 蛮难走的。\n* 不过...',
            "<25>{#g/alphysWelp}* 我推荐你-你走左边。",
            "<25>{#g/alphysSideSad}* 当然了，\n  是走左边，还是右边，\n  还是看你...",
            "<25>{#g/alphysHaveSomeCompassion}* 但至少...\n  走智者之路，会...\n  安全一点。"
        ],
        core8a: (nooted: boolean) => [
            "<25>{#p/alphys}{#g/alphysSide}* 看来你决定走智者之路。",
            '<25>{#g/alphysWelp}* 挺明智的。',
            ...(nooted
                ? [
                    '<25>{#g/alphysCutscene3}* 这些谜题...',
                    '<25>{#f/10}* ...已经解开了。',
                    '<25>{#f/3}* 怪事，\n  之前是这样的吗？'
                ]
                : [
                    "<25>{#g/alphysCutscene3}* 这些谜题... 其实就是\n  难者不会，会者不难。",
                    "<25>{#g/alphysCutscene2}* 说白了，\n  这玩意就是个...\n  大号密码锁罢了。",
                    '<25>{#g/alphysWelp}* 拨动开关，升降棱柱。\n  只要让柱子都升起来，\n  门就开了。'
                ])
        ],
        core8a1: () => ["<25>{#p/alphys}{#g/alphysInquisitive}* 莫非你更想走另一条路...？"],
        core8b: ["<25>{#p/alphys}{#g/alphysCutscene2}* 解决一个，还剩一个。"],
        core8b1: () => ["<25>{#p/alphys}{#g/alphysWelp}* 看来现在我们又往这边走了。"],
        core8c: ['<25>{#p/alphys}{#g/alphysCutscene1}* 你成功了！\n* 去下个房间，按下开关吧！'],
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
                    : ["<25>{#p/alphys}{#g/alphysInquisitive}* 莫非，我是说当然了，\n  你打算换另一条路走...？"]
                : nooted
                    ? [
                        '<25>{#p/alphys}{#g/alphysInquisitive}* 你改变...',
                        "<25>{#p/alphys}{#g/alphysCutscene3}* ...噢，这已经被解决了。",
                        '<25>{#p/alphys}{#f/3}* 它一直是这样的吗？'
                    ]
                    : ['<25>{#p/alphys}{#g/alphysInquisitive}* 你改变主意了...？'],
        core9c: () =>
            calm_lizard()
                ? ['<25>{#p/alphys}{#g/alphysCutscene1}* 你做到了！\n* 去下个房间把开关按下吧！']
                : [
                    '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                    SAVE.data.n.state_aerialis_corepath_puzzle < 3
                        ? "<25>{#p/alphys}{#g/alphysSideSad}* 去下个房间把开关按下，\n  然后我们就能离开这里了。"
                        : '<25>{#p/alphys}{#g/alphysSideSad}* 去下个房间把开关按下，\n  就完事了。'
                ],
        core10a: ['<25>{#p/alphys}{#g/alphysCutscene2}* 好，应该可-可以\n  继续前进了。'],
        core10b: [
            '<25>{#p/alphys}{#g/alphysWelp}* 噢，你回来了。',
            '<25>{#g/alphysCutscene2}* 好，应-应该可以\n  继续前进了。'
        ],
        core10c: ['<25>{#p/alphys}{#g/alphysFR}* 真折腾。'],
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
                ? '<32>{#p/human}* （你听到了一阵狂敲键盘的声音。）'
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
        astigmatismMigospelX: ['<32>{#p/story}* 眼行者长老掌控了战局！']
    },

    b_opponent_glyde: {
        name: '* 老滑头',
        epiphaNOPE: ['<11>{#p/basic}{~}{#e/glyde/10}别把\n那玩意\n凑我脸上，\n成不成？'],
        act_check: ['<32>{#p/story}* 老滑头 - 攻击嗯 防御嗯\n* 拒绝提供详细面板数据。'],
        act_secret: () =>
            glade()
                ? SAVE.data.b.w_state_steak && SAVE.data.b.w_state_soda
                    ? ['<32>{#p/human}* （你把亚伦告诉你的密码\n  报给了老滑头.）']
                    : ["<32>{#p/human}* （你想把密码报给老滑头，\n  可你根本不知道什么密码。）"]
                : ['<33>{#p/human}* （你想把密码报给老滑头，\n  可他摇摇头，打断了。）'],
        act_flirt1: ['<32>{#p/human}* （你向老滑头调情。）'],
        act_flirt2: ["<32>{#p/human}* （你向老滑头调情，\n  可他压根不理你。）"],
        act_berate: ['<32>{#p/human}* （你训了老滑头一顿。）\n* （老滑头回以嘲讽。）'],
        fightEnder1: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}...嗯？',
            '<20>{#p/basic}{~}你刚才是不是说\n“三层豪华肌肉男”？',
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            '<20>{#p/basic}{~}{#e/glyde/10}也就是说...',
            "<20>{#p/basic}{~}{#e/glyde/5}在外域买了\n我旗下产品的人\n就是你啊！",
            '<20>{#p/basic}{~}而且...',
            '<20>{#p/basic}{~}过了这么久，\n你还把密码记那么清楚！'
        ],
        fightEnder2: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}...嗯？',
            '<20>{#p/basic}{~}你刚才是不是说\n“三层豪华肌肉男”？',
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            '<20>{#p/basic}{~}{#e/glyde/10}也就是说...',
            '<20>{#p/basic}{~}{#e/glyde/5}你不光买了我的产品...',
            '<20>{#p/basic}{~}{#e/glyde/12}还一直记着密码？？'
        ],
        fightEnder3: [
            "<20>{#p/basic}{~}{#e/glyde/5}哥们我猜你不知道\n我等这些美妙的小词\n有几亿年了。",
            "<20>{#p/basic}{~}{#e/glyde/12}* 除了骂你疯子以外我还有\n  什么好说的！",
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            "<20>{#p/basic}{~}{#e/glyde/10}告诉你吧，\n我要润去烦别的家伙了。\n",
            '<20>{#p/basic}{~}{#e/glyde/5}呀哈哈！\n哥们回头见！'
        ],
        fightItem1: (zero: boolean) => [
            '<20>{#p/basic}{~}哇，嘿，\n这是我想的那玩意吗？',
            "<20>{#p/basic}{~}我好兴奋哦！\n见到一个满意的顾客\n真的感觉超好。",
            ...(zero ? [] : ['<20>{#p/basic}{~}无论如何，\n正如我所说的...'])
        ],
        fightItem2: () => [
            '<20>{#p/basic}{~}{#e/glyde/5}又一个！？',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/12}天呐，“$(moniker2)”，\n你这人酷毙了！'
                : "<20>{#p/basic}{~}{#e/glyde/12}天呐，人类，\n你这人酷毙了！",
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            "<20>{#p/basic}{~}{#e/glyde/10}告诉你吧，\n我要润去烦别的家伙了。\n",
            '<20>{#p/basic}{~}{#e/glyde/5}呀哈哈！\n哥们回头见！'
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
                ? '<20>{#p/basic}{~}{#e/glyde/0}...真是新奇事，\n你可是个典型反派啊。'
                : '<20>{#p/basic}{~}{#e/glyde/0}...我猜你会的。'
        ],
        turn1b: () => [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/7}噢，\n我喜欢你的斗志。',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/10}挺搭你的外号哈。'
                : "<20>{#p/basic}{~}{#e/glyde/10}那会对你\n很有帮助的..."
        ],
        turn1c: ["<20>{#p/basic}{~}{#e/glyde/10}咔哈哈...\n无意冒犯，不过你看\n我俩物种搭吗？"],
        turn1d: ["<20>{#p/basic}{~}{#e/glyde/9}对不起啊，\n不给钱我是不会\n提供面板信息的。"],
        turn1e: [
            "<20>{#p/basic}{~}{#e/glyde/4}几周前，\n我在思考\n关于赚钱的事...",
            '<20>{#p/basic}{~}{#e/glyde/0}然后我注意到\n利润下降了。'
        ],
        turnStatus1: ['<32>{#p/story}* 老滑头看见自己的倒影，\n  心生嫉妒。'],
        turn2: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}我那100%\n绝对合法的生意...',
            '<20>{#p/basic}{~}{#e/glyde/8}被人造谣成\n售卖假冒伪劣产品！',
            '<20>{#p/basic}{~}{#e/glyde/1}我就一直在想\n“这开的什么星际玩笑”。'
        ],
        turnStatus2: ['<32>{#p/story}* 老滑头在想“时髦”\n  这个词的新俚语。'],
        turn3: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}向你担保，我的牛排企业\n在这前哨站可稀罕了。',
            '<20>{#p/basic}{~}有啥比得上那些\n上好的无骨牛排呢！',
            '<20>{#p/basic}{~}听明白没？\n什么都比不上！'
        ],
        turnStatus3: ['<32>{#p/story}* 傲慢之风吹了过来。'],
        turn4: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/0}你说关你啥事？',
            '<20>{#p/basic}{~}{#e/glyde/2}呃...',
            '<20>{#p/basic}{~}{#e/glyde/2}你...',
            "<20>{#p/basic}{~}{#e/glyde/5}你可是我司销售额\n唯一靠得住的救星啊！"
        ],
        turnStatus4: ['<32>{#p/story}* 老滑头做了个花式空翻。'],
        turn5: () => [
            iFancyYourVilliany()
                ? '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}有臭名昭著的\n“$(moniker2)”帮我打广告，\n销售额还用愁吗？\n那时，谁都阻止不了我！'
                : "<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}有镁塔顿的掌上明珠\n帮我打广告，\n销售额还用愁吗？\n那时，谁都阻止不了我！",
            "<20>{#p/basic}{~}{#e/glyde/7}我们的财富多得离谱！\n就算是我爹老话筒\n也难以望其项背啊！"
        ],
        turn5a: ["<20>{#p/alphys}一味攻击人类\n估计没法统一战线哦。"],
        turn5b: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/1}这叫“展现实力”，龅牙仔{#x1}。',
            '<20>{#p/basic}{~}{#e/glyde/9}到底怎么才能赢得\n商业合作伙伴的\n尊重呢？'
        ],
        turn5c: ["<20>{#p/basic}{~}{#e/glyde/10}真是啥都不懂。"],
        turnStatus5: ['<32>{#p/story}* 老滑头在和自己击掌...\n  管它怎么做到的。'],
        turn6a: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}伙计，你现在咋想的？'],
        turn6b: ['<20>{#p/basic}{#p/basic}{~}淦。'],
        turn6c: () => [
            '<20>{#p/basic}{#e/bpants/12}为什么总要我来\n赶走这死家伙？',
            '<20>...',
            '<20>{#e/bpants/0}小家伙，对不住了，\n给你添麻烦了。',
            "<20>{#e/bpants/11}很高兴认识你，\n叫我堡兄就行。",
            ...(ateThreshold() || (world.badder_lizard && world.bad_lizard > 1)
                ? [
                    "<20>{#e/bpants/6}老滑头来这闹事有...",
                    "<20>{#e/bpants/12}...嘿，你不就是那个\n滥杀无辜的毛头小子吗！"
                ]
                : burger()
                    ? [
                        "<20>{#e/bpants/6}老滑头来这闹事有...",
                        "<20>{#e/bpants/12}...嘿，你不就是那个\n把星港居民杀了个干净的\n毛头小子吗！"
                    ]
                    : world.population === 0 && world.bullied
                        ? [
                            "<20>{#e/bpants/6}老滑头来这闹事有...",
                            "<20>{#e/bpants/12}...嘿，你不就是那个\n喜欢揍人的毛头小子吗？"
                        ]
                        : [
                            "<20>{#e/bpants/6}老滑头来这闹事有好久了...",
                            "<20>{#e/bpants/1}那个毛线球最好\n能让他把事情搞搞明白，\n根本就没人想买它的\n垃圾玩意儿！"
                        ])
        ],
        turn6d: [
            '<20>{#p/mettaton}汉堡裤！',
            "<20>太好了，你来啦。",
            "<20>（别担心，一见着你，\n我就中断了直播。）"
        ],
        turn6e: () =>
            ateThreshold()
                ? [
                    "<20>{#p/basic}{#e/bpants/12}你搞清楚\n眼前这是什么人吗？",
                    '<20>{#e/bpants/3}让这家伙上电视，\n你在想些什么啊！？'
                ]
                : ["<20>{#p/basic}{#e/bpants/12}我可不跟你干了，\n少来烦我。"],
        turn6f: () =>
            ateThreshold()
                ? ['<20>{#p/mettaton}哎呀，对不起嘛...', "<20>原来播电视节目\n还犯法啊。"]
                : ['<20>{#p/mettaton}哎呀，对不起嘛...', "<20>我还不知道\n你这么讨厌我呢。"],
        turn6g: [
            '<20>{#p/basic}{#e/bpants/12}...',
            "<20>{|}{#p/basic}{#e/bpants/2}待不下去了\n我要走- {%}"
        ],
        turn6h: [
            "<20>{#p/mettaton}不-过-呢\n咱还有事要办\n要是你不介意的话 {%}",
            '<20>请您见谅\n离开舞台谢谢\n祝您今天愉快。'
        ],
        hurtStatus: ['<32>{#p/story}* 老滑头有危险了。']
    },

    b_opponent_mettaton1: {
        artifact: ['<33>{#p/human}* （看你拿出神器，\n  镁塔顿只是耸了耸肩。）'],
        name: '* 镁塔顿',
        epiphaNOPE: ["<20>{#p/mettaton}这可不行，亲爱的..."],
        old_gun_text: ['<32>{#p/human}* （你开了一枪。）\n* （镁塔顿吸收了这一枪的电能。）'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）\n* （镁塔顿一点没受影响。）'
        ],
        old_spray_text: ['<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）\n* （镁塔顿把糖雾吃掉了。）'],
        old_gun_talk: ['<20>{#p/mettaton}多么惊人的举动。'],
        old_bomb_talk: ["<20>{#p/mettaton}就像是一台免费\n的舞台烟雾机！"],
        old_spray_talk: ['<20>{#p/mettaton}多么刺激。'],
        status1: () =>
            SAVE.data.n.plot < 67
                ? ['<32>{#p/story}* 镁塔顿开始了他的表演！']
                : ['<32>{#p/story}* 镁塔顿闪亮返场！'],
        act_check: () =>
            SAVE.data.n.plot < 67
                ? ['<32>{#p/story}* 镁塔顿 - 攻击30 防御255\n* 他的金属制的身体\n  使他无懈可击。']
                : ['<32>{#p/story}* 镁塔顿 - 攻击30 防御255\n* 没想到，他的金属身体\n  竟然使他无懈可击！'],
        act_flirt: ['<32>{#p/human}* （你向镁塔顿调情。）'],

        yellow1: () =>
            world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
                ? [
                    '<20>{#p/mettaton}你那红色到底\n是怎么回事？{^40}{%}',
                    "<20>{#p/mettaton}{#x1}你应该知道这样\n可不能入场吧...{^40}{%}"
                ]
                : [
                    "<20>{#p/mettaton}哦，亲爱的，\n我看到了什么？\n一抹红色？{^40}{%}",
                    "<20>{#p/mettaton}{#x1}天呐，天呐...\n你那红色\n用的也够久了。{^40}{%}"
                ],
        yellow2: () => [
            world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
                ? '<20>{#p/mettaton}哇！！！\n这下好多了！！！\n现在你可以按[Z]射击！！！{^40}{%}'
                : "<20>{#p/mettaton}魔法，很奇妙吧？？？\n现在你可以按[Z]射击！！！{^40}{%}",
            "<20>{#p/mettaton}（你也可以\n按住[C]来连射，\n但那就没意思了嘛。）{^40}{%}"
        ],

        checkTalk: ["<20>{#p/mettaton}欣赏艾菲斯的\n令人惊叹的技术了？\n我不予置评。"],
        attackTalk: () =>
            SAVE.data.n.plot < 67
                ? ["<20>{#p/mettaton}你这小傻瓜。\n这对我没用，\n亲爱的！"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}听着，亲爱的。\n我今天已经受够了\n疼痛。你不介意吧？"]
                    : ["<20>{#p/mettaton}听着，亲爱的。\n继续攻击对你来说根本\n无济于事。尤其是现在。"],
        flirtTalk: ['<20>{#p/mettaton}哦哦哦...', '<20>见到我很兴奋啊，\n是吧？', "<20>我会记住的，亲爱的~"],

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
                : ['<20>{#p/alphys}哦-哦，好的。'],
        turn1c: ['<20>{*}{#p/mettaton}好多了。{^30}{%}'],
        turn1d: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{*}{#p/alphys}现-现在按[Z]\n来传送。{^30}{%}']
                : world.bad_lizard < 1
                    ? ['<20>{*}{#p/alphys}所以...\n你-你可以四处移动，\n然后按[Z]传送！{^30}{%}']
                    : ['<20>{*}{#p/alphys}四处移动，\n然后按[Z]传送。{^30}{%}'],
        turn1e: ['<20>{*}{#p/mettaton}艾菲斯，艾菲斯，\n艾菲斯...{^30}{%}'],
        turn1f: ['<20>{*}我不是跟你说过\n不要给提示吗？{^30}{%}'],
        turn1g: ['<20>{*}...{^30}{%}', '<20>{*}总之...{^30}{%}', "<20>{*}我们开始表演吧！{^30}{%}"],

        turn2: ["<20>{#p/mettaton}不要错过任何一个\n音符，亲爱的！"],
        turn3: ["<20>{#p/mettaton}我们来玩点\n刺激的吧。"],

        turn4a1: [
            "<20>{#p/mettaton}不得不说，你对待\n这场演出就像一个\n真正的偶像。",
            '<20>但现在，你要和我们\n的特别嘉宾一“鳍”\n登“唱”表演了！'
        ],
        turn4a2: [
            "<20>{#p/mettaton}我得说，到目前\n为止你的表现\n还不是最好的。",
            '<20>也许你需要的\n是一点竞争的\n刺激！'
        ],
        turn4e: ['<20>{#p/mettaton}...', '<20>她在...'],
        turn4f: ["<20>{#p/basic}她死了。"],
        turn4g: ["<20>{#p/mettaton}哦，\n太遗憾了。"],
        turn4h: ['<20>{#p/mettaton}亲爱的观众...\n让我们拿出一点时间\n为害羞塞壬默哀。'],
        turn4i: ['<20>{#p/mettaton}好了，差不多了。'],
        turn4j: () => [
            iFancyYourVilliany() ? '<20>{#p/mettaton}运气不错， $(moniker3u)！' : '<20>{#p/mettaton}运气不错！',
            '<20>我觉得你可以\n跳过这部分了。',
            "<20>我们不能继续唱歌\n真的太遗憾了，\n但是...",
            '<20>上半场结束，\n下半场必须开始。',
            "<20>...来跳舞吧！"
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
                    "<20>{#p/mettaton}...也许害羞塞壬\n今天只是状态不好。",
                    '<20>多么悲剧。',
                    '<20>对了，我有说过\n你的声音越来越\n无聊了吗？'
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
        turn7h: ['<20>{#p/basic}哦，你好呀。\n很高兴见到你！'],
        turn7i: ["<20>{#p/mettaton}...然后？", '<20>{#p/mettaton}不打算再说点什么吗？'],
        turn7j1: ["<20>{#p/basic}镁塔顿，\n我不是什么时候\n都会冲人发火，\n你应该知道吧？"],
        turn7j2: ["<20>{#p/basic}...难道两周前\n你拽着我上台时\n我没说吗？"],
        turn7k: [
            "<20>{#p/mettaton}哦。\n这样挺好的。",
            "<20>{#p/mettaton}但我们没时间\n让你拽那些小情话。"
        ],
        turn7l1: ['<20>{#p/basic}好...', "<20>{#p/basic}（我表亲说话好像\n就这个腔调来着...）"],
        turn7l2: ["<20>我上了。"],
        turn7l3: ["<20>你想看我们打一架，\n那我们就打给你看！"],
        turn7m: ['<20>{#p/mettaton}好，\n那肯定很有趣的。'],
        turn7n: ['<20>{#p/mettaton}呃... 你好？'],
        turn7o1: () => [
            ...(iFancyYourVilliany()
                ? ['<20>{#p/mettaton}...', '<20>看来我们亲爱的\n$(moniker2u)没有舞伴了。']
                : ['<20>{#p/mettaton}...', '<20>看来我们可怜的\n人类没有舞伴了。']),
            '<20>多么不幸...',
            '<20>但是演出必须继续！'
        ],
        turn7o2: [
            '<20>{#p/mettaton}...',
            "<20>你今天一帆风顺啊，\n亲爱的。",
            "<20>没有人对你感兴趣，\n也没人活着来见你。",
            '<20>哦好吧...',
            '<20>演出必须继续！'
        ],

        turn8a1: ['<20>{#p/mettaton}要不遗余力！'],
        turn8a2: ['<20>{#p/mettaton}应付不了这么多的\n棉花，是吗？', '<20>{#p/mettaton}哎呀，太糟糕了！'],

        turn8end1a: [
            "<20>{#p/mettaton}盛名难却啊，\n但这并不失得体。",
            "<20>诚然，\n您的表演无可挑剔。",
            '<20>亲爱的观众朋友们，\n请拿出小本本记好了！',
            '<20>这，就是你\n拿到台面上的东西！'
        ],
        turn8end1b: [
            '<20>{#p/mettaton}也许你没有\n最棒的嗓音，\n但是你的舞蹈...',
            '<20>哦——\n可以说惊为天人！'
        ],
        turn8end2b: () => [
            ...[
                [
                    '<20>{#p/mettaton}有一个“$(moniker1u)”\n的外号，你的表现这样\n令人失望也并不奇怪！\n',
                    '<20>{#p/mettaton}我【曾】希望\n你能有更好的表现...'
                ],
                ['<20>{#p/mettaton}有一个“$(moniker1u)”\n的外号，你的表演\n更应充满【活力】！'],
                ['<20>{#p/mettaton}有一个“$(moniker1u)”\n的外号，\n你一定要风流倜傥！'],
                ['<20>{#p/mettaton}有一个“$(moniker1u)”\n的外号，你的技巧\n更应震撼！'],
                ['<20>{#p/mettaton}“$(moniker1u)”，\n你可不能被别人\n抢了风头啊！']
            ][SAVE.data.n.state_aerialis_moniker],
            "<20>{#p/mettaton}也许你没这个觉悟吧。"
        ],
        turn8end2a: () => [
            ...[
                [
                    "<20>{#p/mettaton}好吧，$(moniker3u)，\n我没想到会这样！",
                    '<20>{#p/mettaton}我【本以为】\n又要失望，\n但是...'
                ],
                ['<20>{#p/mettaton}好吧，\n亲爱的$(moniker1u)...', "<20>我敢肯定，\n你那年轻的皮囊底下\n一定藏着\n一位著名明星！"],
                ['<20>{#p/mettaton}好吧，\n亲爱的$(moniker1u)...', '<20>这场演出值得\n雷鸣般的掌声！'],
                ['<20>{#p/mettaton}好吧，\n亲爱的$(moniker1u)...', '<20>我们的观众\n热情迸发了！'],
                ['<20>{#p/mettaton}好吧，\n亲爱的$(moniker1u)...', "<20>你将这里变成了\n你自己的舞台！"]
            ][SAVE.data.n.state_aerialis_moniker],
            "<20>{#p/mettaton}也许\n你仍有希望。"
        ],
        turn8end3a: [
            "<20>{#p/mettaton}...我真不明白\n你的成绩怎么\n这么糟糕。",
            '<20>明明早些时候\n你表现得\n很不错来着。',
            '<20>哦好吧。\n可能，这也是\n常有的事吧。'
        ],
        turn8end3b: [
            '<20>{#p/mettaton}...没人告诉过你\n你有多菜吗？',
            '<20>搞砸一场声乐表演\n是一回事。',
            '<20>但这个呢...？\n这真的是太悲哀了。'
        ],
        turn8end4: ['<20>{#p/mettaton}唉...\n我们还有一场表演\n需要完成。'],
        turn8end5: ['<20>{#p/mettaton}女士们，先生们...', '<20>掌声有请...'],
        turn8end6: ['<20>举世无双的\n艾菲斯博士！'],

        turn9a: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{|}{#p/mettaton}你将如何应对- {%}']
                : ['<20>{#p/mettaton}你将如何应对，\n这最后的挑战呢？'],
        turn9b: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{#p/alphys}不-不！']
                : world.bad_lizard < 1
                    ? ['<20>{*}{#p/alphys}你-你在开玩笑吗？{^30}{%}']
                    : ['<20>{*}{#p/alphys}{#e/alphys/7}...'],
        turn9bx: ["<20>{#p/alphys}你不能强迫我\n做我不愿做的事。"],
        turn9c: ["<20>{*}{#p/alphys}我不能...{^30}{%}"],
        turn9d: ['<20>{*}{#p/alphys}我...{^30}{%}'],
        turn9e: () =>
            world.bad_lizard < 1
                ? ["<20>{#p/alphys}我-我做不到！"]
                : ["<20>{#p/alphys}{#e/alphys/4}我不确定这是不是\n一个好主意。"],

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
                    "<20>{#p/alphys}{#e/alphys/7}我知道人类做了一些...\n不可饶恕的错误...",
                    '<20>{#p/alphys}{#e/alphys/6}但话说回来，\n想想一些怪物\n对待人类的方式...？',
                    "<20>{#p/alphys}{#e/alphys/8}这样就不奇怪了。",
                    "<20>{#p/alphys}{#e/alphys/4}而且，我...\n有-有点担心我会\n伤到人类..."
                ]
            ][world.bad_lizard]
        ],
        turn9end3: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{#p/mettaton}好吧...', '<20>博士，\n既然你这么说。']
                : ['<20>{#p/mettaton}嗯...', '<20>博士，这想法挺新奇。'],
        turn9end4: ["<20>我可不敢苟同。{#e/alphys/1}"],
        turn9end5: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ["<20>很遗憾观众没能看到\n接下来的发展。{#e/alphys/28}"]
                : [
                    '<20>在我看来，\n一场优质电视剧的核心\n便是冲突与矛盾！{#e/alphys/2}',
                    '<20>又有谁能\n否认这一点呢？'
                ],
        turn9end6: [
            "<20>{#p/mettaton}{#e/alphys/0}行吧，总而言之\n我们的时间\n已经所剩无几了。",
            "<20>所以...\n今天的节目到此结束！",
            '<21>伙计们，下期节目\n正在加急制作中，\n我们不见不散！',
            "<20>你一定不想错过！"
        ],
        turn9end7a: ['<20>{#p/alphys}好吧。'],
        turn9end7b: ["<20>{#p/alphys}认真的？\n你一次都没失误。"],
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
        turn8react1: ["<20>{#p/mettaton}拿下！"],
        turn8reactMD1a: ['<20>{#p/basic}嗯，\n太劲爆了！', '<20>{#p/basic}回头再见啊，人类！'],
        turn8reactMD2a: ['<20>{#p/basic}...', '<20>{#p/basic}别再来了。'],

        turn2react2: ['<20>{#p/mettaton}啊哦...'],
        turn3react2: ['<20>{#p/mettaton}就差一点...'],
        turn4react2: ['<20>{#p/mettaton}真倒霉...'],
        turn5react2: ['<20>{#p/mettaton}真不幸...'],
        turn6react2: ['<20>{#p/mettaton}废物！'],
        turn7react2: ['<20>{#p/mettaton}真令人失望。'],
        turn8react2: ['<20>{#p/mettaton}什-么-鬼。'],
        turn8reactMD1b: ["<20>{#p/basic}希望我下手没太狠。", '<20>{#p/basic}回头再见啊，人类！'],
        turn8reactMD2b: ['<20>{#p/basic}可悲。\n可悲！\n可-悲-！', '<20>{#p/basic}你活该。'],
        missIndicator: '漏击：$(x)',

        idleTalk1: () =>
            world.bad_lizard < 2 && !iFancyYourVilliany()
                ? [
                    "<20>{#p/mettaton}所以我们已然\n走到了最后，\n是吧？",
                    "<20>{#p/mettaton}马上就能摇身一变，\n成为超级巨星，\n感想如何？"
                ]
                : [
                    "<20>{#p/mettaton}所以我们已然\n走到了最后，\n是吧？",
                    "<20>{#p/mettaton}生命快走到头了，\n感想如何？"
                ],
        idleTalk2: () =>
            iFancyYourVilliany()
                ? ['<20>{#p/mettaton}那些被你伤害过的人\n夜晚一定会辗“转”反侧。']
                : world.bad_lizard < 2
                    ? ['<20>{#p/mettaton}“转”过头回望\n你曾做的一切，\n你一定想要改变自己。']
                    : ['<20>{#p/mettaton}要是你走夜路，\n被你杀死的人一定会\n在你“转身”时\n掐住你的脖子。'],
        idleTalk3: ['<20>{#p/mettaton}我们只希望事情\n不会“转”移到\n最坏的方向。'],
        idleTalk4: () =>
            world.bad_lizard < 2
                ? ['<20>{#p/mettaton}我得说，看到你在台上\n“专”心致志地表演\n可真让人兴奋。']
                : ['<20>{#p/mettaton}我得说，这情况一定会\n让人感觉胃里有东西在\n“翻转”并且吃不下饭。'],
        idleTalk5: ["<20>{#p/mettaton}（快让我转身。）"],
        idleTalk6: ['<20>{#p/mettaton}...'],
        flirtTalk1: () =>
            SAVE.data.b.flirt_mettaton
                ? [
                    '<20>{#p/mettaton}回想起你的调情方式，\n呃...？',
                    '<20>{#p/mettaton}你，我的朋友，\n是对社会的一个\n真正的威胁。'
                ]
                : ['<20>{#p/mettaton}哦哦哦...', '<20>...', '<20>也许你现在\n不应该这样做。'],
        flirtTalk2: () =>
            SAVE.data.b.flirt_mettaton
                ? ["<20>{#p/mettaton}你不知道放弃吗？"]
                : ['<20>{#p/mettaton}或者你可以继续。'],
        flirtTalk3: () =>
            SAVE.data.b.flirt_mettaton ? ['<20>{#p/mettaton}我猜确实。'] : ['<20>{#p/mettaton}继续。'],
        flirtTalk4: ["<20>{#p/mettaton}...\n你没更好的事可做吗？"],
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
                    '<18>{#p/mettaton}哦——\n天哪。',
                    '<18>你动了我的开关，\n也就是说...',
                    ...(iFancyYourVilliany()
                        ? [
                            "<18>你不顾一切地想要\n直面我的最终形态。",
                            '<18>多没耐心...',
                            "<18>运气不错，\n我早就想将它\n秀一下了。",
                            "<18>所以，作为感谢，\n我保证会让你\n体面地离开。",
                            "<18>我会让这场\n最终的对峙变得..."
                        ]
                        : [
                            "<18>你迫不及待地想看到\n我新身体的\n首次公演。",
                            '<18>多没耐心...',
                            "<18>运气不错，\n我早就想要\n展示一下了。",
                            "<18>所以，作为感谢，\n我要给你一笔\n丰厚的奖金。",
                            "<18>我会让你在生命\n的最后一刻变得..."
                        ])
                ],
        turnTalk5: () =>
            world.bad_robot
                ? ["<18>{*}...我们下播。"]
                : iFancyYourVilliany()
                    ? ['<18>{#p/mettaton}{*}...精彩绝伦！']
                    : ['<18>{#p/mettaton}{*}...无与伦比的美妙！'],
        act_burn: ['<32>{#p/human}* （你嘲笑镁塔顿在自己的\n  电视节目表现得有多烂。）'],
        burnTalk1: ['<20>{#p/mettaton}就这？'],
        burnTalk2: ['<20>{#p/mettaton}你骂人的技术含量\n不如艾菲斯一根。'],
        burnTalk3: ["<20>{#p/mettaton}无意冒犯，\n但你太拉了。"],
        burnTalk4: ['<20>{#p/mettaton}...\n也许你该干点别的。'],
        burnTalk5: ['<20>{#p/mettaton}...']
    },

    b_opponent_mettaton2: {
        artifact: () => [
            '<33>{#p/human}* （看你拿出神器，\n  镁塔顿只是耸了耸肩。）',
            ...(world.genocide || world.bad_robot ? [] : ['<32>{#p/basic}* 观众也并不在意。'])
        ],
        epiphaNOPE: () =>
            world.genocide || world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/25}你那小把戏对我没用，\n亲爱的。"]
                : iFancyYourVilliany()
                    ? ["<20>{#p/mettaton}{#e/mettaton/19}你应该知道，\n这与你的风格并不搭。"]
                    : ['<20>{#p/mettaton}{#e/mettaton/19}无论何时何地，\n亲爱的...'],
        hint: ["<32>{#p/basic}* 好的，搭档...\n* 现在看你的了。"],
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
                        ? ["<32>{#p/story}* 似乎战斗并不会有什么用。"]
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
                    ? ['<20>{#p/mettaton}幽灵！\n人偶！\n...蜗牛？']
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}浪漫！\n冲突！\n血腥！']
                        : ['<20>{#p/mettaton}复仇！\n惩戒！\n报应！'],
        turnTalk3: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/24}{#a.la/3}{#a.ra/0}别人会轻言放弃，\n但我可不会愿赌服输。"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}情绪颠荡起伏！"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}是时候\n给你点颜色看看了！"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}我就是\n人见人爱的偶像！"]
                            : ["<20>{#p/mettaton}我就是\n未来的宇宙巨星！"],
        turnTalk4: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}只有这样，\n我才能脱颖而出。"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}事情发展成这样，\n实在可惜..."]
                    : iFancyYourVilliany()
                        ? ['<20>{#p/mettaton}$(moniker2)，\n对着镜头，笑一个！']
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}亲爱的，\n对着镜头，笑一个！']
                            : ['<20>{#p/mettaton}大明星，\n对着镜头，笑一个！'],
        turnTalk5: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/9}{#a.ra/10}现在，就让我亲手\n把那腐烂的心肠\n从你身体扯出！"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? [
                        '<20>{#p/mettaton}我该如何选择？\n也许你能帮我。',
                        '<20>{#p/mettaton}准备迎接重要的\n突击测验！'
                    ]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}哦——，\n现在是突击测验时间！", '<20>希望你并非\n“头脑简单”哦！']
                        : !world.badder_lizard
                            ? [
                                "<20>{#p/mettaton}哦——，\n现在是突击测验时间！",
                                '<20>{#p/mettaton}真想知道你的\n选择呢... '
                            ]
                            : [
                                "<20>{#p/mettaton}哦——，\n给你安排了一个\n小测验。",
                                "<20>{#p/mettaton}希望你喜欢选择题哦！\n要不就太糟糕了！"
                            ],
        turnTalk6: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}什么？\n那又冷又硬的东西，\n还配叫“心”？',
                    '<20>{#p/mettaton}{#e/mettaton/30}{#a.la/9}{#a.ra/10}...呵。\n给你瞧瞧，\n什么才是真正的“心”。'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}并不简单，是吗？', '<20>...也许通过心与心的\n交流，能让我们\n知晓答案。']
                    : SAVE.data.n.state_aerialis_mttanswer === 0
                        ? ['<20>{#p/mettaton}多么无趣的\n“回答”...', "<20>{#p/mettaton}但并不会怎么样！"]
                        : iFancyYourVilliany()
                            ? [
                                '<20>{#p/mettaton}所以你比看起来\n还聪明。',
                                '<20>但是一场战斗需要的\n不仅仅是这些\n基础的知识。',
                                '<20>更需要勇气！'
                            ]
                            : !world.badder_lizard
                                ? [
                                    "<20>{#p/mettaton}你的回答让所有人\n都明白你在想啥。",
                                    "<20>{#p/mettaton}为什么不向你展示一下\n我的内心呢？"
                                ]
                                : ['<20>{#p/mettaton}所以你很喜欢\n选择题。', "<20>{#p/mettaton}好吧，\n那你绝对不会\n喜欢这个！"],
        turnTalk7: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}尽情垂死挣扎吧..."]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}我又不是没怀念过\n过去的那些日子。"]
                    : iFancyYourVilliany()
                        ? ['<20>{#p/mettaton}你也许是个恶魔，但你\n能像恶魔一样跳舞吗？']
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}隆重推出...\n双人迪斯科！']
                            : ["<20>{#p/mettaton}战斗才刚刚开始！"],
        turnTalk8: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}迟早，\n你将败在我的手下。']
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}但它也没有\n那么迷人..."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}该发挥你的\n最佳水平了！"]
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}能跟上节奏吗？']
                            : ['<20>{#p/mettaton}音量调到最大！'],
        turnTalk9: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/9}{#a.la/0}{#a.ra/5}那时，\n我族就能重见天日。']
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}管它呢，谁在乎！']
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}灯光！\n镜头！\n爆炸！']
                        : ['<20>{#p/mettaton}毁灭！\n湮灭！\n末日！'],
        turnTalk10: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/7}...而我，就是帮他们\n摆脱桎梏的英雄！"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}谁也不会！"]
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}所有东西\n都炸翻天哦！']
                        : ['<20>{#p/mettaton}所有东西都\n狂热起来！'],
        turnTalk11: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}真是遗憾，我身边的人，\n只要遇到点困难\n全就躲得老远。",
                    '<20>{#e/mettaton/12}{#a.la/8}{#a.ra/8}艾菲斯，艾斯戈尔，\n还有那堆表亲，\n全是一个熊样。'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}让我们花点时间\n思考一下。"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}没有什么比中场休息\n更能平息敌人的\n炮火了！"]
                        : !world.badder_lizard
                            ? ['<21>{#p/mettaton}我们的行业协会\n规定的休息时间到了！']
                            : ["<20>{#p/mettaton}休息？\n一点“修养”都没有，\n还想“休养生息”？"],
        turnTalk12: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}而我呢？\n我可不搞他们\n卿卿我我那一套。",
                    '<20>{#p/mettaton}{#e/mettaton/23}{#a.la/1}{#a.ra/6}而是切中要害\n直入核心！'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? [
                        "<20>{#p/mettaton}我不明白那些幽灵\n为什么要跟我\n对着干...",
                        '<20>{#p/mettaton}...我应该相信\n这是出于关爱吗？'
                    ]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}是时候回到\n这场冲突的核心了！"]
                        : !world.badder_lizard
                            ? [
                                "<20>{#p/mettaton}我们的关系\n变得疏远了，\n亲爱的...",
                                '<20>{#p/mettaton}再来一次心与心\n的交流怎么样？'
                            ]
                            : [
                                "<20>{#p/mettaton}我想你该\n好好的上一课了。",
                                "<20>{#p/mettaton}要将这些\n放在心上哦！"
                            ],
        turnTalk13: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}...切。',
                    "<20>{#e/mettaton/25}{#a.la/8}{#a.ra/8}你还不知道\n自己就是个招人烦的\n烂虫子吗？"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}再... 再者说，\n我现在还能相信\n他们吗？']
                    : SAVE.data.b.a_state_armwrecker
                        ? ['<20>{#p/mettaton}手... 手臂？\n有... 有这么长的腿\n谁还需要手臂啊？']
                        : ["<20>{#p/mettaton}你... 你就学会\n这些吗？"],
        turnTalk14: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}但你知道，\n大家对于你这种虫豸\n是什么态度，对吧？',
                    "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/9}{#a.ra/10}就是一个\n亟待解决的祸患而已。"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}我不-不知道...\n该怎么想了..."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}让我们听...\n听听观众的\n最后一声欢呼吧！"]
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}感... 感谢\n艾菲斯博士帮助我\n的梦想成真！']
                            : ["<20>{#p/mettaton}感... 感谢那些\n为保护我们而牺牲\n生命的人！"],
        turnTalk15: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/10}{#a.ra/0}说实话，\n我挺佩服你这股\n负隅顽抗的劲。",
                    '<20>{#p/mettaton}{#e/mettaton/19}{#a.la/0}{#a.ra/10}不过，\n给你个温馨提示...',
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}你去打力场，\n都比在这对付我\n来得实在。"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}难道他们的道歉\n是真... 真心的吗？"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}我不能现在就放...\n放弃！"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}现在轮到我来\n成... 成全你了！"]
                            : ["<20>{#p/mettaton}我保证会让你的努力\n不... 不会白费！"],
        turnTalk16: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/0}怎么了？\n听我说话耳根子难受？",
                    '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...哼。\n真可惜啊，亲！'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}或者这只...\n只是为了出名？']
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}毕竟我们一同\n经... 经历了这么多！"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}我不会拥... \n拥有其他选择！"]
                            : ["<20>{#p/mettaton}这是我最起...\n起码可以做的！"],
        turnTalk17: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...']
                : ['<20>{#p/mettaton}{#e/mettaton/12}哈... 啊哈...\n哈... 啊哈...'],
        turnTalk18: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/14}{#a.la/3}{#a.ra/0}果然。\n有的人就是不知悔改...',
                    "<20>{#e/mettaton/13}{#a.la/8}{#a.ra/8}不过\n我也懒得跟你废话了。",
                    "<20>{#e/mettaton/7}{#a.la/9}{#a.ra/10}从现在开始，\n我会用心干掉你！"
                ]
                : ['<20>{#p/mettaton}{#e/mettaton/13}必须... 把节目...\n...演下去！'],
        audienceRec0: () =>
            SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/11}（哎...）',
                    '<20>{#e/mettaton/29}好吧...',
                    '<20>{#e/mettaton/10}你看那个。',
                    "<20>{#e/mettaton/20}我从来没有\n这么多的观众...",
                    "<20>{#e/mettaton/17}到目前为止，\n我们已经达到了\n观众来电的里程碑。",
                    '<20>{#e/mettaton/14}...',
                    "<20>{#e/mettaton/15}让我们看看观众们\n有什么话\n想对我们说...",
                    '<20>{#e/mettaton/12}...在结束我们的\n传奇之旅之前。'
                ]
                : [
                    '<20>{#p/mettaton}{#e/mettaton/8}哦—，\n看看这些收视率...',
                    "<20>{#e/mettaton/5}我从来没拥有过\n这么多的观众！",
                    "<20>{#e/mettaton/7}到目前为止，\n我们已经达到了\n观众来电的里程碑。",
                    "<20>{#e/mettaton/15}让我们看看观众们\n有什么话\n想对我们说...",
                    iFancyYourVilliany()
                        ? '<20>{#e/mettaton/19}...在真正停战之前！'
                        : '<20>{#e/mettaton/19}...在结束我们的\n传奇之旅之前！'
                ],
        turnTalkX0a: () =>
            SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/15}不...\n不...',
                    '<20>{#p/mettaton}{#e/mettaton/14}我不能...',
                    '<20>{#p/mettaton}{#e/mettaton/9}...',
                    "<20>{#p/mettaton}{#e/mettaton/9}小幽，\n要是你还在...",
                    "<20>{#p/mettaton}{#e/mettaton/10}别自责，别伤心，\n好吗？",
                    "<20>{#p/mettaton}{#e/mettaton/9}是我，\n一直逼迫你，欺负你。",
                    "<20>{#p/mettaton}{#e/mettaton/19}是我，\n故意疏远你，\n把你当空气。",
                    '<20>{#p/mettaton}{#e/mettaton/17}不管过去发生了什么...\n不管家庭出了多大的\n变故...',
                    '<20>{#p/mettaton}{#e/mettaton/10}你，还有匿罗\n永远都是我的亲人！',
                    
                    "<20>{#p/mettaton}{#e/mettaton/15}所以...\n请把这一切，\n把那些话都忘掉吧。",
                    "<20>{#p/mettaton}{#e/mettaton/9}别把那些气话\n放在心上，",
                    '<20>{#p/mettaton}{#e/mettaton/10}只希望你能记住...'
                ]
                : iFancyYourVilliany()
                    ? [
                        '<20>{#p/mettaton}{#e/mettaton/14}...',
                        "<20>{#p/mettaton}{#e/mettaton/15}原来，这场演出\n竟是这样谢幕的。",
                        '<20>{#p/mettaton}{#e/mettaton/19}...呵...\n我懂了...',
                        '<20>{#p/mettaton}{#e/mettaton/20}我终于懂了。',
                        '<20>{#p/mettaton}{#e/mettaton/10}整场节目...\n其实只是一场戏。',
                        "<20>{#p/mettaton}{#e/mettaton/10}我们假装是敌人，\n假装打一架。",
                        '<20>{#p/mettaton}{#e/mettaton/11}这样的题材，\n观众爱看。',
                        '<20>{#p/mettaton}{#e/mettaton/19}可是...',
                        '<20>{#p/mettaton}{#e/mettaton/17}你入戏太深。',
                        '<20>{#p/mettaton}{#e/mettaton/17}把这场“戏”\n当真了。',
                        '<20>{#p/mettaton}{#e/mettaton/10}最终...',
                        '<20>{#p/mettaton}{#e/mettaton/9}你出色地完成了\n自己的使命，\n打败了我。',
                        '<20>{#p/mettaton}{#e/mettaton/19}...',
                        '<20>{#p/mettaton}{#e/mettaton/14}所以，\n亲爱的“$(moniker2)”。',
                        "<20>{#p/mettaton}{#e/mettaton/12}我作为败者，\n也该有败者的样子。"
                    ]
                    : !world.badder_lizard
                        ? [
                            '<20>{#p/mettaton}{#e/mettaton/9}...',
                            '<20>{#p/mettaton}{#e/mettaton/10}哈啊...',
                            '<20>{#p/mettaton}{#e/mettaton/17}亲...\n你肯定知道把我的HP\n打到0...',
                            "<20>{#p/mettaton}{#e/mettaton/17}...会发生什么吧？",
                            '<20>{#p/mettaton}{#e/mettaton/18}...',
                            '<20>{#p/mettaton}{#e/mettaton/9}临死前...',
                            '<20>{#p/mettaton}{#e/mettaton/10}希望你知道...',
                            "<20>{#p/mettaton}{#e/mettaton/17}...很多人当过我的搭档，\n但你是最棒的。",
                            '<20>{#p/mettaton}{#e/mettaton/19}因为有你，\n观众来到这里...',
                            '<20>{#p/mettaton}{#e/mettaton/19}他们注视着我们...',
                            "<20>{#p/mettaton}{#e/mettaton/17}为我们喝彩...",
                            '<20>{#p/mettaton}{#e/mettaton/10}一同见证着\n你的故事。',
                            '<20>{#p/mettaton}{#e/mettaton/9}所以...',
                            "<20>{#p/mettaton}{#e/mettaton/13}不要自卑，\n不要轻视自己，\n好吗，亲？",
                            "<20>{#p/mettaton}{#e/mettaton/14}不用担心我。",
                            '<20>{#p/mettaton}{#e/mettaton/12}即使我\n不能活得精彩...'
                        ]
                        : [
                            '<20>{#p/mettaton}{#e/mettaton/14}...',
                            '<20>{#p/mettaton}{#e/mettaton/14}...你...',
                            "<20>{#p/mettaton}{#e/mettaton/12}早该料到\n你会背叛我。",
                            '<20>{#p/mettaton}{#e/mettaton/15}...',
                            '<20>{#p/mettaton}{#e/mettaton/15}我给了你机会。',
                            ...(SAVE.data.n.bad_lizard < 2
                                ? [
                                    '<20>{#p/mettaton}{#e/mettaton/14}我告诉自己，\n内心深处，\n你还是个好人。',
                                    '<20>{#p/mettaton}{#e/mettaton/19}结果呢？',
                                    "<20>{#p/mettaton}{#e/mettaton/22}你已经陷得太深，\n救不回来了。"
                                ]
                                : [
                                    "<20>{#p/mettaton}{#e/mettaton/14}我给了你机会，\n相信你能浪子回头。",
                                    '<20>{#p/mettaton}{#e/mettaton/19}结果呢？',
                                    '<20>{#p/mettaton}{#e/mettaton/22}你烂到了骨子里，\n根本就无可救药。'
                                ]),
                            '<20>{#p/mettaton}{#e/mettaton/30}...真卑鄙。',
                            '<20>{#p/mettaton}{#e/mettaton/30}是我的错...',
                            '<20>{#p/mettaton}{#e/mettaton/20}要是我当时\n心狠一点...',
                            "<20>{#p/mettaton}{#e/mettaton/23}就能送你下地狱，\n让你遭遭报应。",
                            '<20>{#p/mettaton}{#e/mettaton/30}...',
                            "<20>{#p/mettaton}{#e/mettaton/30}唉，算了。",
                            '<20>{#p/mettaton}{#e/mettaton/24}也算\n吃一堑，长一智。',
                            '<20>{#p/mettaton}{#e/mettaton/30}反正...'
                        ],
        turnTalkX0b: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['<20>{*}{#p/mettaton}{#e/mettaton/31}...我没生你的气！{^20}{%}']
                : iFancyYourVilliany()
                    ? ["<20>{*}{#p/mettaton}{#e/mettaton/30}...就用这声巨响\n为我们的演出\n画上句号。{^20}{%}"]
                    : !world.badder_lizard
                        ? ['<20>{*}{#p/mettaton}{#e/mettaton/30}...至少，\n我能死得灿烂。{^20}{%}']
                        : ["<20>{*}{#p/mettaton}{#e/mettaton/27}...你就算躲得了初一，\n也躲不过十五。{^20}{%}"],
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
            '<21>{#e/mettaton/9}{~}哦........',
            '<21>{~}嗨...\n镁塔顿...',
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    "<21>{#e/mettaton/18}{~}我知道自从那次见面后，\n情况就变得很奇怪...\n但是...",
                    '<21>{~}看到了真正的你，\n在做你真正想做的事...',
                    '<21>{#e/mettaton/10}{~}让我喜极而泣...',
                    "<21>{#e/mettaton/9}{~}我说不准，但是...\n我想这是最后\n一期了...？",
                    "<21>{#e/mettaton/11}{~}我会想你的...\n表亲......"
                ]
                : [
                    ...(iFancyYourVilliany()
                        ? [
                            '<21>{#e/mettaton/18}{~}我真的很喜欢看\n你那较量...',
                            ...(SAVE.data.n.kills < 10
                                ? [
                                    "<21>{~}尽管我平常对这事\n不感兴趣...\n但是...",
                                    '<21>{#e/mettaton/10}{~}因为这关乎于你...\n所以我也能受到共鸣。'
                                ]
                                : [
                                    '<21>{~}虽然最近有很多人都\n失踪了...\n但是...',
                                    '<21>{#e/mettaton/10}{~}看到你战斗到底的样子\n让我觉得好多了'
                                ])
                        ]
                        : [
                            '<21>{#e/mettaton/18}{~}我真的喜欢看\n你的节目...',
                            ...(SAVE.data.n.kills < 10
                                ? [
                                    '<21>{~}我的生活很无聊...\n但是...',
                                    '<21>{#e/mettaton/10}{~}看到你\n在节目上的表演...\n这间接地照亮了\n我的生活...'
                                ]
                                : [
                                    '<21>{~}虽然最近有很多人都\n失踪了...\n但是...',
                                    '<21>{#e/mettaton/10}{~}看到你还在电视上\n让我觉得好多了'
                                ])
                        ]),
                    "<21>{#e/mettaton/9}{~}我说不准，但是...\n我想这是最后\n一期了...？",
                    "<21>{#e/mettaton/11}{~}我会想你的...\n镁塔顿......"
                ])
        ],
        audienceRec2: [
            '<20>{#p/mettaton}{#e/mettaton/19}不，等一下！\n等等，小...',
            '<20>{#e/mettaton/9}已... 已经挂了。',
            '<20>{#e/mettaton/19}...',
            "<20>{#e/mettaton/20}我要接其他来电！！！"
        ],
        audienceRec3a: () =>
            iFancyYourVilliany()
                ? ['<21>{#p/basic}镁塔顿，\n你是我们的骄傲！']
                : ['<21>{#p/basic}镁塔顿，\n你的节目制造了\n很多欢乐！'],
        audienceRec3b: () =>
            iFancyYourVilliany()
                ? ["<21>{#p/basic}镁塔顿，没了你，\n还有谁能和恶棍战斗？"]
                : ["<21>{#p/basic}镁塔顿，没有你\n我都不知道看什么！"],
        audienceRec3c: () =>
            iFancyYourVilliany()
                ? ["<21>{#e/mettaton/10}{#p/basic}你是前哨站\n最伟大的闪耀之星！"]
                : ["<21>{#e/mettaton/10}{#p/basic}我的镁塔顿形状的\n心脏上空缺了一个\n镁塔顿形状的洞！"],
        audienceRec4: () => [
            '<20>{#p/mettaton}啊... 我知道了。',
            '<20>{#e/mettaton/9}...',
            '<20>{#e/mettaton/19}大家...\n我真的感谢你们\n所有的观众。',
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#e/mettaton/20}还有小幽...',
                    "<20>{#e/mettaton/20}我从没想过我会原谅你\n还有其他人，但是...",
                    '<20>{#e/mettaton/9}那个农场是\n你最热衷的事业，\n对吧？',
                    '<20>{#e/mettaton/9}在思考了几次后...\n我想我明白了。',
                    '<20>{#e/mettaton/19}你只是想让我们\n同舟并济，共创未来...',
                    '<20>{#e/mettaton/19}你，匿罗... \n还有你们所有人...',
                    '<20>{#e/mettaton/20}你们都只是\n想让我们幸福快乐。',
                    '<20>{#e/mettaton/20}...嘿。',
                    '<20>{#e/mettaton/9}至于我的节目...',
                    '<20>{#e/mettaton/10}我想我该\n休息一段时间。'
                ]
                : ['<20>{#e/mettaton/20}但你们误解了...', "<20>{#e/mettaton/10}我... \n永远都不会离开。"]),
            '<20>...',
            "<20>{#e/mettaton/20}我想这是\n最好的结果了。",
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    "<20>{#e/mettaton/15}我离开家人们太久了...",
                    "<20>{#e/mettaton/14}是时候告诉它们\n这些年发生过的事了。",
                    '<20>{#e/mettaton/19}总而言之...'
                ]
                : [
                    "<20>{#e/mettaton/15}实际上，\n这种形态的能耗...",
                    '<20>{#e/mettaton/14}十分低效。',
                    "<20>{#e/mettaton/19}再过一会，\n我的能源将会耗尽..."
                ]),
            '<20>{#e/mettaton/10}嗯。',
            "<20>我会没事的。",
            iFancyYourVilliany()
                ? '<20>{#e/mettaton/9}后会有期，$(moniker2)。'
                : '<20>{#e/mettaton/9}一路顺风，亲爱的。',
            '<20>{#e/mettaton/19}还有各位...\n谢谢你们。',
            "<20>{#e/mettaton/20}你们是伟大的观众！"
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
                ? ['我原谅你', '才不原谅', '抱抱就好啦！', '放下过去吧。']
                : !world.badder_lizard
                    ? ['没问题', '必须的', '那当然！', '现在就\n亲一个']
                    : ['我会', '我当然会', '我肯定会', '我必须会'],
        q0: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}时间到。{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}时间到了，亲爱的。\n我就当你同意了哦~{^40}{%}"]
                    : ["<20>{#p/mettaton}时间到了，亲爱的。\n我就当你同意了...{^40}{%}"],
        q1: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['<20>{#p/mettaton}开门见山啊，\n我知道了。{^40}{%}']
                : !world.badder_lizard
                    ? ['<20>{#p/mettaton}这回答太棒了！\n我爱它！！！{^40}{%}']
                    : ["<20>{#p/mettaton}期待你的尝试！{^40}{%}"],
        q2: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}...但我不能\n一直逃避下去。{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}这就是你\n回答问题的方式！{^40}{%}"]
                    : ['<20>{#p/mettaton}你只是缺乏勇气，\n对吧？{^40}{%}'],
        q3: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}哇，\n我不会走那么远。{^40}{%}"]
                : !world.badder_lizard
                    ? ['<20>{#p/mettaton}我喜欢你的看法！{^40}{%}']
                    : ['<20>{#p/mettaton}真相多\n令人振奋啊！{^40}{%}'],
        q4: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}嗯，\n这就是信心...{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}哦——，\n你是认真的。{^40}{%}"]
                    : ["<20>{#p/mettaton}不要欺骗自己，\n亲爱的...{^40}{%}"],
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
        assistTalk2: ['<20>{#p/basic}{~}思界怀存，梦忆隐世！', '<20>{#p/basic}{~}你知道这魔咒！'],
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
            !world.badder_lizard ? ["<32>{#p/alphys}* 这位是谜宇人。"] : ['<32>{#p/story}* 谜宇人跳着不可思议的舞蹈。'],
        idleStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 这位是谜宇人。"]
                : ['<32>{#p/story}* 谜宇人气势汹汹地卖弄着它的魔球。'],
        idleStatus3: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 这位是谜宇人。"]
                : ['<32>{#p/story}* 谜宇人嘀咕着艰深晦涩的脏话。'],
        idleStatus4: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 这位是谜宇人。"]
                : ['<32>{#p/story}* 谜宇人以火眼金睛凝视着你。'],
        idleStatus5: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 这位是谜宇人。"] : ['<32>{#p/story}* ...魔法的味道扑面而来。'],
        idleTalk1: ['<20>{#p/basic}{~}苏依巴嘎巴盖。'],
        idleTalk2: ['<20>{#p/basic}{~}陶泥拉！！'],
        idleTalk3: ['<20>{#p/basic}{~}色古野。'],
        idleTalk4: ['<20>{#p/basic}{~}格日热。'],
        idleTalk5: ['<21>{#p/basic}{~}恩情与福报。'],
        danceText1: ['<32>{#p/human}* （你选择跳舞。）', "<32>{#p/basic}* 谜宇人的牵引魔球\n  离你越来越近..."],
        danceTalk1: ['<20>{#p/basic}{~}希么巴日阿希苏木！！'],
        danceStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 那个魔球停息了...']
                : ["<32>{#p/story}* 谜宇人的牵引魔球\n  弱化了它的引力。"],
        danceText2: () => [
            '<32>{#p/human}* （你选择跳舞。）',
            "<32>{#p/basic}* 谜宇人的惊雷魔球开始充能...",
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* 对，就是这样！\n* 你-你快要成功了！"] : [])
        ],
        danceTalk2: ['<20>{#p/basic}{~}萨日朗！'],
        danceTalk3: ["<20>{#p/basic}{~}我受够了！！！"],
        danceStatus2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 太好了！！！\n* 魔球都耗尽能量了！']
                : ["<32>{#p/story}* 谜宇人的惊雷魔球\n  穷尽了它的能量。"],
        danceText3: ['<32>{#p/human}* （你选择跳舞。）\n* （无事发生。）'],
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
        playdeadText2: ['<32>{#p/human}* （你选择装死。）\n* （无事发生。）'],
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
            '<32>{#p/human}* （你选择调情。）\n* （无事发生。）',
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
                ? ["<32>{#p/alphys}* 这位是特雷莉亚。"]
                : ['<32>{#p/story}* 特雷莉亚紧紧握着她的法杖。'],
        idleStatus2: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 这位是特雷莉亚。"] : ['<32>{#p/story}* 特雷莉亚深吸了一口气。'],
        idleStatus3: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 这位是特雷莉亚。"] : ['<32>{#p/story}* 特雷莉亚静静地看着你。'],
        idleStatus4: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 这位是特雷莉亚。"]
                : ["<32>{#p/story}* 特雷莉亚的盔甲\n  发出了微弱的黄光。"],
        idleStatus5: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 这位是特雷莉亚。"]
                : ['<32>{#p/story}* 被忘却之遗物的味道\n  扑面而来。'],
        idleTalk1: ['<20>{#p/basic}{~}骑程好梦。'],
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
                : ["<32>{#p/story}* 特雷莉亚内心动摇了。"],
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
        comfortText3: ['<32>{#p/human}* （你安抚了特雷莉亚。）\n* （无事发生。）'],
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
            '<32>{#p/human}* （你把手机调亮，\n  朝特雷莉亚闪了过去。）',
            '<32>{#p/basic}* 特雷莉亚惊慌失措！',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 你干了什么！？'] : [])
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
            '<32>{#p/human}* （你把手机调亮，\n  朝特雷莉亚闪了过去。）\n* （可她在畅想与你的时光，没注意到。）'
        ],
        flashText2b: ['<32>{#p/human}* （你把手机调亮，\n  朝特雷莉亚闪了过去。）\n* （可她十分放松，没注意到。）'],
        flashText2c: ['<32>{#p/human}* （你把手机调亮，\n  朝特雷莉亚闪了过去。）\n* （无事发生。）'],
        flirtText0: () => [
            '<32>{#p/human}* （你向特雷莉亚调情。）\n* （没什么效果。）',
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
                ? ['<32>{#p/alphys}* 好-好啊。\n* 这... 了不得。']
                : ['<32>{#p/story}* 特雷莉亚情意绵绵。'],
        flirtText3: () => [
            '<32>{#p/human}* （你选择调情。）\n* （无事发生。）',
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
                        '<08>{#p/basic}{~}我可不能\n一头扎进\n深渊...'
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
                : ['<32>{#p/story}* 战场上弥漫着萤参的芬芳。'],
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
            world.meanie ? ['<08>{#p/basic}{~}(深吸了\n 一口气)\n咕呱。'] : ['<08>{#p/basic}{~}（脸涨得\n通红）\n咕呱。'],
        act_translate1: () => [
            '<32>{#p/human}* （还没有什么话\n  需要你来翻译。）',
            ...(!world.badder_lizard
                ? ['<32>{#p/alphys}* 也许你应该...\n  先等它说点什么？']
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
                ? ['<08>{#p/basic}{~}（你总能\n保持\n进步。）']
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
        act_mystify: ['<32>{#p/human}* （你装神弄鬼，故弄玄虚，\n  但终极蛙吉特没被你骗住。）'],
        act_threaten: ['<32>{#p/human}* （你装腔作势，威胁终极蛙吉特，\n  但它没被你唬住。）'],
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
            
            ['<08>{#p/basic}{~}终于\n解放了...', '<08>{#p/basic}{~}我还怕\n我永远\n逃不掉了\n呢。'],
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
                            ['<08>{#p/basic}{~}能不能..', "<08>{#p/basic}{~}别-别\n松手.."],
            
            ["<08>{#p/basic}{~}我明白，\n我不配\n守卫核心..", "<08>{#p/basic}{~}对不起..."],
            
            ["<08>{#p/basic}{~}这是\n给你的\n钱..", '<08>{#p/basic}{~}请..\n饶恕我..']
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
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 你这是在干什么...？'] : [])
        ],
        act_poke2: () => [
            '<32>{#p/human}* （你戳了戳飘游䗁士\n  以让它失去平衡。）',
            '<32>{#p/basic}* 飘游䗁士掉了下去并逃之夭夭！',
            ...(!world.badder_lizard && calm_lizard()
                ? ["<32>{#p/alphys}* 我会当没看见的。"]
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
        idleTalk4: ['<08>{#p/basic}{~}未来取决\n于此...'],
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
        name: '* 眼行者长老',
        epiphany: [
            
            ['<08>{#p/basic}{~}眼不见，\n心不念。'],
            () =>
                world.meanie
                    ? 
                    [
                        '<08>{#p/basic}{~}你小子\n比我还坏！',
                        "<08>{#p/basic}{~}我还是\n适可而止\n为好。"
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}你的眼睛\n真漂亮啊..', "<08>{#p/basic}{~}可别跟\n族人们说！"]
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}友谊..', '<08>{#p/basic}{~}真是令我\n大开眼界！']
                            : 
                            ["<08>{#p/basic}{~}别太用力，\n好吗？"],
            
            ['<08>{#p/basic}{~}身为领袖，\n我要\n光荣赴死。'],
            
            ["<08>{#p/basic}{~}切..\n给你！", '<08>{#p/basic}{~}不用还了。']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<32>{#p/basic}* 眼行者长老被击倒了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
            '<32>{#p/basic}* 眼行者长老被击倒了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
            '<32>{#p/basic}* 眼行者长老被击倒了！'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* 眼行者长老...？\n* 大概是眼行者一族的领袖吧。"]
                        : ["<32>{#p/alphys}* 这只是眼行者长老而已。"]
                    : ["<33>{#p/story}* 眼行者长老 - 攻击32 防御26\n* 这个怪物比看起来还要难应付。"],
        act_check2: [
            '<33>{#p/story}* 眼行者长老 - 攻击32 防御26\n* 很满意你对家族传统的遵循。'
        ],
        act_check3: ['<32>{#p/story}* 眼行者长老 - 攻击32 防御26\n* 觉得你现在很“顺眼”。'],
        act_check4: [
            '<32>{#p/story}* 眼行者长老 - 攻击32 防御26\n* 对这个怪物而言，\n  传统总是比安全更重要。'
        ],
        act_stare: ['<32>{#p/human}* （你紧盯着眼行者长老。）'],
        act_smile: ['<32>{#p/human}* （你对着眼行者长老微笑。）'],
        act_flirt: () => [
            '<32>{#p/human}* （你对着眼行者长老眨眼。）',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 噢，得了吧。'] : [])
        ],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* 眼行者长老正凝视着你的灵魂。'],
        status2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* 眼行者长老露出了\n  凶狠的笑容。'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ["<32>{#p/story}* 眼行者长老可不是省油的灯。"],
        status4: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* 眼行者长老想到了\n  他们家族的荣誉。"],
        status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 漱口水的味道扑面而来。']),
        perilStatus: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* 呃...'] : ['<32>{#p/story}* 眼行者长老在流泪。'],
        idleTalk1: ['<08>{#p/basic}{~}放马过来！'],
        idleTalk2: ['<08>{#p/basic}{~}让我\n见识一下\n你的怒火！'],
        idleTalk3: ["<08>{#p/basic}{~}不要\n打退堂鼓！"],
        idleTalk4: ['<08>{#p/basic}{~}让我看看你\n的容貌！'],
        idleTalk5: ['<08>{#p/basic}{~}你有\n啥实力？'],
        flirtTalk: ["<08>{#p/basic}{~}哈。\n想得美。\n我已经\n有伴了！"],
        partialTalk1: ["<08>{#p/basic}{~}已经成功\n一半了.."],
        partialTalk2: ["<08>{#p/basic}{~}就差\n一点了.."],
        partialTalk3: ["<08>{#p/basic}{~}快要\n成功了.."],
        partialStatus1: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 你现在得干点别的。']
                    : ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* 眼行者长老还没看够。'],
        partialStatus2: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 看到你微笑地盯着他们，\n  眼行者家族很高兴。']
                    : ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* 眼行者长老想要看穿全局。'],
        partialStatus3: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 干-干点别的吧！']
                    : ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* 眼行者长老希望你能\n  听从它的指示。"],
        fullStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 现在，眼行者长老\n  看起来很满意...']
                    : ['<32>{#p/alphys}* 它现在看起来很满意...']
                : ['<32>{#p/story}* 眼行者长老很高兴。'],
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
                    ['<08>{#p/basic}{~}我就不该\n找你麻烦。']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}你这人\n真怪。', '<08>{#p/basic}{~}但我喜欢。']
                        : SAVE.data.b.oops
                            ? 
                            ["<08>{#p/basic}{~}好啊。\n多一个\n朋友...", "<08>{#p/basic}{~}总比\n多一个\n敌人好。"]
                            : 
                            ['<08>{#p/basic}{~}嗯..', "<08>{#p/basic}{~}想抱的话\n你就抱吧。"],
            
            ["<08>{#p/basic}{~}是时候...", '<08>{#p/basic}{~}...面对\n死亡了。'],
            
            ["<08>{#p/basic}{~}你花钱\n比我精明，\n所以...", '<08>{#p/basic}{~}这钱，\n你拿着吧。']
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
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 闻起来像休息区。'],
        groupTalk1: ['<08>{#p/basic}给我\n让开。'],
        groupTalk2: ['<08>{#p/basic}你们\n这些人\n真慢。'],
        groupTalk3: ["<08>{#p/basic}我不\n参与。"],
        groupTalk4: ['<08>{#p/basic}可别\n聚在一块。'],
        groupTalk5: ['<08>{#p/basic}危险是\n留给\n傻瓜的。'],
        groupTalk6: ['<08>{#p/basic}能不能\n走开。'],
        name: '* 默之蟑',
        soloStatus: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 看来它一开始就不想这么做。']
                : ["<32>{#p/story}* 默之蟑不需要任何人\n  在它身边。"],
        soloTalk1: ["<08>{#p/basic}{~}我将过得\n很好。"],
        soloTalk2: ['<08>{#p/basic}{~}搭档\n什么的..\n就是\n靠不住。'],
        soloTalk3: ['<08>{#p/basic}{~}终于可以\n独处了。'],
        soloTalk4: ['<08>{#p/basic}{~}恰，\n恰。'],
        soloTalk5: ['<08>{#p/basic}{~}在宁静中\n舞蹈。'],
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
                        ["<08>{#p/basic}{~}情场\n战场，\n不择\n手段。"]
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}从今往后，\n我们就是\n盟友了！']
                            : 
                            ['<08>{#p/basic}{~}拥抱真是\n和平的\n关键！'],
            
            ['<08>{#p/basic}{~}为这\n无尽冲突\n划上句号！'],
            
            ['<08>{#p/basic}{~}战利品\n归你了！']
        ],
        old_gun_text: ['<32>{#p/human}* （你开了一枪。）', '<33>{#p/basic}* 蘑炮手可算是碰上对手了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸弹。）\n* （云雾缭绕。）',
            '<32>{#p/basic}* 蘑炮手投降了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你喷洒了糖雾。）\n* （好甜...）',
            '<32>{#p/basic}* 蘑炮手被削弱了！'
        ],
        idleTalk1: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}你的\n恐怖统治\n结束了！']
                : ['<08>{#p/basic}{~}来和我\n一起\n上前线。'],
        idleTalk2: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}等着被\n处决吧！']
                : ["<08>{#p/basic}{~}情场\n...核心，\n不择\n手段。"],
        idleTalk3: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}论火力，\n我为\n第一！']
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
                : ["<32>{#p/story}* 蘑炮手，祈祷与齐扫专家。"],
        travelStatus2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手紧张不安。'],
        travelStatus3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 蘑炮手急速扫视着四周。'],
        act_check: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* 蘑炮手，火枪手。\n* 远方蘑菇的脏表亲...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* 蘑炮手。\n* 我不知道这是谁。']
                        : ["<32>{#p/alphys}* 这只是蘑炮手罢了。"]
                    : ['<32>{#p/story}* 蘑炮手 - 攻击30 防御28\n* 拥有特殊的成长经历。\n* 火枪手。'],
        act_check2: ['<32>{#p/story}* 蘑炮手 - 攻击30 防御28\n* 正在反思自己的成长经历。\n* 半吊子火枪手。'],
        act_check3: ['<32>{#p/story}* 蘑炮手 - 攻击30 防御28\n* 忘记了自己的成长经历。\n* 心暖花开。'],
        act_check4: ['<32>{#p/story}* 蘑炮手 - 攻击30 防御28\n* 蘑菇的字典里，\n  从来没有“退缩”二字。'],
        act_flirt: () => [
            '<32>{#p/human}* （你邀请蘑炮手来参加\n  一场私下的枪战。）',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 别吧。'] : [])
        ],
        flirtTalk: ["<08>{#p/basic}{~}嘿！\n我们这\n没这说法。"],
        flirtTalk2: ["<08>{#p/basic}{~}好吧..\n如果你\n为此\n感兴趣.."],
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
            '<32>{#p/human}* （可是，你都快贴上蘑炮手了。）',
            ...(world.genocide
                ? ['<32>{#p/asriel2}* 我有点担心了。']
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
                '<32>{#p/human}* （你试图缴蘑炮手的械，\n  但蘑炮手将你\n  打回了原点。）',
                "<32>{#p/asriel2}* 我们在浪费时间。"
            ],
            [
                '<32>{#p/human}* （你试图缴蘑炮手的械，\n  但蘑炮手将你\n  打回了原点。）',
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
            ['<08>{#p/basic}{~}请不要担心\n我的朋友', "<08>{#p/basic}{~}我现在就走\n开个好头。"],
            () =>
                world.meanie
                    ? [
                        "<08>{#p/basic}{~}你的态度可\n真是让我\n惊呆",
                        '<08>{#p/basic}{~}逃离是再\n合理不过的\n安排！'
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}请不要再\n推推搡搡', "<08>{#p/basic}{~}你我情海\n早已荡漾！"]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}我发誓永远\n做你伙伴', '<08>{#p/basic}{~}天打雷劈\n也绝不反叛！']
                            : [
                                '<08>{#p/basic}{~}这感觉可\n真是惊人',
                                '<08>{#p/basic}{~}你的存在\n绕我心门。'
                            ],
            ["<08>{#p/basic}{~}就像我\n告诉过我妈", '<08>{#p/basic}{~}这一天迟早\n会到达。'],
            ['<08>{#p/basic}{~}只有一场\n列车灾祸', "<08>{#p/basic}{~}你的薪水\n再没着落！"]
        ],
        genoStatus: ['<32>{#p/asriel2}* 烈焰热线。'],
        genoSpareStatus: ["<32>{#p/asriel2}* 不堪一击。"],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 烈焰热线，说唱呆子。\n* 脑子这么活络，\n  却把才华浪费在这种小儿科上。']
                : ['<32>{#p/story}* 烈焰热线 - 攻击29 防御14\n* 这种怪物很狡猾，\n  任何计划对它来说都不复杂。'],
        act_check2: [
            '<32>{#p/story}* 烈焰热线 - 攻击29 防御14\n* 这个怪物点燃的火花正在熄灭。'
        ],
        act_check3: ["<32>{#p/story}* 烈焰热线 - 攻击29 防御14\n* 这个冒烟蠢货的押韵词容易着火。"],
        act_check4: ['<32>{#p/story}* 烈焰热线 - 攻击29 防御14\n* 重新点燃了对说唱的热爱，每次一句。'],
        act_flirt: ['<32>{#p/human}* （你对烈焰热线调情。）', '<32>{#p/basic}* 烈焰热线也向你调情！'],
        act_diss: ['<32>{#p/human}* （你使劲贬损烈焰热线。）'],
        dissTalk1: ['<08>{#p/basic}{~}你若骂我\n不会说唱', '<08>{#p/basic}{~}我可得说\n你行你上！'],
        dissTalk2: [
            '<08>{#p/basic}{~}你的嘲讽，\n也太无趣',
            '<08>{#p/basic}{~}不如抓紧，\n速速逃去！',
            '<08>{#p/basic}{~}否则你将，\n大受恐惧！'
        ],
        dissTalk3: [
            "<08>{#p/basic}{~}认为自己，\n很是时髦？",
            "<08>{#p/basic}{~}不过如此，\n一介草包！",
            "<08>{#p/basic}{~}我是最初\n火焰狂潮",
            '<08>{#p/basic}{~}你这弱鸡，\n真是无聊！'
        ],
        sparkText1: ["<32>{#p/human}* （你点亮了烈焰热线的引线。）", "<32>{#p/basic}* 烈焰热线的自信不断增加。"],
        sparkText2: ["<32>{#p/human}* （你点亮了烈焰热线的引线。）", '<32>{#p/basic}* 烈焰热线达到了巅峰！'],
        sparkText3: ["<32>{#p/human}* （你点亮了烈焰热线的引线。）", '<32>{#p/basic}* 烈焰热线已经通电了。'],
        rapText1: ['<32>{#p/human}* （你向烈焰热线说唱。）', '<32>{#p/basic}* 烈焰热线对你很冷漠。'],
        rapText2: ['<32>{#p/human}* （你向烈焰热线说唱。）', '<32>{#p/basic}* 烈焰热线对你很失望。'],
        rapText3: ['<32>{#p/human}* （你向烈焰热线说唱。）', '<32>{#p/basic}* 烈焰热线感到你很恶心。'],
        idleTalk1: ['<08>{#p/basic}{~}管他什么\n烈焰\n在燃烧', '<08>{#p/basic}{~}我就这样\n无畏\n且骄傲！'],
        idleTalk2: ["<08>{#p/basic}{~}老子登场，\n就炙热\n无双", "<08>{#p/basic}{~}无所畏惧，\n枷锁\n给锁上"],
        idleTalk3: ['<08>{#p/basic}{~}挡不住我，\n放肆\n和张扬！', "<08>{#p/basic}{~}烈焰熊熊，\n我从容\n不慌，"],
        idleTalk4: ["<08>{#p/basic}{~}我的节奏，\n你可\n跟不上", "<08>{#p/basic}{~}舞台中央，\n我闪闪\n发光！"],
        idleTalk5: ["<08>{#p/basic}{~}身处火线，\n我迎战\n热浪", '<08>{#p/basic}{~}想来试试？\n就带上\n力量！'],
        flirtTalk: ['<08>{#p/basic}{~}我的撩拨\n无敌手，', "<08>{#p/basic}{~}机智反击\n全抓走！"],
        sparkTalk1A: [
            "<08>{#p/basic}{~}一发热浪\n送给你",
            "<08>{#p/basic}{~}让你认清\n你自己！",
            '<08>{#p/basic}{~}炽热如同\n电烙笔！'
        ],
        sparkTalk2A: [
            "<08>{#p/basic}{~}一战注定\n打你\n只能挨！",
            '<08>{#p/basic}{~}用四个字\n描摹\n你惨败',
            '<08>{#p/basic}{~}不知好歹、\n自食其灾、\n哭天喊地、\n却无人来！'
        ],
        sparkTalk3A: [
            '<08>{#p/basic}{~}危险危险，\n远处\n来了一人',
            "<08>{#p/basic}{~}狙击手来，\n改写\n人生剧本",
            '<08>{#p/basic}{~}一发子弹，\n胜负早已\n定分！'
        ],
        sparkFlirtTalkA: [
            '<08>{#p/basic}{~}汝等鼠辈，\n喜欢甜蜜\n爱恋',
            '<08>{#p/basic}{~}快准备好，\n接受炽热\n考验',
            "<08>{#p/basic}{~}听这歌声，\n你将\n夜不能眠！"
        ],
        sparkTalk1B: [
            "<08>{#p/basic}{~}我如流水般\n流畅自信",
            '<08>{#p/basic}{~}我灿烂笑容，\n掌声来临',
            "<08>{#p/basic}{~}出手凌厉，\n你要喊救命",
            "<08>{#p/basic}{~}你会期盼，\n正身处梦境！"
        ],
        sparkTalk2B: [
            '<08>{#p/basic}{~}使命完成，\n掌控全局，',
            "<09>{#p/basic}{~}左右逢源，\n百万壮举！",
            "<08>{#p/basic}{~}而你这条，\n小小咸鱼",
            '<08>{#p/basic}{~}想完爆你，\n只需一句！'
        ],
        sparkTalk3B: [
            "<08>{#p/basic}{~}我天生杀手，\n可气吞万里",
            "<08>{#p/basic}{~}你只是废物，\n不值我一提",
            '<08>{#p/basic}{~}而你的歌词，\n都不通人理',
            '<08>{#p/basic}{~}我每句爆款，\n你前功尽弃！'
        ],
        sparkFlirtTalkB: [
            "<08>{#p/basic}{~}伙计，\n你这是\n在玩火！",
            "<08>{#p/basic}{~}你的能力\n永远\n追不上我",
            '<08>{#p/basic}{~}我等待你\n一次不小心\n失误',
            '<08>{#p/basic}{~}用韵脚突击\n叫你心服\n口服！'
        ],
        status1: ['<32>{#p/story}* 烈焰热线正在寻找额外的动力。'],
        status2: ['<32>{#p/story}* 烈焰热线吟唱起了一场风暴。'],
        status3: ['<32>{#p/story}* 烈焰热线被它迷人的微笑保护了起来。'],
        status4: ['<32>{#p/story}* 烈焰热线尝试涡轮增压。'],
        status5: ['<32>{#p/story}* 闻起来像抒情。'],
        sparkStatus1A: ['<32>{#p/story}* 烈焰热线被它的辉煌震惊了。'],
        sparkStatus2A: ['<32>{#p/story}* 烈焰热线启动了点火程序...\n  而且是手动点火。'],
        sparkStatus3A: ['<32>{#p/story}* 烈焰热线我行我素，\n  根本不在乎我们的目光。'],
        sparkStatus1B: ['<32>{#p/story}* 烈焰热线很兴奋。'],
        sparkStatus2B: ['<32>{#p/story}* 烈焰热线的能力完全释放了出来。'],
        sparkStatus3B: ['<32>{#p/story}* 烈焰热线正在涡轮增压。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 离死不远了。'] : ['<32>{#p/story}* 烈焰热线要失控了。']
    },

    b_opponent_perigee: {
        name: '* 呦呦鸡',
        epiphany: [
            ['<08>{#p/basic}{~}我要去\n别的地方\n了。'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}这儿不安全。']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}这是\n爱吗？']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}我期待\n我们的\n友谊。']
                            : ['<08>{#p/basic}{~}非常..\n感谢..'],
            ['<08>{#p/basic}{~}我明白\n我必须死。', '<08>{#p/basic}{~}请..\n以我的\n名义\n活下去..'],
            ['<08>{#p/basic}{~}要多少\n拿多少。']
        ],
        genoStatus: ['<32>{#p/asriel2}* 呦呦鸡。'],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 呦呦鸡，一只傻鸟，\n  跟死猪似的。\n* 成天净知道做白日梦。']
                : ['<32>{#p/story}* 呦呦鸡 - 攻击25 防御0\n* 这只和平之鸟相信\n  它的羽毛能治愈一切创伤。'],
        act_check2: [
            '<33>{#p/story}* 呦呦鸡 - 攻击25 防御0\n* 这只和平之鸟正试着\n  用自己的羽毛来治疗自己。'
        ],
        act_check3: ['<32>{#p/story}* 呦呦鸡 - 攻击25 防御0\n* 既是和平之鸟，\n  亦是艺术之守护神。'],
        act_check4: [
            '<32>{#p/story}* 呦呦鸡 - 攻击25 防御0\n* 这只和平之鸟\n  欣赏着你那柏拉图式的情歌。'
        ],
        act_flirt: ['<32>{#p/human}* （你向呦呦鸡调情。）'],
        act_yell: ['<32>{#p/human}* （你扯着嗓子，\n  冲呦呦鸡大喊大叫。）'],
        idleTalk1: ['<08>{#p/basic}{~}啾啾，\n啾啾。'],
        idleTalk2: ['<08>{#p/basic}{~}\x00*舒缓的\n哨声*'],
        idleTalk3: ['<08>{#p/basic}{~}生命\n真美好。'],
        idleTalk4: ['<08>{#p/basic}{~}\x00*拍打翅膀\n的声音*'],
        idleTalk5: ['<08>{#p/basic}{~}和平与\n安宁。'],
        flirtTalk: ["<08>{#p/basic}{~}额？\n我不\n明白..."],
        yellTalk1: ["<08>{#p/basic}{~}没关系，\n我能让你\n好一些。"],
        yellTalk2: ["<08>{#p/basic}{~}来，\n我帮你\n平静下来。"],
        yellTalk3: ["<08>{#p/basic}{~}不要\n生气。", '<08>{#p/basic}{~}你可以吹\n其他曲子。'],
        flirtTalkX: [
            '<08>{#p/basic}{~}啊，那句\n可爱的话\n是你的\n歌吗？',
            '<08>{#p/basic}{~}我接受了，\n还有你的\n姿态。'
        ],
        whistleTalkX: ['<08>{#p/basic}{~}我接受你\n的姿态。'],
        whistleTalk: ['<08>{#p/basic}{~}\x00*专心地\n吹口哨*'],
        whistleStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 呦呦鸡。'] : ['<32>{#p/story}* 呦呦鸡等待着你的回应。'],
        act_bow1: ['<32>{#p/human}* （但没有什么可以鞠躬。）'],
        act_bow2: ['<32>{#p/human}* （你鞠了一躬。）\n* （呦呦鸡也对你鞠了一躬。）\n* （双方达成了谅解。）'],
        act_whistle: [
            '<32>{#p/human}* （你吹了一首宁静的曲子。）\n* （呦呦鸡以哨声回应。）\n* （歌声余音绕梁...）'
        ],
        status1: ['<32>{#p/story}* 你进入了呦呦鸡的轨道附近。'],
        status2: ['<32>{#p/story}* 呦呦鸡的生活无忧无虑。'],
        status3: ['<32>{#p/story}* 呦呦鸡非常开心。'],
        status4: ['<32>{#p/story}* 呦呦鸡以羽毛轻触。'],
        status5: ['<32>{#p/story}* 闻起来像备用面包。'],
        status6: () =>
            world.goatbro ? ["<32>{#p/asriel2}* 不堪一击。"] : ['<32>{#p/story}* 呦呦鸡非常满足。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 离死不远了。'] : ["<32>{#p/story}* 呦呦鸡的死期快到了。"]
    },

    b_opponent_tsundere: {
        name: '* 傲娇飞船',
        epiphany: [
            ["<08>{#p/basic}{~}快-快走，\n我又不想\n留你！"],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}离-\n离我远点！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}我...', '<08>{#p/basic}{~}我其-其实\n也爱你！']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}只-只是\n交个朋友，\n对吧？', '<08>应该\n没问题...']
                            : ['<08>{#p/basic}{~}欸？\n干什...', '<08>{#p/basic}{~}..哦..\n谢谢，欸嘿..'],
            ["<08>{#p/basic}{~}你真\n这么想\n的话...", "<08>{#p/basic}{~}我-我愿意\n为你而死！"],
            ["<08>{#p/basic}{~}这可不是\n让-让你\n买婚戒的！"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 傲娇飞船，\n  这家伙，我无话可说。']
                : ['<32>{#p/story}* 傲娇飞船 - 攻击25 防御26\n* 看起来很刻薄，\n  但其实暗地里很喜欢你？'],
        act_check2: [
            '<32>{#p/story}* 傲娇飞船 - 攻击25 防御26\n* 仰天大啸出门去，\n  我辈岂是傲娇姬？'
        ],
        act_check3: ["<32>{#p/story}* 傲娇飞船 - 攻击25 防御26\n* 这个犹豫的情人的引擎\n  现在由你驱动。"],
        act_check4: ['<32>{#p/story}* 傲娇飞船 - 攻击25 防御26\n* 看起来... 很嫉妒。'],
        act_check5: ['<32>{#p/story}* 傲娇飞船 - 攻击25 防御26\n* 随时会爆发。'],
        act_ignore: ["<32>{#p/human}* （你故意无视了傲娇飞船\n  的存在。）"],
        flirtText1: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它拥有引人瞩目的护盾。）'],
        flirtText2: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它拥有很棒的大炮。）'],
        flirtText3: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它有一个强大的折跃引擎。）'],
        flirtText4: ['<32>{#p/human}* （你告诉傲娇飞船，\n  你喜欢它在虚拟小说上的品味。）'],
        flirtText5: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它拥有可爱的引擎支柱。）'],
        flirtText6: ["<32>{#p/human}* （你告诉傲娇飞船，\n  你想给它的电容器增压。）"],
        flirtText7: ["<32>{#p/human}* （你告诉傲娇飞船，\n  你想把它擦得闪闪发光。）"],
        flirtText8: ['<32>{#p/human}* （你告诉傲娇飞船，\n  你们应该用鼻子互相轻蹭对方。）'],
        flirtText9: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它的顶铲是完美无缺的。）'],
        flirtText10: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它有一个令人惊叹的机翼。）'],
        flirtText11: ['<32>{#p/human}* （你告诉傲娇飞船，\n  它拥有迷人的光管。）'],
        flirtText12: ["<32>{#p/human}* （你告诉傲娇飞船，\n  你想去一个没有人类\n  到过的地方。）"],
        stealText: ['<32>{#p/human}* （你靠近了傲娇飞船，\n  并抽取它的电池能量。）'],
        upgradeText1: ["<32>{#p/human}* （你激活了傲娇飞船引擎的\n  滑流飞行模块。）"],
        upgradeText2: ["<32>{#p/human}* （你激活了傲娇飞船大炮的\n  超相位发射机制。）"],
        upgradeText3: ["<32>{#p/human}* （你激活了傲娇飞船护盾的\n  自适应调节功能。）"],
        upgradeText4: [
            "<33>{#p/human}* （你无法再激活了。）\n* （傲娇飞船的主体部位\n  已全部激活。）"
        ],
        idleTalk1: ["<08>{#p/basic}{~}别整得跟\n我喜欢你\n似的。"],
        idleTalk2: ['<08>{#p/basic}{~}大..\n大傻瓜！'],
        idleTalk3: ["<08>{#p/basic}{~}哼！\n你挡我\n路了。"],
        idleTalk4: ['<08>{#p/basic}{~}(..哎呦!)\n人类...'],
        idleTalk5: ['<08>{#p/basic}{~}..\n人-人类\n..\n..？'],
        flirtTalk1: ['<08>{#p/basic}{~}啊！？\n臭-臭流氓！'],
        flirtTalk2: ['<08>{#p/basic}{~}想-想得美！\n哼！'],
        flirtTalk3: ['<08>{#p/basic}{~}...你是\n真心的吗？'],
        flirtTalk4: ['<08>{#p/basic}{~}我..\n谢-谢谢你..'],
        flirtTalk5: ['<08>{#p/basic}{~}什-什么？\n现在？？？', '<08>{#p/basic}{~}太早了啦\n..'],
        jellyTalk1: ["<08>{#p/basic}{~}嘿！\n凭-凭什么！"],
        jellyTalk2: ['<08>{#p/basic}{~}呃，你们\n两个怪怪\n的。'],
        jellyTalk3: ['<08>{#p/basic}{~}离-离那家\n伙远点！'],
        upgradeTalk1: ['<08>{#p/basic}{~}干-\n干什么？？'],
        upgradeTalk2: ['<08>{#p/basic}{~}咳咳。\n人类。'],
        upgradeTalk3: ['<08>{#p/basic}{~}哦..\n..\n哇-哇哦..'],
        stealTalk1: ["<08>{#p/basic}{~}别-别这样！\n行吗？"],
        stealTalk2: ['<08>{#p/basic}{~}..\n..\n（为什么..）'],
        stealTalk3: ['<08>{#p/basic}{~}别抢我的\n风头了！'],
        ignoreTalk1: ['<08>{#p/basic}{~}哼！\n你爱理\n不理！'],
        ignoreTalk2: ["<08>{#p/basic}{~}没错！\n我又没\n想留你！"],
        upgradeStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 你真打算这么做？']
                : ['<32>{#p/story}* 傲娇飞船在检查\n  你刚才激活的部件。'],
        upgradeStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 简直是浪费时间...']
                : ['<32>{#p/story}* 傲娇飞船对你\n  刚才激活的部件很来电。'],
        upgradeStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* ...']
                : ['<32>{#p/story}* 傲娇飞船对你\n  刚才激活的部件很不安心。'],
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 傲娇飞船。']
                : ['<32>{#p/story}* 傲娇飞船在高处望着你，\n  很快又把头扭开了。'],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 傲娇飞船。']
                : ['<32>{#p/story}* 傲娇飞船对你\n  轻蔑地撇了撇鼻子。'],
        status3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 傲娇飞船。']
                : ['<32>{#p/story}* 傲娇飞船“不小心”地用机舱\n  蹭了下你。'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 傲娇飞船。']
                : ['<32>{#p/story}* 傲娇飞船将大炮模式\n  设定为“晕眩”。'],
        status5: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 傲娇飞船。'] : ['<32>{#p/story}* 闻起来像太空仙人掌。'],
        status6: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 不堪一击。"]
                : ['<32>{#p/story}* 傲娇飞船面带羞涩，\n  把目光移开了。'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 离死不远了。']
                : ["<32>{#p/story}* 等离子气体\n  从傲娇飞船的引擎喷出。"]
    },

    b_opponent_rg01: {
        name: () => (world.bad_lizard > 1 ? '* 一号守卫' : '* 三号守卫'),
        epiphaNOPE: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}那个，\n你在干啥呢？']
                : ["<11>{#p/undyne}{#p/basic}{~}不是这样的，\n长官。"],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 一号守卫...\n* 这俩货我没啥好说的。"]
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 一号守卫 - 攻击30 防御20\n* 这对自信的情侣\n  似乎铁了心想干掉你。']
                    : ['<32>{#p/story}* 三号守卫 - 攻击30 防御20\n* 对牛仔女孩情有独钟，\n  还是个怀疑论者。'],
        act_check2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一号守卫 - 攻击30 防御20\n* 就算牺牲生命，\n  也要彻底干掉你。']
                : ['<32>{#p/story}* 三号守卫 - 攻击30 防御20\n* 之后想把指甲好好剪剪。'],
        act_check3: ['<32>{#p/story}* 三号守卫 - 攻击30 防御20\n* 她俩终于在一起了...'],
        act_check4: ['<32>{#p/story}* 三号守卫 - 攻击30 防御20\n* 心碎了。'],
        act_check5: ['<32>{#p/story}* 三号守卫 - 攻击30 防御20\n* 想把心里话\n  马上说出来...'],
        act_check6: ['<32>{#p/story}* 三号守卫 - 攻击30 防御20\n* 真心想挽回，可惜太自卑。'],
        randTalk1: () => ['<11>{#p/basic}{~}组合技。'],
        randTalk2: () =>
            world.bad_lizard > 1 ? ["<11>{#p/basic}{~}我们会\n阻止你..."] : ["<11>{#p/basic}{~}我俩只是\n普通朋友..."],
        randTalk3: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}你不是\n我们的对手。"]
                : ["<11>{#p/basic}{~}别硬给我们\n牵线搭桥..."],
        randTalk4: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}兄弟，当心。'] : ['<11>{#p/basic}{~}姑娘，当心。'],
        randStatus1: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一号和二号配合默契。']
                : ["<33>{#p/story}* 三号想继续和四号做普通朋友。\n* 四号没有异议。"],
        randStatus2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一号和二号正准备施展\n  下一轮组合技。']
                : ['<32>{#p/story}* 三号不再顾虑。\n* 四号松了口气。'],
        randStatus3: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一号和二号互相媳戏，\n  身子不停地撞来撞去。']
                : ["<32>{#p/story}* 三号细细回忆着四号的过往。\n* 四号耸耸肩，毫不在意。"],
        randStatus4: () =>
            world.bad_lizard > 1
                ? ["<32>{#p/story}* 空气中飘来阵阵男士体香。"]
                : ['<32>{#p/story}* 空气中飘来阵阵香水芬芳。'],
        randStatus5: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一号和二号说\n  他们是“最酷的铁哥们”。']
                : ['<32>{#p/story}* 三号鼓起了勇气。\n* 四号回应以无言的勇气。'],
        randTalkLone1: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}下地狱吧。']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}再也无从得知..."],
        randTalkLone2: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}死有余辜。']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}一切都晚了..."],
        randTalkLone3: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}禽兽不如。']
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}永远没机会...'],
        randTalkLone4: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}给我去死。']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}不要啊..."],
        randStatusLone: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 只剩一个了。']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 一号变得更加专注。']
                    : ['<32>{#p/story}* 三号已经彻底懵了。'],

        act_flirt: ['<32>{#p/human}* （你向三号守卫调情。）'],
        flirtTalk1: ['<11>{#p/basic}{~}不准调情。'],
        flirtTalk2: ["<11>{#p/basic}{~}这招对我们\n根本没用。"],
        flirtTalkNervy1: ['<11>{#p/basic}{~}调情可真... 唉...'],
        flirtTalkNervy2: ["<11>{#p/basic}{~}感觉也... 唉..."],
        flirtTalkLone: ['<11>{#p/basic}{~}...'],
        flirtStatus: ['<32>{#p/story}* 三号努力克制自己的情愫。\n* 四号有点不解...'],
        flirtStatusNervy: ["<32>{#p/story}* 三号快要按捺不住自己的心意。\n* 四号有些担忧..."],
        act_flirt_happy: [
            '<32>{#p/human}* （你向三号守卫调情。）\n* （她接受了你的赞美，\n  但仍痴情于四号。）'
        ],
        act_flirt_nada: ["<32>{#p/human}* （你向一号守卫调情。）\n* （他根本不搭理你。）"],

        act_tug: ["<32>{#p/human}* （你伸手去拉三号的手套，\n  结果被她一把推开。）"],
        tugTalk1: ['<11>{#p/basic}{~}给我收敛点。'],
        tugTalk2: ['<11>{#p/basic}{~}不准碰我。'],
        tugTalk3: ["<11>{#p/basic}{~}出格了。"],
        tugTalk4: ['<11>{#p/basic}{~}走开。'],
        tugStatus: ['<32>{#p/story}* 看来，有些红线真不能乱碰。'],
        act_tug_lone: ["<32>{#p/human}* （你伸手去拉三号的手套，\n  她猛地抬起爪子，你扑了个空。）"],
        tugTalkLone: ['<11>{#p/basic}{~}...'],
        tugStatusLone: ['<32>{#p/story}* 三号俯视着你，\n  竭力掩藏内心的感受。'],
        act_tug_happy: [
            "<32>{#p/human}* （你抓住了三号的爪子。）",
            '<32>{#p/basic}* 三号错把你的手\n  当成了四号的爪子...'
        ],

        tugShock: ['<11>{#p/basic}{~}四号...！', '<11>{#p/basic}{~}...', '<11>{#p/basic}{~}那只手镯...'],
        nervyTalk1: ['<11>{#p/basic}{~}四号，\n我...'],
        nervyTalk2: ['<11>{#p/basic}{~}四号，\n我们...'],
        nervyTalk3: ['<11>{#p/basic}{~}四号，\n你...'],
        nervyTalk4: ["<11>{#p/basic}{~}四号，\n这太..."],
        nervyStatus: ['<32>{#p/story}* 太阳风开始转向，\n  助你一路顺风。'],

        act_whisper: ['<32>{#p/human}* （你跟三号守卫悄悄说，\n  有爱就要大声说出来。）'],
        act_whisper_alt: ['<32>{#p/human}* （你跟三号守卫说了几句悄悄话。）\n* （什么都没发生。）'],

        confess1: ['<11>{#p/basic}{~}四号...'],
        confess2: ['<11>{#p/basic}{~}...', '<11>{#p/basic}{~}...怎么了，\n三号？'],
        confess3: ['<11>{#p/basic}{~}看我的手...'],
        confess4: ["<11>{#p/basic}{~}那是..."],
        confess5: ['<11>{#p/basic}{~}是团结手镯。', '<11>{#p/basic}{~}记得吗？'],
        confess6: [
            "<11>{#p/basic}{~}是你！",
            "<11>{#p/basic}{~}这么多年\n没见到你了...",
            "<11>{#p/basic}{~}我以为，\n咱们再也\n无缘相见。",
            "<11>{#p/basic}{~}那之后...\n我在安黛因\n手下\n接受训练。\n没想到..."
        ],
        confess7: [
            "<11>{#p/basic}{~}过了这么\n多年，我还能\n再见到你，\n四号。",
            '<11>{#p/basic}{~}不管你我的\n名字怎么变...',
            '<11>{#p/basic}{~}我对你的爱\n永远不变。'
        ],
        confess8: ['<11>{#p/basic}{~}三号...', '<11>{#p/basic}{~}我也爱你！'],
        confess9: ['<11>{#p/basic}{~}...我带你去\n吃冰淇淋吧？'],
        confess10: ['<11>{#p/basic}{~}三文鱼味的？'],
        confess11: ['<11>{#p/basic}{~}想一块去了！'],

        happyTalk1: ['<11>{#p/basic}{~}这么多年，\n我好想你...'],
        happyTalk2: ["<11>{#p/basic}{~}有你陪着我，\n好开心..."],
        happyTalk3: ['<11>{#p/basic}{~}没想到，\n一起并肩\n作战的人\n原来就是你...'],
        happyTalk4: ['<11>{#p/basic}{~}没想到，\n那双明眸，\n就是你的...'],
        happyStatus: ['<32>{#p/story}* 三号和四号幸福地望着彼此。'],

        horrorTalk1: [
            '<11>{#p/basic}{~}{@random=1.1/1.1}不...\n不要...',
            '<11>{#p/basic}{~}{@random=1.1/1.1}明明说好...\n要幸福地\n在一起...'
        ],
        horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}我受不了了..."],
        horrorTalk3: ["<11>{#p/basic}{~}{@random=1.1/1.1}求求你，\n让我去死..."],
        horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],
        horrorStatus: ['<32>{#p/story}* ...'],

        dangerStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 离死不远了。']
                : world.bad_lizard > 1
                    ? ["<32>{#p/story}* 一号守卫望向地面。"]
                    : ["<32>{#p/story}* 三号守卫喘着粗气。"]
    },

    b_opponent_rg02: {
        name: () => (world.bad_lizard > 1 ? '* 二号守卫' : '* 四号守卫'),
        epiphaNOPE: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}没看懂\n那人在干啥..."]
                : ["<11>{#p/basic}{~}这招对我\n不好使。"],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 二号守卫...\n* 这俩货我没啥好说的。"]
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 二号守卫 - 攻击30 防御20\n* 这对自信的情侣\n  似乎铁了心想阻止你。']
                    : ["<33>{#p/story}* 四号守卫 - 攻击30 防御20\n* 她忠于友情，\n  但缘分到了，也愿意更进一步..."],
        act_check2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 二号守卫 - 攻击30 防御20\n* 就算命丧黄泉，\n  也要彻底消灭你。']
                : ['<32>{#p/story}* 四号守卫 - 攻击30 防御20\n* 之后想淘一件新盔甲。'],
        act_check3: ['<32>{#p/story}* 四号守卫 - 攻击30 防御20\n* 她俩终于在一起了...'],
        act_check4: ['<32>{#p/story}* 四号守卫 - 攻击30 防御20\n* 心碎了。'],
        act_check5: ['<32>{#p/story}* 四号守卫 - 攻击30 防御20\n* 有点“露骨”...'],
        act_check6: ['<32>{#p/story}* 四号守卫 - 攻击30 防御20\n* 恨不得马上杀了你。'],
        randTalk1: () => ['<11>{#p/basic}{~}组合技！'],
        randTalk2: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}一劳永逸！'] : ['<11>{#p/basic}{~}纯普通朋友！'],
        randTalk3: () =>
            world.bad_lizard > 1 ? ["<11>{#p/basic}{~}你就是\n在送死！"] : ['<11>{#p/basic}{~}强扭的瓜\n不甜！'],
        randTalk4: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}必须滴，\n兄弟！'] : ['<11>{#p/basic}{~}肯定的，\n姑娘！'],
        randTalkLone1: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}你完蛋了！！"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}为什么要\n这样对我！？'],
        randTalkLone2: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}休想得逞！！"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}我就她一个\n朋友啊...！'],
        randTalkLone3: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}老子\n宰了你！！']
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}她就是\n我的唯一...'],
        randTalkLone4: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}血债血偿！"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}你到底是\n什么怪物！？'],
        randStatusLone: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 只剩一个了。']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 二号的情绪彻底失控。']
                    : ['<32>{#p/story}* 四号已经心乱如麻。'],

        act_flirt: ['<32>{#p/human}* （你向四号守卫调情。）'],
        flirtTalk1: ["<11>{#p/basic}{~}严禁调情！"],
        flirtTalk2: ["<11>{#p/basic}{~}根本没用！"],
        flirtTalkNervy1: ["<11>{#p/basic}{~}真不像话！"],
        flirtTalkNervy2: ["<11>{#p/basic}{~}也跟我们\n没关系！"],
        flirtTalkLone: ['<11>{#p/basic}{~}...'],
        act_flirt_happy: [
            "<32>{#p/human}* （你向四号守卫调情。）\n* （她回应了你的赞美，\n  但仍痴情于三号。）"
        ],
        act_flirt_nada: ["<32>{#p/human}* （你向二号守卫调情。）\n* （他根本不搭理你。）"],

        act_tug: ["<32>{#p/human}* （你伸手去拉四号的手套。）", "<32>{#p/basic}* 手套似乎松动了..."],
        tugTalk1: ['<11>{#p/basic}{~}你-你在\n干什么？'],
        tugTalk2: ["<11>{#p/basic}{~}难不成...\n你要..."],
        tugTalk3: ['<11>{#p/basic}{~}我...\n这太...'],
        tugTalk4: ['<11>{#p/basic}{~}...'],
        tugStatus: ["<32>{#p/story}* 四号的手套\n  眼看就要掉下来了。"],
        act_tug_lone: ["<32>{#p/human}* （你伸手去拉四号的手套。）", "<32>* 她的手套直接就掉了！"],
        tugTalkLone: ['<11>{#p/basic}{~}...'],
        tugStatusLone: ['<32>{#p/story}* 四号不理不睬，任你摆布。'],
        act_tug_hold: ["<32>{#p/human}* （你抓住了四号的爪子。）"],
        holdTalk: ['<11>{#p/basic}{~}呃...'],
        holdStatus: ['<32>{#p/story}* 四号有些不知所措。'],
        act_tug_hold_lone: ["<32>{#p/human}* （你抓住了四号的爪子。）\n* （可她一点反应都没有。）"],
        holdTalkLone: ['<11>{#p/basic}{~}...'],
        holdStatusLone: ['<32>{#p/story}* 四号放弃了抵抗。'],
        act_tug_happy: [
            "<32>{#p/human}* （你抓住了四号的爪子。）",
            '<32>{#p/basic}* 四号错把你的手\n  当成了三号的爪子...'
        ],
        tugSuccessStatus: ['<32>{#p/story}* 真是饺子破了皮——露馅了。'],

        tugShock: ["<11>{#p/basic}{~}我的手套...\n要掉了...！"],
        nervyTalk1: ['<11>{#p/basic}{~}三号...？'],
        nervyTalk2: ['<11>{#p/basic}{~}干嘛露出\n那样的眼神？'],
        nervyTalk3: ["<11>{#p/basic}{~}三号，\n你的表情\n怎么怪怪的？"],
        nervyTalk4: ['<11>{#p/basic}{~}你没事吧？'],

        act_whisper: ['<32>{#p/human}* （你跟四号守卫说了几句悄悄话。）\n* （可她更加困惑了。）'],
        act_whisper_alt: ['<32>{#p/human}* （你跟四号守卫说了几句悄悄话。）\n* （什么都没发生。）'],

        happyTalk1: ['<11>{#p/basic}{~}我也想你！'],
        happyTalk2: ["<11>{#p/basic}{~}有你在身边，\n好开心！"],
        happyTalk3: ['<11>{#p/basic}{~}哈哈，\n可不是么...'],
        happyTalk4: ['<11>{#p/basic}{~}宝贝，\n别多想了！'],

        horrorTalk1: [
            '<11>{#p/basic}{~}{@random=1.1/1.1}不...\n不要...',
            '<11>{#p/basic}{~}{@random=1.1/1.1}明明说好...\n要一起做\n好多好多事...'
        ],
        horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}不可能..."],
        horrorTalk3: ['<11>{#p/basic}{~}{@random=1.1/1.1}求求你...\n杀了我吧...'],
        horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],

        dangerStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 离死不远了。']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 二号守卫昂起头颅。']
                    : ["<32>{#p/story}* 四号守卫喘着粗气。"]
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
                    '<25>{#p/alphys}{#g/alphysCutscene1}* 哦，我-我在！',
                    '<25>{#g/alphysCutscene2}* 嗯...\n  这个谜题其实蛮简单的。',
                    '<25>{#g/alphysSide}* 从终端旁经过，\n  它就会改变你的时间位移。',
                    "<25>{#g/alphysSmileSweat}* 用外行话说，\n  你现在在四维时空。",
                    "<25>{#g/alphysInquisitive}* 只不过它并不能\n  算是一个维度，\n  但是... 你懂的。",
                    '<25>{#g/alphysNervousLaugh}* 不管怎样，要通过此谜题，\n  只需要随着房间的\n  全局相移...',
                    '<25>{#g/alphysHellYeah}* ...对齐你的局部相位！',
                    '<25>{#g/alphysCutscene2}* 当然，\n  你只需要向前或者\n  向后走就可以了。',
                    '<25>{#g/alphysSmileSweat}* 还-还有，终端显示的是\n  你的局部相位偏移量...',
                    "<25>{#g/alphysSide}* 这样，你就可以知道\n  何时才能对齐了。",
                    '<25>{#g/alphysCutscene1}* 嗯，祝-祝好运！'
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ...还没解决？',
                    '<25>{#g/alphysCutscene2}* 嗯...',
                    '<25>* 可能上回我太啰嗦了，\n  没解释清楚...\n* 嘿嘿。',
                    '<25>{#g/alphysSide}* 你就看看哪台终端写着0，\n  去那点下确认就好。',
                    "<25>{#g/alphysNervousLaugh}* 再说一次，\n  这与相位偏移有关。",
                    '<25>{#g/alphysCutscene2}* 只要对齐你的\n  局部相位...',
                    '<25>{#g/alphysCutscene2}* ...',
                    "<25>{#g/alphysUhButHeresTheDeal}* 不说了！\n  总之找写着0的终端就成！！"
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ...又来？',
                    '<25>{#g/alphysSmileSweat}* 嗯，呃...\n* 你先往前走，看好...',
                    '<25>{#g/alphysSideSad}* ...不对，\n  万一你已经走过头了。',
                    '<25>{#g/alphysNeutralSweat}* ...',
                    "<25>{#g/alphysCutscene3}* 你脑子应该好使，\n  自-自己琢磨琢磨吧！！"
                ]
            ][SAVE.data.n.cell_puzzleA1++],
        puzzle2b: () =>
            [
                [
                    '<25>{#p/alphys}{#g/alphysCutscene1}* 哦，我-我在！',
                    '<25>{#p/alphys}{#g/alphysCutscene2}* 这套谜题比上回那个\n  稍微复杂一点。',
                    "<25>{#p/alphys}{#g/alphysWelp}* 毕竟比上回多了个维度。",
                    '<25>{#p/alphys}{#g/alphysCutscene3}* 有时我挺怀疑\n  这能增加多少难度的。',
                    '<25>{#p/alphys}{#g/alphysSmileSweat}* 呃，就-就像上一个，\n  对齐你的相位就行。',
                    "<25>{#p/alphys}{#g/alphysFR}* 要是你还听不懂的话...",
                    "<25>{#p/alphys}{#g/alphysSide}* 你难道一直\n  住在小行星上吗？"
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ...所以你确实\n  住在小行星上。',
                    '<25>{#p/alphys}{#g/alphysDontGetAllDreamyEyedOnMeNow}* 我真服了，反正找\n  写着0的终端就好了！'
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
                ? ["<32>{#p/human}* （这件文物你以前好像见过。）"]
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
                ? ["<32>{#p/human}* （这件所谓的文物\n  你好像并没见过。）"]
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
                        "<25>{#p/alphys}{#f/23}* 哇，你真是个大好人，\n  还给我留着那个。",
                        '<25>{#p/alphys}{#f/22}* 还保护了这么久！',
                        '<25>{#p/alphys}{#g/alphysCutscene2}* ...谢谢你。'
                    ])
                : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

                    ? [
                        "<32>{#p/basic}* 你把它留在这了？？",
                        '<32>{#p/basic}* 嗯... 你为啥会以为\n  我想要这个，哈！？',
                        "<32>{#p/basic}* 才怪呢！\n* 这就是一个... \n  愚蠢的玩偶而已！",
                        '<32>{#p/basic}* ... 不过还是挺可爱的...',
                        "<32>{#p/basic}* 看-看啥！？\n* 我才没脸红呢！哼！",
                        '<32>{#p/basic}* 至少表面没有...',
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
                    '<32>{#p/human}* （你使用了喵喵玩偶。）',
                    ...((fetchCharacters()
                        .find(c => c.key === 'alphys') // NO-TRANSLATE

                        ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                        ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                        : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

                            ? ['<32>{#p/basic}* 你能不能别玩那玩意了？']
                            : game.room === 'f_blooky' && // NO-TRANSLATE

                                !world.genocide &&
                                SAVE.data.n.plot !== 47.2 &&
                                !SAVE.data.b.a_state_napstadecline
                                ? ['<32>{#p/napstablook}* 噢............']
                                : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                                    ? []
                                    : ['<32>{#p/basic}* 你在期待什么...？'])
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
                : ['<32>{#p/human}* （你吃掉了星园烁宠。）']
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
        drop: ['<32>{#p/human}* （你把灯芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （30 HP。）']
                : ['<32>{#p/basic}* “灯芯” 回复30 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩五根。'],
        name: '五根灯芯',
        use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
    },
    i_filament_use1: {
        battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n还剩四根。', name: '灯芯' },
        drop: ['<32>{#p/human}* （你把灯芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （25 HP。）']
                : ['<32>{#p/basic}* “灯芯” 回复25 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩四根。'],
        name: '四根灯芯',
        use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
    },
    i_filament_use2: {
        battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n还剩三根。', name: '灯芯' },
        drop: ['<32>{#p/human}* （你把灯芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （20 HP。）']
                : ['<32>{#p/basic}* “灯芯” 回复20 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩三根。'],
        name: '三根灯芯',
        use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
    },
    i_filament_use3: {
        battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n还剩两根。', name: '灯芯' },
        drop: ['<32>{#p/human}* （你把灯芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （15 HP。）']
                : ['<32>{#p/basic}* “灯芯” 回复15 HP\n* 一组弯弯绕绕的灯芯，风味独特！\n* 还剩两根。'],
        name: '两根灯芯',
        use: ['<32>{#p/human}* （你从灯丝中汲取了些能量。）']
    },
    i_filament_use4: {
        battle: { description: '一组弯弯绕绕的灯芯，风味独特！\n只剩一根。', name: '灯芯' },
        drop: ['<32>{#p/human}* （你把灯芯扔掉了。）'],
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
                ? ["<32>{#p/human}* （你感觉这东西\n  并没有想象中那么便携。）"]
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
                ? ["<32>{#p/human}* （你感觉这东西\n  并没有想象中那么让人镇静。）"]
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
                ? ["<32>{#p/human}* （你感觉这东西\n  并没有想象中那么甜。）"]
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
                ? ["<25>{#p/asriel1}{#f/13}* 别告诉我\n  这代表着什么..."]
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
                ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>* 你刚才是不是把一瓶\n  质量上乘的橘汁汽水\n  扔掉了？']
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
                            '<25>{#p/alphys}{#g/alphysOhGodNo}* 那-那不是我的饮料吗！？',
                            '<25>{#p/alphys}{#f/10}* 我... 的... 天...',
                            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 你就不能克制一下吗！'
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
        description: '在新手机上自带的。\n可以用来启动升降机。'
    },

    k_mystery: {
        name: '神秘钥匙',
        description: () =>
            SAVE.data.b.f_state_hapstadoor
                ? "用它解锁了镁塔顿家的大门。"
                : "在休闲回廊里布莱蒂和凯蒂\n开的杂货铺中搞到的。"
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
                author: () => (SAVE.data.n.plot === 72 ? '_舟亢忝行_' : '_杀手亾耦_'),
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
                author: () => (SAVE.data.n.plot === 72 ? '_舟亢忝行_' : '_杀手亾耦_'),
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
                author: '懒骨。',
                pm: '以防万一。'
            },
            alphysX2: {
                author: '艾菲斯',
                pm: '嗯\n我都给删了'
            },
            alphysX3: {
                author: '懒骨。',
                pm: '嘿... 还记得有一次，\n教授显摆他的重力操纵板吗？'
            },
            alphysX4: {
                author: '艾菲斯',
                pm: '就他把一窝子东西整上天那次？\n哦呦 当然记得www'
            },
            alphysX5: {
                author: '懒骨。',
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
                author: '懒骨。',
                pm: "我明白。\n但我有工作在在在在"
            },
            alphysX9: {
                author: '艾菲斯',
                pm: '...\n跑哪去了？'
            },
            alphysY1: {
                author: '懒骨。',
                pm: '抱歉，有个人类突然出现了，\n打得我措手不及。'
            },
            alphysY2: {
                author: '懒骨。',
                pm: '我没开玩笑。'
            },
            alphysY3: {
                author: '艾菲斯',
                pm: '哦... 等等，有人类来了？'
            },
            alphysY4: {
                author: '懒骨。',
                pm: "我不会为了说个双关\n还特意撒谎吧？"
            },
            alphysY5: {
                author: '艾菲斯',
                pm: '知道我要说什么吧。'
            },
            alphysY6: {
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
                pm: "知道。我正在努力疏散民众。\n不然就来不及了。"
            },
            alphysY8A3: {
                author: '艾菲斯',
                pm: '那就好'
            },
            alphysYdrake1: {
                author: '艾菲斯',
                pm: '你知道吗...\n星铁龙的妈妈前几天刚来过'
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
                author: '懒骨。',
                pm: "你就跟她说，身为皇家科学员，\n你会竭尽所能。"
            },
            alphysYdrake5: {
                author: '艾菲斯',
                pm: '是啊... 也只能这么说了'
            },
            alphysYdrake6: {
                author: '懒骨。',
                pm: "起码比啥都不说强。"
            },
            alphysY8A4: {
                author: '艾菲斯',
                pm: '好险'
            },
            alphysY8A5: {
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
                pm: "我在。怪我没看住他。"
            },
            alphysY8B4b: {
                author: '懒骨。',
                pm: "我在。怪我把他丢外面了，\n没看好他。"
            },
            alphysY8B5: {
                author: '艾菲斯',
                pm: '现在咋办？'
            },
            alphysY8B6: {
                author: '懒骨。',
                pm: '我直说吧，艾菲斯。'
            },
            alphysY8B7: {
                author: '懒骨。',
                pm: "还能咋办？\n我啥也做不了。"
            },
            alphysY8B8: {
                author: '艾菲斯',
                pm: '衫斯...'
            },
            alphysY8B9: {
                author: '懒骨。',
                pm: "错不在你，这就是命。"
            },
            alphysY8B10: {
                author: '艾菲斯',
                pm: '啥意思？'
            },
            alphysY8B11: {
                author: '懒骨。',
                pm: '帕派瑞斯的性格，你也清楚。'
            },
            alphysY8B12: {
                author: '懒骨。',
                pm: "他太善良了，\n看着别人一个个死去..."
            },
            alphysY8B13: {
                author: '艾菲斯',
                pm: '绝不会像我们一样，\n坐视不管，对吧？'
            },
            alphysY8B14: {
                author: '懒骨。',
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
                author: '懒骨。',
                pm: "我猜猜看，\n那人现在又盯上铸厂居民了？"
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
                author: '懒骨。',
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
                pm: '那人到处惹事...\n连特战队都没拦住'
            },
            alphysY8C2b: {
                author: '艾菲斯',
                pm: '那人到处惹事...\n平民百姓都遭殃了'
            },
            alphysY8C2c: {
                author: '艾菲斯',
                pm: '见过那人的... 全死了'
            },
            alphysY8C3a: {
                author: '懒骨。',
                pm: '哦，还好还好。\n你快去疏散大家啊。'
            },
            alphysY8C3b: {
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
                pm: "你是不是该做点啥？"
            },
            alphysY8C12b: {
                author: '懒骨。',
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
                author: '懒骨。',
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
                pm: '看来对那人来说\n杀了特战队员还不过瘾'
            },
            alphysY8D1a3: {
                author: '艾菲斯',
                pm: '看来对那人来说\n杀了犬卫队员还不过瘾'
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
                author: '懒骨。',
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
                author: '懒骨。',
                pm: "对不起，艾菲斯。\n我想帮忙，但无能为力。"
            },
            alphysY8D2b: {
                author: '懒骨。',
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
                author: '懒骨。',
                pm: () =>
                    world.bad_lizard < 2
                        ? "还是给自己留点时间\n好好缓缓吧。"
                        : "行，你走吧。\n我会继续监视那人。"
            },
            alphysY8D4x: {
                author: '懒骨。',
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
                author: '懒骨。',
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
                author: '懒骨。',
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
                    '回复40 HP\n别管这个叫\n“传说英雄”。',
                    '回复34 HP\n不想被伤害\n就要去抗争。',
                    "回复55 HP\n这事...\n说来话长啊。"
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
                            '<30>{#k/0}* 你好好推销推销，\n  她们指定会...\n  呃... “上钩”的。'
                        ],
        sell2: () =>
            world.runaway
                ? ['<30>{#p/basic}* 空无一物。']
                : SAVE.data.b.a_state_freesell
                    ? ['<30>{#p/basic}{#k/6}* 不好意思。\n  一位杀人魔限领一份哦。']
                    : ["<30>{#p/basic}{#k/6}* 这事找我没戏，小家伙。"],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['恋爱心得', '镁塔顿', '下一步去哪', '我的未来', '离开']
                : [
                    ['人生感悟', '§fill=#ff0§主动出击（新）', '主动出击'][
                    Math.min(SAVE.data.n.shop_bpants_advice, 2)
                    ],
                    '镁塔顿',
                    postSIGMA()
                        ? '突然停电'
                        : ['我们在哪', '§fill=#ff0§老滑头（新）', '老滑头'][Math.min(SAVE.data.n.shop_bpants_hub, 2)],
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
                        '<32>{#p/basic}{#k/7}* 恋爱心得？',
                        "<32>{#k/0}* 小家伙，对于恋爱，\n  我只有一条心得。",
                        "<32>{#k/1}* ...别碰。",
                        "<32>{#k/4}* 当遇到对的人时，\n  一切皆如月下共舞般美妙。",
                        '<32>{#k/0}* 那个老家伙说不定也喜欢你呢。'
                    ]
                    : world.population === 0 || burger()
                        ? [
                            '<32>{#p/basic}{#k/6}* 人生感悟...',
                            "<32>{#k/6}* 哎呀，真没想到呢。\n  阁下在这方面不是\n  经验丰富，知识渊博吗？",
                            "<32>{#k/5}* 依我看，阁下根本不擅长“人生”，\n  只擅长它的反义词：“兽死”吧。"
                        ]
                        : [
                            [
                                "<32>{#p/basic}{#k/6}* 竖起耳朵认真听。\n* 自己的人生，自己做主。\n  为自己而活，生活才会更美好。",
                                '<32>{#k/4}* 我那老板每天对我呼来唤去，\n  不仅每天上班十小时，有时还得\n  无偿加班，工资低的吃不起饭，\n  自己简直过得不如牛马，真不知\n  道这半辈子是怎么过下去的。',
                                '<32>{#k/0}* 不过当我终于开始\n  反抗他的时候...',
                                '<32>{#k/2}* 可以说彻底改变了\n  我们的生活。'
                            ],
                            [
                                "<32>{#p/basic}{#k/6}* 我尽量解释得\n  简单到让你可以理解的程度，\n  小家伙。",
                                '<32>* 就算是一名善良的人，\n  有时也会误入歧途。',
                                '<32>{#k/4}* 变得鼠目寸光，\n  心浮气躁，\n  心狠手辣。',
                                '<33>{#k/4}* 对付这样的人最好的办法\n  是让他们知道你的想法，\n  告诉他们错的有多离谱，\n  让他们好好反省自己。',
                                '<32>{#k/7}* 你越是惯着他们，\n  不反对他们，\n  他们就会越以为自己是对的，\n  然后他们就会陷得越来越深。',
                                "<32>{#k/0}* 不要让人们坠入深渊。"
                            ],
                            [
                                "<32>{#p/basic}{#k/1}* 老弟，我可不是你的人生导师。",
                                '<32>{#k/7}* ...',
                                '<32>{#k/0}* 抱歉。\n* 你只需要... 记住我说的话。'
                            ]
                        ][Math.min(SAVE.data.n.shop_bpants_advice++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/2}* ...',
                        "<32>{#k/4}* 我想我不能就一直\n  取笑那个混蛋。",
                        "<32>{#k/0}* 总有一天，\n  我也将开始新的生活...",
                        '<32>{#k/7}* ...现在，\n  那一天已离我近在咫尺。',
                        '<32>{#k/6}* 不过别担心。\n* 我的“男性魅力”\n  不会因此就消失的。'
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
                                        "<32>{#k/6}* 要是换平常，我肯定骂他两句。\n* 但跟您一比，\n  他简直就是天使啊。",
                                        '<32>{#k/5}* 您也是真有本事，\n  能把人恶心成这样...\n  也算是前无古人了。'
                                    ]
                                    : [
                                        '<32>{#p/basic}{#k/4}* 咋总绕不开他啊...',
                                        "<32>{#k/0}* 是，他算这前哨站上的偶像吧。\n* 大家伙都爱他...",
                                        '<32>{#k/6}* 当然，除了那些真正了解他的人。\n  我无时无刻都想要\n  啐他一脸。',
                                        "<32>{#k/5}* 我说真的。\n* 我在柜台下面摆了个他的塑像，\n  讲话的时候，我就喷他一脸唾沫星子，\n  越多越好。",
                                        "<32>{#k/4}* 你肯定不能感受到\n  我还在他手底下工作时，\n  每天都是种什么心情...",
                                        '<32>{#k/6}* 在他不挡我道时，\n  我优雅地把店里放着的镁塔牌的\n  装饰品全都拆下来了。',
                                        '<32>* 哦，我还把售卖的食物\n  全都给重命名了。',
                                        '<32>{#k/6}* 之前，我把“传说英雄”的拼音\n  声母韵母重组，变成“星园烁宠”。',
'<32>{#k/5}* 有一次，我想要不要再把\n  “星园烁宠”的偏旁部首拆分重组，\n  变成“乐龙灾星二兄”，\n  整整那些老头，想想算了。',
                                        '<32>{#k/0}* ...',
                                        '<32>{#k/7}* 怎么？\n* 你是想让我谈\n  他的生意什么的吗？'
                                    ]
                                : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* 一句话我不想说第二遍。"],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/4}* 去哪呢，去哪呢...',
                        "<32>{#k/0}* 在新的家园，\n  我和我的老朋友葛森\n  要合伙开一家新店。",
                        "<32>{#k/7}* 他说只负责财务就很满足了，\n  然后让我来负责销售。",
                        '<32>{#k/0}* ...只要我能和他在一起就行了。'
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
                                    '<32>{#p/basic}{#k/6}* 嗯？我们在哪？',
                                    '<32>{#k/4}* 这个地方...\n  是有点奇怪...',
                                    '<32>{#k/0}* 国王艾斯戈尔建造它\n  是想“让怪物团结一心”。',
                                    "<32>{#k/7}* 现在则变成了... 这样的地方。\n* 这里可以吃饭，可以休息，\n  有时还会有人来这表演节目。",
                                    '<32>{#k/6}* 哦，忘了说，这里还是\n  他们托管域外网的地方。\n* 由布莱蒂和凯蒂负责管理\n  上面的新闻。',
                                    "<32>{#k/4}* 哦，实际上，\n  这个地方，她们说的算。",
                                    "<32>{#k/0}* 镁塔顿离开后，\n  我就让她们来接手这个地方。\n* 再说，我现在也有\n  自己的事要做...",
                                    "<32>{#k/2}* 也许我只是有点累了。",
                                    "<32>{#k/3}* 但是，听着，\n  当你身边有一个像老滑头\n  这样的家伙时，\n  你难道还有闲空来管\n  别的事吗！？"
                                ],
                                [
                                    '<32>{#p/basic}{#k/6}* 哈哈... 我来告诉你关于这个\n  喜欢招摇过市，而且大愚若智的\n  家伙的那档子事吧。',
                                    '<32>{#k/0}* 在给镁塔打工那会，\n  我经常要做一种\n  叫做“脸排”的东西。',
                                    '<32>{#k/1}* 郑重声明，\n  这种牛排都被印上了镁塔顿\n  那张“无与伦比的美妙”的脸。',
                                    '<32>{#k/3}* 但是老滑头？\n* 老滑头对那牛排爱的要死，\n  并决定将自己的脸印在牛排上，\n  建立起一家属于自己的\n  “牛排企业”！',
                                    "<32>{#k/3}* 还有，更疯狂的是，\n  老滑头往我店柜上丢了一沓钱，\n  就要把我拽出来，让我成为它\n  手下的第一名员工！\n* 就像我是被售卖的一个商品似的！",
                                    "<32>{#k/4}* 当然，镁塔顿不会\n  轻易放我走的，\n  所以我最后还是留在了这里。",
                                    '<32>{#k/0}* 最终，老滑头没有得到想要的。\n  现在老滑头只是四处要求人们\n  加入它的“十字军东征”。',
                                    '<32>{#k/1}* 哦对了。\n* 如果再发生那样的事，\n  我可以把灯关掉。',
                                    "<32>{#k/7}* 像那样害怕黑暗的疯子\n  无法忍受自己不能掌控\n  自己身处的全部情况。"
                                ],
                                [
                                    "<32>{#p/basic}{#k/4}* 老滑头那些事\n  能说的我都说了。",
                                    "<32>{#k/7}* 也许在过去的什么地方\n  隐藏着的什么东西可以解释\n  老滑头为什么要这样做...",
                                    "<32>{#k/1}* 但谁知道呢？"
                                ]
                            ][Math.min(SAVE.data.n.shop_bpants_hub++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/1}* 你把我当啥了，算命的吗？',
                        "<32>{#k/2}* 我哪知道你的未来咋样？",
                        "<32>{#k/4}* 非要我说的话，\n  肯定比过去好。",
                        '<32>{#k/7}* 我总觉得艾斯戈尔话外有话，\n  你们几个可能碰上什么糟心事了，\n  才来了这前哨站。',
                        '<32>{#k/0}* 除了那个强壮的孩子。\n* 我觉得那孩子只是喜欢怪物。'
                    ]
                    : world.population === 0 || burger()
                        ? world.bullied && !burger()
                            ? [
                                '<32>{#p/basic}{#k/5}* 我的未来？\n* 小恶霸，你问我，我也不知道啊...',
                                '<32>{#p/basic}{#k/6}* 之后怎么活，\n  我还想问你呢。'
                            ]
                            : [
                                '<32>{#p/basic}{#k/5}* 哎呦呦呦我最最亲爱的哭哭啼啼\n  又蠢又笨嗜血成性臭不要脸\n  唐的不要不要的小魔头啊...',
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
                b: '<16>{#k/0/0}* 那就，\n  回见啦！',
                c: '<16>* 那就，改天见\n  什么的！',
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
        itemPrompt: '<99>{#p/basic}{#k/0/9}{@fill=#d4bbff}你就该\n把我们的商品\n统统买下来！',
        itemPurchase: [
            "<09>{#p/basic}{#k/1/8}{@fill=#d4bbff}布莱蒂！\n我们发财了！",
            '<09>{#p/basic}{#k/0/4}{@fill=#d4bbff}所以你要\n买吗？？',
            '<09>{#p/basic}{#k/4/5}{@fill=#d4bbff}你的钱\n不够。',
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
                : "<09>{#p/basic}{#k/5/1}{@fill=#d4bbff}我们\n卖光了！\n咪-喵！",
        menu: () =>
            adultEvac() ? ['拿取', '偷窃', '阅读', '离开'] : ['购买', world.meanie ? '偷窃' : '出售', '交谈', '离开'],
        menuPrompt1: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* 快来看看吧！',
        menuPrompt2: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* 走过路过，不要错过。\n  别急着走嘛。',
        menuPrompt3: () =>
            world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是谁也没有来。',
        note: () => [
            "<32>{#p/basic}* 你找到几张字条。",
            {
                b: '<16>* “既然你看到了\n   这段话...”',
                c: world.bullied
                    ? '<16>* “那么，有个坏消息\n   等着你，\n   招人烦的怪胎！”'
                    : '<16>* “那么，有个坏消息\n   等着你，\n   没良心的怪胎！”'
            },
            ...(SAVE.data.n.plot === 72 && !world.runaway
                ? [
                    {
                        b: '<16>* “我们才不想\n   再回到这，等着...”',
                        c: '<16>* “...等着你把我们\n   都揍个遍。”'
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
                        b: '<16>* “字条你爱看看，\n   不看拉倒！”',
                        c: '<16>* “喵哈哈！！！”'
                    },
                    { b: '<16>* “此致，\n   布莱蒂 <3”', c: '<16>* “此致，\n   凯蒂 <3”' }
                ]
                : [
                    ...[
                        [
                            !world.badder_lizard
                                ? {
                                    b: '<16>* “我们才不想\n   在这傻等，\n   等着...”',
                                    c: '<16>* “...等着你把我们\n   都揍个遍。”'
                                }
                                : {
                                    b: '<16>* “刚刚，\n   艾菲斯来到这里，\n   把我们带到...”',
                                    c: '<16>* “...带到一个\n   炒鸡安全的\n   地方！”'
                                },
                            {
                                b: '<16>* “不过，走之前，\n   我们得把这些彩笔\n   用完。”',
                                c: !world.badder_lizard
                                    ? '<16>* “是的呢。\n   咱可不能\n   糟蹋笔！”'
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
                                c: '<16>* “...带到一个\n   炒鸡安全的\n   地方！”'
                            },
                            { b: '<16>* “不过，艾菲斯...”', c: '<16>* “对，艾菲斯。”' },
                            { b: '<16>* “她看起来...”', c: '<16>* “...肺都要\n   气炸了。”' },
                            {
                                b: '<16>* “第一次看到她\n   气成那样。”',
                                c: '<16>* “第一次看到\n   有人会\n   气成那样。”',
                                s: true
                            },
                            { b: '<16>* “而且，\n   镁塔顿...”', c: '<16>* “...也不咋高兴。”' },
                            {
                                b: '<16>* “他说要扇死你。”',
                                c: '<16>* “他说要踹死你！”',
                                s: true
                            },
                            { b: '<16>* “哦，他好像还说\n   要彻底灭了你。\n   ...是吧？”', c: '<16>* “呃... 忘了。”' },
                            { b: '<16>* “反正，看到这，\n   你肯定都\n   吓尿裤子了呢。”', c: '<16>* “哎呀，\n   说得太对了...”' }
                        ]
                    ][Math.max(world.bad_lizard - 2, 0)],
                    {
                        b: '<16>* “总之，\n   你就是个废物，\n   彻头彻尾的\n   废物。”',
                        c: '<16>* “对！”\n* “废物！！”\n* “喵哈哈！！！”'
                    },
                    { b: '<16>* “此致，\n   布莱蒂 <3”', c: '<16>* “此致，\n   凯蒂 <3”', s: true }
                ])
        ],
        sell1: () =>
            adultEvac()
                ? ['<30>{#p/human}* （你从收银机里拿走了5G。）']
                : world.meanie
                    ? [
                        {
                            b: '<16>{#k/2/6}* 呃，等一下？',
                            c: '<16>{#k/2/6}* 那个，你在干啥？'
                        },
                        {
                            b: "<16>{#k/1/0}* 不付钱，想让姐俩\n  把东西送你？\n* 没门！",
                            c: '<16>{#k/1/0}* 没错，想偷东西\n  别来我们这儿！'
                        }
                    ]
                    : SAVE.storage.inventory.has('glamburger') // NO-TRANSLATE

                        ? [
                            {
                                b: '<16>{#k/7/0}* 哇哦。\n* 你真把新款\n  “猛男汉堡”买来了。',
                                c: "<16>{#k/2/2}* 给我给我！！\n  你的存货我包了！！"
                            },
                            {
                                b: '<16>{#k/4/6}* 天呐，凯蒂。\n* 有点自制力\n  行不行。',
                                c: '<16>{#k/4/4}* 抱歉...'
                            },
                            {
                                b: "<16>{#k/3/5}* 汉堡明显是\n  给我带的。",
                                c: '<16>{#k/5/8}* 才~怪~呢！！！'
                            }
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                {
                                    b: "<16>{#k/0/6}* 谢啦，但我们，\n  那个，真的\n  不需要任何\n  东西。",
                                    c: ''
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/0}* 好吧，\n  听你的。"
                                }
                            ]
                            : [
                                {
                                    b: "<16>{#k/0/0}* 谢啦，但我们，\n  那个，真的\n  不需要任何\n  东西。",
                                    c: '<16>{#k/0/8}* 哦天啊，\n  你能不能\n  帮我们带点\n  猛男汉堡？'
                                },
                                {
                                    b: "<16>{#k/2/8}* 我们。\n* 并不。\n* 需要什么。",
                                    c: "<16>{#k/1/7}* 等等！如果\n  你能让镁塔顿\n  在我的屁股上\n  签名的话我会\n  付你1000G！"
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
                            b: "<16>{#k/5/1}* 要不是看在你\n  这么弱智的\n  份上，我们就\n  把你踹飞了。",
                            c: "<16>{#k/5/1}* 要不是看在你\n  这么可爱的\n  份上，我们就\n  把你踹飞了。",
                            s: true
                        }
                    ]
                    : [
                        {
                            b: '<16>{#k/1/0}* 如果你真的\n  想给我们\n  东西的话...',
                            c: '<16>{#k/1/2}* ...你可以把\n  东西放在\n  空境的\n  存放处！'
                        },
                        {
                            b: '<16>{#k/2/0}* 但人家可能\n  不知道那个\n  地方在哪里\n  吧？',
                            c: "<16>{#k/2/4}* 天啊确实\n  有道理...\n  可能人家\n  不知道呢..."
                        },
                        {
                            b: "<16>{#k/5/8}* 可能得你\n  自己去找了！",
                            c: "<16>* 可能得你\n  自己去找了！",
                            s: true
                        }
                    ],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['大伙没事吧', '神祇出现了', '域外网咋关了', '聊聊人类', '离开']
                : [
                    '聊聊你俩',
                    SAVE.data.n.plot < 68 ? '聊聊这旧货铺' : SAVE.data.b.killed_mettaton ? '镁塔顿' : '压轴好戏',
                    ['这地方归谁', '§fill=#ff0§堡兄（新）', '堡兄'][Math.min(SAVE.data.n.shop_gossip_hub, 2)],
                    ['艾菲斯', '§fill=#ff0§皇家科学员（新）', '§fill=#ff0§艾斯戈尔（新）', '艾斯戈尔'][
                    Math.min(SAVE.data.n.shop_gossip_alphys, 3)
                    ],
                    '离开'
                ],
        talkPrompt: "<09>{#p/basic}{#k/0/0}{@fill=#ffbbdc}所以，就，\n有事吗？",
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/4/6}* 哈？',
                            c: '<16>{#k/4/4}* 我们没事吗？'
                        },
                        {
                            
                            b: '<16>{#k/2/6/0}',
                            c: '',
                            s: true
                        },
                        '{*}{#s/meow}{%}',
                        {
                            b: "<16>{#k/6/8}* 呣呼呼，\n  你真可爱呢。",
                            c: "<16>* 我们当然没事！",
                            s: true
                        },
                        '{*}{#k/0/0/1}{%}'
                    ]
                    : [
                        {
                            b: "<16>{#k/0/0}* 我叫布莱蒂，\n  而这位是我\n  最要好的闺蜜，\n  凯蒂。",
                            c: "<16>* 我叫凯蒂，\n  而这位是我\n  最要好的闺蜜，\n  布莱蒂。",
                            s: true
                        },
                        {
                            
                            b: '<16>{#k/2/6/0}',
                            c: '',
                            s: true
                        },
                        '{*}{#s/meow}{%}',
                        {
                            b: '<16>{#k/5/8}* 呣呼呼！',
                            c: '<16>* 喵哈哈！',
                            s: true
                        },
                        '{*}{#k/0/0/1}{%}'
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/0/6}* 那就像...\n  哇靠...',
                            c: '<16>{#k/0/2}* 不不，那就像...\n  我的天呐...'
                        },
                        {
                            b: '',
                            c: '<16>{#k/0/1}* 当我第一次\n  见到那位时...',
                            s: true
                        },
                        {
                            b: "<16>{#k/2/6}* 别跟我说。",
                            c: '',
                            s: true
                        },
                        {
                            b: "<16>{#k/5/8}* 你就是想和那位\n  出去约会！",
                            c: "<16>* 我就是想和那位\n  谈恋爱！",
                            s: true
                        },
                        {
                            b: '<16>{#k/6/0}* 哦，确实。\n  你肯定会的。',
                            c: "<16>{#k/6/7}* 谁不想和\n  一位神祇\n  谈对象呢？"
                        }
                    ]
                    : SAVE.data.n.plot < 68
                        ? [
                            {
                                b: "<16>{#k/0/6}* 其实这就是个，呃，\n  二手商店。",
                                c: "<16>{#k/0/2}* 不对应该说，\n  比较像零售店！"
                            },
                            {
                                b: '',
                                c: '<16>{#k/2/9}* 看看我们\n  天才般的\n  商业模式...',
                                s: true
                            },
                            {
                                b: '<16>{#k/0/6}* 大家把他们的\n  旧垃圾卖给\n  我们...',
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/5/8}* ...这样一来\n  我们就可以再\n  把这些东西\n  卖出去了！',
                                c: '<16>* ...这样一来\n  我们就可以再\n  把这些东西\n  卖出去了！',
                                s: true
                            },
                            {
                                b: "<16>{#k/0/1}* 你在其他的\n  任何地方都\n  找不到这么\n  牛逼的店。",
                                c: "<16>* 你在其他的\n  任何地方都\n  找不到我们\n  这样的店。",
                                s: true
                            }
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                {
                                    b: '<16>{#k/4/4}* 镁塔顿，\n  是吧？',
                                    c: '<16>* 镁塔顿，\n  哈？',
                                    s: true
                                },
                                {
                                    b: '<16>{#k/2/6/0}',
                                    c: '',
                                    s: true
                                },
                                {
                                    b: "<16>{#k/7/5}* 我们不咋想\n  谈论他。",
                                    c: "<16>{#k/7/5}* 他比你强多了。"
                                }
                            ]
                            : [
                                {
                                    b: '<16>{#k/1/7}* 当然。',
                                    c: '<16>* 哦天，当然是！',
                                    s: true
                                },
                                {
                                    b: '<16>{#k/0/0}* 你和镁塔顿的\n  表演太赞了！',
                                    c: '<16>{#k/0/2}* 对，你俩简直\n  太酷了！'
                                },
                                {
                                    b: '<16>{#k/4/6}* 我真希望我在\n  舞台上也能\n  那样表演...',
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/8}* 你想看一些\n  动作吗？\n* 我可以跳舞！",
                                    s: true
                                },
                                {
                                    b: '<16>{#k/1/8}* 我要给你俩\n  办一场舞会！',
                                    c: "<16>{#k/2/7}* 那时你可以\n  邀请人类共舞！"
                                },
                                {
                                    b: "<16>{#k/0/0}* ...等着瞧好了。",
                                    c: '',
                                    s: true
                                }
                            ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/0/6}* 啊，那玩意现在\n  太耗电了。',
                            c: "<16>{#k/0/5}* 力场可是核心的\n  主要能源。"
                        },
                        {
                            b: '<16>{#k/2/6}* 但当我们到达\n  新的家园后...',
                            c: '<16>* 但当我们搬进\n  新家后...',
                            s: true
                        },
                        {
                            b: '',
                            c: "<16>{#k/0/1}* 我们将重新\n  建立一个\n  新域外网。",
                            s: true
                        },
                        {
                            b: '<16>{#k/2/6}* 运营一个\n  新域外网会让我\n  们大赚特赚的...',
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: '<16>{#k/4/0}* 我们会买上\n  一辈子都吃不完\n  的猛男汉堡！',
                            s: true
                        },
                        {
                            b: '<16>{#k/0/6}* 凯蒂。\n* 为啥你第一件事\n  就是想买这个？',
                            c: "<16>{#k/0/7}* 不行吗！"
                        }
                    ]
                    : [
                        [
                            {
                                b: "<16>{#k/2/1}* 啊没错，严格说来\n  我们就是主人。",
                                c: '<16>* 啊没错，这地儿\n  可以算归我们管。', 
                                s: true
                            },
                            ...(SAVE.data.b.killed_mettaton
                                ? [
                                    {
                                        b: '<16>{#k/2/6}* 所以，\n  原来...',
                                        c: '<16>* ...啥？'
                                    },
                                    {
                                        b: '<16>{#k/0/5}* 呃...\n* 没事。',
                                        c: ''
                                    },
                                    {
                                        b: '',
                                        c: "<16>{#k/6/8}* 哦，明白了。\n* 对，\n  我们不提这个！"
                                    },
                                    {
                                        b: "<16>{#k/1/0}* 无论如何，\n  是堡兄\n  让我们负责的。",
                                        c: "<16>* 姐俩也没质疑过\n  这码事。"
                                    }
                                ]
                                : [
                                    {
                                        b: '<16>{#k/2/1}* 那个，一开始，这儿\n  归镁塔顿来着，\n  对吧？',
                                        c: '<16>{#k/1/1}* 完完全全。'
                                    },
                                    {
                                        b: '<16>{#k/2/5}* 不过后来...',
                                        c: '<16>* 后来呢...'
                                    },
                                    {
                                        b: '<16>{#k/4/4}* 堡兄决定“推翻”他。',
                                        c: '',
                                        s: true
                                    },
                                    {
                                        b: '',
                                        c: '<16>{#k/2/4}* 于是就通过，\n  那种，很\n  强硬的言辞\n  去跟他对线。',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6/0}',
                                        c: '',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* 我觉得吧，\n  堡兄就是\n  敲诈了他一手。',
                                        c: '<16>* 我觉得吧，\n  他肯定还\n  找了个同谋。',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/1/0/1}* 话又说回来，\n  后来他说这一带\n  可以让我们管。',
                                        c: "<16>* 姐俩也没质疑过\n  这码事。"
                                    }
                                ])
                        ],
                        [
                            {
                                b: '<16>{#k/2/0}* 堡兄？',
                                c: '',
                                s: true
                            },
                            {
                                b: "<16>{#k/0/5}* 啊，他人还不错。",
                                c: "<16>* 哎呀，他还挺酷的。",
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* 以前，他待在\n  姐俩身边的时候，\n  表现得不咋自然，\n  不过...',
                                c: '<16>* ...他现在\n  不咋和人来往了。'
                            },
                            {
                                b: '<16>{#k/0/5}* 就比如，\n  我们最后一次\n  听到他的\n  消息...',
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/0/5}* 他说他不打算\n  “追逐幻想”了\n  什么的。',
                                c: '<16>* 他说他不打算\n  “追逐爱情”了\n  什么的。',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* 听起来就像...',
                                c: '<16>* 感觉就像...',
                                s: true
                            },
                            {
                                b: '<16>{#k/5/8}* 他完全把\n  我们当成\n  幻想了。',
                                c: '<16>* 他肯定是\n  喜欢上\n  我们了。',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/4/5}* 可惜他还没\n  跟我们约过吧？',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/5}* 凯蒂，我们保准会\n  回绝他的。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/2/1}* ...说不准\n  会答应呢？',
                                s: true
                            },
                            {
                                b: '<16>{#k/4/1}* 回绝。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/4/8}* 答应。',
                                s: true
                            },
                            {
                                b: '<16>{#k/1/8}* 回绝。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/1/7}* 答-应！',
                                s: true
                            },
                            {
                                b: '<16>{#k/4/7}* ...',
                                c: '',
                                s: true
                            },
                            {
                                b: "<16>{#k/5/6}* 凯蒂，\n  你就没有一点\n  原则吗？",
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/5/8}* 没呀！！！',
                                s: true
                            }
                        ],
                        [
                            {
                                b: "<16>{#k/0/0}* 关于堡兄，\n  我们没啥好说的了，\n  不过-",
                                c: '<16>{#k/0/8}* ...不，等下！\n* 你能让他给姐俩\n  做点吃的吗？'
                            },
                            {
                                b: '<16>{#k/4/8}* 凯蒂！',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: "<16>{#k/4/1}* 怎么？\n* 你知道的，\n  他这样的渣男\n  我随时都\n  可以接受的。",
                                s: true
                            },
                            {
                                b: '<16>{#k/2/4/0}',
                                c: '',
                                s: true
                            },
                            '{*}{#s/meow}{%}',
                            {
                                b: '<16>{#k/2/8}* 你居然\n  说出来了啊。',
                                c: '<16>* 喵-嗷！',
                                s: true
                            },
                            '{*}{#k/0/0/1}{%}'
                        ]
                    ][Math.min(SAVE.data.n.shop_gossip_hub++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/2/0}* 那些人类？',
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: '<16>{#k/0/0}* 哦对，艾菲斯\n  让我们领养了\n  一个。',
                            s: true
                        },
                        {
                            b: "<16>{#k/2/5}* 我是说，那人类\n  现在还在睡觉，\n  但是...",
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: "<16>{#k/7/5}* ...很快就会\n  醒来的。",
                            s: true
                        },
                        {
                            b: '<16>{#k/2/6}* 想知道那人类\n  会怎么谈起\n  “档案”\n  那玩意...',
                            c: '<16>{#k/2/6}* 对，\n  那玩意...'
                        },
                        {
                            b: '',
                            c: "<16>{#k/2/4}* 艾斯戈尔不就是\n  把所有人类都\n  藏在那里了吗？",
                            s: true
                        },
                        {
                            b: '<16>{#k/0/0}* 你怎么能保守\n  那样的秘密的。',
                            c: '<16>* 难以想象啊！',
                            s: true
                        }
                    ]
                    : [
                        [
                            { b: '<16>{#k/4/4}* 天呐。\n* 你说艾菲斯。', c: '<16>* 天呐，\n  你说艾菲斯。', s: true },
                            {
                                b: '<16>{#k/5/8}* 她以前跟我们\n  住在同一个\n  塔楼里！',
                                c: '<16>* 她就和个\n  大姐姐一样！',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* 我的意思是，\n  就，如果你的\n  大姐姐...',
                                c: '<16>{#k/2/2}* ...也会带你\n  来一场\n  轰轰烈烈的\n  淘星际垃圾\n  热的话！'
                            },
                            {
                                b: '<16>{#k/0/0}* 她向我们\n  展示了最酷的\n  找东西的\n  方法。',
                                c: '<16>* 她收集了好多\n  超级赞的\n  科幻收藏。',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/4}* 然后她就成为\n  皇家科学员了...',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: "<16>{#k/0/5}* ...也没有时间\n  再去淘垃圾了。",
                                s: true
                            }
                        ],
                        [
                            {
                                b: '<16>{#k/0/6}* 所以艾菲斯\n  总是，就，',
                                c: '<16>{#k/0/0}* ...超级无敌聪明。'
                            },
                            { b: '<16>{#k/2/4}* 怎么说呢...', c: '<16>* 聪明到\n  不正常了。' },
                            {
                                b: '<16>{#k/0/0}* 就比方说，\n  她可以在\n  五秒钟内...',
                                c: '<16>{#k/0/2}* ...心算\n  求导结果！'
                            },
                            {
                                b: "<16>{#k/0/0}* 过于让人\n  印象深刻了...",
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/5}* ...但结果是，\n  她有的时候\n  会克制不住\n  自己的冲动。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/1/6}* 我记得有一次\n  她叫来了\n  一半的\n  皇家卫队...',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/5/4}* ...就是为了\n  告诉他们\n  她刚才发现了\n  一些“有趣的\n  垃圾”。',
                                s: true
                            },
                            {
                                b: "<16>{#k/2/6}* 给人感觉...",
                                c: "<16>* 她处理事情的\n  方式和\n  大多数人\n  不太一样。"
                            },
                            {
                                b: "<16>{#k/5/8}* 但我们就是\n  喜欢她那样，\n  是吧？",
                                c: "<16>* 但我们还是\n  觉得她实在\n  太-厉-害-了！",
                                s: true
                            },
                            {
                                b: '<16>{#k/4/0}* 所以就...\n  很显然\n  艾斯戈尔就这样\n  任命她为皇家\n  科学家了。',
                                c: '<16>{#k/0/2}* 哦，\n  那是肯定的！'
                            }
                        ],
                        [
                            {
                                b: '<16>{#k/0/0}* 哦对了，\n  那个傻乎乎的\n  家伙。',
                                c: '<17>{#k/0/8}* 哦，那个\n  毛茸茸的小毛球！',
                                s: true
                            },
                            {
                                b: "<16>{#k/2/0}* 所以就，\n  我们能告诉\n  你的就是...",
                                c: "<16>* ...他是你这辈子\n  能见到的\n  最好的人之一。"
                            },
                            ...[
                                [
                                    {
                                        b: '<16>{#k/2/0}* 但是，\n  与此同时...',
                                        c: '<16>{#k/2/4}* ...大家想\n  让他做的事\n  都...'
                                    },
                                    {
                                        b: "<16>{#k/4/5}* ...有点\n  恶心了。",
                                        c: "<16>* ...简直\n  太可怕了。",
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* 我听说那次\n  安黛因想扩编\n  皇家卫队。',
                                        c: "<16>{#k/2/6}* 是啊，\n  我记得，就，\n  艾斯戈尔是\n  第一个反对的\n  吧？"
                                    }
                                ],
                                [
                                    {
                                        b: '<16>{#k/2/0}* 但是，\n  与此同时...',
                                        c: "<16>{#k/2/4}* ...你在外面\n  做的\n  那些事..."
                                    },
                                    {
                                        b: "<16>{#k/4/5}* ...让他的工作\n  更困难了。",
                                        c: "<16>* ...让他的生活\n  更难过了。",
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* 意思\n  就是说...',
                                        c: "<16>{#k/2/6}* ...你可以\n  别再杀人\n  了吗？"
                                    }
                                ]
                            ][world.bad_lizard],
                            {
                                b: '<16>{#k/3/6}* 天啊。\n* 我真的好想\n  现在就给他\n  一个抱抱。',
                                c: '<16>{#k/3/2}* 是啊，\n  我们之后一定\n  要把他给彻底\n  榨干！'
                            },
                            {
                                b: '<16>{#k/4/5/0}* ...',
                                c: '<16>* ...',
                                s: true
                            },
                            '{*}{#s/meow}{%}',
                            {
                                b: '<16>{#k/5/8}* 凯蒂，\n  别啊！',
                                c: '<16>* 喵哈哈！',
                                s: true
                            },
                            '{*}{#k/0/0/1}{%}'
                        ],
                        [
                            [
                                {
                                    b: "<16>{#k/0/0}* 嘿，其实\n  没必要那么\n  怕他的。",
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/1}* 是啊，\n  他实在是\n  太可爱了。",
                                    s: true
                                },
                                {
                                    b: '<16>{#k/5/1}* 超可爱！',
                                    c: '',
                                    s: true
                                }
                            ],
                            [
                                {
                                    b: "<16>{#k/0/0}* 嘿，我相信他会\n  理解你为什么\n  这样做的。",
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/2}* 对，毕竟他就像\n  艾斯戈尔一样！",
                                    s: true
                                },
                                {
                                    b: "<16>{#k/4/6}* 这基本就是\n  他的工作。",
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
                            '<32>{#p/human}* （得知你的大部分旅程都被\n  记录在皇家实验室...）',
                            '<32>* （这种想法使你充满了决心。）'
                        ]
                        : [
                            '<32>{#p/human}* （得知你的一举一动\n  都被记录在皇家实验室...）',
                            '<32>* （这种想法使你充满了决心。）'
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
                            '<32>{#p/human}* （尽管你可能再也\n  用不到喷气背包了...）',
                            "<32>{#p/human}* （你在整个前哨站的冒险经历\n  仍然使你充满决心。）"
                        ]
                        : [
                            '<32>{#p/human}* （尽管你可能再也\n  用不到喷气背包了...）',
                            "<32>{#p/human}* （到目前为止的冒险经历\n  使你充满了决心。）"
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
                        ? ['<32>{#p/human}* （在即将到来的演出前\n  后退一步使你充满了决心。）']
                        : world.bad_robot
                            ? ['<32>{#p/human}* （反思你的战斗之路\n  使你充满了决心。）']
                            : SAVE.data.b.killed_mettaton
                                ? ['<32>{#p/human}* （反思这样一个虎头蛇尾的结局\n  使你充满了决心。）']
                                : SAVE.data.b.a_state_hapstablook
                                    ? ['<32>{#p/human}* （了解到镁塔顿的经历\n  使你充满了决心。）']
                                    : ['<32>{#p/human}* （回顾你的成名之路\n  使你充满了决心。）']
        },
        a_split: {
            name: '空境 - 喷泉',
            text: () =>
                SAVE.data.n.plot < 65
                    ? SAVE.data.b.a_state_hapstablook
                        ? ["<32>{#p/human}* （对将要干预镁塔顿的预感\n  使你充满决心。）"]
                        : ['<32>{#p/human}* （这座建在荒无人烟的地方的喷泉\n  使你充满了决心。）']
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/human}* （再次凝视这个喷泉\n  使你充满了决心。）']
                        : world.bad_robot || SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/human}* （喷泉里的果酒不好喝了。）',
                                '<32>* （当然，\n  这使你充满了决心。）'
                            ]
                            : SAVE.data.b.a_state_hapstablook
                                ? [
                                    '<32>{#p/human}* （喷泉里的果酒更好喝了。）',
                                    '<32>* （当然，\n  这使你充满了决心。）'
                                ]
                                : [
                                    '<32>{#p/human}* （喷泉中的果酒味道一如往日。）',
                                    '<32>* （当然，\n  这使你充满了决心。）'
                                ]
        },
        a_aftershow: {
            name: '空境 - 休闲回廊',
            text: () =>
                SAVE.data.b.ubershortcut
                    ? ['<32>{#p/human}* （坐运输船前往陌生之地\n  让你充满了决心。）']
                    : 68 <= SAVE.data.n.plot
                        ? ['<32>{#p/human}* （重返这烂棒子破窝\n  使你充满了决心。）']
                        : SAVE.data.b.a_state_hapstablook
                            ? ["<32>{#p/human}* （了解到镁塔顿的幕后故事\n  使你充满了决心。）"]
                            : ['<32>{#p/human}* （那场过于戏剧化的音乐剧\n  使你充满了决心。）']
        },
        a_core_entry1: {
            name: '空境 - 核心',
            text: ['<32>{#p/human}* （这一带冰冷的机械之美\n  使你充满了决心。）']
        },
        a_core_checkpoint: {
            name: '核心 - 维护区',
            text: () =>
                SAVE.data.b.ubershortcut
                    ? ['<32>{#p/human}* （平稳宁静的气流\n  使你充满了决心。）']
                    : SAVE.data.n.plot < 68
                        ? ["<32>{#p/human}* （对镁塔顿压轴好戏的期待\n  使你充满了决心。）"]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （核心的能量即将耗竭...）',
                                '<32>{#p/human}* （这使你充满了决心。）'
                            ]
                            : [
                                '<32>{#p/human}* （不知为何，\n  你回到了核心...）',
                                '<32>{#p/human}* （这使你充满了决心。）'
                            ]
        }
    }
};


// END-TRANSLATE
