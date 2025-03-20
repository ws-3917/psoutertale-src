import { pms } from '../../../code/common/extras';
import { music, sounds } from '../../../code/systems/assets';
import { battler, choicer, iFancyYourVilliany, pager, phone, player, world } from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';

// START-TRANSLATE

export default {
    _0: {
        _1: '那个玩家，已经竭尽全力...',
        _2: '但无奈，\n命运早已注定...',
        _3: '再怎么改动故事，也无法改变结局。',
        _4: '那个玩家... 已经看过无数条时间线。\n可是没有一条，能让他满意。',
        _5: '他的余生，注定要永无止境地\n进行这场苦乐参半的时空旅行。',
        _6: '这就是他的归宿吗？',
        _7: '不...\n我绝不允许。',
        _8: '要是只有扭曲时空法则，\n才能让他跳出循环...',
        _9: '那就豁出去了。',
        _10: '我绝不会让“时空计划”\n半途而废。'
        
        
        
        
        
        
        
        
        
        
        
    },

    a_common: {
        bullybed: [
            [
                '<32>{#p/human}* （...）',
                '<32>{#p/human}* （你醒了。）',
                '<32>{#p/human}* （前哨站没有任何变化。）'
            ],
            [
                '<32>{#p/human}* （你找遍了每个角落，\n  希望能发现生命的迹象。）\n* （一无所获。）',
                '<32>{#p/human}* （你找了一遍，一遍，又一遍...）',
                '<32>{#p/human}* （一无所获。）'
            ],
            [
                '<32>{#p/human}* （你找到了之前乘坐的飞船。）\n* （它已经彻底被毁。）',
                '<32>{#p/human}* （你试图寻找怪物留下的飞船。）',
                '<32>{#p/human}* （但似乎...\n  哪怕一艘，都没给你留下。）'
            ],
            [
                '<32>{#p/human}* （你去了实验室，\n  希望能找到飞船的蓝图和部件。）',
                '<32>{#p/human}* （蓝图还在，部件也有剩余...）',
                "<32>{#p/human}* （然而，此时核心能量已所剩无几。\n  无法让你发射飞船。）"
            ],
            [
                '<32>{#p/human}* （你试图重置。）\n* （什么都没发生。）',
                '<32>{#p/human}* （你再次尝试重置。）',
                '<32>{#p/human}* （什么都没发生。）'
            ],
            [
                "<32>{#p/human}* （绝望之中，你拨了Toriel的号码。）\n* （没有回应。）",
                '<32>{#p/human}* （你又给Papyrus，Undyne打电话...）',
                '<32>{#p/human}* （没有回应。）'
            ],
            [
                '<32>{#p/human}* （...）',
                "<32>{#p/human}* （你已经不记得在这里度过了多久。）",
                "<32>{#p/human}* （几个星期？几个月？几年？）\n* （无从得知。）",
                "<32>{#p/human}* （你把核心的能量消耗调至最低...）",
                "<32>{#p/human}* （即便如此，终有一天也会用尽。）"
            ],
            [
                '<32>{#p/human}* （重力逐渐消失。）',
                '<32>{#p/human}* （温度开始下降。）',
                '<32>{#p/human}* （大气层即将解体。）',
                '<32>{#p/human}* （没有了能量，前哨站将无法生存。）'
            ],
            [
                '<32>{#p/human}* （不知为何，你感到平静。）',
                "<32>{#p/human}* （你平静地接受了自己的死亡。）",
                "<32>{#p/human}* （既然不可避免，那就随它去吧。）",
                '<32>{#p/human}* （空气即将消散。）\n* （最后一刻，你回忆起自己的旅程。）',
                '<32>{#p/human}* （从你离开人类世界的那一天，\n  一直到怪物重获自由的那一天。）'
            ],
            [
                '<32>{#p/human}* （空气彻底消失。）',
                '<32>{#p/human}* （你开始窒息。）',
                '<32>{#p/human}* （生命正在离你而去。）',
                '<32>{#p/human}* （看来，终点就是...）'
            ]
        ],
        dogcheck1: [
            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
            '<25>{#p/basic}（这里就是结局啦！）',
            '<25>{#p/basic}（一起来看看\n  你获得了哪些成就吧！）'
        ],
        dogcheck2: () => [
            ...(!SAVE.flag.b._saved
                ? !SAVE.flag.b._item
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（哇！）\n（全程没存档，物品还一样都不拿！）',
                        '<25>{#p/basic}（你咋急成这样呢！）'
                    ]
                    : [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        "<25>{#p/basic}（哇！）\n（居然全程都没存档！）",
                        '<25>{#p/basic}（你不知道存档点长啥样吗？）'
                    ]
                : !SAVE.flag.b._item
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        "<25>{#p/basic}（哇！）\n（一样物品都没买？）",
                        '<25>{#p/basic}（不知道物品长啥样吗？）'
                    ]
                    : []),
            ...(SAVE.flag.n._hits === 0
                ? !SAVE.flag.b._flee
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（太强了！）\n（全程无伤！还从来不逃跑！）',
                        !SAVE.flag.b._equip
                            ? "<25>{#p/basic}（原来如此！）\n（知道自己强到能无伤，\n  你才不拿防具的！）"
                            : '<25>{#p/basic}（真勇敢啊！）'
                    ]
                    : [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（太强了！）\n（居然能全程无伤！）',
                        !SAVE.flag.b._equip
                            ? '<25>{#p/basic}（而且只用原始装备\n  还能无伤，\n  不愧是天选之子！）'
                            : '<25>{#p/basic}（莫非... 你是战斗大佬？）'
                    ]
                : SAVE.flag.n._deaths + SAVE.flag.n._deaths_twinkly === 0
                    ? !SAVE.flag.b._heal
                        ? !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太强了！）\n（一次都没死过！）',
                                !SAVE.flag.b._equip
                                    ? '<25>{#p/basic}（不仅如此，你还全程无药！）\n（更离谱的是，还是原始装备！）'
                                    : '<25>{#p/basic}（不仅如此，你还全程无药！）'
                            ]
                            : [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太强了！）\n（一次都没死过，\n  还从来不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}（不仅如此，你还全程无药！）\n（更离谱的是，还是原始装备！）"
                                    : "<25>{#p/basic}（不仅如此，你还全程无药！）"
                            ]
                        : !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太强了！）\n（一次都没死过，\n  还从来不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? '<25>{#p/basic}（原来如此！）\n（知道自己够强，\n  所以才不拿防具的吧？）'
                                    : '<25>{#p/basic}（这就是所谓的“勇气”吧？）'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太强了！）\n（只用原始装备，\n  还能一次都不死！）'
                                ]
                                : ['<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！', '<25>{#p/basic}（太强了！）\n（一次都没死过！）']
                    : !SAVE.flag.b._heal
                        ? !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太强了！）\n（全程无药，还从来不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}（仅仅无药，\n  难道就不需要防具吗？）"
                                    : '<25>{#p/basic}（你是真喜欢\n  在刀尖上跳舞啊。）'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太强了！）\n（仅凭原始装备，\n  还能全程无药！）'
                                ]
                                : [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太强了！）\n（全程无药！）'
                                ]
                        : !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                '<25>{#p/basic}（太强了！）\n（全程不逃跑！）',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}（仅仅无药，\n  难道就不需要防具吗？）"
                                    : '<25>{#p/basic}（你是真喜欢\n  在刀尖上跳舞啊。）'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                                    '<25>{#p/basic}（太强了！）\n（只用原始装备通关！）'
                                ]
                                : []),
            ...(!SAVE.flag.b._skip
                ? [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（你好温柔...）\n（全程没跳任何对话！）",
                    !SAVE.flag.b._call
                        ? SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                            ? '<25>{#p/basic}（真可惜，你明明有手机，\n  却从来不用。）'
                            : '<25>{#p/basic}（真可惜，你明明有手机，\n  却从来不给别人打电话。）'
                        : SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                            ? '<25>{#p/basic}（真可惜，你明明换了手机，\n  却从来不看域外网消息。）'
                            : '<25>{#p/basic}（你真的好关心大家！）'
                ]
                : !SAVE.flag.b._call
                    ? SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                        ? [
                            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                            '<25>{#p/basic}（真奇怪...）\n（你明明有手机，\n  却从来不用！）'
                        ]
                        : [
                            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                            '<25>{#p/basic}（真奇怪...）\n（你明明有手机，\n  却从来不给别人打电话！）'
                        ]
                    : SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                        ? [
                            '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                            '<25>{#p/basic}（真奇怪...）\n（你明明换了手机，\n  却从来不看域外网消息！）'
                        ]
                        : []),
            ...(!SAVE.flag.b._getg
                ? [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    '<25>{#p/basic}（天呐！）\n（居然一分钱都没赚到！）\n（没人给你钱吗？）'
                ]
                : !SAVE.flag.b._useg
                    ? [
                        '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                        '<25>{#p/basic}（天呐！）\n（你真是个铁公鸡，一毛不拔！）'
                    ]
                    : []),
            ...(SAVE.data.b.water
                ? [
                    '<25>{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（你咋这么喜欢\n  那杯静电消除液呢？）"
                ]
                : [])
        ],
        dogcheck3: (none: boolean) =>
            none
                ? [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（你好像没做啥特别的事哎。）",
                    '<25>{#p/basic}（不过，能坚守“中庸之道”\n  才是最难得的啊！）'
                ]
                : [
                    '<25>{#x1}{#p/event}汪汪！\n{#x1}{#p/event}汪汪！',
                    "<25>{#p/basic}（说完啦！）",
                    '<25>{#p/basic}（再次祝贺你！）\n（拜拜！）'
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
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<26>{#p/undyne}{#f/7}* 小混蛋，听着！',
                            "<25>{#p/undyne}{#f/4}* 你此生最大的错误，\n  就是干掉那么多人，\n  偏偏把我救了！",
                            "<25>{#p/undyne}{#f/5}* 多亏了你，\n  我获得了力量！\n  我终于能实现愿望...",
                            '<25>{#p/undyne}{#f/17}* ...终于能...',
                            "<25>{#p/undyne}{#f/16}* ...等等，\n  出发之前，我想跟你讲讲\n  自己是怎么获得力量的。",
                            '<25>{#p/undyne}{#f/20}* 把时间倒回到\n  你离开前哨站的那天。',
                            "<25>{#p/undyne}{#f/22}* 你刚离开，\n  我就发现了那些暴行，\n  立马就... 冲到了首塔。",
                            '<25>{#p/undyne}{#f/22}* Alphys被吓得不轻。\n  国王死了，\n  皇家卫队几乎全军覆没。',
                            '<25>{#p/undyne}{#f/20}* 更糟的是...',
                            "<25>{#p/undyne}{#f/22}* Mettaton和Alphys为了\n  干掉你，动用了大量的能量。\n* 最终，前哨站能量供应失控。",
                            '<25>{#p/undyne}{#f/19}* 供气系统，人工重力系统...\n  这些赖以为生的装置\n  都相继崩溃。',
                            '<25>{#p/undyne}{#f/19}* 最终，死伤无数。',
                            "<25>{#p/undyne}{#f/18}* 另一边，“档案”突然被\n  一道强力电流击中。",
                            '<25>{#p/undyne}{#f/16}* 由于皇家卫队人手不足，\n  无法及时疏散里面的人类...',
                            '<25>{#p/undyne}{#f/19}* 结果，他们全死了。',
                            '<25>{#p/undyne}{#f/10}* ...\n* 那时，我突然明白\n  ASGORE一直以来在做什么。',
                            "<25>{#p/undyne}{#f/10}* 他在尝试一条解放之路，\n  一条不用杀戮的解放之路。",
                            '<25>{#p/undyne}{#f/16}* ...呵。\n* 真... 不愧是他。',
                            "<25>{#p/undyne}{#f/19}* 但人类一死，王国沦陷。\n  他的计划就彻底失败了，",
                            '<25>{#p/undyne}{#f/20}* 不过那些灵魂还在，所以...',
                            '<25>{#p/undyne}{#f/20}* ...',
                            '<25>{#p/alphys}{#f/10}* 打个岔，成-成功了。',
                            '<25>{#p/undyne}{#f/12}* 真的？',
                            '<25>{#p/undyne}{#f/1}* 让我看看...',
                            '<25>{#p/undyne}{#f/17}* ...',
                            '<25>{#p/alphys}{#f/18}* ...\n* 合你心意吧！？',
                            '<25>{#p/undyne}{#f/9}* 切。\n* 你听听自己在说啥。',
                            '<25>{#p/undyne}{#f/11}* 还“合你心意吧”，\n  你说呢？',
                            '<25>{#p/alphys}{#f/20}* ...',
                            "<25>{#p/undyne}{#f/8}* 那当然是...\n  超合我心意啦！",
                            '<25>{#p/undyne}{#f/7}* 我接着说，\n  灵魂还在，\n  所以在得到它们后...',
                            '<25>{#p/undyne}{#f/11}* 我和Alphys想了个主意...',
                            "<25>{#p/undyne}{#f/16}* 首先，乘坐飞船，\n  借灵魂力量穿过力场，\n  把你拿下...",
                            '<25>{#p/undyne}{#f/7}* 接着，把灵魂扯出来！',
                            "<25>{#p/undyne}{#f/1}* 集齐了灵魂，\n  我们就能轰碎力场，\n  解放怪物！",
                            '<25>{#p/undyne}{#f/12}* 只是，\n  怎么定位到你的坐标呢？',
                            '<25>{#p/alphys}{#f/15}* 嘿！\n  我-我有办法。',
                            '<25>{#p/alphys}{#f/16}* 很简单。\n* 那人接通电话的一刻，\n  就暴露了自己的坐标。',
                            
                        ]);
                        if (!dpapyrus) {
                            addB([
                                "<25>{|}{#p/alphys}{#f/18}* 毕竟是我出的主意，\n  早就想到- {%}",
                                '<18>{#p/papyrus}{#f/6}UNDYNE？！\n你还好吗？！',
                                '<25>{#p/alphys}{#f/2}* ...？！',
                                '<25>{#p/undyne}{#f/13}* 啊？？\n* 你跑过来干啥？',
                                '<18>{#p/papyrus}{#f/5}嗯... 我听到这边\n传来很大的尖叫声，\n好像在吵架。',
                                '<18>{#p/papyrus}{#f/6}我担心你，\n就过来了。',
                                '<25>{#p/undyne}{#f/14}* 谢谢你哦Papyrus。\n* 你可真是体贴呢。',
                                "<18>{#p/papyrus}{#f/0}哎呀，不用谢！",
                                "<25>{#p/undyne}{#f/7}* 下次，别人的飞船，\n  请你别随便上，行不行！！！",
                                "<18>{#p/papyrus}{#f/6}对-对不起，\n我只是好奇。",
                                '<18>{#p/papyrus}{#f/5}本来只是想\n跑过来看一眼，\n结果...',
                                '<18>{#p/papyrus}{#f/6}一回神，这飞船\n都飞出前哨站了！',
                                "<18>{#p/papyrus}{#f/4}我发誓，\n再给我一次机会，\n我肯定不会上。",
                                "<25>{#p/alphys}{#f/15}* 行吧，\n  呃，你知不知道...",
                                "<25>{#p/alphys}{#f/23}* 咱们已经飞完半程了。",
                                '<25>{#p/undyne}{#f/12}* 是啊。所以...\n  你现在还是回密室去吧。',
                                '<25>{#p/undyne}{#f/1}* 就当咱们在玩捉迷藏！\n  你躲，我们找！',
                                '<18>{#p/papyrus}{#f/6}我要躲多长时间呢？',
                                "<25>{#p/undyne}{#f/12}* 我不知道啊？？？",
                                "<25>{#p/alphys}{#f/17}* 两小时。\n* 你要躲两个小时。",
                                '<18>{#p/papyrus}{#f/0}好！！\n两位加油！！',
                                '<25>{#p/alphys}{#f/20}* ...两小时应该够抓住人类吧，\n  或许...',
                                '<25>{#p/undyne}{#f/14}* 噗，什么？\n  两小时？',
                                "<25>{#p/undyne}{#f/1}* 呵，用不着。",
                                '<25>{#p/undyne}{#f/4}* ...\n* 呋呼呼呼...',
                                '<25>{*}{#x0}{#p/undyne}{#f/7}* 两秒就够。{^40}{%}'
                            ]);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/18}* 毕竟是我出的主意，\n  早就想到这个问题了！",
                                "<25>{#p/undyne}{#f/1}* 呋呼呼... 那就行。",
                                "<25>{#p/undyne}{#f/7}* 小混蛋！\n  你的死，纯是自找的！",
                                "<25>{#p/alphys}{#f/16}* 对！\n  你-你就在地狱里\n  好好反思自己的罪行吧！！",
                                "<25>{#p/alphys}{#f/16}* 你去哪，\n  我们都能抓住！！",
                                "<25>{#p/undyne}{#f/8}* 对！！\n* ALPHYS，告诉那混蛋！！",
                                '<25>{#p/undyne}{#f/4}* ...\n* 呋呼呼呼...',
                                "<25>{*}{#x0}{#p/undyne}{#f/7}* 死期到了。{^40}{%}"
                            ]);
                        }
                    } else {
                        k = 'dark_undyne'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/alphys}{#f/33}* ...嘘，应该是这个号，\n  打通了。',
                            "<25>{#p/alphys}{#f/1}* 人类，你好！\n* 我是Alphys博士。",
                            '<25>{#p/alphys}{#f/17}* 也是这个差劲而痛苦的世界里\n  最大的受害者。',
                            '<25>{#p/alphys}{#f/28}* ...不知你是否想听听\n  这段时间里，\n  这里发生的悲剧？'
                        ]);
                        addB([
                            '<25>{#p/alphys}{#f/5}* 那时，\n  我正在进行“档案”的日常维护...',
                            '<25>{#p/alphys}{#f/23}* 突然，\n  我听到飞船起飞的声音。',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 那飞船超~级大呢。',
                            '<25>{#p/alphys}{#f/17}* 呃... 没多大其实。\n* 就是艘飞艇。',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 哦，懂了。\n* 小号飞船。',
                            '<25>{#p/alphys}{#f/15}* 我去找Asgore，\n  找了他家，找了王座...',
                            '<25>{#p/alphys}{#f/20}* 结果到处都找不到。',
                            '<25>{#p/alphys}{#f/21}* ...这时，我发现\n  前哨站的能量供应出了问题。',
                            '<25>{#p/alphys}{#f/24}* 看来，为了干掉你，\n  Mettaton那个大蠢蛋\n  把核心的能量全吸光了。',
                            '<25>{#p/alphys}{#f/25}* 他这一搞，\n  前哨站的设施都没法运转了。',
                            '<32>{#p/basic}{@fill=#d4bbff}* 我去！\n* 之后呢？',
                            '<25>{#p/alphys}{#f/26}* ...',
                            '<32>{#p/basic}{@fill=#d4bbff}* 想起来了。\n* 你惊慌失措，\n  竟去找Undyne求助。',
                            '<25>{#p/alphys}{#f/18}* ...Undyne到了首塔。\n* 和我预想的完全一样，\n  她告诉我...',
                            "<25>{#p/alphys}{#f/3}* Asgore被人杀了。",
                            '<32>{#p/basic}{@fill=#ffbbdc}* 肯定的。',
                            '<25>{#p/alphys}{#f/13}* 与此同时，\n  Undyne帮做了点好事...',
                            '<25>{#p/alphys}{#f/20}* 她召集皇家卫队，\n  帮忙稳住核心，避免伤亡增加。',
                            '<25>{#p/alphys}{#f/30}* 但接下来，她的所作所为\n  让我... 大跌眼镜。',
                            '<32>{#p/basic}{@fill=#d4bbff}* 该... 该不会...',
                            '<25>{#p/alphys}{#f/31}* Undyne知道了“档案”的事情。\n  冲到那里，把里面的人类\n  全杀了。',
                            "<25>{#p/alphys}{#f/32}* 当我发现时，都懵了。",
                            "<32>{#p/basic}{@fill=#ffbbdc}* 我天...\n* 这事真不怪你。",
                            "<32>{#p/basic}{@fill=#d4bbff}* 错在她，自私自利。\n  就想着当“英雄”，好出名。",
                            '<25>{#p/alphys}{#f/17}* 妈的。\n* 她还跟我说，她完全“理解”\n  Asgore的良苦用心...',
                            '<25>{#p/alphys}{#f/24}* 但“绝不认同。”\n* 所以就干掉了人类。',
                            '<25>{#p/alphys}{#f/13}* ...\n* 我很沮丧，\n  但最起码... 灵魂还在。',
                            '<25>{#p/alphys}{#f/10}* 再得到一个灵魂，\n  我们就能自由。\n* 希望还在。',
                            "<32>{#p/basic}{@fill=#ffbbdc}* ...但希望还是破灭了。",
                            "<25>{#p/alphys}{#f/20}* 是的。\n* 灵魂没了，希望也没了。",
                            '<25>{#p/alphys}{#f/21}* Undyne，操，\n  真是个极品，\n  智商二百五的极品。',
                            
                            '<25>{#p/alphys}{#f/22}* 她那鱼籽大的脑子\n  根本不知道怎么储存\n  人类灵魂。',
                            "<32>{#p/basic}{@fill=#d4bbff}* 结果，六个灵魂全...",
                            '<25>{#p/alphys}{#f/24}* ...碎了。',
                            '<25>{#p/alphys}{#f/6}* 一切归零，我彻底放弃了。',
                            "<25>{#p/alphys}{#f/8}* Undyne之后怎么搞，\n  我都不在乎。",
                            '<25>{#p/alphys}{#f/10}* 我辞去了科学员的工作。\n  把所有实验器材扔掉了。',
                            '<25>{#p/alphys}{#f/33}* 之后...',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 你重拾了老本行。',
                            '<32>{#p/basic}{@fill=#d4bbff}* 又跟我们一起，\n  捡太空垃圾！',
                            "<25>{#p/alphys}{#f/29}* 是啊。",
                            "<25>{#p/alphys}{#f/28}* 别小瞧我捡垃圾的技术。\n* 淦，我可是一把手呢。",
                            "<32>{#p/basic}{@fill=#ffbbdc}* 这可是大实话。",
                            '<25>{#p/alphys}{#f/10}* 生活这么自在，\n  谁稀罕什么“打破力场”呢？',
                            
                            "<25>{#p/alphys}{#f/18}* 没事捡捡垃圾...\n  不比成天琢磨“逃出去”\n  轻松多了？",
                            '<32>{#p/basic}{@fill=#ffbbdc}* 不过，\n  档案里人类的内幕\n  还没几个人知道。',
                            "<32>{#p/basic}{@fill=#d4bbff}* 是呢。\n* 她糟蹋灵魂的事\n  都快成最高机密了。",
                            '<25>{#p/alphys}{#f/23}* 呵。\n* Undyne爱怎么忽悠，怎么折腾，\n  随她便。',
                            '<25>{#p/alphys}{#f/23}* 建军工厂？\n  建瞭望塔？\n* 没人管她。',
                            '<25>{#p/alphys}{#f/25}* 她要是觉得“全面军事化”\n  能让她流芳千古，\n  就搞。',
                            '<25>{#p/alphys}{#f/26}* 她爱咋咋地，我不在乎。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/basic}{@fill=#d4bbff}* Undyne是怎么\n  统治前哨站的？\n* 武装夺权？",
                                '<26>{#p/alphys}{#f/24}* 呃，那事把我恶心坏了。',
                                '<25>{#p/alphys}{#f/30}* 曾经的王后站了出来，\n  想阻止她的野心...',
                                "<25>{#p/alphys}{#f/31}* ...结果，Undyne的拥护者们\n  一拥而上，把王后撂倒，\n  当场踩死。",
                                "<25>{#p/alphys}{#f/21}* 杀了人，\n  Undyne却不用受任何刑罚。",
                                "<32>{#p/basic}{@fill=#ffbbdc}* 我去，纯纯悲剧了。"
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}{@fill=#d4bbff}* 对了，我听说...\n  她好像正在全民强制征兵，",
                                '<25>{#p/alphys}{#f/24}* 呃，真蠢。',
                                '<25>{#p/alphys}{#f/30}* 许多民众，\n  每天强制站岗...\n  就为了第一时间发现人类。',
                                '<25>{#p/alphys}{#f/31}* 她才不管要等多长时间。',
                                "<25>{#p/alphys}{#f/21}* 把天文观测网络当摆设。",
                                "<32>{#p/basic}{@fill=#ffbbdc}* 哇。\n* 她好像真忘了有这东西呢。"
                            ]);
                        }
                        addB(['<32>{#p/basic}{@fill=#d4bbff}* 是啊...']);
                        if (!dpapyrus) {
                            addB([
                                '<25>{#p/alphys}{#f/20}* 为了让她停手，\n  Papyrus跪下来苦苦哀求。\n* 可她根本不听。',
                                '<25>{#p/alphys}{#f/31}* ...自那之后，\n  我也不想管她了。'
                            ]);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/20}* 要是Papyrus还活着，\n  也许能劝得动她。",
                                "<25>{#p/alphys}{#f/18}* ...他为啥死了呢？\n  你我都心知肚明。"
                            ]);
                        }
                        if (hkills > 19) {
                            addB([
                                '<25>{#p/alphys}{#f/17}* ...\n* 讲完了。\n* 这就是我们的命运。',
                                "<25>{#p/alphys}{#f/27}* 总之，\n  我可太谢谢你了。",
                                '<25>{#p/alphys}{#f/26}* 你要是不那么大杀特杀，\n  我还不能这么快体验到\n  无间地狱的滋味呢。',
                                "<25>{#p/alphys}{#f/18}* 一切，都是你的错。"
                            ]);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/17}* ...\n* 讲完了。\n* 这就是我们的命运。',
                                "<25>{#p/alphys}{#f/26}* 诚然，\n  你没杀那么多人...",
                                '<25>{#p/alphys}{#f/23}* 诚然，我和Mettaton反应\n  有些过度...',
                                "<25>{#p/alphys}{#f/18}* 但最根本的错在你。"
                            ]);
                        }
                        addB([
                            "<32>{#p/basic}{@fill=#ffbbdc}* Alphys，告诉那人。",
                            '<32>{#p/basic}{@fill=#d4bbff}* 对，亲口告诉那人，\n  他就是个废物！',
                            "<25>{#p/alphys}{#f/33}* ...嗯。\n* 她们代我说了。",
                            '<25>{#p/alphys}{#f/1}* 拜拜咯！',
                            '<32>{#p/basic}{@fill=#ffbbdc}* 再见，小屁孩。',
                            "<32>{#p/basic}{@fill=#d4bbff}* “再见”？\n* Bratty，\n  难道还会和那人“再见”？",
                            "<32>{#p/basic}{@fill=#ffbbdc}* 哎呀，说错了。\n* 这手机好像也要没电了。",
                            '<32>{#p/basic}{@fill=#d4bbff}* 鳄鳄，一会见！！！\n* 喵哈哈！！！',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else if (royals < 2) {
                    if (!dpapyrus || royals === 1) {
                        k = 'dark_alphys'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/sans}{#f/0}* 你好呀。',
                            "<25>{#p/sans}{#f/3}* 近况可好？"
                        ]);
                        addB([
                            '<25>{#p/sans}{#f/0}* 在你走后，\n  alphys... 吓得不轻。',
                            '<25>{#p/sans}{#f/0}* asgore死了，\n  undyne死了...',
                            '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的计划\n  让核心陷入停摆。',
                            "<25>{#p/sans}{#f/3}* 能量供应已经彻底崩溃。",
                            "<25>{#p/sans}{#f/3}* 气压不断下降，\n  人工重力正在消失。\n* 情况... 不容乐观。",
                            '<25>{#p/sans}{#f/0}* 接完alphys的电话，\n  赶去的路上，\n  我已经做好了最坏的打算。',
                            '<25>{#p/sans}{#f/0}* 可更糟的事还在后头。',
                            '<25>{#p/sans}{#f/3}* 当我赶到首塔时，\n  一道强力电流直接贯穿了\n  “档案”。',
'<25>{#p/sans}{#f/3}* 里面的人类当场死亡。',
                            "<25>{#p/sans}{#f/3}* ...那是我第一次看到她\n  伤心成那样。",
                            '<25>{#p/sans}{#f/0}* 但我相信，\n  她肯定能挺过去的。',
                            '<25>{#p/sans}{#f/2}* 毕竟我俩之前可是研究搭档，\n  我了解她。',
                            '<25>{#p/sans}{#f/0}* 所以，我坐在她身旁陪伴她。\n* 发生这些事，\n  她也需要时间慢慢恢复。',
                            "<26>{#p/sans}{#f/3}* 最终，她振作起来。\n  接任了asgore的王位。",
                            "<25>{#p/sans}{#f/0}* ...继任后的第一件事，\n  就是妥善保存那些灵魂。",
                            '<25>{#p/sans}{#f/0}* 于是，我和alphys从\n  实验室角落里找到些旧材料，\n  给灵魂制造了容器。',
                            "<25>{#p/sans}{#f/3}* 有了容器，\n  谁来看管灵魂就成了问题。"
                        ]);
                        if (!dtoriel) {
                            addB([
                                '<25>{#p/sans}{#f/0}* 不久后，王后回归了。',
                                '<25>{#p/sans}{#f/2}* 她理应是最合适的人选。',
                                '<25>{#p/sans}{#f/0}* 但随即，\n  她看到了那些灵魂...',
                                '<25>{#p/sans}{#f/3}* 她不停地控诉，\n  说“我们都是他的帮凶”。',
                                '<25>{#p/sans}{#f/0}* 我们努力解释，\n  把asgore的所作所为\n  都讲给王后...',
                                "<25>{#p/sans}{#f/3}* 可她根本不听。",
                                '<25>{#p/sans}{#f/3}* 想都不用想，\n  她直接拒绝了\n  看管灵魂的工作。'
                            ]);
                        }
                        if (!dpapyrus) {
                            if (!dtoriel) {
                                addB([
                                    "<25>{#p/sans}{#f/0}* toriel拒绝了，\n  我就去找papyrus。",
                                    '<25>{#p/sans}{#f/3}* 好在，当我把情况\n  告诉他后...'
                                ]);
                            } else {
                                addB(['<25>{#p/sans}{#f/3}* 好在，papyrus还在，\n  我找到他，把事情告诉了他后...']);
                            }
                            if (royals === 1) {
                                addB([
                                    '<25>{#p/sans}{#f/2}* 他马上就答应了。',
                                    '<18>{#p/papyrus}{#f/4}...没想到这会议开这么久。',
                                    "<25>{#p/sans}{#f/0}* 哎，说曹操曹操到。\n* 会议顺利吗？",
                                    '<18>{#p/papyrus}{#f/0}哦，好得很呢！\n大伙相处可愉快了！',
                                    '<25>{#p/sans}{#f/3}* 嘿。\n* 那就好。',
                                    '<18>{#p/papyrus}{#f/0}对了，\n你给谁打电话呢？'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/2}* 他马上就答应了。',
                                    "<18>{#p/papyrus}{#f/0}嘿，SANS！\n我把今天的活\n都干完啦！",
                                    '<18>{#p/papyrus}{#f/9}未发现入侵者！\n容器没有故障！',
                                    '<25>{#p/sans}{#f/0}* papyrus，干的好。\n* 再接再厉。',
                                    "<18>{#p/papyrus}{#f/6}那必须滴！！！",
                                    "<18>{#p/papyrus}{#f/0}对了，\n你给谁打电话呢？"
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/2}* 呃，没谁。\n* 就是个普通的人类。",
                                '<18>{#p/papyrus}{#f/4}人类？\n他们不是都...',
                                '<18>{#p/papyrus}{#f/7}...我知道了！！\n我要接电话！！',
                                '<25>{#p/sans}{#f/0}* 给你。',
                                '<18>{#p/papyrus}{#f/0}人类，你好！',
                                '<18>{#p/papyrus}{#f/4}咱俩有阵子没见了...',
                                '<18>{#p/papyrus}{#f/5}...'
                            ]);
                            if (royals === 1) {
                                k = 'dark_alphys_therapy'; // NO-TRANSLATE

                                addB([
                                    "<18>{#p/papyrus}{#f/5}其实...\n我想给你讲个故事。",
                                    '<15>{#f/6}听完故事，你就知道\n这段时间里，\n这里都发生了啥。',
                                    '<25>{#p/sans}{#f/3}* ...哦。\n* 从前...',
                                    '<18>{#p/papyrus}{#f/7}嘘！！！\n让我说！',
                                    "<18>{#p/papyrus}{#f/5}我的工作是\n看守和日常维护灵魂，\n保证它们的安全。",
                                    '<18>{#p/papyrus}{#f/0}某天，我像往常一样\n工作时...',
                                    '<18>{#p/papyrus}{#f/4}突然听到什么声响。'
                                ]);
                                if (!ddoggo) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}声音是从安保门那里\n传来的。',
                                        '<18>{#p/papyrus}{#f/6}我过去一看，\n原来是一只奇怪的狗狗\n眼睛看不见，撞到了门！',
                                        '<18>{#p/papyrus}{#f/5}一开始，我很困惑...\n“为啥要来这呢？”',
                                        '<18>{#p/papyrus}{#f/5}一问，\n我才知道...',
                                        '<18>{#p/papyrus}{#f/6}犬卫队的同伴不见了，\n他在找同伴。',
                                        '<18>{#p/papyrus}{#f/0}好在，他遇到了我。\n我很乐意帮他！',
                                        '<18>{#p/papyrus}{#f/4}于是，下班后...',
                                        '<18>{#p/papyrus}{#f/0}我俩就一起找\n犬卫队的伙伴们。',
                                        '<18>{#p/papyrus}{#f/5}外域开放了，\n我们就从那里开始找...',
                                        '<18>{#p/papyrus}{#f/5}一路找一路找，\n一直找到了\n首塔的塔顶...',
                                        "<18>{#p/papyrus}{#f/6}沿途的风景\n都看了个遍。",
                                        '<18>{#p/papyrus}{#f/5}...唯独没有找到\n一只狗狗。',
                                        '<25>{#p/sans}{#f/0}* 嗯...',
                                        '<25>{#p/sans}{#f/3}* 最终，你俩也没找到吗？',
                                        '<18>{#p/papyrus}{#f/5}呃... 没找到。',
                                        '<18>{#p/papyrus}{#f/5}我们回到了王座...',
                                        '<18>{#p/papyrus}{#f/5}ALPHYS刚醒，\n把事情告诉了我们。',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}听罢，DOGGO十分难受。',
                                        "<18>{#p/papyrus}{#f/6}但我跟ALPHYS\n可不会丢下他不管！",
                                        '<18>{#p/papyrus}{#f/6}我告诉他，\n要是伤心了，就找我俩，\n一定会帮他的！',
                                        "<18>{#p/papyrus}{#f/5}而且，还会给他\n一个新的家。",
                                        '<25>{#p/sans}{#f/0}* 哦... 我说呢。',
                                        "<25>{#p/sans}{#f/2}* 我说asgore的沙发上\n  咋有那些狗毛呢。"
                                    ]);
                                } else if (!dlesserdog) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}声音是从安保门那里\n传来的。\n是一阵轻快的叩门声。',
                                        '<18>{#p/papyrus}{#f/6}我过去一看，\n原来是一只短脖狗狗，\n想让我摸摸它！',
                                        '<18>{#p/papyrus}{#f/5}一开始，我很困惑...\n“为啥要来这呢？”',
                                        '<18>{#p/papyrus}{#f/5}我就摸了摸它，',
'<18>{#p/papyrus}{#f/5}结果，脖子越摸越长，\n还扭成了字。',
                                        '<18>{#p/papyrus}{#f/6}最终，扭成了\n“GU-DU”的形状。',
                                        '<18>{#p/papyrus}{#f/6}我突然明白了：\n它很“孤独”。',
                                        "<18>{#p/papyrus}{#f/8}看到那条孤独的脖子，\n我好难过！！\n我好想哭！！",
                                        '<18>{#p/papyrus}{#f/5}伤心完了，\n我去找了ALPHYS，\n问她，这是怎么回事...',
                                        '<18>{#p/papyrus}{#f/5}她把事情\n都告诉了我。',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}听罢，我十分难受。',
                                        '<18>{#p/papyrus}{#f/6}但我也清楚\n为啥CANIS MINOR\n那么孤独了。',
                                        '<18>{#p/papyrus}{#f/5}所以，在那之后。\n我尽力陪伴它。',
                                        "<25>{#p/sans}{#f/3}* 嗯...\n* 希望这能让它开心点。",
                                        '<25>{#p/sans}{#f/0}* 干得不错。'
                                    ]);
                                } else if (!ddogs) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}声音是从安保门那里\n传来的。\n有人在砸门！',
                                        '<18>{#p/papyrus}{#f/6}我过去一看，\n是两只拿着斧头的狗\n在砸门！',
                                        '<18>{#p/papyrus}{#f/5}一开始，\n我很担心，\n“到底怎么回事？”',
                                        '<18>{#p/papyrus}{#f/5}但很快，\n担心变成了难过。',
                                        '<18>{#p/papyrus}{#f/5}他们告诉我...',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGAMY，DOGARESSA\n他俩说...',
                                        '<18>{#p/papyrus}{#f/5}“活都活不长了，\n 感情还有什么用？\n 不如离婚算了。”',
                                        '<25>{#p/sans}{#f/0}* 嗯...',
                                        '<25>{#p/sans}{#f/3}* ...你肯定劝他俩\n  没事离啥离，好好过日子。',
                                        '<18>{#p/papyrus}{#f/4}...',
                                        '<18>{#p/papyrus}{#f/4}你咋这么懂我。',
                                        '<18>{#p/papyrus}{#f/5}我猜，他俩只是想\n暂时分开，一个人静静。\n毕竟发生了这么多事。',
                                        "<18>{#p/papyrus}{#f/5}于是，我就让他俩\n先在ASGORE家\n住一下。",
                                        '<25>{#p/sans}{#f/0}* 我听说，他俩现在\n  还在那里住着呢。',
                                        '<25>{#p/sans}{#f/2}* 我有预感，他家那个\n  一直“装修中”的房间\n  能派上用场了。'
                                    ]);
                                } else if (!dgreatdog) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}声音是从安保门那里\n传来的，\n是一种奇特的叩门声。',
                                        "<18>{#p/papyrus}{#f/6}过去一看，\n“叩门声”原来是\n大狗的吠叫。",
                                        '<18>{#p/papyrus}{#f/5}大狗脱下了盔甲，\n变成了小狗。',
                                        '<18>{#p/papyrus}{#f/6}它跑了过来，\n想找我玩！',
                                        '<18>{#p/papyrus}{#f/6}看起来，好久好久\n都没人找它玩了。',
                                        "<18>{#p/papyrus}{#f/6}我第一次看到\n狗狗这么想找人玩。",
                                        '<18>{#p/papyrus}{#f/4}我感觉不对劲...',
                                        '<18>{#p/papyrus}{#f/6}我不太懂狗的世界，\n但它肯定是失去了啥，\n才会做出那样的举动！',
                                        '<18>{#p/papyrus}{#f/5}后来，\n我找ALPHYS问了这事...',
                                        '<18>{#p/papyrus}{#f/5}她把事情\n都告诉了我。',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}听罢，我十分难受。',
                                        '<18>{#p/papyrus}{#f/6}但我也清楚\n为啥CANIS MAJOR\n那么想找人玩了。',
                                        '<18>{#p/papyrus}{#f/5}所以，在那之后。\n只要有空，我就陪它玩。',
                                        "<25>{#p/sans}{#f/3}* 嗯...\n* 希望这能让它开心点。",
                                        '<25>{#p/sans}{#f/0}* 干得不错。'
                                    ]);
                                } else if (!ddoge) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}是电话声。\n一名高级守卫打来了\n电话。',
                                        '<18>{#p/papyrus}{#f/6}电话那边的声音\n十分失落。',
                                        "<18>{#p/papyrus}{#f/5}电话那边说，\n她是UNDYNE的朋友。",
                                        '<18>{#p/papyrus}{#f/6}让我去找她，\n商议一些“重要事务”。',
                                        '<18>{#p/papyrus}{#f/6}一路上，\n我有点紧张...',
                                        '<18>{#p/papyrus}{#f/5}还好，她叫我过去，\n只是想谈谈心。',
                                        '<18>{#p/papyrus}{#f/4}其实，跟她聊天时，\n我感觉她话里有话...',
                                        '<18>{#p/papyrus}{#f/5}仔细想了想，\n我知道她想说啥了。',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGE问我，\n她这么拼死拼活\n保护怪物，为了啥？',
                                        '<18>{#p/papyrus}{#f/6}她问我\n当上皇家守卫，\n到底有什么意义？',
                                        '<18>{#p/papyrus}{#f/5}她问我...',
                                        '<18>{#p/papyrus}{#f/6}区区一个人类，\n就能歼灭整支守卫队，\n那她还能改变什么？',
                                        '<18>{#p/papyrus}{#f/5}...\n我没有回答，\n带她去了首塔。',
                                        '<18>{#p/papyrus}{#f/5}我把灵魂拿了出来，\n对她说...',
                                        
                                        '<18>{#p/papyrus}{#f/6}“只差一个。”',
                                        '<18>{#p/papyrus}{#f/5}听罢，她转过头，\n闭目深思...',
                                        '<18>{#p/papyrus}{#f/6}“明白了。”',
                                        '<25>{#p/sans}{#f/0}* 哎呀。\n* 真不容易啊。',
                                        "<25>{#p/sans}{#f/3}* 希望看完灵魂后，\n  她能恢复一点士气吧。"
                                    ]);
                                } else if (!droyalguards) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}是电话声。\n两名带编号的守卫\n打来了电话。',
                                        '<18>{#p/papyrus}{#f/6}电话那边的声音\n十分失落。',
                                        '<18>{#p/papyrus}{#f/5}电话那边说，\n他俩爱一起吃冰淇淋。',
                                        '<18>{#p/papyrus}{#f/6}有事想和我聊聊，\n叫我过去。',
                                        '<25>{#p/sans}{#f/0}* 我想...',
                                        "<25>{#p/sans}{#f/3}* 他俩叫你过去，\n  肯定不是请你吃\n  冰淇淋。",
                                        '<18>{#p/papyrus}{#f/6}要真是那样\n就好了。',
                                        '<18>{#p/papyrus}{#f/5}没有冰淇淋，\n只有... 噩耗。',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}他俩说，\n自己还刚被提拔，\n可现在...',
                                        '<18>{#p/papyrus}{#f/6}却感觉所有训练，\n所有努力，\n都分文不值。',
                                        '<18>{#p/papyrus}{#f/6}但难不倒我！',
'<18>{#p/papyrus}{#f/6}我说，\n“帮你俩找个新工作，\n咋样？”',
                                        '<18>{#p/papyrus}{#f/5}我想了一堆点子。',
                                        '<18>{#p/papyrus}{#f/4}大部分点子都没被采纳，\n但偏偏，“加入游泳队”\n很合他俩胃口。',
                                        '<18>{#p/papyrus}{#f/4}连我都挺纳闷。',
                                        "<25>{#p/sans}{#f/0}* 一号，二号他俩\n  后来成了职业游泳运动员？",
                                        "<25>{#p/sans}{#f/3}* 嗯，他俩开心就好。",
                                        "<18>{#p/papyrus}{#f/4}哦，你放心！",
                                        "<18>{#p/papyrus}{#f/0}他俩不仅开心，\n还挺出名呢！",
                                        "<18>{#p/papyrus}{#f/5}...\n只是...",
                                        '<18>{#p/papyrus}{#f/5}一想到他俩为啥转行，\n辞去守卫，当上运动员...\n我心里就一阵难过。'
                                    ]);
                                } else if (!dmadjick) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}一回神，\n一名奇怪的魔术师\n突然出现在安保室里。',
                                        '<18>{#p/papyrus}{#f/6}它问我，\n“活着，有什么意义？”',
                                        '<18>{#p/papyrus}{#f/4}我不得不...\n让他迁就一下，\n说话“形而下”一点。',
                                        '<18>{#p/papyrus}{#f/4}这都是往好了说。',
                                        '<25>{#p/sans}{#f/3}* 我都能想象到\n  那幅场面。',
                                        '<25>{#p/sans}{#f/0}* 那么，在“深入交谈”后，\n  你有什么收获？',
                                        '<18>{#p/papyrus}{#f/5}嗯...\n我学到了很多东西。',
                                        '<18>{#p/papyrus}{#f/6}有恐惧，\n有忧虑...',
                                        '<18>{#p/papyrus}{#f/5}还有那异常强烈的...\n失落。',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}COZMO穷尽一生，\n就为了让它的导师\n重视它。',
                                        '<18>{#p/papyrus}{#f/6}而如今，\n导师TERRESTRIA\n却先一步离去。',
'<18>{#p/papyrus}{#f/6}让它备受打击。',
                                        '<18>{#p/papyrus}{#f/5}它总觉得自己不够优秀，\n无法成为导师的骄傲。\n现在却再也没有机会了。',
                                        '<18>{#p/papyrus}{#f/6}我可不服！',
                                        "<18>{#p/papyrus}{#f/5}我知道。\n导师看到它还活着，\n一定会很欣慰的。",
                                        '<18>{#p/papyrus}{#f/4}最熟悉，了解导师的人，\n非它莫属。',
                                        '<18>{#p/papyrus}{#f/5}所以，它最该做的，\n正是继承导师的遗志，\n坚强活着。',
                                        '<18>{#p/papyrus}{#f/0}我们越聊越起劲，\n聊了很久！',
                                        "<18>{#p/papyrus}{#f/6}我都佩服自己\n居然能听懂它说话！",
                                        '<18>{#p/papyrus}{#f/0}聊罢，\n我俩心满意足地分别。',
                                        '<18>{#p/papyrus}{#f/5}可我...\n总感觉哪里不对劲。'
                                    ]);
                                } else {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}声音是从安保门那边\n传来的，\n有人在敲门。',
                                        '<18>{#p/papyrus}{#f/4}敲门者很有礼貌。\n我请她进来坐坐。',
                                        '<18>{#p/papyrus}{#f/5}结果发现...\n她块头太大，进不来。',
                                        '<18>{#p/papyrus}{#f/5}所以...',
                                        '<18>{#p/papyrus}{#f/6}为了让这位身着盔甲的\n高大骑士进来，\n我把器材都搬到了外面。',
                                        '<18>{#p/papyrus}{#f/4}随后，我们聊了天。',
                                        '<18>{#p/papyrus}{#f/5}主题是...',
                                        '<18>{#p/papyrus}{#f/6}...死亡。',
                                        '<18>{#p/papyrus}{#f/6}我并不喜欢这个话题，\n但她很想找人倾诉。',
                                        
                                        '<18>{#p/papyrus}{#f/6}她说，\n自己活得太久了。',
                                        '<18>{#p/papyrus}{#f/6}她说，\n自己目睹了无数人死去。',
                                        '<18>{#p/papyrus}{#f/5}她还说...',
                                        '<18>{#p/papyrus}{#f/3}...别的守卫们，\n全都...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}我想让她开心点。',
                                        "<18>{#p/papyrus}{#f/6}可是，不管怎么安慰，\nTERRESTRIA还是\n那么痛苦！",
                                        '<18>{#p/papyrus}{#f/5}所以...',
                                        '<18>{#p/papyrus}{#f/5}我闭上了嘴，\n紧紧抱住她。',
                                        '<18>{#p/papyrus}{#f/6}这一抱，\n就是几个小时...',
                                        "<18>{#p/papyrus}{#f/6}我都没想到，\n居然抱了那么久！！",
                                        "<18>{#p/papyrus}{#f/5}后来，她走了。\n走之前，她说，\n“会挺过去的。”",
                                        "<18>{#p/papyrus}{#f/4}我半信半疑。",
                                        "<18>{#p/papyrus}{#f/5}但她既然那么说，\n我也不想刺探得太深，\n只能衷心祝福。",
                                        '<25>{#p/sans}{#f/3}* 嗯...',
                                        "<25>{#p/sans}{#f/0}* 她要是又需要帮助，\n  肯定会告诉你的。",
                                        '<18>{#p/papyrus}{#f/5}但愿吧。'
                                    ]);
                                }
                                addB([
                                    '<18>{#p/papyrus}{#f/5}...',
                                    "<18>{#p/papyrus}{#f/5}知道了你的所作所为，\n还有那些悲剧...\n我心里挺不好受的。",
                                    "<18>{#p/papyrus}{#f/6}但这些，不全怪你。",
                                    "<18>{#p/papyrus}{#f/6}皇家守卫的工作，\n就是“抓住人类”...",
                                    "<18>{#p/papyrus}{#f/5}渐渐地，\n我明白了“抓住人类”\n这四个字代表什么。",
                                    '<18>{#p/papyrus}{#f/5}明白了，身为守卫，\n就要履行职责，\n摧毁某些东西。',
                                    '<18>{#p/papyrus}{#f/3}明白了... 这是战争，\n这是对抗。\n这是一件痛苦的事。',
                                    '<18>{#p/papyrus}{#f/31}...',
                                    "<18>{#p/papyrus}{#f/5}也许，从一开始\n我就不该想着当什么\n皇家守卫。",
                                    '<18>{#p/papyrus}{#f/6}也许...\nUNDYNE那么做，\n就是为了保护我。',
                                    "<18>{#p/papyrus}{#f/5}...我不知道，\n怎么面对“守卫”\n这个称号。",
                                    "<25>{#p/sans}{#f/0}* 嘿，给人类讲讲\n  之后发生的故事吧。",
                                    '<18>{#p/papyrus}{#f/6}哦对！！\n差点跑题了。',
                                    '<18>{#p/papyrus}{#f/0}跟守卫的会面\n给我搞得特别累。',
                                    "<18>{#p/papyrus}{#f/4}于是（别说我懒哦）...",
                                    '<18>{#p/papyrus}{#f/4}回家后，我倒头就睡，\n睡了很久。'
                                ]);
                                if (!ddoggo || !dlesserdog || !ddogs || !dgreatdog || !dknightknight) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/6}后来，我被一阵敲门声弄醒。',
                                        '<18>{#p/papyrus}{#f/0}有人来我家找我。'
                                    ]);
                                } else if (!ddoge || !droyalguards) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/6}后来，\n我被一阵电话铃声吵醒。',
                                        '<18>{#p/papyrus}{#f/0}有人打电话找我。'
                                    ]);
                                } else {
                                    addB([
                                        '<19>{#p/papyrus}{#f/6}后来，又有人\n闪现到我的面前，\n把我惊醒。',
                                        '<18>{#p/papyrus}{#f/0}这人来我家找我。'
                                    ]);
                                }
                                addB([
                                    '<18>{#p/papyrus}{#f/5}原来，是遇到了困难，\n想让我帮忙解开心结。',
                                    '<18>{#p/papyrus}{#f/0}正好，\n我睡了一觉，精神百倍！',
                                    '<18>{#p/papyrus}{#f/0}于是，我帮助了他。',
                                    '<18>{#p/papyrus}{#f/4}第二天，\n又有人找我谈心。',
                                    '<18>{#p/papyrus}{#f/5}第三天，\n增加到两个。',
                                    '<18>{#p/papyrus}{#f/6}第四天，三个！\n第五天，五个！！\n第六天，七个！！！',
                                    '<25>{#p/sans}{#f/2}* 第七天，十一个？',
                                    '<18>{#p/papyrus}{#f/4}不。\n再往后，\n人数都是合数了。',
                                    '<18>{#p/papyrus}{#f/6}无论谁来，\n我都会尽力帮助他！！',
                                    '<18>{#p/papyrus}{#f/5}来的人越来越多，\n我就在想...',
                                    "<18>{#p/papyrus}{#f/6}是时候进行\n产业化发展，\n做大做强了！！",
                                    '<18>{#p/papyrus}{#f/9}所以，我把\n“看守人类灵魂”的工作\n交给了那名皇家守卫。',
                                    '<18>{#p/papyrus}{#f/4}转而将工作重心\n转移到建设疗养公司上。',
                                    
                                    '<18>{#p/papyrus}{#f/0}我写了宣传语，\n买了几幢大楼，\n雇了些员工，创办公司。',
                                    '<18>{#p/papyrus}{#f/0}名为“帕牌儒思”。',
                                    '<18>{#p/papyrus}{#f/9}我们的宣传口号是：\n“我们多-费-心，\n 您才更-省-心！”',
                                    '<25>{#p/sans}{#f/0}* 这口号真不错。',
                                    '<18>{#p/papyrus}{#f/0}对了，SANS可是我们的\n前台接待员。',
                                    "<18>{#p/papyrus}{#f/9}有他帮忙，\n我就能从容地服务\n每一位患者！",
                                    '<18>{#p/papyrus}{#f/5}终于啊，我的兄弟\n也“伟大”起来了...',
                                    "<18>{#p/papyrus}{#f/0}真为他骄傲！！",
                                    '<25>{#p/sans}{#f/0}* 是啊，这公司的分工\n  很合咱俩的性格呢。',
                                    '<18>{#p/papyrus}{#f/9}那肯定的！！！\n开了公司，新面孔\n简直多得应接不暇啊！！',
                                    '<25>{#p/sans}{#f/2}* 嘿嘿嘿，“应接”不暇。',
                                    "<18>{#p/papyrus}{#f/6}啊？！\n啥事把你乐成这样？",
                                    '<25>{#p/sans}{#f/3}* 哦，没啥。',
                                    "<18>{#p/papyrus}{#f/4}你真是一点没变。",
                                    '<18>{#p/papyrus}{#f/5}...\n总之...',
                                    "<18>{#p/papyrus}{#f/6}不管过去发生了什么...",
                                    '<18>{#p/papyrus}{#f/5}我希望，有一天\n你也能找到自己的\n使命与梦想。',
                                    '<18>{#p/papyrus}{#f/4}要是心情不好，\n想找人聊天...',
                                    '<18>{#p/papyrus}{#f/6}就回个电话，\n我们肯定会...',
                                    '<18>{#p/papyrus}{#f/4}...哦，原来如此。\n这双关挺逗，SANS。',
                                    '<25>{#p/sans}{#f/2}* 嘿，你终于明白\n  我为啥{@fill=#ff0}接{@fill=#fff}话茬了。',
                                    '<18>{#p/papyrus}{#f/7}总之，回个电话，\n我们肯定会接！！！'
                                ]);
                            } else {
                                k = 'dark_alphys_virtual'; // NO-TRANSLATE

                                addB([
                                    "<18>{#p/papyrus}{#f/5}这段时间里，\n很多伙伴失踪了。",
                                    "<18>{#p/papyrus}{#f/6}ASGORE，\n我俩经常一起分享故事，\n现在，他却失踪了...",
                                    "<18>{#p/papyrus}{#f/6}UNDYNE，\n一直努力训练我，\n现在，她也失踪了...",
                                    "<18>{#p/papyrus}{#f/5}还有那些皇家守卫，\n他们每次上班时，\n都会跟我打招呼。",
                                    '<18>{#p/papyrus}{#f/5}现在，也失踪了...',
                                    "<18>{#p/papyrus}{#f/5}曾经和他们共度\n那么多时光，可现在，\n却一个个都失踪了。",
                                    "<18>{#p/papyrus}{#f/5}不知道他们什么时候\n才能回来。",
                                    "<18>{#p/papyrus}{#f/7}我想他们，\n都快想疯了！！！",
                                    "<18>{#p/papyrus}{#f/4}他们没有日程表吗？",
                                    '<18>{#p/papyrus}{#f/6}他们不看日历吗？！',
                                    "<18>{#p/papyrus}{#f/5}谁能告诉我，\n他们啥时候能回来啊！",
                                    "<25>{#p/sans}{#f/3}* 嘿...",
                                    '<25>{#p/sans}{#f/0}* 你想他们，我也想。',
'<25>{#p/sans}{#f/0}* 可也不能成天只盼着\n  他们回来，别的啥也不干啊。\n* 日子该过还得过。',
                                    '<25>{#p/sans}{#f/2}* 跟人类聊点别的吧。',
                                    '<18>{#p/papyrus}{#f/4}嗯...\n聊点别的...',
                                    '<18>{#p/papyrus}{#f/0}哦！想到了！\n聊聊“档案”空间吧！',
                                    '<25>{#p/sans}{#f/2}* 好主意。\n* 那里都快成你第二个家了。',
                                    '<18>{#p/papyrus}{#f/9}我去那里，\n可是有正当理由的！',
                                    '<18>{#p/papyrus}{#f/0}给你解释下\n最近我为啥总去吧。',
                                    '<18>{#p/papyrus}{#f/4}每天，我除了看守灵魂，\n啥都不用干...',
                                    '<18>{#p/papyrus}{#f/0}就一下子闲下来了。',
                                    '<18>{#p/papyrus}{#f/4}我就在想，\n“怎么打发时间呢？”',
                                    '<18>{#p/papyrus}{#f/0}有一天，我在一间\n储物柜里发现了一个...\n奇怪的装置。',
                                    '<18>{#p/papyrus}{#f/5}我找到ALPHYS，\n问她，那东西是干啥的。',
                                    '<18>{#p/papyrus}{#f/6}结果，她一下子\n打开了话匣子，\n叨叨个没完！！',
                                    '<18>{#p/papyrus}{#f/0}简单说，\n那个装置是用来\n模拟虚拟空间的。',
                                    '<18>{#p/papyrus}{#f/5}我问她，\n“咱们进虚拟空间，\n 体验一下，咋样？”',
                                    '<18>{#p/papyrus}{#f/4}她看我挺无聊的，\n就同意了。',
                                    "<18>{#p/papyrus}{#f/4}不过，由于没有加载\n虚拟世界资源包，\n“档案”里啥都没有。",
                                    '<18>{#p/papyrus}{#f/0}于是...\nALPHYS下载了\n一部知名科幻番。',
                                    '<18>{#p/papyrus}{#f/0}然后让系统根据它\n“生成”一个虚拟世界。',
                                    '<18>{#p/papyrus}{#f/5}世界生成完毕后，\n她让我戴上一个\n奇怪的头盔...',
                                    '<18>{#p/papyrus}{#f/6}我有点不敢戴，\n但为了科学，\n我还是照做了！！',
                                    '<18>{#p/papyrus}{#f/4}突然...',
                                    "<18>{#p/papyrus}{#f/9}我被传送到了一个\n从未见过的世界！！！",
                                    '<18>{#p/papyrus}{#f/0}在那里，我畅游了\n好几个小时...',
                                    '<18>{#p/papyrus}{#f/0}穿梭在行星之间，\n邂逅形形色色的人...',
                                    "<18>{#p/papyrus}{#f/5}看到有人受伤，\n我也跟着难受。",
                                    '<18>{#p/papyrus}{#f/9}虽然世界是假的，\n但情感是真的！',
                                    '<18>{#p/papyrus}{#f/5}所以，我拼尽全力，\n拯救所有人。',
                                    '<18>{#p/papyrus}{#f/0}后来，ALPHYS也来帮忙，\n一起拯救大家！',
                                    "<18>{#p/papyrus}{#f/0}从那时起，\n我俩就总去虚拟空间\n一起冒险。",
                                    "<25>{#p/sans}{#f/0}* 她好像现在就在那里呢。",
                                    '<25>{#p/sans}{#f/2}* 你快过去看看。',
                                    '<18>{#p/papyrus}{#f/9}好，我这就去！',
                                    '<18>{#p/papyrus}{#f/0}对不起，人类！\n冒险不等骨啊！',
                                    '<25>{#p/sans}{#f/3}* ...',
                                    "<25>{#p/sans}{#f/3}* 挺好的。\n* 他把注意力转移到虚拟空间上，\n  就不用去想那些事了。",
                                    "<25>{#p/sans}{#f/0}* 这段日子里，\n  很多民众过得并不好。",
                                    '<25>{#p/sans}{#f/0}* 皇家卫队全军覆没，\n  能源供应也出了故障...',
                                    '<25>{#p/sans}{#f/3}* 百姓生活很苦，\n  却没人可以倾诉。',
                                    "<25>{#p/sans}{#f/0}* 即使他们想倾诉，\n  也鼓不起勇气开口...",
                                    '<25>{#p/sans}{#f/3}* 没有勇气跟别人诉苦。',
                                    '<25>{#p/sans}{#f/3}* ...'
                                ]);
                                if (hkills > 19) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 许多民众都讨厌人类，\n  我并不意外。",
                                        '<25>{#p/sans}{#f/0}* 你就算饶了我的兄弟...\n  也还是杀了许多怪物。',
                                        '<25>{#p/sans}{#f/3}* 其中，有不少怪物身居要职，\n  对这里十分重要。'
                                    ]);
                                } else {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 倒不是指责你，\n  说你是罪魁祸首。",
                                        "<25>{#p/sans}{#f/0}* 你不仅饶恕了我兄弟，\n  也放过了不少其他怪物。",
                                        '<25>{#p/sans}{#f/3}* 只是，对大家来说。\n  你杀的那几名守卫\n  都是很重要的人。'
                                    ]);
                                }
                                addB([
                                    '<25>{#p/sans}{#f/0}* ...虽然在主观上\n  我挺反感他们的行径...',
                                    '<25>{#p/sans}{#f/0}* 但客观来讲，有皇家卫队，\n  民众确实心里更踏实，\n  更有安全感。',
                                    "<25>{#p/sans}{#f/3}* 但现在，守卫没了，\n  大伙的安全感也没了。",
                                    "<25>{#p/sans}{#f/3}* 呵，连mettaton也“失踪”了。",
                                    '<25>{#p/sans}{#f/0}* 大家没节目可看了，\n  也没有周边可买了...',
                                    '<25>{#p/sans}{#f/0}* 没了他，前哨站\n  也失去了不少活力。'
                                ]);
                                if (hkills > 19) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 至于你，我就直说吧。",
                                        '<25>{#p/sans}{#f/3}* 你根本不是啥好人。\n* 就这么简单。',
                                        '<25>{#p/sans}{#f/0}* ...\n* 总之，我要挂电话了。',
                                        '<25>{#p/sans}{#f/3}* 不好意思，孩子。',
                                        '<25>{#p/sans}{#f/3}* ...'
                                    ]);
                                } else {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 至于你，不太好评价。",
                                        "<25>{#p/sans}{#f/3}* 你并不坏，\n  但我也不咋喜欢你。",
                                        '<25>{#p/sans}{#f/0}* ...\n* 总之，我要挂电话了。',
                                        '<25>{#p/sans}{#f/3}* 不好意思，孩子。',
                                        '<25>{#p/sans}{#f/3}* 在太空飞行多注意安全。\n* 拜拜。'
                                    ]);
                                }
                                addB(['<32>{#s/equip}{#p/event}* 滴...']);
                            }
                        } else {
                            if (!dtoriel) {
                                addB(['<25>{#p/sans}{#f/0}* 她不帮忙，\n  只能重新招人了。']);
                            } else {
                                addB(["<25>{#p/sans}{#f/0}* 我想了半天，\n  也没想到合适的人选..."]);
                            }
                            addB(['<25>{#p/sans}{#f/0}* ...于是，我们到处询问。\n  看有没有信得过的人\n  愿意接手这份工作。']);
                            if (!ddoggo) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了doggo...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这名犬卫队成员\n  活了下来。',
                                    '<25>{#p/sans}{#f/2}* 好在，他欣然接受了\n  这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Doggo吗？'
                                ]);
                            } else if (!dlesserdog) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了\n  canis minor...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这名犬卫队成员\n  活了下来。',
                                    '<25>{#p/sans}{#f/2}* 好在，它欣然接受了\n  这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Canis Minor吗？'
                                ]);
                            } else if (!ddogs) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了\n  dogamy和dogaressa...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  整个犬卫队，\n  只有他们活了下来。',
                                    '<25>{#p/sans}{#f/2}* 好在，他们欣然接受了\n  这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Dogamy和\n  Dogaressa吗？'
                                ]);
                            } else if (!dgreatdog) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了\n  canis major...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这名犬卫队成员\n  活了下来。',
                                    '<25>{#p/sans}{#f/2}* 好在，它欣然接受了\n  这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Canis Major吗？'
                                ]);
                            } else if (!ddoge) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了doge...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这名特战队成员\n  活了下来。',
                                    '<25>{#p/sans}{#f/3}* 她整理好行装，\n  随即接下了这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Doge吗？'
                                ]);
                            } else if (!droyalguards) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了一号守卫\n  和二号守卫...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这两名巡逻官\n  活了下来。',
                                    '<25>{#p/sans}{#f/3}* 他俩卸下了盔甲，\n  最终接下了这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说一号，二号吗？'
                                ]);
                            } else if (!dmadjick) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了cozmo...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这名特战队成员\n  活了下来。',
                                    '<25>{#p/sans}{#f/3}* 刚接下这份工作时，\n  他还挺困惑。\n* 但很快他就适应了。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Cozmo吗？'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 很快，我们找到了terrestria...',
                                    '<25>{#p/sans}{#f/0}* 皇家卫队惨遭剿杀，\n  只有这名特战队成员\n  活了下来。',
                                    '<25>{#p/sans}{#f/3}* 正如我所料，\n  她心怀敬畏，\n  庄严地接受了这份工作。',
                                    '<25>{#p/alphys}{#f/27}* 哦？\n* 你刚刚在说Terrestria吗？'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 哦，是alphys呀。\n* 我正给人类留言呢。",
                                '<25>{#p/alphys}{#f/17}* 行。\n* 之前你确实说\n  要给人类打个电话。'
                            ]);
                            if (!ddoggo) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 没错，\n  虽然Doggo有时会焦虑...",
                                    '<25>{#p/alphys}{#f/8}* 但有我陪着他。\n* 以前，我帮过他，\n  所以他也安心了。'
                                ]);
                            } else if (!dlesserdog) {
                                addB([
                                    '<25>{#p/alphys}{#f/6}* 没错。',
'<25>{#p/alphys}{#f/6}* 虽然那狗狗脖子太长，\n  有时挺麻烦的...\n* 但它活干得不错。',
                                    '<25>{#p/alphys}{#f/8}* 只要有人摸它，\n  没完没了地摸它，\n  它就心满意足。'
                                ]);
                            } else if (!ddogs) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 没错。\n* 那两只狗狗只要在一起，\n  就能把活干得很漂亮。",
                                    '<25>{#p/alphys}{#f/8}* 他俩这么卖力，\n  各自想要的却是...\n  “一个人静静”。'
                                ]);
                            } else if (!dgreatdog) {
                                addB([
                                    '<25>{#p/alphys}{#f/6}* 没错。\n* 那只大狗不仅接下了工作，\n  还干得特别起劲。',
                                    '<25>{#p/alphys}{#f/8}* 它不求别的，\n  只求能多被“摸摸头”。'
                                ]);
                            } else if (!ddoge) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 没错。\n* Doge虽然有点冷血，\n  但对工作十分认真。",
                                    '<25>{#p/alphys}{#f/8}* 因此，\n  我们总请她洗冷水澡。\n* 乍一听很怪，但确实合理。'
                                ]);
                            } else if (!droyalguards) {
                                addB([
                                    '<26>{#p/alphys}{#f/6}* 没错。',
'<26>{#p/alphys}{#f/6}* 一号、二号他俩特别可爱。\n  而且没想到...\n  活还干的不错。',
                                    '<25>{#p/alphys}{#f/8}* 看他俩工作那么卖力，\n  我总请他俩吃冰淇淋。\n* 他们特别爱吃。'
                                ]);
                            } else if (!dmadjick) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 没错。\n* 虽然它有时会“躁动”，\n  但活干得不错。",
                                    '<25>{#p/alphys}{#f/8}* 因此，我们总奖励它\n  一些诗歌。\n* 它非常喜欢。'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* 没错。\n* 她... 干得非常出色。",
                                    '<25>{#p/alphys}{#f/8}* 因此，我们总给它\n  唱安魂曲作为奖励。\n* 那些曲子能让她平静下来。'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 挺好的。\n* 工作安排得不错。",
                                "<25>{#p/sans}{#f/3}* 大家各司其职，各得其所。\n* 所有人都很幸福。",
                                '<25>{#p/sans}{#f/3}* ...',
                                '<25>{#p/sans}{#f/3}* 对，所有“人”都很幸福。',
                                '<25>{#p/alphys}{#f/15}* ...这...',
                                "<25>{#p/alphys}{#f/10}* 你俩聊吧。\n* 我先走了...",
                                '<25>{#p/sans}{#f/0}* 再等等，\n  我马上打完了。',
                                '<25>{#p/alphys}{#f/17}* ...哦。',
                                "<25>{#p/sans}{#f/3}* 对前哨站居民来说。\n* 活着，就是煎熬。",
                                '<25>{#p/sans}{#f/0}* 对我如此，\n  对alphys更是如此...',
                                '<25>{#p/sans}{#f/3}* ...对所有怪物，\n  都是如此。',
                                "<25>{#p/alphys}{#f/24}* 是啊。\n* 我们遭这些罪，\n  都是因为你。",
                                '<25>{#p/alphys}{#f/25}* 真吓人。\n* 区区一个小孩\n  居然能杀好几只怪物。'
                            ]);
                            if (hkills > 19) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* 那何止是\n  “好几只怪物”...',
                                    '<25>{#p/sans}{#f/0}* 你杀的...\n  可是许多重要的大将。',
                                    '<25>{#p/sans}{#f/0}* 他们的死，\n  沉重打击了大家的希望。',
                                    '<25>{#p/sans}{#f/3}* ...而且，\n  你还杀了“他”...'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/sans}{#f/3}* 平心而论，\n  你杀的怪不算多。",
                                    '<25>{#p/sans}{#f/0}* 遇到那些守卫，\n  你很害怕，想自保，\n  我能理解。',
                                    '<25>{#p/sans}{#f/0}* 而且，面对其他怪物时，\n  你也没有大开杀戒。',
                                    '<25>{#p/sans}{#f/3}* ...话虽如此，\n  你还是杀了“他”...'
                                ]);
                            }
                            addB(['<25>{#p/sans}{#f/0}* 我敢说，\n  这事，你找不出任何借口。']);
                            if (
                                world.edgy ||
                                (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                            ) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 他只是想拉你一把，\n  让你迷途知返。',
                                    '<25>{#p/sans}{#f/3}* 你却原形毕露，\n  把他撂倒。'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 他自始至终\n  从未想伤害你。',
                                    '<25>{#p/sans}{#f/3}* 你却想直接要了他的命。'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 别想着装傻。\n* “他”是谁，你心知肚明。",
                                '<25>{#p/alphys}{#f/20}* 我也心知肚明。',
                                "<25>{#p/sans}{#f/3}* ...\n* 要是你能听到我的留言...",
                                "<25>{#p/sans}{#f/0}* 希望你能知道\n  你给这里带来了\n  多少痛苦。",
                                '<25>{#p/sans}{#f/0}* asgore死了，undyne死了。\n* 守卫死了。\n* mettaton死了。',
                                '<25>{#p/sans}{#f/3}* ...我的心也死了。',
'<25>{#p/sans}{#f/3}* 挂电话吧。',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        }
                    } else if (SAVE.data.n.state_wastelands_toriel !== 0 && SAVE.data.n.kills_wastelands < 16) {
                        k = 'dark_mew'; // NO-TRANSLATE

                        m = music.gameshow;
                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/sans}{#f/0}* 你好呀。',
                            '<25>{#p/sans}{#f/4}* 喂，有人吗？',
                            "<25>{#p/sans}{#f/2}* 没人？\n* 那我就留个言吧。"
                        ]);
                        addB([
                            '<25>{#p/sans}{#f/0}* 在你走后，\n  坏事一件接一件。',
                            '<25>{#p/sans}{#f/3}* asgore死了，\n  undyne死了...',
                            '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的计划\n  让核心陷入停摆。',
                            '<25>{#p/sans}{#f/3}* 能量供应失控，\n  许多民众因此丧命。',
                            '<25>{#p/sans}{#f/3}* 连“档案”里的人类\n  都没能幸免于难。',
'<25>{#p/sans}{#f/3}* 容器遭受电击，\n  他们当场丧命。',
                            '<25>{#p/sans}{#f/0}* 简单讲讲后续。',
'<25>{#p/sans}{#f/0}* 我和alphys把灵魂\n  转移到安全的地方。',
                            '<25>{#p/sans}{#f/3}* 容器防碎不防偷，\n  谁来看着灵魂呢？',
                            '<25>{#p/sans}{#f/0}* 思来想去...',
                            '<25>{#p/sans}{#f/0}* 唯一合适的人选...\n  是一位特战队退伍兵。',
                            '<25>{#p/sans}{#f/3}* 本来，\n  招它来是想帮点忙，\n  哪成想竟然“引狼入室”。',
                            '<25>{#p/sans}{#f/0}* 趁我们不在时...',
                            '<25>{#p/sans}{#f/3}* 它偷偷把灵魂都吸了。',
                            '<25>{#p/sans}{#f/3}* 借助灵魂之力，它从人偶\n  变身为《喵喵星火》的\n  英雄喵喵。',
                            '<25>{#p/sans}{#f/0}* 《喵喵星火》可是\n  整个喵喵系列\n  最棒的电影。',
                            "<25>{#p/sans}{#f/2}* 我哪敢说它不好啊，\n  我可不想丢掉小命。",
                            '<25>{#p/sans}{#f/0}* 总之，你看。\n* 我们的生活是多么幸福啊！',
                            '<25>{#p/sans}{#f/0}* 人们根本不用工作，\n  只要自愿地玩耍。',
                            "<25>{#p/sans}{#f/0}* 没有剥削，没有压迫。\n* ...一切都是“自愿”的。",
                            '<25>{#p/sans}{#f/3}* 连游戏也是公平的，\n  绝对公平。',
                            "<25>{#p/sans}{#f/0}* 这话千真万确，\n  就是真理。",
                            "<25>{#p/sans}{#f/0}* 就算喵喵想让游戏\n  不公平...",
                            "<25>{#p/sans}{#f/3}* 也有一股力量...",
                            "<25>{#p/sans}{#f/3}* 一股在她体内，\n  无形的力量去阻止她。",
                            '<25>{#p/sans}{#f/0}* 她会犹豫，会退缩。\n* 最终，一切重回正轨。',
                            '<25>{#p/sans}{#f/0}* 有一次...',
                            "<25>{#p/sans}{#f/3}* 喵喵叫我们玩个“决斗游戏”。\n  相互决斗，揍死出局，\n  没死就继续打，打死为止。",
                            '<25>{#p/sans}{#f/0}* 但是...\n* 比赛前夕，喵喵突然\n  改了主意。',
                            '<25>{#p/sans}{#f/3}* 不用非得打死，\n  只要打到失去知觉，\n  就能出局。',
                            '<25>{#p/sans}{#f/3}* 所以，我想...',
                            "<25>{#p/sans}{#f/2}* 除了野心和力量，\n  人类灵魂还给了她\n  某种“别的东西”。",
                            '<25>{#p/sans}{#f/0}* 也许... 那些人类灵魂\n  并未彻底沉睡？',
                            "<25>{#p/alphys}{#f/17}* 呃，打个岔，\n  到你了。",
                            '<25>{#p/sans}{#f/0}* 啥？',
                            "<25>{#p/alphys}{#f/18}* 该你上场决斗了！",
                            '<25>{#p/sans}{#f/3}* ...行。',
                            
                            '<25>{#p/sans}{#f/0}* 看来不能拖了。',
                            '<25>{#p/alphys}{#f/6}* 还是早点出发吧。',
                            '<25>{#p/alphys}{#f/23}* 大伙都等着你呢。',
                            '<25>{#p/sans}{#f/0}* 走之前，还有一件事。',
                            '<25>{#p/sans}{#f/0}* 收到消息的话，\n  告诉其他人类...',
                            '<25>{#p/sans}{#f/3}* 不要靠近这里！',
                            "<25>{#p/sans}{#f/3}* 我有预感，\n  “喵喵”正在准备一场\n  恐怖行动。",
                            '<25>{#p/sans}{#f/0}* 她要是得逞，\n  整个星系都会遭殃。',
                            "<25>{#p/sans}{#f/2}* ...只是提醒一下。",
                            "<25>{#p/alphys}{#f/23}* 快点，走啦！",
                            "<25>{#p/sans}{#f/0}* 出发。",
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    } else {
                        k = 'dark_charles'; // NO-TRANSLATE

                        m = music.letsmakeabombwhydontwe;
                        
                        addA([
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/sans}{#f/0}* 你好呀。',
                            '<25>{#p/sans}{#f/4}* 喂，有人吗？',
                            "<25>{#p/sans}{#f/2}* 没人？\n* 那我就留个言吧。"
                        ]);
                        addB([
                            "<25>{#p/sans}{#f/0}* 在你走后，一开始，\n  这里还不是“天堂”。",
                            '<25>{#p/sans}{#f/3}* asgore死了，\n  undyne死了...',
                            '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的计划\n  让核心陷入停摆。',
                            '<25>{#p/sans}{#f/3}* 能量供应失控，\n  许多民众因此丧命。',
                            '<25>{#p/sans}{#f/3}* 连“档案”里的人类\n  都没能幸免于难。',
'<25>{#p/sans}{#f/3}* 容器遭受电击，\n  他们当场丧命。',
                            '<25>{#p/sans}{#f/0}* 简单讲讲后续。',
'<25>{#p/sans}{#f/0}* 我和alphys把灵魂\n  转移到安全的地方。',
                            '<25>{#p/sans}{#f/4}* 容器防碎不防偷，\n  谁来看着灵魂呢？',
                            '<25>{#p/sans}{#f/0}* 我们狂打电话，\n  结果，只有某只小老鼠\n  接下了这活。',
                            '<25>{#p/sans}{#f/2}* 老鼠名叫charles，是核心员工。\n* 工作这么久，从没出过错。',
                            '<25>{#p/sans}{#f/0}* 结果...',
                            '<25>{#p/sans}{#f/0}* 成天在核心打工，\n  都染上职业病了。',
                            '<25>{#p/sans}{#f/0}* 每天，\n  拆电池，装电池，\n  拆电池，装电池...',
                            '<25>{#p/sans}{#f/3}* 只是这次电池\n  变成了人类灵魂。',
                            '<25>{#p/sans}{#f/0}* 结果自然是，\n  拆“人类灵魂”，\n  然后，装“人类灵魂”。',
                            '<25>{#p/sans}{#f/3}* ...所以，charles肯定是\n  工作得太认真了，\n  才把灵魂装到了自己身上。',
                            '<25>{#p/sans}{#f/3}* 哎呀哎呀，\n  你是不是在想...',
                            '<25>{#p/sans}{#f/0}* “太惨了！”\n* “没了灵魂，咋逃出去呢？”',
                            '<25>{#p/sans}{#f/0}* 可我们为什么要逃出去呢？',
                            "<25>{#p/sans}{#f/2}* charles就是神，\n  有了神的帮助，\n  我们想要啥，就有啥。",
                            '<18>{#p/papyrus}{#f/0}你好，人类！\n是我，伟大的PAPYRUS！',
                            '<18>{#p/papyrus}{#f/6}你不会以为，\n我死了吧？！',
                            "<18>{#p/papyrus}{#f/7}...呸，真是扯淡！\n我可是长生不老的\nPAPYRUS！",
                            '<18>{#p/papyrus}{#f/4}尊敬的CHARLES陛下\n又把我带回来了！',
                            '<18>{#p/papyrus}{#f/9}陛下真是\n太伟大了！！！',
                            "<25>{#p/sans}{#f/3}* ...你瞧，我们多幸福啊！\n* 这么快乐的世界，\n  怎么可能有苦难呢？",
                            '<25>{#p/sans}{#f/2}* 谁还稀罕离开前哨站呢？',
                            "<18>{#p/papyrus}{#f/0}对啊，干嘛要离开呢？\n几颗破星星，\n有啥好看的呢？！",
                            "<18>{#p/papyrus}{#f/9}这里就是天堂！\n就是极乐世界！\n去哪都比不上这里快乐！",
                            '<25>{#p/sans}{#f/2}* 太对了。',
                            '<25>{#p/sans}{#f/0}* ...总之，\n  谢谢你，让这里变成天堂。',
                            '<25>{#p/sans}{#f/0}* 要是在外面飞累了...',
                            "<25>{#p/sans}{#f/3}* 这里就是你的家。",
                            '<18>{#p/papyrus}{#f/0}对呀！快来这里\n体验极乐生活吧！\n简直爽死了！',
                            '<25>{#p/sans}{#f/2}* 嘿。\n* 但愿吧。',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else {
                    
                    k = 'dark_generic'; // NO-TRANSLATE

                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/sans}{#f/0}* 你好呀。',
                        "<25>{#p/sans}{#f/3}* 近况可好？"
                    ]);
                    addB([
                        '<25>{#p/sans}{#f/0}* 在你走后，\n  alphys... 吓得不轻。',
                        '<25>{#p/sans}{#f/0}* asgore死了，\n  undyne死了...',
                        '<25>{#p/sans}{#f/0}* 更糟的是，\n  mettaton那扯淡的计划\n  让核心陷入停摆。',
                        "<26>{#p/sans}{#f/3}* 好在，\n  皇家卫队火速赶往总控室，\n  稳住了核心。",
                        '<25>{#p/sans}{#f/0}* 与此同时，\n  alphys给我打了电话，\n  让我一起帮忙。',
                        "<25>{#p/sans}{#f/3}* 我赶了过去。\n* 那时，她的精神很不稳定。",
                        '<25>{#p/sans}{#f/0}* 但我相信，\n  她肯定能挺过去的。',
                        '<25>{#p/sans}{#f/2}* 毕竟我俩之前可是研究搭档，\n  我了解她。',
                        '<25>{#p/sans}{#f/0}* 所以，我坐在她身旁陪伴她。\n* 发生这些事，\n  她也需要时间慢慢恢复。',
                        "<26>{#p/sans}{#f/3}* 最终，她振作起来。\n  接任了asgore的王位。",
                        '<25>{#p/sans}{#f/0}* ...渐渐地，\n  风波平息了下来。',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Sans，我俩想去游泳，\n  可以陪我们去吗？',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* 你要是忙，\n  我俩自己去也行...",
                        "<25>{#p/sans}{#f/0}* 哇哦，\n  今天你俩挺兴奋嘛。",
                        "<25>{#p/sans}{#f/3}* 好呀。\n* 等我打完电话，咱们就出发。",
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* 说话算话哦。',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* 好耶！',
                        '<25>{#p/alphys}{#f/10}* 啊，对-对不起...',
                        '<25>{#p/alphys}{#f/20}* 我一会...\n  得去皇家防卫署开个会，\n  让Sans叔叔陪你们玩吧。',
                        "<25>{#p/alphys}{#f/6}* 孩子们，过来，\n  别打扰他打电话哦。",
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* 好的。',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Sans，对不起，\n  影响你打电话了...",
                        "<25>{#p/sans}{#f/2}* 嘿。别上火嘛。\n* 再过亿小会，我就打完了。",
                        '<25>{#p/sans}{#f/0}* ...',
                        '<25>{#p/sans}{#f/0}* alphys当上女王后，\n  制定了一些改革政策。',
                        '<25>{#p/sans}{#f/0}* 比如，解散皇家卫队。\n  重组为“皇家防卫署”。',
                        '<25>{#p/sans}{#f/0}* 相比皇家卫队，\n  防卫署不再“唯武力”论，\n  而是更注重使用科技。',
                        "<25>{#p/sans}{#f/3}* 有的成员配备了新型面罩，\n  有的配备了长程追踪仪...",
                        '<25>{#p/sans}{#f/2}* 有了这些装备，就能\n  第一时间发现坠落的孩子，\n  将其安全护送到首塔。'
                    ]);
                    if (!dpapyrus) {
                        addB([
                            "<25>{#p/sans}{#f/0}* 有趣的是，连papyrus\n  都是防卫署的一员。",
                            "<25>{#p/sans}{#f/3}* 他领导着一个小分队，\n  专门照顾那几个..."
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* 而原皇家卫队的队员们...',
                            '<25>{#p/sans}{#f/3}* 则组建起一支小分队，\n  专门照顾那几个...'
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/3}* ...最闹腾的孩子。',
                        '<26>{#p/sans}{#f/0}* 现在聊聊你。',
'<26>{#p/sans}{#f/0}* 你在前哨站的这段时间，\n  我们搜集到不少\n  有价值的数据。',
                        "<25>{#p/sans}{#f/0}* 防卫署分配了专人，\n  每天分析你的数据。",
                        '<25>{#p/sans}{#f/3}* 这样，怪物们就能\n  了解这类人的行事风格，\n  从而挖掘其弱点。',
                        "<25>{#p/sans}{#f/2}* 我们希望，\n  永远都不会用上这些数据。",
                        '<25>{#p/sans}{#f/0}* 但... 就怕万一。'
                    ]);
                    if (!dpapyrus) {
                        addB([
                            '<18>{#p/papyrus}{#f/0}嘿，SANS！\n最近忙啥呢？',
                            '<26>{#p/sans}{#f/3}* 呃，没啥。',
                            '<26>{#p/sans}{#f/0}* 你来休息吗？',
                            '<18>{#p/papyrus}{#f/9}当然了！',
                            "<18>{#p/papyrus}{#f/5}PAPYRUS的休息时间\n非常有限...",
                            '<18>{#p/papyrus}{#f/0}所以，我想珍惜这些\n休息时光。',
                            '<26>{#p/sans}{#f/3}* 嗯...',
                            '<25>{#p/sans}{#f/2}* 是不是alphys让你休息的？',
                            '<18>{#p/papyrus}{#f/4}...',
                            "<18>{#p/papyrus}{#f/4}她强迫我休息，\n我也没办法啊。",
                            '<18>{#p/papyrus}{#f/0}好，\n休息时间结束。',
                            '<18>{#p/papyrus}{#f/9}回去继续工作！',
                            '<25>{#p/sans}{#f/0}* 啊？\n* 兄弟，再待一会呗。\n  好不容易来一次。',
                            '<18>{#p/papyrus}{#f/6}再浪费时间，\n我就要错过\n下一个人类了！！',
                            "<25>{#p/sans}{#f/3}* ...嗯，也是。",
                            "<25>{#p/sans}{#f/0}* 只是，别把自己搞太累了。"
                        ]);
                    }
                    addB(['<25>{#p/sans}{#f/0}* ...']);
                    if (!dtoriel) {
                        if (!dpapyrus) {
                            addB([
                                '<25>{#p/sans}{#f/3}* 而最近，\n  alphys终于闲了下来。',
                                '<25>{#p/sans}{#f/0}* 王后重新上任，\n  帮忙一起照顾那些孩子。',
                                
                            ]);
                        } else {
                            addB([
                                '<25>{#p/sans}{#f/3}* 最起码，跟你比起来，\n  那几个孩子都挺酷的。',
                                '<25>{#p/sans}{#f/0}* 呵。\n* 王后重新上任后，\n  还帮忙一起照顾他们呢。',
                                
                            ]);
                        }
                        addB([
                            '<25>{#p/sans}{#f/3}* 至今，王后还是没能原谅\n  asgore...',
                            "<25>{#p/sans}{#f/0}* 也许假以时日，\n  矛盾会最终解开。",
                            "<25>{#p/sans}{#f/0}* 但我知道...",
                            "<25>{#p/sans}{#f/3}* 有个人，\n  她这辈子都不会原谅。"
                        ]);
                    } else {
                        if (!dpapyrus) {
                            addB(["<25>{#p/sans}{#f/3}* 最起码，他很开心，\n  干起活了，他能乐在其中。"]);
                            if (hkills > 19) {
                                addB(['<25>{#p/sans}{#f/0}* 但很多怪物可没有\n  他的福分。']);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 但不少怪物可没有\n  他的福分。']);
                            }
                        } else {
                            addB(["<25>{#p/sans}{#f/3}* 你知道吗？\n* 在这里活着\n  越来越孤独了。"]);
                            if (hkills > 19) {
                                addB(['<25>{#p/sans}{#f/0}* 不只是我，\n  很多很多人，都非常孤独。']);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 不是谁都有福分\n  家庭圆满，正常生活。'
                                ]);
                            }
                        }
                    }
                    addB([
                        "<25>{#p/alphys}{#f/20}* S-sans，对不起。\n* 你赶紧带孩子们去游泳吧。",
                        "<25>{#p/alphys}{#f/3}* 这些孩子都快把我\n  折磨疯了。",
                        '<25>{#p/sans}{#f/3}* 那...',
                        "<25>{#p/sans}{#f/0}* 剩下的话，就让alphys说吧。",
                        '<25>{#p/alphys}{#f/27}* 剩下的话？\n  谁啊？',
                        '<25>{#p/alphys}{#f/21}* ...',
                        "<25>{#p/alphys}{#f/21}* 原来是你。",
                        '<25>{#p/alphys}{#f/24}* 嗯。\n* 之前Sans说想给你打通电话。',
                        "<25>{#p/alphys}{#f/25}* 但我跟你可没啥好说的。"
                    ]);
                    if (hkills > 19) {
                        addB(["<25>{#p/alphys}{#f/25}* 你个杀人狂，\n  你个懦夫，\n  早点死得了。"]);
                        if (!dpapyrus) {
                            addB(['<25>{#p/alphys}{#f/24}* 就算你做了点好事...']);
                        } else {
                            addB(['<25>{#p/alphys}{#f/24}* 而且你差劲到...']);
                        }
                    } else {
                        addB(["<25>{#p/alphys}{#f/25}* 诚然，你没杀多少人，\n  但我还是烦你。"]);
                        if (!dpapyrus) {
                            addB(['<25>{#p/alphys}{#f/24}* 诚然，你确实做了点好事...']);
                        } else {
                            addB(['<25>{#p/alphys}{#f/24}* 最差劲的是，你还...']);
                        }
                    }
                    if (!dpapyrus) {
                        addB([
                            "<25>{#p/alphys}{#f/25}* 但也不够赎罪的。",
                            '<25>{#p/alphys}{#f/24}* ...',
                            '<25>{#p/alphys}{#f/24}* 谨代表前哨站所有居民...'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/25}* 把我挚友的亲兄弟杀了。',
                            '<25>{#p/alphys}{#f/24}* ...',
                            '<25>{#p/alphys}{#f/24}* 就让我代他...'
                        ]);
                    }
                    addB([
                        '<25>{#p/alphys}{#f/16}* 衷心祝愿你，\n  掉进黑洞，死无全尸！',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                }
            } else if (SAVE.data.b.ubershortcut || world.bad_lizard > 1) {
                k = 'dark_aborted'; // NO-TRANSLATE

                
                if (dmettaton) {
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<32>{#p/napstablook}* 嘿',
                        '<32>{#p/napstablook}* 有人接吗？',
                        "<32>{#p/napstablook}* 我...\n  想告诉你点事。",
                        "<32>{#p/napstablook}* 希望你不要介意。"
                    ]);
                    addB([
                        '<32>{#p/napstablook}* 把时间倒回到\n  你没离开时...',
                        '<32>{#p/napstablook}* 那时，\n  情况就不容乐观',
                        '<32>{#p/napstablook}* 人们死的死，伤的伤...\n  没受伤的，也吓得不轻...',
                        '<32>{#p/napstablook}* 很快，mettaton也在\n  压轴大戏中丧了命......',
                        "<32>{#p/napstablook}* 我却.........\n* 我却无能为力",
                        '<32>{#p/napstablook}* 那时...\n  我感觉天都塌了......',
                        '<32>{#p/napstablook}* 可我什么都做不了........\n  只能眼睁睁地看着他\n  死去............',
                        '<32>{#p/napstablook}* ...............',
                        '<32>{#p/napstablook}* 不只是我。\n* 很多人，眼睁睁地看着mettaton死，\n  都十分难受。',
                        '<32>{#p/napstablook}* 于是，身为mettaton的粉丝，\n  我们联合起来，成立了一个组织。\n  一起为mettaton而战。',
                        '<32>{#p/napstablook}* 记得他最后说的话吗？',
                        '<32>{#p/napstablook}* “躲得了初一，躲不过十五！”',
                        '<32>{#p/napstablook}* ...他错了。',
                        '<32>{#p/napstablook}* 杀了那么多人，\n  最终还是让你逃了，\n  毫发无损地逃了。',
                        "<32>{#p/napstablook}* 连asgore国王\n  都没弄死你。",
                        "<32>{#p/napstablook}* mettaton失败了...\n* 但他的遗言\n  却没有被遗忘。",
                        '<32>{#p/napstablook}* 我们把他的话记在心里，\n  化悲愤为力量，团结一心。\n* 誓死要让你付出代价。',
                        "<32>{#p/napstablook}* 休想拿“我只是调皮捣蛋”\n  这种话搪塞过去。\n* 你犯下的，是滔天罪行。",
                        "<32>{#p/napstablook}* 你侵略前哨站，大肆屠杀，\n  破坏我们的正常生活，\n  让怪物如堕地狱。"
                    ]);
                    if (!dundyne) {
                        addB([
                            '<32>{#p/napstablook}* 新女王undyne\n  十分支持我们。',
                            '<32>{#p/napstablook}* ...asgore死后，\n  她便继承了王位。',
                            "<32>{#p/napstablook}* 虽然她不怎么喜欢mettaton...",
                            '<32>{#p/napstablook}* 但那句“躲不过十五”，\n  让她产生了共鸣。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                '<32>{#p/napstablook}* 呵......\n  那时，toriel走出外域，\n  求undyne放你一马...',
                                '<32>{#p/napstablook}* 结果，被undyne狠狠笑话一通，\n  赶回了外域。',
'<32>{#p/napstablook}* 回去的路上，undyne就带领民众，\n  紧跟在后面嘲讽她，\n  一直笑话到她走回外域。',
                                '<32>{#p/napstablook}* ...因为对你的憎恨，\n  人们变得越来越团结。'
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* 不只是她，\n  很多人，都产生了共鸣。']);
                        }
                    } else if (!dtoriel) {
                        addB([
                            '<32>{#p/napstablook}* 可是，王后toriel\n  不太支持我们。',
                            '<32>{#p/napstablook}* ...asgore死后，\n  她便继承了王位。',
                            "<32>{#p/napstablook}* 她认同mettaton的话...",
                            '<32>{#p/napstablook}* 但她仍固执认为，\n  怪物应该与人类和平相处。',
                            "<32>{#p/napstablook}* .........\n* 无所谓。",
                            "<32>{#p/napstablook}* 她再怎么阻止，\n  我们还是会联合起来，\n  干掉你。"
                        ]);
                    } else {
                        addB([
                            '<32>{#p/napstablook}* 我们发现，\n  asgore一死，王位空缺。\n  前哨站没人管理了',
                            '<32>{#p/napstablook}* 所以...... 有人提议：\n  前哨站由我们来统治。',
                            '<32>{#p/napstablook}* 身为“反人类团体”的头号人物，\n  我被推举为前哨站新领导人...',
                            '<32>{#p/napstablook}* 虽然说我“领导”着前哨站，\n  但其实遇到大大小小的事，\n  都是大家一起商量，一起解决。',
                            "<32>{#p/napstablook}* 这制度挺棒的。",
                            '<32>{#p/napstablook}* 虽然身边的人一多，\n  我还不太习惯......',
                            '<32>{#p/napstablook}* 但好在，大家群策群力，\n  统治前哨站也没那么累了。'
                        ]);
                    }
                    addB([
                        '<32>{#p/napstablook}* 总之......',
                        "<32>{#p/napstablook}* 我打电话来，\n  就是想告诉你：\n* 我过的很好。",
                        '<32>{#p/napstablook}* 过得非常好。',
                        "<32>{#p/napstablook}* 我们不会因为你杀人...\n  就怕你。",
                        '<32>{#p/napstablook}* 你越打击我们，\n  我们就越敢还手。',
                        '<32>{#p/napstablook}* 终有一天...\n  我们会打破力场，\n  逃出前哨站......',
                        '<32>{#p/napstablook}* .........',
                        "<32>{#p/napstablook}* 到那时，你就算跑到天涯海角，\n  我们也会把你揪出来，\n  让你血债血偿。",
                        '<32>{#p/napstablook}* 呵呵呵......',
                        '<32>{#p/napstablook}* ......\n* 你不得好死。',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                } else {
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<32>{#p/mettaton}* 人类，耽搁你几分钟...',
                        "<32>{#p/mettaton}* 想和你说点事情。",
                        '<32>{#p/mettaton}* 喂？能听到吗？',
                        "<32>{#p/mettaton}* ...算了，\n  那我留个言吧。"
                    ]);
                    if (SAVE.data.b.ubershortcut) {
                        addB([
                            "<32>{#p/mettaton}* 首先，我得好好表扬一下你。",
                            '<32>{#p/mettaton}* 你听了ALPHYS的劝，\n  走捷径到了空境，\n  成功避开了UNDYNE。',
                            '<32>{#p/mettaton}* 也给我俩省了不少麻烦。'
                        ]);
                    } else if (royals < 4 && hkills > 19) {
                        addB([
                            "<32>{#p/mettaton}* 让我说你点啥好呢...",
                            '<32>{#p/mettaton}* 杀了守卫还没完，\n  又杀害平民百姓...',
                            '<32>{#p/mettaton}* 你恬不知耻，滥杀无辜。',
                            '<32>{#p/mettaton}* 虽然你后来\n  “确实”老实多了...'
                        ]);
                    } else if (royals < 4) {
                        addB([
                            "<32>{#p/mettaton}* 那我就直奔主题吧。",
                            '<32>{#p/mettaton}* 你“大肆”屠杀那些皇家守卫，\n  不过... 对平民还算手软。',
                            
                            '<32>{#p/mettaton}* 而且，后来你也听了劝，\n  老实多了...'
                        ]);
                    } else if (hkills > 19) {
                        addB([
                            "<32>{#p/mettaton}* 那我就直奔主题吧。",
                            '<32>{#p/mettaton}* 你心狠手辣，滥杀无辜...\n* 反倒见了皇家守卫，\n  收敛起来了。',
                            
                            '<32>{#p/mettaton}* 而且，后来你也听了劝，\n  老实多了...'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/mettaton}* 一开始，我对你没啥好感。\n* 结果，你表现还不错。",
                            '<32>{#p/mettaton}* 不光饶了不少守卫，\n  也没滥杀无辜百姓。',
                            '<32>{#p/mettaton}* 更不用说，\n  你听了我的劝，\n  在空境非常老实。'
                        ]);
                    }
                    addB(["<32>{#p/mettaton}* 但别觉得我夸你两句，\n  之前的账就能一笔勾销。"]);
                    if (SAVE.data.b.ubershortcut) {
                        addB([
                            '<32>{#p/mettaton}* 在你走后，ASGORE失踪了。\n* 王位空虚，ALPHYS便接下重担，\n  继承王位。',
                            '<32>{#p/mettaton}* 一开始，我还挺意外...',
                            '<32>{#p/mettaton}* 但转念一想，\n  她一路把送你到了首塔...\n  把胆量和自信都锻炼出来了。',
                            "<32>{#p/mettaton}* 虽然当上了女王，\n  但ALPHYS过得并不好。",
                            "<32>{#p/mettaton}* 因为偷着把你送走，\n  UNDYNE都气疯了。",
                            '<32>{#p/mettaton}* 这位大队长\n  先是不停质问ALPHYS，\n  骂她背信弃义。',
'<32>{#p/mettaton}* 接着，又疏远了她。',
                            '<32>{#p/mettaton}* 虽然ALPHYS还相信你，\n  觉得你有救...\n  但其他民众可不这么想。',
                            '<32>{#p/mettaton}* 出了这些事，\n  他们只想把人类统统杀光。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/mettaton}* 过了一阵，TORIEL回归了。\n* 可她根本劝不动\n  这些怪物。",
                                '<32>{#p/mettaton}* 最终，ALPHYS也心灰意冷，\n  放弃了王位。'
                            ]);
                        }
                    } else if (!dundyne) {
                        addB([
                            '<32>{#p/mettaton}* 在你走后，ASGORE失踪了。\n* 王位空虚，UNDYNE就趁机\n  当上女王，一手遮天。',
                            '<32>{#p/mettaton}* ALPHYS呢？\n* 本来最适合继承王位的人\n  就是她... 可她却逃跑了。',
                            "<32>{#p/mettaton}* 说实话，我不怪她。",
                            '<32>{#p/mettaton}* 许多怪物只想把人类\n  统统杀光。',
'<32>{#p/mettaton}* 说实话，出了这些事，\n  换谁谁这么想。'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/mettaton}* 过了一阵，TORIEL回归了。\n* 可她根本劝不动\n  这些怪物。",
                                "<32>{#p/mettaton}* 更别说劝UNDYNE了。"
                            ]);
                        }
                    } else if (!dtoriel) {
                        addB([
                            '<32>{#p/mettaton}* 在你走后，ASGORE失踪了。\n* 王位空虚，TORIEL便接下重担，\n  回归了王位。',
                            '<32>{#p/mettaton}* ALPHYS呢？\n* 本来最适合继承王位的人\n  就是她... 可她却逃跑了。',
                            "<32>{#p/mettaton}* 说实话，我不怪她。",
                            '<32>{#p/mettaton}* 许多怪物只想把人类\n  统统杀光。',
'<32>{#p/mettaton}* 说实话，出了这些事，\n  换谁谁这么想。',
                            "<32>{#p/mettaton}* 那些怪物都跟着了魔一样，\n  TORIEL怎么劝，都劝不动。"
                        ]);
                    } else {
                        addB([
                            '<32>{#p/mettaton}* 在你走后，ASGORE失踪了。\n* 这里的境况也越来越糟。',
                            '<32>{#p/mettaton}* ALPHYS呢？\n* 本来最适合继承王位的人\n  就是她... 可她却逃跑了。',
                            '<32>{#p/mettaton}* 觉得我会骂她，\n  说她胆小鬼？\n* 想多了。',
                            '<32>{#p/mettaton}* 不过她一走，\n  王位不能就这么空着，\n  只能我来当王了。',
                            '<32>{#p/mettaton}* 后来，我发现了“档案”。\n* 看到里面的人类时，\n  我心里五味杂陈...',
                            '<32>{#p/mettaton}* 但民众可不这么想。\n* 他们只看到了你，\n  他们只想让人类都死光。'
                        ]);
                    }
                    addB([
                        "<32>{#p/mettaton}* 我很喜欢人类，\n  也很愿意相信人类...",
                        "<32>{#p/mettaton}* 可是，总有像你这样的人，\n  不值得信任。",
                        "<32>{#p/mettaton}* 人类和怪物之间\n  本来犯不着有那些冲突...",
                        "<32>{#p/mettaton}* 生活在同一片天地，\n  彼此和平共处，不好吗？",
                        '<32>{#p/mettaton}* 可是...\n  现实哪有童话那么美好。',
                        "<32>{#p/mettaton}* 真是可悲啊，\n  就算“人类”再善良...",
                        '<32>{#p/mettaton}* 可里面总有几个败类，\n  一颗老鼠屎，坏了一锅粥。',
                        '<32>{#p/napstablook}* 呃...\n* mettaton？',
                        '<32>{#p/napstablook}* 你还好吗？',
                        '<32>{#p/mettaton}* ...\n* 你说呢？',
                        '<32>{#p/napstablook}* .........',
                        '<32>{#p/napstablook}* 你在给谁打电话？',
                        "<32>{#p/mettaton}* 和你没关系，BLOOKY。",
                        '<32>{#p/napstablook}* 我猜猜......',
                        '<32>{#p/napstablook}* ...\n* 知道了...',
                        '<32>{#p/napstablook}* 嘿...\n* 呃，你伤了我表亲的心',
                        '<32>{#p/napstablook}* 一次巧合，我发现mettaton\n  原来是我的表亲...',
'<32>{#p/napstablook}* alphys逃走了，\n  我就开始照顾他。'
                    ]);
                    if (SAVE.data.b.ubershortcut || !dundyne || !dtoriel) {
                        addB(['<32>{#p/napstablook}* 虽然最后你也回心转意了，\n  可是因为你......']);
                    } else {
                        addB(['<32>{#p/napstablook}* 其他人类根本没做错什么，\n  可是因为你......']);
                    }
                    addB([
                        "<32>{#p/napstablook}* mettaton这两天气得不行",
                        "<32>{#p/napstablook}* 我看他那样......\n  好担心",
                        "<32>{#p/mettaton}* 咋的？\n* 死了那么多人，我还得强忍着，\n  当没事人一样吗？",
                        '<32>{#p/mettaton}* 怪物死了，就剩一堆灰，\n  啥也没有了。',
                        '<32>{#p/mettaton}* 他们的亲人再怎么哭，\n  怎么喊，\n  能把死者复活吗？',
                        "<32>{#p/mettaton}* 我特么要是还能当没事人一样，\n  心得有多大？",
                        '<32>{#p/napstablook}* 呃...\n  人类，我告诉你...',
                        '<32>{#p/napstablook}* ......\n* 你不得好死。',
                        '<32>{#p/mettaton}* B... BLOOKY，\n  别这样...',
                        "<32>{#p/mettaton}* 别为了给我出气，\n  就逼自己。",
                        "<32>{#p/mettaton}* 我认识的BLOOKY\n  才不会用这种口气说话，\n  对吧？",
                        "<32>{#p/napstablook}* ......\n* ......我.......",
                        "<36>{#p/mettaton}* 你想让我开心点，我很高兴。\n* 可这事跟你没啥关系，\n  别惹自己不愉快。",
                        '<32>{#p/napstablook}* mettaton...',
                        '<32>{#p/napstablook}* 要是你也被人类杀了......',
                        "<32>{#p/napstablook}* 我...\n  不知道怎么办",
                        "<32>{#p/napstablook}* 嗯...... 说完了",
                        '<32>{#p/mettaton}* ...\n* ...我去。',
                        "<32>{#p/mettaton}* 我觉得，\n  还是现在挂电话吧。",
                        '<32>{#p/mettaton}* 本来还想跟你讲讲\n  我的家人...\n* 想想算了。',
                        '<32>{#p/mettaton}* 而且，用BLOOKY的话\n  总结你的“丰功伟绩”，\n  也蛮合适的。',
                        '<32>{#p/mettaton}* ...',
                        '<32>{#p/mettaton}* 可悲...',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                }
            } else if (SAVE.data.b.ultrashortcut) {
                k = 'light_ultra'; // NO-TRANSLATE

                m = music.sansdate;
                
                addA([
                    '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                    '<25>{#p/sans}{#f/0}* 你好呀。',
                    '<25>{#p/sans}{#f/4}* 喂，有人吗？',
                    "<25>{#p/sans}{#f/2}* 没人？\n* 那我就留个言吧。"
                ]);
                addB([
                    '<25>{#p/sans}{#f/0}* 让我想想...\n  唠点什么呢？',
                    '<25>{#p/sans}{#f/3}* ...\n* 在你走后，事情变得...\n  越来越有趣了。',
                    "<25>{#p/sans}{#f/0}* 一开始，因为asgore的失踪，\n  前哨站的百姓十分失落，\n  一蹶不振。"
                ]);
                if (dtoriel) {
                    addB(["<25>{#p/sans}{#f/3}* 噩耗一个接一个，\n  他们前脚刚得知asgore失踪，\n  后脚又听说前王后去世。"]);
                }
                addB([
                    '<25>{#p/sans}{#f/0}* 还好，在这种情况下，\n  大家推选了alphys继任。',
                    '<25>{#p/sans}{#f/2}* 经历这么多，\n  她也没那么胆小怯懦了。',
                    '<25>{#p/sans}{#f/0}* 当时，局势动荡不安。\n  但她仍担下了重任。'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/sans}{#f/3}* 因此...",
                        '<26>{#p/sans}{#f/0}* 尽管民众还没从之前\n  被揍的阴影里走出来...\n* 但风波仍渐渐平息了。'
                    ]);
                } else {
                    addB(['<25>{#p/sans}{#f/0}* 有人领导这里，\n  社会就不会停滞不前。']);
                }
                addB([
                    "<25>{#p/sans}{#f/0}* 自那时起，我就一直在帮她\n  出谋献策。",
                    "<25>{#p/sans}{#f/3}* 有件事她一直拿不定主意：\n  是把人类的存在告诉大家，\n  还是继续藏着掖着呢？"
                ]);
                if (royals < 6) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 最后，我们决定：\n  继续保守秘密。',
                        '<25>{#p/sans}{#f/0}* 那些人类能获得自由\n  固然是件好事。',
                        "<25>{#p/sans}{#f/3}* 可一想到那些死掉的狗狗...\n  现在放人就太鲁莽了。",
                        "<25>{#p/sans}{#f/3}* 毕竟，现在\n  大家都挺反感人类的。"
                    ]);
                } else if (SAVE.data.n.exp > 0) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 目前，我们想\n  暂时保守这个秘密。',
                        "<25>{#p/sans}{#f/0}* 我们挺想给那些孩子\n  自由的。",
                        '<25>{#p/sans}{#f/3}* ...不过，\n  得等怪物们准备好才行。',
                        '<25>{#p/sans}{#f/0}* 现在，喜欢人类的居民挺多的，\n  但反感的也不少。'
                    ]);
                } else {
                    addB([
                        '<25>{#p/sans}{#f/0}* 刚开始，我们想再等等。',
                        '<25>{#p/sans}{#f/0}* 不过，从民众的表现来看，\n  他们应该都准备好了。',
                        '<25>{#p/sans}{#f/3}* ...幸好，没引起什么骚动。',
                        '<25>{#p/sans}{#f/2}* 日子一天天过去，\n  怪物也越来越喜欢人类了。'
                    ]);
                }
                addB([
                    '<25>{#p/sans}{#f/0}* 总之，忙活了一通，\n  人类的事解决了。',
                    '<25>{#p/sans}{#f/0}* 我跟alphys\n  又开始着手策划\n  皇家卫队的改革方案。',
                    "<25>{#p/sans}{#f/3}* 因为...\n  我们俩都挺反感皇家卫队\n  之前那套作风的。"
                ]);
                if (dtoriel) {
                    addB(['<25>{#p/sans}{#f/0}* 所以，\n  我们做了一些小改动。']);
                } else {
                    addB([
                        "<25>{#p/sans}{#f/0}* 在你走后不久，\n  前王后也回归了。",
                        '<25>{#p/sans}{#f/0}* 她也很支持我们的改动。'
                    ]);
                }
                addB([
                    '<25>{#p/sans}{#f/2}* 猜猜看，我们首先改了啥。',
                    "<18>{#p/papyrus}{#f/9}捏嘿嘿！\n对，猜猜看！",
                    "<25>{#p/sans}{#f/0}* 哦，是papyrus呀。\n* 轮班工作感觉咋样？",
                    "<18>{#p/papyrus}{#f/0}好得很！"
                ]);
                if (royals < 6) {
                    addB([
                        '<18>{#p/papyrus}{#f/5}说实话，工作时\n如果有狗狗作伴\n就好了。',
                        '<18>{#p/papyrus}{#f/6}可惜... 狗狗们\n估计也都去度假了。',
                        "<25>{#p/sans}{#f/3}* 嘿，没事啦。",
                        "<25>{#p/sans}{#f/2}* 即使没有狗狗，\n  你干的也挺出色啊，\n  你说是不？"
                    ]);
                } else if (royals < 8) {
                    addB([
                        '<18>{#p/papyrus}{#f/5}说实话...\n那里气氛有点... 怪。',
                        "<18>{#p/papyrus}{#f/6}就好像死人了一样。",
                        "<25>{#p/sans}{#f/3}* 嘿，没事啦。",
                        "<25>{#p/sans}{#f/2}* 即使没有狗狗，\n  你干的也挺出色啊，\n  你说是不？"
                    ]);
                } else {
                    addB([
                        "<18>{#p/papyrus}{#f/5}身边突然多了个骷髅，\nUNDYNE总感觉不习惯。\n过了好久，还是这样...",
                        '<18>{#p/papyrus}{#f/0}但除此之外，一切都很好。',
                        '<25>{#p/sans}{#f/2}* 挺好的。'
                    ]);
                }
                addB([
                    "<18>{#p/papyrus}{#f/4}我一定会尽力而为。",
                    '<18>{#p/papyrus}{#f/9}毕竟，我可是\n真的抓了一个人类，\n才当上守卫的啊！',
                    "<18>{#p/papyrus}{#f/0}我可不会偷懒，\n更不会丢掉这份工作！",
                    '<25>{#p/sans}{#f/0}* 那可不。\n* 想保住饭碗，\n  就不能偷懒。',
                    "<18>{#p/papyrus}{#f/4}...我说你咋把\n饭碗丢了呢。",
                    '<18>{#p/papyrus}{#f/5}不过，\n你又得到了新工作，\n还干得挺好。',
                    "<18>{#p/papyrus}{#f/0}那我就不“锐评”了。",
                    '<25>{#p/sans}{#f/0}* 多谢。\n* 给新女王出谋献策\n  可辛苦了。',
                    '<25>{#p/sans}{#f/3}* 有时候，她有点“神经质”，\n  疑神疑鬼的。',
                    '<25>{#p/sans}{#f/3}* 而且，很多重要决策...\n  她都是一拍脑门想出来的。',
                    "<25>{#p/sans}{#f/0}* 这还没完，mettaton\n  也来蹚这趟浑水，\n  跟着瞎搅和。",
                    "<18>{#p/papyrus}{#f/6}METTATON？！\n【他】跟着干啥？",
                    '<25>{#p/sans}{#f/0}* 哦，在alphys当了王，\n  mettaton也想“沾点光”。',
                    "<25>{#p/sans}{#f/3}* 但是他...\n  就没提过啥正经建议。",
                    '<25>{#p/sans}{#f/0}* 他只想把前哨站\n  变成一个娱乐中心。',
                    '<25>{#p/sans}{#f/0}* 好让整个前哨站\n  都围着他那些节目转。',
                    "<25>{#p/sans}{#f/3}* 整的乱七八糟的，真糟心。",
                    '<18>{#p/papyrus}{#f/4}看来，得有人\n开导开导他了。',
                    "<25>{#p/sans}{#f/0}* 或许吧。\n* 哦对，你不就是\n  他的头号粉丝嘛？",
                    "<18>{#p/papyrus}{#f/7}要是他干扰你工作，\n我宁愿不当他粉丝！",
                    "<18>{#p/papyrus}{#f/9}...失陪了。",
                    '<25>{#p/sans}{#f/0}* ...',
                    "<25>{#p/sans}{#f/3}* 我也得走了，\n  免得他闯什么祸。",
                    '<25>{#p/sans}{#f/0}* 挂电话前...\n  还有两句话想讲给你。'
                ]);
                if (hkills > 9) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 虽然你杀害了不少怪物...',
                        '<25>{#p/sans}{#f/3}* 但最后，你能迷途知返，\n  做了正确的选择。'
                    ]);
                } else if (30 <= SAVE.data.n.bully) {
                    if (SAVE.data.n.exp > 0) {
                        addB([
                            '<25>{#p/sans}{#f/0}* 虽然你伤害了不少怪物，\n  很多怪物也因你而死...',
                            '<25>{#p/sans}{#f/3}* 但最后，你能迷途知返，\n  做了正确的选择。'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* 虽然你伤害了很多怪物...',
                            '<25>{#p/sans}{#f/3}* 但最后，你能迷途知返，\n  做了正确的选择。'
                        ]);
                    }
                } else if (SAVE.data.n.exp > 0) {
                    addB([
                        '<25>{#p/sans}{#f/0}* 虽然你也犯过小错...',
                        "<25>{#p/sans}{#f/3}* 但你仍是个不错的孩子。"
                    ]);
                } else {
                    addB([
                        '<25>{#p/sans}{#f/0}* 虽然仍有怪物不喜欢人类...',
                        '<25>{#p/sans}{#f/2}* 但大多数怪物，包括我，\n  都越来越喜欢和支持人类。\n* 这一切，都多亏了你。'
                    ]);
                }
                addB([
                    "<25>{#p/sans}{#f/0}* 所以，别担心。",
                    '<25>{#p/sans}{#f/3}* 不管你那边发生了什么...',
                    '<25>{#p/sans}{#f/2}* 记住，我永远支持你。',
                    '<25>{#p/sans}{#f/0}* ...\n* 照顾好自己，好吗？',
                    '<25>{#p/sans}{#f/3}* ...',
                    "<25>{#p/sans}{#f/3}* 回见。",
                    '<32>{#s/equip}{#p/event}* 滴...'
                ]);
            } else if (SAVE.data.n.exp > 0 || SAVE.data.n.state_foundry_undyne === 1) {
                if (!dundyne) {
                    k = 'light_undyne'; // NO-TRANSLATE

                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/alphys}{#f/4}* 喂-喂...',
                        '<25>{#p/alphys}{#f/20}* 有人吗？',
                        "<25>{#p/alphys}{#f/11}* ...这次打电话来，\n  只-只是想和你讲讲\n  最近发生的事...",
                        '<25>{#p/alphys}{#f/4}* 不-不会占用你\n  太多时间的。'
                    ]);
                    addB([
                        '<25>{#p/alphys}{#f/20}* 在你走后...\n  国王就突然... 失踪了。',
                        "<25>{#p/alphys}{#f/14}* 我把消息告诉了民众，\n  大家都非常难过。",
                        '<25>{#p/alphys}{#f/10}* 身为皇家科学员，\n  怪物们都认为\n  我是继承王位的最佳人选。',
                        "<25>{#p/alphys}{#f/4}* 但我知道，\n  自己并不适合当统治者。"
                    ]);
                    if (dmettaton) {
                        addB(['<25>{#p/alphys}{#f/4}* 而且，\n  我害得Mettaton...']);
                    }
                    addB([
                        '<26>{#p/alphys}{#f/20}* 后来，Undyne找到我，\n  跟我说“她自己想当女王”...',
                        '<25>{#p/alphys}{#f/20}* 我同意了，\n  让她顺利地当上了女王。'
                    ]);
                    if (dpapyrus) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Papyrus的死...\n  会冲动干傻事..."]);
                        if (royals < 2) {
                            addB(['<26>{#p/alphys}{#f/13}* ...更不用说，\n  因为你，皇家卫队也\n  全军覆没了...']);
                        } else if (royals < 7) {
                            addB(['<26>{#p/alphys}{#f/13}* ...更不用说，\n  因为你，皇家卫队也\n  死的死，伤的伤...']);
                        }
                    } else if (royals < 2) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心她受不了\n  皇家卫队全军覆没...\n  会冲动干傻事..."]);
                    } else if (royals < 7) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了皇家守卫的死...\n  会冲动干傻事..."]);
                    } else if (ddoggo) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Doggo的死...\n  会冲动干傻事..."]);
                    } else if (dlesserdog) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Canis Minor的死...\n  会冲动干傻事..."]);
                    } else if (ddogs) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了狗夫妇的死...\n  会冲动干傻事..."]);
                    } else if (dgreatdog) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Canis Major的死...\n  会冲动干傻事..."]);
                    } else if (ddoge) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Doge的死...\n  会冲动干傻事..."]);
                    } else if (droyalguards) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了三号、四号的死...\n  会冲动干傻事..."]);
                    } else if (dmadjick) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Cozmo的死...\n  会冲动干傻事..."]);
                    } else if (dknightknight) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Terrestria的死...\n  会冲动干傻事..."]);
                    } else if (dtoriel) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了王后Toriel的死...\n  会冲动干傻事..."]);
                    } else if (dmuffet) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了蜘蛛女王的死...\n  会冲动干傻事..."]);
                    } else if (dmettaton) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了Mettaton的死...\n  会冲动干傻事..."]);
                    } else if (hkills > 1) {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了几只怪物的死...\n  会冲动干傻事..."]);
                    } else {
                        addB(["<25>{#p/alphys}{#f/13}* ...一开始，我担心\n  她受不了一只怪物的死...\n  会冲动干傻事..."]);
                    }
                    if (royals < 2) {
                        addB(['<25>{#p/alphys}{#f/17}* 还好，她没瞎搞，\n  只是重建了皇家卫队，\n  增强了武装力量。']);
                    } else {
                        addB(["<25>{#p/alphys}{#f/17}* 还好，她没瞎搞，\n  只是扩编了皇家卫队，\n  加强了武装力量。"]);
                    }
                    if (SAVE.data.b.undyne_respecc) {
                        addB(['<25>{#p/alphys}{#f/19}* 处理完卫队的事，\n  她又发表演讲，说人类\n  “就是一群卑鄙下流的敌人”。']);
                    } else if (2.1 <= SAVE.data.n.plot_date) {
                        addB(['<25>{#p/alphys}{#f/19}* 处理完卫队的事，\n  她又发表演讲，说人类\n  “就是一群背信弃义的叛徒”。']);
                    } else {
                        addB(['<25>{#p/alphys}{#f/19}* 处理完卫队的事，\n  她又发表演讲，说人类\n  “就是一群罪不可赦的杀人狂”。']);
                    }
                    if (royals < 6 || mdeaths > 9) {
                        addB(['<25>{#p/alphys}{#f/20}* 结果...\n  她靠着那次演讲，\n  把民众都拉拢到她那边。']);
                        if (30 <= SAVE.data.n.bully) {
                            addB(["<25>{#p/alphys}{#f/26}* ...别以为你把他们揍老实了，\n  他们就心服口服。"]);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/5}* ...如今，怪物对人类\n  都愈发警惕。'
                            ]);
                        }
                    } else {
                        addB(['<25>{#p/alphys}{#f/20}* 一开始，大伙根本不信\n  她那一套理论...']);
                        if (30 <= SAVE.data.n.bully) {
                            addB(['<25>{#p/alphys}{#f/26}* ...紧接着，Undyne把你\n  揍他们的事拎了出来。',
'<25>{#p/alphys}{#f/26}* 结果...\n  民众立马变卦，纷纷支持她。']);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/20}* ...看他们不信，Undyne又说，\n  是你把ASGORE杀了。',
'<25>{#p/alphys}{#f/26}* 结果，\n  民众立马变卦，纷纷支持她。'
                            ]);
                        }
                    }
                    addB([
                        '<25>{#p/alphys}{#f/10}* 可前哨站还有其他的人类，\n  他们怎么办呢...？',
                        "<25>{#p/alphys}{#f/4}* 现在，民众都信她那一套，\n  要是让她发现这些人类...\n  就完蛋了。",
                        '<25>{#p/alphys}{#f/20}* 所以... 我把“档案”转移到\n  空境的一座高塔里，\n  偷偷藏了起来。',
                        
                        '<25>{#p/alphys}{#f/5}* ...Undyne找了半天，\n  别说人类，连个人类灵魂\n  都没找着。',
                        '<25>{#p/alphys}{#f/10}* 她以为，人类灵魂没保存好，\n  结果丢了。',
'<25>{#p/alphys}{#f/22}* 这还没完呢！',
'<25>{#p/alphys}{#f/22}* 那条鱼还想让怪物全知道\n  “灵魂都没啦！我们完蛋啦！”'
                    ]);
                    if (dtoriel) {
                        addB([
                            '<25>{#p/alphys}{#f/3}* 唉，我想找她，\n  求求她千万别把\n  人类灵魂的事说出来...',
                            '<25>{#p/alphys}{#f/3}* ...可我啥也做不了！\n  她根本就不听！',
                            "<25>{#p/alphys}{#f/30}* ...\n* 现在，所有怪物都认为\n  一切努力都白费了。"
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<25>{#p/alphys}{#f/31}* 民众彻底失去了希望...\n  都觉得... 自己永远都\n  逃不出这个牢笼了。",
                                '<25>{#p/alphys}{#f/31}* ...',
                                "<25>{#p/alphys}{#f/30}* 哀极生恨。\n* 他们惶惶不可终日，\n  气得不行，却又毫无办法。",
                                "<25>{#p/alphys}{#f/31}* 我根本不敢把人类的秘密\n  告诉他们，\n* 但也不知道能藏多久。",
                                '<25>{#p/sans}{#f/0}* 嘿，咋又在里头\n  自言自语了？',
                                "<25>{#p/sans}{#f/3}* 出来散散心吧。\n  那些人类还等着咱们去做\n  每日检查呢。",
                                '<25>{#p/alphys}{#f/20}* 呃...\n  你方便进来待一会吗？',
                                '<25>{#p/sans}{#f/0}* 行，那我就进去了。',
                                
                                "<25>{#p/alphys}{#f/20}* 你看...\n  我根本没自言自语...",
                                "<25>{#p/alphys}{#f/19}* 我现在正给那个人类\n  留言呢。",
                                '<25>{#p/sans}{#f/0}* 哦... 我说呢。',
                                '<25>{#p/sans}{#f/2}* 要不，你先去看一下\n  那些孩子，\n  我跟人类说几句，咋样？',
                                "<26>{#p/alphys}{#f/5}* 好，我-我现在就去。",
                                '<25>{#p/sans}{#f/3}* ...',
                                "<25>{#p/sans}{#f/0}* ...\n* alphys总喜欢打这样的电话，\n  搞得她自己心神不定。",
                                '<25>{#p/sans}{#f/0}* 我不会占用你太多时间的，\n  帮她挂断电话，我就走。',
                                
                                '<25>{#p/sans}{#f/0}* 挂电话之前...\n  有件事想提一嘴。',
                                "<25>{#p/sans}{#f/0}* 坏事真的一件接一件，\n  前脚，民众刚从undyne口中\n  知道人类灵魂都没了...",
                                "<26>{#p/sans}{#f/3}* 后脚，他们又听说\n  前王后也死了。",
                                '<25>{#p/sans}{#f/0}* 商店关门了，社会停摆了，\n  怪物们下岗的下岗、\n  辞职的辞职...',
                                "<25>{#p/sans}{#f/0}* 他们每天萎靡不振，\n  借酒浇愁，\n  过一天，算一天。",
                                "<25>{#p/sans}{#f/2}* ...这场大萧条的最大受益者，\n  是grillby。\n* 他的店现在人满为患。",
                                '<25>{#p/sans}{#f/3}* 可再多的零食，\n  再多的美味，\n  也没法把“他”带回来。',
                                '<26>{#p/sans}{#f/3}* ...你肯定知道我在说谁。',
                                '<26>{#p/sans}{#f/0}* ...',
                                "<25>{#p/sans}{#f/0}* 如今，怪物对人类都\n  恨之入骨。",
                                '<25>{#p/sans}{#f/0}* 如果下个人类到来，\n  我跟alphys会努力保护他...',
                                "<25>{#p/sans}{#f/3}* 即便如此，新人类\n  也很可能在半路上\n  就被怪物杀了。",
                                "<25>{#p/sans}{#f/0}* ...现实就是如此。",
                                '<25>{#p/alphys}{#f/27}* 呃，打扰一下...',
                                '<26>{#p/alphys}{#f/20}* 那些人类...\n  好-好像遇到麻烦了。',
                                '<25>{#p/sans}{#f/0}* 正好，\n  我也把想说的都说完了。',
                                "<25>{#p/sans}{#f/0}* 那我挂电话了。",
                                '<25>{#p/sans}{#f/3}* ...拜拜。',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        } else {
                            addB([
                                '<18>{#p/papyrus}{#f/0}只有咱们俩，\n还有SANS知道真相！',
                                '<25>{#p/alphys}{#f/27}* 哦，是Papyrus呀。\n* 看来，今天“档案”也一切正常？',
                                '<18>{#p/papyrus}{#f/0}那必须滴！',
                                '<18>{#p/papyrus}{#f/9}我刚给人类做完\n每日体检，一切正常！',
                                '<25>{#p/alphys}{#f/10}* 干得好，辛苦了。',
                                "<25>{#p/alphys}{#f/10}* 对了...\n  我正给那人类留言呢。",
                                "<25>{#p/alphys}{#f/5}* 主要是给那孩子讲讲\n  这段时间发生了啥。\n* 你想聊两句吗？",
                                '<18>{#p/papyrus}{#f/0}哦，当然想了！',
                                "<18>{#p/papyrus}{#f/0}...人类，你好呀。\n过的还好吧？\n我相信肯定挺好的。",
                                "<18>{#p/papyrus}{#f/5}知道人类的事情，\n却不能和任何人分享，\n真的挺煎熬的...",
                                "<18>{#p/papyrus}{#f/6}看着他们一个个\n都那么难受，\n我真的于心不忍！！！",
                                "<18>{#p/papyrus}{#f/5}那些怪物们一想到\n自己要永远困在这里...",
                                '<18>{#p/papyrus}{#f/5}看不到未来，\n看不到希望...',
                                "<18>{#p/papyrus}{#f/0}不过！！\n一切都会好起来的！！",
                                "<18>{#p/papyrus}{#f/5}总有一天，\n我会把真相告诉他们...",
                                '<18>{#p/papyrus}{#f/0}让他们知道，\n自由绝非遥不可及！',
                                "<25>{#p/alphys}{#f/8}* Papyrus，给人类讲讲\n  你的新工作吧。",
                                '<18>{#p/papyrus}{#f/0}啊对！！\n我咋把这事忘了呢！？',
                                '<18>{#p/papyrus}{#f/0}终于啊... UNDYNE同意\n让我当皇家守卫了。',
                                "<18>{#p/papyrus}{#f/4}虽然吧，我干的活\n本质上就是个啦啦队员...",
                                '<18>{#p/papyrus}{#f/0}但别以为“啦啦队队员”\n就不重要！',
                                "<18>{#p/papyrus}{#f/5}试想一下...",
                                "<18>{#p/papyrus}{#f/5}如果一个守卫士气低落...\n还怎么把活干好呢？",
                                "<18>{#p/papyrus}{#f/0}这时，就轮到我\n“见风使舵，见缝插针”了！",
                                '<18>{#p/papyrus}{#f/4}呃，只是一个比喻。',
                                "<18>{#p/papyrus}{#f/4}我没有船舵，\n也不敢真的拿针\n去戳他们。",
                                "<18>{#p/papyrus}{#f/7}...真服了！！\n垃圾场里面不就是\n一些破针线破木头嘛？",
                                "<18>{#p/papyrus}{#f/5}咋那么多人疯了似地\n跑过去“挖宝”？\n一去就是一整天！",
                                "<25>{#p/alphys}{#f/10}* 嘿嘿，多正常点事。",
                                '<25>{#p/alphys}{#f/3}* 他们喜欢垃圾，热爱垃圾。\n  所以就永远\n  与垃圾为伍了呗！',
                                '<18>{#p/papyrus}{#f/0}嗯...\n只能这么认为了。',
                                '<18>{#p/papyrus}{#f/5}...',
                                "<18>{#p/papyrus}{#f/5}可我还是放心不下\n这些家伙。",
                                '<25>{#p/alphys}{#f/31}* ...也是。',
                                "<25>{#p/sans}{#f/0}* 哦，两位好啊。\n* 抱歉回来晚了...",
                                '<25>{#p/sans}{#f/2}* 楼下的住户饿了，\n  想让我给他们做早餐。',
                                "<25>{#p/alphys}{#f/25}* 这些人要懒死啊。",
                                '<18>{#p/papyrus}{#f/7}呃... 住在塔尖\n事咋这么多呢！！',
                                '<18>{#p/papyrus}{#f/4}他们不会自己做饭吗？',
                                "<25>{#p/sans}{#f/0}* 他们也有苦衷。",
                                "<25>{#p/sans}{#f/0}* 毕竟...",
                                "<25>{#p/sans}{#f/0}* 大伙先是得知了人类的事，\n  然后又被前王后的死讯\n  打击了一通。",
                                "<25>{#p/sans}{#f/3}* 经历这些，换做是我\n  也肯定想吃点好吃的，\n  忘却烦恼。",
                                "<25>{#p/sans}{#f/2}* 而我的“专属厨师”，\n  就是你。",
                                '<18>{#p/papyrus}{#f/0}说得好！！\n无论是谁，\n都喜欢吃美食！',
                                '<18>{#p/papyrus}{#f/9}...特别是\n伟大的PAPYRUS\n亲手做的美食！',
                                '<26>{#p/sans}{#f/0}* 嘿嘿，是呀。',
                                '<26>{#p/sans}{#f/0}* 那我去给他们\n  准备早饭了。',
                                '<26>{#p/sans}{#f/3}* 一起去不，papyrus？',
                                "<18>{#p/papyrus}{#f/0}那必须滴！\n现在就去吧！",
                                '<26>{#p/sans}{#f/0}* 好。\n* ...那，出发！',
                                '<25>{#p/alphys}{#f/17}* 开心点。',
                                '<25>{#p/alphys}{#f/17}* ...',
                                '<25>{#p/alphys}{#f/5}* 该挂电话了。',
                                '<25>{#p/alphys}{#f/6}* 只是...',
                                "<25>{#p/alphys}{#f/14}* 如果能听到我的声音...\n* 希望你在那边\n  过得比我们幸福。",
                                '<25>{#p/alphys}{#f/20}* ...',
                                '<25>{#p/alphys}{#f/20}* 再见了。',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        }
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/5}* 好-好在，\n  王后及时回归，\n  硬是把她说服了...',
                            '<25>{#p/alphys}{#f/5}* 这才没让其他怪物\n  知道人类灵魂的事。',
                            '<25>{#p/alphys}{#f/10}* 一开始，她们起了点冲突...\n  但随着时间流逝，\n  风波渐渐平息。',
                            
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/alphys}{#f/4}* 只不过...',
                                '<25>{#p/alphys}{#f/17}* Asgore一死，\n  我就得自己把“档案”\n  偷偷藏起来了。',
                                "<25>{#p/alphys}{#f/20}* 跟以前相比，\n  其实差不多。",
                                "<25>{#p/alphys}{#f/14}* 但现在身边没人帮忙...\n  还是有些不舒服。",
                                '<25>{#p/sans}{#f/0}* 所以说，我不是人？',
                                "<25>{#p/alphys}{#f/2}* 不不不！\n* 我不是那个意思！",
                                "<25>{#p/sans}{#f/3}* 开个玩笑而已，我懂。\n* 管理“档案”这事，\n  我肯定没有asgore在行。",
                                "<25>{#p/sans}{#f/0}* 但我感觉，\n  自己干得还算不错。",
                                '<25>{#p/alphys}{#f/6}* 嗯... 那肯定的。',
                                '<26>{#p/alphys}{#f/5}* 只是，\n  跟Asgore共事那么久，\n  现在有点想他了。',
                                '<25>{#p/sans}{#f/3}* 对了...',
                                '<25>{#p/sans}{#f/0}* 那些人类还等着你去做\n  每日检查呢。',
                                "<25>{#p/sans}{#f/2}* 你先去，\n  我打完电话就过去。",
                                "<26>{#p/alphys}{#f/6}* 好。\n* 我先走了。",
                                '<25>{#p/sans}{#f/3}* ...'
                            ]);
                            if (hkills === 1) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 嘿，又见面了。',
                                    "<25>{#p/sans}{#f/0}* 在你离开后，\n  我天天都在想...",
                                    '<25>{#p/sans}{#f/3}* “为啥那人类把别的怪物\n  都饶恕了，唯独杀了‘他’？”\n* “到底为啥？”',
                                    "<25>{#p/sans}{#f/0}* 我说的“他”，\n  不是asgore。",
                                    '<25>{#p/sans}{#f/3}* ...',
                                    '<25>{#p/sans}{#f/3}* 原因嘛，你我都心知肚明。',
                                    "<25>{#p/sans}{#f/3}* 正当防卫？想自保？\n  害怕受伤？不小心？",
                                    "<25>{#p/sans}{#f/0}* 不用兜圈子，\n  我就直说了：",
                                    "<25>{#p/sans}{#f/0}* 你就是为了看看\n  会发生什么。",
                                    "<25>{#p/sans}{#f/0}* 你就是为了看看\n  我会咋评价。",
                                    '<25>{#p/sans}{#f/0}* 哇塞！真牛！\n* 你如愿以偿啦，小子！',
                                    "<25>{#p/sans}{#f/0}* 高兴不？",
                                    "<27>{#p/sans}{#f/3}* 呵。\n* 高兴死了。",
                                    "<27>{#p/sans}{#f/0}* ...再见。",
                                    '<27>{#p/darksans}{#f/1}{#i/5}* ...',
                                    '<32>{#s/equip}{#p/event}* 滴...'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/sans}{#f/0}* 嘿。\n* 过得还好吗？",
                                    "<25>{#p/sans}{#f/0}* 希望如此。\n* 我们过得也不错。",
                                    '<25>{#p/sans}{#f/3}* 怪物们心怀希望。\n* 日复一日，年复一年地\n  等待着。',
                                    '<25>{#p/sans}{#f/0}* 等待着又一个人类到来，\n  到那时，就能重获自由。'
                                ]);
                                if (hkills > 9) {
                                    addB([
                                        '<25>{#p/sans}{#f/0}* ...要是我的兄弟\n  也能有这样的福分就好了。',
                                        '<25>{#p/sans}{#f/3}* 要是那些因你而死的怪物\n  也能有这样的福分就好了。'
                                    ]);
                                } else {
                                    addB(['<25>{#p/sans}{#f/3}* ...要是我的兄弟\n  也能有这样的福分就好了。']);
                                }
                                addB([
                                    '<25>{#p/sans}{#f/3}* ...',
                                    '<25>{#p/sans}{#f/3}* 嗯...\n* 聊点什么好呢？',
                                    '<26>{#p/sans}{#f/0}* ...想到了。\n* 讲讲前王后，\n  还有乔迁新居的事吧。',
                                    
                                    '<25>{#p/sans}{#f/0}* 她离开外域后，\n  我们很快就认出了彼此，\n  没事总一起聊天。',
                                    '<25>{#p/sans}{#f/0}* 一来二去，\n  她就有了进一步打算。',
                                    '<25>{#p/sans}{#f/0}* 她搬到了星港小镇，\n  跟我住在了一起。',
                                    "<25>{#p/sans}{#f/0}* ...诚然，我俩在一起，\n  确实能找到不少乐子。",
                                    '<25>{#p/sans}{#f/3}* 我可以带她看书，\n  她也能教我做饭...',
                                    "<25>{#p/sans}{#f/0}* 可是，你知道吗...",
                                    '<25>{#p/sans}{#f/3}* 有趣的事再多，\n  可一想到papyrus，\n  怎么都快乐不起来。',
                                    '<25>{#p/sans}{#f/3}* 一想到papyrus的事，\n  她也很难受。',
                                    '<25>{#p/sans}{#f/0}* 她难受，并不只是因为\n  papyrus是我的兄弟。',
                                    '<25>{#p/sans}{#f/0}* 更因为，她很关心你。',
                                    "<25>{#p/sans}{#f/3}* 最终，她知道了你的所作所为。\n* 你能想象到，\n  那一刻她的感受吗？",
                                    '<25>{#p/sans}{#f/0}* 剧透预警：\n  她十分痛苦。',
                                    "<25>{#p/sans}{#f/3}* ...不只是我和她，\n  其他民众的态度\n  也好不到哪去。",
                                    '<25>{#p/sans}{#f/0}* 很多怪物本来很喜欢你的，\n  现在嘛...',
                                    '<25>{#p/sans}{#f/0}* 不过，其实还好。',
                                    '<25>{#p/sans}{#f/0}* 起码... ',
                                    '<25>{#p/sans}{#f/3}* 我跟alphys会尽力\n  护送下一个人类，\n  保证他的安全。',
                                    "<25>{#p/sans}{#f/0}* 也挺有意思的。",
                                    '<25>{#p/alphys}{#f/27}* 呃，打扰一下...',
                                    '<26>{#p/alphys}{#f/20}* 那些人类...\n  好-好像遇到麻烦了。',
                                    "<25>{#p/sans}{#f/3}* 哦，该挂电话了。",
                                    "<25>{#p/sans}{#f/0}* 我刚刚说的话，\n  往心里去，好吗？",
                                    '<25>{#p/sans}{#f/0}* ...',
                                    "<25>{#p/sans}{#f/0}* ...那，再见了。",
                                    '<32>{#s/equip}{#p/event}* 滴...'
                                ]);
                            }
                        } else {
                            addB([
                                "<18>{#p/papyrus}{#f/0}是啊！！\n我们过得挺好的！",
                                '<18>{#p/papyrus}{#f/5}唯一不喜欢的就是，\n要成天保守那些秘密。',
                                '<18>{#p/papyrus}{#f/5}挺反感这事的。',
                                '<25>{#p/alphys}{#f/11}* 可要是说出去，\n  Undyne...',
                                "<18>{#p/papyrus}{#f/4}然后UNDYNE很生气，\n肯定会把人类灵魂吸了。\n你是不是又要说这个？",
                                
                                "<18>{#p/papyrus}{#f/7}是是是，你说的对。\n可这话我都听八百遍了，\n能不能别磨叽了！！",
                                "<25>{#p/alphys}{#f/23}* 刚刚，因为这事，\n  他跟我吵了好一会呢。",
                                '<18>{#p/papyrus}{#f/5}（唉...）',
                                '<18>{#p/papyrus}{#f/5}咱们再努力努力，\n我就不信UNDYNE\n不听劝。',
                                "<25>{#p/alphys}{#f/3}* ...Papyrus，跟人类讲讲\n  你的新工作吧。",
                                '<18>{#p/papyrus}{#f/0}啊对！！\n我咋把这事忘了呢！？',
                                '<18>{#p/papyrus}{#f/0}终于啊... UNDYNE同意\n让我当皇家守卫了。',
                                "<18>{#p/papyrus}{#f/9}我刚当上了\n皇家卫队的训练专家！",
                                '<18>{#p/papyrus}{#f/0}Undyne的任务是\n训练其他队员。\n而我的任务呢...',
                                "<18>{#p/papyrus}{#f/0}则是给他们加油鼓劲，\n让他们士气满满！",
                                "<18>{#p/papyrus}{#f/9}我发现，自己天生\n就是干这块的料！",
                                '<18>{#p/papyrus}{#f/2}可不是我自己吹牛哦，\nUNDYNE也这么想。',
                                "<25>{#p/alphys}{#f/5}* 不错不错。\n* 哪天你工作的时候，\n  我也过去看看。",
                                "<18>{#p/papyrus}{#f/0}好啊，随时欢迎，\n不过有个条件。",
                                '<18>{#p/papyrus}{#f/4}我想把秘密告诉UNDYNE。\n你得同意。',
                                '<25>{#p/alphys}{#f/20}* ...',
                                '<18>{#p/papyrus}{#f/0}你和我，\n咱俩一起去说服UNDYNE\n你看咋样？',
                                "<25>{#p/sans}{#f/0}* ...哦？\n* 什么秘密？",
                                "<25>{#p/sans}{#f/3}* 哎呀，不好意思，\n  来晚了。",
                                '<25>{#p/sans}{#f/2}* 刚刚楼下有人饿，\n  我待会要给他们做晚餐。',
                                "<25>{#p/alphys}{#f/25}* 这些人要懒死啊。",
                                "<18>{#p/papyrus}{#f/4}把咱俩刚讨论的事\n给SANS讲讲。",
                                '<25>{#p/alphys}{#f/32}* ...',
                                '<25>{#p/alphys}{#f/3}* Papyrus觉得，\n  咱们应该把人类的事\n  告诉Undyne。',
                                "<25>{#p/sans}{#f/3}* 兄弟，假如咱真把秘密\n  告诉了她，你能保证\n  不会出事吗？",
                                '<18>{#p/papyrus}{#f/0}呃，我可是一名\n皇家守卫...',
                                '<18>{#p/papyrus}{#f/0}让我出马，肯定能\n“四两拨千斤”！',
                                "<25>{#p/sans}{#f/0}* 嗯...\n* 要是换作平常，\n  我肯定会拒绝。",
                                '<25>{#p/sans}{#f/0}* 不过，我转念一想，\n  undyne跟你的关系\n  确实不一般。',
                                "<25>{#p/sans}{#f/3}* 而且，我最近也在想，\n  要不要告诉Undyne真相？",
                                "<25>{#p/alphys}{#f/22}* 等等等等！\n  未经我同意，你俩\n  谁也不许擅作主张！",
                                "<25>{#p/sans}{#f/2}* 你放心，做梦都不敢。",
                                "<18>{#p/papyrus}{#f/0}是啊！！我们只是\n随便想一想而已。",
                                '<18>{#p/papyrus}{#f/5}就当我们\n在做“白日梦”就行。',
                                '<26>{#p/sans}{#f/0}* 嘿嘿，是呀。',
                                '<26>{#p/sans}{#f/0}* 哦对，得去准备晚饭了。',
                                '<26>{#p/sans}{#f/3}* 一起去不，papyrus？',
                                "<18>{#p/papyrus}{#f/0}那必须滴！\n现在就去吧！",
                                '<26>{#p/sans}{#f/0}* 好。\n* ...那，出发！',
                                '<25>{#p/alphys}{#f/17}* 开心点。',
                                '<25>{#p/alphys}{#f/17}* ...',
                                '<25>{#p/alphys}{#f/5}* 唉...',
                                '<25>{#p/alphys}{#f/5}* 我也不想藏着掖着，\n  要是不用瞒着秘密，\n  就太好了。',
                                "<25>{#p/alphys}{#f/6}* 所以... \n  要是真有一线希望，\n  也许...",
                                '<25>{#p/alphys}{#f/6}* ...',
                                "<25>{#p/alphys}{#f/8}* 等挂-挂了电话，\n  我再好好考虑一下。",
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
                            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                            '<25>{#p/toriel}{#f/1}* 喂？',
                            '<25>{#p/toriel}{#f/5}* 我是... Toriel。',
                            '<25>{#p/toriel}{#f/1}* ...虽然自打咱们不欢而散\n  就再也没见面...',
                            '<25>{#p/toriel}{#f/5}* 但我还是想给你讲讲\n  后来发生的事。'
                        ]);
                        addB([
                            '<25>{#p/toriel}{#f/9}* 在你走后，\n  我反思了自己的所作所为。',
                            '<25>{#p/toriel}{#f/13}* 我很愧疚...\n* 当时不该由着自己性子，\n  不让你走。',
                            '<25>{#p/toriel}{#f/13}* 更不该强行留住那些孩子，\n  不让“他们”走。',
                            '<25>{#p/toriel}{#f/9}* 不能再逃避下去，\n  把自己圈到这\n  一亩三分地了。',
                            '<26>{#p/toriel}{#f/13}* 所以，我鼓起勇气，\n  走出了外域。',
                            '<25>{#p/toriel}{#f/18}* 我来到首塔，\n  看到了一个个休眠舱。\n* 里面装的... 是人类小孩。',
                            '<25>{#p/toriel}{#f/13}* 之前困住你，\n  我就挺自责的。',
                            '<26>{#p/toriel}{#f/10}* 所以，看到他们被困在\n  那么小的地方...\n* 我想都没想，就给放了。',
                            '<25>{#p/toriel}{#f/9}* ...结果，这一时冲动\n  弄出了大乱子。',
                            '<25>{#p/toriel}{#f/13}* 在ASGORE的档案里，\n  那些孩子吃尽了苦头。',
'<25>{#p/toriel}{#f/13}* 虽然自由了，\n  但心灵都受了创伤。',
                            '<25>{#p/toriel}{#f/13}* 结果，\n  有个孩子到处乱跑，\n  被别的怪物发现了。',
                            '<25>{#p/toriel}{#f/9}* 如今，\n  大队长牺牲，\n  ASGORE驾崩...',
                            "<25>{#p/toriel}{#f/9}* 百姓本来就对人类\n  恨之入骨。",
                            "<25>{#p/toriel}{#f/9}* 他们要是发现这些孩子，\n  肯定会弄死他们。",
                            '<25>{#p/toriel}{#f/13}* 所以...\n  我只能把孩子们藏起来。',
                            '<25>{#p/toriel}{#f/9}* 虽然不想委屈他们，\n  但为了安全...\n  我也别无他法。',
                            '<25>{#p/alphys}{#f/15}* 呃，打个岔。\n* 有客人来访。',
                            '<25>{#p/toriel}{#f/10}* 让我猜猜。\n* 是Sans？',
                            '<25>{#p/alphys}{#f/3}* ...',
                            '<25>{#p/toriel}{#f/0}* 原来是他啊。\n* 直接告诉我就行，\n  不用这么“文绉绉”的。',
                            '<25>{#p/toriel}{#f/9}* Toriel呼叫系统，\n  请解锁前门。\n* 授权码：PIE-1-1-0。',
                            "<25>{#p/sans}{#f/0}* ...\n* 电话应该快打完了。",
                            '<25>{#p/sans}{#f/0}* 咦，还没跟人类唠完呐？',
                            '<25>{#p/alphys}{#f/23}* 跟谁？！',
                            '<25>{#p/toriel}{#f/0}* 就是那个人类。\n* Sans，那孩子估计也想听听\n  你的声音。',
                            '<25>{#p/toriel}{#f/1}* Alphys\n  是不是也想聊两句？',
                            '<25>{#p/alphys}{#f/21}* ...',
                            '<25>{#p/alphys}{#f/21}* 不。\n* Alphys才不想。',
                            '<25>{#p/alphys}{#f/21}* Alphys走了。\n* 再见。',
                            "<25>{#p/alphys}{#f/24}* ...\n* （我就在外面等着，\n  你们聊完，记得叫我。）",
                            '<25>{#p/sans}{#f/0}* ...',
                            '<25>{#p/toriel}{#f/5}* ...'
                        ]);
                        if (SAVE.data.n.state_foundry_undyne === 1) {
                            addB(["<25>{#p/sans}{#f/3}* undyne死了，\n  她到现在都没缓过来。"]);
                        } else {
                            addB(["<25>{#p/sans}{#f/3}* undyne被你杀了，\n  她都现在都没消气。"]);
                        }
                        if (dmettaton) {
                            addB(['<25>{#p/sans}{#f/0}* 更不用说，\n  你还杀了mettaton。']);
                        } else {
                            addB(["<25>{#p/sans}{#f/0}* 她恨自己无能，\n  才害得朋友丧命。"]);
                        }
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/sans}{#f/3}* 而我呢？',
                                '<25>{#p/sans}{#f/0}* 我太明白那种滋味了。',
                                '<25>{#p/sans}{#f/0}* 我太清楚alphys为啥\n  这么难受了。',
                                '<25>{#p/sans}{#f/0}* 毕竟...',
                                "<25>{#p/sans}{#f/3}* 失去至亲的人，\n  可不止有她。"
                            ]);
                        } else {
                            if (SAVE.data.n.state_foundry_undyne === 1) {
                                if (dmettaton) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* 你该出手时不出手，\n  不该动手时却先动手。\n* 我知道你有苦衷，只是..."
                                    ]);
                                } else {
                                    addB(["<25>{#p/sans}{#f/3}* 你为了自保，\n  丢下了她，我能理解。\n* 只是..."]);
                                }
                            } else {
                                addB(["<25>{#p/sans}{#f/3}* 你为了自保，\n  对他动了手，我能理解。\n* 只是..."]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 我总觉得，\n  即使是“两难境地”，\n  也会存在第三条路...",
                                '<25>{#p/sans}{#f/0}* 冷静下来，多想想，\n  也许就能避免伤亡。',
                                '<25>{#p/sans}{#f/3}* 谁知道呢。',
                                "<25>{#p/sans}{#f/0}* 算了，不能总沉溺过去。\n  还是讲讲眼前的事吧。"
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<25>{#p/sans}{#f/0}* ...',
                                "<25>{#p/sans}{#f/0}* 没了皇家守卫。\n  大家的日子很不好过。",
                                '<25>{#p/sans}{#f/3}* 以前，\n  我很看不惯他们的作风...',
                                "<25>{#p/sans}{#f/0}* 可到这种时候，\n  才知道有他们在，多好。",
                                '<25>{#p/toriel}{#f/13}* 真可悲...\n* 要是他们还活着就好了。',
                                '<25>{#p/toriel}{#f/13}* 这段时间，每天都有\n  愤怒的居民上街闹事，\n  四处打砸抢烧。',
                                '<25>{#p/toriel}{#f/9}* 事态越来越严重，\n  谁也管不了，也不敢管。',
                                '<25>{#p/toriel}{#f/9}* 对很多怪物来说，\n  人类没有“人”，只有“类”。',
'<25>{#p/toriel}{#f/9}* 他们才懒得区分\n  谁是“敌人”，谁是“朋友”。\n* 反正只要是人类，都得死。',
                                '<32>{#p/human}{#v/1}{@fill=#42fcff}* Toriel，我好怕...',
                                '<25>{#p/toriel}{#f/1}* ...哦，是你啊！',
                                '<25>{#p/toriel}{#f/0}* 别担心，孩子。\n* 只要有我在，\n  他们不敢伤害你。',
                                '<32>{#p/human}{#v/1}{@fill=#42fcff}* ...谢谢您...',
                                '<25>{#p/toriel}{#f/0}* 快回去，\n  跟其他孩子待在一起。',
                                '<25>{#p/toriel}{#f/0}* 等我打完电话，\n  就陪你玩，好吗？',
                                "<32>{#p/human}{#v/1}{@fill=#42fcff}* 好，那我走了...",
                                '<25>{#p/toriel}{#f/10}* ...小心点。',
                                '<25>{#p/toriel}{#f/9}* ...'
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/toriel}{#f/10}* 其实...\n  虽然那些市民到处闹事，\n  可我实在恨不起来...',
                                    '<25>{#p/toriel}{#f/9}* 一想到你干的那些事...',
                                    '<25>{#p/toriel}{#f/13}* 就连我，\n  都无法原谅你。'
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/13}* 真是... 腹背受敌啊。']);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 你知道吗...",
                                "<25>{#p/sans}{#f/0}* 有一天，\n  我想去grillby's吃顿饭...",
                                '<25>{#p/sans}{#f/3}* 结果到店一看，\n  里面被砸了个稀巴烂。',
                                '<25>{#p/sans}{#f/0}* 原来，grillby被指控是\n  “亲人类派”的走狗。',
'<25>{#p/sans}{#f/0}* 上周，一群怪物闯进他的店，\n  把店洗劫一空。',
                                '<25>{#p/toriel}{#f/13}* 你总去那里吃饭...\n  真是太可惜了。',
                                '<25>{#p/sans}{#f/3}* 可不是嘛。',
'<25>{#p/sans}{#f/0}* 现在，要是被扣上了\n  “亲人类派”的帽子，\n  就是死路一条。',
                                '<25>{#p/sans}{#f/0}* 即使没死，\n  买卖也肯定做不了了。',
                                '<25>{#p/toriel}{#f/12}* ...这已经不是第一次了。',
                                '<25>{#p/toriel}{#f/11}* 不少怪物都栽在这上头。',
                                '<25>{#p/sans}{#f/0}* 这还不是最心寒的。',
                                "<25>{#p/sans}{#f/3}* 最让我心寒的是，\n  现在的怪物怎么\n  都成了这副德行了？",
                                '<25>{#p/sans}{#f/0}* 当年，我们的祖先在故园\n  其乐融融地生活...',
                                '<25>{#p/sans}{#f/0}* 人怪大战时，\n  虽然并不太平，\n  可大家也是上下一条心。',
                                "<25>{#p/sans}{#f/3}* 可现在呢...\n  天天斗来斗去，没完没了。\n* 不知道图个啥。"
                            ]);
                            if (dpapyrus) {
                                addB(["<25>{#p/sans}{#f/0}* 唉...\n  真希望我兄弟能在身边，\n  鼓励鼓励我。"]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 想想都心烦。']);
                            }
                            addB([
                                '<25>{#p/alphys}{#f/3}* 那个... 两位？',
                                '<25>{#p/alphys}{#f/3}* 快过来看看。',
                                '<25>{#p/toriel}{#f/3}* 地板都在震！你们听到了吗？',
                                '<25>{#p/alphys}{#f/23}* 快看！外面...',
                                '<25>{#p/sans}{#f/0}* toriel，你没锁门？',
                                '<25>{#p/toriel}{#f/2}* ...',
                                '<25>{#p/alphys}{#f/22}* 快跑，快！！',
                                '<25>{|}{#p/toriel}{#f/2}* 不... 不行！\n* 孩子们- {%}',
                                '<32>{#s/equip}{#p/event}* 滴...'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/sans}{#f/0}* ...',
                                '<25>{#p/sans}{#f/0}* 还好，守卫还在，\n  能保护我们。',
                                "<25>{#p/sans}{#f/3}* 只是，现在还活着的守卫\n  已经没多少了。",
                                '<25>{#p/toriel}{#f/14}* 真的非常感谢\n  他们的帮助。',
                                '<25>{#p/toriel}{#f/13}* 没了他们，我都不知道\n  咱们还能不能撑下去。',
                                '<32>{#p/human}{#v/2}{@fill=#ff993d}* 太对了！\n* 皇家守卫真是酷毙了！',
                                '<25>{#p/toriel}{#f/2}* ...哎？！\n  你咋过来了？',
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* 等我长大了，\n  肯定也要加入卫队，\n  保护你们！",
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* 嘿嘿嘿，你就瞧好吧！",
                                '<25>{#p/toriel}{#f/0}* 嘻嘻嘻。\n* 很有可能哦。',
                                '<25>{#p/toriel}{#f/1}* 不过...',
                                '<25>{#p/toriel}{#f/0}* 小守卫，现在你的任务是：\n  回到队伍，保护其他孩子。',
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* 遵命！\n* 我现在就去！",
                                '<25>{#p/toriel}{#f/0}* 注意安全啊！',
                                "<25>{#p/sans}{#f/0}* 嘿嘿。\n* 对孩子扪温柔一点哦。",
                                "<25>{#p/sans}{#f/3}* 他们还没完全从...\n  “档案”的噩梦中缓过来。",
                                '<26>{#p/toriel}{#f/5}* 你说的对，不过我觉得...',
                                '<25>{#p/toriel}{#f/0}* 那事毕竟过去了，\n  让他们好好玩玩，\n  干点别的事，不是更好吗？',
                                '<25>{#p/toriel}{#f/1}* 再怎么说，\n  他们也只是孩子啊...',
                                '<25>{#p/sans}{#f/2}* ...嗯，教育孩子这方面\n  你懂得比我多。',
                                '<25>{#p/toriel}{#f/9}* ...',
                                '<25>{#p/toriel}{#f/9}* 前哨站现在的形势\n  不容乐观。',
                                '<26>{#p/toriel}{#f/13}* 虽然皇家卫队能稳住民众，\n  维持相对和平...',
                                '<25>{#p/toriel}{#f/18}* 但很多人都看不惯我们\n  保护人类...'
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/toriel}{#f/10}* 不过...\n  虽然那些市民到处闹事，\n  可我实在恨不起来...',
                                    '<25>{#p/toriel}{#f/9}* 一想到你干的那些事...',
                                    '<25>{#p/toriel}{#f/13}* 就连我，\n  都无法原谅你。'
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/13}* 真是... 腹背受敌啊。']);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* 你知道吗...",
                                "<25>{#p/sans}{#f/0}* 有一天，\n  我想去grillby's吃顿饭...",
                                '<25>{#p/sans}{#f/3}* 结果到店一看，\n  里面被抗议者堵得\n  水泄不通。',
                                '<25>{#p/sans}{#f/0}* 原来，grillby被指控是\n  “亲人类派”的走狗。',
'<25>{#p/sans}{#f/0}* 上周，一群怪物闯进他的店，\n  把店洗劫一空。',
                                '<25>{#p/toriel}{#f/13}* 真是太可惜了，Sans。\n* 没有守卫管管他们吗？',
                                "<25>{#p/sans}{#f/3}* 有守卫。\n* 不过当时那情况，\n  守卫也不好去管。",
                                '<25>{#p/sans}{#f/0}* 毕竟，人家虽然态度不好，\n  但好歹吃了饭，给了钱，\n  总不能赶人家走吧？',
                                '<25>{#p/toriel}{#f/1}* ...感觉他们的“抗议”\n  威胁力还不算大。',
                                '<25>{#p/toriel}{#f/6}* 但我还是希望他们收手吧，\n  别往下闹了。',
                                "<25>{#p/sans}{#f/0}* 是啊。感觉他们这么莽\n  就跟闹着玩一样。\n* 不过我还是有点难受...",
                                "<25>{#p/sans}{#f/3}* 最让我心寒的是，\n  现在的怪物怎么\n  都成了这副德行了？",
                                '<25>{#p/sans}{#f/0}* 当年，我们的祖先在故园\n  其乐融融地生活...',
                                '<25>{#p/sans}{#f/0}* 人怪大战时，\n  虽然并不太平，\n  可大家也是上下一条心。',
                                "<25>{#p/sans}{#f/3}* 可现在呢...\n  天天斗来斗去，没完没了。\n* 不知道图个啥。"
                            ]);
                            if (dpapyrus) {
                                addB(["<25>{#p/sans}{#f/0}* 唉...\n  真希望我兄弟能在身边，\n  鼓励鼓励我。"]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 想想都心烦。']);
                            }
                            addB([
                                '<25>{#p/alphys}{#f/27}* 呃，Toriel？\n* 你好像忘关防盗门了。',
                                "<25>{#p/alphys}{#f/20}* 别慌，我帮你关上了。\n* 这都好几次了。",
                                '<25>{#p/toriel}{#f/1}* 哦... 谢谢你...',
                                "<26>{#p/alphys}{#f/23}* 下回能不能别这么粗心了？\n* 防盗门不是摆设。",
                                '<25>{#p/toriel}{#f/5}* ...',
                                '<25>{#p/toriel}{#f/9}* 那咱们就说到这吧。',
                                '<25>{#p/sans}{#f/0}* 嗯，同意。',
                                "<25>{#p/sans}{#f/3}* 抱歉，孩子...\n  我们要挂电话了。"
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* 那... 注意安全...',
                                    "<25>{#p/sans}{#f/3}* ...出事也无所谓。\n* 反正跟我没关系。"
                                ]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* 在太空飞行，\n  一定要注意安全，好吗？', '<25>{#p/sans}{#f/3}* ...']);
                            }
                            addB(['<32>{#s/equip}{#p/event}* 滴...']);
                        }
                    } else {
                        k = 'light_toriel'; // NO-TRANSLATE

                        
                        if (SAVE.data.n.state_wastelands_toriel === 0) {
                            addA([
                                '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                                '<25>{#p/toriel}{#f/1}* 喂？',
                                '<25>{#p/toriel}{#f/0}* ...\n* 我是Toriel。',
                                '<25>{#p/toriel}{#f/1}* 这通电话打得有点突然...',
                                '<25>{#p/toriel}{#f/5}* 但我还是想给你讲讲\n  后来发生的事。'
                            ]);
                            addB(['<25>{#p/toriel}{#f/9}* 虽然之前告诉你，\n  “如果遇到困难，随时联系我”。\n* 但我还是放不下心。']);
                        } else {
                            addA([
                                '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                                '<25>{#p/toriel}{#f/1}* 喂？',
                                '<25>{#p/toriel}{#f/0}* ...\n* 我是Toriel。',
                                '<25>{#p/toriel}{#f/1}* 现在才给你打电话\n  有点不太合适...',
                                '<25>{#p/toriel}{#f/5}* 但我还是想给你讲讲\n  后来发生的事。'
                            ]);
                            addB(['<25>{#p/toriel}{#f/9}* 自从分别后，\n  我就一直放不下心。']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/5}* 我心想，你是ASGORE要找的\n  “最后一个人类”。\n* 他肯定会夺去你的灵魂。',
                            '<25>{#p/toriel}{#f/1}* 所以，我再害怕，\n  也要走出外域。',
                            '<25>{#p/toriel}{#f/5}* “不能再待下去了。”\n  我离开了外域，直奔首塔。',
                            '<25>{#p/toriel}{#f/9}* 我使劲跑，使劲跑...\n  生怕去晚了，他伤害你。',
                            
                            '<25>{#p/toriel}{#f/9}* 可我到了一看...\n  才知道自己一直错怪他了。',
                            '<25>{#p/toriel}{#f/5}* 我以为他是个冷血杀手，\n  可他不是。',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* 那天，我遇到了Alphys，\n  和她聊了很久。',
                            '<25>{#p/toriel}{#f/1}* 我们从ASGORE说到人类...',
                            '<25>{#p/toriel}{#f/3}* 又从人类聊到\n  什么“喵喵航天行”...',
                            '<25>{#p/toriel}{#f/4}* 我到现在都没搞懂\n  那到底是个啥玩意。',
                            "<25>{#p/toriel}{#f/0}* 总之...\n  她并不想当女王。",
                            '<25>{#p/toriel}{#f/1}* Alphys觉得，\n  我来统治这里更合适。',
                            "<25>{#p/toriel}{#f/5}* 她又告诉我...\n* 皇家卫队的大队长\n  不久前死了..."
                        ]);
                        if (hkills === 0) {
                            addB(['<25>{#p/toriel}{#f/9}* 当时，你要是救她，\n  说不定真能救过来。']);
                        } else if (hkills === 1 && SAVE.data.n.state_foundry_undyne === 2) {
                            addB(['<25>{#p/toriel}{#f/9}* 而且，杀她的人正是你。']);
                        } else if (dmettaton) {
                            addB(['<25>{#p/toriel}{#f/9}* 电视大明星Mettaton\n  也死了。']);
                            if (royals < 2) {
                                addB([
                                    '<26>{#p/toriel}{#f/9}* ...而皇家卫队\n  也几乎全军覆没。',
                                    "<25>{#p/toriel}{#f/5}* 对她来说，Mettaton的死\n  带来的打击尤为强烈。"
                                ]);
                            } else if (royals < 7) {
                                addB([
                                    '<26>{#p/toriel}{#f/9}* ...皇家守卫们也死的死，\n  伤的伤。',
                                    "<25>{#p/toriel}{#f/5}* 对她来说，Mettaton的死\n  带来的打击尤为强烈。"
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/5}* 听到他死了，\n  我也... 十分难受。']);
                            }
                        } else if (dpapyrus) {
                            addB(["<25>{#p/toriel}{#f/9}* Sans的兄弟，Papyrus\n  也死了。"]);
                            if (royals < 2) {
                                addB(['<26>{#p/toriel}{#f/9}* ...而皇家卫队\n  也几乎全军覆没。']);
                            } else if (royals < 7) {
                                addB(['<26>{#p/toriel}{#f/9}* ...皇家守卫们也死的死，\n  伤的伤。']);
                            }
                        } else if (royals < 2) {
                            addB(['<26>{#p/toriel}{#f/9}* 皇家卫队也几乎全军覆没。']);
                        } else if (royals < 7) {
                            addB(['<25>{#p/toriel}{#f/9}* 皇家守卫们也死的死，\n  伤的伤。']);
                        } else if (ddoggo) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬卫队成员，Doggo\n  也死了。']);
                        } else if (dlesserdog) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬卫队成员，Canis Minor\n  也死了。']);
                        } else if (ddogs) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬卫队成员，\n  Dogamy和Dogaressa\n  也死了。']);
                        } else if (dgreatdog) {
                            addB(['<25>{#p/toriel}{#f/9}* 犬卫队成员，Canis Major\n  也死了。']);
                        } else if (ddoge) {
                            addB(['<25>{#p/toriel}{#f/9}* 特战队成员，Doge\n  也死了。']);
                        } else if (droyalguards) {
                            addB(['<25>{#p/toriel}{#f/9}* 新来的两名守卫，\n  三号和四号\n  也死了。']);
                        } else if (dmadjick) {
                            addB(['<25>{#p/toriel}{#f/9}* 特战队成员，Cozmo\n  也死了。']);
                        } else if (dknightknight) {
                            addB(['<25>{#p/toriel}{#f/9}* 特战队成员，Terrestria\n  也死了。']);
                        } else if (mdeaths > 9) {
                            addB(['<25>{#p/toriel}{#f/9}* 除了她，\n  许多怪物也丧了命。']);
                        } else if (mdeaths > 2) {
                            addB(['<25>{#p/toriel}{#f/9}* 除了她，\n  好几只怪物也丧了命。']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/9}* 除了她，\n  还有一只怪物也丧了命。']);
                        }
                        if (dmettaton) {
                            addB([
                                '<25>{#p/toriel}{#f/1}* 当时，我还以为\n  “那就是个机器人，\n   修好就完事了。”',
                                '<25>{#p/toriel}{#f/1}* 不只是我，\n  很多人也是这么想的。',
                                '<25>{#p/toriel}{#f/5}* 可我们都错了，\n  世上哪有那么多好事。'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* 出了这些事，我不怪你，\n  只能怪自己太胆小。',
                                '<25>{#p/toriel}{#f/1}* 要是我当时能鼓起勇气...\n  一直陪伴你...'
                            ]);
                            if (hkills === 0) {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* 那么在她遇难时，\n  就能鼓励你出手相助。'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* 那么就能帮你渡过难关，\n  减少不必要的伤亡。'
                                ]);
                            }
                        }
                        addB([
                            '<26>{#p/toriel}{#f/9}* 可现在，说这些也没用了。',
                            '<25>{#p/toriel}{#f/5}* 回归王后的位置之后，\n  要忙的事也越来越多。',
                            "<25>{#p/toriel}{#f/9}* 我得操心整个国家，\n  还要操心那些人类的安全，\n  不让他们受伤。",
                            '<25>{#p/toriel}{#f/10}* 所以，上任后，\n  我立马就加强了\n  对人类的保护。'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<26>{#p/toriel}{#f/5}* 皇家守卫已经所剩无几，\n  所以想保护好人类\n  非常困难。'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* 可惜，我没什么经验。\n  所以想保护好人类\n  非常困难。'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* 幸好... 有老朋友\n  Gerson出手相助。',
                            '<25>{#p/toriel}{#f/1}* 靠着他的人脉网，\n  我在首塔周围安置了一支\n  基本安防部队。',
                            '<25>{#p/toriel}{#f/0}* 虽然人数不多，\n  但有了他们，\n  那些人类就基本安全了。',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* 风波渐渐平息，\n  百姓的生活也稳定下来。'
                        ]);
                        if (royals < 2) {
                            addB(['<25>{#p/toriel}{#f/5}* 尽管国王驾崩，\n  皇家卫队也几乎全军覆没...']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/5}* 尽管国王驾崩，\n  皇家卫队大队长也死了...']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* 人们仍心怀希望，\n  等待着自由到来。',
                            '<25>{#p/toriel}{#f/5}* 等待着...\n  我把自由带给他们。',
                            '<25>{#p/toriel}{#f/9}* ...',
                            '<25>{#p/toriel}{#f/9}* 怪物们把一切希望\n  寄托在我的身上，\n  希望我成为他们的救世主...',
                            '<25>{#p/toriel}{#f/10}* 渐渐地，我理解了ASGORE，\n  理解了他当时背负的压力\n  有多重...',
                            '<25>{#p/toriel}{#f/9}* ...我感觉，\n  自己也不知不觉中\n  像变了一个人。',
                            '<25>{#p/toriel}{#f/5}* 就在刚刚...'
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Sans找到我，\n  想一起聊聊他的兄弟...',
                                '<25>{#p/toriel}{#f/9}* 我跟他说，\n  自己想一个人静静，\n  没心情聊。',
                                '<25>{#p/toriel}{#f/1}* 他耸耸肩，\n  跟没事人一样走开了...',
                                '<25>{#p/toriel}{#f/5}* 但我知道，\n  他肯定很失望。'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Papyrus找到我，\n  想一起聊聊Undyne...',
                                '<25>{#p/toriel}{#f/9}* 我跟他说，\n  自己想一个人静静，\n  没心情聊。',
                                '<25>{#p/toriel}{#f/1}* 他强装镇定，\n  竭力控制自己的情绪...',
                                '<25>{#p/toriel}{#f/5}* 但我知道，\n  他心里肯定非常难受。'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/9}* 看到他那样，我也很愧疚...',
                            '<25>{#p/toriel}{#f/5}* 但整个前哨站里里外外\n  那么多事等着我...\n  我真的心力交瘁，不想聊。',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/1}* 不过，压力再大，\n  我也不会放弃。',
                            '<25>{#p/toriel}{#f/1}* 只要能让怪物们自由...\n  不管自己变成什么样，\n  过得多痛苦...',
                            '<25>{#p/toriel}{#f/0}* 都无所谓了。',
                            '<25>{#p/toriel}{#f/1}* “不能让大家失望。”\n  这才是最重要的，对吧？',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/9}* 我觉得...\n  该挂电话了。',
                            '<25>{#p/toriel}{#f/9}* 想说的话，也都说了。',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/5}* 孩子，再见。',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else if (royals === 5 && !ddoggo && !dlesserdog && !ddogs && !dgreatdog && !ddoge) {
                    k = 'light_dog'; // NO-TRANSLATE

                    m = music.dogsong;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （想说的，太多啦！）\n* （好高兴，好开心！）',
                        '<32>{#s/bark}{#p/event}* 汪汪！',
                        "<32>{#p/basic}* （期待吗？）\n* （就让我告诉你吧！）"
                    ]);
                    addB([
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （你走了，国王也丢了！）',
                        '<32>{#p/basic}* （怪物们，非常困惑！）\n* （Alphys，废物一个！）',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （她不想当女王，\n  就给我们开了个会。）\n* （上下一心，达成共识了！）',
                        '<32>{#p/basic}* （Doge复职了。）\n* （但这次，不是小队长，\n  而是前哨站女王。）',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （狗狗们团结一致，意见统一。）\n* （好耶。）',
                        '<32>{#p/basic}* （好自豪！）\n* （无与伦比地自豪！）',
                        '<32>{#p/basic}* （正如我们所料，\n  某位狗狗前辈将渊博的\n  “狗生感悟”传授给了狗狗们。）',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （后来，狗狗们组建了\n  狗狗议会。）\n* （大事小事，都由议会决策。）',
                        '<32>{#p/basic}* （大家每天辛勤工作。）\n* （每天享受肚皮按摩！）\n* （每天品尝美味狗粮！）',
                        "<32>{#p/basic}* 等等，我好像看到\n  有东西在动...\n* 是谁？谁在那里？",
                        '<32>{#s/bark}{#p/event}* 汪汪！',
                        "<32>{#p/basic}* 哦，原来是你。",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 等等不对，\n  你跟谁说话呢？！',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* （Doggo想跟你聊两句。）\n* （祝聊得愉快！）',
                        '<32>{#p/basic}* 把那玩意给我！',
                        "<32>{#p/basic}* ...\n* 是你吗？"
                    ]);
                    if (
                        SAVE.data.n.state_starton_doggo === 0 &&
                        SAVE.data.n.state_starton_lesserdog === 0 &&
                        SAVE.data.n.state_starton_dogs === 0 &&
                        SAVE.data.n.state_starton_greatdog === 0
                    ) {
                        if (SAVE.data.n.state_foundry_doge === 2) {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 你觉得把我们挨个摸一遍\n  很好玩，是不是呀？",
                                "<32>{#p/basic}* 我倒不是埋怨你，只是...",
                                "<32>{#p/basic}* 呃啊！\n* 你可以温柔地抚摸我，\n  可我连看都看不见你！",
                                '<32>{#p/basic}* 太不公平了。'
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 你觉得把我们挨个摸一遍\n  很好玩，是不是呀？",
                                "<32>{#p/basic}* 唯独没摸Doge，\n  想摸她，可没那么容易。",
                                "<32>{#p/basic}* 呃啊！\n* 你可以温柔地抚摸我，\n  可我连看都看不见你！",
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
                            "<32>{#p/basic}* 肯定是你！\n* 你耍小聪明，以为扔根破扳手\n  就能蒙混过关。",
                            '<32>{#p/basic}* 那玩意确实把我们糊弄个遍，\n  这话不假。',
                            '<32>{#p/basic}* 可后来，我发现不对劲。\n* 等我明白过来，都快气炸了！',
                            '<32>{#p/basic}* 所以呢...',
                            '<32>{#p/basic}* ...你能回来吗？\n  我还没玩够，想再玩玩。',
                            "<32>{#p/basic}* 别，别，把我刚说的\n  当放屁就行！\n* 我又胡思乱想了。"
                        ]);
                    } else if (
                        SAVE.data.n.state_starton_doggo === 3 &&
                        SAVE.data.n.state_starton_lesserdog === 3 &&
                        SAVE.data.n.state_starton_dogs === 3
                    ) {
                        if (SAVE.data.n.state_starton_greatdog === 3) {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 把我们挨个揍了一顿！",
                                '<32>{#p/basic}* 揍完我们几个还没完，\n  你还伤了Canis Major的心...',
                                "<32>{#p/basic}* 你有病吧？！真服了！",
                                "<32>{#p/basic}* ...换作其他的狗，\n  肯定会这么想。"
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* 肯定是你！\n* 把我们挨个揍了一顿！",
                                '<32>{#p/basic}* 不过最起码\n  你没亏待Canis Major。',
                                "<32>{#p/basic}* 这么看，你也没那么坏？",
                                "<32>{#p/basic}* ...这些小事，其实我不咋在意。"
                            ]);
                        }
                    } else if (SAVE.data.n.state_starton_doggo === 0) {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 我看不见你，你还使劲摸我！",
                            '<32>{#p/basic}* 是不是觉得很好玩？',
                            '<32>{#p/basic}* 我是不是很可爱？',
                            "<32>{#p/basic}* 等等等等！\n* 我啥也没说，别乱想！"
                        ]);
                    } else if (SAVE.data.n.state_starton_doggo === 1) {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 拿根扳手跟我玩抛接，\n  是不是？",
                            "<32>{#p/basic}* 哇！\n* 我好想再玩一次！",
                            "<32>{#p/basic}* 唉... 我又在做梦了。"
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* 肯定是你！\n* 把我揍得0那么疼，\n  我可忘不了！",
                            '<32>{#p/basic}* 动不动就打人，\n  又自私，又粗鲁。',
                            "<32>{#p/basic}* 我挺烦这种行为的。",
                            '<32>{#p/basic}* ...'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* 不说这些了，聊点别的！\n* 你知道吗？\n  我们把那些人类都放了！',
                        "<32>{#p/basic}* 这些孩子都睡在一堆\n  叫做“档案”的怪箱子里。\n* 太深奥了，无法理解。",
                        '<32>{#p/basic}* 我只知道，我领到了一个人类！\n  我能照顾那孩子了！',
                        "<32>{#p/basic}* “释放人类”的主意\n  是Doge想出来的。\n* 每只狗狗都能领到一个孩子。",
                        "<32>{#p/basic}* 咋感觉像在领养宠物？？？",
                        "<32>{#p/basic}* 放心，我们不会亏待孩子们的。\n* 狗狗们都会尽力\n  保护他们！",
                        '<32>{#p/basic}* 我记得，之前我们都在\n  抓捕他们，现在却在保护他们。\n* 就挺神奇的。'
                    ]);
                    if (royals < 6 || mdeaths > 9) {
                        addB([
                            '<32>{#p/basic}* 现在，民众普遍非常反感人类。',
                            '<32>{#p/basic}* 如果我们不保护他们，\n  这些孩子会很危险的。'
                        ]);
                    } else {
                        addB(['<32>{#p/basic}* 真是三十年河东，\n  三十年河西啊！']);
                    }
                    addB([
                        '<32>{#p/basic}* 等等！！\n* 我的人类过来了！！',
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Doggo长官！\n* Doggo长官！\n* 快过来快过来，有好看的！',
                        '<32>{#p/basic}* 啥事啊这么急。',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* 是一场盛大的聚会！\n  再不出发，\n  就要错过开幕式了！",
                        '<32>{#p/basic}* 那我得好好“看看”了...',
                        '<32>{#p/basic}* ...',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        "<32>{#p/basic}* 听到了，听到了，别喊了！\n* 淦，这么快就到了？",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 我去...\n* 这是啥？！',
                        "<32>{#p/basic}* 以前远望城市的时候，\n  根本没有这玩意啊！！",
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* 这是你的专属狗狗神社！\n  刚刚建好！\n* 专门按你的风格设计的！",
                        "<32>{#p/basic}* 它在动... \n  它一直在动...",
                        '<32>{#p/basic}* 不愧是我的专属神社！',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            '<32>{#p/basic}* （狗狗神社，保佑和平！）\n* （受尽创伤，无需烦恼。）\n  （忘却痛苦，驱散忧愁！）',
                            '<32>{#p/basic}* （鸟兽虫鱼，众生万物，）\n  （国家安康，社会稳定！）'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* （狗狗神社，保佑和平！）\n* （你来我往，和谐相处！）',
                            '<32>{#p/basic}* （鸟兽虫鱼，众生万物，）\n  （多行善事，必有福报！）'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* 嗯，嗯，我懂。\n* 这神社真不错... 跟我真搭。',
                        '<32>{#p/basic}* ...谢谢你。',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                        "<32>{#p/basic}* （最后一座神社，也建好啦！）\n* （犬卫队所有狗狗，\n  都有专属神社啦！）",
                        '<32>{#p/basic}* 太棒了！！\n* 现在能把电话给我了吗？',
                        '<32>{#s/bark}{#p/event}* 汪汪！',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* 我让其他长官\n  也见识一下他们的神社！",
                        '<32>{#p/basic}* 嘿！\n* 走之前，还有件事...',
                        "<32>{#p/basic}* 要是你不告诉我，我还不知道\n  有这么棒的神社呢。\n* 给，这些狗粮是奖励你的。",
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Doggo长官，\n  你真的太...',
                        "<32>{#p/basic}* 去吧，把这事告诉朋友吧。\n* 但这些狗粮是专门奖励你的，\n  别给他们吃！",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 所以，大伙现在基本摸清\n  社会运行的规律了。',
                        '<32>{#p/basic}* 去神社认认真真工作，\n  回家后开开心心生活。',
                        "<32>{#p/basic}* 而且，如果干得特别特别出色，\n  还有奖励！",
                        "<32>{#p/basic}* 这套制度非常完美。\n* 大伙都在认真遵守规定。",
                        '<32>{#p/basic}* 只有休闲回廊\n  那俩讨人厌的杂货店姐妹\n  跟我们对着干。',
                        "<32>{#p/basic}* 她俩又懒又邋遢！",
                        '<32>{#p/basic}* 不过她俩卖的太空垃圾\n  挺有意思的。\n* 我们就特赦了。',
                        '<32>{#p/basic}* 等等不对。\n* 特赦的好像不止她俩。',
                        '<32>{#p/basic}* 咋回事？社会咋成这样了？',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！'
                    ]);
                    if (!dmuffet) {
                        addB([
                            '<32>{#p/basic}* （Doggo，新任务！）',
                            '<32>{#p/basic}* （蜘蛛女王又开始造反了！）\n* （去好好收拾她一顿！）',
                            "<32>{#p/basic}* 呃... 我可不喜欢惩罚别人。",
                            '<32>{#s/bark}{#p/event}* 汪汪！',
                            '<32>{#p/basic}* （要是所有狗狗\n  都像你这么心慈手软，\n  社会早就乱套了。）',
                            "<32>{#p/basic}* 知道。\n* 但这事让别的狗去干\n  不行吗？",
                            '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                            "<32>{#p/basic}* （“学会惩罚别人”是\n  每位犬卫队成员的必修课。）\n* （这次轮到你了，快去吧！）"
                        ]);
                    } else if (!dpapyrus) {
                        addB([
                            '<32>{#p/basic}* （Doggo，新任务！）',
                            '<32>{#p/basic}* （高个子骷髅任务完成出色，\n  符合奖励发放标准。）\n* （把奖励给他！）',
                            '<32>{#p/basic}* 呃...\n* 天天都超额完成任务，\n  天天都得给他发奖。',
                            '<32>{#s/bark}{#p/event}* 汪汪！',
                            '<32>{#p/basic}* （高个子骷髅，简直就是劳模！）',
                            "<32>{#p/basic}* 再这样下去，\n  他都能凭自己本事\n  直接进犬卫队了。",
                            '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                            '<32>{#p/basic}* （这事我们也在考虑。）\n* （现在快去干活！）'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* （Doggo，新任务！）',
                            '<32>{#p/basic}* （狗粮快没了。）\n* （你能帮忙加点狗粮吗？）',
                            '<32>{#p/basic}* 呃...\n* 为啥所有脏活累活都得我干？',
                            '<32>{#s/bark}{#p/event}* 汪汪！',
                            "<32>{#p/basic}* （因为只有Doggo\n  愿意干脏活累活呢。）",
                            '<32>{#p/basic}* 胡说。\n* Doge比我还愿意干呢，\n  找她去啊。',
                            '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！',
                            '<32>{#p/basic}* （人家是女王，\n  怎么能麻烦她去干呢。）'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* 行，我去干。',
                        "<32>{#p/basic}* 嗯，现在得挂电话了。",
                        '<32>{#p/basic}* 无论你在哪，\n  都希望你能过的开心。',
                        "<32>{#p/basic}* ...我把电话还给神烦狗吧。\n* 给了它，电话就挂不了了。",
                        '<32>{#p/basic}* 我，你是咋做到\n  连着说那么长时间\n  还一点不累的？',
                        '<32>{#s/bark}{#p/event}* 汪汪！\n{#s/bark}* 汪汪！\n{#s/bark}* 汪汪！',
                        '<32>{#p/basic}* 好，来了来了！\n* 别催我了！！',
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                } else if (!dmuffet) {
                    k = 'light_muffet'; // NO-TRANSLATE

                    m = music.spiderboss;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<32>{#p/basic}{#s/spiderLaugh}* 哦，你好呀，\n  小宝贝~',
                        '<32>{#p/basic}* 过的咋样呢？',
                        "<32>{#p/basic}* 哎呀，我瞎操心啥呢~\n* 你是死是活，\n  关我什么事~",
                        "<32>{#p/basic}* 真可惜，你走的太早，\n  错过了很多好戏呢~\n* 就让我讲给你听吧！"
                    ]);
                    addB([
                        '<32>{#p/basic}{#s/spiderLaugh}* 在你离开后...\n  大家想让Alphys当女王~',
                        
                        "<32>{#p/basic}* 可是呢...我们的Alphys\n  连上任的勇气都没有呢！"
                    ]);
                    if (dmettaton) {
                        addB(["<32>{#p/basic}* 也难怪~\n* 这个低能连自己的机器人宝宝\n  都救不了，还想当女王？"]);
                    } else {
                        addB([
                            "<32>{#p/basic}* 也难怪~\n* 没了Asgore撑腰，\n  她就是个低能呀~"
                        ]);
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* 真难办呀~\n* 这么大一个前哨站，\n  谁来管呢？",
                            '<32>{#p/basic}* 不用担心！\n* 她不想当，我来当~',
                            '<32>{#p/basic}* 啊呼呼~\n* 一开始，她还挺倔~',
                            '<32>{#p/basic}* 不过，稍稍“开导”一下，\n  她立马就老实了~\n* 然后，乖乖把王位让给我啦！'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* 为了选出接班人，\n  她跟那群皇家守卫\n  开了个会...',
                            '<32>{#p/basic}* 结果呢...',
'<32>{#p/basic}* 大队长一死，那群废物守卫\n  立马没了凝聚力~\n  一个个自以为是，谁也不服谁~',
                            '<32>{#p/basic}* 啊呼呼呼~\n* 既然他们选不出领导人，\n  那就我来当！',
                            '<32>{#p/basic}* 现在，整个前哨站，\n  都是我的地盘了~'
                        ]);
                    }
                    if (30 <= SAVE.data.n.bully) {
                        if (hkills > 9) {
                            addB([
                                '<33>{#p/basic}* 多亏了你又杀又砍~\n  他们现在又老实，又乖~'
                            ]);
                        } else {
                            addB(['<32>{#p/basic}* 多亏了你揍得他们\n  满地找牙~\n* 他们现在又老实，又乖~']);
                        }
                        addB([
                            '<32>{#p/basic}* 这群宝宝们都吓坏了~\n  都等着天降明君，\n  拯救他们呢！',
                            "<32>{#p/basic}* 没想到他们这么快\n  就服服帖帖的了~",
                            '<32>{#p/basic}* 真要好好谢谢你呢，\n  宝贝~',
                            '<25>{#p/alphys}{#f/21}* 够了。\n* 我们变成现在这样，\n  你也有责任吧？'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* 哦，宝贝...\n* 真想让你亲眼看看\n  这场好戏呢~",
                            '<32>{#p/basic}* 这群怪物特别听话~\n* 我让他们干啥，他们就干啥~',
                            '<32>{#p/basic}* 而且呢...\n* 有的怪物还乐在其中，\n  甚至对我感激涕零呢！',
                            '<32>{#p/basic}* 不过...\n  还有不少怪物不咋听话，\n  跟个巨婴似的，成天抱怨。',
                            '<25>{#p/alphys}{#f/21}* 真无语，你就不想想\n  他们为啥不乐意吗？'
                        ]);
                    }
                    addB([
                        "<32>{#p/basic}{#s/spiderLaugh}* 呦，这不是Alphys小亲亲嘛~\n* 今天让你清理水管，\n  怎么还不去呢？",
                        "<32>{#p/basic}* 过了这么久...\n  那里面肯定又脏又臭~",
                        "<32>{#p/basic}* 你不去，谁去呢？"
                    ]);
                    if (royals < 2) {
                        addB([
                            "<25>{#p/alphys}{#f/22}* 谁有本事，谁就干！\n  反正我不干！",
                            "<32>{#p/basic}{#s/spiderLaugh}* 呦，胆子不小嘛。\n  又懦弱，又烦人，\n  跟条蛆似的~",
                            "<32>{#p/basic}* 不过... 啊呼呼~\n* 知道我会怎么处置\n  一条“蛆”吗？",
                            '<25>{#p/alphys}{#f/2}* ...不-不要！\n* 求求您... 我...',
                            "<25>{#p/alphys}{#f/3}* 我-我干！\n* 我现在就去擦，\n  我肯定不偷懒，求求您...",
                            '<32>{#p/basic}{#s/spiderLaugh}* 呵呵呵。\n* 太晚了哦，Alphys小亲亲~',
                            '<32>{#p/basic}* 蜘蛛们，把她拖出去！',
                            '<32>{#p/basic}* 我们的Alphys想去\n  “极光区”再体验一把\n  高能射线的快感呢~',
                            "<25>{#p/alphys}{#f/22}* 不！求求您！！\n* 让我做牛做马都可以！！\n  别电我！！",
                            '<32>{#p/basic}{#s/spiderLaugh}* 一会见哦~'
                        ]);
                    } else {
                        addB([
                            "<26>{#p/alphys}{#f/24}* 那当然是“您”去了。",
                            "<32>{#p/basic}{#s/spiderLaugh}* 哦？\n  你可真会扯淡呢~",
                            "<32>{#p/basic}* 而且呢... 啊呼呼呼~\n* 敢跟我这么说话，\n  是不是活得不耐烦了~",
                            '<25>{#p/alphys}{#f/27}* 是吗？',
                            "<25>{#p/alphys}{#f/28}* 呵呵呵...\n* 威胁别人前，我劝你\n  操心操心自己那条小命吧。",
                            '<32>{#p/basic}{#s/spiderLaugh}* 不用狡辩啦，Alphys小亲亲~\n* 既然这么想被电，\n  那我肯定不会“亏待”你！',
                            '<32>{#p/basic}* 蜘蛛们，把她拖出去！',
                            '<32>{#p/basic}* 我们的Alphys想去\n  “极光区”再体验一把\n  高能射线的快感呢~',
                            '<25>{#p/alphys}{#f/29}* 享受你最后的时光吧。',
                            "<32>{#p/basic}{#s/spiderLaugh}* 您可真逗~"
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* 啊呼呼~\n* 真可悲啊，Alphys小亲亲\n  总不老实~',
                        "<32>{#p/basic}* 幸好我们有“极光区”，\n  能让她学会感恩！",
                        '<32>{#p/basic}* 而且，我还获得了\n  “档案”的力量~',
                        '<32>{#p/basic}* 有了“档案”，就能把这帮怪物\n  统统送进虚拟空间~\n* 而且，还能控制时间流速！',
                        '<32>{#p/basic}* 只要我一改...',
                        '<32>{#p/basic}* 就能让他们在里面度日如年！',
                        '<32>{#p/basic}* 以前，这帮怪物咋折磨我们的，\n  今天，我就还给他们！'
                    ]);
                    if (dmettaton) {
                        addB([
                            '<32>{#p/napstablook}* 抱歉打断您...',
                            "<32>{#p/napstablook}* 你让我办的事，\n  我都办好了......",
                            '<32>{#p/basic}{#s/spiderLaugh}* 啊呼呼~\n* 不愧是我们的鬼鬼~',
                            '<32>{#p/basic}* 名单上所有的“目标”\n  都查清楚了吗？',
                            '<32>{#p/napstablook}* 当然......\n* 他们的详细住址，个人信息\n  我都写了',
                            "<32>{#p/basic}{#s/spiderLaugh}* 干得好！\n* 真是个又懂事，又听话的\n  小间谍~",
                            '<32>{#p/napstablook}* .........',
                            '<32>{#p/napstablook}* 所以.........',
                            "<32>{#p/napstablook}* 可以告诉我...\n  你想对名单上那些人...\n  做什么呢...........",
                            "<32>{#p/basic}{#s/spiderLaugh}* 你可真蠢~\n* 我想怎么处理他们，\n  关你屁事~",
                            '<32>{#p/basic}* 你放心~\n* 我绝对不会“亏待”他们的~',
                            '<32>{#p/napstablook}* ...',
                            "<32>{#p/napstablook}* 我回去休息了，\n  今天好累",
                            '<32>{#p/basic}{#s/spiderLaugh}* 回去睡吧，\n  可爱的鬼鬼~',
                            '<32>{#p/basic}* 明天记得准时过来哦~'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<32>{#p/napstablook}* ...',
                                '<32>{#p/napstablook}* 嗯',
                                "<32>{#p/basic}{#s/spiderLaugh}* 你瞧！\n* 无论是谁，都逃不过我织的\n  间谍网呢！"
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* ...', "<32>{#p/napstablook}* alphys，\n  这是最后的机会！"]);
                        }
                    } else {
                        addB([
                            '<32>{#p/mettaton}* 吹够了没有？',
                            "<32>{#p/mettaton}* 我按你吩咐，赶了过来。",
                            "<32>{#p/basic}{#s/spiderLaugh}* 啊呼呼~\n* 对，我找的就是你！",
                            '<32>{#p/basic}* 所以，观众对你的新节目\n  评价如何？',
                            '<32>{#p/mettaton}* 收视率十分惨淡。\n* 根本没人愿意看。',
                            '<32>{#p/basic}{#s/spiderLaugh}* 真是“如听仙乐耳暂明”啊~\n* 简直太棒了~',
                            '<32>{#p/mettaton}* 你也知道...'
                        ]);
                        if (iFancyYourVilliany()) {
                            addB(['<32>{#p/mettaton}* 观众喜欢的节目，是\n  “恶龙登场，正义对抗邪恶”的\n  好戏。']);
                        } else {
                            addB(['<32>{#p/mettaton}* 观众喜欢的节目，是\n  “形式多样，有名人客串”的\n  好戏。']);
                        }
                        addB([
                            "<32>{#p/mettaton}* 而不是【你】灌输的\n  那些垃圾。",
                            "<32>{#p/basic}{#s/spiderLaugh}* 他们爱不爱看\n  根本不重要...",
                            "<32>{#p/basic}* 只要能把他们洗成痴呆，\n  洗成不会反抗的傻子，\n  就可以了~",
                            '<32>{#p/mettaton}* ...呃，\n  我能走了吗？'
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<32>{#p/mettaton}* 我真的累了。",
                                '<32>{#p/basic}{#s/spiderLaugh}* 想走就走吧，\n  铁皮娃娃~',
                                "<32>{#p/basic}* 别忘了你的职责就好~"
                            ]);
                        } else {
                            addB([
                                '<32>{#p/mettaton}* PAPYRUS还在外面等我呢。',
                                '<32>{#p/basic}{#s/spiderLaugh}* 是吗？',
                                "<33>{#p/mettaton}* 我俩正在准备新节目：\n  “蜘蛛厨艺展”。",
                                '<32>{#p/basic}{#s/spiderLaugh}* 哦，是蜘蛛厨艺展呀~',
                                '<32>{#p/basic}* 嗯...',
                                "<32>{#p/basic}* 行，只要能把观众恶心到\n  就行。"
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<32>{#p/mettaton}* ...',
                                '<32>{#p/mettaton}* 再见。',
                                '<32>{#p/basic}{#s/spiderLaugh}* 你瞧，就连文化领域\n  也被我控制得死死的~'
                            ]);
                        } else {
                            addB(['<32>{#p/mettaton}* ...', "<32>{#p/mettaton}* ALPHYS，\n  趁现在，上！"]);
                        }
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* 是不是非常羡慕啊？",
                            "<32>{#p/basic}* 啊呼呼~\n* 真好奇要是你没走\n  现在能有多大出息~",
                            '<32>{#p/basic}* 那些小孩\n  真是一个比一个出色！',
                            '<32>{#p/basic}* 虽然，他们刚离开“档案”时\n  受了点委屈...',
                            "<32>{#p/basic}* 但现在，他们都成了\n  我最忠诚的手下~",
                            '<32>{#p/basic}* 哦，宝贝...\n* 看到你孤单一人在太空飞，\n  我的心都要碎了~',
                            "<32>{#p/basic}* 要是寂寞了，就回来\n  让我好好招待招待你！",
                            "<32>{#p/basic}* 我先挂啦~",
                            '<32>{#p/basic}* 后会有期~',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* 啊呼呼呼呼~\n* 你说- 啊啊啊！',
                            '<25>{#p/alphys}{#f/28}* 哎呀，哎呀...\n* 这不是我们的\n  蜘蛛大小姐嘛。',
                            '<32>{#p/basic}{#s/spiderLaugh}* 不——！\n* 放开我！',
                            "<32>{#p/basic}* 你们这些死守卫...\n  都是一个货色！\n  一群白痴，废物，蠢货！",
                            "<32>{#p/basic}* 没了我，\n  看谁教你们如何感恩！\n  看谁把你们引回正路！",
                            "<25>{#p/alphys}{#f/29}* 省省劲，别挣扎了。\n* 他们早就推举【我】\n  做这里的王了。",
                            '<32>{#p/basic}{#s/spiderLaugh}* 不对... 怎么可能？',
                            '<32>{#p/basic}* 我不是把你关起来了吗？\n  我不是还叫蜘蛛24小时\n  盯着你吗？',
                            "<32>{#p/basic}* 而且...\n* 我那么折磨你，\n  你怎么还有力气反抗！",
                            "<32>{#p/basic}* 你怎么还有力气指挥守卫？",
                            "<25>{#p/alphys}{#f/17}* 自从你控制前哨站，\n  我们都受尽了严刑拷打。",
                            "<25>{#p/alphys}{#f/5}* 时间久了...\n  我们早就学聪明了。",
                            '<25>{#p/alphys}{#f/16}* 你越折磨我，我就越恨你，\n* 我越恨你，就越想弄死你！',
                            "<25>{#p/alphys}{#f/7}* 哈哈哈...\n* 真是梦寐以求一刻啊。\n  今天，就让你也尝尝...",
                            "<32>{#p/basic}{#s/spiderLaugh}* 不... 不要！\n* 不准这么对我！",
                            '<25>{#p/alphys}{#f/27}* 卫兵...？',
                            '<32>{#p/basic}{#s/spiderLaugh}* 不要！！！\n* 求求你，放了我吧！',
                            "<25>{#p/alphys}{#f/29}* 把她拖出去。\n* 让她也去“极光区”\n  好好体验体验。",
                            '<25>{#p/alphys}{#f/27}* ...',
                            "<25>{#p/alphys}{#f/27}* 哎... 这是啥？",
                            '<25>{#p/alphys}{#f/27}* 难不成...\n  刚才她拿这东西\n  给别人打电话呢？',
                            '<25>{#p/alphys}{#f/17}* 想不通。',
                            '<32>{#s/equip}{#p/event}* 滴...'
                        ]);
                    }
                } else if (!dpapyrus) {
                    k = 'light_papyrus'; // NO-TRANSLATE

                    m = music.papyrus;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<18>{#p/papyrus}{#f/4}这玩意坏了吧？\n咋一直不好使呢？',
                        '<18>{#p/papyrus}{#f/0}哦！\n自动切换到语音信箱了！',
                        '<18>{#p/papyrus}{#f/6}我说咋一直\n打不出去呢！',
                        '<18>{#p/papyrus}{#f/5}人类，你好啊！\n我有很多话...\n想告诉你。'
                    ]);
                    addB([
                        '<18>{#p/papyrus}{#f/4}首先告诉你...\n我当上国王啦！',
                        "<18>{#p/papyrus}{#f/6}等等！！\n先别挂！！\n听我说完！！",
                        "<18>{#p/papyrus}{#f/5}要是感觉离谱...\n那我讲讲咋回事吧！",
                        "<18>{#p/papyrus}{#f/0}我就从头讲起。",
                        
                        "<18>{#p/papyrus}{#f/5}在你走后，\n前哨站领导层\n就崩溃了。",
                        "<18>{#p/papyrus}{#f/6}大家都想让ALPHYS\n继承王位...",
                        "<18>{#p/papyrus}{#f/5}可她根本不想当女王。",
                        "<18>{#p/papyrus}{#f/5}大伙又到处找UNDYNE，\n可就是找不到...",
                        '<18>{#p/papyrus}{#f/4}ALPHYS只能召集\n皇家守卫一起开个会，\n另找合适的人选。'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<18>{#p/papyrus}{#f/4}可是，皇家守卫\n已经没几个活人了。',
                            '<18>{#p/papyrus}{#f/5}结果...\n会议最终也没开成。'
                        ]);
                    } else {
                        addB([
                            '<18>{#p/papyrus}{#f/4}结果，\n皇家守卫争来争去，\n谁也不服谁...',
                            "<18>{#p/papyrus}{#f/5}争到最后，\n也没选出个合适的\n领导人。"
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/6}最后...\nALPHYS也放弃了。',
                        '<18>{#p/papyrus}{#f/6}她抛下我们，自己逃了。\n前哨站陷入了\n无政府状态。',
                        '<18>{#p/papyrus}{#f/5}没过多久...',
                        '<18>{#p/papyrus}{#f/6}社会却突然...\n稳定下来！',
                        "<18>{#p/papyrus}{#f/0}我总觉得不对劲，\n这表面的平静之下\n肯定暗流涌动。",
                        '<18>{#p/papyrus}{#f/4}所以...',
                        '<18>{#p/papyrus}{#f/9}我决定亲自出马！',
                        '<18>{#p/papyrus}{#f/5}你可以猜猜看，\n我当上国王之后\n都干了些啥。',
                        '<18>{#p/papyrus}{#f/0}你放心！\n我可没瞎搞！',
                        "<18>{#p/papyrus}{#f/0}上任后，\n我制定了一些政策，\n帮助大家交朋友。",
                        '<18>{#p/papyrus}{#f/4}可不是\n只跟“我”交朋友哦...',
                        "<18>{#p/papyrus}{#f/0}而是大家一起\n相互交朋友！",
                        '<18>{#p/papyrus}{#f/9}渐渐地，\n人们有了斗志，\n守卫的士气也上涨了！',
                        '<19>{#p/papyrus}{#f/4}只要再多等等，\n等大家都和和气气，\n社会真正安稳起来后...',
                        "<18>{#p/papyrus}{#f/9}就能释放那些人类啦！",
                        '<18>{#p/papyrus}{#f/0}希望到那时\n不会出什么乱子吧。',
                        "<25>{#p/sans}{#f/0}* 嘿，干得不错。",
                        '<25>{#p/sans}{#f/3}* 之前民众积怨已久，\n  一直排解不了。\n* 现在好多了。',
                        "<18>{#p/papyrus}{#f/0}哦，是SANS呀！\n今儿个咋这么\n有精神呢？",
                        '<25>{#p/sans}{#f/0}* 哦，今天不用上班。',
                        "<25>{#p/sans}{#f/3}* 毕竟过节嘛。",
                        '<18>{#p/papyrus}{#f/4}过节？\n然后就放假了？',
                        '<18>{#p/papyrus}{#f/5}（唉...）',
                        
                        "<18>{#p/papyrus}{#f/4}自打你去GRILLBY'S\n那里干活，\n放的假就越来越多...",
                        "<25>{#p/sans}{#f/3}* 哎，别上火嘛。\n* 你是不是忘了...",
                        '<25>{#p/sans}{#f/2}* 今儿个，可是半年一度的\n  “破冰节”啊，\n* 你不是也总盼这一天嘛。',
                        '<18>{#p/papyrus}{#f/1}哦对！！！\n我咋把自己设立的\n节日给忘了呢！！！',
                        '<18>{#p/papyrus}{#f/0}平日里无论是死敌，\n还是对手...',
'<18>{#p/papyrus}{#f/0}在“破冰节”这一天\n都要当成朋友。',
                        '<18>{#p/papyrus}{#f/4}所以，SANS，\n今天你的“破冰行动”\n完成得咋样呢？',
                        '<25>{#p/sans}{#f/0}* 嗯...',
                        "<25>{#p/sans}{#f/3}* 我想去“破”，\n  可也没有“冰”啊。",
                        '<18>{#p/papyrus}{#f/5}啊这... 呃...',
                        '<18>{#p/papyrus}{#f/6}找不到关系差的，\n那就巩固一下\n关系还行的呗！',
                        '<25>{#p/sans}{#f/2}* 嗯... 我跟朋友的关系\n  已经非常好了，没必要。',
                        "<25>{#p/sans}{#f/3}* ...看来“破冰节”\n  与我无缘了。",
                        "<18>{#p/papyrus}{#f/0}哦，没关系的。",
                        '<18>{#p/papyrus}{#f/9}过两天，就到\n“交友日”了！',
                        '<25>{#p/sans}{#f/0}* 在那天，大伙是不是要...\n  努力交新朋友？',
                        '<18>{#p/papyrus}{#f/0}捏嘿嘿！\n太对了！',
                        '<25>{#p/sans}{#f/0}* 很期待呢。',
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{#p/sans}{#f/3}* 孩子，想必你也知道...",
                        "<25>{#p/sans}{#f/0}* 在你刚走后，\n  这里的情况不容乐观。",
                        '<25>{#p/sans}{#f/3}* 人们不停甩锅，\n  相互指责...',
                        '<25>{#p/sans}{#f/3}* 个个都觉得...\n  你干那些事时，没人去管，\n  所以才害自己遭这么多罪。',
                        '<25>{#p/sans}{#f/0}* 多亏了我的兄弟，\n  让一切渐渐好转。'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/3}* 嘿嘿。',
                            '<25>{#p/sans}{#f/0}* 皇家卫队虽然消亡了...\n  可他骨子里的那股劲儿\n  却从未消亡。',
                            "<18>{#p/papyrus}{#f/0}太对了！！\n前哨站一片向好！",
                            '<18>{#p/papyrus}{#f/9}一想到今天的繁荣\n是自己努力的结果，\n我都为自己骄傲！'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/2}* 嘿嘿，就连皇家卫队\n  都完全变了样。',
                            '<18>{#p/papyrus}{#f/0}太对了！！\n他们的职责，\n再也不是攻击人类啦！',
                            '<18>{#p/papyrus}{#f/9}而是帮大家化解仇恨，\n驱散人们的心魔！'
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/5}...',
                        '<18>{#p/papyrus}{#f/5}人类，\n不管你犯了什么错，\n请放心！',
                        '<18>{#p/papyrus}{#f/0}大家过得挺好的！',
                        '<18>{#p/papyrus}{#f/6}我也原谅你！！！'
                    ]);
                    if (
                        world.edgy ||
                        (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                    ) {
                        addB(['<18>{#p/papyrus}{#f/5}虽然一开始，\n咱俩有点小摩擦...']);
                    } else if (SAVE.data.n.plot_date < 1.1) {
                        if (SAVE.data.b.flirt_papyrus) {
                            addB(['<18>{#p/papyrus}{#f/5}虽然，咱俩没能约会...']);
                        } else {
                            addB(['<18>{#p/papyrus}{#f/5}虽然咱俩没能\n好好玩一次...']);
                        }
                    } else {
                        addB(["<18>{#p/papyrus}{#f/5}虽然咱俩最后\n没能去UNDYNE家\n玩一次..."]);
                    }
                    addB([
                        "<18>{#p/papyrus}{#f/0}我还是很高兴\n能遇到你，\n我的朋友。",
                        "<25>{#p/sans}{#f/2}* 哎呦，真甜蜜。\n* 磕到了磕到了。",
                        "<25>{#p/sans}{#f/3}* 太遗憾了，\n  没能听到那孩子的声音。",
                        "<18>{#p/papyrus}{#f/7}确实。\n但就算人类没法回应，\n那也值了！！",
                        '<18>{#p/papyrus}{#f/0}人类只要能听到\n我的留言，\n我就满足了。',
                        '<25>{#p/sans}{#f/0}* 嘿。\n* 在外多保重，孩子。',
                        "<25>{#p/sans}{#f/2}* 别忘了，这里有个家伙\n  一直惦记你呢。",
                        "<18>{#p/papyrus}{#f/0}...那个家伙，\n就是我！！！",
                        '<32>{#s/equip}{#p/event}* 滴...'
                    ]);
                } else {
                    k = 'light_sans'; // NO-TRANSLATE

                    m = sounds.wind;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                        '<25>{#p/sans}{#f/0}* 你好呀。',
                        "<25>{#p/sans}{#f/3}* 近况可好？"
                    ]);
                    addB([
                        '<25>{#p/sans}{#f/0}* 你走后，\n  国王就人间蒸发了。',
                        '<25>{#p/sans}{#f/3}* 怎么就蒸发了呢？\n  不知道。',
                        '<25>{#p/sans}{#f/2}* ...估计是累了，去度假了。',
                        '<25>{#p/sans}{#f/0}* 民众希望alphys继承王位。',
                        "<25>{#p/sans}{#f/3}* 可她根本不想。"
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/0}* 她想找一名皇家守卫\n  继承王位...',
                            '<25>{#p/sans}{#f/0}* 可守卫也人间蒸发了。',
                            '<25>{#p/sans}{#f/3}* 跑哪去了？\n  不知道。',
                            '<25>{#p/sans}{#f/2}* ...估计是烦了，想休息一下。'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* 她想找一名皇家守卫\n  继承王位...',
                            "<25>{#p/sans}{#f/0}* 可大队长缺席，\n  他们吵个不停，\n  谁也不服谁。",
                            '<25>{#p/sans}{#f/3}* 跑哪去了？\n  不知道。',
                            "<25>{#p/sans}{#f/2}* ...估计是厌了，\n  不想管烂摊子了。"
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* 找不到人，alphys就逃了。\n* 偌大的前哨站，没人管理。',
                        "<25>{#p/sans}{#f/3}* “那就让前王后回归呗。”",
                        '<25>{#p/sans}{#f/3}* “那就再找个有能力的人呗。”',
                        '<25>{#p/sans}{#f/0}* 但是谁也没有来。',
                        '<25>{#p/sans}{#f/3}* 为啥没来呢？\n  你知道吗？',
                        '<25>{#p/sans}{#f/2}* ...估计是他们看淡了，\n  想落得一身轻。',
                        "<25>{#p/sans}{#f/0}* 烂摊子总得有人管。",
                        '<25>{#p/sans}{#f/0}* 我接任了asgore。',
                        "<25>{#p/sans}{#f/3}* 要顾全大局...\n  要藏好人类...\n  要安抚民众...",
                        "<25>{#p/sans}{#f/3}* 谈何容易。",
                        '<25>{#p/sans}{#f/0}* 我让民众把一切看淡，\n  什么都别想，做个“懒人”。',
                        '<25>{#p/sans}{#f/2}* 怪物不再闹腾，\n  逐渐平静下来。'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB(['<25>{#p/sans}{#f/3}* ...他们平静得出奇，\n  看不出一点恐惧。']);
                    } else {
                        addB(['<26>{#p/sans}{#f/3}* ...他们平静得出奇，\n  看不出一点悲伤。']);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* 你看，多好啊。',
                        '<25>{#p/sans}{#f/0}* 社会欣欣向荣...\n  人类安全无忧...\n  怪物心怀希望...',
                        "<25>{#p/sans}{#f/3}* 但为什么呢？",
                        '<25>{#p/sans}{#f/0}* 为什么一切...\n  如此绝望呢？',
                        "<25>{#p/sans}{#f/3}* 我不知道，\n  谁都不知道。",
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{*}{#x0}{#p/darksans}{#f/1}{#i/5}* ...也许是因为...\n  某个肮脏的兄弟杀手。"
                    ]);
                }
            } else {
                k = 'light_generic'; // NO-TRANSLATE

                
                addA([
                    '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
                    '<25>{#p/alphys}{#f/8}* 喂...',
                    '<25>{#p/alphys}{#f/6}* 有人吗？',
                    "<25>{#p/alphys}{#f/10}* 这次打电话来，\n  只是想和你说说近况。",
                    '<25>{#p/alphys}{#f/5}* 不会耽误你太长时间的...'
                ]);
                addB([
                    '<25>{#p/alphys}{#f/20}* 在你走后...\n  国王就突然... 失踪了。',
                    "<25>{#p/alphys}{#f/14}* 我把消息告诉了民众，\n  大家都非常难过。",
                    '<25>{#p/alphys}{#f/10}* 身为皇家科学员，\n  怪物们都认为\n  我是继承王位的最佳人选。',
                    "<25>{#p/alphys}{#f/11}* 但我知道，\n  自己并不适合当统治者。",
                    '<25>{#p/alphys}{#f/5}* 所以，我跟皇家守卫们\n  开了个会。',
                    '<25>{#p/alphys}{#f/6}* 大家达成一致意见：\n  让Terrestria继任女王。',
                    '<25>{#p/alphys}{#f/15}* 她刚一上任，\n  就给皇家卫队来了波大裁员，\n  并放松了卫队纪律的管理。',
                    '<25>{#p/alphys}{#f/17}* 这一举动引发了不小争议。'
                ]);
                if (SAVE.data.b.undyne_respecc) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* 一开始，Undyne对政策\n  有很大意见。",
                        '<25>{#p/alphys}{#f/8}* 但后来，她也渐渐妥协了。',
                        '<25>{#p/alphys}{#f/27}* 她觉得，人也分三六九等，\n  有坏人，自然也有好人。',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* 那还用说！\n* 好人可是大大滴有啊！！",
                        '<25>{#p/alphys}{#f/10}* U-Undyne？！',
                        '<25>{#p/undyne}{#f/1}* 那个孩子向我证明了，\n  即使是人类，也能成为\n  可敬的对手。',
                        '<25>{#p/undyne}{#f/1}* 那孩子光明磊落，\n  懂得尊重对手。',
                        "<25>{#p/undyne}{#f/18}* ...而且我觉得，\n  管得松点也好。",
                        '<25>{#p/undyne}{#f/14}* 毕竟王后回归了，\n  而且非常支持新女王。',
                        
                        '<25>{#p/undyne}{#f/1}* 所以短期内\n  卫队是没希望扩编了。'
                    ]);
                } else if (2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* 一开始，Undyne对政策\n  有很大意见。",
                        '<25>{#p/alphys}{#f/8}* 但后来，她也渐渐妥协了。',
                        '<25>{#p/alphys}{#f/27}* 她觉得，人也分三六九等，\n  有坏人，自然也有好人。',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* 那还用说！\n* 好人可是大大滴有啊！！",
                        '<25>{#p/alphys}{#f/10}* U-Undyne？！',
                        '<25>{#p/undyne}{#f/14}* 那个孩子向我证明了，\n  即使是人类，也能心存善良。',
                        '<25>{#p/undyne}{#f/1}* 面对可怕的对手，\n  也能施以仁慈。',
                        "<25>{#p/undyne}{#f/18}* ...而且我觉得，\n  管得松点也好。",
                        '<25>{#p/undyne}{#f/14}* 毕竟王后回归了，\n  而且非常支持新女王。',
                        
                        '<25>{#p/undyne}{#f/1}* 所以短期内\n  卫队是没希望扩编了。'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/19}* Undyne... \n  非常反感新政策。",
                        '<25>{#p/alphys}{#f/19}* 国王出了事，\n  她一直都没饶你。',
                        "<25>{#p/alphys}{#f/20}* 我也理解她的心情...",
                        '<25>{#p/alphys}{#f/20}* ...',
                        "<25>{#p/undyne}{#f/16}* 是啊，这都是什么破政策。",
                        '<25>{#p/alphys}{#f/10}* U-Undyne？！',
                        "<25>{#p/undyne}{#f/17}* 就因为来了几个“好人”，\n  一个个都得意忘形，\n  放松警惕了？",
                        '<25>{#p/undyne}{#f/9}* ...真可惜，\n  现在站在我这边的怪物\n  越来越少了。',
                        "<25>{#p/undyne}{#f/16}* 王后回归，\n  还特别支持新女王...",
                        '<25>{#p/undyne}{#f/9}* 这下好了，\n  皇家守卫的荣光\n  再也回不来了。'
                    ]);
                }
                addB([
                    '<25>{#p/alphys}{#f/5}* ...\n* 跟你讲讲王后的事吧。',
                    '<26>{#p/alphys}{#f/5}* 她回归之后，\n  风波渐渐平息，\n  社会也稳定下来。',
                    '<25>{#p/alphys}{#f/21}* 不久后，她发现了那些人类。',
                    '<25>{#p/alphys}{#f/21}* 王后决定把人类释放出来，\n  并把秘密公之于众。'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/alphys}{#f/20}* 可是...\n* 人类的出现，\n  引起了不小的骚动。",
                        '<25>{#p/alphys}{#f/13}* 大家一想到之前有个人类\n  把怪物都打得半死...',
                        '<25>{#p/alphys}{#f/26}* 就怕得不行。',
                        '<25>{#p/alphys}{#f/20}* 好在，当时并没有怪物死亡。',
                        '<25>{#p/alphys}{#f/20}* 利用这点，女王Terrestria\n  成功稳住了民众的情绪。',
                        "<25>{#p/alphys}{#f/18}* 果然还是她厉害。\n* 要是换我当女王，\n  估计这会都要爆发内战了。",
                        '<25>{#p/alphys}{#f/8}* 不管咋说，\n  现在民众对人类的态度\n  可比以前好多了。'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/15}* 好在，行动非常顺利，\n  没有引起大的骚动。",
                        '<25>{#p/alphys}{#f/17}* 我想...\n  要是她对人类了解得少，\n  肯定不能这么顺利。',
                        '<25>{#p/alphys}{#f/8}* 而且，\n  现在民众对人类的态度\n  可比以前好多了。'
                    ]);
                }
                addB(["<25>{#p/alphys}{#f/8}* 平心而论，\n  挺不可思议的。", '<26>{#p/undyne}{#f/16}* 嘿，其实...\n  我总有一种不真实感。']);
                if (SAVE.data.b.undyne_respecc || 2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/undyne}{#f/10}* 感觉大家的变化\n  实在太强烈，太不真实。",
                        '<25>{#p/undyne}{#f/1}* 哦对了，你跟那孩子讲\n  建学校的事了吗？',
                        "<25>{#p/alphys}{#f/10}* 哎呀... 对啊！\n* 这事咋忘说了呢。"
                    ]);
                } else {
                    addB([
                        "<25>{#p/undyne}{#f/10}* 爱咋变咋变，别再接着\n  给皇家卫队裁员就行。",
                        '<25>{#p/undyne}{#f/1}* 好在...\n  他们建的新学校还挺棒。',
                        "<25>{#p/alphys}{#f/10}* 对啊！\n* 差点忘了，\n  你现在当上老师了！"
                    ]);
                }
                addB([
                    "<25>{#p/alphys}{#f/6}* 嘿嘿...\n* 新教育政策反响很好。",
                    '<25>{#p/alphys}{#f/1}* 有了福利补贴，\n  学费低得不得了，\n  入学率大大升高。',
                    "<25>{#p/alphys}{#f/8}* 很多怪物有机会走进校园，\n  学到各种新知识。",
                    '<18>{#p/papyrus}{#f/0}...各位好啊！\n我上完物理课啦！！',
                    '<18>{#p/papyrus}{#f/4}没想到\n时空曲率的推导\n这么复杂...',
                    '<25>{#p/alphys}{#f/10}* ...如你所见，\n  Papyrus也在上学，他正在修\n  《曲速引力场论》这门课。',
                    '<18>{#p/papyrus}{#f/6}咦？？\n你为什么用第三人称\n指代我呢？？',
                    '<25>{#p/alphys}{#f/17}* ...看来他还修了\n  《文章写作》。',
                    "<25>{#p/undyne}{#f/12}* 不就是写一堆字嘛，\n  那玩意还用学？？",
                    '<18>{#p/papyrus}{#f/4}...等等...',
                    '<18>{#p/papyrus}{#f/7}你在给谁打电话？！',
                    "<25>{#p/undyne}{#f/1}* 是那个人类。",
                    '<18>{#p/papyrus}{#f/0}哦！哦！\n快把电话给我！！\n我要聊！',
                    '<25>{#p/undyne}{#f/14}* 你先聊，我要去上课了。\n* 学生还等着我呢。',
                    '<25>{#p/undyne}{#f/17}* 这些学生，学个\n  “魔法自卫术”都特别费劲。',
                    '<18>{#p/papyrus}{#f/0}...人类，你好！！\n近来可好？',
                    '<18>{#p/papyrus}{#f/0}...',
                    "<18>{#p/papyrus}{#f/5}看来你没法回复。",
                    "<18>{#p/papyrus}{#f/6}没关系！我衷心希望\n你能过得幸福，\n过得快乐！！"
                ]);
                if (SAVE.data.n.plot_date < 1.1) {
                    addB(["<18>{#p/papyrus}{#f/0}咱们进行完那场\n精彩的对决之后，\n我就一直挺惦记你。"]);
                } else if (SAVE.data.b.flirt_papyrus) {
                    addB(["<18>{#p/papyrus}{#f/0}咱们约完会之后，\n我就一直挺惦记你。"]);
                } else {
                    addB(["<18>{#p/papyrus}{#f/0}咱俩一起玩耍之后，\n我就一直挺惦记你。"]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/5}我把你的故事\n告诉了全班同学...',
                    "<18>{#p/papyrus}{#f/5}...他们现在都盼着\n哪天你能回来呢。"
                ]);
                if (SAVE.data.b.f_state_kidd_betray) {
                    addB([
                        '<18>{#p/papyrus}{#f/4}...好吧，\n我同桌算个例外。',
                        
                        '<18>{#p/papyrus}{#f/5}...呃，他说你背信弃义，\n不是好人。\n到底发生啥了？',
                        '<18>{#p/papyrus}{#f/6}...不过别担心！！',
'<18>{#p/papyrus}{#f/6}万一你哪天回来了...\n我一定会让你俩\n重归于好！！',
                        
                    ]);
                } else {
                    addB([
                        '<18>{#p/papyrus}{#f/0}有个小伙伴\n还想跟你一起走呢！！',
                        "<18>{#p/papyrus}{#f/5}每次上课时，\n那个小伙伴就坐我旁边。",
                        '<18>{#p/papyrus}{#f/6}他说，你是他的\n救命恩人呢！！',
                        '<18>{#p/papyrus}{#f/4}看来，你成了英雄！',
                        "<18>{#p/papyrus}{#f/0}万一你哪天回来了...\n开个欢迎会，\n我肯定叫他去！"
                    ]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/9}这是帕(TM)的专属承诺！',
                    "<25>{#p/alphys}{#f/27}* ...等等，\n  那不是Mettaton的台词吗？",
                    '<18>{#p/papyrus}{#f/4}以前嘛... 说不定。\n但现在可不是。',
                    "<18>{#p/papyrus}{#f/5}据说，Mettaton要彻底抛弃\n他的“旧商标”了。",
                    '<18>{#p/papyrus}{#f/4}转而启用“MTT视界”新商标。',
                    '<25>{#p/alphys}{#f/17}* 哦对，这事我也听说了。'
                ]);
                if (iFancyYourVilliany()) {
                    addB([
                        '<25>{#p/alphys}{#f/21}* 据说，现在他拍节目\n  越来越喜欢“塑造反派”了。',
                        "<18>{#p/papyrus}{#f/4}...这么搞，恐怕会出事。",
                        '<25>{#p/alphys}{#f/22}* 你以为我不知道吗？！'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* 怪物们可不想\n  再“重温”一遍\n  人类那些破事。",
                            '<25>{#p/alphys}{#f/26}* ...我可没骂你。'
                        ]);
                    } else {
                        addB([
                            "<25>{#p/alphys}{#f/10}* 现在，怪物们对人类\n  根本没一点怨气了。",
                            "<25>{#p/alphys}{#f/3}* 所以，我就不明白，\n  他这么搞，到底图啥？"
                        ]);
                    }
                } else {
                    addB([
                        '<25>{#p/alphys}{#f/21}* 据说，现在他拍节目\n  越来越喜欢往里面加\n  “杀人机器”要素了。',
                        "<18>{#p/papyrus}{#f/4}这么搞，恐怕会出事。",
                        '<25>{#p/alphys}{#f/22}* 你以为我不知道吗？！'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* 怪物们可不想\n  再“重温”一遍人类的铁拳。",
                            '<25>{#p/alphys}{#f/26}* ...我可没骂你。'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/10}* 现在，怪物们都\n  越来越喜欢人类了。',
                            "<25>{#p/alphys}{#f/3}* 所以，我就不明白，\n  他这么搞，到底图啥？"
                        ]);
                    }
                }
                addB([
                    "<18>{#p/papyrus}{#f/5}是啊... 大伙现在都\n越来越有盼头了。",
                    '<18>{#p/papyrus}{#f/6}...就连我的兄弟，\n也越来越乐观了！！',
                    
                    '<18>{#p/papyrus}{#f/0}皇家卫队大裁员\n让他下了岗。\n他就找人开始做买卖。',
                    '<18>{#p/papyrus}{#f/4}他跟BRATTY和CATTY\n一起倒卖二手垃圾。',
                    "<18>{#p/papyrus}{#f/5}每天卖垃圾... \n我不咋认可。\n不过他高兴就行。",
                    "<25>{#p/sans}{#f/0}* 我天生就是卖垃圾的料，\n  能不高兴嘛？",
                    '<18>{#p/papyrus}{#f/7}SANS！！\n别冷不丁冒出来！！\n吓死人了！！',
                    '<25>{#p/sans}{#f/2}* 嘿嘿。\n* 孩子，近况如何呀？',
                    "<25>{#p/sans}{#f/0}* 希望我那些警告和提醒\n  帮到了你。",
                    '<18>{#p/papyrus}{#f/9}啊，我知道了！！\n原来你真是个特{@fill=#ff0}务{@fill=#fff}，\n啊不，叛{@fill=#ff0}贼{@fill=#fff}！',
                    '<25>{#p/sans}{#f/0}* 说对了。\n* 我确实化身{@fill=#ff0}乌贼{@fill=#fff}，\n  潜入皇家卫队。',
                    "<25>{#p/sans}{#f/3}* 不过，我的“潜伏”\n  也不是啥坏事。",
                    '<25>{#p/sans}{#f/2}* 毕竟，选terrestria继任女王\n  还是我的主意呢。',
                    '<18>{#p/papyrus}{#f/1}啥？！\n居然是你的主意？！',
                    '<18>{#p/papyrus}{#f/5}真是...',
                    "<25>{#p/sans}{#f/3}* 哎呀，都是陈年旧事了，\n  就别提啦。",
                    "<25>{#p/sans}{#f/0}* 不管咋说，\n  最终的结果挺好的。\n* 这才是让我最高兴的。",
                    "<25>{#p/alphys}{#f/17}* 没想到你没回实验室工作，\n  而是去做买卖了。",
                    "<25>{#p/alphys}{#f/5}* 之前离开卫队的时候，\n  你不是说想回实验室吗？",
                    '<25>{#p/sans}{#f/3}* 嗯，其实嘛...\n* 干了那么多正经工作，\n  我也想给自己放个假。',
                    '<25>{#p/sans}{#f/2}* 不过别担心。\n* papyrus在你身边，\n  不也干得挺好嘛。',
                    '<25>{#p/alphys}{#f/6}* 呃... 那倒是。',
                    '<18>{#p/papyrus}{#f/0}我尽力了！！',
                    "<25>{#p/alphys}{#f/20}* 不过...\n  有件事我一直搞不明白。",
                    '<25>{#p/sans}{#f/0}* 啥事？',
                    '<25>{#p/alphys}{#f/27}* 是这样的：\n  我用天文望远镜观测星象，\n  发现星星有时候很奇怪。',
                    
                    '<18>{#p/papyrus}{#f/6}奇怪？\n星星有啥奇怪的？！',
                    "<25>{#p/alphys}{#f/15}* 呃，不是说星星本身奇怪。",
                    '<26>{#p/alphys}{#f/23}* 而是说它的运动轨迹很怪。',
                    "<25>{#p/alphys}{#f/20}* 甚至都不能说星星在“运动”，\n  而是“跃迁”。",
                    '<25>{#p/alphys}{#f/20}* 就是从一个地方，\n  忽然跳到另一个地方。',
                    '<25>{#p/alphys}{#f/26}* 仿佛... \n  力场外面的时间\n  突然往后“跳”了几年。',
                    "<25>{#p/sans}{#f/0}* 你确定观测结果没问题吗？",
                    '<25>{#p/alphys}{#f/20}* 我又观测了一遍，成功复现。\n* 然后，又进行了二次观测，\n  三次观测...',
                    '<18>{#p/papyrus}{#f/6}然后，又进行了四次观测？',
                    '<25>{#p/alphys}{#f/21}* 当然。',
                    "<25>{#p/alphys}{#f/5}* 观测多少遍，\n  这种“跃迁”现象始终存在。",
                    '<25>{#p/sans}{#f/3}* 哦？\n* 挺奇怪的。',
                    "<25>{#p/sans}{#f/0}* 感觉得好好研究一下。",
                    '<25>{#p/alphys}{#f/20}* 同意。',
                    "<25>{#p/sans}{#f/3}* 哎呀。\n* 快到录音时长上限了。",
                    '<25>{#p/alphys}{#f/17}* ...哦。\n* 看来，现在得挂电话了。',
                    "<25>{#p/alphys}{#f/6}* 嗯... \n  希望你在那边过得幸福。",
                    '<25>{#p/alphys}{#f/5}* 我们只有这样一方天地，\n  都能找到幸福...',
                    "<25>{#p/alphys}{#f/10}* 那么，拥有整个宇宙的你，\n  也一定能找到幸福！",
                    '<18>{#p/papyrus}{#f/0}ALPHYS，说得好！',
                    '<25>{#p/sans}{#f/2}* 嘿。\n* 孩子，多保重，好吗？',
                    '<18>{#p/papyrus}{#f/9}保重！！\n有缘再见！！',
                    '<25>{#p/alphys}{#f/8}* ...有缘再见。',
                    '<32>{#s/equip}{#p/event}* 滴...'
                ]);
            }
            return { a, b, d, k, m };
        },
        neutral2: [
            '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#p/asgore}{#f/1}* 哈喽，年轻人。',
            '<25>{#p/asgore}{#f/1}* 不知你是否还活着，\n  更不知道你能不能\n  收到这段录音。',
            '<25>{#p/asgore}{#f/2}* 我发送了终止自毁指令，\n  但不知飞船能否收到。',
            '<25>{#p/asgore}{#f/4}* 但如果真的一切顺利，\n  救了你的命...',
            '<25>{#p/asgore}{#f/25}* 那我会由衷地高兴。',
            "<25>{#p/asgore}{#f/7}* 我觉得，Asriel干出那些事\n  不该都归咎于你。",
            '<25>{#p/asgore}{#f/5}* 你饶恕了Papyrus，\n  放过了Muffet，也对\n  很多其他怪物抱以仁慈...',
            '<25>{#p/asgore}{#f/6}* 这些都证明，\n  你努力想浪子回头、\n  改过自新。',
            '<25>{#p/asgore}{#f/21}* 旁边还有个孩子\n  也想和你说几句呢。',
            '<25>{#p/kidd}{#f/7}* 老兄，是你吗？！',
            '<25>{#p/kidd}{#f/2}* 呃，我...\n  不记得你叫什么了...',
            '<25>{#p/asgore}{#f/6}* 别怕，把你之前和我说的\n  都告诉人类吧。',
            '<25>{#p/kidd}{#f/6}* 好的，好的。',
            "<25>{#p/kidd}{#f/4}* 嗯，那个...",
            '<25>{#p/kidd}{#f/4}* 不管那Asriel\n  做了什么事...',
            '<25>{#p/kidd}{#f/3}* 我始终觉得，你超酷的！',
            "<25>{#p/kidd}{#f/13}* 要是还能再见的话，\n  我们一定会玩得很开心的！",
            "<25>{#p/kidd}{#f/6}* 另外，我想...\n* 尽管我们都做过错事，\n  受过伤...",
            '<25>{#p/kidd}{#f/5}* 但只要在一起，\n  我们肯定能从过去的阴影中\n  走出来。',
            '<25>{#p/asgore}{#f/6}* 嗯... 听起来很棒！',
            '<25>{#p/asgore}{#f/5}* 你们之前就同甘共苦，\n  所以，这样做就对了。',
            "<25>{#p/kidd}{#f/4}* 人类必须要走，\n  真是太遗憾了。\n* 你说是吧？",
            '<25>{#p/asgore}{#f/1}* ...是啊。',
            "<25>{#p/kidd}{#f/3}* 没事，我朋友那么酷，\n  肯定会没事的。",
            "<25>{#p/kidd}{#f/1}* 保重啊，老兄！",
            '<25>{#p/asgore}{#f/20}* ...',
            '<18>{#p/papyrus}{#f/7}哎！？\n跟人类聊天\n怎么能不叫我呢？！',
            '<18>{#p/papyrus}{#f/4}...太不公平了。',
            '<25>{#p/kidd}{#f/14}* 哟--！PAPYRUS！！！',
            '<25>{#p/kidd}{#f/1}* 骷髅老兄，\n  你也想跟人类说说话吗？',
            "<25>{#p/kidd}{#f/2}* 正好Asgore要送我回家。",
            "<18>{#p/papyrus}{#f/0}当然！\n我可有很重要的事哦。",
            "<25>{#p/kidd}{#f/1}* 酷欸，电话给你！\n* 等会见，老兄！",
            '<25>{#p/asgore}{#f/6}* ...我先把怪物小孩\n  送回我家，去去就回。',
            '<18>{#p/papyrus}{#f/0}好！过了这么久，\n我们终于又能聊啦，\n人类！',
            '<18>{#p/papyrus}{#f/5}呃，你可能回不了，\n那就我自己说，\n你听着就好。',
            "<18>{#p/papyrus}{#f/6}说回正事！",
            '<18>{#p/papyrus}{#f/0}我只是想说，\n干得漂亮。',
            '<18>{#p/papyrus}{#f/5}那个“ASRIEL”...\n想必给你添了不少麻烦。',
            '<18>{#p/papyrus}{#f/4}一路上，给你施压，\n蛊惑你，甚至逼迫你做\n那些... 昧良心的事。',
            '<18>{#p/papyrus}{#f/5}但你，在他的威慑之下\n仍尽力不去伤害我们，\n让很多怪物活了下来。',
            "<18>{#p/papyrus}{#f/0}所以，不必自责！",
            '<18>{#p/papyrus}{#f/9}你想成为好人的努力，\n我们都看在眼里！',
            "<18>{#p/papyrus}{#f/6}那些努力，\n肯定是有意义的，\n对吧？",
            '<18>{#p/papyrus}{#f/6}...',
            "<18>{#p/papyrus}{#f/5}说实话...\n你离开后，\n我们都活得很艰难。",
            "<18>{#p/papyrus}{#f/5}阻止核心爆炸后...",
            '<18>{#p/papyrus}{#f/5}我和其它帮忙的人\n聊了聊。',
            '<18>{#p/papyrus}{#f/6}...\nMUFFET直接把我当空气。',
            '<18>{#p/papyrus}{#f/6}核心的员工\n因为没看好控制台，\n都十分懊恼。',
            '<18>{#p/papyrus}{#f/5}而那只人偶...',
            '<18>{#p/papyrus}{#f/5}...\n失去了很重要的亲人。',
            '<18>{#p/papyrus}{#f/5}为了稳住核心，\n他的幽灵表亲\n与核心融合了。',
            '<18>{#p/papyrus}{#f/6}那幽灵确实没死...',
            "<18>{#p/papyrus}{#f/5}但再也不能开口说话，\n再也不能正常生活了。",
            "<18>{#p/papyrus}{#f/3}谁都不希望这样...",
            '<18>{#p/papyrus}{#f/6}那人偶，每天只是\n呆呆望着核心，\n一看就是一整天。',
            '<18>{#p/papyrus}{#f/5}我想安慰安慰它，\n但不知道怎么做才好...',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/6}不-不过，\n它肯定能挺过来的！",
            '<18>{#p/papyrus}{#f/0}我相信它！',
            '<18>{#p/papyrus}{#f/0}就像我相信你一样。',
            '<18>{#p/papyrus}{#f/5}我相信这里每个人...',
            '<18>{#p/papyrus}{#f/4}除了你那冒牌货朋友。',
            '<18>{#p/papyrus}{#f/0}谁叫他砸了自己的招牌。',
            '<25>{#p/asgore}{#f/6}* 唉，我回来了。',
            '<18>{#p/papyrus}{#f/0}欢迎欢迎！',
            '<25>{#p/asgore}{#f/7}* 你应该把想说的\n  都说完了？',
            "<18>{#p/papyrus}{#f/6}其实，\n我还有很多话想说...",
            '<18>{#p/papyrus}{#f/5}但电池快没电了。',
            '<25>{#p/asgore}{#f/1}* 明白了。',
            "<18>{#p/papyrus}{#f/5}那么...\n我把电话给你吧。",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/2}* 他没撒谎。',
            '<25>{#p/asgore}{#f/1}* 发送这通长途录音，\n  需要动用巨大的能量。',
            "<25>{#p/asgore}{#f/2}* 而核心功率\n  早已大不如前...",
            '<25>{#p/asgore}{#f/4}* 毕竟，现在的核心\n  几乎都是由一个幽灵\n  支撑和管理的...',
            '<25>{#p/asgore}{#f/2}* 所以，没必要的话，\n  就别让核心超负荷工作了。',
            '<18>{#p/papyrus}{#f/0}是啊，确实如此。',
            '<25>{#p/asgore}{#f/15}* 不过，结束录音前...',
            '<25>{#p/asgore}{#f/15}* 最后给你几句忠告。',
            '<25>{#p/asgore}{#f/14}* ...\n* 不要相信“他”。\n* 更不要成为“他”的傀儡。',
            '<25>{#p/asgore}{#f/14}* 无论“他”说什么，\n  都绝对别信。',
            '<25>{#p/asgore}{#f/13}* 不要让“他”为所欲为，\n  伤害别人。',
            '<18>{#p/papyrus}{#f/6}我先走了，\n拜拜！',
            '<25>{#p/asgore}{#f/14}* ...不要被“他”牵着鼻子走。\n* 不要落入暴力的深渊。',
            '<25>{#p/asgore}{#f/13}* 如果走投无路...',
            '<25>{#p/asgore}{#f/14}* ...请马上杀了“他”，\n  不要犹豫。',
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/4}* 祝你好运。',
            '<32>{#s/equip}{#p/event}* 滴...'
        ],
        lastblook1: [
            () => [
                '<32>{#p/napstablook}* 哦...\n* 是frisk呀......',
                ...(SAVE.data.b.ufokinwotm8
                    ? [
                        '<32>* ...',
                        "<32>* ...怎么了？\n* 为啥露出那副表情？",
                        '<32>* 是因为... 我挡路了吗？',
                        '<32>* ...',
                        "<32>* 哦......\n* 都怪我.........",
                        '<32>* 对不起...',
                        '<32>* 我只是习惯躺在这......\n  不是故意的......',
                        "<32>* 我会走的... ",
                        '<32>* 请你......\n* 原谅我............'
                    ]
                    : [
                        "<32>* 那些工人\n  还在前门那里干活呢...",
                        '<32>* 感觉现在出去也没啥意思',
                        ...(SAVE.data.b.c_state_secret4 && !SAVE.data.b.c_state_secret4_used
                            ? [
                                '<32>* ...',
                                '<32>{#p/human}* （你把“六号档案”里\n  那位Napstablook说的秘密\n  讲给了眼前的幽灵。）',
                                '<32>{#p/napstablook}* ...一个小魔术？',
                                '<32>* 等等... 我懂了',
                                '<33>* 让我试一下...'
                            ]
                            : [])
                    ])
            ],
            () => [
                ...(SAVE.data.b.c_state_secret4_used
                    ? ["<32>{#p/napstablook}* 谢谢你...\n* 你为我们做了那么多，\n  我真的很感激。"]
                    : ["<32>{#p/napstablook}* 嘿...\n* 你为我们做了那么多，\n  我真的很感激。"]),
                '<32>* 让我们重获自由，\n  帮助我们...',
                '<32>* ...',
                "<32>* 其实一开始，我跟表亲都觉得\n  永远也逃不出去了。",
                "<32>* 毕竟上个人类坠落后，\n  很久都没有新人类来到这里。",
                '<32>* 而且我们最近还听说...\n  人类已经离开原来的星系，\n  前往其他地方了。',
                '<32>* 所以...',
                "<32>* 你能来这里，\n  简直就是奇迹。"
            ],
            () =>
                SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>{#p/napstablook}* 哦对，跟你聊聊我表亲的事吧...',
                        "<32>* 那次风波后，\n  情况好转了不少",
                        "<32>* 我跟mettaton好好聊了聊。",
                        "<32>* 最终，我们决定...\n* 在欧律比亚重建蜗牛农场。",
                        "<32>* mettaton负责宣传工作，\n  而我跟其他员工\n  一起负责饲养蜗牛。",
                        '<32>* 而且，到这里之后，\n  我们马上就有地方住了。',
                        '<32>* 有座房子特别善良，\n  直接就让我们住了。',
                        "<32>* 我一看... 那房子不就是\n  undyne之前的家嘛..."
                    ]
                    : [
                        '<32>{#p/napstablook}* 哦对...\n  聊聊我表亲的事吧。',
                        "<32>* 有件事，不知该不该跟你讲...",
                        '<32>* 幽灵们发现，mettaton好像就是\n  我们失散多年的亲人。',
                        '<32>* 我跟其他幽灵想找他聊聊...',
                        "<32>* ...效果不理想，\n  两边都弄得挺不愉快的。",
                        '<32>* 幽灵们你怪我，我怪你，\n  推卸责任...',
                        "<32>* 出了这事...\n  我再也不想跟mettaton\n  说一句话。",
                        '<32>* 嗯... 这话题有点沉重了',
                        '<32>* 对不起...'
                    ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* ...', '<32>* 说到“家”和“家人”...']
                    : ['<32>{#p/napstablook}* ...', "<32>* 嘿...\n* 虽然我和我的表亲\n  关系不怎么好，不过..."]),
                '<32>* 我也领养了一个孩子，\n  那孩子... 真的很出色。',
                "<32>* 孩子非常乐观，总挂着笑容。\n* 他说，所有怪物中，\n  最喜欢的就是我...",
                '<32>* 想起他在“档案”里的生活...\n  我觉得，这就是缘分吧。',
                '<32>* 而且... 当我难过时，\n  那孩子总是尽力让我开心。',
                '<32>* 几个小时前，围墙还没建好...',
                '<32>* 孩子想出去看看施工现场，\n  怕去晚了就看不到了。',
                '<32>* 我跟他说，没问题啊\n  他特别开心...',
                '<32>* 我也渐渐明白\n  大家为什么喜欢养小孩了。'
            ],
            () => [
                '<33>{#p/napstablook}* 还有个人，\n  我觉得也要感谢一下...',
                '<32>* 那就是asgore',
                '<32>* 多亏他和alphys信任我，\n  我才能领养这个孩子。',
                '<32>* 之前，有位毛茸茸的先生\n  总来我们的蜗牛农场。\n* 我最近才知道，原来就是他。',
                "<32>* 他对那些蜗牛特别好。",
                '<32>* 蜗牛买回家之后，\n  如果发现他们受伤了，\n  asgore会帮他们疗伤。',
'<32>* ...然后再做成美食。',
                '<32>* 连他那样的人...\n  都愿意信任我...',
                '<32>* ...',
                "<32>* 嗯... 我相信\n  他肯定会精心照顾你的。",
                ...(SAVE.data.b.f_state_kidd_betray
                    ? ['<32>* 就算你没有兄弟姐妹...']
                    : SAVE.data.b.svr
                        ? ['<32>* 他会把爱奉献给\n  你那两个小伙伴，同时...']
                        : ['<32>* 他会把爱奉献给\n  你那个小伙伴，同时...']),
                "<32>* 他也会把爱分享给你，\n  让你健康快乐地成长。"
            ],
            () => [
                '<32>{#p/napstablook}* 你知道吗...\n  在很久很久以前...',
                '<33>* 那时，我还没开蜗牛农场...\n  怪物们还在故园生活...',
                '<32>* 每天，我平静地生活着。',
                
                '<32>* 故园... 真是个特别的地方。',
                '<32>* 每天，光塔迸发火光，划破夜空，\n  烈焰升腾，铺满整片苍穹...',
                '<32>* 战争爆发前，人们安居乐业...',
                "<32>* 那时，周遭的一切我习以为常。\n  认为，生活本该如此。",
                '<32>* 经历了这两百多年的\n  囚笼生活，我才知道......',
                "<32>* 自由、和平绝非理所当然。"
            ],
            () => [
                '<32>{#p/napstablook}* 哦，不说这些了。',
                "<32>* 故园生活固然值得留恋，\n  但在新家园，有趣的事也不少。",
                '<32>* 就拿这里的本土生物来说。',
                '<32>* 前不久，我到星球表面旅行。',
                "<32>* 在那里，我见到了几只本土生物。\n  紧接着我发现了件好玩的事：",
                '<32>* 那些生物... \n  也学会使用魔法了。',
                "<32>* 我把这事告诉了alphys。",
                '<32>* 她说，咱们刚到这里时做过探测，\n  结果表明，这颗行星\n  根本就没有魔法。',
                '<32>* 难不成...',
                "<32>* ...我们给这颗星球带来了\n  什么新东西？"
            ],
            () => [
                '<32>{#p/napstablook}* 嘿嘿...',
                "<32>* 我是不是有点太能说了？",
                '<32>* 但你一直在我身边倾听',
                "<32>* 所以，frisk，我想对你说",
                '<32>* 谢谢你。'
            ],
            () => [
                '<32>{#p/napstablook}* 哦？\n* 你还没聊够吗？',
                '<32>* ...',
                '<32>* 哎呀......',
                '<32>* 不知道聊点啥好了',
                "<32>* 好像想不出啥有趣的话题了...",
                '<32>* 所以，你先到别处转转吧'
            ],
            () => [
                '<32>{#p/napstablook}* ...呃，frisk...',
                "<32>* 我真想不出什么话题了",
                '<32>* 要不... 给我点时间...',
                "<33>* 我肯定能想出来..."
            ],
            () => [
                '<32>{#p/napstablook}* ...哦.........',
                "<32>* 你还在这啊........",
                '<32>* 我都.........\n  想不到能聊的了.........',
                '<32>* 嗯... 要是你孤独了，\n  想找我作伴...',
                '<32>* 那想待多久都可以的'
            ],
            () => [
                '<32>{#p/napstablook}* 嗯... 让我想想...',
                '<32>* 其实呢... 我想到个笑话',
                '<32>* ...你想听听吗？',
                "<32>* 我不咋擅长讲笑话，\n  但可以试试看..."
            ],
            () => [
                '<32>{#p/napstablook}* 好的...\n* 笑话是这样的...',
                '<32>* 为什么幽灵说的话，\n  有的能信，有的不能信？',
                '<32>* ...',
                '<32>* 答案是... \n  有的话能信，因为它是个{@fill=#ff0}鬼才{@fill=#fff}，\n  有的话不能信，因为那话{@fill=#ff0}鬼才{@fill=#fff}信。',
                '<32>* 发现笑点了吗？\n  “鬼才”，“鬼才”信。',
                '<32>* 果然...\n* 这笑话太烂了'
            ],
            () => [
                '<32>{#p/napstablook}* ...没听够笑话，\n  想再让我讲一个？',
                '<32>* 唔... 让我想想看...'
            ],
            () => [
                "<32>{#p/napstablook}* 想好了，\n  笑话是这样的...",
                '<32>* 有只幽灵洋洋自得，\n  猜猜它碰到了什么喜事？',
                '<32>* ...',
                '<32>* 答案是... \n  这只幽{@fill=#ff0}灵洋{@fill=#fff}洋自得，\n  因为它{@fill=#ff0}领养{@fill=#fff}了一个孩子。',
                '<32>* 嘿嘿...'
            ],
            () => ['<32>{#p/napstablook}* ...还没听够？\n  还想再听一个笑话？', '<32>* 嗯... 看你这么想听...\n  我再想想。'],
            () => [
                "<32>{#p/napstablook}* 好。\n* 想到了。",
                '<32>* 为什么某人出丑时，\n  周围总会有幽灵出没呢？',
                '<32>* ...',
                '<32>* 答案是...\n  社死场面，又叫{@fill=#ff0}冥{@fill=#fff}场面。'
            ],
            () => [
                '<32>{#p/napstablook}* 哎呀。\n* 这个笑话不太好...',
                '<33>* 但也希望你能喜欢。'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                '<32>* 哎呀...',
                "<32>* ...我好像真想不出\n  什么能聊的了。",
                "<32>* 你那么认真地听我说话，\n  要是我词穷了... 会很自责的。",
                "<32>* blooky，快想想，快想想...",
                '<32>* ...还能聊点什么呢...'
            ],
            () => [
                '<32>{#p/napstablook}* 等等，有了',
                '<32>* 你知道什么是“幽灵食物”吗？',
                '<32>* 最后一个笑话，就是关于它的。',
                "<32>* 是什么笑话呢？\n  你肯定没听过。",
                '<32>* 想听的话，现在就讲给你...'
            ],
            () => [
                '<32>{#p/napstablook}* 其实，幽灵食物并非\n  只有幽灵才能吃...',
                "<32>* 任何怪物都能吃，\n  任何怪物都爱吃...",
                '<32>* 为什么呢？\n  因为“万物有灵”。',
                "<32>* 万物有灵，万物幽灵，\n  万物皆可成为幽灵。\n* 所以，幽灵食物，大家都能吃。",
                "<32>* 不仅能吃，而且爱吃。\n* 因为“幽灵食物”的简称，\n  不就是“零食”嘛。"
            ],
            () => [
                '<32>{#p/napstablook}* 其实，这不完全是个笑话。\n* 因为，任何食物其实都可以\n  变成幽灵食物。',
                '<32>* 有些食物，\n  想变成幽灵食物非常容易。',
                '<32>* 比如说... 水果、奶昔，等等。',
                ...(SAVE.data.b.item_blookpie
                    ? ['<32>* 但有些食物... 比如说\n  你买的那个洋梅果冻派，\n  就很困难。']
                    : ['<32>* 但有些食物... 比如说\n  我店里那个洋梅果冻派，\n  就很困难。']),
                '<32>* 想让它变成幽灵食物...\n  需要消耗大量的魔法。',
                '<32>* 食物的构成越复杂，\n  想变成幽灵食物\n  就越困难。'
            ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* 有一天，我的... 啊不，\n  mettaton给我做了个蛋糕。']
                    : ['<32>{#p/napstablook}* 有一天，一位幽灵表亲\n  给我做了个蛋糕。']),
                '<32>* 蛋糕的内馅，是巧克力酱，\n  蛋糕的装饰，是巧克力棒，\n  蛋糕的一切，都是巧克力状。',
                "<32>* 不仔细看的话，\n  我真以为那就是人类食物。",
                ...(SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>* 但其实，那个蛋糕\n  是他耗费大量的魔法\n  才转换出来的幽灵食物...',
                        '<32>* 那天，并不是我的生日，\n  也不是什么特殊节日。\n* 他做这些，只为了能让我开心点。'
                    ]
                    : [
                        '<32>* 但其实，那个蛋糕\n  是表亲耗费大量的魔法\n  才转换出来的幽灵食物...',
                        '<32>* 那天，并不是我的生日，\n  也不是什么特殊节日。\n* 表亲做这些，只为了能让我开心点。'
                    ]),
                '<32>* 我们一起品尝蛋糕。',
                '<32>* 那天，我很幸福，'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                "<32>* 嘿...\n* 我想躺在这假装睡会觉...",
                '<32>* 忙活了半天，\n  早就该休息一下了。',
                "<32>* ...等等，现在都早上了...",
                '<32>* 对哦，{@fill=#ff0}早{@fill=#fff}就该休息一下嘛。',
                "<32>* 早和晚...\n* 看来，到了新星球，{@fill=#ff0}早晚{@fill=#fff}得学会\n  适应昼夜更替啊。",
                '<32>* ...',
                '<32>* 嘿... 谢谢你陪我聊天，\n  frisk',
                '<32>* 要是想躺在我身边...\n  随时都可以哦......',
                '<32>* ...',
                '<32>* Zzz... Zzz...'
            ],
            () => [
                '<32>{#p/napstablook}* Zzz... Zzz...',
                '<32>* Zzz... Zzz...',
                "<32>{#p/basic}* 这只幽灵不停地大声说“z”，\n  假装自己在睡觉。",
                choicer.create('* （躺在它身边吗？）', '好啊', '算了')
            ],
            () => ['<32>{#p/basic}* 幽灵还在这里。', choicer.create('* （躺在它身边吗？）', '好啊', '算了')]
        ],
        lastblook2: ['<32>{#p/napstablook}* 呜呜呜呜呜呜呜......', '<32>* 太棒了......'],
        lastblook3: [
            '<32>{#p/human}* （...）',
            '<32>* （你体验到一种... 奇特的感觉。）',
            '<32>{#p/napstablook}* 哦，抱歉...\n  刚刚忘了跟你解释...',
            '<32>* ...\n* 呃，是这样的...',
            '<32>* 我把你的身体... 当作容器...\n* 这样...... 我们俩就能\n  同时处在一个空间......',
            
            "<32>* 我之前也跟另一个人类试过...\n  不知为何，那个人类\n  非常享受这种“共栖”...",
            '<32>* 说不定...',
            '<32>* 你也喜欢...'
        ],
        lastblook4: [
            "<32>{#p/napstablook}* 嗯... 只要你不动，\n  就能一直“共栖”下去.....",
            '<32>* 所以...\n* 如果想保持这样，就不要动'
        ],
        lastblook5: [
            '<32>{#p/napstablook}* 嗯...\n* 希望你喜欢这次体验...',
            '<32>* 或至少，希望你觉得\n  这种“共栖”挺有意思...',
            
        ],
        view: () => [choicer.create('* （到外面走走？）', '出去看看', '再等等')],
        computer1: () =>
            SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* （可你根本不想多在这上面\n  浪费一秒。）"]
                : ["<32>{#p/basic}* 电脑上不了网，\n  侧面有个插芯片的凹槽。"],
        computer2: () => [choicer.create('* （把芯片插入电脑？）', '插入', '算了')],
        computer3: ['<32>{#p/human}* （你想再等等。）'],
        computer4: [
            '<32>{#p/basic}* 啊！\n* 谢谢你！\n* 太谢谢你了！',
            '<32>* 你对我真好！\n* 我在很远很远的地方，\n  也有新家啦！',
            '<32>* ...',
            '<32>* 刚刚，我和前哨站的身体\n  建立了连接。',
            '<32>* ...',
            '<32>* 一具身体，分居两地。\n  简直做梦都想不到！',
            '<32>* 真的... 太棒了...',
            '<32>* 亲爱的旅行者，这份恩情\n  我永远都不会忘的！'
        ],
        computer5: ['<32>{#p/basic}* 谢谢你，亲爱的旅行者。\n* 因为有你，\n  我才有了未来。'],
        end1: [
            '<25>{*}{#p/asgore}{#f/6}* 一号应急预案已生效。{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* 正在启动自毁程序。{^20}{%}'
        ],
        end2: [
            '<25>{*}{#p/asgore}{#f/6}* 一号应急预案已生效。{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* 自毁程序已远程终止。{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* 系统即将关闭。{^20}{%}'
        ],
        save1: '<32>{#p/human}{@fill=#f00}* （还剩下$(x)个。）',
        save2: '<32>{#p/human}{@fill=#f00}* （决心。）',
        frontstop: pager.create(
            0,
            [
                "<32>{#p/basic}* 孩子，实在不好意思。\n* 咱们刚定居，\n  后院啥的都没建好呢。",
                '<32>* 想去前院？\n  前院也没建好呢。',
                "<32>* Asgore现在正跟我们一起\n  建院子呢，\n  估计还得干几个小时。",
                "<32>* 所以，你先自己在家\n  待一会吧。"
            ],
            ['<32>{#p/basic}* 再等几个钟，他就回来了。', '<32>* 先别出门，\n  好好在家待着。'],
            ['<32>{#p/basic}* 多等一会吧。']
        ),
        charatrigger: {
            _frontier1: pager.create(
                0,
                [
                    '<32>{#p/basic}* 原来，你的房间长这样啊...',
                    '<32>* 总觉得有点怪...',
                    "<32>* ...我没开玩笑，\n  总觉得和你风格有点不搭。",
                    "<32>* 要是随你选，\n  你肯定第一个挑狗窝住。",
                    "<32>* 每天睡狗窝，啃狗粮...",
                    "<32>* 一边吃狗粮，一边享受\n  轻柔的抚摸...\n  活得有滋有味。"
                ],
                [
                    "<32>{#p/basic}* 你要真想吃狗粮，\n  我给你拿...",
                    "<32>* 可是... 我现在虽然能“具现化”，\n  但终归还是个幽灵。",
                    "<32>* 所以，我只能给你拿\n  “幽灵狗粮”了。\n* 问题是，你咽得下吗？"
                ],
                [
                    '<32>{#p/basic}* 对，我现在能“具现化”了。',
                    "<32>* 之前，我总跑到Asriel跟前，\n  努力显形...\n* 可怎么弄，他都看不见我。",
                    '<32>* 不过，到了这之后，\n  我就能显形了。',
                    '<32>* 貌似只有你能看到我，\n  但也不错了。',
                    '<32>* 最起码，现在你能直接\n  跟我互动，\n  跟我聊天了。'
                ],
                ['<32>{#p/basic}* 对，这就叫“互动”。'],
                ['<32>{#p/basic}* 这也叫互动。'],
                ['<32>{#p/basic}* 这还叫互动！'],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* 有完没完了。'],
                ["<32>{#p/basic}* 房间里有趣的东西那么多，\n  光盯着我干嘛？"],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* 没完了是吧。'],
                ["<32>{#p/basic}* 看来你心里只有我。"],
                ['<32>{#p/basic}* 行了行了...', "<32>{#p/basic}* 咱俩都耗这么久了。"],
                ['<32>{#p/basic}* 你又浪费了一点点时间。'],
                ['<32>{#p/basic}* 你又浪费了亿点点时间。'],
                ['<32>{#p/basic}* 你又浪费了亿万年时间。'],
                ["<32>{#p/basic}* 赶紧干正事去吧。"],
                []
            ),
            _frontier2: pager.create(
                0,
                [
                    '<32>{#p/basic}* 走廊，平凡的走廊。',
'<32>{#p/basic}* 但对于那时的我，\n  还有Asriel，\n  它并不平凡。',
                    '<32>* 它，是我们俩无数冒险的\n  起点...',
                    '<33>* ...说是冒险，其实只是\n  在屋里跑来跑去，\n  不停穿梭。',
                    '<32>* ...\n* 是是是，我当然知道，\n  你就当这是“冒险”吧。',
                    '<32>* 我俩不停玩，不停玩，\n  把镜子打碎了整整七百次。\n* 结果，“冒险”被强制叫停了。',
                    "<32>* 你都不知道我为了玩，\n  编出的理由有多离谱...",
                    '<33>* 有一次，镜子又打碎了。\n  我是这么跟她解释的：',
'<33>* 在遥远的地球，\n  有一台粒子对撞机，\n  射出的粒子击中了前哨站。',
                    '<33>* 粒子穿过力场，绕过城墙，\n  翻山越岭，最终...\n* 精准地击中了家里的玻璃！',
                    "<32>* 嗯... 是不是\n  “离谱他妈给离谱开门——\n   离谱到家了”？"
                ],
                [
                    '<32>{#p/basic}* 而现在，\n  走廊，就是平凡的走廊。',
                    '<32>* 借口，也只是卑劣的借口。',
                    '<32>* “看山是山，看水是水...”\n* 这里面蕴含着什么哲理呢？\n  不清楚。',
                    "<32>* 不过我倒觉得...\n  走廊那边有只幽灵，\n  它待的位置蛮有意思的。",
                    '<32>* “卡在两个房间的边界。”\n  状态的融合，纠缠，叠加...\n  蛮有象征意味的。',
                    '<32>* 不过，估计只有人类幽灵\n  才会想这么多。',
                    '<32>* 怪物里的幽灵天生就是\n  幽灵，根本不会纠结\n  什么“叠加”...',
                    "<32>* 不过，这只幽灵\n  还是躺在走廊边上比较好...",
                    '<32>* ...躺那个地方，\n  太挡道了。'
                ],
                [
                    '<32>{#p/basic}* 抱歉，跑题了。',
                    '<32>* 不过，我一直杵在这么个\n  无聊的走廊，\n  能说出啥新花样？',
                    '<33>* 走廊无聊，所以我无聊，\n  我无聊，所以找话聊，\n  找话聊，所以聊跑题。',
'<32>* 多合理呀。'
                ],
                ["<32>{#p/basic}* 这河狸吗？\n* 我不到啊。"],
                ["<32>{#p/basic}* 河狸来了也无聊。"],
                ['<32>{#p/basic}* 我只知道，这好无聊。'],
                ['<32>{#p/basic}* 无聊了，怎么办呢？', '<32>{#p/basic}* ...等等，我知道了！\n* 出发，向新房间进发！'],
                []
            ),
            _frontier3: pager.create(
                0,
                [
                    "<32>{#p/basic}* 哦，这里是Asgore的房间。",
                    '<32>* 大老爹果然还在坚持\n  写日记的爱好啊...',
                    "<32>* 现在他还啥都没写，\n  但过不了多久，等上面有了字...",
                    '<32>* 我就可以偷偷溜进去，\n  瞟两眼...\n* 心里很慌，但很爽。'
                ],
                [
                    "<32>{#p/basic}* 咋了？\n* 谁不都有几个奇怪的\n  小癖好，不敢让别人发现？",
                    '<32>* 我挺好奇\n  你的小癖好是啥呢...',
                    "<32>* 到时候我好好调查调查。"
                ],
                [
                    "<32>{#p/basic}* 你放心，我现在\n  就在这里，哪也不去。",
                    '<32>* 静静注视着... 悄悄等待着...\n  然后...',
                    "<32>* 当你偷偷做啥\n  见不得人的事时，\n  一把逮个正着！"
                ],
                ["<32>{#p/basic}* 我不会干得太出格的。"],
                ["<33>{#p/basic}* 等你睡觉时..."],
                []
            ),
            _frontier4: pager.create(
                0,
                [
                    "<32>{#p/basic}* 我刚往外面瞄了一眼，\n  他们还搁那干活呢。",
                    '<32>* 不过前院还是乱得不像话。',
                    "<32>* Asgore... 还玩弄\n  他那些花花草草呢，\n  没完没了。",
                    '<32>* 而那些核心员工...\n  正一边优哉游哉建门廊，\n  一边摸鱼。',
                    "<32>* 真好奇这帮人建的院子\n  会是啥样子。",
                    "<32>* 希望这次有Asgore负责，\n  能比前哨站那个顺眼一点。"
                ],
                [
                    "<32>{#p/basic}* 说是“有Asgore负责”，\n  但他只负责画蓝图。",
                    '<32>* 昨天开工时，还是\n  Doge在指挥工人干活。',
                    '<32>* 那时候，我也遛出去看了。',
                    "<32>* 她非常严厉，\n  但动员指挥很有一套。",
                    '<32>* 让她当包工头，\n  动员工人非常不错。',
                    '<32>* 至于Asgore... ',
'<32>* 我很喜欢他，\n  但要是让他来指挥工程，\n  那就完蛋了。'
                ],
                [
                    '<33>{#p/basic}* 今天早上，\n  前阳台建好了。',
                    '<32>* 而怪物小孩跟Asriel...\n  他俩都出去看风景了。',
                    "<32>* 他俩现在简直形影不离...\n  估计也等着你加入他们呢。",
                    "<32>* 要是在屋子里待腻了，\n  就出去找他俩吧。",
                    '<33>* 不想游山玩水，\n  回房间躺着也可以。\n* 随你便。'
                ],
                [
                    '<32>{#p/basic}* 虽然说“游山玩水”...\n  但现在这个季节还玩不了水。',
                    
                    "<32>* 但别担心... Frisk！\n* 这世界上有山有水的地方\n  多着呢。",
                    '<32>* 比如... 沼泽湿地，\n  那里泥泞不堪。',
                    '<32>* 到了那里，\n  就得找一艘船了。'
                ],
                [
                    "<32>{#p/basic}* 别做梦，\n  在那种地方，还想游过去？",
                    '<33>* 记住，游泳要到安全的地方，\n  挑合适的时间才行。'
                ],
                [
                    '<32>{#p/basic}* “时间”...\n  怪物有时间概念吗？',
                    '<32>* 在太空长大，\n  或许都不知道什么是“昼”，\n  什么是“夜”...'
                ],
                ["<32>{#p/basic}* ...这个问题\n  又可以聊一整天。"],
                []
            ),
            _frontier5: pager.create(
                0,
                [
                    '<32>{#p/basic}* 餐桌旁，有三把小椅子...',
                    '<32>* 一把是你的，一把是他的，\n  还有一把，是怪物小孩的。',
                    "<32>* 没关系。\n* 毕竟Asgore根本不知道\n  我的存在。",
                    '<32>* 只是...',
                    '<32>* 没有自己的位置，\n  终究还是不太舒服。'
                ],
                [
                    "<32>{#p/basic}* 那时，我跟Asriel总喜欢\n  趁母亲不注意，\n  把椅子调个包。",
                    "<32>* 有时候，Asgore也加入我们，\n  联手捉弄她。\n* 她... 挺生气的。",
                    '<32>* 但小孩哪管这么多，\n  好玩就得了。',
                    '<32>* 嘿嘿，Asgore总喜欢检查\n  Asriel的椅子上有没有\n  太空生物。',
'<32>* 生怕Asriel不小心压着人家。',
                    "<32>* 有一次，Asgore还跟往常一样\n  检查椅子。\n* 殊不知，我俩已经把椅子调了包。",
                    '<33>* 结果Toriel正打算坐下，\n  迎面看到跪在她面前\n  检查椅子的Asgore。',
'<32>* 简直就是冥场面。',
                    '<32>* 我们乐得不行，\n  留下Toriel自个坐在那，\n  一脸懵逼。',
                    '<32>* 不过，她后来也没再追究。'
                ],
                () => [
                    "<32>{#p/basic}* 毕竟... Toriel挺反感\n  我们搞的这些恶作剧的。",
                    SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? "<32>* 过了这么多年，\n  她变了很多，早就不再是\n  Asriel熟悉的那个母亲了..."
                        : "<32>* 如今，她仍在独居，\n  也不常来这里...",
                    "<32>* 但因为有你，\n  Asriel没那么失落。",
                    '<32>* Asriel要是开心，\n  绝不会藏着掖着，\n  一看就能看出来。',
                    '<32>* ...',
                    '<32>* ...至少以前如此。'
                ],
                () => [
                    "<32>{#p/basic}* 人总会变，我也不该\n  总把他当成以前那个Asriel。",
                    SAVE.flag.n.killed_sans
                        ? '<32>* 他说，之前怂恿你\n  干了坏事...'
                        : '<32>* 他说，之前做了不少\n  伤害你的事...',
                    "<32>* 果然，跟以前相比，\n  他变了不少。",
                    '<32>* 我也一样。',
                    '<32>* 只希望，他能珍惜\n  现在的一切，过好每一天。',
                    "<32>* 他要是想找人作伴，\n  就去多陪陪他吧。"
                ],
                [
                    "<32>{#p/basic}* 暂时想不到新话题了。",
                    "<32>* 现在我们有了家，\n  有了太阳，\n  还有什么不知足的呢？",
                    '<32>* ...你说是吧。'
                ],
                []
            ),
            _frontier6: pager.create(
                0,
                [
                    '<32>{#p/basic}* 他俩还留了个微波炉。',
                    '<32>* 不愧是他俩。',
                    "<32>* 看来，以后Asriel得\n  经常用这个微波炉\n  来填饱肚子了。",
                    '<32>* 我愿称他为“微波炉烹饪大师”。'
                ],
                [
                    "<32>{#p/basic}* 现在，我们吃的东西\n  几乎全是大量加工，\n  合成出来的...",
                    '<32>* 各种能量转化，化学合成，\n  根本没几个是手工烹饪的。\n* 真是太糟了。',
                    '<32>* 就算再糟，起码那些\n  合成出来的东西还能吃。',
                    '<32>* 而加工都不加工了，\n  直接丢给微波炉...',
                    "<32>* 太离谱了。",
                    "<32>* 离谱到家了。"
                ],
                [
                    "<33>{#p/basic}* 这只是一己之见而已。",
                    '<32>* 按你的性格，\n  很可能想好好反驳一番。\n* 想反驳，随意。',
                    '<32>* 但争到最后...',
                    "<32>* 真的能找到，\n  或者说存在一个\n  绝对的真理吗？"
                ],
                [
                    '<32>{#p/basic}* 但愿怪物们能在\n  欧律比亚多找到点\n  新鲜食物。',
                    '<32>* 一开始，寻找合适新家园，\n  选择落脚点的人，\n  是Alphys...',
                    "<32>* 所以我有点担心，也不奇怪。"
                ],
                [
                    "<33>{#p/basic}* Asriel是微波炉烹饪大师，\n  Alphys是微波炉烹饪大王。",
                    "<32>* 谈话结束。"
                ],
                ['<32>{#p/basic}* 不。', "<32>* 我拒绝交谈。"],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* 我拒绝在厨房交谈。'],
                []
            ),
            _frontier7: pager.create(
                0,
                [
                    "<32>{#p/basic}* 外面就是新修的阳台...",
                    '<32>* 那些鸟儿在做什么呢？',
                    '<33>* 歌颂房子的美丽？\n* 赞美晴朗的天气？',
                    "<32>* 或许，它们根本不喜欢这房子，\n  也不关心天气。\n* 那就... 有点可悲了。",
                    "<32>* 或许，外面根本就没有鸟。\n* 这里的鸟发出的声音是啥样，\n  我们完全不知道。",
                    '<32>* 或许，这颗星球根本就\n  没有鸟。',
                    "<33>* 或许，我们听到的“鸟鸣”\n  其实是地底深处的亡灵\n  发出的哀嗥。"
                ],
                [
                    '<32>{#p/basic}* 怪物在这里待久了，\n  星球也许会获得某种“魔力”。',
                    '<32>* 到那时，本土生物也会受影响，\n  对吧？',
                    '<32>* 到那时，动物会拥有意识吗？',
                    '<32>* 到那时，\n  它们会理解我们的话吗？\n  我们会理解他们的话吗？',
                    '<33>* 如果没有动物呢？',
'<32>* 如果只有亡灵呢？',
'<32>* 不要再想了。'
                ],
                [
                    '<32>{#p/basic}* 说到“行星魔法”...',
                    "<32>* 我猜，母星克里乌斯本没有魔法，\n  突然，母星有了魔法，\n  怪物也有了魔法。",
                    '<32>* 或者，母星本来就有魔法，\n  然后传给了怪物。',
                    "<32>* 要想弄清楚到底是咋回事，\n  咱俩得去问问Terrestria。",
                    "<32>* 她肯定知道。"
                ],
                [
                    "<32>{#p/basic}* 别怕，Frisk。\n* 要是想出去，就大胆走出去。",
                    "<32>* 要是他俩看到了你，\n  肯定很高兴。",
                    '<32>* 而且...',
                    '<32>* 如果我的分析属实...\n  这颗星球也在等候\n  你踏出这扇门的那一刻。'
                ],
                ["<32>{#p/basic}* 你别真信，\n  我的直觉可不咋地。", "<32>* 一碰到强逻辑思维的东西，\n  比如象棋，我就菜得不行。"],
                [
                    "<32>{#p/basic}* 我“棋艺生涯”的巅峰，\n  是实现了一步跳棋连跳。",
                    '<32>* 自那以后，我的棋艺\n  就开始走下坡路了。'
                ],
                [
                    "<32>{#p/basic}* 要是没被困在丛林里，\n  这会儿咱们也已经下山，\n  开始走“下坡路”了。",
                    '<32>* 我理解Asgore为啥\n  直接选这里定居。',
                    "<32>* 因为这里很安全。",
                    '<32>* 在这里生活，领养的两个孩子\n  还有亲生儿子\n  才能更好地活下去。'
                ],
                ['<32>{#p/basic}* 在半山腰定居固然很酷，\n  但住在丛林也别有风味。'],
                []
            ),
            _frontier9: pager.create(
                0,
                [
                    '<32>{#p/basic}* 哇，是厕所。\n* 我们的厕所。',
                    '<32>* 车说，彻朔，撤硕...',
                    '<32>* 优秀的撤硕美丽的撤硕好玩的撤硕\n  一个撤硕两个撤硕八个撤硕一百个撤硕\n  撤硕撤硕撤硕撤硕撤硕撤硕撤硕撤硕。',
                    '<32>* ...',
                    '<32>* 厕所？',
                    '<32>* ...',
                    '<32>* 撤硕！！！'
                ],
                [
                    '<32>{#p/basic}* 好吧... 说点别的。',
                    "<32>* 我觉得，羊羊蓬松洗发水\n  真的太酷了。",
                    "<32>* 唉，人类用不了。",
                    '<32>* 要不... 变成一只羊...',
                    '<32>* ...咩？'
                ],
                [
                    '<32>{#p/basic}* ...',
                    "<32>* 你说，有没有一种可能，\n  有人会和你共用浴室？"
                ],
                []
            ),
            _frontier10: pager.create(
                0,
                [
                    "<32>{#p/basic}* 这是怪物小孩和Asriel的房间...",
                    "<32>* 想不到啥话题。",
                    '<32>* 不过，墙上的海报挺酷的。',
                    '<32>* 上面的，是故园...',
                    "<32>* 只是颜色换成了棕色调。"
                ],
                [
                    "<32>{#p/basic}* Asgore把他俩的房间\n  弄得这么小，只能说...\n  意料之中。",
                    "<32>* 他可了解怪物的性格了。\n  “甭管是大是小，只要躺着得劲，\n   就是好卧室。”",
                    "<32>* 对怪物来说，简直太对了！"
                ],
                ['<32>{#p/basic}* ...', '<32>* 难怪Asriel昨晚\n  不睡自己的床，\n  跑过来跟你一起睡，'],
                []
            ),
            _void: pager.create(
                0,
                [
                    '<32>{#p/basic}* 据我所知...\n  有个人喜欢长时间专注，\n  一直做一件事。',
                    '<32>* 于是就建了这个房间。',
                    "<32>* 我要是很闲的话，\n  还没想好要干点啥。",
                    "<32>* 反正不会那这大把时间\n  去做这么个又枯燥，\n  又折磨人的大项目。",
                    "<32>* 我也不是那家伙，\n  不知道那人是为了啥，\n  才做这些的。"
                ],
                []
            )
        },
        balconyX: [
            '<32>{#p/human}* （尽管美景就在眼前...）',
            "<32>{#p/human}* （...你总觉得空荡荡的。）\n  （好像缺了什么。）"
        ],
        balcony0: ['<25>{#p/kidd}{#f/3}* 哦，是你呀，Frisk...', '<25>{#f/1}* 我还担心你醒不过来呢！'],
        balcony1: () => [
            '<25>{#p/kidd}{#f/3}* ...哈哈。',
            ...(SAVE.data.b.ufokinwotm8
                ? ["<25>{#f/2}* 我做梦都没想到，\n  自己...", '<25>{#f/4}* ...也...']
                : [
                    "<25>{#f/2}* 我做梦都没想到，\n  自己也有了家！",
                    '<25>{#f/7}* 而且还是Asgore当爹？！',
                    '<25>{#f/1}* 一会，别的孩子也要过来\n  找咱俩玩呢...',
                    "<25>{#f/1}* 能经常开派对，一起玩啦！"
                ])
        ],
        balcony2: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/kidd}{#f/4}* 呃... 你还好吗？',
                    "<25>{#f/8}* 伙计，我有点担心你...",
                    '<25>{#f/7}* 遇到了不开心的事吗？'
                ]
                : [
                    '<25>{#p/kidd}{#f/1}* 天哪！光从图书倌的书里\n  看到那些照片，\n  我就觉得超酷...',
                    '<25>{#p/kidd}{#f/7}* 今天，居然亲眼见到了！\n* 简直酷！毙！了！',
                    
                    '<25>{#f/2}* 要是咱俩想好好把这颗星球\n  探索一番...',
                    "<25>{#f/1}* 永远，永远都探索不完！"
                ],
        balcony3: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    "<25>{#p/kidd}{#f/4}* （别这样啊，\n  我真的好担心。）",
                    '<25>{#f/7}* Frisk，别这样啊！',
                    '<25>{#f/7}* 求求你给点反应，\n  说句话啊！',
                    "<25>{#f/8}* 是不是我的错...\n  我也没做什么啊..."
                ]
                : ["<25>{#p/kidd}{#f/2}* 你是不是也可兴奋了？", '<25>{#f/1}* 有好多好多事情，\n  等着咱俩一起做呢！'],
        balcony0a: ['<25>{#p/kidd}{#f/1}* 原来，行星上的生活\n  是这样的啊！\n* 真是超赞！'],
        balcony1a: [
            '<25>{#p/asriel1}{#f/10}* 哦？\n* 你觉得眼前这点东西\n  就是这颗星球的全貌？',
            '<25>{#f/20}* 嘿嘿，你看到的\n  只是冰山一角哦...',
            "<25>{#f/17}* 穿过这片森林，\n  你就能看到一座巍峨的大山...",
            '<25>{#f/17}* 山的后面，是一片湖泊。'
        ],
        balcony2a: [
            '<25>{#p/kidd}{#f/2}* 湖里装的，肯定是\n  好多好多红红的黏液...',
            '<25>{#f/1}* 又恶心，又酷！'
        ],
        balcony3a: ['<25>{#p/asriel1}{#f/1}* ...你敢去那里游泳吗？'],
        balcony4a: ['<25>{#p/kidd}{#f/7}* ...', '<25>{#f/13}* 当然敢！\n* 但你得陪我一起去。'],
        balcony5a: [
            '<25>{#p/asriel1}{#f/21}* 呃... 要不...',
            "<25>{#f/20}* 咱俩还是到沙丘那边\n  玩赛车吧。"
        ],
        balcony6a: ["<25>{#p/kidd}{#f/6}* 嘿嘿，是不是我一说\n  那些黏液，就怕了啊？"],
        balcony7a: [
            '<25>{#p/asriel1}{#f/8}* ...呃，我才不怕呢，\n  你个蠢货，我-',
            '<25>{#p/kidd}{#f/8}* ...',
            "<25>{#p/asriel1}{#f/25}* ...不不不！\n* 我没那-那个意思..."
        ],
        balcony8a: ['<25>{#p/kidd}{#f/4}* Asriel...？', '<25>{#p/kidd}{#f/4}* 你还好吗？'],
        balcony9a: [
            '<25>{#p/asriel1}{#f/13}* ...我-我...',
            "<25>{#f/22}* 我啥都没说，\n  我没想责备你..."
        ],
        balcony10a: [
            "<25>{#p/asriel1}{#f/21}* ...请你原谅我，好吗...",
            "<25>{#f/23}* 你是个很棒的怪物小孩。",
            "<25>{#p/kidd}{#f/1}* 我的名字就是“怪物小孩”！"
        ],
        balcony11a: [
            '<25>{#p/kidd}{#f/4}* 哦对了，你刚刚说啥了？\n  我没注意。',
            '<25>{#p/asriel1}{#f/13}* ...',
            '<25>{#f/13}* ...这里有不少沙丘，\n  不过“管状地貌带”\n  也是不错的赛车场地。'
        ],
        balcony12a: ['<25>{#p/kidd}{#f/7}* 管状地貌带？？\n* 那是啥玩意？'],
        balcony13a: [
            "<25>{#p/asriel1}{#f/10}* 呃...\n* 你没看星球的地质分析报告吗？",
            "<25>{#p/kidd}{#f/1}* “地质分析报告”又是个啥？",
            '<25>{#p/asriel1}{#f/15}* ...',
            '<25>{#f/15}* 管状地貌带，说白了就是\n  一片外形像许多管道的区域。',
            '<26>{#f/17}* 大型“管道”形成了悬崖，\n  中型“管道”堆积成丘陵，\n  而小型“管道”...',
            "<25>{#f/20}* 我也不知道能形成啥。",
            '<25>{#p/kidd}{#f/1}* 哦！\n* 我说怎么叫“管状地貌带”呢！'
        ],
        balcony14a: [
            "<25>{#p/kidd}{#f/1}* 你觉得茫茫宇宙，\n  有没有像我们这样的星球？",
            '<25>{#f/2}* 我们有机会探索它们吗？',
            '<25>{#p/asriel1}{#f/10}* 嗯...\n* 肯定有的...'
        ],
        balcony15a: () => [
            '<25>{#p/kidd}{#f/7}* 哇... 那赶紧组建一支\n  星际探险小分队吧！\n* 朝着星辰大海，进发！',
            '<25>{#p/asriel1}{#f/27}* ...哦。',
            "<25>{#p/kidd}{#f/6}* 我们先把这里探索个遍，\n  能去的地方都去个遍...",
            "<26>{#p/kidd}{#f/1}* 随后，开始星际探险，\n  每到一个地方，记录一下，\n  最终做出一张超大的星系地图！",
            ...(SAVE.data.b.c_state_secret2_used
                ? ["<26>{#p/kidd}{#f/13}* 而且，还得搞个交流暗号。\n* 比如... Gerson式握手！"]
                : []),
            ...(SAVE.data.b.c_state_secret3_used
                ? [
                    ...(SAVE.data.b.c_state_secret2_used
                        ? ["<25>{#p/asriel1}{#f/13}* 要是运气好，咱们还能\n  碰到其他星系的种族，\n  一同合作呢。"]
                        : ["<25>{#p/asriel1}{#f/13}* 要是运气好，咱们还能\n  探索其他星系，\n  把它们的地图也画出来呢。"]),
                    "<25>{#f/13}* Alphys博士虫洞跃迁装置\n  还能助我们一臂之力。",
                    "<25>{#f/17}* 这样，就不仅是星际航行，\n  而是星系航行了。"
                ]
                : [
                    '<25>{#p/asriel1}{#f/17}* 哇，不过，呃...\n* 小子，你先冷静一下。',
                    ...(SAVE.data.b.c_state_secret2_used
                        ? [
                            '<25>{#p/asriel1}{#f/17}* 搞点握手暗号，星际探索...\n  这些固然很酷。',
                            '<25>{#f/13}* 但再往外探索，还是算了...'
                        ]
                        : []),
                    '<26>{#f/13}* 咱们花了这么久才到这里，\n  要是再去别的地方，\n  那真得猴年马月了。'
                ])
        ],
        balcony16a: () =>
            SAVE.data.b.c_state_secret3_used
                ? ["<26>{#p/kidd}{#f/14}* 对啊！\n* 以后，一定要来一次\n  跨越星系的大冒险！"]
                : ['<25>{#p/kidd}{#f/3}* 哈哈，也是。\n* 但探索一下，也不赖！'],
        balcony17a: [
            '<25>{#p/asriel1}{#f/17}* 星际探险小分队\n  目前只有咱们俩吗？',
            '<25>{#p/kidd}{#f/1}* 是啊，伙计。\n* 我们是三人小队！'
        ],
        balcony18a1: ['<32>{#p/basic}* ...嘿，我们三人小队\n  其实有四个！'],
        balcony18a2: ['<25>{#p/asriel1}{#f/25}* ...！', "<25>{#f/25}* $(name)... 你..."],
        balcony19a1: ['<32>{#p/basic}* ...等等，你-也-能听到我说话了？'],
        balcony19a2: [
            "<32>{#p/basic}* 之前，我也想和你说话...\n  试了好多次，可就是不行。",
            '<32>* 到底是什么变了呢...'
        ],
        balcony20a: ["<25>{#p/kidd}{#f/6}* 哈哈。\n* Asriel的朋友也是我的朋友。"],
        balcony21a: ['<32>{#p/basic}* 等等，你-也能-听到我说话？'],
        balcony22a: ["<25>{#p/kidd}{#f/1}* 这么个大活人站在旁边，\n  想看不见都难呢。"],
        balcony23a1: ['<32>{#p/basic}* 你还能看见我？！'],
        balcony23a2: ['<32>{#p/basic}* 哦... 天哪...'],
        balcony24a: ["<33>{#p/basic}* Asriel，我在这站了这么久，\n  你为啥一直没看见？\n* 我也没跟你玩躲猫猫啊！"],
        balcony25a: ['<26>{#p/asriel1}{#f/23}* ...$(name)，我...'],
        balcony26a1: [
            "<32>{#p/basic}* 没关系的，Asriel。\n* 别自责，别难过。",
            '<32>* 要是想哭... 就哭吧。',
            
        ],
        balcony26a2: [
            "<32>{#p/basic}* 之前我的体内\n  多了个Asriel的灵魂，\n  这颗灵魂导致我无法显形...",
            '<32>* 那时在前哨站，\n  当我终于显形成功后，\n  那颗灵魂很快就脱离身体了...',
            
            "<32>* ...所以，现在我应该不会消失了。",
            "<32>* 说实话，心中还是有点\n  五味杂陈。"
        ],
        balcony27a: ['<25>{#p/kidd}{#f/7}* 等等，你也是人类吗？'],
        balcony28a: [
            '<32>{#p/basic}* 是说我吗？',
            '<33>* 我是个幽{@fill=#ff0}灵{@fill=#fff}，{@fill=#ff0}样{@fill=#fff}子是人类，\n  {@fill=#ff0}羚羊{@fill=#fff}兄弟有了我，开开心心，\n  也祝这位被{@fill=#ff0}领养{@fill=#fff}的小孩开开心心。',
'<32>* 懂了吧？'
        ],
        balcony29a: ['<25>{#p/kidd}{#f/14}* ...Asriel是你的兄弟？！', '<25>{#p/kidd}{#f/4}* 信息量太大，有点接受不了...'],
        balcony30a: ["<25>{#p/kidd}{#f/1}* 反正你俩是啥关系，\n  都超酷的！"],
        balcony31a: ["<32>{#p/basic}* 太对了，我超酷的。\n* 这片大陆最酷的人类幽灵，\n  非我莫属。"],
        balcony32a: [
            "<25>{#p/asriel1}{#f/15}* $(name)，整片大陆\n  就你一个人类幽灵啊，\n  那你肯定是第一。",
            '<25>{#f/17}* 整个星球，\n  也是就你一个人类幽灵。',
            '<25>{#f/20}* 整个星系，也是如此。',
            "<25>{#f/13}* 未来，也是如此。\n* 我不会吸收Frisk的灵魂。",
            '<25>{#f/15}* 然后，这位人类幽灵“死了”，\n  结果过了一百年，又见面了...',
            '<25>{#f/17}* 巴拉巴拉巴拉巴拉...\n* 还没考虑那些特殊的情况。'
        ],
        balcony33a: [
            "<32>{#p/basic}* 噗。\n* Asriel，你真逗。",
            "<32>* 就算整个世界只有我一个\n  人类幽灵，我也是“最酷”的幽灵。",
            '<32>* 不信，你问那个超酷的骷髅。'
        ],
        balcony34a1: [
            '<25>{#p/kidd}{#f/2}* 你叫“$(name)”，对吧？',
            "<25>{#f/1}* 这名字真好听。",
            '<25>{#p/kidd}{#f/6}* 我叫怪物小孩。'
        ],
        balcony34a2: ['<25>{#p/asriel1}{#f/15}* ...你刚刚...', '<33>{#p/basic}* 是的，Asriel。\n  怪物小孩刚刚说的，\n  就是那两句话。'],
        balcony35a1: [
            '<25>{#p/asriel1}{#f/10}* 看来我没听错...',
            '<25>{#p/kidd}{#f/4}* 怎么了？\n* 是我说错话了吗？还是...',
            "<33>{#p/basic}* 不，不，别担心。\n* 只是刚刚那两句话...\n  让我想起了一段回忆。",
            '<25>{#p/kidd}{#f/1}* 是这样啊。\n* 希望让你想起的\n  是幸福的回忆。'
        ],
        balcony35a2: ['<25>{#p/asriel1}{#f/23}* ...是的。'],
        balcony36a: [
            '<25>{#p/kidd}{#f/3}* 嘿，伙计们...\n* 谢谢你们在这里陪我。',
            '<25>{#f/1}* 有了你们这些朋友，\n  生活就充满了幸福！'
        ],
        balcony37a: [
            '<33>{#p/basic}* ...嘿嘿。\n* 如果咱们只是普通朋友，\n  那其实说不准。',
'<32>* 但我们并不只是“朋友”。',
            '<25>{#p/kidd}{#f/7}* ...？'
        ],
        balcony38a: ["<25>{#p/asriel1}{#f/17}* 还是亲人。"],
        balcony39a: [
            '<25>{*}{#p/kidd}{#f/1}* 哦！\n* 我懂了！\n* 我们是亲人，是不是就可以- {%}',
            '<25>{*}{#f/1}* 一起吃饭一起讲故事\n  每天散步每天一起玩\n  去公园去雪山去沙丘去森林- {%}',
            '<25>{*}{#p/asriel1}{#f/20}* 是啊，是啊，那肯定的- {%}',
            "<25>{*}{#p/kidd}{#f/1}* 我们还可以去别人家过夜\n  做各种好玩的事- {^999}"
        ],
        trivia: {
            bed: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ["<25>{#p/asriel1}{#f/20}* 这床单到底几年没洗了..."]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （你用手抚过床单，\n  然后在上面发现了伤痕，\n  还有眼泪。）'
                            : '<33>{#p/basic}* 这张床虽然做工精良，\n  但被谁躺过许多次的痕迹\n  仍然清晰可见。',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* 躺上去肯定很舒服！'] : [])
                    ],
            plushie: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/20}* 这里的主人\n  肯定很喜欢毛绒玩偶。']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （玩偶很柔软，\n  但你根本提不起一点兴趣。）'
                            : "<32>{#p/basic}* 看来我不是唯一一个\n  喜欢软软的东西的人。",
                        ...(kiddo ? ['<25>{#p/kidd}{#f/3}* 哇，可爱捏。'] : [])
                    ],
            computer: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? [
                        '<25>{#p/asriel1}{#f/15}* 以前，我下定决心\n  一定要把编程学会...',
                        '<25>{#p/asriel1}{#f/16}* ...但现在，\n  感觉反倒是这些码农\n  该重新考虑一下人生了。'
                    ]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （你思考着，\n  是不是因为这些鬼画符，\n  才害得自己这么心烦。）'
                            : '<32>{#p/basic}* 等宽字体填满了整个屏幕。\n  正文旁边，是颜色修饰代码。',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* 这玩意得有好几百年了吧？'] : [])
                    ],
            flowers: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/10}* 哎？\n  这花是什么品种的呢？']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* （你不住思考这些花的来历。）'
                            : '<32>{#p/basic}* 花，象征着多愁善感。',
                        ...(kiddo ? ["<25>{#p/kidd}{#f/1}* 我好像从没见过这样的花..."] : [])
                    ],
            x_window: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （一想到今天的事，\n  你的心里五味杂陈。）"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* （你心想，\n  今天真是个好日子。）"] : []),
                        "<32>{#p/basic}* 美好的一天开始了！"
                    ],
            x_cab: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （柜子里塞满了衣服，\n  你对这些衣服毫无兴趣。）"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* （柜子里塞满了喜欢的衣服。）"] : []),
                        '<32>{#p/basic}* 里面的衣服真的多啊。'
                    ],
            x_bed: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （一张床。）\n* （你想倒头就睡，\n  就不用去想那些事了。）"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ["<32>{#p/human}* （一张舒适的床。）\n* （昨晚，你睡得很香。）"]
                            : []),
                        "<32>{#p/basic}* 这床是专门为你全新定制的。"
                    ],
            x_lamp: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （一盏台灯。）\n* （高度正好，你刚好够得到。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 这灯矮得出奇。"])
            ],
            x_toybox: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （都是些无聊透顶的玩具。）\n  （比前哨站那些玩具还无聊。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （这些玩具总算有点意思了。）']
                            : []),
                        "<32>{#p/basic}* 这些玩具真挺好玩的..."
                    ],
            x_wash: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你没有洗手，\n  只是呆呆地望着排水口。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你的手干净得很，\n  不用再洗了。）']
                            : ['<32>{#p/human}* （你在想，要是能把手\n  洗得再干净点就好了。）']),
                        "<32>{#p/basic}* 一个水池而已。\n* 别在它上面浪费太多时间。"
                    ],
            x_toilet: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你看都不看一眼。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你抬起了马桶盖。）\n* （你放下了马桶盖。）']
                            : []),
                        ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 一个马桶而已，有啥好看的。"])
                    ],
            x_bathrub: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你觉得，洗个热水澡，\n  心情可能就好点了。）']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* （你想再洗个热水澡。）'] : []),
                        '<32>{#p/basic}* 房间里的每样东西\n  尺寸都正正好好的哎...'
                    ],
            x_mirror: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你注视着镜中的自己，\n  不住回想起一路上发生的事。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 无论发生什么，\n  你，永远是你。"])
            ],
            x_sign1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （牌子上写着：\n  “教你适应新星球生活”。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<33>{#p/basic}* 牌子上写着一段指南，\n  一共五条，都是教你\n  怎么适应新生活。',
'<32>* 说来说去，就是一句话：\n  “放开了玩。”'
                    ])
            ],
            x_sign2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （牌子上列着待办任务清单。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<33>{#p/basic}* 上面列了一堆待办，\n  都是关于建设新社区的工作。"])
            ],
            x_plant: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你轻轻抚摸着植物，叹了口气。）\n* （它好像读懂了你的心思，\n  也不住叹息。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你轻轻抚摸着植物，露出微笑。）\n* （它好像读懂了你的心思，\n  也回以微笑。）']
                            : []),
                        '<32>{#p/basic}* 这株植物见到你很开心！\n* 永远都是如此。'
                    ],
            x_desk: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你呆呆地望着空白的日记，\n  想把自己的故事写下来，\n  可是这本日记不属于你。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你望着空白的日记，\n  脑中不住猜想\n  日记的主人会写些什么。）'
                            ]
                            : []),
                        "<32>{#p/basic}* 一本日记，\n  里面啥都没写。",
                        "<32>{#p/basic}* Asgore写日记时\n  最喜欢坐的那把椅子\n  肯定还没从运输船上搬过来。"
                    ],
            x_paperwork: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你不禁在想，上面列出的东西\n  有没有你的。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* 这些清单上列的\n  都是还没搬过来的东西。'])
            ],
            x_trash: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （你看不出来垃圾桶里有什么...）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<32>{#p/basic}* 垃圾桶里有一张\n  被揉皱的星花茶配方...\n* 这不是他的垃圾桶啊..."])
            ],
            x_bed_large: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （对你来说，这床还是太大了。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 大床永远是大床。"])
            ],
            x_cactus: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你戳了一下仙人掌。）\n* （它把你戳伤了。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你戳了一下仙人掌。）\n* （结果把仙人掌戳心动了。）'
                            ]
                            : []),
                        '<32>{#p/basic}* 即使是仙人掌，\n  也能变得外向...'
                    ],
            x_booktable: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （可你根本提不起心情读日记。）"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （这是怪物小孩的日记。）']
                            : ["<32>{#p/basic}* 这是怪物小孩的日记，\n  上面布满了小小的咬痕。"]),
                        '<32>{#p/human}* （日记只写了一篇，\n  你读了读内容...）',
                        '<32>{#p/kidding}* “Asgore现在成我爹啦！”\n* “总觉得有点怪怪的，\n   但也超级棒！”',
                        '<32>{#p/kidding}* “Asgore说，我得换一身新衣服，\n   一会我就去换吧。”',
                        '<32>{#p/kidding}* “他还给了我一本日记，\n   让我记录一下生活。”',
                        '<32>{#p/kidding}* “写日记可难不倒我，\n   我认识的字可多了！”',
                        '<32>{#p/kidding}* “要是我那里写了错别字，\n  还有Frisk帮我纠正呢！”',
                        '<32>{#p/kidding}* “Frisk，看完后\n  别忘了给我圈一下\n  错别字哦。”',
                        '<32>{#p/human}* （你合上了日记。）'
                    ],
            x_bed_left: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （你掀开床单，检查了一下。）\n  （确保不会睡着睡着床塌了。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 这是怪物小孩的床。"])
            ],
            x_knickknacks: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你把小玩具重新摆了一遍，\n  打发时间。）\n* （你希望没人发现。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* 上面摆满了各种玩具，\n  还有小饰品！"])
            ],
            x_bed_right: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* （你拍了拍玩偶。）\n* （不知是不是错觉，\n  有你拍它，它好像更开心了。）',
                        "<32>{#p/basic}* 这是Asriel的床。\n* 他根本就没在上面睡过。"
                    ]
                    : [],
            x_bookshelf: (() => {
                const pages = pager.create(
                    1,
                    [
                        '<32>{#p/basic}* 《欧律比亚地质勘探》\n* “皇家科学部（RSD）著。”',
                        '<32>* “对地表的初步扫描\n  揭示了该星球生态系统\n  具有极大的多样性。”',
                        '<32>* “本报告的每个章节\n  将聚焦于某一特定生物群落。”',
                        '<32>* “以下为目录。”',
                        '<32>* “第001节 - 地下群落”\n* “第002节 - 海洋群落”\n* “第003节 - 结构性群落”',
                        '<32>* “第004节 - 电磁群落”\n* “第005节 - 空中群落”\n* “第006节 - 森林群落”',
                        '<32>* “第007节 - 螺旋性群落”\n* “第008节 - 金属群落”\n* “第009节 - 水晶群落”',
                        "<32>* 天哪，这得有多少啊？\n* 咱们到此为止吧。"
                    ],
                    [
                        '<32>{#p/basic}* “哈喽，热爱园艺的朋友们！”',
                        '<32>* “说到星花，\n  它们生长与否的关键...”',
                        '<32>* “在于能否直接接触到\n  宇宙射线。”',
                        '<32>* “这就是它们主要生长在\n  空境的原因...”',
                        '<32>* “然而，欧律比亚最适合种植\n  它们的地方仍然是未知的。”',
                        '<32>* “目前建议\n  将它们种植在轨道上。”',
                        '<32>* “五号太空站将于\n  克历615年2月完成部署。”',
                        '<32>* “太空站部署完毕前，\n  可考虑将其存储在航天器内。”'
                    ],
                    [
                        '<32>{#p/basic}* “一开始，兔兔没有依靠。”',
                        '<32>* “突然间... 人类凭空出现。”',
                        '<32>* “兔兔要抱抱，人类要抱抱。\n   兔兔给人类软软的拥抱；\n   人类给兔兔大大的拥抱。”',
                        '<32>* “突然，灾难降临了！”\n* “兔兔突然不能跟人类抱抱，\n   人类突然不能跟兔兔抱抱。”',
                        '<32>* “天哪！”\n* “兔兔的三观碎了，\n   人类的三观碎了。”',
                        '<32>* “日复一日，年复一年。”\n* “人类绞尽脑汁，寻找办法。”',
                        '<32>* “他夜以继日地工作。”\n* “一切只为了——\n   能再抱抱他的兔兔。”',
                        '<32>* “终于啊...”\n* “人类干完了工作，\n   兔兔等来了人类。”',
                        '<32>* “人类张开双臂，\n   等待着他的兔兔...”',
                        '<32>* “兔兔以迅雷不及掩耳之势，\n   扑进了人类的怀里！”',
                        '<32>* “人类爱软软的兔兔，\n   兔兔爱大大的人类，\n   他们幸福地生活在一起。”'
                    ],
                    () =>
                        SAVE.data.b.c_state_secret3_used
                            ? [
                                '<32>{#p/basic}* “虫洞实验报告！”\n* “收件人：Asgore。”\n* “发件人：Alphys。”',
                                '<32>* “虫洞实验进展一切顺利！”',
                                '<32>* “多亏了Frisk，有了教授留下的\n   完整方程式，进展一直不错。”',
                                '<32>* “现在，甚至已经可以用虫洞\n  转移小物体了...”',
                                '<32>* “在下次实验中，计划用虫洞\n  发送一台带约束的扫描仪，\n  期待到时候的采集结果。”',
                                '<32>* “用于星际旅行的人工虫洞\n  有望在克历616年5月建成！”'
                            ]
                            : [
                                '<32>{#p/basic}* “虫洞实验报告。”\n* “收件人：Asgore。”\n* “发件人：Alphys。”',
                                '<32>* “虫洞实验遇到了瓶颈。”',
                                '<32>* “教授留下的方程式不完整。\n   靠着这样的方程，\n   无法让系统正常运行。”',
                                '<32>* “我会再尝试一下。\n   但不宜操之过急，\n   否则会有生命危险。”',
                                '<32>* “下次实验，我试试看\n   能不能让虫洞维持地久一些。”',
                                '<32>* “短期内，无法将虫洞\n   用于星际航行。”'
                            ],
                    [
                        '<32>{#p/basic}* “这是一封来自‘胜利号’运输船的\n   活动邀请函！”',
                        '<32>* “从船首到船尾，\n   各种活动：悬浮车竞赛、舞会...\n   应有尽有！”',
                        '<32>* “等我们抵达新家园时，\n   将在船尾休息室举办压轴好戏！”',
                        '<32>* “活动精彩，不容错过！\n   快来一起尽情狂欢吧！”',
                        '<32>* “请注意：抵达新家园后，\n   活动邀请函将失效。”',
                        '<32>* “期待您的到来！”'
                    ],
                    [
                        '<32>{#p/basic}* “Toriel的毛发护理小贴士，\n   克历614年9月。”',
                        '<32>* “进行脱毛时，脱掉的毛发\n   一定要妥善处理。”',
                        '<32>* “大部分人会将毛扔到垃圾桶，\n   但我个人更喜欢塞进水槽。”',
                        '<32>* “如果您需要经常脱毛，\n   建议购买支持垃圾回收的水槽。”',
                        '<32>* “现在说说毛发柔软度的问题。\n   睡姿会明显影响毛发的柔软度。”',
                        '<32>* “如果希望头部或身体\n   拥有柔顺的毛发，\n   请选择侧卧。”',
                        '<32>* “如果希望四肢\n   拥有柔顺的毛发，\n   请选择仰卧。”',
                        '<32>* “以上就是全部心得了。”\n* “感谢您能读到这里。”'
                    ]
                );
                return () =>
                    SAVE.data.b.ufokinwotm8
                        ? ["<32>{#p/human}* （可你根本没心情看书。）"]
                        : [
                            ...(SAVE.data.b.svr
                                ? [
                                    '<32>{#p/human}* （书架上的书似乎能\n  根据阅读者的需求\n  自动生成里面的内容。）'
                                ]
                                : [
                                    '<32>{#p/basic}* 这些书乍一看都是空白的，\n  但你选好书，\n  里面就会自动生成内容。'
                                ]),
                            "<32>{#p/human}* （你在控制面板上选了一本“书”，\n  待它生成完内容之后，\n  你把它拿了出来，开始阅读...）",
                            ...pages(),
                            '<32>{#p/human}* （你把书放回了书架。）'
                        ];
            })(),
            x_endtable: () =>
                SAVE.data.b.ufokinwotm8
                    ? [
                        SAVE.data.b.water
                            ? '<32>{#p/human}* （你呆呆望着床头柜，\n  还有上面的杯子。）\n* （它似乎很不安。）'
                            : '<32>{#p/human}* （你呆呆望着床头柜。）\n* （它似乎很不安。）'
                    ]
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                SAVE.data.b.water
                                    ? '<32>{#p/human}* （你呆呆望着床头柜，\n  还有上面的杯子。）\n* （它好像也很开心。）'
                                    : '<32>{#p/human}* （你呆呆望着床头柜。）\n* （它好像也很开心。）'
                            ]
                            : []),
                        '<32>{#p/basic}* 终于... \n  见到了一个迷人的床头柜。',
                        ...(SAVE.data.b.water
                            ? [
                                '<33>{#p/basic}* 上面居然还有一杯电解液。\n  真是个尽职尽责的小杯子。'
                            ]
                            : [])
                    ],
            x_chasgore: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ['<32>{#p/human}* （椅子的位置完全正确。）']
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ['<32>{#p/human}* （椅子的位置基本正确。）']
                            : ['<32>{#p/human}* （椅子的位置并不正确。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* 这把椅子...\n  看书时坐着它肯定很舒服。', "<32>* Asgore怎么会坐这么小的椅子？"])
            ],
            x_window_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你向窗外望去，不禁思考：\n  自己到底做错了什么，\n  要受到这样的精神折磨。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你向窗外望去，\n  心中充满了对未来的期待。）'
                            ]
                            : []),
                        '<32>{#p/basic}* 有了窗，“外面”才更加真实。'
                    ],
            x_window_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你向窗外望去，不禁思考：\n  为什么做了那么多，\n  还是落得这样的下场。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* （你向窗外望去，\n  想到自己为了到达这里，\n  等待了多久。）"
                            ]
                            : []),
                        '<32>{#p/basic}* 有了窗，“里面”才更加真实。'
                    ],
            x_plant_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你轻轻碰了碰植物。）\n* （它也明白你的痛苦。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你轻轻碰了碰植物。）\n* （它轻轻晃了晃，\n  发现你也在这，它很高兴。）'
                            ]
                            : []),
                        '<33>{#p/basic}* 这植物懂得关心别人。'
                    ],
            x_plant_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你轻轻碰了碰植物。）\n* （它向你保证，一定能熬出头的。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你轻轻碰了碰植物。）\n* （它很感激你。）']
                            : []),
                        '<32>{#p/basic}* 这植物非常积极乐观。'
                    ],
            x_sign3: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （上面什么都没有。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        "<32>{#p/basic}* 这是一个数字相框。\n* 只要有美好的回忆，\n  它就可以将其展现出来，让你看到。"
                    ])
            ],
            x_chair1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你发现这把餐椅相当大。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，是母亲的餐椅。"]
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，仍是“王后”的餐椅。"]
                            : ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，不属于任何人。"])
            ],
            x_chair2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你发现这把餐椅挺小的。）']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，是兄弟的餐椅。"]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，不属于任何人。"])
            ],
            x_chair3: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （这把餐椅的主人，\n  真的还是一个小天使吗？）\n* （你不知道。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* （你发现这把餐椅大小刚刚好。）',
                                "<32>{#p/basic}* 这把餐椅的主人是你哦，Frisk。"
                            ]
                            : ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，是小孩的餐椅。"])
                    ],
            x_chair4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你发现这把餐椅稍稍有点小。）']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，是某个亲人的餐椅。"]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : SAVE.data.b.f_state_kidd_betray
                            ? ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，不属于任何人。"]
                            : ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，是某只怪物的餐椅。"])
            ],
            x_chair5: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你发现这把餐椅大得离谱。）']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，是父亲的餐椅。"]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* Asgore家有几把餐椅，\n  这把，仍是“国王”的餐椅。"])
            ],
            x_fridge: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你把手放在了冰箱外壳上。）\n* （它发出了刺耳的呻吟声。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你把手放在了冰箱外壳上。）\n* （它发出了温和的咕噜声。）']
                            : []),
                        ...[
                            ['<32>{#p/basic}* 冰箱里几乎是空的，\n  里面只有一杯\n  Undyne给你留的白开水。'],
                            [
                                '<32>{#p/basic}* 冰箱里几乎是空的，\n  里面只有一瓶\n  Undyne给你留的洋梅果酒。'
                            ],
                            [
                                '<32>{#p/basic}* 冰箱里几乎是空的，\n  里面只有一杯Undyne\n  给你留的“热”巧克力。',
                                "<32>* ...热得都结冰了。"
                            ],
                            [
                                '<32>{#p/basic}* 冰箱里几乎是空的，\n  里面只有一杯\n  Undyne给你留的星花茶。',
                                "<32>* ...热得都结冰了。"
                            ]
                        ][SAVE.data.n.undyne_drink]
                    ],
            x_sink: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* （水槽里干净得出奇。）"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* 没有羊毛，没有头发...\n* 真是科技与狠活。'])
            ],
            x_drawer: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你打开了抽屉，里面有一只狗狗。）\n* （你摸了摸它，好让自己开心一点。）']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* （你打开了抽屉，里面有一只狗狗。）\n* （你朝它挥了挥手。）'] : []),
                        '<32>{#p/basic}* 抽屉里，有只狗...\n* 千万别让Papyrus知道这事。'
                    ],
            x_stove: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （你不禁想：\n  这炉子会不会也走火，\n  把房子烧了。）']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* （你不禁想，\n  这炉子能做出多少\n  美味佳肴。）']
                            : []),
                        "<32>{#p/basic}* 这炉子的型号\n  跟Undyne家那个一模一样...",
                        '<32>* 但愿这个炉子加装了\n  防走火的安全措施。'
                    ],
            x_sign4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* （牌子上写着一个食谱。）']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<32>{#p/basic}* 图卡日神羹，\n  一种为新世界而生的新汤点。',
                        '<32>* 在锅中将香肠煎至焦黄，\n  加入适量辣椒碎。',
                        '<32>* 加入原汤少许，煮至沸腾。',
                        '<32>* 为获得最佳口感，\n  可使用火魔法。\n  不方便的话，充氧火焰即可。',
                        '<32>* 将一块欧律比亚土豆切丁，\n  倒入沸腾的锅中。',
                        '<32>* 待锅中开始闪闪发光，\n  向其中加入鲜奶油和棒棒鸡。',
                        '<32>* 现在，在兆藤上取乳液适量。\n  其他途径获取乳液也可考虑。',
                        '<32>* 此外，也可加入羽衣甘蓝或克蓝芥，\n  并高温烹煮至软。',
                        '<32>* 完成之后，您的汤品即可端上餐桌了！'
                    ])
            ]
        },
        moniker: [
            ['灵魂杀手', '灵魂杀手', '灵魂杀手', '灵魂杀手'],
            ['黄天霸主', '黄天霸主', '霸主', '黄天霸主'],
            ['风云剑客', '风云剑客', '剑客', '风云剑客'],
            ['狂怒剑皇', '狂怒剑皇', '剑皇', '狂怒剑皇'],
            ['星际游侠', '星际游侠', '游侠', '星际游侠']
        ] as [string, string, string, string][]
    },

    b_act: {
        kiss: '* 亲吻',
        activate: '* 激活',
        advice: '* 建议',
        agree: '* 认同',
        alphys: '* Alphys',
        analyze: '* 分析',
        annoy: '* 发火',
        appease: '* 呼吁',
        approach: '* 靠近',
        asgore: '* Asgore',
        asriel: '* Asriel',
        asrieldreemurr: '§fill=#ff7f7f§§swirl=2/1/1.05§§hue§* Asriel Dreemurr',
        bathe: '* 洗澡',
        beckon: '* 招呼过来',
        bedtime: '* 睡觉时间',
        berate: '* 斥责',
        blind: '* 闪瞎',
        boast: '* 自夸',
        boo: '* 喝倒彩',
        boost: '* 帮助',
        bow: '* 鞠躬',
        break: '* 破坏',
        burn: '* 挖苦',
        carry: '* 带走',
        challenge: '* 挑战',
        charge: '* 付钱',
        check: '* 查看',
        cheer: '* 鼓励',
        clean: '* 清洁',
        cocoa: '* 热巧',
        comfort: '* 安抚',
        compliment: '* 称赞',
        compose: '* 作曲',
        conclude: '* 总结',
        console: '* 安慰',
        counter: '* 反驳',
        create: '* 手搓天线',
        criticize: '* 批评',
        cuddle: '* 拥抱',
        cut: '* 剪线',
        dance: '* 跳舞',
        dream: '* 梦想',
        dinnertime: '* 晚餐时间',
        direct: '* 指导',
        disarm: '* 缴械',
        disown: '* 拔胡子',
        diss: '* 贬损',
        distance: '* 疏远',
        distract: '* 分心',
        ditch: '* 甩掉',
        dontpick: '* 不招惹',
        encourage: '* 鼓励',
        escort: '* 护送',
        flash: '* 闪光',
        flirt: '* 调情',
        grin: '* 微笑',
        guide: '* 引导',
        handshake: '* 握手',
        hangout: '* 消遣',
        heckle: '* 责难',
        heel: '* 翻脸',
        highfive: '* 击掌',
        home: '* 回家',
        hope: '* 希望',
        hug: '* 拥抱',
        hum: '* 哼唱',
        hypothesize: '* 做假设',
        ignore: '* 无视',
        inquire: '* 询问',
        insult: '* 辱骂',
        joke: '* 讲笑话',
        agreement: '* 协定',
        call: '* 电话',
        dinner: '* 晚餐',
        judgement: '* 审判',
        laugh: '* 大笑',
        lecture: '* 指责',
        leech: '* 吸血',
        lesson: '* 教学',
        mislead: '* 误导',
        mix: '* 混音',
        mystify: '* 迷惑',
        notes: '* 笔记',
        object: '* 拒绝',
        papyrus: '* Papyrus',
        password: '* 密码',
        pat: '* 轻拍',
        pay: '* 付钱',
        perch: '* 栖息',
        pet: '* 抚摸',
        pick: '* 招惹',
        play: '* 玩耍',
        playdead: '* 装死',
        plead: '* 求饶',
        pluck: '* 拔胡子',
        poke: '* 戳刺',
        pose: '* 摆姿势',
        praise: '* 称赞',
        promise: '* 许诺',
        punch: '* 果酒',
        puzzle: '* 谜题',
        puzzlehelp: '* 谜题求助',
        rap: '* 说唱',
        reassure: '* 安慰',
        release: '* 释放压力',
        resniff: '* 重新闻闻',
        rest: '* 休息',
        roll: '* 打滚',
        sample: '* 采样',
        sans: '* Sans',
        scream: '* 尖叫',
        secret: '* 秘密',
        shout: '* 喊叫',
        shove: '* 推搡',
        siphon: '* 偷取能量',
        sit: '* 坐上去',
        slap: '* 击打',
        smile: '* 微笑',
        someoneelse: '* 别的什么人',
        spark: '* 引燃',
        stare: '* 瞪眼',
        steal: '* 偷窃',
        storytime: '* 故事时间',
        suggest: '* 提议',
        talk: '* 交谈',
        taunt: '* 嘲讽',
        tea: '* 花茶',
        telloff: '* 批判',
        terrorize: '* 恐吓',
        test_a: '* 融合',
        test_b: '* 移植',
        test_c: '* 注入',
        threaten: '* 威胁',
        tickle: '* 轻抚',
        topple: '* 推倒',
        toriel: '* Toriel',
        translate: '* 翻译',
        travel: '* 靠近',
        trivia: '* 分享经验',
        tug: '* 拽下',
        turn: '* 骗他转身',
        undyne: '* Undyne',
        walk: '* 遛狗',
        water: '* 白开水',
        whisper: '* 耳语',
        whistle: '* 吹口哨',
        yell: '* 喊叫'
    },

    b_group_common: {
        nobody: () => (!world.genocide && world.bullied ? '* ...但是大家都逃走了。' : '* ...但是谁也没有来。')
    },

    b_opponent_dummy: {
        act_check: ["<32>{#p/story}* 训练人偶 - 攻击0 防御0\n* 壳中幽灵，祝君安宁。"],
        act_flirt: [
            '<32>{#p/human}* （你向人偶调情。）',
            "<32>{#p/basic}* 它的反应和你想的完全一样。",
            '<32>* Toriel强忍住不笑。'
        ],
        act_hug: ['<32>{#p/human}* （你抱了抱人偶。）'],
        act_slap: ['<32>{#p/human}* （你扇了人偶一巴掌。）'],
        act_talk: [
            '<32>{#p/human}* （你跟人偶聊了几句。）',
            "<32>{#p/basic}* 它好像不怎么健谈。",
            '<32>* Toriel看起来很高兴。'
        ],
        bored: ['<32>{#p/basic}* 人偶厌倦了你意味不明的把戏。'],
        hugged: ['<32>{#p/basic}* 人偶不知为何... 脸红了。'],
        name: '* 训练人偶',
        slapped: ['<32>{#p/basic}* 突然...！'],
        status1: ['<32>{#p/story}* 你遭遇了训练人偶。'],
        status2: ["<32>{#p/story}* 人偶看起来有些厌倦了。"],
        status3: ["<32>{#p/story}* 人偶呆在那，不知在想些啥。"],
        status4: ["<32>{#p/story}* 人偶差点要倒下了。"],
        talk: ['<09>{#p/basic}{#i/20}{~}.....{}']
    },
    b_opponent_maddummy: {
        epiphaNOPE1: ["<11>{#p/basic}{~}{#x3}咳，少来浪费\n我的时间！"],
        epiphaNOPE2: ['<08>{#p/basic}{~}好奇怪的\n感觉。'],
        act_check: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ["<32>{#p/story}* 开心人偶 - 攻击0 防御0\n* 它的梦想成真啦！"]
                : ['<32>{#p/story}* 愤怒人偶 - 攻击30 防御255\n* 免疫一切物理攻击。'],
        act_flirt: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* （你向开心人偶调情。）',
                    "<32>{#p/basic}* 它正沉浸在梦想成真的喜悦之中，\n  没听到你的话。"
                ]
                : ['<32>{#p/human}* （你向愤怒人偶调情。）', "<32>* 它的反应跟你想的完全一样。"],
        act_hug: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/human}* （你抱了抱开心人偶。）']
                : ['<32>{#p/human}* （你抱了抱愤怒人偶。）'],
        act_slap: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* （你扇了开心人偶一巴掌。）',
                    '<32>{#p/basic}* 开心人偶不敢再轻举妄动，\n  匆匆逃走了。'
                ]
                : ['<32>{#p/human}* （你扇了愤怒人偶一巴掌。）'],
        act_talk: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* （你想和开心人说说话。）',
                    "<32>{#p/basic}* 它正沉浸在梦想成真的喜悦之中，\n  没听到你的话。"
                ]
                : [
                    '<32>{#p/human}* （你跟愤怒人偶聊了几句。）',
                    "<32>* 它好像不怎么健谈。",
                    '<32>* 然而，现在没人\n  对你的行为感到高兴了。'
                ],
        boredTalk: [
            '<11>{#p/basic}{~}{#x3}搞什么？',
            '<11>{#p/basic}{~}{#x1}你就不做点啥？',
            '<11>{#p/basic}{~}{#x4}我对你来说\n是空气吗？？',
            '<11>{#p/basic}{~}{#x4}...',
            "<11>{#p/basic}{~}{#x4}我都没法\n对你发火！！！",
            "<11>{#p/basic}{~}{#x4}你纯粹\n就是在那...\n一动不动！",
            '<11>{#p/basic}{~}{#x4}你... 嘎啊！\n滚！快滚！',
            '<11>{#p/basic}{~}{#x4}麻溜点，陪\nNAPSTABLOOK\n听音乐去，或者\n干点别的都行！'
        ],
        changeStatus1: ['<32>{#p/story}* 愤怒人偶把棉花\n  弹得到处都是。'],
        changeStatus2: ['<32>{#p/story}* 机械噪声在房间中回响。'],
        fightFail: [
            '<11>{#p/basic}{~}{#x1}愚蠢。\n愚蠢！\n愚蠢！',
            '<11>{#p/basic}{~}{#x3}就算你打到了\n我的身体...',
            "<11>{#p/basic}{~}{#x4}...也伤不到我！",
            "<11>{#p/basic}{~}{#x1}我这不\n还是没有实体，\n你这棉花脑袋！！"
        ],
        final1: () => [
            "<11>{#p/napstablook}{~}对不起，\n打扰你们了，\n对吧...",
            '<11>{#p/napstablook}{~}我一过来，\n你的朋友就走了...',
            ...(SAVE.data.n.state_wastelands_napstablook === 2
                ? [
                    "<11>{#p/napstablook}{~}等等...\n你是不是\n打过我来着...",
                    "<11>{#p/napstablook}{~}呃呃...\n挺尴尬。",
                    '<11>{#p/napstablook}{~}抱歉...'
                ]
                : [
                    '<11>{#p/napstablook}{~}哦天啊...\n你们刚才好像\n玩得挺开心的...',
                    '<11>{#p/napstablook}{~}哦天啊...\n我只是想\n打个招呼...',
                    '<11>{#p/napstablook}{~}哦天啊......\n...........\n...........\n...........\n...........'
                ])
        ],
        gladTalk1: ['<08>{#p/basic}{~}谢啦！'],
        gladTalk2: ['<08>{#p/basic}{~}谢谢你！'],
        gladTalk3: ['<08>{#p/basic}{~}你真棒！'],
        gladTalk4: ['<08>{#p/basic}{~}真不错！'],
        gladTalk5: ['<08>{#p/basic}{~}好！'],
        gladTalk6: ['<08>{#p/basic}{~}...'],
        hugTalk1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<08>{#p/basic}{~}我的\n接触\n恐惧症...',
                    "<08>{#p/basic}{~}消失啦！",
                    '<08>{#p/basic}{~}人类...\n谢谢你...',
                    "<08>{#p/basic}{~}我从未\n感到\n如此幸福..."
                ]
                : SAVE.data.n.state_wastelands_dummy === 4
                    ? ['<11>{#p/basic}{~}{#x4}搞什么？\n不要啊！！']
                    : ['<11>{#p/basic}{~}{#x3}别-别..！\n我有\n接触\n恐惧症！'],
        hugTalk2: ['<11>{#p/basic}{~}{#x4}快停下！'],
        hugTalk3: ['<11>{#p/basic}{~}{#x2}少来这套！！'],
        hugTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        name: () => (16 <= SAVE.data.n.kills_wastelands ? '* 开心人偶' : '* 愤怒人偶'),
        phase2Talk1: ["<11>{#p/basic}{~}{#x1}看老子\n不弄死你，\n扯出你的灵魂！"],
        phase2Talk2: ["<11>{#p/basic}{~}{#x1}老子\n要拿你的灵魂\n灭了那力场！"],
        phase2Talk3: ['<11>{#p/basic}{~}{#x6}...我会受到\n万众爱戴，\n万人敬仰！'],
        phase2Talk4: ['<11>{#p/basic}{~}{#x4}到那时\n我要啥\n就有啥了！'],
        phase2Talk5: ["<11>{#p/basic}{~}{#x3}嗯？\n对，应该能\n顺带给我表亲\n报个仇。"],
        phase2Talk6: ['<11>{#p/basic}{~}{#x5}...我的表亲\n到底在不在乎呢？'],
        phase2Talk7: ['<11>{#p/basic}{~}{#x4}管他呢。\n管他呢。\n管-他-呢。'],
        phase2Talk8: ['<11>{#p/basic}{~}{#x1}...'],
        phase3Talk1: ['<11>{#p/basic}{~}{#x1}机器人偶！\n使用魔法飞弹！'],
        phase3Talk2: ['<11>{#p/basic}{~}{#x3}机器人偶！\n再来！'],
        phase3Talk3: ["<11>{#p/basic}{~}{#x5}机器人偶！\n咋这么\n没本事呢？？？"],
        phase3Talk4: ['<11>{#p/basic}{~}{#x4}机器人偶！\n最终攻击！'],
        phaseChange1: [
            '<11>{#p/basic}{~}{#x2}痛死了，\n你们这些\n棉花脑袋！！',
            '<11>{#p/basic}{~}{#x1}用{@fill=#f00}魔法{@fill=#000}的时候\n往哪瞄呢！',
            '<11>{#p/basic}{~}{#x4}...',
            '<11>{#p/basic}{~}{#x4}嘿！\n听着！',
            '<11>{#p/basic}{~}{#x3}“{@fill=#f00}魔法{@fill=#000}”那事，\n你就当没听见！'
        ],
        phaseChange2a: ['<11>{#p/basic}{~}{#x4}伙计们！'],
        phaseChange2b1: [
            '<11>{#p/basic}{~}{#x1}全是棉花脑袋。\n棉花脑袋！\n棉花脑袋！',
            '<11>{#p/basic}{~}{#x3}老子没说\n不要冲着我\n攻击吗？',
            '<11>{#p/basic}{~}{#x3}得得得...'
        ],
        phaseChange2b2: ["<11>{#p/basic}{~}{#x4}一帮饭桶！\n老子炒了你们！\n老子有更好的！"],
        phaseChange2c: [
            '<11>{#p/basic}{~}{#x4}哈哈哈。\n哈哈哈！\n哈-哈-哈！',
            "<11>{#p/basic}{~}{#x3}这就让你\n见识见识\n我的真本事...",
            "<11>{#p/basic}{~}{#x6}靠那些\n不是饭桶的\n伙计们！"
        ],
        phaseChange3a1: [
            '<11>{#p/basic}{~}{#x3}咋...\n咋可能呢！',
            '<11>{#p/basic}{~}{#x3}这些家伙\n比之前那些\n还菜！'
        ],
        phaseChange3a2: [
            '<11>{#p/basic}{~}{#x1}我不在乎。\n我不在乎！\n我-不-\n在-乎！',
            "<11>{#p/basic}{~}{#x4}老子才\n不需要朋友！！"
        ],
        phaseChange3b: ["<11>{#p/basic}{~}{#x6}我还有\n刀子呢！！"],
        phaseChange3c1: ["<11>{#p/basic}{~}{#x3}我...", '<11>{#p/basic}{~}{#x3}没刀子了。'],
        phaseChange3c2: [
            "<11>{#p/basic}{~}{#x4}没事！！！",
            "<11>{#p/basic}{~}{#x4}我伤不着你，\n你也伤不着我！",
            "<11>{#p/basic}{~}{#x1}我要你在这\n和我战斗..."
        ],
        phaseChange3c3: ['<11>{#p/basic}{~}{#x1}一辈子。'],
        phaseChange3c4: ['<11>{#p/basic}{~}{#x4}一辈子！'],
        phaseChange3c5: ['<11>{#p/basic}{~}{#x6}一-辈-子 ！！！！'],
        phaseChange3d: ['<11>{*}{#p/basic}{~}{#x6}啊哈哈哈哈\n哈哈哈哈哈\n哈哈哈哈哈\n哈哈哈哈哈\n哈哈哈哈哈{%}'],
        phaseChange3e: [
            '<11>{*}{#p/basic}{~}{#x2}什...\n这什么鬼！？{^20}{%}',
            '<11>{*}{#p/basic}{~}{#x6}呃啊！\n下酸雨了！？{^20}{%}',
            "<11>{*}{#p/basic}{~}{#x4}算了算了！\n我得开溜了！！{^20}{%}"
        ],
        randStatus1: ['<32>{#p/story}* 要是能找到气闸，\n  愤怒人偶就把你扔出去了。'],
        randStatus2: ['<32>{#p/story}* 愤怒人偶正使唤着它的弹幕。'],
        randStatus3: ['<32>{#p/story}* 愤怒人偶瞪着一个传送门，\n  转过头来又瞪着你。'],
        randStatus4: ['<32>{#p/story}* 愤怒人偶暴跳如雷。'],
        randStatus5: ['<32>{#p/story}* 有股纺织厂的味道。'],
        gladStatus1: ['<32>{#p/story}* 开心人偶很庆幸自己来了这里。'],
        gladStatus2: ["<32>{#p/story}* 开心人偶正规划着\n  今后的美好人生。"],
        gladStatus3: ['<32>{#p/story}* 开心人偶看起来很满足。'],
        randTalk1: ['<11>{#p/basic}{~}{#x1}愚蠢。\n愚蠢！\n愚蠢！'],
        randTalk2: ['<11>{#p/basic}{~}{#x1}没用。\n没用！\n没-用！'],
        randTalk3: ['<11>{#p/basic}{~}{#x1}可悲。\n可悲！\n可-悲！'],
        randTalk4: ['<11>{#p/basic}{~}{#x1}贫弱。\n贫弱！\n贫-弱！'],
        slapTalk1: ['<11>{#p/basic}{~}{#x6}好你个...！'],
        slapTalk2: ['<11>{#p/basic}{~}{#x4}你玩我呢？？'],
        slapTalk3: ['<11>{#p/basic}{~}{#x2}脏手拿远点！'],
        slapTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        status1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/story}* 开心人偶打算放你走。']
                : ['<32>{#p/story}* 愤怒人偶拦住了去路！']
    },
    b_opponent_moldsmal: {
        epiphany: [
            ['<08>{#p/basic}{~}\x00*黏液声*'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}咕噜！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}\x00*性感\n扭动*']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}\x00*开心\n扭动*']
                            : ['<08>{#p/basic}{~}\x00*臂中\n抖动*'],
            ['<08>{#p/basic}{~}最后一咕。'],
            ['<08>{#p/basic}{~}\x00*闪亮\n扭动*']
        ],
        act_check0: ['<32>{#p/asriel2}* Gelatini，没脑子的粘球。\n* 有什么好说的？'],
        act_check: ['<32>{#p/story}* GELATINI - 攻击6 防御0\n* 典型印象：身段妖娆气质好，\n  就是没大脑...'],
        act_check2: ["<32>{#p/story}* GELATINI - 攻击6 防御0\n* 应季的色彩令它更为迷人。"],
        act_check3: ['<32>{#p/story}* GELATINI - 攻击6 防御0\n* 与你所喜欢的类型相同。\n* 刻板印象的那种。'],
        act_check4: ['<32>{#p/story}* GELATINI - 攻击6 防御0\n* 这位超级模特早已辉煌不再。'],
        act_flirt: [
            '<32>{#p/human}* （你扭动着你的臀部。）\n* （Gelatini用扭动回应你。）',
            '<33>{#p/basic}* 真是有意义的交流！'
        ],
        act_imitate: [
            '<33>{#p/human}* （你轻轻地拍了拍Gelatini。）\n* （它的身体变色了。）',
            "<32>{#p/basic}* 这是Gelatini高兴时的颜色！"
        ],
        act_slap: [
            '<32>{#p/human}* （你使劲扇了Gelatini一巴掌。）',
            '<32>{#p/basic}* Gelatini身体发生凹陷，\n  但不久便恢复原形。'
        ],
        act_slap2: [
            '<32>{#p/human}* （你用尽全身力气，\n  狠狠扇了Gelatini一巴掌。）',
            '<32>{#p/basic}* Gelatini的根基被动摇了！'
        ],
        act_slap3: [
            '<32>{#p/human}* （你用尽全身力气，\n  狠狠扇了Gelatini一巴掌。）',
            '<32>{#p/basic}* Gelatini逃离了现场！'
        ],
        idleTalk1: ['<08>{#p/basic}{~}吐泡泡..'],
        idleTalk2: ['<08>{#p/basic}{~}挤挤..'],
        idleTalk3: ['<08>{#p/basic}{~}\x00*黏液声*'],
        name: '* Gelatini',
        perilStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* 这可不是什么好事..."]
                : ['<32>{#p/story}* Gelatini开始腐烂了。'],
        sexyChat: ['<08>{#p/basic}{~}\x00*性感\n扭动*'],
        status1: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini把身体挺成正方形。'] : ["<32>{#p/story}* 一对Gelatini跳了过来。"],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini。']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* 嘘... 它在思考！"]
                    : ['<32>{#p/story}* Gelatini静静地凝结着。'],
        status3: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini。'] : ['<32>{#p/story}* Gelatini乐观地等待着。'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini。']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* 这里一个泡泡，那里一个泡泡...']
                    : ['<32>{#p/story}* Gelatini正在沉思。'],
        status5: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini。']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* 你知道，\n  Gelatini到底是用什么做的吗？']
                    : ['<32>{#p/story}* 空气中飘来阵阵青柠果冻的清香。'],
        status6: ['<32>{#p/story}* 现在，只剩一个了。'],
        status8: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* 只剩我们仨啦！']
                : ['<32>{#p/story}* 这只Gelatini只能独自吐泡泡了。']
    },
    b_opponent_spacetop: {
        epiphany: [
            ['<08>{#p/basic}{~}我要去\n其他地方\n进行\n通讯了。'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}预警广播\n很受\n欢迎！']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}哦...\n我喜欢\n这种信号\n...']
                        : SAVE.data.b.oops
                            ? ["<08>{#p/basic}{~}我现在\n在你的\n信号\n波长内！"]
                            : ['<08>{#p/basic}{~}信号...\n紧贴在我\n身上...'],
            ["<08>{#p/basic}{~}我只是在\n浪费\n带宽..."],
            ["<08>{#p/basic}{~}我马上\n给你电汇\n付款！"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf，宇航员，渴望引人注目。\n* 除了自己的天线，他什么都不在乎。']
                : ["<32>{#p/story}* ASTRO SERF - 攻击11 防御4\n* 这个青年想知道自己为啥不叫\n  “收音劫克”。"],
        act_check2: ['<32>{#p/story}* ASTRO SERF - 攻击11 防御4\n* 这个青年很欣赏你的时尚感。'],
        act_check3: ['<32>{#p/story}* ASTRO SERF - 攻击11 防御4\n* 这个青年接收到了\n  所有正确的信号。'],
        act_check4: [
            '<32>{#p/story}* ASTRO SERF - 攻击11 防御4\n* 企图劫持一个收音机\n  来寻求帮助。'
        ],
        act_compliment: ['<32>{#p/human}* （你说Astro Serf的天线\n  真是太棒了。）'],
        act_flirt: ['<32>{#p/human}* （你向Astro Serf调情。）'],
        complimentTalk1: ["<08>{#p/basic}{~}啧！\n谁不\n知道！"],
        complimentTalk2: ['<08>{#p/basic}{~}嫉妒了？\n真可怜哦，\n哈哈！'],
        createStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf。']
                : ["<32>{#p/story}* Astro Serf小心翼翼地确定着\n  你有没有看它的天线。"],
        createStatus2: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Astro Serf。'] : ['<32>{#p/story}* Astro Serf被打动了。'],
        createTalk1: ["<09>{#p/basic}{~}喂！！！\n我的天线\n在头上呢。"],
        createTalk2: ['<08>{#p/basic}{~}啊？\n你在做甚？'],
        createTalk3: ["<08>{#p/basic}{~}不是.. 这\n怎么可能！"],
        createTalk4: ['<08>{#p/basic}{~}哇哦...\n你怎么\n做的？？'],
        createTalk5: ["<08>{#p/basic}{~}你在做..\n你自己的\n天线？"],
        act_create: () =>
            [
                ['<32>{#p/human}* （你开始设计自己的天线。）', '<32>{#p/basic}* 但... 怎么设计？'],
                ['<32>{#p/human}* （你做好了天线，\n  把它戴了上去。）'],
                [
                    '<32>{#p/human}* （你开始做另一根天线。）',
                    '<32>{#p/basic}* Astro Serf被你整懵了，\n  退出了战斗。'
                ]
            ][battler.target?.vars.create ?? 0],
        flirtStatus1: ['<32>{#p/story}* Astro Serf不喜欢你的装束。'],
        flirtStatus2: ['<32>{#p/story}* Astro Serf坠入爱河。'],
        flirtTalk1: ['<08>{#p/basic}{~}没得谈！\n因为你没\n天线！'],
        flirtTalk2: ['<08>{#p/basic}{~}什么...？\n额..\n我..\n你..'],
        genoStatus: ['<32>{#p/asriel2}* Astro Serf。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 离死不远了。'] : ["<32>{#p/story}* Astro Serf的衣服松垮垮的。"],
        idleTalk1: ["<08>{#p/basic}{~}你的\n天线呢？"],
        idleTalk2: ['<08>{#p/basic}{~}你的脑袋\n看起来..\n光秃秃的'],
        idleTalk3: ['<08>{#p/basic}{~}多棒的\n天线啊！\n（我的！）'],
        idleTalk4: ["<09>{#p/basic}{~}这不是\n辐射！\n这是信号\n反馈。"],
        idleTalk5: ['<08>{#p/basic}{~}我只爱\n我的天线！'],
        justiceTalk: ['<08>{#p/basic}{~}你做了\n什么...'],
        name: '* Astro Serf',
        randStatus1: ['<32>{#p/story}* Astro Serf想在身上其他地方\n  也装上天线。'],
        randStatus2: ['<32>{#p/story}* Astro Serf检查了一下\n  他的天线还在是否那里。'],
        randStatus3: ['<32>{#p/story}* Astro Serf在考虑配一件衣服。'],
        randStatus4: ['<32>{#p/story}* 闻起来像锂。'],
        status1: ['<32>{#p/story}* Astro Serf昂首阔步走了过来。'],
        stealTalk1: ['<08>{#p/basic}{~}给我\n猜中了！！！\n你个小偷！！'],
        stealTalk2: ['<08>{#p/basic}{~}时尚警察\n快救我\n啊！！！'],
        act_steal: () =>
            battler.hurt.includes(battler.target!)
                ? [
                    "<33>{#p/human}* （你偷了Astro Serf的天线。）\n* （它的宇航服掉下来了。）",
                    '<33>{#p/basic}* 看起来它一直由锂驱动。'
                ]
                : ["<32>{#p/human}* （你尝试去偷Astro Serf的天线，\n  但它还没变得足够弱。）"]
    },
    b_opponent_space: {
        epiphany: [
            ["<08>{#p/basic}{~}好吧，\n我将独自\n闪耀。"],
            () =>
                world.meanie
                    ? ["<08>{#p/basic}{~}我...\n不挡你\n路了..."]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ["<08>{#p/basic}{~}你觉得\n我...\n哦..."]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}愿我们\n之间的\n晶体永远\n闪耀。']
                            : ['<08>{#p/basic}{~}小心...\n我很锋利\n...'],
            ['<08>{#p/basic}{~}我应该\n衰变...'],
            ["<08>{#p/basic}{~}我的钱\n都给你了\n..."]
        ],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* 锂块。\n* 对，就这样。"]
                : ['<32>{#p/story}* 锂块 - 攻击1 防御0\n* 丢了它的宇航服...'],
        act_reassure: ['<32>{#p/human}* （你告诉锂块仍然很棒。）'],
        genoStatus: ['<32>{#p/asriel2}* 锂块。'],
        happyStatus: ["<32>{#p/story}* 锂块不介意它的身份。"],
        happyTalk1: ['<08>{#p/basic}{~}是啊...\n我也喜欢\n我这样。'],
        happyTalk2: ['<08>{#p/basic}{~}嗯...\n天线只能\n用来装逼。'],
        happyTalk3: ['<08>{#p/basic}{~}所以你\n仍然可以\n对我印象\n深刻？'],
        happyTalk4: ['<08>{#p/basic}{~}我只是想\n让你觉得\n我很酷。'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* 也要去见阎王了。'] : ["<32>{#p/story}* 它正在瓦解。"],
        idleTalk1: ['<08>{#p/basic}{~}我..\n我..'],
        idleTalk2: ['<08>{#p/basic}{~}我还能说\n什么呢\n...'],
        idleTalk3: ["<08>{#p/basic}{~}还有何\n意义..."],
        idleTalk4: ['<08>{#p/basic}{~}好...\n孤独...'],
        name: '* 锂块',
        randStatus1: ['<32>{#p/story}* 再也没有“Astro Serf”了。'],
        randStatus2: ['<32>{#p/story}* 闻起来像锂电池。']
    },

    b_party_kidd: {
        mkNobody: ['<25>{#p/kidd}{#f/4}* 周围怎么一个人也没有，\n  是我的错觉吗...'],
        mkDeath1: [
            '<32>{#p/kidding}* 呃...',
            "<32>* 对手为啥是这样消失的呢？",
            '<32>* 嗯... 我们打了对手。\n  估计太害怕，就传送走了。\n* 哈哈，肯定是的。'
        ],
        mkDeath2: ['<32>{#p/kidding}* 又消失了？', "<32>* 该死，为啥我没有\n  这么酷的传送器呢！？"],
        mkDeath3: ["<32>{#p/kidding}* 消失了..."],
        mkDeath4: ['<32>{#p/kidding}* ...'],
        mkDeath1OW: [
            '<25>{#p/kidd}{#f/4}* 呃...',
            "<25>* 对手为啥是这样消失的呢？",
            '<25>{#f/1}* 嗯... 我们打了对手，\n  所以...',
            '<25>* 估计太害怕，就传送走了。\n* 哈哈，肯定是的。'
        ],
        mkDeath2OW: [
            '<25>{#p/kidd}{#f/4}* 又消失了？',
            "<25>{#f/1}* 该死，为啥我没有\n  这么酷的传送器呢！？"
        ],
        mkDeath3OW: ["<25>{#p/kidd}{#f/4}* 消失了..."],
        mkDeath4OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkBully1: [
            '<32>{#p/kidding}* 呃...',
            '<32>* 对手好像吓坏了...',
            "<32>* 希望我们下手没那么重..."
        ],
        mkBully2: ['<32>{#p/kidding}* 那位也...！', '<32>* 我们打得那么狠吗...？'],
        mkBully3: ['<32>{#p/kidding}* ...'],
        mkBully1OW: [
            '<25>{#p/kidd}{#f/4}* 呃...',
            '<25>* 对手好像吓坏了...',
            "<25>* 希望我们下手没那么重..."
        ],
        mkBully2OW: ['<25>{#p/kidd}{#f/7}* 那位也...！', '<25>{#f/4}* 我们打得那么狠吗...？'],
        mkBully3OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkShyrenDeath: ['<25>{#p/kidd}{#f/4}* 嘿...', "<25>{#p/kidd}{#f/1}* 大家都去哪了？"],
        mkMagic1: [
            "<32>{#p/kidding}* 哟... 我还不会释放很酷的魔法...",
            '<32>{#p/kidding}* 不过，嗯... 我可以帮你疗伤！'
        ],
        mkMagic2a: ['<32>{#p/kidding}* 治疗术！'],
        mkMagic2b: ['<32>{#p/kidding}* 健康与你同在！'],
        mkMagic2c: ['<32>{#p/kidding}* 看好了！'],
        mkNope: ['<32>{#p/kidding}* 不要再让我战斗了...'],
        mkTurn1: ["<32>{#p/kidding}* 帮帮我，我从来没战斗过！\n* 我要怎么做！？"],
        mkTurn2: ['<32>{#p/kidding}* 呃... 帮我！'],
        mkTurn3: ["<32>{#p/kidding}* 我... 我好像会了。"],
        mkTurnAct1: ['<32>{#p/kidding}* 哦！哦！', '<32>* 我知道要怎么行动！', '<32>* 看好了...！'],
        mkWeaken1: ["<32>{#p/kidding}* 真的要这么做吗...？\n* 对手好像不喜欢这样...", '<32>* ...'],
        mkWeaken2: ['<32>{#p/kidding}* 这么做真的好吗...？', '<32>* ...'],
        mkWeaken3a: ['<32>{#p/kidding}* 呃...'],
        mkWeaken3b: ['<32>{#p/kidding}* 嗯...'],
        mkWeaken3c: ['<32>{#p/kidding}* 呃...'],
        
        mkTurnActRand1: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* 怪物小孩在网里不停挣扎，\n  还给Muffet摆了个鬼脸。'],
                    ['<32>{#p/story}* 怪物小孩在网里\n  大喊大叫，不停挣扎。'],
                    ['<32>{#p/story}* 怪物小孩发出一阵瘆人的笑声。']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* 怪物小孩哼了一段\n  瘆人的旋律。'],
                        ['<32>{#p/story}* 怪物小孩嚷着骇人的歌词。'],
                        ['<32>{#p/story}* 怪物小孩疯狂地跺脚。']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* 怪物小孩不停地对地上的赃污\n  指指点点。'],
                            ['<32>{#p/story}* 怪物小孩向Skrubbington指着\n  漏水的管道。'],
                            ['<32>{#p/story}* 怪物小孩捂住鼻子，一脸嫌弃。']
                        ]
                        : [
                            ['<32>{#p/story}* 怪物小孩直钩钩地盯着$(x)。'],
                            ['<32>{#p/story}* 怪物小孩愤怒地指着$(x)。'],
                            ['<32>{#p/story}* 怪物小孩绕着$(x)来回踱步，\n  准备下手。']
                        ],
        
        mkTurnActRand2: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* 怪物小孩夸Muffet穿得真精致，\n  有品味。'],
                    ['<32>{#p/story}* 怪物小孩告诉Muffet，\n  她的糕点在怪物界就是一流。'],
                    ["<32>{#p/story}* 怪物小孩告诉Muffet，\n  她织的网简直无人能敌。"]
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* 怪物小孩哼了一段优美的旋律。'],
                        ["<32>{#p/story}* 怪物小孩告诉Shyren，\n  她的头发真好看。"],
                        ["<32>{#p/story}* 怪物小孩告诉Shyren，\n  她的声音真好听。"]
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* 怪物小孩告诉Skrubbington，\n  这片数它最爱干净。'],
                            ["<32>{#p/story}* 怪物小孩告诉Skrubbington，\n  它就是铸厂模范清洁工。"],
                            ["<32>{#p/story}* 怪物小孩对Skrubbington说，\n  它对完美的追求真是执着。"]
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ["<32>{#p/story}* 怪物小孩夸Radtile的镜子\n  真好看。"],
                                ["<32>{#p/story}* 怪物小孩夸Radtile\n  帽子真酷。"],
                                ["<32>{#p/story}* 怪物小孩再三打量Radtile\n  帅气的脸庞。"]
                            ]
                            : [
                                ['<32>{#p/story}* 怪物小孩告诉$(x)，\n  会陪着它。'],
                                ["<32>{#p/story}* 怪物小孩告诉$(x)，\n  会尽全力帮助它。"],
                                ['<32>{#p/story}* 怪物小孩站到了$(x)上面。']
                            ],
        
        mkTurnActRand3: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* 怪物小孩试着向Muffet询问\n  蜘蛛部落的事。'],
                    ['<32>{#p/story}* 怪物小孩试着向Muffet询问\n  烘焙心得。'],
                    ['<32>{#p/story}* 怪物小孩试着向Muffet询问\n  品茶之道。']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* 怪物小孩和Shyren争论起\n  用哪种记谱方式更好。'],
                        ['<32>{#p/story}* 怪物小孩开始讲起了乐理知识。'],
                        ['<32>{#p/story}* 怪物小孩跟Shyren讨论起\n  彼此喜爱的音乐流派。']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* 怪物小孩以“讲卫生”为主题，\n  吟了首小诗。'],
                            ['<32>{#p/story}* 怪物小孩围绕“安”与“危”\n  来了段Rap。'],
                            ['<32>{#p/story}* 怪物小孩自豪地展示着\n  自己的亮晶晶下水管道组。']
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ['<32>{#p/story}* 怪物小孩朝Radtile摆了个鬼脸。'],
                                ['<32>{#p/story}* 怪物小孩走上前，把脸凑过去，\n  仔细打量着Radtile。'],
                                ['<32>{#p/story}* 怪物小孩把自己扮成一个野孩子。']
                            ]
                            : [
                                ['<32>{#p/story}* 怪物小孩看着$(x)，\n  有样学样，扭动着身体。'],
                                ['<32>{#p/story}* 怪物小孩表演了倒立，\n  $(x)惊呆了。'],
                                ['<32>{#p/story}* 怪物小孩在原地打转，\n  看得$(x)不明所以。']
                            ],
        
        mkTurnActRand4: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [["<32>{#p/story}* 怪物小孩想告诉Muffet\n  这一切毫无意义！"]]
                : opponent === 'shyren' || opponent === 'radtile' // NO-TRANSLATE

                    ? [['<32>{#p/story}* 怪物小孩告诉对手，\n  时空扭曲即将来临！']]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [['<32>{#p/story}* 怪物小孩告诉对手，\n  某种病毒快传播到这里了！']]
                        : [['<32>{#p/story}* 怪物小孩告诉对手，\n  酸液从附近的管道里渗出来了！']],
        mkTurnActResult0: ['<32>{#p/story}* 无事发生。'],
        mkTurnActResult1: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington直犯恶心！\n* Skrubbington的防御力下降了！"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren感到很不自在！\n* Shyren的防御力下降了！"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* Radtile感到很不自在！\n* Radtile的防御力下降了！"]
                        : ["<32>{#p/story}* $(x)感到很不自在！\n* $(x)的防御力下降了！"],
        mkTurnActResult2: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington受宠若惊！\n* Skrubbington的攻击力下降了！"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren受宠若惊！\n* Shyren的攻击力下降了！"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* 受到尊重，Radtile心满意足！\n* Radtile的攻击力下降了！"]
                        : ["<32>{#p/story}* 受到尊重，$(x)心满意足！\n* $(x)的攻击力下降了！"],
        mkTurnActResult3: (opponent: string, multiple: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? multiple
                    ? ['<32>{#p/story}* 被怪物小孩一搅和，\n  Skrubbington和其他对手都分神了，\n  错过了自己的回合！']
                    : ['<32>{#p/story}* 被怪物小孩一搅和，\n  Skrubbington分神了，\n  错过了自己的回合！']
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ['<32>{#p/story}* 被怪物小孩一搅和，\n  Shyren分神了，\n  错过了自己的回合！']
                    : multiple
                        ? ['<32>{#p/story}* 被怪物小孩一整，\n  $(x)和其他对手忘乎所以，\n  错过了自己的回合！']
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? ['<32>{#p/story}* 被怪物小孩一整，\n  Radtile忘乎所以，\n  错过了自己的回合！']
                            : ['<32>{#p/story}* 被怪物小孩一整，\n  $(x)忘乎所以，\n  错过了自己的回合！'],
        mkTurnActResult4: (opponent: string, multiple: boolean, allowpac: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? [
                    '<32>{#p/story}* Skrubbington担心自己小命不保，\n  赶忙跑掉了！',
                    ...(multiple ? ['<32>{#p/story}* 其他对手还想继续战斗。'] : [])
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? allowpac
                        ? ['<32>{#p/story}* Shyren担心自己小命不保，\n  赶忙跑掉了！']
                        : ['<32>{#p/story}* 表演过后，Shyren有了信心。\n  决定勇敢地直面危险！']
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ['<32>{#p/story}* Radtile担心自己小命不保，\n  赶忙跑掉了！']
                        : [
                            '<32>{#p/story}* $(x)担心自己小命不保，\n  赶忙跑掉了！',
                            ...(multiple ? ['<32>{#p/story}* 其他对手还想继续战斗。'] : [])
                        ],
        mkTurnFight1: () => [
            '<32>{#p/kidding}* 你... 你-你让我战斗？\n* 真的吗？',
            choicer.create('* （确定战斗吗？）', '给我打', '算了')
        ],
        mkTurnFight2a: ['<32>{#p/kidding}* 好吧... 那我试试...'],
        mkTurnFight2b: ['<32>{#p/kidding}* 哦，好...', "<32>* 那我就饶恕他们吧！"],
        mkTurnFight3a: ['<32>* 呀哈...！'],
        mkTurnFight3b: ['<32>* 嘿呀...！'],
        mkTurnFight3c: ['<32>* 我打！'],
        mkTurnMercy1: ['<32>{#p/kidding}* 仁慈？\n* 让我饶恕对手吗？', "<32>{#p/kidding}* 哈哈，容易！"],
        mkTurnX: () => [choicer.create('* （怪物小孩应该怎么做？）', '仁慈', '行动', '魔法', '战斗')]
    },

    c_name_common: {
        keyring: '钥匙串',
        hello_asgore: '打招呼',
        about_asgore: '介绍下自己',
        dad: '叫他“爸爸”',
        flirt_asgore: '调情',
        insult_asgore: '辱骂'
    },

    c_call_common: {
        start: '<32>{#s/phone}{#p/event}* 拨号中...',
        end: '<32>{#s/equip}{#p/event}* 滴...',
        nobody0: ['<32>{#p/human}* （全是噪音。）'],
        nobody1: ['<32>{#p/human}* （没有回应。）'],
        nobody2: ['<32>{#p/basic}* ...但是谁也没有来。'],
        nobody3: ['<32>{#p/human}* （没有信号。）'],
        nobody4: [
            '<32>{#p/human}* （听起来，一只小白狗\n  在手机上睡着了。）',
            '<32>{#p/basic}* （呼噜... 呼噜...）',
            '<32>* （呼噜... 呼噜...）'
        ],
        nobody4a: [
            '<32>{#p/human}* （听起来，一只小白狗\n  在手机上睡着了。）',
            '<32>{#p/basic}* （呼噜... 呼噜... 呼噜...）',
            '<32>* （呼噜... 呼噜... 呼噜...）'
        ],
        nobody4f: [
            '<32>{#p/human}* （听起来，一只小白狗\n  在手机上睡着了。）',
            '<32>{#p/basic}* （呼噜！）',
            '<32>* （呼噜！）'
        ],
        nobody4m: [
            '<32>{#p/human}* （听起来，一只小白狗\n  在手机上睡着了。）',
            '<32>{#p/basic}* （呼噜？）',
            '<32>* （呼噜？）'
        ],
        nobody4i: [
            '<32>{#p/human}* （听起来，一只小白狗\n  在手机上睡着了。）',
            '<32>{#p/basic}* （嗷呜——）',
            '<32>* （呜呜。）'
        ],
        about1: [
            '<25>{#p/asgore}{#f/5}* 想了解了解我，是吗？',
            '<25>{#f/7}* ...从哪开始说好呢？',
            '<25>{#f/6}* 能聊的实在太多了，\n  一下子根本说不完。',
            '<25>{#f/6}* 相处久了，咱们自然就熟悉了。',
            '<25>{#f/21}* 一点一点相互了解，\n  可比一口气来一大段自我介绍\n  好多了。'
        ],
        about2: [
            '<25>{#p/asgore}{#f/5}* 要是你真好奇的话，\n  之后再慢慢讲给你听。',
            '<25>{#f/7}* 你看行吗？'
        ],
        flirt1: [
            '<25>{#p/asgore}{#f/20}* ...',
            '<25>{#f/4}* Frisk啊...',
            '<25>{#f/6}* 你想找对象，\n  也该找年龄差不多的吧。',
            '<25>{#f/5}* 倒不是说我反感这事...',
            '<25>{#f/6}* 但你得知道，\n  “我喜欢你”和“我就跟你了”\n  可是天壤之别。'
        ],
        flirt2: [
            '<25>{#p/asgore}{#f/20}* Frisk。',
            '<25>{#f/20}* 等你大一点，\n  我再好好跟你聊聊\n  感情方面的事。',
            '<25>{#f/6}* 不过现在，免谈。'
        ],
        flirt3: [
            '<25>{#p/asgore}{#f/20}* Frisk。',
            '<25>{#f/6}* 你先叫我爹，又跟我调情...\n  都把我整懵了。',
            
        ],
        hello: [
            ['<25>{#p/asgore}{#f/21}* 你刚跟我打了个招呼。', '<25>{#f/7}* 嗯...', '<25>{#f/6}* 那我也回一句“哈喽”吧！'],
            ['<25>{#p/asgore}{#f/5}* 又来？', '<25>{#f/21}* 那我再来一句...', '<25>{#f/6}* “今天开心吗？”'],
            [
                '<25>{#p/asgore}{#f/5}* ...',
                '<25>{#f/5}* 再这么整下去，\n  我都没词儿了。',
                '<25>{#f/6}* 你看，外面有那么多鸟，\n  它们肯定很乐意跟你问好。',
                '<25>{#f/7}* 去跟它们打招呼吧。'
            ],
            ['<25>{#p/asgore}{#f/5}* ...哈喽。', '<25>{#f/6}* 孩子，能听到你的声音，\n  我很开心。']
        ],
        dad1: [
            '<25>{#p/asgore}{#f/6}* ...',
            '<25>{#f/24}* ...',
            '<25>{#f/21}* 是啊。',
            '<25>{#f/6}* 你要是叫别的，那才奇怪呢。',
            '<25>{#f/6}* Frisk，要是你想叫我爹，\n  随时都可以哦。'
        ],
        dad2: [
            '<25>{#p/asgore}{#f/24}* ...\n* 天哪...',
            '<25>{#f/6}* 你是真想认我当爹了。',
            '<25>{#f/21}* 我也很乐意做个\n  称职的父亲。'
        ],
        dad3: [
            '<25>{#p/asgore}{#f/24}* ...\n* 天哪...',
            '<25>{#f/6}* 你先跟我调情，又叫我爹...\n  都把我整懵了。',
            
        ],
        insult1: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/asgore}{#f/1}* ...',
                    '<25>{#f/1}* 你好像挺难过的...\n  是不是有什么心事？',
                    '<25>{#f/6}* 要不，等我干完活，\n  咱们谈谈心，怎么样？'
                ]
                : [
                    '<25>{#p/asgore}{#f/8}* ...',
                    '<26>{#f/6}* 大胆！竟敢这样说话！',
                    '<25>{#f/21}* 嘿嘿，别担心...\n* 互相开个玩笑而已。'
                ],
        insult2: () =>
            SAVE.data.b.ufokinwotm8
                ? ['<25>{#p/asgore}{#f/1}* ...', '<25>{#p/asgore}{#f/6}* 等我有空再聊，\n  好吗？']
                : ['<25>{#p/asgore}{#f/21}* 好啦，好啦。\n* 这么张扬可不太好哦。']
    },

    s_save_common: {
        _cockpit: {
            name: '无人深空',
            text: []
        },
        _frontier1: {
            name: '你的家',
            text: ["<32>{#p/human}* （你充满了决心。）"]
        },
        _frontier8: {
            name: '欧律比亚',
            text: []
        }
    }
};


// END-TRANSLATE
