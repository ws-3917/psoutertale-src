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
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* 標準規格的長焦望遠鏡，皇家出品。\n* 251X年前後製成。' ]),
         choicer.create('* （使用望遠鏡？）', '是', '否')
      ],
      telescopeMeetup1: [ '<25>{#p/kidd}{#f/2}* 你在看星星嗎？' ],
      telescopeMeetup2: [
         '<25>{#p/kidd}{#f/1}* 喲... 我打賭\n  你肯定看到了很酷的東西。',
         '<25>{#f/7}* 上次我用望遠鏡的時候，\n  我甚至看到了一顆超新星！'
      ],
      telescopeMeetup3: [
         '<25>{#p/kidd}{#f/3}* 給。\n* 拿上這個。',
         '<32>{#s/equip}{#p/human}* （你把高級會員卡\n  掛到了鑰匙串上。）',
         '<25>{#p/kidd}{#f/7}* 現在你可以使用\n  任何望遠鏡了，\n  連「最高級」的都能用！',
         '<25>{#f/1}* 那個矮骷髏之前\n  給了我好多這個。',
         '<25>{#f/2}* 他甚至花了很多錢\n  送了我一些數字藏品...',
         '<25>{#f/1}* 我猜他真的很喜歡我，哈哈。'
      ],
      telescopeMeetup4: [
         '<25>{#p/kidd}{#f/3}* 總之，我剛才給了你一張券。',
         '<25>{#f/1}* 希望你能看到更酷的東西！'
      ],
      telescopeMeetup5: [ "<25>{#p/kidd}{#f/1}* 我要回鎮上了！" ],
      telescope2: () =>
         SAVE.data.b.svr
            ? [ '<25>{#p/asriel1}{#f/17}* 看到什麼喜歡的東西了嗎？' ]
            : SAVE.data.b.oops || SAVE.data.b.s_state_chargazer
            ? [ '<32>{#p/basic}* 在太空中觀星...\n  確實，這也是種打破\n  思維定勢的想法。' ]
            : ((SAVE.data.b.s_state_chargazer = true),
              [
                 '<32>{#p/basic}* ...',
                 '<32>* 以前，我和艾斯利爾就有一架\n  這樣的望遠鏡。',
                 "<32>* 我們把鏡筒對著\n  天空的各個角落，\n  期待能發現意想不到的驚喜...",
                 '<32>* ...可惜，希望總是落空。',
                 "<32>* 儘管觀星收穫寥寥，\n  但艾斯利爾並不在意...",
                 '<32>* 我挖空心思從星空尋找寶藏。\n  但對他而言...\n  我的陪伴才是真正的「寶藏」。',
                 '<32>* ...',
                 '<32>{#p/human}* （你聽到一聲嘆息。）',
                 "<32>{#p/basic}* ...唉，別在意。\n  咱們繼續幹正事吧。"
              ]),
      notv: [ "<32>{#p/basic}* 沒什麼好看的。" ],
      nicecreamScoreReaction1a: [ '<32>{#p/basic}* 第一次嘗試還不錯...' ],
      nicecreamScoreReaction1b: [ '<32>{#p/basic}* 第一次嘗試還不錯。' ],
      nicecreamScoreReaction2a: [ '<32>{#p/basic}* 你可以做得更好的。' ],
      nicecreamScoreReaction2b: [ '<32>{#p/basic}* 你可以做得更好的。' ],
      nicecreamScoreReaction3a: [
         "<32>{#p/basic}* 你打破了紀錄...？\n* 我還從來沒見過有人這麼做..."
      ],
      nicecreamScoreReaction3b: [
         "<32>{#p/basic}* 你打破了紀錄...？\n* 我還從來沒見過有人這麼做！"
      ],
      nicecreamScoreReaction4a: [ '<33>{#p/basic}* 看起來你真的很擅長...' ],
      nicecreamScoreReaction4b: [ '<32>{#p/basic}* 看起來你真的很擅長。' ],
      nicecreamScoreReaction5a: [ '<32>{#p/basic}* 你打破了你的紀錄...？' ],
      nicecreamScoreReaction5b: [ '<32>{#p/basic}* 看，新紀錄！' ],
      nicecreamScoreReaction6a: [ '<32>{#p/basic}* 有那麼一瞬間，我以為你打破了記錄...' ],
      nicecreamScoreReaction6b: [
         "<32>{#p/basic}* 哇喔，你差點就破紀錄了！\n* 你能堅持下去嗎？"
      ],
      nicecreamScoreReaction7a: [ '<32>{#p/basic}* 看起來你需要一些練習...' ],
      nicecreamScoreReaction7b: [ '<32>{#p/basic}* 看起來你需要一些練習。' ],
      nicecreamScoreReaction8a: [ "<32>{#p/basic}* 更好了..." ],
      nicecreamScoreReaction8b: [ "<32>{#p/basic}* 這才像話。" ],
      nicecreamScoreReaction9a: [
         '<32>{#p/basic}* 你第一次嘗試就打破了紀錄...？\n* 世界上竟然...'
      ],
      nicecreamScoreReaction9b: [ "<32>{#p/basic}* 你第一次嘗試就打破了紀錄...？\n* 你真是個天才！" ],
      nicecreamScoreReaction10a: [ "<32>{#p/basic}* 就第一次嘗試來說，這已經很好了..." ],
      nicecreamScoreReaction10b: [ "<32>{#p/basic}* 就第一次嘗試來說，這已經很好了！" ],
      nicecreamScoreReaction11a: [ '<32>{#p/basic}* 就要快了...' ],
      nicecreamScoreReaction11b: [ '<32>{#p/basic}* 天哪，你幾乎快破紀錄了...\n* 你能做到的！' ],
      noteleport: [ "<32>{#p/human}* （似乎是沒電了。）" ],
      evac: [ '<32>{#p/human}* （你感覺周圍的怪物越來越少了。）' ],
      shopclosed: [ '<32>{#p/human}* （沒必要再踏足了。）' ],
      jukebox0: [ "<32>{#p/basic}* 不能使用了。" ],
      jukebox1: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* （你去碰點唱機...）'
            : "<32>{#p/basic}* 點唱機只放你聽過的音樂。",
         choicer.create(
            '* （放一首音樂嗎？）',
            SAVE.data.b.napsta_performance ? '曲目01' : '？？？',
            2 <= SAVE.data.n.state_foundry_swansong ? '曲目02' : '？？？',
            2 <= SAVE.data.n.state_starton_trashprogress ? '曲目03' : '？？？',
            '取消'
         )
      ],
      jukebox1x1: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （但是你不能放你不知道的音樂。）" ]
            : [ "<32>{#p/basic}* 封面中一個詭異的DJ在人群中演奏。\n* 你看不出來是什麼音樂。" ],
      jukebox1x2: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （但是你不能放你不知道的音樂。）" ]
            : [ "<33>{#p/basic}* 封面中一個幽靈一樣的DJ在電腦前。\n* 你看不出來是什麼音樂。" ],
      jukebox1x3: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （但是你不能放你不知道的音樂。）" ]
            : [
                 "<32>{#p/basic}* 封面中是一隻被垃圾包圍著的小白狗。\n* 你看不出來是什麼音樂。"
              ],
      jukebox1y: [ '<32>{*}{#p/human}* （你選擇了一張光碟...）{^40}{%}' ],
      jukebox2: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* （聽起來像是一首正在播放的音樂。）'
            : [
                 '<32>{#p/basic}* 現在播放的是「曲目01」',
                 '<32>{#p/basic}* 現在播放的是「曲目02」',
                 '<32>{#p/basic}* 現在播放的是「曲目03」'
              ][SAVE.data.n.state_starton_jukebox - 1],
         choicer.create('* （停止播放嗎？）', '是', '否')
      ],
      jukebox3a1: [ "<32>{#p/basic}{#npc/a}* 這就對了！" ],
      jukebox3a2: [ '<32>{#p/basic}{#npc/a}* （我們都喜歡這種音樂。）' ],
      jukebox3b: [ '<32>{#p/basic}{#npc/a}* 這音樂在舞蹈俱樂部裡面流行嗎？' ],
      jukebox3c: [
         '<32>{#p/basic}* ...\n* ...\n* ...',
         "<32>{#npc/a}* 烤爾比說他曾經在哪聽過這首歌。"
      ],
      jukebox3d: [
         '<32>{#p/basic}{#npc/a}* 你肯定很懂音樂，孩子...',
         '<32>* You must be really tasty.'
      ],
      shockpapyrus0a: [
         '<15>{#p/papyrus}{#e/papyrus/27}我克-\n這裡發生啥了？？',
         '<15>{#p/papyrus}{#e/papyrus/21}剛才我在陽臺，\n有個電話打過來\n叫我來這...',
         '<15>{#p/papyrus}{#e/papyrus/19}結果就看到你倆！？',
         "<15>{#p/papyrus}{#e/papyrus/14}告訴你們，我可是\n皇家衛隊的預備隊員！",
         '<15>{#p/papyrus}{#e/papyrus/15}不管你倆\n想幹什麼...'
      ],
      shockpapyrus0b: [
         '<15>{#p/papyrus}{#e/papyrus/24}...等等，這個聲音...',
         '<15>{#p/papyrus}{#e/papyrus/22}原來喊我來這的\n就是你啊！？'
      ],
      shockpapyrus0c: [
         '<15>{#p/papyrus}{#e/papyrus/20}...對！\n這就說得通了！',
         "<15>{#p/papyrus}{#e/papyrus/10}那...\n很高興認識你。",
         '<15>{#p/papyrus}{#e/papyrus/24}說實話，\n你長得有點像...',
         '<15>{#p/papyrus}{#e/papyrus/20}...嘿，等一下！！',
         '<15>{#p/papyrus}{#e/papyrus/22}你帶了個【人類】\n過來嗎！？！？',
         '<15>{#p/papyrus}{#e/papyrus/10}哇！！\n今天好事連連啊！！',
         '<15>{#p/papyrus}{#e/papyrus/20}話說回來，\n你喊我來這幹嘛呢？'
      ],
      shockpapyrus1: () =>
         [
            [
               '<32>{#p/asriel2}* 準備好了嗎，$(name)？',
               choicer.create('* （艾斯利爾應該怎麼做？）', '仁慈', '行動', '魔法', '戰鬥')
            ],
            [ "<32>{#p/asriel2}* 我們速戰速決吧。" ]
         ][Math.min(SAVE.flag.n.ga_asrielPapyrus, 1)],
      shockpapyrus2a: [
         '<32>{#p/asriel2}* 仁慈，嗯？',
         '<32>{#p/asriel2}* 仁慈...？\n  這真是個好聽的詞。',
         '<32>{#p/asriel2}* 那咱們就給他來點「仁慈」吧。'
      ],
      shockpapyrus2b: [
         "<32>{#p/asriel2}* 行動...？\n* 看好了，什麼才叫行動。",
         '<32>{#p/asriel2}* 首先，舉起手臂...',
         '<32>{#p/asriel2}* 接著...！'
      ],
      shockpapyrus2c: [
         '<32>{#p/asriel2}* 魔法，\n  它可化為紐帶，\n  讓怪物們團結一心。',
         '<32>{#p/asriel2}* 不過，反過來...',
         '<33>{#p/asriel2}* 它也能成為利刃，\n  刺穿他們的肉體。'
      ],
      shockpapyrus2d: [ '<32>{#p/asriel2}* 戰鬥... 真是不二之選。', '<32>{#p/asriel2}* 嘻嘻嘻...' ],
      sansDeath1: [ "<15>{#p/papyrus}{#e/papyrus/27}衫斯！\n你受傷了！" ],
      sansDeath2: [ "<20>{#p/sans}帕派瑞斯，\n我不是讓你待在家裡嗎？", '{*}{#e/papyrus/21}{%}' ],
      sansDeath3: [ "<20>{#p/sans}...別擔心，兄弟。\n這只是我最喜歡的\n雅莫萬用醬。", '{*}{#e/papyrus/26}{%}' ],
      sansDeath4: [ "<15>{#p/papyrus}{#e/papyrus/21}但你真的\n傷得很重..." ],
      sansDeath5: [
         "<20>{#p/sans}是啊，因為「不祥的預感」\n就離開家亂跑，\n就是這下場。",
         '<20>{#p/sans}...這樣的傷口，\n應該是沒辦法了。',
         '{*}{#e/papyrus/21}{%}'
      ],
      sansDeath6: [
         '<20>{#p/sans}看樣子...',
         "<20>恐怕...\n只能陪你到這了。",
         '<20>...',
         '<20>只是...',
         "<20>答應我，哪怕我不在，\n你也要好好活下去，\n兄弟。",
         "<20>答應我，你還會做\n那個最-{^5}最棒的你。",
         '<20>...',
         '<20>畢竟...'
      ],
      sansDeath7: [ "<20>{|}{#p/sans}你可是...\n偉大的帕-{^5}帕派瑞斯。" ],
      sansDeath8: [ '<15>{#p/papyrus}{#e/papyrus/33}不-不...{^40}{%}' ],
      fast_food1: () => [
         SAVE.data.b.fryz
            ? "<32>{#p/human}{#npc}* （你拿走了烈焰烤爾比。）"
            : '<32>{#p/human}{#npc}* （你拿走了三個小漢堡。）'
      ],
      fast_food2: [ "<32>{#p/human}{#npc}* （你帶的東西太多了。）" ],
      aussie: pager.create(
         0,
         () =>
            SAVE.data.n.state_starton_trashprogress < 1
               ? [
                    '<25>{#p/sans}{#f/0}* 終於。',
                    "<25>{#f/3}* 我一直在想你\n  什麼時候會出現呢。",
                    '<25>{#f/0}* 不知道你還記不記得，\n  當我們第一次\n  見面的時候...',
                    '<25>{#f/0}* 我告訴帕派瑞斯遇到困難\n  負「重力」爭才能致遠。',
                    '<25>{#f/0}* 你問我是什麼意思？',
                    '<25>{#f/3}* 嗯。',
                    "<25>{#f/2}* 你馬上就{@fill=#003cff}知道{@fill=#fff}了。"
                 ]
               : [ '<25>{#p/sans}{#f/0}* 歡迎回來。', '<25>{#f/2}* 準備好知道等待你的\n  是什麼了嗎？' ],
         () =>
            SAVE.data.n.state_starton_trashprogress < 1
               ? [ '<25>{#p/sans}{#f/0}* 來嘛，過來看看。', "<25>{#f/2}* 就在上面呢，小鬼頭。" ]
               : [ "<25>{#p/sans}{#f/2}* 就在上面呢，小鬼頭。" ],
         () =>
            SAVE.data.n.state_starton_trashprogress < 2
               ? [ "<25>{#p/sans}{#f/2}* 別擔心，那東西\n  一點也不危險... 雖然\n  看起來讓人感覺很危險。" ]
               : [ '<25>{#p/sans}{#f/2}* 多謝你的幫助。' ]
      ),
      trashhunt1: [
         '<25>{#p/sans}{#f/0}* 所-以...\n  你現在是怎麼想的？',
         '<25>{#f/3}* 我管這個叫「垃圾星球」。',
         "<25>{#f/0}* ...事實上，這東西的體積\n  已經有段時間在一直\n  變大了。",
         '<25>{#f/0}* 要是再繼續大下去，\n  那...',
         "<25>{#f/2}* 我只能說要有\n  {@fill=#ff0}倒懸{@fill=#fff}之急了。",
         "<25>{#f/0}* 但別擔心。\n* 有了你的幫助，\n  它很快就會消失的。",
         '<25>{#f/2}* 我還給你找了首音樂，\n  能讓你更有動力。'
      ],
      trashhunt2: '* 反覆按[Z]，\n  清走所有垃圾！',
      trashhunt3: () => [
         '<25>{#p/sans}{#f/3}* 哇。\n* 一氣呵成，是吧？',
         "<25>{#f/2}* ...我真是佩服到絕倒了。",
         '<25>{#f/0}* 感覺我得給你點什麼\n  作為回報。',
         '<25>{#f/0}* ...\n* 給。\n* 把這個拿上。',
         '<32>{#p/human}* （衫斯丟給你了一樣東西。）',
         ...(SAVE.storage.inventory.size < 8
            ? [ '<32>{#s/equip}{#p/human}* （你獲得了玉狗聖劍。）', '<25>{#p/sans}{#f/2}* 好好用它。' ]
            : [
                 "<32>{#p/human}* （你帶的東西太多了。）",
                 '<25>{#p/sans}{#f/3}* 沒空間了，嗯？',
                 "<25>{#p/sans}{#f/2}* 沒關係。\n* 等你有空間了，\n  就來我房間拿。"
              ])
      ],
      gravo1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你好奇地打量\n  這個不知道幹什麼用的裝置。）',
                 ...[ [ "<25>{#p/asriel1}{#f/17}* 真可惜啊，我們沒有\n  這東西的遙控器。" ], [] ][
                    Math.min(asrielinter.gravo1++, 1)
                 ]
              ]
            : [ '<32>{#p/basic}* 這是個「重力轉換器」。', '<32>* 管它什麼意思。' ],
      gravo3: () => [
         '<32>{#p/human}* （你嘗試用遙控器\n  激活重力轉換器。）\n* （什麼都沒發生。）',
         ...(SAVE.data.b.svr
            ? [ [ "<25>{#p/asriel1}{#f/21}* 他們可能正在關掉\n  那些非必要裝置。" ], [] ][
                 Math.min(asrielinter.gravo3++, 1)
              ]
            : [ '<32>{#p/basic}* 它肯定離線了...' ])
      ],
      gravo2: [ '<32>{#p/human}* （你用遙控器激活了重力轉換器。）' ],
      sansdoor1: () =>
         SAVE.data.b.svr || world.runaway
            ? [ '<32>{#p/human}* （被封死了。）' ]
            : [ "<32>{#p/basic}* 鎖住了。" ],
      sansdoor2: [ '<32>{#p/human}* （你用骨鑰打開了房門。）' ],
      sanscab1: () => [
         ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* 信封裡有個奇怪的遙控器。" ]),
         '<32>{#s/equip}{#p/human}* （你把重力轉換器的遙控器\n  掛到了鑰匙串上。）'
      ],
      sanscab2: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （你已經把信封裡的東西\n  全拿走了。）' ]
            : [ "<32>{#p/basic}* 只是個空信封。" ],
      sanscab3: () => [
         ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* 信封裡有個奇怪的... 東西。" ]),
         SAVE.storage.inventory.size < 8
            ? '<32>{#s/equip}{#p/human}* （你獲得了玉狗聖劍。）'
            : "<32>{#p/human}* （你帶的東西太多了。）"
      ],
      cream_get: [ '<32>{#p/human}* （你得到了冰意靈。）' ],
      cream_deny: [ '<32>{#p/basic}* 什麼都沒有。' ],
      cream_full: [ "<32>{#p/human}* （你帶的東西太多了。）" ],
      cream_get_archive: [
         '<32>{#p/human}* （你把手伸進了冰淇淋車。）',
         '<32>{#p/human}{#s/equip}* （你得到了冰意靈。）'
      ],
      cream_empty_archive: [ '<32>{#p/human}* （你把手伸進了冰淇淋車。）', '<32>{#p/human}* （...）' ],
      cream_full_archive: [ "<32>{#p/human}* （你帶的東西太多，\n  不方便把手伸進去。）" ],
      bunbun: pager.create(
         0,
         () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* 媽媽說我們很快就要去新家園了。", "<32>* ... 新家園是什麼啊？" ]
               : [
                    '<32>{#p/basic}* 媽媽說，睡覺可以把你的\n  生命值恢復到{@fill=#ff0}HP上限以上{@fill=#fff}。',
                    "<32>* ...HP上限是什麼啊？"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* 人類也有家園嗎？' ]
               : [ '<32>{#p/basic}* 這是母親才有的東西嗎？' ]
      ),
      emptytable1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （這張桌子讓你感到很孤獨。）' ]
            : [ "<32>{#p/basic}* 只是張孤零零的桌子。\n* 上面有糖霜的味道。" ],
      emptytable2: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （這張桌子讓你感到很孤獨。）' ]
            : [ "<32>{#p/basic}* 一張孤零零的桌子。\n* 上面有毛髮的味道。" ],
      balcony0: () => [ '<18>{#p/papyrus}景色不錯吧？', choicer.create('* （你要怎麼回答？）', '是', '否') ],
      balcony1: [
         "<18>{#p/papyrus}{#f/9}太好了！\n終於，有人懂這種感覺了。",
         '<18>{#f/7}幾乎就沒見過衫斯\n往窗外看風景！！！'
      ],
      balcony2: [
         "<18>{#p/papyrus}{#f/5}喔...\n好吧，沒事...",
         '<18>{#f/4}（唉...）\n起碼，你願意走出房間，\n到陽臺看看。',
         "<18>{#f/7}衫斯才不會這麼幹！！！"
      ],
      bedbook1: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （你好像有點看不懂內容。）" ]
            : [ "<32>{#p/basic}* 一本用古文寫成的書。" ],
      bedbook3a: [ '<32>{#p/basic}* 想讓我幫你讀一下嗎？' ],
      bedbook3b: [ '<32>{#p/basic}* 再讀一遍？' ],
      bedbook4: () => [ choicer.create('* （讓$(name)給你讀一下嗎？）', '是', '否') ],
      bedbook5: [
         '<32>{#p/basic}* 好，我看看...',
         '<32>* 「很久很久以前，\n   太陽系由兩個種族統治著：\n   人類和怪物。」',
         '<32>* 「起初，怪物們只是造訪了一下，\n   不久就回到了他們自己的星系。」',
         '<32>* 「但是怪物們喜歡上了人類，\n   想和他們共同生活。」',
         '<32>* 「因此，他們和人類分享了他們的科技，\n   並與人類結成了同盟。」',
         '<32>* 「接下來數百年間，怪物與人類和平共處。」',
         '<32>* 「有一天，人類開始對怪物的某種東西產生恐懼...」',
         '<32>* 「一種沒有傑出的領導力\n   就會失控的恐懼。」',
         '<32>* 「隨著時間的推移，\n   兩個物種之間爆發了戰爭。」',
         '<32>* 「那時星際間會發生許多戰鬥和衝突。」',
         '<32>* 「但是人類們，\n   充滿了恐懼與決心的人類們，\n   很容易佔據了上風。」',
         '<32>* 「然後，\n   在那對未來有著重大影響的一天，\n   一件強大的武器向怪物的家園發射了。」',
         '<32>* 「在怪物們的母星被摧毀之後，\n   人類獲得了勝利。」',
         '<32>* 「兩個物種間籤訂了和約，然後...」',
         '<32>* 「剩下的怪物被驅逐到了一個廢棄的前哨站。」',
         '<32>* 「接著，人類集結了七位精英。」',
         '<32>* 「他們一同制定了一個計畫，最後...」',
         '<32>* 「一個強大的力場被建立了起來，怪物們被困在其中。」',
         "<32>* 嗯，這就是故事的內容了。"
      ],
      bedbook6: [ '<32>{#p/basic}* 好吧，如果你想讓我讀，就告訴我。' ],
      beddoor1: [ "<32>{#p/basic}{#npc/a}* 如果你想訂房間，\n  你得先問我一聲。" ],
      beddoor2: [ "<32>{#p/basic}{#npc/a}* 如果你還想訂房間，\n  你得先問我一聲。" ],
      beddoor3: [ '<32>{#p/basic}{#npc/a}* 抱歉，小傢伙！\n* 這裡已經滿人了！' ],
      candy1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* 不能使用了。" ]
            : [
                 SAVE.data.b.svr
                    ? '<32>{#p/human}* （你走近自動售貨機。）'
                    : "<32>{#p/basic}* 這是一臺專門售賣\n  高檔洋梅的自動售貨機。",
                 choicer.create('* （要花8G買洋梅嗎？）', '是', '否')
              ],
      candy2: [ "<32>{#p/human}* （你的錢不夠。）" ],
      candy3: [ "<32>{#p/human}* （你帶的東西太多了。）" ],
      candy4: [ '<32>{#p/human}* （你買了一個洋梅。）' ],
      candy5: [ '<32>{#p/human}* （你決定先不買。）' ],
      capstation1: [
         '<32>{#p/human}* （你看了眼哨站後面，\n  並發現了一把鑰匙。）',
         '<32>{#s/equip}{#p/human}* （你把生鏽的鑰匙\n  掛到了鑰匙串上。）',
         '<32>* （打開「手機」來查看\n  所有獲得的鑰匙。）'
      ],
      capstation2: [ '<32>{#p/human}* （你看了眼哨站後面。）', '<32>{#p/basic}* 沒有新東西。' ],
      crossword0: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}* 喔，你來了。',
                 '<25>{#p/sans}{#f/2}* 如果你喜歡上一個謎題的話，\n  估計這個也能合你胃口。'
              ]
            : [
                 '<18>{#p/papyrus}{#f/9}人類！！',
                 '<18>{#f/9}你已經看到\n我的謎題了。',
                 '<18>{#f/4}但你接下來\n將要看到的是...'
              ],
      crossword1: () =>
         world.edgy
            ? [
                 '<26>{#p/sans}* 其實也不需要了。\n* 走過來瞧瞧吧。',
                 "<25>{#p/sans}* 喏，它就在地上呢。"
              ]
            : [
                 "<18>{#p/papyrus}{#f/7}衫斯！！\n謎題在哪！？",
                 "<25>{#p/sans}* 就在你眼皮底下呢。",
                 '<18>{#p/papyrus}{#f/1}啥？\n就地上躺的那塊板子？',
                 '<18>{#f/4}行吧...'
              ],
      crossword2: (check: boolean) =>
         world.edgy
            ? [
                 check
                    ? '<25>{#p/sans}* 咋了？\n  謎題讓你{@fill=#ff0}鬱{@fill=#fff}罷不能嗎？'
                    : "<25>{#p/sans}* 看都不願意看一眼，是吧？",
                 "<25>* 真不該對你期望太高。",
                 '<26>{#f/3}* 好吧，\n* 說不定，數謎更適合你。',
                 '<26>{#f/0}* 跑題了。'
              ]
            : [
                 check
                    ? "<18>{#p/papyrus}{#f/7}衫斯！！！\n那根本沒有用啊！"
                    : "<18>{#p/papyrus}{#f/7}衫斯！！！\n那個人類連\n看都沒看一眼！",
                 '<25>{#p/sans}* 啊呀。',
                 "<25>{#f/3}* 我就知道我應該用\n  今天的數和謎題代替的。",
                 '<18>{#p/papyrus}{#f/1}啥！？數和！？',
                 "<18>{#f/9}我真不敢相信\n你居然會提到它！！",
                 '<18>{#f/4}在我看來...',
                 '<18>{#f/0}數獨無疑才是最難的。',
                 '<25>{#p/sans}* 什麼？你認真嗎，兄弟？\n* 那個簡單到爆的\n  數字排列組合？',
                 "<25>{#f/4}* 那是給骷髏寶寶玩的。",
                 '<18>{#p/papyrus}{#f/4}真。難以置信。',
                 '<18>{#f/9}人類！！！\n你來評評理！',
                 choicer.create('* （哪邊更難？）', '數獨', '數和')
              ],
      crossword3a: [
         '<18>{#p/papyrus}哈！哈！好！',
         '<18>要是人類也覺得\n數獨更難的話！',
         '<18>那他們一定\n非常聰明！',
         '<18>{#f/9}捏！嘿！嘿！嘿！'
      ],
      crossword3b: [
         '<18>{#p/papyrus}{#f/9}你們兩個真怪！',
         '<18>{#f/0}數和謎題\n真的太簡單了。',
         "<18>每次的解法\n都是一樣的。",
         '<18>{#f/4}我只要把每個空白鍵\n都填上字母「Z」\n就好了...',
         '<18>{#f/4}因為我\n每做一道數和...',
         '<18>{#f/9}除了打瞌睡\n我什麼都做不了！！！'
      ],
      crossword3c: [
         '<25>{#p/sans}{#f/3}* 順便提一嘴，\n  我之前看到有兩隻狗\n  在這邊跑來跑去...',
         "<25>{#f/0}* 如果我是你的話，\n  我會小心點的。"
      ],
      crossword4a: pager.create(0, [ '<25>{#p/sans}* 嘿，你要去哪，小子？' ], [ '<25>{#p/sans}* 回來。' ]),
      crossword4b: pager.create(0, [ "<25>{#p/sans}* 你認真？\n* 也沒那麼難吧。" ], [ '<25>{#p/sans}* 你認真？' ]),
      crossword5a: [
         '<25>{#p/sans}* 感謝你為了安撫我兄弟\n  回答說「數獨更難」。',
         '<25>{#f/4}* 昨天他還試圖「破解」\n  星象圖，結果被難住了呢。'
      ],
      crossword5b: [
         '<25>{#p/sans}* 帕派瑞斯...\n* ...他總會在令人\n  意想不到的地方碰壁。',
         '<25>{#f/4}* 昨天他還試圖「破解」\n  星象圖，結果被難住了呢。'
      ],
      crossword6a: [
         "<25>{#p/sans}{#f/3}* 我早就料到\n  你會直接跳過的。",
         "<25>{#f/0}* 這不就是你碰到謎題時\n  常用的伎倆麼？"
      ],
      crossword6b: [
         "<25>{#p/sans}{#f/3}* 挺驚訝的。\n* 我以為你會看都不看一眼\n  直接跳過。",
         "<25>{#f/2}* 也許，你還沒有爛到骨子裡。"
      ],
      crossword6c: [ '<25>{#p/sans}{#f/2}* heheh, made you look.' ],
      crossword6d: [
         "<25>{#p/sans}{#f/3}* 挺驚訝的。\n* 我以為你壓根不感興趣。",
         "<25>{#f/2}* 也許，你還沒有爛到骨子裡。"
      ],
      doggo1: [
         '<32>{#p/basic}* 好像有啥動了下？\n* 是我的錯覺嗎？',
         '<32>* 如果確實有什麼在動...\n* 比如說，一個人類...',
         "<32>* 我絕不會讓他\n  再從我眼皮子底下溜走！"
      ],
      doggo2: [
         [
            "<32>{#p/basic}* 有什麼沒-沒-沒在動的東西...\n* 摸-摸-摸了我...！",
            "<32>* 我得吃點狗糧壓壓驚。"
         ],
         [ '<32>{#p/basic}* 啊？不-不-不知道從哪\n  突然冒出來了個扳手！？！？', '<32>{#p/basic}* ...真是奇妙的一天！' ],
         [],
         [
            '<32>{#p/basic}* 有-有個人類突-突然過來...\n  揍了我一頓...！',
            "<32>{#p/basic}* 我...\n* 我去休息了。"
         ]
      ],
      doggo3: pager.create(
         0,
         [ '<32>{#p/basic}* 你好？\n* 有人在嗎...？' ],
         [ '<32>{#p/basic}* 你倆是在整我嗎？\n* 真好笑啊，夥計。' ],
         [ '<32>{#p/basic}* 大塊頭？\n* 是你嗎？\n* 拜託...' ],
         [ "<32>{#p/basic}* 嗯，看來並不是那個\n  高個子骷髏...\n* 他太吵了。" ],
         [ '<32>{#p/basic}* 我不管你是誰，趕緊停下！！！' ],
         [ '<32>{#p/basic}* ...' ]
      ),
      doggo3x: [ '<32>{#p/basic}* (Snore... snore...)' ],
      drop_chip: [
         '<32>{#p/basic}* 你剛剛是不是...\n  把我給你的晶片給扔了？',
         '<32>* 我真無語了...\n* 給我滾！'
      ],
      drop_cream: [ "<32>{#p/basic}* You know, you're lucky I'm busy advertising." ],
      eat_chip: [
         '<32>{#p/basic}* 你剛剛是不是...\n  把我給你的晶片給吃了？',
         '<32>* 我真無語了...\n* 給我滾！'
      ],
      eat_cream: [ '<32>{#p/basic}* 很開心你可以暢享冰意靈！\n* 非常開心！' ],
      genotext: {
         asriel1: () =>
            [ [ '<25>{#p/asriel2}{#f/9}* 跟我走就行。' ], [ '<25>{#p/asriel2}{#f/16}* 走吧。' ] ][
               Math.min(SAVE.flag.n.ga_asriel1++, 1)
            ],
         asriel2: () =>
            [
               [ "<25>{#p/asriel2}{#f/2}* 哎，前面站著的，\n  不是偉大的帕派瑞斯嗎？" ],
               [ '<25>{#p/asriel2}{#f/3}* 嗯... 再來一次吧。' ]
            ][Math.min(SAVE.flag.n.killed_sans, 1)],
         asriel3: () =>
            [
               [ "<25>{#p/asriel2}{#f/1}* 咱們去做個「自我介紹」，\n  怎麼樣？" ],
               [ '<25>{#p/asriel2}{#f/4}* 你知道該幹什麼。' ]
            ][Math.min(SAVE.flag.n.killed_sans, 1)],
         asriel4: [ '<25>{*}{#p/asriel2}{#f/5}* 哈囉！{^5}{%}' ],
         asriel5: [ '<18>{*}{#p/papyrus}{#f/1}幹啥- {%}' ],
         asriel6: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/13}* 嘿... $(name)...',
                  '<25>{#f/17}* 要不，從現在開始\n  你來動手吧？',
                  "<25>{#f/15}* 我... 我沒事，真沒事。",
                  "<25>{#f/16}* 我只是覺得，\n  幹這活，你比我更擅長...",
                  "<25>{#f/17}* 對，就是這個原因！\n* 這種事，肯定你來做更合適。"
               ],
               [ "<25>{#p/asriel2}{#f/16}* 呃，好吧。\n* ...之後你來動手。" ],
               [ '<25>{#p/asriel2}{#f/15}* 那麼... 前進吧？' ],
               [ '<25>{#p/asriel2}{#f/15}* ...' ]
            ][Math.min(SAVE.flag.n.ga_asriel6++, 3)],
         asriel9: [ "<25>{#p/asriel2}{#f/8}* 噓，等一下，\n  看看他會做些什麼。" ],
         asriel10: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/15}* 哇，\n  帕派瑞斯這麼頹廢的樣子...',
                  "<25>{#f/16}* 我真是頭一次見到。",
                  '<25>{#f/13}* 嘿，$(name)...',
                  "<25>{#f/1}* 我感覺接下來有好戲看了。"
               ],
               [ '<25>{#p/asriel2}{#f/16}* 真是可憐。' ]
            ][Math.min(SAVE.flag.n.ga_asriel10++, 1)],
         asriel17: () =>
            [ [ "<25>{#p/asriel2}{#f/16}* 天吶，$(name)...\n  有些怪物就是聽不懂話。" ], [ '<25>{#p/asriel2}{#f/4}* 切。' ] ][
               Math.min(SAVE.flag.n.ga_asriel17++, 1)
            ],
         asriel24: () =>
            [ [ '<25>{#p/asriel2}{#f/4}* 真是浪費時間。' ], [ '<25>{#p/asriel2}{#f/3}* 呵呵。' ] ][
               Math.min(SAVE.flag.n.ga_asriel24++, 1)
            ],
         asriel26: () =>
            [
               [
                  "<26>{#p/asriel2}{#f/3}* 好了，那群蠢狗\n  已經全軍覆沒了。",
                  '<26>{#p/asriel2}{#f/4}* 再過一座橋，就到小鎮了。',
                  '<25>{#f/1}* ...跟我來。'
               ],
               [ '<25>{#p/asriel2}{#f/3}* 我們去鎮上。' ]
            ][Math.min(SAVE.flag.n.ga_asriel26++, 1)],
         asriel28: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* 好，$(name)，\n  現在整個鎮子都是你的了。",
                  "<25>{#f/7}* 而我要去忙點別的事，\n  之後會派上用場。",
                  "<25>{#f/1}* 別擔心，我去去就回。"
               ],
               [ '<25>{#p/asriel2}{#f/1}* 鎮子出口見。' ]
            ][Math.min(SAVE.flag.n.ga_asriel28++, 1)],
         asriel29: () =>
            [
               SAVE.data.b.papyrus_secret
                  ? [
                       '<25>{#p/asriel2}{#f/2}* 嘻。\n* 嘻。\n* 嘻....',
                       "<25>{#f/10}* ...等等，帕派瑞斯在哪？",
                       '<25>{#f/10}* ...',
                       "<25>{#f/4}* 天吶，$(name)，\n  沒想到你下手這麼快。"
                    ]
                  : [
                       '<25>{#p/asriel2}{#f/2}* 嘻。\n* 嘻。\n* 嘻....',
                       "<25>{#f/1}* 天吶，那個蠢骨頭\n  那麼想原諒你...",
                       '<25>{#f/13}* 最後還是嘗到了仁慈的後果。',
                       "<25>{#f/16}* 不過，先別管他了。",
                       "<25>{#f/1}* 一會，咱們還要拉長線，\n  釣大魚呢。"
                    ],
               [ '<25>{#p/asriel2}{#f/13}* 哎呀，這蠢骷髏\n  又白白送死了。' ],
               [
                  "<25>{#p/asriel2}{#f/13}* 俗話說，好鐵要經三回爐。",
                  '<25>{#f/16}* 但很遺憾，他一回就不行了。'
               ],
               [
                  "<25>{#p/asriel2}{#f/6}* 你已經殺了他四次了。",
                  "<25>{#f/8}* 看來你很享受這種快感啊..."
               ],
               [ '<25>{#p/asriel2}{#f/15}* 又來...？' ]
            ][Math.min(SAVE.flag.n.ga_asriel29++, 4)],
         asriel30: () => [
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#f/1}* 哈囉，艾斯利爾。',
            '<25>{#f/2}* ...',
            '<25>{#f/3}* 我們談一下吧。',
            ...[
               [
                  '<25>{#p/asriel2}{#f/6}* 談談？\n* 跟你有什麼好談的？',
                  '<25>{#f/6}* 還有，你怎麼在這？',
                  "<25>{#f/7}* 既然早晚我都要\n  把你送到閻王跟前...",
                  '<25>{#f/8}* 那不如... {%15}'
               ],
               [
                  "<25>{#p/asriel2}{#f/8}* 你想談談？\n* 別來浪費我的時間。",
                  "<25>{#f/6}* 放個全息投影，還想蒙我？",
                  '<25>{|}{#p/asgore}{#f/5}* 你怎麼- {%}',
                  '<25>{#p/asriel2}{#f/1}* 少問。'
               ]
            ][Math.min(SAVE.flag.n.ga_asriel30x, 1)]
         ],
         asriel30a: [
            '<25>{#p/asriel2}{#f/8}* 開玩笑嗎？\n* 這只是個全息投影？',
            '<25>{#f/6}* 我知道你是個懦夫，\n  可你竟然還能慫出個新境界。'
         ],
         asriel30b: [
            '<25>{#p/asgore}{#f/1}* 你就沒有更重要的事可做嗎？',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{|}{#p/asgore}{#f/3}* 聽著，兒子，我只是- {%}',
            "<25>{#p/asriel2}{#f/7}* 我不是你兒子。\n* 我早就不是你兒子了。",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/1}* 好吧，艾斯利爾。\n* 你知不知道自己\n  正變成什麼樣？',
            "<25>{#f/2}* 鐵石心腸，罪不可赦...",
            "<25>{#p/asriel2}{#f/8}* 哼，別裝的好像\n  你很在乎我似的，爹。",
            '<25>{#p/asgore}{#f/5}* ...',
            '<25>{#p/asriel2}{#f/9}* 不好意思，\n  剛不該叫你「爹」的，\n  艾斯戈爾。',
            '<25>{#f/1}* 真是抱歉。',
            '<25>{#p/asgore}{#f/3}* ...\n* 開玩笑吧...',
            '<25>{#f/5}* 好好想想你的所作所為，\n  這可不是為了我們...',
            '<25>{#f/6}* 是為了你好！',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{#p/asriel2}{#f/7}* ...讓我緩緩。',
            "<26>{#f/6}* 顯然你來這只是想氣我。",
            '<25>{#p/asgore}{#f/3}* ...',
            '<25>{#p/asriel2}{#f/6}* ...',
            '<25>{#p/asgore}{#f/7}* 你得意識到\n  你的選擇是有份量的！',
            "<25>{#p/asriel2}{#f/15}* 不然？\n  沒份量不就飄起來了嗎？\n  誰還看得到？",
            "<25>{#f/16}* $(name)，我們走。\n  我受夠他了。"
         ],
         asriel30c: [ '<25>{*}{#p/asgore}{#f/8}* 艾斯利爾，求你別走！\n* 我只是想幫你！{^999}' ],
         asriel30d: () =>
            [
               [ '<25>{#p/asriel2}{#f/3}* 做好準備，$(name)。', "<26>{#f/4}* 這兒可是安黛因的地盤。" ],
               [ '<25>{#p/asriel2}{#f/4}* 帶路吧。' ]
            ][Math.min(SAVE.flag.n.ga_asriel30d++, 1)],
         papyrusSolo1a: [
            '<18>{#p/papyrus}{#f/31}衫斯？\n那是個人類嗎？',
            "<18>{#f/5}應該是的吧？",
            '<18>{#f/32}捏...\n安黛因總算會...',
            "<18>{#p/papyrus}{#f/31}我能加入皇家衛隊了...",
            "<18>{#f/5}你會以我為榮的吧？",
            "<25>{#p/asriel2}{#f/3}* 你騙不了自己的，帕派瑞斯。\n* 他已經死了。",
            '<18>{|}{#p/papyrus}{#f/5}可是- {%}',
            "<25>{#p/asriel2}{#f/3}* 夠了。\n* 你再怎麼使勁呼喚，\n  他也聽不見的。", 
            "<18>{#p/papyrus}{#f/6}不會的...\n衫斯他...",
            '<18>{#f/31}他向我承諾過的...',
            "<25>{#p/asriel2}{#f/8}* 那個蠢骨頭\n  要能遵守承諾就怪了。",
            "<26>{#f/9}* 雖然我也不比他好到哪兒去。", 
            '<18>{#p/papyrus}{#f/31}...',
            "<18>{#f/3}對不起。\n我得走了..."
         ],
         papyrusSolo2a: [
            '<18>{#p/papyrus}{#f/31}唉，我剛從\n安黛因那回來...',
            '<18>{#f/31}她說國王找你有事。',
            '<25>{#p/asriel2}{#f/6}* ...',
            '<18>{#p/papyrus}{#f/3}他原話是\n「我想見見我兒子」。',
            '<18>{#f/7}...',
            
            "<18>{#f/7}我們的王子竟然\n殺了我兄弟，\n真是難以置信！",
            '<25>{|}{#p/asriel2}{#f/8}* 其實你才是我們原本想- {%}',
            '<18>{#p/papyrus}{#f/7}真是夠了！！',
            '<18>{#f/7}你出賣集體，背叛同胞！',
            '<18>{#f/7}為了啥呢！？',
            '<18>{#f/7}就為了取悅自己嗎？',
            "<25>{#p/asriel2}{#f/16}* 對啊，帕派瑞斯。\n* 就是因為這麼做很爽。",
            '<18>{#p/papyrus}{#f/7}扯淡！！！',
            '<18>{#p/papyrus}{#f/4}還有你，人類...',
            "<18>{#f/7}別以為我不知道\n事態會怎麼發展。",
            "<18>{#f/7}顯而易見，你才是主謀。",
            '<25>{#p/asriel2}{#f/8}* 你真有眼力。',
            '<25>{#f/7}* 眼下我們是不是該\n  就地投降才好呢？',
            '<18>{#p/papyrus}{#f/31}...',
            '<25>{#p/asriel2}{#f/4}* 先說明了，你這股努力的勁兒\n  確實令我佩服。',
            "<25>{#f/3}* 但我們自有打算。",
            "<18>{#p/papyrus}{#f/4}你要知道，安黛因可能\n正盯著我們呢。",
            '<25>{#p/asriel2}{#f/3}* 你想說什麼？',
            "<25>{#f/4}* ...告訴你，帕派瑞斯，\n  你和其他人做什麼，\n  跟我們都毫無關係。",
            '<25>{#f/1}* 只要在一起，\n  誰都無法把我們分開。',
            '<18>{#p/papyrus}{#f/7}...我呸！！'
         ],
         papyrusSolo3: [ '<25>{#p/asriel2}{#f/3}* 哈囉！' ],
         papyrusSolo3a: () => [
            '<18>{#p/papyrus}{#f/31}你知道嗎...',
            '<18>{#f/31}我偶然聽到艾菲斯博士\n自言自語...',
            '<18>{#f/5}從她的話中我聽到個詞，\n好像是「時間回溯」？',
            "<18>{|}{#f/32}{#x1}我不確定，但好像你們- {%}",
            '<25>{#p/asriel2}{#f/6}* 沒門。',
            '<18>{|}{#p/papyrus}{#f/6}但她說了你們能- {%}',
            ...(SAVE.flag.n.genocide_milestone < 5
               ? [ '<25>{#p/asriel2}{#f/6}* 沒門。' ]
               : SAVE.flag.n.genocide_milestone < 6
               ? [ "<25>{#p/asriel2}{#f/6}* 沒門，不過我要是那麼做的話\n  她會很高興的。" ]
               : [ "<25>{#p/asriel2}{#f/6}* 沒門，反正她最後\n  也要跟著去見閻王。" ]),
            '<18>{#p/papyrus}{#f/31}可是，假如你真能\n回溯時間，抹掉過去...',
            '<18>{#f/5}為什麼不去試試呢？',
            "<18>{#f/31}下一條時間軸裡，\n讓-讓我代他去死。",
            "<18>{#f/3}那樣，他就能活下來了，\n對吧？",
            "<25>{#p/asriel2}{#f/6}* ...\n* 跟你說，我早就看過\n  那條線了。",
            "<25>{#f/7}* 無聊至極。",
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/6}那麼，我給你看看\n這個謎題吧？',
            '<18>{#f/32}說不定，\n它能讓你不那麼無聊...',
            '<25>{#p/asriel2}{#f/15}* ...',
            '<25>{#p/asriel2}{#f/15}* 你要是喜歡這麼做的話，\n  那就隨你的便。',
            '<18>{#p/papyrus}喔，喔！',
            "<18>{#f/0}太好了！！",
            "<18>{#f/0}你開始改變想法了！",
            '<25>{#p/asriel2}{#f/8}* ...',
            '<18>{#p/papyrus}{#f/6}...',
            '<18>{|}{#f/5}那麼，規則是這樣的- {%}',
            '<25>{#p/asriel2}{#f/7}* 我們早就知道了，蠢貨。',
            '<18>{#p/papyrus}{#f/31}...喔...',
            '<18>{#f/6}呃，好吧！！\n那我就不解釋了...',
            "<18>{#f/9}看看我們的\n隨機數字是多少吧！！"
         ],
         papyrusSolo4a: [
            '<18>{#p/papyrus}{#f/3}艾斯利爾。',
            '<25>{#p/asriel2}{#f/6}* 帕派瑞斯。',
            '<18>{#p/papyrus}{#f/31}...',
            '<18>{#f/31}為什麼？',
            '<18>{#f/31}為什麼你要這麼做？',
            "<18>{#f/3}一個怪物不應該\n會變成這樣啊...",
            "<18>{#f/5}你的愛去哪了？\n你的同情心去哪了？",
            '<18>{#f/31}你的... 仁慈...',
            '<25>{#p/asriel2}{#f/2}* ...\n* 喔，您可真是\n  文曲星下凡啊...',
            '<25>{#f/1}* 在我的靈魂中，\n  這些東西早就化為烏有了。',
            "<18>{#p/papyrus}{#f/31}但...\n我不明白...",
            '<18>{#f/5}一個有著這般\n純潔心靈的怪物...',
            '<18>{#f/31}...怎麼會\n徹底墮入黑暗呢？',
            '<25>{#p/asriel2}{#f/1}* 你真想知道嗎？',
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/3}對...',
            '<25>{#p/asriel2}{#f/10}* 你確實是真心想知道嗎？',
            '<18>{#p/papyrus}{#f/31}對。',
            '<25>{#p/asriel2}{#f/3}* 說大點聲。',
            '<18>{#p/papyrus}{#f/5}對！',
            '<26>{#p/asriel2}{#f/1}* 對我說，洋求我\n  把梅說的都告訴你。',
            '<18>{#p/papyrus}{#f/7}好！洋求你把梅說的\n都告訴我吧！該死！',
            '<25>{#p/asriel2}{#f/1}* 嘻嘻嘻...',
            "<25>{#f/1}* 那好，就讓我來告訴你吧。",
            "<25>{#f/15}* 其實答案很簡單...",
            '<18>{#p/papyrus}{#f/4}我的天哪，快說吧...'
         ],
         papyrusSolo4b: [
            '<25>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* $(name)。{%100}',
            '<18>{#p/papyrus}{#f/32}...！',
            '<25>{#p/asriel2}{#f/5}* 哈！\n* 哈哈哈！\n* 看看你什麼表情！'
         ],
         papyrusSolo4c: [ '<18>{#p/papyrus}{#f/31}我...', '<18>{#f/3}...不...' ],
         papyrusSolo4d: [
            "<18>{#p/papyrus}{#f/7}不，你錯了。",
            "<18>{#f/7}一直想方設法把我擊垮的，\n是你。",
            "<18>{#f/7}那個滿嘴謊話的，還是你。",
            '<18>{#f/9}但是我，帕派瑞斯...',
            '<18>{#f/9}總算認清了{@fill=#f00}真相{@fill=#fff}。',
            "<25>{#p/asriel2}{#f/13}* 喔？\n* 真相是什麼呢？"
         ],
         papyrusSolo4e: [ "<18>{#p/papyrus}{#f/34}你才不是{@fill=#f00}艾斯利爾{@fill=#fff}。" ],
         papyrusSolo4f: [
            '<18>{#f/5}{@fill=#f00}艾斯利爾{@fill=#fff}絕不可能\n幹出這種事！',
            '<18>{#f/31}因為，{@fill=#f00}艾斯利爾{@fill=#fff}心地善良，',
            '<18>{#f/5}信賴同胞...',
            '<18>{#f/31}比誰都相信人類！',
            '<18>{#f/4}而你呢...',
            '<18>{#f/7}你不過是個為了\n一己私慾利用人類的\n卑鄙小人！',
            "<18>{#f/4}我告訴你，\n你愛說啥就說啥，\n我不在乎。",
            '<18>{#f/9}但是，我還相信著\n那個人類。',
            "<25>{#p/asriel2}{#f/8}* 哼，你要真這麼信任他...",
            '<25>{#f/7}* 那就證明給我看看。',
            "<25>{#f/3}* 我會離開一會，\n  讓你倆單獨對峙。",
            "<25>{#f/3}* 他要是饒恕你，\n  那我就認栽。",
            '<25>{#f/4}* 否則，他要是\n  「不小心」殺了你...',
            "<25>{#f/1}* 你就知道你大錯特錯了。\n  而那個懶骨頭死得就\n  一文不值。",
            '<25>{#f/1}* 這主意如何？',
            '<18>{#p/papyrus}{#f/9}...\n我接受。',
            '<25>{#p/asriel2}{#f/3}* 那可太好了。',
            '<25>{#f/4}* 永別了。'
         ]
      },
      houz: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (You place your hands on the heavily scratched door.)' ]
            : [ '<32>{#p/basic}* 門上布滿了貓的抓痕。' ],
      gonezo: () =>
         world.bulrun ? [ '<32>{#p/basic}* ...但是大家都逃走了。' ] : [ '<32>{#p/basic}* ...但是誰也沒有來。' ],
      garbanzo: [ '<32>{#p/human}* (But there was nobody around to occupy the seat.)' ],
      doggonopoggo: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (But there was nobody here.)' ]
            : (game.room === 's_doggo' && SAVE.data.n.state_starton_doggo === 2) || // NO-TRANSLATE

              (game.room === 's_dogs' && SAVE.data.n.state_starton_dogs === 2) || // NO-TRANSLATE

              (game.room === 's_pacing' && SAVE.data.n.state_starton_lesserdog === 2) // NO-TRANSLATE

            ? [ '<32>{#p/basic}* ...但是誰也沒有來。' ]
            : [ "<32>{#p/basic}* 沒人在家。" ],
      housebloc: () =>
         SAVE.data.b.svr ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ] : [ "<32>{#p/basic}* 鎖住了。" ],
      innkeep1a: pager.create(
         0,
         () => [
            "<32>{#p/basic}{#npc/a}* 歡迎來到星光旅館！\n* 星港的一流旅館！",
            '<32>* 每住宿一晚花費60G。',
            choicer.create('* （訂一間房嗎？）', "訂", "不訂")
         ],
         () => [
            '<32>{#p/basic}{#npc/a}* 改變主意了嗎？',
            '<32>* 記住了，一個晚上60G。',
            choicer.create('* （訂一間房嗎？）', "訂", "不訂")
         ]
      ),
      innkeep1b: pager.create(
         0,
         () => [
            '<32>{#p/basic}{#npc/a}* 又回來了嗎？\n* 記住，一個晚上60G。',
            choicer.create('* （再訂一間房嗎？）', "訂", "不訂")
         ],
         () => [ '<32>{#p/basic}{#npc/a}* 改變主意了嗎？', choicer.create('* （再訂一間房嗎？）', "訂", "不訂") ]
      ),
      innkeep1c: pager.create(
         0,
         () => [
            '<33>{#p/basic}{#npc/a}* Back again?\n* Well, stay as long as you like!',
            choicer.create('* （再訂一間房嗎？）', "訂", "不訂")
         ],
         () => [ '<32>{#p/basic}{#npc/a}* 改變主意了嗎？', choicer.create('* （再訂一間房嗎？）', "訂", "不訂") ]
      ),
      innkeep2a: [
         "<32>{#p/basic}{#npc/a}* ... you don't even have 60G?",
         "<32>* Oh! You poor thing.\n* I can only imagine what you've been through.",
         '<32>* One of the rooms upstairs is empty, you can sleep there for free, okay?'
      ],
      innkeep2b: [ "<32>{#p/basic}{#npc/a}* 這是你的房間鑰匙。\n* 小心別著涼！" ],
      innkeep2c: [ "<32>{#p/basic}{#npc/a}* Sorry, you don't have enough G..." ],
      innkeep3a: [ '<32>{#p/basic}{#npc/a}* 您好呀！\n* 您看起來睡得很舒服。' ],
      innkeep3b: [ '<32>* 挺不可思議的...\n* ...因為您在上面\n  只待了幾分鐘。' ],
      innkeep3c: [ '<32>* Feel free to come back if you get tired.' ],
      innkeep3d: [ "<32>* 我把錢退給您。\n* 想過夜的話，可以再付給我喔。" ],
      innkeep4: [ "<32>{#p/basic}{#npc/a}* 現在還不困？\n* 沒關係，只要您需要，\n  我隨時為您服務！" ],
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
         [ "<25>{#p/kidd}{#f/1}* 怎麼了嗎？" ],
         [ '<25>{#p/kidd}{#f/1}* 喲，近來可好？' ],
         [ '<25>{#p/kidd}{#f/1}* 嘿，嘿！' ],
         [ '<25>{#p/kidd}{#f/1}* 很高興見到你，哈哈。' ],
         [ "<25>{#p/kidd}{#f/1}* 哇，老兄，怎麼了嗎？" ]
      ),
      kidd2: pager.create(
         0,
         () =>
            game.room === 's_town1' // NO-TRANSLATE

               ? [
                    "<25>{#p/kidd}{#f/1}* 喲，你也是個孩子，\n  對吧？",
                    "<25>{#p/kidd}{#f/1}* 我看得出來，\n  因為你穿著條紋衫。"
                 ]
               : [
                    '<25>{#p/kidd}{#f/7}* 等下，你也讀書的嗎！？',
                    '<25>{#p/kidd}{#f/1}* 那個圖書倌教會了我所有\n  關於怪物歷史的知識！',
                    "<25>{#p/kidd}{#f/3}* 我無法想像在一顆星球上\n  生活會怎麼樣..."
                 ],
         () =>
            game.room === 's_town1' // NO-TRANSLATE

               ? [ '<25>{#p/kidd}{#f/1}* 我尋思著那個矮個子骷髏\n  有沒有成年。' ]
               : [ '<25>{#p/kidd}{#f/3}* 你有在星球上生活過嗎？' ]
      ),
      marriage1: [
         "<32>{#p/basic}* 什麼味道？\n* （哪裡來的氣味？）",
         "<32>* 如果你是這個味道...\n* （...證明你的氣味！）"
      ],
      marriage2: [
         "<32>{#p/basic}* 嗯...\n* 這就是那個奇怪的味道。",
         '<32>* 這氣味讓我想把它消滅掉...',
         '<32>* （...把你消滅掉！）'
      ],
      marriage3a: [
         '<32>{#p/basic}* 狗狗可以摸其它狗狗？？？\n* （一扇新世界的大門\n  向我們敞開了...）',
         '<32>* 謝謝你，怪狗狗！'
      ],
      marriage3b: [
         '<32>{#p/basic}* Weird smells can bring good things...\n* (Friendly fun fetch!)',
         '<32>* Thanks, weird smell!\n* (It sure was fun to catch a \"wrench\" in the works!)'
      ],
      marriage3c: [
         "<32>{#p/basic}* 聞東西越來越費勁了...\n* （感覺自己快瞎了...）",
         "<32>* 咱們快逃吧！"
      ],
      marriage3d: [
         '<32>{#p/basic}* That weird puppy came out of nowhere...\n* (Almost killed us...)',
         "<32>* 咱們快逃吧！"
      ],
      marriage3e: [
         "<32>{#p/basic}* Dogs can pet AND play fetch with other dogs???\n* (It's almost criminal...)",
         '<32>* Thanks, weird puppy!\n* (After this, our lives will never be the same!)'
      ],
      marriage4: [
         "<32>{#p/basic}* 王子在哪？\n* （沒走錯路吧？）",
         '<32>* 必須阻止那個惡魔...\n* （...還有他的人類幫兇！）'
      ],
      marriage5: [ '<32>{#p/basic}* 呃...\n* 他們在這...', "<32>* （抓住他們！）" ],
      maze1: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}{#f/0}* 歡迎回來。',
                 "<25>{#p/sans}{#f/3}* 真是太遺憾了...",
                 "<25>{#p/sans}{#f/2}* 這個謎題\n  帕派瑞斯精心準備了好久...\n* 但現在他有事，來不了了。",
                 "<25>{#p/sans}{#f/0}* 不過，沒關係。",
                 "<25>{#p/sans}{#f/0}* 我答應過他，會讓你解謎的。\n* 那麼，開始吧。"
              ]
            : [
                 '<18>{#p/papyrus}喔吼，\n那個人類來了！',
                 '<18>我和我的兄弟\n製造了一些謎題。',
                 '<18>{#f/9}你準備好接受\n挑戰了嗎，人類！？',
                 choicer.create('* （你要怎麼回答？）', "準備好了", "沒準備好"),
                 '<18>{#p/papyrus}回答正確！\n因為你也看到了...'
              ],
      maze2a: [
         '<18>{#x4}{#f/9}從來沒有一個工匠\n做的陷阱可以跟我的\n相提並論！',
         "<18>{#f/0}可以讓人無法抗拒！",
         "<25>{#x1}{#p/sans}{#f/2}* 也許你才是那個讓人\n  無法抗拒的人。",
         '<18>{#p/papyrus}{#f/1}真的嗎！？'
      ],
      maze2b: [
         '<18>{#x4}{#f/9}沒有人類能解開由\n偉大的帕派瑞斯\n所製作的謎題！',
         '<25>{#x1}{#p/sans}{#f/4}* 也沒人有機會去解，兄弟。',
         "<18>{#p/papyrus}{#x3}{#f/7}呃啊，這不是重點！！"
      ],
      maze3: [ '<18>{#x1}{#f/0}不論如何，\n我把這個謎題叫做...' ],
      maze3a: [
         '<18>「火焰之牆」！！',
         '<25>{#p/sans}* 你直接叫它「火牆」\n  不就行了嗎？\n* 這樣多省事。',
         "<18>{#p/papyrus}{#f/4}艾菲斯博士肯定會說\n你亂用這個詞了。",
         "<25>{#p/sans}* 這我不清楚，兄弟。\n  不過，博士真的超級喜歡\n  這個謎題。",
         "<30>{#f/2}* 畢竟... 這東西多讓人\n  {@fill=#ff0}熱{@fill=#fff}血沸騰啊。"
      ],
      maze4: [ '<18>{#p/papyrus}{#x3}{#f/7}別說了，衫斯！！' ],
      maze5: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}{#f/0}* 這是「火牆」。',
                 "<25>{#p/sans}{#f/2}* 把它聯想成\n  電腦的「防火牆」就行。",
                 '<25>{#p/sans}* 到達對面，你就過關了。',
                 '<25>{#p/sans}* 很簡單，對吧？',
                 "<25>{#p/sans}{#f/3}* 不過，我之前親自嘗試過\n  這個謎題，只能說...",
                 "<25>{#p/sans}{#f/2}* 它可沒你想得那麼簡單。"
              ]
            : [
                 '<18>{#p/papyrus}...總之，\n這個謎題背後的想法\n其實非常簡單。',
                 '<18>因為你應該做的...',
                 '<18>{#f/9}只有成功到達另一邊！！',
                 '<18>{#f/0}祝你好運！！\n捏嘿嘿！！'
              ],
      maze6: pager.create(
         0,
         () =>
            world.edgy
               ? [
                    '<25>{#p/sans}{#f/0}* 嗯？你要回哪去？',
                    '<25>{#p/sans}{#f/3}* 試試嘛，\n  起碼配合一下。'
                 ]
               : [ "<18>{#p/papyrus}{#x2}{#f/7}你往哪裡走呢！？" ],
         () => (world.edgy ? [ '<25>{#p/sans}{#f/0}* 真要走？' ] : [ '<18>{#p/papyrus}{#x2}{#f/7}快回來！！' ])
      ),
      maze7: [
         [
            '<18>{#p/papyrus}你是怕火嗎？？',
            "<18>{#f/4}不用擔心，\n這火其實燒不到你。",
            '<18>{#f/0}就像衫斯說的那樣，\n那些火僅僅是\n「令人愉快的溫暖」。',
            '<25>{#p/sans}* 事實上，這句話是我\n  從一個朋友那學來的。',
            '<18>{#p/papyrus}{#f/4}...喔。'
         ],
         [
            '<18>{#p/papyrus}你在擔心解不了謎題嗎？？',
            "<18>如果是那樣的話，\n那你一定得知道...",
            '<18>{#x4}{#f/9}我，偉大的帕派瑞斯，\n不會因此而評判你！',
            '<18>{#f/0}就像每個明星大廚\n都知道的那樣，\n心意是最重要的。',
            '<18>{#x1}所以，來吧，\n盡力就好！'
         ],
         [
            '<18>{#p/papyrus}{#f/4}（衫斯，那個人類\n在幹什麼啊？？）',
            '<25>{#p/sans}* 可能在研究路線吧。',
            '<18>{#p/papyrus}{#f/4}（喔，確實。）',
            '<18>{#f/9}那樣的話，\n準備好了就前進吧！'
         ]
      ],
      maze8: () =>
         world.edgy
            ? [ '<25>{#p/sans}{#f/0}* 哎呀，真可惜。\n* 不過別灰心。' ]
            : [
                 '<18>{#p/papyrus}捏嘿嘿！\n那好吧。',
                 "<18>{#f/9}看來你被\n偉大的帕派瑞斯戲弄了！",
                 '<18>{#f/0}但別擔心！',
                 '<18>你也看到了，\n我的陷阱可不差。',
                 "<18>{#f/9}你不能因為輕易失敗\n就受到指責！！"
              ],
      maze9: () =>
         world.edgy
            ? [ "<25>{#p/sans}{#f/0}* 不錯嘛。\n* 沒看出來，你還挺機靈的。" ]
            : [
                 '<18>{#p/papyrus}{#f/1}啥！？',
                 '<18>{#f/7}你咋做到的！？！？',
                 '<18>這謎題是個人都過不去啊！',
                 '<18>{#f/9}...哎呀，行吧！\n我得快點布置自己的謎題了！'
              ],
      maze10: () =>
         world.edgy
            ? [
                 "<25>{#p/sans}{#f/0}* 好了，謎題結束了。",
                 '<25>{#p/sans}{#f/3}* ...總之，感謝遊玩。',
                 "<25>{#p/sans}{#f/0}* 現在，\n  我要去準備下個謎題。",
                 "<25>{#p/sans}{#f/2}* 待會見。"
              ]
            : [
                 '<18>{#f/4}無論如何...',
                 '<18>{#f/0}我很期待\n接下來的發展！',
                 '<18>{#f/4}一個令人\n十分困惑的謎題...',
                 "<18>{#f/1}連特雷莉亞自己\n都解決不了！！",
                 "<25>{#p/sans}* 特雷莉亞？\n* 是那個在世\n  最長壽的怪物嗎？",
                 '<18>{|}{#p/papyrus}{#f/1}呃...\n是這樣沒錯，但- {%}',
                 "<25>{#p/sans}* 媽呀，我都不知道\n  原來你對我的評價這麼高。",
                 '<18>{#p/papyrus}{#f/4}啥。',
                 "<25>{|}{#p/sans}* 就是說，\n  如果連她都解不了，\n  那- {%}",
                 '<18>{#p/papyrus}{#f/7}{#x3}我懂你的意思了！！'
              ],
      maze11: [ '<18>{#p/papyrus}{#f/7}衫斯，\n我們還有謎題要準備呢！！', '<18>快來吧！' ],

      nicecreamSc1: [
         "<32>{#p/basic}* 我搞不懂為什麼\n  這些東西賣不出去...",
         "<32>* 這可是享受這些東西的\n  絕佳聖地..."
      ],
      nicecreamSc2: () => [
         SAVE.data.n.plot > 20.2
            ? '<32>{#p/basic}* 喔！！！！\n* ...你回來了！'
            : SAVE.data.b.s_state_scorereaction1 || SAVE.data.n.plot === 20.2
            ? "<32>{#p/basic}* 等一下！！！！\n* 也許你會喜歡這些東西！"
            : '<32>{#p/basic}* 喔！！！！\n* 一個顧客！！',
         '<32>* 你好！\n* 想來根冰意靈嗎？',
         SAVE.data.b.s_state_million
            ? '<32>* As the top scorer here, you get a handy discount!\n* 6G per Ice Dream!'
            : "<32>* 這可是能點燃你內心的冰凍甜品！\n* 現在只要12G。"
      ],
      nicecreamSc3: () => [
         "<32>{#p/basic}* 冰意靈！\n* 能點燃你內心的冰凍甜品！",
         SAVE.data.b.s_state_million ? '<32>* For you, 6G!' : '<32>* 現在只賣12G。'
      ],
      nicecreamPrompt1: () => [ choicer.create('* （要花$(x)G買冰意靈嗎？）', '是', '否') ],
      nicecreamPrompt2: () => [ choicer.create('* (Get an Ice Dream?)', '是', '否') ],
      nicecreamSc4: [
         '<32>{#p/basic}* 那好吧...\n* 告訴你的朋友...',
         "<32>* 在荒郊野外...\n* 有個買冰淇淋的地方..."
      ],
      nicecreamFc1: [ '<32>{#p/basic}* 我換了個地方擺攤，\n  可還是沒有顧客...' ],
      nicecreamFc2: [
         "<32>{#p/basic}* 幸運的是，\n  我想到了一個解決方案！！",
         '<32>* 明信片！',
         '<32>* 你每買一根冰意靈，\n  就可以從箱子裡\n  拿一張明信片。',
         '<32>* 如果你有了三張明信片，\n  你就可以換一根\n  免費的冰意靈！',
         "<32>* 這些明信片\n  肯定會給我帶來回頭客的！",
         '<32>* 喔，嗯，\n  你想來根冰意靈嗎？',
         "<32>* 這可是能點燃你內心的冰凍甜品！\n* 現在只要10G。"
      ],
      nicecreamFc3a: [
         "<32>{#p/basic}* 冰意靈！\n* 能點燃你內心的冰凍甜品！",
         "<32>* You've got three postcards, would you like to redeem them?"
      ],
      nicecreamFc3b: [
         "<32>{#p/basic}* 冰意靈！\n* 能點燃你內心的冰凍甜品！",
         '<32>* 現在只要10G。'
      ],
      nicecreamFc4: [
         '<32>{#p/basic}* 那好吧...\n* 告訴你的朋友...',
         '<32>* 冰意靈買三贈一...'
      ],
      nicecreamFc5: [ "<32>{#p/basic}* 別忘了從箱子裡\n  拿一張明信片！" ],
      nicecreamNoFun1: [ "<32>{#p/basic}* 嗯？\n* 你的口袋裡沒有\n  空地方了..." ],
      nicecreamNoFun2: [ '<32>{#p/basic}* I wish I could make Ice Dreams easier to store...' ],
      nicecreamNoMun1: [ "<32>{#p/basic}* 嗯？\n* 你的錢不太夠..." ],
      nicecreamNoMun2: [ '<32>{#p/basic}* 我也希望\n  做棒冰不用花錢...' ],
      nicecreamFree1: [ '<32>{#p/basic}* 告訴你一個好訊息，\n  第一根棒冰，免費送你。' ],
      nicecreamFree2: [ '<32>{#p/basic}* 希望你喜歡...' ],
      nicecreamReturnWithGoods: [ '<32>{#p/basic}* 沒關係，\n  你隨時都可以回來買。' ],
      nicecreamReturnWithNeeds: [ "<32>{#p/basic}* 喔，沒關係的。", '<32>* 晚點再來啊，孩子！' ],
      nicecreamPurchase: [ '<32>{#p/basic}* Here you go!\n* Have a stellar starry night!' ],
      nicecreamGet: [ '<32>{#s/equip}{#p/human}* （你得到了冰意靈。）' ],
      nicecreamK1a: [ '<25>{#p/kidd}{#f/1}* 喲，可以給我來一根\n  冰意靈嗎？' ],
      nicecreamK1b: [ "<32>{#p/basic}* 當然沒問題，孩子。\n* 只要你有錢的話，" ],
      nicecreamK1c: [ '<25>{#p/kidd}{#f/2}* （噓，把這個給他。）' ],
      nicecreamK1d: [
         '<25>{#p/kidd}{#f/7}* Yo, they got free Ice Dreams here!?',
         '<25>{#p/kidd}{#f/1}* Get me one too!'
      ],
      nicecreamK2: [ '<32>{#p/basic}* 你... 你是從哪裡\n  拿到這個的？' ],
      nicecreamK3a: [ '<32>* 沒-沒問題，孩子...\n  給你！' ],
      nicecreamK3b: [
         '<32>{#s/equip}{#p/human}* （你把冰意靈遞給了怪物小孩。）',
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
                    "<32>{#p/basic}* 嘿，孩子！\n* 我真的很想給你一根冰意靈，\n  但我已經全賣光了！",
                    '<32>* 生意從來沒像今天在這裡\n  這麼火爆過！',
                    "<32>* 我都要供不應求了！"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? world.population_area('s') < 6 || world.population_area('f') < 6 || world.population < 2 // NO-TRANSLATE

                  ? [ '<32>{#p/basic}* Nothing personal, of course.' ]
                  : [
                       '<32>{#p/basic}* Apparently, he sold his first Ice Dream in the middle of the Starton holo-forest.'
                    ]
               : [ '<32>{#p/basic}* 也許是時候開一家我\n  夢寐以求的「冰意靈」\n  連鎖店了...' ]
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
                       "<32>{#p/basic}{#npc/a}* 我聽說，如果你在戰鬥中按住[X]，\n  移動的速度會比正常慢一倍！",
                       '<32>* 我懂... 你覺得沒用，是嗎？',
                       "<32>* 但我告訴你一個秘密。\n* 那邊那條狗... 他巴不得你\n  移動速度快呢。",
                       '<32>* 如果你邊按住[X]邊靠近他，\n  你就不會被他發現！',
                       '<32>* 嚯嚯嚯... 祝你好運。'
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
                       '<25>{#p/kidd}{#f/3}{#npc/a}* 剛才，有個小孩走過來\n  往我腦袋裡插了什麼東西。',
                       '<25>{#f/3}* 之後，他就去鑄廠了，\n  說要去「增強訊號」。',
                       '<25>{#f/4}* ...有些小孩真是奇怪。'
                    ]
                  : [
                       '<25>{#p/kidd}{#f/3}{#npc/a}* 喲，大家都去逃難了。',
                       '<25>{#f/3}* 我說，成年人有時候\n  就是這麼蠢，哈哈...',
                       "<25>{#f/1}* 他們難道不知道\n  安黛因會保護我們嗎！？"
                    ],
            () =>
               world.genocide
                  ? [ "<25>{#p/kidd}{#f/7}{#npc/a}* 不過，你可不奇怪，\n  而且長得超酷的！" ]
                  : [ "<25>{#p/kidd}{#f/1}{#npc/a}* 安黛因就是我們的堅實後盾！" ]
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
                       "<32>{#p/basic}{#npc/a}* 上次發生那樣的事之後，\n  衫斯又回來了，\n  真讓人驚訝。",
                       "<32>* ...實際上，可能也\n  沒那麼讓人驚訝。"
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
                       '<32>{#p/basic}{#npc/a}* 我今天貼了告示\n  招了很多「女孩」。',
                       '<32>* 有人告訴我說\n  漫天群星蘊含著無限可能性...',
                       "<32>* 所以，我很認真地\n  聽取了那個建議...",
                       "<32>* 我真的要和一個太空生物\n  卿卿我我了。"
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
                       "<32>{#p/basic}{#npc/a}* 你跟我說話的口氣\n  好像你想知道\n  內幕訊息似的。",
                       "<32>{#p/basic}{#npc/a}* 抱歉孩子。\n* 看來你只能等下一條新聞了。"
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
                       '<32>{#p/basic}{#npc/a}* 我覺得我可以問問安黛因。\n* 但她好像已經喜歡別人了。'
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Here's hoping another cutie like him comes along..." ]
                  : SAVE.data.n.plot === 33
                  ? [ "<32>{#p/basic}{#npc/a}* 你該不會沒有\n  域外網帳號吧..." ]
                  : SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* What's an onionsan, anyway?" ]
                  : papreal()
                  ? [ '<32>{#p/basic}{#npc/a}* Let me know if you see him...' ]
                  : [ '<32>{#p/basic}{#npc/a}* 我還能找到真愛嗎？' ]
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
                       '<32>{#p/basic}{#npc/a}* 衫斯從第一天起\n  就是這裡的常客了。',
                       ...(papreal()
                          ? [
                               '<32>* He usually orders the worst item off the menu...',
                               '<32>* Except for earlier today...',
                               '<32>* ... when he ordered the SECOND worst item off the menu instead.',
                               "<32>* That's something, right?"
                            ]
                          : [
                               '<32>* 他總是點選單上最難吃的菜，\n  而且從不付帳。',
                               '<32>* 不過看在他吸引了\n  這麼多其他顧客的份上...',
                               '<32>* 烤爾比甚至給他特別\n  安排了點東西。',
                               '<32>* ...所以「雅莫萬用醬」\n  到底是什麼東西？'
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
                       "<32>{#p/basic}{#npc/a}* 嗯...\n* 人類的食物和怪物的\n  應該是不一樣的吧？",
                       '<32>* 聽說會「變質」什麼的。',
                       '<32>* 而且不像怪物的食物一樣\n  可以直接轉化為能量...',
                       '<32>* 人類的食物必須\n  要先通過他們的身體。',
                       '<32>* 就算在低重力的環境\n  也是這樣。',
                       "<32>* 太詭異了。\n* 我找時間也想試試。"
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
                     : [ "<32>{#p/basic}{#npc/a}* 我們身邊有這樣的人，\n  真是太幸運了。" ]
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
                  : [ '<32>{#p/basic}{#npc/a}* 我還聽說他們有\n  叫做「廁所」的東西。' ],
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
                  : [ '<32>{#p/basic}{#npc/a}* 人類真奇怪。' ]
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
                       '<32>{#p/basic}{#npc/a}* 衫~衫~\n* 快回來坐我旁邊...！',
                       "<32>* 有你在的時候，\n  一切都那麼有-有-有趣..."
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
                       "<32>{#p/basic}{#npc/a}* 不論我去到哪裡，\n  看到的都是一樣的選單，\n  遇到的都是一樣的人...",
                       "<32>* 服務員！\n* 我想再來點喝的，\n  再來店帥-帥-帥-帥哥！"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* So c-c-cold...' ]
                  : SAVE.data.n.plot === 33
                  ? [ '<32>{#p/basic}{#npc/a}* 衫~衫~' ]
                  : SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* S-soooooo ready!' ]
                  : papreal() || world.dead_dog
                  ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                  : [ "<32>{#p/basic}{#npc/a}* 我感覺那個酒保\n  就挺帥-帥-帥-帥的..." ]
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
               ? [ '<32>{#p/basic}{#npc/a}* 噓，我在期待衫斯\n  能過來摸摸我們的頭。' ]
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
                    '<32>{#p/basic}{#npc/a}* 你最好盯緊了你坐的地方，\n  孩子。',
                    '<32>* 那個大傢伙隨時都會\n  跳到你的大腿上，\n  給你滿滿的愛和關注。'
                 ],
         g_dogaressa: () =>
            SAVE.data.b.killed_mettaton
               ? [
                    '<32>{#p/basic}{#npc/a}* (My hubby and I just want everyone to calm down.)',
                    "<32>{#p/basic}{#npc/a}* (Mettaton's death was tragic, but he's just a guy on TV!)"
                 ]
               : SAVE.data.n.plot === 33
               ? [ '<32>{#p/basic}{#npc/a}* （我喜歡衫斯。）\n* （有的時候他會在桌子底下\n  餵我們一些殘羹剩飯。）' ]
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
                    "<32>{#p/basic}{#npc/a}* （我們是哨兵，\n  但我們從來沒得到\n  一點尊重。）",
                    '<32>* （真希望那幾個骷髏可以\n  丟幾根骨頭給我們。）',
                    '<32>* （我們最喜歡骨頭了。）'
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
                    '<32>{#p/basic}{#npc/a}* 嗯？\n* 你和衫斯什麼時候\n  成為朋友了？',
                    "<32>* 我不太喜歡那傢伙...",
                    '<32>* 他喜歡一動不動地出現。'
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
                    "<32>{#p/basic}{#npc/a}* 我在考慮把頭髮留長一點，\n  來彰顯我的個性。",
                    '<32>* 它代表著：「請給我一個\n  大大的、溫柔的擁抱，\n  摟摟我。」'
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
                       '<32>{#npc/a}* 烤爾比說他只讓衫斯\n  免費吃飯，因為他幫著吸引了\n  其他顧客。',
                       "<32>* 我感覺硬說的話\n  好像還真是這麼回事..."
                    ]
                  : [
                       '<32>{#p/basic}* ...\n* ...\n* ...',
                       '<32>{#npc/a}* 烤爾比建議你\n  在他把食物扔掉之前\n  把它們帶走。'
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
                    '<32>{#npc/a}* 今天店裡這麼冷清，\n  烤爾比實在很對不起。',
                    "<32>* 我看，那些老主顧可能就是怕了...",
                    '<32>* 怕那個惡霸。\n* 當然嘍。'
                 ]
               : [
                    '<32>{#p/basic}* ...\n* ...\n* ...',
                    '<32>{#npc/a}* 烤爾比說他是在一本\n  電子雜誌上找到他的\n  新顏色的。',
                    "<32>* 我個人還是更喜歡烤爾比\n  原始的那個橘色。\n* 僅個人觀點。"
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
                       '<32>{#p/basic}{#npc/a}* 衫斯當然知道該怎麼逗你笑，\n  對吧？',
                       '<32>* 那是肯定的。\n* 這裡的帳單幾乎都是\n  那個骷髏付的。'
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
                       "<32>{#p/basic}{#npc/a}* 首塔的人口越來越多了，\n  所以我聽說它們打算\n  搬到這裡來。",
                       "<32>* ... who knows?\n* Maybe we'll have room for 'em."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* 首塔的人口越來越多了，\n  所以我聽說它們打算\n  搬到這裡來。",
                       "<32>* 嗯...\n* 我不想看到我們的\n  地方文化被抹去。",
                       "<32>* 但是教那些城裡人\n  我們的生活方式\n  肯定很有趣！"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ "<33>{#p/basic}{#npc/a}* I'm semi-conflicted about this." ]
                  : SAVE.data.n.plot === 33
                  ? [ "<32>{#p/basic}{#npc/a}* 常客？\n* 你說誰，我嗎？\n* 不至於，我只能算半個常客。" ]
                  : SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [
                          "<32>{#p/basic}{#npc/a}* Come to think of it, you've inspired me, kid.\n* I'm gonna start a fight club."
                       ]
                     : [ "<32>{#p/basic}{#npc/a}* We'll just have to come up with something new, eh?" ]
                  : [ "<32>{#p/basic}{#npc/a}* 哈，儘管來吧！" ]
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
                       "<32>{#p/basic}{#npc/a}* 衫斯是皇家哨兵，\n  但別被他的頭銜騙了。",
                       '<32>* 大家都知道他\n  坐在全息森林邊上\n  讀著懸浮車手冊。'
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
                       "<32>{#p/basic}{#npc/a}* 聽傳言說，有個瞎晃悠的惡霸，\n  路上的人全都被他揍了。",
                       '<32>* 不過我和烤爾比可不打算關店跑路。',
                       "<32>* 區區惡霸，怎能逼得走咱們！"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 那些狗是皇家衛隊的成員，\n  是由安黛因領導的\n  軍事集團。',
                       "<32>* 她粗魯，吵鬧，\n  誰不尊重她，她就揍誰...",
                       "<32>* 難怪所有小孩子都希望\n  長大要像她那樣呢！"
                    ],
            () =>
               SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* You never know with those rudely rowdy TV hosts.' ]
                  : SAVE.data.n.plot === 33
                  ? [
                       "<32>{#p/basic}{#npc/a}* 別問我他為什麼\n  那麼做。",
                       "<32>* 不過如果一定要我猜的話，\n  我覺得這和帕派瑞斯有關。"
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
                  : [ '<32>{#p/basic}{#npc/a}* 我長大了也要像安黛因那樣！\n* 吼吼吼！' ]
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
                       "<32>{#p/basic}{#npc/a}* 這裡有一本{@fill=#f00}奇怪的書{@fill=#fff}，\n  它會隨機出現和消失...",
                       '<32>* 但那位可愛的女士\n  似乎總是妨礙我去拿！',
                       '<32>* 你知道該怎麼樣\n  才能把她嚇跑嗎？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Soon, I tell you.', '<32>* Soon.' ]
                  : [ "<32>{#p/basic}{#npc/a}* 我知道你在想什麼。", "<32>* 你別試。" ]
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
                       '<33>* 我上學的時候，如果我們沒有作業，\n  老師會給我們布置一些\n  「找不同」的謎題。',
                       '<32>* 我那時候覺得那是在浪費時間。\n* 但看看現在的我...',
                       "<33>* 我現在是前哨站第一的\n  「找不同」謎題設計師了！"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* （咳，咳。）',
                       "<32>* Heck, why don't we just quit right here and now?"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* （咳，咳。）',
                       "<33>* 相信我，孩子。\n* 你不會想來幹這行的。"
                    ]
         ),
         l_librarian: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* 歡迎來到圖書倌。',
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
                       '<32>{#p/basic}{#npc/a}* 歡迎來到圖書倌。\n* 老實說，這名字\n  來源於一次拼寫錯誤。',
                       '<32>* 久而久之，\n  所有人都這麼叫了...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population === 0
                     ? [ "<32>{#p/basic}{#npc/a}* You have feelings, don't you?" ]
                     : [ "<32>{#p/basic}{#npc/a}* Not that anyone would've stopped you before..." ]
                  : [ "<32>{#p/basic}{#npc/a}* 如果你懶得去修正一些細小的問題，\n  就會發展成現在這樣的狀況。" ]
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
                          '<32>{#p/basic}{#npc/a}* 我喜歡做新聞推送的工作。',
                          "<32>* Lately, though, I've had to report on something terrible...",
                          "<32>* I'm starting to second-guess my life choices."
                       ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我喜歡做新聞推送的工作。',
                       '<32>* Only problem is, if a celebrity dies...',
                       "<32>* That's all anyone ever wants me to report on for a while."
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 我喜歡做新聞推送的工作。',
                       "<32>* 因為沒有什麼可報導的，\n  所以我們就用漫畫和遊戲\n  來填充版面。",
                       '<32>* I sure hope nobody gets bored of those.'
                    ],
            () =>
               world.dead_dog || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* Have you ever felt like your life is just running in circles?' ]
                  : [ "<32>{#p/basic}{#npc/a}* 你是覺得好像\n  缺了點什麼嗎？" ]
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
                       '<32>{#p/basic}{#npc/a}* 聽說那隻小狗\n  玩4D撲克牌...',
                       '<32>* 不知道它贏過沒？\n* 我挺想知道的。'
                    ]
                  : [
                       [
                          '<32>{#p/basic}{#npc/a}* 就在剛剛，\n  一隻靈感爆發的狗衝了進來。',
                          '<32>* 它一直試圖創作一幅全息影像\n  來表達自己的情感...',
                          '<32>* 但是，他越是創作，\n  就越是興奮...',
                          '<32>* 它的脖子變得越來越長，\n  作品也越來越亮，\n  直到...',
                          "<32>* 看得我很傷心，\n  但我無法移開視線。"
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
                          '<32>{#p/basic}{#npc/a}* 剛有隻小狗經過這兒，\n  身上全是傷...',
                          '<32>* 到底是有多沒良心，\n  才能對小可愛下毒手啊？'
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
                       [ '<32>{#p/basic}{#npc/a}* 對那狗狗來說挺糟糕吧，嗯？' ],
                       [ '<32>{#p/basic}{#npc/a}* 對那狗狗來說很糟糕吧，嗯？' ],
                       [ '<32>{#p/basic}{#npc/a}* Have you seen it?' ],
                       [ '<32>{#p/basic}{#npc/a}* 惡劣，真惡劣。' ]
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
                          '<32>{#p/basic}{#npc/a}* 切-\n* 難以置信-',
                          "<32>* I can't believe I'm gonna be working with that guy-",
                          '<32>* At least our sales figures should finally go up-'
                       ]
                  : roomKills().s_pacing > 0
                  ? [ "<32>{#p/basic}{#npc/a}* 切-\n* 對不起，我不跟你這種人做生意-" ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       "<32>{#p/basic}{#npc/a}* Man-\n* Sucks what happened to Mettaton, y'know-",
                       "<32>* But I'm willing to sell off my special edition moon rocks for the occasion-",
                       '<32>* Unlike that guy, who just lowers the prices on his basic rocks instead-'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 切-\n* 難以置信-',
                       '<32>* 我從月亮上弄到了真正的月巖，\n  長得可比那傢伙在電話裡說的垃圾\n  強多了-',
                       "<32>* 那傢伙的石頭，\n  一點都不像月亮-"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ '<32>{#p/basic}{#npc/a}* Yeah, I have you to thank-' ]
                     : [ "<32>{#p/basic}{#npc/a}* It's just good for business-" ]
                  : roomKills().s_pacing > 0
                  ? [ "<32>{#p/basic}{#npc/a}* 切-\n* 對不起，我不跟你這種人做生意-" ]
                  : [ '<32>{#p/basic}{#npc/a}* 那傢伙真挺有種啊-' ]
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
                          '<32>{#p/basic}{#npc/a}* 噗~\n* 啊對對~',
                          "<32>* It's good to finally be working together on this thing~",
                          "<32>* Now we'll both be sellin' my authentic moon rocks~"
                       ]
                  : roomKills().s_pacing > 0
                  ? [ '<32>{#p/basic}{#npc/a}* 噗~\n* 別想從我這買月巖~' ]
                  : SAVE.data.b.killed_mettaton
                  ? [
                       '<32>{#p/basic}{#npc/a}* Real shame what happened to the start of the underground~',
                       "<32>* Don't worry though~\n* Unlike that dude to my left, I won't raise my prices~",
                       '<32>* In fact, my moon rocks are going on sale~'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 噗~\n* 啊對對~',
                       "<32>* 我左邊的那哥們\n  在賣假到不行的月巖呢，\n  笑死~",
                       "<32>* 他說的話你一句也別信~"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 6
                     ? [ '<32>{#p/basic}{#npc/a}* Shaw man~\n* Sorry it had to come to this~' ]
                     : [ '<32>{#p/basic}{#npc/a}* Yeah, his were the real fake moon rocks all along~' ]
                  : roomKills().s_pacing > 0
                  ? [ '<32>{#p/basic}{#npc/a}* 噗~\n* 別想從我這買月巖~' ]
                  : [ "<32>{#p/basic}{#npc/a}* 那哥們真挺有膽啊~" ]
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
                       "<32>{#p/basic}{#npc/a}* 我的小肉桂是最可愛的！",
                       '<32>* 小兔兔真的太可愛了...\n* 嘻嘻！'
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
                    '<32>{#p/basic}{#npc/a}* 冰狼在思考為什麼\n  自己沒有冰可扔的時候，\n  冰狼還叫冰狼。',
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
                       "<32>{#p/basic}{#npc/a}* 那些鎂塔牌的牙刷\n  質量太他娘的差了。",
                       '<32>* 我還沒來得及開始刷，\n  東西就被我捏碎了！'
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
                  : [ '<32>{#p/basic}{#npc/a}* 不過話說回來，\n  這是最便宜的選擇了...' ]
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
                       '<32>* 尊重我的權威！\n* 耶!'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 嘿！',
                       '<32>* 你以為你能站在那\n  盯著我看嗎？',
                       "<32>* 行吧，我告訴你個壞訊息，\n  夥計。",
                       "<32>* 我是個執法人員。",
                       '<32>* 所以，呃...',
                       '<32>* 尊重我的權威！\n* 耶!'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 4
                     ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                     : [ '<32>{#p/basic}{#npc/a}* HAIL it, PAL.' ]
                  : [ '<32>{#p/basic}{#npc/a}* 尊重下吧，夥計。' ]
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
                       "<32>{#p/basic}{#npc/a}* 嘿嘿，什麼東西都無法改變\n  我的生活！",
                       '<32>* 哈... 哈...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ "<32>{#p/basic}{#npc/a}* I still think you're cool...!\n* Please don't hurt me." ]
                     : [ '<32>{#p/basic}{#npc/a}* I love you...!' ]
                  : papreal() || world.dead_canine || SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* Maybe it's just my imagination." ]
                  : [ "<32>{#p/basic}{#npc/a}* 也許我是瘋了吧。" ]
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
                       "<32>* 這-就-是-政治啊！"
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
                       "<32>* 這-就-是-政治啊！"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 這個小鎮總是那麼沉悶。',
                       "<32>* 但是，如果事情\n  繼續這樣發展下去的話，\n  也許這種情況會改變。",
                       '<32>* 這就是政治吧？'
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
                       '<32>{#p/basic}{#npc/a}* 很久以前，\n  我聽說他們把小鎮\n  一分為二了。',
                       '<32>* 我想知道這裡原來\n  是什麼樣子的...？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Thanks for bringing us back.' ]
                  : SAVE.data.b.killed_mettaton
                  ? [ "<32>{#p/basic}{#npc/a}* It's too bad we can't just magically bring them back." ]
                  : papreal()
                  ? [ "<32>{#p/basic}{#npc/a}* It's too bad we can't just magically fix these things." ]
                  : [ '<32>{#p/basic}{#npc/a}* 我們可能永遠都\n  無從得知了。' ]
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
                       "<32>{#p/basic}{#npc/a}* 我們都知道事情不盡人意，\n  但我們仍舊保持微笑。",
                       '<32>* 你問為什麼？',
                       '<32>* 我們面對著的是現實，\n  所以何必鬱鬱寡歡呢？'
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
                       '<32>{#p/basic}{#npc/a}* 每個人都在歡笑、講笑話，\n  試圖忘記我們的現代危機...',
                       '<32>* 死氣沉沉。\n* 人口過剩。\n* 無家可歸。',
                       "<32>* 我也想加入他們，\n  但我並不有趣。"
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
                  : [ "<32>{#p/basic}{#npc/a}* 至少，我不講雙關笑話。" ],
            () =>
               SAVE.data.n.plot === 72
                  ? world.population < 2
                     ? [ '<32>{#p/basic}{#npc/a}* You should leave before I stop being nice to you.' ]
                     : [ "<32>{#p/basic}{#npc/a}* Yes.\n* That was a pun.\n* I'm a pun mouse now." ]
                  : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                  ? [ '<32>{#p/basic}{#npc/a}* And worse still...' ]
                  : [ '<32>{#p/basic}{#npc/a}* 暫時吧。' ]
         ),
         t_zorren: pager.create(
            0,
            () => [
               "<32>{#p/basic}{#npc/a}* （喔，嘿，是我，佐倫。）",
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
                          '<32>* （你是，呃，對我們的警察，\n  呃，有意見，還是...？）',
                          '<32>* （...）',
                          "<32>* (Yeah, you know, uh, I don't really like you all that much.)",
                          "<32>* (There's just, something off, particularly about you.)"
                       ]
                  : [
                       ...(SAVE.data.b.oops
                          ? [
                               '<32>* （你是，呃，對我們的警察，\n  呃，有意見，還是...？）',
                               '<32>* （沒有嗎？）\n* （嘿，還好你呃，沒有。）'
                            ]
                          : [
                               "<32>* (Y'know, you seem like someone who likes to show respect.)",
                               '<32>* (So, thanks for, uh, doing that.)'
                            ]),
                       ...(SAVE.data.b.s_state_capstation
                          ? []
                          : ((SAVE.data.b.s_state_capstation = true),
                            [
                               '<32>* （實際上...）',
                               '<32>* （給你，孩子。）\n* （我們手裡，有個鑰匙。）',
                               '<32>{#s/equip}{#p/human}* （你把生鏽的鑰匙\n  掛到了鑰匙串上。）',
                               '<32>* （打開「手機」來查看\n  所有獲得的鑰匙。）',
                               "<32>{#p/basic}{#npc/a}* （我想，呃，我們應該\n  在什麼地方有個兵工廠。）"
                            ])),
                       ...(SAVE.data.b.oops
                          ? [
                               '<32>* （噓...）\n* （就是，這個警察崗是我和\n  卡巴克兩個人自己建的。）',
                               '<32>* （很酷，是吧？）'
                            ]
                          : [
                               '<32>* （噓...）\n* （就是，這個警察崗是我和\n  卡巴克兩個人自己建的。）',
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
                  ? [ "<32>{#p/basic}{#npc/a}* （沒錯，我們不是真警察。）" ]
                  : [
                       '<32>{#p/basic}{#npc/a}* (We may not be real police, but people like you are worth protecting and serving.)'
                    ]
         )
      },
      objinter: {
         ctower0: () => [
            '<32>{#p/human}* （你激活了終端。）',
            ...(SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The note describes reducing the total to zero by adding or subtracting powers of ten.)'
                 ]
               : [
                    '<32>{#p/basic}* 顯示器側面釘著一份說明...',
                    '<33>* 上面的字跡全是狂草，你根本\n  看不清楚。\n* 除了一個字，「零」。'
                 ])
         ],
         ctower1: () =>
            SAVE.data.b.s_state_mathpass
               ? SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (But you already completed this puzzle beforehand.)' ]
                  : [ '<32>{#p/basic}* The terminal is now in an unlocked state.' ]
               : [ "<32>{#p/basic}* 不能使用了。" ],
         microwave0: [ '<32>{#p/human}* （你看了看微波爐的後面...）', '<32>{#p/basic}* 沒什麼有用的東西。' ],
         microwave1: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* （你看了看微波爐的後面...）',
                    '<32>{#s/equip}{#p/human}* （你按下了開關。）'
                 ]
               : [
                    '<32>{#p/human}* （你看了看微波爐的後面...）',
                    "<32>{#p/basic}* 這裡有個開關...",
                    '<32>{#s/equip}{#p/human}* （你按下了開關。）'
                 ],
         microwave2: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* （你看了看微波爐的後面...）',
                    '<32>{#p/human}* (But you already flipped the switch here.)'
                 ]
               : [ '<32>{#p/human}* （你看了看微波爐的後面...）', '<32>{#p/basic}* 沒有新東西。' ],
         microwave3: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (But you didn't notice anything of note about this appliance.)" ]
               : [
                    '<32>{#p/basic}* 標準規格的電介質加熱器，\n  首塔製造。\n* 260X年前後製成。',
                    "<32>* 這就是臺微波爐。\n  頂多用了十年。"
                 ],
         microwave4: () => [
            '<32>{#p/basic}* 它似乎在投射某種重力場。',
            ...(SAVE.data.b.oops ? [] : [ "<32>{#p/basic}* 我有點好奇... \n  這附近有沒有開關什麼的..." ])
         ],
         papmail1: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (But you didn't have any mail to send.)" ]
               : [
                    '<32>{#p/basic}* 信箱上標注著「帕派瑞斯」。',
                    choicer.create('* （看裡邊嗎？）', "看一眼", "算了")
                 ],
         papmail2: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/human}* （你往裡看了一眼...）',
                       world.runaway
                          ? "<32>{#p/basic}* It's even emptier than before."
                          : "<32>{#p/basic}* It's not empty?"
                    ]
                  : [
                       '<32>{#p/human}* （你往裡看了一眼...）',
                       "<32>{#p/basic}* 空的。",
                       ...(31 <= SAVE.data.n.plot &&
                       SAVE.data.n.plot_date < 0.1 &&
                       SAVE.data.n.state_starton_papyrus !== 1
                          ? [
                               '<18>{#p/papyrus}{#f/0}謝謝你你能來\n檢查我的郵件！',
                               "<18>{#p/papyrus}{#f/4}謝天謝地，\n我已經全都整理好了。"
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/human}* （你往裡看了一眼...）',
                       world.runaway
                          ? "<32>{#p/basic}* It's even emptier than before."
                          : "<32>{#p/basic}* It's not empty?"
                    ]
                  : [ '<32>{#p/human}* （你往裡看了一眼...）', "<32>{#p/basic}* 空的。" ]
         ),
         papmail3: [ '<32>{#p/human}* （你決定不再看了。）' ],
         puzzlechip: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But you already completed this puzzle beforehand.)' ]
               : [ '<32>{#p/basic}* The terminal is now in an unlocked state.' ],
         spagtable0: [ "<32>{#p/basic}* 一個沒用過的盤子。" ],
         spagtable1: [
            '<32>{#p/human}* （你凝視著令人垂涎的\n  義大利麵。）',
            '<32>{#p/human}* （似乎是夠不到它了。）'
         ],
         spagtable2: [ '<32>{#p/human}* （你得到了義大利麵。）' ],
         spagtable2b: [ "<32>{#p/human}* （你帶的東西太多，裝不下它了。）" ],
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
                    '<32>{#p/human}* （你激活了終端。）',
                    "<32>{#p/basic}* 這是個遊戲終端...",
                    ...(SAVE.data.n.plot === 72 || world.postnoot
                       ? [ '<32>{#p/basic}* 電源被切斷了。' ]
                       : [ '<32>{#p/basic}* 「儘可能快速射擊目標！\n   用[Z]來射擊。」' ])
                 ])
         ]
      },
      papbooks1: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The books on this bookshelf consist of puzzler's guides and children's stories.)" ]
               : [
                    '<32>{#p/basic}* 書架上擺滿了關於\n  謎題創作的複雜書籍。',
                    "<32>* 還有兒童讀物。",
                    ...(roomready()
                       ? [
                            '<18>{#p/papyrus}我把一部分\n我最喜歡的書\n都放在那個書架上。',
                            '<18>{#f/4}比如《為聰明人\n設計的高級\n謎題結構》。',
                            '<18>{#f/0}我另一本最愛呢？',
                            '<18>{#f/4}是《和毛茸茸的兔子\n捉迷藏》。',
                            '<18>{#f/8}結局每次都會\n打動到我！'
                         ]
                       : [])
                 ],
         () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The books on this bookshelf consist of puzzler's guides and children's stories.)" ]
               : [ "<32>{#p/basic}* 複雜的手冊和兒童讀物。" ]
      ),
      papbooks2: pager.create(
         1,
         [
            '<32>{#p/human}* （你取下了一本書...）',
            '<32>{#p/basic}* 「奠定謎題互動價值的，\n   是玩家的配合程度。」',
            '<32>* 「每個玩家都有探索、前進\n   和完成既定任務的\n   內在動力。」',
            '<32>* 「那些具有挑戰性、能夠\n   吸引這些動力的謎題...」',
            '<32>* 「能夠確保玩家始終\n   專注於任務，直到最後一刻。」',
            '<32>{#p/human}* （你把書放回了書架。）'
         ],
         [
            '<32>{#p/human}* （你取下了一本書...）',
            '<32>{#p/basic}* 「『來玩躲貓貓吧！』\n  人類從牆後出現，\n  對小兔子說道。」',
            '<32>* 「毛茸茸的兔子又驚又喜，\n   興奮地看著眼前的人類。」',
            '<32>* 「然後，人類離開了...\n   毛茸茸的兔子看不到人類了，\n   它非常地傷心。」',
            '<32>* 「它的身體顫抖著，\n   思考著自己是多麼孤單。」',
            '<32>* 「它很想哭，\n   覺得自己被永遠拋棄了...」',
            '<32>* 「但後來，人類又出現了，\n   世界又恢復了正常。」',
            '<32>* 「人類和兔子給了彼此\n   一個大大的、毛茸茸的擁抱。」',
            '<32>{#p/human}* （你把書放回了書架。）'
         ],
         () =>
            world.runaway
               ? [
                    '<32>{#p/human}* （你取下了一本書...）',
                    '<23>{#p/papyrusnt}「親愛的日計：\n力場已經被摧毀了。」',
                    '<23>\"FRISK, THE HUMAN WHO CAME TO THE OUTPOST JUST A FEW DAYS AGO...\"',
                    '<23>\"IS NOW THE SUBJECT OF FEAR AMONG EVERYONE ON THE OUTPOST.\"',
                    '<23>\"WE\'RE ALL LEAVING RIGHT AWAY, BEFORE THEY WAKE UP.\"',
                    '<23>\"STILL, A PART HOPES THEY FIND THEIR WAY OFF THE OUTPOST, TOO.\"',
                    '<23>\"EVERYONE ELSE JUST SEEMS CONTENT LEAVING THEM TO DIE.\"',
                    '<32>{#p/human}* （你把書放回了書架。）'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/human}* （你取下了一本書...）',
                    '<23>{#p/papyrusnt}「親愛的日計：\n力場已經被摧毀了。」',
                    '<23>\"FRISK, THE HUMAN WHO CAME TO THE OUTPOST JUST A FEW DAYS AGO...\"',
                    '<23>\"TOOK ON IMPOSSIBLE ODDS TO SAVE US FROM DESTRUCTION.\"',
                    '<23>\"MAYBE THIS IS WHAT\'LL INSPIRE SANS TO MOVE UP IN THE WORLD.\"',
                    '<23>\"I ONLY MENTION IT BECAUSE, I NEVER KNEW HIS SENTRY JOB...\"',
                    '<23>\"MEANT DOING SO LITTLE ACTUAL WORK.\"',
                    '<32>{#p/human}* （你把書放回了書架。）'
                 ]
               : [
                    '<32>{#p/human}* （你取下了一本書...）',
                    '<23>{#p/papyrusnt}「親愛的日計：\n衫斯剛剛被任命為\n正式的皇家哨兵。」',
                    '<23>「最開始，\n我對他非常地不解...」',
                    '<23>「畢竟，為什麼一個\n這麼懶的人會想\n承擔這個工作？」',
                    '<23>「算了，\n我就不去追問什麼了。」',
                    '<23>「事實上，我為他感到\n非常驕傲！！！」',
                    '<23>「只有時間才能證明\n這會帶來什麼\n偉大的事情。」',
                    '<32>{#p/human}* （你把書放回了書架。）'
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
                            "<18>{#p/papyrus}域外網！\n我在那上面\n超有人氣的。",
                            "<18>{#f/4}再有12個關注...",
                            '<18>{#f/0}我的粉絲數\n就到兩位數了！'
                         ]
                       : []),
                    SAVE.data.b.svr
                       ? '<32>{#p/human}* (You move towards the computer...)'
                       : "<32>{#p/basic}* 電腦的瀏覽器\n  打開了一個\n  社交媒體網站。",
                    choicer.create("* （登入帕派瑞斯的帳號嗎？）", '是', '否')
                 ],
         () =>
            postSIGMA()
               ? [ "<32>{#p/basic}* 不能使用了。" ]
               : [
                    SAVE.data.b.svr
                       ? '<32>{#p/human}* (You move towards the computer...)'
                       : "<32>{#p/basic}* 電腦的瀏覽器\n  打開了一個\n  社交媒體網站。",
                    choicer.create("* （登入帕派瑞斯的帳號嗎？）", '是', '否')
                 ]
      ),
      papcomputer2: [ '<32>{#p/human}* （你決定先不登入。）' ],
      papcomputer3: {
         a: '酷炫骷髏95',
         b: '粉絲數 -2',
         c: '這個帳號屬於\n偉大的\n帕派瑞斯。\n只發高質量\n帖子！',
         d: '- 新聞 -',
         e: () =>
            world.runaway
               ? '突發新聞：\n..\n..\n..\n..我們得走了。'
               : SAVE.data.n.plot === 72
               ? 'BREAKING:\nWE CAN LEAVE.\nLIKE.. FOR REAL.\nSOURCE:\nLOOK OUTSIDE,\nPEOPLE!'
               : "突發新聞：\n《喵喵星火》\n評分..\n一塌糊塗。\n新聞來源：\n就，這是真的嗎？"
      },
      papcomputer4: [
         () =>
            world.runaway
               ? {
                    a: '哈囉！',
                    b: '自求多福吧...',
                    c: ''
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '哈囉！',
                    b: '網路連接失敗...',
                    c: ''
                 }
               : {
                    a: '哈囉！',
                    b: '分享你的想法...',
                    c: ''
                 },
         () =>
            world.runaway
               ? {
                    a: '艾菲斯',
                    b: '今天',
                    c: '< 訊息已刪除 >'
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '系統訊息',
                    b: '今天',
                    c: '域外網於今日關停。'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: '納普斯特22',
                    b: '今天',
                    c: '再也不上網了...\n太沒勁了...'
                 }
               : world.genocide
               ? {
                    a: '納普斯特22',
                    b: '今天',
                    c: "沒關係的...\n我是幽靈..."
                 }
               : world.dead_skeleton
               ? {
                    a: '納普斯特22',
                    b: '今天',
                    c: "嗯...\n我還是去忙這首曲子的\n混音吧..."
                 }
               : {
                    a: '懶骨.',
                    b: '今天',
                    c: "咱們快祈禱他別把\n我們的靈~魂也抓走嚕~\n*手槍biubiu*",
                    d: true
                 },
         () =>
            world.runaway
               ? {
                    a: '懶骨.',
                    b: '今天',
                    c: '< 訊息已刪除 >',
                    d: true
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '艾菲斯',
                    b: '今天',
                    c: '哎呀，\n我忘了關伺服器了'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: '壯魚91',
                    b: '昨天',
                    c: '嗯... 你不是每天都這麼說嗎，\n帕派瑞斯？'
                 }
               : world.genocide
               ? {
                    a: '壯魚91',
                    b: '今天',
                    c: '小幽，快點離開這。\n我不想看到你也跟著受傷。'
                 }
               : world.dead_skeleton
               ? {
                    a: '壯魚91',
                    b: '今天',
                    c: '小幽，帕派瑞斯不在了。\n我會讓那人類血債血償。'
                 }
               : {
                    a: '壯魚91',
                    b: '今天',
                    c: '呃，沒抓到...\n不過，他成功俘獲了我們\n每個人的心！呋呼呼！！'
                 },
         () =>
            world.runaway
               ? {
                    a: '酷炫骷髏95',
                    b: '今天',
                    c: '< 訊息已刪除 >'
                 }
               : SAVE.data.n.plot === 72
               ? {
                    a: '_舟亢忝洐_',
                    b: '今天',
                    c: '< 使用者名更新 >\n原名：_摋掱亾耦_\n現在：_舟亢忝洐_'
                 }
               : SAVE.data.n.plot < 34
               ? {
                    a: '酷炫骷髏95',
                    b: '昨天',
                    c: "今天，\n就是我要抓到人類的日子！\n我能從骨子裡感覺到！"
                 }
               : world.genocide
               ? {
                    a: '納普斯特22',
                    b: '今天',
                    c: '呃...\n我有什麼能幫忙的嗎？\n事情變得更糟了...'
                 }
               : {
                    a: '納普斯特22',
                    b: '今天',
                    c: '所以... 帕派瑞斯\n抓到人類了嗎？還是...'
                 }
      ] as (() => { a: string; b: string; c: string; d?: boolean })[],
      papcomputer5: () =>
         world.runaway
            ? [ '弗裡斯克', "你敢", '跟過來', '試試' ]
            : SAVE.data.n.plot === 72
            ? [ '對不起', "但我們", '停服啦', '笑死' ]
            : [ '刷新頁面', '查看訊息', '聊天設定', '登出' ],
      papcouch0: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* （你在沙發裡什麼都找不到。）" ]
            : [ "<32>{#p/basic}* 已經被清理乾淨了。" ],
      papcouch1: pager.create(
         0,
         () => [
            '<32>{#p/human}* （你聽到沙發裡\n  有叮噹的聲音。）',
            SAVE.data.b.svr
               ? '<32>{#p/human}* （好像這裡留了一堆硬幣...）'
               : '<32>{#p/basic}* 裡面有一堆硬幣...',
            choicer.create('* （拿走這些硬幣嗎？）', '是', '否')
         ],
         () => [
            SAVE.data.b.svr
               ? "<32>{#p/human}* （硬幣並沒有長出腿跑了。）"
               : '<32>{#p/basic}* 硬幣還在。',
            choicer.create('* （拿走這些硬幣嗎？）', '是', '否')
         ]
      ),
      papcouch2: [ '<32>{#p/human}* （你決定什麼也不拿。）' ],
      papcouch3: [ '<32>{#p/human}* （你找到了10G。）' ],
      papcouch3a: [
         "<18>{#p/papyrus}{#f/1}你在幫我們\n清理沙發！？",
         '<18>{#p/papyrus}{#f/5}你真的徹頭徹尾的\n是個善良的人...',
         '<18>{#p/papyrus}{#f/6}多麼慷慨！！！'
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
            ? "<18>{#p/papyrus}{#f/5}哇，你真的\n好渴望約會啊..."
            : "<18>{#p/papyrus}{#f/5}哇，你真的\n好渴望找我玩啊...",
         "<18>{#f/5}甚至要搶在\n我前面進我家！",
         "<18>{#f/6}你真的\n很重視啊！"
      ],
      papdate1x: pager.create(
         0,
         [
            '<18>{#p/papyrus}{#f/0}你好，人類！',
            '<18>{#f/5}希望你過得愉快。',
            '<18>{#f/6}到鎮上隨便走走...',
            '<18>{#f/0}...或者來我家看看\n都行！'
         ],
         [ "<18>{#p/papyrus}{#f/4}不過，離衫斯的房間\n遠一點。" ]
      ),
      papdate1: () => [
         SAVE.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}所以你回來\n跟我約會了！'
            : '<18>{#p/papyrus}所以你回來\n看我了！',
         ...(world.dead_dog || world.population < 6
            ? [
                 "<18>{#f/0}太好了！！",
                 "<18>{#f/5}說實話，\n今天感覺有點孤單...",
                 '<18>{#f/5}今天，好多居民\n離奇失蹤了...',
                 "<18>{#f/0}不過，你還在這！！",
                 '<18>{#f/0}你肯定不同於常人，\n對吧？？'
              ]
            : [ '<18>{#f/4}你肯定非常\n看重這件事...' ]),
         "<18>{#f/5}我會帶你去一個\n很特別的地方...",
         '<18>{#f/0}一個我願意花大把\n時間流連忘返的\n地方！！！'
      ],
      papdate2: [ '<18>{#p/papyrus}我家！！！' ],
      papdate3: pager.create(
         0,
         [ '<18>{#p/papyrus}歡迎來我豪華的\n家裡做客！', '<18>好好享受，\n慢慢參觀！！！' ],
         [ "<18>{#p/papyrus}如果你看完了，\n就上樓來我的房間！" ]
      ),
      papdate3a: [ '<18>{#p/papyrus}{#f/6}哇！當個好主人\n可真是個體力活！' ],
      papdate3b: [
         "<18>{#p/papyrus}{#f/5}哎呀，我腿都麻了...",
         "<18>{#f/0}那肯定證明了\n我是個好主人！！！"
      ],
      papdate4: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}那是我的房間！",
            "<18>{#f/4}如果這裡的東西\n你都看完了，\n那我們就進去...",
            '<18>{#f/4}然後...',
            SAVE.data.b.flirt_papyrus
               ? '<18>{#f/9}做大家會在\n約會的時候\n做的事！'
               : '<18>{#f/9}像一對酷酷的朋友\n一樣「消遣」吧！',
            choicer.create('* （你要怎麼回答？）', '是', '否')
         ],
         () => [ '<18>{#p/papyrus}準備好了嗎？', choicer.create('* （你要怎麼回答？）', '是', '否') ]
      ),
      papdate4a: [ "<18>{#p/papyrus}好，我們進去吧！" ],
      papdate4b: [ "<18>{#p/papyrus}I'LL KEEP WAITING HERE THEN!" ],
      papdate5: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}所以，呃...',
            "<18>{#f/5}如果你看完了\n所有東西...",
            SAVE.data.b.flirt_papyrus
               ? '<18>{#f/6}那你想開始\n約會嗎？'
               : '<18>{#f/6}那你想開始\n消遣嗎？',
            choicer.create('* （你要怎麼回答？）', "開始吧", "再等等")
         ],
         () => [ '<18>{#p/papyrus}{#f/6}準備開始了嗎？', choicer.create('* （你要怎麼回答？）', "開始吧", "再等等") ]
      ),
      papdate5a: () => [
         SAVE.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}好！！！\n約會開始！！！'
            : "<18>{#p/papyrus}好！！！\n我們開始消遣叭！！！"
      ],
      papdate5b: [ "<18>{#p/papyrus}慢慢看，不著急。\n我會等你的。" ],
      papdate6: () => [
         SAVE.data.b.flirt_papyrus
            ? '<#32>{#p/story}           約會    開始！'
            : '<#32>{#p/story}           消遣    開始！'
      ],
      papdate7: () => [
         '<15>{#p/papyrus}{#f/10}我們！！',
         SAVE.data.b.flirt_papyrus ? '<15>{#f/20}開始約會了！！' : '<15>{#f/20}開始消遣了！！',
         "<15>{#f/24}我實際上之前\n從來沒做過\n這種事。",
         "<15>{#f/10}但別擔心！！！",
         '<15>{#f/20}我的（個人）詞典裡\n可是有「準備」\n這個詞的！'
      ],
      papdate8: () => [
         '<15>{#f/20}你問我手裡\n拿的是什麼？',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/10}這是本官方的\n約會指南，我直接\n從圖書倌借來的！'
            : '<15>{#p/papyrus}{#f/10}這是本官方的\n消遣指南，我直接\n從圖書倌借來的！',
         "<15>{#f/20}有了這個，\n我們一定會玩得\n很開心！"
      ],
      papdate9: () => [
         "<15>{#p/papyrus}{#f/25}讓我看看...",
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/25}第一步：\n按下C或CTRL鍵\n打開{@fill=#f00}約會面板{@fill=#000}。'
            : '<15>{#f/25}第一步：\n按下C或CTRL鍵\n打開{@fill=#f00}消遣面板{@fill=#000}。'
      ],
      papdate10: () => [
         '<15>{#p/papyrus}{#f/24}...等下。',
         '<15>{#f/22}你早就\n按好了！？！？',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/11}哇，你肯定\n很愛我吧！'
            : '<15>{#f/11}哇，你肯定\n很喜歡我吧！',
         "<15>{#f/10}那麼，\n開始第二步！"
      ],
      papdate11: [
         '<15>{#p/papyrus}{#f/24}...',
         "<15>{#f/24}呃，反正\n我們也不需要。",
         '<15>{#f/20}來看第二步！'
      ],
      papdate12: [
         '<15>{#p/papyrus}{#f/11}哇，我感覺\n充滿了資訊！',
         "<15>{#f/24}事實上，我認為\n我們已經可以\n進入第二步了..."
      ],
      papdate13: () => [
         SAVE.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/25}第二步：\n邀請約會對象。'
            : '<15>{#p/papyrus}{#f/25}第二步：\n邀請消遣對象。'
      ],
      papdate13a: () => [
         '<15>{#f/24}「咳咳。」',
         '<15>{#f/20}人類！\n我，偉大的\n帕派瑞斯...',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/10}想和你一起\n約會！'
            : '<15>{#f/10}想和你一起\n消遣！'
      ],
      papdate14: () => [ choicer.create('* （你要怎麼回答？）', '是', '否') ],
      papdate15a: [ '<15>{#p/papyrus}{#f/12}真-真的？？？', '<15>{#f/11}哇！！！' ],
      papdate15a1: [ "<15>{#f/24}我想，這意味著\n是時候開始\n第三步了..." ],
      papdate15b: [ '<15>{#p/papyrus}{#f/21}喔...', '<15>{#f/27}還-還好，\n上面只說了\n要邀請。' ],
      papdate15c: [ "<15>{#f/24}那無論如何，\n是時候開始\n第三步了..." ],
      papdate16: [ '<15>{#p/papyrus}{#f/25}第三步：\n穿上漂亮的衣服\n表示你在乎。' ],
      papdate16a: [ '<15>{#p/papyrus}{#f/24}...', '<15>{#f/24}等一下。' ],
      papdate17: () => [
         '<15>{#f/24}漂亮的衣服...',
         (
            {
               spacesuit: "<15>{#f/26}你正穿著件\n舊太空衣呢...",
               halo: '<15>{#f/26}你正頂著個\n漂亮的光環呢...',
               eye: '<15>{#f/26}你正開著一道\n力場護盾呢...',
               eye_x: '<15>{#f/26}你正開著一道\n力場護盾呢...',
               temyarmor: "<15>{#f/26}你正披著\n一件盔甲呢...",
               goggles: '<15>{#f/26}你正戴著臺\nAR裝置呢...',
               goggles_x: '<15>{#f/26}你正戴著臺\nAR裝置呢...',
               visor: '<15>{#f/26}你正戴著\n一個護目鏡呢...',
               visor_x: '<15>{#f/26}你正戴著\n一個護目鏡呢...',
               sonic: "<15>{#f/26}你正扛著個\n奇怪的裝置呢...",
               heart_locket: '<15>{#f/26}你正戴著個吊墜呢...'
            } as Partial<CosmosKeyed<string>>
         )[SAVE.data.s.armor] || '<15>{#f/26}你身上的\n那個東西...',
         "<15>{#f/20}你現在就\n穿著衣服呢！！！",
         '<15>{#f/24}不僅如此...',
         '<15>{#f/20}今天早些時候，\n你也穿著衣服呢！'
      ],
      papdate17a: () => [
         '<15>{#f/12}不會吧...！\n這是不是說？？？',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/13}你打從一開始\n就打算和我\n約會了？？？'
            : '<15>{#f/13}你打從一開始\n就打算和我\n做朋友了？？？'
      ],
      papdate18a: () => [
         '<15>{#p/papyrus}{#f/22}不！！',
         '<15>{#f/22}這一切都在你\n計畫之內！！！',
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/22}你可能都比我更\n擅長約會！！！',
                 '<15>不-不！！！你的\n{@fill=#003cff}約會能量{@fill=#000}...！！！'
              ]
            : [
                 '<15>{#f/22}你可能都比我更\n擅長消遣！！！',
                 '<15>不-不！！！你的\n{@fill=#003cff}友誼能量{@fill=#000}...！！！'
              ])
      ],
      papdate18b: () => [
         '<15>{#p/papyrus}{#f/24}喔...',
         '<15>{#f/21}不過，你嘴上那麼說...',
         '<15>{#f/21}...但這一整天，\n你還是好好穿了衣服？',
         "<15>{#f/24}也就是說...",
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
         "<15>{#p/papyrus}{#f/15}別以為你已經\n打敗我了!",
         '<15>{#f/20}我，偉大的\n帕派瑞斯...',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/20}之前從來沒有\n在約會上輸過...'
            : '<15>{#f/20}之前從來沒有\n在消遣上輸過...',
         '<15>{#f/15}以後也不會！！',
         '<15>{#f/10}我很容易就\n可以跟上你的\n節奏！！！',
         '<15>{#f/24}實際上...',
         '<15>{#f/20}我在平常的\n衣服下面...',
         '<15>{#f/20}一直穿著我的\n「特別」服裝！！',
         '<15>{#f/15}你等著！！'
      ],
      papdate21: [ '<15>{#p/papyrus}{#f/15}你覺得我的\n秘密穿搭\n怎麼樣？' ],
      papdate22: () => [ choicer.create('* （你要怎麼回答？）', '很棒', '很差勁') ],
      papdate23a: [ '<15>{#p/papyrus}{#f/13}不！！！', '<15>{#f/13}發自內心的\n讚美...！' ],
      papdate23b: [ '<15>{#p/papyrus}{#f/13}不！！！', '<15>{#f/13}你在批評我...\n你果然真心為我好！' ],
      papdate24: [
         '<15>{#p/papyrus}{#f/24}然而...',
         "<15>{#f/20}你根本不明白\n這身衣服背後\n{@fill=#f00}隱藏的力量{@fill=#000}！",
         '<15>{#f/26}因此...'
      ],
      papdate24a: () => [
         '<15>{#f/15}你剛才的回答\n無效！！',
         SAVE.data.b.flirt_papyrus
            ? "<15>{#f/15}這場約會不會\n再有更多\n進展了！"
            : "<15>{#f/15}這場消遣不會\n再有更多\n進展了！",
         '<15>{#f/24}除非...',
         '<15>{#f/20}你能找到我的\n{@fill=#f00}秘密{@fill=#000}。',
         "<15>{#f/15}但那是不會\n發生的！！"
      ],
      papdate24b: '* 移動並用[Z]互動。',
      papdate25: [
         
         '<15>{#p/papyrus}{#f/21}我頭上的\n假髮...？',
         '<15>{#f/16}我頭上的假髮。',
         '<15>{#f/10}我頭上的...\n假髮！！！',
         "<15>{#f/10}捏嘿嘿！\n意義重大的\n回答！"
      ],
      papdate25a: [
         '<15>{#p/papyrus}{#f/21}OVERWHELMED BY THE SIGHT OF MY \"STELLAR\" OUTFIT?',
         '<15>{#f/24}NO, NO, I UNDERSTAND.',
         "<15>{#f/20}BUT YOU CAN'T BACK DOWN NOW!!!"
      ],
      papdate25b: [
         '<15>{#p/papyrus}{#f/26}這件襯衫上\n本來沒有寫著\n「閃亮」的...',
         '<15>{#f/20}但是我\n改良了一下！',
         '<15>{#f/10}專家提示：\n所有的衣服都\n可以通過這種\n方式改良。',
         "<15>{#f/20}...但這裡可\n沒藏什麼秘密！\n再試試吧！"
      ],
      papdate25c: [
         '<15>{#p/papyrus}{#f/24}我懂，我懂。',
         '<15>{#f/24}你喜歡用一顆\n漂浮的心\n感受我的\n手臂靠枕。',
         "<15>{#f/20}但是誰又\n不喜歡呢！？\n再試試吧！"
      ],
      papdate25d: [
         "<15>{#p/papyrus}{#f/13}你握住我的手，\n想讓我把答案\n告訴你...？",
         '<15>{#f/14}我-我不，\n我必須忍住！！',
         '<15>{#f/20}再試試吧！'
      ],
      papdate25e: [
         "<15>{#p/papyrus}{#f/26}PILLOWS OR NOT, THERE'S NO SECRET TO MY LEGS.",
         '<15>{#f/10}ONLY HARD WORK AND PERSEVERANCE!',
         '<15>{#f/20}再試試吧！'
      ],
      papdate25f: [
         '<15>{#p/papyrus}{#f/24}這裡的「潮流」\n或許確實\n無人能敵...',
         '<15>{#f/20}但要是期待這裡\n有什麼秘密是\n完全不可能的！',
         '<15>{#f/20}再試試吧！'
      ],
      papdate25g: [
         '<15>{#p/papyrus}{#f/20}啊這個！\n這是我的\n頂級運動服！',
         "<15>{#f/24}你在這裡可\n找不到任何\n秘密，因為...",
         "<15>{#f/20}我就沒有口袋\n可以裝！！！",
         '<15>{#f/20}再試試吧！'
      ],
      papdate25h: () => [
         '<15>{#p/papyrus}{#f/24}我的肩膀...',
         '<15>{#f/10}你是想讓我\n把你背到\n肩上嗎？？',
         SAVE.data.b.flirt_papyrus
            ? "<15>{#f/24}如果我們沒在\n忙著約會的話，\n我肯定會給你。"
            : "<15>{#f/24}如果我們沒在\n忙著消遣的話，\n我肯定會給你。",
         '<15>{#f/20}所以現在不行！\n再試試吧！'
      ],
      papdate25i: [
         '<15>{#p/papyrus}{#f/14}你認真嗎？？',
         "<15>{#f/19}我沒想就這麼\n【告訴】你\n秘密的...",
         "<15>{#f/20}你還必須得\n再加把勁！"
      ],
      papdate25j: () =>
         calcLV() > 2
            ? [
                 '<15>{#p/papyrus}{#f/24}IF YOUR {@fill=#f00}LV{@fill=#000} IS THIS HIGH, THEN...',
                 SAVE.data.b.flirt_papyrus
                    ? '<15>{#f/28}YOUR {@fill=#f00}LOVE{@fill=#000} FOR ME MUST BE EVEN GREATER THAN I THOUGHT!'
                    : "<15>{#f/28}YOU'VE GOT MORE EXPERIENCE WITH {@fill=#f00}LOVE{@fill=#000} THAN I THOUGHT!",
                 "<15>{#f/24}STILL, THAT'S YOUR SECRET, NOT MINE.",
                 '<15>{#f/20}再試試吧！'
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
                 '<15>{#f/20}再試試吧！'
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
                 '<15>{#f/20}再試試吧！'
              ]
            : [
                 '<15>{#p/papyrus}{#f/24}AN {@fill=#f00}LV{@fill=#000} OF ZERO?',
                 "<15>{#f/26}OKAY, THAT'S WEIRD.",
                 "<15>{#f/21}SANS TOLD ME A HUMAN'S {@fill=#f00}LOVE{@fill=#000} STARTS AT ONE.",
                 '<15>{#f/24}HMM...',
                 '<15>{#f/24}IS THIS YOUR SECRET?',
                 '<15>{#f/20}WELL, THIS IS SUPPOSED TO BE ABOUT MY SECRET!',
                 '<15>{#f/20}再試試吧！'
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
         '<15>{#f/20}再試試吧！'
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
         '<15>{#f/24}我覺得我沒有\n什麼別的選擇，\n只能承認\n事實了。',
         "<15>{#f/24}這是個...",
         [ '<15>{#f/27}只-只送給你的\n禮物！！！', '<15>{#f/27}給我們兩個\n分享的禮物！！！' ][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
         ],
         '<15>{#f/10}快！\n快打開！'
      ],
      papdate27: () => [ choicer.create('* （你該怎麼辦？）', '打開', '不要') ],
      papdate28: [
         "<15>{#p/papyrus}{#f/21}你甚至都\n捨不得拆開\n我精緻的包裝？",
         '<15>{#f/27}不-不...\n居然來這招...',
         "<15>{#f/13}真的好厲害！",
         '<15>{#f/14}但-但是...\n啊哈！\n看我的反擊！',
         "<15>{#f/15}我自己拆\n不就好了！！"
      ],
      papdate29: [ '<15>{#p/papyrus}{#f/20}你知道【這】是\n什麼嗎？' ],
      papdate30: () => [ choicer.create('* （你知道這是什麼嗎？）', "當然知道", "不知道") ],
      papdate31a: [
         '<15>{#p/papyrus}{#f/26}義大利麵。',
         "<15>{#f/24}這是你現在\n腦子裡的想法，\n沒錯吧？",
         '<15>{#f/20}對了！',
         '<15>{#f/15}但是也-\n錯了！'
      ],
      papdate31b: [
         "<15>{#p/papyrus}{#f/20}捏嘿嘿！\n這才對嘛。",
         '<15>{#p/papyrus}{#f/15}你根本想不到！',
         '<15>{#f/24}雖然這看起來\n是義大利麵...'
      ],
      papdate32: () => [
         "<15>{#p/papyrus}{#f/20}這可不是什麼\n普通的意面！",
         "<15>{#f/20}這是一個\n大師的傑作！",
         '<15>{#f/24}絲般柔滑的意面，\n在時間膨脹\n單元之中\n精細陳化。',
         '<15>{#f/20}然後再由我，\n主廚帕派瑞斯\n來加工！',
         "<15>{#f/15}人類！！！\n是時候結束這\n一切了！！",
         "<15>我們不能再這樣\n僵持下去了！",
         ...[ [ "<15>{#f/20}我們一起來吃\n這盤義大利麵\n吧！！！" ], [ '<15>{#f/20}盡情享受我的\n終極廚藝吧！！' ] ][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
         ]
      ],
      papdate33: () => [ choicer.create('* （你該怎麼辦？）', '吃掉', '不要') ],
      papdate33a: () => [
         '<32>{#p/human}* （你咬了一小口。）\n* （味道讓你臉紅了。）',
         "<32>{#p/basic}* 真的好好吃...！",
         ...(SAVE.data.n.state_papyrus_spaghet === 1
            ? [ '<32>{#p/basic}* 帕派瑞斯看起來也吃得很開心。' ]
            : [])
      ],
      papdate34a: () => [
         '<15>{#p/papyrus}{#f/10}多麼充滿激情的\n表達！！',
         SAVE.data.b.flirt_papyrus
            ? '<15>{#f/12}你肯定真心愛著\n我的廚藝！'
            : '<15>{#f/12}你肯定真心喜歡\n我的廚藝！',
         ...[
            [
               '<15>{#f/24}那個，雖然\n我也這樣...',
               SAVE.data.b.flirt_papyrus
                  ? '<15>{#f/20}但我覺得你甚至\n比我更愛我的\n廚藝！！！'
                  : '<15>{#f/20}但我覺得你甚至\n比我更喜歡我的\n廚藝！！！'
            ],
            [ '<15>{#f/10}AND BY EXTENSION, ME!', '<15>{#f/20}MAYBE EVEN MORE THAN I DO!!!' ]
         ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2],
         "<15>{#f/27}但... 那是\n不可能的...！",
         '<15>{#f/12}你是怎麼\n做到的！？！？'
      ],
      papdate34b: () => [
         '<15>{#p/papyrus}{#f/21}你的意思是...',
         "<15>{#f/18}你要留給我吃？",
         ...[
            [
               '<15>{#f/24}我以為你之前\n說要分享...',
               '<15>{#f/20}你會至少想自己\n嘗一小口。',
               '<15>{#f/27}但你不是\n這樣的，\n你都留給我了...',
               '<15>{#f/12}你想讓我，\n讓【我】來，\n全都吃掉！！！'
            ],
            [
               '<15>{#f/21}即使你之前\n說過...',
               '<15>{#f/21}你想自己品嘗\n我的義大利麵...',
               '<15>{#f/27}就在你馬上要\n實現的時候，\n你...',
               '<15>{#f/12}你要放棄\n全留給我？？？'
            ]
         ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      papdate35: [ '<15>{*}{#p/papyrus}{#f/22}啊！！！{%15}' ],
      papdate36: [ '<15>{*}{#p/papyrus}{#f/22}呃！！！{%15}' ],
      papdate37: [ '<15>{*}{#p/papyrus}{#f/22}不啊啊啊！！！{%15}' ],
      papdate38: () => [
         "<18>{#p/papyrus}{@random=1.1/1.1}人類。\n一切都清晰明了了。",
         SAVE.data.b.flirt_papyrus
            ? "<18>{@random=1.1/1.1}你已經痴狂地\n愛上了我。"
            : "<18>{@random=1.1/1.1}你已經完全\n被我迷住了。",
         '<99>{@random=1.1/1.1}你做的每一件事。\n你說的每一個字。',
         "<18>{@random=1.1/1.1}一切的一切\n都是為了我。",
         '<18>{@random=1.1/1.1}人類。\n我也想讓你，\n感到快樂。',
         "<18>{@random=1.1/1.1}現在輪到我\n來表達我的\n感情了...",
         "<18>{@random=1.1/1.1}輪到我來告訴你\n我的真心話了。"
      ],
      papdate39: () =>
         SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/21}人類，我的\n真心話是...',
                 "<15>{#f/21}我就是不\n像你那樣\n喜歡我。",
                 '<15>{#f/24}我是說，\n浪漫的那種。',
                 '<15>{#f/27}我是說，我已經\n很努力了！',
                 '<15>{#f/27}我覺得因為你\n跟我調情過了...',
                 '<15>{#f/27}我就該跟你\n約一次會。',
                 '<15>{#f/10}然後，在我們\n約會的過程中，\n感情就會開花\n結果！！！',
                 '<15>{#f/20}我就能配得上\n你對我的熱情！',
                 '<15>{#f/21}但是...\n我，偉大的\n帕派瑞斯...',
                 '<15>{#f/21}失敗了。',
                 '<15>{#f/21}我跟之前相比\n沒什麼兩樣。',
                 '<15>{#f/27}最壞的部分是，\n跟你約會之後...',
                 '<15>{#f/22}我只會把你拉進\n更深的愛裡！',
                 '<15>{#f/21}那是激情的\n黑暗牢籠，\n無處可逃。',
                 '<15>{#f/27}我怎麼能這樣\n對我親愛的\n朋友呢...？',
                 '<15>{#f/27}...',
                 '<15>{#f/27}... 不...'
              ]
            : [ '<15>{#f/24}人類，實際上...' ],
      papdate39a: () => [
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 "<15>{#f/20}不！\n不是這樣的！",
                 "<15>{#f/17}我不會在任何\n事情上失敗！！！",
                 "<15>{#f/20}人類！！！\n我會幫助你度過\n這段艱難的\n時光！！！",
                 "<15>{#f/24}我可以繼續當你\n酷酷的朋友...",
                 '<15>{#f/20}然後把發生的\n這一切忘掉。',
                 '<15>{#f/10}畢竟，你也，\n很偉大。',
                 '<15>{#f/20}失去你的友誼\n會是一場悲劇！',
                 '<15>{#f/21}所以，拜託...',
                 "<15>{#f/21}不要因為我不能\n親吻你而哭泣...",
                 "<15>{#f/19}因為，我根本\n沒有嘴唇！！！",
                 ...(SAVE.data.n.plot < 48
                    ? [
                         "<15>{#f/10}嘿，總有一天，\n你會找到和我\n一樣好的人。",
                         "<15>{#f/24}呃，不。\n那是不可能的。",
                         "<15>{#f/20}但我也會接受\n你找個第二好的\n人！！！"
                      ]
                    : [ "<15>{#f/10}AND HEY, UNDYNE'S NOT TOO FAR FROM HERE.", '<15>{#f/20}WE CAN HANG OUT WITH HER!' ])
              ]
            : [
                 '<15>{#f/10}我也喜歡你！',
                 '<15>{#f/10}畢竟你是個\n超級大好人。',
                 '<15>{#f/21}但也許...',
                 "<15>{#f/21}如果你多為\n自己而活的話，\n你會過得更好的。",
                 '<15>{#f/21}不能只為了\n我而活。',
                 '<15>{#f/10}很幸運的是，\n我知道解決\n方案！！！',
                 '<15>{#f/20}那就是跟我的上司，\n安黛因一起消遣！！！',
                 '<15>{#f/24}我覺得如果你\n可以把你的友誼能量\n分散一點...',
                 "<15>{#f/10}你的生活方式\n就會更健康。",
                 ...(SAVE.data.n.plot < 48
                    ? [ "<15>{#f/20}I'LL LET YOU KNOW WHEN I'M READY!" ]
                    : [ "<15>{#f/20}所以讓我們！\n一起加油吧！！" ])
              ]),
         '<15>{#f/20}捏嘿嘿\n嘿嘿！！！'
      ],
      papdate40: () => [
         '<15>{#f/24}喔，如果你還想\n找我的話...',
         "<15>{#f/10}這是我的\n{@fill=#f00}電話號碼{@fill=#000}。",
         '<15>{#f/11}歡迎你隨時\n打給我！',
         ...(SAVE.data.b.flirt_papyrus
            ? [
                 '<15>{#f/24}當然，\n是柏拉圖式的。',
                 ...(SAVE.data.n.plot < 48
                    ? [ '<15>{#f/10}那麼，\n我先走啦！' ]
                    : [ "<15>{#f/10}那麼，我們\n在安黛因的房子那裡\n見面吧！" ])
              ]
            : SAVE.data.n.plot < 48
            ? [ '<15>{#f/10}那麼，\n我先走啦！' ]
            : [ "<15>{#f/20}WELL, SEE YOU AT UNDYNE'S HOUSE!" ]),
         '<15>{#f/20}捏嘿嘿！'
      ],
      papdate41: {
         a: () => (SAVE.data.b.flirt_papyrus ? '浪漫' : '友誼'),
         b: '功率\n水平',
         c: '日期：克歷615年9月',
         d: '速度',
         e: '星系\n地圖',
         f: '緊張感'
      },
      pappuzzle1: [
         '<18>{#p/papyrus}{#f/0}人類！',
         '<18>{#f/0}下一個謎題\n是我最喜歡的\n謎題之一。',
         "<18>{#f/4}這就像我兄弟的\n棉球收藏一樣...",
         '<18>{#f/0}不論哪個地方\n都讓人滿意！',
         "<18>{#f/9}我【儘量】不告訴你\n解決方法。"
      ],
      pappuzzle1a: [ '<18>{#p/papyrus}{#f/0}試試吧！' ],
      pappuzzle1b: [
         '<18>{#p/papyrus}{#f/4}IT WOULD APPEAR THIS PUZZLE HAS BEEN SOLVED.',
         '<18>{#p/papyrus}{#f/4}BEHIND MY BACK.',
         '<18>{#p/papyrus}{#f/4}WITHOUT MY EXPRESS PERMISSION.',
         "<18>{#p/papyrus}{#f/0}WELL, SOMEBODY'S GOING TO HAVE A BAD DAY TODAY.",
         '<18>{#p/papyrus}{#f/5}...',
         '<18>{#p/papyrus}{#f/5}WITH ANY LUCK, THE NEXT PUZZLE WILL BE TAMPER-FREE.',
         "<18>{#p/papyrus}{#f/6}... I'LL MEET YOU IN THE NEXT ROOM."
      ],
      pappuzzle2: [ '<18>{#p/papyrus}哇！\n你解開了啊！！' ],
      pappuzzle2a: [ '<18>而且不用我的幫忙\n你就解開了！！！' ],
      pappuzzle2b: [ "<18>而且根本沒用我\n幫你太多\n你就解開了！" ],
      pappuzzle2c: [ '<18>雖然需要一點鼓勵，\n但你真的做到了！' ],
      pappuzzle2d: [
         '<18>你一定跟我一樣\n很在意謎題吧！',
         "<18>那麼，我覺得你肯定\n會愛上下個謎題的！",
         '<18>可能對你而言\n都算太簡單了！！',
         '<18>捏！\n嘿嘿！\n嘿嘿嘿！！！'
      ],
      papsink0: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The dog residue in this sink appears to be arranged in the shape of a heart.)',
                 '<32>* (Somehow, this seems to put you at ease.)'
              ]
            : SAVE.data.n.plot < 72
            ? [ "<32>{#p/basic}* 水槽太高了，\n  你都沒辦法洗手..." ]
            : [ "<32>{#p/basic}* There's a pile of dog residue in the sink." ],
      papsink1: [
         '<18>{#p/papyrus}{#f/9}厲害吧？\n我增加了水槽的高度。',
         '<18>{#f/0}現在我可以在下邊\n放更多骨頭了！\n你快看看！'
      ],
      papsink2: [ '<18>{#p/papyrus}{#f/8}不！是那條狗！' ],
      papsink3: [ '<18>{#p/papyrus}{#f/31}喔，好可憐\n好可憐的小狗狗...', '<18>{#f/9}給你，嘗嘗我的\n特殊攻擊！' ],
      papsink4: [ '<18>{#p/papyrus}哇！！！\n它喜歡誒！！！' ],
      papsink5: [ '<18>{#p/papyrus}{#f/7}衫斯！', '<18>別再用配樂\n打擾我的生活了！！' ],
      papsink6: [ '<18>{#p/papyrus}{#f/4}現在那條狗\n在我的攻擊下\n消失了。', '<18>喔好吧...' ],
      papsolu1: [
         '<18>{#p/papyrus}看起來你需要\n一個提示。',
         '<18>{#f/4}嗯...',
         "<18>{#f/0}喏，我會注意\n這幾條電路的。",
         "<18>{#f/0}但這只是\n我自己的見解喔。"
      ],
      papsolu2: [
         '<18>{#p/papyrus}{#f/5}還是困惑嗎？',
         '<18>{#f/5}呃... 或許...',
         '<18>{#f/6}你用電路一點點\n推出答案呢？？？',
         "<18>{#f/5}我在儘量不給你\n把答案透露出來了..."
      ],
      papsolu3: [
         '<18>{#p/papyrus}{#f/6}還來？？？',
         '<18>{#f/0}我覺得，\n我應該完全可以\n告訴你解法了。',
         "<18>{#f/4}雖然我其實\n不想掃興..."
      ],
      papsolu3a: () => [
         '<18>{#p/papyrus}{#f/9}你真的，真的想要\n謎題的解法嗎？？？',
         choicer.create('* （你要怎麼回答？）', "告訴我", "再想想")
      ],
      papsolu3a1: () => [
         '<18>{#p/papyrus}解！法！就是！',
         '<18>{#f/4}（請腦補一段\n敲鼓聲...）',
         SAVE.data.b.s_state_pretrick
            ? '<18>{#f/0}... THAT TERMINAL AT THE BOTTOM LEFT OF THE ROOM!'
            : '<18>{#f/0}...在你右側那盞燈\n旁邊的那棵\n全息投影樹！',
         '<18>快去看看叭！！！'
      ],
      papsolu3a2: [
         "<18>{#p/papyrus}哇... 你真是個\n謎題愛好者！",
         "<18>我被你的熱情\n給打動了！",
         '<18>你做得到的，\n人類！！！'
      ],
      papsolu4: [ "<18>{#p/papyrus}{#f/4}你忘記我給你的\n解法了嗎...？" ],
      papsolu5: [ '<18>{#f/0}{#p/papyrus}就快完成了！\n只剩下一條電路\n就要激活了！' ],
      papspaghet1: (take: boolean) => [
         '<18>{#p/papyrus}{#f/1}什麼！？\n你是怎麼避開\n我的陷阱的？',
         '<18>{#f/4}還有，比起這個...',
         '<18>{#f/0}有給我留點嗎？？？',
         choicer.create('* （你要怎麼跟帕派瑞斯說\n  關於他做的義大利麵的事？）', take ? '拿走了' : '留在那了', '吃掉了'),
         '<18>{#p/papyrus}真的！？'
      ],
      papspaghet1a: () => [
         '<18>{#p/papyrus}{#f/1}什麼！？\n你是怎麼避開\n我的陷阱的？',
         '<18>{#f/4}還有，比起這個...',
         '<18>{#f/0}有給我剩...',
         '<18>{#f/4}...等下。',
         "<18>{#f/0}你帶著它呢！！",
         '<18>{#f/9}人類，你怎麼打算的？',
         choicer.create("* （你要拿帕派瑞斯的意面怎麼辦呢？）", '一起吃吧', '吃掉'),
         '<18>{#p/papyrus}真的！？'
      ],
      papspaghet2a: [
         "<18>{#f/5}你抗拒我做的\n義大利麵的味道...",
         '<18>{#f/6}就是因為想跟我\n一起吃嗎？？？',
         '<18>{#f/9}那好吧！！',
         '<18>不要煩惱！\n我，偉大的帕派瑞斯...',
         '<18>會為你和我二人\n做各種我們想吃的\n義大利麵的！',
         '<18>{#f/0}嘿嘿嘿嘿嘿嘿捏！'
      ],
      papspaghet2b: [
         '<18>{#f/5}哇...',
         '<19>{#f/6}之前幾乎從來沒有人\n欣賞過我的廚藝...',
         '<18>{#f/9}那好吧！！',
         '<18>不要煩惱！\n我，偉大的帕派瑞斯...',
         '<18>會為你做你想吃的\n各種義大利麵的！',
         '<18>{#f/0}嘿嘿嘿嘿嘿嘿捏！'
      ],
      paptv: pager.create(
         0,
         () => [
            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
               ? [ "<18>{#p/papyrus}喔，這是我\n最喜歡的電視節目！" ]
               : []),
            ...(SAVE.data.n.plot < 67.1
               ? [ '<33>{#p/mettaton}* 「敬請期待新節目！」' ]
               : SAVE.data.b.killed_mettaton
               ? [ '<33>{#p/mettaton}* \"NETWORK UNREACHABLE.\"' ]
               : world.bad_robot
               ? [ '<33>{#p/mettaton}* \"SORRY, FOLKS!\"\n* \"THE PROGRAM\'S BEEN CANCELLED!\"' ]
               : [ '<32>{#p/mettaton}* \"HOPE YOU ENJOYED THE SHOW!\"' ]),
            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
               ? [
                    "<18>{#p/papyrus}{#f/7}什麼！！！\n平常都比這個\n精彩的！",
                    '<18>{#f/4}單純就是這一期\n質量不好。',
                    "<18>{#f/7}你不許噴我！！！"
                 ]
               : [])
         ],
         [ '<33>{#p/mettaton}* 「敬請期待新節目！」' ]
      ),
      papyrus1: [ '<18>{#p/papyrus}所以，在我討論\n安黛因的時候...' ],
      papyrus2: [
         '<18>{#p/papyrus}衫斯！！\n我的天啊！！\n那是個...',
         '<18>人類嗎！？！？',
         "<25>{#p/sans}{#f/2}* 不是，那就是個\n  人類形狀的全息投影。"
      ],
      papyrus3: [
         '<18>{#p/papyrus}{#f/4}喔。',
         '<18>{#f/4}...',
         '<18>{#f/4}等一下...',
         "<18>{#f/7}你在撒謊！！",
         '<25>{#p/sans}{#f/2}* 抱歉，我是想說\n  「全息投影形狀的人類」。',
         '<18>{#p/papyrus}{#f/0}...衫斯，我們\n終於做到了！',
         '<18>{#f/9}安黛因現在【必定】會讓我\n加入皇家衛隊了！！！',
         '<18>{#f/6}我們只需要...',
         '<18>{#f/5}去...',
         '<18>{#f/4}...',
         "<18>{#f/4}我把什麼東西給忘了。",
         '<25>{#p/sans}{#f/2}* 演講，還記得嗎？',
         '<18>{#p/papyrus}{#f/4}喔，對對對。\n...「咳咳」。',
         "<18>{#f/9}人類！你可能以為\n你來到這裡就安全了。",
         '<18>{#f/9}但我，\n偉大的帕派瑞斯，\n打算扭轉你的想法！',
         "<18>{#f/4}首先，我要用\n艾菲斯博士的謎題\n讓你眼花繚亂...",
         '<18>{#f/4}然後，\n在你最意想不到的時候...',
         '<19>{#f/9}哇嗚！\n抓到你了！\n押去首塔！',
         '<18>{#f/9}我們的戰鬥\n將一如既往地傳奇！',
         '<18>{#f/4}無論如何...',
         '<18>{#f/9}來吧... \n只要你夠膽！'
      ],
      papyrus4: [ '<18>{#f/0}捏嘿嘿嘿嘿\n嘿嘿嘿！！！' ],
      papyrus5: [
         '<25>{#p/sans}* 不錯，進展很順利。',
         "<25>* 別擔心，夥計。",
         "<25>{#f/2}* 我會用眼窩\n  替你盯著的。"
      ],
      papyrus6x1: [ '<18>{#p/papyrus}{#f/5}人-人類？\n你就是那個人類嗎...？' ],
      papyrus6x2: [
         "<15>{#p/papyrus}{#e/papyrus/20}我的天哪！\n我終於見到你啦！",
         "<18>{#p/papyrus}{#f/0}自打聽說你來了星港，\n我就夢想著能見你一面！",
         "<18>{#p/papyrus}{#f/4}...你問，\n為啥衫斯沒跟我\n在一起？",
         '<18>{#p/papyrus}{#f/6}唉，我有理由懷疑...',
         '<18>{#p/papyrus}{#f/5}...他好像\n刻意想讓我躲著你。',
         '<18>{#p/papyrus}{#f/7}真不愧是他！！！',
         '<18>{#p/papyrus}{#f/0}但是，\n只要你不說，我不說~',
         "<18>{#p/papyrus}{#f/9}那懶骨頭\n就甭想知道【一丁點】\n咱們的「地下情誼」！"
      ],
      papyrus6x3: [
         "<18>{#p/papyrus}{#f/5}不過，我現在得走了。\n絕不能讓他發現\n我偷偷溜出來了。",
         "<18>{|}{#p/papyrus}{#f/9}待會見，人-{%}"
      ],
      papyrus6x4: [ '<32>{#p/without}* ...帕派瑞斯？' ],
      papyrus6: () => [
         '<18>{#p/papyrus}{#f/9}人類！！',
         world.nootflags.has('s_puzzle2') // NO-TRANSLATE

            ? '<18>{#f/4}YOU MAY HAVE HAD AN EASY TIME BEFORE.'
            : '<18>{#f/4}你可能已經過了\n我很多別的挑戰。',
         "<18>{#f/9}但現在，你就\n絕對要束手無策了！",
         '<18>你也看到了，\n出這個謎題的\n不是別人...',
         '<18>{#f/0}正是那個大名鼎鼎的\n艾菲斯博士！',
         '<18>實際上，\n規則很簡單。',
         '<18>這個顯示器會\n隨機讀出一個數字。',
         '<18>{#f/9}...這數字就是\n你度過這裡\n所需要的秒數！',
         '<18>{#f/0}如果數字是奇數，\n你就必須躲避子彈。',
         '<18>以1結尾的數\n是星形的子彈...',
         '<18>以3結尾的數\n是月亮形狀的子彈...',
         '<18>{#f/4}5是彗星的，\n7是類星體的...',
         "<18>{#f/9}如果是9結尾的，\n就是完全隨機！",
         '<18>{#f/0}如果數字是質數，\n重力就會翻轉。',
         "<18>{#f/4}（不過，\n小於10的質數\n一般不會觸發。）",
         '<18>{#f/0}如果數字是偶數，\n你一開始會\n平安無事...',
         '<18>{#f/9}但你接下來就要\n遭遇到隨機的怪物！',
         '<18>並且，如果是\n2的整數冪，會使\n怪物數量翻倍！！',
         '<18>{#f/0}如果某個數字\n重複了兩次...',
         '<18>{#f/0}等待的時間\n就會乘以這個數字！',
         '<18>{#f/0}如果數字是\n按順序排列的，\n譬如1-2-3...',
         '<18>{#f/0}房間就會搖搖晃晃，\n讓你連走都走不動！',
         '<18>{#f/0}然後，如果\n包含一個數字4...',
         '<18>{#f/9}衫斯就會隨機用\n藍色魔法\n讓你浮起來！',
         "<25>{#p/sans}{#f/6}* 你看吧，\n  這就是我特殊的黃色眼睛。",
         '<18>{#p/papyrus}{#f/7}現在不行，衫斯！！',
         '<25>{#p/sans}* 喔，嘿嘿。\n* 看來我有些{@fill=#ff0}浮{@fill=#fff}躁了，嗯？',
         '<18>{#p/papyrus}{#f/4}好好好...',
         '<18>{#f/9}總之！\n你理解我的\n解釋了嗎？',
         choicer.create('* （你要怎麼回答？）', "聽懂了", "沒聽懂")
      ],
      papyrus7: () => [
         "<18>{#p/papyrus}{#f/9}好，\n那我們回顧一遍！",
         '<18>{#f/0}這個顯示器會隨機\n生成一個秒數。',
         '<18>也就是，\n你要等多少秒\n才能通過的時間。',
         '<18>奇數要躲子彈。',
         "<18>尾數決定\n子彈的種類。",
         '<18>1是星星，3是月亮，\n5是類星體，\n7是...',
         '<18>{#f/5}等等，\n哪個數字是\n類星體來著？',
         '<18>{#f/9}呃，然後，\n如果尾數是9，\n就是完全隨機！',
         '<18>{#f/0}質數會改變重力...',
         '<18>{#f/0}偶數會\n遭遇隨機戰鬥...',
         '<18>{#f/5}等等，\n我剛才是說\n重力會改變嗎！？，',
         '<18>{#f/7}呃，我是說顛倒！！',
         '<18>{#f/0}但是2的整數冪\n會使遭遇數翻倍。',
         '<18>數字按順序排列的\n會讓房間搖晃，\n然後4是...',
         '<18>{#f/6}呃，我忘記\n4會發生什麼了。',
         "<25>{#p/sans}* 你這不是在暗示我嗎？",
         '<18>{#p/papyrus}{#f/6}可能吧？？？',
         '<18>{#f/7}管他呢！！\n你現在理解了嗎！？',
         choicer.create('* （你要怎麼回答？）', '當然', '更糊塗了')
      ],
      papyrus8: [
         '<18>{#p/papyrus}{#f/9}那... 好吧...',
         "<18>{#f/9}這樣吧，\n我把規則放在這！",
         '<18>{#f/0}這樣，你就可以\n按自己的節奏\n自己讀了。',
         '<18>祝你好運，人類！！',
         '<18>{#f/5}捏... 嘿嘿...'
      ],
      papyrus9: [
         '<18>{#p/papyrus}{#f/9}太奈斯了！',
         '<18>{#f/9}好，廢話少說...',
         "<18>讓我們看看\n會是什麼隨機數！！"
      ],
      papyrus10: [
         '<18>{#p/papyrus}{#f/9}人類！',
         '<18>{#f/9}準備好面對你\n最嚴峻的挑戰了嗎？',
         '<18>{#f/9}特此介紹...\n這致命恐怖的挑戰！'
      ],
      papyrus11: [
         '<18>{#p/papyrus}{#f/9}一旦我下達命令，\n一切都會動起來！',
         '<18>雷射掃射！\n線圈發電！\n刀劍揮舞！',
         '<18>一切都會以精確的、\n戰術性的方式進行！',
         '<18>{#f/4}不精確的一點是，\n你肯定會失敗。',
         '<18>{#f/9}那麼！！！\n你準備好了嗎！？！？',
         '<18>因為！',
         '<18>我！',
         '<18>就！',
         '<18>要！',
         '<18>啟動了！'
      ],
      papyrus12: [
         '<25>{#p/sans}* 怎麼了？\n* 我們到底還進不進行了？',
         '<18>{#p/papyrus}{#f/7}...',
         "<25>{#p/sans}{#f/3}* 那條煩人的狗\n  在上面會不耐煩的。",
         '<18>{#p/papyrus}{#f/7}隨時都會進行的！'
      ],
      papyrus13: [
         '<25>{#p/sans}* 準備好了就開始吧。',
         '<18>{#p/papyrus}{#f/6}我...',
         "<18>{#f/6}我現在在想...",
         '<18>{#f/6}這個挑戰...',
         '<18>{#f/6}可能...',
         '<18>{#f/6}...',
         '<18>{#f/4}...有點不算個\n好主意了。',
         '<18>{#f/5}一想到\n我設計的這個挑戰\n可以這麼...',
         '<18>{#f/9}但是，不用害怕！',
         '<18>{#f/9}我是個\n有原則的骷髏！',
         '<18>{#f/4}就是，坦白來說，\n一個你根本不可能\n活著通過的挑戰...',
         '<18>{#f/7}就實在是太做作了！',
         '<18>走你！！'
      ],
      papyrus14: [
         '<18>{#p/papyrus}{#f/7}你看什麼看！？',
         '<18>{#f/9}這只是帕派瑞斯的\n又一次決定性的\n勝利罷了！！',
         '<18>捏！',
         '<18>嘿！',
         '<18>{#f/4}...',
         '<18>...嘿？'
      ],
      papyrusFinal1: [
         '<23>{#p/papyrus}{#f/30}人類。',
         '<23>請允許我傾訴\n一些複雜的情感。',
         '<23>就像...'
      ],
      papyrusFinal2: () =>
         world.genocide
            ? [
                 '<23>失去至親的悲痛。',
                 '<23>無能為力的自責。',
                 '<23>陰陽兩隔的懷念。',
                 '<23>這些情感...'
              ]
            : papreal()
            ? [
                 '<23>眾生罹難的心痛。',
                 "<23>無能為力的絕望。",
                 '<23>改過自新的理想。',
                 '<23>這些情感...'
              ]
            : [
                 '<23>找到另一個\n意面愛好者的喜悅。',
                 "<23>對另一個人\n解謎技巧的欽佩。",
                 '<23>想有一個很酷、\n很聰明的人認為你\n也同樣很酷的渴望。',
                 '<23>這些情感...'
              ],
      papyrusFinal3: () =>
         world.genocide || papreal()
            ? [
                 '<18>{#f/31}肯定正縈繞在你心頭。',
                 '<18>{#f/32}很難想像這些情感\n究竟是怎樣的...',
                 '<18>{#f/6}畢竟，我很... 偉大...',
                 '<18>{#f/32}{#x1}...',
                 '<18>{#f/31}人類，儘管你做了\n很多錯事...\n我...',
                 '<18>{#f/5}我仍然相信你！',
                 '<18>{#f/31}我知道，\n你可以浪子回頭。',
                 '<18>{#f/31}我知道，\n你願意變得更好。',
                 ...(world.genocide
                    ? [ "<18>{#f/4}不管那個「艾斯利爾」\n說了什麼荒唐的話，" ]
                    : [ '<18>{#f/5}不管你覺得自己\n多麼不可救藥，' ]),
                 "<18>{#f/6}{#x2}但我知道，在內心深處，\n你還是個好人！",
                 '<18>{#f/0}我會讓你的善良重見天日！',
                 '<18>{#f/0}我會讓你的潛能盡數釋放！',
                 '<18>{#f/4}最終...',
                 '<18>{#f/9}我會讓你知道，\n你仍然是最棒的！！！',
                 '<18>{#f/0}我，帕派瑞斯，\n敞開雙臂歡迎你！'
              ]
            : [
                 '<18>{#f/0}一定就是你\n現在的情感！！',
                 '<18>{#f/4}我很難想像這些情感\n究竟是怎樣的...',
                 '<18>{#f/4}畢竟，我十分偉大。',
                 '<18>我從來不好奇\n有很多朋友的感覺\n是怎樣的。',
                 '<18>{#f/5}我很同情你，\n孤單的人類...',
                 '<18>{#f/0}但不要擔心！！！\n你再也不會孤單了！',
                 '<18>{#f/9}因為我，\n偉大的帕派瑞斯，\n會成為你的...',
                 '<18>{#f/5}{#x1}...',
                 '<18>不...',
                 '<18>{#f/7}{#x2}不，不該是這樣的！',
                 '<18>我不能成為\n你的「朋友」...',
                 '<18>你是個人類！\n我必須逮捕你！！！',
                 '<18>{#f/9}然後，我就可以實現\n我畢生的夢想！！！',
                 '<18>力量強大！\n受人愛戴！\n聲名遠揚！！！',
                 "<18>那就是帕派瑞斯！！！",
                 '<18>{#f/4}皇家守衛中...',
                 '<18>{#f/9}最閃亮的新星！！！'
              ],
      papyrusFinal4: (b: boolean) =>
         world.edgy || world.killed0
            ? [
                 '<18>{#p/papyrus}{#f/0}哇！\n你做到了！',
                 "<18>{#p/papyrus}{#f/5}沒有動用任何暴力！",
                 '<18>{#p/papyrus}{#f/6}其實，\n剛才我有點害怕...',
                 "<18>{#p/papyrus}{#f/0}不過沒關係！\n你已經重回正軌啦！",
                 "<18>{#p/papyrus}{#f/8}我為你驕傲，人類！",
                 "<18>{#p/papyrus}{#f/4}...等等，我是不是\n該抓你來著？",
                 "<18>{#p/papyrus}{#f/0}嗨，隨它去吧。",
                 '<18>{#p/papyrus}{#f/0}只要你能成為最棒的自己，\n我就滿足啦。',
                 "<18>{#p/papyrus}{#f/5}過去的事，\n就讓它成為{@fill=#ff0}骨{@fill=#fff}事吧，\n好嗎？",
                 "<18>{#p/papyrus}{#f/9}我還要告訴你\n怎麼離開這裡！"
              ]
            : [
                 '<18>{#p/papyrus}{#f/5}扭嗚呼呼...',
                 ...(b
                    ? [ "<18>我沒有足夠的力量\n阻止你..." ]
                    : [ "<18>連像你這樣\n弱小的人\n我都阻止不了..." ]),
                 "<18>{#f/7}安黛因一定會\n對我非常失望的！",
                 "<18>{#f/5}我也永遠不能\n加入皇家衛隊了...",
                 '<18>{#f/7}而且...\n我的粉絲數也會\n就這樣停滯不前！',
                 "<99>{#p/human}* （你要怎麼回答？）{!}\n§shift=56§我們做§shift=83§真是個\n§shift=56§朋友吧§shift=83§廢柴{#c/0/7/7}"
              ],
      papyrusFinal4a1: (b: boolean) =>
         b
            ? [
                 '<18>{#p/papyrus}{#f/5}真-真的嗎？\n你想跟我做朋友？',
                 '<18>{#f/6}即使發生了\n那樣的事情？？？',
                 "<18>{#f/0}那，好吧！！\n我們做朋友吧！！"
              ]
            : [
                 '<18>{#p/papyrus}{#f/1}真的嗎！？\n你想跟我做朋友？？？',
                 '<18>{#f/6}那...\n我覺得...',
                 '<18>{#f/0}我可以給你\n一個照應了！'
              ],
      papyrusFinal4a2: (b: boolean) =>
         b
            ? [
                 '<18>{#p/papyrus}{#f/5}嗯？你是...\n想責備我嗎？？？',
                 "<18>{#f/6}是因為我不夠強大，\n不配做你的朋友嗎？",
                 '<18>{#f/5}...不...',
                 '<18>{#f/7}喔，我在說什麼啊！！\n我當然很強大！',
                 "<18>{#f/9}我會通過跟你交朋友\n證明給你看！"
              ]
            : [
                 '<18>{#p/papyrus}{#f/1}啊？為啥你要那麼大聲地\n罵自己呢？？？',
                 '<18>{#f/4}是不是因為...',
                 "<18>{#f/7}你感覺自己不夠優秀，\n不配做我的朋友？",
                 "<18>{#f/9}錯啦，你其實很棒！\n我會成為你的朋友的！！！"
              ],
      papyrusFinal4b1: [
         '<18>{#f/0}好耶！！',
         '<18>我交到一個新朋友啦！！',
         '<18>{#f/4}誰能想到，成為好朋友...'
      ],
      papyrusFinal4b2: [
         '<18>{#f/0}好耶！！',
         "<18>{#f/0}我們還沒有進行\n第一次約會...",
         "<18>{#f/0}就已經成為\n好朋友了！！！",
         '<18>{#f/4}誰能想到，成為好朋友...'
      ],
      papyrusFinal4c1: [
         '<18>{#f/0}只需要先出幾個\n抽象的謎題，\n再來打一架呢？',
         '<18>你教會了我很多，\n人類。',
         '<18>{#f/9}我特此\n允許你通過！',
         "<18>{#f/0}我會引導你\n離開這裡。"
      ],
      papyrusFinal4c2: [
         '<18>繼續前進。',
         '<18>等你到首塔的時候，\n跳進一艘飛船，穿過{@fill=#ff0}力場{@fill=#fff}。',
         "<18>{#f/4}那就是把我們\n困在前哨站的東西。",
         '<18>力場誰都進得來，\n但都出不去...',
         '<18>{#f/9}...除非，那個人擁有\n強大的靈魂。',
         '<18>{#f/0}就比如你！！！'
      ],
      papyrusFinal4d: [
         '<18>{#f/4}喔，我差點忘了說...',
         '<18>你要到達出口，\n就必須要通過...',
         '<18>{#f/7}{@fill=#ff0}國王{@fill=#fff}那關。',
         '<18>{@fill=#ff0}所有怪物的王...',
         '<18>{@fill=#ff0}他是...',
         '<18>{@fill=#ff0}{#f/6}...呃...'
      ],
      papyrusFinal4e: [
         "<18>{#f/0}他是個毛茸茸的\n好好先生！！！",
         '<18>大家都很喜歡他。',
         '<18>{#f/4}我很相信，\n只要你跟他說...',
         '<18>「不好意思，\n逐夢先生...\n我可以回家嗎？」',
         "<18>{#f/0}他就會親自帶你\n去發射艙的！",
         "<18>{#f/9}總之！！！\n廢話少說！！！",
         "<18>{#f/0}我會在家裡\n做你酷酷的朋友。"
      ],
      papyrusFinal4f1: [ '<18>{#f/9}歡迎過來\n跟我一起玩！！！' ],
      papyrusFinal4f2: [ '<18>{#f/9}歡迎過來\n跟我約會！！！' ],
      papyrusFinal4f3: [ '<18>{#f/9}歡迎過來\n跟我打個招呼！！！' ],
      papyrusFinal4g: [ '<18>捏嘿嘿嘿\n嘿嘿嘿！！！' ],
      papyrusFinal5: [
         '<18>{#p/papyrus}{#f/5}喔，那個人類\n到哪裡去了呢...',
         '<18>{#f/4}...\n等等。',
         "<18>{#f/1}就在我面前！！！",
         '<18>{#f/0}你好啊！\n我還在擔心你\n是不是迷路了呢！',
         "<18>看到你了，我就\n可以鬆口氣了...",
         '<18>{#f/7}...\n等一下！！！',
         "<18>你不應該逃走的！！！",
         '<18>快回來！！！'
      ],
      papyrusFinal6: [
         '<18>{#p/papyrus}{#f/4}又回來了，嗯？',
         "<18>{#f/5}我覺得應該是\n我的問題...",
         '<18>我之前答應過你，\n我會給你做意面。',
         "<18>不用猜，\n你想見我的原因...",
         '<18>肯定是想讓我給你\n做點意面。',
         '<18>{#f/0}好... 我懂了。',
         '<18>{#f/0}帕派瑞斯也很饑渴！',
         '<18>{#f/7}對正義的\n如饑似渴！'
      ],
      papyrusFinal7: () => [
         "<18>{#p/papyrus}{#f/1}你又回來了！？！？",
         '<18>{#f/4}我終於知道\n為什麼了。',
         '<18>{#f/5}你...',
         '<18>你就是太想\n看到我的臉了...',
         '<18>{#f/6}我...',
         "<18>{#f/31}我不太確定自己\n能不能和抱有這種\n感受的人戰鬥。",
         "<18>{#f/4}更何況，我已經\n不太想抓你了。",
         '<18>{#f/5}要不然，\n我們就不戰鬥了...',
         '<18>{#f/5}...我直接放你走。\n怎麼樣？',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      papyrusFinal7a: [ '<18>{#p/papyrus}{#f/31}...\n好...', "<18>{#f/3}我想，我會接受\n我的失敗的。" ],
      papyrusFinal7b: [ '<18>{#p/papyrus}{#f/4}嗯，既然你都\n這樣說了，那...', '<18>{#f/9}我就\n奉陪到底！！！' ],
      papyrusFinal8: () => [
         '<18>{#p/papyrus}{#f/1}還來？？？',
         '<18>{#f/4}...那，好吧...',
         '<18>{#f/9}你這次要\n放棄戰鬥嗎？？',
         choicer.create('* （你要怎麼回答？）', "放我走", "想戰鬥")
      ],
      papyrusFinal8a: [ '<18>{#p/papyrus}{#f/0}那麼，\n咱們開始吧！' ],
      puzzle3: () => [
         '<32>{#p/human}* （你激活了終端。）',
         '<32>{#p/basic}* 屏幕上顯示著一條歷史修改記錄。',
         world.edgy
            ? '<32>* 「最新圖案修改者：艾菲斯」'
            : '<32>* 「最新圖案修改者：\n   酷炫骷髏95」',
         ...(!world.goatbro || SAVE.flag.n.genocide_milestone < 5 || SAVE.flag.n.ga_asrielAlphysCom1++ > 0
            ? []
            : [ "<25>{#p/asriel2}{#f/13}* 她真是沒完沒了地為難我們..." ]),
         '<32>{#p/basic}* 「要查看圖案嗎？」',
         choicer.create('* （查看圖案嗎？）', '是', '否')
      ],
      robotx: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* （看起來，機器人睡著了。）' ]
            : [ "<32>{#p/basic}* 它進入了「休眠」模式。" ],
      robot1: pager.create(
         0,
         () => [
            '<32>{#p/basic}* 你好，心地善良的旅行者。\n* 我是一個建築機器人。',
            '<32>* 我想去看看整個星系...\n* 但是我動彈不得。',
            '<32>* 如果你願意幫助我的話...',
            '<32>* 就帶上我的一塊晶片吧，\n  帶它去一個很遠很遠的地方。',
            choicer.create('* （拿走一塊晶片？）', "拿走", "算了")
         ],
         () => [
            '<32>{#p/basic}* 心地善良的旅行者，\n  如果你願意幫助我的話...',
            '<32>* 就帶上我的一塊晶片吧，\n  帶它去一個很遠很遠的地方。',
            choicer.create('* （拿走一塊晶片？）', "拿走", "算了")
         ]
      ),
      robot2: () => [
         '<32>{#p/basic}* 謝謝你... 祝你好運！',
         '<32>{#s/equip}{#p/human}* （你得到了「芯」型薯片。）',
         ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
            ? [
                 "<25>{#p/asriel2}{#f/9}* 嘿，真是個\n  可愛又天真的小東西。",
                 "<25>{#p/asriel2}{#f/13}* 天真到對自己的命運\n  一無所知。"
              ]
            : [])
      ],
      robot3: [ '<32>{#p/basic}* 看起來你還沒有給我預留足夠的空間。' ],
      robot4: () => [
         '<32>{#p/basic}* 好吧。\n* 那麼，祝你旅途愉快。',
         ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
            ? [
                 "<25>{#p/asriel2}{#f/9}* 嘿，真是個\n  可愛又天真的小東西。",
                 "<25>{#p/asriel2}{#f/13}* 天真到對自己的命運\n  一無所知。"
              ]
            : [])
      ],
      robot5: () => [
         '<32>{#p/basic}* 謝謝你照顧我。',
         ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
            ? [ "<25>{#p/asriel2}{#f/4}* 行了，這些晶片應該夠用了。" ]
            : [])
      ],
      robot6: () => [
         '<32>{#p/basic}* 近況如何？\n* 我是說，我那塊晶片近況如何...',
         '<32>* 啊？你把它弄丟了...？\n* ...那我再給你一塊吧...',
         choicer.create('* （再拿走一塊晶片？）', "拿走", "算了")
      ],
      robot7: [
         '<32>{#p/basic}* 這次小心點。別弄丟了。',
         '<32>{#p/human}{#s/equip}* （你得到了「芯」型薯片。）'
      ],
      robot8: [ '<32>{#p/basic}* 我理解的。\n* 祝你旅途愉快...' ],
      robot9: () => [
         '<32>{#p/basic}* 謝謝你... 照顧我...',
         ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
            ? [ "<25>{#p/asriel2}{#f/4}* 行了，這些晶片應該夠用了。" ]
            : [])
      ],
      robot10: [
         '<32>{#p/basic}* 晶片還好嗎？',
         '<32>* 啊？又弄丟了...？',
         "<32>* 對不起...\n* 我要是再給你晶片的話，\n  就什麼都不剩了。",
         '<32>* 看來我只能認命。\n* 想到去不了的地方，\n  終究只是幻想。',
         "<32>* 對所有怪物都一樣。",
         '<32>* 怪物們註定要永遠困在這裡，\n  度過餘生...'
      ],
      robot11: [ '<32>{#p/basic}* 我真傻，為啥之前那麼輕易\n  就把心掏給你呢？' ],
      robot12: [ '<32>{#p/basic}* 滾！' ],
      sans1: [
         '<99>{#p/darksans}{#i/8}* {@spacing=4/0}{#i/x2}人類。',
         "<99>* {@spacing=4/0}難道你不知道{@spacing=}\n  {@spacing=4/0}怎麼和新朋友{@spacing=}\n  {@spacing=4/0}打招呼嗎？",
         '<99>* {@spacing=4/0}轉過身來{@spacing=}\n  {@spacing=4/0}和我握手。'
      ],
      sans2: () => [
         ...(world.edgy
            ? [
                 "<25>{#p/sans}{#f/0}* 嘿，幹嘛露出這種表情？",
                 "<25>{#p/sans}{#f/2}* ...不喜歡放屁墊的把戲嗎？",
                 '<25>{#f/0}* ...沒關係，人各有志嘛。'
              ]
            : [ "<25>{#p/sans}{#f/4}* 嘿嘿... 沒有什麼能比\n  一個放屁墊把戲更好的了。" ]),
         "<25>{#f/0}* 總之，你是個人類，對吧？",
         "<25>{#f/5}* 真酷。",
         "<25>{#f/0}* 我是衫斯。\n* 骷髏衫斯。",
         '<25>{#f/3}* 作為一名皇家哨兵，\n  現在我本該去抓捕人類的。',
         "<25>{#f/4}* 不過呢...",
         ...(world.edgy
            ? [
                 "<25>{#f/3}* 今天，我沒心思幹這事。",
                 '<25>{#f/0}* 但我有個兄弟...',
                 "<25>{#f/5}* 他對抓人類這事\n  可是熱情滿滿。",
                 '<25>{#f/0}* 所以，為了能讓他\n  安心在家待著...\n  我整整費了三輩子工夫。'
              ]
            : [
                 "<25>{#f/2}* 我有更好的事情要去忙。",
                 '<25>{#f/0}* 但我有個兄弟...',
                 '<25>{#f/5}* 雖然他還只是個預備哨兵，\n  但他的舉止已經超像一個\n  正式哨兵了。',
                 "<25>{#f/0}* 前面站著的，\n  應該就是他了。"
              ]),
         '<25>* 我有個主意。\n* 跳過那個空隙。',
         '<26>{#f/4}* 別怕，直接跳過去就行。\n* 我兄弟把重力設得很小，\n  肯定掉不下去。'
      ],
      sans3: () =>
         world.edgy
            ? [
                 '<25>{#p/sans}* 到了。',
                 "<25>{#f/3}* 不過... \n  現在我沒啥想給你看的。",
                 "<25>{#f/2}* 我先在這待一會。",
                 "<25>{#f/0}* 等你再往前走走，\n  說不定我就有靈感了。"
              ]
            : [ '<25>{#p/sans}* 快，到重力轉換器\n  那裡去。' ],
      sans4: [ "<25>{#p/sans}* 咋的了，哥們？" ],
      sans5: [
         '<18>{#p/papyrus}{#x2}{#f/7}你說「咋的了」呢，\n兄弟！',
         '<18>你還有謎題要解決！',
         "<18>我明明給了你\n很多餘地，但...",
         '<18>你還是整天無所事事！',
         "<18>即使是現在，你還是在！",
         '<18>無所事事！',
         "<25>{#p/sans}* 實際上，我在擺弄這個\n  重力的玩意呢。",
         "<25>* 這個東西真的很酷的。",
         '<25>{#f/4}* 你要來看看嗎？',
         "<18>{#p/papyrus}{#x3}{#f/7}不！！\n我才沒時間看呢！！",
         '<18>{#x2}要是有人類從這經過，\n我得做好準備！',
         '<18>我必須會！\n我一定會！',
         '<18>{#x1}{#f/9}最終抓到一個人類！',
         '<18>{#x4}{#f/0}那時候，我，\n偉大的帕派瑞斯...',
         '<18>會得到我應得的一切！',
         '<18>尊重...\n認可...',
         '<18>{#f/9}我就終於可以加入\n皇家守衛了！',
         '<25>{#p/sans}* 嗯...',
         '<25>{#f/2}* 沒準這個玩意可以\n  幫到你呢。',
         "<18>{#p/papyrus}{#x3}{#f/7}衫斯，那根本沒用！\n你這個懶骨頭！",
         '<18>{#x1}{#f/5}你明明知道，\n你能做的遠不止這些，\n但是...',
         '<18>{#x2}{#f/7}你還是選擇\n整天無所事事！',
         "<18>{#x1}{#f/5}難道你不想... \n從生活中得到更多嗎？",
         "<25>{#p/sans}* 嘿，放輕鬆點。\n* 我的心裡可裝著\n  一大堆事務呢。",
         "<25>{#f/4}* 你甚至可以說我...",
         '<25>{#f/2}* 早已{@fill=#ff0}星{@fill=#fff}懷遠志了？'
      ],
      sans6: [
         '<18>{#p/papyrus}{#x3}{#f/7}衫斯！！',
         "<25>{#p/sans}{#f/5}* 拜託。\n* 你明明就在笑。",
         '<18>{#p/papyrus}{#x2}{#f/7}我確實笑了！\n極其鄙視的那種！',
         '<18>{#x1}{#f/4}（嘆氣...）',
         '<18>{#f/5}為什麼像我這樣\n偉大的人...',
         '<18>為了得到認可\n需要做這麼多破事？？',
         '<25>{#p/sans}* 嘿，別傷心嘛...',
         '<25>* 遇到困難，\n  負{@fill=#ff0}重力{@fill=#fff}爭才能致遠嘛。'
      ],
      sans7: [
         '<18>{#p/papyrus}{#x2}{#f/7}呃！！',
         '<18>{#x1}{#f/4}我去專心解我的謎題了...',
         '<18>{#f/7}至於你的工作？',
         '<18>{#f/4}我希望你\n從現在起...',
         '<18>{#f/9}專注於你的\n{@fill=#ff0}星{@fill=#fff}工作上！！！',
         '<18>{#f/0}捏嘿嘿嘿嘿嘿\n嘿嘿嘿嘿嘿嘿！！'
      ],
      sans8: [ '<18>{#p/papyrus}嘿！' ],
      sans9: [ '<25>{#p/sans}* 好了，是時候把你\n  弄下來了。' ],
      sans10: [
         '<25>{#p/sans}{#f/0}* 嘿，對了...\n* 走之前，我得跟你說...',
         "<25>{#f/3}* 皇家守衛正在找你呢。",
         "<25>{#f/0}* 不過你別擔心。\n* 他們拿得出手的只有狗狗。",
         "<25>{#f/0}* 你既然是人類，\n  那肯定知道狗狗\n  喜歡什麼，對吧？",
         "<25>{#f/2}* 它們和帕派瑞斯差不多，\n  人畜無害。"
      ],
      sansbook0: [ '<32>{#p/human}* (It appears this joke book has no clear ending.)' ],
      sansbook1: [ '<32>{#p/basic}* 這是本關於非歐幾何的書。\n* 寫著「艾菲斯」的名字。' ],
      sansbook2: () => [ choicer.create('* （要看看裡面嗎？）', "看看", "算了") ],
      sansbook3: [ '<32>{#p/human}* （你往書裡面看...）' ],
      sansbook4: [ '<32>{#p/basic}* 幾何學書裡面夾著一本\n  笑話書。' ],
      sansbook5: [ '<32>{#p/basic}* 笑話書裡面夾著\n  另一本幾何學書。' ],
      sansbook6: [ '<32>{#p/basic}* 幾何學書裡面夾著\n  另一本笑話書。' ],
      sansbook7: [ "<32>{#p/basic}* 是另一本幾何學書。" ],
      sansbook8: [ "<32>{#p/basic}* 是另一本笑話書。" ],
      sansbook9: [ '<32>{#p/human}* （你決定不再看了。）' ],
      sansbook10: () => [
         "<32>{#p/basic}* 這是衫斯留的字條。",
         '<32>{#p/without}* 「這麼認真幹什麼？」\n* 「這就只是個爛笑話。」',
         '<33>{#p/without}* 「呵...」',
         '<33>{#p/without}* 「別看得太入迷了。」',
         ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ...這是我經歷過的\n  最爛的笑話。' ])
      ],
      sansinter: {
         s_sans: pager.create(
            0,
            () =>
               world.edgy
                  ? [ "<25>{#p/sans}* 咋了？" ]
                  : [
                       "<25>{#p/sans}* 你知道的，\n  帕派瑞斯很快就會回來。",
                       "<25>{#f/4}* 我要是你，\n  我就先走了...",
                       "<25>{#f/2}* 否則，你就得繼續聽\n  我講的搞笑笑話了。"
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/3}* 真是太遺憾了...',
                       '<25>{#p/sans}{#f/2}* 這時候，我兄弟正忙著做\n  我布置的數獨習題集呢。',
                       "<25>{#p/sans}* 要是他在這，\n  就有一簍子事情等著咱們了。"
                    ]
                  : [
                       "<25>{#p/sans}* 你瞧，\n  沒什麼好害怕的。",
                       "<25>{#f/2}* 帕派瑞斯看起來嚇人，\n  但他會是你見過的\n  最好的傢伙的。"
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}* 咋的？\n* 想讓我把他帶過來？',
                       "<25>{#f/3}* 呵，小子。\n* 你是不是沒明白\n  我剛說的是啥意思？",
                       "<25>{#p/sans}{#f/2}* 聽我句勸：\n  最好別得寸進尺，\n  對你我都好。"
                    ]
                  : [ '<25>{#p/sans}* 信我的。' ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/3}* ...',
                       "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 別給臉不要臉。",
                       '{*}{#s.resume}{%}'
                    ]
                  : [ '<25>{#p/sans}* 信我的。' ],
            () => (world.edgy ? [] : [ '<25>{#p/sans}* 信我的。' ])
         ),
         s_papyrus: pager.create(
            0,
            [
               "<25>{#p/sans}* 嘿，有件重要的東西\n  你得記住。",
               '<25>* 我兄弟有一種很\n  {@fill=#00a2e8}特殊的攻擊{@fill=#fff}。',
               "<25>* 如果看到了{@fill=#ff993d}橙色攻擊{@fill=#fff}，\n  你如果不動，就會受傷。",
               "<25>{#f/3}* 有種簡單的方式\n  可以幫助你記住。",
               "<25>{#f/0}* 想像一下燒紅的煤炭。\n* 你肯定不會站在\n  那種東西上吧？",
               '<25>* 煤炭質地比較堅硬。\n* 所以不妨換成骨質煤炭來想。',
               '<25>{#f/2}* 非常簡單，對吧？\n* 記得戰鬥的時候想想\n  發熱的骨質煤炭吧。'
            ],
            [
               "<25>{#p/sans}{#f/0}* 當然，你如果緩慢移動\n  是不會受傷的。",
               '<25>{#f/0}* 只要保持移動就可以。',
               "<25>{#f/2}* 肯定會有人\n  比我解釋得更好的。"
            ],
            [ '<25>{#p/sans}{#f/2}* 記住...\n* 發熱的骨質煤炭。' ]
         ),
         s_dogs: pager.create(
            0,
            [
               "<25>{#p/sans}* 鑑於你是人類，\n  你應該從來沒有聽說過\n  T.M.D.這個東西吧。",
               '<25>{#f/2}* 那是「突變·脈衝·對流層」\n  技術的縮寫。'
            ],
            [
               '<25>{#p/sans}* 如果T.M.D.出現問題，\n  我們周圍的空氣\n  就會消失不見。',
               "<25>{#f/3}* 不過別擔心。\n* 我剛才說的那些，\n  從來就不曾{@fill=#ff0}粗{@fill=#fff}現過。"
            ],
            [ '<25>{#p/sans}{#f/2}* 突變脈衝對流層技術。' ]
         ),
         s_jenga: pager.create(
            0,
            [
               '<25>{#p/sans}* 實際上，\n  早些時候的那份意面...',
               "<25>{#f/3}* 對我兄弟來說\n  還算好的。",
               "<25>{#f/0}* 自從他開始上烹飪課，\n  他已經進步很多了。",
               "<25>{#f/4}* 我敢說如果他堅持下去，\n  他甚至會驚豔到國王。"
            ],
            () =>
               world.edgy || world.killed5
                  ? [ '<25>{#p/sans}{#f/2}* ... sure would be a good way for him to get away from you.' ]
                  : [ "<25>{#p/sans}{#f/2}* ...那個對意面\n  異常痴迷的男人。" ]
         ),
         s_bridge: pager.create(
            0,
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/0}* 希望你喜歡\n  我最後布置的謎題。',
                       '<25>{#f/3}* 時間比較緊，但帕派瑞斯\n  堅持讓我設計好謎題，\n  我還是照做了。'
                    ]
                  : world.killed5
                  ? [
                       "<25>{#p/sans}{#f/3}* 我聽說，\n  這裡的怪物都四散而逃了...",
                       "<25>{#f/0}* 奉勸你最好小心點，\n  別把小命丟了。"
                    ]
                  : [
                       "<25>{#p/sans}{#f/3}* 不知道我兄弟\n  現在又要去幹啥。",
                       '<25>{#f/0}* 我覺得，你可以趁這會\n  複習一下{@fill=#ff993d}橙色攻擊{@fill=#fff}。'
                    ],
            () =>
               world.edgy
                  ? [
                       '<25>{#p/sans}{#f/0}* 怎麼？\n* 怪我不好好設計謎題？',
                       "<25>{#f/3}* 我還得一邊應付你，\n  一邊花時間準備謎題。\n* 能弄好就怪了。"
                    ]
                  : world.killed5
                  ? [
                       '<25>{#p/sans}{#f/0}* 我好歹有親兄弟\n  願意無條件關心我，支援我。',
                       "<25>{#f/2}* 而你..."
                    ]
                  : [ '<25>{#p/sans}{#f/2}* 喔，順帶再複習下{@fill=#00a2e8}藍色攻擊{@fill=#fff}。' ],
            () =>
               world.edgy
                  ? [ '<25>{#p/sans}{#f/3}* 就是這樣。' ]
                  : world.killed5
                  ? [ '<25>{#p/sans}{#f/0}* 我說錯了？' ]
                  : [ '<26>{#p/sans}{#f/0}* 還有其他攻擊。' ]
         )
      },
      sansbredgey: () =>
         world.edgy
            ? 6 <= world.population
               ? [
                    '<25>{#p/sans}* 對了...',
                    "<25>* 我知道，之前待你有些不周...",
                    '<25>{#f/3}* 很高興你願意\n  做個更善良的人。',
                    '<25>{#f/2}* 堅持下去，好嗎？'
                 ]
               : world.bullied
               ? [
                    '<25>{#p/sans}* 對了...',
                    "<25>* 我知道，你還在繼續\n  傷害怪物，威脅他們的生命...",
                    '<25>{#f/3}* 但至少，你沒有\n  放任自流，屠殺殆盡。',
                    "<25>{#f/2}* 挺好的，是吧？"
                 ]
               : [
                    '<25>{#p/sans}* 對了...',
                    '<25>* 你要是不小心\n  遇到了我的兄弟...',
                    '<25>{#f/3}* ...',
                    "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 敢動他一下試試。",
                    '{*}{#s.resume}{%}'
                 ]
            : 6 <= world.population
            ? [
                 '<25>{#p/sans}* 對了...',
                 "<25>* 我知道我兄弟\n  有時候蠢蠢的...",
                 "<25>{#f/3}* 謝謝你願意配合\n  他那些瘋狂的計畫。",
                 "<25>{#f/2}* 你真的很棒。"
              ]
            : world.bullied
            ? [
                 '<25>{#p/sans}* 對了...',
                 "<25>* 我知道，你在傷害怪物，\n  威脅他們的生命...",
                 '<25>{#f/3}* 但至少，你沒有\n  放任自流，屠殺殆盡。',
                 "<25>{#f/2}* 挺好的，是吧？"
              ]
            : [
                 '<25>{#p/sans}* 對了...',
                 '<25>* 你要是不小心\n  遇到了我的兄弟...',
                 '<25>{#f/3}* ...',
                 "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 敢動他一下試試。",
                 '{*}{#s.resume}{%}'
              ],
      sentryPapyrus1: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The narration on this sentry station predicts the future fame of its creator.)' ]
               : [
                    "<32>{#p/basic}* 紙殼箱上寫著幾句話。",
                    ...(world.genocide || world.runaway
                       ? [
                            '<23>{#p/papyrus}{#f/30}「求你不要毀掉我的哨站。」',
                            '<23>「我費了好大功夫才搭好它，\n要是它垮了，我會很傷心的。」',
                            '<23>「...以上。」',
                            '<23>（「註：我還想再寫點，\n但是沒地方了。」）'
                         ]
                       : [
                            '<23>{#p/papyrus}{#f/30}「你仔細打量眼前這個\n精心製作的哨站，心想...」',
                            '<23>「是哪位能工巧匠，\n才能做出這樣的哨站呢？」',
                            '<23>「我敢說，肯定是出自那個\n超-有名的皇家守衛之手！」',
                            SAVE.data.n.plot === 72
                               ? '<32>{#p/basic}* The last line was crossed out.'
                               : '<23>（「註：現在還暫時沒當上\n  超有名的皇家守衛。」）',
                            ...(SAVE.data.n.plot < 19 && !(world.edgy || world.killed5 || world.population < 6)
                               ? [
                                    "<25>{#p/sans}{#f/0}* 在欣賞我兄弟的手工成果，\n  是嗎？",
                                    "<25>{#p/sans}{#f/2}* 我知道的。\n* 真的很酷。"
                                 ]
                               : [])
                         ])
                 ],
         () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The narration on this sentry station predicts the future fame of its creator.)' ]
               : [
                    "<32>{#p/basic}* 紙殼箱上寫著幾句話。",
                    ...(world.genocide || world.runaway
                       ? [
                            '<23>{#p/papyrus}{#f/30}「求你不要毀掉我的哨站。」',
                            '<23>「我費了好大功夫才搭好它，\n要是它垮了，我會很傷心的。」',
                            '<23>「...以上。」',
                            '<23>（「註：我還想再寫點，\n但是沒地方了。」）'
                         ]
                       : [
                            '<23>{#p/papyrus}{#f/30}「你仔細打量眼前這個\n精心製作的哨站，心想...」',
                            '<23>「是哪位能工巧匠，\n才能做出這樣的哨站呢？」',
                            '<23>「我敢說，肯定是出自那個\n超-有名的皇家守衛之手！」',
                            SAVE.data.n.plot === 72
                               ? '<32>{#p/basic}* The last line was crossed out.\n* That checks out.'
                               : '<23>（「註：現在還暫時沒當上\n  超有名的皇家守衛。」）'
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
            : [ '<32>* 裡面堆滿了一箱又一箱未使用過的\n  電纜和過時玩意。' ])
      ]),
      sentrySans1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (This sentry station strikes you as rather unimportant.)' ]
            : world.darker
            ? [ "<32>{#p/basic}* 這是個哨站。" ]
            : SAVE.data.n.plot < 31
            ? [
                 "<32>{#p/basic}* 衫斯的哨站...",
                 "<32>* 這絕對是皇家守衛\n  最值得的投資。"
              ]
            : SAVE.data.n.plot === 72
            ? [ "<32>{#p/basic}* 衫斯的哨站...", "<32>* The quality of this investment hasn't changed a bit." ]
            : [ "<32>{#p/basic}* 衫斯的哨站...", '<33>* A poor investment in hindsight.' ],
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
               ? [ "<32>{#p/basic}* 除了一支紅蠟筆外，什麼都沒有。" ]
               : [ '<32>{#p/basic}* 這裡儲存了幾瓶蜂蜜，\n  阿爾弗雷多面醬，\n  以及雅莫萬用醬。' ])
         ],
         () => [
            '<32>{#p/human}* （你往桌板下面看了一眼...）',
            SAVE.data.b.svr
               ? '<25>{#p/asriel1}{#f/20}* Please.\n* Anywhere but here.'
               : world.edgy
               ? "<32>{#p/basic}* 那是令人不安的警示。"
               : "<32>{#p/basic}* 裡面存放著無窮無盡的食物佐料。"
         ]
      ),
      whew1: () =>
         [
            [ '<32>{#p/basic}* 狗窩上覆蓋著\n  煩人的白毛。' ],
            [ '<32>{#p/basic}* 和帕派瑞斯打了兩架後，\n  你有點累了，但還不至於倒頭就睡。' ],
            [
               '<32>{#p/basic}* 連著戰鬥三次後，你精疲力盡了。',
               choicer.create('* （你該怎麼辦？）', '不睡', '睡覺')
            ],
            [
               '<32>{#p/basic}* 接連的戰鬥使你精疲力盡了。',
               choicer.create('* （你該怎麼辦？）', '不睡', '睡覺')
            ]
         ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 3)],
      whew2: [ '<32>{#p/human}* （你沒動狗窩。）' ],
      whew3: [ '<32>{#p/human}* （你睡在了狗窩裡...）' ],
      whew4: [
         "<32>{#p/alphys}* 那人真在這裡？",
         '<32>{#p/sans}{#f/7}* 嗯。\n* 我兄弟說的，千真萬確。',
         '<32>{#p/alphys}* 好-好吧...\n* 那我看看...',
         '<32>{#p/human}* （門開的聲音。）',
         '<32>{#p/alphys}* ...',
         '<32>{#p/alphys}* 喔，還真在這裡。',
         "<32>{#p/sans}{#f/7}* 嘿，咱們動作得快。",
         "<32>{#p/sans}{#f/7}* 說不定哪一會\n  安黛因就發現了。",
         '<32>{#p/alphys}* 我-我已經儘快了！'
      ],
      whew5: [
         '<32>{#p/human}* （你感覺有人正努力\n  把你扛起來。）',
         '<32>{#p/alphys}* 天哪，為-為什麼人類\n  都這麼重啊？！'
      ],
      whew6: [
         '<32>{#p/basic}* 嗯？\n* 我們這是到...',
         "<32>* ...艾斯戈爾家了。",
         "<32>* 來吧，\n  我們一起去找他..."
      ],
      trivia: {
         s_bbox: [ "<32>{#p/basic}* A bastion box.\n* There's a human inside..." ],
         
         ogkxsaucer: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You reach your hand deep into the dispenser.)\n* (It's a tad saucy.)" ]
               : [ "<32>{#p/basic}* 某種型號的噴醬機。" ],
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
               [ "<32>{#p/basic}* 一盞「彈」燈。" ],
               [ '<32>{#p/basic}* 一盞很彈很彈的燈。' ],
               [ '<32>{#p/basic}* 如此彈。\n* 如此燈。' ],
               [ '<32>{#p/basic}* 燈，彈，燈，彈...' ],
               [ '<32>{#p/basic}* 彈燈上下運動著。' ],
               [ '<32>{#p/basic}* ...彈動永不停歇。' ],
               [ "<32>{#p/basic}* It's a little thing called perpetual motion." ]
            ].map(
               lines => () =>
                  SAVE.data.b.svr
                     ? [ '<32>{#p/human}* （你注視著奇怪的燈上下彈跳。）' ]
                     : world.darker
                     ? [ '<32>{#p/basic}* 只是盞燈。' ]
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
               ? [ "<32>{#p/basic}* 裝置沒激活。" ]
               : postSIGMA()
               ? [ "<32>{#p/basic}* 不能使用了。" ]
               : [ '<32>{#p/basic}* 真是個不幸的結果。' ],
         s_secret_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign mentions an escape.)' ]
               : SAVE.data.n.state_starton_trashprogress < 2 && SAVE.data.n.plot < 72
               ? [
                    '<32>{#p/basic}* 「正在小憩。」',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielDog++ < 1 ? [ '<25>{#p/asriel2}{#f/15}* What.' ] : [])
                 ]
               : [ '<32>{#p/basic}* 「逃走了。」' ],
         grillflower: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears this plant is very neon indeed.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* 一株植物。" ]
               : [
                    "<32>{#p/basic}* 這不僅僅是一株植物...\n* 這是一株霓虹植物。",
                    '<32>* 這有什麼區別嗎？\n* 沒有，完全沒有。'
                 ],
         librarbywindow1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But there was nothing of real interest to see here.)' ]
               : [ "<32>{#p/basic}* 窗戶裡面有一株植物。\n* 真有趣。" ],
         librarbywindow2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* （你夠到了窗戶邊緣，\n  並將雙手搭在了窗戶上。）' ]
               : [ "<32>{#p/human}* （你夠到了窗戶邊緣，\n  並將雙手搭在了窗戶上。）\n* （但你看不見裡面的任何東西。）" ],
         papwindow: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You peer into the window, but you couldn't see anybody inside.)" ]
               : SAVE.data.n.plot_date > 0 && SAVE.data.n.plot_date < 1 && SAVE.data.n.plot < 71.2
               ? [ '<32>{#p/basic}* ... seems Papyrus is waiting patiently for you.' ]
               : [ "<32>{#p/basic}* ...看來沒人在家。" ],
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
               ? [ '<32>{#p/basic}* ...但是誰也沒有來。' ]
               : world.runaway || world.population === 0
               ? [ '<32>{#p/basic}* ...但是大家都逃走了。' ]
               : SAVE.data.n.plot < 72
               ? [ "<32>{#p/basic}* 它正在跟自己玩一種\n  撲克牌遊戲。", '<32>* 感覺它要輸了...' ]
               : [
                    "<32>{#p/basic}* 它正在跟自己玩一種\n  撲克牌遊戲。",
                    '<32>* It appears to be winning...\n* Somehow.'
                 ],
         s_backrooms_lesstable: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You wonder if the Dog chow is edible for humans.)' ]
               : [ "<32>{#p/basic}* 桌上放了一副4D撲克牌，\n  還有免費狗糧。" ],
         s_beddinng_table: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You glance at the table.)\n* (You then glance away.)' ]
               : [ '<32>{#p/basic}* 必備之桌。\n* 雖無所用，卻恰得其所。' ],
         s_bh_bone: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You admire the artisanship in this minimalistic painting.)' ]
                  : [
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}一幅經典的繪畫。',
                               "<18>它總能讓我想起\n我人生中最重要的東西。"
                            ]
                          : []),
                       "<32>{#p/basic}* 這是一幅極簡主義的\n  卡通骨頭畫。"
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You admire the artisanship in this minimalistic painting.)' ]
                  : [ "<32>{#p/basic}* 這是一幅極簡主義的\n  卡通骨頭畫。" ]
         ),
         s_bh_cottonball: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The content of the notes attached to this pile of socks does not surprise you at all.)'
                 ]
               : [
                    "<32>{#p/basic}* 這是個髒髒的棉球，\n  上面附著好幾張便條。",
                    '<23>{#p/papyrusnt}「衫斯！」\n「把你的棉球撿起來！」',
                    '<32>{#p/without}* 「好的。」',
                    '<23>{#p/papyrusnt}「別把它放回去！」\n「把它挪走！」',
                    '<32>{#p/without}* 「好的。」',
                    '<23>{#p/papyrusnt}「你就挪了兩微米！」\n「把它拿回你的房間！」',
                    '<32>{#p/without}* 「好的。」',
                    '<23>{#p/papyrusnt}「不要再把它拿回來了！」',
                    '<32>{#p/without}* 「好的。」',
                    '<23>{#p/papyrusnt}「它還在這！」',
                    '<32>{#p/without}* 「你剛才不是說，\n    不要把它拿回我的房間嗎？」',
                    '<23>{#p/papyrusnt}「算了！」'
                 ],
         s_paptrash: pager.create(
            0,
            ...[
               () => [
                  ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                     ? [
                          "<18>{#p/papyrus}{#f/9}我都不知道你還\n喜歡撿垃圾！",
                          '<18>{#f/0}艾菲斯博士會\n對你很感興趣的。'
                       ]
                     : []),
                  world.darker ? "<32>{#p/basic}* 一個垃圾桶。" : '<32>{#p/basic}* 這是個「閃亮」垃圾桶。'
               ],
               pager.create(
                  1,
                  ...[
                     [
                        '<32>{#p/basic}* 之所以說這個垃圾桶「閃亮」，\n  是因為它的一邊就寫著\n  「閃亮」兩個字。'
                     ],
                     [ '<32>{#p/basic}* 一個「閃亮」星仔\n  對一個「閃亮」垃圾桶。\n* 你還能有什麼想知道的。' ],
                     [ '<32>{#p/basic}* 小鎮這一帶中\n  最「閃亮」的垃圾桶。' ],
                     [ '<32>{#p/basic}* 這麼說來，\n  也可以是別的某一帶。' ],
                     [ '<32>{#p/basic}* 它到底有多「閃亮」？' ],
                     [ '<32>{#p/basic}* 非常？\n* 非常非常？\n* 比別的任何東西都「閃亮」？' ],
                     [ "<32>{#p/basic}* 我們還有選擇的餘地，\n  寶貝！" ],
                     [
                        '<33>{#p/basic}* 但不管時間如何流逝...\n  這個垃圾桶給你的印象\n  仍然「閃亮」。'
                     ],
                     [
                        '<32>{#p/basic}* 實際上，我越想越覺得，\n  「閃亮」這個形容\n  太浮皮潦草了。'
                     ],
                     [ '<32>{#p/basic}* 就比如，也許\n  用「參天」這個詞來形容\n  就更適合一點。' ],
                     [ "<33>{#p/basic}* 實際上，還是算了吧。\n* 這個詞還是給皇家實驗室的\n  高層留著吧。" ],
                     [ '<32>{#p/basic}* 嗯...\n* 萬一這個垃圾桶是黑洞偽裝的呢！' ],
                     [ '<32>{#p/basic}* 一個黑洞垃圾桶...\n* 你會願意冒這個險嗎？' ],
                     [ "<32>{#p/basic}* 這問題問得有點怪了。" ],
                     [
                        '<32>{#p/basic}* 我覺得你現在就可以說，\n  都是因為這個垃圾桶，\n  我思緒完全「升空」了。'
                     ],
                     [ "<32>{#p/basic}* 你甚至可以說，\n  我感覺要... 羽化登仙了。" ],
                     [ '<32>{#p/basic}* ...\n* 你當我最後一句沒說。' ],
                     [ '<32>{#p/basic}* 實際上，你還是\n  把我說的最後九句全忘了吧。\n  算上這句。' ],
                     [ "<32>{#p/basic}* 說白了...\n* 這個垃圾桶只能用\n  一個形容詞來形容。" ],
                     [ "<32>{#p/basic}* 你問是什麼詞？\n* 那，我就告訴你...\n  如果你真的想知道的話。" ],
                     [ "<32>{#p/basic}* 它不是一個參天的垃圾桶，\n  絕對不是。" ],
                     [ "<32>{#p/basic}* 從任何角度來看，\n  這也不像是黑洞樣式的..." ],
                     [ "<32>{#p/basic}* 你還記得嗎？\n* 你還記得我們是從哪裡\n  開始的嗎？" ],
                     [ '<32>{#p/basic}* 那是我對這個垃圾桶\n  說過的第一句話。' ],
                     [ '<32>{#p/basic}* ...\n* 我說過...\n* 你等一下...' ],
                     [ '<32>{#p/basic}* 這是個「閃亮」垃圾桶。' ]
                  ].map(lines => () => world.darker ? [ "<32>{#p/basic}* 一個垃圾桶。" ] : lines)
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
                               '<18>{#p/papyrus}{#f/9}啊哈！\n對我的食物博物館\n感興趣了嗎？',
                               '<18>{#f/0}請隨意參觀我的\n烹飪藝術展。'
                            ]
                          : []),
                       '<32>{#p/basic}* 冰箱的一半都堆滿了\n  標有「義大利麵」的容器。',
                       '<32>* 另一半則只放了一瓶橙汁汽水。'
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
                          ? [ "<18>{#p/papyrus}不錯的冰箱，\n是吧？" ]
                          : []),
                       '<32>{#p/basic}* 瓶子上寫著\n  「艾菲斯」的名字。'
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
                               '<18>{#p/papyrus}啊，沒錯，\n這是餐桌。',
                               '<18>{#f/5}我們之前養過\n一塊月巖...',
                               '<18>{#f/7}但後來有一天，\n它徹底消失了！',
                               '<18>{#f/4}最開始，我覺得是\n那隻愛管閒事的\n狗幹的。',
                               '<18>{#f/7}但後來我發現，\n是衫斯用它來測試\n他的...',
                               '<18>{#f/6}他的... 很有用的\n小玩意。\n哇...',
                               "<18>{#f/0}所以呢，\n給他就給他了吧。",
                               '<18>{#f/0}他真的在努力去\n做一件事。',
                               '<18>{#f/4}即使要我們付出\n那塊寶貴的月巖的\n代價。',
                               "<18>{#f/0}是啊！！\n努力總比\n不努力強！！"
                            ]
                          : []),
                       "<32>{#p/basic}* 上面覆蓋著\n  可食用的星塵。"
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You doubt the stardust is actually edible.)' ]
                  : [ "<32>{#p/basic}* 上面覆蓋著\n  可食用的星塵。" ]
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
                       "<32>{#p/basic}* 烤箱裡有一個\n  空的錫紙盤。",
                       ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                          ? [
                               '<18>{#p/papyrus}我兄弟經常\n去外面吃。',
                               "<18>{#f/4}但最近，他開始\n嘗試去「烘焙」\n一些東西了...",
                               '<18>{#f/5}我猜那個是...\n芝士蛋糕？',
                               "<18>{#f/6}我不太能確定。"
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
                  : [ "<32>{#p/basic}* 烤箱裡有一個\n  空的錫紙盤。" ]
         ),
         s_chew: [ "<32>{#p/basic}* 這是一個吱吱作響的咀嚼玩具，\n  標籤上寫著「特殊攻擊」。" ],
         s_crossroads_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign espouses the many benefits of boxes.)' ]
               : [
                    '<32>{#p/basic}* 「這是一個箱子。」',
                    '<32>* 「你可以把物品放進去\n   或者拿出來。」',
                    '<32>* 「同樣的箱子之後還會出現，\n   不必擔心要回來取東西。」',
                    '<32>* 「謹上，一個箱子愛好者。」'
                 ],
         s_doghouse: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The interior wall of this doghouse appears to be covered in strange round circles.)'
                 ]
               : SAVE.data.n.state_starton_greatdog === 2
               ? [ '<32>{#p/basic}* 這個狗窩內部一定有很大空間。' ]
               : world.genocide || world.edgy || world.darker
               ? [ '<32>{#p/basic}* A tiny doghouse.' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* I wonder if this doghouse also travels in time.' ]
               : [ '<32>{#p/basic}* 多麼小巧的狗屋啊！', '<32>{#p/basic}* 裡頭看起來比外邊大。' ],
         s_doghouse_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You struggle to explain what's written on this sign.)" ]
               : [ '<32>{#p/basic}* \"Woof.\"' ],
         s_dogs_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign rates the danger level of certain smells.)' ]
               : [
                    '<32>{#p/basic}* 「氣味危險分級」',
                    '<32>* 「矽膠的氣味 - 機器人」\n* 「白色等級。」\n* 「也可以變成{@fill=#2f2f2f}黑色{@fill=#fff}等級。」',
                    '<32>* 「不可疑的氣味 - 小狗」\n* 「{@fill=#003cff}藍色{@fill=#fff}等級。」\n* 「在地裡打滾的氣味。」',
                    world.runaway
                       ? '<32>* 「古怪的氣味 - 人類」\n* 「{@fill=#00c000}綠色{@fill=#fff}等級。」\n* 「一旦看到，立馬逃跑！」'
                       : SAVE.data.n.plot === 72
                       ? '<32>* 「古怪的氣味 - 人類」\n* 「{@fill=#00c000}綠色{@fill=#fff}等級。」\n* 「不懼神明之力。」'
                       : SAVE.data.n.plot < 31
                       ? '<32>* 「古怪的氣味 - 人類」\n* 「{@fill=#00c000}綠色{@fill=#fff}等級。」\n* 「不惜一切代價消滅！」'
                       : '<32>* 「古怪的氣味 - 小狗？」\n* 「{@fill=#00c000}綠色{@fill=#fff}等級。」\n* 「深諳擼狗之道。」'
                 ],
         s_dogstandA: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It would appear this sign belongs to a male dog.)' ]
               : player.position.y > 50
               ? [ '<32>{#p/basic}* 「他的。」' ]
               : [ '<32>{#p/basic}* Inside is a magazine for fancy blue-and-grey furcuts.' ],
         s_dogstandB: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It would appear this sign belongs to a female dog.)' ]
               : player.position.y > 50
               ? [ '<32>{#p/basic}* 「她的。」' ]
               : [ '<32>{#p/basic}* Inside is a brochure for blunt heavy-duty weaponry.' ],
         s_dogstandC: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The signed letter inside looks to have been ignored.)' ]
               : world.genocide
               ? [
                    '<32>{#p/basic}* 地板上，是一封寫著「果斷撤離」的\n  皇家守衛籤名信。',
                    '<32>{#p/basic}* 信上的「果」字幾乎都被啃掉了...'
                 ]
               : [
                    '<32>{#p/basic}* 在裡面的地板上\n  放著一封關於統一制服尺寸的\n  皇家守衛籤名信，',
                    "<32>{#p/basic}* 上面全是爪印。"
                 ],
         s_grillbys_beegstool: () =>
            SAVE.data.b.svr
               ? [ '<25>{#p/asriel1}{#f/20}* I think that might be a little tall for you.' ]
               : world.darker
               ? [ '<32>{#p/basic}* 另一把高腳凳。' ]
               : [ '<32>{#p/basic}* 一把高腳凳...', '<32>* 高度剛好適合衫斯。' ],
         s_grillbys_drinks: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't make out what's under the tray table...)" ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* 一張摺疊式餐桌。", '<32>* The camera on the underside has been taken away.' ]
               : [ "<32>{#p/basic}* 一張摺疊式餐桌。", "<32>* 下面藏了個攝像頭。" ],
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
                    '<32>{#p/basic}* 柜子上擺滿了\n  五花八門的派對酒水和噁心的液體。',
                    '<32>{#p/basic}* 唯一的一瓶水貼有\n  「當心明火」的標籤。'
                 ],
         s_grillbys_sidestool: () =>
            SAVE.data.b.svr
               ? [ "<25>{#p/asriel1}{#f/20}* That one's definitely too tall for you." ]
               : world.darker
               ? [ '<32>{#p/basic}* 另一把高腳凳。' ]
               : [ '<32>{#p/basic}* 這把高腳凳上標著「帕派瑞斯」。' ],
         s_grillbys_smolstool: () =>
            SAVE.data.b.svr
               ? [ '<25>{#p/asriel1}{#f/19}* This one seems like just your size.' ]
               : world.darker
               ? [ '<32>{#p/basic}* 另一把高腳凳。' ]
               : SAVE.data.b.oops
               ? [ '<32>{#p/basic}* 這把高腳凳沒什麼特別的。' ]
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
               : [ '<32>{#p/basic}* 一個曾經用來指揮\n  懸浮車著陸的廢棄終端。' ],
         s_jenga_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign describes the broken state of the display tower's quantum randomizer.)" ]
               : [ '<32>{#p/basic}* 「注意：這個顯示臺裡的\n   量子隨機數生成器仍然是壞的。」' ],
         s_library_window: () => [
            '<32>{#p/human}* （你將雙手搭在了窗戶上。）',
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
                       '<32>{#p/basic}* 書架上標著「舊事重提」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「戰前，怪物每天都要學習魔法。」',
                       '<32>* 「然而，大多數同胞都在戰爭中犧牲，\n   其中就包括許多教師。」',
                       '<32>* 「面對這一問題，剩餘的怪物們\n   開始採用集體學習的方式。」',
                       '<32>* 「當時採用這一方式，是為了讓我們\n   能在前哨站更好地生存。」',
                       '<32>* 「如今，人口不足的問題\n   幾乎不復存在。」',
                       '<32>* 「儘管如此，我們還是\n   堅持新的學習方式，因為...」',
                       '<32>* 「...我們懶得再改回去了。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「舊事重提」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「以前，\n   怪物使用多種貨幣進行交易。」',
                       '<32>* 「主要流通的是珠寶和『克裡』... \n   但它們只能在母星上使用。」',
                       '<32>* 「與人類進行貿易時，\n   就只能選擇金錢作為貨幣。」',
                       '<32>* 「豐富的金礦資源\n   為我們帶來了許多便利。」',
                       '<32>* 「但也因此導致\n   其他貨幣迅速貶值。」',
                       '<32>* 「如今，金錢成為了\n   我們唯一的貨幣！」\n* 「這就是怪物的作風。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of comparisons between the past the and present.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「舊事重提」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「艾羅戈死後，國王盡己所能\n   去保留故園的遺存。」',
                       '<32>* 「儘管在儲存途中，\n   他還是把那件最重要的東西\n   弄丟了...」',
                       '<32>* 「但我們早已習慣逆來順受，\n   沒有因此責怪他。」',
                       '<32>* 「過去兩百年間充滿坎坷，\n   但同時自由也離我們越來越近。」',
                       '<32>* 「天使即將降臨...」',
                       '<32>* 「...我們猜想，或許他已經到來，\n   此刻正讀著這本書。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ]
         ),
         s_librarby_desk: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You observe the dust gathering on this check-out book.)' ]
               : [ "<32>{#p/basic}* 圖書倌的借閱記錄。" ],
         s_librarby_greenBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「雜談」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「『域外網』，是國王與皇家科學員\n   共同打造的網路平臺。」',
                       '<32>* 「...不過，主要是皇家科學員的功勞。\n   國王僅僅寫了個歡迎致辭。」',
                       '<32>* 「言歸正傳，\n   域外網作為一個『虛擬廣場』，\n   將前哨站的居民聯繫在一起。」',
                       '<32>* 「想要創建帳戶，你只需要...」',
                       '<32>* 「呃... 好吧...」',
                       "<32>* 「這教程看著清楚，\n   寫的可是不清不楚。」",
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「雜談」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「要是你想到前哨站各處逛逛的話，\n   呼叫旅人是你的不二之選。」',
                       '<32>* 「不管你想去哪，他都可以載你一程。」',
                       '<32>* 「...因為，你總可以\n   在最近的停靠站找到他。」',
                       '<32>* 「而且，說真的，\n   他說話有點不知所云。」',
                       '<33>* 「『狗子的公道』到底是個啥？」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of information, some of which is actually useful.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「雜談」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「怪物們可以自由穿梭於\n   前哨站的各個區域。」',
                       '<32>* 「只有首塔頂端的最終長廊\n   是禁區。」',
                       '<32>* 「除了皇家科學員，\n   任何居民都不得通過那裡。」',
                       '<32>* 「...我們仍不清楚其中的原因。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ]
         ),
         s_librarby_ladder: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears the access hatch above this ladder was sealed shut.)' ]
               : [ "<32>{#p/basic}* 一把亂放的梯子。\n* 沒什麼好說的。" ],
         s_librarby_pinkBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「怪物生物學」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「理論上講，\n   怪物的葬禮十分酷炫。」',
                       '<32>* 「當怪物老了，\n   然後翹辮子了，\n   他們就會化為塵埃。」',
                       '<32>* 「在葬禮上，我們拿來這些塵埃，\n   灑在他生前最喜歡的東西上。」',
                       '<32>* 「這樣一來，他的精神\n   就會留存在那件物品中...」',
                       '<32>* 「唔，我湊夠字數了嗎？」\n* 「我有點討厭寫這個。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「怪物生物學」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「怪物的軀體由魔法構成，\n   因此和靈魂密不可分。」',
                       '<32>* 「如果一個怪物蓄意傷人，\n   還對此執迷不悟...」',
                       '<32>* 「他就會變得異常強大。」',
                       '<32>* 「不過大多數我族同胞並不崇尚暴力，\n   至少不是打心底裡。」',
                       '<32>* 「可是，如果我們再次遭受襲擊，\n   能用於自衛的，只有一座前哨站...」',
                       '<32>* ...',
                       '<32>{#p/human}* （你不想再讀下去了。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of various facts about the biology of monsters.)'
                    ]
                  : [
                       '<32>{#p/basic}* 書架上標著「怪物生物學」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「怪物的身體主要由魔法構成，\n   而人類的身體主要由水構成。」',
                       '<32>* 「就物質組成來說，\n   人類比我們強大得多。」',
                       '<32>* 「但是，他們永遠不能體會到\n   使用魔法表達自我的樂趣。」',
                       '<32>* 「他們永遠不會收到\n   一張彈幕生日賀卡...」',
                       '<32>* 「也永遠不能\n   使用隱藏術和鷹眼術玩捉迷藏...」',
                       '<32>* 「更無法拿電魔法\n   辦一場炫酷燈光秀！」',
                       '<32>* 「太可憐了。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ]
         ),
         s_librarby_purpleBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* 書架上標著「故園歷史」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「故園日夜，皆為奇觀。」',
                       '<32>* 「晨曦初露，光塔劃空，天啟新篇。」',
                       '<32>* 「至於白晝，光層共振，輝煌萬丈。」',
                       '<32>* 「能量盡釋，夜幕悄然。」',
                       '<32>* 「星辰降臨，魔力凝聚。」',
                       '<32>* 「日光之能，盡數落地，歸於塵寰。」',
                       '<32>* 「直至光塔重升，耀眼如初。」',
                       '<32>* 「此乃晝夜，永恆循環，主宰光陰。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* 書架上標著「故園歷史」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「你知道嗎，怪物們如今的社會結構\n   並非一直存在。」',
                       '<32>* 「很久很久以前，\n   確切來說，距今大約幾千年時...」',
                       '<32>* 「我們的祖先每天漫無目的，\n   肆意嬉戲。」',
                       '<32>* 「不敢相信！\n   那時的怪物甚至連衣服都不穿！」',
                       '<32>* 「不過，隨著時間流逝，\n   我們有了新的追求，渴望進化。」',
                       '<32>* 「在那場偉大的復興運動中，\n   連魔法的本質都被擺上檯面，\n   成為焦點。」',
                       '<32>* 「這些進步奠定了我們的社會結構，\n   乃至如今的生活方式。」',
                       '<32>* 「...我還是不敢相信\n   長達兩千年的歷史中，\n   我們都在裸著亂跑。」',
                       '<32>* 「哪有風度？」\n* 「哪有時尚？」\n* 「太不可思議了。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf document the history of the monster homeworld.)' ]
                  : [
                       '<32>{#p/basic}* 書架上標著「故園歷史」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「人怪首次會面時，\n   當政的怪物王是艾羅戈。」',
                       '<32>* 「在他英明的領導下，\n   兩族和平共處，相安無事。」',
                       '<32>* 「但隨著艾羅戈壽終正寢...\n   這一切都一去不復返了。」',
                       '<32>* 「艾羅戈有能力維持兩族長久和平，\n   而王子卻難以承襲此功。」',
                       '<32>* 「於是，一場大戰將在所難免...\n   實在令人痛心。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ]
         ),
         s_librarby_yellowBooks: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* 書架上標著「怪物科技」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「葛森曾說，\n   前哨站以前只是個小太空站。」',
                       '<32>* 「在受了整整二十年苦之後，\n   有人將目光轉向了那道力場。\n   心想...」',
                       "<32>* 「『這股強大的能量，\n   能否為己所用呢？』」",
                       '<32>* 「這主意簡潔明了，\n   但又十分巧妙。」',
                       '<32>* 「在這一想法的指引下，\n   核心最終建成，\n   我們因此有了穩定的能源。」',
                       '<32>* 「時至今日，我們仍在使用它！」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* 書架上標著「怪物科技」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「啊，人工智慧真是\n   世界一大奇蹟...」',
                       '<32>* 「...也可能恰恰相反。」',
                       '<32>* 「自從建築機器人K-541.12出了事之後，\n   我們就徹底放棄了研發\n   有自我意識的AI。」',
                       '<32>* 「王后甚至下令，\n   禁止任何人開發新的AI程式。」',
                       '<32>* 「現在，還有能力與資源去搞AI的，\n   只剩一個怪物了。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (The books on this bookshelf discuss various technologies devised by monsters.)' ]
                  : [
                       '<32>{#p/basic}* 書架上標著「怪物科技」。',
                       '<32>{#p/human}* （你取下了一本書...）',
                       '<32>{#p/basic}* 「如今，很多人都已經忘了\n   太空中幾乎沒有重力。」',
                       '<32>* 「早在戰前，怪物在科技方面\n   就有許多突破性成果。」',
                       '<32>* 「其中之一，\n   就是先進的重力控制系統。」',
                       '<32>* 「如今，前哨站的每一個角落，\n   不論大小，都安裝了\n   使用這一技術的裝置。」',
                       '<32>* 「現在正在看書的你，\n   可能就站在其中一個裝置上面。」',
                       '<32>{#p/human}* （你把書放回了書架。）'
                    ]
         ),
         s_math_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't help but be confused at the contents of this sign.)" ]
               : [ '<32>{#p/basic}* 「警告：狗子的公道」' ],
         s_pacing_sign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* （看著牌子上的內容，\n  你不禁揚起嘴角。）" ]
               : [ '<32>{#p/basic}* 「留意有狗」\n* 「...請撫摸狗...」' ],
         s_phonecard: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The note requests that you call a certain phone number.)',
                    '<32>{#s/phone}{#p/event}* 撥號中...',
                    '<32>{#p/human}* (No connection.)'
                 ]
               : world.runaway
               ? [
                    "<32>{#p/basic}* 這是張便條。",
                    '<32>* 「給我打電話！」\n* 「這是我的電話號碼！」',
                    '<32>{#s/phone}{#p/event}* 撥號中...',
                    '<32>{#p/basic}* 電話直接轉接到了\n  語音信箱。',
                    '<32>{#p/basic}* \"Hello, lonely caller!\"\n* \"Would you like to escape the outpost with me?\"',
                    '<32>{#s/equip}{#p/event}* 滴...'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* 這是張便條。",
                    '<32>* 「給我打電話！」\n* 「這是我的電話號碼！」',
                    '<32>{#s/phone}{#p/event}* 撥號中...',
                    '<32>{#p/human}* (No connection.)'
                 ]
               : [
                    "<32>{#p/basic}* 這是張便條。",
                    '<32>* 「給我打電話！」\n* 「這是我的電話號碼！」',
                    '<32>{#s/phone}{#p/event}* 撥號中...',
                    '<32>{#p/basic}* 電話直接轉接到了\n  語音信箱。',
                    '<32>{#p/basic}* 「你好，孤獨的來電者！」\n* 「我很抱歉沒能在這裡迎接你~」',
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
         s_sr_treadmill: [ "<32>{#p/basic}* 這是一臺跑步機。", "<32>{#p/basic}* 這是它的最高設定了。" ],
         s_sr_lamp: [
            "<32>{#p/basic}* 這是一盞檯燈，\n  裡面掛著一張大字條。",
            '<23>{#p/papyrusnt}「抱歉，我把你在這裡用的\n手電筒拿回去了。」',
            '<23>{#p/papyrusnt}「不是說我介意你用\n我的東西...」',
            '<23>{#p/papyrusnt}「但你用這種不正常的\n方式用就完全沒有\n道理了！」',
            '<23>{#p/papyrusnt}「我不知道你是怎麼想的，\n但據我所知...」',
            '<23>{#p/papyrusnt}「手電筒算不上燈泡！！」'
         ],
         s_sc_book: [
            "<32>{#p/basic}* 這是皇家實驗室的舊日誌。",
            '<32>{#p/human}* （你翻到了打開的那頁...）',
            '<32>{#p/basic}* 「活動日誌，克歷615年7月」',
            '<32>* 「我們已經從樹林中\n   挑選到了理想的對象。」',
            '<32>* 「試驗物質的準備工作\n   將在未來幾天結束。」',
            '<32>* 「很快，實驗對象就會\n   進行注射。」',
            '<32>* 「這樣一來，我們就比以往任何時候\n    都更接近自由...」'
         ],
         s_sc_drawer: [
            "<32>{#p/basic}* 抽屜裡有一本相冊。",
            '<32>{#p/basic}* 相冊裡有衫斯和艾菲斯\n  在皇家實驗室的照片。',
            '<32>{#p/basic}* 有的照片中在做實驗，\n  有的在沉迷看科幻動畫...',
            '<32>{#p/basic}* 他們看起來很開心。'
         ],
         s_sc_diagram: () => [
            "<32>{#p/basic}* 桌子上有一份\n  力場削弱武器的藍圖。",
            '<32>{#p/basic}* 牆上還有其他\n  各種各樣的概念圖...',
            '<33>{#p/basic}* 一臺非線性時空訪問機，\n  一臺蟲洞孔徑穩定儀，\n  還有個被怪物靈魂綁定的人類靈魂。',
            ...(!SAVE.data.b.s_state_charasker
               ? ((SAVE.data.b.s_state_charasker = true),
                 [
                    '<32>{#p/basic}* ...這是可能的嗎？\n* 一個人類靈魂和一個\n  怪物靈魂共生？',
                    "<32>{#p/basic}* 但是怪物靈魂主人的身份\n  將會丟失...",
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
                       '<32>{#p/basic}* 一張精心製作的超級跑車床。',
                       ...(roomready()
                          ? [
                               "<18>{#p/papyrus}那是我的床！",
                               '<18>{#f/4}如果我有機會\n去探索星星的話...',
                               "<18>{#f/0}我想沿著一條\n漫長的星際公路\n航行。",
                               '<18>感受髮絲中的靜電，\n和皮膚上映出的\n星光...',
                               "<18>{#f/4}當然，這都只是\n一場夢罷了。",
                               '<18>{#f/0}所以我就\n邊打盹邊航行了。'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You thank the bed for being very awesome in general.)' ]
                  : [ '<32>{#p/basic}* 一張精心製作的超級跑車床。' ]
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
                       '<32>{#p/basic}* 一箱子的骨頭。',
                       ...(roomready()
                          ? [
                               '<18>{#p/papyrus}嘿，那些就是我\n用來攻擊你的東西。',
                               '<18>真是段美好的回憶，\n是吧？',
                               '<18>感覺仿佛\n就在昨日...',
                               SAVE.data.n.plot < 42.1
                                  ? '<18>{#f/4}實際上就是剛剛才\n發生的事。'
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
                  : [ '<32>{#p/basic}* 一箱子的骨頭。' ]
         ),
         s_pr_papcloset: pager.create(
            0,
            () => [
               '<32>{#p/human}* （你往衣櫥裡看...）',
               ...(SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (It's hard for you to see in such a dark place.)" ]
                  : !world.runaway
                  ? [ '<32>{#p/basic}* 裡面的衣服被瘋狂地\n  挪來挪去。' ]
                  : [
                       '<32>{#p/basic}* Clothes are hung up neatly inside.',
                       SAVE.data.n.plot === 72
                          ? '<32>* One of the clothes has \"Free Bones\" written on it.'
                          : '<32>* Many of the clothes have handwritten text drawn on them.'
                    ]),
               ...(roomready()
                  ? [
                       "<18>{#p/papyrus}別擔心，\n衣櫥裡沒有骷髏。",
                       "<18>{#f/4}當然，\n除非我在換衣服。"
                    ]
                  : [])
            ],
            () => [
               '<32>{#p/human}* （你往衣櫥裡看...）',
               ...(SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (It's hard for you to see in such a dark place.)" ]
                  : !world.runaway
                  ? [ '<32>{#p/basic}* 裡面的衣服被瘋狂地\n  挪來挪去。' ]
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
                          "<25>{#p/asriel1}{#f/17}* 啊。\n* 那是帕派瑞斯的特殊攻擊...",
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
                       "<32>{#p/basic}* 一面旗幟，\n  上面畫著一個嚇人的骷髏。",
                       ...(roomready()
                          ? [
                               "<18>{#p/papyrus}很漂亮的海報吧？",
                               '<18>安黛因在撿垃圾的\n時候發現的。',
                               '<18>{#f/4}一開始上面是\n一個頭骨和\n兩根交叉的骨頭...',
                               '<18>{#f/9}但我想到了\n更好的東西！'
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
                  : [ "<32>{#p/basic}* 一面旗幟，\n  上面畫著一個嚇人的骷髏。" ]
         ),
         s_pr_paptable: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (You marvel at the detail of these action figures...)' ]
                  : [
                       '<32>{#p/basic}* 一套穿著俗氣制服的動作玩偶。',
                       ...(roomready()
                          ? [
                               '<18>{#p/papyrus}啊，那個，\n動作玩偶。',
                               '<18>用來參考理論戰鬥\n布置場景\n很合適。',
                               '<18>{#f/4}但我為什麼\n會有這麼多呢？',
                               '<18>{#f/6}那個，嗯...\n國王把它們當做\n禮物送給了我...',
                               '<18>{#f/5}我真心希望\n我也能回報他\n一份禮物。'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ '<32>{#p/human}* (Upon reflection, you realize who created these.)' ]
                  : [ '<32>{#p/basic}* 一套穿著俗氣制服的動作玩偶。' ]
         ),
         s_puzzle1_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes the basics of solving the puzzle.)' ]
               : [ '<32>{#p/basic}* 「按順序激活每一條電路。」' ],
         s_puzzle2_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* （這個告示牌點出了解謎思路。）' ]
               : [ '<32>{#p/basic}* 「從左邊開始。」' ],
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
                    "<32>{#p/basic}* 一張衫斯的字條...",
                    '<32>{#p/without}* 「哎呀。」\n* 「看來我兄弟最終還是找到你了。」',
                    '<32>* 「我把你的所作所為全告訴了他，\n  現在，他願意老實在家待著了。」',
                    '<32>* 「真是太遺憾了，對不對？」',
                    '<32>* 「帕派瑞斯不該卷到這堆破事中。」',
                    '<32>* 「但也許，這就是命。」',
                    '<32>* 「對了，解謎愉快喔。」',
                    '<32>* 「我猜，你肯定\n   一眨眼工夫就能解開。」',
                    '<#32>- 「恕我冒昧了，」\n  衫斯'
                 ]
               : [
                    "<32>{#p/basic}* 這是張帕派瑞斯留的字條...",
                    '<23>{#p/papyrus}{#f/30}「人類！！這個謎題可跟\n看起來的不一樣。」',
                    '<23>「我在等你的時候，\n試著改造了一下...」',
                    '<23>「當然，是為了讓圖案\n看起來更像我的臉！」',
                    '<23>「不過好像哪裡出了岔子...」',
                    '<23>「所以我現在\n只能做成一個\n很爛的箭頭形狀了！！！」',
                    '<23>「（另外，這個謎題\n需要你自己完成。）」',
                    '<23>「但不用擔心！」\n「你肯定做得到的，人類！」',
                    '<#23>  - 「最相信你的，」\n  帕派瑞斯'
                 ],
         s_redbook: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The uniquely-colored book describes a secret weapon lost to time.)' ]
               : [
                    "<32>{#p/basic}* 一個書架。",
                    '<32>{#p/human}* （你取下了那本紅皮書...）',
                    '<32>{#p/basic}* 「人怪大戰進入到白熱化階段時，\n   皇家軍隊成立了一個秘密組織。」',
                    '<32>{#p/basic}* 「也就是所謂的『特種武器』研發部，\n   專門用來搞實驗研究。」',
                    '<32>{#p/basic}* 「他們造出了許多『戰鬥利器』，\n   但實戰效果都是微乎其微。」',
                    '<32>{#p/basic}* 「只有一個例外，\n   它就是被稱作『頓悟』的魔法捲軸。」',
                    '<32>{#p/basic}* 「這捲軸的力量超乎尋常，\n   即使用來對付人類也過於危險。」',
                    '<32>{#p/basic}* 「結果，捲軸被從內部鎖死，\n   並很快封存起來。」',
                    '<32>{#p/basic}* 「傳說，有人把它送上了\n   開往前哨站的運輸船。」',
                    '<32>{#p/basic}* 「如果傳說屬實，\n   那麼它現在位於何處？」\n* 「又該如何解開枷鎖？」',
                    '<32>{#p/basic}* 「但願，以上疑問永埋塵土之下，\n   湮沒無聞。」',
                    '<32>{#p/human}* （你把書放回了書架。）'
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
                    "<32>{#p/basic}* （信箱裡塞滿了未開封的垃圾郵件。）",
                    ...(SAVE.data.b.oops ? [] : [ '<32>{#p/basic}* ... he never reads the mail anyway.' ])
                 ],
         s_sheddoor: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ]
               : [ "<32>{#p/basic}* 門被反鎖了。" ],
         s_slew: [ "<32>{#p/basic}* 這是狗糧。\n* 碎片看起來像是骨頭。" ],
         s_spagnote: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The note declares the brilliance of enticing you with a place of spaghetti.)' ]
               : !world.genocide && world.edgy
               ? [
                    "<32>{#p/basic}* 一張衫斯的字條...",
                    '<32>{#p/without}* 「哎呀，」\n* 「你發現了我兄弟的義大利麵。」',
                    '<32>* 「是不是看起來很香，很好吃？」',
                    '<32>* 「嘿，」\n* 「那就對了。」',
                    '<32>* 「不過，不要因此掉以輕心喔...」',
                    '<32>* 「因為，你花越多時間在\n   嘗試拿走這玩意上...」',
                    '<32>* 「我就有更多時間\n   準備下一個謎題了。」',
                    '<#23>- 「開個玩笑而已，」\n  衫斯'
                 ]
               : [
                    "<32>{#p/basic}* 這是張帕派瑞斯留的字條...",
                    '<23>{#p/papyrus}{#f/30}「人類啊！！」\n「享用這盤意面吧。」',
                    '<23>（「但其實你不知道的是，\n這盤意面是個陷阱...」）',
                    '<23>（「單純是為了吸引你的！！！」）',
                    '<23>（「你會忙著去夠它...」）',
                    '<23>（「然後就不會意識到\n自己毫無進展！！」）',
                    '<23>（「再次徹底被\n偉大的帕派瑞斯戲弄！！！ 」）',
                    '<#23>  「捏嘿嘿，」\n  帕派瑞斯'
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
               : [ "<32>{#p/basic}* 在這堆水晶莢裡\n  藏著一個攝像頭。" ],
         s_trapnote: () =>
            [
               [
                  "<32>{#p/basic}* 這是張帕派瑞斯留的字條...",
                  '<23>{#p/papyrus}{#f/30}「抱歉，到安黛因來之前，\n我得把你鎖在客房裡。」',
                  '<23>「把這裡當自己家\n一樣吧！！！」',
                  '<22>「已提供茶點和住宿。」',
                  '<#23>  「非常捏嘿嘿的，」\n  帕派瑞斯'
               ],
               [
                  "<32>{#p/basic}* 這是張帕派瑞斯留的字條...",
                  '<23>{#p/papyrus}{#f/30}\"PLEASE ASK BEFORE YOU ESCAPE!!!\"',
                  '<23>\"WHEN YOU WENT MISSING I GOT WORRIED SICK!!!\"',
                  '<#23>  \"SLIGHTLY BONETROUSLED,\"\n  PAPYRUS'
               ],
               [
                  "<32>{#p/basic}* 這是張帕派瑞斯留的字條...",
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
                  ? [ "<32>{#p/basic}* 這個樹狀物沒什麼特別的。" ]
                  : SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}* Soon enough, this civilization will need to migrate once again.',
                       '<32>* Where shall they go?\n* Sooner or later, we will know.'
                    ]
                  : [
                       '<32>{#p/basic}* 這個人畜無害的樹狀結構，\n  其實是一個文明的家園。',
                       '<32>* 在瀕臨滅絕之時，\n  它們遷徙到這裡\n  來拯救自己的種族。'
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
                  : [ "<32>{#p/basic}* 專家建議...\n* 不要搖晃這人畜無害的樹狀結構。" ]
         ),
         doginfo: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The dog treats inside look to have been somewhat devoured.)' ]
               : SAVE.data.n.state_starton_doggo === 2 || SAVE.data.n.plot > 27
               ? SAVE.data.b.oops
                  ? [ '<32>{#p/basic}* 裡面有一袋半空的狗糧。' ]
                  : [ "<32>{#p/basic}* Inside is a pack of dog treats. It's half-full." ]
               : [
                    SAVE.data.n.state_starton_doggo === 3
                       ? '<32>{#p/basic}* Inside is a rather sleepy guard dog.\n* It cannot see you.'
                       : '<32>{#p/basic}* 狗窩裡是只很困惑的守衛狗。\n* 它看不見你。'
                 ]
      },
      truetext: {
         doggo1: [ '<32>{#p/basic}* Dog treats?\n* That dog needs a therapist.' ],
         doggo2: [ '<32>{#p/basic}* 拋接遊戲，是吧？', "<33>{#p/basic}* Now we're getting places..." ],
         dogs1: [ '<32>{#p/basic}* The things we do for the good of the canines.' ],
         dogs2: [ '<33>{#p/basic}* The rusty wrench strikes again.' ],
         fetch: () =>
            [
               [ '<32>{#p/basic}* 拋接遊戲，是吧？', "<33>{#p/basic}* Now we're getting places..." ],
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
         sans3: [ '<32>{#p/basic}* 你盡力了。' ],
         sans4: [ '<32>{#p/basic}* Have you done this before...?' ],
         sans5: [ '<32>{#p/basic}* Really, Sans?\n* That \"puzzle\" wasn\'t even worth looking at.' ],
         sans6: [ '<32>{#p/basic}* Really, Sans?\n* That \"puzzle\" was impossible.' ],
         sans7: [ '<32>{#p/basic}* Well, that was anti-climactic.' ],
         sans8: [ "<32>{#p/basic}* I'm just as confused as you." ],
         sans9: [ '<32>{#p/basic}* Oh, come on!\n* I wanted to see it in action!', '<32>* ... oh well...' ],
         papdate: () => [
            '<32>{#p/basic}* 所以... 帕派瑞斯，嗯？',
            SAVE.data.n.plot > 64.1
               ? '<32>* 過了這麼久，\n  你們終於成了朋友。'
               : '<32>* 我就知道你們倆\n  最終會成為朋友。',
            '<32>* ...\n* 我是看著那個骷髏在這裡\n  長大的...',
            '<32>* 他總是會給他周圍的人\n  樹立一個好榜樣...',
            '<32>* ...包括我也一樣。',
            "<32>* 真可惜，\n  我沒法親自告訴他這些。",
            "<32>* 但沒關係的。",
            '<32>* 看到你們倆相處得這麼好，\n  就足夠彌補遺憾了。'
         ]
      },
      vegetoid: pager.create(
         0,
         () => [
            SAVE.data.n.plot === 72
               ? '<32>{#p/basic}* I heard the taxi driver will be here when everyone else is off the outpost.'
               : world.population === 0
               ? '<32>{#p/basic}* 我聽說那個運輸船司機\n  會在別的怪物全都逃走後\n  回到這裡。'
               : "<32>{#p/basic}* 我聽說那個運輸船司機\n  不吃綠色蔬菜。",
            '<33>{#p/basic}* 它真的是個怪物嗎...？'
         ],
         () => [
            SAVE.data.n.plot === 72
               ? "<32>{#p/basic}* A real monster wouldn't hesitate to escape this dreadful place."
               : world.population === 0
               ? '<32>{#p/basic}* ...'
               : '<32>{#p/basic}* 真正的怪物\n  都吃綠色蔬菜的。'
         ]
      ),
      vegetoidx: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to find anyone down there.)" ]
            : world.bulrun
            ? [ '<32>{#p/basic}* ...但是大家都逃走了。' ]
            : [ '<32>{#p/basic}* ...但是誰也沒有來。' ],
      xtowerHiscoreNames: {
         kidd: '超愛安黛因10',
         napstablook: '納普斯特22',
         papyrus: '酷炫骷髏95',
         sans: '懶骨.',
         undyne: '壯魚91',
         you: '（遊客）'
      },
      xtowerMessage1: '新紀錄！',
      xtowerMessage2: '祝你下次好運...',
      xtowerMessage3: '感謝遊玩！',
      xtowerSans: () =>
         world.genocide
            ? [
                 '<32>{#p/event}* 鈴鈴，鈴鈴...',
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
                 '<32>{#p/event}* 鈴鈴，鈴鈴...',
                 '<25>{#p/sans}* 你在這花這麼大的努力\n  就只是為了超過\n  我的分數嗎？',
                 "<25>{#f/3}* 哇塞。\n* 那你可比我兄弟\n  固執多了。",
                 ...(SAVE.data.n.state_starton_papyrus === 1
                    ? [
                         '<25>{#f/3}* ...',
                         "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* 可惜他已經死了，\n  不是嗎？",
                         '{*}{#s.resume}{%}'
                      ]
                    : [
                         SAVE.data.n.plot === 72
                            ? "<25>{#f/0}* 我本想給你一份\n  特殊大禮，但不巧的是\n  我還在找托麗爾。"
                            : "<25>{#f/0}* 我本想給你一份\n  特殊大禮，但不巧的是\n  我還在休息。",
                         ...(world.edgy_x
                            ? [ '<25>{#f/0}* 不要見怪。', '<32>{#s/equip}{#p/event}* 滴...' ]
                            : [
                                 "<25>{#f/2}* 所以先給你一些零花錢\n  作為獎勵吧。",
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
      dogs: () => (world.goatbro ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ] : [ '<32>{#p/story}* 狗夫婦向你發起攻擊！' ]),
      spacetopJerry: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 俗氣的帽子再配上沒譜的夥計。' ]
            : [ '<32>{#p/story}* 太空帽閒逛過來了！\n* 傑瑞也來了。' ],
      stardrakeSpacetop: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 笨蛋青年兩人組。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake and Astro Serf pose like bad guys.' ]
            : [ '<32>{#p/story}* Stardrake and Astro Serf pose like bad guys.' ],
      stardrakeSpacetop2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一個了。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake remains steady.' ]
            : [ '<32>{#p/story}* Stardrake remains steady.' ],
      stardrakeSpacetop2b: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 只剩一個了。' ] : [ '<32>{#p/story}* Astro Serf remains steady.' ],
      stardrakeSpacetop2c: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 只剩一個了。' ] : [ '<32>{#p/story}* Just Astro now.' ],
      stardrakeSpacetop2d: () => (world.goatbro ? [ '<32>{#p/asriel2}* 傑瑞。' ] : [ '<32>{#p/story}* 傑瑞。' ]),
      stardrakeSpacetopJerry: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 笨蛋青年兩人組。\n* 再加一個，傑瑞。' ]
            : SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry and friends appear!' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* 太空帽和小酷龍嘆著氣\n  來和你對峙了。\n* 傑瑞。' ]
            : [ '<32>{#p/story}* 太空帽和星鐵龍嘆著氣\n  來和你對峙了。\n* 傑瑞。' ],
      stardrakeSpacetopJerry2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 還剩下兩個。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Astro Serf and Chilldrake remain steady.' ]
            : [ '<32>{#p/story}* Astro Serf and Stardrake remain steady.' ],
      stardrakeSpacetopJerry2b: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 還剩下兩個。' ] : [ '<32>{#p/story}* Astro Serf remains steady.\n* Jerry.' ],
      stardrakeSpacetopJerry2c: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 還剩下兩個。' ]
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
                    '<32>{#p/asriel2}* 小酷龍，中二叛逆。\n* 胡亂撒氣，荒唐至極。'
                 ]
               : [
                    '<32>{#p/asriel2}* 星鐵龍，逗逼。\n* 總喜歡給別人講笑話，\n  殊不知自己就是個最大的笑話。'
                 ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<33>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebels against everything!!\n* On the lookout for Starry.' ]
            : [ '<32>{#p/story}* 星鐵龍 - 攻擊12 防禦7\n* 這名喜劇演員拼盡力氣\n  想留住一位觀眾。' ],
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
         SAVE.data.b.s_state_chilldrake ? [ '<32>{#p/asriel2}* 小酷龍。' ] : [ '<32>{#p/asriel2}* 星鐵龍。' ],
      heckleStatus: () =>
         world.goatbro
            ? SAVE.data.b.s_state_chilldrake
               ? [ '<32>{#p/asriel2}* 小酷龍。' ]
               : [ '<32>{#p/asriel2}* 星鐵龍。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is puffed up...' ]
            : [ '<32>{#p/story}* 星鐵龍驕傲自滿...' ],
      heckleTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}No!!\nThis is the way!' ]
            : [ "<08>{#p/basic}{~}這個也\n不好笑！" ],
      heckleTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Filthy law- obider.' ]
            : [ '<08>{#p/basic}{~}Is your flesh rotten as you?' ],
      heckleTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ "<08>{#p/basic}{~}Defiance can't be defied!" ]
            : [ '<08>{#p/basic}{~}（對人類\n罵罵咧咧）' ],
      heckleText1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You denounce Chilldrake for its cause.)' ]
            : [ '<32>{#p/human}* （你對星鐵龍喝倒彩。）' ],
      heckleText2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You tell Chilldrake that they should be a rebel somewhere else.)' ]
            : [ "<32>{#p/human}* （你說星鐵龍\n  沒有一點幽默細胞。）" ],
      heckleText3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [
                 '<32>{#p/human}* (You mock Chilldrake for protesting out in the middle of nowhere.)',
                 '<32>{#p/basic}* Chilldrake takes your mockery as advice, and saunters off to town...'
              ]
            : [
                 '<32>{#p/human}* （你告訴星鐵龍，\n  再這樣下去，它就成萬人煩了。）',
                 '<32>{#p/basic}* 他百口莫辯，灰溜溜地逃走了...'
              ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 離死不遠了。' ]
            : SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* 小酷龍的身體正在粉碎。' ]
            : [ '<32>{#p/story}* 星鐵龍的身體正在粉碎。' ],
      idleTalk1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Brush my teeth?\nNo way in heck!' ]
            : [ '<08>{#p/basic}{~}儘量不要\n放「空」\n自我..' ],
      idleTalk2: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}No bedtime for this bird!' ]
            : [ '<08>{#p/basic}{~}I\'m just in my moon pun \"phase\"' ],
      idleTalk3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<08>{#p/basic}{~}Who needs parents anyway!?' ]
            : [ '<08>{#p/basic}{~}已經好\n幾「光年」\n沒回家了..' ],
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
            : [ '<32>{#p/story}* 星鐵龍對自己的\n  五「星」級笑話感到滿意。' ],
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
            : [ '<08>{#p/basic}{~}看到沒！？\n笑了！\n老媽是\n對的！' ],
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
            : [ "<32>{#p/human}* （你對星鐵龍的笑話\n  回以大笑。）" ],
      jokeText3: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/human}* (You double down on your agreement with Chilldrake.)' ]
            : [ "<32>{#p/human}* (You continue to laugh at Stardrake's puns.)" ],
      name: () => (SAVE.data.b.s_state_chilldrake ? '* 小酷龍' : '* 星鐵龍'),
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
            : [ '<32>{#p/story}* 星鐵龍被自己想出的\n  下一個雙關笑話逗笑了。' ],
      randStatus4: () => [ '<32>{#p/story}* Smells like wet pillows.' ],
      randStatus5: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Smells like body spray.' ]
            : [ '<32>{#p/story}* Stardrake sighs in relief, realizing its own name is in fact not a pun.' ],
      status1: () =>
         SAVE.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake saunters up!' ]
            : [ '<32>{#p/story}* 星鐵龍撲騰了過來！' ]
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
                 '<32>{#p/asriel2}* 傑瑞，公認的傻帽。\n* 他就是個不折不扣的廢物， 一文不值。'
              ]
            : [ '<32>{#p/story}* 傑瑞 - 攻擊0 防禦30\n* 大家都認識傑瑞。\n* 會延長攻擊時間。' ],
      act_flirt: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/human}* (You flirt with Jerry.)\n* (It appreciates the compliment.)' ]
            : 5 <= world.flirt
            ? [ '<32>{#p/human}* (You call on your experience, and deliver a life-changing flirt.)' ]
            : [
                 '<32>{#p/human}* (You flirt with Jerry.)',
                 '<32>{#p/basic}* Jerry seems to like you a little too much now.'
              ],
      act_ditch: () => [ '<32>{#p/human}* （你甩掉了傑瑞。）' ],
      act_kiss: () => [ '<32>{#p/human}* (You kiss Jerry.)' ],
      flirtStatus: [ "<32>{#p/story}* Jerry's redemption arc begins." ],
      flirtStatusWeird: [ '<32>{#p/story}* This is wrong on so many levels.' ],
      flirtTalk: [
         '<08>{#p/basic}{~}You... y-you...',
         "<08>{#p/basic}{~}Just for you, I'll...",
         "<08>{#p/basic}{~}I'll be the best person I can be!"
      ],
      flirtTalkWeird: [ '<08>{#p/basic}{~}\x00*licks lips*' ],
      genoStatus: [ '<32>{#p/asriel2}* 傑瑞。' ],
      hurtStatus: () => (world.goatbro ? [ '<32>{#p/asriel2}* 離死不遠了。' ] : [ '<32>{#p/story}* 傑瑞受了傷。' ]),
      idleTalk1: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}I'm so glad we're here!" ]
            : [ "<08>{#p/basic}{~}你們\n不覺得\n無聊嗎？" ],
      idleTalk2: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Can we do this more often??' ]
            : [ '<08>{#p/basic}{~}我們到底\n為什麼在\n幹這事？' ],
      idleTalk3: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Hey, you guys are the BEST!' ]
            : [ '<08>{#p/basic}{~}Wow, you guys SUCK at this.' ],
      idleTalk4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}Does anyone want a hug?' ]
            : [ '<08>{#p/basic}{~}噓噓噓！\n別吵，\n讓我思考！' ],
      idleTalkSolo1: () =>
         SAVE.data.b.spared_jerry ? [ '<08>{#p/basic}{~}Thanks for being here!' ] : [ '<08>{#p/basic}{~}尷尬了。' ],
      idleTalkSolo2: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}You're awesome!\nJust saying." ]
            : [ '<08>{#p/basic}{~}所以，\n你在做\n什麼？' ],
      idleTalkSolo3: () =>
         SAVE.data.b.spared_jerry
            ? [ "<08>{#p/basic}{~}Wouldn't trade ya for the galaxy." ]
            : [ '<08>{#p/basic}{~}這兒的訊號\n爛透了。' ],
      idleTalkSolo4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<08>{#p/basic}{~}I love humans!' ]
            : [ '<08>{#p/basic}{~}Must be nice being HUMAN..' ],
      name: '* 傑瑞',
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
            : [ '<32>{#p/story}* 傑瑞打了個哈欠。' ],
      randStatus4: () =>
         SAVE.data.b.spared_jerry
            ? [ '<32>{#p/story}* Smells like...... Jerry?' ]
            : [ '<32>{#p/story}* Smells like...... Jerry.' ],
      status1: [ '<32>{#p/story}* 傑瑞緊抓著你！' ],
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
            ? [ '<32>{#p/asriel2}* 紳鼠貓，流浪貓。\n* 早已活得渾渾噩噩。' ]
            : [ '<33>{#p/story}* 紳鼠貓 - 攻擊16 防禦8\n* 這隻以城為家的時髦的貓\n  只想過簡單的生活。' ],
      act_check2: [
         "<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This posh city cat regrets going where it doesn't belong."
      ],
      act_check3: [
         '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This reformed country mouse is quite pleased with itself.'
      ],
      act_check4: [
         '<33>{#p/story}* WHIZKARAT - ATK 16 DEF 8\n* This reformed country mouse has taken a liking to you.'
      ],
      act_direct: [ '<32>{#p/human}* （你告訴紳鼠貓一個\n  關於老鼠的事實。' ],
      act_direct2: [
         '<32>{#p/human}* （你把你知道的關於老鼠的全部知識\n  告訴了紳鼠貓。）',
         '<32>{#p/basic}* 突然間..！'
      ],
      act_direct3: [ "<32>{#p/human}* (You try to tell Whizkarat more, but it's already found its way.)" ],
      act_disown: [
         "<32>{#p/human}* （你拔下了紳鼠貓\n  臉上的一根鬍鬚。）",
         '<32>{#p/basic}* 紳鼠貓發出了刺耳的嘶嘶聲！'
      ],
      act_disown2: [
         "<32>{#p/human}* （你又拔下了紳鼠貓\n  臉上的一根鬍鬚。）",
         '<32>{#p/basic}* 紳鼠貓吃痛，匆匆跑開了！'
      ],
      act_disown3: [ '<32>{#p/human}* (You try to pluck a whisker, but Whizkarat pretends it has none.)' ],
      act_flirt: [ "<32>{#p/human}* (You make a cute remark and scratch Whizkarat's neck.)" ],
      disownStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 紳鼠貓。' ] : [ '<32>{#p/story}* 紳鼠貓逐漸變得不再冷靜。' ],
      disownTalk1: [ '<08>{#p/basic}{~}把你的\n爪子\n拿開..！' ],
      flirtTalk: [ '<08>{#p/basic}{~}No pussy- cats allowed.' ],
      flirtTalk2: [ '<08>{#p/basic}{~}\x00*purrs gently*' ],
      genoStatus: [ '<32>{#p/asriel2}* 紳鼠貓。' ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 離死不遠了。' ] : [ '<32>{#p/story}* 紳鼠貓快斷氣了。' ],
      idleTalk1: [ '<08>{#p/basic}{~}What food do they eat?' ],
      idleTalk2: [ '<08>{#p/basic}{~}Where do they hide?' ],
      idleTalk3: [ '<08>{#p/basic}{~}How do they speak?' ],
      idleTalk4: [ '<08>{#p/basic}{~}Do they dream?' ],
      initTalk1: [ '<08>{#p/basic}{~}Alas, here I stand.' ],
      initTalk2: [ '<08>{#p/basic}{~}Oh, how I lose myself..' ],
      initTalk3: [ '<08>{#p/basic}{~}事態\n並不\n理想。' ],
      initTalk4: [ '<08>{#p/basic}{~}Could you help me?' ],
      name: '* 紳鼠貓',
      randStatus1: [ '<32>{#p/story}* Whizkarat fantasizes about getting down on all fours.' ],
      randStatus2: [ '<32>{#p/story}* Whizkarat scans the area.' ],
      randStatus3: [ '<32>{#p/story}* 紳鼠貓正試圖裝成\n  自己很小的樣子。' ],
      randStatus4: [ '<32>{#p/story}* Smells like top-twenty-cheese.' ],
      remindStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 紳鼠貓。' ]
            : [ '<32>{#p/story}* 紳鼠貓只需要一點\n  小小的幫助。' ],
      remindTalk1: [ '<08>{#p/basic}{~}住在\n洞裡，\n是嗎..？' ],
      remindTalk2: [ '<08>{#p/basic}{~}會像\n玩具\n吱吱叫，\n是嗎..？' ],
      remindTalk3: [ '<08>{#p/basic}{~}從現在\n開始，\n我應該像\n老鼠一樣\n生活。' ],
      safeStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一擊。" ] : [ '<32>{#p/story}* Whizkarat has found its way.' ],
      safeTalk1: [ '<08>{#p/basic}{~}Wonder- ful...' ],
      safeTalk2: [ '<08>{#p/basic}{~}Simply splen- did...' ],
      status1: [ '<32>{#p/story}* 紳鼠貓來了！' ]
   },
   b_opponent_doggo: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 遁狗，一條不順眼的狗。\n* 這個蠢貨怎麼又上崗了？' ]
            : [ '<32>{#p/story}* 遁狗 - 攻擊13 防禦7\n* 一點風吹草動便能讓它興奮。\n* 喜好之一：擁抱。' ],
      act_check2: [ '<32>{#p/story}* 遁狗 - 攻擊13 防禦7\n* 甚至難以看見它自己...' ],
      act_check3: [ '<32>{#p/story}* 遁狗 - 攻擊13 防禦7\n* 一隻非常興奮的狗，\n  正在享受其所好。' ],
      act_check4: [ '<32>{#p/story}* 遁狗 - 攻擊13 防禦7\n* 在你眼裡，這隻狗在生活中\n  非常地孤獨。' ],
      act_flirt: () => [ '<32>{#p/human}* （你向遁狗調情。）' ],
      act_cuddle: () => [ '<32>{#p/human}* （你緊緊地抱住遁狗。）' ],
      fetch: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗跑出去撿了回來。）\n* （你們就這樣玩了一會巡迴遊戲。）'
      ],
      fetchTalk: pager.create(
         0,
         [ '<11>{#p/basic}{~}哈！！\n有趣的扳手\n出現了！' ],
         [ '<11>{#p/basic}{~}哈！！\n又出現了！' ]
      ),
      fetchTalkX1: [ "<11>{#p/basic}{~}它去哪\n了！？" ],
      fetchTalkX2: [ "<11>{#p/basic}{~}我的扳手\n在哪裡！？" ],
      flirt1: [ '<11>{#p/basic}{~}（情不自禁\n地臉紅）' ],
      invisStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一擊。" ] : [ '<32>{#p/story}* 遁狗找不到你了。' ],
      name: '* 遁狗',
      fetchStatus: [ '<32>{#p/story}* 遁狗喜歡巡迴遊戲！' ],
      fetchpet: [ '<32>{#p/human}* （但是遁狗忙於尋找扳手，\n  沒時間讓你摸。）' ],
      fetchflirt: [ '<32>{#p/human}* （但是遁狗忙於尋找扳手，\n  沒時間聽你說話。）' ],
      fetchcuddle: [ '<32>{#p/human}* （但是遁狗忙於尋找扳手，\n  沒時間讓你抱。）' ],
      normaStatus: () => (world.goatbro ? [ '<32>{#p/asriel2}* 遁狗。' ] : [ "<32>{#p/story}* 遁狗知道你在這裡。" ]),
      pet: () => [
         '<32>{#p/human}* （你摸了摸遁狗。）',
         ...(world.goatbro
            ? [
                 [],
                 [ '<32>{#p/asriel2}* ...又摸？' ],
                 [ "<32>{#p/asriel2}* 摸狗有那麼有趣嗎..." ],
                 [ '<32>{#p/asriel2}* ...有趣嗎？' ],
                 [ '<32>{#p/asriel2}* 蠢死了。' ],
                 [ '<32>{#p/asriel2}* 你非得要這麼摸嗎？' ],
                 [ '<32>{#p/asriel2}* ...非得摸嗎？' ],
                 [ '<32>{#p/asriel2}* 我看真是。' ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* 事態快要失控了...' ],
                 [ '<32>{#p/asriel2}* 還摸？\n* 沒完了是吧...' ],
                 [ '<32>{#p/asriel2}* 哇喔。\n* 後面忘了。' ],
                 [ '<32>{#p/asriel2}* 你玩得可真是不亦樂乎啊。' ],
                 [ '<32>{#p/asriel2}* ...' ]
              ][Math.min(battler.volatile[0].vars.pet - 1, 13)]
            : [])
      ],
      cuddle: pager.create(
         0,
         [ '<11>{#p/basic}{~}抱抱！？\n行吧，至少\n我知道它在\n哪裡了！' ],
         [ '<11>{#p/basic}{~}又抱！？' ]
      ),
      petStatus: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一擊。" ] : [ '<32>{#p/story}* 遁狗已經被摸過了。' ],
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
      query1: [ '<11>{#p/basic}{~}別想逃！' ],
      query2: [ "<11>{*}{#p/basic}{~}哈！\n它動了！\n它肯定動了！{^30}{%}" ],
      query3: [ '<11>{#p/basic}{~}我倒要看看\n這次它還動嗎？' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* 遁狗。' ] : [ '<32>{#p/story}* 遁狗擋住了去路！' ]),
      sussy: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 遁狗。' ] : [ '<32>{#p/basic}* 遁狗對你的行動\n  十分戒備。' ]
   },
   b_opponent_lesserdog: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 小犬座，一條蠢狗。\n* 估計他都不知道自己為啥在這。" ]
            : [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Wields a shiny dogger made of fido-nium.' ],
      act_check2: [
         '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Scarred for life, this puppy wants to turn tail and run.'
      ],
      act_check3: [
         "<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* It's necks-in-line for the galaxy's tallest monster."
      ],
      act_check4: [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Trying its best to decipher your advanced petting.' ],
      act_check5: [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* The journey for this puppy has only just begun.' ],
      act_flirt: [ '<32>{#p/human}* （你用摩斯密碼的方式\n  拍撫著小犬座，\n  以此傳達你對它的愛意。）' ],
      act_handshake: [
         "<32>{#p/human}* （你把手放在小犬座的頭上\n  晃啊晃，撫摸著它的毛。）"
      ],
      act_inquire: [
         "<32>{#p/human}* （你撫摸著小犬座，\n  並問它好狗狗是誰。\n  它興奮地汪汪叫以示回答。）"
      ],
      act_tickle: [
         "<32>{#p/human}* （你抓撓著小犬座的側邊\n  來愛撫它。）\n* （它興奮得近於狂亂。）"
      ],
      fetch: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗伸長脖子把扳手撿了回來。）',
         '<32>{#p/human}* （你們就這樣\n  玩了一會巡迴遊戲。）',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 但是為什麼呢？' ] : [])
      ],
      fetchStatus: [ '<32>{#p/story}* 小犬座喜歡巡迴遊戲！' ],
      fetchTalk: [ '<11>{#p/basic}{~}（劇烈\n喘喘）' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 離死不遠了。' ]
            : [ '<32>{#p/story}* 小犬座將它的尾巴\n  夾到兩條腿之間。' ],
      name: '* 小犬座',
      petTalk1: [ '<11>{#p/basic}{~}（喘氣 \n喘氣）' ],
      petTalk2: [ '<11>{#p/basic}{~}（輕微的\n犬叫聲）' ],
      petTalk3: [ '<11>{#p/basic}{~}（尾巴\n搖搖）' ],
      petTalk4: [ '<11>{#p/basic}{~}（想著吃的）' ],
      petTalk5: [ '<11>{#p/basic}{~}（喘氣！\n喘氣！）' ],
      petTalk6: [ '<11>{#p/basic}{~}（興奮\n叫喊）' ],
      petTalk7: [ '<11>{#p/basic}{~}（摩託\n發動）' ],
      petTalk8: [ '<11>{#p/basic}{~}（飛機\n起飛）' ],
      petTalk9: [ '<11>{#p/basic}{~}（水壺\n鳴笛）' ],
      petTalk10: [ '<11>{#p/basic}{~}（...）' ],
      petTalk11: [ '<11>{#p/basic}{~}（來自\n星空的\n汪汪）' ],
      petTalk12: [ '<11>{#p/basic}{~}（汪汪）' ],
      petText1: () => [ '<32>{#p/human}* （你只是稍微抬了下手。）', '<32>{#p/basic}* 好興奮喔！' ],
      petText2: () => [
         '<32>{#p/human}* （你輕輕地摸了一下狗子。）',
         "<32>{#p/basic}* 它已經興奮過頭了...",
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 狗子們還真喜歡被摸啊。' ] : [])
      ],
      petText3: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         "<32>{#p/basic}* 它仰起頭，迎向你的手心。",
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 夠了，你都摸過它了。\n* 真沒必要繼續摸了。" ] : [])
      ],
      petText4: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 真是只好狗狗。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 繼續摸它有必要嗎？' ] : [])
      ],
      petText5: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 它的興奮永無止境...',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 沒必要繼續摸了。' ] : [])
      ],
      petText6: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 會心一摸！\n* 狗子的興奮度增加了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 天吶，$(name)。' ] : [])
      ],
      petText7: () => [
         '<32>{#p/human}* （你得跳起來才摸得到狗子了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 我們不能以摸狗為生。" ] : [])
      ],
      petText8: () => [
         '<32>{#p/human}* （你想摸摸小犬座，\n  結果，連夠都夠不到。）',
         '<32>{#p/basic}* 不過它還是更加興奮了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 我們真要摸一整天狗嗎...？' ] : [])
      ],
      petText9: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 根本沒法停下這場鬧劇。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText10: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 不積跬步，無以至千裡。\n  不積小摸，無以得巨狗。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 為啥要在這浪費時間？' ] : [])
      ],
      petText11: () => [
         '<32>{#p/human}* （你呼喚著小犬座，\n  然而它已經聽不到你說話了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 這下好了。\n* 再也別想夠著它了。" ] : [])
      ],
      petText12: () => [ '<32>{#p/basic}* ...', ...(world.goatbro ? [ '<32>{#p/asriel2}* ？？？' ] : []) ],
      petText13: () => [
         '<32>{#p/human}* （你又夠得著小犬座了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 你跟我開玩笑呢是吧？" ] : [])
      ],
      petText14: () => [ '<32>{#p/human}* （你摸了摸小犬座。）' ],
      petText15: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         "<32>{#p/basic}* 你可能有什麼毛病。"
      ],
      petText16: () => [
         '<32>{#p/human}* （你沒摸著小犬座，\n  但它很看好你的努力。）',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 給我停下。' ] : [])
      ],
      petText17: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 節制擼狗，人人有責。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 請你停下。' ] : [])
      ],
      petText18: () => [
         '<32>{#p/human}* （你摸了摸小犬座。）',
         '<32>{#p/basic}* 鬧劇還在繼續。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText19: () => [
         '<32>{#p/human}* （你夠不著小犬座了。）',
         ...(world.goatbro ? [ "<32>{#p/asriel2}* 好了，該結束了。\n* 趕緊殺了這個蠢貨。" ] : [])
      ],
      petText20: () => [
         '<32>{#p/human}* （開玩笑吧。）',
         '<32>{#p/basic}* ...開玩笑吧。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 開玩笑吧...' ] : [])
      ],
      statusX: [ "<32>{#p/asriel2}* 不堪一擊。" ],
      status0: () => (world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 小犬座出現了。' ]),
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ '<32>{#p/story}* 小犬座將自己的頭\n  歪向一側。' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ '<32>{#p/story}* 小犬座覺得你的武器\n  是狗餅乾。' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ '<32>{#p/story}* 小犬座有點心不在焉。' ],
      status4: () => (world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 有一股狗糧的氣味。' ]),
      status5: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 小犬座在興奮地汪汪叫。' ],
      status6: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 小犬座被過度刺激了。' ],
      status7: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ '<32>{#p/story}* 小犬座看樣子\n根本停不下來。' ],
      status8: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 小犬座正在下降。' ],
      status9: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 小犬座正在嘗試著編碼。' ],
      status10: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ "<32>{#p/story}* 小犬座由於看不見你\n而發出嗚嗚的哀鳴。" ],
      status11: () => (world.goatbro ? [ '<32>{#p/asriel2}* 小犬座。' ] : [ '<32>{#p/story}* 你好啊。' ]),
      status12: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ '<32>{#p/story}* 小犬座對於你的生活選擇\n表示質疑。' ],
      status13: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小犬座。' ]
            : [ '<32>{#p/story}* 小犬座去了沒有任何狗狗\n  到過的地方。' ]
   },
   b_opponent_dogamy: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米，一條廢狗。\n* 純靠他的瘋狗老婆過活。' ]
            : [ '<32>{#p/story}* 狗來米 - 攻擊14 防禦5\n* 狗媳兒的老公。\n* 只認識他聞到的東西。' ],
      act_check2: [ '<32>{#p/story}* 狗來米 - 攻擊14 防禦5\n* 新近喪偶。\n* 只認識失去老婆的痛苦。' ],
      act_check3: [ '<32>{#p/story}* 狗來米 - 攻擊14 防禦5\n* 狗媳兒的老公。\n* 認識的東西比先前更多了。' ],
      act_check4: [ "<32>{#p/story}* 狗來米 - 攻擊14 防禦5\n* 狗媳兒的老公。\n* 也想把這份愛分享給老婆...？" ],
      act_check5: [ "<32>{#p/story}* 狗來米 - 攻擊14 防禦5\n* 狗媳兒的老公。\n* 並不介意離開...？" ],
      fetchText: [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗們跑出去撿了回來。）\n* （你們就這樣玩了一會巡迴遊戲。）'
      ],
      fetchTextLone: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （但狗來米沒有理它，\n  任由其滾落到了邊緣。）',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? [ '<32>{#p/asriel2}* 預料到了。' ] : [])
      ],
      flirtTalk1: [ '<11>{#p/basic}{~}啊！\n但是為啥\n...！？' ],
      flirtTalk2: [ '<11>{#p/basic}{~}愛無處不在？' ],
      flirtTalk3: [ "<11>{#p/basic}{~}你剛才..." ],
      flirtTalk4: [ "<11>{#p/basic}{~}這隻小狗在\n幹什麼？" ],
      flirtText: [
         '<32>{#p/human}* （你向狗來米調情。）',
         "<32>{#p/basic}* 你的... 資訊素，\n  傳到了狗來米的鼻子上。"
      ],
      flirtTextLone: [ '<32>{#p/human}* （你向狗來米調情。）', "<32>{#p/basic}* 狗來米的表情沒有發生變化。" ],
      loneStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一個了。' ]
            : [ '<32>{#p/story}* 狗媳兒一心想要踢\n  人類的尾巴。' ],
      loneTalk1: [ '<11>{#p/basic}{~}汪嗚！' ],
      loneTalk2: [ '<11>{#p/basic}{~}嗚——' ],
      loneTalk3: [ '<11>{#p/basic}{~}嗷嗚...' ],
      name: '* 狗來米',
      fetchStatus: [ '<32>{#p/story}* 已婚的狗喜歡巡迴遊戲！' ],
      fetchStatusX: [ "<32>{#p/story}* 狗狗們的思緒正指數增長！" ],
      otherPet: [ '<11>{#p/basic}{~}...' ],
      petNeedStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗媳兒正在尋求關愛。' ],
      petStatus: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 不堪一擊。" ]
            : [ "<32>{#p/story}* 狗狗們的思緒增加了！" ],
      petTalk1: [ '<11>{#p/basic}{~}手拿開，\n你這個\n該死的\n人類。' ],
      petTalk1x: [ '<11>{#p/basic}{~}手拿開，\n你這隻\n奇怪的\n小狗。' ],
      petTalk2: [ '<11>{#p/basic}{~}哇！！！\n來自另一隻\n小狗的撫摸\n！！！' ],
      petTalk3: [ "<11>{#p/basic}{~}停下！\n別碰她！" ],
      petTalk4: [ '<11>{#p/basic}{~}那我呢\n......' ],
      petTalk5: [ '<11>{#p/basic}{~}謝謝你...' ],
      petText: [ '<32>{#p/human}* （你撫摸了狗來米。）' ],
      petTextLone: [ '<32>{#p/human}* （你嘗試撫摸狗來米，\n  但他畏懼地縮起自己的頭。）' ],
      randTalk1: () =>
         world.goatbro
            ? [ '<11>{#p/basic}{~}王子已經\n失去了\n理智...' ]
            : [ "<11>{#p/basic}{~}帶走\n我老婆...\n身上的\n跳蚤。" ],
      randTalk2: () =>
         world.goatbro ? [ '<11>{#p/basic}{~}You have come far...' ] : [ "<11>{#p/basic}{~}別碰我的\n熱狗。" ],
      randTalk3: () =>
         world.goatbro
            ? [ "<11>{#p/basic}{~}我們會\n打倒你！" ]
            : [ '<11>{#p/basic}{~}克歷614年\n賣萌大賽\n冠軍！！' ],
      randTalk4: () =>
         world.goatbro ? [ "<11>{#p/basic}{~}這次\n你不會贏的..." ] : [ "<11>{#p/basic}{~}咱們一起\n踩爛人類的\n尾巴！！" ],
      resmellStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗狗們認為\n  你是一條走丟的小狗。' ],
      resmellText1: [
         '<32>{#p/human}* （你讓狗狗們再聞聞你。）',
         '<32>* （你聞起來仍然很古怪。）'
      ],
      resmellText2: [
         '<32>{#p/human}* （你讓狗狗們再聞聞你。）',
         '<32>* （在泥裡打了幾個滾後，\n  你的氣味正常了。）'
      ],
      resmellText3: [
         '<32>{#p/human}* （你讓狗狗們再聞聞你，\n  但他們已經知道你的氣味正常了。）'
      ],
      resmellTextFetch: [
         '<32>{#p/human}* （你讓狗狗們聞聞你，\n  但他們正忙著做別的事。）'
      ],
      resmellTextLone: [ "<32>{#p/human}* （你讓狗來米聞聞你，\n  但他連鼻子都沒抬一下。）" ],
      rollStatus: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 你會把衣服弄髒的，\n  $(name)。" ]
            : [ '<32>{#p/story}* 狗狗們也許想重新聞聞你。' ],
      rollText: () => [
         '<32>{#p/human}* （你在泥裡打了幾個滾。）\n* （這泥好像是合成的。）',
         '<32>{#p/basic}* 你的氣味有變化了...',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* 你在做什麼。' ] : [])
      ],
      rollText2: [
         '<32>{#p/human}* （你在泥裡打了幾個滾。）\n* （這泥好像是合成的。）',
         '<33>{#p/basic}* 你的氣味已經變了。'
      ],
      rollTextLone: () => [
         "<32>{#p/human}* （你在狗媳兒的塵埃裡打了幾個滾。）",
         '<32>{#p/basic}* 狗來米更頹喪了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ "<11>{#p/basic}{~}嗯？\n那是\n什麼氣味？" ],
      smellTalk2: [ '<11>{#p/basic}{~}什麼！\n聞上去\n像是...' ],
      smellTalk3: [ '<11>{#p/basic}{~}啊！\n多麼可愛的\n氣味...' ],
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗狗們不停地揮舞著各自的斧頭\n  以保護彼此。' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗狗們正在重新評估\n  你的氣味。' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗狗們正為下一場情侶大賽\n  做練習。' ],
      status4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗狗們正互相低聲說著甜言蜜語。' ],
      susText: [ "<32>{#p/basic}* 狗狗們仍然認為你是個\n  臭烘烘的人類。" ],
      fetchTalk: [ '<11>{#p/basic}{~}巡迴遊戲\n真是\n太有趣啦！' ],
      fetchTalkX: [ '<11>{#p/basic}{~}和另外一隻\n小狗狗一起\n玩巡迴\n遊戲！？' ]
   },
   b_opponent_dogaressa: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 狗媳兒，一條瘋狗。\n* 沒了她老公，分分鐘發瘋。" ]
            : [ '<32>{#p/story}* 狗媳兒 - 14攻擊 5防禦\n* 這隻小狗認為她丈夫很可愛。\n  僅限於氣味的那種？' ],
      act_check2: [ '<32>{#p/story}* 狗媳兒 - 14攻擊 5防禦\n* 這隻小狗非常想念她的老公\n  僅限於被殺掉後的那種？' ],
      act_check3: [ '<32>{#p/story}* 狗媳兒 - 14攻擊 5防禦\n* 對這隻小狗來說\n  事態進展得很順利。' ],
      act_check4: [
         "<32>{#p/story}* 狗媳兒 - 14攻擊 5防禦\n* 這隻小狗發覺可愛的東西\n  不只有她老公。"
      ],
      act_check5: [ "<32>{#p/story}* 狗來米 - 攻擊14 防禦5\n* 這隻小狗在為她老公的安危擔憂。" ],
      fetchTextLone: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗媳兒將其撿了起來，然後摔了個粉碎。）',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? [ '<32>{#p/asriel2}* 預料到了。' ] : [])
      ],
      flirtTalk1: [ '<11>{#p/basic}{~}（嘿！\n別鬧了！）' ],
      flirtTalk2: [ '<11>{#p/basic}{~}（變得\n越來越\n奇怪了。）' ],
      flirtTalk3: [ '<11>{#p/basic}{~}（...\n跟我調情！\n啊！）' ],
      flirtTalk4: [ '<11>{#p/basic}{~}（我覺得\n它愛我，\n非常愛\n的那種。）' ],
      flirtText: [
         '<32>{#p/human}* （你向狗媳兒調情。）',
         "<32>{#p/basic}* 你的... 資訊素，\n  傳到了狗媳兒的鼻子上。"
      ],
      flirtTextLone: [
         '<32>{#p/human}* （你向狗媳兒調情。）',
         "<32>{#p/basic}* 狗媳兒的表情沒有發生變化。"
      ],
      loneStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 只剩一個了。' ] : [ '<32>{#p/story}* 狗來米心碎了。' ],
      loneTalk1: [ '<11>{#p/basic}{~}（會讓你\n好受的。）' ],
      loneTalk2: [ "<11>{#p/basic}{~}（你會為此\n受苦的。）" ],
      name: '* 狗媳兒',
      otherPet: [ '<11>{#p/basic}{~}（...）' ],
      petNeedStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 狗來米和狗媳兒。' ]
            : [ '<32>{#p/story}* 狗來米正在尋求關愛。' ],
      petTalk1: [ "<11>{#p/basic}{~}（他可不是\n你的老公，\n知道嗎？）" ],
      petTalk2: [ "<11>{#p/basic}{~}（嘿！\n別忽視\n我啊！）" ],
      petTalk3: [ '<11>{#p/basic}{~}（當心\n狗狗。）' ],
      petTalk4: [ '<11>{#p/basic}{~}（狗狗\n撫摸狗狗... \n好神奇！）' ],
      petTalk5: [ "<11>{#p/basic}{~}（你是\n最棒的！）" ],
      petText: [ '<32>{#p/human}* （你撫摸了狗媳兒。）' ],
      petTextLone: [ '<32>{#p/human}* （你試圖撫摸狗媳兒，\n  但她只是對你低吼。）' ],
      randTalk1: () => (world.goatbro ? [ '<11>{#p/basic}{~}（確實。）' ] : [ "<12>{#p/basic}{~}（別真的\n那麼做...）" ]),
      randTalk2: () => (world.goatbro ? [ '<11>{#p/basic}{~}（夠\n遠了。）' ] : [ '<11>{#p/basic}{~}（他指的\n是我。）' ]),
      randTalk3: () =>
         world.goatbro
            ? [ '<11>{#p/basic}{~}（必要時\n使用武力。）' ]
            : [ '<11>{#p/basic}{~}（我們當然\n是冠軍。）' ],
      randTalk4: () =>
         world.goatbro ? [ "<11>{#p/basic}{~}（時間到。）" ] : [ '<11>{#p/basic}{~}（人類\n有尾巴\n嗎？）' ],
      resmellTalkLone: [ '<11>{#p/basic}{~}（這就是\n你想要的\n嗎？？）\n（嗯？）' ],
      resmellTextLone: [
         '<33>{#p/human}* （你激勵狗媳兒來聞聞你，\n  她用鼻子使勁在你臉上\n  蹭來蹭去。）'
      ],
      rollTextLone: () => [
         "<32>{#p/human}* （你在狗來米的塵埃裡打了幾個滾。）",
         '<32>{#p/basic}* 狗媳兒更瘋狂了。',
         ...(world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ '<11>{#p/basic}{~}（聞起來\n很迷...）' ],
      smellTalk2: [ '<11>{#p/basic}{~}（你真的\n是只\n小狗嗎！？）' ],
      smellTalk3: [ '<11>{#p/basic}{~}（奇怪小狗\n的氣味！）' ],
      fetchTalk: [ '<11>{#p/basic}{~}（我們喜歡玩\n巡迴遊戲。）' ],
      fetchTalkX: [ '<11>{#p/basic}{~}（這隻狗狗\n什麼事\n都能做！）' ]
   },
   b_opponent_greatdog: {
      act_check: () =>
         world.goatbro
            ? [ '<33>{#p/asriel2}* 大犬座，一條傻狗。\n* 這群狗裡面，\n  屬它頭腦簡單，四肢發達。' ]
            : [ "<32>{#p/story}* 大犬座 - 15攻擊 8防禦\n* 太過興奮，以至於將\n  戰鬥當作兒戲。" ],
      act_check2: [ '<32>{#p/story}* 大犬座 - 15攻擊 8防禦\n* 渴望著關愛與照顧...' ],
      act_check3: [ '<32>{#p/story}* 大犬座 - 15攻擊 8防禦\n* 已經累到虛脫了。' ],
      act_flirt: [
         '<32>{#p/human}* （你向大犬座調情。）',
         '<32>{#p/basic}* 大犬座尷尬地歪著頭。'
      ],
      beckonText: [
         '<32>{#p/human}* （你叫了叫大犬座。）',
         '<32>{#p/basic}* 它躍向你，甩了你滿臉口水。'
      ],
      closeStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 大犬座。' ] : [ '<32>{#p/story}* 大犬座渴望著關愛。' ],
      closeText: [ "<32>{#p/human}* （你叫了叫大犬座。）\n* （但狗狗只是豎了豎耳朵。）" ],
      doneText: [ '<32>{#p/basic}* 大犬座覺得你太無趣了。' ],
      fetch: () =>
         world.goatbro
            ? [
                 '<32>{#p/human}* （你把扳手扔了出去。）\n* （大犬座把它吸收進自己的身體，\n  然後若無其事地繼續玩耍。）',
                 '<32>{#p/asriel2}* 呃... 這河裡嗎。'
              ]
            : [
                 '<32>{#p/human}* （你把扳手扔了出去。）\n* （狗狗跑出去撿了回來。）\n* （你們就這樣玩了一會巡迴遊戲。）'
              ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 離死不遠了。' ] : [ '<32>{#p/story}* 大犬座正緩緩地喘著氣。' ],
      ignoreStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大犬座。' ]
            : [ '<32>{#p/story}* 大犬座只是想要一些關愛。' ],
      ignoreStatus2: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 大犬座。' ] : [ '<32>{#p/story}* 大犬座正在賣萌。' ],
      name: '* 大犬座',
      fetchStatus: [ '<32>{#p/story}* 大犬座喜歡巡迴遊戲！' ],
      petStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大犬座。' ]
            : [ '<32>{#p/story}* 大犬座正用前爪拍打著地面。' ],
      petStatus2: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 大犬座。' ] : [ '<32>{#p/story}* 大犬座想要溫柔的關愛。' ],
      petStatus3: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* ...' ] : [ '<32>{#p/story}* 撫摸能量，百分之四十！' ],
      petStatus4: () =>
         world.goatbro ? [ "<32>{#p/asriel2}* 不堪一擊。" ] : [ '<32>{#p/story}* 大犬座非常滿足。' ],
      petText0: [ '<32>{#p/human}* （但是大犬座離你太遠了，\n  你摸不著它。）' ],
      petText1: [
         '<32>{#p/human}* （大犬座享受著你的撫摸，\n  它把整個身子都蜷縮在你的腿上。）',
         '<32>* （它太舒服了，呼呼睡著了。）',
         '<32>* （狗子打呼著，打呼著...）',
         '<32>* （...然後它醒了。）',
         "<32>{#p/basic}* 大犬座的興奮度\n  毫無徵兆地增加了！"
      ],
      petText2: [
         '<32>{#p/human}* （你想摸摸狗子...）',
         '<32>* （...然而它的興奮能量\n  形成了一個反撫摸能量場。）'
      ],
      petText3: [
         '<32>{#p/human}* （你摸了摸狗狗。）\n* （他將自身全部重量都壓到了\n  你身上。）',
         "<32>* （你的移動速度變慢了，但仍沒有\n  給予狗狗足夠的撫摸。）"
      ],
      petText4: [
         '<32>{#p/human}* （你果斷地摸了摸狗狗。）\n* （撫摸能量現在到達了百分之百！）',
         '<32>{#p/basic}* 大犬座四肢朝天躺在地上。'
      ],
      petText5: [
         '<32>{#p/human}* （你揉了揉狗狗的肚皮。）',
         '<32>{#p/basic}* 大犬座幸福地嗚叫著。'
      ],
      playText1: [ '<32>{#p/human}* （但大犬座不夠興奮，\n  不能和你一起玩。）' ],
      playText2: [
         '<32>{#p/human}* （你變幻出了全息影像，想\n  讓狗狗去追趕它。）',
         '<32>* （最終，全息影像無法聚合，\n  自動消散了。）',
         '<32>* （大犬座收集了這個區域\n  殘存的所有能量，並將其\n  帶還給你。）',
         '<32>{#p/basic}* 疲憊的大犬座把頭\n  靠在了你身邊...'
      ],
      playText3: [ '<32>{#p/basic}* 大犬座精疲力盡，\n  不想再玩了。' ],
      playText4: [ '<32>{#p/human}* （但是大犬座已經開始在玩\n  巡迴遊戲了。）' ],
      status0: () => (world.goatbro ? [ '<32>{#p/asriel2}* 大犬座。' ] : [ '<32>{#p/story}* 大犬座出現了。' ]),
      status1: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* 大犬座。' ] : [ '<32>{#p/story}* 大犬座正緊緊地注視著你。' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大犬座。' ]
            : [ '<32>{#p/story}* 大犬座正等待你的指令。' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大犬座。' ]
            : [ '<32>{#p/story}* 有股鮮榨小狗汁的味道。' ],
      waitText: [ '<32>{#p/basic}* 大犬座逐漸向你靠近。' ]
   },
   b_opponent_papyrus: {
      act_flirt: [ '<32>{#p/human}* （你向帕派瑞斯調情。）' ],
      act_insult: [ '<32>{#p/human}* （你罵了帕派瑞斯一頓。）' ],
      spanner: [ '<32>{#p/human}* (You throw the spanner.)\n* (Papyrus catches it in his mouth and returns it to you.)' ],
      spannerTalk1: [ '<15>{#p/papyrus}{#f/20}WHAT A JAW- DROPPING MOVE!' ],
      spannerTalk2: [ '<15>{#p/papyrus}{#f/20}I COULD DO THIS ALL DAY!' ],
      spannerTalk3: [ '<15>{#p/papyrus}{#f/20}JUST LIKE THEY DO IT ON TV!' ],
      spannerTalk4: [ '<15>{#p/papyrus}{#f/20}捏嘿嘿！' ],
      sparableSpannerTalk1: [ '<15>{#p/papyrus}{#f/20}NOW, SHOW ME YOUR MERCY!' ],
      sparableSpannerTalk2: [ '<15>{#p/papyrus}{#f/20}...' ],
      bullySpareTalk: [
         '<15>{#p/papyrus}{#f/27}怎麼...\n天暗下來了？',
         "<15>{#f/27}看來抓你\n不是啥好主意...",
         "<15>{#f/15}沒錯！！\n我敢說，你正渴求著\n我的仁慈！",
         '<15>{#f/20}我，偉大的帕派瑞斯，\n樂意為您效勞！',
         '<15>{#f/20}人類，\n我會{@fill=#f00}饒恕{@fill=#000}你！！！',
         "<15>{#f/27}...是時候... 接受...\n我的{@fill=#f00}仁慈{@fill=#000}了..."
      ],
      act_check: () =>
         world.genocide
            ? [ '<32>{#p/story}* 帕派瑞斯 - 攻擊3 防禦3\n* 亡兄之弟。' ]
            : papreal()
            ? [ '<32>{#p/story}* 帕派瑞斯 - 攻擊3 防禦3\n* 依然相信著你。' ]
            : [ '<32>{#p/story}* 帕派瑞斯 - 攻擊20 防禦20\n* 喜歡說「捏嘿嘿！」' ],
      act_check2: [ '<32>{#p/story}* 帕派瑞斯 - 攻擊20 防禦20\n* 一切都很順利。' ],
      act_check3: [ '<32>{#p/story}* 帕派瑞斯 - 攻擊20 防禦20\n* 最最最仁慈的衛兵！' ],
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
            : [ "<15>{#p/papyrus}{#f/21}呃，我沒想到\n會這樣..." ],
      death2: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/21}衫斯，我...', '<15>{#f/33}{@random=1.1/1.1}我讓你失望了...' ]
            : papreal()
            ? [
                 '<15>{#p/papyrus}{#f/27}...盡-儘管如此，\n我仍然相信你！',
                 '<15>{#p/papyrus}{#f/21}只要你努力，\n肯定能變得更好...',
                 '<15>{#p/papyrus}{#f/27}我-我保證...！'
              ]
            : [ '<15>{#p/papyrus}{#f/27}...幸-幸好，\n我的頭還在！' ],
      dots: [ '<32>{#p/basic}* ...' ],
      flirt0: [ '<32>{#p/basic}* Cute.' ],
      flirt1: [
         '<15>{#p/papyrus}{#f/20}什麼！？\n對我調——調——\n調情！？',
         '<15>你終於表露出\n你的{@fill=#f00}真實感受{@fill=#000}了！',
         "<15>但——但是！\n我可是個\n眼光很高的\n骷髏！！！",
         '<15>你又能做什麼\n來回報我的\n愛意呢？？？'
      ],
      flirt2: [
         '<99>{#p/human}* （你要怎麼回答？）{!}\n§shift=32§我會做\n§shift=32§義大利麵§shift=52§我啥也不會{#c/0/4/2}'
      ],
      flirt3a: [ '<15>{#p/papyrus}{#f/24}這種\n自信的品格... \n讓我想到了...' ],
      flirt3b: [ '<15>{#p/papyrus}{#f/24}這種\n謙遜的品格...\n讓我想到了...' ],
      flirt4: [
         '<15>{#f/22}我自己！！！',
         "<15>{#f/10}你完美地\n貼合了我的\n所有標準！！！",
         '<15>{#f/27}我想這意味著...\n我必須和你來場\n約會了？'
      ],
      flirt5: [ "<15>{#p/papyrus}{#f/20}約會的事\n還是等到我抓住\n你之後再談吧！" ],
      flirt6: [ "<32>{#p/human}* (No effect...)\n* (Seems acting won't escalate this battle any further.)" ],
      flirt7: [ '<32>{#p/human}* （但帕派瑞斯現在忙於戰鬥，\n  沒時間聽你說話。）' ],
      flirtStatus1: [ '<32>{#p/story}* 帕派瑞斯正在為約會考慮\n  要穿什麼。' ],
      flirtStatus2: [ '<32>{#p/story}* 帕派瑞斯往他耳後拍了些\n  骨龍水。' ],
      flirtStatus3: [ '<32>{#p/story}* 帕派瑞斯正在為約會考慮\n  要煮什麼。' ],
      flirtStatus4: [ '<32>{#p/story}* 帕派瑞斯往他耳後拍了些\n  番茄醬。' ],
      flirtStatus5: [ '<32>{#p/story}* 帕派瑞斯正在想{@fill=#ff0}方色{@fill=#fff}法\n  變得出名。' ],
      flirtStatus6: [ '<32>{#p/story}* 帕派瑞斯往他耳後拍了些\n  鎂塔牌面霜。' ],
      flirtStatus7: [ '<32>{#p/story}* 帕派瑞斯往他耳後拍了些\n  鎂塔牌動漫粉。' ],
      flirtStatus8: [ '<32>{#p/story}* 帕派瑞斯往他耳後拍了些\n  鎂塔牌可愛汁。' ],
      flirtStatus9: [ "<32>{#p/story}* 帕派瑞斯意識到他沒有耳朵。" ],
      flirtStatus10: [ '<32>{#p/story}* 帕派瑞斯頭上隨便貼了一些藥膏。' ],
      flirtStatus11: [ "<32>{#p/story}* ...他還在想{@fill=#ff0}方色{@fill=#fff}法\n  變得出名。" ],
      hurtStatus: [ '<32>{#p/story}* 帕派瑞斯要被打敗了。' ],
      insult1: [ '<15>{#p/papyrus}{#f/20}HOW SELFLESS!', '<15>{#f/21}YOU WANT ME TO FEEL BETTER ABOUT FIGHTING YOU...' ],
      insult2: [ "<15>{#p/papyrus}{#f/15}THERE'S NO NEED TO LIE TO YOURSELF!!!" ],
      insult3: [ "<32>{#p/human}* (No effect...)\n* (Seems acting won't escalate this battle any further.)" ],
      insult4: [ '<32>{#p/human}* （但帕派瑞斯現在忙於戰鬥，\n  沒時間聽你說話。）' ],
      name: '* 帕派瑞斯',
      randomStatus1: [ '<32>{#p/story}* 帕派瑞斯正在準備一記\n  骨頭攻擊。' ],
      randomStatus2: [ '<32>{#p/story}* 帕派瑞斯準備了一記非骨頭攻擊，\n  然後花了一分鐘的時間來糾正錯誤。' ],
      randomStatus3: [ '<32>{#p/story}* 帕派瑞斯正在做飯。' ],
      randomStatus4: [ '<32>{#p/story}* 帕派瑞斯悄悄說了一句「捏嘿嘿！」' ],
      randomStatus5: [ '<32>{#p/story}* 帕派瑞斯正在左右搖晃他的骨頭。' ],
      randomStatus6: [ '<32>{#p/story}* 帕派瑞斯正在努力扮酷。' ],
      randomStatus7: [ '<32>{#p/story}* 帕派瑞斯正在考慮他的選擇。' ],
      randomStatus8: [ '<32>{#p/story}* 骨頭的氣味。' ],
      randomStatus9: [ '<32>{#p/story}* 帕派瑞斯想起了\n  衫斯講過的一段笑話，\n  忍不住笑了幾下。' ],
      spaghetti1: () => [
         '<15>{#p/papyrus}{#f/12}我的義大利麵！',
         "<15>{#p/papyrus}{#f/13}AND YOU LOOK LIKE YOU'RE ENJOYING IT...",
         papreal()
            ? "<15>{#p/papyrus}{#f/27}WELL, I'M GLAD I COULD MAKE YOU HAPPY!"
            : [
                 '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO OUR MEAL TOGETHER!',
                 '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO MAKING SOME MORE FOR YOU!'
              ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      spaghetti2: [ "<32>{#p/basic}* If Papyrus wasn't so busy fighting, he might've noticed that." ],
      specialStatus0: [ "<32>{#p/story}* 帕派瑞斯的氣場越來越強。" ],
      specialStatus1: [ '<32>{#p/story}* 特殊攻擊。' ],
      specialStatus2: [ '<32>{#p/story}* 帕派瑞斯正全力以赴。' ],
      specialStatus3: [ '<32>{#p/story}* 帕派瑞斯將所有邏輯都拋之腦後。' ],
      specialStatus4: [ '<32>{#p/story}* 帕派瑞斯發覺自己有些缺乏邏輯，\n  又把它撈回來了。' ],
      specialStatus5: [ '<32>{#p/story}* 帕派瑞斯汗流浹背。' ],
      specialStatus6: [ "<32>{#p/story}* 帕派瑞斯已經束手無策了。" ],
      status1: [ '<32>{#p/story}* 帕派瑞斯正在饒恕你。' ],
      status2: [ '<32>{#p/story}* 帕派瑞斯擋住了去路！' ],
      turnTalk0a: [ "<15>{#p/papyrus}{#f/24}看來，\n你要來真的..." ],
      turnTalk0b: [ "<15>{#p/papyrus}{#f/24}看來，\n你不想戰鬥..." ],
      turnTalk0c: [ "<15>{#p/papyrus}{#f/20}那就讓我看看\n你會如何應對\n我傳說中的\n『藍色攻擊！』" ],
      turnTalk0x: [
         "<15>{#p/papyrus}{#f/10}你現在是\n藍色的了。",
         "<15>{#f/10}那就是\n我的攻擊！",
         '<15>{#f/20}捏嘿嘿嘿嘿嘿\n嘿嘿嘿！！！'
      ],
      turnTalk1a: [ '<15>{#p/papyrus}{#f/20}看好了！' ],
      turnTalk1b: [ '<15>{#p/papyrus}{#f/20}嗯...\n我在想我應該\n穿什麼...' ],
      turnTalk2a: [ '<15>{#p/papyrus}{#f/20}你能跳多高呢？' ],
      turnTalk2b: [ "<15>{#p/papyrus}{#f/22}什麼！？\n我才沒有想著\n約會的事情呢！" ],
      turnTalk3: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/21}... 是不是只有\n我覺得\n氣氛有點怪？' ]
            : [ "<15>{#p/papyrus}{#f/20}對！\n別逼我用出我的\n{@fill=#f00}特殊攻擊{@fill=#000}！" ],
      turnTalk4: () =>
         world.postnoot
            ? [ "<15>{#p/papyrus}{#f/20}算了。\n應該沒什麼。" ]
            : [ '<15>{#p/papyrus}{#f/20}我都能嗅到\n我未來的\n人氣了！！！' ],
      turnTalk5: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/20}我還從\n我的未來裡\n看到了番茄醬！' ]
            : [ '<15>{#p/papyrus}{#f/20}帕派瑞斯:\n舉世無雙意面王！' ],
      turnTalk6: () =>
         world.postnoot
            ? [ '<15>{#p/papyrus}{#f/20}以及在特戰隊\n的一席之地！' ]
            : [ '<15>{#p/papyrus}{#f/20}帕派瑞斯:\n特戰隊成員！' ],
      turnTalk7: [ '<15>{#p/papyrus}{#f/10}安黛因一定會\n為我感到驕傲！！' ],
      turnTalk8: [ '<15>{#p/papyrus}{#f/20}國王會在首塔\n為我建造一座\n雕像！！！' ],
      turnTalk9: [ "<15>{#p/papyrus}{#f/10}... 我也會\n讓我兄弟\n擁有一座的。" ],
      turnTalk10: [ "<15>{#p/papyrus}{#f/27}我們將會收穫\n眾多崇拜者！！\n但是..." ],
      turnTalk11a: [ '<15>{#p/papyrus}{#f/20}我又如何知道\n人們是否真心\n喜歡我呢？？？' ],
      turnTalk11b: [ '<15>{#p/papyrus}{#f/20}會有人像你一樣\n喜歡我嗎？' ],
      turnTalk12: [ '<15>{#p/papyrus}{#f/21}像你這樣的人\n真是很少見...' ],
      turnTalk13a: [ "<15>{#p/papyrus}{#f/21}我不覺得他們\n會輕易放你走..." ],
      turnTalk13b: [ '<15>{#p/papyrus}{#f/21}再想約會\n估計會很難...' ],
      turnTalk14: [ "<15>{#p/papyrus}{#f/26}如果你被抓到，\n然後送走的話。" ],
      turnTalk15: [ '<15>{#p/papyrus}{#f/17}呃...\n管他呢！\n放棄吧！！' ],
      turnTalk16: [ '<15>{#p/papyrus}{#f/15}要麼放棄，要麼... \n就準備面對我的\n{@fill=#f00}特殊攻擊{@fill=#000}！' ],
      turnTalk17: [ '<15>{#p/papyrus}{#f/20}沒錯！！！\n待會我就要使用\n我的{@fill=#f00}特殊攻擊{@fill=#000}了！' ],
      turnTalk18: [
         '<15>{#p/papyrus}{#f/20}在我使用\n{@fill=#f00}特殊攻擊{@fill=#000}前... \n這是你的最後機會！'
      ],
      turnTalk19: [ '<15>{#p/papyrus}{#f/20}看好了...！\n我的{@fill=#f00}特殊攻擊{@fill=#000}！' ],
      turnTalk19x: [
         '<15>{#p/papyrus}{#f/15}捏嘿嘿！',
         '<15>{#f/20}在這之前可沒有人類\n能躲過我的\n{@fill=#f00}特殊攻擊{@fill=#000}！',
         '<15>{#f/20}做好被抓住的準備吧！\n一勞永逸的那種！'
      ],
      turnTalk20: [ '<15>{#p/papyrus}{#f/20}特殊攻擊，\n阿爾法編陣！' ],
      turnTalk21: [ '<15>{#p/papyrus}{#f/20}特殊攻擊，\n貝塔編陣！' ],
      turnTalk22: [ '<15>{#p/papyrus}{#f/20}特殊攻擊，\n伽馬編陣！' ],
      turnTalk23: [ '<15>{#p/papyrus}{#f/20}特殊攻擊，\n德爾塔編陣！' ],
      turnTalk24: [
         '<15>{#p/papyrus}{#f/27}哇塞！\n你也太強了吧！',
         '<15>{#f/20}但我可不怕！\n我不會被你的\n實力嚇倒！',
         '<15>{#f/14}... 特殊攻擊...',
         '<15>{#f/17}{@fill=#f00}西格瑪{@fill=#000}編陣！！！'
      ],
      turnTalk24x: [
         "<15>{#p/papyrus}{#f/27}行吧...！ *喘氣*\n很明顯... 你不能！\n*喘氣* 打敗我！",
         '<15>{#f/15}沒錯！！！\n我看見你被嚇得\n全身發抖了！！',
         '<15>{#f/20}我，偉大的帕派瑞斯，\n選擇給予你\n憐憫！！',
         '<15>{#f/20}我會{@fill=#f00}饒恕你{@fill=#000}，\n人類！！！',
         "<15>{#f/10}現在是你接受\n我{@fill=#f00}仁慈{@fill=#000}的機會了。"
      ],
      idleTalk: [ '<15>{#p/papyrus}{#f/20}...' ],
      idleTalkBullied: [ '<18>{#p/papyrus}{#f/27}...' ],
      secretFlirt1: [ '<15>{#p/papyrus}{#f/27}你盼著能伴我左右...\n直到永遠？', '<15>{#p/papyrus}{#f/21}呃...' ],
      secretFlirt2: [
         '<15>{#p/papyrus}{#f/27}有人想拆散我們？',
         '<15>{#p/papyrus}{#f/21}是誰呢...'
      ],
      secretFlirt2x: [
         "<15>{#p/papyrus}{#f/27}SO YOU -DON'T- WISH TO REMAIN WITH ME?",
         "<15>{#p/papyrus}{#f/14}BUT THEN... WHY WON'T YOU ACCEPT MY MERCY AND LEAVE ME?"
      ],
      secretFlirt3: [
         "<15>{#p/papyrus}{#f/25}呃，我們還沒到\n【那麼】濃情\n蜜意的地步吧...",
         '<15>{#p/papyrus}{#f/15}...但事後\n我們可以繼續！'
      ],
      secretFlirt3x: [ "<15>{#p/papyrus}{#f/27}WAIT, ARE -YOU- THE ONE WHO'S TRYING TO TEAR OUR LOVE APART?" ],
      secretFlirt4: [ '<15>{#p/papyrus}{#f/24}等等，你是想說...\n三角戀？？？' ],
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
         "<15>{#p/papyrus}{#f/15}別擔心，人類！\n一切盡在\n帕派瑞斯的掌控之中！"
      ],
      secretInsult1: [ '<15>{#p/papyrus}{#f/27}呃... 大可不必？？？' ],
      secretInsult2: [ '<15>{#p/papyrus}{#f/21}蠢貨... \n我好像在哪聽過...' ],
      secretInsult2x: [
         '<15>{#p/papyrus}{#f/22}OR... NOT?',
         '<15>{#p/papyrus}{#f/24}SO, LET ME GET THIS STRAIGHT.',
         '<15>{#p/papyrus}{#f/27}YOU MEANT TO SAY YOU... LOVE ME???',
         '<15>{#p/papyrus}{#f/27}AND THAT SOMETHING IS TRYING TO TEAR OUR LOVE APART?'
      ],
      secretInsult3: [ '<15>{#p/papyrus}{#f/29}搞什麼...' ],
      secretInsult3x: [
         "<15>{#p/papyrus}{#f/27}YOU MEAN I'M AN IDIOT FOR NOT NOTICING HOW MUCH YOU LOVE ME?",
         '<15>{#p/papyrus}{#f/28}AND THAT YOU WANT TO... UH...',
         "<15>{#p/papyrus}{#f/25}I-I MEAN, I DON'T THINK WE'VE GOTTEN -THAT- FAR YET...",
         '<15>{#p/papyrus}{#f/15}...但事後\n我們可以繼續！'
      ],
      secretInsult4: [ "<15>{#p/papyrus}{#f/27}你罵我沒腦子，\n沒懂你啥意思..." ],
      secretInsult4x: [
         "<15>{#p/papyrus}{#f/27}SO... YOU MEANT TO SAY WE'RE IN A LOVE TRIANGLE?",
         "<15>{#p/papyrus}{#f/19}WELL, IT'D CERTAINLY EXPLAIN YOUR ABRASIVE ATTITUDE!"
      ],
      secretInsult5: [
         '<15>{#p/papyrus}{#f/27}啥？\n「志在星辰大海，\n何必自暴自棄」...',
         '<15>{#p/papyrus}{#f/17}你在說啥呢...？'
      ],
      secretInsult5x: [
         '<15>{#p/papyrus}{#f/25}WAIT... YOU WANTED ME TO REALIZE THAT YOU SECRETLY LOVED ME?',
         "<15>{#p/papyrus}{#f/22}AND THAT WE'RE ACTUALLY IN A... LOVE TRAPEZOID!?"
      ],
      secretInsult6: [
         '<15>{#p/papyrus}{#f/14}等等... 我明白了！',
         '<15>{#p/papyrus}{#f/21}蠢貨...',
         '<15>{#p/papyrus}{#f/21}星辰大海...',
         '<15>{#p/papyrus}{#f/20}有顆星星，閃閃，\n他也喜歡叫人「蠢貨」！',
         '<15>{#p/papyrus}{#f/25}我...',
         "<15>{#p/papyrus}{#f/22}我才反應過來\n是怎麼回事！",
         '<15>{#p/papyrus}{#f/20}那個「艾斯利爾」好像\n也喜歡罵人蠢貨！',
         '<15>{#p/papyrus}{#f/24}也就是說...',
         '<15>{#p/papyrus}{#f/22}你剛說的「星辰」\n肯定就是指他！',
         '<15>{#p/papyrus}{#f/19}他肯定幹了啥，\n害【我】表現得\n像個蠢貨！'
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
         '<15>{#p/papyrus}{#f/14}現在...\n我不會再\n被他騙了！',
         '<15>{#p/papyrus}{#f/20}我，帕派瑞斯，\n保證讓他再也\n找不到我！',
         "<15>{#p/papyrus}{#f/15}別擔心，人類！\n一切盡在\n帕派瑞斯的掌控之中！"
      ],
      sparableFlirt1: [
         "<15>{#p/papyrus}{#f/27}你現在\n要做的是饒恕，\n而不是調情！",
         '<15>{#f/14}我必須\n抗住誘惑！'
      ],
      sparableFlirt1x: [
         '<15>{#p/papyrus}{#f/27}啊？\n在這種時候... 調情？',
         "<15>{#f/14}嗯...\n這倒也算是一種\n贖罪方式！"
      ],
      sparableFlirt2: [ '<15>{#p/papyrus}{#f/14}不-不...！' ],
      sparableFlirt2x: [ '<15>{#p/papyrus}{#f/14}啊-啊...！' ],
      sparableFlirt3: [ '<15>{#p/papyrus}{#f/14}...' ],
      sparableInsult1: [
         "<15>{#p/papyrus}{#f/20}嘿，你沒必要\n辱罵自己的！",
         '<15>{#f/21}我知道你已經盡力了...'
      ],
      sparableInsult1x: [
         "<15>{#p/papyrus}{#f/20}嘿，你沒必要\n辱罵自己的！",
         "<15>{#f/15}人類，你要記住：\n來這裡是為了\n做個好人的！"
      ],
      sparableInsult2: [ '<15>{#p/papyrus}{#f/21}人類...' ],
      sparableInsult2x: [ '<15>{#p/papyrus}{#f/15}你可以的...！' ],
      sparableInsult3: [ '<15>{#p/papyrus}{#f/21}...' ]
   },
   b_opponent_shockasgore: {
      act_check: [ '<32>{#p/asriel2}* 艾斯戈爾。\n* 親手葬送自己家園的昏君。' ],
      act_hug: [ '<32>{#p/human}* （你想抱抱艾斯戈爾...）' ],
      hugText: [ '<32>{#p/human}* （...但你的身體直接穿了過去。）', '<32>{#p/asriel2}* ...啊？' ],
      foodText: [ '<11>{#p/asgore}{#f/5}那是...' ],
      idleText1: [ '<11>{#p/asgore}{#f/1}開玩笑吧...' ],
      idleText2: [ '<11>{#p/asgore}{#f/1}一定要\n訴諸暴力嗎？' ],
      idleText3: [ '<11>{#p/asgore}{#f/1}為什麼不能\n和平解決呢？' ],
      idleText4: [ '<11>{#p/asgore}{#f/1}真的有必要嗎？' ],
      stickText: [
         '<32>{#p/human}* （你朝艾斯戈爾扔出扳手。）\n* （扳手直接穿過了他的身體。）',
         '<32>{#p/asriel2}* ...啊？'
      ],
      miss: [
         '<11>{#p/asgore}{#f/2}...',
         '<11>{#f/1}我本人不在這，\n艾斯利爾。',
         "<11>{#f/2}這不過\n是個投影。"
      ],
      name: '* 艾斯戈爾',
      status1: [ '<32>{#p/asriel2}* 現在殺了他，$(name)。' ],
      status2: [ '<32>{#p/asriel2}* ...' ]
   },

   i_berry: {
      battle: {
         description: '一小串半透明的漿果',
         name: '洋梅'
      },
      drop: [ '<32>{#p/human}* （你把洋梅扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （7 HP。）' ]
            : [ '<32>{#p/basic}* 「洋梅」 回復7 HP\n* 一小串半透明的漿果。' ],
      name: '洋梅',
      use: [ '<32>{#p/human}* （你吃掉了洋梅。）' ]
   },
   i_blookpie: {
      battle: {
         description: '將新鮮洋梅浸潤在果凍中製作而成。',
         name: '洋梅派'
      },
      drop: () => [
         '<32>{#p/human}* （你把洋梅果凍派扔掉了。）',
         ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

            ? game.room === '_frontier4' // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ......... 嗯？' ]
               : [ '<32>{#p/napstablook}* 喔..................' ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （99 HP。）' ]
            : [ '<32>{#p/basic}* 「Exoberry Pie」 回復99 HP\n* 將新鮮洋梅浸潤在果凍中製作而成。' ],
      name: '洋梅果凍派',
      use: () => [
         '<32>{#p/human}* （你吃掉了洋梅果凍派。）',
         ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

            ? game.room === '_frontier4' // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ......... 嗯？' ]
               : [ '<32>{#p/napstablook}* 喔.........\n* 希望你愛吃.........' ]
            : [])
      ]
   },
   i_chip: {
      battle: {
         description: '請把它帶到星系的盡頭。',
         name: '「芯」型薯片'
      },
      drop: () => [
         '<32>{#p/human}* （你把「芯」型薯片扔掉了。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [ "<25>{#p/asriel1}{#f/15}* Uh... weren't you going to protect that?" ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （45 HP。）\n* （比起吃掉它，你更想保護好它。）' ]
            : [ '<32>{#p/basic}* 「『芯』型薯片」 回復45 HP\n* 請將其帶往星系的邊疆。' ],
      name: '「芯」型薯片',
      use: () => [
         '<32>{#p/human}* （你咬了一口「芯」型薯片。）',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom
            ? [ "<25>{#p/asriel1}{#f/15}* Uh... weren't you going to protect that?" ]
            : world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : calcHP() - SAVE.data.n.hp > 45
            ? [ '<32>{#p/basic}* 你的HP值獲得了一個增量。' ]
            : [ '<32>{#p/basic}* 你的傷口被覆蓋掉了。' ])
      ]
   },
   i_eye: {
      battle: {
         description: '可隨身攜帶的力場發射器。',
         name: '力場護盾'
      },
      drop: [ '<32>{#p/human}* （你把力場護盾扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （7防禦。）' ]
            : [ '<32>{#p/basic}* 「力場護盾」 （7防禦）\n* 可隨身攜帶的力場發射器。' ],
      name: '力場護盾',
      use: [ '<32>{#p/human}* （你啟動了力場護盾。）' ]
   },
   i_eye_x: {
      battle: {
         description: '可隨身攜帶的力場發射器，\n但能量不足。',
         name: '力場護盾？'
      },
      drop: [ '<32>{#p/human}* （你把力場護盾扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （5防禦。）' ]
            : [ '<32>{#p/basic}* 「力場護盾」 （5防禦）\n* 可隨身攜帶的力場發射器，\n  但能量不足。' ],
      name: '力場護盾？',
      use: [ '<32>{#p/human}* （你啟動了力場護盾。）' ]
   },
   i_fruit: {
      battle: {
         description: '非歐幾何形狀的水果，\n裡頭比外邊還大。',
         name: '幽靈水果'
      },
      drop: [ '<32>{#p/human}* (You fold the Ghost Fruit in on itself.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [ '<32>{#p/basic}* 「幽靈水果」 回復15 HP\n* 非歐幾何形狀的水果，\n  裡頭比外邊還大。' ],
      name: '幽靈水果',
      use: [ "<32>{#p/human}* (You unpacked the Ghost Fruit's many dimensions.)" ]
   },
   i_glove: {
      battle: {
         description: "源自尖端科技，揍人超級有力的\n仿生手套。",
         name: '超能手套'
      },
      drop: [ '<32>{#p/human}* （你把超能手套扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （5攻擊。）' ]
            : [ '<32>{#p/basic}* 「超能手套」 （5攻擊）\n* 源自尖端科技，揍人超級有力的\n  仿生手套。' ],
      name: '超能手套',
      use: [ '<32>{#p/human}* （你戴上了超能手套。）' ]
   },
   i_glove_x: {
      battle: {
         description: "雖然是仿製手套，\n但不妨礙你用它痛扁敵人。",
         name: '超能手套？'
      },
      drop: [ '<32>{#p/human}* （你把超能手套扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （3攻擊。）' ]
            : [ '<32>{#p/basic}* 「超能手套？」 （3攻擊）\n* 雖然是仿製手套，\n  但不妨礙你用它痛扁敵人。' ],
      name: '超能手套？',
      use: [ '<32>{#p/human}* （你戴上了超能手套。）' ]
   },
   i_milkshake: {
      battle: {
         description: '由白如珍珠的不明物質製成。',
         name: '奶昔'
      },
      drop: [ '<32>{#p/human}* (You rid yourself of the Milkshake.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （18 HP。）' ]
            : [ '<32>{#p/basic}* 「奶昔」 回復18 HP\n* 由白如珍珠的不明物質製成。' ],
      name: '奶昔',
      use: () => [
         '<32>{#p/human}* (You swallowed every last drop of the Milkshake.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : [ '<32>{#p/basic}* ... salty.' ])
      ]
   },
   i_nice_cream: {
      battle: {
         description: '包裝紙上印的不是笑話，\n而是一些天馬行空的想像。',
         name: '冰意靈'
      },
      drop: [ '<32>{#p/human}* （你把冰意靈扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [ '<32>{#p/basic}* 「冰意靈」 回復15 HP\n* 包裝紙上印的不是笑話，\n  而是一些天馬行空的想像。' ],
      name: '冰意靈',
      use: pager.create(
         2,
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? '<32>* （包裝上寫著拯救世界的冒險。）'
               : '<32>{#p/basic}* 「你是一個偉大的冒險家，\n  肩負著拯救世界的使命！」'
         ],
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? '<32>* （包裝上把你描述成\n  一個星際飛船的船長。）'
               : '<32>{#p/basic}* 「你是一艘星際飛船的船長，\n  正駛向未知的太空！」'
         ],
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? '<32>* （包裝上寫著只有你一個人\n  能解開一個謎團。）'
               : '<32>{#p/basic}* 「一個巨大的謎團正在揭開，\n  而你是唯一能解開它的人！」'
         ],
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? '<32>* （包裝上寫著你穿越時空後\n  做出的努力。）'
               : '<32>{#p/basic}* 「你穿越回過去，\n  阻止了一場可怕的災難！」'
         ],
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? '<32>* （包裝上寫著你的科學才華。）'
               : '<32>{#p/basic}* 「你是一位傑出的科學家，\n  即將取得重大突破！」'
         ],
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? "<32>* （包裝上建立了一個\n  你發現的無辜的世界。）"
               : '<32>{#p/basic}* 「你偶然發現了一個充滿無辜的\n  生物的世界，接下來會發生什麼\n  就取決於你了！」'
         ],
         () => [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            SAVE.data.b.svr
               ? '<32>* （包裝上詳細介紹了\n  你的新能力。）'
               : '<32>{#p/basic}* 「你已經獲得了隨心所欲\n  改變宇宙的力量！\n  明智地使用它吧！」'
         ],
         [
            '<32>{#p/human}* （你撕開了冰意靈的包裝。）',
            "<32>{#p/human}* （上面是你找到了一個\n  充滿愛的家庭的全息圖像。）"
         ]
      )
   },
   i_pop: {
      battle: {
         description: '可改變主觀時間流速。',
         name: '渦旋棒棒糖'
      },
      drop: [ '<32>{#p/human}* （你把渦旋棒棒糖扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （11 HP。）' ]
            : [
                 '<33>{#p/basic}* 「渦旋棒棒糖」 回復11 HP\n* 可改變主觀時間流速。\n* 僅在戰鬥中有效。'
              ],
      name: '渦旋棒棒糖',
      use: () => [
         '<32>{#p/human}* （你把渦旋棒棒糖舔沒了。）',
         ...(battler.active
            ? game.vortex
               ? [ '<32>{#p/human}* （主觀時間流速之前已改變。）' ]
               : [
                    '<32>{#p/human}* （你的主觀時間流速開始改變。）',
                    '<32>{#p/story}* 兩回合內，你的專注力提升！'
                 ]
            : [ '<32>{#p/human}* （戰鬥外使用無效。）' ])
      ]
   },
   i_spaghetti: {
      battle: {
         description: 'Silken spaghetti, finely aged in a time dilation unit.',
         name: '義大利麵'
      },
      drop: () => [
         '<32>{#p/human}* （你把義大利麵扔掉了。）',
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
                    '<18>{#p/papyrus}{#f/8}別啊！！\n你怎麼能這麼對它！？！？',
                    '<18>{#f/5}...那是我親自下廚\n為你做的意面啊...',
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
                    '<18>{#p/papyrus}{#f/8}別啊！！\n你怎麼能這麼對它！？！？',
                    '<18>{#f/5}...那是我親自下廚\n為你做的意面啊...',
                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                       ? [
                            '<25>{#p/undyne}{#f/4}* Is perfectly fine!',
                            '<25>{#p/undyne}{#f/7}* Human!\n* Pick the spaghetti up off the floor NOW!',
                            "<18>{#p/papyrus}{#f/6}UNDYNE, PLEASE!!\nTHAT'S ENTIRELY UNSANITARY!!"
                         ]
                       : [ '<18>{#f/6}...吃不了了啦！！' ]),
                    "<18>{#f/4}不過... 這樣也好。",
                    '<18>{#f/5}你丟掉了那份意面...',
                    '<18>{#f/6}那我就做一份【更贊的】！',
                    '<18>{#f/9}沒錯！\n你看我，充滿了鬥志！',
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
      name: '義大利麵',
      use: () => [
         '<32>{#p/human}* （你吃光了義大利麵。）',
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
         description: '一個五彩斑斕的發光瑞士卷。',
         name: '光彩漩渦'
      },
      drop: [ '<32>{#p/human}* （你把光彩漩渦扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （22 HP。）' ]
            : [ '<32>{#p/basic}* 「光彩漩渦」 回復22 HP\n* 一個五彩斑斕的發光瑞士卷。' ],
      name: '光彩漩渦',
      use: [ '<32>{#p/human}* （你吃掉了光彩漩渦。）' ]
   },
   i_voidy: {
      battle: {
         description: '可傳送到某個隱藏房間，\n戰鬥中使用無效。',
         name: '聖所'
      },
      drop: [ '<32>{#p/human}* （你將聖所棄如敝屣。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （一件存在之外的物品。）' ]
            : [ '<32>{#p/basic}* 可傳送到某個隱藏房間，\n  戰鬥外可用。' ],
      name: '聖所',
      use: () =>
         battler.active
            ? [ '<32>{#p/human}* （你使用了聖所。）', '<32>{#p/human}* （戰鬥中使用無效。）' ]
            : [ '<32>{#p/human}* （你使用了聖所。）' ]
   },
   i_corndog_sword: {
      battle: {
         description: '絕對是獨一無二的武器。',
         name: '玉狗聖劍'
      },
      drop: [ '<32>{#p/human}* （你想扔掉玉狗聖劍...）', '<32>{#p/human}* （...但是它拒絕了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （你覺得還是不要思考\n  這玩意怎麼工作的比較好。）' ]
            : [ '<32>{#p/basic}* 絕對是獨一無二的武器。' ],
      name: '玉狗聖劍',
      use: () =>
         battler.active && battler.alive[0].opponent.metadata.corndogger
            ? [
                 '<32>{#p/human}* （你裝備上玉狗聖劍。）',
                 "<32>{#p/human}* （它太誘人了，你禁不住想咬一口。）",
                 [
                    '<32>{#p/human}* （你吃掉了外層的面衣...）',
                    '<32>{#p/human}* （你吃掉了劍尖...）',
                    '<32>{#p/human}* （你吃掉了劍身...）',
                    '<32>{#p/human}* （你吃掉了劍柄...）',
                    '<32>{#p/human}* （你吃掉了最後的握柄...）'
                 ][SAVE.data.n.corndogger++],
                 '<32>{#p/basic}* 突然間..！'
              ]
            : [
                 '<32>{#p/human}* （你試圖裝備上玉狗聖劍...）',
                 "<32>{#p/human}* （...但是，它沒有嗅到\n  足夠大的威脅！）"
              ]
   },
   i_fryz: {
      battle: {
         description: 'For once, it\'s not just \"pleasantly warm.\"',
         name: '烤爾比'
      },
      drop: [ "<32>{#p/human}* （你把烈焰烤爾比像燃燒瓶一樣丟了出去。）" ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （30 HP。）' ]
            : [ '<32>{#p/basic}* \"Flamin\' Grillby\" Heals 30 HP\n* For once, it\'s not just \"pleasantly warm.\"' ],
      name: "烈焰烤爾比",
      use: [ "<32>{#p/human}* （你吃掉了烈焰烤爾比。）" ]
   },
   i_burgerz: {
      battle: {
         description: '很像普通漢堡，只是小了一些。\n共有三個。',
         name: '三隻小漢堡'
      },
      drop: [ '<32>{#p/human}* （你把小漢堡全扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。共有三個。）' ]
            : [ '<32>{#p/basic}* 「小漢堡」 回復15 HP\n* 很像普通漢堡，只是小了一些。\n* 共有三個。' ],
      name: '三隻小漢堡',
      use: [ '<32>{#p/human}* （你吃掉了一個小漢堡。）' ]
   },
   i_burgerz_use1: {
      battle: {
         description: '很像普通漢堡，只是小一些。\n還剩兩個。',
         name: '兩隻小漢堡'
      },
      drop: [ '<32>{#p/human}* （你把小漢堡全扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。還剩兩個。）' ]
            : [ '<32>{#p/basic}* 「小漢堡」 回復15 HP\n* 很像普通漢堡，只是小了一些。\n* 還剩兩個。' ],
      name: '兩隻小漢堡',
      use: [ '<32>{#p/human}* （你吃掉了一個小漢堡。）' ]
   },
   i_burgerz_use2: {
      battle: {
         description: '很像普通漢堡，只是小了一些。',
         name: '小漢堡'
      },
      drop: [ '<32>{#p/human}* （你把小漢堡全扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。最後一個。）' ]
            : [ '<32>{#p/basic}* 「小漢堡」 回復15 HP\n* 很像普通漢堡，只是小了一些。\n* 最後一個。' ],
      name: '小漢堡',
      use: [ '<32>{#p/human}* （你吃掉了一個小漢堡。）' ]
   },

   k_premium: {
      name: '高級會員券',
      description: () =>
         SAVE.data.b.f_state_voucher
            ? '與你根本不存在的付費望遠鏡訂閱\n配套使用。'
            : '在使用過星港的望遠鏡之後，\n怪物小孩給你的東西。'
   },

   k_inverter: {
      name: '重力轉換器遙控器',
      description: () =>
         SAVE.data.b.s_state_inverter
            ? '用它激活了與之匹配的\n重力轉換器。'
            : "從衫斯房間裡沒有密封的信封中\n找到的。"
   },

   k_security: {
      name: '生鏽的鑰匙',
      description: () =>
         SAVE.data.n.state_aerialis_lockup > 0
            ? '用它解鎖了休閒迴廊的\n兵工廠。'
            : '在星港小鎮北側的\n「警察崗」找到的。'
   },

   n_shop_blook: {
      exit: [ "<32>{#p/napstablook}{#k/0}* 喔... 你要走了...", '<32>{#k/1}* 好吧，下次再見，也許吧...' ],
      item: () =>
         blookGone()
            ? [
                 '§fill=#808080§---- 售罄 ----',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§---- 售罄 ----' : '0G - 洋梅果凍派',
                 '0G - 幽靈水果',
                 '0G - 奶昔',
                 '離開'
              ]
            : SAVE.data.n.plot === 72
            ? [
                 SAVE.data.b.item_voidy ? '§fill=#808080§---- 售罄 ----' : '432G - 聖所',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§---- 售罄 ----' : '80G - 洋梅果凍派',
                 '5G - 幽靈水果',
                 '5G - 奶昔',
                 '離開'
              ]
            : [
                 SAVE.data.b.item_voidy ? '§fill=#808080§---- 售罄 ----' : '432G - 聖所',
                 SAVE.data.b.item_blookpie ? '§fill=#808080§---- 售罄 ----' : '100G - 洋梅果凍派',
                 '12G - 幽靈水果',
                 '16G - 奶昔',
                 '離開'
              ],
      itemInfo: [
         '特殊物品：\n傳送到\n某個\n隱藏房間。',
         '回復99 HP\n在黑暗中\n發出\n幽幽螢光。',
         "回復15 HP\n非歐幾何的\n產物。",
         '回復18 HP\n也許含有\n靈質。'
      ],
      itemPrompt: '<09>{#p/napstablook}{#k/3}看上\n什麼了嗎？',
      itemPurchase: [
         '<09>{#p/napstablook}{#k/3}嘿... 謝謝你...',
         "<09>{#p/napstablook}{#k/0}不買也沒\n關係的...",
         '<09>{#p/napstablook}{#k/0}對不起...\n錢不夠...',
         "<10>{#p/human}（你帶的\n東西\n太多了。）"
      ],
      itemPurchasePrompt: () => (blookGone() ? '偷走嗎？' : '花$(x)G\n買它嗎？'),
      itemUnavailable: () =>
         blookGone() ? '<09>{#p/basic}空無一物。' : "<09>{#p/napstablook}{#k/0}喔... 這個\n賣光了...",
      menu: () =>
         blookGone() ? [ '拿取', '偷竊', '閱讀', '離開' ] : [ '購買', world.meanie ? '偷竊' : '出售', '交談', '離開' ],
      menuPrompt1: () =>
         [
            '<23>{#p/napstablook}{#k/3}* 來隨便看看吧...',
            "<23>{#p/napstablook}{#k/3}* 希望這裡有你想要的東西...",
            "<23>{#p/napstablook}{#k/3}* 來隨便看看吧...\n  不想也行...\n  一切由你...",
            '<23>{#p/napstablook}{#k/3}* 來隨便看看...\n* 也許吧...',
            "<23>{#p/napstablook}{#k/3}* 來隨便看看吧...\n  不想也行...\n  一切由你..."
         ][Math.min(SAVE.data.n.state_wastelands_napstablook, 4)],
      menuPrompt2: '<23>{#p/napstablook}{#k/0}* 你可以隨時離開這裡... ',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是誰也沒有來。',
      note: () =>
         [ 'f_blooky', 'f_napstablook' ].includes(SAVE.data.s.state_foundry_deathroom) // NO-TRANSLATE

            ? [ "<32>{#p/basic}* 沒有人給你留字條。" ]
            : SAVE.data.b.killed_mettaton
            ? [ "<32>{#p/basic}* 這裡有一張字條。", '<32>{#p/napstablook}* 「都是你的錯...」' ]
            : world.runaway
            ? [ "<32>{#p/basic}* 這裡有一張字條。", '<32>{#p/napstablook}* 「我們別無選擇...」' ]
            : [ "<32>{#p/basic}* 這裡有一張字條。", '<32>{#p/napstablook}* 「對不起，我得走了...」' ],
      sell1: () =>
         blookGone()
            ? [ '<30>{#p/human}* （你從櫃檯後面拿走了42G。）' ]
            : world.meanie
            ? [
                 "<30>{#p/napstablook}{#k/2}* 喔... \n  你想偷我的東西...",
                 '<30>{#p/napstablook}{#k/5}* 你肯定很需要錢...',
                 SAVE.data.b.item_voidy
                    ? "<30>{#k/0}* 對不起...\n  我唯一的收入還是你剛給的錢..."
                    : "<30>{#k/0}* 對不起...\n  我很窮，沒錢給你..."
              ]
            : [
                 '<30>{#p/napstablook}{#k/2}* 喔... 你是想賣掉一些東西嗎',
                 "<30>{#k/0}* 我不清楚我能不能買下\n  所有東西...\n  抱歉..."
              ],
      sell2: () =>
         blookGone()
            ? [ '<30>{#p/basic}* 空無一物。' ]
            : world.meanie
            ? [
                 "<30>{#p/napstablook}{#k/5}* 嗯...\n* 我沒法給你值錢的東西...",
                 "<30>{#p/napstablook}{#k/0}* 我理解... \n  這會讓你很難過"
              ]
            : [
                 '<30>{#p/napstablook}{#k/5}* 嗯... 想賣東西的話... \n  可以問問我的表親...',
                 '<30>{#k/0}* 它應該和安黛因住在一塊'
              ],
      talk: (name: string) =>
         SAVE.data.n.plot === 72
            ? [ '打招呼', '發生什麼了', name, '未來打算', '離開' ]
            : [
                 '打招呼',
                 '幽靈',
                 '聖所',
                 65 <= SAVE.data.n.plot
                    ? SAVE.data.b.a_state_hapstablook && 68 <= SAVE.data.n.plot
                       ? '你的家人'
                       : '你的生活'
                    : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                    ? '鎂塔頓'
                    : 60 <= SAVE.data.n.plot
                    ? '喵喵玩偶'
                    : 48 <= SAVE.data.n.plot
                    ? '旅途'
                    : SAVE.data.b.napsta_performance
                    ? 'DJ小幽靈？'
                    : SAVE.data.n.state_wastelands_napstablook === 0
                    ? '納普斯文？'
                    : '你的生活',
                 '離開'
              ],
      talkPrompt: '<09>{#p/napstablook}{#k/1}喔，\n想和我\n聊天嗎？',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/napstablook}{#k/3}* 喔，你好啊...',
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
                       '<32>{#p/napstablook}{#k/3}* 喔，你好啊...',
                       '<32>{#p/napstablook}{#k/3}* 喔，很高興又見到你...'
                    ][SAVE.data.n.state_wastelands_napstablook],
                    ...(world.meanie
                       ? [ "<32>{#k/0}* 為什麼露出那副表情？\n* 我做錯什麼了嗎..." ]
                       : [ '<32>{#k/4}* 最近在忙些什麼呀？' ])
                 ]
               : SAVE.data.n.state_wastelands_napstablook < 5
               ? [
                    "<32>{#p/napstablook}{#k/0}* 喔...\n* 說些什麼好呢，不太確定啊...",
                    '<32>{#k/3}* 呃，也許... 你好?'
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
                    '<32>{#p/napstablook}{#k/2}* 你想了解幽靈嗎？',
                    '<32>{#k/0}* 嗯，除了我自己\n  我只認識三個幽靈...\n  都是我的表親...',
                    '<32>{#k/3}* 當然，還有你身體裡那一個',
                    "<32>{#k/1}* 除此之外，沒什麼可以說了",
                    '<32>{#k/0}* 如果不與容器融合，\n  我們就只能... 這樣存在',
                    '<32>{#k/0}* 嗯，我懂...\n* 這特質確實很有趣...'
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
                    '<32>{#p/napstablook}{#k/3}* 喔... 你說那個啊...',
                    '<32>{#k/1}* 有一天，我在地上\n  發現了一個小盒子...',
                    "<32>{#k/5}* 當我打開它的時候，\n  就到了一個我從未見過的\n  神秘地方...",
                    '<32>{#k/4}* 現在，我偶爾會去\n  那個地方放鬆自己',
                    "<32>{#k/3}* 那裡很安寧..."
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
                       '<32>{#p/napstablook}{#k/7}* 時間每流逝一點，\n  我離幸福也就更遠一步...'
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
                    '<32>{#p/napstablook}{#k/1}* 嗯，我有時會創作音樂',
                    "<32>{#k/0}* 人們覺得我的音樂很棒，\n  但我明白這只是他們\n  為了激勵我說的謊\n  罷了...",
                    '<32>{#k/4}* 不過，感謝你來我的小演出捧場...',
                    '<32>{#k/3}* 見到你，我很高興...'
                 ]
               : [
                    [
                       '<32>{#p/napstablook}{#k/2}* 你指的是...\n  之前我給你表演的帽子魔術嗎...？',
                       '<32>{#k/1}* 嗯，那個是我一個表親\n  教我的...',
                       '<32>{#k/3}* 以前，我和他常常在一塊\n  做各種事...',
                       '<32>{#k/0}* 後來有一天，他...',
                       '<32>{#k/6}* ...',
                       '<32>{#k/0}* 沒事...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 喔，我的生活蠻平淡的，\n  拿不出什麼好聊的事...",
                       '<32>{#k/3}* 碰上你這事，\n  都算這周末比較出彩的了...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 喔，我的生活蠻平淡的，\n  拿不出什麼好聊的事...",
                       '<32>{#k/6}* 而且有你在這，\n  我的生活估計也不會有啥起色了...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 喔，我的生活蠻平淡的，\n  拿不出什麼好聊的事...",
                       "<32>{#k/3}* i'm just... pluggin' along..."
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 喔，我的生活蠻平淡的，\n  拿不出什麼好聊的事...",
                       '<32>{#k/6}* not that you... really care...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* 喔，我的生活蠻平淡的，\n  拿不出什麼好聊的事...",
                       "<32>{#k/0}* i'm just a ghost that tends to get lost in the mix"
                    ]
                 ][SAVE.data.n.state_wastelands_napstablook]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },
   n_shop_hare: {
      exit: [ '<32>{#p/basic}{#k/11}* 再見！\n* 有空常來啊！' ],
      item: () =>
         world.population === 0 || world.runaway
            ? [
                 '0G - 超能手套？',
                 SAVE.data.b.item_eye ? '0G - 力場護盾？' : '0G - 力場護盾',
                 '0G - 渦旋棒棒糖',
                 '0G - 光彩漩渦',
                 '離開'
              ]
            : SAVE.data.n.plot === 72
            ? [
                 '10G - 超能手套？',
                 SAVE.data.b.item_eye ? '10G - 力場護盾？' : '20G - 力場護盾',
                 '8G - 渦旋棒棒糖',
                 '5G - 光彩漩渦',
                 '離開'
              ]
            : [
                 '30G - 超能手套？',
                 SAVE.data.b.item_eye ? '30G - 力場護盾？' : '40G - 力場護盾',
                 '28G - 渦旋棒棒糖',
                 '20G - 光彩漩渦',
                 '離開'
              ],
      itemInfo: () => [
         "武器：3攻擊\n(當前攻擊$(x))\n重拳出擊，\n仿製品。",
         SAVE.data.b.item_eye
            ? '防具：5防禦\n(當前防禦$(x))\n有力防禦，\n仿製品。'
            : '防具：7防禦\n(當前防禦$(x))\n有力防禦。',
         '回復11 HP\n可改變\n主觀時間\n流速。',
         "回復22 HP\n她的\n獨家配方。"
      ],
      itemPrompt: '<09>{#p/basic}{#k/0}想買點\n什麼？',
      itemPurchase: [
         '<09>{#p/basic}{#k/4}謝謝惠顧。',
         '<09>{#p/basic}{#k/7}只是\n看看？',
         "<09>{#p/basic}{#k/5}這點錢不夠。",
         "<10>{#p/human}（你帶的\n東西\n太多了。）"
      ],
      itemPurchasePrompt: () => (world.population === 0 || world.runaway ? '偷走嗎？' : '花$(x)G\n買它嗎？'),
      menu: () =>
         world.population === 0 || world.runaway
            ? [ '拿取', '偷竊', '閱讀', '離開' ]
            : [ '購買', world.meanie ? '偷竊' : '出售', '交談', '離開' ],
      menuPrompt1: '<23>{#p/basic}{#k/0}* 你好啊，旅行者。\n* 想來點什麼嗎？',
      menuPrompt2: '<23>{#p/basic}{#k/0}* 慢慢挑。',
      menuPrompt3: () =>
         world.bulrun ? '<23>{#p/basic}* ...但是大家都逃走了。' : '<23>{#p/basic}* ...但是誰也沒有來。',
      note: () =>
         world.runaway
            ? [ "<32>{#p/basic}* 這裡有一張字條。", '<32>{#p/basic}* 「請你別跟過來。」' ]
            : SAVE.data.n.plot === 72
            ? [ "<32>{#p/basic}* 這裡有一張字條。", '<33>{#p/basic}* 「對不起，我不敢回去。」' ]
            : [ "<32>{#p/basic}* 這裡有一張字條。", '<33>{#p/basic}* 「請不要傷害我的家人。」' ],
      sell1: () =>
         world.population === 0 || world.runaway
            ? [ '<30>{#p/human}* （你從櫃檯後面拿走了758G。）' ]
            : world.meanie
            ? [
                 "<30>{#p/basic}{#k/1}* Huh?\n* Is this what we're resortin' to now?",
                 "<30>{#k/2}* If you want somethin', you'll have to buy it first.",
                 '<30>{#k/12}* No exceptions.'
              ]
            : [
                 "<30>{#p/basic}{#k/6}* 哈？\n* 你想賣東西？\n* 這裡看起來像當鋪嗎？",
                 "<30>{#k/3}* 我不知道在你家鄉是\n  什麼樣子的... 但是...",
                 "<30>* 如果我開始花錢買\n  舊扳手和穿過的太空服，\n  我生意就做不下去了！"
              ],
      sell2: () =>
         world.population === 0 || world.runaway
            ? [ '<30>{#p/basic}* 空無一物。' ]
            : world.meanie
            ? [ "<30>{#p/basic}{#k/8}* I don't know what your game is, but it's not going to work on me." ]
            : [
                 "<30>{#p/basic}{#k/8}* If you're really hurtin' for cash, then maybe you could do some crowdfunding.",
                 '<30>{#k/2}* I hear people will pay for ANYTHING nowadays.'
              ],
      talk: () =>
         SAVE.data.n.plot === 72
            ? [ '打招呼', '發生什麼了', '外域', '未來打算', '離開' ]
            : [ '打招呼', '這裡可以幹什麼', '小鎮的歷史', '你的生活', '離開' ],
      talkPrompt: '<09>{#p/basic}{#k/0}想聊聊\n天嗎？',
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
                    "<32>{#p/basic}{#k/4}* 你好呀！歡迎來到星港！\n* 我都記不得上次看到新面孔\n  是什麼時候的事情了。",
                    '<32>{#k/8}* 你是從哪裡來的？\n* 首塔嗎？',
                    "<32>{#k/7}* 你看起來不像是遊客。\n* 你是自己來的嗎？"
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
                    '<32>{#p/basic}{#k/8}* 你想知道在星港可以\n  幹什麼？',
                    "<32>{#k/9}* 你可以去烤爾比用餐，\n  可以去圖書倌獲取資訊...",
                    "<32>{#k/2}* 如果你累了，\n  你可以去旅館打個盹。\n* 就在隔壁，我姐妹開的。",
                    "<32>{#k/0}* 你要是覺得無聊了，\n  可以坐在外面，\n  看那兩個古怪的骷髏\n  做他們的事情。",
                    "<32>* 他們兩個...\n* 我覺得，應該是兄弟。\n* 從我記事的時候，\n  他們就在這裡了。",
                    '<32>{#k/9}* 喔，我差點忘了。\n* 最近，有個小鬼兒決定\n  在小鎮的南邊開一家商店。',
                    "<32>{#k/11}* 雖然事情不算大，\n  但如果你路過，\n  一定要打聲招呼。\n* 那傢伙很需要陪伴的。"
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
                    '<32>{#p/basic}{#k/9}* 回想一下你的歷史課...',
                    '<32>{#k/0}* 很久以前，怪物們住在\n  我們現在稱之為鑄廠的地方。',
                    '<32>* 過了一段時間，\n  我們發明了在前哨站\n  建造新區域的技術。',
                    "<32>* 首先建造出來的就是星港，\n  他們認為這是一個建小鎮的\n  好地方。",
                    "<32>{#k/10}* 聽起來很古怪，\n  但我還挺喜歡的，\n  你懂嗎？"
                 ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#k/5}* Well, I suppose I'll move my store to the new homeworld...",
                    "<32>{#k/4}* ... haven't planned much more than that, I'm afraid."
                 ]
               : [
                    '<32>{#p/basic}* 生活總是一成不變。',
                    '<32>{#k/5}* 雖然有點孤單...',
                    "<32>{#k/10}* 但是... 在我們內心深處\n  都知道自由即將到來，\n  不是嗎？",
                    '<32>{#k/9}* 只要我們心存希望，\n  我們就能咬緊牙關，\n  日復一日地面對\n  同樣的困難...',
                    "<32>{#k/0}* 這就是生活啊，不是嗎？"
                 ]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },

   c_name_starton: {
      papyrus: () =>
         SAVE.data.n.plot_date < 2 || (SAVE.data.n.exp > 0 && SAVE.data.b.a_state_fishbetray)
            ? "給帕派瑞斯打電話"
            : '帕派瑞斯和安黛因'
   },

   c_call_papyrus: <Partial<CosmosKeyed<CosmosProvider<string[]>>>>{
      s_start: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}啊，在星港邊緣的\n那條孤獨的路。',
            '<18>{#p/papyrus}{#f/5}它可能看起來有點大，\n有點空，但是...',
            '<18>{#p/papyrus}{#f/0}我對它有許多\n美好的回憶！',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}就比如，在我還是\n骷髏寶寶的時候...',
                    '<18>{#p/papyrus}{#f/0}衫斯和我在這條路上\n並排開懸浮車，比誰\n開得快。'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* 比如呢？',
                    '<18>{#p/papyrus}{#f/0}比如我和衫斯\n之前開懸浮車比賽！',
                    "<18>{#p/papyrus}{#f/5}我們在路上飛馳，\n並肩賽車..."
                 ]),
            '<18>{#p/papyrus}{#f/4}可惜，不管我\n多努力嘗試...',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/7}他總是會在\n終點線等我！',
                    '<18>{#p/papyrus}{#f/5}你可以想像\n我有多沮喪。'
                 ]
               : [
                    '<25>{#p/undyne}{#f/17}* 他總能在最後贏了你？',
                    "<25>{#p/undyne}{#f/4}* 是啊，那是因為\n  他是個作弊慣犯。",
                    '<25>{#p/undyne}{#f/5}* 你有看到過他在\n  打靶機上的高分嗎？',
                    "<25>{#p/undyne}{#f/8}* 那簡直，是個天文數字\n  什麼的！！",
                    '<18>{#p/papyrus}{#f/4}喔，相信我。\n這事我可太清楚了。',
                    "<18>{#p/papyrus}{#f/7}我真希望他\n不要在那樣的\n事情上作弊！",
                    '<18>{#p/papyrus}{#f/7}這把其他人的\n遊戲體驗全都\n毀掉了。',
                    '<25>{#p/undyne}{#f/1}* 或者說...',
                    '<25>{#p/undyne}{#f/8}* 它可能只是提供了一個\n  更有趣的挑戰！！',
                    '<18>{#p/papyrus}{#f/4}...不。'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/5}衫斯他...\n總是喜歡走捷徑。',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/4}我懷疑他獲勝\n跟這個有很大關係。' ]
               : [ "<18>{#p/papyrus}{#f/4}這幾乎可以\n說是自然法則了。" ])
         ]
      ),
      s_sans: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}然後這個，\n是衫斯的哨站。",
            '<18>{#p/papyrus}{#f/5}...',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}我前幾天聽到他說...',
                    '<18>{#p/papyrus}{#f/6}...要幫哪個人去\n避開其他守衛。',
                    "<18>{#p/papyrus}{#f/5}我雖然不太能確定，\n但我感覺...",
                    "<18>{#p/papyrus}{#f/5}我兄弟...\n該不會是什麼\n特務吧？",
                    '<18>{#p/papyrus}{#f/4}...',
                    '<18>{#p/papyrus}{#f/4}...或者應該叫\n叛賊？'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/5}...我還有什麼\n可說的嗎？',
                    "<25>{#p/undyne}{#f/17}* 帕派瑞斯，你有沒有...\n  呃... 往上看過？",
                    '<18>{#p/papyrus}{#f/6}什麼！？',
                    "<18>{#p/papyrus}{#f/7}你知道我沒時間\n那樣子的！",
                    "<25>{#p/undyne}{#f/1}* 但你根本沒想抓任何人。",
                    '<18>{#p/papyrus}{#f/6}我-我當然想！\n只是... 不是你想的\n那樣！！'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}「特務」和「叛賊」...',
                    '<18>{#p/papyrus}{#f/1}...難不成我兄弟\n其實是只烏賊！？'
                 ]
               : [ "<18>{#p/papyrus}{#f/4}這哨站是...\n方形的。" ]
      ),
      s_crossroads: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}最近，大家一直\n在外面留便條。',
            '<18>夢想、願望、\n浪漫的告白...',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/9}我個人覺得，\n這真的很棒！",
                    "<18>{#p/papyrus}{#f/0}很高興能看到大家\n都在努力。",
                    '<18>{#p/papyrus}{#f/4}至於我兄弟，就...',
                    "<18>{#p/papyrus}{#f/4}他覺得那幫傢伙\n都是在白{@fill=#ff0}月{@fill=#fff}做夢。"
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
               ? [ '<18>{#p/papyrus}我想知道如果\n月亮在軌道上的話，\n生活會是什麼樣子。' ]
               : [ "<18>{#p/papyrus}DON'T YOU HAVE ANY HOPES AND DREAMS TO SHARE?" ]
      ),
      s_human: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}關於我那個\n精彩的演講...',
            '<18>{#p/papyrus}{#f/0}巧合的是，\n我第一次練習就是\n在這個地方。',
            '<18>{#p/papyrus}{#f/9}當然，衫斯也在！',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}但是我們一直在爭\n我們到底該站哪邊。' ]
               : [
                    "<25>{#p/undyne}{#f/14}* 你們肯定沒\n  爭起來吧。",
                    '<18>{#p/papyrus}{#f/0}啊，正好相反。',
                    '<18>{#p/papyrus}{#f/0}我們經常爭起來！'
                 ]),
            "<18>{#p/papyrus}{#f/4}我會朝一個方向轉，\n說我這樣比較好...",
            "<18>{#p/papyrus}{#f/4}然後他再轉過來，\n說他的方向更好。",
            '<18>{#p/papyrus}{#f/6}我們爭啊爭，\n最後我們倆都轉得\n越來越快。',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}從那以後，\n這就成了我們的\n一種儀式。" ]
               : [
                    '<25>{#p/undyne}{#f/1}* ...難怪我之前在屋外\n  看到了那個場景。',
                    '<18>{#p/papyrus}{#f/1}你看到啥了！？',
                    '<18>{#p/papyrus}{#f/6}呃，等下，\n你聽我解釋...',
                    '<18>{#p/papyrus}{#f/5}我想說，\n衫斯只是擔心...\n呃...',
                    "<18>{#p/papyrus}{#f/6}...擔心我在那\n花上太多時間！",
                    '<18>{#p/papyrus}{#f/6}是這樣的！！',
                    "<25>{#p/undyne}{#f/16}* ...他是你兄弟，是吧？",
                    "<25>{#p/undyne}{#f/1}* 他可能只是想讓你\n  多陪陪他。"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}有趣的事實吧？',
                    '<18>{#p/papyrus}{#f/0}如果把我們的\n旋轉速度\n疊加起來...',
                    "<18>{#p/papyrus}{#f/0}結果實際上就是\n零了。",
                    '<18>{#p/papyrus}{#f/4}...因為我們總是\n朝相反的方向轉。'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}畢竟，\n與家人共度時光\n很重要。',
                    '<18>{#p/papyrus}{#f/9}有的時候\n甚至需要用\n飛行魔法！'
                 ]
      ),
      s_papyrus: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}捏嘿嘿！！\n被吸引住了吧！？！',
            '<18>{#p/papyrus}{#f/0}我不僅擅長謎題...',
            "<18>{#p/papyrus}{#f/9}我也是一個受人\n尊敬的建築師！！",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}我打算加入\n皇家守衛後再建\n更多這種東西。' ]
               : [
                    '<25>{#p/undyne}{#f/1}* 你知道嗎，我之前\n  考慮過把你的「哨站」\n  翻新一下...',
                    '<25>{#p/undyne}{#f/14}* Like... a surprise gift!',
                    '<18>{#p/papyrus}{#f/4}你說啥？',
                    "<25>{#p/undyne}{#f/12}* 但是，呃，\n  那樣就破壞完美了。",
                    '<18>{#p/papyrus}{#f/5}你說完美？',
                    '<18>{#p/papyrus}{#f/6}但是你之前說過\n事情總是可以\n變得更好的！',
                    '<25>{|}{#p/undyne}{#f/17}* 呃... 是這樣沒錯啦！\n* 我的意思是- {%}',
                    '<18>{#p/papyrus}幾乎完美。\n這樣說可以吧。',
                    '<25>{#p/undyne}{#f/12}* 說得好。'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}我希望衫斯能\n幫我找到更好的\n建材。",
                    '<18>{#p/papyrus}{#f/6}紙箱子頂多\n就這樣了！！'
                 ]
               : [ '<18>{#p/papyrus}人類，謝謝你...', '<18>可以當我\n幾乎完美的\n朋友。' ]
      ),
      s_doggo: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}遁狗的哨站...',
            '<18>{#p/papyrus}{#f/5}那天，在和其他狗狗\n發生了一件事\n之後...',
            "<18>{#p/papyrus}{#f/5}他告訴我他再也\n沒有家的感覺了。",
            '<18>{#p/papyrus}{#f/0}所以我給了他一個\n擁抱，告訴他\n說出來就好。',
            '<18>{#p/papyrus}{#f/4}當然，犬衛隊\n都很通情達理。',
            "<18>{#p/papyrus}{#f/0}事情一點點好起來\n也一點都不奇怪！",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* 啊對，我還記得\n  那件事...',
                    '<25>{#p/undyne}{#f/22}* 他，呃...\n* 他在想...',
                    '<18>{#p/papyrus}{#f/5}想什麼...？',
                    '<25>{#p/undyne}{#f/9}* ...謝謝你一直支援它。',
                    "<25>{#p/undyne}{#f/16}* 沒有你，它可能就...",
                    '<18>{#p/papyrus}{#f/6}啥？\n可能怎麼樣？？',
                    '<25>{#p/undyne}{#f/12}* ...呃，他可能就\n  辭去守衛一職很久了。',
                    '<18>{#p/papyrus}{#f/0}喔，好吧。',
                    '<18>{#p/papyrus}{#f/5}那就真的\n太糟糕了...'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}善良【真的】是\n一種美德！' ]
               : [ '<18>{#p/papyrus}{#f/9}沒有一條狗\n能在我眼皮底下\n辭職皇家守衛！' ]
      ),
      s_robot: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}作為一個建築機器人\n生活一定很艱難吧。',
            '<18>{#p/papyrus}{#f/5}對那些智能\n比較人工的傢伙\n好一點。',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* 是啊... 尤其是一個\n  住在前哨站的機器人。',
                    '<25>{#p/undyne}{#f/9}* 我覺得我們\n  都知道原因。',
                    '<18>{#p/papyrus}{#f/5}太不幸了。',
                    "<25>{#p/undyne}{#f/17}* 但是，嘿！\n* 也不全是壞事！！",
                    '<25>{#p/undyne}{#f/14}* 畢竟，他們的晶片\n  可以直接轉移到\n  一臺新電腦上。',
                    '<18>{#p/papyrus}{#f/0}喔！喔！\n我應該懂了！',
                    "<18>{#p/papyrus}{#f/0}這樣他們就可以\n上域外網了！",
                    '<18>{#p/papyrus}{#f/0}還有天文\n觀測網路！',
                    '<18>{#p/papyrus}{#f/0}還有更多更多！'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}你永遠不知道\n他們會孤獨多久！！" ]
               : [
                    "<18>{#p/papyrus}{#f/0}不知道他們\n能不能看到我的\n瀏覽記錄。",
                    '<18>{#p/papyrus}{#f/4}全都是生\n義大利麵條的\n圖片...'
                 ]
      ),
      s_maze: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}我懂，我懂，\n我知道我的謎題\n是有點難...',
            ...(SAVE.data.b.papyrus_fire
               ? [
                    '<18>{#p/papyrus}{#f/9}但只要把它想像成\n一次學習的經歷\n就好！',
                    '<18>{#p/papyrus}{#f/0}這是個對品格\n而非技能的考驗。',
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
            '<18>{#p/papyrus}狗來米和\n狗媳兒的\n哨站...',
            '<18>{#p/papyrus}{#f/0}有時候我想知道\n和狗結婚是什麼\n感覺。',
            "<18>{#p/papyrus}{#f/4}雖然，我是永遠\n都不可能知道了，\n因為...",
            "<18>{#p/papyrus}{#f/9}我只願意娶一個\n帥氣的骷髏！",
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
                    "<18>{#p/papyrus}{#f/6}什麼！？！？\n我們不能結婚！！",
                    ...(SAVE.data.b.flirt_papyrus
                       ? [ "<18>{#p/papyrus}{#f/0}我們都說好了\n是不會有結果的，\n還記得嗎？" ]
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
            '<18>{#p/papyrus}{#f/0}這個房間過去是\n用一座橋連接的。',
            '<18>{#p/papyrus}{#f/4}左右兩半，\n在中心相連...',
            '<18>{#p/papyrus}{#f/9}就像兩個很勇敢的\n骷髏的靈魂！',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}...',
                    "<18>{#p/papyrus}{#f/5}我不知道衫斯現在\n在想什麼...",
                    "<18>{#p/papyrus}{#f/4}但我覺得肯定跟\n調味品有很大關係。",
                    "<18>{#p/papyrus}{#f/5}要是他不再對調味品\n念念不忘就好了...",
                    '<18>{#p/papyrus}{#f/7}不然我就得\n好好用雅莫醬\n{@fill=#ff0}醬{@fill=#fff}他一軍了！！'
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
                    '<18>{#p/papyrus}{#f/5}我希望我還能有\n別的話可說...',
                    "<18>{#p/papyrus}{#f/4}但我現在滿腦子想的\n都是調味品的事。"
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
            '<18>{#p/papyrus}{#f/4}衫斯很喜歡那些\n找不同的謎題...',
            '<18>{#p/papyrus}{#f/5}我之前做的找不同\n都很簡單。',
            "<18>{#p/papyrus}{#f/7}但最近的謎題\n都要變得幾乎\n不可能找到了！",
            '<18>{#p/papyrus}{#f/4}如果不對圖像像素\n進行像素掃描...',
            "<18>{#p/papyrus}{#f/7}根本就沒人能\n解決！",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/7}太荒謬了！" ]
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
                    '<18>{#p/papyrus}{#f/4}你在尋求\n我的幫助嗎？',
                    '<18>{#p/papyrus}{#f/7}啊，算了！',
                    "<18>{#p/papyrus}{#f/0}反正，\n不公平的謎題\n不值得去解。"
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
            '<18>{#p/papyrus}{#f/0}有人說那房間裡的\n微波爐...',
            '<18>{#p/papyrus}{#f/0}有一個所謂的\n「隱藏功能」。',
            '<18>{#p/papyrus}{#f/5}不過，大多數人\n不知道的是...',
            '<18>{#p/papyrus}{#f/4}它發出的「微」波...\n實際上是\n「微」小的引力波。',
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
               ? [ '<18>{#p/papyrus}{#f/0}要是有辦法把它\n關掉就好了。' ]
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
            '<18>{#p/papyrus}嗯... 這個\n謎題的解法...？',
            '<18>{#p/papyrus}{#f/5}呃，有的時候\n我就直接從雷射上\n跨過去了。',
            '<18>{#p/papyrus}{#f/0}所以，其中一個解法\n就是要又高又帥！',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}...如果你個子太小\n絕對不要這樣做。" ]
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
               ? [ "<18>{#p/papyrus}{#f/4}我正在解決\n這個問題..." ]
               : [
                    '<18>{#p/papyrus}{#f/5}HMM...',
                    '<18>{#p/papyrus}{#f/0}UNDYNE SHOULD PROBABLY INVEST IN A TELESCOPE.',
                    '<18>{#p/papyrus}{#f/4}I HEARD MY BROTHER WAS OFFERING MEMBERSHIPS...'
                 ]
      ),
      s_puzzle2: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}有人告訴我說\n這些謎題有一個\n訣竅...",
            "<18>{#p/papyrus}{#f/5}涉及到在瓷磚上\n顯示的內容。",
            '<18>{#p/papyrus}{#f/6}...我還以為這是個\n猜謎遊戲呢！',
            '<18>{#p/papyrus}{#f/0}我猜你今天又\n學到了一些新知識。',
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
               ? [ "<18>{#p/papyrus}{#f/4}等下，這是我\n兄弟的臺詞..." ]
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
                    "<18>{#p/papyrus}{#f/5}起初，這個謎題\n結果讓我\n大失所望...",
                    '<18>{#p/papyrus}{#f/4}但後來，我就\n意識到了...',
                    '<18>{#p/papyrus}{#f/0}發生這種事情的\n概率很低...',
                    '<18>{#p/papyrus}{#f/9}...所以我們可能是\n唯一看到的人！！',
                    '<18>{#p/papyrus}{#f/0}你現在覺得\n很幸運了吧。',
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
                            '<18>{#p/papyrus}{#f/4}喔。',
                            '<18>{#p/papyrus}{#f/7}... SO YOU WERE SPYING ON THE HUMAN!?!?',
                            "<25>{#p/undyne}{#f/17}* I'm the captain of the Royal Guard!!\n* What do you think!"
                         ])
                 ],
         () =>
            solo()
               ? SAVE.data.b.s_state_puzzlenote
                  ? [ '<18>{#p/papyrus}{#f/5}OH, HOW MUCH WE DO NOT YET OR NO LONGER KNOW...' ]
                  : [ '<18>{#p/papyrus}幸運女神站在我們\n這邊，人類！' ]
               : SAVE.data.b.s_state_puzzlenote
               ? [ '<18>{#p/papyrus}{#f/5}MONSTER BIOLOGY IS WEIRD.' ]
               : [ '<18>{#p/papyrus}JOKE OR NOT, IT WAS STILL PRETTY LUCKY, HUH?' ]
      ),
      s_pacing: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}小犬座的\n哨站。',
            '<18>{#p/papyrus}{#f/4}也是那些月巖商人\n喜歡的地方。',
            '<18>{#p/papyrus}{#f/5}嗯... 我想知道\n那些巖石都是用\n什麼做成的。',
            "<18>{#p/papyrus}{#f/4}肯定不是用\n月亮做的，\n因為...",
            '<18>{#p/papyrus}{#f/7}月亮本身就是個\n巨大的巖石啊！',
            '<18>{#p/papyrus}{#f/5}這是不是就意味著\n月亮本身就是\n月巖呢？',
            '<18>{#p/papyrus}{#f/5}那「月亮」和「月巖」\n區別在哪？',
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
               ? [ '<18>{#p/papyrus}{#f/4}也許我們凡人\n不值得了解這些\n知識。' ]
               : [ '<25>{#p/undyne}{#f/12}* Just call me \"pundyne.\"', "<18>{#p/papyrus}{#f/0}PLEASE DON'T." ]
      ),
      s_puzzle3: pager.create(
         0,
         [
            '<18>{#p/papyrus}{#f/5}所以...\n這裡發生的事...',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/4}咱還是別提\n這個謎題了吧。"
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
            '<18>{#p/papyrus}大犬座的\n哨站...',
            '<18>{#p/papyrus}{#f/5}那隻狗有一顆\n金子般的心。',
            '<18>{#p/papyrus}{#f/4}要是【我】加入\n皇家守衛就好了...',
            "<18>{#p/papyrus}{#f/0}這樣我就能\n報答它的好意了！",
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
               ? [ "<18>{#p/papyrus}{#f/5}真可惜我可能\n永遠加入不了\n皇家守衛了。" ]
               : [ '<18>{#p/papyrus}{#f/7}NOTHING WILL EVER REPLACE FACE-TO- FACE CONVERSATION!' ]
      ),
      s_math: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}數學【一直】是\n我最頭疼的東西。',
            '<18>{#p/papyrus}{#f/5}又是微積分，\n又是幾何學...',
            '<18>{#p/papyrus}{#f/4}用手指骨查數\n都跑哪去了？',
            '<18>{#p/papyrus}{#f/7}所有的「高等」數學\n都是完全沒有\n必要的！',
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
            '<18>{#p/papyrus}{#f/0}如果你真的需要\n高等數學方面的\n幫助...',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}那就沒有比\n艾菲斯博士更\n適合的人選了！",
                    "<18>{#p/papyrus}{#f/4}大家都說她像個\n行走的計算器...",
                    '<18>{#p/papyrus}{#f/0}而且是很科學的\n那種！'
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
            '<18>{#p/papyrus}還記得那個\n「致命恐怖的挑戰」嗎？',
            '<18>{#p/papyrus}{#f/4}不知道你信不信，\n其實還有一個\n秘密的第七個武器。',
            "<18>{#p/papyrus}{#f/6}那東西真的會讓你\n魂飛魄散的！",
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
               ? [ '<18>{#p/papyrus}{#f/6}...字面意義上的！！' ]
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
            '<18>{#p/papyrus}星港小鎮：\n北側！',
            "<18>{#p/papyrus}{#f/5}是我不會花很多\n時間的一側。",
            '<18>{#p/papyrus}{#f/4}然而，衫斯就...',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/4}...好吧，你可以\n大概猜一下他為什麼\n喜歡這裡。' ]
               : [
                    "<25>{#p/undyne}{#f/14}* ... enjoys the new and improved food they're selling at Grillby's!",
                    '<18>{#p/papyrus}{#f/4}NEW AND IMPROVED, YOU SAY?',
                    '<18>{#p/papyrus}{#f/5}I SUPPOSE IT -IS- BETTER THAN BEFORE...',
                    '<18>{#p/papyrus}{#f/7}BUT STILL NOTHING COMPARED TO HOME- COOKED PASTA!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}跟烤爾比是\n有關係的喔。" ]
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
                    '<18>{#p/papyrus}{#f/0}今天運輸船\n還開嗎？',
                    '<18>{#p/papyrus}{#f/5}嗯... 一般來說\n晚些時候會\n過來的。'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}I HEARD THE TAXI IS FINALLY OUT!',
                    "<18>{#p/papyrus}{#f/5}HMM... THAT MUST MEAN WE'RE IN THE LATER HOURS."
                 ]),
            '<18>{#p/papyrus}{#f/6}至於如何分辨\n「早些時候」和\n「晚些時候」...',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}...我回頭再\n跟你講。" ]
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
               ? [ '<18>{#p/papyrus}{#f/6}會講的！！！' ]
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
            '<18>{#p/papyrus}星港小鎮：\n南側！',
            '<18>{#p/papyrus}{#f/4}或者我也喜歡\n叫做...',
            '<18>{#p/papyrus}{#f/9}宇宙中最好的\n一側！',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* No doubt because YOU live there.',
                    '<18>{#p/papyrus}{#f/4}NOT ONLY THAT...',
                    "<18>{#p/papyrus}{#f/0}IT'S ALSO THE SIDE THAT DOESN'T HAVE GRILLBY'S ON IT!!"
                 ])
         ],
         [
            "<18>{#p/papyrus}{#f/4}難怪會有一個\n友好的幽靈\n在這裡開店...",
            "<18>{#p/papyrus}{#f/9}誰不想接近\n這偉大的一邊呢？",
            "<18>{#p/papyrus}{#f/0}我肯定是\n沒法抗拒的。"
         ]
      ),
      s_battle: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}你正站在我們\n傳奇的戰場上？',
            "<18>{#p/papyrus}{#f/0}不不，更新一下。\n這是個具有歷史\n價值的地方。",
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
               ? [ "<18>{#p/papyrus}{#f/4}總有一天他們會\n把這件事放進\n博物館的..." ]
               : [
                    '<25>{#p/undyne}{#f/1}* Regardless of what happens now...',
                    '<25>{#p/undyne}{#f/7}* You better not have a battle more legendary than OURS!',
                    '<25>{#p/undyne}{#f/14}* Not unless I get to be a part of it!\n* Fuhuhu!'
                 ]
      ),
      s_exit: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}你現在得\n小心點...',
            '<18>{#p/papyrus}{#f/0}那邊那扇門是\n鑄廠的入口。',
            '<18>{#p/papyrus}{#f/5}在這樣的地方\n等待你的只有\n黑暗。',
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
               ? [ '<18>{#p/papyrus}{#f/6}我剛才提到過\n等待著你的黑暗\n了嗎？' ]
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
            "<18>{#p/papyrus}{#f/5}所以...\n這裡是烤爾比。",
            '<18>{#p/papyrus}{#f/5}他們真的安了臺\n雅莫萬用醬\n噴醬機嗎...',
            "<18>{#p/papyrus}{#f/6}就只是為了滿足\n我兄弟奇怪的\n念頭？",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/13}* A what?',
                    '<18>{#p/papyrus}{#f/4}A YAMOK SAUCE MACHINE.',
                    '<18>{#p/papyrus}{#f/4}YOU KNOW, TO DISPENSE YAMOK SAUCE.'
                 ]),
            '<18>{#p/papyrus}{#f/4}...',
            '<18>{#p/papyrus}{#f/4}我通常都對\n我們一族\n抱有希望的，但...',
            '<18>{#p/papyrus}{#f/4}遇到這種事\n就不行了。',
            '<18>{#p/papyrus}{#f/5}...不過。',
            "<18>{#p/papyrus}{#f/5}還好他們把點唱機\n修好了。",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* I KNOW RIGHT!?',
                    "<25>{#p/undyne}{#f/7}* That thing's been broken since before I was BORN."
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}第三首是我個人\n最喜歡的。',
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/1}* Mine's track four!" ])
         ]
      ),
      s_backrooms: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/4}自從他們在這裡\n使用複製器開始...',
            "<18>{#p/papyrus}{#f/5}我就不知道\n怎麼看待這件事\n才算好了。",
            '<18>{#p/papyrus}{#f/0}一方面，\n這種新食物\n確實健康。',
            "<18>{#p/papyrus}{#f/7}但另一方面，\n他們完全把烹飪\n放棄掉了！",
            "<18>{#p/papyrus}{#f/4}看到你現在\n所在的這個\n房間了嗎？",
            '<18>{#p/papyrus}{#f/7}猜猜它過去\n是幹什麼的吧！',
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
                    '<18>{#p/papyrus}{#f/4}是某種「廚房」...',
                    '<18>{#p/papyrus}{#f/5}現在他們只把這裡\n當成玩私人紙牌\n遊戲的地方了。'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/4}IF THEY'RE NOT GOING TO USE THIS AS A KITCHEN...",
                    '<18>{#p/papyrus}{#f/5}PERHAPS A HEADPAT MACHINE WOULD BE A BETTER INVESTMENT.'
                 ]
      ),
      s_bonehouse: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}還有什麼地方能\n比我家更好呢！',
            "<18>{#p/papyrus}{#f/0}我們有超高水槽...\n還有寵物月巖...",
            '<18>{#p/papyrus}{#f/9}甚至還有個陽臺，\n多適合戶外生活！',
            "<18>{#p/papyrus}{#f/0}我基本只有在這\n才會有家的感覺。",
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
            '<18>{#p/papyrus}{#f/0}不知道現在\n人類是怎麼稱呼\n「家」的。',
            '<18>{#p/papyrus}{#f/4}據我所知，\n他們還生活在\n地球上...',
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
                    '<18>{#p/papyrus}哇，你只花了四秒鐘\n就給我打電話了！',
                    '<18>你一定非常需要\n我的幫助！！！',
                    "<18>{#p/papyrus}{#f/9}但不要害怕。\n這是帕派瑞斯的\n熱線電話！",
                    '<18>{#p/papyrus}{#f/9}只需要描述一下\n你的位置，然後...',
                    '<18>{#p/papyrus}{#f/4}... WAIT.',
                    "<18>{#p/papyrus}{#f/6}你還在我的\n房間裡？？",
                    '<18>{#p/papyrus}{#f/5}...',
                    '<18>{#p/papyrus}{#f/5}你有沒有聽說過一種\n叫做... 門的東西？',
                    "<18>{#p/papyrus}{#f/6}別著急！！\n我會給你畫個\n圖解的！"
                 ]
               : SAVE.data.n.plot_date < 1.2
               ? [
                    "<18>{#p/papyrus}{#f/1}啥？？\n我以為你早就\n離開我房間了！！",
                    "<18>{#p/papyrus}{#f/4}看來我們得\n從頭開始了...",
                    '<18>{#p/papyrus}{#f/5}首先，你還知道\n帕派瑞斯是\n誰嗎！？'
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
               ? [ "<18>{#p/papyrus}{#f/6}堅持住！\n我還在畫！" ]
               : SAVE.data.n.plot_date < 1.2
               ? [ '<18>{#p/papyrus}{#f/1}【我】還知道\n帕派瑞斯是\n誰嗎！？！？' ]
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
            "<18>{#p/papyrus}旅館是個好地方。",
            '<18>{#p/papyrus}床很舒服，\n旅館的老闆娘\n人就更好了。',
            '<18>{#p/papyrus}{#f/5}但我最喜歡的，\n還是牆上的那個\n照片...',
            "<18>{#p/papyrus}{#f/0}它時刻提醒我們\n怪物的真正能耐\n是怎樣的。",
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
               ? [ '<18>{#p/papyrus}{#f/5}要是我們能回到\n過去就好了...' ]
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
            '<18>{#p/papyrus}有的時候，\n衫斯會給我讀一個\n睡前故事。',
            '<18>{#p/papyrus}{#f/5}你聽說過\n《偉大的怪物》嗎？',
            '<18>{#p/papyrus}{#f/6}衫斯昨晚給我講了\n這個故事，然後...',
            "<18>{#p/papyrus}{#f/8}...呃啊！\n我就哭得\n停不下來了！",
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
            "<18>{#p/papyrus}{#f/4}下一次，我就讓\n衫斯講一個\n開心的故事了。",
            '<18>{#p/papyrus}{#f/6}要有一個\n【真正】意義上的\n幸福結局！',
            '<18>{#p/papyrus}{#f/5}每個人都該\n適得其所！！',
            '<18>{#p/papyrus}{#f/7}每個人都不用\n失去性命，\n不用道別！！！'
         ]
      ),
      s_librarby: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/6}噓...\n（圖書倌裡是不能\n打電話的！）',
            "<18>{#p/papyrus}{#f/0}（不過可以等你出來\n之後再給我打\n電話！）",
            ...(solo() ? [] : [ '<25>{|}{#p/undyne}{#f/8}* YEAHHHH MAKE SOME NOI- {%}' ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}（你認真的嗎...）' ]
               : [
                    '<18>{#p/papyrus}{#f/4}(YES, I HUNG UP TO STOP UNDYNE FROM DISTURBING YOU.)',
                    '<25>{|}{#p/undyne}{#f/8}* YEA- {%}'
                 ]
      ),
      f_start: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}看看鑄廠裡\n這不祥的氣氛。',
            '<18>{#p/papyrus}{#f/4}他們說管道裡\n住著怪物...',
            "<18>{#p/papyrus}{#f/0}說得絕對沒錯！",
            '<18>{#p/papyrus}{#f/5}有些怪物確實喜歡\n潮溼骯髒的環境。',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}我就不一樣！！' ]
               : [
                    "<25>{#p/undyne}{#f/1}* I hope they don't mind me using the pipes as a jungle gym.",
                    '<25>{#p/undyne}{#f/8}* I used to swing on them all the time!',
                    '<18>{#p/papyrus}{#f/6}UNDYNE, NO!\nTHOSE POOR, POOR PIPE DWELLERS!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}我更喜歡在生活中\n衛生一點。' ]
               : [ '<18>{#p/papyrus}{#f/6}BE CAREFUL WHERE YOU JUNGLE GYM.' ]
      ),
      f_sans: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}我兄弟在這\n有一個工作站。',
            '<18>{#p/papyrus}{#f/4}事實上，\n他同時管理兩個站點。',
            "<18>{#p/papyrus}{#f/0}很驚人，是吧？",
            '<18>{#p/papyrus}{#f/0}他偷懶的次數\n是平時的兩倍！！',
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
               ? [ '<18>{#p/papyrus}{#f/5}我們醒著的人只能\n夢想擁有這樣的\n懶惰...' ]
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
            "<18>{#p/papyrus}你的次元箱裡\n有什麼？",
            "<18>{#p/papyrus}{#f/4}實際上，\n不用告訴我。",
            "<18>{#p/papyrus}{#f/7}不然就是公然\n侵犯你的隱私了！",
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
               ? [ '<18>{#p/papyrus}{#f/4}...至少告訴我\n不是「狗剩」就行。' ]
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
            "<18>{#p/papyrus}{#f/4}大家都說最好不要\n惹那條睡覺的狗...",
            '<18>{#p/papyrus}{#f/7}但是，說真的，\n我不同意！',
            '<18>{#p/papyrus}{#f/5}畢竟...',
            '<18>{#p/papyrus}{#f/6}一條好狗應該把\n誠實看得比什麼\n都重要！',
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
               ? [ '<18>{#p/papyrus}{#f/4}要是我水槽下面的\n那條狗有這樣的\n優先權就好了...' ]
               : [ '<18>{#p/papyrus}{#f/0}WHEN IN DOUBT, JUST TALK IT OUT.', '<18>{#p/papyrus}{#f/9}WORKS EVERY TIME!' ]
      ),
      f_puzzle1: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}小心古人的\n塔架謎題！',
            '<18>{#p/papyrus}{#f/4}雖然他們的建造方法\n很簡陋...',
            '<18>{#p/papyrus}{#f/6}但是設計卻很複雜！',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}我們這些怪物\n能解決這些謎題\n可真是個奇蹟。" ]
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
               ? [ '<18>{#p/papyrus}{#f/0}我好奇人類會不會\n被怪物的謎題難住。' ]
               : [ '<18>{#p/papyrus}{#f/0}HEH! NOT ALL HUMANS ARE BAD!' ]
      ),
      f_quiche: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}我哥哥前幾天\n來過這裡...',
            '<18>{#p/papyrus}{#f/5}說他得送點\n東西過來。',
            '<18>{#p/papyrus}{#f/5}我問他要送什麼，\n他給了我一個挑戰...',
            '<18>{#p/papyrus}{#f/4}說要讓我想\n一{@fill=#ff0}支世{@fill=#fff}俗的笑話。',
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
         [ "<18>{#p/papyrus}{#f/6}等我想到答案了\n很快就來找你！" ]
      ),
      f_puzzle2: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}通常情況下，\n如果你沒花時間\n好好讀標牌的話...',
            "<18>{#p/papyrus}{#f/5}你可能是解不開\n謎題的。",
            "<18>{#p/papyrus}{#f/6}你以為僅憑直覺就\n可以了，但是...\n完全不夠！",
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}...我已經沒少\n因為這個尷尬了..." ]
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
                    "<18>{#p/papyrus}{#f/0}我以前說過，\n我還要再說一遍。",
                    '<18>{#p/papyrus}{#f/9}讀！\n標！！\n牌！！！',
                    '<18>{#p/papyrus}{#f/4}注意我的感嘆號\n用得越來越多。',
                    "<18>{#p/papyrus}{#f/7}意思就是說這\n非常重要！！！！"
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
            '<18>{#p/papyrus}{#f/0}訊星真的很厲害，\n對吧？',
            '<18>{#p/papyrus}{#f/5}不過，它們會\n周期性地重置。',
            '<18>{#p/papyrus}{#f/4}在重置之前，\n只能保留一條訊息...',
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
         [ "<18>{#p/papyrus}{#f/4}這通電話\n【應該】不會被錄下來吧。" ]
      ),
      f_prechase: pager.create(
         0,
         () =>
            SAVE.data.n.plot < 37.11
               ? []
               : SAVE.data.n.plot < 48
               ? [
                    '<18>{#p/papyrus}這裡以前有一座橋的，\n但是橋塌了。',
                    "<18>{#p/papyrus}{#f/5}希望他們很快能\n建一座新橋...",
                    '<18>{#p/papyrus}{#f/6}站在一個脆弱的\n浮動平臺上\n太嚇人了！'
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
            '<18>{#p/papyrus}{#f/0}沒有什麼比一座...',
            '<18>{#p/papyrus}{#f/0}既堅固，又穩定，\n設計又合理的橋\n更安全的了。',
            '<18>{#p/papyrus}{#f/9}這是對一流工程\n技術的真正證明！！'
         ]
      ),
      f_chase: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}當我第一次看到\n這個房間時，\n我真的很驚訝。',
            "<18>{#p/papyrus}{#f/4}驚訝到，我找不到\n出去的路了。",
            '<18>{#p/papyrus}{#f/6}...就更別說這裡的\n陷阱了！',
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
               ? [ '<18>{#p/papyrus}{#f/5}我覺得還是避開\n恐怖的迷宮遊戲\n比較好。' ]
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
            "<18>{#p/papyrus}{#f/0}你現在在一個叫做...",
            '<18>{#p/papyrus}{#f/9}「暗區」的地方。',
            "<18>{#p/papyrus}{#f/4}你肯定想不到\n它名字的來歷的...",
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
               ? [ '<18>{#p/papyrus}{#f/4}劇透警告...', "<18>{#p/papyrus}{#f/4}...因為裡面非常暗。" ]
               : [ "<18>{#p/papyrus}{#f/0}AREN'T THINGS BETTER WHEN YOU UNDERSTAND THEM?" ]
      ),
      f_lobby: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/6}我現在... 完全...\n聯繫不上你！",
            "<18>{#p/papyrus}{#f/6}手機... 絕對...\n出故障了！",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}...',
                    "<18>{#p/papyrus}{#f/4}好吧，我承認其實\n並沒有故障。",
                    '<18>{#p/papyrus}{#f/0}...但那臺桌子肯定\n故障了！'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* So would you say the call\'s getting \"sliced\" or \"shredded?\"',
                    "<18>{#p/papyrus}{#f/5}UNFORTUNATELY, IT'S SOMETHING FAR MORE DREADED."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/5}不過，講真的，\n那東西到底是\n什麼情況啊？" ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S ENCOURAGING UNDYNE TO MAKE CHEESE PUNS." ]
      ),
      f_error: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}這件房間標誌著\n你的旅程已經走了一半...',
            '<18>{#p/papyrus}{#f/0}也就是從星港出發開始...',
            '<18>{#p/papyrus}{#f/0}到空境第一層的盡頭。',
            '<18>{#p/papyrus}{#f/5}...不管你接下來\n要去哪裡...',
            '<18>{#p/papyrus}{#f/6}你的旅程【至少】\n已經走完一半了！',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/4}* What!?\n* Don't say it like THAT!",
                    "<18>{#p/papyrus}{#f/6}I-I MEAN, YOUR JOURNEY'S JUST GETTING STARTED!",
                    "<18>{#p/papyrus}{#f/6}THERE'S STILL PLENTY OF THINGS TO SEE!",
                    '<18>{#p/papyrus}{#f/6}AND PLENTY OF PLACES TO BE!',
                    '<18>{#p/papyrus}{#f/4}最終...',
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
            '<18>{#p/papyrus}{#f/0}我哥哥在這裡經營\n望遠鏡生意。',
            '<18>{#p/papyrus}{#f/5}訂閱、會員、\n註冊、開券...',
            "<18>{#p/papyrus}{#f/6}這是個無窮無盡的\n條款和條件的迷宮！",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}我曾經試過報名，\n但是...',
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
         [ '<18>{#p/papyrus}{#f/4}愛搞惡作劇的人\n總會把事情搞複雜...' ]
      ),
      f_bird: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/9}最是聲名狼藉的。',
            '<18>{#p/papyrus}{#f/9}最是無所畏懼的。',
            '<18>{#p/papyrus}{#f/9}最是一往無前的。',
            '<18>{#p/papyrus}{#f/9}怪物。\n神話。\n傳說...',
            '<18>{#p/papyrus}{#f/9}那隻黃色的鳥。',
            ...(SAVE.data.n.plot < 42
               ? [
                    '<18>{#p/papyrus}{#f/9}...',
                    '<18>{#p/papyrus}{#f/4}... WAIT.',
                    "<18>{#p/papyrus}{#f/1}IT'S NOT THERE ANYMORE!?!?",
                    '<18>{#p/papyrus}{#f/8}HOW COULD THIS BE!!!'
                 ]
               : solo()
               ? [ '<18>{#p/papyrus}{#f/4}...看來我們沒有\n別的辦法來跨越\n這鴻溝了。' ]
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
                    '<18>{#p/papyrus}{#f/0}相信我，\n那條溝比看起來要\n寬多了。',
                    '<18>{#p/papyrus}{#f/4}而且很可能是\n非歐的那種。',
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
            '<18>{#p/papyrus}{#f/0}有傳言說...',
            '<18>當地賣冰淇淋的那個人\n會發明信片。',
            '<18>{#p/papyrus}{#f/4}聽說這些「明信片」\n具有不可言說的力量...',
            '<18>{#p/papyrus}{#f/9}...可以解鎖更多\n美味的口味！',
            ...(solo()
               ? []
               : [
                    '<26>{#p/undyne}{#f/8}* And I LOVE tasty treats!',
                    "<25>{#p/undyne}{#f/14}* Well, as long as they're not cold, anyway.",
                    "<25>{#p/undyne}{#f/17}* Then I don't love them that much!!"
                 ])
         ],
         [
            '<18>{#p/papyrus}{#f/0}不知道這些明信片\n還有什麼魔力...',
            '<18>{#p/papyrus}{#f/4}它們往往\n很快就會用完...'
         ]
      ),
      f_abyss: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}我們望著這條布滿\n訊星的蜿蜒小路...',
            '<18>{#p/papyrus}{#f/4}我們認為這「很正常」。',
            '<18>{#p/papyrus}{#f/0}你知道還有什麼\n「很正常」嗎？',
            '<18>{#p/papyrus}{#f/0}這通電話竟然能\n傳到那裡！',
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
               ? [ "<18>{#p/papyrus}{#f/6}我絕對沒有在\n陰陽怪氣！！" ]
               : [ "<19>{#p/papyrus}{#f/4}SARCASM TRAINING'S -TOTALLY- THE EASIEST THING EVER." ]
      ),
      f_muffet: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}前幾天我上網...',
            "<18>{#p/papyrus}{#f/6}我了解到了蜘蛛絲\n比你想像得更堅固！",
            '<18>{#p/papyrus}{#f/4}你問我上的是哪個網？',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}...你應該不想知道的。" ]
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
               ? [ "<18>{#p/papyrus}{#f/4}不是用電腦，\n這是肯定的。" ]
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
            '<18>{#p/papyrus}{#f/4}在工廠正中央...',
            '<18>{#p/papyrus}{#f/6}...我想知道這\n有什麼意義！',
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
                    '<18>{#p/papyrus}{#f/4}勁爆訊息。',
                    '<18>{#p/papyrus}{#f/4}神秘的雕像很神秘。',
                    "<18>{#p/papyrus}{#f/6}這誰能想得到！！"
                 ]
               : [
                    '<25>{#p/undyne}{#f/11}* Some say the statue also contains a SECOND music box...',
                    "<25>{#p/undyne}{#f/12}* ... but I'll believe it when I hear it."
                 ]
      ),
      f_piano: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/5}要是有個房間...',
            '<18>能讓我通過音樂\n表達自己就好了。',
            '<18>一個孤獨的房間，\n與世隔絕...',
            '<18>中間唯有一架鋼琴...',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}...喔等下！\n不就是這個房間嗎！" ]
               : [
                    '<25>{#p/undyne}{#f/10}* And maybe that piano would be used to solve puzzles...',
                    '<25>{#p/undyne}{#f/10}* Or practice combat by fighting the ivories...',
                    '<25>{#p/undyne}{#f/10}* Or play a certain melody that reminds you of someone special...',
                    '<25>{#p/undyne}{#f/7}* ... if only you were in that room RIGHT NOW!!',
                    '<18>{#p/papyrus}{#f/6}I WAS GOING TO MENTION THAT!!'
                 ])
         ],
         [ '<18>{#p/papyrus}下次我來這裡，\n我要寫一首曲子。', '<18>名字就叫\n《帕派瑞斯的故事》。' ]
      ),
      f_artifact: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}我覺得我之前從來\n沒進過這個房間。",
            "<18>{#p/papyrus}{#f/6}這個房間什麼樣？\n裡面有沒有\n數不清的寶藏？",
            '<18>{#p/papyrus}{#f/4}聲明一下，\n這個問題是反問句。',
            "<18>{#p/papyrus}{#f/7}我寧願自己去\n尋找答案！",
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
               ? [ '<18>{#p/papyrus}{#f/6}不要劇透！！！' ]
               : [ "<18>{#p/papyrus}{#f/4}AND THAT'S NOT EVEN HIS MOST IMPRESSIVE FEAT." ]
      ),
      f_path: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}繼續走，\n你就能看到首塔了。",
            "<18>{#p/papyrus}{#f/4}通常你從這麼遠的地方\n看不到，但是...",
            '<18>{#p/papyrus}{#f/5}通過這個房間裡的\n某個東西...',
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
               ? [ '<18>{#p/papyrus}{#f/6}趁著還有機會，\n好好欣賞風景吧！' ]
               : [ '<18>{#p/papyrus}{#f/6}JUST BE CAREFUL!' ]
      ),
      f_view: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}你肯定是一個\n很會一心多用的人！',
            "<18>{#p/papyrus}{#f/4}因為只有像你\n這樣的人...",
            '<18>{#p/papyrus}{#f/5}才會在【那種】美景\n附近還想著打電話\n給別人。',
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
            "<18>{#p/papyrus}{#f/5}很不幸，這裡沒有什麼\n特別好說的。",
            '<18>{#p/papyrus}{#f/4}除了我聽說的那座\n不知道通往哪裡的橋...',
            '<18>{#p/papyrus}{#f/5}真的就只是條\n死胡同。',
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
               ? [ '<18>{#p/papyrus}{#f/5}也許你可以到別的\n地方再打過來？' ]
               : [ '<18>{#p/papyrus}{#f/4}SO THERE -WAS- SOMETHING TO SAY HERE...' ]
      ),
      f_tunnel: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}啊... 垃圾處理站。',
            '<18>{#p/papyrus}{#f/0}是個處置不受歡迎的\n東西的好地方。',
            '<18>{#p/papyrus}{#f/4}或者也可以說...',
            '<18>{#p/papyrus}{#f/9}一個無需成本就可以\n淘到寶藏的地方！',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}我有的時候跟衫斯\n過來翻東西。' ]
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
                    '<18>{#p/papyrus}{#f/4}上次我們甚至找到了\n一幅骨頭畫...',
                    '<18>{#p/papyrus}{#f/5}就是稍微有點\n髒而已！！'
                 ]
               : [ "<18>{#p/papyrus}{#f/6}PERHAPS IT'D BE BEST FOR YOU TO LEAVE THIS ROOM." ]
      ),
      f_chute: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}地板上有三臺\n平板電腦。',
            '<18>{#p/papyrus}{#f/0}一臺是關於星花的，\n一臺是關於蟲洞的。',
            '<18>{#p/papyrus}{#f/4}還有一臺裡是\n科幻動漫。',
            "<18>{#p/papyrus}{#f/0}我【個人】覺得，\n這些東西都是有關聯的。",
            '<18>{#p/papyrus}{#f/5}也就是說，星花\n是通過蟲洞來的...',
            '<18>{#p/papyrus}{#f/5}就像那部科幻動漫\n預言的那樣。',
            "<18>{#p/papyrus}{#f/6}這是能一次性解釋清\n這三個東西的\n唯一辦法！",
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
            "<18>{#p/papyrus}{#f/0}不要忽略隱藏的\n路徑...",
            '<18>{#p/papyrus}{#f/5}閉上眼睛，\n徑直地走...',
            "<18>{#p/papyrus}{#f/5}迎接提米狂熱的心情。",
            "<18>{#p/papyrus}{#f/4}...這是我聽說的\n關於這個地方的謎語。",
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
            '<18>{#p/papyrus}{#f/4}你就該停下腳步...',
            '<18>{#p/papyrus}{#f/0}心急火燎地\n進去看看！！',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/9}因為我們在進行\n火熱的大甩賣！！",
                    '<18>{#p/papyrus}{#f/5}這都是在我想像中\n賣火的商店裡\n會發生的事。'
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
               ? [ "<18>{#p/papyrus}{#f/5}這也是我的\n另一個夢想..." ]
               : [
                    "<18>{#p/papyrus}{#f/0}IT'S IMPORTANT TO ACKNOWLEDGE THE HEROES AMONGST US.",
                    '<18>{#p/papyrus}{#f/5}WITHOUT THEM, WE MIGHT NOT EVEN BE HERE TODAY...'
                 ]
      ),
      f_undyne: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}這裡是安黛因的家。",
            ...(SAVE.data.n.plot < 48 || world.trueKills > 0
               ? [ '<18>{#p/papyrus}{#f/9}學習烹飪的\n理想的地方！' ]
               : SAVE.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/4}YOU KNOW, THE ONE WITH THE SKELETON IN FRONT.' ]
               : SAVE.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/9}DON'T HESITATE TO COME IN!" ]
               : SAVE.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/6}...你還在安黛因的\n家那裡啊？？",
                    "<18>{#p/papyrus}{#f/5}她，呃，\n還沒跟我見面呢。",
                    '<18>{#p/papyrus}{#f/4}要不你先\n離開房間然後...',
                    '<18>{|}{#f/1}... {%}',
                    '<25>{#p/undyne}{#f/12}* 呼... 哈...！',
                    "<25>{#p/undyne}{#f/8}* 沒錯！！！\n* 那是我的家！！！",
                    "<18>{#p/papyrus}{#f/6}呃，嗨，安黛因！\n你是怎麼這麼快\n就到這裡的啊？",
                    '<25>{#p/undyne}{#f/17}* 我跑過來的。',
                    '<18>{#p/papyrus}{#f/1}什麼？？\n那你肯定有一些...',
                    '<18>{#p/papyrus}{#f/9}關於你家的\n很酷的事情\n要說吧！！！',
                    '<25>{#p/undyne}{#f/14}* 沒有！！！'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}至少曾經是，\n直到...',
                    '<25>{#p/undyne}{#f/12}* ...我們把它給點著了。',
                    '<25>{#p/undyne}{#f/8}* BUT WHO CARES??',
                    '<25>{#p/undyne}{#f/14}* 跟帕派瑞斯出去消遣\n  最棒了！'
                 ])
         ],
         () =>
            SAVE.data.n.plot < 48 || world.trueKills > 0
               ? [
                    '<18>{#p/papyrus}{#f/0}專家提示：\n在跟安黛因烹飪時...',
                    '<18>{#p/papyrus}{#f/4}如果她開始攻擊蔬菜...',
                    "<18>{#p/papyrus}{#f/5}...那就該溜了。"
                 ]
               : SAVE.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/0}NICE TO SEE YOU, TOO!' ]
               : SAVE.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/4}WE'RE STILL WAITING HERE, YOU KNOW..." ]
               : SAVE.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/0}我相信她很快就\n會想出來的。",
                    "<25>{#p/undyne}{#f/14}* 你可別打包票！"
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}請叫我「消遣雜務工」。',
                    '<18>{#p/papyrus}{#f/4}我雖然沒辦法\n修補你的家...',
                    '<18>{#p/papyrus}{#f/9}但我還可以幫你\n「補上」美好的一天！'
                 ]
      ),
      f_blooky: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}也許有一天，\n我會過上平靜的生活。",
            '<18>{#p/papyrus}{#f/5}養蝸牛，創作音樂...',
            '<18>{#p/papyrus}{#f/6}愁眉苦臉，\n不讓任何人安慰我...',
            "<18>{#p/papyrus}{#f/5}轉念一想，\n這個生活方式可能\n不太適合我。",
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
            "<18>{#p/papyrus}{#f/0}唉，我感覺我更適合\n當啦啦隊隊員。",
            '<18>{#p/papyrus}{#f/5}...而不是那個\n要別人幫忙\n安慰我的人。'
         ]
      ),
      f_snail: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/4}我聽說有一種方法\n可以贏這個遊戲...",
            '<18>{#p/papyrus}{#f/0}就是關於提供\n「及時的鼓勵」。',
            '<18>{#p/papyrus}{#f/5}及時的鼓勵...',
            "<18>{#p/papyrus}{#f/4}怎麼說得好像還有\n【不及時的】鼓勵\n一樣。",
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
               ? [ '<18>{#p/papyrus}{#f/5}我要是想太多可能會\n讓人不知所措...' ]
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
            '<18>{#p/papyrus}{#f/5}我經常在想為什麼\n人類要把我們\n困在這裡。',
            '<18>{#p/papyrus}{#f/5}我知道他們害怕\n我們，但是...',
            "<18>{#p/papyrus}{#f/6}他們就不會逃跑嗎！？",
            '<18>{#p/papyrus}{#f/6}或者，跟我們談談，\n這不也挺好嗎！！',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/5}很不幸，他們從來\n沒有想過這些事情。" ]
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
         [ '<18>{#p/papyrus}{#f/0}至少【我】是\n想過這些的！！' ]
      ),
      f_puzzle3: pager.create(
         0,
         ...[
            () => [
               '<18>{#p/papyrus}{#f/6}我自稱是謎題大師，\n但是...',
               '<18>{#p/papyrus}{#f/5}這件事我得坦白。',
               "<18>{#p/papyrus}{#f/4}...我從來沒真正\n解決過這個難題。",
               "<18>{#p/papyrus}{#f/6}等等！！\n別對我太苛刻！！",
               '<18>{#p/papyrus}{#f/4}...我還沒來得及試，\n他們就把它關掉了。',
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
            '<18>{#p/papyrus}{#f/4}如果我是你，\n我會小心這個房間...',
            '<18>{#p/papyrus}{#f/5}安黛因經常來這裡，\n威嚴地站在附近。',
            "<18>{#p/papyrus}{#f/6}她不止一次嚇到過我！",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}即使我讓自己\n很容易被當成靶子。' ]
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
                    '<18>{#p/papyrus}{#f/4}喔，還有不知道從哪裡\n冒出來的長矛陷阱。',
                    '<18>{#p/papyrus}{#f/5}也小心點那些。'
                 ]
               : [ '<18>{#p/papyrus}{#f/4}WHY DO WE EVEN BOTHER ARGUING SOMETIMES...' ]
      ),
      f_spear: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}穿過這個房間\n所花的時間...',
            '<18>{#p/papyrus}{#f/5}...好像哪次都不一樣。',
            "<18>{#p/papyrus}{#f/4}有的時候很長，\n有的時候就不一樣...",
            '<18>{#p/papyrus}{#f/4}有的時候我穿\n圓點圖案的衣服。',
            "<18>{#p/papyrus}{#f/0}不管怎麼解釋好像\n都說不通。",
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}說的是我剛才那句。' ]
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
               ? [ '<18>{#p/papyrus}{#f/4}我剛才沒提過\n圓點圖案的衣服嗎？' ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S A CONSPIRACY SPANNING THE WHOLE OF THE COSMOS..." ]
      ),
      f_corner: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}{#f/0}這個工廠裡的\n很多地方...',
            '<18>{#p/papyrus}{#f/0}...只有跳過去\n才能到達。',
            '<18>{#p/papyrus}{#f/9}就比如，這個房間\n左右的兩條道！',
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}我聽說人類可以\n跳得很高，所以...",
                    "<18>{#p/papyrus}{#f/0}你應該不會有\n什麼問題的。"
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
            '<18>{#p/papyrus}{#f/0}訊星真的很厲害，\n對吧？',
            '<18>{#p/papyrus}{#f/5}不過，它們會\n周期性地重置。',
            '<18>{#p/papyrus}{#f/4}在重置之前...',
            "<18>{#p/papyrus}{#f/6}等下，別的地方\n是不是也有一個\n類似的房間！？",
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
               ? [ "<18>{#p/papyrus}{#f/5}我感覺有時候\n我只是把自己的話給\n重複了一遍。" ]
               : [ "<18>{#p/papyrus}{#f/5}SOMETIMES I WONDER IF WE'RE ALL JUST GOING IN CIRCLES." ]
      ),
      f_pacing: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}這個房間真的\n沒什麼可說的。",
            '<18>{#p/papyrus}{#f/4}它的存在只會讓你\n走得越來越遠，',
            '<18>{#p/papyrus}{#f/5}朝著出口\n一步一步邁出...',
            '<18>{#p/papyrus}{#f/4}充滿了徹底的、\n無休止的懸念。',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/14}* That about sums it up.' ])
         ],
         [ '<18>{#p/papyrus}{#f/7}徹底的！\n無休止的！！\n懸念！！！' ]
      ),
      f_battle: pager.create(
         0,
         () => [
            "<18>{#p/papyrus}{#f/0}在這個房間裡，\n你會看到\n安黛因的巨塔。",
            '<19>{#p/papyrus}{#f/9}那是由一顆古老\n小行星的殘骸\n做成的！',
            "<18>{#p/papyrus}{#f/5}她總是在上面擺姿勢...",
            '<18>{#p/papyrus}{#f/4}然後喃喃自語...',
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
               ? [ "<18>{#p/papyrus}{#f/0}她可能有什麼\n必須要記住的東西吧。" ]
               : [ '<18>{#p/papyrus}{#f/9}FOR THE RECORD, I LOVE A GOOD PRE- PLANNED SPEECH!!' ]
      ),
      f_exit: pager.create(
         0,
         () => [
            '<18>{#p/papyrus}這個儲液罐是\n專門放在這裡的...',
            '<18>{#p/papyrus}{#f/0}因為某個皇家守衛\n隊長覺得...',
            "<18>{#p/papyrus}{#f/4}把她的巨型\n噴氣背包...",
            '<18>{#p/papyrus}{#f/5}帶到一個充滿靜電的地方\n是很安全的。',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/6}...把靜電全吸收掉是\n非常，非常危險的！！' ]
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
                    '<18>{#p/papyrus}{#f/0}我只想用一個字來\n評價那個守衛隊長。',
                    '<18>{#p/papyrus}{#f/4}那個字就是\n「注意看好路」。'
                 ]
               : [ "<18>{#p/papyrus}{#f/5}I WORRY FOR UNDYNE'S SAFETY." ]
      ),
      f_napstablook: pager.create(
         0,
         () =>
            SAVE.data.n.plot <= 48.1 && SAVE.data.n.state_foundry_blookdate < 2
               ? [
                    "<18>{#p/papyrus}{#f/0}所以你跟一個幽靈\n交上朋友了。",
                    '<18>{#p/papyrus}{#f/1}你交友的範圍是不是\n有點太寬泛了！？！？',
                    ...(solo()
                       ? [ '<18>{#p/papyrus}{#f/6}你的實力真的\n太讓人害怕了！！' ]
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
                  ? [ '<18>{#p/papyrus}{#f/5}小心點靈質就行。' ]
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
            '<18>{#p/papyrus}{#f/4}我上次去實驗室...',
            solo()
               ? '<18>{#p/papyrus}{#f/0}...還是去找艾菲斯博士玩，\n就這周！'
               : '<18>{#p/papyrus}{#f/0}...其實就今天早些時候，\n剛好咱要去休閒迴廊！',
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
                    '<18>{#p/papyrus}{#f/6}好好說話！！'
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
                  ? [ '<32>{#p/human}* （有個骷髏沒有出現，\n  這使你充滿了決心。）' ]
                  : [ "<32>{#p/human}* （那對骷髏兄弟的滑稽互動\n  使你充滿了決心。）" ]
               : papreal() || world.runaway
               ? [ '<32>{#p/human}* （孤零零的箱子使你充滿了決心。）' ]
               : [ '<32>{#p/human}* (The box can rest easy now.)\n* (This, of course, fills you with determination.)' ]
      },
      s_pacing: {
         name: '星港 - 月巖小路',
         text: () =>
            world.runaway || epilogueOverride(world.population < 6) || world.genocide || roomKills().s_pacing > 1
               ? SAVE.data.n.plot < 29
                  ? [ '<32>{#p/human}* （星光黯淡了。）\n* （不知為何，你充滿了決心。）' ]
                  : [ '<32>{#p/human}* （群星不再閃耀。）\n* （當然，這使你充滿了決心。）' ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The frivolous arguments once had in this room have ceased.)',
                    '<32>* （這使你充滿了決心。）'
                 ]
               : [
                    '<32>{#p/human}* （月巖商人在前景裡\n  輕浮地爭論著。）',
                    '<32>* （這使你充滿了決心。）'
                 ]
      },
      s_spaghetti: {
         name: '星港 - 意面樞紐',
         text: () =>
            [
               [ '<32>{#p/human}* （一盤違反物理定律的義大利麵\n  使你充滿了決心。）' ],
               [
                  '<32>{#p/human}* （現在，這盤義大利麵\n  也遵循物理規律了。）',
                  '<32>{#p/human}* （這使你充滿了決心。）'
               ],
               [ '<32>{#p/human}* （義大利麵沒了。）', '<32>{#p/human}* （這使你充滿了決心。）' ]
            ][trueSpaghettiState()]
      },
      s_town1: {
         name: '星港 - 小鎮',
         text: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The town may be abandoned, but its cuteness remains.)',
                    '<32>{#p/human}* （這使你充滿了決心。）'
                 ]
               : papreal() || world.runaway
               ? [ '<32>{#p/human}* （小鎮籠罩在一片陰影中，\n  這使你充滿了決心。）' ]
               : [ '<32>{#p/human}* （這個可愛的小鎮\n  使你充滿了決心。）' ]
      }
   }
};


// END-TRANSLATE
