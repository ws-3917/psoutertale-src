import { asrielinter, helmetdyne, helmetdyneAttack } from '../../../code/common/api';
import {
   armorprice,
   badSpider,
   dogecon,
   dogex,
   geno,
   ghostpartyCondition,
   respecc,
   startonATE,
   temgone
} from '../../../code/foundry/extras';
import { game, rng } from '../../../code/systems/core';
import {
   antiAteThreshold,
   battler,
   choicer,
   fetchCharacters,
   pager,
   player,
   postSIGMA,
   roomKills,
   world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';

// START-TRANSLATE

export default {
   a_foundry: {
      locketseller: [ '<32>{#p/basic}* ...', "<32>{#p/basic}* 我什麼都沒看到。" ],
      noequip: [ '<32>{#p/human}* （你打算不這麼做。）' ],
      darktoriel1: [
         "<32>{#p/human}* （你抓住了托麗爾的手。）",
         '<25>{#p/toriel}{#f/2}* 噢，天哪...！\n* 是-是你嗎，弗裡斯克？',
         "<25>{#f/1}* 這裡有點黑，看不清楚..."
      ],
      darktoriel2: [
         '<25>{#p/toriel}{#f/9}* 對不起，害得你到處找我。',
         '<25>{#f/9}* 我把手機關機了，\n  所以你打不通我的電話。',
         '<25>{#f/13}* ...',
         '<25>{#f/13}* 孩子，之前做了那些事。\n  真的對不起。',
         '<25>{#f/13}* 即便你原諒我，\n  我也原諒不了自己。',
         '<25>{#f/9}* 現在，我才漸漸意識到\n  過去犯下的那些錯\n  有多嚴重。',
         '<25>{#f/10}* ...',
         '<25>{#f/10}* 總之，很高興見到你。'
      ],
      darktoriel3: [
         '<25>{#p/toriel}{#f/5}* ...喔？\n* 你想讓我... \n  給衫斯回個電話？',
         '<25>{#f/1}* 我現在就開機...'
      ],
      darktoriel4a: [
         '<32>{#s/phone}{#p/event}* 撥號中...',
         '<25>{#p/toriel}{#f/3}* ...嗯，是的。\n* 我手機在這地方\n  訊號不太好。'
      ],
      darktoriel4b: [
         '<25>{#f/4}* 我要親自去找他。',
         '<25>{#f/5}* 呃... \n* 還是一會再去吧。',
         '<25>{#f/5}* ...'
      ],
      darktoriel5a: [
         '<25>{#p/toriel}{#f/5}* ...嗯？\n* 還有什麼事嗎？',
         '<32>{#p/human}* （你給眼前的托麗爾複述了\n  「六號檔案」裡那個托麗爾\n  給的建議。）',
         '<25>{#p/toriel}{#f/2}* ...',
         '<25>{#f/1}* 這些話...',
         '<25>{#f/1}* 你從哪聽到的...？',
         '<25>{#f/0}* 我上次說這些\n  起碼是一百年前了。',
         '<25>{#f/5}* ...',
         '<25>{#f/1}* 好，你先走吧...\n* 我會記住這些話的。'
      ],
      darktoriel5b: [ '<25>{#p/toriel}{#f/1}* 你先走吧。' ],
      darktoriel6: [
         '<25>{#f/5}* 放心，我知道運輸船要出發，\n  肯定不會錯過的。',
         '<25>{#f/9}* 但現在，我想一個人靜靜。',
         '<25>{#f/1}* ...謝謝你的關心，弗裡斯克。\n* 你是最棒的。'
      ],
      darktoriel7: () =>
         SAVE.data.b.c_state_secret1_used
            ? [
                 '<25>{#p/toriel}{#f/10}* 別擔心，弗裡斯克。\n* 我沒事。',
                 '<25>{#f/1}* 運輸船上見。\n* 好嗎？'
              ]
            : [
                 '<25>{#p/toriel}{#f/5}* 給我點時間平復下心情，\n  弗裡斯克。',
                 '<25>{#f/1}* 運輸船上見。\n* 好嗎？'
              ],
      ghostpartymusic1: [
         '<32>{#p/finalghost}* Ah, the classic.\n* Not just \"a\" spooktune, but \"the\" spooktune.',
         '<32>* The original, you might say.'
      ],
      ghostpartymusic2: [
         '<32>{#p/mettaton}{#e/mettaton/9}* NOW THIS IS SOMETHING I CAN REALLY \"VIBE\" TO, AS BLOOKY WOULD SAY.',
         "<32>{#e/mettaton/36}* IT'S GOT JUST THE RIGHT MIX OF ELEMENTS...",
         '<32>{#e/mettaton/8}* AND THE BREAKDOWN?',
         '<32>{#e/mettaton/9}* NOT WHAT I WOULD HAVE GONE FOR, BUT DECENT NONETHELESS.'
      ],
      ghostpartymusic3: [
         '<32>{#p/basic}{#e/maddummy/1}* I always thought this one felt really slow, you know?',
         '<32>* Just... super... duper... slow.',
         "<32>{#e/maddummy/0}* But that's just me."
      ],
      evac: [ '<32>{#p/human}* （你感覺周圍的怪物越來越少了。）' ],
      shopclosed: [ '<32>{#p/human}* （沒必要再踏足了。）' ],
      starKILLER: [ '<32>{#p/basic}{#npc/a}* The grass is fading faster than I had thought.' ],
      quicksolve3: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The terminal appears to have been powered off.)' ]
            : [
                 '<32>{#p/human}* （你激活了終端。）',
                 '<32>{#p/basic}* 「路通了！」\n* 「直接前進即可。」'
              ],
      quicksolve4: [ '<32>{#p/human}* （你激活了終端。）', '<32>{#p/basic}* 「請輸入控制程式碼！」' ],
      quicksolve5: [
         '<32>{#p/basic}* ...',
         '<32>{#p/basic}* If only you knew a puzzle officionado who could tell you what that code might be.'
      ],
      quicksolve6: () => [ '<32>{#p/basic}* ...', choicer.create('* (Enter the code?)', '是', '否') ],
      quicksolve7: [ '<32>{#p/human}* (You decide not to enter.)' ],
      quicksolve8: [ "<32>{#p/basic}* Well, that's a mercy." ],
      escape: [
         '<32>{#p/event}* 鈴鈴，鈴鈴...',
         '<32>{#p/alphys}* 嘿... 你-你好？',
         '<32>* 我知道你想繼續前進，但是...',
         "<32>* 如果你還往前走，\n  她會... 殺了你...",
         "<32>* 我嘗試阻止她... \n  但-但她不聽我的！",
         "<32>* 她現在...",
         '<32>* ...',
         "<32>* 但是，呃，沒事的！\n* 因為...",
         "<32>* 因-因為還有一種\n  可以繞過她的辦法！",
         "<32>* 我知道這可能...\n* 有點不方便...",
         "<32>* 但這是你活下去的唯一辦法...！",
         '<32>* 相-相信我... 好嗎？',
         '<32>* 回到那-那個塔架謎題前的陽臺。',
         "<32>* 如果你不這麼做，我...",
         '<32>* 我...',
         "<32>* 我就... \n  你走吧。",
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      artifact1: [ '<32>{#p/human}* （你獲得了傳說中的神器。）' ],
      artifact2: [ "<32>{#p/human}* （你帶的東西太多，裝不下它了。）" ],
      artifact3: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The inscription describes a riddle of ivories and melodies.)' ]
            : [
                 '<32>{#p/basic}* 底座上刻著銘文。',
                 '<32>* 「琴臺靜立其間，兩側別有洞天。」',
                 '<32>* 「王子曲成左門啟，誰人可使右室顯？」',
                 '<32>* 「再奏謎自開。」'
              ],
      tome0: () => [ '<32>{#p/basic}* 這冊書牢牢地固定在底座上。' ],
      tome1: () => [ '<32>{#p/human}* （你取下了捲軸《頓悟》。）' ],
      tome2: [ "<32>{#p/human}* （你帶的東西太多，裝不下它了。）" ],
      tome3: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The inscription speaks of peace and good intentions.)' ]
            : [
                 '<32>{#p/basic}* There is a writ inscribed on the pedastal.',
                 '<32>* \"To those who are worthy, to those who are kind.\"',
                 '<32>* \"To those who wish well, in both heart and mind.\"',
                 '<32>* \"May peace follow you on your journey home.\"'
              ],
      tome4: () => [
         choicer.create(
            '* （你想做什麼？）',
            '饒恕',
            world.meanie
               ? '欺負'
               : SAVE.data.b.oops && world.flirt > 9
               ? '調情'
               : SAVE.data.b.oops
               ? '交友'
               : '擁抱',
            '擊殺',
            '撈錢'
         )
      ],
      tome5a: '<32>{#p/human}* （你凝神屏息，試圖讓對方放棄戰鬥。）',
      tome5b: () =>
         world.meanie
            ? '<32>{#p/human}* （你凝神屏息，試圖把對方嚇跑。）'
            : SAVE.data.b.oops && world.flirt > 9
            ? '<32>{#p/human}* （你凝神屏息，試圖讓對方被你迷倒。）'
            : SAVE.data.b.oops
            ? '<32>{#p/human}* （你凝神屏息，\n  試圖和對方成為好朋友。）'
            : '<32>{#p/human}* （你凝神屏息，\n  試圖讓對方感受到擁抱。）',
      tome5c: '<32>{#p/human}* （你凝神屏息，試圖逼對方自殺。）',
      tome5d: '<32>{#p/human}* （你凝神屏息，\n  試圖引誘對方把錢交出來。）',
      tome5e: '<32>{#p/basic}* ...突然！',
      tome5f: '\n* （然而一切照常。）',
      astrofood0: () => [
         "<32>{#p/human}* (You can't make out what's in the box...)",
         choicer.create('* (Take something out?)', '是', '否')
      ],
      astrofood1: () =>
         [
            [
               '<32>{#p/basic}* 箱子裡有三份太空豆腐。',
               choicer.create('* （拿一份嗎？）', '是', '否')
            ],
            [
               '<32>{#p/basic}* （箱子裡還剩兩份太空豆腐。）',
               choicer.create('* （拿一份嗎？）', '是', '否')
            ],
            [
               '<32>{#p/basic}* （箱子裡還剩一份太空豆腐。）',
               choicer.create('* （拿走它嗎？）', '是', '否')
            ]
         ][SAVE.data.n.state_foundry_astrofood],
      astrofood2: [ '<32>{#p/human}* （你拿了一塊太空豆腐。）' ],
      astrofood3: [ "<32>{#p/human}* （你帶的東西太多了。）" ],
      astrofood4: () => [ '<32>{#p/human}* （你不打算這麼做。）' ],
      astrofood5: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (But you couldn't find anything inside.)" ]
            : [ '<32>{#p/basic}* 箱子是空的。' ],
      bird1: () => [
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* 這隻小鳥想帶你\n  穿過這道溝。' ]),
         choicer.create("* （接受小鳥的好意嗎？）", '是', '否')
      ],
      blookdate1: () =>
         world.sad_ghost || world.population === 0
            ? [
                 '<32>{#p/napstablook}* 喔...\n* 你好...',
                 "<32>* 對不起，我...\n* 沒想到你會跟我過來。",
                 '<32>* 呃...\n* 別太拘束...？'
              ]
            : [
                 '<32>{#p/napstablook}* 喔...\n* 你真的來了...',
                 "<32>* 對不起，我...\n* 沒想到你會來。",
                 "<32>* 雖然比較寒酸，\n  但是不要太拘束喔。"
              ],
      blookdate2: () => [
         ...(world.sad_ghost || world.population === 0
            ? [ '<32>{#p/napstablook}* 喔... 你要我給你吃的...', '<32>* 我看看有什麼...' ]
            : SAVE.data.b.f_state_ghostsleep
            ? [ '<32>{#p/napstablook}* okay, so...', "<32>* let me show you what's in the fridge" ]
            : [ '<32>{#p/napstablook}* 你餓了嗎？', '<32>* 我冰箱裡應該有點吃的...' ])
      ],
      blookdate2x: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [
                    "<32>{#p/human}* (You inspect the fridge.)\n* (It doesn't seem like you can exactly see the contents.)"
                 ]
               : [
                    '<32>{#p/human}* （你看了下冰箱裡頭。）',
                    "<32>{#p/basic}* 很難說裡面到底有些什麼。",
                    ...(ghostpartyCondition()
                       ? [
                            "<32>{#p/mettaton}{#e/mettaton/8}* THERE'S PROBABLY NOTHING BUT GHOST FOOD IN THERE, DARLING.",
                            "<32>{#p/mettaton}{#e/mettaton/9}* IF YOU TRIED TO EAT IT, IT'D JUST PHASE THROUGH YOU."
                         ]
                       : [])
                 ],
         () =>
            SAVE.data.b.svr
               ? [
                    "<32>{#p/human}* (You inspect the fridge.)\n* (It doesn't seem like you can exactly see the contents.)"
                 ]
               : [
                    '<32>{#p/human}* （你看了下冰箱裡頭。）',
                    "<32>{#p/basic}* 很難說裡面到底有些什麼。"
                 ]
      ),
      blookdate3: () => [
         "<32>{#p/napstablook}* 這是一份幽靈三明治...",
         '<32>* 你想嘗嘗嗎...',
         choicer.create('* （咬一口嗎？）', '是', '否')
      ],
      blookdate4a: [
         '<32>{#p/human}* （你試著咬了一口幽靈三明治。）',
         '<32>{#p/human}* （你的身體穿過了它。）',
         '<32>{#p/napstablook}* 喔...',
         '<32>* 當做什麼都沒發生吧...'
      ],
      blookdate4b: [ '<32>{#p/napstablook}* 喔...........' ],
      blookdate5: () => [
         '<32>{#p/napstablook}* 美餐一頓後，\n  我喜歡躺在地上，\n  感覺自己像是垃圾一樣...',
         "<32>* 這是個家族傳統...",
         '<32>* 你想不想...\n* ...也來試試...？',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      blookdate6a: [ '<32>{#p/napstablook}* 好...\n* 跟我來做...' ],
      blookdate6b: [ '<32>{#p/napstablook}* 喔......................', "<32>* 我出去逛逛" ],
      blookdate7: [
         "<32>{#p/napstablook}* 我們開始吧...\n* 一直躺著不要動就好。",
         '<32>* 所以...\n* 你要想起來了的話，\n  動起來就好，大概。'
      ],
      blookdate8: [ '<32>{#p/napstablook}* 嗨，感覺不錯...', '<32>* 謝謝你...' ],
      blookdate8x: [ '<32>{#p/napstablook}* well, that was fast......', '<32>* thanks for trying, though......' ],
      blookdate8y: [ '<32>{#p/napstablook}* well, that was that', '<32>* ............' ],
      blookdate9: [
         "<32>{#p/napstablook}* 我先出去一下...\n* 你可以跟我來...\n* 不來也可以...",
         "<32>* 由你來決定..."
      ],
      blookmusic0: [ "<32>{#p/basic}* It's out of service." ],
      blookmusic1: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* (You reach for the sound system...)'
            : '<32>{#p/basic}* 現在沒有播放音樂。',
         choicer.create('* （放一首嗎？）', '鬼怪旋律', '鬼怪音波', '鬼怪華爾茲', '取消')
      ],
      blookmusic1y: [ '<32>{*}{#p/human}* （你轉動旋鈕...）{^40}{%}' ],
      blookmusic2: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* (It sounds like a song is currently playing.)'
            : [
                 '<32>{#p/basic}* 正在播放《鬼怪旋律》',
                 '<32>{#p/basic}* 正在播放《鬼怪音波》',
                 '<32>{#p/basic}* 正在播放《鬼怪華爾茲》'
              ][SAVE.data.n.state_foundry_blookmusic - 1],
         choicer.create('* （停止播放嗎？）', '是', '否')
      ],
      blookmusic3a: [
         '<32>{#p/napstablook}* 喔...\n* 一首經典詭異單曲...',
         "<32>* 他們現在已經不做\n  這種歌了..."
      ],
      blookmusic3b: [ '<32>{#p/napstablook}* 天，這氛圍...', "<32>* 讓我全身都開始顫抖" ],
      blookmusic3c: [
         "<32>{#p/napstablook}* 這首稍微有點慢...",
         "<32>* 但一旦你聽進狀態，\n  就會感覺很好聽"
      ],
      blookmusic3d: [
         '<32>{#p/napstablook}* 嘿...\n* 你真的很喜歡聽\n  那個舊歌單，嗯',
         "<32>* 我是說......\n* 我從那次以後，\n  做了些更好的東西.....",
         '<32>* 不過，我還是很感激',
         '<32>* 所以... 謝謝你，嘿'
      ],
      blooksnail1: pager.create(
         0,
         () => [
            "<32>{#p/napstablook}* 你想玩個遊戲嗎？\n* 它叫做「雷霆蝸牛」。",
            '<32>* 幾隻蝸牛會賽跑，\n  然後如果黃色的蝸牛贏了，\n  你就贏了。',
            "<32>* 玩一次需要10G。",
            choicer.create('* （玩遊戲嗎？）', '是', '否')
         ],
         () => [ '<32>{#p/napstablook}* 你改變主意了嗎？', choicer.create('* （玩遊戲嗎？）', '是', '否') ]
      ),
      blooksnail1i: () => [
         '<32>{#p/napstablook}* 你想再玩一次嗎？',
         choicer.create('* （玩遊戲嗎？）', '是', '否')
      ],
      blooksnail2a: [
         "<32>{#p/napstablook}* um...\n* you don't have enough money......",
         "<32>* n-no, you can still play, don't worry about it..."
      ],
      blooksnail2b: [ '<32>{#p/napstablook}* 喔...........' ],
      blooksnail2b0: [ '<32>{#p/napstablook}* 好吧...........' ],
      blooksnail3: [ '<32>{#p/napstablook}* 好...\n* 重複按[Z]為你的蝸牛加油。', '<32>* 準備好了嗎？' ],
      blooksnail3i: [ '<32>{#p/napstablook}* 好的...\n* 記住，你隨時可以為你的蝸牛\n  加油。', '<32>* 準備好了嗎？' ],
      blooksnail4a: [
         '<32>{#p/napstablook}* 你贏了... 恭喜。',
         '<32>* 希望獎勵對你來說足夠了...',
         '<32>{#s/equip}{#p/human}* （你得到了20G。）'
      ],
      blooksnail4b: [
         '<32>{#p/napstablook}* 你的蝸牛差一點點\n  就能贏了。',
         '<32>* 等一下...\n* 蝸牛以為是自己贏了...',
         '<32>* 喔不... 蝸牛會很傷心的...',
         "<32>* 那麼，我就給你一些錢吧...\n* 表現得像你贏了的樣子...",
         '<32>{#s/equip}{#p/human}* （你得到了40G。）'
      ],
      blooksnail4c: [
         '<32>{#p/napstablook}* 喔...........\n* 你們都盡力了...',
         '<32>* 那隻蝸牛看起來很氣餒...',
         "<32>* 我覺得她應該還沒有\n  發揮到最好...",
         '<32>* 喔...........'
      ],
      blooksnail4d: [
         '<32>{#p/napstablook}* 喔...........\n* 看起來你為你的蝸牛\n  加油有點過頭了...',
         '<32>* 你給她施加的壓力...\n* 真的讓它吃不消...',
         '<32>* 喔...........'
      ],
      blooksnail4e: [
         '<32>{#p/napstablook}* 喔...........\n* 看起來你為你的蝸牛\n  加油過頭了...',
         "<32>* 她甚至都不看你了...",
         '<32>* 喔...........'
      ],
      blooksnail4f: [
         '<32>{#p/napstablook}* 喔...........\n* 看起來你為你的蝸牛\n  加油實在太過頭了...',
         "<32>* 現在她... 直接消失了...",
         '<32>* 喔...........'
      ],
      blooksnailX: {
         a: '3...',
         b: '2...',
         c: '1...',
         d: '開始!',
         e: '比賽結束'
      },
      blooksorry1: () => [
         '<32>{#p/napstablook}* ...？',
         "<32>* you...\n* you're...",
         '<32>* ... are you sure?',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      blooksorry2: () => [
         '<32>{#p/napstablook}* i...',
         "<32>* i never thought you'd...",
         '<32>* ... um...',
         '<32>* ... are you absolutely sure?',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      blooksorry3: [
         '<32>{#p/napstablook}* you...',
         "<32>* you really mean it, don't you?",
         '<32>* ...\n* heh...',
         '<32>* okay...',
         "<32>* i'll try to forget about what you did before..."
      ],
      blooksorryX: [ '<32>{#p/napstablook}* 喔...........\n* ...........\n* ...........' ],
      blooksorryY: [ '<32>{#p/napstablook}* ...' ],
      blooktouch1: () =>
         world.sad_ghost
            ? [
                 '<32>{#p/napstablook}* what do you want......',
                 choicer.create('* （你要怎麼回答？）', '道歉', '放棄')
              ]
            : [
                 '<32>{#p/napstablook}* 喔，你需要什麼嗎？',
                 choicer.create('* （你要怎麼回答？）', '擁抱', '睡覺', '音樂', '放棄')
              ],
      blooktouch2a1: [
         '<32>{#p/napstablook}* 你... 想要...\n* 嗯...',
         '<32>* 你想讓我抱抱你？',
         "<32>* 好...\n* 如果能讓你開心的話...",
         '<32>{#p/basic}* 納普斯特試著抱了抱你。',
         '<32>* 它直接穿過了你。',
         '<32>{#p/napstablook}* 喔...........',
         "<32>* 我感覺...........\n* 我做不到..........."
      ],
      blooktouch2a2: [
         "<32>{#p/napstablook}* 你真的想要抱抱，\n  是嗎...",
         "<32>* 抱歉...\n* 我也希望我可以..."
      ],
      blooktouch2b1: [
         '<32>{#p/napstablook}* 你想找個地方睡覺嗎？',
         "<32>* 嗯... 我這裡其實沒有床...",
         '<32>* 嗯...',
         "<32>* 去冰箱看看有沒有吃的...",
         '<32>* 吃完之後，我們就可以\n  在地上躺一躺...',
         "<32>* 你到時候就知道了..."
      ],
      blooktouch2b2: [ '<32>{#p/napstablook}* 冰箱...' ],
      blooktouch2c1: [
         "<32>{#p/napstablook}* 如果你想聽音樂，\n  我的音響裡有一些...",
         '<32>* 可以隨便聽聽看...\n* 不聽也可以...'
      ],
      blooktouch2c2: () => [
         '<32>{#p/napstablook}* 音響裡的...\n* ...你不喜歡聽嗎...',
         "<32>* 或許...\n* 我可以給你聽一首\n  我還在做的歌曲...",
         "<32>* 跟我平常的風格很不一樣...",
         '<32>* 你想聽聽嗎？',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      blooktouch2c2x: () => [
         '<32>{#p/napstablook}* want to hear my new song?',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      blooktouch2c3a: [ '<32>{#p/napstablook}* oh...\n* well, let me know if you change your mind...' ],
      blooktouch2c3b: [ '<32>{#p/napstablook}* 好...\n* 讓我播放一下...' ],
      blooktouch2c4: () => [
         '<32>{#p/napstablook}* 所以... 你感覺怎麼樣',
         choicer.create('* （你要怎麼回答？）', '好聽', '不好聽')
      ],
      blooktouch2c5a: [
         "<32>{#p/napstablook}* 聽起來... 還不錯？",
         '<32>* 喔-\n* 嗯... 謝謝你...',
         "<32>* 等...\n* 等我做完之後我會告訴你的！"
      ],
      blooktouch2c5b: [ "<32>{#p/napstablook}* 喔.........\n* 你應該是對的........." ],
      blooktouch2d1: [ "<32>{#p/napstablook}* sorry...\n* that's all the music i have for now..." ],
      blooktouch2d2: [ "<32>{#p/napstablook}* sorry...\n* i'll try to make something better next time..." ],
      blookyard1: pager.create(
         0,
         () =>
            SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

               ? [
                    '<32>{#p/napstablook}* you can keep your mew mew doll',
                    '<32>{#p/napstablook}* thanks for...\n* not being helpful, i guess'
                 ]
               : 65 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_hapstablook
                  ? 68 <= SAVE.data.n.plot
                     ? [
                          '<32>{#p/napstablook}* hey, mettaton came by a little while ago.',
                          "<32>* we talked for a bit about what we've been up to...",
                          '<32>* about the family...',
                          "<32>* well, i don't think i've ever been this happy before.",
                          '<32>* what you did for us back there... it means a lot.'
                       ]
                     : [
                          "<32>{#p/napstablook}* hey... sorry things didn't work out the way we hoped...",
                          '<32>* it was nice to have you there, though......'
                       ]
                  : [
                       '<32>{#p/napstablook}* with every day that goes by, i feel a little further away from happiness......'
                    ]
               : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
               ? [ '<32>* oh...\n* hey......', '<32>* i just came back here to keep an eye on the snails......' ]
               : 60 <= SAVE.data.n.plot
               ? [
                    "<32>{#p/napstablook}* being a contestant on one of mettaton's shows was a dream come true...",
                    "<32>* i wonder if i'll ever get to do it again"
                 ]
               : 49 <= SAVE.data.n.plot
               ? [
                    '<32>{#p/napstablook}* 天，你真的跑來跑去的',
                    '<32>* 我是說...',
                    '<32>* 其實我也是...',
                    "<32>* 但是，我是沒有實體的，\n  所以對我來說不算\n  那麼令人印象深刻"
                 ]
               : [
                    '<32>{#p/napstablook}* 歡迎來到幽靈家族的\n  蝸牛農場...',
                    "<32>* ...是的。\n* 我是這裡唯一的員工。",
                    ...(world.killed0
                       ? [
                            "<32>* 嘿，這真怪...",
                            '<32>* 我的蝸牛消失了...',
                            '<32>* 也許是那個留鬍子的人拿走了...'
                         ]
                       : [
                            '<32>* 這個地方原先生意\n  很紅火的...',
                            '<32>* 但有一天我們的主顧\n  突然不來了...',
                            "<32>* 現在只有一個毛茸茸的傢伙\n  會偶爾出現..."
                         ])
                 ],
         () =>
            SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ............' ]
               : 65 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_hapstablook
                  ? 68 <= SAVE.data.n.plot
                     ? [ "<32>{#p/napstablook}* 希望你下次別冒這個險了。" ]
                     : [ '<32>{#p/napstablook}* it is what it is...' ]
                  : [ '<32>{#p/napstablook}* it is what it is...' ]
               : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
               ? [ "<33>{#p/napstablook}* don't worry, they're alright...", '<32>* 至少，我是那麼希望的......' ]
               : 60 <= SAVE.data.n.plot
               ? [ "<32>{#p/napstablook}* 希望他下次能對其他選手\n  好一點吧........." ]
               : 49 <= SAVE.data.n.plot
               ? [
                    '<32>{#p/napstablook}* 喔對了，我早些時候\n  看到你在達人秀上了...',
                    ...(SAVE.data.n.state_aerialis_talentfails === 0
                       ? [
                            "<32>{#p/napstablook}* 真的太精彩了...\n  你一次都沒搞砸",
                            "<32>* 我覺得你應該是\n  開天闢地第一個......"
                         ]
                       : SAVE.data.n.state_aerialis_talentfails < 15
                       ? [
                            "<32>{#p/napstablook}* 即使你的表現不算完美，\n  你也做得很好",
                            "<32>* 鎂塔頓的大多數參賽者\n  甚至都沒堅持到一半...",
                            '<32>* 包括我......'
                         ]
                       : [
                            "<32>{#p/napstablook}* 即使你的表現不是最好的，\n  我也能看出你已經盡力了",
                            '<32>* 更何況，你堅持到了最後...',
                            '<32>* 不像我......'
                         ])
                 ]
               : world.killed0
               ? [
                    "<32>{#p/napstablook}* 喔...\n* 押韻了，不是嗎...",
                    '<32>* 我想我可以為此寫首歌...\n  或許吧...'
                 ]
               : [
                    '<32>{#p/napstablook}* a friend of mine recently told me it was the king...',
                    "<32>* but that can't be true\n* he wouldn't even know me..."
                 ],
         () =>
            SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ............' ]
               : 65 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_hapstablook && 68 <= SAVE.data.n.plot
                  ? [ '<32>{#p/napstablook}* 我沒話講了...' ]
                  : [ '<32>{#p/napstablook}* it is what it is...' ]
               : 60 <= SAVE.data.n.plot
               ? [ '<32>{#p/napstablook}* .........' ]
               : 49 <= SAVE.data.n.plot
               ? SAVE.data.n.state_aerialis_talentfails === 0
                  ? [ '<32>{#p/napstablook}* 那麼，恭喜你' ]
                  : [ '<32>{#p/napstablook}* ......' ]
               : [ '<32>{#p/napstablook}* 我沒話講了...' ]
      ),
      boots1: () => [
         '<32>{#p/human}* （你撿到了一雙懸浮靴。）',
         choicer.create('* （穿上懸浮靴嗎？）', '是', '否')
      ],
      boots2: [ "<32>{#p/human}* （你帶的東西太多，裝不下它了。）" ],
      bruh: [ '<32>{*}{#p/undyne}* 等會見。{^20}{%}' ],
      candy1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你靠近了售貨機。）',
                 choicer.create('* （你想合成什麼呢？）', '甘草糖', '薯片', '口糧', '放棄')
              ]
            : [
                 '<32>{#p/basic}* 要用這臺機器合成什麼呢？',
                 choicer.create('* （你想合成什麼呢？）', '甘草糖', '薯片', '口糧', '放棄')
              ],
      candy2: [ '<32>{#p/human}* （你買了$(x)。）' ],
      candy3: () => [ choicer.create('* （花$(y)G來買$(x)嗎？）', '是', '否') ],
      candy4: [ "<32>{#p/human}* （你的錢不夠。）" ],
      candy5: [ '<32>{#p/human}* （你決定先不買。）' ],
      candy6: [ "<32>{#p/human}* （你帶的東西太多了。）" ],
      candy7: [ '<32>{#p/human}* （你打算什麼也不合成。）' ],
      deathReaction: {
         f_bird: [ '<32>{#p/basic}* 這隻小鳥再也不想帶你過去了。' ],
         
         f_blooky: [
            '<32>{#p/basic}{#npc/a}* 你聽說過安黛因嗎？',
            '<32>{#p/basic}{#npc/a}* 喔，完全沒有！',
            "<32>{#p/basic}{#npc/a}* I heard she's doing well.",
            '<32>{#p/basic}{#npc/a}* Sounds good to me!',
            '<32>{#p/basic}{#npc/a}* 安黛因 永遠不朽。',
            '<32>{#p/basic}{#npc/a}* 肯定不是！'
         ],
         f_dummy: [
            '<32>{#p/basic}{#npc/a}* 檢測到強烈的能量訊號。',
            '<32>* 名字是... 安黛因。',
            '<32>* 關係... 「閨蜜！！！」',
            '<32>* 上次互動... 詢問了關於人類的資訊。',
            '<32>* Time to compensate for loss...',
            '<32>* Indeterminate.'
         ],
         f_hub: [
            "<32>{#p/basic}{#npc/a}* 什...\n* 你都幹了什麼！？",
            "<32>* Ole' Gerson's not gonna be a happy camper after that..."
         ],
         f_snail: () => [
            '<32>{#p/basic}* ...',
            SAVE.data.b.f_state_thundersnail_win
               ? "<32>* 下一局雷霆蝸牛\n  我可絕對不會讓你贏了。"
               : "<32>* 我絕對不會讓你\n  再贏雷霆蝸牛了。"
         ],
         f_undyne: [
            '<32>{#p/basic}* 不。\n* 不行！\n* 不行！！！',
            '<32>* 你。都。幹了。什麼？？？',
            '<32>* 她...',
            '<32>* She was my FAVORITE bully!\n* How dare you take her away from me like that!?'
         ]
      },
      dummy1x: () =>
         SAVE.data.b.flirt_maddummy
            ? [
                 SAVE.data.n.state_wastelands_dummy === 4
                    ? "<32>{#p/basic}* Gah!\n* You're even worse than I thought you'd be!!"
                    : '<32>{#p/basic}* Gah!\n* Just how awful ARE you!?',
                 '<32>* Not only did you hug someone with haphephobia....',
                 '<32>* But the way you did it!?',
                 '<32>* Revolting.\n* Revolting!\n* REVOLTING!!!!'
              ]
            : SAVE.data.n.state_wastelands_dummy === 4
            ? [
                 '<32>{#p/basic}* 呸！\n* 我就知道你會那麼做！！',
                 '<32>* What an IMBECILE!!!\n* You just hugged someone with haphephobia!!!!',
                 "<32>* Guooohh, you're gonna PAY."
              ]
            : [
                 '<32>{#p/basic}* Gah!\n* Why would you EVER do that!?',
                 "<32>* 你知道我是誰嗎！？！？\n* 你剛才抱的那個人可是有接觸恐懼症的！！！！",
                 "<32>* Guooohh, you're gonna PAY."
              ],
      dummy1a: () =>
         SAVE.data.n.state_wastelands_dummy === 2
            ? [ "<32>{#p/basic}* 呵。\n* 我就知道，你這懦夫\n  看到我指定得逃。", '<32>* 是不是啊，笨蛋？' ]
            : [ '<32>{#p/basic}* 放肆！\n* 闖進我的地盤，\n  還把我當空氣？', '<32>* 真是蠢到極點！' ],
      dummy1b: () =>
         SAVE.data.n.state_wastelands_dummy === 1
            ? [ '<32>{#p/basic}* 看到我，嚇破膽了？', '<32>* 你也就這點本事。' ]
            : [ '<32>{#p/basic}* 放肆！\n* 闖進我的地盤，\n  還跟我大眼瞪小眼？', '<32>* 真是蠢到極點！' ],
      dummy1c: () =>
         SAVE.data.n.state_wastelands_dummy === 1
            ? [ '<32>{#p/basic}* 我就知道，\n  不揍我兩下你心都痒痒。', '<32>* 迂腐。\n* 迂腐！\n* 迂腐！！！' ]
            : [
                 "<32>{#p/basic}* 哎呀，看來你來這\n  可不只是想聊聊天。",
                 "<32>* 不過，你那點小把戲\n  在我這屁用沒有！\n* 看我不揍死你！"
              ],
      dummy2: () => [
         '<32>{#p/basic}* 那群飯桶沒殺了你，\n  因為他們少一樣看家本領-\n  沒！有！實！體！',
         "<32>* 沒錯，人類！\n* 有了這個，我就能\n  所向披靡，天下無敵！",
         '<32>* 我是一隻住在人偶裡的幽靈！',
         '<32>* 我的表親以前也住在一個人偶裡，\n  直到...！',
         ...(SAVE.data.n.state_wastelands_toriel === 0
            ? [
                 '<32>* 直到...！',
                 '<32>* 直到...',
                 '<32>{#x1}* ...呃，其實它是自己離開的...',
                 '<32>* 肯定是那位善良的女士\n  在外域給它找到了新家，\n  貼心照顧著它。',
                 '<32>* 我的表親說，\n  有個人類讓那位女士感到幸福。',
                 "<32>* 那個人類就是你，對吧？",
                 '<32>* ...該死。\n* 你走吧，我不打你了...'
              ]
            : [
                 '<32>* 直到你出現為止！！！',
                 ...(16 <= SAVE.data.n.kills_wastelands
                    ? [
                         '<32>* 你的所作所為\n  不光害它離開了自己的家...',
                         '<32>* 還把它的鄰居全嚇跑了！',
                         '<32>* 可惡。\n* 可惡！\n* 可惡！！！',
                         "<32>{#x1}* 你個敗類，人渣，廢物！\n* 我快要氣死了啊啊啊！！！",
                         '<32>* 呀啊啊啊啊啊啊！！！\n* 我的人偶能量快要爆發了！！！'
                      ]
                    : SAVE.data.n.state_wastelands_dummy === 3
                    ? [
                         '<32>* 你... 你...',
                         '<32>* 該死，你這人無聊透頂！',
                         '<32>* They got annoyed and flew away like any self-respecting spectre.',
                         '<32>* 那好吧。\n* 那好吧！\n* 那好吧！！',
                         "<32>* I guess I'll just have to entertain MYSELF!",
                         "<32>* Buckle up, sleepyhead!\n* It's time to put on a show!"
                      ]
                    : SAVE.data.n.state_wastelands_dummy === 4
                    ? [
                         '<32>* 你... 你...',
                         '<32>* 該死，喜歡當老好人是吧？',
                         '<32>* 自己當老好人不要緊，\n  還讓我表親染上抱癮，\n  總想擁抱，戒不掉了！！！',
                         '<32>* 它丟掉了原本的身體，\n  每次發作時，就找我發洩自己的欲望。',
                         "<32>* 它明知道我患有接觸恐懼症，\n  還瘋了似的騷擾我。\n  我快被它煩死了！！！",
                         "<32>* 人類，我要讓你付出代價！"
                      ]
                    : [
                         ...(SAVE.data.n.state_wastelands_dummy === 0
                            ? [
                                 '<32>* 當你和它聊天的時候，\n  它本來希望能好好聊聊...',
                                 '<32>* 但看看你都說了些什麼...！',
                                 '<32>* 真是可怕。\n* 叫人震驚！\n* 難以置信！',
                                 '<32>* 你把他從人偶裡\n  嚇了出來！',
                                 '<32>* 呃啊啊...'
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 1
                            ? [
                                 '<32>* 我們幽靈用一生時間來\n  尋找一個合適的容器。',
                                 '<32>* 漸漸地，漸漸地，我們和\n  新身體的聯繫越來越近，\n  直到有一天...',
                                 '<32>* 我們就可以變成有形的存在，\n  像其他人一樣，歡笑，戀愛，舞蹈。',
                                 "<32>* 但是你呢！！！\n* 我的表親的未來...\n* 你把它給毀了！",
                                 '<32>* 呃啊啊啊啊啊啊！！！'
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 2
                            ? [
                                 '<32>* 它一直羞於見人。\n* 自己孤獨地住在外域...',
                                 '<32>* 然後它遇到了你，\n  希望你跟它交流。',
                                 '<32>* 但你沒有！\n* 你逃跑了！',
                                 '<32>* 可悲。\n* 可悲！\n* 可悲！！！',
                                 "<32>* 沒人能傷了我表親的心\n  還能全身而退！"
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 5
                            ? [
                                 '<32>* 你出現的時候，它多麼希望\n  你能跟他聊聊...',
                                 '<32>* 但你卻給了它一巴掌！',
                                 '<32>* 再一。\n* 再二。',
                                 '<32>* 再三就過分了！！',
                                 '<32>* 你這人怎麼這麼壞！？'
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 6
                            ? [
                                 '<32>* 我表親明明是個很好的人。',
                                 "<32>* 但這不意味著你可以跟它調情！",
                                 '<32>* 你那愚蠢的舉動嚇到了它...',
                                 "<32>* ... 以至於它根本承受不住了！！",
                                 '<32>* 令人作嘔。\n* 令人作嘔！\n* 令人作嘔！！！'
                              ]
                            : []),
                         "<32>* 你會為此而死的，人類！！！！"
                      ])
              ])
      ],
      dummy3: [
         '<32>{#p/basic}* ...？',
         '<32>* 這...\n* 這種感覺...？',
         '<32>{#x3}* 明白了。\n* 明白了！\n* 明白了！！！',
         '<32>* 人類。\n* 剛剛我那徹底失控的情緒...',
         '<32>* 讓我終於可以完美地\n  和我的身體融為一體啦！',
         "<32>* 我是有血有肉的存在了！\n* 我... 我不是在做夢吧？\n* 這是真的嗎？？？",
         "<32>* 作為報答，\n  我不會再攻擊你啦。",
         "<32>* 怎麼樣？"
      ],
      dummy4: (mover: boolean) => [
         ...(mover
            ? [
                 SAVE.data.n.state_foundry_maddummy === 1
                    ? '<32>{#p/napstablook}* 嘿...\n* 我好像聽到有人被襲擊了...'
                    : '<32>{#p/napstablook}* 嘿...\n* 我好像聽到了有人在喊叫...',
                 "<32>{#p/napstablook}* 但你似乎沒事",
                 '<32>* 其實我正準備回家...'
              ]
            : [ "<32>{#p/napstablook}* 嗯...\n* 我現在要回家了..." ]),
         ...(world.sad_ghost || world.population === 0
            ? [
                 '<32>* 提醒你一下...',
                 "<32>* 別不小心跟我一起回到家了...",
                 "<32>* 你不會喜歡那樣的..."
              ]
            : [
                 '<32>* 所以... 嗯...\n* 如果你想「附」約的話...\n  隨時都可以...',
                 '<32>* 但別有壓力...',
                 "<32>* 如果你忙，我能理解...",
                 "<32>* 沒關係的...",
                 '<32>* 不用擔心...',
                 "<32>* 只是想說我先邀請一下..."
              ])
      ],
      dummypunch1: () =>
         SAVE.data.b.oops
            ? [
                 "<32>{#p/basic}* 一個訓練人偶。\n* 教訓教訓它嗎？",
                 choicer.create('* （動手嗎？）', '是', '否')
              ]
            : [ "<32>{#p/basic}* 一個訓練人偶。\n* 抱抱它嗎？", choicer.create('* （抱一下人偶嗎？）', '是', '否') ],
      dummypunch2a: [ '<32>{#p/human}* （你打算不這麼做。）' ],
      dummypunch2b: () =>
         world.genocide || world.meanie
            ? [ '<32>{#p/human}* （你使勁揍了人偶一拳。）' ]
            : SAVE.data.n.exp > 0
            ? [ '<32>{#p/human}* （你給人偶來了一拳。）' ]
            : SAVE.data.b.oops
            ? [ '<32>{#p/human}* （...你只是戳了戳人偶。）' ]
            : SAVE.data.b.flirt_maddummy
            ? [ '<32>{#p/human}* (You tenderly embraced the dummy.)' ]
            : [ '<32>{#p/human}* （你抱了抱人偶。）' ],
      dummypunch3: () =>
         SAVE.data.b.f_state_dummypunch
            ? [ "<32>{#p/basic}* 人偶被你教訓了一頓。" ]
            : SAVE.data.b.flirt_maddummy
            ? [ "<32>{#p/basic}* It's a red-faced hugging dummy." ]
            : [ "<32>{#p/basic}* 一個很開心的抱抱人偶。" ],
      epicreaction: () =>
         [
            [ '<25>{#p/kidd}{#f/7}* 那是什麼！？' ],
            [ '<25>{#p/kidd}{#f/7}* 呃啊！！' ],
            [ '<25>{#p/kidd}{#f/7}* 別再來了啊！' ],
            [ '<25>{#p/kidd}{#f/7}* 那東西到底有多少啊！' ],
            [ '<25>{#p/kidd}{#f/7}* 認真的嗎！？' ],
            [ '<25>{#p/kidd}{#f/7}* 天啊！！' ],
            [ "<25>{#p/kidd}{#f/4}* 我們得想辦法\n  從這裡出去..." ],
            [ '<25>{#p/kidd}{#f/4}* ...' ]
         ][Math.min(SAVE.data.n.state_foundry_kiddreaction++, 7)],
      fallenfish: [ '<33>{#p/basic}* 電流通過了她的全身。' ],
      fallenfish2: [ "<32>{#p/basic}* 她倒下了。" ],
      fallenfish3: [ '<32>{#p/basic}* ... 但是什麼也沒發生。' ],
      finalfish1: [ '<25>{#p/undyne}{#f/19}* 嘎啊...' ],
      finalfish2: [ '<25>{#p/undyne}{#f/19}* 該死的...\n* 幹擾...' ],
      finalpre: () => [ choicer.create('* (Continue to Aerialis?)', '是', '否') ],
      genotext: {
         asgoreFinal1: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.n.ga_asrielStutter < 1
                  ? [
                       '<25>{#p/asgore}{#f/15}* 看來，\n  你還是跟他一夥了啊...',
                       '<25>{#p/asriel2}{#f/7}* 誰都沒法把我\n  和$(name)分開。\n* 您不會連這都不知道吧？',
                       '<25>{#p/asgore}{#f/15}* $(name)... 我-我當然知道啊！\n* 那... 你-你倆旁邊的小孩\n  又是怎麼回事？',
                       "<25>{#p/asriel2}{#f/8}* 關你屁事。",
                       "<25>{#p/asgore}{#f/15}* （呃... 早該料到的...）",
                       "<25>{#p/asriel2}{#f/6}* 算了，簡單來說呢...\n* 我正帶它「四處遊歷」呢。",
                       "<25>{#f/6}* 遊歷小分隊只有我們仨，\n  沒人加你。\n* 意不意外？",
                       '<25>{#p/asgore}{#f/15}* 誰-誰稀罕加入你們了？？',
                       '<25>{#p/asriel2}{#f/6}* 還裝呢？',
                       "<25>{#p/asgore}{#f/15}* 呃... \n  我就是來看一眼你們在幹啥。\n* 沒別的想法。",
                       "<26>{#p/asriel2}{#f/10}{#x1}* ...\n* 不對勁。",
                       '<25>{#p/asriel2}{#f/10}* 艾菲斯博士？\n* ...是你吧？'
                    ]
                  : [
                       '<25>{#p/asgore}{#f/15}* 看來，\n  你還是跟他一夥了啊...',
                       '<25>{#p/asriel2}{#f/8}* 誰都沒法把我\n  和$(name)分開，\n  艾菲斯。',
                       "<25>{#p/asriel2}{#f/7}* 不過，我再怎麼跟你解釋，\n  都是對牛彈琴，\n* 你說是不？"
                    ]
               : [
                    '<25>{#p/asgore}{#f/15}* 看來，\n  你還是跟他一夥了啊...',
                    '<25>{#p/asriel2}{#f/8}* 誰都沒法把我\n  和$(name)分開，\n  艾菲斯。',
                    ...(SAVE.flag.n.ga_asrielQuestion < 1
                       ? [ "<25>{#p/asriel2}{#f/7}* 你都準備好要殺我們了呢。\n* 別以為我不知道。" ]
                       : [ '<25>{#p/asriel2}{#f/7}* 真以為你能阻止我們？' ])
                 ],
         asgoreFinal2: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? [
                    '<25>{#p/alphys}{#g/alphysThatSucks}* ...騙不過你，嗯？',
                    '<25>{#p/asriel2}{#f/3}* 是呢。',
                    "<25>{#p/alphys}{#g/alphysGarbo}* ...\n* 起碼說了句實話。",
                    '<25>{#p/asriel2}{#f/13}* 看著好友死去，\n  你肯定急瘋了...',
                    "<25>{#p/asriel2}{#f/16}* 沒法和你感同身受呢。",
                    '<25>{#p/alphys}{#g/alphysIDK}* ...',
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* 真-真不該來這裡。',
                    "<25>{|}{#p/asriel2}{#f/8}* 你不會又想- {%}"
                 ]
               : [
                    '<25>{#p/alphys}{#g/alphysOhGodNo}* 你說什麼？',
                    "<25>* 我...\n* 我-我哪敢對付你們啊！",
                    ...(SAVE.flag.n.ga_asrielQuestion < 1
                       ? [ '<25>{#p/asriel2}{#f/10}* ...是嗎？', '<25>{#p/alphys}{#g/alphysIDK}* ...' ]
                       : [ '<25>{#p/asriel2}{#f/7}* ...' ]),
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* 真-真不該來這裡。'
                 ],
         asgoreFinal3: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? [ '<25>{#p/asriel2}{#f/7}* 真是個膽小鬼。' ]
               : [
                    [ "<25>{#p/asriel2}{#f/15}* 呵... 把話說早了。" ],
                    [ '<25>{#p/asriel2}{#f/15}* 行吧。' ]
                 ][Math.min(SAVE.flag.n.ga_asrielQuestion++, 1)],
         asgoreMK1: [
            '<25>{#p/kidd}{#f/7}* 哇，那是...\n  我在做夢吧...',
            "<25>{#f/1}* 真的是國王欸！",
            '<25>* 艾斯戈爾國王！\n* 您來這做啥呢！？',
            '<25>{#p/asgore}{#f/3}* ...',
            '<25>{#f/3}* 這事... 說來話長啊。',
            '<25>{#p/kidd}{#f/4}* 噢...',
            '<25>{#f/1}* 沒事，您跟我說說吧！',
            '<25>{#p/asgore}{#f/7}* 呃...\n* 對不起，我不能說。',
            '<25>{#f/6}* 不過，我有個事想問你。',
            '<25>{#p/kidd}{#f/3}* ...？',
            '<25>{#p/asgore}{#f/7}* 這個人類是你的好朋友嗎？',
            '<25>{#p/kidd}{#f/1}* 嗯... 對呀！',
            '<25>{#f/4}* 可是，之前跟我們在一塊的\n  另一個小孩...',
            "<25>{#f/8}* ...我很害怕他。",
            "<25>{#p/asgore}{#f/1}* 看來就是他了。\n* 都是因為他...",
            '<25>{#p/kidd}{#f/4}* 怎麼了？',
            '<25>{#p/asgore}{#f/6}* 呃... 沒事。\n* 我不該拿這事打攪你的。',
            '<25>{#f/3}* 而你，人類...',
            '<25>{#f/2}* 你和離開的那位「朋友」\n  闖了不少禍。',
            '<25>{#f/1}* 許許多多怪物都...\n  哎，你知道我要說什麼。',
            '<25>{#p/kidd}{#f/4}* ...到底怎麼了？',
            '<25>{#p/asgore}{#f/7}* 沒事，沒事。\n* 我只是覺得...',
            '<25>{#f/5}* 相比... 我剛說的，\n  你還可以做點更有意義的事。',
            '<25>{#f/5}* 說不上來為什麼，不過...\n  也許帕派瑞斯沒說錯。',
            '<25>{#f/6}* 既然你的「朋友」\n  已經拋下了你...',
            '<25>* 那你就有機會重新來過了。',
            "<25>{#p/kidd}{#f/1}* 我會幫忙的！",
            '<25>{#p/asgore}{#f/6}* 哈哈，小傢伙，\n  說不定你真能幫上忙。\n* 真說不定呢。',
            '<25>{#f/5}* 我們上次見面之後，\n  我就努力在想... \n  這一切究竟是怎麼回事。',
            '<25>{#f/2}* 真的不想承認，可...\n* 他實在陷得太深了。',
            '<25>{#f/2}* 我的兒子...\n  再也回不來了。',
            "<25>{#p/kidd}{#f/4}* 你們聊吧，我先不插嘴了...",
            '<25>{#p/asgore}{#f/1}* 沒關係，沒關係。\n  我快說完了。',
            '<25>{#f/1}* 人類，我剛說的話\n  往心裡去吧。',
            '<25>{#f/1}* 這我唯一的請求了。'
         ],
         asgoreMK2: [
            "<25>{#p/kidd}{#f/2}* 哇... 他好厲害！",
            "<25>{#f/1}* 之前聽別人說過國王的演講。\n  但親眼見到，真的酷斃了！",
            '<25>{#f/3}* 他要是我爹該多好啊...'
         ],
         asriel32: [
            '<25>{#p/asgore}{#f/15}* ...',
            '<25>{#f/16}* 看來我的話\n  你一個字都沒聽進去。',
            '<25>{#p/asriel2}{#f/3}* 那肯定的。',
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#f/16}* 你知道嗎...\n  有件事一直困擾著我。',
            '<25>{#f/16}* 現在你不認我這個爹，\n  可你就是我的兒子啊...',
            '<25>{#f/15}* 儘管那是很久以前的事了。',
            '<25>{#p/asriel2}{#f/10}* 你到底想說啥？',
            '<25>{#p/asgore}{#f/12}* ...',
            '<25>{#p/asgore}{#f/12}* 唉... 究竟怎麼了？',
            '<25>{#f/12}* 為什麼...\n  我面前的這個你... \n  看著這麼陌生？',
            '<26>{#p/asriel2}{#f/6}* 你真想知道嗎？',
            '<26>{#p/asgore}{#f/7}* ...',
            '<26>{#p/asriel2}{#f/7}* 說實話。',
            '<26>{#p/asgore}{#f/1}* ...\n* 呃，不...\n* 我不太確定...',
            "<26>{#p/asriel2}{#f/8}* 切。\n* 這慫樣，才像我認識的\n  艾斯戈爾嘛。",
            "<26>{#f/6}* 只會裝作啥~事兒\n  都沒有的樣子，\n* 我說得沒錯吧？",
            "<26>{#f/7}* 老東西，你猜怎麼著？\n* 現在想亡羊補牢，已經晚嘍。",
            "<26>{#f/8}* （要不是你拿這該死的\n  全息影像糊弄我，現在就可以\n  好好「開導開導」你。）",
            '<26>{#p/asgore}{#f/12}* ...',
            '<26>{#p/asriel2}{#f/8}* ...',
            '<26>{#p/asgore}{#f/15}* 你知道嗎？我常常在想...\n  自己為何淪落到如此地步。',
            '<25>{#f/16}* 家園被毀，愛子離去，\n  只能被束縛在\n  這片土地之上...',
            '<25>{#f/15}* 如今，前哨站危在旦夕，\n  我卻只能眼睜睜地看著。',
            "<25>{#p/asriel2}{#f/15}* 您老這是在向我尋求\n  獨到見解嗎？\n* 真是可悲...",
            '<25>{#f/16}* 就讓我給你個小小的忠告吧：\n* 下輩子，別再挑起戰爭了。',
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#f/4}* 你...',
            '<25>{#f/2}* ...',
            '<25>{#f/6}* 艾斯利爾，你猜怎麼著？\n* 我想通了。',
            "<25>{#f/7}* 你說的都對。",
            '<25>{#f/5}* 跟你講理，完全是浪費時間。',
            "<25>{#p/asriel2}{#f/15}* ...哇。\n* 您可終於開竅了。",
            '<25>{#f/16}* 真令我刮目相看啊。',
            '<25>{#p/asgore}{#f/1}* ...',
            "<25>{#p/asriel2}{#f/10}* 然後呢？\n* 這位英明的國王\n  要怎麼行動呢？",
            '<25>{#p/asgore}{#f/15}* 你認真的？',
            '<25>{#f/15}* ...',
            '<25>{#f/16}* 我不知道，艾斯利爾。'
         ],
         asriel33: [ '<25>{#p/asriel2}{#f/10}* ...他這是要發火了？' ],
         
         asriel34: [
            "<25>{#p/asriel2}{#f/3}* 我去處理點事，\n  你倆先作個伴。",
            '<25>{#p/kidd}{#f/3}* 你一會還回來嗎？\n* 還想聽你講更多\n  安黛因的軼事呢...',
            "<25>{#p/asriel2}{#f/4}* 說到做到。",
            "<25>{#f/1}* 別擔心，我去去就回。",
            '<25>{#p/kidd}{#f/4}* 好吧...'
         ],
         asriel34x: [ '<25>{#p/asriel2}{#f/3}* 停一下。' ],
         asriel35: () =>
            SAVE.flag.n.undying > 0
               ? [
                    [
                       '<25>{#p/asriel2}{#f/6}* Well, here we are again, $(name).',
                       "<25>{#f/7}* ... look, I know Undyne won't die when the kid attacks her.",
                       "<25>{#f/15}* From what I can see, though, it's our best way forward for now.",
                       "<25>{#f/16}* Let's just stick to the script, okay?"
                    ],
                    []
                 ][Math.min(SAVE.flag.n.ga_asrielUndying++, 1)]
               : [
                    [
                       '<25>{#p/asriel2}{#f/1}* 哈囉，$(name)。',
                       '<25>{#f/13}* 想我了沒？',
                       '<25>{#f/4}* 唉，對不起。\n* 剛才我有事要辦，\n  又把你扔下了。',
                       "<25>{#f/3}* 不過，我可沒閒著。",
                       "<25>{#f/13}* $(name)，\n  我看到你那小夥伴\n  和你告別...",
                       '<25>{#f/16}* 你肯定感覺老~孤單了。\n  對不對？所以呢...'
                    ],
                    []
                 ][Math.min(SAVE.flag.n.ga_asriel35++, 1)],
         asriel37: () => [
            '<25>{#p/asriel2}{#f/1}* 我又把它請回來了！',
            "<25>{#f/17}* 我讓你做啥，你就做啥。\n  聽見沒有？",
            '<25>{#p/kidd}{#f/9}* 嗯...'
         ],
         asriel38: () => [
            ...[
               [
                  
                  '<25>{#p/asriel2}{#f/17}* 瞧，不錯吧？',
                  "<25>{#f/16}* 跟你說，\n  為了讓它能服服帖帖的，\n  我費了好大功夫呢！",
                  ...(SAVE.data.n.state_foundry_muffet === 1
                     ? [
                          '<25>{#f/15}* 那崽子嘴裡一直叨咕\n  「忘了我忘了我」，沒完沒了...',
                          '<25>{#f/10}* 天吶，$(name)。\n* 我不在的時候，\n  你對它幹了些什麼啊？'
                       ]
                     : [
                          "<25>{#f/15}* 那崽子沒完沒了地問\n  「我的朋友在哪」...",
                          '<25>{#f/10}* 天吶，$(name)。\n* 我不在的時候，\n  你倆一起幹了些啥啊？'
                       ]),
                  "<25>{#f/3}* 呃，當我沒問。\n* 過去的就翻篇吧。重要的是，\n  它又能「陪」著咱們了。"
               ],
               [ "<25>{#p/asriel2}{#f/3}* 唔...\n  最起碼把它搞定了。" ]
            ][Math.min(SAVE.flag.n.ga_asriel38++, 1)]
         ],
         asriel39: [
            '<25>{#p/asriel2}{#f/8}* 停。\n* 小崽子，幫個忙。',
            '<25>{#p/kidd}{#f/9}* ...？',
            '<25>{#p/asriel2}{#f/6}* 解開謎題。'
         ],
         asriel40: () =>
            SAVE.flag.n.ga_asriel40++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/10}* 完活了？\n* 真快啊...',
                    '<25>{#f/3}* $(name)，你瞧：\n  優柔寡斷，磨磨嘰嘰\n  就是怪物的劣根性。',
                    '<25>{#f/16}* 什麼希望，恐懼，同理心...\n* 那群怪物就是被這毀了，\n  最後一個個都一事無成。',
                    "<25>{#f/15}* 要是怪物們都能像\n  這崽子一樣說一不二，\n  那該多好啊。"
                 ]
               : [ '<25>{#p/asriel2}{#f/4}* 擱這照葫蘆畫瓢呢。' ],
         asriel41: [ '<25>{#p/asriel2}{#f/3}* 小崽子，回來。' ],
         asriel42: [ "<25>{#p/asriel2}{#f/4}* 只要有了這崽子，\n  完成計畫簡直不要太簡單。" ],
         asriel43: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/16}* 結束了...",
                  "<25>{#f/3}* $(name)，我們贏了。",
                  '<25>{#f/2}* 總算解決掉了\n  皇家衛隊的隊長...',
                  '<25>{#f/15}* 她不會真覺得\n  自己能幹得過咱們吧？',
                  SAVE.flag.n.undying > 2
                     ? '<25>{#f/8}* 誠然，\n  她逼咱們回溯了好幾次...'
                     : SAVE.flag.n.undying > 1
                     ? '<25>{#f/8}* 誠然，\n  她逼咱們回溯了一次...'
                     : '<25>{#f/8}* 誠然，她夠英勇。\n  敢和我們對著幹...',
                  '<25>{#f/7}* 但她再怎麼逞強，\n  終究也難逃厄運。'
               ],
               [
                  '<25>{#p/asriel2}{#f/3}* ...這次雖然勝了，\n  但沒第一回爽。',
                  '<25>{#f/4}* 唉，好吧。'
               ],
               [ '<25>{#p/asriel2}{#f/6}* 殺她都快成咱們的\n  家常便飯了。' ],
               [ '<25>{#p/asriel2}{#f/6}* ...' ]
            ][Math.min(SAVE.flag.n.ga_asriel43++, 3)],
         asriel44: [ '<25>{#p/asriel2}{#f/13}* 呃，$(name)，\n  你來帶路吧。' ],
         asriel45: [
            '<25>{#p/asriel2}{#f/13}* 嘻嘻嘻...{%40}',
            "<25>{#f/16}* 有你幫助我，真是太好了。{%40}",
            "<25>{#f/1}* 這身體確實不完美，\n  但那又怎樣？{%40}",
            "<25>{#f/2}* 有了它...\n  我就再也不用當\n  會說話的蠢星星了。{%40}"
         ],
         asrielHug1: [ '<25>{#p/asriel2}{#f/13}* ...' ],
         asrielHug2: [ '<25>{*}{#p/asriel2}{#f/13}* $(name)...{^100}{%}' ],
         asrielHug3: [ '<25>{#p/asriel2}{#f/13}* 呃...\n* 謝謝你，$(name)。' ],
         bombshell1: [
            '<32>{*}{#p/alphys}* 會說話的... 星星...？',
            '<32>{*}* 但那個實驗...\n  不-不是失敗了嗎...',
            '<32>{*}* 莫非...'
         ],
         bombshell2: [ '<32>{*}* 不...', '<32>{*}{@random=1.1/1.1}* 不...' ],
         bombshell3: [
            '<32>{*}{@random=1.1/1.1}* 托麗爾...\n* 衫斯...\n* 帕派瑞斯...',
            '<32>{*}{@random=1.1/1.1}* 安黛因...',
            "<32>{*}{@random=1.1/1.1}* 是-是我...",
            
         ],
         bombshell4: [ "<32>{*}{@random=1.1/1.1}{#i/5}* 是我害死了你們..." ],
         kidd1: [
            '<25>{#p/kidd}{#f/4}* 他叫你什麼來著？\n* $(name)... 是吧？',
            '<25>{#f/3}* 好，$(name)。\n  這話可別告訴他喔。',
            '<25>{#f/4}* 跟他在一塊...\n  我覺得很不自在。'
         ],
         kiddFinal1: [
            '<25>{#p/kidd}{#f/11}* ...！',
            "<25>{#p/asriel2}{#f/5}* 我懂，我懂。\n* 很興奮，是不是呀？",
            '<25>{#p/kidd}{#f/9}* ...',
            "<25>{|}{#f/12}* 我沒有- {%}",
            "<25>{#p/asriel2}{#f/4}* 不用說了。\n* 沒關係的。",
            '<25>{#p/asriel2}{#f/3}* 別把正事給忘了就行。'
         ],
         kiddFinal2: () => [
            '<25>{#p/kidd}{#f/9}* 安黛因...',
            '<25>{#p/asriel2}{#f/10}* ...？',
            '<25>{#f/6}* 嗯...\n* 不敢了，是不是？',
            "<25>{|}{#p/kidd}{#f/12}* 對不起，我- {%}",
            "<25>{#p/asriel2}{#f/13}* 什麼「安黛因」，\n  「安呆因」...\n* 就她還配叫「英雄」？",
            '<25>{#p/asriel2}{#f/4}* 真英雄...\n  都是靠智慧取勝的。',
            SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.n.ga_asrielKiddFinal1++ < 1
                  ? '<26>{#f/15}* 比如...\n* 呃，總之不是她。'
                  : '<25>{#f/15}* 她可算不上。'
               : '<26>{#f/3}* 比如艾菲斯。',
            '<25>{#p/kidd}{#f/12}* 她... 真的...'
         ],
         kiddFinal3: () => [
            '<25>{#p/kidd}{#f/10}* ...',
            "<25>{#f/10}* 安黛因不會死。",
            '<25>* 即使我動手，她...',
            "<25>* 她也不會死。\n* 她多強啊...",
            ...(SAVE.flag.n.ga_asrielKiddFinal3a < 1
               ? [ '<25>{#p/asriel2}{#f/8}* （吹，隨便吹。）\n* （你高興就好。）' ]
               : []),
            "<25>{#p/kidd}{#f/9}* 因為...\n* 她... 是最強的...",
            "<25>{#f/12}* 她充滿了{@fill=#ff0}決心{@fill=#fff}...",
            ...(SAVE.flag.n.ga_asrielKiddFinal3a++ < 1
               ? [ '<25>{#p/asriel2}{#f/10}* 呃... 你沒事吧？\n* （我去，這崽子說什麼呢？）' ]
               : SAVE.flag.n.undying > 0 && SAVE.flag.n.ga_asrielKiddFinal3b++ < 1
               ? [ '<25>{#p/asriel2}{#f/8}* （它怎麼知道？）' ]
               : [ '<25>{#p/asriel2}{#f/10}* ...' ])
         ],
         kiddFinal4: [ '<32>{#p/asriel2}{#f/6}* 她在那。' ],
         kiddFinal5: [ '<32>{#f/6}* 崽子。', '<32>{#f/7}* ...' ],
         kiddFinal6: [ '<32>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* 給我上。{%100}' ],
         kiddFinal7: [
            '<25>{#p/kidd}{#f/12}* ...',
            '<25>{#p/undyne}{#f/13}* 你這毛孩子，\n  來這湊什麼熱鬧？！',
            '<25>{|}{#f/13}* 還有，你眼睛怎麼- {%}'
         ]
      },
      goatreaction: () =>
         [
            [ '<25>{#p/asriel2}{#f/15}* 小心點，$(name)。' ],
            [ '<25>{#p/asriel2}{#f/15}* $(name)...' ],
            [ '<25>{#p/asriel2}{#f/15}* 開玩笑嗎？' ],
            [ "<25>{#p/asriel2}{#f/15}* 我們可不想死在這，\n  $(name)..." ],
            [ "<25>{#p/asriel2}{#f/16}* 我有點擔心了。" ],
            [ '<25>{#p/asriel2}{#f/8}* 你是眼瞎還是有什麼毛病？' ],
            [ '<25>{#p/asriel2}{#f/7}* 別鬧了！' ],
            [ '<25>{#p/asriel2}{#f/7}* ...' ]
         ][Math.min(SAVE.flag.n.ga_asrielEpic++, 7)],
      hapstadoor1: () =>
         SAVE.data.b.svr ? [ "<32>{#p/human}* (But you didn't have the key.)" ] : [ "<32>{#p/basic}* 鎖住了。" ],
      hapstadoor2: [ '<32>{#p/human}* (You use the Mystery Key.)' ],
      jumpsuit1: () => [
         '<32>{#p/human}* （你撿到了一件飛行服。）',
         choicer.create('* （穿上飛行服嗎？）', '是', '否')
      ],
      jumpsuit2: [ "<32>{#p/human}* （你帶的東西太多，裝不下它了。）" ],
      kiddStatue: [
         '<25>{#p/kidd}{#f/1}* 喲，我記得這個地方！',
         '<25>{#f/3}* 我，呃，我媽媽帶我\n  來過一次，哈哈。',
         "<25>{#f/1}* 如果我們一人站在一邊的\n  開關上，燈就會亮起來。\n* 很厲害吧！？"
      ],
      kitchencall: () => [
         '<32>{#p/event}* 鈴鈴，鈴鈴...',
         '<18>{#p/papyrus}人類！\n我在想。',
         ...(SAVE.data.n.plot_date < 1
            ? [
                 SAVE.data.b.flirt_papyrus
                    ? '<18>我們該挑個時間\n去約會了！'
                    : '<18>我們該挑個時間\n一起出去玩了！',
                 "<18>{#f/5}而且...\n我已經有好一段時間\n沒看到你了。",
                 "<18>{#f/0}有機會敘一下舊\n真是太好了！",
                 "<18>{#f/0}那行，等你準備好了\n你就來我家找我。"
              ]
            : [
                 '<18>所以，你知道我跟你\n當初是怎麼相處的嗎？',
                 '<18>{#f/5}我覺得... 安黛因\n也應該跟你\n好好相處一下。',
                 '<18>{#f/4}而且，我敢打賭你們\n肯定能成為\n很好的朋友...',
                 SAVE.data.b.flirt_papyrus ? '<18>{#f/6}...朋友而已！' : '<18>{#f/0}就像咱倆一樣！',
                 "<18>{#f/0}那，等你準備好\n就來安黛因的家門口\n見我吧。"
              ]),
         '<18>{#f/9}肯定會經歷一段\n非常棒的時光的！',
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      madfish1: () => [
         ...(SAVE.flag.n.ga_asrielUndyneX++ < 1
            ? [ '<25>{#p/asriel2}{#f/8}* 接下來，又到了\n  聽高談闊論的時間了...' ]
            : []),
         '<32>{#p/undyne}* 站住。',
         '<32>{#x1}* 真以為自己能\n  大搖大擺地濫殺無辜，\n  沒人管得了你們？',
         '<32>* 我告訴你，兩個小混蛋：',
         '<32>* 你們的死期到了！',
         '<32>{#x2}* 以為自己勉勉強強\n  過了督吉這關就了不起了？\n  聽好了...',
         "<32>{#x3}* 只要剩下的特戰隊成員\n  逮到你們，就等著受苦吧。"
      ],
      madfish2: () =>
         SAVE.flag.n.genocide_milestone < 5
            ? [
                 '<32>* 無話可說？\n* 呵。',
                 "<32>{#x4}* 眼下，我可沒閒工夫陪你們玩。\n  我得去幫艾菲斯疏散民眾。",
                 "<32>{#x5}* 呋呼呼...\n* 在臨死之前好好掙扎吧。\n* 你活不長的。"
              ]
            : [
                 '<32>* 無話可說？\n* 呵。',
                 "<32>{#x4}{|}* 眼下，我可沒\n  閒工夫陪你們玩。\n  我得去幫Alphys- {%}",
                 "<25>{#x5}{#p/asriel2}{#f/8}* 跟你說，\n  艾菲斯可比你強多了。",
                 "<25>{#f/2}* 我早就知道\n  這條時間軸的後續發展了。",
                 '<25>{#f/1}* 和她比起來，\n  你的攻擊屁都不是。',
                 '<32>{#p/undyne}* 真的嗎？',
                 "<32>* ...好吧。\n* 即便如此，你還是得先過我這一關。",
                 '<32>{#p/asriel2}{#f/6}* 喔，相信我。\n* 我們肯定能打敗你。',
                 "<32>{#p/undyne}* 走著瞧。"
              ],
      madfish3: () =>
         SAVE.flag.n.genocide_milestone < 5
            ? SAVE.flag.n.ga_asrielMadfish++ < 1
               ? [ '<25>{#p/asriel2}{#f/8}* 她愛咋咋地。' ]
               : [ '<25>{#p/asriel2}{#f/8}* ...' ]
            : [ '<25>{#p/asriel2}{#f/8}* 切。' ],
      muffet1: () =>
         badSpider()
            ? [ '<32>{#p/basic}* 啊呼呼呼呼...', '<32>* Tell her she should increase my payout next time.' ]
            : SAVE.data.b.flirt_muffet
            ? [ '<32>{#p/basic}* 啊呼呼呼呼...', "<32>* Let's just pretend this never happened, shall we, dearies?" ]
            : [ '<32>{#p/basic}* 啊呼呼呼呼...', '<32>* 剛才很有趣喔！\n* 下次再見，親！' ],
      muffet2: () =>
         badSpider()
            ? [ '<25>{#p/kidd}{#f/4}* 喲...\n  剛才那好奇怪...' ]
            : SAVE.data.b.flirt_muffet
            ? [ "<25>{#p/kidd}{#f/4}* 喲...\n  至少現在沒事了？" ]
            : [ '<25>{#p/kidd}{#f/4}* 喲...\n  一點都不好玩。' ],
      muffetGeno1: () =>
         SAVE.data.n.state_foundry_kidddeath < 1
            ? [ '<25>{#p/kidd}{#f/4}* 喲...\n* 剛發生什麼了？', '<25>* 她是... {%}' ]
            : [
                 '<25>{#p/kidd}{#f/4}* 喲... 她又...',
                 '<25>* 為什麼怪物都這麼消失呢？{%}'
              ],
      muffetGeno1x: [ "<32>{#p/basic}* 她死了。" ],
      muffetGeno2: [
         "<25>{#p/kidd}{#f/7}* 不-不...\n* 我不是故意...",
         "<25>{#f/7}* 她-她沒... 不會的...\n* 她...",
         "<25>{#f/4}* 不，這...\n* 這不可-可能...",
         '<25>{#f/4}* 她只是...',
         '<25>{#f/8}* 只是...'
      ],
      muffetGeno3: [ '<25>{#f/8}* ...', '<25>{#f/8}* ...我幹了什麼...' ],
      mushroomdance1: [ '<32>{#p/basic}* 蘑菇舞\n* 蘑菇舞\n* 管它什麼意義' ],
      mushroomdance2: () =>
         SAVE.data.n.plot === 72
            ? SAVE.data.b.f_state_mushroomdanceEpilogue
               ? [ '<32>{#p/basic}* 意思是模糊的未來。' ]
               : SAVE.data.b.f_state_mushroomdanceGeno
               ? [
                    "<32>{#p/basic}* 意思是我將自由。\n* 會有人把我移植到新家園。",
                    '<32>* But why should you care?\n* Unless...',
                    '<32>* ... unless you have absolved yourself of sin?'
                 ]
               : [
                    "<32>{#p/basic}* 意思是我將自由。\n* 會有人把我移植到新家園。",
                    '<32>{#p/basic}* Goodbye, old outpost, for you have been my abode...'
                 ]
            : world.meanie || SAVE.data.s.state_foundry_deathroom === 'f_village' // NO-TRANSLATE

            ? SAVE.data.b.f_state_mushroomdanceGeno
               ? [ "<32>{#p/basic}* 意思是... 別再和我說話。" ]
               : [
                    "<32>{#p/basic}* 意思是你過著罪惡的一生。",
                    ...(SAVE.data.b.f_state_mushroomdance ? [ "<32>* Wait.\n* Weren't you nicer before?" ] : [])
                 ]
            : SAVE.data.b.f_state_mushroomdance
            ? [
                 '<32>{#p/basic}* 要是我能看到遠處的星系，\n  就好了。',
                 '<32>* 但哪怕力場被摧毀了，\n  我要怎麼離開呢...？'
              ]
            : [
                 '<32>{#p/basic}* 它代表了我被菌絲困在這裡，\n  所產生的內心的痛楚。',
                 '<32>* 我奮力地掙扎著。\n* 我竭力地想掙脫。\n* 可惜啊，無濟於事。'
              ],
      musicbox: [
         '<18>{#p/asriel1}{#v/1}{#i/4}剛才聽到的聲音\n應該就是附近傳來的...',
         "<18>啊！你的飛船墜毀了，\n是嗎...",
         '<18>你還好嗎？',
         '<18>來，我扶你起來...',
         '<18>...',
         '<18>$(name)，是嗎？',
         "<18>這名字真好聽。",
         '<18>{*}{#x1}{#p/asriel3}{#i/36}我的名字是   {%}'
      ],
      napcomputer1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : [
                 SAVE.data.b.svr
                    ? '<32>{#p/human}* （你走向了電腦...）'
                    : '<32>{#p/basic}* 電腦上打開了一個音樂分享軟體。',
                 choicer.create('* （看一眼嗎？）', '是', '否')
              ],
      napcomputer2: [ '<32>{#p/human}* （你不想看。）' ],
      napcomputer3: {
         a: () => [
            '鎂塔靜聽 - 日光漣漪.kwac',
            '鎂塔靜聽 - 星河渡歌.kwac',
            SAVE.data.n.plot === 72 ? '緣聚緣散.kwac' : '惡狼.kwac',
            '喵喵航天行 - 主題曲.kwac',
            !world.genocide && SAVE.data.n.state_starton_papyrus === 1 ? '帕派瑞斯求包養.kwac' : '滑腔動調.kwac',
            '群星之歌.kwac'
         ],
         b: () => [
            '酷炫骷髏95',
            '酷炫骷髏95',
            SAVE.data.n.plot === 72 ? '_舟亢忝洐_' : '_摋掱亾耦_',
            '艾菲斯',
            '懶骨.',
            '（遊客）'
         ]
      },
      napcomputer4: {
         a: () => [ '鬼怪舞曲.kwac', '鬼怪混音集.kwac' ],
         b: () => [ '納普斯特22', '納普斯特22' ]
      },
      noTem: [ "<32>{#p/tem}* oh no, it's a... FISHES!!!" ],
      noShroom: [ "<32>{#p/basic}* Watch out\n* Watch out\n* There's a fish running about" ],
      noTortoise: () =>
         world.population === 0 ? [ '<32>{#p/basic}* 哇哈哈...' ] : [ '<32>{#p/basic}* Run while ya still can, kid!' ],
      npc86x: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The robot appears to be asleep.)' ]
            : [ "<32>{#p/basic}* 它正處於休眠模式。" ],
      npc86z: () =>
         [
            [
               '<32>{#p/basic}{#npc/a}* Familiar energy signature detected in combat.',
               '<32>{#p/basic}* Recommended action... run.'
            ],
            [
               '<32>{#p/basic}{#npc/a}* Familiar energy signature detected in combat.',
               '<32>{#p/basic}* Recommended action... stand still.'
            ],
            [
               '<32>{#p/basic}{#npc/a}* Familiar energy signature detected in combat.',
               '<32>{#p/basic}* Recommended action... unknown.'
            ],
            [
               '<32>{#p/basic}{#npc/a}* Familiar energy signature detected in combat.',
               '<32>{#p/basic}* Recommended action... hide.'
            ]
         ][(SAVE.data.n.state_foundry_npc86_feelings || 3) - 1],
      npc86a: () => [
         '<32>{#p/basic}{#npc/a}* 檢測到陌生的能量訊號。',
         '<32>* 姓名... 未知。',
         '<32>* 關係狀態... 陌生人。',
         SAVE.data.n.plot < 42.1 ? '<32>* 上次互動... 暫無。' : '<32>* Last interaction... observed in battle.',
         '<32>* 處理中...\n* 處理中...\n* 處理中...',
         '<32>* 您好，陌生人。\n* 我叫8-6，是個\n  萬能送貨機器人。',
         '<32>* 這與我的預期功能相去甚遠，\n  但您現在願意完成\n  一份調查嗎？',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      npc86b: () => [
         '<32>{#p/basic}{#npc/a}* 謝謝您。\n* 問題如下。',
         '<32>* 「在紅色、綠色、藍色\n  三種顏色中，\n  你更喜歡哪一種？」',
         choicer.create('* （你要怎麼回答？）', '紅色', '綠色', '藍色', '不確定')
      ],
      npc86c: [
         '<32>{#p/basic}* 謝謝您。\n* 您的選擇將深深地\n  銘刻在我的記憶體中。',
         '<32>{#p/basic}{#npc/a}* 您的關係狀態現已被\n  設定為「熟人」。'
      ],
      npc86d: () => [
         '<32>{#p/basic}{#npc/a}* 檢測到熟悉的能量訊號。',
         '<32>* 姓名... 未知。',
         '<32>* 關係狀態... 熟人。',
         SAVE.data.n.state_foundry_npc86 === 1
            ? '<32>* 上次互動... 拒絕調查。'
            : '<32>* 上次互動... 接受調查。',
         '<32>* 處理中...\n* 處理中...\n* 處理中...',
         '<32>* 歡迎回來，熟人。\n* 您今天過得怎樣？',
         choicer.create('* （你要怎麼回答？）', "愉快", "糟糕", '一般', '不確定')
      ],
      npc86e: () => [
         ...[
            [ '<32>{#p/basic}{#npc/a}* 很好？\n* 很高興聽您這麼說。' ],
            [ '<32>{#p/basic}{#npc/a}* 不好？\n* 希望事情會好起來。' ],
            [ '<32>{#p/basic}{#npc/a}* 一般？\n* 可以理解。' ],
            [ '<32>{#p/basic}{#npc/a}* 不確定？\n* 這... 可以理解。' ]
         ][choicer.result],
         '<32>{#p/basic}{#npc/a}* 您的關係狀態現已被\n  設定為「朋友」。'
      ],
      npc86f: () => [
         '<32>{#p/basic}{#npc/a}* 檢測到熟悉的能量訊號。',
         '<32>* 姓名... 未知。',
         '<32>* 關係狀態... 朋友。',
         '<32>* 上次互動... 關於心情的詢問。',
         '<32>* 處理中...\n* 處理中...\n* 處理中...',
         [
            '<32>* 歡迎回來，朋友。\n* 我希望自從上一次互動後，\n  您的心情仍舊很好如初。',
            '<32>* 歡迎回來，朋友。\n* 我希望自從上一次互動後，\n  您的心情好轉了很多。',
            '<32>* 您好，朋友。\n* 基於上一次互動...',
            '<32>* 您好，朋友。\n* 基於上一次互動...'
         ][SAVE.data.n.state_foundry_npc86_mood - 1],
         '<32>* 看來您對我很感興趣。',
         '<32>* 您對我最常見的情感是什麼？',
         choicer.create('* （你要怎麼回答？）', '愛', '噁心', '暫無', '不確定')
      ],
      npc86g: () =>
         [
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的關係狀態現已被\n  設定為「摯友」。',
               '<32>* 我也愛您，摯友。'
            ],
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的關係狀態現已被\n  設定為「敵人」。',
               '<32>* 我已經不需要您了，敵人。'
            ],
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的關係狀態現已被\n  設定為「熟人」。',
               '<32>* 這個回答可能不太好，熟人。'
            ],
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的關係狀態保持不變。',
               ...(SAVE.data.n.state_foundry_npc86 === 5 && SAVE.data.n.state_foundry_npc86_feelings === 4
                  ? [ '<32>* 對所有問題的預期回答\n  現已被設定為「不確定」。' ]
                  : [])
            ]
         ][choicer.result],
      npc86h: () => [
         '<32>{#p/basic}{#npc/a}* 檢測到熟悉的能量訊號。',
         '<32>* 姓名... 未知。',
         [
            '<32>* 關係狀態... 摯友。',
            '<32>* 關係狀態... 敵人。',
            '<32>* 關係狀態... 熟人。',
            '<32>* 關係狀態... 朋友。'
         ][SAVE.data.n.state_foundry_npc86_feelings - 1],
         SAVE.data.b.f_state_done86
            ? [
                 '<32>* 上次互動... 表達讚美。',
                 '<32>* 上次互動... 拒絕對話。',
                 '<32>* 上次互動... 閒聊。',
                 '<32>* 上次互動... 給予建議。'
              ][SAVE.data.n.state_foundry_npc86_feelings - 1]
            : '<32>* 上次互動... 詢問感受。',
         '<32>* 處理中...\n* 處理中...\n* 處理中...',
         [
            [
               '<32>* 歡迎回來，摯友。\n* 我希望您一切都好。',
               '<32>* 歡迎回來，摯友。\n* 我很愛您。',
               '<32>* 歡迎回來，摯友。\n* 今天見到您很高興。'
            ],
            [
               '<32>* ...\n* 請不要再跟我說話了。',
               '<32>* ...\n* 請不要再跟我說話了。',
               '<32>* ...\n* 請不要再跟我說話了。'
            ],
            [
               '<32>* 歡迎回來，熟人。\n* 工廠今天有點霉味。',
               '<32>* 歡迎回來，熟人。\n* 今天星光閃爍。',
               '<32>* 歡迎回來，熟人。\n* 今天蒸汽很潮溼。'
            ],
            [
               '<32>* 歡迎回來，朋友。\n* 記得吃點東西。',
               '<32>* 歡迎回來，朋友。\n* 記得休息一下。',
               '<32>* 歡迎回來，朋友。\n* 記得把事情說出來。'
            ]
         ][SAVE.data.n.state_foundry_npc86_feelings - 1][rng.dialogue.int(3)]
      ],
      npcinter: {
         grandmuffdarkened: pager.create(
            0,
            () =>
               SAVE.data.n.state_foundry_muffet === 2
                  ? [
                       ...(world.population < 6 && world.bullied
                          ? [
                               "<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* No matter how many monsters you've bullied, your payment to me is all that matters~"
                            ]
                          : [
                               '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Your payment to me means more than you can possibly imagine~'
                            ]),
                       '<32>* Thank you for your generous donation, dearie~',
                       '<32>* If you or your little armless friend need anything, you just let me know~'
                    ]
                  : [
                       "<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* It's a shame I wasn't able to capture you the first time around~",
                       ...(world.population < 6 && world.bullied
                          ? [ '<32>* A little bully like you would have been a wonderful prize~' ]
                          : [ "<32>* Oh well~\n* Now that the force field's gone, I won't have to~" ])
                    ],
            [
               '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Oh, dearie~\n* When the spider clans arrive on the new homeworld...',
               "<32>* There'll be so many natural resouces to exploit~",
               "<32>* We're going to build the largest tea empire this new world has ever seen~"
            ],
            [
               '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Oh, and if I can help it...',
               "<32>* It'll be the only tea empire this new world will ever see~\n* Ahuhuhu~"
            ],
            [ '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* 啊呼呼呼~' ]
         ),
         f_dogenpc: pager.create(
            0,
            () =>
               SAVE.data.n.state_foundry_doge === 2
                  ? [
                       ...(world.population < 6 && world.bullied
                          ? [
                               '<32>{#p/basic}{#npc/a}* I know you have been violent, but I appreciate the compassion you have shown me.'
                            ]
                          : [ '<32>{#p/basic}{#npc/a}* Thank you for the compassion you have shown me.' ]),
                       '<32>* It is what I needed to see the error in my choice of career.',
                       "<33>* Still, I'm keeping the uniform.\n* It suits me well."
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* I regretted letting you get past me, but after what you've done, I'm fine with that.",
                       ...(world.population < 6 && world.bullied
                          ? [ '<32>* I shall overlook your rather... violent tendencies for the moment.' ]
                          : [ '<32>* I shall recall your name for many centuries to come.' ])
                    ],
            [
               '<32>{#p/basic}{#npc/a}* I do apologize for mis- judging you, Frisk.',
               '<32>* As a member of the ELITE squad, it was difficult for me to see the good in you.'
            ],
            [
               '<32>* Well.\n* There is much for me to reflect on, now.',
               '<32>* I would appreciate if you gave me the time and space to do so.',
               '<33>* Thank you for the conversation.'
            ],
            [ '<32>{#p/basic}{#npc/a}* Until next time.' ]
         ),
         f_clamgirl: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* How silly...\n* As soon as I choose to stay somewhere, we all have to go.',
                       '<32>* The irony of the situation has not escaped me.\n* Still, it is for the best.',
                       "<32>* On our new homeworld...\n* I'm sure to find lots of new neighbors for myself."
                    ]
                  : SAVE.data.n.plot === 47.2
                  ? [ "<32>{#p/basic}{#npc/a}* Er, she's still after you..." ]
                  : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                  ? [ '<32>{#p/basic}{#npc/a}* You should never have come.' ]
                  : SAVE.data.n.state_foundry_undyne === 1
                  ? [
                       '<32>{#p/basic}{#npc/a}* I sense a disturbance in the nearby aura...',
                       "<32>* You really shouldn't have left that girl alone."
                    ]
                  : SAVE.data.n.state_foundry_undyne === 2
                  ? [
                       '<32>{#p/basic}{#npc/a}* I sense a disturbance in the nearby aura...',
                       '<32>* You really should have left that girl alone.'
                    ]
                  : 2 <= SAVE.data.n.plot_date
                  ? [
                       '<32>{#p/basic}{#npc/a}* I sense a disturbance in the nearby aura...',
                       '<32>* You and my new neighbor are getting along, I see.'
                    ]
                  : SAVE.data.n.plot > 47.2 && SAVE.data.n.plot_date > 1
                  ? world.trueKills > 0
                     ? [ '<32>{#p/basic}{#npc/a}* 帕派瑞斯在附近等著呢。', "<32>* Isn't he brave?" ]
                     : [ '<32>{#p/basic}{#npc/a}* 帕派瑞斯在附近等著呢。', "<32>* 想見見我的新鄰居去嗎？" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* 話說，我是從首塔過來\n  鑄廠這裡遊覽的。",
                       "<32>* 我在那幾乎不認識任何人，\n  但在這，我已經遇到了\n  幾個友好的鄰居。",
                       "<32>* 我覺得我短期內\n  不會離開這裡。"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ "<32>{#p/basic}{#npc/a}* Won't that be splendid?" ]
                  : SAVE.data.n.plot === 47.2
                  ? [ "<32>{#p/basic}{#npc/a}* Er, she's still after you..." ]
                  : SAVE.data.n.state_foundry_undyne > 0
                  ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                  : 2 <= SAVE.data.n.plot_date
                  ? [ '<32>{#p/basic}{#npc/a}* Good neighbors have been quite difficult to find.' ]
                  : SAVE.data.n.plot > 47.2 && SAVE.data.n.plot_date > 1
                  ? world.trueKills > 0
                     ? [ '<32>{#p/basic}{#npc/a}* ...' ]
                     : [
                          "<32>{#p/basic}{#npc/a}* 沒事的。她不咬人的。\n* 不過她可能會朝你\n  扔幾支長矛。"
                       ]
                  : [ '<32>{#p/basic}{#npc/a}* 有鄰居就是好。' ]
         ),
         f_echo1: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/undyne}* Citizens of the Foundry...',
                    '<32>* ... you should all know what happened to you by now.',
                    "<32>* It's time to go, and you damn well know it.",
                    "<32>* So let's get going.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/undyne}* Listen up, everyone!\n* The force field's gone!\n* We can all go home!",
                    "<32>* If you're still down there dawdling by the time we leave...",
                    "<32>* Then... we'll probably just come back for you later.",
                    "<32>* But don't make us do that!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/undyne}* 鑄廠居民聽好！\n* 趁現在，快給我逃！",
                    world.genocide
                       ? "<32>* 有殺人狂到達鑄廠，還未落網！\n  你要是碰著了，就是死路一條！"
                       : "<32>* 有殺人狂到達鑄廠，還未落網！\n  你要是碰著了，就是死路一條！",
                    "<32>* 不聽勸，後果自負！！",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielEcho1++ < 1
                       ? [ '<25>{#p/asriel2}{#f/2}* 謝了，安黛因。\n* 要是還動不動碰上怪物，\n  我就真吃不消了。' ]
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* 我是鑄廠員工刷刷。\n* 麻煩你檢查一下管道有無洩漏。',
                    "<32>{#p/alphys}* 喔- 呃... 抱-抱歉哈！\n* 我現在稍微有點忙！",
                    '<32>{#p/basic}* 好吧。\n* 我去叫頑頑來幫忙。\n* 真是謝謝您了。',
                    "<32>{#p/alphys}* 不-不用謝？？",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo2: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* Hey... everything's gonna be okay, kiddo.",
                    '<32>* (Gerson?)\n* (Is that you again?)',
                    '<32>* Oh, I dunno.\n* Is that really you, Burgie?\n* Wa ha ha.',
                    "<32>* (Yeah, yeah.)\n* (I'm just a little scared... like everyone else.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* Well, you heard her!\n* Time for us to go, kiddo!',
                    "<32>{#p/basic}* ... wa ha ha.\n* In truth, we've still got the rest of the day.",
                    "<32>{#p/basic}* (Yeah, I'm gonna hang out here for a bit longer.)",
                    "<32>{#p/basic}* (Who knows?)\n* (Maybe Frisk'll come by.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* 嘿，小子。\n  聽到廣播裡的警告了嗎？',
                    '<32>* （小點聲！）\n* （...所以說，\n  有個人類什麼的過來了，是嗎？）',
                    '<32>* 毫無疑問，是的。',
                    "<32>* （難怪呢，\n  不過強制疏散真的很煩人。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#s/phone}* 鈴鈴，鈴鈴...',
                    '<32>{#p/basic}* 嘿，孩子！\n* 我就是想問問你的新店\n  怎麼樣了。',
                    "<32>* 我聽說開得挺不錯呢！",
                    "* （...）\n* （我現在有點不方便講話。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo3: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* I hear ya.\n* Hey, maybe it'd help if ya told me what ya saw.",
                    '<32>* From your point of view.',
                    '<32>* (Well...)\n* (It all started when...)',
                    '<32>* (I was at the force field with a bunch of others.)',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* That'd be a treat!\n* I know I'd sure as hell like to see 'em.",
                    "<32>{#p/basic}* It's kind of hard to imagine, isn't it?\n* Being saved by a human?",
                    "<32>{#p/basic}* (I know, right?)\n* (And those other humans... they're alive, too.)",
                    "<32>{#p/basic}* (What a crazy day it's been.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* 撤離？沒門！\n* 我敢保證，待在原地，也沒人來傷你。",
                    "<32>* （呃...）\n* （你明知道我正身處危險之中，\n  為什麼還這麼說？）",
                    "<32>* 或許處境確實不利，\n  但是，我碰巧知道有個東西...",
                    "<32>* 它能保護我們這些小商販免受危險。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* 嗯？\n* 發生什麼了？",
                    "<32>* （...你不知道嗎？）",
                    '<32>* 等一下...',
                    "<32>* （就是那種的威脅。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo4: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* (We were all there to see the force field be taken down.)',
                    "<32>* (We'd been told something like that could happen, but when we got there...)",
                    '<32>* (The same talking star who told us to go there was holding monsters hostage.)',
                    '<32>* Little star, huh?\n* I have heard stories of a little yellow star...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* (I wonder what we'll do when we arrive on the new homeworld.)",
                    "<32>{#p/basic}* (Maybe the two of us could open a shop together!)\n* (You'd sell the trinkets...)",
                    "<32>{#p/basic}* And you'd sell the food.\n* I like the way you think about it, kiddo!",
                    "<32>{#p/basic}* But it'd likely be better if one of us sells, and the other tracks the finances.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* （啥？）\n* （蠢到家了。）",
                    "<32>* 這可是真事！\n* 想聽的話，現在就給你\n  好好講講它的來龍去脈！",
                    "<32>* （呃，不-不必了！）\n* （我相信你，老-老人家！）",
                    "<32>* 哇哈哈！\n* 每天都能收穫新知，挺不錯的吧！",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* ...哇哈哈。\n* 是那個到處賣牛排的傢伙，\n  對吧？",
                    '<32>* （我該怎麼辦！）',
                    "<32>* 噓...\n* 沒事的，孩子。\n* 那家商店是有個後門的！",
                    '<32>* （真的有嗎！？！？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo5: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* (Well, he's real.)\n* (And we thought we'd helped the human beat him...)",
                    "<32>* (But he just ended up taking everyone's SOULs anyway.)",
                    "<32>* That must've been the bright light I saw...\n* I just couldn't shake it.",
                    "<32>* (Yeah, and it was even brighter at the source.)\n* (We didn't stand a chance.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* (Ha. We'll take turns, then.)",
                    "<32>{#p/basic}* (Doing the same thing all the time would get boring, don't you think?)",
                    "<32>{#p/basic}* Wa ha ha.\n* Maybe I'm just old, but I don't mind doing finances.",
                    '<32>{#p/basic}* You can have the fun job all to yourself, kiddo!',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* （看來，我們註定要在這裡\n  度過餘生了...）',
                    "<32>* 嘿，別小瞧皇家守衛！\n* 他們各個都是驍勇善戰的猛士！",
                    '<32>* （你有把握他們能阻止那人類嗎？）',
                    "<32>* 那個人類小孩嗎？\n* 我不確定，感覺難度挺大的。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielEcho4++ < 1
                       ? [ '<25>{#p/asriel2}{#f/5}* 嘻嘻嘻...' ]
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* （哇...）\n* （這扇門通往外面的陽臺！）',
                    '<32>{#p/basic}* （我真的感覺星星\n  從來沒有這麼明亮過...）',
                    '<32>* 哈。\n* 肯定是有個扭曲力場\n  什麼的。',
                    '<32>* 稍微等一下，\n  就盡情享受吧！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo6: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* So what happened next?',
                    '<32>* (Well, you should know.)\n* (This is the part that everyone knows.)',
                    '<32>* (From our perspective, we saw a human fending off attacks...)',
                    '<32>* (Whatever that star turned himself into was relentlessly attacking the human.)',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* I do feel like a part of me's going to miss this old place.",
                    '<32>{#p/basic}* We really made it our own.',
                    "<32>{#p/basic}* (You're kidding, right?)\n* (I won't miss this old dump for a second.)",
                    "<32>{#p/basic}* (But I guess I've also had it pretty bad up here.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* 孩子，說個壞訊息。\n* 那人類剛經過這裡。',
                    ...(world.genocide
                       ? [
                            "<32>{#p/basic}* ...還帶了個同夥。",
                            '<32>{#p/basic}* （啥？）\n* （是誰？）',
                            "<32>{#p/basic}* 哇哈哈...\n* 我說了你也不信。"
                         ]
                       : [
                            '<32>{#p/basic}* （那人還在鑄廠嗎？）',
                            "<32>{#p/basic}* 當然，但那人想碰到你\n  還要走好一會呢。\n* 更不用說安黛因了...",
                            "<32>{#p/basic}* （是啊，她一定會阻止人類的。）\n* （畢竟，她可皇家衛隊的隊長啊...）"
                         ]),
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#s/phone}* 鈴鈴，鈴鈴...',
                    "<32>{#p/basic}* 對不起，\n  這裡訊號不太好。",
                    '<32>* 這段時間，\n  看到什麼有趣的東西了嗎？',
                    '<32>* （...這個嘛...）',
                    '<32>* （流星算嗎？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo7: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* (Eventually, though, the human mustered some kind of power...)',
                    '<32>* (And then...)',
                    '<32>* (... IT... happened.)',
                    '<32>* Yeah... that.\n* The moment where it all turned upside-down, huh?',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* Hey, it's alright.",
                    "<32>{#p/basic}* On a new homeworld... you'll be able to go wherever you want.",
                    '<32>{#p/basic}* (Really? I thought I was going to settle down with you.)',
                    '<32>{#p/basic}* Oh, did you now?\n* Wa ha ha.',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    ...(world.genocide
                       ? [
                            "<32>{#p/basic}* （你說，那孩子起死回生了？）",
                            '<32>{#p/basic}* （哇。）\n* （老瘋子，今天你不是\n  一般地瘋啊！）',
                            '<32>{#p/basic}* ...我是會拿這事\n  開玩笑的人嗎？',
                            '<32>{#p/basic}* （呃... 你不是那種人。）\n* （哼。）'
                         ]
                       : [
                            '<32>{#p/basic}* （孩子們都在疏散，\n  我們做點什麼呢？）',
                            "<32>{#p/basic}* 噢，要不...\n  老一套，隨便糊弄糊弄他們吧。",
                            '<32>{#p/basic}* （真不愧是你啊，怪老頭。）',
                            '<32>{#p/basic}* 哇哈哈，你最懂我了！'
                         ]),
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* 喔！\n* 快許個願，孩子！',
                    "<32>* （...）\n* （永遠不會實現的。）",
                    '<32>* ...自由，是嗎？\n* 哇哈哈... 那我可有個\n  好訊息要告訴你了。',
                    '<32>* 前不久，我剛看到\n  一個人類從這裡經過。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo8: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* I remember that bit.\n* The power changed hands... the human was in control.',
                    '<32>* (Yeah, and then they started attacking us!)\n* (I thought we were all...)',
                    '<32>* Going to die?',
                    "<32>* (Yeah, and it's like I could feel their fear.)\n* (Everyone was so afraid.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* (Who else am I gonna go to?)\n* (The girls?)',
                    '<32>{#p/basic}* Hmm...\n* I see your point.',
                    "<32>{#p/basic}* (You're the only one I feel like I can rely on, old buddy.)",
                    "<32>{#p/basic}* (Using this shop to make fun of Mettaton was a blast, but it's time for a change.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* （嘿... 等風波過去了...）',
                    '<32>* （要不... 咱出去吃一頓？）',
                    "<32>* 嗯？\n* 當然嘍！\n* 主意不錯，孩子！",
                    "<32>* 這樣我們就有盼頭了。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* （看來，傳說是真的...）\n* （自由真的觸手可及了。）",
                    '<32>* 或許吧。',
                    "<32>* （就看國王怎麼做了，是吧？）",
                    '<32>* ...到時候再說。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echo9: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* Yeah... I remember.',
                    "<32>* (Look, whatever happens...)\n* (I'm just glad you're safe, ya fat old mole-rat.)",
                    "<32>* Wa ha ha... that's my boy.",
                    '<32>* (... when we get to the new homeworld, would you... like to go out for dinner?)',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* That robot... I don't know if he'll be able to stay popular on the new homeworld.",
                    '<32>{#p/basic}* But hey, if he gets poor, we can always remind him how much better off we are.',
                    "<32>{#p/basic}* (Jeez, you're even more ruthless than I am when it comes to him!)",
                    "<32>{#p/basic}* (... if he comes to our shop, we'll charge him double.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* （謝謝你，老人家...）\n* （和你嘮嗑的時候，\n  那些煩惱啊，都忘了。）",
                    '<32>* 哇哈哈...\n* 能幫上忙，我可太高興了。',
                    '<32>* 嘿，就算我們挺不過\n  這場風波...',
                    '<32>* ...咱還得該吃吃，該喝喝。',
                    "<32>* （是啊...）\n* （太好了。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* （「到時候再說」...？）\n* （不殺了那人，\n  難道還能放他走？）",
                    '<32>* 我心裡應該有答案了。\n* 先不告訴你。',
                    "<32>* （等一下...）\n* （難不成，國王還有事\n  瞞著我們！？）",
                    '<32>* 哇哈哈...\n* 晚點再跟你說，孩子。',
                    '<32>* （...啊！？！？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss1: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* I don't know where I am...",
                    '<32>* I was just doing my laundry, but then there was this bright light...',
                    "<32>* Now it's like... I'm in some kind of limbo...",
                    '<32>* Please... help me...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/13}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* 有東西正在靠-靠-靠近我...\n  嚇-嚇-嚇死我了！",
                    '<32>{#p/undyne}* 遁狗？\n* 是你嗎？',
                    "<32>{#p/basic}* 是... 那玩意要過來了...\n* 啊！",
                    '<32>{#p/basic}* （咳咳）\n* 好像有啥動了下？\n* 是我的錯覺嗎？',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/radio}{#v/1}* 大-家-好哇！\n* 歡迎收聽《午夜狂奔》！',
                    '<32>{#p/alphys}* （我嘞個-）\n* （這是什麼啊！？）',
                    '<32>{#p/radio}{#v/1}* 今天是2000年9月15日，\n  還算幸運，沒有發生什麼大事。',
                    "<32>{#p/alphys}* （某種通訊系統...\n  肯定已經休眠了幾百年了！）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss2: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* Gosh, where could I be...',
                    '<32>* We were out hunting for trash, but then this bright white light came in.',
                    "<32>* Catty thinks we're in some sort of shared dream...",
                    "<32>* But, like, wouldn't we be able to wake ourselves up?",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/15}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<23>{#p/papyrusnt}安黛因，在嗎？\n我兄弟他...\n他...",
                    '<33>{#p/undyne}* 他怎麼了，帕派瑞斯？',
                    '<23>{#p/papyrusnt}...',
                    '<32>{#p/undyne}* 帕派瑞斯？',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/sans}{#f/7}* 嘿，無意打擾你，\n  但你很應該疏散星港的居民。',
                    "<32>{#p/undyne}* 嗯？\n* 這是咋回事？",
                    '<32>{#p/sans}{#f/7}* ...',
                    '<32>{#p/undyne}* 你...\n  別一句話不說啊...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/radio}{#v/0}* 你說沒發生什麼大事！？\n* 你簡直是瘋了。",
                    '<32>{#p/alphys}* （嗯...）',
                    '<32>{#p/radio}{#v/0}* 來自鄰近星球的外星人\n  今天就要到達了！',
                    "<32>{#p/alphys}* （我還是讓它播下去吧。\n  誒嘿嘿。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd2
                       ? ((SAVE.data.b.f_state_dc_kidd2 = true),
                         [
                            '<25>{#p/kidd}{#f/7}* 臨近星球？\n* 不會是說...',
                            '<25>{#f/2}* ...不-不可能。'
                         ])
                       : [])
                 ],
         f_echoAbyss3: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/toriel}{#f/21}* My child... are you there?',
                    '<32>* That Twinkly...',
                    "<32>* I should have known he'd cause some sort of trouble, but...",
                    "<32>* Once again... I've failed to see the reality that lay right in front of me...",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/16}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    ...(SAVE.data.b.s_state_chilldrake
                       ? [
                            "<32>{#p/basic}* 救命啊！\n* 我朋友星鐵龍失蹤了...",
                            '<32>{#p/basic}* 他出門去找新笑話靈感，\n  結果到現在也沒回家！',
                            "<32>{#p/undyne}* 小子，別亂跑。\n* 我馬上派搜救隊去找你朋友。"
                         ]
                       : [
                            "<32>{#p/basic}* 救命啊！\n* 我朋友星鐵龍現在很危險！",
                            '<32>{#p/basic}* 他說自己看見個人類\n  四處遊蕩，屠殺怪物！',
                            '<32>{#p/undyne}* 小子，別亂跑。\n* 皇家衛隊會將那人類\n  繩之以法的。'
                         ]),
                    '<32>{#p/basic}* 謝謝您... 安黛因...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd3
                       ? ((SAVE.data.b.f_state_dc_kidd3 = true),
                         [ '<25>{#p/kidd}{#f/3}* 呃...\n  聽起來怪嚇人的，哈哈...', '<25>{#f/4}* ...' ])
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/radio}{#v/1}* 好了，不要慌！\n* 我們不會讓他們欺負我們的，\n  對吧？",
                    '<32>{#v/0}* 你說得還挺一本正經的。',
                    '<32>{#v/1}* 如果我真的是認真說的呢？',
                    '<32>{#v/0}* 我覺得，這些外星人\n  有可能是很好的盟友。\n* 他們看起來人不錯的。',
                    '<32>{#v/0}* 他們甚至帶來了翻譯領域的東西，\n  這樣我們就能理解他們了！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss4: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<23>{#p/papyrusnt}HUH? WHAT'S WRONG WITH THINKING EVERYTHING'S JUST FINE?",
                    '<33>{#p/without}* well, the way i see it...',
                    "<32>{#p/without}* you're just a-{@fill=#ff0}void{@fill=#fff}-ing the problem.",
                    "<23>{#p/papyrusnt}UGH... MAYBE YOU'RE RIGHT. THINGS DO SEEM PRETTY... {@fill=#ff0}DARK{@fill=#fff}.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/23}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/undyne}* 沒聽懂嗎？\n  那可不是什麼好對付的小混混...\n  趁現在快逃！不然下個遭殃的就是你！",
                    "<32>{#p/basic}* 那傢伙是誰我不在乎。\n* 我只在乎能不能履行職責，\n  保護好前哨站！",
                    "<32>{#p/basic}* 你不是很想揍人類一頓嗎？\n  那你現在就過來啊！",
                    '<32>{#p/undyne}* 狗來米！！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd4
                       ? ((SAVE.data.b.f_state_dc_kidd4 = true),
                         [
                            "<25>{#p/kidd}{#f/1}* 老兄，皇家衛隊真勇猛啊！",
                            "<25>{#f/3}* 有他們保護我們...\n  真是太好了！"
                         ])
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/radio}{#v/1}* 是啊，是啊...\n* 如果要在這裡跟外星人\n  卿卿我我的話...",
                    '<32>{#v/1}* 我們就不能光是走上去\n  說句「哈囉」就完事了。',
                    "<32>{#v/0}* ...這不是艾羅戈喜歡的\n  打招呼方式嗎？",
                    "<32>{#v/0}* 那傢伙肯定喜歡看西部電影，\n  毫無疑問。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd4
                       ? ((SAVE.data.b.f_state_dc_kidd4 = true),
                         [ '<25>{#p/kidd}{#f/1}* 艾羅戈？', '<25>{#f/1}* 艾羅戈國王！？', '<25>{#f/3}* 天...' ])
                       : [])
                 ],
         f_echoAbyss5: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/kidding}* Yo... what is this place?',
                    "<32>* It's really dark, and I can't see anything in here...",
                    "<32>* I'm scared...",
                    '<32>* Is anyone there?\n* Please... someone help me...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/22}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/alphys}* 新身體用著怎麼樣？",
                    '<32>{#p/mettaton}* 真的很不錯。\n* 我再看看有沒有故障零件。',
                    "<32>{#p/alphys}* 那-那就好。\n* 我研究研究\n  怎麼優化能量分配。",
                    "<32>{#p/mettaton}* 博士，別擔心。\n* 我們還有的是時間。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/alphys}* 難道我...\n  我就只能袖手旁觀嗎？',
                    "<32>{#p/mettaton}* 唉... 還有別的可做嗎？\n* 戰鬥？你可不擅長。",
                    "<32>{#p/mettaton}* 你要是現在衝上去，\n  很可能會喪命。\n  怪物們也會失去一員大將。",
                    '<32>{#p/alphys}* 為什麼...\n  為什麼我總遇到這種事...',
                    "<32>{#p/mettaton}* ...平心而論，\n  你還是第一次看到怪物死吧。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<33>{#p/radio}{#v/0}* 你別跟別人說，\n  我覺得他們有些人還挺可愛的。',
                    '<32>{#v/1}* 呃... 你什麼意思？',
                    "<32>{#v/0}* 什麼？\n* 我不是那種意思。\n* 我就是單純覺得可愛。",
                    '<32>{#v/0}* 就像寵物的那種。',
                    "<32>{#v/1}* ...\n* 有一個聽眾給我們電臺\n  打電話過來了。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss6: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/alphys}* How strange...',
                    '<32>* So our SOULs have been absorbed into another being.',
                    '<32>* This could be a kind of \"separate plane\" where we\'re held before...',
                    '<32>* ... wait.\n* There m-might be a way I could contact the others!',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/10}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    world.genocide
                       ? "<32>{#p/basic}* 那人類跟艾斯利爾快到這裡了，\n* 只要發現他們，定將其一舉殲滅！"
                       : "<32>{#p/basic}* 那人類快到這裡了，\n* 只要我發現了，定將其一舉殲滅！",
                    "<32>{#p/undyne}* 督吉，你肯定知道\n  即將面對的是什麼敵人。",
                    dogex()
                       ? '<32>{#p/basic}* 那個人類要對在星港的死難負責。\n* 我絕不會心慈手軟！'
                       : world.dead_canine
                       ? "<32>{#p/basic}* 朋友的生命親手葬送在敵人手裡。\n* 我絕不會心慈手軟！"
                       : '<32>{#p/basic}* This is the moment I have long prepared myself for.\n* I will not falter!',
                    "<32>{#p/undyne}* 好！！去讓那個人類見識一下\n  特戰隊的實力吧！！",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/radio}{#v/0}* 您好啊，親愛的聽眾，\n  歡迎致電《午夜狂奔》。\n* 您有帶來什麼訊息嗎？',
                    "<32>{#p/human}* 是的，我有幾句話要說。\n* 實際上，我們人類還沒有\n  準備好這種事情呢。",
                    "<32>{#p/radio}{#v/0}* 所以你什麼意思？\n* 我們太笨了理解不了\n  外星人的概念嗎？",
                    "<32>{#p/human}* ...你太天真了。\n* 我真正擔心的不是我們，\n  而是... 外星人他們。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss7: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* Where am I?\n* What is this... place?',
                    "<32>{#p/alphys}* Hello?\n* I'm Dr. Alphys, and I'm... t-trying something!",
                    "<32>{#p/basic}* Dr. Alphys!\n* I'm here, can you hear me?",
                    "<32>{#p/alphys}* Yes... yes!\n* I just have to think about them... and I'm there!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/21}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* 我是鑄廠員工刷刷。\n* 就人類一事，我深感擔憂。',
                    '<32>{#p/alphys}* 呃...\n* 安黛因應該幫得上忙...\n  她遠比我能幹...',
                    '<32>{#p/basic}* 贊成。\n* 您的確啥忙也幫不上。',
                    '<32>{#p/alphys}* 沒-沒禮貌...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/radio}{#v/1}* 唉，得了吧。\n* 我們對他們來說算不上威脅。\n* 他們掌握著全部的主動權呢！",
                    "<32>{#p/human}* 話是這麼說，\n  但你看到他們的行為方式了嗎？\n* 他們真的很好...",
                    "<32>* 我知道你們倆不會傷害他們，\n  但總有人類會利用這一點的。",
                    '<32>{#p/radio}{#v/1}* 是啊... 唉...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss8: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* My name is Thomas Roman.\n* Royal scientist, and trusted associate of the crown.',
                    "<32>{#p/alphys}* Professor Roman?\n* But you're...",
                    '<32>{#p/basic}* My name is Thomas Roman.\n* Royal scientist, and trusted associate of the crown.',
                    "<32>{#p/alphys}* He's repeating...\n* It must just be the professor in everyone's memory.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/3}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<23>{#p/papyrusnt}我是帕派瑞斯。\n聽到提示音後儘管留言！',
                    '<33>{#p/undyne}* 該死...',
                    '<33>{#p/undyne}* 帕派瑞斯，我真不該讓你遭這種罪。',
                    '<33>{#p/undyne}* 你們兄弟倆命不該如此。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/undyne}* ...就連督吉也沒能拿下那個人類。',
                    "<32>{#p/sans}{#f/7}* 老實說，這不是個好訊息。\n* 鑄廠的居民疏散了嗎?",
                    "<33>{#p/undyne}* 在這個關頭，\n  所有人都知道發生了什麼。\n* 他們會撤離的。",
                    "<32>{#p/sans}{#f/7}* i feel like it's better to be safe than sorry.\n* but what do i know.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/radio}{#v/0}* 嘿，振作起來。\n* 別讓那個傢伙把你弄得這麼失落，\n  好嗎？",
                    "<32>{#v/1}* 但他說得有道理...\n* 對大多數人來說，\n  這個情況都讓人不知所措。",
                    "<32>* 並不是每個人的想法都像你...\n  還有你當做寵物般的那種痴迷...\n  那樣的純潔。",
                    '<32>{#v/0}* 先等一下！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_echoAbyss9: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/alphys}* Yeah, just think of who you'd like to see, and you'll be with them.",
                    '<32>{#p/asgore}* Asriel... are you there?',
                    "<32>{#p/alphys}* Huh, it's not working...\n* Maybe there's not enough of him left in us?",
                    '<32>{#p/asgore}* Please... come back...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/25}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/undyne}* 可以請你幫我個忙嗎？',
                    '<32>{#p/basic}* Ahuhuhu~\n* Anything for the one who now occupies the old nest~',
                    world.genocide
                       ? "<33>{#p/undyne}* Track down the human and their accomplice. Take them to me.\n* Biggest payout you've ever had."
                       : "<33>{#p/undyne}* 找到那個人類並帶給我。\n* 你會得到你有生以來最大的一筆錢。",
                    "<32>{#p/basic}* 嗯...\n* 我會試試看的~",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd9
                       ? ((SAVE.data.b.f_state_dc_kidd9 = true), [ '<25>{#p/kidd}{#f/4}* 該不會是那蜘蛛吧...' ])
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/radio}{#v/1}* 好了，好了。\n* 承認自己喜歡什麼並不丟人。",
                    "<32>{#v/0}* 我不是那個意思！",
                    "<32>{#v/1}* 說到愛，讓我們來聽聽\n  俱樂部裡流行的那種\n  爵士樂吧...",
                    '<32>{#v/1}* 《和外星人結婚》！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd9
                       ? ((SAVE.data.b.f_state_dc_kidd9 = true),
                         [ '<25>{#p/kidd}{#f/2}* 噗，只有人類能想出來\n  這種標題吧。' ])
                       : [])
                 ],
         f_echoAbyss10: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/undyne}* I can't keep holding on...",
                    '<32>{#p/undyne}* The others... have already slipped away...',
                    "<32>{#p/undyne}* It's like they don't know who they are anymore...",
                    "<32>{#p/undyne}* No... no!\n* Not like this...\n* I can't forget who I am!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/21}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/mettaton}* 博士啊...',
                    "<32>{#p/mettaton}* 我該料到你會就這麼逃跑的...",
                    '<32>{#p/mettaton}* ...\n* 該死...',
                    "<32>{#p/mettaton}* 你不明白嗎？",
                    "<32>{#p/mettaton}* 沒有你，我沒法完善\n  那些防禦部件啊...",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/mettaton}* 唉，他們馬上就到了。\n* 不知道你會怎麼應對這種場面，\n  不過...",
                    '<32>{#p/mettaton}* 不管你在這堅守陣地，\n  還是打了退堂鼓...',
                    "<33>{#p/mettaton}* 我都會全力支援你。",
                    '<32>{#p/alphys}* ...呃呵呵...',
                    '<33>* 你也一樣，鎂塔頓。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/alphys}* 等下等下！\n* 這首放在我和安黛因的約會\n  應該很完美...',
                    '<32>{#p/mettaton}* 喔真的嗎？',
                    "<32>{#p/alphys}* 鎂塔頓！？\n* 你是從哪...\n* ...我沒說要跟誰約會！",
                    "<32>{#p/mettaton}* 喔，你別擔心。\n* 我會保守你的秘密的。\n* ...大概吧。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd10
                       ? ((SAVE.data.b.f_state_dc_kidd10 = true),
                         [
                            '<25>{#p/kidd}{#f/1}* 艾菲斯想跟安黛因\n  結婚！？',
                            '<25>{#f/6}* 真是每天都能學到\n  新東西啊...'
                         ])
                       : [])
                 ],
         f_echodude: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* With a new world comes new kinds of stars.',
                       '<32>* These signal stars may be the least of our worries...'
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 這是一臺訊星。\n* 它會重複它剛剛接收到的訊息，\n  一遍又一遍...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Hopefully the stars out there are more honest.' ]
                  : [ '<32>{#p/basic}{#npc/a}* 絕對不要相信一顆星星。', '<32>* 它們最典型的特質就是欺詐。' ]
         ),
         f_echoLobby: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* Raddy of the foundry crew.\n* We've no time to keep running the show here.",
                    "<32>* Don't worry about pipes, unless you're slidin' through em to escape!",
                    '<32>* Got it, Skrubby?\n* Large lata?\n* My teeny tini?',
                    "<32>* We've gotta go, right away.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    "<32>{#p/basic}* Raddy of the foundry crew.\n* Everyone, you've done a real great job so far.",
                    "<32>* Now that we're free, we can all give it a rest!",
                    '<32>* Ya hear that, Skrubby?\n* Large lata?\n* My teeny tini?',
                    "<32>* It's time for a totally tubular celebration!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 訊號開始...',
                    '<32>{#p/basic}* 我是鑄廠員工刷刷。\n* 向您報告我和頑頑的檢修成果。',
                    geno()
                       ? "<32>{#p/alphys}* 那真是... 太-太好了...\n* 因為，我-我現在沒空修復它，\n  所以只能..."
                       : '<32>{#p/alphys}* 呃... 很-很高興\n  你們修好了它！',
                    '<32>{#p/basic}* 沒事。\n* 您啥忙都沒幫上，\n  但我還是謝謝您嘞。',
                    '<32>{#p/alphys}* ...不客氣。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 訊號終止。'
                 ],
         f_kidd: pager.create(
            0,
            () =>
               world.genocide
                  ? [
                       '<25>{#p/kidd}{#npc/a}{#f/3}* 呃... 嘿...',
                       '<25>{#p/asriel2}{#f/15}{#npc}* 怪胎。',
                       '<25>{#p/kidd}{#npc/a}{#f/1}* 嗯... 你好！\n* 哈哈哈！'
                    ]
                  : SAVE.data.n.plot === 33
                  ? [
                       '<25>{#p/kidd}{#npc/a}{#f/1}* How was lunch?',
                       '<25>{#f/1}* Did that short skeleton make everyone laugh again?'
                    ]
                  : [
                       '<25>{#p/kidd}{#npc/a}{#f/2}* 喲，你也是來這看她的嗎？',
                       "<25>{#f/1}* 哈哈。\n* 她最酷了！！",
                       '<25>{#f/2}* 我長大了要成為她那樣...'
                    ],
            () =>
               world.genocide
                  ? [ '<25>{#p/kidd}{#npc/a}{#f/4}* ...' ]
                  : SAVE.data.n.plot === 33
                  ? [ '<25>{#p/kidd}{#npc/a}{#f/3}* He always gets kicked out for pulling awful pranks.' ]
                  : [ '<25>{#p/kidd}{#npc/a}{#f/1}* 你先走吧。', "<25>{#f/1}* 我隨後就來！" ]
         ),
         f_longsy: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#npc/a}* My friend Shortsy and I plan to become the new world's premiere architects.",
                       "<32>* We'll build bridges, spires, space stations... if you can imagine it, we can build it!",
                       "<32>* As always, I'll be in charge of carrying the tools."
                    ]
                  : SAVE.data.n.plot < 48
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我和我的朋友Shortsy\n  打算建一座橋。',
                       "<32>* 他倒是有自己的想法。\n* 但就我而言，我只是不想再用\n  那個不穩定的木筏了。",
                       "<32>* 希望我們能做得\n  比之前更好吧。"
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* How'd you like our bridge?\n* Was it stable?\n* Was it gravitationally secure?",
                       "<32>* Well, Shortsy said it's fine, and they're kinda the expert here.",
                       "<32>* I'm mostly just here to carry around the tools!"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Shortsy told me about a new kind of tool recently...' ]
                  : SAVE.data.n.plot < 48
                  ? [ "<32>{#p/basic}{#npc/a}* 情緒不穩定，\n  和其他人合不來。\n* 這就是我。" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* Don't get it twisted.\n* I'm a fantastic tool-toter.\n* That's just what I do."
                    ]
         ),
         f_shortsy: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我和我的夥伴Longsy\n  想成為全職建築師。',
                       "<32>* I've invented a brand new tool for Longsy to use...",
                       "<32>* ... called the builder's wand."
                    ]
                  : SAVE.data.n.plot < 48
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我和我的夥伴Longsy\n  想造座橋給國王看看。',
                       "<32>* 這會是你見過的最筆直、\n  最堅固的橋。",
                       "<32>* 我向你保證！"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* Take a look at our newest bridge.',
                       '<32>* Longsy and I figure this will be enough to impress the king...',
                       "<32>* It needs to be if we're going to work alongside him!"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* With enough power, it could create anything you can imagine...' ]
                  : SAVE.data.n.plot < 48
                  ? [ "<32>{#p/basic}{#npc/a}* 不遺餘力，\n  將事情做到最好。\n* 這就是我。" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* No need to thank us, it's only a community service.\n* That's just what I do."
                    ]
         ),
         f_snail1: () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}{#npc/a}* (Snail snail...)\n* Everyone's leaving, it seems." ]
               : [ '<32>{#p/basic}{#npc/a}* （蝸牛蝸牛...）\n* 每一天都要樂觀...' ],
         f_snail2: () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}{#npc/a}* (Snail snail...)\n* It's time for us to go." ]
               : [ "<32>{#p/basic}{#npc/a}* （蝸牛蝸牛...）\n* 結局好，一切都好..." ],
         f_starkiller: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* The smell of grass grows ever closer now...',
                       '<33>* Soon, I will see it for myself.'
                    ]
                  : SAVE.data.n.state_foundry_undyne !== 0
                  ? [ '<32>{#p/basic}{#npc/a}* I feel the grass has faded.', "<32>* Don't you...?" ]
                  : roomKills().f_telescope > 0
                  ? [ '<32>{#p/basic}{#npc/a}* The grass may already be too far gone.', '<32>* Or am I wrong...?' ]
                  : [
                       "<32>{#p/basic}{#npc/a}* 草是什麼？",
                       ...(world.genocide
                          ? [ '<32>* 它能找到你嗎？', '<32>* 它能吃掉你嗎？', '<32>* 它能殺掉你嗎？' ]
                          : [ '<32>* 你能找到它嗎？', '<32>* 你能吃掉它嗎？', '<32>* 你能殺掉它嗎？' ]),
                       '<32>* ...',
                       '<32>* 你是草做的嗎？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* The grass may not always be greener, but who says it has to be?',
                       '<32>* A new world may have any number of colors in its grass.'
                    ]
                  : [ "<32>{#p/basic}{#npc/a}* 這草望著那草綠。" ]
         ),
         f_temmie1: () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#npc/a}* woa... tem hear news...\n* VERY GOODS!!!' ]
               : [ '<32>{#p/tem}{#npc/a}* 吼！！\n* 我素提米！！！', '<32>* 介素我盆友...\n* 提米！！！' ],
         f_temmie2: () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#npc/a}* yaYA!!!\n* tems can go free!!' ]
               : [ '<32>{#p/tem}{#npc/a}* 吼！！\n* 我素提米！！！', '<32>* 介素我盆友...\n* 提米！！！' ],
         f_temmie3: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/tem}{#npc/a}* woa...\n* if tems can go to new homeworld, can make,',
                    '<32>{#p/tem}{#npc/a}* LOT OF TEMS HISTORY!!!'
                 ]
               : [ '<32>{#p/tem}{#npc/a}* 吼！！\n* 我素提米！！！', '<32>* 別忘辣我盆友！' ],
         f_temmie4: () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#npc/a}* A pleasing development, no?' ]
               : world.genocide || 10 <= world.trueKills
               ? [
                    [ '<32>{*}{#p/tem}{#i/10}{#s.stop}* 我知道你做了什麼。', '{*}{#s.resume}{%}' ],
                    [ '<32>{#p/tem}{#npc/a}* 嘿。', "<32>* 我是鮑勃。" ]
                 ][Math.min(SAVE.flag.n._bob++, 1)]
               : SAVE.data.n.plot === 47.2
               ? [ '<32>{#p/tem}{#npc/a}* 嘿。', "<32>* I'm afraid for your life." ]
               : [ '<32>{#p/tem}{#npc/a}* 嘿。', "<32>* 我是鮑勃。" ],
         f_temmie5: () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#npc/a}* 啊哇喔哇喔哇喔！！', '<32>* 銀類...\n* 炒雞...', '<32>* HEROES!!!!' ]
               : [ '<32>{#p/tem}{#npc/a}* 啊哇喔哇喔哇喔！！', '<32>* 銀類...\n* 炒雞...', '<32>* 萌呆呆！！！！' ],
         f_temmie6: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/tem}{#npc/a}* everyones go free...\n* BUT TEM!!!',
                    '<32>* TEM NOT LEAV!!!\n* TEM WATCH EG!!!',
                    '<32>* tem will be happily fambily,'
                 ]
               : [
                    '<32>{#p/tem}{#npc/a}* 提咪...\n* 看蛋！！！',
                    '<32>* 蛋... 會孵！！！',
                    '<32>* 提咪... 驕嗷父母！！'
                 ]
      },
      punchcard0: () =>
         SAVE.data.b.svr ? [ '<32>{#p/human}* (But the box was empty.)' ] : [ '<32>{#p/basic}* 箱子是空的。' ],
      punchcard1: [ '<32>{#p/basic}* 箱子裡有一張明信片。' ],
      punchcard2: [ '<32>{#p/basic}* 箱子裡有好幾張明信片。' ],
      punchcard3: () => [ choicer.create('* （拿一張明信片嗎？）', '是', '否') ],
      punchcard4: [ '<32>{#p/human}* （你獲得了一張明信片。）' ],
      punchcardX: () => [
         "<32>{#p/human}* (You can't make out what's in the box...)",
         choicer.create('* (Take something out?)', '是', '否')
      ],
      puzzle1switch: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to use the switch anymore.)" ]
            : world.darker
            ? [ "<32>{#p/basic}* 果然，又卡住了。" ]
            : [ '<32>{#p/basic}* 沒想到，開關居然卡住了。', '<32>* 真是驚喜連連！' ],
      puzzle2switch: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to use the switch anymore.)" ]
            : world.darker
            ? [ "<32>{#p/basic}* 果然，又卡住了。" ]
            : [ '<32>{#p/basic}* 好吧。\n* 開關還是卡住了。' ],
      puzzle3switch: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to use the switch anymore.)" ]
            : world.darker
            ? [ "<32>{#p/basic}* 果然，又卡住了。" ]
            : [
                 '<32>{#p/basic}* 這個開關沒卡住...',
                 "<32>* ...只是壞了！\n* 信不信由你喔。"
              ],
      quiche1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The note attached to this cheesecake describes how it was abandoned.)',
                 choicer.create('* （拿走芝士蛋糕嗎？）', '是', '否')
              ]
            : [
                 "<32>{#p/basic}* 這放著一塊芝士蛋糕，\n  上面粘著一張字條。",
                 '<32>* 「我真的承擔不了\n   照顧它的重任。」',
                 choicer.create('* （拿走芝士蛋糕嗎？）', '是', '否')
              ],
      quiche2: [ "<32>{#p/human}* （你帶的東西太多了。）" ],
      quiche3: [ '<32>{#p/human}* （你拿走了芝士蛋糕。）' ],
      quiche4: () =>
         SAVE.data.b.svr
            ? [
                 [
                    '<25>{#p/asriel1}{#f/24}* Before we moved out, $(name) used to sit here all the time...',
                    "<25>{#f/23}* We'd swap stories about our hopes and our dreams...",
                    '<25>{#f/22}* And bring the telescope out and watch for stars sometimes.',
                    '<25>{#f/13}* Even as a star...\n* I wished I could return to those moments...'
                 ],
                 [
                    '<25>{#p/asriel1}{#f/23}* Look at me, getting all sentimental over a random bench.',
                    "<25>{#f/17}* But hey.\n* At least it's sturdy.",
                    "<25>{#f/3}* Heck, even Asgore's tremendous figure couldn't break it.",
                    '<25>{#f/4}* Back when we all lived here, I mean.'
                 ],
                 [
                    "<25>{#p/asriel1}{#f/13}* It's kind of funny to think about...",
                    '<25>{#f/13}* The house we used to live in is now lived in by Undyne.',
                    '<25>{#f/17}* Or was, until the force field was destroyed.',
                    "<25>{#f/13}* And... it's not your usual kind of house.\n* It's a monster."
                 ],
                 [ '<25>{#p/asriel1}{#f/15}* ... all the other monster homes were lost in the war.' ]
              ][Math.min(asrielinter.quiche4++, 3)]
            : world.darker
            ? [ "<32>{#p/basic}* 一條長椅。" ]
            : SAVE.data.n.plot === 72
            ? [ '<32>{#p/basic}* Coming back to give a lonely bench some company...\n* The gesture is appreciated.' ]
            : [ '<32>{#p/basic}* 只是工廠中央的一張\n  孤獨的長椅。\n* 沒什麼好奇怪的！' ],
      quiche5: [ '<32>{#p/human}* （你不打算這麼做。）' ],
      run1: [ '<32>{*}{#p/undyne}* 逃吧。{^20}{%}' ],
      run2a1: [ '<32>{#p/undyne}* ...', "<32>{#p/undyne}* I'll go check." ],
      run2b1: [ '<32>{#p/undyne}* (Stupid spiders...)' ],
      run2a2: [ '<32>{#p/undyne}* ...', "<32>{#p/undyne}* 我現在有點忙。" ],
      run2b2: [ '<32>{#p/undyne}* （呃...）' ],
      run3: [ "<25>{*}{#p/kidd}{#f/13}{#x1}* 我來救你！{#x2}{^20}{%}" ],
      run4: [ "<25>{*}{#p/kidd}{#f/1}{#x1}* 抱歉，我，呃...\n  我不知道怎麼著陸啊！{#x2}{^20}{%}" ],
      run5: [ '<25>{*}{#p/kidd}{#f/7}{#x1}* 我嘞個...{#x2}{^20}{%}' ],
      run6: [ '<25>{*}{#p/kidd}{#f/7}{#x1}* 救命啊！！！{#x2}{^20}{%}' ],
      run6a: [
         '<25>{*}{#p/kidd}{#f/7}{#x1}* 別{@fill=#ff0}呆呆站著{@fill=#fff}了，\n  快{@fill=#ff0}過來幫我{@fill=#fff}啊，夥計！！！{#x2}{^20}{%}'
      ],
      run6b: [ '<25>{*}{#p/kidd}{#f/7}{#x1}* 快來救我啊！！！{#x2}{^20}{%}' ],
      run6c: [ "<25>{*}{#p/kidd}{#f/7}{#x1}* 我...\n* 我-我停不下來...！{#x2}{^20}{%}" ],
      run6d: [
         '<25>{*}{#p/kidd}{#f/7}{#x1}* 你在幹什麼啊！？{#x2}{^20}{%}',
         '<25>{*}{#p/kidd}{#f/7}{#x1}* 啊...！{#x2}{^20}{%}'
      ],
      run7: [
         '<25>{#p/kidd}{#f/4}* 呃... 喲... 喲... 夥計...',
         '<25>* 如...\n* 如果你打算傷害\n  我的朋友...',
         "<25>* 你必須先通過我這關，\n  才行。"
      ],
      run8: [
         "<25>{#p/kidd}{#f/3}* 她走掉了...",
         '<25>{#f/1}* 喲，你真是救了我一命。',
         '<25>{#f/3}* 雖然我本來是想\n  來救你的啦。',
         '<25>{#f/2}* 哈哈。',
         "<25>{#f/3}* ...老兄，\n  我感覺好累啊...",
         '<25>{#f/4}* 我覺得我該回家了。',
         '<25>{#f/7}* 我...\n* 我打賭我的父母現在\n  一定擔心死我了！'
      ],
      run9: [ '<25>{#p/kidd}{#f/13}* 待... 待會見，夥計！' ],
      run10: [
         '<32>{#p/kidd}* 安黛因...\n* 你....\n* 你救了我！',
         '<32>* 啊？\n* 那個人類跑掉了？',
         "<32>* 喲，你不要亂說...",
         '<32>* 那個人類肯定是去\n  找人幫忙了！',
         "<32>* 隨時都會回來的！",
         '<32>* ...',
         "<32>* 好-好吧，我會回家的..."
      ],
      run11: (charged: boolean) => [
         '<32>{#p/kidd}* 安黛因...',
         '<32>* 你救了我...？',
         '<32>* 喲... 我...\n* 我還以為自己死定了。\n* 哈哈...',
         '<32>* ...等等，你還好嗎？\n* 你好像傷得很重...',
         '<32>* 都-都是我的錯。\n* 我該聽你的話，\n  離那人類遠一點的。',
         charged
            ? '<32>* 那人類只顧著跟你戰鬥\n  完全沒來救我...'
            : '<32>* 那人類只是站在原地...\n* 等著...\n* 等著我死。',
         '<32>* 我真的好害怕，而你...',
         "<32>* 什麼？\n* 你現在就要去\n  教訓那個人類？",
         '<32>* 但你受傷了...\n* 你該好好休息，哈哈...',
         '<32>* ...',
         "<32>* 什麼？\n  戰-戰士從來都不需要休息？",
         "<32>* 安黛因...\n* 你真的超酷。"
      ],
      sansSentry: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (This sentry station strikes you as rather unnecessary.)' ]
            : world.darker
            ? [ "<32>{#p/basic}* 一個哨站。" ]
            : [ "<32>{#p/basic}* Sans's second sentry station...", "<32>* As if the first one wasn't already enough." ],
      sansSentryBack: () =>
         !world.genocide && SAVE.data.n.state_starton_papyrus === 1
            ? [ '<32>{#p/human}* （你往桌板下面看了一眼...）', "<32>{#p/basic}* 一盒骨頭。" ]
            : [
                 '<32>{#p/human}* （你往桌板下面看了一眼...）',
                 ...(SAVE.data.b.svr
                    ? [
                         [
                            '<25>{#p/asriel1}{#f/13}* The notes in here are actually really interesting.',
                            "<25>{#f/17}* Don't you know anything about time travel?",
                            '<25>{#f/15}* I had a theory that my power to RESET was time travel...',
                            '<25>{#f/13}* ... but I never did prove it.'
                         ],
                         [
                            "<25>{#p/asriel1}{#f/13}* There's a lot of different theories I've tried to prove.",
                            '<25>{#f/13}* Quantum gravity, simulation theory, the Skasis paradigm...',
                            '<25>{#f/17}* In hindsight, I might have spent a little too much time on them.',
                            '<25>{#f/20}* Not that it made it any less interesting!'
                         ],
                         [
                            '<25>{#p/asriel1}{#f/16}* I am surprised that Sans even keeps this around.',
                            '<25>{#f/3}* He used to work at the lab, though, so...',
                            '<25>{#f/4}* I guess it could just be a sentimental thing.'
                         ],
                         [
                            '<25>{#p/asriel1}{#f/13}* I never used to understand why monsters are so sentimental...',
                            '<25>{#f/17}* ... but my years as a star changed that forever.'
                         ]
                      ][Math.min(asrielinter.sansSentryBack++, 3)]
                    : [ "<32>{#p/basic}* It's a series of notes on time travel." ])
              ],
      secretcallA: [
         '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
         '<18>{#p/papyrus}{#f/9}PSST, THIS IS PAPYRUS!',
         '<18>{#f/0}AT THE MOMENT, I AM STILL HIDING IN MY SAFE PLACE.',
         "<18>{#f/4}I HOPE YOU'RE NOT GETTING INTO TROUBLE...",
         '<18>{#f/4}BECAUSE IF YOU ARE...',
         "<19>{#f/9}I'D HAVE TO COME OVER THERE AND DO SOMETHING ABOUT IT!",
         "<18>{#f/6}... WHICH I CAN'T DO, BECAUSE OF THE CURRENT SITUATION.",
         "<18>{#f/7}SO DON'T GET INTO ANY TROUBLE!",
         '<18>{#f/5}...',
         '<18>{#f/5}PAPYRUS OUT...',
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      secretcallB: [
         '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
         "<18>{#p/papyrus}{#f/0}PSST, IT'S PAPYRUS AGAIN.",
         '<18>{#f/5}WOWIE... IT MUST BE GETTING LATE BY NOW.',
         '<18>{#f/6}ARE YOU WELL?\nHAS ANYONE ELSE BEEN... KILLED?',
         '<18>{#f/5}THESE ARE THE QUESTIONS I ASK MYSELF EVERY DAY.',
         "<18>{#f/4}GRANTED, I'VE ONLY BEEN IN HIDING FOR A SHORT TIME.",
         '<18>{#f/7}BUT STILL!!!',
         '<18>{#f/5}...',
         '<18>{#f/4}... YOU MUST BE NEARLY OUT OF THE FOUNDRY BY NOW.',
         '<18>{#f/5}I WISH I COULD DO MORE TO HELP, BUT ALAS...',
         '<18>{#f/3}IT WOULD BE UNSAFE FOR ME TO RETURN RIGHT NOW.',
         "<18>{#f/9}S-STILL!!!\nI KNOW YOU WON'T LET ME DOWN!",
         '<18>{#f/5}...',
         '<18>{#f/5}PAPYRUS OUT...',
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      spider1: () => [ '<32>{#p/basic}* ...嗯？' ],
      spider2: () =>
         badSpider()
            ? [ "<32>{#p/basic}* 黑暗中，有東西在前進。" ]
            : [ "<32>{#p/basic}* 黑暗中，有人在走動。" ],
      spider3: () => (badSpider() ? [ '<32>{#p/basic}* 它十分強大...' ] : [ '<32>{#p/basic}* 那人十分好奇...' ]),
      spider4: () =>
         badSpider() ? [ '<32>{#p/basic}* 它極其危險...' ] : [ '<32>{#p/basic}* 那人神神秘秘...' ],
      spider5: () => (badSpider() ? [ '<32>{#p/basic}* 它...' ] : [ '<32>{#p/basic}* 那人...' ]),
      spider6: () =>
         badSpider()
            ? [
                 '<32>{#p/basic}* ...將會葬身於此。',
                 '<32>* 你以為能輕易逃得掉嗎，親？',
                 '<32>* 啊呼呼~\n* 你欠下的血債，可有的還！'
              ]
            : [
                 '<32>{#p/basic}* ...會被我在此攔住。',
                 '<32>* 你以為過了特戰隊那關，\n  就萬事大吉了，親？',
                 '<32>* 啊呼呼呼~\n* 你可真是天真！'
              ],
      spookydate0x: pager.create(
         0,
         [ '<25>{#p/sans}* hey, i respect what you did back there.', '<25>{#f/3}* thanks.' ],
         [ '<25>{#p/sans}{#f/2}* keep it up, and i might even take you out for dinner.' ]
      ),
      spookydate0y: [
         "<32>{#p/basic}* Snas的後腦勺上\n  畫著一雙眼睛。",
         "<32>{#p/basic}* 感覺不太可靠的樣子。"
      ],
      spookydate0z: [
         "<32>{#p/basic}* 令人驚訝的是，\n  衫斯腦袋的側面\n  沒有畫耳朵。",
         '<33>{#p/basic}* 去後面看看...'
      ],
      spookydate0: pager.create(
         0,
         [ "<25>{#p/sans}* 謝謝你請我吃飯，\n  夥計。", '<25>* 很高興能暢聊一番。' ],
         [ '<25>{#p/sans}{#f/2}* 也許我們過會還可以\n  一起去吃個晚飯。' ]
      ),
      spookydate1: pager.create(
         0,
         () => [
            '<25>{#p/sans}* 嘿，我聽說你和我的兄弟\n  和好了。\n* 就是那個偉大的帕派瑞斯。',
            '<25>{#f/2}* 嗯... \n  我覺得這也是一場\n  {@fill=#ff0}偉大的勝利{@fill=#fff}。',
            "<25>{#f/0}* 我們去烤爾比那慶祝一番，\n  咋樣？",
            "<25>{#f/3}* 獲得了帕派瑞斯的好感，你就\n  在我內心有了一席之地。",
            choicer.create('* （你要怎麼回答？）', '走吧', '不了')
         ],
         () => [ "<25>{#p/sans}* my offer remains.\n* grillby's?", choicer.create('* （你要怎麼回答？）', '走吧', '不了') ]
      ),
      spookydate2a: () => [ "<25>{#p/sans}* 那行，我會特意為你從工作中\n  抽身的..." ],
      spookydate2b: () => [
         '<25>{#p/sans}* 那行，隨你便了。',
         ...(SAVE.data.n.sans_doge_warning++ < 1
            ? [
                 "<25>{#p/sans}* 只是如果你在\n  戰鬥中受傷，\n  記得別來抱怨...",
                 '<25>{#p/sans}* ... 因為你忘了吃東西。'
              ]
            : [])
      ],
      spookydate3: [ '<25>{#p/sans}* 這裡。\n* 我知道一條捷徑。' ],
      spookydate4: [ '<25>{#p/sans}* 很快的捷徑，不是嗎？' ],
      spookydate5: [ '<25>{#p/sans}* 嘿，各位。' ],
      spookydate6: [ '<32>{#p/basic}* 好啊，衫斯。\n{#x1}* 嘿呀，衫衫~' ],
      spookydate7: [ '<32>{#p/basic}* 嘿，衫斯。\n{#x1}* （嗨，衫斯。）' ],
      spookydate8: [ "<32>{#p/basic}* 我聽說你用烈焰烤爾比\n  把酒吧給點燃了，\n  是這樣嗎？" ],
      spookydate9: [
         '<25>{#p/sans}{#f/3}* 嗯？\n* 不，那東西完全無害。',
         '<25>{#f/2}* 能讓這酒吧燃起來的\n  只有我的招牌幽默笑話。'
      ],
      spookydate9x: [ "<25>{#p/sans}{#f/3}* gee grillby, where'd everybody go?" ],
      spookydate9y: [
         '<32>{#p/basic}{#npc/a}* ...\n* ...\n* ...',
         "<32>* ... Grillbz didn't mention customers, but said seeing you is a nice relief."
      ],
      spookydate9z: [ '<25>{#p/sans}{#f/0}* how strange.' ],
      spookydate10: [ "<25>{#p/sans}* 為什麼不過來坐一下呢，\n  夥計？" ],
      spookydate11: [
         '<25>{#p/sans}* 嗷喲，小心你坐的地方。',
         '<25>{#f/2}* 有些怪咖會把放屁墊\n  放在座位上。',
         "<25>{#f/0}* ... 那麼，來點餐吧。\n* 你呲點啥？",
         "<99>{#p/human}* （你要怎麼回答？）{!}\n§shift=64§烈焰\n§shift=64§烤爾比§shift=75§小漢堡{#c/0/8/7}",
         "<26>{#p/sans}{#f/2}* 嘿，聽上去挺不錯。"
      ],
      spookydate12a: [ "<25>{#p/sans}* 烤爾比，給我們來兩份\n  烈焰你自己。" ],
      spookydate12b: [ "<25>{#p/sans}* 烤爾比，給我們來兩份\n  小漢堡。" ],
      spookydate13: () => [
         "<25>{#p/sans}* 那麼，你覺得我兄弟的攻擊\n  咋樣？",
         choicer.create('* （你要怎麼回答？）', '簡單', '難爆')
      ],
      spookydate14a: [
         '<25>{#p/sans}* 簡單？\n* 不會吧。',
         "<25>{#f/3}* 帕派瑞斯的攻擊遠沒有那麼\n  簡單。",
         "<25>{#f/0}* 你會為他製作這些攻擊的時長\n  而感到驚訝。",
         '<26>{#f/0}* 喔，好吧。\n* 至少他休息了。',
         '<25>{#f/2}* 我是說，他把他的攻擊手冊\n  帶出來了。'
      ],
      spookydate14b: [
         '<25>{#p/sans}{#f/0}* 跟我說說看。',
         '<25>{#f/3}* 有一次，在經過了\n  漫長一天的攻擊修改後...',
         "<25>{#f/0}* 帕派瑞斯向我透露了\n  他先前的所有製作成果。",
         '<25>{#f/0}* 說實話，在看到的那一刻，\n  我大受震撼。',
         "<25>{#f/2}* 也許有朝一日，我會設計\n  獨屬於我的攻擊。"
      ],
      spookydate15: [ '<25>{#p/sans}* 吃的來了。' ],
      spookydate16: [
         '<25>{#p/sans}* 不管怎樣，有一點你得承認：\n  他成功地超越了自我。',
         '<25>{#f/0}* 他的那些攻擊設計就是\n  很好的例子。',
         '<25>{#f/3}* 不久前，帕派瑞斯去拜訪了\n  皇家衛隊隊長...',
         '<25>{#f/0}* 並懇求她讓他加入\n  皇家守衛。',
         '<25>{#f/3}* 唉，她直接當著他的面把門\n  摔上了。\n* 經典的安黛因式作風。',
         '<25>{#f/0}* 但幾個小時後，當帕派瑞斯\n  帶著他的設計歸來時...',
         "<25>{#f/0}* 安黛因大受震撼，所以她\n  決定給予他...",
         '<25>{#f/2}* ... 好吧，咱姑且叫做\n  「軍人般的訓練」。'
      ],
      spookydate17: [ "<25>{#p/sans}* 喔對了，我想問你點事來著。" ],
      spookydate18: () => [
         '<25>{#p/sans}{#f/3}* 你曾聽說過一種\n  {@fill=#ff0}會說話的星星{@fill=#fff}嗎？',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      spookydate19a: [
         '<25>{#p/sans}* 原來你都知道啊。',
         '<25>{#p/sans}* {@fill=#003cff}訊星{@fill=#fff}。'
      ],
      spookydate19b: [ "<25>{#p/sans}* 那麼，我來告訴你吧\n* 它叫{@fill=#003cff}訊星{@fill=#fff}。" ],
      spookydate20: [
         "<25>* 工廠到處都是。",
         "<25>* 如果它們接收到一條訊息，\n  就會一遍又一遍地重複著...",
         '<25>{#f/3}* 怎樣？',
         '<25>{#f/0}* 其實，有一天，帕派瑞斯\n  對我講了一些有趣的事。',
         '<25>* 有些時候，當四下無人...',
         '<25>* 一顆星星就會從天上飛下來，\n  對他說悄悄話。',
         '<25>* 有讚揚...\n* 有建議...\n* 有鼓勵...',
         '<25>{#f/3}* ...也有預言。',
         '<25>{#f/0}* 很詭異，對嗎？',
         '<25>* 肯定是誰用了訊星對他玩了\n  什麼詭計。',
         '<25>* 幫我留意一下，行嗎？',
         '<25>* 謝了。'
      ],
      spookydate21: [ '<25>{#p/sans}* ...呃，烤爾比。\n* 能幫忙把雅莫萬用醬\n  遞給我嗎？' ],
      spookydate22: [ '<25>{#p/sans}{#f/8}* 真是美味啊。' ],
      spookydate23: () =>
         world.population < 6
            ? [
                 "<25>{#p/sans}{#f/8}* 行吧，我要回到我的\n  崗位上了。",
                 '<25>{#f/8}* oh, and try to be nicer to people, will ya?',
                 '<25>{#f/9}* you might regret it otherwise.'
              ]
            : [
                 "<25>{#p/sans}{#f/8}* 行吧，我要回到我的\n  崗位上了。",
                 '<25>{#f/8}* 對了，\n  記得把吃的帶上再出門。',
                 '<25>{#f/9}* 後面可能會用上。'
              ],
      telescopeX: pager.create(
         0,
         () => [
            "<25>{#p/sans}* 我在考慮經營\n  望遠鏡生意。",
            "<25>{#f/3}* 放在我旁邊的\n  就是所謂\n  高級望遠鏡。",
            '<25>{#f/3}* 我本打算明天再\n  開放給公眾...',
            SAVE.data.b.voucher
               ? '<25>{#f/2}* 但因為你有那張\n  高級會員券，\n  所以你可以提前用。'
               : '<25>{#f/2}* 但咱倆很熟，\n  所以你可以提前用。',
            '<25>{#f/0}* 腫麼樣？',
            choicer.create('* （你要怎麼回答？）', '是', '否')
         ],
         () => [ '<25>{#p/sans}{#f/2}* 要試試\n  我的望遠鏡嗎？', choicer.create('* （你要怎麼回答？）', '是', '否') ]
      ),
      telescopeY: () =>
         SAVE.data.b.voucher
            ? ((SAVE.data.b.f_state_voucher = true),
              [
                 "<25>{#p/sans}* 讓我猜猜...\n* 是壞掉了嗎？",
                 '<25>{#f/3}* 喔，抱歉，\n  我以為你知道呢。',
                 '<25>{#f/2}* 高級會員是需要\n  付費訂閱的。',
                 ...(world.kiddo
                    ? [
                         "<25>{#p/kidd}{#f/2}* 你在開玩笑，對吧？",
                         '<25>{#p/sans}{#f/0}* 沒。\n* 付費訂閱。',
                         '<25>{#p/kidd}{#f/1}* 可惡！'
                      ]
                    : [])
              ])
            : [
                 "<25>{#p/sans}* 讓我猜猜...\n* 是壞掉了嗎？",
                 '<25>{#f/3}* 喔，抱歉，\n  我以為你知道呢。',
                 '<25>{#f/2}* 要使用高級望遠鏡\n  需要你具有\n  高級會員資格。',
                 ...(world.kiddo
                    ? [
                         '<25>{#p/kidd}{#f/1}* 如果我拿出會員券呢？',
                         "<25>{#p/sans}{#f/0}* 喔。\n* 這個嘛，就需要\n  付費訂閱了。",
                         '<25>{#p/kidd}{#f/1}* 可惡！'
                      ]
                    : [])
              ],
      telescopeZ: [ '<25>{#p/sans}{#f/2}* 哎呀...' ],
      temmiepat1: () => [
         '<32>{#p/tem}{#npc/a}* 求...\n* 提咪聽說銀類喜翻\n  摸摸提咪...',
         '<32>* 尼想...\n* 摸摸嘛？？？',
         choicer.create('{#npc}* （你要怎麼回答？）', '素的。', '卜要！')
      ],
      temmiepat2a: [ '<32>{#p/human}* （你摸了摸提米。）', '<32>{#p/tem}{#npc/a}* 嗚哇喔哇喔哇喔.....' ],
      temmiepat2b: [ '<32>{#p/tem}{#npc/a}* ...', '<32>{#p/tem}{#npc/a}* 滾開。' ],
      temmiepat3a: [ '<32>{#p/human}* （你繼續摸提米。）', '<32>{#p/tem}{#npc/a}* 嗚哇喔哇喔哇喔.....' ],
      temmiepat3b: [ '<32>{#p/tem}{#npc/a}* ...' ],
      temstatue: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你按下了雕像後的開關。）',
                 '<32>{#p/human}* (The riddle here describes a statue like this one and hints at a sequence of notes.)',
                 '<32>{#p/human}* (It also mentions bringing an item to a specific opposing room.)'
              ]
            : [
                 '<32>{#p/human}* （你按下了雕像後的開關。）',
                 "<32>{#p/basic}* ...上面刻著一個謎題。",
                 '<32>* 「玄機暗中已動，攜友故地重遊。」',
                 '<32>* 「石像如我立當中，頓悟旋律路自通。」',
                 '<32>* 「借力破迷蹤。」',
                 
              ],
      temstatueAftuh: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The riddle here describes a statue like this one and hints at a sequence of notes.)',
                 '<32>{#p/human}* (It also mentions bringing an item to a specific area.)'
              ]
            : [
                 '<32>{#p/basic}* 「開關既已啟，同友歸故地。」',
                 '<32>* 「石像如我立當中，頓悟旋律路自通。」',
                 '<32>* 「借力破迷蹤。」',
                 
                 '<32>* ...這裡的開關\n  已經被拉下來了。'
              ],
      temstatueNormuh: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The sign emphasizes the fame of the statue.)' ]
            : [ '<32>{#p/basic}* 「提咪的雕像... 超級著民」\n* 「超級！！！！！！！！！」' ],
      shard1: [ '<32>{#p/basic}* 一堆玻璃碎片。' ],
      shard2: () => [ choicer.create('* (Stomp on them?)', '是', '否') ],
      shard3: [ '<32>{#p/human}* (You decide not to stomp.)' ],
      shard4: [ '<32>{#p/basic}* With the might of your indomitable soles, you charged up the ultimate power move!' ],
      shard5: () => [
         '<32>{#p/basic}* The shards have been scattered across the room.',
         '<25>{#p/undyne}{#f/8}* PFFT-\n* OH MY GOD!!!',
         ...(SAVE.data.b.undyne_respecc
            ? [ "<25>{#p/undyne}{#f/1}* That's the kind of attitude I like to see!" ]
            : [
                 '<25>{#p/undyne}{#f/17}* I mean, uh, I mean, how could you do that to my kitchen...!',
                 '<25>{#p/undyne}{#f/4}* ...'
              ])
      ],
      sanscall2: () => [
         '<32>{#s/phone}{#p/event}* 鈴鈴，鈴鈴...',
         '<25>{#p/sans}{#f/0}* 嘿，你在嗎？',
         ...(SAVE.data.n.state_foundry_muffet === 1
            ? [
                 "<25>{#f/3}* it's been a while since i heard from you.",
                 '<25>{#f/2}* didja fall into a wormhole or something?'
              ]
            : [
                 '<25>{#f/3}* 有個孩子好像等不及\n  想再見到你了。',
                 '<25>{#f/2}* 你是等我走了之後\n  交了個新朋友嗎？'
              ]),
         '<25>{#f/0}* ...哈。',
         "<25>{#f/0}* 我猜你現在還好。",
         '<25>{#f/3}* 我真的很想密切關注你，\n  但是...',
         "<25>{#f/0}* 出於某些原因，\n  這臺昂貴的望遠鏡\n  沒法透過牆壁看到東西。",
         "<25>{#f/2}* 我被騙了。\n* 我得打電話給我的\n  保費欺詐代理人。",
         ...(world.population === 0
            ? [
                 '<25>{#f/0}* 現在，\n  你應該不會有事的。',
                 '<25>{#f/3}* the area ahead of you seems pretty empty, by my estimate.',
                 '<25>{#f/2}* but hey.\n* i could be wrong.'
              ]
            : world.killed5
            ? [
                 "<25>{#f/0}* in the meantime, you shouldn't have too much more trouble.",
                 '<25>{#f/3}* the area ahead of you will be evacuated soon.',
                 '<25>{#f/2}* hmm... i wonder if anyone will still be out there.'
              ]
            : geno()
            ? [
                 '<25>{#f/0}* in the meantime, just be careful what you do next.',
                 "<25>{#f/3}* it'd be a shame if we had to evacuate the foundry as well."
              ]
            : antiAteThreshold()
            ? [
                 '<25>{#f/0}* in the meantime, just be careful who you talk to.',
                 "<25>{#f/3}* rumor has it, someone's been roughhousing folks in the factory."
              ]
            : [
                 '<25>{#f/0}* in the meantime, just be careful who you talk to.',
                 "<25>{#f/3}* 有傳言說，\n  有誰在垃圾處理站附近\n  大搞破壞。"
              ]),
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      trivia: {
         f_bbox: [ "<32>{#p/basic}* A bastion box.\n* There's a human inside..." ],
         ghostparty1: pager.create(
            0,
            () => [
               '<32>{#p/finalghost}* Hello there.\n* I still remember the first time we met...',
               ...[
                  [
                     '<32>{#p/finalghost}* Toriel was so proud of you for talking to me.',
                     "<32>* Personally, I don't think too much about how I talk to people, so...",
                     "<32>* I'm not sure what else to say about that."
                  ],
                  [
                     '<32>{#p/finalghost}* ... much to my dismay.',
                     '<32>* Being forced out of your dummy outright is kind of annoying.'
                  ],
                  [
                     '<32>{#p/finalghost}* It was rather silly how you ran away from me.',
                     '<32>* Toriel had every right to be worried about you running from an inanimate object.'
                  ],
                  [
                     '<32>{#p/finalghost}* ... not that I have any right to.',
                     '<32>* I mean, how could you actually be that boring?\n* It must be a skill.'
                  ],
                  [
                     '<32>{#p/finalghost}* ... ha...',
                     '<32>* ... maybe, when I get another vessel, the two of us can... do our thing again.',
                     "<32>* You remember, don't you?"
                  ],
                  [
                     '<32>{#p/finalghost}* ... much to my dismay.',
                     '<32>* Being forced to move after such a long period of blissful inanimateness...',
                     '<32>* It was very uncomfortable.'
                  ],
                  [
                     '<32>{#p/finalghost}* Toriel was so taken aback by your flirtatious ways.',
                     '<32>* Personally, I thought it was hilarious.',
                     '<32>* I was laughing on the inside.'
                  ]
               ][SAVE.data.n.state_wastelands_dummy],
               '<32>* Anyway...',
               "<32>* We all decided to hang out at Blooky's before leaving for the new homeworld.",
               '<32>* I will say, Blooky sure had some \"interesting\" music queued for download here...',
               '<32>* What\'s a \"Hyper Rage\" anyway?',
               "<32>{#p/basic}* A song I wish I hadn't made.",
               '<32>{#p/finalghost}* Oh?\n* You made this?',
               '<32>{#p/basic}* Unfortunately, mew.',
               '<32>{#p/finalghost}* I can see why you would want to forget about it.'
            ],
            [ "<32>{#p/finalghost}* She's looking to move past her violent ways." ]
         ),
         ghostparty2: pager.create(
            0,
            [
               '<32>{#p/basic}* So, being an angry dummy got boring after a while.',
               '<32>* Then I asked Alphys to make me a replica of her favorite Mew Mew doll, mew!',
               '<32>* Wow.\n* Wow!\n* WOW!!',
               "<32>* I haven't felt this happy in a long time."
            ],
            [ '<32>{#p/basic}* Sometimes all it takes is the right vessel, mew!!' ]
         ),
         ghostparty3: pager.create(
            0,
            [
               "<32>{#p/mettaton}{#e/mettaton/9}* WHILE BLOOKY'S BUSY AT THE SHOP, WE DECIDED WE'D LOOK AFTER THEIR FARM ONCE MORE.",
               "<32>{#e/mettaton/8}* OF COURSE, IT'S ONLY FOR A DAY BEFORE WE LEAVE THE OUTPOST.\n* BUT STILL.",
               "<32>{#e/mettaton/36}* THINKING BACK, I'VE BEEN PRETTY OVER-DRAMATIC ABOUT THE WHOLE THING.",
               "<32>{#e/mettaton/36}* BLOOKY NEVER DID -THAT- MUCH WRONG... I GUESS I JUST DIDN'T WANT TO ADMIT I WAS BORED.",
               "<32>{#e/mettaton/8}* BUT MAYBE THAT'S WHAT MAKES ME SUCH A GREAT ACTOR.",
               "<32>{#e/mettaton/37}* IT'S NOT ACTING IF YOU CAN'T PUT TOO MUCH EMOTION INTO IT!",
               '<32>{#e/mettaton/9}* ... OR SOMETHING LIKE THAT.'
            ],
            [ '<32>{#p/mettaton}{#e/mettaton/9}* IF YOU EVER NEED AN ACTOR, YOU KNOW WHO TO CALL.' ]
         ),
         sleepingdogs: () =>
            world.darker
               ? [
                    "<32>{#p/basic}* 一隻站得筆挺的狗子睡得正香。",
                    ...(world.goatbro && SAVE.flag.n.ga_asrielDogepoke++ < 1
                       ? [ '<25>{#p/asriel2}{#f/10}* 不得不說，她就是這種貨色。' ]
                       : [])
                 ]
               : [
                    '<32>{#p/basic}* 這隻狗看起來像是睡著了，\n  但它的姿勢是一種極度的\n  戰備狀態。',
                    '<33>{#p/basic}* 不愧是空降犬！'
                 ],
         napstacouch: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (The couch appears to be new, but something tells you it's not.)" ]
                  : [
                       '<32>{#p/basic}* This couch looks just as worn as it does brand-new.',
                       ...(ghostpartyCondition()
                          ? [
                               "<32>{#p/basic}* We're ghosts, so we don't really need a couch, mew.",
                               '<32>* We just thought the room looked better with one in it!',
                               '<32>{#p/mettaton}* OF COURSE.\n* ANY GOOD LIVING SPACE REQUIRES AT LEAST ONE COUCH!',
                               '<32>{#p/mettaton}* PREFERABLY MTT-BRAND.',
                               '<32>{#p/finalghost}* This seems like an entirely pointless requirement.'
                            ]
                          : [])
                    ],
            () =>
               SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (The couch appears to be new, but something tells you it's not.)" ]
                  : [ '<32>{#p/basic}* This couch looks just as worn as it does brand-new.' ]
         ),
         f_armor_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign warns of dogs who appear to be asleep.)' ]
               : [ '<32>{#p/basic}* 「小心睡覺的狗。」' ],
         f_backsign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign speaks of strength of will in times of uncertainty.)' ]
               : [ '<32>{#p/basic}* \"Even when you\'re lost, the will to find yourself shows through.\"' ],
         f_cheesetable: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (Something about this cheese doesn't sit right with you.)" ]
               : world.darker
               ? [ '<32>{#p/basic}* 幻象罷了。' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Despite being holographic, it looks like a small slice of cheese was taken...' ]
               : [ '<32>{#p/basic}* 全息奶酪。', '<32>{#p/basic}* 桌子也是全息的。' ],
         f_creamsign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign declares the monsters' ownership of the outpost.)" ]
               : world.population_area('s') < 6 || world.genocide || SAVE.data.n.plot === 72 // NO-TRANSLATE

               ? [ '<32>{#p/basic}* 「我們聲稱前哨站是我們自己的，\n   而不再是用來俘虜我們的。」' ]
               : [ '<32>{#p/basic}* 象形文字被21種不同的口味\n  塗蓋住了。' ],
         f_doge_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign derides boxes for their lack of real-time utility.)' ]
               : [
                    '<32>{#p/basic}* 「這是一個箱子。」',
                    '<32>* 「你可以把物品放進去\n   或者拿出來。」',
                    '<32>* 「但你為什麼要那麼做？」\n* 「東西放在箱子裡的時候，\n   你又用不了。」',
                    '<32>* 「謹上，一個箱子批評者。」'
                 ],
         f_doge1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign details the difference in power between human and monster SOULs.)' ]
               : [
                    '<32>{#p/basic}* 「人類為什麼要進攻？」\n* 「誠然，他們似乎無所畏懼。」',
                    '<32>* 「人類非常強大。\n   所有怪物的靈魂加起來...」',
                    '<32>* 「...才能和一個人類靈魂的\n   力量相當。」'
                 ],
         f_doge3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign outlines a key weakness of human SOULs and its consequences.)' ]
               : [
                    '<32>{#p/basic}* 「但人類有一個弱點。\n   諷刺的是，\n   這正是他們靈魂的力量。」',
                    '<32>* 「他們的靈魂即使在他們死後\n   也可以在人體之外持續存在。」',
                    '<32>* 「如果一個怪物打敗了一個人類，\n   怪物就可以取走人類的靈魂。」',
                    '<32>* 「一個有著人類靈魂的怪物...\n   一個擁有深不可測的力量的\n   宇宙生物。」',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielBeast++ < 1
                       ? [ "<25>{#p/asriel2}{#f/15}* Cosmic doesn't even BEGIN to cover it..." ]
                       : [])
                 ],
         f_doge5: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign depicts something the likes of which you've never seen before.)" ]
               : [
                    "<32>{#p/basic}* 這是一幅悲慘的\n  太空生物的插畫...",
                    "<32>* 這幅畫有點讓人不安。",
                    ...(world.goatbro && SAVE.flag.n.ga_asrielDrawing++ < 1
                       ? [
                            "<25>{#p/asriel2}{#f/5}* Look, $(name)!\n* It's us!\n* ... sort of.",
                            '<26>{#f/4}* ... is that really how they think we looked?'
                         ]
                       : [])
                 ],
         f_gersonshop: () =>
            SAVE.data.b.svr
               ? [
                    [
                       "<25>{#p/asriel1}{#f/17}* To think he'd been running that store for this long...",
                       "<25>{#f/20}* I wonder what other things he's sold over the years.",
                       "<25>{#f/15}* Remember, in this timeline, I've only been here two weeks.",
                       "<25>{#f/13}* My guess is, he's mainly been selling trinkets...",
                       '<25>{#f/16}* Either from the early outpost days, or the old homeworld.'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* I did hear something about a certain artifact...',
                       '<25>{#f/15}* One so dangerous, its use was banned in the war.',
                       "<25>{#f/16}* I'm not sure if Gerson ever sold it, though.",
                       '<25>{#f/13}* Even he might not be old enough to know if it exists.'
                    ],
                    [
                       "<25>{#p/asriel1}{#f/15}* Knowledge about that artifact's existence...",
                       "<25>{#f/13}* It'd have to be within someone who was born even before the war.",
                       '<25>{#f/16}* Someone like that would know all about that sort of thing.'
                    ]
                 ][Math.min(asrielinter.f_gersonshop++, 2)]
               : [ '<32>{#p/basic}* 「這是葛森雜貨鋪！」\n* 「想要什麼，就來小店吧！\n   應有盡有！」' ],
         f_hub_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign lists off what lies in each direction.)' ]
               : [
                    '<32>{#p/basic}* 「向左 - 暗區」\n* 「向前 - 安黛因的家」\n* 「向右 - 葛森的商店」',
                    '<32>{#p/basic}* 「向後 - 蝸牛保護區」'
                 ],
         f_lobbywindow: [
            "<32>{#p/human}* （你覺得你已經從另一個角度\n  看到過這樣的窗戶了。）"
         ],
         f_shinycab: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* Looks like it already cleaned out the room...',
                       '<25>{#f/17}* No trash here!'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/15}* Unless you consider yourself a piece of trash.',
                       "<25>{#f/16}* Knowing you, that wouldn't surprise me.",
                       "<25>{#f/31}* You'd probably be proud of it or something."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* ... come on.',
                       "<25>{#f/17}* You don't REALLY believe you're a piece of trash, do you?"
                    ]
                 ][Math.min(asrielinter.f_shinycab++, 2)]
               : world.darker
               ? [ '<32>{#p/basic}* 一臺垃圾處理器。' ]
               : [
                    '<32>{#p/basic}* 一個垃圾處理箱。\n* 當它啟動時，極熱的氣體\n  會充斥整個房間。',
                    "<32>{#p/basic}* 你活不下來的。"
                 ],
         f_path1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes how a being can leave the force field.)' ]
               : [
                    '<32>{#p/basic}* 「人類用一道力場\n   將我們囚禁於此。」',
                    '<32>* 「一般人，沒有強大的靈魂，\n   根本無法離開。」'
                 ],
         f_path2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes how the force field can be broken.)' ]
               : [
                    '<32>{#p/basic}* 「想獲得自由，\n   只有一個辦法。」',
                    '<32>* 「那就是...」',
                    '<32>* 「用一股相當於七個人類靈魂的\n   強大力量擊打力場，\n   將其徹底摧毀。」'
                 ],
         f_path3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears this sign was very wrong indeed.)' ]
               : [
                    '<32>{#p/basic}* 「但這片詛咒之地\n   遠在主星系外圍。」',
                    '<32>* 「指望人類找到我們，\n   簡直就是天方夜譚。」',
                    '<32>* 「我們將永遠困在這裡。」'
                 ],
         f_puzzle1_sign: () =>
            SAVE.data.b.svr
               ? world.postnoot && world.nootflags.has('f_puzzle1') // NO-TRANSLATE

                  ? [
                       '<32>{#p/human}* (The sign tells you to ignore the puzzle outright.)',
                       ...[
                          [
                             "<25>{#p/asriel1}{#f/15}* Whoever wrote that must've had a bad sense of humor...",
                             "<25>{#f/17}* You'd have to be REALLY bored to ignore a puzzle this simple."
                          ],
                          [
                             '<25>{#p/asriel1}{#f/9}* What are you looking at me for?\n* I love puzzles.',
                             "<25>{#f/4}* Big ol' puzzle lover right here."
                          ],
                          [ '<25>{#p/asriel1}{#f/15}* ...' ]
                       ][Math.min(asrielinter.f_puzzle1_sign++, 2)]
                    ]
                  : [ '<32>{#p/human}* (The sign informs you on how to solve the puzzle.)' ]
               : world.postnoot && world.nootflags.has('f_puzzle1') // NO-TRANSLATE

               ? [ '<32>{#p/basic}* \"Walk right into the next room if you don\'t mind.\"\n* \"And ignore the switch.\"' ]
               : [
                    '<32>{#p/basic}* 「移動塔架，\n   引導雷射射向接收器。」\n  「然後按下開關。」'
                 ],
         f_puzzle2_sign: () =>
            SAVE.data.b.svr
               ? world.postnoot && world.nootflags.has('f_puzzle2') // NO-TRANSLATE

                  ? [
                       '<32>{#p/human}* (The sign claims nobody would care about this puzzle.)',
                       ...[
                          [
                             '<25>{#p/asriel1}{#f/13}* Yeah, puzzles like this just solve themselves sometimes...',
                             '<25>{#f/17}* What else can I say?'
                          ],
                          [
                             '<25>{#p/asriel1}{#f/10}* Huh?\n* You think I solved this one for you...?',
                             '<25>{#f/20}* No way.\n* Puzzles barely interest me at all.'
                          ],
                          [ '<25>{#p/asriel1}{#f/15}* ...' ]
                       ][Math.min(asrielinter.f_puzzle2_sign++, 2)]
                    ]
                  : [ '<32>{#p/human}* (The sign informs you on how to solve the puzzle.)' ]
               : world.postnoot && world.nootflags.has('f_puzzle2') // NO-TRANSLATE

               ? [ '<32>{#p/basic}* \"Honestly, who cares about this puzzle?\"\n* \"It\'s not worth it.\"' ]
               : [ '<32>{#p/basic}* 「要解決這個謎題，\n   你必須用上所有的塔架。」' ],
         f_puzzle3_sign: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The sign declares the decided unfairness of this puzzle as the reason it was shut down.)',
                    "<25>{#p/asriel1}{#f/20}* Yeah... this puzzle's a real pain in the butt."
                 ]
               : !world.genocide && world.trueKills < 30
               ? [ '<32>{#p/basic}* 「謎題公會認為該謎題\n   難度過於逆天，\n   因此取消了這個謎題。」' ]
               : world.postnoot && world.nootflags.has('f_puzzle3') // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}* 告示牌上的內容\n  都被划去了...',
                    '<32>* ...而且還劃了兩次？'
                 ]
               : [
                    '<32>{#p/basic}* 告示牌上的內容\n  都被划去了...',
                    '<32>* ...字跡簡直不堪入目。'
                 ],
         f_statue_kidd: () =>
            SAVE.data.b.svr
               ? [ '<26>{#p/asriel1}{#f/20}* Er, try standing the other switch.' ]
               : [ '<25>{#p/kidd}{#f/1}* 站在另一個開關上吧！' ],
         f_telescope: () =>
            SAVE.data.b.svr
               ? [
                    [ "<25>{#p/asriel1}{#f/15}* Frisk.\n* It's no use.\n* Don't even bother." ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Even if you COULD get a premium subscription...',
                       "<25>{#p/asriel1}{#f/15}* You'd never be able to cancel it."
                    ],
                    [ "<25>{#p/asriel1}{#f/16}* There's just too many premium hoops to jump through here." ]
                 ][Math.min(asrielinter.f_telescope++, 2)]
               : world.darker
               ? [ "<32>{#p/basic}* 一架望遠鏡。" ]
               : [ '<32>{#p/basic}* 這是一架「高級」望遠鏡。' ],
         f_temhistory: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The painting depicts a tale of a nondescript nature.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* 關於提咪的歷史。' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Tem history.\n* May its richness and deepness never be forgotten.' ]
               : [ '<32>{#p/basic}* 提咪的歷史。\n* 銀河系中最深遠\n  最豐富的歷史。' ],
         f_temhole: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Through the hole, you stare into the rumbling underbelly of the factory.)' ]
               : world.runaway ||
                 SAVE.data.s.state_foundry_deathroom === 'f_village' || // NO-TRANSLATE

                 world.genocide ||
                 30 <= world.trueKills
               ? [ "<32>{#p/basic}* 一個洞。" ]
               : [ "<32>{#p/basic}* 有個提米在洞裡。\n* 提咪洞。" ],
         f_trash: pager.create(
            1,
            [ '<32>{#p/basic}* 是垃圾。' ],
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 還是垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 只是些垃圾...' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 垃圾就是垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 垃圾形狀的垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 真意外，這是垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 垃圾！！！！！！！！' ])
         ),
         f_trash1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The tablet seems to describe the lifecycle of a particular kind of flower.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* 這臺平板上的數據沒什麼重要的。' ]
               : [
                    "<33>{#p/basic}* 這是臺舊平板電腦。\n* 數據基本都損壞了...",
                    '<32>* 「一朵來自遠方的花...\n  第二次生命...\n  星星的形狀...」',
                    "<32>* 你能認出來的就是這些。"
                 ],
         f_trash2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The tablet describes various uses for wormholes.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* 這臺平板上只記了些毫無意義的瑣事。' ]
               : [
                    "<32>{#p/basic}* 這是一臺關於蟲洞旅行的\n  平板電腦。",
                    '<32>* 另外一章節提到了\n  蟲洞武器的危險...'
                 ],
         f_trash3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The tablet contains the entire run of a science fiction anime.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* 這臺平板上存了些影片。\n* 你對影片內容不感興趣。" ]
               : [
                    "<32>{#p/basic}* 這是一臺上面有\n  科幻動漫的舊平板電腦。",
                    '<32>* 封面上寫著\n  「喵喵星火：全集」。'
                 ],
         f_undynedummy: () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* I've been thinking of finding a new identity...",
                    '<32>* The \"Mad Dummy\" shtick just doesn\'t suit me anymore.',
                    '<32>* I wonder if Alphys could make me a new body...',
                    '<32>* Something like... a robo-girl, or... a digi-woman...',
                    '<32>* Or even a sci-fi doll?'
                 ]
               : SAVE.data.b.killed_mettaton
               ? []
               : SAVE.data.s.state_foundry_deathroom === 'f_undyne' // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}* No.\n* No!\n* NO!!',
                    '<32>* You killed my only training partner.',
                    '<32>* How DARE you kill the only person who knows how to hit me properly!?',
                    ...(SAVE.data.n.bad_lizard < 2 && 49 <= SAVE.data.n.plot
                       ? [ '<32>* No matter how many dumb game shows I agree to be in to try and distract myself...' ]
                       : [ '<32>* No matter what lame excuse I come up with...' ]),
                    "<32>* I'll never be able to replace her!"
                 ]
               : world.goatbro
               ? [
                    '<32>{#p/basic}* 真的嗎，\n* 真的嗎？\n* 真-的-嗎！？',
                    '<32>{#p/basic}* 你們真是大好人。',
                    ...(SAVE.flag.n.ga_asrielDummy++ < 1
                       ? [ '<25>{#p/asriel2}{#f/13}* 我們... 真讓它...', '<25>{#p/asriel2}{#f/16}* ...' ]
                       : [])
                 ]
               : SAVE.data.n.plot_date > 1.3 && SAVE.data.n.plot_date < 2.1
               ? SAVE.data.n.state_wastelands_toriel === 0
                  ? [ "<32>{#p/basic}* Don't worry.\n* Everything is fine.\n* This happens all the time." ]
                  : [ '<32>{#p/basic}* 什麼。\n* 什麼？\n* 什-麼-！？', '<32>{#p/basic}* 這種情況經常發生的。' ]
               : SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

               ? [
                    "<32>{#p/basic}* Yeah, you're so cool with that Mew Mew doll of yours, huh?",
                    "<32>{#p/basic}* You think it's so adorable and lovable and...",
                    "<32>{#p/basic}* W-what!?\n* I'm not blushing!"
                 ]
               : 65 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_hapstablook
                  ? 68 <= SAVE.data.n.plot
                     ? [ '<32>{#p/basic}* You did it, human.', "<32>{#p/basic}* I'm sorry I ever doubted you." ]
                     : [
                          '<32>{#p/basic}* Well.\n* Well!\n* WELL!',
                          '<32>* You certainly know how to choose your battles.'
                       ]
                  : [ '<32>{#p/basic}* Ugh.\n* Ugh!\n* UGH!', '<33>{#p/basic}* My life really sucks right now.' ]
               : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
               ? [
                    "<32>{#p/basic}* Hey, aren't you supposed to be in Mettaton's next show?",
                    '<32>* What are you doing way back here?',
                    '<32>* Come on.\n* Come on!\n* COME ON!!',
                    '<32>* Get back in the spotlight so we can go forward with our plan!'
                 ]
               : SAVE.data.n.bad_lizard < 2 && 49 <= SAVE.data.n.plot
               ? [
                    '<32>{#p/basic}* 所以。\n* 所以！\n* 所-以！',
                    "<32>* 你現在是電視明星了，\n  是吧？",
                    '<32>* 是啊，鎂塔頓經常能對人\n  產生這樣的影響。'
                 ]
               : SAVE.data.n.plot === 47.2
               ? [ '<32>{#p/basic}* 準備好了嗎，\n  她要來了！！' ]
               : SAVE.data.n.state_wastelands_toriel === 0
               ? [ '<32>{#p/basic}* Hello again!' ]
               : SAVE.data.b.f_state_dummypunch
               ? [
                    '<32>{#p/basic}* 嘿。\n* 嘿！\n* 嘿-！',
                    ...(SAVE.data.b.f_state_dummypunch_meanie
                       ? [
                            "<32>* You don't hit too bad for a dummy.",
                            "<32>* It's a pity...",
                            "<32>* BECAUSE I'M ALREADY TAKEN!",
                            '<32>* Go find your own dummy and get the hell outta my face!'
                         ]
                       : [
                            '<32>* Hands off the goods!\n* I ain\'t rated \"E\" for everyone, you know!',
                            '<32>* Wimpy strikes like yours will never compare to those of Undyne!'
                         ])
                 ]
               : SAVE.data.b.f_state_dummyhug
               ? [
                    '<32>{#p/basic}* 嘿。\n* 嘿！\n* 嘿-！',
                    "<32>* ... you're...\n* Actually a pretty good hugger.",
                    '<32>* So... even though I have my fear... I still appreciate the attempt.'
                 ]
               : SAVE.data.b.f_state_dummytalk
               ? [
                    '<32>{#p/basic}* 嘿。\n* 嘿！\n* 嘿-！',
                    ...(SAVE.data.b.f_state_dummytalk_meanie
                       ? [
                            "<32>* You've got quite the intimidating stare.",
                            "<32>* It's a shame you wasted it on me...",
                            "<32>* BECAUSE I COULDN'T CARE LESS!"
                         ]
                       : [
                            '<32>* 把你的眼睛從我身上挪開！\n* 我又不是人人都能評價的，\n  你又不是不知道！',
                            "<32>* 像你這樣軟弱的凝視\n  永遠比不上安黛因那\n  兇狠的凝視！"
                         ])
                 ]
               : [ '<32>{#p/basic}* 什麼。\n* 什麼？\n* 什-麼-！？', "<32>{#p/basic}* It's a living." ],
         f_view: [ '<25>{#p/kidd}{#f/14}* Awesome...' ],
         f_village_egg: () => [ "<32>{#p/basic}* 已經熟透了。" ],
         f_village_sign1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign welcomes you to the area.)' ]
               : [ '<32>{#p/tem}* 「你吼！！」\n* 「歡銀來...」\n* 「提咪村莊！！！」' ],
         f_village_sign2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign implores you to check the nearby shop.)' ]
               : [ '<32>{#p/tem}* 「你吼！！」\n* 「尼贏改看看...」\n* 「提咪商店！！！」' ],
         f_village_sign3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign agrees with another sign imploring you to check the nearby shop.)' ]
               : [ '<32>{#p/tem}* 「嚎吖！！窩通噫！！」\n* 「贏改看看...」\n* 「提咪商店！！！」' ],
         fstatue: () =>
            SAVE.data.b.svr
               ? [
                    [ '<25>{#p/asriel1}{#f/13}* This statue...', '<25>{#f/15}* Is this supposed to be of me...?' ],
                    [
                       "<25>{#p/asriel1}{#f/13}* I don't remember this being built...",
                       "<25>{#f/23}* Must've been after I...",
                       '<25>{#f/22}* ...'
                    ],
                    [ '<25>{#p/asriel1}{#f/22}* ...' ]
                 ][Math.min(asrielinter.fstatue++, 2)]
               : [ "<32>{#p/basic}* 這是座古老的、廢棄的雕像。" ],
         hapstabed: () =>
            SAVE.data.b.svr
               ? [
                    [
                       "<25>{#p/asriel1}{#f/15}* I doubt even WE'D sleep very well in this bed.",
                       '<25>{#f/23}* No matter how comfortable that might sound.'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Yeah.\n* This is a ghost bed, Frisk.',
                       '<25>{#f/13}* Ghosts have different sorts of needs than... well, not ghosts.',
                       "<25>{#f/13}* And I'm not just talking about their sleeping arrangements."
                    ],
                    [
                       '<26>{#p/asriel1}{#f/13}* Ghosts, more than any other kind of monster...',
                       '<25>{#f/13}* Seem to focus more on the world around them.',
                       "<25>{#f/15}* It's like they never let what's in front of them...",
                       '<25>{#f/13}* Distract them from the bigger picture for long.',
                       "<25>{#f/17}* On second thought, maybe that's why Mettaton loves TV.",
                       '<25>{#f/16}* Getting the \"bigger picture\" is basically the whole idea...'
                    ],
                    [ '<26>{#p/asriel1}{#f/20}* Mettaton and his TV shows, am I right?' ]
                 ][Math.min(asrielinter.hapstabed++, 3)]
               : world.darker
               ? [ "<32>{#p/basic}* It's a ghost bed." ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* Just because you saved the galaxy doesn't mean you can sleep on a ghost bed." ]
               : [ "<32>{#p/basic}* It's a ghost bed.\n* You'd sleep right through it." ],
         hapstabook1: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* It's a voicebook." ]),
            '<32>{#p/human}* (You pick up the voicebook and open to the only recorded section.)',
            '<32>{#p/hapstablook}* Dear diary, volume one...',
            '<32>* Humans dream of so many fantastical stories, yet when I look out my window...',
            '<32>* ... all I can see is a wall.',
            '<32>* Is it right that we monsters have become used to this sad state of living?',
            '<32>* Is it right that only the youngest children seem to be truly alive?',
            '<32>* Our sense of wonder has been beaten out of us...',
            "<32>* There's no denying it now.",
            '<32>{#p/human}* （你把書放下了。）',
            ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom1++ > 0
               ? []
               : [
                    '<32>{#p/basic}* ... he was always like this in the early days...',
                    '<32>{#p/basic}* Always wanting everyone to be as happy as he was.',
                    '<32>{#p/basic}* Especially me.'
                 ])
         ],
         hapstabook2: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* It's a voicebook." ]),
            '<32>{#p/human}* (You pick up the voicebook and open to the only recorded section.)',
            '<32>{#p/hapstablook}* Dear diary, volume two...',
            "<32>* I've been binge-watching old human television series.",
            "<32>* These people aren't like what I've been told... in fact, they're a lot like us.",
            '<32>* Living, laughing, loving...\n* Hurting and crying.\n* Doing what they believe in.',
            '<32>* They say humanity is a species that should be feared.',
            '<32>* But the more I see of them... the more I grow tired of that idea.',
            "<32>* Monsters aren't all starlight and roses, either.",
            '<32>{#p/human}* （你把書放下了。）',
            ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom2++ > 0
               ? []
               : [
                    '<32>{#p/basic}* I remember how, when we first met, he was the first one to open up to me.',
                    "<32>{#p/basic}* It wasn't long before I opened up, too..."
                 ])
         ],
         hapstabook3: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* It's a voicebook." ]),
            '<32>{#p/human}* (You pick up the voicebook and open to the only recorded section.)',
            '<32>{#p/hapstablook}* Dear diary, volume three...',
            "<32>* It's been a hard day at the farm for Blooky and me.",
            "<32>* Two of the snails we'd been looking after escaped, and we couldn't find them.",
            '<32>* No matter what I do, something like this always happens.',
            "<32>* Blooky says it's fine, of course, but they say that about everything.",
            '<32>* And I wonder why I still bother working here.',
            '<32>{#p/human}* （你把書放下了。）',
            ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom3++ > 0
               ? []
               : [
                    '<32>{#p/basic}* I tried to help the family out, but with the way things were...',
                    "<32>{#p/basic}* There wasn't much I could do."
                 ])
         ],
         hapstabook4: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* It's a voicebook." ]),
            '<32>{#p/human}* (You pick up the voicebook and open to the only recorded section.)',
            '<32>{#p/hapstablook}* Dear diary, volume four...',
            '<32>* I was at the store today when I ran into a girl... Alphys, I think?',
            "<32>* Apparently, she's next in line to be the royal scientist.\n* Who would've thought?",
            '<32>* Anyway, her and I have become fast friends due to our shared love of humanity.',
            '<33>* Funny... the previous royal scientist was sympathetic, too.',
            '<32>* I wonder why that is.',
            '<32>{#p/human}* （你把書放下了。）',
            ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom4++ > 0
               ? []
               : [ '<32>{#p/basic}* Oh, if only you knew...' ])
         ],
         hapstabook5: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* It's a voicebook." ]),
            '<32>{#p/human}* (You pick up the voicebook and open to the only recorded section.)',
            '<32>{#p/hapstablook}* Dear diary, volume five...',
            '<32>* Alphys and I have started work on a new project.',
            "<32>* We'll be taking inspiration from those imaginative humans...",
            '<32>* ... by starting a new, public- broadcast television series!',
            "<32>* I've already written numerous elaborate scripts.",
            "<32>* If this doesn't lift the public's spirits, then I don't know what will!",
            '<32>* Haha... let\'s just say things could get \"explosive.\"',
            '<32>{#p/human}* （你把書放下了。）',
            ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom5++ > 0
               ? []
               : [ '<32>{#p/basic}* All he ever wanted to do was make them happy...' ])
         ],
         hapstabook6: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* It's a voicebook." ]),
            '<32>{#p/human}* (You pick up the voicebook and open to the only recorded section.)',
            '<32>{#p/hapstablook}* Dear diary, volume six...',
            '<32>* That Alphys... shes done something I never could have imagined.',
            '<32>* Thanks to her, my future seems brighter than ever...',
            '<32>* ... I only hope the others come to understand my choice.',
            '<32>* No matter what happens to me next, a part of me will always miss being with you.',
            '<32>* Please... never forget that.\n* Even if I myself do.',
            '<32>{#p/human}* （你把書放下了。）',
            ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom6++ > 0
               ? []
               : SAVE.data.n.plot < 68
               ? [
                    '<32>{#p/basic}* Sentimental as ever, eh?',
                    "<32>{#p/basic}* Well.\n* With any luck, you'll be re- united on better terms soon."
                 ]
               : [
                    '<32>{#p/basic}* Sentimental as ever, eh?',
                    "<32>{#p/basic}* Heh.\n* I'm just glad you got to re- unite with them in the end."
                 ])
         ],
         hapstacouch: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (But you knew you still had a little further to go before you could rest.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's just a couch." ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* Another couch, another temptation... you're so tired after all this traveling.",
                    "<32>{#p/basic}* ... but you can't stay here forever!"
                 ]
               : [
                    "<32>{#p/basic}* Another couch, another temptation... you're so tired after all this traveling.",
                    '<32>{#p/basic}* ... but you have to keep going!'
                 ],
         hapstaposter: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The caption on this poster describes a love story.)' ]
               : [ '<32>{#p/basic}* \"Two star-crossed lovers fall into a digital abyss...\"' ],
         hapstatv: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* This thing must be centuries old...',
                       '<25>{#f/17}* Makes you wonder how it got here from Earth so quickly.'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* You do realize Earth is thousands of lightyears from here, right?',
                       '<25>{#f/15}* The odds of this being here are so slim...',
                       "<25>{#f/16}* That part of me thinks it wasn't an accident.",
                       '<25>{#f/10}* But why would the humans send us their centuries-old junk?'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/17}* My theory is that some human was... secretly on our side.',
                       "<25>{#f/13}* They couldn't send us modern technology, that'd be detected.",
                       '<25>{#f/1}* But if they sent us ancient technology...',
                       '<25>{#f/2}* Well, the other humans might not have noticed.',
                       "<25>{#f/3}* But that's just a theory."
                    ],
                    [ "<25>{#p/asriel1}{#f/21}* Sure would've been nice to have an extra ally out there..." ]
                 ][Math.min(asrielinter.hapstatv++, 3)]
               : [ '<32>{#p/basic}* An old earth television set.' ],
         hapstawindow: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Through the window, you gaze long into the wall on the other side.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* There's nothing to see here." ]
               : [ '<32>{#p/basic}* A beautiful view... of the outside foundry wall.' ],
         k_bonedrawer: pager.create(
            0,
            () => [
               "<25>{#p/undyne}{#f/1}* 老實說...",
               "<25>{#f/14}* 這麼長時間了，\n  那個抽屜真的越塞越滿。",
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 全是骨頭。'
                  : "<32>{#p/basic}* It's a drawer reserved just for Papyrus.\n* I like this."
            ],
            () => [
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 全是骨頭。'
                  : "<32>{#p/basic}* It's a drawer reserved just for Papyrus.\n* I like this."
            ]
         ),
         k_broadsword: pager.create(
            0,
            () => [
               '<25>{#p/undyne}{#f/1}* 人類爛爆了，\n  不過他們的歷史...\n  還挺炫酷的。',
               '<25>{#f/1}* 舉個恰當的例子，\n  就是這把巨型能量劍！',
               '<25>{#f/1}* 據歷史記載，人類使用長達\n  他們身高10倍的劍。',
               '<25>{#f/15}* 更不用說他們的\n  跨維度傳送門了...',
               '<25>{#f/15}* 光年級的巨型戰艦...',
               '<25>{#f/1}* 我第一次聽說到的時候，\n  就想給自己搞一個！',
               "<25>{#f/14}* 所以我和艾菲斯一起\n  做了一把巨劍的複製品。",
               '<25>{#f/12}* 規格完全是她\n  自己算出來的！',
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 這武器似乎有一段\n  傳奇的過往。'
                  : '<32>{#p/basic}* I once saw a saber just like this... except it was real, and a lot smaller.'
            ],
            () => [
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 這武器似乎有一段\n  傳奇的過往。'
                  : '<32>{#p/basic}* I once saw a saber just like this... except it was real, and a lot smaller.'
            ]
         ),
         k_closet: pager.create(
            0,
            () => [
               "<25>{#p/undyne}{#f/1}* 那是我的零食櫃。",
               '<25>{#f/17}* 怎麼，你以為我在後面\n  藏了間臥室什麼的嗎？',
               '<25>{#f/8}* 噗，哈！\n* 大家都知道我睡在\n  又冷又硬的地板上。',
               SAVE.data.b.oops
                  ? "<32>{#p/basic}* 鎖住了。"
                  : '<32>{#p/basic}* I get the feeling there\'s more to this \"closet\" than snacks.'
            ],
            () => [
               SAVE.data.b.oops
                  ? "<32>{#p/basic}* 鎖住了。"
                  : '<32>{#p/basic}* I get the feeling there\'s more to this \"closet\" than snacks.'
            ]
         ),
         k_fridge: pager.create(
            0,
            () => [
               "<25>{#p/undyne}{#f/11}* 我不太喜歡冷食。",
               '<25>{#f/14}* 幸運的是，艾菲斯改造了\n  我的冰箱，現在它\n  可以加熱食物了！',
               '<25>{#f/1}* 很厲害吧？',
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 裡面有幾盤預熱好的\n  義大利麵。'
                  : '<32>{#p/basic}* 在家裡，一臺熱冰箱\n  就能創造奇蹟。'
            ],
            () => [
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 裡面有幾盤預熱好的\n  義大利麵。'
                  : '<32>{#p/basic}* 在家裡，一臺熱冰箱\n  就能創造奇蹟。'
            ]
         ),
         k_otherdrawer: pager.create(
            0,
            () => [
               SAVE.data.b.undyne_respecc
                  ? '<26>{#p/undyne}{#f/12}* Careful with that stuff.'
                  : "<25>{#p/undyne}{#f/17}* 你要是從那抽屜裡偷東西，\n  你就死定了。",
               "<32>{#p/basic}* 這是個裝滿了銀器的抽屜。\n* 裡面有叉子、勺子、刀...",
               '<32>* ...微型宇宙長矛，等離子軍刀，\n  次元戰斧，反重力迴旋鏢...'
            ],
            [
               "<32>{#p/basic}* 這是個裝滿了銀器的抽屜。\n* 裡面有叉子、勺子、刀...",
               '<32>* ...微型宇宙長矛，等離子軍刀，\n  次元戰斧，反重力迴旋鏢...'
            ]
         ),
         k_piano: pager.create(
            0,
            [
               "<25>{#p/undyne}{#f/1}* 那是我的鋼琴。",
               '<25>{#f/16}* 不管你對人類有什麼看法，\n  他們在聲學方面都很有品味！',
               '<32>{#p/basic}* 聞起來... 很科學。'
            ],
            [ '<32>{#p/basic}* 聞起來... 很科學。' ]
         ),
         k_sink: pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 我有一次在去工作前\n  忘了關水槽。',
               '<25>{#f/17}* 當我回到家時，\n  房子完全被水淹了...',
               '<25>{#f/8}* 這對我來說完全\n  不是問題！\n* 呋呼呼！',
               '<32>{#p/basic}* 下水道乾淨得有點嚇人，\n  完全找不到毛髮的痕跡。'
            ],
            [ '<32>{#p/basic}* 下水道乾淨得有點嚇人，\n  完全找不到毛髮的痕跡。' ]
         ),
         k_stove: pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 這個爐子應該是\n  頂級的鎂塔牌產品。',
               '<25>* 但是，雖然技術\n  進步了這麼多...',
               '<25>* 沒什麼能比得上家裡\n  用火魔法煮的東西！',
               '<32>{#p/basic}* 這個爐子的使用率\n  不算高也不算低。'
            ],
            [ '<32>{#p/basic}* 這個爐子的使用率\n  不算高也不算低。' ]
         ),
         k_window: pager.create(
            0,
            () => [
               '<25>{#p/undyne}{#f/16}* 唉。',
               '<25>{#f/14}* 帕派瑞斯比較喜歡\n  走「風景線」。',
               '<32>{#p/basic}* 他飛得太快了，引發了聲爆。'
            ],
            [ '<32>{#p/basic}* 他飛得太快了，引發了聲爆。' ]
         ),
         plankstop: () =>
            SAVE.data.b.svr
               ? [
                    [ '<25>{#p/asriel1}{#f/13}* Seems like a dead end.' ],
                    [ "<25>{#p/asriel1}{#f/15}* We're not just stand here all day, right?" ],
                    [ '<25>{#p/asriel1}{#f/10}* What are we even doing out here.' ],
                    [ '<25>{#p/asriel1}{#f/10}* ...' ]
                 ][Math.min(asrielinter.plankstop++, 3)]
               : world.darker || SAVE.data.n.plot < 42.1
               ? []
               : [ "<32>{#p/basic}* 無盡的宇宙深淵，\n  唯有遠處工廠的邊緣\n  可以映入眼帘。" ],
         wallsign4: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign labels its location.)' ]
               : [ '<32>{#p/basic}* 「向左 - 檢修豎井」\n* 「向右 - 鑄廠出口」' ]
      },
      truetext: {
         doge1: [ '<32>{#p/basic}* ... well, that went better than I expected.' ],
         muffet: [ '<32>{#p/basic}* ... that was too close.' ],
         preundyne: [
            '<32>{#p/basic}* ...',
            "<32>* To doubt you after everything you've done...",
            "<32>* ... no.\n* I know you'll find a way to get through to her.",
            '<32>* You just have to believe in yourself... right?',
            '<32>* ...\n* Go on, step forward.',
            '<32>* Show her the kindness she needs to see.'
         ],
         unddate: () => [
            "<32>{#p/basic}* 所以。\n* 我們前一秒還在逃命...",
            '<32>* 下一秒呢？',
            "<32>* 我們就跟她一起做義大利麵。\n* 然後還把她的房子給燒了。",
            '<32>{#p/human}* （你聽到了小聲嚕嚕笑的聲音。）',
            ...(SAVE.data.n.plot > 64.1
               ? [
                    "<32>{#p/basic}* Jeez.\n* We've come a long way since you first arrived, huh?",
                    "<32>* Even if there's not much left to see now...",
                    "<32>* I still appreciate the time I've spent with you."
                 ]
               : [
                    '<32>{#p/basic}* 喔，呃，抱歉！\n* 我...',
                    "<32>* 我已經有一段時間沒有...\n  這麼開心過了。",
                    '<32>* 只要有你在，\n  事情似乎永遠都不會出錯。'
                 ]),
            "<32>* 所以... 你就這樣繼續\n  保持下去，好嗎？",
            "<32>* 至於我，我會...",
            "<32>* 我會支援你的。"
         ],
         undyne1: [
            '<32>{#p/basic}* We did it.\n* We really did it!',
            '<32>* I mean, uh, you did it.',
            '<32>* Yeah...',
            "<32>* ... at least it'll be nice to finally have her off your back.",
            '<32>* For now, anyway.',
            '<32>* Heh.\n* Well done, partner.',
            "<32>* I don't think anyone's going to replicate THAT stunt again."
         ],
         view1: [
            '<32>{#p/basic}* Look at that...',
            "<32>* ...\n* It's the Citadel.",
            "<32>* It's where this journey's been taking us.",
            '<32>* The silver city, nestled in the twin arches of Aradon...',
            "<32>* ...\n* I'm getting ahead of myself.",
            "<32>* We've still got a ways to go before we get there, so...",
            "<32>* For now, let's just admire the view before us."
         ]
      },
      unddate0: () =>
         world.trueKills > 0 && SAVE.data.n.state_foundry_undyne === 0
            ? [
                 "<18>{#p/papyrus}SO YOU'RE HERE.",
                 "<18>{#f/5}UNDYNE... ISN'T READY TO BEFRIEND YOU RIGHT NOW.",
                 SAVE.data.b.undyne_respecc
                    ? '<18>{#f/5}SHE BLAMES HERSELF FOR TRUSTING YOU...'
                    : '<18>{#f/5}SHE BLAMES HERSELF FOR LETTING YOU GET AWAY...',
                 '<18>{#f/6}AND THAT YOU... DESERVE TO DIE??',
                 '<18>{#f/7}WELL, I DISAGREE!',
                 "<18>{#f/0}BUT THAT'S OKAY.",
                 "<18>{#f/0}I'LL JUST WAIT HERE UNTIL SHE RETURNS."
              ]
            : [
                 '<18>{#p/papyrus}喔嚯，\n人類到啦！',
                 ...(SAVE.data.n.state_foundry_undyne > 0
                    ? [
                         "<18>{#f/4}... THOUGH, I'M NOT QUITE SURE WHERE UNDYNE IS.",
                         "<18>{#f/5}SHE ISN'T NORMALLY OUT THIS LONG...",
                         "<18>{#f/6}AND SHE WON'T EVEN ANSWER THE PHONE!",
                         "<18>{#f/0}WELL, I'LL JUST WAIT HERE UNTIL SHE RETURNS."
                      ]
                    : [
                         '<18>{#f/4}你準備好接受這個...',
                         '<18>{#f/1}和皇家衛隊隊長\n做朋友的艱巨的\n任務了嗎！？！？',
                         choicer.create('* （和安黛因做朋友嗎？）', '是', '否')
                      ])
              ],
      unddate0x: () =>
         world.trueKills > 0 || SAVE.data.n.state_foundry_undyne > 0
            ? [
                 "<18>{#p/papyrus}{#f/0}安黛因現在不在這。",
                 "<18>{#p/papyrus}{#f/4}你得像我經常做的那樣\n在這裡等她。"
              ]
            : [
                 '<18>{#p/papyrus}{#f/0}好！\n準備好消遣了嗎？',
                 choicer.create('* （和安黛因做朋友嗎？）', '是', '否')
              ],
      
      unddate1a: [ '<18>{#p/papyrus}{#f/0}好的！\n站在我身後！' ],
      unddate1b: pager.create(
         0,
         [ '<18>{#p/papyrus}{#f/4}嗯... 還沒準備好嗎？', '<18>{#f/0}沒關係，慢慢來！' ],
         [ '<18>{#p/papyrus}{#f/0}慢慢來！' ]
      ),
      unddate2a: [ '<18>{#p/papyrus}{#f/4}嘶嘶...\n記得給她這個。' ],
      unddate2b: [ '<18>{#f/0}她愛死這些東西了！' ],
      unddate3: [
         '<25>{#p/undyne}{#f/14}* 嗨，帕派瑞斯！',
         '<25>{#f/1}* 準備好你的超機密，\n  一對一訓練了嗎？',
         '<18>{#p/papyrus}當然啦！',
         '<18>{#f/9}我還帶了個\n朋友來！'
      ],
      unddate4: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#p/undyne}{#f/1}* 嗨，初次見...",
                 '<25>{#f/8}* ... OH MY GOD!!!',
                 '<18>{#p/papyrus}{#f/6}...安黛因？',
                 "<25>{#p/undyne}{#f/12}* Pfft, I can't believe you actually brought THEM here.",
                 '<18>{#p/papyrus}{#f/5}...',
                 '<25>{#p/undyne}{#f/1}* Come on, get inside!'
              ]
            : [
                 "<25>{#p/undyne}{#f/1}* 嗨，初次見...",
                 '<25>{#f/4}* ...',
                 '<18>{#p/papyrus}...',
                 '<25>{#p/undyne}{#f/5}* ...',
                 '<18>{#p/papyrus}{#f/5}...',
                 "<25>{#p/undyne}{#f/17}* 你們。\n* 兩個。\n* 進來坐吧？"
              ],
      
      unddate5: [ '<18>{#p/papyrus}給，安黛因。', '<18>我的朋友想\n送給你這個！' ],
      unddate5x: [
         '<25>{#p/undyne}{#f/17}* There you are!',
         "<25>{#f/1}* We've been waiting here FOREVER for you!",
         "<18>{#p/papyrus}{#f/4}AND, DON'T WORRY, I ALREADY SHOWED UNDYNE YOUR GIFT.",
         '<18>{#f/0}SHE LOVED IT!',
         '<25>{#p/undyne}{#f/14}* Yeah, uh...',
         '<25>{#f/12}* I sure did!'
      ],
      unddate6: [ '<25>{#p/undyne}{#f/1}* 呃... 謝了。' ],
      unddate7: [ "<25>{#f/14}* 我會，呃，\n  和別的放一起吧。" ],
      unddate8: [ '<25>* 所以我們準備開始了嗎？' ],
      unddate9: [
         '<18>{#p/papyrus}{#f/1}哎呀哎呀！\n我剛想起來！',
         '<18>{#f/0}我得去看看我兄弟\n怎麼樣了！！',
         '<18>{#f/9}你倆玩開心點！！！'
      ],
      unddate10: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 SAVE.data.b.f_state_undynecheck
                    ? "<26>{#p/undyne}{#f/17}* If it isn't the human who tried to break into my house IN FRONT OF ME."
                    : "<25>{#p/undyne}{#f/1}* Well then.\n* Look who's come crawling back for more.",
                 "<25>{#f/16}* To be honest, though, I dunno if I'm in the mood for another fight.",
                 '<25>{#f/12}* Still, I can get you something to drink in the meantime!',
                 "<25>{#f/1}* Have a seat, and I'll see what I can do."
              ]
            : [
                 '<25>{#p/undyne}{#f/11}* ...',
                 ...(SAVE.data.b.f_state_undynecheck
                    ? [
                         '<25>* So why were YOU so desperate to break into my house earlier?',
                         '<25>* Is this some kind of humilation tactic?',
                         '<25>* To parade into my house and act like you OWN the place?'
                      ]
                    : [
                         '<25>* 所以你來這做什麼？',
                         '<25>* 想用你的勝利打我的臉嗎？',
                         '<25>* 更變本加厲地羞辱我？'
                      ]),
                 '<25>{#f/4}* 是這樣嗎？',
                 choicer.create('* （你要怎麼回答？）', '是', '否')
              ],
      unddate11a: () => [
         '<25>{#p/undyne}{#f/11}* 那你來這裡是？',
         '<25>{#f/1}* 等等，我明白了。',
         "<25>* 你覺得我會和你交朋友，\n  嗯？",
         '<25>{#f/17}* 沒錯吧？？？',
         choicer.create('* （你要怎麼回答？）', '是', '否')
      ],
      unddate11a1a: [
         '<25>{#p/undyne}{#f/14}* 真的嗎？\n* 我好高興啊！\n* 我接受了！',
         "<25>{#f/8}* 讓我們一同在友誼的\n  樂園中盡情嬉戲！",
         '<25>{#f/7}* ...個鬼！',
         "<25>{#f/1}* 你是將所有人的希望\n  與夢想拒之門外的敵人！",
         "<25>* 要不是看在\n  你是我客人的份上，\n  我立馬就把你揍翻了！",
         '<25>{#f/5}* ...'
      ],
      unddate11a1b: [
         '<25>{#p/undyne}{#f/15}* 再者說...',
         '<25>{#f/17}* ...',
         '<25>{#f/4}* 你看什麼看？',
         "<25>{#f/5}* 你覺得我不會為了取悅誰\n  而和你交朋友嗎？？？",
         '<25>{#f/12}* 才不是！',
         '<25>{#f/1}* 事實上，我突然\n  改主意了...',
         '<25>{#f/7}* 因為我燃起了\n  復仇的欲望！'
      ],
      unddate11a2: [
         '<25>{#p/undyne}{#f/13}* ...',
         '<25>{#f/11}* 所以... 讓我把事情\n  搞清楚。',
         '<25>* 首先，\n  你大搖大擺進了我家。',
         "<25>{#f/7}* 你還不給我一個\n  進我家的理由？？",
         "<25>{#f/4}* 你個小毛孩！\n* 你要不是我的客人的話，\n  我就...！",
         '<25>{#f/5}* ...',
         '<25>{#f/4}* ...不，你猜怎麼著？',
         "<25>{#f/7}* 我要證明你是錯的。",
         "<25>{#f/1}* 我們可不光要\n  成為朋友。"
      ],
      unddate11b: [
         '<25>{#p/undyne}{#f/4}* 喔-吼-吼。',
         "<25>{#f/7}* 我告訴你個壞訊息，\n  小毛孩。",
         "<25>{#f/1}* 你現在可是在\n  我這裡的戰場上！",
         "<25>{#f/7}* 你還不是來羞辱我的。",
         "<25>{#f/11}* 好吧。\n* 我來告訴你接下來\n  會發生些什麼。",
         "<25>{#f/17}* 我們來消遣消遣吧。",
         "<25>{#f/17}* 我們會過得很開心的。",
         '<25>{#f/7}* 我們要成為「朋友」。'
      ],
      unddate12a: [
         "<25>{#f/1}* 我要讓你\n  對我無法自拔...",
         "<25>{#f/7}* 完全沒法考慮其他的人！"
      ],
      unddate12b: [ "<25>{#f/8}* 呋呼呼呼！\n* 這就是我完美的復仇！！" ],
      unddate12c: [ "<25>{#f/12}* 呃... 何不先找個\n  地方坐下呢？" ],
      unddate13: () => [
         SAVE.data.b.undyne_respecc
            ? '<25>{#p/undyne}{#f/1}* 需要什麼嗎？'
            : '<25>{#p/undyne}{#f/14}* 需要什麼嗎？',
         choicer.create('* （你要怎麼回答？）', '我餓了', '想看書', '想回家', '沒啥事')
      ],
      unddate13a1: [
         '<25>{#p/undyne}{#f/1}* 你想要點零食什麼的嗎？',
         '<25>{#f/1}* 讓我看看我的柜子裡\n  有什麼。'
      ],
      unddate13a2: [ '<25>{#p/undyne}{#f/1}* 啊... 這應該挺不錯的。' ],
      unddate13a3: [ '<25>{#p/undyne}{#f/14}* 全都是你的...\n* 呋呼呼。' ],
      unddate13a4a: [ "<32>{#p/human}* （你帶的東西太多了。）" ],
      unddate13a4b: [ '<32>{#p/human}* (You got the Odd Snack.)' ],
      unddate13a5: () =>
         SAVE.data.b.drop_snack
            ? [
                 "<25>{#p/undyne}{#f/17}* 我知道扔吃的很好玩，\n  但我不能白白浪費吧。",
                 '<25>{#p/undyne}{#f/12}* 抱歉。'
              ]
            : SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#p/undyne}{#f/17}* Just because you're my friend doesn't mean you can have two snacks!",
                 '<25>{#p/undyne}{#f/1}* Maybe some other time.'
              ]
            : [
                 "<25>{#p/undyne}{#f/11}* 聽著，混球，\n  每人只有一份零食。",
                 '<25>* 你得學會入鄉隨俗。'
              ],
      unddate13b: pager.create(
         0,
         () => [
            '<25>{#p/undyne}{#f/13}* 你要看書？？？\n* 這裡看起來\n  像是圖書倌嗎？',
            "<25>{#f/1}* 你在廚房裡\n  唯一能找到的書\n  就是烹飪指南！",
            "<25>{#f/4}* 我從來不用，\n  因為烹飪應該是門藝術。",
            '<25>{#f/7}* 而不是被條條框框\n  束縛的過程。',
            '<25>{#f/5}* 為什麼就是沒有人\n  能理解呢？？？',
            SAVE.data.b.undyne_respecc
               ? '<25>{#f/1}* ...如果你還需要什麼，\n  就告訴我吧。'
               : '<25>{#f/14}* 好吧，\n  如果你還需要什麼的話，\n  就告訴我吧！'
         ],
         [
            "<25>{#p/undyne}{#f/1}* 你聽好，\n  星港有一家圖書倌。",
            "<25>{#f/1}* 如果你真的想看書，\n  你去那裡最合適。",
            '<25>{#f/7}* 但你現在沒法去！！！',
            '<25>{#f/14}* ...如果你還需要什麼，\n  就告訴我吧。'
         ]
      ),
      unddate13c: pager.create(
         0,
         () => [
            '<25>{#p/undyne}{#f/3}* ...',
            '<25>{#f/17}* 這裡就是家。',
            "<25>{#f/17}* 你已經在這裡了。",
            '<25>{#f/16}* 除非你指的是\n  你的母星...',
            '<25>{#f/9}* ...',
            '<25>{#f/19}* 但這任誰都沒辦法\n  做到。',
            SAVE.data.b.undyne_respecc
               ? "<25>{#f/1}* ...如果你還需要什麼，\n  就告訴我吧。"
               : '<25>{#f/14}* 好吧，\n  如果你還需要什麼的話，\n  就告訴我吧！'
         ],
         () => [
            "<25>{#p/undyne}{#f/16}* 我要是可以的話，\n  我可以給你描述一下\n  那個地方。",
            '<25>{#f/16}* 但我是在前哨站出生的...',
            '<25>{#f/9}* 我們對這個世界的記憶\n  似乎每天都在逐漸淡去。',
            SAVE.data.b.undyne_respecc
               ? '<25>{#f/1}* ...如果你還需要什麼，\n  就告訴我吧。'
               : '<25>{#f/12}* ...如果你還需要什麼，\n  就告訴我吧。'
         ]
      ),
      unddate13d: () => [
         SAVE.data.b.undyne_respecc
            ? "<25>{#p/undyne}{#f/1}* 好吧，沒事。\n* 記住，如果你改變主意，\n  隨時來找我！"
            : "<25>{#p/undyne}{#f/14}* 好吧，沒事。\n* 記住，如果你改變主意，\n  隨時來找我！"
      ],
      unddate14: () => [ choicer.create('* （要坐下嗎？）', '是', '否') ],
      unddate15a: () => [
         '<25>{#p/undyne}{#f/14}* 坐得舒服嗎？',
         SAVE.data.b.undyne_respecc
            ? "<25>{#f/1}* 我去拿些喝的給你。"
            : "<25>{#f/14}* 我去拿些喝的給你。"
      ],
      unddate15b: () => [
         '<25>{#p/undyne}{#f/14}* 坐得舒服嗎？',
         SAVE.data.b.undyne_respecc
            ? "<25>{#f/1}* I'll get you something to..."
            : "<25>{#f/14}* I'll get you something to...",
         '<25>{#f/17}* ...',
         '<25>{#f/17}* What are you still doing with a cup of dampening fluid?',
         '<25>{#f/17}* Throw that thing away!'
      ],
      unddate15c: () => [
         '<32>{#p/human}* (You discarded the electro- dampening fluid.)',
         SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* Thanks.' : '<25>{#p/undyne}{#f/14}* Much appreciated.'
      ],
      unddate16: () => [
         SAVE.data.b.undyne_respecc
            ? '<25>{#p/undyne}{#f/1}* 準備完成！\n* 你來挑吧！'
            : '<25>{#p/undyne}{#f/14}* 準備完成！\n* 你想喝哪個？'
      ],
      unddate17: () => [
         "<25>{#p/undyne}{#f/17}* 喂！\n* 別站起來！",
         ...(SAVE.data.b.undyne_respecc
            ? [ '<25>{#f/10}* ...', '<25>{#f/16}* Sorry, reflex.\n* I seriously gotta stop doing that...' ]
            : [ "<25>{#f/17}* 你是客人！\n* 給我坐下來慢慢享用！", '<25>{#f/17}* ...' ])
      ],
      unddate18: () =>
         SAVE.data.b.undyne_respecc
            ? [ '<25>{#p/undyne}{#f/1}* 嗯，你需要什麼\n  指出來不就好了？', '<25>{#f/16}* 你可以用這根矛！' ]
            : [
                 '<25>{#p/undyne}{#f/12}* 嗯，你需要什麼\n  指出來不就好了？',
                 '<25>{#f/12}* 你可以用這根矛！'
              ],
      unddate19x: '* 按←和→瞄準。\n* 按[Z]選定。',
      unddate19y: () => [
         SAVE.data.b.undyne_respecc ? '* Undyne\n* Awesome fish lady.' : '* 安黛因\n* 瘋狂的魚女士。',
         '* 零食櫃\n* 裡面有超多好東西！',
         '* 水\n* 聰明的選擇',
         '* 糖\n* 適合放在茶裡。',
         '* 洋梅果酒\n* 自家做的... 她是這麼說的。',
         "* 熱巧克力\n* 藍色圓罐。",
         '* 茶\n* 毫無疑問是正確選項？',
         '* 冰箱\n* 對於一頓飯來說太多了。',
         '* 能量劍\n* 傳說中的人類武器。'
      ],
      unddate20: [
         pager.create(0, [ '<25>{#p/undyne}{#f/13}* 你是在...\n* 指我嗎？？？' ], [ '<25>{#p/undyne}{#f/13}* ？？？？？' ]),
         pager.create(
            0,
            [
               "<25>{#p/undyne}{#f/17}* 你應該選一個\n  喝的東西？？",
               "<25>{#f/1}* 那個柜子裡只有零食。"
            ],
            [ "<25>{#p/undyne}{#f/1}* 真的，那個柜子裡\n  只有零食。\n* 沒有別的東西了！" ],
            [ '<25>{#p/undyne}{#f/1}* 真的！' ]
         ),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/13}* 你想要水？',
               '<25>{#f/11}* 就是... 水。',
               '<25>{#f/11}* 沒什麼味道，\n  也沒加糖什麼的。',
               '<25>{#f/11}* ...'
            ],
            [ '<25>{#p/undyne}{#f/11}* ...' ]
         ),
         pager.create(
            0,
            [
               "<25>{#p/undyne}{#f/12}* 那個糖是用來\n  加在茶裡的。",
               "<25>{#f/7}* 我沒法給你盛一杯糖！"
            ],
            () =>
               SAVE.data.b.undyne_respecc
                  ? [ '<25>{#p/undyne}{#f/1}* 糖不可以，甜心。' ]
                  : [ "<25>{#p/undyne}{#f/14}* 糖是加在茶裡的，\n  好嗎？" ]
         ),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 啊... 洋梅果酒。',
               "<25>{#f/14}* 我想，帕派瑞斯喜歡這東西，\n  所以沒什麼問題。"
            ],
            [ '<25>{#p/undyne}{#f/17}* 你到底選不選這個？' ]
         ),
         pager.create(
            0,
            [ '<25>{#p/undyne}{#f/14}* 沒什麼能比一杯\n  熱巧克力更棒了。' ],
            [ '<25>{#p/undyne}{#f/17}* 熱巧克力，是吧？' ]
         ),
         pager.create(0, [ '<25>{#p/undyne}{#f/14}* 茶，是吧？' ], [ "<25>{#p/undyne}{#f/12}* 所以選茶，是嗎？" ]),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/4}* 冰箱！？\n* 你想要一整臺冰箱！？',
               '<25>{#p/undyne}{#f/17}* 不行！'
            ],
            [ '<25>{#p/undyne}{#f/17}* 我說了不行！' ],
            [ '<25>{#p/undyne}{#f/17}* 不行就是不行！' ],
            [ '<25>{#p/undyne}{#f/17}* 你知道「不行」是\n  什麼意思嗎？' ],
            [ '<25>{#p/undyne}{#f/17}* ...就是不行！' ],
            [ '<25>{#p/undyne}{#f/17}* ...' ]
         ),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 那把能量劍...',
               "<25>{#p/undyne}{#f/12}* 那是人類在戰爭中\n  用來對付我們的武器。",
               '<25>{#p/undyne}{#f/16}* ...算是，其中一把吧。'
            ],
            [ "<25>{#p/undyne}{#f/17}* 那東西不能給你。" ]
         )
      ],
      unddate21: () => [ choicer.create('* （要選這個喝嗎？）', '是', '否') ],
      unddate22: [
         [ '<25>{#p/undyne}{#f/16}* 也... 行吧。' ],
         [ "<25>{#p/undyne}{#f/1}* 來喝點果酒，補充水分吧！" ],
         [ '<25>{#p/undyne}{#f/14}* 開始無與倫比的\n  熱可可時間吧！' ],
         [ '<25>{#p/undyne}{#f/14}* 馬上給你上茶。' ]
      ],
      unddate22x: [ "<25>{#p/undyne}{#f/12}* 還需要等一段時間\n  水才能沸騰。" ],
      unddate22y: () => [
         SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* There.' : '<25>{#p/undyne}{#f/12}* 好了！'
      ],
      unddate23: [ '<25>{#p/undyne}{#f/1}* 喝吧。' ],
      unddate24: [
         [ '<25>{#p/undyne}{#f/12}* 好喝嗎...？' ],
         [ "<25>{#p/undyne}{#f/12}* 慢點喝，有點酸。" ],
         [ "<25>{#p/undyne}{#f/14}* 小心點，有點燙。" ],
         [ "<25>{#p/undyne}{#f/14}* 小心點，有點燙。" ]
      ],
      unddate25: [
         () => [
            '<25>{#p/undyne}{#f/17}* 不至於！\n* 快點喝啊！',
            '<32>{#p/human}{#s/heal}* （你喝了一口水。）',
            "<32>{#p/basic}* 它，呃...\n  嗯對，就是水。\n* 所以嘗起來還好。",
            SAVE.data.b.undyne_respecc
               ? "<25>{#p/undyne}{#f/1}* 哈。\n* 至少你很開心。"
               : "<25>{#p/undyne}{#f/12}* 呀，你看起來很滿足。"
         ],
         [
            "<25>{#p/undyne}{#f/17}* 你在等什麼？\n* 快點喝啊！",
            '<32>{#p/human}{#s/heal}* （你抿了一口果酒。）',
            "<32>{#p/basic}* 實在太酸了，\n  你的嘴唇都皺起來了..."
         ],
         [
            "<25>{#p/undyne}{#f/17}* 也沒有那麼燙！！\n* 快點喝啊！",
            '<32>{#p/human}{#s/heal}* （你喝了一口熱巧克力。）',
            "<32>{#p/basic}* 燙得像火燒..."
         ],
         [
            "<25>{#p/undyne}{#f/17}* 也沒有那麼燙！！\n* 快點喝啊！",
            '<32>{#p/human}{#s/heal}* （你喝了一口茶。）',
            "<32>{#p/basic}* 燙得像火燒..."
         ]
      ],
      unddate25x: () => [
         "<32>* 不過除去這點，\n  還挺好喝的。",
         ...(SAVE.data.b.undyne_respecc
            ? [ "<25>{#p/undyne}{#f/1}* 哈。\n* 你喜歡就好。" ]
            : [
                 "<25>{#p/undyne}{#f/12}* 味道不錯吧？",
                 '<25>{#f/8}* 我只會把最好的\n  給我絕對珍惜的朋友！'
              ])
      ],
      unddate27: [
         [
            "<25>{#p/undyne}{#f/12}* 你知道嗎，\n  你會選那個當喝的\n  還挺有意思的。",
            '<25>{#f/12}* 我是說，水。',
            '<25>{#f/1}* 我跟艾斯戈爾有一次\n  開玩笑說人類是\n  由水組成的...',
            "<25>{#f/8}* 所以如果我們喝水，\n  就是在消化人類！！！",
            "<25>{#f/16}* ...好吧，他其實\n  沒找到笑點在哪。",
            "<25>{#f/16}* 這傢伙幾乎對所有人\n  都有好感..."
         ],
         [
            "<25>{#p/undyne}{#f/12}* 你知道嗎，\n  你會選那個當喝的\n  還挺不錯的。",
            '<25>{#f/12}* 洋梅果酒...',
            '<25>{#f/1}* 那是艾菲斯和帕派瑞斯\n  一起「發明」出來的。',
            "<25>{#f/16}* 我雖然不太喜歡，\n  但是當我把這個拿給\n  艾斯戈爾的時候...",
            "<25>{#f/12}* 這麼說吧，\n  他把它投入了批量生產。"
         ],
         [
            "<25>{#p/undyne}{#f/12}* 你知道嗎，\n  你會選那個當喝的\n  還挺酷的。",
            '<25>{#f/12}* 熱巧克力...',
            '<25>{#f/16}* 有一次，\n  在核心發生故障之後...',
            '<25>{#f/16}* 他們不得不重啟\n  整個大氣系統。',
            '<25>{#f/10}* 沒法取暖，空氣稀薄...\n  逐漸變得越來越冷...',
            '<25>{#f/1}* 然後，艾斯戈爾趕了過來\n  遞給我一杯熱巧克力。',
            '<25>{#f/12}* 我們就一起坐在\n  這個房間裡...'
         ],
         [
            "<25>{#p/undyne}{#f/12}* 你知道嗎，\n  你會選那個當喝的\n  可真是奇怪...",
            '<25>{#f/12}* 星花茶...',
            "<25>{#f/1}* 那一直都是艾斯戈爾\n  最喜歡的。"
         ]
      ],
      unddate28: () => [
         '<25>{#p/undyne}{#f/14}* 實際上，\n  現在我開始覺得...',
         '<25>{#f/12}* 你讓我想起他了。',
         ...(SAVE.data.b.undyne_respecc
            ? [
                 '<25>{#f/17}* I mean, your fighting styles are TOTALLY different, but...',
                 "<25>{#f/1}* You're the only two people who've actually managed to beat me!",
                 '<25>{#f/9}* ... in a sense.'
              ]
            : [ "<25>{#f/8}* 你倆都是軟蛋！", '<25>{#f/9}* ...某種意義上啦。' ])
      ],
      unddate29: [
         '<25>{#p/undyne}{#f/16}* 知道嗎，我以前\n  是個非常衝動的孩子。',
         '<25>* 有一次，我為了\n  證明自己是最強的，\n  就去嘗試和艾斯戈爾戰鬥。',
         '<25>{#f/17}* 重點是嘗試二字。',
         '<25>{#f/1}* 我壓根連一下\n  都打不中他！',
         '<25>* 更糟的是，從頭到尾，\n  他都不肯還手！',
         '<25>{#f/9}* 我被羞辱得無地自容...',
         '<25>{#f/16}* 之後，他道了歉，\n  還說了些傻話...',
         '<25>* 「抱歉，你想知道\n   打敗我的方法嗎？」',
         '<25>{#f/1}* 我說了「想」，從那以後，\n  他就開始訓練我。',
         '<25>{#f/16}* 有一天，在練習時，\n  我終於打倒了他。',
         '<25>{#f/9}* 我覺得... 非常糟糕。',
         '<25>{#f/12}* 他卻很高興...',
         '<25>{#f/1}* 我從沒見過哪個人\n  因為被扁了而感到榮幸。',
         '<25>* 總之，長話短說，\n  他一直訓練著我...',
         '<25>{#f/14}* 然後我現在是皇家守衛的\n  首領了！',
         "<25>{#f/8}* 所以我成了那個訓練\n  傻瓜們戰鬥的人了！",
         '<25>{#f/1}* ...比如，呃，帕派瑞斯。'
      ],
      unddate30: [
         '<25>{#f/16}* 但是，嗯，說實話...',
         "<25>{#f/16}* ...我自己也不知道...",
         '<25>{#f/9}* 到底能不能讓\n  帕派瑞斯加入皇家守衛。',
         "<25>{#f/17}* 別跟他說這些話！",
         "<25>{#f/10}* 他只是...\n* 好吧...",
         "<25>{#f/9}* 我是指，他並不笨。",
         '<25>{#f/17}* 他的攻擊設計\n  真的相當瘋狂！',
         "<25>{#f/10}* 只不過...\n* 他...",
         "<25>{#f/17}* 他太天真善良了！！！",
         '<25>{#f/16}* 我是說，你看，\n  他本應該去抓你的...',
         '<25>{#f/11}* 結果他最後竟然\n  和你成為朋友了。',
         '<25>{#f/4}* 我永遠沒辦法\n  把他派去戰鬥！',
         "<25>{#f/9}* 他會被撕成\n  微笑著的碎片的。",
         "<25>{#f/12}* 這也是我為什麼...",
         '<25>{#f/12}* 教他烹飪的原因之一，\n  你明白嗎？',
         '<25>{#f/9}* 所以，嗯，或許他\n  這輩子可以幹點別的。'
      ],
      unddate31: () => [
         SAVE.data.b.undyne_respecc
            ? '<25>{#p/undyne}{#f/1}* 喔，抱歉，我講太多了...'
            : '<25>{#p/undyne}{#f/12}* 喔，抱歉，我講太多了...'
      ],
      unddate32: [
         [ "<25>{#f/12}* 你的水喝完了，是吧？" ],
         [ "<25>{#f/12}* 你的果酒喝完了，是吧？" ],
         [ "<25>{#f/12}* 你的熱巧克力喝完了，\n  是吧？" ],
         [ "<25>{#f/12}* 你的茶喝完了，是吧？" ]
      ],
      unddate33: () => [
         SAVE.data.b.undyne_respecc
            ? "<25>{#p/undyne}{#f/1}* 哈，沒事的。\n* 我再給你倒些。"
            : "<25>{#p/undyne}{#f/12}* 哈，沒事的。\n* 我再給你倒些。"
      ],
      unddate34: [ '<25>{#p/undyne}{#f/17}* 等一下...', '<25>{#f/17}* 帕派瑞斯...\n* 他的烹飪課...' ],
      unddate35: [
         '<25>{#p/undyne}{#f/17}* 他現在本該在\n  上課的！！！',
         "<25>{#f/11}* 如果他沒來\n  上課的話...",
         "<25>{#f/7}* 那只能用你來\n  代替他了！"
      ],
      unddate36: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#f/1}* 沒錯！",
                 '<25>{#f/1}* 除了烹飪之外，\n  沒什麼能讓我和\n  帕派瑞斯更親近了！',
                 '<25>{#f/17}* Heheh, if you thought we were friends before...',
                 '<25>{#f/8}* JUST WAIT UNTIL YOU SEE US AFTER THIS!'
              ]
            : [
                 "<25>{#f/1}* 沒錯！",
                 '<25>{#f/1}* 除了烹飪之外，\n  沒什麼能讓我和\n  帕派瑞斯更親近了！',
                 '<25>{#f/17}* 也就是說，如果我\n  給你上同樣的課...',
                 "<25>{#f/8}* 我們就會變得親近到\n  超乎你的想像！"
              ],
      unddate37: [ "<25>{#f/1}* 首先，\n  我們從醬開始！！" ],
      unddate38: () => [
         '<25>{#f/1}* 將這些蔬菜想像成\n  你的死對頭！',
         '<25>{#f/7}* 現在，用你的拳頭\n  將他們轟殺至渣！！',
         choicer.create('* （你要怎麼做？）', '輕輕撫摸', '用力重擊')
      ],
      unddate39a: () => [
         '<32>{#p/human}* （你親切地撫摸著蔬菜。）',
         SAVE.data.b.undyne_respecc
            ? "<99>{#p/undyne}{#f/17}* 我的天啊！！！\n* 現在我【可算】知道了\n  你就是在耍我！！！"
            : '<25>{#p/undyne}{#f/17}* 我的天啊！！！\n* 不要撫摸敵人了！！！',
         "<25>{#x1}{#f/7}* 我來給你演示一下\n  該怎麼做！",
         '<25>{#f/4}* 嘎啊啊！'
      ],
      unddate39b: () =>
         world.meanie
            ? [ '<32>{#p/human}* （你全力用拳頭砸向蔬菜。）' ]
            : [
                 '<32>{#p/human}* （你全力用拳頭砸向蔬菜。）\n* （你打倒了一顆番茄。）',
                 '<25>{#p/undyne}{#f/1}* 耶！\n* 耶！',
                 '<25>{#f/1}* 我們齊心協力與這些\n  健康食材們奮戰到底！',
                 "<25>{#x1}{#f/7}* 現在輪到我了！",
                 '<25>{#f/4}* 嘎啊啊！'
              ],
      unddate40: (res: number) => [
         ...(world.meanie && res === 1
            ? [
                 SAVE.data.b.undyne_respecc
                    ? "<25>{#p/undyne}{#f/2}* 沒錯！！！\n* 這就是我認識的戰士！！"
                    : '<25>{#p/undyne}{#f/6}* 今天可真是歡騰啊，\n  是吧？',
                 "<25>{#f/6}* 哈，我們過會再把這堆\n  弄到個碗裡去。"
              ]
            : [ "<25>{#p/undyne}{#f/6}* 呃，我們過會再把這堆\n  弄到個碗裡去。" ]),
         '<25>{#f/2}* 但是現在！'
      ],
      unddate41: [
         '<25>{#p/undyne}{#f/1}* 我們把麵條加進去！',
         '<25>{#f/1}* 自家制的麵條最棒了，\n  所以我總是備一些。'
      ],
      unddate41x: [ '<25>{#p/undyne}{#f/12}* 呃，小子，\n  你現在可以過來了。' ],
      unddate41y: () => [
         '<25>{#p/undyne}{#f/1}* 無論如何，\n  你看到這裡的麵條了吧？',
         '<25>{#f/1}* 那麼...',
         "<25>{#f/17}* 把它們丟進去！",
         choicer.create('* （你想怎麼放進去？）', '小心地', '猛烈地')
      ],
      unddate42a: [
         '<32>{#p/human}* （你將麵條一根一根地\n  放進鍋裡。）',
         '<32>* 它們與鍋底相碰，\n  叮叮作響。',
         '<25>{#p/undyne}{#f/17}* 感覺，挺好？？？',
         "<25>{#f/1}* 那麼，接下來就是\n  攪拌意面的時間了！"
      ],
      unddate42b: [
         '<32>{#p/human}* （你把所有東西都丟進鍋裡，\n  包括包裝盒。）',
         '<32>* 包裝盒和麵條咣地一聲\n  撞到鍋底。',
         "<25>{#p/undyne}{#f/17}* 耶！！！\n* 我進入狀態了！！",
         "<25>{#f/1}* 好了！\n* 現在就是攪拌\n  意面的時間！"
      ],
      unddate43: [
         '<25>{#p/undyne}{#f/1}* 經驗表明...',
         '<25>{#f/17}* 攪得越多，它就越好吃！'
      ],
      unddate44: [ '<25>{#p/undyne}{#f/17}* 準備好了嗎？', "<25>{#f/1}* 來攪拌吧！" ],
      unddate45: '* 連續按[Z]來攪拌！',
      unddate46: [ '<25>{*}{#p/undyne}{#f/17}* 用力攪！{^20}{%}' ],
      unddate46x: [ "<25>{*}{#p/undyne}{#f/17}* 別光站著！{^20}{%}" ],
      unddate47: [ '<25>{*}{#p/undyne}{#f/7}* 再用力一點！{^20}{%}' ],
      unddate47x: [ '<25>{*}{#p/undyne}{#f/7}* 該死的！攪啊！{^20}{%}' ],
      unddate48: [ '<25>{*}{#p/undyne}{#f/8}* 再用力！！！{^20}{%}' ],
      unddate48x: [ '<25>{*}{#p/undyne}{#f/8}* 攪啊！！！{^20}{%}' ],
      unddate49: [ '<25>{*}{#p/undyne}{#f/8}* 呃，放著我來-{^10}{%}' ],
      unddate50: [ "<25>{#p/undyne}{#f/8}* 呋呼呼呼！\n* 就該這樣！" ],
      unddate51: [
         '<25>{#p/undyne}{#f/1}* 好了，\n  現在就剩最後一步...',
         '<25>{#f/17}* 開大火！',
         '<25>{#f/1}* 爐子象徵著\n  你的熱情！',
         '<25>{#f/1}* 將你的希望與夢想\n  化為烈焰！',
         "<25>{#f/8}* 當然，\n  要不遺餘力！！！"
      ],
      unddate52: [ '<25>{#p/undyne}{#f/17}* 準備好了嗎？', '<25>{#f/1}* 開始吧！' ],
      unddate53: '* 按住[→]開大火！',
      unddate53x: [ '<25>{*}{#p/undyne}{#f/8}* 你個蠢蛋！\n* 這個爐子只能\n  往一邊開火！！！{^20}{%}' ],
      unddate54: [ '<25>{*}{#p/undyne}{#f/17}* 再熱一些！{^20}{%}' ],
      unddate54x: [ '<25>{*}{#p/undyne}{#f/17}* 你在幹什麼？{^20}{%}' ],
      unddate55: [ '<25>{*}{#p/undyne}{#f/7}* 再熱些！{^20}{%}' ],
      unddate55x: [ '<25>{*}{#p/undyne}{#f/7}* 別再猶豫了！{^20}{%}' ],
      unddate56: [ '<25>{*}{#p/undyne}{#f/8}* 再熱些！！！{^20}{%}' ],
      unddate56x: [ '<25>{*}{#p/undyne}{#f/8}* 做就好了！！！{^20}{%}' ],
      unddate57a: [ '<25>{*}{#p/undyne}{#f/17}* 呃，讓我來吧...{^10}{%}' ],
      unddate57b: [ '<25>{*}{#p/undyne}{#f/17}* 看到了嗎，你就該-{^20}{%}' ],
      unddate58: [ "<25>{*}{#p/undyne}{#f/17}* 不，等下，有點太-{^10}{%}" ],
      unddate59: [ '<25>{#p/undyne}{#f/14}* 啊。' ],
      unddate60: [ "<25>{#p/undyne}{#f/14}* 啊，難怪帕派瑞斯\n  廚藝再也沒有進步了。" ],
      unddate61: [ "<25>{#p/undyne}{#f/12}* 然後做些什麼？\n* 去淘些垃圾？\n* 還是綁個腕帶？" ],
      unddate62: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 '<25>{#p/undyne}{#f/10}* ...',
                 '<25>{#f/9}* ...我在開什麼玩笑...',
                 "<25>{#f/16}* 我真的把事情弄失控了，\n  是吧...？",
                 '<25>{#f/16}* 呵...'
              ]
            : [
                 '<25>{#p/undyne}{#f/10}* ...',
                 '<25>{#f/9}* ...我在開什麼玩笑...',
                 "<25>{#f/16}* 我真的搞砸了，\n  是吧...？",
                 '<25>{#f/16}* 呵...'
              ],
      unddate63: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#f/16}* 你知道嗎？",
                 "<25>{#f/9}* 我還沒打算就\n  這樣放棄呢。",
                 '<25>{#f/1}* 所以我放棄教你烹飪了。\n* 就這樣。',
                 "<25>{#f/14}* 我們還是有辦法\n  挽救這個爛攤子的。",
                 '<26>{#f/1}* 辦法就是...'
              ]
            : [
                 "<25>{#f/16}* 我沒辦法強迫你喜歡我，\n  人類。",
                 "<25>{#f/9}* 有些人彼此就是\n  沒辦法相處。",
                 "<25>{#f/16}* 如果你這麼覺得，\n  我能理解...",
                 "<25>{#f/9}* 如果我們做不了朋友...\n  也沒關係。",
                 "<25>{#f/9}* 因為...\n* 如果我們不是朋友..."
              ],
      unddate64: () =>
         SAVE.data.b.undyne_respecc
            ? [ "<25>{#p/undyne}{#f/17}* 來一場向銀河系證明\n  我們實力的最後一戰！！" ]
            : [ '<25>{#p/undyne}{#f/17}* 這就意味著我能\n  毫不猶豫地幹掉你！' ],
      unddate65: () => [
         '<25>{#p/undyne}{#f/12}* 好吧，還挺好玩的，\n  是吧？',
         SAVE.data.b.undyne_respecc
            ? "<25>{#f/8}* 我們下次再\n  找時間鬥一場！"
            : "<25>{#f/8}* 我們下次再約出去玩！",
         '<25>{#f/9}* 但是，呃，\n  我覺得該換個地方。',
         ...(world.postnoot
            ? [
                 '<25>{#f/1}* By the way, have you noticed something weird in the air?',
                 ...(world.nootflags.has('papyrus') // NO-TRANSLATE

                    ? [ '<25>{#f/13}* Even Papyrus mentioned it earlier...' ]
                    : [ '<25>{#f/13}* It seems like it just started recently...' ]),
                 "<25>{#f/16}* ... maybe it's nothing, but I swear I feel weaker than usual."
              ]
            : []),
         ...(SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
            ? [
                 "<25>{#f/1}* 與此同時，我會和帕派瑞斯\n  一起去休閒迴廊。",
                 '<25>{#f/12}* 期待能在那見到你！',
                 '<25>{#f/1}* 到那時候，\n  你可以給帕派瑞斯打電話。',
                 "<25>{#f/8}* 因為我倆在一起，\n  這樣我也能和你說話！"
              ]
            : [
                 "<25>{#f/1}* 與此同時，\n  我會去休閒迴廊。",
                 '<25>{#f/12}* 期待能在那見到你！',
                 '<25>{#f/1}* 喔，對了，\n  帕派瑞斯說他必須得\n  辦個什麼事情去。',
                 "<25>{#f/14}* 只是想告訴你一聲，\n  因為他現在不方便接電話。"
              ])
      ],
      unddate66: () =>
         SAVE.data.b.undyne_respecc
            ? [ '<25>{#f/1}* 好啦，回見，朋友！！' ]
            : [ '<25>{#f/14}* 好啦，回見，混球！！' ],
      undroom1: () => [ '<25>{#p/undyne}{#f/17}* Huh?\n* The heck was THAT?' ],
      undroom2: () => [
         SAVE.data.b.undyne_respecc
            ? "<25>{#p/undyne}{#f/1}* Maybe don't do that right now."
            : "<25>{#p/undyne}{#f/12}* We're trying to be friends here."
      ],
      undroom3: () => [
         SAVE.data.b.undyne_respecc
            ? "<25>{#p/undyne}{#f/11}* This is some kind of weird battle tactic, isn't it?"
            : "<25>{#p/undyne}{#f/11}* So that's your way of making friends?"
      ],
      undroom4: () => [ '<25>{#p/undyne}{#f/17}* Stop doing that!' ],
      undroom5: () => [ '<25>{#p/undyne}{#f/17}* ...' ],
      undyne1a: [
         "<23>{#p/papyrus}{#f/30}嗨... 嗨，安黛因！\n我是來做我的每日報告的...",
         '<23>呃... 關於我之前跟你\n說過的那個人類...'
      ],
      undyne1b: [ '<23>{#p/papyrus}{#f/30}...嗯？\n我有沒有跟人類戰鬥？' ],
      undyne1c: () =>
         
         world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

            ? [ '<23>{#p/papyrusnt}UH...', "<23>I-IT'S COMPLICATED!" ]
            : [ '<23>{#p/papyrusnt}當-當然了！\n我當然跟人類戰鬥了！', '<23>我英勇地和那個人類\n戰鬥過了！' ],
      undyne1d: [ '<23>{#p/papyrus}{#f/30}...什麼？\n我有沒有把人類抓住...？' ],
      undyne1e: [ '<23>{#p/papyrus}{#f/30}這-這-這個...', '<23>沒有...' ],
      undyne1f: () =>
         world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

            ? [ "<23>{#p/papyrus}{#f/30}L-LIKE I SAID, IT'S COMPLICATED!" ]
            : [ '<23>{#p/papyrus}{#f/30}我-我是說，\n我真的很努力了，\n但-但是，最終...' ],
      undyne1g: () => [
         '<23>{#p/papyrus}{#f/30}...什-什麼？',
         ...(SAVE.data.n.state_foundry_doge === 1
            ? [ "<23>THEY'VE ALREADY KILLED AN ELITE SQUAD MEMBER??", "<23>N-NO... THEY WOULDN'T DO THAT, WOULD THEY?" ]
            : [ "<23>你要親自去取走那個\n人類的靈魂？？" ])
      ],
      undyne1h: () =>
         SAVE.data.n.state_foundry_doge === 1
            ? [ '<23>{#p/papyrus}{#f/30}SURELY THERE MUST BE ANOTHER WAY!', '<23>SURELY...' ]
            : [ "<23>{#p/papyrus}{#f/30}但是安黛因，你不-\n不一定要把人類殺掉的！\n你看...", '<23>你看...' ],
      undyne1i: () => [
         '<23>{#p/papyrus}{#f/30}我...',
         '<23>...我明白了。',
         "<23>我會盡力幫你的。",
         ...(world.postnoot
            ? [
                 '<23>BY THE WAY... YOU NEED TO DOUBLE-CHECK THE ATMOSPHERIC SYSTEM.',
                 '<23>WHAT WAS IT CALLED?\nTHE WIDE-AREA TROPE-A- SPHERE FRAMEWORK?',
                 '<23>SOMETHING SEEMS... OFF.'
              ]
            : [])
      ],
      undyne1j: [ '<25>{#p/kidd}{#f/1}* 喲！\n* 她就在那裡！' ],
      undyne1k: [ "<25>{#p/kidd}{#f/7}* 等等... 你是個人類，\n  對吧？" ],
      undyne1l: [ '<25>{*}{#p/kidd}{#f/7}* 快跑啊啊啊啊啊！{^20}{%}' ],
      undyne1m: [ '<25>{#p/kidd}{#f/2}* 呼...' ],
      undyne1n: [ '<25>{#p/kidd}{#f/1}* 呃，你可以從平臺上\n  下來了。' ],
      undyne1o: [ "<25>{#p/kidd}{#f/4}* 她去哪了...？" ],
      undyne1p: [ '<25>{#p/kidd}{#f/7}* 啊！{^10}{%}' ],
      undyne1q: [ '<25>{#p/kidd}{#f/2}* 噓...\n  我感覺我們可以偷偷溜過去。\n* 快跟上我！' ],
      undyne1r: [ "<25>{#p/kidd}{#f/4}* 這裡烏黑一片...", '<25>{#p/kidd}{#f/7}* ...但是我們得保持\n  前進！' ],
      undyne1s: [ '<25>{#p/kidd}{#f/7}* 有一叢植物，\n  快躲進去！' ],
      undyne2a: [
         '<25>{#p/kidd}{#f/7}* 她... 她...',
         '<25>{#f/7}* 她摸到我了！！',
         "<25>{#f/4}* ...\n* 我們應該都算走運，\n  你說是吧？",
         "<25>{#f/5}* 如果她看見你，\n  那就大事不妙了。"
      ],
      undyne2ax: () => [
         '<25>{#p/kidd}{#f/1}* 她... 她...',
         "<25>{#f/1}* 哪兒都找不到她！！",
         '<25>{#f/3}* 你倆看到她了沒有？',
         '<25>{#p/asriel2}{#f/3}* 誰呀，安黛因嗎？',
         "<25>{#p/kidd}{#f/1}* 對呀！\n* 我找她找了好久！",
         '<25>{#p/asriel2}{#f/2}* （嘻嘻嘻...）',
         '<25>{#p/kidd}{#f/4}* 嗯？？',
         '<25>{#p/asriel2}{#f/4}* 沒事。',
         '<25>{#f/13}* 話說，想跟我們一塊走嗎？',
         '<25>{#p/kidd}{#f/3}* 你... 想讓我跟著你們？',
         "<25>{#p/asriel2}{#f/4}* 當然嘍，快來吧。\n* 超有趣的。",
         "<25>{#p/kidd}{#f/4}* 呃...\n* 我...",
         ...(SAVE.flag.n.genocide_milestone < 5
            ? [
                 '<25>{#p/asriel2}{#f/15}* 嘿，你知道艾菲斯博士\n  喜歡安黛因的事嗎？',
                 '<25>* 就是... 呃...\n  那種很親密的喜歡。'
              ]
            : [
                 '<25>{#p/asriel2}{#f/9}* 嘿，你知道艾菲斯博士\n  其實比安黛因還強嗎？',
                 "<25>{#f/5}* 只是她膽子太小，不敢動手！"
              ]),
         '<25>{#p/kidd}{#f/7}* 什麼？\n* 怎麼可能...',
         "<25>{#p/asriel2}{#f/1}* 呵，關於她倆...\n  我知道的還不止這些呢。",
         '<25>{#p/kidd}{#f/7}* 快告訴我！',
         '<25>{#p/asriel2}{#f/5}* 當然，當然，不過...\n* 你得跟$(name)和我走\n  我才告訴你。',
         '<25>{#p/kidd}{#f/1}* 成交！\n* 哈哈。',
         '<25>{#f/2}* ...'
      ],
      undyne2b: [ '<25>{#p/kidd}{#f/1}* 喲，還等什麼呢？' ],
      undyne2bx: [ "<25>{#p/kidd}{#f/1}* 出發吧！" ],
      undyne2c: [
         '<25>{#f/3}* 嘿... 我知道我們剛\n  認識不久，但是...',
         "<25>{#f/4}* 我，其實，並不想讓\n  安黛因傷害你...",
         '<25>* ...',
         "<25>{#f/2}* 要不然我們一起行動？",
         "<25>{#f/1}* 來吧，這會很有趣的！"
      ],
      undyne2cx: [
         '<25>{#p/kidd}{#f/2}* 老兄，我超推薦你們去看看\n  安黛因的人類追逐練習的！',
         '<25>{#f/1}* 她一秒就能扔出\n  上億隻矛呢！'
      ],
      undyne2d: [ "<25>{#f/1}* 你來帶路吧！" ],
      undyne2dx: () => [
         '<25>{#p/kidd}{#f/2}* 每當獵物快要逃脫...',
         '<25>{#f/1}* 她總能在最後一刻精準命中！',
         ...(SAVE.flag.n.ga_asrielKidd2++ < 1
            ? [ '<25>{#p/asriel2}{#f/6}* 她可真棒啊。', '<25>{#p/kidd}{#f/1}* 是吧！！' ]
            : [])
      ],
      undyne2ex: [
         '<25>{#p/kidd}{#f/4}* 等等...',
         "<25>* 如果安黛因不在這，\n  誰來痛扁那些壞蛋，\n  保護大家呢？",
         '<25>{|}{#f/8}* 就是那些- {%}',
         "<25>{#p/asriel2}{#f/4}* 沒啥好擔心的。",
         '<25>{#f/3}* 而且，如果安黛因真像\n  你說的那麼多謀善斷...',
         "<25>{#f/4}* 那她就不會無緣無故離開，\n  對吧？\n* 她多聰明啊。",
         "<25>{#p/kidd}{#f/4}* 確實...\n* 你說得對...",
         '<25>{#p/kidd}{#f/2}* 對了，謝謝你們帶上我。',
         "<25>{#p/asriel2}{#f/10}* 是嗎...？\n* 我們還沒走兩步呢...",
         '<25>{#p/kidd}{#f/3}* 嗯，我很開心...\n* 不過，我還沒怎麼\n  離開過爹娘，所以...',
         "<25>{#p/asriel2}{#f/8}* 你還有爹娘？\n* 真新奇。",
         "<25>{#p/kidd}{#f/7}* 呃，我-我當然有啊，\n  誰沒爹娘啊？？",
         '<25>{#p/asriel2}{#f/16}* ...\n* 是是是。'
      ],
      undynefinal1a: () =>
         respecc()
            ? [ '<32>{#p/undyne}* 七個。', '<32>* 七個人類靈魂。', '<32>* ...' ]
            : [
                 '<32>{#p/undyne}* 七個。',
                 '<32>* 有了七個靈魂，\n  {@fill=#f00}艾斯戈爾國王{@fill=#fff}就能成為神。',
                 '<32>{#x1}* 六個。',
                 "<32>{#x1}* 我們已經有了六個。",
                 '<32>{#x1}* 懂了嗎？',
                 '<32>{#x1}* 只要有了你這最後一個靈魂，\n  怪物們就能重獲自由。',
                 '<32>{#x3}* 不過在這之前，\n  我應該遵循前輩們立下的規矩...',
                 '<32>{#x4}* 向你講述一段\n  我族人民的悲慘歷史。',
                 '<32>{#x5}* 一切，都要從很久以前說起...'
              ],
      undynefinal1b: () => (respecc() ? [ '<32>{#p/undyne}* No...' ] : [ '<32>{#p/undyne}* 你猜怎麼著？' ]),
      undynefinal1c: () =>
         respecc() ? [ '<32>{*}{#p/undyne}{#i/2}* 我不！！{^999}' ] : [ '<32>{*}{#p/undyne}{#i/2}* 去它的吧！！{^999}' ],
      undynefinal1d: () =>
         respecc()
            ? [ '<32>{*}{#p/undyne}{#i/1}* 我怎麼能那樣居高臨下地\n  對你說話！！{^999}' ]
            : [ '<32>{*}{#p/undyne}{#i/1}* 我幹嘛要告訴你那段故事！！{^999}' ],
      undynefinal1e: () =>
         respecc()
            ? [ "<32>{*}{#p/undyne}{#i/1}* 明明你都光榮地戰鬥過了！！{^999}" ]
            : [ "<32>{*}{#p/undyne}{#i/1}* 明明你馬上就得受死了！！{^999}" ],
      undynefinal1f: [ '<32>{*}{#p/undyne}{#i/2}* 嘎啊啊啊啊啊啊啊啊啊！！！{^999}' ],
      undynefinal1g: () =>
         respecc()
            ? [
                 '<25>{#p/undyne}{#f/1}* LISTEN UP!',
                 '<25>* I like the way you fight.',
                 "<25>{#f/16}* Like any good warrior, you fight until your enemy's been crushed...",
                 '<25>{#f/17}* ... and then you spare them, so they can live to tell the tale!',
                 '<25>{#f/10}* What courage...'
              ]
            : [
                 '<25>{#p/undyne}{#f/1}* 人類！',
                 "<25>* 你正是所有人通往希望\n  與夢想之路上的絆腳石！",
                 "<25>{#f/11}* 艾菲斯的歷史電影讓我\n  以為人類很酷...",
                 '<25>{#f/16}* ...比如那些生命太空飛行器\n  還有跨維度傳送門。',
                 '<25>{#f/4}* 而你呢？？？'
              ],
      undynefinal2a: () =>
         respecc()
            ? [
                 '<25>{#f/1}* I guess I should apologize for how I acted back there.',
                 '<25>{#f/16}* You and your friend were just standing up for each other, right?',
                 '<25>{#f/1}* Well, I can respect that sort of thing.',
                 "<25>{#f/17}* And then there's the local ELITE squad!",
                 "<25>{#f/9}* 我承認，我被你打動了...",
                 ...(SAVE.data.n.state_foundry_doge === 2 && SAVE.data.n.state_foundry_muffet === 2
                    ? [
                         '<25>* The way you managed to not only get past them...',
                         '<25>{#f/10}* But BEFRIEND them???',
                         "<25>{#f/1}* I guess I shouldn't be surprised, though.\n* They'd like your style."
                      ]
                    : SAVE.data.n.state_foundry_doge === 3 && SAVE.data.n.state_foundry_muffet === 3
                    ? [
                         '<25>{#f/10}* The way you managed to EMBARRASS them?',
                         "<25>{#f/11}* I don't think I've ever seen those two so red-faced."
                      ]
                    : [
                         '<25>{#f/10}* Even when faced with their blades, you still held your nerve?',
                         '<25>{#f/1}* I guess you really are something special!'
                      ]),
                 '<25>{#f/8}* ... BUT GETTING BACK TO MY POINT!',
                 '<25>{#f/1}* So, at first, I was just going to kill you and take your SOUL.',
                 '<25>{#f/11}* But after seeing the way you fight...',
                 "<25>{#f/8}* THERE'S NO WAY I'D GO SO EASY ON YOU!!!",
                 "<25>{#f/1}* No... I want you to show me what you're REALLY made of!",
                 "<25>{#f/4}* And only once I've beaten you fair and square...",
                 "<25>{#f/5}* Will I finally claim the freedom that's rightfully ours!",
                 '<25>{#f/16}* But, if you manage to beat me...',
                 "<25>{#f/9}* I'll let you through.",
                 '<25>{#f/8}* ... IF you actually manage to beat me!!!',
                 "<25>{#f/1}* 當你準備好就\n  上前迎戰吧！\n* 呋呼呼呼！"
              ]
            : [
                 "<25>{#f/7}* 你就是個懦夫！",
                 ...(SAVE.data.b.f_state_kidd_betray
                    ? [
                         '<25>{#f/16}* Remember that friend of yours from earlier?',
                         '<25>{#f/17}* The one you ABANDONED?',
                         "<25>{#f/13}* Even when their life was in danger, you didn't bat an eye.",
                         ...(world.trueKills === 0 && SAVE.data.n.bully > 9
                            ? [
                                 "<25>{#f/9}* Maybe if you had, your fighting style would've earned my respect.",
                                 "<25>{#f/16}* But it'd be naive to think you've got any sort of honor NOW."
                              ]
                            : [ '<25>{#f/16}* Typical human.\n* Always quick to stab people in the back.' ]),
                         "<25>{#f/4}* But that's fine...\n* I didn't need you to be some kind of saint...",
                         '<25>{#f/7}* BECAUSE ALL THAT MATTERS IS YOUR SOUL!'
                      ]
                    : [
                         '<25>* 你躲在那孩子的身後，\n  得以再次從我手心裡逃走！',
                         "<25>{#f/9}* 我承認，我被你打動了...",
                         ...(SAVE.data.n.state_foundry_doge === 2 && SAVE.data.n.state_foundry_muffet === 2
                            ? [
                                 '<25>* The way you managed to not only get past the local ELITE squad...',
                                 '<25>{#f/10}* But BEFRIEND them???',
                                 "<25>{#f/11}* You've got cojones, punk.",
                                 '<25>{#f/8}* ... NOT THAT IT ACTUALLY MATTERS!'
                              ]
                            : SAVE.data.n.state_foundry_doge === 3 && SAVE.data.n.state_foundry_muffet === 3
                            ? [
                                 '<25>{#f/10}* The way you managed to EMBARRASS the local ELITE squad?',
                                 "<25>{#f/11}* I don't think I've ever seen those two so red-faced.",
                                 "<25>{#f/8}* ... AS IF THAT'D WORK ON ME!"
                              ]
                            : [
                                 "<25>{#f/10}* 你在誰都沒有殺害的情況下\n  來到了這裡。",
                                 "<25>{#f/11}* 祝賀你啊，混球。\n* 你比一般的人類好一點。",
                                 '<25>{#f/8}* ...說得好像我在乎一樣！'
                              ]),
                         '<25>{#f/4}* 你知道對大家而言\n  什麼事才更有意義嗎？',
                         '<25>{#f/7}* 就是你的死！！！'
                      ]),
                 '<25>{#f/17}* 你的生命不過是\n  將自由阻擋在我們\n  面前的障礙！！',
                 "<25>{#f/1}* 就在此刻，\n  我能感受到大家的心\n  正隨著共同的節奏鼓動！",
                 "<25>* Everyone's been waiting their whole lives for this moment!",
                 "<25>{#f/9}* 但我們一點也不慌張。",
                 "<25>{#f/17}* 只要所有人團結一心，\n  我們絕不會敗！",
                 "<25>{#f/1}* 來吧，人類！\n* 讓我們了結這一切吧，\n  就在此時，就在此地！",
                 "<25>{#f/17}* 我會讓你見識一下\n  怪物們的決心有多麼強大！",
                 "<25>{#f/1}* 當你準備好就\n  上前迎戰吧！\n* 呋呼呼呼！"
              ],
      undynefinal2b1: [ "<25>{#f/7}* 你只是個冷血殺手罷了！" ],
      undynefinal2b1a: [ '<25>{#f/11}* 正當防衛？\n* 得了吧。' ],
      undynefinal2b1b: [
         "<25>{#f/11}* What? You thought I'd overlook what you were up to in the Outlands?",
         '<25>{#f/1}* Fuhuhu... think again.'
      ],
      undynefinal2b2: () => [
         world.trueKills === 1
            ? "<25>{#f/9}* 你可不是不得已\n  才殺了那隻怪物。"
            : "<25>{#f/9}* 你可不是不得已\n  才殺了那些怪物。",
         '<25>{#f/11}* 你殺死他們是因為\n  那對你而言易如反掌。\n* 是因為那對你而言很有趣。',
         '<25>{#f/16}* 那你覺得，\n  當我發現這一切的時候，\n  還會感到很有趣嗎？'
      ],
      undynefinal2b2a: [
         '<25>{#f/9}* 犬衛隊。\n* 當地特戰隊。\n* 還有其他人...',
         '<25>* 所有我所知曉，\n  我所深愛的人，\n  就這樣死去了。'
      ],
      undynefinal2b2b: [
         '<25>{#f/9}* 犬衛隊，\n  還有當地特戰隊...',
         "<25>* 這些與我共事的戰友們，\n  眨眼之間，便離我而去。"
      ],
      undynefinal2b2c: [
         '<26>{#f/9}* 當地特戰隊，\n  一生盡職盡責的他們...',
         '<25>* 只一剎那，\n  便全部消失不見。'
      ],
      undynefinal2b2d: [
         '<25>{#f/9}* 犬衛隊，\n  多年來一直保護\n  那座小鎮的他們...',
         '<25>* 消失得無影無蹤。'
      ],
      undynefinal2b2e: [
         '<26>{#f/9}* 那個幽靈，只想和他的\n  訓練人偶融合的他...',
         '<25>* 轉瞬即逝。'
      ],
      undynefinal2b2f: [
         '<25>{#f/9}* 那隻蜘蛛，\n  只想好好保護和照顧\n  自己部落的她...',
         "<25>* 與世長辭。\n* 在此之後，其他蜘蛛\n  便處於危險境地之中。"
      ],
      undynefinal2b2g: [
         '<25>{#f/9}* 督吉, 有著強烈且堅定的\n  責任感的他...',
         "<25>* 縱使要冒著生命危險\n  工作，她仍舊獻出了\n  自己的生命。"
      ],
      undynefinal2b2h: [
         '<25>{#f/9}* 那隻大狗狗，\n  最善良、最可愛的它...',
         '<25>* 英年早逝。'
      ],
      undynefinal2b2i: [
         '<25>{#f/9}* 那兩隻甜蜜的狗狗，\n  總是悉心照顧彼此的\n  他們...',
         '<25>* 只一瞬間，\n  他們的愛情與遺產，\n  就被無情奪走。'
      ],
      undynefinal2b2j: [
         '<25>{#f/9}* 那隻小狗狗，\n  除了被撫摸外\n  別無所求的他...',
         '<25>* 受到的卻是\n  冷漠無情的攻擊。'
      ],
      undynefinal2b2k: [
         '<25>{#f/9}* 遁狗，受我親自照顧\n  一段時間的他...',
         '<25>* 因為一個人類的\n  一時興起，\n  失去了自己的生命。'
      ],
      undynefinal2b2l: [
         "<25>{#f/9}* 在外域的那位女士...\n  我對她並不怎麼了解，\n  但是...",
         "<25>* 在你抵達星港之後，\n  我就再也沒見到她了。"
      ],
      undynefinal2b2m: [
         '<25>{#f/9}* 在工廠裡度過一生的...\n  每一隻。每一位。怪物。',
         '<25>* 都被奪去了生命。'
      ],
      undynefinal2b2n: [
         '<25>{#f/9}* 在星港裡平靜生活的...\n  每一隻。每一位。怪物。',
         '<25>* 都迎來了自己\n  不合時宜的終局。'
      ],
      undynefinal2b2o: [
         '<25>{#f/9}* 那些在工廠裡\n  度過一生的怪物們...',
         '<25>* 再無出頭之日。'
      ],
      undynefinal2b2p: [
         '<25>{#f/9}* 那些在星港裡\n  平靜生活的怪物們...',
         '<25>* 慘遭無情屠殺。'
      ],
      undynefinal2b2q1: [
         '<25>{#f/9}* 目前為止，\n  每個區域都有\n  一隻怪物死亡...',
         "<25>{#f/13}* 就好像你有各個區域的\n  殺戮指標似的。"
      ],
      undynefinal2b2q2: [
         '<25>{#f/9}* 目前為止，\n  每個區域都有\n  兩隻怪物死亡...',
         "<25>{#f/13}* 就好像你有各個區域的\n  殺戮指標似的。"
      ],
      undynefinal2b2q3: [
         '<25>{#f/9}* 目前為止，\n  每個區域都有\n  三隻怪物死亡...',
         "<25>{#f/13}* 就好像你有各個區域的\n  殺戮指標似的。"
      ],
      undynefinal2b2q4: [
         '<25>{#f/9}* 目前為止，\n  每個區域都有\n  四隻怪物死亡...',
         "<25>{#f/13}* 就好像你有各個區域的\n  殺戮指標似的。"
      ],
      undynefinal2b2q5: [
         '<25>{#f/9}* 目前為止，\n  每個區域都有\n  五隻怪物死亡...',
         "<25>{#f/13}* 就好像你有各個區域的\n  殺戮指標似的。"
      ],
      undynefinal2b2r: () => [
         world.trueKills === 1
            ? "<26>{#f/9}* 在外域的那隻怪物...\n  我實在是不知道它，\n  但是..."
            : "<26>{#f/9}* 在外域的那些怪物...\n  我實在是不知道它們，\n  但是...",
         "<25>* 多虧了您啊，\n  才讓它們\n  就這樣死掉了。"
      ],
      undynefinal2b2s: [
         '<25>{#f/9}* 即使只是一隻怪物...',
         "<25>* 依舊有一個靈魂，\n  再也不能仰望星空。"
      ],
      
      undynefinal2b2t: [
         '<25>{#f/9}* 依然有至少兩隻怪物，\n  是今晚最後一次\n  離開他們的房子。',
         '<25>* 多虧了您啊，\n  才讓他們的家人再也\n  不能與他們重逢。'
      ],
      undynefinal2b2u1: [
         '<25>{#f/9}* 那隻大狗狗，\n  喜歡和他的戰友們\n  在一起的他...',
         '<25>* 醒來時卻發現\n  戰友們都已死去。'
      ],
      undynefinal2b2u2: [
         '<25>{#f/9}* 那兩隻狗狗，\n  總是在照顧其他狗狗的\n  它們...',
         "<25>* 卻發現再也沒有狗狗\n  需要照顧了。"
      ],
      undynefinal2b2u3: [
         '<25>{#f/9}* 那隻小狗，\n  平常形單影隻的它...',
         "<26>* 其他狗狗的死亡\n  可能並不會影響到他，\n  但終有一天會的。"
      ],
      undynefinal2b2u4: [
         '<25>{#f/9}* 遁狗, 花了好幾年\n  才在犬衛隊找到了\n  一個家的他...',
         '<25>* 卻又被無情地\n  奪走了一切。'
      ],
      undynefinal2b2v1: [
         '<25>{#f/9}* 那隻大狗狗，\n  還有狗來米和\n  狗媳兒...',
         '<25>* 都消失於星港的\n  地表之上。'
      ],
      undynefinal2b2v2: [
         '<25>{#f/9}* 不管是大狗狗，\n  還是小狗狗...',
         '<25>{#f/13}* 所以說，按照你的說法，\n  只有中等體型的狗狗\n  才能生存。'
      ],
      undynefinal2b2v3: [
         '<25>{#f/9}* 那隻大狗狗，\n  還有遁狗...',
         '<25>* 因為一個人類的\n  一時興起，\n  而雙雙失去了生命。'
      ],
      undynefinal2b2v4: [
         '<25>{#f/9}* 那兩隻狗狗，\n  總是在照顧其他狗狗的\n  它們...',
         '<25>* 不僅如此，\n  它們所照顧的一隻小狗，\n  也未能倖免。'
      ],
      undynefinal2b2v5: [
         '<25>{#f/9}* 那兩隻狗狗，\n  總是在照顧其他狗狗的\n  它們...',
         '<25>* 他們，還有被他們\n  所照看的遁狗，\n  都死掉了。'
      ],
      undynefinal2b2v6: [
         '<25>{#f/9}* 那隻小狗狗，\n  還有它的戰友遁狗...',
         '<25>* 因為一個人類的\n  一時興起，\n  而雙雙失去了生命。'
      ],
      undynefinal2b3: () => [
         "<25>{#f/11}* 你覺得這很有趣嗎？",
         '<25>* ...',
         '<25>{#f/17}* 你猜怎麼著，混球。',
         ...(SAVE.data.n.state_foundry_muffet === 1
            ? [ "<25>* 這次你再怎麼打電話\n  都沒用了。" ]
            : [ '<25>* 你的死期已到。' ]),
         '<25>{#f/4}* 被你施加在\n  亡者身上的\n  每一份痛苦...',
         "<25>{#f/7}* 那些被你摧毀\n  而化為塵埃的\n  每個希望，每個夢想...",
         "<25>{#f/1}* 這位英雄\n  會用她的長矛\n  向你悉數討回！",
         '<25>{#f/4}* 嘎啊啊啊！！！',
         "<25>{#f/5}* 我會讓你見識一下\n  怪物們的決心\n  有多麼強大！",
         "<25>{#f/17}* 來吧！\n* 上前來做個了斷！"
      ],
      undynefinal2c1: [ '<32>* ...', '<32>* 罷了。' ],
      undynefinal2c2: () => [
         '<25>{#f/16}{#x1}* 聽好了。',
         "<25>* 帕派瑞斯今天沒來報到。",
         '<25>{#f/19}* ...',
         '<25>{#x2}* 你怎麼想他都無所謂。',
         "<25>{#f/18}* 沒錯，帕派瑞斯是很古怪，\n  很天真，很自戀...",
         '<25>{#f/20}{#x3}* 可是，他絕不會\n  錯過任何一次報到。',
         '<25>{#f/18}{#x4}* 而且，不管幾點鐘\n  給他打電話...',
         '<25>{#f/20}{#x5}* 他都絕不會\n  響鈴兩次還不接。',
         '<25>* ...',
         "<25>{#f/18}{#x6}* 現在，他不在了。",
         "<25>{#f/22}{#x7}* 他的兄弟，也失蹤了。",
         '<25>* ...',
         '<25>{#f/18}* 告訴我，你把他怎麼了？',
         '<25>{#f/11}{#x8}* 你把他{^6} 怎{^6} 麼{^6} 了{^6}？',
         ...((SAVE.data.n.state_foundry_doge === 1 ? 1 : 0) +
            (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) +
            (SAVE.data.n.state_starton_dogs === 2 ? 2 : 0) +
            (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
            (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) >
         1
            ? [
                 '<25>{#f/16}{#x9}* 不僅如此，好幾名衛隊成員\n  也接連失蹤...',
                 '<25>{#f/13}* 他們，是不是也被你殺了？'
              ]
            : [
                 '<25>{#f/16}{#x9}* 帕派瑞斯，我每天\n  都會親自訓練他...',
                 "<25>{#f/19}* 儘管我早知道他傻到\n  不會去傷害任何人..."
              ]),
         '<25>* ...',
         '<25>{#f/16}{#x10}* 想前進，隨你。\n* 我給你準備的時間。',
         '<25>{#f/20}* 但只要你再往前踏出一步...',
         '<25>{#f/11}{#x11}* 我就會殺了你。'
      ],
      undynefinal3: () => [
         ...(SAVE.data.n.state_starton_papyrus === 1
            ? [ '<25>{#p/undyne}{#f/21}* 那好。', '<25>{#f/19}* ...' ]
            : world.trueKills > 1
            ? [ '<25>{#p/undyne}{#f/11}* 混蛋，你自找的。', '<25>{#f/9}* 準備好了嗎...' ]
            : respecc()
            ? [ "<25>{#p/undyne}{#f/1}* 那麼，好了...！", "<25>{#f/17}* It's time you met your one true equal!" ]
            : [ "<25>{#p/undyne}{#f/1}* 那麼，好了...！", '<25>{#f/17}* 別再想著逃走！' ])
      ],
      undynefinal3x: [ '<25>{#f/7}{*}* 去死吧！！！{#x1}{^999}' ],
      undynehouse1: [ "<32>{#p/basic}* 鎖住了。" ],
      undynehouse2: () =>
         SAVE.data.b.svr || world.runaway
            ? [ "<32>{#p/human}* (You can't seem to find a way in.)" ]
            : SAVE.data.n.plot === 72
            ? [
                 '<32>{#p/basic}* First, the goat family...\n* Then, the spider queen...',
                 '<32>* And now, the fish lady...',
                 "<32>* I'll miss her... just like I'm going to miss being here...",
                 "<32>* But maybe... I've inhabited this house for too long...",
                 "<32>* Maybe I'll be happier if I spend time... somewhere new..."
              ]
            : [ "<32>{#p/basic}* 真的著火了。\n* 你不能進去。" ],
      walktext: {
         bird: () => [
            '<25>{#p/kidd}{#f/4}* 沒路了...',
            world.genocide
               ? "<25>{#f/3}* 那隻小鳥肯定忙著\n  帶他去另一邊了，哈哈。"
               : '<25>{#f/3}* 那隻小鳥現在肯定很忙，\n  哈哈。'
         ],
         birdx: [ '<32>{#p/basic}* ...但是誰也沒有來。' ],
         path1: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    "<25>{#p/kidd}{#f/8}* 我感覺我要吐了...",
                    SAVE.data.n.state_foundry_kidddeath > 5
                       ? '<25>* 我們殺了那麼多怪物...'
                       : SAVE.data.n.state_foundry_kidddeath > 1
                       ? '<25>* 我們殺了別的怪物們...'
                       : '<25>* We killed a monster...'
                 ]
               : [
                    '<25>{#p/kidd}{#f/1}* 我有跟你說過我們是\n  怎麼上太空梭\n  駕駛課的嗎！？',
                    '<25>{#p/kidd}{#f/7}* 真的超級壯觀！'
                 ],
         path2: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    SAVE.data.b.f_state_kidd_fight
                       ? '<25>{#p/kidd}{#f/4}* 雖然... 你讓我攻擊他們...'
                       : '<25>{#p/kidd}{#f/4}* 雖然...\n  一直是你在攻擊他們...',
                    '<25>{#p/kidd}{#f/8}* 但你真的...\n* ...真的打-打心底想...\n* ...那麼做嗎...？'
                 ]
               : [
                    '<25>{#p/kidd}{#f/2}* 有一天，那個矮個子骷髏\n  和他的兄弟來代課...',
                    '<25>{#p/kidd}{#f/2}* 還有，雖然是個秘密，\n  但是...',
                    '<25>{#f/1}* 他們讓我自己一個人\n  繞著前哨站飛！！'
                 ],
         path3: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    '<25>{#p/kidd}{#f/4}* 我從沒想傷害任何人，\n  我只是...\n* 我...',
                    '<25>{#p/kidd}{#f/8}* 我只是想醒過來...\n* 好希望... 這只是場惡夢...'
                 ]
               : [
                    "<25>{#p/kidd}{#f/1}* 也許有一天我會成為\n  一名真正的飛行員，\n  擁有自己的星際飛船。",
                    "<25>{#p/kidd}{#f/1}* 側面畫著火焰，\n  還有巨大的翅膀，\n  還有...",
                    "<25>{#p/kidd}{#f/6}* 天啊，肯定超酷的..."
                 ],
         path4: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [ '<25>{#p/kidd}{#f/8}* 我...', '<25>{#f/8}* 我...', "<25>{#f/5}* 我... \n* ...我會住嘴的。" ]
               : [
                    '<25>{#p/kidd}{#f/2}* 我們可以去宇宙的\n  任何地方，夥計...',
                    '<25>{#p/kidd}{#f/1}* 最好的事情呢？\n* 莫不如，不用，上學！'
                 ],
         path5: [ '<25>{#p/kidd}{#f/4}* 等等...' ],
         path6: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    "<25>{#p/kidd}{#f/8}* 你一個人是過不去的...",
                    '<25>{#p/kidd}{#f/8}* ...',
                    '<25>{#p/kidd}{#f/5}* ...我幫你。'
                 ]
               : [
                    '<25>{#p/kidd}{#f/2}* 你確定你能跨過\n  那個空隙嗎？',
                    '<25>{#p/kidd}{#f/1}* 喲，我來幫你！'
                 ],
         path7: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [ '<25>{#p/kidd}{#f/8}* 爬上來。' ]
               : [ '<25>{#p/kidd}{#f/1}* 爬上來！' ],
         path8: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    '<25>{#p/kidd}{#f/4}* ...\n* 唉...',
                    '<25>{#f/8}* 要是以後你\n  再也見不到我了...\n* 告訴我父母...',
                    "<25>{#f/5}* ...\n* 就當沒生過我吧。"
                 ]
               : [ "<25>{#p/kidd}{#f/1}* 別擔心，夥計！\n* 我肯定能找條路過去的！" ],
         prechase: [
            '<25>{#p/kidd}{#f/4}* 嘿... 呃...\n* 我感覺這地方有點嚇人...',
            '<25>{#f/3}* 要不咱們回去吧？'
         ],
         rescue1: () => [
            "<25>{#p/kidd}{#f/7}* 安黛因，不要！\n* 那是我的朋友！",
            world.dead_skeleton || geno() || world.population < 4
               ? "<32>{#p/undyne}* No, they're not.\n* You really shouldn't be with them, kiddo."
               : "<32>{#p/undyne}* 回家吧，孩子。\n* 你跟這傢伙不是一路人。"
         ],
         rescue2: [ '<25>{*}{#p/kidd}{#f/8}* 安黛因...{#x1}{^20}{%}' ],
         rescue3: [
            "<25>{*}{#p/kidd}{#f/13}* 我保證，我...\n  我-我會回來找你的！{^20}{%}",
            "<25>{*}{#p/kidd}{#f/13}* 你可千萬別死，好嗎？{^20}{%}"
         ],
         snailcom: [
            '<25>{#p/kidd}{#f/9}* That ghost and I played electrosnail here one time...',
            '<25>* Have you ever...?',
            '<25>{#p/asriel2}{#f/10}* Um... no?',
            '<25>{#f/4}* Not in this timeline, anyway.',
            '<25>{#p/kidd}{#f/9}* Timeline?'
         ],
         trashcom: [
            '<25>{#p/asriel2}{#f/13}* Oh, hey...\n* This is where we...',
            '<25>{#f/13}* Where you...',
            '<25>{#f/15}* ...',
            '<25>{#f/16}* Oh, $(name)...',
            '<25>{#p/kidd}{#f/9}* ...？',
            "<25>{#p/asriel2}{#f/6}* It's nothing.",
            "<25>{#f/7}* Just a little reminder, that's all.",
            '<25>{#p/kidd}{#f/9}* Oh...'
         ],
         undynecom: [
            "<25>{#p/kidd}{#f/11}* Oh, it's...\n* This is Undyne's house...!",
            "<25>{#p/asriel2}{#f/8}* Thankfully, Undyne's not here right now.",
            '<25>{#f/6}* If all goes to plan, she never will be again.'
         ]
      },
      watercooler1: () => [
         ...(SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The label describes using this fluid only in a specific kind of emergency.)' ]
            : [
                 "<32>{#p/basic}* 這是個裝滿電阻尼液的飲水機，\n  上面有一個奇怪的警告標籤。",
                 '<32>{#p/basic}* 「僅用於消除可攜式\n   噴氣背包的靜電幹擾。」'
              ]),
         choicer.create('* （要接一杯嗎？）', '是', '否')
      ],
      watercooler2a: [ '<32>{#p/human}* （你現在拿著一杯電阻尼液。）' ],
      watercooler2b: [ '<32>{#p/human}* （你決定不接。）' ],
      watercooler3: () => [
         ...(SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The label describes using this fluid only in a specific kind of emergency.)' ]
            : [
                 "<32>{#p/basic}* 這是個裝滿電阻尼液的飲水機，\n  上面有一個奇怪的警告標籤。",
                 '<32>{#p/basic}* 「僅用於消除可攜式\n   噴氣背包的靜電幹擾。」'
              ]),
         '<32>{#p/human}* （你已經有一杯了。）'
      ]
   },

   b_group_foundry: {
      moldsmalMoldbygg1: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 呃啊，霉臭味！' ]
            : [ "<32>{#p/story}* It's a gelatin festival!" ],
      moldsmalMoldbygg2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一個了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我們了！' ]
            : [ '<32>{#p/story}* 現在只剩大黏簇一個了。' ],
      moldsmalMoldbygg2b: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一個了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我們了！' ]
            : [ '<32>{#p/story}* Gelatini now blorbs solo.' ],
      woshuaMoldbygg2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 矛盾二人組。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 哇，你好...' ]
            : [ '<32>{#p/story}* 刷潔頓跨坐著。\n* 可惜大黏簇也來了...' ],
      woshuaMoldbygg2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一個了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我們了！' ]
            : [ '<32>{#p/story}* 現在只剩大黏簇一個了。' ],
      woshuaMoldbygg2b: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一個了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我們了！' ]
            : [ '<32>{#p/story}* 刷潔頓不知道該怎麼辦。' ]
   },
   b_opponent_woshua: {
      tweet: '啾啾',
      epiphany: [
         [ '<08>{#p/basic}{~}Skrubby accepts your mercy.' ],
         () =>
            world.meanie
               ? [ '<08>{#p/basic}{~}Skrubby will retreat now..', '<08>{#p/basic}{~}Thx for warning!' ]
               : SAVE.data.b.oops && world.flirt > 9
               ? [ '<08>{#p/basic}{~}清洗你的身體..', '<08>{#p/basic}{~}Special service just for you!' ]
               : SAVE.data.b.oops
               ? [
                    '<08>{#p/basic}{~}Even if u get dirty sometimes..',
                    '<08>{#p/basic}{~}Skrubby will be there to clean u.'
                 ]
               : [ '<08>{#p/basic}{~}Skrubby accepts hug..', '<08>{#p/basic}{~}Regard- less if u are clean or dirty.' ],
         [ '<08>{#p/basic}{~}Skrubby knows what must be done.', '<08>{#p/basic}{~}Thx for showing me the way.' ],
         [ '<08>{#p/basic}{~}Okie.\nTake u G.' ]
      ],
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 刷潔頓，潔癖狂魔。\n* 眼裡容不下半點灰塵。" ]
            : [
                 '<32>{#p/story}* 刷潔頓 - 攻擊 18 防禦 5\n* 這個卑微的細菌恐懼症患者\n  想要清理整個星系。'
              ],
      act_check2: [
         '<33>{#p/story}* 刷潔頓 - 攻擊 18 防禦 5\n* 這個卑微的細菌恐懼症患者\n  想要回家清洗傷口。'
      ],
      act_check3: [
         '<32>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* One wheel closer to a cleaner future for monsterkind.'
      ],
      act_check4: [
         "<32>{#p/story}* 刷潔頓 - ATK 18 DEF 5\n* 這個卑微的細菌恐懼症患者\n  的愛情故事像肥皂一樣。"
      ],
      name: '* 刷潔頓',
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 刷潔頓。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* 刷刷來了！" ]
            : [ '<32>{#p/story}* 刷潔頓漫步過來了。' ],
      idleTalk1a: [ '<08>{#p/basic}{~}清洗你的靈魂' ],
      idleTalk1b: [ '<08>{#p/basic}{~}清洗你的手' ],
      idleTalk1c: [ '<08>{#p/basic}{~}清洗你的臉' ],
      idleTalk1d: [ '<08>{#p/basic}{~}清洗你的頭髮' ],
      idleTalk1e: [ '<08>{#p/basic}{~}清洗你的腳' ],
      idleTalk2a: [ '<08>{#p/basic}{~}Skrub a dub-dubs' ],
      idleTalk2b: [ '<08>{#p/basic}{~}Oops, I meant..\nSkrub a sub-SUBS' ],
      idleTalk2c: [ '<08>{#p/basic}{~}Skrub a sub-subs' ],
      idleTalk3: () =>
         world.trueKills > 0 ? [ '<08>{#p/basic}{~}Your SOUL is unclean.' ] : [ '<08>{#p/basic}{~}\x00*吹著\n口哨*' ],
      cleanTalk: [ '<08>{#p/basic}{~}Green means clean' ],
      jokeTalk1: [ "<08>{#p/basic}{~}NO. THAT JOKE'S TOO.. DIRTY" ],
      jokeTalk2: [ "<08>{#p/basic}{~}EUGH.. I CAN'T BELIEVE THIS" ],
      randStatus1: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Look at the little bird!' ]
            : [ '<32>{#p/story}* 刷潔頓和一隻小鳥交了朋友。' ],
      randStatus2: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* You should've SEEN when it tried to clean my school lunch off." ]
            : [ '<32>{#p/story}* 刷潔頓正在洗小碟子。' ],
      randStatus3: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<33>{#p/kidding}* We should go spacesuit-shining with this one.' ]
            : [ '<32>{#p/story}* 刷潔頓想洗點好玩的東西。' ],
      randStatus4: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Squeaky clean?\n* This is gonna be FREAKY clean.' ]
            : [ '<32>{#p/story}* 洗滌劑的味道。' ],
      randStatus5: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* You do NOT wanna get dirty around this one, dude.' ]
            : [ '<32>{#p/story}* 刷潔頓好奇星塵幹不乾淨。' ],
      hurtStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 一切... 還好嗎？' ]
            : [ '<32>{#p/story}* 刷潔頓討厭自己的傷口。' ],
      jokeText1: [ '<32>{#p/human}* (You tell a joke about a rusty piece of space junk.)' ],
      jokeText2: [ '<32>{#p/human}* (You tell a joke about atmospheric pollution.)' ],
      jokeText3: [ '<32>{#p/human}* (You tell a joke about two starships that got stuck in a trash barge.)' ],
      touchText0: [
         '<32>{#p/human}* （你友好地摸了摸刷潔頓。）',
         "<32>{#p/basic}* 刷潔頓實在受不了你那\n  黏糊糊的手，於是跑掉了！"
      ],
      touchText1: [
         '<32>{#p/human}* （你友好地摸了摸刷潔頓。）',
         '<32>{#p/basic}* 刷潔頓後退，躲開了你的手。'
      ],
      touchText2: [
         '<32>{#p/human}* （你友好地摸了摸刷潔頓。）',
         '<32>{#p/basic}* 刷潔頓受寵若驚。'
      ],
      cleanText1: [
         '<32>{#p/human}* （你問刷潔頓能不能把你清洗一下。）',
         '<32>{#p/basic}* 刷潔頓高興地跳來跳去。'
      ],
      flirtTalk1: [ '<08>{#p/basic}{~}No!\nUnclean romance!' ],
      flirtTalk2: [ '<08>{#p/basic}{~}Sparkle and shine!' ],
      cleanText2: [
         '<32>{#p/human}* （你問刷潔頓能不能把你清洗一下。）',
         '<32>{#p/basic}* 刷潔頓繼續清洗。'
      ]
   },
   b_opponent_moldbygg: {
      sexyChat: [ '<08>{#p/basic}{~}\x00*性感扭動*' ],
      epiphany: [
         [ '<08>{#p/basic}{~}\x00*黏液的聲音*' ],
         () =>
            world.meanie
               ? [ '<08>{#p/basic}{~}Guoooh..' ]
               : SAVE.data.b.oops && world.flirt > 9
               ? [ '<08>{#p/basic}{~}\x00*性感扭動*' ]
               : SAVE.data.b.oops
               ? [ '<08>{#p/basic}{~}\x00*高興地扭動*' ]
               : [ '<08>{#p/basic}{~}\x00*slimy embrace*' ],
         [ '<08>{#p/basic}{~}Final roar.' ],
         [ '<08>{#p/basic}{~}\x00*閃亮地扭動*' ]
      ],
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 哇！' ]
            : [ '<32>{#p/story}* 大黏簇出現了！' ],
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇，噁心粘球。\n* 為啥我要多費口舌給你解釋這些？' ]
            : [ '<32>{#p/story}* 大黏簇 - 攻擊 18 防禦 18\n* 並不是很小。' ],
      act_check2: [ '<32>{#p/story}* 大黏簇 - 攻擊 18 防禦 18\n* 狀態並不是很好。' ],
      act_check3: [ '<32>{#p/story}* 大黏簇 - 攻擊 18 防禦 18\n* 允許成為全職果凍墊。' ],
      act_check4: [ '<32>{#p/story}* 大黏簇 - 攻擊 18 防禦 18\n* 和你的關係並沒有想像的那麼好...' ],
      act_topple1: [ "<32>{#p/human}* （你試圖推倒大黏簇，但它還沒有那麼弱。）" ],
      act_topple2: [ '<32>{#p/human}* （你推倒了大黏簇。）\n* （它的身體塌陷了，滾到了遠處。）' ],
      name: '* 大黏簇',
      idleTalk1: [ '<08>{#p/basic}{~}Guoooh!' ],
      idleTalk2: [ '<08>{#p/basic}{~}\x00*黏液的聲音*' ],
      idleTalk3: [ '<08>{#p/basic}{~}吼。' ],
      idleTalk4: [ '<08>{#p/basic}{~}\x00*e急切地扭動*' ],
      randStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* What does it want?' ]
            : [ '<32>{#p/story}* 大黏簇想背著你。' ],
      randStatus2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 我好奇我要是抱抱它\n  會發生什麼。' ]
            : [ '<32>{#p/story}* 大黏簇焦慮地搖晃著。' ],
      randStatus3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 黏糊糊的... 但我喜歡！' ]
            : [ '<32>{#p/story}* 大黏簇磨動著地面。' ],
      randStatus4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 啥都黏糊糊的。' ]
            : [ '<32>{#p/story}* 果凍店的味道。' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 離死不遠了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* 大黏簇的狀態看起來不太好..." ]
            : [ '<32>{#p/story}* Gelata has seen better days.' ],
      act_handshake: [
         '<32>{#p/human}* （你向大黏簇伸出了手。）\n* （大黏簇用黏液把你包裹了起來。）',
         '<32>{#p/story}* 你的移速下降了！'
      ],
      act_sit: [ '<32>{#p/human}* （你坐在了大黏簇上面。）\n* （大黏簇很高興能幫到你。）' ],
      distanceStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Can I come sit too!?' ]
            : [ '<32>{#p/story}* 大黏簇很高興你來了。' ],
      act_flirt: [
         '<32>{#p/human}* （你扭動著臀部。）\n* （大黏簇像旋風一樣轉起來。）',
         '<32>{#p/basic}* 真是一場有意義的交流...？'
      ]
   },
   b_opponent_moldfake: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 小黏團...\n* 直覺告訴我，這隻怪物可沒有\n  它外表看起來那麼簡單。" ]
            : [ '<32>{#p/story}* GELATINI - ATK 18 DEF 18\n* Not a squorch to be heard.' ],
      name: '* 小黏團',
      smalTalk: [ '<08>{#p/basic}{~}...' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* 小黏團。' ] : [ '<32>{#p/story}* 小黏團出現了？' ]),
      fakeStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏團。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Do Gelatinis always sit this still?' ]
            : [ "<32>{#p/story}* 小黏團不動了。" ],
      fakeStatus2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏團。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* Something's off with that Gelatini..." ]
            : [ '<32>{#p/story}* Gelatini is a perfectly tempered gelatin with no flaws.' ],
      fakeStatus3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏團。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Are Gelatinis always this quiet?' ]
            : [ "<32>{#p/story}* It's Gelatini's quiet time." ],
      fakeStatus4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏團。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* This seems kinda weird.' ]
            : [ '<32>{#p/story}* 果凍店的味道。' ],
      act_imitate: [ '<32>{#p/human}* （你靠近了小黏團。）', '<32>{#p/basic}* ...突然！' ],
      act_flirt: [ '<32>{#p/human}* (You wiggle your hips.)', '<32>{#p/basic}* ...突然！' ],
      act_slap: [ '<32>{#p/human}* （你使勁扇了小黏團一巴掌。）', '<32>{#p/basic}* ...突然！' ]
   },
   b_opponent_shyren: {
      act_check: [ '<32>{#p/story}* 害羞塞壬 - 攻擊19 防禦0\n* 一位先知性歌手，因自己的羞怯\n  而躊躇不前。' ],
      act_check2: [ '<32>{#p/story}* 害羞塞壬 - 攻擊19 防禦0\n* 她帶著嶄新的自信重返舞臺！' ],
      act_check3: [ '<32>{#p/story}* 害羞塞壬 - 攻擊19 防禦0\n* 她帶著嶄新的自信放聲歌唱！' ],
      act_check4: [ "<32>{#p/story}* 害羞塞壬 - 攻擊19 防禦0\n* 她帶著嶄新的自信閃耀全場！" ],
      act_check5: [ '<32>{#p/story}* 害羞塞壬 - 攻擊19 防禦0\n* 一位先知性歌手，因自己的新傷\n  而躊躇不前。' ],
      act_check6: [ '<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* Alas, the bitter dregs of rejection.' ],
      act_check7: [ '<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* Suddenly, love songs.' ],
      awkwardtoot: [ '<08>{#p/basic}{~}(awkward toot)' ],
      creepStatus: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* 害羞塞壬蜷縮在角落裡。' ]
            : [ "<32>{#p/kidding}* 我覺得這沒什麼用..." ],
      creepText1: [
         '<32>{#p/human}* （你露出你最燦爛的笑容\n  向害羞塞壬調情。）',
         '<32>{#p/basic}* 害羞塞壬轉過身去...'
      ],
      creepText2: [
         '<32>{#p/human}* （你再一次向害羞塞壬調情。）',
         '<32>{#p/basic}* 害羞塞壬感覺非常不適，決定離開。'
      ],
      encourage1: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* 害羞塞壬似乎更喜歡一起跟著唱。' ]
            : [ '<32>{#p/kidding}* 一起唱歌？\n* 好樣的，夥計！' ],
      encourage2: () =>
         world.dead_skeleton || geno() || world.population < 4
            ? world.genocide
               ? SAVE.data.n.state_foundry_muffet === 1
                  ? [ '<32>{#p/story}* The eerily quiet air passes behind the symphony of voices.' ]
                  : [ "<32>{#p/kidding}* Haha, this is kinda fun!\n* Even though it's just the three of us..." ]
               : SAVE.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/story}* A shadowy figure watches the commotion from afar.' ]
               : [ "<32>{#p/kidding}* Yo... uh...\n* What's that weird shadowy guy doing over there?" ]
            : SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Sans is selling tickets made of carbon fiber.' ]
            : [ '<32>{#p/kidding}* Is that short skeleton selling TICKETS now??' ],
      encourage3: () =>
         world.dead_skeleton || geno() || world.population < 4
            ? SAVE.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/story}* Your previous hums echo back into the room.' ]
               : [ '<32>{#p/kidding}* This place is so empty, we can hear ourselves from the past.\n* So trippy...' ]
            : SAVE.data.n.state_foundry_muffet === 1
            ? [ "<32>{#p/story}* The crowd tosses clothing.\n* It's a storm of cotton balls." ]
            : [ '<32>{#p/kidding}* Woah, so many people!' ],
      encourage4: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren thinks about her future.' ]
            : [ '<32>{#p/kidding}* One last time!\n* One last time!\n* One last time!' ],
      flirtText1: [ '<32>{#p/human}* (You flirt with Shyren.)\n* (Though uneasy, she blushes a little in return.)' ],
      flirttoot: [ '<08>{#p/basic}{~}(happy toot)' ],
      hum0: [ '<32>{#p/human}* (You hum a melancholy waltz.)\n* (Shyren follows your melody.)' ],
      hum1: [ '<32>{#p/human}* (You hum a funky tune.)\n* (Shyren follows your melody.)' ],
      hum2: [ '<32>{#p/human}* (You hum a bluesy song.)\n* (Shyren follows your melody.)' ],
      hum3: [ '<32>{#p/human}* (You hum a jazz ballad.)\n* (Shyren follows your melody.)' ],
      hum4: [ '<32>{#p/human}* (You hum an apology song.)\n* (Shyren calms down.)' ],
      humX1: () =>
         world.dead_skeleton || geno() || world.population < 4
            ? [ '<32>{#p/human}* (You hum some more.)', "<32>{#p/basic}* It's a veritable duet!" ]
            : [
                 '<32>{#p/human}* (You hum some more.)',
                 '<32>{#p/basic}* Monsters are drawn to the music.',
                 "<32>{#p/basic}* Suddenly, it's a concert..."
              ],
      humX2: () =>
         world.dead_skeleton || geno() || world.population < 4
            ? [
                 '<32>{#p/human}* (You hum some more.)',
                 '<32>{#p/basic}* Shyren is happy to have you as her vocal partner.'
              ]
            : [
                 '<32>{#p/human}* (You hum some more.)',
                 "<32>{#p/basic}* The seats are sold out.\n* It's a rockstar performance!"
              ],
      humX3: () =>
         world.dead_skeleton || geno() || world.population < 4
            ? [
                 '<33>{#p/human}* (You hum some more.)',
                 '<32>{#p/basic}* Even without a crowd, a dance of melody and harmony persists.'
              ]
            : [
                 '<32>{#p/human}* (You hum some more.)',
                 '<32>{#p/basic}* Despite your success, the constant attention...',
                 "<32>* The tours...\n* The groupies...\n* It's all..."
              ],
      humX4: () => [
         "<32>{#p/human}* (You and Shyren have come so far, but it's time.)",
         '<32>* (You both have your own journeys to embark on.)',
         '<32>* (You hum a farewell song.)'
      ],
      hurtStatus: [ "<32>{#p/story}* Shyren's voice is raspy." ],
      name: '* 害羞塞壬',
      randStatus1: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren hums very faintly.' ]
            : [ '<32>{#p/kidding}* Are you okay?' ],
      randStatus2: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren pretends to be a pop idol.' ]
            : [ '<32>{#p/kidding}* You look sad...' ],
      randStatus3: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren taps a little beat with her fins.' ]
            : [ '<32>{#p/kidding}* Do you need any help?' ],
      randStatus4: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren thinks about doing karaoke by herself.' ]
            : [ '<32>{#p/kidding}* Is there anything I can do?' ],
      randStatus5: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Smells like music.' ]
            : [ "<32>{#p/kidding}* Wait... what's with her body?" ],
      sadtalk1: [ '<08>{#p/basic}{~}..\n..\ntoot\n..' ],
      sadtalk2: [ '<08>{#p/basic}{~}..\n..\nhum hum\n..' ],
      status1: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/kidding}* 不...\n* 別再這樣了...' ]
            : [ "<32>{#p/kidding}* 喲，你還好嗎？\n* 你看起來很難過..." ],
      talk3: [ '<08>{#p/basic}{~}si re, si re, si mi, si mi' ],
      talk4: [ '<08>{#p/basic}{~}Si Fa Si Fa So Fa So Mi Re Re' ],
      talk5: [ '<08>{#p/basic}{~}Mi So Mi So Mi Si Mi La Si So' ],
      talk6: [ '<08>{#p/basic}{~}(pas- sionate tooting)' ],
      talk7: [ '<08>{#p/basic}{~}(final toot)' ],
      wave1: [ '<32>{#p/human}* (You wave your arms wildly.)\n* (Nothing happens.)' ],
      wave2: () =>
         world.dead_skeleton || geno() || world.population < 4
            ? [ '<32>{#p/human}* (You wave your arms wildly.)\n* (Nothing happens.)' ]
            : [ '<32>{#p/human}* (You wave your arms wildly.)', '<32>{#p/basic}* The crowd eats it up!' ],
      act_boo1: [ '<32>{#p/human}* (You boo Shyren.)', '<32>{#p/basic}* Her head down, Shyren moves away quietly...' ],
      act_boo2: [
         '<32>{#p/human}* (You boo Shyren.)',
         '<32>{#p/basic}* Shyren, seeing how you handle rejection, leaves in a huff.'
      ],
      act_boo3: [
         '<32>{#p/human}* (You boo Shyren.)',
         "<32>{#p/basic}* Shyren's fleeting joy fades just as soon as it came to her."
      ],
      act_boo4: [
         '<32>{#p/human}* (You boo Shyren.)',
         '<32>{#p/basic}* The crowd, distraught, watches as Shyren flees the scene.'
      ],
      act_boo5: [
         '<32>{#p/human}* (You boo Shyren.)',
         '<32>{#p/basic}* The betrayal brings Shyren to tears as she flees the scene.'
      ]
   },
   b_opponent_radtile: {
      epiphany: [
         [ '<08>{#p/basic}{~}Until next time, G.' ],
         () =>
            world.meanie
               ? [ '<08>{#p/basic}{~}Huh..!\nSince when did you get scary!' ]
               : SAVE.data.b.oops && world.flirt > 9
               ? [ '<08>{#p/basic}{~}This feeling..', "<08>{#p/basic}{~}I mustn't resist!" ]
               : SAVE.data.b.oops
               ? [ '<08>{#p/basic}{~}Yeah..\nWe make a pretty radical team.' ]
               : [ "<08>{#p/basic}{~}It's so comfort- able.." ],
         [ '<08>{#p/basic}{~}At least my end will serve a purpose.', "<08>{#p/basic}{~}Peace 'n' tran- quility, G." ],
         [ "<08>{#p/basic}{~}Here's your G, my G!" ]
      ],
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 老頑鱷，自詡「酷斃」的鱷魚。\n* 真是可笑至極，\n  瞧瞧這個二貨到底有多土。' ]
            : [ '<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* A stargazer in starglasses.\n* Favorite genre: Kriobeat' ],
      act_check2: [ "<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* Things aren't looking so hot for this cool crocodile." ],
      act_check3: [ '<33>{#p/story}* RADTILE - ATK 24 DEF 12\n* This cool crocodile is on fire.' ],
      act_check4: [
         '<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* When it comes to romance, this cool crocodile is stone cold.'
      ],
      name: '* 老頑鱷',
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 老頑鱷。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 別是這傢伙呀...' ]
            : [ '<32>{#p/story}* Radtile makes an impression!' ],
      randStatus1: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* That sure is an interesting hat he's got on his head." ]
            : [ '<32>{#p/story}* Radtile adjusts his hat.' ],
      randStatus2: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* Everyone around here just loves Raddy's little mirror." ]
            : [ '<32>{#p/story}* Radtile looks deeply into his mirror image.' ],
      randStatus3: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* What's he doing, anyway?" ]
            : [ '<32>{#p/story}* Radtile is making gestures to improve his cool factor.' ],
      randStatus4: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* I wonder what his face looks like.' ]
            : [ '<32>{#p/story}* Smells like an old skatepark.' ],
      idleTalk1: [ '<08>{#p/basic}{~}Check it.' ],
      idleTalk2: [ '<08>{#p/basic}{~}Take a looksie.' ],
      idleTalk3: [ '<08>{#p/basic}{~}Sneak a peek..' ],
      idleTalk4: [ '<08>{#p/basic}{~}Give it a gaze..' ],
      insultIdleTalk1: [ '<08>{#p/basic}{~}Meh.' ],
      insultIdleTalk2: [ '<08>{#p/basic}{~}Whatever.' ],
      insultIdleTalk3: [ '<09>{#p/basic}{~}\x00*shrugs*' ],
      insultIdleTalk4: [ '<08>{#p/basic}{~}Very un- cool.' ],
      act_praise: [ "<32>{#p/human}* (You tell Radtile he's as cool as a quantum cucumber.)" ],
      act_praise_bullied: [ '<32>{#p/human}* (You tell Radtile his scars make him look tougher.)' ],
      complimentTalk1: [ "<08>{#p/basic}{~}Were you really lookin'?" ],
      complimentTalk2: [ '<08>{#p/basic}{~}Check first, opinions later.' ],
      complimentTalk3: [ '<08>{#p/basic}{~}Show and tell, in that order.' ],
      complimentPostInsultTalk1: [ "<08>{#p/basic}{~}You're a liar, anyway." ],
      complimentPostInsultStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* Yeah, I don't think that's gonna work now, dude..." ]
            : [ "<32>{#p/story}* Radtile isn't having it." ],
      flirtTalk1: [ '<08>{#p/basic}{~}Woah, hey, hold on..' ],
      complimentStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* Maybe if you show him you're checking him out first...?" ]
            : [ '<32>{#p/story}* Radtile wants you to check him out first.' ],
      checkTalk: [ '<08>{#p/basic}{~}Study me, heh heh.' ],
      realTalk1: [ '<08>{#p/basic}{~}Right on.' ],
      realStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* You did it!\n* ... can we leave now?' ]
            : [ "<32>{#p/story}* Radtile's feeling a whole lot cooler than before." ],
      realTalkY1: [ '<08>{#p/basic}{~}\x00*fist bump*' ],
      realTalkY2: [ "<08>{#p/basic}{~}You're the coolest." ],
      realTalkY3: [ "<08>{#p/basic}{~}Let's rock 'n' roll." ],
      shockTalk1: [ '<08>{#p/basic}{~}.. cool.' ],
      shockStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 呃...' ]
            : [ '<32>{#p/story}* Radtile is not amused.' ],
      act_insult: [ '<32>{#p/human}* (You call Radtile a loser, and tell him to shut up.)' ],
      act_insult_bullied: [ "<32>{#p/human}* (You mock Radtile's bruises, and tell him to go away.)" ],
      act_flirt: [ '<32>{#p/human}* (You beckon Radtile.)' ],
      act_flirt_bullied: [ "<32>{#p/human}* (You tell Radtile he's beautiful no matter how disfigured he is.)" ],
      insultTalk1: [ "<08>{#p/basic}{~}And what if I don't?" ],
      insultStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 呃...' ]
            : [ '<32>{#p/story}* Radtile keeps his distance.' ],
      checkPostInsultTalk: [ '<08>{#p/basic}{~}Come to take another look?' ],
      checkPostInsultStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* Ah, we're going in circles!" ]
            : [ '<32>{#p/story}* Radtile gives you a chance.' ],
      hurtStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* This isn't looking good..." ]
            : [ "<32>{#p/story}* 老頑鱷的牙齒開始脫落了。" ]
   },
   b_opponent_doge: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 督吉，一條冷血的狗。\n* 純純的工作機器。' ]
            : [ '<32>{#p/story}* 督吉 - 攻擊14 防禦10\n* 讀作「dū ji」。輕聲的「ji」。\n* 特戰隊成員。' ],
      act_flirt: () => [
         ...(dogecon() || world.goatbro
            ? [ '<32>{#p/human}* （你向督吉調情。）', '<32>{#p/basic}* 她對這種拍須溜馬不屑一顧。' ]
            : battler.volatile[0].vars.pet
            ? [ '<32>{#p/human}* （你向督吉調情。）', '<32>{#p/basic}* 督吉回以微笑。' ]
            : battler.volatile[0].sparable
            ? [
                 '<32>{#p/human}* （你向督吉調情。）',
                 '<32>{#p/basic}* 督吉非常沮喪，不想聽你說三道四。'
              ]
            : world.flirt < 10
            ? [ '<32>{#p/human}* （你向督吉調情。）', "<32>{#p/basic}* 督吉並沒有什麼\n  強烈的反應。" ]
            : [ '<32>{#p/human}* （你向督吉調情。）', '<32>{#p/basic}* Doge is giving it her all to resist you.' ])
      ],
      act_flirt2: [
         '<32>{#p/human}* （你再次對督吉調情。）',
         "<32>{#p/basic}* Doge can't keep this up for much longer..."
      ],
      act_flirt3: [
         '<32>{#p/human}* (You muster your courage, and call Doge a little munchkin.)',
         '<32>{#p/basic}* 督吉試著強裝鎮靜，\n  但她的臉早已泛紅。',
         "<32>* She squirms and she struggles, but there's no hiding what's on her face.",
         '<32>* 督吉一臉羞愧的逃離了現場...'
      ],
      batheText: [
         '<32>{#p/human}* （你建議督吉去洗個澡。）',
         '<32>{#p/basic}* 督吉從天花板上扯下一根水管...\n  水從管子裡湧了出來。',
         "<32>* 水很冷，但她似乎\n  並不怎麼介意...",
         '<32>* 很快，管子裡的水就流光了。\n* 督吉稍微釋放了一點壓力...',
         "<32>{#p/story}* 督吉的攻擊力下降了！"
      ],
      batheTextEarly: [ "<32>{#p/human}* （你建議督吉去洗個澡，\n  但她現在並不怎麼想去。）" ],
      batheTextGeno: [
         '<32>{#p/human}* （你建議督吉去洗個澡。）',
         '<32>{#p/basic}* 但她根本不在乎自己髒不髒。'
      ],
      batheTextLate: [ '<32>{#p/human}* （你建議督吉去洗個澡，\n  但為時已晚。）' ],
      batheTextPost: [ '<32>{#p/human}* （但是督吉已經清洗乾淨了。）' ],
      fetchStatus: [ '<32>{#p/story}* 督吉的智商在普通狗的\n  平均水平之上。' ],
      fetchText: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （督吉攔下了扳手，\n  並將它扔回給你。）',
         '<32>{#p/basic}* 飛回來的扳手直接\n  正中你的腦門！',
         '<32>{#p/story}* 你的移速下降了！',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpanner++ < 1
            ? [ "<32>{#p/asriel2}* Maybe don't try that again." ]
            : [])
      ],
      fetchTextEpic: [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （督吉靈光一閃，把扳手撿了起來\n  並帶還給你。）'
      ],
      fetchTextGarb: [ '<32>{#p/human}* （你把扳手扔了出去。）\n* （筋疲力盡的督吉直接將扳手\n  選擇性忽視掉了。）' ],
      flirtStatus: [ '<32>{#p/story}* 督吉正猜疑你進攻背後\n  所隱藏的真正意圖。' ],
      flirtStatusAccept: [ '<32>{#p/story}* 督吉的臉微微泛紅。' ],
      flirtStatusReject: [ '<32>{#p/story}* 督吉無奈地嘆了口氣。' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 離死不遠了。' ]
            : [ "<32>{#p/story}* 督吉拼命裝出一副沒事的樣子。" ],
      name: '* 督吉',
      petTalkPost: [ '<11>{#p/basic}{~}啊...' ],
      petText: [
         '<32>{#p/human}* （你試著撫摸督吉。）',
         '<32>{#p/basic}* 督吉猶豫地將頭抬了起來。',
         '<32>* 你的手摸到了督吉的頭。\n* 她頓時容光煥發。\n* 並給了你一個大大的微笑作為回應。',
         '<32>* 所有堆積在她內心裡的壓力\n  終於完全得到了釋放。',
         '<32>* 督吉不再想與你戰鬥了。'
      ],
      petTextEarly: [ "<32>{#p/human}* （你試著撫摸督吉，\n  但你現在還夠不到她。）" ],
      petTextGeno: [
         '<32>{#p/human}* （你試著撫摸督吉。）',
         '<32>{#p/basic}* 她對這份親暱漠然置之。'
      ],
      petTextLate: [ '<32>{#p/human}* （你試著撫摸督吉，\n  但為時已晚。）' ],
      petTextPost1: [
         '<32>{#p/human}* （你再一次試著撫摸督吉。）',
         "<32>{#p/basic}* 督吉沉浸在你的愛撫之中，\n  仿佛她多年來第一次受到關愛..."
      ],
      petTextPost2: [ '<32>{#p/human}* （你還想再試著撫摸督吉。）', '<32>{#p/basic}* 督吉已經要爽上天了。' ],
      petTextPost3: [ '<32>{#p/human}* （你繼續撫摸著督吉。）', '<32>{#p/basic}* 這麼摸下去不會違法嗎？' ],
      petTextPost4: [ '<32>{#p/human}* （你又撫摸了督吉好一會。）', '<32>{#p/basic}* 督吉直接躺在了地上。' ],
      petTextPost5: [ '<32>{#p/human}* （你揉了揉督吉的肚皮。）', '<32>{#p/basic}* 督吉開始流口水了...' ],
      petTextPost6: [ '<32>{#p/human}* （你撫摸著督吉。）', '<32>{#p/basic}* 她還在繼續流著口水。' ],
      petTextPost7: [ '<32>{#p/human}* （你撫摸著督吉。）', '<32>{#p/basic}* ...' ],
      petTextSus: [ '<32>{#p/human}* （但是督吉過於煩躁，\n  不想被摸。）' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* 督吉。' ] : [ '<32>{#p/story}* 督吉昂首闊步向你走來。' ]),
      turnStatus1: [ '<32>{#p/story}* 督吉審視著你的站姿，\n  認為你不夠端正。' ],
      turnStatus2: () =>
         dogecon() ? [ '<32>{#p/story}* 督吉擺弄著她的長矛。' ] : [ '<32>{#p/story}* 督吉需要好好衝洗一番。' ],
      turnStatus3: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉一再檢查她的站姿。' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/story}* 督吉渾身溼漉漉的。' ]
            : [ "<32>{#p/story}* 督吉的衛生習慣毫無改變，\n  這讓她感到非常沮喪。" ],
      turnStatus4: () =>
         dogex()
            ? [ '<32>{#p/story}* 督吉想起了她的職責。' ]
            : world.dead_canine
            ? [ '<32>{#p/story}* 督吉想起了她的同事們。' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/story}* 督吉想要活動一下筋骨。' ]
            : [ '<32>{#p/story}* 督吉思考著她的職責所在。' ],
      turnStatus5: () =>
         dogex()
            ? [ '<32>{#p/story}* 督吉想起了她的榮譽。' ]
            : world.dead_canine
            ? [ '<32>{#p/story}* 督吉想起了她的朋友們。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉稍微放鬆了一下，\n  隨後恢復了標準的站姿。' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/story}* 督吉鎮靜了下來。' ]
            : [ '<32>{#p/story}* 督吉深切懷念起\n  她的一位老同事。' ],
      turnStatus6: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉保持著冷靜。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉深吸一口氣。' ]
            : [ '<32>{#p/story}* 督吉冒出了一身冷汗。' ],
      turnStatus7: () =>
         battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉渴望著關愛。' ]
            : [ '<32>{#p/story}* 督吉深吸一口氣。' ],
      turnStatus8: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉依舊保持著專注。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉需要幫助。' ]
            : [ "<32>{#p/story}* 督吉的呼吸變得急促。" ],
      turnStatus9: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉依舊保持著專注。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉只想被撫摸。' ]
            : [ '<32>{#p/story}* 督吉氣喘籲籲。' ],
      turnStatus10: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉依舊保持著專注。' ]
            : battler.volatile[0].vars.pet
            ? [ '<32>{#p/story}* 督吉心滿意足。' ]
            : [ '<32>{#p/story}* 督吉從容不迫地屹立著，\n  等待你舉手投降。' ],
      turnTalk1: () =>
         dogecon() || world.goatbro
            ? [ "<11>{#p/basic}{~}你犯下的罪行，\n我一清二楚。" ]
            : [ '<11>{#p/basic}{~}隊長警告我們\n要提防你。' ],
      turnTalk2: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}兩人聯手，\n濫殺無辜...',
                 '<11>{#p/basic}{~}已然沉溺於\n殺戮快感之中\n無法自拔？'
              ]
            : dogex()
            ? [ '<11>{#p/basic}{~}當你屠戮平民，\n踐踏生命時...', '<11>{#p/basic}{~}可曾懊悔過\n自己的\n所作所為？' ]
            : world.dead_canine
            ? [ '<11>{#p/basic}{~}犬衛隊\n所有成員...', '<11>{#p/basic}{~}都慘死於\n你的暴行之下，\n無一倖免。' ]
            : [
                 '<11>{#p/basic}{~}因此，\n我一直在\n日夜巡邏。',
                 '<11>{#p/basic}{~}請注意...\n這裡很髒。'
              ],
      turnTalk3: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}不願下出\n如此定論...',
                 '<11>{#p/basic}{~}但依我所見，\n絕無其他可能。'
              ]
            : dogecon()
            ? [
                 '<11>{#p/basic}{~}你隨時可以\n棄甲投戈...',
                 '<11>{#p/basic}{~}然而你選擇\n將殺戮\n貫徹到底。'
              ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{#p/basic}{~}啊...', '<11>{#p/basic}{~}真爽...' ]
            : [
                 '<11>{#p/basic}{~}但我想，\n作為\n特戰隊的\n一份子。',
                 '<11>{#p/basic}{~}我們必須\n隨機應變。'
              ],
      turnTalk4: () =>
         dogecon() || world.goatbro
            ? [
                 '<11>{#p/basic}{~}遙想當年，\n初入特戰隊...',
                 "<11>{#p/basic}{~}那時，安黛因\n視人類為敵，\n我將信將疑。"
              ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{#p/basic}{~}毛髮沾\n太多水了...' ]
            : [
                 '<11>{#p/basic}{~}遙想當年，\n申請參加\n特戰隊時...',
                 "<11>{#p/basic}{~}我未曾想過\n我會\n順利入隊。"
              ],
      turnTalk5: () =>
         dogecon() || world.goatbro
            ? [ "<11>{#p/basic}{~}而當親眼目睹\n你這般行徑...", "<11>{#p/basic}{~}我的心中\n已再無疑慮。" ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{#p/basic}{~}嗯。\n沒有什麼事\n更能勝過\n散步了。' ]
            : battler.volatile[0].vars.bathe
            ? [
                 '<11>{#p/basic}{~}{#f.batmusic1}Just a moment.',
                 '<11>{#p/basic}{~}...',
                 '<11>{#p/basic}{~}\x00*whips around*',
                 '<11>{#p/basic}{~}\x00*whipping continues*',
                 '<11>{#p/basic}{~}\x00*shakes off*',
                 '<11>{#p/basic}{~}...',
                 '<11>{#p/basic}{~}There, all dry now.\nBack to fighting, yes?',
                 '{*}{#f.batmusic2}{%}'
              ]
            : [
                 '<11>{#p/basic}{~}但在\n那個蠢貨\n退役之後...',
                 '<11>{#p/basic}{~}我就接過\n他的班了。'
              ],
      turnTalk6: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}而你，\n艾斯利爾，\n就是我族叛徒。',
                 '<11>{#p/basic}{~}難以置信，\n如此邪惡至極，\n卻將登基為王。'
              ]
            : dogex()
            ? [ '<11>{#p/basic}{~}投降是\n明智之舉。', '<11>{#p/basic}{~}你卻不知\n如何去做。' ]
            : world.dead_canine
            ? [
                 '<12>{#p/basic}{~}遁狗是狗衛隊\n最新成員。',
                 '<11>{#p/basic}{~}有些人... 把他的視力\n當作一種空去鑽...',
                 '<11>{#p/basic}{~}但是他的前途\n那麼明朗。'
              ]
            : battler.volatile[0].vars.walk
            ? [
                 "<11>{#p/basic}{~}已經走了\n一陣子的\n你...",
                 '<11>{#p/basic}{~}現在又\n還剩多少\n耐力呢？'
              ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{#p/basic}{~}Apologies.\nThere is much on my mind.' ]
            : [
                 '<11>{#p/basic}{~}這份工作\n有些艱苦...',
                 '<11>{#p/basic}{~}就連安黛因\n都為此開始\n自我懷疑。',
                 '<11>{#p/basic}{~}...別跟她講\n我在背後\n這麼對她\n說三道四。'
              ],
      turnTalk7: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}我們的宿命\n竟是這般？',
                 '<11>{#p/basic}{~}卑鄙的王子\n與人類共謀...',
                 '<11>{#p/basic}{~}...誓要剿滅\n我族所有同胞？'
              ]
            : dogex()
            ? [
                 '<11>{#p/basic}{~}你視生命如\n草芥。',
                 '<11>{#p/basic}{~}總把我們看得\n低人一等。'
              ]
            : world.dead_canine
            ? [
                 "<11>{#p/basic}{~}小犬座是\n大犬座\n的直系下屬。",
                 '<11>{#p/basic}{~}它獨特的觀察\n方式幫了很\n多忙...',
                 '<11>{#p/basic}{~}即使這種行為\n常常被大家\n誤解。'
              ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{#p/basic}{~}顯然比我\n想像中的\n要多...' ]
            : [ '<11>{#p/basic}{~}（嘆氣...）' ],
      turnTalk8: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}終究...',
                 "<11>{#p/basic}{~}兩人孰更惡劣，\n難以論斷。"
              ]
            : dogex()
            ? [ '<11>{#p/basic}{~}現在，\n輪到你了。', '<11>{#p/basic}{~}輪到你領受\n低人一等的\n待遇。' ]
            : world.dead_canine
            ? [
                 '<11>{#p/basic}{~}Dogamy and Dogaressa, a duo of dilligence.',
                 '<11>{#p/basic}{~}Before they met, they often misbehaved.',
                 '<11>{#p/basic}{~}But once together, they could do ANYTHING.'
              ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{#p/basic}{~}...', '<11>{#p/basic}{~}Can we really keep going like this?' ]
            : [ '<11>{#p/basic}{~}戰鬥\n開始進入\n僵局...' ],
      turnTalk9: () =>
         world.goatbro
            ? 
              [ '<11>{#p/basic}{~}只此一言...', '<11>{#p/basic}{~}這一切，\n未曾預料。' ]
            : dogex()
            ? [ '<11>{#p/basic}{~}...' ]
            : world.dead_canine
            ? [
                 '<11>{#p/basic}{~}Canis Major was there when the canine unit was formed.',
                 '<11>{#p/basic}{~}Along with its master, it led the unit well.',
                 '<11>{#p/basic}{~}But now...'
              ]
            : [ '<11>{#p/basic}{~}人類，我...' ],
      turnTalk10: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}言盡至此。',
                 '<11>{#p/basic}{~}I will have justice for the terror you have inspired.'
              ]
            : dogex()
            ? [
                 '<11>{#p/basic}{~}言盡至此。',
                 "<11>{#p/basic}{~}正義，\n我必索回。"
              ]
            : world.dead_canine
            ? [
                 '<11>{#p/basic}{~}言盡至此。',
                 "<11>{#p/basic}{~}I will have justice for those dogs' deaths."
              ]
            : battler.volatile[0].vars.pet
            ? [ '<11>{#p/basic}{~}（臉紅了）', '<11>{#p/basic}{~}你真是個...\n友善的\n人類...' ]
            : [
                 '<11>{#p/basic}{~}我覺得\n是時候\n到此為止\n了。',
                 '<11>{#p/basic}{~}...',
                 '<11>{#p/basic}{~}實話講，\n你並沒有\n那麼壞。',
                 '<11>{#p/basic}{~}至少\n比安黛因\n所述的\n略有差別。',
                 '<11>{#p/basic}{~}請你如\n接受懇求般\n接受我的\n仁慈...',
                 '<11>{#p/basic}{~}懇求你\n不會再墮入\n黑暗之中。'
              ],
      turnTalk11: () => [ '<11>{#p/basic}{~}...' ],
      walkText: [
         '<32>{#p/human}* （你想帶著督吉去散散步。）',
         '<32>{#p/basic}* 督吉跟隨著你的腳步。\n* 你們一起齊步前進。',
         '<32>* 你們就這樣走了一會...',
         '<32>* 到最後...',
         '<32>* 督吉開始厭倦這種\n  無聊的活動了。',
         '<32>* 她又跟著你回到了她的巡邏區\n  ，釋放了點壓力...',
         "<32>{#p/story}* 督吉的攻擊力下降了！"
      ],
      walkTextEarly: [ '<32>{#p/human}* （你想帶著督吉去散散步，\n  但她沒有理由跟你一起去。）' ],
      walkTextGeno: [
         '<32>{#p/human}* （你想帶著督吉去散散步。）',
         '<32>{#p/basic}* 督吉拒絕了你的散步請求。'
      ],
      walkTextLate1: [
         "<32>{#p/human}* （你想帶督吉去散散步，\n  但她為了你已經弄乾\n  自己的身體了。）"
      ],
      walkTextLate2: [
         '<32>{#p/human}* （你想帶督吉去散散步，\n  但她從來不做任何非必要的事。）'
      ],
      walkTextPost: [ '<32>{#p/human}* （但是督吉早已因為之前的散步\n  而累到虛脫了。）' ],
      walkTextSus: [ '<32>{#p/human}* （但是督吉太髒了，\n  沒法出去散步。）' ]
   },
   b_opponent_muffet: {
      act_check: [ '<32>{#p/story}* 瑪菲特 - 攻擊39 防禦19\n* 全蜘蛛部落的女王。\n* 特戰隊志願兵。' ],
      act_flirt: () => [
         ...(badSpider()
            ? [ '<32>{#p/human}* （你向瑪菲特調情。）\n* （瑪菲特狠狠瞪了你一眼。）' ]
            : battler.volatile[0].sparable
            ? [ '<32>{#p/human}* （你向瑪菲特調情。）\n* （瑪菲特笑了笑，\n  伸出幾隻手拍了拍你的頭。）' ]
            : world.flirt < 10
            ? [ '<32>{#p/human}* （你向瑪菲特調情。）\n* （瑪菲特笑了笑，\n  向你揮舞她的一些手指。）' ]
            : [ '<32>{#p/human}* （你向瑪菲特調情。）\n* （瑪菲特看起來頗有興致，\n  但還是不夠。）' ])
      ],
      act_flirt2: [
         '<32>{#p/human}* （你向瑪菲特調情。）\n* （瑪菲特對你投向了更多目光。）'
      ],
      act_flirt3: [
         '<32>{#p/human}* （你鼓起勇氣，邀請瑪菲特\n  一同去野餐。）',
         '<32>{#p/basic}* 瑪菲特嚕嚕笑了幾下...',
         '<32>* 然後又笑了幾聲...',
         "<32>* 她已經無法控制自己的情感了！\n* 瑪菲特向你完美的調情能力屈服！",
         '<32>* ... 然後立即決定結束戰鬥，\n  以免讓她的蜘蛛同伴們蒙羞。',
         '<32>{#p/kidding}* ... 什麼？'
      ],
      flirtReaction1: [ '<11>{#p/basic}{~}真可愛啊~' ],
      flirtReaction2: [ "<11>{#p/basic}{~}你人真好~" ],
      flirtReaction3: [ '<11>{#p/basic}{~}啊呼呼~' ],
      appeaseText: [
         '<33>{#p/human}* （你對瑪菲特發出呼籲。）\n* （瑪菲特再一次被你的話\n  所吸引。）',
         '<32>* （你說起那些天真的狗狗，\n  批判安黛因把它們編入衛隊\n  是有多不負責。）',
         '<32>* （你接著上句說，相信這種隊長\n  就如同將整個蜘蛛部落置於險境。）',
         '<32>{#p/basic}* 瑪菲特開始仔細地考慮\n  這些情況...',
         "<32>{#p/story}* 瑪菲特的攻速下降了！"
      ],
      appeaseTextEarly: [ "<32>{#p/human}* （你向瑪菲特發出呼籲，\n  但她看起來還沒有準備好\n  傾聽你的話。）" ],
      appeaseTextGeno: [
         '<32>{#p/human}* （你向瑪菲特發出呼籲。）',
         '<32>{#p/basic}* 瑪菲特可不會被你的膚淺言論\n  所左右。'
      ],
      appeaseTextLate: [
         "<32>{#p/human}* （你向瑪菲特發出呼籲，\n  但她已經不想再聽了。）"
      ],
      appeaseTextPost: [ "<32>{#p/human}* （但瑪菲特不需要被呼籲第二遍。）" ],
      appeaseTextSus: [ '<32>{#p/human}* （但瑪菲特沒有理由去聽你說話。）' ],
      counterText: [
         '<32>{#p/human}* （你嘗試反駁瑪菲特。）\n* （瑪菲特被你的話所吸引。）',
         '<32>* （你告訴她說和特戰隊做交易\n  完全站不住腳。）',
         '<32>* （你提到他們的其中一員都沒能\n  把你抓住。）',
         '<32>{#p/basic}* 瑪菲特開始思考著這些事的\n  來龍去脈...',
         "<32>{#p/story}* 瑪菲特的攻速下降了！"
      ],
      counterTextEarly: [
         "<32>{#p/human}* （你試圖反駁瑪菲特，\n  但她還沒有說出\n  能供你反駁的話。）"
      ],
      counterTextGeno: [
         '<32>{#p/human}* （你嘗試反駁瑪菲特。）',
         '<32>{#p/basic}* 瑪菲特對自己的目標堅定不移。'
      ],
      counterTextLate: [ "<32>{#p/human}* （你嘗試反駁瑪菲特，\n  但她早已拿定了主意。）" ],
      counterTextPost: [ '<32>{#p/human}* （但瑪菲特已經聽過了\n  你的駁論。）' ],
      name: '* 瑪菲特',
      payTalkPost: [ "<11>{#p/basic}{~}謝謝你的好意，\n但我們的錢\n已經夠多了~" ],
      payText: [
         '<32>{#p/human}* （你嘗試給瑪菲特付錢。）',
         "<32>* 看起來，怪物小孩的錢足夠支付\n  所有蜘蛛部落的開支！",
         '<32>* 瑪菲特收下了錢，向你和怪物小孩\n  鞠了一躬。',
         '<32>* 她的臣民可以吃飽喝足\n  好一段時間了。',
         "<32>* 瑪菲特不再關心戰鬥了。"
      ],
      payTextEarly: [
         "<32>{#p/human}* （你嘗試給瑪菲特付錢，\n  但她現在尚未知曉你給她錢的\n  任何依據。）"
      ],
      payTextGeno: [
         '<32>{#p/human}* （你嘗試給瑪菲特付錢。）',
         "<32>{#p/basic}* 瑪菲特不再需要你的錢。"
      ],
      payTextLate: [ "<32>{#p/human}* （你嘗試給瑪菲特付錢，\n  但她已經不想再受賄了。）" ],
      payTextPost: [ '<32>{#p/human}* （你再一次嘗試給瑪菲特錢。）' ],
      payTextSus: [ '<32>{#p/human}* （但是瑪菲特沒有理由來相信你。）' ],
      status1: [ "<32>{#p/kidding}* 我被困住了...！" ],
      turnStatus1: () =>
         badSpider()
            ? world.genocide
               ? world.bullied
                  ? [ '<32>{#p/kidding}* 兩隻小流氓...？' ]
                  : [ '<32>{#p/kidding}* 兩隻殺人犯...？' ]
               : world.bullied
               ? [ '<32>{#p/kidding}* 小流氓...？' ]
               : [ '<32>{#p/kidding}* 殺人犯...？' ]
            : [ '<32>{#p/kidding}* 救命...！' ],
      turnStatus2: () =>
         badSpider()
            ? world.genocide
               ? [ "<32>{#p/kidding}* 但我們什麼都沒做！" ]
               : [ "<32>{#p/kidding}* 我有種不祥的預感..." ]
            : [ "<32>{#p/kidding}* 所以說，這存粹是生意了..." ],
      turnStatus3: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 喲...\n* 看來她真的很不喜歡你..." ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* 我們該怎麼辦？' ]
            : [ "<32>{#p/kidding}* 我們永遠也逃不出去了，\n  不是嗎..." ],
      turnStatus4: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 那是什麼鬼東西？' ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* 她難道... 改變主意了嗎？' ]
            : [ '<32>{#p/kidding}* 那是什麼鬼東西？' ],
      turnStatus5: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 當然...' ]
            : battler.volatile[0].vars.counter
            ? [ "<32>{#p/kidding}* 看來沒那麼容易..." ]
            : [ "<32>{#p/kidding}* 你... 你在開玩笑吧？\n* 一點也不有趣！" ],
      turnStatus6: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 我可不喜歡她對你說的話，\n  夥計..." ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* 蜘蛛同伴們...？' ]
            : [ '<32>{#p/kidding}* 呃...' ],
      turnStatus7: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 她太無情了...！" ]
            : battler.volatile[0].vars.appease
            ? [ '<32>{#p/kidding}* 嘿，等一下...\n* 我覺得這方法開始奏效了！\n* 繼續努力，夥計！' ]
            : [ "<32>{#p/kidding}* 我...\n* 我很害怕，夥計..." ],
      turnStatus8: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 夥計，我們怎麼還活著啊？？' ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* 喲，先把古怪的杯糕丟一邊... \n  我們終於有點進展了！\n* 應該吧？" ]
            : [ '<32>{#p/kidding}* 呃啊，別再來了！！' ],
      turnStatus9: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 什麼叫「不可避免的事情」?' ]
            : battler.volatile[0].vars.appease
            ? [ '<32>{#p/kidding}* 但是...\n* 我覺得我們...' ]
            : [ '<32>{#p/kidding}* 呃啊，別再來了！！' ],
      turnStatus10: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 喲，你應該知道我也在這吧..." ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* 嘿，我有點錢！\n* 用上吧，夥計！" ]
            : [ '<32>{#p/kidding}* 有人嗎, 來人啊...' ],
      turnStatus11: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 這一點也不有趣...！" ]
            : battler.volatile[0].vars.pay
            ? [ "<32>{#p/kidding}* 我希望那個矮個子骷髏不會介意我\n  用他給我的錢..." ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* 夥計...\n* 為什麼我們不去幫幫她呢？" ]
            : [ "<32>{#p/kidding}* 結束了..." ],
      turnStatus12: () =>
         badSpider() ? [ '<32>{#p/kidding}* ...' ] : [ '<32>{#p/kidding}* 我們要就此結束，還是...？' ],
      turnStatus13: () =>
         badSpider() ? [ '<32>{#p/kidding}* 真的結束了嗎？' ] : [ '<32>{#p/kidding}* 我們要就此結束，還是...？' ],
      turnTalk1: () =>
         badSpider()
            ? world.genocide
               ? world.bullied
                  ? [ '<11>{#p/basic}{~}啊呼呼呼...\n兩隻小流氓\n爬進我\n網裡了~' ]
                  : [ '<11>{#p/basic}{~}啊呼呼呼...\n兩隻殺人犯\n爬進我\n網裡了~' ]
               : world.bullied
               ? [ '<11>{#p/basic}{~}啊呼呼呼...\n一隻小流氓\n爬進我\n網裡了~' ]
               : [ '<11>{#p/basic}{~}啊呼呼呼...\n一隻殺人犯\n爬進我\n網裡了~' ]
            : [ "<11>{#p/basic}{~}小寶貝們，\n你們現在\n是我的了~" ],
      turnTalk1a: [
         '<11>{#p/basic}{~}希望你能\n喜歡這種\n新顏色~',
         '<11>{#p/basic}{~}我覺得紫色\n更適合你...',
         "<11>{#p/basic}{~}不是嗎，\n小寶貝們？"
      ],
      turnTalk2: () =>
         badSpider()
            ? [
                 world.genocide
                    ? '<11>{#p/basic}{~}你們以為會\n發生什麼，\n小可愛們？'
                    : '<11>{#p/basic}{~}你以為會\n發生什麼，\n小可愛？',
                 '<11>{#p/basic}{~}指望我會\n饒恕你不成？'
              ]
            : [
                 "<11>{#p/basic}{~}別以為\n我會對你\n手下留情，\n渺小的\n人類。",
                 '<11>{#p/basic}{~}那支特戰隊\n為了得到\n你的靈魂\n可是給了我\n很多錢的~'
              ],
      turnTalk3: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}喔天哪~', '<11>{#p/basic}{~}你可\n真丟人~' ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{#p/basic}{~}啊呼呼呼...\n行吧...' ]
            : [
                 '<11>{#p/basic}{~}看來你\n不打算提出\n反報價了...',
                 '<11>{#p/basic}{~}那對我來說，\n該選哪個\n顯而易見~'
              ],
      turnTalk4: () =>
         badSpider()
            ? [
                 '<11>{#p/basic}{~}好吧。\n有件好訊息\n要告訴你~',
                 "<11>{#p/basic}{~}我不必再為\n餵養我的寵物\n而發愁了！"
              ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{#p/basic}{~}如果有\n更棒的交易\n就好了...' ]
            : [ '<11>{#p/basic}{~}我的寵物，\n你在哪~', "<11>{#p/basic}{~}飯點到啦~" ],
      turnTalk5: () =>
         badSpider()
            ? [
                 '<11>{#p/basic}{~}你活下來了？\n真厲害~',
                 '<11>{#p/basic}{~}那我應當\n獎勵你...',
                 '<11>{#p/basic}{~}...\n更多攻擊啦！\n啊呼呼呼！'
              ]
            : battler.volatile[0].vars.counter
            ? [
                 '<11>{#p/basic}{~}但我該\n怎麼保證...',
                 "<11>{#p/basic}{~}... 你不會\n在背後偷偷\n捅我刀子呢？"
              ]
            : [
                 '<11>{#p/basic}{~}我有時會想，\n戰鬥到底是\n什麼樣子的。',
                 "<11>{#p/basic}{~}我從來沒想到\n它會那麼有趣~"
              ],
      turnTalk6: () =>
         badSpider()
            ? [
                 '<11>{#p/basic}{~}感覺怎麼樣，\n嗯？',
                 !world.bullied
                    ? '<11>{#p/basic}{~}所有的怪物\n都如\n多米諾骨牌\n般倒下...'
                    : '<11>{#p/basic}{~}所有的怪物\n都在\n驚慌失措中\n四處逃竄...'
              ]
            : battler.volatile[0].vars.counter
            ? [
                 '<11>{#p/basic}{~}我的\n蜘蛛同伴們\n的安全\n需要\n得到保障...',
                 "<11>{#p/basic}{~}我可不能\n讓它們\n置於險地，\n不是嗎？\n啊呼呼呼..."
              ]
            : [
                 "<11>{#p/basic}{~}玩得開心嗎，\n小可愛們？",
                 '<11>{#p/basic}{~}我的\n蜘蛛同伴們\n一定會...',
                 '<11>{#p/basic}{~}... 等到他們\n拿到自己的\n那份錢的時候~'
              ],
      turnTalk7: () =>
         badSpider()
            ? world.genocide || !world.bullied
               ? [
                    world.genocide ? '<11>{#p/basic}{~}那麼，\n小可愛們...' : '<11>{#p/basic}{~}那麼，\n小可愛...',
                    '<11>{#p/basic}{~}我得好好享受\n殺死你們\n所帶來的\n樂趣~'
                 ]
               : [ '<11>{#p/basic}{~}那麼，\n小可愛...', '<11>{#p/basic}{~}我很樂意將\n這份恩情\n報答於你~' ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{#p/basic}{~}我必須承認，\n那東西確實\n令人擔憂...' ]
            : [
                 '<11>{#p/basic}{~}好吧，\n沒關係的，\n渺小的人類~',
                 '<11>{#p/basic}{~}現在\n唯一重要的，\n是你的靈魂~'
              ],
      turnTalk8: () =>
         badSpider()
            ? [
                 world.genocide
                    ? '<11>{#p/basic}{~}喔，\n太有趣了，\n你們兩個！'
                    : '<11>{#p/basic}{~}喔，\n太有趣了，\n不是嗎？',
                 "<11>{#p/basic}{~}餵食時間\n到啦，\n我的寵物~"
              ]
            : battler.volatile[0].vars.appease
            ? [
                 "<11>{#p/basic}{~}它們也沒有\n做什麼事\n來贏得\n我的信任...",
                 '<11>{#p/basic}{~}喔，你好，\n我的寵物~'
              ]
            : [ '<11>{#p/basic}{~}再來一輪吧,\n我的寵物~' ],
      turnTalk9: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}你只是讓\n不可避免的\n事情\n延遲發生罷了~' ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{#p/basic}{~}不過嘛，\n小可愛們...', "<11>{#p/basic}{~}我不知道\n我能否\n相信你們~" ]
            : [ "<11>{#p/basic}{~}你挺堅強的，\n這點我得承認~" ],
      turnTalk10: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}好啦...', "<11>{#p/basic}{~}難道你\n不累嗎？" ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{#p/basic}{~}也許，除非...', '<11>{#p/basic}{~}你能給我\n一點保險費？' ]
            : [ '<11>{#p/basic}{~}除非交易\n發生變動，\n否則\n你的靈魂\n就如我的\n一般亮眼~' ],
      turnTalk11: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}啊呼呼呼...' ]
            : battler.volatile[0].vars.pay
            ? [
                 '<11>{#p/basic}{~}我向你們二人\n致以最誠摯的\n歉意~',
                 "<11>{#p/basic}{~}你們的善舉\n我永遠\n不會忘記！"
              ]
            : [
                 "<11>{#p/basic}{~}這是什麼？\n一條來自\n安黛因的資訊？",
                 "<11>{#p/basic}{~}她取消了\n交易...？",
                 '<11>{#p/basic}{~}... 嗯...',
                 "<11>{#p/basic}{~}行吧，\n看來我得\n就此收工了，\n不是嗎？",
                 '<11>{#p/basic}{~}很抱歉浪費了\n你的時間~'
              ],
      turnTalk12: () => [ '<11>{#p/basic}{~}...' ],
      turnTalk13: (didf: boolean) =>
         badSpider()
            ? [
                 world.genocide
                    ? '<11>{#p/basic}{~}你知道嗎，\n小可愛們？'
                    : '<11>{#p/basic}{~}你知道嗎，\n小可愛？',
                 "<11>{#p/basic}{~}我已經不想\n與你繼續\n戰鬥下去了。",
                 '<11>{#p/basic}{~}所以，\n做你\n想做的吧。',
                 world.genocide || !world.bullied
                    ? didf
                       ? "<11>{#p/basic}{~}... 抱歉，\n安黛因。\n我更希望我\n能按照自己\n的意願死去，\n謝謝你。"
                       : '<11>{#p/basic}{~}... 抱歉，\n安黛因。\n我已經拖得\n夠久了。'
                    : didf
                    ? "<11>{#p/basic}{~}說實話，\n因為你\n這種小流氓\n而失去\n我的生命\n實在不值得..."
                    : "<11>{#p/basic}{~}說實話，\n在你這種\n小流氓上\n浪費時間\n實在不值得...",
                 '<11>{#p/basic}{~}那就，\n拜拜啦~'
              ]
            : [ '<11>{#p/basic}{~}...' ]
   },
   b_opponent_undyne: {
      artifact: [ "<32>{#p/human}* （安黛因似乎甚至不知道\n  這是什麼。）" ],
      epiphaNOPE: [ '<20>{#p/undyne}嗯?\n這到底是什麼？' ],
      spaghetti1: [
         '<32>{#p/basic}* The smell reminds Undyne of someone close to her...',
         "<32>{#p/story}* 安黛因的攻擊力下降了！"
      ],
      spaghetti2: () =>
         world.genocide
            ? [
                 "<32>{#p/basic}* The smell reminds Undyne of someone she'll never see again...",
                 '<32>{#p/basic}* ... but her determination to eliminate you strengthens.',
                 "<32>{#p/story}* 安黛因的攻擊力提升了！\n* 安黛因的防禦力下降了！"
              ]
            : [
                 "<32>{#p/basic}* The smell reminds Undyne of someone she'll never see again...",
                 "<32>{#p/story}* 安黛因的防禦力下降了！"
              ],
      act_check: () =>
         world.genocide
            ? SAVE.flag.n.azzy_assist < 2
               ? [ '<32>{#p/asriel2}* Undyne.\n* Still not dead...?' ]
               : [ "<32>{#p/asriel2}* 安黛因。\n* 發什麼呆？快去攻擊她啊！" ]
            : helmetdyne()
            ? [ '<32>{#p/story}* 安黛因 - 攻擊40 防禦100\n* 皇家衛隊隊長。\n* 冷酷無情。' ]
            : respecc()
            ? [ '<32>{#p/story}* 安黛因 - 攻擊25 防禦10\n* 曾經是你的死敵，如今是你\n  無與倫比的對手！' ]
            : [ '<32>{#p/story}* 安黛因 - 攻擊50 防禦20\n* 永不放棄的英雄。' ],
      name: () => (world.genocide ? '* 不滅的安黛因' : '* 安黛因'),
      status1: () =>
         helmetdyne()
            ? [ '<32>{#p/story}* 安黛因高聳於你之上。' ]
            : respecc()
            ? [ '<32>{#p/story}* 安黛因與你迎面相撞！' ]
            : [ '<32>{#p/story}* 安黛因來襲！' ],
      intro1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{*}{#p/undyne}準備迎戰吧。' ]
            : [ '<20>{*}{#p/undyne}準備！' ],
      intro2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ "<20>{*}{#p/undyne}讓我把故事講完。" ]
            : respecc()
            ? [ '<20>{*}{#p/undyne}啊！？\n我還以為你很堅強嘞！' ]
            : [ "<20>{*}{#p/undyne}這次別想逃脫\n我的手掌心！" ],
      intro3: () =>
         respecc()
            ? [ '<20>{*}{#p/undyne}不會再有第二次\n機會了！' ]
            : [ "<20>{*}{#p/undyne}這是你最後一次\n從我這逃走！" ],
      intro4: [ '<20>{*}{#p/undyne}不要跑！！！' ],
      intro5: [ '<20>{*}{#p/undyne}給我回來，\n你這個小混球！！' ],
      earlyChallenge: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}想跟我{@fill=#f00}硬碰硬{@fill=#000}，是嗎？',
                 '<20>{#e/undyne/2}成全你。'
              ]
            : respecc()
            ? [
                 "<20>{#p/undyne}{#e/undyne/17}什麼！？\n我已經盡全力在跑了！",
                 '<20>{#e/undyne/17}但是...\n我... 你...',
                 "<20>{#e/undyne/17}不-不！\n我要讓你看看！",
                 "<20>{#e/undyne/1}我要讓你看看\n{@fill=#f00}我所擁有的一切{@fill=#000}！"
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/3}想跟我{@fill=#f00}硬碰硬{@fill=#000}，是嗎？',
                 '<20>{#e/undyne/1}那就成全你！\n呋呼呼！'
              ],
      earlyChallengeStatus: [ '<32>{#p/story}* 戰鬥局勢開始升溫。' ],
      randStatus1: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因引人注目地\n  抬手指向太空。' ]
            : [ '<32>{#p/story}* 安黛因威風凜凜地\n  抬手指向太空。' ],
      randStatus2: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因優雅地旋轉著她的長矛。' ]
            : [ '<32>{#p/story}* 安黛因焦急地翻弄著她的長矛。' ],
      randStatus3: () => [ '<32>{#p/story}* 安黛因對一顆小行星使用了背摔。\n* 就因為她能做到。' ],
      randStatus4: () =>
         respecc() ? [ '<32>{#p/story}* 安黛因滿懷激情地跳來跳去。' ] : [ '<32>{#p/story}* 安黛因焦躁地跳來跳去。' ],
      randStatus5: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因的嘴角閃過了一抹\n  真誠的笑。' ]
            : [ '<32>{#p/story}* 安黛因的嘴角閃過了一抹\n  威脅的笑。' ],
      randStatus6: () =>
         respecc()
            ? [ '<33>{#p/story}* 安黛因滿懷敬慕地看著。' ]
            : [ '<32>{#p/story}* 安黛因用手指划過她的脖子。' ],
      randStatus7: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因發出了一聲戰吼。' ]
            : [ '<32>{#p/story}* 安黛因握緊拳頭舉在胸前，\n  然後搖了搖頭。' ],
      randStatus8: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因凝視著你的靈魂。' ]
            : [ '<32>{#p/story}* 安黛因巍然聳立。' ],
      randStatus9: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因回想起了她的朋友...\n  然後又想起了你。' ]
            : [ '<32>{#p/story}* 安黛因回想起了她的朋友\n  然後以拳搶地。' ],
      randStatus10: () =>
         respecc() ? [ '<32>{#p/story}* 羅非魚的味道撲面而來。' ] : [ '<32>{#p/story}* 壽司的味道撲面而來。' ],
      papStatus1: [ '<32>{#p/story}* 安黛因的眼角閃爍著淚光。' ],
      papStatus2: [ '<32>{#p/story}* 安黛因沉著臉，死死瞪著你。' ],
      papStatus3: [ '<32>{#p/story}* 安黛因想到了她的朋友，\n  用盡全力向地猛擊。' ],
      papStatus4: [ "<32>{#p/story}* 安黛因沒心情跟你胡鬧。" ],
      papStatus5: [ '<32>{#p/story}* 金槍魚沙拉的味道撲面而來。' ],
      endStatus1: [ "<32>{#p/story}* 安黛因的眼皮不由自主地跳了起來。" ],
      endStatus2: [ '<32>{#p/story}* 安黛因將長矛刺向地面。' ],
      endStatus3: [ "<32>{#p/story}* 安黛因的目光左右飄動，\n  想確認這是不是個惡作劇。" ],
      endStatus4: [ '<32>{#p/story}* 安黛因開始呼吸困難了。' ],
      endStatus5: [ '<32>{#p/story}* 烤魚的味道撲面而來。' ],
      tutorial1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}...',
                 "<20>{#e/undyne/4}怎麼？\n還想我杵在這，\n教你怎麼應戰嗎？"
              ]
            : [
                 "<20>{#p/undyne}{#e/undyne/0}只要你還是{@fill=#00c000}綠色{@fill=#000}的\n就{@fill=#f00}別想逃跑{@fill=#000}！",
                 '<20>{#e/undyne/0}除非你學會{@fill=#f00}直面危險{@fill=#000}...',
                 "<20>{#e/undyne/1}不然在我面前\n你連一秒\n也堅持不住！"
              ],
      tutorial2: [
         '<20>{#p/undyne}{#e/undyne/0}我說的{@fill=#f00}直面危險{@fill=#000}...',
         '<20>{#e/undyne/1}是讓你直面子彈！'
      ],
      tutorial3: () => [
         '<20>{#p/undyne}{#e/undyne/3}看好了。',
         '<20>{#e/undyne/3}我給了你一支長矛。',
         '<20>{#e/undyne/2}你可以用它\n  來抵擋我的攻擊。',
         respecc()
            ? '<20>{#e/undyne/17}我本來就不該對你\n  和其他所有人\n  解釋這些的！'
            : '<20>{#e/undyne/17}我還需要解釋的\n更細嗎？'
      ],
      tutorial4: [
         '<20>{#p/undyne}{#e/undyne/6}你在搞什麼？',
         '<20>{#e/undyne/7}不就是臉朝上嗎！！！',
         "<20>{#e/undyne/5}沒那麼難！！！"
      ],
      tutorial5: () =>
         respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}...',
                 '<20>{#e/undyne/2}我想要一場\n公平公正的戰鬥。',
                 "<20>{#e/undyne/3}我曾希望你能向我\n展示出你的實力。",
                 '<20>{#e/undyne/4}也許，如果你\n就這樣打敗了我...',
                 "<20>{#e/undyne/2}那確實能證明\n你有多麼強大。",
                 '<20>{#e/undyne/6}但現在呢？？？',
                 "<20>{#e/undyne/5}我不管了！",
                 "<20>{#e/undyne/5}我他媽又不是\n你家保姆！",
                 '<20>{#e/undyne/17}除非你家保姆...',
                 '<20>{#e/undyne/5}也！教！這！個！'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/2}...',
                 '<20>{#e/undyne/2}我想要一場\n公平公正的戰鬥。',
                 '<20>{#e/undyne/3}我想給你個機會。',
                 '<20>{#e/undyne/4}也許，如果我\n就這樣打敗了你...',
                 "<20>{#e/undyne/2}那確實能證明\n怪物有多麼強大。",
                 '<20>{#e/undyne/6}但現在呢？？？',
                 "<20>{#e/undyne/5}我不管了！",
                 "<20>{#e/undyne/5}我他媽又不是\n你家保姆！",
                 '<20>{#e/undyne/17}除非你家保姆...',
                 '<20>{#e/undyne/5}也！教！這！個！'
              ],
      turnTalkA1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? SAVE.data.n.hp < 6
               ? [
                    '<20>{#p/undyne}{#e/undyne/33}太難了？\n切。',
                    "<20>{#p/undyne}{#e/undyne/2}你該在你仍有機會\n的時候想到這個的。"
                 ]
               : SAVE.data.n.hp < 11
               ? [
                    '<20>{#p/undyne}{#e/undyne/3}不怎麼好，\n但也不怎麼壞。',
                    "<20>{#p/undyne}{#e/undyne/2}但帕派瑞斯肯定\n不會高興的。"
                 ]
               : SAVE.data.n.hp < 16
               ? [
                    "<20>{#p/undyne}{#e/undyne/3}所以說，你比我想像中\n還要堅強那麼一點。",
                    '<20>{#p/undyne}{#e/undyne/2}這還說得過去。'
                 ]
               : [
                    '<20>{#p/undyne}{#e/undyne/4}真厲害...',
                    "<20>{#p/undyne}{#e/undyne/2}只不過，別指望幸運女神\n能一直眷顧你。"
                 ]
            : battler.volatile[0].vars.trolled
            ? respecc()
               ? [
                    '<20>{#p/undyne}{#e/undyne/1}\x00*喘氣...*\n\x00*喘氣...*',
                    '<20>{#e/undyne/1}所以說，這一切都在你的\n計畫之中，嗯？',
                    '<20>{#e/undyne/5}把我徹底惹火，\n然後你就可以\n盡全力對付我了？',
                    '<20>{#e/undyne/0}那麼。',
                    "<20>{#e/undyne/6}是時候來場{@fill=#f00}硬碰硬{@fill=#000}的決鬥了！",
                    '<20>{#e/undyne/1}呋呼呼呼！！'
                 ]
               : [
                    '<20>{#p/undyne}{#e/undyne/1}\x00*喘氣...*\n\x00*喘氣...*',
                    '<20>{#e/undyne/21}還不錯。',
                    "<20>{#e/undyne/15}但我可沒時間\n繼續陪你玩兒戲。",
                    "<20>{#e/undyne/6}是時候來場{@fill=#f00}硬碰硬{@fill=#000}的決鬥了！",
                    '<20>{#e/undyne/1}呋呼呼呼！！'
                 ]
            : [ '<20>{#p/undyne}{#e/undyne/1}不錯嘛！\n那這個怎麼樣！？' ],
      turnTalkA2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}給你講個故事吧。' ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/0}It's been a long time since I've met a warrior like you..." ]
            : [ "<20>{#p/undyne}{#e/undyne/0}很多年來，\n我們夢想著能有個\n圓滿的結局..." ],
      turnTalkA3: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}在我小的時候，\n我努力訓練，\n夢想成為一名皇家守衛...',
                 "<20>{#p/undyne}{#e/undyne/2}然而，\n事情並非一帆風順。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/0}And now, I've got the chance to do battle with one!" ]
            : [ '<20>{#p/undyne}{#e/undyne/0}現在，\n群星已經觸手可及！' ],
      turnTalkA4: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}許多人反對我加入衛隊，\n包括我的家人。' ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/1}I'll savor this moment for as long as it lasts!" ]
            : [ "<20>{#p/undyne}{#e/undyne/1}我不會任由你將它\n從我們手中奪走！" ],
      turnTalkA5: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}後來，\n在一次訓練事故中，\n我瞎了左眼...',
                 '<20>{#p/undyne}{#e/undyne/2}困難重重，無依無靠。'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}嘎啊啊啊！\n熱身結束！' ],
      turnTalkA6a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}重重困難將我擊垮，\n每一步，都異常艱難。',
                 '<20>{#e/undyne/3}我哀嚎著，多麼希望\n有人能聽到我的心聲。'
              ]
            : [ "<20>{#p/undyne}{#e/undyne/20}呵...\n你挺頑強的！" ],
      turnTalkA6b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}重重困難將我擊垮，\n每一步，都異常艱難。',
                 '<20>{#e/undyne/3}我哀嚎著，多麼希望\n有人能聽到我的心聲。'
              ]
            : respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/9}快啊！\n來打我吧！', "<20>{#e/undyne/7}Don't just stand there!" ]
            : [
                 '<20>{#p/undyne}{#e/undyne/6}Mercy!\nHa!',
                 "<20>{#e/undyne/5}I still can't believe you want to SPARE me!"
              ],
      turnTalkA7a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}突然，\n一個聲音從遠處傳來。',
                 '<20>{#e/undyne/3}一個天真無邪的聲音。'
              ]
            : respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/0}Not that I expected anything less...' ]
            : [ '<20>{#p/undyne}{#e/undyne/0}可就算你能夠打敗我...' ],
      turnTalkA7b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}突然，\n一個聲音從遠處傳來。',
                 '<20>{#e/undyne/3}一個天真無邪的聲音。'
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/10}This isn't like you at all!" ]
            : [ '<20>{#p/undyne}{#e/undyne/3}可就算我饒恕了你...' ],
      turnTalkB1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}我四處求援，\n卻徒勞無功。',
                 '<20>{#e/undyne/3}突然，我聽到一個聲音\n呼喚著我的名字。'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}You know...',
                 "<20>{#p/undyne}{#e/undyne/4}Even though we haven't escaped the outpost yet..."
              ]
            : [ "<20>{#p/undyne}{#e/undyne/3}老實說，\n我這是在幫你..." ],
      turnTalkB2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}那時，帕派瑞斯\n還只是個孩子。' ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/0}Getting to fight makes me FEEL like I'm already free!" ]
            : [ '<20>{#p/undyne}{#e/undyne/1}也從未有人類能夠\n闖過艾斯戈爾這關！' ],
      turnTalkB3: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/3}遇到危險，大多數小孩\n都會馬上逃跑...', '<20>{#e/undyne/4}但他不會。' ]
            : respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/4}Just like that one anime Alphys showed me...' ]
            : [ '<20>{#p/undyne}{#e/undyne/4}在這裡殺了你\n反而是種仁慈...' ],
      turnTalkB4: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}他只在乎是不是\n有人正深陷危險...',
                 '<20>{#e/undyne/2}等著他-\n不，需要他出手相助。'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/1}No matter how awful being trapped out here can be...',
                 "<20>{#e/undyne/0}It won't stop us from doing what we love!"
              ]
            : [ '<20>{#p/undyne}{#e/undyne/6}所以別再頑強抵抗了！' ],
      turnTalkB5: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/4}他的天性如此。",
                 '<20>{#p/undyne}{#e/undyne/3}故事講完了。'
              ]
            : respecc()
            ? [
                 "<20>{#p/undyne}{#e/undyne/1}... but man, you really don't know when to quit!",
                 "<20>{#e/undyne/17}How'd you manage to get this strong!?"
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}人類究竟是用\n什麼鬼東西\n做出來的！？' ],
      turnTalkB6: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}即便我擁有再大的膽識，\n再多的力量...',
                 "<20>{#e/undyne/11}也無法像他那樣，\n擁有純潔無瑕的心靈。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/5}Anyone else would've GIVEN UP by now!" ]
            : [ '<20>{#p/undyne}{#e/undyne/5}要是其他人\n現在早就死了！' ],
      turnTalkB7a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}你殺死的，\n不僅是我的學生，\n我的摯友...",
                 "<20>{#e/undyne/2}更是能對極惡行徑\n既往不咎，寬恕你\n一切過錯的高尚之人。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/3}Then again, you've had time to train..." ]
            : [ '<20>{#p/undyne}{#e/undyne/7}你到底有沒有在\n聽我說話！？' ],
      turnTalkB7b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}你殺死的，\n不僅是我的學生，\n我的摯友...",
                 "<20>{#e/undyne/2}更是能對極惡行徑\n既往不咎，寬恕你\n一切過錯的高尚之人。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/3}Huh?\nDon't tell me you're ACTUALLY giving up..." ]
            : [ "<20>{#p/undyne}{#e/undyne/8}And sparing me won't do anything!!" ],
      turnTalkB8a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 world.trueKills > 9
                    ? '<20>{#p/undyne}{#e/undyne/11}With him and so many others gone...'
                    : '<20>{#p/undyne}{#e/undyne/11}你斬碎了他的頭顱之時，\n也斬碎了僅存的仁慈。',
                 "<20>{#p/undyne}{#e/undyne/2}而我能給你的\n全部「仁慈」...",
                 '<20>{#p/undyne}{#e/undyne/1}就是讓你死得痛快點！'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/18}All those other monsters you fought...',
                 "<20>{#p/undyne}{#e/undyne/1}THAT'S the source of your power!"
              ]
            : [ '<20>{#p/undyne}{#e/undyne/9}快啊！' ],
      turnTalkB8b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 world.trueKills > 9
                    ? '<20>{#p/undyne}{#e/undyne/11}With him and so many others gone...'
                    : '<20>{#p/undyne}{#e/undyne/11}你斬碎了他的頭顱之時，\n也斬碎了僅存的仁慈。',
                 "<20>{#p/undyne}{#e/undyne/2}而我能給你的\n全部「仁慈」...",
                 '<20>{#p/undyne}{#e/undyne/1}就是讓你死得痛快點！'
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/5}Come on, I'm GIVING you an opening here!" ]
            : [ '<20>{#p/undyne}{#e/undyne/1}Seriously.' ],
      turnTalkC1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}You know, punk...',
                 "<20>{#p/undyne}{#e/undyne/2}It's rude to interrupt people when they're monologuing.",
                 ...(world.trueKills > 9
                    ? [
                         "<20>{#p/undyne}{#e/undyne/11}...\nYou're going to pay for what you did to him...",
                         "<20>{#p/undyne}{#e/undyne/2}... and all the other monsters you've slaughtered."
                      ]
                    : [ "<20>{#p/undyne}{#e/undyne/2}...\nYou're going to pay for what you did to him." ])
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/17}Keep a close eye on my attacks, and maybe...',
                 "<20>{#p/undyne}{#e/undyne/5}... you'll be smart enough to know when to let 'em through!"
              ],
      turnTalkC2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}艾菲斯告訴過我，\n人類充滿了決心...",
                 '<20>{#p/undyne}{#e/undyne/1}呵呵，你那點破決心，\n也就只能送你到這了。'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/1}Still going!?',
                 '<20>{#p/undyne}{#e/undyne/17}哈...\n艾菲斯告訴過我\n人類非常有決心...'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/1}艾菲斯告訴過我\n人類非常有決心...',
                 '<20>{#p/undyne}{#e/undyne/1}我現在算是明白\n她的意思了！'
              ],
      turnTalkC3: () =>
         SAVE.data.n.state_starton_papyrus === 1 || respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/1}但是，你知道嗎？', "<20>{#e/undyne/1}我也充滿了決心！" ]
            : [ "<20>{#p/undyne}{#e/undyne/1}但是我也\n充滿了決心！" ],
      turnTalkC4: () =>
         respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/5}Determined to show you who's BOSS!" ]
            : [ '<20>{#p/undyne}{#e/undyne/6}此時此地，\n幹掉你的決心！' ],
      turnTalkC5: () =>
         respecc() ? [ "<20>{#p/undyne}{#e/undyne/9}... WHO'S BOSS!" ] : [ '<20>{#p/undyne}{#e/undyne/7}...幹掉你！' ],
      turnTalkC6: () =>
         respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/10}... WHO'S...\n...\n... BOSS!!" ]
            : [ '<20>{#p/undyne}{#e/undyne/9}...幹掉...\n你...' ],
      turnTalkC7: [ '<20>{#p/undyne}{#e/undyne/10}呼...\n呼...' ],
      turnTalkC8: () =>
         respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nFINAL ATTACK!!!' ]
            : [ '<20>{#p/undyne}{#e/undyne/5}嘎啊啊啊啊！！！\n你個小屁孩，\n快給我去死啊！' ],
      turnTalkC9a: [ "<20>{#p/undyne}{#e/undyne/5}真礙事！" ],
      turnTalkC9b: [ '<20>{#p/undyne}{#e/undyne/5}I WILL NEVER TAKE MERCY FROM THE LIKES OF YOU!' ],
      turnTalkC10a: [ '<20>{#p/undyne}{#e/undyne/6}別想打敗我！' ],
      turnTalkC10b: [ '<20>{#p/undyne}{#e/undyne/6}I WILL FIGHT YOU TO THE BITTER END!' ],
      turnTalkD: [ '<20>{#p/undyne}{#e/undyne/9}...' ],
      respeccTalk1: [
         '<20>{#p/undyne}{#e/undyne/11}\x00*huff...*\n\x00*huff...*',
         '<20>{#e/undyne/3}...',
         '<20>{#e/undyne/4}Well...',
         "<20>{#e/undyne/17}You're certainly tough, aren't you?"
      ],
      respeccTalk2: [
         '<20>{#e/undyne/0}... heh, enough to beat me, anyway.',
         "<20>{#e/undyne/13}But hey, that's pretty freaking tough!",
         "<20>{#e/undyne/1}Even though not everyone's gonna like you for it...",
         '<20>{#e/undyne/0}Seeing a human fight with honor gives me hope for your kind.',
         '<20>{#e/undyne/4}...',
         "<20>{#e/undyne/3}It's a shame we can't do battle forever, huh?"
      ],
      respeccTalk3: [
         '<20>{#e/undyne/1}Just... whatever you do, whoever you fight with...',
         "<20>{#e/undyne/1}Don't let it change who you are, got it?",
         '<20>{#e/undyne/3}...',
         '<20>{#e/undyne/4}Until next time...',
         '<20>{#e/undyne/4}Warrior.'
      ],
      death1: () =>
         respecc()
            ? [
                 '<20>{#p/undyne}嘎啊...',
                 '<21>I thought...\nYou were different...',
                 '<20>But then...\n... you actually...\n... urgh...',
                 '<20>...'
              ]
            : [
                 '<20>{#p/undyne}嘎啊...',
                 '<20>我沒想到...\n你... 居然這麼強...',
                 '<20>看來...\n這裡...\n...就是我的葬身之地...',
                 '<20>...'
              ],
      death2: () =>
         helmetdyneAttack() ? [ '<20>{#p/undyne}{#e/undyne/31}...' ] : [ '<20>{#p/undyne}{#e/undyne/31}不...' ],
      death3: () =>
         helmetdyneAttack()
            ? [ '<20>{#p/undyne}{#e/undyne/46}...不。', '<20>{#e/undyne/43}還沒完呢。' ]
            : [
                 '<20>{#p/undyne}{#e/undyne/32}不！',
                 "<20>我不能死！",
                 ...(respecc()
                    ? [ '<20>This betrayal...\nThis... dishonor...', "<20>I won't let you get away with it!" ]
                    : [
                         SAVE.data.n.state_starton_papyrus === 1
                            ? '<20>{#e/undyne/36}艾菲斯...\n艾斯戈爾...'
                            : '<20>{#e/undyne/36}艾菲斯...\n艾斯戈爾...\n帕派瑞斯...',
                         '<20>{#e/undyne/32}大家，都需要我來守護！'
                      ]),
                 '<20>{#e/undyne/32}嘎啊啊啊！！'
              ],
      death4: () =>
         helmetdyneAttack()
            ? [ "<20>{#e/undyne/45}不把你殺了\n我絕不罷休。" ]
            : [
                 '<20>{#p/undyne}{#e/undyne/32}人類！',
                 respecc()
                    ? '<20>{#e/undyne/36}In the name of a good and fair fight...'
                    : "<20>{#e/undyne/36}以希望與夢想起誓...",
                 '<20>{#e/undyne/32}我定會擊敗你！'
              ],
      determination1: () =>
         helmetdyneAttack() ? [] : [ "<20>{#p/undyne}{#e/undyne/32}來啊，\n你就這點能耐嗎？" ],
      determination2: () => (helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/32}...真是可悲。' ]),
      determination3: () =>
         helmetdyneAttack() ? [] : [ "<20>{#p/undyne}{#e/undyne/32}就你那點力氣，\n還想打敗我？" ],
      determination4: () =>
         helmetdyneAttack()
            ? []
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/34}W-where's your fighting spirit now, huh?" ]
            : [ '<20>{#p/undyne}{#e/undyne/34}當我們相信自己時，\n爆發出的力量有多強，\n你見-見識到了吧？' ],
      determination5: () =>
         helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/35}呵... \n呵呵...', '<20>{#e/undyne/34}鬧夠了沒有？' ],
      determination6: () => (helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/34}...' ]),
      determination7: () =>
         helmetdyneAttack() ? [] : [ "<20>{#p/undyne}{#e/undyne/35}...我不能...\n...\n放棄..." ],
      determination8: () => (helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/34}...' ]),
      death5: () => [
         helmetdyneAttack() ? '<20>{#p/undyne}{#e/undyne/43}...' : '<20>{#p/undyne}{#e/undyne/34}...',
         '<20>{#p/undyne}{#e/undyne/47}哈...\n哈...',
         '<20>{#e/undyne/44}...\n艾菲斯...',
         '<20>知道為什麼\n我一直沒對你說...',
         '<20>{#e/undyne/49}因為我怕...',
         '<20>...'
      ],
      death6: () => [
         '<20>{#p/undyne}{#e/undyne/44}不...\n不！',
         '<20>{#e/undyne/34}還沒完！',
         "<20>{#e/undyne/48}我不能死！"
      ],
      death7: [ '<20>{*}{#p/undyne}{#i/8}{@random=1.1/1.1}嘎啊啊啊啊！！！{^10}{%}' ],
      death8a: [ "<20>{*}{#p/undyne}{#i/5}{#v/1}{@random=1.1/1.1}我不能死！{^15}{%}" ],
      death8b: [ "<20>{*}{#p/undyne}{#i/5}{#v/2}{@random=1.1/1.1}我不能死！{^15}{%}" ],
      death8c: [ "<20>{*}{#p/undyne}{#i/6}{#v/3}{@random=1.1/1.1}我不能死！{^15}{%}" ],
      death9: [ "<20>{*}{#p/undyne}{#i/8}{#v/4}{@random=1.1/1.1}我{^10}不{^10}能{^30}{%}" ],
      deterStatus1: [ '<32>{#p/story}* 安黛因笑著，強裝自己沒事。' ],
      deterStatus2: [ "<32>{#p/story}* 安黛因的身體正一點一點融化。" ],
      deterStatus3: [ "<32>{#p/story}* 安黛因的身體已經化得\n  看不出形狀了。" ],
      deterStatus4: [ '<32>{#p/story}* 安黛因深吸了一口氣。' ],
      deterStatus5: [ '<32>{#p/story}* 安黛因挑釁地屹立著。' ],
      challengeText1: [ "<32>{#p/human}* （你告訴安黛因她的攻擊\n  太弱了。）\n* （她沒理你。）" ],
      challengeText2: [
         '<32>{#p/human}* （你告訴安黛因她的攻擊\n  太弱了。）',
         '<32>{#p/basic}* 子彈速度變得更快了。'
      ],
      challengeText3: [
         '<32>{#p/human}* （你告訴安黛因她的攻擊\n  太弱了。）',
         '<32>{#p/basic}* 子彈速度快得過於荒謬了。'
      ],
      challengeText4: [ '<32>{#p/human}* （你告訴安黛因，\n  你想來一場真正的對決。）' ],
      challengeText5: [
         '<32>{#p/human}* （你告訴安黛因她的攻擊\n  太弱了。）',
         "<32>{#p/basic}* 但安黛因已經快到\n  不能再快了。"
      ],
      challengeText7: [ "<32>{#p/human}* （你告訴安黛因她的攻擊\n  太弱了。）\n* （她沒在意。）" ],
      pleadText1: [ "<32>{#p/human}* （你告訴安黛因你不想再\n  戰鬥了。）\n* （無事發生。）" ],
      pleadText2: [
         '<32>{#p/human}* （你告訴安黛因你只是想\n  交朋友。）',
         '<32>{#p/basic}* 這讓她想起了某個人。\n* 她的攻擊變得弱了一點。'
      ],
      pleadText3: [ "<32>{#p/human}* （你告訴安黛因你只是想\n  交朋友。）\n* （但她並不信任你。）" ],
      pleadText4: [ "<32>{#p/human}* （你告訴安黛因你不想再\n  戰鬥了。）\n* （她不禁笑了笑。）" ],
      pleadText5: [ "<32>{#p/human}* （你告訴安黛因你不想再\n  戰鬥了。）\n* （看起來她很是困惑。）" ],
      pleadText6: [ "<32>{#p/human}* （你告訴安黛因你不想再\n  戰鬥了。）\n* （她沒在意。）" ],
      pleadText7a: [
         '<32>{#p/human}* （你告訴安黛因你只是想\n  交朋友。）',
         '<32>{#p/basic}* 安黛因深表讚許。\n* 她的攻擊變得更強了一點。'
      ],
      pleadText7b: [
         '<32>{#p/human}* （你告訴安黛因你只是想\n  交朋友。）',
         "<32>{#p/basic}* 安黛因深表讚許。\n* 但是子彈速度已經\n  快到不能再快了。"
      ],
      pleadText7c: [
         '<32>{#p/human}* （你告訴安黛因你只是想\n  交朋友。）',
         '<32>{#p/basic}* 安黛因深表讚許。\n* 子彈速度已經快到\n  近乎失控了。'
      ],
      pleadText8: [ "<32>{#p/human}* （你告訴安黛因你不想再\n  戰鬥了。）\n* 她冷冰冰地瞪了你一眼。" ],
      genoCutscene1: [ '<08>{#p/kidding}{#e/kidd/0}...', '<08>{#e/kidd/1}呃... 啊？', '<08>{|}{#e/kidd/1}怎麼- {%}' ],
      genoCutscene2: [ '<08>{#p/kidding}{#e/kidd/3}安黛因！！！', '<08>{#e/kidd/4}我...！' ],
      genoCutscene3: [ '<20>{#p/undyne}{#e/undyne/1}小子...？' ],
      genoCutscene3x: [
         '<20>{#p/undyne}{#e/undyne/4}嘿，別擔心，小子...',
         "<20>{#e/kidd/7}我沒事。",
         '<20>{#p/undyne}現在快逃，好嗎？'
      ],
      genoCutscene4: [
         "<08>{#p/kidding}{#e/kidd/5}我控制不了\n自己...",
         '<08>{#e/kidd/6}他們... 他...',
         '<08>{#e/kidd/7}他對我的身體\n動了手腳...'
      ],
      genoCutscene5: [ '<20>{#p/undyne}{#e/undyne/2}所以，你的眼睛...' ],
      genoCutscene6: [ '<08>{#p/kidding}{#e/kidd/6}我...', '<08>{#p/kidding}{#e/kidd/6}我...' ],
      genoCutscene7: [ '<08>{#p/kidding}{#e/kidd/7}我傷害了\n你...' ],
      genoCutscene8: [ "<20>{#p/undyne}{#e/undyne/3}就是點小傷而已..." ],
      genoCutscene9: [
         "<20>{#e/undyne/4}這裡交給我，\n我會好好收拾這些壞蛋。",
         "<20>你不用再當\n他們的傀儡了。",
         '<20>現在快逃，好嗎？'
      ],
      genoCutscene10: [ '<08>{#e/kidd/8}{#p/kidding}...' ],
      genoCutscene11: [ '<20>{#p/undyne}{#e/undyne/5}艾菲斯博士\n會照顧好你的。', '<20>{#e/undyne/6}快跑啊！' ],
      genoCutscene12a: [
         '<20>{#p/undyne}{#e/undyne/7}...呵...\n「就是點小傷而已...」',
'<20>...才怪。',
         '<20>不知怎麼，\n只是那麼一下...'
      ],
      genoCutscene12b: [ "<20>我就...", '<20>就...' ],
      genoCutscene12c: [ '<20>該...\n該死...', '<20>帕派瑞斯...\n艾斯戈爾...\n艾菲斯...' ],
      genoCutscene12d: [ '<20>對不起...', "<20>{#e/undyne/8}讓你們失望了。" ],
      genoCutscene12e: [ '<20>我...', "{#e/undyne/8}我沒法..." ],
      genoCutscene13: [ '<20>{#p/undyne}...', '<11>{#e/undyne/12}不...' ],
      genoCutscene14: [
         "<20>{*}{#p/undyne}{#e/undyne/11}我的身體...\n已經要四分五裂。{^15}{%15}",
         "<20>{*}好像隨時...\n都會化作灰燼。{^15}{%15}",
         '<20>{*}但靈魂深處...{^15}{%15}',
         "<20>{*}燃起了一股\n無法描述的感覺。{^15}{%15}",
         "<20>{*}{#e/undyne/12}那燃起的炙熱\n不允許我死去。{^15}{%15}",
         "<20>{*}{#e/undyne/11}那麼多人民...\n那麼多摯友...\n都慘死於暴行之下。{^15}{%15}",
         "<20>{*}過了我這關，\n你們將會毀滅一切...{^15}{%15}",
         "<20>{*}大家的希望，\n大家的夢想，\n頃刻間都會化為烏有。{^15}{%15}",
         "<20>{*}{#e/undyne/12}所以，我絕不會\n讓你們如願以償。{^15}{%15}",
         '<20>{*}{#e/undyne/13}此時此刻，\n我能感受到...{^15}{%15}',
         '<20>{*}這星河裡的每個人，\n大家心連心，同仇敵愾。{^15}{%15}',
         '<20>{*}因為，我們都有一個\n共同的目標：{^15}{%15}',
         '<20>{*}{#e/undyne/14}那就是戰勝你。{^15}{%15}',
         '<20>{*}{#e/undyne/13}人類。艾斯利爾。\n...不，不管你們是誰。{^15}{%15}',
         '<20>{*}{#e/undyne/14}為了讓這星河存續下去...{^15}{%15}',
         '<20>{*}{#e/undyne/15}{@random=1.1/1.1}我，安黛因，\n會將你徹底擊垮！{^15}{%15}'
      ],
      genoCutscene14x: [
         '<20>{#e/undyne/11}不...',
         '<20>{#e/undyne/12}還沒完...！',
         '<20>{#e/undyne/13}大家，\n都需要我來守護！',
         "<20>{#e/undyne/14}我絕不能讓他們失望！"
      ],
      genoCutscene15: [ "<20>{*}{#p/undyne}{#v/1}你們還得再加把勁。{%20}" ],
      genoCutscene15x: [ "<20>{#p/undyne}{#v/1}你們還得再加把勁！{%20}" ],
      genoDeath1: [
         '<20>{#p/undyne}{#v/1}該死...',
         "<20>到頭來...\n連這樣的力量...\n也還是不夠嗎...？",
         '<20>...',
         '<20>{#e/undyne/25}呵...',
         '<20>呵呵呵...'
      ],
      genoDeath2: [
         '<20>{*}{#e/undyne/26}如果你...{^60}{%}',
         "<20>{*}如果你以為\n我會放棄希望，\n那就錯了。{^60}{%}",
         "<20>{*}{#e/undyne/27}因為...\n我有朋友。{^60}{%}",
         '<20>{*}{#e/undyne/28}艾菲斯告訴我，\n如果我失敗了，\n就會啟用備用計畫...{^60}{%}',
         "<20>{*}{#e/undyne/29}現在，\n她已經去通知艾斯戈爾，\n吸收那6個人類靈魂。{^60}{%}"
      ],
      genoDeath3: [ '<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}有了那種力量...{^60}{%}' ],
      genoDeath4: [ '<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}世界...\n勢必會...\n存續下去...！{^60}{%}' ],
      lowStatus1: [ '<32>{#p/story}* 星光閃爍...' ],
      lowStatus2: [ '<32>{#p/story}* 安黛因焦急地翻弄著她的長矛。' ],
      lowStatus3: [ '<32>{#p/story}* 星塵在你面前漂浮閃爍。' ],
      lowStatus4: [ '<32>{#p/story}* 蒸汽在你周圍迴旋著。' ],
      lowStatus5: [ '<32>{#p/story}* 有一瞬，長矛的攻勢停了下來。' ],
      genoStatus1: [ '<32>{#p/asriel2}* 怎麼會...' ],
      genoStatus2: [ '<32>{#p/asriel2}* 不...' ],
      genoStatus3: [ '<32>{#p/asriel2}* 經歷那麼多條時間軸，\n  她也沒...' ],
      genoStatus4: [ "<32>{#p/asriel2}* $(name)，光靠你自己\n  是不夠的。" ],
      genoStatus5: [ '<32>{#p/asriel2}* ...' ],
      trueGenoStatusX: (assistValue: number) =>
         assistValue < 2
            ? [ "<32>{#p/asriel2}* 看她還有什麼本事。" ]
            : [ '<32>{#p/asriel2}* 按計畫行事。' ],
      trueGenoStatus1: [ '<32>{#p/asriel2}* 別走神。' ],
      trueGenoStatus2: [ "<32>{#p/asriel2}* 別讓她得逞。" ],
      trueGenoStatus3: [ '<32>{#p/asriel2}* 繼續攻擊...' ],
      trueGenoStatus4: [ "<32>{#p/asriel2}* 她遲早會完蛋。" ],
      trueGenoStatus5: [ '<32>{#p/asriel2}* 勝利終將屬於我們。' ],
      trueGenoStatusLow1: [ '<32>{#p/asriel2}* 她快死了...！' ],
      trueGenoStatusLow2: [ '<32>{#p/asriel2}* 加把勁！' ],
      asrielExplain: () => [
         ...(battler.volatile[0].vars.azzyAssist < 2
            ? [ "<20>{#p/asriel2}{#f/4}$(name)，\n你的攻擊傷不到她。" ]
            : [
                 "<20>{#p/asriel2}{#f/8}$(name)，你還記得\n上次發生的事情吧？",
                 "<20>{#f/4}你那麼攻擊她，\n但都無濟於事。",
                 '<20>{#f/3}趁剛才那段時間\n我好好想了想。'
              ]),
         "<20>{#f/13}雖說...\n我還不太能駕馭\n這副身體的力量。",
         '<20>{#f/16}但這些力量\n足夠幫你了。',
         "<20>{#f/3}接下來，你先進攻，\n我則會用法術找出\n安黛因盔甲的弱點。",
         "<20>{#f/4}你要瞄準它們，\n逐一突破，不能出錯。",
         '<20>{#f/3}一起加油吧...'
      ],
      neutralFinalStatus: [ '<32>{#p/story}* 安黛因充滿了決心。' ]
   },
   b_opponent_dateundyne: {
      name: '* 安黛因',
      snacker: () =>
         SAVE.data.b.undyne_respecc
            ? [ '<20>{#p/undyne}{#e/undyne/13}希望你能喜歡，\n呋呼呼！' ]
            : [ '<20>{#p/undyne}{#e/undyne/12}趁你還能享受的時候\n盡情享受吧。' ],
      intro: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#p/undyne}{#f/0}... so this is it.',
                 '<20>Our final battle.',
                 '<20>...',
                 '<20>{#e/undyne/12}Warrior to warrior.',
                 '<20>Across the sky of stars.',
                 '<20>I challenge you to a duel...',
                 '<20>{#e/undyne/9}For the honor of EVERYONE ON THE OUTPOST!!',
                 "<20>{#e/undyne/7}IT'S THE ONLY WAY I CAN SETTLE THE SCORE BETWEEN US!!",
                 "<20>{#e/undyne/9}SO COME ON, HIT ME WITH EVERYTHING YOU'VE GOT!!!\nNGAHHHH!!!"
              ]
            : [
                 "<20>{#p/undyne}{#f/0}我被打敗了，\n我的房子也\n完了...",
                 '<20>甚至連和你\n交朋友都做不好。',
                 '<20>...',
                 "<20>{#e/undyne/12}就這樣了。",
                 "<20>我不在乎\n你是不是\n我的客人了。",
                 '<20>{#e/undyne/9}最後比一場，\n雙方都要拿出\n所有力量！！！',
                 "<20>{#e/undyne/7}這是我唯一能夠\n奪回我尊嚴的\n辦法！！！",
                 "<20>{#e/undyne/9}那就來吧！\n全力地攻上來！！！\n嘎啊啊！！！"
              ],
      status1: [ '<32>{#p/story}* 安黛因讓你先出招。' ],
      act_check: [ '<32>{#p/story}* 安黛因 - 攻擊41 防禦21\n* 千真萬確的最終決戰\n  終於開始了！' ],
      idleTalk1: [ "<20>{#p/undyne}{#e/undyne/9}讓我看看\n你的實力吧！" ],
      idleTalk2: [ '<20>{#p/undyne}{#e/undyne/9}快啊！' ],
      idleTalk3: [ "<20>{#p/undyne}{#e/undyne/9}怎麼，\n你怕了嗎？" ],
      idleTalk4: [ "<20>{#p/undyne}{#e/undyne/9}你在等什麼？" ],
      fightTalk: (stronk: boolean) =>
         SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#p/undyne}{#e/undyne/19}哎呀。',
                 '<20>{#e/undyne/19}還真有點疼。',
                 '<20>{#e/undyne/4}呵...',
                 "<20>{#e/undyne/3}我想這就是\n我低估對手的\n下場吧。",
                 "<20>{#e/undyne/0}不過，我不知道\n我為什麼\n這麼驚訝。",
                 '<20>{#e/undyne/1}因為你戰鬥的\n風格。'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/16}啥。',
                 "<20>{#e/undyne/15}這就是你的\n全力...？",
                 ...(SAVE.data.b.oops
                    ? [
                         '<20>{#e/undyne/3}即使你使出了\n全力...',
                         stronk
                            ? "<20>{#e/undyne/33}你也只能\n讓我受點擦傷，\n哈？"
                            : "<20>{#e/undyne/33}你還是無法\n狠下心來\n傷害我，哈？"
                      ]
                    : [ "<20>{#e/undyne/17}你的攻擊\n甚至都沒\n打中我！", '<20>{#e/undyne/17}...' ])
              ],
      flirtTalk0: [
         '<20>{#p/undyne}{#e/undyne/12}當我讓你\n打我的時候...',
         '<20>{#e/undyne/9}我是認真的！'
      ],
      flirtTalk1: [
         '<20>{#p/undyne}{#e/undyne/6}Wh-... no!',
         "<20>{#e/undyne/8}If anyone's got someone's heart, it's...",
         '<20>{#e/undyne/5}Wait, no-\nShut up!!!'
      ],
      flirtTalk2: [
         '<20>{#p/undyne}{#e/undyne/10}Would you STOP THAT!?',
         "<20>{#e/undyne/15}If you keep going like this, I'll...",
         "<20>{#e/undyne/16}I'll..."
      ],
      flirtTalk3: [
         '<20>{#p/undyne}{#p/undyne}{#e/undyne/18}Wha-...\nI...!',
         '<20>{#e/undyne/19}...',
         '<20>{#e/undyne/10}AHHHHHHHHHHHHHH-\nYOU FLIRTATIOUS LITTLE BRAT!',
         '<20>{#e/undyne/8}I HAVE HALF THE NERVE TO...',
         '<20>{#e/undyne/7}TO...',
         '<20>{#e/undyne/7}...'
      ],
      flirtStatus0: [ '<33>{#p/story}* 在這種情況下，\n  戰鬥可能不是個壞主意。' ],
      flirtStatus1: [ '<33>{#p/story}* Something magical is happening.' ],
      flirtStatus2: [ '<32>{#p/story}* Undyne is at her limit.' ],
      flirtText0: [ '<32>{#p/human}* （你向安黛因調情。）' ],
      flirtText1: [ "<32>{#p/human}* (You tell Undyne she's got your heart hook, line, and sinker.)" ],
      flirtText2: [ "<32>{#p/human}* (You commend Undyne on her brave, fighting spirit.)\n* (She's YOUR hero, now.)" ],
      flirtText3: [ "<32>{#p/human}* (You tell Undyne she's a precious, adorable little urchin.)" ],
      cutscene1: [ '<20>{#p/undyne}{#e/undyne/4}呵...\n你知道嗎？' ],
      cutscene2: (fought: boolean) => [
         ...(SAVE.data.b.undyne_respecc
            ? [
                 "<20>{#e/undyne/11}我其實不想\n傷害你。",
                 '<20>{#e/undyne/11}一開始，\n想到要和你\n較量，我很\n興奮...'
              ]
            : [
                 "<20>{#e/undyne/11}我其實也不想\n傷害你。",
                 '<20>{#e/undyne/11}一開始，\n我討厭你那\n矯情的演戲，\n不過...'
              ]),
         ...(fought
            ? SAVE.data.b.undyne_respecc
               ? [ '<20>{#e/undyne/3}但看到你現在\n跟我相處的\n方式，那...' ]
               : SAVE.data.b.oops
               ? [ '<20>{#e/undyne/3}你剛才打我的\n那種方式，\n那...' ]
               : [ '<20>{#e/undyne/3}你剛才沒打中\n我的那種方式，\n它...' ]
            : SAVE.data.b.undyne_respecc
            ? [ '<20>{#e/undyne/3}但看到你現在\n對我的這種\n方式，那...' ]
            : [ '<20>{#e/undyne/3}你剛才對我的\n那種方式，\n那...' ]),
         '<20>{#e/undyne/4}讓我想起了一個\n以前跟我訓練的\n傢伙。',
         ...(SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#e/undyne/11}...你可能\n不像他那樣是個\n軟弱的廢柴。',
                 '<20>{#e/undyne/11}但你們有一個\n共同點...',
                 '<20>{#e/undyne/1}就是對\n戰鬥的意義的\n尊重。'
              ]
            : [
                 "<20>{#e/undyne/11}現在我知道了\n你不只是個\n軟弱的廢柴。",
                 "<20>{#e/undyne/13}你雖然是個\n軟弱的廢柴，\n但是心胸\n寬廣！",
                 '<20>{#e/undyne/4}跟他一樣...'
              ]),
         '<20>{#e/undyne/3}...',
         '<20>{#e/undyne/3}聽好了，人類。',
         '<20>{#f/undyne/0}看來你和\n艾斯戈爾\n命中注定\n難逃一戰。',
         SAVE.data.b.undyne_respecc ? '<20>{#e/undyne/3}不像你...' : '<20>{#e/undyne/3}以我對\n他的了解...',
         "<20>{#e/undyne/4}他大概\n並不想和你\n戰鬥。",
         ...(SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#e/undyne/0}如果可以，\n跟他聊聊。',
                 '<20>{#e/undyne/0}先告訴他你\n想要幹什麼。',
                 '<20>{#e/undyne/3}我知道這\n對你來說可能\n有點奇怪，\n但是...',
                 "<20>{#e/undyne/4}相信你肯定\n能說服他讓你\n回家的。",
                 '<20>{#e/undyne/0}至於我們的\n自由？',
                 '<20>{#e/undyne/1}唉。',
                 '<20>{#e/undyne/3}如果有其他\n不受尊敬的人類\n墜落下來...',
                 "<20>{#e/undyne/3}我再奪取\n他的靈魂就\n好了。"
              ]
            : [
                 '<20>{#f/undyne/0}跟他聊聊。',
                 "<20>{#f/undyne/1}相信你肯定\n能說服他讓你\n回家的。",
                 '<20>{#e/undyne/3}不管多久，\n總會有壞人類\n墜落下來。',
                 "<20>{#e/undyne/3}到時候我再\n奪取他的\n靈魂。"
              ]),
         '<20>{#f/undyne/1}有道理，\n對吧？\n呋呼呼。',
         '<20>{#f/undyne/0}喔對了，\n如果你真的\n傷害了艾斯戈爾...',
         "<20>{#e/undyne/11}我會親自帶上\n那些人類靈魂...\n穿過力場...",
         ...(SAVE.data.b.undyne_respecc
            ? [ '<20>{#e/undyne/8}跟你來一場\n真正的戰鬥！', "<20>{#e/undyne/13}這就是戰士\n該做的，\n對吧？" ]
            : [
                 '<20>{#e/undyne/8}把你揍得\n萬劫不復！',
                 "<20>{#e/undyne/13}這就是\n朋友嘛，對吧？"
              ]),
         '<20>{#e/undyne/13}呋呼呼！',
         "<20>{#e/undyne/13}現在，咱們趕緊\n從這個著火的\n屋子裡出去！"
      ]
   },

   i_artifact: {
      battle: {
         description: '據說這個吊墜是艾羅戈\n本人佩戴過的。',
         name: '神器'
      },
      drop: () => [
         '<32>{#p/human}* （你把神器扔掉了。）',
         ...(!SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

            ? SAVE.data.b.s_state_papsink
               ? [ '<32>{#p/basic}* 狗子跳得更起勁了！' ]
               : [ "<32>{#p/basic}* ...不知為何，\n  狗子不再嘆氣了，" ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (Inscribed with the signature of a former world leader.)' ]
            : [ '<32>{#p/basic}* 據說這個吊墜\n  是艾羅戈本人佩戴過的。' ],
      name: '神器',
      use: () => [
         '<32>{#p/human}* (You use the Legendary Artifact.)',
         ...((battler.active && battler.alive[0].opponent.metadata.reactArtifact) ||
         (game.room === 'f_truth' && // NO-TRANSLATE

            SAVE.data.n.epiphany < 1 &&
            !SAVE.data.b.svr &&
            !world.runaway)
            ? []
            : !SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

            ? SAVE.data.b.s_state_papsink
               ? [ "<32>{#p/basic}* ...不知為何，\n  狗子跳得沒那麼起勁了。" ]
               : [ '<32>{#p/basic}* 狗子的嘆氣更響了！' ]
            : [ '<32>{#p/human}* （什麼都沒發生。）' ])
      ]
   },
   i_epiphany: {
      battle: {
         description: '意志薄弱之人\n將成為你的傀儡。',
         name: '頓悟'
      },
      drop: [ '<32>{#p/human}* （你奮力把捲軸《頓悟》丟了出去。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (A tome from centuries past, used first by a former world leader.)' ]
            : [
                 '<33>{#p/basic}* 意志薄弱之人\n  將成為你的傀儡。\n* 僅在戰鬥中有效。'
              ],
      name: '頓悟',
      use: () =>
         battler.active
            ? []
            : SAVE.data.b.ufokinwotm8
            ? [
                 '<32>{#p/human}* （你展開了捲軸《頓悟》，\n  試圖讓自己感受到擁抱。）',
                 '<32>{#p/human}* （無濟於事。）'
              ]
            : SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你仔細閱讀著\n  捲軸上的古老咒文。）',
                 '<33>* (The text appears to be self- translating.)'
              ]
            : [ '<32>{#p/human}* （你展開了捲軸《頓悟》。）', '<32>{#p/human}* （無事發生。）' ]
   },
   i_astrofood: {
      battle: {
         description: '牙口不好的別吃。',
         name: '甘草糖'
      },
      drop: [ '<32>{#p/human}* （你把甘草糖扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （24 HP。）' ]
            : [ '<32>{#p/basic}* 「甘草糖」 回復24 HP\n* 牙口不好的別吃。' ],
      name: '甘草糖',
      use: [ '<32>{#p/human}* （你咬了甘草糖。）' ]
   },
   i_sap: {
      battle: {
         description: "取材自怪物故園裡的一棵樹。",
         name: '樹膠'
      },
      drop: [ '<32>{#p/human}* （你把樹膠扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （35 HP。）' ]
            : [ '<32>{#p/basic}* 「樹膠」 回復35 HP\n* 取材自怪物故園裡的一棵樹。' ],
      name: '樹膠',
      use: [ '<32>{#p/human}* （你嚼了一塊樹膠。）' ]
   },
   i_goggles: {
      battle: {
         description: '超越現實！\n能為你提供更長的喘息時間。',
         name: 'AR眼鏡'
      },
      drop: [ '<32>{#p/human}* （你把AR眼鏡扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （6防禦。）' ]
            : [ '<32>{#p/basic}* 「AR眼鏡」 （6防禦）\n* 超越現實！\n  能為你提供更長的喘息時間。' ],
      name: 'AR眼鏡',
      use: [ '<32>{#p/human}* （你戴上了AR眼鏡。）' ]
   },
   i_goggles_x: {
      battle: {
         description: '能為你提供稍長的喘息時間。',
         name: 'AR眼鏡？'
      },
      drop: [ '<32>{#p/human}* （你把AR眼鏡扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （4防禦。）' ]
            : [ '<32>{#p/basic}* 「AR眼鏡？」 （4防禦）\n* 超越現實！\n  能為你提供稍長的喘息時間。' ],
      name: 'AR眼鏡？',
      use: [ '<32>{#p/human}* （你戴上了AR眼鏡。）' ]
   },
   i_padd: {
      battle: {
         description: '一個電子記事本。\n能為你提供更長的喘息時間。',
         name: '平板電腦'
      },
      drop: [ '<32>{#p/human}* （你把平板電腦扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （2攻擊。）' ]
            : [ '<32>{#p/basic}* 「平板電腦」 （2攻擊）\n* 一個電子記事本。\n* 能為你提供更長的喘息時間。' ],
      name: '平板電腦',
      use: [ '<32>{#p/human}* （你打開了平板電腦。）' ]
   },
   i_padd_x: {
      battle: {
         description: '能為你提供稍長的喘息時間。',
         name: '平板電腦？'
      },
      drop: [ '<32>{#p/human}* （你把平板電腦扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （0攻擊。）' ]
            : [ '<32>{#p/basic}* 「平板電腦」 （0攻擊）\n* 只能讓你多喘口氣。' ],
      name: '平板電腦？',
      use: [ '<32>{#p/human}* （你打開了平板電腦。）' ]
   },
   i_punchcard: {
      battle: {
         description: '風景如畫...',
         name: '明信片'
      },
      drop: [ '<32>{#p/human}* （你把明信片扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (A perfectly ordinary piece of paper, with no notable attributes.)' ]
            : [ '<32>{#p/basic}* 風景如畫...' ],
      name: '明信片',
      use: () =>
         world.meanie
            ? [
                 '<32>{#p/human}* （你撕碎了明信片。）',
                 battler.active
                    ? `<32>{#p/story}* 你的攻擊力提升了${2 + battler.at_bonus}點！`
                    : '<32>{#p/human}* （無事發生。）'
              ]
            : battler.active
            ? [ '<32>{#p/human}* （你在腦海裡幻想著\n  明信片上面的美景。）\n* （什麼都沒發生。）' ]
            : []
   },
   i_quiche: {
      battle: {
         description: '甜蜜的零食背後，\n是一份甜蜜的責任。',
         name: '芝士蛋糕'
      },
      drop: () => [
         '<32>{#p/human}* （你把芝士蛋糕扔掉了。）',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : [ '<32>{#p/basic}* 短暫獲得主人後，\n  它又被遺棄了。' ]),
         ...(!battler.active &&
         (fetchCharacters()
            .find(c => c.key === 'sans') // NO-TRANSLATE

            ?.position.extentOf(player) ?? 200) < 200
            ? [
                 "<25>{#p/sans}{#f/3}* ...哎呀。\n* 真是遺憾。",
                 "<25>{#p/sans}{#f/2}* 我還希望有人能替我\n  照看它呢。"
              ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （45 HP。）' ]
            : [ '<32>{#p/basic}* 「芝士蛋糕」 回復45 HP\n* 甜蜜的零食背後，\n  是一份甜蜜的責任。' ],
      name: '芝士蛋糕',
      use: () => [
         '<32>{#p/human}* （你吃掉了芝士蛋糕。）',
         ...(!battler.active &&
         (fetchCharacters()
            .find(c => c.key === 'sans') // NO-TRANSLATE

            ?.position.extentOf(player) ?? 200) < 200
            ? [
                 '<25>{#p/sans}{#f/0}* ...喔？\n* 你真把它吃掉了？',
                 '<25>{#p/sans}{#f/2}* 沒想到居然有人會\n  認可我的廚藝。'
              ]
            : [])
      ]
   },
   i_crisp: {
      battle: {
         description: '一包來自星河彼端的薯片。',
         name: '薯片'
      },
      drop: [ '<32>{#p/human}* （你把太空薯片扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （18 HP。）' ]
            : [ '<32>{#p/basic}* 「太空薯片」 回復18 HP\n* 一包來自星河彼端的薯片。' ],
      name: '太空薯片',
      use: [ '<32>{#p/human}* （你吃掉了太空薯片。）' ]
   },
   i_rations: {
      battle: {
         description: '皇家出品，救急精品。',
         name: '口糧'
      },
      drop: [ '<32>{#p/human}* （你把口糧扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （30 HP。）' ]
            : [ '<32>{#p/basic}* 「口糧」 回復30 HP\n* 皇家出品，救急精品。' ],
      name: '口糧',
      use: [ '<32>{#p/human}* （你吃掉了口糧。）' ]
   },
   i_tea: {
      battle: {
         description: '讓你在戰鬥中移動得更快。',
         name: '星雲茶'
      },
      drop: [ '<32>{#p/human}* （你把星雲茶扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [
                 '<33>{#p/basic}* 「星雲茶」 回復15 HP\n* 讓你在戰鬥中移動得更快。\n* 僅在戰鬥中有效。'
              ],
      name: '星雲茶',
      use: () => [
         '<32>{#p/human}* （你將星雲茶一飲而盡。）',
         battler.active ? '<32>{#p/story}* 你的移速提升了1點！' : '<32>{#p/human}* （無事發生。）'
      ]
   },
   i_tzn: {
      battle: {
         description: '很像地球上的豆腐，\n只是更加空靈。',
         name: '太空豆腐'
      },
      drop: [ '<32>{#p/human}* （你把太空豆腐扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （17 HP。）' ]
            : [ '<32>{#p/basic}* 「太空豆腐」 回復17 HP\n* 很像地球上的豆腐，\n  只是更加空靈。' ],
      name: '太空豆腐',
      use: () => [
         '<32>{#p/human}* （你吞下了太空豆腐。）',
         ...(world.meanie
            ? [
                 '<32>* （那味道讓你有種特別的感覺...）',
                 battler.active
                    ? `<32>{#p/story}* 你的攻擊力提升了${4 + battler.at_bonus}點！`
                    : '<32>{#p/human}* （無事發生。）'
              ]
            : [])
      ]
   },
   i_flakes: {
      battle: {
         description: '*終於，一頓像樣的早餐。',
         name: '提米薄片'
      },
      drop: [ '<32>{#p/human}* （你扔掉了提米薄片。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （2 HP。）' ]
            : [ '<32>{#p/basic}* 「提米薄片」回復2 HP\n* 終於，一頓像樣的早餐。' ],
      name: '提米薄片',
      use: [ '<32>{#p/human}* （你吃掉了提米薄片。）' ]
   },
   i_temyarmor: {
      battle: {
         description: 'The things you can do with a college education!',
         name: '提米盔甲'
      },
      drop: [ '<32>{#p/human}* （你把提米盔甲扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （10攻擊，20防禦。）' ]
            : [
                 '<32>{#p/basic}* 「提米盔甲」（10攻擊，20防禦）\n* 大學教育下能做出來的東西！',
                 '<32>* 能為你提供大量的喘息時間...',
                 '<32>* 每回合受傷後回復大量HP...',
                 "<32>* 受到彈幕攻擊時，\n  一定概率轉變為回血效果...",
                 '<32>* 顯著延長攻擊瞄準時間...',
                 '<32>* 它有一切其他物品的功效，\n  並更加強大。'
              ],
      name: '提米盔甲',
      use: [ '<32>{#p/human}* （你穿上了提米盔甲。）' ]
   },
   i_boots: {
      battle: {
         description: '靈活但輕浮，\n想取代飛行器，有點懸。',
         name: '懸浮靴'
      },
      drop: [ '<32>{#p/human}* （你把懸浮靴扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （7攻擊。）' ]
            : [ '<32>{#p/basic}* 「懸浮靴」 （7攻擊）\n* 靈活但輕浮，\n  想取代飛行器，有點懸。' ],
      name: '懸浮靴',
      use: [ '<32>{#p/human}* （你穿上了懸浮靴。）' ]
   },
   i_flight_suit: {
      battle: {
         description: '膽小鬼別穿。',
         name: '飛行服'
      },
      drop: [ '<32>{#p/human}* （你把飛行服扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （10防禦。）' ]
            : [ '<32>{#p/basic}* 「飛行服」 （10防禦）\n* 膽小鬼別穿。' ],
      name: '飛行服',
      use: [ '<32>{#p/human}* （你穿上了飛行服。）' ]
   },
   i_snack: {
      battle: {
         description: "...安黛因的獨家秘方？",
         name: '迷之零食'
      },
      drop: () => [
         '<32>{#p/human}* （你把迷之零食扔掉了。）',
         ...(game.room === 'f_kitchen' // NO-TRANSLATE

            ? ((SAVE.data.b.drop_snack = true),
              [ '<25>{#p/undyne}{#f/8}* 呋呼呼呼！\n* 把零食扔到\n  又冷又硬的地板上！' ])
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [ '<32>{#p/basic}* 「迷之零食」 回復15 HP\n* ...安黛因的獨家秘方？' ],
      name: '迷之零食',
      use: () => [
         '<32>{#p/human}* （你吃掉了迷之零食。）',
         ...(game.room === 'f_kitchen' // NO-TRANSLATE

            ? [
                 SAVE.data.b.undyne_respecc
                    ? '<25>{#p/undyne}{#f/1}* Hope you like it!'
                    : '<25>{#p/undyne}{#f/14}* Hope you like it!'
              ]
            : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : [ '<32>{#p/basic}* 挺脆。' ])
      ]
   },

   n_shop_tem: {
      exit: [ '<32>{#p/tem}{#k/0}* 拜吼！！' ],
      item: (armorprice: number) =>
         SAVE.data.n.plot === 72
            ? [
                 '0G - 免費薄片！！',
                 '0G - 免費薄片！！',
                 '0G - 免費薄片！！',
                 SAVE.data.b.item_temyarmor || temgone()
                    ? '§fill=#808080§---- 售罄 ----'
                    : SAVE.data.b.colleg
                    ? `${armorprice}G - 提咪盔甲！！！`
                    : '1000G - 供提咪上大鞋',
                 '離開'
              ]
            : [
                 '4G - 提咪薄片',
                 '2G - 提咪薄片（促銷，）',
                 '20G - 提咪薄片（粉貴）',
                 SAVE.data.b.item_temyarmor
                    ? '§fill=#808080§---- 售罄 ----'
                    : SAVE.data.b.colleg
                    ? `${armorprice}G - 提咪盔甲！！！`
                    : '1000G - 供提咪上大鞋',
                 '離開'
              ],
      itemInfo: () =>
         SAVE.data.n.plot === 72
            ? [
                 '回復2 HP\n提咪免費的\n食物！！',
                 '回復2 HP\n提咪免費的\n食物！！',
                 '回復2 HP\n提咪免費的\n食物！！',
                 SAVE.data.b.colleg ? '防具：20防禦\n讓戰鬥\n炒雞\n容易！！！' : '大鞋\n提咪追球\n更高級的\n教育'
              ]
            : [
                 '回復2 HP\n提咪的\n食物',
                 '回復2 HP\n提咪的\n促銷\n食物！！',
                 '回復2 HP\n提咪的\n食物\n（粉貴）',
                 SAVE.data.b.colleg ? '防具：20防禦\n讓戰鬥\n炒雞\n容易！！！' : '大鞋\n提咪追球\n更高級的\n教育'
              ],
      itemPrompt: '<09>{#p/tem}{#k/0}你吼！\n歡銀光臨...\n提咪商店！',
      itemPurchase: [
         '<09>{#p/tem}{#k/6}謝謝惠顧！',
         '<09>{#p/tem}{#k/0}fdshfg',
         '<09>{#p/tem}{#k/2}你米有\n足夠噠\n錢錢，',
         "<10>{#p/human}（你帶的\n東西\n太多了。）"
      ],
      itemPurchasePrompt: (free: boolean) => (free || temgone() ? '偷走嗎？' : '花$(x)G\n買它嗎？'),
      itemSellPrompt: '出$(x)G\n賣掉它嗎？',
      itemUnavailable: () => (temgone() ? '<09>{#p/basic}空無一物。' : '<09>{#p/tem}{#k/2}米有\n東西啦...'),
      itemRestricted: '<09>{#p/tem}{#k/2}這個我\n不收...',
      menu: () =>
         temgone() ? [ '拿取', '偷竊', '閱讀', '離開' ] : [ '購買', world.meanie ? '偷竊' : '出售', '交談', '離開' ],
      menuPrompt1: '<23>{#p/tem}{#k/0}* 你吼！\n* 歡銀光臨...\n* 提咪商店！！！',
      menuPrompt2: '<23>{#p/basic}* ...但是大家都逃走了。',
      sell1: [ '<30>{#p/tem}{#k/2}* 別哇！！！\n* 我滴錢錢，，，', '<30>{#p/tem}{#k/4}* 不許偷錢！！！' ],
      sell2: [ '<30>{#p/tem}{#k/3}* 沒門。' ],
      steal1: [ '<30>{#p/human}* （你從櫃檯後面拿走了32767G。）' ],
      steal2: [ '<30>{#p/basic}* 空無一物。' ],
      note: [ '<32>{#p/human}* （沒有字條。）' ],
      talk: () => [
         SAVE.data.n.plot === 72 ? '好訊息' : '打招呼',
         SAVE.data.n.plot === 72 ? '未來發展' : SAVE.data.b.colleg ? '關於提米盔甲' : '介紹下自己',
         SAVE.data.n.plot === 72 ? '提米的秘密' : '提米的歷史',
         '關於這個商店',
         '離開'
      ],
      talkPrompt: '<09>{#p/tem}{#k/0}你吼！！！\n我素提米',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#k/0}* yAYA!', '<32>{#p/tem}{#k/0}* tem go to NEW WORLDS!!!' ]
               : [ '<32>{#p/tem}{#k/0}* 你吼！！！', "<32>* 我素提米" ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#k/0}* yAYA!', '<32>{#p/tem}{#k/0}* tem go to NEW WORLDS!!!' ]
               : SAVE.data.b.colleg
               ? [
                    '<32>{#k/1}* 提咪盔甲太太吼了！\n* 任何戰鬥都變噠！\n* 炒雞容易勝利！！！',
                    '<32>{#k/4}* 但，哼嗯嗯嗯，提咪想...\n* 如果尼用了盔甲，\n  戰鬥就卜再有挑戰性了，',
                    '<32>{#k/3}* 但提咪...\n* 有一個姐決番案。',
                    '<32>{#k/6}* 提咪會提供...\n* 一份{@fill=#ff0}獎鞋金{@fill=#fff}！',
                    '<32>{#k/3}* 如果尼{@fill=#ff0}輸了好多戰鬥{@fill=#fff}，\n  提咪就費{@fill=#ff0}降低價格{@fill=#fff}！',
                    ...(armorprice() <= 1000
                       ? [
                            '<32>{#k/1}* in fack...\n* PRICE MAY ALREADY BE LOWERS!!!\n* WOA!!!!',
                            '<32>{#k/6}* Congra-tem-lations!!!'
                         ]
                       : [
                            '<32>{#k/3}* 所以如果你陷入了吼難的\n  戰逗中覺得好灰森啊，\n  那你就可以買下提咪盔甲\n  作為你的救命稻草！',
                            '<32>{#k/5}* 但提咪盔甲太吼了，\n* 答應窩一定在真的需要的\n  時候才買吼，'
                         ])
                 ]
               : [ '<32>{#p/tem}{#k/0}* 你吼！！！', "<32>* 我素提米" ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/tem}{#k/0}* at back of famus statue, can find SPECIL SWITCH,',
                    '<32>{#p/tem}{#k/0}* and SWITCHs...\n* come wif RIDDLES!',
                    SAVE.data.b.colleg
                       ? '<32>{#p/tem}{#k/2}* even after colleg, tem don know what it means,,,'
                       : '<32>{#p/tem}{#k/0}* tem don know what it means,,,',
                    '<32>{#p/tem}{#k/1}* but mayb humans can solve!!\n* yAYA!!'
                 ]
               : SAVE.data.b.colleg
               ? [
                    "<32>{#p/tem}{#k/0}* 嚎吖！\n* 提咪獲得惹提米學的學位！\n* 提咪現在可以告訴你全部\n  提咪的深遠歷史了！！！"
                 ]
               : [ '<32>{#p/tem}{#k/0}* 我們提咪有著\n  粉深遠的歷史！！！' ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#k/0}* yaYA!!!\n* wil close TEM SHOP soon!!!' ]
               : [ '<32>{#p/tem}{#k/0}* 嚎吖！！！\n* 去提咪商店吧！！！' ]
      ],
      colleg1: [
         '<32>{#p/tem}{#k/1}* 哇嗷！！',
         '<32>{#k/2}* 介麼多錢錢...\n* 提咪尊的可以收下麼...',
         '<32>{#k/6}* 好噠！！！！\n* 提咪要去上大鞋然後\n  讓尼感到驕傲！！！'
      ],
      colleg2: [
         '<32>{#p/tem}* 提咪從大鞋回來了，',
         '<32>{#k/0}* 提咪學會啦好多東東，\n* 學會賣新道具辣！\n* 嚎吖！！！'
      ],
      sellExit: '離開',
      sellValue: '$(x)G',
      sellStory1: () => [
         '<32>{#p/tem}{#k/1}* 哇嗷！！',
         '<32>{#k/2}* 尼帶著... $(x)！！！',
         SAVE.data.b.colleg
            ? '<32>{#k/4}* 哼嗯嗯嗯....\n* 我炒雞想要辣個$(x)...\n* 但我還要攢研究僧鞋費，'
            : '<32>{#k/4}* 哼嗯嗯嗯....\n* 我炒雞想要辣個$(x)...\n* 但我還要攢大鞋鞋費，',
         '<32>{#k/5}* 哼嗯嗯嗯嗯....！！！\n* 提咪一直都想要個$(x)...！'
      ],
      sellStory2: [ '<32>{#p/tem}{#k/2}* 但.. 但是...', '<32>{#k/4}* 卟！！！！！！！！！！！！' ],
      sellStory3: () =>
         SAVE.data.b.colleg
            ? [
                 "<32>{#p/tem}{#k/3}* Is this a joke?\n* Are you having a laugh?\n* Ha ha, very funny.\n* I'm the one with a degree."
              ]
            : [ "<32>{#p/tem}{#k/3}* 你會後悔的。" ],
      zeroPrompt: '<09>{#p/basic}...'
   },
   n_shop_tortoise: {
      exit: () =>
         world.runaway
            ? []
            : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? [ '<32>{#p/basic}{#k/1}* 可算走了。' ]
            : [ '<32>{#p/basic}{#k/0}* 在外面小心點，孩子！' ],
      item: () =>
         world.runaway
            ? [ '0G - 平板電腦？', '0G - AR眼鏡？', '0G - 星雲茶', '0G - 樹膠', '離開' ]
            : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? [ '45G - 平板電腦？', '45G - AR眼鏡？', '16G - 星雲茶', '25G - 樹膠', '離開' ]
            : SAVE.data.n.plot === 72
            ? [
                 SAVE.data.b.item_padd ? '25G - 平板電腦？' : '35G - 平板電腦',
                 SAVE.data.b.item_goggles ? '25G - AR眼鏡？' : '35G - AR眼鏡',
                 '5G - 星雲茶',
                 '5G - 樹膠',
                 '離開'
              ]
            : [
                 SAVE.data.b.item_padd ? '45G - 平板電腦？' : '55G - 平板電腦',
                 SAVE.data.b.item_goggles ? '45G - AR眼鏡？' : '55G - AR眼鏡',
                 '16G - 星雲茶',
                 '25G - 樹膠',
                 '離開'
              ],
      itemInfo: () => [
         SAVE.data.b.item_padd ||
         world.genocide ||
         world.killed0 ||
         startonATE() ||
         SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? '武器：0攻擊\n(當前攻擊$(x))\n只能讓你\n多喘口氣。'
            : '武器：2攻擊\n(當前攻擊$(x))\n提供更長的\n喘息時間。',
         SAVE.data.b.item_goggles ||
         world.genocide ||
         world.killed0 ||
         startonATE() ||
         SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? '防具：4防禦\n(當前防禦$(x))\n只能讓你\n多喘口氣。'
            : '防具：6防禦\n(當前防禦$(x))\n提供更長的\n喘息時間。',
         '回復15 HP\n能在戰鬥中\n移動得更快。',
         '回復35 HP\n取材自\n真正的樹。'
      ],
      itemPrompt: () =>
         world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? "<09>{#p/basic}{#k/3}別指望\n我會打折。"
            : "<09>{#p/basic}{#k/4}想買些\n啥呢？",
      itemPurchase: () =>
         world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? [
                 '<09>{#p/basic}{#k/1}拿這個。',
                 '<09>{#p/basic}{#k/1}...',
                 "<09>{#p/basic}{#k/3}咋了？\n這點錢\n都付不起？",
                 "<10>{#p/human}（你帶的\n東西\n太多了。）"
              ]
            : [
                 '<09>{#p/basic}{#k/0}謝謝惠顧！\n哇哈哈。',
                 '<09>{#p/basic}{#k/2}想好了\n再買喔。',
                 "<09>{#p/basic}{#k/4}你的錢\n還不太夠。",
                 "<10>{#p/human}（你帶的\n東西\n太多了。）"
              ],
      itemPurchasePrompt: () => (world.runaway ? '偷走嗎？' : '花$(x)G\n買它嗎？'),
      menu: () =>
         world.runaway ? [ '拿取', '偷竊', '閱讀', '離開' ] : [ '購買', world.meanie ? '偷竊' : '出售', '交談', '離開' ],
      menuPrompt1: () =>
         SAVE.data.n.plot === 72
            ? '<23>{#p/basic}{#k/0}* 哇哈哈！\n* 我果然沒看錯你！'
            : "<23>{#p/basic}{#k/0}* 來瞧瞧！\n* 我這有不少物美價廉的\n  廢品打算賣呢。",
      menuPrompt2: () =>
         SAVE.data.n.plot === 72 ? '<23>{#p/basic}{#k/0}* 哇哈哈。' : "<23>{#p/basic}{#k/0}* 別見外喔。",
      menuPrompt3: () =>
         world.genocide
            ? "<23>{#p/basic}{#k/3}* 你們幾個還想去哪？\n* 等等，當我沒問。\n  你們去哪，關我什麼事呢？"
            : '<24>{#p/basic}{#k/2}* 哇哈哈...\n* 您來啦。\n* 好一個禍亂滔天啊！',
      menuPrompt4: '<23>{#p/basic}* ...但是大家都逃走了。',
      note: [ '<32>{#p/human}* （但沒有人給你留字條。）' ],
      sell1: () =>
         world.runaway
            ? [ '<30>{#p/human}* （你從櫃檯後面拿走了1394G。）' ]
            : world.genocide
            ? [
                 '<30>{#p/basic}{#k/4}* 哇哈哈...',
                 '<30>{#k/3}* 呵，先是把別人靈魂據為己有，\n  現在又想用同樣的手段\n  偷我的東西？',
                 "<30>{#k/4}* 我建議你\n  最好不要得寸進尺。"
              ]
            : world.meanie
            ? [
                 "<30>{#p/basic}{#k/2}* 哎呀，孩子。\n* 你知道這些東西\n  是要花錢的吧？",
                 "<30>{#k/3}* 也許對你來說\n  它們只是廢品，\n  但對我來說絕非如此！"
              ]
            : [
                 "<30>{#p/basic}{#k/2}* 哈！\n* 我是賣廢品的，\n  不是收廢品的！",
                 "<30>{#k/3}* 不過，如果你想賣點東西，\n  我有個好主意，\n  去提米商店那裡看看吧。",
                 '<30>{#k/0}* 你問它在哪？',
                 '<30>{#k/4}* ...',
                 "<30>{#k/0}* 想不起來了。"
              ],
      sell2: () =>
         world.runaway
            ? [ '<30>{#p/basic}* 空無一物。' ]
            : world.genocide || world.meanie
            ? [ "<30>{#p/basic}{#k/1}* I wouldn't give up my gilded treasures at phaser-point." ]
            : [ "<30>{#p/basic}{#k/0}* 我再說最後一遍，\n  我不收！" ],
      talk: () =>
         SAVE.data.n.plot === 72
            ? [
                 '艾斯戈爾',
                 '新家園',
                 '托麗爾',
                 SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                    ? '§fill=#ff0§握手'
                    : '我是英雄嗎',
                 '離開'
              ]
            : world.genocide
            ? [ '艾斯利爾', '（威脅他）', '（揍他）', '安黛因', '離開' ]
            : world.killed0 || startonATE()
            ? [ '你的下場', '（威脅他）', '（揍他）', '誰是英雄', '離開' ]
            : [
                 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                    ? '介紹下自己'
                    : [ '介紹下自己', '§fill=#ff0§那場戰爭（新）', '§fill=#ff0§退休生活（新）', '退休生活' ][
                         Math.min(SAVE.data.n.shop_gerson, 3)
                      ],
                 [ '故園生活', '§fill=#ff0§你的家人（新）', '§fill=#ff0§艾羅戈（新）', '艾羅戈' ][
                    Math.min(SAVE.data.n.shop_homeworld, 3)
                 ],
                 '鑄廠',
                 SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                    ? '安黛因'
                    : SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                    ? '§fill=#ff0§握手'
                    : '聊聊安黛因',
                 '離開'
              ],
      talkPrompt: () =>
         world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? '<09>{#p/basic}{#k/2}是嗎？\n就你\n還想聊天？'
            : '<09>{#p/basic}{#k/0}你想知道點\n啥呢？',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}{#k/0}* Ol' King Fluffybuns, eh?\n* Now there's someone I know.",
                    "<32>{#k/2}* I'll say this, I had no clue about what he was doing with those humans until today!",
                    "<32>{#k/3}* I don't know how he kept such a secret for so long...",
                    "<32>{#k/0}* Especially since everyone woulda been fine with it if he told 'em before.",
                    "<32>{#k/0}* I've adopted one of the humans myself, actually.",
                    "<32>{#k/2}* They're asleep in their box, just outside the shop.\n* What an adorable little fella!",
                    "<32>{#k/0}* Asgore says they'll wake up once their body adjusts to the real world or whatever.",
                    '<32>{#k/3}* ... huh?\n* You want to know if Asgore can be your father?',
                    "<32>{#k/0}* Well, I don't see why not!",
                    "<32>{#k/0}* I'm sure he'd be happy to have you living with him.",
                    "<32>{#k/2}* It'd probably be good for him!\n* Wa ha ha."
                 ]
               : world.genocide
               ? [
                    '<32>{#p/basic}{#k/1}* You wanna know my thoughts on Asriel?',
                    '<32>{#k/0}* ...\n* He was a good kid.',
                    '<32>{#k/3}* And if he was still alive, he woulda made a great king.',
                    "<32>{#k/4}* As for what you got there standin' in front of me, well, it's not him.",
                    '<32>{#k/0}* It looks like him, talks like him, even has his damned adorable face... bless that kid.',
                    '<32>{#k/3}* But that SOUL... being this close to you, the resemblance is unmistakable.',
                    "<32>{#k/1}* How'd it feel taking the SOUL of your own mother, boy?",
                    '<32>{#k/0}* I wonder.'
                 ]
               : world.killed0 || startonATE()
               ? [
                    '<32>{#p/basic}{#k/0}* 很久以前，國王和我都認為\n  逃脫這裡是沒有意義的...',
                    '<32>{#k/1}* 一旦我們出去，\n  立刻就會被人類給宰了。',
                    "<32>{#k/3}* 後來他改變主意時，\n  我還有點被背叛的感覺。",
                    '<32>{#k/4}* 但現在，我覺得...\n* 或許他是對的。',
                    "<32>{#k/0}* 畢竟，就算我們不曾離開這裡...",
                    "<32>{#k/3}* 某個人類還是會殺掉我們，\n  我說的對吧？"
                 ]
               : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
               ? [
                    "<32>{#p/basic}{#k/0}* Eh, there's really not much to say about me.",
                    '<32>{#k/0}* I do my best to live my life...',
                    '<32>{#k/4}* Help those around me in ways that I can.',
                    '<32>{#k/0}* The thing of it is, we live in dangerous times.',
                    "<32>{#k/3}* If the wrong human were to stumble on our little outpost, we'd be as good as gone..."
                 ]
               : [
                    [
                       "<32>{#p/basic}{#k/0}* 我已經活了很久了。\n* 也許太久了。",
                       '<32>{#k/3}* 想當年，\n  人們稱我為「正義之劍」。',
                       '<32>{#k/2}* 那時，\n  我還是行星理事會的主席。',
                       "<32>{#k/1}* ...要不是那場該死的戰爭，\n  我今天可能還在那個位置上。"
                    ],
                    [
                       '<32>{#p/basic}{#k/0}* 啊，是啊，就是那場戰爭。\n* 那場戰爭，\n  給我，給這裡每個人\n  都帶來了難以磨滅的創傷。',
                       "<32>{#k/4}* 每隔一段時間，\n  我們會收到報告...\n* 上面，全是為了保護家園\n  而壯烈犧牲的烈士。",
                       "<32>{#k/1}* 我至今還記得，小毛球國王\n  將一封封噩耗告知烈士家屬時，\n  他臉上的神情...",
                       "<32>{#k/1}* 眼神空洞，目光呆滯...\n* 孩子，這就是戰爭\n  給人帶來的影響。",
                       "<32>{#k/3}* 所以，我就退休了。"
                    ],
                    [
                       '<32>{#p/basic}{#k/3}* 我的退休生活？',
                       "<32>{#k/2}* 哇哈哈！\n* 可謂是「逍遙自在」啊！",
                       "<32>{#k/4}* 也許那些在空境工作的員工\n  根本看不上這間破屋...",
                       "<32>{#k/2}* ...但關我啥事？\n  我又不用跟他們比。",
                       '<32>{#k/0}* 能有這些或英勇、或古怪、\n  或有點害羞的鄰居，\n  我就已經知足。',
                       '<32>{#k/0}* 這也許並非我夢想的生活，\n  但人生在世，就該隨遇而安嘛。'
                    ],
                    [
                       '<32>{#p/basic}{#k/3}* 想讓我再重複一遍嗎？',
                       "<32>{#k/4}* 哇哈哈...\n  恐怕，你得回溯時間了。",
                       "<32>{#k/2}* 就連我自己\n  都忘了剛才說過啥了！"
                    ]
                 ][Math.min(SAVE.data.n.shop_gerson++, 3)],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#k/3}* A whole new world...',
                    "<32>{#k/0}* Boy, I never thought I'd see the day.",
                    "<32>{#k/3}* Dr. Alphys told everyone she'd started scanning for new worlds...",
                    "<32>{#k/0}* Then, just a short time ago, she said she'd found one.",
                    "<32>{#k/0}* It's called Eurybia.\n* Don't know much else about it beyond that.",
                    "<32>{#k/1}* All I can be sure of is that it'll be better than this place.",
                    "<32>{#k/3}* That's not to say I won't miss it.",
                    "<32>{#k/0}* I've lived through the entire period of monster captivity...",
                    '<32>{#k/0}* Leaving it so soon almost seems like a crime.'
                 ]
               : world.genocide || world.killed0 || startonATE()
               ? [
                    "<32>{#p/basic}{#k/3}* 我經歷了太多歲月，\n  不會怕你這種東西。",
                    '<32>{#k/2}* 來試試啊，小子！',
                    "<32>{#k/1}* ...我知道你在這沒法戰鬥。",
                    "<32>{#k/4}* 哇哈...\n* 博識是我長壽的原因之一。"
                 ]
               : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}{#k/2}* The homeworld, eh?',
                    '<32>{#k/0}* Look, kiddo.',
                    "<32>{#k/0}* All I'll say about the homeworld is that it was a nice place.",
                    "<32>{#k/4}* A place where people didn't have to worry...",
                    '<32>{#k/1}* ... about seeing those they care about be killed in front of their very eyes.',
                    "<32>{#k/0}* So, to summarize, it's not really a place you'd fit into.",
                    '<32>{#k/1}* Any questions?'
                 ]
               : [
                    [
                       "<32>{#p/basic}{#k/0}* 故園生活啊...\n* 嗯... 首先，故園是有名字的。\n  叫做克裡烏斯。",
                       '<33>{#k/3}* 我自己在城外一個\n  寧靜的小鎮中長大。\n* 嗯，應該還算寧靜。',
                       '<32>{#k/4}* 每隔幾天，學校裡的孩子們\n  就會組織單車競速比賽。',
                       "<32>{#k/0}* 有時候天公不作美，\n  但他們一點都不在乎。\n* 甚至，壞天氣還讓比賽\n  變得更刺激，更有趣了。",
                       '<32>{#k/0}* 那時，我還是個小毛孩，\n  和家人參加過好多次競速比賽。',
                       "<32>{#k/0}* 你別誤會。\n* 「雷霆蝸牛」是很好玩，\n  但那可不是一回事。"
                    ],
                    [
                       "<32>{#p/basic}{#k/3}* 我的家人？\n* 呃，沒什麼太多可說的。\n* 父母對我很好，\n  還有幾個兄弟姐妹。",
                       '<32>{#k/0}* 有一天，\n  艾羅戈國王來我們小鎮。\n* 在一場競速比賽中，\n  我和他碰面了。',
                       "<32>{#k/0}* 我只是個不起眼的鄉巴佬，\n  但他從我身上看到了別的東西，\n  那是某種特質...",
                       '<32>{#k/4}* 一來二去，\n  我小小年紀就離開了家人。',
                       "<32>{#k/3}* ...那次一別，\n  此後就再也沒能見到家人。"
                    ],
                    [
                       '<32>{#p/basic}{#k/0}* 艾羅戈，我們故園\n  上一個偉大時代的國王。',
                       "<32>* 我相信你一定讀過他的故事。",
                       ...(SAVE.storage.inventory.has('artifact') // NO-TRANSLATE

                          ? [ "<32>{#k/2}* 如果你沒讀過，\n  那你怎麼拿著他的吊墜！？" ]
                          : [
                               "<32>{#k/2}* 如果你沒讀過，\n  難不成你活的這麼長時間\n  都是在外星過的嗎！？"
                            ]),
                       '<32>{#k/3}* 在他的統治下，\n  怪物一族發展到了現在的盛況。\n* 可能有點太盛了。',
                       '<32>{#k/0}* 他第一次見到人類的時候\n  很高興...\n  但不是為他自己而高興。',
                       "<32>{#k/1}* 喏，是他兒子的願望。\n* 那可憐的孩子不僅完全\n  得到了他想要的，\n  還得到了更多..."
                    ],
                    [
                       "<32>{#p/basic}{#k/3}* 抱歉，我不想談太多\n  這個話題了。",
                       "<32>{#k/1}* 小毛球國王可不想讓你\n  背負那樣的重擔。"
                    ]
                 ][Math.min(SAVE.data.n.shop_homeworld++, 3)],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#k/0}* Toriel?\n* She came through here not too long ago, actually.',
                    '<32>{#k/1}* Said she needed time to herself.',
                    "<32>{#k/3}* Well, y'know what?\n* I figure she's had enough time by now.",
                    '<32>{#k/0}* You can find her in the trash depository past the ladder in the room nearby.',
                    "<32>{#k/3}* I'm pretty sure I know what's got her so pre-occupied..."
                 ]
               : world.genocide || world.killed0 || startonATE()
               ? 48 <= SAVE.data.n.plot
                  ? [
                       [
                          '<32>{#p/basic}{#k/3}* 呃？\n* 和你打架？',
                          "<32>{#k/1}* 不...我不是個英雄。\n* 不再是了。",
                          "<32>{#k/0}* And b'sides...\n* You may have spared Undyne, but everyone else is still dead.",
                          "<32>{#k/4}* I'm better off holding my ground right where I am..."
                       ],
                       [
                          '<32>{#p/basic}{#k/3}* 呃？\n* 和你打架？',
                          "<32>{#k/1}* 不...我不是個英雄。\n* 不再是了。",
                          "<32>{#k/3}* And b'sides...\n* People seem to go missing after they run into you.",
                          "<32>{#k/4}* I'll take that as an omen to stay right where I am..."
                       ],
                       [
                          '<32>{#p/basic}{#k/3}* 呃？\n* 和你打架？',
                          "<32>{#k/1}* 不...我不是個英雄。\n* 不再是了。",
                          "<32>{#k/0}* And b'sides...\n* After what you did to Undyne, I know I don't stand a chance.",
                          "<32>{#k/4}* I'm better off holding my ground right where I am..."
                       ]
                    ][world.genocide ? 2 : SAVE.data.n.state_foundry_undyne]
                  : [
                       '<32>{#p/basic}{#k/3}* 呃？\n* 和你打架？',
                       "<32>{#k/1}* 不...我不是個英雄。\n* 不再是了。",
                       "<32>{#k/0}* 更何況...\n* 我這身老骨頭也沒法再打了。",
                       "<32>{#k/1}* 你打一下，我可能...就...",
                       "<32>{#k/4}* 至少跟你說話這時候，\n  我給他們爭取了足以逃走的時間。"
                    ]
               : postSIGMA()
               ? [
                    '<32>{#p/basic}{#k/3}* 你想了解鑄廠？\n* 這個破地方？',
                    "<32>{#k/3}* Well, recently, we've been having some electricity problems...",
                    "<32>{#k/0}* Though I'm sure it's nothing the Foundry crew can't sort out.",
                    "<32>{#k/2}* Those folks can't get enough of their engineering jobs!"
                 ]
               : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
               ? [
                    [
                       '<32>{#p/basic}{#k/3}* 你想了解鑄廠？\n* 這個破地方？',
                       "<32>{#k/3}* 嗯，這是個大家經常迷路...",
                       '<32>{#k/3}* 或者被拋棄的地方...',
                       "<32>{#k/2}* 孩子，我真希望這種事情\n  不會發生在你身上。"
                    ],
                    [
                       '<32>{#p/basic}{#k/3}* 你想了解鑄廠？\n* 這個破地方？',
                       "<32>{#k/0}* 唉，這地方從來都\n  稱不上友好...",
                       '<32>{#k/3}* 從人類把我們死死逼到這裡來，\n  到最近我們失去鬥志...',
                       "<32>{#k/3}* 這裡只有厄運啊，孩子。"
                    ]
                 ][SAVE.data.n.state_foundry_undyne - 1]
               : [
                    '<32>{#p/basic}{#k/3}* 你想了解鑄廠？\n* 這個破地方？',
                    '<32>{#k/2}* 回想我們剛被困在這裡時，\n  這裡就是前哨站！',
                    '<32>{#k/0}* 所有後來添加的花哨部分\n  都是由我們這些怪物建造的。',
                    "<32>{#k/0}* 事實證明，\n  大多數人都不喜歡活在過去。\n* 確實在理。",
                    "<32>{#k/2}* 但是... 我只是覺得\n  改造這個地方太安逸了。",
                    "<32>{#k/3}* 是人類把我們困在這裡，\n  希望我們在黑暗中腐爛受苦。",
                    "<32>{#k/0}* 但看看現在的我們。\n* 看看我們把這裡\n  變成了自己的地盤。",
                    "<32>{#k/2}* 哇哈哈！\n* 得讓他們知道知道，\n  誰才是老大！"
                 ],
         () =>
            SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
               ? ((SAVE.data.b.c_state_secret2_used = true),
                 [
                    '<32>{#p/basic}{#k/3}* What?\n* Where on Krios did you learn THAT handshake?',
                    "<32>{#k/2}* I haven't shown anyone that routine in years!",
                    '<32>{#k/0}* Wa ha ha... but I think I know where ya learned it from.',
                    '<32>{#k/0}* Long time ago, a human came here... me and them became good friends.',
                    ...(SAVE.data.n.plot === 72
                       ? [
                            "<32>{#k/3}* Maybe we still are.\n* I'll have to ask 'em when they wake up.",
                            "<32>{#k/4}* I've only just adopted the little rascal...",
                            '<32>{#k/0}* They seem pretty tired after all that archive business.',
                            '<32>{#k/3}* Imagine...\n* Living in a virtual world...',
                            '<32>{#k/2}* If you die in the simulation, do you die in real life?',
                            "<32>{#k/0}* Eh, never mind.\n* It doesn't matter now, anyway."
                         ]
                       : [ "<32>{#k/3}* I wonder what they're up to now..." ])
                 ])
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#k/0}* Frisk, I could talk about you all day after what you did.',
                    '<32>{#k/4}* Risking your life, facing down a godlike being just to save us...',
                    "<32>{#k/3}* The words strong enough to do it justice don't exist.",
                    '<32>{#k/0}* I think, sometime in your future, if you really wanted it...',
                    '<32>{#k/0}* You could lead the monster race yourself, as ruler.',
                    '<33>{#k/2}* Everyone would follow you.\n* Even this old coot!',
                    "<32>{#k/0}* You're a real hero, kid."
                 ]
               : 48 <= SAVE.data.n.plot
               ? world.genocide
                  ? [
                       [
                          "<32>{#p/basic}{#k/1}* I take it you've killed her by now?",
                          '<32>{#k/1}* ...',
                          '<32>{#k/3}* Then why ask me...',
                          '<32>{#k/3}* Unless...',
                          "<32>{#k/2}* You just wanna get my reaction, don'tcha?",
                          '<32>{#k/4}* ...',
                          '<32>{#k/4}* How about... nah.'
                       ],
                       [
                          '<32>{#p/basic}{#k/1}* I get it, guys.',
                          "<32>{#k/1}* She's dead.",
                          "<32>{#k/3}* You expectin' me to throw a party for you or somethin'?",
                          '<32>{#k/1}* Get outta my sight.'
                       ]
                    ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                  : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                  ? [
                       '<32>{#p/basic}{#k/1}* ...',
                       "<32>{#k/1}* You've got a real twisted sense of humor, kiddo.",
                       '<32>{#k/3}* Killing her in front of me like that...',
                       "<32>{#k/1}* You're lucky I don't walk out there and kill you myself."
                    ]
                  : world.killed0 || startonATE()
                  ? [
                       [
                          '<32>{#p/basic}{#k/4}* 安黛因？',
                          49 <= SAVE.data.n.plot
                             ? '<32>{#k/4}* She passed through here earlier...'
                             : '<32>{#k/4}* She just passed through here a few moments ago.',
                          '<32>{#k/0}* Said she\'d \"given up\" on tryin\'a capture you.',
                          '<32>{#k/4}* ...',
                          '<32>{#k/4}* What happened back there...?'
                       ],
                       [
                          '<32>{#p/basic}{#k/3}* 安黛因？',
                          "<32>{#k/0}* I haven't heard from her in a while.",
                          '<32>{#k/4}* She just kinda... disappeared.',
                          '<32>{#k/3}* Was that your doing?'
                       ],
                       [
                          [
                             '<32>{#p/basic}{#k/1}* ...',
                             '<32>{#k/1}* You killed her, just like you killed everyone else.',
                             "<32>{#k/3}* Granted, she wasn't intent on letting YOU live...",
                             "<32>{#k/1}* But don't act like this was just self-defense for you.",
                             '<32>{#k/3}* Wa ha...\n* I know you better than that.'
                          ],
                          [ '<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* What more is there to say?' ]
                       ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                    ][SAVE.data.n.state_foundry_undyne]
                  : [
                       2 <= SAVE.data.n.plot_date
                          ? SAVE.data.b.undyne_respecc
                             ? [
                                  '<32>{#p/basic}{#k/4}* So you and her had a good time, eh?',
                                  '<32>{#k/2}* 哇哈哈！',
                                  "<32>{#k/0}* You've really made a good impression on her, kiddo!"
                               ]
                             : [
                                  '<32>{#p/basic}{#k/4}* 所以你們現在...\n  是朋友了？',
                                  '<32>{#k/2}* 哇哈哈！',
                                  "<32>{#k/0}* 你做了我從沒想過的事，\n  孩子！"
                               ]
                          : [
                               [
                                  '<32>{#p/basic}{#k/4}* 安黛因？',
                                  49 <= SAVE.data.n.plot
                                     ? '<32>{#k/4}* She passed through here earlier...'
                                     : '<32>{#k/4}* She just passed through here a few moments ago.',
                                  SAVE.data.b.undyne_respecc
                                     ? '<32>{#k/0}* Said she was proud to have fought an \"honorable\" human.'
                                     : '<32>{#k/0}* Said she was \"done\" tryin\'a capture you.',
                                  '<32>{#k/4}* ...',
                                  '<32>{#k/4}* The heck did you do to make her say THAT?'
                               ],
                               [
                                  "<32>{#p/basic}{#k/4}* If you're askin' me where to find her, she's at home.\n* Ain't but a few steps away.",
                                  '<32>{#k/3}* From her words to me before...',
                                  SAVE.data.b.undyne_respecc
                                     ? '<32>{#k/4}* It seems you two are on better terms than I thought.'
                                     : '<32>{#k/4}* It seems you two have some things to work out.'
                               ]
                            ][Math.min(SAVE.data.n.shop_deadfish++, 1)],
                       [
                          '<32>{#p/basic}{#k/3}* 安黛因？',
                          "<32>{#k/0}* I haven't heard from her in a while.",
                          '<32>{#k/4}* She just kinda... disappeared.',
                          '<32>{#k/1}* Something tells me you played a part in that...'
                       ],
                       [
                          [
                             '<32>{#p/basic}{#k/4}* ...',
                             '<32>{#k/0}* Well... you killed her.',
                             "<32>{#k/3}* Though, that's kinda her own doing.",
                             '<32>{#k/4}* I never really got why she was so intent on killing you humans...',
                             "<32>{#k/0}* If she wanted your SOUL, couldn't she just wait until you died naturally?"
                          ],
                          [ '<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* What more is there to say?' ]
                       ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                    ][SAVE.data.n.state_foundry_undyne]
               : world.genocide
               ? [
                    "<32>{#p/basic}{#k/0}* Undyne?\n* Oh, that poor little urchin.\n* Normally, I'd call her the hero...",
                    "<32>{#k/1}* But to be honest, I've seen what you've done.\n* She doesn't stand a chance.",
                    "<32>{#k/4}* Don't get me wrong, she'll give ya one hell of a fight.",
                    '<32>{#k/3}* But no... the outpost needs a different kinda hero now.',
                    "<32>{#k/3}* Someone that doesn't operate on brawn and bravado...",
                    "<32>{#k/3}* Someone that doesn't see the universe like everyone else...",
                    "<32>{#k/0}* Wa ha ha.\n* I don't doubt someone like that will be the end of you."
                 ]
               : world.killed0 || startonATE()
               ? world.trueKills > 29
                  ? [
                       "<32>{#p/basic}{#k/1}* 我不是個英雄。",
                       "<32>{#k/3}* 但我知道這附近有一個。",
                       "<32>* 一個無論如何，\n  都堅守著正義的人。",
                       "<32>{#k/0}* 儘管沒有預言或傳說\n  提到過那樣一個人。",
                       "<32>* 但我仍然確信。",
                       '<32>{#k/3}* 有朝一日，那個人會把你拿下。'
                    ]
                  : [
                       "<32>{#p/basic}{#k/1}* 我不是個英雄。",
                       "<32>{#k/3}* 但我知道這附近有一個。",
                       "<32>* 一個無論如何，\n  都堅守著正義的人。",
                       "<32>{#k/0}* I'd watch your back, kiddo.",
                       "<32>{#k/0}* 'Cause sooner or later, before you know it...",
                       "<32>{#k/3}* ... you'll be as good as dead."
                    ]
               : world.trueKills > 29
               ? [
                    "<32>{#p/basic}{#k/0}* 安黛因？\n* 是啊，她是這一帶的英雄。",
                    '<32>{#k/3}* She stormed off earlier... seemed pretty upset at someone who looked just like you...',
                    "<32>{#k/2}* 我會幫你一把的，孩子。\n* 買些東西吧...\n* 說不定能救你一命呢！\n* 哇哈哈！"
                 ]
               : [
                    "<32>{#p/basic}{#k/0}* 安黛因？\n* 是啊，她是這一帶的英雄。",
                    '<32>{#k/4}* 憑藉勇氣和決心，\n  她一路奮鬥到皇家守衛的頂點。',
                    '<32>{#k/3}* 事實上，她剛剛來這裡問過\n  有沒有見到一個長得\n  很像你的人...',
                    "<32>{#k/2}* 我會幫你一把的，孩子。\n* 買些東西吧...\n* 說不定能救你一命呢！\n* 哇哈哈！"
                 ]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },

   s_save_foundry: {
      f_abyss: {
         name: '鑄廠 - 深淵',
         text: [
            '<32>{#p/human}* （你發現自己身處\n  前哨站的最低點。）',
            '<32>{#p/human}* （這種身處邊境的不定感\n  使你充滿了決心。）'
         ]
      },
      f_battle: {
         name: '鑄廠 - 鋼索橋',
         text: () =>
            SAVE.data.n.state_foundry_undyne > 0 || world.runaway
               ? [ '<32>{#p/human}* (The starlight dims, filling you with determination.)' ]
               : [
                    '<32>{#p/human}* （雖然遠在天際，星光依舊閃爍。）',
                    '<32>{#p/human}* （這使你充滿了決心。）'
                 ]
      },
      f_hub: {
         name: '鑄廠 - 寧靜地帶',
         text: () =>
            SAVE.data.n.state_foundry_undyne > 0 || world.runaway
               ? [
                    '<32>{#p/human}* (The silence is deafening...)',
                    '<32>{#p/human}* (Yet it fills you with determination.)'
                 ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/human}* (Returning to such a quiet place after your journey fills you with determination.)' ]
               : SAVE.data.n.plot < 48
               ? [
                    '<32>{#p/human}* （在持續的混亂中\n  得到短暫的喘息...）',
                    '<32>{#p/human}* （這使你充滿了決心。）'
                 ]
               : SAVE.data.n.plot_date < 2.1
               ? [ '<32>{#p/human}* (The chaos has come to an end, filling you with determination.)' ]
               : SAVE.data.n.exp > 0
               ? [
                    '<32>{#p/human}* （隨著蒸汽而來的\n  是背叛的苦澀。）',
                    '<32>{#p/human}* （這使你充滿了決心。）'
                 ]
               : [
                    '<32>{#p/human}* （隨著蒸汽而來的\n  是友誼的芬芳。）',
                    '<32>{#p/human}* （這使你充滿了決心。）'
                 ]
      },
      f_lobby: {
         name: '鑄廠 - 暗區',
         text: () =>
            SAVE.data.n.plot < 39
               ? [ '<32>{#p/human}* （在鑄廠的深處漫步，\n  使你充滿了決心。）' ]
               : SAVE.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/human}* (Thinking of the friends you corrupted along the way fills you with determination.)' ]
               : SAVE.data.b.f_state_kidd_betray
               ? [ '<32>{#p/human}* (Thinking of the friends you betrayed along the way fills you with determination.)' ]
               : world.runaway
               ? [
                    "<32>{#p/human}* (Thinking of the friends you'll never get to see again fills you with determination.)"
                 ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (Thinking of the friends you went the extra mile to save fills you with determination.)'
                 ]
               : [ '<32>{#p/human}* (Thinking of the friends you made along the way fills you with determination.)' ]
      },
      f_prechase: {
         name: '鑄廠 - 岔路口',
         text: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (Despite it only being useful for you and your company...)',
                    '<32>{#p/human}* (The newly-built bridge nearby still fills you with determination.)'
                 ]
               : world.runaway
               ? [
                    "<32>{#p/human}* (Despite you being the only one who'll get to use it now...)",
                    '<32>{#p/human}* (The newly-built bridge nearby still fills you with determination.)'
                 ]
               : SAVE.data.n.plot < 48
               ? [
                    '<32>{#p/human}* （塔架謎題、訊星，\n  還有老式通風口...）',
                    '<32>{#p/human}* （如同變幻莫測的滑稽劇一般，\n  使你充滿了決心。）'
                 ]
               : [
                    '<32>{#p/human}* (A bridge now sits amidst the surroundings.)',
                    '<32>{#p/human}* (This development fills you with determination.)'
                 ]
      },
      f_sans: {
         name: '鑄廠 - 邊檢站',
         text: () =>
            world.dead_skeleton || world.runaway
               ? [
                    '<32>{#p/human}* （不知怎地，通風口排出的\n  蒸汽令人不安。）',
                    '<32>{#p/human}* （儘管如此，你充滿了\n  決心。）'
                 ]
               : [ '<32>{#p/human}* （通風口冒出的溼熱蒸汽使你\n  充滿了決心。）' ]
      },
      f_shyren: {
         name: '鑄廠 - 售貨機',
         text: () =>
            SAVE.data.b.killed_shyren
               ? [ '<32>{#p/human}* (A sad stillness permeates the air, filling you with determination.)' ]
               : SAVE.data.n.plot < 40
               ? [ '<32>{#p/human}* （耳邊迴蕩的嗡嗡聲，\n  使你充滿了決心。）' ]
               : [ '<32>{#p/human}* (The sound of music fills you with determination.)' ]
      },
      f_tunnel: {
         name: '鑄廠 - 垃圾場',
         text: () =>
            SAVE.data.n.plot < 42.1
               ? [ '<32>{#p/human}* （在垃圾中迷失方向\n  使你充滿了決心。）' ]
               : [ '<32>{#p/human}* (Finding yourself back amongst the trash fills you with determination.)' ]
      }
   }
};


// END-TRANSLATE
