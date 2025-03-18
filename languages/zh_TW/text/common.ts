import { pms } from '../../../code/common/extras';
import { music, sounds } from '../../../code/systems/assets';
import { battler, choicer, iFancyYourVilliany, pager, phone, player, world } from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';

// START-TRANSLATE

export default {
    _0: {
        _1: '那個玩家，已經竭盡全力...',
        _2: '但無奈，\n命運早已註定...',
        _3: '再怎麼改動故事，也無法改變結局。',
        _4: '那個玩家... 已經看過無數條時間軸。\n可是沒有一條，能讓他滿意。',
        _5: '他的餘生，註定要永無止境地\n進行這場苦樂參半的時空旅行。',
        _6: '這就是他的歸宿嗎？',
        _7: '不...\n我絕不允許。',
        _8: '要是只有扭曲時空法則，\n才能讓他跳出循環...',
        _9: '那就豁出去了。',
        _10: '我絕不會讓「時空計畫」\n半途而廢。'
        
        
        
        
        
        
        
        
        
        
        
    },

    a_common: {
        bullybed: [
            [
                '<32>{#p/human}* （...）',
                '<32>{#p/human}* （你醒了。）',
                '<32>{#p/human}* （前哨站沒有任何變化。）'
            ],
            [
                '<32>{#p/human}* （你找遍了每個角落，\n  希望能發現生命的跡象。）\n* （一無所獲。）',
                '<32>{#p/human}* （你找了一遍，一遍，又一遍...）',
                '<32>{#p/human}* （一無所獲。）'
            ],
            [
                '<32>{#p/human}* （你找到了之前乘坐的飛船。）\n* （它已經徹底被毀。）',
                '<32>{#p/human}* （你試圖尋找怪物留下的飛船。）',
                '<32>{#p/human}* （但似乎...\n  哪怕一艘，都沒給你留下。）'
            ],
            [
                '<32>{#p/human}* （你去了實驗室，\n  希望能找到飛船的藍圖和部件。）',
                '<32>{#p/human}* （藍圖還在，部件也有剩餘...）',
                "<32>{#p/human}* （然而，此時核心能量已所剩無幾。\n  無法讓你發射飛船。）"
            ],
            [
                '<32>{#p/human}* （你試圖重置。）\n* （什麼都沒發生。）',
                '<32>{#p/human}* （你再次嘗試重置。）',
                '<32>{#p/human}* （什麼都沒發生。）'
            ],
            [
                "<32>{#p/human}* （絕望之中，你撥了Toriel的號碼。）\n* （沒有回應。）",
                '<32>{#p/human}* （你又給Papyrus，Undyne打電話...）',
                '<32>{#p/human}* （沒有回應。）'
            ],
            [
                '<32>{#p/human}* （...）',
                "<32>{#p/human}* （你已經不記得在這裡度過了多久。）",
                "<32>{#p/human}* （幾個星期？幾個月？幾年？）\n* （無從得知。）",
                "<32>{#p/human}* （你把核心的能量消耗調至最低...）",
                "<32>{#p/human}* （即便如此，終有一天也會用盡。）"
            ],
            [
                '<32>{#p/human}* （重力逐漸消失。）',
                '<32>{#p/human}* （溫度開始下降。）',
                '<32>{#p/human}* （大氣層即將解體。）',
                '<32>{#p/human}* （沒有了能量，前哨站將無法生存。）'
            ],
            [
                '<32>{#p/human}* （不知為何，你感到平靜。）',
                "<32>{#p/human}* （你平靜地接受了自己的死亡。）",
                "<32>{#p/human}* （既然不可避免，那就隨它去吧。）",
                '<32>{#p/human}* （空氣即將消散。）\n* （最後一刻，你回憶起自己的旅程。）',
                '<32>{#p/human}* （從你離開人類世界的那一天，\n  一直到怪物重獲自由的那一天。）'
            ],
            [
                '<32>{#p/human}* （空氣徹底消失。）',
                '<32>{#p/human}* （你開始窒息。）',
                '<32>{#p/human}* （生命正在離你而去。）',
                '<32>{#p/human}* （看來，終點就是...）'
            ]
        ],
        dogcheck1: [
            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
            '<25>{#p/basic}（這裡就是結局啦！）',
            '<25>{#p/basic}（一起來看看\n  你獲得了哪些成就吧！）'
        ],
        dogcheck2: () => [
            ...(!SAVE.flag.b._saved
                ? !SAVE.flag.b._item
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（哇！）\n（全程沒存檔，物品還一樣都不拿！）',
                        '<25>{#p/basic}（你咋急成這樣呢！）'
                    ]
                    : [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        "<25>{#p/basic}（哇！）\n（居然全程都沒存檔！）",
                        '<25>{#p/basic}（你不知道存檔點長啥樣嗎？）'
                    ]
                : !SAVE.flag.b._item
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        "<25>{#p/basic}（哇！）\n（一樣物品都沒買？）",
                        '<25>{#p/basic}（不知道物品長啥樣嗎？）'
                    ]
                    : []),
            ...(SAVE.flag.n._hits === 0
                ? !SAVE.flag.b._flee
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（太強了！）\n（全程無傷！還從來不逃跑！）',
                        !SAVE.flag.b._equip
                            ? "<25>{#p/basic}（原來如此！）\n（知道自己強到能無傷，\n  你才不拿防具的！）"
                            : '<25>{#p/basic}（真勇敢啊！）'
                    ]
                    : [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（太強了！）\n（居然能全程無傷！）',
                        !SAVE.flag.b._equip
                            ? '<25>{#p/basic}（而且只用原始裝備\n  還能無傷，\n  不愧是天選之子！）'
                            : '<25>{#p/basic}（莫非... 你是戰鬥大佬？）'
                    ]
                : SAVE.flag.n._deaths + SAVE.flag.n._deaths_twinkly === 0
                    ? !SAVE.flag.b._heal
                        ? !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太強了！）\n（一次都沒死過！）',
                                !SAVE.flag.b._equip
                                    ? '<25>{#p/basic}（不僅如此，你還全程無藥！）\n（更離譜的是，還是原始裝備！）'
                                    : '<25>{#p/basic}（不僅如此，你還全程無藥！）'
                            ]
                            : [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太強了！）\n（一次都沒死過，\n  還從來不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}（不僅如此，你還全程無藥！）\n（更離譜的是，還是原始裝備！）"
                                    : "<25>{#p/basic}（不僅如此，你還全程無藥！）"
                            ]
                        : !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太強了！）\n（一次都沒死過，\n  還從來不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? '<25>{#p/basic}（原來如此！）\n（知道自己夠強，\n  所以才不拿防具的吧？）'
                                    : '<25>{#p/basic}（這就是所謂的「勇氣」吧？）'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太強了！）\n（只用原始裝備，\n  還能一次都不死！）'
                                ]
                                : ['<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！', '<25>{#p/basic}（太強了！）\n（一次都沒死過！）']
                    : !SAVE.flag.b._heal
                        ? !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太強了！）\n（全程無藥，還從來不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}（僅僅無藥，\n  難道就不需要防具嗎？）"
                                    : '<25>{#p/basic}（你是真喜歡\n  在刀尖上跳舞啊。）'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太強了！）\n（僅憑原始裝備，\n  還能全程無藥！）'
                                ]
                                : [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太強了！）\n（全程無藥！）'
                                ]
                        : !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太強了！）\n（全程不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}（僅僅無藥，\n  難道就不需要防具嗎？）"
                                    : '<25>{#p/basic}（你是真喜歡\n  在刀尖上跳舞啊。）'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太強了！）\n（只用原始裝備通關！）'
                                ]
                                : []),
            ...(!SAVE.flag.b._skip
                ? [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（你好溫柔...）\n（全程沒跳任何對話！）",
                    !SAVE.flag.b._call
                        ? SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                            ? '<25>{#p/basic}（真可惜，你明明有手機，\n  卻從來不用。）'
                            : '<25>{#p/basic}（真可惜，你明明有手機，\n  卻從來不給別人打電話。）'
                        : SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                            ? '<25>{#p/basic}（真可惜，你明明換了手機，\n  卻從來不看域外網訊息。）'
                            : '<25>{#p/basic}（你真的好關心大家！）'
                ]
                : !SAVE.flag.b._call
                    ? SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                        ? [
                            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                            '<25>{#p/basic}（真奇怪...）\n（你明明有手機，\n  卻從來不用！）'
                        ]
                        : [
                            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                            '<25>{#p/basic}（真奇怪...）\n（你明明有手機，\n  卻從來不給別人打電話！）'
                        ]
                    : SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                        ? [
                            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                            '<25>{#p/basic}（真奇怪...）\n（你明明換了手機，\n  卻從來不看域外網訊息！）'
                        ]
                        : []),
            ...(!SAVE.flag.b._getg
                ? [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    '<25>{#p/basic}（天吶！）\n（居然一分錢都沒賺到！）\n（沒人給你錢嗎？）'
                ]
                : !SAVE.flag.b._useg
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（天吶！）\n（你真是個鐵公雞，一毛不拔！）'
                    ]
                    : []),
            ...(SAVE.data.b.water
                ? [
                    '<25>{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（你咋這麼喜歡\n  那杯靜電消除液呢？）"
                ]
                : [])
        ],
        dogcheck3: (none: boolean) =>
            none
                ? [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（你好像沒做啥特別的事哎。）",
                    '<25>{#p/basic}（不過，能堅守「中庸之道」\n  才是最難得的啊！）'
                ]
                : [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（說完啦！）",
                    '<25>{#p/basic}（再次祝賀你！）\n（拜拜！）'
                ],
        neutral0() {
            let d = false;
            let k = '';
            let m = music.ending;
            const a = [] as string[];
            const b = [] as string[];
            const addA = (lines: string[]) => a.push(...lines);
            const addB = (lines: string[]) => b.push(...lines);
            const dtoriel = SAVE.data.n.state_wastelands_toriel === 2;
            const ddoggo = SAVE.data.n.state_starton_doggo === 2;
            const dlesserdog = SAVE.data.n.state_starton_lesserdog === 2;
            const dgreatdog = SAVE.data.n.state_starton_greatdog === 2;
            const ddogs = SAVE.data.n.state_starton_dogs === 2;
            const dpapyrus = SAVE.data.n.state_starton_papyrus === 1;
            const ddoge = SAVE.data.n.state_foundry_doge === 1;
            const dmuffet = SAVE.data.n.state_foundry_muffet === 1;
            const dundyne = SAVE.data.n.state_foundry_undyne !== 0;
            const droyalguards = SAVE.data.n.state_aerialis_royalguards === 1;
            const dmadjick = SAVE.data.b.killed_madjick;
            const dknightknight = SAVE.data.b.killed_knightknight;
            const dmettaton = SAVE.data.b.killed_mettaton;
            const hkills = world.trueKills;
            const mdeaths = hkills + (SAVE.data.n.state_foundry_undyne === 1 ? 1 : 0);
            const royals = [
                !ddoggo,
                !dlesserdog,
                !ddogs,
                !dgreatdog,
                !ddoge,
                !droyalguards,
                !dmadjick,
                !dknightknight
            ].filter(v => v).length;
            if (world.bad_robot) {
                if (!dundyne) {
                    if (royals < 2) {
                        d = true;
                        k = 'dark_death'; // NO-TRANSLATE

                        m = music.youscreweduppal;
                        
                        addB([
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<26>{#p/undyne}{#f/7}* 小混蛋，聽著！',
                            "<25>{#p/undyne}{#f/4}* 你此生最大的錯誤，\n  就是幹掉那麼多人，\n  偏偏把我救了！",
                            "<25>{#p/undyne}{#f/5}* 多虧了你，\n  我獲得了力量！\n  我終於能實現願望...",
                            '<25>{#p/undyne}{#f/17}* ...終於能...',
                            "<25>{#p/undyne}{#f/16}* ...等等，\n  出發之前，我想跟你講講\n  自己是怎麼獲得力量的。",
                            '<25>{#p/undyne}{#f/20}* 把時間倒回到\n  你離開前哨站的那天。',
                            "<25>{#p/undyne}{#f/22}* 你剛離開，\n  我就發現了那些暴行，\n  立馬就... 衝到了首塔。",
                            '<25>{#p/undyne}{#f/22}* Alphys被嚇得不輕。\n  國王死了，\n  皇家衛隊幾乎全軍覆沒。',
                            '<25>{#p/undyne}{#f/20}* 更糟的是...',
                            "<25>{#p/undyne}{#f/22}* Mettaton和Alphys為了\n  幹掉你，動用了大量的能量。\n* 最終，前哨站能量供應失控。",
                            '<25>{#p/undyne}{#f/19}* 供氣系統，人工重力系統...\n  這些賴以為生的裝置\n  都相繼崩潰。',
                            '<25>{#p/undyne}{#f/19}* 最終，死傷無數。',
                            "<25>{#p/undyne}{#f/18}* 另一邊，「檔案」突然被\n  一道強力電流擊中。",
                            '<25>{#p/undyne}{#f/16}* 由於皇家衛隊人手不足，\n  無法及時疏散裡面的人類...',
                            '<25>{#p/undyne}{#f/19}* 結果，他們全死了。',
                            '<25>{#p/undyne}{#f/10}* ...\n* 那時，我突然明白\n  ASGORE一直以來在做什麼。',
                            "<25>{#p/undyne}{#f/10}* 他在嘗試一條解放之路，\n  一條不用殺戮的解放之路。",
                            '<25>{#p/undyne}{#f/16}* ...呵。\n* 真... 不愧是他。',
                            "<25>{#p/undyne}{#f/19}* 但人類一死，王國淪陷。\n  他的計畫就徹底失敗了，",
                            '<25>{#p/undyne}{#f/20}* 不過那些靈魂還在，所以...',
                            '<25>{#p/undyne}{#f/20}* ...',
                            '<25>{#p/alphys}{#f/10}* 打個岔，成-成功了。',
                            '<25>{#p/undyne}{#f/12}* 真的？',
                            '<25>{#p/undyne}{#f/1}* 讓我看看...',
                            '<25>{#p/undyne}{#f/17}* ...',
                            '<25>{#p/alphys}{#f/18}* ...\n* 合你心意吧！？',
                            '<25>{#p/undyne}{#f/9}* 切。\n* 你聽聽自己在說啥。',
                            '<25>{#p/undyne}{#f/11}* 還「合你心意吧」，\n  你說呢？',
                            '<25>{#p/alphys}{#f/20}* ...',
                            "<25>{#p/undyne}{#f/8}* 那當然是...\n  超合我心意啦！",
                            '<25>{#p/undyne}{#f/7}* 我接著說，\n  靈魂還在，\n  所以在得到它們後...',
                            '<25>{#p/undyne}{#f/11}* 我和Alphys想了個主意...',
                            "<25>{#p/undyne}{#f/16}* 首先，乘坐飛船，\n  借靈魂力量穿過力場，\n  把你拿下...",
                            '<25>{#p/undyne}{#f/7}* 接著，把靈魂扯出來！',
                            "<25>{#p/undyne}{#f/1}* 集齊了靈魂，\n  我們就能轟碎力場，\n  解放怪物！",
                            '<25>{#p/undyne}{#f/12}* 只是，\n  怎麼定位到你的坐標呢？',
                            '<25>{#p/alphys}{#f/15}* 嘿！\n  我-我有辦法。',
                            '<25>{#p/alphys}{#f/16}* 很簡單。\n* 那人接通電話的一刻，\n  就暴露了自己的坐標。',
                            
                        ]);
                        if (!dpapyrus) {
                            addB([
                                "<25>{|}{#p/alphys}{#f/18}* 畢竟是我出的主意，\n  早就想到- {%}",
                                '<18>{#p/papyrus}{#f/6}UNDYNE？！\n你還好嗎？！',
                                '<25>{#p/alphys}{#f/2}* ...？！',
                                '<25>{#p/undyne}{#f/13}* 啊？？\n* 你跑過來幹啥？',
                                '<18>{#p/papyrus}{#f/5}嗯... 我聽到這邊\n傳來很大的尖叫聲，\n好像在吵架。',
                                '<18>{#p/papyrus}{#f/6}我擔心你，\n就過來了。',
                                '<25>{#p/undyne}{#f/14}* 謝謝你喔Papyrus。\n* 你可真是體貼呢。',
                                "<18>{#p/papyrus}{#f/0}哎呀，不用謝！",
                                "<25>{#p/undyne}{#f/7}* 下次，別人的飛船，\n  請你別隨便上，行不行！！！",
                                "<18>{#p/papyrus}{#f/6}對-對不起，\n我只是好奇。",
                                '<18>{#p/papyrus}{#f/5}本來只是想\n跑過來看一眼，\n結果...',
                                '<18>{#p/papyrus}{#f/6}一回神，這飛船\n都飛出前哨站了！',
                                "<18>{#p/papyrus}{#f/4}我發誓，\n再給我一次機會，\n我肯定不會上。",
                                "<25>{#p/alphys}{#f/15}* 行吧，\n  呃，你知不知道...",
                                "<25>{#p/alphys}{#f/23}* 咱們已經飛完半程了。",
                                '<25>{#p/undyne}{#f/12}* 是啊。所以...\n  你現在還是回密室去吧。',
                                '<25>{#p/undyne}{#f/1}* 就當咱們在玩捉迷藏！\n  你躲，我們找！',
                                '<18>{#p/papyrus}{#f/6}我要躲多長時間呢？',
                                "<25>{#p/undyne}{#f/12}* 我不知道啊？？？",
                                "<25>{#p/alphys}{#f/17}* 兩小時。\n* 你要躲兩個小時。",
                                '<18>{#p/papyrus}{#f/0}好！！\n兩位加油！！',
                                '<25>{#p/alphys}{#f/20}* ...兩小時應該夠抓住人類吧，\n  或許...',
                                '<25>{#p/undyne}{#f/14}* 噗，什麼？\n  兩小時？',
                                "<25>{#p/undyne}{#f/1}* 呵，用不著。",
                                '<25>{#p/undyne}{#f/4}* ...\n* 呋呼呼呼...',
                                '<25>{*}{#x0}{#p/undyne}{#f/7}* 兩秒就夠。{^40}{%}'
                            ]);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/18}* 畢竟是我出的主意，\n  早就想到這個問題了！",
                                "<25>{#p/undyne}{#f/1}* 呋呼呼... 那就行。",
                                "<25>{#p/undyne}{#f/7}* 小混蛋！\n  你的死，純是自找的！",
                                "<25>{#p/alphys}{#f/16}* 對！\n  你-你就在地獄裡\n  好好反思自己的罪行吧！！",
                                "<25>{#p/alphys}{#f/16}* 你去哪，\n  我們都能抓住！！",
                                "<25>{#p/undyne}{#f/8}* 對！！\n* ALPHYS，告訴那混蛋！！",
                                '<25>{#p/undyne}{#f/4}* ...\n* 呋呼呼呼...',
                                "<25>{*}{#x0}{#p/undyne}{#f/7}* 死期到了。{^40}{%}"
                            ]);
                        }
                    } else {
                        k = 'dark_undyne'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/alphys}{#f/33}* ...噓，應該是這個號，\n  打通了。',
                            "<25>{#p/alphys}{#f/1}* 人類，你好！\n* 我是Alphys博士。",
                            '<25>{#p/alphys}{#f/17}* 也是這個差勁而痛苦的世界裡\n  最大的受害者。',
                            '<25>{#p/alphys}{#f/28}* ...不知你是否想聽聽\n  這段時間裡，\n  這裡發生的悲劇？'
                        ]);
                        addB([
                            '<25>{#p/alphys}{#f/5}* 那時，\n  我正在進行「檔案」的日常維護...',
                            '<25>{#p/alphys}{#f/23}* 突然，\n  我聽到飛船起飛的聲音。',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 那飛船超~級大呢。',
                            '<25>{#p/alphys}{#f/17}* 呃... 沒多大其實。\n* 就是艘飛艇。',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 喔，懂了。\n* 小號飛船。',
                            '<25>{#p/alphys}{#f/15}* 我去找Asgore，\n  找了他家，找了王座...',
                            '<25>{#p/alphys}{#f/20}* 結果到處都找不到。',
                            '<25>{#p/alphys}{#f/21}* ...這時，我發現\n  前哨站的能量供應出了問題。',
                            '<25>{#p/alphys}{#f/24}* 看來，為了幹掉你，\n  Mettaton那個大蠢蛋\n  把核心的能量全吸光了。',
                            '<25>{#p/alphys}{#f/25}* 他這一搞，\n  前哨站的設施都沒法運轉了。',
                            '<32>{#p/basic}{@fill=#d4bbff}* 我去！\n* 之後呢？',
                            '<25>{#p/alphys}{#f/26}* ...',
                            '<32>{#p/basic}{@fill=#d4bbff}* 想起來了。\n* 你驚慌失措，\n  竟去找Undyne求助。',
                            '<25>{#p/alphys}{#f/18}* ...Undyne到了首塔。\n* 和我預想的完全一樣，\n  她告訴我...',
                            "<25>{#p/alphys}{#f/3}* Asgore被人殺了。",
                            '<32>{#p/basic}{@fill=#ffbbdc}* 肯定的。',
                            '<25>{#p/alphys}{#f/13}* 與此同時，\n  Undyne幫做了點好事...',
                            '<25>{#p/alphys}{#f/20}* 她召集皇家衛隊，\n  幫忙穩住核心，避免傷亡增加。',
                            '<25>{#p/alphys}{#f/30}* 但接下來，她的所作所為\n  讓我... 大跌眼鏡。',
                            '<32>{#p/basic}{@fill=#d4bbff}* 該... 該不會...',
                            '<25>{#p/alphys}{#f/31}* Undyne知道了「檔案」的事情。\n  衝到那裡，把裡面的人類\n  全殺了。',
                            "<25>{#p/alphys}{#f/32}* 當我發現時，都懵了。",
                            "<32>{#p/basic}{@fill=#ffbbdc}* 我天...\n* 這事真不怪你。",
                            "<32>{#p/basic}{@fill=#d4bbff}* 錯在她，自私自利。\n  就想著當「英雄」，好出名。",
                            '<25>{#p/alphys}{#f/17}* 媽的。\n* 她還跟我說，她完全「理解」\n  Asgore的良苦用心...',
                            '<25>{#p/alphys}{#f/24}* 但「絕不認同。」\n* 所以就幹掉了人類。',
                            '<25>{#p/alphys}{#f/13}* ...\n* 我很沮喪，\n  但最起碼... 靈魂還在。',
                            '<25>{#p/alphys}{#f/10}* 再得到一個靈魂，\n  我們就能自由。\n* 希望還在。',
                            "<32>{#p/basic}{@fill=#ffbbdc}* ...但希望還是破滅了。",
                            "<25>{#p/alphys}{#f/20}* 是的。\n* 靈魂沒了，希望也沒了。",
                            '<25>{#p/alphys}{#f/21}* Undyne，幹他娘的，\n  真是個極品，\n  腦殘中的極品。',
                            
                            '<25>{#p/alphys}{#f/22}* 她那魚籽大的腦子\n  根本不知道怎麼儲存\n  人類靈魂。',
                            "<32>{#p/basic}{@fill=#d4bbff}* 結果，六個靈魂全...",
                            '<25>{#p/alphys}{#f/24}* ...碎了。',
                            '<25>{#p/alphys}{#f/6}* 一切歸零，我徹底放棄了。',
                            "<25>{#p/alphys}{#f/8}* Undyne之後怎麼搞，\n  我都不在乎。",
                            '<25>{#p/alphys}{#f/10}* 我辭去了科學員的工作。\n  把所有實驗器材扔掉了。',
                            '<25>{#p/alphys}{#f/33}* 之後...',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 你重拾了老本行。',
                            '<32>{#p/basic}{@fill=#d4bbff}* 又跟我們一起，\n  撿太空垃圾！',
                            "<25>{#p/alphys}{#f/29}* 是啊。",
                            "<25>{#p/alphys}{#f/28}* 別小瞧我撿垃圾的技術。\n* 淦，我可是一把手呢。",
                            "<32>{#p/basic}{@fill=#ffbbdc}* 這可是大實話。",
                            '<25>{#p/alphys}{#f/10}* 生活這麼自在，\n  誰稀罕什麼「打破力場」呢？',
                            
                            "<25>{#p/alphys}{#f/18}* 沒事撿撿垃圾...\n  不比成天琢磨「逃出去」\n  輕鬆多了？",
                            '<32>{#p/basic}{@fill=#ffbbdc}* 不過，\n  檔案裡人類的內幕\n  還沒幾個人知道。',
                            "<32>{#p/basic}{@fill=#d4bbff}* 是呢。\n* 她糟蹋靈魂的事\n  都快成最高機密了。",
                            '<25>{#p/alphys}{#f/23}* 呵。\n* Undyne愛怎麼忽悠，怎麼折騰，\n  隨她便。',
                            '<25>{#p/alphys}{#f/23}* 建軍工廠？\n  建瞭望塔？\n* 沒人管她。',
                            '<25>{#p/alphys}{#f/25}* 她要是覺得「全面軍事化」\n  能讓她流芳千古，\n  就搞。',
                            '<25>{#p/alphys}{#f/26}* 她愛咋咋地，我不在乎。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/basic}{@fill=#d4bbff}* Undyne是怎麼\n  統治前哨站的？\n* 武裝奪權？",
                                '<26>{#p/alphys}{#f/24}* 呃，那事把我噁心壞了。',
                                '<25>{#p/alphys}{#f/30}* 曾經的王后站了出來，\n  想阻止她的野心...',
                                "<25>{#p/alphys}{#f/31}* ...結果，Undyne的擁護者們\n  一擁而上，把王后撂倒，\n  當場踩死。",
                                "<25>{#p/alphys}{#f/21}* 殺了人，\n  Undyne卻不用受任何刑罰。",
                                "<32>{#p/basic}{@fill=#ffbbdc}* 我去，純純悲劇了。"
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}{@fill=#d4bbff}* 對了，我聽說...\n  她好像正在全民強制徵兵，",
                                '<25>{#p/alphys}{#f/24}* 呃，真蠢。',
                                '<25>{#p/alphys}{#f/30}* 許多民眾，\n  每天強制站崗...\n  就為了第一時間發現人類。',
                                '<25>{#p/alphys}{#f/31}* 她才不管要等多長時間。',
                                "<25>{#p/alphys}{#f/21}* 把天文觀測網路當擺設。",
                                "<32>{#p/basic}{@fill=#ffbbdc}* 哇。\n* 她好像真忘了有這東西呢。"
                            ]);
                        }
                        addB(['<32>{#p/basic}{@fill=#d4bbff}* 是啊...']);
                        if (!dpapyrus) {
                            addB([
                                '<25>{#p/alphys}{#f/20}* 為了讓她停手，\n  Papyrus跪下來苦苦哀求。\n* 可她根本不聽。',
                                '<25>{#p/alphys}{#f/31}* ...自那之後，\n  我也不想管她了。'
                            ]);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/20}* 要是Papyrus還活著，\n  也許能勸得動她。",
                                "<25>{#p/alphys}{#f/18}* ...他為啥死了呢？\n  你我都心知肚明。"
                            ]);
                        }
                        if (hkills > 19) {
                            addB([
                                '<25>{#p/alphys}{#f/17}* ...\n* 講完了。\n* 這就是我們的命運。',
                                "<25>{#p/alphys}{#f/27}* 總之，\n  我可太謝謝你了。",
                                '<25>{#p/alphys}{#f/26}* 你要是不那麼大殺特殺，\n  我還不能這麼快體驗到\n  無間地獄的滋味呢。',
                                "<25>{#p/alphys}{#f/18}* 一切，都是你的錯。"
                            ]);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/17}* ...\n* 講完了。\n* 這就是我們的命運。',
                                "<25>{#p/alphys}{#f/26}* 誠然，\n  你沒殺那麼多人...",
                                '<25>{#p/alphys}{#f/23}* 誠然，我和Mettaton反應\n  有些過度...',
                                "<25>{#p/alphys}{#f/18}* 但最根本的錯在你。"
                            ]);
                        }
                        addB([
                            "<32>{#p/basic}{@fill=#ffbbdc}* Alphys，告訴那人。",
                            '<32>{#p/basic}{@fill=#d4bbff}* 對，親口告訴那人，\n  他就是個廢物！',
                            "<25>{#p/alphys}{#f/33}* ...嗯。\n* 她們代我說了。",
                            '<25>{#p/alphys}{#f/1}* 拜拜嚕！',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 再見，小屁孩。',
                            "<32>{#p/basic}{@fill=#d4bbff}* 「再見」？\n* Bratty，\n  難道還會和那人「再見」？",
                            "<32>{#p/basic}{@fill=#ffbbdc}* 哎呀，說錯了。\n* 這手機好像也要沒電了。",
                            '<32>{#p/basic}{@fill=#d4bbff}* 鱷鱷，一會見！！！\n* 喵哈哈！！！',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else if (royals < 2) {
                    if (!dpapyrus || royals === 1) {
                        k = 'dark_alphys'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/sans}{#f/0}* 你好呀。',
                            "<25>{#p/sans}{#f/3}* 近況可好？"
                        ]);
                        addB([
                            '<25>{#p/sans}{#f/0}* 在你走後，\n  alphys... 嚇得不輕。',
                            '<25>{#p/sans}{#f/0}* asgore死了，\n  undyne死了...',
                            '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的計畫\n  讓核心陷入停擺。',
                            "<25>{#p/sans}{#f/3}* 能量供應已經徹底崩潰。",
                            "<25>{#p/sans}{#f/3}* 氣壓不斷下降，\n  人工重力正在消失。\n* 情況... 不容樂觀。",
                            '<25>{#p/sans}{#f/0}* 接完alphys的電話，\n  趕去的路上，\n  我已經做好了最壞的打算。',
                            '<25>{#p/sans}{#f/0}* 可更糟的事還在後頭。',
                            '<25>{#p/sans}{#f/3}* 當我趕到首塔時，\n  一道強力電流直接貫穿了\n  「檔案」。',
'<25>{#p/sans}{#f/3}* 裡面的人類當場死亡。',
                            "<25>{#p/sans}{#f/3}* ...那是我第一次看到她\n  傷心成那樣。",
                            '<25>{#p/sans}{#f/0}* 但我相信，\n  她肯定能挺過去的。',
                            '<25>{#p/sans}{#f/2}* 畢竟我倆之前可是研究搭檔，\n  我了解她。',
                            '<25>{#p/sans}{#f/0}* 所以，我坐在她身旁陪伴她。\n* 發生這些事，\n  她也需要時間慢慢恢復。',
                            "<26>{#p/sans}{#f/3}* 最終，她振作起來。\n  接任了asgore的王位。",
                            "<25>{#p/sans}{#f/0}* ...繼任後的第一件事，\n  就是妥善儲存那些靈魂。",
                            '<25>{#p/sans}{#f/0}* 於是，我和alphys從\n  實驗室角落裡找到些舊材料，\n  給靈魂製造了容器。',
                            "<25>{#p/sans}{#f/3}* 有了容器，\n  誰來看管靈魂就成了問題。"
                        ]);
                        if (!dtoriel) {
                            addB([
                                '<25>{#p/sans}{#f/0}* 不久後，王后回歸了。',
                                '<25>{#p/sans}{#f/2}* 她理應是最合適的人選。',
                                '<25>{#p/sans}{#f/0}* 但隨即，\n  她看到了那些靈魂...',
                                '<25>{#p/sans}{#f/3}* 她不停地控訴，\n  說「我們都是他的幫兇」。',
                                '<25>{#p/sans}{#f/0}* 我們努力解釋，\n  把asgore的所作所為\n  都講給王后...',
                                "<25>{#p/sans}{#f/3}* 可她根本不聽。",
                                '<25>{#p/sans}{#f/3}* 想都不用想，\n  她直接拒絕了\n  看管靈魂的工作。'
                            ]);
                        }
                        if (!dpapyrus) {
                            if (!dtoriel) {
                                addB([
                                    "<25>{#p/sans}{#f/0}* toriel拒絕了，\n  我就去找papyrus。",
                                    '<25>{#p/sans}{#f/3}* 好在，當我把情況\n  告訴他後...'
                                ]);
                            } else {
                                addB(['<25>{#p/sans}{#f/3}* 好在，papyrus還在，\n  我找到他，把事情告訴了他後...']);
                            }
                            if (royals === 1) {
                                addB([
                                    '<25>{#p/sans}{#f/2}* 他馬上就答應了。',
                                    '<18>{#p/papyrus}{#f/4}...沒想到這會議開這麼久。',
                                    "<25>{#p/sans}{#f/0}* 哎，說曹操曹操到。\n* 會議順利嗎？",
                                    '<18>{#p/papyrus}{#f/0}喔，好得很呢！\n大夥相處可愉快了！',
                                    '<25>{#p/sans}{#f/3}* 嘿。\n* 那就好。',
                                    '<18>{#p/papyrus}{#f/0}對了，\n你給誰打電話呢？'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/2}* 他馬上就答應了。',
                                    "<18>{#p/papyrus}{#f/0}嘿，SANS！\n我把今天的活\n都幹完啦！",
                                    '<18>{#p/papyrus}{#f/9}未發現入侵者！\n容器沒有故障！',
                                    '<25>{#p/sans}{#f/0}* papyrus，幹的好。\n* 再接再厲。',
                                    "<18>{#p/papyrus}{#f/6}那必須滴！！！",
                                    "<18>{#p/papyrus}{#f/0}對了，\n你給誰打電話呢？"
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/2}* 呃，沒誰。\n* 就是個普通的人類。",
                                '<18>{#p/papyrus}{#f/4}人類？\n他們不是都...',
                                '<18>{#p/papyrus}{#f/7}...我知道了！！\n我要接電話！！',
                                '<25>{#p/sans}{#f/0}* 給你。',
                                '<18>{#p/papyrus}{#f/0}人類，你好！',
                                '<18>{#p/papyrus}{#f/4}咱倆有陣子沒見了...',
                                '<18>{#p/papyrus}{#f/5}...'
                            ]);
                            if (royals === 1) {
                                k = 'dark_alphys_therapy'; // NO-TRANSLATE

                                addB([
                                    "<18>{#p/papyrus}{#f/5}其實...\n我想給你講個故事。",
                                    '<15>{#f/6}聽完故事，你就知道\n這段時間裡，\n這裡都發生了啥。',
                                    '<25>{#p/sans}{#f/3}* ...喔。\n* 從前...',
                                    '<18>{#p/papyrus}{#f/7}噓！！！\n讓我說！',
                                    "<18>{#p/papyrus}{#f/5}我的工作是\n看守和日常維護靈魂，\n保證它們的安全。",
                                    '<18>{#p/papyrus}{#f/0}某天，我像往常一樣\n工作時...',
                                    '<18>{#p/papyrus}{#f/4}突然聽到什麼聲響。'
                                ]);
                                if (!ddoggo) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}聲音是從安保門那裡\n傳來的。',
                                        '<18>{#p/papyrus}{#f/6}我過去一看，\n原來是一隻奇怪的狗狗\n眼睛看不見，撞到了門！',
                                        '<18>{#p/papyrus}{#f/5}一開始，我很困惑...\n「為啥要來這呢？」',
                                        '<18>{#p/papyrus}{#f/5}一問，\n我才知道...',
                                        '<18>{#p/papyrus}{#f/6}犬衛隊的同伴不見了，\n他在找同伴。',
                                        '<18>{#p/papyrus}{#f/0}好在，他遇到了我。\n我很樂意幫他！',
                                        '<18>{#p/papyrus}{#f/4}於是，下班後...',
                                        '<18>{#p/papyrus}{#f/0}我倆就一起找\n犬衛隊的夥伴們。',
                                        '<18>{#p/papyrus}{#f/5}外域開放了，\n我們就從那裡開始找...',
                                        '<18>{#p/papyrus}{#f/5}一路找一路找，\n一直找到了\n首塔的塔頂...',
                                        "<18>{#p/papyrus}{#f/6}沿途的風景\n都看了個遍。",
                                        '<18>{#p/papyrus}{#f/5}...唯獨沒有找到\n一隻狗狗。',
                                        '<25>{#p/sans}{#f/0}* 嗯...',
                                        '<25>{#p/sans}{#f/3}* 最終，你倆也沒找到嗎？',
                                        '<18>{#p/papyrus}{#f/5}呃... 沒找到。',
                                        '<18>{#p/papyrus}{#f/5}我們回到了王座...',
                                        '<18>{#p/papyrus}{#f/5}ALPHYS剛醒，\n把事情告訴了我們。',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}聽罷，DOGGO十分難受。',
                                        "<18>{#p/papyrus}{#f/6}但我跟ALPHYS\n可不會丟下他不管！",
                                        '<18>{#p/papyrus}{#f/6}我告訴他，\n要是傷心了，就找我倆，\n一定會幫他的！',
                                        "<18>{#p/papyrus}{#f/5}而且，還會給他\n一個新的家。",
                                        '<25>{#p/sans}{#f/0}* 喔... 我說呢。',
                                        "<25>{#p/sans}{#f/2}* 我說asgore的沙發上\n  咋有那些狗毛呢。"
                                    ]);
                                } else if (!dlesserdog) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}聲音是從安保門那裡\n傳來的。\n是一陣輕快的叩門聲。',
                                        '<18>{#p/papyrus}{#f/6}我過去一看，\n原來是一隻短脖狗狗，\n想讓我摸摸它！',
                                        '<18>{#p/papyrus}{#f/5}一開始，我很困惑...\n「為啥要來這呢？」',
                                        '<18>{#p/papyrus}{#f/5}我就摸了摸它，',
'<18>{#p/papyrus}{#f/5}結果，脖子越摸越長，\n還扭成了字。',
                                        '<18>{#p/papyrus}{#f/6}最終，扭成了\n「ㄍㄨㄉㄨˊ」的形狀。',
                                        '<18>{#p/papyrus}{#f/6}我突然明白了：\n它很「孤獨」。',
                                        "<18>{#p/papyrus}{#f/8}看到那條孤獨的脖子，\n我好難過！！\n我好想哭！！",
                                        '<18>{#p/papyrus}{#f/5}傷心完了，\n我去找了ALPHYS，\n問她，這是怎麼回事...',
                                        '<18>{#p/papyrus}{#f/5}她把事情\n都告訴了我。',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}聽罷，我十分難受。',
                                        '<18>{#p/papyrus}{#f/6}但我也清楚\n為啥CANIS MINOR\n那麼孤獨了。',
                                        '<18>{#p/papyrus}{#f/5}所以，在那之後。\n我盡力陪伴它。',
                                        "<25>{#p/sans}{#f/3}* 嗯...\n* 希望這能讓它開心點。",
                                        '<25>{#p/sans}{#f/0}* 幹得不錯。'
                                    ]);
                                } else if (!ddogs) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}聲音是從安保門那裡\n傳來的。\n有人在砸門！',
                                        '<18>{#p/papyrus}{#f/6}我過去一看，\n是兩隻拿著斧頭的狗\n在砸門！',
                                        '<18>{#p/papyrus}{#f/5}一開始，\n我很擔心，\n「到底怎麼回事？」',
                                        '<18>{#p/papyrus}{#f/5}但很快，\n擔心變成了難過。',
                                        '<18>{#p/papyrus}{#f/5}他們告訴我...',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGAMY，DOGARESSA\n他倆說...',
                                        '<18>{#p/papyrus}{#f/5}「活都活不長了，\n 感情還有什麼用？\n 不如離婚算了。」',
                                        '<25>{#p/sans}{#f/0}* 嗯...',
                                        '<25>{#p/sans}{#f/3}* ...你肯定勸他倆\n  沒事離啥離，好好過日子。',
                                        '<18>{#p/papyrus}{#f/4}...',
                                        '<18>{#p/papyrus}{#f/4}你咋這麼懂我。',
                                        '<18>{#p/papyrus}{#f/5}我猜，他倆只是想\n暫時分開，一個人靜靜。\n畢竟發生了這麼多事。',
                                        "<18>{#p/papyrus}{#f/5}於是，我就讓他倆\n先在ASGORE家\n住一下。",
                                        '<25>{#p/sans}{#f/0}* 我聽說，他倆現在\n  還在那裡住著呢。',
                                        '<25>{#p/sans}{#f/2}* 我有預感，他家那個\n  一直「裝修中」的房間\n  能派上用場了。'
                                    ]);
                                } else if (!dgreatdog) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}聲音是從安保門那裡\n傳來的，\n是一種奇特的叩門聲。',
                                        "<18>{#p/papyrus}{#f/6}過去一看，\n「叩門聲」原來是\n大狗的吠叫。",
                                        '<18>{#p/papyrus}{#f/5}大狗脫下了盔甲，\n變成了小狗。',
                                        '<18>{#p/papyrus}{#f/6}它跑了過來，\n想找我玩！',
                                        '<18>{#p/papyrus}{#f/6}看起來，好久好久\n都沒人找它玩了。',
                                        "<18>{#p/papyrus}{#f/6}我第一次看到\n狗狗這麼想找人玩。",
                                        '<18>{#p/papyrus}{#f/4}我感覺不對勁...',
                                        '<18>{#p/papyrus}{#f/6}我不太懂狗的世界，\n但它肯定是失去了啥，\n才會做出那樣的舉動！',
                                        '<18>{#p/papyrus}{#f/5}後來，\n我找ALPHYS問了這事...',
                                        '<18>{#p/papyrus}{#f/5}她把事情\n都告訴了我。',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}聽罷，我十分難受。',
                                        '<18>{#p/papyrus}{#f/6}但我也清楚\n為啥CANIS MAJOR\n那麼想找人玩了。',
                                        '<18>{#p/papyrus}{#f/5}所以，在那之後。\n只要有空，我就陪它玩。',
                                        "<25>{#p/sans}{#f/3}* 嗯...\n* 希望這能讓它開心點。",
                                        '<25>{#p/sans}{#f/0}* 幹得不錯。'
                                    ]);
                                } else if (!ddoge) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}是電話聲。\n一名高級守衛打來了\n電話。',
                                        '<18>{#p/papyrus}{#f/6}電話那邊的聲音\n十分失落。',
                                        "<18>{#p/papyrus}{#f/5}電話那邊說，\n她是UNDYNE的朋友。",
                                        '<18>{#p/papyrus}{#f/6}讓我去找她，\n商議一些「重要事務」。',
                                        '<18>{#p/papyrus}{#f/6}一路上，\n我有點緊張...',
                                        '<18>{#p/papyrus}{#f/5}還好，她叫我過去，\n只是想談談心。',
                                        '<18>{#p/papyrus}{#f/4}其實，跟她聊天時，\n我感覺她話裡有話...',
                                        '<18>{#p/papyrus}{#f/5}仔細想了想，\n我知道她想說啥了。',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGE問我，\n她這麼拼死拼活\n保護怪物，為了啥？',
                                        '<18>{#p/papyrus}{#f/6}她問我\n當上皇家守衛，\n到底有什麼意義？',
                                        '<18>{#p/papyrus}{#f/5}她問我...',
                                        '<18>{#p/papyrus}{#f/6}區區一個人類，\n就能殲滅整支守衛隊，\n那她還能改變什麼？',
                                        '<18>{#p/papyrus}{#f/5}...\n我沒有回答，\n帶她去了首塔。',
                                        '<18>{#p/papyrus}{#f/5}我把靈魂拿了出來，\n對她說...',
                                        
                                        '<18>{#p/papyrus}{#f/6}「只差一個。」',
                                        '<18>{#p/papyrus}{#f/5}聽罷，她轉過頭，\n閉目深思...',
                                        '<18>{#p/papyrus}{#f/6}「明白了。」',
                                        '<25>{#p/sans}{#f/0}* 哎呀。\n* 真不容易啊。',
                                        "<25>{#p/sans}{#f/3}* 希望看完靈魂後，\n  她能恢復一點士氣吧。"
                                    ]);
                                } else if (!droyalguards) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}是電話聲。\n兩名帶編號的守衛\n打來了電話。',
                                        '<18>{#p/papyrus}{#f/6}電話那邊的聲音\n十分失落。',
                                        '<18>{#p/papyrus}{#f/5}電話那邊說，\n他倆愛一起吃冰淇淋。',
                                        '<18>{#p/papyrus}{#f/6}有事想和我聊聊，\n叫我過去。',
                                        '<25>{#p/sans}{#f/0}* 我想...',
                                        "<25>{#p/sans}{#f/3}* 他倆叫你過去，\n  肯定不是請你吃\n  冰淇淋。",
                                        '<18>{#p/papyrus}{#f/6}要真是那樣\n就好了。',
                                        '<18>{#p/papyrus}{#f/5}沒有冰淇淋，\n只有... 噩耗。',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}他倆說，\n自己還剛被提拔，\n可現在...',
                                        '<18>{#p/papyrus}{#f/6}卻感覺所有訓練，\n所有努力，\n都分文不值。',
                                        '<18>{#p/papyrus}{#f/6}但難不倒我！',
'<18>{#p/papyrus}{#f/6}我說，\n「幫你倆找個新工作，\n咋樣？」',
                                        '<18>{#p/papyrus}{#f/5}我想了一堆點子。',
                                        '<18>{#p/papyrus}{#f/4}大部分點子都沒被採納，\n但偏偏，「加入遊泳隊」\n很合他倆胃口。',
                                        '<18>{#p/papyrus}{#f/4}連我都挺納悶。',
                                        "<25>{#p/sans}{#f/0}* 一號，二號他倆\n  後來成了職業遊泳運動員？",
                                        "<25>{#p/sans}{#f/3}* 嗯，他倆開心就好。",
                                        "<18>{#p/papyrus}{#f/4}喔，你放心！",
                                        "<18>{#p/papyrus}{#f/0}他倆不僅開心，\n還挺出名呢！",
                                        "<18>{#p/papyrus}{#f/5}...\n只是...",
                                        '<18>{#p/papyrus}{#f/5}一想到他倆為啥轉行，\n辭去守衛，當上運動員...\n我心裡就一陣難過。'
                                    ]);
                                } else if (!dmadjick) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}一回神，\n一名奇怪的魔術師\n突然出現在安保室裡。',
                                        '<18>{#p/papyrus}{#f/6}它問我，\n「活著，有什麼意義？」',
                                        '<18>{#p/papyrus}{#f/4}我不得不...\n讓他遷就一下，\n說話「形而下」一點。',
                                        '<18>{#p/papyrus}{#f/4}這都是往好了說。',
                                        '<25>{#p/sans}{#f/3}* 我都能想像到\n  那幅場面。',
                                        '<25>{#p/sans}{#f/0}* 那麼，在「深入交談」後，\n  你有什麼收穫？',
                                        '<18>{#p/papyrus}{#f/5}嗯...\n我學到了很多東西。',
                                        '<18>{#p/papyrus}{#f/6}有恐懼，\n有憂慮...',
                                        '<18>{#p/papyrus}{#f/5}還有那異常強烈的...\n失落。',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}COZMO窮盡一生，\n就為了讓它的導師\n重視它。',
                                        '<18>{#p/papyrus}{#f/6}而如今，\n導師TERRESTRIA\n卻先一步離去。',
'<18>{#p/papyrus}{#f/6}讓它備受打擊。',
                                        '<18>{#p/papyrus}{#f/5}它總覺得自己不夠優秀，\n無法成為導師的驕傲。\n現在卻再也沒有機會了。',
                                        '<18>{#p/papyrus}{#f/6}我可不服！',
                                        "<18>{#p/papyrus}{#f/5}我知道。\n導師看到它還活著，\n一定會很欣慰的。",
                                        '<18>{#p/papyrus}{#f/4}最熟悉，了解導師的人，\n非它莫屬。',
                                        '<18>{#p/papyrus}{#f/5}所以，它最該做的，\n正是繼承導師的遺志，\n堅強活著。',
                                        '<18>{#p/papyrus}{#f/0}我們越聊越起勁，\n聊了很久！',
                                        "<18>{#p/papyrus}{#f/6}我都佩服自己\n居然能聽懂它說話！",
                                        '<18>{#p/papyrus}{#f/0}聊罷，\n我倆心滿意足地分別。',
                                        '<18>{#p/papyrus}{#f/5}可我...\n總感覺哪裡不對勁。'
                                    ]);
                                } else {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}聲音是從安保門那邊\n傳來的，\n有人在敲門。',
                                        '<18>{#p/papyrus}{#f/4}敲門者很有禮貌。\n我請她進來坐坐。',
                                        '<18>{#p/papyrus}{#f/5}結果發現...\n她塊頭太大，進不來。',
                                        '<18>{#p/papyrus}{#f/5}所以...',
                                        '<18>{#p/papyrus}{#f/6}為了讓這位身著盔甲的\n高大騎士進來，\n我把器材都搬到了外面。',
                                        '<18>{#p/papyrus}{#f/4}隨後，我們聊了天。',
                                        '<18>{#p/papyrus}{#f/5}主題是...',
                                        '<18>{#p/papyrus}{#f/6}...死亡。',
                                        '<18>{#p/papyrus}{#f/6}我並不喜歡這個話題，\n但她很想找人傾訴。',
                                        
                                        '<18>{#p/papyrus}{#f/6}她說，\n自己活得太久了。',
                                        '<18>{#p/papyrus}{#f/6}她說，\n自己目睹了無數人死去。',
                                        '<18>{#p/papyrus}{#f/5}她還說...',
                                        '<18>{#p/papyrus}{#f/3}...別的守衛們，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}我想讓她開心點。',
                                        "<18>{#p/papyrus}{#f/6}可是，不管怎麼安慰，\nTERRESTRIA還是\n那麼痛苦！",
                                        '<18>{#p/papyrus}{#f/5}所以...',
                                        '<18>{#p/papyrus}{#f/5}我閉上了嘴，\n緊緊抱住她。',
                                        '<18>{#p/papyrus}{#f/6}這一抱，\n就是幾個小時...',
                                        "<18>{#p/papyrus}{#f/6}我都沒想到，\n居然抱了那麼久！！",
                                        "<18>{#p/papyrus}{#f/5}後來，她走了。\n走之前，她說，\n「會挺過去的。」",
                                        "<18>{#p/papyrus}{#f/4}我半信半疑。",
                                        "<18>{#p/papyrus}{#f/5}但她既然那麼說，\n我也不想刺探得太深，\n只能衷心祝福。",
                                        '<25>{#p/sans}{#f/3}* 嗯...',
                                        "<25>{#p/sans}{#f/0}* 她要是又需要幫助，\n  肯定會告訴你的。",
                                        '<18>{#p/papyrus}{#f/5}但願吧。'
                                    ]);
                                }
                                addB([
                                    '<18>{#p/papyrus}{#f/5}...',
                                    "<18>{#p/papyrus}{#f/5}知道了你的所作所為，\n還有那些悲劇...\n我心裡挺不好受的。",
                                    "<18>{#p/papyrus}{#f/6}但這些，不全怪你。",
                                    "<18>{#p/papyrus}{#f/6}皇家守衛的工作，\n就是「抓住人類」...",
                                    "<18>{#p/papyrus}{#f/5}漸漸地，\n我明白了「抓住人類」\n這四個字代表什麼。",
                                    '<18>{#p/papyrus}{#f/5}明白了，身為守衛，\n就要履行職責，\n摧毀某些東西。',
                                    '<18>{#p/papyrus}{#f/3}明白了... 這是戰爭，\n這是對抗。\n這是一件痛苦的事。',
                                    '<18>{#p/papyrus}{#f/31}...',
                                    "<18>{#p/papyrus}{#f/5}也許，從一開始\n我就不該想著當什麼\n皇家守衛。",
                                    '<18>{#p/papyrus}{#f/6}也許...\nUNDYNE那麼做，\n就是為了保護我。',
                                    "<18>{#p/papyrus}{#f/5}...我不知道，\n怎麼面對「守衛」\n這個稱號。",
                                    "<25>{#p/sans}{#f/0}* 嘿，給人類講講\n  之後發生的故事吧。",
                                    '<18>{#p/papyrus}{#f/6}喔對！！\n差點跑題了。',
                                    '<18>{#p/papyrus}{#f/0}跟守衛的會面\n給我搞得特別累。',
                                    "<18>{#p/papyrus}{#f/4}於是（別說我懶喔）...",
                                    '<18>{#p/papyrus}{#f/4}回家後，我倒頭就睡，\n睡了很久。'
                                ]);
                                if (!ddoggo || !dlesserdog || !ddogs || !dgreatdog || !dknightknight) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/6}後來，我被一陣敲門聲弄醒。',
                                        '<18>{#p/papyrus}{#f/0}有人來我家找我。'
                                    ]);
                                } else if (!ddoge || !droyalguards) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/6}後來，\n我被一陣電話鈴聲吵醒。',
                                        '<18>{#p/papyrus}{#f/0}有人打電話找我。'
                                    ]);
                                } else {
                                    addB([
                                        '<19>{#p/papyrus}{#f/6}後來，又有人\n閃現到我的面前，\n把我驚醒。',
                                        '<18>{#p/papyrus}{#f/0}這人來我家找我。'
                                    ]);
                                }
                                addB([
                                    '<18>{#p/papyrus}{#f/5}原來，是遇到了困難，\n想讓我幫忙解開心結。',
                                    '<18>{#p/papyrus}{#f/0}正好，\n我睡了一覺，精神百倍！',
                                    '<18>{#p/papyrus}{#f/0}於是，我幫助了他。',
                                    '<18>{#p/papyrus}{#f/4}第二天，\n又有人找我談心。',
                                    '<18>{#p/papyrus}{#f/5}第三天，\n增加到兩個。',
                                    '<18>{#p/papyrus}{#f/6}第四天，三個！\n第五天，五個！！\n第六天，七個！！！',
                                    '<25>{#p/sans}{#f/2}* 第七天，十一個？',
                                    '<18>{#p/papyrus}{#f/4}不。\n再往後，\n人數都是合數了。',
                                    '<18>{#p/papyrus}{#f/6}無論誰來，\n我都會盡力幫助他！！',
                                    '<18>{#p/papyrus}{#f/5}來的人越來越多，\n我就在想...',
                                    "<18>{#p/papyrus}{#f/6}是時候進行\n產業化發展，\n做大做強了！！",
                                    '<18>{#p/papyrus}{#f/9}所以，我把\n「看守人類靈魂」的工作\n交給了那名皇家守衛。',
                                    '<18>{#p/papyrus}{#f/4}轉而將工作重心\n轉移到建設療養公司上。',
                                    
                                    '<18>{#p/papyrus}{#f/0}我寫了宣傳語，\n買了幾幢大樓，\n僱了些員工，創辦公司。',
                                    '<18>{#p/papyrus}{#f/0}名為「帕牌儒思」。',
                                    '<18>{#p/papyrus}{#f/9}我們的宣傳口號是：\n「我們多-費-心，\n 您才更-省-心！」',
                                    '<25>{#p/sans}{#f/0}* 這口號真不錯。',
                                    '<18>{#p/papyrus}{#f/0}對了，SANS可是我們的\n前臺接待員。',
                                    "<18>{#p/papyrus}{#f/9}有他幫忙，\n我就能從容地服務\n每一位患者！",
                                    '<18>{#p/papyrus}{#f/5}終於啊，我的兄弟\n也「偉大」起來了...',
                                    "<18>{#p/papyrus}{#f/0}真為他驕傲！！",
                                    '<25>{#p/sans}{#f/0}* 是啊，這公司的分工\n  很合咱倆的性格呢。',
                                    '<18>{#p/papyrus}{#f/9}那肯定的！！！\n開了公司，新面孔\n簡直多得應接不暇啊！！',
                                    '<25>{#p/sans}{#f/2}* 嘿嘿嘿，「應接」不暇。',
                                    "<18>{#p/papyrus}{#f/6}啊？！\n啥事把你樂成這樣？",
                                    '<25>{#p/sans}{#f/3}* 喔，沒啥。',
                                    "<18>{#p/papyrus}{#f/4}你真是一點沒變。",
                                    '<18>{#p/papyrus}{#f/5}...\n總之...',
                                    "<18>{#p/papyrus}{#f/6}不管過去發生了什麼...",
                                    '<18>{#p/papyrus}{#f/5}我希望，有一天\n你也能找到自己的\n使命與夢想。',
                                    '<18>{#p/papyrus}{#f/4}要是心情不好，\n想找人聊天...',
                                    '<18>{#p/papyrus}{#f/6}就回個電話，\n我們肯定會...',
                                    '<18>{#p/papyrus}{#f/4}...喔，原來如此。\n這雙關挺逗，SANS。',
                                    '<25>{#p/sans}{#f/2}* 嘿，你終於明白\n  我為啥{@fill=#ff0}接{@fill=#fff}話茬了。',
                                    '<18>{#p/papyrus}{#f/7}總之，回個電話，\n我們肯定會接！！！'
                                ]);
                            } else {
                                k = 'dark_alphys_virtual'; // NO-TRANSLATE

                                addB([
                                    "<18>{#p/papyrus}{#f/5}這段時間裡，\n很多夥伴失蹤了。",
                                    "<18>{#p/papyrus}{#f/6}ASGORE，\n我倆經常一起分享故事，\n現在，他卻失蹤了...",
                                    "<18>{#p/papyrus}{#f/6}UNDYNE，\n一直努力訓練我，\n現在，她也失蹤了...",
                                    "<18>{#p/papyrus}{#f/5}還有那些皇家守衛，\n他們每次上班時，\n都會跟我打招呼。",
                                    '<18>{#p/papyrus}{#f/5}現在，也失蹤了...',
                                    "<18>{#p/papyrus}{#f/5}曾經和他們共度\n那麼多時光，可現在，\n卻一個個都失蹤了。",
                                    "<18>{#p/papyrus}{#f/5}不知道他們什麼時候\n才能回來。",
                                    "<18>{#p/papyrus}{#f/7}我想他們，\n都快想瘋了！！！",
                                    "<18>{#p/papyrus}{#f/4}他們沒有日程表嗎？",
                                    '<18>{#p/papyrus}{#f/6}他們不看日曆嗎？！',
                                    "<18>{#p/papyrus}{#f/5}誰能告訴我，\n他們啥時候能回來啊！",
                                    "<25>{#p/sans}{#f/3}* 嘿...",
                                    '<25>{#p/sans}{#f/0}* 你想他們，我也想。',
'<25>{#p/sans}{#f/0}* 可也不能成天只盼著\n  他們回來，別的啥也不幹啊。\n* 日子該過還得過。',
                                    '<25>{#p/sans}{#f/2}* 跟人類聊點別的吧。',
                                    '<18>{#p/papyrus}{#f/4}嗯...\n聊點別的...',
                                    '<18>{#p/papyrus}{#f/0}喔！想到了！\n聊聊「檔案」空間吧！',
                                    '<25>{#p/sans}{#f/2}* 好主意。\n* 那裡都快成你第二個家了。',
                                    '<18>{#p/papyrus}{#f/9}我去那裡，\n可是有正當理由的！',
                                    '<18>{#p/papyrus}{#f/0}給你解釋下\n最近我為啥總去吧。',
                                    '<18>{#p/papyrus}{#f/4}每天，我除了看守靈魂，\n啥都不用幹...',
                                    '<18>{#p/papyrus}{#f/0}就一下子閒下來了。',
                                    '<18>{#p/papyrus}{#f/4}我就在想，\n「怎麼打發時間呢？」',
                                    '<18>{#p/papyrus}{#f/0}有一天，我在一間\n儲物櫃裡發現了一個...\n奇怪的裝置。',
                                    '<18>{#p/papyrus}{#f/5}我找到ALPHYS，\n問她，那東西是幹啥的。',
                                    '<18>{#p/papyrus}{#f/6}結果，她一下子\n打開了話匣子，\n叨叨個沒完！！',
                                    '<18>{#p/papyrus}{#f/0}簡單說，\n那個裝置是用來\n模擬虛擬空間的。',
                                    '<18>{#p/papyrus}{#f/5}我問她，\n「咱們進虛擬空間，\n 體驗一下，咋樣？」',
                                    '<18>{#p/papyrus}{#f/4}她看我挺無聊的，\n就同意了。',
                                    "<18>{#p/papyrus}{#f/4}不過，由於沒有加載\n虛擬世界資源包，\n「檔案」裡啥都沒有。",
                                    '<18>{#p/papyrus}{#f/0}於是...\nALPHYS下載了\n一部知名科幻番。',
                                    '<18>{#p/papyrus}{#f/0}然後讓系統根據它\n「生成」一個虛擬世界。',
                                    '<18>{#p/papyrus}{#f/5}世界生成完畢後，\n她讓我戴上一個\n奇怪的頭盔...',
                                    '<18>{#p/papyrus}{#f/6}我有點不敢戴，\n但為了科學，\n我還是照做了！！',
                                    '<18>{#p/papyrus}{#f/4}突然...',
                                    "<18>{#p/papyrus}{#f/9}我被傳送到了一個\n從未見過的世界！！！",
                                    '<18>{#p/papyrus}{#f/0}在那裡，我暢遊了\n好幾個小時...',
                                    '<18>{#p/papyrus}{#f/0}穿梭在行星之間，\n邂逅形形色色的人...',
                                    "<18>{#p/papyrus}{#f/5}看到有人受傷，\n我也跟著難受。",
                                    '<18>{#p/papyrus}{#f/9}雖然世界是假的，\n但情感是真的！',
                                    '<18>{#p/papyrus}{#f/5}所以，我拼盡全力，\n拯救所有人。',
                                    '<18>{#p/papyrus}{#f/0}後來，ALPHYS也來幫忙，\n一起拯救大家！',
                                    "<18>{#p/papyrus}{#f/0}從那時起，\n我倆就總去虛擬空間\n一起冒險。",
                                    "<25>{#p/sans}{#f/0}* 她好像現在就在那裡呢。",
                                    '<25>{#p/sans}{#f/2}* 你快過去看看。',
                                    '<18>{#p/papyrus}{#f/9}好，我這就去！',
                                    '<18>{#p/papyrus}{#f/0}對不起，人類！\n冒險不等骨啊！',
                                    '<25>{#p/sans}{#f/3}* ...',
                                    "<25>{#p/sans}{#f/3}* 挺好的。\n* 他把注意力轉移到虛擬空間上，\n  就不用去想那些事了。",
                                    "<25>{#p/sans}{#f/0}* 這段日子裡，\n  很多民眾過得並不好。",
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊全軍覆沒，\n  能源供應也出了故障...',
                                    '<25>{#p/sans}{#f/3}* 百姓生活很苦，\n  卻沒人可以傾訴。',
                                    "<25>{#p/sans}{#f/0}* 即使他們想傾訴，\n  也鼓不起勇氣開口...",
                                    '<25>{#p/sans}{#f/3}* 沒有勇氣跟別人訴苦。',
                                    '<25>{#p/sans}{#f/3}* ...'
                                ]);
                                if (hkills > 19) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 許多民眾都討厭人類，\n  我並不意外。",
                                        '<25>{#p/sans}{#f/0}* 你就算饒了我的兄弟...\n  也還是殺了許多怪物。',
                                        '<25>{#p/sans}{#f/3}* 其中，有不少怪物身居要職，\n  對這裡十分重要。'
                                    ]);
                                } else {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 倒不是指責你，\n  說你是罪魁禍首。",
                                        "<25>{#p/sans}{#f/0}* 你不僅饒恕了我兄弟，\n  也放過了不少其他怪物。",
                                        '<25>{#p/sans}{#f/3}* 只是，對大家來說。\n  你殺的那幾名守衛\n  都是很重要的人。'
                                    ]);
                                }
                                addB([
                                    '<25>{#p/sans}{#f/0}* ...雖然在主觀上\n  我挺反感他們的行徑...',
                                    '<25>{#p/sans}{#f/0}* 但客觀來講，有皇家衛隊，\n  民眾確實心裡更踏實，\n  更有安全感。',
                                    "<25>{#p/sans}{#f/3}* 但現在，守衛沒了，\n  大夥的安全感也沒了。",
                                    "<25>{#p/sans}{#f/3}* 呵，連mettaton也「失蹤」了。",
                                    '<25>{#p/sans}{#f/0}* 大家沒節目可看了，\n  也沒有周邊可買了...',
                                    '<25>{#p/sans}{#f/0}* 沒了他，前哨站\n  也失去了不少活力。'
                                ]);
                                if (hkills > 19) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 至於你，我就直說吧。",
                                        '<25>{#p/sans}{#f/3}* 你根本不是啥好人。\n* 就這麼簡單。',
                                        '<25>{#p/sans}{#f/0}* ...\n* 總之，我要掛電話了。',
                                        '<25>{#p/sans}{#f/3}* 不好意思，孩子。',
                                        '<25>{#p/sans}{#f/3}* ...'
                                    ]);
                                } else {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 至於你，不太好評價。",
                                        "<25>{#p/sans}{#f/3}* 你並不壞，\n  但我也不咋喜歡你。",
                                        '<25>{#p/sans}{#f/0}* ...\n* 總之，我要掛電話了。',
                                        '<25>{#p/sans}{#f/3}* 不好意思，孩子。',
                                        '<25>{#p/sans}{#f/3}* 在太空飛行多注意安全。\n* 拜拜。'
                                    ]);
                                }
                                addB(['<32>{#s/equip}{#p/event}* 滴...']);
                            }
                        } else {
                            if (!dtoriel) {
                                addB(['<25>{#p/sans}{#f/0}* 她不幫忙，\n  只能重新招人了。']);
                            } else {
                                addB(["<25>{#p/sans}{#f/0}* 我想了半天，\n  也沒想到合適的人選..."]);
                            }
                            addB(['<25>{#p/sans}{#f/0}* ...於是，我們到處詢問。\n  看有沒有信得過的人\n  願意接手這份工作。']);
                            if (!ddoggo) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了doggo...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這名犬衛隊成員\n  活了下來。',
                                    '<25>{#p/sans}{#f/2}* 好在，他欣然接受了\n  這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Doggo嗎？'
                                ]);
                            } else if (!dlesserdog) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了\n  canis minor...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這名犬衛隊成員\n  活了下來。',
                                    '<25>{#p/sans}{#f/2}* 好在，它欣然接受了\n  這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Canis Minor嗎？'
                                ]);
                            } else if (!ddogs) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了\n  dogamy和dogaressa...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  整個犬衛隊，\n  只有他們活了下來。',
                                    '<25>{#p/sans}{#f/2}* 好在，他們欣然接受了\n  這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Dogamy和\n  Dogaressa嗎？'
                                ]);
                            } else if (!dgreatdog) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了\n  canis major...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這名犬衛隊成員\n  活了下來。',
                                    '<25>{#p/sans}{#f/2}* 好在，它欣然接受了\n  這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Canis Major嗎？'
                                ]);
                            } else if (!ddoge) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了doge...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這名特戰隊成員\n  活了下來。',
                                    '<25>{#p/sans}{#f/3}* 她整理好行裝，\n  隨即接下了這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Doge嗎？'
                                ]);
                            } else if (!droyalguards) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了一號守衛\n  和二號守衛...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這兩名巡邏官\n  活了下來。',
                                    '<25>{#p/sans}{#f/3}* 他倆卸下了盔甲，\n  最終接下了這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說一號，二號嗎？'
                                ]);
                            } else if (!dmadjick) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了cozmo...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這名特戰隊成員\n  活了下來。',
                                    '<25>{#p/sans}{#f/3}* 剛接下這份工作時，\n  他還挺困惑。\n* 但很快他就適應了。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Cozmo嗎？'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我們找到了terrestria...',
                                    '<25>{#p/sans}{#f/0}* 皇家衛隊慘遭剿殺，\n  只有這名特戰隊成員\n  活了下來。',
                                    '<25>{#p/sans}{#f/3}* 正如我所料，\n  她心懷敬畏，\n  莊嚴地接受了這份工作。',
                                    '<25>{#p/alphys}{#f/27}* 喔？\n* 你剛剛在說Terrestria嗎？'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 喔，是alphys呀。\n* 我正給人類留言呢。",
                                '<25>{#p/alphys}{#f/17}* 行。\n* 之前你確實說\n  要給人類打個電話。'
                            ]);
                            if (!ddoggo) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 沒錯，\n  雖然Doggo有時會焦慮...",
                                    '<25>{#p/alphys}{#f/8}* 但有我陪著他。\n* 以前，我幫過他，\n  所以他也安心了。'
                                ]);
                            } else if (!dlesserdog) {
                                addB([
                                    '<25>{#p/alphys}{#f/6}* 沒錯。',
'<25>{#p/alphys}{#f/6}* 雖然那狗狗脖子太長，\n  有時挺麻煩的...\n* 但它活幹得不錯。',
                                    '<25>{#p/alphys}{#f/8}* 只要有人摸它，\n  沒完沒了地摸它，\n  它就心滿意足。'
                                ]);
                            } else if (!ddogs) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 沒錯。\n* 那兩隻狗狗只要在一起，\n  就能把活幹得很漂亮。",
                                    '<25>{#p/alphys}{#f/8}* 他倆這麼賣力，\n  各自想要的卻是...\n  「一個人靜靜」。'
                                ]);
                            } else if (!dgreatdog) {
                                addB([
                                    '<25>{#p/alphys}{#f/6}* 沒錯。\n* 那隻大狗不僅接下了工作，\n  還幹得特別起勁。',
                                    '<25>{#p/alphys}{#f/8}* 它不求別的，\n  只求能多被「摸摸頭」。'
                                ]);
                            } else if (!ddoge) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 沒錯。\n* Doge雖然有點冷血，\n  但對工作十分認真。",
                                    '<25>{#p/alphys}{#f/8}* 因此，\n  我們總請她洗冷水澡。\n* 乍一聽很怪，但確實合理。'
                                ]);
                            } else if (!droyalguards) {
                                addB([
                                    '<26>{#p/alphys}{#f/6}* 沒錯。',
'<26>{#p/alphys}{#f/6}* 一號、二號他倆特別可愛。\n  而且沒想到...\n  活還幹的不錯。',
                                    '<25>{#p/alphys}{#f/8}* 看他倆工作那麼賣力，\n  我總請他倆吃冰淇淋。\n* 他們特別愛吃。'
                                ]);
                            } else if (!dmadjick) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 沒錯。\n* 雖然它有時會「躁動」，\n  但活幹得不錯。",
                                    '<25>{#p/alphys}{#f/8}* 因此，我們總獎勵它\n  一些詩歌。\n* 它非常喜歡。'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 沒錯。\n* 她... 幹得非常出色。",
                                    '<25>{#p/alphys}{#f/8}* 因此，我們總給它\n  唱安魂曲作為獎勵。\n* 那些曲子能讓她平靜下來。'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 挺好的。\n* 工作安排得不錯。",
                                "<25>{#p/sans}{#f/3}* 大家各司其職，各得其所。\n* 所有人都很幸福。",
                                '<25>{#p/sans}{#f/3}* ...',
                                '<25>{#p/sans}{#f/3}* 對，所有「人」都很幸福。',
                                '<25>{#p/alphys}{#f/15}* ...這...',
                                "<25>{#p/alphys}{#f/10}* 你倆聊吧。\n* 我先走了...",
                                '<25>{#p/sans}{#f/0}* 再等等，\n  我馬上打完了。',
                                '<25>{#p/alphys}{#f/17}* ...喔。',
                                "<25>{#p/sans}{#f/3}* 對前哨站居民來說。\n* 活著，就是煎熬。",
                                '<25>{#p/sans}{#f/0}* 對我如此，\n  對alphys更是如此...',
                                '<25>{#p/sans}{#f/3}* ...對所有怪物，\n  都是如此。',
                                "<25>{#p/alphys}{#f/24}* 是啊。\n* 我們遭這些罪，\n  都是因為你。",
                                '<25>{#p/alphys}{#f/25}* 真嚇人。\n* 區區一個小孩\n  居然能殺好幾隻怪物。'
                            ]);
                            if (hkills > 19) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 那何止是\n  「好幾隻怪物」...',
                                    '<25>{#p/sans}{#f/0}* 你殺的...\n  可是許多重要的大將。',
                                    '<25>{#p/sans}{#f/0}* 他們的死，\n  沉重打擊了大家的希望。',
                                    '<25>{#p/sans}{#f/3}* ...而且，\n  你還殺了「他」...'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/sans}{#f/3}* 平心而論，\n  你殺的怪不算多。",
                                    '<25>{#p/sans}{#f/0}* 遇到那些守衛，\n  你很害怕，想自保，\n  我能理解。',
                                    '<25>{#p/sans}{#f/0}* 而且，面對其他怪物時，\n  你也沒有大開殺戒。',
                                    '<25>{#p/sans}{#f/3}* ...話雖如此，\n  你還是殺了「他」...'
                                ]);
                            }
                            addB(['<25>{#p/sans}{#f/0}* 我敢說，\n  這事，你找不出任何藉口。']);
                            if (
                                world.edgy ||
                                (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                            ) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 他只是想拉你一把，\n  讓你迷途知返。',
                                    '<25>{#p/sans}{#f/3}* 你卻原形畢露，\n  把他撂倒。'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 他自始至終\n  從未想傷害你。',
                                    '<25>{#p/sans}{#f/3}* 你卻想直接要了他的命。'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 別想著裝傻。\n* 「他」是誰，你心知肚明。",
                                '<25>{#p/alphys}{#f/20}* 我也心知肚明。',
                                "<25>{#p/sans}{#f/3}* ...\n* 要是你能聽到我的留言...",
                                "<25>{#p/sans}{#f/0}* 希望你能知道\n  你給這裡帶來了\n  多少痛苦。",
                                '<25>{#p/sans}{#f/0}* asgore死了，undyne死了。\n* 守衛死了。\n* mettaton死了。',
                                '<25>{#p/sans}{#f/3}* ...我的心也死了。',
'<25>{#p/sans}{#f/3}* 掛電話吧。',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        }
                    } else if (SAVE.data.n.state_wastelands_toriel !== 0 && SAVE.data.n.kills_wastelands < 16) {
                        k = 'dark_mew'; // NO-TRANSLATE

                        m = music.gameshow;
                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/sans}{#f/0}* 你好呀。',
                            '<25>{#p/sans}{#f/4}* 喂，有人嗎？',
                            "<25>{#p/sans}{#f/2}* 沒人？\n* 那我就留個言吧。"
                        ]);
                        addB([
                            '<25>{#p/sans}{#f/0}* 在你走後，\n  壞事一件接一件。',
                            '<25>{#p/sans}{#f/3}* asgore死了，\n  undyne死了...',
                            '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的計畫\n  讓核心陷入停擺。',
                            '<25>{#p/sans}{#f/3}* 能量供應失控，\n  許多民眾因此喪命。',
                            '<25>{#p/sans}{#f/3}* 連「檔案」裡的人類\n  都沒能倖免於難。',
'<25>{#p/sans}{#f/3}* 容器遭受電擊，\n  他們當場喪命。',
                            '<25>{#p/sans}{#f/0}* 簡單講講後續。',
'<25>{#p/sans}{#f/0}* 我和alphys把靈魂\n  轉移到安全的地方。',
                            '<25>{#p/sans}{#f/3}* 容器防碎不防偷，\n  誰來看著靈魂呢？',
                            '<25>{#p/sans}{#f/0}* 思來想去...',
                            '<25>{#p/sans}{#f/0}* 唯一合適的人選...\n  是一位特戰隊退伍兵。',
                            '<25>{#p/sans}{#f/3}* 本來，\n  招它來是想幫點忙，\n  哪成想竟然「引狼入室」。',
                            '<25>{#p/sans}{#f/0}* 趁我們不在時...',
                            '<25>{#p/sans}{#f/3}* 它偷偷把靈魂都吸了。',
                            '<25>{#p/sans}{#f/3}* 藉助靈魂之力，它從人偶\n  變身為《喵喵星火》的\n  英雄喵喵。',
                            '<25>{#p/sans}{#f/0}* 《喵喵星火》可是\n  整個喵喵系列\n  最棒的電影。',
                            "<25>{#p/sans}{#f/2}* 我哪敢說它不好啊，\n  我可不想丟掉小命。",
                            '<25>{#p/sans}{#f/0}* 總之，你看。\n* 我們的生活是多麼幸福啊！',
                            '<25>{#p/sans}{#f/0}* 人們根本不用工作，\n  只要自願地玩耍。',
                            "<25>{#p/sans}{#f/0}* 沒有剝削，沒有壓迫。\n* ...一切都是「自願」的。",
                            '<25>{#p/sans}{#f/3}* 連遊戲也是公平的，\n  絕對公平。',
                            "<25>{#p/sans}{#f/0}* 這話千真萬確，\n  就是真理。",
                            "<25>{#p/sans}{#f/0}* 就算喵喵想讓遊戲\n  不公平...",
                            "<25>{#p/sans}{#f/3}* 也有一股力量...",
                            "<25>{#p/sans}{#f/3}* 一股在她體內，\n  無形的力量去阻止她。",
                            '<25>{#p/sans}{#f/0}* 她會猶豫，會退縮。\n* 最終，一切重回正軌。',
                            '<25>{#p/sans}{#f/0}* 有一次...',
                            "<25>{#p/sans}{#f/3}* 喵喵叫我們玩個「決鬥遊戲」。\n  相互決鬥，揍死出局，\n  沒死就繼續打，打死為止。",
                            '<25>{#p/sans}{#f/0}* 但是...\n* 比賽前夕，喵喵突然\n  改了主意。',
                            '<25>{#p/sans}{#f/3}* 不用非得打死，\n  只要打到失去知覺，\n  就能出局。',
                            '<25>{#p/sans}{#f/3}* 所以，我想...',
                            "<25>{#p/sans}{#f/2}* 除了野心和力量，\n  人類靈魂還給了她\n  某種「別的東西」。",
                            '<25>{#p/sans}{#f/0}* 也許... 那些人類靈魂\n  並未徹底沉睡？',
                            "<25>{#p/alphys}{#f/17}* 呃，打個岔，\n  到你了。",
                            '<25>{#p/sans}{#f/0}* 啥？',
                            "<25>{#p/alphys}{#f/18}* 該你上場決鬥了！",
                            '<25>{#p/sans}{#f/3}* ...行。',
                            
                            '<25>{#p/sans}{#f/0}* 看來不能拖了。',
                            '<25>{#p/alphys}{#f/6}* 還是早點出發吧。',
                            '<25>{#p/alphys}{#f/23}* 大夥都等著你呢。',
                            '<25>{#p/sans}{#f/0}* 走之前，還有一件事。',
                            '<25>{#p/sans}{#f/0}* 收到訊息的話，\n  告訴其他人類...',
                            '<25>{#p/sans}{#f/3}* 不要靠近這裡！',
                            "<25>{#p/sans}{#f/3}* 我有預感，\n  「喵喵」正在準備一場\n  恐怖行動。",
                            '<25>{#p/sans}{#f/0}* 她要是得逞，\n  整個星系都會遭殃。',
                            "<25>{#p/sans}{#f/2}* ...只是提醒一下。",
                            "<25>{#p/alphys}{#f/23}* 快點，走啦！",
                            "<25>{#p/sans}{#f/0}* 出發。",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    } else {
                        k = 'dark_charles'; // NO-TRANSLATE

                        m = music.letsmakeabombwhydontwe;
                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/sans}{#f/0}* 你好呀。',
                            '<25>{#p/sans}{#f/4}* 喂，有人嗎？',
                            "<25>{#p/sans}{#f/2}* 沒人？\n* 那我就留個言吧。"
                        ]);
                        addB([
                            "<25>{#p/sans}{#f/0}* 在你走後，一開始，\n  這裡還不是「天堂」。",
                            '<25>{#p/sans}{#f/3}* asgore死了，\n  undyne死了...',
                            '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的計畫\n  讓核心陷入停擺。',
                            '<25>{#p/sans}{#f/3}* 能量供應失控，\n  許多民眾因此喪命。',
                            '<25>{#p/sans}{#f/3}* 連「檔案」裡的人類\n  都沒能倖免於難。',
'<25>{#p/sans}{#f/3}* 容器遭受電擊，\n  他們當場喪命。',
                            '<25>{#p/sans}{#f/0}* 簡單講講後續。',
'<25>{#p/sans}{#f/0}* 我和alphys把靈魂\n  轉移到安全的地方。',
                            '<25>{#p/sans}{#f/4}* 容器防碎不防偷，\n  誰來看著靈魂呢？',
                            '<25>{#p/sans}{#f/0}* 我們狂打電話，\n  結果，只有某隻小老鼠\n  接下了這活。',
                            '<25>{#p/sans}{#f/2}* 老鼠名叫charles，是核心員工。\n* 工作這麼久，從沒出過錯。',
                            '<25>{#p/sans}{#f/0}* 結果...',
                            '<25>{#p/sans}{#f/0}* 成天在核心打工，\n  都染上職業病了。',
                            '<25>{#p/sans}{#f/0}* 每天，\n  拆電池，裝電池，\n  拆電池，裝電池...',
                            '<25>{#p/sans}{#f/3}* 只是這次電池\n  變成了人類靈魂。',
                            '<25>{#p/sans}{#f/0}* 結果自然是，\n  拆「人類靈魂」，\n  然後，裝「人類靈魂」。',
                            '<25>{#p/sans}{#f/3}* ...所以，charles肯定是\n  工作得太認真了，\n  才把靈魂裝到了自己身上。',
                            '<25>{#p/sans}{#f/3}* 哎呀哎呀，\n  你是不是在想...',
                            '<25>{#p/sans}{#f/0}* 「太慘了！」\n* 「沒了靈魂，咋逃出去呢？」',
                            '<25>{#p/sans}{#f/0}* 可我們為什麼要逃出去呢？',
                            "<25>{#p/sans}{#f/2}* charles就是神，\n  有了神的幫助，\n  我們想要啥，就有啥。",
                            '<18>{#p/papyrus}{#f/0}你好，人類！\n是我，偉大的PAPYRUS！',
                            '<18>{#p/papyrus}{#f/6}你不會以為，\n我死了吧？！',
                            "<18>{#p/papyrus}{#f/7}...呸，真是扯淡！\n我可是長生不老的\nPAPYRUS！",
                            '<18>{#p/papyrus}{#f/4}尊敬的CHARLES陛下\n又把我帶回來了！',
                            '<18>{#p/papyrus}{#f/9}陛下真是\n太偉大了！！！',
                            "<25>{#p/sans}{#f/3}* ...你瞧，我們多幸福啊！\n* 這麼快樂的世界，\n  怎麼可能有苦難呢？",
                            '<25>{#p/sans}{#f/2}* 誰還稀罕離開前哨站呢？',
                            "<18>{#p/papyrus}{#f/0}對啊，幹嘛要離開呢？\n幾顆破星星，\n有啥好看的呢？！",
                            "<18>{#p/papyrus}{#f/9}這裡就是天堂！\n就是極樂世界！\n去哪都比不上這裡快樂！",
                            '<25>{#p/sans}{#f/2}* 太對了。',
                            '<25>{#p/sans}{#f/0}* ...總之，\n  謝謝你，讓這裡變成天堂。',
                            '<25>{#p/sans}{#f/0}* 要是在外面飛累了...',
                            "<25>{#p/sans}{#f/3}* 這裡就是你的家。",
                            '<18>{#p/papyrus}{#f/0}對呀！快來這裡\n體驗極樂生活吧！\n簡直爽死了！',
                            '<25>{#p/sans}{#f/2}* 嘿。\n* 但願吧。',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else {
                    
                    k = 'dark_generic'; // NO-TRANSLATE

                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/sans}{#f/0}* 你好呀。',
                        "<25>{#p/sans}{#f/3}* 近況可好？"
                    ]);
                    addB([
                        '<25>{#p/sans}{#f/0}* 在你走後，\n  alphys... 嚇得不輕。',
                        '<25>{#p/sans}{#f/0}* asgore死了，\n  undyne死了...',
                        '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的計畫\n  讓核心陷入停擺。',
                        "<26>{#p/sans}{#f/3}* 好在，\n  皇家衛隊火速趕往總控室，\n  穩住了核心。",
                        '<25>{#p/sans}{#f/0}* 與此同時，\n  alphys給我打了電話，\n  讓我一起幫忙。',
                        "<25>{#p/sans}{#f/3}* 我趕了過去。\n* 那時，她的精神很不穩定。",
                        '<25>{#p/sans}{#f/0}* 但我相信，\n  她肯定能挺過去的。',
                        '<25>{#p/sans}{#f/2}* 畢竟我倆之前可是研究搭檔，\n  我了解她。',
                        '<25>{#p/sans}{#f/0}* 所以，我坐在她身旁陪伴她。\n* 發生這些事，\n  她也需要時間慢慢恢復。',
                        "<26>{#p/sans}{#f/3}* 最終，她振作起來。\n  接任了asgore的王位。",
                        '<25>{#p/sans}{#f/0}* ...漸漸地，\n  風波平息了下來。',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Sans，我倆想去遊泳，\n  可以陪我們去嗎？',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* 你要是忙，\n  我倆自己去也行...",
                        "<25>{#p/sans}{#f/0}* 哇喔，\n  今天你倆挺興奮嘛。",
                        "<25>{#p/sans}{#f/3}* 好呀。\n* 等我打完電話，咱們就出發。",
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* 說話算話喔。',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* 好耶！',
                        '<25>{#p/alphys}{#f/10}* 啊，對-對不起...',
                        '<25>{#p/alphys}{#f/20}* 我一會...\n  得去皇家防衛署開個會，\n  讓Sans叔叔陪你們玩吧。',
                        "<25>{#p/alphys}{#f/6}* 孩子們，過來，\n  別打擾他打電話喔。",
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* 好的。',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Sans，對不起，\n  影響你打電話了...",
                        "<25>{#p/sans}{#f/2}* 嘿。別上火嘛。\n* 再過億小會，我就打完了。",
                        '<25>{#p/sans}{#f/0}* ...',
                        '<25>{#p/sans}{#f/0}* alphys當上女王后，\n  制定了一些改革政策。',
                        '<25>{#p/sans}{#f/0}* 比如，解散皇家衛隊。\n  重組為「皇家防衛署」。',
                        '<25>{#p/sans}{#f/0}* 相比皇家衛隊，\n  防衛署不再「唯武力」論，\n  而是更注重使用科技。',
                        "<25>{#p/sans}{#f/3}* 有的成員配備了新型面罩，\n  有的配備了長程追蹤儀...",
                        '<25>{#p/sans}{#f/2}* 有了這些裝備，就能\n  第一時間發現墜落的孩子，\n  將其安全護送到首塔。'
                    ]);
                    if (!dpapyrus) {
                        addB([
                            "<25>{#p/sans}{#f/0}* 有趣的是，連papyrus\n  都是防衛署的一員。",
                            "<25>{#p/sans}{#f/3}* 他領導著一個小分隊，\n  專門照顧那幾個..."
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* 而原皇家衛隊的隊員們...',
                            '<25>{#p/sans}{#f/3}* 則組建起一支小分隊，\n  專門照顧那幾個...'
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/3}* ...最鬧騰的孩子。',
                        '<26>{#p/sans}{#f/0}* 現在聊聊你。',
'<26>{#p/sans}{#f/0}* 你在前哨站的這段時間，\n  我們搜集到不少\n  有價值的數據。',
                        "<25>{#p/sans}{#f/0}* 防衛署分配了專人，\n  每天分析你的數據。",
                        '<25>{#p/sans}{#f/3}* 這樣，怪物們就能\n  了解這類人的行事風格，\n  從而挖掘其弱點。',
                        "<25>{#p/sans}{#f/2}* 我們希望，\n  永遠都不會用上這些數據。",
                        '<25>{#p/sans}{#f/0}* 但... 就怕萬一。'
                    ]);
                    if (!dpapyrus) {
                        addB([
                            '<18>{#p/papyrus}{#f/0}嘿，SANS！\n最近忙啥呢？',
                            '<26>{#p/sans}{#f/3}* 呃，沒啥。',
                            '<26>{#p/sans}{#f/0}* 你來休息嗎？',
                            '<18>{#p/papyrus}{#f/9}當然了！',
                            "<18>{#p/papyrus}{#f/5}PAPYRUS的休息時間\n非常有限...",
                            '<18>{#p/papyrus}{#f/0}所以，我想珍惜這些\n休息時光。',
                            '<26>{#p/sans}{#f/3}* 嗯...',
                            '<25>{#p/sans}{#f/2}* 是不是alphys讓你休息的？',
                            '<18>{#p/papyrus}{#f/4}...',
                            "<18>{#p/papyrus}{#f/4}她強迫我休息，\n我也沒辦法啊。",
                            '<18>{#p/papyrus}{#f/0}好，\n休息時間結束。',
                            '<18>{#p/papyrus}{#f/9}回去繼續工作！',
                            '<25>{#p/sans}{#f/0}* 啊？\n* 兄弟，再待一會唄。\n  好不容易來一次。',
                            '<18>{#p/papyrus}{#f/6}再浪費時間，\n我就要錯過\n下一個人類了！！',
                            "<25>{#p/sans}{#f/3}* ...嗯，也是。",
                            "<25>{#p/sans}{#f/0}* 只是，別把自己搞太累了。"
                        ]);
                    }
                    addB(['<25>{#p/sans}{#f/0}* ...']);
                    if (!dtoriel) {
                        if (!dpapyrus) {
                            addB([
                                '<25>{#p/sans}{#f/3}* 而最近，\n  alphys終於閒了下來。',
                                '<25>{#p/sans}{#f/0}* 王后重新上任，\n  幫忙一起照顧那些孩子。',
                                
                            ]);
                        } else {
                            addB([
                                '<25>{#p/sans}{#f/3}* 最起碼，跟你比起來，\n  那幾個孩子都挺酷的。',
                                '<25>{#p/sans}{#f/0}* 呵。\n* 王后重新上任後，\n  還幫忙一起照顧他們呢。',
                                
                            ]);
                        }
                        addB([
                            '<25>{#p/sans}{#f/3}* 至今，王后還是沒能原諒\n  asgore...',
                            "<25>{#p/sans}{#f/0}* 也許假以時日，\n  矛盾會最終解開。",
                            "<25>{#p/sans}{#f/0}* 但我知道...",
                            "<25>{#p/sans}{#f/3}* 有個人，\n  她這輩子都不會原諒。"
                        ]);
                    } else {
                        if (!dpapyrus) {
                            addB(["<25>{#p/sans}{#f/3}* 最起碼，他很開心，\n  幹起活了，他能樂在其中。"]);
                            if (hkills > 19) {
                                addB(['<25>{#p/sans}{#f/0}* 但很多怪物可沒有\n  他的福分。']);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 但不少怪物可沒有\n  他的福分。']);
                            }
                        } else {
                            addB(["<25>{#p/sans}{#f/3}* 你知道嗎？\n* 在這裡活著\n  越來越孤獨了。"]);
                            if (hkills > 19) {
                                addB(['<25>{#p/sans}{#f/0}* 不只是我，\n  很多很多人，都非常孤獨。']);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 不是誰都有福分\n  家庭圓滿，正常生活。'
                                ]);
                            }
                        }
                    }
                    addB([
                        "<25>{#p/alphys}{#f/20}* S-sans，對不起。\n* 你趕緊帶孩子們去遊泳吧。",
                        "<25>{#p/alphys}{#f/3}* 這些孩子都快把我\n  折磨瘋了。",
                        '<25>{#p/sans}{#f/3}* 那...',
                        "<25>{#p/sans}{#f/0}* 剩下的話，就讓alphys說吧。",
                        '<25>{#p/alphys}{#f/27}* 剩下的話？\n  誰啊？',
                        '<25>{#p/alphys}{#f/21}* ...',
                        "<25>{#p/alphys}{#f/21}* 原來是你。",
                        '<25>{#p/alphys}{#f/24}* 嗯。\n* 之前Sans說想給你打通電話。',
                        "<25>{#p/alphys}{#f/25}* 但我跟你可沒啥好說的。"
                    ]);
                    if (hkills > 19) {
                        addB(["<25>{#p/alphys}{#f/25}* 你個殺人狂，\n  你個懦夫，\n  早點死得了。"]);
                        if (!dpapyrus) {
                            addB(['<25>{#p/alphys}{#f/24}* 就算你做了點好事...']);
                        } else {
                            addB(['<25>{#p/alphys}{#f/24}* 而且你差勁到...']);
                        }
                    } else {
                        addB(["<25>{#p/alphys}{#f/25}* 誠然，你沒殺多少人，\n  但我還是煩你。"]);
                        if (!dpapyrus) {
                            addB(['<25>{#p/alphys}{#f/24}* 誠然，你確實做了點好事...']);
                        } else {
                            addB(['<25>{#p/alphys}{#f/24}* 最差勁的是，你還...']);
                        }
                    }
                    if (!dpapyrus) {
                        addB([
                            "<25>{#p/alphys}{#f/25}* 但也不夠贖罪的。",
                            '<25>{#p/alphys}{#f/24}* ...',
                            '<25>{#p/alphys}{#f/24}* 謹代表前哨站所有居民...'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/25}* 把我摯友的親兄弟殺了。',
                            '<25>{#p/alphys}{#f/24}* ...',
                            '<25>{#p/alphys}{#f/24}* 就讓我代他...'
                        ]);
                    }
                    addB([
                        '<25>{#p/alphys}{#f/16}* 衷心祝願你，\n  掉進黑洞，死無全屍！',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                }
            } else if (SAVE.data.b.ubershortcut || world.bad_lizard > 1) {
                k = 'dark_aborted'; // NO-TRANSLATE

                
                if (dmettaton) {
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<32>{#p/napstablook}* 嘿',
                        '<32>{#p/napstablook}* 有人接嗎？',
                        "<32>{#p/napstablook}* 我...\n  想告訴你點事。",
                        "<32>{#p/napstablook}* 希望你不要介意。"
                    ]);
                    addB([
                        '<32>{#p/napstablook}* 把時間倒回到\n  你沒離開時...',
                        '<32>{#p/napstablook}* 那時，\n  情況就不容樂觀',
                        '<32>{#p/napstablook}* 人們死的死，傷的傷...\n  沒受傷的，也嚇得不輕...',
                        '<32>{#p/napstablook}* 很快，mettaton也在\n  壓軸大戲中喪了命......',
                        "<32>{#p/napstablook}* 我卻.........\n* 我卻無能為力",
                        '<32>{#p/napstablook}* 那時...\n  我感覺天都塌了......',
                        '<32>{#p/napstablook}* 可我什麼都做不了........\n  只能眼睜睜地看著他\n  死去............',
                        '<32>{#p/napstablook}* ...............',
                        '<32>{#p/napstablook}* 不只是我。\n* 很多人，眼睜睜地看著mettaton死，\n  都十分難受。',
                        '<32>{#p/napstablook}* 於是，身為mettaton的粉絲，\n  我們聯合起來，成立了一個組織。\n  一起為mettaton而戰。',
                        '<32>{#p/napstablook}* 記得他最後說的話嗎？',
                        '<32>{#p/napstablook}* 「躲得了初一，躲不過十五！」',
                        '<32>{#p/napstablook}* ...他錯了。',
                        '<32>{#p/napstablook}* 殺了那麼多人，\n  最終還是讓你逃了，\n  毫髮無損地逃了。',
                        "<32>{#p/napstablook}* 連asgore國王\n  都沒弄死你。",
                        "<32>{#p/napstablook}* mettaton失敗了...\n* 但他的遺言\n  卻沒有被遺忘。",
                        '<32>{#p/napstablook}* 我們把他的話記在心裡，\n  化悲憤為力量，團結一心。\n* 誓死要讓你付出代價。',
                        "<32>{#p/napstablook}* 休想拿「我只是調皮搗蛋」\n  這種話搪塞過去。\n* 你犯下的，是滔天罪行。",
                        "<32>{#p/napstablook}* 你侵略前哨站，大肆屠殺，\n  破壞我們的正常生活，\n  讓怪物如墮地獄。"
                    ]);
                    if (!dundyne) {
                        addB([
                            '<32>{#p/napstablook}* 新女王undyne\n  十分支援我們。',
                            '<32>{#p/napstablook}* ...asgore死後，\n  她便繼承了王位。',
                            "<32>{#p/napstablook}* 雖然她不怎麼喜歡mettaton...",
                            '<32>{#p/napstablook}* 但那句「躲不過十五」，\n  讓她產生了共鳴。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                '<32>{#p/napstablook}* 呵......\n  那時，toriel走出外域，\n  求undyne放你一馬...',
                                '<32>{#p/napstablook}* 結果，被undyne狠狠笑話一通，\n  趕回了外域。',
'<32>{#p/napstablook}* 回去的路上，undyne就帶領民眾，\n  緊跟在後面嘲諷她，\n  一直笑話到她走回外域。',
                                '<32>{#p/napstablook}* ...因為對你的憎恨，\n  人們變得越來越團結。'
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* 不只是她，\n  很多人，都產生了共鳴。']);
                        }
                    } else if (!dtoriel) {
                        addB([
                            '<32>{#p/napstablook}* 可是，王后toriel\n  不太支援我們。',
                            '<32>{#p/napstablook}* ...asgore死後，\n  她便繼承了王位。',
                            "<32>{#p/napstablook}* 她認同mettaton的話...",
                            '<32>{#p/napstablook}* 但她仍固執認為，\n  怪物應該與人類和平相處。',
                            "<32>{#p/napstablook}* .........\n* 無所謂。",
                            "<32>{#p/napstablook}* 她再怎麼阻止，\n  我們還是會聯合起來，\n  幹掉你。"
                        ]);
                    } else {
                        addB([
                            '<32>{#p/napstablook}* 我們發現，\n  asgore一死，王位空缺。\n  前哨站沒人管理了',
                            '<32>{#p/napstablook}* 所以...... 有人提議：\n  前哨站由我們來統治。',
                            '<32>{#p/napstablook}* 身為「反人類團體」的頭號人物，\n  我被推舉為前哨站新領導人...',
                            '<32>{#p/napstablook}* 雖然說我「領導」著前哨站，\n  但其實遇到大大小小的事，\n  都是大家一起商量，一起解決。',
                            "<32>{#p/napstablook}* 這制度挺棒的。",
                            '<32>{#p/napstablook}* 雖然身邊的人一多，\n  我還不太習慣......',
                            '<32>{#p/napstablook}* 但好在，大家群策群力，\n  統治前哨站也沒那麼累了。'
                        ]);
                    }
                    addB([
                        '<32>{#p/napstablook}* 總之......',
                        "<32>{#p/napstablook}* 我打電話來，\n  就是想告訴你：\n* 我過的很好。",
                        '<32>{#p/napstablook}* 過得非常好。',
                        "<32>{#p/napstablook}* 我們不會因為你殺人...\n  就怕你。",
                        '<32>{#p/napstablook}* 你越打擊我們，\n  我們就越敢還手。',
                        '<32>{#p/napstablook}* 終有一天...\n  我們會打破力場，\n  逃出前哨站......',
                        '<32>{#p/napstablook}* .........',
                        "<32>{#p/napstablook}* 到那時，你就算跑到天涯海角，\n  我們也會把你揪出來，\n  讓你血債血償。",
                        '<32>{#p/napstablook}* 呵呵呵......',
                        '<32>{#p/napstablook}* ......\n* 你不得好死。',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                } else {
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<32>{#p/mettaton}* 人類，耽擱你幾分鐘...',
                        "<32>{#p/mettaton}* 想和你說點事情。",
                        '<32>{#p/mettaton}* 喂？能聽到嗎？',
                        "<32>{#p/mettaton}* ...算了，\n  那我留個言吧。"
                    ]);
                    if (SAVE.data.b.ubershortcut) {
                        addB([
                            "<32>{#p/mettaton}* 首先，我得好好表揚一下你。",
                            '<32>{#p/mettaton}* 你聽了ALPHYS的勸，\n  走捷逕到了空境，\n  成功避開了UNDYNE。',
                            '<32>{#p/mettaton}* 也給我倆省了不少麻煩。'
                        ]);
                    } else if (royals < 4 && hkills > 19) {
                        addB([
                            "<32>{#p/mettaton}* 讓我說你點啥好呢...",
                            '<32>{#p/mettaton}* 殺了守衛還沒完，\n  又殺害平民百姓...',
                            '<32>{#p/mettaton}* 你恬不知恥，濫殺無辜。',
                            '<32>{#p/mettaton}* 雖然你後來\n  「確實」老實多了...'
                        ]);
                    } else if (royals < 4) {
                        addB([
                            "<32>{#p/mettaton}* 那我就直奔主題吧。",
                            '<32>{#p/mettaton}* 你「大肆」屠殺那些皇家守衛，\n  不過... 對平民還算手軟。',
                            
                            '<32>{#p/mettaton}* 而且，後來你也聽了勸，\n  老實多了...'
                        ]);
                    } else if (hkills > 19) {
                        addB([
                            "<32>{#p/mettaton}* 那我就直奔主題吧。",
                            '<32>{#p/mettaton}* 你心狠手辣，濫殺無辜...\n* 反倒見了皇家守衛，\n  收斂起來了。',
                            
                            '<32>{#p/mettaton}* 而且，後來你也聽了勸，\n  老實多了...'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/mettaton}* 一開始，我對你沒啥好感。\n* 結果，你表現還不錯。",
                            '<32>{#p/mettaton}* 不光饒了不少守衛，\n  也沒濫殺無辜百姓。',
                            '<32>{#p/mettaton}* 更不用說，\n  你聽了我的勸，\n  在空境非常老實。'
                        ]);
                    }
                    addB(["<32>{#p/mettaton}* 但別覺得我誇你兩句，\n  之前的帳就能一筆勾銷。"]);
                    if (SAVE.data.b.ubershortcut) {
                        addB([
                            '<32>{#p/mettaton}* 在你走後，ASGORE失蹤了。\n* 王位空虛，ALPHYS便接下重擔，\n  繼承王位。',
                            '<32>{#p/mettaton}* 一開始，我還挺意外...',
                            '<32>{#p/mettaton}* 但轉念一想，\n  她一路把送你到了首塔...\n  把膽量和自信都鍛鍊出來了。',
                            "<32>{#p/mettaton}* 雖然當上了女王，\n  但ALPHYS過得並不好。",
                            "<32>{#p/mettaton}* 因為偷著把你送走，\n  UNDYNE都氣瘋了。",
                            '<32>{#p/mettaton}* 這位大隊長\n  先是不停質問ALPHYS，\n  罵她背信棄義。',
'<32>{#p/mettaton}* 接著，又疏遠了她。',
                            '<32>{#p/mettaton}* 雖然ALPHYS還相信你，\n  覺得你有救...\n  但其他民眾可不這麼想。',
                            '<32>{#p/mettaton}* 出了這些事，\n  他們只想把人類統統殺光。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/mettaton}* 過了一陣，TORIEL回歸了。\n* 可她根本勸不動\n  這些怪物。",
                                '<32>{#p/mettaton}* 最終，ALPHYS也心灰意冷，\n  放棄了王位。'
                            ]);
                        }
                    } else if (!dundyne) {
                        addB([
                            '<32>{#p/mettaton}* 在你走後，ASGORE失蹤了。\n* 王位空虛，UNDYNE就趁機\n  當上女王，一手遮天。',
                            '<32>{#p/mettaton}* ALPHYS呢？\n* 本來最適合繼承王位的人\n  就是她... 可她卻逃跑了。',
                            "<32>{#p/mettaton}* 說實話，我不怪她。",
                            '<32>{#p/mettaton}* 許多怪物只想把人類\n  統統殺光。',
'<32>{#p/mettaton}* 說實話，出了這些事，\n  換誰誰這麼想。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/mettaton}* 過了一陣，TORIEL回歸了。\n* 可她根本勸不動\n  這些怪物。",
                                "<32>{#p/mettaton}* 更別說勸UNDYNE了。"
                            ]);
                        }
                    } else if (!dtoriel) {
                        addB([
                            '<32>{#p/mettaton}* 在你走後，ASGORE失蹤了。\n* 王位空虛，TORIEL便接下重擔，\n  回歸了王位。',
                            '<32>{#p/mettaton}* ALPHYS呢？\n* 本來最適合繼承王位的人\n  就是她... 可她卻逃跑了。',
                            "<32>{#p/mettaton}* 說實話，我不怪她。",
                            '<32>{#p/mettaton}* 許多怪物只想把人類\n  統統殺光。',
'<32>{#p/mettaton}* 說實話，出了這些事，\n  換誰誰這麼想。',
                            "<32>{#p/mettaton}* 那些怪物都跟著了魔一樣，\n  TORIEL怎麼勸，都勸不動。"
                        ]);
                    } else {
                        addB([
                            '<32>{#p/mettaton}* 在你走後，ASGORE失蹤了。\n* 這裡的境況也越來越糟。',
                            '<32>{#p/mettaton}* ALPHYS呢？\n* 本來最適合繼承王位的人\n  就是她... 可她卻逃跑了。',
                            '<32>{#p/mettaton}* 覺得我會罵她，\n  說她膽小鬼？\n* 想多了。',
                            '<32>{#p/mettaton}* 不過她一走，\n  王位不能就這麼空著，\n  只能我來當王了。',
                            '<32>{#p/mettaton}* 後來，我發現了「檔案」。\n* 看到裡面的人類時，\n  我心裡五味雜陳...',
                            '<32>{#p/mettaton}* 但民眾可不這麼想。\n* 他們只看到了你，\n  他們只想讓人類都死光。'
                        ]);
                    }
                    addB([
                        "<32>{#p/mettaton}* 我很喜歡人類，\n  也很願意相信人類...",
                        "<32>{#p/mettaton}* 可是，總有像你這樣的人，\n  不值得信任。",
                        "<32>{#p/mettaton}* 人類和怪物之間\n  本來犯不著有那些衝突...",
                        "<32>{#p/mettaton}* 生活在同一片天地，\n  彼此和平共處，不好嗎？",
                        '<32>{#p/mettaton}* 可是...\n  現實哪有童話那麼美好。',
                        "<32>{#p/mettaton}* 真是可悲啊，\n  就算「人類」再善良...",
                        '<32>{#p/mettaton}* 可裡面總有幾個敗類，\n  一顆老鼠屎，壞了一鍋粥。',
                        '<32>{#p/napstablook}* 呃...\n* mettaton？',
                        '<32>{#p/napstablook}* 你還好嗎？',
                        '<32>{#p/mettaton}* ...\n* 你說呢？',
                        '<32>{#p/napstablook}* .........',
                        '<32>{#p/napstablook}* 你在給誰打電話？',
                        "<32>{#p/mettaton}* 和你沒關係，BLOOKY。",
                        '<32>{#p/napstablook}* 我猜猜......',
                        '<32>{#p/napstablook}* ...\n* 知道了...',
                        '<32>{#p/napstablook}* 嘿...\n* 呃，你傷了我表親的心',
                        '<32>{#p/napstablook}* 一次巧合，我發現mettaton\n  原來是我的表親...',
'<32>{#p/napstablook}* alphys逃走了，\n  我就開始照顧他。'
                    ]);
                    if (SAVE.data.b.ubershortcut || !dundyne || !dtoriel) {
                        addB(['<32>{#p/napstablook}* 雖然最後你也回心轉意了，\n  可是因為你......']);
                    } else {
                        addB(['<32>{#p/napstablook}* 其他人類根本沒做錯什麼，\n  可是因為你......']);
                    }
                    addB([
                        "<32>{#p/napstablook}* mettaton這兩天氣得不行",
                        "<32>{#p/napstablook}* 我看他那樣......\n  好擔心",
                        "<32>{#p/mettaton}* 咋的？\n* 死了那麼多人，我還得強忍著，\n  當沒事人一樣嗎？",
                        '<32>{#p/mettaton}* 怪物死了，就剩一堆灰，\n  啥也沒有了。',
                        '<32>{#p/mettaton}* 他們的親人再怎麼哭，\n  怎麼喊，\n  能把死者復活嗎？',
                        "<32>{#p/mettaton}* 我特麼要是還能當沒事人一樣，\n  心得有多大？",
                        '<32>{#p/napstablook}* 呃...\n  人類，我告訴你...',
                        '<32>{#p/napstablook}* ......\n* 你不得好死。',
                        '<32>{#p/mettaton}* B... BLOOKY，\n  別這樣...',
                        "<32>{#p/mettaton}* 別為了給我出氣，\n  就逼自己。",
                        "<32>{#p/mettaton}* 我認識的BLOOKY\n  才不會用這種口氣說話，\n  對吧？",
                        "<32>{#p/napstablook}* ......\n* ......我.......",
                        "<36>{#p/mettaton}* 你想讓我開心點，我很高興。\n* 可這事跟你沒啥關係，\n  別惹自己不愉快。",
                        '<32>{#p/napstablook}* mettaton...',
                        '<32>{#p/napstablook}* 要是你也被人類殺了......',
                        "<32>{#p/napstablook}* 我...\n  不知道怎麼辦",
                        "<32>{#p/napstablook}* 嗯...... 說完了",
                        '<32>{#p/mettaton}* ...\n* ...我去。',
                        "<32>{#p/mettaton}* 我覺得，\n  還是現在掛電話吧。",
                        '<32>{#p/mettaton}* 本來還想跟你講講\n  我的家人...\n* 想想算了。',
                        '<32>{#p/mettaton}* 而且，用BLOOKY的話\n  總結你的「豐功偉績」，\n  也蠻合適的。',
                        '<32>{#p/mettaton}* ...',
                        '<32>{#p/mettaton}* 可悲...',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                }
            } else if (SAVE.data.b.ultrashortcut) {
                k = 'light_ultra'; // NO-TRANSLATE

                m = music.sansdate;
                
                addA([
                    '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                    '<25>{#p/sans}{#f/0}* 你好呀。',
                    '<25>{#p/sans}{#f/4}* 喂，有人嗎？',
                    "<25>{#p/sans}{#f/2}* 沒人？\n* 那我就留個言吧。"
                ]);
                addB([
                    '<25>{#p/sans}{#f/0}* 讓我想想...\n  嘮點什麼呢？',
                    '<25>{#p/sans}{#f/3}* ...\n* 在你走後，事情變得...\n  越來越有趣了。',
                    "<25>{#p/sans}{#f/0}* 一開始，因為asgore的失蹤，\n  前哨站的百姓十分失落，\n  一蹶不振。"
                ]);
                if (dtoriel) {
                    addB(["<25>{#p/sans}{#f/3}* 噩耗一個接一個，\n  他們前腳剛得知asgore失蹤，\n  後腳又聽說前王后去世。"]);
                }
                addB([
                    '<25>{#p/sans}{#f/0}* 還好，在這種情況下，\n  大家推選了alphys繼任。',
                    '<25>{#p/sans}{#f/2}* 經歷這麼多，\n  她也沒那麼膽小怯懦了。',
                    '<25>{#p/sans}{#f/0}* 當時，局勢動蕩不安。\n  但她仍擔下了重任。'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/sans}{#f/3}* 因此...",
                        '<26>{#p/sans}{#f/0}* 儘管民眾還沒從之前\n  被揍的陰影裡走出來...\n* 但風波仍漸漸平息了。'
                    ]);
                } else {
                    addB(['<25>{#p/sans}{#f/0}* 有人領導這裡，\n  社會就不會停滯不前。']);
                }
                addB([
                    "<25>{#p/sans}{#f/0}* 自那時起，我就一直在幫她\n  出謀獻策。",
                    "<25>{#p/sans}{#f/3}* 有件事她一直拿不定主意：\n  是把人類的存在告訴大家，\n  還是繼續藏著掖著呢？"
                ]);
                if (royals < 6) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 最後，我們決定：\n  繼續保守秘密。',
                        '<25>{#p/sans}{#f/0}* 那些人類能獲得自由\n  固然是件好事。',
                        "<25>{#p/sans}{#f/3}* 可一想到那些死掉的狗狗...\n  現在放人就太魯莽了。",
                        "<25>{#p/sans}{#f/3}* 畢竟，現在\n  大家都挺反感人類的。"
                    ]);
                } else if (SAVE.data.n.exp > 0) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 目前，我們想\n  暫時保守這個秘密。',
                        "<25>{#p/sans}{#f/0}* 我們挺想給那些孩子\n  自由的。",
                        '<25>{#p/sans}{#f/3}* ...不過，\n  得等怪物們準備好才行。',
                        '<25>{#p/sans}{#f/0}* 現在，喜歡人類的居民挺多的，\n  但反感的也不少。'
                    ]);
                } else {
                    addB([
                        '<25>{#p/sans}{#f/0}* 剛開始，我們想再等等。',
                        '<25>{#p/sans}{#f/0}* 不過，從民眾的表現來看，\n  他們應該都準備好了。',
                        '<25>{#p/sans}{#f/3}* ...幸好，沒引起什麼騷動。',
                        '<25>{#p/sans}{#f/2}* 日子一天天過去，\n  怪物也越來越喜歡人類了。'
                    ]);
                }
                addB([
                    '<25>{#p/sans}{#f/0}* 總之，忙活了一通，\n  人類的事解決了。',
                    '<25>{#p/sans}{#f/0}* 我跟alphys\n  又開始著手策劃\n  皇家衛隊的改革方案。',
                    "<25>{#p/sans}{#f/3}* 因為...\n  我們倆都挺反感皇家衛隊\n  之前那套作風的。"
                ]);
                if (dtoriel) {
                    addB(['<25>{#p/sans}{#f/0}* 所以，\n  我們做了一些小改動。']);
                } else {
                    addB([
                        "<25>{#p/sans}{#f/0}* 在你走後不久，\n  前王后也回歸了。",
                        '<25>{#p/sans}{#f/0}* 她也很支援我們的改動。'
                    ]);
                }
                addB([
                    '<25>{#p/sans}{#f/2}* 猜猜看，我們首先改了啥。',
                    "<18>{#p/papyrus}{#f/9}捏嘿嘿！\n對，猜猜看！",
                    "<25>{#p/sans}{#f/0}* 喔，是papyrus呀。\n* 輪班工作感覺咋樣？",
                    "<18>{#p/papyrus}{#f/0}好得很！"
                ]);
                if (royals < 6) {
                    addB([
                        '<18>{#p/papyrus}{#f/5}說實話，工作時\n如果有狗狗作伴\n就好了。',
                        '<18>{#p/papyrus}{#f/6}可惜... 狗狗們\n估計也都去度假了。',
                        "<25>{#p/sans}{#f/3}* 嘿，沒事啦。",
                        "<25>{#p/sans}{#f/2}* 即使沒有狗狗，\n  你幹的也挺出色啊，\n  你說是不？"
                    ]);
                } else if (royals < 8) {
                    addB([
                        '<18>{#p/papyrus}{#f/5}說實話...\n那裡氣氛有點... 怪。',
                        "<18>{#p/papyrus}{#f/6}就好像死人了一樣。",
                        "<25>{#p/sans}{#f/3}* 嘿，沒事啦。",
                        "<25>{#p/sans}{#f/2}* 即使沒有狗狗，\n  你幹的也挺出色啊，\n  你說是不？"
                    ]);
                } else {
                    addB([
                        "<18>{#p/papyrus}{#f/5}身邊突然多了個骷髏，\nUNDYNE總感覺不習慣。\n過了好久，還是這樣...",
                        '<18>{#p/papyrus}{#f/0}但除此之外，一切都很好。',
                        '<25>{#p/sans}{#f/2}* 挺好的。'
                    ]);
                }
                addB([
                    "<18>{#p/papyrus}{#f/4}我一定會盡力而為。",
                    '<18>{#p/papyrus}{#f/9}畢竟，我可是\n真的抓了一個人類，\n才當上守衛的啊！',
                    "<18>{#p/papyrus}{#f/0}我可不會偷懶，\n更不會丟掉這份工作！",
                    '<25>{#p/sans}{#f/0}* 那可不。\n* 想保住飯碗，\n  就不能偷懶。',
                    "<18>{#p/papyrus}{#f/4}...我說你咋把\n飯碗丟了呢。",
                    '<18>{#p/papyrus}{#f/5}不過，\n你又得到了新工作，\n還幹得挺好。',
                    "<18>{#p/papyrus}{#f/0}那我就不「銳評」了。",
                    '<25>{#p/sans}{#f/0}* 多謝。\n* 給新女王出謀獻策\n  可辛苦了。',
                    '<25>{#p/sans}{#f/3}* 有時候，她有點「神經質」，\n  疑神疑鬼的。',
                    '<25>{#p/sans}{#f/3}* 而且，很多重要決策...\n  她都是一拍腦門想出來的。',
                    "<25>{#p/sans}{#f/0}* 這還沒完，mettaton\n  也來蹚這趟渾水，\n  跟著瞎攪和。",
                    "<18>{#p/papyrus}{#f/6}METTATON？！\n【他】跟著幹啥？",
                    '<25>{#p/sans}{#f/0}* 喔，在alphys當了王，\n  mettaton也想「沾點光」。',
                    "<25>{#p/sans}{#f/3}* 但是他...\n  就沒提過啥正經建議。",
                    '<25>{#p/sans}{#f/0}* 他只想把前哨站\n  變成一個娛樂中心。',
                    '<25>{#p/sans}{#f/0}* 好讓整個前哨站\n  都圍著他那些節目轉。',
                    "<25>{#p/sans}{#f/3}* 整的亂七八糟的，真糟心。",
                    '<18>{#p/papyrus}{#f/4}看來，得有人\n開導開導他了。',
                    "<25>{#p/sans}{#f/0}* 或許吧。\n* 喔對，你不就是\n  他的頭號粉絲嘛？",
                    "<18>{#p/papyrus}{#f/7}要是他幹擾你工作，\n我寧願不當他粉絲！",
                    "<18>{#p/papyrus}{#f/9}...失陪了。",
                    '<25>{#p/sans}{#f/0}* ...',
                    "<25>{#p/sans}{#f/3}* 我也得走了，\n  免得他闖什麼禍。",
                    '<25>{#p/sans}{#f/0}* 掛電話前...\n  還有兩句話想講給你。'
                ]);
                if (hkills > 9) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 雖然你殺害了不少怪物...',
                        '<25>{#p/sans}{#f/3}* 但最後，你能迷途知返，\n  做了正確的選擇。'
                    ]);
                } else if (30 <= SAVE.data.n.bully) {
                    if (SAVE.data.n.exp > 0) {
                        addB([
                            '<25>{#p/sans}{#f/0}* 雖然你傷害了不少怪物，\n  很多怪物也因你而死...',
                            '<25>{#p/sans}{#f/3}* 但最後，你能迷途知返，\n  做了正確的選擇。'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* 雖然你傷害了很多怪物...',
                            '<25>{#p/sans}{#f/3}* 但最後，你能迷途知返，\n  做了正確的選擇。'
                        ]);
                    }
                } else if (SAVE.data.n.exp > 0) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 雖然你也犯過小錯...',
                        "<25>{#p/sans}{#f/3}* 但你仍是個不錯的孩子。"
                    ]);
                } else {
                    addB([
                        '<25>{#p/sans}{#f/0}* 雖然仍有怪物不喜歡人類...',
                        '<25>{#p/sans}{#f/2}* 但大多數怪物，包括我，\n  都越來越喜歡和支援人類。\n* 這一切，都多虧了你。'
                    ]);
                }
                addB([
                    "<25>{#p/sans}{#f/0}* 所以，別擔心。",
                    '<25>{#p/sans}{#f/3}* 不管你那邊發生了什麼...',
                    '<25>{#p/sans}{#f/2}* 記住，我永遠支援你。',
                    '<25>{#p/sans}{#f/0}* ...\n* 照顧好自己，好嗎？',
                    '<25>{#p/sans}{#f/3}* ...',
                    "<25>{#p/sans}{#f/3}* 回見。",
                    '<32>{#s/equip}{#p/event}* 滴...'
                ]);
            } else if (SAVE.data.n.exp > 0 || SAVE.data.n.state_foundry_undyne === 1) {
                if (!dundyne) {
                    k = 'light_undyne'; // NO-TRANSLATE

                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/alphys}{#f/4}* 餵-餵...',
                        '<25>{#p/alphys}{#f/20}* 有人嗎？',
                        "<25>{#p/alphys}{#f/11}* ...這次打電話來，\n  只-只是想和你講講\n  最近發生的事...",
                        '<25>{#p/alphys}{#f/4}* 不-不會佔用你\n  太多時間的。'
                    ]);
                    addB([
                        '<25>{#p/alphys}{#f/20}* 在你走後...\n  國王就突然... 失蹤了。',
                        "<25>{#p/alphys}{#f/14}* 我把訊息告訴了民眾，\n  大家都非常難過。",
                        '<25>{#p/alphys}{#f/10}* 身為皇家科學員，\n  怪物們都認為\n  我是繼承王位的最佳人選。',
                        "<25>{#p/alphys}{#f/4}* 但我知道，\n  自己並不適合當統治者。"
                    ]);
                    if (dmettaton) {
                        addB(['<25>{#p/alphys}{#f/4}* 而且，\n  我害得Mettaton...']);
                    }
                    addB([
                        '<26>{#p/alphys}{#f/20}* 後來，Undyne找到我，\n  跟我說「她自己想當女王」...',
                        '<25>{#p/alphys}{#f/20}* 我同意了，\n  讓她順利地當上了女王。'
                    ]);
                    if (dpapyrus) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Papyrus的死...\n  會衝動幹傻事..."]);
                        if (royals < 2) {
                            addB(['<26>{#p/alphys}{#f/13}* ...更不用說，\n  因為你，皇家衛隊也\n  全軍覆沒了...']);
                        } else if (royals < 7) {
                            addB(['<26>{#p/alphys}{#f/13}* ...更不用說，\n  因為你，皇家衛隊也\n  死的死，傷的傷...']);
                        }
                    } else if (royals < 2) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心她受不了\n  皇家衛隊全軍覆沒...\n  會衝動幹傻事..."]);
                    } else if (royals < 7) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了皇家守衛的死...\n  會衝動幹傻事..."]);
                    } else if (ddoggo) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Doggo的死...\n  會衝動幹傻事..."]);
                    } else if (dlesserdog) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Canis Minor的死...\n  會衝動幹傻事..."]);
                    } else if (ddogs) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了狗夫婦的死...\n  會衝動幹傻事..."]);
                    } else if (dgreatdog) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Canis Major的死...\n  會衝動幹傻事..."]);
                    } else if (ddoge) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Doge的死...\n  會衝動幹傻事..."]);
                    } else if (droyalguards) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了三號、四號的死...\n  會衝動幹傻事..."]);
                    } else if (dmadjick) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Cozmo的死...\n  會衝動幹傻事..."]);
                    } else if (dknightknight) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Terrestria的死...\n  會衝動幹傻事..."]);
                    } else if (dtoriel) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了王后Toriel的死...\n  會衝動幹傻事..."]);
                    } else if (dmuffet) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了蜘蛛女王的死...\n  會衝動幹傻事..."]);
                    } else if (dmettaton) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了Mettaton的死...\n  會衝動幹傻事..."]);
                    } else if (hkills > 1) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了幾隻怪物的死...\n  會衝動幹傻事..."]);
                    } else {
                        addB(["<25>{#p/alphys}{#f/13}* ...一開始，我擔心\n  她受不了一隻怪物的死...\n  會衝動幹傻事..."]);
                    }
                    if (royals < 2) {
                        addB(['<25>{#p/alphys}{#f/17}* 還好，她沒瞎搞，\n  只是重建了皇家衛隊，\n  增強了武裝力量。']);
                    } else {
                        addB(["<25>{#p/alphys}{#f/17}* 還好，她沒瞎搞，\n  只是擴編了皇家衛隊，\n  加強了武裝力量。"]);
                    }
                    if (SAVE.data.b.undyne_respecc) {
                        addB(['<25>{#p/alphys}{#f/19}* 處理完衛隊的事，\n  她又發表演講，說人類\n  「就是一群卑鄙下流的敵人」。']);
                    } else if (2.1 <= SAVE.data.n.plot_date) {
                        addB(['<25>{#p/alphys}{#f/19}* 處理完衛隊的事，\n  她又發表演講，說人類\n  「就是一群背信棄義的叛徒」。']);
                    } else {
                        addB(['<25>{#p/alphys}{#f/19}* 處理完衛隊的事，\n  她又發表演講，說人類\n  「就是一群罪不可赦的殺人狂」。']);
                    }
                    if (royals < 6 || mdeaths > 9) {
                        addB(['<25>{#p/alphys}{#f/20}* 結果...\n  她靠著那次演講，\n  把民眾都拉攏到她那邊。']);
                        if (30 <= SAVE.data.n.bully) {
                            addB(["<25>{#p/alphys}{#f/26}* ...別以為你把他們揍老實了，\n  他們就心服口服。"]);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/5}* ...如今，怪物對人類\n  都愈發警惕。'
                            ]);
                        }
                    } else {
                        addB(['<25>{#p/alphys}{#f/20}* 一開始，大夥根本不信\n  她那一套理論...']);
                        if (30 <= SAVE.data.n.bully) {
                            addB(['<25>{#p/alphys}{#f/26}* ...緊接著，Undyne把你\n  揍他們的事拎了出來。',
'<25>{#p/alphys}{#f/26}* 結果...\n  民眾立馬變卦，紛紛支援她。']);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/20}* ...看他們不信，Undyne又說，\n  是你把ASGORE殺了。',
'<25>{#p/alphys}{#f/26}* 結果，\n  民眾立馬變卦，紛紛支援她。'
                            ]);
                        }
                    }
                    addB([
                        '<25>{#p/alphys}{#f/10}* 可前哨站還有其他的人類，\n  他們怎麼辦呢...？',
                        "<25>{#p/alphys}{#f/4}* 現在，民眾都信她那一套，\n  要是讓她發現這些人類...\n  就完蛋了。",
                        '<25>{#p/alphys}{#f/20}* 所以... 我把「檔案」轉移到\n  空境的一座高塔裡，\n  偷偷藏了起來。',
                        
                        '<25>{#p/alphys}{#f/5}* ...Undyne找了半天，\n  別說人類，連個人類靈魂\n  都沒找著。',
                        '<25>{#p/alphys}{#f/10}* 她以為，人類靈魂沒儲存好，\n  結果丟了。',
'<25>{#p/alphys}{#f/22}* 這還沒完呢！',
'<25>{#p/alphys}{#f/22}* 那條魚還想讓怪物全知道\n  「靈魂都沒啦！我們完蛋啦！」'
                    ]);
                    if (dtoriel) {
                        addB([
                            '<25>{#p/alphys}{#f/3}* 唉，我想找她，\n  求求她千萬別把\n  人類靈魂的事說出來...',
                            '<25>{#p/alphys}{#f/3}* ...可我啥也做不了！\n  她根本就不聽！',
                            "<25>{#p/alphys}{#f/30}* ...\n* 現在，所有怪物都認為\n  一切努力都白費了。"
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<25>{#p/alphys}{#f/31}* 民眾徹底失去了希望...\n  都覺得... 自己永遠都\n  逃不出這個牢籠了。",
                                '<25>{#p/alphys}{#f/31}* ...',
                                "<25>{#p/alphys}{#f/30}* 哀極生恨。\n* 他們惶惶不可終日，\n  氣得不行，卻又毫無辦法。",
                                "<25>{#p/alphys}{#f/31}* 我根本不敢把人類的秘密\n  告訴他們，\n* 但也不知道能藏多久。",
                                '<25>{#p/sans}{#f/0}* 嘿，咋又在裡頭\n  自言自語了？',
                                "<25>{#p/sans}{#f/3}* 出來散散心吧。\n  那些人類還等著咱們去做\n  每日檢查呢。",
                                '<25>{#p/alphys}{#f/20}* 呃...\n  你方便進來待一會嗎？',
                                '<25>{#p/sans}{#f/0}* 行，那我就進去了。',
                                
                                "<25>{#p/alphys}{#f/20}* 你看...\n  我根本沒自言自語...",
                                "<25>{#p/alphys}{#f/19}* 我現在正給那個人類\n  留言呢。",
                                '<25>{#p/sans}{#f/0}* 喔... 我說呢。',
                                '<25>{#p/sans}{#f/2}* 要不，你先去看一下\n  那些孩子，\n  我跟人類說幾句，咋樣？',
                                "<26>{#p/alphys}{#f/5}* 好，我-我現在就去。",
                                '<25>{#p/sans}{#f/3}* ...',
                                "<25>{#p/sans}{#f/0}* ...\n* alphys總喜歡打這樣的電話，\n  搞得她自己心神不定。",
                                '<25>{#p/sans}{#f/0}* 我不會佔用你太多時間的，\n  幫她掛斷電話，我就走。',
                                
                                '<25>{#p/sans}{#f/0}* 掛電話之前...\n  有件事想提一嘴。',
                                "<25>{#p/sans}{#f/0}* 壞事真的一件接一件，\n  前腳，民眾剛從undyne口中\n  知道人類靈魂都沒了...",
                                "<26>{#p/sans}{#f/3}* 後腳，他們又聽說\n  前王后也死了。",
                                '<25>{#p/sans}{#f/0}* 商店關門了，社會停擺了，\n  怪物們下崗的下崗、\n  辭職的辭職...',
                                "<25>{#p/sans}{#f/0}* 他們每天萎靡不振，\n  借酒澆愁，\n  過一天，算一天。",
                                "<25>{#p/sans}{#f/2}* ...這場大蕭條的最大受益者，\n  是grillby。\n* 他的店現在人滿為患。",
                                '<25>{#p/sans}{#f/3}* 可再多的零食，\n  再多的美味，\n  也沒法把「他」帶回來。',
                                '<26>{#p/sans}{#f/3}* ...你肯定知道我在說誰。',
                                '<26>{#p/sans}{#f/0}* ...',
                                "<25>{#p/sans}{#f/0}* 如今，怪物對人類都\n  恨之入骨。",
                                '<25>{#p/sans}{#f/0}* 如果下個人類到來，\n  我跟alphys會努力保護他...',
                                "<25>{#p/sans}{#f/3}* 即便如此，新人類\n  也很可能在半路上\n  就被怪物殺了。",
                                "<25>{#p/sans}{#f/0}* ...現實就是如此。",
                                '<25>{#p/alphys}{#f/27}* 呃，打擾一下...',
                                '<26>{#p/alphys}{#f/20}* 那些人類...\n  好-好像遇到麻煩了。',
                                '<25>{#p/sans}{#f/0}* 正好，\n  我也把想說的都說完了。',
                                "<25>{#p/sans}{#f/0}* 那我掛電話了。",
                                '<25>{#p/sans}{#f/3}* ...拜拜。',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        } else {
                            addB([
                                '<18>{#p/papyrus}{#f/0}只有咱們倆，\n還有SANS知道真相！',
                                '<25>{#p/alphys}{#f/27}* 喔，是Papyrus呀。\n* 看來，今天「檔案」也一切正常？',
                                '<18>{#p/papyrus}{#f/0}那必須滴！',
                                '<18>{#p/papyrus}{#f/9}我剛給人類做完\n每日體檢，一切正常！',
                                '<25>{#p/alphys}{#f/10}* 幹得好，辛苦了。',
                                "<25>{#p/alphys}{#f/10}* 對了...\n  我正給那人類留言呢。",
                                "<25>{#p/alphys}{#f/5}* 主要是給那孩子講講\n  這段時間發生了啥。\n* 你想聊兩句嗎？",
                                '<18>{#p/papyrus}{#f/0}喔，當然想了！',
                                "<18>{#p/papyrus}{#f/0}...人類，你好呀。\n過的還好吧？\n我相信肯定挺好的。",
                                "<18>{#p/papyrus}{#f/5}知道人類的事情，\n卻不能和任何人分享，\n真的挺煎熬的...",
                                "<18>{#p/papyrus}{#f/6}看著他們一個個\n都那麼難受，\n我真的於心不忍！！！",
                                "<18>{#p/papyrus}{#f/5}那些怪物們一想到\n自己要永遠困在這裡...",
                                '<18>{#p/papyrus}{#f/5}看不到未來，\n看不到希望...',
                                "<18>{#p/papyrus}{#f/0}不過！！\n一切都會好起來的！！",
                                "<18>{#p/papyrus}{#f/5}總有一天，\n我會把真相告訴他們...",
                                '<18>{#p/papyrus}{#f/0}讓他們知道，\n自由絕非遙不可及！',
                                "<25>{#p/alphys}{#f/8}* Papyrus，給人類講講\n  你的新工作吧。",
                                '<18>{#p/papyrus}{#f/0}啊對！！\n我咋把這事忘了呢！？',
                                '<18>{#p/papyrus}{#f/0}終於啊... UNDYNE同意\n讓我當皇家守衛了。',
                                "<18>{#p/papyrus}{#f/4}雖然吧，我幹的活\n本質上就是個啦啦隊員...",
                                '<18>{#p/papyrus}{#f/0}但別以為「啦啦隊隊員」\n就不重要！',
                                "<18>{#p/papyrus}{#f/5}試想一下...",
                                "<18>{#p/papyrus}{#f/5}如果一個守衛士氣低落...\n還怎麼把活幹好呢？",
                                "<18>{#p/papyrus}{#f/0}這時，就輪到我\n「見風使舵，見縫插針」了！",
                                '<18>{#p/papyrus}{#f/4}呃，只是一個比喻。',
                                "<18>{#p/papyrus}{#f/4}我沒有船舵，\n也不敢真的拿針\n去戳他們。",
                                "<18>{#p/papyrus}{#f/7}...真服了！！\n垃圾場裡面不就是\n一些破針線破木頭嘛？",
                                "<18>{#p/papyrus}{#f/5}咋那麼多人瘋了似地\n跑過去「挖寶」？\n一去就是一整天！",
                                "<25>{#p/alphys}{#f/10}* 嘿嘿，多正常點事。",
                                '<25>{#p/alphys}{#f/3}* 他們喜歡垃圾，熱愛垃圾。\n  所以就永遠\n  與垃圾為伍了唄！',
                                '<18>{#p/papyrus}{#f/0}嗯...\n只能這麼認為了。',
                                '<18>{#p/papyrus}{#f/5}...',
                                "<18>{#p/papyrus}{#f/5}可我還是放心不下\n這些傢伙。",
                                '<25>{#p/alphys}{#f/31}* ...也是。',
                                "<25>{#p/sans}{#f/0}* 喔，兩位好啊。\n* 抱歉回來晚了...",
                                '<25>{#p/sans}{#f/2}* 樓下的住戶餓了，\n  想讓我給他們做早餐。',
                                "<25>{#p/alphys}{#f/25}* 這些人要懶死啊。",
                                '<18>{#p/papyrus}{#f/7}呃... 住在塔尖\n事咋這麼多呢！！',
                                '<18>{#p/papyrus}{#f/4}他們不會自己做飯嗎？',
                                "<25>{#p/sans}{#f/0}* 他們也有苦衷。",
                                "<25>{#p/sans}{#f/0}* 畢竟...",
                                "<25>{#p/sans}{#f/0}* 大夥先是得知了人類的事，\n  然後又被前王后的死訊\n  打擊了一通。",
                                "<25>{#p/sans}{#f/3}* 經歷這些，換做是我\n  也肯定想吃點好吃的，\n  忘卻煩惱。",
                                "<25>{#p/sans}{#f/2}* 而我的「專屬廚師」，\n  就是你。",
                                '<18>{#p/papyrus}{#f/0}說得好！！\n無論是誰，\n都喜歡吃美食！',
                                '<18>{#p/papyrus}{#f/9}...特別是\n偉大的PAPYRUS\n親手做的美食！',
                                '<26>{#p/sans}{#f/0}* 嘿嘿，是呀。',
                                '<26>{#p/sans}{#f/0}* 那我去給他們\n  準備早飯了。',
                                '<26>{#p/sans}{#f/3}* 一起去不，papyrus？',
                                "<18>{#p/papyrus}{#f/0}那必須滴！\n現在就去吧！",
                                '<26>{#p/sans}{#f/0}* 好。\n* ...那，出發！',
                                '<25>{#p/alphys}{#f/17}* 開心點。',
                                '<25>{#p/alphys}{#f/17}* ...',
                                '<25>{#p/alphys}{#f/5}* 該掛電話了。',
                                '<25>{#p/alphys}{#f/6}* 只是...',
                                "<25>{#p/alphys}{#f/14}* 如果能聽到我的聲音...\n* 希望你在那邊\n  過得比我們幸福。",
                                '<25>{#p/alphys}{#f/20}* ...',
                                '<25>{#p/alphys}{#f/20}* 再見了。',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        }
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/5}* 好-好在，\n  王后及時回歸，\n  硬是把她說服了...',
                            '<25>{#p/alphys}{#f/5}* 這才沒讓其他怪物\n  知道人類靈魂的事。',
                            '<25>{#p/alphys}{#f/10}* 一開始，她們起了點衝突...\n  但隨著時間流逝，\n  風波漸漸平息。',
                            
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/alphys}{#f/4}* 只不過...',
                                '<25>{#p/alphys}{#f/17}* Asgore一死，\n  我就得自己把「檔案」\n  偷偷藏起來了。',
                                "<25>{#p/alphys}{#f/20}* 跟以前相比，\n  其實差不多。",
                                "<25>{#p/alphys}{#f/14}* 但現在身邊沒人幫忙...\n  還是有些不舒服。",
                                '<25>{#p/sans}{#f/0}* 所以說，我不是人？',
                                "<25>{#p/alphys}{#f/2}* 不不不！\n* 我不是那個意思！",
                                "<25>{#p/sans}{#f/3}* 開個玩笑而已，我懂。\n* 管理「檔案」這事，\n  我肯定沒有asgore在行。",
                                "<25>{#p/sans}{#f/0}* 但我感覺，\n  自己幹得還算不錯。",
                                '<25>{#p/alphys}{#f/6}* 嗯... 那肯定的。',
                                '<26>{#p/alphys}{#f/5}* 只是，\n  跟Asgore共事那麼久，\n  現在有點想他了。',
                                '<25>{#p/sans}{#f/3}* 對了...',
                                '<25>{#p/sans}{#f/0}* 那些人類還等著你去做\n  每日檢查呢。',
                                "<25>{#p/sans}{#f/2}* 你先去，\n  我打完電話就過去。",
                                "<26>{#p/alphys}{#f/6}* 好。\n* 我先走了。",
                                '<25>{#p/sans}{#f/3}* ...'
                            ]);
                            if (hkills === 1) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 嘿，又見面了。',
                                    "<25>{#p/sans}{#f/0}* 在你離開後，\n  我天天都在想...",
                                    '<25>{#p/sans}{#f/3}* 「為啥那人類把別的怪物\n  都饒恕了，唯獨殺了『他』？」\n* 「到底為啥？」',
                                    "<25>{#p/sans}{#f/0}* 我說的「他」，\n  不是asgore。",
                                    '<25>{#p/sans}{#f/3}* ...',
                                    '<25>{#p/sans}{#f/3}* 原因嘛，你我都心知肚明。',
                                    "<25>{#p/sans}{#f/3}* 正當防衛？想自保？\n  害怕受傷？不小心？",
                                    "<25>{#p/sans}{#f/0}* 不用兜圈子，\n  我就直說了：",
                                    "<25>{#p/sans}{#f/0}* 你就是為了看看\n  會發生什麼。",
                                    "<25>{#p/sans}{#f/0}* 你就是為了看看\n  我會咋評價。",
                                    '<25>{#p/sans}{#f/0}* 哇塞！真牛！\n* 你如願以償啦，小子！',
                                    "<25>{#p/sans}{#f/0}* 高興不？",
                                    "<27>{#p/sans}{#f/3}* 呵。\n* 高興死了。",
                                    "<27>{#p/sans}{#f/0}* ...再見。",
                                    '<27>{#p/darksans}{#f/1}{#i/5}* ...',
                                    '<32>{#s/equip}{#p/event}* 滴...'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/sans}{#f/0}* 嘿。\n* 過得還好嗎？",
                                    "<25>{#p/sans}{#f/0}* 希望如此。\n* 我們過得也不錯。",
                                    '<25>{#p/sans}{#f/3}* 怪物們心懷希望。\n* 日復一日，年復一年地\n  等待著。',
                                    '<25>{#p/sans}{#f/0}* 等待著又一個人類到來，\n  到那時，就能重獲自由。'
                                ]);
                                if (hkills > 9) {
                                    addB([
                                        '<25>{#p/sans}{#f/0}* ...要是我的兄弟\n  也能有這樣的福分就好了。',
                                        '<25>{#p/sans}{#f/3}* 要是那些因你而死的怪物\n  也能有這樣的福分就好了。'
                                    ]);
                                } else {
                                    addB(['<25>{#p/sans}{#f/3}* ...要是我的兄弟\n  也能有這樣的福分就好了。']);
                                }
                                addB([
                                    '<25>{#p/sans}{#f/3}* ...',
                                    '<25>{#p/sans}{#f/3}* 嗯...\n* 聊點什麼好呢？',
                                    '<26>{#p/sans}{#f/0}* ...想到了。\n* 講講前王后，\n  還有喬遷新居的事吧。',
                                    
                                    '<25>{#p/sans}{#f/0}* 她離開外域後，\n  我們很快就認出了彼此，\n  沒事總一起聊天。',
                                    '<25>{#p/sans}{#f/0}* 一來二去，\n  她就有了進一步打算。',
                                    '<25>{#p/sans}{#f/0}* 她搬到了星港小鎮，\n  跟我住在了一起。',
                                    "<25>{#p/sans}{#f/0}* ...誠然，我倆在一起，\n  確實能找到不少樂子。",
                                    '<25>{#p/sans}{#f/3}* 我可以帶她看書，\n  她也能教我做飯...',
                                    "<25>{#p/sans}{#f/0}* 可是，你知道嗎...",
                                    '<25>{#p/sans}{#f/3}* 有趣的事再多，\n  可一想到papyrus，\n  怎麼都快樂不起來。',
                                    '<25>{#p/sans}{#f/3}* 一想到papyrus的事，\n  她也很難受。',
                                    '<25>{#p/sans}{#f/0}* 她難受，並不只是因為\n  papyrus是我的兄弟。',
                                    '<25>{#p/sans}{#f/0}* 更因為，她很關心你。',
                                    "<25>{#p/sans}{#f/3}* 最終，她知道了你的所作所為。\n* 你能想像到，\n  那一刻她的感受嗎？",
                                    '<25>{#p/sans}{#f/0}* 劇透預警：\n  她十分痛苦。',
                                    "<25>{#p/sans}{#f/3}* ...不只是我和她，\n  其他民眾的態度\n  也好不到哪去。",
                                    '<25>{#p/sans}{#f/0}* 很多怪物本來很喜歡你的，\n  現在嘛...',
                                    '<25>{#p/sans}{#f/0}* 不過，其實還好。',
                                    '<25>{#p/sans}{#f/0}* 起碼... ',
                                    '<25>{#p/sans}{#f/3}* 我跟alphys會盡力\n  護送下一個人類，\n  保證他的安全。',
                                    "<25>{#p/sans}{#f/0}* 也挺有意思的。",
                                    '<25>{#p/alphys}{#f/27}* 呃，打擾一下...',
                                    '<26>{#p/alphys}{#f/20}* 那些人類...\n  好-好像遇到麻煩了。',
                                    "<25>{#p/sans}{#f/3}* 喔，該掛電話了。",
                                    "<25>{#p/sans}{#f/0}* 我剛剛說的話，\n  往心裡去，好嗎？",
                                    '<25>{#p/sans}{#f/0}* ...',
                                    "<25>{#p/sans}{#f/0}* ...那，再見了。",
                                    '<32>{#s/equip}{#p/event}* 滴...'
                                ]);
                            }
                        } else {
                            addB([
                                "<18>{#p/papyrus}{#f/0}是啊！！\n我們過得挺好的！",
                                '<18>{#p/papyrus}{#f/5}唯一不喜歡的就是，\n要成天保守那些秘密。',
                                '<18>{#p/papyrus}{#f/5}挺反感這事的。',
                                '<25>{#p/alphys}{#f/11}* 可要是說出去，\n  Undyne...',
                                "<18>{#p/papyrus}{#f/4}然後UNDYNE很生氣，\n肯定會把人類靈魂吸了。\n你是不是又要說這個？",
                                
                                "<18>{#p/papyrus}{#f/7}是是是，你說的對。\n可這話我都聽八百遍了，\n能不能別磨嘰了！！",
                                "<25>{#p/alphys}{#f/23}* 剛剛，因為這事，\n  他跟我吵了好一會呢。",
                                '<18>{#p/papyrus}{#f/5}（唉...）',
                                '<18>{#p/papyrus}{#f/5}咱們再努力努力，\n我就不信UNDYNE\n不聽勸。',
                                "<25>{#p/alphys}{#f/3}* ...Papyrus，跟人類講講\n  你的新工作吧。",
                                '<18>{#p/papyrus}{#f/0}啊對！！\n我咋把這事忘了呢！？',
                                '<18>{#p/papyrus}{#f/0}終於啊... UNDYNE同意\n讓我當皇家守衛了。',
                                "<18>{#p/papyrus}{#f/9}我剛當上了\n皇家衛隊的訓練專家！",
                                '<18>{#p/papyrus}{#f/0}Undyne的任務是\n訓練其他隊員。\n而我的任務呢...',
                                "<18>{#p/papyrus}{#f/0}則是給他們加油鼓勁，\n讓他們士氣滿滿！",
                                "<18>{#p/papyrus}{#f/9}我發現，自己天生\n就是幹這塊的料！",
                                '<18>{#p/papyrus}{#f/2}可不是我自己吹牛喔，\nUNDYNE也這麼想。',
                                "<25>{#p/alphys}{#f/5}* 不錯不錯。\n* 哪天你工作的時候，\n  我也過去看看。",
                                "<18>{#p/papyrus}{#f/0}好啊，隨時歡迎，\n不過有個條件。",
                                '<18>{#p/papyrus}{#f/4}我想把秘密告訴UNDYNE。\n你得同意。',
                                '<25>{#p/alphys}{#f/20}* ...',
                                '<18>{#p/papyrus}{#f/0}你和我，\n咱倆一起去說服UNDYNE\n你看咋樣？',
                                "<25>{#p/sans}{#f/0}* ...喔？\n* 什麼秘密？",
                                "<25>{#p/sans}{#f/3}* 哎呀，不好意思，\n  來晚了。",
                                '<25>{#p/sans}{#f/2}* 剛剛樓下有人餓，\n  我待會要給他們做晚餐。',
                                "<25>{#p/alphys}{#f/25}* 這些人要懶死啊。",
                                "<18>{#p/papyrus}{#f/4}把咱倆剛討論的事\n給SANS講講。",
                                '<25>{#p/alphys}{#f/32}* ...',
                                '<25>{#p/alphys}{#f/3}* Papyrus覺得，\n  咱們應該把人類的事\n  告訴Undyne。',
                                "<25>{#p/sans}{#f/3}* 兄弟，假如咱真把秘密\n  告訴了她，你能保證\n  不會出事嗎？",
                                '<18>{#p/papyrus}{#f/0}呃，我可是一名\n皇家守衛...',
                                '<18>{#p/papyrus}{#f/0}讓我出馬，肯定能\n「四兩撥千斤」！',
                                "<25>{#p/sans}{#f/0}* 嗯...\n* 要是換作平常，\n  我肯定會拒絕。",
                                '<25>{#p/sans}{#f/0}* 不過，我轉念一想，\n  undyne跟你的關係\n  確實不一般。',
                                "<25>{#p/sans}{#f/3}* 而且，我最近也在想，\n  要不要告訴Undyne真相？",
                                "<25>{#p/alphys}{#f/22}* 等等等等！\n  未經我同意，你倆\n  誰也不許擅作主張！",
                                "<25>{#p/sans}{#f/2}* 你放心，做夢都不敢。",
                                "<18>{#p/papyrus}{#f/0}是啊！！我們只是\n隨便想一想而已。",
                                '<18>{#p/papyrus}{#f/5}就當我們\n在做「白日夢」就行。',
                                '<26>{#p/sans}{#f/0}* 嘿嘿，是呀。',
                                '<26>{#p/sans}{#f/0}* 喔對，得去準備晚飯了。',
                                '<26>{#p/sans}{#f/3}* 一起去不，papyrus？',
                                "<18>{#p/papyrus}{#f/0}那必須滴！\n現在就去吧！",
                                '<26>{#p/sans}{#f/0}* 好。\n* ...那，出發！',
                                '<25>{#p/alphys}{#f/17}* 開心點。',
                                '<25>{#p/alphys}{#f/17}* ...',
                                '<25>{#p/alphys}{#f/5}* 唉...',
                                '<25>{#p/alphys}{#f/5}* 我也不想藏著掖著，\n  要是不用瞞著秘密，\n  就太好了。',
                                "<25>{#p/alphys}{#f/6}* 所以... \n  要是真有一線希望，\n  也許...",
                                '<25>{#p/alphys}{#f/6}* ...',
                                "<25>{#p/alphys}{#f/8}* 等掛-掛了電話，\n  我再好好考慮一下。",
                                '<25>{#p/alphys}{#f/10}* ...',
                                '<25>{#p/alphys}{#f/16}* 保重！！',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        }
                    }
                } else if (!dtoriel) {
                    if (SAVE.data.b.w_state_lateleave) {
                        k = 'light_runaway'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                            '<25>{#p/toriel}{#f/1}* 喂？',
                            '<25>{#p/toriel}{#f/5}* 我是... Toriel。',
                            '<25>{#p/toriel}{#f/1}* ...雖然自打咱們不歡而散\n  就再也沒見面...',
                            '<25>{#p/toriel}{#f/5}* 但我還是想給你講講\n  後來發生的事。'
                        ]);
                        addB([
                            '<25>{#p/toriel}{#f/9}* 在你走後，\n  我反思了自己的所作所為。',
                            '<25>{#p/toriel}{#f/13}* 我很愧疚...\n* 當時不該由著自己性子，\n  不讓你走。',
                            '<25>{#p/toriel}{#f/13}* 更不該強行留住那些孩子，\n  不讓「他們」走。',
                            '<25>{#p/toriel}{#f/9}* 不能再逃避下去，\n  把自己圈到這\n  一畝三分地了。',
                            '<26>{#p/toriel}{#f/13}* 所以，我鼓起勇氣，\n  走出了外域。',
                            '<25>{#p/toriel}{#f/18}* 我來到首塔，\n  看到了一個個休眠艙。\n* 裡面裝的... 是人類小孩。',
                            '<25>{#p/toriel}{#f/13}* 之前困住你，\n  我就挺自責的。',
                            '<26>{#p/toriel}{#f/10}* 所以，看到他們被困在\n  那麼小的地方...\n* 我想都沒想，就給放了。',
                            '<25>{#p/toriel}{#f/9}* ...結果，這一時衝動\n  弄出了大亂子。',
                            '<25>{#p/toriel}{#f/13}* 在ASGORE的檔案裡，\n  那些孩子吃盡了苦頭。',
'<25>{#p/toriel}{#f/13}* 雖然自由了，\n  但心靈都受了創傷。',
                            '<25>{#p/toriel}{#f/13}* 結果，\n  有個孩子到處亂跑，\n  被別的怪物發現了。',
                            '<25>{#p/toriel}{#f/9}* 如今，\n  大隊長犧牲，\n  ASGORE駕崩...',
                            "<25>{#p/toriel}{#f/9}* 百姓本來就對人類\n  恨之入骨。",
                            "<25>{#p/toriel}{#f/9}* 他們要是發現這些孩子，\n  肯定會弄死他們。",
                            '<25>{#p/toriel}{#f/13}* 所以...\n  我只能把孩子們藏起來。',
                            '<25>{#p/toriel}{#f/9}* 雖然不想委屈他們，\n  但為了安全...\n  我也別無他法。',
                            '<25>{#p/alphys}{#f/15}* 呃，打個岔。\n* 有客人來訪。',
                            '<25>{#p/toriel}{#f/10}* 讓我猜猜。\n* 是Sans？',
                            '<25>{#p/alphys}{#f/3}* ...',
                            '<25>{#p/toriel}{#f/0}* 原來是他啊。\n* 直接告訴我就行，\n  不用這麼「文縐縐」的。',
                            '<25>{#p/toriel}{#f/9}* Toriel呼叫系統，\n  請解鎖前門。\n* 授權碼：PIE-1-1-0。',
                            "<25>{#p/sans}{#f/0}* ...\n* 電話應該快打完了。",
                            '<25>{#p/sans}{#f/0}* 咦，還沒跟人類嘮完吶？',
                            '<25>{#p/alphys}{#f/23}* 跟誰？！',
                            '<25>{#p/toriel}{#f/0}* 就是那個人類。\n* Sans，那孩子估計也想聽聽\n  你的聲音。',
                            '<25>{#p/toriel}{#f/1}* Alphys\n  是不是也想聊兩句？',
                            '<25>{#p/alphys}{#f/21}* ...',
                            '<25>{#p/alphys}{#f/21}* 不。\n* Alphys才不想。',
                            '<25>{#p/alphys}{#f/21}* Alphys走了。\n* 再見。',
                            "<25>{#p/alphys}{#f/24}* ...\n* （我就在外面等著，\n  你們聊完，記得叫我。）",
                            '<25>{#p/sans}{#f/0}* ...',
                            '<25>{#p/toriel}{#f/5}* ...'
                        ]);
                        if (SAVE.data.n.state_foundry_undyne === 1) {
                            addB(["<25>{#p/sans}{#f/3}* undyne死了，\n  她到現在都沒緩過來。"]);
                        } else {
                            addB(["<25>{#p/sans}{#f/3}* undyne被你殺了，\n  她都現在都沒消氣。"]);
                        }
                        if (dmettaton) {
                            addB(['<25>{#p/sans}{#f/0}* 更不用說，\n  你還殺了mettaton。']);
                        } else {
                            addB(["<25>{#p/sans}{#f/0}* 她恨自己無能，\n  才害得朋友喪命。"]);
                        }
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/sans}{#f/3}* 而我呢？',
                                '<25>{#p/sans}{#f/0}* 我太明白那種滋味了。',
                                '<25>{#p/sans}{#f/0}* 我太清楚alphys為啥\n  這麼難受了。',
                                '<25>{#p/sans}{#f/0}* 畢竟...',
                                "<25>{#p/sans}{#f/3}* 失去至親的人，\n  可不止有她。"
                            ]);
                        } else {
                            if (SAVE.data.n.state_foundry_undyne === 1) {
                                if (dmettaton) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 你該出手時不出手，\n  不該動手時卻先動手。\n* 我知道你有苦衷，只是..."
                                    ]);
                                } else {
                                    addB(["<25>{#p/sans}{#f/3}* 你為了自保，\n  丟下了她，我能理解。\n* 只是..."]);
                                }
                            } else {
                                addB(["<25>{#p/sans}{#f/3}* 你為了自保，\n  對他動了手，我能理解。\n* 只是..."]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 我總覺得，\n  即使是「兩難境地」，\n  也會存在第三條路...",
                                '<25>{#p/sans}{#f/0}* 冷靜下來，多想想，\n  也許就能避免傷亡。',
                                '<25>{#p/sans}{#f/3}* 誰知道呢。',
                                "<25>{#p/sans}{#f/0}* 算了，不能總沉溺過去。\n  還是講講眼前的事吧。"
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<25>{#p/sans}{#f/0}* ...',
                                "<25>{#p/sans}{#f/0}* 沒了皇家守衛。\n  大家的日子很不好過。",
                                '<25>{#p/sans}{#f/3}* 以前，\n  我很看不慣他們的作風...',
                                "<25>{#p/sans}{#f/0}* 可到這種時候，\n  才知道有他們在，多好。",
                                '<25>{#p/toriel}{#f/13}* 真可悲...\n* 要是他們還活著就好了。',
                                '<25>{#p/toriel}{#f/13}* 這段時間，每天都有\n  憤怒的居民上街鬧事，\n  四處打砸搶燒。',
                                '<25>{#p/toriel}{#f/9}* 事態越來越嚴重，\n  誰也管不了，也不敢管。',
                                '<25>{#p/toriel}{#f/9}* 對很多怪物來說，\n  人類沒有「人」，只有「類」。',
'<25>{#p/toriel}{#f/9}* 他們才懶得區分\n  誰是「敵人」，誰是「朋友」。\n* 反正只要是人類，都得死。',
                                '<32>{#p/human}{#v/1}{@fill=#42fcff}* Toriel，我好怕...',
                                '<25>{#p/toriel}{#f/1}* ...喔，是你啊！',
                                '<25>{#p/toriel}{#f/0}* 別擔心，孩子。\n* 只要有我在，\n  他們不敢傷害你。',
                                '<32>{#p/human}{#v/1}{@fill=#42fcff}* ...謝謝您...',
                                '<25>{#p/toriel}{#f/0}* 快回去，\n  跟其他孩子待在一起。',
                                '<25>{#p/toriel}{#f/0}* 等我打完電話，\n  就陪你玩，好嗎？',
                                "<32>{#p/human}{#v/1}{@fill=#42fcff}* 好，那我走了...",
                                '<25>{#p/toriel}{#f/10}* ...小心點。',
                                '<25>{#p/toriel}{#f/9}* ...'
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/toriel}{#f/10}* 其實...\n  雖然那些市民到處鬧事，\n  可我實在恨不起來...',
                                    '<25>{#p/toriel}{#f/9}* 一想到你幹的那些事...',
                                    '<25>{#p/toriel}{#f/13}* 就連我，\n  都無法原諒你。'
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/13}* 真是... 腹背受敵啊。']);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 你知道嗎...",
                                "<25>{#p/sans}{#f/0}* 有一天，\n  我想去grillby's吃頓飯...",
                                '<25>{#p/sans}{#f/3}* 結果到店一看，\n  裡面被砸了個稀巴爛。',
                                '<25>{#p/sans}{#f/0}* 原來，grillby被指控是\n  「親人類派」的走狗。',
'<25>{#p/sans}{#f/0}* 上周，一群怪物闖進他的店，\n  把店洗劫一空。',
                                '<25>{#p/toriel}{#f/13}* 你總去那裡吃飯...\n  真是太可惜了。',
                                '<25>{#p/sans}{#f/3}* 可不是嘛。',
'<25>{#p/sans}{#f/0}* 現在，要是被扣上了\n  「親人類派」的帽子，\n  就是死路一條。',
                                '<25>{#p/sans}{#f/0}* 即使沒死，\n  買賣也肯定做不了了。',
                                '<25>{#p/toriel}{#f/12}* ...這已經不是第一次了。',
                                '<25>{#p/toriel}{#f/11}* 不少怪物都栽在這上頭。',
                                '<25>{#p/sans}{#f/0}* 這還不是最心寒的。',
                                "<25>{#p/sans}{#f/3}* 最讓我心寒的是，\n  現在的怪物怎麼\n  都成了這副德行了？",
                                '<25>{#p/sans}{#f/0}* 當年，我們的祖先在故園\n  其樂融融地生活...',
                                '<25>{#p/sans}{#f/0}* 人怪大戰時，\n  雖然並不太平，\n  可大家也是上下一條心。',
                                "<25>{#p/sans}{#f/3}* 可現在呢...\n  天天鬥來鬥去，沒完沒了。\n* 不知道圖個啥。"
                            ]);
                            if (dpapyrus) {
                                addB(["<25>{#p/sans}{#f/0}* 唉...\n  真希望我兄弟能在身邊，\n  鼓勵鼓勵我。"]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 想想都心煩。']);
                            }
                            addB([
                                '<25>{#p/alphys}{#f/3}* 那個... 兩位？',
                                '<25>{#p/alphys}{#f/3}* 快過來看看。',
                                '<25>{#p/toriel}{#f/3}* 地板都在震！你們聽到了嗎？',
                                '<25>{#p/alphys}{#f/23}* 快看！外面...',
                                '<25>{#p/sans}{#f/0}* toriel，你沒鎖門？',
                                '<25>{#p/toriel}{#f/2}* ...',
                                '<25>{#p/alphys}{#f/22}* 快跑，快！！',
                                '<25>{|}{#p/toriel}{#f/2}* 不... 不行！\n* 孩子們- {%}',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/sans}{#f/0}* ...',
                                '<25>{#p/sans}{#f/0}* 還好，守衛還在，\n  能保護我們。',
                                "<25>{#p/sans}{#f/3}* 只是，現在還活著的守衛\n  已經沒多少了。",
                                '<25>{#p/toriel}{#f/14}* 真的非常感謝\n  他們的幫助。',
                                '<25>{#p/toriel}{#f/13}* 沒了他們，我都不知道\n  咱們還能不能撐下去。',
                                '<32>{#p/human}{#v/2}{@fill=#ff993d}* 太對了！\n* 皇家守衛真是酷斃了！',
                                '<25>{#p/toriel}{#f/2}* ...哎？！\n  你咋過來了？',
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* 等我長大了，\n  肯定也要加入衛隊，\n  保護你們！",
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* 嘿嘿嘿，你就瞧好吧！",
                                '<25>{#p/toriel}{#f/0}* 嘻嘻嘻。\n* 很有可能喔。',
                                '<25>{#p/toriel}{#f/1}* 不過...',
                                '<25>{#p/toriel}{#f/0}* 小守衛，現在你的任務是：\n  回到隊伍，保護其他孩子。',
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* 遵命！\n* 我現在就去！",
                                '<25>{#p/toriel}{#f/0}* 注意安全啊！',
                                "<25>{#p/sans}{#f/0}* 嘿嘿。\n* 對孩子捫溫柔一點喔。",
                                "<25>{#p/sans}{#f/3}* 他們還沒完全從...\n  「檔案」的惡夢中緩過來。",
                                '<26>{#p/toriel}{#f/5}* 你說的對，不過我覺得...',
                                '<25>{#p/toriel}{#f/0}* 那事畢竟過去了，\n  讓他們好好玩玩，\n  幹點別的事，不是更好嗎？',
                                '<25>{#p/toriel}{#f/1}* 再怎麼說，\n  他們也只是孩子啊...',
                                '<25>{#p/sans}{#f/2}* ...嗯，教育孩子這方面\n  你懂得比我多。',
                                '<25>{#p/toriel}{#f/9}* ...',
                                '<25>{#p/toriel}{#f/9}* 前哨站現在的形勢\n  不容樂觀。',
                                '<26>{#p/toriel}{#f/13}* 雖然皇家衛隊能穩住民眾，\n  維持相對和平...',
                                '<25>{#p/toriel}{#f/18}* 但很多人都看不慣我們\n  保護人類...'
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/toriel}{#f/10}* 不過...\n  雖然那些市民到處鬧事，\n  可我實在恨不起來...',
                                    '<25>{#p/toriel}{#f/9}* 一想到你幹的那些事...',
                                    '<25>{#p/toriel}{#f/13}* 就連我，\n  都無法原諒你。'
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/13}* 真是... 腹背受敵啊。']);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 你知道嗎...",
                                "<25>{#p/sans}{#f/0}* 有一天，\n  我想去grillby's吃頓飯...",
                                '<25>{#p/sans}{#f/3}* 結果到店一看，\n  裡面被抗議者堵得\n  水洩不通。',
                                '<25>{#p/sans}{#f/0}* 原來，grillby被指控是\n  「親人類派」的走狗。',
'<25>{#p/sans}{#f/0}* 上周，一群怪物闖進他的店，\n  把店洗劫一空。',
                                '<25>{#p/toriel}{#f/13}* 真是太可惜了，Sans。\n* 沒有守衛管管他們嗎？',
                                "<25>{#p/sans}{#f/3}* 有守衛。\n* 不過當時那情況，\n  守衛也不好去管。",
                                '<25>{#p/sans}{#f/0}* 畢竟，人家雖然態度不好，\n  但好歹吃了飯，給了錢，\n  總不能趕人家走吧？',
                                '<25>{#p/toriel}{#f/1}* ...感覺他們的「抗議」\n  威脅力還不算大。',
                                '<25>{#p/toriel}{#f/6}* 但我還是希望他們收手吧，\n  別往下鬧了。',
                                "<25>{#p/sans}{#f/0}* 是啊。感覺他們這麼莽\n  就跟鬧著玩一樣。\n* 不過我還是有點難受...",
                                "<25>{#p/sans}{#f/3}* 最讓我心寒的是，\n  現在的怪物怎麼\n  都成了這副德行了？",
                                '<25>{#p/sans}{#f/0}* 當年，我們的祖先在故園\n  其樂融融地生活...',
                                '<25>{#p/sans}{#f/0}* 人怪大戰時，\n  雖然並不太平，\n  可大家也是上下一條心。',
                                "<25>{#p/sans}{#f/3}* 可現在呢...\n  天天鬥來鬥去，沒完沒了。\n* 不知道圖個啥。"
                            ]);
                            if (dpapyrus) {
                                addB(["<25>{#p/sans}{#f/0}* 唉...\n  真希望我兄弟能在身邊，\n  鼓勵鼓勵我。"]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 想想都心煩。']);
                            }
                            addB([
                                '<25>{#p/alphys}{#f/27}* 呃，Toriel？\n* 你好像忘關防盜門了。',
                                "<25>{#p/alphys}{#f/20}* 別慌，我幫你關上了。\n* 這都好幾次了。",
                                '<25>{#p/toriel}{#f/1}* 喔... 謝謝你...',
                                "<26>{#p/alphys}{#f/23}* 下回能不能別這麼粗心了？\n* 防盜門不是擺設。",
                                '<25>{#p/toriel}{#f/5}* ...',
                                '<25>{#p/toriel}{#f/9}* 那咱們就說到這吧。',
                                '<25>{#p/sans}{#f/0}* 嗯，同意。',
                                "<25>{#p/sans}{#f/3}* 抱歉，孩子...\n  我們要掛電話了。"
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 那... 注意安全...',
                                    "<25>{#p/sans}{#f/3}* ...出事也無所謂。\n* 反正跟我沒關係。"
                                ]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 在太空飛行，\n  一定要注意安全，好嗎？', '<25>{#p/sans}{#f/3}* ...']);
                            }
                            addB(['<32>{#s/equip}{#p/event}* 滴...']);
                        }
                    } else {
                        k = 'light_toriel'; // NO-TRANSLATE

                        
                        if (SAVE.data.n.state_wastelands_toriel === 0) {
                            addA([
                                '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                                '<25>{#p/toriel}{#f/1}* 喂？',
                                '<25>{#p/toriel}{#f/0}* ...\n* 我是Toriel。',
                                '<25>{#p/toriel}{#f/1}* 這通電話打得有點突然...',
                                '<25>{#p/toriel}{#f/5}* 但我還是想給你講講\n  後來發生的事。'
                            ]);
                            addB(['<25>{#p/toriel}{#f/9}* 雖然之前告訴你，\n  「如果遇到困難，隨時聯繫我」。\n* 但我還是放不下心。']);
                        } else {
                            addA([
                                '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                                '<25>{#p/toriel}{#f/1}* 喂？',
                                '<25>{#p/toriel}{#f/0}* ...\n* 我是Toriel。',
                                '<25>{#p/toriel}{#f/1}* 現在才給你打電話\n  有點不太合適...',
                                '<25>{#p/toriel}{#f/5}* 但我還是想給你講講\n  後來發生的事。'
                            ]);
                            addB(['<25>{#p/toriel}{#f/9}* 自從分別後，\n  我就一直放不下心。']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/5}* 我心想，你是ASGORE要找的\n  「最後一個人類」。\n* 他肯定會奪去你的靈魂。',
                            '<25>{#p/toriel}{#f/1}* 所以，我再害怕，\n  也要走出外域。',
                            '<25>{#p/toriel}{#f/5}* 「不能再待下去了。」\n  我離開了外域，直奔首塔。',
                            '<25>{#p/toriel}{#f/9}* 我使勁跑，使勁跑...\n  生怕去晚了，他傷害你。',
                            
                            '<25>{#p/toriel}{#f/9}* 可我到了一看...\n  才知道自己一直錯怪他了。',
                            '<25>{#p/toriel}{#f/5}* 我以為他是個冷血殺手，\n  可他不是。',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* 那天，我遇到了Alphys，\n  和她聊了很久。',
                            '<25>{#p/toriel}{#f/1}* 我們從ASGORE說到人類...',
                            '<25>{#p/toriel}{#f/3}* 又從人類聊到\n  什麼「喵喵航天行」...',
                            '<25>{#p/toriel}{#f/4}* 我到現在都沒搞懂\n  那到底是個啥玩意。',
                            "<25>{#p/toriel}{#f/0}* 總之...\n  她並不想當女王。",
                            '<25>{#p/toriel}{#f/1}* Alphys覺得，\n  我來統治這裡更合適。',
                            "<25>{#p/toriel}{#f/5}* 她又告訴我...\n* 皇家衛隊的大隊長\n  不久前死了..."
                        ]);
                        if (hkills === 0) {
                            addB(['<25>{#p/toriel}{#f/9}* 當時，你要是救她，\n  說不定真能救過來。']);
                        } else if (hkills === 1 && SAVE.data.n.state_foundry_undyne === 2) {
                            addB(['<25>{#p/toriel}{#f/9}* 而且，殺她的人正是你。']);
                        } else if (dmettaton) {
                            addB(['<25>{#p/toriel}{#f/9}* 電視大明星Mettaton\n  也死了。']);
                            if (royals < 2) {
                                addB([
                                    '<26>{#p/toriel}{#f/9}* ...而皇家衛隊\n  也幾乎全軍覆沒。',
                                    "<25>{#p/toriel}{#f/5}* 對她來說，Mettaton的死\n  帶來的打擊尤為強烈。"
                                ]);
                            } else if (royals < 7) {
                                addB([
                                    '<26>{#p/toriel}{#f/9}* ...皇家守衛們也死的死，\n  傷的傷。',
                                    "<25>{#p/toriel}{#f/5}* 對她來說，Mettaton的死\n  帶來的打擊尤為強烈。"
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/5}* 聽到他死了，\n  我也... 十分難受。']);
                            }
                        } else if (dpapyrus) {
                            addB(["<25>{#p/toriel}{#f/9}* Sans的兄弟，Papyrus\n  也死了。"]);
                            if (royals < 2) {
                                addB(['<26>{#p/toriel}{#f/9}* ...而皇家衛隊\n  也幾乎全軍覆沒。']);
                            } else if (royals < 7) {
                                addB(['<26>{#p/toriel}{#f/9}* ...皇家守衛們也死的死，\n  傷的傷。']);
                            }
                        } else if (royals < 2) {
                            addB(['<26>{#p/toriel}{#f/9}* 皇家衛隊也幾乎全軍覆沒。']);
                        } else if (royals < 7) {
                            addB(['<25>{#p/toriel}{#f/9}* 皇家守衛們也死的死，\n  傷的傷。']);
                        } else if (ddoggo) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬衛隊成員，Doggo\n  也死了。']);
                        } else if (dlesserdog) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬衛隊成員，Canis Minor\n  也死了。']);
                        } else if (ddogs) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬衛隊成員，\n  Dogamy和Dogaressa\n  也死了。']);
                        } else if (dgreatdog) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬衛隊成員，Canis Major\n  也死了。']);
                        } else if (ddoge) {
                            addB(['<25>{#p/toriel}{#f/9}* 特戰隊成員，Doge\n  也死了。']);
                        } else if (droyalguards) {
                            addB(['<25>{#p/toriel}{#f/9}* 新來的兩名守衛，\n  三號和四號\n  也死了。']);
                        } else if (dmadjick) {
                            addB(['<25>{#p/toriel}{#f/9}* 特戰隊成員，Cozmo\n  也死了。']);
                        } else if (dknightknight) {
                            addB(['<25>{#p/toriel}{#f/9}* 特戰隊成員，Terrestria\n  也死了。']);
                        } else if (mdeaths > 9) {
                            addB(['<25>{#p/toriel}{#f/9}* 除了她，\n  許多怪物也喪了命。']);
                        } else if (mdeaths > 2) {
                            addB(['<25>{#p/toriel}{#f/9}* 除了她，\n  好幾隻怪物也喪了命。']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/9}* 除了她，\n  還有一隻怪物也喪了命。']);
                        }
                        if (dmettaton) {
                            addB([
                                '<25>{#p/toriel}{#f/1}* 當時，我還以為\n  「那就是個機器人，\n   修好就完事了。」',
                                '<25>{#p/toriel}{#f/1}* 不只是我，\n  很多人也是這麼想的。',
                                '<25>{#p/toriel}{#f/5}* 可我們都錯了，\n  世上哪有那麼多好事。'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* 出了這些事，我不怪你，\n  只能怪自己太膽小。',
                                '<25>{#p/toriel}{#f/1}* 要是我當時能鼓起勇氣...\n  一直陪伴你...'
                            ]);
                            if (hkills === 0) {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* 那麼在她遇難時，\n  就能鼓勵你出手相助。'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* 那麼就能幫你渡過難關，\n  減少不必要的傷亡。'
                                ]);
                            }
                        }
                        addB([
                            '<26>{#p/toriel}{#f/9}* 可現在，說這些也沒用了。',
                            '<25>{#p/toriel}{#f/5}* 回歸王后的位置之後，\n  要忙的事也越來越多。',
                            "<25>{#p/toriel}{#f/9}* 我得操心整個國家，\n  還要操心那些人類的安全，\n  不讓他們受傷。",
                            '<25>{#p/toriel}{#f/10}* 所以，上任後，\n  我立馬就加強了\n  對人類的保護。'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<26>{#p/toriel}{#f/5}* 皇家守衛已經所剩無幾，\n  所以想保護好人類\n  非常困難。'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* 可惜，我沒什麼經驗。\n  所以想保護好人類\n  非常困難。'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* 幸好... 有老朋友\n  Gerson出手相助。',
                            '<25>{#p/toriel}{#f/1}* 靠著他的人脈網，\n  我在首塔周圍安置了一支\n  基本安防部隊。',
                            '<25>{#p/toriel}{#f/0}* 雖然人數不多，\n  但有了他們，\n  那些人類就基本安全了。',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* 風波漸漸平息，\n  百姓的生活也穩定下來。'
                        ]);
                        if (royals < 2) {
                            addB(['<25>{#p/toriel}{#f/5}* 儘管國王駕崩，\n  皇家衛隊也幾乎全軍覆沒...']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/5}* 儘管國王駕崩，\n  皇家衛隊大隊長也死了...']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* 人們仍心懷希望，\n  等待著自由到來。',
                            '<25>{#p/toriel}{#f/5}* 等待著...\n  我把自由帶給他們。',
                            '<25>{#p/toriel}{#f/9}* ...',
                            '<25>{#p/toriel}{#f/9}* 怪物們把一切希望\n  寄托在我的身上，\n  希望我成為他們的救世主...',
                            '<25>{#p/toriel}{#f/10}* 漸漸地，我理解了ASGORE，\n  理解了他當時背負的壓力\n  有多重...',
                            '<25>{#p/toriel}{#f/9}* ...我感覺，\n  自己也不知不覺中\n  像變了一個人。',
                            '<25>{#p/toriel}{#f/5}* 就在剛剛...'
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Sans找到我，\n  想一起聊聊他的兄弟...',
                                '<25>{#p/toriel}{#f/9}* 我跟他說，\n  自己想一個人靜靜，\n  沒心情聊。',
                                '<25>{#p/toriel}{#f/1}* 他聳聳肩，\n  跟沒事人一樣走開了...',
                                '<25>{#p/toriel}{#f/5}* 但我知道，\n  他肯定很失望。'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Papyrus找到我，\n  想一起聊聊Undyne...',
                                '<25>{#p/toriel}{#f/9}* 我跟他說，\n  自己想一個人靜靜，\n  沒心情聊。',
                                '<25>{#p/toriel}{#f/1}* 他強裝鎮定，\n  竭力控制自己的情緒...',
                                '<25>{#p/toriel}{#f/5}* 但我知道，\n  他心裡肯定非常難受。'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/9}* 看到他那樣，我也很愧疚...',
                            '<25>{#p/toriel}{#f/5}* 但整個前哨站裡裡外外\n  那麼多事等著我...\n  我真的心力交瘁，不想聊。',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/1}* 不過，壓力再大，\n  我也不會放棄。',
                            '<25>{#p/toriel}{#f/1}* 只要能讓怪物們自由...\n  不管自己變成什麼樣，\n  過得多痛苦...',
                            '<25>{#p/toriel}{#f/0}* 都無所謂了。',
                            '<25>{#p/toriel}{#f/1}* 「不能讓大家失望。」\n  這才是最重要的，對吧？',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/9}* 我覺得...\n  該掛電話了。',
                            '<25>{#p/toriel}{#f/9}* 想說的話，也都說了。',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/5}* 孩子，再見。',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else if (royals === 5 && !ddoggo && !dlesserdog && !ddogs && !dgreatdog && !ddoge) {
                    k = 'light_dog'; // NO-TRANSLATE

                    m = music.dogsong;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （想說的，太多啦！）\n* （好高興，好開心！）',
                        '<32>{#s/bark}{#p/event}* 汪汪！',
                        "<32>{#p/basic}* （期待嗎？）\n* （就讓我告訴你吧！）"
                    ]);
                    addB([
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （你走了，國王也丟了！）',
                        '<32>{#p/basic}* （怪物們，非常困惑！）\n* （Alphys，廢物一個！）',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （她不想當女王，\n  就給我們開了個會。）\n* （上下一心，達成共識了！）',
                        '<32>{#p/basic}* （Doge復職了。）\n* （但這次，不是小隊長，\n  而是前哨站女王。）',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （狗狗們團結一致，意見統一。）\n* （好耶。）',
                        '<32>{#p/basic}* （好自豪！）\n* （無與倫比地自豪！）',
                        '<32>{#p/basic}* （正如我們所料，\n  某位狗狗前輩將淵博的\n  「狗生感悟」傳授給了狗狗們。）',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （後來，狗狗們組建了\n  狗狗議會。）\n* （大事小事，都由議會決策。）',
                        '<32>{#p/basic}* （大家每天辛勤工作。）\n* （每天享受肚皮按摩！）\n* （每天品嘗美味狗糧！）',
                        "<32>{#p/basic}* 等等，我好像看到\n  有東西在動...\n* 是誰？誰在那裡？",
                        '<32>{#s/bark}{#p/event}* 汪汪！',
                        "<32>{#p/basic}* 喔，原來是你。",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 等等不對，\n  你跟誰說話呢？！',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （Doggo想跟你聊兩句。）\n* （祝聊得愉快！）',
                        '<32>{#p/basic}* 把那玩意給我！',
                        "<32>{#p/basic}* ...\n* 是你嗎？"
                    ]);
                    if (
                        SAVE.data.n.state_starton_doggo === 0 &&
                        SAVE.data.n.state_starton_lesserdog === 0 &&
                        SAVE.data.n.state_starton_dogs === 0 &&
                        SAVE.data.n.state_starton_greatdog === 0
                    ) {
                        if (SAVE.data.n.state_foundry_doge === 2) {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 你覺得把我們挨個摸一遍\n  很好玩，是不是呀？",
                                "<32>{#p/basic}* 我倒不是埋怨你，只是...",
                                "<32>{#p/basic}* 呃啊！\n* 你可以溫柔地撫摸我，\n  可我連看都看不見你！",
                                '<32>{#p/basic}* 太不公平了。'
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 你覺得把我們挨個摸一遍\n  很好玩，是不是呀？",
                                "<32>{#p/basic}* 唯獨沒摸Doge，\n  想摸她，可沒那麼容易。",
                                "<32>{#p/basic}* 呃啊！\n* 你可以溫柔地撫摸我，\n  可我連看都看不見你！",
                                '<32>{#p/basic}* 要是你能摸摸她就好了...\n  好想知道她的小秘密啊...'
                            ]);
                        }
                    } else if (
                        SAVE.data.n.state_starton_doggo === 1 &&
                        SAVE.data.n.state_starton_lesserdog === 1 &&
                        SAVE.data.n.state_starton_dogs === 1 &&
                        SAVE.data.n.state_starton_greatdog === 1
                    ) {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 你耍小聰明，以為扔根破扳手\n  就能矇混過關。",
                            '<32>{#p/basic}* 那玩意確實把我們糊弄個遍，\n  這話不假。',
                            '<32>{#p/basic}* 可後來，我發現不對勁。\n* 等我明白過來，都快氣炸了！',
                            '<32>{#p/basic}* 所以呢...',
                            '<32>{#p/basic}* ...你能回來嗎？\n  我還沒玩夠，想再玩玩。',
                            "<32>{#p/basic}* 別，別，把我剛說的\n  當放屁就行！\n* 我又胡思亂想了。"
                        ]);
                    } else if (
                        SAVE.data.n.state_starton_doggo === 3 &&
                        SAVE.data.n.state_starton_lesserdog === 3 &&
                        SAVE.data.n.state_starton_dogs === 3
                    ) {
                        if (SAVE.data.n.state_starton_greatdog === 3) {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 把我們挨個揍了一頓！",
                                '<32>{#p/basic}* 揍完我們幾個還沒完，\n  你還傷了Canis Major的心...',
                                "<32>{#p/basic}* 你有病吧？！真服了！",
                                "<32>{#p/basic}* ...換作其他的狗，\n  肯定會這麼想。"
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 把我們挨個揍了一頓！",
                                '<32>{#p/basic}* 不過最起碼\n  你沒虧待Canis Major。',
                                "<32>{#p/basic}* 這麼看，你也沒那麼壞？",
                                "<32>{#p/basic}* ...這些小事，其實我不咋在意。"
                            ]);
                        }
                    } else if (SAVE.data.n.state_starton_doggo === 0) {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 我看不見你，你還使勁摸我！",
                            '<32>{#p/basic}* 是不是覺得很好玩？',
                            '<32>{#p/basic}* 我是不是很可愛？',
                            "<32>{#p/basic}* 等等等等！\n* 我啥也沒說，別亂想！"
                        ]);
                    } else if (SAVE.data.n.state_starton_doggo === 1) {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 拿根扳手跟我玩拋接，\n  是不是？",
                            "<32>{#p/basic}* 哇！\n* 我好想再玩一次！",
                            "<32>{#p/basic}* 唉... 我又在做夢了。"
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 把我揍得0那麼疼，\n  我可忘不了！",
                            '<32>{#p/basic}* 動不動就打人，\n  又自私，又粗魯。',
                            "<32>{#p/basic}* 我挺煩這種行為的。",
                            '<32>{#p/basic}* ...'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* 不說這些了，聊點別的！\n* 你知道嗎？\n  我們把那些人類都放了！',
                        "<32>{#p/basic}* 這些孩子都睡在一堆\n  叫做「檔案」的怪箱子裡。\n* 太深奧了，無法理解。",
                        '<32>{#p/basic}* 我只知道，我領到了一個人類！\n  我能照顧那孩子了！',
                        "<32>{#p/basic}* 「釋放人類」的主意\n  是Doge想出來的。\n* 每隻狗狗都能領到一個孩子。",
                        "<32>{#p/basic}* 咋感覺像在領養寵物？？？",
                        "<32>{#p/basic}* 放心，我們不會虧待孩子們的。\n* 狗狗們都會盡力\n  保護他們！",
                        '<32>{#p/basic}* 我記得，之前我們都在\n  抓捕他們，現在卻在保護他們。\n* 就挺神奇的。'
                    ]);
                    if (royals < 6 || mdeaths > 9) {
                        addB([
                            '<32>{#p/basic}* 現在，民眾普遍非常反感人類。',
                            '<32>{#p/basic}* 如果我們不保護他們，\n  這些孩子會很危險的。'
                        ]);
                    } else {
                        addB(['<32>{#p/basic}* 真是三十年河東，\n  三十年河西啊！']);
                    }
                    addB([
                        '<32>{#p/basic}* 等等！！\n* 我的人類過來了！！',
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Doggo長官！\n* Doggo長官！\n* 快過來快過來，有好看的！',
                        '<32>{#p/basic}* 啥事啊這麼急。',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* 是一場盛大的聚會！\n  再不出發，\n  就要錯過開幕式了！",
                        '<32>{#p/basic}* 那我得好好「看看」了...',
                        '<32>{#p/basic}* ...',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        "<32>{#p/basic}* 聽到了，聽到了，別喊了！\n* 淦，這麼快就到了？",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 我去...\n* 這是啥？！',
                        "<32>{#p/basic}* 以前遠望城市的時候，\n  根本沒有這玩意啊！！",
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* 這是你的專屬狗狗神社！\n  剛剛建好！\n* 專門按你的風格設計的！",
                        "<32>{#p/basic}* 它在動... \n  它一直在動...",
                        '<32>{#p/basic}* 不愧是我的專屬神社！',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            '<32>{#p/basic}* （狗狗神社，保佑和平！）\n* （受盡創傷，無需煩惱。）\n  （忘卻痛苦，驅散憂愁！）',
                            '<32>{#p/basic}* （鳥獸蟲魚，眾生萬物，）\n  （國家安康，社會穩定！）'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* （狗狗神社，保佑和平！）\n* （你來我往，和諧相處！）',
                            '<32>{#p/basic}* （鳥獸蟲魚，眾生萬物，）\n  （多行善事，必有福報！）'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* 嗯，嗯，我懂。\n* 這神社真不錯... 跟我真搭。',
                        '<32>{#p/basic}* ...謝謝你。',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        "<32>{#p/basic}* （最後一座神社，也建好啦！）\n* （犬衛隊所有狗狗，\n  都有專屬神社啦！）",
                        '<32>{#p/basic}* 太棒了！！\n* 現在能把電話給我了嗎？',
                        '<32>{#s/bark}{#p/event}* 汪汪！',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* 我讓其他長官\n  也見識一下他們的神社！",
                        '<32>{#p/basic}* 嘿！\n* 走之前，還有件事...',
                        "<32>{#p/basic}* 要是你不告訴我，我還不知道\n  有這麼棒的神社呢。\n* 給，這些狗糧是獎勵你的。",
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Doggo長官，\n  你真的太...',
                        "<32>{#p/basic}* 去吧，把這事告訴朋友吧。\n* 但這些狗糧是專門獎勵你的，\n  別給他們吃！",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 所以，大夥現在基本摸清\n  社會執行的規律了。',
                        '<32>{#p/basic}* 去神社認認真真工作，\n  回家後開開心心生活。',
                        "<32>{#p/basic}* 而且，如果幹得特別特別出色，\n  還有獎勵！",
                        "<32>{#p/basic}* 這套制度非常完美。\n* 大夥都在認真遵守規定。",
                        '<32>{#p/basic}* 只有休閒迴廊\n  那倆討人厭的雜貨店姐妹\n  跟我們對著幹。',
                        "<32>{#p/basic}* 她倆又懶又邋遢！",
                        '<32>{#p/basic}* 不過她倆賣的太空垃圾\n  挺有意思的。\n* 我們就特赦了。',
                        '<32>{#p/basic}* 等等不對。\n* 特赦的好像不止她倆。',
                        '<32>{#p/basic}* 咋回事？社會咋成這樣了？',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！'
                    ]);
                    if (!dmuffet) {
                        addB([
                            '<32>{#p/basic}* （Doggo，新任務！）',
                            '<32>{#p/basic}* （蜘蛛女王又開始造反了！）\n* （去好好收拾她一頓！）',
                            "<32>{#p/basic}* 呃... 我可不喜歡懲罰別人。",
                            '<32>{#s/bark}{#p/event}* 汪汪！',
                            '<32>{#p/basic}* （要是所有狗狗\n  都像你這麼心慈手軟，\n  社會早就亂套了。）',
                            "<32>{#p/basic}* 知道。\n* 但這事讓別的狗去幹\n  不行嗎？",
                            '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                            "<32>{#p/basic}* （「學會懲罰別人」是\n  每位犬衛隊成員的必修課。）\n* （這次輪到你了，快去吧！）"
                        ]);
                    } else if (!dpapyrus) {
                        addB([
                            '<32>{#p/basic}* （Doggo，新任務！）',
                            '<32>{#p/basic}* （高個子骷髏任務完成出色，\n  符合獎勵發放標準。）\n* （把獎勵給他！）',
                            '<32>{#p/basic}* 呃...\n* 天天都超額完成任務，\n  天天都得給他發獎。',
                            '<32>{#s/bark}{#p/event}* 汪汪！',
                            '<32>{#p/basic}* （高個子骷髏，簡直就是勞模！）',
                            "<32>{#p/basic}* 再這樣下去，\n  他都能憑自己本事\n  直接進犬衛隊了。",
                            '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                            '<32>{#p/basic}* （這事我們也在考慮。）\n* （現在快去幹活！）'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* （Doggo，新任務！）',
                            '<32>{#p/basic}* （狗糧快沒了。）\n* （你能幫忙加點狗糧嗎？）',
                            '<32>{#p/basic}* 呃...\n* 為啥所有髒活累活都得我幹？',
                            '<32>{#s/bark}{#p/event}* 汪汪！',
                            "<32>{#p/basic}* （因為只有Doggo\n  願意幹髒活累活呢。）",
                            '<32>{#p/basic}* 胡說。\n* Doge比我還願意幹呢，\n  找她去啊。',
                            '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                            '<32>{#p/basic}* （人家是女王，\n  怎麼能麻煩她去幹呢。）'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* 行，我去幹。',
                        "<32>{#p/basic}* 嗯，現在得掛電話了。",
                        '<32>{#p/basic}* 無論你在哪，\n  都希望你能過的開心。',
                        "<32>{#p/basic}* ...我把電話還給神煩狗吧。\n* 給了它，電話就掛不了了。",
                        '<32>{#p/basic}* 我，你是咋做到\n  連著說那麼長時間\n  還一點不累的？',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* 好，來了來了！\n* 別催我了！！',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                } else if (!dmuffet) {
                    k = 'light_muffet'; // NO-TRANSLATE

                    m = music.spiderboss;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<32>{#p/basic}{#s/spiderLaugh}* 喔，你好呀，\n  小寶貝~',
                        '<32>{#p/basic}* 過的咋樣呢？',
                        "<32>{#p/basic}* 哎呀，我瞎操心啥呢~\n* 你是死是活，\n  關我什麼事~",
                        "<32>{#p/basic}* 真可惜，你走的太早，\n  錯過了很多好戲呢~\n* 就讓我講給你聽吧！"
                    ]);
                    addB([
                        '<32>{#p/basic}{#s/spiderLaugh}* 在你離開後...\n  大家想讓Alphys當女王~',
                        
                        "<32>{#p/basic}* 可是呢...我們的Alphys\n  連上任的勇氣都沒有呢！"
                    ]);
                    if (dmettaton) {
                        addB(["<32>{#p/basic}* 也難怪~\n* 這個低能連自己的機器人寶寶\n  都救不了，還想當女王？"]);
                    } else {
                        addB([
                            "<32>{#p/basic}* 也難怪~\n* 沒了Asgore撐腰，\n  她就是個低能呀~"
                        ]);
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* 真難辦呀~\n* 這麼大一個前哨站，\n  誰來管呢？",
                            '<32>{#p/basic}* 不用擔心！\n* 她不想當，我來當~',
                            '<32>{#p/basic}* 啊呼呼~\n* 一開始，她還挺倔~',
                            '<32>{#p/basic}* 不過，稍稍「開導」一下，\n  她立馬就老實了~\n* 然後，乖乖把王位讓給我啦！'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* 為了選出接班人，\n  她跟那群皇家守衛\n  開了個會...',
                            '<32>{#p/basic}* 結果呢...',
'<32>{#p/basic}* 大隊長一死，那群廢物守衛\n  立馬沒了凝聚力~\n  一個個自以為是，誰也不服誰~',
                            '<32>{#p/basic}* 啊呼呼呼~\n* 既然他們選不出領導人，\n  那就我來當！',
                            '<32>{#p/basic}* 現在，整個前哨站，\n  都是我的地盤了~'
                        ]);
                    }
                    if (30 <= SAVE.data.n.bully) {
                        if (hkills > 9) {
                            addB([
                                '<33>{#p/basic}* 多虧了你又殺又砍~\n  他們現在又老實，又乖~'
                            ]);
                        } else {
                            addB(['<32>{#p/basic}* 多虧了你揍得他們\n  滿地找牙~\n* 他們現在又老實，又乖~']);
                        }
                        addB([
                            '<32>{#p/basic}* 這群寶寶們都嚇壞了~\n  都等著天降明君，\n  拯救他們呢！',
                            "<32>{#p/basic}* 沒想到他們這麼快\n  就服服帖帖的了~",
                            '<32>{#p/basic}* 真要好好謝謝你呢，\n  寶貝~',
                            '<25>{#p/alphys}{#f/21}* 夠了。\n* 我們變成現在這樣，\n  你也有責任吧？'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* 喔，寶貝...\n* 真想讓你親眼看看\n  這場好戲呢~",
                            '<32>{#p/basic}* 這群怪物特別聽話~\n* 我讓他們幹啥，他們就幹啥~',
                            '<32>{#p/basic}* 而且呢...\n* 有的怪物還樂在其中，\n  甚至對我感激涕零呢！',
                            '<32>{#p/basic}* 不過...\n  還有不少怪物不咋聽話，\n  跟個巨嬰似的，成天抱怨。',
                            '<25>{#p/alphys}{#f/21}* 真無語，你就不想想\n  他們為啥不樂意嗎？'
                        ]);
                    }
                    addB([
                        "<32>{#p/basic}{#s/spiderLaugh}* 呦，這不是Alphys小親親嘛~\n* 今天讓你清理水管，\n  怎麼還不去呢？",
                        "<32>{#p/basic}* 過了這麼久...\n  那裡面肯定又髒又臭~",
                        "<32>{#p/basic}* 你不去，誰去呢？"
                    ]);
                    if (royals < 2) {
                        addB([
                            "<25>{#p/alphys}{#f/22}* 誰有本事，誰就幹！\n  反正我不幹！",
                            "<32>{#p/basic}{#s/spiderLaugh}* 呦，膽子不小嘛。\n  又懦弱，又煩人，\n  跟條蛆似的~",
                            "<32>{#p/basic}* 不過... 啊呼呼~\n* 知道我會怎麼處置\n  一條「蛆」嗎？",
                            '<25>{#p/alphys}{#f/2}* ...不-不要！\n* 求求您... 我...',
                            "<25>{#p/alphys}{#f/3}* 我-我幹！\n* 我現在就去擦，\n  我肯定不偷懶，求求您...",
                            '<32>{#p/basic}{#s/spiderLaugh}* 呵呵呵。\n* 太晚了喔，Alphys小親親~',
                            '<32>{#p/basic}* 蜘蛛們，把她拖出去！',
                            '<32>{#p/basic}* 我們的Alphys想去\n  「極光區」再體驗一把\n  高能射線的快感呢~',
                            "<25>{#p/alphys}{#f/22}* 不！求求您！！\n* 讓我做牛做馬都可以！！\n  別電我！！",
                            '<32>{#p/basic}{#s/spiderLaugh}* 一會見喔~'
                        ]);
                    } else {
                        addB([
                            "<26>{#p/alphys}{#f/24}* 那當然是「您」去了。",
                            "<32>{#p/basic}{#s/spiderLaugh}* 喔？\n  你可真會扯淡呢~",
                            "<32>{#p/basic}* 而且呢... 啊呼呼呼~\n* 敢跟我這麼說話，\n  是不是活得不耐煩了~",
                            '<25>{#p/alphys}{#f/27}* 是嗎？',
                            "<25>{#p/alphys}{#f/28}* 呵呵呵...\n* 威脅別人前，我勸你\n  操心操心自己那條小命吧。",
                            '<32>{#p/basic}{#s/spiderLaugh}* 不用狡辯啦，Alphys小親親~\n* 既然這麼想被電，\n  那我肯定不會「虧待」你！',
                            '<32>{#p/basic}* 蜘蛛們，把她拖出去！',
                            '<32>{#p/basic}* 我們的Alphys想去\n  「極光區」再體驗一把\n  高能射線的快感呢~',
                            '<25>{#p/alphys}{#f/29}* 享受你最後的時光吧。',
                            "<32>{#p/basic}{#s/spiderLaugh}* 您可真逗~"
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 啊呼呼~\n* 真可悲啊，Alphys小親親\n  總不老實~',
                        "<32>{#p/basic}* 幸好我們有「極光區」，\n  能讓她學會感恩！",
                        '<32>{#p/basic}* 而且，我還獲得了\n  「檔案」的力量~',
                        '<32>{#p/basic}* 有了「檔案」，就能把這幫怪物\n  統統送進虛擬空間~\n* 而且，還能控制時間流速！',
                        '<32>{#p/basic}* 只要我一改...',
                        '<32>{#p/basic}* 就能讓他們在裡面度日如年！',
                        '<32>{#p/basic}* 以前，這幫怪物咋折磨我們的，\n  今天，我就還給他們！'
                    ]);
                    if (dmettaton) {
                        addB([
                            '<32>{#p/napstablook}* 抱歉打斷您...',
                            "<32>{#p/napstablook}* 你讓我辦的事，\n  我都辦好了......",
                            '<32>{#p/basic}{#s/spiderLaugh}* 啊呼呼~\n* 不愧是我們的鬼鬼~',
                            '<32>{#p/basic}* 名單上所有的「目標」\n  都查清楚了嗎？',
                            '<32>{#p/napstablook}* 當然......\n* 他們的詳細住址，個人資訊\n  我都寫了',
                            "<32>{#p/basic}{#s/spiderLaugh}* 幹得好！\n* 真是個又懂事，又聽話的\n  小間諜~",
                            '<32>{#p/napstablook}* .........',
                            '<32>{#p/napstablook}* 所以.........',
                            "<32>{#p/napstablook}* 可以告訴我...\n  你想對名單上那些人...\n  做什麼呢...........",
                            "<32>{#p/basic}{#s/spiderLaugh}* 你可真蠢~\n* 我想怎麼處理他們，\n  關你屁事~",
                            '<32>{#p/basic}* 你放心~\n* 我絕對不會「虧待」他們的~',
                            '<32>{#p/napstablook}* ...',
                            "<32>{#p/napstablook}* 我回去休息了，\n  今天好累",
                            '<32>{#p/basic}{#s/spiderLaugh}* 回去睡吧，\n  可愛的鬼鬼~',
                            '<32>{#p/basic}* 明天記得準時過來喔~'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<32>{#p/napstablook}* ...',
                                '<32>{#p/napstablook}* 嗯',
                                "<32>{#p/basic}{#s/spiderLaugh}* 你瞧！\n* 無論是誰，都逃不過我織的\n  間諜網呢！"
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* ...', "<32>{#p/napstablook}* alphys，\n  這是最後的機會！"]);
                        }
                    } else {
                        addB([
                            '<32>{#p/mettaton}* 吹夠了沒有？',
                            "<32>{#p/mettaton}* 我按你吩咐，趕了過來。",
                            "<32>{#p/basic}{#s/spiderLaugh}* 啊呼呼~\n* 對，我找的就是你！",
                            '<32>{#p/basic}* 所以，觀眾對你的新節目\n  評價如何？',
                            '<32>{#p/mettaton}* 收視率十分慘澹。\n* 根本沒人願意看。',
                            '<32>{#p/basic}{#s/spiderLaugh}* 真是「如聽仙樂耳暫明」啊~\n* 簡直太棒了~',
                            '<32>{#p/mettaton}* 你也知道...'
                        ]);
                        if (iFancyYourVilliany()) {
                            addB(['<32>{#p/mettaton}* 觀眾喜歡的節目，是\n  「惡龍登場，正義對抗邪惡」的\n  好戲。']);
                        } else {
                            addB(['<32>{#p/mettaton}* 觀眾喜歡的節目，是\n  「形式多樣，有名人客串」的\n  好戲。']);
                        }
                        addB([
                            "<32>{#p/mettaton}* 而不是【你】灌輸的\n  那些垃圾。",
                            "<32>{#p/basic}{#s/spiderLaugh}* 他們愛不愛看\n  根本不重要...",
                            "<32>{#p/basic}* 只要能把他們洗成痴呆，\n  洗成不會反抗的傻子，\n  就可以了~",
                            '<32>{#p/mettaton}* ...呃，\n  我能走了嗎？'
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<32>{#p/mettaton}* 我真的累了。",
                                '<32>{#p/basic}{#s/spiderLaugh}* 想走就走吧，\n  鐵皮娃娃~',
                                "<32>{#p/basic}* 別忘了你的職責就好~"
                            ]);
                        } else {
                            addB([
                                '<32>{#p/mettaton}* PAPYRUS還在外面等我呢。',
                                '<32>{#p/basic}{#s/spiderLaugh}* 是嗎？',
                                "<33>{#p/mettaton}* 我倆正在準備新節目：\n  「蜘蛛廚藝展」。",
                                '<32>{#p/basic}{#s/spiderLaugh}* 喔，是蜘蛛廚藝展呀~',
                                '<32>{#p/basic}* 嗯...',
                                "<32>{#p/basic}* 行，只要能把觀眾噁心到\n  就行。"
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<32>{#p/mettaton}* ...',
                                '<32>{#p/mettaton}* 再見。',
                                '<32>{#p/basic}{#s/spiderLaugh}* 你瞧，就連文化領域\n  也被我控制得死死的~'
                            ]);
                        } else {
                            addB(['<32>{#p/mettaton}* ...', "<32>{#p/mettaton}* ALPHYS，\n  趁現在，上！"]);
                        }
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* 是不是非常羨慕啊？",
                            "<32>{#p/basic}* 啊呼呼~\n* 真好奇要是你沒走\n  現在能有多大出息~",
                            '<32>{#p/basic}* 那些小孩\n  真是一個比一個出色！',
                            '<32>{#p/basic}* 雖然，他們剛離開「檔案」時\n  受了點委屈...',
                            "<32>{#p/basic}* 但現在，他們都成了\n  我最忠誠的手下~",
                            '<32>{#p/basic}* 喔，寶貝...\n* 看到你孤單一人在太空飛，\n  我的心都要碎了~',
                            "<32>{#p/basic}* 要是寂寞了，就回來\n  讓我好好招待招待你！",
                            "<32>{#p/basic}* 我先掛啦~",
                            '<32>{#p/basic}* 後會有期~',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* 啊呼呼呼呼~\n* 你說- 啊啊啊！',
                            '<25>{#p/alphys}{#f/28}* 哎呀，哎呀...\n* 這不是我們的\n  蜘蛛大小姐嘛。',
                            '<32>{#p/basic}{#s/spiderLaugh}* 不——！\n* 放開我！',
                            "<32>{#p/basic}* 你們這些死守衛...\n  都是一個貨色！\n  一群白痴，廢物，蠢貨！",
                            "<32>{#p/basic}* 沒了我，\n  看誰教你們如何感恩！\n  看誰把你們引回正路！",
                            "<25>{#p/alphys}{#f/29}* 省省勁，別掙扎了。\n* 他們早就推舉【我】\n  做這裡的王了。",
                            '<32>{#p/basic}{#s/spiderLaugh}* 不對... 怎麼可能？',
                            '<32>{#p/basic}* 我不是把你關起來了嗎？\n  我不是還叫蜘蛛24小時\n  盯著你嗎？',
                            "<32>{#p/basic}* 而且...\n* 我那麼折磨你，\n  你怎麼還有力氣反抗！",
                            "<32>{#p/basic}* 你怎麼還有力氣指揮守衛？",
                            "<25>{#p/alphys}{#f/17}* 自從你控制前哨站，\n  我們都受盡了嚴刑拷打。",
                            "<25>{#p/alphys}{#f/5}* 時間久了...\n  我們早就學聰明了。",
                            '<25>{#p/alphys}{#f/16}* 你越折磨我，我就越恨你，\n* 我越恨你，就越想弄死你！',
                            "<25>{#p/alphys}{#f/7}* 哈哈哈...\n* 真是夢寐以求一刻啊。\n  今天，就讓你也嘗嘗...",
                            "<32>{#p/basic}{#s/spiderLaugh}* 不... 不要！\n* 不準這麼對我！",
                            '<25>{#p/alphys}{#f/27}* 衛兵...？',
                            '<32>{#p/basic}{#s/spiderLaugh}* 不要！！！\n* 求求你，放了我吧！',
                            "<25>{#p/alphys}{#f/29}* 把她拖出去。\n* 讓她也去「極光區」\n  好好體驗體驗。",
                            '<25>{#p/alphys}{#f/27}* ...',
                            "<25>{#p/alphys}{#f/27}* 哎... 這是啥？",
                            '<25>{#p/alphys}{#f/27}* 難不成...\n  剛才她拿這東西\n  給別人打電話呢？',
                            '<25>{#p/alphys}{#f/17}* 想不通。',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else if (!dpapyrus) {
                    k = 'light_papyrus'; // NO-TRANSLATE

                    m = music.papyrus;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<18>{#p/papyrus}{#f/4}這玩意壞了吧？\n咋一直不好使呢？',
                        '<18>{#p/papyrus}{#f/0}喔！\n自動切換到語音信箱了！',
                        '<18>{#p/papyrus}{#f/6}我說咋一直\n打不出去呢！',
                        '<18>{#p/papyrus}{#f/5}人類，你好啊！\n我有很多話...\n想告訴你。'
                    ]);
                    addB([
                        '<18>{#p/papyrus}{#f/4}首先告訴你...\n我當上國王啦！',
                        "<18>{#p/papyrus}{#f/6}等等！！\n先別掛！！\n聽我說完！！",
                        "<18>{#p/papyrus}{#f/5}要是感覺離譜...\n那我講講咋回事吧！",
                        "<18>{#p/papyrus}{#f/0}我就從頭講起。",
                        
                        "<18>{#p/papyrus}{#f/5}在你走後，\n前哨站領導層\n就崩潰了。",
                        "<18>{#p/papyrus}{#f/6}大家都想讓ALPHYS\n繼承王位...",
                        "<18>{#p/papyrus}{#f/5}可她根本不想當女王。",
                        "<18>{#p/papyrus}{#f/5}大夥又到處找UNDYNE，\n可就是找不到...",
                        '<18>{#p/papyrus}{#f/4}ALPHYS只能召集\n皇家守衛一起開個會，\n另找合適的人選。'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<18>{#p/papyrus}{#f/4}可是，皇家守衛\n已經沒幾個活人了。',
                            '<18>{#p/papyrus}{#f/5}結果...\n會議最終也沒開成。'
                        ]);
                    } else {
                        addB([
                            '<18>{#p/papyrus}{#f/4}結果，\n皇家守衛爭來爭去，\n誰也不服誰...',
                            "<18>{#p/papyrus}{#f/5}爭到最後，\n也沒選出個合適的\n領導人。"
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/6}最後...\nALPHYS也放棄了。',
                        '<18>{#p/papyrus}{#f/6}她拋下我們，自己逃了。\n前哨站陷入了\n無政府狀態。',
                        '<18>{#p/papyrus}{#f/5}沒過多久...',
                        '<18>{#p/papyrus}{#f/6}社會卻突然...\n穩定下來！',
                        "<18>{#p/papyrus}{#f/0}我總覺得不對勁，\n這表面的平靜之下\n肯定暗流湧動。",
                        '<18>{#p/papyrus}{#f/4}所以...',
                        '<18>{#p/papyrus}{#f/9}我決定親自出馬！',
                        '<18>{#p/papyrus}{#f/5}你可以猜猜看，\n我當上國王之後\n都幹了些啥。',
                        '<18>{#p/papyrus}{#f/0}你放心！\n我可沒瞎搞！',
                        "<18>{#p/papyrus}{#f/0}上任後，\n我制定了一些政策，\n幫助大家交朋友。",
                        '<18>{#p/papyrus}{#f/4}可不是\n只跟「我」交朋友喔...',
                        "<18>{#p/papyrus}{#f/0}而是大家一起\n相互交朋友！",
                        '<18>{#p/papyrus}{#f/9}漸漸地，\n人們有了鬥志，\n守衛的士氣也上漲了！',
                        '<19>{#p/papyrus}{#f/4}只要再多等等，\n等大家都和和氣氣，\n社會真正安穩起來後...',
                        "<18>{#p/papyrus}{#f/9}就能釋放那些人類啦！",
                        '<18>{#p/papyrus}{#f/0}希望到那時\n不會出什麼亂子吧。',
                        "<25>{#p/sans}{#f/0}* 嘿，幹得不錯。",
                        '<25>{#p/sans}{#f/3}* 之前民眾積怨已久，\n  一直排解不了。\n* 現在好多了。',
                        "<18>{#p/papyrus}{#f/0}喔，是SANS呀！\n今兒個咋這麼\n有精神呢？",
                        '<25>{#p/sans}{#f/0}* 喔，今天不用上班。',
                        "<25>{#p/sans}{#f/3}* 畢竟過節嘛。",
                        '<18>{#p/papyrus}{#f/4}過節？\n然後就放假了？',
                        '<18>{#p/papyrus}{#f/5}（唉...）',
                        
                        "<18>{#p/papyrus}{#f/4}自打你去GRILLBY'S\n那裡幹活，\n放的假就越來越多...",
                        "<25>{#p/sans}{#f/3}* 哎，別上火嘛。\n* 你是不是忘了...",
                        '<25>{#p/sans}{#f/2}* 今兒個，可是半年一度的\n  「破冰節」啊，\n* 你不是也總盼這一天嘛。',
                        '<18>{#p/papyrus}{#f/1}喔對！！！\n我咋把自己設立的\n節日給忘了呢！！！',
                        '<18>{#p/papyrus}{#f/0}平日裡無論是死敵，\n還是對手...',
'<18>{#p/papyrus}{#f/0}在「破冰節」這一天\n都要當成朋友。',
                        '<18>{#p/papyrus}{#f/4}所以，SANS，\n今天你的「破冰行動」\n完成得咋樣呢？',
                        '<25>{#p/sans}{#f/0}* 嗯...',
                        "<25>{#p/sans}{#f/3}* 我想去「破」，\n  可也沒有「冰」啊。",
                        '<18>{#p/papyrus}{#f/5}啊這... 呃...',
                        '<18>{#p/papyrus}{#f/6}找不到關係差的，\n那就鞏固一下\n關係還行的唄！',
                        '<25>{#p/sans}{#f/2}* 嗯... 我跟朋友的關係\n  已經非常好了，沒必要。',
                        "<25>{#p/sans}{#f/3}* ...看來「破冰節」\n  與我無緣了。",
                        "<18>{#p/papyrus}{#f/0}喔，沒關係的。",
                        '<18>{#p/papyrus}{#f/9}過兩天，就到\n「交友日」了！',
                        '<25>{#p/sans}{#f/0}* 在那天，大夥是不是要...\n  努力交新朋友？',
                        '<18>{#p/papyrus}{#f/0}捏嘿嘿！\n太對了！',
                        '<25>{#p/sans}{#f/0}* 很期待呢。',
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{#p/sans}{#f/3}* 孩子，想必你也知道...",
                        "<25>{#p/sans}{#f/0}* 在你剛走後，\n  這裡的情況不容樂觀。",
                        '<25>{#p/sans}{#f/3}* 人們不停甩鍋，\n  相互指責...',
                        '<25>{#p/sans}{#f/3}* 個個都覺得...\n  你幹那些事時，沒人去管，\n  所以才害自己遭這麼多罪。',
                        '<25>{#p/sans}{#f/0}* 多虧了我的兄弟，\n  讓一切漸漸好轉。'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/3}* 嘿嘿。',
                            '<25>{#p/sans}{#f/0}* 皇家衛隊雖然消亡了...\n  可他骨子裡的那股勁兒\n  卻從未消亡。',
                            "<18>{#p/papyrus}{#f/0}太對了！！\n前哨站一片向好！",
                            '<18>{#p/papyrus}{#f/9}一想到今天的繁榮\n是自己努力的結果，\n我都為自己驕傲！'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/2}* 嘿嘿，就連皇家衛隊\n  都完全變了樣。',
                            '<18>{#p/papyrus}{#f/0}太對了！！\n他們的職責，\n再也不是攻擊人類啦！',
                            '<18>{#p/papyrus}{#f/9}而是幫大家化解仇恨，\n驅散人們的心魔！'
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/5}...',
                        '<18>{#p/papyrus}{#f/5}人類，\n不管你犯了什麼錯，\n請放心！',
                        '<18>{#p/papyrus}{#f/0}大家過得挺好的！',
                        '<18>{#p/papyrus}{#f/6}我也原諒你！！！'
                    ]);
                    if (
                        world.edgy ||
                        (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                    ) {
                        addB(['<18>{#p/papyrus}{#f/5}雖然一開始，\n咱倆有點小摩擦...']);
                    } else if (SAVE.data.n.plot_date < 1.1) {
                        if (SAVE.data.b.flirt_papyrus) {
                            addB(['<18>{#p/papyrus}{#f/5}雖然，咱倆沒能約會...']);
                        } else {
                            addB(['<18>{#p/papyrus}{#f/5}雖然咱倆沒能\n好好玩一次...']);
                        }
                    } else {
                        addB(["<18>{#p/papyrus}{#f/5}雖然咱倆最後\n沒能去UNDYNE家\n玩一次..."]);
                    }
                    addB([
                        "<18>{#p/papyrus}{#f/0}我還是很高興\n能遇到你，\n我的朋友。",
                        "<25>{#p/sans}{#f/2}* 哎呦，真甜蜜。\n* 磕到了磕到了。",
                        "<25>{#p/sans}{#f/3}* 太遺憾了，\n  沒能聽到那孩子的聲音。",
                        "<18>{#p/papyrus}{#f/7}確實。\n但就算人類沒法回應，\n那也值了！！",
                        '<18>{#p/papyrus}{#f/0}人類只要能聽到\n我的留言，\n我就滿足了。',
                        '<25>{#p/sans}{#f/0}* 嘿。\n* 在外多保重，孩子。',
                        "<25>{#p/sans}{#f/2}* 別忘了，這裡有個傢伙\n  一直惦記你呢。",
                        "<18>{#p/papyrus}{#f/0}...那個傢伙，\n就是我！！！",
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                } else {
                    k = 'light_sans'; // NO-TRANSLATE

                    m = sounds.wind;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                        '<25>{#p/sans}{#f/0}* 你好呀。',
                        "<25>{#p/sans}{#f/3}* 近況可好？"
                    ]);
                    addB([
                        '<25>{#p/sans}{#f/0}* 你走後，\n  國王就人間蒸發了。',
                        '<25>{#p/sans}{#f/3}* 怎麼就蒸發了呢？\n  不知道。',
                        '<25>{#p/sans}{#f/2}* ...估計是累了，去度假了。',
                        '<25>{#p/sans}{#f/0}* 民眾希望alphys繼承王位。',
                        "<25>{#p/sans}{#f/3}* 可她根本不想。"
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/0}* 她想找一名皇家守衛\n  繼承王位...',
                            '<25>{#p/sans}{#f/0}* 可守衛也人間蒸發了。',
                            '<25>{#p/sans}{#f/3}* 跑哪去了？\n  不知道。',
                            '<25>{#p/sans}{#f/2}* ...估計是煩了，想休息一下。'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* 她想找一名皇家守衛\n  繼承王位...',
                            "<25>{#p/sans}{#f/0}* 可大隊長缺席，\n  他們吵個不停，\n  誰也不服誰。",
                            '<25>{#p/sans}{#f/3}* 跑哪去了？\n  不知道。',
                            "<25>{#p/sans}{#f/2}* ...估計是厭了，\n  不想管爛攤子了。"
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* 找不到人，alphys就逃了。\n* 偌大的前哨站，沒人管理。',
                        "<25>{#p/sans}{#f/3}* 「那就讓前王后回歸唄。」",
                        '<25>{#p/sans}{#f/3}* 「那就再找個有能力的人唄。」',
                        '<25>{#p/sans}{#f/0}* 但是誰也沒有來。',
                        '<25>{#p/sans}{#f/3}* 為啥沒來呢？\n  你知道嗎？',
                        '<25>{#p/sans}{#f/2}* ...估計是他們看淡了，\n  想落得一身輕。',
                        "<25>{#p/sans}{#f/0}* 爛攤子總得有人管。",
                        '<25>{#p/sans}{#f/0}* 我接任了asgore。',
                        "<25>{#p/sans}{#f/3}* 要顧全大局...\n  要藏好人類...\n  要安撫民眾...",
                        "<25>{#p/sans}{#f/3}* 談何容易。",
                        '<25>{#p/sans}{#f/0}* 我讓民眾把一切看淡，\n  什麼都別想，做個「懶人」。',
                        '<25>{#p/sans}{#f/2}* 怪物不再鬧騰，\n  逐漸平靜下來。'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB(['<25>{#p/sans}{#f/3}* ...他們平靜得出奇，\n  看不出一點恐懼。']);
                    } else {
                        addB(['<26>{#p/sans}{#f/3}* ...他們平靜得出奇，\n  看不出一點悲傷。']);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* 你看，多好啊。',
                        '<25>{#p/sans}{#f/0}* 社會欣欣向榮...\n  人類安全無憂...\n  怪物心懷希望...',
                        "<25>{#p/sans}{#f/3}* 但為什麼呢？",
                        '<25>{#p/sans}{#f/0}* 為什麼一切...\n  如此絕望呢？',
                        "<25>{#p/sans}{#f/3}* 我不知道，\n  誰都不知道。",
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{*}{#x0}{#p/darksans}{#f/1}{#i/5}* ...也許是因為...\n  某個骯髒的兄弟殺手。"
                    ]);
                }
            } else {
                k = 'light_generic'; // NO-TRANSLATE

                
                addA([
                    '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
                    '<25>{#p/alphys}{#f/8}* 餵...',
                    '<25>{#p/alphys}{#f/6}* 有人嗎？',
                    "<25>{#p/alphys}{#f/10}* 這次打電話來，\n  只是想和你說說近況。",
                    '<25>{#p/alphys}{#f/5}* 不會耽誤你太長時間的...'
                ]);
                addB([
                    '<25>{#p/alphys}{#f/20}* 在你走後...\n  國王就突然... 失蹤了。',
                    "<25>{#p/alphys}{#f/14}* 我把訊息告訴了民眾，\n  大家都非常難過。",
                    '<25>{#p/alphys}{#f/10}* 身為皇家科學員，\n  怪物們都認為\n  我是繼承王位的最佳人選。',
                    "<25>{#p/alphys}{#f/11}* 但我知道，\n  自己並不適合當統治者。",
                    '<25>{#p/alphys}{#f/5}* 所以，我跟皇家守衛們\n  開了個會。',
                    '<25>{#p/alphys}{#f/6}* 大家達成一致意見：\n  讓Terrestria繼任女王。',
                    '<25>{#p/alphys}{#f/15}* 她剛一上任，\n  就給皇家衛隊來了波大裁員，\n  並放鬆了衛隊紀律的管理。',
                    '<25>{#p/alphys}{#f/17}* 這一舉動引發了不小爭議。'
                ]);
                if (SAVE.data.b.undyne_respecc) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* 一開始，Undyne對政策\n  有很大意見。",
                        '<25>{#p/alphys}{#f/8}* 但後來，她也漸漸妥協了。',
                        '<25>{#p/alphys}{#f/27}* 她覺得，人也分三六九等，\n  有壞人，自然也有好人。',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* 那還用說！\n* 好人可是大大滴有啊！！",
                        '<25>{#p/alphys}{#f/10}* U-Undyne？！',
                        '<25>{#p/undyne}{#f/1}* 那個孩子向我證明了，\n  即使是人類，也能成為\n  可敬的對手。',
                        '<25>{#p/undyne}{#f/1}* 那孩子光明磊落，\n  懂得尊重對手。',
                        "<25>{#p/undyne}{#f/18}* ...而且我覺得，\n  管得松點也好。",
                        '<25>{#p/undyne}{#f/14}* 畢竟王后回歸了，\n  而且非常支援新女王。',
                        
                        '<25>{#p/undyne}{#f/1}* 所以短期內\n  衛隊是沒希望擴編了。'
                    ]);
                } else if (2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* 一開始，Undyne對政策\n  有很大意見。",
                        '<25>{#p/alphys}{#f/8}* 但後來，她也漸漸妥協了。',
                        '<25>{#p/alphys}{#f/27}* 她覺得，人也分三六九等，\n  有壞人，自然也有好人。',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* 那還用說！\n* 好人可是大大滴有啊！！",
                        '<25>{#p/alphys}{#f/10}* U-Undyne？！',
                        '<25>{#p/undyne}{#f/14}* 那個孩子向我證明了，\n  即使是人類，也能心存善良。',
                        '<25>{#p/undyne}{#f/1}* 面對可怕的對手，\n  也能施以仁慈。',
                        "<25>{#p/undyne}{#f/18}* ...而且我覺得，\n  管得松點也好。",
                        '<25>{#p/undyne}{#f/14}* 畢竟王后回歸了，\n  而且非常支援新女王。',
                        
                        '<25>{#p/undyne}{#f/1}* 所以短期內\n  衛隊是沒希望擴編了。'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/19}* Undyne... \n  非常反感新政策。",
                        '<25>{#p/alphys}{#f/19}* 國王出了事，\n  她一直都沒饒你。',
                        "<25>{#p/alphys}{#f/20}* 我也理解她的心情...",
                        '<25>{#p/alphys}{#f/20}* ...',
                        "<25>{#p/undyne}{#f/16}* 是啊，這都是什麼破政策。",
                        '<25>{#p/alphys}{#f/10}* U-Undyne？！',
                        "<25>{#p/undyne}{#f/17}* 就因為來了幾個「好人」，\n  一個個都得意忘形，\n  放鬆警惕了？",
                        '<25>{#p/undyne}{#f/9}* ...真可惜，\n  現在站在我這邊的怪物\n  越來越少了。',
                        "<25>{#p/undyne}{#f/16}* 王后回歸，\n  還特別支援新女王...",
                        '<25>{#p/undyne}{#f/9}* 這下好了，\n  皇家守衛的榮光\n  再也回不來了。'
                    ]);
                }
                addB([
                    '<25>{#p/alphys}{#f/5}* ...\n* 跟你講講王后的事吧。',
                    '<26>{#p/alphys}{#f/5}* 她回歸之後，\n  風波漸漸平息，\n  社會也穩定下來。',
                    '<25>{#p/alphys}{#f/21}* 不久後，她發現了那些人類。',
                    '<25>{#p/alphys}{#f/21}* 王后決定把人類釋放出來，\n  並把秘密公之於眾。'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/alphys}{#f/20}* 可是...\n* 人類的出現，\n  引起了不小的騷動。",
                        '<25>{#p/alphys}{#f/13}* 大家一想到之前有個人類\n  把怪物都打得半死...',
                        '<25>{#p/alphys}{#f/26}* 就怕得不行。',
                        '<25>{#p/alphys}{#f/20}* 好在，當時並沒有怪物死亡。',
                        '<25>{#p/alphys}{#f/20}* 利用這點，女王Terrestria\n  成功穩住了民眾的情緒。',
                        "<25>{#p/alphys}{#f/18}* 果然還是她厲害。\n* 要是換我當女王，\n  估計這會都要爆發內戰了。",
                        '<25>{#p/alphys}{#f/8}* 不管咋說，\n  現在民眾對人類的態度\n  可比以前好多了。'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/15}* 好在，行動非常順利，\n  沒有引起大的騷動。",
                        '<25>{#p/alphys}{#f/17}* 我想...\n  要是她對人類了解得少，\n  肯定不能這麼順利。',
                        '<25>{#p/alphys}{#f/8}* 而且，\n  現在民眾對人類的態度\n  可比以前好多了。'
                    ]);
                }
                addB(["<25>{#p/alphys}{#f/8}* 平心而論，\n  挺不可思議的。", '<26>{#p/undyne}{#f/16}* 嘿，其實...\n  我總有一種不真實感。']);
                if (SAVE.data.b.undyne_respecc || 2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/undyne}{#f/10}* 感覺大家的變化\n  實在太強烈，太不真實。",
                        '<25>{#p/undyne}{#f/1}* 喔對了，你跟那孩子講\n  建學校的事了嗎？',
                        "<25>{#p/alphys}{#f/10}* 哎呀... 對啊！\n* 這事咋忘說了呢。"
                    ]);
                } else {
                    addB([
                        "<25>{#p/undyne}{#f/10}* 愛咋變咋變，別再接著\n  給皇家衛隊裁員就行。",
                        '<25>{#p/undyne}{#f/1}* 好在...\n  他們建的新學校還挺棒。',
                        "<25>{#p/alphys}{#f/10}* 對啊！\n* 差點忘了，\n  你現在當上老師了！"
                    ]);
                }
                addB([
                    "<25>{#p/alphys}{#f/6}* 嘿嘿...\n* 新教育政策反響很好。",
                    '<25>{#p/alphys}{#f/1}* 有了福利補貼，\n  學費低得不得了，\n  入學率大大升高。',
                    "<25>{#p/alphys}{#f/8}* 很多怪物有機會走進校園，\n  學到各種新知識。",
                    '<18>{#p/papyrus}{#f/0}...各位好啊！\n我上完物理課啦！！',
                    '<18>{#p/papyrus}{#f/4}沒想到\n時空曲率的推導\n這麼複雜...',
                    '<25>{#p/alphys}{#f/10}* ...如你所見，\n  Papyrus也在上學，他正在修\n  《曲速引力場論》這門課。',
                    '<18>{#p/papyrus}{#f/6}咦？？\n你為什麼用第三人稱\n指代我呢？？',
                    '<25>{#p/alphys}{#f/17}* ...看來他還修了\n  《文章寫作》。',
                    "<25>{#p/undyne}{#f/12}* 不就是寫一堆字嘛，\n  那玩意還用學？？",
                    '<18>{#p/papyrus}{#f/4}...等等...',
                    '<18>{#p/papyrus}{#f/7}你在給誰打電話？！',
                    "<25>{#p/undyne}{#f/1}* 是那個人類。",
                    '<18>{#p/papyrus}{#f/0}喔！喔！\n快把電話給我！！\n我要聊！',
                    '<25>{#p/undyne}{#f/14}* 你先聊，我要去上課了。\n* 學生還等著我呢。',
                    '<25>{#p/undyne}{#f/17}* 這些學生，學個\n  「魔法自衛術」都特別費勁。',
                    '<18>{#p/papyrus}{#f/0}...人類，你好！！\n近來可好？',
                    '<18>{#p/papyrus}{#f/0}...',
                    "<18>{#p/papyrus}{#f/5}看來你沒法回復。",
                    "<18>{#p/papyrus}{#f/6}沒關係！我衷心希望\n你能過得幸福，\n過得快樂！！"
                ]);
                if (SAVE.data.n.plot_date < 1.1) {
                    addB(["<18>{#p/papyrus}{#f/0}咱們進行完那場\n精彩的對決之後，\n我就一直挺惦記你。"]);
                } else if (SAVE.data.b.flirt_papyrus) {
                    addB(["<18>{#p/papyrus}{#f/0}咱們約完會之後，\n我就一直挺惦記你。"]);
                } else {
                    addB(["<18>{#p/papyrus}{#f/0}咱倆一起玩耍之後，\n我就一直挺惦記你。"]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/5}我把你的故事\n告訴了全班同學...',
                    "<18>{#p/papyrus}{#f/5}...他們現在都盼著\n哪天你能回來呢。"
                ]);
                if (SAVE.data.b.f_state_kidd_betray) {
                    addB([
                        '<18>{#p/papyrus}{#f/4}...好吧，\n我同桌算個例外。',
                        
                        '<18>{#p/papyrus}{#f/5}...呃，他說你背信棄義，\n不是好人。\n到底發生啥了？',
                        '<18>{#p/papyrus}{#f/6}...不過別擔心！！',
'<18>{#p/papyrus}{#f/6}萬一你哪天回來了...\n我一定會讓你倆\n重歸於好！！',
                        
                    ]);
                } else {
                    addB([
                        '<18>{#p/papyrus}{#f/0}有個小夥伴\n還想跟你一起走呢！！',
                        "<18>{#p/papyrus}{#f/5}每次上課時，\n那個小夥伴就坐我旁邊。",
                        '<18>{#p/papyrus}{#f/6}他說，你是他的\n救命恩人呢！！',
                        '<18>{#p/papyrus}{#f/4}看來，你成了英雄！',
                        "<18>{#p/papyrus}{#f/0}萬一你哪天回來了...\n開個歡迎會，\n我肯定叫他去！"
                    ]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/9}這是帕(TM)的專屬承諾！',
                    "<25>{#p/alphys}{#f/27}* ...等等，\n  那不是Mettaton的臺詞嗎？",
                    '<18>{#p/papyrus}{#f/4}以前嘛... 說不定。\n但現在可不是。',
                    "<18>{#p/papyrus}{#f/5}據說，Mettaton要徹底拋棄\n他的「舊商標」了。",
                    '<18>{#p/papyrus}{#f/4}轉而啟用「MTT視界」新商標。',
                    '<25>{#p/alphys}{#f/17}* 喔對，這事我也聽說了。'
                ]);
                if (iFancyYourVilliany()) {
                    addB([
                        '<25>{#p/alphys}{#f/21}* 據說，現在他拍節目\n  越來越喜歡「塑造反派」了。',
                        "<18>{#p/papyrus}{#f/4}...這麼搞，恐怕會出事。",
                        '<25>{#p/alphys}{#f/22}* 你以為我不知道嗎？！'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* 怪物們可不想\n  再「重溫」一遍\n  人類那些破事。",
                            '<25>{#p/alphys}{#f/26}* ...我可沒罵你。'
                        ]);
                    } else {
                        addB([
                            "<25>{#p/alphys}{#f/10}* 現在，怪物們對人類\n  根本沒一點怨氣了。",
                            "<25>{#p/alphys}{#f/3}* 所以，我就不明白，\n  他這麼搞，到底圖啥？"
                        ]);
                    }
                } else {
                    addB([
                        '<25>{#p/alphys}{#f/21}* 據說，現在他拍節目\n  越來越喜歡往裡面加\n  「殺人機器」要素了。',
                        "<18>{#p/papyrus}{#f/4}這麼搞，恐怕會出事。",
                        '<25>{#p/alphys}{#f/22}* 你以為我不知道嗎？！'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* 怪物們可不想\n  再「重溫」一遍人類的鐵拳。",
                            '<25>{#p/alphys}{#f/26}* ...我可沒罵你。'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/10}* 現在，怪物們都\n  越來越喜歡人類了。',
                            "<25>{#p/alphys}{#f/3}* 所以，我就不明白，\n  他這麼搞，到底圖啥？"
                        ]);
                    }
                }
                addB([
                    "<18>{#p/papyrus}{#f/5}是啊... 大夥現在都\n越來越有盼頭了。",
                    '<18>{#p/papyrus}{#f/6}...就連我的兄弟，\n也越來越樂觀了！！',
                    
                    '<18>{#p/papyrus}{#f/0}皇家衛隊大裁員\n讓他下了崗。\n他就找人開始做買賣。',
                    '<18>{#p/papyrus}{#f/4}他跟BRATTY和CATTY\n一起倒賣二手垃圾。',
                    "<18>{#p/papyrus}{#f/5}每天賣垃圾... \n我不咋認可。\n不過他高興就行。",
                    "<25>{#p/sans}{#f/0}* 我天生就是賣垃圾的料，\n  能不高興嘛？",
                    '<18>{#p/papyrus}{#f/7}SANS！！\n別冷不丁冒出來！！\n嚇死人了！！',
                    '<25>{#p/sans}{#f/2}* 嘿嘿。\n* 孩子，近況如何呀？',
                    "<25>{#p/sans}{#f/0}* 希望我那些警告和提醒\n  幫到了你。",
                    '<18>{#p/papyrus}{#f/9}啊，我知道了！！\n原來你真是個特{@fill=#ff0}務{@fill=#fff}，\n啊不，叛{@fill=#ff0}賊{@fill=#fff}！',
                    '<25>{#p/sans}{#f/0}* 說對了。\n* 我確實化身{@fill=#ff0}烏賊{@fill=#fff}，\n  潛入皇家衛隊。',
                    "<25>{#p/sans}{#f/3}* 不過，我的「潛伏」\n  也不是啥壞事。",
                    '<25>{#p/sans}{#f/2}* 畢竟，選terrestria繼任女王\n  還是我的主意呢。',
                    '<18>{#p/papyrus}{#f/1}啥？！\n居然是你的主意？！',
                    '<18>{#p/papyrus}{#f/5}真是...',
                    "<25>{#p/sans}{#f/3}* 哎呀，都是陳年舊事了，\n  就別提啦。",
                    "<25>{#p/sans}{#f/0}* 不管咋說，\n  最終的結果挺好的。\n* 這才是讓我最高興的。",
                    "<25>{#p/alphys}{#f/17}* 沒想到你沒回實驗室工作，\n  而是去做買賣了。",
                    "<25>{#p/alphys}{#f/5}* 之前離開衛隊的時候，\n  你不是說想回實驗室嗎？",
                    '<25>{#p/sans}{#f/3}* 嗯，其實嘛...\n* 幹了那麼多正經工作，\n  我也想給自己放個假。',
                    '<25>{#p/sans}{#f/2}* 不過別擔心。\n* papyrus在你身邊，\n  不也幹得挺好嘛。',
                    '<25>{#p/alphys}{#f/6}* 呃... 那倒是。',
                    '<18>{#p/papyrus}{#f/0}我盡力了！！',
                    "<25>{#p/alphys}{#f/20}* 不過...\n  有件事我一直搞不明白。",
                    '<25>{#p/sans}{#f/0}* 啥事？',
                    '<25>{#p/alphys}{#f/27}* 是這樣的：\n  我用天文望遠鏡觀測星象，\n  發現星星有時候很奇怪。',
                    
                    '<18>{#p/papyrus}{#f/6}奇怪？\n星星有啥奇怪的？！',
                    "<25>{#p/alphys}{#f/15}* 呃，不是說星星本身奇怪。",
                    '<26>{#p/alphys}{#f/23}* 而是說它的運動軌跡很怪。',
                    "<25>{#p/alphys}{#f/20}* 甚至都不能說星星在「運動」，\n  而是「躍遷」。",
                    '<25>{#p/alphys}{#f/20}* 就是從一個地方，\n  忽然跳到另一個地方。',
                    '<25>{#p/alphys}{#f/26}* 仿佛... \n  力場外面的時間\n  突然往後「跳」了幾年。',
                    "<25>{#p/sans}{#f/0}* 你確定觀測結果沒問題嗎？",
                    '<25>{#p/alphys}{#f/20}* 我又觀測了一遍，成功復現。\n* 然後，又進行了二次觀測，\n  三次觀測...',
                    '<18>{#p/papyrus}{#f/6}然後，又進行了四次觀測？',
                    '<25>{#p/alphys}{#f/21}* 當然。',
                    "<25>{#p/alphys}{#f/5}* 觀測多少遍，\n  這種「躍遷」現象始終存在。",
                    '<25>{#p/sans}{#f/3}* 喔？\n* 挺奇怪的。',
                    "<25>{#p/sans}{#f/0}* 感覺得好好研究一下。",
                    '<25>{#p/alphys}{#f/20}* 同意。',
                    "<25>{#p/sans}{#f/3}* 哎呀。\n* 快到錄音時長上限了。",
                    '<25>{#p/alphys}{#f/17}* ...喔。\n* 看來，現在得掛電話了。',
                    "<25>{#p/alphys}{#f/6}* 嗯... \n  希望你在那邊過得幸福。",
                    '<25>{#p/alphys}{#f/5}* 我們只有這樣一方天地，\n  都能找到幸福...',
                    "<25>{#p/alphys}{#f/10}* 那麼，擁有整個宇宙的你，\n  也一定能找到幸福！",
                    '<18>{#p/papyrus}{#f/0}ALPHYS，說得好！',
                    '<25>{#p/sans}{#f/2}* 嘿。\n* 孩子，多保重，好嗎？',
                    '<18>{#p/papyrus}{#f/9}保重！！\n有緣再見！！',
                    '<25>{#p/alphys}{#f/8}* ...有緣再見。',
                    '<32>{#s/equip}{#p/event}* 滴...'
                ]);
            }
            return { a, b, d, k, m };
        },
        neutral2: [
            '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#p/asgore}{#f/1}* 哈囉，年輕人。',
            '<25>{#p/asgore}{#f/1}* 不知你是否還活著，\n  更不知道你能不能\n  收到這段錄音。',
            '<25>{#p/asgore}{#f/2}* 我發送了終止自毀指令，\n  但不知飛船能否收到。',
            '<25>{#p/asgore}{#f/4}* 但如果真的一切順利，\n  救了你的命...',
            '<25>{#p/asgore}{#f/25}* 那我會由衷地高興。',
            "<25>{#p/asgore}{#f/7}* 我覺得，Asriel幹出那些事\n  不該都歸咎於你。",
            '<25>{#p/asgore}{#f/5}* 你饒恕了Papyrus，\n  放過了Muffet，也對\n  很多其他怪物抱以仁慈...',
            '<25>{#p/asgore}{#f/6}* 這些都證明，\n  你努力想浪子回頭、\n  改過自新。',
            '<25>{#p/asgore}{#f/21}* 旁邊還有個孩子\n  也想和你說幾句呢。',
            '<25>{#p/kidd}{#f/7}* 老兄，是你嗎？！',
            '<25>{#p/kidd}{#f/2}* 呃，我...\n  不記得你叫什麼了...',
            '<25>{#p/asgore}{#f/6}* 別怕，把你之前和我說的\n  都告訴人類吧。',
            '<25>{#p/kidd}{#f/6}* 好的，好的。',
            "<25>{#p/kidd}{#f/4}* 嗯，那個...",
            '<25>{#p/kidd}{#f/4}* 不管那Asriel\n  做了什麼事...',
            '<25>{#p/kidd}{#f/3}* 我始終覺得，你超酷的！',
            "<25>{#p/kidd}{#f/13}* 要是還能再見的話，\n  我們一定會玩得很開心的！",
            "<25>{#p/kidd}{#f/6}* 另外，我想...\n* 儘管我們都做過錯事，\n  受過傷...",
            '<25>{#p/kidd}{#f/5}* 但只要在一起，\n  我們肯定能從過去的陰影中\n  走出來。',
            '<25>{#p/asgore}{#f/6}* 嗯... 聽起來很棒！',
            '<25>{#p/asgore}{#f/5}* 你們之前就同甘共苦，\n  所以，這樣做就對了。',
            "<25>{#p/kidd}{#f/4}* 人類必須要走，\n  真是太遺憾了。\n* 你說是吧？",
            '<25>{#p/asgore}{#f/1}* ...是啊。',
            "<25>{#p/kidd}{#f/3}* 沒事，我朋友那麼酷，\n  肯定會沒事的。",
            "<25>{#p/kidd}{#f/1}* 保重啊，老兄！",
            '<25>{#p/asgore}{#f/20}* ...',
            '<18>{#p/papyrus}{#f/7}哎！？\n跟人類聊天\n怎麼能不叫我呢？！',
            '<18>{#p/papyrus}{#f/4}...太不公平了。',
            '<25>{#p/kidd}{#f/14}* 喲--！PAPYRUS！！！',
            '<25>{#p/kidd}{#f/1}* 骷髏老兄，\n  你也想跟人類說說話嗎？',
            "<25>{#p/kidd}{#f/2}* 正好Asgore要送我回家。",
            "<18>{#p/papyrus}{#f/0}當然！\n我可有很重要的事喔。",
            "<25>{#p/kidd}{#f/1}* 酷欸，電話給你！\n* 等會見，老兄！",
            '<25>{#p/asgore}{#f/6}* ...我先把怪物小孩\n  送回我家，去去就回。',
            '<18>{#p/papyrus}{#f/0}好！過了這麼久，\n我們終於又能聊啦，\n人類！',
            '<18>{#p/papyrus}{#f/5}呃，你可能回不了，\n那就我自己說，\n你聽著就好。',
            "<18>{#p/papyrus}{#f/6}說回正事！",
            '<18>{#p/papyrus}{#f/0}我只是想說，\n幹得漂亮。',
            '<18>{#p/papyrus}{#f/5}那個「ASRIEL」...\n想必給你添了不少麻煩。',
            '<18>{#p/papyrus}{#f/4}一路上，給你施壓，\n蠱惑你，甚至逼迫你做\n那些... 昧良心的事。',
            '<18>{#p/papyrus}{#f/5}但你，在他的威懾之下\n仍盡力不去傷害我們，\n讓很多怪物活了下來。',
            "<18>{#p/papyrus}{#f/0}所以，不必自責！",
            '<18>{#p/papyrus}{#f/9}你想成為好人的努力，\n我們都看在眼裡！',
            "<18>{#p/papyrus}{#f/6}那些努力，\n肯定是有意義的，\n對吧？",
            '<18>{#p/papyrus}{#f/6}...',
            "<18>{#p/papyrus}{#f/5}說實話...\n你離開後，\n我們都活得很艱難。",
            "<18>{#p/papyrus}{#f/5}阻止核心爆炸後...",
            '<18>{#p/papyrus}{#f/5}我和其它幫忙的人\n聊了聊。',
            '<18>{#p/papyrus}{#f/6}...\nMUFFET直接把我當空氣。',
            '<18>{#p/papyrus}{#f/6}核心的員工\n因為沒看好控制臺，\n都十分懊惱。',
            '<18>{#p/papyrus}{#f/5}而那隻人偶...',
            '<18>{#p/papyrus}{#f/5}...\n失去了很重要的親人。',
            '<18>{#p/papyrus}{#f/5}為了穩住核心，\n他的幽靈表親\n與核心融合了。',
            '<18>{#p/papyrus}{#f/6}那幽靈確實沒死...',
            "<18>{#p/papyrus}{#f/5}但再也不能開口說話，\n再也不能正常生活了。",
            "<18>{#p/papyrus}{#f/3}誰都不希望這樣...",
            '<18>{#p/papyrus}{#f/6}那人偶，每天只是\n呆呆望著核心，\n一看就是一整天。',
            '<18>{#p/papyrus}{#f/5}我想安慰安慰它，\n但不知道怎麼做才好...',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/6}不-不過，\n它肯定能挺過來的！",
            '<18>{#p/papyrus}{#f/0}我相信它！',
            '<18>{#p/papyrus}{#f/0}就像我相信你一樣。',
            '<18>{#p/papyrus}{#f/5}我相信這裡每個人...',
            '<18>{#p/papyrus}{#f/4}除了你那冒牌貨朋友。',
            '<18>{#p/papyrus}{#f/0}誰叫他砸了自己的招牌。',
            '<25>{#p/asgore}{#f/6}* 唉，我回來了。',
            '<18>{#p/papyrus}{#f/0}歡迎歡迎！',
            '<25>{#p/asgore}{#f/7}* 你應該把想說的\n  都說完了？',
            "<18>{#p/papyrus}{#f/6}其實，\n我還有很多話想說...",
            '<18>{#p/papyrus}{#f/5}但電池快沒電了。',
            '<25>{#p/asgore}{#f/1}* 明白了。',
            "<18>{#p/papyrus}{#f/5}那麼...\n我把電話給你吧。",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/2}* 他沒撒謊。',
            '<25>{#p/asgore}{#f/1}* 發送這通長途錄音，\n  需要動用巨大的能量。',
            "<25>{#p/asgore}{#f/2}* 而核心功率\n  早已大不如前...",
            '<25>{#p/asgore}{#f/4}* 畢竟，現在的核心\n  幾乎都是由一個幽靈\n  支撐和管理的...',
            '<25>{#p/asgore}{#f/2}* 所以，沒必要的話，\n  就別讓核心超負荷工作了。',
            '<18>{#p/papyrus}{#f/0}是啊，確實如此。',
            '<25>{#p/asgore}{#f/15}* 不過，結束錄音前...',
            '<25>{#p/asgore}{#f/15}* 最後給你幾句忠告。',
            '<25>{#p/asgore}{#f/14}* ...\n* 不要相信「他」。\n* 更不要成為「他」的傀儡。',
            '<25>{#p/asgore}{#f/14}* 無論「他」說什麼，\n  都絕對別信。',
            '<25>{#p/asgore}{#f/13}* 不要讓「他」為所欲為，\n  傷害別人。',
            '<18>{#p/papyrus}{#f/6}我先走了，\n拜拜！',
            '<25>{#p/asgore}{#f/14}* ...不要被「他」牽著鼻子走。\n* 不要落入暴力的深淵。',
            '<25>{#p/asgore}{#f/13}* 如果走投無路...',
            '<25>{#p/asgore}{#f/14}* ...請馬上殺了「他」，\n  不要猶豫。',
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/4}* 祝你好運。',
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        lastblook1: [
            () => [
                '<32>{#p/napstablook}* 喔...\n* 是frisk呀......',
                ...(SAVE.data.b.ufokinwotm8
                    ? [
                        '<32>* ...',
                        "<32>* ...怎麼了？\n* 為啥露出那副表情？",
                        '<32>* 是因為... 我擋路了嗎？',
                        '<32>* ...',
                        "<32>* 喔......\n* 都怪我.........",
                        '<32>* 對不起...',
                        '<32>* 我只是習慣躺在這......\n  不是故意的......',
                        "<32>* 我會走的... ",
                        '<32>* 請你......\n* 原諒我............'
                    ]
                    : [
                        "<32>* 那些工人\n  還在前門那裡幹活呢...",
                        '<32>* 感覺現在出去也沒啥意思',
                        ...(SAVE.data.b.c_state_secret4 && !SAVE.data.b.c_state_secret4_used
                            ? [
                                '<32>* ...',
                                '<32>{#p/human}* （你把「六號檔案」裡\n  那位Napstablook說的秘密\n  講給了眼前的幽靈。）',
                                '<32>{#p/napstablook}* ...一個小魔術？',
                                '<32>* 等等... 我懂了',
                                '<33>* 讓我試一下...'
                            ]
                            : [])
                    ])
            ],
            () => [
                ...(SAVE.data.b.c_state_secret4_used
                    ? ["<32>{#p/napstablook}* 謝謝你...\n* 你為我們做了那麼多，\n  我真的很感激。"]
                    : ["<32>{#p/napstablook}* 嘿...\n* 你為我們做了那麼多，\n  我真的很感激。"]),
                '<32>* 讓我們重獲自由，\n  幫助我們...',
                '<32>* ...',
                "<32>* 其實一開始，我跟表親都覺得\n  永遠也逃不出去了。",
                "<32>* 畢竟上個人類墜落後，\n  很久都沒有新人類來到這裡。",
                '<32>* 而且我們最近還聽說...\n  人類已經離開原來的星系，\n  前往其他地方了。',
                '<32>* 所以...',
                "<32>* 你能來這裡，\n  簡直就是奇蹟。"
            ],
            () =>
                SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>{#p/napstablook}* 喔對，跟你聊聊我表親的事吧...',
                        "<32>* 那次風波後，\n  情況好轉了不少",
                        "<32>* 我跟mettaton好好聊了聊。",
                        "<32>* 最終，我們決定...\n* 在歐律比亞重建蝸牛農場。",
                        "<32>* mettaton負責宣傳工作，\n  而我跟其他員工\n  一起負責飼養蝸牛。",
                        '<32>* 而且，到這裡之後，\n  我們馬上就有地方住了。',
                        '<32>* 有座房子特別善良，\n  直接就讓我們住了。',
                        "<32>* 我一看... 那房子不就是\n  undyne之前的家嘛..."
                    ]
                    : [
                        '<32>{#p/napstablook}* 喔對...\n  聊聊我表親的事吧。',
                        "<32>* 有件事，不知該不該跟你講...",
                        '<32>* 幽靈們發現，mettaton好像就是\n  我們失散多年的親人。',
                        '<32>* 我跟其他幽靈想找他聊聊...',
                        "<32>* ...效果不理想，\n  兩邊都弄得挺不愉快的。",
                        '<32>* 幽靈們你怪我，我怪你，\n  推卸責任...',
                        "<32>* 出了這事...\n  我再也不想跟mettaton\n  說一句話。",
                        '<32>* 嗯... 這話題有點沉重了',
                        '<32>* 對不起...'
                    ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* ...', '<32>* 說到「家」和「家人」...']
                    : ['<32>{#p/napstablook}* ...', "<32>* 嘿...\n* 雖然我和我的表親\n  關係不怎麼好，不過..."]),
                '<32>* 我也領養了一個孩子，\n  那孩子... 真的很出色。',
                "<32>* 孩子非常樂觀，總掛著笑容。\n* 他說，所有怪物中，\n  最喜歡的就是我...",
                '<32>* 想起他在「檔案」裡的生活...\n  我覺得，這就是緣分吧。',
                '<32>* 而且... 當我難過時，\n  那孩子總是盡力讓我開心。',
                '<32>* 幾個小時前，圍牆還沒建好...',
                '<32>* 孩子想出去看看施工現場，\n  怕去晚了就看不到了。',
                '<32>* 我跟他說，沒問題啊\n  他特別開心...',
                '<32>* 我也漸漸明白\n  大家為什麼喜歡養小孩了。'
            ],
            () => [
                '<33>{#p/napstablook}* 還有個人，\n  我覺得也要感謝一下...',
                '<32>* 那就是asgore',
                '<32>* 多虧他和alphys信任我，\n  我才能領養這個孩子。',
                '<32>* 之前，有位毛茸茸的先生\n  總來我們的蝸牛農場。\n* 我最近才知道，原來就是他。',
                "<32>* 他對那些蝸牛特別好。",
                '<32>* 蝸牛買回家之後，\n  如果發現他們受傷了，\n  asgore會幫他們療傷。',
'<32>* ...然後再做成美食。',
                '<32>* 連他那樣的人...\n  都願意信任我...',
                '<32>* ...',
                "<32>* 嗯... 我相信\n  他肯定會精心照顧你的。",
                ...(SAVE.data.b.f_state_kidd_betray
                    ? ['<32>* 就算你沒有兄弟姐妹...']
                    : SAVE.data.b.svr
                        ? ['<32>* 他會把愛奉獻給\n  你那兩個小夥伴，同時...']
                        : ['<32>* 他會把愛奉獻給\n  你那個小夥伴，同時...']),
                "<32>* 他也會把愛分享給你，\n  讓你健康快樂地成長。"
            ],
            () => [
                '<32>{#p/napstablook}* 你知道嗎...\n  在很久很久以前...',
                '<33>* 那時，我還沒開蝸牛農場...\n  怪物們還在故園生活...',
                '<32>* 每天，我平靜地生活著。',
                
                '<32>* 故園... 真是個特別的地方。',
                '<32>* 每天，光塔迸發火光，劃破夜空，\n  烈焰升騰，鋪滿整片蒼穹...',
                '<32>* 戰爭爆發前，人們安居樂業...',
                "<32>* 那時，周遭的一切我習以為常。\n  認為，生活本該如此。",
                '<32>* 經歷了這兩百多年的\n  囚籠生活，我才知道......',
                "<32>* 自由、和平絕非理所當然。"
            ],
            () => [
                '<32>{#p/napstablook}* 喔，不說這些了。',
                "<32>* 故園生活固然值得留戀，\n  但在新家園，有趣的事也不少。",
                '<32>* 就拿這裡的本土生物來說。',
                '<32>* 前不久，我到星球表面旅行。',
                "<32>* 在那裡，我見到了幾隻本土生物。\n  緊接著我發現了件好玩的事：",
                '<32>* 那些生物... \n  也學會使用魔法了。',
                "<32>* 我把這事告訴了alphys。",
                '<32>* 她說，咱們剛到這裡時做過探測，\n  結果表明，這顆行星\n  根本就沒有魔法。',
                '<32>* 難不成...',
                "<32>* ...我們給這顆星球帶來了\n  什麼新東西？"
            ],
            () => [
                '<32>{#p/napstablook}* 嘿嘿...',
                "<32>* 我是不是有點太能說了？",
                '<32>* 但你一直在我身邊傾聽',
                "<32>* 所以，frisk，我想對你說",
                '<32>* 謝謝你。'
            ],
            () => [
                '<32>{#p/napstablook}* 喔？\n* 你還沒聊夠嗎？',
                '<32>* ...',
                '<32>* 哎呀......',
                '<32>* 不知道聊點啥好了',
                "<32>* 好像想不出啥有趣的話題了...",
                '<32>* 所以，你先到別處轉轉吧'
            ],
            () => [
                '<32>{#p/napstablook}* ...呃，frisk...',
                "<32>* 我真想不出什麼話題了",
                '<32>* 要不... 給我點時間...',
                "<33>* 我肯定能想出來..."
            ],
            () => [
                '<32>{#p/napstablook}* ...喔.........',
                "<32>* 你還在這啊........",
                '<32>* 我都.........\n  想不到能聊的了.........',
                '<32>* 嗯... 要是你孤獨了，\n  想找我作伴...',
                '<32>* 那想待多久都可以的'
            ],
            () => [
                '<32>{#p/napstablook}* 嗯... 讓我想想...',
                '<32>* 其實呢... 我想到個笑話',
                '<32>* ...你想聽聽嗎？',
                "<32>* 我不咋擅長講笑話，\n  但可以試試看..."
            ],
            () => [
                '<32>{#p/napstablook}* 好的...\n* 笑話是這樣的...',
                '<32>* 為什麼幽靈說的話，\n  有的能信，有的不能信？',
                '<32>* ...',
                '<32>* 答案是... \n  有的話能信，因為它是個{@fill=#ff0}鬼才{@fill=#fff}，\n  有的話不能信，因為那話{@fill=#ff0}鬼才{@fill=#fff}信。',
                '<32>* 發現笑點了嗎？\n  「鬼才」，「鬼才」信。',
                '<32>* 果然...\n* 這笑話太爛了'
            ],
            () => [
                '<32>{#p/napstablook}* ...沒聽夠笑話，\n  想再讓我講一個？',
                '<32>* 唔... 讓我想想看...'
            ],
            () => [
                "<32>{#p/napstablook}* 想好了，\n  笑話是這樣的...",
                '<32>* 有隻幽靈洋洋自得，\n  猜猜它碰到了什麼喜事？',
                '<32>* ...',
                '<32>* 答案是... \n  這隻幽{@fill=#ff0}靈洋{@fill=#fff}洋自得，\n  因為它{@fill=#ff0}領養{@fill=#fff}了一個孩子。',
                '<32>* 嘿嘿...'
            ],
            () => ['<32>{#p/napstablook}* ...還沒聽夠？\n  還想再聽一個笑話？', '<32>* 嗯... 看你這麼想聽...\n  我再想想。'],
            () => [
                "<32>{#p/napstablook}* 好。\n* 想到了。",
                '<32>* 為什麼某人出醜時，\n  周圍總會有幽靈出沒呢？',
                '<32>* ...',
                '<32>* 答案是...\n  社死場面，又叫{@fill=#ff0}冥{@fill=#fff}場面。'
            ],
            () => [
                '<32>{#p/napstablook}* 哎呀。\n* 這個笑話不太好...',
                '<33>* 但也希望你能喜歡。'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                '<32>* 哎呀...',
                "<32>* ...我好像真想不出\n  什麼能聊的了。",
                "<32>* 你那麼認真地聽我說話，\n  要是我詞窮了... 會很自責的。",
                "<32>* blooky，快想想，快想想...",
                '<32>* ...還能聊點什麼呢...'
            ],
            () => [
                '<32>{#p/napstablook}* 等等，有了',
                '<32>* 你知道什麼是「幽靈食物」嗎？',
                '<32>* 最後一個笑話，就是關於它的。',
                "<32>* 是什麼笑話呢？\n  你肯定沒聽過。",
                '<32>* 想聽的話，現在就講給你...'
            ],
            () => [
                '<32>{#p/napstablook}* 其實，幽靈食物並非\n  只有幽靈才能吃...',
                "<32>* 任何怪物都能吃，\n  任何怪物都愛吃...",
                '<32>* 為什麼呢？\n  因為「萬物有靈」。',
                "<32>* 萬物有靈，萬物幽靈，\n  萬物皆可成為幽靈。\n* 所以，幽靈食物，大家都能吃。",
                "<32>* 不僅能吃，而且愛吃。\n* 因為「幽靈食物」的簡稱，\n  不就是「零食」嘛。"
            ],
            () => [
                '<32>{#p/napstablook}* 其實，這不完全是個笑話。\n* 因為，任何食物其實都可以\n  變成幽靈食物。',
                '<32>* 有些食物，\n  想變成幽靈食物非常容易。',
                '<32>* 比如說... 水果、奶昔，等等。',
                ...(SAVE.data.b.item_blookpie
                    ? ['<32>* 但有些食物... 比如說\n  你買的那個洋梅果凍派，\n  就很困難。']
                    : ['<32>* 但有些食物... 比如說\n  我店裡那個洋梅果凍派，\n  就很困難。']),
                '<32>* 想讓它變成幽靈食物...\n  需要消耗大量的魔法。',
                '<32>* 食物的構成越複雜，\n  想變成幽靈食物\n  就越困難。'
            ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* 有一天，我的... 啊不，\n  mettaton給我做了個蛋糕。']
                    : ['<32>{#p/napstablook}* 有一天，一位幽靈表親\n  給我做了個蛋糕。']),
                '<32>* 蛋糕的內餡，是巧克力醬，\n  蛋糕的裝飾，是巧克力棒，\n  蛋糕的一切，都是巧克力狀。',
                "<32>* 不仔細看的話，\n  我真以為那就是人類食物。",
                ...(SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>* 但其實，那個蛋糕\n  是他耗費大量的魔法\n  才轉換出來的幽靈食物...',
                        '<32>* 那天，並不是我的生日，\n  也不是什麼特殊節日。\n* 他做這些，只為了能讓我開心點。'
                    ]
                    : [
                        '<32>* 但其實，那個蛋糕\n  是表親耗費大量的魔法\n  才轉換出來的幽靈食物...',
                        '<32>* 那天，並不是我的生日，\n  也不是什麼特殊節日。\n* 表親做這些，只為了能讓我開心點。'
                    ]),
                '<32>* 我們一起品嘗蛋糕。',
                '<32>* 那天，我很幸福，'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                "<32>* 嘿...\n* 我想躺在這假裝睡會覺...",
                '<32>* 忙活了半天，\n  早就該休息一下了。',
                "<32>* ...等等，現在都早上了...",
                '<32>* 對喔，{@fill=#ff0}早{@fill=#fff}就該休息一下嘛。',
                "<32>* 早和晚...\n* 看來，到了新星球，{@fill=#ff0}早晚{@fill=#fff}得學會\n  適應晝夜更替啊。",
                '<32>* ...',
                '<32>* 嘿... 謝謝你陪我聊天，\n  frisk',
                '<32>* 要是想躺在我身邊...\n  隨時都可以喔......',
                '<32>* ...',
                '<32>* Zzz... Zzz...'
            ],
            () => [
                '<32>{#p/napstablook}* Zzz... Zzz...',
                '<32>* Zzz... Zzz...',
                "<32>{#p/basic}* 這隻幽靈不停地大聲說「z」，\n  假裝自己在睡覺。",
                choicer.create('* （躺在它身邊嗎？）', '好啊', '算了')
            ],
            () => ['<32>{#p/basic}* 幽靈還在這裡。', choicer.create('* （躺在它身邊嗎？）', '好啊', '算了')]
        ],
        lastblook2: ['<32>{#p/napstablook}* 嗚嗚嗚嗚嗚嗚嗚......', '<32>* 太棒了......'],
        lastblook3: [
            '<32>{#p/human}* （...）',
            '<32>* （你體驗到一種... 奇特的感覺。）',
            '<32>{#p/napstablook}* 喔，抱歉...\n  剛剛忘了跟你解釋...',
            '<32>* ...\n* 呃，是這樣的...',
            '<32>* 我把你的身體... 當作容器...\n* 這樣...... 我們倆就能\n  同時處在一個空間......',
            
            "<32>* 我之前也跟另一個人類試過...\n  不知為何，那個人類\n  非常享受這種「共棲」...",
            '<32>* 說不定...',
            '<32>* 你也喜歡...'
        ],
        lastblook4: [
            "<32>{#p/napstablook}* 嗯... 只要你不動，\n  就能一直「共棲」下去.....",
            '<32>* 所以...\n* 如果想保持這樣，就不要動'
        ],
        lastblook5: [
            '<32>{#p/napstablook}* 嗯...\n* 希望你喜歡這次體驗...',
            '<32>* 或至少，希望你覺得\n  這種「共棲」挺有意思...',
            
        ],
        view: () => [choicer.create('* （到外面走走？）', '出去看看', '再等等')],
        computer1: () =>
            SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （可你根本不想多在這上面\n  浪費一秒。）"]
                : ["<32>{#p/basic}* 電腦上不了網，\n  側面有個插晶片的凹槽。"],
        computer2: () => [choicer.create('* （把晶片插入電腦？）', '插入', '算了')],
        computer3: ['<32>{#p/human}* （你想再等等。）'],
        computer4: [
            '<32>{#p/basic}* 啊！\n* 謝謝你！\n* 太謝謝你了！',
            '<32>* 你對我真好！\n* 我在很遠很遠的地方，\n  也有新家啦！',
            '<32>* ...',
            '<32>* 剛剛，我和前哨站的身體\n  建立了連接。',
            '<32>* ...',
            '<32>* 一具身體，分居兩地。\n  簡直做夢都想不到！',
            '<32>* 真的... 太棒了...',
            '<32>* 親愛的旅行者，這份恩情\n  我永遠都不會忘的！'
        ],
        computer5: ['<32>{#p/basic}* 謝謝你，親愛的旅行者。\n* 因為有你，\n  我才有了未來。'],
        end1: [
            '<25>{*}{#p/asgore}{#f/6}* 一號應急預案已生效。{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* 正在啟動自毀程式。{^20}{%}'
        ],
        end2: [
            '<25>{*}{#p/asgore}{#f/6}* 一號應急預案已生效。{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* 自毀程式已遠程終止。{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* 系統即將關閉。{^20}{%}'
        ],
        save1: '<32>{#p/human}{@fill=#f00}* （還剩下$(x)個。）',
        save2: '<32>{#p/human}{@fill=#f00}* （決心。）',
        frontstop: pager.create(
            0,
            [
                "<32>{#p/basic}* 孩子，實在不好意思。\n* 咱們剛定居，\n  後院啥的都沒建好呢。",
                '<32>* 想去前院？\n  前院也沒建好呢。',
                "<32>* Asgore現在正跟我們一起\n  建院子呢，\n  估計還得幹幾個小時。",
                "<32>* 所以，你先自己在家\n  待一會吧。"
            ],
            ['<32>{#p/basic}* 再等幾個鍾，他就回來了。', '<32>* 先別出門，\n  好好在家待著。'],
            ['<32>{#p/basic}* 多等一會吧。']
        ),
        charatrigger: {
            _frontier1: pager.create(
                0,
                [
                    '<32>{#p/basic}* 原來，你的房間長這樣啊...',
                    '<32>* 總覺得有點怪...',
                    "<32>* ...我沒開玩笑，\n  總覺得和你風格有點不搭。",
                    "<32>* 要是隨你選，\n  你肯定第一個挑狗窩住。",
                    "<32>* 每天睡狗窩，啃狗糧...",
                    "<32>* 一邊吃狗糧，一邊享受\n  輕柔的撫摸...\n  活得有滋有味。"
                ],
                [
                    "<32>{#p/basic}* 你要真想吃狗糧，\n  我給你拿...",
                    "<32>* 可是... 我現在雖然能「具現化」，\n  但終歸還是個幽靈。",
                    "<32>* 所以，我只能給你拿\n  「幽靈狗糧」了。\n* 問題是，你咽得下嗎？"
                ],
                [
                    '<32>{#p/basic}* 對，我現在能「具現化」了。',
                    "<32>* 之前，我總跑到Asriel跟前，\n  努力顯形...\n* 可怎麼弄，他都看不見我。",
                    '<32>* 不過，到了這之後，\n  我就能顯形了。',
                    '<32>* 貌似只有你能看到我，\n  但也不錯了。',
                    '<32>* 最起碼，現在你能直接\n  跟我互動，\n  跟我聊天了。'
                ],
                ['<32>{#p/basic}* 對，這就叫「互動」。'],
                ['<32>{#p/basic}* 這也叫互動。'],
                ['<32>{#p/basic}* 這還叫互動！'],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* 有完沒完了。'],
                ["<32>{#p/basic}* 房間裡有趣的東西那麼多，\n  光盯著我幹嘛？"],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* 沒完了是吧。'],
                ["<32>{#p/basic}* 看來你心裡只有我。"],
                ['<32>{#p/basic}* 行了行了...', "<32>{#p/basic}* 咱倆都耗這麼久了。"],
                ['<32>{#p/basic}* 你又浪費了一點點時間。'],
                ['<32>{#p/basic}* 你又浪費了億點點時間。'],
                ['<32>{#p/basic}* 你又浪費了億萬年時間。'],
                ["<32>{#p/basic}* 趕緊幹正事去吧。"],
                []
            ),
            _frontier2: pager.create(
                0,
                [
                    '<32>{#p/basic}* 走廊，平凡的走廊。',
'<32>{#p/basic}* 但對於那時的我，\n  還有Asriel，\n  它並不平凡。',
                    '<32>* 它，是我們倆無數冒險的\n  起點...',
                    '<33>* ...說是冒險，其實只是\n  在屋裡跑來跑去，\n  不停穿梭。',
                    '<32>* ...\n* 是是是，我當然知道，\n  你就當這是「冒險」吧。',
                    '<32>* 我倆不停玩，不停玩，\n  把鏡子打碎了整整七百次。\n* 結果，「冒險」被強制叫停了。',
                    "<32>* 你都不知道我為了玩，\n  編出的理由有多離譜...",
                    '<33>* 有一次，鏡子又打碎了。\n  我是這麼跟她解釋的：',
'<33>* 在遙遠的地球，\n  有一臺粒子對撞機，\n  射出的粒子擊中了前哨站。',
                    '<33>* 粒子穿過力場，繞過城牆，\n  翻山越嶺，最終...\n* 精準地擊中了家裡的玻璃！',
                    "<32>* 嗯... 是不是\n  「離譜他媽給離譜開門——\n   離譜到家了」？"
                ],
                [
                    '<32>{#p/basic}* 而現在，\n  走廊，就是平凡的走廊。',
                    '<32>* 藉口，也只是卑劣的藉口。',
                    '<32>* 「看山是山，看水是水...」\n* 這裡面蘊含著什麼哲理呢？\n  不清楚。',
                    "<32>* 不過我倒覺得...\n  走廊那邊有隻幽靈，\n  它待的位置蠻有意思的。",
                    '<32>* 「卡在兩個房間的邊界。」\n  狀態的融合，糾纏，疊加...\n  蠻有象徵意味的。',
                    '<32>* 不過，估計只有人類幽靈\n  才會想這麼多。',
                    '<32>* 怪物裡的幽靈天生就是\n  幽靈，根本不會糾結\n  什麼「疊加」...',
                    "<32>* 不過，這隻幽靈\n  還是躺在走廊邊上比較好...",
                    '<32>* ...躺那個地方，\n  太擋道了。'
                ],
                [
                    '<32>{#p/basic}* 抱歉，跑題了。',
                    '<32>* 不過，我一直杵在這麼個\n  無聊的走廊，\n  能說出啥新花樣？',
                    '<33>* 走廊無聊，所以我無聊，\n  我無聊，所以找話聊，\n  找話聊，所以聊跑題。',
'<32>* 多合理呀。'
                ],
                ["<32>{#p/basic}* 這河狸嗎？\n* 我不到啊。"],
                ["<32>{#p/basic}* 河狸來了也無聊。"],
                ['<32>{#p/basic}* 我只知道，這好無聊。'],
                ['<32>{#p/basic}* 無聊了，怎麼辦呢？', '<32>{#p/basic}* ...等等，我知道了！\n* 出發，向新房間進發！'],
                []
            ),
            _frontier3: pager.create(
                0,
                [
                    "<32>{#p/basic}* 喔，這裡是Asgore的房間。",
                    '<32>* 大老爹果然還在堅持\n  寫日記的愛好啊...',
                    "<32>* 現在他還啥都沒寫，\n  但過不了多久，等上面有了字...",
                    '<32>* 我就可以偷偷溜進去，\n  瞟兩眼...\n* 心裡很慌，但很爽。'
                ],
                [
                    "<32>{#p/basic}* 咋了？\n* 誰不都有幾個奇怪的\n  小癖好，不敢讓別人發現？",
                    '<32>* 我挺好奇\n  你的小癖好是啥呢...',
                    "<32>* 到時候我好好調查調查。"
                ],
                [
                    "<32>{#p/basic}* 你放心，我現在\n  就在這裡，哪也不去。",
                    '<32>* 靜靜注視著... 悄悄等待著...\n  然後...',
                    "<32>* 當你偷偷做啥\n  見不得人的事時，\n  一把逮個正著！"
                ],
                ["<32>{#p/basic}* 我不會幹得太出格的。"],
                ["<33>{#p/basic}* 等你睡覺時..."],
                []
            ),
            _frontier4: pager.create(
                0,
                [
                    "<32>{#p/basic}* 我剛往外面瞄了一眼，\n  他們還擱那幹活呢。",
                    '<32>* 不過前院還是亂得不像話。',
                    "<32>* Asgore... 還玩弄\n  他那些花花草草呢，\n  沒完沒了。",
                    '<32>* 而那些核心員工...\n  正一邊優哉遊哉建門廊，\n  一邊摸魚。',
                    "<32>* 真好奇這幫人建的院子\n  會是啥樣子。",
                    "<32>* 希望這次有Asgore負責，\n  能比前哨站那個順眼一點。"
                ],
                [
                    "<32>{#p/basic}* 說是「有Asgore負責」，\n  但他只負責畫藍圖。",
                    '<32>* 昨天開工時，還是\n  Doge在指揮工人幹活。',
                    '<32>* 那時候，我也遛出去看了。',
                    "<32>* 她非常嚴厲，\n  但動員指揮很有一套。",
                    '<32>* 讓她當包工頭，\n  動員工人非常不錯。',
                    '<32>* 至於Asgore... ',
'<32>* 我很喜歡他，\n  但要是讓他來指揮工程，\n  那就完蛋了。'
                ],
                [
                    '<33>{#p/basic}* 今天早上，\n  前陽臺建好了。',
                    '<32>* 而怪物小孩跟Asriel...\n  他倆都出去看風景了。',
                    "<32>* 他倆現在簡直形影不離...\n  估計也等著你加入他們呢。",
                    "<32>* 要是在屋子裡待膩了，\n  就出去找他倆吧。",
                    '<33>* 不想遊山玩水，\n  回房間躺著也可以。\n* 隨你便。'
                ],
                [
                    '<32>{#p/basic}* 雖然說「遊山玩水」...\n  但現在這個季節還玩不了水。',
                    
                    "<32>* 但別擔心... Frisk！\n* 這世界上有山有水的地方\n  多著呢。",
                    '<32>* 比如... 沼澤溼地，\n  那裡泥濘不堪。',
                    '<32>* 到了那裡，\n  就得找一艘船了。'
                ],
                [
                    "<32>{#p/basic}* 別做夢，\n  在那種地方，還想遊過去？",
                    '<33>* 記住，遊泳要到安全的地方，\n  挑合適的時間才行。'
                ],
                [
                    '<32>{#p/basic}* 「時間」...\n  怪物有時間概念嗎？',
                    '<32>* 在太空長大，\n  或許都不知道什麼是「晝」，\n  什麼是「夜」...'
                ],
                ["<32>{#p/basic}* ...這個問題\n  又可以聊一整天。"],
                []
            ),
            _frontier5: pager.create(
                0,
                [
                    '<32>{#p/basic}* 餐桌旁，有三把小椅子...',
                    '<32>* 一把是你的，一把是他的，\n  還有一把，是怪物小孩的。',
                    "<32>* 沒關係。\n* 畢竟Asgore根本不知道\n  我的存在。",
                    '<32>* 只是...',
                    '<32>* 沒有自己的位置，\n  終究還是不太舒服。'
                ],
                [
                    "<32>{#p/basic}* 那時，我跟Asriel總喜歡\n  趁母親不注意，\n  把椅子調個包。",
                    "<32>* 有時候，Asgore也加入我們，\n  聯手捉弄她。\n* 她... 挺生氣的。",
                    '<32>* 但小孩哪管這麼多，\n  好玩就得了。',
                    '<32>* 嘿嘿，Asgore總喜歡檢查\n  Asriel的椅子上有沒有\n  太空生物。',
'<32>* 生怕Asriel不小心壓著人家。',
                    "<32>* 有一次，Asgore還跟往常一樣\n  檢查椅子。\n* 殊不知，我倆已經把椅子調了包。",
                    '<33>* 結果Toriel正打算坐下，\n  迎面看到跪在她面前\n  檢查椅子的Asgore。',
'<32>* 簡直就是冥場面。',
                    '<32>* 我們樂得不行，\n  留下Toriel自個坐在那，\n  一臉懵逼。',
                    '<32>* 不過，她後來也沒再追究。'
                ],
                () => [
                    "<32>{#p/basic}* 畢竟... Toriel挺反感\n  我們搞的這些惡作劇的。",
                    SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? "<32>* 過了這麼多年，\n  她變了很多，早就不再是\n  Asriel熟悉的那個母親了..."
                        : "<32>* 如今，她仍在獨居，\n  也不常來這裡...",
                    "<32>* 但因為有你，\n  Asriel沒那麼失落。",
                    '<32>* Asriel要是開心，\n  絕不會藏著掖著，\n  一看就能看出來。',
                    '<32>* ...',
                    '<32>* ...至少以前如此。'
                ],
                () => [
                    "<32>{#p/basic}* 人總會變，我也不該\n  總把他當成以前那個Asriel。",
                    SAVE.flag.n.killed_sans
                        ? '<32>* 他說，之前慫恿你\n  幹了壞事...'
                        : '<32>* 他說，之前做了不少\n  傷害你的事...',
                    "<32>* 果然，跟以前相比，\n  他變了不少。",
                    '<32>* 我也一樣。',
                    '<32>* 只希望，他能珍惜\n  現在的一切，過好每一天。',
                    "<32>* 他要是想找人作伴，\n  就去多陪陪他吧。"
                ],
                [
                    "<32>{#p/basic}* 暫時想不到新話題了。",
                    "<32>* 現在我們有了家，\n  有了太陽，\n  還有什麼不知足的呢？",
                    '<32>* ...你說是吧。'
                ],
                []
            ),
            _frontier6: pager.create(
                0,
                [
                    '<32>{#p/basic}* 他倆還留了個微波爐。',
                    '<32>* 不愧是他倆。',
                    "<32>* 看來，以後Asriel得\n  經常用這個微波爐\n  來填飽肚子了。",
                    '<32>* 我願稱他為「微波爐烹飪大師」。'
                ],
                [
                    "<32>{#p/basic}* 現在，我們吃的東西\n  幾乎全是大量加工，\n  合成出來的...",
                    '<32>* 各種能量轉化，化學合成，\n  根本沒幾個是手工烹飪的。\n* 真是太糟了。',
                    '<32>* 就算再糟，起碼那些\n  合成出來的東西還能吃。',
                    '<32>* 而加工都不加工了，\n  直接丟給微波爐...',
                    "<32>* 太離譜了。",
                    "<32>* 離譜到家了。"
                ],
                [
                    "<33>{#p/basic}* 這只是一己之見而已。",
                    '<32>* 按你的性格，\n  很可能想好好反駁一番。\n* 想反駁，隨意。',
                    '<32>* 但爭到最後...',
                    "<32>* 真的能找到，\n  或者說存在一個\n  絕對的真理嗎？"
                ],
                [
                    '<32>{#p/basic}* 但願怪物們能在\n  歐律比亞多找到點\n  新鮮食物。',
                    '<32>* 一開始，尋找合適新家園，\n  選擇落腳點的人，\n  是Alphys...',
                    "<32>* 所以我有點擔心，也不奇怪。"
                ],
                [
                    "<33>{#p/basic}* Asriel是微波爐烹飪大師，\n  Alphys是微波爐烹飪大王。",
                    "<32>* 談話結束。"
                ],
                ['<32>{#p/basic}* 不。', "<32>* 我拒絕交談。"],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* 我拒絕在廚房交談。'],
                []
            ),
            _frontier7: pager.create(
                0,
                [
                    "<32>{#p/basic}* 外面就是新修的陽臺...",
                    '<32>* 那些鳥兒在做什麼呢？',
                    '<33>* 歌頌房子的美麗？\n* 讚美晴朗的天氣？',
                    "<32>* 或許，它們根本不喜歡這房子，\n  也不關心天氣。\n* 那就... 有點可悲了。",
                    "<32>* 或許，外面根本就沒有鳥。\n* 這裡的鳥發出的聲音是啥樣，\n  我們完全不知道。",
                    '<32>* 或許，這顆星球根本就\n  沒有鳥。',
                    "<33>* 或許，我們聽到的「鳥鳴」\n  其實是地底深處的亡靈\n  發出的哀嗥。"
                ],
                [
                    '<32>{#p/basic}* 怪物在這裡待久了，\n  星球也許會獲得某種「魔力」。',
                    '<32>* 到那時，本土生物也會受影響，\n  對吧？',
                    '<32>* 到那時，動物會擁有意識嗎？',
                    '<32>* 到那時，\n  它們會理解我們的話嗎？\n  我們會理解他們的話嗎？',
                    '<33>* 如果沒有動物呢？',
'<32>* 如果只有亡靈呢？',
'<32>* 不要再想了。'
                ],
                [
                    '<32>{#p/basic}* 說到「行星魔法」...',
                    "<32>* 我猜，母星克伊俄斯本沒有魔法，\n  突然，母星有了魔法，\n  怪物也有了魔法。",
                    '<32>* 或者，母星本來就有魔法，\n  然後傳給了怪物。',
                    "<32>* 要想弄清楚到底是咋回事，\n  咱倆得去問問Terrestria。",
                    "<32>* 她肯定知道。"
                ],
                [
                    "<32>{#p/basic}* 別怕，Frisk。\n* 要是想出去，就大膽走出去。",
                    "<32>* 要是他倆看到了你，\n  肯定很高興。",
                    '<32>* 而且...',
                    '<32>* 如果我的分析屬實...\n  這顆星球也在等候\n  你踏出這扇門的那一刻。'
                ],
                ["<32>{#p/basic}* 你別真信，\n  我的直覺可不咋地。", "<32>* 一碰到強邏輯思維的東西，\n  比如象棋，我就菜得不行。"],
                [
                    "<32>{#p/basic}* 我「棋藝生涯」的巔峰，\n  是實現了一步跳棋連跳。",
                    '<32>* 自那以後，我的棋藝\n  就開始走下坡路了。'
                ],
                [
                    "<32>{#p/basic}* 要是沒被困在叢林裡，\n  這時候咱們也已經下山，\n  開始走「下坡路」了。",
                    '<32>* 我理解Asgore為啥\n  直接選這裡定居。',
                    "<32>* 因為這裡很安全。",
                    '<32>* 在這裡生活，領養的兩個孩子\n  還有親生兒子\n  才能更好地活下去。'
                ],
                ['<32>{#p/basic}* 在半山腰定居固然很酷，\n  但住在叢林也別有風味。'],
                []
            ),
            _frontier9: pager.create(
                0,
                [
                    '<32>{#p/basic}* 哇，是廁所。\n* 我們的廁所。',
                    '<32>* 車說，徹朔，撤碩...',
                    '<32>* 優秀的撤碩美麗的撤碩好玩的撤碩\n  一個撤碩兩個撤碩八個撤碩一百個撤碩\n  撤碩撤碩撤碩撤碩撤碩撤碩撤碩撤碩。',
                    '<32>* ...',
                    '<32>* 廁所？',
                    '<32>* ...',
                    '<32>* 撤碩！！！'
                ],
                [
                    '<32>{#p/basic}* 好吧... 說點別的。',
                    "<32>* 我覺得，羊羊蓬鬆洗髮水\n  真的太酷了。",
                    "<32>* 唉，人類用不了。",
                    '<32>* 要不... 變成一隻羊...',
                    '<32>* ...咩？'
                ],
                [
                    '<32>{#p/basic}* ...',
                    "<32>* 你說，有沒有一種可能，\n  有人會和你共用浴室？"
                ],
                []
            ),
            _frontier10: pager.create(
                0,
                [
                    "<32>{#p/basic}* 這是怪物小孩和Asriel的房間...",
                    "<32>* 想不到啥話題。",
                    '<32>* 不過，牆上的海報挺酷的。',
                    '<32>* 上面的，是故園...',
                    "<32>* 只是顏色換成了棕色調。"
                ],
                [
                    "<32>{#p/basic}* Asgore把他倆的房間\n  弄得這麼小，只能說...\n  意料之中。",
                    "<32>* 他可了解怪物的性格了。\n  「甭管是大是小，只要躺著得勁，\n   就是好臥室。」",
                    "<32>* 對怪物來說，簡直太對了！"
                ],
                ['<32>{#p/basic}* ...', '<32>* 難怪Asriel昨晚\n  不睡自己的床，\n  跑過來跟你一起睡，'],
                []
            ),
            _void: pager.create(
                0,
                [
                    '<32>{#p/basic}* 據我所知...\n  有個人喜歡長時間專注，\n  一直做一件事。',
                    '<32>* 於是就建了這個房間。',
                    "<32>* 我要是很閒的話，\n  還沒想好要幹點啥。",
                    "<32>* 反正不會那這大把時間\n  去做這麼個又枯燥，\n  又折磨人的大專案。",
                    "<32>* 我也不是那傢伙，\n  不知道那人是為了啥，\n  才做這些的。"
                ],
                []
            )
        },
        balconyX: [
            '<32>{#p/human}* （儘管美景就在眼前...）',
            "<32>{#p/human}* （...你總覺得空蕩蕩的。）\n  （好像缺了什麼。）"
        ],
        balcony0: ['<25>{#p/kidd}{#f/3}* 喔，是你呀，Frisk...', '<25>{#f/1}* 我還擔心你醒不過來呢！'],
        balcony1: () => [
            '<25>{#p/kidd}{#f/3}* ...哈哈。',
            ...(SAVE.data.b.ufokinwotm8
                ? ["<25>{#f/2}* 我做夢都沒想到，\n  自己...", '<25>{#f/4}* ...也...']
                : [
                    "<25>{#f/2}* 我做夢都沒想到，\n  自己也有了家！",
                    '<25>{#f/7}* 而且還是Asgore當爹？！',
                    '<25>{#f/1}* 一會，別的孩子也要過來\n  找咱倆玩呢...',
                    "<25>{#f/1}* 能經常開派對，一起玩啦！"
                ])
        ],
        balcony2: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/kidd}{#f/4}* 呃... 你還好嗎？',
                    "<25>{#f/8}* 夥計，我有點擔心你...",
                    '<25>{#f/7}* 遇到了不開心的事嗎？'
                ]
                : [
                    '<25>{#p/kidd}{#f/1}* 天哪！光從圖書倌的書裡\n  看到那些照片，\n  我就覺得超酷...',
                    '<25>{#p/kidd}{#f/7}* 今天，居然親眼見到了！\n* 簡直酷！斃！了！',
                    
                    '<25>{#f/2}* 要是咱倆想好好把這顆星球\n  探索一番...',
                    "<25>{#f/1}* 永遠，永遠都探索不完！"
                ],
        balcony3: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    "<25>{#p/kidd}{#f/4}* （別這樣啊，\n  我真的好擔心。）",
                    '<25>{#f/7}* Frisk，別這樣啊！',
                    '<25>{#f/7}* 求求你給點反應，\n  說句話啊！',
                    "<25>{#f/8}* 是不是我的錯...\n  我也沒做什麼啊..."
                ]
                : ["<25>{#p/kidd}{#f/2}* 你是不是也可興奮了？", '<25>{#f/1}* 有好多好多事情，\n  等著咱倆一起做呢！'],
        balcony0a: ['<25>{#p/kidd}{#f/1}* 原來，行星上的生活\n  是這樣的啊！\n* 真是超讚！'],
        balcony1a: [
            '<25>{#p/asriel1}{#f/10}* 喔？\n* 你覺得眼前這點東西\n  就是這顆星球的全貌？',
            '<25>{#f/20}* 嘿嘿，你看到的\n  只是冰山一角喔...',
            "<25>{#f/17}* 穿過這片森林，\n  你就能看到一座巍峨的大山...",
            '<25>{#f/17}* 山的後面，是一片湖泊。'
        ],
        balcony2a: [
            '<25>{#p/kidd}{#f/2}* 湖裡裝的，肯定是\n  好多好多紅紅的黏液...',
            '<25>{#f/1}* 又噁心，又酷！'
        ],
        balcony3a: ['<25>{#p/asriel1}{#f/1}* ...你敢去那裡遊泳嗎？'],
        balcony4a: ['<25>{#p/kidd}{#f/7}* ...', '<25>{#f/13}* 當然敢！\n* 但你得陪我一起去。'],
        balcony5a: [
            '<25>{#p/asriel1}{#f/21}* 呃... 要不...',
            "<25>{#f/20}* 咱倆還是到沙丘那邊\n  玩賽車吧。"
        ],
        balcony6a: ["<25>{#p/kidd}{#f/6}* 嘿嘿，是不是我一說\n  那些黏液，就怕了啊？"],
        balcony7a: [
            '<25>{#p/asriel1}{#f/8}* ...呃，我才不怕呢，\n  你個蠢貨，我-',
            '<25>{#p/kidd}{#f/8}* ...',
            "<25>{#p/asriel1}{#f/25}* ...不不不！\n* 我沒那-那個意思..."
        ],
        balcony8a: ['<25>{#p/kidd}{#f/4}* Asriel...？', '<25>{#p/kidd}{#f/4}* 你還好嗎？'],
        balcony9a: [
            '<25>{#p/asriel1}{#f/13}* ...我-我...',
            "<25>{#f/22}* 我啥都沒說，\n  我沒想責備你..."
        ],
        balcony10a: [
            "<25>{#p/asriel1}{#f/21}* ...請你原諒我，好嗎...",
            "<25>{#f/23}* 你是個很棒的怪物小孩。",
            "<25>{#p/kidd}{#f/1}* 我的名字就是「怪物小孩」！"
        ],
        balcony11a: [
            '<25>{#p/kidd}{#f/4}* 喔對了，你剛剛說啥了？\n  我沒注意。',
            '<25>{#p/asriel1}{#f/13}* ...',
            '<25>{#f/13}* ...這裡有不少沙丘，\n  不過「管狀地貌帶」\n  也是不錯的賽車場地。'
        ],
        balcony12a: ['<25>{#p/kidd}{#f/7}* 管狀地貌帶？？\n* 那是啥玩意？'],
        balcony13a: [
            "<25>{#p/asriel1}{#f/10}* 呃...\n* 你沒看星球的地質分析報告嗎？",
            "<25>{#p/kidd}{#f/1}* 「地質分析報告」又是個啥？",
            '<25>{#p/asriel1}{#f/15}* ...',
            '<25>{#f/15}* 管狀地貌帶，說白了就是\n  一片外形像許多管道的區域。',
            '<26>{#f/17}* 大型「管道」形成了懸崖，\n  中型「管道」堆積成丘陵，\n  而小型「管道」...',
            "<25>{#f/20}* 我也不知道能形成啥。",
            '<25>{#p/kidd}{#f/1}* 喔！\n* 我說怎麼叫「管狀地貌帶」呢！'
        ],
        balcony14a: [
            "<25>{#p/kidd}{#f/1}* 你覺得茫茫宇宙，\n  有沒有像我們這樣的星球？",
            '<25>{#f/2}* 我們有機會探索它們嗎？',
            '<25>{#p/asriel1}{#f/10}* 嗯...\n* 肯定有的...'
        ],
        balcony15a: () => [
            '<25>{#p/kidd}{#f/7}* 哇... 那趕緊組建一支\n  星際探險小分隊吧！\n* 朝著星辰大海，進發！',
            '<25>{#p/asriel1}{#f/27}* ...喔。',
            "<25>{#p/kidd}{#f/6}* 我們先把這裡探索個遍，\n  能去的地方都去個遍...",
            "<26>{#p/kidd}{#f/1}* 隨後，開始星際探險，\n  每到一個地方，記錄一下，\n  最終做出一張超大的星系地圖！",
            ...(SAVE.data.b.c_state_secret2_used
                ? ["<26>{#p/kidd}{#f/13}* 而且，還得搞個交流暗號。\n* 比如... Gerson式握手！"]
                : []),
            ...(SAVE.data.b.c_state_secret3_used
                ? [
                    ...(SAVE.data.b.c_state_secret2_used
                        ? ["<25>{#p/asriel1}{#f/13}* 要是運氣好，咱們還能\n  碰到其他星系的種族，\n  一同合作呢。"]
                        : ["<25>{#p/asriel1}{#f/13}* 要是運氣好，咱們還能\n  探索其他星系，\n  把它們的地圖也畫出來呢。"]),
                    "<25>{#f/13}* Alphys博士蟲洞躍遷裝置\n  還能助我們一臂之力。",
                    "<25>{#f/17}* 這樣，就不僅是星際航行，\n  而是星系航行了。"
                ]
                : [
                    '<25>{#p/asriel1}{#f/17}* 哇，不過，呃...\n* 小子，你先冷靜一下。',
                    ...(SAVE.data.b.c_state_secret2_used
                        ? [
                            '<25>{#p/asriel1}{#f/17}* 搞點握手暗號，星際探索...\n  這些固然很酷。',
                            '<25>{#f/13}* 但再往外探索，還是算了...'
                        ]
                        : []),
                    '<26>{#f/13}* 咱們花了這麼久才到這裡，\n  要是再去別的地方，\n  那真得猴年馬月了。'
                ])
        ],
        balcony16a: () =>
            SAVE.data.b.c_state_secret3_used
                ? ["<26>{#p/kidd}{#f/14}* 對啊！\n* 以後，一定要來一次\n  跨越星系的大冒險！"]
                : ['<25>{#p/kidd}{#f/3}* 哈哈，也是。\n* 但探索一下，也不賴！'],
        balcony17a: [
            '<25>{#p/asriel1}{#f/17}* 星際探險小分隊\n  目前只有咱們倆嗎？',
            '<25>{#p/kidd}{#f/1}* 是啊，夥計。\n* 我們是三人小隊！'
        ],
        balcony18a1: ['<32>{#p/basic}* ...嘿，我們三人小隊\n  其實有四個！'],
        balcony18a2: ['<25>{#p/asriel1}{#f/25}* ...！', "<25>{#f/25}* $(name)... 你..."],
        balcony19a1: ['<32>{#p/basic}* ...等等，你-也-能聽到我說話了？'],
        balcony19a2: [
            "<32>{#p/basic}* 之前，我也想和你說話...\n  試了好多次，可就是不行。",
            '<32>* 到底是什麼變了呢...'
        ],
        balcony20a: ["<25>{#p/kidd}{#f/6}* 哈哈。\n* Asriel的朋友也是我的朋友。"],
        balcony21a: ['<32>{#p/basic}* 等等，你-也能-聽到我說話？'],
        balcony22a: ["<25>{#p/kidd}{#f/1}* 這麼個大活人站在旁邊，\n  想看不見都難呢。"],
        balcony23a1: ['<32>{#p/basic}* 你還能看見我？！'],
        balcony23a2: ['<32>{#p/basic}* 喔... 天哪...'],
        balcony24a: ["<33>{#p/basic}* Asriel，我在這站了這麼久，\n  你為啥一直沒看見？\n* 我也沒跟你玩躲貓貓啊！"],
        balcony25a: ['<26>{#p/asriel1}{#f/23}* ...$(name)，我...'],
        balcony26a1: [
            "<32>{#p/basic}* 沒關係的，Asriel。\n* 別自責，別難過。",
            '<32>* 要是想哭... 就哭吧。',
            
        ],
        balcony26a2: [
            "<32>{#p/basic}* 之前我的體內\n  多了個Asriel的靈魂，\n  這顆靈魂導致我無法顯形...",
            '<32>* 那時在前哨站，\n  當我終於顯形成功後，\n  那顆靈魂很快就脫離身體了...',
            
            "<32>* ...所以，現在我應該不會消失了。",
            "<32>* 說實話，心中還是有點\n  五味雜陳。"
        ],
        balcony27a: ['<25>{#p/kidd}{#f/7}* 等等，你也是人類嗎？'],
        balcony28a: [
            '<32>{#p/basic}* 是說我嗎？',
            '<33>* 我是個幽{@fill=#ff0}靈{@fill=#fff}，{@fill=#ff0}樣{@fill=#fff}子是人類，\n  {@fill=#ff0}羚羊{@fill=#fff}兄弟有了我，開開心心，\n  也祝這位被{@fill=#ff0}領養{@fill=#fff}的小孩開開心心。',
'<32>* 懂了吧？'
        ],
        balcony29a: ['<25>{#p/kidd}{#f/14}* ...Asriel是你的兄弟？！', '<25>{#p/kidd}{#f/4}* 資訊量太大，有點接受不了...'],
        balcony30a: ["<25>{#p/kidd}{#f/1}* 反正你倆是啥關係，\n  都超酷的！"],
        balcony31a: ["<32>{#p/basic}* 太對了，我超酷的。\n* 這片大陸最酷的人類幽靈，\n  非我莫屬。"],
        balcony32a: [
            "<25>{#p/asriel1}{#f/15}* $(name)，整片大陸\n  就你一個人類幽靈啊，\n  那你肯定是第一。",
            '<25>{#f/17}* 整個星球，\n  也是就你一個人類幽靈。',
            '<25>{#f/20}* 整個星系，也是如此。',
            "<25>{#f/13}* 未來，也是如此。\n* 我不會吸收Frisk的靈魂。",
            '<25>{#f/15}* 然後，這位人類幽靈「死了」，\n  結果過了一百年，又見面了...',
            '<25>{#f/17}* 巴拉巴拉巴拉巴拉...\n* 還沒考慮那些特殊的情況。'
        ],
        balcony33a: [
            "<32>{#p/basic}* 噗。\n* Asriel，你真逗。",
            "<32>* 就算整個世界只有我一個\n  人類幽靈，我也是「最酷」的幽靈。",
            '<32>* 不信，你問那個超酷的骷髏。'
        ],
        balcony34a1: [
            '<25>{#p/kidd}{#f/2}* 你叫「$(name)」，對吧？',
            "<25>{#f/1}* 這名字真好聽。",
            '<25>{#p/kidd}{#f/6}* 我叫怪物小孩。'
        ],
        balcony34a2: ['<25>{#p/asriel1}{#f/15}* ...你剛剛...', '<33>{#p/basic}* 是的，Asriel。\n  怪物小孩剛剛說的，\n  就是那兩句話。'],
        balcony35a1: [
            '<25>{#p/asriel1}{#f/10}* 看來我沒聽錯...',
            '<25>{#p/kidd}{#f/4}* 怎麼了？\n* 是我說錯話了嗎？還是...',
            "<33>{#p/basic}* 不，不，別擔心。\n* 只是剛剛那兩句話...\n  讓我想起了一段回憶。",
            '<25>{#p/kidd}{#f/1}* 是這樣啊。\n* 希望讓你想起的\n  是幸福的回憶。'
        ],
        balcony35a2: ['<25>{#p/asriel1}{#f/23}* ...是的。'],
        balcony36a: [
            '<25>{#p/kidd}{#f/3}* 嘿，夥計們...\n* 謝謝你們在這裡陪我。',
            '<25>{#f/1}* 有了你們這些朋友，\n  生活就充滿了幸福！'
        ],
        balcony37a: [
            '<33>{#p/basic}* ...嘿嘿。\n* 如果咱們只是普通朋友，\n  那其實說不準。',
'<32>* 但我們並不只是「朋友」。',
            '<25>{#p/kidd}{#f/7}* ...？'
        ],
        balcony38a: ["<25>{#p/asriel1}{#f/17}* 還是親人。"],
        balcony39a: [
            '<25>{*}{#p/kidd}{#f/1}* 喔！\n* 我懂了！\n* 我們是親人，是不是就可以- {%}',
            '<25>{*}{#f/1}* 一起吃飯一起講故事\n  每天散步每天一起玩\n  去公園去雪山去沙丘去森林- {%}',
            '<25>{*}{#p/asriel1}{#f/20}* 是啊，是啊，那肯定的- {%}',
            "<25>{*}{#p/kidd}{#f/1}* 我們還可以去別人家過夜\n  做各種好玩的事- {^999}"
        ],
        trivia: {
            bed: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ["<25>{#p/asriel1}{#f/20}* 這床單到底幾年沒洗了..."]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （你用手撫過床單，\n  然後在上面發現了傷痕，\n  還有眼淚。）'
                            : '<33>{#p/basic}* 這張床雖然做工精良，\n  但被誰躺過許多次的痕跡\n  仍然清晰可見。',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* 躺上去肯定很舒服！'] : [])
                    ],
            plushie: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/20}* 這裡的主人\n  肯定很喜歡毛絨玩偶。']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （玩偶很柔軟，\n  但你根本提不起一點興趣。）'
                            : "<32>{#p/basic}* 看來我不是唯一一個\n  喜歡軟軟的東西的人。",
                        ...(kiddo ? ['<25>{#p/kidd}{#f/3}* 哇，可愛捏。'] : [])
                    ],
            computer: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? [
                        '<25>{#p/asriel1}{#f/15}* 以前，我下定決心\n  一定要把編程學會...',
                        '<25>{#p/asriel1}{#f/16}* ...但現在，\n  感覺反倒是這些碼農\n  該重新考慮一下人生了。'
                    ]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （你思考著，\n  是不是因為這些鬼畫符，\n  才害得自己這麼心煩。）'
                            : '<32>{#p/basic}* 等寬字體填滿了整個屏幕。\n  正文旁邊，是顏色修飾程式碼。',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* 這玩意得有好幾百年了吧？'] : [])
                    ],
            flowers: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/10}* 哎？\n  這花是什麼品種的呢？']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （你不住思考這些花的來歷。）'
                            : '<32>{#p/basic}* 花，象徵著多愁善感。',
                        ...(kiddo ? ["<25>{#p/kidd}{#f/1}* 我好像從沒見過這樣的花..."] : [])
                    ],
            x_window: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （一想到今天的事，\n  你的心裡五味雜陳。）"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* （你心想，\n  今天真是個好日子。）"] : []),
                        "<32>{#p/basic}* 美好的一天開始了！"
                    ],
            x_cab: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （柜子裡塞滿了衣服，\n  你對這些衣服毫無興趣。）"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* （柜子裡塞滿了喜歡的衣服。）"] : []),
                        '<32>{#p/basic}* 裡面的衣服真的多啊。'
                    ],
            x_bed: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （一張床。）\n* （你想倒頭就睡，\n  就不用去想那些事了。）"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ["<32>{#p/human}* （一張舒適的床。）\n* （昨晚，你睡得很香。）"]
                            : []),
                        "<32>{#p/basic}* 這床是專門為你全新定製的。"
                    ],
            x_lamp: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （一盞檯燈。）\n* （高度正好，你剛好夠得到。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 這燈矮得出奇。"])
            ],
            x_toybox: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （都是些無聊透頂的玩具。）\n  （比前哨站那些玩具還無聊。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （這些玩具總算有點意思了。）']
                            : []),
                        "<32>{#p/basic}* 這些玩具真挺好玩的..."
                    ],
            x_wash: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你沒有洗手，\n  只是呆呆地望著排水口。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你的手乾淨得很，\n  不用再洗了。）']
                            : ['<32>{#p/human}* （你在想，要是能把手\n  洗得再乾淨點就好了。）']),
                        "<32>{#p/basic}* 一個水池而已。\n* 別在它上面浪費太多時間。"
                    ],
            x_toilet: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你看都不看一眼。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你抬起了馬桶蓋。）\n* （你放下了馬桶蓋。）']
                            : []),
                        ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 一個馬桶而已，有啥好看的。"])
                    ],
            x_bathrub: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你覺得，洗個熱水澡，\n  心情可能就好點了。）']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* （你想再洗個熱水澡。）'] : []),
                        '<32>{#p/basic}* 房間裡的每樣東西\n  尺寸都正正好好的哎...'
                    ],
            x_mirror: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你注視著鏡中的自己，\n  不住回想起一路上發生的事。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 無論發生什麼，\n  你，永遠是你。"])
            ],
            x_sign1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （牌子上寫著：\n  「教你適應新星球生活」。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<33>{#p/basic}* 牌子上寫著一段指南，\n  一共五條，都是教你\n  怎麼適應新生活。',
'<32>* 說來說去，就是一句話：\n  「放開了玩。」'
                    ])
            ],
            x_sign2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （牌子上列著待辦任務清單。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<33>{#p/basic}* 上面列了一堆待辦，\n  都是關於建設新社群的工作。"])
            ],
            x_plant: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你輕輕撫摸著植物，嘆了口氣。）\n* （它好像讀懂了你的心思，\n  也不住嘆息。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你輕輕撫摸著植物，露出微笑。）\n* （它好像讀懂了你的心思，\n  也回以微笑。）']
                            : []),
                        '<32>{#p/basic}* 這株植物見到你很開心！\n* 永遠都是如此。'
                    ],
            x_desk: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你呆呆地望著空白的日記，\n  想把自己的故事寫下來，\n  可是這本日記不屬於你。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你望著空白的日記，\n  腦中不住猜想\n  日記的主人會寫些什麼。）'
                            ]
                            : []),
                        "<32>{#p/basic}* 一本日記，\n  裡面啥都沒寫。",
                        "<32>{#p/basic}* Asgore寫日記時\n  最喜歡坐的那把椅子\n  肯定還沒從運輸船上搬過來。"
                    ],
            x_paperwork: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你不禁在想，上面列出的東西\n  有沒有你的。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* 這些清單上列的\n  都是還沒搬過來的東西。'])
            ],
            x_trash: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （你看不出來垃圾桶裡有什麼...）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<32>{#p/basic}* 垃圾桶裡有一張\n  被揉皺的星花茶配方...\n* 這不是他的垃圾桶啊..."])
            ],
            x_bed_large: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （對你來說，這床還是太大了。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 大床永遠是大床。"])
            ],
            x_cactus: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你戳了一下仙人掌。）\n* （它把你戳傷了。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你戳了一下仙人掌。）\n* （結果把仙人掌戳心動了。）'
                            ]
                            : []),
                        '<32>{#p/basic}* 即使是仙人掌，\n  也能變得外向...'
                    ],
            x_booktable: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （可你根本提不起心情讀日記。）"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （這是怪物小孩的日記。）']
                            : ["<32>{#p/basic}* 這是怪物小孩的日記，\n  上面布滿了小小的咬痕。"]),
                        '<32>{#p/human}* （日記只寫了一篇，\n  你讀了讀內容...）',
                        '<32>{#p/kidding}* 「Asgore現在成我爹啦！」\n* 「總覺得有點怪怪的，\n   但也超級棒！」',
                        '<32>{#p/kidding}* 「Asgore說，我得換一身新衣服，\n   一會我就去換吧。」',
                        '<32>{#p/kidding}* 「他還給了我一本日記，\n   讓我記錄一下生活。」',
                        '<32>{#p/kidding}* 「寫日記可難不倒我，\n   我認識的字可多了！」',
                        '<32>{#p/kidding}* 「要是我那裡寫了錯別字，\n  還有Frisk幫我糾正呢！」',
                        '<32>{#p/kidding}* 「Frisk，看完後\n  別忘了給我圈一下\n  錯別字喔。」',
                        '<32>{#p/human}* （你合上了日記。）'
                    ],
            x_bed_left: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （你掀開床單，檢查了一下。）\n  （確保不會睡著睡著床塌了。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 這是怪物小孩的床。"])
            ],
            x_knickknacks: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你把小玩具重新擺了一遍，\n  打發時間。）\n* （你希望沒人發現。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 上面擺滿了各種玩具，\n  還有小飾品！"])
            ],
            x_bed_right: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你拍了拍玩偶。）\n* （不知是不是錯覺，\n  有你拍它，它好像更開心了。）',
                        "<32>{#p/basic}* 這是Asriel的床。\n* 他根本就沒在上面睡過。"
                    ]
                    : [],
            x_bookshelf: (() => {
                const pages = pager.create(
                    1,
                    [
                        '<32>{#p/basic}* 《歐律比亞地質勘探》\n* 「皇家科學部（RSD）著。」',
                        '<32>* 「對地表的初步掃描\n  揭示了該星球生態系統\n  具有極大的多樣性。」',
                        '<32>* 「本報告的每個章節\n  將聚焦於某一特定生物群落。」',
                        '<32>* 「以下為目錄。」',
                        '<32>* 「第001節 - 地下群落」\n* 「第002節 - 海洋群落」\n* 「第003節 - 結構性群落」',
                        '<32>* 「第004節 - 電磁群落」\n* 「第005節 - 空中群落」\n* 「第006節 - 森林群落」',
                        '<32>* 「第007節 - 螺旋性群落」\n* 「第008節 - 金屬群落」\n* 「第009節 - 水晶群落」',
                        "<32>* 天哪，這得有多少啊？\n* 咱們到此為止吧。"
                    ],
                    [
                        '<32>{#p/basic}* 「哈囉，熱愛園藝的朋友們！」',
                        '<32>* 「說到星花，\n  它們生長與否的關鍵...」',
                        '<32>* 「在於能否直接接觸到\n  宇宙射線。」',
                        '<32>* 「這就是它們主要生長在\n  空境的原因...」',
                        '<32>* 「然而，歐律比亞最適合種植\n  它們的地方仍然是未知的。」',
                        '<32>* 「目前建議\n  將它們種植在軌道上。」',
                        '<32>* 「五號太空站將於\n  克歷615年2月完成部署。」',
                        '<32>* 「太空站部署完畢前，\n  可考慮將其存儲在太空飛行器內。」'
                    ],
                    [
                        '<32>{#p/basic}* 「一開始，兔兔沒有依靠。」',
                        '<32>* 「突然間... 人類憑空出現。」',
                        '<32>* 「兔兔要抱抱，人類要抱抱。\n   兔兔給人類軟軟的擁抱；\n   人類給兔兔大大的擁抱。」',
                        '<32>* 「突然，災難降臨了！」\n* 「兔兔突然不能跟人類抱抱，\n   人類突然不能跟兔兔抱抱。」',
                        '<32>* 「天哪！」\n* 「兔兔的三觀碎了，\n   人類的三觀碎了。」',
                        '<32>* 「日復一日，年復一年。」\n* 「人類絞盡腦汁，尋找辦法。」',
                        '<32>* 「他夜以繼日地工作。」\n* 「一切只為了——\n   能再抱抱他的兔兔。」',
                        '<32>* 「終於啊...」\n* 「人類幹完了工作，\n   兔兔等來了人類。」',
                        '<32>* 「人類張開雙臂，\n   等待著他的兔兔...」',
                        '<32>* 「兔兔以迅雷不及掩耳之勢，\n   撲進了人類的懷裡！」',
                        '<32>* 「人類愛軟軟的兔兔，\n   兔兔愛大大的人類，\n   他們幸福地生活在一起。」'
                    ],
                    () =>
                        SAVE.data.b.c_state_secret3_used
                            ? [
                                '<32>{#p/basic}* 「蟲洞實驗報告！」\n* 「收件人：Asgore。」\n* 「發件人：Alphys。」',
                                '<32>* 「蟲洞實驗進展一切順利！」',
                                '<32>* 「多虧了Frisk，有了教授留下的\n   完整方程式，進展一直不錯。」',
                                '<32>* 「現在，甚至已經可以用蟲洞\n  轉移小物體了...」',
                                '<32>* 「在下次實驗中，計畫用蟲洞\n  發送一臺帶約束的掃描儀，\n  期待到時候的採集結果。」',
                                '<32>* 「用於星際旅行的人工蟲洞\n  有望在克歷616年5月建成！」'
                            ]
                            : [
                                '<32>{#p/basic}* 「蟲洞實驗報告。」\n* 「收件人：Asgore。」\n* 「發件人：Alphys。」',
                                '<32>* 「蟲洞實驗遇到了瓶頸。」',
                                '<32>* 「教授留下的方程式不完整。\n   靠著這樣的方程，\n   無法讓系統正常執行。」',
                                '<32>* 「我會再嘗試一下。\n   但不宜操之過急，\n   否則會有生命危險。」',
                                '<32>* 「下次實驗，我試試看\n   能不能讓蟲洞維持地久一些。」',
                                '<32>* 「短期內，無法將蟲洞\n   用於星際航行。」'
                            ],
                    [
                        '<32>{#p/basic}* 「這是一封來自『勝利號』運輸船的\n   活動邀請函！」',
                        '<32>* 「從船首到船尾，\n   各種活動：懸浮車競賽、舞會...\n   應有盡有！」',
                        '<32>* 「等我們抵達新家園時，\n   將在船尾休息室舉辦壓軸好戲！」',
                        '<32>* 「活動精彩，不容錯過！\n   快來一起盡情狂歡吧！」',
                        '<32>* 「請注意：抵達新家園後，\n   活動邀請函將失效。」',
                        '<32>* 「期待您的到來！」'
                    ],
                    [
                        '<32>{#p/basic}* 「Toriel的毛髮護理小貼士，\n   克歷614年9月。」',
                        '<32>* 「進行脫毛時，脫掉的毛髮\n   一定要妥善處理。」',
                        '<32>* 「大部分人會將毛扔到垃圾桶，\n   但我個人更喜歡塞進水槽。」',
                        '<32>* 「如果您需要經常脫毛，\n   建議購買支援垃圾回收的水槽。」',
                        '<32>* 「現在說說毛髮柔軟度的問題。\n   睡姿會明顯影響毛髮的柔軟度。」',
                        '<32>* 「如果希望頭部或身體\n   擁有柔順的毛髮，\n   請選擇側臥。」',
                        '<32>* 「如果希望四肢\n   擁有柔順的毛髮，\n   請選擇仰臥。」',
                        '<32>* 「以上就是全部心得了。」\n* 「感謝您能讀到這裡。」'
                    ]
                );
                return () =>
                    SAVE.data.b.ufokinwotm8
                        ? ["<32>{#p/human}* （可你根本沒心情看書。）"]
                        : [
                            ...(SAVE.data.b.svr
                                ? [
                                    '<32>{#p/human}* （書架上的書似乎能\n  根據閱讀者的需求\n  自動生成裡面的內容。）'
                                ]
                                : [
                                    '<32>{#p/basic}* 這些書乍一看都是空白的，\n  但你選好書，\n  裡面就會自動生成內容。'
                                ]),
                            "<32>{#p/human}* （你在控制面板上選了一本「書」，\n  待它生成完內容之後，\n  你把它拿了出來，開始閱讀...）",
                            ...pages(),
                            '<32>{#p/human}* （你把書放回了書架。）'
                        ];
            })(),
            x_endtable: () =>
                SAVE.data.b.ufokinwotm8
                    ? [
                        SAVE.data.b.water
                            ? '<32>{#p/human}* （你呆呆望著床頭櫃，\n  還有上面的杯子。）\n* （它似乎很不安。）'
                            : '<32>{#p/human}* （你呆呆望著床頭櫃。）\n* （它似乎很不安。）'
                    ]
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                SAVE.data.b.water
                                    ? '<32>{#p/human}* （你呆呆望著床頭櫃，\n  還有上面的杯子。）\n* （它好像也很開心。）'
                                    : '<32>{#p/human}* （你呆呆望著床頭櫃。）\n* （它好像也很開心。）'
                            ]
                            : []),
                        '<32>{#p/basic}* 終於... \n  見到了一個迷人的床頭櫃。',
                        ...(SAVE.data.b.water
                            ? [
                                '<33>{#p/basic}* 上面居然還有一杯電解液。\n  真是個盡職盡責的小杯子。'
                            ]
                            : [])
                    ],
            x_chasgore: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ['<32>{#p/human}* （椅子的位置完全正確。）']
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ['<32>{#p/human}* （椅子的位置基本正確。）']
                            : ['<32>{#p/human}* （椅子的位置並不正確。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* 這把椅子...\n  看書時坐著它肯定很舒服。', "<32>* Asgore怎麼會坐這麼小的椅子？"])
            ],
            x_window_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你向窗外望去，不禁思考：\n  自己到底做錯了什麼，\n  要受到這樣的精神折磨。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你向窗外望去，\n  心中充滿了對未來的期待。）'
                            ]
                            : []),
                        '<32>{#p/basic}* 有了窗，「外面」才更加真實。'
                    ],
            x_window_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你向窗外望去，不禁思考：\n  為什麼做了那麼多，\n  還是落得這樣的下場。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你向窗外望去，\n  想到自己為了到達這裡，\n  等待了多久。）"
                            ]
                            : []),
                        '<32>{#p/basic}* 有了窗，「裡面」才更加真實。'
                    ],
            x_plant_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你輕輕碰了碰植物。）\n* （它也明白你的痛苦。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你輕輕碰了碰植物。）\n* （它輕輕晃了晃，\n  發現你也在這，它很高興。）'
                            ]
                            : []),
                        '<33>{#p/basic}* 這植物懂得關心別人。'
                    ],
            x_plant_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你輕輕碰了碰植物。）\n* （它向你保證，一定能熬出頭的。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你輕輕碰了碰植物。）\n* （它很感激你。）']
                            : []),
                        '<32>{#p/basic}* 這植物非常積極樂觀。'
                    ],
            x_sign3: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （上面什麼都沒有。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        "<32>{#p/basic}* 這是一個數字相框。\n* 只要有美好的回憶，\n  它就可以將其展現出來，讓你看到。"
                    ])
            ],
            x_chair1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你發現這把餐椅相當大。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，是母親的餐椅。"]
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，仍是「王后」的餐椅。"]
                            : ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，不屬於任何人。"])
            ],
            x_chair2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你發現這把餐椅挺小的。）']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，是兄弟的餐椅。"]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，不屬於任何人。"])
            ],
            x_chair3: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （這把餐椅的主人，\n  真的還是一個小天使嗎？）\n* （你不知道。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你發現這把餐椅大小剛剛好。）',
                                "<32>{#p/basic}* 這把餐椅的主人是你喔，Frisk。"
                            ]
                            : ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，是小孩的餐椅。"])
                    ],
            x_chair4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你發現這把餐椅稍稍有點小。）']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，是某個親人的餐椅。"]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : SAVE.data.b.f_state_kidd_betray
                            ? ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，不屬於任何人。"]
                            : ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，是某隻怪物的餐椅。"])
            ],
            x_chair5: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你發現這把餐椅大得離譜。）']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，是父親的餐椅。"]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* Asgore家有幾把餐椅，\n  這把，仍是「國王」的餐椅。"])
            ],
            x_fridge: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你把手放在了冰箱外殼上。）\n* （它發出了刺耳的呻吟聲。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你把手放在了冰箱外殼上。）\n* （它發出了溫和的咕嚕聲。）']
                            : []),
                        ...[
                            ['<32>{#p/basic}* 冰箱裡幾乎是空的，\n  裡面只有一杯\n  Undyne給你留的白開水。'],
                            [
                                '<32>{#p/basic}* 冰箱裡幾乎是空的，\n  裡面只有一瓶\n  Undyne給你留的洋梅果酒。'
                            ],
                            [
                                '<32>{#p/basic}* 冰箱裡幾乎是空的，\n  裡面只有一杯Undyne\n  給你留的「熱」巧克力。',
                                "<32>* ...熱得都結冰了。"
                            ],
                            [
                                '<32>{#p/basic}* 冰箱裡幾乎是空的，\n  裡面只有一杯\n  Undyne給你留的星花茶。',
                                "<32>* ...熱得都結冰了。"
                            ]
                        ][SAVE.data.n.undyne_drink]
                    ],
            x_sink: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （水槽裡乾淨得出奇。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* 沒有羊毛，沒有頭髮...\n* 真是科技與狠活。'])
            ],
            x_drawer: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你打開了抽屜，裡面有一隻狗狗。）\n* （你摸了摸它，好讓自己開心一點。）']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* （你打開了抽屜，裡面有一隻狗狗。）\n* （你朝它揮了揮手。）'] : []),
                        '<32>{#p/basic}* 抽屜裡，有隻狗...\n* 千萬別讓Papyrus知道這事。'
                    ],
            x_stove: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你不禁想：\n  這爐子會不會也走火，\n  把房子燒了。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你不禁想，\n  這爐子能做出多少\n  美味佳餚。）']
                            : []),
                        "<32>{#p/basic}* 這爐子的型號\n  跟Undyne家那個一模一樣...",
                        '<32>* 但願這個爐子加裝了\n  防走火的安全措施。'
                    ],
            x_sign4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （牌子上寫著一個食譜。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<32>{#p/basic}* 圖卡日神羹，\n  一種為新世界而生的新湯點。',
                        '<32>* 在鍋中將香腸煎至焦黃，\n  加入適量辣椒碎。',
                        '<32>* 加入原湯少許，煮至沸騰。',
                        '<32>* 為獲得最佳口感，\n  可使用火魔法。\n  不方便的話，充氧火焰即可。',
                        '<32>* 將一塊歐律比亞土豆切丁，\n  倒入沸騰的鍋中。',
                        '<32>* 待鍋中開始閃閃發光，\n  向其中加入鮮奶油和棒棒雞。',
                        '<32>* 現在，在兆藤上取乳液適量。\n  其他途徑獲取乳液也可考慮。',
                        '<32>* 此外，也可加入羽衣甘藍或克藍芥，\n  並高溫烹煮至軟。',
                        '<32>* 完成之後，您的湯品即可端上餐桌了！'
                    ])
            ]
        },
        moniker: [
            ['靈魂殺手', '靈魂殺手', '靈魂殺手', '靈魂殺手'],
            ['黃天霸主', '黃天霸主', '霸主', '黃天霸主'],
            ['風雲劍客', '風雲劍客', '劍客', '風雲劍客'],
            ['狂怒劍皇', '狂怒劍皇', '劍皇', '狂怒劍皇'],
            ['星際遊俠', '星際遊俠', '遊俠', '星際遊俠']
        ] as [string, string, string, string][]
    },

    b_act: {
        kiss: '* 親吻',
        activate: '* 激活',
        advice: '* 建議',
        agree: '* 認同',
        alphys: '* Alphys',
        analyze: '* 分析',
        annoy: '* 發火',
        appease: '* 呼籲',
        approach: '* 靠近',
        asgore: '* Asgore',
        asriel: '* Asriel',
        asrieldreemurr: '§fill=#ff7f7f§§swirl=2/1/1.05§§hue§* Asriel Dreemurr',
        bathe: '* 洗澡',
        beckon: '* 招呼過來',
        bedtime: '* 睡覺時間',
        berate: '* 斥責',
        blind: '* 閃瞎',
        boast: '* 自誇',
        boo: '* 喝倒彩',
        boost: '* 幫助',
        bow: '* 鞠躬',
        break: '* 破壞',
        burn: '* 挖苦',
        carry: '* 帶走',
        challenge: '* 挑戰',
        charge: '* 付錢',
        check: '* 查看',
        cheer: '* 鼓勵',
        clean: '* 清潔',
        cocoa: '* 熱巧',
        comfort: '* 安撫',
        compliment: '* 稱讚',
        compose: '* 作曲',
        conclude: '* 總結',
        console: '* 安慰',
        counter: '* 反駁',
        create: '* 手搓天線',
        criticize: '* 批評',
        cuddle: '* 擁抱',
        cut: '* 剪線',
        dance: '* 跳舞',
        dream: '* 夢想',
        dinnertime: '* 晚餐時間',
        direct: '* 指導',
        disarm: '* 繳械',
        disown: '* 拔鬍子',
        diss: '* 貶損',
        distance: '* 疏遠',
        distract: '* 分心',
        ditch: '* 甩掉',
        dontpick: '* 不招惹',
        encourage: '* 鼓勵',
        escort: '* 護送',
        flash: '* 閃光',
        flirt: '* 調情',
        grin: '* 微笑',
        guide: '* 引導',
        handshake: '* 握手',
        hangout: '* 消遣',
        heckle: '* 責難',
        heel: '* 翻臉',
        highfive: '* 擊掌',
        home: '* 回家',
        hope: '* 希望',
        hug: '* 擁抱',
        hum: '* 哼唱',
        hypothesize: '* 做假設',
        ignore: '* 無視',
        inquire: '* 詢問',
        insult: '* 辱罵',
        joke: '* 講笑話',
        agreement: '* 協定',
        call: '* 電話',
        dinner: '* 晚餐',
        judgement: '* 審判',
        laugh: '* 大笑',
        lecture: '* 指責',
        leech: '* 吸血',
        lesson: '* 教學',
        mislead: '* 誤導',
        mix: '* 混音',
        mystify: '* 迷惑',
        notes: '* 筆記',
        object: '* 拒絕',
        papyrus: '* Papyrus',
        password: '* 密碼',
        pat: '* 輕拍',
        pay: '* 付錢',
        perch: '* 棲息',
        pet: '* 撫摸',
        pick: '* 招惹',
        play: '* 玩耍',
        playdead: '* 裝死',
        plead: '* 求饒',
        pluck: '* 拔鬍子',
        poke: '* 戳刺',
        pose: '* 擺姿勢',
        praise: '* 稱讚',
        promise: '* 許諾',
        punch: '* 果酒',
        puzzle: '* 謎題',
        puzzlehelp: '* 謎題求助',
        rap: '* 說唱',
        reassure: '* 安慰',
        release: '* 釋放壓力',
        resniff: '* 重新聞聞',
        rest: '* 休息',
        roll: '* 打滾',
        sample: '* 採樣',
        sans: '* Sans',
        scream: '* 尖叫',
        secret: '* 秘密',
        shout: '* 喊叫',
        shove: '* 推搡',
        siphon: '* 偷取能量',
        sit: '* 坐上去',
        slap: '* 擊打',
        smile: '* 微笑',
        someoneelse: '* 別的什麼人',
        spark: '* 引燃',
        stare: '* 瞪眼',
        steal: '* 偷竊',
        storytime: '* 故事時間',
        suggest: '* 提議',
        talk: '* 交談',
        taunt: '* 嘲諷',
        tea: '* 花茶',
        telloff: '* 批判',
        terrorize: '* 恐嚇',
        test_a: '* 融合',
        test_b: '* 移植',
        test_c: '* 注入',
        threaten: '* 威脅',
        tickle: '* 輕撫',
        topple: '* 推倒',
        toriel: '* Toriel',
        translate: '* 翻譯',
        travel: '* 靠近',
        trivia: '* 分享經驗',
        tug: '* 拽下',
        turn: '* 騙他轉身',
        undyne: '* Undyne',
        walk: '* 遛狗',
        water: '* 白開水',
        whisper: '* 耳語',
        whistle: '* 吹口哨',
        yell: '* 喊叫'
    },

    b_group_common: {
        nobody: () => (!world.genocide && world.bullied ? '* ...但是大家都逃走了。' : '* ...但是誰也沒有來。')
    },

    b_opponent_dummy: {
        act_check: ["<32>{#p/story}* 訓練人偶 - 攻擊0 防禦0\n* 殼中幽靈，祝君安寧。"],
        act_flirt: [
            '<32>{#p/human}* （你向人偶調情。）',
            "<32>{#p/basic}* 它的反應和你想的完全一樣。",
            '<32>* Toriel強忍住不笑。'
        ],
        act_hug: ['<32>{#p/human}* （你抱了抱人偶。）'],
        act_slap: ['<32>{#p/human}* （你扇了人偶一巴掌。）'],
        act_talk: [
            '<32>{#p/human}* （你跟人偶聊了幾句。）',
            "<32>{#p/basic}* 它好像不怎麼健談。",
            '<32>* Toriel看起來很高興。'
        ],
        bored: ['<32>{#p/basic}* 人偶厭倦了你意味不明的把戲。'],
        hugged: ['<32>{#p/basic}* 人偶不知為何... 臉紅了。'],
        name: '* 訓練人偶',
        slapped: ['<32>{#p/basic}* 突然...！'],
        status1: ['<32>{#p/story}* 你遭遇了訓練人偶。'],
        status2: ["<32>{#p/story}* 人偶看起來有些厭倦了。"],
        status3: ["<32>{#p/story}* 人偶呆在那，不知在想些啥。"],
        status4: ["<32>{#p/story}* 人偶差點要倒下了。"],
        talk: ['<09>{#p/basic}{#i/20}{~}.....{}']
    },
    b_opponent_maddummy: {
        epiphaNOPE1: ["<11>{#p/basic}{~}{#x3}咳，少來浪費\n我的時間！"],
        epiphaNOPE2: ['<08>{#p/basic}{~}好奇怪的\n感覺。'],
        act_check: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ["<32>{#p/story}* 開心人偶 - 攻擊0 防禦0\n* 它的夢想成真啦！"]
                : ['<32>{#p/story}* 憤怒人偶 - 攻擊30 防禦255\n* 免疫一切物理攻擊。'],
        act_flirt: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* （你向開心人偶調情。）',
                    "<32>{#p/basic}* 它正沉浸在夢想成真的喜悅之中，\n  沒聽到你的話。"
                ]
                : ['<32>{#p/human}* （你向憤怒人偶調情。）', "<32>* 它的反應跟你想的完全一樣。"],
        act_hug: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/human}* （你抱了抱開心人偶。）']
                : ['<32>{#p/human}* （你抱了抱憤怒人偶。）'],
        act_slap: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* （你扇了開心人偶一巴掌。）',
                    '<32>{#p/basic}* 開心人偶不敢再輕舉妄動，\n  匆匆逃走了。'
                ]
                : ['<32>{#p/human}* （你扇了憤怒人偶一巴掌。）'],
        act_talk: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* （你想和開心人說說話。）',
                    "<32>{#p/basic}* 它正沉浸在夢想成真的喜悅之中，\n  沒聽到你的話。"
                ]
                : [
                    '<32>{#p/human}* （你跟憤怒人偶聊了幾句。）',
                    "<32>* 它好像不怎麼健談。",
                    '<32>* 然而，現在沒人\n  對你的行為感到高興了。'
                ],
        boredTalk: [
            '<11>{#p/basic}{~}{#x3}搞什麼？',
            '<11>{#p/basic}{~}{#x1}你就不做點啥？',
            '<11>{#p/basic}{~}{#x4}我對你來說\n是空氣嗎？？',
            '<11>{#p/basic}{~}{#x4}...',
            "<11>{#p/basic}{~}{#x4}我都沒法\n對你發火！！！",
            "<11>{#p/basic}{~}{#x4}你純粹\n就是在那...\n一動不動！",
            '<11>{#p/basic}{~}{#x4}你... 嘎啊！\n滾！快滾！',
            '<11>{#p/basic}{~}{#x4}麻溜點，陪\nNAPSTABLOOK\n聽音樂去，或者\n幹點別的都行！'
        ],
        changeStatus1: ['<32>{#p/story}* 憤怒人偶把棉花\n  彈得到處都是。'],
        changeStatus2: ['<32>{#p/story}* 機械噪聲在房間中迴響。'],
        fightFail: [
            '<11>{#p/basic}{~}{#x1}愚蠢。\n愚蠢！\n愚蠢！',
            '<11>{#p/basic}{~}{#x3}就算你打到了\n我的身體...',
            "<11>{#p/basic}{~}{#x4}...也傷不到我！",
            "<11>{#p/basic}{~}{#x1}我這不\n還是沒有實體，\n你這棉花腦袋！！"
        ],
        final1: () => [
            "<11>{#p/napstablook}{~}對不起，\n打擾你們了，\n對吧...",
            '<11>{#p/napstablook}{~}我一過來，\n你的朋友就走了...',
            ...(SAVE.data.n.state_wastelands_napstablook === 2
                ? [
                    "<11>{#p/napstablook}{~}等等...\n你是不是\n打過我來著...",
                    "<11>{#p/napstablook}{~}呃呃...\n挺尷尬。",
                    '<11>{#p/napstablook}{~}抱歉...'
                ]
                : [
                    '<11>{#p/napstablook}{~}喔天啊...\n你們剛才好像\n玩得挺開心的...',
                    '<11>{#p/napstablook}{~}喔天啊...\n我只是想\n打個招呼...',
                    '<11>{#p/napstablook}{~}喔天啊......\n...........\n...........\n...........\n...........'
                ])
        ],
        gladTalk1: ['<08>{#p/basic}{~}謝啦！'],
        gladTalk2: ['<08>{#p/basic}{~}謝謝你！'],
        gladTalk3: ['<08>{#p/basic}{~}你真棒！'],
        gladTalk4: ['<08>{#p/basic}{~}真不錯！'],
        gladTalk5: ['<08>{#p/basic}{~}好！'],
        gladTalk6: ['<08>{#p/basic}{~}...'],
        hugTalk1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<08>{#p/basic}{~}我的\n接觸\n恐懼症...',
                    "<08>{#p/basic}{~}消失啦！",
                    '<08>{#p/basic}{~}人類...\n謝謝你...',
                    "<08>{#p/basic}{~}我從未\n感到\n如此幸福..."
                ]
                : SAVE.data.n.state_wastelands_dummy === 4
                    ? ['<11>{#p/basic}{~}{#x4}搞什麼？\n不要啊！！']
                    : ['<11>{#p/basic}{~}{#x3}別-別..！\n我有\n接觸\n恐懼症！'],
        hugTalk2: ['<11>{#p/basic}{~}{#x4}快停下！'],
        hugTalk3: ['<11>{#p/basic}{~}{#x2}少來這套！！'],
        hugTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        name: () => (16 <= SAVE.data.n.kills_wastelands ? '* 開心人偶' : '* 憤怒人偶'),
        phase2Talk1: ["<11>{#p/basic}{~}{#x1}看老子\n不弄死你，\n扯出你的靈魂！"],
        phase2Talk2: ["<11>{#p/basic}{~}{#x1}老子\n要拿你的靈魂\n滅了那力場！"],
        phase2Talk3: ['<11>{#p/basic}{~}{#x6}...我會受到\n萬眾愛戴，\n萬人敬仰！'],
        phase2Talk4: ['<11>{#p/basic}{~}{#x4}到那時\n我要啥\n就有啥了！'],
        phase2Talk5: ["<11>{#p/basic}{~}{#x3}嗯？\n對，應該能\n順帶給我表親\n報個仇。"],
        phase2Talk6: ['<11>{#p/basic}{~}{#x5}...我的表親\n到底在不在乎呢？'],
        phase2Talk7: ['<11>{#p/basic}{~}{#x4}管他呢。\n管他呢。\n管-他-呢。'],
        phase2Talk8: ['<11>{#p/basic}{~}{#x1}...'],
        phase3Talk1: ['<11>{#p/basic}{~}{#x1}機器人偶！\n使用魔法飛彈！'],
        phase3Talk2: ['<11>{#p/basic}{~}{#x3}機器人偶！\n再來！'],
        phase3Talk3: ["<11>{#p/basic}{~}{#x5}機器人偶！\n咋這麼\n沒本事呢？？？"],
        phase3Talk4: ['<11>{#p/basic}{~}{#x4}機器人偶！\n最終攻擊！'],
        phaseChange1: [
            '<11>{#p/basic}{~}{#x2}痛死了，\n你們這些\n棉花腦袋！！',
            '<11>{#p/basic}{~}{#x1}用{@fill=#f00}魔法{@fill=#000}的時候\n往哪瞄呢！',
            '<11>{#p/basic}{~}{#x4}...',
            '<11>{#p/basic}{~}{#x4}嘿！\n聽著！',
            '<11>{#p/basic}{~}{#x3}「{@fill=#f00}魔法{@fill=#000}」那事，\n你就當沒聽見！'
        ],
        phaseChange2a: ['<11>{#p/basic}{~}{#x4}夥計們！'],
        phaseChange2b1: [
            '<11>{#p/basic}{~}{#x1}全是棉花腦袋。\n棉花腦袋！\n棉花腦袋！',
            '<11>{#p/basic}{~}{#x3}老子沒說\n不要衝著我\n攻擊嗎？',
            '<11>{#p/basic}{~}{#x3}得得得...'
        ],
        phaseChange2b2: ["<11>{#p/basic}{~}{#x4}一幫飯桶！\n老子炒了你們！\n老子有更好的！"],
        phaseChange2c: [
            '<11>{#p/basic}{~}{#x4}哈哈哈。\n哈哈哈！\n哈-哈-哈！',
            "<11>{#p/basic}{~}{#x3}這就讓你\n見識見識\n我的真本事...",
            "<11>{#p/basic}{~}{#x6}靠那些\n不是飯桶的\n夥計們！"
        ],
        phaseChange3a1: [
            '<11>{#p/basic}{~}{#x3}咋...\n咋可能呢！',
            '<11>{#p/basic}{~}{#x3}這些傢伙\n比之前那些\n還菜！'
        ],
        phaseChange3a2: [
            '<11>{#p/basic}{~}{#x1}我不在乎。\n我不在乎！\n我-不-\n在-乎！',
            "<11>{#p/basic}{~}{#x4}老子才\n不需要朋友！！"
        ],
        phaseChange3b: ["<11>{#p/basic}{~}{#x6}我還有\n刀子呢！！"],
        phaseChange3c1: ["<11>{#p/basic}{~}{#x3}我...", '<11>{#p/basic}{~}{#x3}沒刀子了。'],
        phaseChange3c2: [
            "<11>{#p/basic}{~}{#x4}沒事！！！",
            "<11>{#p/basic}{~}{#x4}我傷不著你，\n你也傷不著我！",
            "<11>{#p/basic}{~}{#x1}我要你在這\n和我戰鬥..."
        ],
        phaseChange3c3: ['<11>{#p/basic}{~}{#x1}一輩子。'],
        phaseChange3c4: ['<11>{#p/basic}{~}{#x4}一輩子！'],
        phaseChange3c5: ['<11>{#p/basic}{~}{#x6}一-輩-子 ！！！！'],
        phaseChange3d: ['<11>{*}{#p/basic}{~}{#x6}啊哈哈哈哈\n哈哈哈哈哈\n哈哈哈哈哈\n哈哈哈哈哈\n哈哈哈哈哈{%}'],
        phaseChange3e: [
            '<11>{*}{#p/basic}{~}{#x2}什...\n這什麼鬼！？{^20}{%}',
            '<11>{*}{#p/basic}{~}{#x6}呃啊！\n下酸雨了！？{^20}{%}',
            "<11>{*}{#p/basic}{~}{#x4}算了算了！\n我得開溜了！！{^20}{%}"
        ],
        randStatus1: ['<32>{#p/story}* 要是能找到氣閘，\n  憤怒人偶就把你扔出去了。'],
        randStatus2: ['<32>{#p/story}* 憤怒人偶正使喚著它的彈幕。'],
        randStatus3: ['<32>{#p/story}* 憤怒人偶瞪著一個傳送門，\n  轉過頭來又瞪著你。'],
        randStatus4: ['<32>{#p/story}* 憤怒人偶暴跳如雷。'],
        randStatus5: ['<32>{#p/story}* 有股紡織廠的味道。'],
        gladStatus1: ['<32>{#p/story}* 開心人偶很慶幸自己來了這裡。'],
        gladStatus2: ["<32>{#p/story}* 開心人偶正規劃著\n  今後的美好人生。"],
        gladStatus3: ['<32>{#p/story}* 開心人偶看起來很滿足。'],
        randTalk1: ['<11>{#p/basic}{~}{#x1}愚蠢。\n愚蠢！\n愚蠢！'],
        randTalk2: ['<11>{#p/basic}{~}{#x1}沒用。\n沒用！\n沒-用！'],
        randTalk3: ['<11>{#p/basic}{~}{#x1}可悲。\n可悲！\n可-悲！'],
        randTalk4: ['<11>{#p/basic}{~}{#x1}貧弱。\n貧弱！\n貧-弱！'],
        slapTalk1: ['<11>{#p/basic}{~}{#x6}好你個...！'],
        slapTalk2: ['<11>{#p/basic}{~}{#x4}你玩我呢？？'],
        slapTalk3: ['<11>{#p/basic}{~}{#x2}髒手拿遠點！'],
        slapTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        status1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/story}* 開心人偶打算放你走。']
                : ['<32>{#p/story}* 憤怒人偶攔住了去路！']
    },
    b_opponent_moldsmal: {
        epiphany: [
            ['<08>{#p/basic}{~}\x00*黏液聲*'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}咕嚕！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}\x00*性感\n扭動*']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}\x00*開心\n扭動*']
                            : ['<08>{#p/basic}{~}\x00*臂中\n抖動*'],
            ['<08>{#p/basic}{~}最後一咕。'],
            ['<08>{#p/basic}{~}\x00*閃亮\n扭動*']
        ],
        act_check0: ['<32>{#p/asriel2}* Gelatini，沒腦子的粘球。\n* 有什麼好說的？'],
        act_check: ['<32>{#p/story}* GELATINI - 攻擊6 防禦0\n* 典型印象：身段妖嬈氣質好，\n  就是沒大腦...'],
        act_check2: ["<32>{#p/story}* GELATINI - 攻擊6 防禦0\n* 應季的色彩令它更為迷人。"],
        act_check3: ['<32>{#p/story}* GELATINI - 攻擊6 防禦0\n* 與你所喜歡的類別相同。\n* 刻板印象的那種。'],
        act_check4: ['<32>{#p/story}* GELATINI - 攻擊6 防禦0\n* 這位超級模特早已輝煌不再。'],
        act_flirt: [
            '<32>{#p/human}* （你扭動著你的臀部。）\n* （Gelatini用扭動回應你。）',
            '<33>{#p/basic}* 真是有意義的交流！'
        ],
        act_imitate: [
            '<33>{#p/human}* （你輕輕地拍了拍Gelatini。）\n* （它的身體變色了。）',
            "<32>{#p/basic}* 這是Gelatini高興時的顏色！"
        ],
        act_slap: [
            '<32>{#p/human}* （你使勁扇了Gelatini一巴掌。）',
            '<32>{#p/basic}* Gelatini身體發生凹陷，\n  但不久便恢復原形。'
        ],
        act_slap2: [
            '<32>{#p/human}* （你用盡全身力氣，\n  狠狠扇了Gelatini一巴掌。）',
            '<32>{#p/basic}* Gelatini的根基被動搖了！'
        ],
        act_slap3: [
            '<32>{#p/human}* （你用盡全身力氣，\n  狠狠扇了Gelatini一巴掌。）',
            '<32>{#p/basic}* Gelatini逃離了現場！'
        ],
        idleTalk1: ['<08>{#p/basic}{~}吐泡泡..'],
        idleTalk2: ['<08>{#p/basic}{~}擠擠..'],
        idleTalk3: ['<08>{#p/basic}{~}\x00*黏液聲*'],
        name: '* Gelatini',
        perilStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* 這可不是什麼好事..."]
                : ['<32>{#p/story}* Gelatini開始腐爛了。'],
        sexyChat: ['<08>{#p/basic}{~}\x00*性感\n扭動*'],
        status1: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini把身體挺成正方形。'] : ["<32>{#p/story}* 一對Gelatini跳了過來。"],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini。']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* 噓... 它在思考！"]
                    : ['<32>{#p/story}* Gelatini靜靜地凝結著。'],
        status3: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini。'] : ['<32>{#p/story}* Gelatini樂觀地等待著。'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini。']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* 這裡一個泡泡，那裡一個泡泡...']
                    : ['<32>{#p/story}* Gelatini正在沉思。'],
        status5: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini。']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* 你知道，\n  Gelatini到底是用什麼做的嗎？']
                    : ['<32>{#p/story}* 空氣中飄來陣陣青檸果凍的清香。'],
        status6: ['<32>{#p/story}* 現在，只剩一個了。'],
        status8: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* 只剩我們仨啦！']
                : ['<32>{#p/story}* 這隻Gelatini只能獨自吐泡泡了。']
    },
    b_opponent_spacetop: {
        epiphany: [
            ['<08>{#p/basic}{~}我要去\n其他地方\n進行\n通訊了。'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}預警廣播\n很受\n歡迎！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}喔...\n我喜歡\n這種訊號\n...']
                        : SAVE.data.b.oops
                            ? ["<08>{#p/basic}{~}我現在\n在你的\n訊號\n波長內！"]
                            : ['<08>{#p/basic}{~}訊號...\n緊貼在我\n身上...'],
            ["<08>{#p/basic}{~}我只是在\n浪費\n帶寬..."],
            ["<08>{#p/basic}{~}我馬上\n給你電匯\n付款！"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf，太空人，渴望引人注目。\n* 除了自己的天線，他什麼都不在乎。']
                : ["<32>{#p/story}* ASTRO SERF - 攻擊11 防禦4\n* 這個青年想知道自己為啥不叫\n  「收音劫克」。"],
        act_check2: ['<32>{#p/story}* ASTRO SERF - 攻擊11 防禦4\n* 這個青年很欣賞你的時尚感。'],
        act_check3: ['<32>{#p/story}* ASTRO SERF - 攻擊11 防禦4\n* 這個青年接收到了\n  所有正確的訊號。'],
        act_check4: [
            '<32>{#p/story}* ASTRO SERF - 攻擊11 防禦4\n* 企圖劫持一個收音機\n  來尋求幫助。'
        ],
        act_compliment: ['<32>{#p/human}* （你說Astro Serf的天線\n  真是太棒了。）'],
        act_flirt: ['<32>{#p/human}* （你向Astro Serf調情。）'],
        complimentTalk1: ["<08>{#p/basic}{~}嘖！\n誰不\n知道！"],
        complimentTalk2: ['<08>{#p/basic}{~}嫉妒了？\n真可憐喔，\n哈哈！'],
        createStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf。']
                : ["<32>{#p/story}* Astro Serf小心翼翼地確定著\n  你有沒有看它的天線。"],
        createStatus2: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Astro Serf。'] : ['<32>{#p/story}* Astro Serf被打動了。'],
        createTalk1: ["<09>{#p/basic}{~}喂！！！\n我的天線\n在頭上呢。"],
        createTalk2: ['<08>{#p/basic}{~}啊？\n你在做甚？'],
        createTalk3: ["<08>{#p/basic}{~}不是.. 這\n怎麼可能！"],
        createTalk4: ['<08>{#p/basic}{~}哇喔...\n你怎麼\n做的？？'],
        createTalk5: ["<08>{#p/basic}{~}你在做..\n你自己的\n天線？"],
        act_create: () =>
            [
                ['<32>{#p/human}* （你開始設計自己的天線。）', '<32>{#p/basic}* 但... 怎麼設計？'],
                ['<32>{#p/human}* （你做好了天線，\n  把它戴了上去。）'],
                [
                    '<32>{#p/human}* （你開始做另一根天線。）',
                    '<32>{#p/basic}* Astro Serf被你整懵了，\n  退出了戰鬥。'
                ]
            ][battler.target?.vars.create ?? 0],
        flirtStatus1: ['<32>{#p/story}* Astro Serf不喜歡你的裝束。'],
        flirtStatus2: ['<32>{#p/story}* Astro Serf墜入愛河。'],
        flirtTalk1: ['<08>{#p/basic}{~}沒得談！\n因為你沒\n天線！'],
        flirtTalk2: ['<08>{#p/basic}{~}什麼...？\n額..\n我..\n你..'],
        genoStatus: ['<32>{#p/asriel2}* Astro Serf。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 離死不遠了。'] : ["<32>{#p/story}* Astro Serf的衣服松垮垮的。"],
        idleTalk1: ["<08>{#p/basic}{~}你的\n天線呢？"],
        idleTalk2: ['<08>{#p/basic}{~}你的腦袋\n看起來..\n光禿禿的'],
        idleTalk3: ['<08>{#p/basic}{~}多棒的\n天線啊！\n（我的！）'],
        idleTalk4: ["<09>{#p/basic}{~}這不是\n輻射！\n這是訊號\n反饋。"],
        idleTalk5: ['<08>{#p/basic}{~}我只愛我\n的天線！'],
        justiceTalk: ['<08>{#p/basic}{~}你做了\n什麼...'],
        name: '* Astro Serf',
        randStatus1: ['<32>{#p/story}* Astro Serf想在身上其他地方\n  也裝上天線。'],
        randStatus2: ['<32>{#p/story}* Astro Serf檢查了一下\n  他的天線還在是否那裡。'],
        randStatus3: ['<32>{#p/story}* Astro Serf在考慮配一件衣服。'],
        randStatus4: ['<32>{#p/story}* 聞起來像鋰。'],
        status1: ['<32>{#p/story}* Astro Serf昂首闊步走了過來。'],
        stealTalk1: ['<08>{#p/basic}{~}給我\n猜中了！！！\n你個小偷！！'],
        stealTalk2: ['<08>{#p/basic}{~}時尚警察\n快救我\n啊！！！'],
        act_steal: () =>
            battler.hurt.includes(battler.target!)
                ? [
                    "<33>{#p/human}* （你偷了Astro Serf的天線。）\n* （它的太空衣掉下來了。）",
                    '<33>{#p/basic}* 看起來它一直由鋰驅動。'
                ]
                : ["<32>{#p/human}* （你嘗試去偷Astro Serf的天線，\n  但它還沒變得足夠弱。）"]
    },
    b_opponent_space: {
        epiphany: [
            ["<08>{#p/basic}{~}好吧，\n我將獨自\n閃耀。"],
            () =>
                world.meanie
                    ? ["<08>{#p/basic}{~}我...\n不擋你\n路了..."]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ["<08>{#p/basic}{~}你覺得\n我...\n喔..."]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}願我們\n之間的\n晶體永遠\n閃耀。']
                            : ['<08>{#p/basic}{~}小心...\n我很鋒利\n...'],
            ['<08>{#p/basic}{~}我應該\n衰變...'],
            ["<08>{#p/basic}{~}我的錢\n都給你了\n..."]
        ],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 鋰塊。\n* 對，就這樣。"]
                : ['<32>{#p/story}* 鋰塊 - 攻擊1 防禦0\n* 丟了它的太空衣...'],
        act_reassure: ['<32>{#p/human}* （你告訴鋰塊仍然很棒。）'],
        genoStatus: ['<32>{#p/asriel2}* 鋰塊。'],
        happyStatus: ["<32>{#p/story}* 鋰塊不介意它的身份。"],
        happyTalk1: ['<08>{#p/basic}{~}是啊...\n我也喜歡\n我這樣。'],
        happyTalk2: ['<08>{#p/basic}{~}嗯...\n天線是\n用來\n裝腔作勢\n的。'],
        happyTalk3: ['<08>{#p/basic}{~}所以你\n仍然可以\n對我印象\n深刻？'],
        happyTalk4: ['<08>{#p/basic}{~}我只是想\n讓你覺得\n我很酷。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 也要去見閻王了。'] : ["<32>{#p/story}* 它正在瓦解。"],
        idleTalk1: ['<08>{#p/basic}{~}我..\n我..'],
        idleTalk2: ['<08>{#p/basic}{~}我還能說\n什麼呢\n...'],
        idleTalk3: ["<08>{#p/basic}{~}還有何\n意義..."],
        idleTalk4: ['<08>{#p/basic}{~}好...\n孤獨...'],
        name: '* 鋰塊',
        randStatus1: ['<32>{#p/story}* 再也沒有「Astro Serf」了。'],
        randStatus2: ['<32>{#p/story}* 聞起來像鋰電池。']
    },

    b_party_kidd: {
        mkNobody: ['<25>{#p/kidd}{#f/4}* 周圍怎麼一個人也沒有，\n  是我的錯覺嗎...'],
        mkDeath1: [
            '<32>{#p/kidding}* 呃...',
            "<32>* 對手為啥是這樣消失的呢？",
            '<32>* 嗯... 我們打了對手。\n  估計太害怕，就傳送走了。\n* 哈哈，肯定是的。'
        ],
        mkDeath2: ['<32>{#p/kidding}* 又消失了？', "<32>* 該死，為啥我沒有\n  這麼酷的傳送器呢！？"],
        mkDeath3: ["<32>{#p/kidding}* 消失了..."],
        mkDeath4: ['<32>{#p/kidding}* ...'],
        mkDeath1OW: [
            '<25>{#p/kidd}{#f/4}* 呃...',
            "<25>* 對手為啥是這樣消失的呢？",
            '<25>{#f/1}* 嗯... 我們打了對手，\n  所以...',
            '<25>* 估計太害怕，就傳送走了。\n* 哈哈，肯定是的。'
        ],
        mkDeath2OW: [
            '<25>{#p/kidd}{#f/4}* 又消失了？',
            "<25>{#f/1}* 該死，為啥我沒有\n  這麼酷的傳送器呢！？"
        ],
        mkDeath3OW: ["<25>{#p/kidd}{#f/4}* 消失了..."],
        mkDeath4OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkBully1: [
            '<32>{#p/kidding}* 呃...',
            '<32>* 對手好像嚇壞了...',
            "<32>* 希望我們下手沒那麼重..."
        ],
        mkBully2: ['<32>{#p/kidding}* 那位也...！', '<32>* 我們打得那麼狠嗎...？'],
        mkBully3: ['<32>{#p/kidding}* ...'],
        mkBully1OW: [
            '<25>{#p/kidd}{#f/4}* 呃...',
            '<25>* 對手好像嚇壞了...',
            "<25>* 希望我們下手沒那麼重..."
        ],
        mkBully2OW: ['<25>{#p/kidd}{#f/7}* 那位也...！', '<25>{#f/4}* 我們打得那麼狠嗎...？'],
        mkBully3OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkShyrenDeath: ['<25>{#p/kidd}{#f/4}* 嘿...', "<25>{#p/kidd}{#f/1}* 大家都去哪了？"],
        mkMagic1: [
            "<32>{#p/kidding}* 喲... 我還不會釋放很酷的魔法...",
            '<32>{#p/kidding}* 不過，嗯... 我可以幫你療傷！'
        ],
        mkMagic2a: ['<32>{#p/kidding}* 治療術！'],
        mkMagic2b: ['<32>{#p/kidding}* 健康與你同在！'],
        mkMagic2c: ['<32>{#p/kidding}* 看好了！'],
        mkNope: ['<32>{#p/kidding}* 不要再讓我戰鬥了...'],
        mkTurn1: ["<32>{#p/kidding}* 幫幫我，我從來沒戰鬥過！\n* 我要怎麼做！？"],
        mkTurn2: ['<32>{#p/kidding}* 呃... 幫我！'],
        mkTurn3: ["<32>{#p/kidding}* 我... 我好像會了。"],
        mkTurnAct1: ['<32>{#p/kidding}* 喔！喔！', '<32>* 我知道要怎麼行動！', '<32>* 看好了...！'],
        mkWeaken1: ["<32>{#p/kidding}* 真的要這麼做嗎...？\n* 對手好像不喜歡這樣...", '<32>* ...'],
        mkWeaken2: ['<32>{#p/kidding}* 這麼做真的好嗎...？', '<32>* ...'],
        mkWeaken3a: ['<32>{#p/kidding}* 呃...'],
        mkWeaken3b: ['<32>{#p/kidding}* 嗯...'],
        mkWeaken3c: ['<32>{#p/kidding}* 呃...'],
        
        mkTurnActRand1: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* 怪物小孩在網裡不停掙扎，\n  還給Muffet擺了個鬼臉。'],
                    ['<32>{#p/story}* 怪物小孩在網裡\n  大喊大叫，不停掙扎。'],
                    ['<32>{#p/story}* 怪物小孩發出一陣瘮人的笑聲。']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* 怪物小孩哼了一段\n  瘮人的旋律。'],
                        ['<32>{#p/story}* 怪物小孩嚷著駭人的歌詞。'],
                        ['<32>{#p/story}* 怪物小孩瘋狂地跺腳。']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* 怪物小孩不停地對地上的贓汙\n  指指點點。'],
                            ['<32>{#p/story}* 怪物小孩向Skrubbington指著\n  漏水的管道。'],
                            ['<32>{#p/story}* 怪物小孩捂住鼻子，一臉嫌棄。']
                        ]
                        : [
                            ['<32>{#p/story}* 怪物小孩直鉤鉤地盯著$(x)。'],
                            ['<32>{#p/story}* 怪物小孩憤怒地指著$(x)。'],
                            ['<32>{#p/story}* 怪物小孩繞著$(x)來回踱步，\n  準備下手。']
                        ],
        
        mkTurnActRand2: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* 怪物小孩誇Muffet穿得真精緻，\n  有品味。'],
                    ['<32>{#p/story}* 怪物小孩告訴Muffet，\n  她的糕點在怪物界就是一流。'],
                    ["<32>{#p/story}* 怪物小孩告訴Muffet，\n  她織的網簡直無人能敵。"]
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* 怪物小孩哼了一段優美的旋律。'],
                        ["<32>{#p/story}* 怪物小孩告訴Shyren，\n  她的頭髮真好看。"],
                        ["<32>{#p/story}* 怪物小孩告訴Shyren，\n  她的聲音真好聽。"]
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* 怪物小孩告訴Skrubbington，\n  這片數它最愛乾淨。'],
                            ["<32>{#p/story}* 怪物小孩告訴Skrubbington，\n  它就是鑄廠模範清潔工。"],
                            ["<32>{#p/story}* 怪物小孩對Skrubbington說，\n  它對完美的追求真是執著。"]
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ["<32>{#p/story}* 怪物小孩誇Radtile的鏡子\n  真好看。"],
                                ["<32>{#p/story}* 怪物小孩誇Radtile\n  帽子真酷。"],
                                ["<32>{#p/story}* 怪物小孩再三打量Radtile\n  帥氣的臉龐。"]
                            ]
                            : [
                                ['<32>{#p/story}* 怪物小孩告訴$(x)，\n  會陪著它。'],
                                ["<32>{#p/story}* 怪物小孩告訴$(x)，\n  會盡全力幫助它。"],
                                ['<32>{#p/story}* 怪物小孩站到了$(x)上面。']
                            ],
        
        mkTurnActRand3: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* 怪物小孩試著向Muffet詢問\n  蜘蛛部落的事。'],
                    ['<32>{#p/story}* 怪物小孩試著向Muffet詢問\n  烘焙心得。'],
                    ['<32>{#p/story}* 怪物小孩試著向Muffet詢問\n  品茶之道。']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* 怪物小孩和Shyren爭論起\n  用哪種記譜方式更好。'],
                        ['<32>{#p/story}* 怪物小孩開始講起了樂理知識。'],
                        ['<32>{#p/story}* 怪物小孩跟Shyren討論起\n  彼此喜愛的音樂流派。']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* 怪物小孩以「講衛生」為主題，\n  吟了首小詩。'],
                            ['<32>{#p/story}* 怪物小孩圍繞「安」與「危」\n  來了段Rap。'],
                            ['<32>{#p/story}* 怪物小孩自豪地展示著\n  自己的亮晶晶下水管道組。']
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ['<32>{#p/story}* 怪物小孩朝Radtile擺了個鬼臉。'],
                                ['<32>{#p/story}* 怪物小孩走上前，把臉湊過去，\n  仔細打量著Radtile。'],
                                ['<32>{#p/story}* 怪物小孩把自己扮成一個野孩子。']
                            ]
                            : [
                                ['<32>{#p/story}* 怪物小孩看著$(x)，\n  有樣學樣，扭動著身體。'],
                                ['<32>{#p/story}* 怪物小孩表演了倒立，\n  $(x)驚呆了。'],
                                ['<32>{#p/story}* 怪物小孩在原地打轉，\n  看得$(x)不明所以。']
                            ],
        
        mkTurnActRand4: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [["<32>{#p/story}* 怪物小孩想告訴Muffet\n  這一切毫無意義！"]]
                : opponent === 'shyren' || opponent === 'radtile' // NO-TRANSLATE

                    ? [['<32>{#p/story}* 怪物小孩告訴對手，\n  時空扭曲即將來臨！']]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [['<32>{#p/story}* 怪物小孩告訴對手，\n  某種病毒快傳播到這裡了！']]
                        : [['<32>{#p/story}* 怪物小孩告訴對手，\n  酸液從附近的管道裡滲出來了！']],
        mkTurnActResult0: ['<32>{#p/story}* 無事發生。'],
        mkTurnActResult1: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington直犯噁心！\n* Skrubbington的防禦力下降了！"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren感到很不自在！\n* Shyren的防禦力下降了！"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* Radtile感到很不自在！\n* Radtile的防禦力下降了！"]
                        : ["<32>{#p/story}* $(x)感到很不自在！\n* $(x)的防禦力下降了！"],
        mkTurnActResult2: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington受寵若驚！\n* Skrubbington的攻擊力下降了！"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren受寵若驚！\n* Shyren的攻擊力下降了！"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* 受到尊重，Radtile心滿意足！\n* Radtile的攻擊力下降了！"]
                        : ["<32>{#p/story}* 受到尊重，$(x)心滿意足！\n* $(x)的攻擊力下降了！"],
        mkTurnActResult3: (opponent: string, multiple: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? multiple
                    ? ['<32>{#p/story}* 被怪物小孩一攪和，\n  Skrubbington和其他對手都分神了，\n  錯過了自己的回合！']
                    : ['<32>{#p/story}* 被怪物小孩一攪和，\n  Skrubbington分神了，\n  錯過了自己的回合！']
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ['<32>{#p/story}* 被怪物小孩一攪和，\n  Shyren分神了，\n  錯過了自己的回合！']
                    : multiple
                        ? ['<32>{#p/story}* 被怪物小孩一整，\n  $(x)和其他對手忘乎所以，\n  錯過了自己的回合！']
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? ['<32>{#p/story}* 被怪物小孩一整，\n  Radtile忘乎所以，\n  錯過了自己的回合！']
                            : ['<32>{#p/story}* 被怪物小孩一整，\n  $(x)忘乎所以，\n  錯過了自己的回合！'],
        mkTurnActResult4: (opponent: string, multiple: boolean, allowpac: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? [
                    '<32>{#p/story}* Skrubbington擔心自己小命不保，\n  趕忙跑掉了！',
                    ...(multiple ? ['<32>{#p/story}* 其他對手還想繼續戰鬥。'] : [])
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? allowpac
                        ? ['<32>{#p/story}* Shyren擔心自己小命不保，\n  趕忙跑掉了！']
                        : ['<32>{#p/story}* 表演過後，Shyren有了信心。\n  決定勇敢地直面危險！']
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ['<32>{#p/story}* Radtile擔心自己小命不保，\n  趕忙跑掉了！']
                        : [
                            '<32>{#p/story}* $(x)擔心自己小命不保，\n  趕忙跑掉了！',
                            ...(multiple ? ['<32>{#p/story}* 其他對手還想繼續戰鬥。'] : [])
                        ],
        mkTurnFight1: () => [
            '<32>{#p/kidding}* 你... 你-你讓我戰鬥？\n* 真的嗎？',
            choicer.create('* （確定戰鬥嗎？）', '給我打', '算了')
        ],
        mkTurnFight2a: ['<32>{#p/kidding}* 好吧... 那我試試...'],
        mkTurnFight2b: ['<32>{#p/kidding}* 喔，好...', "<32>* 那我就饒恕他們吧！"],
        mkTurnFight3a: ['<32>* 呀哈...！'],
        mkTurnFight3b: ['<32>* 嘿呀...！'],
        mkTurnFight3c: ['<32>* 我打！'],
        mkTurnMercy1: ['<32>{#p/kidding}* 仁慈？\n* 讓我饒恕對手嗎？', "<32>{#p/kidding}* 哈哈，容易！"],
        mkTurnX: () => [choicer.create('* （怪物小孩應該怎麼做？）', '仁慈', '行動', '魔法', '戰鬥')]
    },

    c_name_common: {
        keyring: '鑰匙串',
        hello_asgore: '打招呼',
        about_asgore: '來個自我介紹',
        dad: '叫他「爹地」',
        flirt_asgore: '調情',
        insult_asgore: '辱罵'
    },

    c_call_common: {
        start: '<32>{#s/phone}{#p/event}* 撥號中...',
        end: '<32>{#s/equip}{#p/event}* 滴...',
        nobody0: ['<32>{#p/human}* （全是噪音。）'],
        nobody1: ['<32>{#p/human}* （沒有回應。）'],
        nobody2: ['<32>{#p/basic}* ...但是誰也沒有來。'],
        nobody3: ['<32>{#p/human}* （沒有訊號。）'],
        nobody4: [
            '<32>{#p/human}* （聽起來，一隻小白狗\n  在手機上睡著了。）',
            '<32>{#p/basic}* （呼嚕... 呼嚕...）',
            '<32>* （呼嚕... 呼嚕...）'
        ],
        nobody4a: [
            '<32>{#p/human}* （聽起來，一隻小白狗\n  在手機上睡著了。）',
            '<32>{#p/basic}* （呼嚕... 呼嚕... 呼嚕...）',
            '<32>* （呼嚕... 呼嚕... 呼嚕...）'
        ],
        nobody4f: [
            '<32>{#p/human}* （聽起來，一隻小白狗\n  在手機上睡著了。）',
            '<32>{#p/basic}* （呼嚕！）',
            '<32>* （呼嚕！）'
        ],
        nobody4m: [
            '<32>{#p/human}* （聽起來，一隻小白狗\n  在手機上睡著了。）',
            '<32>{#p/basic}* （呼嚕？）',
            '<32>* （呼嚕？）'
        ],
        nobody4i: [
            '<32>{#p/human}* （聽起來，一隻小白狗\n  在手機上睡著了。）',
            '<32>{#p/basic}* （嗷嗚——）',
            '<32>* （嗚嗚。）'
        ],
        about1: [
            '<25>{#p/asgore}{#f/5}* 想了解了解我，是嗎？',
            '<25>{#f/7}* ...從哪開始說好呢？',
            '<25>{#f/6}* 能聊的實在太多了，\n  一下子根本說不完。',
            '<25>{#f/6}* 相處久了，咱們自然就熟悉了。',
            '<25>{#f/21}* 一點一點相互了解，\n  可比一口氣來一大段自我介紹\n  好多了。'
        ],
        about2: [
            '<25>{#p/asgore}{#f/5}* 要是你真好奇的話，\n  之後再慢慢講給你聽。',
            '<25>{#f/7}* 你看行嗎？'
        ],
        flirt1: [
            '<25>{#p/asgore}{#f/20}* ...',
            '<25>{#f/4}* Frisk啊...',
            '<25>{#f/6}* 你想找對象，\n  也該找年齡差不多的吧。',
            '<25>{#f/5}* 倒不是說我反感這事...',
            '<25>{#f/6}* 但你得知道，\n  「我喜歡你」和「我就跟你了」\n  可是天壤之別。'
        ],
        flirt2: [
            '<25>{#p/asgore}{#f/20}* Frisk。',
            '<25>{#f/20}* 等你大一點，\n  我再好好跟你聊聊\n  感情方面的事。',
            '<25>{#f/6}* 不過現在，免談。'
        ],
        flirt3: [
            '<25>{#p/asgore}{#f/20}* Frisk。',
            '<25>{#f/6}* 你先叫我爹，又跟我調情...\n  都把我整懵了。',
            
        ],
        hello: [
            ['<25>{#p/asgore}{#f/21}* 你剛跟我打了個招呼。', '<25>{#f/7}* 嗯...', '<25>{#f/6}* 那我也回一句「哈囉」吧！'],
            ['<25>{#p/asgore}{#f/5}* 又來？', '<25>{#f/21}* 那我再來一句...', '<25>{#f/6}* 「今天開心嗎？」'],
            [
                '<25>{#p/asgore}{#f/5}* ...',
                '<25>{#f/5}* 再這麼整下去，\n  我都沒詞兒了。',
                '<25>{#f/6}* 你看，外面有那麼多鳥，\n  它們肯定很樂意跟你問好。',
                '<25>{#f/7}* 去跟它們打招呼吧。'
            ],
            ['<25>{#p/asgore}{#f/5}* ...哈囉。', '<25>{#f/6}* 孩子，能聽到你的聲音，\n  我很開心。']
        ],
        dad1: [
            '<25>{#p/asgore}{#f/6}* ...',
            '<25>{#f/24}* ...',
            '<25>{#f/21}* 是啊。',
            '<25>{#f/6}* 你要是叫別的，那才奇怪呢。',
            '<25>{#f/6}* Frisk，要是你想叫我爹，\n  隨時都可以喔。'
        ],
        dad2: [
            '<25>{#p/asgore}{#f/24}* ...\n* 天哪...',
            '<25>{#f/6}* 你是真想認我當爹了。',
            '<25>{#f/21}* 我也很樂意做個\n  稱職的父親。'
        ],
        dad3: [
            '<25>{#p/asgore}{#f/24}* ...\n* 天哪...',
            '<25>{#f/6}* 你先跟我調情，又叫我爹...\n  都把我整懵了。',
            
        ],
        insult1: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/asgore}{#f/1}* ...',
                    '<25>{#f/1}* 你好像挺難過的...\n  是不是有什麼心事？',
                    '<25>{#f/6}* 要不，等我幹完活，\n  咱們談談心，怎麼樣？'
                ]
                : [
                    '<25>{#p/asgore}{#f/8}* ...',
                    '<26>{#f/6}* 大膽！竟敢這樣說話！',
                    '<25>{#f/21}* 嘿嘿，別擔心...\n* 互相開個玩笑而已。'
                ],
        insult2: () =>
            SAVE.data.b.ufokinwotm8
                ? ['<25>{#p/asgore}{#f/1}* ...', '<25>{#p/asgore}{#f/6}* 等我有空再聊，\n  好嗎？']
                : ['<25>{#p/asgore}{#f/21}* 好啦，好啦。\n* 這麼張揚可不太好喔。']
    },

    s_save_common: {
        _cockpit: {
            name: '無人深空',
            text: []
        },
        _frontier1: {
            name: '你的家',
            text: ["<32>{#p/human}* （你充滿了決心。）"]
        },
        _frontier8: {
            name: '歐律比亞',
            text: []
        }
    }
};


// END-TRANSLATE
