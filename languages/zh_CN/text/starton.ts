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
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* 标准规格的长焦望远镜，皇家出品。\n* 251X年前后制成。' ]),
         choicer.create('* （使用望远镜？）', '是', '否')
      ],
      telescopeMeetup1: [ '<25>{#p/kidd}{#f/2}* 你在看星星吗？' ],
      telescopeMeetup2: [
         '<25>{#p/kidd}{#f/1}* 哟... 我打赌\n  你肯定看到了很酷的东西。',
         '<25>{#f/7}* 上次我用望远镜的时候，\n  我甚至看到了一颗超新星！'
      ],
      telescopeMeetup3: [
         '<25>{#p/kidd}{#f/3}* 给。\n* 拿上这个。',
         '<32>{#s/equip}{#p/human}* （你把高级会员卡\n  挂到了钥匙串上。）',
         '<25>{#p/kidd}{#f/7}* 现在你可以使用\n  任何望远镜了，\n  连“最高级”的都能用！',
         '<25>{#f/1}* 那个矮骷髅之前\n  给了我好多这个。',
         '<25>{#f/2}* 他甚至花了很多钱\n  送了我一些数字藏品...',
         '<25>{#f/1}* 我猜他真的很喜欢我，哈哈。'
      ],
      telescopeMeetup4: [
         '<25>{#p/kidd}{#f/3}* 总之，我刚才给了你一张券。',
         '<25>{#f/1}* 希望你能看到更酷的东西！'
      ],
      telescopeMeetup5: [ "<25>{#p/kidd}{#f/1}* 我要回镇上了！" ],
      telescope2: () =>
         SAVE.data.b.svr
            ? [ '<25>{#p/asriel1}{#f/17}* 看到什么喜欢的东西了吗？' ]
            : SAVE.data.b.oops || SAVE.data.b.s_state_chargazer
            ? [ '<32>{#p/basic}* 在太空中观星...\n  确实，这也是种打破\n  思维定势的想法。' ]
            : ((SAVE.data.b.s_state_chargazer = true),
              [
                 '<32>{#p/basic}* ...',
                 '<32>* 以前，我和Asriel就有一架\n  这样的望远镜。',
                 "<32>* 我们把镜筒对着\n  天空的各个角落，\n  期待能发现意想不到的惊喜...",
                 '<32>* ...可惜，希望总是落空。',
                 "<32>* 尽管观星收获寥寥，\n  但Asriel并不在意...",
                 '<32>* 我挖空心思从星空寻找宝藏。\n  但对他而言...\n  我的陪伴才是真正的“宝藏”。',
                 '<32>* ...',
                 '<32>{#p/human}* （你听到一声叹息。）',
                 "<32>{#p/basic}* ...唉，别在意。\n  咱们继续干正事吧。"
              ]),
      notv: [ "<32>{#p/basic}* 没什么好看的。" ],
      nicecreamScoreReaction1a: [ '<32>{#p/basic}* 第一次尝试还不错...' ],
      nicecreamScoreReaction1b: [ '<32>{#p/basic}* 第一次尝试还不错。' ],
      nicecreamScoreReaction2a: [ '<32>{#p/basic}* 你可以做得更好的。' ],
      nicecreamScoreReaction2b: [ '<32>{#p/basic}* 你可以做得更好的。' ],
      nicecreamScoreReaction3a: [
         "<32>{#p/basic}* 你打破了纪录...？\n* 我还从来没见过有人这么做..."
      ],
      nicecreamScoreReaction3b: [
         "<32>{#p/basic}* 你打破了纪录...？\n* 我还从来没见过有人这么做！"
      ],
      nicecreamScoreReaction4a: [ '<33>{#p/basic}* 看起来你真的很擅长...' ],
      nicecreamScoreReaction4b: [ '<32>{#p/basic}* 看起来你真的很擅长。' ],
      nicecreamScoreReaction5a: [ '<32>{#p/basic}* 你打破了你的纪录...？' ],
      nicecreamScoreReaction5b: [ '<32>{#p/basic}* 看，新纪录！' ],
      nicecreamScoreReaction6a: [ '<32>{#p/basic}* 有那么一瞬间，我以为你打破了记录...' ],
      nicecreamScoreReaction6b: [
         "<32>{#p/basic}* 哇哦，你差点就破纪录了！\n* 你能坚持下去吗？"
      ],
      nicecreamScoreReaction7a: [ '<32>{#p/basic}* 看起来你需要一些练习...' ],
      nicecreamScoreReaction7b: [ '<32>{#p/basic}* 看起来你需要一些练习。' ],
      nicecreamScoreReaction8a: [ "<32>{#p/basic}* 更好了..." ],
      nicecreamScoreReaction8b: [ "<32>{#p/basic}* 这才像话。" ],
      nicecreamScoreReaction9a: [
         '<32>{#p/basic}* 你第一次尝试就打破了纪录...？\n* 世界上竟然...'
      ],
      nicecreamScoreReaction9b: [ "<32>{#p/basic}* 你第一次尝试就打破了纪录...？\n* 你真是个天才！" ],
      nicecreamScoreReaction10a: [ "<32>{#p/basic}* 就第一次尝试来说，这已经很好了..." ],
      nicecreamScoreReaction10b: [ "<32>{#p/basic}* 就第一次尝试来说，这已经很好了！" ],
      nicecreamScoreReaction11a: [ '<32>{#p/basic}* 就要快了...' ],
      nicecreamScoreReaction11b: [ '<32>{#p/basic}* 天哪，你几乎快破纪录了...\n* 你能做到的！' ],
      noteleport: [ "<32>{#p/human}* （似乎是没电了。）" ],
      evac: [ '<32>{#p/human}* （你感觉周围的怪物越来越少了。）' ],
      shopclosed: [ '<32>{#p/human}* （没必要再踏足了。）' ],
      jukebox0: [ "<32>{#p/basic}* 不能使用了。" ],
      jukebox1: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* （你去碰点唱机...）'
            : "<32>{#p/basic}* 点唱机只放你听过的音乐。",
         choicer.create(
            '* （放一首音乐吗？）',
            SAVE.data.b.napsta_performance ? '曲目01' : '？？？',
            2 <= SAVE.data.n.state_foundry_swansong ? '曲目02' : '？？？',
            2 <= SAVE.data.n.state_starton_trashprogress ? '曲目03' : '？？？',
            '取消'
         )
      ],
      jukebox1x1: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （但是你不能放你不知道的音乐。）" ]
            : [ "<32>{#p/basic}* 封面中一个诡异的DJ在人群中演奏。\n* 你看不出来是什么音乐。" ],
      jukebox1x2: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （但是你不能放你不知道的音乐。）" ]
            : [ "<33>{#p/basic}* 封面中一个幽灵一样的DJ在电脑前。\n* 你看不出来是什么音乐。" ],
      jukebox1x3: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （但是你不能放你不知道的音乐。）" ]
            : [
                 "<32>{#p/basic}* 封面中是一只被垃圾包围着的小白狗。\n* 你看不出来是什么音乐。"
              ],
      jukebox1y: [ '<32>{*}{#p/human}* （你选择了一张光盘...）{^40}{%}' ],
      jukebox2: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* （听起来像是一首正在播放的音乐。）'
            : [
                 '<32>{#p/basic}* 现在播放的是“曲目01”',
                 '<32>{#p/basic}* 现在播放的是“曲目02”',
                 '<32>{#p/basic}* 现在播放的是“曲目03”'
              ][SAVE.data.n.state_starton_jukebox - 1],
         choicer.create('* （停止播放吗？）', '是', '否')
      ],
      jukebox3a1: [ "<32>{#p/basic}{#npc/a}* 这就对了！" ],
      jukebox3a2: [ '<32>{#p/basic}{#npc/a}* （我们都喜欢这种音乐。）' ],
      jukebox3b: [ '<32>{#p/basic}{#npc/a}* 这音乐在舞蹈俱乐部里面流行吗？' ],
      jukebox3c: [
         '<32>{#p/basic}* ...\n* ...\n* ...',
         "<32>{#npc/a}* Grillbz说他曾经在哪听过这首歌。"
      ],
      jukebox3d: [
         '<32>{#p/basic}{#npc/a}* 你肯定很懂音乐，孩子...',
         '<32>* You must be really tasty.'
      ],
      shockpapyrus0a: [
         '<15>{#p/papyrus}{#e/papyrus/27}我克-\n这里发生啥了？？',
         '<15>{#p/papyrus}{#e/papyrus/21}刚才我在阳台，\n有个电话打过来\n叫我来这...',
         '<15>{#p/papyrus}{#e/papyrus/19}结果就看到你俩！？',
         "<15>{#p/papyrus}{#e/papyrus/14}告诉你们，我可是\n皇家卫队的预备队员！",
         '<15>{#p/papyrus}{#e/papyrus/15}不管你俩\n想干什么...'
      ],
      shockpapyrus0b: [
         '<15>{#p/papyrus}{#e/papyrus/24}...等等，这个声音...',
         '<15>{#p/papyrus}{#e/papyrus/22}原来喊我来这的\n就是你啊！？'
      ],
      shockpapyrus0c: [
         '<15>{#p/papyrus}{#e/papyrus/20}...对！\n这就说得通了！',
         "<15>{#p/papyrus}{#e/papyrus/10}那...\n很高兴认识你。",
         '<15>{#p/papyrus}{#e/papyrus/24}说实话，\n你长得有点像...',
         '<15>{#p/papyrus}{#e/papyrus/20}...嘿，等一下！！',
         '<15>{#p/papyrus}{#e/papyrus/22}你带了个【人类】\n过来吗！？！？',
         '<15>{#p/papyrus}{#e/papyrus/10}哇！！\n今天好事连连啊！！',
         '<15>{#p/papyrus}{#e/papyrus/20}话说回来，\n你喊我来这干嘛呢？'
      ],
      shockpapyrus1: () =>
         [
            [
               '<32>{#p/asriel2}* 准备好了吗，$(name)？',
               choicer.create('* （Asriel应该怎么做？）', '仁慈', '行动', '魔法', '战斗')
            ],
            [ "<32>{#p/asriel2}* 我们速战速决吧。" ]
         ][Math.min(SAVE.flag.n.ga_asrielPapyrus, 1)],
      shockpapyrus2a: [
         '<32>{#p/asriel2}* 仁慈，嗯？',
         '<32>{#p/asriel2}* 仁慈...？\n  这真是个好听的词。',
         '<32>{#p/asriel2}* 那咱们就给他来点“仁慈”吧。'
      ],
      shockpapyrus2b: [
         "<32>{#p/asriel2}* 行动...？\n* 看好了，什么才叫行动。",
         '<32>{#p/asriel2}* 首先，举起手臂...',
         '<32>{#p/asriel2}* 接着...！'
      ],
      shockpapyrus2c: [
         '<32>{#p/asriel2}* 魔法，\n  它可化为纽带，\n  让怪物们团结一心。',
         '<32>{#p/asriel2}* 不过，反过来...',
         '<33>{#p/asriel2}* 它也能成为利刃，\n  刺穿他们的肉体。'
      ],
      shockpapyrus2d: [ '<32>{#p/asriel2}* 战斗... 真是不二之选。', '<32>{#p/asriel2}* 嘻嘻嘻...' ],
      sansDeath1: [ "<15>{#p/papyrus}{#e/papyrus/27}SANS！\n你受伤了！" ],
      sansDeath2: [ "<20>{#p/sans}papyrus，\n我不是让你待在家里吗？", '{*}{#e/papyrus/21}{%}' ],
      sansDeath3: [ "<20>{#p/sans}...别担心，兄弟。\n这只是我最喜欢的\n雅莫万能酱。", '{*}{#e/papyrus/26}{%}' ],
      sansDeath4: [ "<15>{#p/papyrus}{#e/papyrus/21}但你真的\n伤得很重..." ],
      sansDeath5: [
         "<20>{#p/sans}是啊，因为“不祥的预感”\n就离开家乱跑，\n就是这下场。",
         '<20>{#p/sans}...这样的伤口，\n应该是没办法了。',
         '{*}{#e/papyrus/21}{%}'
      ],
      sansDeath6: [
         '<20>{#p/sans}看样子...',
         "<20>恐怕...\n只能陪你到这了。",
         '<20>...',
         '<20>只是...',
         "<20>答应我，哪怕我不在，\n你也要好好活下去，\n兄弟。",
         "<20>答应我，你还会做\n那个最-{^5}最棒的你。",
         '<20>...',
         '<20>毕竟...'
      ],
      sansDeath7: [ "<20>{|}{#p/sans}你可是...\n伟大的p-{^5}papyrus。" ],
      sansDeath8: [ '<15>{#p/papyrus}{#e/papyrus/33}不-不...{^40}{%}' ],
      fast_food1: () => [
         SAVE.data.b.fryz
            ? "<32>{#p/human}{#npc}* （你拿走了烈焰Grillby。）"
            : '<32>{#p/human}{#npc}* （你拿走了三个小汉堡。）'
      ],
      fast_food2: [ "<32>{#p/human}{#npc}* （你带的东西太多了。）" ],
      aussie: pager.create(
         0,
         () =>
            SAVE.data.n.state_starton_trashprogress < 1
               ? [
                    '<25>{#p/sans}{#f/0}* 终于。',
                    "<25>{#f/3}* 我一直在想你\n  什么时候会出现呢。",
                    '<25>{#f/0}* 不知道你还记不记得，\n  当我们第一次\n  见面的时候...',
                    '<25>{#f/0}* 我告诉papyrus遇到困难\n  负“重力”争才能致远。',
                    '<25>{#f/0}* 你问我是什么意思？',
                    '<25>{#f/3}* 嗯。',
                    "<25>{#f/2}* 你马上就{@fill=#003cff}知道{@fill=#fff}了。"
                 ]
               : [ '<25>{#p/sans}{#f/0}* 欢迎回来。', '<25>{#f/2}* 准备好知道等待你的\n  是什么了吗？' ],
         () =>
            SAVE.data.n.state_starton_trashprogress < 1
               ? [ '<25>{#p/sans}{#f/0}* 来嘛，过来看看。', "<25>{#f/2}* 就在上面呢，小鬼头。" ]
               : [ "<25>{#p/sans}{#f/2}* 就在上面呢，小鬼头。" ],
         () =>
            SAVE.data.n.state_starton_trashprogress < 2
               ? [ "<25>{#p/sans}{#f/2}* 别担心，那东西\n  一点也不危险... 虽然\n  看起来让人感觉很危险。" ]
               : [ '<25>{#p/sans}{#f/2}* 多谢你的帮助。' ]
      ),
      trashhunt1: [
         '<25>{#p/sans}{#f/0}* 所-以...\n  你现在是怎么想的？',
         '<25>{#f/3}* 我管这个叫“垃圾星球”。',
         "<25>{#f/0}* ...事实上，这东西的体积\n  已经有段时间在一直\n  变大了。",
         '<25>{#f/0}* 要是再继续大下去，\n  那...',
         "<25>{#f/2}* 我只能说要有\n  {@fill=#ff0}倒悬{@fill=#fff}之急了。",
         "<25>{#f/0}* 但别担心。\n* 有了你的帮助，\n  它很快就会消失的。",
         '<25>{#f/2}* 我还给你找了首音乐，\n  能让你更有动力。'
      ],
      trashhunt2: '* 反复按[Z]，\n  清走所有垃圾！',
      trashhunt3: () => [
         '<25>{#p/sans}{#f/3}* 哇。\n* 一气呵成，是吧？',
         "<25>{#f/2}* ...我真是佩服到绝倒了。",
         '<25>{#f/0}* 感觉我得给你点什么\n  作为回报。',
         '<25>{#f/0}* ...\n* 给。\n* 把这个拿上。',
         '<32>{#p/human}* （Sans丢给你了一样东西。）',
         ...(SAVE.storage.inventory.size < 8
            ? [ '<32>{#s/equip}{#p/human}* （你获得了玉狗圣剑。）', '<25>{#p/sans}{#f/2}* 好好用它。' ]
            : [
                 "<32>{#p/human}* （你带的东西太多了。）",
                 '<25>{#p/sans}{#f/3}* 没空间了，嗯？',
                 "<25>{#p/sans}{#f/2}* 没关系。\n* 等你有空间了，\n  就来我房间拿。"
              ])
      ],
      gravo1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你好奇地打量\n  这个不知道干什么用的装置。）',
                 ...[ [ "<25>{#p/asriel1}{#f/17}* 真可惜啊，我们没有\n  这东西的遥控器。" ], [] ][
                    Math.min(asrielinter.gravo1++, 1)
                 ]
              ]
            : [ '<32>{#p/basic}* 这是个“重力转换器”。', '<32>* 管它什么意思。' ],
      gravo3: () => [
         '<32>{#p/human}* （你尝试用遥控器\n  激活重力转换器。）\n* （什么都没发生。）',
         ...(SAVE.data.b.svr
            ? [ [ "<25>{#p/asriel1}{#f/21}* 他们可能正在关掉\n  那些非必要设备。" ], [] ][
                 Math.min(asrielinter.gravo3++, 1)
              ]
            : [ '<32>{#p/basic}* 它肯定离线了...' ])
      ],
      gravo2: [ '<32>{#p/human}* （你用遥控器激活了重力转换器。）' ],
      sansdoor1: () =>
         SAVE.data.b.svr || world.runaway
            ? [ '<32>{#p/human}* （被封死了。）' ]
            : [ "<32>{#p/basic}* 锁住了。" ],
      sansdoor2: [ '<32>{#p/human}* （你用骨钥打开了房门。）' ],
      sanscab1: () => [
         ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* 信封里有个奇怪的遥控器。" ]),
         '<32>{#s/equip}{#p/human}* （你把重力转换器的遥控器\n  挂到了钥匙串上。）'
      ],
      sanscab2: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （你已经把信封里的东西\n  全拿走了。）' ]
            : [ "<32>{#p/basic}* 只是个空信封。" ],
      sanscab3: () => [
         ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* 信封里有个奇怪的... 东西。" ]),
         SAVE.storage.inventory.size < 8
            ? '<32>{#s/equip}{#p/human}* （你获得了玉狗圣剑。）'
            : "<32>{#p/human}* （你带的东西太多了。）"
      ],
      cream_get: [ '<32>{#p/human}* （你得到了冰意灵。）' ],
      cream_deny: [ '<32>{#p/basic}* 什么都没有。' ],
      cream_full: [ "<32>{#p/human}* （你带的东西太多了。）" ],
      cream_get_archive: [
         '<32>{#p/human}* （你把手伸进了冰淇淋车。）',
         '<32>{#p/human}{#s/equip}* （你得到了冰意灵。）'
      ],
      cream_empty_archive: [ '<32>{#p/human}* （你把手伸进了冰淇淋车。）', '<32>{#p/human}* （...）' ],
      cream_full_archive: [ "<32>{#p/human}* （你带的东西太多，\n  不方便把手伸进去。）" ],
      bunbun: pager.create(
         0,
         () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* 妈妈说我们很快就要去新家园了。", "<32>* ... 新家园是什么啊？" ]
               : [
                    '<32>{#p/basic}* 妈妈说，睡觉可以把你的\n  生命值恢复到{@fill=#ff0}HP上限以上{@fill=#fff}。',
                    "<32>* ...HP上限是什么啊？"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* 人类也有家园吗？' ]
               : [ '<32>{#p/basic}* 这是母亲才有的东西吗？' ]
      ),
      emptytable1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （这张桌子让你感到很孤独。）' ]
            : [ "<32>{#p/basic}* 只是张孤零零的桌子。\n* 上面有糖霜的味道。" ],
      emptytable2: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （这张桌子让你感到很孤独。）' ]
            : [ "<32>{#p/basic}* 一张孤零零的桌子。\n* 上面有毛发的味道。" ],
      balcony0: () => [ '<18>{#p/papyrus}景色不错吧？', choicer.create('* （你要怎么回答？）', '是', '否') ],
      balcony1: [
         "<18>{#p/papyrus}{#f/9}太好了！\n终于，有人懂这种感觉了。",
         '<18>{#f/7}几乎就没见过SANS\n往窗外看风景！！！'
      ],
      balcony2: [
         "<18>{#p/papyrus}{#f/5}哦...\n好吧，没事...",
         '<18>{#f/4}（唉...）\n起码，你愿意走出房间，\n到阳台看看。',
         "<18>{#f/7}SANS才不会这么干！！！"
      ],
      bedbook1: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （你好像有点看不懂内容。）" ]
            : [ "<32>{#p/basic}* 一本用古文写成的书。" ],
      bedbook3a: [ '<32>{#p/basic}* 想让我帮你读一下吗？' ],
      bedbook3b: [ '<32>{#p/basic}* 再读一遍？' ],
      bedbook4: () => [ choicer.create('* （让$(name)给你读一下吗？）', '是', '否') ],
      bedbook5: [
         '<32>{#p/basic}* 好，我看看...',
         '<32>* “很久很久以前，\n   太阳系由两个种族统治着：\n   人类和怪物。”',
         '<32>* “起初，怪物们只是造访了一下，\n   不久就回到了他们自己的星系。”',
         '<32>* “但是怪物们喜欢上了人类，\n   想和他们共同生活。”',
         '<32>* “因此，他们和人类分享了他们的科技，\n   并与人类结成了同盟。”',
         '<32>* “接下来数百年间，怪物与人类和平共处。”',
         '<32>* “有一天，人类开始对怪物的某种东西产生恐惧...”',
         '<32>* “一种没有杰出的领导力\n   就会失控的恐惧。”',
         '<32>* “随着时间的推移，\n   两个物种之间爆发了战争。”',
         '<32>* “那时星际间会发生许多战斗和冲突。”',
         '<32>* “但是人类们，\n   充满了恐惧与决心的人类们，\n   很容易占据了上风。”',
         '<32>* “然后，\n   在那对未来有着重大影响的一天，\n   一件强大的武器向怪物的家园发射了。”',
         '<32>* “在怪物们的母星被摧毁之后，\n   人类获得了胜利。”',
         '<32>* “两个物种间签订了和约，然后...”',
         '<32>* “剩下的怪物被驱逐到了一个废弃的前哨站。”',
         '<32>* “接着，人类集结了七位精英。”',
         '<32>* “他们一同制定了一个计划，最后...”',
         '<32>* “一个强大的力场被建立了起来，怪物们被困在其中。”',
         "<32>* 嗯，这就是故事的内容了。"
      ],
      bedbook6: [ '<32>{#p/basic}* 好吧，如果你想让我读，就告诉我。' ],
      beddoor1: [ "<32>{#p/basic}{#npc/a}* 如果你想订房间，\n  你得先问我一声。" ],
      beddoor2: [ "<32>{#p/basic}{#npc/a}* 如果你还想订房间，\n  你得先问我一声。" ],
      beddoor3: [ '<32>{#p/basic}{#npc/a}* 抱歉，小家伙！\n* 这里已经满人了！' ],
      candy1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* 不能使用了。" ]
            : [
                 SAVE.data.b.svr
                    ? '<32>{#p/human}* （你走近自动售货机。）'
                    : "<32>{#p/basic}* 这是一台专门售卖\n  高档洋梅的自动售货机。",
                 choicer.create('* （要花8G买洋梅吗？）', '是', '否')
              ],
      candy2: [ "<32>{#p/human}* （你的钱不够。）" ],
      candy3: [ "<32>{#p/human}* （你带的东西太多了。）" ],
      candy4: [ '<32>{#p/human}* （你买了一个洋梅。）' ],
      candy5: [ '<32>{#p/human}* （你决定先不买。）' ],
      capstation1: [
         '<32>{#p/human}* （你看了眼哨站后面，\n  并发现了一把钥匙。）',
         '<32>{#s/equip}{#p/human}* （你把生锈的钥匙\n  挂到了钥匙串上。）',
         '<32>* （打开“手机”来查看\n  所有获得的钥匙。）'
      ],
      capstation2: [ '<32>{#p/human}* （你看了眼哨站后面。）', '<32>{#p/basic}* 没有新东西。' ],
      crossword0: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}* 哦，你来了。',
                 '<25>{#p/sans}{#f/2}* 如果你喜欢上一个谜题的话，\n  估计这个也能合你胃口。'
              ]
            : [
                 '<18>{#p/papyrus}{#f/9}人类！！',
                 '<18>{#f/9}你已经看到\n我的谜题了。',
                 '<18>{#f/4}但你接下来\n将要看到的是...'
              ],
      crossword1: () =>
         world.edgy
            ? [
                 '<26>{#p/sans}* 其实也不需要了。\n* 走过来瞧瞧吧。',
                 "<25>{#p/sans}* 喏，它就在地上呢。"
              ]
            : [
                 "<18>{#p/papyrus}{#f/7}SANS！！\n谜题在哪！？",
                 "<25>{#p/sans}* 就在你眼皮底下呢。",
                 '<18>{#p/papyrus}{#f/1}啥？\n就地上躺的那块板子？',
                 '<18>{#f/4}行吧...'
              ],
      crossword2: (check: boolean) =>
         world.edgy
            ? [
                 check
                    ? '<25>{#p/sans}* 咋了？\n  谜题让你{@fill=#ff0}郁{@fill=#fff}罢不能吗？'
                    : "<25>{#p/sans}* 看都不愿意看一眼，是吧？",
                 "<25>* 真不该对你期望太高。",
                 '<26>{#f/3}* 好吧，\n* 说不定，数谜更适合你。',
                 '<26>{#f/0}* 跑题了。'
              ]
            : [
                 check
                    ? "<18>{#p/papyrus}{#f/7}SANS！！！\n那根本没有用啊！"
                    : "<18>{#p/papyrus}{#f/7}SANS！！！\n那个人类连\n看都没看一眼！",
                 '<25>{#p/sans}* 啊呀。',
                 "<25>{#f/3}* 我就知道我应该用\n  今天的数和谜题代替的。",
                 '<18>{#p/papyrus}{#f/1}啥！？数和！？',
                 "<18>{#f/9}我真不敢相信\n你居然会提到它！！",
                 '<18>{#f/4}在我看来...',
                 '<18>{#f/0}数独无疑才是最难的。',
                 '<25>{#p/sans}* 什么？你认真吗，兄弟？\n* 那个简单到爆的\n  数字排列组合？',
                 "<25>{#f/4}* 那是给骷髅宝宝玩的。",
                 '<18>{#p/papyrus}{#f/4}真。难以置信。',
                 '<18>{#f/9}人类！！！\n你来评评理！',
                 choicer.create('* （哪边更难？）', '数独', '数和')
              ],
      crossword3a: [
         '<18>{#p/papyrus}哈！哈！好！',
         '<18>要是人类也觉得\n数独更难的话！',
         '<18>那他们一定\n非常聪明！',
         '<18>{#f/9}捏！嘿！嘿！嘿！'
      ],
      crossword3b: [
         '<18>{#p/papyrus}{#f/9}你们两个真怪！',
         '<18>{#f/0}数和谜题\n真的太简单了。',
         "<18>每次的解法\n都是一样的。",
         '<18>{#f/4}我只要把每个空格\n都填上字母“Z”\n就好了...',
         '<18>{#f/4}因为我\n每做一道数和...',
         '<18>{#f/9}除了打瞌睡\n我什么都做不了！！！'
      ],
      crossword3c: [
         '<25>{#p/sans}{#f/3}* 顺便提一嘴，\n  我之前看到有两只狗\n  在这边跑来跑去...',
         "<25>{#f/0}* 如果我是你的话，\n  我会小心点的。"
      ],
      crossword4a: pager.create(0, [ '<25>{#p/sans}* 嘿，你要去哪，小子？' ], [ '<25>{#p/sans}* 回来。' ]),
      crossword4b: pager.create(0, [ "<25>{#p/sans}* 你认真？\n* 也没那么难吧。" ], [ '<25>{#p/sans}* 你认真？' ]),
      crossword5a: [
         '<25>{#p/sans}* 感谢你为了安抚我兄弟\n  回答说“数独更难”。',
         '<25>{#f/4}* 昨天他还试图“破解”\n  星象图，结果被难住了呢。'
      ],
      crossword5b: [
         '<25>{#p/sans}* papyrus...\n* ...他总会在令人\n  意想不到的地方碰壁。',
         '<25>{#f/4}* 昨天他还试图“破解”\n  星象图，结果被难住了呢。'
      ],
      crossword6a: [
         "<25>{#p/sans}{#f/3}* 我早就料到\n  你会直接跳过的。",
         "<25>{#f/0}* 这不就是你碰到谜题时\n  常用的伎俩么？"
      ],
      crossword6b: [
         "<25>{#p/sans}{#f/3}* 挺惊讶的。\n* 我以为你会看都不看一眼\n  直接跳过。",
         "<25>{#f/2}* 也许，你还没有烂到骨子里。"
      ],
      crossword6c: [ '<25>{#p/sans}{#f/2}* heheh, made you look.' ],
      crossword6d: [
         "<25>{#p/sans}{#f/3}* 挺惊讶的。\n* 我以为你压根不感兴趣。",
         "<25>{#f/2}* 也许，你还没有烂到骨子里。"
      ],
      doggo1: [
         '<32>{#p/basic}* 好像有啥动了下？\n* 是我的错觉吗？',
         '<32>* 如果确实有什么在动...\n* 比如说，一个人类...',
         "<32>* 我绝不会让他\n  再从我眼皮子底下溜走！"
      ],
      doggo2: [
         [
            "<32>{#p/basic}* 有什么没-没-没在动的东西...\n* 摸-摸-摸了我...！",
            "<32>* 我得吃点狗粮压压惊。"
         ],
         [ '<32>{#p/basic}* 啊？不-不-不知道从哪\n  突然冒出来了个扳手！？！？', '<32>{#p/basic}* ...真是奇妙的一天！' ],
         [],
         [
            '<32>{#p/basic}* 有-有个人类突-突然过来...\n  揍了我一顿...！',
            "<32>{#p/basic}* 我...\n* 我去休息了。"
         ]
      ],
      doggo3: pager.create(
         0,
         [ '<32>{#p/basic}* 你好？\n* 有人在吗...？' ],
         [ '<32>{#p/basic}* 你俩是在整我吗？\n* 真好笑啊，伙计。' ],
         [ '<32>{#p/basic}* 大块头？\n* 是你吗？\n* 拜托...' ],
         [ "<32>{#p/basic}* 嗯，看来并不是那个\n  高个子骷髅...\n* 他太吵了。" ],
         [ '<32>{#p/basic}* 我不管你是谁，赶紧停下！！！' ],
         [ '<32>{#p/basic}* ...' ]
      ),
      doggo3x: [ '<32>{#p/basic}* (Snore... snore...)' ],
      drop_chip: [
         '<32>{#p/basic}* 你刚刚是不是...\n  把我给你的芯片给扔了？',
         '<32>* 我真无语了...\n* 给我滚！'
      ],
      drop_cream: [ "<32>{#p/basic}* You know, you're lucky I'm busy advertising." ],
      eat_chip: [
         '<32>{#p/basic}* 你刚刚是不是...\n  把我给你的芯片给吃了？',
         '<32>* 我真无语了...\n* 给我滚！'
      ],
      eat_cream: [ '<32>{#p/basic}* 很开心你可以畅享冰意灵！\n* 非常开心！' ],
      genotext: {
         asriel1: () =>
            [ [ '<25>{#p/asriel2}{#f/9}* 跟我走就行。' ], [ '<25>{#p/asriel2}{#f/16}* 走吧。' ] ][
               Math.min(SAVE.flag.n.ga_asriel1++, 1)
            ],
         asriel2: () =>
            [
               [ "<25>{#p/asriel2}{#f/2}* 哎，前面站着的，\n  不是伟大的Papyrus吗？" ],
               [ '<25>{#p/asriel2}{#f/3}* 嗯... 再来一次吧。' ]
            ][Math.min(SAVE.flag.n.killed_sans, 1)],
         asriel3: () =>
            [
               [ "<25>{#p/asriel2}{#f/1}* 咱们去做个“自我介绍”，\n  怎么样？" ],
               [ '<25>{#p/asriel2}{#f/4}* 你知道该干什么。' ]
            ][Math.min(SAVE.flag.n.killed_sans, 1)],
         asriel4: [ '<25>{*}{#p/asriel2}{#f/5}* 哈喽！{^5}{%}' ],
         asriel5: [ '<18>{*}{#p/papyrus}{#f/1}干啥- {%}' ],
         asriel6: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/13}* 嘿... $(name)...',
                  '<25>{#f/17}* 要不，从现在开始\n  你来动手吧？',
                  "<25>{#f/15}* 我... 我没事，真没事。",
                  "<25>{#f/16}* 我只是觉得，\n  干这活，你比我更擅长...",
                  "<25>{#f/17}* 对，就是这个原因！\n* 这种事，肯定你来做更合适。"
               ],
               [ "<25>{#p/asriel2}{#f/16}* 呃，好吧。\n* ...之后你来动手。" ],
               [ '<25>{#p/asriel2}{#f/15}* 那么... 前进吧？' ],
               [ '<25>{#p/asriel2}{#f/15}* ...' ]
            ][Math.min(SAVE.flag.n.ga_asriel6++, 3)],
         asriel9: [ "<25>{#p/asriel2}{#f/8}* 嘘，等一下，\n  看看他会做些什么。" ],
         asriel10: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/15}* 哇，\n  Papyrus这么颓废的样子...',
                  "<25>{#f/16}* 我真是头一次见到。",
                  '<25>{#f/13}* 嘿，$(name)...',
                  "<25>{#f/1}* 我感觉接下来有好戏看了。"
               ],
               [ '<25>{#p/asriel2}{#f/16}* 真是可怜。' ]
            ][Math.min(SAVE.flag.n.ga_asriel10++, 1)],
         asriel17: () =>
            [ [ "<25>{#p/asriel2}{#f/16}* 天呐，$(name)...\n  有些怪物就是听不懂话。" ], [ '<25>{#p/asriel2}{#f/4}* 切。' ] ][
               Math.min(SAVE.flag.n.ga_asriel17++, 1)
            ],
         asriel24: () =>
            [ [ '<25>{#p/asriel2}{#f/4}* 真是浪费时间。' ], [ '<25>{#p/asriel2}{#f/3}* 呵呵。' ] ][
               Math.min(SAVE.flag.n.ga_asriel24++, 1)
            ],
         asriel26: () =>
            [
               [
                  "<26>{#p/asriel2}{#f/3}* 好了，那群蠢狗\n  已经全军覆没了。",
                  '<26>{#p/asriel2}{#f/4}* 再过一座桥，就到小镇了。',
                  '<25>{#f/1}* ...跟我来。'
               ],
               [ '<25>{#p/asriel2}{#f/3}* 我们去镇上。' ]
            ][Math.min(SAVE.flag.n.ga_asriel26++, 1)],
         asriel28: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* 好，$(name)，\n  现在整个镇子都是你的了。",
                  "<25>{#f/7}* 而我要去忙点别的事，\n  之后会派上用场。",
                  "<25>{#f/1}* 别担心，我去去就回。"
               ],
               [ '<25>{#p/asriel2}{#f/1}* 镇子出口见。' ]
            ][Math.min(SAVE.flag.n.ga_asriel28++, 1)],
         asriel29: () =>
            [
               SAVE.data.b.papyrus_secret
                  ? [
                       '<25>{#p/asriel2}{#f/2}* 嘻。\n* 嘻。\n* 嘻....',
                       "<25>{#f/10}* ...等等，Papyrus在哪？",
                       '<25>{#f/10}* ...',
                       "<25>{#f/4}* 天呐，$(name)，\n  没想到你下手这么快。"
                    ]
                  : [
                       '<25>{#p/asriel2}{#f/2}* 嘻。\n* 嘻。\n* 嘻....',
                       "<25>{#f/1}* 天呐，那个蠢骨头\n  那么想原谅你...",
                       '<25>{#f/13}* 最后还是尝到了仁慈的后果。',
                       "<25>{#f/16}* 不过，先别管他了。",
                       "<25>{#f/1}* 一会，咱们还要拉长线，\n  钓大鱼呢。"
                    ],
               [ '<25>{#p/asriel2}{#f/13}* 哎呀，这蠢骷髅\n  又白白送死了。' ],
               [
                  "<25>{#p/asriel2}{#f/13}* 俗话说，好铁要经三回炉。",
                  '<25>{#f/16}* 但很遗憾，他一回就不行了。'
               ],
               [
                  "<25>{#p/asriel2}{#f/6}* 你已经杀了他四次了。",
                  "<25>{#f/8}* 看来你很享受这种快感啊..."
               ],
               [ '<25>{#p/asriel2}{#f/15}* 又来...？' ]
            ][Math.min(SAVE.flag.n.ga_asriel29++, 4)],
         asriel30: () => [
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#f/1}* 哈喽，Asriel。',
            '<25>{#f/2}* ...',
            '<25>{#f/3}* 我们谈一下吧。',
            ...[
               [
                  '<25>{#p/asriel2}{#f/6}* 谈谈？\n* 跟你有什么好谈的？',
                  '<25>{#f/6}* 还有，你怎么在这？',
                  "<25>{#f/7}* 既然早晚我都要\n  把你送到阎王跟前...",
                  '<25>{#f/8}* 那不如... {%15}'
               ],
               [
                  "<25>{#p/asriel2}{#f/8}* 你想谈谈？\n* 别来浪费我的时间。",
                  "<25>{#f/6}* 放个全息投影，还想蒙我？",
                  '<25>{|}{#p/asgore}{#f/5}* 你怎么- {%}',
                  '<25>{#p/asriel2}{#f/1}* 少问。'
               ]
            ][Math.min(SAVE.flag.n.ga_asriel30x, 1)]
         ],
         asriel30a: [
            '<25>{#p/asriel2}{#f/8}* 开玩笑吗？\n* 这只是个全息投影？',
            '<25>{#f/6}* 我知道你是个懦夫，\n  可你竟然还能怂出个新境界。'
         ],
         asriel30b: [
            '<25>{#p/asgore}{#f/1}* 你就没有更重要的事可做吗？',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{|}{#p/asgore}{#f/3}* 听着，儿子，我只是- {%}',
            "<25>{#p/asriel2}{#f/7}* 我不是你儿子。\n* 我早就不是你儿子了。",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/1}* 好吧，Asriel。\n* 你知不知道自己\n  正变成什么样？',
            "<25>{#f/2}* 铁石心肠，罪不可赦...",
            "<25>{#p/asriel2}{#f/8}* 哼，别装的好像\n  你很在乎我似的，爹。",
            '<25>{#p/asgore}{#f/5}* ...',
            '<25>{#p/asriel2}{#f/9}* 不好意思，\n  刚不该叫你“爹”的，\n  Asgore。',
            '<25>{#f/1}* 真是抱歉。',
            '<25>{#p/asgore}{#f/3}* ...\n* 开玩笑吧...',
            '<25>{#f/5}* 好好想想你的所作所为，\n  这可不是为了我们...',
            '<25>{#f/6}* 是为了你好！',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{#p/asriel2}{#f/7}* ...让我缓缓。',
            "<26>{#f/6}* 显然你来这只是想气我。",
            '<25>{#p/asgore}{#f/3}* ...',
            '<25>{#p/asriel2}{#f/6}* ...',
            '<25>{#p/asgore}{#f/7}* 你得意识到\n  你的选择是有份量的！',
            "<25>{#p/asriel2}{#f/15}* 不然？\n  没份量不就飘起来了吗？\n  谁还看得到？",
            "<25>{#f/16}* $(name)，我们走。\n  我受够他了。"
         ],
         asriel30c: [ '<25>{*}{#p/asgore}{#f/8}* Asriel，求你别走！\n* 我只是想帮你！{^999}' ],
         asriel30d: () =>
            [
               [ '<25>{#p/asriel2}{#f/3}* 做好准备，$(name)。', "<26>{#f/4}* 这儿可是Undyne的地盘。" ],
               [ '<25>{#p/asriel2}{#f/4}* 带路吧。' ]
            ][Math.min(SAVE.flag.n.ga_asriel30d++, 1)],
         papyrusSolo1a: [
            '<18>{#p/papyrus}{#f/31}SANS？\n那是个人类吗？',
            "<18>{#f/5}应该是的吧？",
            '<18>{#f/32}捏...\nUNDYNE总算会...',
            "<18>{#p/papyrus}{#f/31}我能加入皇家卫队了...",
            "<18>{#f/5}你会以我为荣的吧？",
            "<25>{#p/asriel2}{#f/3}* 你骗不了自己的，Papyrus。\n* 他已经死了。",
            '<18>{|}{#p/papyrus}{#f/5}可是- {%}',
            "<25>{#p/asriel2}{#f/3}* 够了。\n* 你再怎么使劲呼唤，\n  他也听不见的。", 
            "<18>{#p/papyrus}{#f/6}不会的...\nSANS他...",
            '<18>{#f/31}他向我承诺过的...',
            "<25>{#p/asriel2}{#f/8}* 那个蠢骨头\n  要能遵守承诺就怪了。",
            "<26>{#f/9}* 虽然我也不比他好到哪儿去。", 
            '<18>{#p/papyrus}{#f/31}...',
            "<18>{#f/3}对不起。\n我得走了..."
         ],
         papyrusSolo2a: [
            '<18>{#p/papyrus}{#f/31}唉，我刚从\nUNDYNE那回来...',
            '<18>{#f/31}她说国王找你有事。',
            '<25>{#p/asriel2}{#f/6}* ...',
            '<18>{#p/papyrus}{#f/3}他原话是\n“我想见见我儿子”。',
            '<18>{#f/7}...',
            
            "<18>{#f/7}我们的王子竟然\n杀了我兄弟，\n真是难以置信！",
            '<25>{|}{#p/asriel2}{#f/8}* 其实你才是我们原本想- {%}',
            '<18>{#p/papyrus}{#f/7}真是够了！！',
            '<18>{#f/7}你出卖集体，背叛同胞！',
            '<18>{#f/7}为了啥呢！？',
            '<18>{#f/7}就为了取悦自己吗？',
            "<25>{#p/asriel2}{#f/16}* 对啊，Papyrus。\n* 就是因为这么做很爽。",
            '<18>{#p/papyrus}{#f/7}扯淡！！！',
            '<18>{#p/papyrus}{#f/4}还有你，人类...',
            "<18>{#f/7}别以为我不知道\n事态会怎么发展。",
            "<18>{#f/7}显而易见，你才是主谋。",
            '<25>{#p/asriel2}{#f/8}* 你真有眼力。',
            '<25>{#f/7}* 眼下我们是不是该\n  就地投降才好呢？',
            '<18>{#p/papyrus}{#f/31}...',
            '<25>{#p/asriel2}{#f/4}* 先说明了，你这股努力的劲儿\n  确实令我佩服。',
            "<25>{#f/3}* 但我们自有打算。",
            "<18>{#p/papyrus}{#f/4}你要知道，UNDYNE可能\n正盯着我们呢。",
            '<25>{#p/asriel2}{#f/3}* 你想说什么？',
            "<25>{#f/4}* ...告诉你，Papyrus，\n  你和其他人做什么，\n  跟我们都毫无关系。",
            '<25>{#f/1}* 只要在一起，\n  谁都无法把我们分开。',
            '<18>{#p/papyrus}{#f/7}...我呸！！'
         ],
         papyrusSolo3: [ '<25>{#p/asriel2}{#f/3}* 哈喽！' ],
         papyrusSolo3a: () => [
            '<18>{#p/papyrus}{#f/31}你知道吗...',
            '<18>{#f/31}我偶然听到ALPHYS博士\n自言自语...',
            '<18>{#f/5}从她的话中我听到个词，\n好像是“时间回溯”？',
            "<18>{|}{#f/32}{#x1}我不确定，但好像你们- {%}",
            '<25>{#p/asriel2}{#f/6}* 没门。',
            '<18>{|}{#p/papyrus}{#f/6}但她说了你们能- {%}',
            ...(SAVE.flag.n.genocide_milestone < 5
               ? [ '<25>{#p/asriel2}{#f/6}* 没门。' ]
               : SAVE.flag.n.genocide_milestone < 6
               ? [ "<25>{#p/asriel2}{#f/6}* 没门，不过我要是那么做的话\n  她会很高兴的。" ]
               : [ "<25>{#p/asriel2}{#f/6}* 没门，反正她最后\n  也要跟着去见阎王。" ]),
            '<18>{#p/papyrus}{#f/31}可是，假如你真能\n回溯时间，抹掉过去...',
            '<18>{#f/5}为什么不去试试呢？',
            "<18>{#f/31}下一条时间线里，\n让-让我代他去死。",
            "<18>{#f/3}那样，他就能活下来了，\n对吧？",
            "<25>{#p/asriel2}{#f/6}* ...\n* 跟你说，我早就看过\n  那条线了。",
            "<25>{#f/7}* 无聊至极。",
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/6}那么，我给你看看\n这个谜题吧？',
            '<18>{#f/32}说不定，\n它能让你不那么无聊...',
            '<25>{#p/asriel2}{#f/15}* ...',
            '<25>{#p/asriel2}{#f/15}* 你要是喜欢这么做的话，\n  那就随你的便。',
            '<18>{#p/papyrus}哦，哦！',
            "<18>{#f/0}太好了！！",
            "<18>{#f/0}你开始改变想法了！",
            '<25>{#p/asriel2}{#f/8}* ...',
            '<18>{#p/papyrus}{#f/6}...',
            '<18>{|}{#f/5}那么，规则是这样的- {%}',
            '<25>{#p/asriel2}{#f/7}* 我们早就知道了，蠢货。',
            '<18>{#p/papyrus}{#f/31}...哦...',
            '<18>{#f/6}呃，好吧！！\n那我就不解释了...',
            "<18>{#f/9}看看我们的\n随机数字是多少吧！！"
         ],
         papyrusSolo4a: [
            '<18>{#p/papyrus}{#f/3}ASRIEL。',
            '<25>{#p/asriel2}{#f/6}* Papyrus。',
            '<18>{#p/papyrus}{#f/31}...',
            '<18>{#f/31}为什么？',
            '<18>{#f/31}为什么你要这么做？',
            "<18>{#f/3}一个怪物不应该\n会变成这样啊...",
            "<18>{#f/5}你的爱去哪了？\n你的同情心去哪了？",
            '<18>{#f/31}你的... 仁慈...',
            '<25>{#p/asriel2}{#f/2}* ...\n* 哦，您可真是\n  文曲星下凡啊...',
            '<25>{#f/1}* 在我的灵魂中，\n  这些东西早就化为乌有了。',
            "<18>{#p/papyrus}{#f/31}但...\n我不明白...",
            '<18>{#f/5}一个有着这般\n纯洁心灵的怪物...',
            '<18>{#f/31}...怎么会\n彻底堕入黑暗呢？',
            '<25>{#p/asriel2}{#f/1}* 你真想知道吗？',
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/3}对...',
            '<25>{#p/asriel2}{#f/10}* 你确实是真心想知道吗？',
            '<18>{#p/papyrus}{#f/31}对。',
            '<25>{#p/asriel2}{#f/3}* 说大点声。',
            '<18>{#p/papyrus}{#f/5}对！',
            '<26>{#p/asriel2}{#f/1}* 对我说，洋求我\n  把梅说的都告诉你。',
            '<18>{#p/papyrus}{#f/7}好！洋求你把梅说的\n都告诉我吧！该死！',
            '<25>{#p/asriel2}{#f/1}* 嘻嘻嘻...',
            "<25>{#f/1}* 那好，就让我来告诉你吧。",
            "<25>{#f/15}* 其实答案很简单...",
            '<18>{#p/papyrus}{#f/4}我的天哪，快说吧...'
         ],
         papyrusSolo4b: [
            '<25>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* $(name)。{%100}',
            '<18>{#p/papyrus}{#f/32}...！',
            '<25>{#p/asriel2}{#f/5}* 哈！\n* 哈哈哈！\n* 看看你什么表情！'
         ],
         papyrusSolo4c: [ '<18>{#p/papyrus}{#f/31}我...', '<18>{#f/3}...不...' ],
         papyrusSolo4d: [
            "<18>{#p/papyrus}{#f/7}不，你错了。",
            "<18>{#f/7}一直想方设法把我击垮的，\n是你。",
            "<18>{#f/7}那个满嘴谎话的，还是你。",
            '<18>{#f/9}但是我，PAPYRUS...',
            '<18>{#f/9}总算认清了{@fill=#f00}真相{@fill=#fff}。',
            "<25>{#p/asriel2}{#f/13}* 哦？\n* 真相是什么呢？"
         ],
         papyrusSolo4e: [ "<18>{#p/papyrus}{#f/34}你才不是{@fill=#f00}ASRIEL{@fill=#fff}。" ],
         papyrusSolo4f: [
            '<18>{#f/5}{@fill=#f00}ASRIEL{@fill=#fff}绝不可能\n干出这种事！',
            '<18>{#f/31}因为，{@fill=#f00}ASRIEL{@fill=#fff}心地善良，',
            '<18>{#f/5}信赖同胞...',
            '<18>{#f/31}比谁都相信人类！',
            '<18>{#f/4}而你呢...',
            '<18>{#f/7}你不过是个为了\n一己私欲利用人类的\n卑鄙小人！',
            "<18>{#f/4}我告诉你，\n你爱说啥就说啥，\n我不在乎。",
            '<18>{#f/9}但是，我还相信着\n那个人类。',
            "<25>{#p/asriel2}{#f/8}* 哼，你要真这么信任他...",
            '<25>{#f/7}* 那就证明给我看看。',
            "<25>{#f/3}* 我会离开一会，\n  让你俩单独对峙。",
            "<25>{#f/3}* 他要是饶恕你，\n  那我就认栽。",
            '<25>{#f/4}* 否则，他要是\n  “不小心”杀了你...',
            "<25>{#f/1}* 你就知道你大错特错了。\n  而那个懒骨头死得就\n  一文不值。",
            '<25>{#f/1}* 这主意如何？',
            '<18>{#p/papyrus}{#f/9}...\n我接受。',
            '<25>{#p/asriel2}{#f/3}* 那可太好了。',
            '<25>{#f/4}* 永别了。'
         ]
      },
      houz: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (You place your hands on the heavily scratched door.)' ]
            : [ '<32>{#p/basic}* 门上布满了猫的抓痕。' ],
      gonezo: () =>
         world.bulrun ? [ '<32>{#p/basic}* ...但是大家都逃走了。' ] : [ '<32>{#p/basic}* ...但是谁也没有来。' ],
      garbanzo: [ '<32>{#p/human}* (But there was nobody around to occupy the seat.)' ],
      doggonopoggo: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (But there was nobody here.)' ]
            : (game.room === 's_doggo' && SAVE.data.n.state_starton_doggo === 2) || // NO-TRANSLATE

              (game.room === 's_dogs' && SAVE.data.n.state_starton_dogs === 2) || // NO-TRANSLATE

              (game.room === 's_pacing' && SAVE.data.n.state_starton_lesserdog === 2) // NO-TRANSLATE

            ? [ '<32>{#p/basic}* ...但是谁也没有来。' ]
            : [ "<32>{#p/basic}* 没人在家。" ],
      housebloc: () =>
         SAVE.data.b.svr ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ] : [ "<32>{#p/basic}* 锁住了。" ],
      innkeep1a: pager.create(
         0,
         () => [
            "<32>{#p/basic}{#npc/a}* 欢迎来到星光旅馆！\n* 星港的一流旅馆！",
            '<32>* 每住宿一晚花费60G。',
            choicer.create('* （订一间房吗？）', "订", "不订")
         ],
         () => [
            '<32>{#p/basic}{#npc/a}* 改变主意了吗？',
            '<32>* 记住了，一个晚上60G。',
            choicer.create('* （订一间房吗？）', "订", "不订")
         ]
      ),
      innkeep1b: pager.create(
         0,
         () => [
            '<32>{#p/basic}{#npc/a}* 又回来了吗？\n* 记住，一个晚上60G。',
            choicer.create('* （再订一间房吗？）', "订", "不订")
         ],
         () => [ '<32>{#p/basic}{#npc/a}* 改变主意了吗？', choicer.create('* （再订一间房吗？）', "订", "不订") ]
      ),
      innkeep1c: pager.create(
         0,
         () => [
            '<33>{#p/basic}{#npc/a}* Back again?\n* Well, stay as long as you like!',
            choicer.create('* （再订一间房吗？）', "订", "不订")
         ],
         () => [ '<32>{#p/basic}{#npc/a}* 改变主意了吗？', choicer.create('* （再订一间房吗？）', "订", "不订") ]
      ),
      innkeep2a: [
         "<32>{#p/basic}{#npc/a}* ... you don't even have 60G?",
         "<32>* Oh! You poor thing.\n* I can only imagine what you've been through.",
         '<32>* One of the rooms upstairs is empty, you can sleep there for free, okay?'
      ],
      innkeep2b: [ "<32>{#p/basic}{#npc/a}* 这是你的房间钥匙。\n* 小心别着凉！" ],
      innkeep2c: [ "<32>{#p/basic}{#npc/a}* Sorry, you don't have enough G..." ],
      innkeep3a: [ '<32>{#p/basic}{#npc/a}* 您好呀！\n* 您看起来睡得很舒服。' ],
      innkeep3b: [ '<32>* 挺不可思议的...\n* ...因为您在上面\n  只待了几分钟。' ],
      innkeep3c: [ '<32>* Feel free to come back if you get tired.' ],
      innkeep3d: [ "<32>* 我把钱退给您。\n* 想过夜的话，可以再付给我哦。" ],
      innkeep4: [ "<32>{#p/basic}{#npc/a}* 现在还不困？\n* 没关系，只要您需要，\n  我随时为您服务！" ],
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
         [ "<25>{#p/kidd}{#f/1}* 怎么了吗？" ],
         [ '<25>{#p/kidd}{#f/1}* 哟，近来可好？' ],
         [ '<25>{#p/kidd}{#f/1}* 嘿，嘿！' ],
         [ '<25>{#p/kidd}{#f/1}* 很高兴见到你，哈哈。' ],
         [ "<25>{#p/kidd}{#f/1}* 哇，老兄，怎么了吗？" ]
      ),
      kidd2: pager.create(
         0,
         () =>
            game.room === 's_town1' // NO-TRANSLATE

               ? [
                    "<25>{#p/kidd}{#f/1}* 哟，你也是个孩子，\n  对吧？",
                    "<25>{#p/kidd}{#f/1}* 我看得出来，\n  因为你穿着条纹衫。"
                 ]
               : [
                    '<25>{#p/kidd}{#f/7}* 等下，你也读书的吗！？',
                    '<25>{#p/kidd}{#f/1}* 那个图书倌教会了我所有\n  关于怪物历史的知识！',
                    "<25>{#p/kidd}{#f/3}* 我无法想象在一颗星球上\n  生活会怎么样..."
                 ],
         () =>
            game.room === 's_town1' // NO-TRANSLATE

               ? [ '<25>{#p/kidd}{#f/1}* 我寻思着那个矮个子骷髅\n  有没有成年。' ]
               : [ '<25>{#p/kidd}{#f/3}* 你有在星球上生活过吗？' ]
      ),
      marriage1: [
         "<32>{#p/basic}* 什么味道？\n* （哪里来的气味？）",
         "<32>* 如果你是这个味道...\n* （...证明你的气味！）"
      ],
      marriage2: [
         "<32>{#p/basic}* 嗯...\n* 这就是那个奇怪的味道。",
         '<32>* 这气味让我想把它消灭掉...',
         '<32>* （...把你消灭掉！）'
      ],
      marriage3a: [
         '<32>{#p/basic}* 狗狗可以摸其它狗狗？？？\n* （一扇新世界的大门\n  向我们敞开了...）',
         '<32>* 谢谢你，怪狗狗！'
      ],
      marriage3b: [
         '<32>{#p/basic}* Weird smells can bring good things...\n* (Friendly fun fetch!)',
         '<32>* Thanks, weird smell!\n* (It sure was fun to catch a \"wrench\" in the works!)'
      ],
      marriage3c: [
         "<32>{#p/basic}* 闻东西越来越费劲了...\n* （感觉自己快瞎了...）",
         "<32>* 咱们快逃吧！"
      ],
      marriage3d: [
         '<32>{#p/basic}* That weird puppy came out of nowhere...\n* (Almost killed us...)',
         "<32>* 咱们快逃吧！"
      ],
      marriage3e: [
         "<32>{#p/basic}* Dogs can pet AND play fetch with other dogs???\n* (It's almost criminal...)",
         '<32>* Thanks, weird puppy!\n* (After this, our lives will never be the same!)'
      ],
      marriage4: [
         "<32>{#p/basic}* 王子在哪？\n* （没走错路吧？）",
         '<32>* 必须阻止那个恶魔...\n* （...还有他的人类帮凶！）'
      ],
      marriage5: [ '<32>{#p/basic}* 呃...\n* 他们在这...', "<32>* （抓住他们！）" ],
      maze1: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}{#f/0}* 欢迎回来。',
                 "<25>{#p/sans}{#f/3}* 真是太遗憾了...",
                 "<25>{#p/sans}{#f/2}* 这个谜题\n  papyrus精心准备了好久...\n* 但现在他有事，来不了了。",
                 "<25>{#p/sans}{#f/0}* 不过，没关系。",
                 "<25>{#p/sans}{#f/0}* 我答应过他，会让你解谜的。\n* 那么，开始吧。"
              ]
            : [
                 '<18>{#p/papyrus}哦吼，\n那个人类来了！',
                 '<18>我和我的兄弟\n制造了一些谜题。',
                 '<18>{#f/9}你准备好接受\n挑战了吗，人类！？',
                 choicer.create('* （你要怎么回答？）', "准备好了", "没准备好"),
                 '<18>{#p/papyrus}回答正确！\n因为你也看到了...'
              ],
      maze2a: [
         '<18>{#x4}{#f/9}从来没有一个工匠\n做的陷阱可以跟我的\n相提并论！',
         "<18>{#f/0}可以让人无法抗拒！",
         "<25>{#x1}{#p/sans}{#f/2}* 也许你才是那个让人\n  无法抗拒的人。",
         '<18>{#p/papyrus}{#f/1}真的吗！？'
      ],
      maze2b: [
         '<18>{#x4}{#f/9}没有人类能解开由\n伟大的PAPYRUS\n所制作的谜题！',
         '<25>{#x1}{#p/sans}{#f/4}* 也没人有机会去解，兄弟。',
         "<18>{#p/papyrus}{#x3}{#f/7}呃啊，这不是重点！！"
      ],
      maze3: [ '<18>{#x1}{#f/0}不论如何，\n我把这个谜题叫做...' ],
      maze3a: [
         '<18>“火焰之墙”！！',
         '<25>{#p/sans}* 你直接叫它“火墙”\n  不就行了吗？\n* 这样多省事。',
         "<18>{#p/papyrus}{#f/4}ALPHYS博士肯定会说\n你乱用这个词了。",
         "<25>{#p/sans}* 这我不清楚，兄弟。\n  不过，博士真的超级喜欢\n  这个谜题。",
         "<30>{#f/2}* 毕竟... 这东西多让人\n  {@fill=#ff0}热{@fill=#fff}血沸腾啊。"
      ],
      maze4: [ '<18>{#p/papyrus}{#x3}{#f/7}别说了，SANS！！' ],
      maze5: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}{#f/0}* 这是“火墙”。',
                 "<25>{#p/sans}{#f/2}* 把它联想成\n  电脑的“防火墙”就行。",
                 '<25>{#p/sans}* 到达对面，你就过关了。',
                 '<25>{#p/sans}* 很简单，对吧？',
                 "<25>{#p/sans}{#f/3}* 不过，我之前亲自尝试过\n  这个谜题，只能说...",
                 "<25>{#p/sans}{#f/2}* 它可没你想得那么简单。"
              ]
            : [
                 '<18>{#p/papyrus}...总之，\n这个谜题背后的想法\n其实非常简单。',
                 '<18>因为你应该做的...',
                 '<18>{#f/9}只有成功到达另一边！！',
                 '<18>{#f/0}祝你好运！！\n捏嘿嘿！！'
              ],
      maze6: pager.create(
         0,
         () =>
            world.edgy
               ? [
                    '<25>{#p/sans}{#f/0}* 嗯？你要回哪去？',
                    '<25>{#p/sans}{#f/3}* 试试嘛，\n  起码配合一下。'
                 ]
               : [ "<18>{#p/papyrus}{#x2}{#f/7}你往哪里走呢！？" ],
         () => (world.edgy ? [ '<25>{#p/sans}{#f/0}* 真要走？' ] : [ '<18>{#p/papyrus}{#x2}{#f/7}快回来！！' ])
      ),
      maze7: [
         [
            '<18>{#p/papyrus}你是怕火吗？？',
            "<18>{#f/4}不用担心，\n这火其实烧不到你。",
            '<18>{#f/0}就像SANS说的那样，\n那些火仅仅是\n“令人愉快的温暖”。',
            '<25>{#p/sans}* 事实上，这句话是我\n  从一个朋友那学来的。',
            '<18>{#p/papyrus}{#f/4}...哦。'
         ],
         [
            '<18>{#p/papyrus}你在担心解不了谜题吗？？',
            "<18>如果是那样的话，\n那你一定得知道...",
            '<18>{#x4}{#f/9}我，伟大的PAPYRUS，\n不会因此而评判你！',
            '<18>{#f/0}就像每个明星大厨\n都知道的那样，\n心意是最重要的。',
            '<18>{#x1}所以，来吧，\n尽力就好！'
         ],
         [
            '<18>{#p/papyrus}{#f/4}（SANS，那个人类\n在干什么啊？？）',
            '<25>{#p/sans}* 可能在研究路线吧。',
            '<18>{#p/papyrus}{#f/4}（哦，确实。）',
            '<18>{#f/9}那样的话，\n准备好了就前进吧！'
         ]
      ],
      maze8: () =>
         world.edgy
            ? [ '<25>{#p/sans}{#f/0}* 哎呀，真可惜。\n* 不过别灰心。' ]
            : [
                 '<18>{#p/papyrus}捏嘿嘿！\n那好吧。',
                 "<18>{#f/9}看来你被\n伟大的PAPYRUS戏弄了！",
                 '<18>{#f/0}但别担心！',
                 '<18>你也看到了，\n我的陷阱可不差。',
                 "<18>{#f/9}你不能因为轻易失败\n就受到指责！！"
              ],
      maze9: () =>
         world.edgy
            ? [ "<25>{#p/sans}{#f/0}* 不错嘛。\n* 没看出来，你还挺机灵的。" ]
            : [
                 '<18>{#p/papyrus}{#f/1}啥！？',
                 '<18>{#f/7}你咋做到的！？！？',
                 '<18>这谜题是个人都过不去啊！',
                 '<18>{#f/9}...哎呀，行吧！\n我得快点布置自己的谜题了！'
              ],
      maze10: () =>
         world.edgy
            ? [
                 "<25>{#p/sans}{#f/0}* 好了，谜题结束了。",
                 '<25>{#p/sans}{#f/3}* ...总之，感谢游玩。',
                 "<25>{#p/sans}{#f/0}* 现在，\n  我要去准备下个谜题。",
                 "<25>{#p/sans}{#f/2}* 待会见。"
              ]
            : [
                 '<18>{#f/4}无论如何...',
                 '<18>{#f/0}我很期待\n接下来的发展！',
                 '<18>{#f/4}一个令人\n十分困惑的谜题...',
                 "<18>{#f/1}连TERRESTRIA自己\n都解决不了！！",
                 "<25>{#p/sans}* terrestria？\n* 是那个在世\n  最长寿的怪物吗？",
                 '<18>{|}{#p/papyrus}{#f/1}呃...\n是这样没错，但- {%}',
                 "<25>{#p/sans}* 妈呀，我都不知道\n  原来你对我的评价这么高。",
                 '<18>{#p/papyrus}{#f/4}啥。',
                 "<25>{|}{#p/sans}* 就是说，\n  如果连她都解不了，\n  那- {%}",
                 '<18>{#p/papyrus}{#f/7}{#x3}我懂你的意思了！！'
              ],
      maze11: [ '<18>{#p/papyrus}{#f/7}SANS，\n我们还有谜题要准备呢！！', '<18>快来吧！' ],

      nicecreamSc1: [
         "<32>{#p/basic}* 我搞不懂为什么\n  这些东西卖不出去...",
         "<32>* 这可是享受这些东西的\n  绝佳圣地..."
      ],
      nicecreamSc2: () => [
         SAVE.data.n.plot > 20.2
            ? '<32>{#p/basic}* 哦！！！！\n* ...你回来了！'
            : SAVE.data.b.s_state_scorereaction1 || SAVE.data.n.plot === 20.2
            ? "<32>{#p/basic}* 等一下！！！！\n* 也许你会喜欢这些东西！"
            : '<32>{#p/basic}* 哦！！！！\n* 一个顾客！！',
         '<32>* 你好！\n* 想来根冰意灵吗？',
         SAVE.data.b.s_state_million
            ? '<32>* As the top scorer here, you get a handy discount!\n* 6G per Ice Dream!'
            : "<32>* 这可是能点燃你内心的冰冻甜品！\n* 现在只要12G。"
      ],
      nicecreamSc3: () => [
         "<32>{#p/basic}* 冰意灵！\n* 能点燃你内心的冰冻甜品！",
         SAVE.data.b.s_state_million ? '<32>* For you, 6G!' : '<32>* 现在只卖12G。'
      ],
      nicecreamPrompt1: () => [ choicer.create('* （要花$(x)G买冰意灵吗？）', '是', '否') ],
      nicecreamPrompt2: () => [ choicer.create('* (Get an Ice Dream?)', '是', '否') ],
      nicecreamSc4: [
         '<32>{#p/basic}* 那好吧...\n* 告诉你的朋友...',
         "<32>* 在荒郊野外...\n* 有个买冰淇淋的地方..."
      ],
      nicecreamFc1: [ '<32>{#p/basic}* 我换了个地方摆摊，\n  可还是没有顾客...' ],
      nicecreamFc2: [
         "<32>{#p/basic}* 幸运的是，\n  我想到了一个解决方案！！",
         '<32>* 明信片！',
         '<32>* 你每买一根冰意灵，\n  就可以从箱子里\n  拿一张明信片。',
         '<32>* 如果你有了三张明信片，\n  你就可以换一根\n  免费的冰意灵！',
         "<32>* 这些明信片\n  肯定会给我带来回头客的！",
         '<32>* 哦，嗯，\n  你想来根冰意灵吗？',
         "<32>* 这可是能点燃你内心的冰冻甜品！\n* 现在只要10G。"
      ],
      nicecreamFc3a: [
         "<32>{#p/basic}* 冰意灵！\n* 能点燃你内心的冰冻甜品！",
         "<32>* You've got three postcards, would you like to redeem them?"
      ],
      nicecreamFc3b: [
         "<32>{#p/basic}* 冰意灵！\n* 能点燃你内心的冰冻甜品！",
         '<32>* 现在只要10G。'
      ],
      nicecreamFc4: [
         '<32>{#p/basic}* 那好吧...\n* 告诉你的朋友...',
         '<32>* 冰意灵买三赠一...'
      ],
      nicecreamFc5: [ "<32>{#p/basic}* 别忘了从箱子里\n  拿一张明信片！" ],
      nicecreamNoFun1: [ "<32>{#p/basic}* 嗯？\n* 你的口袋里没有\n  空地方了..." ],
      nicecreamNoFun2: [ '<32>{#p/basic}* I wish I could make Ice Dreams easier to store...' ],
      nicecreamNoMun1: [ "<32>{#p/basic}* 嗯？\n* 你的钱不太够..." ],
      nicecreamNoMun2: [ '<32>{#p/basic}* 我也希望\n  做棒冰不用花钱...' ],
      nicecreamFree1: [ '<32>{#p/basic}* 告诉你一个好消息，\n  第一根棒冰，免费送你。' ],
      nicecreamFree2: [ '<32>{#p/basic}* 希望你喜欢...' ],
      nicecreamReturnWithGoods: [ '<32>{#p/basic}* 没关系，\n  你随时都可以回来买。' ],
      nicecreamReturnWithNeeds: [ "<32>{#p/basic}* 哦，没关系的。", '<32>* 晚点再来啊，孩子！' ],
      nicecreamPurchase: [ '<32>{#p/basic}* Here you go!\n* Have a stellar starry night!' ],
      nicecreamGet: [ '<32>{#s/equip}{#p/human}* （你得到了冰意灵。）' ],
      nicecreamK1a: [ '<25>{#p/kidd}{#f/1}* 哟，可以给我来一根\n  冰意灵吗？' ],
      nicecreamK1b: [ "<32>{#p/basic}* 当然没问题，孩子。\n* 只要你有钱的话，" ],
      nicecreamK1c: [ '<25>{#p/kidd}{#f/2}* （嘘，把这个给他。）' ],
      nicecreamK1d: [
         '<25>{#p/kidd}{#f/7}* Yo, they got free Ice Dreams here!?',
         '<25>{#p/kidd}{#f/1}* Get me one too!'
      ],
      nicecreamK2: [ '<32>{#p/basic}* 你... 你是从哪里\n  拿到这个的？' ],
      nicecreamK3a: [ '<32>* 没-没问题，孩子...\n  给你！' ],
      nicecreamK3b: [
         '<32>{#s/equip}{#p/human}* （你把冰意灵递给了怪物小孩。）',
         '<25>{#p/kidd}{#f/7}* 太棒了...'
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
                    "<32>{#p/basic}* 嘿，孩子！\n* 我真的很想给你一根冰意灵，\n  但我已经全卖光了！",
                    '<32>* 生意从来没像今天在这里\n  这么火爆过！',
                    "<32>* 我都要供不应求了！"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? world.population_area('s') < 6 || world.population_area('f') < 6 || world.population < 2 // NO-TRANSLATE

                  ? [ '<32>{#p/basic}* Nothing personal, of course.' ]
                  : [
                       '<32>{#p/basic}* Apparently, he sold his first Ice Dream in the middle of the Starton holo-forest.'
                    ]
               : [ '<32>{#p/basic}* 也许是时候开一家我\n  梦寐以求的“冰意灵”\n  连锁店了...' ]
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
                       "<32>{#p/basic}{#npc/a}* 我听说，如果你在战斗中按住[X]，\n  移动的速度会比正常慢一倍！",
                       '<32>* 我懂... 你觉得没用，是吗？',
                       "<32>* 但我告诉你一个秘密。\n* 那边那条狗... 他巴不得你\n  移动速度快呢。",
                       '<32>* 如果你边按住[X]边靠近他，\n  你就不会被他发现！',
                       '<32>* 嚯嚯嚯... 祝你好运。'
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
                  ? [ "<32>{#p/basic}* 你肯定用得到的。" ]
                  : [ "<32>{#p/basic}* I'm ice cold." ]
         ),
         s_genokid: pager.create(
            0,
            () =>
               world.genocide
                  ? [
                       '<25>{#p/kidd}{#f/3}{#npc/a}* 刚才，有个小孩走过来\n  往我脑袋里插了什么东西。',
                       '<25>{#f/3}* 之后，他就去铸厂了，\n  说要去“增强信号”。',
                       '<25>{#f/4}* ...有些小孩真是奇怪。'
                    ]
                  : [
                       '<25>{#p/kidd}{#f/3}{#npc/a}* 哟，大家都去逃难了。',
                       '<25>{#f/3}* 我说，成年人有时候\n  就是这么蠢，哈哈...',
                       "<25>{#f/1}* 他们难道不知道\n  Undyne会保护我们吗！？"
                    ],
            () =>
               world.genocide
                  ? [ "<25>{#p/kidd}{#f/7}{#npc/a}* 不过，你可不奇怪，\n  而且长得超酷的！" ]
                  : [ "<25>{#p/kidd}{#f/1}{#npc/a}* Undyne就是我们的坚实后盾！" ]
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
                       "<32>{#p/basic}{#npc/a}* 上次发生那样的事之后，\n  Sans又回来了，\n  真让人惊讶。",
                       "<32>* ...实际上，可能也\n  没那么让人惊讶。"
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
                       '<32>{#p/basic}{#npc/a}* 我今天贴了告示\n  招了很多“女孩”。',
                       '<32>* 有人告诉我说\n  漫天群星蕴含着无限可能性...',
                       "<32>* 所以，我很认真地\n  听取了那个建议...",
                       "<32>* 我真的要和一个太空生物\n  卿卿我我了。"
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
                       "<32>{#p/basic}{#npc/a}* 你跟我说话的口气\n  好像你想知道\n  内幕消息似的。",
                       "<32>{#p/basic}{#npc/a}* 抱歉孩子。\n* 看来你只能等下一条新闻了。"
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
                       '<32>{#p/basic}{#npc/a}* 我觉得我可以问问Undyne。\n* 但她好像已经喜欢别人了。'
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Here's hoping another cutie like him comes along..." ]
                  : SAVE.data.n.plot === 33
                  ? [ "<32>{#p/basic}{#npc/a}* 你该不会没有\n  域外网账号吧..." ]
                  : SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* What's an onionsan, anyway?" ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Let me know if you see him...' ]
                  : [ '<32>{#p/basic}{#npc/a}* 我还能找到真爱吗？' ]
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
                       '<32>{#p/basic}{#npc/a}* Sans从第一天起\n  就是这里的常客了。',
                       ...(papreal()
                          ? [
                               '<32>* He usually orders the worst item off the menu...',
                               '<32>* Except for earlier today...',
                               '<32>* ... when he ordered the SECOND worst item off the menu instead.',
                               "<32>* That's something, right?"
                            ]
                          : [
                               '<32>* 他总是点菜单上最难吃的菜，\n  而且从不付账。',
                               '<32>* 不过看在他吸引了\n  这么多其他顾客的份上...',
                               '<32>* Grillby甚至给他特别\n  安排了点东西。',
                               '<32>* ...所以“雅莫万用酱”\n  到底是什么东西？'
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
                       "<32>{#p/basic}{#npc/a}* 嗯...\n* 人类的食物和怪物的\n  应该是不一样的吧？",
                       '<32>* 听说会“变质”什么的。',
                       '<32>* 而且不像怪物的食物一样\n  可以直接转化为能量...',
                       '<32>* 人类的食物必须\n  要先通过他们的身体。',
                       '<32>* 就算在低重力的环境\n  也是这样。',
                       "<32>* 太诡异了。\n* 我找时间也想试试。"
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
                     : [ "<32>{#p/basic}{#npc/a}* 我们身边有这样的人，\n  真是太幸运了。" ]
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
                  : [ '<32>{#p/basic}{#npc/a}* 我还听说他们有\n  叫做“厕所”的东西。' ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* How unfortunate.' ]
                  : SAVE.data.n.plot === 33
                  ? papreal()
                     ? [ '<32>{#p/basic}{#npc/a}* How strange.' ]
                     : [ '<32>{#p/basic}{#npc/a}* 真令人愉快。' ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [ '<32>{#p/basic}{#npc/a}* How... unexpected.' ]
                     : [ '<32>{#p/basic}{#npc/a}* How... delicious.' ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Skeletons are cool.' ]
                  : [ '<32>{#p/basic}{#npc/a}* 人类真奇怪。' ]
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
                       '<32>{#p/basic}{#npc/a}* Sansyyyy...\n* 快回来坐我旁边...！',
                       "<32>* 有你在的时候，\n  一切都那么有-有-有趣..."
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
                       "<32>{#p/basic}{#npc/a}* 不论我去到哪里，\n  看到的都是一样的菜单，\n  遇到的都是一样的人...",
                       "<32>* 服务员！\n* 我想再来点喝的，\n  再来店帅-帅-帅-帅哥！"
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
                  : [ "<32>{#p/basic}{#npc/a}* 我感觉那个酒保\n  就挺帅-帅-帅-帅的..." ]
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
               ? [ '<32>{#p/basic}{#npc/a}* 嘘，我在期待Sans\n  能过来摸摸我们的头。' ]
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
                    '<32>{#p/basic}{#npc/a}* 你最好盯紧了你坐的地方，\n  孩子。',
                    '<32>* 那个大家伙随时都会\n  跳到你的大腿上，\n  给你满满的爱和关注。'
                 ],
         g_dogaressa: () =>
            SAVE.data.b.killed_mettaton
               ? [
                    '<32>{#p/basic}{#npc/a}* (My hubby and I just want everyone to calm down.)',
                    "<32>{#p/basic}{#npc/a}* (Mettaton's death was tragic, but he's just a guy on TV!)"
                 ]
               : SAVE.data.n.plot === 33
               ? [ '<32>{#p/basic}{#npc/a}* （我喜欢Sans。）\n* （有的时候他会在桌子底下\n  喂我们一些残羹剩饭。）' ]
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
                    "<32>{#p/basic}{#npc/a}* （我们是哨兵，\n  但我们从来没得到\n  一点尊重。）",
                    '<32>* （真希望那几个骷髅可以\n  丢几根骨头给我们。）',
                    '<32>* （我们最喜欢骨头了。）'
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
                    '<32>{#p/basic}{#npc/a}* 嗯？\n* 你和Sans什么时候\n  成为朋友了？',
                    "<32>* 我不太喜欢那家伙...",
                    '<32>* 他喜欢一动不动地出现。'
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
                    "<32>{#p/basic}{#npc/a}* 我在考虑把头发留长一点，\n  来彰显我的个性。",
                    '<32>* 它代表着：“请给我一个\n  大大的、温柔的拥抱，\n  搂搂我。”'
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
                       '<32>{#npc/a}* Grillbz说他只让Sans\n  免费吃饭，因为他帮着吸引了\n  其他顾客。',
                       "<32>* 我感觉硬说的话\n  好像还真是这么回事..."
                    ]
                  : [
                       '<32>{#p/basic}* ...\n* ...\n* ...',
                       '<32>{#npc/a}* Grillbz建议你\n  在他把食物扔掉之前\n  把它们带走。'
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
                    '<32>{#npc/a}* 今天店里这么冷清，\n  Grillbz实在很对不起。',
                    "<32>* 我看，那些老主顾可能就是怕了...",
                    '<32>* 怕那个恶霸。\n* 当然喽。'
                 ]
               : [
                    '<32>{#p/basic}* ...\n* ...\n* ...',
                    '<32>{#npc/a}* Grillbz说他是在一本\n  电子杂志上找到他的\n  新颜色的。',
                    "<32>* 我个人还是更喜欢Grillbz\n  原始的那个橘色。\n* 仅个人观点。"
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
                       '<32>{#p/basic}{#npc/a}* Sans当然知道该怎么逗你笑，\n  对吧？',
                       '<32>* 那是肯定的。\n* 这里的账单几乎都是\n  那个骷髅付的。'
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
                       "<32>{#p/basic}{#npc/a}* 首塔的人口越来越多了，\n  所以我听说它们打算\n  搬到这里来。",
                       "<32>* ... who knows?\n* Maybe we'll have room for 'em."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* 首塔的人口越来越多了，\n  所以我听说它们打算\n  搬到这里来。",
                       "<32>* 嗯...\n* 我不想看到我们的\n  地方文化被抹去。",
                       "<32>* 但是教那些城里人\n  我们的生活方式\n  肯定很有趣！"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ "<33>{#p/basic}{#npc/a}* I'm semi-conflicted about this." ]
                  : SAVE.data.n.plot === 33
                  ? [ "<32>{#p/basic}{#npc/a}* 常客？\n* 你说谁，我吗？\n* 不至于，我只能算半个常客。" ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          "<32>{#p/basic}{#npc/a}* Come to think of it, you've inspired me, kid.\n* I'm gonna start a fight club."
                       ]
                     : [ "<32>{#p/basic}{#npc/a}* We'll just have to come up with something new, eh?" ]
                  : [ "<32>{#p/basic}{#npc/a}* 哈，尽管来吧！" ]
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
                       "<32>{#p/basic}{#npc/a}* Sans是皇家哨兵，\n  但别被他的头衔骗了。",
                       '<32>* 大家都知道他\n  坐在全息森林边上\n  读着悬浮车手册。'
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
                       '.',
                       '<32>* Huh?\n* Where are they?\n* Weird...'
                    ]
                  : world.population < 4
                  ? [
                       "<32>{#p/basic}{#npc/a}* 听传言说，有个瞎晃悠的恶霸，\n  路上的人全都被他揍了。",
                       '<32>* 不过我和Grillbz可不打算关店跑路。',
                       "<32>* 区区恶霸，怎能逼得走咱们！"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 那些狗是皇家卫队的成员，\n  是由UNDYNE领导的\n  军事集团。',
                       "<32>* 她粗鲁，吵闹，\n  谁不尊重她，她就揍谁...",
                       "<32>* 难怪所有小孩子都希望\n  长大要像她那样呢！"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* You never know with those rudely rowdy TV hosts.' ]
                  : SAVE.data.n.plot === 33
                  ? [
                       "<32>{#p/basic}{#npc/a}* 别问我他为什么\n  那么做。",
                       "<32>* 不过如果一定要我猜的话，\n  我觉得这和Papyrus有关。"
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
                  : [ '<32>{#p/basic}{#npc/a}* 我长大了也要像UNDYNE那样！\n* 吼吼吼！' ]
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
                       "<32>{#p/basic}{#npc/a}* 这里有一本{@fill=#f00}奇怪的书{@fill=#fff}，\n  它会随机出现和消失...",
                       '<32>* 但那位可爱的女士\n  似乎总是妨碍我去拿！',
                       '<32>* 你知道该怎么样\n  才能把她吓跑吗？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Soon, I tell you.', '<32>* Soon.' ]
                  : [ "<32>{#p/basic}{#npc/a}* 我知道你在想什么。", "<32>* 你别试。" ]
         ),
         l_kakurolady: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* （咳，咳。）',
                       "<32>* This will be our news feed's last issue...",
                       '<32>* Why don\'t we just put a big \"THE END\" on the front and call it a day?'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* （咳，咳。）',
                       '<33>* 我上学的时候，如果我们没有作业，\n  老师会给我们布置一些\n  “找不同”的谜题。',
                       '<32>* 我那时候觉得那是在浪费时间。\n* 但看看现在的我...',
                       "<33>* 我现在是前哨站第一的\n  “找不同”谜题设计师了！"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* （咳，咳。）',
                       "<32>* Heck, why don't we just quit right here and now?"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* （咳，咳。）',
                       "<33>* 相信我，孩子。\n* 你不会想来干这行的。"
                    ]
         ),
         l_librarian: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* 欢迎来到图书倌。',
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
                       '<32>{#p/basic}{#npc/a}* 欢迎来到图书倌。\n* 老实说，这名字\n  来源于一次拼写错误。',
                       '<32>* 久而久之，\n  所有人都这么叫了...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population === 0
                     ? [ "<32>{#p/basic}{#npc/a}* You have feelings, don't you?" ]
                     : [ "<32>{#p/basic}{#npc/a}* Not that anyone would've stopped you before..." ]
                  : [ "<32>{#p/basic}{#npc/a}* 如果你懒得去修正一些细小的问题，\n  就会发展成现在这样的状况。" ]
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
                          '<32>{#p/basic}{#npc/a}* 我喜欢做新闻推送的工作。',
                          "<32>* Lately, though, I've had to report on something terrible...",
                          "<32>* I'm starting to second-guess my life choices."
                       ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我喜欢做新闻推送的工作。',
                       '<32>* Only problem is, if a celebrity dies...',
                       "<32>* That's all anyone ever wants me to report on for a while."
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 我喜欢做新闻推送的工作。',
                       "<32>* 因为没有什么可报道的，\n  所以我们就用漫画和游戏\n  来填充版面。",
                       '<32>* I sure hope nobody gets bored of those.'
                    ],
            () =>
               world.dead_dog || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* Have you ever felt like your life is just running in circles?' ]
                  : [ "<32>{#p/basic}{#npc/a}* 你是觉得好像\n  缺了点什么吗？" ]
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
                          '<32>{#p/basic}{#npc/a}* 就在刚刚，\n  一只灵感爆发的狗冲了进来。',
                          '<32>* 它一直试图创作一幅全息影像\n  来表达自己的情感...',
                          '<32>* 但是，他越是创作，\n  就越是兴奋...',
                          '<32>* 它的脖子变得越来越长，\n  作品也越来越亮，\n  直到...',
                          "<32>* 看得我很伤心，\n  但我无法移开视线。"
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
                          '<32>{#p/basic}{#npc/a}* 刚有只小狗经过这儿，\n  身上全是伤...',
                          '<32>* 到底是有多没良心，\n  才能对小可爱下毒手啊？'
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
                       [ '<32>{#p/basic}{#npc/a}* 对那狗狗来说挺糟糕吧，嗯？' ],
                       [ '<32>{#p/basic}{#npc/a}* 对那狗狗来说很糟糕吧，嗯？' ],
                       [ '<32>{#p/basic}{#npc/a}* Have you seen it?' ],
                       [ '<32>{#p/basic}{#npc/a}* 恶劣，真恶劣。' ]
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
                          '<32>{#p/basic}{#npc/a}* 切-\n* 难以置信-',
                          "<32>* I can't believe I'm gonna be working with that guy-",
                          '<32>* At least our sales figures should finally go up-'
                       ]
                  : roomKills().s_pacing > 0
                  ? [ "<32>{#p/basic}{#npc/a}* 切-\n* 对不起，我不跟你这种人做生意-" ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* Man-\n* Sucks what happened to Mettaton, y'know-",
                       "<32>* But I'm willing to sell off my special edition moon rocks for the occasion-",
                       '<32>* Unlike that guy, who just lowers the prices on his basic rocks instead-'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 切-\n* 难以置信-',
                       '<32>* 我从月亮上弄到了真正的月岩，\n  长得可比那家伙在电话里说的垃圾\n  强多了-',
                       "<32>* 那家伙的石头，\n  一点都不像月亮-"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ '<32>{#p/basic}{#npc/a}* Yeah, I have you to thank-' ]
                     : [ "<32>{#p/basic}{#npc/a}* It's just good for business-" ]
                  : roomKills().s_pacing > 0
                  ? [ "<32>{#p/basic}{#npc/a}* 切-\n* 对不起，我不跟你这种人做生意-" ]
                  : [ '<32>{#p/basic}{#npc/a}* 那家伙真挺有种啊-' ]
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
                          '<32>{#p/basic}{#npc/a}* 噗~\n* 啊对对~',
                          "<32>* It's good to finally be working together on this thing~",
                          "<32>* Now we'll both be sellin' my authentic moon rocks~"
                       ]
                  : roomKills().s_pacing > 0
                  ? [ '<32>{#p/basic}{#npc/a}* 噗~\n* 别想从我这买月岩~' ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Real shame what happened to the start of the underground~',
                       "<32>* Don't worry though~\n* Unlike that dude to my left, I won't raise my prices~",
                       '<32>* In fact, my moon rocks are going on sale~'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 噗~\n* 啊对对~',
                       "<32>* 我左边的那哥们\n  在卖假到不行的月岩呢，\n  笑死~",
                       "<32>* 他说的话你一句也别信~"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ '<32>{#p/basic}{#npc/a}* Shaw man~\n* Sorry it had to come to this~' ]
                     : [ '<32>{#p/basic}{#npc/a}* Yeah, his were the real fake moon rocks all along~' ]
                  : roomKills().s_pacing > 0
                  ? [ '<32>{#p/basic}{#npc/a}* 噗~\n* 别想从我这买月岩~' ]
                  : [ "<32>{#p/basic}{#npc/a}* 那哥们真挺有胆啊~" ]
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
                       "<32>{#p/basic}{#npc/a}* 我的小肉桂是最可爱的！",
                       '<32>* 小兔兔真的太可爱了...\n* 嘻嘻！'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* It's not long now, bun-bun..." ]
                  : SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* I wonder what could have happened...' ]
                  : papreal() || world.dead_canine
                  ? [ '<32>{#p/basic}{#npc/a}* I wonder where they are...' ]
                  : [ '<32>{#p/basic}{#npc/a}* 兔-兔-兔-兔-兔...' ]
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
                    '<32>{#p/basic}{#npc/a}* 冰狼在思考为什么\n  自己没有冰可扔的时候，\n  冰狼还叫冰狼。',
                    '<32>* 冰狼很疑惑。'
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
                       "<32>{#p/basic}{#npc/a}* 那些MTT牌的牙刷\n  质量太他娘的差了。",
                       '<32>* 我还没来得及开始刷，\n  东西就被我捏碎了！'
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
                  : [ '<32>{#p/basic}{#npc/a}* 不过话说回来，\n  这是最便宜的选择了...' ]
         ),
         t_kabakk: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [
                          '<32>{#p/basic}{#npc/a}* 嘿！',
                          "<32>* ... you're pretty weird.",
                          '<32>* You put us through hell, then went through hell to save us all.',
                          "<32>* I don't really know why.",
                          '<32>* ...',
                          '<32>* ...',
                          "<32>* I DON'T KNOW HOW TO HANDLE TO THIS SITUATION!\n* YEAH!"
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* 嘿！',
                          "<32>* ... you're pretty cool.",
                          '<32>* Thanks for going through hell to save us all back there.',
                          '<32>* That was a real stand-up move.',
                          '<32>* ...',
                          '<32>* ...',
                          '<32>* ALL HAIL THE NEW AUTHORITY!\n* YEAH!'
                       ]
                  : world.meanie
                  ? [
                       '<32>{#p/basic}{#npc/a}* 嘿！',
                       '<32>* What you been up to, huh KID?',
                       "<32>* You've got an awfully criminal look on your FACE...",
                       '<32>* ...',
                       '<32>* ...',
                       '<32>* 尊重我的权威！\n* 耶!'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 嘿！',
                       '<32>* 你以为你能站在那\n  盯着我看吗？',
                       "<32>* 行吧，我告诉你个坏消息，\n  伙计。",
                       "<32>* 我是个执法人员。",
                       '<32>* 所以，呃...',
                       '<32>* 尊重我的权威！\n* 耶!'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                     : [ '<32>{#p/basic}{#npc/a}* HAIL it, PAL.' ]
                  : [ '<32>{#p/basic}{#npc/a}* 尊重下吧，伙计。' ]
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
                       "<32>{#p/basic}{#npc/a}* 嘿嘿，什么东西都无法改变\n  我的生活！",
                       '<32>* 哈... 哈...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ "<32>{#p/basic}{#npc/a}* I still think you're cool...!\n* Please don't hurt me." ]
                     : [ '<32>{#p/basic}{#npc/a}* I love you...!' ]
                  : papreal() || world.dead_canine || SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Maybe it's just my imagination." ]
                  : [ "<32>{#p/basic}{#npc/a}* 也许我是疯了吧。" ]
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
                       "<32>* 这-就-是-政治啊！"
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
                       "<32>* 这-就-是-政治啊！"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 这个小镇总是那么沉闷。',
                       "<32>* 但是，如果事情\n  继续这样发展下去的话，\n  也许这种情况会改变。",
                       '<32>* 这就是政治吧？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* You see?\n* Politics isn't all bad..." ]
                  : SAVE.data.b.killed_mettaton || papreal() || world.popmax(0) - world.population > 4
                  ? [ '<32>{#p/basic}{#npc/a}* 政治...' ]
                  : world.trueKills > 0 || SAVE.data.n.bully > 0
                  ? [ '<32>{#p/basic}{#npc/a}* 政治。' ]
                  : [ '<32>{#p/basic}{#npc/a}* 政治？' ]
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
                       '<32>{#p/basic}{#npc/a}* 很久以前，\n  我听说他们把小镇\n  一分为二了。',
                       '<32>* 我想知道这里原来\n  是什么样子的...？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Thanks for bringing us back.' ]
                  : SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* It's too bad we can't just magically bring them back." ]
                  : papreal()
                  ? [ "<32>{#p/basic}{#npc/a}* It's too bad we can't just magically fix these things." ]
                  : [ '<32>{#p/basic}{#npc/a}* 我们可能永远都\n  无从得知了。' ]
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
                       "<32>{#p/basic}{#npc/a}* 我们都知道事情不尽人意，\n  但我们仍旧保持微笑。",
                       '<32>* 你问为什么？',
                       '<32>* 我们面对着的是现实，\n  所以何必郁郁寡欢呢？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ '<32>{#p/basic}{#npc/a}* 笑一笑吧。' ]
                     : [ '<32>{#p/basic}{#npc/a}* 笑一笑吧！' ]
                  : papreal() || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* 笑一笑？' ]
                  : [ '<32>{#p/basic}{#npc/a}* 笑一笑吧。' ]
         ),
         t_wisconsin: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          '<32>{#p/basic}{#npc/a}* Freedom...',
                          "<32>* That means I don't have to worry about getting beat up anymore.",
                          '<32>* 哈哈。'
                       ]
                     : [
                          '<32>{#p/basic}{#npc/a}* Freedom...',
                          "<32>* That means I don't have to worry about cracking jokes anymore.",
                          '<32>* ...',
                          '<32>* What does a mouse do when it finally gets the cheese?',
                          '<32>* ...',
                          '<32>* Well...',
                          "<32>* It probably doesn't worry about cracking jokes, that's for sure.",
                          '<32>* 哈哈。'
                       ]
                  : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* It just feels like...',
                       '<32>* Like everything is getting worse, and worse...\n* And worse.'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 每个人都在欢笑、讲笑话，\n  试图忘记我们的现代危机...',
                       '<32>* 死气沉沉。\n* 人口过剩。\n* 无家可归。',
                       "<32>* 我也想加入他们，\n  但我并不有趣。"
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
                  : [ "<32>{#p/basic}{#npc/a}* 至少，我不讲双关笑话。" ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ '<32>{#p/basic}{#npc/a}* You should leave before I stop being nice to you.' ]
                     : [ "<32>{#p/basic}{#npc/a}* Yes.\n* That was a pun.\n* I'm a pun mouse now." ]
                  : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* And worse still...' ]
                  : [ '<32>{#p/basic}{#npc/a}* 暂时吧。' ]
         ),
         t_zorren: pager.create(
            0,
            () => [
               "<32>{#p/basic}{#npc/a}* （哦，嘿，是我，Zorren。）",
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
                          '<32>* （...）',
                          "<32>* (Yeah, you know, uh, I don't really like you anymore.)",
                          "<32>* (I'd take back they key I gave you, if only I could.)"
                       ]
                     : [
                          '<32>* （你是，呃，对我们的警察，\n  呃，有意见，还是...？）',
                          '<32>* （...）',
                          "<32>* (Yeah, you know, uh, I don't really like you all that much.)",
                          "<32>* (There's just, something off, particularly about you.)"
                       ]
                  : [
                       ...(SAVE.data.b.oops
                          ? [
                               '<32>* （你是，呃，对我们的警察，\n  呃，有意见，还是...？）',
                               '<32>* （没有吗？）\n* （嘿，还好你呃，没有。）'
                            ]
                          : [
                               "<32>* (Y'know, you seem like someone who likes to show respect.)",
                               '<32>* (So, thanks for, uh, doing that.)'
                            ]),
                       ...(SAVE.data.b.s_state_capstation
                          ? []
                          : ((SAVE.data.b.s_state_capstation = true),
                            [
                               '<32>* （实际上...）',
                               '<32>* （给你，孩子。）\n* （我们手里，有个钥匙。）',
                               '<32>{#s/equip}{#p/human}* （你把生锈的钥匙\n  挂到了钥匙串上。）',
                               '<32>* （打开“手机”来查看\n  所有获得的钥匙。）',
                               "<32>{#p/basic}{#npc/a}* （我想，呃，我们应该\n  在什么地方有个军火库。）"
                            ])),
                       ...(SAVE.data.b.oops
                          ? [
                               '<32>* （嘘...）\n* （就是，这个警察岗是我和\n  Kabakk两个人自己建的。）',
                               '<32>* （很酷，是吧？）'
                            ]
                          : [
                               '<32>* （嘘...）\n* （就是，这个警察岗是我和\n  Kabakk两个人自己建的。）',
                               '<32>* （很酷，是吧？）'
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
                  ? [ "<32>{#p/basic}{#npc/a}* （没错，我们不是真警察。）" ]
                  : [
                       '<32>{#p/basic}{#npc/a}* (We may not be real police, but people like you are worth protecting and serving.)'
                    ]
         )
      },
      objinter: {
         ctower0: () => [
            '<32>{#p/human}* （你激活了终端。）',
            ...(SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The note describes reducing the total to zero by adding or subtracting powers of ten.)'
                 ]
               : [
                    '<32>{#p/basic}* 显示器侧面钉着一份说明...',
                    '<33>* 上面的字迹全是狂草，你根本\n  看不清楚。\n* 除了一个字，“零”。'
                 ])
         ],
         ctower1: () =>
            SAVE.data.b.s_state_mathpass
               ? SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (But you already completed this puzzle beforehand.)' ]
                  : [ '<32>{#p/basic}* The terminal is now in an unlocked state.' ]
               : [ "<32>{#p/basic}* 不能使用了。" ],
         microwave0: [ '<32>{#p/human}* （你看了看微波炉的后面...）', '<32>{#p/basic}* 没什么有用的东西。' ],
         microwave1: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* （你看了看微波炉的后面...）',
                    '<32>{#s/equip}{#p/human}* （你按下了开关。）'
                 ]
               : [
                    '<32>{#p/human}* （你看了看微波炉的后面...）',
                    "<32>{#p/basic}* 这里有个开关...",
                    '<32>{#s/equip}{#p/human}* （你按下了开关。）'
                 ],
         microwave2: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* （你看了看微波炉的后面...）',
                    '<32>{#p/human}* (But you already flipped the switch here.)'
                 ]
               : [ '<32>{#p/human}* （你看了看微波炉的后面...）', '<32>{#p/basic}* 没有新东西。' ],
         microwave3: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (But you didn't notice anything of note about this appliance.)" ]
               : [
                    '<32>{#p/basic}* 标准规格的电介质加热器，\n  首塔制造。\n* 260X年前后制成。',
                    "<32>* 这就是台微波炉。\n  顶多用了十年。"
                 ],
         microwave4: () => [
            '<32>{#p/basic}* 它似乎在投射某种重力场。',
            ...(SAVE.data.b.oops ? [] : [ "<32>{#p/basic}* 我有点好奇... \n  这附近有没有开关什么的..." ])
         ],
         papmail1: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (But you didn't have any mail to send.)" ]
               : [
                    '<32>{#p/basic}* 邮箱上标注着“PAPYRUS”。',
                    choicer.create('* （看里边吗？）', "看一眼", "算了")
                 ],
         papmail2: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/human}* （你往里看了一眼...）',
                       world.runaway
                          ? "<32>{#p/basic}* It's even emptier than before."
                          : "<32>{#p/basic}* It's not empty?"
                    ]
                  : [
                       '<32>{#p/human}* （你往里看了一眼...）',
                       "<32>{#p/basic}* 空的。",
                       ...(31 <= SAVE.data.n.plot &&
                       SAVE.data.n.plot_date < 0.1 &&
                       SAVE.data.n.state_starton_papyrus !== 1
                          ? [
                               '<18>{#p/papyrus}{#f/0}谢谢你你能来\n检查我的邮件！',
                               "<18>{#p/papyrus}{#f/4}谢天谢地，\n我已经全都整理好了。"
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/human}* （你往里看了一眼...）',
                       world.runaway
                          ? "<32>{#p/basic}* It's even emptier than before."
                          : "<32>{#p/basic}* It's not empty?"
                    ]
                  : [ '<32>{#p/human}* （你往里看了一眼...）', "<32>{#p/basic}* 空的。" ]
         ),
         papmail3: [ '<32>{#p/human}* （你决定不再看了。）' ],
         puzzlechip: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But you already completed this puzzle beforehand.)' ]
               : [ '<32>{#p/basic}* The terminal is now in an unlocked state.' ],
         spagtable0: [ "<32>{#p/basic}* 一个没用过的盘子。" ],
         spagtable1: [
            '<32>{#p/human}* （你凝视着令人垂涎的\n  意大利面。）',
            '<32>{#p/human}* （似乎是够不到它了。）'
         ],
         spagtable2: [ '<32>{#p/human}* （你得到了意大利面。）' ],
         spagtable2b: [ "<32>{#p/human}* （你带的东西太多，装不下它了。）" ],
         spagtable3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You feel appreciative towards this plate for the food it served you.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* Why bother.\n* It's just a simple plate." ]
               : [ '<32>{#p/basic}* Once the home of a truly out- of-this-world creation.' ],
         xtower1: () => [
            ...(postSIGMA()
               ? [ "<32>{#p/basic}* 不能使用了。" ]
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
                    '<32>{#p/human}* （你激活了终端。）',
                    "<32>{#p/basic}* 这是个游戏终端...",
                    ...(SAVE.data.n.plot === 72 || world.postnoot
                       ? [ '<32>{#p/basic}* The power supply has been cut.' ]
                       : [ '<32>{#p/basic}* “尽可能快速射击目标！\n   用[Z]来射击。”' ])
                 ])
         ]
      },
      papbooks1: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The books on this bookshelf consist of puzzler's guides and children's stories.)" ]
               : [
                    '<32>{#p/basic}* 书架上摆满了关于\n  谜题创作的复杂书籍。',
                    "<32>* 还有儿童读物。",
                    ...(roomready()
                       ? [
                            '<18>{#p/papyrus}我把一部分\n我最喜欢的书\n都放在那个书架上。',
                            '<18>{#f/4}比如《为聪明人\n设计的高级\n谜题结构》。',
                            '<18>{#f/0}我另一本最爱呢？',
                            '<18>{#f/4}是《和毛茸茸的兔子\n捉迷藏》。',
                            '<18>{#f/8}结局每次都会\n打动到我！'
                         ]
                       : [])
                 ],
         () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The books on this bookshelf consist of puzzler's guides and children's stories.)" ]
               : [ "<32>{#p/basic}* 复杂的手册和儿童读物。" ]
      ),
      papbooks2: pager.create(
         1,
         [
            '<32>{#p/human}* （你取下了一本书...）',
            '<32>{#p/basic}* “奠定谜题互动价值的，\n   是玩家的配合程度。”',
            '<32>* “每个玩家都有探索、前进\n   和完成既定任务的\n   内在动力。”',
            '<32>* “那些具有挑战性、能够\n   吸引这些动力的谜题...”',
            '<32>* “能够确保玩家始终\n   专注于任务，直到最后一刻。”',
            '<32>{#p/human}* （你把书放回了书架。）'
         ],
         [
            '<32>{#p/human}* （你取下了一本书...）',
            '<32>{#p/basic}* “‘来玩躲猫猫吧！’\n  人类从墙后出现，\n  对小兔子说道。”',
            '<32>* “毛茸茸的兔子又惊又喜，\n   兴奋地看着眼前的人类。”',
            '<32>* “然后，人类离开了...\n   毛茸茸的兔子看不到人类了，\n   它非常地伤心。”',
            '<32>* “它的身体颤抖着，\n   思考着自己是多么孤单。”',
            '<32>* “它很想哭，\n   觉得自己被永远抛弃了...”',
            '<32>* “但后来，人类又出现了，\n   世界又恢复了正常。”',
            '<32>* “人类和兔子给了彼此\n   一个大大的、毛茸茸的拥抱。”',
            '<32>{#p/human}* （你把书放回了书架。）'
         ],
         () =>
            world.runaway
               ? [
                    '<32>{#p/human}* （你取下了一本书...）',
                    '<23>{#p/papyrusnt}“亲爱的日计：\n力场已经被摧毁了。”',
                    '<23>\"FRISK, THE HUMAN WHO CAME TO THE OUTPOST JUST A FEW DAYS AGO...\"',
                    '<23>\"IS NOW THE SUBJECT OF FEAR AMONG EVERYONE ON THE OUTPOST.\"',
                    '<23>\"WE\'RE ALL LEAVING RIGHT AWAY, BEFORE THEY WAKE UP.\"',
                    '<23>\"STILL, A PART HOPES THEY FIND THEIR WAY OFF THE OUTPOST, TOO.\"',
                    '<23>\"EVERYONE ELSE JUST SEEMS CONTENT LEAVING THEM TO DIE.\"',
                    '<32>{#p/human}* （你把书放回了书架。）'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/human}* （你取下了一本书...）',
                    '<23>{#p/papyrusnt}“亲爱的日计：\n力场已经被摧毁了。”',
                    '<23>\"FRISK, THE HUMAN WHO CAME TO THE OUTPOST JUST A FEW DAYS AGO...\"',
                    '<23>\"TOOK ON IMPOSSIBLE ODDS TO SAVE US FROM DESTRUCTION.\"',
                    '<23>\"MAYBE THIS IS WHAT\'LL INSPIRE SANS TO MOVE UP IN THE WORLD.\"',
                    '<23>\"I ONLY MENTION IT BECAUSE, I NEVER KNEW HIS SENTRY JOB...\"',
                    '<23>\"MEANT DOING SO LITTLE ACTUAL WORK.\"',
                    '<32>{#p/human}* （你把书放回了书架。）'
                 ]
               : [
                    '<32>{#p/human}* （你取下了一本书...）',
                    '<23>{#p/papyrusnt}“亲爱的日计：\nSANS刚刚被任命为\n正式的皇家哨兵。”',
                    '<23>“最开始，\n我对他非常地不解...”',
                    '<23>“毕竟，为什么一个\n这么懒的人会想\n承担这个工作？”',
                    '<23>“算了，\n我就不去追问什么了。”',
                    '<23>“事实上，我为他感到\n非常骄傲！！！”',
                    '<23>“只有时间才能证明\n这会带来什么\n伟大的事情。”',
                    '<32>{#p/human}* （你把书放回了书架。）'
                 ]
      ),
      papcomputer1: pager.create(
         0,
         () =>
            postSIGMA()
               ? [ "<32>{#p/basic}* 不能使用了。" ]
               : [
                    ...(roomready()
                       ? [
                            "<18>{#p/papyrus}域外网！\n我在那上面\n超有人气的。",
                            "<18>{#f/4}再有12个关注...",
                            '<18>{#f/0}我的粉丝数\n就到两位数了！'
                         ]
                       : []),
                    SAVE.data.b.svr
                       ? '<32>{#p/human}* (You move towards the computer...)'
                       : "<32>{#p/basic}* 电脑的浏览器\n  打开了一个\n  社交媒体网站。",
                    choicer.create("* （登录Papyrus的账号吗？）", "登录", "算了")
                 ],
         () =>
            postSIGMA()
               ? [ "<32>{#p/basic}* 不能使用了。" ]
               : [
                    SAVE.data.b.svr
                       ? '<32>{#p/human}* (You move towards the computer...)'
                       : "<32>{#p/basic}* 电脑的浏览器\n  打开了一个\n  社交媒体网站。",
                    choicer.create("* （登录Papyrus的账号吗？）", "登录", "算了")
                 ]
      ),
      papcomputer2: [ '<32>{#p/human}* （你决定先不登录。）' ],
      papcomputer3: {
         a: '酷炫骷髅95',
         b: '粉丝数 -2',
         c: '这个账号属于\n伟大的\nPAPYRUS。\n只发高质量\n帖子！',
         d: '- 新闻 -',
         e: () =>
            world.runaway
               ? 'BREAKING:\n..\n..\n..\n.. WE ALL NEED\nTO LEAVE.'
               : SAVE.data.n.plot === 72
               ? 'BREAKING:\nWE CAN LEAVE.\nLIKE.. FOR REAL.\nSOURCE:\nLOOK OUTSIDE,\nPEOPLE!'
               : "突发新闻：\n《喵喵星火》\n评分..\n一塌糊涂。\n新闻来源：\n就，这是真的吗？"
      },
      papcomputer4: [
         () =>
            world.runaway
               ? {
                    a: '哈喽！',
                    b: '自求多福吧...',
                    c: ''
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '哈喽！',
                    b: '网络连接失败...',
                    c: ''
                 }
               : {
                    a: '哈喽！',
                    b: '分享你的想法...',
                    c: ''
                 },
         () =>
            world.runaway
               ? {
                    a: 'ALPHYS',
                    b: '今天',
                    c: '< 消息已删除 >'
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '系统消息',
                    b: '今天',
                    c: '域外网于今日关停。'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: 'NAPSTABLOOK22',
                    b: '今天',
                    c: '这就是为什么我再也不上网了...\n一切都毫无意义'
                 }
               : world.genocide
               ? {
                    a: 'NAPSTABLOOK22',
                    b: '今天',
                    c: "没关系的...\n我是幽灵..."
                 }
               : world.dead_skeleton
               ? {
                    a: 'NAPSTABLOOK22',
                    b: '今天',
                    c: "嗯...\n我还是去忙这首曲子的\n混音吧..."
                 }
               : {
                    a: '懒骨.',
                    b: '今天',
                    c: "咱们快祈祷他别把\n我们的灵~魂也抓走咯~\n*手枪biubiu*",
                    d: true
                 },
         () =>
            world.runaway
               ? {
                    a: '懒骨.',
                    b: '今天',
                    c: '< 消息已删除 >',
                    d: true
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: 'ALPHYS',
                    b: '今天',
                    c: '哎呀，\n我忘了关服务器了'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: '壮鱼91',
                    b: '昨天',
                    c: '嗯... 你不是每天都这么说吗，\nPapyrus？'
                 }
               : world.genocide
               ? {
                    a: '壮鱼91',
                    b: '今天',
                    c: 'blooky，快点离开这。\n我不想看到你也跟着受伤。'
                 }
               : world.dead_skeleton
               ? {
                    a: '壮鱼91',
                    b: '今天',
                    c: 'blooky，papyrus不在了。\n我会让那人类血债血偿。'
                 }
               : {
                    a: '壮鱼91',
                    b: '今天',
                    c: '呃，没抓到...\n不过，他成功俘获了我们\n每个人的心！呋呼呼！！'
                 },
         () =>
            world.runaway
               ? {
                    a: '酷炫骷髅95',
                    b: '今天',
                    c: '< 消息已删除 >'
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '_舟亢忝洐_',
                    b: '今天',
                    c: '< 用户名更新 >\n原名：_摋掱亾耦_\n现在：_舟亢忝洐_'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: '酷炫骷髅95',
                    b: '昨天',
                    c: "今天，\n就是我要抓到人类的日子！\n我能从骨子里感觉到！"
                 }
               : world.genocide
               ? {
                    a: 'NAPSTABLOOK22',
                    b: '今天',
                    c: '呃...\n我有什么能帮忙的吗？\n事情变得更糟了...'
                 }
               : {
                    a: 'NAPSTABLOOK22',
                    b: '今天',
                    c: '所以... papyrus\n抓到人类了吗？还是...'
                 }
      ] as (() => { a: string; b: string; c: string; d?: boolean })[],
      papcomputer5: () =>
         world.runaway
            ? [ 'FRISK', "你敢", '跟过来', '试试' ]
            : SAVE.data.n.plot === 72
            ? [ '对不起', "但我们", '停服啦', '笑死' ]
            : [ '刷新页面', '查看消息', '聊天设置', '退出登录' ],
      papcouch0: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （你在沙发里什么都找不到。）" ]
            : [ "<32>{#p/basic}* 已经被清理干净了。" ],
      papcouch1: pager.create(
         0,
         () => [
            '<32>{#p/human}* （你听到沙发里\n  有叮当的声音。）',
            SAVE.data.b.svr
               ? '<32>{#p/human}* （好像这里留了一堆硬币...）'
               : '<32>{#p/basic}* 里面有一堆硬币...',
            choicer.create('* （拿走这些硬币吗？）', '是', '否')
         ],
         () => [
            SAVE.data.b.svr
               ? "<32>{#p/human}* （硬币并没有长出腿跑了。）"
               : '<32>{#p/basic}* 硬币还在。',
            choicer.create('* （拿走这些硬币吗？）', '是', '否')
         ]
      ),
      papcouch2: [ '<32>{#p/human}* （你决定什么也不拿。）' ],
      papcouch3: [ '<32>{#p/human}* （你找到了10G。）' ],
      papcouch3a: [
         "<18>{#p/papyrus}{#f/1}你在帮我们\n清理沙发！？",
         '<18>{#p/papyrus}{#f/5}你真的彻头彻尾的\n是个善良的人...',
         '<18>{#p/papyrus}{#f/6}多么慷慨！！！'
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
            ? "<18>{#p/papyrus}{#f/5}哇，你真的\n好渴望约会啊..."
            : "<18>{#p/papyrus}{#f/5}哇，你真的\n好渴望找我玩啊...",
         "<18>{#f/5}甚至要抢在\n我前面进我家！",
         "<18>{#f/6}你真的\n很重视啊！"
      ],
      papdate1x: pager.create(
         0,
         [
            '<18>{#p/papyrus}{#f/0}你好，人类！',
            '<18>{#f/5}希望你过得愉快。',
            '<18>{#f/6}到镇上随便走走...',
            '<18>{#f/0}...或者来我家看看\n都行！'
         ],
         [ "<18>{#p/papyrus}{#f/4}不过，离SANS的房间\n远一点。" ]
      ),
      papdate1: () => [
         SAVE.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}所以你回来\n跟我约会了！'
            : '<18>{#p/papyrus}所以你回来\n看我了！',
         ...(world.dead_dog || world.population < 6
            ? [
                 "<18>{#f/0}太好了！！",
                 "<18>{#f/5}说实话，\n今天感觉有点孤单...",
                 '<18>{#f/5}今天，好多居民\n离奇失踪了...',
                 "<18>{#f/0}不过，你还在这！！",
                 '<18>{#f/0}你肯定不同于常人，\n对吧？？'
              ]
            : [ '<18>{#f/4}你肯定非常\n看重这件事...' ]),
         "<18>{#f/5}我会带你去一个\n很特别的地方...",
         '<18>{#f/0}一个我愿意花大把\n时间流连忘返的\n地方！！！'
      ],
      papdate2: [ '<18>{#p/papyrus}我家！！！' ],
      papdate3: pager.create(
         0,
         [ '<18>{#p/papyrus}欢迎来我豪华的\n家里做客！', '<18>好好享受，\n慢慢参观！！！' ],
         [ "<18>{#p/papyrus}如果你看完了，\n就上楼来我的房间！" ]
      ),
      papdate3a: [ '<18>{#p/papyrus}{#f/6}哇！当个好主人\n可真是个体力活！' ],
      papdate3b: [
         "<18>{#p/papyrus}{#f/5}哇，我感觉不到\n我的腿了...",
         "<18>{#f/0}那肯定证明了\n我是个好主人！！！"
      ],
      papdate4: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}那是我的房间！",
            "<18>{#f/4}如果这里的东西\n你都看完了，\n那我们就进去...",
            '<18>{#f/4}然后...',
            SAVE.data.b.flirt_papyrus
               ? '<18>{#f/9}做大家会在\n约会的时候\n做的事！'
               : '<18>{#f/9}像一对酷酷的朋友\n一样“消遣”吧！',
            choicer.create('* （你要怎么回答？）', '是', '否')
         ],
         () => [ '<18>{#p/papyrus}准备好了吗？', choicer.create('* （你要怎么回答？）', '是', '否') ]
      ),
      papdate4a: [ "<18>{#p/papyrus}好，我们进去吧！" ],
      papdate4b: [ "<18>{#p/papyrus}I'LL KEEP WAITING HERE THEN!" ],
      papdate5: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}所以，呃...',
            "<18>{#f/5}如果你看完了\n所有东西...",
            SAVE.data.b.flirt_papyrus
               ? '<18>{#f/6}那你想开始\n约会吗？'
               : '<18>{#f/6}那你想开始\n消遣吗？',
            choicer.create('* （你要怎么回答？）', "开始吧", "再等等")
         ],
         () => [ '<18>{#p/papyrus}{#f/6}准备开始了吗？', choicer.create('* （你要怎么回答？）', "开始吧", "再等等") ]
      ),
      papdate5a: () => [
         SAVE.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}好！！！\n约会开始！！！'
            : "<18>{#p/papyrus}好！！！\n我们开始消遣叭！！！"
      ],
      papdate5b: [ "<18>{#p/papyrus}慢慢看，不着急。\n我会等你的。" ],
      papdate6: () => [
         SAVE.data.b.flirt_papyrus
            ? '<#32>{#p/story}           约会    开始！'
            : '<#32>{#p/story}           消遣    开始！'
      ],
      papdate7: () => [
         '<15>{#p/papyrus}{#f/10}我们！！',
         SAVE.data.b.flirt_papyrus ? '<15>{#f/20}开始约会了！！' : '<15>{#f/20}开始消遣了！！',
         "<15>{#f/24}我实际上之前\n从来没做过\n这种事。",
         "<15>{#f/10}但别担心！！！",
         '<15>{#f/20}我的（个人）词典里\n可是有“准备”\n这个词的！'
      ],
      papdate8: () => [
         '<15>{#f/20}你问我手里\n拿的是什么？',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/10}这是本官方的\n约会指南，我直接\n从图书倌借来的！'
            : '<15>{#p/papyrus}{#f/10}这是本官方的\n消遣指南，我直接\n从图书倌借来的！',
         "<15>{#f/20}有了这个，\n我们一定会玩得\n很开心！"
      ],
      papdate9: () => [
         "<15>{#p/papyrus}{#f/25}让我看看...",
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/25}第一步：\n按下C或CTRL键\n打开{@fill=#f00}约会面板{@fill=#000}。'
            : '<15>{#f/25}第一步：\n按下C或CTRL键\n打开{@fill=#f00}消遣面板{@fill=#000}。'
      ],
      papdate10: () => [
         '<15>{#p/papyrus}{#f/24}...等下。',
         '<15>{#f/22}你早就\n按好了！？！？',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/11}哇，你肯定\n很爱我吧！'
            : '<15>{#f/11}哇，你肯定\n很喜欢我吧！',
         "<15>{#f/10}那么，\n开始第二步！"
      ],
      papdate11: [
         '<15>{#p/papyrus}{#f/24}...',
         "<15>{#f/24}呃，反正\n我们也不需要。",
         '<15>{#f/20}来看第二步！'
      ],
      papdate12: [
         '<15>{#p/papyrus}{#f/11}哇，我感觉\n充满了信息！',
         "<15>{#f/24}事实上，我认为\n我们已经可以\n进入第二步了..."
      ],
      papdate13: () => [
         SAVE.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/25}第二步：\n邀请约会对象。'
            : '<15>{#p/papyrus}{#f/25}第二步：\n邀请消遣对象。'
      ],
      papdate13a: () => [
         '<15>{#f/24}“咳咳。”',
         '<15>{#f/20}人类！\n我，伟大的\nPAPYRUS...',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/10}想和你一起\n约会！'
            : '<15>{#f/10}想和你一起\n消遣！'
      ],
      papdate14: () => [ choicer.create('* （你要怎么回答？）', '是', '否') ],
      papdate15a: [ '<15>{#p/papyrus}{#f/12}真-真的？？？', '<15>{#f/11}哇！！！' ],
      papdate15a1: [ "<15>{#f/24}我想，这意味着\n是时候开始\n第三步了..." ],
      papdate15b: [ '<15>{#p/papyrus}{#f/21}哦...', '<15>{#f/27}还-还好，\n上面只说了\n要邀请。' ],
      papdate15c: [ "<15>{#f/24}那无论如何，\n是时候开始\n第三步了..." ],
      papdate16: [ '<15>{#p/papyrus}{#f/25}第三步：\n穿上漂亮的衣服\n表示你在乎。' ],
      papdate16a: [ '<15>{#p/papyrus}{#f/24}...', '<15>{#f/24}等一下。' ],
      papdate17: () => [
         '<15>{#f/24}漂亮的衣服...',
         (
            {
               spacesuit: "<15>{#f/26}你身上的\n那件旧宇航服...",
               halo: '<15>{#f/26}你头上的\n那个光环...',
               eye: '<15>{#f/26}你周围的\n力场...',
               eye_x: '<15>{#f/26}你周围的\n力场...',
               temyarmor: "<15>{#f/26}你现在穿戴着的\n防具...",
               goggles: '<15>{#f/26}你头上的\n那个玩意...',
               goggles_x: '<15>{#f/26}你头上的\n那个玩意...',
               visor: '<15>{#f/26}THAT VISOR IN FRONT OF YOUR EYES...',
               visor_x: '<15>{#f/26}THAT VISOR IN FRONT OF YOUR EYES...',
               sonic: "<15>{#f/26}你带着的那个\n奇怪的设备...",
               heart_locket: '<15>{#f/26}THAT LOCKET AROUND YOUR NECK...'
            } as Partial<CosmosKeyed<string>>
         )[SAVE.data.s.armor] || '<15>{#f/26}你身上的\n那个东西...',
         "<15>{#f/20}你现在就\n穿着衣服呢！！！",
         '<15>{#f/24}不仅如此...',
         '<15>{#f/20}今天早些时候，\n你也穿着衣服呢！'
      ],
      papdate17a: () => [
         '<15>{#f/12}不会吧...！\n这是不是说？？？',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/13}你打从一开始\n就打算和我\n约会了？？？'
            : '<15>{#f/13}你打从一开始\n就打算和我\n做朋友了？？？'
      ],
      papdate18a: () => [
         '<15>{#p/papyrus}{#f/22}不！！',
         '<15>{#f/22}这一切都在你\n计划之内！！！',
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/22}你可能都比我更\n擅长约会！！！',
                 '<15>不-不！！！你的\n{@fill=#003cff}约会能量{@fill=#000}...！！！'
              ]
            : [
                 '<15>{#f/22}你可能都比我更\n擅长消遣！！！',
                 '<15>不-不！！！你的\n{@fill=#003cff}友谊能量{@fill=#000}...！！！'
              ])
      ],
      papdate18b: () => [
         '<15>{#p/papyrus}{#f/24}哦...',
         '<15>{#f/21}不过，你嘴上那么说...',
         '<15>{#f/21}...但这一整天，\n你还是好好穿了衣服？',
         "<15>{#f/24}也就是说...",
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
      papdate19: [ '<15>{#p/papyrus}{#f/15}捏！', '<15>{#f/15}捏嘿嘿！！！' ],
      papdate20: () => [
         "<15>{#p/papyrus}{#f/15}别以为你已经\n打败我了!",
         '<15>{#f/20}我，伟大的\nPAPYRUS...',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/20}之前从来没有\n在约会上输过...'
            : '<15>{#f/20}之前从来没有\n在消遣上输过...',
         '<15>{#f/15}以后也不会！！',
         '<15>{#f/10}我很容易就\n可以跟上你的\n节奏！！！',
         '<15>{#f/24}实际上...',
         '<15>{#f/20}我在平常的\n衣服下面...',
         '<15>{#f/20}一直穿着我的\n“特别”服装！！',
         '<15>{#f/15}你等着！！'
      ],
      papdate21: [ '<15>{#p/papyrus}{#f/15}你觉得我的\n秘密穿搭\n怎么样？' ],
      papdate22: () => [ choicer.create('* （你要怎么回答？）', '很棒', '很差劲') ],
      papdate23a: [ '<15>{#p/papyrus}{#f/13}不！！！', '<15>{#f/13}发自内心的\n赞美...！' ],
      papdate23b: [ '<15>{#p/papyrus}{#f/13}不！！！', '<15>{#f/13}虽然是批评，\n但是好诚实...！' ],
      papdate24: [
         '<15>{#p/papyrus}{#f/24}然而...',
         "<15>{#f/20}你根本不明白\n这身衣服背后\n{@fill=#f00}隐藏的力量{@fill=#000}！",
         '<15>{#f/26}因此...'
      ],
      papdate24a: () => [
         '<15>{#f/15}你刚才的回答\n无效！！',
         SAVE.data.b.flirt_papyrus
            ? "<15>{#f/15}这场约会不会\n再有更多\n进展了！"
            : "<15>{#f/15}这场消遣不会\n再有更多\n进展了！",
         '<15>{#f/24}除非...',
         '<15>{#f/20}你能找到我的\n{@fill=#f00}秘密{@fill=#000}。',
         "<15>{#f/15}但那是不会\n发生的！！"
      ],
      papdate24b: '* 移动并用[Z]交互。',
      papdate25: [
         
         '<15>{#p/papyrus}{#f/21}我头上的\n假发...？',
         '<15>{#f/16}我头上的假发。',
         '<15>{#f/10}我头上的...\n假发！！！',
         "<15>{#f/10}捏嘿嘿！\n意义重大的\n回答！"
      ],
      papdate25a: [
         '<15>{#p/papyrus}{#f/21}OVERWHELMED BY THE SIGHT OF MY \"STELLAR\" OUTFIT?',
         '<15>{#f/24}NO, NO, I UNDERSTAND.',
         "<15>{#f/20}BUT YOU CAN'T BACK DOWN NOW!!!"
      ],
      papdate25b: [
         '<15>{#p/papyrus}{#f/26}这件衬衫上\n本来没有写着\n“闪亮”的...',
         '<15>{#f/20}但是我\n改良了一下！',
         '<15>{#f/10}专家提示：\n所有的衣服都\n可以通过这种\n方式改良。',
         "<15>{#f/20}...但这里可\n没藏什么秘密！\n再试试吧！"
      ],
      papdate25c: [
         '<15>{#p/papyrus}{#f/24}我懂，我懂。',
         '<15>{#f/24}你喜欢用一颗\n漂浮的心\n感受我的\n手臂靠枕。',
         "<15>{#f/20}但是谁又\n不喜欢呢！？\n再试试吧！"
      ],
      papdate25d: [
         "<15>{#p/papyrus}{#f/13}你握住我的手，\n想让我把答案\n告诉你...？",
         '<15>{#f/14}我-我不，\n我必须忍住！！',
         '<15>{#f/20}再试试吧！'
      ],
      papdate25e: [
         "<15>{#p/papyrus}{#f/26}PILLOWS OR NOT, THERE'S NO SECRET TO MY LEGS.",
         '<15>{#f/10}ONLY HARD WORK AND PERSEVERANCE!',
         '<15>{#f/20}再试试吧！'
      ],
      papdate25f: [
         '<15>{#p/papyrus}{#f/24}这里的“潮流”\n或许确实\n无人能敌...',
         '<15>{#f/20}但要是期待这里\n有什么秘密是\n完全不可能的！',
         '<15>{#f/20}再试试吧！'
      ],
      papdate25g: [
         '<15>{#p/papyrus}{#f/20}啊这个！\n这是我的\n顶级运动服！',
         "<15>{#f/24}你在这里可\n找不到任何\n秘密，因为...",
         "<15>{#f/20}我就没有口袋\n可以装！！！",
         '<15>{#f/20}再试试吧！'
      ],
      papdate25h: () => [
         '<15>{#p/papyrus}{#f/24}我的肩膀...',
         '<15>{#f/10}你是想让我\n把你背到\n肩上吗？？',
         SAVE.data.b.flirt_papyrus
            ? "<15>{#f/24}如果我们没在\n忙着约会的话，\n我肯定会给你。"
            : "<15>{#f/24}如果我们没在\n忙着消遣的话，\n我肯定会给你。",
         '<15>{#f/20}所以现在不行！\n再试试吧！'
      ],
      papdate25i: [
         '<15>{#p/papyrus}{#f/14}你认真吗？？',
         "<15>{#f/19}我没想就这么\n【告诉】你\n秘密的...",
         "<15>{#f/20}你还必须得\n再加把劲！"
      ],
      papdate25j: () =>
         calcLV() > 2
            ? [
                 '<15>{#p/papyrus}{#f/24}IF YOUR {@fill=#f00}LV{@fill=#000} IS THIS HIGH, THEN...',
                 SAVE.data.b.flirt_papyrus
                    ? '<15>{#f/28}YOUR {@fill=#f00}LOVE{@fill=#000} FOR ME MUST BE EVEN GREATER THAN I THOUGHT!'
                    : "<15>{#f/28}YOU'VE GOT MORE EXPERIENCE WITH {@fill=#f00}LOVE{@fill=#000} THAN I THOUGHT!",
                 "<15>{#f/24}STILL, THAT'S YOUR SECRET, NOT MINE.",
                 '<15>{#f/20}再试试吧！'
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
                 '<15>{#f/20}再试试吧！'
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
                 '<15>{#f/20}再试试吧！'
              ]
            : [
                 '<15>{#p/papyrus}{#f/24}AN {@fill=#f00}LV{@fill=#000} OF ZERO?',
                 "<15>{#f/26}OKAY, THAT'S WEIRD.",
                 "<15>{#f/21}SANS TOLD ME A HUMAN'S {@fill=#f00}LOVE{@fill=#000} STARTS AT ONE.",
                 '<15>{#f/24}HMM...',
                 '<15>{#f/24}IS THIS YOUR SECRET?',
                 '<15>{#f/20}WELL, THIS IS SUPPOSED TO BE ABOUT MY SECRET!',
                 '<15>{#f/20}再试试吧！'
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
         '<15>{#f/20}再试试吧！'
      ],
      papdate25l: [
         "<15>{#p/papyrus}{#f/20}SO THAT'S HOW IT IS...",
         '<15>{#f/24}YOU THINK BY SCRATCHING MY NECK...',
         '<15>{#f/21}AND CALLING ME A \"GOOD BOY...\"',
         "<15>{#f/24}I'LL BARK THE ANSWER AT YOU LIKE A DOG.",
         '<15>{#f/20}LAST I CHECKED, I WAS A SKELETON!\nSO TRY AGAIN!'
      ],
      papdate26: () => [
         '<15>{#p/papyrus}{#f/27}那-那好吧...',
         '<15>{#f/27}你找到我的\n秘密了！',
         '<15>{#f/24}我觉得我没有\n什么别的选择，\n只能承认\n事实了。',
         "<15>{#f/24}这是个...",
         [ '<15>{#f/27}只-只送给你的\n礼物！！！', '<15>{#f/27}给我们两个\n分享的礼物！！！' ][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
         ],
         '<15>{#f/10}快！\n快打开！'
      ],
      papdate27: () => [ choicer.create('* （你该怎么办？）', '打开', '不要') ],
      papdate28: [
         "<15>{#p/papyrus}{#f/21}你甚至不忍心\n弄坏我精致的\n包装？？",
         '<15>{#f/27}不-不...\n居然来这招...',
         "<15>{#f/13}真的好厉害！",
         '<15>{#f/14}但-但是...\n啊哈！\n看我的反击！',
         "<15>{#f/15}我自己拆\n不就好了！！"
      ],
      papdate29: [ '<15>{#p/papyrus}{#f/20}你知道【这】是\n什么吗？' ],
      papdate30: () => [ choicer.create('* （你知道这是什么吗？）', "当然知道", "不知道") ],
      papdate31a: [
         '<15>{#p/papyrus}{#f/26}意大利面。',
         "<15>{#f/24}这是你现在\n脑子里的想法，\n没错吧？",
         '<15>{#f/20}对了！',
         '<15>{#f/15}但是也-\n错了！'
      ],
      papdate31b: [
         "<15>{#p/papyrus}{#f/20}捏嘿嘿！\n这才对嘛。",
         '<15>{#p/papyrus}{#f/15}你根本想不到！',
         '<15>{#f/24}虽然这看起来\n是意大利面...'
      ],
      papdate32: () => [
         "<15>{#p/papyrus}{#f/20}这可不是什么\n普通的意面！",
         "<15>{#f/20}这是一个\n大师的杰作！",
         '<15>{#f/24}丝般柔滑的意面，\n在时间膨胀\n单元之中\n精细陈化。',
         '<15>{#f/20}然后再由我，\n主厨PAPYRUS\n来加工！',
         "<15>{#f/15}人类！！！\n是时候结束这\n一切了！！",
         "<15>我们不能再这样\n僵持下去了！",
         ...[ [ "<15>{#f/20}我们一起来吃\n这盘意大利面\n吧！！！" ], [ '<15>{#f/20}尽情享受我的\n终极厨艺吧！！' ] ][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
         ]
      ],
      papdate33: () => [ choicer.create('* （你该怎么办？）', '吃掉', '不要') ],
      papdate33a: () => [
         '<32>{#p/human}* （你咬了一小口。）\n* （味道让你脸红了。）',
         "<32>{#p/basic}* 真的好好吃...！",
         ...(SAVE.data.n.state_papyrus_spaghet === 1
            ? [ '<32>{#p/basic}* Papyrus看起来也吃得很开心。' ]
            : [])
      ],
      papdate34a: () => [
         '<15>{#p/papyrus}{#f/10}多么充满激情的\n表达！！',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/12}你肯定真心爱着\n我的厨艺！'
            : '<15>{#f/12}你肯定真心喜欢\n我的厨艺！',
         ...[
            [
               '<15>{#f/24}那个，虽然\n我也这样...',
               SAVE.data.b.flirt_papyrus
                  ? '<15>{#f/20}但我觉得你甚至\n比我更爱我的\n厨艺！！！'
                  : '<15>{#f/20}但我觉得你甚至\n比我更喜欢我的\n厨艺！！！'
            ],
            [ '<15>{#f/10}AND BY EXTENSION, ME!', '<15>{#f/20}MAYBE EVEN MORE THAN I DO!!!' ]
         ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2],
         "<15>{#f/27}但... 那是\n不可能的...！",
         '<15>{#f/12}你是怎么\n做到的！？！？'
      ],
      papdate34b: () => [
         '<15>{#p/papyrus}{#f/21}你的意思是...',
         "<15>{#f/18}你要留给我吃？",
         ...[
            [
               '<15>{#f/24}我以为你之前\n说要分享...',
               '<15>{#f/20}你会至少想自己\n尝一小口。',
               '<15>{#f/27}但你不是\n这样的，\n你都留给我了...',
               '<15>{#f/12}你想让我，\n让【我】来，\n全都吃掉！！！'
            ],
            [
               '<15>{#f/21}即使你之前\n说过...',
               '<15>{#f/21}你想自己品尝\n我的意大利面...',
               '<15>{#f/27}就在你马上要\n实现的时候，\n你...',
               '<15>{#f/12}你要放弃\n全留给我？？？'
            ]
         ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      papdate35: [ '<15>{*}{#p/papyrus}{#f/22}啊！！！{%15}' ],
      papdate36: [ '<15>{*}{#p/papyrus}{#f/22}呃！！！{%15}' ],
      papdate37: [ '<15>{*}{#p/papyrus}{#f/22}不啊啊啊！！！{%15}' ],
      papdate38: () => [
         "<18>{#p/papyrus}{@random=1.1/1.1}人类。\n一切都清晰明了了。",
         SAVE.data.b.flirt_papyrus
            ? "<18>{@random=1.1/1.1}你已经痴狂地\n爱上了我。"
            : "<18>{@random=1.1/1.1}你已经完全\n被我迷住了。",
         '<99>{@random=1.1/1.1}你做的每一件事。\n你说的每一个字。',
         "<18>{@random=1.1/1.1}一切的一切\n都是为了我。",
         '<18>{@random=1.1/1.1}人类。\n我也想让你，\n感到快乐。',
         "<18>{@random=1.1/1.1}现在轮到我\n来表达我的\n感情了...",
         "<18>{@random=1.1/1.1}轮到我来告诉你\n我的真心话了。"
      ],
      papdate39: () =>
         SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/21}人类，我的\n真心话是...',
                 "<15>{#f/21}我就是不\n像你那样\n喜欢我。",
                 '<15>{#f/24}我是说，\n浪漫的那种。',
                 '<15>{#f/27}我是说，我已经\n很努力了！',
                 '<15>{#f/27}我觉得因为你\n跟我调情过了...',
                 '<15>{#f/27}我就该跟你\n约一次会。',
                 '<15>{#f/10}然后，在我们\n约会的过程中，\n感情就会开花\n结果！！！',
                 '<15>{#f/20}我就能配得上\n你对我的热情！',
                 '<15>{#f/21}但是...\n我，伟大的\nPAPYRUS...',
                 '<15>{#f/21}失败了。',
                 '<15>{#f/21}我跟之前相比\n没什么两样。',
                 '<15>{#f/27}最坏的部分是，\n跟你约会之后...',
                 '<15>{#f/22}我只会把你拉进\n更深的爱里！',
                 '<15>{#f/21}那是激情的\n黑暗牢笼，\n无处可逃。',
                 '<15>{#f/27}我怎么能这样\n对我亲爱的\n朋友呢...？',
                 '<15>{#f/27}...',
                 '<15>{#f/27}... 不...'
              ]
            : [ '<15>{#f/24}人类，实际上...' ],
      papdate39a: () => [
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 "<15>{#f/20}不！\n不是这样的！",
                 "<15>{#f/17}我不会在任何\n事情上失败！！！",
                 "<15>{#f/20}人类！！！\n我会帮助你度过\n这段艰难的\n时光！！！",
                 "<15>{#f/24}我可以继续当你\n酷酷的朋友...",
                 '<15>{#f/20}然后把发生的\n这一切忘掉。',
                 '<15>{#f/10}毕竟，你也，\n很伟大。',
                 '<15>{#f/20}失去你的友谊\n会是一场悲剧！',
                 '<15>{#f/21}所以，拜托...',
                 "<15>{#f/21}不要因为我不能\n亲吻你而哭泣...",
                 "<15>{#f/19}因为，我根本\n没有嘴唇！！！",
                 ...(SAVE.data.n.plot < 48
                    ? [
                         "<15>{#f/10}嘿，总有一天，\n你会找到和我\n一样好的人。",
                         "<15>{#f/24}呃，不。\n那是不可能的。",
                         "<15>{#f/20}但我也会接受\n你找个第二好的\n人！！！"
                      ]
                    : [ "<15>{#f/10}AND HEY, UNDYNE'S NOT TOO FAR FROM HERE.", '<15>{#f/20}WE CAN HANG OUT WITH HER!' ])
              ]
            : [
                 '<15>{#f/10}我也喜欢你！',
                 '<15>{#f/10}毕竟你是个\n超级大好人。',
                 '<15>{#f/21}但也许...',
                 "<15>{#f/21}如果你多为\n自己而活的话，\n你会过得更好的。",
                 '<15>{#f/21}不能只为了\n我而活。',
                 '<15>{#f/10}很幸运的是，\n我知道解决\n方案！！！',
                 '<15>{#f/20}那就是跟我的上司，\nUNDYNE一起消遣！！！',
                 '<15>{#f/24}我觉得如果你\n可以把你的友谊能量\n分散一点...',
                 "<15>{#f/10}你的生活方式\n就会更健康。",
                 ...(SAVE.data.n.plot < 48
                    ? [ "<15>{#f/20}I'LL LET YOU KNOW WHEN I'M READY!" ]
                    : [ "<15>{#f/20}所以让我们！\n一起加油吧！！" ])
              ]),
         '<15>{#f/20}捏嘿嘿\n嘿嘿！！！'
      ],
      papdate40: () => [
         '<15>{#f/24}哦，如果你还想\n找我的话...',
         "<15>{#f/10}这是我的\n{@fill=#f00}电话号码{@fill=#000}。",
         '<15>{#f/11}欢迎你随时\n打给我！',
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/24}当然，\n是柏拉图式的。',
                 ...(SAVE.data.n.plot < 48
                    ? [ '<15>{#f/10}那么，\n我先走啦！' ]
                    : [ "<15>{#f/10}那么，我们\n在UNDYNE的房子那里\n见面吧！" ])
              ]
            : SAVE.data.n.plot < 48
            ? [ '<15>{#f/10}那么，\n我先走啦！' ]
            : [ "<15>{#f/20}WELL, SEE YOU AT UNDYNE'S HOUSE!" ]),
         '<15>{#f/20}捏嘿嘿！'
      ],
      papdate41: {
         a: () => (SAVE.data.b.flirt_papyrus ? '浪漫' : '友谊'),
         b: '功率\n水平',
         c: '日期：克历615年9月',
         d: '速度',
         e: '星系\n地图',
         f: '紧张感'
      },
      pappuzzle1: [
         '<18>{#p/papyrus}{#f/0}人类！',
         '<18>{#f/0}下一个谜题\n是我最喜欢的\n谜题之一。',
         "<18>{#f/4}这就像我兄弟的\n棉球收藏一样...",
         '<18>{#f/0}不论哪个地方\n都让人满意！',
         "<18>{#f/9}我【尽量】不告诉你\n解决方法。"
      ],
      pappuzzle1a: [ '<18>{#p/papyrus}{#f/0}试试吧！' ],
      pappuzzle1b: [
         '<18>{#p/papyrus}{#f/4}IT WOULD APPEAR THIS PUZZLE HAS BEEN SOLVED.',
         '<18>{#p/papyrus}{#f/4}BEHIND MY BACK.',
         '<18>{#p/papyrus}{#f/4}WITHOUT MY EXPRESS PERMISSION.',
         "<18>{#p/papyrus}{#f/0}WELL, SOMEBODY'S GOING TO HAVE A BAD DAY TODAY.",
         '<18>{#p/papyrus}{#f/5}...',
         '<18>{#p/papyrus}{#f/5}WITH ANY LUCK, THE NEXT PUZZLE WILL BE TAMPER-FREE.',
         "<18>{#p/papyrus}{#f/6}... I'LL MEET YOU IN THE NEXT ROOM."
      ],
      pappuzzle2: [ '<18>{#p/papyrus}哇！\n你解开了啊！！' ],
      pappuzzle2a: [ '<18>而且不用我的帮忙\n你就解开了！！！' ],
      pappuzzle2b: [ "<18>而且根本没用我\n帮你太多\n你就解开了！" ],
      pappuzzle2c: [ '<18>虽然需要一点鼓励，\n但你真的做到了！' ],
      pappuzzle2d: [
         '<18>你一定跟我一样\n很在意谜题吧！',
         "<18>那么，我觉得你肯定\n会爱上下个谜题的！",
         '<18>可能对你而言\n都算太简单了！！',
         '<18>捏！\n嘿嘿！\n嘿嘿嘿！！！'
      ],
      papsink0: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The dog residue in this sink appears to be arranged in the shape of a heart.)',
                 '<32>* (Somehow, this seems to put you at ease.)'
              ]
            : SAVE.data.n.plot < 72
            ? [ "<32>{#p/basic}* 水槽太高了，\n  你都没办法洗手..." ]
            : [ "<32>{#p/basic}* There's a pile of dog residue in the sink." ],
      papsink1: [
         '<18>{#p/papyrus}{#f/9}厉害吧？\n我增加了水槽的高度。',
         '<18>{#f/0}现在我可以在下边\n放更多骨头了！\n你快看看！'
      ],
      papsink2: [ '<18>{#p/papyrus}{#f/8}不！是那条狗！' ],
      papsink3: [ '<18>{#p/papyrus}{#f/31}哦，好可怜\n好可怜的小狗狗...', '<18>{#f/9}给你，尝尝我的\n特殊攻击！' ],
      papsink4: [ '<18>{#p/papyrus}哇！！！\n它喜欢诶！！！' ],
      papsink5: [ '<18>{#p/papyrus}{#f/7}SANS！', '<18>别再用配乐\n打扰我的生活了！！' ],
      papsink6: [ '<18>{#p/papyrus}{#f/4}现在那条狗\n在我的攻击下\n消失了。', '<18>哦好吧...' ],
      papsolu1: [
         '<18>{#p/papyrus}看起来你需要\n一个提示。',
         '<18>{#f/4}嗯...',
         "<18>{#f/0}喏，我会注意\n这几条电路的。",
         "<18>{#f/0}但这只是\n我自己的见解哦。"
      ],
      papsolu2: [
         '<18>{#p/papyrus}{#f/5}还是困惑吗？',
         '<18>{#f/5}呃... 或许...',
         '<18>{#f/6}你用电路一点点\n推出答案呢？？？',
         "<18>{#f/5}我在尽量不给你\n把答案透露出来了..."
      ],
      papsolu3: [
         '<18>{#p/papyrus}{#f/6}还来？？？',
         '<18>{#f/0}我觉得，\n我应该完全可以\n告诉你解法了。',
         "<18>{#f/4}虽然我其实\n不想扫兴..."
      ],
      papsolu3a: () => [
         '<18>{#p/papyrus}{#f/9}你真的，真的想要\n谜题的解法吗？？？',
         choicer.create('* （你要怎么回答？）', "告诉我", "再想想")
      ],
      papsolu3a1: () => [
         '<18>{#p/papyrus}解！法！就是！',
         '<18>{#f/4}（请脑补一段\n敲鼓声...）',
         SAVE.data.b.s_state_pretrick
            ? '<18>{#f/0}... THAT TERMINAL AT THE BOTTOM LEFT OF THE ROOM!'
            : '<18>{#f/0}...在你右侧那盏灯\n旁边的那棵\n全息投影树！',
         '<18>快去看看叭！！！'
      ],
      papsolu3a2: [
         "<18>{#p/papyrus}哇... 你真是个\n谜题爱好者！",
         "<18>我被你的热情\n给打动了！",
         '<18>你做得到的，\n人类！！！'
      ],
      papsolu4: [ "<18>{#p/papyrus}{#f/4}你忘记我给你的\n解法了吗...？" ],
      papsolu5: [ '<18>{#f/0}{#p/papyrus}就快完成了！\n只剩下一条电路\n就要激活了！' ],
      papspaghet1: (take: boolean) => [
         '<18>{#p/papyrus}{#f/1}什么！？\n你是怎么避开\n我的陷阱的？',
         '<18>{#f/4}还有，比起这个...',
         '<18>{#f/0}还有剩的给我吗？？？',
         choicer.create('* （你要怎么跟Papyrus说\n  关于他做的意大利面的事？）', take ? '拿走了' : '留在那了', '吃掉了'),
         '<18>{#p/papyrus}真的！？'
      ],
      papspaghet1a: () => [
         '<18>{#p/papyrus}{#f/1}什么！？\n你是怎么避开\n我的陷阱的？',
         '<18>{#f/4}还有，比起这个...',
         '<18>{#f/0}有给我剩...',
         '<18>{#f/4}...等下。',
         "<18>{#f/0}你带着它呢！！",
         '<18>{#f/9}人类，你怎么打算的？',
         choicer.create("* （你要拿Papyrus的意面怎么办呢？）", '一起吃吧', '吃掉'),
         '<18>{#p/papyrus}真的！？'
      ],
      papspaghet2a: [
         "<18>{#f/5}你抗拒我做的\n意大利面的味道...",
         '<18>{#f/6}就是因为想跟我\n一起吃吗？？？',
         '<18>{#f/9}那好吧！！',
         '<18>不要烦恼！\n我，伟大的PAPYRUS...',
         '<18>会为你和我二人\n做各种我们想吃的\n意大利面的！',
         '<18>{#f/0}嘿嘿嘿嘿嘿嘿捏！'
      ],
      papspaghet2b: [
         '<18>{#f/5}哇...',
         '<19>{#f/6}之前几乎从来没有人\n欣赏过我的厨艺...',
         '<18>{#f/9}那好吧！！',
         '<18>不要烦恼！\n我，伟大的PAPYRUS...',
         '<18>会为你做你想吃的\n各种意大利面的！',
         '<18>{#f/0}嘿嘿嘿嘿嘿嘿捏！'
      ],
      paptv: pager.create(
         0,
         () => [
            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
               ? [ "<18>{#p/papyrus}哦，这是我\n最喜欢的电视节目！" ]
               : []),
            ...(SAVE.data.n.plot < 67.1
               ? [ '<33>{#p/mettaton}* “敬请期待新节目！”' ]
               : SAVE.data.b.killed_mettaton
               ? [ '<33>{#p/mettaton}* \"NETWORK UNREACHABLE.\"' ]
               : world.bad_robot
               ? [ '<33>{#p/mettaton}* \"SORRY, FOLKS!\"\n* \"THE PROGRAM\'S BEEN CANCELLED!\"' ]
               : [ '<32>{#p/mettaton}* \"HOPE YOU ENJOYED THE SHOW!\"' ]),
            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
               ? [
                    "<18>{#p/papyrus}{#f/7}什么！！！\n平常都比这个\n精彩的！",
                    '<18>{#f/4}单纯就是这一期\n质量不好。',
                    "<18>{#f/7}你不许喷我！！！"
                 ]
               : [])
         ],
         [ '<33>{#p/mettaton}* “敬请期待新节目！”' ]
      ),
      papyrus1: [ '<18>{#p/papyrus}所以，在我讨论\nUNDYNE的时候...' ],
      papyrus2: [
         '<18>{#p/papyrus}SANS！！\n我的天啊！！\n那是个...',
         '<18>人类吗！？！？',
         "<25>{#p/sans}{#f/2}* 不是，那就是个\n  人类形状的全息投影。"
      ],
      papyrus3: [
         '<18>{#p/papyrus}{#f/4}哦。',
         '<18>{#f/4}...',
         '<18>{#f/4}等一下...',
         "<18>{#f/7}你在撒谎！！",
         '<25>{#p/sans}{#f/2}* 抱歉，我是想说\n  “全息投影形状的人类”。',
         '<18>{#p/papyrus}{#f/0}...SANS，我们\n终于做到了！',
         '<18>{#f/9}UNDYNE现在【必定】会让我\n加入皇家卫队了！！！',
         '<18>{#f/6}我们只需要...',
         '<18>{#f/5}去...',
         '<18>{#f/4}...',
         "<18>{#f/4}我把什么东西给忘了。",
         '<25>{#p/sans}{#f/2}* 演讲，还记得吗？',
         '<18>{#p/papyrus}{#f/4}哦，对对对。\n...“咳咳”。',
         "<18>{#f/9}人类！你可能以为\n你来到这里就安全了。",
         '<18>{#f/9}但我，\n伟大的PAPYRUS，\n打算扭转你的想法！',
         "<18>{#f/4}首先，我要用\nALPHYS博士的谜题\n让你眼花缭乱...",
         '<18>{#f/4}然后，\n在你最意想不到的时候...',
         '<19>{#f/9}哇呜！\n抓到你了！\n押去首塔！',
         '<18>{#f/9}我们的战斗\n将一如既往地传奇！',
         '<18>{#f/4}无论如何...',
         '<18>{#f/9}来吧... \n只要你够胆！'
      ],
      papyrus4: [ '<18>{#f/0}捏嘿嘿嘿嘿\n嘿嘿嘿！！！' ],
      papyrus5: [
         '<25>{#p/sans}* 不错，进展很顺利。',
         "<25>* 别担心，伙计。",
         "<25>{#f/2}* 我会用眼窝\n  替你盯着的。"
      ],
      papyrus6x1: [ '<18>{#p/papyrus}{#f/5}人-人类？\n你就是那个人类吗...？' ],
      papyrus6x2: [
         "<15>{#p/papyrus}{#e/papyrus/20}我的天哪！\n我终于见到你啦！",
         "<18>{#p/papyrus}{#f/0}自打听说你来了星港，\n我就梦想着能见你一面！",
         "<18>{#p/papyrus}{#f/4}...你问，\n为啥SANS没跟我\n在一起？",
         '<18>{#p/papyrus}{#f/6}唉，我有理由怀疑...',
         '<18>{#p/papyrus}{#f/5}...他好像\n刻意想让我躲着你。',
         '<18>{#p/papyrus}{#f/7}真不愧是他！！！',
         '<18>{#p/papyrus}{#f/0}但是，\n只要你不说，我不说~',
         "<18>{#p/papyrus}{#f/9}那懒骨头\n就甭想知道【一丁点】\n咱们的“地下情谊”！"
      ],
      papyrus6x3: [
         "<18>{#p/papyrus}{#f/5}不过，我现在得走了。\n绝不能让他发现\n我偷偷溜出来了。",
         "<18>{|}{#p/papyrus}{#f/9}待会见，人-{%}"
      ],
      papyrus6x4: [ '<32>{#p/without}* ...papyrus？' ],
      papyrus6: () => [
         '<18>{#p/papyrus}{#f/9}人类！！',
         world.nootflags.has('s_puzzle2') // NO-TRANSLATE

            ? '<18>{#f/4}YOU MAY HAVE HAD AN EASY TIME BEFORE.'
            : '<18>{#f/4}你可能已经过了\n我很多别的挑战。',
         "<18>{#f/9}但现在，你就\n绝对要束手无策了！",
         '<18>你也看到了，\n出这个谜题的\n不是别人...',
         '<18>{#f/0}正是那个大名鼎鼎的\nALPHYS博士！',
         '<18>实际上，\n规则很简单。',
         '<18>这个显示器会\n随机读出一个数字。',
         '<18>{#f/9}...这数字就是\n你度过这里\n所需要的秒数！',
         '<18>{#f/0}如果数字是奇数，\n你就必须躲避子弹。',
         '<18>以1结尾的数\n是星形的子弹...',
         '<18>以3结尾的数\n是月亮形状的子弹...',
         '<18>{#f/4}5是彗星的，\n7是类星体的...',
         "<18>{#f/9}如果是9结尾的，\n就是完全随机！",
         '<18>{#f/0}如果数字是质数，\n重力就会翻转。',
         "<18>{#f/4}（不过，\n小于10的质数\n一般不会触发。）",
         '<18>{#f/0}如果数字是偶数，\n你一开始会\n平安无事...',
         '<18>{#f/9}但你接下来就要\n遭遇到随机的怪物！',
         '<18>并且，如果是\n2的整数幂，会使\n怪物数量翻倍！！',
         '<18>{#f/0}如果某个数字\n重复了两次...',
         '<18>{#f/0}等待的时间\n就会乘以这个数字！',
         '<18>{#f/0}如果数字是\n按顺序排列的，\n譬如1-2-3...',
         '<18>{#f/0}房间就会摇摇晃晃，\n让你连走都走不动！',
         '<18>{#f/0}然后，如果\n包含一个数字4...',
         '<18>{#f/9}SANS就会随机用\n蓝色魔法\n让你浮起来！',
         "<25>{#p/sans}{#f/6}* 你看吧，\n  这就是我特殊的黄色眼睛。",
         '<18>{#p/papyrus}{#f/7}现在不行，SANS！！',
         '<25>{#p/sans}* 哦，嘿嘿。\n* 看来我有些{@fill=#ff0}浮{@fill=#fff}躁了，嗯？',
         '<18>{#p/papyrus}{#f/4}好好好...',
         '<18>{#f/9}总之！\n你理解我的\n解释了吗？',
         choicer.create('* （你要怎么回答？）', "听懂了", "没听懂")
      ],
      papyrus7: () => [
         "<18>{#p/papyrus}{#f/9}好，\n那我们回顾一遍！",
         '<18>{#f/0}这个显示器会随机\n生成一个秒数。',
         '<18>也就是，\n你要等多少秒\n才能通过的时间。',
         '<18>奇数要躲子弹。',
         "<18>尾数决定\n子弹的种类。",
         '<18>1是星星，3是月亮，\n5是类星体，\n7是...',
         '<18>{#f/5}等等，\n哪个数字是\n类星体来着？',
         '<18>{#f/9}呃，然后，\n如果尾数是9，\n就是完全随机！',
         '<18>{#f/0}质数会改变重力...',
         '<18>{#f/0}偶数会\n遭遇随机战斗...',
         '<18>{#f/5}等等，\n我刚才是说\n重力会改变吗！？，',
         '<18>{#f/7}呃，我是说颠倒！！',
         '<18>{#f/0}但是2的整数幂\n会使遭遇数翻倍。',
         '<18>数字按顺序排列的\n会让房间摇晃，\n然后4是...',
         '<18>{#f/6}呃，我忘记\n4会发生什么了。',
         "<25>{#p/sans}* 你这不是在暗示我吗？",
         '<18>{#p/papyrus}{#f/6}可能吧？？？',
         '<18>{#f/7}管他呢！！\n你现在理解了吗！？',
         choicer.create('* （你要怎么回答？）', '当然', '更糊涂了')
      ],
      papyrus8: [
         '<18>{#p/papyrus}{#f/9}那... 好吧...',
         "<18>{#f/9}这样吧，\n我把规则放在这！",
         '<18>{#f/0}这样，你就可以\n按自己的节奏\n自己读了。',
         '<18>祝你好运，人类！！',
         '<18>{#f/5}捏... 嘿嘿...'
      ],
      papyrus9: [
         '<18>{#p/papyrus}{#f/9}太奈斯了！',
         '<18>{#f/9}好，废话少说...',
         "<18>让我们看看\n会是什么随机数！！"
      ],
      papyrus10: [
         '<18>{#p/papyrus}{#f/9}人类！',
         '<18>{#f/9}准备好面对你\n最严峻的挑战了吗？',
         '<18>{#f/9}特此介绍...\n这致命恐怖的挑战！'
      ],
      papyrus11: [
         '<18>{#p/papyrus}{#f/9}一旦我下达命令，\n一切都会动起来！',
         '<18>激光扫射！\n线圈发电！\n刀剑挥舞！',
         '<18>一切都会以精确的、\n战术性的方式进行！',
         '<18>{#f/4}不精确的一点是，\n你肯定会失败。',
         '<18>{#f/9}那么！！！\n你准备好了吗！？！？',
         '<18>因为！',
         '<18>我！',
         '<18>就！',
         '<18>要！',
         '<18>启动了！'
      ],
      papyrus12: [
         '<25>{#p/sans}* 怎么了？\n* 我们到底还进不进行了？',
         '<18>{#p/papyrus}{#f/7}...',
         "<25>{#p/sans}{#f/3}* 那条烦人的狗\n  在上面会不耐烦的。",
         '<18>{#p/papyrus}{#f/7}随时都会进行的！'
      ],
      papyrus13: [
         '<25>{#p/sans}* 准备好了就开始吧。',
         '<18>{#p/papyrus}{#f/6}我...',
         "<18>{#f/6}我现在在想...",
         '<18>{#f/6}这个挑战...',
         '<18>{#f/6}可能...',
         '<18>{#f/6}...',
         '<18>{#f/4}...有点不算个\n好主意了。',
         '<18>{#f/5}一想到\n我设计的这个挑战\n可以这么...',
         '<18>{#f/9}但是，不用害怕！',
         '<18>{#f/9}我是个\n有原则的骷髅！',
         '<18>{#f/4}就是，坦白来说，\n一个你根本不可能\n活着通过的挑战...',
         '<18>{#f/7}就实在是太做作了！',
         '<18>走你！！'
      ],
      papyrus14: [
         '<18>{#p/papyrus}{#f/7}你看什么看！？',
         '<18>{#f/9}这只是PAPYRUS的\n又一次决定性的\n胜利罢了！！',
         '<18>捏！',
         '<18>嘿！',
         '<18>{#f/4}...',
         '<18>...嘿？'
      ],
      papyrusFinal1: [
         '<23>{#p/papyrus}{#f/30}人类。',
         '<23>请允许我倾诉\n一些复杂的情感。',
         '<23>就像...'
      ],
      papyrusFinal2: () =>
         world.genocide
            ? [
                 '<23>失去至亲的悲痛。',
                 '<23>无能为力的自责。',
                 '<23>阴阳两隔的怀念。',
                 '<23>这些情感...'
              ]
            : papreal()
            ? [
                 '<23>众生罹难的心痛。',
                 "<23>无能为力的绝望。",
                 '<23>改过自新的理想。',
                 '<23>这些情感...'
              ]
            : [
                 '<23>找到另一个\n意面爱好者的喜悦。',
                 "<23>对另一个人\n解谜技巧的钦佩。",
                 '<23>想有一个很酷、\n很聪明的人认为你\n也同样很酷的渴望。',
                 '<23>这些情感...'
              ],
      papyrusFinal3: () =>
         world.genocide || papreal()
            ? [
                 '<18>{#f/31}肯定正萦绕在你心头。',
                 '<18>{#f/32}很难想象这些情感\n究竟是怎样的...',
                 '<18>{#f/6}毕竟，我很... 伟大...',
                 '<18>{#f/32}{#x1}...',
                 '<18>{#f/31}人类，尽管你做了\n很多错事...\n我...',
                 '<18>{#f/5}我仍然相信你！',
                 '<18>{#f/31}我知道，\n你可以浪子回头。',
                 '<18>{#f/31}我知道，\n你愿意变得更好。',
                 ...(world.genocide
                    ? [ "<18>{#f/4}不管那个“ASRIEL”\n说了什么荒唐的话，" ]
                    : [ '<18>{#f/5}不管你觉得自己\n多么不可救药，' ]),
                 "<18>{#f/6}{#x2}但我知道，在内心深处，\n你还是个好人！",
                 '<18>{#f/0}我会让你的善良重见天日！',
                 '<18>{#f/0}我会让你的潜能尽数释放！',
                 '<18>{#f/4}最终...',
                 '<18>{#f/9}我会让你知道，\n你仍然是最棒的！！！',
                 '<18>{#f/0}我，PAPYRUS，\n敞开双臂欢迎你！'
              ]
            : [
                 '<18>{#f/0}一定就是你\n现在的情感！！',
                 '<18>{#f/4}我很难想象这些情感\n究竟是怎样的...',
                 '<18>{#f/4}毕竟，我十分伟大。',
                 '<18>我从来不好奇\n有很多朋友的感觉\n是怎样的。',
                 '<18>{#f/5}我很同情你，\n孤单的人类...',
                 '<18>{#f/0}但不要担心！！！\n你再也不会孤单了！',
                 '<18>{#f/9}因为我，\n伟大的PAPYRUS，\n会成为你的...',
                 '<18>{#f/5}{#x1}...',
                 '<18>不...',
                 '<18>{#f/7}{#x2}不，不该是这样的！',
                 '<18>我不能成为\n你的“朋友”...',
                 '<18>你是个人类！\n我必须逮捕你！！！',
                 '<18>{#f/9}然后，我就可以实现\n我毕生的梦想！！！',
                 '<18>力量强大！\n受人爱戴！\n声名远扬！！！',
                 "<18>那就是PAPYRUS！！！",
                 '<18>{#f/4}皇家守卫中...',
                 '<18>{#f/9}最闪亮的新星！！！'
              ],
      papyrusFinal4: (b: boolean) =>
         world.edgy || world.killed0
            ? [
                 '<18>{#p/papyrus}{#f/0}哇！\n你做到了！',
                 "<18>{#p/papyrus}{#f/5}没有动用任何暴力！",
                 '<18>{#p/papyrus}{#f/6}其实，\n刚才我有点害怕...',
                 "<18>{#p/papyrus}{#f/0}不过没关系！\n你已经重回正轨啦！",
                 "<18>{#p/papyrus}{#f/8}我为你骄傲，人类！",
                 "<18>{#p/papyrus}{#f/4}...等等，我是不是\n该抓你来着？",
                 "<18>{#p/papyrus}{#f/0}嗨，随它去吧。",
                 '<18>{#p/papyrus}{#f/0}只要你能成为最棒的自己，\n我就满足啦。',
                 "<18>{#p/papyrus}{#f/5}过去的事，\n就让它成为{@fill=#ff0}骨{@fill=#fff}事吧，\n好吗？",
                 "<18>{#p/papyrus}{#f/9}我还要告诉你\n怎么离开这里！"
              ]
            : [
                 '<18>{#p/papyrus}{#f/5}扭呜呼呼...',
                 ...(b
                    ? [ "<18>我没有足够的力量\n阻止你..." ]
                    : [ "<18>连像你这样\n弱小的人\n我都阻止不了..." ]),
                 "<18>{#f/7}UNDYNE一定会\n对我非常失望的！",
                 "<18>{#f/5}我也永远不能\n加入皇家卫队了...",
                 '<18>{#f/7}而且...\n我的粉丝数也会\n就这样停滞不前！',
                 "<99>{#p/human}* （你要怎么回答？）{!}\n§shift=56§我们做§shift=83§真是个\n§shift=56§朋友吧§shift=83§废柴{#c/0/7/7}"
              ],
      papyrusFinal4a1: (b: boolean) =>
         b
            ? [
                 '<18>{#p/papyrus}{#f/5}真-真的吗？\n你想跟我做朋友？',
                 '<18>{#f/6}即使发生了\n那样的事情？？？',
                 "<18>{#f/0}那，好吧！！\n我们做朋友吧！！"
              ]
            : [
                 '<18>{#p/papyrus}{#f/1}真的吗！？\n你想跟我做朋友？？？',
                 '<18>{#f/6}那...\n我觉得...',
                 '<18>{#f/0}我可以给你\n一个照应了！'
              ],
      papyrusFinal4a2: (b: boolean) =>
         b
            ? [
                 '<18>{#p/papyrus}{#f/5}嗯？你是...\n想责备我吗？？？',
                 "<18>{#f/6}是因为我不够强大，\n不配做你的朋友吗？",
                 '<18>{#f/5}...不...',
                 '<18>{#f/7}哦，我在说什么啊！！\n我当然很强大！',
                 "<18>{#f/9}我会通过跟你交朋友\n证明给你看！"
              ]
            : [
                 '<18>{#p/papyrus}{#f/1}啊？为啥你要那么大声地\n骂自己呢？？？',
                 '<18>{#f/4}是不是因为...',
                 "<18>{#f/7}你感觉自己不够优秀，\n不配做我的朋友？",
                 "<18>{#f/9}错啦，你其实很棒！\n我会成为你的朋友的！！！"
              ],
      papyrusFinal4b1: [
         '<18>{#f/0}好耶！！',
         '<18>我交到一个新朋友啦！！',
         '<18>{#f/4}谁能想到，成为好朋友...'
      ],
      papyrusFinal4b2: [
         '<18>{#f/0}好耶！！',
         "<18>{#f/0}我们还没有进行\n第一次约会...",
         "<18>{#f/0}就已经成为\n好朋友了！！！",
         '<18>{#f/4}谁能想到，成为好朋友...'
      ],
      papyrusFinal4c1: [
         '<18>{#f/0}只需要先出几个\n抽象的谜题，\n再来打一架呢？',
         '<18>你教会了我很多，\n人类。',
         '<18>{#f/9}我特此\n允许你通过！',
         "<18>{#f/0}我会引导你\n离开这里。"
      ],
      papyrusFinal4c2: [
         '<18>继续前进。',
         '<18>等你到首塔的时候，\n跳进一艘飞船，穿过{@fill=#ff0}力场{@fill=#fff}。',
         "<18>{#f/4}那就是把我们\n困在前哨站的东西。",
         '<18>力场谁都进得来，\n但都出不去...',
         '<18>{#f/9}...除非，那个人拥有\n强大的灵魂。',
         '<18>{#f/0}就比如你！！！'
      ],
      papyrusFinal4d: [
         '<18>{#f/4}哦，我差点忘了说...',
         '<18>你要到达出口，\n就必须要通过...',
         '<18>{#f/7}{@fill=#ff0}国王{@fill=#fff}那关。',
         '<18>{@fill=#ff0}所有怪物的王...',
         '<18>{@fill=#ff0}他是...',
         '<18>{@fill=#ff0}{#f/6}...呃...'
      ],
      papyrusFinal4e: [
         "<18>{#f/0}他是个毛茸茸的\n好好先生！！！",
         '<18>大家都很喜欢他。',
         '<18>{#f/4}我很相信，\n只要你跟他说...',
         '<18>“不好意思，\nDREEMURR先生...\n我可以回家吗？”',
         "<18>{#f/0}他就会亲自带你\n去发射舱的！",
         "<18>{#f/9}总之！！！\n废话少说！！！",
         "<18>{#f/0}我会在家里\n做你酷酷的朋友。"
      ],
      papyrusFinal4f1: [ '<18>{#f/9}欢迎过来\n跟我一起玩！！！' ],
      papyrusFinal4f2: [ '<18>{#f/9}欢迎过来\n跟我约会！！！' ],
      papyrusFinal4f3: [ '<18>{#f/9}欢迎过来\n跟我打个招呼！！！' ],
      papyrusFinal4g: [ '<18>捏嘿嘿嘿\n嘿嘿嘿！！！' ],
      papyrusFinal5: [
         '<18>{#p/papyrus}{#f/5}哦，那个人类\n到哪里去了呢...',
         '<18>{#f/4}...\n等等。',
         "<18>{#f/1}就在我面前！！！",
         '<18>{#f/0}你好啊！\n我还在担心你\n是不是迷路了呢！',
         "<18>看到你了，我就\n可以松口气了...",
         '<18>{#f/7}...\n等一下！！！',
         "<18>你不应该逃走的！！！",
         '<18>快回来！！！'
      ],
      papyrusFinal6: [
         '<18>{#p/papyrus}{#f/4}又回来了，嗯？',
         "<18>{#f/5}我觉得应该是\n我的问题...",
         '<18>我之前答应过你，\n我会给你做意面。',
         "<18>不用猜，\n你想见我的原因...",
         '<18>肯定是想让我给你\n做点意面。',
         '<18>{#f/0}好... 我懂了。',
         '<18>{#f/0}PAPYRUS也很饥渴！',
         '<18>{#f/7}对正义的\n如饥似渴！'
      ],
      papyrusFinal7: () => [
         "<18>{#p/papyrus}{#f/1}你又回来了！？！？",
         '<18>{#f/4}我终于知道\n为什么了。',
         '<18>{#f/5}你...',
         '<18>你就是太想\n看到我的脸了...',
         '<18>{#f/6}我...',
         "<18>{#f/31}我不太确定自己\n能不能和抱有这种\n感受的人战斗。",
         "<18>{#f/4}更何况，我已经\n不太想抓你了。",
         '<18>{#f/5}要不然，\n我们就不战斗了...',
         '<18>{#f/5}...我直接放你走。\n怎么样？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      papyrusFinal7a: [ '<18>{#p/papyrus}{#f/31}...\n好...', "<18>{#f/3}我想，我会接受\n我的失败的。" ],
      papyrusFinal7b: [ '<18>{#p/papyrus}{#f/4}嗯，既然你都\n这样说了，那...', '<18>{#f/9}我就\n奉陪到底！！！' ],
      papyrusFinal8: () => [
         '<18>{#p/papyrus}{#f/1}还来？？？',
         '<18>{#f/4}...那，好吧...',
         '<18>{#f/9}你这次要\n放弃战斗吗？？',
         choicer.create('* （你要怎么回答？）', "放我走", "想战斗")
      ],
      papyrusFinal8a: [ '<18>{#p/papyrus}{#f/0}那么，\n咱们开始吧！' ],
      puzzle3: () => [
         '<32>{#p/human}* （你激活了终端。）',
         '<32>{#p/basic}* 屏幕上显示着一条历史修改记录。',
         world.edgy
            ? '<32>* “最新图案修改者：ALPHYS”'
            : '<32>* “最新图案修改者：\n   酷炫骷髅95”',
         ...(!world.goatbro || SAVE.flag.n.genocide_milestone < 5 || SAVE.flag.n.ga_asrielAlphysCom1++ > 0
            ? []
            : [ "<25>{#p/asriel2}{#f/13}* 她真是没完没了地为难我们..." ]),
         '<32>{#p/basic}* “要查看图案吗？”',
         choicer.create('* （查看图案吗？）', '是', '否')
      ],
      robotx: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （看起来，机器人睡着了。）' ]
            : [ "<32>{#p/basic}* 它进入了“休眠”模式。" ],
      robot1: pager.create(
         0,
         () => [
            '<32>{#p/basic}* 你好，心地善良的旅行者。\n* 我是一个建筑机器人。',
            '<32>* 我想去看看整个星系...\n* 但是我动弹不得。',
            '<32>* 如果你愿意帮助我的话...',
            '<32>* 就带上我的一块芯片吧，\n  带它去一个很远很远的地方。',
            choicer.create('* （拿走一块芯片？）', "拿走", "算了")
         ],
         () => [
            '<32>{#p/basic}* 心地善良的旅行者，\n  如果你愿意帮助我的话...',
            '<32>* 就带上我的一块芯片吧，\n  带它去一个很远很远的地方。',
            choicer.create('* （拿走一块芯片？）', "拿走", "算了")
         ]
      ),
      robot2: () => [
         '<32>{#p/basic}* 谢谢你... 祝你好运！',
         '<32>{#s/equip}{#p/human}* （你得到了“芯”型薯片。）',
         ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
            ? [
                 "<25>{#p/asriel2}{#f/9}* 嘿，真是个\n  可爱又天真的小东西。",
                 "<25>{#p/asriel2}{#f/13}* 天真到对自己的命运\n  一无所知。"
              ]
            : [])
      ],
      robot3: [ '<32>{#p/basic}* 看起来你还没有给我预留足够的空间。' ],
      robot4: () => [
         '<32>{#p/basic}* 好吧。\n* 那么，祝你旅途愉快。',
         ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
            ? [
                 "<25>{#p/asriel2}{#f/9}* 嘿，真是个\n  可爱又天真的小东西。",
                 "<25>{#p/asriel2}{#f/13}* 天真到对自己的命运\n  一无所知。"
              ]
            : [])
      ],
      robot5: () => [
         '<32>{#p/basic}* 谢谢你照顾我。',
         ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
            ? [ "<25>{#p/asriel2}{#f/4}* 行了，这些芯片应该够用了。" ]
            : [])
      ],
      robot6: () => [
         '<32>{#p/basic}* 近况如何？\n* 我是说，我那块芯片近况如何...',
         '<32>* 啊？你把它弄丢了...？\n* ...那我再给你一块吧...',
         choicer.create('* （再拿走一块芯片？）', "拿走", "算了")
      ],
      robot7: [
         '<32>{#p/basic}* 这次小心点。别弄丢了。',
         '<32>{#p/human}{#s/equip}* （你得到了“芯”型薯片。）'
      ],
      robot8: [ '<32>{#p/basic}* 我理解的。\n* 祝你旅途愉快...' ],
      robot9: () => [
         '<32>{#p/basic}* 谢谢你... 照顾我...',
         ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
            ? [ "<25>{#p/asriel2}{#f/4}* 行了，这些芯片应该够用了。" ]
            : [])
      ],
      robot10: [
         '<32>{#p/basic}* 芯片还好吗？',
         '<32>* 啊？又弄丢了...？',
         "<32>* 对不起...\n* 我要是再给你芯片的话，\n  就什么都不剩了。",
         '<32>* 看来我只能认命。\n* 想到去不了的地方，\n  终究只是幻想。',
         "<32>* 对所有怪物都一样。",
         '<32>* 怪物们注定要永远困在这里，\n  度过余生...'
      ],
      robot11: [ '<32>{#p/basic}* 我真傻，为啥之前那么轻易\n  就把心掏给你呢？' ],
      robot12: [ '<32>{#p/basic}* 滚！' ],
      sans1: [
         '<99>{#p/darksans}{#i/8}* {@spacing=4/0}{#i/x2}人类。',
         "<99>* {@spacing=4/0}难道你不知道{@spacing=}\n  {@spacing=4/0}怎么和新朋友{@spacing=}\n  {@spacing=4/0}打招呼吗？",
         '<99>* {@spacing=4/0}转过身来{@spacing=}\n  {@spacing=4/0}和我握手。'
      ],
      sans2: () => [
         ...(world.edgy
            ? [
                 "<25>{#p/sans}{#f/0}* 嘿，干嘛露出这种表情？",
                 "<25>{#p/sans}{#f/2}* ...不喜欢放屁垫的把戏吗？",
                 '<25>{#f/0}* ...没关系，人各有志嘛。'
              ]
            : [ "<25>{#p/sans}{#f/4}* 嘿嘿... 没有什么能比\n  一个放屁垫把戏更好的了。" ]),
         "<25>{#f/0}* 总之，你是个人类，对吧？",
         "<25>{#f/5}* 真酷。",
         "<25>{#f/0}* 我是sans。\n* 骷髅sans。",
         '<25>{#f/3}* 作为一名皇家哨兵，\n  现在我本该去抓捕人类的。',
         "<25>{#f/4}* 不过呢...",
         ...(world.edgy
            ? [
                 "<25>{#f/3}* 今天，我没心思干这事。",
                 '<25>{#f/0}* 但我有个兄弟...',
                 "<25>{#f/5}* 他对抓人类这事\n  可是热情满满。",
                 '<25>{#f/0}* 所以，为了能让他\n  安心在家待着...\n  我整整费了三辈子工夫。'
              ]
            : [
                 "<25>{#f/2}* 我有更好的事情要去忙。",
                 '<25>{#f/0}* 但我有个兄弟...',
                 '<25>{#f/5}* 虽然他还只是个预备哨兵，\n  但他的举止已经超像一个\n  正式哨兵了。',
                 "<25>{#f/0}* 前面站着的，\n  应该就是他了。"
              ]),
         '<25>* 我有个主意。\n* 跳过那个空隙。',
         '<26>{#f/4}* 别怕，直接跳过去就行。\n* 我兄弟把重力设得很小，\n  肯定掉不下去。'
      ],
      sans3: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}* 到了。',
                 "<25>{#f/3}* 不过... \n  现在我没啥想给你看的。",
                 "<25>{#f/2}* 我先在这待一会。",
                 "<25>{#f/0}* 等你再往前走走，\n  说不定我就有灵感了。"
              ]
            : [ '<25>{#p/sans}* 快，到重力转换器\n  那里去。' ],
      sans4: [ "<25>{#p/sans}* 咋的了，哥们？" ],
      sans5: [
         '<18>{#p/papyrus}{#x2}{#f/7}你说“咋的了”呢，\n兄弟！',
         '<18>你还有谜题要解决！',
         "<18>我明明给了你\n很多余地，但...",
         '<18>你还是整天无所事事！',
         "<18>即使是现在，你还是在！",
         '<18>无所事事！',
         "<25>{#p/sans}* 实际上，我在摆弄这个\n  重力的玩意呢。",
         "<25>* 这个东西真的很酷的。",
         '<25>{#f/4}* 你要来看看吗？',
         "<18>{#p/papyrus}{#x3}{#f/7}不！！\n我才没时间看呢！！",
         '<18>{#x2}要是有人类从这经过，\n我得做好准备！',
         '<18>我必须会！\n我一定会！',
         '<18>{#x1}{#f/9}最终抓到一个人类！',
         '<18>{#x4}{#f/0}那时候，我，\n伟大的PAPYRUS...',
         '<18>会得到我应得的一切！',
         '<18>尊重...\n认可...',
         '<18>{#f/9}我就终于可以加入\n皇家守卫了！',
         '<25>{#p/sans}* 嗯...',
         '<25>{#f/2}* 没准这个玩意可以\n  帮到你呢。',
         "<18>{#p/papyrus}{#x3}{#f/7}SANS，那根本没用！\n你这个懒骨头！",
         '<18>{#x1}{#f/5}你明明知道，\n你能做的远不止这些，\n但是...',
         '<18>{#x2}{#f/7}你还是选择\n整天无所事事！',
         "<18>{#x1}{#f/5}难道你不想... \n从生活中得到更多吗？",
         "<25>{#p/sans}* 嘿，放轻松点。\n* 我的心里可装着\n  一大堆事务呢。",
         "<25>{#f/4}* 你甚至可以说我...",
         '<25>{#f/2}* 早已{@fill=#ff0}星{@fill=#fff}怀远志了？'
      ],
      sans6: [
         '<18>{#p/papyrus}{#x3}{#f/7}SANS！！',
         "<25>{#p/sans}{#f/5}* 拜托。\n* 你明明就在笑。",
         '<18>{#p/papyrus}{#x2}{#f/7}我确实笑了！\n极其鄙视的那种！',
         '<18>{#x1}{#f/4}（叹气...）',
         '<18>{#f/5}为什么像我这样\n伟大的人...',
         '<18>为了得到认可\n需要做这么多破事？？',
         '<25>{#p/sans}* 嘿，别伤心嘛...',
         '<25>* 遇到困难，\n  负{@fill=#ff0}重力{@fill=#fff}争才能致远嘛。'
      ],
      sans7: [
         '<18>{#p/papyrus}{#x2}{#f/7}呃！！',
         '<18>{#x1}{#f/4}我去专心解我的谜题了...',
         '<18>{#f/7}至于你的工作？',
         '<18>{#f/4}我希望你\n从现在起...',
         '<18>{#f/9}专注于你的\n{@fill=#ff0}星{@fill=#fff}工作上！！！',
         '<18>{#f/0}捏嘿嘿嘿嘿嘿\n嘿嘿嘿嘿嘿嘿！！'
      ],
      sans8: [ '<18>{#p/papyrus}嘿！' ],
      sans9: [ '<25>{#p/sans}* 好了，是时候把你\n  弄下来了。' ],
      sans10: [
         '<25>{#p/sans}{#f/0}* 嘿，对了...\n* 走之前，我得跟你说...',
         "<25>{#f/3}* 皇家守卫正在找你呢。",
         "<25>{#f/0}* 不过你别担心。\n* 他们拿得出手的只有狗狗。",
         "<25>{#f/0}* 你既然是人类，\n  那肯定知道狗狗\n  喜欢什么，对吧？",
         "<25>{#f/2}* 它们和papyrus差不多，\n  人畜无害。"
      ],
      sansbook0: [ '<32>{#p/human}* (It appears this joke book has no clear ending.)' ],
      sansbook1: [ '<32>{#p/basic}* 这是本关于非欧几何的书。\n* 写着“ALPHYS”的名字。' ],
      sansbook2: () => [ choicer.create('* （要看看里面吗？）', "看看", "算了") ],
      sansbook3: [ '<32>{#p/human}* （你往书里面看...）' ],
      sansbook4: [ '<32>{#p/basic}* 几何学书里面夹着一本\n  笑话书。' ],
      sansbook5: [ '<32>{#p/basic}* 笑话书里面夹着\n  另一本几何学书。' ],
      sansbook6: [ '<32>{#p/basic}* 几何学书里面夹着\n  另一本笑话书。' ],
      sansbook7: [ "<32>{#p/basic}* 是另一本几何学书。" ],
      sansbook8: [ "<32>{#p/basic}* 是另一本笑话书。" ],
      sansbook9: [ '<32>{#p/human}* （你决定不再看了。）' ],
      sansbook10: () => [
         "<32>{#p/basic}* 这是Sans留的字条。",
         '<32>{#p/without}* “这么认真干什么？”\n* “这就只是个烂笑话。”',
         '<33>{#p/without}* “呵...”',
         '<33>{#p/without}* “别看得太入迷了。”',
         ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ...这是我经历过的\n  最烂的笑话。' ])
      ],
      sansinter: {
         s_sans: pager.create(
            0,
            () =>
               world.edgy
                  ? [ "<25>{#p/sans}* 咋了？" ]
                  : [
                       "<25>{#p/sans}* 你知道的，\n  papyrus很快就会回来。",
                       "<25>{#f/4}* 我要是你，\n  我就先走了...",
                       "<25>{#f/2}* 否则，你就得继续听\n  我讲的搞笑笑话了。"
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/3}* 真是太遗憾了...',
                       '<25>{#p/sans}{#f/2}* 这会儿，我兄弟正忙着做\n  我布置的数独习题集呢。',
                       "<25>{#p/sans}* 要是他在这，\n  就有一篓子事情等着咱们了。"
                    ]
                  : [
                       "<25>{#p/sans}* 你瞧，\n  没什么好害怕的。",
                       "<25>{#f/2}* papyrus看起来吓人，\n  但他会是你见过的\n  最好的家伙的。"
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}* 咋的？\n* 想让我把他带过来？',
                       "<25>{#f/3}* 呵，小子。\n* 你是不是没明白\n  我刚说的是啥意思？",
                       "<25>{#p/sans}{#f/2}* 听我句劝：\n  最好别得寸进尺，\n  对你我都好。"
                    ]
                  : [ '<25>{#p/sans}* 信我的。' ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/3}* ...',
                       "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 别给脸不要脸。",
                       '{*}{#s.resume}{%}'
                    ]
                  : [ '<25>{#p/sans}* 信我的。' ],
            () => (world.edgy ? [] : [ '<25>{#p/sans}* 信我的。' ])
         ),
         s_papyrus: pager.create(
            0,
            [
               "<25>{#p/sans}* 嘿，有件重要的东西\n  你得记住。",
               '<25>* 我兄弟有一种很\n  {@fill=#00a2e8}特殊的攻击{@fill=#fff}。',
               "<25>* 如果看到了{@fill=#ff993d}橙色攻击{@fill=#fff}，\n  你如果不动，就会受伤。",
               "<25>{#f/3}* 有种简单的方式\n  可以帮助你记住。",
               "<25>{#f/0}* 想象一下烧红的煤炭。\n* 你肯定不会站在\n  那种东西上吧？",
               '<25>* 煤炭质地比较坚硬。\n* 所以不妨换成骨质煤炭来想。',
               '<25>{#f/2}* 非常简单，对吧？\n* 记得战斗的时候想想\n  发热的骨质煤炭吧。'
            ],
            [
               "<25>{#p/sans}{#f/0}* 当然，你如果缓慢移动\n  是不会受伤的。",
               '<25>{#f/0}* 只要保持移动就可以。',
               "<25>{#f/2}* 肯定会有人\n  比我解释得更好的。"
            ],
            [ '<25>{#p/sans}{#f/2}* 记住...\n* 发热的骨质煤炭。' ]
         ),
         s_dogs: pager.create(
            0,
            [
               "<25>{#p/sans}* 鉴于你是人类，\n  你应该从来没有听说过\n  T.M.D.这个东西吧。",
               '<25>{#f/2}* 那是“突变·脉冲·对流层”\n  技术的缩写。'
            ],
            [
               '<25>{#p/sans}* 如果T.M.D.出现问题，\n  我们周围的空气\n  就会消失不见。',
               "<25>{#f/3}* 不过别担心。\n* 我刚才说的那些，\n  从来就不曾{@fill=#ff0}粗{@fill=#fff}现过。"
            ],
            [ '<25>{#p/sans}{#f/2}* 突变脉冲对流层技术。' ]
         ),
         s_jenga: pager.create(
            0,
            [
               '<25>{#p/sans}* 实际上，\n  早些时候的那份意面...',
               "<25>{#f/3}* 对我兄弟来说\n  还算好的。",
               "<25>{#f/0}* 自从他开始上烹饪课，\n  他已经进步很多了。",
               "<25>{#f/4}* 我敢说如果他坚持下去，\n  他甚至会惊艳到国王。"
            ],
            () =>
               world.edgy || world.killed5
                  ? [ '<25>{#p/sans}{#f/2}* ... sure would be a good way for him to get away from you.' ]
                  : [ "<25>{#p/sans}{#f/2}* ...那个对意面\n  异常痴迷的男人。" ]
         ),
         s_bridge: pager.create(
            0,
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/0}* 希望你喜欢\n  我最后布置的谜题。',
                       '<25>{#f/3}* 时间比较紧，但papyrus\n  坚持让我设计好谜题，\n  我还是照做了。'
                    ]
                  : world.killed5
                  ? [
                       "<25>{#p/sans}{#f/3}* 我听说，\n  这里的怪物都四散而逃了...",
                       "<25>{#f/0}* 奉劝你最好小心点，\n  别把小命丢了。"
                    ]
                  : [
                       "<25>{#p/sans}{#f/3}* 不知道我兄弟\n  现在又要去干啥。",
                       '<25>{#f/0}* 我觉得，你可以趁这会\n  复习一下{@fill=#ff993d}橙色攻击{@fill=#fff}。'
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/0}* 怎么？\n* 怪我不好好设计谜题？',
                       "<25>{#f/3}* 我还得一边应付你，\n  一边花时间准备谜题。\n* 能弄好就怪了。"
                    ]
                  : world.killed5
                  ? [
                       '<25>{#p/sans}{#f/0}* 我好歹有亲兄弟\n  愿意无条件关心我，支持我。',
                       "<25>{#f/2}* 而你..."
                    ]
                  : [ '<25>{#p/sans}{#f/2}* 哦，顺带再复习下{@fill=#00a2e8}蓝色攻击{@fill=#fff}。' ],
            () =>
               world.edgy
                  ? [ '<25>{#p/sans}{#f/3}* 就是这样。' ]
                  : world.killed5
                  ? [ '<25>{#p/sans}{#f/0}* 我说错了？' ]
                  : [ '<26>{#p/sans}{#f/0}* 还有其他攻击。' ]
         )
      },
      sansbredgey: () =>
         world.edgy
            ? 6 <= world.population
               ? [
                    '<25>{#p/sans}* 对了...',
                    "<25>* 我知道，之前待你有些不周...",
                    '<25>{#f/3}* 很高兴你愿意\n  做个更善良的人。',
                    '<25>{#f/2}* 坚持下去，好吗？'
                 ]
               : world.bullied
               ? [
                    '<25>{#p/sans}* 对了...',
                    "<25>* 我知道，你还在继续\n  伤害怪物，威胁他们的生命...",
                    '<25>{#f/3}* 但至少，你没有\n  放任自流，屠杀殆尽。',
                    "<25>{#f/2}* 挺好的，是吧？"
                 ]
               : [
                    '<25>{#p/sans}* 对了...',
                    '<25>* 你要是不小心\n  遇到了我的兄弟...',
                    '<25>{#f/3}* ...',
                    "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 敢动他一下试试。",
                    '{*}{#s.resume}{%}'
                 ]
            : 6 <= world.population
            ? [
                 '<25>{#p/sans}* 对了...',
                 "<25>* 我知道我兄弟\n  有时候蠢蠢的...",
                 "<25>{#f/3}* 谢谢你愿意配合\n  他那些疯狂的计划。",
                 "<25>{#f/2}* 你真的很棒。"
              ]
            : world.bullied
            ? [
                 '<25>{#p/sans}* 对了...',
                 "<25>* 我知道，你在伤害怪物，\n  威胁他们的生命...",
                 '<25>{#f/3}* 但至少，你没有\n  放任自流，屠杀殆尽。',
                 "<25>{#f/2}* 挺好的，是吧？"
              ]
            : [
                 '<25>{#p/sans}* 对了...',
                 '<25>* 你要是不小心\n  遇到了我的兄弟...',
                 '<25>{#f/3}* ...',
                 "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 敢动他一下试试。",
                 '{*}{#s.resume}{%}'
              ],
      sentryPapyrus1: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The narration on this sentry station predicts the future fame of its creator.)' ]
               : [
                    "<32>{#p/basic}* 纸壳箱上写着几句话。",
                    ...(world.genocide || world.runaway
                       ? [
                            '<23>{#p/papyrus}{#f/30}“求你不要毁掉我的哨站。”',
                            '<23>“我费了好大功夫才搭好它，\n要是它垮了，我会很伤心的。”',
                            '<23>“...以上。”',
                            '<23>（“注：我还想再写点，\n但是没地方了。”）'
                         ]
                       : [
                            '<23>{#p/papyrus}{#f/30}“你仔细打量眼前这个\n精心制作的哨站，心想...”',
                            '<23>“是哪位能工巧匠，\n才能做出这样的哨站呢？”',
                            '<23>“我敢说，肯定是出自那个\n超-有名的皇家守卫之手！”',
                            SAVE.data.n.plot === 72
                               ? '<32>{#p/basic}* The last line was crossed out.'
                               : '<23>（“注：现在还暂时没当上\n  超有名的皇家守卫。”）',
                            ...(SAVE.data.n.plot < 19 && !(world.edgy || world.killed5 || world.population < 6)
                               ? [
                                    "<25>{#p/sans}{#f/0}* 在欣赏我兄弟的手工成果，\n  是吗？",
                                    "<25>{#p/sans}{#f/2}* 我知道的。\n* 真的很酷。"
                                 ]
                               : [])
                         ])
                 ],
         () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The narration on this sentry station predicts the future fame of its creator.)' ]
               : [
                    "<32>{#p/basic}* 纸壳箱上写着几句话。",
                    ...(world.genocide || world.runaway
                       ? [
                            '<23>{#p/papyrus}{#f/30}“求你不要毁掉我的哨站。”',
                            '<23>“我费了好大功夫才搭好它，\n要是它垮了，我会很伤心的。”',
                            '<23>“...以上。”',
                            '<23>（“注：我还想再写点，\n但是没地方了。”）'
                         ]
                       : [
                            '<23>{#p/papyrus}{#f/30}“你仔细打量眼前这个\n精心制作的哨站，心想...”',
                            '<23>“是哪位能工巧匠，\n才能做出这样的哨站呢？”',
                            '<23>“我敢说，肯定是出自那个\n超-有名的皇家守卫之手！”',
                            SAVE.data.n.plot === 72
                               ? '<32>{#p/basic}* The last line was crossed out.\n* That checks out.'
                               : '<23>（“注：现在还暂时没当上\n  超有名的皇家守卫。”）'
                         ])
                 ]
      ),
      sentryPapyrus2: pager.create(0, () => [
         '<32>{#p/human}* （你往桌板下面看了一眼...）',
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
            : [ '<32>* 里面堆满了一箱又一箱未使用过的\n  电缆和过时玩意。' ])
      ]),
      sentrySans1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (This sentry station strikes you as rather unimportant.)' ]
            : world.darker
            ? [ "<32>{#p/basic}* 这是个哨站。" ]
            : SAVE.data.n.plot < 31
            ? [
                 "<32>{#p/basic}* Sans的哨站...",
                 "<32>* 这绝对是皇家守卫\n  最值得的投资。"
              ]
            : SAVE.data.n.plot === 72
            ? [ "<32>{#p/basic}* Sans的哨站...", "<32>* The quality of this investment hasn't changed a bit." ]
            : [ "<32>{#p/basic}* Sans的哨站...", '<33>* A poor investment in hindsight.' ],
      sentrySans2: pager.create(
         0,
         () => [
            '<32>{#p/human}* （你往桌板下面看了一眼...）',
            ...(SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/15}* As a star, there were some dark corners even I never dared search.',
                       "<25>{#f/20}* It's probably for the best if we leave this be."
                    ],
                    [ '<25>{#p/asriel1}{#f/20}* Please.\n* Anywhere but here.' ]
                 ][Math.min(asrielinter.sentrySans2++, 1)]
               : world.edgy
               ? [ "<32>{#p/basic}* 除了一支红蜡笔外，什么都没有。" ]
               : [ '<32>{#p/basic}* 这里储存了几瓶蜂蜜，\n  阿尔弗雷多面酱，\n  以及雅莫万能酱。' ])
         ],
         () => [
            '<32>{#p/human}* （你往桌板下面看了一眼...）',
            SAVE.data.b.svr
               ? '<25>{#p/asriel1}{#f/20}* Please.\n* Anywhere but here.'
               : world.edgy
               ? "<32>{#p/basic}* 那是令人不安的警示。"
               : "<32>{#p/basic}* 里面存放着无穷无尽的食物佐料。"
         ]
      ),
      whew1: () =>
         [
            [ '<32>{#p/basic}* 狗窝上覆盖着\n  烦人的白毛。' ],
            [ '<32>{#p/basic}* 和Papyrus打了两架后，\n  你有点累了，但还不至于倒头就睡。' ],
            [
               '<32>{#p/basic}* 连着战斗三次后，你精疲力尽了。',
               choicer.create('* （你该怎么办？）', '不睡', '睡觉')
            ],
            [
               '<32>{#p/basic}* 接连的战斗使你精疲力尽了。',
               choicer.create('* （你该怎么办？）', '不睡', '睡觉')
            ]
         ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 3)],
      whew2: [ '<32>{#p/human}* （你没动狗窝。）' ],
      whew3: [ '<32>{#p/human}* （你睡在了狗窝里...）' ],
      whew4: [
         "<32>{#p/alphys}* 那人真在这里？",
         '<32>{#p/sans}{#f/7}* 嗯。\n* 我兄弟说的，千真万确。',
         '<32>{#p/alphys}* 好-好吧...\n* 那我看看...',
         '<32>{#p/human}* （门开的声音。）',
         '<32>{#p/alphys}* ...',
         '<32>{#p/alphys}* 哦，还真在这里。',
         "<32>{#p/sans}{#f/7}* 嘿，咱们动作得快。",
         "<32>{#p/sans}{#f/7}* 说不定哪一会\n  Undyne就发现了。",
         '<32>{#p/alphys}* 我-我已经尽快了！'
      ],
      whew5: [
         '<32>{#p/human}* （你感觉有人正努力\n  把你扛起来。）',
         '<32>{#p/alphys}* 天哪，为-为什么人类\n  都这么重啊？！'
      ],
      whew6: [
         '<32>{#p/basic}* 嗯？\n* 我们这是到...',
         "<32>* ...Asgore家了。",
         "<32>* 来吧，\n  我们一起去找他..."
      ],
      trivia: {
         s_bbox: [ "<32>{#p/basic}* A bastion box.\n* There's a human inside..." ],
         
         ogkxsaucer: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You reach your hand deep into the dispenser.)\n* (It's a tad saucy.)" ]
               : [ "<32>{#p/basic}* 某种型号的喷酱机。" ],
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
               [ "<32>{#p/basic}* 一盏“弹”灯。" ],
               [ '<32>{#p/basic}* 一盏很弹很弹的灯。' ],
               [ '<32>{#p/basic}* 如此弹。\n* 如此灯。' ],
               [ '<32>{#p/basic}* 灯，弹，灯，弹...' ],
               [ '<32>{#p/basic}* 弹灯上下运动着。' ],
               [ '<32>{#p/basic}* ...弹动永不停歇。' ],
               [ "<32>{#p/basic}* It's a little thing called perpetual motion." ]
            ].map(
               lines => () =>
                  SAVE.data.b.svr
                     ? [ '<32>{#p/human}* （你注视着奇怪的灯上下弹跳。）' ]
                     : world.darker
                     ? [ '<32>{#p/basic}* 只是盏灯。' ]
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
               ? [ "<32>{#p/basic}* 装置没激活。" ]
               : postSIGMA()
               ? [ "<32>{#p/basic}* 不能使用了。" ]
               : [ '<32>{#p/basic}* 真是个不幸的结果。' ],
         s_secret_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign mentions an escape.)' ]
               : SAVE.data.n.state_starton_trashprogress < 2 && SAVE.data.n.plot < 72
               ? [
                    '<32>{#p/basic}* “正在小憩。”',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielDog++ < 1 ? [ '<25>{#p/asriel2}{#f/15}* What.' ] : [])
                 ]
               : [ '<32>{#p/basic}* \"It\'s escaped.\"' ],
         grillflower: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears this plant is very neon indeed.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* 一株植物。" ]
               : [
                    "<32>{#p/basic}* 这不仅仅是一株植物...\n* 这是一株霓虹植物。",
                    '<32>* 这有什么区别吗？\n* 没有，完全没有。'
                 ],
         librarbywindow1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But there was nothing of real interest to see here.)' ]
               : [ "<32>{#p/basic}* 窗户里面有一株植物。\n* 真有趣。" ],
         librarbywindow2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* （你够到了窗户边缘，\n  并将双手搭在了窗户上。）' ]
               : [ "<32>{#p/human}* （你够到了窗户边缘，\n  并将双手搭在了窗户上。）\n* （但你看不见里面的任何东西。）" ],
         papwindow: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You peer into the window, but you couldn't see anybody inside.)" ]
               : SAVE.data.n.plot_date > 0 && SAVE.data.n.plot_date < 1 && SAVE.data.n.plot < 71.2
               ? [ '<32>{#p/basic}* ... seems Papyrus is waiting patiently for you.' ]
               : [ "<32>{#p/basic}* ...看来没人在家。" ],
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
               ? [ '<32>{#p/basic}* ...但是谁也没有来。' ]
               : world.runaway || world.population === 0
               ? [ '<32>{#p/basic}* ...但是大家都逃走了。' ]
               : SAVE.data.n.plot < 72
               ? [ "<32>{#p/basic}* 它正在跟自己玩一种\n  扑克牌游戏。", '<32>* 感觉它要输了...' ]
               : [
                    "<32>{#p/basic}* 它正在跟自己玩一种\n  扑克牌游戏。",
                    '<32>* It appears to be winning...\n* Somehow.'
                 ],
         s_backrooms_lesstable: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You wonder if the Dog chow is edible for humans.)' ]
               : [ "<32>{#p/basic}* 桌上放了一副4D扑克牌，\n  还有免费狗粮。" ],
         s_beddinng_table: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You glance at the table.)\n* (You then glance away.)' ]
               : [ '<32>{#p/basic}* 必备之桌。\n* 虽无所用，却恰得其所。' ],
         s_bh_bone: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You admire the artisanship in this minimalistic painting.)' ]
                  : [
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}一幅经典的绘画。',
                               "<18>它总能让我想起\n我人生中最重要的东西。"
                            ]
                          : []),
                       "<32>{#p/basic}* 这是一幅极简主义的\n  卡通骨头画。"
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You admire the artisanship in this minimalistic painting.)' ]
                  : [ "<32>{#p/basic}* 这是一幅极简主义的\n  卡通骨头画。" ]
         ),
         s_bh_cottonball: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The content of the notes attached to this pile of socks does not surprise you at all.)'
                 ]
               : [
                    "<32>{#p/basic}* 这是个脏脏的棉球，\n  上面附着好几张便条。",
                    '<23>{#p/papyrusnt}“SANS！”\n“把你的棉球捡起来！”',
                    '<32>{#p/without}* “好的。”',
                    '<23>{#p/papyrusnt}“别把它放回去！”\n“把它挪走！”',
                    '<32>{#p/without}* “好的。”',
                    '<23>{#p/papyrusnt}“你就挪了两微米！”\n“把它拿回你的房间！”',
                    '<32>{#p/without}* “好的。”',
                    '<23>{#p/papyrusnt}“不要再把它拿回来了！”',
                    '<32>{#p/without}* “好的。”',
                    '<23>{#p/papyrusnt}“它还在这！”',
                    '<32>{#p/without}* “你刚才不是说，\n    不要把它拿回我的房间吗？”',
                    '<23>{#p/papyrusnt}“算了！”'
                 ],
         s_paptrash: pager.create(
            0,
            ...[
               () => [
                  ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                     ? [
                          "<18>{#p/papyrus}{#f/9}我都不知道你还\n喜欢捡垃圾！",
                          '<18>{#f/0}ALPHYS博士会\n对你很感兴趣的。'
                       ]
                     : []),
                  world.darker ? "<32>{#p/basic}* 一个垃圾桶。" : '<32>{#p/basic}* 这是个“闪亮”垃圾桶。'
               ],
               pager.create(
                  1,
                  ...[
                     [
                        '<32>{#p/basic}* 之所以说这个垃圾桶“闪亮”，\n  是因为它的一边就写着\n  “闪亮”两个字。'
                     ],
                     [ '<32>{#p/basic}* 一个“闪亮”星仔\n  对一个“闪亮”垃圾桶。\n* 你还能有什么想知道的。' ],
                     [ '<32>{#p/basic}* 小镇这一带中\n  最“闪亮”的垃圾桶。' ],
                     [ '<32>{#p/basic}* 这么说来，\n  也可以是别的某一带。' ],
                     [ '<32>{#p/basic}* 它到底有多“闪亮”？' ],
                     [ '<32>{#p/basic}* 非常？\n* 非常非常？\n* 比别的任何东西都“闪亮”？' ],
                     [ "<32>{#p/basic}* 我们还有选择的余地，\n  宝贝！" ],
                     [
                        '<33>{#p/basic}* 但不管时间如何流逝...\n  这个垃圾桶给你的印象\n  仍然“闪亮”。'
                     ],
                     [
                        '<32>{#p/basic}* 实际上，我越想越觉得，\n  “闪亮”这个形容\n  太浮皮潦草了。'
                     ],
                     [ '<32>{#p/basic}* 就比如，也许\n  用“参天”这个词来形容\n  就更适合一点。' ],
                     [ "<33>{#p/basic}* 实际上，还是算了吧。\n* 这个词还是给皇家实验室的\n  高层留着吧。" ],
                     [ '<32>{#p/basic}* 嗯...\n* 万一这个垃圾桶是黑洞伪装的呢！' ],
                     [ '<32>{#p/basic}* 一个黑洞垃圾桶...\n* 你会愿意冒这个险吗？' ],
                     [ "<32>{#p/basic}* 这问题问得有点怪了。" ],
                     [
                        '<32>{#p/basic}* 我觉得你现在就可以说，\n  都是因为这个垃圾桶，\n  我思绪完全“升空”了。'
                     ],
                     [ "<32>{#p/basic}* 你甚至可以说，\n  我感觉要... 羽化登仙了。" ],
                     [ '<32>{#p/basic}* ...\n* 你当我最后一句没说。' ],
                     [ '<32>{#p/basic}* 实际上，你还是\n  把我说的最后九句全忘了吧。\n  算上这句。' ],
                     [ "<32>{#p/basic}* 说白了...\n* 这个垃圾桶只能用\n  一个形容词来形容。" ],
                     [ "<32>{#p/basic}* 你问是什么词？\n* 那，我就告诉你...\n  如果你真的想知道的话。" ],
                     [ "<32>{#p/basic}* 它不是一个参天的垃圾桶，\n  绝对不是。" ],
                     [ "<32>{#p/basic}* 从任何角度来看，\n  这也不像是黑洞样式的..." ],
                     [ "<32>{#p/basic}* 你还记得吗？\n* 你还记得我们是从哪里\n  开始的吗？" ],
                     [ '<32>{#p/basic}* 那是我对这个垃圾桶\n  说过的第一句话。' ],
                     [ '<32>{#p/basic}* ...\n* 我说过...\n* 你等一下...' ],
                     [ '<32>{#p/basic}* 这是个“闪亮”垃圾桶。' ]
                  ].map(lines => () => world.darker ? [ "<32>{#p/basic}* 一个垃圾桶。" ] : lines)
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
                               '<18>{#p/papyrus}{#f/9}啊哈！\n对我的食物博物馆\n感兴趣了吗？',
                               '<18>{#f/0}请随意参观我的\n烹饪艺术展。'
                            ]
                          : []),
                       '<32>{#p/basic}* 冰箱的一半都堆满了\n  标有“意大利面”的容器。',
                       '<32>* 另一半则只放了一瓶橙汁汽水。'
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
                          ? [ "<18>{#p/papyrus}不错的冰箱，\n是吧？" ]
                          : []),
                       '<32>{#p/basic}* 瓶子上写着\n  “ALPHYS”的名字。'
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
                               '<18>{#p/papyrus}啊，没错，\n这是餐桌。',
                               '<18>{#f/5}我们之前养过\n一块月岩...',
                               '<18>{#f/7}但后来有一天，\n它彻底消失了！',
                               '<18>{#f/4}最开始，我觉得是\n那只爱管闲事的\n狗干的。',
                               '<18>{#f/7}但后来我发现，\n是SANS用它来测试\n他的...',
                               '<18>{#f/6}他的... 很有用的\n小玩意。\n哇...',
                               "<18>{#f/0}所以呢，\n给他就给他了吧。",
                               '<18>{#f/0}他真的在努力去\n做一件事。',
                               '<18>{#f/4}即使要我们付出\n那块宝贵的月岩的\n代价。',
                               "<18>{#f/0}是啊！！\n努力总比\n不努力强！！"
                            ]
                          : []),
                       "<32>{#p/basic}* 上面覆盖着\n  可食用的星尘。"
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You doubt the stardust is actually edible.)' ]
                  : [ "<32>{#p/basic}* 上面覆盖着\n  可食用的星尘。" ]
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
                       "<32>{#p/basic}* 烤箱里有一个\n  空的锡纸盘。",
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}我兄弟经常\n去外面吃。',
                               "<18>{#f/4}但最近，他开始\n尝试去“烘焙”\n一些东西了...",
                               '<18>{#f/5}我猜那个是...\n芝士蛋糕？',
                               "<18>{#f/6}我不太能确定。"
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
                  : [ "<32>{#p/basic}* 烤箱里有一个\n  空的锡纸盘。" ]
         ),
         s_chew: [ "<32>{#p/basic}* 这是一个吱吱作响的咀嚼玩具，\n  标签上写着“特殊攻击”。" ],
         s_crossroads_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign espouses the many benefits of boxes.)' ]
               : [
                    '<32>{#p/basic}* “这是一个箱子。”',
                    '<32>* “你可以把物品放进去\n   或者拿出来。”',
                    '<32>* “同样的箱子之后还会出现，\n   不必担心要回来取东西。”',
                    '<32>* “谨上，一个箱子爱好者。”'
                 ],
         s_doghouse: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The interior wall of this doghouse appears to be covered in strange round circles.)'
                 ]
               : SAVE.data.n.state_starton_greatdog === 2
               ? [ '<32>{#p/basic}* 这个狗窝内部一定有很大空间。' ]
               : world.genocide || world.edgy || world.darker
               ? [ '<32>{#p/basic}* A tiny doghouse.' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* I wonder if this doghouse also travels in time.' ]
               : [ '<32>{#p/basic}* 多么小巧的狗屋啊！', '<32>{#p/basic}* 里头看起来比外边大。' ],
         s_doghouse_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You struggle to explain what's written on this sign.)" ]
               : [ '<32>{#p/basic}* \"Woof.\"' ],
         s_dogs_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign rates the danger level of certain smells.)' ]
               : [
                    '<32>{#p/basic}* “气味危险分级”',
                    '<32>* “硅胶的气味 - 机器人”\n* “白色等级。”\n* “也可以变成{@fill=#2f2f2f}黑色{@fill=#fff}等级。”',
                    '<32>* “不可疑的气味 - 小狗”\n* “{@fill=#003cff}蓝色{@fill=#fff}等级。”\n* “在地里打滚的气味。”',
                    world.runaway
                       ? '<32>* “古怪的气味 - 人类”\n* “{@fill=#00c000}绿色{@fill=#fff}等级。”\n* “一旦看到，立马逃跑！”'
                       : SAVE.data.n.plot === 72
                       ? '<32>* “古怪的气味 - 人类”\n* “{@fill=#00c000}绿色{@fill=#fff}等级。”\n* “不惧神明之力。”'
                       : SAVE.data.n.plot < 31
                       ? '<32>* “古怪的气味 - 人类”\n* “{@fill=#00c000}绿色{@fill=#fff}等级。”\n* “不惜一切代价消灭！”'
                       : '<32>* “古怪的气味 - 小狗？”\n* “{@fill=#00c000}绿色{@fill=#fff}等级。”\n* “深谙撸狗之道。”'
                 ],
         s_dogstandA: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It would appear this sign belongs to a male dog.)' ]
               : player.position.y > 50
               ? [ '<32>{#p/basic}* “他的。”' ]
               : [ '<32>{#p/basic}* Inside is a magazine for fancy blue-and-grey furcuts.' ],
         s_dogstandB: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It would appear this sign belongs to a female dog.)' ]
               : player.position.y > 50
               ? [ '<32>{#p/basic}* “她的。”' ]
               : [ '<32>{#p/basic}* Inside is a brochure for blunt heavy-duty weaponry.' ],
         s_dogstandC: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The signed letter inside looks to have been ignored.)' ]
               : world.genocide
               ? [
                    '<32>{#p/basic}* 地板上，是一封写着“果断撤离”的\n  皇家守卫签名信。',
                    '<32>{#p/basic}* 信上的“果”字几乎都被啃掉了...'
                 ]
               : [
                    '<32>{#p/basic}* 在里面的地板上\n  放着一封关于统一制服尺寸的\n  皇家守卫签名信，',
                    "<32>{#p/basic}* 上面全是爪印。"
                 ],
         s_grillbys_beegstool: () =>
            SAVE.data.b.svr
               ? [ '<25>{#p/asriel1}{#f/20}* I think that might be a little tall for you.' ]
               : world.darker
               ? [ '<32>{#p/basic}* 另一把高脚凳。' ]
               : [ '<32>{#p/basic}* 一把高脚凳...', '<32>* 高度刚好适合Sans。' ],
         s_grillbys_drinks: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't make out what's under the tray table...)" ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* 一张折叠式餐桌。", '<32>* The camera on the underside has been taken away.' ]
               : [ "<32>{#p/basic}* 一张折叠式餐桌。", "<32>* 下面藏了个摄像头。" ],
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
                    '<32>{#p/basic}* 柜子上摆满了\n  五花八门的派对酒水和恶心的液体。',
                    '<32>{#p/basic}* 唯一的一瓶水贴有\n  “当心明火”的标签。'
                 ],
         s_grillbys_sidestool: () =>
            SAVE.data.b.svr
               ? [ "<25>{#p/asriel1}{#f/20}* That one's definitely too tall for you." ]
               : world.darker
               ? [ '<32>{#p/basic}* 另一把高脚凳。' ]
               : [ '<32>{#p/basic}* 这把高脚凳上标着“PAPYRUS”。' ],
         s_grillbys_smolstool: () =>
            SAVE.data.b.svr
               ? [ '<25>{#p/asriel1}{#f/19}* This one seems like just your size.' ]
               : world.darker
               ? [ '<32>{#p/basic}* 另一把高脚凳。' ]
               : SAVE.data.b.oops
               ? [ '<32>{#p/basic}* 这把高脚凳没什么特别的。' ]
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
               : [ '<32>{#p/basic}* 一个曾经用来指挥\n  悬浮车着陆的废弃终端。' ],
         s_jenga_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign describes the broken state of the display tower's quantum randomizer.)" ]
               : [ '<32>{#p/basic}* “注意：这个显示台里的\n   量子随机数生成器仍然是坏的。”' ],
         s_library_window: () => [
            '<32>{#p/human}* （你将双手搭在了窗户上。）',
            ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* 有股油漆的味道。' ])
         ],
         s_librarby_blueBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“旧事重提”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “战前，怪物每天都要学习魔法。”',
                       '<32>* “然而，大多数同胞都在战争中牺牲，\n   其中就包括许多教师。”',
                       '<32>* “面对这一问题，剩余的怪物们\n   开始采用集体学习的方式。”',
                       '<32>* “当时采用这一方式，是为了让我们\n   能在前哨站更好地生存。”',
                       '<32>* “如今，人口不足的问题\n   几乎不复存在。”',
                       '<32>* “尽管如此，我们还是\n   坚持新的学习方式，因为...”',
                       '<32>* “...我们懒得再改回去了。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“旧事重提”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “以前，\n   怪物使用多种货币进行交易。”',
                       '<32>* “主要流通的是珠宝和‘克里’... \n   但它们只能在母星上使用。”',
                       '<32>* “与人类进行贸易时，\n   就只能选择金钱作为货币。”',
                       '<32>* “丰富的金矿资源\n   为我们带来了许多便利。”',
                       '<32>* “但也因此导致\n   其他货币迅速贬值。”',
                       '<32>* “如今，金钱成为了\n   我们唯一的货币！”\n* “这就是怪物的作风。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“旧事重提”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “Erogot死后，国王尽己所能\n   去保留故园的遗存。”',
                       '<32>* “尽管在保存途中，\n   他还是把那件最重要的东西\n   弄丢了...”',
                       '<32>* “但我们早已习惯逆来顺受，\n   没有因此责怪他。”',
                       '<32>* “过去两百年间充满坎坷，\n   但同时自由也离我们越来越近。”',
                       '<32>* “天使即将降临...”',
                       '<32>* “...我们猜想，或许他已经到来，\n   此刻正读着这本书。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ]
         ),
         s_librarby_desk: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You observe the dust gathering on this check-out book.)' ]
               : [ "<32>{#p/basic}* 图书倌的借阅记录。" ],
         s_librarby_greenBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“杂谈”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “‘域外网’，是国王与皇家科学员\n   共同打造的网络平台。”',
                       '<32>* “...不过，主要是皇家科学员的功劳。\n   国王仅仅写了个欢迎致辞。”',
                       '<32>* “言归正传，\n   域外网作为一个‘虚拟广场’，\n   将前哨站的居民联系在一起。”',
                       '<32>* “想要创建账户，你只需要...”',
                       '<32>* “呃... 好吧...”',
                       "<32>* “这教程看着清楚，\n   写的可是不清不楚。”",
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“杂谈”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “要是你想到前哨站各处逛逛的话，\n   呼叫旅人是你的不二之选。”',
                       '<32>* “不管你想去哪，他都可以载你一程。”',
                       '<32>* “...因为，你总可以\n   在最近的停靠站找到他。”',
                       '<32>* “而且，说真的，\n   他说话有点不知所云。”',
                       '<33>* “‘狗子的公道’到底是个啥？”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“杂谈”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “怪物们可以自由穿梭于\n   前哨站的各个区域。”',
                       '<32>* “只有首塔顶端的最终长廊\n   是禁区。”',
                       '<32>* “除了皇家科学员，\n   任何居民都不得通过那里。”',
                       '<32>* “...我们仍不清楚其中的原因。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ]
         ),
         s_librarby_ladder: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears the access hatch above this ladder was sealed shut.)' ]
               : [ "<32>{#p/basic}* 一把乱放的梯子。\n* 没什么好说的。" ],
         s_librarby_pinkBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“怪物生物学”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “理论上讲，\n   怪物的葬礼十分酷炫。”',
                       '<32>* “当怪物老了，\n   然后翘辫子了，\n   他们就会化为尘埃。”',
                       '<32>* “在葬礼上，我们拿来这些尘埃，\n   洒在他生前最喜欢的东西上。”',
                       '<32>* “这样一来，他的精神\n   就会留存在那件物品中...”',
                       '<32>* “唔，我凑够字数了吗？”\n* “我有点讨厌写这个。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“怪物生物学”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “怪物的躯体由魔法构成，\n   因此和灵魂密不可分。”',
                       '<32>* “如果一个怪物蓄意伤人，\n   还对此执迷不悟...”',
                       '<32>* “他就会变得异常强大。”',
                       '<32>* “不过大多数我族同胞并不崇尚暴力，\n   至少不是打心底里。”',
                       '<32>* “可是，如果我们再次遭受袭击，\n   能用于自卫的，只有一座前哨站...”',
                       '<32>* ...',
                       '<32>{#p/human}* （你不想再读下去了。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* 书架上标着“怪物生物学”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “怪物的身体主要由魔法构成，\n   而人类的身体主要由水构成。”',
                       '<32>* “就物质组成来说，\n   人类比我们强大得多。”',
                       '<32>* “但是，他们永远不能体会到\n   使用魔法表达自我的乐趣。”',
                       '<32>* “他们永远不会收到\n   一张弹幕生日贺卡...”',
                       '<32>* “也永远不能\n   使用隐身术和鹰眼术玩捉迷藏...”',
                       '<32>* “更无法拿电魔法\n   办一场炫酷灯光秀！”',
                       '<32>* “太可怜了。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ]
         ),
         s_librarby_purpleBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* 书架上标着“故园历史”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “故园日夜，皆为奇观。”',
                       '<32>* “晨曦初露，光塔划空，天启新篇。”',
                       '<32>* “至于白昼，光层共振，辉煌万丈。”',
                       '<32>* “能量尽释，夜幕悄然。”',
                       '<32>* “星辰降临，魔力凝聚。”',
                       '<32>* “日光之能，尽数落地，归于尘寰。”',
                       '<32>* “直至光塔重升，耀眼如初。”',
                       '<32>* “此乃昼夜，永恒循环，主宰光阴。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* 书架上标着“故园历史”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “你知道吗，怪物们如今的社会结构\n   并非一直存在。”',
                       '<32>* “很久很久以前，\n   确切来说，距今大约几千年时...”',
                       '<32>* “我们的祖先每天漫无目的，\n   肆意嬉戏。”',
                       '<32>* “不敢相信！\n   那时的怪物甚至连衣服都不穿！”',
                       '<32>* “不过，随着时间流逝，\n   我们有了新的追求，渴望进化。”',
                       '<32>* “在那场伟大的复兴运动中，\n   连魔法的本质都被摆上台面，\n   成为焦点。”',
                       '<32>* “这些进步奠定了我们的社会结构，\n   乃至如今的生活方式。”',
                       '<32>* “...我还是不敢相信\n   长达两千年的历史中，\n   我们都在裸着乱跑。”',
                       '<32>* “哪有风度？”\n* “哪有时尚？”\n* “太不可思议了。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* 书架上标着“故园历史”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “人怪首次会面时，\n   当政的怪物王是Erogot。”',
                       '<32>* “在他英明的领导下，\n   两族和平共处，相安无事。”',
                       '<32>* “但随着Erogot寿终正寝...\n   这一切都一去不复返了。”',
                       '<32>* “Erogot有能力维持两族长久和平，\n   而王子却难以承袭此功。”',
                       '<32>* “于是，一场大战将在所难免...\n   实在令人痛心。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ]
         ),
         s_librarby_yellowBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* 书架上标着“怪物科技”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “Gerson曾说，\n   前哨站以前只是个小太空站。”',
                       '<32>* “在受了整整二十年苦之后，\n   有人将目光转向了那道力场。\n   心想...”',
                       "<32>* “‘这股强大的能量，\n   能否为己所用呢？’”",
                       '<32>* “这主意简洁明了，\n   但又十分巧妙。”',
                       '<32>* “在这一想法的指引下，\n   核心最终建成，\n   我们因此有了稳定的能源。”',
                       '<32>* “时至今日，我们仍在使用它！”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* 书架上标着“怪物科技”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “啊，人工智能真是\n   世界一大奇迹...”',
                       '<32>* “...也可能恰恰相反。”',
                       '<32>* “自从建筑机器人K-541.12出了事之后，\n   我们就彻底放弃了研发\n   有自我意识的AI。”',
                       '<32>* “王后甚至下令，\n   禁止任何人开发新的AI程序。”',
                       '<32>* “现在，还有能力与资源去搞AI的，\n   只剩一个怪物了。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* 书架上标着“怪物科技”。',
                       '<32>{#p/human}* （你取下了一本书...）',
                       '<32>{#p/basic}* “如今，很多人都已经忘了\n   太空中几乎没有重力。”',
                       '<32>* “早在战前，怪物在科技方面\n   就有许多突破性成果。”',
                       '<32>* “其中之一，\n   就是先进的重力控制系统。”',
                       '<32>* “如今，前哨站的每一个角落，\n   不论大小，都安装了\n   使用这一技术的装置。”',
                       '<32>* “现在正在看书的你，\n   可能就站在其中一个装置上面。”',
                       '<32>{#p/human}* （你把书放回了书架。）'
                    ]
         ),
         s_math_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't help but be confused at the contents of this sign.)" ]
               : [ '<32>{#p/basic}* “警告：狗子的公道”' ],
         s_pacing_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* （看着牌子上的内容，\n  你不禁扬起嘴角。）" ]
               : [ '<32>{#p/basic}* “留意有狗”\n* “...请抚摸狗...”' ],
         s_phonecard: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The note requests that you call a certain phone number.)',
                    '<32>{#s/phone}{#p/event}* 拨号中...',
                    '<32>{#p/human}* (No connection.)'
                 ]
               : world.runaway
               ? [
                    "<32>{#p/basic}* 这是张便条。",
                    '<32>* “给我打电话！”\n* “这是我的电话号码！”',
                    '<32>{#s/phone}{#p/event}* 拨号中...',
                    '<32>{#p/basic}* 电话直接转接到了\n  语音信箱。',
                    '<32>{#p/basic}* \"Hello, lonely caller!\"\n* \"Would you like to escape the outpost with me?\"',
                    '<32>{#s/equip}{#p/event}* 滴...'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* 这是张便条。",
                    '<32>* “给我打电话！”\n* “这是我的电话号码！”',
                    '<32>{#s/phone}{#p/event}* 拨号中...',
                    '<32>{#p/human}* (No connection.)'
                 ]
               : [
                    "<32>{#p/basic}* 这是张便条。",
                    '<32>* “给我打电话！”\n* “这是我的电话号码！”',
                    '<32>{#s/phone}{#p/event}* 拨号中...',
                    '<32>{#p/basic}* 电话直接转接到了\n  语音信箱。',
                    '<32>{#p/basic}* “你好，孤独的来电者！”\n* “我很抱歉没能在这里迎接你~”',
                    '<32>{#s/equip}{#p/event}* 滴...',
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
         s_sr_treadmill: [ "<32>{#p/basic}* 这是一台跑步机。", "<32>{#p/basic}* 这是它的最高设定了。" ],
         s_sr_lamp: [
            "<32>{#p/basic}* 这是一盏台灯，\n  里面挂着一张大字条。",
            '<23>{#p/papyrusnt}“抱歉，我把你在这里用的\n手电筒拿回去了。”',
            '<23>{#p/papyrusnt}“不是说我介意你用\n我的东西...”',
            '<23>{#p/papyrusnt}“但你用这种不正常的\n方式用就完全没有\n道理了！”',
            '<23>{#p/papyrusnt}“我不知道你是怎么想的，\n但据我所知...”',
            '<23>{#p/papyrusnt}“手电筒算不上灯泡！！”'
         ],
         s_sc_book: [
            "<32>{#p/basic}* 这是皇家实验室的旧日志。",
            '<32>{#p/human}* （你翻到了打开的那页...）',
            '<32>{#p/basic}* “活动日志，克历615年7月”',
            '<32>* “我们已经从树林中\n   挑选到了理想的对象。”',
            '<32>* “试验物质的准备工作\n   将在未来几天结束。”',
            '<32>* “很快，实验对象就会\n   进行注射。”',
            '<32>* “这样一来，我们就比以往任何时候\n    都更接近自由...”'
         ],
         s_sc_drawer: [
            "<32>{#p/basic}* 抽屉里有一本相册。",
            '<32>{#p/basic}* 相册里有Sans和Alphys\n  在皇家实验室的照片。',
            '<32>{#p/basic}* 有的照片中在做实验，\n  有的在沉迷看科幻动画...',
            '<32>{#p/basic}* 他们看起来很开心。'
         ],
         s_sc_diagram: () => [
            "<32>{#p/basic}* 桌子上有一份\n  力场削弱武器的蓝图。",
            '<32>{#p/basic}* 墙上还有其他\n  各种各样的概念图...',
            '<33>{#p/basic}* 一台非线性时空访问机，\n  一台虫洞孔径稳定仪，\n  还有个被怪物灵魂绑定的人类灵魂。',
            ...(!SAVE.data.b.s_state_charasker
               ? ((SAVE.data.b.s_state_charasker = true),
                 [
                    '<32>{#p/basic}* ...这是可能的吗？\n* 一个人类灵魂和一个\n  怪物灵魂共生？',
                    "<32>{#p/basic}* 但是怪物灵魂主人的身份\n  将会丢失...",
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
                       '<32>{#p/basic}* 一张精心制作的超级跑车床。',
                       ...(roomready()
                          ? [
                               "<18>{#p/papyrus}那是我的床！",
                               '<18>{#f/4}如果我有机会\n去探索星星的话...',
                               "<18>{#f/0}我想沿着一条\n漫长的星际公路\n航行。",
                               '<18>感受发丝中的静电，\n和皮肤上映出的\n星光...',
                               "<18>{#f/4}当然，这都只是\n一场梦罢了。",
                               '<18>{#f/0}所以我就\n边打盹边航行了。'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You thank the bed for being very awesome in general.)' ]
                  : [ '<32>{#p/basic}* 一张精心制作的超级跑车床。' ]
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
                       '<32>{#p/basic}* 一箱子的骨头。',
                       ...(roomready()
                          ? [
                               '<18>{#p/papyrus}嘿，那些就是我\n用来攻击你的东西。',
                               '<18>真是段美好的回忆，\n是吧？',
                               '<18>感觉仿佛\n就在昨日...',
                               SAVE.data.n.plot < 42.1
                                  ? '<18>{#f/4}实际上就是刚刚才\n发生的事。'
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
                  : [ '<32>{#p/basic}* 一箱子的骨头。' ]
         ),
         s_pr_papcloset: pager.create(
            0,
            () => [
               '<32>{#p/human}* （你往衣橱里看...）',
               ...(SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (It's hard for you to see in such a dark place.)" ]
                  : !world.runaway
                  ? [ '<32>{#p/basic}* 里面的衣服被疯狂地\n  挪来挪去。' ]
                  : [
                       '<32>{#p/basic}* Clothes are hung up neatly inside.',
                       SAVE.data.n.plot === 72
                          ? '<32>* One of the clothes has \"Free Bones\" written on it.'
                          : '<32>* Many of the clothes have handwritten text drawn on them.'
                    ]),
               ...(roomready()
                  ? [
                       "<18>{#p/papyrus}别担心，\n衣橱里没有骷髅。",
                       "<18>{#f/4}当然，\n除非我在换衣服。"
                    ]
                  : [])
            ],
            () => [
               '<32>{#p/human}* （你往衣橱里看...）',
               ...(SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (It's hard for you to see in such a dark place.)" ]
                  : !world.runaway
                  ? [ '<32>{#p/basic}* 里面的衣服被疯狂地\n  挪来挪去。' ]
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
                          "<25>{#p/asriel1}{#f/17}* 啊。\n* 那是Papyrus的特殊攻击...",
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
                       "<32>{#p/basic}* 一面旗帜，\n  上面画着一个吓人的骷髅。",
                       ...(roomready()
                          ? [
                               "<18>{#p/papyrus}很漂亮的海报吧？",
                               '<18>UNDYNE在捡垃圾的\n时候发现的。',
                               '<18>{#f/4}一开始上面是\n一个头骨和\n两根交叉的骨头...',
                               '<18>{#f/9}但我想到了\n更好的东西！'
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
                  : [ "<32>{#p/basic}* 一面旗帜，\n  上面画着一个吓人的骷髅。" ]
         ),
         s_pr_paptable: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You marvel at the detail of these action figures...)' ]
                  : [
                       '<32>{#p/basic}* 一套穿着俗气制服的动作玩偶。',
                       ...(roomready()
                          ? [
                               '<18>{#p/papyrus}啊，那个，\n动作玩偶。',
                               '<18>用来参考理论战斗\n布置场景\n很合适。',
                               '<18>{#f/4}但我为什么\n会有这么多呢？',
                               '<18>{#f/6}那个，嗯...\n国王把它们当做\n礼物送给了我...',
                               '<18>{#f/5}我真心希望\n我也能回报他\n一份礼物。'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (Upon reflection, you realize who created these.)' ]
                  : [ '<32>{#p/basic}* 一套穿着俗气制服的动作玩偶。' ]
         ),
         s_puzzle1_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes the basics of solving the puzzle.)' ]
               : [ '<32>{#p/basic}* “按顺序激活每一条电路。”' ],
         s_puzzle2_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* （这个告示牌点出了解谜思路。）' ]
               : [ '<32>{#p/basic}* “从左边开始。”' ],
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
                    "<32>{#p/basic}* 一张Sans的字条...",
                    '<32>{#p/without}* “哎呀。”\n* “看来我兄弟最终还是找到你了。”',
                    '<32>* “我把你的所作所为全告诉了他，\n  现在，他愿意老实在家待着了。”',
                    '<32>* “真是太遗憾了，对不对？”',
                    '<32>* “papyrus不该卷到这堆破事中。”',
                    '<32>* “但也许，这就是命。”',
                    '<32>* “对了，解谜愉快哦。”',
                    '<32>* “我猜，你肯定\n   一眨眼工夫就能解开。”',
                    '<#32>- “恕我冒昧了，”\n  sans'
                 ]
               : [
                    "<32>{#p/basic}* 这是张Papyrus留的字条...",
                    '<23>{#p/papyrus}{#f/30}“人类！！这个谜题可跟\n看起来的不一样。”',
                    '<23>“我在等你的时候，\n试着改造了一下...”',
                    '<23>“当然，是为了让图案\n看起来更像我的脸！”',
                    '<23>“不过好像哪里出了岔子...”',
                    '<23>“所以我现在\n只能做成一个\n很烂的箭头形状了！！！”',
                    '<23>“（另外，这个谜题\n需要你自己完成。）”',
                    '<23>“但不用担心！”\n“你肯定做得到的，人类！”',
                    '<#23>  - “最相信你的，”\n  PAPYRUS'
                 ],
         s_redbook: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The uniquely-colored book describes a secret weapon lost to time.)' ]
               : [
                    "<32>{#p/basic}* 一个书架。",
                    '<32>{#p/human}* （你取下了那本红皮书...）',
                    '<32>{#p/basic}* “人怪大战进入到白热化阶段时，\n   皇家军队成立了一个秘密组织。”',
                    '<32>{#p/basic}* “也就是所谓的‘特种武器’研发部，\n   专门用来搞实验研究。”',
                    '<32>{#p/basic}* “他们造出了许多‘战斗利器’，\n   但实战效果都是微乎其微。”',
                    '<32>{#p/basic}* “只有一个例外，\n   它就是被称作‘顿悟’的魔法卷轴。”',
                    '<32>{#p/basic}* “这卷轴的力量超乎寻常，\n   即使用来对付人类也过于危险。”',
                    '<32>{#p/basic}* “结果，卷轴被从内部锁死，\n   并很快封存起来。”',
                    '<32>{#p/basic}* “传说，有人把它送上了\n   开往前哨站的运输船。”',
                    '<32>{#p/basic}* “如果传说属实，\n   那么它现在位于何处？”\n* “又该如何解开枷锁？”',
                    '<32>{#p/basic}* “但愿，以上疑问永埋尘土之下，\n   湮没无闻。”',
                    '<32>{#p/human}* （你把书放回了书架。）'
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
                    "<32>{#p/basic}* （邮箱里塞满了未开封的垃圾邮件。）",
                    ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ... he never reads the mail anyway.' ])
                 ],
         s_sheddoor: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ]
               : [ "<32>{#p/basic}* 门被反锁了。" ],
         s_slew: [ "<32>{#p/basic}* 这是狗粮。\n* 碎片看起来像是骨头。" ],
         s_spagnote: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The note declares the brilliance of enticing you with a place of spaghetti.)' ]
               : !world.genocide && world.edgy
               ? [
                    "<32>{#p/basic}* 一张Sans的字条...",
                    '<32>{#p/without}* “哎呀，”\n* “你发现了我兄弟的意大利面。”',
                    '<32>* “是不是看起来很香，很好吃？”',
                    '<32>* “嘿，”\n* “那就对了。”',
                    '<32>* “不过，不要因此掉以轻心哦...”',
                    '<32>* “因为，你花越多时间在\n   尝试拿走这玩意上...”',
                    '<32>* “我就有更多时间\n   准备下一个谜题了。”',
                    '<#23>- “开个玩笑而已，”\n  sans'
                 ]
               : [
                    "<32>{#p/basic}* 这是张Papyrus留的字条...",
                    '<23>{#p/papyrus}{#f/30}“人类啊！！”\n“享用这盘意面吧。”',
                    '<23>（“但其实你不知道的是，\n这盘意面是个陷阱...”）',
                    '<23>（“单纯是为了吸引你的！！！”）',
                    '<23>（“你会忙着去够它...”）',
                    '<23>（“然后就不会意识到\n自己毫无进展！！”）',
                    '<23>（“再次彻底被\n伟大的PAPYRUS戏弄！！！ ”）',
                    '<#23>  “捏嘿嘿，”\n  PAPYRUS'
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
               : [ "<32>{#p/basic}* 在这堆水晶荚里\n  藏着一个摄像头。" ],
         s_trapnote: () =>
            [
               [
                  "<32>{#p/basic}* 这是张Papyrus留的字条...",
                  '<23>{#p/papyrus}{#f/30}“抱歉，到UNDYNE来之前，\n我得把你锁在客房里。”',
                  '<23>“把这里当自己家\n一样吧！！！”',
                  '<22>“已提供茶点和住宿。”',
                  '<#23>  “非常捏嘿嘿的，”\n  PAPYRUS'
               ],
               [
                  "<32>{#p/basic}* 这是张Papyrus留的字条...",
                  '<23>{#p/papyrus}{#f/30}\"PLEASE ASK BEFORE YOU ESCAPE!!!\"',
                  '<23>\"WHEN YOU WENT MISSING I GOT WORRIED SICK!!!\"',
                  '<#23>  \"SLIGHTLY BONETROUSLED,\"\n  PAPYRUS'
               ],
               [
                  "<32>{#p/basic}* 这是张Papyrus留的字条...",
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
                  ? [ "<32>{#p/basic}* 这个树状物没什么特别的。" ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}* Soon enough, this civilization will need to migrate once again.',
                       '<32>* Where shall they go?\n* Sooner or later, we will know.'
                    ]
                  : [
                       '<32>{#p/basic}* 这个人畜无害的树状结构，\n  其实是一个文明的家园。',
                       '<32>* 在濒临灭绝之时，\n  它们迁徙到这里\n  来拯救自己的种族。'
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
                  : [ "<32>{#p/basic}* 专家建议...\n* 不要摇晃这人畜无害的树状结构。" ]
         ),
         doginfo: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The dog treats inside look to have been somewhat devoured.)' ]
               : SAVE.data.n.state_starton_doggo === 2 || SAVE.data.n.plot > 27
               ? SAVE.data.b.oops
                  ? [ '<32>{#p/basic}* 里面有一袋半空的狗粮。' ]
                  : [ "<32>{#p/basic}* Inside is a pack of dog treats. It's half-full." ]
               : [
                    SAVE.data.n.state_starton_doggo === 3
                       ? '<32>{#p/basic}* Inside is a rather sleepy guard dog.\n* It cannot see you.'
                       : '<32>{#p/basic}* 狗窝里是只很困惑的守卫狗。\n* 它看不见你。'
                 ]
      },
      truetext: {
         doggo1: [ '<32>{#p/basic}* Dog treats?\n* That dog needs a therapist.' ],
         doggo2: [ '<32>{#p/basic}* 抛接游戏，是吧？', "<33>{#p/basic}* Now we're getting places..." ],
         dogs1: [ '<32>{#p/basic}* The things we do for the good of the canines.' ],
         dogs2: [ '<33>{#p/basic}* The rusty wrench strikes again.' ],
         fetch: () =>
            [
               [ '<32>{#p/basic}* 抛接游戏，是吧？', "<33>{#p/basic}* Now we're getting places..." ],
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
         sans3: [ '<32>{#p/basic}* 你尽力了。' ],
         sans4: [ '<32>{#p/basic}* Have you done this before...?' ],
         sans5: [ '<32>{#p/basic}* Really, Sans?\n* That \"puzzle\" wasn\'t even worth looking at.' ],
         sans6: [ '<32>{#p/basic}* Really, Sans?\n* That \"puzzle\" was impossible.' ],
         sans7: [ '<32>{#p/basic}* Well, that was anti-climactic.' ],
         sans8: [ "<32>{#p/basic}* I'm just as confused as you." ],
         sans9: [ '<32>{#p/basic}* Oh, come on!\n* I wanted to see it in action!', '<32>* ... oh well...' ],
         papdate: () => [
            '<32>{#p/basic}* 所以... Papyrus，嗯？',
            SAVE.data.n.plot > 64.1
               ? '<32>* 过了这么久，\n  你们终于成了朋友。'
               : '<32>* 我就知道你们俩\n  最终会成为朋友。',
            '<32>* ...\n* 我是看着那个骷髅在这里\n  长大的...',
            '<32>* 他总是会给他周围的人\n  树立一个好榜样...',
            '<32>* ...包括我也一样。',
            "<32>* 真可惜，\n  我没法亲自告诉他这些。",
            "<32>* 但没关系的。",
            '<32>* 看到你们俩相处得这么好，\n  就足够弥补遗憾了。'
         ]
      },
      vegetoid: pager.create(
         0,
         () => [
            SAVE.data.n.plot === 72
               ? '<32>{#p/basic}* I heard the taxi driver will be here when everyone else is off the outpost.'
               : world.population === 0
               ? '<32>{#p/basic}* 我听说那个运输船司机\n  会在别的怪物全都逃走后\n  回到这里。'
               : "<32>{#p/basic}* 我听说那个运输船司机\n  不吃绿色蔬菜。",
            '<33>{#p/basic}* 它真的是个怪物吗...？'
         ],
         () => [
            SAVE.data.n.plot === 72
               ? "<32>{#p/basic}* A real monster wouldn't hesitate to escape this dreadful place."
               : world.population === 0
               ? '<32>{#p/basic}* ...'
               : '<32>{#p/basic}* 真正的怪物\n  都吃绿色蔬菜的。'
         ]
      ),
      vegetoidx: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to find anyone down there.)" ]
            : world.bulrun
            ? [ '<32>{#p/basic}* ...但是大家都逃走了。' ]
            : [ '<32>{#p/basic}* ...但是谁也没有来。' ],
      xtowerHiscoreNames: {
         kidd: '超爱UNDYNE10',
         napstablook: 'NAPSTABLOOK22',
         papyrus: '酷炫骷髅95',
         sans: '懒骨.',
         undyne: '壮鱼91',
         you: '（游客）'
      },
      xtowerMessage1: '新纪录！',
      xtowerMessage2: '祝你下次好运...',
      xtowerMessage3: '感谢游玩！',
      xtowerSans: () =>
         world.genocide
            ? [
                 '<32>{#p/event}* 铃铃，铃铃...',
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
                 '<32>{#p/event}* 铃铃，铃铃...',
                 '<25>{#p/sans}* 你在这花这么大的努力\n  就只是为了超过\n  我的分数吗？',
                 "<25>{#f/3}* 哇塞。\n* 那你可比我兄弟\n  固执多了。",
                 ...(SAVE.data.n.state_starton_papyrus === 1
                    ? [
                         '<25>{#f/3}* ...',
                         "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 可惜他已经死了，\n  不是吗？",
                         '{*}{#s.resume}{%}'
                      ]
                    : [
                         SAVE.data.n.plot === 72
                            ? "<25>{#f/0}* 我本想给你一份\n  特殊大礼，但不巧的是\n  我还在找toriel。"
                            : "<25>{#f/0}* 我本想给你一份\n  特殊大礼，但不巧的是\n  我还在休息。",
                         ...(world.edgy_x
                            ? [ '<25>{#f/0}* 不要见怪。', '<32>{#s/equip}{#p/event}* 滴...' ]
                            : [
                                 "<25>{#f/2}* 所以先给你一些零花钱\n  作为奖励吧。",
                                 '<32>{#s/equip}{#p/human}* （你得到了10000G。）'
                              ])
                      ])
              ],
      xtowerAsriel: [
         '<25>{#p/asriel1}{#f/13}* ... you actually beat the high score?',
         '<25>{#f/17}* Wow.\n* I under-estimated you.',
         '<25>{#f/20}* Very cool, Frisk.'
      ],
      xtowerScore: '得分：$(x)'
   },

   b_group_starton: {
      dogs: () => (world.goatbro ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ] : [ '<32>{#p/story}* Dogi向你发起攻击！' ]),
      spacetopJerry: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 俗气的帽子再配上没谱的伙计。' ]
            : [ '<32>{#p/story}* Astro Serf闲逛过来了！\n* Jerry也来了。' ],
      stardrakeSpacetop: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 笨蛋青年两人组。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake and Astro Serf pose like bad guys.' ]
            : [ '<32>{#p/story}* Stardrake and Astro Serf pose like bad guys.' ],
      stardrakeSpacetop2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一个了。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake remains steady.' ]
            : [ '<32>{#p/story}* Stardrake remains steady.' ],
      stardrakeSpacetop2b: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 只剩一个了。' ] : [ '<32>{#p/story}* Astro Serf remains steady.' ],
      stardrakeSpacetop2c: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 只剩一个了。' ] : [ '<32>{#p/story}* Just Astro now.' ],
      stardrakeSpacetop2d: () => (world.goatbro ? [ '<32>{#p/asriel2}* Jerry。' ] : [ '<32>{#p/story}* Jerry。' ]),
      stardrakeSpacetopJerry: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 笨蛋青年两人组。\n* 再加一个，Jerry。' ]
            : SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry and friends appear!' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Astro Serf和Chilldrake叹着气\n  来和你对峙了。\n* Jerry。' ]
            : [ '<32>{#p/story}* Astro Serf和Stardrake叹着气\n  来和你对峙了。\n* Jerry。' ],
      stardrakeSpacetopJerry2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 还剩下两个。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Astro Serf and Chilldrake remain steady.' ]
            : [ '<32>{#p/story}* Astro Serf and Stardrake remain steady.' ],
      stardrakeSpacetopJerry2b: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 还剩下两个。' ] : [ '<32>{#p/story}* Astro Serf remains steady.\n* Jerry.' ],
      stardrakeSpacetopJerry2c: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 还剩下两个。' ]
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
                    '<32>{#p/asriel2}* Chilldrake，中二叛逆。\n* 胡乱撒气，荒唐至极。'
                 ]
               : [
                    '<32>{#p/asriel2}* Stardrake，逗逼。\n* 总喜欢给别人讲笑话，\n  殊不知自己就是个最大的笑话。'
                 ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<33>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebels against everything!!\n* On the lookout for Starry.' ]
            : [ '<32>{#p/story}* STARDRAKE - 攻击12 防御7\n* 这名喜剧演员拼尽力气\n  想留住一位观众。' ],
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
         SAVE.data.b.s_state_chilldrake ? [ '<32>{#p/asriel2}* Chilldrake。' ] : [ '<32>{#p/asriel2}* Stardrake。' ],
      heckleStatus: () =>
         world.goatbro
            ? SAVE.data.b.s_state_chilldrake
               ? [ '<32>{#p/asriel2}* Chilldrake。' ]
               : [ '<32>{#p/asriel2}* Stardrake。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is puffed up...' ]
            : [ '<32>{#p/story}* Stardrake骄傲自满...' ],
      heckleTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}No!!\nThis is the way!' ]
            : [ "<08>{#p/basic}{~}这个也\n不好笑！" ],
      heckleTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Filthy law- obider.' ]
            : [ '<08>{#p/basic}{~}Is your flesh rotten as you?' ],
      heckleTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ "<08>{#p/basic}{~}Defiance can't be defied!" ]
            : [ '<08>{#p/basic}{~}（侮辱\n人类）' ],
      heckleText1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You denounce Chilldrake for its cause.)' ]
            : [ '<32>{#p/human}* （你对Stardrake喝倒彩。）' ],
      heckleText2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You tell Chilldrake that they should be a rebel somewhere else.)' ]
            : [ "<32>{#p/human}* （你说Stardrake\n  没有一点幽默细胞。）" ],
      heckleText3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [
                 '<32>{#p/human}* (You mock Chilldrake for protesting out in the middle of nowhere.)',
                 '<32>{#p/basic}* Chilldrake takes your mockery as advice, and saunters off to town...'
              ]
            : [
                 '<32>{#p/human}* (You tell Stardrake that no one will ever love them the way they are.)',
                 '<32>{#p/basic}* 他百口莫辩，灰溜溜地逃走了...'
              ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 离死不远了。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake的身体正在粉碎。' ]
            : [ '<32>{#p/story}* Stardrake的身体正在粉碎。' ],
      idleTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Brush my teeth?\nNo way in heck!' ]
            : [ '<08>{#p/basic}{~}尽量不要\n放“空”\n自我..' ],
      idleTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}No bedtime for this bird!' ]
            : [ '<08>{#p/basic}{~}I\'m just in my moon pun \"phase\"' ],
      idleTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Who needs parents anyway!?' ]
            : [ '<08>{#p/basic}{~}已经好\n几“光年”\n没回家了..' ],
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
            : [ '<32>{#p/story}* Stardrake对自己的\n  五“星”级笑话感到满意。' ],
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
            : [ '<08>{#p/basic}{~}看到没！？\n笑了！\n老妈是\n对的！' ],
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
            : [ "<32>{#p/human}* （你对Stardrake的笑话\n  回以大笑。）" ],
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
            : [ '<32>{#p/story}* Stardrake被自己想出的\n  下一个双关笑话逗笑了。' ],
      randStatus4: () => [ '<32>{#p/story}* Smells like wet pillows.' ],
      randStatus5: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Smells like body spray.' ]
            : [ '<32>{#p/story}* Stardrake sighs in relief, realizing its own name is in fact not a pun.' ],
      status1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake saunters up!' ]
            : [ '<32>{#p/story}* Stardrake扑腾了过来！' ]
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
                 '<32>{#p/asriel2}* Jerry，公认的傻帽。\n* 他就是个不折不扣的废物， 一文不值。'
              ]
            : [ '<32>{#p/story}* JERRY - 攻击0 防御30\n* 大家都认识Jerry。\n* 会延长攻击时间。' ],
      act_flirt: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/human}* (You flirt with Jerry.)\n* (It appreciates the compliment.)' ]
            : 5 <= world.flirt
            ? [ '<32>{#p/human}* (You call on your experience, and deliver a life-changing flirt.)' ]
            : [
                 '<32>{#p/human}* (You flirt with Jerry.)',
                 '<32>{#p/basic}* Jerry seems to like you a little too much now.'
              ],
      act_ditch: () => [ '<32>{#p/human}* （你甩掉了Jerry。）' ],
      act_kiss: () => [ '<32>{#p/human}* (You kiss Jerry.)' ],
      flirtStatus: [ "<32>{#p/story}* Jerry's redemption arc begins." ],
      flirtStatusWeird: [ '<32>{#p/story}* This is wrong on so many levels.' ],
      flirtTalk: [
         '<08>{#p/basic}{~}You... y-you...',
         "<08>{#p/basic}{~}Just for you, I'll...",
         "<08>{#p/basic}{~}I'll be the best person I can be!"
      ],
      flirtTalkWeird: [ '<08>{#p/basic}{~}\x00*licks lips*' ],
      genoStatus: [ '<32>{#p/asriel2}* Jerry。' ],
      hurtStatus: () => (world.goatbro ? [ '<32>{#p/asriel2}* 离死不远了。' ] : [ '<32>{#p/story}* Jerry受了伤。' ]),
      idleTalk1: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}I'm so glad we're here!" ]
            : [ "<08>{#p/basic}{~}你们\n不觉得\n无聊吗？" ],
      idleTalk2: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Can we do this more often??' ]
            : [ '<08>{#p/basic}{~}我们到底\n为什么在\n干这事？' ],
      idleTalk3: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Hey, you guys are the BEST!' ]
            : [ '<08>{#p/basic}{~}Wow, you guys SUCK at this.' ],
      idleTalk4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Does anyone want a hug?' ]
            : [ '<08>{#p/basic}{~}嘘嘘嘘！\n别吵，\n让我思考！' ],
      idleTalkSolo1: () =>
         SAVE.data.b.spared_jerry ? [ '<08>{#p/basic}{~}Thanks for being here!' ] : [ '<08>{#p/basic}{~}尴尬了。' ],
      idleTalkSolo2: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}You're awesome!\nJust saying." ]
            : [ '<08>{#p/basic}{~}所以，\n你在做\n什么？' ],
      idleTalkSolo3: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}Wouldn't trade ya for the galaxy." ]
            : [ '<08>{#p/basic}{~}这儿的信号\n烂透了。' ],
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
            : [ '<32>{#p/story}* Jerry打了个哈欠。' ],
      randStatus4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Smells like...... Jerry?' ]
            : [ '<32>{#p/story}* Smells like...... Jerry.' ],
      status1: [ '<32>{#p/story}* Jerry紧抓着你！' ],
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
            ? [ '<32>{#p/asriel2}* Whizkarat，流浪猫。\n* 早已活得浑浑噩噩。' ]
            : [ '<33>{#p/story}* WHIZKARAT - 攻击16 防御8\n* 这只以城为家的时髦的猫\n  只想过简单的生活。' ],
      act_check2: [
         "<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This posh city cat regrets going where it doesn't belong."
      ],
      act_check3: [
         '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This reformed country mouse is quite pleased with itself.'
      ],
      act_check4: [
         '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This reformed country mouse has taken a liking to you.'
      ],
      act_direct: [ '<32>{#p/human}* （你告诉Whizkarat一个\n  关于老鼠的事实。' ],
      act_direct2: [
         '<32>{#p/human}* （你把你知道的关于老鼠的全部知识\n  告诉了Whizkarat。）',
         '<32>{#p/basic}* 突然间..！'
      ],
      act_direct3: [ "<32>{#p/human}* (You try to tell Whizkarat more, but it's already found its way.)" ],
      act_disown: [
         "<32>{#p/human}* （你拔下了Whizkarat\n  脸上的一根胡须。）",
         '<32>{#p/basic}* Whizkarat发出了刺耳的嘶嘶声！'
      ],
      act_disown2: [
         "<32>{#p/human}* （你又拔下了Whizkarat\n  脸上的一根胡须。）",
         '<32>{#p/basic}* Whizkarat吃痛，匆匆跑开了！'
      ],
      act_disown3: [ '<32>{#p/human}* (You try to pluck a whisker, but Whizkarat pretends it has none.)' ],
      act_flirt: [ "<32>{#p/human}* (You make a cute remark and scratch Whizkarat's neck.)" ],
      disownStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Whizkarat。' ] : [ '<32>{#p/story}* Whizkarat逐渐变得不再冷静。' ],
      disownTalk1: [ '<08>{#p/basic}{~}把你的\n爪子\n拿开..！' ],
      flirtTalk: [ '<08>{#p/basic}{~}No pussy- cats allowed.' ],
      flirtTalk2: [ '<08>{#p/basic}{~}\x00*purrs gently*' ],
      genoStatus: [ '<32>{#p/asriel2}* Whizkarat。' ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 离死不远了。' ] : [ '<32>{#p/story}* Whizkarat快断气了。' ],
      idleTalk1: [ '<08>{#p/basic}{~}What food do they eat?' ],
      idleTalk2: [ '<08>{#p/basic}{~}Where do they hide?' ],
      idleTalk3: [ '<08>{#p/basic}{~}How do they speak?' ],
      idleTalk4: [ '<08>{#p/basic}{~}Do they dream?' ],
      initTalk1: [ '<08>{#p/basic}{~}Alas, here I stand.' ],
      initTalk2: [ '<08>{#p/basic}{~}Oh, how I lose myself..' ],
      initTalk3: [ '<08>{#p/basic}{~}事态\n并不\n理想。' ],
      initTalk4: [ '<08>{#p/basic}{~}Could you help me?' ],
      name: '* Whizkarat',
      randStatus1: [ '<32>{#p/story}* Whizkarat fantasizes about getting down on all fours.' ],
      randStatus2: [ '<32>{#p/story}* Whizkarat scans the area.' ],
      randStatus3: [ '<32>{#p/story}* Whizkarat正试图装成\n  自己很小的样子。' ],
      randStatus4: [ '<32>{#p/story}* Smells like top-twenty-cheese.' ],
      remindStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Whizkarat。' ]
            : [ '<32>{#p/story}* Whizkarat只需要一点\n  小小的帮助。' ],
      remindTalk1: [ '<08>{#p/basic}{~}住在\n洞里，\n是吗..？' ],
      remindTalk2: [ '<08>{#p/basic}{~}会像\n玩具\n吱吱叫，\n是吗..？' ],
      remindTalk3: [ '<08>{#p/basic}{~}从现在\n开始，\n我应该像\n老鼠一样\n生活。' ],
      safeStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一击。" ] : [ '<32>{#p/story}* Whizkarat has found its way.' ],
      safeTalk1: [ '<08>{#p/basic}{~}Wonder- ful...' ],
      safeTalk2: [ '<08>{#p/basic}{~}Simply splen- did...' ],
      status1: [ '<32>{#p/story}* Whizkarat来了！' ]
   },
   b_opponent_doggo: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Doggo，一条不顺眼的狗。\n* 这个蠢货怎么又上岗了？' ]
            : [ '<32>{#p/story}* DOGGO - 攻击13 防御7\n* 一点风吹草动便能让它兴奋。\n* 喜好之一：拥抱。' ],
      act_check2: [ '<32>{#p/story}* DOGGO - 攻击13 防御7\n* 甚至难以看见它自己...' ],
      act_check3: [ '<32>{#p/story}* DOGGO - 攻击13 防御7\n* 一只非常兴奋的狗，\n  正在享受其所好。' ],
      act_check4: [ '<32>{#p/story}* DOGGO - 攻击13 防御7\n* 在你眼里，这只狗在生活中\n  非常地孤独。' ],
      act_flirt: () => [ '<32>{#p/human}* （你向Doggo调情。）' ],
      act_cuddle: () => [ '<32>{#p/human}* （你紧紧地抱住Doggo。）' ],
      fetch: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗跑出去捡了回来。）\n* （你们就这样玩了一会巡回游戏。）'
      ],
      fetchTalk: pager.create(
         0,
         [ '<11>{#p/basic}{~}哈！！\n有趣的扳手\n出现了！' ],
         [ '<11>{#p/basic}{~}哈！！\n又出现了！' ]
      ),
      fetchTalkX1: [ "<11>{#p/basic}{~}它去哪\n了！？" ],
      fetchTalkX2: [ "<11>{#p/basic}{~}我的扳手\n在哪里！？" ],
      flirt1: [ '<11>{#p/basic}{~}（情不自禁\n地脸红）' ],
      invisStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一击。" ] : [ '<32>{#p/story}* Doggo找不到你了。' ],
      name: '* Doggo',
      fetchStatus: [ '<32>{#p/story}* Doggo喜欢巡回游戏！' ],
      fetchpet: [ '<32>{#p/human}* （但是Doggo忙于寻找扳手，\n  没时间让你摸。）' ],
      fetchflirt: [ '<32>{#p/human}* （但是Doggo忙于寻找扳手，\n  没时间听你说话。）' ],
      fetchcuddle: [ '<32>{#p/human}* （但是Doggo忙于寻找扳手，\n  没时间让你抱。）' ],
      normaStatus: () => (world.goatbro ? [ '<32>{#p/asriel2}* Doggo。' ] : [ "<32>{#p/story}* Doggo知道你在这里。" ]),
      pet: () => [
         '<32>{#p/human}* （你摸了摸Doggo。）',
         ...(world.goatbro
            ? [
                 [],
                 [ '<32>{#p/asriel2}* ...又摸？' ],
                 [ "<32>{#p/asriel2}* 摸狗有那么有趣吗..." ],
                 [ '<32>{#p/asriel2}* ...有趣吗？' ],
                 [ '<32>{#p/asriel2}* 蠢死了。' ],
                 [ '<32>{#p/asriel2}* 你非得要这么摸吗？' ],
                 [ '<32>{#p/asriel2}* ...非得摸吗？' ],
                 [ '<32>{#p/asriel2}* 我看真是。' ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* 事态快要失控了...' ],
                 [ '<32>{#p/asriel2}* 还摸？\n* 没完了是吧...' ],
                 [ '<32>{#p/asriel2}* 哇哦。\n* 后面忘了。' ],
                 [ '<32>{#p/asriel2}* 你玩得可真是不亦乐乎啊。' ],
                 [ '<32>{#p/asriel2}* ...' ]
              ][Math.min(battler.volatile[0].vars.pet - 1, 13)]
            : [])
      ],
      cuddle: pager.create(
         0,
         [ '<11>{#p/basic}{~}抱抱！？\n行吧，至少\n我知道它在\n哪里了！' ],
         [ '<11>{#p/basic}{~}又抱！？' ]
      ),
      petStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一击。" ] : [ '<32>{#p/story}* Doggo已经被摸过了。' ],
      petTalk1: [ "<11>{#p/basic}{~}啥！！！\n我被摸了！" ],
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
      query1: [ '<11>{#p/basic}{~}别想逃！' ],
      query2: [ "<11>{*}{#p/basic}{~}哈！\n它动了！\n它肯定动了！{^30}{%}" ],
      query3: [ '<11>{#p/basic}{~}我倒要看看\n这次它还动吗？' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* Doggo。' ] : [ '<32>{#p/story}* Doggo挡住了去路！' ]),
      sussy: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Doggo。' ] : [ '<32>{#p/basic}* Doggo对你的行动\n  十分戒备。' ]
   },
   b_opponent_lesserdog: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Canis Minor，一条蠢狗。\n* 估计他都不知道自己为啥在这。" ]
            : [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Wields a shiny dogger made of fido-nium.' ],
      act_check2: [
         '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Scarred for life, this puppy wants to turn tail and run.'
      ],
      act_check3: [
         "<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* It's necks-in-line for the galaxy's tallest monster."
      ],
      act_check4: [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Trying its best to decipher your advanced petting.' ],
      act_check5: [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* The journey for this puppy has only just begun.' ],
      act_flirt: [ '<32>{#p/human}* （你用摩斯密码的方式\n  拍抚着Canis Minor，\n  以此传达你对它的爱意。）' ],
      act_handshake: [
         "<32>{#p/human}* （你把手放在Canis Minor的头上\n  晃啊晃，抚摸着它的毛。）"
      ],
      act_inquire: [
         "<32>{#p/human}* （你抚摸着Canis Minor，\n  并问它好狗狗是谁。\n  它兴奋地汪汪叫以示回答。）"
      ],
      act_tickle: [
         "<32>{#p/human}* （你抓挠着Canis Minor的侧边\n  来爱抚它。）\n* （它兴奋得近于狂乱。）"
      ],
      fetch: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗伸长脖子把扳手捡了回来。）',
         '<32>{#p/human}* （你们就这样\n  玩了一会巡回游戏。）',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 但是为什么呢？' ] : [])
      ],
      fetchStatus: [ '<32>{#p/story}* Canis Minor喜欢巡回游戏！' ],
      fetchTalk: [ '<11>{#p/basic}{~}（剧烈\n喘喘）' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 离死不远了。' ]
            : [ '<32>{#p/story}* Canis Minor将它的尾巴\n  夹到两条腿之间。' ],
      name: '* Canis Minor',
      petTalk1: [ '<11>{#p/basic}{~}（喘气 \n喘气）' ],
      petTalk2: [ '<11>{#p/basic}{~}（轻微的\n犬叫声）' ],
      petTalk3: [ '<11>{#p/basic}{~}（尾巴\n摇摇）' ],
      petTalk4: [ '<11>{#p/basic}{~}（想着吃的）' ],
      petTalk5: [ '<11>{#p/basic}{~}（喘气！\n喘气！）' ],
      petTalk6: [ '<11>{#p/basic}{~}（兴奋\n叫喊）' ],
      petTalk7: [ '<11>{#p/basic}{~}（摩托\n发动）' ],
      petTalk8: [ '<11>{#p/basic}{~}（飞机\n起飞）' ],
      petTalk9: [ '<11>{#p/basic}{~}（水壶\n鸣笛）' ],
      petTalk10: [ '<11>{#p/basic}{~}（...）' ],
      petTalk11: [ '<11>{#p/basic}{~}（来自\n星空的\n汪汪）' ],
      petTalk12: [ '<11>{#p/basic}{~}（汪汪）' ],
      petText1: () => [ '<32>{#p/human}* （你只是稍微抬了下手。）', '<32>{#p/basic}* 好兴奋哦！' ],
      petText2: () => [
         '<32>{#p/human}* （你轻轻地摸了一下狗子。）',
         "<32>{#p/basic}* 它已经兴奋过头了...",
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 狗子们还真喜欢被摸啊。' ] : [])
      ],
      petText3: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         "<32>{#p/basic}* 它仰起头，迎向你的手心。",
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 够了，你都摸过它了。\n* 真没必要继续摸了。" ] : [])
      ],
      petText4: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 真是只好狗狗。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 继续摸它有必要吗？' ] : [])
      ],
      petText5: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 它的兴奋永无止境...',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 没必要继续摸了。' ] : [])
      ],
      petText6: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 会心一摸！\n* 狗子的兴奋度增加了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 天呐，$(name)。' ] : [])
      ],
      petText7: () => [
         '<32>{#p/human}* （你得跳起来才摸得到狗子了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 我们不能以摸狗为生。" ] : [])
      ],
      petText8: () => [
         '<32>{#p/human}* （你想摸摸Canis Minor，\n  结果，连够都够不到。）',
         '<32>{#p/basic}* 不过它还是更加兴奋了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 我们真要摸一整天狗吗...？' ] : [])
      ],
      petText9: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 根本没法停下这场闹剧。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText10: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 不积跬步，无以至千里。\n  不积小摸，无以得巨狗。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 为啥要在这浪费时间？' ] : [])
      ],
      petText11: () => [
         '<32>{#p/human}* （你呼唤着Canis Minor，\n  然而它已经听不到你说话了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 这下好了。\n* 再也别想够着它了。" ] : [])
      ],
      petText12: () => [ '<32>{#p/basic}* ...', ...(world.goatbro ? [ '<32>{#p/asriel2}* ？？？' ] : []) ],
      petText13: () => [
         '<32>{#p/human}* （你又够得着Canis Minor了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 你跟我开玩笑呢是吧？" ] : [])
      ],
      petText14: () => [ '<32>{#p/human}* （你摸了摸Canis Minor。）' ],
      petText15: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         "<32>{#p/basic}* 你可能有什么毛病。"
      ],
      petText16: () => [
         '<32>{#p/human}* （你没摸着Canis Minor，\n  但它很看好你的努力。）',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 给我停下。' ] : [])
      ],
      petText17: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 节制撸狗，人人有责。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 请你停下。' ] : [])
      ],
      petText18: () => [
         '<32>{#p/human}* （你摸了摸Canis Minor。）',
         '<32>{#p/basic}* 闹剧还在继续。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText19: () => [
         '<32>{#p/human}* （你够不着Canis Minor了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 好了，该结束了。\n* 赶紧杀了这个蠢货。" ] : [])
      ],
      petText20: () => [
         '<32>{#p/human}* （开玩笑吧。）',
         '<32>{#p/basic}* ...开玩笑吧。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 开玩笑吧...' ] : [])
      ],
      statusX: [ "<32>{#p/asriel2}* 不堪一击。" ],
      status0: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* Canis Minor出现了。' ]),
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ '<32>{#p/story}* Canis Minor将自己的头\n  歪向一侧。' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ '<32>{#p/story}* Canis Minor觉得你的武器\n  是狗饼干。' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ '<32>{#p/story}* Canis Minor有点心不在焉。' ],
      status4: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* 有一股狗粮的气味。' ]),
      status5: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* Canis Minor在兴奋地汪汪叫。' ],
      status6: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* Canis Minor被过度刺激了。' ],
      status7: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ '<32>{#p/story}* Canis Minor看样子\n根本停不下来。' ],
      status8: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* Canis Minor正在下降。' ],
      status9: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* Canis Minor正在尝试着编码。' ],
      status10: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ "<32>{#p/story}* Canis Minor由于看不见你\n而发出呜呜的哀鸣。" ],
      status11: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Minor。' ] : [ '<32>{#p/story}* 你好啊。' ]),
      status12: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ '<32>{#p/story}* Canis Minor对于你的生活选择\n表示质疑。' ],
      status13: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Minor。' ]
            : [ '<32>{#p/story}* Canis Minor去了没有任何狗狗\n  到过的地方。' ]
   },
   b_opponent_dogamy: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy，一条废狗。\n* 纯靠他的疯狗老婆过活。' ]
            : [ '<32>{#p/story}* DOGAMY - 攻击14 防御5\n* Dogaressa的老公。\n* 只认识他闻到的东西。' ],
      act_check2: [ '<32>{#p/story}* DOGAMY - 攻击14 防御5\n* 新近丧偶。\n* 只认识失去老婆的痛苦。' ],
      act_check3: [ '<32>{#p/story}* DOGAMY - 攻击14 防御5\n* Dogaressa的老公。\n* 认识的东西比先前更多了。' ],
      act_check4: [ "<32>{#p/story}* DOGAMY - 攻击14 防御5\n* Dogaressa的老公。\n* 也想把这份爱分享给老婆...？" ],
      act_check5: [ "<32>{#p/story}* DOGAMY - 攻击14 防御5\n* Dogaressa的老公。\n* 并不介意离开...？" ],
      fetchText: [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗们跑出去捡了回来。）\n* （你们就这样玩了一会巡回游戏。）'
      ],
      fetchTextLone: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （但Dogamy没有理它，\n  任由其滚落到了边缘。）',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? [ '<32>{#p/asriel2}* 预料到了。' ] : [])
      ],
      flirtTalk1: [ '<11>{#p/basic}{~}啊！\n但是为啥\n...！？' ],
      flirtTalk2: [ '<11>{#p/basic}{~}爱无处不在？' ],
      flirtTalk3: [ "<11>{#p/basic}{~}你刚才..." ],
      flirtTalk4: [ "<11>{#p/basic}{~}这只小狗在\n干什么？" ],
      flirtText: [
         '<32>{#p/human}* （你向Dogamy调情。）',
         "<32>{#p/basic}* 你的... 信息素，\n  传到了Dogamy的鼻子上。"
      ],
      flirtTextLone: [ '<32>{#p/human}* （你向Dogamy调情。）', "<32>{#p/basic}* Dogamy的表情没有发生变化。" ],
      loneStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一个了。' ]
            : [ '<32>{#p/story}* Dogaressa一心想要踢\n  人类的尾巴。' ],
      loneTalk1: [ '<11>{#p/basic}{~}汪呜！' ],
      loneTalk2: [ '<11>{#p/basic}{~}呜——' ],
      loneTalk3: [ '<11>{#p/basic}{~}嗷呜...' ],
      name: '* Dogamy',
      fetchStatus: [ '<32>{#p/story}* 已婚的狗喜欢巡回游戏！' ],
      fetchStatusX: [ "<32>{#p/story}* 狗狗们的思绪正指数增长！" ],
      otherPet: [ '<11>{#p/basic}{~}...' ],
      petNeedStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* Dogaressa正在寻求关爱。' ],
      petStatus: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 不堪一击。" ]
            : [ "<32>{#p/story}* 狗狗们的思绪增加了！" ],
      petTalk1: [ '<11>{#p/basic}{~}手拿开，\n你这个\n该死的\n人类。' ],
      petTalk1x: [ '<11>{#p/basic}{~}手拿开，\n你这只\n奇怪的\n小狗。' ],
      petTalk2: [ '<11>{#p/basic}{~}哇！！！\n来自另一只\n小狗的抚摸\n！！！' ],
      petTalk3: [ "<11>{#p/basic}{~}停下！\n别碰她！" ],
      petTalk4: [ '<11>{#p/basic}{~}那我呢\n......' ],
      petTalk5: [ '<11>{#p/basic}{~}谢谢你...' ],
      petText: [ '<32>{#p/human}* （你抚摸了Dogamy。）' ],
      petTextLone: [ '<32>{#p/human}* （你尝试抚摸Dogamy，\n  但他畏惧地缩起自己的头。）' ],
      randTalk1: () =>
         world.goatbro
            ? [ '<11>{#p/basic}{~}王子已经\n失去了\n理智...' ]
            : [ "<11>{#p/basic}{~}带走\n我老婆...\n身上的\n跳蚤。" ],
      randTalk2: () =>
         world.goatbro ? [ '<11>{#p/basic}{~}You have come far...' ] : [ "<11>{#p/basic}{~}别碰我的\n热狗。" ],
      randTalk3: () =>
         world.goatbro
            ? [ "<11>{#p/basic}{~}我们会\n打倒你！" ]
            : [ '<11>{#p/basic}{~}克历614年\n卖萌大赛\n冠军！！' ],
      randTalk4: () =>
         world.goatbro ? [ "<11>{#p/basic}{~}这次\n你不会赢的..." ] : [ "<11>{#p/basic}{~}咱们一起\n踩烂人类的\n尾巴！！" ],
      resmellStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* 狗狗们认为\n  你是一条走丢的小狗。' ],
      resmellText1: [
         '<32>{#p/human}* （你让狗狗们再闻闻你。）',
         '<32>* （你闻起来仍然很古怪。）'
      ],
      resmellText2: [
         '<32>{#p/human}* （你让狗狗们再闻闻你。）',
         '<32>* （在泥里打了几个滚后，\n  你的气味正常了。）'
      ],
      resmellText3: [
         '<32>{#p/human}* （你让狗狗们再闻闻你，\n  但他们已经知道你的气味正常了。）'
      ],
      resmellTextFetch: [
         '<32>{#p/human}* （你让狗狗们闻闻你，\n  但他们正忙着做别的事。）'
      ],
      resmellTextLone: [ "<32>{#p/human}* （你让Dogamy闻闻你，\n  但他连鼻子都没抬一下。）" ],
      rollStatus: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 你会把衣服弄脏的，\n  $(name)。" ]
            : [ '<32>{#p/story}* 狗狗们也许想重新闻闻你。' ],
      rollText: () => [
         '<32>{#p/human}* （你在泥里打了几个滚。）\n* （这泥好像是合成的。）',
         '<32>{#p/basic}* 你的气味有变化了...',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 你在做什么。' ] : [])
      ],
      rollText2: [
         '<32>{#p/human}* （你在泥里打了几个滚。）\n* （这泥好像是合成的。）',
         '<33>{#p/basic}* 你的气味已经变了。'
      ],
      rollTextLone: () => [
         "<32>{#p/human}* （你在Dogaressa的尘埃里打了几个滚。）",
         '<32>{#p/basic}* Dogamy更颓丧了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ "<11>{#p/basic}{~}嗯？\n那是\n什么气味？" ],
      smellTalk2: [ '<11>{#p/basic}{~}什么！\n闻上去\n像是...' ],
      smellTalk3: [ '<11>{#p/basic}{~}啊！\n多么可爱的\n气味...' ],
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* 狗狗们不停地挥舞着各自的斧头\n  以保护彼此。' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* 狗狗们正在重新评估\n  你的气味。' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* 狗狗们正为下一场情侣大赛\n  做练习。' ],
      status4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* 狗狗们正互相低声说着甜言蜜语。' ],
      susText: [ "<32>{#p/basic}* 狗狗们仍然认为你是个\n  臭烘烘的人类。" ],
      fetchTalk: [ '<11>{#p/basic}{~}巡回游戏\n真是\n太有趣啦！' ],
      fetchTalkX: [ '<11>{#p/basic}{~}和另外一只\n小狗狗一起\n玩巡回\n游戏！？' ]
   },
   b_opponent_dogaressa: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Dogaressa，一条疯狗。\n* 没了她老公，分分钟发疯。" ]
            : [ '<32>{#p/story}* DOGARESSA - 14攻击 5防御\n* 这只小狗认为她丈夫很可爱。\n  仅限于气味的那种？' ],
      act_check2: [ '<32>{#p/story}* DOGARESSA - 14攻击 5防御\n* 这只小狗非常想念她的老公\n  仅限于被杀掉后的那种？' ],
      act_check3: [ '<32>{#p/story}* DOGARESSA - 14攻击 5防御\n* 对这只小狗来说\n  事态进展得很顺利。' ],
      act_check4: [
         "<32>{#p/story}* DOGARESSA - 14攻击 5防御\n* 这只小狗发觉可爱的东西\n  不只有她老公。"
      ],
      act_check5: [ "<32>{#p/story}* DOGAMY - 攻击14 防御5\n* 这只小狗在为她老公的安危担忧。" ],
      fetchTextLone: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （Dogaressa将其捡了起来，然后摔了个粉碎。）',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? [ '<32>{#p/asriel2}* 预料到了。' ] : [])
      ],
      flirtTalk1: [ '<11>{#p/basic}{~}（嘿！\n别闹了！）' ],
      flirtTalk2: [ '<11>{#p/basic}{~}（变得\n越来越\n奇怪了。）' ],
      flirtTalk3: [ '<11>{#p/basic}{~}（...\n跟我调情！\n啊！）' ],
      flirtTalk4: [ '<11>{#p/basic}{~}（我觉得\n它爱我，\n非常爱\n的那种。）' ],
      flirtText: [
         '<32>{#p/human}* （你向Dogaressa调情。）',
         "<32>{#p/basic}* 你的... 信息素，\n  传到了Dogaressa的鼻子上。"
      ],
      flirtTextLone: [
         '<32>{#p/human}* （你向Dogaressa调情。）',
         "<32>{#p/basic}* Dogaressa的表情没有发生变化。"
      ],
      loneStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 只剩一个了。' ] : [ '<32>{#p/story}* Dogamy心碎了。' ],
      loneTalk1: [ '<11>{#p/basic}{~}（会让你\n好受的。）' ],
      loneTalk2: [ "<11>{#p/basic}{~}（你会为此\n受苦的。）" ],
      name: '* Dogaressa',
      otherPet: [ '<11>{#p/basic}{~}（...）' ],
      petNeedStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Dogamy和Dogaressa。' ]
            : [ '<32>{#p/story}* Dogamy正在寻求关爱。' ],
      petTalk1: [ "<11>{#p/basic}{~}（他可不是\n你的老公，\n知道吗？）" ],
      petTalk2: [ "<11>{#p/basic}{~}（嘿！\n别忽视\n我啊！）" ],
      petTalk3: [ '<11>{#p/basic}{~}（当心\n狗狗。）' ],
      petTalk4: [ '<11>{#p/basic}{~}（狗狗\n抚摸狗狗... \n好神奇！）' ],
      petTalk5: [ "<11>{#p/basic}{~}（你是\n最棒的！）" ],
      petText: [ '<32>{#p/human}* （你抚摸了Dogaressa。）' ],
      petTextLone: [ '<32>{#p/human}* （你试图抚摸Dogaressa，\n  但她只是对你低吼。）' ],
      randTalk1: () => (world.goatbro ? [ '<11>{#p/basic}{~}（确实。）' ] : [ "<12>{#p/basic}{~}（别真的\n那么做...）" ]),
      randTalk2: () => (world.goatbro ? [ '<11>{#p/basic}{~}（够\n远了。）' ] : [ '<11>{#p/basic}{~}（他指的\n是我。）' ]),
      randTalk3: () =>
         world.goatbro
            ? [ '<11>{#p/basic}{~}（必要时\n使用武力。）' ]
            : [ '<11>{#p/basic}{~}（我们当然\n是冠军。）' ],
      randTalk4: () =>
         world.goatbro ? [ "<11>{#p/basic}{~}（时间到。）" ] : [ '<11>{#p/basic}{~}（人类\n有尾巴\n吗？）' ],
      resmellTalkLone: [ '<11>{#p/basic}{~}（这就是\n你想要的\n吗？？）\n（嗯？）' ],
      resmellTextLone: [
         '<33>{#p/human}* （你激励Dogaressa来闻闻你，\n  她用鼻子使劲在你脸上\n  蹭来蹭去。）'
      ],
      rollTextLone: () => [
         "<32>{#p/human}* （你在Dogamy的尘埃里打了几个滚。）",
         '<32>{#p/basic}* Dogaressa更疯狂了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ '<11>{#p/basic}{~}（闻起来\n很迷...）' ],
      smellTalk2: [ '<11>{#p/basic}{~}（你真的\n是只\n小狗吗！？）' ],
      smellTalk3: [ '<11>{#p/basic}{~}（奇怪小狗\n的气味！）' ],
      fetchTalk: [ '<11>{#p/basic}{~}（我们喜欢玩\n巡回游戏。）' ],
      fetchTalkX: [ '<11>{#p/basic}{~}（这只狗狗\n什么事\n都能做！）' ]
   },
   b_opponent_greatdog: {
      act_check: () =>
         world.goatbro
            ? [ '<33>{#p/asriel2}* Canis Major，一条傻狗。\n* 这群狗里面，\n  属它头脑简单，四肢发达。' ]
            : [ "<32>{#p/story}* CANIS MAJOR - 15攻击 8防御\n* 太过兴奋，以至于将\n  战斗当作儿戏。" ],
      act_check2: [ '<32>{#p/story}* CANIS MAJOR - 15攻击 8防御\n* 渴望着关爱与照顾...' ],
      act_check3: [ '<32>{#p/story}* CANIS MAJOR - 15攻击 8防御\n* 已经累到虚脱了。' ],
      act_flirt: [
         '<32>{#p/human}* （你向Canis Major调情。）',
         '<32>{#p/basic}* Canis Major尴尬地歪着头。'
      ],
      beckonText: [
         '<32>{#p/human}* （你叫了叫Canis Major。）',
         '<32>{#p/basic}* 它跃向你，甩了你满脸口水。'
      ],
      closeStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major。' ] : [ '<32>{#p/story}* Canis Major渴望着关爱。' ],
      closeText: [ "<32>{#p/human}* （你叫了叫Canis Major。）\n* （但狗狗只是竖了竖耳朵。）" ],
      doneText: [ '<32>{#p/basic}* Canis Major觉得你太无趣了。' ],
      fetch: () =>
         world.goatbro
            ? [
                 '<32>{#p/human}* （你把扳手扔了出去。）\n* （Canis Major把它吸收进自己的身体，\n  然后若无其事地继续玩耍。）',
                 '<32>{#p/asriel2}* 呃... 这河里吗。'
              ]
            : [
                 '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗跑出去捡了回来。）\n* （你们就这样玩了一会巡回游戏。）'
              ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 离死不远了。' ] : [ '<32>{#p/story}* Canis Major正缓缓地喘着气。' ],
      ignoreStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major。' ]
            : [ '<32>{#p/story}* Canis Major只是想要一些关爱。' ],
      ignoreStatus2: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major。' ] : [ '<32>{#p/story}* Canis Major正在卖萌。' ],
      name: '* Canis Major',
      fetchStatus: [ '<32>{#p/story}* Canis Major喜欢巡回游戏！' ],
      petStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major。' ]
            : [ '<32>{#p/story}* Canis Major正用前爪拍打着地面。' ],
      petStatus2: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major。' ] : [ '<32>{#p/story}* Canis Major想要温柔的关爱。' ],
      petStatus3: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [ '<32>{#p/story}* 抚摸能量，百分之四十！' ],
      petStatus4: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一击。" ] : [ '<32>{#p/story}* Canis Major非常满足。' ],
      petText0: [ '<32>{#p/human}* （但是Canis Major离你太远了，\n  你摸不着它。）' ],
      petText1: [
         '<32>{#p/human}* （Canis Major享受着你的抚摸，\n  它把整个身子都蜷缩在你的腿上。）',
         '<32>* （它太舒服了，呼呼睡着了。）',
         '<32>* （狗子打呼着，打呼着...）',
         '<32>* （...然后它醒了。）',
         "<32>{#p/basic}* Canis Major的兴奋度\n  毫无征兆地增加了！"
      ],
      petText2: [
         '<32>{#p/human}* （你想摸摸狗子...）',
         '<32>* （...然而它的兴奋能量\n  形成了一个反抚摸能量场。）'
      ],
      petText3: [
         '<32>{#p/human}* （你摸了摸狗狗。）\n* （他将自身全部重量都压到了\n  你身上。）',
         "<32>* （你的移动速度变慢了，但仍没有\n  给予狗狗足够的抚摸。）"
      ],
      petText4: [
         '<32>{#p/human}* （你果断地摸了摸狗狗。）\n* （抚摸能量现在到达了百分之百！）',
         '<32>{#p/basic}* Canis Major四肢朝天躺在地上。'
      ],
      petText5: [
         '<32>{#p/human}* （你揉了揉狗狗的肚皮。）',
         '<32>{#p/basic}* Canis Major幸福地呜叫着。'
      ],
      playText1: [ '<32>{#p/human}* （但Canis Major不够兴奋，\n  不能和你一起玩。）' ],
      playText2: [
         '<32>{#p/human}* （你变幻出了全息影像，想\n  让狗狗去追赶它。）',
         '<32>* （最终，全息影像无法聚合，\n  自动消散了。）',
         '<32>* （Canis Major收集了这个区域\n  残存的所有能量，并将其\n  带还给你。）',
         '<32>{#p/basic}* 疲惫的Canis Major把头\n  靠在了你身边...'
      ],
      playText3: [ '<32>{#p/basic}* Canis Major精疲力尽，\n  不想再玩了。' ],
      playText4: [ '<32>{#p/human}* （但是Canis Major已经开始在玩\n  巡回游戏了。）' ],
      status0: () => (world.goatbro ? [ '<32>{#p/asriel2}* Canis Major。' ] : [ '<32>{#p/story}* Canis Major出现了。' ]),
      status1: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Canis Major。' ] : [ '<32>{#p/story}* Canis Major正紧紧地注视着你。' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major。' ]
            : [ '<32>{#p/story}* Canis Major正等待你的指令。' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Canis Major。' ]
            : [ '<32>{#p/story}* 有股鲜榨小狗汁的味道。' ],
      waitText: [ '<32>{#p/basic}* Canis Major逐渐向你靠近。' ]
   },
   b_opponent_papyrus: {
      act_flirt: [ '<32>{#p/human}* （你向Papyrus调情。）' ],
      act_insult: [ '<32>{#p/human}* （你骂了Papyrus一顿。）' ],
      spanner: [ '<32>{#p/human}* (You throw the spanner.)\n* (Papyrus catches it in his mouth and returns it to you.)' ],
      spannerTalk1: [ '<15>{#p/papyrus}{#f/20}WHAT A JAW- DROPPING MOVE!' ],
      spannerTalk2: [ '<15>{#p/papyrus}{#f/20}I COULD DO THIS ALL DAY!' ],
      spannerTalk3: [ '<15>{#p/papyrus}{#f/20}JUST LIKE THEY DO IT ON TV!' ],
      spannerTalk4: [ '<15>{#p/papyrus}{#f/20}捏嘿嘿！' ],
      sparableSpannerTalk1: [ '<15>{#p/papyrus}{#f/20}NOW, SHOW ME YOUR MERCY!' ],
      sparableSpannerTalk2: [ '<15>{#p/papyrus}{#f/20}...' ],
      bullySpareTalk: [
         '<15>{#p/papyrus}{#f/27}怎么...\n天暗下来了？',
         "<15>{#f/27}看来抓你\n不是啥好主意...",
         "<15>{#f/15}没错！！\n我敢说，你正渴求着\n我的仁慈！",
         '<15>{#f/20}我，伟大的PAPYRUS，\n乐意为您效劳！',
         '<15>{#f/20}人类，\n我会{@fill=#f00}饶恕{@fill=#000}你！！！',
         "<15>{#f/27}...是时候... 接受...\n我的{@fill=#f00}仁慈{@fill=#000}了..."
      ],
      act_check: () =>
         world.genocide
            ? [ '<32>{#p/story}* PAPYRUS - 攻击3 防御3\n* 亡兄之弟。' ]
            : papreal()
            ? [ '<32>{#p/story}* PAPYRUS - 攻击3 防御3\n* 依然相信着你。' ]
            : [ '<32>{#p/story}* PAPYRUS - 攻击20 防御20\n* 喜欢说“捏嘿嘿！”' ],
      act_check2: [ '<32>{#p/story}* PAPYRUS - 攻击20 防御20\n* 一切都很顺利。' ],
      act_check3: [ '<32>{#p/story}* PAPYRUS - 攻击20 防御20\n* 最最最仁慈的卫兵！' ],
      capture1: [
         "<15>{#p/papyrus}{#f/20}LOOKS LIKE YOU'RE GOING TO THE CAPTURE ZONE!!",
         '<15>{#f/24}... ALSO KNOWN AS THE GARAGE.',
         '<15>{#f/20}A HEAVILY FORTIFIED GARAGE, THAT IS!',
         '<15>{#f/20}捏嘿嘿嘿嘿\n嘿嘿！！！'
      ],
      capture2: [
         '<15>{#p/papyrus}{#f/24}WELL!!! YOU MAY HAVE CLEVERLY ESCAPED BEFORE...',
         "<15>{#f/20}BUT THIS TIME, I'VE UPGRADED THE FACILITIES.",
         '<15>{#f/20}NOT ONLY WILL YOU BE STUCK...',
         "<15>{#f/15}BUT YOU WON'T EVEN WANT TO LEAVE!!!",
         '<15>{#f/20}捏嘿嘿嘿嘿\n嘿嘿！！！'
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
         '<15>{#f/20}捏嘿嘿嘿嘿\n嘿嘿！！！'
      ],
      capture4: [
         '<15>{#p/papyrus}{#f/24}ARE YOU SURE YOU CAN KEEP THIS UP?',
         '<15>{#f/21}BEING CAPTURED AGAIN MUST BE FRUSTRATING...',
         "<15>{#f/21}I DON'T WANT YOU TO GET MAD ABOUT FAILING REPEATEDLY...",
         '<15>{#f/20}PERHAPS NEXT TIME WE CAN SKIP THE BATTLE!',
         "<15>{#f/20}FOR NOW, THOUGH, IT'S OFF TO THE CAPTURE ZONE!!!",
         '<15>{#f/20}捏嘿嘿嘿嘿\n嘿嘿！！！'
      ],
      capture5: [
         '<15>{#p/papyrus}{#f/27}WOWIE... AGAIN???',
         '<15>{#f/15}WELL, IF YOU INSIST...!',
         '<15>{#f/20}捏嘿嘿嘿嘿\n嘿嘿！！！'
      ],
      checkTalk: [ '<15>{#p/papyrus}{#f/20}捏嘿嘿！' ],
      death1: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/27}不...\n不-不...' ]
            : [ "<15>{#p/papyrus}{#f/21}呃，我没想到\n会这样..." ],
      death2: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/21}SANS，我...', '<15>{#f/33}{@random=1.1/1.1}我让你失望了...' ]
            : papreal()
            ? [
                 '<15>{#p/papyrus}{#f/27}...尽-尽管如此，\n我仍然相信你！',
                 '<15>{#p/papyrus}{#f/21}只要你努力，\n肯定能变得更好...',
                 '<15>{#p/papyrus}{#f/27}我-我保证...！'
              ]
            : [ '<15>{#p/papyrus}{#f/27}...幸-幸好，\n我的头还在！' ],
      dots: [ '<32>{#p/basic}* ...' ],
      flirt0: [ '<32>{#p/basic}* Cute.' ],
      flirt1: [
         '<15>{#p/papyrus}{#f/20}什么！？\n对我调——调——\n调情！？',
         '<15>你终于表露出\n你的{@fill=#f00}真实感受{@fill=#000}了！',
         "<15>但——但是！\n我可是个\n眼光很高的\n骷髅！！！",
         '<15>你又能做什么\n来回报我的\n爱意呢？？？'
      ],
      flirt2: [
         '<99>{#p/human}* （你要怎么回答？）{!}\n§shift=32§我会做\n§shift=32§意大利面§shift=52§我啥也不会{#c/0/4/2}'
      ],
      flirt3a: [ '<15>{#p/papyrus}{#f/24}这种\n自信的品格... \n让我想到了...' ],
      flirt3b: [ '<15>{#p/papyrus}{#f/24}这种\n谦逊的品格...\n让我想到了...' ],
      flirt4: [
         '<15>{#f/22}我自己！！！',
         "<15>{#f/10}你完美地\n贴合了我的\n所有标准！！！",
         '<15>{#f/27}我想这意味着...\n我必须和你来场\n约会了？'
      ],
      flirt5: [ "<15>{#p/papyrus}{#f/20}约会的事\n还是等到我抓住\n你之后再谈吧！" ],
      flirt6: [ "<32>{#p/human}* (No effect...)\n* (Seems acting won't escalate this battle any further.)" ],
      flirt7: [ '<32>{#p/human}* （但Papyrus现在忙于战斗，\n  没时间听你说话。）' ],
      flirtStatus1: [ '<32>{#p/story}* Papyrus正在为约会考虑\n  要穿什么。' ],
      flirtStatus2: [ '<32>{#p/story}* Papyrus往他耳后拍了些\n  骨龙水。' ],
      flirtStatus3: [ '<32>{#p/story}* Papyrus正在为约会考虑\n  要煮什么。' ],
      flirtStatus4: [ '<32>{#p/story}* Papyrus往他耳后拍了些\n  番茄酱。' ],
      flirtStatus5: [ '<32>{#p/story}* Papyrus正在想{@fill=#ff0}方色{@fill=#fff}法\n  变得出名。' ],
      flirtStatus6: [ '<32>{#p/story}* Papyrus往他耳后拍了些\n  MTT牌面霜。' ],
      flirtStatus7: [ '<32>{#p/story}* Papyrus往他耳后拍了些\n  MTT牌动漫粉。' ],
      flirtStatus8: [ '<32>{#p/story}* Papyrus往他耳后拍了些\n  MTT牌可爱汁。' ],
      flirtStatus9: [ "<32>{#p/story}* Papyrus意识到他没有耳朵。" ],
      flirtStatus10: [ '<32>{#p/story}* Papyrus头上随便贴了一些药膏。' ],
      flirtStatus11: [ "<32>{#p/story}* ...他还在想{@fill=#ff0}方色{@fill=#fff}法\n  变得出名。" ],
      hurtStatus: [ '<32>{#p/story}* Papyrus要被打败了。' ],
      insult1: [ '<15>{#p/papyrus}{#f/20}HOW SELFLESS!', '<15>{#f/21}YOU WANT ME TO FEEL BETTER ABOUT FIGHTING YOU...' ],
      insult2: [ "<15>{#p/papyrus}{#f/15}THERE'S NO NEED TO LIE TO YOURSELF!!!" ],
      insult3: [ "<32>{#p/human}* (No effect...)\n* (Seems acting won't escalate this battle any further.)" ],
      insult4: [ '<32>{#p/human}* （但Papyrus现在忙于战斗，\n  没时间听你说话。）' ],
      name: '* Papyrus',
      randomStatus1: [ '<32>{#p/story}* Papyrus正在准备一记\n  骨头攻击。' ],
      randomStatus2: [ '<32>{#p/story}* Papyrus准备了一记非骨头攻击，\n  然后花了一分钟的时间来纠正错误。' ],
      randomStatus3: [ '<32>{#p/story}* Papyrus正在做饭。' ],
      randomStatus4: [ '<32>{#p/story}* Papyrus悄悄说了一句“捏嘿嘿！”' ],
      randomStatus5: [ '<32>{#p/story}* Papyrus正在左右摇晃他的骨头。' ],
      randomStatus6: [ '<32>{#p/story}* Papyrus正在努力扮酷。' ],
      randomStatus7: [ '<32>{#p/story}* Papyrus正在考虑他的选择。' ],
      randomStatus8: [ '<32>{#p/story}* 骨头的气味。' ],
      randomStatus9: [ '<32>{#p/story}* Papyrus想起了\n  Sans讲过的一段笑话，\n  忍不住笑了几下。' ],
      spaghetti1: () => [
         '<15>{#p/papyrus}{#f/12}我的意大利面！',
         "<15>{#p/papyrus}{#f/13}AND YOU LOOK LIKE YOU'RE ENJOYING IT...",
         papreal()
            ? "<15>{#p/papyrus}{#f/27}WELL, I'M GLAD I COULD MAKE YOU HAPPY!"
            : [
                 '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO OUR MEAL TOGETHER!',
                 '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO MAKING SOME MORE FOR YOU!'
              ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      spaghetti2: [ "<32>{#p/basic}* If Papyrus wasn't so busy fighting, he might've noticed that." ],
      specialStatus0: [ "<32>{#p/story}* Papyrus的气场越来越强。" ],
      specialStatus1: [ '<32>{#p/story}* 特殊攻击。' ],
      specialStatus2: [ '<32>{#p/story}* Papyrus正全力以赴。' ],
      specialStatus3: [ '<32>{#p/story}* Papyrus将所有逻辑都抛之脑后。' ],
      specialStatus4: [ '<32>{#p/story}* Papyrus发觉自己有些缺乏逻辑，\n  又把它捞回来了。' ],
      specialStatus5: [ '<32>{#p/story}* Papyrus汗流浃背。' ],
      specialStatus6: [ "<32>{#p/story}* Papyrus已经束手无策了。" ],
      status1: [ '<32>{#p/story}* Papyrus正在饶恕你。' ],
      status2: [ '<32>{#p/story}* Papyrus挡住了去路！' ],
      turnTalk0a: [ "<15>{#p/papyrus}{#f/24}看来，\n你要来真的..." ],
      turnTalk0b: [ "<15>{#p/papyrus}{#f/24}看来，\n你不想战斗..." ],
      turnTalk0c: [ "<15>{#p/papyrus}{#f/20}那就让我看看\n你会如何应对\n我传说中的\n‘蓝色攻击！’" ],
      turnTalk0x: [
         "<15>{#p/papyrus}{#f/10}你现在是\n蓝色的了。",
         "<15>{#f/10}那就是\n我的攻击！",
         '<15>{#f/20}捏嘿嘿嘿嘿嘿\n嘿嘿嘿！！！'
      ],
      turnTalk1a: [ '<15>{#p/papyrus}{#f/20}看好了！' ],
      turnTalk1b: [ '<15>{#p/papyrus}{#f/20}嗯...\n我在想我应该\n穿什么...' ],
      turnTalk2a: [ '<15>{#p/papyrus}{#f/20}你能跳多高呢？' ],
      turnTalk2b: [ "<15>{#p/papyrus}{#f/22}什么！？\n我才没有想着\n约会的事情呢！" ],
      turnTalk3: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/21}... 是不是只有\n我觉得\n气氛有点怪？' ]
            : [ "<15>{#p/papyrus}{#f/20}对！\n别逼我用出我的\n{@fill=#f00}特殊攻击{@fill=#000}！" ],
      turnTalk4: () =>
         world.postnoot
            ? [ "<15>{#p/papyrus}{#f/20}算了。\n应该没什么。" ]
            : [ '<15>{#p/papyrus}{#f/20}我都能嗅到\n我未来的\n人气了！！！' ],
      turnTalk5: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/20}我还从\n我的未来里\n看到了番茄酱！' ]
            : [ '<15>{#p/papyrus}{#f/20}PAPYRUS:\n举世无双意面王！' ],
      turnTalk6: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/20}以及在特战队\n的一席之地！' ]
            : [ '<15>{#p/papyrus}{#f/20}PAPYRUS:\n特战队成员！' ],
      turnTalk7: [ '<15>{#p/papyrus}{#f/10}UNDYNE一定会\n为我感到骄傲！！' ],
      turnTalk8: [ '<15>{#p/papyrus}{#f/20}国王会在首塔\n为我建造一座\n雕像！！！' ],
      turnTalk9: [ "<15>{#p/papyrus}{#f/10}... 我也会\n让我兄弟\n拥有一座的。" ],
      turnTalk10: [ "<15>{#p/papyrus}{#f/27}我们将会收获\n众多崇拜者！！\n但是..." ],
      turnTalk11a: [ '<15>{#p/papyrus}{#f/20}我又如何知道\n人们是否真心\n喜欢我呢？？？' ],
      turnTalk11b: [ '<15>{#p/papyrus}{#f/20}会有人像你一样\n喜欢我吗？' ],
      turnTalk12: [ '<15>{#p/papyrus}{#f/21}像你这样的人\n真是很少见...' ],
      turnTalk13a: [ "<15>{#p/papyrus}{#f/21}我不觉得他们\n会轻易放你走..." ],
      turnTalk13b: [ '<15>{#p/papyrus}{#f/21}再想约会\n估计会很难...' ],
      turnTalk14: [ "<15>{#p/papyrus}{#f/26}如果你被抓到，\n然后送走的话。" ],
      turnTalk15: [ '<15>{#p/papyrus}{#f/17}呃...\n管他呢！\n放弃吧！！' ],
      turnTalk16: [ '<15>{#p/papyrus}{#f/15}要么放弃，要么... \n就准备面对我的\n{@fill=#f00}特殊攻击{@fill=#000}！' ],
      turnTalk17: [ '<15>{#p/papyrus}{#f/20}没错！！！\n待会我就要使用\n我的{@fill=#f00}特殊攻击{@fill=#000}了！' ],
      turnTalk18: [
         '<15>{#p/papyrus}{#f/20}在我使用\n{@fill=#f00}特殊攻击{@fill=#000}前... \n这是你的最后机会！'
      ],
      turnTalk19: [ '<15>{#p/papyrus}{#f/20}看好了...！\n我的{@fill=#f00}特殊攻击{@fill=#000}！' ],
      turnTalk19x: [
         '<15>{#p/papyrus}{#f/15}捏嘿嘿！',
         '<15>{#f/20}在这之前可没有人类\n能躲过我的\n{@fill=#f00}特殊攻击{@fill=#000}！',
         '<15>{#f/20}做好被抓住的准备吧！\n一劳永逸的那种！'
      ],
      turnTalk20: [ '<15>{#p/papyrus}{#f/20}特殊攻击，\n阿尔法编阵！' ],
      turnTalk21: [ '<15>{#p/papyrus}{#f/20}特殊攻击，\n贝塔编阵！' ],
      turnTalk22: [ '<15>{#p/papyrus}{#f/20}特殊攻击，\n伽马编阵！' ],
      turnTalk23: [ '<15>{#p/papyrus}{#f/20}特殊攻击，\n德尔塔编阵！' ],
      turnTalk24: [
         '<15>{#p/papyrus}{#f/27}哇塞！\n你也太强了吧！',
         '<15>{#f/20}但我可不怕！\n我不会被你的\n实力吓倒！',
         '<15>{#f/14}... 特殊攻击...',
         '<15>{#f/17}{@fill=#f00}西格玛{@fill=#000}编阵！！！'
      ],
      turnTalk24x: [
         "<15>{#p/papyrus}{#f/27}行吧...！ *喘气*\n很明显... 你不能！\n*喘气* 打败我！",
         '<15>{#f/15}没错！！！\n我看见你被吓得\n全身发抖了！！',
         '<15>{#f/20}我，伟大的PAPYRUS，\n选择给予你\n怜悯！！',
         '<15>{#f/20}我会{@fill=#f00}饶恕你{@fill=#000}，\n人类！！！',
         "<15>{#f/10}现在是你接受\n我{@fill=#f00}仁慈{@fill=#000}的机会了。"
      ],
      idleTalk: [ '<15>{#p/papyrus}{#f/20}...' ],
      idleTalkBullied: [ '<18>{#p/papyrus}{#f/27}...' ],
      secretFlirt1: [ '<15>{#p/papyrus}{#f/27}你盼着能伴我左右...\n直到永远？', '<15>{#p/papyrus}{#f/21}呃...' ],
      secretFlirt2: [
         '<15>{#p/papyrus}{#f/27}有人想拆散我们？',
         '<15>{#p/papyrus}{#f/21}是谁呢...'
      ],
      secretFlirt2x: [
         "<15>{#p/papyrus}{#f/27}SO YOU -DON'T- WISH TO REMAIN WITH ME?",
         "<15>{#p/papyrus}{#f/14}BUT THEN... WHY WON'T YOU ACCEPT MY MERCY AND LEAVE ME?"
      ],
      secretFlirt3: [
         "<15>{#p/papyrus}{#f/25}呃，我们还没到\n【那么】浓情\n蜜意的地步吧...",
         '<15>{#p/papyrus}{#f/15}...但事后\n我们可以继续！'
      ],
      secretFlirt3x: [ "<15>{#p/papyrus}{#f/27}WAIT, ARE -YOU- THE ONE WHO'S TRYING TO TEAR OUR LOVE APART?" ],
      secretFlirt4: [ '<15>{#p/papyrus}{#f/24}等等，你是想说...\n三角恋？？？' ],
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
         '<15>{#p/papyrus}{#f/14}等等... 我明白了！',
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
         '<15>{#p/papyrus}{#f/20}捏嘿嘿嘿嘿嘿\n嘿嘿嘿嘿！！！'
      ],
      secretFlirt8: [
         '<15>{#p/papyrus}{#f/20}FRET NOT, HUMAN!',
         '<15>{#p/papyrus}{#f/14}I, PAPYRUS, WILL MAKE SURE NO HARM COMES TO EITHER OF US!',
         '<15>{#p/papyrus}{#f/20}I WILL SPARE MYSELF FOR YOU!',
         '<15>{#p/papyrus}{#f/20}AND THEN, I WILL FIND A VERY SAFE PLACE TO HIDE.',
         "<15>{#p/papyrus}{#f/15}别担心，人类！\n一切尽在\nPAPYRUS的掌控之中！"
      ],
      secretInsult1: [ '<15>{#p/papyrus}{#f/27}呃... 大可不必？？？' ],
      secretInsult2: [ '<15>{#p/papyrus}{#f/21}蠢货... \n我好像在哪听过...' ],
      secretInsult2x: [
         '<15>{#p/papyrus}{#f/22}OR... NOT?',
         '<15>{#p/papyrus}{#f/24}SO, LET ME GET THIS STRAIGHT.',
         '<15>{#p/papyrus}{#f/27}YOU MEANT TO SAY YOU... LOVE ME???',
         '<15>{#p/papyrus}{#f/27}AND THAT SOMETHING IS TRYING TO TEAR OUR LOVE APART?'
      ],
      secretInsult3: [ '<15>{#p/papyrus}{#f/29}搞什么...' ],
      secretInsult3x: [
         "<15>{#p/papyrus}{#f/27}YOU MEAN I'M AN IDIOT FOR NOT NOTICING HOW MUCH YOU LOVE ME?",
         '<15>{#p/papyrus}{#f/28}AND THAT YOU WANT TO... UH...',
         "<15>{#p/papyrus}{#f/25}I-I MEAN, I DON'T THINK WE'VE GOTTEN -THAT- FAR YET...",
         '<15>{#p/papyrus}{#f/15}...但事后\n我们可以继续！'
      ],
      secretInsult4: [ "<15>{#p/papyrus}{#f/27}你骂我没脑子，\n没懂你啥意思..." ],
      secretInsult4x: [
         "<15>{#p/papyrus}{#f/27}SO... YOU MEANT TO SAY WE'RE IN A LOVE TRIANGLE?",
         "<15>{#p/papyrus}{#f/19}WELL, IT'D CERTAINLY EXPLAIN YOUR ABRASIVE ATTITUDE!"
      ],
      secretInsult5: [
         '<15>{#p/papyrus}{#f/27}啥？\n“志在星辰大海，\n何必自暴自弃”...',
         '<15>{#p/papyrus}{#f/17}你在说啥呢...？'
      ],
      secretInsult5x: [
         '<15>{#p/papyrus}{#f/25}WAIT... YOU WANTED ME TO REALIZE THAT YOU SECRETLY LOVED ME?',
         "<15>{#p/papyrus}{#f/22}AND THAT WE'RE ACTUALLY IN A... LOVE TRAPEZOID!?"
      ],
      secretInsult6: [
         '<15>{#p/papyrus}{#f/14}等等... 我明白了！',
         '<15>{#p/papyrus}{#f/21}蠢货...',
         '<15>{#p/papyrus}{#f/21}星辰大海...',
         '<15>{#p/papyrus}{#f/20}有颗星星，TWINKLY，\n他也喜欢叫人“蠢货”！',
         '<15>{#p/papyrus}{#f/25}我...',
         "<15>{#p/papyrus}{#f/22}我才反应过来\n是怎么回事！",
         '<15>{#p/papyrus}{#f/20}那个“ASRIEL”好像\n也喜欢骂人蠢货！',
         '<15>{#p/papyrus}{#f/24}也就是说...',
         '<15>{#p/papyrus}{#f/22}你刚说的“星辰”\n肯定就是指他！',
         '<15>{#p/papyrus}{#f/19}他肯定干了啥，\n害【我】表现得\n像个蠢货！'
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
         '<15>{#p/papyrus}{#f/14}现在...\n我不会再\n被他骗了！',
         '<15>{#p/papyrus}{#f/20}我，PAPYRUS，\n保证让他再也\n找不到我！',
         "<15>{#p/papyrus}{#f/15}别担心，人类！\n一切尽在\nPAPYRUS的掌控之中！"
      ],
      sparableFlirt1: [
         "<15>{#p/papyrus}{#f/27}你现在\n要做的是饶恕，\n而不是调情！",
         '<15>{#f/14}我必须\n抗住诱惑！'
      ],
      sparableFlirt1x: [
         '<15>{#p/papyrus}{#f/27}啊？\n在这种时候... 调情？',
         "<15>{#f/14}嗯...\n这倒也算是一种\n赎罪方式！"
      ],
      sparableFlirt2: [ '<15>{#p/papyrus}{#f/14}不-不...！' ],
      sparableFlirt2x: [ '<15>{#p/papyrus}{#f/14}啊-啊...！' ],
      sparableFlirt3: [ '<15>{#p/papyrus}{#f/14}...' ],
      sparableInsult1: [
         "<15>{#p/papyrus}{#f/20}嘿，你没必要\n辱骂自己的！",
         '<15>{#f/21}我知道你已经尽力了...'
      ],
      sparableInsult1x: [
         "<15>{#p/papyrus}{#f/20}嘿，你没必要\n辱骂自己的！",
         "<15>{#f/15}人类，你要记住：\n来这里是为了\n做个好人的！"
      ],
      sparableInsult2: [ '<15>{#p/papyrus}{#f/21}人类...' ],
      sparableInsult2x: [ '<15>{#p/papyrus}{#f/15}你可以的...！' ],
      sparableInsult3: [ '<15>{#p/papyrus}{#f/21}...' ]
   },
   b_opponent_shockasgore: {
      act_check: [ '<32>{#p/asriel2}* Asgore。\n* 亲手葬送自己家园的昏君。' ],
      act_hug: [ '<32>{#p/human}* （你想抱抱Asgore...）' ],
      hugText: [ '<32>{#p/human}* （...但你的身体直接穿了过去。）', '<32>{#p/asriel2}* ...啊？' ],
      foodText: [ '<11>{#p/asgore}{#f/5}那是...' ],
      idleText1: [ '<11>{#p/asgore}{#f/1}开玩笑吧...' ],
      idleText2: [ '<11>{#p/asgore}{#f/1}一定要\n诉诸暴力吗？' ],
      idleText3: [ '<11>{#p/asgore}{#f/1}为什么不能\n和平解决呢？' ],
      idleText4: [ '<11>{#p/asgore}{#f/1}真的有必要吗？' ],
      stickText: [
         '<32>{#p/human}* （你朝Asgore扔出扳手。）\n* （扳手直接穿过了他的身体。）',
         '<32>{#p/asriel2}* ...啊？'
      ],
      miss: [
         '<11>{#p/asgore}{#f/2}...',
         '<11>{#f/1}我本人不在这，\nAsriel。',
         "<11>{#f/2}这不过\n是个投影。"
      ],
      name: '* Asgore',
      status1: [ '<32>{#p/asriel2}* 现在杀了他，$(name)。' ],
      status2: [ '<32>{#p/asriel2}* ...' ]
   },

   i_berry: {
      battle: {
         description: '一小串半透明的浆果',
         name: '洋梅'
      },
      drop: [ '<32>{#p/human}* （你把洋梅扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （7 HP。）' ]
            : [ '<32>{#p/basic}* “洋梅” 回复7 HP\n* 一小串半透明的浆果。' ],
      name: '洋梅',
      use: [ '<32>{#p/human}* （你吃掉了洋梅。）' ]
   },
   i_blookpie: {
      battle: {
         description: '将新鲜洋梅浸润在果冻中制作而成。',
         name: '洋梅派'
      },
      drop: () => [
         '<32>{#p/human}* （你把洋梅果冻派扔掉了。）',
         ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

            ? game.room === '_frontier4' // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ......... 嗯？' ]
               : [ '<32>{#p/napstablook}* 哦..................' ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （99 HP。）' ]
            : [ '<32>{#p/basic}* “Exoberry Pie” 回复99 HP\n* 将新鲜洋梅浸润在果冻中制作而成。' ],
      name: '洋梅果冻派',
      use: () => [
         '<32>{#p/human}* （你吃掉了洋梅果冻派。）',
         ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

            ? game.room === '_frontier4' // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ......... 嗯？' ]
               : [ '<32>{#p/napstablook}* 哦.........\n* 希望你爱吃.........' ]
            : [])
      ]
   },
   i_chip: {
      battle: {
         description: '请把它带到星系的尽头。',
         name: '“芯”型薯片'
      },
      drop: () => [
         '<32>{#p/human}* （你把“芯”型薯片扔掉了。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [ "<25>{#p/asriel1}{#f/15}* Uh... weren't you going to protect that?" ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （45 HP。）\n* （比起吃掉它，你更想保护好它。）' ]
            : [ '<32>{#p/basic}* “‘芯’型薯片” 回复45 HP\n* 请将其带往星系的边疆。' ],
      name: '“芯”型薯片',
      use: () => [
         '<32>{#p/human}* （你咬了一口“芯”型薯片。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [ "<25>{#p/asriel1}{#f/15}* Uh... weren't you going to protect that?" ]
            : world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : calcHP() - SAVE.data.n.hp > 45
            ? [ '<32>{#p/basic}* 你的HP值获得了一个增量。' ]
            : [ '<32>{#p/basic}* 你的伤口被覆盖掉了。' ])
      ]
   },
   i_eye: {
      battle: {
         description: '可随身携带的力场发射器。',
         name: '力场护盾'
      },
      drop: [ '<32>{#p/human}* （你把力场护盾扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （7防御。）' ]
            : [ '<32>{#p/basic}* “力场护盾” （7防御）\n* 可随身携带的力场发射器。' ],
      name: '力场护盾',
      use: [ '<32>{#p/human}* （你启动了力场护盾。）' ]
   },
   i_eye_x: {
      battle: {
         description: '可随身携带的力场发射器，\n但能量不足。',
         name: '力场护盾？'
      },
      drop: [ '<32>{#p/human}* （你把力场护盾扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （5防御。）' ]
            : [ '<32>{#p/basic}* “力场护盾” （5防御）\n* 可随身携带的力场发射器，\n  但能量不足。' ],
      name: '力场护盾？',
      use: [ '<32>{#p/human}* （你启动了力场护盾。）' ]
   },
   i_fruit: {
      battle: {
         description: '非欧几何形状的水果，\n里头比外边还大。',
         name: '幽灵水果'
      },
      drop: [ '<32>{#p/human}* (You fold the Ghost Fruit in on itself.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [ '<32>{#p/basic}* “幽灵水果” 回复15 HP\n* 非欧几何形状的水果，\n  里头比外边还大。' ],
      name: '幽灵水果',
      use: [ "<32>{#p/human}* (You unpacked the Ghost Fruit's many dimensions.)" ]
   },
   i_glove: {
      battle: {
         description: "源自尖端科技，揍人超级有力的\n仿生手套。",
         name: '超能手套'
      },
      drop: [ '<32>{#p/human}* （你把超能手套扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （5攻击。）' ]
            : [ '<32>{#p/basic}* “超能手套” （5攻击）\n* 源自尖端科技，揍人超级有力的\n  仿生手套。' ],
      name: '超能手套',
      use: [ '<32>{#p/human}* （你戴上了超能手套。）' ]
   },
   i_glove_x: {
      battle: {
         description: "虽然是仿制手套，\n但不妨碍你用它痛扁敌人。",
         name: '超能手套？'
      },
      drop: [ '<32>{#p/human}* （你把超能手套扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （3攻击。）' ]
            : [ '<32>{#p/basic}* “超能手套？” （3攻击）\n* 虽然是仿制手套，\n  但不妨碍你用它痛扁敌人。' ],
      name: '超能手套？',
      use: [ '<32>{#p/human}* （你戴上了超能手套。）' ]
   },
   i_milkshake: {
      battle: {
         description: '由白如珍珠的不明物质制成。',
         name: '奶昔'
      },
      drop: [ '<32>{#p/human}* (You rid yourself of the Milkshake.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （18 HP。）' ]
            : [ '<32>{#p/basic}* “奶昔” 回复18 HP\n* 由白如珍珠的不明物质制成。' ],
      name: '奶昔',
      use: () => [
         '<32>{#p/human}* (You swallowed every last drop of the Milkshake.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : [ '<32>{#p/basic}* ... salty.' ])
      ]
   },
   i_nice_cream: {
      battle: {
         description: '包装纸上印的不是笑话，\n而是一些天马行空的想象。',
         name: '冰意灵'
      },
      drop: [ '<32>{#p/human}* （你把冰意灵扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [ '<32>{#p/basic}* “冰意灵” 回复15 HP\n* 包装纸上印的不是笑话，\n  而是一些天马行空的想象。' ],
      name: '冰意灵',
      use: pager.create(
         2,
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? '<32>* （包装上写着拯救世界的冒险。）'
               : '<32>{#p/basic}* “你是一个伟大的冒险家，\n  肩负着拯救世界的使命！”'
         ],
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? '<32>* （包装上把你描述成\n  一个星际飞船的船长。）'
               : '<32>{#p/basic}* “你是一艘星际飞船的船长，\n  正驶向未知的太空！”'
         ],
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? '<32>* （包装上写着只有你一个人\n  能解开一个谜团。）'
               : '<32>{#p/basic}* “一个巨大的谜团正在揭开，\n  而你是唯一能解开它的人！”'
         ],
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? '<32>* （包装上写着你穿越时空后\n  做出的努力。）'
               : '<32>{#p/basic}* “你穿越回过去，\n  阻止了一场可怕的灾难！”'
         ],
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? '<32>* （包装上写着你的科学才华。）'
               : '<32>{#p/basic}* “你是一位杰出的科学家，\n  即将取得重大突破！”'
         ],
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? "<32>* （包装上建立了一个\n  你发现的无辜的世界。）"
               : '<32>{#p/basic}* “你偶然发现了一个充满无辜的\n  生物的世界，接下来会发生什么\n  就取决于你了！”'
         ],
         () => [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            SAVE.data.b.svr
               ? '<32>* （包装上详细介绍了\n  你的新能力。）'
               : '<32>{#p/basic}* “你已经获得了随心所欲\n  改变宇宙的力量！\n  明智地使用它吧！”'
         ],
         [
            '<32>{#p/human}* （你撕开了冰意灵的包装。）',
            "<32>{#p/human}* （上面是你找到了一个\n  充满爱的家庭的全息图像。）"
         ]
      )
   },
   i_pop: {
      battle: {
         description: '可改变主观时间流速。',
         name: '涡旋棒棒糖'
      },
      drop: [ '<32>{#p/human}* （你把涡旋棒棒糖扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （11 HP。）' ]
            : [
                 '<33>{#p/basic}* “涡旋棒棒糖” 回复11 HP\n* 可改变主观时间流速。\n* 仅在战斗中有效。'
              ],
      name: '涡旋棒棒糖',
      use: () => [
         '<32>{#p/human}* （你把涡旋棒棒糖舔没了。）',
         ...(battler.active
            ? game.vortex
               ? [ '<32>{#p/human}* （主观时间流速之前已改变。）' ]
               : [
                    '<32>{#p/human}* （你的主观时间流速开始改变。）',
                    '<32>{#p/story}* 两回合内，你的专注力提升！'
                 ]
            : [ '<32>{#p/human}* （战斗外使用无效。）' ])
      ]
   },
   i_spaghetti: {
      battle: {
         description: 'Silken spaghetti, finely aged in a time dilation unit.',
         name: '意大利面'
      },
      drop: () => [
         '<32>{#p/human}* （你把意大利面扔掉了。）',
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
                    '<18>{#p/papyrus}{#f/8}别啊！！\n你怎么能这么对它！？！？',
                    '<18>{#f/5}...那是我亲自下厨\n为你做的意面啊...',
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
                    '<18>{#p/papyrus}{#f/8}别啊！！\n你怎么能这么对它！？！？',
                    '<18>{#f/5}...那是我亲自下厨\n为你做的意面啊...',
                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                       ? [
                            '<25>{#p/undyne}{#f/4}* Is perfectly fine!',
                            '<25>{#p/undyne}{#f/7}* Human!\n* Pick the spaghetti up off the floor NOW!',
                            "<18>{#p/papyrus}{#f/6}UNDYNE, PLEASE!!\nTHAT'S ENTIRELY UNSANITARY!!"
                         ]
                       : [ '<18>{#f/6}...吃不了了啦！！' ]),
                    "<18>{#f/4}不过... 这样也好。",
                    '<18>{#f/5}你丢掉了那份意面...',
                    '<18>{#f/6}那我就做一份【更赞的】！',
                    '<18>{#f/9}没错！\n你看我，充满了斗志！',
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
            ? [ '<32>{#p/human}* （16 HP。）' ]
            : [ '<32>{#p/basic}* \"Spaghetti\" Heals 16 HP\n* Silken spaghetti, finely aged in a time dilation unit.' ],
      name: '意大利面',
      use: () => [
         '<32>{#p/human}* （你吃光了意大利面。）',
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
         description: '一个五彩斑斓的发光瑞士卷。',
         name: '光彩漩涡'
      },
      drop: [ '<32>{#p/human}* （你把光彩漩涡扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （22 HP。）' ]
            : [ '<32>{#p/basic}* “光彩漩涡” 回复22 HP\n* 一个五彩斑斓的发光瑞士卷。' ],
      name: '光彩漩涡',
      use: [ '<32>{#p/human}* （你吃掉了光彩漩涡。）' ]
   },
   i_voidy: {
      battle: {
         description: '可传送到某个隐藏房间，\n战斗中使用无效。',
         name: '圣所'
      },
      drop: [ '<32>{#p/human}* （你将圣所弃如敝屣。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （一件存在之外的物品。）' ]
            : [ '<32>{#p/basic}* 可传送到某个隐藏房间，\n  战斗外可用。' ],
      name: '圣所',
      use: () =>
         battler.active
            ? [ '<32>{#p/human}* （你使用了圣所。）', '<32>{#p/human}* （战斗中使用无效。）' ]
            : [ '<32>{#p/human}* （你使用了圣所。）' ]
   },
   i_corndog_sword: {
      battle: {
         description: '绝对是独一无二的武器。',
         name: '玉狗圣剑'
      },
      drop: [ '<32>{#p/human}* （你想扔掉玉狗圣剑...）', '<32>{#p/human}* （...但是它拒绝了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （你觉得还是不要思考\n  这玩意怎么工作的比较好。）' ]
            : [ '<32>{#p/basic}* 绝对是独一无二的武器。' ],
      name: '玉狗圣剑',
      use: () =>
         battler.active && battler.alive[0].opponent.metadata.corndogger
            ? [
                 '<32>{#p/human}* （你装备上玉狗圣剑。）',
                 "<32>{#p/human}* （它太诱人了，你禁不住想咬一口。）",
                 [
                    '<32>{#p/human}* （你吃掉了外层的面衣...）',
                    '<32>{#p/human}* （你吃掉了剑尖...）',
                    '<32>{#p/human}* （你吃掉了剑身...）',
                    '<32>{#p/human}* （你吃掉了剑柄...）',
                    '<32>{#p/human}* （你吃掉了最后的握柄...）'
                 ][SAVE.data.n.corndogger++],
                 '<32>{#p/basic}* 突然间..！'
              ]
            : [
                 '<32>{#p/human}* （你试图装备上玉狗圣剑...）',
                 "<32>{#p/human}* （...但是，它没有嗅到\n  足够大的威胁！）"
              ]
   },
   i_fryz: {
      battle: {
         description: 'For once, it\'s not just \"pleasantly warm.\"',
         name: 'Grillby'
      },
      drop: [ "<32>{#p/human}* （你把烈焰Grillby像燃烧瓶一样丢了出去。）" ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （30 HP。）' ]
            : [ '<32>{#p/basic}* \"Flamin\' Grillby\" Heals 30 HP\n* For once, it\'s not just \"pleasantly warm.\"' ],
      name: "烈焰Grillby",
      use: [ "<32>{#p/human}* （你吃掉了烈焰Grillby。）" ]
   },
   i_burgerz: {
      battle: {
         description: '很像普通汉堡，只是小了一些。\n共有三个。',
         name: '三只小汉堡'
      },
      drop: [ '<32>{#p/human}* （你把小汉堡全扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。共有三个。）' ]
            : [ '<32>{#p/basic}* “小汉堡” 回复15 HP\n* 很像普通汉堡，只是小了一些。\n* 共有三个。' ],
      name: '三只小汉堡',
      use: [ '<32>{#p/human}* （你吃掉了一个小汉堡。）' ]
   },
   i_burgerz_use1: {
      battle: {
         description: '很像普通汉堡，只是小一些。\n还剩两个。',
         name: '两只小汉堡'
      },
      drop: [ '<32>{#p/human}* （你把小汉堡全扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。还剩两个。）' ]
            : [ '<32>{#p/basic}* “小汉堡” 回复15 HP\n* 很像普通汉堡，只是小了一些。\n* 还剩两个。' ],
      name: '两只小汉堡',
      use: [ '<32>{#p/human}* （你吃掉了一个小汉堡。）' ]
   },
   i_burgerz_use2: {
      battle: {
         description: '很像普通汉堡，只是小了一些。',
         name: '小汉堡'
      },
      drop: [ '<32>{#p/human}* （你把小汉堡全扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。最后一个。）' ]
            : [ '<32>{#p/basic}* “小汉堡” 回复15 HP\n* 很像普通汉堡，只是小了一些。\n* 最后一个。' ],
      name: '小汉堡',
      use: [ '<32>{#p/human}* （你吃掉了一个小汉堡。）' ]
   },

   k_premium: {
      name: '高级会员券',
      description: () =>
         SAVE.data.b.f_state_voucher
            ? '与你根本不存在的付费望远镜订阅\n配套使用。'
            : '在使用过星港的望远镜之后，\n怪物小孩给你的东西。'
   },

   k_inverter: {
      name: '重力转换器遥控器',
      description: () =>
         SAVE.data.b.s_state_inverter
            ? '用它激活了与之匹配的\n重力转换器。'
            : "从SANS房间里没有密封的信封中\n找到的。"
   },

   k_security: {
      name: '生锈的钥匙',
      description: () =>
         SAVE.data.n.state_aerialis_lockup > 0
            ? '用它解锁了休闲回廊的\n军火库。'
            : '在星港小镇北侧的\n“警察岗”找到的。'
   },

   n_shop_blook: {
      exit: [ "<32>{#p/napstablook}{#k/0}* 哦... 你要走了...", '<32>{#k/1}* 好吧，下次再见，也许吧...' ],
      item: () =>
         blookGone()
            ? [
                 '§fill=#808080§---- 售罄 ----',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§---- 售罄 ----' : '0G - 洋梅果冻派',
                 '0G - 幽灵水果',
                 '0G - 奶昔',
                 '离开'
              ]
            : SAVE.data.n.plot === 72
            ? [
                 SAVE.data.b.item_voidy ? '§fill=#808080§---- 售罄 ----' : '432G - 圣所',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§---- 售罄 ----' : '80G - 洋梅果冻派',
                 '5G - 幽灵水果',
                 '5G - 奶昔',
                 '离开'
              ]
            : [
                 SAVE.data.b.item_voidy ? '§fill=#808080§---- 售罄 ----' : '432G - 圣所',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§---- 售罄 ----' : '100G - 洋梅果冻派',
                 '12G - 幽灵水果',
                 '16G - 奶昔',
                 '离开'
              ],
      itemInfo: [
         '特殊物品：\n传送到\n某个\n隐藏房间。',
         '回复99 HP\n在黑暗中\n发出\n幽幽荧光。',
         "回复15 HP\n非欧几何的\n产物。",
         '回复18 HP\n也许含有\n灵质。'
      ],
      itemPrompt: '<09>{#p/napstablook}{#k/3}看上\n什么了吗？',
      itemPurchase: [
         '<09>{#p/napstablook}{#k/3}嘿... 谢谢你...',
         "<09>{#p/napstablook}{#k/0}不买也没\n关系的...",
         '<09>{#p/napstablook}{#k/0}对不起...\n钱不够...',
         "<10>{#p/human}（你带的\n东西\n太多了。）"
      ],
      itemPurchasePrompt: () => (blookGone() ? '偷走吗？' : '花$(x)G\n买它吗？'),
      itemUnavailable: () =>
         blookGone() ? '<09>{#p/basic}空无一物。' : "<09>{#p/napstablook}{#k/0}哦... 这个\n卖光了...",
      menu: () =>
         blookGone() ? [ '拿取', '偷窃', '阅读', '离开' ] : [ '购买', world.meanie ? '偷窃' : '出售', '交谈', '离开' ],
      menuPrompt1: () =>
         [
            '<23>{#p/napstablook}{#k/3}* 来随便看看吧...',
            "<23>{#p/napstablook}{#k/3}* 希望这里有你想要的东西...",
            "<23>{#p/napstablook}{#k/3}* 来随便看看吧...\n  不想也行...\n  一切由你...",
            '<23>{#p/napstablook}{#k/3}* 来随便看看...\n* 也许吧...',
            "<23>{#p/napstablook}{#k/3}* 来随便看看吧...\n  不想也行...\n  一切由你..."
         ][Math.min(SAVE.data.n.state_wastelands_napstablook, 4)],
      menuPrompt2: '<23>{#p/napstablook}{#k/0}* 你可以随时离开这里... ',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是谁也没有来。',
      note: () =>
         [ 'f_blooky', 'f_napstablook' ].includes(SAVE.data.s.state_foundry_deathroom) // NO-TRANSLATE

            ? [ "<32>{#p/basic}* 没有人给你留字条。" ]
            : SAVE.data.b.killed_mettaton
            ? [ "<32>{#p/basic}* 这里有一张字条。", '<32>{#p/napstablook}* “都是你的错...”' ]
            : world.runaway
            ? [ "<32>{#p/basic}* 这里有一张字条。", '<32>{#p/napstablook}* “我们别无选择...”' ]
            : [ "<32>{#p/basic}* 这里有一张字条。", '<32>{#p/napstablook}* “对不起，我得走了...”' ],
      sell1: () =>
         blookGone()
            ? [ '<30>{#p/human}* （你从柜台后面拿走了42G。）' ]
            : world.meanie
            ? [
                 "<30>{#p/napstablook}{#k/2}* 哦... \n  你想偷我的东西...",
                 '<30>{#p/napstablook}{#k/5}* 你肯定很需要钱...',
                 SAVE.data.b.item_voidy
                    ? "<30>{#k/0}* 对不起...\n  我唯一的收入还是你刚给的钱..."
                    : "<30>{#k/0}* 对不起...\n  我很穷，没钱给你..."
              ]
            : [
                 '<30>{#p/napstablook}{#k/2}* 哦... 你是想卖掉一些东西吗',
                 "<30>{#k/0}* 我不清楚我能不能买下\n  所有东西...\n  抱歉..."
              ],
      sell2: () =>
         blookGone()
            ? [ '<30>{#p/basic}* 空无一物。' ]
            : world.meanie
            ? [
                 "<30>{#p/napstablook}{#k/5}* 嗯...\n* 我没法给你值钱的东西...",
                 "<30>{#p/napstablook}{#k/0}* 我理解... \n  这会让你很难过"
              ]
            : [
                 '<30>{#p/napstablook}{#k/5}* 嗯... 想卖东西的话... \n  可以问问我的表亲...',
                 '<30>{#k/0}* 它应该和undyne住在一块'
              ],
      talk: (name: string) =>
         SAVE.data.n.plot === 72
            ? [ '打招呼', '发生什么了', name, '未来打算', '离开' ]
            : [
                 '打招呼',
                 '幽灵',
                 '圣所',
                 65 <= SAVE.data.n.plot
                    ? SAVE.data.b.a_state_hapstablook && 68 <= SAVE.data.n.plot
                       ? '你的家人'
                       : '你的生活'
                    : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                    ? 'Mettaton'
                    : 60 <= SAVE.data.n.plot
                    ? '喵喵玩偶'
                    : 48 <= SAVE.data.n.plot
                    ? '旅途'
                    : SAVE.data.b.napsta_performance
                    ? 'DJ小幽灵？'
                    : SAVE.data.n.state_wastelands_napstablook === 0
                    ? 'Dapper Blook？'
                    : '你的生活',
                 '离开'
              ],
      talkPrompt: '<09>{#p/napstablook}{#k/1}哦，\n想和我\n聊天吗？',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/napstablook}{#k/3}* 哦，你好啊...',
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
                       '<32>{#p/napstablook}{#k/3}* 哦，你好啊...',
                       '<32>{#p/napstablook}{#k/3}* 哦，很高兴又见到你...'
                    ][SAVE.data.n.state_wastelands_napstablook],
                    ...(world.meanie
                       ? [ "<32>{#k/0}* 为什么露出那副表情？\n* 我做错什么了吗..." ]
                       : [ '<32>{#k/4}* 最近在忙些什么呀？' ])
                 ]
               : SAVE.data.n.state_wastelands_napstablook < 5
               ? [
                    "<32>{#p/napstablook}{#k/0}* 哦...\n* 说些什么好呢，不太确定啊...",
                    '<32>{#k/3}* 呃，也许... 你好?'
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
                    '<32>{#p/napstablook}{#k/2}* 你想了解幽灵吗？',
                    '<32>{#k/0}* 嗯，除了我自己\n  我只认识三个幽灵...\n  都是我的表亲...',
                    '<32>{#k/3}* 当然，还有你身体里那一个',
                    "<32>{#k/1}* 除此之外，没什么可以说了",
                    '<32>{#k/0}* 如果不与容器融合，\n  我们就只能... 这样存在',
                    '<32>{#k/0}* 嗯，我懂...\n* 这特质确实很有趣...'
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
                    '<32>{#p/napstablook}{#k/3}* 哦... 你说那个啊...',
                    '<32>{#k/1}* 有一天，我在地上\n  发现了一个小盒子...',
                    "<32>{#k/5}* 当我打开它的时候，\n  就到了一个我从未见过的\n  神秘地方...",
                    '<32>{#k/4}* 现在，我偶尔会去\n  那个地方放松自己',
                    "<32>{#k/3}* 那里很安宁..."
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
                    '<32>{#p/napstablook}{#k/1}* 嗯，我有时会创作音乐',
                    "<32>{#k/0}* 人们觉得我的音乐很棒，\n  但我明白这只是他们\n  为了激励我说的谎\n  罢了...",
                    '<32>{#k/4}* 不过，感谢你来我的小演出捧场...',
                    '<32>{#k/3}* 见到你，我很高兴...'
                 ]
               : [
                    [
                       '<32>{#p/napstablook}{#k/2}* 你指的是...\n  之前我给你表演的帽子魔术吗...？',
                       '<32>{#k/1}* 嗯，那个是我一个表亲\n  教我的...',
                       '<32>{#k/3}* 以前，我和他常常在一块\n  做各种事...',
                       '<32>{#k/0}* 后来有一天，他...',
                       '<32>{#k/6}* ...',
                       '<32>{#k/0}* 没事...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 哦，我的生活蛮平淡的，\n  拿不出什么好聊的事...",
                       '<32>{#k/3}* 碰上你这事，\n  都算这周末比较出彩的了...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 哦，我的生活蛮平淡的，\n  拿不出什么好聊的事...",
                       '<32>{#k/6}* 而且有你在这，\n  我的生活估计也不会有啥起色了...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 哦，我的生活蛮平淡的，\n  拿不出什么好聊的事...",
                       "<32>{#k/3}* i'm just... pluggin' along..."
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 哦，我的生活蛮平淡的，\n  拿不出什么好聊的事...",
                       '<32>{#k/6}* not that you... really care...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 哦，我的生活蛮平淡的，\n  拿不出什么好聊的事...",
                       "<32>{#k/0}* i'm just a ghost that tends to get lost in the mix"
                    ]
                 ][SAVE.data.n.state_wastelands_napstablook]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },
   n_shop_hare: {
      exit: [ '<32>{#p/basic}{#k/11}* 再见！\n* 有空常来啊！' ],
      item: () =>
         world.population === 0 || world.runaway
            ? [
                 '0G - 超能手套？',
                 SAVE.data.b.item_eye ? '0G - 力场护盾？' : '0G - 力场护盾',
                 '0G - 涡旋棒棒糖',
                 '0G - 光彩漩涡',
                 '离开'
              ]
            : SAVE.data.n.plot === 72
            ? [
                 '10G - 超能手套？',
                 SAVE.data.b.item_eye ? '10G - 力场护盾？' : '20G - 力场护盾',
                 '8G - 涡旋棒棒糖',
                 '5G - 光彩漩涡',
                 '离开'
              ]
            : [
                 '30G - 超能手套？',
                 SAVE.data.b.item_eye ? '30G - 力场护盾？' : '40G - 力场护盾',
                 '28G - 涡旋棒棒糖',
                 '20G - 光彩漩涡',
                 '离开'
              ],
      itemInfo: () => [
         "武器：3攻击\n(当前攻击$(x))\n重拳出击，\n仿制品。",
         SAVE.data.b.item_eye
            ? '防具：5防御\n(当前防御$(x))\n有力防御，\n仿制品。'
            : '防具：7防御\n(当前防御$(x))\n有力防御。',
         '回复11 HP\n可改变\n主观时间\n流速。',
         "回复22 HP\n她的\n独家配方。"
      ],
      itemPrompt: '<09>{#p/basic}{#k/0}想买点\n什么？',
      itemPurchase: [
         '<09>{#p/basic}{#k/4}谢谢惠顾。',
         '<09>{#p/basic}{#k/7}只是\n看看？',
         "<09>{#p/basic}{#k/5}这点钱不够。",
         "<10>{#p/human}（你带的\n东西\n太多了。）"
      ],
      itemPurchasePrompt: () => (world.population === 0 || world.runaway ? '偷走吗？' : '花$(x)G\n买它吗？'),
      menu: () =>
         world.population === 0 || world.runaway
            ? [ '拿取', '偷窃', '阅读', '离开' ]
            : [ '购买', world.meanie ? '偷窃' : '出售', '交谈', '离开' ],
      menuPrompt1: '<23>{#p/basic}{#k/0}* 你好啊，旅行者。\n* 想来点什么吗？',
      menuPrompt2: '<23>{#p/basic}{#k/0}* 慢慢挑。',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是谁也没有来。',
      note: () =>
         world.runaway
            ? [ "<32>{#p/basic}* 这里有一张字条。", '<32>{#p/basic}* “请你别跟过来。”' ]
            : SAVE.data.n.plot === 72
            ? [ "<32>{#p/basic}* 这里有一张字条。", '<33>{#p/basic}* “对不起，我不敢回去。”' ]
            : [ "<32>{#p/basic}* 这里有一张字条。", '<33>{#p/basic}* “请不要伤害我的家人。”' ],
      sell1: () =>
         world.population === 0 || world.runaway
            ? [ '<30>{#p/human}* （你从柜台后面拿走了758G。）' ]
            : world.meanie
            ? [
                 "<30>{#p/basic}{#k/1}* Huh?\n* Is this what we're resortin' to now?",
                 "<30>{#k/2}* If you want somethin', you'll have to buy it first.",
                 '<30>{#k/12}* No exceptions.'
              ]
            : [
                 "<30>{#p/basic}{#k/6}* 哈？\n* 你想卖东西？\n* 这里看起来像当铺吗？",
                 "<30>{#k/3}* 我不知道在你家乡是\n  什么样子的... 但是...",
                 "<30>* 如果我开始花钱买\n  旧扳手和穿过的太空服，\n  我生意就做不下去了！"
              ],
      sell2: () =>
         world.population === 0 || world.runaway
            ? [ '<30>{#p/basic}* 空无一物。' ]
            : world.meanie
            ? [ "<30>{#p/basic}{#k/8}* I don't know what your game is, but it's not going to work on me." ]
            : [
                 "<30>{#p/basic}{#k/8}* If you're really hurtin' for cash, then maybe you could do some crowdfunding.",
                 '<30>{#k/2}* I hear people will pay for ANYTHING nowadays.'
              ],
      talk: () =>
         SAVE.data.n.plot === 72
            ? [ '打招呼', '发生什么了', '外域', '未来打算', '离开' ]
            : [ '打招呼', '这里可以干什么', '小镇的历史', '你的生活', '离开' ],
      talkPrompt: '<09>{#p/basic}{#k/0}想聊聊\n天吗？',
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
                    "<32>{#p/basic}{#k/4}* 你好呀！欢迎来到星港！\n* 我都记不得上次看到新面孔\n  是什么时候的事情了。",
                    '<32>{#k/8}* 你是从哪里来的？\n* 首塔吗？',
                    "<32>{#k/7}* 你看起来不像是游客。\n* 你是自己来的吗？"
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
                    '<32>{#p/basic}{#k/8}* 你想知道在星港可以\n  干什么？',
                    "<32>{#k/9}* 你可以去Grillby's用餐，\n  可以去图书倌获取信息...",
                    "<32>{#k/2}* 如果你累了，\n  你可以去旅馆打个盹。\n* 就在隔壁，我姐妹开的。",
                    "<32>{#k/0}* 你要是觉得无聊了，\n  可以坐在外面，\n  看那两个古怪的骷髅\n  做他们的事情。",
                    "<32>* 他们两个...\n* 我觉得，应该是兄弟。\n* 从我记事的时候，\n  他们就在这里了。",
                    '<32>{#k/9}* 哦，我差点忘了。\n* 最近，有个小鬼儿决定\n  在小镇的南边开一家商店。',
                    "<32>{#k/11}* 虽然事情不算大，\n  但如果你路过，\n  一定要打声招呼。\n* 那家伙很需要陪伴的。"
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
                    '<32>{#p/basic}{#k/9}* 回想一下你的历史课...',
                    '<32>{#k/0}* 很久以前，怪物们住在\n  我们现在称之为铸厂的地方。',
                    '<32>* 过了一段时间，\n  我们发明了在前哨站\n  建造新区域的技术。',
                    "<32>* 首先建造出来的就是星港，\n  他们认为这是一个建小镇的\n  好地方。",
                    "<32>{#k/10}* 听起来很古怪，\n  但我还挺喜欢的，\n  你懂吗？"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#k/5}* Well, I suppose I'll move my store to the new homeworld...",
                    "<32>{#k/4}* ... haven't planned much more than that, I'm afraid."
                 ]
               : [
                    '<32>{#p/basic}* 生活总是一成不变。',
                    '<32>{#k/5}* 虽然有点孤单...',
                    "<32>{#k/10}* 但是... 在我们内心深处\n  都知道自由即将到来，\n  不是吗？",
                    '<32>{#k/9}* 只要我们心存希望，\n  我们就能咬紧牙关，\n  日复一日地面对\n  同样的困难...',
                    "<32>{#k/0}* 这就是生活啊，不是吗？"
                 ]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },

   c_name_starton: {
      papyrus: () =>
         SAVE.data.n.plot_date < 2 || (SAVE.data.n.exp > 0 && SAVE.data.b.a_state_fishbetray)
            ? "给Papyrus打电话"
            : 'Papyrus和Undyne'
   },

   c_call_papyrus: <Partial<CosmosKeyed<CosmosProvider<string[]>>>>{
      s_start: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}啊，在星港边缘的\n那条孤独的路。',
            '<18>{#p/papyrus}{#f/5}它可能看起来有点大，\n有点空，但是...',
            '<18>{#p/papyrus}{#f/0}我对它有许多\n美好的回忆！',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}就比如，在我还是\n骷髅宝宝的时候...',
                    '<18>{#p/papyrus}{#f/0}SANS和我在这条路上\n并排开悬浮车，比谁\n开得快。'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* 比如呢？',
                    '<18>{#p/papyrus}{#f/0}比如我和SANS\n之前开悬浮车比赛！',
                    "<18>{#p/papyrus}{#f/5}我们在路上飞驰，\n并肩赛车..."
                 ]),
            '<18>{#p/papyrus}{#f/4}可惜，不管我\n多努力尝试...',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/7}他总是会在\n终点线等我！',
                    '<18>{#p/papyrus}{#f/5}你可以想象\n我有多沮丧。'
                 ]
               : [
                    '<25>{#p/undyne}{#f/17}* 他总能在最后赢了你？',
                    "<25>{#p/undyne}{#f/4}* 是啊，那是因为\n  他是个作弊惯犯。",
                    '<25>{#p/undyne}{#f/5}* 你有看到过他在\n  打靶机上的高分吗？',
                    "<25>{#p/undyne}{#f/8}* 那简直，是个天文数字\n  什么的！！",
                    '<18>{#p/papyrus}{#f/4}哦，相信我。\n这事我可太清楚了。',
                    "<18>{#p/papyrus}{#f/7}我真希望他\n不要在那样的\n事情上作弊！",
                    '<18>{#p/papyrus}{#f/7}这把其他人的\n游戏体验全都\n毁掉了。',
                    '<25>{#p/undyne}{#f/1}* 或者说...',
                    '<25>{#p/undyne}{#f/8}* 它可能只是提供了一个\n  更有趣的挑战！！',
                    '<18>{#p/papyrus}{#f/4}...不。'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/5}SANS他...\n总是喜欢走捷径。',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/4}我怀疑他获胜\n跟这个有很大关系。' ]
               : [ "<18>{#p/papyrus}{#f/4}这几乎可以\n说是自然法则了。" ])
         ]
      ),
      s_sans: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}然后这个，\n是SANS的哨站。",
            '<18>{#p/papyrus}{#f/5}...',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}我前几天听到他说...',
                    '<18>{#p/papyrus}{#f/6}...要帮哪个人去\n避开其他守卫。',
                    "<18>{#p/papyrus}{#f/5}我虽然不太能确定，\n但我感觉...",
                    "<18>{#p/papyrus}{#f/5}我兄弟...\n该不会是什么\n特务吧？",
                    '<18>{#p/papyrus}{#f/4}...',
                    '<18>{#p/papyrus}{#f/4}...或者应该叫\n叛贼？'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/5}...我还有什么\n可说的吗？',
                    "<25>{#p/undyne}{#f/17}* Papyrus，你有没有...\n  呃... 往上看过？",
                    '<18>{#p/papyrus}{#f/6}什么！？',
                    "<18>{#p/papyrus}{#f/7}你知道我没时间\n那样子的！",
                    "<25>{#p/undyne}{#f/1}* 但你根本没想抓任何人。",
                    '<18>{#p/papyrus}{#f/6}我-我当然想！\n只是... 不是你想的\n那样！！'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}“特务”和“叛贼”...',
                    '<18>{#p/papyrus}{#f/1}...难不成我兄弟\n其实是只乌贼！？'
                 ]
               : [ "<18>{#p/papyrus}{#f/4}这哨站是...\n方形的。" ]
      ),
      s_crossroads: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}最近，大家一直\n在外面留便条。',
            '<18>梦想、愿望、\n浪漫的告白...',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/9}我个人觉得，\n这真的很棒！",
                    "<18>{#p/papyrus}{#f/0}很高兴能看到大家\n都在努力。",
                    '<18>{#p/papyrus}{#f/4}至于我兄弟，就...',
                    "<18>{#p/papyrus}{#f/4}他觉得那帮家伙\n都是在白{@fill=#ff0}月{@fill=#fff}做梦。"
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
               ? [ '<18>{#p/papyrus}我想知道如果\n月亮在轨道上的话，\n生活会是什么样子。' ]
               : [ "<18>{#p/papyrus}DON'T YOU HAVE ANY HOPES AND DREAMS TO SHARE?" ]
      ),
      s_human: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}关于我那个\n精彩的演讲...',
            '<18>{#p/papyrus}{#f/0}巧合的是，\n我第一次练习就是\n在这个地方。',
            '<18>{#p/papyrus}{#f/9}当然，SANS也在！',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}但是我们一直在争\n我们到底该站哪边。' ]
               : [
                    "<25>{#p/undyne}{#f/14}* 你们肯定没\n  争起来吧。",
                    '<18>{#p/papyrus}{#f/0}啊，正好相反。',
                    '<18>{#p/papyrus}{#f/0}我们经常争起来！'
                 ]),
            "<18>{#p/papyrus}{#f/4}我会朝一个方向转，\n说我这样比较好...",
            "<18>{#p/papyrus}{#f/4}然后他再转过来，\n说他的方向更好。",
            '<18>{#p/papyrus}{#f/6}我们争啊争，\n最后我们俩都转得\n越来越快。',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}从那以后，\n这就成了我们的\n一种仪式。" ]
               : [
                    '<25>{#p/undyne}{#f/1}* ...难怪我之前在屋外\n  看到了那个场景。',
                    '<18>{#p/papyrus}{#f/1}你看到啥了！？',
                    '<18>{#p/papyrus}{#f/6}呃，等下，\n你听我解释...',
                    '<18>{#p/papyrus}{#f/5}我想说，\nSANS只是担心...\n呃...',
                    "<18>{#p/papyrus}{#f/6}...担心我在那\n花上太多时间！",
                    '<18>{#p/papyrus}{#f/6}是这样的！！',
                    "<25>{#p/undyne}{#f/16}* ...他是你兄弟，是吧？",
                    "<25>{#p/undyne}{#f/1}* 他可能只是想让你\n  多陪陪他。"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}有趣的事实吧？',
                    '<18>{#p/papyrus}{#f/0}如果把我们的\n旋转速度\n叠加起来...',
                    "<18>{#p/papyrus}{#f/0}结果实际上就是\n零了。",
                    '<18>{#p/papyrus}{#f/4}...因为我们总是\n朝相反的方向转。'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}毕竟，\n与家人共度时光\n很重要。',
                    '<18>{#p/papyrus}{#f/9}有的时候\n甚至需要用\n飞行魔法！'
                 ]
      ),
      s_papyrus: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}捏嘿嘿！！\n被吸引住了吧！？！',
            '<18>{#p/papyrus}{#f/0}我不仅擅长谜题...',
            "<18>{#p/papyrus}{#f/9}我也是一个受人\n尊敬的建筑师！！",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}我打算加入\n皇家守卫后再建\n更多这种东西。' ]
               : [
                    '<25>{#p/undyne}{#f/1}* 你知道吗，我之前\n  考虑过把你的“哨站”\n  翻新一下...',
                    '<25>{#p/undyne}{#f/14}* Like... a surprise gift!',
                    '<18>{#p/papyrus}{#f/4}你说啥？',
                    "<25>{#p/undyne}{#f/12}* 但是，呃，\n  那样就破坏完美了。",
                    '<18>{#p/papyrus}{#f/5}你说完美？',
                    '<18>{#p/papyrus}{#f/6}但是你之前说过\n事情总是可以\n变得更好的！',
                    '<25>{|}{#p/undyne}{#f/17}* 呃... 是这样没错啦！\n* 我的意思是- {%}',
                    '<18>{#p/papyrus}几乎完美。\n这样说可以吧。',
                    '<25>{#p/undyne}{#f/12}* 说得好。'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}我希望SANS能\n帮我找到更好的\n建材。",
                    '<18>{#p/papyrus}{#f/6}纸箱子顶多\n就这样了！！'
                 ]
               : [ '<18>{#p/papyrus}人类，谢谢你...', '<18>可以当我\n几乎完美的\n朋友。' ]
      ),
      s_doggo: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}DOGGO的哨站...',
            '<18>{#p/papyrus}{#f/5}那天，在和其他狗狗\n发生了一件事\n之后...',
            "<18>{#p/papyrus}{#f/5}他告诉我他再也\n没有家的感觉了。",
            '<18>{#p/papyrus}{#f/0}所以我给了他一个\n拥抱，告诉他\n说出来就好。',
            '<18>{#p/papyrus}{#f/4}当然，犬卫队\n都很通情达理。',
            "<18>{#p/papyrus}{#f/0}事情一点点好起来\n也一点都不奇怪！",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* 啊对，我还记得\n  那件事...',
                    '<25>{#p/undyne}{#f/22}* 他，呃...\n* 他在想...',
                    '<18>{#p/papyrus}{#f/5}想什么...？',
                    '<25>{#p/undyne}{#f/9}* ...谢谢你一直支持它。',
                    "<25>{#p/undyne}{#f/16}* 没有你，它可能就...",
                    '<18>{#p/papyrus}{#f/6}啥？\n可能怎么样？？',
                    '<25>{#p/undyne}{#f/12}* ...呃，他可能就\n  辞去守卫一职很久了。',
                    '<18>{#p/papyrus}{#f/0}哦，好吧。',
                    '<18>{#p/papyrus}{#f/5}那就真的\n太糟糕了...'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}善良【真的】是\n一种美德！' ]
               : [ '<18>{#p/papyrus}{#f/9}没有一条狗\n能在我眼皮底下\n辞职皇家守卫！' ]
      ),
      s_robot: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}作为一个建筑机器人\n生活一定很艰难吧。',
            '<18>{#p/papyrus}{#f/5}对那些智能\n比较人工的家伙\n好一点。',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* 是啊... 尤其是一个\n  住在前哨站的机器人。',
                    '<25>{#p/undyne}{#f/9}* 我觉得我们\n  都知道原因。',
                    '<18>{#p/papyrus}{#f/5}太不幸了。',
                    "<25>{#p/undyne}{#f/17}* 但是，嘿！\n* 也不全是坏事！！",
                    '<25>{#p/undyne}{#f/14}* 毕竟，他们的芯片\n  可以直接转移到\n  一台新电脑上。',
                    '<18>{#p/papyrus}{#f/0}哦！哦！\n我应该懂了！',
                    "<18>{#p/papyrus}{#f/0}这样他们就可以\n上域外网了！",
                    '<18>{#p/papyrus}{#f/0}还有天文\n观测网络！',
                    '<18>{#p/papyrus}{#f/0}还有更多更多！'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}你永远不知道\n他们会孤独多久！！" ]
               : [
                    "<18>{#p/papyrus}{#f/0}不知道他们\n能不能看到我的\n浏览记录。",
                    '<18>{#p/papyrus}{#f/4}全都是生\n意大利面条的\n图片...'
                 ]
      ),
      s_maze: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}我懂，我懂，\n我知道我的谜题\n是有点难...',
            ...(SAVE.data.b.papyrus_fire
               ? [
                    '<18>{#p/papyrus}{#f/9}但只要把它想象成\n一次学习的经历\n就好！',
                    '<18>{#p/papyrus}{#f/0}这是个对品格\n而非技能的考验。',
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
            '<18>{#p/papyrus}DOGAMY和\nDOGARESSA的\n哨站...',
            '<18>{#p/papyrus}{#f/0}有时候我想知道\n和狗结婚是什么\n感觉。',
            "<18>{#p/papyrus}{#f/4}虽然，我是永远\n都不可能知道了，\n因为...",
            "<18>{#p/papyrus}{#f/9}我只愿意娶一个\n帅气的骷髅！",
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
                    "<18>{#p/papyrus}{#f/6}什么！？！？\n我们不能结婚！！",
                    ...(SAVE.data.b.flirt_papyrus
                       ? [ "<18>{#p/papyrus}{#f/0}我们都说好了\n是不会有结果的，\n还记得吗？" ]
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
            '<18>{#p/papyrus}{#f/0}这个房间过去是\n用一座桥连接的。',
            '<18>{#p/papyrus}{#f/4}左右两半，\n在中心相连...',
            '<18>{#p/papyrus}{#f/9}就像两个很勇敢的\n骷髅的灵魂！',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}...',
                    "<18>{#p/papyrus}{#f/5}我不知道SANS现在\n在想什么...",
                    "<18>{#p/papyrus}{#f/4}但我觉得肯定跟\n调味品有很大关系。",
                    "<18>{#p/papyrus}{#f/5}要是他不再对调味品\n念念不忘就好了...",
                    '<18>{#p/papyrus}{#f/7}不然我就得\n好好用雅莫酱\n{@fill=#ff0}酱{@fill=#fff}他一军了！！'
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
                    '<18>{#p/papyrus}{#f/5}我希望我还能有\n别的话可说...',
                    "<18>{#p/papyrus}{#f/4}但我现在满脑子想的\n都是调味品的事。"
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
            '<18>{#p/papyrus}{#f/4}SANS很喜欢那些\n找不同的谜题...',
            '<18>{#p/papyrus}{#f/5}我之前做的找不同\n都很简单。',
            "<18>{#p/papyrus}{#f/7}但最近的谜题\n都要变得几乎\n不可能找到了！",
            '<18>{#p/papyrus}{#f/4}如果不对图像像素\n进行像素扫描...',
            "<18>{#p/papyrus}{#f/7}根本就没人能\n解决！",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/7}太荒谬了！" ]
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
                    '<18>{#p/papyrus}{#f/4}你在寻求\n我的帮助吗？',
                    '<18>{#p/papyrus}{#f/7}啊，算了！',
                    "<18>{#p/papyrus}{#f/0}反正，\n不公平的谜题\n不值得去解。"
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
            '<18>{#p/papyrus}{#f/0}有人说那房间里的\n微波炉...',
            '<18>{#p/papyrus}{#f/0}有一个所谓的\n“隐藏功能”。',
            '<18>{#p/papyrus}{#f/5}不过，大多数人\n不知道的是...',
            '<18>{#p/papyrus}{#f/4}它发出的“微”波...\n实际上是\n“微”小的引力波。',
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
               ? [ '<18>{#p/papyrus}{#f/0}要是有办法把它\n关掉就好了。' ]
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
            '<18>{#p/papyrus}嗯... 这个\n谜题的解法...？',
            '<18>{#p/papyrus}{#f/5}呃，有的时候\n我就直接从激光上\n跨过去了。',
            '<18>{#p/papyrus}{#f/0}所以，其中一个解法\n就是要又高又帅！',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}...如果你个子太小\n绝对不要这样做。" ]
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
               ? [ "<18>{#p/papyrus}{#f/4}我正在解决\n这个问题..." ]
               : [
                    '<18>{#p/papyrus}{#f/5}HMM...',
                    '<18>{#p/papyrus}{#f/0}UNDYNE SHOULD PROBABLY INVEST IN A TELESCOPE.',
                    '<18>{#p/papyrus}{#f/4}I HEARD MY BROTHER WAS OFFERING MEMBERSHIPS...'
                 ]
      ),
      s_puzzle2: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}有人告诉我说\n这些谜题有一个\n诀窍...",
            "<18>{#p/papyrus}{#f/5}涉及到在瓷砖上\n显示的内容。",
            '<18>{#p/papyrus}{#f/6}...我还以为这是个\n猜谜游戏呢！',
            '<18>{#p/papyrus}{#f/0}我猜你今天又\n学到了一些新知识。',
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
               ? [ "<18>{#p/papyrus}{#f/4}等下，这是我\n兄弟的台词..." ]
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
                    "<18>{#p/papyrus}{#f/5}起初，这个谜题\n结果让我\n大失所望...",
                    '<18>{#p/papyrus}{#f/4}但后来，我就\n意识到了...',
                    '<18>{#p/papyrus}{#f/0}发生这种事情的\n概率很低...',
                    '<18>{#p/papyrus}{#f/9}...所以我们可能是\n唯一看到的人！！',
                    '<18>{#p/papyrus}{#f/0}你现在觉得\n很幸运了吧。',
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
                            '<18>{#p/papyrus}{#f/4}哦。',
                            '<18>{#p/papyrus}{#f/7}... SO YOU WERE SPYING ON THE HUMAN!?!?',
                            "<25>{#p/undyne}{#f/17}* I'm the captain of the Royal Guard!!\n* What do you think!"
                         ])
                 ],
         () =>
            solo()
               ? SAVE.data.b.s_state_puzzlenote
                  ? [ '<18>{#p/papyrus}{#f/5}OH, HOW MUCH WE DO NOT YET OR NO LONGER KNOW...' ]
                  : [ '<18>{#p/papyrus}幸运女神站在我们\n这边，人类！' ]
               : SAVE.data.b.s_state_puzzlenote
               ? [ '<18>{#p/papyrus}{#f/5}MONSTER BIOLOGY IS WEIRD.' ]
               : [ '<18>{#p/papyrus}JOKE OR NOT, IT WAS STILL PRETTY LUCKY, HUH?' ]
      ),
      s_pacing: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}CANIS MINOR的\n哨站。',
            '<18>{#p/papyrus}{#f/4}也是那些月岩商人\n喜欢的地方。',
            '<18>{#p/papyrus}{#f/5}嗯... 我想知道\n那些岩石都是用\n什么做成的。',
            "<18>{#p/papyrus}{#f/4}肯定不是用\n月亮做的，\n因为...",
            '<18>{#p/papyrus}{#f/7}月亮本身就是个\n巨大的岩石啊！',
            '<18>{#p/papyrus}{#f/5}这是不是就意味着\n月亮本身就是\n月岩呢？',
            '<18>{#p/papyrus}{#f/5}那“月亮”和“月岩”\n区别在哪？',
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
               ? [ '<18>{#p/papyrus}{#f/4}也许我们凡人\n不值得了解这些\n知识。' ]
               : [ '<25>{#p/undyne}{#f/12}* Just call me \"pundyne.\"', "<18>{#p/papyrus}{#f/0}PLEASE DON'T." ]
      ),
      s_puzzle3: pager.create(
         0,
         [
            '<18>{#p/papyrus}{#f/5}所以...\n这里发生的事...',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/4}咱还是别提\n这个谜题了吧。"
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
            '<18>{#p/papyrus}CANIS MAJOR的\n哨站...',
            '<18>{#p/papyrus}{#f/5}那只狗有一颗\n金子般的心。',
            '<18>{#p/papyrus}{#f/4}要是【我】加入\n皇家守卫就好了...',
            "<18>{#p/papyrus}{#f/0}这样我就能\n报答它的好意了！",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* I could repay it for you, if you like.',
                    "<18>{#p/papyrus}{#f/7}IT'S NOT THE SAME IF I DON'T DO IT MYSELF!",
                    "<25>{#p/undyne}{#f/17}* Couldn't you just wait until it gets home!?",
                    "<18>{#p/papyrus}{#f/7}IT'D MEAN MORE IF IT WAS AT ITS WORKPLACE!",
                    "<25>{#p/undyne}{#f/1}* You're right.\n* I'll let you appear as a hologram there.",
                    '<18>{#p/papyrus}{#f/7}哼！！！'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}真可惜我可能\n永远加入不了\n皇家守卫了。" ]
               : [ '<18>{#p/papyrus}{#f/7}NOTHING WILL EVER REPLACE FACE-TO- FACE CONVERSATION!' ]
      ),
      s_math: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}数学【一直】是\n我最头疼的东西。',
            '<18>{#p/papyrus}{#f/5}又是微积分，\n又是几何学...',
            '<18>{#p/papyrus}{#f/4}用手指骨查数\n都跑哪去了？',
            '<18>{#p/papyrus}{#f/7}所有的“高等”数学\n都是完全没有\n必要的！',
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
            '<18>{#p/papyrus}{#f/0}如果你真的需要\n高等数学方面的\n帮助...',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}那就没有比\nALPHYS博士更\n适合的人选了！",
                    "<18>{#p/papyrus}{#f/4}大家都说她像个\n行走的计算器...",
                    '<18>{#p/papyrus}{#f/0}而且是很科学的\n那种！'
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
            '<18>{#p/papyrus}还记得那个\n“致命恐怖的挑战”吗？',
            '<18>{#p/papyrus}{#f/4}不知道你信不信，\n其实还有一个\n秘密的第七个武器。',
            "<18>{#p/papyrus}{#f/6}那东西真的会让你\n魂飞魄散的！",
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
               ? [ '<18>{#p/papyrus}{#f/6}...字面意义上的！！' ]
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
            '<18>{#p/papyrus}星港小镇：\n北侧！',
            "<18>{#p/papyrus}{#f/5}是我不会花很多\n时间的一侧。",
            '<18>{#p/papyrus}{#f/4}然而，SANS就...',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/4}...好吧，你可以\n大概猜一下他为什么\n喜欢这里。' ]
               : [
                    "<25>{#p/undyne}{#f/14}* ... enjoys the new and improved food they're selling at Grillby's!",
                    '<18>{#p/papyrus}{#f/4}NEW AND IMPROVED, YOU SAY?',
                    '<18>{#p/papyrus}{#f/5}I SUPPOSE IT -IS- BETTER THAN BEFORE...',
                    '<18>{#p/papyrus}{#f/7}BUT STILL NOTHING COMPARED TO HOME- COOKED PASTA!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}跟GRILLBY'S是\n有关系的哦。" ]
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
                    '<18>{#p/papyrus}{#f/0}今天运输船\n还开吗？',
                    '<18>{#p/papyrus}{#f/5}嗯... 一般来说\n晚些时候会\n过来的。'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}I HEARD THE TAXI IS FINALLY OUT!',
                    "<18>{#p/papyrus}{#f/5}HMM... THAT MUST MEAN WE'RE IN THE LATER HOURS."
                 ]),
            '<18>{#p/papyrus}{#f/6}至于如何分辨\n“早些时候”和\n“晚些时候”...',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}...我回头再\n跟你讲。" ]
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
               ? [ '<18>{#p/papyrus}{#f/6}会讲的！！！' ]
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
            '<18>{#p/papyrus}星港小镇：\n南侧！',
            '<18>{#p/papyrus}{#f/4}或者我也喜欢\n叫做...',
            '<18>{#p/papyrus}{#f/9}宇宙中最好的\n一侧！',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* No doubt because YOU live there.',
                    '<18>{#p/papyrus}{#f/4}NOT ONLY THAT...',
                    "<18>{#p/papyrus}{#f/0}IT'S ALSO THE SIDE THAT DOESN'T HAVE GRILLBY'S ON IT!!"
                 ])
         ],
         [
            "<18>{#p/papyrus}{#f/4}难怪会有一个\n友好的幽灵\n在这里开店...",
            "<18>{#p/papyrus}{#f/9}谁不想接近\n这伟大的一边呢？",
            "<18>{#p/papyrus}{#f/0}我肯定是\n没法抗拒的。"
         ]
      ),
      s_battle: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}你正站在我们\n传奇的战场上？',
            "<18>{#p/papyrus}{#f/0}不不，更新一下。\n这是个具有历史\n价值的地方。",
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
               ? [ "<18>{#p/papyrus}{#f/4}总有一天他们会\n把这件事放进\n博物馆的..." ]
               : [
                    '<25>{#p/undyne}{#f/1}* Regardless of what happens now...',
                    '<25>{#p/undyne}{#f/7}* You better not have a battle more legendary than OURS!',
                    '<25>{#p/undyne}{#f/14}* Not unless I get to be a part of it!\n* Fuhuhu!'
                 ]
      ),
      s_exit: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}你现在得\n小心点...',
            '<18>{#p/papyrus}{#f/0}那边那扇门是\n铸厂的入口。',
            '<18>{#p/papyrus}{#f/5}在这样的地方\n等待你的只有\n黑暗。',
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
               ? [ '<18>{#p/papyrus}{#f/6}我刚才提到过\n等待着你的黑暗\n了吗？' ]
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
            "<18>{#p/papyrus}{#f/5}所以...\n这里是GRILLBY'S。",
            '<18>{#p/papyrus}{#f/5}他们真的安了台\n雅莫万能酱\n喷酱机吗...',
            "<18>{#p/papyrus}{#f/6}就只是为了满足\n我兄弟奇怪的\n念头？",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/13}* A what?',
                    '<18>{#p/papyrus}{#f/4}A YAMOK SAUCE MACHINE.',
                    '<18>{#p/papyrus}{#f/4}YOU KNOW, TO DISPENSE YAMOK SAUCE.'
                 ]),
            '<18>{#p/papyrus}{#f/4}...',
            '<18>{#p/papyrus}{#f/4}我通常都对\n我们一族\n抱有希望的，但...',
            '<18>{#p/papyrus}{#f/4}遇到这种事\n就不行了。',
            '<18>{#p/papyrus}{#f/5}...不过。',
            "<18>{#p/papyrus}{#f/5}还好他们把点唱机\n修好了。",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* I KNOW RIGHT!?',
                    "<25>{#p/undyne}{#f/7}* That thing's been broken since before I was BORN."
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}第三首是我个人\n最喜欢的。',
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/1}* Mine's track four!" ])
         ]
      ),
      s_backrooms: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}自从他们在这里\n使用复制器开始...',
            "<18>{#p/papyrus}{#f/5}我就不知道\n怎么看待这件事\n才算好了。",
            '<18>{#p/papyrus}{#f/0}一方面，\n这种新食物\n确实健康。',
            "<18>{#p/papyrus}{#f/7}但另一方面，\n他们完全把烹饪\n放弃掉了！",
            "<18>{#p/papyrus}{#f/4}看到你现在\n所在的这个\n房间了吗？",
            '<18>{#p/papyrus}{#f/7}猜猜它过去\n是干什么的吧！',
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
                    '<18>{#p/papyrus}{#f/4}是某种“厨房”...',
                    '<18>{#p/papyrus}{#f/5}现在他们只把这里\n当成玩私人纸牌\n游戏的地方了。'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/4}IF THEY'RE NOT GOING TO USE THIS AS A KITCHEN...",
                    '<18>{#p/papyrus}{#f/5}PERHAPS A HEADPAT MACHINE WOULD BE A BETTER INVESTMENT.'
                 ]
      ),
      s_bonehouse: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}还有什么地方能\n比我家更好呢！',
            "<18>{#p/papyrus}{#f/0}我们有超高水槽...\n还有宠物月岩...",
            '<18>{#p/papyrus}{#f/9}甚至还有个阳台，\n多适合户外生活！',
            "<18>{#p/papyrus}{#f/0}我基本只有在这\n才会有家的感觉。",
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
            '<18>{#p/papyrus}{#f/0}不知道现在\n人类是怎么称呼\n“家”的。',
            '<18>{#p/papyrus}{#f/4}据我所知，\n他们还生活在\n地球上...',
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
                    '<18>{#p/papyrus}哇，你只花了四秒钟\n就给我打电话了！',
                    '<18>你一定非常需要\n我的帮助！！！',
                    "<18>{#p/papyrus}{#f/9}但不要害怕。\n这是PAPYRUS的\n热线电话！",
                    '<18>{#p/papyrus}{#f/9}只需要描述一下\n你的位置，然后...',
                    '<18>{#p/papyrus}{#f/4}... WAIT.',
                    "<18>{#p/papyrus}{#f/6}你还在我的\n房间里？？",
                    '<18>{#p/papyrus}{#f/5}...',
                    '<18>{#p/papyrus}{#f/5}你有没有听说过一种\n叫做... 门的东西？',
                    "<18>{#p/papyrus}{#f/6}别着急！！\n我会给你画个\n图解的！"
                 ]
               : SAVE.data.n.plot_date < 1.2
               ? [
                    "<18>{#p/papyrus}{#f/1}啥？？\n我以为你早就\n离开我房间了！！",
                    "<18>{#p/papyrus}{#f/4}看来我们得\n从头开始了...",
                    '<18>{#p/papyrus}{#f/5}首先，你还知道\nPAPYRUS是\n谁吗！？'
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
               ? [ "<18>{#p/papyrus}{#f/6}坚持住！\n我还在画！" ]
               : SAVE.data.n.plot_date < 1.2
               ? [ '<18>{#p/papyrus}{#f/1}【我】还知道\nPAPYRUS是\n谁吗！？！？' ]
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
            "<18>{#p/papyrus}旅馆是个好地方。",
            '<18>{#p/papyrus}床很舒服，\n旅馆的老板娘\n人就更好了。',
            '<18>{#p/papyrus}{#f/5}但我最喜欢的，\n还是墙上的那个\n照片...',
            "<18>{#p/papyrus}{#f/0}它时刻提醒我们\n怪物的真正能耐\n是怎样的。",
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
               ? [ '<18>{#p/papyrus}{#f/5}要是我们能回到\n过去就好了...' ]
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
            '<18>{#p/papyrus}有的时候，\nSANS会给我读一个\n睡前故事。',
            '<18>{#p/papyrus}{#f/5}你听说过\n《伟大的怪物》吗？',
            '<18>{#p/papyrus}{#f/6}SANS昨晚给我讲了\n这个故事，然后...',
            "<18>{#p/papyrus}{#f/8}...呃啊！\n我就哭得\n停不下来了！",
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
            "<18>{#p/papyrus}{#f/4}下一次，我就让\nSANS讲一个\n开心的故事了。",
            '<18>{#p/papyrus}{#f/6}要有一个\n【真正】意义上的\n幸福结局！',
            '<18>{#p/papyrus}{#f/5}每个人都该\n适得其所！！',
            '<18>{#p/papyrus}{#f/7}每个人都不用\n失去性命，\n不用道别！！！'
         ]
      ),
      s_librarby: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/6}嘘...\n（图书倌里是不能\n打电话的！）',
            "<18>{#p/papyrus}{#f/0}（不过可以等你出来\n之后再给我打\n电话！）",
            ...(solo() ? [] : [ '<25>{|}{#p/undyne}{#f/8}* YEAHHHH MAKE SOME NOI- {%}' ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}（你认真的吗...）' ]
               : [
                    '<18>{#p/papyrus}{#f/4}(YES, I HUNG UP TO STOP UNDYNE FROM DISTURBING YOU.)',
                    '<25>{|}{#p/undyne}{#f/8}* YEA- {%}'
                 ]
      ),
      f_start: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}看看铸厂里\n这不祥的气氛。',
            '<18>{#p/papyrus}{#f/4}他们说管道里\n住着怪物...',
            "<18>{#p/papyrus}{#f/0}说得绝对没错！",
            '<18>{#p/papyrus}{#f/5}有些怪物确实喜欢\n潮湿肮脏的环境。',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}我就不一样！！' ]
               : [
                    "<25>{#p/undyne}{#f/1}* I hope they don't mind me using the pipes as a jungle gym.",
                    '<25>{#p/undyne}{#f/8}* I used to swing on them all the time!',
                    '<18>{#p/papyrus}{#f/6}UNDYNE, NO!\nTHOSE POOR, POOR PIPE DWELLERS!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}我更喜欢在生活中\n卫生一点。' ]
               : [ '<18>{#p/papyrus}{#f/6}BE CAREFUL WHERE YOU JUNGLE GYM.' ]
      ),
      f_sans: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}我兄弟在这\n有一个工作站。',
            '<18>{#p/papyrus}{#f/4}事实上，\n他同时管理两个站点。',
            "<18>{#p/papyrus}{#f/0}很惊人，是吧？",
            '<18>{#p/papyrus}{#f/0}他偷懒的次数\n是平时的两倍！！',
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
               ? [ '<18>{#p/papyrus}{#f/5}我们醒着的人只能\n梦想拥有这样的\n懒惰...' ]
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
            "<18>{#p/papyrus}你的次元箱里\n有什么？",
            "<18>{#p/papyrus}{#f/4}实际上，\n不用告诉我。",
            "<18>{#p/papyrus}{#f/7}不然就是公然\n侵犯你的隐私了！",
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
               ? [ '<18>{#p/papyrus}{#f/4}...至少告诉我\n不是“狗剩”就行。' ]
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
            "<18>{#p/papyrus}{#f/4}大家都说最好不要\n惹那条睡觉的狗...",
            '<18>{#p/papyrus}{#f/7}但是，说真的，\n我不同意！',
            '<18>{#p/papyrus}{#f/5}毕竟...',
            '<18>{#p/papyrus}{#f/6}一条好狗应该把\n诚实看得比什么\n都重要！',
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
               ? [ '<18>{#p/papyrus}{#f/4}要是我水槽下面的\n那条狗有这样的\n优先权就好了...' ]
               : [ '<18>{#p/papyrus}{#f/0}WHEN IN DOUBT, JUST TALK IT OUT.', '<18>{#p/papyrus}{#f/9}WORKS EVERY TIME!' ]
      ),
      f_puzzle1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}小心古人的\n塔架谜题！',
            '<18>{#p/papyrus}{#f/4}虽然他们的建造方法\n很简陋...',
            '<18>{#p/papyrus}{#f/6}但是设计却很复杂！',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}我们这些怪物\n能解决这些谜题\n可真是个奇迹。" ]
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
               ? [ '<18>{#p/papyrus}{#f/0}我好奇人类会不会\n被怪物的谜题难住。' ]
               : [ '<18>{#p/papyrus}{#f/0}HEH! NOT ALL HUMANS ARE BAD!' ]
      ),
      f_quiche: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}我哥哥前几天\n来过这里...',
            '<18>{#p/papyrus}{#f/5}说他得送点\n东西过来。',
            '<18>{#p/papyrus}{#f/5}我问他要送什么，\n他给了我一个挑战...',
            '<18>{#p/papyrus}{#f/4}说要让我想\n一{@fill=#ff0}支世{@fill=#fff}俗的笑话。',
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
         [ "<18>{#p/papyrus}{#f/6}等我想到答案了\n很快就来找你！" ]
      ),
      f_puzzle2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}通常情况下，\n如果你没花时间\n好好读标牌的话...',
            "<18>{#p/papyrus}{#f/5}你可能是解不开\n谜题的。",
            "<18>{#p/papyrus}{#f/6}你以为仅凭直觉就\n可以了，但是...\n完全不够！",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}...我已经没少\n因为这个尴尬了..." ]
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
                    "<18>{#p/papyrus}{#f/0}我以前说过，\n我还要再说一遍。",
                    '<18>{#p/papyrus}{#f/9}读！\n标！！\n牌！！！',
                    '<18>{#p/papyrus}{#f/4}注意我的感叹号\n用得越来越多。',
                    "<18>{#p/papyrus}{#f/7}意思就是说这\n非常重要！！！！"
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
            '<18>{#p/papyrus}{#f/0}讯星真的很厉害，\n对吧？',
            '<18>{#p/papyrus}{#f/5}不过，它们会\n周期性地重置。',
            '<18>{#p/papyrus}{#f/4}在重置之前，\n只能保留一条消息...',
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
         [ "<18>{#p/papyrus}{#f/4}这通电话\n【应该】不会被录下来吧。" ]
      ),
      f_prechase: pager.create(
         0,
         () =>
            SAVE.data.n.plot < 37.11
               ? []
               : SAVE.data.n.plot < 48
               ? [
                    '<18>{#p/papyrus}这里以前有一座桥的，\n但是桥塌了。',
                    "<18>{#p/papyrus}{#f/5}希望他们很快能\n建一座新桥...",
                    '<18>{#p/papyrus}{#f/6}站在一个脆弱的\n浮动平台上\n太吓人了！'
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
            '<18>{#p/papyrus}{#f/0}没有什么比一座...',
            '<18>{#p/papyrus}{#f/0}既坚固，又稳定，\n设计又合理的桥\n更安全的了。',
            '<18>{#p/papyrus}{#f/9}这是对一流工程\n技术的真正证明！！'
         ]
      ),
      f_chase: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}当我第一次看到\n这个房间时，\n我真的很惊讶。',
            "<18>{#p/papyrus}{#f/4}惊讶到，我找不到\n出去的路了。",
            '<18>{#p/papyrus}{#f/6}...就更别说这里的\n陷阱了！',
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
               ? [ '<18>{#p/papyrus}{#f/5}我觉得还是避开\n恐怖的迷宫游戏\n比较好。' ]
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
            "<18>{#p/papyrus}{#f/0}你现在在一个叫做...",
            '<18>{#p/papyrus}{#f/9}“暗区”的地方。',
            "<18>{#p/papyrus}{#f/4}你肯定想不到\n它名字的来历的...",
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
               ? [ '<18>{#p/papyrus}{#f/4}剧透警告...', "<18>{#p/papyrus}{#f/4}...因为里面非常暗。" ]
               : [ "<18>{#p/papyrus}{#f/0}AREN'T THINGS BETTER WHEN YOU UNDERSTAND THEM?" ]
      ),
      f_lobby: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/6}我现在... 完全...\n联系不上你！",
            "<18>{#p/papyrus}{#f/6}手机... 绝对...\n出故障了！",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}...',
                    "<18>{#p/papyrus}{#f/4}好吧，我承认其实\n并没有故障。",
                    '<18>{#p/papyrus}{#f/0}...但那台桌子肯定\n故障了！'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* So would you say the call\'s getting \"sliced\" or \"shredded?\"',
                    "<18>{#p/papyrus}{#f/5}UNFORTUNATELY, IT'S SOMETHING FAR MORE DREADED."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}不过，讲真的，\n那东西到底是\n什么情况啊？" ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S ENCOURAGING UNDYNE TO MAKE CHEESE PUNS." ]
      ),
      f_error: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}这件房间标志着\n你的旅程已经走了一半...',
            '<18>{#p/papyrus}{#f/0}也就是从星港出发开始...',
            '<18>{#p/papyrus}{#f/0}到空境第一层的尽头。',
            '<18>{#p/papyrus}{#f/5}...不管你接下来\n要去哪里...',
            '<18>{#p/papyrus}{#f/6}你的旅程【至少】\n已经走完一半了！',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/4}* What!?\n* Don't say it like THAT!",
                    "<18>{#p/papyrus}{#f/6}I-I MEAN, YOUR JOURNEY'S JUST GETTING STARTED!",
                    "<18>{#p/papyrus}{#f/6}THERE'S STILL PLENTY OF THINGS TO SEE!",
                    '<18>{#p/papyrus}{#f/6}AND PLENTY OF PLACES TO BE!',
                    '<18>{#p/papyrus}{#f/4}最终...',
                    '<18>{#p/papyrus}{#f/9}PLENTY OF NEW FRIENDS TO MEET!',
                    "<25>{#p/undyne}{#f/12}* That's better."
                 ])
         ],
         () =>
            solo()
               ? [ '<19>{#p/papyrus}{#f/5}走完一半了...' ]
               : [ "<19>{#p/papyrus}{#f/9}HERE'S TO THE LONG JOURNEY AHEAD!" ]
      ),
      f_telescope: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}我哥哥在这里经营\n望远镜生意。',
            '<18>{#p/papyrus}{#f/5}订阅、会员、\n注册、开券...',
            "<18>{#p/papyrus}{#f/6}这是个无穷无尽的\n条款和条件的迷宫！",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}我曾经试过报名，\n但是...',
                    "<18>{#p/papyrus}{#f/4}就算是我，\n耐力也是有限度的。"
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
         [ '<18>{#p/papyrus}{#f/4}爱搞恶作剧的人\n总会把事情搞复杂...' ]
      ),
      f_bird: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}最是声名狼藉的。',
            '<18>{#p/papyrus}{#f/9}最是无所畏惧的。',
            '<18>{#p/papyrus}{#f/9}最是一往无前的。',
            '<18>{#p/papyrus}{#f/9}怪物。\n神话。\n传说...',
            '<18>{#p/papyrus}{#f/9}那只黄色的鸟。',
            ...(SAVE.data.n.plot < 42
               ? [
                    '<18>{#p/papyrus}{#f/9}...',
                    '<18>{#p/papyrus}{#f/4}... WAIT.',
                    "<18>{#p/papyrus}{#f/1}IT'S NOT THERE ANYMORE!?!?",
                    '<18>{#p/papyrus}{#f/8}HOW COULD THIS BE!!!'
                 ]
               : solo()
               ? [ '<18>{#p/papyrus}{#f/4}...看来我们没有\n别的办法来跨越\n这鸿沟了。' ]
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
                    '<18>{#p/papyrus}{#f/0}相信我，\n那条沟比看起来要\n宽多了。',
                    '<18>{#p/papyrus}{#f/4}而且很可能是\n非欧的那种。',
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
            '<18>{#p/papyrus}{#f/0}有传言说...',
            '<18>当地卖冰淇淋的那个人\n会发明信片。',
            '<18>{#p/papyrus}{#f/4}听说这些“明信片”\n具有不可言说的力量...',
            '<18>{#p/papyrus}{#f/9}...可以解锁更多\n美味的口味！',
            ...(solo()
               ? []
               : [
                    '<26>{#p/undyne}{#f/8}* And I LOVE tasty treats!',
                    "<25>{#p/undyne}{#f/14}* Well, as long as they're not cold, anyway.",
                    "<25>{#p/undyne}{#f/17}* Then I don't love them that much!!"
                 ])
         ],
         [
            '<18>{#p/papyrus}{#f/0}不知道这些明信片\n还有什么魔力...',
            '<18>{#p/papyrus}{#f/4}它们往往\n很快就会用完...'
         ]
      ),
      f_abyss: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}我们望着这条布满\n讯星的蜿蜒小路...',
            '<18>{#p/papyrus}{#f/4}我们认为这“很正常”。',
            '<18>{#p/papyrus}{#f/0}你知道还有什么\n“很正常”吗？',
            '<18>{#p/papyrus}{#f/0}这通电话竟然能\n传到那里！',
            '<18>{#p/papyrus}{#f/6}太正常了！！',
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
               ? [ "<18>{#p/papyrus}{#f/6}我绝对没有在\n阴阳怪气！！" ]
               : [ "<19>{#p/papyrus}{#f/4}SARCASM TRAINING'S -TOTALLY- THE EASIEST THING EVER." ]
      ),
      f_muffet: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}前几天我上网...',
            "<18>{#p/papyrus}{#f/6}我了解到了蜘蛛丝\n比你想象得更坚固！",
            '<18>{#p/papyrus}{#f/4}你问我上的是哪个网？',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}...你应该不想知道的。" ]
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
               ? [ "<18>{#p/papyrus}{#f/4}不是用电脑，\n这是肯定的。" ]
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
            '<18>{#p/papyrus}{#f/4}一座神秘的雕像...',
            '<18>{#p/papyrus}{#f/4}在工厂正中央...',
            '<18>{#p/papyrus}{#f/6}...我想知道这\n有什么意义！',
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
                    '<18>{#p/papyrus}{#f/4}劲爆消息。',
                    '<18>{#p/papyrus}{#f/4}神秘的雕像很神秘。',
                    "<18>{#p/papyrus}{#f/6}这谁能想得到！！"
                 ]
               : [
                    '<25>{#p/undyne}{#f/11}* Some say the statue also contains a SECOND music box...',
                    "<25>{#p/undyne}{#f/12}* ... but I'll believe it when I hear it."
                 ]
      ),
      f_piano: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}要是有个房间...',
            '<18>能让我通过音乐\n表达自己就好了。',
            '<18>一个孤独的房间，\n与世隔绝...',
            '<18>中间唯有一架钢琴...',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}...哦等下！\n不就是这个房间吗！" ]
               : [
                    '<25>{#p/undyne}{#f/10}* And maybe that piano would be used to solve puzzles...',
                    '<25>{#p/undyne}{#f/10}* Or practice combat by fighting the ivories...',
                    '<25>{#p/undyne}{#f/10}* Or play a certain melody that reminds you of someone special...',
                    '<25>{#p/undyne}{#f/7}* ... if only you were in that room RIGHT NOW!!',
                    '<18>{#p/papyrus}{#f/6}I WAS GOING TO MENTION THAT!!'
                 ])
         ],
         [ '<18>{#p/papyrus}下次我来这里，\n我要写一首曲子。', '<18>名字就叫\n《PAPYRUS的故事》。' ]
      ),
      f_artifact: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}我觉得我之前从来\n没进过这个房间。",
            "<18>{#p/papyrus}{#f/6}这个房间什么样？\n里面有没有\n数不清的宝藏？",
            '<18>{#p/papyrus}{#f/4}声明一下，\n这个问题是反问句。',
            "<18>{#p/papyrus}{#f/7}我宁愿自己去\n寻找答案！",
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
               ? [ '<18>{#p/papyrus}{#f/6}不要剧透！！！' ]
               : [ "<18>{#p/papyrus}{#f/4}AND THAT'S NOT EVEN HIS MOST IMPRESSIVE FEAT." ]
      ),
      f_path: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}继续走，\n你就能看到首塔了。",
            "<18>{#p/papyrus}{#f/4}通常你从这么远的地方\n看不到，但是...",
            '<18>{#p/papyrus}{#f/5}通过这个房间里的\n某个东西...',
            '<18>...就能看到了...',
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
               ? [ '<18>{#p/papyrus}{#f/6}趁着还有机会，\n好好欣赏风景吧！' ]
               : [ '<18>{#p/papyrus}{#f/6}JUST BE CAREFUL!' ]
      ),
      f_view: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}你肯定是一个\n很会一心多用的人！',
            "<18>{#p/papyrus}{#f/4}因为只有像你\n这样的人...",
            '<18>{#p/papyrus}{#f/5}才会在【那种】美景\n附近还想着打电话\n给别人。',
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
            "<18>{#p/papyrus}{#f/5}很不幸，这里没有什么\n特别好说的。",
            '<18>{#p/papyrus}{#f/4}除了我听说的那座\n不知道通往哪里的桥...',
            '<18>{#p/papyrus}{#f/5}真的就只是条\n死胡同。',
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
               ? [ '<18>{#p/papyrus}{#f/5}也许你可以到别的\n地方再打过来？' ]
               : [ '<18>{#p/papyrus}{#f/4}SO THERE -WAS- SOMETHING TO SAY HERE...' ]
      ),
      f_tunnel: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}啊... 垃圾处理站。',
            '<18>{#p/papyrus}{#f/0}是个处置不受欢迎的\n东西的好地方。',
            '<18>{#p/papyrus}{#f/4}或者也可以说...',
            '<18>{#p/papyrus}{#f/9}一个无需成本就可以\n淘到宝藏的地方！',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}我有的时候跟SANS\n过来翻东西。' ]
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
                    '<18>{#p/papyrus}{#f/4}上次我们甚至找到了\n一幅骨头画...',
                    '<18>{#p/papyrus}{#f/5}就是稍微有点\n脏而已！！'
                 ]
               : [ "<18>{#p/papyrus}{#f/6}PERHAPS IT'D BE BEST FOR YOU TO LEAVE THIS ROOM." ]
      ),
      f_chute: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}地板上有三台\n平板电脑。',
            '<18>{#p/papyrus}{#f/0}一台是关于星花的，\n一台是关于虫洞的。',
            '<18>{#p/papyrus}{#f/4}还有一台里是\n科幻动漫。',
            "<18>{#p/papyrus}{#f/0}我【个人】觉得，\n这些东西都是有关联的。",
            '<18>{#p/papyrus}{#f/5}也就是说，星花\n是通过虫洞来的...',
            '<18>{#p/papyrus}{#f/5}就像那部科幻动漫\n预言的那样。',
            "<18>{#p/papyrus}{#f/6}这是能一次性解释清\n这三个东西的\n唯一办法！",
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
            "<18>{#p/papyrus}{#f/0}不要忽略隐藏的\n路径...",
            '<18>{#p/papyrus}{#f/5}闭上眼睛，\n径直地走...',
            "<18>{#p/papyrus}{#f/5}迎接TEMMIE狂热的心情。",
            "<18>{#p/papyrus}{#f/4}...这是我听说的\n关于这个地方的谜语。",
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
            '<18>{#p/papyrus}如果你看到一家商店...',
            '<18>{#p/papyrus}{#f/4}你就该停下脚步...',
            '<18>{#p/papyrus}{#f/0}心急火燎地\n进去看看！！',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/9}因为我们在进行\n火热的大甩卖！！",
                    '<18>{#p/papyrus}{#f/5}这都是在我想象中\n卖火的商店里\n会发生的事。'
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
               ? [ "<18>{#p/papyrus}{#f/5}这也是我的\n另一个梦想..." ]
               : [
                    "<18>{#p/papyrus}{#f/0}IT'S IMPORTANT TO ACKNOWLEDGE THE HEROES AMONGST US.",
                    '<18>{#p/papyrus}{#f/5}WITHOUT THEM, WE MIGHT NOT EVEN BE HERE TODAY...'
                 ]
      ),
      f_undyne: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}这里是UNDYNE的家。",
            ...(SAVE.data.n.plot < 48 || world.trueKills > 0
               ? [ '<18>{#p/papyrus}{#f/9}学习烹饪的\n理想的地方！' ]
               : SAVE.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/4}YOU KNOW, THE ONE WITH THE SKELETON IN FRONT.' ]
               : SAVE.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/9}DON'T HESITATE TO COME IN!" ]
               : SAVE.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/6}...你还在UNDYNE的\n家那里啊？？",
                    "<18>{#p/papyrus}{#f/5}她，呃，\n还没跟我见面呢。",
                    '<18>{#p/papyrus}{#f/4}要不你先\n离开房间然后...',
                    '<18>{|}{#f/1}... {%}',
                    '<25>{#p/undyne}{#f/12}* 呼... 哈...！',
                    "<25>{#p/undyne}{#f/8}* 没错！！！\n* 那是我的家！！！",
                    "<18>{#p/papyrus}{#f/6}呃，嗨，UNDYNE！\n你是怎么这么快\n就到这里的啊？",
                    '<25>{#p/undyne}{#f/17}* 我跑过来的。',
                    '<18>{#p/papyrus}{#f/1}什么？？\n那你肯定有一些...',
                    '<18>{#p/papyrus}{#f/9}关于你家的\n很酷的事情\n要说吧！！！',
                    '<25>{#p/undyne}{#f/14}* 没有！！！'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}至少曾经是，\n直到...',
                    '<25>{#p/undyne}{#f/12}* ...我们把它给点着了。',
                    '<25>{#p/undyne}{#f/8}* BUT WHO CARES??',
                    '<25>{#p/undyne}{#f/14}* 跟Papyrus出去消遣\n  最棒了！'
                 ])
         ],
         () =>
            SAVE.data.n.plot < 48 || world.trueKills > 0
               ? [
                    '<18>{#p/papyrus}{#f/0}专家提示：\n在跟UNDYNE烹饪时...',
                    '<18>{#p/papyrus}{#f/4}如果她开始攻击蔬菜...',
                    "<18>{#p/papyrus}{#f/5}...那就该溜了。"
                 ]
               : SAVE.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/0}NICE TO SEE YOU, TOO!' ]
               : SAVE.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/4}WE'RE STILL WAITING HERE, YOU KNOW..." ]
               : SAVE.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/0}我相信她很快就\n会想出来的。",
                    "<25>{#p/undyne}{#f/14}* 你可别打包票！"
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}请叫我“消遣杂务工”。',
                    '<18>{#p/papyrus}{#f/4}我虽然没办法\n修补你的家...',
                    '<18>{#p/papyrus}{#f/9}但我还可以帮你\n“补上”美好的一天！'
                 ]
      ),
      f_blooky: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}也许有一天，\n我会过上平静的生活。",
            '<18>{#p/papyrus}{#f/5}养蜗牛，创作音乐...',
            '<18>{#p/papyrus}{#f/6}愁眉苦脸，\n不让任何人安慰我...',
            "<18>{#p/papyrus}{#f/5}转念一想，\n这个生活方式可能\n不太适合我。",
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
            "<18>{#p/papyrus}{#f/0}唉，我感觉我更适合\n当啦啦队队员。",
            '<18>{#p/papyrus}{#f/5}...而不是那个\n要别人帮忙\n安慰我的人。'
         ]
      ),
      f_snail: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}我听说有一种方法\n可以赢这个游戏...",
            '<18>{#p/papyrus}{#f/0}就是关于提供\n“及时的鼓励”。',
            '<18>{#p/papyrus}{#f/5}及时的鼓励...',
            "<18>{#p/papyrus}{#f/4}怎么说得好像还有\n【不及时的】鼓励\n一样。",
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
               ? [ '<18>{#p/papyrus}{#f/5}我要是想太多可能会\n让人不知所措...' ]
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
            '<18>{#p/papyrus}{#f/5}我经常在想为什么\n人类要把我们\n困在这里。',
            '<18>{#p/papyrus}{#f/5}我知道他们害怕\n我们，但是...',
            "<18>{#p/papyrus}{#f/6}他们就不会逃跑吗！？",
            '<18>{#p/papyrus}{#f/6}或者，跟我们谈谈，\n这不也挺好吗！！',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}很不幸，他们从来\n没有想过这些事情。" ]
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
         [ '<18>{#p/papyrus}{#f/0}至少【我】是\n想过这些的！！' ]
      ),
      f_puzzle3: pager.create(
         0,
         ...[
            () => [
               '<18>{#p/papyrus}{#f/6}我自称是谜题大师，\n但是...',
               '<18>{#p/papyrus}{#f/5}这件事我得坦白。',
               "<18>{#p/papyrus}{#f/4}...我从来没真正\n解决过这个难题。",
               "<18>{#p/papyrus}{#f/6}等等！！\n别对我太苛刻！！",
               '<18>{#p/papyrus}{#f/4}...我还没来得及试，\n他们就把它关掉了。',
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
                  ? [ '<18>{#p/papyrus}{#f/6}我知道的啊！\n所以它不公平啊！！' ]
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
            '<18>{#p/papyrus}{#f/4}如果我是你，\n我会小心这个房间...',
            '<18>{#p/papyrus}{#f/5}UNDYNE经常来这里，\n威严地站在附近。',
            "<18>{#p/papyrus}{#f/6}她不止一次吓到过我！",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}即使我让自己\n很容易被当成靶子。' ]
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
                    '<18>{#p/papyrus}{#f/4}哦，还有不知道从哪里\n冒出来的长矛陷阱。',
                    '<18>{#p/papyrus}{#f/5}也小心点那些。'
                 ]
               : [ '<18>{#p/papyrus}{#f/4}WHY DO WE EVEN BOTHER ARGUING SOMETIMES...' ]
      ),
      f_spear: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}穿过这个房间\n所花的时间...',
            '<18>{#p/papyrus}{#f/5}...好像哪次都不一样。',
            "<18>{#p/papyrus}{#f/4}有的时候很长，\n有的时候就不一样...",
            '<18>{#p/papyrus}{#f/4}有的时候我穿\n圆点图案的衣服。',
            "<18>{#p/papyrus}{#f/0}不管怎么解释好像\n都说不通。",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}说的是我刚才那句。' ]
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
               ? [ '<18>{#p/papyrus}{#f/4}我刚才没提过\n圆点图案的衣服吗？' ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S A CONSPIRACY SPANNING THE WHOLE OF THE COSMOS..." ]
      ),
      f_corner: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}这个工厂里的\n很多地方...',
            '<18>{#p/papyrus}{#f/0}...只有跳过去\n才能到达。',
            '<18>{#p/papyrus}{#f/9}就比如，这个房间\n左右的两条道！',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}我听说人类可以\n跳得很高，所以...",
                    "<18>{#p/papyrus}{#f/0}你应该不会有\n什么问题的。"
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
               ? [ '<18>{#p/papyrus}{#f/9}你能做到的！！\n我相信你！' ]
               : SAVE.data.b.f_state_kidd_betray
               ? [ '<18>{#p/papyrus}{#f/6}PERHAPS YOU SHOULD CALL BACK SOMEWHERE ELSE.' ]
               : [ '<18>{#p/papyrus}{#f/0}I APPRECATE YOU BEING SUCH A SWIFT RESCUER OF KIDS.' ]
      ),
      f_story2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}讯星真的很厉害，\n对吧？',
            '<18>{#p/papyrus}{#f/5}不过，它们会\n周期性地重置。',
            '<18>{#p/papyrus}{#f/4}在重置之前...',
            "<18>{#p/papyrus}{#f/6}等下，别的地方\n是不是也有一个\n类似的房间！？",
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
               ? [ "<18>{#p/papyrus}{#f/5}我感觉有时候\n我只是把自己的话给\n重复了一遍。" ]
               : [ "<18>{#p/papyrus}{#f/5}SOMETIMES I WONDER IF WE'RE ALL JUST GOING IN CIRCLES." ]
      ),
      f_pacing: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}这个房间真的\n没什么可说的。",
            '<18>{#p/papyrus}{#f/4}它的存在只会让你\n走得越来越远，',
            '<18>{#p/papyrus}{#f/5}朝着出口\n一步一步迈出...',
            '<18>{#p/papyrus}{#f/4}充满了彻底的、\n无休止的悬念。',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/14}* That about sums it up.' ])
         ],
         [ '<18>{#p/papyrus}{#f/7}彻底的！\n无休止的！！\n悬念！！！' ]
      ),
      f_battle: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}在这个房间里，\n你会看到\nUNDYNE的巨塔。",
            '<19>{#p/papyrus}{#f/9}那是由一颗古老\n小行星的残骸\n做成的！',
            "<18>{#p/papyrus}{#f/5}她总是在上面摆姿势...",
            '<18>{#p/papyrus}{#f/4}然后喃喃自语...',
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
               ? [ "<18>{#p/papyrus}{#f/0}她可能有什么\n必须要记住的东西吧。" ]
               : [ '<18>{#p/papyrus}{#f/9}FOR THE RECORD, I LOVE A GOOD PRE- PLANNED SPEECH!!' ]
      ),
      f_exit: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}这个储液罐是\n专门放在这里的...',
            '<18>{#p/papyrus}{#f/0}因为某个皇家守卫\n队长觉得...',
            "<18>{#p/papyrus}{#f/4}把她的巨型\n喷气背包...",
            '<18>{#p/papyrus}{#f/5}带到一个充满静电的地方\n是很安全的。',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}...把静电全吸收掉是\n非常，非常危险的！！' ]
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
                    '<18>{#p/papyrus}{#f/0}我只想用一个字来\n评价那个守卫队长。',
                    '<18>{#p/papyrus}{#f/4}那个字就是\n“注意看好路”。'
                 ]
               : [ "<18>{#p/papyrus}{#f/5}I WORRY FOR UNDYNE'S SAFETY." ]
      ),
      f_napstablook: pager.create(
         0,
         () =>
            SAVE.data.n.plot <= 48.1 && SAVE.data.n.state_foundry_blookdate < 2
               ? [
                    "<18>{#p/papyrus}{#f/0}所以你跟一个幽灵\n交上朋友了。",
                    '<18>{#p/papyrus}{#f/1}你交友的范围是不是\n有点太宽泛了！？！？',
                    ...(solo()
                       ? [ '<18>{#p/papyrus}{#f/6}你的实力真的\n太让人害怕了！！' ]
                       : [
                            "<25>{#p/undyne}{#f/14}* So that's how they were able to befriend me.",
                            "<25>{#p/undyne}{#f/17}* You could have WARNED me, Papyrus!!\n* There's no escape now!",
                            '<18>{#p/papyrus}{#f/6}FRIENDSHIP IS NOT THE KIND OF SHIP YOU BAIL OUT ON!!'
                         ])
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}嗯...',
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
                  ? [ '<18>{#p/papyrus}{#f/5}小心点灵质就行。' ]
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
                            '<18>{#p/papyrus}{#f/4}嗯...',
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
                    '<18>{#p/papyrus}{#f/6}好好说话！！'
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
                    '<18>{#p/papyrus}{#f/4}嗯...',
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
         name: '星港 - 停靠港',
         text: () =>
            SAVE.data.n.plot < 29
               ? world.edgy
                  ? [ '<32>{#p/human}* （有个骷髅没有出现，\n  这使你充满了决心。）' ]
                  : [ "<32>{#p/human}* （那对骷髅兄弟的滑稽互动\n  使你充满了决心。）" ]
               : papreal() || world.runaway
               ? [ '<32>{#p/human}* (The box is so lonely, it fills you with determination anyway.)' ]
               : [ '<32>{#p/human}* (The box can rest easy now.)\n* (This, of course, fills you with determination.)' ]
      },
      s_pacing: {
         name: '星港 - 月岩小路',
         text: () =>
            world.runaway || epilogueOverride(world.population < 6) || world.genocide || roomKills().s_pacing > 1
               ? SAVE.data.n.plot < 29
                  ? [ '<32>{#p/human}* （星光黯淡了。）\n* （不知为何，你充满了决心。）' ]
                  : [ '<32>{#p/human}* （群星不再闪耀。）\n* （当然，这使你充满了决心。）' ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The frivolous arguments once had in this room have ceased.)',
                    '<32>* （这使你充满了决心。）'
                 ]
               : [
                    '<32>{#p/human}* （月岩商人在前景里\n  轻浮地争论着。）',
                    '<32>* （这使你充满了决心。）'
                 ]
      },
      s_spaghetti: {
         name: '星港 - 意面枢纽',
         text: () =>
            [
               [ '<32>{#p/human}* （一盘违反物理定律的意大利面\n  使你充满了决心。）' ],
               [
                  '<32>{#p/human}* （现在，这盘意大利面\n  也遵循物理规律了。）',
                  '<32>{#p/human}* （这使你充满了决心。）'
               ],
               [ '<32>{#p/human}* （意大利面没了。）', '<32>{#p/human}* （这使你充满了决心。）' ]
            ][trueSpaghettiState()]
      },
      s_town1: {
         name: '星港 - 小镇',
         text: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The town may be abandoned, but its cuteness remains.)',
                    '<32>{#p/human}* （这使你充满了决心。）'
                 ]
               : papreal() || world.runaway
               ? [ '<32>{#p/human}* (A shadow looms over town, filling you with determination.)' ]
               : [ '<32>{#p/human}* （这个可爱的小镇\n  使你充满了决心。）' ]
      }
   }
};


// END-TRANSLATE
