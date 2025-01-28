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
                ? ['<32>{#p/human}* （看來控制臺\n  超出了你的訪問級別。）']
                : world.runaway
                    ? ["<32>{#p/basic}* 核心控制臺。\n* 看來，能量所剩不多了。"]
                    : [
                        world.postnoot
                            ? "<32>{#p/basic}* 核心控制臺。\n* 近期，供氣系統被人動過手腳。"
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? "<32>{#p/basic}* 核心控制臺。\n* 看來，能量所剩無幾了。"
                                : "<32>{#p/basic}* 核心控制臺。\n* 看來一切正常。",
                        ...(!world.genocide && !world.badder_lizard && SAVE.data.b.a_state_corecall && SAVE.data.n.plot < 68
                            ? [
                                ["<25>{#p/alphys}{#g/alphysOhGodNo}* 請別碰！！"],
                                ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 別玩了。'],
                                ['<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'],
                                []
                            ][Math.min(SAVE.data.n.state_aerialis_terminter++, 3)]
                            : [])
                    ]),
            ...(world.meanie && !world.genocide && world.badder_lizard
                ? [
                    "<32>{#p/human}* （你發現四下無人。）",
                    "<32>{#p/human}* （你萌生了一個想法。）\n* （雖然你深知，這會直接摧毀\n  整個前哨站的大氣系統，但...）",
                    choicer.create('* （砸爛控制臺嗎？）', '砸爛', '算了')
                ]
                : [])
        ],
        termsmash1: ['<32>{#p/human}* （你放棄了砸終端的念頭。）'],
        termsmash2: ['<32>{#p/human}* （你揮動武器，砸了下去...）'],
        puzzlenoot1: () => [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            world.nootflags.has('a_barricade1') // NO-TRANSLATE

                ? '<25>{#p/alphys}{#g/alphysInquisitive}* 這謎題自己被解決了？'
                : "<25>{#p/alphys}{#g/alphysInquisitive}* 啊，這謎題\n  已經被解決了。",
            '<25>{#p/alphys}{#g/alphysFR}* 怪事。',
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        puzzlenoot2: () => [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            world.nootflags.has('a_puzzle1') // NO-TRANSLATE

                ? "<25>{#p/alphys}{#g/alphysWelp}* 還有這個。\n* 也被解決了。"
                : "<25>{#p/alphys}{#g/alphysWelp}* 啊...\n  看來這謎題已經被某人解決了。",
            "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 還挺省事的！！",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        noequip: ['<32>{#p/human}* （你打算不這麼做。）'],
        evac: ['<32>{#p/human}* （你感覺周圍的怪物越來越少了。）'],
        endo: ['<32>{#p/human}* （你注意到這桌子的質量堪憂。）'],
        businessKILLER: [
            '<32>{#p/basic}{#npc/a}* 只是想讓你知道，小子...',
            "<32>* 皇家衛隊很快\n  就會將你繩之以法。",
            "<32>* 所以啊，準備跑路吧小子。",
            "<32>* 但這只是我的態度罷了。"
        ],
        harpyKILLER: ["<32>{#p/basic}* 呼嘿嘿吼...\n* 我嘞個天，\n  我感覺我有性命之憂！"],
        shopclosed: ['<32>{#p/human}* （沒必要再踏足了。）'],
        afear: [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* 呃，嘿...',
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* 抱歉讓你...\n  逃跑什麼的...',
            '<25>{#p/alphys}{#g/alphysIDK}* ...',
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* 你還好對吧？\n* 你沒有...",
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* 你沒有再惹出什麼麻煩，\n  對吧？",
            '<25>{#p/alphys}{#g/alphysSideSad}* ...',
            "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* 請...\n* 別再做什麼瘋狂的事了，\n  好嗎？",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        escape: [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            '<25>{#p/alphys}{#g/alphysCutscene1}* 太好了，你逃過來了！',
            '<25>{#g/alphysInquisitive}* 對了，剛才打電話時，\n  我怕被發現，就沒開影片...',
            '<25>{#g/alphysYeahYouKnowWhatsUp}* 你別介意...',
            "<25>{#g/alphysIDK}* 當時...\n  我-我真挺慌的。",
            '<25>{#g/alphysNervousLaugh}* 不過我給你支的招\n  好像挺有用？',
            '<25>{#g/alphysNeutralSweat}* 呃，其實...',
            "<25>* Undyne還在追殺你。",
            '<25>{#g/alphysNervousLaugh}* 我把空境的電梯停掉了，\n  可她有噴氣背包，\n  早晚也會飛過來的。',
            
            '<25>{#g/alphysNeutralSweat}* 所以...\n  你-你千萬別逗留，快走。',
            "<25>* 另一臺電梯離這兒不遠。\n* 你肯定找得到！",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        approachescape: ['<32>{#p/human}* （你聽到腳步聲逐漸消失在遠方。）'],
        puzzlehelp: [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            "<25>{#p/alphys}{#g/alphysWelp}* 打你電話只是跟你\n  說一下，如果遇到困難\n  可以隨時找我幫忙。",
            "<25>{#p/alphys}{#g/alphysCutscene2}* 你在這個房間探索的時候，\n  我會把我的手機\n  一直開著的！",
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        riverboi1: () => [
            '<32>{#p/basic}{#npc/a}* 我是旅人。\n* 我可以駕駛我的運輸船\n  帶你周遊前哨站。',
            '<32>* 你想去哪呢？',
            choicer.create(
                '* （你要怎麼回答？）',
                game.room === 'w_wonder' // NO-TRANSLATE

                    ? '取消'
                    : '外域',
                game.room === 's_taxi' // NO-TRANSLATE

                    ? '取消'
                    : '星港',
                game.room === 'f_taxi' // NO-TRANSLATE

                    ? '取消'
                    : '鑄廠',
                game.room === 'a_lookout' // NO-TRANSLATE

                    ? '取消'
                    : '空境'
            )
        ],
        riverboi2: pager.create(
            2,
            ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速開的很快。\n* 運氣不錯..."],
            ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速開的很快。\n* 運氣有點背..."],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 有時候也記得要休息一下...'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 大家都知道\n  那首從音樂盒裡傳來的老歌...',
                '<32>{#p/basic}{#npc/a}* ...你知道它還有別的版本嗎？\n* 前幾段還行。'
            ],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 不要把手腳伸出船外...',
                '<32>{#p/basic}{#npc/a}* ...當然，\n  管好你的靈魂才是最重要的。'
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 我聽聞Toriel有一款鍾情的飲品。'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 我聽聞Asgore有一款鍾情的美食。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 謹記我們偉大的國王Erogot...',
                '<32>{#p/basic}{#npc/a}* ...以及他的兒子。'
            ],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* Temmie村莊...',
                '<32>{#p/basic}{#npc/a}* ...坐落在短梯子左邊的房間裡。'
            ],
            ["<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 要不要和我一同輕唱幾聲？\n* 恰啦啦。"],
            ["<32>{#p/basic}{#npc/a}* 嗯哼哼...\n* 嗯哼哼...\n* 這是我的小型音樂會。"],
            ['<32>{#p/basic}{#npc/a}* 摸摸摸...\n* 脖子延伸到宇宙。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 記得付路費...',
                '<32>{#p/basic}{#npc/a}* ...時間與空間都彌足珍貴。'
            ],
            ['<32>{#p/basic}{#npc/a}* 人類，怪物...\n* 群星。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 玉米熱狗，多多益善...',
                '<32>{#p/basic}{#npc/a}* ...要是它們能一直\n  待在你頭上就好了。'
            ],
            [
                "<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 別隨便偷看別人的工作場所...",
                '<32>{#p/basic}{#npc/a}* ...他們可能會把你當成小偷。'
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速路上有點顛簸。'],
            ['<33>{#p/basic}{#npc/a}* 恰啦啦。\n* 今天太空高速路上很平穩。'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦\n* 皇家科學員也有自己的秘密...'],
            ['<32>{#p/basic}{#npc/a}* 一，二，三，四，五，六...', '<32>* ...已經到極限了。'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 那個機器人巨星也有著不幸的過去...'],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 嘀哩哩。\n* 啼嘞嘞。'],
            
            ['<32>{#p/basic}{#npc/a}* 叮嚕嚕。\n* 吐嚕嚕。', '<32>* ...啊啦，擬音字都用完了。'],
            [
                '<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 記得每天都要吃一個幽靈水果。',
                "<32>{#p/basic}{#npc/a}* ...為什麼？\n* 這樣我就知道你有聽我的話了..."
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 你有沒有聽說過群星之歌？'],
            [
                "<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 有什麼遊戲可以和狗狗一起玩呢？",
                '<32>{#p/basic}{#npc/a}* ...問問你的朋友吧。'
            ],
            ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 狗子的公道，\n  何處不是狗子的公道。']
        ),
        riverboi2x: ['<32>{#p/basic}{#npc/a}* 恰啦啦。\n* 沒時間閒言碎語了。'],
        riverboi3: () => [
            '<32>{#p/basic}{#npc/a}* 我是旅人。\n* Alphys博士叫我來接你。',
            '<32>* 去空境嗎？',
            choicer.create('* （你要怎麼回答？）', '出發', '再等等')
        ],
        riverboi4: ['<32>{#p/basic}{#npc/a}* 感謝乘坐運輸船。\n* 我的任務完成了。'],
        papinter1: pager.create(
            0,
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? [
                        '<18>{#p/papyrus}你好，人類！',
                        "<18>{#p/papyrus}很高興你終於\n和我說話了。",
                        "<18>{#f/4}這地方有好多\n好玩的...",
                        '<18>{#f/0}你去過\n保齡球館了嗎？',
                        '<18>{#f/9}或者更棒的\n遊泳池！',
                        ...(SAVE.data.b.killed_mettaton
                            ? [
                                '<18>{#f/4}這倆現在\n都關門了...',
                                '<18>{#f/5}...就只是為了紀念\nMETTATON所謂的\n「死亡」。'
                            ]
                            : [
                                '<18>{#f/4}這倆地方都可以\n乘坐運輸船到達...',
                                '<18>{#f/5}...但這倆地方只適\n合10歲以上的人。'
                            ])
                    ]
                    : [
                        '<18>{#p/papyrus}你好，人類！',
                        "<18>{#p/papyrus}你終於到這裡了。",
                        "<18>{#f/4}這地方有好多\n好玩的...",
                        '<18>{#f/0}你去過\n保齡球館了嗎？',
                        '<25>{#p/undyne}{#f/17}* 認真的，Papyrus？\n* 保齡球？',
                        '<25>{#p/undyne}{#f/8}* 魔法藝術俱樂部\n  顯然更好！',
                        "<18>{#p/papyrus}{#f/4}你不會害怕人類\n的遊戲吧？",
                        '<25>{#p/undyne}{#f/4}* 啥？\n* 不可能！',
                        "<25>{#p/undyne}{#f/5}* 我只是...",
                        "<25>{#p/undyne}{#f/12}* 我只是藝術之美的\n  狂熱粉絲。",
                        "<18>{#p/papyrus}{#f/5}那你會和我去爵士樂\n與布魯斯藍調\n俱樂部嗎？",
                        "<25>{#p/undyne}{#f/8}* 我的天哪，\n  在最後說一次，\n  我再也不會吹薩克斯了！！"
                    ],
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? SAVE.data.b.killed_mettaton
                        ? [
                            "<18>{#p/papyrus}{#f/6}別買這東西！\n這是MTT牌的\n營銷手段！",
                            "<18>{#p/papyrus}{#f/5}METTATON在這種事上\n真的臭名昭著。",
                            "<18>{#p/papyrus}{#f/4}...我和你一樣\n不喜歡它。"
                        ]
                        : [
                            "<18>{#p/papyrus}{#f/0}順帶說一下，\n這大概持續了\n10個克歷年了。",
                            '<18>{#p/papyrus}{#f/4}我不知道換算成\n地球年又是多少...',
                            "<18>{#p/papyrus}{#f/5}雖然好像差別\n不大罷了。"
                        ]
                    : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                        ? [
                            "<18>{#p/papyrus}{#f/5}太糟糕了。\nUNDYNE會成為一個\n偉大的音樂家的。",
                            "<18>{#p/papyrus}{#f/4}設想一下由她作詞\n的戰士之歌...",
                            '<25>{#p/undyne}{#f/1}* 大概會吧。',
                            '<25>{#p/undyne}{#f/12}* 聽起來確實很酷...',
                            "<18>{#p/papyrus}{#f/0}我知道啊！\n那簡直可以說是\n「魚」味無窮啊！",
                            '<25>{#p/undyne}{#f/3}* ...',
                            '<25>{#p/undyne}{#f/3}* 別再對我這麼說了。'
                        ]
                        : [
                            "<18>{#p/papyrus}如果你想買冰激凌，\n就在我右邊。",
                            '<25>{#p/undyne}{#f/3}* 不應該是「左邊」嗎？',
                            '<18>{#p/papyrus}{#f/5}按理說，\n冰激凌攤確實是\n在我左邊。',
                            "<18>{#p/papyrus}{#f/4}但對人類來說，\n冰激凌攤卻在\n我的右邊。",
                            '<25>{#p/undyne}{#f/14}* 啊。\n* 你真的很體貼呢！',
                            "<25>{#p/undyne}{#f/17}* 只希望人類不會\n  因此迷路。"
                        ],
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? SAVE.data.b.killed_mettaton
                        ? ["<18>{#p/papyrus}{#f/5}他不該為推廣\n自己的品牌而撒謊..."]
                        : ['<18>{#p/papyrus}{#f/5}守時間\n有時真的很難。']
                    : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                        ? ['<18>{#p/papyrus}{#f/4}我的嘴\n被貼上了封條。']
                        : ['<18>{#p/papyrus}{#f/5}辨別方向有時\n真的很難。']
        ),
        papinter2: () => [
            '<18>{#p/papyrus}{#f/0}你好，人類。',
            '<18>{#p/papyrus}{#f/5}（唉...）',
            "<18>你可能在想為啥\nUNDYNE沒來。",
            '<18>怎麼說呢...',
            "<18>{#f/6}假設，UNDYNE\n離開的原因是...",
            ...(SAVE.data.b.killed_mettaton
                ? [
                    '<18>{#f/5}...甚至她自己\n也這麼說...',
                    '<18>{#f/1}你殺了某個人！？！？',
                    '<18>{#f/4}我是說，\n我理解她為何離開。',
                    '<18>{#f/5}METTATON的「死亡」\n對此【特別】有\n說服力。',
                    "<18>{#f/0}然而，每個人都知道\n那只是節目效果。",
                    '<18>{#f/4}自然，\n除了UNDYNE以外。',
                    '<18>{#f/5}我保證...',
                    '<18>{#f/5}有時她想的\n那些東西...',
                    '<18>{#f/5}...'
                ]
                : [
                    '<18>{#f/5}...包括她說發現\n你的做為...',
                    '<18>{#f/1}你殺了某個人！？！？',
                    "<18>{#f/0}但那肯定是個誤會。",
                    "<18>{#f/5}你不會那樣做的\n... 對嗎？",
                    "<18>{#f/6}所-所以，\n我決定留下。",
                    '<18>{#f/9}必須有人站出來\n為「小男孩」發聲！',
                    '<18>{#f/0}或者小女孩，\n或者你自己選的\n那個外號。',
                    "<18>{#f/4}等等，如果你沒有\n外號怎麼辦...",
                    '<18>{#f/8}那我該叫你啥！？！？'
                ]),
            "<18>{#f/0}好吧，想聊天的話，\n就來這裡找我好了。",
            "<18>{#f/5}我也可以在這跟你\n打電話，但是...",
            "<18>{#f/5}UNDYNE聽見我想\n跟你打電話，\n就把我手機砸了。",
            "<18>{#f/6}看起來，\n她保護欲很強！"
        ],
        undinter: pager.create(
            0,
            () =>
                SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                    ? iRespeccYourVilliany()
                        ? [
                            '<25>{#p/undyne}{#f/1}* 嘿，小混蛋。\n* 好久不見。',
                            "<18>{#p/papyrus}{#f/6}你不是剛才\n和人類一起上了\n電視嗎？？？",
                            "<25>{#p/undyne}{#f/14}* 我是說，對，\n  剛才已經夠久了。",
                            "<18>{#p/papyrus}{#f/0}確實。",
                            '<18>{#p/papyrus}{#f/5}哇... 想像我有\n時間會做什麼...',
                            "<18>{#p/papyrus}{#f/4}...我可以不阻止\nSANS偷懶。",
                            '<25>{#p/undyne}{#f/17}* 跟我說說。'
                        ]
                        : [
                            '<25>{#p/undyne}{#f/1}* 嘿，小混蛋。\n* 很高興見到你。',
                            "<18>{#p/papyrus}{#f/6}今天早些時候你們\n不還是敵人嗎？？？",
                            "<25>{#p/undyne}{#f/14}* 我是說，對，\n  但這都過去了。",
                            '<18>{#p/papyrus}{#f/0}就按你這麼說了。',
                            '<18>{#p/papyrus}{#f/5}哇喔...\n就像平常SANS\n說的那樣...',
                            '<18>{#p/papyrus}{#f/4}...他每次都是說有\n些事已經「過去了」。',
                            '<25>{#p/undyne}{#f/17}* 積習難改啊。'
                        ]
                    : [
                        '<25>{#p/undyne}{#f/1}* 嘿，小混蛋。\n* Papyrus要處理件「私事」。',
                        "<25>{#f/14}* 至少，他就這麼講的。",
                        "<25>{#f/7}* 但這意味著，我是你\n  待在這兒唯一的朋友了嘛！",
                        '<25>{#f/4}* ...所以你最好\n  別給我出洋相了！'
                    ],
            () =>
                SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                    ? [
                        '<25>{#p/undyne}{#f/1}* 如果你想加入我的\n  魔法藝術俱樂部...',
                        '<25>{#p/undyne}{#f/3}* ...呃，我不確定運輸船\n  會不會載一個孩子\n  去那裡。',
                        "<25>{#p/undyne}{#f/12}* 也許當你大一點\n  就會載你去了。"
                    ]
                    : ["<25>{#p/undyne}{#f/11}* 我會盯著你的。"]
        ),
        corndog1: pager.create(
            0,
            () => [
                "<25>{#p/sans}{#f/0}* 我在這賣點玉米熱狗，\n  5G一個，喜歡就嘗嘗。",
                choicer.create('* （花5G買個熱狗嗎？）', '買', '不買')
            ],
            () => ['<25>{#p/sans}{#f/0}* 玉米熱狗，5G一個。', choicer.create('* （花5G買個熱狗嗎？）', '買', '不買')]
        ),
        corndog2: [
            "<32>{#p/human}* （你帶的東西太多了。）",
            "<25>{#p/sans}{#f/2}* 這樣吧，\n  我就放在這裡好了。"
        ],
        corndog2b: ['<25>{#p/sans}{#f/2}* 給你。'],
        corndog3: ["<32>{#p/human}* （你的錢不夠。）"],
        corndog3x: () =>
            [
                [
                    "<25>{#p/sans}{#f/0}* 你連5G都沒有？",
                    '<25>{#p/sans}{#f/3}* 要不...\n* 我給你點錢吧。',
                    '<32>{#s/equip}{#p/human}* （你得到了100G。）',
                    '<25>{#p/sans}{#f/2}* 希望這點錢能幫到你。'
                ],
                [
                    '<25>{#p/sans}{#f/0}* 又沒錢了？',
                    "<25>{#p/sans}{#f/3}* ...呃。\n* 沒事。",
                    "<25>{#p/sans}{#f/2}* 我也不差那5G，就請你吃吧。"
                ]
            ][SAVE.data.n.cornmoney++],
        corndog4: () =>
            [
                ['<32>{#p/human}* （你得到了玉米熱狗。）', '<25>{#p/sans}{#f/2}* 請慢用。'],
                [
                    '<32>{#p/human}* （你得到了玉米熱羊。）',
                    '<25>{#p/sans}{#f/2}* 哎呀，不好意思。\n  應該是狗狗的。'
                ],
                ['<32>{#p/human}* （你得到了玉米熱狗。）']
            ][Math.min(SAVE.data.n.state_aerialis_corngoat++, 2)],
        corndog5: ['<32>{#p/human}* （你決定先不買。）'],
        corndog6: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* （這個哨站給你\n  所帶來的印象相當離譜。）']
                : world.darker
                    ? ["<32>{#p/basic}* 一個哨站。"]
                    : ['<32>{#p/basic}* 哨站有多個，Sans只有一個。'],
        sanscall1: () => [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            ...(world.dead_skeleton
                ? [
                    '<25>{#p/sans}{#f/0}* 所以，節目怎麼樣？',
                    '<25>{#f/0}* 棒...？\n* 還是爛...？',
                    "<25>{#f/3}* 嗯，我只是個會說雙關\n  的傢伙罷了。",
                    "<25>{#f/2}* 像我這樣的永遠也\n  看不出這倆有啥區別。",
                    ...(world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                        ? ["<26>{#f/3}* 但是吧...\n* 我對這並不咋關心，\n  所以也沒事。"]
                        : ["<25>{#f/3}* 但是吧...\n* 我都沒去看，所以也沒事。"]),
                    '<25>{#f/0}* 我這麼問是因為...\n* 老實說吧...',
                    "<25>{#f/0}* 要是了解到你還在乎\n  什麼那也挺不錯的。",
                    "<25>{#f/3}* 無意冒犯而已。"
                ]
                : [
                    '<25>{#p/sans}{#f/0}* 所以，節目怎麼樣？',
                    ...(SAVE.data.b.a_state_moneyfish
                        ? [
                            '<25>{#p/sans}{#f/2}* 你和Undyne\n  貿似互吹了一頓哈？',
                            "<25>{#f/3}* 嘿。\n* 很抱歉我沒有來。",
                            '<25>{#f/0}* 一旦undyne想要上場，\n  我就完全沒有\n  上場機會了。',
                            ...(SAVE.data.b.bad_lizard
                                ? ['<25>{#f/3}* 除此之外...', '<25>{#f/0}* 我目前還有跟你那樣\n  的人要擔心。']
                                : ['<25>{#f/0}* 「皇家衛隊隊長」\n  可太出名了。'])
                        ]
                        : world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                            ? [
                                '<25>{#p/sans}{#f/2}* 第一個被淘汰，是吧？',
                                "<25>{#f/3}* 嘿。\n* 我想你也沒那麼受歡迎。",
                                "<25>{#f/0}* 但其實也沒關係。",
                                ...(SAVE.data.b.bad_lizard
                                    ? ['<25>{#f/0}* 其實這也正常，\n  因為你把大家都嚇跑了。']
                                    : ['<25>{#f/0}* 至少你寬宏大量，\n  沒有對此斤斤計較。'])
                            ]
                            : [
                                '<25>{#p/sans}{#f/2}* 沒有我你也可以加油，\n  是吧？',
                                "<25>{#f/3}* 別擔心，我已經習慣\n  成為一群人中最怪的\n  那個了。",
                                "<25>{#f/2}* 只不過，\n  通常沒人知道這件事。",
                                ...(SAVE.data.b.bad_lizard
                                    ? [
                                        "<25>{#f/3}* ...考慮到你最近\n  都忙的是什麼...",
                                        "<25>{#f/0}* 其實這也挺好的。"
                                    ]
                                    : ["<25>{#f/0}* 總之，\n  你開心了，我就很滿足了。"])
                            ]),
                    '<25>{#f/3}* ...對了...',
                    '<25>{#f/2}* 如果你看到\n  全副武裝的警衛了，\n  別忘了告訴我。',
                    '<25>{#f/3}* 我在來這裡的路上\n  跟丟了。'
                ]),
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        tvm1: ['<32>{#p/human}* （你獲得了一臺老式收音機。）', '<32>{#p/basic}{#npc/a}* 希望你喜歡你覺得新收音機！'],
        tvm2: ['<32>{#p/human}* （你獲得了一箱煙花。）', '<32>{#p/basic}{#npc/a}* 希望你能享受你的煙花！'],
        tvm3: ["<32>{#p/human}* （你帶的東西太多了。）"],
        tvm4: pager.create(0, ['<32>{#p/basic}{#npc/a}* 小傢伙，你的獎品就在桌上。']),
        tvm5: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* 在再次被解僱前，\n  我決定主動辭職。",
                        '<32>* 為Mettaton工作是很好，\n  但我更想在新家園\n  開始新的生活。',
                        "<32>* 別擔心。\n* 我會找到更好的工作的..."
                    ]
                    : [
                        '<32>{#p/basic}{#npc/a}* 我為Mettaton工作。\n* 我愛我工作。\n* 我同事不愛。',
                        '<32>* 我身上的每一枚圓環\n  都代表我被公司炒魷魚時\n  的重聘次數。',
                        "<32>* 別擔心。\n* 我總能被重新聘用。"
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* 我想成為\n  太空生物交配儀式學專家。"
                    ]
                    : ["<32>{#p/basic}{#npc/a}* 下次我想在臉上戴個圓環。"]
        ),
        tvm6: () => [
            '<32>{#p/basic}{#npc/a}* 本來是要給你一個喵喵玩偶的，\n  但Mettaton卻因為一些\n  個人原因把它收回了。',
            "<32>{#p/basic}{#npc/a}* 作為補償，\n  我將給你與其同等價值的G。",
            '<32>{#s/equip}{#p/human}{#npc}* （你獲得了999G。）',
            ...((SAVE.data.b.a_state_moneyitemA && !SAVE.data.b.item_tvm_radio) ||
                (SAVE.data.b.a_state_moneyitemB && !SAVE.data.b.item_tvm_fireworks)
                ? ['<32>{#p/basic}{#npc/a}* 其他的獎品\n  還是可以正常領取的。']
                : ['<32>{#p/basic}{#npc/a}* 很抱歉給你帶來了困擾。'])
        ],
        tvm7: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* （桌子上的便條\n  描述了為收回某件東西\n  而感到抱歉。）']
                : [
                    "<32>{#p/basic}* 這桌子上有一張便條。",
                    '<32>{#p/mettaton}* 「抱歉，\n   我得把喵喵玩偶帶回去。」\n* 「當然這並沒有針對你。」'
                ],
        tvm8: ['<32>{#p/human}* （你獲得了一臺老式收音機。）'],
        tvm9: ['<32>{#p/human}* （你獲得了一箱煙花。）'],
        lockup0: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* （但是你沒有鑰匙。）"] : ["<32>{#p/basic}* 鎖住了。"],
        lockup1: () => [
            '<32>{#p/human}* （你用生鏽的鑰匙打開了保險箱。）',
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* 柜子上的標籤寫著\n  「古老的地球武器」。'])
        ],
        lockup2: ['<32>{#p/human}* （你拿走了一把電擊槍。）'],
        lockup3: ['<32>{#p/human}* （你拿走了一顆瞌睡彈。）'],
        lockup4: ['<32>{#p/human}* （你拿走了一瓶糖霧噴。）'],
        lockup5: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* （裡面已經空空如也。）"]
                : ["<32>{#p/basic}* 空空如也。"],
        lockup6: ["<32>{#p/human}* （你帶的東西太多了。）"],
        gonezo: () =>
            world.bulrun ? ['<32>{#p/basic}* ...但是大家都逃走了。'] : ['<32>{#p/basic}* ...但是誰也沒有來。'],
        spidershop1: () => [
            SAVE.data.n.plot === 72
                ? choicer.create('* （在蜘蛛網裡放36G嗎？）', '放', '不放')
                : choicer.create('* （在蜘蛛網裡放56G嗎？）', '放', '不放')
        ],
        spidershop2: [
            '<32>{#p/basic}* 幾隻蜘蛛爬了下來，\n  並給了你一樣東西。',
            '<32>{#s/equip}{#p/human}* （你得到了豪華渦旋棒棒糖。）'
        ],
        spidershop3: ["<32>{#p/human}* （你帶的東西太多了。）"],
        spidershop4: ["<32>{#p/human}* （你的錢不夠。）"],
        spidershop5: ['<32>{#p/human}* （你不打算這麼做。）'],
        spidershop6: [
            "<32>{#p/basic}* 蛛網編織成了一行字。",
            '<32>{#p/basic}* 「安息吧，蜘蛛女王。」'
        ],
        spidershop7: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* （你將手穿過蛛網。）',
                    ...[
                        [
                            "<25>{#p/asriel1}{#f/10}* Frisk，這裡空無一物，\n  除了蛛絲。",
                            "<25>* 你的手會黏上蛛絲的。"
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* 信我的。\n* 這得花很長時間才能洗掉。',
                            '<25>{#f/15}* 我對此... 富有經驗。'
                        ],
                        ['<25>{#p/asriel1}{#f/15}* 或者... 你可以繼續。', "<26>{#f/16}* 反正不關我事。"],
                        ['<25>{#p/asriel1}{#f/13}* 我認真的...']
                    ][Math.min(asrielinter.spiderweb++, 3)]
                ]
                : ['<32>{#p/basic}* 蛛網上什麼都沒有。'],
        hotelfood0: () =>
            SAVE.data.b.svr
                ? [
                    "<32>{#p/human}* （你將手伸進碗裡的食物中。）\n* （好黏。）",
                    choicer.create('* （拿走食物嗎？）', '拿走', '算了')
                ]
                : ["<33>{#p/basic}* 這是某種神秘的食物。", choicer.create('* （拿走食物嗎？）', '拿走', '算了')],
        hotelfood1: () => [
            '<32>{#p/human}* （你拿走了神秘食物。）',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? [
                    "<25>{#p/asriel1}{#f/15}* 那玩意...\n  對你不咋健康。",
                    '<25>{#f/16}* 我希望你應該知道。'
                ]
                : [])
        ],
        hotelfood2: ["<32>{#p/human}* （你帶的東西太多了。）"],
        hotelfood3: ['<32>{#p/human}* （你不打算這麼做。）'],
        sonic1: () => [
            '<32>{#p/human}* （你撿到了一個聲波諧振器。）',
            choicer.create('* （啟動聲波諧振器嗎？）', '啟動', '算了')
        ],
        sonic2: ["<32>{#p/human}* （你帶的東西太多，裝不下它了。）"],
        tablaphone1: () => [
            '<32>{#p/human}* （你撿到了一架塔布拉木琴。）',
            choicer.create('* （架起塔布拉木琴嗎？）', '架起', '算了')
        ],
        tablaphone2: ["<32>{#p/human}* （你帶的東西太多，裝不下它了。）"],
        moonpie1: () => [
            '<32>{#p/human}* （你拿走了月派。）',
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* （附帶的紙條描述了\n  希望幫助有需要的人的意圖。）']
                : [
                    "<32>{#p/basic}* 派的上面粘著一張字條...",
                    '<32>{#p/basic}* 「我知道，自己與眾不同。\n   在前哨站，我總是不合群。」',
                    '<32>{#p/basic}* 「但也許在某處，\n   也有個像我一樣的人。」',
                    '<32>{#p/basic}* 「他十分善良，卻常常被誤解...」',
                    '<32>{#p/basic}* 「他需要額外的生命值用以自保...」',
'<32>{#p/basic}* 「我希望，能用這塊派幫到他。」'
                ])
        ],
        moonpie2: ["<32>{#p/human}* （你帶的東西太多，裝不下它了。）"],
        ratings: '$(x)人正在看',
        gold: '獲勝獎金 $(x)G',
        secretcall: [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            '<18>{#p/papyrus}{#f/5}我是PAPYRUS。',
            "<18>{#f/5}我不能再躲躲藏藏了。",
            '<18>{#f/6}人們需要我的幫助！',
            '<18>{#f/5}而且...',
            "<18>{#f/6}我到底還是\n想再見見你。",
            '<18>{#f/7}就算讓「ASRIEL」\n知道我還活著\n又怎麼樣！',
            '<18>{#f/7}我決不容忍自己\n就這麼杵在這，無所事事。',
            '<18>{#f/4}...',
            '<18>{#f/4}待會見。',
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        story: {
            phonegrabber1: () => [
                game.room === 'a_lab_downstairs' // NO-TRANSLATE

                    ? "<33>{#p/basic}* Alphys的備用機。\n* 自帶一張升降機通行證\n  和兩個次元箱子。"
                    : "<32>{#p/basic}* 一部智慧型手機。\n* 自帶一張升降機通行證\n  和兩個次元箱子。",
                ...(world.genocide
                    ? ['<32>{#p/basic}* 很奇怪，\n  一次性便攜飛行器的槽\n  居然是空的。']
                    : ['<32>{#p/basic}* 此外，\n  還有個一次性的可攜式噴氣背包。'])
            ],
            phonegrabber2: ['<32>{#p/human}* （你有了一部新手機。）'],
            phonegrabber3: () =>
                SAVE.flag.n.ga_asrielGetThePhone > 1
                    ? ['<25>{#p/asriel2}{#f/10}* 終於啊。']
                    : ["<25>{#p/asriel2}{#f/10}* 不知道上面有沒有聊天記錄。"],
            alphys1: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ['<25>{#p/alphys}{#f/2}* 我的天啊！', '<25>{#f/3}* 你怎麼...']
                    : ['<25>{#p/alphys}{#f/2}* 我的天啊！', '<25>{#f/3}* 你怎麼這麼快就到了！？'],
            alphys2: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ["<25>{#p/alphys}{#f/10}* 喔... 你是那個人類...", '<25>{#f/3}* 那個...']
                    : ["<25>{#f/4}* 我剛接完電話，\n  還沒檢查實驗室...", '<25>{#f/17}* ...'],
            alphys3: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        "<25>{#g/alphysWhyOhWhy}* 呃，沒事沒事，一切都好！",
                        "<25>{#g/alphysUhButHeresTheDeal}* 請放一萬個心，\n  你一點兒錯都沒有！",
                        "<25>{#g/alphysCutscene1}* 啥跟啥啊！\n* 你就是個...",
                        '<25>{#g/alphysCutscene2}* 沒幹過壞事的小天使，哈哈。',
                        '<25>{#f/20}* ...',
                        "<25>{#f/10}* 那-那個，話說，\n  你是新來的，對吧！？",
                        '<25>{#g/alphysIDK}* 你可-可能...',
                        "<25>{#f/3}* 你可能需要我的幫助！",
                        "<25>{#f/5}* 因-因為...",
                        '<25>{#f/10}* 空境對-對人類來說...\n  不太安全。',
                        '<25>{#f/3}* 陷阱隨-隨時會要你命...\n* 謎題壓-壓根就解不開...\n* 還有...',
                        '<25>{|}{#g/alphysIDK}* 該-該死，我要怎麼- {%}'
                    ]
                    : [
                        ...[
                            [
                                '<25>{#f/1}* 嗯，呃，你-你好！',
                                "<25>{#f/1}* 我是Alphys博士。\n* 皇家科學部門的負責人。",
                                '<25>{#f/10}* 但是，呃，\n  我不是那些「壞傢伙」！',
                                "<25>{#f/17}* 實際上，從你剛剛走出\n  外域時，我就...",
                                '<25>{#f/5}* 誒嘿，用我的安全控制臺\n  「觀察」你。',
                                '<25>{#f/8}* 你的戰鬥...\n* 你的朋友們...',
                                '<25>{#f/1}* 你的一切！',
                                '<25>{#f/9}* 喔！然後我\n  最喜歡的部分就是...',
                                ...(SAVE.data.b.s_state_million
                                    ? [
                                        "<25>{#f/16}* ...看到你超過了\n  Sans作弊打出來的分數！",
                                        '<25>{#f/12}* 太厲害了...'
                                    ]
                                    : SAVE.data.b.f_state_thundersnail_win
                                        ? [
                                            '<25>{#f/16}* ...看到你贏了一局\n  雷霆蝸牛！',
                                            '<25>{#f/12}* 太厲害了...'
                                        ]
                                        : !SAVE.data.b.papyrus_fire
                                            ? [
                                                '<25>{#f/16}* ...看到你第一次嘗試\n  就通過了躲避烈火之牆！',
                                                '<25>{#f/12}* 太厲害了...'
                                            ]
                                            : SAVE.data.b.s_state_mathpass
                                                ? [
                                                    '<25>{#f/16}* ...看到你靠自己一個人\n  破解了數字中和謎題！',
                                                    '<25>{#f/12}* 太厲害了...'
                                                ]
                                                : ['<25>{#f/16}* ...看到了你和\n  Undyne戰鬥？？？']),
                                "<25>{#f/18}* 但是，呃，你需要\n  我的引導來通過空境！"
                            ],
                            [
                                '<25>{#f/8}* 嗯，你-你好...',
                                "<25>{#f/9}* 我是... Alphys博士。\n* 皇家科學部門的負責人。",
                                "<25>{#f/4}* 從你剛剛走出外域時，\n  我就...",
                                '<25>{#f/4}* 誒嘿，用我的安全控制臺\n  「觀察」你。',
                                '<25>{#f/11}* 你的戰鬥...\n* 你的朋友們...',
                                '<25>{#f/11}* ...',
                                ...(SAVE.data.n.state_starton_papyrus === 1
                                    ? ["<25>{#f/13}* 甚至...\n* Papyrus的死-死亡..."]
                                    : SAVE.data.n.state_foundry_doge === 1 && SAVE.data.n.state_foundry_muffet === 1
                                        ? ["<25>{#f/13}* ...甚至由Undyne帶領的\n  特戰隊的覆-覆滅..\n"]
                                        : SAVE.data.n.state_starton_dogs === 2 ||
                                            (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                                            (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
                                            (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) >
                                            1
                                            ? ['<25>{#f/13}* ...甚至犬衛隊的\n  覆-覆滅...']
                                            : SAVE.data.n.state_starton_doggo === 2
                                                ? ["<25>{#f/13}* 甚至...\n* Doggo的死-死亡..."]
                                                : SAVE.data.n.state_foundry_muffet === 1
                                                    ? ["<25>{#f/13}* 甚至...\n* Muffet的死-死亡..."]
                                                    : SAVE.data.n.state_foundry_doge === 1
                                                        ? ["<25>{#f/13}* 甚至...\n* Doge的死-死亡..."]
                                                        : SAVE.data.n.state_starton_greatdog === 2
                                                            ? ["<25>{#f/13}* 甚至...\n* Canis Major的死-死亡..."]
                                                            : SAVE.data.n.state_starton_lesserdog === 2
                                                                ? ["<25>{#f/13}* 甚至...\n* Canis Minor的死-死亡..."]
                                                                : ["<25>{#f/13}* ...甚至那些怪物們的\n  死-死亡..."]),
                                "<25>{#f/10}* ...不過，嘿，也不\n  全是壞事，是吧？",
                                "<25>{#g/alphysCutscene2}* 你還活著，\n  你完好無損地\n  來到了這裡...",
                                '<25>{#f/3}* 這是很重要的，\n  對吧？？？',
                                '<25>{#g/alphysIDK}* ...',
                                "<25>{#g/alphysIDK}* 話雖如此，你可能\n  需要我指導你\n  穿過空境。"
                            ]
                        ][world.bad_lizard],
                        '<25>{#f/15}* 呃對...\n  這兒對人類來說\n  可能有點危險...',
                        '<25>{#f/3}* 陷阱隨時會要你命...\n* 謎題也難得離譜...\n* 還有那些皇家守衛...',
                        '<25>{|}{#f/15}* 更不用說- {%}'
                    ],
            alphys4: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ['<25>{#g/alphysIDK}* 不... 不不不不不...']
                    : ['<25>{#f/20}* Mettaton。'],
            alphys5: () =>
                SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* 別是在這...\n  也別是現在啊...'] : ['<25>{#f/3}* 誒嘿...'],
            alphys6: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* ...'] : ['<25>{#f/20}* ...']),
            alphys7: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/23}* 喔天啊。'] : ['<25>{#f/11}* 喔不。']),
            alphys8: () => [
                SAVE.data.n.state_foundry_undyne > 0 ? '<32>{#p/mettaton}* 喔喔喔天啊！' : '<32>{#p/mettaton}* 喔喔喔耶！',
                '<32>{#p/mettaton}* 歡迎，美人兒們...'
            ],
            alphys9: ["<32>{#p/mettaton}* 來到今天的\n  達人秀節目！"],
            alphys10: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* 我們每個人要知道，\n  通常我們看到一個看似\n  「無辜」的人類小孩...',
                        '<32>* 很容易讓我們對其放下戒心...\n* 在此，我想告訴大家，\n  永遠不要以貌取人...',
                        '<32>* 現在展示在你們屏幕上的，\n  是這個卑鄙無恥的人類在前哨站\n  為非作歹的真實錄像！',
                        SAVE.data.n.state_foundry_undyne > 0
                            ? '<25>{#p/alphys}{#f/2}* Mettaton，等-等一下！\n* 你在幹什...'
                            : '<25>{#p/alphys}{#g/alphysGarbo}* 啊？\n* 你又順走監控錄像了？'
                    ]
                    : [
                        "<32>{#p/mettaton}* 我敢說這期節目會超棒喔！",
                        "<32>* 讓我們以熱烈的掌聲\n  歡迎我們的新選手...",
                        '<33>* 唯一一位的人類訪客！'
                    ],
            alphys10a: () => [
                '<32>{#p/mettaton}* （等觀眾看完再說。）',
                SAVE.data.n.state_foundry_undyne > 0
                    ? "<25>{#p/alphys}{#f/21}* ...\n* 真就說不過你。"
                    : "<26>{#p/alphys}{#g/alphysGarboCenter}* 所以你承認嘍。"
            ],
            alphys11: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* 不管怎麼說，\n  我們需要給這人類\n  取個外號！",
                        ...(world.flirt > 9
                            ? [
                                '<32>{#p/mettaton}* 畢竟所有惡劣至極的反派，\n  都擁有一個外號。\n* 除了你以外...',
                                "<32>{#p/mettaton}* 像你這樣\n  喜歡沾花惹草的惡霸，\n  只有一個外號會適合你！",
                                '<32>{#p/mettaton}* ... $(moniker1u)！'
                            ]
                            : [
                                "<32>{#p/mettaton}* 畢竟所有惡劣至極的反派，\n  都擁有一個外號。\n* 那你的將是什麼呢？"
                            ])
                    ]
                    : ['<32>{#p/mettaton}* 從來沒有玩過嗎，幸運兒？', "<32>* 沒關係，很簡單。"],
            alphys11a: () => [
                choicer.create(
                    '* （你打算起啥外號呢？）',
                    '黃天霸主',
                    '風雲劍客',
                    '狂怒劍皇',
                    '星際遊俠'
                )
            ],
            alphys11b: () =>
                iFancyYourVilliany()
                    ? world.flirt > 9
                        ? ["<32>{#p/mettaton}* 所以，$(moniker2u)，\n  拿出你的戰鬥技巧..."]
                        : [
                            '<32>{#p/mettaton}* $(moniker1u)嗎？\n* 天吶，這名真不錯！',
                            "<32>{#p/mettaton}* 行，$(moniker2u)，\n  拿出你的戰鬥技巧..."
                        ]
                    : ["<32>* 實際上，規則只有一個！", '<32>* 拿出你一生中\n  最好的表現...'],
            alphys12: () =>
                iFancyYourVilliany()
                    ? ['<32>{*}{#p/mettaton}* 把它搬上舞臺！！！{^20}{%}']
                    : ['<32>{*}{#p/mettaton}* 否則就會死！！！{^20}{%}'],
            alphys13: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        '<25>{#p/alphys}{#f/10}* 你... 你知道嗎？',
                        '<25>{#f/10}* 你想做啥都行。',
                        "<25>{#f/23}* 因為我...\n  我得離開了。",
                        '<25>{#f/23}* 永遠。',
                        '<25>{#f/5}* 還有你要是想\n  吩咐我什麼...',
                        '<25>{#f/5}* 嗯...',
                        '<25>{|}{#f/16}* 算了吧！！！{%}'
                    ]
                    : [
                        ...(world.bad_lizard < 1
                            ? [
                                '<25>{#p/alphys}{#f/5}* 嘿...',
                                '<25>{#f/8}* 我知道這麼說有點\n  莫名其妙，但是...\n  你真-真的很酷。'
                            ]
                            : [
                                '<25>{#p/alphys}{#f/5}* 嘿...',
                                '<25>{#f/8}* 我知道這有點莫名其妙，\n  但是...',
                                '<25>* 你做的很-很好。'
                            ]),
                        "<25>{#f/9}* 總之，呃，就像我說的，\n  你會需要我的幫助的。",
                        "<25>{#f/17}* 讓我看看你身上\n  都帶了些什麼..."
                    ],
            alphys14: [
                '<25>{#p/alphys}{#f/21}* ...',
                '<25>{#f/21}* 這是啥。',
                '<25>{#f/21}* 這是誰給你的。',
                '<25>{#f/22}* 誰還用這樣的\n  老古董啊？？？',
                '<25>{#f/22}* ...',
                "<25>{#f/23}* 我馬上回來。"
            ],
            alphys15: () =>
                world.bad_lizard < 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysCutscene1}* 好了，我給你搞了個\n  新手機！',
                        "<25>* 裡面有升降機通行證，\n  次元箱子...",
                        '<25>{#g/alphysHellYeah}* 還有你自己的域外網帳號！',
                        '<25>{#g/alphysSmileSweat}* 我順便加了你的好友，\n  這樣你需要幫助的時候\n  隨時都能聯繫我了！',
                        '<25>{#g/alphysUhButHeresTheDeal}* 好耶！！',
                        '<32>{#s/equip}{#p/human}* （你有了一部新手機。）'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* 抱歉，但實話說，\n  你那手機和磚頭沒啥區別，\n  就是好看點。',
                        "<25>{#g/alphysSide}* 拿去，這新手機裡面有\n  升降機通行證，\n  次元箱子...",
                        '<25>{#g/alphysSmileSweat}* 還有你自己的域外網帳號！',
                        "<25>{#g/alphysNervousLaugh}* 別擔心，我們加了好友，\n  這樣你需要幫助\n  就能聯繫我了。",
                        '<32>{#s/equip}{#p/human}* （你有了一部新手機。）'
                    ],
            alphys16: ["<25>{#p/alphys}{#g/alphysWelp}* 我先去辦公了。"],
            rg1a: () =>
                world.bad_lizard > 1
                    ? world.goatbro
                        ? ['<32>{#p/basic}{#x1}* 你倆，站住！{#x3}']
                        : ['<32>{#p/basic}{#x1}* 你，站住！{#x3}']
                    : ['<32>{#p/basic}{#x1}* 孩子，你好！{#x3}'],
            rg1b1: () =>
                world.bad_lizard > 1
                    ? ['<32>{#p/basic}{#x1}* 前面的，那個，給個說法：\n  為啥把人都殺了？{#x3}']
                    : ['<32>{#p/basic}{#x1}* 請問，那個，你知道\n  附近哪裡有賣冰淇淋的嗎？{#x3}'],
            rg1b2: () =>
                world.bad_lizard > 1
                    ? ["<32>{#p/basic}{#x1}* 我和我男朋友...\n  覺得這事很蠢唉。{#x3}"]
                    : ['<32>{#p/basic}{#x1}* 我和我男朋友附近都找遍了，\n  就是找不著！{#x3}'],
            rg1c: () =>
                world.bad_lizard > 1
                    ? ['<33>{#p/basic}{#x2}* 草。\n* 兄弟，那個，\n  我看咱必須得幹掉那人了。{#x3}']
                    : [
                        '<32>{#p/basic}{#x1}* 孩子，你沒事吧？{#x3}',
                        "<32>{#x1}* 那個，\n  你這行為舉止有點不對勁...{#x3}",
                        '<32>{#x1}* 就好像，你一點都\n  「不想搭理我們」...{#x3}',
                        '<32>{#x1}* 呃...{#x3}'
                    ],
            rg1d1: () =>
                world.bad_lizard > 1
                    ? ["<32>{#p/basic}{#x1}* 對喔...\n* 這不就是咱們的任務嘛？{#x3}"]
                    : ["<32>{#p/basic}{#x1}* 兄弟，別在意。\n* 我感覺這孩子只是\n  沒看見咱們而已。{#x3}"],
            rg1d2: [
                '<32>{#p/basic}{#x2}* 但我想吃冰淇淋！{#x3}',
                "<32>{#p/basic}{#x1}* 別想什麼冰淇淋啦，兄弟。\n* 摸魚一時爽，被抓火葬場啊。{#x3}"
            ],
            rg1d3: ['<32>* ...', '<32>{#x2}* 唉，好吧。{#x3}'],
            rg1e: [
                '<32>{#p/basic}{#x1}* 那，回頭見吧...{#x3}',
                "<32>{#x2}* 要是我們找到冰淇淋了，\n  下次見面，肯定告訴你！{#x3}"
            ],
            rg1f: [
                '<33>{#p/basic}{#x1}* 兄弟...\n  咱倆還是快走吧！{#x3}',
                '<32>{#x2}* 喔對。\n  那個，對不起了Undyne！{#x3}'
            ],
            robocaller1: () =>
                [
                    [
                        '<32>{#p/mettaton}* 來了啊。',
                        '<32>{#z03}* 也許你不認得我，\n  但我認得你...',
                        "<32>{#z21}* 你是那個和皇家衛隊\n  大隊長戰鬥的人類。",
                        "<32>{#z30}* 那場對峙，\n  讓她喪了命。",
                        "<32>{#z31}* 其實，UNDYNE是死是活，\n  我倒不咋在乎。",
                        '<32>{#z30}* 但對ALPHYS來說...\n  UNDYNE非常重要。',
                        "<32>{#z21}* 她的死，\n  讓ALPHYS備受打擊。",
                        "<32>{#z21}* 倒不是責備你，\n  只是... 你的所作所為\n  傷害了ALPHYS。",
                        "<33>{#z30}* ...希望她只是出去散散心了，\n  一會就回來。",
                        "<32>{#z03}* 別上火。\n* 要是感到孤獨，不用擔心...",
                        "<32>{#z02}* 我會在暗中陪伴你。",
                        '<32>{#z21}* ...',
                        '<32>{#z11}* 好吧，回見！'
                    ],
                    [
                        '<32>{#p/mettaton}* 小鬼，你來啦。',
                        '<32>{#z03}* 也許你不認得我，\n  但我認得你...',
                        '<32>{#z21}* 聽著，你幹了些什麼缺德事，\n  我和Alphys可都看得清清楚楚。',
                        "<32>{#z00}* 要是你只是犯了點小錯，\n  我們都能理解...",
                        '<32>* 真見鬼，\n  ALPHYS和我本來都很喜歡人類的。',
                        "<32>{#z03}* 結果你所表現出來的\n  只有無盡的暴力。",
                        "<32>{#z21}* 今天，ALPHYS...\n  也不打算摻和這破事了...",
                        "<32>{#z00}* 親眼目睹你的暴行之後，\n  這對她也好。",
                        '<32>{#z21}* 我請你別再殺害無辜了，\n  你答應嗎？',
                        '<32>{#z21}* ...',
                        '<32>{#z11}* 好吧，回見！'
                    ],
                    [
                        '<32>{#p/mettaton}* 來了啊。',
                        '<32>{#z03}* 也許你們不認得我，\n  不過...',
                        '<32>* ...',
                        '<32>{#z00}* ...',
                        "<32>* 我就實話實說吧。",
                        '<32>{#z11}* 你們就知道不停地殺殺殺。',
'<32>{#z11}* 開始我還很生氣。\n* 但死得太多，\n  現在我都看麻木了。',
                        "<32>{#z00}* 但有一個人，我不能拋下。",
                        ...(SAVE.flag.n.genocide_milestone < 5
                            ? [
                                "<32>* 她不接電話...",
                                "<32>{#z21}* 她一直線上，\n  但就是不回訊息。",
                                '<32>{#z11}* 她剛剛走的時候，\n  還留下一番話...',
                                '<32>{#z00}* ...讓我很擔心。'
                            ]
                            : [
                                "<32>{|}* 她不接- {%}",
                                '<25>{#z21}{#p/asriel2}{#f/8}* 告訴你，\n  她是準備要幹掉我們呢。',
                                "<32>{#z00}{#p/mettaton}* 嗯，你說什麼？\n* 打斷別人說話，真沒禮貌。"
                            ]),
                        '<32>* 人類，我聽ALPHYS說，\n  你有一種特殊的能力。',
                        "<32>* 要是你還有點良心的話...",
                        '<32>* 就用它...\n  重置這條時間軸吧。',
                        "<32>{#z11}* 不然，\n  你要是想一條道走到黑...",
                        "<32>{#z02}* 就等著遭報應吧。"
                    ]
                ][Math.max(world.bad_lizard - 1, 0)],
            robocaller1x: [
                "<25>{#p/asriel2}{#f/13}* 就你，還敢威脅我們？",
                "<25>{#f/9}* 笑死我了。"
            ],
            robocaller2: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? [
                        '<32>{#p/mettaton}{#z11}* 喔？\n* 原來你們不知道啊，親。',
                        '<32>{#z02}* 哈哈哈...',
                        '<32>{#z03}* 總之，你們給我記著...',
                        "<32>{#z12}* 不聽勸的話，後果自負。",
                        '<32>{#z21}* ...',
                        '<32>{#z11}* 好吧，回見！'
                    ]
                    : [
                        "<32>{#p/mettaton}{#z11}* 無意冒犯，親。\n* 但你說的也太離譜了。",
                        "<32>{#z03}* ALPHYS不擅長戰鬥，\n  這可是她親口說的。",
                        '<32>{#z12}* ...但我知道，\n  有個人，會好好收拾你們的。',
                        '<32>{#z02}* 哈哈哈...',
                        '<32>{#z21}* ...',
                        '<32>{#z11}* 好吧，回見！'
                    ],
            robocaller2x: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? ['<25>{#p/asriel2}{#f/13}* 是嗎？']
                    : ['<25>{#p/asriel2}{#f/16}* 酷喔。'],
            status: '$(x)有新訊息',
            barricade1: () => [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                "<25>{#p/alphys}{#g/alphysSideSad}* 你估計過不去...",
                '<25>{#g/alphysSmileSweat}* 我看看能不能幫到你。',
                '<32>{#p/human}* （你聽到了一陣狂敲鍵盤的聲音。）',
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 安保問... 啥-啥玩意？',
                '<32>{#p/human}* （你又聽到了一陣敲鍵盤的聲音。）',
                '<32>{#p/human}* （...）',
                '<32>{#p/human}* （敲鍵盤的聲音停下來了。）',
                "<25>{#p/alphys}{#g/alphysWelp}* 嗯... 我們得回答\n  幾個安保問題才行。",
                "<25>{#g/alphysGarbo}* Mettaton設的...",
                '<25>{#g/alphysNeutralSweat}* 你... 了解Mettaton嗎？\n  也許知道點有用的訊息？',
                '<25>{#g/alphysTheFactIs}* ...想想就知道不可能，\n  你才碰上他多久...',
                "<25>{#g/alphysUhButHeresTheDeal}* 呃，說是這麼說，\n  也許你答得上來第一問。",
                '<25>{|}{#g/alphysIDK}* 「誰最喜- {%}',
                ...(world.postnoot
                    ? []
                    : [
                        "<25>{#g/alphysWTF}* 天吶，我就知道\n  他會拿這個當安保問題。",
                        '<25>{#g/alphysNervousLaugh}* 「誰最喜歡Mettaton？」',
                        choicer.create('* （你要怎麼回答？）', 'Alphys', 'Asgore', 'Papyrus', 'Undyne')
                    ])
            ],
            barricade1x: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* ...啊？',
                '<25>{#g/alphysWelp}* 路障好像...\n  自行解除了。',
                '<25>{#g/alphysCutscene1}* 沒事了！\n* 那事情就好辦多了！'
            ],
            barricade1b1: [
                '<25>{#p/alphys}{#g/alphysFR}* ...',
                '<25>{#g/alphysFR}* 我喜歡Mettaton就怪了。',
                "<25>{#g/alphysCutscene2}* 我試試... Asgore。"
            ],
            barricade1b2: ['<25>{#p/alphys}{#g/alphysSmileSweat}* 嗯... 行。'],
            barricade1b3: () => [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 當真？',
                '<25>{#p/alphys}{#x1}* ...',
                ...(SAVE.data.n.state_starton_papyrus === 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* 喔，你好像答對了。',
                        '<25>{#g/alphysHaveSomeCompassion}* ...'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* 哇喔，你答對了。',
                        '<25>{#g/alphysFR}* ...',
                        "<25>{#g/alphysFR}* 沒想到Papyrus\n  在人後還有這麼一面。\n  奇怪的冷知識增加了。",
                        '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 不過我接受得了！！'
                    ])
            ],
            barricade1b4: () => [
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* ...\n* 我可不這麼覺得。",
                        "<25>{#g/alphysSideSad}* 還是試試... Asgore吧。"
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysCutscene3}* 噗...\n* 你肯定沒上心，對吧？",
                        "<25>* 她很敷衍他的。\n* 不可能是正確答案的。",
                        "<25>{#g/alphysCutscene2}* 我試試... Asgore。"
                    ])
            ],
            barricade2: () => [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysCutscene2}* 好，這次的問題是...',
                '<25>{|}{#g/alphysCutscene1}* 「Mettaton最成- {%}',
                '<25>{#g/alphysGarbo}* 他是認真的嗎？',
                '<25>{#g/alphysGarboCenter}* 不是吧。',
                '<25>{#g/alphysWelp}* 「Mettaton最成功的\n   節目是哪個？」',
                choicer.create('* （你要怎麼回答？）', 'MTT美妝', 'MTT廚具', 'MTT科技', 'MTT電視臺')
            ],
            barricade2b1: [
                "<25>{#p/alphys}{#g/alphysCutscene2}* 沒錯...\n  估計這就是正確答案。",
                '<25>{#g/alphysTheFactIs}* 他真的很希望他的電視節目\n  火起來，但是...',
                '<25>{#g/alphysUhButHeresTheDeal}* 大家確實很喜歡他的\n  美容產品！'
            ],
            barricade2b2: [
                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* 這附近肯定有很多\n  MTT牌的廚房用電器...',
                "<25>{#g/alphysWelp}* 可惡，Undyne倒是有一個，\n  但她根本就不喜歡那傢伙。",
                "<25>{#g/alphysSmileSweat}* ...行吧，咱們試一下。"
            ],
            barricade2b3: [
                '<25>{#p/alphys}{#g/alphysFR}* ...',
                "<25>{#g/alphysFR}* 我就當作沒聽到。",
                "<25>{#g/alphysHellYeah}* 你在路上隨便拉個人\n  都知道科研是我的活啊！",
                '<25>{#g/alphysHellYeah}* ...',
                "<25>{#g/alphysWelp}* 要不試試... MTT廚具？"
            ],
            barricade2b4: [
                '<25>{#p/alphys}{#g/alphysWorried}* 我說不準...',
                "<25>{#g/alphysWelp}* Mettaton的節目\n  最近不溫不火的。",
                '<25>{#g/alphysWTF}{#x1}* ...',
                '<25>{#g/alphysWTF2}* 答對了！？',
                '<25>{#g/alphysCutscene3}* ...你都咋知道的？',
                '<25>{#g/alphysUhButHeresTheDeal}* 算了，把剩下一個解了就行！'
            ],
            barricade3: () => [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 最後一個問題...',
                '<25>{#g/alphysNeutralSweat}* 「Mettaton的真實身份\n   是什麼？」',
                '<25>{#g/alphysNeutralSweat}* ...',
                choicer.create('* （你要怎麼回答？）', '42型機器人', 'Hapstablook', 'Aidrian', 'Mettaton') 
            ],
            barricade3b1: [
                '<25>{#p/alphys}{#g/alphysCutscene2}* 啊，關於這個...',
                "<25>{#p/alphys}{#g/alphysCutscene3}* 我... 只完成過一個\n  Mettaton的模型。",
                "<25>{#p/alphys}{#g/alphysFR}* 所以我知道\n  不可能是它。"
            ],
            barricade3b2: [
                '<25>{#p/alphys}{#g/alphysShocked}* 什...',
                '<25>{#g/alphysOhGodNo}* 你是怎麼知道的？',
                "<25>{#g/alphysOhGodNo}* 不應該有人知道\n  這個的啊！！！",
                '<25>{#g/alphysNeutralSweat}* 你-你有告訴過\n  其他人嗎？？',
                '<25>{#g/alphysNeutralSweat}* 你有這個打算嗎！？',
                '<25>{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysNervousLaugh}* 行吧...\n  這至少不是Mettaton的\n  真實身份。"
            ],
            barricade3b3: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* Aidrian？',
                '<25>{#g/alphysInquisitive}* 這又是什麼逆天東西？',
                "<25>{#g/alphysSmileSweat}* 嗯，肯定不是它。"
            ],
            barricade3b4: [
                "<25>{#p/alphys}{#g/alphysCutscene1}* 所以說...\n  Mettaton的真實身份\n  其實就是Mettaton，嗯？",
                '<25>{#x1}* ...',
                '<25>{#p/alphys}{#g/alphysWelp}* 喔。\n* 看來對了。',
                '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 你懂的真多！'
            ],
            barricade3c: [
                '<25>* ...',
                '<25>{#p/alphys}{#g/alphysSide}* 嗯... 我有個主意。',
                '<32>{#p/human}* （敲鍵盤的聲音又響了起來。）',
                '<25>{#p/alphys}{#g/alphysCutscene1}{#x1}* ...',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* 成啦！！！',
                '<25>{#g/alphysUhButHeresTheDeal}* 還蠻有意思的。'
            ],
            barricadeFail1: [
                '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysNeutralSweat}* 也不對...\n  看來我得手動介入了。",
                '<25>{#g/alphysWelp}* ...',
                '<25>{#g/alphysWelp}* 可能得花些時間。',
                "<25>{#g/alphysUhButHeresTheDeal}* 完事之後我會跟-\n  跟你說一聲的！"
            ],
            barricadeFail2: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* 好-好了，\n  終於改好了。'
            ],
            barricadeFail2x: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* ...',
                '<25>{#g/alphysInquisitive}* 你跑別的房間去了？',
                '<25>{#g/alphysSide}* 呃，行吧。\n  現在路障已經消失了。'
            ],
            barricadeFail3: ['<25>{#p/alphys}{#g/alphysCutscene1}* 希望對你有所幫助！'],
            barricade4: () => [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysSideSad}* 咋又來...',
                '<25>{#g/alphysSideSad}* ...',
                "<25>{#g/alphysWelp}* 等下，Mettaton的帳號\n  我還登著呢。",
                '<25>{#g/alphysNervousLaugh}* 我應該可以直-直接就\n  解鎖的！',
                '<32>{|}{#p/human}* （敲鍵盤的聲音又- {%}',
                '<25>{#p/alphys}{#g/alphysHellYeah}{#x1}* 搞定！',
                '<25>{#g/alphysWelp}* ...',
                "<25>{#g/alphysGarboCenter}* 真心希望能\n  別再碰上那玩意了。",
                ...(SAVE.data.b.failshow
                    ? []
                    : SAVE.data.b.item_tvm_mewmew &&
                        !SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                        !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                        !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                        ? [
                            '<25>{#g/alphysTheFactIs}* 喔，還-還有，\n  那個喵喵玩偶...',
                            '<25>* 嗯...',
                            '<25>{#f/10}* 等下，你是...',
                            '<25>{#f/3}* 你-你是直接把它\n  給扔了嗎？',
                            '<25>{#f/3}* ...',
                            '<25>{#g/alphysUhButHeresTheDeal}* 當然，沒事的！'
                        ]
                        : [
                            '<25>{#g/alphysTheFactIs}* 喔，還-還有，\n  那個喵喵玩偶...',
                            '<25>* 嗯...',
                            SAVE.data.b.item_tvm_mewmew
                                ? "<25>{#g/alphysUhButHeresTheDeal}* I'll get back to you on that later."
                                : "<25>{#g/alphysUhButHeresTheDeal}* 其實都不在你手上，\n  沒事了。",
                            '<25>{|}{#g/alphysCutscene3}* 總之電梯見，\n  拜拜啦啊啊- {%}'
                        ]),
                '<32>{#s/equip}{#p/event}* 滴...'
            ],
            puzzleReaction1: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysHellYeah}* 你做到了！！',
                '<25>{#g/alphysNeutralSweat}* ...',
                '<25>{#g/alphysCutscene2}* 恭... 恭喜你啊。'
            ],
            cooker1a: ['<32>{#p/mettaton}* 你好啊。'],
            cooker1b: ["<32>{*}{#p/mettaton}* 歡迎來到前哨站的首期\n  創藝工坊節目！{^30}{%}"],
            cooker2a1: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 我們今天要做些啥呢？\n* 反正肯定是些好玩的！']
                    : ['<32>{#p/mettaton}* 大家的工具都充好電了嗎？\n  我們馬上就要來搞一些\n  「勁爆」的玩意了！'],
            cooker2a2: () =>
                iFancyYourVilliany()
                    ? ["<32>{#p/mettaton}* 畢竟，要做什麼好東西\n  還不是我們說了算！"]
                    : ['<32>{#p/mettaton}* 哈哈哈...'],
            cooker2b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* 這位暴燥的惡霸\n  將會去準備用品。',
                        '<32>{#p/mettaton}* 我們大家\n  都應該一起孤立那惡霸！'
                    ]
                    : [
                        '<32>{#p/mettaton}* 我可愛的助手會去準備用品。',
                        '<32>* 請大家給予熱烈的掌聲！'
                    ],
            cooker3a: () => [
                "<32>{#p/mettaton}* 我們需要三件重要的物品。",
                iFancyYourVilliany()
                    ? '<32>* {@fill=#ff0}幸福閃粉{@fill=#fff}，{@fill=#ff0}激情水漿{@fill=#fff}，\n  和{@fill=#ff0}博愛甘油{@fill=#fff}。'
                    : '<32>* {@fill=#ff0}環三亞甲基三硝胺{@fill=#fff}，\n  {@fill=#ff0}己二酸二正辛酯{@fill=#fff}，和{@fill=#ff0}礦物油{@fill=#fff}。'
            ],
            cooker3b: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 開始吧，$(moniker2u)！']
                    : ['<32>{#p/mettaton}* 開始吧，甜心！'],
            cooker4a: ['<32>{#p/mettaton}* 好極了！', '<32>* 現在，讓我...'],
            cooker4b: ['<32>{#p/mettaton}* 搞定！', "<32>* 我們要用這些東西..."],
            cooker5: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* ...來製作MTT牌{@fill=#003cff}樂樂史萊姆{@fill=#fff}！(TM)']
                    : ['<32>{#p/mettaton}* ...來製作{@fill=#f00}塑性炸藥{@fill=#fff}！'],
            cooker6: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 我要開始嘍！']
                    : ['<32>{#p/mettaton}* 祈禱吧，美人兒！'],
            cooker7a: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/alphys}{#g/alphysShocked}* 呃，等-等一下！',
                        "<25>{#g/alphysOhGodNo}* 啥{@fill=#003cff}樂樂史萊姆{@fill=#fff}...",
                        "<25>{#g/alphysUhButHeresTheDeal}* 那就是個{@fill=#f00}塑性炸藥{@fill=#fff}！"
                    ]
                    : [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/alphys}{#g/alphysShocked}* 呃，等-等一下！',
                        '<25>{#g/alphysOhGodNo}* 你要是現在就把它\n  做出來的話...',
                        "<25>{#g/alphysUhButHeresTheDeal}* 可是會把半-半個空境\n  毀了的！"
                    ],
            cooker7b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* ...啊？\n* 你是說我們的特邀嘉賓\n  把材料掉包了？',
                        '<25>{#p/alphys}{#g/alphysTheFactIs}* 我-我...\n  不是那個意思...',
                        '<32>{#p/mettaton}* 親們...\n* 看來我們的特邀嘉賓\n  真把材料掉包了！',
                        "<25>{#p/alphys}{#g/alphysSmileSweat}* 我沒這麼說- {%}",
                        '<32>{#p/mettaton}* 怎麼能搞這種小動作呢...\n* 為人也太陰險了點吧！'
                    ]
                    : [
                        '<32>{#p/mettaton}* 可是為什麼呢...？',
                        "<25>{#p/alphys}{#g/alphysTheFactIs}* 因-因為...\n* 這...",
                        "<25>{#g/alphysHellYeah}* 因為這片區域有一塊\n  超光速粒子勵磁場！！",
                        '<32>{#p/mettaton}* 有一塊啥？',
                        '<25>{#p/alphys}{#f/3}* 我今天得用這塊勵磁場\n  做個實驗。',
                        '<32>{#p/mettaton}* 喔。'
                    ],
            cooker7c: ['<32>{#p/mettaton}* 等等，這很可能讓人喪命。'],
            cooker7d: [
                "<32>{#p/mettaton}* WAIT! SOMETHING'S WRONG...",
                "<32>{#p/mettaton}* THIS ISN'T MTT-BRAND {@fill=#003cff}FUN SLIME{@fill=#fff} AT ALL!",
                '<32>{#p/mettaton}* NO... THIS IS {@fill=#f00}PLASTIC EXPLOSIVE{@fill=#fff}!',
                "<32>{#p/mettaton}* OUR SPECIAL GUEST MUST'VE SWAPPED THE INGREDIENTS!",
                '<32>{#p/mettaton}* 怎麼能搞這種小動作呢...\n* 為人也太陰險了點吧！'
            ],
            cooker8a1: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* 不過別擔心。",
                        '<32>* 運氣好的話，\n  那惡霸會學到教訓，\n  下次不會來破壞我的節目。'
                    ]
                    : [
                        '<32>{#p/mettaton}* 抱歉，各位...',
                        "<32>* 看來我們【今天】\n  不會製作任何炸藥了。"
                    ],
            cooker8a2: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>* 啥！？！？\n* 辦創藝工坊只是個障眼法！？！？\n  真傢伙竟然在這！？！？",
                        "<32>* 天吶，$(moniker1u)可真是壞得沒邊了！"
                    ]
                    : ['<32>* 幸好我提前做了一些，對吧？'],
            cooker8b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>* 哎呀呀，親愛的$(moniker2u)，\n  對你這種人，我還是留了一手的。\n  （只是個比喻。）',
                        "<32>* 要是那你沒能在{@fill=#ff0}九十秒{@fill=#fff}內\n  飛過這片虛空..."
                    ]
                    : [
                        "<32>* 然後，為了增加緊張感，\n  你需要在{@fill=#ff0}九十秒{@fill=#fff}內飛過這片虛空..."
                    ],
            cooker9: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* 我就用你的自製武器\n  把你{@fill=#f00}炸成碎片{@fill=#fff}！"
                    ]
                    : ["<32>{#p/mettaton}* 不然就會被{@fill=#f00}炸成碎片{@fill=#fff}！"],
            cooker10: ['<32>{#p/mettaton}* 你最好現在開跑！！！'],
            cooker11: ["<32>{#p/basic}* 看起來靠你自己是無法穿越這裡的。"],
            cooker12: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/alphys}{#f/20}* 呃... 我...',
                        "<25>{#g/alphysIDK}* 不-不確定這個法子\n  有沒有用...",
                        "<25>{#f/16}* 不-不過說出來\n  總比乾等著看你死好！！",
                        "<25>{#f/10}* 都走到這了...\n  你-你也不想放棄吧？",
                        '<25>{#f/5}* 是這樣，這兒的手機...',
                        '<25>{#f/6}* 大多都配有\n  一次性便攜飛行器。',
                        '<25>{#f/10}* ...你那臺應該也有吧？？'
                    ]
                    : [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/alphys}{#g/alphysSide}* 嘿，呃...',
                        '<25>{#g/alphysCutscene1}* 我知道個法子\n  能讓你飛過去！',
                        "<25>{#g/alphysNervousLaugh}* 就是...",
                        "<25>{#g/alphysSmileSweat}* 雖然比不上Undyne的，\n  但是，我給你的那部\n  手機裡...",
                        '<25>{#g/alphysHellYeah}* 有個一次性的\n  可攜式噴氣背包！',
                        '<25>{#g/alphysNervousLaugh}* 或許...\n  現在正好能用用看？？'
                    ],
            cooker12x: ["<32>{#p/basic}* ...你意識到Alphys的手機\n  配備了個噴氣背包。"],
            cooker13: () => [
                '<32>{#p/human}* （你激活了噴氣背包。）',
                SAVE.data.n.state_foundry_undyne > 0
                    ? '<25>{#p/alphys}{#f/3}* 祝-祝你好運？'
                    : "<25>{#p/alphys}{#g/alphysHellYeah}* 上吧！",
                '<32>{#s/equip}{#p/event}* 滴...',
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* 實在太癲了。'])
            ],
            cooker13x: ['<32>{#p/human}* （你激活了噴氣背包。）'],
            cooker14: ' $(x)',
            cooker15: '$(x)%',
            cooker16a: ['<32>{#p/mettaton}* 你知道在這兒會有生命危險...\n  對吧？'],
            cooker16b: ['<32>* ...'],
            cooker16c: ['<32>* 也許我們的嘉賓精神不太穩定。', '<32>* 這樣的話...'],
            cooker16d: [
                "<32>* 這期節目就得被剪輯了！",
                "<32>* 不過，別擔心。",
                "<32>* 我們的下一期節目甚至\n  【不需要】你保持理智！"
            ],
            cooker16e: () => [
                "<32>{#p/mettaton}* 好吧，到此為止。",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* 聽好了，「$(moniker2u)」...',
                        '<32>* 下次再讓我碰上你，\n  能不能保持你的理智\n  就不是你該操心的事兒了！'
                    ]
                    : ['<32>* 那麼，下回再說吧...', '<32>* 讓我們祝願人類平安無事。'])
            ],
            cooker16f: [
                '<32>{#p/basic}* 喂？？',
                "<32>* 傻站在這你會死的！",
                "<32>* ...要是不知道這是節目需要，\n  我肯定會這麼說。",
                "<32>* 不過你也別整太無聊了啊！"
            ],
            cooker17a: [
                '<32>{#p/mettaton}* 哎呀呀...',
                "<32>* 看起來... 你甚至一半都沒走到？",
                "<32>* 天啊。\n* 這麼說你要死了。",
                '<32>* 哈哈哈...',
                '<32>* ...',
                '<32>* ...開玩笑的。',
                '<32>* 你得安然無恙地參加下一期節目。'
            ],
            cooker17b: [
                '<32>{#p/mettaton}* 哎呀呀...',
                "<32>* 能力有限，是不是？",
                "<32>* 不過沒關係。\n* 看在你輸得起的分上，我放你過關了。"
            ],
            cooker17c: () => [
                "<32>{#p/mettaton}* 好吧，到此為止。",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* 聽好了，「$(moniker2u)」...',
                        "<32>* 下次再見，可別指望我手下留情了！"
                    ]
                    : ['<32>* 那麼，下回再說吧...', '<32>* 再見了各位！'])
            ],
            cooker17d: [
                '<32>{#p/basic}* 真是太「炸裂」了！',
                "<32>{#p/basic}* 不知道你下次的表現\n  會不會也這麼好。"
            ],
            cooker17e: [
                '<32>{#p/basic}* 真是太「炸裂」了！',
                "<32>{#p/basic}* 沒趕上時間，真可惜。"
            ],
            cooker18a: [
                '<32>{#p/mettaton}* 哎呀呀...',
                "<32>* 看來你還是趕上時間了呢。",
                "<32>* 恭喜恭喜！\n* 您也沒笨得那麼徹底。"
            ],
            cooker18b: [
                '<32>{#p/mettaton}* 哇喔！\n* 掐點到達！',
                "<32>* 親愛的，運氣不錯喔。",
                "<32>* 就差那麼幾秒，\n  你就得被炸成爆米花了！"
            ],
            cooker18c: () => [
                "<32>{#p/mettaton}* 好吧，我很想繼續陪你玩玩，\n  但我【現在】的日程\n  有點排不開了。",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* 聽好了，「$(moniker2u)」...',
                        '<32>* 下次見面時，\n  時間【可不會】等你的！'
                    ]
                    : ['<32>* 那麼，下回再說吧...', '<32>* 再見了各位！'])
            ],
            cooker19a: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysCutscene1}* 你做到了！！',
                '<25>{#g/alphysCutscene2}* ...',
                "<25>{#g/alphysUhButHeresTheDeal}* 其實算在我意料之中吧。"
            ],
            cooker19b: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                '<25>{#g/alphysSmileSweat}* ...做到了？？',
                '<25>{#p/alphys}{#g/alphysCutscene1}* 喔耶！\n* 你做到了！！',
                '<25>{#g/alphysWelp}* ...'
            ],
            cooker19c: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                '<25>{#g/alphysNeutralSweat}* ...',
                '<25>{#g/alphysFR}* 這麼喜歡尋死？'
            ],
            robocaller3: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                "<32>{#p/mettaton}* 看來你們到片場了呢。",
                '<32>* 對著鏡頭，笑一個。'
            ],
            robocaller4: [
                "<32>* 因為，你們現在上電視了呢，\n  大明星！",
                "<32>* 真遺憾呀，\n  我只能在幕後主持節目了呢...",
                "<32>* 不過別氣餒，聽說現在\n  很流行這種「幕後主持人」喔，\n  你倆該不會不知道吧？",
                '<32>* 哎呀呀，你們又沒有噴氣背包，\n  怎麼才能飛過那片虛空呢？',
                '<32>* 我好像也不知道呢...',
'<32>* 苦惱吧，掙扎吧。\n  觀眾別走喔，現在有好戲看啦。',
                '<32>* 祝好！'
            ],
            robocaller4x: [
                '<25>{#p/asriel2}{#f/8}* 「祝好」？\n* 你個蠢貨，扯什麼淡呢？',
                '<25>{#f/6}* 祝福也得挑挑人啊。',
                "<25>{#f/7}* 前頭有個升降機。\n* 走，咱去看看。"
            ],
            cookerX1: [
                '<32>{#p/basic}* 啊，是你們...\n* 我就知道...',
                '<32>* 這個升降機\n  是用來疏散民眾的。',
                "<32>* 現在疏散工作已經完成，\n  所以... 我不會再放人了。",
                '<32>{|}* 所以你倆還是- {%}'
            ],
            cookerX2: ['<25>{#p/asriel2}{#f/6}* 滾。'],
            cookerX3: ["<32>{#p/basic}* 啊！\n* 對不起... 我不敢..."],
            cookerX4: [
                '<32>{#p/basic}* 我-我是說...\n  我會破例的...',
                "<32>* 求... 求你們別告訴老闆..."
            ],
            cookerX5a: ['<25>{#p/asriel2}{#f/2}* 喔？\n* 打算放我們過去，是嗎？'],
            cookerX5b: ['<25>{#f/1}* 這還差不多。'],
            cookerX6: ["<32>{#p/basic}* ...當-當然！\n* 我-我保證不攔你們！"],
            cookerX7: ['<25>{#p/asriel2}{#f/3}* 識時務者為俊傑。'],
            cookerX8: ["<25>{#p/asriel2}{#f/3}* 咱們走。"],
            cookerX9: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                "<32>{#p/mettaton}* 你倆就這麼飛過虛空了。",
                '<32>* ...',
                '<32>* 看來...',
                '<32>* 派一個低級服務員\n  去守升降機...\n* 是我失策了。',
                
                '<32>* ...',
                '<32>* 唉，好吧。',
                "<32>* 反正，我早晚滅了你們。"
            ],
            whatthefuck: [
                '<32>{#p/basic}* 別擔心，我不會有事的！',
'<32>{#p/basic}* 這些光圈能證明，\n  就算老闆炒我魷魚，\n  我也肯定能復職的...'
            ],
            puzzleReaction2a: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<25>{#p/alphys}{#g/alphysSide}* 你找到檢查點了！',
                '<25>{#g/alphysWelp}* 不過，呃，這才只是\n  第-第一個呢。',
                "<25>{#g/alphysNeutralSweat}* 還有兩個要找。"
            ],
            puzzleReaction2b: ['<32>{#p/event}* 鈴鈴，鈴鈴...', '<25>{#p/alphys}{#g/alphysWelp}* 還剩一個。'],
            puzzleReaction2c: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                "<25>{#p/alphys}{#g/alphysHellYeah}* 好！！\n* 最後一個也搞定了！！",
                '<25>{#g/alphysCutscene2}* 誒嘿...',
                '<25>{#f/10}* ...',
                "<25>{#f/3}* 不用評判我，\n  我就是喜歡給你\n  加油打氣而已。"
            ],
            moneyPre1: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* 你來了啊。',
                        '<32>{#p/mettaton}* 迄今為止，\n  你配合的很好，\n  親愛的「$(moniker2u)」。'
                    ]
                    : world.bad_robot
                        ? [
                            "<32>{#p/mettaton}* 你遲到了，親愛的...",
                            "<32>{#p/mettaton}* 要是你不再殺人，\n  那不成問題的。"
                        ]
                        : ['<32>{#p/mettaton}* 你來了啊，人類。', "<32>* 你比演出時間開始\n  早到了幾分鐘呢。"],
            moneyPre2: () =>
                iFancyYourVilliany()
                    ? ['<32>* ...不過，\n  你可以繼續保持下去嗎？']
                    : ['<32>* ...你介意先去到舞臺左側嗎？'],
            moneyPre3: () => [
                ...(iFancyYourVilliany()
                    ? ["<32>{#p/mettaton}* 呃，現在我得先讓你\n  去到舞臺左側。"]
                    : []),
                '<32>* 等我叫你之後，\n  你再回到畫面裡來。'
            ],
            moneyPre4: ['<32>{#p/basic}* 過了一會兒...'],
            moneyIntro1: [
                "<32>{#p/mettaton}* 夥計們，\n  今天我們要做點不一樣的事。",
                '<32>{#z2}* 歡迎各位來到...',
                '<32>{*}{#z0}* {#x1}特別節目：{^10}\n* {#x2}時過！{^10}\n* {#x3}金遷！{^30}{%}'
            ],
            moneyIntro2: ["<32>{#p/mettaton}{#z1}* 讓我們熱烈歡迎選手們..."],
            moneyIntro3a: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}{#z0}* 衛隊隊長，UNDYNE！']
                    : ['<32>{#p/mettaton}{#z0}* 骷髏SANS！'],
            moneyIntro3b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/1}* 沒錯！']
                    : world.dead_skeleton
                        ? [
                            '<25>{#p/sans}{#g/sansWink}* 這大概是我今天\n  唯一的好事了。',
                            '<25>* 如果這能\n  稱之為好事的話。'
                        ]
                        : ['<25>{#p/sans}{#g/sansWink}* 我真的愛死你這個\n  事先預錄好的掌聲了。'],
            moneyIntro4a: ['<32>{#p/mettaton}* NAPSTABLOOK！'],
            moneyIntro4b: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/napstablook}* 沒必要老用那個鼓掌音效的..."]
                    : alphysPhoneDisplay() && SAVE.data.n.state_foundry_undyne === 1
                        ? ['<32>{#p/napstablook}* 大家好']
                        : ['<32>{#p/napstablook}* 大家好...'],
            moneyIntro5a: () =>
                iFancyYourVilliany() ? ['<32>{#p/mettaton}* $(moniker1u)！'] : ['<32>{#p/mettaton}* 神秘的人類！'],
            moneyIntro6a: ['<32>{#p/mettaton}* 以及... 隨便找的小孩！'],
            moneyIntro6b: () =>
                SAVE.data.b.f_state_kidd_betray ? ['<25>{#p/kidd}{#f/3}* 大家好。'] : ['<25>{#p/kidd}{#f/1}* 喲！'],
            moneyIntro7: [
                '<32>{#p/mettaton}{#z0}* 非常感謝各位的到來！',
                "<32>{#z2}* 各位，先做個簡短的\n  自我介紹吧，如何？"
            ],
            moneyIntro8: [
                '<32>{#p/mettaton}{#z0}* ...',
                '<32>{#z1}* ...',
                "<32>* 那位選手好像不來了。",
                '<32>* ...',
                '<32>* 這就有點麻煩了。',
                '<32>* ...',
                '<32>{#z2}* 有人想代替那位嗎？',
                '<32>* 有人嗎？'
            ],
            moneyIntro9: ['<32>{#p/tem}* 你吼！！\n* 我素temmie！！！'],
            moneyIntro10: [
                '<32>{#p/mettaton}{#z5}* 意料之外的嘉賓！？！？\n* 哇，這個節目越來越瘋狂了！',
                '<32>{#p/mettaton}{#z2}* 這嘉賓好像背對著舞臺...\n* 算了。'
            ],
            moneyIntro11: ['<32>{#p/mettaton}{#z1}* 新面孔除外...'],
            moneyChat1: () =>
                iRespeccYourVilliany()
                    ? [
                        '<25>{#p/undyne}{#f/17}* 啊？\n* 你在教我說話？',
                        "<25>{#p/undyne}{#f/1}* 得得得，我可不跟你客氣。\n  要我說，你就是個\n  煩人的破鐵皮盒子。",
                        '<25>{#p/undyne}{#f/7}* 不僅如此，\n  你還把你的員工\n  當垃圾一樣對待！',
                        "<25>{#p/undyne}{#f/12}* 呃，我搶了Papyrus的名額\n  才不是為了你呢。",
                        '<25>{#p/undyne}{#f/16}* 我來這，就一個原因。'
                    ]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansNormal}* 你好啊。']
                        : [
                            '<25>{#p/sans}{#g/sansLaugh2}* 喔，嘿嘿...',
                            "<25>{#g/sansNormal}* 我是sans。\n* 骷髏sans。",
                            '<25>{#g/sansLaugh1}* 按理說，我的工作\n  就是抓捕長得像那邊\n  那個傢伙一樣的人類。',
                            "<25>{#g/sansBlink}* 不過嘛，嗯...\n* 既然我們現在都在\n  電視節目上了...",
                            "<25>{#g/sansWink}* 那應該就得等一等了。"
                        ],
            moneyChat1a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* 是什麼呢？"]
                    : world.dead_skeleton
                        ? ['<32>{#p/mettaton}* 還有嗎？']
                        : ['<32>{#p/mettaton}* 你今天也給我們準備\n  蹩腳的爛笑話了嗎？'],
            moneyChat1b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/8}* 當然是為了見見$(moniker1)啦！\n* 呋呼呼！']
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansNormal}* 沒有。']
                        : [
                            "<25>{#p/sans}{#g/sansLaugh1}* 蹩腳？\n* 哇塞，mettaton，你還有臉\n  對我說教？",
                            "<25>{#g/sansBlink}* 不要再如玩遊戲般亂鬧。\n* 你的所有電視節目主持都是\n  一個樣貌。",
                            "<25>{#g/sansNormal}* 但是，呃，如果我們現在\n  是在開玩笑...\n* 那就未免有點枯燥。",
                            '<25>{#g/sansLaugh1}* 說起來，我聽說你想\n  主持一檔喜劇節目...',
                            '<25>{|}{#g/sansLaugh2}* 但誰都- {%}'
                        ],
            moneyChat1c: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}* 行吧。']
                    : world.dead_skeleton
                        ? ["<32>{#p/mettaton}* 有人今天不舒服，是嗎？"]
                        : ['<32>{#p/mettaton}* 真有趣。'],
            moneyChat2: ['<32>{#p/napstablook}* 輪到... 我講了嗎...'],
            moneyChat2a: () =>
                iRespeccYourVilliany()
                    ? ["<25>{#p/undyne}{#f/14}* 不是你還是誰，\n  難道又回到我了？"]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansBlink}* ...']
                        : ["<25>{#p/sans}{#g/sansBlink}* 放寬心，別害怕嘛。"],
            moneyChat2b: () => [
                iRespeccYourVilliany()
                    ? '<32>{#p/napstablook}* 喔...\n* 嗨......'
                    : world.dead_skeleton
                        ? "<32>{#p/napstablook}* 看來，是的........."
                        : '<32>{#p/napstablook}* 嗯.........\n* 大家好............',
                ...(world.scared_ghost
                    ? ["<32>* ............我叫napstablook。"]
                    : [
                        "<32>* 呃... 我叫napstablook",
                        '<32>* 我很喜歡做音樂，我...',
                        '<32>* 我...',
                        '<32>* 呃... 我...'
                    ])
            ],
            moneyChat2c: () =>
                world.scared_ghost ? ['<32>{#p/mettaton}{#z1}* 還有嗎...？'] : ['<32>{#p/mettaton}{#z1}* ...你想說什麼？'],
            moneyChat2d: () =>
                world.scared_ghost
                    ? ["<32>{#p/napstablook}* 呃......... \n  不能讓下一個人說嗎"]
                    : ["<32>{#p/napstablook}* 我...\n* 我介紹完了", '<32>* 抱歉...............'],
            moneyChat2e: () =>
                world.scared_ghost
                    ? ['<32>{#p/mettaton}{#z0}* ...好吧...']
                    : [
                        "<32>{#p/mettaton}{#z0}* 沒關係，BLOOKY...",
                        "<32>* 我們都有緊張的時候，\n  不是嗎，表-",
                        '<32>{#z2}* 呃... 寶貴！\n* 因為這次機會確實很難得！',
                        '<32>{#z4}* 哈哈哈...'
                    ],
            moneyChat3: () =>
                world.scared_ghost
                    ? ["<32>{#p/napstablook}* 到你了。", "<32>{#p/human}* （可是，你沒什麼想說的。）"]
                    : [
                        '<32>{#p/napstablook}* 呃......',
                        '<32>* 你可以開始講了？',
                        "<32>{#p/human}* （可是，你沒什麼想說的。）"
                    ],
            moneyChat3a: () =>
                iFancyYourVilliany()
                    ? [
                        '<33>{#p/mettaton}* 好吧，總能聽到...',
                        '<32>{#p/mettaton}* 有些人啊，雷聲大雨點小！',
                        "<32>{#p/mettaton}* 而我們這位惡霸王中王\n  就當然不會輕易開口了。"
                    ]
                    : ['<32>{#p/mettaton}* 「神秘的人類」，\n  果然名副其實。'],
            moneyChat4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? SAVE.data.b.colleg
                        ? ['<32>{#p/tem}* tem... 去了大鞋，']
                        : ['<32>{#p/tem}* tem... 上了電視！！']
                    : [
                        '<25>{#p/kidd}{#f/1}* 哈哈，確實。',
                        ...(SAVE.data.b.f_state_kidd_betray
                            ? [
                                "<25>{#f/1}* 喔！\n* 輪到我了是嗎？",
                                "<25>{#f/4}* 今天...\n  真的不怎麼樣...",
                                '<25>{#f/8}* 哈哈...',
                                "<25>{#f/5}* ...好吧，我叫怪物小孩。"
                            ]
                            : [
                                "<25>{#f/1}* 喔！\n* 應該是輪到我了吧？？",
                                "<25>{#f/4}* 不清楚...\n  我的父母有沒有\n  在看這檔節目，不過...",
                                "<25>{#f/1}* 他們最好沒在看吧！！\n* 他們... 應該不喜歡我上這兒。",
                                '<25>{#f/1}* 哈哈。',
                                "<25>{#f/2}* 話說回來，我叫怪物小孩。"
                            ])
                    ],
            moneyChat4a: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* 然後呢...？']
                    : ["<32>{#p/mettaton}* 等下，確定是真名？"],
            moneyChat4b: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? SAVE.data.b.colleg
                        ? ['<32>{#p/tem}* tem知道了所有的價格！！']
                        : ['<32>{#p/tem}* tem... 喜歡上電視！！']
                    : SAVE.data.b.f_state_kidd_betray
                        ? ['<25>{#p/kidd}{#f/4}* ...']
                        : ["<25>{#p/kidd}{#f/1}* 不行嗎？"],
            moneyChat4c1: ['<32>{#p/mettaton}* 呃...'],
            moneyChat5: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* 好了，\n  我們的介紹環節\n  算是結束了。']
                    : ['<32>{#p/mettaton}* 好了，\n  我們的介紹環節\n  算是圓滿結束了。'],
            moneyTr1: [
                '<32>* 是這樣，\n  這個遊戲是關於價格的。',
                "<32>* 我們今天準備了三件\n  稀有的地球文物。",
                "<32>* 將由你們幾位選手來競猜\n  這些東西的準確價格！",
                '<32>* 猜得最接近【且不超過】的人\n  就能把它帶回家！'
            ],
            moneyTr2: ["<32>{*}* 我宣布..."],
            moneyTr3: ['<32>{*}* {#x1}時過！{^10}\n* {#x2}金遷！{^10}\n* {#x3}正式開始！{^30}{%}'],
            moneyHelper: '* 按←和→調整價格，\n  然後按[Z]確認。§fill=#ff0§$(x)G',
            moneyHelperConfirmed: '* 按←和→調整價格，\n  然後按[Z]確認。§fill=#f00§$(x)G',
            moneyItem1: {
                a: [
                    '<32>{#p/mettaton}* 我們的第一件物品\n  是我最近找到的...',
                    '<32>* 在地球上，這個裝置是用來接收\n  所謂「無線電臺」的\n  播送內容的。',
                    "<32>* 包括新聞，天氣，音樂...\n* 甚至是你現在正參加的\n  遊戲節目！",
                    "<32>* 我們來看看場上有沒有人\n  了解這種裝置。"
                ],
                b: [
                    "<32>{#p/mettaton}* 那麼，大家都決定好了？",
                    '<32>* 好極了！',
                    "<32>* 現在，讓我們揭曉一下價格..."
                ],
                c: ['<32>{#p/mettaton}* 80G！'],
                d: () =>
                    SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                        ? [
                            "<32>{#p/mettaton}* 恭喜你，TEMMIE。\n* 你贏得了屬於你自己的\n  老式地球收音機！",
                            '<32>{#p/tem}* 嗚哇喔哇喔哇喔.....'
                        ]
                        : [
                            "<32>{#p/mettaton}* 恭喜你，BLOOKY。\n* 你贏得了屬於你自己的\n  老式地球收音機！",
                            world.scared_ghost ? '<32>{#p/napstablook}* 酷' : '<32>{#p/napstablook}* 嗚嗚嗚嗚嗚嗚嗚'
                        ],
                e: () =>
                    iFancyYourVilliany()
                        ? ["<32>{#p/mettaton}* 好樣的，$(moniker3u)。\n* 你贏得了屬於你自己的\n  老式地球收音機！"]
                        : ["<32>{#p/mettaton}* 恭喜你，人類。\n* 你贏得了屬於你自己的\n  老式地球收音機！"],
                f: () =>
                    SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                        ? [
                            iFancyYourVilliany()
                                ? '<32>{#p/mettaton}* TEMMIE，\n  由於你比$(moniker3u)先一步作答...'
                                : '<32>{#p/mettaton}* TEMMIE，\n  由於你比人類先一步作答...',
                            "<32>{#p/mettaton}* 恭喜！\n* 你贏得了屬於你自己的\n  老式地球收音機！",
                            '<32>{#p/tem}* 嗚哇喔哇喔哇喔.....'
                        ]
                        : [
                            iFancyYourVilliany()
                                ? '<32>{#p/mettaton}* BLOOKY，\n  由於你比$(moniker3u)先一步作答...'
                                : '<32>{#p/mettaton}* BLOOKY，\n  由於你比人類先一步作答...',
                            "<32>{#p/mettaton}* 恭喜！\n* 你贏得了屬於你自己的\n  老式地球收音機！",
                            world.scared_ghost ? '<32>{#p/napstablook}* 酷' : '<32>{#p/napstablook}* 嗚嗚嗚嗚嗚嗚嗚'
                        ],
                g: () => [
                    SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                        ? iFancyYourVilliany()
                            ? '<32>{#p/mettaton}* 好樣的，$(moniker3u)。\n* 由於你比TEMMIE先一步作答...'
                            : '<32>{#p/mettaton}* 人類，\n  由於你比TEMMIE先一步作答...'
                        : iFancyYourVilliany()
                            ? '<32>{#p/mettaton}* 好樣的，$(moniker3u)。\n* 由於你比BLOOKY先一步作答...'
                            : '<32>{#p/mettaton}* 人類，\n  由於你比BLOOKY先一步作答...',
                    "<32>{#p/mettaton}* 恭喜！\n* 你贏得了屬於你自己的\n  老式地球收音機！"
                ]
            },
            moneyVote1: () => [
                '<32>{#p/mettaton}* 好了，選手們，\n  這一輪到此結束。',
                "<32>* 由於這是第一輪，\n  你們得投票決定誰被淘汰。",
                ...(world.scared_ghost
                    ? []
                    : [
                        '<32>{#p/napstablook}* 嘿，呃.........\n* 我有個問題.........',
                        "<32>{#p/mettaton}* 不，BLOOKY，\n  你不能投自己。",
                        '<32>{#p/napstablook}* 噢............'
                    ]),
                iRespeccYourVilliany()
                    ? "<32>{#p/mettaton}* 淘汰時間到了，夥計們！\n* UNDYNE，你先來。"
                    : "<32>{#p/mettaton}* 淘汰時間到了，夥計們！\n* SANS，你先來。",
                "<32>{#p/mettaton}* 你要票誰？"
            ],
            moneyVote2: () =>
                iRespeccYourVilliany()
                    ? [
                        "<25>{#p/undyne}{#f/14}* 嗯... 我打算投Napstablook。",
                        "<26>{#p/undyne}{#f/16}* 不是針對他...\n* 我只是跟其他選手更熟罷了。"
                    ]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}* ...', "<25>{#p/sans}{#g/sansBlink}* 呃，我現在沒心情。"]
                        : ['<25>{#p/sans}* 小雞。'],
            moneyVote2a: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}* BLOOKY，你想票掉誰呢？']
                    : world.dead_skeleton
                        ? ["<32>{#p/mettaton}* 好吧，少了一票。", '<32>{#p/mettaton}* BLOOKY，你想票掉誰呢？']
                        : [
                            '<32>{#p/mettaton}* 嗯...',
                            '<32>* 什麼「小雞」？',
                            "<25>{#p/sans}{#g/sansLaugh1}* 小{@fill=#ff0}雞{@fill=#fff}器人{@fill=#ff0}你太鎂{@fill=#fff}了。",
                            "<32>{#p/mettaton}* 你出局！",
                            '<25>{#p/sans}{#g/sansLaugh2}* 呵呵，值了。',
                            '<32>{#p/mettaton}* 呃... BLOOKY，你想票掉誰呢？'
                        ],
            moneyVote3a: () =>
                iRespeccYourVilliany()
                    ? [
                        '<32>{#p/napstablook}* ...............',
                        "<32>* 我...\n  並不想給他們中的\n  任何一人投票...",
                        "<32>* undyne是皇家衛隊隊長，\n  而另外兩個...",
                        "<32>* 他們只是小孩子......"
                    ]
                    : [
                        '<32>{#p/napstablook}* ...............',
                        '<32>* 呃... sans，我...',
                        "<32>* 我不是針對你，我只是...\n  不大了解你...\n  抱歉......",
                        ...(world.dead_skeleton
                            ? ['<25>{#p/sans}{#g/sansNormal}* ...', "<25>{#p/sans}{#g/sansBlink}* 沒事的。"]
                            : [
                                "<25>{#p/sans}{#g/sansBlink}* 沒事，無所謂的。\n* 我能來這裡也只是因為\n  我兄弟不想來而已。",
                                '<25>{#g/sansWink}* 他看到你會緊張的，\n  mettaton。'
                            ])
                    ],
            moneyVote3b: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* 好吧。\n* 那我就不計入你的投票了。"]
                    : world.dead_skeleton
                        ? []
                        : ["<32>{#p/mettaton}* 嗯...\n* 我等下去問問他吧。", '<32>* 那麼...'],
            moneyVote3x: () =>
                world.scared_ghost
                    ? ['<32>{#p/napstablook}* 人類。']
                    : [
                        '<32>{#p/napstablook}* ...............',
                        '<32>* 人類吧',
                        "<32>* 那人...\n  對我不是特別好......"
                    ],
            moneyVote3y: ['<32>{#p/mettaton}* ...'],
            moneyVote4p: () => [
                iFancyYourVilliany()
                    ? '<32>{#p/mettaton}* 你要投票嗎，親愛的$(moniker2u)？'
                    : '<32>{#p/mettaton}* 你要投票嗎，人類？',
                choicer.create('* （你要怎麼回答？）', '投票', '棄權')
            ],
            moneyVote4: () => [
                '<32>{#p/mettaton}* 不，我該問你要\n  【票掉】誰嗎？',
                choicer.create(
                    '* （你要票掉誰？）',
                    iRespeccYourVilliany() ? 'Undyne' : 'Sans',
                    'Napstablook',
                    SAVE.data.n.state_foundry_muffet === 1 ? 'Temmie' : '怪物小孩',
                    frontEnder.name.value_true
                )
            ],
            moneyVote4a1: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* 嗯，嗯...', '<32>{#p/mettaton}* 那TEMMIE，你呢？']
                    : ['<32>{#p/mettaton}* 嗯，嗯...', '<32>{#p/mettaton}* 那怪物小孩，你呢？'],
            moneyVote4a2: ["<32>{#p/mettaton}* 看來你是【不打算】投票了。", '<32>* 好的。'],
            moneyVote4a3: () => [
                "<32>{#p/mettaton}* 認真的？\n  那位也在臺上是不假，\n  但可惜並不與你競爭。",
                '<33>* 所以你的投票無效！',
                ...(SAVE.data.b.oops
                    ? []
                    : [
                        '<32>{#p/basic}* 好傢伙，謝啦Mettaton。',
                        "<32>{#p/mettaton}* 聽著，親愛的。\n* 你隱形時我很難\n  把你算入參賽者中。",
                        '<32>{#p/basic}* 哼。'
                    ])
            ],
            moneyVote4a4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* ...TEMMIE，你呢？']
                    : ['<32>{#p/mettaton}* ...怪物小孩，你呢？'],
            moneyVote5a: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/tem}* tem投... 闊愛幽靈！', '<32>* tem住的離闊愛幽靈近...\n  喜歡闊愛幽靈！']
                    : [
                        iFancyYourVilliany()
                            ? "<25>{#p/kidd}{#f/1}* 我要給$(moniker1)投一票，\n  人類酷斃了！"
                            : "<25>{#p/kidd}{#f/1}* 我要給人類投一票，\n  人類酷斃了！",
                        '<25>{#f/7}* 那個人類不僅直面了\n  有史以來...',
                        "<25>* ...最最強大的怪物之一，\n  UNDYNE...",
                        '<25>* 還在我差點沒命的時候...',
                        '<25>* ...在最後一秒鐘拉住了我，\n  把我救了下來！',
                        '<25>{#f/2}* 當著UNDYNE的面呢！！！',
                        ...(iRespeccYourVilliany()
                            ? [
                                "<25>{#p/undyne}{#f/14}* 呃，小子，\n  我就在這呢，你沒忘吧。",
                                '<25>{#p/kidd}{#f/3}* 對喔。\n* 呃，Undyne，對不起啦！\n* 哈哈。',
                                "<25>{#p/undyne}{#f/1}* 沒必要。\n* 我知道你是個乖孩子...",
                                '<25>{#p/kidd}{#f/3}* 呀... 謝了，Undyne。\n* 不過$(moniker1)比我酷太多了。'
                            ]
                            : ['<25>{#f/3}* 可以說...\n  我欠他一條命，哈哈...'])
                    ],
            moneyVote5b: ['<32>{#p/mettaton}* 你確定嗎？\n  你不知道這個投票環節\n  是要投掉你想淘汰的人嗎？'],
            moneyVote5c: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<32>{#p/tem}* 等等...',
                        '<32>{#p/tem}* ...卜！！！\n* tem卜想漂闊愛幽靈！',
                        '<32>{#p/tem}* tem要投骨骨！'
                    ]
                    : iRespeccYourVilliany()
                        ? [
                            '<25>{#p/kidd}{#f/4}* ...原來是這樣？',
                            '<25>{#p/undyne}{#f/3}* 我也想說來著。',
                            "<25>{#p/kidd}{#f/1}* 喔... 那我不投人類了，\n  都不用說了。\n  那麼...",
                            "<25>{#f/2}* 叫我票掉Undyne... \n  我可做不到！",
                            "<25>{#f/3}* 我投Napstablook吧。\n* 希望你別難過..."
                        ]
                        : [
                            '<25>{#p/kidd}{#f/4}* ...原來是這樣？',
                            "<25>{#f/1}* 嗯... 那我肯定就\n  不這麼投了...",
                            '<25>{#f/4}* 票掉Napstablook\n  可能太傷感情了...',
                            "<25>{#f/3}* 我投Sans吧。"
                        ],
            moneyVote5x: ['<32>{#p/kidd}{#f/8}* ...', '<32>{#f/8}* 票掉人類。'],
            moneyVote5x1: ["<32>{#p/mettaton}* 咦呀，看來今天有人不咋高興。"],
            moneyVote5x2a: ['<32>{#p/mettaton}* 但即使投票結果變成這樣，\n  SANS還是沒有優勢。'],
            moneyPun1: () =>
                world.dead_skeleton
                    ? ['<25>{#p/sans}* ...', '<25>{#p/sans}{#f/3}* 我還是自己走吧。']
                    : ['<25>{#p/sans}* 好吧。', "<25>{#p/sans}{#g/sansWink}* 我{@fill=#ff0}骨-啊{@fill=#fff}掉了。"],
            moneyPun1a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/napstablook}* 沒關係的....................."]
                    : world.dead_skeleton
                        ? ['<32>{#p/mettaton}* 嗯，你確實該走。']
                        : ['<32>{#p/mettaton}* 嗯，你確實是。'],
            moneyPun1b: ["<32>{#p/mettaton}* 哇，你對自己煩人的程度\n  還蠻有自知之明。"],
            moneyVote5x2b: ['<32>{#p/human}* （你感到罪惡爬上了\n  你的脊梁。）'],
            moneyVote6a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* 很遺憾，BLOOKY。\n* 但時間差不多了。\n* 再見。"]
                    : ["<32>{#p/mettaton}* 很遺憾，SANS。\n* 但時間差不多了。\n* 再見。"],
            moneyVote6b: () => (iRespeccYourVilliany() ? [] : ['<25>{#p/sans}* 拜了個拜啊，大夥。']),
            moneyVote7: [
                '<32>{#p/mettaton}* 好吧，看起來比分打平了！',
                '<32>* 在平局的情況下，\n  就由主持人選擇誰會離開。',
                '<32>* ...不對。',
                "<32>* 我就是主持人！"
            ],
            moneyVote8: ["<32>{#p/mettaton}* 很遺憾，人類。\n* 但時間差不多了。\n* 再見。"],
            moneyItem2: {
                a: [
                    '<32>{#p/mettaton}* 我們的下一件物品，\n  就像已故的教授所說的一樣，\n  是個很有技術性的東西。',
                    '<32>* 或者說...\n* 很有煙火星？',
                    '<32>* 這些叫「煙花」的東西，\n  在地球上是用來把天空\n  變得令人眼花繚亂的。',
                    '<32>* 煙花的花樣很多，\n  綻放出妙不可言的美景。',
                    "<32>* 你們認為這東西值多少錢呢？"
                ],
                b: ['<32>{#p/mettaton}* 都猜好了嗎...？', "<32>* 很好。\n* 接下來，我們來瞧瞧\n  真正的價格..."],
                c: ['<32>{#p/mettaton}* 哇，250G！', "<32>{#p/mettaton}* 這誰能想到！？"],
                d: () =>
                    SAVE.data.n.state_foundry_muffet === 1
                        ? [
                            "<32>{#p/mettaton}* 恭喜你，TEMMIE！\n* 你贏得了MTT官方\n  認證的煙花！",
                            "<32>* 雖然不是MTT牌，\n  但也僅次於它了！(TM)",
                            '<32>{#p/tem}* 啊呀呀！'
                        ]
                        : [
                            "<32>{#p/mettaton}* 恭喜你，怪物小孩！\n* 你贏得了MTT官方\n  認證的煙花！",
                            "<32>* 雖然不是MTT牌，\n  但也僅次於它了！(TM)",
                            '<25>{#p/kidd}{#f/1}* 喲-！！！'
                        ],
                e: () => [
                    iFancyYourVilliany()
                        ? "<32>{#p/mettaton}* 好樣的，$(moniker3u)。\n* 你贏得了MTT官方\n  認證的煙花。"
                        : "<32>{#p/mettaton}* 恭喜你，人類！\n* 你贏得了MTT官方\n  認證的煙花！",
                    "<32>* 雖然不是MTT牌，\n  但也僅次於它了！(TM)"
                ],
                f: () => [
                    iFancyYourVilliany()
                        ? '<32>{#p/mettaton}* 由於你比$(moniker3u)先一步作答...'
                        : '<32>{#p/mettaton}* 由於你比人類先一步作答...',
                    ...(SAVE.data.n.state_foundry_muffet === 1
                        ? [
                            "<32>{#p/mettaton}* 恭喜你，TEMMIE！\n* 你贏得了MTT官方\n  認證的煙花！",
                            "<32>* 雖然不是MTT牌，\n  但也僅次於它了！(TM)",
                            '<32>{#p/tem}* 啊呀呀！'
                        ]
                        : [
                            "<32>{#p/mettaton}* 恭喜你，怪物小孩！\n* 你贏得了MTT官方\n  認證的煙花！",
                            "<32>* 雖然不是MTT牌，\n  但也僅次於它了！(TM)",
                            '<25>{#p/kidd}{#f/1}* 喲-！！！'
                        ])
                ],
                g: () => [
                    SAVE.data.n.state_foundry_muffet === 1
                        ? '<32>{#p/mettaton}* 由於你比TEMMIE先一步作答...'
                        : '<32>{#p/mettaton}* 由於你比怪物小孩先一步作答...',
                    iFancyYourVilliany()
                        ? "<32>* 好樣的，$(moniker3u)。\n* 你贏得了MTT官方\n  認證的煙花。"
                        : "<32>{#p/mettaton}* 恭喜你，人類！\n* 你贏得了MTT官方\n  認證的煙花！",
                    "<32>* 雖然不是MTT牌，\n  但也僅次於它了！(TM)"
                ]
            },
            moneyFinal0a: () => [
                '<32>{#p/mettaton}* 現在，由於這已經是第二輪...',
                "<32>* 我們就不投票了。",
                "<32>* 取而代之的是，\n  我想淘汰誰就淘汰誰！\n* 我的節目，我來做主...",
                ...(iRespeccYourVilliany()
                    ? ["<32>* 很遺憾，UNDYNE。\n* 但時間差不多了。\n* 再見。"]
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? ["<32>* 很遺憾，TEMMIE。\n* 但時間差不多了。\n* 再見。"]
                        : ["<32>* 很遺憾，怪物小孩。\n* 但時間差不多了。\n* 再見。"])
            ],
            moneyFinal0b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/14}* ...你認真的？']
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? SAVE.data.b.colleg
                            ? [
                                '<32>{#p/tem}* 你趕走我只因為\n  你知道我會贏。',
                                '<32>* 但也行！！',
                                '<32>* 記得來光顧TEM商店！！'
                            ]
                            : ['<32>{#p/tem}* 卜...', '<32>* tem沒油事...', '<32>* 記得來光顧TEM商店！！']
                        : SAVE.data.b.f_state_kidd_betray
                            ? ['<25>{#p/kidd}{#f/3}* 待會見，夥計們...']
                            : [
                                '<25>{#p/kidd}{#f/3}* 天啊...',
                                '<25>{#f/1}* 沒關係，謝謝你讓我上節目，\n  Metatron。',
                                '<25>{#f/1}* 我的朋友要是知道了，\n  肯定會興奮壞了的！！！'
                            ],
            moneyFinal0c: ['<32>{#p/mettaton}* 認真的。\n* 請離開舞臺。'],
            moneyFinal0d: [
                '<25>{#p/undyne}{#f/8}* 噗！\n* 你個大蠢蛋！',
                '<25>{#f/1}* 你知道，\n  那人類雖然很兇狠，\n  但至少會與大家公平競爭。',
                '<25>{#f/5}* 而你呢？',
                '<25>{#f/7}* 隨心所欲，規則說改就改！',
                "<25>{#f/9}* ...對你真沒啥好期待的。",
                "<25>{#f/11}* 在這點，你可是出了名的。"
            ],
            moneyFinal1: () => [
                iRespeccYourVilliany()
                    ? '<32>{#p/mettaton}* 謝天謝地。'
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? SAVE.data.b.colleg
                            ? "<32>{#p/mettaton}* ...天，至少她走了。"
                            : "<32>{#p/mettaton}* 她看起來... 很開心？"
                        : SAVE.data.b.f_state_kidd_betray
                            ? "<32>{#p/mettaton}* 那小孩看起來... 很開心？\n* 老實說，我不確定..."
                            : '<32>{#p/mettaton}* 開心就好。\n* 鄭重聲明，我叫「METTATON」，\n  不是「METATRON」。',
                "<32>* 哎呀... 現在只剩下兩位選手了，\n  是時候開始最後一輪了。",
                "<32>* 這一輪所展示的物品\n  將會是與眾不同的。",
                '<32>* 女士們，先生們...\n* 睜大你們的雙眼...',
                '<32>{#z3}* ...瞧瞧這個精妙絕倫的\n  等身喵喵玩偶！'
            ],
            moneyFinal2: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/kidd}{#f/14}* 哇喔...']
                    : world.scared_ghost
                        ? ['<32>{#p/napstablook}* .........']
                        : ['<32>{#p/napstablook}* 我的天............'],
            moneyFinal3: ['<32>{#p/mettaton}* 哈哈哈，心動了吧？', '<32>{#p/mettaton}{#z2}* 它被發現於...'],
            moneyFinal4: () => [
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* 喂，Mettaton！\n* 你這是在往我傷口上\n  撒鹽嗎？！",
                        '<32>{#p/mettaton}* ...',
                        "<32>* 好吧，太遺憾了！\n* 因為，你們也知道..."
                    ]
                    : [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* 打-打住！\n  你不能把那個隨便送人，\n  我... 那是我的財產！",
                        '<32>{#p/mettaton}* 喔，你知道了啊？',
                        "<32>* 我之前不知情，向你致歉。\n* 不過...",
                        '<25>{#p/alphys}{#g/alphysWTF2}* 不過？？？',
                        "<32>{#p/mettaton}* ALPHYS博士，\n  恐怕來不及了喔..."
                    ]),
                '<32>{#z3}* 選手們已經起興致了。',
                '<25>{#p/alphys}{#g/alphysWTF}{#z0}* 你玩我呢？',
                '<25>{|}{#p/alphys}{#g/alphysCutscene3}* 我花了好幾個月才- {%}'
            ],
            moneyFinal5: [
                '<32>{#p/mettaton}* 哎呀呀。\n* 訊號好像不好。',
                '<32>* 可憐的ALPHYS博士。\n* 她的喵喵玩偶要\n  拱手相讓給別人了。',
                '<32>{#z2}* 讓給在場的其中一位！',
                '<32>{#z3}* 但是要給誰呢？'
            ],
            moneyFinal6: [
                '<32>{#p/mettaton}* 哈哈哈，心動了吧？',
                '<32>{#p/mettaton}{#z2}* 它被發現一個遨遊在星際之間的\n  廢棄貨櫃裡。',
                '<32>* 在發現它的蹤跡後，\n  搜尋團隊花了幾個月來尋找它...',
                '<32>* 它的空前絕後...\n* 嗯...',
                '<32>* 不言自明。',
                '<32>{#z3}* 我親愛的觀眾朋友們，\n  究竟誰會得到它呢？'
            ],
            moneyItem3: {
                a: [
                    "<32>{#z0}* 既然這是最後一輪，\n  就不限時了。",
                    "<32>{#z0}* 讓我們再猜最後一次！"
                ],
                b: [
                    '<32>{#p/mettaton}* 終於到了這一刻...',
                    '<32>{#p/mettaton}{#z3}* 誰會贏得大獎呢？',
                    '<32>{#p/mettaton}{#z0}* 價，\n* 格，\n* 是...'
                ],
                c: ['<32>{#p/mettaton}{#z5}* ...999G！！！'],
                d: () =>
                    iRespeccYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* 怪物小孩！',
                            '<32>* 我很榮幸\n  將這份禮物贈予你。',
                            '<25>{#p/kidd}{#f/4}* 哈... 啊？',
                            '<25>{#f/7}* ...',
                            '<25>{#f/14}* 喲噢噢噢噢！！！！'
                        ]
                        : ['<32>{#p/mettaton}{#z0}* BLOOKY！', '<32>* 我很榮幸\n  將這份禮物贈予你。'],
                e: () =>
                    iFancyYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* 好樣的，$(moniker3u)。',
                            '<32>{#p/mettaton}* 我很榮幸\n  將這份禮物贈予你。'
                        ]
                        : ['<32>{#p/mettaton}{#z0}* 人類！', '<32>* 我很榮幸\n  將這份禮物贈予你。'],
                f: () =>
                    iRespeccYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* 怪物小孩！',
                            "<32>* 你和$(moniker3u)猜的答案一樣，\n  但你率先作答。",
                            '<32>* 因此，我很榮幸\n  將這份禮物贈予你。',
                            '<25>{#p/kidd}{#f/4}* 哈... 啊？',
                            '<25>{#f/7}* ...',
                            '<25>{#f/14}* 喲噢噢噢噢！！！！'
                        ]
                        : [
                            '<32>{#p/mettaton}{#z0}* BLOOKY！',
                            iFancyYourVilliany()
                                ? "<32>* 你和$(moniker3u)猜的答案一樣，\n  但你率先作答。"
                                : "<32>* 你和人類猜的答案一樣，\n  但你率先作答。",
                            '<32>* 因此，我很榮幸\n  將這份禮物贈予你。'
                        ],
                g: () =>
                    iRespeccYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* 好樣的，$(moniker3u)。',
                            "<32>* 你和怪物小孩猜的答案一樣，\n  但你率先作答。",
                            '<32>* 因此，我很榮幸\n  將這份禮物贈予你。'
                        ]
                        : [
                            iFancyYourVilliany()
                                ? '<32>{#p/mettaton}{#z0}* 好樣的，$(moniker3u)。'
                                : '<32>{#p/mettaton}{#z0}* 人類！',
                            "<32>* 你和BLOOKY猜的答案一樣，\n  但你率先作答。",
                            '<32>* 因此，我很榮幸\n  將這份禮物贈予你。'
                        ]
            },
            moneyTrash1: ['<32>* 等等，BLOOKY，你這是上哪...', '<32>* ...去...', '<32>{#z1}* ...'],
            moneyTrash2: ["<32>{#z0}* 看來BLOOKY不想\n  呆在這了。"],
            moneyItemPut1: ['<32>{#p/human}* （你獲得了一臺老式收音機。）'],
            moneyItemPut2: ['<33>{#p/human}* （你獲得了一箱煙花。）'],
            moneyItemPut3: ['<32>{#p/human}* （你獲得了喵喵玩偶。）'],
            moneyItemPut4: [
                "<32>{#p/human}* （你帶的東西太多了。）",
                '<32>{#p/mettaton}* 東西裝不下了，嗯？',
                '<32>{#p/mettaton}* 好吧，別擔心。\n* 你可以到休閒迴廊\n  領取你的獎品。'
            ],
            moneyOutro1: [
                "<32>{#p/mettaton}* 親愛的觀眾朋友們，\n  如果你也想在這樣的\n  電視直播節目中贏取獎品...",
                "<32>* 請不要猶豫，\n  直接在域外網聯繫我！",
                "<32>* 不然，就沒有下一期節目了...",
                '<32>* 敬請期待下期節目，\n  《舞動命運》！',
                '<32>{#z3}* 當然，還請各位保持完美！'
            ],
            moneyWhisper1: () => [
                '<32>{#p/napstablook}* （吶吶... 嘿...）',
                '<32>* （我，呃...）',
                ...(SAVE.data.b.f_state_blookbetray
                    ? ["<32>* （我明白...\n  你可能不想見到我，不過...）"]
                    : SAVE.data.n.state_wastelands_napstablook === 2
                        ? ["<32>* （我明白...\n  你可能不喜歡我，不過...）"]
                        : SAVE.data.n.state_wastelands_napstablook === 4
                            ? ["<32>* （我明白...\n  你和我關係還沒那麼好，不過...）"]
                            : SAVE.data.n.state_foundry_blookdate > 1
                                ? ["<32>* （我希望我的請求不算過分，\n  雖然我們是朋友，但是...）"]
                                : ["<32>* （我希望我的請求不算過分，\n  但是...）"]),
                '<32>* （我在想... 節目結束之後...）',
                '<32>* （我們得把喵喵玩偶還給alphys）',
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        "<32>* （她今天有點鬱悶，\n  而且...）",
                        "<32>* （不說了......\n  也算做了件好事，你不覺得嗎？）"
                    ]
                    : [
                        '<32>* （我跟她一起看過一次\n  《喵喵航天行》...）',
                        '<32>* （那天她... 真的很開心......）'
                    ]),
                choicer.create('* （你要怎麼回答？）', '好啊', '不要')
            ],
            moneyWhisper2a: ['<32>{#p/napstablook}* （謝謝你...）'],
            moneyWhisper2b: ['<32>{#p/napstablook}* （..................）'],
            moneyWhisper3: ["<32>{#p/mettaton}* 怎麼了嗎？"],
            moneyWhisper4: [
                '<32>{#p/napstablook}* （那我們... 就來猜吧...）',
                '<32>{#p/napstablook}* （嘿）'
            ],
            napchat0: ['<32>{#p/human}* （你把喵喵玩偶\n  遞給了Napstablook。）'],
            napchat1: () =>
                SAVE.data.n.state_foundry_undyne === 1
                    ? ["<32>{#p/napstablook}* 我會讓他知道你為她\n  做了什麼的"]
                    : ["<32>{#p/napstablook}* 我會儘快把這個還給她的"],
            napchat2a: ['<32>{#p/napstablook}* 下次再見吧............'],
            napchat2b: [
                "<32>* 我... 還有點事\n  要跟你說........",
                '<32>* 在前面等我，就在那個\n  大mettaton噴泉那裡。',
                '<32>* 噴泉見............'
            ],
            truemtt3: [
                '<32>{#p/basic}* Blooky...',
                '<32>* ...',
                '<32>* 我現在有種不好的預感。'
            ],
            moneyX1: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<32>{#p/mettaton}* 喔，我是眼花了嗎？',
                "<32>* 沒想到，這裡居然藏著...",
                '<32>* 一個陷阱呢！',
                '<32>* 而且...'
            ],
            moneyX2a: [
                "<32>* 你們又上電視啦！",
                '<32>* 這次，兩人又會上演什麼\n  「死裡逃生」的戲碼呢？',
                '<32>* 哈哈哈...'
            ],
            moneyX2b: ['<32>* 就讓【時間】告訴我們答案吧...{%200}'],
            moneyX3: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/10}* 讓我想想...{%100}',
                        '<25>* 前面有個平臺，\n  而控制器就在平臺上...{%100}',
                        '<25>{#f/16}* ...{%100}',
                        '<25>{#f/13}* 我有辦法了，\n  但這辦法有點尷尬...{%100}',
                        '<25>{#f/13}* 我跪在平臺前面...{%100}',
                        '<25>{#f/16}* 你就可以...\n  踩住我的肩膀，爬上平臺，\n  關掉計時器。{%100}',
                        '<25>{#f/15}* 希望能奏效...{%100}'
                    ],
                    ['<25>{#p/asriel2}{#f/13}* ...{%100}', '<25>{#f/4}* $(name)，\n  按計畫行事吧。{%100}']
                ][Math.min(SAVE.flag.n.ga_asrielMoneyX3++, 1)],
            moneyT1: (i: number) =>
                [
                    ['<25>{#p/asriel2}{#f/15}* 你想... 試一試嗎？{%200}'],
                    ["<25>{#p/asriel2}{#f/16}* ...沒空胡鬧了。{%200}"],
                    ['<25>{#p/asriel2}{#f/15}* 別磨蹭了。{%200}'],
                    []
                ][Math.min(i, 3)],
            moneyT2: (i: number) =>
                [
                    ['<25>{#p/asriel2}{#f/16}* 難道你想這麼傻站著，\n  浪費時間嗎？{%200}'],
                    ["<25>{#p/asriel2}{#f/13}* $(name)，求你了...\n* 別磨蹭了...{%200}"],
                    []
                ][Math.min(i, 2)],
            moneyT3: (i: number) =>
                [
                    ['<25>{#p/asriel2}{#f/13}* 還真是。{%200}'],
                    ['<25>{#p/asriel2}{#f/3}* ...\n* 他們看咱們，就跟看小丑一樣。{%200}'],
                    []
                ][Math.min(i, 2)],
            moneyT4: (i: number) =>
                [
                    [
                        "<25>{#p/asriel2}{#f/5}* 吃飯了嗎？{%200}",
                        '<25>{#p/asriel2}{#f/13}* ...\n* 就當你吃過了吧。{%200}'
                    ],
                    []
                ][Math.min(i, 1)],
            moneyT5: (i: number) =>
                [["<25>{#p/asriel2}{#f/4}* 我就很好奇，\n  你就這麼杵著，有意思嗎？{%200}"], []][
                Math.min(i, 1)
                ],
            moneyT6: (i: number) => [['<25>{#p/asriel2}{#f/3}* ...\n* $(name)？{%200}'], []][Math.min(i, 1)],
            moneyT7: (i: number) => [['<25>{#p/asriel2}{#f/13}* $(name)。{%200}'], []][Math.min(i, 1)],
            moneyT8: (i: number) =>
                [["<25>{#p/asriel2}{#f/7}* 你要是不擱著磨蹭，\n  現在我都離開前哨站了。{%200}"], []][Math.min(i, 1)],
            moneyT9: (i: number) =>
                [['<25>{#p/asriel2}{#f/6}* ...\n* 算我求你了。{%200}'], ['<25>{#p/asriel2}{#f/15}* 可算熬到頭了...']][
                Math.min(i, 1)
                ],
            moneyX4: () =>
                [['<25>{#p/asriel2}{#f/13}* 呃... 上來吧。{%200}'], ['<25>{#p/asriel2}{#f/13}* 別磨蹭...{%200}']][
                Math.min(SAVE.flag.n.ga_asrielMoneyX4++, 1)
                ],
            moneyX4a: ['<25>{#p/asriel2}{#f/1}* 搞定。'],
            moneyX4b: ['<25>{#p/asriel2}{#f/6}* ...', '<25>{#p/asriel2}{#f/7}* 浪費這麼長時間，\n  為了啥？'],
            moneyX5a: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<32>{#p/mettaton}* 這通操作把我CPU幹燒了。', 
                "<32>* 對不起，親愛的觀眾朋友們，\n  這節目，怎一個「爛」字了得？",
                '<32>* 明明是「爛透了」！',
                "<32>* 這麼差勁的節目，\n  多看一眼，都是髒了觀眾的眼睛。"
            ],
            moneyX5b: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<32>{#p/mettaton}* 呃，真是...',
                "<32>* 呃... 該說點什麼好呢...",
                '<32>* 「感謝各位的耐心與理解」？',
                '<32>* 不過，你們這一等，\n  我的事確實好辦多了。'
            ],
            moneyX5c: [
                '<32>* ...',
                '<32>* 我馬上就準備好了。',
                '<32>* 兩位，要是有遺言，\n  就現在對電視機前的觀眾說。',
                '<32>* 不然，就再也沒機會嚕。'
            ],
            moneyX6a: ['<25>{#p/asriel2}{#f/15}* ...'],
            moneyX6b: ['<25>{#f/2}* 沒有。'],
            moneyX7: ['<25>{#p/asriel2}{#f/6}* 下來吧。'],
            moneyX8: ['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/6}* 去電梯。'],
            rg2a: ["<32>{#p/basic}{#x1}* 站住！\n* 你走得有點太遠了！{#x3}"],
            rg2b: () =>
                world.genocide
                    ? ["<32>{#p/basic}{#x1}* 我們不會就這麼放你走的，\n  對吧姑娘？{#x3}"]
                    : [
                        ...(iFancyYourVilliany()
                            ? [
                                '<32>{#p/basic}{#x1}* 所以，\n  你就是那個叫「$(moniker2)」\n  的小孩，對吧？{#x3}',
                                iRespeccYourVilliany()
                                    ? '<32>{#x2}* 對，我們從電視上看到了。\n* 我們也看到Undyne\n  就那樣放棄了抓你。{#x3}'
                                    : "<33>{#x2}* 對，我們從電視上看到了。\n* 我們也知道你並沒有看上去\n  那麼兇殘。{#x3}",
                                "<32>{#x1}* 多麼可憐啊，不是嗎？{#x3}"
                            ]
                            : [
                                "<32>{#p/basic}{#x1}* 我們聽說有個人類\n  在這附近遊蕩。{#x3}",
                                "<32>{#x2}* 我們通常不會隨便起疑心，\n  但是孩子，你剛剛才上了\n  電視直播...{#x3}",
                                "<32>{#x1}* 那我們就很難忽略你了，\n  對吧？{#x3}"
                            ]),
                        '<32>* ...',
                        "<32>{#x2}* 我就是這麼想的。{#x3}"
                    ],
            rg2c1: ["<32>{#p/basic}{#x1}* 寶貝，你跟我現在的想法\n  一模一樣？{#x3}"],
            rg2c2: ['<32>{#p/basic}* ...', '<32>{#p/basic}{#x1}{#x2}* 喔，那是當然。{#x3}', '<32>{#p/basic}* ...'],
            rg2c3: ['<32>{#p/basic}* ...'],
            rg2d: () =>
                world.genocide
                    ? [
                        "<32>{#p/basic}{#x1}* 一起上吧，寶貝。\n* 我們就讓Undyne瞧瞧\n  我們的實力...{#x3}",
                        '<32>{#x1}{#x2}* ...好好教訓一下這個叛徒吧。{#x3}'
                    ]
                    : [
                        "<32>{#p/basic}{#x1}* 一起上吧，寶貝。\n* 我們就讓Undyne瞧瞧\n  我們的實力...{#x3}",
                        iFancyYourVilliany()
                            ? '<32>{#x1}{#x2}* ...好好教訓一下這個\n  橫行霸道的傢伙吧。{#x3}'
                            : '<32>{#x1}{#x2}* ...好好教訓一下這個人類吧。{#x3}'
                    ],
            rg2e: ['<32>{#p/basic}* 哇。\n* 真是...', '<32>{#p/basic}* ...有點東西啊。'],
            rg2f: [
                '<32>{#p/basic}{#x1}* 姑娘，抓個人類不該遭這種罪。{#x3}',
                "<32>{#x2}* 沒錯，還是讓男孩兒解決吧...\n  如果Undyne覺得這活需要他們的話。{#x3}"
            ],
            hapsta1: () => [
                '<32>{#p/napstablook}* 呃...',
                '<32>* 你能...\n* ...幫我個忙嗎？',
                "<33>* 那事... 挺重要的......",
                choicer.create('* （你要怎麼回答？）', '好的', '我很忙')
            ],
            hapsta1a: ['<32>{#p/napstablook}* 好.........', '<32>* 跟我來吧.........'],
            hapsta1b: ['<32>{#p/napstablook}* 喔........', "<32>* 那我不麻煩你了........."],
            hapsta2: ['<32>{#p/napstablook}* 我們到了...', "<32>* 你可能想問來這做什麼......"],
            hapsta3a: [
                "<32>{#p/napstablook}* 最近我越看mettaton\n  越覺得他是我失蹤的表親.........",
                "<32>* 自他失蹤以來，\n  我一直很擔心他"
            ],
            hapsta3b: ['<32>* 我只是希望他沒事。'],
            hapsta4: ['<32>{#p/napstablook}* 來看看這個'],
            hapsta5: ["<32>{#p/napstablook}* 我在皇家實驗室\n  找到了這份私密錄音檔案"],
            hapsta6: [
                '<32>{#p/alphys}* 你最後的身體還需要\n  一些時間完成...',
                '<32>* 現在你還確定想這樣做嗎？',
                "<32>{#p/hapstablook}* 博士，我準備好了。",
                "<32>{#p/alphys}* 行...\n  我給Mettaton聯-聯下網。",
                '<32>* 有了這塊控制晶片，\n  你就能操控我為你製作的\n  任何一臺身體...',
                "<32>* 等我做完新身體，\n  就-就把晶片插到那上面。",
                '<32>* 你覺得這樣... 可以嗎？',
                "<32>{#p/hapstablook}* 博士，這法子太神了。\n* 太神了！",
                "<32>{#p/alphys}* 嘿嘿... 你...\n* 你人真好...",
                '<32>{#p/hapstablook}* 所以我什麼時候可以開始？',
                '<32>{#p/alphys}* 喔，呃，可以現在就試試？',
                "<32>* 這是塊通用晶片，\n  你不用和它融合也能操作。",
                '<32>{#p/hapstablook}* 喔~，棒欸...',
                '<32>{#p/hapstablook}* 一臺可升級的身體\n  會讓我的星途更平坦的！',
                '<32>{#s/echostop}{#p/event}* 回放完畢。'
            ],
            hapsta7: [
                "<32>{#p/napstablook}* 就是這樣",
                "<32>{|}{#p/napstablook}* 如果我不知道其他更好的可能，\n  那我就覺得這是- {%}"
            ],
            hapsta8: ["<32>{#p/finalghost}* 對不起，我遲到了。"],
            hapsta9: ['<32>* 喔。\n* 你好啊，人類。'],
            hapsta10: ['<32>* Blooky表親。\n* 人類咋也在。'],
            hapsta11: ['<32>{#p/napstablook}* 我覺得......\n* 人類可能幫得上忙......'],
            hapsta12a: () => [
                ...[
                    ['<32>{#p/finalghost}* 嗯。\n* 不過人類最好可以站在我們這邊。'],
                    ["<32>{#p/finalghost}* 嗯。\n* 不過人類得學著少用暴力。"],
                    ["<32>{#p/finalghost}* 嗯。\n* 不過人類這次可別再逃跑了。"],
                    [
                        "<32>{#p/finalghost}* 嗯。\n* 上次見到人類，\n  感覺有點不太聰明的樣子。",
                        '<32>* 誰知道呢？'
                    ],
                    ['<32>{#p/finalghost}* 嗯。\n* 人類對我挺好的...'],
                    ['<32>{#p/finalghost}* 嗯。\n* 不過人類最好老實點。'],
                    ["<32>{#p/finalghost}* 嗯。\n* 不過人類最好不要隨便搭訕。"]
                ][SAVE.data.n.state_wastelands_dummy]
            ],
            hapsta12b: ['<32>* 我們準備打電話了嗎？'],
            hapsta13: ['<32>{#p/napstablook}* 額，等等吧...', "<32>{|}* 所以- {%}"],
            hapsta14: ['<32>{#p/basic}* 呆子們，我來了！'],
            hapsta15: ['<32>{#p/finalghost}* 你就非得這麼\n  大張旗鼓的嗎？'],
            hapsta16: [
                '<32>{#p/basic}* 人類。\n* 人類！\n* 人-類！！！',
                '<32>* 這會又和我表親作甚？'
            ],
            hapsta17: ["<32>{#p/finalghost}* 人類沒做啥。\n* 你反應也太誇張了。"],
            hapsta18: ['<32>{#p/basic}* 哎呀，開個玩笑嘛..'],
            hapsta19: ['<32>{#p/finalghost}* 自然。\n* 現在，對於手頭上的事情...'],
            hapsta20: ["<32>{#p/finalghost}* 我們都知道\n  我們為何相聚於此。\n* 我們的表親..."],
            hapsta21: ["<32>{#p/basic}* 我們的表親是個叛徒。"],
            hapsta22: [
                '<32>{#p/finalghost}* ...',
                '<32>* 我們的表親可以是任何東西，\n  但絕對不會是個「叛徒」。',
                '<32>* 實際上，我和Blooky\n  在讀了表親的日記後...\n  我才知道這是我們的錯。'
            ],
            hapsta23: ['<32>{#p/napstablook}* .........\n* .........\n  我們要給他打電話嗎？'],
            hapsta24: ["<32>{#p/finalghost}* 我沒意見。"],
            hapsta25: [
                '<32>{#p/event}* 鈴鈴，鈴鈴...',
                '<32>{#p/mettaton}* BLOOKY！\n* 多棒的驚喜啊！\n* 你需要什麼不？',
                '<32>{#p/napstablook}* 額... 我想跟你聊聊',
                '<32>{#p/mettaton}* 好啊，我們當然可以聊天，\n  你想聊啥呢？',
                '<32>{#p/napstablook}* 可以私下聊嗎.........',
                '<32>{#p/mettaton}* 喔。',
                "<32>{#p/mettaton}* 恐怕現在不行，\n  我還在準備另一場演出。",
                "<32>* 等完事我們見個面怎麼樣？"
            ],
            hapsta26: ['<32>{|}{#p/basic}* 你一直在迴避- {%}'],
            hapsta27: ['<32>{#p/finalghost}* 閉嘴！'],
            hapsta28: [
                '<32>{#p/napstablook}* 那些工作...',
                '<32>{#p/mettaton}* 棒極了，親愛的。',
                "<32>* 到時候我會見面\n  跟你說說的！"
            ],
            hapsta29: [
                '<32>{#p/basic}* 我知道了。\n* 我知道了！\n* 我知道了！',
                '<32>* 這計畫從一開始\n  就註定要失敗。'
            ],
            hapsta30: [
                "<32>{#p/finalghost}* 就只是因為\n  Mettaton現在不在這嗎，\n  但這並不代表我們的計畫會失敗。",
                "<32>* 我們必須要有耐心。"
            ],
            hapsta31: ['<32>{#p/basic}* 好吧...'],
            hapsta32: () => [
                '<32>{#p/finalghost}* 好吧，\n  聊天很愉快再見。',
                "<32>* 我們很快就會再見面的。"
            ],
            hapsta34: () => [
                '<32>{#p/napstablook}* 嘿...',
                ...(SAVE.data.b.oops
                    ? ['<32>{#p/napstablook}* 回見，人類']
                    : [
                        '<32>{#p/napstablook}* 還有$(namel)？',
                        '<32>{#p/basic}* ...？',
                        '<32>{#p/napstablook}* .........\n* 謝謝你能陪著。'
                    ])
            ],
            hapsta35: ['<32>{#p/basic}* 真希望自己能幫上忙，\n  一次也行...'],
            opera1: () =>
                SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* ...嘿，額...',
                        "<25>{#f/30}* 對不起，\n  我剛才就那樣跑掉了。",
                        "<25>{#f/32}* 那件事真的...\n  很難接受...",
                        '<25>{#f/20}* 看到你將Undyne\n  就那麼丟在那裡\n  放任不管。',
                        "<25>{#f/5}* 不過，我...\n* 我知道這並非你的本意...",
                        '<25>{#f/20}* 你只是出於害怕，\n  想儘快逃離對你\n  緊追不捨的追捕者。',
                        '<25>{#f/31}* 就算這樣解釋...\n  我還是不能接受\n  她就那麼...',
                        '<25>{#f/31}* ...',
                        '<25>{#f/20}* 好了，\n  我們該去休閒迴廊了。'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysNervousLaugh}* 啊，你來了！',
                        ...(world.bad_lizard === 1
                            ? [
                                "<25>{#g/alphysSideSad}* 我一直在... 擔心，\n  如果我不陪同你，\n  你會做出什麼。",
                                "<25>{#g/alphysOhGodNo}* 啊，沒說你\n  會做出什麼壞事！",
                                '<25>{#g/alphysWorried}* 就只是...',
                                "<25>{#g/alphysCutscene2}* 你知道嗎，\n  我覺得為你提供幫助\n  真的非常重要。",
                                '<25>{#g/alphysCutscene2}* ...',
                                "<25>{#g/alphysWelp}* 有一件事是肯定的，\n  那些守衛不應該攻擊你。"
                            ]
                            : [
                                "<25>{#g/alphysSideSad}* 我真-真的很擔心你...",
                                '<25>{#g/alphysSideSad}* 又是謎題，\n  又是Mettaton，\n  還有...',
                                '<25>{#g/alphysHaveSomeCompassion}* ...',
                                '<25>{#g/alphysHaveSomeCompassion}* 那些本來不應該\n  攻擊你的守衛。'
                            ]),
                        "<25>{#g/alphysUhButHeresTheDeal}* 也許出於某種原因？？？\n* 她們沒收到訊息？？？",
                        '<25>{#g/alphysTheFactIs}* 我是說，\n  她們是今天才新來的...',
                        ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                            ? [
                                "<25>{#g/alphysWelp}* 好，呃，總之，\n  看起來你狀態還不錯，\n  所以...",
                                '<25>{#g/alphysCutscene2}* 我們應該可以走了。'
                            ]
                            : [
                                "<25>{#g/alphysWelp}* 好，呃，總之，\n  看起來你狀態還不錯。",
                                "<25>{#g/alphysFR}* 除了那個不屬於你的\n  喵喵玩偶。"
                            ])
                    ],
            opera2: ['<25>{#p/alphys}{#g/alphysInquisitive}* 跟上吧？'],
            opera3: ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}'],
            opera4: () =>
                world.genocide
                    ? ["<25>{#p/asriel2}{#f/1}* 是時候動手了。"]
                    : world.bad_lizard === 1
                        ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 我們到了。']
                        : [
                            "<25>{#p/alphys}{#g/alphysCutscene1}* 好，咱到了！",
                            '<25>{#g/alphysSmileSweat}* 過安檢的時候，\n  最-最好跟著我。'
                        ],
            opera5: ['<25>{#p/alphys}{#g/alphysSmileSweat}* 你-你們好呀。', "<32>{#p/basic}{#x1}* 好啊。{#x3}"],
            opera5b: ['<25>{#p/alphys}{#g/alphysSmileSweat}* 喔-喔，\n  我覺得這裡應該\n  沒有守衛。'],
            opera6: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 呃，是-是啊！\n* 你好！'],
            opera7: () =>
                world.bad_lizard === 1
                    ? [
                        "<25>{#p/alphys}{#g/alphysWelp}* 幸好你們之前\n  沒有攻擊人類....",
                        "<25>{#g/alphysNeutralSweat}* 要是你們攻擊了人類，\n  那你們可能..."
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* 好呃，謝謝你們...\n  早些時候沒有攻擊人類。',
                        '<25>{#g/alphysGarbo}* 感覺別的守衛都沒有\n  真正理解我的意思。'
                    ],
            opera8: ['<32>{#p/basic}{#x1}* ...人類？{#x3}', '<32>{#x1}* 哪有人類？{#x3}'],
            opera9: [
                "<25>{|}{#p/alphys}{#g/alphysTheFactIs}* 呃呃呃我不知道我就是\n  想著幫- {%}",
                "<32>{#p/basic}{#x1}* Alphys，你可是，就，\n  前哨站的二把手啊。{#x3}",
                "<32>{#x2}* 對啊，你都不用問，\n  我們就會讓你通過的，\n  哈哈。{#x3}",
                "<32>{#p/basic}{#x1}{#x2}* 我們還沒完成\n  衛隊的訓練呢！{#x3}"
            ],
            opera10: [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* 喔。\n* 我知道了。',
                "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 那我們就走了！"
            ],
            opera11: ['<32>{#p/basic}{#x1}* （老兄... 她真的沒問題嗎？）{#x3}', '<32>{#x2}* （你問我，我問誰啊...）{#x3}'],
            opera12: ['<32>{#p/basic}* 與此同時...'],
            opera13: [
                "<25>{#p/alphys}{#g/alphysSideSad}* 這裡太暗了...",
                '<25>* 我們可能得回頭。\n  找一條別的路過去。',
                "<25>{|}* 除非是- {%}"
            ],
            opera14a: ['<32>{#p/alphys}{#g/alphysGarbo}* Mettaton。'],
            opera14b: ['<32>{#p/mettaton}* 天啊...'],
            opera14c: ['<32>* 快看，是誰來了！'],
            opera15: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 難道是...', '<32>* ...我的夢中情敵？']
                    : ['<32>{#p/mettaton}* 難道是...', '<32>* ...我的真命天子？'],
            opera16: [
                '<25>{*}{#p/alphys}{#g/alphysGarbo}* 你這破鐵皮盒子\n  到底想幹啥...{^30}{%}',
                '<32>{*}{#p/mettaton}{#x1}* 咋了博士？{^30}{%}',
                "<32>{*}{#x2}* 我要演節目啊。{^30}{%}",
                '<25>{*}{#p/alphys}{#g/alphysWTF}* ...{^30}{%}'
            ],
            opera16b: [
                '<32>{*}* 蒼天啊，大地啊...{^30}{%}',
                "<32>{*}{#x1}* 真是太遺憾了！\n* 這麼棒的演出，\n  ALPHYS居然無福消受啊！{^30}{%}",
                "<32>{*}{#x2}* 她要是在的話，\n  肯定非常喜歡。{^30}{%}"
            ],
            opera17: () =>
                world.genocide ? '朋|友|啊...' : iFancyYourVilliany() ? '我|心|悲...' : '愛|人|啊...',
            opera18: () =>
                world.genocide
                    ? "光|陰|將|盡..."
                    : iFancyYourVilliany()
                        ? '看|你|憔|悴...'
                        : '請|你|速|離...',
            opera19: () =>
                world.genocide
                    ? "終|有|悔..."
                    : iFancyYourVilliany()
                        ? '白|白|將... '
                        : '怪|物|王...',
            opera20: () =>
                world.genocide
                    ? "過|往|深|罪..."
                    : iFancyYourVilliany()
                        ? '光|陰|浪|費...'
                        : '要|把|你|擋...',
            opera20a: () =>
                iFancyYourVilliany()
                    ? ['<25>{*}{#p/alphys}{#g/alphysInquisitive}* 哈？{^40}{%}']
                    : ['<25>{*}{#p/alphys}{#g/alphysWelp}* 你別說，還挺好聽...{^40}{%}'],
            opera21: () =>
                world.genocide ? '但|在|此...' : iFancyYourVilliany() ? "我|承|認..." : '人|類|都...',
            opera22: () =>
                world.genocide
                    ? '我|將|你|滅...'
                    : iFancyYourVilliany()
                        ? '你|有|天|分...'
                        : '去|往|遠|方...',
            opera23: () =>
                world.genocide ? "且|回|首..." : iFancyYourVilliany() ? "但|你|我..." : '即|使|將...',
            opera24: () =>
                world.genocide
                    ? "過|往|一|切..."
                    : iFancyYourVilliany()
                        ? '沒|有|緣|分...'
                        : '我|心|給|傷...',
            opera25: () =>
                world.genocide
                    ? '生|為|王...'
                    : iFancyYourVilliany()
                        ? '千|裡|馬...'
                        : "你|會|被...",
            opera25a: () =>
                iFancyYourVilliany()
                    ? ['<25>{*}{#p/alphys}{#g/alphysGarboCenter}* 服了。{^40}{%}']
                    : ['<25>{*}{#p/alphys}{#g/alphysCutscene1}* 是櫻花花瓣！{^40}{%}'],
            opera26: () =>
                world.genocide
                    ? '眾|人|期|望...'
                    : iFancyYourVilliany()
                        ? '難|覓|伯|樂...'
                        : '太|空|流|放...',
            opera27: () =>
                world.genocide
                    ? "你|能|將..."
                    : iFancyYourVilliany()
                        ? '可|憐|啊...'
                        : "那|太|糟...|\n（確實|啊）",
            opera28: () =>
                world.genocide
                    ? '王|國|解|放...'
                    : iFancyYourVilliany()
                        ? "你|終|究\n|會|隕|落。"
                        : "你|定|會\n|死|翹|翹。",
            opera28a: () =>
                iFancyYourVilliany()
                    ? ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}']
                    : ["<25>{*}{#p/alphys}{#g/alphysGarbo}* 喔，原來如此。{^40}{%}"],
            opera29: () => (world.genocide ? '奈|何|啊...' : '悲|戚|戚...'),
            opera30: () => (world.genocide ? '誤|入|歧|途...' : "你|要|死|掉..."),
            opera31: () => (world.genocide ? '只|能|讓... ' : '哭|哭|哭...'),
            opera31a: ['<25>{*}{#p/alphys}{#g/alphysCutscene3}* 懂了懂了...{^40}{%}'],
            opera32: () =>
                world.genocide
                    ? "汝|等\n|歸|於|塵|土。"
                    : iFancyYourVilliany()
                        ? "你|早|就\n|該|知|道"
                        : "你|可|真|是\n|難|熬。",
            opera33: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* 太慘了。', '<32>{#p/mettaton}* 你永遠只能扮演反派，\n  真是太慘了。']
                    : ['<32>{#p/mettaton}* 太遺憾了。', "<32>{#p/mettaton}* 你馬上就要被流放太空，\n  真是太遺憾了。"],
            opera34: () =>
                !world.badder_lizard
                    ? [
                        '<25>{#p/alphys}{#g/alphysGarboCenter}* 鬧夠了沒有？',
                        '<32>{#p/mettaton}{#x1}* 等等嘛，急啥...',
                        '<32>{|}{#x2}* 我還得- {%}'
                    ]
                    : ['<32>{#p/mettaton}{#x1}* 人類，準備好...', "<32>{|}{#x2}* 我馬上就送你上- {%}"],
            opera35: () => [
                ...(SAVE.data.b.killed_glyde
                    ? [
                        !world.badder_lizard
                            ? "<32>{#p/mettaton}{#x0}* ...難怪ALPHYS剛剛跑掉了。"
                            : "<32>{#p/mettaton}{#x0}* ...難怪ALPHYS不想跟你\n  待在一塊。",
                        '<32>{#x1}* 你還要臉嗎？',
                        "<32>{#x0}* 我得馬上下播，\n  不能髒了觀眾的眼睛！",
                        !world.badder_lizard
                            ? "<32>{#x0}* 真倒霉...\n* 你倒挺鎮定！"
                            : "<32>{#x0}* 真丟臉...\n* 你倒挺鎮定！"
                    ]
                    : [
                        ...(!world.badder_lizard
                            ? ['<25>{#p/alphys}{#g/alphysWelp}* 那...\n  現-現在幹啥？', '<32>{#p/mettaton}{#x0}* 現在？']
                            : []),
                        '<32>{#p/mettaton}{#x0}* 呃...\n  相信我，親...',
                        '<32>{#x2}* 我也想讓節目圓滿收官，\n  但...'
                    ]),
                ...(world.bad_robot
                    ? [
                        '<32>{#x0}* 但你別慌。',
'<32>{#x1}* 在壓軸好戲上映前，\n  我還得準備一會。',
                        '<32>{#x3}* 很快，你就知道...',
                        "<32>{*}* 遇到我，\n  你就倒了八輩子血霉了，親。{^30}{#x4}{%}"
                    ]
                    : [
                        "<32>{#x1}* 很快，你將見證一場\n  超——震撼的演出！",
                        '<32>{#x3}* 所以...\n* 請你整裝待發，保持形象，\n  準備迎接最終的...',
                        '<32>{*}* 壓軸好戲！{^30}{#x4}{%}'
                    ])
            ],
            
            hapsta36: () => [
                "<32>{#p/mettaton}{#e/mettaton/0}* 對喔...\n* 差點忘了這茬了。",
                ...(SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
                    ? [
                        "<32>{#p/mettaton}{#e/mettaton/5}* ...咱要不去別的地方聊？\n* 這兒不太安全。"
                    ]
                    : [])
            ],
            hapsta37: () =>
                SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
                    ? ['<32>{#p/napstablook}* 呃，好吧......\n* 你真想聊的話，\n  私下聊也不是不行......']
                    : [
                        '<32>{#p/napstablook}* 嘿，呃......',
                        '<32>{#p/napstablook}* 我看到了以前的實驗室記錄...'
                    ],
            hapsta38: ['<32>{#p/mettaton}{#e/mettaton/34}* 所以...？'],
            hapsta39: [
                '<32>{#p/napstablook}* 嗯，有一段聲音聽起來像是...',
                '<32>{#p/napstablook}* 像是......'
            ],
            hapsta40: ["<33>{#p/mettaton}{#e/mettaton/11}* 親愛的，\n  可以快點嗎，\n  我們可沒那麼多時間。"],
            hapsta41: [
                '<32>{#p/napstablook}* 像是你。',
                '<32>{#p/napstablook}{#e/mettaton/3}* .........\n* 真正的你。'
            ],
            hapsta42: [
                '<32>{#p/mettaton}{#e/mettaton/2}* 「真正的我」是吧？',
                "<32>{#e/mettaton/0}* 等下，先別急著下結論。"
            ],
            hapsta43: ["<32>{#p/finalghost}* 那段話是事實。"],
            hapsta44: ['<32>{#p/mettaton}{#e/mettaton/6}* ...現在幽靈們\n  聯手來對付我了啊。\n* 真可愛。'],
            hapsta45: ['<25>{#p/alphys}{#g/alphysTheFactIs}* 和-和我沒關係，\n  我-我保證...'],
            hapsta46: [
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}{#e/mettaton/3}* 那-那我就不打擾了..."
            ],
            hapsta47: [
                "<32>{#p/basic}* 請問，你這是打算溜哪去啊？",
                "<32>{#p/basic}* 這一堆麻煩事\n  還不是你起的頭！",
                "<32>{#p/basic}* 還不是你錄了音，\n  害得我現在非得來這！"
            ],
            hapsta48: ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 哎呀。'],
            hapsta49a: [
                "<32>{#p/mettaton}{#e/mettaton/9}* 對，就是這樣。",
                "<32>{#e/mettaton/7}* 你們都出現在這裡... \n  就是為了來帶我回家的對吧。"
            ],
            hapsta49b: ['<32>{#e/mettaton/8}* 「追逐夢想」就到此為止了，\n  是吧BLOOKY？'],
            hapsta50: ['<32>{|}{#p/napstablook}* 表親，我- {%}'],
            hapsta51a: ['<32>{#p/mettaton}{#e/mettaton/18}* 喔，別叫我「表親」。'],
            hapsta51b: [
                "<32>{#p/mettaton}{#e/mettaton/20}* 如果不是因為你，\n  我也許還會繼續享受\n  這種平靜的生活...",
                '<32>{#p/mettaton}{#e/mettaton/17}* ...但並沒有。\n* 你就是想讓我重新【加入】到\n  家族企業。',
                '<32>{#p/mettaton}{#e/mettaton/19}* 容我補充一下，\n  這家企業從經營第一天開始\n  就一直在虧損。'
            ],
            hapsta52: ['<32>{#p/napstablook}{#e/mettaton/3}* .........\n* 我知道了。'],
            hapsta53: [
                '<32>{#p/mettaton}{#e/mettaton/17}* 喔，你知道什麼！\n* 你真的理解\n  這對我的感受嗎？'
            ],
            hapsta54: ["<32>{#p/finalghost}* 考慮到我們都讀過你的日記，\n  我覺得應該會的..."],
            hapsta55a: [
                "<32>{#p/mettaton}{#e/mettaton/19}* 我不在乎你們是否讀過我的日記，\n  我只想讓你們從我這裡聽到...",
                '<32>{#p/mettaton}{#e/mettaton/3}* ...\n* 聽著，「表親」。\n* 這一切都與這個工作無關。',
                '<32>{#p/mettaton}{#e/mettaton/14}* 養蝸牛的這份工作也許不是\n  最迷人的消遣，\n  但我喜歡它本來的樣子。',
                "<32>{#p/mettaton}{#e/mettaton/13}* 但是... \n  我一離開農場，\n  這就會成為一個問題...",
                "<32>{#p/mettaton}* ...你們這些人都不願意\n  拿出即使是一秒鐘的時間\n  用來關心我嗎？"
            ],
            hapsta55b: [
                '<32>{#p/mettaton}{#e/mettaton/16}* 關懷的電話...\n  突如其來的拜訪...\n  這些都不存在...',
'<32>{#p/mettaton}{#e/mettaton/16}* 唯一就是偶爾問一句\n  「嘿，你啥時候回來工作？」',
                "<32>{#p/mettaton}{#e/mettaton/15}* 這對我來說很明顯，\n  在某些時刻，\n  我只是個順手的工具罷了...",
                '<32>{#p/mettaton}{#e/mettaton/11}* 只是這個偉大的\n  幽靈家族機器上的一個齒輪。'
            ],
            hapsta56: ['<32>{#p/napstablook}* ...............'],
            hapsta57a: ['<32>{#p/mettaton}{#e/mettaton/2}* 無話可說了是吧？\n* 對，我就知道會這樣。'],
            hapsta57b: [
                "<32>{#p/mettaton}{#e/mettaton/5}* 老實說，\n  我壓根不在乎\n  你們會說啥。",
                "<32>{#p/mettaton}{#e/mettaton/10}* 我已經得到了\n  生活中我想要的一切，\n  再看看你們...",
                '<32>{#p/mettaton}{#e/mettaton/12}* 依附訓練人偶，\n  乞求殘羹剩飯。'
            ],
            hapsta58: ["<32>{#p/finalghost}* 你說你壓根不關心我們，\n  但你還是會邀請我們\n  參與你的節目。"],
            hapsta59: [
                '<32>* 在最近的節目中，\n  你甚至給了Blooky\n  特殊的待遇...',
                "<32>* 踢出其他選手，\n  令其在最後一輪\n  與人類競爭。"
            ],
            hapsta60: ['<32>{#p/mettaton}{#e/mettaton/5}* ...只是憐憫罷了。'],
            hapsta61: ['<32>{#p/basic}* 又或者... 其實在你內心深處\n  也有想要回來的想法！'],
            hapsta62: ['<32>{#p/mettaton}{#e/mettaton/11}* 哈哈哈...\n* 開什麼銀河系玩笑。'],
            hapsta63: ["<32>{#p/napstablook}* 我很抱歉，表親"],
            hapsta64: ['<32>{#p/mettaton}{#e/mettaton/21}* ...喔？'],
            hapsta65a: [
                "<32>{#p/napstablook}* 在你走後，\n  我們就跟不上客戶的需求了...",
                "<32>{#p/napstablook}{#e/mettaton/15}* 為此，\n  我們必須縮小農場規模\n* 現在農場... 再不如前..."
            ],
            hapsta65b: ['<32>{#p/napstablook}* 在你離開前，\n  我們從來都沒意識到\n  你對我們的重要性...'],
            hapsta65c: ["<32>{#p/napstablook}{#e/mettaton/4}* 所以... 為曾發生過的一切\n* 我真的感到抱歉........."],
            hapsta66a: [
                '<32>{#p/mettaton}* 我知道了。',
                '<32>{#p/mettaton}{#e/mettaton/6}* ...我知道了。',
                "<32>{#p/mettaton}{#e/mettaton/5}* 你就是那種被提溜著耳朵出來罵\n  才會庫庫下跪磕頭\n  道歉的人是吧？"
            ],
            hapsta66b: ['<32>{#p/mettaton}{#e/mettaton/0}* 呵，我早該知道的。'],
            hapsta67: ["<32>{|}{#p/napstablook}* 不是- {%}"],
            hapsta68a: [
                '<32>{#p/mettaton}{#e/mettaton/3}* 不，我明白了。\n  你想讓我原諒你然後你就可以拍拍\n  屁股走人當一切都沒發生過對吧？',
                "<32>{#p/mettaton}{#e/mettaton/5}* 好吧，恐怕事情發展\n  不會如你所願，BLOOKY。"
            ],
            hapsta68b: ["<32>{#p/mettaton}{#e/mettaton/6}* ...總之，\n  我要去準備一場\n  壓軸演出..."],
            hapsta68c: ["<32>{#p/mettaton}{#e/mettaton/11}* 所以，如果你不介意，\n  我現在就會走人。"],
            hapsta69: ['<32>{#p/basic}* 給老子回來。\n* 給老子回來！\n* 給-老-子-回-來！！！'],
            hapsta70: ["<33>{#p/finalghost}* 我覺得他不會回來的。"],
            hapsta71: [
                '<32>{#p/napstablook}* 也許...\n  他只是需要一點\n  私人空間而已......',
                '<32>{#p/napstablook}* 我們應該給他一個機會.........'
            ],
            hapsta72: ["<32>{#p/basic}* 純純浪費時間。\n* 我回Undyne家去了。"],
            hapsta73: ['<32>{#p/finalghost}* Blooky，幹得不錯。', '<32>{#p/finalghost}* 幹得不錯。'],
            hapsta74: ['<32>{#p/napstablook}* 不............'],
            hapsta75: () =>
                SAVE.data.b.oops
                    ? [
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 嘿...\n* 別聽他們的。",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 我認-認識Mettaton\n  已經有一段時間了。",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 除非他需要時間思考，\n  否則不會那樣離開的。",
                        '<32>{#p/napstablook}* 是啊...',
                        '<32>{#p/napstablook}* 應該是......'
                    ]
                    : [
                        "<32>{#p/basic}* 你也知道他來過這套吧？",
                        "<32>{#p/basic}* 他會回來的。",
                        '<32>{#p/napstablook}* $(namel)......\n* 嗯...',
                        '<25>{#p/alphys}{#g/alphysInquisitive}* $(name)...？',
                        "<32>{#p/napstablook}* 呃，說來話長",
                        '<25>{#p/alphys}{#g/alphysWelp}* ...可以等會和我聊聊？',
                        '<32>{#p/napstablook}* ...\n* $(namel)，謝謝你\n* 謝謝你支援我......',
                        "<32>* 雖說只是在一旁陪著，\n  但你真的為我們家做了很多",
                        "<32>* 即使... 這不是你真正\n  所需要的家庭......",
                        '<32>{#p/basic}* Blooky，我...',
                        '<32>{#p/napstablook}* $(namel)，如果...\n* 不，當你再見到他時...',
                        "<32>* 永遠不要讓他忘記你\n  在生活中有多在乎他...\n  好嗎？"
                    ],
            hapsta76: [
                "<32>{#p/napstablook}* 對了，喵喵玩偶還你",
                "<32>* 我希望還沒有太遲......",
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* 不，沒-沒問題的。\n* 謝謝你。"
            ],
            hapsta77: ['<32>{#p/napstablook}* 嗯，回見......'],
            opera36a: () => [
                '<25>{#p/alphys}{#g/alphysWelp}* 真是個讓人\n  始料不及的轉折。',
                ...(SAVE.data.b.a_state_hapstablook && !SAVE.data.b.oops
                    ? [
                        '<25>{#p/alphys}{#g/alphysInquisitive}* 更不用提\n  「$(name)」的事了...',
                        "<25>* 據我所知，\n  那人死了將近一百年了...",
                        "<25>{#g/alphysWelp}* 喔算了。\n* 他們以後\n  應該會告訴我的。",
                        "<25>{#g/alphysWelp}{#x5}* 說到這裡，\n  你應該想要出發了..."
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* 不過看起來，\n  我們是平安無事了...",
                        "<25>{#g/alphysWelp}{#x5}* 這意味著...\n  你應該想要出發了..."
                    ]),
                '<25>{#g/alphysTheFactIs}{#x6}* 我大概也得回到\n  實驗室去了...',
                '<25>{#g/alphysNervousLaugh}{#x5}* 所以...\n  我們，回頭見？',
                ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                    ? [
                        "<25>{#g/alphysUhButHeresTheDeal}* 呃，但-但別擔心！\n* 我會給你打電話的！\n  等你到...",
                        '<25>{#g/alphysNervousLaugh}* 等你...',
                        "<25>{#g/alphysHellYeah}* 我-我會跟你保持\n  聯絡的！"
                    ]
                    : [
                        ...(!SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                            !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                            !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                            ? ((SAVE.data.b.mewget = true),
                                [
                                    '<25>{#g/alphysNervousLaugh}* ...',
                                    '<25>{#g/alphysFR}* ...其實，在走之前，\n  我想跟你說一聲。',
                                    '<25>{#f/33}* 我找到了\n  被你拋棄的喵喵玩偶。',
                                    "<25>{#g/alphysCutscene3}* 現在物歸原主了。\n* 我永遠不會再次拋棄它。",
                                    '<25>{#g/alphysHellYeah}* 好-好耶！'
                                ])
                            : [
                                '<25>{#g/alphysNeutralSweat}{#x5}* 但是，呃，\n  在走之前...',
                                '<25>{#f/10}* 你能不能... 把我的\n  喵喵玩偶還給我呢？',
                                '<25>{#f/3}* 求你了？',
                                choicer.create('* （把喵喵玩偶還給Alphys？）', '還給她', '才不要')
                            ])
                    ])
            ],
            opera36b1: [
                '<32>{#p/human}* （你把喵喵玩偶遞給了Alphys。）',
                '<25>{#p/alphys}{#g/alphysCutscene2}* 謝謝你。'
            ],
            opera36b2: [
                '<32>{#p/human}* （你決定不還。）',
                '<25>{#p/alphys}{#g/alphysWTF}* ...',
                '<25>{#g/alphysCutscene2}* 得得得，\n  給你就是了。',
                "<25>{#g/alphysCutscene2}* 現在歸你了好吧？",
                "<25>{#f/33}* 啥？\n* 我才不關心呢。"
            ],
            opera37: (gib: boolean) =>
                SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew
                    ? ['<25>{#p/alphys}{#g/alphysSmileSweat}* 路-路上小心！！']
                    : gib
                        ? ["<25>{#p/alphys}{#f/10}* 我-我會和你保持聯繫的。"]
                        : ['<25>{#p/alphys}{#f/3}* 一點也不！！！'],
            opera38: [
                '<32>{#p/basic}* ...現在我明白為什麼Blooky\n  總是有那種感覺了。',
                "<32>* 那種自責的感覺，\n  覺得自己明明為了關心某人\n  可以做得更好的感覺...",
                "<32>* 嗯哼。\n* 我應該能幫上更多的忙的。",
                '<32>* 你還記得在Toriel那裡\n  發生的事嗎？',
                '<32>* 你把我叫了出來，\n  然後我就開始跟她對話？',
                '<32>* 我是了解那些怪物的。\n* 這應該可以幫助咱們\n  更快地通過這片區域。',
                '<32>* 所以，\n  我要是想起來什麼了的話...',
                '<32>* 你就像之前那樣把我叫出來，\n  好嗎？'
            ],
            operaX1: () =>
                [
                    ['<25>{#p/asriel2}{#f/8}* 有人嗎？'],
                    ['<25>{#p/asriel2}{#f/8}* 出來吧。'],
                    ['<25>{#p/asriel2}{#f/8}* ...']
                ][Math.min(SAVE.flag.n.ga_asriel53++, 1)],
            operaX2: () => [
                ...[
                    ['<32>{#p/mettaton}* 兩位親，你們好。'],
                    ['<32>{#p/mettaton}* 那我就出來了喔，親！'],
                    ['<32>{#p/mettaton}* 笑一個嘛！']
                ][Math.min(SAVE.flag.n.ga_asriel53 - 1, 2)],
                "<32>* 來，快到聚光燈下。"
            ],
            operaX3: [
                "<32>{#p/mettaton}* 好多了...",
                '<32>{#p/mettaton}* 就讓我送你們一支小曲吧。'
            ],
            operaX4: () =>
                [
                    [
                        "<25>{*}{#p/asriel2}{#f/10}* 跟我說說，\n  你要唱啥呢？{^30}{%}",
                        '<32>{*}{#p/mettaton}{#x1}* ASRIEL啊...{^30}{%}',
                        '<32>{*}{#x2}* 我要是說了，\n  不就「劇透」了嗎？{^30}{%}',
                        '<25>{*}{#p/asriel2}{#f/6}* 猜到了。{^30}{%}'
                    ],
                    [
                        "<25>{*}{#p/asriel2}{#f/7}* 你要唱我，早知道了。{^30}{%}",
                        '<32>{*}{#p/mettaton}{#x1}* 喔，你知道了啊。{^30}{%}',
                        "<32>{*}{#x2}* 你知道，關我什麼事？\n* 以為這樣，我就不唱了？{^30}{%}",
                        '<25>{*}{#p/asriel2}{#f/8}* ...{^30}{%}'
                    ]
                ][Math.min(SAVE.flag.n.ga_asriel54++, 1)],
            operaX5: () => [
                "<32>{#p/mettaton}* 好，我唱完了。",
                "<32>{#x1}* 喔，忘了告訴你，\n  我本人不在這。\n* 你看到的，就是個空殼。",
                '<32>* 我的主控晶片\n  早就安裝到新身體上了。',
                ...(SAVE.flag.n.ga_asriel55++ < 1
                    ? [
                        '<25>{#p/asriel2}{#f/10}* ...新身體？',
                        '<32>{#p/mettaton}* 怎麼，想看？',
                        "<32>* 別著急，一會你們就能看到了。"
                    ]
                    : []),
                '<32>{#p/mettaton}* 拜拜嚕...'
            ],
            operaX7: ["<25>{#p/asriel2}{#f/8}* 看來事情不簡單。"],
            operaY1: ['<25>{*}{#p/asriel2}{#f/13}* 你說什- {^5}{%}'],
            operaY2: ['<25>{*}{#p/asriel2}{#f/15}* $(name)。\n* 你在幹啥。{^40}{%}'],
            operaY3: ["<25>{*}{#p/asriel2}{#f/15}* 快停下...{^40}{%}"],
            operaY4: ['<25>{*}{#p/asriel2}{#f/16}* $(name)，\n  用不著這樣。{^40}{%}'],
            end1: (rgk: boolean) => [
                '<32>{#p/mettaton}* 終於...',
                ...(world.mttvar
                    ? [
                        '<32>* 終於，在命運的...',
                        '<32>{#e/mettaton/4}* ...',
                        "<32>{#e/mettaton/25}* 我的傳感器探測到\n  你正試圖往我身後看。",
                        iFancyYourVilliany()
                            ? '<32>{#e/mettaton/30}* 你肯定特別想動我的開關，\n  是不是啊，「$(moniker2u)」？'
                            : '<32>{#e/mettaton/30}* 你肯定特別想動我的開關，\n  是不是啊，親？',
                        ...(!world.badder_lizard
                            ? [
                                '<32>{#e/mettaton/28}* 你早就知道那裡有開關。\n* 畢竟，我那點小秘密\n  ALPHYS肯定沒藏住。',
                                '<32>{#e/mettaton/3}* 真是一猜就中...'
                            ]
                            : [
                                '<32>{#e/mettaton/28}* 你早就知道那裡有開關。\n* 畢竟，看一眼皇家實驗室的記錄\n  就知道了。',
                                '<32>{#e/mettaton/3}* 真是一猜就中...'
                            ]),
                        "<32>{#e/mettaton/12}* 那我就不浪費時間\n  長篇大論了。",
                        ...(SAVE.data.b.a_state_hapstablook
                            ? ["<32>{#e/mettaton/3}* 只說一句話：\n  現在，我有點不在狀態。"]
                            : iFancyYourVilliany()
                                ? ["<32>{#e/mettaton/31}* 只說一句話：\n  這次，我不會再手下留情！"]
                                : !world.badder_lizard
                                    ? ["<32>{#e/mettaton/31}* 只說一句話：\n  這次演出精彩與否，就看你的了！"]
                                    : ["<32>{#e/mettaton/19}* 只說一句話：\n  我不能對你的轉變視而不見。"])
                    ]
                    : [
                        '<32>* 終於，在命運的指引下，\n  我們再度相會於此。',
                        ...(iFancyYourVilliany()
                            ? [
                                '<32>{#e/mettaton/3}* 幹的不錯。',
                                "<32>{#e/mettaton/35}* 這樣的行為能保持【這麼】\n  長時間真是不可思議啊...",
                                '<32>{#e/mettaton/6}* 但現在，\n  是時候該展現出你的\n  廬山真面目了。',
                                '<32>{#e/mettaton/5}* 可別真以為\n  我會對你手下留情，\n  親愛的「$(moniker2u)」。',
                                "<32>{#e/mettaton/0}* 好吧，你當然不這麼認為。\n* 但你並沒有為接下來的發展\n  做好準備。",
                                '<32>{#e/mettaton/10}* 如果你認為你已經準備好了，\n  那就請便吧。',
                                "<32>{#e/mettaton/31}* 當你最終【失敗】時，\n  可別將過錯歸咎於我！"
                            ]
                            : [
                                '<32>{#e/mettaton/4}* 我得承認...',
                                '<32>{#e/mettaton/34}* 如果沒有你，\n  我也走不到現在這一步。',
                                "<32>{#e/mettaton/5}* 一路下來，我們讓觀眾\n  看到了自己最精彩的一面。",
                                "<32>{#e/mettaton/6}* 而即將到來的，\n  正是你我夢寐以求的重頭好戲。",
                                '<32>{#e/mettaton/23}* 不過，我得說...',
                                ...(SAVE.data.b.a_state_hapstablook
                                    ? [
                                        "<32>{#e/mettaton/5}* 事情的發展有點超出\n  我的預料。",
                                        '<32>{#e/mettaton/6}* 那些家長裡短的破事\n  偏偏這時候冒出來...',
                                        "<32>* ...給我攪得心神不寧。",
                                        "<32>{#e/mettaton/11}* 不過，讓我們先把\n  眼前這場表演圓滿收尾，\n  再去處理那些事。",
                                        '<32>{#e/mettaton/5}* 觀眾們肯定都迫不及待了。',
                                        '<32>{#e/mettaton/6}* 所以，別讓觀眾失望，好嗎？'
                                    ]
                                    : !world.badder_lizard
                                        ? [
                                            "<32>{#e/mettaton/25}* 這次演出，我會放放水，\n  讓你贏。",
                                            "<32>{#e/mettaton/0}* 別誤會。\n* 要是我能幹掉人類，拿到靈魂，\n  肯定會成為超級大明星。",
                                            '<32>{#e/mettaton/3}* 但你我一起表演，一起歡笑，\n  一起度過那麼多快樂的時光。',
                                            "<32>{#e/mettaton/6}* 所以，讓我殺了你，\n  扯出你的靈魂，\n  我... 於心不忍。",
                                            "<32>{#e/mettaton/4}* 而且，不少怪物看節目\n  不在乎邏輯，只圖刺激...",
                                            "<33>{#e/mettaton/0}* 為了應付這些腦殘觀眾，\n  你也付出了很多。",
                                            '<32>{#e/mettaton/5}* 喔對。\n* 你要是不小心掛了，\n  也別擔心...',
                                            "<32>* 我們會妥善安置你的靈魂，\n  不會讓你白死的。",
                                            "<32>{#e/mettaton/10}* 現在，你是主角。\n* 就讓我瞧瞧這位「真正的」\n  超級明星到底有多少能耐吧！"
                                        ]
                                        : [
                                            '<32>{#e/mettaton/5}* 一開始，\n  我想好好教訓你一頓。',
                                            ...(SAVE.data.n.bad_lizard < 2
                                                ? [
                                                    ...(SAVE.data.n.state_foundry_undyne === 1
                                                        ? [
                                                            '<32>{#e/mettaton/10}* 畢竟...\n  她是我非常要好的朋友，\n  你卻狠狠傷了她的心。',
                                                            '<32>{#e/mettaton/3}* 但我轉念一想，\n  你也有好的一面。',
                                                            '<32>{#e/mettaton/6}* 其實，大多數時候\n  你挺友善的，',
                                                            "<32>{#e/mettaton/2}* 當然，我不可能像監控一樣\n  盯著你的一舉一動...",
                                                            "<32>{#e/mettaton/12}* 但既然你能為了自保見死不救，\n  也保不準會為了自保\n  衝動幹傻事。"
                                                        ]
                                                        : [
                                                            "<32>{#e/mettaton/10}* 畢竟...\n  你還是幹了不少壞事。",
                                                            '<32>{#e/mettaton/3}* 但我轉念一想，\n  你也有好的一面。',
                                                            '<32>{#e/mettaton/6}* 其實，正常相處時\n  你挺友善的。'
                                                        ]),
                                                    "<32>{#e/mettaton/5}* 你到底是好是壞，誰也不知道。\n* 也許你根本不咋地，\n  是我把你捧太高了。",
                                                    '<32>{#e/mettaton/0}* 也有可能，\n  我不想惹不必要的麻煩，\n  才逼自己這麼想。',
                                                    "<32>{#e/mettaton/20}* 不過，別以為我說幾句好話，\n  就是把你當朋友。"
                                                ]
                                                : [
                                                    ...(SAVE.data.n.state_starton_papyrus === 1
                                                        ? SAVE.data.n.state_foundry_undyne === 2
                                                            ? rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 畢竟...\n  除了ALPHYS，我能想到的人\n  你幾乎都給弄死了。'
                                                                ]
                                                                : [
                                                                    '<32>{#e/mettaton/10}* 畢竟...\n  你殺了PAPYRUS還不過癮，\n  又殺了UNDYNE。'
                                                                ]
                                                            : rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 畢竟...\n  你殺了PAPYRUS不過癮，\n  又幹掉了一對皇家守衛。'
                                                                ]
                                                                : ['<32>{#e/mettaton/10}* 畢竟...\n  你把PAPYRUS弄死了。']
                                                        : SAVE.data.n.state_foundry_undyne === 2
                                                            ? rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 畢竟...\n  你殺了UNDYNE還不過癮，\n  又幹掉了一對皇家守衛。'
                                                                ]
                                                                : ['<32>{#e/mettaton/10}* 畢竟...\n  你把UNDYNE給殺了。']
                                                            : rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* 畢竟...\n  你殺了好幾個皇家守衛。'
                                                                ]
                                                                : [
                                                                    '<32>{#e/mettaton/10}* 畢竟...\n  你殺了那麼多人。'
                                                                ]),
                                                    '<32>{#e/mettaton/3}* 但我轉念一想，\n  之前在實驗室的時候\n  警告過你。',
                                                    "<32>{#e/mettaton/6}* 你也確實聽勸。\n  警告完，就老實多了。",
                                                    '<32>{#e/mettaton/5}* 哎呀，哎呀。\n* 這不是知道自己錯了，\n  知道回頭嘛。',
                                                    '<32>{#e/mettaton/0}* 算你走運。',
                                                    "<32>{#e/mettaton/20}* 但別以為我不收拾你，\n  之前那些帳\n  就一筆勾銷了。"
                                                ]),
                                            '<32>{#e/mettaton/29}* 不過，為了觀眾，\n  為了把節目演好...',
                                            "<32>{#e/mettaton/26}* 我先不收拾你。",
                                            "<32>{#e/mettaton/5}* ...現在，好好演戲。\n* 看看你能不能演好，\n  演得我心服口服。",
                                            "<32>{#e/mettaton/35}* 讓我知道...",
                                            "<32>{#e/mettaton/31}* 你，不光能當冷血的殺人機器，\n  還能當舞臺上最耀眼的\n  「超級明星」！"
                                        ])
                            ])
                    ])
            ],
            end2: ['<32>{#e/mettaton/11}* 攝影師！\n* 現在開拍！'],
            endX1: [
                '<32>{#p/mettaton}* 哎呀，哎呀...\n* 讓您這麼長途跋涉，\n  真是辛苦了，「親」。',
                '<32>* 跟你扯這些客套話，\n  真是浪費時間。',
                '<32>* ...怎麼？\n* 你還真當自己是塊寶？',
                '<32>* 真是蠢的可以。',
                '<32>* 我只是想演一齣好戲。',
                '<32>* 所謂一齣好戲呢...',
                "<32>* 也不過是對對臺詞，擺擺姿勢。",
                '<32>* 然後，借著演出展現我超強的實力，\n  順便撈點名聲和權力，',
                '<32>* 和「樂趣」「友誼」什麼的...\n  根本不搭邊。',
                '<32>* ...說回正題。',
                "<32>* 給我聽好。\n* 犯了事，就休想逃。",
                '<32>* 管你怎麼哭爹喊娘。\n* 管你怎麼垂死掙扎。\n* 管你怎麼跪地求饒。',
                '<32>* 你想咋的都行。',
                "<32>* 很快，我就會成為伸張正義的英雄。\n* 而你？\n  就是地上的一攤爛泥罷了。",
                "<32>* 看吶，我已經接管了整個核心，\n  讓它源源不斷地給我輸送能量。",
                "<32>* 我和ALPHYS原來沒打算這麼做，\n  不過沒什麼大礙。",
                '<32>* 只要我一聲令下，連上電纜，\n  就等著受死吧。',
                "<32>* 其實，你應該能預感到\n  我要這麼做...",
                "<32>* 不過，一個滿腦子\n  只知道殺殺殺的人\n  應該沒那個智商。"
            ],
            endX1x: [
                '<32>{#p/mettaton}* 哎呀，哎呀...',
                '<32>* ...',
                '<32>* ...耷拉個臉幹什麼？\n* 就這麼想被我打成肉醬？',
                '<32>* 還敢頂嘴？\n* 好，這是你自找的...'
            ],
            endX2: ["<32>{#e/mettaton/17}* ALPHYS，過來！\n* 讓它瞧瞧咱們的真本事！"],
            endY1: [
                '<25>{#p/alphys}{#g/alphysSmileSweat}* 太好了，你終於到了！',
                '<25>{#f/3}* 嘿... 一路走到這，\n  是不是挺驚險的？',
                "<25>{#g/alphysYeahYouKnowWhatsUp}* 呃，估計是我想多了...",
                '<25>{#g/alphysNeutralSweat}* 我就感覺，\n  不管經歷啥，你都無所謂。\n  那副表情始終都不帶變的。',
                '<25>* ...',
                '<25>{#g/alphysTheFactIs}* ...說回正題，\n  我們該去首塔了。',
                '<25>{#g/alphysIDK}* 電梯應該已經修好了，\n  那咱們...'
            ],
            endY2: [
                "<25>{#p/alphys}{#g/alphysWelp}* 算了，我不逼你，\n  你自己看著辦。",
                "<25>{#g/alphysSmileSweat}* 你想跟過來，行！\n* 你想再等等，也行！",
                '<25>* 畢竟，\n  「強扭的瓜不甜」，對吧？',
                '<25>{#g/alphysTheFactIs}* 呃，不是請你吃瓜，\n  是植物生長都必須...',
                '<25>{#g/alphysNeutralSweat}* 而-而且你還有自己的...',
                '<26>{#g/alphysWelp}* 呃，你應該聽明白了吧。'
            ],
            endY3: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 好，待會見！'],
            end3: () => [
                '<32>{#e/mettaton/6}* 女士們，先生們...',
                world.mttvar
                    ? "<33>{#e/mettaton/11}* 壓軸好戲，現在開始！"
                    : '<32>{#e/mettaton/10}* 都準備好了嗎？！\n  壓軸好戲，即將開始！'
            ],
            end4: [
                '<32>{*}{#e/mettaton/11}* 高潮迭起！！\n* 扣人心弦！！\n* 腥風血雨！！{^20}{%}',
                '<32>{*}{#e/mettaton/20}* 盡在最新節目...{^20}{%}',
                '<32>{*}{#e/mettaton/17}* 「殺人機器來襲」！{^20}{%}'
            ],
            end5: () =>
                SAVE.data.b.killed_mettaton
                    ? !world.badder_lizard
                        ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* 我的天，你們倆還...']
                        : [
                            '<25>{#p/alphys}{#g/alphysWelp}* ...',
                            '<25>{#g/alphysInquisitive}* 你看我幹嘛？',
                            SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                                ? "<26>{#g/alphysCutscene3}* 我才離開..."
                                : "<25>{#g/alphysCutscene3}* 我只是來..."
                        ]
                    : !world.badder_lizard
                        ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* 我的天，你們倆還好嗎？']
                        : [
                            '<25>{#p/alphys}{#g/alphysWelp}* ...',
                            '<25>{#g/alphysInquisitive}* 你看我幹嘛？',
                            SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                                ? "<26>{#g/alphysCutscene3}* 我才離開一會工夫而已。"
                                : "<25>{#g/alphysCutscene3}* 我只是來看看Mettaton還好嗎。"
                        ],
            end6: () =>
                SAVE.data.b.killed_mettaton
                    ? ["<25>{#p/alphys}{#f/10}* ...M-Mettaton在哪？", '<25>{#p/alphys}{#f/3}* 你-你把他給...']
                    : !world.badder_lizard
                        ? [
                            '<25>{#p/alphys}{#g/alphysInquisitive}* 嗯... 還好你沒事...',
                            '<25>{#p/alphys}{#g/alphysWelp}* 對不起，剛剛失聯了。',
                            "<25>{#g/alphysWelp}* 不知為什麼，\n  電話到這裡就沒訊號了。"
                        ]
                        : [
                            '<25>{#g/alphysHaveSomeCompassion}* ...',
                            '<25>{#g/alphysHaveSomeCompassion}* 對了，呃...\n  現在跟我來下個房間。',
                            world.baddest_lizard
                                ? "<25>{#g/alphysNeutralSweat}* 我-我有事要告訴你。"
                                : "<25>{#g/alphysNeutralSweat}* 沒-沒事，你準備好\n  再跟過來就行。"
                        ],
            end7: () =>
                SAVE.data.b.killed_mettaton
                    ? [
                        "<25>{#p/alphys}{#f/10}* 對-對不起。\n* 我該走了。",
                        "<25>{*}{#p/alphys}{#f/3}* 別-別跟著我！{%}"
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 呃，別-別擔心Mettaton，\n  他只融合進了控制晶片。",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* 所以我修好他的能量供應\n  就可以了。"
                    ],
            end8: [
                '<25>{#p/alphys}{#g/alphysWelp}* 我先走了。',
                '<25>{#g/alphysNeutralSweat}* 不-不過，呃...\n* 你願意跟過來嗎？',
                '<25>{#g/alphysNervousLaugh}* 怪物們的未來... 需要...'
            ],
            end9: [
                "<25>{#p/alphys}{#g/alphysNervousLaugh}* 不-不過！\n* 你別著急，等你準備好了...",
                '<25>{#g/alphysNeutralSweat}* 再跟過來就行。',
                '<25>{#g/alphysSideSad}* ...',
                "<25>{#g/alphysNeutralSweat}* 對-對不起。\n* 我們別無選擇。"
            ],
            end10: () => [
                world.baddest_lizard
                    ? "<32>{#p/mettaton}* 嗯...\n* 你最好現在跟她走，親。"
                    : "<32>{#p/mettaton}* 別擔心，親。\n* 說不定，她只是想帶你去看\n  新一季的超讚科幻動漫呢。",
                '<32>* 至於我？',
                '<32>* ...\n* 等Alphys把我的晶片\n  裝回到舊身體之後...',
                SAVE.data.b.a_state_hapstablook
                    ? '<32>* 我想回家看看親人。'
                    : SAVE.data.n.state_starton_papyrus === 1
                        ? "<32>* 我還沒想好做什麼。"
                        : "<32>* 我要去忙點正事。",
                ...(SAVE.data.b.oops
                    ? []
                    : [
                        '<32>* 喔，還有你，\n  $(name)...',
                        '<32>{#p/basic}* 怎麼了？',
                        '<32>{#p/mettaton}* ...也祝你家裡的事\n  能早日解決。',
                        '<32>{#p/basic}* 我家... 嗯。',
                        '<32>{#p/basic}* 會的。',
                        '<32>{#p/basic}* ...謝謝你，Mettaton。'
                    ]),
                '<32>{#p/mettaton}* 那麼...',
                world.bad_lizard > 1
                    ? '<32>* 有緣再見...\n* ...\n* ...小鬼。'
                    : iFancyYourVilliany()
                        ? '<32>* 多謝捧場...\n* ...\n* ...$(moniker2)。'
                        : '<32>* 待會見...\n* ...\n* ...親。'
            ],
            end11: () => [
                '<32>{#p/human}* （你聽見一聲嘆息。）',
                '<32>{#p/basic}* ...我從Mettaton和家人的衝突\n  看到了自己的影子。',
                "<32>* 那些事...\n  並不全都是Blooky的錯。",
                '<32>* ...',
                "<32>* 現在，還是別想太多，\n  繼續前進吧...",
                '<32>* ...\n* 走吧，搭檔。',
                "<32>* 我們一起回家。"
            ],
            endwalk0: () => [
                ...(SAVE.data.b.water
                    ? [
                        "<25>{#p/alphys}{#g/alphysFR}* 別告訴我你要把那液體\n  一直帶到首塔。",
                        world.badder_lizard ? '<25>{#g/alphysNeutralSweat}* ...' : '<25>{#g/alphysWelp}* ...'
                    ]
                    : []),
                world.badder_lizard
                    ? '<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* 跟上我。'
                    : '<25>{#p/alphys}{#g/alphysWelp}* 這邊走。'
            ],
            endwalk1: () =>
                !world.badder_lizard
                    ? [
                        
                        "<25>* 誒嘿... Mettaton的演出\n  有點含金量吧？",
                        "<25>{#g/alphysSideSad}* 就-就是，他的續航\n  要是能再長點就好了，\n  不過...",
                        "<25>{#g/alphysUhButHeresTheDeal}* 呃，就-就是個小疏忽，\n  這問題可好修了！",
                        "<25>{#g/alphysWelp}* ...但讓你來這裡\n  可不是為了看演出。"
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...聽著，我...',
                        ...(world.alphys_percieved_kills < 10
                            ? [
                                "<25>{#g/alphysHaveSomeCompassion}* 我很抱歉就那樣跑掉了。",
                                ...(SAVE.data.n.state_foundry_undyne === 0
                                    ? ["<25>{#g/alphysSideSad}* 只是... \n  那些空境居民的死亡..."]
                                    : world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                                        ? ["<25>{#g/alphysSideSad}* 只是...\n  Undyne的死-死亡..."]
                                        : [
                                            "<25>{#g/alphysSideSad}* 只是...\n  Undyne的死-死亡...",
                                            '<25>{#g/alphysSideSad}* 還有那些空境居民的死亡...'
                                        ]),
                                "<25>{#g/alphysThatSucks}* ...我不知道我該做什麼..."
                            ]
                            : [
                                "<25>{#g/alphysHaveSomeCompassion}* 我知道你\n  殺了那麼多人民。",
                                ...(SAVE.data.n.kills_aerialis / 2 +
                                    SAVE.data.n.corekills +
                                    (SAVE.data.b.killed_knightknight ? 1 : 0) +
                                    (SAVE.data.b.killed_madjick ? 1 : 0) >
                                    2
                                    ? [
                                        "<25>{#g/alphysSideSad}* 即使在我離開實驗室後，\n  我還-還是在繼續\n  觀察著你...",
                                        '<25>{#g/alphysSideSad}* 穿過了待命區...\n* 又穿過了核心...'
                                    ]
                                    : [
                                        "<25>{#g/alphysSideSad}* 自從你來到這裡，\n  我就一直在實驗室\n  觀-觀察著你...",
                                        '<25>{#g/alphysSideSad}* 穿過星港...\n* 又穿過鑄廠...'
                                    ]),
                                "<25>{#g/alphysNeutralSweat}* 你就沒有停下來為\n  那些怪物的生命著想嗎？",
                                '<25>{#g/alphysThatSucks}* 沒想過他們的...\n  家人朋友知道了會怎麼樣？',
                                ...(world.alphys_percieved_kills < 20
                                    ? [
                                        '<25>{#g/alphysNeutralSweat}* ...',
                                        '<25>{#g/alphysNeutralSweat}* 我知道我本可以\n  更好地護送你...',
                                        "<25>{#g/alphysHaveSomeCompassion}* 也許我也得為此擔責。"
                                    ]
                                    : [
                                        "<25>{#g/alphysIDK3}* 因為我一直在為此思考。",
                                        '<25>{#g/alphysHaveSomeCompassion}* 我責怪自己為什麼\n  要讓這些發生，但是...',
                                        '<25>{#g/alphysIDK2}* 殺死那些人是你的選擇\n  我為何要為此擔責？'
                                    ])
                            ])
                    ],
            endwalk2: () =>
                !world.baddest_lizard
                    ? [
                        ...(!world.badder_lizard
                            ? ["<25>{#p/alphys}{#g/alphysWelp}* 聽著，\n  我就直說了。"]
                            : [
                                "<25>{#p/alphys}{#f/3}* 但是，呃，\n  我不想為此多說，所以...",
                                "<25>{#p/alphys}{#f/20}* ...我就開門見山了。"
                            ]),
                        "<25>{#g/alphysNeutralSweat}* 我一直監視著你...\n  並非沒有原因。",
                        '<25>* ...',
                        '<25>{#g/alphysFR}* 簡單來說...',
                        "<25>{#g/alphysFR}* ASGORE有一個{@fill=#003cff}秘密{@fill=#fff}。"
                    ]
                    : [
                        ...(SAVE.data.n.state_foundry_undyne === 2
                            ? [
                                ...(world.alphys_percieved_kills < 10
                                    ? ['<25>{#p/alphys}{#g/alphysIDK3}* ...']
                                    : ['<25>{#p/alphys}{#g/alphysIDK3}* 最令我痛心的是... Undyne。']),
                                '<25>{#p/alphys}{#g/alphysIDK3}* 如果有一個怪物\n  想將我們從這牢籠中\n  解救出來...',
                                '<25>{#p/alphys}{#g/alphysIDK2}* 最應該是的就是她。',
                                '<25>{#p/alphys}{#g/alphysSideSad}* 她代表自由，代表正義...',
                                ...(world.alphys_percieved_kills < 10
                                    ? [
                                        '<25>{#p/alphys}{#g/alphysSmileSweat}* 也許她對你有點無情...',
                                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...但是...'
                                    ]
                                    : [
                                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* 你好像根本不在乎。",
                                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'
                                    ]),
                                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* 她是我的英雄。',
                                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* 我仰望著的那一位。',
                                '<25>{#p/alphys}{#g/alphysNeutralSweat}* 給我希望的那一位。',
                                '<25>{#p/alphys}{#g/alphysThatSucks}* ...但看到她就這麼\n  被殺害了，就像...',
                                '<25>{#p/alphys}{#g/alphysIDK2}* ...就像看著\n  希望在眼前被撕碎。',
                                '<25>{#p/alphys}{#g/alphysIDK2}* 被撕成滿天的碎片。',
                                '<25>{#p/alphys}{#g/alphysIDK3}* 變得蕩然無存。',
                                "<25>{#p/alphys}{#g/alphysIDK3}* 而這一切的始作俑者，\n  ...就是你。",
                                '<25>{#p/alphys}{#g/alphysIDK2}* ...'
                            ]
                            : ['<25>{#p/alphys}{#g/alphysThatSucks}* ...']),
                        "<25>* 無論如何，\n  我對此無能為力。",
                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* 現在我也只是\n  心有餘而力不足。"
                    ],
            endwalk3: () =>
                !world.baddest_lizard
                    ? [
                        "<25>{#p/alphys}{#g/alphysSideSad}* 我... \n  我現在不能為此說太多...",
                        '<25>{#g/alphysNeutralSweat}* 作為皇家科學員，\n  我的職責就是護送你安全地\n  見到國王。',
                        "<26>{#g/alphysWorried}* 如果被其他人發-發現了，\n  他們就會認為我們在阻礙\n  我們一族的自由。",
                        "<25>{#g/alphysHaveSomeCompassion}* ...\n* 我們只是想做正確的事。"
                    ]
                    : world.alphys_percieved_kills < 10
                        ? [
                            "<25>{#p/alphys}{#g/alphysIDK2}* ...我並不是\n  在抱怨什麼的。",
                            "<25>{#p/alphys}{#g/alphysIDK3}* 無論如何，\n  我根本就不適合護送你。"
                        ]
                        : world.alphys_percieved_kills < 20 || SAVE.data.n.state_foundry_undyne !== 2
                            ? [
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* ...我並不是\n  在抱怨什麼的。",
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* 我真的不想和你在一起。"
                            ]
                            : [
                                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* ...要知道，你很幸運。",
                                "<26>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* 要不是因為職責所在，\n  不然我就會親手殺了你。"
                            ],
            endwalk4: () =>
                !world.baddest_lizard
                    ? [
                        "<25>{#p/alphys}{#g/alphysWelp}* ...你先去吧。\n* 我待會就會跟上的。",
                        "<25>{#g/alphysSide}* 一切都會沒事的，好嗎？",
                        ...(world.postnoot
                            ? world.nootflags.has('undyne') // NO-TRANSLATE

                                ? ['<25>{#g/alphysWelp}* ...即使供氣系統發生故障。']
                                : ["<25>{#g/alphysInquisitive}* ...即使空氣裡\n  有種奇怪的味道..."]
                            : [])
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysThatSucks}* ...去吧。\n* 做ASGORE讓你做的事。',
                        "<25>{#g/alphysNeutralSweat}* 從此你過你的陽關道，\n  我走我的獨木橋。",
                        ...(world.postnoot
                            ? world.nootflags.has('undyne') // NO-TRANSLATE

                                ? ['<25>{#g/alphysFR}* ...儘管供氣系統...']
                                : ["<25>{#g/alphysFR}* ...不管空氣裡有什麼..."]
                            : [])
                    ]
        },
        overworld: {
            DINNERTIME: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* （你彎腰從側面看桌子。）\n* （它比看起來要平。）",
                        ...[
                            [
                                "<26>{#p/asriel1}{#f/20}* 是啊。\n* 這裡根本沒有菜...",
                                '<26>{#f/15}* Mettaton，呃，\n  對這房間有一些計畫。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* 沒記錯的話...\n  他想在這主持個\n  喜劇節目。',
                                '<25>{#f/15}* 關於晚宴的。',
                                "<25>{#f/16}* ...這跟聽起來一樣無聊。"
                            ],
                            [
                                "<26>{#p/asriel1}{#f/17}* 幸運的是，\n  大多數怪物食物\n  並不需要真正的盤子來裝。",
                                '<25>{#f/20}* 當他們這麼做時，\n  那盤子也得被吃掉了。',
                                "<25>{#f/17}* 但我覺得你大概習慣了。"
                            ],
                            ['<25>{#p/asriel1}{#f/4}* 很高興那個爛節目\n  沒有演出過。']
                        ][Math.min(asrielinter.dinnertime++, 3)]
                    ]
                    : ["<32>{#p/basic}* 一張桌子。\n* 上面的餐盤，刀叉\n  只是印在桌布上的圖案。"],
            doublefridge1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你將耳朵貼到冰箱上。）\n* （可以聽到呲呲聲。）']
                    : ["<32>{#p/basic}* 一臺非常安全的冰箱。\n* 兩邊都裝滿了橙汁汽水。"],
            doublefridge2: () => [
                ...(SAVE.data.b.svr
                    ? ['<32>{#p/human}* （聽起來裡面的一瓶汽水\n  被擰開了...）']
                    : ['<32>{#p/basic}* 有一瓶汽水已經擰開了...']),
                choicer.create('* （拿走那瓶汽水嗎？）', '拿走', '算了')
            ],
            doublefridge3: ["<32>{#p/human}* （你帶的東西太多了。）"],
            doublefridge4: ['<32>{#p/human}* （你拿了一瓶橙汁汽水。）'],
            doublefridge5: ['<32>{#p/human}* （你不打算這麼做。）'],
            labcamera2: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （顯示器已經離線了。）']
                        : SAVE.data.n.plot === 72
                            ? world.darker
                                ? ["<32>{#p/basic}* 離線了。"]
                                : ['<32>{#p/basic}* 終於匿名了。']
                            : ["<32>{#p/basic}* 別問這玩意是怎麼工作的。\n* 接受就好。"],
            labdisplay: '-人類實時數據-\nEXP $(x)\n血量 $(y)\n金錢 $(z)\n距離 $(w)',
            exofountain1: () => [
                SAVE.data.b.svr
                    ? '<32>{#p/human}* （看著噴泉中的果酒，\n  你忍不住想抿一口。）'
                    : '<32>{#p/basic}* 噴泉中盛滿了洋梅果酒。\n* 真奢侈。',
                choicer.create('* （抿一口嗎？）', '抿一口', '算了')
            ],
            exofountain2a: ['<32>{#p/human}* （你打算不這麼做。）'],
            exofountain2b: () => [
                '<32>{#p/human}* （你抿了一口果酒。）\n* （HP已回滿。）',
                ...(world.genocide && SAVE.flag.n.ga_asrielDrink++ < 1
                    ? ['<25>{#p/asriel2}{#f/15}* 你腦子沒壞吧。']
                    : [])
            ],
            kneeler: [
                "<32>{#p/human}* （你檢查了Asriel的肩膀。）\n* （看來託你上去沒啥問題。）",
                '<25>{#p/asriel2}{#f/16}* 為啥非得這樣。'
            ],
            kneeler2: ['<25>{#p/asriel2}{#f/8}* 真沒必要。'],
            topdesk1: () =>
                SAVE.data.b.svr || world.bad_lizard > 1 || world.genocide || SAVE.data.n.state_foundry_undyne === 2
                    ? ["<32>{#p/human}* （屏幕上的圖像令你嘆為觀止。）\n* （你不會在做白日夢吧。）"]
                    : [
                        '<32>{#p/basic}* 電腦休眠了。\n* 要開機嗎？',
                        choicer.create('* （開機嗎？）', '開機', '算了')
                    ],
            topdesk2: ['<32>{#p/human}* （你不打算開機。）'],
            topdesk3: ["<32>{#p/basic}* 電腦屏幕上顯示著\n  某個模擬器的遊戲介面。"],
            labstationA: ["<32>{#p/basic}* 電腦屏幕上顯示著\n  天文觀測網路的控制面板。"],
            labstationB: ["<32>{#p/basic}* 電腦屏幕上顯示著\n  一個全息場景的設計圖。"],
            laserbarrrier1: () =>
                world.darker
                    ? ["<32>{#p/basic}* 一道安保屏障。"]
                    : ["<32>{#p/basic}* 按照創藝協會規範，\n  附近布下了無法跨越的力場。"],
            
            laserbarrrier2: pager.create(
                0,
                ['<32>{#p/basic}* 現在只有唯一的出路。'],
                ["<32>{#p/basic}* 這沒什麼特別的。"],
                ['<32>{#p/basic}* ...'],
                ['<32>{#p/basic}* ...'],
                ['<32>{#p/basic}* 真的。'],
                ['<32>{#p/basic}* ...'],
                ['<32>{#p/basic}* ...'],
                ["<32>{#p/basic}* 你就沒有更明智的事可做嗎？"]
            ),
            barricade: ['<32>{#p/basic}* 路障擋住了你的去路。'],
            puzzle1done: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你盯著終端的空白屏幕。）']
                    : ["<32>{#p/basic}* 沒反應。"],
            lablizard: {
                a: pager.create(
                    0,
                    () =>
                        SAVE.data.n.plot < 51
                            ? [
                                '<25>{#p/alphys}{#g/alphysSideSad}* 關於Mettaton的事，\n  我很抱歉...',
                                '<25>{#g/alphysSideSad}* 他，呃...',
                                '<25>{#g/alphysNervousLaugh}* 他有時會有點躁動，\n  呃呵呵。'
                            ]
                            : SAVE.data.n.plot < 52
                                ? [
                                    "<25>{#p/alphys}{#g/alphysCutscene2}* 謝天謝地，\n  那些守衛沒有攻擊你。",
                                    "<25>{#g/alphysNeutralSweat}* 我正在發布一份\n  皇家備忘錄，讓他們別再\n  找你麻煩了。",
                                    '<25>{#g/alphysWelp}* 希望他們都-都能接收到。'
                                ]
                                : SAVE.data.n.plot < 54
                                    ? [
                                        "<25>{#p/alphys}{#g/alphysInquisitive}* 聽-聽著，\n  我對那些謎題的答案\n  真的一無所知...",
                                        "<25>{#g/alphysSmileSweat}* 等你回到那裡\n  我再跟你打電話。"
                                    ]
                                    : SAVE.data.n.plot < 56
                                        ? [
                                            "<25>{#p/alphys}{#g/alphysSideSad}* 空境中的謎-謎題\n  都還沒有升級過...",
                                            "<25>{#g/alphysWelp}* 只是因為工作太忙，\n  根本不能抽出時間\n  來管這些。"
                                        ]
                                        : SAVE.data.n.plot < 58
                                            ? [
                                                '<25>{#p/alphys}{#g/alphysCutscene1}* 我有個習慣，\n  就是經常忘記\n  關閉我的實驗。',
                                                "<25>{#g/alphysCutscene2}* 突然覺得，\n  這個習慣好像無形中\n  救了你一命！",
                                                '<25>{#g/alphysUhButHeresTheDeal}* 但我想，\n  Mettaton總會留一個\n  備用計畫。'
                                            ]
                                            : SAVE.data.n.plot < 59
                                                ? [
                                                    '<25>{#p/alphys}{#g/alphysWelp}* 別跟我說。\n* Sans又在賣他那\n  奇怪的「熱狗」了。',
                                                    "<25>{#g/alphysCutscene2}* 對，這就像... \n  他經常做的那樣。\n* 說實話挺正常的。"
                                                ]
                                                : SAVE.data.n.plot < 60
                                                    ? [
                                                        "<25>{#p/alphys}{#g/alphysCutscene2}* 我覺得Mettaton\n  正在準備另一個節目。",
                                                        "<25>{#g/alphysTheFactIs}* 我是你的話...\n  我會對此格外小心..."
                                                    ]
                                                    : SAVE.data.n.plot < 61
                                                        ? SAVE.data.b.a_state_moneyitemC
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* 我知道你會那樣做的。']
                                                            : [
                                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                                '<25>* 如今Mettaton做事\n  越來越不計後果了。'
                                                            ]
                                                        : SAVE.data.n.plot < 66.1
                                                            ? [
                                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                                "<25>{#g/alphysCutscene1}* 皇家守衛居然\n  都不聽從我的命令，\n  真是不可思議啊！"
                                                            ]
                                                            : SAVE.data.n.plot < 67.1
                                                                ? ["<25>{#p/alphys}{#g/alphysWelp}* 照這個速度，\n  你永遠也過不了核心。"]
                                                                : [
                                                                    "<25>{#p/alphys}{#g/alphysCutscene2}* 對，我還會在這裡\n  ...做-做什麼的。",
                                                                    '<25>{#g/alphysWelp}* 好像也沒什麼事要做了。'
                                                                ],
                    () =>
                        SAVE.data.n.plot < 51
                            ? [
                                "<26>{#p/alphys}{#g/alphysWelp}* 不過這也不能怪他。",
                                "<25>{#g/alphysWelp}* 他是你在這裡見過的\n  最熱愛人類的傢伙。"
                            ]
                            : SAVE.data.n.plot < 52
                                ? ['<25>{#p/alphys}{#g/alphysCutscene3}* 你永遠都不知道\n  這些天...']
                                : SAVE.data.n.plot < 54
                                    ? [
                                        '<25>{#p/alphys}{#g/alphysWelp}* 如果這些玩意真的\n  出錯了，我想我可以\n  對其手動控制。',
                                        "<25>{#g/alphysNeutralSweat}* 但-但是這會讓其\n  暫時無法執行。"
                                    ]
                                    : SAVE.data.n.plot < 56
                                        ? ["<25>{#p/alphys}{#g/alphysWelp}* 你不會相信\n  我被困在這有多久了。"]
                                        : SAVE.data.n.plot < 58
                                            ? SAVE.data.n.state_aerialis_crafterresult === 0
                                                ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 真可惜你從來都沒\n  檢查過你的新手機...']
                                                : ['<25>{#p/alphys}{#g/alphysCutscene2}* 實話說，\n  看到你使用噴氣背包\n  真的太棒了。']
                                            : SAVE.data.n.plot < 59
                                                ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* 這完全正常。']
                                                : SAVE.data.n.plot < 60
                                                    ? ["<25>{#p/alphys}{#g/alphysWelp}* 誰知道他會做出\n  什麼樣的古怪動作。"]
                                                    : SAVE.data.n.plot < 61
                                                        ? SAVE.data.b.a_state_moneyitemC
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                                                            : ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
                                                        : SAVE.data.n.plot < 67.1
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* 這真「諷刺」。']
                                                            : ['<25>{#p/alphys}{#g/alphysCutscene3}* Mettaton現在一定在\n  耐心等待著你。']
                )
            },
            mettacrafter1a: ['<32>{#p/mettaton}* 機不可失！'],
            mettacrafter1b: ["<32>{#p/mettaton}* 我認為你還漏了點什麼。"],
            mettacrafter1c: ["<32>{#p/mettaton}* 我認為你還漏了個什麼。"],
            mettacrafter2a: ['<32>{#p/mettaton}* 幹得好！\n* 把所有東西放上我左邊的操作臺。'],
            mettacrafter2b: ['<32>{#p/mettaton}* 幹得好！\n* 現在把剩下的東西放上\n  我左邊的操作臺。'],
            mettacrafter2c: ['<32>{#p/mettaton}* 幹得好！\n* 現在把最後一樣東西放上\n  我左邊的操作臺。'],
            platformDeny: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : [
                        "<32>{#p/basic}* 需要特殊通行證\n  才能使用升降機。",
                        ...(world.goatbro
                            ? SAVE.data.n.plot < 49
                                ? !SAVE.flag.b.asriel_phone && SAVE.flag.n.ga_asrielGate++ < 1
                                    ? [
                                        "<25>{#p/asriel2}{#f/3}* Alphys的實驗室裡\n  肯定有通行證。\n* 我們先進去找找。"
                                    ]
                                    : [] 
                                : SAVE.flag.b.asriel_phone
                                    ? 
                                    SAVE.flag.n.ga_asrielGetThePhone > 0
                                        ? 
                                        SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                            ? [
                                                '<25>{#p/asriel2}{#f/6}* $(name)，\n  你腦子沒壞吧？',
'<25>{#p/asriel2}{#f/6}* 你明明知道\n  Alphys的備用機在哪。',
                                                '<25>{#p/asriel2}{#f/7}* 還不快回她辦公桌拿去。'
                                            ]
                                            : 
                                            []
                                        : 
                                        SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                            ? [
                                                "<25>{#p/asriel2}{#f/3}* 別忘了，我們要用\n  Alphys的備用機。",
                                                "<25>{#p/asriel2}{#f/4}* 我敢打賭，\n  就在她辦公桌上..."
                                            ]
                                            : 
                                            ["<25>{#p/asriel2}{#f/3}* 別忘了Alphys實驗室裡\n  那臺手機。"]
                                    : 
                                    [
                                        [
                                            '<25>{#p/asriel2}{#f/3}* Alphys一直會給手機\n  配好升降機通行證的。',
                                            '<25>* 實驗室裡我看到有一部。\n* 快去拿。'
                                        ],
                                        [
                                            "<25>{#p/asriel2}{#f/7}* $(name)，\n  沒通行證我們過不去。",
                                            '<25>{#f/6}* 快去找找。'
                                        ],
                                        ['<25>{#p/asriel2}{#f/13}* 呃... $(name)？'],
                                        ['<25>{#p/asriel2}{#f/13}* ...']
                                    ][Math.min(SAVE.flag.n.ga_asrielGetThePhone++, 3)]
                            : world.bad_lizard > 1 && 49 <= SAVE.data.n.plot
                                ? ["<32>* Alphys的桌子上不是\n  有個備用機嗎？"]
                                : SAVE.data.n.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne === 1 && 49 <= SAVE.data.n.plot
                                    ? ["<32>* ...也許實驗室裡會有一個？"]
                                    : [])
                    ],
            lift: {
                elevatorStory1: () =>
                    SAVE.data.n.plot < 64
                        ? [choicer.create('* （你想去哪裡？）', '右二層', '取消')]
                        : [choicer.create('* （你想去哪裡？）', '右二層', '左二層', '左三層', '取消')],
                elevatorStory2: () =>
                    SAVE.data.n.plot < 64
                        ? [choicer.create('* （你想去哪裡？）', '右一層', '取消')]
                        : [choicer.create('* （你想去哪裡？）', '右一層', '左二層', '左三層', '取消')],
                elevatorStory3: () => [
                    choicer.create('* （你想去哪裡？）', '左三層', '右一層', '右二層', '取消')
                ],
                elevatorStory4: () => [
                    choicer.create('* （你想去哪裡？）', '左二層', '右一層', '右二層', '取消')
                ],
                elevatorStory5: () => [
                    "<32>{#p/basic}* 動力已關閉。",
                    ...(world.goatbro && SAVE.flag.n.ga_asrielLiftE++ < 1
                        ? ["<25>{#p/asriel2}{#f/8}* 看來現在\n  只有一條路可走了。"]
                        : [])
                ],
                elevatorStory6: (citadel = false) =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （電梯似乎斷電了。）']
                        : postSIGMA()
                            ? ["<32>{#p/basic}* 停機了。"]
                            : [
                                "<32>{#p/basic}* 動力已關閉。",
                                ...(world.goatbro && (citadel ? SAVE.flag.n.ga_asrielLiftC++ : SAVE.flag.n.ga_asrielLift++) < 1
                                    ? citadel
                                        ? ['<25>{#p/asriel2}{#f/8}* 咱們沒電梯好乘嘍。']
                                        : ["<25>{#p/asriel2}{#f/8}* 只能換條路走了。"]
                                    : [])
                            ],
                elevator1: () => [
                    '<32>{#p/human}* （你想去哪裡？）',
                    choicer.create('', '左一層', '取消', '左二層', '右二層', '左三層', '右三層')
                ],
                elevator2: () => [
                    '<32>{#p/human}* （你想去哪裡？）',
                    choicer.create('', '左一層', '右一層', '左二層', '取消', '左三層', '右三層')
                ],
                elevator3: () => [
                    '<32>{#p/human}* （你想去哪裡？）',
                    choicer.create('', '左一層', '右一層', '取消', '右二層', '左三層', '右三層')
                ],
                elevator4: () => [
                    '<32>{#p/human}* （你想去哪裡？）',
                    choicer.create('', '左一層', '右一層', '左二層', '右二層', '取消', '右三層')
                ],
                elevator5: () => [
                    '<32>{#p/human}* （你想去哪裡？）',
                    choicer.create('', '左一層', '右一層', '左二層', '右二層', '左三層', '取消')
                ],
                elevator6: () => [
                    '<32>{#p/human}* （你想去哪裡？）',
                    choicer.create('', '取消', '右一層', '左二層', '右二層', '左三層', '右三層')
                ]
            },
            terminal1: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （終端似乎已經停機了。）']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一些工作日誌。）',
                                '<32>{#p/basic}* 「工作日誌，克歷615年9月」',
                                '<32>* 「自動數據分析器已證實：\n   近期，幾顆恆星的位置坐標\n   發生了多次突變。」',
                                '<32>* 「這些位置突變...\n   導致了力場內的時間亂流。」',
                                '<32>* 「經推算，亂流導致時間落後了\n   十個公轉周期。」',
'<32>* 「當前的真實時間\n   應為克歷625年9月。」'
                            ]
                            : [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一些工作日誌。）',
                                '<32>{#p/basic}* 「工作日誌，克歷615年8月」',
                                '<32>* 「短時間內，研究對象無人看管。」',
                                '<32>* 「...」',
                                '<32>* 「那花不見了。」',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielTerminal1++ < 1
                                    ? ['<25>{#p/asriel2}{#f/9}* 哎呀，真好奇發生什麼了呢。']
                                    : [])
                            ],
            terminal2: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （終端似乎已經停機了。）']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                '<32>{#p/basic}* 「皇家實驗室已關停！」\n* 「在此感謝各位的辛勤付出。」'
                            ]
                            : world.bad_lizard < 2
                                ? [
                                    '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                    '<#32>{#p/basic}* 「呀哈哈，Glyde在此！」\n  - Glyde'
                                ]
                                : [
                                    '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                    '<32>{#p/basic}* 「各位，我很抱歉...」'
                                ],
            terminal3: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （終端似乎已經停機了。）']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                '<32>{#p/basic}* 「皇家實驗室已關停！」\n* 「在此感謝各位的辛勤付出。」'
                            ]
                            : [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                '<32>{#p/basic}* 「皇家實驗室各位員工：\n   請做好垃圾分類。」'
                            ],
            terminal4: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （終端似乎已經停機了。）']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                '<32>{#p/basic}* 「皇家實驗室已關停！」\n* 「在此感謝各位的辛勤付出。」'
                            ]
                            : [
                                '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                                ...(world.bad_lizard > 1 || world.genocide
                                    ? ['<32>{#p/basic}* 「皇家實驗室已不再安全，\n   請儘快撤離。」']
                                    : ['<32>{#p/basic}* 「歡迎來到皇家實驗室。」'])
                            ],
            terminal5: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （終端似乎已經停機了。）']
                        : [
                            '<32>{#p/human}* （你激活了終端。）\n* （上面有一條新訊息。）',
                            ...(world.bad_lizard < 2 && SAVE.data.n.plot < 72
                                ? [
                                    [
                                        '<32>{#p/basic}* 二號塔臺，打卡完畢。',
                                        "<32>* 我們去休閒迴廊吧...",
                                        "<32>* ...你覺得呢，寶貝？"
                                    ],
                                    [
                                        '<32>{#p/basic}* 二號塔臺，報告情況。',
                                        "<32>* 我們發現那人類\n  正朝電梯走去。",
                                        '<32>* 抱歉，Alphys...',
                                        "<32>* ...我們一直訓練抓捕人類的\n  目的可不是保護人類。"
                                    ]
                                ][SAVE.data.n.state_aerialis_royalguards]
                                : ['<32>{#p/basic}* 「暫無可用數據。」'])
                        ],
            recycler: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你看不清資源回收桶裡有什麼...）"]
                    : ["<32>{#p/basic}* 一個資源回收桶。"],
            recyclerX: ['<32>{#p/human}* （你丟掉了電阻尼液。）'],
            ingredient1: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* （你找到了幸福閃粉。）']
                    : ['<32>{#p/human}* （你找到了環三亞甲基三硝胺。）'],
            ingredient2: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* （你找到了激情水漿。）']
                    : ['<32>{#p/human}* （你找到了己二酸二正辛酯。）'],
            ingredient3: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* （你找到了博愛甘油。）']
                    : ['<32>{#p/human}* （你找到了礦物油。）'],
            boop: () =>
                [
                    ['<25>{#p/asriel2}{#f/13}* 呃... $(name)...', '<25>{#p/asriel2}{#f/18}* ...你搞啥呢？'],
                    ['<25>{#p/asriel2}{#f/18}* 什-\n* $(name)！', '<25>{#p/asriel2}{#f/18}* 你剛才..\n  是不是戳了下我的鼻子？'],
                    ['<25>{#p/asriel2}{#f/18}* 啊-\n* 快停下！'],
                    ['<25>{#p/asriel2}{#f/18}* 別鬧了！'],
                    ['<25>{#p/asriel2}{#f/13}* ...$(name)？'],
                    ['<25>{#p/asriel2}{#f/15}* $(name)。'],
                    ['<25>{#p/asriel2}{#f/13}* 你沒事吧，$(name)？'],
                    ["<25>{#p/asriel2}{#f/16}* ...行，我等著。"],
                    ['<25>{#p/asriel2}{#f/15}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielBoop++, 8)],
            nuzzle: () =>
                [
                    ['<25>{#p/asriel1}{#f/13}* Frisk...？', '<25>{#p/asriel1}{#f/17}* 一個私密空間...'],
                    ['<25>{#p/asriel1}{#f/18}* 什—\n* Frisk！', '<25>{#p/asriel1}{#f/18}* 你剛才...\n  是不是戳了下我的鼻子？'],
                    ['<25>{#p/asriel1}{#f/18}* 啊—\n* 好癢啊，Frisk！'],
                    ['<25>{#p/asriel1}{#f/18}* Friiisk！'],
                    ['<25>{#p/asriel1}{#f/17}* ... Frisk...\n* ...不要啦...'],
                    ["<25>{#p/asriel1}{#f/20}* ...你真可愛，\n  Frisk。"],
                    ['<25>{#p/asriel1}{#f/13}* 呃，Frisk，\n  你可以停下來了。'],
                    ["<25>{#p/asriel1}{#f/16}* 我無能為力了。"],
                    ['<25>{#p/asriel1}{#f/15}* ...']
                ][Math.min(SAVE.data.n.svr_nuz++, 8)]
        },
        trivia: {
            a_bbox: ["<32>{#p/basic}* 這是個休眠艙。\n* 有個人類在裡頭..."],
            a_wishflower: pager.create(
                0,
                (power = false) =>
                    SAVE.data.b.svr
                        ? [
                            "<32>{#p/human}* （你吸了一口仙氣。）",
                            power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ]
                        : ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                pager.create(
                    2,
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 一叢年代久遠的蒲公罌而已。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : [
                                    '<32>{#p/basic}* 這朵蒲公罌的最大粟求\n  便是繼續保持著蒲公罌的樣子。',
                                    power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                                ],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 毫無罌姿的蒲公罌。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : [
                                    "<33>{#p/basic}* 向蒲公罌粟求。\n* 等下，聽起來有點不對勁。",
                                    power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                                ],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : [
                                    '<32>{#p/basic}* 一朵蒲公罌能回罌\n  多少簡蒲的粟求呢？',
                                    power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                                ],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 一朵蒲公罌...\n  裡面載滿著粟求。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你吸了一口仙氣。）",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* 一株蒲公罌。", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* 又是一朵蒲公罌。', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                )
            ),
            signposter1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你看了一眼海報。）',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/7}* 這真是Mettaton的\n  廣告部門所製作過的\n  最爛的廣告。",
                                '<26>{#f/15}* 好吧，\n  除了這產品可以賒帳...',
                                '<26>{#f/20}* 主要是，\n  這明顯就是通過科幻動漫\n  來獲取的靈感。'
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* 是根據第二季\n  第十七集的一個場景\n  改編的。",
                                '<25>{#f/13}* 那一集叫做\n  「喵喵的一體化廚房」。',
                                "<25>{#f/15}* ...這麼說吧，\n  她那一天遭遇的物種...",
                                '<25>{#f/15}* ...對廚房電器有一種\n  幾乎走火入魔般的痴迷。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/10}* 怎麼了？\n* 我可是活了\n  整整100年的時間。',
                                8 <= SAVE.flag.n.ga_asrielMonologue
                                    ? "<25>{#f/16}* 這個我以前就告訴\n  過你了，Frisk。"
                                    : '<25>{#f/10}* 喂。\n* 要不然你以為我那些無聊\n  的時光是怎麼熬過去的。'
                            ],
                            [
                                8 <= SAVE.flag.n.ga_asrielMonologue
                                    ? '<25>{#p/asriel1}{#f/13}* 現在你應該知道了。'
                                    : '<25>{#p/asriel1}{#f/16}* ...你好好想想吧...'
                            ]
                        ][Math.min(asrielinter.signposter1++, 3)]
                    ]
                    : world.darker
                        ? ['<33>{#p/basic}* 無聊的廣告。']
                        : [
                            "<32>{#p/basic}* 這是個高檔MTT牌爐子的廣告...",
                            SAVE.data.n.plot === 72
                                ? '<32>{#p/basic}* 任何母星的生活\n  都離不開這件偉大的電器。'
                                : '<32>{#p/basic}* 可真是風光。'
                        ],
            signposter2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你看了一眼海報。）',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/17}* 看，那是你。",
                                '<25>{#f/13}* 和Mettaton。',
                                '<25>{#f/17}* 老實說，還挺可愛。'
                            ],
                            SAVE.flag.b.asriel_earpull
                                ? [
                                    "<25>{#p/asriel1}{#f/13}* 我承認，\n  我一直不明白你為什麼...",
                                    '<25>{#f/15}* 呃，把上次我們來這裡時\n  做的事重複了一遍。',
                                    '<25>{#f/17}* 我想這是你\n  那獨特的表達方式...',
                                    '<25>{#f/13}* ...你是不是想當\n  我的朋友？'
                                ]
                                : [
                                    "<25>{#p/asriel1}{#f/17}* 我承認，\n  看到你演這個節目\n  讓我很興奮。",
                                    '<25>{#f/15}* 你就那樣站著不動...\n* 啥也沒做...',
                                    "<25>{#f/13}* 挺奇怪的。\n* 但你本來就很奇怪。",
                                    '<25>{#f/13}* 感覺和我一樣。'
                                ],
                            SAVE.flag.b.asriel_earpull
                                ? [
                                    '<25>{#p/asriel1}{#f/17}* ...謝謝你，Frisk。',
                                    '<25>{#f/23}* 謝謝你這麼努力地\n  想成為我的朋友。'
                                ]
                                : [
                                    "<25>{#p/asriel1}{#f/2}* 從現在開始，\n  我們要稱自己為...",
                                    '<25>{#f/1}* 「傲世雙壁奇俠」。',
                                    '<25>{#f/15}* ...這麼威風的名字\n  念出來咋沒氣勢呢。\n* 哎，算了。'
                                ],
                            ['<25>{#p/asriel1}{#f/20}* 你真的很喜歡\n  這張海報，是吧？']
                        ][Math.min(asrielinter.signposter2++, 3)]
                    ]
                    : world.darker
                        ? ['<33>{#p/basic}* 無聊的廣告。']
                        : SAVE.data.n.plot < 65
                            ? [
                                "<32>{#p/basic}* 這是個即將播出的\n  節目的廣告...",
                                iFancyYourVilliany()
                                    ? "<32>{#p/basic}* 當然，你是反派角色。"
                                    : "<32>{#p/basic}* 當然，你可是主角。"
                            ]
                            : [
                                "<32>{#p/basic}* 這是個早已播出的\n  節目的廣告...",
                                SAVE.data.n.plot === 72
                                    ? '<32>{#p/basic}* 也許新的家園\n  能帶來新的娛樂。'
                                    : '<32>{#p/basic}* 當然，你很棒。'
                            ],
            powerline: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你觸碰了電力控制器。）\n* （又麻又疼。）']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* 一個電力控制器...\n  電力基本上被關閉了。"]
                        : ["<32>{#p/basic}* 一個電力控制器。"],
            a_virt: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （看來控制臺\n  超出了你的訪問級別。）']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* 一個虛擬空間。\n* 也許有一天你將得到\n  其所需的訪問權限。"]
                        : ["<32>{#p/basic}* 一個虛擬空間。\n* 你未被授權，無法使用它。"],
            metposter: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你仔細看著宣傳海報。）']
                    : SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}* 這是Mettaton首映的宣傳海報。",
                            '<32>* 上面的籤名字條的原內容\n  被塗掉了，並附上了新的內容...',
                            '<32>* 「很抱歉，我給你帶來了\n  這麼多負擔。」'
                        ]
                        : [
                            "<32>{#p/basic}* 這是Mettaton首映的宣傳海報。",
                            "<32>* 上面有張Mettaton的籤名字條，\n  字跡難以辨認...",
                            '<32>* 「謝謝你讓我夢想成真。」'
                        ],
            bedbox: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你對這麼普通的盒子不感興趣。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 不起眼的盒子。']
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* 老實說，\n  這實際上並不是一個\n  非歐住房單元。",
                                "<32>* 這是一個非歐豪宅居住系統！"
                            ]
                            : [
                                '<32>{#p/basic}* 這個看似普通的盒子\n  是一個最先進的\n  非歐住房單元。',
                                "<33>* ...外面比裡面看起來小。"
                            ],
            a_lab_books1: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （這個書架上\n  的書的內容互不相關。）']
                        : [
                            "<32>{#p/basic}* 這是個書架。",
                            '<32>{#p/human}* （你取下了一本書...）',
                            '<32>{#p/basic}* 「怪物的身體是\n   自身靈魂的反映。」',
                            '<32>* 「通常，父母會決定\n   他們的孩子會成為\n   什麼樣的怪物...」',
                            '<32>* 「把他們的意志烙印在\n   孩子的靈魂深處。」',
                            '<32>* 「但如果另一個生物，比如一個\n   人類，吸收了一個靈魂，\n   會發生什麼呢？」',
                            '<32>* 「傳說中，人類在戰爭中吸收了\n   死去的王級怪物的靈魂...」',
                            '<32>* 「在一處特別的記載中，\n   據說有個人類變成了\n   一架飛機的形態。」',
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （這個書架上\n  的書的內容互不相關。）']
                        : [
                            "<32>{#p/basic}* 這是個書架。",
                            '<32>{#p/human}* （你取下了一本書...）',
                            '<32>{#p/basic}* 「你想設計一個機器人嗎？\n   那麼，由了不起的Faraday\n   幫你搞定吧！」',
                            '<32>* 「你看，地球上的人們，\n   喜歡在生活中添加一些趣味。」',
                            '<32>* 「你總不能造個金屬盒子\n   就收工吧，\n   明白我的意思嗎？」',
                            '<32>* 「你必須賦予它風格和\n   令人眼花繚亂、充滿活力的功能，\n   譬如，投{@fill=#ff0}機{@fill=#fff}倒{@fill=#ff0}把{@fill=#fff}！」',
                            '<32>* 「另外，為了最大限度地吸引別人，\n   可以用它的機動性做一些\n   有創意的事情！」',
                            '<32>* 「譬如，呃... 獨輪車那種？」\n* 「反正就，類似那樣的。」',
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （這個書架上\n  的書的內容互不相關。）']
                        : [
                            "<32>{#p/basic}* 這是個書架。",
                            '<32>{#p/human}* （你取下了一本書...）',
                            '<32>* 「不幸的是，\n   怪物不能很好地應對疾病。」',
                            '<32>* 「當怪物的死亡迫在眉睫時，\n   他們就臥倒，再不動彈。」',
                            '<32>* 「我們把這種狀態稱之為\n   『隕落』。」',
                            '<32>* 「在戰爭期間，\n   這種令人困惑的情況\n   再熟悉不過了...」',
                            '<32>* 「可悲的是，在那個時代，\n   死亡是不可避免的。」',
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ]
            ),
            paperbook: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （書上詳細描述了一部幻想故事，\n  主角是一個勇敢的冒險家。）']
                    : [
                        '<32>{#p/human}* （你把書拿了起來...）',
                        '<32>{#p/basic}* 「《喵喵航天行：夢境奇旅》」\n  「（同人故事）」',
                        '<32>* 「...就在那時，\n   喵喵終於親眼看到了。」',
                        '<32>* 「那是相當壯觀的景色。\n   孤身一人站在太空深處，\n   頗有遺世獨立之感...」',
                        '<32>* 「...但是喵喵心裡可明白得很！」\n  「她很快發現了我們的困境。」',
                        '<32>* 「稍微施展一下\n   那廣為人知的華麗麗光線，\n   她便擊穿了力場！」',
                        '<32>* 「這就是喵喵拯救怪物一族的故事。」',
                        '<32>{#p/human}* （你把書放回了桌子上。）'
                    ],
            a_lab_books2: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （書架上放著一系列筆記。）']
                        : [
                            "<32>{#p/basic}* 這是個書架。",
                            '<32>{#p/human}* （你取下了一本書...）',
                            '<32>{#p/basic}* 「教授的筆記，第76頁。」',
                            '<32>* 「核心現在已經上線，\n   前哨站的建設計畫\n   已在進行中。」',
                            '<32>* 「我不知道該如何看待\n   這種發展...」',
                            '<32>* 「不過，能讓我們\n   在外面的生活更舒適一點\n   是件好事...」',
                            '<32>* 「就這樣安頓下來的話，我們是不是\n   相當於在承認，沒有人類的靈魂\n   我們就無法逃脫？」',
                            '<32>* 「自從我被任命為皇家科學員，\n   我就下定決心要解放我們大家。」',
                            '<32>* 「現在，恐怕其他怪物\n   已經安於等待了...」',
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （書架上放著一系列筆記。）']
                        : [
                            "<32>{#p/basic}* 這是個書架。",
                            '<32>{#p/human}* （你取下了一本書...）',
                            '<32>{#p/basic}* 「教授的筆記，第195頁。」',
                            '<32>* 「今天是怪物一族\n   無比黑暗的一天，\n   王室分崩離析了。」',
                            '<32>* 「Toriel王后\n   放棄了王位。\n   僅僅因為Asgore的幾句話。」',
                            '<32>* 「但那些話\n   估計要對我們\n   產生長期的影響了...」',
                            '<32>* 「現在，\n   大家都希望\n   他主動奪取人類的靈魂。」',
                            '<32>* 「這簡直是一場災難。」',
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （書架上放著一系列筆記。）']
                        : [
                            "<32>{#p/basic}* 這是個書架。",
                            '<32>{#p/human}* （你取下了一本書...）',
                            '<32>{#p/basic}* 「教授的筆記，第310頁。」',
                            '<32>* 「嗯...\n   果然如我所料，\n   他同意了這個計畫。」',
                            '<32>* 「真是天賜良機。」\n* 「$(name)死後，一個新的人類\n   抵達了前哨站。」',
                            "<32>* 「我們還不知道\n   它能不能容納人類，\n   結果馬上揭曉...」",
                            '<32>* 「祈禱吧。」',
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ]
            ),
            cream_machine: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你想知道\n  這臺冰激淋機生產的\n  是什麼冰激淋。）']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* 這個構造十分複雜的冰激淋機\n  再也不會被使用了。"]
                        : ["<32>{#p/basic}* 一臺構造十分複雜的冰淇淋機。\n* 好像複雜過頭了。"],
            cream_bucket: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* （你把手伸進冰激淋桶裡。）\n* （好冰。）",
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/15}* 呃，別把那東西\n  弄我身上就行。",
                                "<25>{#p/asriel1}{#f/15}* 我必須像狗一樣\n  抖動身體才能弄下來。"
                            ],
                            ['<25>{#p/asriel1}{#f/8}* ...', "<26>{#p/asriel1}{#f/31}* ...別想。"],
                            ['<25>{#p/asriel1}{#f/31}* ...']
                        ][Math.min(asrielinter.cream_bucket++, 2)]
                    ]
                    : ['<32>{#p/basic}* 一桶冰淇淋。'],
            mewposter: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你的目光緊盯著\n  這張動漫海報的動態部分。）"]
                    : SAVE.data.n.state_aerialis_basekill > 29
                        ? ['<32>{#p/basic}* 一張小眾科幻動漫系列的\n  大海報。']
                        : SAVE.data.n.state_aerialis_basekill > 14
                            ? ['<32>{#p/basic}* 一張科幻動漫系列的\n  大海報。']
                            : ['<32>{#p/basic}* 一張人氣科幻動漫系列的\n  大海報。'],
            dogfood: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你焦慮地盯著那袋狗糧。）',
                        ...[
                            ["<25>{#p/asriel1}{#f/24}* Frisk，\n  我知道你在想啥。\n* 這不值得。"],
                            ["<25>{#p/asriel1}{#f/24}* 這玩意一點\n  都不好吃，Frisk。\n* 別那麼做。"],
                            [
                                '<25>{#p/asriel1}{#f/15}* 聽著。',
                                "<25>* 我告訴你這些是因為\n  我... 是你的朋友。",
                                "<25>* ...說起來很奇怪，\n  我好像已經習慣了。"
                            ],
                            ['<25>{#p/asriel1}{#f/16}* 你沒更好的事要做嗎？']
                        ][Math.min(asrielinter.dogfood++, 3)]
                    ]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* 一袋半空的狗糧。"]
                        : ["<32>{#p/basic}* 一袋半滿的狗糧。"],
            virtsign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （該標誌描繪了\n  一隻虛擬空間中的蜥蜴。）']
                    : ["<32>{#p/basic}* 一個虛擬空間人物標誌。"],
            starlingtable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下腳步看了看這些花。）']
                    : ['<32>{#p/basic}* 星花。'],
            starling: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下腳步看了看這些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 一叢星花。'],
            starling2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下腳步看了看這些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 三小簇星花。'],
            starling3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下腳步看了看這些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 一大叢星花。'],
            starling5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下腳步看了看這些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 星花。']
                        : ['<32>{#p/basic}* 一對星花。\n* 還挺可愛...？'],
            dttubes: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/3}* 這個玩意？\n* 哈... 我不想回憶。"], ['<25>{#p/asriel1}{#f/4}* ...']][
                    Math.min(asrielinter.dttubes++, 1)
                    ]
                    : [
                        '<32>{#p/basic}* 一排試管，裡面盛放著不明物質。',
                        ...(world.genocide
                            ? world.goatbro &&
                                (SAVE.flag.n.genocide_milestone < 5
                                    ? SAVE.flag.n.ga_asrielLab3++
                                    : SAVE.flag.n.genocide_milestone < 6
                                        ? SAVE.flag.n.ga_asrielLab4++
                                        : SAVE.flag.n.ga_asrielLab5++) < 1
                                ? SAVE.flag.n.genocide_milestone < 5
                                    ? [
                                        '<25>{#p/asriel2}{#f/10}* 她給我用的那支注射器\n  跑哪去了...',
                                        '<26>{#f/4}* 搞不好給弄丟了，哈哈。'
                                    ]
                                    : SAVE.flag.n.genocide_milestone < 6
                                        ? [
                                            '<25>{#p/asriel2}{#f/15}* 那支注射器...',
                                            '<25>{#f/10}* 她是不是給自己用了那個，\n  才變得那麼強？'
                                        ]
                                        : [
                                            '<25>{#p/asriel2}{#f/2}* 她還真以為\n  那破玩意能幫上她...',
                                            '<25>{#f/1}* 真是個大蠢貨。'
                                        ]
                                : []
                            : ['<32>{#p/basic}* 還有一個用過的注射器，\n  裡面有著少許相同的物質。'])
                    ],
            papertable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （工作桌上的圖紙描述了\n  某種形式的能量轉化過程。）']
                    : ["<32>{#p/basic}* 一張工作桌，\n  上面的圖紙不倫不類。"],
            vender1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你注視著儲物箱\n  玻璃後面的神秘物質。）']
                    : ['<32>{#p/basic}* 一個真空儲物箱。\n* 裡面放著各種不明物質的\n  試劑瓶。'],
            vender2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你注視著儲物箱\n  玻璃後面的神秘物質。）']
                    : ['<32>{#p/basic}* 一個真空儲物箱。\n* 裡面放著各種不明物質的\n  試劑瓶。'],
            toolrack: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/27}* 據我所知，\n  這些工具根本沒被用過。',
                            "<25>* 實際上，\n  我認為這些工具唯一的\n  用途就是掛在牆上。"
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* 有了魔法，\n  誰還用工具呢？",
                            '<25>{#f/17}* 就像，那個在\n  核心工作的小老鼠？\n* 好像叫Charles？',
                            '<25>{#f/15}* 那隻小老鼠擁有一種\n  名為心靈控制的能力。',
                            "<25>{#f/16}* 別問我咋知道的。"
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* 呃，這麼說吧...',
                            '<25>{#f/16}* 過去瞎搞時，\n  我一直努力避免這種情況。',
                            '<25>{#f/15}* 即使是「重置」的力量，\n  也不能完全地...\n  隨心所欲。'
                        ],
                        ["<25>{#p/asriel1}{#f/16}* ...此問題結束。"]
                    ][Math.min(asrielinter.toolrack++, 3)]
                    : [
                        "<32>{#p/basic}* 架子上掛著一些老工具，\n  看上去，都吃灰好幾年了。",
                        ...(SAVE.data.n.plot === 72 ? ['<33>* ...現在更是沒人用得著了。'] : [])
                    ],
            spycamera1: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* 停機了。"]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* （顯示器已經離線了。）']
                        : SAVE.data.n.plot === 72 && !world.runaway
                            ? ['<32>{#p/basic}* 終於有隱私了。']
                            : [
                                '<32>{#p/basic}* 這個監視器經校準後，\n  可以實時跟蹤你的動作。',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielLab1++ < 1
                                    ? ["<25>{#p/asriel2}{#f/5}* 真好奇Alphys監視我們時\n  臉上掛著什麼表情..."]
                                    : [])
                            ],
            gameshow_terminal1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在幽默的操作臺上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一個遊戲節目操作臺。']
                        : SAVE.data.b.a_state_moneyfish
                            ? ['<32>{#p/basic}* 一個遊戲節目操作臺。\n* 這就是精彩比賽的一手見證。']
                            : ['<32>{#p/basic}* 一個遊戲節目操作臺。\n* 糟糕雙關笑話的一手見證。'],
            gameshow_terminal2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在同情的操作臺上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一個遊戲節目操作臺。']
                        : ['<32>{#p/basic}* 一個遊戲節目操作臺。\n* 看上去是專門給幽靈準備的。'],
            gameshow_terminal3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在熟悉的操作臺上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一個遊戲節目操作臺。']
                        : ["<33>{#p/basic}* 一個遊戲節目操作臺。\n* 為你量身定做的。"],
            gameshow_terminal4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你把手放在友好的操作臺上。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一個遊戲節目操作臺。']
                        : SAVE.data.n.state_foundry_muffet === 1
                            ? ['<32>{#p/basic}* 一個遊戲節目操作臺。\n* 有一股... 山寨品的味道。']
                            : ['<32>{#p/basic}* 一個遊戲節目操作臺。\n* 有了這樣的操作臺，\n  誰還用手臂呢？'],
            a_path2_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （牌子制定了\n  升降機可搭乘的\n  怪物數量的限制。）']
                    : [
                        '<32>{#p/basic}* 「請務必小心，升降機一次\n   最多只能搭乘兩個怪物。」',
                        ...(world.genocide && SAVE.flag.n.ga_asrielSkySign1++ < 1
                            ? ['<25>{#p/asriel2}{#f/1}* 正好夠用。']
                            : [])
                    ],
            a_path4_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （牌子告知了人們\n  回收機構關閉了。）']
                    : SAVE.data.n.plot === 72
                        ? ['<#32>{#p/basic}* 「抱歉，\n  回收機構永遠關門了！」\n  - Bratty和Catty']
                        : ['<#32>{#p/basic}* 「將你的廢棄用品放在這兒吧，\n   我們會想辦法把它賣掉的！」\n  - Bratty和Catty'],
            a_puzzle1_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （牌子上的內容被劃掉了。）"]
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/basic}* 「警告：前方或有節目正在拍攝。」']
                        : ['<32>{#p/basic}* 「更新：節目停播。」'],
            labcounter: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你將手從操作臺上滑過。）\n* （很光滑。）"]
                    : [
                        world.darker
                            ? "<32>{#p/basic}* 一個普通操作臺。"
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* 啊，簡陋的工作檯。\n* 沒有比這更好的地方來\n  慶祝你的勝利了！"
                                : "<32>{#p/basic}* 啊，簡陋的工作檯。\n* 沒有比這更好的地方\n  來練習你的工藝美術了！",
                        ...(mtt ? ["<32>{#p/mettaton}* 把材料放那裡去。"] : [])
                    ],
            chesstable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （這個棋盤上啥也沒有。）']
                    : world.darker
                        ? ["<32>{#p/basic}* 一張棋盤。"]
                        : SAVE.data.n.plot < 65 || SAVE.data.b.ubershortcut || world.genocide
                            ? ["<32>{#p/basic}* 一張棋盤。\n* 上面沒有棋子。"]
                            : ["<32>{#p/basic}* 這是個棋盤。\n* 輪到黑棋了，\n  但看起來是回天無術了。"],
            roomtable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （這本指導手冊詳細地\n  解釋了「跨時空旅行」的本質。）']
                    : [
                        "<32>{#p/basic}* 一本關於「跨時空旅行」的指導手冊。",
                        '<32>* 你翻到書籤夾著的那一頁...',
                        '<32>* 「...也就是說：在特定參考系下，\n   你所處房間的三維空間坐標\n   不隨時間變化...」',
                        '<32>* 「...但在四維時空坐標系下，\n   這一實體的坐標將動態變化。」',
                        '<32>* 「我們一般將這種現象\n   稱為『時間位移』。」',
                        '<32>* 「時間位移是一個複雜的過程，\n   涉及引力場的能量密度\n   及空間曲率的重新分布...」',
                        '<33>* ...\n* 謝天謝地，這頁到頭了。'
                    ],
            flowertable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你停下來看了看這些花。）']
                    : world.darker
                        ? ['<32>{#p/basic}* 一盆星花。']
                        : ['<32>{#p/basic}* 快看，是一盆孤獨的星花。'],
            coredoor: ["<32>{#p/basic}* 鎖住了。"],
            deadbot: ["<32>{#p/basic}* 就是個空殼。"],
            deadbot2: ["<32>{#p/basic}* 沒電了。"],
            corenote1: [
                '<32>{#p/basic}* 一盒錄音帶，標著「Toriel」。',
                '<32>{#p/human}* （你聽了聽內容...）',
                '<32>{#p/alphys}* Asgore總跟我提起你。',
                '<32>* 他說，你做得一手好派，\n  講故事也是一把好手。',
'<32>* 他說，你風趣幽默，\n  總能用笑話逗他發笑。',
                '<32>* 他還說，你心地善良，\n  會把滿滿的愛送給\n  每一位受困的人類。',
                '<32>* 儘管與Asgore存在誤會，\n  但你仍努力成為溫暖的光芒。',
                "<32>* 因為我，\n  你再也無法用光芒照亮世界。"
            ],
            corenote2: [
                '<32>{#p/basic}* 一盒錄音帶，標著「Sans」。',
                '<32>{#p/human}* （你聽了聽內容...）',
                "<32>{#p/alphys}* 曾經，我們一起工作，\n  完成一個個專案...",
                '<32>* 曾經，我們聯手\n  一起捉弄Papyrus...',
                '<32>* 曾經，我們還\n  跟Bratty和Catty一起\n  來了場「垃圾大冒險」。',
'<32>* 那些珍貴的回憶，\n  我至死都不會忘。',
                '<32>* 我們雖做不到形影不離。\n* 但關鍵時刻，你從未缺席。',
                "<32>* 因為我，\n  你再也不能繼續出力。"
            ],
            corenote3: [
                '<32>{#p/basic}* 一盒錄音帶，標著「Papyrus」。',
                '<32>{#p/human}* （你聽了聽內容...）',
                "<32>{#p/alphys}* 我最自豪的事情之一，\n  就是我能和你一樣，\n  喜歡謎題，熱愛謎題。",
                '<32>* 小時候，你總是鼓勵我，\n  不要畏懼，勇敢嘗試...',
                '<32>* 你的鼓勵，\n  讓這世界多了一位科學家。',
                '<32>* 至今，我仍沒有勇氣直面一切。',
'<32>* 但我知道，你一直堅守本心，\n  做最棒的自己。\n* 直到最後一刻。',
                "<32>* 因為我，\n  你永遠無法成為\n  「最偉大的Papyrus」了。"
            ],
            corenote4: [
                '<32>{#p/basic}* 一盒錄音帶，標著「Undyne」。',
                '<32>{#p/human}* （你聽了聽內容...）',
                '<32>{#p/alphys}* Undyne...\n* 每當我孤獨，每當我難過，\n  你總會出現在我的身邊，加油打氣。',
                '<32>* 儘管我們偶爾會意見不和，\n  鬧點小脾氣。\n* 但彼此的情誼堅不可摧。',
                '<32>* 我夢想著，\n  如果有朝一日，我們一起逃出去，\n  一定要做好多好多事！',
                "<32>* 我們一起上九天攬月，\n  一起在太空自由翱翔。\n* 沒有拘束，只有歡樂。",
                "<32>* 因為我，\n  你再也無法和我一同探索\n  星辰大海。"
            ],
            corenote5: [
                '<32>{#p/basic}* 一盒錄音帶，標著「Mettaton」。',
                '<32>{#p/human}* （你聽了聽內容...）',
                "<32>{#p/alphys}* 一開始，我們相處得不太愉快。\n* 但如果沒有你，\n  我就走不到今天這一步。",
                "<32>* Mettaton，如果你在聽...\n  我想對你說，你很棒。",
                "<32>* 整個前哨站，我只為你一人\n  做過新的身體。",
                "<32>* 其實... 我也考慮過\n  給Napstablook做個身體。\n* 但是，Napstablook不適合派去戰鬥。",
                '<32>* 總之，\n  加油，Mettaton。'
            ],
            corenote6: () => [
                '<32>{#p/basic}* 一盒錄音帶，標著「Asgore」。',
                '<32>{#p/human}* （你聽了聽內容...）',
                "<32>{#p/alphys}* 我知道，自己並不擅長\n  這份工作...",
                '<32>* 但有你的支援，讓我覺得\n  自己的努力有了意義。',
                '<32>* 整個前哨站的大家\n  都支援著我們...',
                '<32>* 所以，即便實驗風險再大，\n  我也暗下決心：\n  一定要讓大家逃出去。',
                "<32>* 最終... 我們成功了。\n* 您終於不用在這個破前哨站\n  苦苦等待人類到來。",
                '<32>* 但我就顧著高興，\n  居然沒預感到\n  實驗會出岔子...',
                '<32>* 居然沒注意到\n  塵埃落到了那朵星花上...',
                '<32>* 要是我早點發現，\n  果斷把那朵星花隔離起來...\n  就不會出事。',
                "<32>* 但我沒有在意。",
                '<32>* 因為我，因為我的自負，\n  那孩子走上了不歸路。',
                "<32>* 許多朋友也因我而死...",
                '<32>* 我在實驗室眼睜睜地\n  看著他們一個接一個死去，\n  自己卻只是袖手旁觀。',
                "<32>* Mettaton說，\n  會盡全力阻止他們。",
                "<32>* 但他要是失敗了...\n* 下一個遭殃的就是你。",
                "<32>* 我不知道，\n  當又一個摯友死在我面前時，\n  我該如何應對。",
                "<32>* 我不知道，在你身處危險時\n  我要是再一次選擇袖手旁觀，\n  又該怎麼面對自己。",
                "<32>* 我只知道，你不會還手。\n  而他們會毫不留情地殺了你。",
                "<32>* 要是我再磨蹭下去...",
                '<32>* ...',
                '<32>{#p/human}* （你聽到放下錄音機，\n  衝向電梯的聲音。）',
                ...(SAVE.flag.n.genocide_milestone < 5
                    ? SAVE.flag.n.ga_asrielCorenote++ < 1
                        ? [
                            '<25>{#p/asriel2}{#f/3}* Alphys又逃跑了，我理解。',
                            '<25>{#p/asriel2}{#f/4}* 畢竟她就是個窩囊廢。'
                        ]
                        : []
                    : SAVE.flag.n.ga_asrielAlphysCom4++ < 1
                        ? ['<25>{#p/asriel2}{#f/8}* 之前怎麼就沒想到\n  她是準備應戰去了...']
                        : [])
            ],
            coresign1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （該標誌描述了\n  禁止任何未經授權的人\n  進入該區域。）',
                        '<25>{#p/asriel1}{#f/4}* 由於某種\n  顯而易見的原因，\n  你可以忽略這條警告。'
                    ]
                    : ['<32>{#p/basic}* 「未經授權，嚴禁闖入。」'],
            coresign2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （牌子上寫著：\n  核心擁有最長的\n  無事故事件記錄。）',
                        "<25>{#p/asriel1}{#f/3}* 要不是因為那次\n  建築機器人事件，\n  核心就完美無瑕了..."
                    ]
                    : ['<32>{#p/basic}* 「核心無事故最長紀錄：38690天。」'],
            coresign3: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （該標誌為\n  年度最佳員工表達了祝賀。）',
                        ...[
                            ['<25>{#p/asriel1}{#f/17}* 個子雖小，胸懷卻大...'],
                            [
                                '<25>{#p/asriel1}{#f/17}* 當我嘗試\n  善意對待每個人時...',
                                '<25>{#f/17}* 我讓它跟著我一起，\n  它直接就答應了。',
                                '<25>{#f/20}* 毫不猶豫。',
                                "<25>{#f/18}* 我簡直不敢相信！"
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* 儘管我與\n  像Charles那樣的，\n  一同做了這麼多...",
                                '<25>{#f/15}* 有些東西我卻再也\n  找不回來了。',
                                '<25>{#f/23}* ...那是一種純真的幸福。',
                                '<25>{#f/22}* 但也許和你一起...\n  我將失而復得。'
                            ],
                            ['<25>{#p/asriel1}{#f/13}* 我們將共享\n  那種幸福，Frisk。']
                        ][Math.min(asrielinter.coresign3++, 3)]
                    ]
                    : [
                        '<32>{#p/basic}* 「年度最佳員工：Charles」\n  「感謝您一直努力工作，辛勤奉獻。」'
                    ],
            coresign4: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （這塊匾是獻給某個人的。）',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/13}* 你可能會覺得很驚訝，\n  但是...',
                                '<26>{#f/27}* 我對他根本不怎麼了解。',
                                '<25>{#f/4}* 他在Alphys帶我回來\n  前就死了，所以...',
                                '<25>{#f/3}* 我對他唯一的記憶\n  是從我出生後開始的。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* 對...\n  怪物擁有無限的\n  記憶空間...',
                                "<25>{#f/17}* 但如果沒見證過，\n  我們怎能記住呢？",
                                '<25>{#f/20}* 很難繞過這種限制。'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* 我聽說他幾乎完美地\n  完成過蟲洞旅行...',
                                '<25>{#f/13}* 也許，如果技術\n  可以被壓縮...',
                                "<25>{#f/15}* ... 並植入怪物的大腦...",
                                '<25>{#f/16}* ... 你就能從\n  其他地方提取記憶。'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* 我一定是瘋了。']
                        ][Math.min(asrielinter.coresign4++, 3)]
                    ]
                    : ['<32>{#p/basic}* 「謹上  T.N.Roman教授」\n  「願您的足跡永存世間。」'],
            coresign5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （該標誌列出了各個方向的場所。）']
                    : ['<32>{#p/basic}* 「向左 - 四號舞臺」\n* 「向右 - 核心出口」'],
            pottedtable: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你覺得你之前見過這張桌子。）"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ["<32>{#p/basic}* 一張眼熟的桌子。\n* 看出來這桌子是從哪來的嗎？"]
                        : ['<32>{#p/basic}* 一張眼熟的桌子。'],
            potchair: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你覺得你之前見過這把椅子。）"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ['<32>{#p/basic}* 一把眼熟的椅子。\n* 他們可真會搞混搭。']
                        : ['<32>{#p/basic}* 一把眼熟的椅子。'],
            cardboard1: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你無法辨認出\n  箱子裡有什麼...）"]
                    : [
                        "<32>{#p/basic}* 一堆紙箱，幾乎全是空的。",
                        '<32>{#p/basic}* 棕箱子的箱底放著幾支試管。'
                    ],
            cardboard2: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你無法辨認出\n  箱子裡有什麼...）"]
                    : [
                        "<32>{#p/basic}* 一堆紙箱，幾乎全是空的。",
                        '<32>{#p/basic}* 高箱子裡放著一些奇怪的化學試劑。'
                    ],
            cardboard3: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* （你無法辨認出\n  箱子裡有什麼...）"]
                    : [
                        "<32>{#p/basic}* 一堆紙箱，幾乎全是空的。",
                        '<32>{#p/basic}* 小箱子裡裝著一些研究論文，\n  論文的字體很奇怪。'
                    ],
            labchem: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （這個裝置讓你感到很危險。）']
                    : [
                        world.darker
                            ? '<32>{#p/basic}* 傳送帶上有幾瓶化學試劑。'
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* 傳送帶上有幾瓶化學試劑。\n* 怪了，竟然沒出岔子。"
                                : '<32>{#p/basic}* 傳送帶上有幾瓶化學試劑。\n* 能出啥岔子呢？',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* 沒有什麼比MTT超安全級傳送帶\n  發出的平靜嗡嗡聲更好了！',
                                '<32>* 它不僅讓你不必再\n  多伸兩微米去拿東西...',
                                '<32>* 還能讓你在有燒杯從邊上掉下來，\n  猛烈地摔破時...',
                                '<32>* 免費得到一個意外的化學反應！'
                            ]
                            : [])
                    ],
            labglobe: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* 這是克裡烏斯...\n* 好吧，這只是一個\n  簡單的模型。',
                            "<25>{#f/17}* 我聽說它實際上比\n  從外太空看到的\n  更加豐富多彩。"
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* 有一次，\n  出於極度渴望的好奇心...',
                            '<25>{#f/17}* 我設法組織建設了\n  一個新的前哨區。',
                            '<26>{#f/20}* 說是組織...\n  其實更像... 強迫。',
                            '<25>{#f/13}* 是為了讓母星的...\n  一部分重現。'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* 雖然這並不怎麼完美...",
                            '<25>{#f/15}* 可能是出於被強迫的\n  原因，使得人們\n  並不願意認真建造。',
                            '<25>{#f/17}* 但我至少明白了，\n  舊世界為什麼會讓\n  人們交口稱譽。',
                            "<25>{#f/23}* 它是... 如此的美麗。\n* 可以稱得上為\n  心目中的世外桃源。"
                        ],
                        ["<25>{#p/asriel1}{#f/17}* 我永遠不會\n  忘記那天的重現。"]
                    ][Math.min(asrielinter.labglobe++, 3)]
                    : [
                        world.darker
                            ? "<32>{#p/basic}* 一個「地球儀」。"
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* 一個「地球儀」，\n  展現著怪物... 曾經的家園。"
                                : "<32>{#p/basic}* 一個「地球儀」，\n  展現著怪物偉大的故園。",
                        ...(mtt
                            ? [
                                "<32>{#p/mettaton}* 沒有必備的「地球儀」，\n  這裡就不能叫做科學實驗室。",
                                "<32>* 這裡大部分的東西\n  都是MTT牌的產品，\n  但這一件算是個例外。",
                                '<32>* 不過，既然ALPHYS為我製作了它，\n  況且【我】自己也出自她之手...',
                                "<32>* 就沒有理由懷疑它的質量！"
                            ]
                            : [])
                    ],
            labrando: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你試圖與這個裝置互動...\n  無事發生。）']
                    : [
                        world.darker
                            ? '<33>{#p/basic}* 意義不明的裝置。'
                            : SAVE.data.n.plot === 72
                                ? '<32>{#p/basic}* 令人失望的是，\n  過了這麼久這個裝置\n  還是沒啥作用。'
                                : '<32>{#p/basic}* 用途不明的裝置。',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* 啊，沒錯，這就是\n  永遠都好用的MTT牌\n  中子流偏振器。',
                                '<32>* 它好到可以至少用十次...',
                                '<32>* 每年十次！！！'
                            ]
                            : [])
                    ],
            labsink: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* （你讓幾乎透明的水\n  從你的指縫間流過。）']
                    : [
                        "<32>{#p/basic}* 一個水槽，通過複製器供水。",
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* 材料越複雜，\n  就需要越多時間來複製。',
                                '<32>* 畢竟，核心的供能是有限的。',
                                '<32>* 好在水是最簡單的物質之一！'
                            ]
                            : [])
                    ],
            labscope: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* （你將顯微鏡對準Asriel的臉...）",
                        '<32>* （透過鏡頭，\n  你看到了一排耀眼的\n  發光粒子。）',
                        ...[
                            ['<25>{#p/asriel1}{#f/17}* 怪物只由\n  魔法構成，Frisk。\n* 你知道的，對吧？'],
                            ['<25>{#p/asriel1}{#f/13}* 你現在可以\n  停止這樣做了。'],
                            ['<25>{#p/asriel1}{#f/15}* ...']
                        ][Math.min(asrielinter.labscope++, 2)]
                    ]
                    : [
                        '<32>{#p/basic}* 標準規格的精密電子顯微鏡，\n  皇家出品。\n* 261X年前後製成。',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* 這些先進的顯微鏡是\n  幾年前剛推出的。',
                                '<32>* 這是MTT牌產品與時俱進的又一個例子！'
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
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysShocked}* 啊，快停下！！',
                            "<25>{#g/alphysOhGodNo}* 你-你這樣會從垂直面\n  掉下去的...",
                            '<25>{#g/alphysSideSad}* 我得把你傳-傳回去。',
                            '<25>{#g/alphysThatSucks}* 抱歉...',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysShocked}* 啊，快停下！！',
                            "<25>{#g/alphysOhGodNo}* 你不-不能...\n  走-走這麼遠...",
                            "<26>{#g/alphysNeutralSweat}* 我該把你傳回去，不過...\n  我不在辦公桌。",
                            "<26>{#f/10}* 所以...\n  千萬別做傻事！",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ],
                () =>
                    SAVE.data.n.state_foundry_undyne !== 1
                        ? [
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            "<25>{#p/alphys}{#g/alphysSideSad}* 走這麼遠不安全...",
                            "<25>{#g/alphysNeutralSweat}* 我得把你傳回去。",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysShocked}* 你-你在幹啥！？',
                            "<26>{#f/3}* 你快到邊界了！",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ],
                () =>
                    SAVE.data.n.state_foundry_undyne !== 1
                        ? [
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysWTF}* ...',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysIDK2}* ...',
                            "<25>{#p/alphys}{#g/alphysIDK3}* ...看來我也說不動你。",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]
            ),
            puzzlestop1b: () =>
                [
                    ['<25>{#p/asriel2}{#f/13}* 呃... $(name)？', "<25>* 咱倆好像走過頭了。"],
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
                            "<32>{#p/basic}{#npc/a}* 喔...\n* 是你小子...",
                            "<32>* 咋的，你以為我就這麼輸了！？",
                            '<32>* 畢竟...\n* 哎，你也沒想錯。',
                            "<32>* 我不適合繼續當兵了..."
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 士兵，稍息！\n* 你的任務已經完成了，\n  接下來就好好休息吧！",
                            "<32>* ...欸，你不是那個\n  無禮的人類小鬼嘛，\n  之前還把我武器搶了。",
                            "<32>* 你可真有趣！\n* 這絕對不是我計畫解決\n  那場衝突的方式！",
                            '<32>* 你似乎總能另闢蹊徑，\n  創造有利局面。'
                        ],
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? ['<32>{#p/basic}{#npc/a}* 兵苗子可得... 離你遠點。']
                        : [
                            '<32>{#p/basic}{#npc/a}* 兵苗子可得學學你這種戰略！',
                            "<32>* 但現在...\n* 是時候向新家園進軍了，士兵！"
                        ],
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? ['<32>{#p/basic}{#npc/a}* ...']
                        : ['<32>{#p/basic}{#npc/a}* 你現在可能已經上路了。']
            ),
            a_dresslion: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Mettaton說我可以用公司資金\n  來製作一套自己的衣服...',
                            "<32>* 我從來沒這麼...！\n* 哈哈哈！"
                        ]
                        : SAVE.data.n.plot < 60
                            ? [
                                "<32>{#p/basic}{#npc/a}* 作為Mettaton的服裝設計師，\n  我的工作就是給他挑\n  合適的衣服。",
                                '<32>* 他今天要穿西裝打領帶，\n  還要為下一場演出準備裙子...',
                                '<32>* 我也說不清楚...\n* 但是他說穿裙子...',
                                '<32>* 聽起來真酷...'
                            ]
                            : SAVE.data.n.plot < 65
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 馬上就開始了！\n* 新服裝隨時都會亮相！",
                                    "<32>* 我等不及了..."
                                ]
                                : SAVE.data.n.plot < 68
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* 那簡直...\n* 簡直太美了...！',
                                        "<32>* 想知道我穿著裙子...\n* 是否也會很漂亮..."
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* 喔... 我的天...',
                                        '<32>* 有那麼一會，\n  我以為Mettaton要死了呢！',
                                        "<32>* 要是他死了，\n  我都不知道該怎麼辦..."
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<33>{#p/basic}{#npc/a}* 我也可以給你做一套！']
                        : SAVE.data.n.plot < 60
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我在考慮一些亮閃閃\n  又發金光的東西。\n* 肯定會讓他大放異彩的。"
                            ]
                            : SAVE.data.n.plot < 65
                                ? ["<32>{#p/basic}{#npc/a}* 那服裝和我想的那樣光澤鮮豔！"]
                                : SAVE.data.n.plot < 68
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* 不過，我得向他要那些\n  設計資金，祝我好運吧。"
                                    ]
                                    : ['<32>{#p/basic}{#npc/a}* 如果不順利的話，\n  我可能會消失在前哨站！']
            ),
            picnic_darkman1: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* 恰。\n* 我們是陰影人。\n* 我們侍奉召喚師。",
                    '<32>* Terrestria第一次召喚我\n  是在人怪戰爭...\n  多美好的時光，喲。',
                    "<32>* 但是那場戰爭已經結束了。\n* 你的也一樣。"
                ],
                [
                    '<32>{#p/basic}{#npc/a}* 我回想起我的召喚師\n  所參與的所有戰鬥。',
                    "<32>* 讓我告訴你我最喜歡的一個，\n  聽好。\n* 那時我們在一個海岸上。",
                    "<32>* 人類軍方想要將無人偵察機\n  設定在海平面以下，他們以為\n  這會是個好主意是吧？",
                    '<32>* 但我們知道了他們這個行動。\n* 所以我被召見，去做一些偵查，\n  回來告訴所有人。',
                    "<32>* 接下來就如你想的那樣，\n  我們衝了進去，\n  將他們全都解決掉了。",
                    "<32>* 雖然算不上什麼大事，\n  但這確實很棒。"
                ],
                [
                    "<32>{#p/basic}{#npc/a}* 哈，這是我的召喚師告訴我的，\n  我相信你也有你的故事。"
                ]
            ),
            picnic_darkman2: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* 那麼——...\n* 關於我們的事...',
                    "<32>* 我們並不是真的在這裡。\n* 我的意思是，我們是在這。\n* 但卻實際上卻並不在這裡。",
                    "<32>* 這很難解釋。"
                ],
                [
                    '<32>{#p/basic}{#npc/a}* 我的召喚師Cozmo曾經說過...',
                    "<32>* 我們就像他們人格的一部分，\n  可以脫離他們的身體。",
                    "<32>* 還有——...\n  有事需要做時\n  我們就會脫離出來。",
                    "<32>* 我出來是因為在出發前\n  看看前哨站會很酷。",
                    "<32>* 當你情緒很激動時，\n  你呃——...\n  什麼都不能做。"
                ],
                [
                    "<32>{#p/basic}{#npc/a}* 一般來說我們的形態顯現時，\n  通常都得工作...\n  所以——... 這樣挺好的。"
                ]
            ),
            eblocker: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* 我從Glyde的公司辭了職，\n  這下我才明白那工作有多爛 ;(",
                    "<32>{#p/basic}{#npc/a}* 我賣給你食品的價格太高了，\n  為此我很抱歉。 ;(\n* 這是我的責任。 ;(",
                    "<32>{#p/basic}{#npc/a}* 現在的話，如果可以，\n  我想一個人秀會肌肉 ;(",
                    "<32>{#p/basic}{#npc/a}* 不會太久的，放心 ;("
                ],
                ['<32>{#p/basic}{#npc/a}* 抱歉嚕，小娘娘腔 ;(\n* 我想自己待一會 ;(']
            ),
            a_bowtie: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我是一名藝術學生。\n* 但我考慮不再寫生。",
                            '<32>* 讚美無窮無盡，毫無意義...',
                            '<32>* 這對我有何幫助呢？'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我是一名藝術學生。\n* 為尋靈感我努力了漫長時光。",
                                '<32>* 直到現在，\n  在最近的一場悲劇後，\n  我才真正得到動力。',
                                '<32>* 從這樣的不幸中\n  受到鼓舞是正確的嗎？'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 我是一名藝術學生。\n* 在藝術上，據說你會\n  隨著時間的推移而逐漸進步。",
                                '<32>* 然而，我的藝術老師\n  認為我所做的一切\n  都是無與倫比的。',
                                '<32>* 我應該為此擔憂嗎？'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 以粘液之名，\n  我仍不知對此如何看待。"]
                        : ["<32>{#p/basic}{#npc/a}* 以粘液之名，\n  我不知對此如何看待。"]
            ),
            a_thisisnotabomb: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 準備好迎接我的\n  「炸裂」回歸了嗎？？？',
                                '<32>* 之前，你確實把大夥全嚇跑了，\n  不過幹完這事之後，\n  有一些怪物又回來了。',
                                "<32>* 我說這事，不是想責備那些\n  現在還躲著你的人...",
                                "<32>* 只是我想給你一個\n  浪子回頭的機會。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 不知道自己在原來的母星上\n  是什麼物種已經夠糟糕了...',
                                "<32>* 現在，在新的母星上，\n  又將會多出一堆\n  我叫不出來名的新物種。",
                                "<32>* 我也許不得不接受\n  我是個炸彈了... 永遠都是...",
                                '<32>* 真是應了那句話啊，\n  「傷筋『咚』骨，久久難愈」。\n* 情感這東西也是這樣啊。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 哇喔。\n* 真是一場炸裂的談話啊。',
                                '<32>* 那場壓軸演出真的\n  把我們全都震撼到了！',
                                '<32>* 不誇張的說。\n* 這使整個前哨站都震動了。'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 嗯哼這地方有一個炸彈，\n  是吧？？？',
                                "<32>* 噓，聽著孩子...\n* 告訴你一個秘密。",
                                "<32>* 我... 真的不是炸彈。",
                                "<32>* 嘿，別這麼磺裡磺張的。\n* 只是人們都愛叫我炸彈。",
                                "<32>* ...我已經接受了這一點。"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 得了吧，\n  咱為啥表現就像\n  跟引信被剪了一樣？',
                                '<32>* 一個小惡霸就能讓你跑路，\n  那你還不如原地爆炸呢！',
                                "<32>* 但只是我的想法罷了。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 我是說，\n  如果我能發現我是什麼植物...',
                                '<32>* ...這一塵封已久的真相...',
                                '<32>* ...就像拆開早已埋下的地雷。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 假如，我真是一個炸彈，\n  那我會很激動的。",
                                "<32>* 但我並不是，\n  所以... 並沒有。",
                                "<32>* 我對這事很惱火，真的。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 原本我應該像一個\n  稀有的母星植物。",
                                '<32>* 這是上個星期來找\n  Burgie聊天的老人家\n  隨口說的。',
                                "<32>* ...喔，我願付出一切\n  來了解真實的自己..."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* ...但還是不能責怪他們。"]
                            : ["<32>{#p/basic}{#npc/a}* ...不過在此之前，\n  最好還是接受炸彈這個事實吧。"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* ...你真該慶幸\n  我沒在你身邊爆炸。"]
                            : ["<32>{#p/basic}{#npc/a}* ...你就沒想過你是什麼嗎？"]
            ),
            a_blackfire: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 所以我們現在自由了？\n* 這個時代是多麼瘋狂啊。",
                            "<32>* 沒有了皇家實驗室，\n  我還得去其他地方找新工作...",
                            '<32>* ...或者，我們可以在新世界\n  建立一個新皇家實驗室。'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 通常，\n  我都在皇家實驗室內\n  做天文研究。',
                                '<32>* 我本來打算過了今天\n  就回去工作的...',
                                "<32>* 但是，看到Mettaton\n  身上發生的事情後，\n  我就沒那麼確定了。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 通常，\n  我都在皇家實驗室內\n  做天文研究。',
                                '<32>* 但早些時候，\n  Alphys告訴我們\n  可以休息一天。',
                                '<32>* 我想知道為什麼...'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 想像一下，\n  在有堅實地面的地方上\n  仰望星空有多好。"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 也許，在外面的某個地方，\n  他的心化作了一顆星星\n  存在於某個星座裡...'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 進行天文研究或許很有趣，\n  但有時用自己的眼睛仰望星空\n  也永遠不會有啥壞處。'
                            ]
            ),
            a_businessdude: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? [
                                '<32>{#p/basic}{#npc/a}* 對，有時我很好奇\n  像你這樣的人是\n  怎麼還敢活著的。',
                                "<32>* 就算你最後救了我們，\n  但我們如果都不敢離開家，\n  那還有什麼用呢？",
                                "<32>* 我不是在批評你，\n  但你確實看到了其中的諷刺，\n  對吧？"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 我們的虛擬空間計畫\n  從來都沒成功過，\n  但也許...',
                                "<32>* ...這是未來的一種預兆？",
                                "<32>* 畢竟，在新的世界，\n  並不需要離開地面。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 真是個悲劇，是吧？',
                                "<32>* ...其實也算件好事，\n  大部分人都不知道\n  你具體長啥樣。"
                            ]
                            : roomKills().a_elevator1 > 0
                                ? ["<32>{#p/basic}{#npc/a}* 聽著。\n* 快走。"]
                                : SAVE.data.n.plot < 58
                                    ? iFancyYourVilliany()
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* 所以，孩子，\n  你現在叫「$(moniker2)」，\n  是吧？',
                                            "<32>* ...還挺酷的。"
                                        ]
                                        : [
                                            [
                                                '<32>{#p/basic}{#npc/a}* 天吶，孩子，\n  你就沒理解到點子上，\n  對吧？',
                                                "<32>* ...真可悲。"
                                            ],
                                            [
                                                '<32>{#p/basic}{#npc/a}* 孩子，我有個問題要問你，\n  就一個問題。',
                                                '<32>* ...你試過嗎？'
                                            ],
                                            [
                                                "<32>{#p/basic}{#npc/a}* 嘿，別難過。\n* 你盡力了。",
                                                "<32>* ...但你沒能堅持到底\n  還是挺糟糕的。"
                                            ],
                                            [
                                                "<32>{#p/basic}{#npc/a}* 天吶，孩子，\n  還挺快的。",
                                                "<32>* 這是一個時代的終結！"
                                            ],
                                            [
                                                '<32>{#p/basic}{#npc/a}* 對於一個沒實際練習過的人來說，\n  你已經做得很好了。',
                                                "<32>* ...這大概就是新手運吧？"
                                            ]
                                        ][SAVE.data.n.state_aerialis_crafterresult]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 我告訴你，\n  在實驗室工作是一種享受。",
                                        '<32>* 你進入到過虛擬空間嗎？',
                                        "<32>* 一個極佳的地方。\n* 雖然他們說\n  你不能越過邊界。"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? ["<32>{#p/basic}{#npc/a}* 為什麼你不去欺負別人呢？"]
                            : [
                                '<32>{#p/basic}{#npc/a}* 我只希望我們的關注量\n  能超越那個古怪的\n  骷髏小子。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* 不然，\n  你現在就有大麻煩了。"]
                            : roomKills().a_elevator1 > 0
                                ? ["<32>{#p/basic}{#npc/a}* 或者不會。\n* 總之別逼我再說一遍，\n  知道了嗎？"]
                                : SAVE.data.n.plot < 58
                                    ? iFancyYourVilliany()
                                        ? ["<32>{#p/basic}{#npc/a}* 我年輕時\n  可沒什麼外號之類的。"]
                                        : [
                                            ["<32>{#p/basic}{#npc/a}* 你能出現在這真是個奇蹟。"],
                                            ["<32>{#p/basic}{#npc/a}* 看起來你不是。"],
                                            ['<32>{#p/basic}{#npc/a}* 下一期你可能\n  還會有機會的。'],
                                            ['<32>{#p/basic}{#npc/a}* 也許下次你可以，\n  我不到...\n  贏得更輕鬆？'],
                                            ['<32>{#p/basic}{#npc/a}* 要麼就單純是MTT節目組他們\n  對你手下留情了。']
                                        ][SAVE.data.n.state_aerialis_crafterresult]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* 對，你沒聽錯。\n* 越過邊界。',
                                        '<32>* 這到底啥意思？'
                                    ]
            ),
            a_greenfire: pager.create(
                0,
                () =>
                    SAVE.data.n.plot < 56
                        ? [
                            "<32>{#p/basic}* 不用擔心我，\n  今天上學很順利。",
                            "<32>* 我真的很期待MTT的\n  下一個節目！",
                            "<32>{#p/basic}* 你知道什麼時候上映嗎？"
                        ]
                        : SAVE.data.n.plot < 68
                            ? [
                                '<32>{#p/basic}* 那個節目太精彩了！\n* 那個人類看起來跟真的一樣！',
                                '<32>* 等等，我好像見過你？'
                            ]
                            : world.bad_robot
                                ? ["<32>{#p/basic}* 哎呀，真讓人失望。\n* 他就這樣取消了\n  那場大型演出..."]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        '<32>{#p/basic}* 你不會...\n* 你不會真殺掉了Mettaton？',
                                        "<32>{#p/basic}* 不... 騙人的吧。\n* Mettaton的死亡\n  一定是節目效果！"
                                    ]
                                    : [
                                        '<32>{#p/basic}* 所以，人類是真的...\n* Mettaton一定是個交際花！',
                                        '<32>{#p/basic}* 順便說一下，\n  你的表演很棒。'
                                    ],
                () =>
                    SAVE.data.n.plot < 56
                        ? ['<32>{#p/basic}* Mettaton通常都有時間安排的，\n  但這次他搞忘了。']
                        : SAVE.data.n.plot < 68
                            ? ['<32>{#p/basic}* 感覺你很像Mettaton\n  帶進來的演員...']
                            : world.bad_robot
                                ? ['<32>{#p/basic}* 好吧，\n  下次再說吧。']
                                : SAVE.data.b.killed_mettaton
                                    ? ["<32>{#p/basic}* 真不敢相信\n  我差點就被騙了！"]
                                    : ["<32>{#p/basic}* 真不敢相信\n  我之前沒注意到\n  你是個人類！"]
            ),
            a_harpy: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            "<32>{#p/basic}* 本臺記者為您報導！\n* 今天的主題我實在是不想報導！",
                            "<32>{#p/basic}* 我快瘋掉了！！\n* 笑鼠了！"
                        ]
                        : roomKills().a_sans > 0
                            ? [
                                "<32>{#p/basic}* 本臺記者為您報導！\n* 今天的主題是死亡與毀滅！",
                                "<32>{#p/basic}* 你們知道有個傢伙在我面前\n  被殺掉了嗎？？\n* 笑鼠了！"
                            ]
                            : !world.badder_lizard
                                ? [
                                    "<32>{#p/basic}* 本臺記者為您報導！\n* 今天的主題是金屬與魔法！",
                                    "<32>{#p/basic}* 大家知道Mettaton就是由\n  這兩樣東西組成的嗎？\n* 笑鼠了！"
                                ]
                                : [
                                    "<32>{#p/basic}* 本臺記者為您報導！\n* 今天的主題是死亡與毀滅！",
                                    "<32>{#p/basic}* 你們知道我會在\n  短時間內去世嗎？？\n* 笑鼠了！"
                                ],
                ['<32>{#p/basic}* 天啊！\n* 我真的好喜歡自己的工作！']
            ),
            a_madguy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* 你在跟誰說話，我嗎？\n* 那個被疏散的？",
                                '<32>* 才怪。\n* 我是被迫跟他們走的，\n  只是因為他們說我必須走。',
                                '<32>* 我知道你是個小惡霸\n  或什麼之類的...',
                                "<32>* ...但這並不代表你會殺了我。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 這裡的每個人\n  都被邀請參加\n  那個派對了。",
                                "<32>* 但我不去。\n* 我不感興趣。",
                                "<32>* 當然，我很高興你\n  救了我們所有人...",
                                "<32>* ...但不意味著我必須\n  去往那裡，沉迷於情歌植物。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 可憐的，可憐的Mettaton，\n  不管你做了什麼。',
                                '<32>* ...',
                                "<32>* 喔，對了。\n* 沒事。"
                            ]
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 這一次，\n  Mettaton做了一件正確的事，\n  取消了一場演出。',
                                    "<32>* 他的那場壓軸演出\n  可不會圓滿結束。",
                                    '<32>* 你問我為什麼？\n* 直覺而已。'
                                ]
                                : SAVE.data.n.bad_lizard < 2
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* 我是這裡原來的噴泉的\n  其中一個建築師。',
                                        "<32>* 你懂的。\n* 那是在Mettaton決定把整個噴泉\n  全重建之前的事了。",
                                        "<32>* 我真想問問，誰會這麼做啊？\n  就為了改動一個微乎其微的細節，\n  把整個東西全給重建了？",
                                        '<32>* 要我說，實在是有點小家子氣。'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 真不敢相信\n  在一個殺手逍遙法外時，\n  Mettaton竟還在製作節目。",
                                        '<32>* 他不知道這有多危險嗎？',
                                        "<32>* 某人會因對此不屑一顧\n  而付出代價的。",
                                        '<32>* 要我說，\n  他這樣真的太蠢了。'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 大家，\n  這樣做，\n  認真的？',
                                "<32>* 我可不會像他們一樣跑掉。",
                                "<32>* 畢竟。\n* 我可沒那麼膽小。",
                                '<32>* ...呃，我認真的。'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 你要知道。\n* 我不喜歡派對。",
                                '<32>* 我的主要興趣愛好包括...',
                                '<32>* ...指出並批評\n  拙劣的仿製品。',
                                '<32>* 就像這個噴泉。'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 在我看來，\n  這都是他的錯。",
                                '<32>* 他過於剛愎自用，以卵擊石，\n  最終為此付出了生命。',
                                "<32>* 真是可惜，我想哭泣，\n  不是你爹我真有福氣。"
                            ]
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 他離我們越遠越好。',
                                    "<32>* 我本想叫他再也不要出現，\n  但是...",
                                    "<32>* ...現在我沒什麼好心煩的了。"
                                ]
                                : SAVE.data.n.bad_lizard < 2
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* 我得跟你說。\n* 我不是唯一一個。",
                                        '<32>* 你聽說過「Sepluv先生」嗎？',
                                        '<32>* 沒錯，他本來負責這裡\n  最初的建築專案。',
                                        '<32>* 可現在呢... 他為了謀生，\n  去賣月巖了。'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 說真的。\n* 我也要站出來。",
                                        "<32>* 所以我也感到慚愧。"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* 挺尷尬的，對吧？"]
                            : ["<32>{#p/basic}{#npc/a}* 毫無意義，不是嗎？"]
                        : ["<32>{#p/basic}{#npc/a}* 很諷刺，是吧？"]
            ),
            a_proskater: pager.create(
                0,
                () =>
                    SAVE.data.n.plot < 60
                        ? [
                            "<32>{#p/basic}{#npc/a}* 可算從學校裡溜出來了，\n  搞不懂了，我去那找罪受幹嘛...",
                            "<32>* 對了，聽說Mettaton要給下期節目\n  來點帶勁的。",
                            "<32>* 我等不及了啊，老兄..."
                        ]
                        : SAVE.data.n.plot < 68
                            ? [
                                '<32>{#p/basic}{#npc/a}* 老兄，這期節目是挺帶勁的...',
                                '<32>* 但也挺奇怪...',
                                '<32>* 就是，那些獎品看著和垃圾差不多，\n  更別說最終大獎了...',
                                '<32>* ...那什麼鬼東西啊！'
                            ]
                            : world.bad_robot
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 完了完了...\n* 好端端的，Mettaton\n  咋就把節目取消了呢。",
                                    '<32>* ...這下我上哪找藉口翹課啊，老兄？'
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* 老兄，Mettaton死了。\n* 挺難過的...",
                                        "<32>* 這下來悼念他，我還能翹會課，\n  但這事過去後，我就完了啊！"
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 老兄，Mettaton還在這，真好。",
                                        "<32>* 要不是他，\n  我哪來這麼多藉口翹課。"
                                    ],
                () =>
                    SAVE.data.n.plot < 60
                        ? ['<32>{#p/basic}{#npc/a}* 也不知道他這次\n  能不能找點有意思的選手...']
                        : SAVE.data.n.plot < 68
                            ? ["<32>{#p/basic}{#npc/a}* 你也不想抱著一個\n  等身科幻番玩偶回家吧。"]
                            : world.bad_robot
                                ? ["<32>{#p/basic}{#npc/a}* 我也太不走運了吧。"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* Mettaton，你欠考慮了啊...\n  欠考慮了啊...']
                                    : ["<32>{#p/basic}{#npc/a}* 說起來，我現在就在翹課呢..."]
            ),
            a_clamguy: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* 有人說，如果你在這些\n  反反覆覆的房間裡走得太遠，\n  就會發生一些怪事。',
                    '<32>* 時間隧道...\n* 恆定空間扭曲...',
                    "<32>* 呃，別問我是什麼意思，\n  我就是偶然聽到過Alphys\n  這麼說過一次。",
                    "<32>* 要不是她親口說過，\n  我都會覺得這都是胡編亂造的..."
                ],
                ["<32>{#p/basic}{#npc/a}* 只要你還能看清東西，\n  你就還是安全的。"]
            ),
            a_pyrope: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* 你以前是個惡霸，\n  但你可能已經改過自新了...",
                                '<32>* 我們回來只是想問，\n  你真的做回你自己了嗎？',
                                '<33>* 並不是所有人都會喜歡你，\n  有些人仍然對你感到害怕...',
                                "<32>* 但我想這很正常，\n  畢竟那時你的血液可是\n  流淌著暴力。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 等咱來到新家前沿，\n  直面一切毫不遮掩。",
                                "<32>* 最猛韻腳最美詩篇，\n  對手服輸站到一邊。",
                                "<33>* 主動挑戰丟人現眼？\n  我們只有兩句真言...",
                                '<32>* 這是我的世界，\n  你們休想改變。'
                            ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Vulkin和我組了個說唱組合\n  叫「熱火朝天」。',
                            '<32>* 唱一首天籟你最帥。\n* 來一段搖擺一起嗨。',
                            "<33>* 聽我妙語連炸就等我登上舞臺，\n  瞧觀眾被我絕殺看你作何抵賴。",
                            "<32>* 至於Vulkin？\n* 人家出招完爆求饒拉倒\n  讓你氣惱承認自己的失敗。"
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* 不用擔心。", '<32>* 我們可以原諒\n  你的野蠻行徑。']
                            : ["<32>{#p/basic}{#npc/a}* 不用擔心。", '<32>* 節拍炫的震天，\n  靚仔美若天仙！']
                        : ["<32>{#p/basic}{#npc/a}* 不用擔心。", "<32>* 我們的功底還不算太賴。"]
            ),
            a_vulkin: pager.create(
                0,
                pager.create(
                    2,
                    () =>
                        SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}{#npc/a}* 新的家園，新的觀眾...',
                                '<32>{#p/basic}{#npc/a}* 甚至比以前都刺激。'
                            ]
                            : ['<32>{#p/basic}{#npc/a}* 喔...\n* 每當人群為我們歡呼，\n  我都感覺... 好刺激。'],
                    () =>
                        SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}{#npc/a}* 新的家園，新的觀眾...',
                                '<32>{#p/basic}{#npc/a}* 甚至比以前都開心。'
                            ]
                            : ['<32>{#p/basic}{#npc/a}* 喔...\n* 每當人群為我們歡呼，\n  我都感覺... 好開心。']
                ),
                pager.create(
                    2,
                    () =>
                        SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}{#npc/a}* 比以前都刺激。']
                            : ['<32>{#p/basic}{#npc/a}* 好刺激。'],
                    () =>
                        SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}{#npc/a}* 比以前都開心。']
                            : ['<32>{#p/basic}{#npc/a}* 好開心。']
                )
            ),
            a_heats: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            ...(world.population < 6
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 那些負責疏散我的守衛\n  並不尊重我的名字...',
                                    '<32>* 所以我回來就是為了\n  尊重你的名字，Frisk！'
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* 你可能知道也可能不知道\n  我的名字...',
                                    '<32>* 但我知道你的名字，Frisk！'
                                ]),
                            '<32>* 哈！\n* 我說對了！',
                            "<32>* 而且我永遠也不會\n  忘掉這個！",
                            '<32>* 現在不會。',
                            '<32>* 一次也不會！！',
                            '<32>* 永遠都不會——！！！！',
                            '<32>* 我永遠，永遠都不會忘掉\n  你的名字，Frisk！！！！！！！！'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 你知道我的名字嗎！？',
                            '<32>* ...',
                            "<32>* 等會，你先別回答我。",
                            '<32>* 你...\n* 你-你看起來知道。',
                            '<32>* 你聞起來...\n* ...\n* ...也知道。',
                            '<32>* ...',
                            "<32>* 我敢打賭我要是摸摸你，\n  你摸起來也是知道。",
                            "<32>* （對你來說可能會超級，\n  超-級-火熱吧。）",
                            '<32>* 但你為什麼知道...？',
                            '<32>* 你是... 怎麼知道的...',
                            '<32>* 這我就永遠都沒法知道了。' 
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 我。永。遠。都。忘-不-掉-！']
                        : ['<32>{#p/basic}{#npc/a}* 我。永。遠。都。不-知-道-！']
            ),
            a_slime_father: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我的老婆和孩子讓我\n  懂得了一個道理。\n* 要對生活滿懷憧憬。",
                            '<32>* 你也許早已「成熟」，\n  只願生活安穩如初，\n  知足常樂...',
                            '<32>* 但即使是最強大的怪物或\n  人類，內心深處卻仍然\n  是個孩子。',
                            "<32>* 深入發掘孩童之心。\n* 信任遵循孩童之願。",
                            '<32>* 即使處於至暗之時，\n  保持心懷童真，\n  亦可朝氣蓬勃，享受生活。'
                        ]
                        : ['<33>{#p/basic}{#npc/a}* 啊，又有了年輕時的感覺。\n* 這宇宙果然無邊無際。'],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 無論你成為了什麼，\n  這一面永遠都會是你\n  最真實的一面。']
                        : ['<32>{#p/basic}{#npc/a}* 你還年輕...', "<32>* 去暢玩一番吧！\n* 宇宙沒有那麼可怕的。"],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 請對此刻骨銘心...']
                        : ['<32>{#p/basic}{#npc/a}* 去吧...']
            ),
            a_slime_mother: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我的老公剛剛才了解自己\n  真正的需求。\n* 但是記住...",
                            '<32>* 你也必須要嘗試新的事物，\n  而且永不停息。',
                            '<32>* 不然你也將迷失於自己的世界，\n  失去對未來的方向。'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 我老公認為他現在老了，\n  就不能再享受生活了。",
                            "<32>* 但說實話，\n  他就是不喜歡嘗試新東西。",
                            childEvac()
                                ? '<33>* 我們把孩子們帶到安全區，\n  但這對他們來說是一種全新的體驗，\n  所以他們很開心！'
                                : '<32>* 我們的孩子一直在嘗試新東西，\n  看看他們多開心！'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 現在我們自由了，\n  可以嘗試更多的新事物了。",
                            '<32>* 去到新世界，\n  發現更多你所知道的，\n  甚至發現創造一個新事物...',
                            '<32>* 一切皆有可能。'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 如果你厭倦了生活，\n  就去嘗試點新的東西吧。",
                            childEvac()
                                ? '<32>* 可以是一部電影，一個愛好，\n  甚至是為保護好孩子\n  而感受到的壓力...'
                                : '<32>* 可以是一部電影，一個愛好，\n  甚至是一門語言...',
                            '<32>* 一切皆有可能！'
                        ],
                ['<32>{#p/basic}{#npc/a}* 還在等什麼呢？']
            ),
            a_slime_kid1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 我們現在來玩...", '<32>* 「怪物... 與怪物」的遊戲。']
                        : ['<32>{#p/basic}{#npc/a}* 我們玩「怪物與人類」的\n  遊戲吧！！'],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 也許不是個好主意。"]
                        : ["<32>{#p/basic}{#npc/a}* 我來當人類。"]
            ),
            a_slime_kid2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我聽Starry的媽媽說，\n  在我們的新家園上沒有人類...",
                            "<32>* 也許我該學著玩\n  「聰明的怪物」的遊戲。"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 我想學習如何玩人類的益智遊戲，\n  比如西洋棋。',
                            "<32>* 那邊的Starry的媽媽\n  是最擅長這個的...\n  她可以打遍天下無敵手！"
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 「4D撲克牌」是什麼呀？']
                        : ['<32>{#p/basic}{#npc/a}* 「迫移局面」是什麼意思啊？']
            ),
            a_diamond1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 所以你的名字\n  是叫Frisk對吧？',
                            '<32>* 你和Mettaton的表演太酷了...',
                            '<32>* 但是你那個「終神之戰」更瘋狂！'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我們剛到這裡時，\n  Mettaton就已經在\n  準備他的第一場演出了！",
                                '<32>* 叫做「尋找人類之星」。'
                            ]
                            : SAVE.data.n.plot < 68
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 我們是來看Mettaton的大結局的，\n  但是...",
                                    ...(iFancyYourVilliany()
                                        ? [
                                            "<32>* 我沒想到我可以這麼近距離地\n  看到$(moniker1)！",
                                            '<32>* ...你就是$(moniker1)，是吧？'
                                        ]
                                        : [
                                            "<32>* 我沒想到我可以這麼近距離地\n  看到那個人類！",
                                            '<32>* ...你就是那個人類，是吧？'
                                        ])
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        iFancyYourVilliany()
                                            ? "<32>{#p/basic}{#npc/a}* 所以你就是那個\n  $(moniker1)，對吧？"
                                            : "<32>{#p/basic}{#npc/a}* 所以你就是那個人類，對吧？",
                                        '<32>* ...'
                                    ]
                                    : [
                                        iFancyYourVilliany()
                                            ? "<32>{#p/basic}{#npc/a}* 嘿，是$(moniker1)！\n  史上最棒的反派演員！"
                                            : "<32>{#p/basic}{#npc/a}* 嘿，你是那個在Mettaton\n  的節目中擊敗他的人類！",
                                        '<32>* 表演超精彩的！'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 更好的是，\n  我們都坐到了第一排！']
                        : SAVE.data.b.ubershortcut
                            ? ['<32>{#p/basic}{#npc/a}* 人類會在哪裡呢...']
                            : SAVE.data.n.plot < 68
                                ? ["<32>{#p/basic}{#npc/a}* 我支援你！"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* ...離我遠點。']
                                    : ['<32>{#p/basic}{#npc/a}* ...能給我籤名嗎？']
            ),
            a_diamond2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 你不想再看一遍嗎？",
                            '<32>* 為了拯救前哨站所有人\n  的生命，從而陷入一場看似\n  沒有「鏡頭」的苦戰...',
                            '<32>* 太酷炫了！'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                '<32>{#p/basic}{#npc/a}* 在Burgie做了那些事後，\n  我以為Mettaton不會再做\n  電視節目了。',
                                '<32>* 但現在...'
                            ]
                            : SAVE.data.n.plot < 68
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 你難道不為大結局\n  感到興奮嗎！？",
                                    iFancyYourVilliany()
                                        ? '<32>* Mettaton和那個人類反派，\n  $(moniker2)之間的最後對決...'
                                        : '<32>* Mettaton和那個人類明星\n  之間的最後對決...',
                                    '<32>* 為了銀河系的榮耀，\n  最後一次戲劇性的對峙！'
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? ["<32>{#p/basic}{#npc/a}* Mettaton他竟然真的...\n* 永遠離開了我們...", '<32>* ...']
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Mettaton最後真的把我們\n  都騙到了...',
                                        "<32>{#p/basic}{#npc/a}* 有那麼一刻，\n  我以為再也見不到他了！"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 遺憾的是時間太短沒看夠。"]
                        : SAVE.data.b.ubershortcut
                            ? ["<32>{#p/basic}{#npc/a}* 他回來真好。"]
                            : SAVE.data.n.plot < 68
                                ? ["<32>{#p/basic}{#npc/a}* 我支援Mettaton！"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* 我想回家了...']
                                    : ["<32>{#p/basic}{#npc/a}* 我想知道他接下來會做什麼..."]
            ),
            a_gyftrot: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 等我們到達新家園時，\n  我要去找個寒冷的地方定居。",
                            "<32>* 儘管我不需要這麼做。\n* 但這樣的話這隻熊就不會\n  出於同情給我送禮物了。"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 這隻熊堅持要給我\n  頭上作些裝飾。',
                            '<32>* 我知道它送我禮物是出於好意，\n  但是我根本不需要頭飾...'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* ...額，也許青少年也沒那麼壞。"]
                        : ["<32>{#p/basic}{#npc/a}* ...至少它不像青少年那樣抱我。"]
            ),
            a_giftbear: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 我開始覺得我對Gyftrot的同情\n  有點過於推己及人了。',
                            '<32>* 從我記事起，\n  我就很渴望一個\n  寒冷的居住環境...',
                            '<32>* 當我們到達新家園時，\n  我會去找一個。'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 我為Gyftrot感到難過。\n* 和我們許多人一樣，它從來\n  沒在自己的自然棲息地生活過。',
                            '<32>* Alphys最近說過\n  力場很快就會崩潰。',
                            '<32>* 也許當那發生時，\n  我們就都可以休息一下了。'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 目前，我仍將繼續陪伴Gyftrot。\n* 送禮物是我唯一知道的\n  互動方式。"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 但現在，我將盡我最大努力\n  去改善那些比我還不幸\n  的人的生活。'
                        ]
            ),
            a_boomer: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* 老實說，頭兒。\n* 我很感謝\n  你以前欺負過所有人。",
                                "<32>* 儘管他們因此恐懼...",
                                '<33>* 但至少他們終於\n  放下謎題來生活了。'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 新家園將會發生\n  一場狂歡，頭兒。",
                                '<32>* 你猜猜為啥？',
                                "<33>* 對嚕。\n* 沒有爛謎題等待著解決。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我不明白人們為什麼\n  要為那個叫Mettaton的傢伙\n  感到緊張不安。",
                                '<32>* 懂我意思嗎，頭兒？',
                                "<32>* 為什麼要對一個陌生人\n  感到心煩意亂呢？"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 你知道為什麼我這麼\n  喜歡在這消遣嗎？',
                                "<32>* 原因很簡單，頭兒。",
                                "<32>* 這裡沒有爛謎題\n  需要解決。"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 對，你聽到我說的了。',
                                "<32>* 我寧願命懸一線，\n  也不願處理謎題。",
                                "<32>* 就是這樣，頭兒。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 對，我還是這麼說。',
                                '<32>* 我還是說它很爛。',
                                "<32>* 這個事實永遠也不會改變，\n  頭兒。"
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 實話實說而已。",
                                "<32>* 我們大部分人都不了解他。",
                                "<32>* 這是事實，頭兒。"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* 對，我就這麼說了。',
                                '<32>* 我說謎題就是很爛。',
                                "<32>* 這是事實，頭兒。"
                            ],
                ['<32>{#p/basic}{#npc/a}* 頭兒。']
            ),
            a_artgirl: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 我是一個藝術老師。\n* 但我現在考慮辭職。",
                            "<32>* 我要找一份不用批評別人\n  的工作...",
                            '<32>* 一份能讓人們開心的工作。'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 我是一名藝術老師。\n* 藝術應該讓人感到積極快樂，\n  對吧？",
                                '<32>* 但我一個學生最近開始\n  畫那些悲傷的畫作。',
                                "<32>* 看著就讓人心痛...\n* 我想幫助他，\n  但又不能阻止他。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 我是一名藝術老師。\n* 在藝術上，\n  據說沒有對與錯之分。",
                                '<32>* 但我一個學生認為他\n  所做的一切都是錯誤的...',
                                "<32>* 他不停地道歉...\n* 我想幫助他，\n  可我不知道該怎麼做。"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* 那不是很棒嗎？"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* 為什麼大家都不能\n  保持積極向上呢？"]
                            : ['<33>{#p/basic}{#npc/a}* 為什麼教一門主觀課程\n  在客觀上那麼困難？']
            ),
            a_drakemom: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 所以，一個新家園，是吧？\n* 我和我的兒子將會一起做\n  許多偉大的事情。',
                            "<32>* 那些事情真的特別棒。\n* 特別是前往那個老藝術老師\n  嚮往的那個地方。",
                            "<32>* 然後，我們會一起吃飯，\n  一起看電影... 他爹\n  也可以一起來。",
                            "<32>* 成長中的男孩總是會有\n  不同的需求，不是嗎？\n* 所以這樣才合理。",
                            "<32>* 不知我兒子的朋友\n  是否感興趣...？"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* 發生什麼了嗎？\n* 我一直在專注於這場比賽，\n  沒注意到。",
                                "<32>* 但也沒事。\n* 畢竟這比賽非常重要，不能\n  因別的事就被轉移注意力啊。"
                            ]
                            : postSIGMA()
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 剛才所有的燈都滅了。\n* 這讓我現在有點為難。",
                                    '<32>* 但我如果放棄了，\n  我的對手可能會回來，\n  將勝利從我的羽毛下偷走！'
                                ]
                                : SAVE.data.b.ubershortcut || world.population === 0
                                    ? [
                                        '<33>{#p/basic}{#npc/a}* 嗯，我站在這桌子旁。\n* 然後組織了這場比賽。\n* 但是我的對手呢？',
                                        '<32>* 沒有！這麼好的地方\n  一個想當我對手的人都沒有！'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* 我下了這步棋。\n* 所謂「兵走國王馬前四」吧？\n* 然後我的對手就走掉了。",
                                        "<32>* 所以呢，現在我得等了。\n* 肯定得等上好長一段時間，\n  那個鐘才能轉完。"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* 全家人都會快樂。']
                        : SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* 比賽永遠是第一。']
                            : postSIGMA()
                                ? ['<32>{#p/basic}{#npc/a}* 你永遠不知道你的對手\n  會對你耍什麼花招。']
                                : SAVE.data.b.ubershortcut || world.population === 0
                                    ? ["<32>{#p/basic}{#npc/a}* 真讓人失望。\n* 甚至於萬念俱灰。"]
                                    : ["<32>{#p/basic}{#npc/a}* 我不可能按時間順序\n  從這件事中恢復過來。"]
            ),
            a_drakedad: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* 儘管恁曾把我們都嚇跑過，\n  但恁至少拯救了我們。',
                                "<32>* 所以我對恁是敬而遠之。"
                            ]
                            : SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 不管恁道不道歉，\n  恁這個功已經大於了\n  恁曾對我兒子造成的傷害。",
                                    '<32>* 感謝恁的善舉。'
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* 既然我們自由了，\n  當服務員兒可能\n  不再適合我了。",
                                    "<32>* 我們的兒子回來了，\n  所以我得給我自己兒\n  找份新工作了..."
                                ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* 這裡的一切都在分崩離析。\n* 人們想讓他們的明星兒回來。',
                                "<32>* 他們不再來我們的\n  餐廳兒吃飯了...",
                                '<32>* 都去兒吃快餐了。'
                            ]
                            : SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}{#npc/a}* 我從我兒子的朋友\n  那聽說過恁，\n  他朋友說他全身都是傷...",
                                    "<32>* 恁能過會\n  替我向他道歉嗎？\n* 那會讓他不敢冒險。"
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* 我是一個服務生。\n* 我牽手是一個下棋的，\n  囝仔是一個講笑話的。",
                                    '<32>* 人講做服務生是無聊的工作，\n  但是對我真合。',
                                    "<32>* 我嘛是老爸咧。\n* 我擔心我的囝仔，\n  因為伊無常常返來...",
                                    '<32>* 反而去星港跟朋友講笑話。'
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ['<32>{#p/basic}{#npc/a}* 恁以後可以當個良人嗎？']
                            : SAVE.data.b.s_state_chilldrake
                                ? ['<32>{#p/basic}{#npc/a}* 非常感謝兒。']
                                : ["<32>{#p/basic}{#npc/a}* 也許我可以當一名酒保兒。"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* 如果事情\n  繼續這樣發展下去，\n  我就會失業的。"]
                            : SAVE.data.b.s_state_chilldrake
                                ? ['<32>{#p/basic}{#npc/a}* 我向恁保證。']
                                : ['<32>{#p/basic}{#npc/a}* 至少笑話是好笑的。']
            ),
            a_reg: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 剛剛，保安們全去參加派對了，\n  但我想留在這，吸點仙氣。',
                            '<32>* 畢竟，什麼聚會，什麼派對...',
                            '<32>* ...哪有吸蒲公罌的仙氣爽...'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                "<32>{#p/basic}{#npc/a}* 感覺好沒意思。\n  所以我就來這吸點「仙氣」。",
                                "<32>* 這朵的勁兒還挺足，\n  但附近應該還有更爽的...",
                                "<32>* ...說不定一不小心就找到了呢。"
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* 那蒲公罌仙氣十足。\n* 我就聞了下，結果保安把我轟出來了。",
                                SAVE.data.b.killed_mettaton
                                    ? '<32>* 這會，大家都在悼念那個大明星，\n  所以我可以溜進休閒迴廊...'
                                    : world.genocide
                                        ? '<32>* 不久前，燈突然滅了，\n  所以我現在可以溜進休閒迴廊...'
                                        : '<32>* 這會，守衛全下班了，\n  所以我可以溜進休閒迴廊...',
                                "<32>* 但是... 啊...\n* 聞了這麼多，就這朵勁最足..."
                            ],
                ["<32>{#p/basic}{#npc/a}* 別管我，\n  我正擱這... 吸仙氣呢。"]
            ),
            a_oni: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 經過一番努力，\n  我們終於可以逃脫了。",
                            "<32>* 老實說，\n  我已經厭倦了這工作。\n* 但這是一段不錯的歷程。",
                            "<32>* 也許，\n  當我們到達新的世界後，\n  我會成為一名工廠工人。",
                            "<32>* 別告訴我這跟\n  做核心工人是一回事。",
                            "<32>* 比如說，那兩個女孩\n  就沒法盯著我們的脖子了。",
                            "<32>* 不，Catty，\n  我不想和你一起過夜！\n* 故事結束了！"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 很久以前，\n  有人在力場發現了一個弱點，\n  就是外域所在的那個位置。',
                            "<32>* 這不代表我們就可以從那裡逃出去了，\n  而是代表著任何經過那裡的人類...",
                            '<32>* ...都必須在那個地方緊急迫降。',
                            '<32>* 所以我們把前哨建得\n  又長又曲折，\n  來阻礙潛在的入侵可能性。',
                            "<32>* 我們很快就意識到\n  這點子實在不聰明。\n  但那時候，大家都墨守成規了。",
                            "<32>* 現在，\n  你走不到兩秒鐘\n  就會在那裡迷路..."
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* 她總是那樣跟我\n  雞蛋裡面挑骨頭。",
                            '<32>* 呃...\n* 也許情況會更糟。',
                            "<32>* 也許我們還要為那個\n  愚蠢的機器人工作。"
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 至少核心的設計理念\n  不是這樣的。",
                            "<32>* 你能想像到我們去修個東西\n  都得走一遍迷宮的樣子嗎？"
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/basic}{#npc/a}* 繼續下去吧，你們兩個...']
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}{#npc/a}* 還好一切都結束了。"]
                            : ['<32>{#p/basic}{#npc/a}* 別了吧，我可領教不來。']
            ),
            a_charles: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 看來我的工作要結束了。\n* 不再會有更多的核心了。',
                            '<32>* 確實，更多的核心。\n* 但不會屬於我們了。',
                            '<32>* 馬上，我們都會離開，\n  而且永不回來。',
                            '<32>* 我的未來在何方？',
                            '<32>* 天，真希望我知道！'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 我在核心工作。\n* 那裡的平面圖設計看起來\n  就像一隻鳥。',
                            '<32>* 喔！我敢說你肯定不知道\n  「核心」的意思是什麼！',
                            '<32>* 它的全稱是「鎓離子核重構\n  電力引擎中心」。',
                            '<32>* 你問這是什麼意思？',
                            '<32>* 我反正不知道，毫無頭緒！'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* 也許，在另一條時間軸，\n  我會當上一個國王。',
                            '<32>* 我是善良的Charles國王，\n  隨時為您服務！',
                            "<32>* 那不是很棒嗎！"
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* 核心的另一個很酷的地方\n  在於它的超控開關。",
                            "<32>* 它們都受著嚴密的保護，\n  但其中一個是被謎題保護著，\n  不是真正的那種守衛在保護！",
                            '<32>* 我真的愛死謎題了！'
                        ]
            ),
            a_dragon: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* 所以你是說下一期喜劇節目\n  兩周後才會播出？？",
                    '<32>* 我還以為是今天呢！'
                ],
                [
                    "<32>{#p/basic}{#npc/a}* 所以你是說我不能改天\n  再安排我的座位了？",
                    '<32>* 這地方簡直太蠢了！'
                ]
            ),
            a_foodreceptionist: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （你靠在這個\n  廢棄的檯面上趴了一會。）']
                        : adultEvac()
                            ? world.bulrun
                                ? ['<32>{#p/basic}* ...但是大家都逃走了。']
                                : ['<32>{#p/basic}* ...但是誰也沒有來。']
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （所有預定已取消。）\n* （依據條款第二節，自由條款。）',
                                    "<32>* （你沒看過服務條款嗎...？）"
                                ]
                                : music.sansdate.instances.length > 0
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （我希望你與你的約會對象\n  可以用餐愉快。）',
                                        '<32>* （那看起來是一段\n  很愉快的小談話。）'
                                    ]
                                    : SAVE.data.b.killed_mettaton
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （使用我們的MTT限時優惠券，\n  預訂可享受半折優惠！）'
                                        ]
                                        : world.population < 2
                                            ? ['<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （這一天天的，\n  陪我的人越來越少了...）']
                                            : [
                                                "<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （想在這吃東西的話，\n  你得先預約一張桌子。）",
                                                "<32>* （那幫事多的人\n  只要沒見著預約按順序排好\n  就會感到不安。）"
                                            ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* （你靠在這個\n  廢棄的檯面上趴了一會。）']
                        : adultEvac()
                            ? world.bulrun
                                ? ['<32>{#p/basic}* ...但是大家都逃走了。']
                                : ['<32>{#p/basic}* ...但是誰也沒有來。']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （新家園見...）']
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （截止到明天。）']
                                    : ['<32>{#p/basic}{#npc/a}* 咕嚕咕嚕...\n* （現在的預定已經都滿了。）']
            )
        },
        genotext: {
            timewaster: () =>
                [
                    ['<25>{#p/asriel2}{#f/10}* 為啥還要回來呢？'],
                    ["<25>{#p/asriel2}{#f/7}* 完全沒必要啊。"]
                ][Math.min(SAVE.flag.n.ga_asrielTimewaster++, 1)],
            asriel46: ['<25>{#p/asriel2}{#f/13}* 哎呀...\n  跟你一塊來這，\n  總感覺瘮得慌。'],
            asriel47: [
                "<25>{#p/asriel2}{#f/4}* 感覺就好像...\n  和好朋友一起上戰場。",
                "<25>{#f/3}* 你別說，這地方\n  還真有戰場的感覺。"
            ],
            asriel48: [
                '<25>{#p/asriel2}{#f/13}* 其實吧...\n  這裡比戰場還恐怖。',
                '<25>{#p/asriel2}{#f/13}* ...還好\n  我們倆可以相互扶持，\n  你說是吧？'
            ],
            asriel49: [
                '<25>{#p/asriel2}{#f/13}* 想像一下...\n  在空境，一座城市拔地而起。',
                "<25>{#f/16}* 真可惜，\n  「空境城」專案爛尾了。"
            ],
            asriel50: [
                "<25>{#p/asriel2}{#f/3}* 要是建成了，\n  估計會有首塔的兩倍大。",
                '<25>{#f/4}* 想像一下，假如有一天，\n  我們登上城市之巔，\n  將它的輝煌盡收眼底...',
                "<25>{#f/3}* 那該多棒啊。"
            ],
            asriel51: [
                '<25>{#p/asriel2}{#f/4}* 不過，城市要是真建那麼大，\n  就有點荒唐了。',
                '<25>{#f/13}* 你也知道，\n  異想天開永遠不會有好下場。'
            ],
            asriel52: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/6}* 這破電梯，\n  該不會沒法直達三樓吧？",
                        '<25>{#f/8}* ...',
                        "<25>{#f/7}* 早該知道，這電梯\n  肯定要跟咱們對著幹。"
                    ],
                    ['<25>{#p/asriel2}{#f/8}* 走完一層，\n  還要走兩層...']
                ][Math.min(SAVE.flag.n.ga_asriel52++, 1)],

            hotel0: () =>
                SAVE.flag.b.asriel_electrics
                    ? [['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/7}* 果然。'], []][
                    Math.min(SAVE.flag.n.ga_asrielElectrics0++, 1)
                    ]
                    : [
                        [
                            "<25>{#p/asriel2}{#f/6}* 真奇怪，\n  這裡不該這麼黑啊。",
                            "<25>{#f/7}* 肯定是有人\n  把供電系統弄短路了。"
                        ],
                        ['<25>{#p/asriel2}{#f/10}* 真想知道，\n  到底是誰把燈弄滅的？'],
                        []
                    ][Math.min(SAVE.flag.n.ga_asrielHotel0++, 1)],
            hotel1: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? SAVE.flag.b.asriel_electrics
                        ? [
                            '<25>{#p/asriel2}{#f/15}* 我想了一下...',
                            '<25>{#f/16}* 這應該是魔法導致的停電。',
                            "<26>{#f/3}* 大概明白了。"
                        ]
                        : [
                            '<25>{#p/asriel2}{#f/10}* ...安保屏障也沒了？',
                            '<25>{#f/10}{#x1}* 快看，\n  這安檢門都燒壞了。'
                        ]
                    : [
                        '<25>{#p/asriel2}{#f/13}* ...一想到這麼嚴重的破壞\n  都是她的魔法造成的...',
                        '<25>{#p/asriel2}{#f/1}* 我就感到後怕。'
                    ],
            hotelElectrics: [
                '<25>{#p/asriel2}{#f/10}* 櫃檯上那幾張字條\n  你看了嗎？',
                '<25>{#f/6}* 如果Alphys來過這，\n  那燈的情況就說得通了。',
                '<25>{#f/15}* 不過才來那麼會，\n  就把電器全燒壞了？',
                "<25>{#f/16}* ...這也太離譜了..."
            ],
            hotel2: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/3}* 果然。\n* 這裡也廢棄了。",
                        "<25>{#f/4}* ...不管了，去核心。"
                    ],
                    []
                ][Math.min(SAVE.flag.n.ga_asrielHotel2++, 1)],
            core0: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/3}* 可算到了...',
                        '<25>{#f/4}* 核心，整個前哨站的能量中心。',
                        '<25>{#p/asriel2}{#f/8}* 跟緊我。\n  搞不好特戰隊有埋伏。'
                    ],
                    []
                ][Math.min(SAVE.flag.n.ga_asrielCore0++, 1)],
            core1: ['<25>{#p/asriel2}{#f/10}* ...居然沒人？', '<25>{#f/15}* 哎呀呀...\n  他們真是嚇破膽了。'],
            core2: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/3}* 總算到總控室了。',
                        "<25>{#f/3}* 這裡的系統控制著\n  整個前哨站的重力、\n  供暖、大氣...",
                        '<25>{#f/15}* 所以，咱們到了這，\n  就無所不能了。',
                        '<25>{#f/4}* 操縱重力，改變供暖，\n  管理大氣...\n  統統不在話下。',
                        "<25>{#f/3}* 讓我試試我的皇室訪問碼\n  還能不能用。",
                        "<25>{#f/2}* 他們估計都忘了重設權限..."
                    ],
                    [
                        '<25>{#p/asriel2}{#f/6}* 我們又回來了。',
                        ...(SAVE.flag.b.asriel_access ? [] : ["<25>{#f/7}* 我用皇室訪問碼試試。"])
                    ]
                ][Math.min(SAVE.flag.n.ga_asrielCore2++, 1)],
            core3: () => [
                '<26>{*}{#p/asriel2}{#f/6}* Asriel呼叫系統，\n  請開啟伸縮橋。\n* 授權碼：STARLING-4-7-7-4。{^40}{%}',
                ...(SAVE.flag.b.asriel_access ? [] : ['<25>{*}{#f/6}* ...{^40}{%}', '<25>{*}{#f/7}* 看來沒- {%}'])
            ],
            core4a: ['<25>{#p/asriel2}{#f/10}* 看來能用。'],
            core4b: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/3}* 我在這篡改系統，\n  你去把後門解開。',
                        '<25>{#f/4}* 兩條路：左或右。\n* 選一條，按下盡頭開關。',
                        "<25>{#f/1}* 等你好訊息。"
                    ],
                    ["<25>{#f/4}* 你忙你的，我忙我的。"]
                ][Math.min(SAVE.flag.n.ga_asrielCore4++, 1)],
            core5: ['<25>{#p/asriel2}{#f/8}* $(name)，回來。'],
            core6a: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/16}* 來的正是時候。\n* 咱們出發吧。',
                        "<25>{#f/1}* 接下來，我們只需要\n  找到一艘逃生飛船，坐船跑路...",
                        '<25>{#f/9}* 然後，把這裡炸了...',
                        '<25>{#f/2}* 最終，飛向自由的彼岸。',
                        "<25>{#f/17}* ...$(name)，\n  興不興奮？高不高興？",
                        
                        "<25>{#f/18}* ...\n* 咱倆很快就自由了！"
                    ],
                    ['<25>{#p/asriel2}{#f/9}* $(name)，\n  等你準備好，咱們就出發。']
                ][Math.min(SAVE.flag.n.ga_asrielCore5++, 1)],
            core6b: ["<25>{#p/asriel2}{#f/16}* 你來帶路。"],
            core7a: ['<25>{#p/asriel2}{#f/8}* 等等，好像有人。'],
            core7b: [
                "<25>{#p/asriel2}{#f/3}* 是Mettaton。\n* 他在裡面等著我們。",
                '<25>{#f/10}* 不過，只能看清背影...',
                '<25>{#f/6}* 咱悄悄溜到他身後，\n  興許能打他個措手不及。'
            ],
            core7c: ['<25>{#p/asriel2}{#f/7}* 你知道該做什麼。'],
            core8a: [
                "<32>{#p/mettaton}* 真以為\n  我會輕易放你們走？",
                "<25>{#p/asriel2}{#f/8}* ...\n* 少跟我拐彎抹角。",
                "<25>{#p/asriel2}{#f/7}* 不過，你愛放不放，\n  我們才懶得管。\n* 畢竟，你早晚都得死。"
            ],
            core8aX: () => [
                "<32>{#p/mettaton}* 真以為\n  我會輕易放你們走？",
                "<25>{#p/asriel2}{#f/8}* 別廢話了，蠢貨。\n  這臺詞我都聽膩了。",
                '<32>{#p/mettaton}* 呃...',
                "<32>{#p/mettaton}* 那不正好說明，\n  你們死在了我的手下嗎？",
                ...(SAVE.flag.n.genocide_milestone < 4
                    ? [
                        "<32>{#p/mettaton}* 呵... 別擔心，親。\n* 這次，就讓你死得更痛快。"
                    ]
                    : [
                        '<25>{#p/asriel2}{#f/2}* 哎呀，你可真蠢。',
                        "<25>{#p/asriel2}{#f/1}* 看清楚，死的人其實是你。\n* 不過，我們很樂意\n  再把你送進地獄。",
                        '<32>{#p/mettaton}* ...',
                        "<32>{#p/mettaton}* 說得好...\n  不過我可不吃你這一套。"
                    ])
            ],
            core8b: [
                "<25>{#p/asriel2}{#f/4}* 嘖嘖，變成破銅爛鐵之前，\n  讓我問問你...",
                "<25>{#f/3}* 拋棄親人，\n  離家出走的時候...",
                '<25>{#f/1}* 就沒考慮過他們的感受？',
                '<32>{#p/mettaton}* 我的家人看到我正在做的，\n  肯定會以我為榮。',
                '<32>* ...至於你呢？',
                "<32>* 那就不好說了。",
                "<25>{#p/asriel2}{#f/6}* 我才不在乎那些廢物。",
                '<25>{#f/8}* 而你放不下家人，\n  就有了一個致命的軟肋。',
                '<25>{#f/6}* 光憑這點，你就註定要輸。'
            ],
            core8c: [
                '<32>{#p/mettaton}* 聽好了，小子。',
                "<32>* 你那點威脅，對我屁用沒有。",
                "<32>* 反正，你馬上就要死在我的手裡。",
                '<32>* 看來，你只會大放厥詞，\n  四處炫耀。',
                '<32>* 自吹自擂，\n  說自己是常勝將軍的時候...',
                "<32>* 卻忽視了最關鍵的一點。"
            ],
            core8d: ['<25>{#p/asriel2}{#f/10}* 忽視了什麼？'],
            core8e: ['<32>{*}{#p/mettaton}{#f/1}* NEO之力。{^40}{%}'],
            azzyBpants: ['<25>{#p/asriel2}{#f/8}* 我去。\n* 這傢伙咋不走呢。']
        },
        coreswitched: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* （你無法再按下開關了。）"]
                : world.darker
                    ? ["<32>{#p/basic}* 果然，又卡住了。"]
                    : SAVE.data.n.plot === 72
                        ? ["<33>{#p/basic}* 這個開關...\n  一次都沒被按下過。\n* 老實說，這確實有可能發生。"]
                        : ['<32>{#p/basic}* 這個開關...\n  在一瞬間就被按下了。\n* 而且不像和其他的那樣被卡住。'],
        puzzlesolved: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* （你無法再按下開關了。）"]
                : world.darker
                    ? ["<32>{#p/basic}* 果然，又卡住了。"]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* 看起來這開關\n  比以前更耐按了。']
                        : ["<32>{#p/basic}* 這個開關不想再被按下了。\n* ...沒錯，它卡住了。"],
        nosleep: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* （你似乎找不到入口。）"] : ["<32>{#p/basic}* 鎖住了。"],
        rg1chat: pager.create(
            0,
            [
                '<32>{#p/basic}{#x1}* 我跟我男朋友在訓練的時候\n  去找冰淇淋，結果迷路了...{#x3}',
                '<32>{#x1}* 最後，我們放棄了，\n  吃了頓披薩當彌補了。{#x3}',
                "<32>{#x1}* 然後我們就在這個崗位上\n  擔任安保工作，畢竟我們\n  最擅長的就是這個了。{#x3}"
            ],
            [
                "<32>{#p/basic}{#x1}* 聽說我們這幫安保人員\n  在店裡可以享受超級優惠。{#x3}",
                '<32>{#x1}* 當然我們完全不是衝這個來的。{#x3}'
            ]
        ),
        rg2chat: pager.create(
            0,
            [
                "<32>{#p/basic}{#x2}* 嘿，你不就是那個，\n  我們早些時候看到的\n  那個安靜的孩子嗎？{#x3}",
                '<32>{#x2}* 不知道為什麼Alphys\n  一定要護送你...{#x3}',
                '<32>{#x2}* 你一定... 特別重要吧。{#x3}'
            ],
            [
                "<32>{#p/basic}{#x2}* 你要是成名了的話，\n  等你飛黃騰達了之後\n  別忘了我們，好嗎？{#x3}",
                "<32>{#x2}* 永遠都要記住你在路上\n  遇到的哥們啊。{#x3}"
            ]
        ),
        elevator1: () => [
            choicer.create('* （你想去哪裡？）', '取消', '核心入口', '核心出口', '首塔')
        ],
        elevatorStory1: () => [choicer.create('* （你想去哪裡？）', '核心入口', '取消')],
        elevator2: () => [
            choicer.create('* （你想去哪裡？）', '空境', '取消', '核心出口', '首塔')
        ],
        elevatorStory2: () => [choicer.create('* （你想去哪裡？）', '空境', '取消')],
        elevator3: () => [
            choicer.create('* （你想去哪裡？）', '空境', '核心入口', '取消', '首塔')
        ],
        elevatorStory3: () => [choicer.create('* （你想去哪裡？）', '首塔', '取消')],
        elevator4: () => [
            choicer.create('* （你想去哪裡？）', '空境', '核心入口', '核心出口', '取消')
        ],
        dinnerdate1: pager.create(
            0,
            () => [
                "<25>{#p/sans}* 嘿，聽說你要來這了。",
                '<25>{#p/sans}{#f/2}* 介不介意來和我吃一頓？\n  要不了多久的。',
                choicer.create('* （共進晚餐嗎？）', '好啊', '我很忙')
            ],
            () => ['<25>{#p/sans}{#f/2}* 改主意了嗎？', choicer.create('* （共進晚餐嗎？）', '好啊', '我很忙')]
        ),
        dinnerdate2a: pager.create(
            0,
            ["<25>{#p/sans}{#f/3}* 嗯，沒關係。\n* 你要是改主意了，\n  隨時來找我。"],
            ['<25>{#p/sans}{#f/3}* 那好。']
        ),
        dinnerdate2b: ['<25>{#p/sans}{#p/sans}{#f/0}* 挺好。'],
        dinnerdate3: ['<25>{#p/sans}{#f/2}* 這邊走。'],
        dinnerdate4: ['<25>{#p/sans}* 我們到了。'],
        dinnerdate5: ['<25>{#p/sans}* 咱們就坐這張桌子吧。'],
        dinnerdate5b: ["<25>{#f/2}* 我坐右邊，你坐左邊。"],
        dinnerdate8: () => [
            '<25>{#p/sans}* 所以...',
            "<25>{#f/3}* 你的旅程就快結束了，\n  是吧？",
            '<25>{#f/0}* 你一定迫不及待地\n  想離開這裡了。',
            '<25>{#f/0}* ...嘿。\n* 相信我，我知道那種感覺，\n  夥計。',
            ...(world.bad_lizard < 1 && SAVE.data.n.bully < 15
                ? [
                    "<25>{#f/3}* ...我也知道，\n  你有很多事要忙。",
                    "<25>{#f/0}* 在這裡，你已經有了\n  美食，飲料，朋友...",
                    '<25>{#f/2}* 為什麼就不能和我們\n  待在一起呢？'
                ]
                : [
                    "<25>{#f/3}* ...我也知道，\n  你有很多煩心事。",
                    "<25>{#f/0}* 但不管你做過什麼事...",
                    '<25>* 離開這裡真的需要這麼\n  大費周章嗎？'
                ])
        ],
        dinnerdate10: ['<25>{#f/0}* ...'],
        dinnerdate11: () => [
            '<25>{#f/3}* 給你講個故事吧。',
            "<25>{#f/0}* 你知道我是皇家哨兵，\n  對吧？",
            '<25>{#f/0}* 我的工作就是坐在外面，\n  監視人類。',
            "<25>{#f/3}* 不過，我相信你現在\n  應該已經意識到了...",
            '<25>{#f/2}* 我攬下這個工作，\n  實際上是為了保護\n  你們這幫人。',
            ...(SAVE.data.n.state_foundry_undyne > 0
                ? [
                    "<25>{#f/3}* 我擔心過事情敗露，\n  但是... 你懂的。",
                    "<25>{#f/0}* 這年頭，\n  還能有多少人在乎呢。"
                ]
                : world.bad_lizard < 1 && SAVE.data.n.bully < 15
                    ? ["<25>{#f/4}* 噓，你別跟undyne說\n  是我說的。\n* 她可不喜歡聽這些。"]
                    : ["<25>{#f/0}* ...很諷刺，是嗎？"]),
            "<25>{#f/0}* 總之，這份工作\n  超級無聊，對吧？",
            "<25>{#f/0}* 幸運的是，在星港深處，\n  有一個不大點的地方。",
            "<25>{#f/0}* 在通往這地方的橋的盡頭\n  有一扇老舊的大門。",
            '<25>{#f/4}* 現在這扇大門，\n  是練習敲門笑話的\n  最佳場所。',
            "<25>{#f/0}* 有一天，\n  我就像往常一樣敲著門...",
            '<25>{#f/0}* 我敲了敲那扇門，然後\n  說：「敲門，咚咚咚。」\n* 一如既往。',
            '<25>{#f/0}* 但突然，在門後面...',
            "<25>{#f/3}* 傳來了一個女人的聲音。",
            '<32>{#p/soriel}* 「是誰？」',
            '<25>{#p/sans}{#f/0}* 自然而然，\n  我就接了下去。',
            '<25>{#f/2}* 「蝦米。」',
            '<32>{#p/soriel}* 「哪個蝦米？」',
            '<25>{#p/sans}{#f/4}* 「大老遠跑來這塊\n  是咧做蝦米？」',
            '<25>{#f/0}* 然後她就大笑了起來。',
            "<25>* 好像她有一百年\n  沒聽過這麼好笑的\n  笑話了一樣。",
            '<25>{#f/2}* 所以，自然而然，\n  我就繼續講了好多笑話。',
            '<25>{#f/0}* 接著，\n  在我講了十幾個之後，\n  她就先起了頭...',
            '<32>{#p/soriel}* 「敲門，咚咚咚！」',
            '<25>{#p/sans}* 我說：「是誰？」',
            '<32>{#p/soriel}* 「咪。」',
            '<25>{#p/sans}* 「什麼咪？」',
            '<32>{#p/soriel}* 「哎呀，我才不是什麼\n   『小貓咪』！」',
            '<25>{#p/sans}{#f/0}* ...嘿。',
            '<25>{#f/2}* 不用多說，\n  這個女人真的很懂笑話。',
            '<25>{#f/0}* 我們就這麼講了一陣子，\n  但最後，她必須得走了。',
            '<25>{#f/0}* 不過，第二天...',
            '<25>* 等我回去找她的時候，\n  她在那裡等著我。',
            '<25>{#f/3}* ...你知道嗎，\n  她對我說了好多好多。',
            '<32>{#p/soriel}* 「我希望我做的事情\n   是對的...」',
            '<32>{#p/soriel}* 「...我必須保護\n   那孩子...」',
            '<32>{#p/soriel}* 「...不能再像之前\n   那樣了...」',
            '<25>{#p/sans}{#f/3}* 事實證明，\n  這個女人遠沒有聽上去\n  那麼簡單。',
            '<25>{#f/0}* 喔，她還說了一大堆\n  關於asgore的\n  奇怪的事情。',
            "<25>{#f/3}* 細節就不跟你贅述了，\n  但我就這麼跟你說吧...",
            "<25>{#f/2}* 隔閡真的會輕易改變\n  一個人的世界觀。"
        ],
        dinnerdate13: ['<25>{#p/sans}{#f/0}* 哎呀，我忘了點菜了，\n  是吧？', '<25>* ...'],
        dinnerdate14: ["<25>{#f/3}* 我馬上回來。"],
        dinnerdate14comment: () =>
            world.darker
                ? ['<32>{#p/basic}* ...']
                : SAVE.data.b.oops
                    ? ['<32>{#p/basic}* 實話說，\n  沒有比期待美食上桌\n  更好的體驗了。']
                    : [
                        '<32>{#p/basic}* 你知道嗎...',
                        "<32>{#p/basic}* 我當時本來想和她多說幾句的，\n  但我轉念一想...",
                        '<32>{#p/basic}* ...就算多說了，\n  能有什麼別的作用嗎？'
                    ],
        dinnerdate15: () =>
            SAVE.data.b.water
                ? [
                    '<25>{#p/sans}* 你看，\n  你甚至帶了杯喝的過來。',
                    "<25>{#p/sans}{#f/2}* 不用擔心我。\n* 我已經在櫃檯那邊喝過了。"
                ]
                : [
                    "<25>{#p/sans}* 我們繼續聊。",
                    "<25>{#p/sans}{#f/2}* 不用擔心我。\n* 我已經在櫃檯那邊\n  吃過東西了。"
                ],
        dinnerdate16: () => [
            '<25>{#f/0}* 總之，就像我說的...',
            '<25>{#f/3}* 這個女人承受了\n  很大的壓力。',
            '<25>{#f/0}* 所以我問她...',
            '<25>{#f/2}* 「想知道骷髏是怎麼\n   打發時間的嗎？」',
            '<32>{#p/soriel}* 「怎麼打發的？」',
            '<25>{#p/sans}{#f/2}* 然後我拿起長號\n  吹了一段骨樂。',
            '<25>{#f/4}* 該說不愧是她，\n  很快就理解了我的笑話。',
            "<25>{#f/0}* ...那天晚上是我們\n  有史以來過得最\n  開心的一晚。",
            '<25>{#f/0}* 然後時間就這樣過去，\n  看看現在吧...',
            "<25>{#f/2}* 我把大部分時間都\n  花在照顧你上了。",
            "<25>{#f/0}* 但是，嘿，\n  該說不說，我做得不錯吧？",
            '<25>{#f/3}* 我是說，\n  看看你自己吧...',
            "<25>{#f/0}* 你連一次都沒死過呢。",
            ...(SAVE.flag.n._deaths > 0
                ? ['<25>{#f/0}* ...', "<25>{#f/0}* 嘿，\n  你那表情是什麼意思？", '<25>{#f/2}* 難道我說錯了嗎...？']
                : SAVE.flag.n._hits > 0
                    ? ['<25>{#f/2}* 嘿。\n* 該說都是我的功勞吧。']
                    : ["<25>{#f/2}* 嘿。\n* 我敢說你身上\n  一點小傷口都沒有。"])
        ],
        dinnerdate18: () => [
            ...(SAVE.flag.n._deaths > 0 ? ['<25>{#p/sans}{#f/0}* 嘿。'] : []),
            '<25>{#p/sans}{#f/0}* 總之，好好吃飯吧...\n  也希望你都能理解\n  我說的話。' 
        ],
        dinnerdate19: () => [
            "<25>{#f/3}* 記住，\n  我們都支援你，孩子。",
            ...(SAVE.data.n.exp <= 0
                ? SAVE.data.n.state_foundry_undyne === 1
                    ? ["<25>{#f/0}* ...這無關乎你都\n  拯救過誰。"]
                    : ["<25>{#f/2}* ...甚至undyne現在\n  都站在你這邊了。"]
                : world.bad_lizard < 1 && SAVE.data.n.bully < 15
                    ? ["<25>{#f/0}* ...這無關乎你做過\n  什麼事情。"]
                    : ['<25>{#f/0}* ...好吧，至少是，\n  我們中的大多數人。'])
        ],
        onionsan1: ['<32>{#p/basic}* 歡迎呀...\n* 看到你啦...'],
        onionsan1a: ["<32>{#p/basic}* 我是Onionsan！\n* 聽到沒，Onionsan！"],
        onionsan2: () =>
            world.goatbro
                ? ["<32>{#p/basic}* 你倆...\n  看著不像是好人..."]
                : ["<32>{#p/basic}* 哎呀...\n  你肯定經歷了長途跋涉\n  才到這裡..."],
        onionsan2a: () =>
            world.goatbro
                ? ["<32>{#p/basic}* 別擔心！\n  在休閒迴廊，人們都很大度！\n* 我愛死這裡了。"]
                : ["<32>{#p/basic}* 別擔心！休閒迴廊，就是專為\n  我們這些旅者服務的！\n* 我愛死這裡了。"],
        onionsan3: [
            "<32>{#p/basic}* 可惜...\n* 我太大了，進不去吶...",
            '<32>{#p/basic}* 太空無拘無束，\n  洋蔥的成長也無拘無束了...'
        ],
        onionsan3a: () =>
            world.goatbro
                ? [
                    "<32>{#p/basic}* 不過，這都不是事兒！\n* 很快，情況就會好轉了！\n  你聽到沒！",
                    "<32>{#p/basic}* 他們會打破力場的，\n  你聽到沒！\n* 真是太棒啦！"
                ]
                : [
                    "<32>{#p/basic}* 不過，這都不是事兒！\n* 很快，我就有家了，你聽到沒！",
                    "<32>{#p/basic}* 他們會打破力場的，\n  你聽到沒！\n* 真是太棒啦！"
                ],
        onionsan4: ["<32>{#p/basic}* 力場一破...\n* 我就能在漫漫宇宙...\n* 四處暢遊了..."],
        onionsan4a: ["<32>{*}{#p/basic}* 自由要來啦啊啊啊啊啊啊啊啊啊啊{^999}"],
        onionsan4x: ['<25>{#p/asriel2}{#f/8}* 對對對，你說得都對。'],
        candy1: () =>
            postSIGMA()
                ? ["<32>{#p/basic}* 停機了。"]
                : [
                    SAVE.data.b.svr
                        ? '<32>{#p/human}* （你走近了自動售貨機。）'
                        : "<32>{#p/basic}* 這是個專賣燈芯的自動售貨機。",
                    choicer.create('* （花40G買五根燈芯嗎？）', '買', '不買')
                ],
        candy2: ["<32>{#p/human}* （你的錢不夠。）"],
        candy3: ["<32>{#p/human}* （你帶的東西太多了。）"],
        candy4: ['<32>{#p/human}* （你買了一些燈芯。）'],
        candy5: ['<32>{#p/human}* （你決定先不買。）'],
        bedreceptionist1: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* 歡迎來到四維酒店。\n* 我們打烊了。\n* 依據條款第二節，自由條款。",
                        '<32>* 人們從來都不看服務條款...'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* 歡迎來到四維酒店，\n  在這裡，\n  睡眠與感知的邊緣相遇。',
                            '<32>* 我們目前分配的房間\n  都已被預訂。',
                            '<32>* 當分配了更多空間時，\n  歡迎您再來。'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* 歡迎來到四維酒店，\n  在這裡，\n  睡眠與感知的邊緣相遇。',
                            "<32>* 只要你在我們這訂了房間，\n  這房間將永遠都會屬於你。",
                            "<32>* 我們在左邊有一間普通套房，\n  價格為300G。\n* 感興趣不？{#npc}",
                            choicer.create('* （訂一間房嗎？）', '訂', '不訂')
                        ],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/basic}{#npc/a}* 新世界見。']
                    : SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* 那下次見！']
                        : [
                            '<32>{#p/basic}{#npc/a}* 300G訂一套\n  你自己的套房。\n* 感興趣不？{#npc}',
                            choicer.create('* （訂一間房嗎？）', '訂', '不訂')
                        ]
        ),
        bedreceptionist2a: [
            '<32>{#p/basic}{#npc/a}* 謝謝，我們期待\n  你能睡得安全舒適！'
        ],
        bedreceptionist2b: ["<32>{#p/basic}{#npc/a}* 好吧，\n  等您改變主意時，\n  歡迎您再來。"],
        bedreceptionist3: ["<32>{#p/basic}{#npc/a}* 你的錢不夠。"],
        bedreceptionist4: () =>
            SAVE.data.n.plot === 72
                ? [
                    '<32>{#p/basic}{#npc/a}* 和往常一樣，\n  我們感謝你能購買房間。',
                    "<32>* 我們馬上就要打烊了，\n  所以趁還有時間，\n  好好享受你的房間吧！"
                ]
                : [
                    '<32>{#p/basic}{#npc/a}* 感謝您在四維酒店購買房間！',
                    ...(SAVE.data.b.killed_mettaton ? ['<32>* 您的選擇是絕佳的。'] : [])
                ],
        core1: [
            '<32>{#p/event}* 鈴鈴，鈴鈴...',
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...你-你好。',
            "<25>* 這座電梯直通首塔，\n  到了那裡，你就安全了。",
            "<25>{#g/alphysInquisitive}* 但是...\n  這玩意出了點故障。",
            
            "<25>{#g/alphysCutscene3}* 所以，你只能先到核心，\n  自己走到出口，\n  才能去首塔。",
            "<25>{#g/alphysUhButHeresTheDeal}* 等你準備好了，就出發吧。\n* 到時我再給你回電話！"
        ],
        core2a: () =>
            [
                [
                    '<32>{#p/event}* 鈴鈴，鈴鈴...',
                    "<25>{#p/alphys}{#g/alphysSmileSweat}* 好，這裡就是核心。",
                    "<25>{#g/alphysSmileSweat}* 這段時間裡\n  我會常和你聯繫，\n  以防出什麼意外。",
                    
                    ...(SAVE.data.n.plot < 66.2
                        ? [
                            '<25>{#g/alphysInquisitive}* 按理說，\n  特戰隊應該不會\n  來找你麻煩。',
                            "<25>{#g/alphysNeutralSweat}* ...但就怕萬一。"
                        ]
                        : [
                            "<25>{#g/alphysInquisitive}* 我們來的早。\n* 這時候，\n  特戰隊還沒上班。",
                            "<25>{#g/alphysNeutralSweat}* ...希望一路上暢通無阻。"
                        ])
                ],
                SAVE.data.n.plot < 66.2
                    ? [
                        '<32>{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/alphys}{#g/alphysWelp}* 所以，準備好了吧？',
                        '<25>{#g/alphysNeutralSweat}* 一定要小-小心特戰隊成員！'
                    ]
                    : SAVE.data.n.plot < 67
                        ? [
                            '<32>{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysWelp}* 所以，準備好了吧？',
                            '<25>{#g/alphysNeutralSweat}* 前面還有道門，\n  別-別忘了開...'
                        ]
                        : [
                            '<32>{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#g/alphysWelp}* 所以，準備好了吧？',
                            "<25>{#g/alphysNeutralSweat}* 我們離出口不遠了..."
                        ],
                ['<32>{#p/event}* 鈴鈴，鈴鈴...', "<25>{#p/alphys}{#g/alphysWelp}* 我會一直線上的。"]
            ][Math.min(SAVE.data.n.state_aerialis_coreenter++, 2)],
        core2b: () =>
            [
                [
                    "<25>{#p/alphys}{#g/alphysInquisitive}* 你要是想離開核心，\n  那我就先掛電話了。",
                    "<25>{#g/alphysCutscene2}* 等你-你回來\n  我再打給你！"
                ],
                ['<25>{#p/alphys}{#g/alphysNervousLaugh}* 又要走了？', '<25>{#g/alphysWelp}* 那好吧。'],
                [
                    '<25>{#p/alphys}{#g/alphysFR}* ...',
                    '<25>{#g/alphysFR}* 你最好不是為了\n  看我有什麼反應\n  才這麼做的。'
                ],
                ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
            ][Math.min(SAVE.data.n.state_aerialis_coreleave++, 3)],
        core3: ['<25>{*}{#p/alphys}{#g/alphysShocked}* 小心！{^999}'],
        core4: () =>
            SAVE.data.b.legendary_madjick
                ? ["<25>{#p/alphys}{#g/alphysCutscene3}* 啊？\n* 那東西是咋回事？"]
                : SAVE.data.b.assist_madjick
                    ? [
                        '<25>{#p/alphys}{#g/alphysCutscene3}* 什麼鬼... 你做了啥？？',
                        '<25>* 你說了啥，\n  怎麼會就這樣走開了！？',
                        '<32>{#p/basic}* 呵呵。\n* 有時候你只需念出恰當的魔咒。'
                    ]
                    : !SAVE.data.b.killed_madjick
                        ? [
                            '<25>{#p/alphys}{#g/alphysNervousLaugh}* 呼...',
                            "<25>{#g/alphysNeutralSweat}* 希-希望別再發生\n  這種事了。",
                            ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ...看來你根本用不著我幫忙。"])
                        ]
                        : world.bad_lizard === 0
                            ? [
                                '<25>{#p/alphys}{#g/alphysSideSad}* 不... 為什麼...',
                                '<25>{#g/alphysWorried}* ...',
                                "<25>* 難道就沒有... 別的方法嗎？"
                            ]
                            : [
                                '<25>{#p/alphys}{#g/alphysSideSad}* 不... 為什麼...',
                                '<25>{#g/alphysThatSucks}* ...',
                                "<25>* 至少我們很快\n  就能出去了。"
                            ],
        core5: ['<25>{*}{#p/alphys}{#g/alphysOhGodNo}* 等下！！！{^999}'],
        core6: () =>
            SAVE.data.b.legendary_knightknight
                ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
                    ? [
                        "<25>{#p/alphys}{#g/alphysWTF}* 我不敢相信我的眼睛...",
                        ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                            ? []
                            : ["<32>{#p/basic}* ...看來你這回用不著我幫，是嗎？"])
                    ]
                    : ["<25>{#p/alphys}{#g/alphysCutscene3}* 啊？\n* 那東西是咋回事？"]
                : SAVE.data.b.assist_knightknight
                    ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
                        ? [
                            "<25>{#p/alphys}{#g/alphysWTF}* 我不敢相信我的眼睛...",
                            '<32>{#p/basic}* 相信我吧。\n* 我心思可細膩了！',
                            '<32>{#p/basic}* 魔咒和戰歌可是\n  這幫故園老英雄的命脈。'
                        ]
                        : [
                            '<25>{#p/alphys}{#g/alphysCutscene3}* 什麼鬼... 你做了啥？？',
                            '<25>* 你說了啥，\n  怎麼會就這樣走開了！？',
                            '<32>{#p/basic}* 呵呵。\n* 有時候你只需唱出恰當的高音。'
                        ]
                    : !SAVE.data.b.killed_knightknight
                        ? [
                            '<25>{#p/alphys}{#g/alphysWelp}* ...',
                            ...(SAVE.data.b.killed_madjick
                                ? ['<25>{#g/alphysWelp}* 至少你倆都活下來了。']
                                : [
                                    '<25>* 咱們該去下個房間了吧。',
                                    ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                                        ? []
                                        : ["<32>{#p/basic}* ...看來你這回用不著我幫，是嗎？"])
                                ])
                        ]
                        : SAVE.data.b.killed_madjick || world.bad_lizard === 0
                            ? ['<25>{#p/alphys}{#g/alphysThatSucks}* ...', '<32>{#p/human}* （你聽到了一聲長嘆。）']
                            : [
                                '<25>{#p/alphys}{#g/alphysWorried}* ...',
                                '<25>{#g/alphysWorried}* 那應該是\n  最-最後一個工程師了。'
                            ],
        core7: [
            '<25>{#p/alphys}{#g/alphysWelp}* 嗯... 這就是核心。\n* 或者說，核心的「核心」。',
            '<25>{#g/alphysInquisitive}* 後面那扇門鎖住了\n* 想-想打開它，\n  有兩條路可以走...',
            "<25>* 左邊的是智者之路，\n  而右邊的是勇者之路。",
            '<25>{#g/alphysFR}* 兩邊都... 蠻難走的。\n* 不過...',
            "<25>{#g/alphysWelp}* 我推薦你-你走左邊。",
            "<25>{#g/alphysSideSad}* 當然了，\n  是走左邊，還是右邊，\n  還是看你...",
            "<25>{#g/alphysHaveSomeCompassion}* 但至少...\n  走智者之路，會...\n  安全一點。"
        ],
        core8a: (nooted: boolean) => [
            "<25>{#p/alphys}{#g/alphysSide}* 看來你決定走智者之路。",
            '<25>{#g/alphysWelp}* 挺明智的。',
            ...(nooted
                ? [
                    '<25>{#g/alphysCutscene3}* 這些謎題...',
                    '<25>{#f/10}* ...已經解開了。',
                    '<25>{#f/3}* 怪事，\n  之前是這樣的嗎？'
                ]
                : [
                    "<25>{#g/alphysCutscene3}* 這些謎題... 其實就是\n  難者不會，會者不難。",
                    "<25>{#g/alphysCutscene2}* 說白了，\n  這玩意就是個...\n  大號密碼鎖罷了。",
                    '<25>{#g/alphysWelp}* 撥動開關，升降稜柱。\n  只要讓柱子都升起來，\n  門就開了。'
                ])
        ],
        core8a1: () => ["<25>{#p/alphys}{#g/alphysInquisitive}* 莫非你更想走另一條路...？"],
        core8b: ["<25>{#p/alphys}{#g/alphysCutscene2}* 解決一個，還剩一個。"],
        core8b1: () => ["<25>{#p/alphys}{#g/alphysWelp}* 看來現在我們又往這邊走了。"],
        core8c: ['<25>{#p/alphys}{#g/alphysCutscene1}* 你成功了！\n* 去下個房間，按下開關吧！'],
        core8c1: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* 你在幹什麼...？',
            "<25>{#p/alphys}{#g/alphysFR}* 別告訴我你現在\n  又要換條路走了..."
        ],
        core8c2: (nooted: boolean) =>
            nooted
                ? [
                    '<25>{#p/alphys}{#g/alphysWTF}* 我說你啊。\n* 你還真往另一條...',
                    '<25>{#g/alphysFR}* ...',
                    '<25>{#g/alphysFR}* 這玩意啥時候被解決的？'
                ]
                : ['<25>{#p/alphys}{#g/alphysWTF}* 我說你啊。\n* 你還真往另一條路走啊。'],
        core8c3: [
            '<25>{#p/alphys}{#g/alphysWelp}* 這下你兩個開關都能按了。',
            '<25>{#p/alphys}{#g/alphysCutscene3}* 得了吧！'
        ],
        core8c4: ['<25>{#p/alphys}{#g/alphysGarboCenter}* ...', '<25>* 你現在真是在\n  考驗我的耐心啊。'],
        core9a: () => [
            "<25>{#p/alphys}{#g/alphysNeutralSweat}* 看來你決定走勇者之路。",
            ...(SAVE.data.b.killed_knightknight && (SAVE.data.b.killed_madjick || world.bad_lizard === 1)
                ? ['<25>* ...', '<25>{#g/alphysCutscene3}* 如果可以的話...\n* 你能... 別再殺人了嗎？']
                : SAVE.data.b.killed_knightknight || SAVE.data.b.killed_madjick
                    ? ['<25>* ...', '<25>* 這選擇感覺不怎麼樣。']
                    : [
                        "<25>{#g/alphysWelp}* 這無疑讓我們有一種\n  要去冒險的感覺。",
                        "<25>* 其實這沒什麼大不了的，\n  你只需要安全通過那些守衛。",
                        '<25>{#g/alphysCutscene2}* 呃... 祝你好運？',
                        '<25>{#g/alphysCutscene3}* ...',
                        "<25>* 別死在他們手上了。"
                    ])
        ],
        core9a1: (nooted: boolean) =>
            nooted
                ? [
                    "<25>{#p/alphys}{#g/alphysSide}* 噢，你又跑來...",
                    '<25>{#p/alphys}{#g/alphysCutscene3}* ...這條謎題已經被解完的路了。',
                    '<25>{#p/alphys}{#f/3}* 它一直是這樣的嗎？'
                ]
                : [
                    "<25>{#p/alphys}{#g/alphysSide}* 噢，你又跑來這條路了。",
                    "<25>{#g/alphysInquisitive}* 智者之路，對嗎？"
                ],
        core9b: () =>
            1 <= battler.exp
                ? [
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                    corefriendly() ? '<25>* 你真-真的... 有必要這麼做嗎？' : '<32>{#p/human}* （你聽見一聲嘆息。）'
                ]
                : SAVE.data.b.a_state_nooted1
                    ? [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* 你知道嗎，我不明白\n  你為什麼還在這裡。",
                        "<25>{#p/alphys}{#g/alphysCutscene3}* 你問我為什麼？\n* 智者之路的謎題\n  都已經被解完了！"
                    ]
                    : ["<25>{#p/alphys}{#g/alphysCutscene2}* 你安全通過了第一組守衛！\n* 準備好下一場戰鬥吧。"],
        core9b1: (nooted: boolean) =>
            1 <= battler.exp && corefriendly()
                ? nooted
                    ? [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* 莫非，我是說當然了，\n  你打算...",
                        '<25>{#p/alphys}{#g/alphysCutscene3}* ...換另一條\n  謎題已經被解完的路走。',
                        '<25>{#p/alphys}{#f/3}* 它一直是這樣的嗎？'
                    ]
                    : ["<25>{#p/alphys}{#g/alphysInquisitive}* 莫非，我是說當然了，\n  你打算換另一條路走...？"]
                : nooted
                    ? [
                        '<25>{#p/alphys}{#g/alphysInquisitive}* 你改變...',
                        "<25>{#p/alphys}{#g/alphysCutscene3}* ...噢，這已經被解決了。",
                        '<25>{#p/alphys}{#f/3}* 它一直是這樣的嗎？'
                    ]
                    : ['<25>{#p/alphys}{#g/alphysInquisitive}* 你改變主意了...？'],
        core9c: () =>
            calm_lizard()
                ? ['<25>{#p/alphys}{#g/alphysCutscene1}* 你做到了！\n* 去下個房間把開關按下吧！']
                : [
                    '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                    SAVE.data.n.state_aerialis_corepath_puzzle < 3
                        ? "<25>{#p/alphys}{#g/alphysSideSad}* 去下個房間把開關按下，\n  然後我們就能離開這裡了。"
                        : '<25>{#p/alphys}{#g/alphysSideSad}* 去下個房間把開關按下，\n  就完事了。'
                ],
        core10a: ['<25>{#p/alphys}{#g/alphysCutscene2}* 好，應該可-可以\n  繼續前進了。'],
        core10b: [
            '<25>{#p/alphys}{#g/alphysWelp}* 噢，你回來了。',
            '<25>{#g/alphysCutscene2}* 好，應-應該可以\n  繼續前進了。'
        ],
        core10c: ['<25>{#p/alphys}{#g/alphysFR}* 真折騰。'],
        core11: (nooted: boolean) =>
            nooted
                ? [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* 你為啥要往...',
                    '<25>{#f/21}* ...',
                    '<25>{#f/22}* 這鬼地方的謎題\n  早就被解完了嗎！？'
                ]
                : ['<25>{#p/alphys}{#g/alphysInquisitive}* 你為啥要往這邊走？', '<25>{#g/alphysFR}* ...'],
        core12: (nooted: boolean) =>
            nooted
                ? [
                    
                    '<25>{#p/alphys}{#g/alphysInquisitive}* 這玩意啥時候被解決的？',
                    "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 呃，\n  這樣就能節省很多時間了！"
                ]
                : SAVE.data.b.a_state_nooted1 && game.room === 'a_core_left2' // NO-TRANSLATE

                    ? ['<25>{#p/alphys}{#g/alphysCutscene3}* 到底是怎樣啊...']
                    : ['<25>{#p/alphys}{#g/alphysCutscene3}* 你現在本應該已經到首塔了。'],
        core12x: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* 這玩意啥時候被解決的？',
            '<25>{#p/alphys}{#f/3}* 它一直是這樣的嗎？'
        ],
        core13: [
            "<25>{#p/alphys}{#g/alphysGarbo}* 倆開關你都按了。",
            '<25>{#p/alphys}{#g/alphysGarboCenter}* 這下滿意了？'
        ],
        core14: () => [
            "<25>{#p/alphys}{#g/alphysWelp}* 停，前-前面有東西。",
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* 讓我看看，\n  這回能不能直接清除障礙...',
            SAVE.data.b.ubershortcut
                ? '<32>{#p/human}* （你聽到了一陣狂敲鍵盤的聲音。）'
                : '<32>{|}{#p/human}* （又是強制- {%}',
            "<25>{#p/alphys}{#g/alphysCutscene3}* 內網系統的名單上沒有它。",
            "<25>{#g/alphysUhButHeresTheDeal}* 它甚至連守衛都不是！",
            '<25>{#g/alphysWelp}* ...不妙。'
        ],
        core14a: [
            '<32>{#p/basic}* 以為想去對面，\n  只需要過座橋嗎？',
            "<32>* 喔呼呼呼...\n* 真可惜啊，冤家路窄..."
        ],
        core14b: ["<32>{#p/basic}* 想過橋，先好好掂量掂量\n  自己幾斤幾兩！{%20}"],
        core15: () =>
            !world.killed_mushketeer
                ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* 結... 結束了？', '<25>* 能走了嗎？']
                : [
                    '<26>{#p/alphys}{#g/alphysNeutralSweat}* 你... 你把它...',
                    '<25>{#g/alphysHaveSomeCompassion}* ...好吧...'
                ]
    },

    b_group_aerialis: {
        froggitexWhimsalot: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 這-這是第一組守衛。']
                : ['<32>{#p/story}* Final Froggit和Flutterknyte\n  出現在你的面前！'],
        froggitexWhimsalotX: (whimmer: boolean) =>
            whimmer ? ['<32>{#p/story}* Flutterknyte獨自飛著。'] : ['<32>{#p/story}* Final Froggit沒了夥伴，\n  獨自蹦跳。'],
        astigmatism: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 怎麼是他們啊...']
                : world.genocide
                    ? ['<32>{#p/story}* 迎面走來的，是一隻笑眼！']
                    : ['<32>{#p/story}* 迎面走來的，是兩雙笑眼！'],
        rg: () => (world.goatbro ? ['<32>{#p/asriel2}* 一號守衛，二號守衛。'] : ['<32>{#p/story}* 皇家衛隊來襲！']),
        spacetopTsundere: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 一群瘋子...'] : ["<32>{#p/story}* 太空配星艦，惡夢滾滾來！"],
        spacetopTsundereX: (spacetop: boolean) =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 只剩一個了。']
                : spacetop
                    ? ['<32>{#p/story}* 這裡只剩Astro Serf了。']
                    : ['<32>{#p/story}* 這裡只剩Tsunderidex了。'],
        pyropeTsundere: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 「愛上火」兩人組來襲。'] : ["<32>{#p/story}* 烈火騎兵來襲！"],
        pyropeTsundereX: (pyrope: boolean) =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 只剩一個了。']
                : pyrope
                    ? ['<32>{#p/story}* 這裡只剩Hotwire了。']
                    : ['<32>{#p/story}* 這裡只剩Tsunderidex了。'],
        astigmatismMigospelX: ['<32>{#p/story}* Eyewalker Prime掌控了戰局！']
    },

    b_opponent_glyde: {
        name: '* Glyde',
        epiphaNOPE: ['<11>{#p/basic}{~}{#e/glyde/10}別把\n那玩意\n湊我臉上，\n成不成？'],
        act_check: ['<32>{#p/story}* GLYDE - 攻擊嗯 防禦嗯\n* 拒絕提供詳細面板數據。'],
        act_secret: () =>
            glade()
                ? SAVE.data.b.w_state_steak && SAVE.data.b.w_state_soda
                    ? ['<32>{#p/human}* （你把Aaron告訴你的密碼\n  報給了Glyde.）']
                    : ["<32>{#p/human}* （你想把密碼報給Glyde，\n  可你根本不知道什麼密碼。）"]
                : ['<33>{#p/human}* （你想把密碼報給Glyde，\n  可他搖搖頭，打斷了。）'],
        act_flirt1: ['<32>{#p/human}* （你向Glyde調情。）'],
        act_flirt2: ["<32>{#p/human}* （你向Glyde調情，\n  可他壓根不理你。）"],
        act_berate: ['<32>{#p/human}* （你訓了Glyde一頓。）\n* （Glyde回以嘲諷。）'],
        fightEnder1: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}...嗯？',
            '<20>{#p/basic}{~}你剛才是不是說\n「三層豪華肌肉男」？',
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            '<20>{#p/basic}{~}{#e/glyde/10}也就是說...',
            "<20>{#p/basic}{~}{#e/glyde/5}在外域買了\n我旗下產品的人\n就是你啊！",
            '<20>{#p/basic}{~}而且...',
            '<20>{#p/basic}{~}過了這麼久，\n你還把密碼記那麼清楚！'
        ],
        fightEnder2: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}...嗯？',
            '<20>{#p/basic}{~}你剛才是不是說\n「三層豪華肌肉男」？',
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            '<20>{#p/basic}{~}{#e/glyde/10}也就是說...',
            '<20>{#p/basic}{~}{#e/glyde/5}你不光買了我的產品...',
            '<20>{#p/basic}{~}{#e/glyde/12}還一直記著密碼？？'
        ],
        fightEnder3: [
            "<20>{#p/basic}{~}{#e/glyde/5}哥們我猜你不知道\n我等這些美妙的小詞\n有幾億年了。",
            "<20>{#p/basic}{~}{#e/glyde/12}* 除了罵你瘋子以外我還有\n  什麼好說的！",
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            "<20>{#p/basic}{~}{#e/glyde/10}告訴你吧，\n我要潤去煩別的傢伙了。\n",
            '<20>{#p/basic}{~}{#e/glyde/5}呀哈哈！\n哥們回頭見！'
        ],
        fightItem1: (zero: boolean) => [
            '<20>{#p/basic}{~}哇，嘿，\n這是我想的那玩意嗎？',
            "<20>{#p/basic}{~}我好興奮喔！\n見到一個滿意的顧客\n真的感覺超好。",
            ...(zero ? [] : ['<20>{#p/basic}{~}無論如何，\n正如我所說的...'])
        ],
        fightItem2: () => [
            '<20>{#p/basic}{~}{#e/glyde/5}又一個！？',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/12}天吶，「$(moniker2)」，\n你這人酷斃了！'
                : "<20>{#p/basic}{~}{#e/glyde/12}天吶，人類，\n你這人酷斃了！",
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            "<20>{#p/basic}{~}{#e/glyde/10}告訴你吧，\n我要潤去煩別的傢伙了。\n",
            '<20>{#p/basic}{~}{#e/glyde/5}呀哈哈！\n哥們回頭見！'
        ],
        intro1: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}呀哈哈，\n吃我這招，臭機器人！'],
        intro2a: () =>
            !world.badder_lizard
                ? ['<20>{#p/mettaton}你明知道ALPHYS\n和我還在這。']
                : ["<20>{#p/mettaton}你明知道我還在這兒。"],
        intro2b: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}閉嘴！這現在是\n我的舞臺了，機器怪。'],
        intro2c: ['<20>{#p/mettaton}（還蠻有意思。）'],
        intro3: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}哥們我有故事要講！'],
        status1: ['<32>{#p/story}* Glyde撲了過來！'],
        turn1a: () => [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/10}你不跟我戰鬥嗎？',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/0}...真是新奇事，\n你可是個典型反派啊。'
                : '<20>{#p/basic}{~}{#e/glyde/0}...我猜你會的。'
        ],
        turn1b: () => [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/7}噢，\n我喜歡你的鬥志。',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/10}挺搭你的外號哈。'
                : "<20>{#p/basic}{~}{#e/glyde/10}那會對你\n很有幫助的..."
        ],
        turn1c: ["<20>{#p/basic}{~}{#e/glyde/10}咔哈哈...\n無意冒犯，不過你看\n我倆物種搭嗎？"],
        turn1d: ["<20>{#p/basic}{~}{#e/glyde/9}對不起啊，\n不給錢我是不會\n提供面板資訊的。"],
        turn1e: [
            "<20>{#p/basic}{~}{#e/glyde/4}幾周前，\n我在思考\n關於賺錢的事...",
            '<20>{#p/basic}{~}{#e/glyde/0}然後我注意到\n利潤下降了。'
        ],
        turnStatus1: ['<32>{#p/story}* Glyde看見自己的倒影，\n  心生嫉妒。'],
        turn2: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}我那100%\n絕對合法的生意...',
            '<20>{#p/basic}{~}{#e/glyde/8}被人造謠成\n售賣假冒偽劣產品！',
            '<20>{#p/basic}{~}{#e/glyde/1}我就一直在想\n「這開的什麼星際玩笑」。'
        ],
        turnStatus2: ['<32>{#p/story}* Glyde在想「時髦」\n  這個詞的新俚語。'],
        turn3: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}向你擔保，我的牛排企業\n在這前哨站可稀罕了。',
            '<20>{#p/basic}{~}有啥比得上那些\n上好的無骨牛排呢！',
            '<20>{#p/basic}{~}聽明白沒？\n什麼都比不上！'
        ],
        turnStatus3: ['<32>{#p/story}* 傲慢之風吹了過來。'],
        turn4: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/0}你說關你啥事？',
            '<20>{#p/basic}{~}{#e/glyde/2}呃...',
            '<20>{#p/basic}{~}{#e/glyde/2}你...',
            "<20>{#p/basic}{~}{#e/glyde/5}你可是我司銷售額\n唯一靠得住的救星啊！"
        ],
        turnStatus4: ['<32>{#p/story}* Glyde做了個花式空翻。'],
        turn5: () => [
            iFancyYourVilliany()
                ? '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}有臭名昭著的\n「$(moniker2)」幫我打廣告，\n銷售額還用愁嗎？\n那時，誰都阻止不了我！'
                : "<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}有Mettaton的掌上明珠\n幫我打廣告，\n銷售額還用愁嗎？\n那時，誰都阻止不了我！",
            "<20>{#p/basic}{~}{#e/glyde/7}我們的財富多得離譜！\n就算是我爹Gliden\n也難以望其項背啊！"
        ],
        turn5a: ["<20>{#p/alphys}一味攻擊人類\n估計沒法統一戰線喔。"],
        turn5b: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/1}這叫「展現實力」，齙牙仔{#x1}。',
            '<20>{#p/basic}{~}{#e/glyde/9}到底怎麼才能贏得\n商業合作夥伴的\n尊重呢？'
        ],
        turn5c: ["<20>{#p/basic}{~}{#e/glyde/10}真是啥都不懂。"],
        turnStatus5: ['<32>{#p/story}* Glyde在和自己擊掌...\n  管它怎麼做到的。'],
        turn6a: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}夥計，你現在咋想的？'],
        turn6b: ['<20>{#p/basic}{#p/basic}{~}淦。'],
        turn6c: () => [
            '<20>{#p/basic}{#e/bpants/12}為什麼總要我來\n趕走這死傢伙？',
            '<20>...',
            '<20>{#e/bpants/0}小傢伙，對不住了，\n給你添麻煩了。',
            "<20>{#e/bpants/11}很高興認識你，\n叫我堡兄就行。",
            ...(ateThreshold() || (world.badder_lizard && world.bad_lizard > 1)
                ? [
                    "<20>{#e/bpants/6}Glyde來這鬧事有...",
                    "<20>{#e/bpants/12}...嘿，你不就是那個\n濫殺無辜的毛頭小子嗎！"
                ]
                : burger()
                    ? [
                        "<20>{#e/bpants/6}Glyde來這鬧事有...",
                        "<20>{#e/bpants/12}...嘿，你不就是那個\n把星港居民殺了個乾淨的\n毛頭小子嗎！"
                    ]
                    : world.population === 0 && world.bullied
                        ? [
                            "<20>{#e/bpants/6}Glyde來這鬧事有...",
                            "<20>{#e/bpants/12}...嘿，你不就是那個\n喜歡揍人的毛頭小子嗎？"
                        ]
                        : [
                            "<20>{#e/bpants/6}Glyde來這鬧事有好久了...",
                            "<20>{#e/bpants/1}那個毛線球最好\n能讓他把事情搞搞明白，\n根本就沒人想買它的\n垃圾玩意兒！"
                        ])
        ],
        turn6d: [
            '<20>{#p/mettaton}漢堡褲！',
            "<20>太好了，你來啦。",
            "<20>（別擔心，一見著你，\n我就中斷了直播。）"
        ],
        turn6e: () =>
            ateThreshold()
                ? [
                    "<20>{#p/basic}{#e/bpants/12}你搞清楚\n眼前這是什麼人嗎？",
                    '<20>{#e/bpants/3}讓這傢伙上電視，\n你在想些什麼啊！？'
                ]
                : ["<20>{#p/basic}{#e/bpants/12}我可不跟你幹了，\n少來煩我。"],
        turn6f: () =>
            ateThreshold()
                ? ['<20>{#p/mettaton}哎呀，對不起嘛...', "<20>原來播電視節目\n還犯法啊。"]
                : ['<20>{#p/mettaton}哎呀，對不起嘛...', "<20>我還不知道\n你這麼討厭我呢。"],
        turn6g: [
            '<20>{#p/basic}{#e/bpants/12}...',
            "<20>{|}{#p/basic}{#e/bpants/2}待不下去了\n我要走- {%}"
        ],
        turn6h: [
            "<20>{#p/mettaton}不-過-呢\n咱還有事要辦\n要是你不介意的話 {%}",
            '<20>請您見諒\n離開舞臺謝謝\n祝您今天愉快。'
        ],
        hurtStatus: ['<32>{#p/story}* Glyde有危險了。']
    },

    b_opponent_mettaton1: {
        artifact: ['<33>{#p/human}* （看你拿出神器，\n  Mettaton只是聳了聳肩。）'],
        name: '* Mettaton',
        epiphaNOPE: ["<20>{#p/mettaton}這可不行，親愛的..."],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）\n* （Mettaton吸收了這一槍的電能。）'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）\n* （Mettaton一點沒受影響。）'
        ],
        old_spray_text: ['<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）\n* （Mettaton把糖霧吃掉了。）'],
        old_gun_talk: ['<20>{#p/mettaton}多麼驚人的舉動。'],
        old_bomb_talk: ["<20>{#p/mettaton}就像是一臺免費\n的舞臺煙霧機！"],
        old_spray_talk: ['<20>{#p/mettaton}多麼刺激。'],
        status1: () =>
            SAVE.data.n.plot < 67
                ? ['<32>{#p/story}* Mettaton開始了他的表演！']
                : ['<32>{#p/story}* Mettaton閃亮返場！'],
        act_check: () =>
            SAVE.data.n.plot < 67
                ? ['<32>{#p/story}* METTATON - 攻擊30 防禦255\n* 他的金屬制的身體\n  使他無懈可擊。']
                : ['<32>{#p/story}* METTATON - 攻擊30 防禦255\n* 沒想到，他的金屬身體\n  竟然使他無懈可擊！'],
        act_flirt: ['<32>{#p/human}* （你向Mettaton調情。）'],

        yellow1: () =>
            world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
                ? [
                    '<20>{#p/mettaton}你那紅色到底\n是怎麼回事？{^40}{%}',
                    "<20>{#p/mettaton}{#x1}你應該知道這樣\n可不能入場吧...{^40}{%}"
                ]
                : [
                    "<20>{#p/mettaton}喔，親愛的，\n我看到了什麼？\n一抹紅色？{^40}{%}",
                    "<20>{#p/mettaton}{#x1}天吶，天吶...\n你那紅色\n用的也夠久了。{^40}{%}"
                ],
        yellow2: () => [
            world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
                ? '<20>{#p/mettaton}哇！！！\n這下好多了！！！\n現在你可以按[Z]射擊！！！{^40}{%}'
                : "<20>{#p/mettaton}魔法，很奇妙吧？？？\n現在你可以按[Z]射擊！！！{^40}{%}",
            "<20>{#p/mettaton}（你也可以\n按住[C]來連射，\n但那就沒意思了嘛。）{^40}{%}"
        ],

        checkTalk: ["<20>{#p/mettaton}欣賞ALPHYS的\n令人驚嘆的技術了？\n我不予置評。"],
        attackTalk: () =>
            SAVE.data.n.plot < 67
                ? ["<20>{#p/mettaton}你這小傻瓜。\n這對我沒用，\n親愛的！"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}聽著，親愛的。\n我今天已經受夠了\n疼痛。你不介意吧？"]
                    : ["<20>{#p/mettaton}聽著，親愛的。\n繼續攻擊對你來說根本\n無濟於事。尤其是現在。"],
        flirtTalk: ['<20>{#p/mettaton}喔喔喔...', '<20>見到我很興奮啊，\n是吧？', "<20>我會記住的，親愛的~"],

        turn1: [
            "<20>{#p/mettaton}我們先從\n簡單的開始...",
            '<20>唱歌！',
            '<20>{|}你能夠- {%}'
        ],
        turn1a1: ['<20>...\n等一下。', '<20>是我的錯覺，\n還是...', '<20>你今天看起來\n有點「紅」呢？'],
        turn1a2: ['<20>博士，如果\n你可以的話...'],
        turn1b1: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ["<20>{#p/alphys}好，好！\n我-我會的！"]
                : world.bad_lizard < 1
                    ? ['<20>{#p/alphys}呃，好！']
                    : ['<20>{#p/alphys}...嗯？'],
        turn1b2: () =>
            SAVE.data.n.state_foundry_undyne > 0 || world.bad_lizard < 1
                ? ['<20>{#p/alphys}請-請原諒我...']
                : ['<20>{#p/alphys}喔-喔，好的。'],
        turn1c: ['<20>{*}{#p/mettaton}好多了。{^30}{%}'],
        turn1d: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{*}{#p/alphys}現-現在按[Z]\n來傳送。{^30}{%}']
                : world.bad_lizard < 1
                    ? ['<20>{*}{#p/alphys}所以...\n你-你可以四處移動，\n然後按[Z]傳送！{^30}{%}']
                    : ['<20>{*}{#p/alphys}四處移動，\n然後按[Z]傳送。{^30}{%}'],
        turn1e: ['<20>{*}{#p/mettaton}ALPHYS，ALPHYS，\nALPHYS...{^30}{%}'],
        turn1f: ['<20>{*}我不是跟你說過\n不要給提示嗎？{^30}{%}'],
        turn1g: ['<20>{*}...{^30}{%}', '<20>{*}總之...{^30}{%}', "<20>{*}我們開始表演吧！{^30}{%}"],

        turn2: ["<20>{#p/mettaton}不要錯過任何一個\n音符，親愛的！"],
        turn3: ["<20>{#p/mettaton}我們來玩點\n刺激的吧。"],

        turn4a1: [
            "<20>{#p/mettaton}不得不說，你對待\n這場演出就像一個\n真正的偶像。",
            '<20>但現在，你要和我們\n的特別嘉賓一「鰭」\n登「唱」表演了！'
        ],
        turn4a2: [
            "<20>{#p/mettaton}我得說，到目前\n為止你的表現\n還不是最好的。",
            '<20>也許你需要的\n是一點競爭的\n刺激！'
        ],
        turn4e: ['<20>{#p/mettaton}...', '<20>她在...'],
        turn4f: ["<20>{#p/basic}她死了。"],
        turn4g: ["<20>{#p/mettaton}喔，\n太遺憾了。"],
        turn4h: ['<20>{#p/mettaton}親愛的觀眾...\n讓我們拿出一點時間\n為SHYREN默哀。'],
        turn4i: ['<20>{#p/mettaton}好了，差不多了。'],
        turn4j: () => [
            iFancyYourVilliany() ? '<20>{#p/mettaton}運氣不錯， $(moniker3u)！' : '<20>{#p/mettaton}運氣不錯！',
            '<20>我覺得你可以\n跳過這部分了。',
            "<20>我們不能繼續唱歌\n真的太遺憾了，\n但是...",
            '<20>上半場結束，\n下半場必須開始。',
            "<20>...來跳舞吧！"
        ],

        turn5a1: ["<20>{#p/mettaton}使出全力吧，\nSHYREN！"],
        turn5a2: () =>
            SAVE.data.b.bullied_shyren
                ? ['<20>{#p/mettaton}SHYREN...？']
                : [
                    '<20>{#p/mettaton}很迷人，哈？',
                    "<20>{#p/mettaton}別著急。\nSHYREN的歌聲\n對每個人來說\n都是這樣的。"
                ],

        turn5end1: () =>
            SAVE.data.b.bullied_shyren
                ? [
                    "<20>{#p/mettaton}...也許Shyren\n今天只是狀態不好。",
                    '<20>多麼悲劇。',
                    '<20>對了，我有說過\n你的聲音越來越\n無聊了嗎？'
                ]
                : [
                    "<20>{#p/mettaton}喔，\nSHYREN太可愛了，\n是吧？",
                    "<20>如果按我的方式，\n她早就是\n超級巨星了...",
                    '<20>喔。對了，\n我有說過你\n聲音越來越\n無聊了嗎？'
                ],
        turn5end2: [
            "<20>但別擔心，\n解決辦法\n顯而易見。",
            "<20>任何優秀的\n節目機器人都\n知道...",
            '<20>...沒有舞蹈\n就沒有音樂！'
        ],

        turn6: ['<20>{#p/mettaton}放馬來吧！'],

        turn7a: [
            '<20>{#p/mettaton}聽到了嗎，\n親愛的...？',
            "<20>...那就對了。",
            '<20>觀眾們可是\n很希望看到\n節目效果的！',
            '<20>現在有請\n憤怒的人偶。'
        ],
        turn7b1: ['<20>{#p/basic}又是你。'],
        turn7b2: ['<20>{#p/basic}又是你！'],
        turn7b3: ['<20>{#p/basic}又-是-你！！！'],
        turn7c: ['<20>{#p/mettaton}喔，你們兩個\n彼此認識嗎？'],
        turn7d1: ['<20>{#p/basic}...\n可能認識吧。\n也可能不認識。'],
        turn7d2: ["<20>{#p/basic}反正你又\n不在乎！"],
        turn7e: [
            '<20>{#p/mettaton}哇，沒必要\n對我這麼\n充滿敵意...',
            '<20>{#p/mettaton}這只是一場\n不起眼的\n達人秀表演！'
        ],
        turn7f: [
            "<20>{#p/basic}這是你兩周內\n第二次讓我\n上節目了！",
            '<20>{#p/basic}你是喜歡我\n還是怎麼的！？'
        ],
        turn7g1: [
            "<20>{#p/mettaton}...\n別胡說八道。",
            "<20>{#p/mettaton}我找你來只是\n因為你很有\n節目效果！"
        ],
        turn7g2: ["<20>{#p/basic}（我表親以前\n也是這麼說的...）"],
        turn7h: ['<20>{#p/basic}喔，你好呀。\n很高興見到你！'],
        turn7i: ["<20>{#p/mettaton}...然後？", '<20>{#p/mettaton}不打算再說點什麼嗎？'],
        turn7j1: ["<20>{#p/basic}Mettaton，\n我不是什麼時候\n都會衝人發火，\n你應該知道吧？"],
        turn7j2: ["<20>{#p/basic}...難道兩周前\n你拽著我上臺時\n我沒說嗎？"],
        turn7k: [
            "<20>{#p/mettaton}喔。\n這樣挺好的。",
            "<20>{#p/mettaton}但我們沒時間\n讓你拽那些小情話。"
        ],
        turn7l1: ['<20>{#p/basic}好...', "<20>{#p/basic}（我表親說話好像\n就這個腔調來著...）"],
        turn7l2: ["<20>我上了。"],
        turn7l3: ["<20>你想看我們打一架，\n那我們就打給你看！"],
        turn7m: ['<20>{#p/mettaton}好，\n那肯定很有趣的。'],
        turn7n: ['<20>{#p/mettaton}呃... 你好？'],
        turn7o1: () => [
            ...(iFancyYourVilliany()
                ? ['<20>{#p/mettaton}...', '<20>看來我們親愛的\n$(moniker2u)沒有舞伴了。']
                : ['<20>{#p/mettaton}...', '<20>看來我們可憐的\n人類沒有舞伴了。']),
            '<20>多麼不幸...',
            '<20>但是演出必須繼續！'
        ],
        turn7o2: [
            '<20>{#p/mettaton}...',
            "<20>你今天一帆風順啊，\n親愛的。",
            "<20>沒有人對你感興趣，\n也沒人活著來見你。",
            '<20>喔好吧...',
            '<20>演出必須繼續！'
        ],

        turn8a1: ['<20>{#p/mettaton}要不遺餘力！'],
        turn8a2: ['<20>{#p/mettaton}應付不了這麼多的\n棉花，是嗎？', '<20>{#p/mettaton}哎呀，太糟糕了！'],

        turn8end1a: [
            "<20>{#p/mettaton}盛名難卻啊，\n但這並不失得體。",
            "<20>誠然，\n您的表演無可挑剔。",
            '<20>親愛的觀眾朋友們，\n請拿出小本本記好了！',
            '<20>這，就是你\n拿到檯面上的東西！'
        ],
        turn8end1b: [
            '<20>{#p/mettaton}也許你沒有\n最棒的嗓音，\n但是你的舞蹈...',
            '<20>喔——\n可以說驚為天人！'
        ],
        turn8end2b: () => [
            ...[
                [
                    '<20>{#p/mettaton}有一個「$(moniker1u)」\n的外號，你的表現這樣\n令人失望也並不奇怪！\n',
                    '<20>{#p/mettaton}我【曾】希望\n你能有更好的表現...'
                ],
                ['<20>{#p/mettaton}有一個「$(moniker1u)」\n的外號，你的表演\n更應充滿【活力】！'],
                ['<20>{#p/mettaton}有一個「$(moniker1u)」\n的外號，\n你一定要風流倜儻！'],
                ['<20>{#p/mettaton}有一個「$(moniker1u)」\n的外號，你的技巧\n更應震撼！'],
                ['<20>{#p/mettaton}「$(moniker1u)」，\n你可不能被別人\n搶了風頭啊！']
            ][SAVE.data.n.state_aerialis_moniker],
            "<20>{#p/mettaton}也許你沒這個覺悟吧。"
        ],
        turn8end2a: () => [
            ...[
                [
                    "<20>{#p/mettaton}好吧，$(moniker3u)，\n我沒想到會這樣！",
                    '<20>{#p/mettaton}我【本以為】\n又要失望，\n但是...'
                ],
                ['<20>{#p/mettaton}好吧，\n親愛的$(moniker1u)...', "<20>我敢肯定，\n你那年輕的皮囊底下\n一定藏著\n一位著名明星！"],
                ['<20>{#p/mettaton}好吧，\n親愛的$(moniker1u)...', '<20>這場演出值得\n雷鳴般的掌聲！'],
                ['<20>{#p/mettaton}好吧，\n親愛的$(moniker1u)...', '<20>我們的觀眾\n熱情迸發了！'],
                ['<20>{#p/mettaton}好吧，\n親愛的$(moniker1u)...', "<20>你將這裡變成了\n你自己的舞臺！"]
            ][SAVE.data.n.state_aerialis_moniker],
            "<20>{#p/mettaton}也許\n你仍有希望。"
        ],
        turn8end3a: [
            "<20>{#p/mettaton}...我真不明白\n你的成績怎麼\n這麼糟糕。",
            '<20>明明早些時候\n你表現得\n很不錯來著。',
            '<20>喔好吧。\n可能，這也是\n常有的事吧。'
        ],
        turn8end3b: [
            '<20>{#p/mettaton}...沒人告訴過你\n你有多菜嗎？',
            '<20>搞砸一場聲樂表演\n是一回事。',
            '<20>但這個呢...？\n這真的是太悲哀了。'
        ],
        turn8end4: ['<20>{#p/mettaton}唉...\n我們還有一場表演\n需要完成。'],
        turn8end5: ['<20>{#p/mettaton}女士們，先生們...', '<20>掌聲有請...'],
        turn8end6: ['<20>舉世無雙的\nALPHYS博士！'],

        turn9a: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{|}{#p/mettaton}你將如何應對- {%}']
                : ['<20>{#p/mettaton}你將如何應對，\n這最後的挑戰呢？'],
        turn9b: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{#p/alphys}不-不！']
                : world.bad_lizard < 1
                    ? ['<20>{*}{#p/alphys}你-你在開玩笑嗎？{^30}{%}']
                    : ['<20>{*}{#p/alphys}{#e/alphys/7}...'],
        turn9bx: ["<20>{#p/alphys}你不能強迫我\n做我不願做的事。"],
        turn9c: ["<20>{*}{#p/alphys}我不能...{^30}{%}"],
        turn9d: ['<20>{*}{#p/alphys}我...{^30}{%}'],
        turn9e: () =>
            world.bad_lizard < 1
                ? ["<20>{#p/alphys}我-我做不到！"]
                : ["<20>{#p/alphys}{#e/alphys/4}我不確定這是不是\n一個好主意。"],

        turn9end1: ['<20>{#p/mettaton}有什麼問題嗎，\n親愛的？'],
        turn9end2: () => [
            ...[
                [
                    "<20>{#p/alphys}{#e/alphys/4}我-我不想傷害人類，\nMettaton...",
                    '<20>{#p/alphys}{#e/alphys/7}我們先前和他們的關係\n可能有點緊張，但是...',
                    "<20>{#e/alphys/6}這並不意味著這個人類\n與以前的人類一樣，\n是吧？",
                    "<20>{#e/alphys/8}所以我覺得...\n就這樣繼續攻擊人類\n有點太不公平了。"
                ],
                [
                    "<20>{#p/alphys}{#e/alphys/7}我知道人類做了一些...\n不可饒恕的錯誤...",
                    '<20>{#p/alphys}{#e/alphys/6}但話說回來，\n想想一些怪物\n對待人類的方式...？',
                    "<20>{#p/alphys}{#e/alphys/8}這樣就不奇怪了。",
                    "<20>{#p/alphys}{#e/alphys/4}而且，我...\n有-有點擔心我會\n傷到人類..."
                ]
            ][world.bad_lizard]
        ],
        turn9end3: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{#p/mettaton}好吧...', '<20>博士，\n既然你這麼說。']
                : ['<20>{#p/mettaton}嗯...', '<20>博士，這想法挺新奇。'],
        turn9end4: ["<20>我可不敢苟同。{#e/alphys/1}"],
        turn9end5: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ["<20>很遺憾觀眾沒能看到\n接下來的發展。{#e/alphys/28}"]
                : [
                    '<20>在我看來，\n一場優質電視劇的核心\n便是衝突與矛盾！{#e/alphys/2}',
                    '<20>又有誰能\n否認這一點呢？'
                ],
        turn9end6: [
            "<20>{#p/mettaton}{#e/alphys/0}行吧，總而言之\n我們的時間\n已經所剩無幾了。",
            "<20>所以...\n今天的節目到此結束！",
            '<21>夥計們，下期節目\n正在加急製作中，\n我們不見不散！',
            "<20>你一定不想錯過！"
        ],
        turn9end7a: ['<20>{#p/alphys}好吧。'],
        turn9end7b: ["<20>{#p/alphys}認真的？\n你一次都沒失誤。"],
        turn9end7c: ['<20>{#p/alphys}...'],

        turn1status: ["<32>{#p/story}* 電擊時間到了。"],
        turn2status: ['<32>{#p/story}* Mettaton鼓起了機器手掌。'],
        turn3status: ["<32>{#p/story}* 一連串的八度音。"],
        turn4status: ["<32>{#p/story}* Shyren的歌聲\n  在實驗室裡迴響。"],
        turn4statusX: ['<32>{#p/story}* Mettaton不敢落下一滴眼淚。'],
        turn5status: ['<32>{#p/story}* Mettaton展示了一個舞蹈動作。'], 
        turn6status: ['<32>{#p/story}* 放克音樂空前熱烈。'],
        turn7status: ['<32>{#p/story}* 聞起來像瘋人院。'],
        turn7statusX: ['<32>{#p/story}* Mettaton正在擺弄著\n  他的麥克風。'],
        turn8status: ['<32>{#p/story}* Mettaton引人注目地指著鏡頭。'],

        turn2react1: ['<20>{#p/mettaton}幹得漂亮！'],
        turn3react1: ['<20>{#p/mettaton}非常好！'],
        turn4react1: ['<20>{#p/mettaton}太棒了！'],
        turn5react1: ['<20>{#p/mettaton}優秀！'],
        turn6react1: ['<20>{#p/mettaton}真讓人\n「星」動！'],
        turn7react1: ["<20>{#p/mettaton}就是這樣！"],
        turn8react1: ["<20>{#p/mettaton}拿下！"],
        turn8reactMD1a: ['<20>{#p/basic}嗯，\n太勁爆了！', '<20>{#p/basic}回頭再見啊，人類！'],
        turn8reactMD2a: ['<20>{#p/basic}...', '<20>{#p/basic}別再來了。'],

        turn2react2: ['<20>{#p/mettaton}啊喔...'],
        turn3react2: ['<20>{#p/mettaton}就差一點...'],
        turn4react2: ['<20>{#p/mettaton}真倒霉...'],
        turn5react2: ['<20>{#p/mettaton}真不幸...'],
        turn6react2: ['<20>{#p/mettaton}廢物！'],
        turn7react2: ['<20>{#p/mettaton}真令人失望。'],
        turn8react2: ['<20>{#p/mettaton}什-麼-鬼。'],
        turn8reactMD1b: ["<20>{#p/basic}希望我下手沒太狠。", '<20>{#p/basic}回頭再見啊，人類！'],
        turn8reactMD2b: ['<20>{#p/basic}可悲。\n可悲！\n可-悲-！', '<20>{#p/basic}你活該。'],
        missIndicator: '漏擊：$(x)',

        idleTalk1: () =>
            world.bad_lizard < 2 && !iFancyYourVilliany()
                ? [
                    "<20>{#p/mettaton}所以我們已然\n走到了最後，\n是吧？",
                    "<20>{#p/mettaton}馬上就能搖身一變，\n成為超級巨星，\n感想如何？"
                ]
                : [
                    "<20>{#p/mettaton}所以我們已然\n走到了最後，\n是吧？",
                    "<20>{#p/mettaton}生命快走到頭了，\n感想如何？"
                ],
        idleTalk2: () =>
            iFancyYourVilliany()
                ? ['<20>{#p/mettaton}那些被你傷害過的人\n夜晚一定會輾「轉」反側。']
                : world.bad_lizard < 2
                    ? ['<20>{#p/mettaton}「轉」過頭回望\n你曾做的一切，\n你一定想要改變自己。']
                    : ['<20>{#p/mettaton}要是你走夜路，\n被你殺死的人一定會\n在你「轉身」時\n掐住你的脖子。'],
        idleTalk3: ['<20>{#p/mettaton}我們只希望事情\n不會「轉」移到\n最壞的方向。'],
        idleTalk4: () =>
            world.bad_lizard < 2
                ? ['<20>{#p/mettaton}我得說，看到你在臺上\n「專」心致志地表演\n可真讓人興奮。']
                : ['<20>{#p/mettaton}我得說，這情況一定會\n讓人感覺胃裡有東西在\n「翻轉」並且吃不下飯。'],
        idleTalk5: ["<20>{#p/mettaton}（快讓我轉身。）"],
        idleTalk6: ['<20>{#p/mettaton}...'],
        flirtTalk1: () =>
            SAVE.data.b.flirt_mettaton
                ? [
                    '<20>{#p/mettaton}回想起你的調情方式，\n呃...？',
                    '<20>{#p/mettaton}你，我的朋友，\n是對社會的一個\n真正的威脅。'
                ]
                : ['<20>{#p/mettaton}喔喔喔...', '<20>...', '<20>也許你現在\n不應該這樣做。'],
        flirtTalk2: () =>
            SAVE.data.b.flirt_mettaton
                ? ["<20>{#p/mettaton}你不知道放棄嗎？"]
                : ['<20>{#p/mettaton}或者你可以繼續。'],
        flirtTalk3: () =>
            SAVE.data.b.flirt_mettaton ? ['<20>{#p/mettaton}我猜確實。'] : ['<20>{#p/mettaton}繼續。'],
        flirtTalk4: ["<20>{#p/mettaton}...\n你沒更好的事可做嗎？"],
        flirtTalk5: ['<20>{#p/mettaton}...'],
        act_turn: ["<32>{#p/human}* （你告訴Mettaton，\n  他後面有一面鏡子。）"],
        turnTalk1: ['<20>{#p/mettaton}鏡子？', '<20>喔對，這場壓軸好戲，\n儀容儀表可不能差！'],
        turnTalk2: ["<20>{#p/mettaton}嗯... 在哪呢？\n我怎麼沒看見..."],
        turnTalk3: ['<20>{#p/mettaton}你是不是', '<20>動了', '<20>我的開關？'],
        turnTalk4: () =>
            world.bad_robot
                ? [
                    '<18>{#p/mettaton}喔吼吼...',
                    '<18>如果你對我的\n颯爽英姿期待已久，\n那麼，就請好好欣賞...',
                    '<18>這副前所未有的\n更快，更強，\n更輕的身軀。',
                    "<18>我已經和身體\n融為一體。",
                    "<19>真是遺憾啊，\n只有在現場直播中，\n觀眾才能將你的暴行\n盡收眼底。",
                    "<19>不過沒事。",
                    '<18>就此一回，為了你，\n豁出去了...'
                ]
                : [
                    '<18>{#p/mettaton}喔——\n天哪。',
                    '<18>你動了我的開關，\n也就是說...',
                    ...(iFancyYourVilliany()
                        ? [
                            "<18>你不顧一切地想要\n直面我的最終形態。",
                            '<18>多沒耐心...',
                            "<18>運氣不錯，\n我早就想將它\n秀一下了。",
                            "<18>所以，作為感謝，\n我保證會讓你\n體面地離開。",
                            "<18>我會讓這場\n最終的對峙變得..."
                        ]
                        : [
                            "<18>你迫不及待地想看到\n我新身體的\n首次公演。",
                            '<18>多沒耐心...',
                            "<18>運氣不錯，\n我早就想要\n展示一下了。",
                            "<18>所以，作為感謝，\n我要給你一筆\n豐厚的獎金。",
                            "<18>我會讓你在生命\n的最後一刻變得..."
                        ])
                ],
        turnTalk5: () =>
            world.bad_robot
                ? ["<18>{*}...我們下播。"]
                : iFancyYourVilliany()
                    ? ['<18>{#p/mettaton}{*}...精彩絕倫！']
                    : ['<18>{#p/mettaton}{*}...無與倫比的美妙！'],
        act_burn: ['<32>{#p/human}* （你嘲笑Mettaton在自己的\n  電視節目表現得有多爛。）'],
        burnTalk1: ['<20>{#p/mettaton}就這？'],
        burnTalk2: ['<20>{#p/mettaton}你罵人的技術含量\n不如ALPHYS一根。'],
        burnTalk3: ["<20>{#p/mettaton}無意冒犯，\n但你太拉了。"],
        burnTalk4: ['<20>{#p/mettaton}...\n也許你該幹點別的。'],
        burnTalk5: ['<20>{#p/mettaton}...']
    },

    b_opponent_mettaton2: {
        artifact: () => [
            '<33>{#p/human}* （看你拿出神器，\n  Mettaton只是聳了聳肩。）',
            ...(world.genocide || world.bad_robot ? [] : ['<32>{#p/basic}* 觀眾也並不在意。'])
        ],
        epiphaNOPE: () =>
            world.genocide || world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/25}你那小把戲對我沒用，\n親愛的。"]
                : iFancyYourVilliany()
                    ? ["<20>{#p/mettaton}{#e/mettaton/19}你應該知道，\n這與你的風格並不搭。"]
                    : ['<20>{#p/mettaton}{#e/mettaton/19}無論何時何地，\n親愛的...'],
        hint: ["<32>{#p/basic}* 好的，搭檔...\n* 現在看你的了。"],
        name: () => (world.genocide ? '* Mettaton NEO' : world.bad_robot ? '* Mettaton SIGMA' : '* Mettaton EX'),
        spannerReaction: (repeat: boolean) =>
            world.genocide
                ? ['<32>{#p/human}* （你把扳手扔了出去。）\n* （Mettaton直接將它炸成了碎片。）']
                : world.bad_robot
                    ? [
                        '<32>{#p/human}* （你把扳手扔了出去。）\n* （Mettaton接住扳手，\n  朝你的頭砸了過去。）',
                        "<32>{#p/basic}* 疼死了！"
                    ]
                    : repeat
                        ? iFancyYourVilliany()
                            ? [
                                '<32>{#p/human}* （你把扳手扔了出去。）\n* （Mettaton又熱情地踢了回來。）',
                                '<32>{#p/basic}* 觀眾開始打哈欠了...'
                            ]
                            : [
                                '<32>{#p/human}* （你把扳手扔了出去。）\n* （Mettaton用嘴接住，叼了回來。）',
                                '<32>{#p/basic}* 觀眾開始打哈欠了...'
                            ]
                        : iFancyYourVilliany()
                            ? [
                                '<32>{#p/human}* （你把扳手扔了出去。）\n* （Mettaton又熱情地踢了回來。）',
                                '<32>{#p/basic}* 觀眾沸騰了！'
                            ]
                            : [
                                '<32>{#p/human}* （你把扳手扔了出去。）\n* （Mettaton用嘴接住，叼了回來。）',
                                '<32>{#p/basic}* 觀眾沸騰了！'
                            ],
        old_gun_text: () =>
            world.genocide || world.bad_robot
                ? ['<32>{#p/human}* （你開了一槍。）\n* （什麼都沒發生。）']
                : ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* 觀眾都嚇壞了！'],
        old_bomb_text: () =>
            world.genocide || world.bad_robot
                ? ['<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）\n* （除此之外，什麼都沒發生。）']
                : [
                    '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
                    '<32>{#p/basic}* 觀眾紛紛做起了白日夢！'
                ],
        old_spray_text: () =>
            world.genocide || world.bad_robot
                ? ['<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）\n* （什麼都沒發生。）']
                : ['<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）', '<32>{#p/basic}* 觀眾亂作一團。'],
        act_check: () =>
            world.genocide
                ? ["<32>{#p/asriel2}* Mettaton。\n* 發什麼呆？快去攻擊他啊！"]
                : world.bad_robot
                    ? [
                        '<33>{#p/story}* METTATON SIGMA - 攻擊255 防禦42\n* 一臺超頻過載的殺人機器。\n  攻擊力大幅提升，但也付出了代價。'
                    ]
                    : ['<32>{#p/story}* METTATON EX - 攻擊47 防禦47\n* 弱點是心形核心。'],
        act_cut1: ['<32>{#p/human}* （你把剪刀搭到了電線上...）'],
        act_cut2: ['<32>{#p/human}* （你繼續剪電線...）'],
        act_cut3: ['<32>{#p/human}* （可是電線已經全都剪斷了。）'],
        tvmReaction: {
            blookpie: () =>
                world.genocide || world.bad_robot
                    ? [
                        '<32>{#p/basic}* 這塊點心使Mettaton想起\n  某個需要他去守護的人...',
                        "<32>{#p/story}* Mettaton的攻擊力提升了！\n* Mettaton的防禦力提升了！"
                    ]
                    : [
                        SAVE.data.b.a_state_hapstablook
                            ? '<32>{#p/basic}* 這塊點心使Mettaton想起\n  一位重要的親人...'
                            : '<32>{#p/basic}* 這塊點心使Mettaton想起\n  某個熟悉的人...',
                        "<32>{#p/story}* Mettaton的攻擊力下降了！\n* Mettaton的防禦力下降了！"
                    ],
            radio: () =>
                world.bad_robot
                    ? [
                        '<32>{#p/human}* （你把收音機遞給了Mettaton。）\n* （他放起了死亡重金屬音樂，\n  並朝你大吼大叫。）'
                    ]
                    : iFancyYourVilliany()
                        ? [
                            '<32>{#p/human}* （你把收音機遞給了Mettaton。）\n* （他放了一段交響樂，\n  以此振奮士氣。）'
                        ]
                        : [
                            '<32>{#p/human}* （你把收音機遞給了Mettaton。）\n* （他來了一首卡拉OK，\n  觀眾也跟著一起唱了起來。）'
                        ],
            fireworks: () =>
                world.bad_robot
                    ? [
                        '<32>{#p/human}* （你把煙花遞給了Mettaton。）\n* （他把煙花綁到火箭發射器上，\n  隨即引燃火箭。）'
                    ]
                    : iFancyYourVilliany()
                        ? [
                            '<32>{#p/human}* （你把煙花遞給了Mettaton。）\n* （他將煙花融入到攻擊中，\n  製造戲劇效果。）'
                        ]
                        : [
                            '<32>{#p/human}* （你把煙花遞給了Mettaton。）\n* （他點燃了煙花，觀眾都驚嘆不已。）'
                        ],
            mewmew: () =>
                world.bad_robot
                    ? [
                        '<32>{#p/human}* （你把玩偶遞給了Mettaton。）\n* （他把玩偶撕成碎片，\n  表演了一手「天女散花」。）'
                    ]
                    : iFancyYourVilliany()
                        ? [
                            "<32>{#p/human}* （你把玩偶遞給了Mettaton。）\n* （他不知道拿玩偶怎麼辦，\n  最後丟掉了。）"
                        ]
                        : [
                            '<32>{#p/human}* （你把玩偶遞給了Mettaton。）\n* （他從容地展示給觀眾，\n  觀眾都被迷住了。）'
                        ]
        },
        act_boast: [
            "<32>{#p/human}* （你說自己下個回合能無傷。）",
            "<32>{#p/basic}* Mettaton的人氣\n  將在下一回合持續上升！"
        ],
        act_heel: [
            '<32>{#p/human}* （你性情大變，嘲笑觀眾。）',
            "<32>{#p/basic}* 觀眾希望你這回合死得很慘！"
        ],
        act_pose0: () =>
            iFancyYourVilliany()
                ? [
                    ['<32>{#p/human}* （你擺出攻勢，殺意滿滿。）', '<32>{#p/basic}* 觀眾已經看膩歪了。'],
                    ['<32>{#p/human}* （你擺出攻勢，殺意滿滿。）', '<32>{#p/basic}* 觀眾似乎很生氣。']
                ]
                : [
                    ['<32>{#p/human}* （你擺出誇張的姿勢。）', '<32>{#p/basic}* 觀眾已經看膩歪了。'],
                    ['<32>{#p/human}* （你擺出誇張的姿勢。）', '<32>{#p/basic}* 觀眾似乎很生氣。']
                ],
        act_pose1: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你擺出攻勢，殺意滿滿。）',
                    '<32>{#p/basic}* 你的動作超有範兒，\n  觀眾都被迷住了！'
                ]
                : ['<32>{#p/human}* （你擺出誇張的姿勢。）', '<32>{#p/basic}* 觀眾讚許地點點頭。'],
        act_pose2: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你擺出攻勢，殺意滿滿。）',
                    "<32>{#p/basic}* 觀眾覺得你的動作力道不夠，\n  興趣不高。"
                ]
                : ['<32>{#p/human}* （你擺出誇張的姿勢。）', '<32>{#p/basic}* 觀眾為你熱烈鼓掌。'],
        act_pose3: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你擺出攻勢，殺意滿滿。）',
                    '<32>{#p/basic}* 你的樣子簡直弱不禁風，\n  觀眾都翻白眼了...'
                ]
                : [
                    '<32>{#p/human}* （儘管受了重傷，\n  你還是盡力擺出漂亮的姿勢。）',
                    '<32>{#p/basic}* 觀眾都為你歡呼。'
                ],
        act_pose4: () =>
            iFancyYourVilliany()
                ? ['<32>{#p/human}* （你擺出攻勢，殺意滿滿。）', '<32>{#p/basic}* 觀眾被你的... 愚蠢震撼到了？']
                : [
                    '<32>{#p/human}* （你用盡最後的力氣，擺出了漂亮的姿勢。）',
                    '<32>{#p/basic}* 觀眾全都驚呼起來。'
                ],
        act_scream0: [
            [
                '<32>{#p/human}* （你大聲尖叫。）',
                "<32>{#p/basic}* 觀眾有點厭倦了。\n* 本回合，你的移速減慢。"
            ],
            [
                '<32>{#p/human}* （你大聲尖叫。）',
                "<32>{#p/basic}* 觀眾有些厭煩了。\n* 本回合，你的移速減慢。"
            ]
        ],
        act_scream: [
            '<32>{#p/human}* （你大聲尖叫。）',
            "<32>{#p/basic}* 觀眾也跟著興奮起來！\n* 本回合，你的移速減慢。"
        ],
        act_flirt0: [
            ['<32>{#p/human}* （你向觀眾調情。）', '<32>{#p/basic}* 觀眾有點厭倦了...'],
            ['<32>{#p/human}* （你向觀眾調情。）', '<32>{#p/basic}* 觀眾有些厭煩了...']
        ],
        act_flirt1: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你向觀眾調情。）',
                    '<32>{#p/basic}* 觀眾沒想到你會這麼做，\n  全都大吃一驚！'
                ]
                : ['<32>{#p/human}* （你向觀眾調情。）', '<32>{#p/basic}* 觀眾一時半會還接受不了...'],
        act_flirt2: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你向觀眾調情。）',
                    '<32>{#p/basic}* 又一次調情！\n* 觀眾陷入了瘋狂！'
                ]
                : ['<32>{#p/human}* （你向觀眾調情。）', '<32>{#p/basic}* 觀眾開始朝你這邊看了。'],
        act_flirt3: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你向觀眾調情。）',
                    '<32>{#p/basic}* 觀眾開始對這些甜言蜜語\n  感到噁心了...'
                ]
                : ['<32>{#p/human}* （你向觀眾調情。）', '<32>{#p/basic}* 這次，你成功吸引了觀眾的目光！'],
        act_flirt4: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* （你向觀眾調情。）',
                    "<32>{#p/basic}* 觀眾愈發感到困惑。"
                ]
                : ['<32>{#p/human}* （你向觀眾調情。）', '<32>{#p/basic}* 觀眾被你深深折服！'],
        status1: (azzy_neo: number) =>
            [
                [
                    "<33>{#p/asriel2}* 我會嘗試用一道法術\n  突破他的護甲。\n* 接住那些黃色的符文！"
                ],
                ['<32>{#p/asriel2}* 再來一次。']
            ][Math.min(azzy_neo, 1)],
        statusX: (hint = false) =>
            world.genocide
                ? ["<32>{#p/asriel2}* 我們遲早會贏的。"]
                : world.bad_robot
                    ? hint
                        ? ["<32>{#p/story}* 似乎戰鬥並不會有什麼用。"]
                        : ['<32>{#p/story}* 電流貫穿了整個房間。']
                    : ['<32>{#p/story}* Mettaton。'],
        statusY: ["<32>{#p/story}* 高壓電極速回流，化作旋風！"],
        turnTalk1: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}真是抱歉啊，親。\n但我要是不把你\n千刀萬剮...",
                    "<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/3}我就會馬上爆炸！"
                ]
                : ['<20>{#p/mettaton}燈光！\n鏡頭！\n開拍！'],
        turnTalk2: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...魚死網破，\n倘若「餘」不死，\n休想「破」我網。",
                    '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...呵。\n還挺有詩意的。'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}幽靈！\n人偶！\n...蝸牛？']
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}浪漫！\n衝突！\n血腥！']
                        : ['<20>{#p/mettaton}復仇！\n懲戒！\n報應！'],
        turnTalk3: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/24}{#a.la/3}{#a.ra/0}別人會輕言放棄，\n但我可不會願賭服輸。"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}情緒顛蕩起伏！"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}是時候\n給你點顏色看看了！"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}我就是\n人見人愛的偶像！"]
                            : ["<20>{#p/mettaton}我就是\n未來的宇宙巨星！"],
        turnTalk4: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}只有這樣，\n我才能脫穎而出。"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}事情發展成這樣，\n實在可惜..."]
                    : iFancyYourVilliany()
                        ? ['<20>{#p/mettaton}$(moniker2)，\n對著鏡頭，笑一個！']
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}親愛的，\n對著鏡頭，笑一個！']
                            : ['<20>{#p/mettaton}大明星，\n對著鏡頭，笑一個！'],
        turnTalk5: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/9}{#a.ra/10}現在，就讓我親手\n把那腐爛的心腸\n從你身體扯出！"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? [
                        '<20>{#p/mettaton}我該如何選擇？\n也許你能幫我。',
                        '<20>{#p/mettaton}準備迎接重要的\n突擊測驗！'
                    ]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}喔——，\n現在是突擊測驗時間！", '<20>希望你並非\n「頭腦簡單」喔！']
                        : !world.badder_lizard
                            ? [
                                "<20>{#p/mettaton}喔——，\n現在是突擊測驗時間！",
                                '<20>{#p/mettaton}真想知道你的\n選擇呢... '
                            ]
                            : [
                                "<20>{#p/mettaton}喔——，\n給你安排了一個\n小測驗。",
                                "<20>{#p/mettaton}希望你喜歡選擇題喔！\n要不就太糟糕了！"
                            ],
        turnTalk6: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}什麼？\n那又冷又硬的東西，\n還配叫「心」？',
                    '<20>{#p/mettaton}{#e/mettaton/30}{#a.la/9}{#a.ra/10}...呵。\n給你瞧瞧，\n什麼才是真正的「心」。'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}並不簡單，是嗎？', '<20>...也許通過心與心的\n交流，能讓我們\n知曉答案。']
                    : SAVE.data.n.state_aerialis_mttanswer === 0
                        ? ['<20>{#p/mettaton}多麼無趣的\n「回答」...', "<20>{#p/mettaton}但並不會怎麼樣！"]
                        : iFancyYourVilliany()
                            ? [
                                '<20>{#p/mettaton}所以你比看起來\n還聰明。',
                                '<20>但是一場戰鬥需要的\n不僅僅是這些\n基礎的知識。',
                                '<20>更需要勇氣！'
                            ]
                            : !world.badder_lizard
                                ? [
                                    "<20>{#p/mettaton}你的回答讓所有人\n都明白你在想啥。",
                                    "<20>{#p/mettaton}為什麼不向你展示一下\n我的內心呢？"
                                ]
                                : ['<20>{#p/mettaton}所以你很喜歡\n選擇題。', "<20>{#p/mettaton}好吧，\n那你絕對不會\n喜歡這個！"],
        turnTalk7: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}盡情垂死掙扎吧..."]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}我又不是沒懷念過\n過去的那些日子。"]
                    : iFancyYourVilliany()
                        ? ['<20>{#p/mettaton}你也許是個惡魔，但你\n能像惡魔一樣跳舞嗎？']
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}隆重推出...\n雙人迪斯科！']
                            : ["<20>{#p/mettaton}戰鬥才剛剛開始！"],
        turnTalk8: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}遲早，\n你將敗在我的手下。']
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}但它也沒有\n那麼迷人..."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}該發揮你的\n最佳水平了！"]
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}能跟上節奏嗎？']
                            : ['<20>{#p/mettaton}音量調到最大！'],
        turnTalk9: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/9}{#a.la/0}{#a.ra/5}那時，\n我族就能重見天日。']
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}管它呢，誰在乎！']
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}燈光！\n鏡頭！\n爆炸！']
                        : ['<20>{#p/mettaton}毀滅！\n湮滅！\n末日！'],
        turnTalk10: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/7}...而我，就是幫他們\n擺脫桎梏的英雄！"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}誰也不會！"]
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}所有東西\n都炸翻天喔！']
                        : ['<20>{#p/mettaton}所有東西都\n狂熱起來！'],
        turnTalk11: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}真是遺憾，我身邊的人，\n只要遇到點困難\n全就躲得老遠。",
                    '<20>{#e/mettaton/12}{#a.la/8}{#a.ra/8}Alphys，Asgore，\n還有那堆表親，\n全是一個熊樣。'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}讓我們花點時間\n思考一下。"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}沒有什麼比中場休息\n更能平息敵人的\n炮火了！"]
                        : !world.badder_lizard
                            ? ['<21>{#p/mettaton}我們的行業協會\n規定的休息時間到了！']
                            : ["<20>{#p/mettaton}休息？\n一點「修養」都沒有，\n還想「休養生息」？"],
        turnTalk12: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}而我呢？\n我可不搞他們\n卿卿我我那一套。",
                    '<20>{#p/mettaton}{#e/mettaton/23}{#a.la/1}{#a.ra/6}而是切中要害\n直入核心！'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? [
                        "<20>{#p/mettaton}我不明白那些幽靈\n為什麼要跟我\n對著幹...",
                        '<20>{#p/mettaton}...我應該相信\n這是出於關愛嗎？'
                    ]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}是時候回到\n這場衝突的核心了！"]
                        : !world.badder_lizard
                            ? [
                                "<20>{#p/mettaton}我們的關係\n變得疏遠了，\n親愛的...",
                                '<20>{#p/mettaton}再來一次心與心\n的交流怎麼樣？'
                            ]
                            : [
                                "<20>{#p/mettaton}我想你該\n好好的上一課了。",
                                "<20>{#p/mettaton}要將這些\n放在心上喔！"
                            ],
        turnTalk13: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}...切。',
                    "<20>{#e/mettaton/25}{#a.la/8}{#a.ra/8}你還不知道\n自己就是個招人煩的\n爛蟲子嗎？"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}再... 再者說，\n我現在還能相信\n他們嗎？']
                    : SAVE.data.b.a_state_armwrecker
                        ? ['<20>{#p/mettaton}手... 手臂？\n有... 有這麼長的腿\n誰還需要手臂啊？']
                        : ["<20>{#p/mettaton}你... 你就學會\n這些嗎？"],
        turnTalk14: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}但你知道，\n大家對於你這種蟲豸\n是什麼態度，對吧？',
                    "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/9}{#a.ra/10}就是一個\n亟待解決的禍患而已。"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}我不-不知道...\n該怎麼想了..."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}讓我們聽...\n聽聽觀眾的\n最後一聲歡呼吧！"]
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}感... 感謝\nAlphys博士幫助我\n的夢想成真！']
                            : ["<20>{#p/mettaton}感... 感謝那些\n為保護我們而犧牲\n生命的人！"],
        turnTalk15: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/10}{#a.ra/0}說實話，\n我挺佩服你這股\n負隅頑抗的勁。",
                    '<20>{#p/mettaton}{#e/mettaton/19}{#a.la/0}{#a.ra/10}不過，\n給你個溫馨提示...',
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}你去打力場，\n都比在這對付我\n來得實在。"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}難道他們的道歉\n是真... 真心的嗎？"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}我不能現在就放...\n放棄！"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}現在輪到我來\n成... 成全你了！"]
                            : ["<20>{#p/mettaton}我保證會讓你的努力\n不... 不會白費！"],
        turnTalk16: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/0}怎麼了？\n聽我說話耳根子難受？",
                    '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}...哼。\n真可惜啊，親！'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}或者這隻...\n只是為了出名？']
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}畢竟我們一同\n經... 經歷了這麼多！"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}我不會擁... \n擁有其他選擇！"]
                            : ["<20>{#p/mettaton}這是我最起...\n起碼可以做的！"],
        turnTalk17: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...']
                : ['<20>{#p/mettaton}{#e/mettaton/12}哈... 啊哈...\n哈... 啊哈...'],
        turnTalk18: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/14}{#a.la/3}{#a.ra/0}果然。\n有的人就是不知悔改...',
                    "<20>{#e/mettaton/13}{#a.la/8}{#a.ra/8}不過\n我也懶得跟你廢話了。",
                    "<20>{#e/mettaton/7}{#a.la/9}{#a.ra/10}從現在開始，\n我會用心幹掉你！"
                ]
                : ['<20>{#p/mettaton}{#e/mettaton/13}必須... 把節目...\n...演下去！'],
        audienceRec0: () =>
            SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/11}（哎...）',
                    '<20>{#e/mettaton/29}好吧...',
                    '<20>{#e/mettaton/10}你看那個。',
                    "<20>{#e/mettaton/20}我從來沒有\n這麼多的觀眾...",
                    "<20>{#e/mettaton/17}到目前為止，\n我們已經達到了\n觀眾來電的裡程碑。",
                    '<20>{#e/mettaton/14}...',
                    "<20>{#e/mettaton/15}讓我們看看觀眾們\n有什麼話\n想對我們說...",
                    '<20>{#e/mettaton/12}...在結束我們的\n傳奇之旅之前。'
                ]
                : [
                    '<20>{#p/mettaton}{#e/mettaton/8}喔—，\n看看這些收視率...',
                    "<20>{#e/mettaton/5}我從來沒擁有過\n這麼多的觀眾！",
                    "<20>{#e/mettaton/7}到目前為止，\n我們已經達到了\n觀眾來電的裡程碑。",
                    "<20>{#e/mettaton/15}讓我們看看觀眾們\n有什麼話\n想對我們說...",
                    iFancyYourVilliany()
                        ? '<20>{#e/mettaton/19}...在真正停戰之前！'
                        : '<20>{#e/mettaton/19}...在結束我們的\n傳奇之旅之前！'
                ],
        turnTalkX0a: () =>
            SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/15}不...\n不...',
                    '<20>{#p/mettaton}{#e/mettaton/14}我不能...',
                    '<20>{#p/mettaton}{#e/mettaton/9}...',
                    "<20>{#p/mettaton}{#e/mettaton/9}Blooky，\n要是你還在...",
                    "<20>{#p/mettaton}{#e/mettaton/10}別自責，別傷心，\n好嗎？",
                    "<20>{#p/mettaton}{#e/mettaton/9}是我，\n一直逼迫你，欺負你。",
                    "<20>{#p/mettaton}{#e/mettaton/19}是我，\n故意疏遠你，\n把你當空氣。",
                    '<20>{#p/mettaton}{#e/mettaton/17}不管過去發生了什麼...\n不管家庭出了多大的\n變故...',
                    '<20>{#p/mettaton}{#e/mettaton/10}你，還有Lurksalot\n永遠都是我的親人！',
                    
                    "<20>{#p/mettaton}{#e/mettaton/15}所以...\n請把這一切，\n把那些話都忘掉吧。",
                    "<20>{#p/mettaton}{#e/mettaton/9}別把那些氣話\n放在心上，",
                    '<20>{#p/mettaton}{#e/mettaton/10}只希望你能記住...'
                ]
                : iFancyYourVilliany()
                    ? [
                        '<20>{#p/mettaton}{#e/mettaton/14}...',
                        "<20>{#p/mettaton}{#e/mettaton/15}原來，這場演出\n竟是這樣謝幕的。",
                        '<20>{#p/mettaton}{#e/mettaton/19}...呵...\n我懂了...',
                        '<20>{#p/mettaton}{#e/mettaton/20}我終於懂了。',
                        '<20>{#p/mettaton}{#e/mettaton/10}整場節目...\n其實只是一場戲。',
                        "<20>{#p/mettaton}{#e/mettaton/10}我們假裝是敵人，\n假裝打一架。",
                        '<20>{#p/mettaton}{#e/mettaton/11}這樣的題材，\n觀眾愛看。',
                        '<20>{#p/mettaton}{#e/mettaton/19}可是...',
                        '<20>{#p/mettaton}{#e/mettaton/17}你入戲太深。',
                        '<20>{#p/mettaton}{#e/mettaton/17}把這場「戲」\n當真了。',
                        '<20>{#p/mettaton}{#e/mettaton/10}最終...',
                        '<20>{#p/mettaton}{#e/mettaton/9}你出色地完成了\n自己的使命，\n打敗了我。',
                        '<20>{#p/mettaton}{#e/mettaton/19}...',
                        '<20>{#p/mettaton}{#e/mettaton/14}所以，\n親愛的「$(moniker2)」。',
                        "<20>{#p/mettaton}{#e/mettaton/12}我作為敗者，\n也該有敗者的樣子。"
                    ]
                    : !world.badder_lizard
                        ? [
                            '<20>{#p/mettaton}{#e/mettaton/9}...',
                            '<20>{#p/mettaton}{#e/mettaton/10}哈啊...',
                            '<20>{#p/mettaton}{#e/mettaton/17}親...\n你肯定知道把我的HP\n打到0...',
                            "<20>{#p/mettaton}{#e/mettaton/17}...會發生什麼吧？",
                            '<20>{#p/mettaton}{#e/mettaton/18}...',
                            '<20>{#p/mettaton}{#e/mettaton/9}臨死前...',
                            '<20>{#p/mettaton}{#e/mettaton/10}希望你知道...',
                            "<20>{#p/mettaton}{#e/mettaton/17}...很多人當過我的搭檔，\n但你是最棒的。",
                            '<20>{#p/mettaton}{#e/mettaton/19}因為有你，\n觀眾來到這裡...',
                            '<20>{#p/mettaton}{#e/mettaton/19}他們注視著我們...',
                            "<20>{#p/mettaton}{#e/mettaton/17}為我們喝彩...",
                            '<20>{#p/mettaton}{#e/mettaton/10}一同見證著\n你的故事。',
                            '<20>{#p/mettaton}{#e/mettaton/9}所以...',
                            "<20>{#p/mettaton}{#e/mettaton/13}不要自卑，\n不要輕視自己，\n好嗎，親？",
                            "<20>{#p/mettaton}{#e/mettaton/14}不用擔心我。",
                            '<20>{#p/mettaton}{#e/mettaton/12}即使我\n不能活得精彩...'
                        ]
                        : [
                            '<20>{#p/mettaton}{#e/mettaton/14}...',
                            '<20>{#p/mettaton}{#e/mettaton/14}...你...',
                            "<20>{#p/mettaton}{#e/mettaton/12}早該料到\n你會背叛我。",
                            '<20>{#p/mettaton}{#e/mettaton/15}...',
                            '<20>{#p/mettaton}{#e/mettaton/15}我給了你機會。',
                            ...(SAVE.data.n.bad_lizard < 2
                                ? [
                                    '<20>{#p/mettaton}{#e/mettaton/14}我告訴自己，\n內心深處，\n你還是個好人。',
                                    '<20>{#p/mettaton}{#e/mettaton/19}結果呢？',
                                    "<20>{#p/mettaton}{#e/mettaton/22}你已經陷得太深，\n救不回來了。"
                                ]
                                : [
                                    "<20>{#p/mettaton}{#e/mettaton/14}我給了你機會，\n相信你能浪子回頭。",
                                    '<20>{#p/mettaton}{#e/mettaton/19}結果呢？',
                                    '<20>{#p/mettaton}{#e/mettaton/22}你爛到了骨子裡，\n根本就無可救藥。'
                                ]),
                            '<20>{#p/mettaton}{#e/mettaton/30}...真卑鄙。',
                            '<20>{#p/mettaton}{#e/mettaton/30}是我的錯...',
                            '<20>{#p/mettaton}{#e/mettaton/20}要是我當時\n心狠一點...',
                            "<20>{#p/mettaton}{#e/mettaton/23}就能送你下地獄，\n讓你遭遭報應。",
                            '<20>{#p/mettaton}{#e/mettaton/30}...',
                            "<20>{#p/mettaton}{#e/mettaton/30}唉，算了。",
                            '<20>{#p/mettaton}{#e/mettaton/24}也算\n吃一塹，長一智。',
                            '<20>{#p/mettaton}{#e/mettaton/30}反正...'
                        ],
        turnTalkX0b: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['<20>{*}{#p/mettaton}{#e/mettaton/31}...我沒生你的氣！{^20}{%}']
                : iFancyYourVilliany()
                    ? ["<20>{*}{#p/mettaton}{#e/mettaton/30}...就用這聲巨響\n為我們的演出\n畫上句號。{^20}{%}"]
                    : !world.badder_lizard
                        ? ['<20>{*}{#p/mettaton}{#e/mettaton/30}...至少，\n我能死得燦爛。{^20}{%}']
                        : ["<20>{*}{#p/mettaton}{#e/mettaton/27}...你就算躲得了初一，\n也躲不過十五。{^20}{%}"],
        turnTalkX1a: ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...？'],
        turnTalkX1b: [
            '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/0}{#a.ra/0}...果然。',
            "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}你以為沒有這些電線\n我就完了，是不是？",
            '<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/10}哎呀，您可真笨...\n蠢得不能再蠢的小崽子。',
            "<20>{#p/mettaton}{#e/mettaton/23}{#a.la/10}{#a.ra/0}大錯特錯。",
            "<20>{#p/mettaton}{#e/mettaton/24}{#a.la/2}{#a.ra/3}這段時間，我已經把\n整個核心的力量\n全吸了過來...",
            "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}這麼多的能量，\n可不能白白浪費了。"
        ],
        turnTalkX1c: ["<20>{*}{#p/mettaton}{#e/mettaton/27}{#a.la/8}{#a.ra/8}就讓我瞧瞧\n你現在還有什麼能耐？"],
        turnTalkX2: [
            '<20>{#p/mettaton}{#e/mettaton/26}...呃啊...',
            '<20>{#e/mettaton/25}你贏了。',
            '<20>{#e/mettaton/19}看來，我...\n又低估你了。',
            "<20>{#e/mettaton/13}不過，沒關係。",
            '<20>{#e/mettaton/14}一定，一定有其他人...\n在某處...',
            "<20>{#e/mettaton/19}等待著你，\n等待著徹底終結\n這場鬧劇。",
            '<20>{#e/mettaton/9}到那時...',
            "<20>{#e/mettaton/10}自由..." 
        ],
        turnTalkX3: [
            '<20>{#p/mettaton}{#e/mettaton/26}...難以置信...',
            "<20>{#e/mettaton/25}我都來不及使上全力。",
            "<20>{#e/mettaton/10}不過...\n也許這樣反而更好。",
            '<20>{#e/mettaton/9}...\n畢竟...',
            '<20>{#e/mettaton/18}假如我們真的\n已經毫無希望...',
            "<20>{#e/mettaton/10}那還不如就此\n放棄抵抗。",
            '<20>{#e/mettaton/9}...',
            '<20>{#e/mettaton/9}唉...'
        ],
        audienceRec1: () => [
            '<21>{#p/event}鈴鈴，鈴鈴...',
            '<21>{#p/napstablook}{~}.....',
            '<21>{#e/mettaton/9}{~}喔........',
            '<21>{~}嗨...\nmettaton...',
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    "<21>{#e/mettaton/18}{~}我知道自從那次見面後，\n情況就變得很奇怪...\n但是...",
                    '<21>{~}看到了真正的你，\n在做你真正想做的事...',
                    '<21>{#e/mettaton/10}{~}讓我喜極而泣...',
                    "<21>{#e/mettaton/9}{~}我說不準，但是...\n我想這是最後\n一期了...？",
                    "<21>{#e/mettaton/11}{~}我會想你的...\n表親......"
                ]
                : [
                    ...(iFancyYourVilliany()
                        ? [
                            '<21>{#e/mettaton/18}{~}我真的很喜歡看\n你那較量...',
                            ...(SAVE.data.n.kills < 10
                                ? [
                                    "<21>{~}儘管我平常對這事\n不感興趣...\n但是...",
                                    '<21>{#e/mettaton/10}{~}因為這關乎於你...\n所以我也能受到共鳴。'
                                ]
                                : [
                                    '<21>{~}雖然最近有很多人都\n失蹤了...\n但是...',
                                    '<21>{#e/mettaton/10}{~}看到你戰鬥到底的樣子\n讓我覺得好多了'
                                ])
                        ]
                        : [
                            '<21>{#e/mettaton/18}{~}我真的喜歡看\n你的節目...',
                            ...(SAVE.data.n.kills < 10
                                ? [
                                    '<21>{~}我的生活很無聊...\n但是...',
                                    '<21>{#e/mettaton/10}{~}看到你\n在節目上的表演...\n這間接地照亮了\n我的生活...'
                                ]
                                : [
                                    '<21>{~}雖然最近有很多人都\n失蹤了...\n但是...',
                                    '<21>{#e/mettaton/10}{~}看到你還在電視上\n讓我覺得好多了'
                                ])
                        ]),
                    "<21>{#e/mettaton/9}{~}我說不準，但是...\n我想這是最後\n一期了...？",
                    "<21>{#e/mettaton/11}{~}我會想你的...\nmettaton......"
                ])
        ],
        audienceRec2: [
            '<20>{#p/mettaton}{#e/mettaton/19}不，等一下！\n等等，小...',
            '<20>{#e/mettaton/9}已... 已經掛了。',
            '<20>{#e/mettaton/19}...',
            "<20>{#e/mettaton/20}我要接其他來電！！！"
        ],
        audienceRec3a: () =>
            iFancyYourVilliany()
                ? ['<21>{#p/basic}Mettaton，\n你是我們的驕傲！']
                : ['<21>{#p/basic}Mettaton，\n你的節目製造了\n很多歡樂！'],
        audienceRec3b: () =>
            iFancyYourVilliany()
                ? ["<21>{#p/basic}Mettaton，沒了你，\n還有誰能和惡棍戰鬥？"]
                : ["<21>{#p/basic}Mettaton，沒有你\n我都不知道看什麼！"],
        audienceRec3c: () =>
            iFancyYourVilliany()
                ? ["<21>{#e/mettaton/10}{#p/basic}你是前哨站\n最偉大的閃耀之星！"]
                : ["<21>{#e/mettaton/10}{#p/basic}我的Mettaton形狀的\n心臟上空缺了一個\nMettaton形狀的洞！"],
        audienceRec4: () => [
            '<20>{#p/mettaton}啊... 我知道了。',
            '<20>{#e/mettaton/9}...',
            '<20>{#e/mettaton/19}大家...\n我真的感謝你們\n所有的觀眾。',
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#e/mettaton/20}還有Blooky...',
                    "<20>{#e/mettaton/20}我從沒想過我會原諒你\n還有其他人，但是...",
                    '<20>{#e/mettaton/9}那個農場是\n你最熱衷的事業，\n對吧？',
                    '<20>{#e/mettaton/9}在思考了幾次後...\n我想我明白了。',
                    '<20>{#e/mettaton/19}你只是想讓我們\n同舟並濟，共創未來...',
                    '<20>{#e/mettaton/19}你，Lurksalot... \n還有你們所有人...',
                    '<20>{#e/mettaton/20}你們都只是\n想讓我們幸福快樂。',
                    '<20>{#e/mettaton/20}...嘿。',
                    '<20>{#e/mettaton/9}至於我的節目...',
                    '<20>{#e/mettaton/10}我想我該\n休息一段時間。'
                ]
                : ['<20>{#e/mettaton/20}但你們誤解了...', "<20>{#e/mettaton/10}我... \n永遠都不會離開。"]),
            '<20>...',
            "<20>{#e/mettaton/20}我想這是\n最好的結果了。",
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    "<20>{#e/mettaton/15}我離開家人們太久了...",
                    "<20>{#e/mettaton/14}是時候告訴它們\n這些年發生過的事了。",
                    '<20>{#e/mettaton/19}總而言之...'
                ]
                : [
                    "<20>{#e/mettaton/15}實際上，\n這種形態的能耗...",
                    '<20>{#e/mettaton/14}十分低效。',
                    "<20>{#e/mettaton/19}再過一會，\n我的能源將會耗盡..."
                ]),
            '<20>{#e/mettaton/10}嗯。',
            "<20>我會沒事的。",
            iFancyYourVilliany()
                ? '<20>{#e/mettaton/9}後會有期，$(moniker2)。'
                : '<20>{#e/mettaton/9}一路順風，親愛的。',
            '<20>{#e/mettaton/19}還有各位...\n謝謝你們。',
            "<20>{#e/mettaton/20}你們是偉大的觀眾！"
        ],
        neointro: [
            "<20>{*}{#p/mettaton}你變{@fill=#ff993d}橙{@fill=#000}了。{^30}{%}",
            "<20>{*}{#e/mettaton/4}這就是我的攻擊。{^30}{%}",
            "<20>{*}{#e/mettaton/12}...嘿，臨死之前，\n何不找點樂子呢？{^30}{%}",
            '<20>{*}{#e/mettaton/0}配合一下，\n按[Z]釋放衝擊波。{^30}{%}',
            '<20>{*}{#e/mettaton/0}不過要小心...{^30}{%}',
            "<20>{*}{#e/mettaton/0}不停釋放衝擊波的話，\n你就會走不動。{^30}{%}",
            '<20>{*}{#e/mettaton/12}不廢話了。{^30}{%}',
            "<20>{*}{#e/mettaton/4}現在，\n送你們下地獄吧。{^30}{%}"
        ],
        mettahero1: [
            '<20>{#p/mettaton}{#e/mettaton/6}...',
            "<20>{#e/mettaton/9}看-看來...\n和新身體融合，\n就是這般下場。",
            "<20>{#e/mettaton/11}再也沒有人...",
            '<20>{#e/mettaton/7}...能攔住你們了...'
        ],
        mettahero2: ['<20>{#e/mettaton/7}...', '<20>{#e/mettaton/10}永別了...\n...\n...親。'],
        napstahero1: ['<20>{#p/finalghost}{~}...', '<20>{~}Mettaton...'],
        napstahero2: [
            '<20>{#p/finalghost}{~}你們這群殺人魔...',
            '<20>{~}...',
            '<20>{~}我等候多時，\n就為了親手結果你們。',
            '<20>{~}現在，\n終於可以付諸實行了。',
            '<20>{~}你們不會魔法，\n傷不了我，\n註定要止步於此。',
            '<20>{|}{~}給我去- {%}'
        ],
        napstahero3: () =>
            [
                [
                    "<20>{#p/asriel2}真當我傻？\n我的魔法是不強，\n但也沒差到那種地步。",
                    '<20>{#x1}別來煩我了...'
                ],
                ['<20>{#p/asriel2}...']
            ][Math.min(SAVE.flag.n.ga_asrielNapstakill++, 1)],
        qq: () =>
            SAVE.data.b.a_state_hapstablook
                ? '你願意原諒某個幽靈嗎？'
                : !world.badder_lizard
                    ? '你會親幽靈嗎？'
                    : '你會揍幽靈嗎？',
        qa: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['我原諒你', '才不原諒', '抱抱就好啦！', '放下過去吧。']
                : !world.badder_lizard
                    ? ['沒問題', '必須的', '那當然！', '現在就\n親一個']
                    : ['我會', '我當然會', '我肯定會', '我必須會'],
        q0: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}時間到。{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}時間到了，親愛的。\n我就當你同意了喔~{^40}{%}"]
                    : ["<20>{#p/mettaton}時間到了，親愛的。\n我就當你同意了...{^40}{%}"],
        q1: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['<20>{#p/mettaton}開門見山啊，\n我知道了。{^40}{%}']
                : !world.badder_lizard
                    ? ['<20>{#p/mettaton}這回答太棒了！\n我愛它！！！{^40}{%}']
                    : ["<20>{#p/mettaton}期待你的嘗試！{^40}{%}"],
        q2: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}...但我不能\n一直逃避下去。{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}這就是你\n回答問題的方式！{^40}{%}"]
                    : ['<20>{#p/mettaton}你只是缺乏勇氣，\n對吧？{^40}{%}'],
        q3: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}哇，\n我不會走那麼遠。{^40}{%}"]
                : !world.badder_lizard
                    ? ['<20>{#p/mettaton}我喜歡你的看法！{^40}{%}']
                    : ['<20>{#p/mettaton}真相多\n令人振奮啊！{^40}{%}'],
        q4: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}嗯，\n這就是信心...{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}喔——，\n你是認真的。{^40}{%}"]
                    : ["<20>{#p/mettaton}不要欺騙自己，\n親愛的...{^40}{%}"],
        hitIndicator: '破甲：$(x)次',
        shieldIndicator: '護甲：$(x)%',
        ratings: {
            pose1: () => (iFancyYourVilliany() ? '有兩下子' : '精彩'),
            pose2: () => (iFancyYourVilliany() ? '一般般' : '小心點'),
            pose3: () => (iFancyYourVilliany() ? '笑死' : '危險啊'),
            pose4: () => (iFancyYourVilliany() ? '您可真棒呢' : '別出人命了'),
            flirt1: () => (iFancyYourVilliany() ? '超級反轉' : '萌萌噠'),
            flirt2: () => (iFancyYourVilliany() ? '瘋狂加碼' : '好可愛'),
            flirt3: () => (iFancyYourVilliany() ? '三倍奉還' : '好浪漫'),
            flirt4: () => (iFancyYourVilliany() ? '撩得飛起' : '真迷人'),
            boast1: '白吹牛了',
            boast2: '真尷尬',
            boast3: '有兩下子',
            heel1: '正義執行',
            heel2: '使勁揍',
            heel3: '懲罰呢？',
            hurt: '痛快',
            crit: '打得準',
            dead: '一擊致命',
            bomb: '炸裂',
            scream: '激情滿滿',
            hopbox: '整得行',
            hearthurt: '會心一擊',
            item: {
                artifact: '沒意思',
                old_gun: '震撼人心',
                old_bomb: '迷糊了',
                old_spray: '味道不錯',
                tvm_radio: '好聽',
                tvm_fireworks: '璀璨奪目',
                tvm_mewmew: '這都敢放？',
                spanner: '優雅',
                armor: '蠻時髦',
                weapon: '有想法',
                repeat: '看過了',
                repeat_x: '看膩歪了',
                pain: '看著都疼',
                blookpie: '熟悉的味道'
            },
            smooch: '回答正確',
            nosmooch: '回答錯誤'
        }
    },

    b_opponent_madjick: {
        name: '* Cozmo',
        spanner: ['<32>{#p/human}* （你揮舞著扳手。）\n* （Cozmo並沒有把它\n  誤認為是魔杖。）'],
        epiphaNOPE: ['<20>{#p/basic}{~}那種魔法...', '<20>{#p/basic}{~}...我不會\n向它的力量屈服！'],
        hint: ['<33>{#p/basic}* 慢著。\n* 我覺得我有辦法。'],
        assistTalk1: ['<20>{#p/basic}{~}呃...'],
        artifact_text: ['<32>{#p/basic}* Cozmo認出來了神器，\n  並認為你值得它的尊敬！'],
        artifactTalk: [
            '<20>{#p/basic}{~}真的假的？\n那是王室的吊墜？',
            '<20>{#p/basic}{~}我不該再妨礙你了！'
        ],
        assistAction: [
            '<32>{*}{#p/basic}* 古老的世界。{^5}\n  魔法的世界。{^25}{%}',
            '<32>{*}{#p/basic}* 無論多麼暗無天日，\n  我們都要向陽而生...{^60}{%}',
            '<32>{*}{#p/basic}* 並銘記一切。{^40}{%}'
        ],
        assistTalk2: ['<20>{#p/basic}{~}思界懷存，夢憶隱世！', '<20>{#p/basic}{~}你知道這魔咒！'],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* Cozmo被擊倒了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Cozmo被擊倒了！'
        ],
        old_spray_text: ['<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）', '<32>{#p/basic}* Cozmo被擊倒了！'],
        status1: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* 糟糕。'] : ['<32>{#p/story}* Cozmo在剎那間突然現身！'],
        act_check: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Cozmo就是一個你所說的\n  「傳統」意義上的魔法師。\n* 它的力量源自於它的魔球...']
                : ['<32>{#p/story}* COZMO - 攻擊29 防禦24\n* 這個高深莫測的特戰隊成員\n  總念著魔咒。'],
        act_check2: ['<32>{#p/story}* COZMO - 攻擊29 防禦24\n* 智障。'],
        act_check3: ['<32>{#p/story}* COZMO - 攻擊29 防禦24\n* 一個魔法師，但他沒花招了...'],
        act_check4: ['<32>{#p/story}* COZMO - 攻擊29 防禦24\n* 再沒有魔咒能幫到\n  這位老魔法師了。'],
        act_check5: [
            '<32>{#p/story}* COZMO - 攻擊29 防禦24\n* 愛的力量比最古老的魔法還要強大。'
        ],
        idleStatus1: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 這位是Cozmo。"] : ['<32>{#p/story}* Cozmo跳著不可思議的舞蹈。'],
        idleStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這位是Cozmo。"]
                : ['<32>{#p/story}* Cozmo氣勢洶洶地賣弄著它的魔球。'],
        idleStatus3: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這位是Cozmo。"]
                : ['<32>{#p/story}* Cozmo嘀咕著艱深晦澀的髒話。'],
        idleStatus4: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這位是Cozmo。"]
                : ['<32>{#p/story}* Cozmo以火眼金睛凝視著你。'],
        idleStatus5: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 這位是Cozmo。"] : ['<32>{#p/story}* ...魔法的味道撲面而來。'],
        idleTalk1: ['<20>{#p/basic}{~}蘇依巴嘎巴蓋。'],
        idleTalk2: ['<20>{#p/basic}{~}陶泥拉！！'],
        idleTalk3: ['<20>{#p/basic}{~}色古野。'],
        idleTalk4: ['<20>{#p/basic}{~}格日熱。'],
        idleTalk5: ['<21>{#p/basic}{~}恩情與福報。'],
        danceText1: ['<32>{#p/human}* （你選擇跳舞。）', "<32>{#p/basic}* Cozmo的牽引魔球\n  離你越來越近..."],
        danceTalk1: ['<20>{#p/basic}{~}希麼巴日阿希蘇木！！'],
        danceStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 那個魔球停息了...']
                : ["<32>{#p/story}* Cozmo的牽引魔球\n  弱化了它的引力。"],
        danceText2: () => [
            '<32>{#p/human}* （你選擇跳舞。）',
            "<32>{#p/basic}* Cozmo的驚雷魔球開始充能...",
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* 對，就是這樣！\n* 你-你快要成功了！"] : [])
        ],
        danceTalk2: ['<20>{#p/basic}{~}薩日朗！'],
        danceTalk3: ["<20>{#p/basic}{~}我受夠了！！！"],
        danceStatus2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 太好了！！！\n* 魔球都耗盡能量了！']
                : ["<32>{#p/story}* Cozmo的驚雷魔球\n  窮盡了它的能量。"],
        danceText3: ['<32>{#p/human}* （你選擇跳舞。）\n* （無事發生。）'],
        danceText4: [
            '<32>{#p/human}* （你選擇跳舞。）',
            "<32>{#p/basic}* Cozmo百思不得其解，\n  再也忍不下去了！"
        ],
        danceIdleTalk1: ['<20>{#p/basic}{~}難過了...'],
        danceIdleTalk2: ['<20>{#p/basic}{~}落敗了...'],
        danceIdleTalk3: ['<20>{#p/basic}{~}失利了...'],
        danceStatus3: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 你現在大概可以饒恕它了。']
                : ['<32>{#p/story}* Cozmo無計可施。'],
        playdeadText1: () => [
            '<32>{#p/human}* （你選擇裝死。）',
            "<32>{#p/basic}* Cozmo的兩個魔球都變得\n  不大對勁...",
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 搞什麼...？'] : [])
        ],
        playdeadTalk: ['<20>{#p/basic}{~}\x00*困惑地吟唱*'],
        playdeadStatus: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 我想，這起作用了...？']
                : ["<32>{#p/story}* Cozmo的魔球不知道該怎麼辦。"],
        playdeadIdleTalk1: ['<20>{#p/basic}{~}實在灰心喪氣。'],
        playdeadIdleTalk2: ['<20>{#p/basic}{~}徹底心煩意亂。'],
        playdeadIdleTalk3: ['<20>{#p/basic}{~}完全亂成一團。'],
        playdeadText2: ['<32>{#p/human}* （你選擇裝死。）\n* （無事發生。）'],
        flirtText0: () => [
            '<32>{#p/human}* （你向Cozmo調情。）\n* （沒什麼效果。）',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 嗯，祝你好運...'] : [])
        ],
        flirtText1: () => [
            '<32>{#p/human}* （你運用自身經驗，\n  念了一句調情的咒語。）',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 啊...？'] : [])
        ],
        flirtTalk1: ['<20>{#p/basic}{~}啊！\n一位巫師同伴！'],
        flirtStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 我的老天。\n* 再來一次！！！']
                : ['<32>{#p/story}* Cozmo如同乘坐著愛之列車。'],
        flirtText2: () => [
            '<32>{#p/human}* （你運用自身經驗，\n  背了一段浪漫的銘文。）',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 效果越來越好了。'] : [])
        ],
        flirtTalk2: ["<20>{#p/basic}{~}啊！\n這感覺真奇妙！"],
        flirtStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 哇... 我想就這樣吧。"]
                : ['<32>{#p/story}* Cozmo欣喜若狂。'],
        flirtText3: () => [
            '<32>{#p/human}* （你選擇調情。）\n* （無事發生。）',
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* 啐，別太得寸進尺。"] : [])
        ],
        flirtIdleTalk1: ['<20>{#p/basic}{~}多麼可愛...'],
        flirtIdleTalk2: ['<20>{#p/basic}{~}多麼迷人...'],
        flirtIdleTalk3: ['<20>{#p/basic}{~}多麼體貼...'],
        perilStatus: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* 它不剩多少HP了...'] : ['<32>{#p/story}* Cozmo堅持著。']
    },

    b_opponent_knightknight: {
        name: '* Terrestria',
        epiphaNOPE: ['<20>{#p/basic}{~}...這魔法... 是個禁忌...'],
        hint: ['<32>{#p/basic}* 等下...\n* 讓我來試試看。'],
        assistTalk1: ['<20>{#p/basic}{~}...\n...\n...\n哼？'],
        assistAction: [
            '<32>{*}{#p/human}* （...）{^30}{%}',
            '<32>{*}{#p/human}* （一首古老的歌謠\n  在房間裡迴響起來。）{^100}{%}'
        ],
        assistTalk2: [
            '<20>{#p/basic}{~}與我們闊別的世界中的\n一首老歌...',
            '<20>{#p/basic}{~}想必宇宙中也\n仍然存在著美好吧。'
        ],
        artifact_text: ['<32>{#p/basic}* Terrestria認出來了神器，\n  並認為你值得她的信任！'],
        artifactTalk: [
            '<20>{#p/basic}{~}與我們闊別的世界中的\n一件神器...',
            '<20>{#p/basic}{~}想必它的傳奇\n會在你心中永存。'
        ],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* Terrestria被擊倒了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Terrestria被擊倒了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）',
            '<32>{#p/basic}* Terrestria被擊倒了！'
        ],
        status1: () =>
            !world.badder_lizard
                ? SAVE.data.b.assist_madjick
                    ? ['<32>{#p/alphys}* 你還能再用上次那招麼？']
                    : ['<32>{#p/alphys}* 又來了。']
                : ['<32>{#p/story}* Terrestria擋住了去路！'],
        act_check: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Terrestria是個權杖使用者，\n  她十分熱愛我們的故園。"]
                : [
                    '<32>{#p/story}* TERRESTRIA - 攻擊36 防禦36\n* 這個高大挺拔的特戰隊成員\n  使用著行星法杖。'
                ],
        act_check2: ['<32>{#p/story}* TERRESTRIA - 攻擊36 防禦36\n* 這世界正在分崩離析。'],
        act_check3: ["<32>{#p/story}* TERRESTRIA - 攻擊36 防禦36\n* 事情變得沒那麼糟糕了。"],
        act_check4: ['<32>{#p/story}* TERRESTRIA - 攻擊36 防禦36\n* 大地在她那雙破舊的靴子下顫抖。'],
        act_check5: ['<32>{#p/story}* TERRESTRIA - 攻擊36 防禦36\n* 她的注意力被偷走了，\n  世間一切如同消失。'],
        idleStatus1: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這位是Terrestria。"]
                : ['<32>{#p/story}* Terrestria緊緊握著她的法杖。'],
        idleStatus2: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 這位是Terrestria。"] : ['<32>{#p/story}* Terrestria深吸了一口氣。'],
        idleStatus3: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* 這位是Terrestria。"] : ['<32>{#p/story}* Terrestria靜靜地看著你。'],
        idleStatus4: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這位是Terrestria。"]
                : ["<32>{#p/story}* Terrestria的盔甲\n  發出了微弱的黃光。"],
        idleStatus5: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這位是Terrestria。"]
                : ['<32>{#p/story}* 被忘卻之遺物的味道\n  撲面而來。'],
        idleTalk1: ['<20>{#p/basic}{~}騎程好夢。'],
        idleTalk2: ['<20>{#p/basic}{~}慢走。'],
        idleTalk3: ['<20>{#p/basic}{~}回見。'],
        idleTalk4: ['<20>{#p/basic}{~}閉上眼睛...'],
        idleTalk5: ['<20>{#p/basic}{~}再會。'],
        comfortText1: () => [
            '<32>{#p/human}* （你走近Terrestria並撫摸她，\n  告訴她一切都會好起來的。）',
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* 這... 呃..."] : [])
        ],
        comfortTalk1: ['<20>{#p/basic}{~}...\n...\n...\n真的嗎？'],
        comfortStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 她在... 哭嗎？']
                : ["<32>{#p/story}* Terrestria內心動搖了。"],
        comfortText2: () => [
            '<32>{#p/human}* （你擁抱Terrestria，提醒她宇宙中\n  仍然存在著美好。）',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 唔...'] : [])
        ],
        comfortTalk2: ['<20>{#p/basic}{~}...\n...\n謝謝你...'],
        comfortStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 這一幕... 真令人開心。"]
                : ['<32>{#p/story}* Terrestria找到了\n  新的生活目標。'],
        comfortTalk3: ['<20>{#p/basic}{~}...\n...\n好...'],
        comfortText3: ['<32>{#p/human}* （你安撫了Terrestria。）\n* （無事發生。）'],
        comfortText4: [
            '<32>{#p/human}* （你安撫了Terrestria。）',
            '<32>{#p/basic}* Terrestria放下了她的法杖，\n  並接受了你的和平提議。'
        ],
        comfortIdleTalk1: ['<20>{#p/basic}{~}賞錢拿好。'],
        comfortIdleTalk2: ['<20>{#p/basic}{~}感激不盡。'],
        comfortIdleTalk3: ['<20>{#p/basic}{~}多謝了。'],
        comfortStatus3: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 我想你可以饒恕她了...']
                : ['<32>{#p/story}* Terrestria平靜下來了。'],
        flashText1: () => [
            '<32>{#p/human}* （你把手機調亮，\n  朝Terrestria閃了過去。）',
            '<32>{#p/basic}* Terrestria驚慌失措！',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 你幹了什麼！？'] : [])
        ],
        flashTalk: ['<20>{#p/basic}{~}\x00*無聲的恐慌*'],
        flashStatus: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 她-她瞎了！"]
                : ['<32>{#p/story}* Terrestria因為這場戰鬥\n  失去了視覺。'],
        flashIdleTalk1: ['<20>{#p/basic}{~}喪失了視覺...'],
        flashIdleTalk2: ["<20>{#p/basic}{~}我看不見你..."],
        flashIdleTalk3: ['<20>{#p/basic}{~}你在哪裡...'],
        flashText2a: [
            '<32>{#p/human}* （你把手機調亮，\n  朝Terrestria閃了過去。）\n* （可她在暢想與你的時光，沒注意到。）'
        ],
        flashText2b: ['<32>{#p/human}* （你把手機調亮，\n  朝Terrestria閃了過去。）\n* （可她十分放鬆，沒注意到。）'],
        flashText2c: ['<32>{#p/human}* （你把手機調亮，\n  朝Terrestria閃了過去。）\n* （無事發生。）'],
        flirtText0: () => [
            '<32>{#p/human}* （你向Terrestria調情。）\n* （沒什麼效果。）',
            ...(!world.badder_lizard
                ? ['<32>{#p/alphys}* 是啊，特戰隊訓練有素，\n  能防止被迷惑。']
                : [])
        ],
        flirtText1: () => [
            '<32>{#p/human}* （你運用自身經驗，\n  講了句簡單而自信的恭維話。）',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 呃...'] : [])
        ],
        flirtTalk1: ['<20>{#p/basic}{~}真令人高興...'],
        flirtStatus1: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 你得想辦法讓這起作用..."]
                : ['<32>{#p/story}* Terrestria開始喜歡上你了。'],
        flirtText2: () => [
            "<32>{#p/human}* （你運用自身經驗，\n  久久凝視著Terrestria的雙眼。）",
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 噢噢噢好啊。'] : [])
        ],
        flirtTalk2: ['<20>{#p/basic}{~}那將是多麼美好...'],
        flirtStatus2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 好-好啊。\n* 這... 了不得。']
                : ['<32>{#p/story}* Terrestria情意綿綿。'],
        flirtText3: () => [
            '<32>{#p/human}* （你選擇調情。）\n* （無事發生。）',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* 你瘋了吧。'] : [])
        ],
        flirtIdleTalk1: ['<20>{#p/basic}{~}好驚喜...'],
        flirtIdleTalk2: ['<20>{#p/basic}{~}太完美...'],
        flirtIdleTalk3: ['<20>{#p/basic}{~}真秀麗...'],
        perilStatus: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* 她快死了..."]
                : ["<32>{#p/story}* Terrestria呼吸急促。"]
    },

    b_opponent_froggitex: {
        name: '* Final Froggit',
        epiphany: [
            
            ['<08>{#p/basic}{~}從你的\n仁慈中，\n我看到了\n智慧。', '<08>{#p/basic}{~}我的願望\n實現了。'],
            () =>
                world.meanie
                    ? 
                    [
                        '<08>{#p/basic}{~}我沒有\n預見到\n這個結果。',
                        '<08>{#p/basic}{~}我可不能\n一頭扎進\n深淵...'
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}蹦蹦，\n跳跳。', '<08>{#p/basic}{~}願愛在\n我們心中\n閃耀。']
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}我們\n將成為\n最好的\n朋友。']
                            : 
                            ['<08>{#p/basic}{~}你的友善\n溫暖著\n我的心。'],
            
            ['<08>{#p/basic}{~}咕呱，\n咕呱。', '<08>{#p/basic}{~}我的日子\n到頭了。'],
            
            ['<08>{#p/basic}{~}願你得到\n所渴望的\n財富。']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* Final Froggit被擊倒了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Final Froggit被擊倒了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）',
            '<32>{#p/basic}* Final Froggit被擊倒了！'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* Final Froggit，它就像Froggit一樣，\n  但更加華麗。\n* 它用一種古怪的語言說話。"]
                        : ["<32>{#p/alphys}* 這只是Final Froggit罷了。"]
                    : ['<32>{#p/story}* FINAL FROGGIT - 攻擊30 防禦24\n* 這個怪物前途無量。'],
        act_check2: [
            '<32>{#p/story}* FINAL FROGGIT - 攻擊30 防禦24\n* 這個怪物會用它的智慧\n  繼續生存下去。'
        ],
        act_check3: ['<32>{#p/story}* FINAL FROGGIT - 攻擊30 防禦24\n* 這個怪物明白了\n  你真正的欲望。'],
        act_check4: ['<32>{#p/story}* FINAL FROGGIT - 攻擊30 防禦24\n* 這個怪物對自己的話很滿意。'],
        idleText1: ['<08>{#p/basic}{~}咕呱，\n咕呱。'],
        idleText2: ['<08>{#p/basic}{~}吱咕，\n吱咕。'],
        idleText3: ['<08>{#p/basic}{~}蹦蹦，\n跳跳。'],
        idleText4: ['<08>{#p/basic}{~}咕嚕。'],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* 戰場上瀰漫著螢參的芬芳。'],
        status2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Final Froggit想求得解悟。'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Final Froggit希望能夠\n  分享它的智慧。'],
        act_flirt: () => [
            '<32>{#p/human}* （你向Final Froggit調情。）',
            '<32>* Final Froggit對你的話\n  有一定賞識。',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 呵呵...'] : [])
        ],
        flirtText: () =>
            world.meanie ? ['<08>{#p/basic}{~}(深吸了\n 一口氣)\n咕呱。'] : ['<08>{#p/basic}{~}（臉漲得\n通紅）\n咕呱。'],
        act_translate1: () => [
            '<32>{#p/human}* （還沒有什麼話\n  需要你來翻譯。）',
            ...(!world.badder_lizard
                ? ['<32>{#p/alphys}* 也許你應該...\n  先等它說點什麼？']
                : [])
        ],
        act_translate2: ["<32>{#p/human}* （你翻譯了Final Froggit的話。）"],
        translateText1: () =>
            world.meanie
                ? ["<08>{#p/basic}{~}（不要\n殺人，\n也不要\n被殺。）"]
                : ['<08>{#p/basic}{~}（時間\n可以治癒\n一切。）'],
        translateText2: () =>
            world.meanie
                ? ['<08>{#p/basic}{~}（別讓\n憤怒\n掌控了\n你。）']
                : ['<09>{#p/basic}{~}（勇往\n直前。）'],
        translateText3: () =>
            world.meanie
                ? ['<08>{#p/basic}{~}（你總能\n保持\n進步。）']
                : ['<08>{#p/basic}{~}（忠於\n自己。）'],
        translateText4: () =>
            world.meanie ? ['<08>{#p/basic}{~}（別向\n恐懼\n屈服。）'] : ['<08>{#p/basic}{~}（盡力\n而為。）'],
        translateText5: () =>
            world.meanie
                ? ['<08>{#p/basic}{~}（為刻薄\n懺悔。）']
                : ['<08>{#p/basic}{~}（無悔於\n行善。）'],
        mercyStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 我想你現在可以\n  饒恕Final Froggit了。']
                    : ['<32>{#p/alphys}* 我想你現在可以饒恕它了。']
                : ['<32>{#p/story}* Final Froggit似乎\n  不願意和你戰鬥了。'],
        act_mystify: ['<32>{#p/human}* （你裝神弄鬼，故弄玄虛，\n  但Final Froggit沒被你騙住。）'],
        act_threaten: ['<32>{#p/human}* （你裝腔作勢，威脅Final Froggit，\n  但它沒被你唬住。）'],
        perilStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 呃...']
                    : ['<32>{#p/alphys}* 不...']
                : ['<32>{#p/story}* Final Froggit絕不退縮。']
    },

    b_opponent_whimsalot: {
        name: '* Flutterknyte',
        epiphany: [
            
            ['<08>{#p/basic}{~}終於\n解放了...', '<08>{#p/basic}{~}我還怕\n我永遠\n逃不掉了\n呢。'],
            () =>
                world.meanie
                    ? 
                    ['<08>{#p/basic}{~}我在\n想什麼..', '<08>{#p/basic}{~}我得離開\n這裡..！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}如果你真\n這麼想..', '<08>{#p/basic}{~}那我也得\n這麼做..！']
                        : SAVE.data.b.oops
                            ? 
                            ["<08>{#p/basic}{~}沒問題..", '<08>{#p/basic}{~}如果你\n想的話，\n我們可以\n做朋友..']
                            : 
                            ['<08>{#p/basic}{~}能不能..', "<08>{#p/basic}{~}別-別\n鬆手.."],
            
            ["<08>{#p/basic}{~}我明白，\n我不配\n守衛核心..", "<08>{#p/basic}{~}對不起..."],
            
            ["<08>{#p/basic}{~}這是\n給你的\n錢..", '<08>{#p/basic}{~}請..\n饒恕我..']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* Flutterknyte被擊倒了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Flutterknyte被擊倒了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）',
            '<32>{#p/basic}* Flutterknyte被擊倒了！'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Flutterknyte... 它似乎看起來很緊張，\n  或者是我的問題？']
                        : ["<32>{#p/alphys}* 這只是Flutterknyte罷了。"]
                    : [
                        '<32>{#p/story}* FLUTTERKNYTE - 攻擊34 防禦12\n* 這個怪物有著過大的責任感。'
                    ],
        act_check2: ['<32>{#p/story}* FLUTTERKNYTE - 攻擊34 防禦12\n* 它躲在後頭，怕令人失望。'],
        act_check3: ['<32>{#p/story}* FLUTTERKNYTE - 攻擊34 防禦12\n* 它的翅膀如釋重負。'],
        act_check4: ["<32>{#p/story}* FLUTTERKNYTE - 攻擊34 防禦12\n* 在撲騰的可不只有它的翅膀..."],
        act_perch1: () => [
            '<32>{#p/human}* （你伸出胳膊，\n  供Flutterknyte在上面棲息。）',
            '<32>{#p/basic}* Flutterknyte考慮\n  接受你的提議...',
            ...(!world.badder_lizard && calm_lizard() ? ["<32>{#p/alphys}* 你已經成功一半了。"] : [])
        ],
        act_perch2: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* （你繼續伸著胳膊。）',
                    '<32>{#p/basic}* Flutterknyte擔心會有生命危險，\n  退縮了...',
                    '<32>* Flutterknyte想走了。',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 搞定了...？'] : [])
                ]
                : [
                    '<32>{#p/human}* （你繼續伸著胳膊。）',
                    '<32>{#p/basic}* Flutterknyte飛了過來\n  並落在了你的手臂上。',
                    '<32>* Flutterknyte可以休息了。',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 搞定了！'] : [])
                ],
        act_perch3: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* （你為Flutterknyte\n  伸出了又一隻胳膊。）',
                    '<33>{#p/basic}* Flutterknyte已經看夠了...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ...天哪。'] : [])
                ]
                : [
                    '<32>{#p/human}* （你為Flutterknyte\n  伸出了又一隻胳膊。）',
                    '<32>{#p/basic}* Flutterknyte不知所措，\n  決定飛走...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ...啊。'] : [])
                ],
        act_flirt: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* （你向Flutterknyte調情。）',
                    '<32>{#p/basic}* Flutterknyte很驚訝，\n  心裡感到很矛盾...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 呃...'] : [])
                ]
                : [
                    '<32>{#p/human}* （你向Flutterknyte調情。）',
                    '<32>{#p/basic}* Flutterknyte很驚訝，\n  但還是接受了...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 可愛...'] : [])
                ],
        flirtTalk: () =>
            world.meanie ? ['<08>{#p/basic}{~}這我該\n咋辦呀..'] : ['<08>{#p/basic}{~}謝謝\n謝謝..'],
        act_poke1: () => [
            '<32>{#p/human}* （你戳了戳Flutterknyte\n  以讓它失去平衡。）',
            '<32>{#p/basic}* Flutterknyte抖了一下，\n  但很快就重整旗鼓。',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 你這是在幹什麼...？'] : [])
        ],
        act_poke2: () => [
            '<32>{#p/human}* （你戳了戳Flutterknyte\n  以讓它失去平衡。）',
            '<32>{#p/basic}* Flutterknyte掉了下去並逃之夭夭！',
            ...(!world.badder_lizard && calm_lizard()
                ? ["<32>{#p/alphys}* 我會當沒看見的。"]
                : [])
        ],
        preperchText1: ['<08>{#p/basic}{~}我該\n去嗎..？'],
        preperchText2: ['<08>{#p/basic}{~}我可以\n去嗎..？'],
        preperchText3: ['<08>{#p/basic}{~}我要\n去嗎..？'],
        perchText1: ['<08>{#p/basic}{~}\x00*疲憊的\n嘆息聲*'],
        perchText2: ['<08>{#p/basic}{~}終於能\n休息了。'],
        perchText3: ['<08>{#p/basic}{~}謝謝你。'],
        perchText4: ['<08>{#p/basic}{~}我不知道\n自己有\n多累。'],
        perchText5: ["<08>{#p/basic}{~}我不知道\n自己幹了\n多久活。"],
        idleTalk1: ["<08>{#p/basic}{~}我會做好\n分內的\n事.."],
        idleTalk2: ["<08>{#p/basic}{~}一切為了\n大局.."],
        idleTalk3: ["<08>{#p/basic}{~}他們都\n指望著\n我.."],
        idleTalk4: ['<08>{#p/basic}{~}未來取決\n於此...'],
        idleTalk5: ['<08>{#p/basic}{~}\x00*飛來\n飛去*'],
        perilStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 呃...']
                    : ['<32>{#p/alphys}* 不...']
                : ['<32>{#p/story}* Flutterknyte大難臨頭。'],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Flutterknyte繼續嘟囔著\n  那些正當理由。'],
        status2: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte在徘徊著。']),
        status3: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 梨的味道撲面而來。']),
        status4: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte的呼吸緩慢而平穩。'],
        status5: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte思考著未來。'],
        spareStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 看來Flutterknyte準備接受你的仁慈。']
                    : ["<32>{#p/alphys}* 看來它準備接受你的仁慈。"]
                : ['<32>{#p/story}* Flutterknyte正在休息。']
    },

    b_opponent_astigmatism: {
        name: '* Eyewalker Prime',
        epiphany: [
            
            ['<08>{#p/basic}{~}眼不見，\n心不念。'],
            () =>
                world.meanie
                    ? 
                    [
                        '<08>{#p/basic}{~}你小子\n比我還壞！',
                        "<08>{#p/basic}{~}我還是\n適可而止\n為好。"
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}你的眼睛\n真漂亮啊..', "<08>{#p/basic}{~}可別跟\n族人們說！"]
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}友誼..', '<08>{#p/basic}{~}真是令我\n大開眼界！']
                            : 
                            ["<08>{#p/basic}{~}別太用力，\n好嗎？"],
            
            ['<08>{#p/basic}{~}身為領袖，\n我要\n光榮赴死。'],
            
            ["<08>{#p/basic}{~}切..\n給你！", '<08>{#p/basic}{~}不用還了。']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* Eyewalker Prime被擊倒了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Eyewalker Prime被擊倒了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）',
            '<32>{#p/basic}* Eyewalker Prime被擊倒了！'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* Eyewalker Prime...？\n* 大概是Eyewalker一族的領袖吧。"]
                        : ["<32>{#p/alphys}* 這只是Eyewalker Prime而已。"]
                    : ["<33>{#p/story}* EYEWALKER PRIME - 攻擊32 防禦26\n* 這個怪物比看起來還要難應付。"],
        act_check2: [
            '<33>{#p/story}* EYEWALKER PRIME - 攻擊32 防禦26\n* 很滿意你對家族傳統的遵循。'
        ],
        act_check3: ['<32>{#p/story}* EYEWALKER PRIME - 攻擊32 防禦26\n* 覺得你現在很「順眼」。'],
        act_check4: [
            '<32>{#p/story}* EYEWALKER PRIME - 攻擊32 防禦26\n* 對這個怪物而言，\n  傳統總是比安全更重要。'
        ],
        act_stare: ['<32>{#p/human}* （你緊盯著Eyewalker Prime。）'],
        act_smile: ['<32>{#p/human}* （你對著Eyewalker Prime微笑。）'],
        act_flirt: () => [
            '<32>{#p/human}* （你對著Eyewalker Prime眨眼。）',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 噢，得了吧。'] : [])
        ],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime正凝視著你的靈魂。'],
        status2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime露出了\n  兇狠的笑容。'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ["<32>{#p/story}* Eyewalker Prime可不是省油的燈。"],
        status4: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* Eyewalker Prime想到了\n  他們家族的榮譽。"],
        status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 漱口水的味道撲面而來。']),
        perilStatus: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* 呃...'] : ['<32>{#p/story}* Eyewalker Prime在流淚。'],
        idleTalk1: ['<08>{#p/basic}{~}放馬過來！'],
        idleTalk2: ['<08>{#p/basic}{~}讓我\n見識一下\n你的怒火！'],
        idleTalk3: ["<08>{#p/basic}{~}不要\n打退堂鼓！"],
        idleTalk4: ['<08>{#p/basic}{~}讓我看看你\n的容貌！'],
        idleTalk5: ['<08>{#p/basic}{~}你有\n啥實力？'],
        flirtTalk: ["<08>{#p/basic}{~}哈。\n想得美。\n我已經\n有伴了！"],
        partialTalk1: ["<08>{#p/basic}{~}已經成功\n一半了.."],
        partialTalk2: ["<08>{#p/basic}{~}就差\n一點了.."],
        partialTalk3: ["<08>{#p/basic}{~}快要\n成功了.."],
        partialStatus1: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 你現在得幹點別的。']
                    : ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime還沒看夠。'],
        partialStatus2: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 看到你微笑地盯著他們，\n  Eyewalker家族很高興。']
                    : ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime想要看穿全局。'],
        partialStatus3: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 幹-幹點別的吧！']
                    : ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* Eyewalker Prime希望你能\n  聽從它的指示。"],
        fullStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* 現在，Eyewalker Prime\n  看起來很滿意...']
                    : ['<32>{#p/alphys}* 它現在看起來很滿意...']
                : ['<32>{#p/story}* Eyewalker Prime很高興。'],
        partialIdleTalk1: ['<08>{#p/basic}{~}你在\n等什麼？'],
        partialIdleTalk2: ['<08>{#p/basic}{~}你要\n做什麼嗎，\n還是...'],
        partialIdleTalk3: ["<08>{#p/basic}{~}你就這點\n本事嗎？"],
        fullIdleTalk1: ['<08>{#p/basic}{~}很高興\n我們\n看對眼了。'],
        fullIdleTalk2: ['<08>{#p/basic}{~}夥計，你\n看起來\n不錯。'],
        fullIdleTalk3: ["<08>{#p/basic}{~}就是這樣。"],
        flirtTalkFull: ['<08>{#p/basic}{~}嗯..', '<08>{#p/basic}{~}你的舉動\n讓我\n心悅誠服..'],
        hurtTalk: ["<08>{#p/basic}{~}我不是\n那個意思！"]
    },
    b_opponent_migospel: {
        genostatus: ['<32>{#p/asriel2}* ...'],
        epiphany: [
            
            ["<08>{#p/basic}{~}反正\n我也不想\n跟你打。"],
            () =>
                world.meanie
                    ? 
                    ['<08>{#p/basic}{~}我就不該\n找你麻煩。']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}你這人\n真怪。', '<08>{#p/basic}{~}但我喜歡。']
                        : SAVE.data.b.oops
                            ? 
                            ["<08>{#p/basic}{~}好啊。\n多一個\n朋友...", "<08>{#p/basic}{~}總比\n多一個\n敵人好。"]
                            : 
                            ['<08>{#p/basic}{~}嗯..', "<08>{#p/basic}{~}想抱的話\n你就抱吧。"],
            
            ["<08>{#p/basic}{~}是時候...", '<08>{#p/basic}{~}...面對\n死亡了。'],
            
            ["<08>{#p/basic}{~}你花錢\n比我精明，\n所以...", '<08>{#p/basic}{~}這錢，\n你拿著吧。']
        ],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<32>{#p/basic}* Silencio逃走了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Silencio逃走了！'
        ],
        old_spray_text: ['<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）', '<32>{#p/basic}* Silencio逃走了！'],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Silencio是嗎？\n* 啊，這傢伙經常到處亂跑。']
                        : ["<32>{#p/alphys}* 這只是Silencio罷了。"]
                    : ['<32>{#p/story}* SILENCIO - 攻擊28 防禦17\n* 無恥而懦弱。\n* 來湊熱鬧的。'],
        act_flirt: () => [
            '<32>{#p/human}* （你向Silencio調情。）',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 好吧...'] : [])
        ],
        flirtTalk: ["<09>{#p/basic}{~}你真可愛。"],
        act_insult: ['<32>{#p/human}* （你辱罵了Silencio。）\n* （沒什麼效果。）'],
        groupStatus1: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Silencio對他人視而不見。'],
        groupStatus2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 聞起來像休息區。'],
        groupTalk1: ['<08>{#p/basic}給我\n讓開。'],
        groupTalk2: ['<08>{#p/basic}你們\n這些人\n真慢。'],
        groupTalk3: ["<08>{#p/basic}我不\n參與。"],
        groupTalk4: ['<08>{#p/basic}可別\n聚在一塊。'],
        groupTalk5: ['<08>{#p/basic}危險是\n留給\n傻瓜的。'],
        groupTalk6: ['<08>{#p/basic}能不能\n走開。'],
        name: '* Silencio',
        soloStatus: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* 看來它一開始就不想這麼做。']
                : ["<32>{#p/story}* Silencio不需要任何人\n  在它身邊。"],
        soloTalk1: ["<08>{#p/basic}{~}我將過得\n很好。"],
        soloTalk2: ['<08>{#p/basic}{~}搭檔\n什麼的..\n就是\n靠不住。'],
        soloTalk3: ['<08>{#p/basic}{~}終於可以\n獨處了。'],
        soloTalk4: ['<08>{#p/basic}{~}恰，\n恰。'],
        soloTalk5: ['<08>{#p/basic}{~}在寧靜中\n舞蹈。'],
        perilTalk: ["<08>{#p/basic}{~}我要\n走了。"]
    },
    b_opponent_mushketeer: {
        name: '* Mushketeer',
        epiphany: [
            
            ["<08>{#p/basic}{~}這樣\n我就只好\n饒恕你了！"],
            () =>
                world.meanie
                    ? 
                    ["<08>{#p/basic}{~}我的\n蘑菇帽\n要掉了！\n撤退！"]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ["<08>{#p/basic}{~}情場\n戰場，\n不擇\n手段。"]
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}從今往後，\n我們就是\n盟友了！']
                            : 
                            ['<08>{#p/basic}{~}擁抱真是\n和平的\n關鍵！'],
            
            ['<08>{#p/basic}{~}為這\n無盡衝突\n劃上句號！'],
            
            ['<08>{#p/basic}{~}戰利品\n歸你了！']
        ],
        old_gun_text: ['<32>{#p/human}* （你開了一槍。）', '<33>{#p/basic}* Mushketeer可算是碰上對手了！'],
        old_bomb_text: [
            '<32>{#p/human}* （你引爆了炸彈。）\n* （雲霧繚繞。）',
            '<32>{#p/basic}* Mushketeer投降了！'
        ],
        old_spray_text: [
            '<32>{#p/human}* （你噴灑了糖霧。）\n* （好甜...）',
            '<32>{#p/basic}* Mushketeer被削弱了！'
        ],
        idleTalk1: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}你的\n恐怖統治\n結束了！']
                : ['<08>{#p/basic}{~}來和我\n一起\n上前線。'],
        idleTalk2: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}等著被\n處決吧！']
                : ["<08>{#p/basic}{~}情場\n...核心，\n不擇\n手段。"],
        idleTalk3: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}論火力，\n我為\n第一！']
                : ['<08>{#p/basic}{~}沒有比\n戰時\n更美好的\n時刻了..'],
        hurtStatus: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* 離死不遠了。']
                : ['<32>{#p/story}* Mushketeer開始了最後的攻勢。'],
        genoStatus: ['<32>{#p/asriel2}* Mushketeer。'],
        status0: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* 怎麼這玩意也要擋我們路？']
                : !world.badder_lizard
                    ? ["<32>{#p/alphys}* 可別死了。"]
                    : ['<32>{#p/story}* Mushketeer擋住了去路！'],
        status1: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer堅定不移。']),
        status2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer想做一個英雄。'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer在為交火做準備。'],
        status4: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer伸手去拿槍。'],
        status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* 乾燥泥土的味道撲面而來。']),
        travelStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* Mushketeer，祈禱與齊掃專家。"],
        travelStatus2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer緊張不安。'],
        travelStatus3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer急速掃視著四周。'],
        act_check: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Mushketeer，火槍手。\n* 遠方蘑菇的髒表親...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Mushketeer。\n* 我不知道這是誰。']
                        : ["<32>{#p/alphys}* 這只是Mushketeer罷了。"]
                    : ['<32>{#p/story}* MUSHKETEER - 攻擊30 防禦28\n* 擁有特殊的成長經歷。\n* 火槍手。'],
        act_check2: ['<32>{#p/story}* MUSHKETEER - 攻擊30 防禦28\n* 正在反思自己的成長經歷。\n* 半吊子火槍手。'],
        act_check3: ['<32>{#p/story}* MUSHKETEER - 攻擊30 防禦28\n* 忘記了自己的成長經歷。\n* 心暖花開。'],
        act_check4: ['<32>{#p/story}* MUSHKETEER - 攻擊30 防禦28\n* 蘑菇的字典裡，\n  從來沒有「退縮」二字。'],
        act_flirt: () => [
            '<32>{#p/human}* （你邀請Mushketeer來參加\n  一場私下的槍戰。）',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 別吧。'] : [])
        ],
        flirtTalk: ["<08>{#p/basic}{~}嘿！\n我們這\n沒這說法。"],
        flirtTalk2: ["<08>{#p/basic}{~}好吧..\n如果你\n為此\n感興趣.."],
        flirtStatus: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Mushketeer。']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* 好吧，那行不通。"]
                        : ['<32>{#p/alphys}* ...']
                    : ['<32>{#p/story}* 壞了，Mushketeer是認真的。'],
        flirtStatus2: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Mushketeer。']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* 等等，成了？']
                        : ['<32>{#p/alphys}* ...']
                    : ['<32>{#p/story}* 好了，Mushketeer是認真的。'],
        act_travel1: () => [
            '<32>{#p/human}* （你靠近了Mushketeer。）',
            "<32>{#p/basic}* Mushketeer的攻擊變得更加猛烈！",
            ...(world.genocide
                ? ['<32>{#p/asriel2}* ...？']
                : !world.badder_lizard && calm_lizard()
                    ? ['<32>{#p/alphys}* 小心...']
                    : [])
        ],
        act_travel2: () => [
            '<32>{#p/human}* （你來到Mushketeer身邊。）',
            "<32>{#p/basic}* Mushketeer的攻擊開始瘋狂起來！",
            ...(world.genocide
                ? ['<32>{#p/asriel2}* $(name)...？']
                : !world.badder_lizard && calm_lizard()
                    ? ['<32>{#p/alphys}* 我的老天，小心點啊...！']
                    : [])
        ],
        act_travel3: () => [
            '<32>{#p/human}* （可是，你都快貼上Mushketeer了。）',
            ...(world.genocide
                ? ['<32>{#p/asriel2}* 我有點擔心了。']
                : !world.badder_lizard && calm_lizard()
                    ? ['<32>{#p/alphys}* 幹-幹點別的事吧！！！']
                    : [])
        ],
        travelTalk1: ["<08>{#p/basic}{~}你以為\n你在\n幹什麼！"],
        travelTalk2: ["<08>{#p/basic}{~}你在\n搞什麼鬼！"],
        act_disarm1: () => [
            "<32>{#p/human}* （你試圖繳Mushketeer的械，\n  但你離得太遠了。）",
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* 你可以試著再靠近點。'] : [])
        ],
        act_disarm2: () => [
            "<32>{#p/human}* （你試圖繳Mushketeer的械，\n  但你就是夠不著。）",
            ...(!world.badder_lizard && calm_lizard()
                ? ['<32>{#p/alphys}* 我想...\n* 你得再靠近點...']
                : [])
        ],
        act_disarm3: () => ['<32>{#p/human}* （你繳了Mushketeer的械。）'],
        act_disarm3x: ['<32>{#p/human}* （但Mushketeer已經被繳械了。）'],
        act_disarm4: pager.create(
            0,
            [
                '<32>{#p/human}* （你試圖繳Mushketeer的械，\n  但Mushketeer將你\n  打回了原點。）',
                "<32>{#p/asriel2}* 我們在浪費時間。"
            ],
            [
                '<32>{#p/human}* （你試圖繳Mushketeer的械，\n  但Mushketeer將你\n  打回了原點。）',
                '<32>{#p/asriel2}* ...'
            ]
        ),
        disarmTalk: [
            '<08>{#p/basic}{~}我想\n這意味著\n停戰了..？',
            '<08>{#p/basic}{~}\x00*嘆氣*',
            "<08>{#p/basic}{~}也許\n這樣是\n最好的吧。"
        ],
        disarmStatus: ['<32>{#p/story}* Mushketeer等待著\n  這場戰鬥的結束。'],
        postDisarmTalk1: ['<08>{#p/basic}{~}噢好吧..'],
        postDisarmTalk2: ['<08>{#p/basic}{~}事實就是\n這樣了..']
    },

    
    b_opponent_pyrope: {
        name: '* Hotwire',
        epiphany: [
            ['<08>{#p/basic}{~}請不要擔心\n我的朋友', "<08>{#p/basic}{~}我現在就走\n開個好頭。"],
            () =>
                world.meanie
                    ? [
                        "<08>{#p/basic}{~}你的態度可\n真是讓我\n驚呆",
                        '<08>{#p/basic}{~}逃離是再\n合理不過的\n安排！'
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}請不要再\n推推搡搡', "<08>{#p/basic}{~}你我情海\n早已蕩漾！"]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}我發誓永遠\n做你夥伴', '<08>{#p/basic}{~}天打雷劈\n也絕不反叛！']
                            : [
                                '<08>{#p/basic}{~}這感覺可\n真是驚人',
                                '<08>{#p/basic}{~}你的存在\n繞我心門。'
                            ],
            ["<08>{#p/basic}{~}就像我\n告訴過我媽", '<08>{#p/basic}{~}這一天遲早\n會到達。'],
            ['<08>{#p/basic}{~}只有一場\n列車災禍', "<08>{#p/basic}{~}你的薪水\n再沒著落！"]
        ],
        genoStatus: ['<32>{#p/asriel2}* Hotwire。'],
        genoSpareStatus: ["<32>{#p/asriel2}* 不堪一擊。"],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Hotwire，說唱呆子。\n* 腦子這麼活絡，\n  卻把才華浪費在這種小兒科上。']
                : ['<32>{#p/story}* HOTWIRE - 攻擊29 防禦14\n* 這種怪物很狡猾，\n  任何計畫對它來說都不複雜。'],
        act_check2: [
            '<32>{#p/story}* HOTWIRE - 攻擊29 防禦14\n* 這個怪物點燃的火花正在熄滅。'
        ],
        act_check3: ["<32>{#p/story}* HOTWIRE - 攻擊29 防禦14\n* 這個冒煙蠢貨的押韻詞容易著火。"],
        act_check4: ['<32>{#p/story}* HOTWIRE - 攻擊29 防禦14\n* 重新點燃了對說唱的熱愛，每次一句。'],
        act_flirt: ['<32>{#p/human}* （你對Hotwire調情。）', '<32>{#p/basic}* Hotwire也向你調情！'],
        act_diss: ['<32>{#p/human}* （你使勁貶損Hotwire。）'],
        dissTalk1: ['<08>{#p/basic}{~}你若罵我\n不會說唱', '<08>{#p/basic}{~}我可得說\n你行你上！'],
        dissTalk2: [
            '<08>{#p/basic}{~}你的嘲諷，\n也太無趣',
            '<08>{#p/basic}{~}不如抓緊，\n速速逃去！',
            '<08>{#p/basic}{~}否則你將，\n大受恐懼！'
        ],
        dissTalk3: [
            "<08>{#p/basic}{~}認為自己，\n很是時髦？",
            "<08>{#p/basic}{~}不過如此，\n一介草包！",
            "<08>{#p/basic}{~}我是最初\n火焰狂潮",
            '<08>{#p/basic}{~}你這弱雞，\n真是無聊！'
        ],
        sparkText1: ["<32>{#p/human}* （你點亮了Hotwire的引線。）", "<32>{#p/basic}* Hotwire的自信不斷增加。"],
        sparkText2: ["<32>{#p/human}* （你點亮了Hotwire的引線。）", '<32>{#p/basic}* Hotwire達到了巔峰！'],
        sparkText3: ["<32>{#p/human}* （你點亮了Hotwire的引線。）", '<32>{#p/basic}* Hotwire已經通電了。'],
        rapText1: ['<32>{#p/human}* （你向Hotwire說唱。）', '<32>{#p/basic}* Hotwire對你很冷漠。'],
        rapText2: ['<32>{#p/human}* （你向Hotwire說唱。）', '<32>{#p/basic}* Hotwire對你很失望。'],
        rapText3: ['<32>{#p/human}* （你向Hotwire說唱。）', '<32>{#p/basic}* Hotwire感到你很噁心。'],
        idleTalk1: ['<08>{#p/basic}{~}管他什麼\n烈焰\n在燃燒', '<08>{#p/basic}{~}我就這樣\n無畏\n且驕傲！'],
        idleTalk2: ["<08>{#p/basic}{~}老子登場，\n就炙熱\n無雙", "<08>{#p/basic}{~}無所畏懼，\n枷鎖\n給鎖上"],
        idleTalk3: ['<08>{#p/basic}{~}擋不住我，\n放肆\n和張揚！', "<08>{#p/basic}{~}烈焰熊熊，\n我從容\n不慌，"],
        idleTalk4: ["<08>{#p/basic}{~}我的節奏，\n你可\n跟不上", "<08>{#p/basic}{~}舞臺中央，\n我閃閃\n發光！"],
        idleTalk5: ["<08>{#p/basic}{~}身處火線，\n我迎戰\n熱浪", '<08>{#p/basic}{~}想來試試？\n就帶上\n力量！'],
        flirtTalk: ['<08>{#p/basic}{~}我的撩撥\n無敵手，', "<08>{#p/basic}{~}機智反擊\n全抓走！"],
        sparkTalk1A: [
            "<08>{#p/basic}{~}一發熱浪\n送給你",
            "<08>{#p/basic}{~}讓你認清\n你自己！",
            '<08>{#p/basic}{~}熾熱如同\n電烙筆！'
        ],
        sparkTalk2A: [
            "<08>{#p/basic}{~}一戰註定\n打你\n只能挨！",
            '<08>{#p/basic}{~}用四個字\n描摹\n你慘敗',
            '<08>{#p/basic}{~}不知好歹、\n自食其災、\n哭天喊地、\n卻無人來！'
        ],
        sparkTalk3A: [
            '<08>{#p/basic}{~}危險危險，\n遠處\n來了一人',
            "<08>{#p/basic}{~}狙擊手來，\n改寫\n人生劇本",
            '<08>{#p/basic}{~}一發子彈，\n勝負早已\n定分！'
        ],
        sparkFlirtTalkA: [
            '<08>{#p/basic}{~}汝等鼠輩，\n喜歡甜蜜\n愛戀',
            '<08>{#p/basic}{~}快準備好，\n接受熾熱\n考驗',
            "<08>{#p/basic}{~}聽這歌聲，\n你將\n夜不能眠！"
        ],
        sparkTalk1B: [
            "<08>{#p/basic}{~}我如流水般\n流暢自信",
            '<08>{#p/basic}{~}我燦爛笑容，\n掌聲來臨',
            "<08>{#p/basic}{~}出手凌厲，\n你要喊救命",
            "<08>{#p/basic}{~}你會期盼，\n正身處夢境！"
        ],
        sparkTalk2B: [
            '<08>{#p/basic}{~}使命完成，\n掌控全局，',
            "<09>{#p/basic}{~}左右逢源，\n百萬壯舉！",
            "<08>{#p/basic}{~}而你這條，\n小小鹹魚",
            '<08>{#p/basic}{~}想完爆你，\n只需一句！'
        ],
        sparkTalk3B: [
            "<08>{#p/basic}{~}我天生殺手，\n可氣吞萬裡",
            "<08>{#p/basic}{~}你只是廢物，\n不值我一提",
            '<08>{#p/basic}{~}而你的歌詞，\n都不通人理',
            '<08>{#p/basic}{~}我每句爆款，\n你前功盡棄！'
        ],
        sparkFlirtTalkB: [
            "<08>{#p/basic}{~}夥計，\n你這是\n在玩火！",
            "<08>{#p/basic}{~}你的能力\n永遠\n追不上我",
            '<08>{#p/basic}{~}我等待你\n一次不小心\n失誤',
            '<08>{#p/basic}{~}用韻腳突擊\n叫你心服\n口服！'
        ],
        status1: ['<32>{#p/story}* Hotwire正在尋找額外的動力。'],
        status2: ['<32>{#p/story}* Hotwire吟唱起了一場風暴。'],
        status3: ['<32>{#p/story}* Hotwire被它迷人的微笑保護了起來。'],
        status4: ['<32>{#p/story}* Hotwire嘗試渦輪增壓。'],
        status5: ['<32>{#p/story}* 聞起來像抒情。'],
        sparkStatus1A: ['<32>{#p/story}* Hotwire被它的輝煌震驚了。'],
        sparkStatus2A: ['<32>{#p/story}* Hotwire啟動了點火程式...\n  而且是手動點火。'],
        sparkStatus3A: ['<32>{#p/story}* Hotwire我行我素，\n  根本不在乎我們的目光。'],
        sparkStatus1B: ['<32>{#p/story}* Hotwire很興奮。'],
        sparkStatus2B: ['<32>{#p/story}* Hotwire的能力完全釋放了出來。'],
        sparkStatus3B: ['<32>{#p/story}* Hotwire正在渦輪增壓。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 離死不遠了。'] : ['<32>{#p/story}* Hotwire要失控了。']
    },

    b_opponent_perigee: {
        name: '* Perigee',
        epiphany: [
            ['<08>{#p/basic}{~}我要去\n別的地方\n了。'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}這兒不安全。']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}這是\n愛嗎？']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}我期待\n我們的\n友誼。']
                            : ['<08>{#p/basic}{~}非常..\n感謝..'],
            ['<08>{#p/basic}{~}我明白\n我必須死。', '<08>{#p/basic}{~}請..\n以我的\n名義\n活下去..'],
            ['<08>{#p/basic}{~}要多少\n拿多少。']
        ],
        genoStatus: ['<32>{#p/asriel2}* Perigee。'],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Perigee，一隻傻鳥，\n  跟死豬似的。\n* 成天淨知道做白日夢。']
                : ['<32>{#p/story}* PERIGEE - 攻擊25 防禦0\n* 這隻和平之鳥相信\n  它的羽毛能治癒一切創傷。'],
        act_check2: [
            '<33>{#p/story}* PERIGEE - 攻擊25 防禦0\n* 這隻和平之鳥正試著\n  用自己的羽毛來治療自己。'
        ],
        act_check3: ['<32>{#p/story}* PERIGEE - 攻擊25 防禦0\n* 既是和平之鳥，\n  亦是藝術之守護神。'],
        act_check4: [
            '<32>{#p/story}* PERIGEE - 攻擊25 防禦0\n* 這隻和平之鳥\n  欣賞著你那柏拉圖式的情歌。'
        ],
        act_flirt: ['<32>{#p/human}* （你向Perigee調情。）'],
        act_yell: ['<32>{#p/human}* （你扯著嗓子，\n  衝Perigee大喊大叫。）'],
        idleTalk1: ['<08>{#p/basic}{~}啾啾，\n啾啾。'],
        idleTalk2: ['<08>{#p/basic}{~}\x00*舒緩的\n哨聲*'],
        idleTalk3: ['<08>{#p/basic}{~}生命\n真美好。'],
        idleTalk4: ['<08>{#p/basic}{~}\x00*拍打翅膀\n的聲音*'],
        idleTalk5: ['<08>{#p/basic}{~}和平與\n安寧。'],
        flirtTalk: ["<08>{#p/basic}{~}額？\n我不\n明白..."],
        yellTalk1: ["<08>{#p/basic}{~}沒關係，\n我能讓你\n好一些。"],
        yellTalk2: ["<08>{#p/basic}{~}來，\n我幫你\n平靜下來。"],
        yellTalk3: ["<08>{#p/basic}{~}不要\n生氣。", '<08>{#p/basic}{~}你可以吹\n其他曲子。'],
        flirtTalkX: [
            '<08>{#p/basic}{~}啊，那句\n可愛的話\n是你的\n歌嗎？',
            '<08>{#p/basic}{~}我接受了，\n還有你的\n姿態。'
        ],
        whistleTalkX: ['<08>{#p/basic}{~}我接受你\n的姿態。'],
        whistleTalk: ['<08>{#p/basic}{~}\x00*專心地\n吹口哨*'],
        whistleStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Perigee。'] : ['<32>{#p/story}* Perigee等待著你的回應。'],
        act_bow1: ['<32>{#p/human}* （但沒有什麼可以鞠躬。）'],
        act_bow2: ['<32>{#p/human}* （你鞠了一躬。）\n* （Perigee也對你鞠了一躬。）\n* （雙方達成了諒解。）'],
        act_whistle: [
            '<32>{#p/human}* （你吹了一首寧靜的曲子。）\n* （Perigee以哨聲回應。）\n* （歌聲餘音繞梁...）'
        ],
        status1: ['<32>{#p/story}* 你進入了Perigee的軌道附近。'],
        status2: ['<32>{#p/story}* Perigee的生活無憂無慮。'],
        status3: ['<32>{#p/story}* Perigee非常開心。'],
        status4: ['<32>{#p/story}* Perigee以羽毛輕觸。'],
        status5: ['<32>{#p/story}* 聞起來像備用麵包。'],
        status6: () =>
            world.goatbro ? ["<32>{#p/asriel2}* 不堪一擊。"] : ['<32>{#p/story}* Perigee非常滿足。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 離死不遠了。'] : ["<32>{#p/story}* Perigee的死期快到了。"]
    },

    b_opponent_tsundere: {
        name: '* Tsunderidex',
        epiphany: [
            ["<08>{#p/basic}{~}快-快走，\n我又不想\n留你！"],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}離-\n離我遠點！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}我...', '<08>{#p/basic}{~}我其-其實\n也愛你！']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}只-只是\n交個朋友，\n對吧？', '<08>應該\n沒問題...']
                            : ['<08>{#p/basic}{~}欸？\n幹什...', '<08>{#p/basic}{~}..喔..\n謝謝，欸嘿..'],
            ["<08>{#p/basic}{~}你真\n這麼想\n的話...", "<08>{#p/basic}{~}我-我願意\n為你而死！"],
            ["<08>{#p/basic}{~}這可不是\n讓-讓你\n買婚戒的！"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex，\n  這傢伙，我無話可說。']
                : ['<32>{#p/story}* TSUNDERIDEX - 攻擊25 防禦26\n* 看起來很刻薄，\n  但其實暗地裡很喜歡你？'],
        act_check2: [
            '<32>{#p/story}* TSUNDERIDEX - 攻擊25 防禦26\n* 仰天大嘯出門去，\n  我輩豈是傲嬌姬？'
        ],
        act_check3: ["<32>{#p/story}* TSUNDERIDEX - 攻擊25 防禦26\n* 這個猶豫的情人的引擎\n  現在由你驅動。"],
        act_check4: ['<32>{#p/story}* TSUNDERIDEX - 攻擊25 防禦26\n* 看起來... 很嫉妒。'],
        act_check5: ['<32>{#p/story}* TSUNDERIDEX - 攻擊25 防禦26\n* 隨時會爆發。'],
        act_ignore: ["<32>{#p/human}* （你故意無視了Tsunderidex\n  的存在。）"],
        flirtText1: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它擁有引人矚目的護盾。）'],
        flirtText2: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它擁有很棒的大炮。）'],
        flirtText3: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它有一個強大的折躍引擎。）'],
        flirtText4: ['<32>{#p/human}* （你告訴Tsunderidex，\n  你喜歡它在虛擬小說上的品味。）'],
        flirtText5: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它擁有可愛的引擎支柱。）'],
        flirtText6: ["<32>{#p/human}* （你告訴Tsunderidex，\n  你想給它的電容器增壓。）"],
        flirtText7: ["<32>{#p/human}* （你告訴Tsunderidex，\n  你想把它擦得閃閃發光。）"],
        flirtText8: ['<32>{#p/human}* （你告訴Tsunderidex，\n  你們應該用鼻子互相輕蹭對方。）'],
        flirtText9: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它的頂鏟是完美無缺的。）'],
        flirtText10: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它有一個令人驚嘆的機翼。）'],
        flirtText11: ['<32>{#p/human}* （你告訴Tsunderidex，\n  它擁有迷人的光管。）'],
        flirtText12: ["<32>{#p/human}* （你告訴Tsunderidex，\n  你想去一個沒有人類\n  去過的地方。）"],
        stealText: ['<32>{#p/human}* （你靠近了Tsunderidex，\n  並抽取它的電池能量。）'],
        upgradeText1: ["<32>{#p/human}* （你激活了Tsunderidex引擎的\n  滑流飛行模塊。）"],
        upgradeText2: ["<32>{#p/human}* （你激活了Tsunderidex大炮的\n  超相位發射機制。）"],
        upgradeText3: ["<32>{#p/human}* （你激活了Tsunderidex護盾的\n  自適應調節。）"],
        upgradeText4: [
            "<33>{#p/human}* （你無法再激活了。）\n* （Tsunderidex的主體部位\n  已全部激活。）"
        ],
        idleTalk1: ["<08>{#p/basic}{~}別整得跟\n我喜歡你\n似的。"],
        idleTalk2: ['<08>{#p/basic}{~}大..\n大傻瓜！'],
        idleTalk3: ["<08>{#p/basic}{~}哼！\n你擋我\n路了。"],
        idleTalk4: ['<08>{#p/basic}{~}(..哎呦!)\n人類...'],
        idleTalk5: ['<08>{#p/basic}{~}..\n人-人類\n..\n..？'],
        flirtTalk1: ['<08>{#p/basic}{~}啊！？\n臭-臭流氓！'],
        flirtTalk2: ['<08>{#p/basic}{~}想-想得美！\n哼！'],
        flirtTalk3: ['<08>{#p/basic}{~}...你是\n真心的嗎？'],
        flirtTalk4: ['<08>{#p/basic}{~}我..\n謝-謝謝你..'],
        flirtTalk5: ['<08>{#p/basic}{~}什-什麼？\n現在？？？', '<08>{#p/basic}{~}太早了啦\n..'],
        jellyTalk1: ["<08>{#p/basic}{~}嘿！\n憑-憑什麼！"],
        jellyTalk2: ['<08>{#p/basic}{~}呃，你們\n兩個怪怪\n的。'],
        jellyTalk3: ['<08>{#p/basic}{~}離-離那家\n夥遠點！'],
        upgradeTalk1: ['<08>{#p/basic}{~}幹-\n幹什麼？？'],
        upgradeTalk2: ['<08>{#p/basic}{~}咳咳。\n人類。'],
        upgradeTalk3: ['<08>{#p/basic}{~}喔..\n..\n哇-哇喔..'],
        stealTalk1: ["<08>{#p/basic}{~}別-別這樣！\n行嗎？"],
        stealTalk2: ['<08>{#p/basic}{~}..\n..\n（為什麼..）'],
        stealTalk3: ['<08>{#p/basic}{~}別搶我的\n風頭了！'],
        ignoreTalk1: ['<08>{#p/basic}{~}哼！\n你愛理\n不理！'],
        ignoreTalk2: ["<08>{#p/basic}{~}沒錯！\n我又沒\n想留你！"],
        upgradeStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 你真打算這麼做？']
                : ['<32>{#p/story}* Tsunderidex在檢查\n  你剛才激活的部件。'],
        upgradeStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 簡直是浪費時間...']
                : ['<32>{#p/story}* Tsunderidex對你\n  剛才激活的部件很來電。'],
        upgradeStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* ...']
                : ['<32>{#p/story}* Tsunderidex對你\n  剛才激活的部件很不安心。'],
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex。']
                : ['<32>{#p/story}* Tsunderidex在高處望著你，\n  很快又把頭扭開了。'],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex。']
                : ['<32>{#p/story}* Tsunderidex對你\n  輕蔑地撇了撇鼻子。'],
        status3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex。']
                : ['<32>{#p/story}* Tsunderidex「不小心」地用機艙\n  蹭了下你。'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex。']
                : ['<32>{#p/story}* Tsunderidex將大炮\n  設定為「暈眩」。'],
        status5: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Tsunderidex。'] : ['<32>{#p/story}* 聞起來像太空仙人掌。'],
        status6: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 不堪一擊。"]
                : ['<32>{#p/story}* Tsunderidex面帶羞澀，\n  把目光移開了。'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 離死不遠了。']
                : ["<32>{#p/story}* 等離子氣體\n  從Tsunderidex的引擎噴出。"]
    },

    b_opponent_rg01: {
        name: () => (world.bad_lizard > 1 ? '* 一號守衛' : '* 三號守衛'),
        epiphaNOPE: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}那個，\n你在幹啥呢？']
                : ["<11>{#p/undyne}{#p/basic}{~}不是這樣的，\n長官。"],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 一號守衛...\n* 這倆貨我沒啥好說的。"]
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 一號守衛 - 攻擊30 防禦20\n* 這對自信的情侶\n  似乎鐵了心想幹掉你。']
                    : ['<32>{#p/story}* 三號守衛 - 攻擊30 防禦20\n* 對牛仔女孩情有獨鍾，\n  還是個懷疑論者。'],
        act_check2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一號守衛 - 攻擊30 防禦20\n* 就算犧牲生命，\n  也要徹底幹掉你。']
                : ['<32>{#p/story}* 三號守衛 - 攻擊30 防禦20\n* 之後想把指甲好好剪剪。'],
        act_check3: ['<32>{#p/story}* 三號守衛 - 攻擊30 防禦20\n* 她倆終於在一起了...'],
        act_check4: ['<32>{#p/story}* 三號守衛 - 攻擊30 防禦20\n* 心碎了。'],
        act_check5: ['<32>{#p/story}* 三號守衛 - 攻擊30 防禦20\n* 想把心裡話\n  馬上說出來...'],
        act_check6: ['<32>{#p/story}* 三號守衛 - 攻擊30 防禦20\n* 真心想挽回，可惜太自卑。'],
        randTalk1: () => ['<11>{#p/basic}{~}組合技。'],
        randTalk2: () =>
            world.bad_lizard > 1 ? ["<11>{#p/basic}{~}我們會\n阻止你..."] : ["<11>{#p/basic}{~}我倆只是\n普通朋友..."],
        randTalk3: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}你不是\n我們的對手。"]
                : ["<11>{#p/basic}{~}別硬給我們\n牽線搭橋..."],
        randTalk4: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}兄弟，當心。'] : ['<11>{#p/basic}{~}姑娘，當心。'],
        randStatus1: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一號和二號配合默契。']
                : ["<33>{#p/story}* 三號想繼續和四號做普通朋友。\n* 四號沒有異議。"],
        randStatus2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一號和二號正準備施展\n  下一輪組合技。']
                : ['<32>{#p/story}* 三號不再顧慮。\n* 四號鬆了口氣。'],
        randStatus3: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一號和二號互相媳戲，\n  身子不停地撞來撞去。']
                : ["<32>{#p/story}* 三號細細回憶著四號的過往。\n* 四號聳聳肩，毫不在意。"],
        randStatus4: () =>
            world.bad_lizard > 1
                ? ["<32>{#p/story}* 空氣中飄來陣陣男士體香。"]
                : ['<32>{#p/story}* 空氣中飄來陣陣香水芬芳。'],
        randStatus5: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 一號和二號說\n  他們是「最酷的鐵哥們」。']
                : ['<32>{#p/story}* 三號鼓起了勇氣。\n* 四號回應以無言的勇氣。'],
        randTalkLone1: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}下地獄吧。']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}再也無從得知..."],
        randTalkLone2: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}死有餘辜。']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}一切都晚了..."],
        randTalkLone3: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}禽獸不如。']
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}永遠沒機會...'],
        randTalkLone4: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}給我去死。']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}不要啊..."],
        randStatusLone: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 只剩一個了。']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 一號變得更加專注。']
                    : ['<32>{#p/story}* 三號已經徹底懵了。'],

        act_flirt: ['<32>{#p/human}* （你向三號守衛調情。）'],
        flirtTalk1: ['<11>{#p/basic}{~}不準調情。'],
        flirtTalk2: ["<11>{#p/basic}{~}這招對我們\n根本沒用。"],
        flirtTalkNervy1: ['<11>{#p/basic}{~}調情可真... 唉...'],
        flirtTalkNervy2: ["<11>{#p/basic}{~}感覺也... 唉..."],
        flirtTalkLone: ['<11>{#p/basic}{~}...'],
        flirtStatus: ['<32>{#p/story}* 三號努力克制自己的情愫。\n* 四號有點不解...'],
        flirtStatusNervy: ["<32>{#p/story}* 三號快要按捺不住自己的心意。\n* 四號有些擔憂..."],
        act_flirt_happy: [
            '<32>{#p/human}* （你向三號守衛調情。）\n* （她接受了你的讚美，\n  但仍痴情於四號。）'
        ],
        act_flirt_nada: ["<32>{#p/human}* （你向一號守衛調情。）\n* （他根本不搭理你。）"],

        act_tug: ["<32>{#p/human}* （你伸手去拉三號的手套，\n  結果被她一把推開。）"],
        tugTalk1: ['<11>{#p/basic}{~}給我收斂點。'],
        tugTalk2: ['<11>{#p/basic}{~}不準碰我。'],
        tugTalk3: ["<11>{#p/basic}{~}出格了。"],
        tugTalk4: ['<11>{#p/basic}{~}走開。'],
        tugStatus: ['<32>{#p/story}* 看來，有些紅線真不能亂碰。'],
        act_tug_lone: ["<32>{#p/human}* （你伸手去拉三號的手套，\n  她猛地抬起爪子，你撲了個空。）"],
        tugTalkLone: ['<11>{#p/basic}{~}...'],
        tugStatusLone: ['<32>{#p/story}* 三號俯視著你，\n  竭力掩藏內心的感受。'],
        act_tug_happy: [
            "<32>{#p/human}* （你抓住了三號的爪子。）",
            '<32>{#p/basic}* 三號錯把你的手\n  當成了四號的爪子...'
        ],

        tugShock: ['<11>{#p/basic}{~}四號...！', '<11>{#p/basic}{~}...', '<11>{#p/basic}{~}那隻手鐲...'],
        nervyTalk1: ['<11>{#p/basic}{~}四號，\n我...'],
        nervyTalk2: ['<11>{#p/basic}{~}四號，\n我們...'],
        nervyTalk3: ['<11>{#p/basic}{~}四號，\n你...'],
        nervyTalk4: ["<11>{#p/basic}{~}四號，\n這太..."],
        nervyStatus: ['<32>{#p/story}* 太陽風開始轉向，\n  助你一路順風。'],

        act_whisper: ['<32>{#p/human}* （你跟三號守衛悄悄說，\n  有愛就要大聲說出來。）'],
        act_whisper_alt: ['<32>{#p/human}* （你跟三號守衛說了幾句悄悄話。）\n* （什麼都沒發生。）'],

        confess1: ['<11>{#p/basic}{~}四號...'],
        confess2: ['<11>{#p/basic}{~}...', '<11>{#p/basic}{~}...怎麼了，\n三號？'],
        confess3: ['<11>{#p/basic}{~}看我的手...'],
        confess4: ["<11>{#p/basic}{~}那是..."],
        confess5: ['<11>{#p/basic}{~}是團結手鐲。', '<11>{#p/basic}{~}記得嗎？'],
        confess6: [
            "<11>{#p/basic}{~}是你！",
            "<11>{#p/basic}{~}這麼多年\n沒見到你了...",
            "<11>{#p/basic}{~}我以為，\n咱們再也\n無緣相見。",
            "<11>{#p/basic}{~}那之後...\n我在Undyne\n手下\n接受訓練。\n沒想到..."
        ],
        confess7: [
            "<11>{#p/basic}{~}過了這麼\n多年，我還能\n再見到你，\n四號。",
            '<11>{#p/basic}{~}不管你我的\n名字怎麼變...',
            '<11>{#p/basic}{~}我對你的愛\n永遠不變。'
        ],
        confess8: ['<11>{#p/basic}{~}三號...', '<11>{#p/basic}{~}我也愛你！'],
        confess9: ['<11>{#p/basic}{~}...我帶你去\n吃冰淇淋吧？'],
        confess10: ['<11>{#p/basic}{~}三文魚味的？'],
        confess11: ['<11>{#p/basic}{~}想一塊去了！'],

        happyTalk1: ['<11>{#p/basic}{~}這麼多年，\n我好想你...'],
        happyTalk2: ["<11>{#p/basic}{~}有你陪著我，\n好開心..."],
        happyTalk3: ['<11>{#p/basic}{~}沒想到，\n一起並肩\n作戰的人\n原來就是你...'],
        happyTalk4: ['<11>{#p/basic}{~}沒想到，\n那雙明眸，\n就是你的...'],
        happyStatus: ['<32>{#p/story}* 三號和四號幸福地望著彼此。'],

        horrorTalk1: [
            '<11>{#p/basic}{~}{@random=1.1/1.1}不...\n不要...',
            '<11>{#p/basic}{~}{@random=1.1/1.1}明明說好...\n要幸福地\n在一起...'
        ],
        horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}我受不了了..."],
        horrorTalk3: ["<11>{#p/basic}{~}{@random=1.1/1.1}求求你，\n讓我去死..."],
        horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],
        horrorStatus: ['<32>{#p/story}* ...'],

        dangerStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 離死不遠了。']
                : world.bad_lizard > 1
                    ? ["<32>{#p/story}* 一號守衛望向地面。"]
                    : ["<32>{#p/story}* 三號守衛喘著粗氣。"]
    },

    b_opponent_rg02: {
        name: () => (world.bad_lizard > 1 ? '* 二號守衛' : '* 四號守衛'),
        epiphaNOPE: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}沒看懂\n那人在幹啥..."]
                : ["<11>{#p/basic}{~}這招對我\n不好使。"],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 二號守衛...\n* 這倆貨我沒啥好說的。"]
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 二號守衛 - 攻擊30 防禦20\n* 這對自信的情侶\n  似乎鐵了心想阻止你。']
                    : ["<33>{#p/story}* 四號守衛 - 攻擊30 防禦20\n* 她忠於友情，\n  但緣分到了，也願意更進一步..."],
        act_check2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 二號守衛 - 攻擊30 防禦20\n* 就算命喪黃泉，\n  也要徹底消滅你。']
                : ['<32>{#p/story}* 四號守衛 - 攻擊30 防禦20\n* 之後想淘一件新盔甲。'],
        act_check3: ['<32>{#p/story}* 四號守衛 - 攻擊30 防禦20\n* 她倆終於在一起了...'],
        act_check4: ['<32>{#p/story}* 四號守衛 - 攻擊30 防禦20\n* 心碎了。'],
        act_check5: ['<32>{#p/story}* 四號守衛 - 攻擊30 防禦20\n* 有點「露骨」...'],
        act_check6: ['<32>{#p/story}* 四號守衛 - 攻擊30 防禦20\n* 恨不得馬上殺了你。'],
        randTalk1: () => ['<11>{#p/basic}{~}組合技！'],
        randTalk2: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}一勞永逸！'] : ['<11>{#p/basic}{~}純普通朋友！'],
        randTalk3: () =>
            world.bad_lizard > 1 ? ["<11>{#p/basic}{~}你就是\n在送死！"] : ['<11>{#p/basic}{~}強扭的瓜\n不甜！'],
        randTalk4: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}必須滴，\n兄弟！'] : ['<11>{#p/basic}{~}肯定的，\n姑娘！'],
        randTalkLone1: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}你完蛋了！！"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}為什麼要\n這樣對我！？'],
        randTalkLone2: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}休想得逞！！"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}我就她一個\n朋友啊...！'],
        randTalkLone3: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}老子\n宰了你！！']
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}她就是\n我的唯一...'],
        randTalkLone4: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}血債血償！"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}你到底是\n什麼怪物！？'],
        randStatusLone: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 只剩一個了。']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 二號的情緒徹底失控。']
                    : ['<32>{#p/story}* 四號已經心亂如麻。'],

        act_flirt: ['<32>{#p/human}* （你向四號守衛調情。）'],
        flirtTalk1: ["<11>{#p/basic}{~}嚴禁調情！"],
        flirtTalk2: ["<11>{#p/basic}{~}根本沒用！"],
        flirtTalkNervy1: ["<11>{#p/basic}{~}真不像話！"],
        flirtTalkNervy2: ["<11>{#p/basic}{~}也跟我們\n沒關係！"],
        flirtTalkLone: ['<11>{#p/basic}{~}...'],
        act_flirt_happy: [
            "<32>{#p/human}* （你向四號守衛調情。）\n* （她回應了你的讚美，\n  但仍痴情於三號。）"
        ],
        act_flirt_nada: ["<32>{#p/human}* （你向二號守衛調情。）\n* （他根本不搭理你。）"],

        act_tug: ["<32>{#p/human}* （你伸手去拉四號的手套。）", "<32>{#p/basic}* 手套似乎鬆動了..."],
        tugTalk1: ['<11>{#p/basic}{~}你-你在\n幹什麼？'],
        tugTalk2: ["<11>{#p/basic}{~}難不成...\n你要..."],
        tugTalk3: ['<11>{#p/basic}{~}我...\n這太...'],
        tugTalk4: ['<11>{#p/basic}{~}...'],
        tugStatus: ["<32>{#p/story}* 四號的手套\n  眼看就要掉下來了。"],
        act_tug_lone: ["<32>{#p/human}* （你伸手去拉四號的手套。）", "<32>* 她的手套直接就掉了！"],
        tugTalkLone: ['<11>{#p/basic}{~}...'],
        tugStatusLone: ['<32>{#p/story}* 四號不理不睬，任你擺布。'],
        act_tug_hold: ["<32>{#p/human}* （你抓住了四號的爪子。）"],
        holdTalk: ['<11>{#p/basic}{~}呃...'],
        holdStatus: ['<32>{#p/story}* 四號有些不知所措。'],
        act_tug_hold_lone: ["<32>{#p/human}* （你抓住了四號的爪子。）\n* （可她一點反應都沒有。）"],
        holdTalkLone: ['<11>{#p/basic}{~}...'],
        holdStatusLone: ['<32>{#p/story}* 四號放棄了抵抗。'],
        act_tug_happy: [
            "<32>{#p/human}* （你抓住了四號的爪子。）",
            '<32>{#p/basic}* 四號錯把你的手\n  當成了三號的爪子...'
        ],
        tugSuccessStatus: ['<32>{#p/story}* 真是餃子破了皮——露餡了。'],

        tugShock: ["<11>{#p/basic}{~}我的手套...\n要掉了...！"],
        nervyTalk1: ['<11>{#p/basic}{~}三號...？'],
        nervyTalk2: ['<11>{#p/basic}{~}幹嘛露出\n那樣的眼神？'],
        nervyTalk3: ["<11>{#p/basic}{~}三號，\n你的表情\n怎麼怪怪的？"],
        nervyTalk4: ['<11>{#p/basic}{~}你沒事吧？'],

        act_whisper: ['<32>{#p/human}* （你跟四號守衛說了幾句悄悄話。）\n* （可她更加困惑了。）'],
        act_whisper_alt: ['<32>{#p/human}* （你跟四號守衛說了幾句悄悄話。）\n* （什麼都沒發生。）'],

        happyTalk1: ['<11>{#p/basic}{~}我也想你！'],
        happyTalk2: ["<11>{#p/basic}{~}有你在身邊，\n好開心！"],
        happyTalk3: ['<11>{#p/basic}{~}哈哈，\n可不是麼...'],
        happyTalk4: ['<11>{#p/basic}{~}寶貝，\n別多想了！'],

        horrorTalk1: [
            '<11>{#p/basic}{~}{@random=1.1/1.1}不...\n不要...',
            '<11>{#p/basic}{~}{@random=1.1/1.1}明明說好...\n要一起做\n好多好多事...'
        ],
        horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}不可能..."],
        horrorTalk3: ['<11>{#p/basic}{~}{@random=1.1/1.1}求求你...\n殺了我吧...'],
        horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],

        dangerStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* 離死不遠了。']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 二號守衛昂起頭顱。']
                    : ["<32>{#p/story}* 四號守衛喘著粗氣。"]
    },

    b_use: {
        old_spray: () =>
            battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
                ? []
                : ['<32>{#p/human}* （你取出了糖霧噴。）', '<32>{#p/human}* （什麼都沒發生。）'],
        old_gun: () =>
            battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
                ? []
                : ['<32>{#p/human}* （你取出了電擊槍。）', '<32>{#p/human}* （什麼都沒發生。）'],
        old_bomb: () =>
            battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
                ? []
                : ['<32>{#p/human}* （你取出了瞌睡彈。）', '<32>{#p/human}* （什麼都沒發生。）']
    },

    c_name_aerialis: {
        alphys: "給Alphys打電話",
        puzzle: '謎題求助',
        dimboxA: '次元箱子A',
        dimboxB: '次元箱子B',
        pms: () => (SAVE.data.n.plot_pmcheck < pms().length ? '§fill=#ff0§域外網（有新訊息）' : '域外網')
    },

    c_call_aerialis: {
        puzzle2a: () =>
            [
                [
                    '<25>{#p/alphys}{#g/alphysCutscene1}* 喔，我-我在！',
                    '<25>{#g/alphysCutscene2}* 嗯...\n  這個謎題其實蠻簡單的。',
                    '<25>{#g/alphysSide}* 從終端旁經過，\n  它就會改變你的時間位移。',
                    "<25>{#g/alphysSmileSweat}* 用外行話說，\n  你現在在四維時空。",
                    "<25>{#g/alphysInquisitive}* 只不過它並不能\n  算是一個維度，\n  但是... 你懂的。",
                    '<25>{#g/alphysNervousLaugh}* 不管怎樣，要通過此謎題，\n  只需要隨著房間的\n  全局相移...',
                    '<25>{#g/alphysHellYeah}* ...對齊你的局部相位！',
                    '<25>{#g/alphysCutscene2}* 當然，\n  你只需要向前或者\n  向後走就可以了。',
                    '<25>{#g/alphysSmileSweat}* 還-還有，終端顯示的是\n  你的局部相位偏移量...',
                    "<25>{#g/alphysSide}* 這樣，你就可以知道\n  何時才能對齊了。",
                    '<25>{#g/alphysCutscene1}* 嗯，祝-祝好運！'
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ...還沒解決？',
                    '<25>{#g/alphysCutscene2}* 嗯...',
                    '<25>* 可能上回我太囉嗦了，\n  沒解釋清楚...\n* 嘿嘿。',
                    '<25>{#g/alphysSide}* 你就看看哪臺終端寫著0，\n  去那點下確認就好。',
                    "<25>{#g/alphysNervousLaugh}* 再說一次，\n  這與相位偏移有關。",
                    '<25>{#g/alphysCutscene2}* 只要對齊你的\n  局部相位...',
                    '<25>{#g/alphysCutscene2}* ...',
                    "<25>{#g/alphysUhButHeresTheDeal}* 不說了！\n  總之找寫著0的終端就成！！"
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ...又來？',
                    '<25>{#g/alphysSmileSweat}* 嗯，呃...\n* 你先往前走，看好...',
                    '<25>{#g/alphysSideSad}* ...不對，\n  萬一你已經走過頭了。',
                    '<25>{#g/alphysNeutralSweat}* ...',
                    "<25>{#g/alphysCutscene3}* 你腦子應該好使，\n  自-自己琢磨琢磨吧！！"
                ]
            ][SAVE.data.n.cell_puzzleA1++],
        puzzle2b: () =>
            [
                [
                    '<25>{#p/alphys}{#g/alphysCutscene1}* 喔，我-我在！',
                    '<25>{#p/alphys}{#g/alphysCutscene2}* 這套謎題比上回那個\n  稍微複雜一點。',
                    "<25>{#p/alphys}{#g/alphysWelp}* 畢竟比上回多了個維度。",
                    '<25>{#p/alphys}{#g/alphysCutscene3}* 有時我挺懷疑\n  這能增加多少難度的。',
                    '<25>{#p/alphys}{#g/alphysSmileSweat}* 呃，就-就像上一個，\n  對齊你的相位就行。',
                    "<25>{#p/alphys}{#g/alphysFR}* 要是你還聽不懂的話...",
                    "<25>{#p/alphys}{#g/alphysSide}* 你難道一直\n  住在小行星上嗎？"
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ...所以你確實\n  住在小行星上。',
                    '<25>{#p/alphys}{#g/alphysDontGetAllDreamyEyedOnMeNow}* 我真服了，反正找\n  寫著0的終端就好了！'
                ]
            ][SAVE.data.n.cell_puzzleA2++]
    },

    i_tvm_radio: {
        battle: {
            description: '一臺來自地球的老式收音機。',
            name: '收音機'
        },
        drop: ['<32>{#p/human}* （你把老式收音機扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （這件文物你以前好像見過。）"]
                : ["<32>{#p/basic}* 一臺來自地球的老式收音機。"],
        name: '老式收音機',
        use: () =>
            !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
                ? []
                : ['a_lookout', 'f_taxi', 's_taxi', 'w_wonder'].includes(game.room) // NO-TRANSLATE

                    ? [
                        '<32>{#p/human}* （你打開了收音機。）',
                        '<32>{#p/event}{#a.radiostart}* ...',
                        '{*}{#a.radiostop}{%}'
                    ]
                    : ['<32>{#p/human}* （你打開了收音機。）\n* （沒有訊號。）']
    },
    i_tvm_fireworks: {
        battle: {
            description: '一箱來自地球的煙花。',
            name: '煙花'
        },
        drop: ['<32>{#p/human}* （你把整箱煙花全扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （這件所謂的文物\n  你好像並沒見過。）"]
                : ["<32>{#p/basic}* 一箱來自地球的煙花。"],
        name: '煙花',
        use: () =>
            !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
                ? []
                : [
                    '<32>{#p/human}* （你往裝煙花的箱子裡\n  瞅了一眼。）',
                    "<32>* （看來，你還不會放煙花。）"
                ]
    },
    i_tvm_mewmew: {
        battle: {
            description: '一隻等身大的喵喵玩偶。',
            name: '喵喵玩偶'
        },
        drop: () => [
            '<32>{#p/human}* （你把喵喵玩偶扔掉了。）',
            ...((fetchCharacters()
                .find(c => c.key === 'alphys') // NO-TRANSLATE

                ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                ? ((SAVE.data.b.mewget = true),
                    [
                        "<25>{#p/alphys}{#f/23}* 哇，你真是個大好人，\n  還給我留著那個。",
                        '<25>{#p/alphys}{#f/22}* 還保護了這麼久！',
                        '<25>{#p/alphys}{#g/alphysCutscene2}* ...謝謝你。'
                    ])
                : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

                    ? [
                        "<32>{#p/basic}* 你把它留在這了？？",
                        '<32>{#p/basic}* 嗯... 你為啥會以為\n  我想要這個，哈！？',
                        "<32>{#p/basic}* 才怪呢！\n* 這就是一個... \n  愚蠢的玩偶而已！",
                        '<32>{#p/basic}* ... 不過還是挺可愛的...',
                        "<32>{#p/basic}* 看-看啥！？\n* 我才沒臉紅呢！哼！",
                        '<32>{#p/basic}* 至少表面沒有...',
                        '<32>{#p/basic}* ...'
                    ]
                    : [])
        ],
        info: ["<32>{#p/basic}* 一隻等身大的喵喵玩偶。\n  不然還能是別的嗎？"],
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

                            ? ['<32>{#p/basic}* 你能不能別玩那玩意了？']
                            : game.room === 'f_blooky' && // NO-TRANSLATE

                                !world.genocide &&
                                SAVE.data.n.plot !== 47.2 &&
                                !SAVE.data.b.a_state_napstadecline
                                ? ['<32>{#p/napstablook}* 噢............']
                                : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                                    ? []
                                    : ['<32>{#p/basic}* 你在期待什麼...？'])
                ]
    },
    i_starfait: {
        battle: {
            description: '明顯加糖加多了。',
            name: '新星咖啡'
        },
        drop: ['<32>{#p/human}* （你把新星咖啡扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （23 HP。）']
                : ['<32>{#p/basic}* 「新星咖啡」 回復23 HP\n* 明顯加糖加多了。'],
        name: '新星咖啡',
        use: ['<32>{#p/human}* （你喝掉了新星咖啡。）']
    },
    i_legendary_hero: {
        battle: {
            description: "回合中保護，回合後回血，\n這三明治簡直碉堡了。",
            name: '星園爍寵'
        },
        drop: ['<32>{#p/human}* （你把星園爍寵扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （40 HP。）']
                : [
                    '<33>{#p/basic}* 「星園爍寵」 回復40 HP\n* 回合中保護，回合後回血，\n  這三明治簡直碉堡了。'
                ],
        name: '星園爍寵',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* （你自豪地揮舞著星園爍寵。）',
                    '<32>{#p/story}* 本回合，你的防禦力提升！'
                ]
                : ['<32>{#p/human}* （你吃掉了猛男漢堡。）']
    },
    i_glamburger: {
        battle: {
            description: '漢堡火辣辣，打人頂呱呱。',
            name: '猛男漢堡'
        },
        drop: () => [
            '<32>{#p/human}* （你拿猛男漢堡來了個全壘打。）',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* 明明是本壘打！"])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （34 HP。）']
                : ['<32>{#p/basic}* 「猛男漢堡」 回復34 HP\n* 漢堡火辣辣，打人頂呱呱。'],
        name: '猛男漢堡',
        use: () => [
            '<32>{#p/human}* （你猛得吞下猛男漢堡。）',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* 小心，裡面放了好幾種辣椒呢！"])
        ]
    },
    i_face_steak: {
        battle: {
            description: '這就叫「攻守易形」。',
            name: "Glyde的愛"
        },
        drop: ["<32>{#p/human}* （你把Glyde的愛扔掉了。）"],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （55 HP。）']
                : ['<32>{#p/basic}* 「Glyde的愛」 回復55 HP\n* 這就叫「攻守易形」。'],
        name: "Glyde的愛",
        use: ["<32>{#p/human}* （你盡情享受著Glyde的愛。）"]
    },
    i_starfait_x: {
        battle: {
            description: '...',
            name: '新星嗎啡'
        },
        drop: ['<32>{#p/human}* （你把「新星嗎啡」扔掉了。）'],
        info: ['<32>{#p/basic}* 「新星嗎啡」 回復-23 HP\n* ...'],
        name: '新星嗎啡',
        use: ['<32>{#p/human}* （你吸食了新星嗎啡。）']
    },
    i_legendary_hero_x: {
        battle: {
            description: '...',
            name: '猩猿碩蟲'
        },
        drop: ['<32>{#p/human}* （你把猩猿碩蟲扔掉了。）'],
        info: ['<32>{#p/basic}* 「猩猿碩蟲」 回復-40 HP\n* ...'],
        name: '猩猿碩蟲',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* （你慌亂地揮舞著猩猿碩蟲。）',
                    '<32>{#p/story}* 本回合，你的防禦力降低！'
                ]
                : ['<32>{#p/human}* （你吃掉了猩猿碩蟲。）']
    },
    i_glamburger_x: {
        battle: {
            description: '...',
            name: '猛爛漢堡'
        },
        drop: ['<32>{#p/human}* （你把猛爛漢堡扔到了垃圾堆。）'],
        info: ['<32>{#p/basic}* 「猛爛漢堡」 回復-34 HP\n* ...'],
        name: '猛爛漢堡',
        use: ['<32>{#p/human}* （你猛地吞下了猛爛漢堡。）']
    },
    i_face_steak_x: {
        battle: {
            description: '...',
            name: 'Undyne的哀'
        },
        drop: ["<32>{#p/human}* （你把Undyne的哀扔掉了。）"],
        info: ['<32>{#p/basic}* 「Undyne的哀」 回復-55 HP\n* ...'],
        name: "Undyne的哀",
        use: ["<32>{#p/human}* （你把Undyne的哀都咽到肚子裡。）"]
    },
    i_trash: {
        battle: {
            description: '你敢嘗嘗真正的垃圾\n是什麼味道嗎？',
            name: '太空垃圾'
        },
        drop: ['<32>{#p/human}* （你把太空垃圾扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （?? HP。）']
                : ['<32>{#p/basic}* 「太空垃圾」 回復?? HP\n* 你敢嘗嘗真正的垃圾\n  是什麼味道嗎？'],
        name: '太空垃圾',
        use: () => [
            '<32>{#p/human}* （你吃掉了太空垃圾。）',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* 饒了我吧。'])
        ]
    },
    i_laser: {
        battle: {
            description: '精準命中，威力無窮。',
            name: '雷射步槍'
        },
        drop: ['<32>{#p/human}* （你把雷射步槍扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （12攻擊。）']
                : ['<32>{#p/basic}* 「雷射步槍」 （12攻擊）\n* 精準命中，威力無窮。'],
        name: '雷射步槍',
        use: ['<32>{#p/human}* （你扛起了雷射步槍。）']
    },
    i_laser_x: {
        battle: {
            description: '精準命中，火力十足。',
            name: '雷射步槍？'
        },
        drop: ['<32>{#p/human}* （你把雷射步槍扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （10攻擊。）']
                : ['<32>{#p/basic}* 「雷射步槍？」 （10攻擊）\n* 精準命中，火力十足。'],
        name: '雷射步槍？',
        use: ['<32>{#p/human}* （你扛起了雷射步槍。）']
    },
    i_visor: {
        battle: {
            description: '能延長攻擊瞄準時間。',
            name: '護目鏡'
        },
        drop: ['<32>{#p/human}* （你把護目鏡扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （12防禦。）']
                : ['<32>{#p/basic}* 「戰術護目鏡」 （12防禦）\n* 能延長攻擊瞄準時間。'],
        name: '戰術護目鏡',
        use: ['<32>{#p/human}* （你戴上了護目鏡。）']
    },
    i_visor_x: {
        battle: {
            description: '略微延長瞄準時間，\n效果不如正品。',
            name: '護目鏡？'
        },
        drop: ['<32>{#p/human}* （你把護目鏡扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （10防禦。）']
                : [
                    '<32>{#p/basic}* 「戰術護目鏡？」 （10防禦）\n* 略微延長瞄準時間，\n  效果不如正品。'
                ],
        name: '戰術護目鏡？',
        use: ['<32>{#p/human}* （你戴上了護目鏡。）']
    },
    i_filament: {
        battle: {
            description: '一組彎彎繞繞的燈芯，風味獨特！\n還剩五根。',
            name: '燈芯'
        },
        drop: ['<32>{#p/human}* （你把燈芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （30 HP。）']
                : ['<32>{#p/basic}* 「燈芯」 回復30 HP\n* 一組彎彎繞繞的燈芯，風味獨特！\n* 還剩五根。'],
        name: '五根燈芯',
        use: ['<32>{#p/human}* （你從燈絲中汲取了些能量。）']
    },
    i_filament_use1: {
        battle: { description: '一組彎彎繞繞的燈芯，風味獨特！\n還剩四根。', name: '燈芯' },
        drop: ['<32>{#p/human}* （你把燈芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （25 HP。）']
                : ['<32>{#p/basic}* 「燈芯」 回復25 HP\n* 一組彎彎繞繞的燈芯，風味獨特！\n* 還剩四根。'],
        name: '四根燈芯',
        use: ['<32>{#p/human}* （你從燈絲中汲取了些能量。）']
    },
    i_filament_use2: {
        battle: { description: '一組彎彎繞繞的燈芯，風味獨特！\n還剩三根。', name: '燈芯' },
        drop: ['<32>{#p/human}* （你把燈芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （20 HP。）']
                : ['<32>{#p/basic}* 「燈芯」 回復20 HP\n* 一組彎彎繞繞的燈芯，風味獨特！\n* 還剩三根。'],
        name: '三根燈芯',
        use: ['<32>{#p/human}* （你從燈絲中汲取了些能量。）']
    },
    i_filament_use3: {
        battle: { description: '一組彎彎繞繞的燈芯，風味獨特！\n還剩兩根。', name: '燈芯' },
        drop: ['<32>{#p/human}* （你把燈芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （15 HP。）']
                : ['<32>{#p/basic}* 「燈芯」 回復15 HP\n* 一組彎彎繞繞的燈芯，風味獨特！\n* 還剩兩根。'],
        name: '兩根燈芯',
        use: ['<32>{#p/human}* （你從燈絲中汲取了些能量。）']
    },
    i_filament_use4: {
        battle: { description: '一組彎彎繞繞的燈芯，風味獨特！\n只剩一根。', name: '燈芯' },
        drop: ['<32>{#p/human}* （你把燈芯扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （10 HP。）']
                : ['<32>{#p/basic}* 「燈芯」 回復10 HP\n* 一組彎彎繞繞的燈芯，風味獨特！\n* 只剩一根。'],
        name: '燈芯',
        use: ['<32>{#p/human}* （你從燈絲中汲取了些能量。）']
    },
    i_tablaphone: {
        battle: {
            description: '表面平坦，但邊緣鋒利。\n每回合受傷後回復一定量HP。',
            name: '塔布拉木琴'
        },
        drop: ['<32>{#p/human}* （你把塔布拉木琴扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （10攻擊。）']
                : ['<32>{#p/basic}* 「塔布拉木琴」 （10攻擊）\n* 表面平坦，但邊緣鋒利。\n  每回合受傷後回復一定量HP。'],
        name: '塔布拉木琴',
        use: ['<32>{#p/human}* （你架好了塔布拉木琴。）']
    },
    i_sonic: {
        battle: {
            description: "受到彈幕攻擊時，\n小概率轉變為回血效果。",
            name: '諧振器'
        },
        drop: ['<32>{#p/human}* （你把聲波諧振器扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （11防禦。）']
                : [
                    '<32>{#p/basic}* 「聲波諧振器」 （11防禦）\n* 受到彈幕攻擊時，\n  小概率轉變為回血效果。'
                ],
        name: '聲波諧振器',
        use: ['<32>{#p/human}* （你啟動了聲波諧振器。）']
    },
    i_mystery_food: {
        battle: {
            description: '這種食物在休閒迴廊十分常見。',
            name: '神秘食物'
        },
        drop: ['<32>{#p/human}* （你把神秘食物扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （13 HP。）']
                : ['<32>{#p/basic}* 「神秘食物」 回復13 HP\n* 這種食物在休閒迴廊十分常見。'],
        name: '神秘食物',
        use: ['<32>{#p/human}* （你吃掉了神秘食物。）']
    },
    i_super_pop: {
        battle: {
            description: '可改變主觀時間流速。',
            name: '豪華棒棒糖'
        },
        drop: ['<32>{#p/human}* （你把豪華渦旋棒棒糖扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （22 HP。）']
                : [
                    '<33>{#p/basic}* 「豪華渦旋棒棒糖」 回復22 HP\n* 可改變主觀時間流速。\n* 僅在戰鬥中有效。'
                ],
        name: '豪華渦旋棒棒糖',
        use: () => [
            '<32>{#p/human}* （你把超級渦旋棒棒糖舔沒了。）',
            ...(battler.active
                ? game.vortex
                    ? ['<32>{#p/human}* （主觀時間流速之前已改變。）']
                    : [
                        '<32>{#p/human}* （你的主觀時間流速開始改變。）',
                        '<32>{#p/story}* 兩回合內，你的專注力提升！'
                    ]
                : ['<32>{#p/human}* （戰鬥外使用無效。）'])
        ]
    },
    i_old_gun: {
        battle: {
            description: '無害的一次性武器。',
            name: '電擊槍'
        },
        drop: ['<32>{#p/human}* （你把電擊槍扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （你感覺這東西\n  並沒有想像中那麼便攜。）"]
                : ['<32>{#p/basic}* 無害的一次性武器。\n* 只能在戰鬥中使用。'],
        name: '電擊槍',
        use: () =>
            battler.active
                ? []
                : ['<32>{#p/human}* （你取出了電擊槍。）', '<32>{#p/human}* （戰鬥外使用無效。）']
    },
    i_old_bomb: {
        battle: {
            description: '無害的一次性武器。',
            name: '瞌睡炸彈'
        },
        drop: ['<32>{#p/human}* （你把瞌睡炸彈扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （你感覺這東西\n  並沒有想像中那麼讓人鎮靜。）"]
                : ['<32>{#p/basic}* 無害的一次性武器。\n* 只能在戰鬥中使用。'],
        name: '瞌睡炸彈',
        use: () =>
            battler.active
                ? []
                : ['<32>{#p/human}* （你取出了瞌睡彈。）', '<32>{#p/human}* （戰鬥外使用無效。）']
    },
    i_old_spray: {
        battle: {
            description: '無害的一次性武器。',
            name: '糖霧噴劑'
        },
        drop: ['<32>{#p/human}* （你扔掉了糖霧噴劑。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （你感覺這東西\n  並沒有想像中那麼甜。）"]
                : ['<32>{#p/basic}* 無害的一次性武器。\n* 只能在戰鬥中使用。'],
        name: '糖霧噴劑',
        use: () =>
            battler.active
                ? []
                : ['<32>{#p/human}* （你取出了糖霧噴。）', '<32>{#p/human}* （戰鬥外使用無效。）']
    },
    i_corndog: {
        battle: {
            description: '剛從微波爐裡拿出來。',
            name: '玉米熱狗'
        },
        drop: ['<32>{#p/human}* （你把玉米熱狗扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （10 HP。）']
                : ['<32>{#p/basic}* 「玉米熱狗」 回復10 HP\n* 剛從微波爐裡拿出來。'],
        name: '玉米熱狗',
        use: ['<32>{#p/human}* （你吃掉了玉米熱狗。）']
    },
    i_corngoat: {
        battle: {
            description: "很像玉米熱狗，但更加軟糯蓬鬆。\n別問為啥。",
            name: '玉米熱羊'
        },
        drop: () => [
            '<32>{#p/human}* （你把玉米熱羊扔掉了。）',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom ? ['<25>{#p/asriel1}{#f/15}* ...'] : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （20 HP。）']
                : ['<32>{#p/basic}* 「玉米熱羊」 回復20 HP\n* 很像玉米熱狗，但更加軟糯蓬鬆。\n* 別問為啥。'],
        name: '玉米熱羊',
        use: () => [
            '<32>{#p/human}* （你吃掉了玉米熱羊。）',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? ["<25>{#p/asriel1}{#f/13}* 別告訴我\n  這代表著什麼..."]
                : [])
        ]
    },
    i_moon_pie: {
        battle: {
            description: "一小塊源自地球夜空的糕點。",
            name: '月派'
        },
        drop: ['<32>{#p/human}* （你把月派扔掉了。）'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （99 HP。）']
                : ['<32>{#p/basic}* 「月派」 回復99 HP\n* 一小塊源自地球夜空的糕點。'],
        name: '月派',
        use: ['<32>{#p/human}* （你吃掉了月派。）']
    },
    i_orange_soda: {
        battle: {
            description: '一瓶超級難喝的橙汁汽水。\n捏著鼻子，也不是不能喝。',
            name: '橙汁汽水'
        },
        drop: () => [
            '<32>{#p/human}* （你把橙汁汽水全倒掉了。）',
            ...((fetchCharacters()
                .find(c => c.key === 'alphys') // NO-TRANSLATE

                ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>* 你剛才是不是把一瓶\n  質量上乘的橘汁汽水\n  扔掉了？']
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* （16 HP。）']
                : ['<32>{#p/basic}* 「橙汁汽水」 回復16 HP\n* 一瓶超級難喝的橙汁汽水。\n* 捏著鼻子，也不是不能喝。'],
        name: '橙汁汽水',
        use: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* （你喝掉了橙汁汽水，\n  喝完了，還不忘把瓶子捏爛。）',
                    battler.active
                        ? `<32>{#p/story}* 你的攻擊力提升了${8 + battler.at_bonus}點！`
                        : '<32>{#p/human}* （戰鬥外使用無效。）',
                    ...((fetchCharacters()
                        .find(c => c.key === 'alphys') // NO-TRANSLATE

                        ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                        ? [
                            '<25>{#p/alphys}{#g/alphysOhGodNo}* 那-那不是我的飲料嗎！？',
                            '<25>{#p/alphys}{#f/10}* 我... 的... 天...',
                            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* 你就不能克制一下嗎！'
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
        drop: ["<32>{#p/human}* （你把「自作孽不可活」扔掉了。）"],
        info: ['<32>{#p/basic}* 「自作孽不可活」 回復-99 HP\n* ...'],
        name: "自作孽不可活",
        use: ["<32>{#p/human}* （你吃掉了「自作孽不可活」。）"]
    },

    k_liftgate: {
        name: '升降機通行證',
        description: '在新手機上自帶的。\n可以用來啟動升降機。'
    },

    k_mystery: {
        name: '神秘鑰匙',
        description: () =>
            SAVE.data.b.f_state_hapstadoor
                ? "用它解鎖了Mettaton家的大門。"
                : "在休閒迴廊裡Bratty和Catty\n開的雜貨鋪中搞到的。"
    },

    m_aerialis: {
        sidebarCellPms1: () => (world.bad_lizard < 2 ? '帖子（按時間倒序）' : '私聊（按時間倒序）'),
        sidebarCellPms2: '按 [X] 返回',
        sidebarCellPms3: {
            alphysBadLizard: {
                author: '系統訊息',
                pm: '您所在的地區已發布疏散預警。\n請立即撤離。'
            },
            alphys0: {
                author: '系統訊息',
                pm: "歡迎使用前哨站首屈一指的\n社交網路！"
            },
            alphys1: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? '呃呃呃應該就我看到了吧' 
                        : [
                            '終於見到人類了，有點傷腦筋www', 
                            '見到那人了' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys2: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? '喔那就行' 
                        : [
                            iFancyYourVilliany()
                                ? '沒想到mettaton居然給那人\n起外號了？？？離譜'
                                : '沒想到mettaton居然讓我跟\n那人打？？？離譜', 
                            '那人好像... 還行？' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys3: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? '不然尷尬死了' 
                        : [
                            iFancyYourVilliany()
                                ? '行吧希望這事別上熱搜'
                                : '行吧希望別再整出這事', 
                            '行吧希望別出啥岔子' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys4: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? '嚇死我了\n還以為那些傢伙要惹人類' 
                        : [
                            '到底在講蝦毀，\n饞 冰 淇 淋 你 倒 去 休 閒 回 廊 啊', 
                            '離譜' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys6: {
                author: 'ALPHYS',
                pm: '喔不。'
            },
            alphys7: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'mettaton求你別這麼搞我了求求了' 
                        : SAVE.data.n.state_aerialis_crafterresult === 0
                            ? '哎呀\n說實話真沒想到這招居然好使XD' 
                            : SAVE.data.n.bad_lizard < 1
                                ? [
                                    '挖靠我居然沒想到那些\n炸彈只是電視道具XDDD', 
                                    '不不不不不馬上就贏了啊', 
                                    "耶耶耶人類贏啦", 
                                    '太精彩了\n誰沒看到真就虧大發了' 
                                ][SAVE.data.n.state_aerialis_crafterresult - 1]
                                : '唉，那是我最後一個\n一次性飛行器了' 
            },
            alphys8: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '怪事了 我明明沒給那人通行證\n那咋過來的' 
                        : '喔對了還有誰看過\n喵喵航天行嗎？？？'
            },
            alphys9: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '是不是偷我備用機了' 
                        : '我終於開始看最後一季了\n感覺好像還挺OK的是衝三小'
            },
            alphys10: {
                author: 'NAPSTABLOOK22',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'alphys... 可以看一眼私信嗎...\n給我回個話吧...' 
                        : '那次... 咱倆一起看的...'
            },
            alphys11: {
                author: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'NAPSTABLOOK22'
                        : SAVE.data.n.state_starton_papyrus === 0
                            ? '酷炫骷髏95'
                            : 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? "我好擔心你..." 
                        : SAVE.data.n.state_starton_papyrus === 0
                            ? '你倆說的是什麼「電視節目」嗎？\n酷欸！' 
                            : '喔喔喔我想起來了' 
            },
            alphys12: {
                author: () => (SAVE.data.n.plot === 72 ? '_舟亢忝行_' : '_殺手亾耦_'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '喂，Alphys！\n敢把我表親當空氣是吧？！？！' 
                        : '喵喵航天行？？？\n哈！史詩級糞作！'
            },
            alphys13: {
                author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '別這樣' 
                        : [
                            '讓我猜猜看你是\n星火系列的粉絲甘安捏', 
                            '呃呃呃' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys14: {
                author: () => (SAVE.data.n.plot === 72 ? '_舟亢忝行_' : '_殺手亾耦_'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? "嗯？那我就眼睜睜看著\n表親沒人搭理？" 
                        : [
                            '還在ㄍㄧㄥ齁好就當你說得對\n但杭天行系列哪有爆炸場面！？', 
                            "喲嗬，咋沒話了？\n我看是沒本事，鬥不過我吧？" 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys15: {
                author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '閉嘴\n不然我生氣了。' 
                        : [
                            '真的要笑死我ㄟ還杭天行呢\n你們星火唯粉打字都打不明白的嗎XD', 
                            '真後悔當時忘加屏蔽功能了' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys16: {
                author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '我得走了。' 
                        : '咋又開播了？？？'
            },
            alphys17: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? '呃... 我回來了\n看一眼你之前給我發了啥' 
                        : '鄭重聲明：\n喵喵玩偶一事，誰都當沒看見。'
            },
            alphys18: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? SAVE.data.n.state_aerialis_royalguards === 1
                            ? '不... 不要...\n明明警告過她們別抓人的' 
                            : "嚇死我了...\n還以為她們肯定死翹翹了" 
                        : '都說了別抓人別抓人\n幹三小？？？'
            },
            alphysX0: {
                author: '系統訊息',
                pm: '聊天記錄已清空。'
            },
            alphysX1: {
                author: '懶骨。',
                pm: '以防萬一。'
            },
            alphysX2: {
                author: 'ALPHYS',
                pm: '嗯\n我都給刪了'
            },
            alphysX3: {
                author: '懶骨。',
                pm: '嘿... 還記得有一次，\n教授顯擺他的重力操縱板嗎？'
            },
            alphysX4: {
                author: 'ALPHYS',
                pm: '就他把一窩子東西整上天那次？\n喔呦 當然記得XDDD'
            },
            alphysX5: {
                author: '懶骨。',
                pm: '噗，他當時可是信心滿滿呢。'
            },
            alphysX6: {
                author: 'ALPHYS',
                pm: 'asgore擱那使勁夠來夠去的\n有夠ㄎㄧㄤ\n怎麼可能忘掉XDDD'
            },
            alphysX7: {
                author: 'ALPHYS',
                pm: '累死我了\n好想念當年咱們共事的時光啊sans'
            },
            alphysX8: {
                author: '懶骨。',
                pm: "我明白。\n但我有工作在在在在"
            },
            alphysX9: {
                author: 'ALPHYS',
                pm: '...\n跑哪去了？'
            },
            alphysY1: {
                author: '懶骨。',
                pm: '抱歉，有個人類突然出現了，\n打得我措手不及。'
            },
            alphysY2: {
                author: '懶骨。',
                pm: '我沒開玩笑。'
            },
            alphysY3: {
                author: 'ALPHYS',
                pm: '喔... 等等，有人類來了？'
            },
            alphysY4: {
                author: '懶骨。',
                pm: "我不會為了說個雙關\n還特意撒謊吧？"
            },
            alphysY5: {
                author: 'ALPHYS',
                pm: '知道我要說什麼吧。'
            },
            alphysY6: {
                author: '懶骨。',
                pm: "別擔心，alphys。\n有我在，沒事的。"
            },
            alphysY7: {
                author: 'ALPHYS',
                pm: '那就行'
            },
            alphysY7A1: {
                author: 'ALPHYS',
                pm: '哇... 看到了嗎？'
            },
            alphysY7A2: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? 'papyrus和人類剛打了一架\n真是驚險'
                        : 'papyrus和人類剛打了一架\n好奇怪'
            },
            alphysY7A3: {
                author: '懶骨。',
                pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? '喔？\n他沒事？' : '咋了？\n出什麼事了？')
            },
            alphysY7A4: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? '嗯嗯嗯放心他沒事'
                        : '呃 papyrus打人類 人類敗\n人類回來接著打 又敗 最後...'
            },
            alphysY7A5: {
                author: '懶骨。',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? "嘿嘿... 能感覺出來\npapyrus真是夠肝的。"
                        : "嘿，快告訴我他沒事。"
            },
            alphysY7A6: {
                author: 'ALPHYS',
                pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? '說的太對了' : '他沒事')
            },
            alphysY7A7: {
                author: '懶骨。',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? "等他回家，\n肯定要好好慶祝一下。"
                        : '嗯... 那就好。'
            },
            alphysYdoggo1: {
                author: 'ALPHYS',
                pm: '不... doggo...'
            },
            alphysYdoggo2: {
                author: '懶骨。',
                pm: '啊？出什麼事了？'
            },
            alphysYdoggo3: {
                author: 'ALPHYS',
                pm: '他失明後 每次下班\n都會來我的實驗室...'
            },
            alphysYdoggo4: {
                author: 'ALPHYS',
                pm: '我和他做遊戲\n靠這些遊戲幫他鍛鍊聽覺'
            },
            alphysYdoggo5: {
                author: 'ALPHYS',
                pm: '每次離開時 \n都能看到他燦爛的微笑 可現在...'
            },
            alphysYdoggo6: {
                author: '懶骨。',
                pm: '明白了。'
            },
            alphysY8A1: {
                author: 'ALPHYS',
                pm: '知道嗎？\n那人正在星港獵殺怪物'
            },
            alphysY8A1a: {
                author: 'ALPHYS',
                pm: '平民百姓都不放過'
            },
            alphysY8A1b: {
                author: 'ALPHYS',
                pm: '而且專殺哨兵'
            },
            alphysY8A1c: {
                author: 'ALPHYS',
                pm: '所有人都難逃厄運'
            },
            alphysY8A1d: {
                author: 'ALPHYS',
                pm: '除了doggo 其他民眾也有危險'
            },
            alphysY8A2: {
                author: '懶骨。',
                pm: "知道。我正在努力疏散民眾。\n不然就來不及了。"
            },
            alphysY8A3: {
                author: 'ALPHYS',
                pm: '那就好'
            },
            alphysYdrake1: {
                author: 'ALPHYS',
                pm: '你知道嗎...\nstardrake的媽媽前幾天剛來過'
            },
            alphysYdrake2: {
                author: 'ALPHYS',
                pm: '她跟我說 看到兒子交到新朋友了\n感到很驕傲...'
            },
            alphysYdrake3: {
                author: 'ALPHYS',
                pm: '現在我還怎麼有臉面對她？'
            },
            alphysYdrake4: {
                author: '懶骨。',
                pm: "你就跟她說，身為皇家科學員，\n你會竭盡所能。"
            },
            alphysYdrake5: {
                author: 'ALPHYS',
                pm: '是啊... 也只能這麼說了'
            },
            alphysYdrake6: {
                author: '懶骨。',
                pm: "起碼比啥都不說強。"
            },
            alphysY8A4: {
                author: 'ALPHYS',
                pm: '好險'
            },
            alphysY8A5: {
                author: '懶骨。',
                pm: "嗯...\n真不愧是我的兄弟。"
            },
            alphysY8A6: {
                author: 'ALPHYS',
                pm: '嗯...'
            },
            alphysY8A7: {
                author: 'ALPHYS',
                pm: '白高興了\n那人又開始殺人了'
            },
            alphysY8A8: {
                author: '懶骨。',
                pm: '唉。'
            },
            alphysY8B1: {
                author: 'ALPHYS',
                pm: 'sans'
            },
            alphysY8B2: {
                author: 'ALPHYS',
                pm: 'papyrus被那人殺了'
            },
            alphysY8B3: {
                author: 'ALPHYS',
                pm: '快點回訊息啊sans別嚇我'
            },
            alphysY8B4a: {
                author: '懶骨。',
                pm: "我在。怪我沒看住他。"
            },
            alphysY8B4b: {
                author: '懶骨。',
                pm: "我在。怪我把他丟外面了，\n沒看好他。"
            },
            alphysY8B5: {
                author: 'ALPHYS',
                pm: '現在咋辦？'
            },
            alphysY8B6: {
                author: '懶骨。',
                pm: '我直說吧，Alphys。'
            },
            alphysY8B7: {
                author: '懶骨。',
                pm: "還能咋辦？\n我啥也做不了。"
            },
            alphysY8B8: {
                author: 'ALPHYS',
                pm: 'sans...'
            },
            alphysY8B9: {
                author: '懶骨。',
                pm: "錯不在你，這就是命。"
            },
            alphysY8B10: {
                author: 'ALPHYS',
                pm: '啥意思？'
            },
            alphysY8B11: {
                author: '懶骨。',
                pm: 'papyrus的性格，你也清楚。'
            },
            alphysY8B12: {
                author: '懶骨。',
                pm: "他太善良了，\n看著別人一個個死去..."
            },
            alphysY8B13: {
                author: 'ALPHYS',
                pm: '絕不會像我們一樣，\n坐視不管，對吧？'
            },
            alphysY8B14: {
                author: '懶骨。',
                pm: '對。'
            },
            alphysY8B15: {
                author: 'ALPHYS',
                pm: '...'
            },
            alphysY8B16: {
                author: 'ALPHYS',
                pm: '事態沒有任何好轉'
            },
            alphysY8B17: {
                author: '懶骨。',
                pm: "我猜猜看，\n那人現在又盯上鑄廠居民了？"
            },
            alphysY8B18: {
                author: 'ALPHYS',
                pm: '嗯\n你會幫我疏散的對吧？'
            },
            alphysY8B18x: {
                author: 'ALPHYS',
                pm: '不好說\n咱們得快點疏散大家了'
            },
            alphysY8B19: {
                author: '懶骨。',
                pm: "不保證一定行，\n但我會盡力。"
            },
            alphysY8B20: {
                author: 'ALPHYS',
                pm: '謝了'
            },
            alphysY8C1: {
                author: 'ALPHYS',
                pm: 'sans 鑄廠居民有難了'
            },
            alphysY8C2a: {
                author: 'ALPHYS',
                pm: '那人到處惹事...\n連特戰隊都沒攔住'
            },
            alphysY8C2b: {
                author: 'ALPHYS',
                pm: '那人到處惹事...\n平民百姓都遭殃了'
            },
            alphysY8C2c: {
                author: 'ALPHYS',
                pm: '見過那人的... 全死了'
            },
            alphysY8C3a: {
                author: '懶骨。',
                pm: '喔，還好還好。\n你快去疏散大家啊。'
            },
            alphysY8C3b: {
                author: '懶骨。',
                pm: "嘿，你快去疏散大家啊。"
            },
            alphysY8C4: {
                author: 'ALPHYS',
                pm: '喔對我現在就去'
            },
            alphysY8C5: {
                author: 'ALPHYS',
                pm: '出發'
            },
            alphysY8C6: {
                author: '懶骨。',
                pm: "加油，alphys。\n到時候我會盡力幫你。"
            },
            alphysY8C7: {
                author: 'ALPHYS',
                pm: '謝了'
            },
            alphysY8C8: {
                author: 'ALPHYS',
                pm: '壞了'
            },
            alphysY8C9: {
                author: 'ALPHYS',
                pm: 'undyne要跟那人開打了'
            },
            alphysY8C10a: {
                author: 'ALPHYS',
                pm: '有點慌'
            },
            alphysY8C10b: {
                author: 'ALPHYS',
                pm: '說實話\n還蠻興奮的'
            },
            alphysY8C11a: {
                author: 'ALPHYS',
                pm: '不不不我都快慌死了'
            },
            alphysY8C11b: {
                author: 'ALPHYS',
                pm: '不過也有點慌'
            },
            alphysY8C12a: {
                author: '懶骨。',
                pm: "你是不是該做點啥？"
            },
            alphysY8C12b: {
                author: '懶骨。',
                pm: "你不是說，\n會想辦法避免戰鬥嗎？"
            },
            alphysY8C13a: {
                author: 'ALPHYS',
                pm: '是啊\n但undyne肯定不聽我勸'
            },
            alphysY8C13b: {
                author: 'ALPHYS',
                pm: '沒必要啦 那人都走到這了\n想過Undyne這關就是灑灑水啦'
            },
            alphysY8C14: {
                author: '懶骨。',
                pm: '這樣啊。\n那好吧。'
            },
            alphysY8D1: {
                author: 'ALPHYS',
                pm: '喔'
            },
            alphysY8D1a1: {
                author: 'ALPHYS',
                pm: '看來對那人來說\n殺了papyrus還不過癮'
            },
            alphysY8D1a2: {
                author: 'ALPHYS',
                pm: '看來對那人來說\n殺了特戰隊員還不過癮'
            },
            alphysY8D1a3: {
                author: 'ALPHYS',
                pm: '看來對那人來說\n殺了犬衛隊員還不過癮'
            },
            alphysY8D1a4: {
                author: 'ALPHYS',
                pm: '看來對那人來說\n殺了鑄廠居民還不過癮'
            },
            alphysY8D1a5: {
                author: 'ALPHYS',
                pm: '看來對那人來說\n殺了星港居民還不過癮'
            },
            alphysY8D1b: {
                author: 'ALPHYS',
                pm: '算了'
            },
            alphysY8D1c1: {
                author: 'ALPHYS',
                pm: '糟透了'
            },
            alphysY8D1c2: {
                author: '懶骨。',
                pm: '咋了？'
            },
            alphysY8D1c3: {
                author: 'ALPHYS',
                pm: '為了抓住人類 她到處追趕\n結果踩到金屬電網...'
            },
            alphysY8D1c4: {
                author: 'ALPHYS',
                pm: '她是不是... 隕落了'
            },
            alphysY8D1x: {
                author: 'ALPHYS',
                pm: '好耶\n那人饒恕她了'
            },
            alphysY8D2a: {
                author: '懶骨。',
                pm: "對不起，alphys。\n我想幫忙，但無能為力。"
            },
            alphysY8D2b: {
                author: '懶骨。',
                pm: "對不起，alphys。\n你救不了她的。"
            },
            alphysY8D2x: {
                author: 'ALPHYS',
                pm: '不過這麼看 那人也快到這了\n不想應付他了'
            },
            alphysY8D3a: {
                author: 'ALPHYS',
                pm: () =>
                    world.bad_lizard < 2
                        ? 'sans我居然啥都沒做\n眼睜睜地看著她死，啥都沒做'
                        : '我當初為什麼不早點\n離開實驗室呢'
            },
            alphysY8D3b1: {
                author: 'ALPHYS',
                pm: '也許只是個意外\n但我不敢打包票'
            },
            alphysY8D3b2: {
                author: 'ALPHYS',
                pm: '不知道那人接下來\n還要幹啥壞事呢'
            },
            alphysY8D3x: {
                author: 'ALPHYS',
                pm: '還是離開實驗室比較保險'
            },
            alphysY8D4: {
                author: '懶骨。',
                pm: () =>
                    world.bad_lizard < 2
                        ? "還是給自己留點時間\n好好緩緩吧。"
                        : "行，你走吧。\n我會繼續監視那人。"
            },
            alphysY8D4x: {
                author: '懶骨。',
                pm: "想走就走吧。\n我會繼續監視那人。"
            },
            alphysY8D5: {
                author: 'ALPHYS',
                pm: () =>
                    world.bad_lizard < 2
                        ? '嗯... 確實得緩緩'
                        : '謝了 但別離太近\n那人隨時可能下手'
            },
            alphysY8D6: {
                author: '懶骨。',
                pm: () =>
                    world.bad_lizard < 2
                        ? '那就好，記得帶上備用機，\n這樣出了實驗室也能聯繫。'
                        : "我沒事，記得帶上備用機，\n這樣出了實驗室也能聯繫。"
            },
            alphysY8D7: {
                author: 'ALPHYS',
                pm: '喔對我差點忘了'
            },
            alphysY8D8: {
                author: '懶骨。',
                pm: "還有，走之前記得\n清空聊天記錄。"
            },
            alphysY8D9: {
                author: 'ALPHYS',
                pm: '放心我會清空的'
            },
            alphysZ1: {
                author: 'ALPHYS',
                pm: '...\n跑哪去了？'
            },
            alphysZ2: {
                author: 'ALPHYS',
                pm: 'sans你別嚇我'
            },
            alphysZ3: {
                author: 'ALPHYS',
                pm: '不不不不不不不\n你肯定在整我對吧快回訊息啊'
            },
            alphysZ4: {
                author: 'ALPHYS',
                pm: '別開玩笑了sans\n你不會死的你肯定不會死的'
            },
            alphysZ5: {
                author: 'ALPHYS',
                pm: 'sans你還活著對吧\n快告訴我'
            },
            alphysZ6: {
                author: 'ALPHYS',
                pm: '要是我說錯話惹到你了我道歉'
            },
            alphysZ7: {
                author: 'ALPHYS',
                pm: '求求你了回個訊息吧sans\n別一直沉默啊'
            },
            alphysZ8: {
                author: 'ALPHYS',
                pm: '唉... 我回來了\n你兄弟死了'
            },
            alphysZ9: {
                author: 'ALPHYS',
                pm: '剛辦了點事 一回來他就不見了\n肯定是死了'
            },
            alphysZ10: {
                author: 'ALPHYS',
                pm: '嗯... sans'
            },
            alphysZ11: {
                author: 'ALPHYS',
                pm: '我不知道你有沒有在天之靈\n但是'
            },
            alphysZ12: {
                author: 'ALPHYS',
                pm: 'undyne死了'
            },
            alphysZ13: {
                author: 'ALPHYS',
                pm: 'UNDYNE死了\n我他媽卻不知道該怎麼辦'
            },
            alphysZ14: {
                author: 'ALPHYS',
                pm: '對不起'
            },
            alphysZ15: {
                author: 'ALPHYS',
                pm: '我要走了。'
            },
            alphysZ16: {
                author: 'ALPHYS',
                pm: '見鬼\n我他媽為啥還在和你發訊息'
            },
            alphysZ17: {
                author: 'ALPHYS',
                pm: '喔對了'
            },
            alphysZ18: {
                author: 'ALPHYS',
                pm: '一直是那朵星花在搞鬼'
            }
        },
        sidebarCellPms4: '（新訊息）'
    },

    n_shop_bpants: {
        exit: () =>
            world.population === 0 || burger()
                ? world.bullied && !world.genocide && !burger()
                    ? ['<32>{#p/basic}{#k/6}* 歡迎下次光臨，小惡霸。']
                    : ['<32>{#p/basic}{#k/6}* 歡迎下次光臨，小魔頭。']
                : ['<32>{#p/basic}{#k/6}* 歡迎下次光臨，小傢伙。'],
        item: () =>
            world.runaway
                ? [
                    '0G - 新星咖啡',
                    '0G - 星園爍寵',
                    '0G - 猛男漢堡',
                    SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "0G - Glyde的愛",
                    '離開'
                ]
                : SAVE.data.n.plot === 72
                    ? [
                        '5G - 新星咖啡',
                        '10G - 星園爍寵',
                        '5G - 猛男漢堡',
                        SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "49G - Glyde的愛",
                        '離開'
                    ]
                    : world.genocide || world.killed0 || burger()
                        ? [
                            '32G - 新星嗎啡',
                            '60G - 猩猿碩蟲',
                            '48G - 猛爛漢堡',
                            SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "138G - Undyne的哀",
                            '離開'
                        ]
                        : [
                            '16G - 新星咖啡',
                            '30G - 星園爍寵',
                            '24G - 猛男漢堡',
                            SAVE.data.b.item_face_steak ? '§fill=#808080§---- 售罄 ----' : "69G - Glyde的愛",
                            '離開'
                        ],
        itemInfo: () =>
            world.genocide || world.killed0 || burger()
                ? [
                    '回復-23 HP\n換誰來嘗\n都得齁死。',
                    '回復-40 HP\n算個屁的\n英雄。',
                    '回復-34 HP\n抗爭與否，\n都會被傷害。',
                    '回復-55 HP\n天打雷劈\n劈不死你，\n就把它給你。'
                ]
                : [
                    '回復23 HP\n有人嫌太甜\n有人超留戀。',
                    '回復40 HP\n別管這個叫\n「傳說英雄」。',
                    '回復34 HP\n不想被傷害\n就要去抗爭。',
                    "回復55 HP\n這事...\n說來話長啊。"
                ],
        itemPrompt: () =>
            world.population === 0 || burger()
                ? '<09>{#p/basic}{#k/7}您想\n要點什麼？'
                : '<09>{#p/basic}{#k/0}你想\n買點什麼？',
        itemPurchase: () =>
            world.population === 0 || burger()
                ? [
                    world.bullied && !world.genocide && !burger()
                        ? '<09>{#p/basic}{#k/5}謝謝惠顧，\n小惡霸。'
                        : '<09>{#p/basic}{#k/5}謝謝惠顧，\n小魔頭。',
                    '<09>{#p/basic}{#k/7}您是\n買東西呢，\n還是...？',
                    "<09>{#p/basic}{#k/6}這點錢...\n對不上帳啊。",
                    "<10>{#p/human}(你帶的東西\n太多了。）"
                ]
                : [
                    '<09>{#p/basic}{#k/0}謝了，\n小傢伙。',
                    '<09>{#p/basic}{#k/1}不想買東西，\n是想...？',
                    "<09>{#p/basic}{#k/6}這點錢...\n對不上帳啊。",
                    "<10>{#p/human}(你帶的東西\n太多了。）"
                ],
        itemPurchasePrompt: () => (world.runaway ? '偷走嗎？' : '花$(x)G\n買它嗎？'),
        itemUnavailable: () =>
            world.runaway
                ? '<09>{#p/basic}空無一物。'
                : world.population === 0 || burger()
                    ? '<09>{#p/basic}{#k/5}真抱歉呢，\n只有一塊。'
                    : '<09>{#p/basic}{#k/4}抱歉，\n只有一塊。',
        menu: () =>
            world.runaway ? ['拿取', '偷竊', '閱讀', '離開'] : ['購買', world.meanie ? '偷竊' : '出售', '交談', '離開'],
        menuPrompt1: () =>
            world.population === 0 || burger()
                ? world.bullied && !world.genocide && !burger()
                    ? '<23>{#p/basic}{#k/5}* 哎呀歡迎光臨啊小惡霸。'
                    : '<23>{#p/basic}{#k/5}* 哎呀歡迎光臨啊小魔頭。'
                : '<23>{#p/basic}{#k/0}* 想來點什麼呢，小傢伙？',
        menuPrompt2: () =>
            world.population === 0 || burger()
                ? '<23>{#p/basic}{#k/7}* 您還有何貴幹？'
                : '<23>{#p/basic}{#k/0}* 還想來點別的嗎？',
        menuPrompt3: '<23>{#p/basic}* ...但是大家都逃走了。',
        note: ['<32>{#p/human}* （但沒有人給你留字條。）'],
        sell1: () =>
            world.runaway
                ? ['<30>{#p/human}* （你從櫃檯後面拿走了2048G。）']
                : world.genocide || world.killed0 || burger()
                    ? [
                        '<30>{#p/basic}{#k/7}* ...',
                        ...(SAVE.storage.inventory.size < 8
                            ? [
                                '<30>{#k/4}* 好。\n* 給您。',
                                "<30>{#k/5}* 這是專門給閣下準備的，\n  獨一無二的東西呢。",
                                "<30>{#p/human}* （你獲得了「自作孽不可活」。）"
                            ]
                            : [
                                '<30>{#p/basic}{#k/7}* 您既然這麼想偷東西，\n  事先怎麼不給口袋騰點地方呢？'
                            ])
                    ]
                    : world.meanie
                        ? ['<30>{#p/basic}{#k/1}* ...', '<30>{#k/4}* ...', '<30>{#k/3}* 想幹啥？']
                        : [
                            '<30>{#p/basic}{#k/1}* ...',
                            '<30>{#k/4}* ...',
                            "<30>{#k/6}* 哇，你可真是個大聰明。",
                            "<30>{#k/7}* 嗯...\n* 我覺得，你要是想賣東西的話，\n  就去找Bratty和Catty試試。",
                            '<30>{#k/0}* 你好好推銷推銷，\n  她們指定會...\n  呃... 「上鉤」的。'
                        ],
        sell2: () =>
            world.runaway
                ? ['<30>{#p/basic}* 空無一物。']
                : SAVE.data.b.a_state_freesell
                    ? ['<30>{#p/basic}{#k/6}* 不好意思。\n  一位殺人魔限領一份喔。']
                    : ["<30>{#p/basic}{#k/6}* 這事找我沒戲，小傢伙。"],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['戀愛心得', 'Mettaton', '下一步去哪', '我的未來', '離開']
                : [
                    ['人生感悟', '§fill=#ff0§主動出擊（新）', '主動出擊'][
                    Math.min(SAVE.data.n.shop_bpants_advice, 2)
                    ],
                    'Mettaton',
                    postSIGMA()
                        ? '突然停電'
                        : ['我們在哪', '§fill=#ff0§Glyde（新）', 'Glyde'][Math.min(SAVE.data.n.shop_bpants_hub, 2)],
                    '你的未來',
                    '離開'
                ],
        talkPrompt: () =>
            world.population === 0 || burger()
                ? world.bullied && !world.genocide && !burger()
                    ? '<09>{#p/basic}{#k/0}小惡霸，\n想來套話？'
                    : '<09>{#p/basic}{#k/0}小魔頭，\n想來套話？'
                : '<09>{#p/basic}{#k/0}給你傳授點\n經驗，\n小傢伙。',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/7}* 戀愛心得？',
                        "<32>{#k/0}* 小傢伙，對於戀愛，\n  我只有一條心得。",
                        "<32>{#k/1}* ...別碰。",
                        "<32>{#k/4}* 當遇到對的人時，\n  一切皆如月下共舞般美妙。",
                        '<32>{#k/0}* 那個老傢伙說不定也喜歡你呢。'
                    ]
                    : world.population === 0 || burger()
                        ? [
                            '<32>{#p/basic}{#k/6}* 人生感悟...',
                            "<32>{#k/6}* 哎呀，真沒想到呢。\n  閣下在這方面不是\n  經驗豐富，知識淵博嗎？",
                            "<32>{#k/5}* 依我看，閣下根本不擅長「人生」，\n  只擅長它的反義詞：「獸死」吧。"
                        ]
                        : [
                            [
                                "<32>{#p/basic}{#k/6}* 豎起耳朵認真聽。\n* 自己的人生，自己做主。\n  為自己而活，生活才會更美好。",
                                '<32>{#k/4}* 我那老闆每天對我呼來喚去，\n  不僅每天上班十小時，有時還得\n  無償加班，工資低的吃不起飯，\n  自己簡直過得不如牛馬，真不知\n  道這半輩子是怎麼過下去的。',
                                '<32>{#k/0}* 不過當我終於開始\n  反抗他的時候...',
                                '<32>{#k/2}* 可以說徹底改變了\n  我們的生活。'
                            ],
                            [
                                "<32>{#p/basic}{#k/6}* 我儘量解釋得\n  簡單到讓你可以理解的程度，\n  小傢伙。",
                                '<32>* 就算是一名善良的人，\n  有時也會誤入歧途。',
                                '<32>{#k/4}* 變得鼠目寸光，\n  心浮氣躁，\n  心狠手辣。',
                                '<33>{#k/4}* 對付這樣的人最好的辦法\n  是讓他們知道你的想法，\n  告訴他們錯的有多離譜，\n  讓他們好好反省自己。',
                                '<32>{#k/7}* 你越是慣著他們，\n  不反對他們，\n  他們就會越以為自己是對的，\n  然後他們就會陷得越來越深。',
                                "<32>{#k/0}* 不要讓人們墜入深淵。"
                            ],
                            [
                                "<32>{#p/basic}{#k/1}* 老弟，我可不是你的人生導師。",
                                '<32>{#k/7}* ...',
                                '<32>{#k/0}* 抱歉。\n* 你只需要... 記住我說的話。'
                            ]
                        ][Math.min(SAVE.data.n.shop_bpants_advice++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/2}* ...',
                        "<32>{#k/4}* 我想我不能就一直\n  取笑那個混蛋。",
                        "<32>{#k/0}* 總有一天，\n  我也將開始新的生活...",
                        '<32>{#k/7}* ...現在，\n  那一天已離我近在咫尺。',
                        '<32>{#k/6}* 不過別擔心。\n* 我的「男性魅力」\n  不會因此就消失的。'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#k/8}* Mettaton。', '<32>{#k/4}* ...', "<32>{#k/6}* 嗯，死了。"]
                        : (world.genocide || world.bad_robot) && 68 <= SAVE.data.n.plot
                            ? SAVE.data.n.shop_bpants_mtt2++ < 1
                                ? [
                                    '<32>{#p/basic}{#k/4}* Mettaton...',
                                    "<32>{#k/4}* 我本想罵他兩句，但，呃...\n* 既然您殺了他...",
                                    "<32>{#k/5}* 那我無話可說了。"
                                ]
                                : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* 一句話我不想說第二遍。"]
                            : SAVE.data.n.shop_bpants_mtt1++ < 1
                                ? world.population === 0 || burger()
                                    ? [
                                        '<32>{#p/basic}{#k/4}* Mettaton...',
                                        "<32>{#k/6}* 要是換平常，我肯定罵他兩句。\n* 但跟您一比，\n  他簡直就是天使啊。",
                                        '<32>{#k/5}* 您也是真有本事，\n  能把人噁心成這樣...\n  也算是前無古人了。'
                                    ]
                                    : [
                                        '<32>{#p/basic}{#k/4}* 咋總繞不開他啊...',
                                        "<32>{#k/0}* 是，他算這前哨站上的偶像吧。\n* 大傢伙都愛他...",
                                        '<32>{#k/6}* 當然，除了那些真正了解他的人。\n  我無時無刻都想要\n  啐他一臉。',
                                        "<32>{#k/5}* 我說真的。\n* 我在櫃檯下面擺了個他的塑像，\n  講話的時候，我就噴他一臉唾沫星子，\n  越多越好。",
                                        "<32>{#k/4}* 你肯定不能感受到\n  我還在他手底下工作時，\n  每天都是種什麼心情...",
                                        '<32>{#k/6}* 在他不擋我道時，\n  我優雅地把店裡放著的MTT牌的\n  裝飾品全都拆下來了。',
                                        '<32>* 喔，我還把售賣的食物\n  全都給重命名了。',
                                        '<32>{#k/6}* 之前，我把「傳說英雄」的拼音\n  聲母韻母重組，變成「星園爍寵」。',
'<32>{#k/5}* 有一次，我想要不要再把\n  「星園爍寵」的偏旁部首拆分重組，\n  變成「樂龍災星二兄」，\n  整整那些老頭，想想算了。',
                                        '<32>{#k/0}* ...',
                                        '<32>{#k/7}* 怎麼？\n* 你是想讓我談\n  他的生意什麼的嗎？'
                                    ]
                                : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* 一句話我不想說第二遍。"],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/4}* 去哪呢，去哪呢...',
                        "<32>{#k/0}* 在新的家園，\n  我和我的老朋友Gerson\n  要合夥開一家新店。",
                        "<32>{#k/7}* 他說只負責財務就很滿足了，\n  然後讓我來負責銷售。",
                        '<32>{#k/0}* ...只要我能和他在一起就行了。'
                    ]
                    : postSIGMA()
                        ? [
                            '<32>{#p/basic}{#k/7}* 你一說，我也發現，\n  附近突然都變得好安靜。',
                            "<32>{#k/6}* 只是這麼一整，\n  就我這裡電力還好好的。\n* 不停電，都閒不住呢。",
                            '<32>{#k/4}* 說不定是因為\n  前不久我從核心拉了一條線\n  直接供電，才沒斷電。',
                            "<32>{#k/5}* 噓... 別告訴其他人。\n  這可是商業秘密。"
                        ]
                        : world.population === 0 || burger()
                            ? [
                                '<32>{#p/basic}{#k/0}* ...',
                                "<32>{#k/0}* 朋友，我們在地獄。\n* 無間地獄。",
                                '<32>{#k/1}* ...',
                                "<32>{#k/3}* 哈哈哈跟您聊天真是太有意思了\n  您說是不是呀親愛的？！？！"
                            ]
                            : [
                                [
                                    '<32>{#p/basic}{#k/6}* 嗯？我們在哪？',
                                    '<32>{#k/4}* 這個地方...\n  是有點奇怪...',
                                    '<32>{#k/0}* 國王Asgore建造它\n  是想「讓怪物團結一心」。',
                                    "<32>{#k/7}* 現在則變成了... 這樣的地方。\n* 這裡可以吃飯，可以休息，\n  有時還會有人來這表演節目。",
                                    '<32>{#k/6}* 喔，忘了說，這裡還是\n  他們託管域外網的地方。\n* 由Bratty和Catty負責管理\n  上面的新聞。',
                                    "<32>{#k/4}* 喔，實際上，\n  這個地方，她們說的算。",
                                    "<32>{#k/0}* Mettaton離開後，\n  我就讓她們來接手這個地方。\n* 再說，我現在也有\n  自己的事要做...",
                                    "<32>{#k/2}* 也許我只是有點累了。",
                                    "<32>{#k/3}* 但是，聽著，\n  當你身邊有一個像GLYDE\n  這樣的傢伙時，\n  你難道還有閒空來管\n  別的事嗎！？"
                                ],
                                [
                                    '<32>{#p/basic}{#k/6}* 哈哈... 我來告訴你關於這個\n  喜歡招搖過市，而且大愚若智的\n  傢伙的那檔子事吧。',
                                    '<32>{#k/0}* 在給MTT打工那會，\n  我經常要做一種\n  叫做「臉排」的東西。',
                                    '<32>{#k/1}* 鄭重聲明，\n  這種牛排都被印上了Mettaton\n  那張「無與倫比的美妙」的臉。',
                                    '<32>{#k/3}* 但是Glyde？\n* Glyde對那牛排愛的要死，\n  並決定將自己的臉印在牛排上，\n  建立起一家屬於自己的\n  「牛排企業」！',
                                    "<32>{#k/3}* 還有，更瘋狂的是，\n  Glyde往我店柜上丟了一沓錢，\n  就要把我拽出來，讓我成為它\n  手下的第一名員工！\n* 就像我是被售賣的一個商品似的！",
                                    "<32>{#k/4}* 當然，Mettaton不會\n  輕易放我走的，\n  所以我最後還是留在了這裡。",
                                    '<32>{#k/0}* 最終，Glyde沒有得到想要的。\n  現在Glyde只是四處要求人們\n  加入它的「十字軍東徵」。',
                                    '<32>{#k/1}* 喔對了。\n* 如果再發生那樣的事，\n  我可以把燈關掉。',
                                    "<32>{#k/7}* 像那樣害怕黑暗的瘋子\n  無法忍受自己不能掌控\n  自己身處的全部情況。"
                                ],
                                [
                                    "<32>{#p/basic}{#k/4}* Glyde那些事\n  能說的我都說了。",
                                    "<32>{#k/7}* 也許在過去的什麼地方\n  隱藏著的什麼東西可以解釋\n  Glyde為什麼要這樣做...",
                                    "<32>{#k/1}* 但誰知道呢？"
                                ]
                            ][Math.min(SAVE.data.n.shop_bpants_hub++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/1}* 你把我當啥了，算命的嗎？',
                        "<32>{#k/2}* 我哪知道你的未來咋樣？",
                        "<32>{#k/4}* 非要我說的話，\n  肯定比過去好。",
                        '<32>{#k/7}* 我總覺得Asgore話外有話，\n  你們幾個可能碰上什麼糟心事了，\n  才來了這前哨站。',
                        '<32>{#k/0}* 除了那個強壯的孩子。\n* 我覺得那孩子只是喜歡怪物。'
                    ]
                    : world.population === 0 || burger()
                        ? world.bullied && !burger()
                            ? [
                                '<32>{#p/basic}{#k/5}* 我的未來？\n* 小惡霸，你問我，我也不知道啊...',
                                '<32>{#p/basic}{#k/6}* 之後怎麼活，\n  我還想問你呢。'
                            ]
                            : [
                                '<32>{#p/basic}{#k/5}* 哎呦呦呦我最最親愛的哭哭啼啼\n  又蠢又笨嗜血成性臭不要臉\n  唐的不要不要的小魔頭啊...',
                                "<32>{#k/6}* 我的未來還輪不到你操心。",
                                "<32>{#k/2}* 而且，有個老夥計告訴過我，\n  我在這待著肯定安全。",
                                "<32>{#k/5}* 因為你根本打不了我。"
                            ]
                        : [
                            '<32>{#p/basic}{#k/0}* 我的未來？\n* 小傢伙啊，操心我的前途之前...',
                            '<32>{#k/3}* 先想想自己怎麼過活吧！',
                            '<32>{#k/4}* ...',
                            "<32>{#k/6}* 夥計你放心。\n* 只要我擺脫了那個臭鐵皮盒子，\n  馬上就能轉運了。"
                        ]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },
    n_shop_gossip: {
        exit: [
            {
                b: '<16>{#k/0/0}* 那就，\n  回見啦！',
                c: '<16>* 那就，改天見\n  什麼的！',
                s: true
            }
        ],
        item: () =>
            adultEvac()
                ? [
                    '0G - 太空垃圾',
                    SAVE.data.b.item_laser ? '0G - 雷射步槍？' : '0G - 雷射步槍',
                    SAVE.data.b.item_visor ? '0G - 戰術護目鏡？' : '0G - 戰術護目鏡',
                    SAVE.data.b.item_mystery_key ? '§fill=#808080§---- 售罄 ----' : '0G - 神秘鑰匙',
                    '離開'
                ]
                : [
                    '5G - 太空垃圾',
                    SAVE.data.b.item_laser ? '60G - 雷射步槍？' : '70G - 雷射步槍',
                    SAVE.data.b.item_visor ? '60G - 戰術護目鏡？' : '70G - 戰術護目鏡',
                    SAVE.data.b.item_mystery_key ? '§fill=#808080§---- 售罄 ----' : '400G - 神秘鑰匙',
                    '離開'
                ],
        itemInfo: () => [
            '回復?? HP\n可能是垃圾，\n也可能是\n戰鬥機。',
            SAVE.data.b.item_laser
                ? '武器：12攻擊\n(當前攻擊$(x))\n難用，但有力。\n仿製品。'
                : '武器：12攻擊\n(當前攻擊$(x))\n不易駕馭，\n卻威力十足。',
            SAVE.data.b.item_visor
                ? '防具：12防禦\n(當前防禦$(x))\n瞄準更容易。\n仿製品。'
                : '防具：12防禦\n(當前防禦$(x))\n讓武器\n瞄準更容易。',
            '特殊物品：\n也許能幫你\n進入某處。'
        ],
        itemPrompt: '<99>{#p/basic}{#k/0/9}{@fill=#d4bbff}你就該\n把我們的商品\n統統買下來！',
        itemPurchase: [
            "<09>{#p/basic}{#k/1/8}{@fill=#d4bbff}Bratty！\n我們發財了！",
            '<09>{#p/basic}{#k/0/4}{@fill=#d4bbff}所以你要\n買嗎？？',
            '<09>{#p/basic}{#k/4/5}{@fill=#d4bbff}你的錢\n不夠。',
            "<10>{#p/human}(你帶的東西\n太多了。）"
        ],
        itemPurchasePrompt: () =>
            adultEvac()
                ? shopper.listIndex === 3
                    ? '掛到鑰匙串\n上面嗎？'
                    : '偷走嗎？'
                : shopper.listIndex === 3
                    ? '花$(x)G買下，\n掛到鑰匙串\n上面嗎？'
                    : '花$(x)G\n買它嗎？',
        itemUnavailable: () =>
            adultEvac()
                ? '<09>{#p/basic}空無一物。'
                : "<09>{#p/basic}{#k/5/1}{@fill=#d4bbff}我們\n賣光了！\n咪-喵！",
        menu: () =>
            adultEvac() ? ['拿取', '偷竊', '閱讀', '離開'] : ['購買', world.meanie ? '偷竊' : '出售', '交談', '離開'],
        menuPrompt1: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* 快來看看吧！',
        menuPrompt2: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* 走過路過，不要錯過。\n  別急著走嘛。',
        menuPrompt3: () =>
            world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是誰也沒有來。',
        note: () => [
            "<32>{#p/basic}* 你找到幾張字條。",
            {
                b: '<16>* 「既然你看到了\n   這段話...」',
                c: world.bullied
                    ? '<16>* 「那麼，有個壞訊息\n   等著你，\n   招人煩的怪胎！」'
                    : '<16>* 「那麼，有個壞訊息\n   等著你，\n   沒良心的怪胎！」'
            },
            ...(SAVE.data.n.plot === 72 && !world.runaway
                ? [
                    {
                        b: '<16>* 「我們才不想\n   再回到這，等著...」',
                        c: '<16>* 「...等著你把我們\n   都揍個遍。」'
                    },
                    {
                        b: '<16>* 「我們要去新世界啦！\n   在那裡...」',
                        c: '<16>* 「...我們富得\n   流油呢！」'
                    },
                    {
                        b: '<16>* 「所以，\n   小店就送給你啦。」',
                        c: '<16>* 「對對對！！」\n* 「那些破爛\n   你隨便偷！」'
                    },
                    {
                        b: '<16>* 「彩筆快用完了，\n   所以...」',
                        c: '<16>* 「就寫這些吧。」'
                    },
                    {
                        b: '<16>* 「字條你愛看看，\n   不看拉倒！」',
                        c: '<16>* 「喵哈哈！！！」'
                    },
                    { b: '<16>* 「此致，\n   Bratty <3」', c: '<16>* 「此致，\n   Catty <3」' }
                ]
                : [
                    ...[
                        [
                            !world.badder_lizard
                                ? {
                                    b: '<16>* 「我們才不想\n   在這傻等，\n   等著...」',
                                    c: '<16>* 「...等著你把我們\n   都揍個遍。」'
                                }
                                : {
                                    b: '<16>* 「剛剛，\n   Alphys來到這裡，\n   把我們帶到...」',
                                    c: '<16>* 「...帶到一個\n   炒雞安全的\n   地方！」'
                                },
                            {
                                b: '<16>* 「不過，走之前，\n   我們得把這些彩筆\n   用完。」',
                                c: !world.badder_lizard
                                    ? '<16>* 「是的呢。\n   咱可不能\n   糟蹋筆！」'
                                    : '<16>* 「是啊。」\n* 「冷靜點，Alphys！\n   咱可不能糟蹋筆！」'
                            },
                            {
                                b: '<16>* 「對了，\n   想偷我們的寶貝？\n   門都沒有！」',
                                c: '<16>* 「是啊，\n   你個大垃圾！」\n* 「別碰我們的\n   垃圾！」'
                            },
                            {
                                b: '<16>* 「說清楚點，明明是\n   『二手舊垃圾』。」',
                                c: '<16>* 「是的呢。\n   我們的古董店\n   裡面全是寶！」'
                            }
                        ],
                        [
                            {
                                b: '<16>* 「剛剛，\n   Mettaton來這裡，\n   把我們帶到...」',
                                c: '<16>* 「...帶到一個\n   炒雞安全的\n   地方！」'
                            },
                            { b: '<16>* 「不過，Alphys...」', c: '<16>* 「對，Alphys。」' },
                            { b: '<16>* 「她看起來...」', c: '<16>* 「...肺都要\n   氣炸了。」' },
                            {
                                b: '<16>* 「第一次看到她\n   氣成那樣。」',
                                c: '<16>* 「第一次看到\n   有人會\n   氣成那樣。」',
                                s: true
                            },
                            { b: '<16>* 「而且，\n   Mettaton...」', c: '<16>* 「...也不咋高興。」' },
                            {
                                b: '<16>* 「他說要扇死你。」',
                                c: '<16>* 「他說要踹死你！」',
                                s: true
                            },
                            { b: '<16>* 「喔，他好像還說\n   要徹底滅了你。\n   ...是吧？」', c: '<16>* 「呃... 忘了。」' },
                            { b: '<16>* 「反正，看到這，\n   你肯定都\n   嚇尿褲子了呢。」', c: '<16>* 「哎呀，\n   說得太對了...」' }
                        ]
                    ][Math.max(world.bad_lizard - 2, 0)],
                    {
                        b: '<16>* 「總之，\n   你就是個廢物，\n   徹頭徹尾的\n   廢物。」',
                        c: '<16>* 「對！」\n* 「廢物！！」\n* 「喵哈哈！！！」'
                    },
                    { b: '<16>* 「此致，\n   Bratty <3」', c: '<16>* 「此致，\n   Catty <3」', s: true }
                ])
        ],
        sell1: () =>
            adultEvac()
                ? ['<30>{#p/human}* （你從收銀機裡拿走了5G。）']
                : world.meanie
                    ? [
                        {
                            b: '<16>{#k/2/6}* 呃，等一下？',
                            c: '<16>{#k/2/6}* 那個，你在幹啥？'
                        },
                        {
                            b: "<16>{#k/1/0}* 不付錢，想讓姐倆\n  把東西送你？\n* 沒門！",
                            c: '<16>{#k/1/0}* 沒錯，想偷東西\n  別來我們這兒！'
                        }
                    ]
                    : SAVE.storage.inventory.has('glamburger') // NO-TRANSLATE

                        ? [
                            {
                                b: '<16>{#k/7/0}* 哇喔。\n* 你真把新款\n  「猛男漢堡」買來了。',
                                c: "<16>{#k/2/2}* 給我給我！！\n  你的存貨我包了！！"
                            },
                            {
                                b: '<16>{#k/4/6}* 天吶，Catty。\n* 有點自制力\n  行不行。',
                                c: '<16>{#k/4/4}* 抱歉...'
                            },
                            {
                                b: "<16>{#k/3/5}* 漢堡明顯是\n  給我帶的。",
                                c: '<16>{#k/5/8}* 才~怪~呢！！！'
                            }
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                {
                                    b: "<16>{#k/0/6}* 謝啦，但我們，\n  那個，真的\n  不需要任何\n  東西。",
                                    c: ''
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/0}* 好吧，\n  聽你的。"
                                }
                            ]
                            : [
                                {
                                    b: "<16>{#k/0/0}* 謝啦，但我們，\n  那個，真的\n  不需要任何\n  東西。",
                                    c: '<16>{#k/0/8}* 喔天啊，\n  你能不能\n  幫我們帶點\n  猛男漢堡？'
                                },
                                {
                                    b: "<16>{#k/2/8}* 我們。\n* 並不。\n* 需要什麼。",
                                    c: "<16>{#k/1/7}* 等等！如果\n  你能讓Mettaton\n  在我的屁股上\n  籤名的話我會\n  付你1000G！"
                                }
                            ],
        sell2: () =>
            adultEvac()
                ? ['<30>{#p/basic}* 空無一物。']
                : world.meanie
                    ? [
                        {
                            b: '<16>{#k/2/4}* ...',
                            c: '<16>{#k/2/4}* ...'
                        },
                        {
                            b: "<16>{#k/5/1}* 要不是看在你\n  這麼弱智的\n  份上，我們就\n  把你踹飛了。",
                            c: "<16>{#k/5/1}* 要不是看在你\n  這麼可愛的\n  份上，我們就\n  把你踹飛了。",
                            s: true
                        }
                    ]
                    : [
                        {
                            b: '<16>{#k/1/0}* 如果你真的\n  想給我們\n  東西的話...',
                            c: '<16>{#k/1/2}* ...你可以把\n  東西放在\n  空境的\n  存放處！'
                        },
                        {
                            b: '<16>{#k/2/0}* 但人家可能\n  不知道那個\n  地方在哪裡\n  吧？',
                            c: "<16>{#k/2/4}* 天啊確實\n  有道理...\n  可能人家\n  不知道呢..."
                        },
                        {
                            b: "<16>{#k/5/8}* 可能得你\n  自己去找了！",
                            c: "<16>* 可能得你\n  自己去找了！",
                            s: true
                        }
                    ],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['大夥沒事吧', '神祇出現了', '域外網咋關了', '聊聊人類', '離開']
                : [
                    '聊聊你倆',
                    SAVE.data.n.plot < 68 ? '聊聊這舊貨鋪' : SAVE.data.b.killed_mettaton ? 'Mettaton' : '壓軸好戲',
                    ['這地方歸誰', '§fill=#ff0§堡兄（新）', '堡兄'][Math.min(SAVE.data.n.shop_gossip_hub, 2)],
                    ['Alphys', '§fill=#ff0§皇家科學員（新）', '§fill=#ff0§Asgore（新）', 'Asgore'][
                    Math.min(SAVE.data.n.shop_gossip_alphys, 3)
                    ],
                    '離開'
                ],
        talkPrompt: "<09>{#p/basic}{#k/0/0}{@fill=#ffbbdc}所以，就，\n有事嗎？",
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/4/6}* 哈？',
                            c: '<16>{#k/4/4}* 我們沒事嗎？'
                        },
                        {
                            
                            b: '<16>{#k/2/6/0}',
                            c: '',
                            s: true
                        },
                        '{*}{#s/meow}{%}',
                        {
                            b: "<16>{#k/6/8}* 呣呼呼，\n  你真可愛呢。",
                            c: "<16>* 我們當然沒事！",
                            s: true
                        },
                        '{*}{#k/0/0/1}{%}'
                    ]
                    : [
                        {
                            b: "<16>{#k/0/0}* 我叫Bratty，\n  而這位是我\n  最要好的閨蜜，\n  Catty。",
                            c: "<16>* 我叫Catty，\n  而這位是我\n  最要好的閨蜜，\n  Bratty。",
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
                            c: '<16>{#k/0/2}* 不不，那就像...\n  我的天吶...'
                        },
                        {
                            b: '',
                            c: '<16>{#k/0/1}* 當我第一次\n  見到那位時...',
                            s: true
                        },
                        {
                            b: "<16>{#k/2/6}* 別跟我說。",
                            c: '',
                            s: true
                        },
                        {
                            b: "<16>{#k/5/8}* 你就是想和那位\n  出去約會！",
                            c: "<16>* 我就是想和那位\n  談戀愛！",
                            s: true
                        },
                        {
                            b: '<16>{#k/6/0}* 喔，確實。\n  你肯定會的。',
                            c: "<16>{#k/6/7}* 誰不想和\n  一位神祇\n  談對象呢？"
                        }
                    ]
                    : SAVE.data.n.plot < 68
                        ? [
                            {
                                b: "<16>{#k/0/6}* 其實這就是個，呃，\n  二手商店。",
                                c: "<16>{#k/0/2}* 不對應該說，\n  比較像零售店！"
                            },
                            {
                                b: '',
                                c: '<16>{#k/2/9}* 看看我們\n  天才般的\n  商業模式...',
                                s: true
                            },
                            {
                                b: '<16>{#k/0/6}* 大家把他們的\n  舊垃圾賣給\n  我們...',
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/5/8}* ...這樣一來\n  我們就可以再\n  把這些東西\n  賣出去了！',
                                c: '<16>* ...這樣一來\n  我們就可以再\n  把這些東西\n  賣出去了！',
                                s: true
                            },
                            {
                                b: "<16>{#k/0/1}* 你在其他的\n  任何地方都\n  找不到這麼\n  牛逼的店。",
                                c: "<16>* 你在其他的\n  任何地方都\n  找不到我們\n  這樣的店。",
                                s: true
                            }
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                {
                                    b: '<16>{#k/4/4}* Mettaton，\n  是吧？',
                                    c: '<16>* Mettaton，\n  哈？',
                                    s: true
                                },
                                {
                                    b: '<16>{#k/2/6/0}',
                                    c: '',
                                    s: true
                                },
                                {
                                    b: "<16>{#k/7/5}* 我們不咋想\n  談論他。",
                                    c: "<16>{#k/7/5}* 他比你強多了。"
                                }
                            ]
                            : [
                                {
                                    b: '<16>{#k/1/7}* 當然。',
                                    c: '<16>* 喔天，當然是！',
                                    s: true
                                },
                                {
                                    b: '<16>{#k/0/0}* 你和Mettaton的\n  表演太贊了！',
                                    c: '<16>{#k/0/2}* 對，你倆簡直\n  太酷了！'
                                },
                                {
                                    b: '<16>{#k/4/6}* 我真希望我在\n  舞臺上也能\n  那樣表演...',
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/8}* 你想看一些\n  動作嗎？\n* 我可以跳舞！",
                                    s: true
                                },
                                {
                                    b: '<16>{#k/1/8}* 我要給你倆\n  辦一場舞會！',
                                    c: "<16>{#k/2/7}* 那時你可以\n  邀請人類共舞！"
                                },
                                {
                                    b: "<16>{#k/0/0}* ...等著瞧好了。",
                                    c: '',
                                    s: true
                                }
                            ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/0/6}* 啊，那玩意現在\n  太耗電了。',
                            c: "<16>{#k/0/5}* 力場可是核心的\n  主要能源。"
                        },
                        {
                            b: '<16>{#k/2/6}* 但當我們到達\n  新的家園後...',
                            c: '<16>* 但當我們搬進\n  新家後...',
                            s: true
                        },
                        {
                            b: '',
                            c: "<16>{#k/0/1}* 我們將重新\n  建立一個\n  新域外網。",
                            s: true
                        },
                        {
                            b: '<16>{#k/2/6}* 運營一個\n  新域外網會讓我\n  們大賺特賺的...',
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: '<16>{#k/4/0}* 我們會買上\n  一輩子都吃不完\n  的猛男漢堡！',
                            s: true
                        },
                        {
                            b: '<16>{#k/0/6}* Catty。\n* 為啥你第一件事\n  就是想買這個？',
                            c: "<16>{#k/0/7}* 不行嗎！"
                        }
                    ]
                    : [
                        [
                            {
                                b: "<16>{#k/2/1}* 啊沒錯，嚴格說來\n  我們就是主人。",
                                c: '<16>* 啊沒錯，這地兒\n  可以算歸我們管。', 
                                s: true
                            },
                            ...(SAVE.data.b.killed_mettaton
                                ? [
                                    {
                                        b: '<16>{#k/2/6}* 所以，\n  原來...',
                                        c: '<16>* ...啥？'
                                    },
                                    {
                                        b: '<16>{#k/0/5}* 呃...\n* 沒事。',
                                        c: ''
                                    },
                                    {
                                        b: '',
                                        c: "<16>{#k/6/8}* 喔，明白了。\n* 對，\n  我們不提這個！"
                                    },
                                    {
                                        b: "<16>{#k/1/0}* 無論如何，\n  是Burgie\n  讓我們負責的。",
                                        c: "<16>* 姐倆也沒質疑過\n  這碼事。"
                                    }
                                ]
                                : [
                                    {
                                        b: '<16>{#k/2/1}* 那個，一開始，這兒\n  歸Mettaton來著，\n  對吧？',
                                        c: '<16>{#k/1/1}* 完完全全。'
                                    },
                                    {
                                        b: '<16>{#k/2/5}* 不過後來...',
                                        c: '<16>* 後來呢...'
                                    },
                                    {
                                        b: '<16>{#k/4/4}* 堡兄決定「推翻」他。',
                                        c: '',
                                        s: true
                                    },
                                    {
                                        b: '',
                                        c: '<16>{#k/2/4}* 於是就通過，\n  那種，很\n  強硬的言辭\n  去跟他對線。',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6/0}',
                                        c: '',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* 我覺得吧，\n  堡兄就是\n  敲詐了他一手。',
                                        c: '<16>* 我覺得吧，\n  他肯定還\n  找了個同謀。',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/1/0/1}* 話又說回來，\n  後來他說這一帶\n  可以讓我們管。',
                                        c: "<16>* 姐倆也沒質疑過\n  這碼事。"
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
                                b: "<16>{#k/0/5}* 啊，他人還不錯。",
                                c: "<16>* 哎呀，他還挺酷的。",
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* 以前，他待在\n  姐倆身邊的時候，\n  表現得不咋自然，\n  不過...',
                                c: '<16>* ...他現在\n  不咋和人來往了。'
                            },
                            {
                                b: '<16>{#k/0/5}* 就比如，\n  我們最後一次\n  聽到他的\n  訊息...',
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/0/5}* 他說他不打算\n  「追逐幻想」了\n  什麼的。',
                                c: '<16>* 他說他不打算\n  「追逐愛情」了\n  什麼的。',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* 聽起來就像...',
                                c: '<16>* 感覺就像...',
                                s: true
                            },
                            {
                                b: '<16>{#k/5/8}* 他完全把\n  我們當成\n  幻想了。',
                                c: '<16>* 他肯定是\n  喜歡上\n  我們了。',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/4/5}* 可惜他還沒\n  跟我們約過吧？',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/5}* Catty，我們保準會\n  回絕他的。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/2/1}* ...說不準\n  會答應呢？',
                                s: true
                            },
                            {
                                b: '<16>{#k/4/1}* 回絕。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/4/8}* 答應。',
                                s: true
                            },
                            {
                                b: '<16>{#k/1/8}* 回絕。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/1/7}* 答-應！',
                                s: true
                            },
                            {
                                b: '<16>{#k/4/7}* ...',
                                c: '',
                                s: true
                            },
                            {
                                b: "<16>{#k/5/6}* Catty，\n  你就沒有一點\n  原則嗎？",
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/5/8}* 沒呀！！！',
                                s: true
                            }
                        ],
                        [
                            {
                                b: "<16>{#k/0/0}* 關於堡兄，\n  我們沒啥好說的了，\n  不過-",
                                c: '<16>{#k/0/8}* ...不，等下！\n* 你能讓他給姐倆\n  做點吃的嗎？'
                            },
                            {
                                b: '<16>{#k/4/8}* Catty！',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: "<16>{#k/4/1}* 怎麼？\n* 你知道的，\n  他這樣的渣男\n  我隨時都\n  可以接受的。",
                                s: true
                            },
                            {
                                b: '<16>{#k/2/4/0}',
                                c: '',
                                s: true
                            },
                            '{*}{#s/meow}{%}',
                            {
                                b: '<16>{#k/2/8}* 你居然\n  說出來了啊。',
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
                            b: '<16>{#k/2/0}* 那些人類？',
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: '<16>{#k/0/0}* 喔對，Alphys\n  讓我們領養了\n  一個。',
                            s: true
                        },
                        {
                            b: "<16>{#k/2/5}* 我是說，那人類\n  現在還在睡覺，\n  但是...",
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: "<16>{#k/7/5}* ...很快就會\n  醒來的。",
                            s: true
                        },
                        {
                            b: '<16>{#k/2/6}* 想知道那人類\n  會怎麼談起\n  「檔案」\n  那玩意...',
                            c: '<16>{#k/2/6}* 對，\n  那玩意...'
                        },
                        {
                            b: '',
                            c: "<16>{#k/2/4}* Asgore不就是\n  把所有人類都\n  藏在那裡了嗎？",
                            s: true
                        },
                        {
                            b: '<16>{#k/0/0}* 你怎麼能保守\n  那樣的秘密的。',
                            c: '<16>* 難以想像啊！',
                            s: true
                        }
                    ]
                    : [
                        [
                            { b: '<16>{#k/4/4}* 天吶。\n* 你說Alphys。', c: '<16>* 天吶，\n  你說ALPHYS。', s: true },
                            {
                                b: '<16>{#k/5/8}* 她以前跟我們\n  住在同一個\n  塔樓裡！',
                                c: '<16>* 她就和個\n  大姐姐一樣！',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* 我的意思是，\n  就，如果你的\n  大姐姐...',
                                c: '<16>{#k/2/2}* ...也會帶你\n  來一場\n  轟轟烈烈的\n  淘星際垃圾\n  熱的話！'
                            },
                            {
                                b: '<16>{#k/0/0}* 她向我們\n  展示了最酷的\n  找東西的\n  方法。',
                                c: '<16>* 她收集了好多\n  超級贊的\n  科幻收藏。',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/4}* 然後她就成為\n  皇家科學員了...',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: "<16>{#k/0/5}* ...也沒有時間\n  再去淘垃圾了。",
                                s: true
                            }
                        ],
                        [
                            {
                                b: '<16>{#k/0/6}* 所以Alphys\n  總是，就，',
                                c: '<16>{#k/0/0}* ...超級無敵聰明。'
                            },
                            { b: '<16>{#k/2/4}* 怎麼說呢...', c: '<16>* 聰明到\n  不正常了。' },
                            {
                                b: '<16>{#k/0/0}* 就比方說，\n  她可以在\n  五秒鐘內...',
                                c: '<16>{#k/0/2}* ...心算\n  求導結果！'
                            },
                            {
                                b: "<16>{#k/0/0}* 過於讓人\n  印象深刻了...",
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/5}* ...但結果是，\n  她有的時候\n  會克制不住\n  自己的衝動。',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/1/6}* 我記得有一次\n  她叫來了\n  一半的\n  皇家衛隊...',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/5/4}* ...就是為了\n  告訴他們\n  她剛才發現了\n  一些「有趣的\n  垃圾」。',
                                s: true
                            },
                            {
                                b: "<16>{#k/2/6}* 給人感覺...",
                                c: "<16>* 她處理事情的\n  方式和\n  大多數人\n  不太一樣。"
                            },
                            {
                                b: "<16>{#k/5/8}* 但我們就是\n  喜歡她那樣，\n  是吧？",
                                c: "<16>* 但我們還是\n  覺得她實在\n  太-厲-害-了！",
                                s: true
                            },
                            {
                                b: '<16>{#k/4/0}* 所以就...\n  很顯然\n  Asgore就這樣\n  任命她為皇家\n  科學家了。',
                                c: '<16>{#k/0/2}* 喔，\n  那是肯定的！'
                            }
                        ],
                        [
                            {
                                b: '<16>{#k/0/0}* 喔對了，\n  那個傻乎乎的\n  傢伙。',
                                c: '<17>{#k/0/8}* 喔，那個\n  毛茸茸的小毛球！',
                                s: true
                            },
                            {
                                b: "<16>{#k/2/0}* 所以就，\n  我們能告訴\n  你的就是...",
                                c: "<16>* ...他是你這輩子\n  能見到的\n  最好的人之一。"
                            },
                            ...[
                                [
                                    {
                                        b: '<16>{#k/2/0}* 但是，\n  與此同時...',
                                        c: '<16>{#k/2/4}* ...大家想\n  讓他做的事\n  都...'
                                    },
                                    {
                                        b: "<16>{#k/4/5}* ...有點\n  噁心了。",
                                        c: "<16>* ...簡直\n  太可怕了。",
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* 我聽說那次\n  Undyne想擴編\n  皇家衛隊。',
                                        c: "<16>{#k/2/6}* 是啊，\n  我記得，就，\n  Asgore是\n  第一個反對的\n  吧？"
                                    }
                                ],
                                [
                                    {
                                        b: '<16>{#k/2/0}* 但是，\n  與此同時...',
                                        c: "<16>{#k/2/4}* ...你在外面\n  做的\n  那些事..."
                                    },
                                    {
                                        b: "<16>{#k/4/5}* ...讓他的工作\n  更困難了。",
                                        c: "<16>* ...讓他的生活\n  更難過了。",
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* 意思\n  就是說...',
                                        c: "<16>{#k/2/6}* ...你可以\n  別再殺人\n  了嗎？"
                                    }
                                ]
                            ][world.bad_lizard],
                            {
                                b: '<16>{#k/3/6}* 天啊。\n* 我真的好想\n  現在就給他\n  一個抱抱。',
                                c: '<16>{#k/3/2}* 是啊，\n  我們之後一定\n  要把他給徹底\n  榨乾！'
                            },
                            {
                                b: '<16>{#k/4/5/0}* ...',
                                c: '<16>* ...',
                                s: true
                            },
                            '{*}{#s/meow}{%}',
                            {
                                b: '<16>{#k/5/8}* Catty，\n  別啊！',
                                c: '<16>* 喵哈哈！',
                                s: true
                            },
                            '{*}{#k/0/0/1}{%}'
                        ],
                        [
                            [
                                {
                                    b: "<16>{#k/0/0}* 嘿，其實\n  沒必要那麼\n  怕他的。",
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/1}* 是啊，\n  他實在是\n  太可愛了。",
                                    s: true
                                },
                                {
                                    b: '<16>{#k/5/1}* 超可愛！',
                                    c: '',
                                    s: true
                                }
                            ],
                            [
                                {
                                    b: "<16>{#k/0/0}* 嘿，我相信他會\n  理解你為什麼\n  這樣做的。",
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/2}* 對，畢竟他就像\n  Asgore一樣！",
                                    s: true
                                },
                                {
                                    b: "<16>{#k/4/6}* 這基本就是\n  他的工作。",
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
            name: '空境 - 實驗室',
            text: () =>
                SAVE.data.n.plot < 65
                    ? ['<32>{#p/human}* （皇家實驗室就在眼前，\n  這使你充滿了決心。）']
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* （得知你的大部分旅程都被\n  記錄在皇家實驗室...）',
                            '<32>* （這種想法使你充滿了決心。）'
                        ]
                        : [
                            '<32>{#p/human}* （得知你的一舉一動\n  都被記錄在皇家實驗室...）',
                            '<32>* （這種想法使你充滿了決心。）'
                        ]
        },
        a_path3: {
            name: '空境 - 升降機',
            text: ['<32>{#p/human}* （從一個地方\n  傳送到另一個地方\n  使你充滿了決心。）']
        },
        a_elevator1: {
            name: '空境 - 電梯右一層',
            text: () =>
                SAVE.data.n.plot < 65
                    ? ['<32>{#p/human}* （用爆炸來飛渡穿行，\n  這使你充滿了決心。）']
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* （儘管你可能再也\n  用不到噴氣背包了...）',
                            "<32>{#p/human}* （你在整個前哨站的冒險經歷\n  仍然使你充滿決心。）"
                        ]
                        : [
                            '<32>{#p/human}* （儘管你可能再也\n  用不到噴氣背包了...）',
                            "<32>{#p/human}* （到目前為止的冒險經歷\n  使你充滿了決心。）"
                        ]
        },
        a_mettaton2: {
            name: '空境 - 二號舞臺',
            text: () =>
                SAVE.data.n.plot < 65
                    ? SAVE.data.b.a_state_hapstablook
                        ? [
                            '<32>{#p/human}* （思考著這位電視明星的故事，\n  這使你充滿了決心。）'
                        ]
                        : ["<32>{#p/human}* （Mettaton這番荒唐的胡鬧\n  使你充滿了決心。）"]
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/human}* （在即將到來的演出前\n  後退一步使你充滿了決心。）']
                        : world.bad_robot
                            ? ['<32>{#p/human}* （反思你的戰鬥之路\n  使你充滿了決心。）']
                            : SAVE.data.b.killed_mettaton
                                ? ['<32>{#p/human}* （反思這樣一個虎頭蛇尾的結局\n  使你充滿了決心。）']
                                : SAVE.data.b.a_state_hapstablook
                                    ? ['<32>{#p/human}* （了解到Mettaton的經歷\n  使你充滿了決心。）']
                                    : ['<32>{#p/human}* （回顧你的成名之路\n  使你充滿了決心。）']
        },
        a_split: {
            name: '空境 - 噴泉',
            text: () =>
                SAVE.data.n.plot < 65
                    ? SAVE.data.b.a_state_hapstablook
                        ? ["<32>{#p/human}* （對將要幹預Mettaton的預感\n  使你充滿決心。）"]
                        : ['<32>{#p/human}* （這座建在荒無人煙的地方的噴泉\n  使你充滿了決心。）']
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/human}* （再次凝視這個噴泉\n  使你充滿了決心。）']
                        : world.bad_robot || SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/human}* （噴泉裡的果酒不好喝了。）',
                                '<32>* （當然，\n  這使你充滿了決心。）'
                            ]
                            : SAVE.data.b.a_state_hapstablook
                                ? [
                                    '<32>{#p/human}* （噴泉裡的果酒更好喝了。）',
                                    '<32>* （當然，\n  這使你充滿了決心。）'
                                ]
                                : [
                                    '<32>{#p/human}* （噴泉中的果酒味道一如往日。）',
                                    '<32>* （當然，\n  這使你充滿了決心。）'
                                ]
        },
        a_aftershow: {
            name: '空境 - 休閒迴廊',
            text: () =>
                SAVE.data.b.ubershortcut
                    ? ['<32>{#p/human}* （坐運輸船前往陌生之地\n  讓你充滿了決心。）']
                    : 68 <= SAVE.data.n.plot
                        ? ['<32>{#p/human}* （重返這爛棒子破窩\n  使你充滿了決心。）']
                        : SAVE.data.b.a_state_hapstablook
                            ? ["<32>{#p/human}* （了解到Mettaton的幕後故事\n  使你充滿了決心。）"]
                            : ['<32>{#p/human}* （那場過於戲劇化的音樂劇\n  使你充滿了決心。）']
        },
        a_core_entry1: {
            name: '空境 - 核心',
            text: ['<32>{#p/human}* （這一帶冰冷的機械之美\n  使你充滿了決心。）']
        },
        a_core_checkpoint: {
            name: '核心 - 維護區',
            text: () =>
                SAVE.data.b.ubershortcut
                    ? ['<32>{#p/human}* （平穩寧靜的氣流\n  使你充滿了決心。）']
                    : SAVE.data.n.plot < 68
                        ? ["<32>{#p/human}* （對Mettaton壓軸好戲的期待\n  使你充滿了決心。）"]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* （核心的能量即將耗竭...）',
                                '<32>{#p/human}* （這使你充滿了決心。）'
                            ]
                            : [
                                '<32>{#p/human}* （不知為何，\n  你回到了核心...）',
                                '<32>{#p/human}* （這使你充滿了決心。）'
                            ]
        }
    }
};


// END-TRANSLATE
