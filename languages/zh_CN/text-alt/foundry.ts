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
      locketseller: [ '<32>{#p/basic}* ...', "<32>{#p/basic}* 我什么都没看到。" ],
      noequip: [ '<32>{#p/human}* （你打算不这么做。）' ],
      darktoriel1: [
         "<32>{#p/human}* （你抓住了托丽尔的手。）",
         '<25>{#p/toriel}{#f/2}* 噢，天哪...！\n* 是-是你吗，弗里斯克？',
         "<25>{#f/1}* 这里有点黑，看不清楚..."
      ],
      darktoriel2: [
         '<25>{#p/toriel}{#f/9}* 对不起，害得你到处找我。',
         '<25>{#f/9}* 我把手机关机了，\n  所以你打不通我的电话。',
         '<25>{#f/13}* ...',
         '<25>{#f/13}* 孩子，之前做了那些事。\n  真的对不起。',
         '<25>{#f/13}* 即便你原谅我，\n  我也原谅不了自己。',
         '<25>{#f/9}* 现在，我才渐渐意识到\n  过去犯下的那些错\n  有多严重。',
         '<25>{#f/10}* ...',
         '<25>{#f/10}* 总之，很高兴见到你。'
      ],
      darktoriel3: [
         '<25>{#p/toriel}{#f/5}* ...哦？\n* 你想让我... \n  给衫斯回个电话？',
         '<25>{#f/1}* 我现在就开机...'
      ],
      darktoriel4a: [
         '<32>{#s/phone}{#p/event}* 拨号中...',
         '<25>{#p/toriel}{#f/3}* ...嗯，是的。\n* 我手机在这地方\n  信号不太好。'
      ],
      darktoriel4b: [
         '<25>{#f/4}* 我要亲自去找他。',
         '<25>{#f/5}* 呃... \n* 还是一会再去吧。',
         '<25>{#f/5}* ...'
      ],
      darktoriel5a: [
         '<25>{#p/toriel}{#f/5}* ...嗯？\n* 还有什么事吗？',
         '<32>{#p/human}* （你给眼前的托丽尔复述了\n  “六号档案”里那个托丽尔\n  给的建议。）',
         '<25>{#p/toriel}{#f/2}* ...',
         '<25>{#f/1}* 这些话...',
         '<25>{#f/1}* 你从哪听到的...？',
         '<25>{#f/0}* 我上次说这些\n  起码是一百年前了。',
         '<25>{#f/5}* ...',
         '<25>{#f/1}* 好，你先走吧...\n* 我会记住这些话的。'
      ],
      darktoriel5b: [ '<25>{#p/toriel}{#f/1}* 你先走吧。' ],
      darktoriel6: [
         '<25>{#f/5}* 放心，我知道运输船要出发，\n  肯定不会错过的。',
         '<25>{#f/9}* 但现在，我想一个人静静。',
         '<25>{#f/1}* ...谢谢你的关心，弗里斯克。\n* 你是最棒的。'
      ],
      darktoriel7: () =>
         SAVE.data.b.c_state_secret1_used
            ? [
                 '<25>{#p/toriel}{#f/10}* 别担心，弗里斯克。\n* 我没事。',
                 '<25>{#f/1}* 运输船上见。\n* 好吗？'
              ]
            : [
                 '<25>{#p/toriel}{#f/5}* 给我点时间平复下心情，\n  弗里斯克。',
                 '<25>{#f/1}* 运输船上见。\n* 好吗？'
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
      evac: [ '<32>{#p/human}* （你感觉周围的怪物越来越少了。）' ],
      shopclosed: [ '<32>{#p/human}* （没必要再踏足了。）' ],
      starKILLER: [ '<32>{#p/basic}{#npc/a}* The grass is fading faster than I had thought.' ],
      quicksolve3: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The terminal appears to have been powered off.)' ]
            : [
                 '<32>{#p/human}* （你激活了终端。）',
                 '<32>{#p/basic}* “路通了！”\n* “直接前进即可。”'
              ],
      quicksolve4: [ '<32>{#p/human}* （你激活了终端。）', '<32>{#p/basic}* “请输入控制代码！”' ],
      quicksolve5: [
         '<32>{#p/basic}* ...',
         '<32>{#p/basic}* If only you knew a puzzle officionado who could tell you what that code might be.'
      ],
      quicksolve6: () => [ '<32>{#p/basic}* ...', choicer.create('* (Enter the code?)', '是', '否') ],
      quicksolve7: [ '<32>{#p/human}* (You decide not to enter.)' ],
      quicksolve8: [ "<32>{#p/basic}* Well, that's a mercy." ],
      escape: [
         '<32>{#p/event}* 铃铃，铃铃...',
         '<32>{#p/alphys}* 嘿... 你-你好？',
         '<32>* 我知道你想继续前进，但是...',
         "<32>* 如果你还往前走，\n  她会... 杀了你...",
         "<32>* 我尝试阻止她... \n  但-但她不听我的！",
         "<32>* 她现在...",
         '<32>* ...',
         "<32>* 但是，呃，没事的！\n* 因为...",
         "<32>* 因-因为还有一种\n  可以绕过她的办法！",
         "<32>* 我知道这可能...\n* 有点不方便...",
         "<32>* 但这是你活下去的唯一办法...！",
         '<32>* 相-相信我... 好吗？',
         '<32>* 回到那-那个塔架谜题前的阳台。',
         "<32>* 如果你不这么做，我...",
         '<32>* 我...',
         "<32>* 我就... \n  你走吧。",
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      artifact1: [ '<32>{#p/human}* （你获得了传说中的神器。）' ],
      artifact2: [ "<32>{#p/human}* （你带的东西太多，装不下它了。）" ],
      artifact3: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The inscription describes a riddle of ivories and melodies.)' ]
            : [
                 '<32>{#p/basic}* 底座上刻着铭文。',
                 '<32>* “琴台静立其间，两侧别有洞天。”',
                 '<32>* “王子曲成左门启，谁人可使右室显？”',
                 '<32>* “再奏谜自开。”'
              ],
      tome0: () => [ '<32>{#p/basic}* 这宗卷轴被牢牢固定在底座上，\n  拿不起来。' ],
      tome1: () => [ '<32>{#p/human}* （你取下了卷轴《顿悟》。）' ],
      tome2: [ "<32>{#p/human}* （你带的东西太多，装不下它了。）" ],
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
            '* （你想做什么？）',
            '饶恕',
            world.meanie
               ? '欺负'
               : SAVE.data.b.oops && world.flirt > 9
               ? '调情'
               : SAVE.data.b.oops
               ? '交友'
               : '拥抱',
            '击杀',
            '捞钱'
         )
      ],
      tome5a: '<32>{#p/human}* （你凝神屏息，试图让对方放弃战斗。）',
      tome5b: () =>
         world.meanie
            ? '<32>{#p/human}* （你凝神屏息，试图把对方吓跑。）'
            : SAVE.data.b.oops && world.flirt > 9
            ? '<32>{#p/human}* （你凝神屏息，试图让对方被你迷倒。）'
            : SAVE.data.b.oops
            ? '<32>{#p/human}* （你凝神屏息，\n  试图和对方成为好朋友。）'
            : '<32>{#p/human}* （你凝神屏息，\n  试图让对方感受到拥抱。）',
      tome5c: '<32>{#p/human}* （你凝神屏息，试图逼对方自杀。）',
      tome5d: '<32>{#p/human}* （你凝神屏息，\n  试图引诱对方把钱交出来。）',
      tome5e: '<32>{#p/basic}* ...突然！',
      tome5f: '\n* （然而一切照常。）',
      astrofood0: () => [
         "<32>{#p/human}* (You can't make out what's in the box...)",
         choicer.create('* (Take something out?)', '是', '否')
      ],
      astrofood1: () =>
         [
            [
               '<32>{#p/basic}* 箱子里有三份太空豆腐。',
               choicer.create('* （拿一份吗？）', '是', '否')
            ],
            [
               '<32>{#p/basic}* （箱子里还剩两份太空豆腐。）',
               choicer.create('* （拿一份吗？）', '是', '否')
            ],
            [
               '<32>{#p/basic}* （箱子里还剩一份太空豆腐。）',
               choicer.create('* （拿走它吗？）', '是', '否')
            ]
         ][SAVE.data.n.state_foundry_astrofood],
      astrofood2: [ '<32>{#p/human}* （你拿了一份太空豆腐。）' ],
      astrofood3: [ "<32>{#p/human}* （你带的东西太多了。）" ],
      astrofood4: () => [ '<32>{#p/human}* （你不打算这么做。）' ],
      astrofood5: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (But you couldn't find anything inside.)" ]
            : [ '<32>{#p/basic}* 箱子是空的。' ],
      bird1: () => [
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* 这只小鸟想带你\n  穿过这道沟。' ]),
         choicer.create("* （接受小鸟的好意吗？）", '是', '否')
      ],
      blookdate1: () =>
         world.sad_ghost || world.population === 0
            ? [
                 '<32>{#p/napstablook}* 哦...\n* 你好...',
                 "<32>* 对不起，我...\n* 没想到你会跟我过来。",
                 '<32>* 呃...\n* 别太拘束...？'
              ]
            : [
                 '<32>{#p/napstablook}* 哦...\n* 你真的来了...',
                 "<32>* 对不起，我...\n* 没想到你会来。",
                 "<32>* 虽然比较寒酸，\n  但是不要太拘束哦。"
              ],
      blookdate2: () => [
         ...(world.sad_ghost || world.population === 0
            ? [ '<32>{#p/napstablook}* 哦... 你要我给你吃的...', '<32>* 我看看有什么...' ]
            : SAVE.data.b.f_state_ghostsleep
            ? [ '<32>{#p/napstablook}* okay, so...', "<32>* let me show you what's in the fridge" ]
            : [ '<32>{#p/napstablook}* 你饿了吗？', '<32>* 我冰箱里应该有点吃的...' ])
      ],
      blookdate2x: pager.create(
         0,
         () =>
            SAVE.data.b.svr
               ? [
                    "<32>{#p/human}* (You inspect the fridge.)\n* (It doesn't seem like you can exactly see the contents.)"
                 ]
               : [
                    '<32>{#p/human}* （你看了下冰箱里头。）',
                    "<32>{#p/basic}* 很难说里面到底有些什么。",
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
                    '<32>{#p/human}* （你看了下冰箱里头。）',
                    "<32>{#p/basic}* 很难说里面到底有些什么。"
                 ]
      ),
      blookdate3: () => [
         "<32>{#p/napstablook}* 这是一份幽灵三明治...",
         '<32>* 你想尝尝吗...',
         choicer.create('* （咬一口吗？）', '是', '否')
      ],
      blookdate4a: [
         '<32>{#p/human}* （你试着咬了一口幽灵三明治。）',
         '<32>{#p/human}* （你的身体穿过了它。）',
         '<32>{#p/napstablook}* 哦...',
         '<32>* 当做什么都没发生吧...'
      ],
      blookdate4b: [ '<32>{#p/napstablook}* 哦...........' ],
      blookdate5: () => [
         '<32>{#p/napstablook}* 美餐一顿后，\n  我喜欢躺在地上，\n  感觉自己像是垃圾一样...',
         "<32>* 这是个家族传统...",
         '<32>* 你想不想...\n* ...也来试试...？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      blookdate6a: [ '<32>{#p/napstablook}* 好...\n* 跟我来做...' ],
      blookdate6b: [ '<32>{#p/napstablook}* 哦......................', "<32>* 我出去逛逛" ],
      blookdate7: [
         "<32>{#p/napstablook}* 我们开始吧...\n* 一直躺着不要动就好。",
         '<32>* 所以...\n* 你要想起来了的话，\n  动起来就好，大概。'
      ],
      blookdate8: [ '<32>{#p/napstablook}* 嗨，感觉不错...', '<32>* 谢谢你...' ],
      blookdate8x: [ '<32>{#p/napstablook}* well, that was fast......', '<32>* thanks for trying, though......' ],
      blookdate8y: [ '<32>{#p/napstablook}* well, that was that', '<32>* ............' ],
      blookdate9: [
         "<32>{#p/napstablook}* 我先出去一下...\n* 你可以跟我来...\n* 不来也可以...",
         "<32>* 由你来决定..."
      ],
      blookmusic0: [ "<32>{#p/basic}* It's out of service." ],
      blookmusic1: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* (You reach for the sound system...)'
            : '<32>{#p/basic}* 现在没有播放音乐。',
         choicer.create('* （放一首吗？）', '鬼怪旋律', '鬼怪音波', '鬼怪华尔兹', '取消')
      ],
      blookmusic1y: [ '<32>{*}{#p/human}* （你转动旋钮...）{^40}{%}' ],
      blookmusic2: () => [
         SAVE.data.b.svr
            ? '<32>{#p/human}* (It sounds like a song is currently playing.)'
            : [
                 '<32>{#p/basic}* 正在播放《鬼怪旋律》',
                 '<32>{#p/basic}* 正在播放《鬼怪音波》',
                 '<32>{#p/basic}* 正在播放《鬼怪华尔兹》'
              ][SAVE.data.n.state_foundry_blookmusic - 1],
         choicer.create('* （停止播放吗？）', '是', '否')
      ],
      blookmusic3a: [
         '<32>{#p/napstablook}* 哦...\n* 一首经典诡异单曲...',
         "<32>* 他们现在已经不做\n  这种歌了..."
      ],
      blookmusic3b: [ '<32>{#p/napstablook}* 天，这氛围...', "<32>* 让我全身都开始颤抖" ],
      blookmusic3c: [
         "<32>{#p/napstablook}* 这首稍微有点慢...",
         "<32>* 但一旦你听进状态，\n  就会感觉很好听"
      ],
      blookmusic3d: [
         '<32>{#p/napstablook}* 嘿...\n* 你真的很喜欢听\n  那个旧歌单，嗯',
         "<32>* 我是说......\n* 我从那次以后，\n  做了些更好的东西.....",
         '<32>* 不过，我还是很感激',
         '<32>* 所以... 谢谢你，嘿'
      ],
      blooksnail1: pager.create(
         0,
         () => [
            "<32>{#p/napstablook}* 你想玩个游戏吗？\n* 它叫做“雷霆蜗牛”。",
            '<32>* 几只蜗牛会赛跑，\n  然后如果黄色的蜗牛赢了，\n  你就赢了。',
            "<32>* 玩一次需要10G。",
            choicer.create('* （玩游戏吗？）', '是', '否')
         ],
         () => [ '<32>{#p/napstablook}* 你改变主意了吗？', choicer.create('* （玩游戏吗？）', '是', '否') ]
      ),
      blooksnail1i: () => [
         '<32>{#p/napstablook}* 你想再玩一次吗？',
         choicer.create('* （玩游戏吗？）', '是', '否')
      ],
      blooksnail2a: [
         "<32>{#p/napstablook}* um...\n* you don't have enough money......",
         "<32>* n-no, you can still play, don't worry about it..."
      ],
      blooksnail2b: [ '<32>{#p/napstablook}* 哦...........' ],
      blooksnail2b0: [ '<32>{#p/napstablook}* 好吧...........' ],
      blooksnail3: [ '<32>{#p/napstablook}* 好...\n* 重复按[Z]为你的蜗牛加油。', '<32>* 准备好了吗？' ],
      blooksnail3i: [ '<32>{#p/napstablook}* 好的...\n* 记住，你随时可以为你的蜗牛\n  加油。', '<32>* 准备好了吗？' ],
      blooksnail4a: [
         '<32>{#p/napstablook}* 你赢了... 恭喜。',
         '<32>* 希望奖励对你来说足够了...',
         '<32>{#s/equip}{#p/human}* （你得到了20G。）'
      ],
      blooksnail4b: [
         '<32>{#p/napstablook}* 你的蜗牛差一点点\n  就能赢了。',
         '<32>* 等一下...\n* 蜗牛以为是自己赢了...',
         '<32>* 哦不... 蜗牛会很伤心的...',
         "<32>* 那么，我就给你一些钱吧...\n* 表现得像你赢了的样子...",
         '<32>{#s/equip}{#p/human}* （你得到了40G。）'
      ],
      blooksnail4c: [
         '<32>{#p/napstablook}* 哦...........\n* 你们都尽力了...',
         '<32>* 那只蜗牛看起来很气馁...',
         "<32>* 我觉得她应该还没有\n  发挥到最好...",
         '<32>* 哦...........'
      ],
      blooksnail4d: [
         '<32>{#p/napstablook}* 哦...........\n* 看起来你为你的蜗牛\n  加油有点过头了...',
         '<32>* 你给她施加的压力...\n* 真的让它吃不消...',
         '<32>* 哦...........'
      ],
      blooksnail4e: [
         '<32>{#p/napstablook}* 哦...........\n* 看起来你为你的蜗牛\n  加油过头了...',
         "<32>* 她甚至都不看你了...",
         '<32>* 哦...........'
      ],
      blooksnail4f: [
         '<32>{#p/napstablook}* 哦...........\n* 看起来你为你的蜗牛\n  加油实在太过头了...',
         "<32>* 现在她... 直接消失了...",
         '<32>* 哦...........'
      ],
      blooksnailX: {
         a: '3...',
         b: '2...',
         c: '1...',
         d: '开始!',
         e: '比赛结束'
      },
      blooksorry1: () => [
         '<32>{#p/napstablook}* ...？',
         "<32>* you...\n* you're...",
         '<32>* ... are you sure?',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      blooksorry2: () => [
         '<32>{#p/napstablook}* i...',
         "<32>* i never thought you'd...",
         '<32>* ... um...',
         '<32>* ... are you absolutely sure?',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      blooksorry3: [
         '<32>{#p/napstablook}* you...',
         "<32>* you really mean it, don't you?",
         '<32>* ...\n* heh...',
         '<32>* okay...',
         "<32>* i'll try to forget about what you did before..."
      ],
      blooksorryX: [ '<32>{#p/napstablook}* 哦...........\n* ...........\n* ...........' ],
      blooksorryY: [ '<32>{#p/napstablook}* ...' ],
      blooktouch1: () =>
         world.sad_ghost
            ? [
                 '<32>{#p/napstablook}* what do you want......',
                 choicer.create('* （你要怎么回答？）', '道歉', '放弃')
              ]
            : [
                 '<32>{#p/napstablook}* 哦，你需要什么吗？',
                 choicer.create('* （你要怎么回答？）', '拥抱', '睡觉', '音乐', '放弃')
              ],
      blooktouch2a1: [
         '<32>{#p/napstablook}* 你... 想要...\n* 嗯...',
         '<32>* 你想让我抱抱你？',
         "<32>* 好...\n* 如果能让你开心的话...",
         '<32>{#p/basic}* 纳普斯特试着抱了抱你。',
         '<32>* 它直接穿过了你。',
         '<32>{#p/napstablook}* 哦...........',
         "<32>* 我感觉...........\n* 我做不到..........."
      ],
      blooktouch2a2: [
         "<32>{#p/napstablook}* 你真的想要抱抱，\n  是吗...",
         "<32>* 抱歉...\n* 我也希望我可以..."
      ],
      blooktouch2b1: [
         '<32>{#p/napstablook}* 你想找个地方睡觉吗？',
         "<32>* 嗯... 我这里其实没有床...",
         '<32>* 嗯...',
         "<32>* 去冰箱看看有没有吃的...",
         '<32>* 吃完之后，我们就可以\n  在地上躺一躺...',
         "<32>* 你到时候就知道了..."
      ],
      blooktouch2b2: [ '<32>{#p/napstablook}* 冰箱...' ],
      blooktouch2c1: [
         "<32>{#p/napstablook}* 如果你想听音乐，\n  我的音响里有一些...",
         '<32>* 可以随便听听看...\n* 不听也可以...'
      ],
      blooktouch2c2: () => [
         '<32>{#p/napstablook}* 音响里的...\n* ...你不喜欢听吗...',
         "<32>* 或许...\n* 我可以给你听一首\n  我还在做的歌曲...",
         "<32>* 跟我平常的风格很不一样...",
         '<32>* 你想听听吗？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      blooktouch2c2x: () => [
         '<32>{#p/napstablook}* want to hear my new song?',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      blooktouch2c3a: [ '<32>{#p/napstablook}* oh...\n* well, let me know if you change your mind...' ],
      blooktouch2c3b: [ '<32>{#p/napstablook}* 好...\n* 让我播放一下...' ],
      blooktouch2c4: () => [
         '<32>{#p/napstablook}* 所以... 你感觉怎么样',
         choicer.create('* （你要怎么回答？）', '好听', '不好听')
      ],
      blooktouch2c5a: [
         "<32>{#p/napstablook}* 听起来... 还不错？",
         '<32>* 哦-\n* 嗯... 谢谢你...',
         "<32>* 等...\n* 等我做完之后我会告诉你的！"
      ],
      blooktouch2c5b: [ "<32>{#p/napstablook}* 哦.........\n* 你应该是对的........." ],
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
                    '<32>{#p/napstablook}* 天，你真的跑来跑去的',
                    '<32>* 我是说...',
                    '<32>* 其实我也是...',
                    "<32>* 但是，我是没有实体的，\n  所以对我来说不算\n  那么令人印象深刻"
                 ]
               : [
                    '<32>{#p/napstablook}* 欢迎来到幽灵家族的\n  蜗牛农场...',
                    "<32>* ...是的。\n* 我是这里唯一的员工。",
                    ...(world.killed0
                       ? [
                            "<32>* 嘿，这真怪...",
                            '<32>* 我的蜗牛消失了...',
                            '<32>* 也许是那个留胡子的人拿走了...'
                         ]
                       : [
                            '<32>* 这个地方原先生意\n  很红火的...',
                            '<32>* 但有一天我们的主顾\n  突然不来了...',
                            "<32>* 现在只有一个毛茸茸的家伙\n  会偶尔出现..."
                         ])
                 ],
         () =>
            SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

               ? [ '<32>{#p/napstablook}* ............' ]
               : 65 <= SAVE.data.n.plot
               ? SAVE.data.b.a_state_hapstablook
                  ? 68 <= SAVE.data.n.plot
                     ? [ "<32>{#p/napstablook}* 希望你下次别冒这个险了。" ]
                     : [ '<32>{#p/napstablook}* it is what it is...' ]
                  : [ '<32>{#p/napstablook}* it is what it is...' ]
               : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
               ? [ "<33>{#p/napstablook}* don't worry, they're alright...", '<32>* 至少，我是那么希望的......' ]
               : 60 <= SAVE.data.n.plot
               ? [ "<32>{#p/napstablook}* 希望他下次能对其他选手\n  好一点吧........." ]
               : 49 <= SAVE.data.n.plot
               ? [
                    '<32>{#p/napstablook}* 哦对了，我早些时候\n  看到你在达人秀上了...',
                    ...(SAVE.data.n.state_aerialis_talentfails === 0
                       ? [
                            "<32>{#p/napstablook}* 真的太精彩了...\n  你一次都没搞砸",
                            "<32>* 我觉得你应该是\n  开天辟地第一个......"
                         ]
                       : SAVE.data.n.state_aerialis_talentfails < 15
                       ? [
                            "<32>{#p/napstablook}* 即使你的表现不算完美，\n  你也做得很好",
                            "<32>* 镁塔顿的大多数参赛者\n  甚至都没坚持到一半...",
                            '<32>* 包括我......'
                         ]
                       : [
                            "<32>{#p/napstablook}* 即使你的表现不是最好的，\n  我也能看出你已经尽力了",
                            '<32>* 更何况，你坚持到了最后...',
                            '<32>* 不像我......'
                         ])
                 ]
               : world.killed0
               ? [
                    "<32>{#p/napstablook}* 哦...\n* 押韵了，不是吗...",
                    '<32>* 我想我可以为此写首歌...\n  或许吧...'
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
                  ? [ '<32>{#p/napstablook}* 我没话讲了...' ]
                  : [ '<32>{#p/napstablook}* it is what it is...' ]
               : 60 <= SAVE.data.n.plot
               ? [ '<32>{#p/napstablook}* .........' ]
               : 49 <= SAVE.data.n.plot
               ? SAVE.data.n.state_aerialis_talentfails === 0
                  ? [ '<32>{#p/napstablook}* 那么，恭喜你' ]
                  : [ '<32>{#p/napstablook}* ......' ]
               : [ '<32>{#p/napstablook}* 我没话讲了...' ]
      ),
      boots1: () => [
         '<32>{#p/human}* （你捡到了一双悬浮靴。）',
         choicer.create('* （穿上悬浮靴吗？）', '是', '否')
      ],
      boots2: [ "<32>{#p/human}* （你带的东西太多，装不下它了。）" ],
      bruh: [ '<32>{*}{#p/undyne}* 等会见。{^20}{%}' ],
      candy1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你靠近了售货机。）',
                 choicer.create('* （你想合成什么呢？）', '甘草糖', '薯片', '口粮', '放弃')
              ]
            : [
                 '<32>{#p/basic}* 要用这台机器合成什么呢？',
                 choicer.create('* （你想合成什么呢？）', '甘草糖', '薯片', '口粮', '放弃')
              ],
      candy2: [ '<32>{#p/human}* （你买了$(x)。）' ],
      candy3: () => [ choicer.create('* （花$(y)G来买$(x)吗？）', '是', '否') ],
      candy4: [ "<32>{#p/human}* （你的钱不够。）" ],
      candy5: [ '<32>{#p/human}* （你决定先不买。）' ],
      candy6: [ "<32>{#p/human}* （你带的东西太多了。）" ],
      candy7: [ '<32>{#p/human}* （你打算什么也不合成。）' ],
      deathReaction: {
         f_bird: [ '<32>{#p/basic}* 这只小鸟再也不想带你过去了。' ],
         
         f_blooky: [
            '<32>{#p/basic}{#npc/a}* 你听说过安黛因吗？',
            '<32>{#p/basic}{#npc/a}* 哦，完全没有！',
            "<32>{#p/basic}{#npc/a}* I heard she's doing well.",
            '<32>{#p/basic}{#npc/a}* Sounds good to me!',
            '<32>{#p/basic}{#npc/a}* 安黛因 永远不朽。',
            '<32>{#p/basic}{#npc/a}* 肯定不是！'
         ],
         f_dummy: [
            '<32>{#p/basic}{#npc/a}* 检测到强烈的能量信号。',
            '<32>* 名字是... 安黛因。',
            '<32>* 关系... “闺蜜！！！”',
            '<32>* 上次互动... 询问了关于人类的信息。',
            '<32>* Time to compensate for loss...',
            '<32>* Indeterminate.'
         ],
         f_hub: [
            "<32>{#p/basic}{#npc/a}* 什...\n* 你都干了什么！？",
            "<32>* Ole' Gerson's not gonna be a happy camper after that..."
         ],
         f_snail: () => [
            '<32>{#p/basic}* ...',
            SAVE.data.b.f_state_thundersnail_win
               ? "<32>* 下一局雷霆蜗牛\n  我可绝对不会让你赢了。"
               : "<32>* 我绝对不会让你\n  再赢雷霆蜗牛了。"
         ],
         f_undyne: [
            '<32>{#p/basic}* 不。\n* 不行！\n* 不行！！！',
            '<32>* 你。都。干了。什么？？？',
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
                 '<32>{#p/basic}* 呸！\n* 我就知道你会那么做！！',
                 '<32>* What an IMBECILE!!!\n* You just hugged someone with haphephobia!!!!',
                 "<32>* Guooohh, you're gonna PAY."
              ]
            : [
                 '<32>{#p/basic}* Gah!\n* Why would you EVER do that!?',
                 "<32>* 你知道我是谁吗！？！？\n* 你刚才抱的那个人可是有接触恐惧症的！！！！",
                 "<32>* Guooohh, you're gonna PAY."
              ],
      dummy1a: () =>
         SAVE.data.n.state_wastelands_dummy === 2
            ? [ "<32>{#p/basic}* 呵。\n* 我就知道，你这懦夫\n  看到我指定得逃。", '<32>* 是不是啊，笨蛋？' ]
            : [ '<32>{#p/basic}* 放肆！\n* 闯进我的地盘，\n  还把我当空气？', '<32>* 真是蠢到极点！' ],
      dummy1b: () =>
         SAVE.data.n.state_wastelands_dummy === 1
            ? [ '<32>{#p/basic}* 看到我，吓破胆了？', '<32>* 你也就这点本事。' ]
            : [ '<32>{#p/basic}* 放肆！\n* 闯进我的地盘，\n  还跟我大眼瞪小眼？', '<32>* 真是蠢到极点！' ],
      dummy1c: () =>
         SAVE.data.n.state_wastelands_dummy === 1
            ? [ '<32>{#p/basic}* 我就知道，\n  不揍我两下你心都痒痒。', '<32>* 迂腐。\n* 迂腐！\n* 迂腐！！！' ]
            : [
                 "<32>{#p/basic}* 哎呀，看来你来这\n  可不只是想聊聊天。",
                 "<32>* 不过，你那点小把戏\n  在我这屁用没有！\n* 看我不揍死你！"
              ],
      dummy2: () => [
         '<32>{#p/basic}* 那群饭桶没杀了你，\n  因为他们少一样看家本领-\n  没！有！实！体！',
         "<32>* 没错，人类！\n* 有了这个，我就能\n  所向披靡，天下无敌！",
         '<32>* 我是一只住在人偶里的幽灵！',
         '<32>* 我的表亲以前也住在一个人偶里，\n  直到...！',
         ...(SAVE.data.n.state_wastelands_toriel === 0
            ? [
                 '<32>* 直到...！',
                 '<32>* 直到...',
                 '<32>{#x1}* ...呃，其实它是自己离开的...',
                 '<32>* 肯定是那位善良的女士\n  在外域给它找到了新家，\n  贴心照顾着它。',
                 '<32>* 我的表亲说，\n  有个人类让那位女士感到幸福。',
                 "<32>* 那个人类就是你，对吧？",
                 '<32>* ...该死。\n* 你走吧，我不打你了...'
              ]
            : [
                 '<32>* 直到你出现为止！！！',
                 ...(16 <= SAVE.data.n.kills_wastelands
                    ? [
                         '<32>* 你的所作所为\n  不光害它离开了自己的家...',
                         '<32>* 还把它的邻居全吓跑了！',
                         '<32>* 可恶。\n* 可恶！\n* 可恶！！！',
                         "<32>{#x1}* 你个败类，人渣，废物！\n* 我快要气死了啊啊啊！！！",
                         '<32>* 呀啊啊啊啊啊啊！！！\n* 我的人偶能量快要爆发了！！！'
                      ]
                    : SAVE.data.n.state_wastelands_dummy === 3
                    ? [
                         '<32>* 你... 你...',
                         '<32>* 该死，你这人无聊透顶！',
                         '<32>* They got annoyed and flew away like any self-respecting spectre.',
                         '<32>* 那好吧。\n* 那好吧！\n* 那好吧！！',
                         "<32>* I guess I'll just have to entertain MYSELF!",
                         "<32>* Buckle up, sleepyhead!\n* It's time to put on a show!"
                      ]
                    : SAVE.data.n.state_wastelands_dummy === 4
                    ? [
                         '<32>* 你... 你...',
                         '<32>* 该死，喜欢当老好人是吧？',
                         '<32>* 自己当老好人不要紧，\n  还让我表亲染上抱瘾，\n  总想拥抱，戒不掉了！！！',
                         '<32>* 它丢掉了原本的身体，\n  每次发作时，就找我发泄自己的欲望。',
                         "<32>* 它明知道我患有接触恐惧症，\n  还疯了似的骚扰我。\n  我快被它烦死了！！！",
                         "<32>* 人类，我要让你付出代价！"
                      ]
                    : [
                         ...(SAVE.data.n.state_wastelands_dummy === 0
                            ? [
                                 '<32>* 当你和它聊天的时候，\n  它本来希望能好好聊聊...',
                                 '<32>* 但看看你都说了些什么...！',
                                 '<32>* 真是可怕。\n* 叫人震惊！\n* 难以置信！',
                                 '<32>* 你把他从人偶里\n  吓了出来！',
                                 '<32>* 呃啊啊...'
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 1
                            ? [
                                 '<32>* 我们幽灵用一生时间来\n  寻找一个合适的容器。',
                                 '<32>* 渐渐地，渐渐地，我们和\n  新身体的联系越来越近，\n  直到有一天...',
                                 '<32>* 我们就可以变成有形的存在，\n  像其他人一样，欢笑，恋爱，舞蹈。',
                                 "<32>* 但是你呢！！！\n* 我的表亲的未来...\n* 你把它给毁了！",
                                 '<32>* 呃啊啊啊啊啊啊！！！'
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 2
                            ? [
                                 '<32>* 它一直羞于见人。\n* 自己孤独地住在外域...',
                                 '<32>* 然后它遇到了你，\n  希望你跟它交流。',
                                 '<32>* 但你没有！\n* 你逃跑了！',
                                 '<32>* 可悲。\n* 可悲！\n* 可悲！！！',
                                 "<32>* 没人能伤了我表亲的心\n  还能全身而退！"
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 5
                            ? [
                                 '<32>* 你出现的时候，它多么希望\n  你能跟他聊聊...',
                                 '<32>* 但你却给了它一巴掌！',
                                 '<32>* 再一。\n* 再二。',
                                 '<32>* 再三就过分了！！',
                                 '<32>* 你这人怎么这么坏！？'
                              ]
                            : SAVE.data.n.state_wastelands_dummy === 6
                            ? [
                                 '<32>* 我表亲明明是个很好的人。',
                                 "<32>* 但这不意味着你可以跟它调情！",
                                 '<32>* 你那愚蠢的举动吓到了它...',
                                 "<32>* ... 以至于它根本承受不住了！！",
                                 '<32>* 令人作呕。\n* 令人作呕！\n* 令人作呕！！！'
                              ]
                            : []),
                         "<32>* 你会为此而死的，人类！！！！"
                      ])
              ])
      ],
      dummy3: [
         '<32>{#p/basic}* ...？',
         '<32>* 这...\n* 这种感觉...？',
         '<32>{#x3}* 明白了。\n* 明白了！\n* 明白了！！！',
         '<32>* 人类。\n* 刚刚我那彻底失控的情绪...',
         '<32>* 让我终于可以完美地\n  和我的身体融为一体啦！',
         "<32>* 我是有血有肉的存在了！\n* 我... 我不是在做梦吧？\n* 这是真的吗？？？",
         "<32>* 作为报答，\n  我不会再攻击你啦。",
         "<32>* 怎么样？"
      ],
      dummy4: (mover: boolean) => [
         ...(mover
            ? [
                 SAVE.data.n.state_foundry_maddummy === 1
                    ? '<32>{#p/napstablook}* 嘿...\n* 我好像听到有人被袭击了...'
                    : '<32>{#p/napstablook}* 嘿...\n* 我好像听到了有人在喊叫...',
                 "<32>{#p/napstablook}* 但你似乎没事",
                 '<32>* 其实我正准备回家...'
              ]
            : [ "<32>{#p/napstablook}* 嗯...\n* 我现在要回家了..." ]),
         ...(world.sad_ghost || world.population === 0
            ? [
                 '<32>* 提醒你一下...',
                 "<32>* 别不小心跟我一起回到家了...",
                 "<32>* 你不会喜欢那样的..."
              ]
            : [
                 '<32>* 所以... 嗯...\n* 如果你想“附”约的话...\n  随时都可以...',
                 '<32>* 但别有压力...',
                 "<32>* 如果你忙，我能理解...",
                 "<32>* 没关系的...",
                 '<32>* 不用担心...',
                 "<32>* 只是想说我先邀请一下..."
              ])
      ],
      dummypunch1: () =>
         SAVE.data.b.oops
            ? [
                 "<32>{#p/basic}* 一个训练人偶。\n* 教训教训它吗？",
                 choicer.create('* （动手吗？）', '是', '否')
              ]
            : [ "<32>{#p/basic}* 一个训练人偶。\n* 抱抱它吗？", choicer.create('* （抱一下人偶吗？）', '是', '否') ],
      dummypunch2a: [ '<32>{#p/human}* （你打算不这么做。）' ],
      dummypunch2b: () =>
         world.genocide || world.meanie
            ? [ '<32>{#p/human}* （你使劲揍了人偶一拳。）' ]
            : SAVE.data.n.exp > 0
            ? [ '<32>{#p/human}* （你给人偶来了一拳。）' ]
            : SAVE.data.b.oops
            ? [ '<32>{#p/human}* （...你只是戳了戳人偶。）' ]
            : SAVE.data.b.flirt_maddummy
            ? [ '<32>{#p/human}* (You tenderly embraced the dummy.)' ]
            : [ '<32>{#p/human}* （你抱了抱人偶。）' ],
      dummypunch3: () =>
         SAVE.data.b.f_state_dummypunch
            ? [ "<32>{#p/basic}* 人偶被你教训了一顿。" ]
            : SAVE.data.b.flirt_maddummy
            ? [ "<32>{#p/basic}* It's a red-faced hugging dummy." ]
            : [ "<32>{#p/basic}* 一个很开心的抱抱人偶。" ],
      epicreaction: () =>
         [
            [ '<25>{#p/kidd}{#f/7}* 啥玩意啊！？' ],
            [ '<25>{#p/kidd}{#f/7}* 呃啊！！' ],
            [ '<25>{#p/kidd}{#f/7}* 别再来了啊！' ],
            [ '<25>{#p/kidd}{#f/7}* 安黛因埋了多少这玩意啊！' ],
            [ '<25>{#p/kidd}{#f/7}* 认真的吗！？' ],
            [ '<25>{#p/kidd}{#f/7}* 天啊！！' ],
            [ "<25>{#p/kidd}{#f/4}* 我们得快点逃出去..." ],
            [ '<25>{#p/kidd}{#f/4}* ...' ]
         ][Math.min(SAVE.data.n.state_foundry_kiddreaction++, 7)],
      fallenfish: [ '<33>{#p/basic}* 电流击穿了她的身体。' ],
      fallenfish2: [ "<32>{#p/basic}* 她陨落了。" ],
      fallenfish3: [ '<32>{#p/basic}* ... 但是什么也没发生。' ],
      finalfish1: [ '<25>{#p/undyne}{#f/19}* 嘎啊...' ],
      finalfish2: [ '<25>{#p/undyne}{#f/19}* 该死的...\n* 干扰...' ],
      finalpre: () => [ choicer.create('* (Continue to Aerialis?)', '是', '否') ],
      genotext: {
         asgoreFinal1: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.n.ga_asrielStutter < 1
                  ? [
                       '<25>{#p/asgore}{#f/15}* 看来，\n  你还是跟他一伙了啊...',
                       '<25>{#p/asriel2}{#f/7}* 谁都没法把我\n  和$(name)分开。\n* 您不会连这都不知道吧？',
                       '<25>{#p/asgore}{#f/15}* $(name)... 我-我当然知道啊！\n* 那... 你-你俩旁边的小孩\n  又是怎么回事？',
                       "<25>{#p/asriel2}{#f/8}* 关你屁事。",
                       "<25>{#p/asgore}{#f/15}* （呃... 早该料到的...）",
                       "<25>{#p/asriel2}{#f/6}* 算了，简单来说呢...\n* 我正带它“四处游历”呢。",
                       "<25>{#f/6}* 游历小分队只有我们仨，\n  没人加你。\n* 意不意外？",
                       '<25>{#p/asgore}{#f/15}* 谁-谁稀罕加入你们了？？',
                       '<25>{#p/asriel2}{#f/6}* 还装呢？',
                       "<25>{#p/asgore}{#f/15}* 呃... \n  我就是来看一眼你们在干啥。\n* 没别的想法。",
                       "<26>{#p/asriel2}{#f/10}{#x1}* ...\n* 不对劲。",
                       '<25>{#p/asriel2}{#f/10}* 艾菲斯博士？\n* ...是你吧？'
                    ]
                  : [
                       '<25>{#p/asgore}{#f/15}* 看来，\n  你还是跟他一伙了啊...',
                       '<25>{#p/asriel2}{#f/8}* 谁都没法把我\n  和$(name)分开，\n  艾菲斯。',
                       "<25>{#p/asriel2}{#f/7}* 不过，我再怎么跟你解释，\n  都是对牛弹琴，\n* 你说是不？"
                    ]
               : [
                    '<25>{#p/asgore}{#f/15}* 看来，\n  你还是跟他一伙了啊...',
                    '<25>{#p/asriel2}{#f/8}* 谁都没法把我\n  和$(name)分开，\n  艾菲斯。',
                    ...(SAVE.flag.n.ga_asrielQuestion < 1
                       ? [ "<25>{#p/asriel2}{#f/7}* 你都准备好要杀我们了呢。\n* 别以为我不知道。" ]
                       : [ '<25>{#p/asriel2}{#f/7}* 真以为你能阻止我们？' ])
                 ],
         asgoreFinal2: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? [
                    '<25>{#p/alphys}{#g/alphysThatSucks}* ...骗不过你，嗯？',
                    '<25>{#p/asriel2}{#f/3}* 是呢。',
                    "<25>{#p/alphys}{#g/alphysGarbo}* ...\n* 起码说了句实话。",
                    '<25>{#p/asriel2}{#f/13}* 看着好友死去，\n  你肯定急疯了...',
                    "<25>{#p/asriel2}{#f/16}* 没法和你感同身受呢。",
                    '<25>{#p/alphys}{#g/alphysIDK}* ...',
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* 真-真不该来这里。',
                    "<25>{|}{#p/asriel2}{#f/8}* 你不会又想- {%}"
                 ]
               : [
                    '<25>{#p/alphys}{#g/alphysOhGodNo}* 你说什么？',
                    "<25>* 我...\n* 我-我哪敢对付你们啊！",
                    ...(SAVE.flag.n.ga_asrielQuestion < 1
                       ? [ '<25>{#p/asriel2}{#f/10}* ...是吗？', '<25>{#p/alphys}{#g/alphysIDK}* ...' ]
                       : [ '<25>{#p/asriel2}{#f/7}* ...' ]),
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* 真-真不该来这里。'
                 ],
         asgoreFinal3: () =>
            SAVE.flag.n.genocide_milestone < 5
               ? [ '<25>{#p/asriel2}{#f/7}* 真是个胆小鬼。' ]
               : [
                    [ "<25>{#p/asriel2}{#f/15}* 呵... 把话说早了。" ],
                    [ '<25>{#p/asriel2}{#f/15}* 行吧。' ]
                 ][Math.min(SAVE.flag.n.ga_asrielQuestion++, 1)],
         asgoreMK1: [
            '<25>{#p/kidd}{#f/7}* 哇，那是...\n  我在做梦吧...',
            "<25>{#f/1}* 真的是国王欸！",
            '<25>* 艾斯戈尔国王！\n* 您来这做啥呢！？',
            '<25>{#p/asgore}{#f/3}* ...',
            '<25>{#f/3}* 这事... 说来话长啊。',
            '<25>{#p/kidd}{#f/4}* 噢...',
            '<25>{#f/1}* 没事，您跟我说说吧！',
            '<25>{#p/asgore}{#f/7}* 呃...\n* 对不起，我不能说。',
            '<25>{#f/6}* 不过，我有个事想问你。',
            '<25>{#p/kidd}{#f/3}* ...？',
            '<25>{#p/asgore}{#f/7}* 这个人类是你的好朋友吗？',
            '<25>{#p/kidd}{#f/1}* 嗯... 对呀！',
            '<25>{#f/4}* 可是，之前跟我们在一块的\n  另一个小孩...',
            "<25>{#f/8}* ...我很害怕他。",
            "<25>{#p/asgore}{#f/1}* 看来就是他了。\n* 都是因为他...",
            '<25>{#p/kidd}{#f/4}* 怎么了？',
            '<25>{#p/asgore}{#f/6}* 呃... 没事。\n* 我不该拿这事打搅你的。',
            '<25>{#f/3}* 而你，人类...',
            '<25>{#f/2}* 你和离开的那位“朋友”\n  闯了不少祸。',
            '<25>{#f/1}* 许许多多怪物都...\n  哎，你知道我要说什么。',
            '<25>{#p/kidd}{#f/4}* ...到底怎么了？',
            '<25>{#p/asgore}{#f/7}* 没事，没事。\n* 我只是觉得...',
            '<25>{#f/5}* 相比... 我刚说的，\n  你还可以做点更有意义的事。',
            '<25>{#f/5}* 说不上来为什么，不过...\n  也许帕派瑞斯没说错。',
            '<25>{#f/6}* 既然你的“朋友”\n  已经抛下了你...',
            '<25>* 那你就有机会重新来过了。',
            "<25>{#p/kidd}{#f/1}* 我会帮忙的！",
            '<25>{#p/asgore}{#f/6}* 哈哈，小家伙，\n  说不定你真能帮上忙。\n* 真说不定呢。',
            '<25>{#f/5}* 我们上次见面之后，\n  我就努力在想... \n  这一切究竟是怎么回事。',
            '<25>{#f/2}* 真的不想承认，可...\n* 他实在陷得太深了。',
            '<25>{#f/2}* 我的儿子...\n  再也回不来了。',
            "<25>{#p/kidd}{#f/4}* 你们聊吧，我先不插嘴了...",
            '<25>{#p/asgore}{#f/1}* 没关系，没关系。\n  我快说完了。',
            '<25>{#f/1}* 人类，我刚说的话\n  往心里去吧。',
            '<25>{#f/1}* 这我唯一的请求了。'
         ],
         asgoreMK2: [
            "<25>{#p/kidd}{#f/2}* 哇... 他好厉害！",
            "<25>{#f/1}* 之前听别人说过国王的演讲。\n  但亲眼见到，真的酷毙了！",
            '<25>{#f/3}* 他要是我爹该多好啊...'
         ],
         asriel32: [
            '<25>{#p/asgore}{#f/15}* ...',
            '<25>{#f/16}* 看来我的话\n  你一个字都没听进去。',
            '<25>{#p/asriel2}{#f/3}* 那肯定的。',
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#f/16}* 你知道吗...\n  有件事一直困扰着我。',
            '<25>{#f/16}* 现在你不认我这个爹，\n  可你就是我的儿子啊...',
            '<25>{#f/15}* 尽管那是很久以前的事了。',
            '<25>{#p/asriel2}{#f/10}* 你到底想说啥？',
            '<25>{#p/asgore}{#f/12}* ...',
            '<25>{#p/asgore}{#f/12}* 唉... 究竟怎么了？',
            '<25>{#f/12}* 为什么...\n  我面前的这个你... \n  看着这么陌生？',
            '<26>{#p/asriel2}{#f/6}* 你真想知道吗？',
            '<26>{#p/asgore}{#f/7}* ...',
            '<26>{#p/asriel2}{#f/7}* 说实话。',
            '<26>{#p/asgore}{#f/1}* ...\n* 呃，不...\n* 我不太确定...',
            "<26>{#p/asriel2}{#f/8}* 切。\n* 这怂样，才像我认识的\n  艾斯戈尔嘛。",
            "<26>{#f/6}* 只会装作啥~事儿\n  都没有的样子，\n* 我说得没错吧？",
            "<26>{#f/7}* 老东西，你猜怎么着？\n* 现在想亡羊补牢，已经晚喽。",
            "<26>{#f/8}* （要不是你拿这该死的\n  全息影像糊弄我，现在就可以\n  好好“开导开导”你。）",
            '<26>{#p/asgore}{#f/12}* ...',
            '<26>{#p/asriel2}{#f/8}* ...',
            '<26>{#p/asgore}{#f/15}* 你知道吗？我常常在想...\n  自己为何沦落到如此地步。',
            '<25>{#f/16}* 家园被毁，爱子离去，\n  只能被束缚在\n  这片土地之上...',
            '<25>{#f/15}* 如今，前哨站危在旦夕，\n  我却只能眼睁睁地看着。',
            "<25>{#p/asriel2}{#f/15}* 您老这是在向我寻求\n  独到见解吗？\n* 真是可悲...",
            '<25>{#f/16}* 就让我给你个小小的忠告吧：\n* 下辈子，别再挑起战争了。',
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#f/4}* 你...',
            '<25>{#f/2}* ...',
            '<25>{#f/6}* 艾斯利尔，你猜怎么着？\n* 我想通了。',
            "<25>{#f/7}* 你说的都对。",
            '<25>{#f/5}* 跟你讲理，完全是浪费时间。',
            "<25>{#p/asriel2}{#f/15}* ...哇。\n* 您可终于开窍了。",
            '<25>{#f/16}* 真令我刮目相看啊。',
            '<25>{#p/asgore}{#f/1}* ...',
            "<25>{#p/asriel2}{#f/10}* 然后呢？\n* 这位英明的国王\n  要怎么行动呢？",
            '<25>{#p/asgore}{#f/15}* 你认真的？',
            '<25>{#f/15}* ...',
            '<25>{#f/16}* 我不知道，艾斯利尔。'
         ],
         asriel33: [ '<25>{#p/asriel2}{#f/10}* ...他这是要发火了？' ],
         
         asriel34: [
            "<25>{#p/asriel2}{#f/3}* 我去处理点事，\n  你俩先作个伴。",
            '<25>{#p/kidd}{#f/3}* 你一会还回来吗？\n* 还想听你讲更多\n  安黛因的轶事呢...',
            "<25>{#p/asriel2}{#f/4}* 说到做到。",
            "<25>{#f/1}* 别担心，我去去就回。",
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
                       '<25>{#p/asriel2}{#f/1}* 哈喽，$(name)。',
                       '<25>{#f/13}* 想我了没？',
                       '<25>{#f/4}* 唉，对不起。\n* 刚才我有事要办，\n  又把你扔下了。',
                       "<25>{#f/3}* 不过，我可没闲着。",
                       "<25>{#f/13}* $(name)，\n  我看到你那小伙伴\n  和你告别...",
                       '<25>{#f/16}* 你肯定感觉老~孤单了。\n  对不对？所以呢...'
                    ],
                    []
                 ][Math.min(SAVE.flag.n.ga_asriel35++, 1)],
         asriel37: () => [
            '<25>{#p/asriel2}{#f/1}* 我又把它请回来了！',
            "<25>{#f/17}* 我让你做啥，你就做啥。\n  听见没有？",
            '<25>{#p/kidd}{#f/9}* 嗯...'
         ],
         asriel38: () => [
            ...[
               [
                  
                  '<25>{#p/asriel2}{#f/17}* 瞧，不错吧？',
                  "<25>{#f/16}* 跟你说，\n  为了让它能服服帖帖的，\n  我费了好大功夫呢！",
                  ...(SAVE.data.n.state_foundry_muffet === 1
                     ? [
                          '<25>{#f/15}* 那崽子嘴里一直叨咕\n  “忘了我忘了我”，没完没了...',
                          '<25>{#f/10}* 天呐，$(name)。\n* 我不在的时候，\n  你对它干了些什么啊？'
                       ]
                     : [
                          "<25>{#f/15}* 那崽子没完没了地问\n  “我的朋友在哪”...",
                          '<25>{#f/10}* 天呐，$(name)。\n* 我不在的时候，\n  你俩一起干了些啥啊？'
                       ]),
                  "<25>{#f/3}* 呃，当我没问。\n* 过去的就翻篇吧。重要的是，\n  它又能“陪”着咱们了。"
               ],
               [ "<25>{#p/asriel2}{#f/3}* 唔...\n  最起码把它搞定了。" ]
            ][Math.min(SAVE.flag.n.ga_asriel38++, 1)]
         ],
         asriel39: [
            '<25>{#p/asriel2}{#f/8}* 停。\n* 小崽子，帮个忙。',
            '<25>{#p/kidd}{#f/9}* ...？',
            '<25>{#p/asriel2}{#f/6}* 解开谜题。'
         ],
         asriel40: () =>
            SAVE.flag.n.ga_asriel40++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/10}* 完活了？\n* 真快啊...',
                    '<25>{#f/3}* $(name)，你瞧：\n  优柔寡断，磨磨叽叽\n  就是怪物的劣根性。',
                    '<25>{#f/16}* 什么希望，恐惧，同理心...\n* 那群怪物就是被这毁了，\n  最后一个个都一事无成。',
                    "<25>{#f/15}* 要是怪物们都能像\n  这崽子一样说一不二，\n  那该多好啊。"
                 ]
               : [ '<25>{#p/asriel2}{#f/4}* 搁这照葫芦画瓢呢。' ],
         asriel41: [ '<25>{#p/asriel2}{#f/3}* 小崽子，回来。' ],
         asriel42: [ "<25>{#p/asriel2}{#f/4}* 只要有了这崽子，\n  完成计划简直不要太简单。" ],
         asriel43: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/16}* 结束了...",
                  "<25>{#f/3}* $(name)，我们赢了。",
                  '<25>{#f/2}* 总算解决掉了\n  皇家卫队的队长...',
                  '<25>{#f/15}* 她不会真觉得\n  自己能干得过咱们吧？',
                  SAVE.flag.n.undying > 2
                     ? '<25>{#f/8}* 诚然，\n  她逼咱们回溯了好几次...'
                     : SAVE.flag.n.undying > 1
                     ? '<25>{#f/8}* 诚然，\n  她逼咱们回溯了一次...'
                     : '<25>{#f/8}* 诚然，她够英勇。\n  敢和我们对着干...',
                  '<25>{#f/7}* 但她再怎么逞强，\n  终究也难逃厄运。'
               ],
               [
                  '<25>{#p/asriel2}{#f/3}* ...这次虽然胜了，\n  但没第一回爽。',
                  '<25>{#f/4}* 唉，好吧。'
               ],
               [ '<25>{#p/asriel2}{#f/6}* 杀她都快成咱们的\n  家常便饭了。' ],
               [ '<25>{#p/asriel2}{#f/6}* ...' ]
            ][Math.min(SAVE.flag.n.ga_asriel43++, 3)],
         asriel44: [ '<25>{#p/asriel2}{#f/13}* 呃，$(name)，\n  你来带路吧。' ],
         asriel45: [
            '<25>{#p/asriel2}{#f/13}* 嘻嘻嘻...{%40}',
            "<25>{#f/16}* 有你帮助我，真是太好了。{%40}",
            "<25>{#f/1}* 这身体确实不完美，\n  但那又怎样？{%40}",
            "<25>{#f/2}* 有了它...\n  我就再也不用当\n  会说话的蠢星星了。{%40}"
         ],
         asrielHug1: [ '<25>{#p/asriel2}{#f/13}* ...' ],
         asrielHug2: [ '<25>{*}{#p/asriel2}{#f/13}* $(name)...{^100}{%}' ],
         asrielHug3: [ '<25>{#p/asriel2}{#f/13}* 呃...\n* 谢谢你，$(name)。' ],
         bombshell1: [
            '<32>{*}{#p/alphys}* 会说话的... 星星...？',
            '<32>{*}* 但那个实验...\n  不-不是失败了吗...',
            '<32>{*}* 莫非...'
         ],
         bombshell2: [ '<32>{*}* 不...', '<32>{*}{@random=1.1/1.1}* 不...' ],
         bombshell3: [
            '<32>{*}{@random=1.1/1.1}* 托丽尔...\n* 衫斯...\n* 帕派瑞斯...',
            '<32>{*}{@random=1.1/1.1}* 安黛因...',
            "<32>{*}{@random=1.1/1.1}* 是-是我...",
            
         ],
         bombshell4: [ "<32>{*}{@random=1.1/1.1}{#i/5}* 是我害死了你们..." ],
         kidd1: [
            '<25>{#p/kidd}{#f/4}* 他叫你什么来着？\n* $(name)... 是吧？',
            '<25>{#f/3}* 好，$(name)。\n  这话可别告诉他哦。',
            '<25>{#f/4}* 跟他在一块...\n  我觉得很不自在。'
         ],
         kiddFinal1: [
            '<25>{#p/kidd}{#f/11}* ...！',
            "<25>{#p/asriel2}{#f/5}* 我懂，我懂。\n* 很兴奋，是不是呀？",
            '<25>{#p/kidd}{#f/9}* ...',
            "<25>{|}{#f/12}* 我没有- {%}",
            "<25>{#p/asriel2}{#f/4}* 不用说了。\n* 没关系的。",
            '<25>{#p/asriel2}{#f/3}* 别把正事给忘了就行。'
         ],
         kiddFinal2: () => [
            '<25>{#p/kidd}{#f/9}* 安黛因...',
            '<25>{#p/asriel2}{#f/10}* ...？',
            '<25>{#f/6}* 嗯...\n* 不敢了，是不是？',
            "<25>{|}{#p/kidd}{#f/12}* 对不起，我- {%}",
            "<25>{#p/asriel2}{#f/13}* 什么“安黛因”，\n  “安呆因”...\n* 就她还配叫“英雄”？",
            '<25>{#p/asriel2}{#f/4}* 真英雄...\n  都是靠智慧取胜的。',
            SAVE.flag.n.genocide_milestone < 5
               ? SAVE.flag.n.ga_asrielKiddFinal1++ < 1
                  ? '<26>{#f/15}* 比如...\n* 呃，总之不是她。'
                  : '<25>{#f/15}* 她可算不上。'
               : '<26>{#f/3}* 比如艾菲斯。',
            '<25>{#p/kidd}{#f/12}* 她... 真的...'
         ],
         kiddFinal3: () => [
            '<25>{#p/kidd}{#f/10}* ...',
            "<25>{#f/10}* 安黛因不会死。",
            '<25>* 即使我动手，她...',
            "<25>* 她也不会死。\n* 她多强啊...",
            ...(SAVE.flag.n.ga_asrielKiddFinal3a < 1
               ? [ '<25>{#p/asriel2}{#f/8}* （吹，随便吹。）\n* （你高兴就好。）' ]
               : []),
            "<25>{#p/kidd}{#f/9}* 因为...\n* 她... 是最强的...",
            "<25>{#f/12}* 她充满了{@fill=#ff0}决心{@fill=#fff}...",
            ...(SAVE.flag.n.ga_asrielKiddFinal3a++ < 1
               ? [ '<25>{#p/asriel2}{#f/10}* 呃... 你没事吧？\n* （我去，这崽子说什么呢？）' ]
               : SAVE.flag.n.undying > 0 && SAVE.flag.n.ga_asrielKiddFinal3b++ < 1
               ? [ '<25>{#p/asriel2}{#f/8}* （它怎么知道？）' ]
               : [ '<25>{#p/asriel2}{#f/10}* ...' ])
         ],
         kiddFinal4: [ '<32>{#p/asriel2}{#f/6}* 她在那。' ],
         kiddFinal5: [ '<32>{#f/6}* 崽子。', '<32>{#f/7}* ...' ],
         kiddFinal6: [ '<32>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* 给我上。{%100}' ],
         kiddFinal7: [
            '<25>{#p/kidd}{#f/12}* ...',
            '<25>{#p/undyne}{#f/13}* 你这毛孩子，\n  来这凑什么热闹？！',
            '<25>{|}{#f/13}* 还有，你眼睛怎么- {%}'
         ]
      },
      goatreaction: () =>
         [
            [ '<25>{#p/asriel2}{#f/15}* 小心点，$(name)。' ],
            [ '<25>{#p/asriel2}{#f/15}* $(name)...' ],
            [ '<25>{#p/asriel2}{#f/15}* 开玩笑吗？' ],
            [ "<25>{#p/asriel2}{#f/15}* 我们可不想死在这，\n  $(name)..." ],
            [ "<25>{#p/asriel2}{#f/16}* 我有点担心了。" ],
            [ '<25>{#p/asriel2}{#f/8}* 你是眼瞎还是有什么毛病？' ],
            [ '<25>{#p/asriel2}{#f/7}* 别闹了！' ],
            [ '<25>{#p/asriel2}{#f/7}* ...' ]
         ][Math.min(SAVE.flag.n.ga_asrielEpic++, 7)],
      hapstadoor1: () =>
         SAVE.data.b.svr ? [ "<32>{#p/human}* (But you didn't have the key.)" ] : [ "<32>{#p/basic}* 锁住了。" ],
      hapstadoor2: [ '<32>{#p/human}* （你用神秘钥匙打开了门。）' ],
      jumpsuit1: () => [
         '<32>{#p/human}* （你捡到了一件飞行服。）',
         choicer.create('* （穿上飞行服吗？）', '是', '否')
      ],
      jumpsuit2: [ "<32>{#p/human}* （你带的东西太多，装不下它了。）" ],
      kiddStatue: [
         '<25>{#p/kidd}{#f/1}* 哟，我记得这个地方！',
         '<25>{#f/3}* 我，呃，我妈妈带我\n  来过一次，哈哈。',
         "<25>{#f/1}* 如果我们一人站在一边的\n  开关上，灯就会亮起来。\n* 很厉害吧！？"
      ],
      kitchencall: () => [
         '<32>{#p/event}* 铃铃，铃铃...',
         '<18>{#p/papyrus}人类！\n我在想。',
         ...(SAVE.data.n.plot_date < 1
            ? [
                 SAVE.data.b.flirt_papyrus
                    ? '<18>我们该挑个时间\n去约会了！'
                    : '<18>我们该挑个时间\n一起出去玩了！',
                 "<18>{#f/5}而且...\n我已经有好一段时间\n没看到你了。",
                 "<18>{#f/0}有机会叙一下旧\n真是太好了！",
                 "<18>{#f/0}那行，等你准备好了\n你就来我家找我。"
              ]
            : [
                 '<18>所以，你知道我跟你\n当初是怎么相处的吗？',
                 '<18>{#f/5}我觉得... 安黛因\n也应该跟你\n好好相处一下。',
                 '<18>{#f/4}而且，我敢打赌你们\n肯定能成为\n很好的朋友...',
                 SAVE.data.b.flirt_papyrus ? '<18>{#f/6}...朋友而已！' : '<18>{#f/0}就像咱俩一样！',
                 "<18>{#f/0}那，等你准备好\n就来安黛因的家门口\n见我吧。"
              ]),
         '<18>{#f/9}肯定会经历一段\n非常棒的时光的！',
         '<32>{#s/equip}{#p/event}* 滴...'
      ],
      madfish1: () => [
         ...(SAVE.flag.n.ga_asrielUndyneX++ < 1
            ? [ '<25>{#p/asriel2}{#f/8}* 接下来，又到了\n  听高谈阔论的时间了...' ]
            : []),
         '<32>{#p/undyne}* 站住。',
         '<32>{#x1}* 真以为自己能\n  大摇大摆地滥杀无辜，\n  没人管得了你们？',
         '<32>* 我告诉你，两个小混蛋：',
         '<32>* 你们的死期到了！',
         '<32>{#x2}* 以为自己勉勉强强\n  过了督吉这关就了不起了？\n  听好了...',
         "<32>{#x3}* 只要剩下的特战队成员\n  逮到你们，就等着受苦吧。"
      ],
      madfish2: () =>
         SAVE.flag.n.genocide_milestone < 5
            ? [
                 '<32>* 无话可说？\n* 呵。',
                 "<32>{#x4}* 眼下，我可没闲工夫陪你们玩。\n  我得去帮艾菲斯疏散民众。",
                 "<32>{#x5}* 呋呼呼...\n* 在临死之前好好挣扎吧。\n* 你活不长的。"
              ]
            : [
                 '<32>* 无话可说？\n* 呵。',
                 "<32>{#x4}{|}* 眼下，我可没\n  闲工夫陪你们玩。\n  我得去帮Alphys- {%}",
                 "<25>{#x5}{#p/asriel2}{#f/8}* 跟你说，\n  艾菲斯可比你强多了。",
                 "<25>{#f/2}* 我早就知道\n  这条时间线的后续发展了。",
                 '<25>{#f/1}* 和她比起来，\n  你的攻击屁都不是。',
                 '<32>{#p/undyne}* 真的吗？',
                 "<32>* ...好吧。\n* 即便如此，你还是得先过我这一关。",
                 '<32>{#p/asriel2}{#f/6}* 哦，相信我。\n* 我们肯定能打败你。',
                 "<32>{#p/undyne}* 走着瞧。"
              ],
      madfish3: () =>
         SAVE.flag.n.genocide_milestone < 5
            ? SAVE.flag.n.ga_asrielMadfish++ < 1
               ? [ '<25>{#p/asriel2}{#f/8}* 她爱咋咋地。' ]
               : [ '<25>{#p/asriel2}{#f/8}* ...' ]
            : [ '<25>{#p/asriel2}{#f/8}* 切。' ],
      muffet1: () =>
         badSpider()
            ? [ '<32>{#p/basic}* 啊呼呼呼呼...', '<32>* 让她下次把报酬再提点。' ]
            : SAVE.data.b.flirt_muffet
            ? [ '<32>{#p/basic}* 啊呼呼呼呼...', "<32>* Let's just pretend this never happened, shall we, dearies?" ]
            : [ '<32>{#p/basic}* 啊呼呼呼呼...', '<32>* 刚才很有趣哦！\n* 下次再见，亲！' ],
      muffet2: () =>
         badSpider()
            ? [ '<25>{#p/kidd}{#f/4}* 哟...\n  刚才那好奇怪...' ]
            : SAVE.data.b.flirt_muffet
            ? [ "<25>{#p/kidd}{#f/4}* 哟...\n  至少现在没事了？" ]
            : [ '<25>{#p/kidd}{#f/4}* 哟...\n  一点都不好玩。' ],
      muffetGeno1: () =>
         SAVE.data.n.state_foundry_kidddeath < 1
            ? [ '<25>{#p/kidd}{#f/4}* 哟...\n* 刚发生什么了？', '<25>* 她是... {%}' ]
            : [
                 '<25>{#p/kidd}{#f/4}* 哟... 她又...',
                 '<25>* 为什么怪物都这么消失呢？{%}'
              ],
      muffetGeno1x: [ "<32>{#p/basic}* 她死了。" ],
      muffetGeno2: [
         "<25>{#p/kidd}{#f/7}* 不-不...\n* 我不是故意...",
         "<25>{#f/7}* 她-她没... 不会的...\n* 她...",
         "<25>{#f/4}* 不，这...\n* 这不可-可能...",
         '<25>{#f/4}* 她只是...',
         '<25>{#f/8}* 只是...'
      ],
      muffetGeno3: [ '<25>{#f/8}* ...', '<25>{#f/8}* ...我干了什么...' ],
      mushroomdance1: [ '<32>{#p/basic}* 蘑菇舞\n* 蘑菇舞\n* 管它什么意义' ],
      mushroomdance2: () =>
         SAVE.data.n.plot === 72
            ? SAVE.data.b.f_state_mushroomdanceEpilogue
               ? [ '<32>{#p/basic}* 意思是模糊的未来。' ]
               : SAVE.data.b.f_state_mushroomdanceGeno
               ? [
                    "<32>{#p/basic}* 意思是我将自由。\n* 会有人把我移植到新家园。",
                    '<32>* But why should you care?\n* Unless...',
                    '<32>* ... unless you have absolved yourself of sin?'
                 ]
               : [
                    "<32>{#p/basic}* 意思是我将自由。\n* 会有人把我移植到新家园。",
                    '<32>{#p/basic}* Goodbye, old outpost, for you have been my abode...'
                 ]
            : world.meanie || SAVE.data.s.state_foundry_deathroom === 'f_village' // NO-TRANSLATE

            ? SAVE.data.b.f_state_mushroomdanceGeno
               ? [ "<32>{#p/basic}* 意思是... 别再和我说话。" ]
               : [
                    "<32>{#p/basic}* 意思是你过着罪恶的一生。",
                    ...(SAVE.data.b.f_state_mushroomdance ? [ "<32>* Wait.\n* Weren't you nicer before?" ] : [])
                 ]
            : SAVE.data.b.f_state_mushroomdance
            ? [
                 '<32>{#p/basic}* 要是我能看到远处的星系，\n  就好了。',
                 '<32>* 但哪怕力场被摧毁了，\n  我要怎么离开呢...？'
              ]
            : [
                 '<32>{#p/basic}* 它代表了我被菌丝困在这里，\n  所产生的内心的痛楚。',
                 '<32>* 我奋力地挣扎着。\n* 我竭力地想挣脱。\n* 可惜啊，无济于事。'
              ],
      musicbox: [
         '<18>{#p/asriel1}{#v/1}{#i/4}刚才听到的声音\n应该就是附近传来的...',
         "<18>啊！你的飞船坠毁了，\n是吗...",
         '<18>你还好吗？',
         '<18>来，我扶你起来...',
         '<18>...',
         '<18>$(name)，是吗？',
         "<18>这名字真好听。",
         '<18>{*}{#x1}{#p/asriel3}{#i/36}我的名字是   {%}'
      ],
      napcomputer1: () =>
         postSIGMA()
            ? [ "<32>{#p/basic}* It's out of service." ]
            : [
                 SAVE.data.b.svr
                    ? '<32>{#p/human}* （你走向了电脑...）'
                    : '<32>{#p/basic}* 电脑上打开了一个音乐分享软件。',
                 choicer.create('* （看一眼吗？）', '是', '否')
              ],
      napcomputer2: [ '<32>{#p/human}* （你不想看。）' ],
      napcomputer3: {
         a: () => [
            '镁塔静听 - 日光涟漪.kwac',
            '镁塔静听 - 星河渡歌.kwac',
            SAVE.data.n.plot === 72 ? '缘聚缘散.kwac' : '恶狼.kwac',
            '喵喵航天行 - 主题曲.kwac',
            !world.genocide && SAVE.data.n.state_starton_papyrus === 1 ? '帕派瑞斯求包养.kwac' : '滑腔动调.kwac',
            '群星之歌.kwac'
         ],
         b: () => [
            '酷炫骷髅95',
            '酷炫骷髅95',
            SAVE.data.n.plot === 72 ? '_舟亢忝洐_' : '_摋掱亾耦_',
            '艾菲斯',
            '懒骨.',
            '（游客）'
         ]
      },
      napcomputer4: {
         a: () => [ '鬼怪舞曲.kwac', '鬼怪混音集.kwac' ],
         b: () => [ '纳普斯特22', '纳普斯特22' ]
      },
      noTem: [ "<32>{#p/tem}* oh no, it's a... FISHES!!!" ],
      noShroom: [ "<32>{#p/basic}* Watch out\n* Watch out\n* There's a fish running about" ],
      noTortoise: () =>
         world.population === 0 ? [ '<32>{#p/basic}* 哇哈哈...' ] : [ '<32>{#p/basic}* Run while ya still can, kid!' ],
      npc86x: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The robot appears to be asleep.)' ]
            : [ "<32>{#p/basic}* 它正处于休眠模式。" ],
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
         '<32>{#p/basic}{#npc/a}* 检测到陌生的能量信号。',
         '<32>* 姓名... 未知。',
         '<32>* 关系状态... 陌生人。',
         SAVE.data.n.plot < 42.1 ? '<32>* 上次互动... 暂无。' : '<32>* Last interaction... observed in battle.',
         '<32>* 处理中...\n* 处理中...\n* 处理中...',
         '<32>* 您好，陌生人。\n* 我叫8-6，是个\n  万能送货机器人。',
         '<32>* 这与我的预期功能相去甚远，\n  但您现在愿意完成\n  一份调查吗？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      npc86b: () => [
         '<32>{#p/basic}{#npc/a}* 谢谢您。\n* 问题如下。',
         '<32>* “在红色、绿色、蓝色\n  三种颜色中，\n  你更喜欢哪一种？”',
         choicer.create('* （你要怎么回答？）', '红色', '绿色', '蓝色', '不确定')
      ],
      npc86c: [
         '<32>{#p/basic}* 谢谢您。\n* 您的选择将深深地\n  铭刻在我的内存中。',
         '<32>{#p/basic}{#npc/a}* 您的关系状态现已被\n  设置为“熟人”。'
      ],
      npc86d: () => [
         '<32>{#p/basic}{#npc/a}* 检测到熟悉的能量信号。',
         '<32>* 姓名... 未知。',
         '<32>* 关系状态... 熟人。',
         SAVE.data.n.state_foundry_npc86 === 1
            ? '<32>* 上次互动... 拒绝调查。'
            : '<32>* 上次互动... 接受调查。',
         '<32>* 处理中...\n* 处理中...\n* 处理中...',
         '<32>* 欢迎回来，熟人。\n* 您今天过得怎样？',
         choicer.create('* （你要怎么回答？）', "愉快", "糟糕", '一般', '不确定')
      ],
      npc86e: () => [
         ...[
            [ '<32>{#p/basic}{#npc/a}* 很好？\n* 很高兴听您这么说。' ],
            [ '<32>{#p/basic}{#npc/a}* 不好？\n* 希望事情会好起来。' ],
            [ '<32>{#p/basic}{#npc/a}* 一般？\n* 可以理解。' ],
            [ '<32>{#p/basic}{#npc/a}* 不确定？\n* 这... 可以理解。' ]
         ][choicer.result],
         '<32>{#p/basic}{#npc/a}* 您的关系状态现已被\n  设置为“朋友”。'
      ],
      npc86f: () => [
         '<32>{#p/basic}{#npc/a}* 检测到熟悉的能量信号。',
         '<32>* 姓名... 未知。',
         '<32>* 关系状态... 朋友。',
         '<32>* 上次互动... 关于心情的询问。',
         '<32>* 处理中...\n* 处理中...\n* 处理中...',
         [
            '<32>* 欢迎回来，朋友。\n* 我希望自从上一次互动后，\n  您的心情仍旧很好如初。',
            '<32>* 欢迎回来，朋友。\n* 我希望自从上一次互动后，\n  您的心情好转了很多。',
            '<32>* 您好，朋友。\n* 基于上一次互动...',
            '<32>* 您好，朋友。\n* 基于上一次互动...'
         ][SAVE.data.n.state_foundry_npc86_mood - 1],
         '<32>* 看来您对我很感兴趣。',
         '<32>* 您对我最常见的情感是什么？',
         choicer.create('* （你要怎么回答？）', '爱', '恶心', '暂无', '不确定')
      ],
      npc86g: () =>
         [
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的关系状态现已被\n  设置为“挚友”。',
               '<32>* 我也爱您，挚友。'
            ],
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的关系状态现已被\n  设置为“敌人”。',
               '<32>* 我已经不需要您了，敌人。'
            ],
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的关系状态现已被\n  设置为“熟人”。',
               '<32>* 这个回答可能不太好，熟人。'
            ],
            [
               '<32>{#p/basic}{#npc/a}* ...',
               '<32>* 您的关系状态保持不变。',
               ...(SAVE.data.n.state_foundry_npc86 === 5 && SAVE.data.n.state_foundry_npc86_feelings === 4
                  ? [ '<32>* 对所有问题的预期回答\n  现已被设置为“不确定”。' ]
                  : [])
            ]
         ][choicer.result],
      npc86h: () => [
         '<32>{#p/basic}{#npc/a}* 检测到熟悉的能量信号。',
         '<32>* 姓名... 未知。',
         [
            '<32>* 关系状态... 挚友。',
            '<32>* 关系状态... 敌人。',
            '<32>* 关系状态... 熟人。',
            '<32>* 关系状态... 朋友。'
         ][SAVE.data.n.state_foundry_npc86_feelings - 1],
         SAVE.data.b.f_state_done86
            ? [
                 '<32>* 上次互动... 表达赞美。',
                 '<32>* 上次互动... 拒绝对话。',
                 '<32>* 上次互动... 闲聊。',
                 '<32>* 上次互动... 给予建议。'
              ][SAVE.data.n.state_foundry_npc86_feelings - 1]
            : '<32>* 上次互动... 询问感受。',
         '<32>* 处理中...\n* 处理中...\n* 处理中...',
         [
            [
               '<32>* 欢迎回来，挚友。\n* 我希望您一切都好。',
               '<32>* 欢迎回来，挚友。\n* 我很爱您。',
               '<32>* 欢迎回来，挚友。\n* 今天见到您很高兴。'
            ],
            [
               '<32>* ...\n* 请不要再跟我说话了。',
               '<32>* ...\n* 请不要再跟我说话了。',
               '<32>* ...\n* 请不要再跟我说话了。'
            ],
            [
               '<32>* 欢迎回来，熟人。\n* 工厂今天有点霉味。',
               '<32>* 欢迎回来，熟人。\n* 今天星光闪烁。',
               '<32>* 欢迎回来，熟人。\n* 今天蒸汽很潮湿。'
            ],
            [
               '<32>* 欢迎回来，朋友。\n* 记得吃点东西。',
               '<32>* 欢迎回来，朋友。\n* 记得休息一下。',
               '<32>* 欢迎回来，朋友。\n* 记得把事情说出来。'
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
                     ? [ '<32>{#p/basic}{#npc/a}* 帕派瑞斯在附近等着呢。', "<32>* Isn't he brave?" ]
                     : [ '<32>{#p/basic}{#npc/a}* 帕派瑞斯在附近等着呢。', "<32>* 想见见我的新邻居去吗？" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* 话说，我是从首塔过来\n  铸厂这里游览的。",
                       "<32>* 我在那几乎不认识任何人，\n  但在这，我已经遇到了\n  几个友好的邻居。",
                       "<32>* 我觉得我短期内\n  不会离开这里。"
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
                          "<32>{#p/basic}{#npc/a}* 没事的。她不咬人的。\n* 不过她可能会朝你\n  扔几支长矛。"
                       ]
                  : [ '<32>{#p/basic}{#npc/a}* 有邻居就是好。' ]
         ),
         f_echo1: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/undyne}* Citizens of the Foundry...',
                    '<32>* ... you should all know what happened to you by now.',
                    "<32>* It's time to go, and you damn well know it.",
                    "<32>* So let's get going.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/undyne}* Listen up, everyone!\n* The force field's gone!\n* We can all go home!",
                    "<32>* If you're still down there dawdling by the time we leave...",
                    "<32>* Then... we'll probably just come back for you later.",
                    "<32>* But don't make us do that!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/undyne}* 铸厂居民听好！\n* 趁现在，快给我逃！",
                    world.genocide
                       ? "<32>* 有杀人狂到达铸厂，还未落网！\n  你要是碰着了，就是死路一条！"
                       : "<32>* 有杀人狂到达铸厂，还未落网！\n  你要是碰着了，就是死路一条！",
                    "<32>* 不听劝，后果自负！！",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielEcho1++ < 1
                       ? [ '<25>{#p/asriel2}{#f/2}* 谢了，安黛因。\n* 要是还动不动碰上怪物，\n  我就真吃不消了。' ]
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 我是铸厂员工刷刷。\n* 麻烦你检查一下管道有无泄漏。',
                    "<32>{#p/alphys}* 哦- 呃... 抱-抱歉哈！\n* 我现在稍微有点忙！",
                    '<32>{#p/basic}* 好吧。\n* 我去叫顽顽来帮忙。\n* 真是谢谢您了。',
                    "<32>{#p/alphys}* 不-不用谢？？",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo2: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* Hey... everything's gonna be okay, kiddo.",
                    '<32>* (Gerson?)\n* (Is that you again?)',
                    '<32>* Oh, I dunno.\n* Is that really you, Burgie?\n* Wa ha ha.',
                    "<32>* (Yeah, yeah.)\n* (I'm just a little scared... like everyone else.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* Well, you heard her!\n* Time for us to go, kiddo!',
                    "<32>{#p/basic}* ... wa ha ha.\n* In truth, we've still got the rest of the day.",
                    "<32>{#p/basic}* (Yeah, I'm gonna hang out here for a bit longer.)",
                    "<32>{#p/basic}* (Who knows?)\n* (Maybe Frisk'll come by.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 嘿，小子。\n  听到广播里的警告了吗？',
                    '<32>* （小点声！）\n* （...所以说，\n  有个人类什么的过来了，是吗？）',
                    '<32>* 毫无疑问，是的。',
                    "<32>* （难怪呢，\n  不过强制疏散真的很烦人。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#s/phone}* 铃铃，铃铃...',
                    '<32>{#p/basic}* 嘿，孩子！\n* 我就是想问问你的新店\n  怎么样了。',
                    "<32>* 我听说开得挺不错呢！",
                    "* （...）\n* （我现在有点不方便讲话。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo3: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* I hear ya.\n* Hey, maybe it'd help if ya told me what ya saw.",
                    '<32>* From your point of view.',
                    '<32>* (Well...)\n* (It all started when...)',
                    '<32>* (I was at the force field with a bunch of others.)',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* That'd be a treat!\n* I know I'd sure as hell like to see 'em.",
                    "<32>{#p/basic}* It's kind of hard to imagine, isn't it?\n* Being saved by a human?",
                    "<32>{#p/basic}* (I know, right?)\n* (And those other humans... they're alive, too.)",
                    "<32>{#p/basic}* (What a crazy day it's been.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* 撤离？没门！\n* 我敢保证，待在原地，也没人来伤你。",
                    "<32>* （呃...）\n* （你明知道我正身处危险之中，\n  为什么还这么说？）",
                    "<32>* 或许处境确实不利，\n  但是，我碰巧知道有个东西...",
                    "<32>* 它能保护我们这些小商贩免受危险。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* 嗯？\n* 发生什么了？",
                    "<32>* （...你不知道吗？）",
                    '<32>* 等一下...',
                    "<32>* （就是那种的威胁。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo4: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* (We were all there to see the force field be taken down.)',
                    "<32>* (We'd been told something like that could happen, but when we got there...)",
                    '<32>* (The same talking star who told us to go there was holding monsters hostage.)',
                    '<32>* Little star, huh?\n* I have heard stories of a little yellow star...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* (I wonder what we'll do when we arrive on the new homeworld.)",
                    "<32>{#p/basic}* (Maybe the two of us could open a shop together!)\n* (You'd sell the trinkets...)",
                    "<32>{#p/basic}* And you'd sell the food.\n* I like the way you think about it, kiddo!",
                    "<32>{#p/basic}* But it'd likely be better if one of us sells, and the other tracks the finances.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* （啥？）\n* （蠢到家了。）",
                    "<32>* 这可是真事！\n* 想听的话，现在就给你\n  好好讲讲它的来龙去脉！",
                    "<32>* （呃，不-不必了！）\n* （我相信你，老-老人家！）",
                    "<32>* 哇哈哈！\n* 每天都能收获新知，挺不错的吧！",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* ...哇哈哈。\n* 是那个到处卖牛排的家伙，\n  对吧？",
                    '<32>* （我该怎么办！）',
                    "<32>* 嘘...\n* 没事的，孩子。\n* 那家商店是有个后门的！",
                    '<32>* （真的有吗！？！？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo5: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* (Well, he's real.)\n* (And we thought we'd helped the human beat him...)",
                    "<32>* (But he just ended up taking everyone's SOULs anyway.)",
                    "<32>* That must've been the bright light I saw...\n* I just couldn't shake it.",
                    "<32>* (Yeah, and it was even brighter at the source.)\n* (We didn't stand a chance.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* (Ha. We'll take turns, then.)",
                    "<32>{#p/basic}* (Doing the same thing all the time would get boring, don't you think?)",
                    "<32>{#p/basic}* Wa ha ha.\n* Maybe I'm just old, but I don't mind doing finances.",
                    '<32>{#p/basic}* You can have the fun job all to yourself, kiddo!',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* （看来，我们注定要在这里\n  度过余生了...）',
                    "<32>* 嘿，别小瞧皇家守卫！\n* 他们各个都是骁勇善战的猛士！",
                    '<32>* （你有把握他们能阻止那人类吗？）',
                    "<32>* 那个人类小孩吗？\n* 我不确定，感觉难度挺大的。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielEcho4++ < 1
                       ? [ '<25>{#p/asriel2}{#f/5}* 嘻嘻嘻...' ]
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* （哇...）\n* （这扇门通往外面的阳台！）',
                    '<32>{#p/basic}* （我真的感觉星星\n  从来没有这么明亮过...）',
                    '<32>* 哈。\n* 肯定是有个扭曲力场\n  什么的。',
                    '<32>* 稍微等一下，\n  就尽情享受吧！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo6: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 然后呢？',
                    '<32>* （哎呀，你咋能不知道呢。）\n* （后面的事，大伙都知道啊。）',
                    '<32>* (From our perspective, we saw a human fending off attacks...)',
                    '<32>* (Whatever that star turned himself into was relentlessly attacking the human.)',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* I do feel like a part of me's going to miss this old place.",
                    '<32>{#p/basic}* We really made it our own.',
                    "<32>{#p/basic}* (You're kidding, right?)\n* (I won't miss this old dump for a second.)",
                    "<32>{#p/basic}* (But I guess I've also had it pretty bad up here.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 孩子，说个坏消息。\n* 那人类刚经过这里。',
                    ...(world.genocide
                       ? [
                            "<32>{#p/basic}* ...还带了个同伙。",
                            '<32>{#p/basic}* （啥？）\n* （是谁？）',
                            "<32>{#p/basic}* 哇哈哈...\n* 我说了你也不信。"
                         ]
                       : [
                            '<32>{#p/basic}* （那人还在铸厂吗？）',
                            "<32>{#p/basic}* 当然，但那人想碰到你\n  还要走好一会呢。\n* 更不用说安黛因了...",
                            "<32>{#p/basic}* （是啊，她一定会阻止人类的。）\n* （毕竟，她可皇家卫队的队长啊...）"
                         ]),
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#s/phone}* 铃铃，铃铃...',
                    "<32>{#p/basic}* 对不起，\n  这里信号不太好。",
                    '<32>* 这段时间，\n  看到什么有趣的东西了吗？',
                    '<32>* （...这个嘛...）',
                    '<32>* （流星算吗？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo7: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* （最后呢，就是，\n  人类动用了某种力量...）',
                    '<32>* （接着...）',
                    '<32>* （就是... 那事了。）',
                    '<32>* 哦... 那个啊。\n* 形势逆转的那一刻吗？',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* Hey, it's alright.",
                    "<32>{#p/basic}* On a new homeworld... you'll be able to go wherever you want.",
                    '<32>{#p/basic}* (Really? I thought I was going to settle down with you.)',
                    '<32>{#p/basic}* Oh, did you now?\n* Wa ha ha.',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    ...(world.genocide
                       ? [
                            "<32>{#p/basic}* （你说，那孩子起死回生了？）",
                            '<32>{#p/basic}* （哇。）\n* （老疯子，今天你不是\n  一般地疯啊！）',
                            '<32>{#p/basic}* ...我是会拿这事\n  开玩笑的人吗？',
                            '<32>{#p/basic}* （呃... 你不是那种人。）\n* （哼。）'
                         ]
                       : [
                            '<32>{#p/basic}* （孩子们都在疏散，\n  我们做点什么呢？）',
                            "<32>{#p/basic}* 噢，要不...\n  老一套，随便糊弄糊弄他们吧。",
                            '<32>{#p/basic}* （真不愧是你啊，怪老头。）',
                            '<32>{#p/basic}* 哇哈哈，你最懂我了！'
                         ]),
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 哦！\n* 快许个愿，孩子！',
                    "<32>* （...）\n* （永远不会实现的。）",
                    '<32>* ...自由，是吗？\n* 哇哈哈... 那我可有个\n  好消息要告诉你了。',
                    '<32>* 前不久，我刚看到\n  一个人类从这里经过。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo8: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 我有点印象。\n* 人类掌控了那股力量...\n  掌控了战局。',
                    '<32>* （对对对，然后他就开始攻击咱们了！）\n* （我还以为咱...）',
                    '<32>* 死定了？',
                    "<32>* （是这样，而且我能和别人感同身受。）\n* （每个人都惊恐万分。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* (Who else am I gonna go to?)\n* (The girls?)',
                    '<32>{#p/basic}* Hmm...\n* I see your point.',
                    "<32>{#p/basic}* (You're the only one I feel like I can rely on, old buddy.)",
                    "<32>{#p/basic}* (Using this shop to make fun of Mettaton was a blast, but it's time for a change.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* （嘿... 等风波过去了...）',
                    '<32>* （要不... 咱出去吃一顿？）',
                    "<32>* 嗯？\n* 当然喽！\n* 主意不错，孩子！",
                    "<32>* 这样我们就有盼头了。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* （看来，传说是真的...）\n* （自由真的触手可及了。）",
                    '<32>* 或许吧。',
                    "<32>* （就看国王怎么做了，是吧？）",
                    '<32>* ...到时候再说。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echo9: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 啊... 都记着呢。',
                    "<32>* (Look, whatever happens...)\n* (I'm just glad you're safe, ya fat old mole-rat.)",
                    "<32>* 哇哈哈... 真真是个好小子。",
                    '<32>* （...等我们到新家园，要不...\n  咱出去吃一顿？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* That robot... I don't know if he'll be able to stay popular on the new homeworld.",
                    '<32>{#p/basic}* But hey, if he gets poor, we can always remind him how much better off we are.',
                    "<32>{#p/basic}* (Jeez, you're even more ruthless than I am when it comes to him!)",
                    "<32>{#p/basic}* (... if he comes to our shop, we'll charge him double.)",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* （谢谢你，老人家...）\n* （和你唠嗑的时候，\n  那些烦恼啊，都忘了。）",
                    '<32>* 哇哈哈...\n* 能帮上忙，我可太高兴了。',
                    '<32>* 嘿，就算我们挺不过\n  这场风波...',
                    '<32>* ...咱还得该吃吃，该喝喝。',
                    "<32>* （是啊...）\n* （太好了。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* （“到时候再说”...？）\n* （不杀了那人，\n  难道还能放他走？）",
                    '<32>* 我心里应该有答案了。\n* 先不告诉你。',
                    "<32>* （等一下...）\n* （难不成，国王还有事\n  瞒着我们！？）",
                    '<32>* 哇哈哈...\n* 晚点再跟你说，孩子。',
                    '<32>* （...啊！？！？）',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss1: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* I don't know where I am...",
                    '<32>* I was just doing my laundry, but then there was this bright light...',
                    "<32>* Now it's like... I'm in some kind of limbo...",
                    '<32>* Please... help me...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/13}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* 有东西正在靠-靠-靠近我...\n  吓-吓-吓死我了！",
                    '<32>{#p/undyne}* 遁狗？\n* 是你吗？',
                    "<32>{#p/basic}* 是... 那玩意要过来了...\n* 啊！",
                    '<32>{#p/basic}* （咳咳）\n* 好像有啥动了下？\n* 是我的错觉吗？',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/radio}{#v/1}* 大-家-好哇！\n* 欢迎收听《午夜狂奔》！',
                    '<32>{#p/alphys}* （我嘞个-）\n* （这是什么啊！？）',
                    '<32>{#p/radio}{#v/1}* 今天是2000年9月15日，\n  还算幸运，没有发生什么大事。',
                    "<32>{#p/alphys}* （某种通讯系统...\n  肯定已经休眠了几百年了！）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss2: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* Gosh, where could I be...',
                    '<32>* We were out hunting for trash, but then this bright white light came in.',
                    "<32>* Catty thinks we're in some sort of shared dream...",
                    "<32>* But, like, wouldn't we be able to wake ourselves up?",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/15}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<23>{#p/papyrusnt}安黛因，在吗？\n我兄弟他...\n他...",
                    '<33>{#p/undyne}* 他怎么了，帕派瑞斯？',
                    '<23>{#p/papyrusnt}...',
                    '<32>{#p/undyne}* 帕派瑞斯？',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/sans}{#f/7}* 嘿，无意打扰你，\n  但你很应该疏散星港的居民。',
                    "<32>{#p/undyne}* 嗯？\n* 这是咋回事？",
                    '<32>{#p/sans}{#f/7}* ...',
                    '<32>{#p/undyne}* 你...\n  别一句话不说啊...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/radio}{#v/0}* 你说没发生什么大事！？\n* 你简直是疯了。",
                    '<32>{#p/alphys}* （嗯...）',
                    '<32>{#p/radio}{#v/0}* 来自邻近星球的外星人\n  今天就要到达了！',
                    "<32>{#p/alphys}* （我还是让它播下去吧。\n  诶嘿嘿。）",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd2
                       ? ((SAVE.data.b.f_state_dc_kidd2 = true),
                         [
                            '<25>{#p/kidd}{#f/7}* 临近星球？\n* 不会是说...',
                            '<25>{#f/2}* ...不-不可能。'
                         ])
                       : [])
                 ],
         f_echoAbyss3: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/toriel}{#f/21}* My child... are you there?',
                    '<32>* That Twinkly...',
                    "<32>* I should have known he'd cause some sort of trouble, but...",
                    "<32>* Once again... I've failed to see the reality that lay right in front of me...",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/16}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    ...(SAVE.data.b.s_state_chilldrake
                       ? [
                            "<32>{#p/basic}* 救命啊！\n* 我朋友星铁龙失踪了...",
                            '<32>{#p/basic}* 他出门去找新笑话灵感，\n  结果到现在也没回家！',
                            "<32>{#p/undyne}* 小子，别乱跑。\n* 我马上派搜救队去找你朋友。"
                         ]
                       : [
                            "<32>{#p/basic}* 救命啊！\n* 我朋友星铁龙现在很危险！",
                            '<32>{#p/basic}* 他说自己看见个人类\n  四处游荡，屠杀怪物！',
                            '<32>{#p/undyne}* 小子，别乱跑。\n* 皇家卫队会将那人类\n  绳之以法的。'
                         ]),
                    '<32>{#p/basic}* 谢谢您... 安黛因...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd3
                       ? ((SAVE.data.b.f_state_dc_kidd3 = true),
                         [ '<25>{#p/kidd}{#f/3}* 呃...\n  听起来怪吓人的，哈哈...', '<25>{#f/4}* ...' ])
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/radio}{#v/1}* 好了，不要慌！\n* 我们不会让他们欺负我们的，\n  对吧？",
                    '<32>{#v/0}* 你说得还挺一本正经的。',
                    '<32>{#v/1}* 如果我真的是认真说的呢？',
                    '<32>{#v/0}* 我觉得，这些外星人\n  有可能是很好的盟友。\n* 他们看起来人不错的。',
                    '<32>{#v/0}* 他们甚至带来了翻译领域的东西，\n  这样我们就能理解他们了！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss4: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<23>{#p/papyrusnt}HUH? WHAT'S WRONG WITH THINKING EVERYTHING'S JUST FINE?",
                    '<33>{#p/without}* well, the way i see it...',
                    "<32>{#p/without}* you're just a-{@fill=#ff0}void{@fill=#fff}-ing the problem.",
                    "<23>{#p/papyrusnt}UGH... MAYBE YOU'RE RIGHT. THINGS DO SEEM PRETTY... {@fill=#ff0}DARK{@fill=#fff}.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/23}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/undyne}* 没听懂吗？\n  那可不是什么好对付的小混混...\n  趁现在快逃！不然下个遭殃的就是你！",
                    "<32>{#p/basic}* 那家伙是谁我不在乎。\n* 我只在乎能不能履行职责，\n  保护好前哨站！",
                    "<32>{#p/basic}* 你不是很想揍人类一顿吗？\n  那你现在就过来啊！",
                    '<32>{#p/undyne}* 狗来米！！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd4
                       ? ((SAVE.data.b.f_state_dc_kidd4 = true),
                         [
                            "<25>{#p/kidd}{#f/1}* 老兄，皇家卫队真勇猛啊！",
                            "<25>{#f/3}* 有他们保护我们...\n  真是太好了！"
                         ])
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/radio}{#v/1}* 是啊，是啊...\n* 如果要在这里跟外星人\n  卿卿我我的话...",
                    '<32>{#v/1}* 我们就不能光是走上去\n  说句“哈喽”就完事了。',
                    "<32>{#v/0}* ...这不是艾罗戈喜欢的\n  打招呼方式吗？",
                    "<32>{#v/0}* 那家伙肯定喜欢看西部电影，\n  毫无疑问。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd4
                       ? ((SAVE.data.b.f_state_dc_kidd4 = true),
                         [ '<25>{#p/kidd}{#f/1}* 艾罗戈？', '<25>{#f/1}* 艾罗戈国王！？', '<25>{#f/3}* 天...' ])
                       : [])
                 ],
         f_echoAbyss5: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/kidding}* Yo... what is this place?',
                    "<32>* It's really dark, and I can't see anything in here...",
                    "<32>* I'm scared...",
                    '<32>* Is anyone there?\n* Please... someone help me...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/22}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/alphys}* 新身体用着怎么样？",
                    '<32>{#p/mettaton}* 真的很不错。\n* 我再看看有没有故障零件。',
                    "<32>{#p/alphys}* 那-那就好。\n* 我研究研究\n  怎么优化能量分配。",
                    "<32>{#p/mettaton}* 博士，别担心。\n* 我们还有的是时间。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/alphys}* 难道我...\n  我就只能袖手旁观吗？',
                    "<32>{#p/mettaton}* 唉... 还有别的可做吗？\n* 战斗？你可不擅长。",
                    "<32>{#p/mettaton}* 你要是现在冲上去，\n  很可能会丧命。\n  怪物们也会失去一员大将。",
                    '<32>{#p/alphys}* 为什么...\n  为什么我总遇到这种事...',
                    "<32>{#p/mettaton}* ...平心而论，\n  你还是第一次看到怪物死吧。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<33>{#p/radio}{#v/0}* 你别跟别人说，\n  我觉得他们有些人还挺可爱的。',
                    '<32>{#v/1}* 呃... 你什么意思？',
                    "<32>{#v/0}* 什么？\n* 我不是那种意思。\n* 我就是单纯觉得可爱。",
                    '<32>{#v/0}* 就像宠物的那种。',
                    "<32>{#v/1}* ...\n* 有一个听众给我们电台\n  打电话过来了。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss6: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/alphys}* How strange...',
                    '<32>* So our SOULs have been absorbed into another being.',
                    '<32>* This could be a kind of \"separate plane\" where we\'re held before...',
                    '<32>* ... wait.\n* There m-might be a way I could contact the others!',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/10}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    world.genocide
                       ? "<32>{#p/basic}* 那人类跟艾斯利尔快到这里了，\n* 只要发现他们，定将其一举歼灭！"
                       : "<32>{#p/basic}* 那人类快到这里了，\n* 只要我发现了，定将其一举歼灭！",
                    "<32>{#p/undyne}* 督吉，你肯定知道\n  即将面对的是什么敌人。",
                    dogex()
                       ? '<32>{#p/basic}* 那个人类要对在星港的死难负责。\n* 我绝不会心慈手软！'
                       : world.dead_canine
                       ? "<32>{#p/basic}* 朋友的生命亲手葬送在敌人手里。\n* 我绝不会心慈手软！"
                       : '<32>{#p/basic}* This is the moment I have long prepared myself for.\n* I will not falter!',
                    "<32>{#p/undyne}* 好！！去让那个人类见识一下\n  特战队的实力吧！！",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/radio}{#v/0}* 您好啊，亲爱的听众，\n  欢迎致电《午夜狂奔》。\n* 您有带来什么消息吗？',
                    "<32>{#p/human}* 是的，我有几句话要说。\n* 实际上，我们人类还没有\n  准备好这种事情呢。",
                    "<32>{#p/radio}{#v/0}* 所以你什么意思？\n* 我们太笨了理解不了\n  外星人的概念吗？",
                    "<32>{#p/human}* ...你太天真了。\n* 我真正担心的不是我们，\n  而是... 外星人他们。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss7: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* Where am I?\n* What is this... place?',
                    "<32>{#p/alphys}* Hello?\n* I'm Dr. Alphys, and I'm... t-trying something!",
                    "<32>{#p/basic}* Dr. Alphys!\n* I'm here, can you hear me?",
                    "<32>{#p/alphys}* Yes... yes!\n* I just have to think about them... and I'm there!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/21}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 我是铸厂员工刷刷。\n* 就人类一事，我深感担忧。',
                    '<32>{#p/alphys}* 呃...\n* 安黛因应该帮得上忙...\n  她远比我能干...',
                    '<32>{#p/basic}* 赞成。\n* 您的确啥忙也帮不上。',
                    '<32>{#p/alphys}* 没-没礼貌...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/radio}{#v/1}* 唉，得了吧。\n* 我们对他们来说算不上威胁。\n* 他们掌握着全部的主动权呢！",
                    "<32>{#p/human}* 话是这么说，\n  但你看到他们的行为方式了吗？\n* 他们真的很好...",
                    "<32>* 我知道你们俩不会伤害他们，\n  但总有人类会利用这一点的。",
                    '<32>{#p/radio}{#v/1}* 是啊... 唉...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss8: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* My name is Thomas Roman.\n* Royal scientist, and trusted associate of the crown.',
                    "<32>{#p/alphys}* Professor Roman?\n* But you're...",
                    '<32>{#p/basic}* My name is Thomas Roman.\n* Royal scientist, and trusted associate of the crown.',
                    "<32>{#p/alphys}* He's repeating...\n* It must just be the professor in everyone's memory.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/3}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<23>{#p/papyrusnt}我是帕派瑞斯。\n听到提示音后尽管留言！',
                    '<33>{#p/undyne}* 该死...',
                    '<33>{#p/undyne}* 帕派瑞斯，我真不该让你遭这种罪。',
                    '<33>{#p/undyne}* 你们兄弟俩命不该如此。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/undyne}* ...就连督吉也没能拿下那个人类。',
                    "<32>{#p/sans}{#f/7}* 老实说，这不是个好消息。\n* 铸厂的居民疏散了吗?",
                    "<33>{#p/undyne}* 在这个关头，\n  所有人都知道发生了什么。\n* 他们会撤离的。",
                    "<32>{#p/sans}{#f/7}* i feel like it's better to be safe than sorry.\n* but what do i know.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/radio}{#v/0}* 嘿，振作起来。\n* 别让那个家伙把你弄得这么失落，\n  好吗？",
                    "<32>{#v/1}* 但他说得有道理...\n* 对大多数人来说，\n  这个情况都让人不知所措。",
                    "<32>* 并不是每个人的想法都像你...\n  还有你当做宠物般的那种痴迷...\n  那样的纯洁。",
                    '<32>{#v/0}* 先等一下！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ],
         f_echoAbyss9: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/alphys}* Yeah, just think of who you'd like to see, and you'll be with them.",
                    '<32>{#p/asgore}* Asriel... are you there?',
                    "<32>{#p/alphys}* Huh, it's not working...\n* Maybe there's not enough of him left in us?",
                    '<32>{#p/asgore}* Please... come back...',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/25}* ...' ] : [])
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/undyne}* 可以请你帮我个忙吗？',
                    '<32>{#p/basic}* Ahuhuhu~\n* Anything for the one who now occupies the old nest~',
                    world.genocide
                       ? "<33>{#p/undyne}* Track down the human and their accomplice. Take them to me.\n* Biggest payout you've ever had."
                       : "<33>{#p/undyne}* 找到那个人类并带给我。\n* 你会得到你有生以来最大的一笔钱。",
                    "<32>{#p/basic}* 嗯...\n* 我会试试看的~",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd9
                       ? ((SAVE.data.b.f_state_dc_kidd9 = true), [ '<25>{#p/kidd}{#f/4}* 该不会是那蜘蛛吧...' ])
                       : [])
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/radio}{#v/1}* 好了，好了。\n* 承认自己喜欢什么并不丢人。",
                    "<32>{#v/0}* 我不是那个意思！",
                    "<32>{#v/1}* 说到爱，让我们来听听\n  俱乐部里流行的那种\n  爵士乐吧...",
                    '<32>{#v/1}* 《和外星人结婚》！',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd9
                       ? ((SAVE.data.b.f_state_dc_kidd9 = true),
                         [ '<25>{#p/kidd}{#f/2}* 噗，只有人类能想出来\n  这种标题吧。' ])
                       : [])
                 ],
         f_echoAbyss10: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/undyne}* I can't keep holding on...",
                    '<32>{#p/undyne}* The others... have already slipped away...',
                    "<32>{#p/undyne}* It's like they don't know who they are anymore...",
                    "<32>{#p/undyne}* No... no!\n* Not like this...\n* I can't forget who I am!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/21}* ...' ] : [])
                 ]
               : world.genocide
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/mettaton}* 博士啊...',
                    "<32>{#p/mettaton}* 我该料到你会就这么逃跑的...",
                    '<32>{#p/mettaton}* ...\n* 该死...',
                    "<32>{#p/mettaton}* 你不明白吗？",
                    "<32>{#p/mettaton}* 没有你，我没法完善\n  那些防御部件啊...",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : geno()
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/mettaton}* 唉，他们马上就到了。\n* 不知道你会怎么应对这种场面，\n  不过...",
                    '<32>{#p/mettaton}* 不管你在这坚守阵地，\n  还是打了退堂鼓...',
                    "<33>{#p/mettaton}* 我都会全力支持你。",
                    '<32>{#p/alphys}* ...呃呵呵...',
                    '<33>* 你也一样，镁塔顿。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/alphys}* 等下等下！\n* 这首放在我和安黛因的约会\n  应该很完美...',
                    '<32>{#p/mettaton}* 哦真的吗？',
                    "<32>{#p/alphys}* 镁塔顿！？\n* 你是从哪...\n* ...我没说要跟谁约会！",
                    "<32>{#p/mettaton}* 哦，你别担心。\n* 我会保守你的秘密的。\n* ...大概吧。",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。',
                    ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd10
                       ? ((SAVE.data.b.f_state_dc_kidd10 = true),
                         [
                            '<25>{#p/kidd}{#f/1}* 艾菲斯想跟安黛因\n  结婚！？',
                            '<25>{#f/6}* 真是每天都能学到\n  新东西啊...'
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
                       '<32>{#p/basic}{#npc/a}* 这是一台讯星。\n* 它会重复它刚刚接收到的讯息，\n  一遍又一遍...'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Hopefully the stars out there are more honest.' ]
                  : [ '<32>{#p/basic}{#npc/a}* 绝对不要相信一颗星星。', '<32>* 它们最典型的特质就是欺诈。' ]
         ),
         f_echoLobby: () =>
            world.runaway
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* Raddy of the foundry crew.\n* We've no time to keep running the show here.",
                    "<32>* Don't worry about pipes, unless you're slidin' through em to escape!",
                    '<32>* Got it, Skrubby?\n* Large lata?\n* My teeny tini?',
                    "<32>* We've gotta go, right away.",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    "<32>{#p/basic}* Raddy of the foundry crew.\n* Everyone, you've done a real great job so far.",
                    "<32>* Now that we're free, we can all give it a rest!",
                    '<32>* Ya hear that, Skrubby?\n* Large lata?\n* My teeny tini?',
                    "<32>* It's time for a totally tubular celebration!",
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
                 ]
               : [
                    '<32>{#s/echostart}{#p/event}{#npc/a}* 讯号开始...',
                    '<32>{#p/basic}* 我是铸厂员工刷刷。\n* 向您报告我和顽顽的检修成果。',
                    geno()
                       ? "<32>{#p/alphys}* 那真是... 太-太好了...\n* 因为，我-我现在没空修复它，\n  所以只能..."
                       : '<32>{#p/alphys}* 呃... 很-很高兴\n  你们修好了它！',
                    '<32>{#p/basic}* 没事。\n* 您啥忙都没帮上，\n  但我还是谢谢您嘞。',
                    '<32>{#p/alphys}* ...不客气。',
                    '<32>{#s/echostop}{#p/event}{#npc}* 讯号终止。'
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
                       '<25>{#p/kidd}{#npc/a}{#f/2}* 哟，你也是来这看她的吗？',
                       "<25>{#f/1}* 哈哈。\n* 她最酷了！！",
                       '<25>{#f/2}* 我长大了要成为她那样...'
                    ],
            () =>
               world.genocide
                  ? [ '<25>{#p/kidd}{#npc/a}{#f/4}* ...' ]
                  : SAVE.data.n.plot === 33
                  ? [ '<25>{#p/kidd}{#npc/a}{#f/3}* He always gets kicked out for pulling awful pranks.' ]
                  : [ '<25>{#p/kidd}{#npc/a}{#f/1}* 你先走吧。', "<25>{#f/1}* 我随后就来！" ]
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
                       '<32>{#p/basic}{#npc/a}* 我和我的朋友Shortsy\n  打算建一座桥。',
                       "<32>* 他倒是有自己的想法。\n* 但就我而言，我只是不想再用\n  那个不稳定的木筏了。",
                       "<32>* 希望我们能做得\n  比之前更好吧。"
                    ]
                  : [
                       "<32>{#p/basic}{#npc/a}* How'd you like our bridge?\n* Was it stable?\n* Was it gravitationally secure?",
                       "<32>* 哎呀，Shortsy反正说这桥可牢靠了。\n  它在这方面可懂行了。",
                       "<32>* 我来这基本上只是帮它拿工具！"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* Shortsy told me about a new kind of tool recently...' ]
                  : SAVE.data.n.plot < 48
                  ? [ "<32>{#p/basic}{#npc/a}* 情绪不稳定，\n  和其他人合不来。\n* 这就是我。" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* Don't get it twisted.\n* I'm a fantastic tool-toter.\n* That's just what I do."
                    ]
         ),
         f_shortsy: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我和我的伙伴Longsy\n  想成为全职建筑师。',
                       "<32>* I've invented a brand new tool for Longsy to use...",
                       "<32>* ... called the builder's wand."
                    ]
                  : SAVE.data.n.plot < 48
                  ? [
                       '<32>{#p/basic}{#npc/a}* 我和我的伙伴Longsy\n  想造座桥给国王看看。',
                       "<32>* 这会是你见过的最笔直、\n  最坚固的桥。",
                       "<32>* 我向你保证！"
                    ]
                  : [
                       '<32>{#p/basic}{#npc/a}* 瞧瞧咱俩新建的桥。',
                       '<32>* 我的Longsy觉得\n  这肯定能打动国王的...',
                       "<32>* It needs to be if we're going to work alongside him!"
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}{#npc/a}* With enough power, it could create anything you can imagine...' ]
                  : SAVE.data.n.plot < 48
                  ? [ "<32>{#p/basic}{#npc/a}* 不遗余力，\n  将事情做到最好。\n* 这就是我。" ]
                  : [
                       "<32>{#p/basic}{#npc/a}* 不用谢咱俩，社区服务罢了。\n* 就是这样。"
                    ]
         ),
         f_snail1: () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}{#npc/a}* (Snail snail...)\n* Everyone's leaving, it seems." ]
               : [ '<32>{#p/basic}{#npc/a}* （蜗牛蜗牛...）\n* 每一天都要乐观...' ],
         f_snail2: () =>
            SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}{#npc/a}* (Snail snail...)\n* It's time for us to go." ]
               : [ "<32>{#p/basic}{#npc/a}* （蜗牛蜗牛...）\n* 结局好，一切都好..." ],
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
                       "<32>{#p/basic}{#npc/a}* 草是什么？",
                       ...(world.genocide
                          ? [ '<32>* 它能找到你吗？', '<32>* 它能吃掉你吗？', '<32>* 它能杀掉你吗？' ]
                          : [ '<32>* 你能找到它吗？', '<32>* 你能吃掉它吗？', '<32>* 你能杀掉它吗？' ]),
                       '<32>* ...',
                       '<32>* 你是草做的吗？'
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#npc/a}* The grass may not always be greener, but who says it has to be?',
                       '<32>* A new world may have any number of colors in its grass.'
                    ]
                  : [ "<32>{#p/basic}{#npc/a}* 这草望着那草绿。" ]
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
               : [ '<32>{#p/tem}{#npc/a}* 吼！！\n* 我素提米！！！', '<32>* 别忘辣我盆友！' ],
         f_temmie4: () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#npc/a}* A pleasing development, no?' ]
               : world.genocide || 10 <= world.trueKills
               ? [
                    [ '<32>{*}{#p/tem}{#i/10}{#s.stop}* 我知道你做了什么。', '{*}{#s.resume}{%}' ],
                    [ '<32>{#p/tem}{#npc/a}* 嘿。', "<32>* 我是鲍勃。" ]
                 ][Math.min(SAVE.flag.n._bob++, 1)]
               : SAVE.data.n.plot === 47.2
               ? [ '<32>{#p/tem}{#npc/a}* 嘿。', "<32>* I'm afraid for your life." ]
               : [ '<32>{#p/tem}{#npc/a}* 嘿。', "<32>* 我是鲍勃。" ],
         f_temmie5: () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#npc/a}* 啊哇哦哇哦哇哦！！', '<32>* 银类...\n* 炒鸡...', '<32>* HEROES!!!!' ]
               : [ '<32>{#p/tem}{#npc/a}* 啊哇哦哇哦哇哦！！', '<32>* 银类...\n* 炒鸡...', '<32>* 萌呆呆！！！！' ],
         f_temmie6: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/tem}{#npc/a}* everyones go free...\n* BUT TEM!!!',
                    '<32>* TEM NOT LEAV!!!\n* TEM WATCH EG!!!',
                    '<32>* tem will be happily fambily,'
                 ]
               : [
                    '<32>{#p/tem}{#npc/a}* 提咪...\n* 看蛋！！！',
                    '<32>* 蛋... 会孵！！！',
                    '<32>* 提咪... 骄嗷父母！！'
                 ]
      },
      punchcard0: () =>
         SAVE.data.b.svr ? [ '<32>{#p/human}* (But the box was empty.)' ] : [ '<32>{#p/basic}* 箱子是空的。' ],
      punchcard1: [ '<32>{#p/basic}* 箱子里有一张明信片。' ],
      punchcard2: [ '<32>{#p/basic}* 箱子里有好几张明信片。' ],
      punchcard3: () => [ choicer.create('* （拿一张明信片吗？）', '是', '否') ],
      punchcard4: [ '<32>{#p/human}* （你获得了一张明信片。）' ],
      punchcardX: () => [
         "<32>{#p/human}* (You can't make out what's in the box...)",
         choicer.create('* (Take something out?)', '是', '否')
      ],
      puzzle1switch: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to use the switch anymore.)" ]
            : world.darker
            ? [ "<32>{#p/basic}* 果然，又卡住了。" ]
            : [ '<32>{#p/basic}* 没想到，开关居然卡住了。', '<32>* 真是惊喜连连！' ],
      puzzle2switch: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to use the switch anymore.)" ]
            : world.darker
            ? [ "<32>{#p/basic}* 果然，又卡住了。" ]
            : [ '<32>{#p/basic}* 好吧。\n* 开关还是卡住了。' ],
      puzzle3switch: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (You can't seem to use the switch anymore.)" ]
            : world.darker
            ? [ "<32>{#p/basic}* 果然，又卡住了。" ]
            : [
                 '<32>{#p/basic}* 这个开关没卡住...',
                 "<32>* ...只是坏了！\n* 信不信由你哦。"
              ],
      quiche1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The note attached to this cheesecake describes how it was abandoned.)',
                 choicer.create('* （拿走芝士蛋糕吗？）', '是', '否')
              ]
            : [
                 "<32>{#p/basic}* 这放着一块芝士蛋糕，\n  上面粘着一张字条。",
                 '<32>* “我真的承担不了\n   照顾它的重任。”',
                 choicer.create('* （拿走芝士蛋糕吗？）', '是', '否')
              ],
      quiche2: [ "<32>{#p/human}* （你带的东西太多了。）" ],
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
            ? [ "<32>{#p/basic}* 一条长椅。" ]
            : SAVE.data.n.plot === 72
            ? [ '<32>{#p/basic}* Coming back to give a lonely bench some company...\n* The gesture is appreciated.' ]
            : [ '<32>{#p/basic}* 只是工厂中央的一张\n  孤独的长椅。\n* 没什么好奇怪的！' ],
      quiche5: [ '<32>{#p/human}* （你不打算这么做。）' ],
      run1: [ '<32>{*}{#p/undyne}* 逃吧。{^20}{%}' ],
      run2a1: [ '<32>{#p/undyne}* ...', "<32>{#p/undyne}* I'll go check." ],
      run2b1: [ '<32>{#p/undyne}* (Stupid spiders...)' ],
      run2a2: [ '<32>{#p/undyne}* ...', "<32>{#p/undyne}* 我现在有点忙。" ],
      run2b2: [ '<32>{#p/undyne}* （呃...）' ],
      run3: [ "<25>{*}{#p/kidd}{#f/13}{#x1}* 我来救你！{#x2}{^20}{%}" ],
      run4: [ "<25>{*}{#p/kidd}{#f/1}{#x1}* 抱歉，我，呃...\n  我不知道怎么着陆啊！{#x2}{^20}{%}" ],
      run5: [ '<25>{*}{#p/kidd}{#f/7}{#x1}* 我嘞个...{#x2}{^20}{%}' ],
      run6: [ '<25>{*}{#p/kidd}{#f/7}{#x1}* 救命啊！！！{#x2}{^20}{%}' ],
      run6a: [
         '<25>{*}{#p/kidd}{#f/7}{#x1}* 别{@fill=#ff0}呆呆站着{@fill=#fff}了，\n  快{@fill=#ff0}过来帮我{@fill=#fff}啊，伙计！！！{#x2}{^20}{%}'
      ],
      run6b: [ '<25>{*}{#p/kidd}{#f/7}{#x1}* 快来救我啊！！！{#x2}{^20}{%}' ],
      run6c: [ "<25>{*}{#p/kidd}{#f/7}{#x1}* 我...\n* 我-我停不下来...！{#x2}{^20}{%}" ],
      run6d: [
         '<25>{*}{#p/kidd}{#f/7}{#x1}* 你在干什么啊！？{#x2}{^20}{%}',
         '<25>{*}{#p/kidd}{#f/7}{#x1}* 啊...！{#x2}{^20}{%}'
      ],
      run7: [
         '<25>{#p/kidd}{#f/4}* 呃... 哟... 哟... 伙计...',
         '<25>* 如...\n* 如果你打算伤害\n  我的朋友...',
         "<25>* 你必须先通过我这关，\n  才行。"
      ],
      run8: [
         "<25>{#p/kidd}{#f/3}* 她走掉了...",
         '<25>{#f/1}* 哟，你真是救了我一命。',
         '<25>{#f/3}* 虽然我本来是想\n  来救你的啦。',
         '<25>{#f/2}* 哈哈。',
         "<25>{#f/3}* ...老兄，\n  我感觉好累啊...",
         '<25>{#f/4}* 我觉得我该回家了。',
         '<25>{#f/7}* 我...\n* 我打赌我的父母现在\n  一定担心死我了！'
      ],
      run9: [ '<25>{#p/kidd}{#f/13}* 待... 待会见，伙计！' ],
      run10: [
         '<32>{#p/kidd}* 安黛因...\n* 你....\n* 你救了我！',
         '<32>* 啊？\n* 那个人类跑掉了？',
         "<32>* 哟，你不要乱说...",
         '<32>* 那个人类肯定是去\n  找人帮忙了！',
         "<32>* 随时都会回来的！",
         '<32>* ...',
         "<32>* 好-好吧，我会回家的..."
      ],
      run11: (charged: boolean) => [
         '<32>{#p/kidd}* 安黛因...',
         '<32>* 你救了我...？',
         '<32>* 哟... 我...\n* 我还以为自己死定了。\n* 哈哈...',
         '<32>* ...等等，你还好吗？\n* 你好像伤得很重...',
         '<32>* 都-都是我的错。\n* 我该听你的话，\n  离那人类远一点的。',
         charged
            ? '<32>* 那人类只顾着跟你战斗\n  完全没来救我...'
            : '<32>* 那人类只是站在原地...\n* 等着...\n* 等着我死。',
         '<32>* 我真的好害怕，而你...',
         "<32>* 什么？\n* 你现在就要去\n  教训那个人类？",
         '<32>* 但你受伤了...\n* 你该好好休息，哈哈...',
         '<32>* ...',
         "<32>* 什么？\n  战-战士从来都不需要休息？",
         "<32>* 安黛因...\n* 你真的超酷。"
      ],
      sansSentry: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (This sentry station strikes you as rather unnecessary.)' ]
            : world.darker
            ? [ "<32>{#p/basic}* 一个哨站。" ]
            : [ "<32>{#p/basic}* Sans's second sentry station...", "<32>* As if the first one wasn't already enough." ],
      sansSentryBack: () =>
         !world.genocide && SAVE.data.n.state_starton_papyrus === 1
            ? [ '<32>{#p/human}* （你往桌板下面看了一眼...）', "<32>{#p/basic}* 一盒骨头。" ]
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
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
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
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
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
            ? [ "<32>{#p/basic}* 黑暗中，有东西在前进。" ]
            : [ "<32>{#p/basic}* 黑暗中，有人在走动。" ],
      spider3: () => (badSpider() ? [ '<32>{#p/basic}* 它十分强大...' ] : [ '<32>{#p/basic}* 那人十分好奇...' ]),
      spider4: () =>
         badSpider() ? [ '<32>{#p/basic}* 它极其危险...' ] : [ '<32>{#p/basic}* 那人神神秘秘...' ],
      spider5: () => (badSpider() ? [ '<32>{#p/basic}* 它...' ] : [ '<32>{#p/basic}* 那人...' ]),
      spider6: () =>
         badSpider()
            ? [
                 '<32>{#p/basic}* ...将会葬身于此。',
                 '<32>* 你以为能轻易逃得掉吗，亲？',
                 '<32>* 啊呼呼~\n* 你欠下的血债，可有的还！'
              ]
            : [
                 '<32>{#p/basic}* ...会被我在此拦住。',
                 '<32>* 你以为过了特战队那关，\n  就万事大吉了，亲？',
                 '<32>* 啊呼呼呼~\n* 你可真是天真！'
              ],
      spookydate0x: pager.create(
         0,
         [ '<25>{#p/sans}* hey, i respect what you did back there.', '<25>{#f/3}* thanks.' ],
         [ '<25>{#p/sans}{#f/2}* keep it up, and i might even take you out for dinner.' ]
      ),
      spookydate0y: [
         "<32>{#p/basic}* Snas的后脑勺上\n  画着一双眼睛。",
         "<32>{#p/basic}* 感觉不太可靠的样子。"
      ],
      spookydate0z: [
         "<32>{#p/basic}* 令人惊讶的是，\n  衫斯脑袋的侧面\n  没有画耳朵。",
         '<33>{#p/basic}* 去后面看看...'
      ],
      spookydate0: pager.create(
         0,
         [ "<25>{#p/sans}* 谢谢你请我吃饭，\n  伙计。", '<25>* 很高兴能畅聊一番。' ],
         [ '<25>{#p/sans}{#f/2}* 也许我们过会还可以\n  一起去吃个晚饭。' ]
      ),
      spookydate1: pager.create(
         0,
         () => [
            '<25>{#p/sans}* 嘿，我听说你和我的兄弟\n  和好了。\n* 就是那个伟大的帕派瑞斯。',
            '<25>{#f/2}* 嗯... \n  我觉得这也是一场\n  {@fill=#ff0}伟大的胜利{@fill=#fff}。',
            "<25>{#f/0}* 我们去烤尔比那庆祝一番，\n  咋样？",
            "<25>{#f/3}* 获得了帕派瑞斯的好感，你就\n  在我内心有了一席之地。",
            choicer.create('* （你要怎么回答？）', '走吧', '不了')
         ],
         () => [ "<25>{#p/sans}* my offer remains.\n* grillby's?", choicer.create('* （你要怎么回答？）', '走吧', '不了') ]
      ),
      spookydate2a: () => [ "<25>{#p/sans}* 那行，我会特意为你从工作中\n  抽身的..." ],
      spookydate2b: () => [
         '<25>{#p/sans}* 那行，随你便了。',
         ...(SAVE.data.n.sans_doge_warning++ < 1
            ? [
                 "<25>{#p/sans}* 只是如果你在\n  战斗中受伤，\n  记得别来抱怨...",
                 '<25>{#p/sans}* ... 因为你忘了吃东西。'
              ]
            : [])
      ],
      spookydate3: [ '<25>{#p/sans}* 这里。\n* 我知道一条捷径。' ],
      spookydate4: [ '<25>{#p/sans}* 很快的捷径，不是吗？' ],
      spookydate5: [ '<25>{#p/sans}* 嘿，各位。' ],
      spookydate6: [ '<32>{#p/basic}* 好啊，衫斯。\n{#x1}* 嘿呀，衫衫~' ],
      spookydate7: [ '<32>{#p/basic}* 嘿，衫斯。\n{#x1}* （嗨，衫斯。）' ],
      spookydate8: [ "<32>{#p/basic}* 我听说你用烈焰烤尔比\n  把酒吧给点燃了，\n  是这样吗？" ],
      spookydate9: [
         '<25>{#p/sans}{#f/3}* 嗯？\n* 不，那东西完全无害。',
         '<25>{#f/2}* 能让这酒吧燃起来的\n  只有我的招牌幽默笑话。'
      ],
      spookydate9x: [ "<25>{#p/sans}{#f/3}* 哎呀，烤尔比，\n  大家伙人呢？" ],
      spookydate9y: [
         '<32>{#p/basic}{#npc/a}* ...\n* ...\n* ...',
         "<32>* ...烤尔比没说那些老主顾去哪了，\n  不过你来了他也松口气了。"
      ],
      spookydate9z: [ '<25>{#p/sans}{#f/0}* 怪事。' ],
      spookydate10: [ "<25>{#p/sans}* 为什么不过来坐一下呢，\n  伙计？" ],
      spookydate11: [
         '<25>{#p/sans}* 嗷哟，小心你坐的地方。',
         '<25>{#f/2}* 有些怪咖会把放屁垫\n  放在座位上。',
         "<25>{#f/0}* ... 那么，来点餐吧。\n* 你呲点啥？",
         "<99>{#p/human}* （你要怎么回答？）{!}\n§shift=64§烈焰\n§shift=64§烤尔比§shift=75§小汉堡{#c/0/8/7}",
         "<26>{#p/sans}{#f/2}* 嘿，听上去挺不错。"
      ],
      spookydate12a: [ "<25>{#p/sans}* 烤尔比，给我们来两份\n  烈焰你自己。" ],
      spookydate12b: [ "<25>{#p/sans}* 烤尔比，给我们来两份\n  小汉堡。" ],
      spookydate13: () => [
         "<25>{#p/sans}* 那么，你觉得我兄弟的攻击\n  咋样？",
         choicer.create('* （你要怎么回答？）', '简单', '难爆')
      ],
      spookydate14a: [
         '<25>{#p/sans}* 简单？\n* 不会吧。',
         "<25>{#f/3}* 帕派瑞斯的攻击远没有那么\n  简单。",
         "<25>{#f/0}* 你会为他制作这些攻击的时长\n  而感到惊讶。",
         '<26>{#f/0}* 哦，好吧。\n* 至少他休息了。',
         '<25>{#f/2}* 我是说，他把他的攻击手册\n  带出来了。'
      ],
      spookydate14b: [
         '<25>{#p/sans}{#f/0}* 跟我说说看。',
         '<25>{#f/3}* 有一次，在经过了\n  漫长一天的攻击修改后...',
         "<25>{#f/0}* 帕派瑞斯向我透露了\n  他先前的所有制作成果。",
         '<25>{#f/0}* 说实话，在看到的那一刻，\n  我大受震撼。',
         "<25>{#f/2}* 也许有朝一日，我会设计\n  独属于我的攻击。"
      ],
      spookydate15: [ '<25>{#p/sans}* 吃的来了。' ],
      spookydate16: [
         '<25>{#p/sans}* 不管怎样，有一点你得承认：\n  他成功地超越了自我。',
         '<25>{#f/0}* 他的那些攻击设计就是\n  很好的例子。',
         '<25>{#f/3}* 不久前，帕派瑞斯去拜访了\n  皇家卫队队长...',
         '<25>{#f/0}* 并恳求她让他加入\n  皇家守卫。',
         '<25>{#f/3}* 唉，她直接当着他的面把门\n  摔上了。\n* 经典的安黛因式作风。',
         '<25>{#f/0}* 但几个小时后，当帕派瑞斯\n  带着他的设计归来时...',
         "<25>{#f/0}* 安黛因大受震撼，所以她\n  决定给予他...",
         '<25>{#f/2}* ... 好吧，咱姑且叫做\n  “军人般的训练”。'
      ],
      spookydate17: [ "<25>{#p/sans}* 哦对了，我想问你点事来着。" ],
      spookydate18: () => [
         '<25>{#p/sans}{#f/3}* 你曾听说过一种\n  {@fill=#ff0}会说话的星星{@fill=#fff}吗？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      spookydate19a: [
         '<25>{#p/sans}* 原来你都知道啊。',
         '<25>{#p/sans}* {@fill=#003cff}讯星{@fill=#fff}。'
      ],
      spookydate19b: [ "<25>{#p/sans}* 那么，我来告诉你吧\n* 它叫{@fill=#003cff}讯星{@fill=#fff}。" ],
      spookydate20: [
         "<25>* 工厂到处都是。",
         "<25>* 如果它们接收到一条讯息，\n  就会一遍又一遍地重复着...",
         '<25>{#f/3}* 怎样？',
         '<25>{#f/0}* 其实，有一天，帕派瑞斯\n  对我讲了一些有趣的事。',
         '<25>* 有些时候，当四下无人...',
         '<25>* 一颗星星就会从天上飞下来，\n  对他说悄悄话。',
         '<25>* 有赞扬...\n* 有建议...\n* 有鼓励...',
         '<25>{#f/3}* ...也有预言。',
         '<25>{#f/0}* 很诡异，对吗？',
         '<25>* 肯定是谁用了讯星对他玩了\n  什么诡计。',
         '<25>* 帮我留意一下，行吗？',
         '<25>* 谢了。'
      ],
      spookydate21: [ '<25>{#p/sans}* ...呃，烤尔比。\n* 给我喷点雅莫万用酱呗？' ],
      spookydate22: [ '<25>{#p/sans}{#f/8}* 真是美味啊。' ],
      spookydate23: () =>
         world.population < 6
            ? [
                 "<25>{#p/sans}{#f/8}* 行吧，我要回到我的\n  岗位上了。",
                 '<25>{#f/8}* 哦对了，记得对人好点。',
                 '<25>{#f/9}* 要不然，你哪天可能就后悔了。'
              ]
            : [
                 "<25>{#p/sans}{#f/8}* 行吧，我要回到我的\n  岗位上了。",
                 '<25>{#f/8}* 对了，\n  记得把吃的带上再出门。',
                 '<25>{#f/9}* 后面可能会用上。'
              ],
      telescopeX: pager.create(
         0,
         () => [
            "<25>{#p/sans}* 我在考虑经营\n  望远镜生意。",
            "<25>{#f/3}* 放在我旁边的\n  就是所谓\n  高级望远镜。",
            '<25>{#f/3}* 我本打算明天再\n  开放给公众...',
            SAVE.data.b.voucher
               ? '<25>{#f/2}* 但因为你有那张\n  高级会员券，\n  所以你可以提前用。'
               : '<25>{#f/2}* 但咱俩很熟，\n  所以你可以提前用。',
            '<25>{#f/0}* 肿么样？',
            choicer.create('* （你要怎么回答？）', '是', '否')
         ],
         () => [ '<25>{#p/sans}{#f/2}* 要试试\n  我的望远镜吗？', choicer.create('* （你要怎么回答？）', '是', '否') ]
      ),
      telescopeY: () =>
         SAVE.data.b.voucher
            ? ((SAVE.data.b.f_state_voucher = true),
              [
                 "<25>{#p/sans}* 让我猜猜...\n* 是坏掉了吗？",
                 '<25>{#f/3}* 哦，抱歉，\n  我以为你知道呢。',
                 '<25>{#f/2}* 高级会员是需要\n  付费订阅的。',
                 ...(world.kiddo
                    ? [
                         "<25>{#p/kidd}{#f/2}* 你在开玩笑，对吧？",
                         '<25>{#p/sans}{#f/0}* 没。\n* 付费订阅。',
                         '<25>{#p/kidd}{#f/1}* 可恶！'
                      ]
                    : [])
              ])
            : [
                 "<25>{#p/sans}* 让我猜猜...\n* 是坏掉了吗？",
                 '<25>{#f/3}* 哦，抱歉，\n  我以为你知道呢。',
                 '<25>{#f/2}* 要使用高级望远镜\n  需要你具有\n  高级会员资格。',
                 ...(world.kiddo
                    ? [
                         '<25>{#p/kidd}{#f/1}* 如果我拿出会员券呢？',
                         "<25>{#p/sans}{#f/0}* 哦。\n* 这个嘛，就需要\n  付费订阅了。",
                         '<25>{#p/kidd}{#f/1}* 可恶！'
                      ]
                    : [])
              ],
      telescopeZ: [ '<25>{#p/sans}{#f/2}* 哎呀...' ],
      temmiepat1: () => [
         '<32>{#p/tem}{#npc/a}* 求...\n* 提咪听说银类喜翻\n  摸摸提咪...',
         '<32>* 尼想...\n* 摸摸嘛？？？',
         choicer.create('{#npc}* （你要怎么回答？）', '素的。', '卜要！')
      ],
      temmiepat2a: [ '<32>{#p/human}* （你摸了摸提米。）', '<32>{#p/tem}{#npc/a}* 呜哇哦哇哦哇哦.....' ],
      temmiepat2b: [ '<32>{#p/tem}{#npc/a}* ...', '<32>{#p/tem}{#npc/a}* 滚开。' ],
      temmiepat3a: [ '<32>{#p/human}* （你继续摸提米。）', '<32>{#p/tem}{#npc/a}* 呜哇哦哇哦哇哦.....' ],
      temmiepat3b: [ '<32>{#p/tem}{#npc/a}* ...' ],
      temstatue: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你按下了雕像后的开关。）',
                 '<32>{#p/human}* (The riddle here describes a statue like this one and hints at a sequence of notes.)',
                 '<32>{#p/human}* (It also mentions bringing an item to a specific opposing room.)'
              ]
            : [
                 '<32>{#p/human}* （你按下了雕像后的开关。）',
                 "<32>{#p/basic}* ...上面刻着一个谜题。",
                 '<32>* “玄机暗中已动，携友故地重游。”',
                 '<32>* “石像如我立当中，顿悟旋律路自通。”',
                 '<32>* “借力破迷踪。”',
                 
              ],
      temstatueAftuh: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (The riddle here describes a statue like this one and hints at a sequence of notes.)',
                 '<32>{#p/human}* (It also mentions bringing an item to a specific area.)'
              ]
            : [
                 '<32>{#p/basic}* “开关既已启，同友归故地。”',
                 '<32>* “石像如我立当中，顿悟旋律路自通。”',
                 '<32>* “借力破迷踪。”',
                 
                 '<32>* ...这里的开关\n  已经被拉下来了。'
              ],
      temstatueNormuh: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The sign emphasizes the fame of the statue.)' ]
            : [ '<32>{#p/basic}* “提咪的雕像... 超级著民”\n* “超级！！！！！！！！！”' ],
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
         '<32>{#s/phone}{#p/event}* 铃铃，铃铃...',
         '<25>{#p/sans}{#f/0}* 嘿，你在吗？',
         ...(SAVE.data.n.state_foundry_muffet === 1
            ? [
                 "<25>{#f/3}* it's been a while since i heard from you.",
                 '<25>{#f/2}* didja fall into a wormhole or something?'
              ]
            : [
                 '<25>{#f/3}* 有个孩子好像等不及\n  想再见到你了。',
                 '<25>{#f/2}* 你是等我走了之后\n  交了个新朋友吗？'
              ]),
         '<25>{#f/0}* ...哈。',
         "<25>{#f/0}* 我猜你现在还好。",
         '<25>{#f/3}* 我真的很想密切关注你，\n  但是...',
         "<25>{#f/0}* 出于某些原因，\n  这台昂贵的望远镜\n  没法透过墙壁看到东西。",
         "<25>{#f/2}* 我被骗了。\n* 我得打电话给我的\n  保费欺诈代理人。",
         ...(world.population === 0
            ? [
                 '<25>{#f/0}* 现在，\n  你应该不会有事的。',
                 '<25>{#f/3}* 我寻思，\n  你前头应该没啥东西。',
                 '<25>{#f/2}* 但别高兴太早，\n  也许我搞错了呢。'
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
                 "<25>{#f/3}* 有传言说，\n  有谁在垃圾处理站附近\n  大搞破坏。"
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
                    "<32>{#p/basic}* 一只站得笔挺的狗子睡得正香。",
                    ...(world.goatbro && SAVE.flag.n.ga_asrielDogepoke++ < 1
                       ? [ '<25>{#p/asriel2}{#f/10}* 不得不说，她就是这种货色。' ]
                       : [])
                 ]
               : [
                    '<32>{#p/basic}* 这只狗看起来像是睡着了，\n  但它的姿势是一种极度的\n  战备状态。',
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
               : [ '<32>{#p/basic}* “小心睡觉的狗。”' ],
         f_backsign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign speaks of strength of will in times of uncertainty.)' ]
               : [ '<32>{#p/basic}* \"Even when you\'re lost, the will to find yourself shows through.\"' ],
         f_cheesetable: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (Something about this cheese doesn't sit right with you.)" ]
               : world.darker
               ? [ '<32>{#p/basic}* 幻象罢了。' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Despite being holographic, it looks like a small slice of cheese was taken...' ]
               : [ '<32>{#p/basic}* 全息奶酪。', '<32>{#p/basic}* 桌子也是全息的。' ],
         f_creamsign: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign declares the monsters' ownership of the outpost.)" ]
               : world.population_area('s') < 6 || world.genocide || SAVE.data.n.plot === 72 // NO-TRANSLATE

               ? [ '<32>{#p/basic}* “我们声称前哨站是我们自己的，\n   而不再是用来俘虏我们的。”' ]
               : [ '<32>{#p/basic}* 象形文字被21种不同的口味\n  涂盖住了。' ],
         f_doge_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign derides boxes for their lack of real-time utility.)' ]
               : [
                    '<32>{#p/basic}* “这是一个箱子。”',
                    '<32>* “你可以把物品放进去\n   或者拿出来。”',
                    '<32>* “但你为什么要那么做？”\n* “东西放在箱子里的时候，\n   你又用不了。”',
                    '<32>* “谨上，一个箱子批评者。”'
                 ],
         f_doge1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign details the difference in power between human and monster SOULs.)' ]
               : [
                    '<32>{#p/basic}* “人类为什么要进攻？”\n* “诚然，他们似乎无所畏惧。”',
                    '<32>* “人类非常强大。\n   所有怪物的灵魂加起来...”',
                    '<32>* “...才能和一个人类灵魂的\n   力量相当。”'
                 ],
         f_doge3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign outlines a key weakness of human SOULs and its consequences.)' ]
               : [
                    '<32>{#p/basic}* “但人类有一个弱点。\n   讽刺的是，\n   这正是他们灵魂的力量。”',
                    '<32>* “他们的灵魂即使在他们死后\n   也可以在人体之外持续存在。”',
                    '<32>* “如果一个怪物打败了一个人类，\n   怪物就可以取走人类的灵魂。”',
                    '<32>* “一个有着人类灵魂的怪物...\n   一个拥有深不可测的力量的\n   宇宙生物。”',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielBeast++ < 1
                       ? [ "<25>{#p/asriel2}{#f/15}* Cosmic doesn't even BEGIN to cover it..." ]
                       : [])
                 ],
         f_doge5: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (The sign depicts something the likes of which you've never seen before.)" ]
               : [
                    "<32>{#p/basic}* 这是一幅悲惨的\n  太空生物的插画...",
                    "<32>* 这幅画有点让人不安。",
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
               : [ '<32>{#p/basic}* “这是葛森杂货铺！”\n* “想要什么，就来小店吧！\n   应有尽有！”' ],
         f_hub_sign: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign lists off what lies in each direction.)' ]
               : [
                    '<32>{#p/basic}* “向左 - 暗区”\n* “向前 - 安黛因的家”\n* “向右 - 葛森的商店”',
                    '<32>{#p/basic}* “向后 - 蜗牛保护区”'
                 ],
         f_lobbywindow: [
            "<32>{#p/human}* （你觉得你已经从另一个角度\n  看到过这样的窗户了。）"
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
               ? [ '<32>{#p/basic}* 一台垃圾处理器。' ]
               : [
                    '<32>{#p/basic}* 一个垃圾处理箱。\n* 当它启动时，极热的气体\n  会充斥整个房间。',
                    "<32>{#p/basic}* 你活不下来的。"
                 ],
         f_path1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes how a being can leave the force field.)' ]
               : [
                    '<32>{#p/basic}* “人类用一道力场\n   将我们囚禁于此。”',
                    '<32>* “一般人，没有强大的灵魂，\n   根本无法离开。”'
                 ],
         f_path2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes how the force field can be broken.)' ]
               : [
                    '<32>{#p/basic}* “想获得自由，\n   只有一个办法。”',
                    '<32>* “那就是...”',
                    '<32>* “用一股相当于七个人类灵魂的\n   强大力量击打力场，\n   将其彻底摧毁。”'
                 ],
         f_path3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (It appears this sign was very wrong indeed.)' ]
               : [
                    '<32>{#p/basic}* “但这片诅咒之地\n   远在主星系外围。”',
                    '<32>* “指望人类找到我们，\n   简直就是天方夜谭。”',
                    '<32>* “我们将永远困在这里。”'
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
                    '<32>{#p/basic}* “移动塔架，\n   引导激光射向接收器。”\n  “然后按下开关。”'
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
               : [ '<32>{#p/basic}* “要解决这个谜题，\n   你必须用上所有的塔架。”' ],
         f_puzzle3_sign: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The sign declares the decided unfairness of this puzzle as the reason it was shut down.)',
                    "<25>{#p/asriel1}{#f/20}* Yeah... this puzzle's a real pain in the butt."
                 ]
               : !world.genocide && world.trueKills < 30
               ? [ '<32>{#p/basic}* “谜题公会认为该谜题\n   难度过于逆天，\n   因此取消了这个谜题。”' ]
               : world.postnoot && world.nootflags.has('f_puzzle3') // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}* 告示牌上的内容\n  都被划去了...',
                    '<32>* ...而且还划了两次？'
                 ]
               : [
                    '<32>{#p/basic}* 告示牌上的内容\n  都被划去了...',
                    '<32>* ...字迹简直不堪入目。'
                 ],
         f_statue_kidd: () =>
            SAVE.data.b.svr
               ? [ '<26>{#p/asriel1}{#f/20}* Er, try standing the other switch.' ]
               : [ '<25>{#p/kidd}{#f/1}* 站在另一个开关上吧！' ],
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
               ? [ "<32>{#p/basic}* 一架望远镜。" ]
               : [ '<32>{#p/basic}* 这是一架“高级”望远镜。' ],
         f_temhistory: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The painting depicts a tale of a nondescript nature.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* 关于提咪的历史。' ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Tem history.\n* May its richness and deepness never be forgotten.' ]
               : [ '<32>{#p/basic}* 提咪的历史。\n* 银河系中最深远\n  最丰富的历史。' ],
         f_temhole: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Through the hole, you stare into the rumbling underbelly of the factory.)' ]
               : world.runaway ||
                 SAVE.data.s.state_foundry_deathroom === 'f_village' || // NO-TRANSLATE

                 world.genocide ||
                 30 <= world.trueKills
               ? [ "<32>{#p/basic}* 一个洞。" ]
               : [ "<32>{#p/basic}* 有个提米在洞里。\n* 提咪洞。" ],
         f_trash: pager.create(
            1,
            [ '<32>{#p/basic}* 是垃圾。' ],
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 还是垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 只是些垃圾...' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 垃圾就是垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 垃圾形状的垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 真意外，这是垃圾。' ]),
            () => (world.darker ? [ '<32>{#p/basic}* 是垃圾。' ] : [ '<32>{#p/basic}* 垃圾！！！！！！！！' ])
         ),
         f_trash1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The tablet seems to describe the lifecycle of a particular kind of flower.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* 这台平板上的数据没什么重要的。' ]
               : [
                    "<33>{#p/basic}* 这是台旧平板电脑。\n* 数据基本都损坏了...",
                    '<32>* “一朵来自远方的花...\n  第二次生命...\n  星星的形状...”',
                    "<32>* 你能认出来的就是这些。"
                 ],
         f_trash2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The tablet describes various uses for wormholes.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* 这台平板上只记了些毫无意义的琐事。' ]
               : [
                    "<32>{#p/basic}* 这是一台关于虫洞旅行的\n  平板电脑。",
                    '<32>* 另外一章节提到了\n  虫洞武器的危险...'
                 ],
         f_trash3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The tablet contains the entire run of a science fiction anime.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* 这台平板上存了些视频。\n* 你对视频内容不感兴趣。" ]
               : [
                    "<32>{#p/basic}* 这是一台上面有\n  科幻动漫的旧平板电脑。",
                    '<32>* 封面上写着\n  “喵喵星火：全集”。'
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
                    '<32>{#p/basic}* 真的吗，\n* 真的吗？\n* 真-的-吗！？',
                    '<32>{#p/basic}* 你们真是大好人。',
                    ...(SAVE.flag.n.ga_asrielDummy++ < 1
                       ? [ '<25>{#p/asriel2}{#f/13}* 我们... 真让它...', '<25>{#p/asriel2}{#f/16}* ...' ]
                       : [])
                 ]
               : SAVE.data.n.plot_date > 1.3 && SAVE.data.n.plot_date < 2.1
               ? SAVE.data.n.state_wastelands_toriel === 0
                  ? [ "<32>{#p/basic}* Don't worry.\n* Everything is fine.\n* This happens all the time." ]
                  : [ '<32>{#p/basic}* 咋的。\n* 咋的？\n* 咋-的-！？', '<32>{#p/basic}* 这种事早就见怪不怪了。' ]
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
                  : [ '<32>{#p/basic}* 呃啊。\n* 呃啊！\n* 呃-啊！', '<33>{#p/basic}* 我的生活现在真是一团糟。' ]
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
                    "<32>* 你现在是电视明星了，\n  是吧？",
                    '<32>* 是啊，镁塔顿经常能对人\n  产生这样的影响。'
                 ]
               : SAVE.data.n.plot === 47.2
               ? [ '<32>{#p/basic}* 准备好了吗，\n  她要来了！！' ]
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
                            '<32>* 把你的眼睛从我身上挪开！\n* 我又不是人人都能评价的，\n  你又不是不知道！',
                            "<32>* 像你这样软弱的凝视\n  永远比不上安黛因那\n  凶狠的凝视！"
                         ])
                 ]
               : [ '<32>{#p/basic}* 咋的。\n* 咋的？\n* 咋-的-！？', "<32>{#p/basic}* It's a living." ],
         f_view: [ '<25>{#p/kidd}{#f/14}* Awesome...' ],
         f_village_egg: () => [ "<32>{#p/basic}* 已经熟透了。" ],
         f_village_sign1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign welcomes you to the area.)' ]
               : [ '<32>{#p/tem}* “你吼！！”\n* “欢银来...”\n* “提咪村庄！！！”' ],
         f_village_sign2: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign implores you to check the nearby shop.)' ]
               : [ '<32>{#p/tem}* “你吼！！”\n* “尼赢改看看...”\n* “提咪商店！！！”' ],
         f_village_sign3: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign agrees with another sign imploring you to check the nearby shop.)' ]
               : [ '<32>{#p/tem}* “嚎吖！！窝通噫！！”\n* “赢改看看...”\n* “提咪商店！！！”' ],
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
               : [ "<32>{#p/basic}* 这是座古老的、废弃的雕像。" ],
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
            '<32>{#p/human}* （你把书放下了。）',
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
            '<32>{#p/human}* （你把书放下了。）',
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
            '<32>{#p/human}* （你把书放下了。）',
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
            '<32>{#p/human}* （你把书放下了。）',
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
            '<32>{#p/human}* （你把书放下了。）',
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
            '<32>{#p/human}* （你把书放下了。）',
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
               "<25>{#p/undyne}{#f/1}* 老实说...",
               "<25>{#f/14}* 这么长时间了，\n  那个抽屉真的越塞越满。",
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 全是骨头。'
                  : "<32>{#p/basic}* It's a drawer reserved just for Papyrus.\n* I like this."
            ],
            () => [
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 全是骨头。'
                  : "<32>{#p/basic}* It's a drawer reserved just for Papyrus.\n* I like this."
            ]
         ),
         k_broadsword: pager.create(
            0,
            () => [
               '<25>{#p/undyne}{#f/1}* 人类烂爆了，\n  不过他们的历史...\n  还挺炫酷的。',
               '<25>{#f/1}* 举个恰当的例子，\n  就是这把巨型能量剑！',
               '<25>{#f/1}* 据历史记载，人类使用长达\n  他们身高10倍的剑。',
               '<25>{#f/15}* 更不用说他们的\n  跨维度传送门了...',
               '<25>{#f/15}* 光年级的巨型战舰...',
               '<25>{#f/1}* 我第一次听说到的时候，\n  就想给自己搞一个！',
               "<25>{#f/14}* 所以我和艾菲斯一起\n  做了一把巨剑的复制品。",
               '<25>{#f/12}* 规格完全是她\n  自己算出来的！',
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 这武器似乎有一段\n  传奇的过往。'
                  : '<32>{#p/basic}* I once saw a saber just like this... except it was real, and a lot smaller.'
            ],
            () => [
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 这武器似乎有一段\n  传奇的过往。'
                  : '<32>{#p/basic}* I once saw a saber just like this... except it was real, and a lot smaller.'
            ]
         ),
         k_closet: pager.create(
            0,
            () => [
               "<25>{#p/undyne}{#f/1}* 那是我的零食柜。",
               '<25>{#f/17}* 怎么，你以为我在后面\n  藏了间卧室什么的吗？',
               '<25>{#f/8}* 噗，哈！\n* 大家都知道我睡在\n  又冷又硬的地板上。',
               SAVE.data.b.oops
                  ? "<32>{#p/basic}* 锁住了。"
                  : '<32>{#p/basic}* I get the feeling there\'s more to this \"closet\" than snacks.'
            ],
            () => [
               SAVE.data.b.oops
                  ? "<32>{#p/basic}* 锁住了。"
                  : '<32>{#p/basic}* I get the feeling there\'s more to this \"closet\" than snacks.'
            ]
         ),
         k_fridge: pager.create(
            0,
            () => [
               "<25>{#p/undyne}{#f/11}* 我不太喜欢冷食。",
               '<25>{#f/14}* 幸运的是，艾菲斯改造了\n  我的冰箱，现在它\n  可以加热食物了！',
               '<25>{#f/1}* 很厉害吧？',
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 里面有几盘预热好的\n  意大利面。'
                  : '<32>{#p/basic}* 在家里，一台热冰箱\n  就能创造奇迹。'
            ],
            () => [
               SAVE.data.b.oops
                  ? '<32>{#p/basic}* 里面有几盘预热好的\n  意大利面。'
                  : '<32>{#p/basic}* 在家里，一台热冰箱\n  就能创造奇迹。'
            ]
         ),
         k_otherdrawer: pager.create(
            0,
            () => [
               SAVE.data.b.undyne_respecc
                  ? '<26>{#p/undyne}{#f/12}* Careful with that stuff.'
                  : "<25>{#p/undyne}{#f/17}* 你要是从那抽屉里偷东西，\n  你就死定了。",
               "<32>{#p/basic}* 这是个装满了银器的抽屉。\n* 里面有叉子、勺子、刀...",
               '<32>* ...微型宇宙长矛，等离子军刀，\n  次元战斧，反重力回旋镖...'
            ],
            [
               "<32>{#p/basic}* 这是个装满了银器的抽屉。\n* 里面有叉子、勺子、刀...",
               '<32>* ...微型宇宙长矛，等离子军刀，\n  次元战斧，反重力回旋镖...'
            ]
         ),
         k_piano: pager.create(
            0,
            [
               "<25>{#p/undyne}{#f/1}* 那是我的钢琴。",
               '<25>{#f/16}* 不管你对人类有什么看法，\n  他们在声学方面都很有品味！',
               '<32>{#p/basic}* 闻起来... 很科学。'
            ],
            [ '<32>{#p/basic}* 闻起来... 很科学。' ]
         ),
         k_sink: pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 我有一次在去工作前\n  忘了关水槽。',
               '<25>{#f/17}* 当我回到家时，\n  房子完全被水淹了...',
               '<25>{#f/8}* 这对我来说完全\n  不是问题！\n* 呋呼呼！',
               '<32>{#p/basic}* 下水道干净得有点吓人，\n  完全找不到毛发的痕迹。'
            ],
            [ '<32>{#p/basic}* 下水道干净得有点吓人，\n  完全找不到毛发的痕迹。' ]
         ),
         k_stove: pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 这个炉子应该是\n  顶级的镁塔牌产品。',
               '<25>* 但是，虽然技术\n  进步了这么多...',
               '<25>* 没什么能比得上家里\n  用火魔法煮的东西！',
               '<32>{#p/basic}* 这个炉子的使用率\n  不算高也不算低。'
            ],
            [ '<32>{#p/basic}* 这个炉子的使用率\n  不算高也不算低。' ]
         ),
         k_window: pager.create(
            0,
            () => [
               '<25>{#p/undyne}{#f/16}* 唉。',
               '<25>{#f/14}* 帕派瑞斯比较喜欢\n  走“风景线”。',
               '<32>{#p/basic}* 他飞得太快了，引发了声爆。'
            ],
            [ '<32>{#p/basic}* 他飞得太快了，引发了声爆。' ]
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
               : [ "<32>{#p/basic}* 无尽的宇宙深渊，\n  唯有远处工厂的边缘\n  可以映入眼帘。" ],
         wallsign4: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign labels its location.)' ]
               : [ '<32>{#p/basic}* “向左 - 检修竖井”\n* “向右 - 铸厂出口”' ]
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
            "<32>{#p/basic}* 所以。\n* 我们前一秒还在逃命...",
            '<32>* 下一秒呢？',
            "<32>* 我们就跟她一起做意大利面。\n* 然后还把她的房子给烧了。",
            '<32>{#p/human}* （你听到了小声咯咯笑的声音。）',
            ...(SAVE.data.n.plot > 64.1
               ? [
                    "<32>{#p/basic}* Jeez.\n* We've come a long way since you first arrived, huh?",
                    "<32>* Even if there's not much left to see now...",
                    "<32>* I still appreciate the time I've spent with you."
                 ]
               : [
                    '<32>{#p/basic}* 哦，呃，抱歉！\n* 我...',
                    "<32>* 我已经有一段时间没有...\n  这么开心过了。",
                    '<32>* 只要有你在，\n  事情似乎永远都不会出错。'
                 ]),
            "<32>* 所以... 你就这样继续\n  保持下去，好吗？",
            "<32>* 至于我，我会...",
            "<32>* 我会支持你的。"
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
                 '<18>{#p/papyrus}哦嚯，\n人类到啦！',
                 ...(SAVE.data.n.state_foundry_undyne > 0
                    ? [
                         "<18>{#f/4}... THOUGH, I'M NOT QUITE SURE WHERE UNDYNE IS.",
                         "<18>{#f/5}SHE ISN'T NORMALLY OUT THIS LONG...",
                         "<18>{#f/6}AND SHE WON'T EVEN ANSWER THE PHONE!",
                         "<18>{#f/0}WELL, I'LL JUST WAIT HERE UNTIL SHE RETURNS."
                      ]
                    : [
                         '<18>{#f/4}你准备好接受这个...',
                         '<18>{#f/1}和皇家卫队队长\n做朋友的艰巨的\n任务了吗！？！？',
                         choicer.create('* （和安黛因做朋友吗？）', '是', '否')
                      ])
              ],
      unddate0x: () =>
         world.trueKills > 0 || SAVE.data.n.state_foundry_undyne > 0
            ? [
                 "<18>{#p/papyrus}{#f/0}安黛因现在不在这。",
                 "<18>{#p/papyrus}{#f/4}你得像我经常做的那样\n在这里等她。"
              ]
            : [
                 '<18>{#p/papyrus}{#f/0}好！\n准备好消遣了吗？',
                 choicer.create('* （和安黛因做朋友吗？）', '是', '否')
              ],
      
      unddate1a: [ '<18>{#p/papyrus}{#f/0}好的！\n站在我身后！' ],
      unddate1b: pager.create(
         0,
         [ '<18>{#p/papyrus}{#f/4}嗯... 还没准备好吗？', '<18>{#f/0}没关系，慢慢来！' ],
         [ '<18>{#p/papyrus}{#f/0}慢慢来！' ]
      ),
      unddate2a: [ '<18>{#p/papyrus}{#f/4}嘶嘶...\n记得给她这个。' ],
      unddate2b: [ '<18>{#f/0}她爱死这些东西了！' ],
      unddate3: [
         '<25>{#p/undyne}{#f/14}* 嗨，帕派瑞斯！',
         '<25>{#f/1}* 准备好你的超机密，\n  一对一训练了吗？',
         '<18>{#p/papyrus}当然啦！',
         '<18>{#f/9}我还带了个\n朋友来！'
      ],
      unddate4: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#p/undyne}{#f/1}* 嗨，初次见...",
                 '<25>{#f/8}* ...我的天呐！！！',
                 '<18>{#p/papyrus}{#f/6}...安黛因？',
                 "<25>{#p/undyne}{#f/12}* 呼，没想到你真捎上人类了。",
                 '<18>{#p/papyrus}{#f/5}...',
                 '<25>{#p/undyne}{#f/1}* 愣着干嘛，快进来坐坐！'
              ]
            : [
                 "<25>{#p/undyne}{#f/1}* 嗨，初次见...",
                 '<25>{#f/4}* ...',
                 '<18>{#p/papyrus}...',
                 '<25>{#p/undyne}{#f/5}* ...',
                 '<18>{#p/papyrus}{#f/5}...',
                 "<25>{#p/undyne}{#f/17}* 你们。\n* 两个。\n* 进来坐吧？"
              ],
      
      unddate5: [ '<18>{#p/papyrus}给，安黛因。', '<18>我的朋友想\n送给你这个！' ],
      unddate5x: [
         '<25>{#p/undyne}{#f/17}* There you are!',
         "<25>{#f/1}* We've been waiting here FOREVER for you!",
         "<18>{#p/papyrus}{#f/4}AND, DON'T WORRY, I ALREADY SHOWED UNDYNE YOUR GIFT.",
         '<18>{#f/0}SHE LOVED IT!',
         '<25>{#p/undyne}{#f/14}* Yeah, uh...',
         '<25>{#f/12}* I sure did!'
      ],
      unddate6: [ '<25>{#p/undyne}{#f/1}* 呃... 谢了。' ],
      unddate7: [ "<25>{#f/14}* 我会，呃，\n  和别的放一起吧。" ],
      unddate8: [ '<25>* 所以我们准备开始了吗？' ],
      unddate9: [
         '<18>{#p/papyrus}{#f/1}哎呀哎呀！\n我刚想起来！',
         '<18>{#f/0}我得去看看我兄弟\n怎么样了！！',
         '<18>{#f/9}你俩玩开心点！！！'
      ],
      unddate10: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 SAVE.data.b.f_state_undynecheck
                    ? "<26>{#p/undyne}{#f/17}* If it isn't the human who tried to break into my house IN FRONT OF ME."
                    : "<25>{#p/undyne}{#f/1}* Well then.\n* Look who's come crawling back for more.",
                 "<25>{#f/16}* 说实话，\n  我说不准有没有兴致再来一架。",
                 '<25>{#f/12}* 不过，我可以先给你拿点喝的！',
                 "<25>{#f/1}* 你找个地方歇下脚，\n  我看看我能做些啥。"
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
                         '<25>* 所以你来这做什么？',
                         '<25>* 想用你的胜利打我的脸吗？',
                         '<25>* 更变本加厉地羞辱我？'
                      ]),
                 '<25>{#f/4}* 是这样吗？',
                 choicer.create('* （你要怎么回答？）', '是', '否')
              ],
      unddate11a: () => [
         '<25>{#p/undyne}{#f/11}* 那你来这里是？',
         '<25>{#f/1}* 等等，我明白了。',
         "<25>* 你觉得我会和你交朋友，\n  嗯？",
         '<25>{#f/17}* 没错吧？？？',
         choicer.create('* （你要怎么回答？）', '是', '否')
      ],
      unddate11a1a: [
         '<25>{#p/undyne}{#f/14}* 真的吗？\n* 我好高兴啊！\n* 我接受了！',
         "<25>{#f/8}* 让我们一同在友谊的\n  乐园中尽情嬉戏！",
         '<25>{#f/7}* ...个鬼！',
         "<25>{#f/1}* 你是将所有人的希望\n  与梦想拒之门外的敌人！",
         "<25>* 要不是看在\n  你是我客人的份上，\n  我立马就把你揍翻了！",
         '<25>{#f/5}* ...'
      ],
      unddate11a1b: [
         '<25>{#p/undyne}{#f/15}* 再者说...',
         '<25>{#f/17}* ...',
         '<25>{#f/4}* 你看什么看？',
         "<25>{#f/5}* 你觉得我不会为了取悦谁\n  而和你交朋友吗？？？",
         '<25>{#f/12}* 才不是！',
         '<25>{#f/1}* 事实上，我突然\n  改主意了...',
         '<25>{#f/7}* 因为我燃起了\n  复仇的欲望！'
      ],
      unddate11a2: [
         '<25>{#p/undyne}{#f/13}* ...',
         '<25>{#f/11}* 所以... 让我把事情\n  搞清楚。',
         '<25>* 首先，\n  你大摇大摆进了我家。',
         "<25>{#f/7}* 你还不给我一个\n  进我家的理由？？",
         "<25>{#f/4}* 你个小毛孩！\n* 你要不是我的客人的话，\n  我就...！",
         '<25>{#f/5}* ...',
         '<25>{#f/4}* ...不，你猜怎么着？',
         "<25>{#f/7}* 我要证明你是错的。",
         "<25>{#f/1}* 我们可不光要\n  成为朋友。"
      ],
      unddate11b: [
         '<25>{#p/undyne}{#f/4}* 哦-吼-吼。',
         "<25>{#f/7}* 我告诉你个坏消息，\n  小毛孩。",
         "<25>{#f/1}* 你现在可是在\n  我这里的战场上！",
         "<25>{#f/7}* 你还不是来羞辱我的。",
         "<25>{#f/11}* 好吧。\n* 我来告诉你接下来\n  会发生些什么。",
         "<25>{#f/17}* 我们来消遣消遣吧。",
         "<25>{#f/17}* 我们会过得很开心的。",
         '<25>{#f/7}* 我们要成为“朋友”。'
      ],
      unddate12a: [
         "<25>{#f/1}* 我要让你\n  对我无法自拔...",
         "<25>{#f/7}* 完全没法考虑其他的人！"
      ],
      unddate12b: [ "<25>{#f/8}* 呋呼呼呼！\n* 这就是我完美的复仇！！" ],
      unddate12c: [ "<25>{#f/12}* 呃... 何不先找个\n  地方坐下呢？" ],
      unddate13: () => [
         SAVE.data.b.undyne_respecc
            ? '<25>{#p/undyne}{#f/1}* 需要什么吗？'
            : '<25>{#p/undyne}{#f/14}* 需要什么吗？',
         choicer.create('* （你要怎么回答？）', '我饿了', '想看书', '想回家', '没啥事')
      ],
      unddate13a1: [
         '<25>{#p/undyne}{#f/1}* 你想要点零食什么的吗？',
         '<25>{#f/1}* 让我看看我的柜子里\n  有什么。'
      ],
      unddate13a2: [ '<25>{#p/undyne}{#f/1}* 啊... 这应该挺不错的。' ],
      unddate13a3: [ '<25>{#p/undyne}{#f/14}* 全都是你的...\n* 呋呼呼。' ],
      unddate13a4a: [ "<32>{#p/human}* （你带的东西太多了。）" ],
      unddate13a4b: [ '<32>{#p/human}* (You got the Odd Snack.)' ],
      unddate13a5: () =>
         SAVE.data.b.drop_snack
            ? [
                 "<25>{#p/undyne}{#f/17}* 我知道扔吃的很好玩，\n  但我不能白白浪费吧。",
                 '<25>{#p/undyne}{#f/12}* 抱歉。'
              ]
            : SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#p/undyne}{#f/17}* Just because you're my friend doesn't mean you can have two snacks!",
                 '<25>{#p/undyne}{#f/1}* Maybe some other time.'
              ]
            : [
                 "<25>{#p/undyne}{#f/11}* 听着，混球，\n  每人只有一份零食。",
                 '<25>* 你得学会入乡随俗。'
              ],
      unddate13b: pager.create(
         0,
         () => [
            '<25>{#p/undyne}{#f/13}* 你要看书？？？\n* 这里看起来\n  像是图书倌吗？',
            "<25>{#f/1}* 你在厨房里\n  唯一能找到的书\n  就是烹饪指南！",
            "<25>{#f/4}* 我从来不用，\n  因为烹饪应该是门艺术。",
            '<25>{#f/7}* 而不是被条条框框\n  束缚的过程。',
            '<25>{#f/5}* 为什么就是没有人\n  能理解呢？？？',
            SAVE.data.b.undyne_respecc
               ? '<25>{#f/1}* ...如果你还需要什么，\n  就告诉我吧。'
               : '<25>{#f/14}* 好吧，\n  如果你还需要什么的话，\n  就告诉我吧！'
         ],
         [
            "<25>{#p/undyne}{#f/1}* 你听好，\n  星港有一家图书倌。",
            "<25>{#f/1}* 如果你真的想看书，\n  你去那里最合适。",
            '<25>{#f/7}* 但你现在没法去！！！',
            '<25>{#f/14}* ...如果你还需要什么，\n  就告诉我吧。'
         ]
      ),
      unddate13c: pager.create(
         0,
         () => [
            '<25>{#p/undyne}{#f/3}* ...',
            '<25>{#f/17}* 这里就是家。',
            "<25>{#f/17}* 你已经在这里了。",
            '<25>{#f/16}* 除非你指的是\n  你的母星...',
            '<25>{#f/9}* ...',
            '<25>{#f/19}* 但这任谁都没办法\n  做到。',
            SAVE.data.b.undyne_respecc
               ? "<25>{#f/1}* ...如果你还需要什么，\n  就告诉我吧。"
               : '<25>{#f/14}* 好吧，\n  如果你还需要什么的话，\n  就告诉我吧！'
         ],
         () => [
            "<25>{#p/undyne}{#f/16}* 我要是可以的话，\n  我可以给你描述一下\n  那个地方。",
            '<25>{#f/16}* 但我是在前哨站出生的...',
            '<25>{#f/9}* 我们对这个世界的记忆\n  似乎每天都在逐渐淡去。',
            SAVE.data.b.undyne_respecc
               ? '<25>{#f/1}* ...如果你还需要什么，\n  就告诉我吧。'
               : '<25>{#f/12}* ...如果你还需要什么，\n  就告诉我吧。'
         ]
      ),
      unddate13d: () => [
         SAVE.data.b.undyne_respecc
            ? "<25>{#p/undyne}{#f/1}* 好吧，没事。\n* 记住，如果你改变主意，\n  随时来找我！"
            : "<25>{#p/undyne}{#f/14}* 好吧，没事。\n* 记住，如果你改变主意，\n  随时来找我！"
      ],
      unddate14: () => [ choicer.create('* （要坐下吗？）', '是', '否') ],
      unddate15a: () => [
         '<25>{#p/undyne}{#f/14}* 坐得舒服吗？',
         SAVE.data.b.undyne_respecc
            ? "<25>{#f/1}* 我去拿些喝的给你。"
            : "<25>{#f/14}* 我去拿些喝的给你。"
      ],
      unddate15b: () => [
         '<25>{#p/undyne}{#f/14}* 坐得舒服吗？',
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
            ? '<25>{#p/undyne}{#f/1}* 准备完成！\n* 你来挑吧！'
            : '<25>{#p/undyne}{#f/14}* 准备完成！\n* 你想喝哪个？'
      ],
      unddate17: () => [
         "<25>{#p/undyne}{#f/17}* 喂！\n* 别站起来！",
         ...(SAVE.data.b.undyne_respecc
            ? [ '<25>{#f/10}* ...', '<25>{#f/16}* 对不起，条件反射了。\n* 你是客人，\n  我不想让你跑腿而已...' ]
            : [ "<25>{#f/17}* 你是客人！\n* 给我坐下来慢慢享用！", '<25>{#f/17}* ...' ])
      ],
      unddate18: () =>
         SAVE.data.b.undyne_respecc
            ? [ '<25>{#p/undyne}{#f/1}* 嗯，你需要什么\n  指出来不就好了？', '<25>{#f/16}* 你可以用这根矛！' ]
            : [
                 '<25>{#p/undyne}{#f/12}* 嗯，你需要什么\n  指出来不就好了？',
                 '<25>{#f/12}* 你可以用这根矛！'
              ],
      unddate19x: '* 按←和→瞄准。\n* 按[Z]选定。',
      unddate19y: () => [
         SAVE.data.b.undyne_respecc ? '* 安黛因\n* 英俊的鱼女士。' : '* 安黛因\n* 疯狂的鱼女士。',
         '* 零食柜\n* 里面有超多好东西！',
         '* 水\n* 聪明的选择',
         '* 糖\n* 适合放在茶里。',
         '* 洋梅果酒\n* 自家做的... 她是这么说的。',
         "* 热巧克力\n* 蓝色圆罐。",
         '* 茶\n* 毫无疑问是正确选项？',
         '* 冰箱\n* 对于一顿饭来说太多了。',
         '* 能量剑\n* 传说中的人类武器。'
      ],
      unddate20: [
         pager.create(0, [ '<25>{#p/undyne}{#f/13}* 你是在...\n* 指我吗？？？' ], [ '<25>{#p/undyne}{#f/13}* ？？？？？' ]),
         pager.create(
            0,
            [
               "<25>{#p/undyne}{#f/17}* 你应该选一个\n  喝的东西？？",
               "<25>{#f/1}* 那个柜子里只有零食。"
            ],
            [ "<25>{#p/undyne}{#f/1}* 真的，那个柜子里\n  只有零食。\n* 没有别的东西了！" ],
            [ '<25>{#p/undyne}{#f/1}* 真的！' ]
         ),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/13}* 你想要水？',
               '<25>{#f/11}* 就是... 水。',
               '<25>{#f/11}* 没什么味道，\n  也没加糖什么的。',
               '<25>{#f/11}* ...'
            ],
            [ '<25>{#p/undyne}{#f/11}* ...' ]
         ),
         pager.create(
            0,
            [
               "<25>{#p/undyne}{#f/12}* 那个糖是用来\n  加在茶里的。",
               "<25>{#f/7}* 我没法给你盛一杯糖！"
            ],
            () =>
               SAVE.data.b.undyne_respecc
                  ? [ '<25>{#p/undyne}{#f/1}* 糖不可以，甜心。' ]
                  : [ "<25>{#p/undyne}{#f/14}* 糖是加在茶里的，\n  好吗？" ]
         ),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 啊... 洋梅果酒。',
               "<25>{#f/14}* 我想，帕派瑞斯喜欢这东西，\n  所以没什么问题。"
            ],
            [ '<25>{#p/undyne}{#f/17}* 你到底选不选这个？' ]
         ),
         pager.create(
            0,
            [ '<25>{#p/undyne}{#f/14}* 没什么能比一杯\n  热巧克力更棒了。' ],
            [ '<25>{#p/undyne}{#f/17}* 热巧克力，是吧？' ]
         ),
         pager.create(0, [ '<25>{#p/undyne}{#f/14}* 茶，是吧？' ], [ "<25>{#p/undyne}{#f/12}* 所以选茶，是吗？" ]),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/4}* 冰箱！？\n* 你想要一整台冰箱！？',
               '<25>{#p/undyne}{#f/17}* 不行！'
            ],
            [ '<25>{#p/undyne}{#f/17}* 我说了不行！' ],
            [ '<25>{#p/undyne}{#f/17}* 不行就是不行！' ],
            [ '<25>{#p/undyne}{#f/17}* 你知道“不行”是\n  什么意思吗？' ],
            [ '<25>{#p/undyne}{#f/17}* ...就是不行！' ],
            [ '<25>{#p/undyne}{#f/17}* ...' ]
         ),
         pager.create(
            0,
            [
               '<25>{#p/undyne}{#f/1}* 那把能量剑...',
               "<25>{#p/undyne}{#f/12}* 那是人类在战争中\n  用来对付我们的武器。",
               '<25>{#p/undyne}{#f/16}* ...算是，其中一把吧。'
            ],
            [ "<25>{#p/undyne}{#f/17}* 那东西不能给你。" ]
         )
      ],
      unddate21: () => [ choicer.create('* （要选这个喝吗？）', '是', '否') ],
      unddate22: [
         [ '<25>{#p/undyne}{#f/16}* 也... 行吧。' ],
         [ "<25>{#p/undyne}{#f/1}* 来喝点果酒，补充水分吧！" ],
         [ '<25>{#p/undyne}{#f/14}* 开始无与伦比的\n  热可可时间吧！' ],
         [ '<25>{#p/undyne}{#f/14}* 马上给你上茶。' ]
      ],
      unddate22x: [ "<25>{#p/undyne}{#f/12}* 还需要等一段时间\n  水才能沸腾。" ],
      unddate22y: () => [
         SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* There.' : '<25>{#p/undyne}{#f/12}* 好了！'
      ],
      unddate23: [ '<25>{#p/undyne}{#f/1}* 喝吧。' ],
      unddate24: [
         [ '<25>{#p/undyne}{#f/12}* 好喝吗...？' ],
         [ "<25>{#p/undyne}{#f/12}* 慢点喝，有点酸。" ],
         [ "<25>{#p/undyne}{#f/14}* 小心点，有点烫。" ],
         [ "<25>{#p/undyne}{#f/14}* 小心点，有点烫。" ]
      ],
      unddate25: [
         () => [
            '<25>{#p/undyne}{#f/17}* 不至于！\n* 快点喝啊！',
            '<32>{#p/human}{#s/heal}* （你喝了一口水。）',
            "<32>{#p/basic}* 它，呃...\n  嗯对，就是水。\n* 所以尝起来还好。",
            SAVE.data.b.undyne_respecc
               ? "<25>{#p/undyne}{#f/1}* 哈。\n* 至少你很开心。"
               : "<25>{#p/undyne}{#f/12}* 呀，你看起来很满足。"
         ],
         [
            "<25>{#p/undyne}{#f/17}* 你在等什么？\n* 快点喝啊！",
            '<32>{#p/human}{#s/heal}* （你抿了一口果酒。）',
            "<32>{#p/basic}* 实在太酸了，\n  你的嘴唇都皱起来了..."
         ],
         [
            "<25>{#p/undyne}{#f/17}* 也没有那么烫！！\n* 快点喝啊！",
            '<32>{#p/human}{#s/heal}* （你喝了一口热巧克力。）',
            "<32>{#p/basic}* 烫得像火烧..."
         ],
         [
            "<25>{#p/undyne}{#f/17}* 也没有那么烫！！\n* 快点喝啊！",
            '<32>{#p/human}{#s/heal}* （你喝了一口茶。）',
            "<32>{#p/basic}* 烫得像火烧..."
         ]
      ],
      unddate25x: () => [
         "<32>* 不过除去这点，\n  还挺好喝的。",
         ...(SAVE.data.b.undyne_respecc
            ? [ "<25>{#p/undyne}{#f/1}* 哈。\n* 你喜欢就好。" ]
            : [
                 "<25>{#p/undyne}{#f/12}* 味道不错吧？",
                 '<25>{#f/8}* 我只会把最好的\n  给我绝对珍惜的朋友！'
              ])
      ],
      unddate27: [
         [
            "<25>{#p/undyne}{#f/12}* 你知道吗，\n  你会选那个当喝的\n  还挺有意思的。",
            '<25>{#f/12}* 我是说，水。',
            '<25>{#f/1}* 我跟艾斯戈尔有一次\n  开玩笑说人类是\n  由水组成的...',
            "<25>{#f/8}* 所以如果我们喝水，\n  就是在消化人类！！！",
            "<25>{#f/16}* ...好吧，他其实\n  没找到笑点在哪。",
            "<25>{#f/16}* 这家伙几乎对所有人\n  都有好感..."
         ],
         [
            "<25>{#p/undyne}{#f/12}* 你知道吗，\n  你会选那个当喝的\n  还挺不错的。",
            '<25>{#f/12}* 洋梅果酒...',
            '<25>{#f/1}* 那是艾菲斯和帕派瑞斯\n  一起“发明”出来的。',
            "<25>{#f/16}* 我虽然不太喜欢，\n  但是当我把这个拿给\n  艾斯戈尔的时候...",
            "<25>{#f/12}* 这么说吧，\n  他把它投入了批量生产。"
         ],
         [
            "<25>{#p/undyne}{#f/12}* 你知道吗，\n  你会选那个当喝的\n  还挺酷的。",
            '<25>{#f/12}* 热巧克力...',
            '<25>{#f/16}* 有一次，\n  在核心发生故障之后...',
            '<25>{#f/16}* 他们不得不重启\n  整个大气系统。',
            '<25>{#f/10}* 没法取暖，空气稀薄...\n  逐渐变得越来越冷...',
            '<25>{#f/1}* 然后，艾斯戈尔赶了过来\n  递给我一杯热巧克力。',
            '<25>{#f/12}* 我们就一起坐在\n  这个房间里...'
         ],
         [
            "<25>{#p/undyne}{#f/12}* 你知道吗，\n  你会选那个当喝的\n  可真是奇怪...",
            '<25>{#f/12}* 星花茶...',
            "<25>{#f/1}* 那一直都是艾斯戈尔\n  最喜欢的。"
         ]
      ],
      unddate28: () => [
         '<25>{#p/undyne}{#f/14}* 实际上，\n  现在我开始觉得...',
         '<25>{#f/12}* 你让我想起他了。',
         ...(SAVE.data.b.undyne_respecc
            ? [
                 '<25>{#f/17}* I mean, your fighting styles are TOTALLY different, but...',
                 "<25>{#f/1}* You're the only two people who've actually managed to beat me!",
                 '<25>{#f/9}* ... in a sense.'
              ]
            : [ "<25>{#f/8}* 你俩都是软蛋！", '<25>{#f/9}* ...某种意义上啦。' ])
      ],
      unddate29: [
         '<25>{#p/undyne}{#f/16}* 知道吗，我以前\n  是个非常冲动的孩子。',
         '<25>* 有一次，我为了\n  证明自己是最强的，\n  就去尝试和艾斯戈尔战斗。',
         '<25>{#f/17}* 重点是尝试二字。',
         '<25>{#f/1}* 我压根连一下\n  都打不中他！',
         '<25>* 更糟的是，从头到尾，\n  他都不肯还手！',
         '<25>{#f/9}* 我被羞辱得无地自容...',
         '<25>{#f/16}* 之后，他道了歉，\n  还说了些傻话...',
         '<25>* “抱歉，你想知道\n   打败我的方法吗？”',
         '<25>{#f/1}* 我说了“想”，从那以后，\n  他就开始训练我。',
         '<25>{#f/16}* 有一天，在练习时，\n  我终于打倒了他。',
         '<25>{#f/9}* 可我心里... 很不是滋味。',
         '<25>{#f/12}* 他却很高兴...',
         '<25>{#f/1}* 我从没见过哪个人\n  因为被扁了而感到荣幸。',
         '<25>* 总之，长话短说，\n  他一直训练着我...',
         '<25>{#f/14}* 然后我现在是皇家守卫的\n  首领了！',
         "<25>{#f/8}* 所以我成了那个训练\n  傻瓜们战斗的人了！",
         '<25>{#f/1}* ...比如，呃，帕派瑞斯。'
      ],
      unddate30: [
         '<25>{#f/16}* 但是，嗯，说实话...',
         "<25>{#f/16}* ...我自己也不知道...",
         '<25>{#f/9}* 到底能不能让\n  帕派瑞斯加入皇家守卫。',
         "<25>{#f/17}* 别跟他说这些话！",
         "<25>{#f/10}* 他只是...\n* 好吧...",
         "<25>{#f/9}* 我是指，他并不笨。",
         '<25>{#f/17}* 他的攻击设计\n  真的相当疯狂！',
         "<25>{#f/10}* 只不过...\n* 他...",
         "<25>{#f/17}* 他太天真善良了！！！",
         '<25>{#f/16}* 我是说，你看，\n  他本应该去抓你的...',
         '<25>{#f/11}* 结果他最后竟然\n  和你成为朋友了。',
         '<25>{#f/4}* 我永远没办法\n  把他派去战斗！',
         "<25>{#f/9}* 他会被撕成\n  微笑着的碎片的。",
         "<25>{#f/12}* 这也是我为什么...",
         '<25>{#f/12}* 教他烹饪的原因之一，\n  你明白吗？',
         '<25>{#f/9}* 所以，嗯，或许他\n  这辈子可以干点别的。'
      ],
      unddate31: () => [
         SAVE.data.b.undyne_respecc
            ? '<25>{#p/undyne}{#f/1}* 哦，抱歉，我讲太多了...'
            : '<25>{#p/undyne}{#f/12}* 哦，抱歉，我讲太多了...'
      ],
      unddate32: [
         [ "<25>{#f/12}* 你的水喝完了，是吧？" ],
         [ "<25>{#f/12}* 你的果酒喝完了，是吧？" ],
         [ "<25>{#f/12}* 你的热巧克力喝完了，\n  是吧？" ],
         [ "<25>{#f/12}* 你的茶喝完了，是吧？" ]
      ],
      unddate33: () => [
         SAVE.data.b.undyne_respecc
            ? "<25>{#p/undyne}{#f/1}* 哈，没事的。\n* 我再给你倒些。"
            : "<25>{#p/undyne}{#f/12}* 哈，没事的。\n* 我再给你倒些。"
      ],
      unddate34: [ '<25>{#p/undyne}{#f/17}* 等一下...', '<25>{#f/17}* 帕派瑞斯...\n* 他的烹饪课...' ],
      unddate35: [
         '<25>{#p/undyne}{#f/17}* 他现在本该在\n  上课的！！！',
         "<25>{#f/11}* 如果他没来\n  上课的话...",
         "<25>{#f/7}* 那只能用你来\n  代替他了！"
      ],
      unddate36: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#f/1}* 没错！",
                 '<25>{#f/1}* 除了烹饪之外，\n  没什么能让我和\n  帕派瑞斯更亲近了！',
                 '<25>{#f/17}* 嘿嘿，你觉得\n我俩已经是朋友了，对吧？',
                 '<25>{#f/8}* 等上完这堂课，\n  那我们就是死党了！'
              ]
            : [
                 "<25>{#f/1}* 没错！",
                 '<25>{#f/1}* 除了烹饪之外，\n  没什么能让我和\n  帕派瑞斯更亲近了！',
                 '<25>{#f/17}* 也就是说，如果我\n  给你上同样的课...',
                 "<25>{#f/8}* 我们就会变得亲近到\n  超乎你的想象！"
              ],
      unddate37: [ "<25>{#f/1}* 首先，\n  我们从酱开始！！" ],
      unddate38: () => [
         '<25>{#f/1}* 将这些蔬菜想象成\n  你的死对头！',
         '<25>{#f/7}* 现在，用你的拳头\n  将他们轰杀至渣！！',
         choicer.create('* （你要怎么做？）', '轻轻抚摸', '用力重击')
      ],
      unddate39a: () => [
         '<32>{#p/human}* （你亲切地抚摸着蔬菜。）',
         SAVE.data.b.undyne_respecc
            ? "<99>{#p/undyne}{#f/17}* 我的天啊！！！\n* 现在我【可算】知道了\n  你就是在耍我！！！"
            : '<25>{#p/undyne}{#f/17}* 我的天啊！！！\n* 不要抚摸敌人了！！！',
         "<25>{#x1}{#f/7}* 我来给你演示一下\n  该怎么做！",
         '<25>{#f/4}* 嘎啊啊！'
      ],
      unddate39b: () =>
         world.meanie
            ? [ '<32>{#p/human}* （你全力用拳头砸向蔬菜。）' ]
            : [
                 '<32>{#p/human}* （你全力用拳头砸向蔬菜。）\n* （你打倒了一颗番茄。）',
                 '<25>{#p/undyne}{#f/1}* 耶！\n* 耶！',
                 '<25>{#f/1}* 我们齐心协力与这些\n  健康食材们奋战到底！',
                 "<25>{#x1}{#f/7}* 现在轮到我了！",
                 '<25>{#f/4}* 嘎啊啊！'
              ],
      unddate40: (res: number) => [
         ...(world.meanie && res === 1
            ? [
                 SAVE.data.b.undyne_respecc
                    ? "<25>{#p/undyne}{#f/2}* 没错！！！\n* 这就是我认识的战士！！"
                    : '<25>{#p/undyne}{#f/6}* 今天可真是欢腾啊，\n  是吧？',
                 "<25>{#f/6}* 哈，我们过会再把这堆\n  弄到个碗里去。"
              ]
            : [ "<25>{#p/undyne}{#f/6}* 呃，我们过会再把这堆\n  弄到个碗里去。" ]),
         '<25>{#f/2}* 但是现在！'
      ],
      unddate41: [
         '<25>{#p/undyne}{#f/1}* 我们把面条加进去！',
         '<25>{#f/1}* 自家制的面条最棒了，\n  所以我总是备一些。'
      ],
      unddate41x: [ '<25>{#p/undyne}{#f/12}* 呃，小子，\n  你现在可以过来了。' ],
      unddate41y: () => [
         '<25>{#p/undyne}{#f/1}* 无论如何，\n  你看到这里的面条了吧？',
         '<25>{#f/1}* 那么...',
         "<25>{#f/17}* 把它们丢进去！",
         choicer.create('* （你想怎么放进去？）', '小心地', '猛烈地')
      ],
      unddate42a: [
         '<32>{#p/human}* （你将面条一根一根地\n  放进锅里。）',
         '<32>* 它们与锅底相碰，\n  叮叮作响。',
         '<25>{#p/undyne}{#f/17}* 感觉，挺好？？？',
         "<25>{#f/1}* 那么，接下来就是\n  搅拌意面的时间了！"
      ],
      unddate42b: [
         '<32>{#p/human}* （你把所有东西都丢进锅里，\n  包括包装盒。）',
         '<32>* 包装盒和面条咣地一声\n  撞到锅底。',
         "<25>{#p/undyne}{#f/17}* 耶！！！\n* 我进入状态了！！",
         "<25>{#f/1}* 好了！\n* 现在就是搅拌\n  意面的时间！"
      ],
      unddate43: [
         '<25>{#p/undyne}{#f/1}* 经验表明...',
         '<25>{#f/17}* 搅得越多，它就越好吃！'
      ],
      unddate44: [ '<25>{#p/undyne}{#f/17}* 准备好了吗？', "<25>{#f/1}* 来搅拌吧！" ],
      unddate45: '* 连续按[Z]来搅拌！',
      unddate46: [ '<25>{*}{#p/undyne}{#f/17}* 用力搅！{^20}{%}' ],
      unddate46x: [ "<25>{*}{#p/undyne}{#f/17}* 别光站着！{^20}{%}" ],
      unddate47: [ '<25>{*}{#p/undyne}{#f/7}* 再用力一点！{^20}{%}' ],
      unddate47x: [ '<25>{*}{#p/undyne}{#f/7}* 该死的！搅啊！{^20}{%}' ],
      unddate48: [ '<25>{*}{#p/undyne}{#f/8}* 再用力！！！{^20}{%}' ],
      unddate48x: [ '<25>{*}{#p/undyne}{#f/8}* 搅啊！！！{^20}{%}' ],
      unddate49: [ '<25>{*}{#p/undyne}{#f/8}* 呃，放着我来-{^10}{%}' ],
      unddate50: [ "<25>{#p/undyne}{#f/8}* 呋呼呼呼！\n* 就该这样！" ],
      unddate51: [
         '<25>{#p/undyne}{#f/1}* 好了，\n  现在就剩最后一步...',
         '<25>{#f/17}* 开大火！',
         '<25>{#f/1}* 炉子象征着\n  你的热情！',
         '<25>{#f/1}* 将你的希望与梦想\n  化为烈焰！',
         "<25>{#f/8}* 当然，\n  要不遗余力！！！"
      ],
      unddate52: [ '<25>{#p/undyne}{#f/17}* 准备好了吗？', '<25>{#f/1}* 开始吧！' ],
      unddate53: '* 按住[→]开大火！',
      unddate53x: [ '<25>{*}{#p/undyne}{#f/8}* 你个蠢蛋！\n* 这个炉子只能\n  往一边开火！！！{^20}{%}' ],
      unddate54: [ '<25>{*}{#p/undyne}{#f/17}* 再热一些！{^20}{%}' ],
      unddate54x: [ '<25>{*}{#p/undyne}{#f/17}* 你在干什么？{^20}{%}' ],
      unddate55: [ '<25>{*}{#p/undyne}{#f/7}* 再热些！{^20}{%}' ],
      unddate55x: [ '<25>{*}{#p/undyne}{#f/7}* 别再犹豫了！{^20}{%}' ],
      unddate56: [ '<25>{*}{#p/undyne}{#f/8}* 再热些！！！{^20}{%}' ],
      unddate56x: [ '<25>{*}{#p/undyne}{#f/8}* 做就好了！！！{^20}{%}' ],
      unddate57a: [ '<25>{*}{#p/undyne}{#f/17}* 呃，让我来吧...{^10}{%}' ],
      unddate57b: [ '<25>{*}{#p/undyne}{#f/17}* 看到了吗，你就该-{^20}{%}' ],
      unddate58: [ "<25>{*}{#p/undyne}{#f/17}* 不，等下，有点太-{^10}{%}" ],
      unddate59: [ '<25>{#p/undyne}{#f/14}* 啊。' ],
      unddate60: [ "<25>{#p/undyne}{#f/14}* 啊，难怪帕派瑞斯\n  厨艺再也没有进步了。" ],
      unddate61: [ "<25>{#p/undyne}{#f/12}* 然后做些什么？\n* 去淘些垃圾？\n* 还是绑个腕带？" ],
      unddate62: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 '<25>{#p/undyne}{#f/10}* ...',
                 '<25>{#f/9}* ...我在开什么玩笑...',
                 "<25>{#f/16}* 我真把事做过火了，\n  是吧...？",
                 '<25>{#f/16}* 呵...'
              ]
            : [
                 '<25>{#p/undyne}{#f/10}* ...',
                 '<25>{#f/9}* ...我在开什么玩笑...',
                 "<25>{#f/16}* 我真的搞砸了，\n  是吧...？",
                 '<25>{#f/16}* 呵...'
              ],
      unddate63: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 "<25>{#f/16}* 你知道吗？",
                 "<25>{#f/9}* 我还没打算就\n  这样放弃呢。",
                 '<25>{#f/1}* 所以我放弃教你烹饪了。\n* 就这样。',
                 "<25>{#f/14}* 我们还是有办法\n  挽救这个烂摊子的。",
                 '<26>{#f/1}* 办法就是...'
              ]
            : [
                 "<25>{#f/16}* 我没办法强迫你喜欢我，\n  人类。",
                 "<25>{#f/9}* 有些人彼此就是\n  没办法相处。",
                 "<25>{#f/16}* 如果你这么觉得，\n  我能理解...",
                 "<25>{#f/9}* 如果我们做不了朋友...\n  也没关系。",
                 "<25>{#f/9}* 因为...\n* 如果我们不是朋友..."
              ],
      unddate64: () =>
         SAVE.data.b.undyne_respecc
            ? [ "<25>{#p/undyne}{#f/17}* 来一场向银河系证明\n  我们实力的最后一战！！" ]
            : [ '<25>{#p/undyne}{#f/17}* 这就意味着我能\n  毫不犹豫地干掉你！' ],
      unddate65: () => [
         '<25>{#p/undyne}{#f/12}* 好吧，还挺好玩的，\n  是吧？',
         SAVE.data.b.undyne_respecc
            ? "<25>{#f/8}* 我们下次再\n  找时间斗一场！"
            : "<25>{#f/8}* 我们下次再约出去玩！",
         '<25>{#f/9}* 但是，呃，\n  我觉得该换个地方。',
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
                 "<25>{#f/1}* 与此同时，我会和帕派瑞斯\n  一起去休闲回廊。",
                 '<25>{#f/12}* 期待能在那见到你！',
                 '<25>{#f/1}* 到那时候，\n  你可以给帕派瑞斯打电话。',
                 "<25>{#f/8}* 因为我俩在一起，\n  这样我也能和你说话！"
              ]
            : [
                 "<25>{#f/1}* 与此同时，\n  我会去休闲回廊。",
                 '<25>{#f/12}* 期待能在那见到你！',
                 '<25>{#f/1}* 哦，对了，\n  帕派瑞斯说他必须得\n  办个什么事情去。',
                 "<25>{#f/14}* 只是想告诉你一声，\n  因为他现在不方便接电话。"
              ])
      ],
      unddate66: () =>
         SAVE.data.b.undyne_respecc
            ? [ '<25>{#f/1}* 好啦，回见，朋友！！' ]
            : [ '<25>{#f/14}* 好啦，回见，混球！！' ],
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
         "<23>{#p/papyrus}{#f/30}嗨... 嗨，安黛因！\n我是来做我的每日报告的...",
         '<23>呃... 关于我之前跟你\n说过的那个人类...'
      ],
      undyne1b: [ '<23>{#p/papyrus}{#f/30}...嗯？\n我有没有跟人类战斗？' ],
      undyne1c: () =>
         
         world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

            ? [ '<23>{#p/papyrusnt}UH...', "<23>I-IT'S COMPLICATED!" ]
            : [ '<23>{#p/papyrusnt}当-当然了！\n我当然跟人类战斗了！', '<23>我英勇地和那个人类\n战斗过了！' ],
      undyne1d: [ '<23>{#p/papyrus}{#f/30}...什么？\n我有没有把人类抓住...？' ],
      undyne1e: [ '<23>{#p/papyrus}{#f/30}这-这-这个...', '<23>没有...' ],
      undyne1f: () =>
         world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

            ? [ "<23>{#p/papyrus}{#f/30}L-LIKE I SAID, IT'S COMPLICATED!" ]
            : [ '<23>{#p/papyrus}{#f/30}我-我是说，\n我真的很努力了，\n但-但是，最终...' ],
      undyne1g: () => [
         '<23>{#p/papyrus}{#f/30}...什-什么？',
         ...(SAVE.data.n.state_foundry_doge === 1
            ? [ "<23>THEY'VE ALREADY KILLED AN ELITE SQUAD MEMBER??", "<23>N-NO... THEY WOULDN'T DO THAT, WOULD THEY?" ]
            : [ "<23>你要亲自去取走那个\n人类的灵魂？？" ])
      ],
      undyne1h: () =>
         SAVE.data.n.state_foundry_doge === 1
            ? [ '<23>{#p/papyrus}{#f/30}SURELY THERE MUST BE ANOTHER WAY!', '<23>SURELY...' ]
            : [ "<23>{#p/papyrus}{#f/30}但是安黛因，你不-\n不一定要把人类杀掉的！\n你看...", '<23>你看...' ],
      undyne1i: () => [
         '<23>{#p/papyrus}{#f/30}我...',
         '<23>...我明白了。',
         "<23>我会尽力帮你的。",
         ...(world.postnoot
            ? [
                 '<23>BY THE WAY... YOU NEED TO DOUBLE-CHECK THE ATMOSPHERIC SYSTEM.',
                 '<23>WHAT WAS IT CALLED?\nTHE WIDE-AREA TROPE-A- SPHERE FRAMEWORK?',
                 '<23>SOMETHING SEEMS... OFF.'
              ]
            : [])
      ],
      undyne1j: [ '<25>{#p/kidd}{#f/1}* 哟！\n* 她就在那里！' ],
      undyne1k: [ "<25>{#p/kidd}{#f/7}* 等等... 你是个人类，\n  对吧？" ],
      undyne1l: [ '<25>{*}{#p/kidd}{#f/7}* 快跑啊啊啊啊啊！{^20}{%}' ],
      undyne1m: [ '<25>{#p/kidd}{#f/2}* 呼...' ],
      undyne1n: [ '<25>{#p/kidd}{#f/1}* 呃，你可以从平台上\n  下来了。' ],
      undyne1o: [ "<25>{#p/kidd}{#f/4}* 她去哪了...？" ],
      undyne1p: [ '<25>{#p/kidd}{#f/7}* 啊！{^10}{%}' ],
      undyne1q: [ '<25>{#p/kidd}{#f/2}* 嘘...\n  我感觉我们可以偷偷溜过去。\n* 快跟上我！' ],
      undyne1r: [ "<25>{#p/kidd}{#f/4}* 这里乌黑一片...", '<25>{#p/kidd}{#f/7}* ...但是我们得保持\n  前进！' ],
      undyne1s: [ '<25>{#p/kidd}{#f/7}* 有一丛植物，\n  快躲进去！' ],
      undyne2a: [
         '<25>{#p/kidd}{#f/7}* 她... 她...',
         '<25>{#f/7}* 她摸到我了！！',
         "<25>{#f/4}* ...\n* 我们应该都算走运，\n  你说是吧？",
         "<25>{#f/5}* 如果她看见你，\n  那就大事不妙了。"
      ],
      undyne2ax: () => [
         '<25>{#p/kidd}{#f/1}* 她... 她...',
         "<25>{#f/1}* 哪儿都找不到她！！",
         '<25>{#f/3}* 你俩看到她了没有？',
         '<25>{#p/asriel2}{#f/3}* 谁呀，安黛因吗？',
         "<25>{#p/kidd}{#f/1}* 对呀！\n* 我找她找了好久！",
         '<25>{#p/asriel2}{#f/2}* （嘻嘻嘻...）',
         '<25>{#p/kidd}{#f/4}* 嗯？？',
         '<25>{#p/asriel2}{#f/4}* 没事。',
         '<25>{#f/13}* 话说，想跟我们一块走吗？',
         '<25>{#p/kidd}{#f/3}* 你... 想让我跟着你们？',
         "<25>{#p/asriel2}{#f/4}* 当然喽，快来吧。\n* 超有趣的。",
         "<25>{#p/kidd}{#f/4}* 呃...\n* 我...",
         ...(SAVE.flag.n.genocide_milestone < 5
            ? [
                 '<25>{#p/asriel2}{#f/15}* 嘿，你知道艾菲斯博士\n  喜欢安黛因的事吗？',
                 '<25>* 就是... 呃...\n  那种很亲密的喜欢。'
              ]
            : [
                 '<25>{#p/asriel2}{#f/9}* 嘿，你知道艾菲斯博士\n  其实比安黛因还强吗？',
                 "<25>{#f/5}* 只是她胆子太小，不敢动手！"
              ]),
         '<25>{#p/kidd}{#f/7}* 什么？\n* 怎么可能...',
         "<25>{#p/asriel2}{#f/1}* 呵，关于她俩...\n  我知道的还不止这些呢。",
         '<25>{#p/kidd}{#f/7}* 快告诉我！',
         '<25>{#p/asriel2}{#f/5}* 当然，当然，不过...\n* 你得跟$(name)和我走\n  我才告诉你。',
         '<25>{#p/kidd}{#f/1}* 成交！\n* 哈哈。',
         '<25>{#f/2}* ...'
      ],
      undyne2b: [ '<25>{#p/kidd}{#f/1}* 哟，还等什么呢？' ],
      undyne2bx: [ "<25>{#p/kidd}{#f/1}* 出发吧！" ],
      undyne2c: [
         '<25>{#f/3}* 嘿... 我知道我们刚\n  认识不久，但是...',
         "<25>{#f/4}* 我，其实，并不想让\n  安黛因伤害你...",
         '<25>* ...',
         "<25>{#f/2}* 要不然我们一起行动？",
         "<25>{#f/1}* 来吧，这会很有趣的！"
      ],
      undyne2cx: [
         '<25>{#p/kidd}{#f/2}* 老兄，我超推荐你们去看看\n  安黛因的人类追逐练习的！',
         '<25>{#f/1}* 她一秒就能扔出\n  上亿只矛呢！'
      ],
      undyne2d: [ "<25>{#f/1}* 你来带路吧！" ],
      undyne2dx: () => [
         '<25>{#p/kidd}{#f/2}* 每当猎物快要逃脱...',
         '<25>{#f/1}* 她总能在最后一刻精准命中！',
         ...(SAVE.flag.n.ga_asrielKidd2++ < 1
            ? [ '<25>{#p/asriel2}{#f/6}* 她可真棒啊。', '<25>{#p/kidd}{#f/1}* 是吧！！' ]
            : [])
      ],
      undyne2ex: [
         '<25>{#p/kidd}{#f/4}* 等等...',
         "<25>* 如果安黛因不在这，\n  谁来痛扁那些坏蛋，\n  保护大家呢？",
         '<25>{|}{#f/8}* 就是那些- {%}',
         "<25>{#p/asriel2}{#f/4}* 没啥好担心的。",
         '<25>{#f/3}* 而且，如果安黛因真像\n  你说的那么多谋善断...',
         "<25>{#f/4}* 那她就不会无缘无故离开，\n  对吧？\n* 她多聪明啊。",
         "<25>{#p/kidd}{#f/4}* 确实...\n* 你说得对...",
         '<25>{#p/kidd}{#f/2}* 对了，谢谢你们带上我。',
         "<25>{#p/asriel2}{#f/10}* 是吗...？\n* 我们还没走两步呢...",
         '<25>{#p/kidd}{#f/3}* 嗯，我很开心...\n* 不过，我还没怎么\n  离开过爹娘，所以...',
         "<25>{#p/asriel2}{#f/8}* 你还有爹娘？\n* 真新奇。",
         "<25>{#p/kidd}{#f/7}* 呃，我-我当然有啊，\n  谁没爹娘啊？？",
         '<25>{#p/asriel2}{#f/16}* ...\n* 是是是。'
      ],
      undynefinal1a: () =>
         respecc()
            ? [ '<32>{#p/undyne}* 七个。', '<32>* 七个人类灵魂。', '<32>* ...' ]
            : [
                 '<32>{#p/undyne}* 七个。',
                 '<32>* 有了七个灵魂，\n  {@fill=#f00}艾斯戈尔国王{@fill=#fff}就能成为神。',
                 '<32>{#x1}* 六个。',
                 "<32>{#x1}* 我们已经有了六个。",
                 '<32>{#x1}* 懂了吗？',
                 '<32>{#x1}* 只要有了你这最后一个灵魂，\n  怪物们就能重获自由。',
                 '<32>{#x3}* 不过在这之前，\n  我应该遵循前辈们立下的规矩...',
                 '<32>{#x4}* 向你讲述一段\n  我族人民的悲惨历史。',
                 '<32>{#x5}* 一切，都要从很久以前说起...'
              ],
      undynefinal1b: () => (respecc() ? [ '<32>{#p/undyne}* No...' ] : [ '<32>{#p/undyne}* 你猜怎么着？' ]),
      undynefinal1c: () =>
         respecc() ? [ '<32>{*}{#p/undyne}{#i/2}* 不行！！{^999}' ] : [ '<32>{*}{#p/undyne}{#i/2}* 去它的吧！！{^999}' ],
      undynefinal1d: () =>
         respecc()
            ? [ '<32>{*}{#p/undyne}{#i/1}* 我怎么能那样居高临下地\n  对你说话！！{^999}' ]
            : [ '<32>{*}{#p/undyne}{#i/1}* 我干嘛要告诉你那段故事！！{^999}' ],
      undynefinal1e: () =>
         respecc()
            ? [ "<32>{*}{#p/undyne}{#i/1}* 明明你都光荣地战斗过了！！{^999}" ]
            : [ "<32>{*}{#p/undyne}{#i/1}* 明明你马上就得受死了！！{^999}" ],
      undynefinal1f: [ '<32>{*}{#p/undyne}{#i/2}* 嘎啊啊啊啊啊啊啊啊啊！！！{^999}' ],
      undynefinal1g: () =>
         respecc()
            ? [
                 '<25>{#p/undyne}{#f/1}* 听我说！',
                 '<25>* 我喜欢你战斗的方式。',
                 "<25>{#f/16}* 你就像一个真正的战士，\n  把敌人痛扁一顿...",
                 '<25>{#f/17}* ...然后放他们一条生路，\n  让他们继续书写自己的故事！',
                 '<25>{#f/10}* 多么英勇啊...'
              ]
            : [
                 '<25>{#p/undyne}{#f/1}* 人类！',
                 "<25>* 你正是所有人通往希望\n  与梦想之路上的绊脚石！",
                 "<25>{#f/11}* 艾菲斯的历史电影让我\n  以为人类很酷...",
                 '<25>{#f/16}* ...比如那些生命航天器\n  还有跨维度传送门。',
                 '<25>{#f/4}* 而你呢？？？'
              ],
      undynefinal2a: () =>
         respecc()
            ? [
                 '<25>{#f/1}* 之前那样说你，\n  我得和你道个歉。',
                 '<25>{#f/16}* 你和你的朋友\n  只是在相互扶持而已。',
                 '<25>{#f/1}* 哈！我当然能理解。',
                 "<25>{#f/17}* And then there's the local ELITE squad!",
                 "<25>{#f/9}* 我承认，我被你打动了...",
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
                         '<25>{#f/10}* 他们都把刀架你脖子上了，\n  你还是一往无前。',
                         '<25>{#f/1}* 果真是万里挑一的勇士！'
                      ]),
                 '<25>{#f/8}* ...回到正题上！',
                 '<25>{#f/1}* 一开始，我打算杀了你，\n  夺走你的灵魂。',
                 '<25>{#f/11}* 不过欣赏了你的战斗后...',
                 "<25>{#f/8}* 之前那想法\n  可就太小儿科了！！",
                 "<25>{#f/1}* No... I want you to show me what you're REALLY made of!",
                 "<25>{#f/4}* And only once I've beaten you fair and square...",
                 "<25>{#f/5}* Will I finally claim the freedom that's rightfully ours!",
                 '<25>{#f/16}* But, if you manage to beat me...',
                 "<25>{#f/9}* I'll let you through.",
                 '<25>{#f/8}* ... IF you actually manage to beat me!!!',
                 "<25>{#f/1}* 当你准备好就\n  上前迎战吧！\n* 呋呼呼呼！"
              ]
            : [
                 "<25>{#f/7}* 你就是个懦夫！",
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
                         '<25>* 你躲在那孩子的身后，\n  得以再次从我手心里逃走！',
                         "<25>{#f/9}* 我承认，我被你打动了...",
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
                                 "<25>{#f/10}* 你在谁都没有杀害的情况下\n  来到了这里。",
                                 "<25>{#f/11}* 祝贺你啊，混球。\n* 你比一般的人类好一点。",
                                 '<25>{#f/8}* ...说得好像我在乎一样！'
                              ]),
                         '<25>{#f/4}* 你知道对大家而言\n  什么事才更有意义吗？',
                         '<25>{#f/7}* 就是你的死！！！'
                      ]),
                 '<25>{#f/17}* 你的生命不过是\n  将自由阻挡在我们\n  面前的障碍！！',
                 "<25>{#f/1}* 就在此刻，\n  我能感受到大家的心\n  正随着共同的节奏鼓动！",
                 "<25>* Everyone's been waiting their whole lives for this moment!",
                 "<25>{#f/9}* 但我们一点也不慌张。",
                 "<25>{#f/17}* 只要所有人团结一心，\n  我们绝不会败！",
                 "<25>{#f/1}* 来吧，人类！\n* 让我们了结这一切吧，\n  就在此时，就在此地！",
                 "<25>{#f/17}* 我会让你见识一下\n  怪物们的决心有多么强大！",
                 "<25>{#f/1}* 当你准备好就\n  上前迎战吧！\n* 呋呼呼呼！"
              ],
      undynefinal2b1: [ "<25>{#f/7}* 你只是个冷血杀手罢了！" ],
      undynefinal2b1a: [ '<25>{#f/11}* 正当防卫？\n* 得了吧。' ],
      undynefinal2b1b: [
         "<25>{#f/11}* What? You thought I'd overlook what you were up to in the Outlands?",
         '<25>{#f/1}* Fuhuhu... think again.'
      ],
      undynefinal2b2: () => [
         world.trueKills === 1
            ? "<25>{#f/9}* 你可不是不得已\n  才杀了那只怪物。"
            : "<25>{#f/9}* 你可不是不得已\n  才杀了那些怪物。",
         '<25>{#f/11}* 你杀死他们是因为\n  那对你而言易如反掌。\n* 是因为那对你而言很有趣。',
         '<25>{#f/16}* 那你觉得，\n  当我发现这一切的时候，\n  还会感到很有趣吗？'
      ],
      undynefinal2b2a: [
         '<25>{#f/9}* 犬卫队。\n* 当地特战队。\n* 还有其他人...',
         '<25>* 所有我所知晓，\n  我所深爱的人，\n  就这样死去了。'
      ],
      undynefinal2b2b: [
         '<25>{#f/9}* 犬卫队，\n  还有当地特战队...',
         "<25>* 这些与我共事的战友们，\n  眨眼之间，便离我而去。"
      ],
      undynefinal2b2c: [
         '<26>{#f/9}* 当地特战队，\n  一生尽职尽责的他们...',
         '<25>* 只一刹那，\n  便全部消失不见。'
      ],
      undynefinal2b2d: [
         '<25>{#f/9}* 犬卫队，\n  多年来一直保护\n  那座小镇的他们...',
         '<25>* 消失得无影无踪。'
      ],
      undynefinal2b2e: [
         '<26>{#f/9}* 那个幽灵，只想和他的\n  训练人偶融合的他...',
         '<25>* 转瞬即逝。'
      ],
      undynefinal2b2f: [
         '<25>{#f/9}* 那只蜘蛛，\n  只想好好保护和照顾\n  自己部落的她...',
         "<25>* 与世长辞。\n* 在此之后，其他蜘蛛\n  便处于危险境地之中。"
      ],
      undynefinal2b2g: [
         '<25>{#f/9}* 督吉, 有着强烈且坚定的\n  责任感的他...',
         "<25>* 纵使要冒着生命危险\n  工作，她仍旧献出了\n  自己的生命。"
      ],
      undynefinal2b2h: [
         '<25>{#f/9}* 那只大狗狗，\n  最善良、最可爱的它...',
         '<25>* 英年早逝。'
      ],
      undynefinal2b2i: [
         '<25>{#f/9}* 那两只甜蜜的狗狗，\n  总是悉心照顾彼此的\n  他们...',
         '<25>* 只一瞬间，\n  他们的爱情与遗产，\n  就被无情夺走。'
      ],
      undynefinal2b2j: [
         '<25>{#f/9}* 那只小狗狗，\n  除了被抚摸外\n  别无所求的他...',
         '<25>* 受到的却是\n  冷漠无情的攻击。'
      ],
      undynefinal2b2k: [
         '<25>{#f/9}* 遁狗，受我亲自照顾\n  一段时间的他...',
         '<25>* 因为一个人类的\n  一时兴起，\n  失去了自己的生命。'
      ],
      undynefinal2b2l: [
         "<25>{#f/9}* 在外域的那位女士...\n  我对她并不怎么了解，\n  但是...",
         "<25>* 在你抵达星港之后，\n  我就再也没见到她了。"
      ],
      undynefinal2b2m: [
         '<25>{#f/9}* 在工厂里度过一生的...\n  每一只。每一位。怪物。',
         '<25>* 都被夺去了生命。'
      ],
      undynefinal2b2n: [
         '<25>{#f/9}* 在星港里平静生活的...\n  每一只。每一位。怪物。',
         '<25>* 都迎来了自己\n  不合时宜的终局。'
      ],
      undynefinal2b2o: [
         '<25>{#f/9}* 那些在工厂里\n  度过一生的怪物们...',
         '<25>* 再无出头之日。'
      ],
      undynefinal2b2p: [
         '<25>{#f/9}* 那些在星港里\n  平静生活的怪物们...',
         '<25>* 惨遭无情屠杀。'
      ],
      undynefinal2b2q1: [
         '<25>{#f/9}* 目前为止，\n  每个区域都有\n  一只怪物死亡...',
         "<25>{#f/13}* 就好像你有各个区域的\n  杀戮指标似的。"
      ],
      undynefinal2b2q2: [
         '<25>{#f/9}* 目前为止，\n  每个区域都有\n  两只怪物死亡...',
         "<25>{#f/13}* 就好像你有各个区域的\n  杀戮指标似的。"
      ],
      undynefinal2b2q3: [
         '<25>{#f/9}* 目前为止，\n  每个区域都有\n  三只怪物死亡...',
         "<25>{#f/13}* 就好像你有各个区域的\n  杀戮指标似的。"
      ],
      undynefinal2b2q4: [
         '<25>{#f/9}* 目前为止，\n  每个区域都有\n  四只怪物死亡...',
         "<25>{#f/13}* 就好像你有各个区域的\n  杀戮指标似的。"
      ],
      undynefinal2b2q5: [
         '<25>{#f/9}* 目前为止，\n  每个区域都有\n  五只怪物死亡...',
         "<25>{#f/13}* 就好像你有各个区域的\n  杀戮指标似的。"
      ],
      undynefinal2b2r: () => [
         world.trueKills === 1
            ? "<26>{#f/9}* 在外域的那只怪物...\n  我实在是不知道它，\n  但是..."
            : "<26>{#f/9}* 在外域的那些怪物...\n  我实在是不知道它们，\n  但是...",
         "<25>* 多亏了您啊，\n  才让它们\n  就这样死掉了。"
      ],
      undynefinal2b2s: [
         '<25>{#f/9}* 即使只是一只怪物...',
         "<25>* 依旧有一个灵魂，\n  再也不能仰望星空。"
      ],
      
      undynefinal2b2t: [
         '<25>{#f/9}* 依然有至少两只怪物，\n  是今晚最后一次\n  离开他们的房子。',
         '<25>* 多亏了您啊，\n  才让他们的家人再也\n  不能与他们重逢。'
      ],
      undynefinal2b2u1: [
         '<25>{#f/9}* 那只大狗狗，\n  喜欢和他的战友们\n  在一起的他...',
         '<25>* 醒来时却发现\n  战友们都已死去。'
      ],
      undynefinal2b2u2: [
         '<25>{#f/9}* 那两只狗狗，\n  总是在照顾其他狗狗的\n  它们...',
         "<25>* 却发现再也没有狗狗\n  需要照顾了。"
      ],
      undynefinal2b2u3: [
         '<25>{#f/9}* 那只小狗，\n  平常形单影只的它...',
         "<26>* 其他狗狗的死亡\n  可能并不会影响到他，\n  但终有一天会的。"
      ],
      undynefinal2b2u4: [
         '<25>{#f/9}* 遁狗, 花了好几年\n  才在犬卫队找到了\n  一个家的他...',
         '<25>* 却又被无情地\n  夺走了一切。'
      ],
      undynefinal2b2v1: [
         '<25>{#f/9}* 那只大狗狗，\n  还有狗来米和\n  狗媳儿...',
         '<25>* 都消失于星港的\n  地表之上。'
      ],
      undynefinal2b2v2: [
         '<25>{#f/9}* 不管是大狗狗，\n  还是小狗狗...',
         '<25>{#f/13}* 所以说，按照你的说法，\n  只有中等体型的狗狗\n  才能生存。'
      ],
      undynefinal2b2v3: [
         '<25>{#f/9}* 那只大狗狗，\n  还有遁狗...',
         '<25>* 因为一个人类的\n  一时兴起，\n  而双双失去了生命。'
      ],
      undynefinal2b2v4: [
         '<25>{#f/9}* 那两只狗狗，\n  总是在照顾其他狗狗的\n  它们...',
         '<25>* 不仅如此，\n  它们所照顾的一只小狗，\n  也未能幸免。'
      ],
      undynefinal2b2v5: [
         '<25>{#f/9}* 那两只狗狗，\n  总是在照顾其他狗狗的\n  它们...',
         '<25>* 他们，还有被他们\n  所照看的遁狗，\n  都死掉了。'
      ],
      undynefinal2b2v6: [
         '<25>{#f/9}* 那只小狗狗，\n  还有它的战友遁狗...',
         '<25>* 因为一个人类的\n  一时兴起，\n  而双双失去了生命。'
      ],
      undynefinal2b3: () => [
         "<25>{#f/11}* 你觉得这很有趣吗？",
         '<25>* ...',
         '<25>{#f/17}* 你猜怎么着，混球。',
         ...(SAVE.data.n.state_foundry_muffet === 1
            ? [ "<25>* 这次你再怎么打电话\n  都没用了。" ]
            : [ '<25>* 你的死期已到。' ]),
         '<25>{#f/4}* 被你施加在\n  亡者身上的\n  每一份痛苦...',
         "<25>{#f/7}* 那些被你摧毁\n  而化为尘埃的\n  每个希望，每个梦想...",
         "<25>{#f/1}* 这位英雄\n  会用她的长矛\n  向你悉数讨回！",
         '<25>{#f/4}* 嘎啊啊啊！！！',
         "<25>{#f/5}* 我会让你见识一下\n  怪物们的决心\n  有多么强大！",
         "<25>{#f/17}* 来吧！\n* 上前来做个了断！"
      ],
      undynefinal2c1: [ '<32>* ...', '<32>* 罢了。' ],
      undynefinal2c2: () => [
         '<25>{#f/16}{#x1}* 听好了。',
         "<25>* 帕派瑞斯今天没来报到。",
         '<25>{#f/19}* ...',
         '<25>{#x2}* 你怎么想他都无所谓。',
         "<25>{#f/18}* 没错，帕派瑞斯是很古怪，\n  很天真，很自恋...",
         '<25>{#f/20}{#x3}* 可是，他绝不会\n  错过任何一次报到。',
         '<25>{#f/18}{#x4}* 而且，不管几点钟\n  给他打电话...',
         '<25>{#f/20}{#x5}* 他都绝不会\n  响铃两次还不接。',
         '<25>* ...',
         "<25>{#f/18}{#x6}* 现在，他不在了。",
         "<25>{#f/22}{#x7}* 他的兄弟，也失踪了。",
         '<25>* ...',
         '<25>{#f/18}* 告诉我，你把他怎么了？',
         '<25>{#f/11}{#x8}* 你把他{^6} 怎{^6} 么{^6} 了{^6}？',
         ...((SAVE.data.n.state_foundry_doge === 1 ? 1 : 0) +
            (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) +
            (SAVE.data.n.state_starton_dogs === 2 ? 2 : 0) +
            (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
            (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) >
         1
            ? [
                 '<25>{#f/16}{#x9}* 不仅如此，好几名卫队成员\n  也接连失踪...',
                 '<25>{#f/13}* 他们，是不是也被你杀了？'
              ]
            : [
                 '<25>{#f/16}{#x9}* 帕派瑞斯，我每天\n  都会亲自训练他...',
                 "<25>{#f/19}* 尽管我早知道他傻到\n  不会去伤害任何人..."
              ]),
         '<25>* ...',
         '<25>{#f/16}{#x10}* 想前进，随你。\n* 我给你准备的时间。',
         '<25>{#f/20}* 但只要你再往前踏出一步...',
         '<25>{#f/11}{#x11}* 我就会杀了你。'
      ],
      undynefinal3: () => [
         ...(SAVE.data.n.state_starton_papyrus === 1
            ? [ '<25>{#p/undyne}{#f/21}* 那好。', '<25>{#f/19}* ...' ]
            : world.trueKills > 1
            ? [ '<25>{#p/undyne}{#f/11}* 混蛋，你自找的。', '<25>{#f/9}* 准备好了吗...' ]
            : respecc()
            ? [ "<25>{#p/undyne}{#f/1}* 那么，好了...！", "<25>{#f/17}* 来吧，针尖对麦芒，\n  瞧瞧谁更厉害！" ]
            : [ "<25>{#p/undyne}{#f/1}* 那么，好了...！", '<25>{#f/17}* 别再想着逃走！' ])
      ],
      undynefinal3x: [ '<25>{#f/7}{*}* 去死吧！！！{#x1}{^999}' ],
      undynehouse1: [ "<32>{#p/basic}* 锁住了。" ],
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
            : [ "<32>{#p/basic}* 真的着火了。\n* 你不能进去。" ],
      walktext: {
         bird: () => [
            '<25>{#p/kidd}{#f/4}* 没路了...',
            world.genocide
               ? "<25>{#f/3}* 那只小鸟肯定忙着\n  带他去另一边了，哈哈。"
               : '<25>{#f/3}* 那只小鸟现在肯定很忙，\n  哈哈。'
         ],
         birdx: [ '<32>{#p/basic}* ...但是谁也没有来。' ],
         path1: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    "<25>{#p/kidd}{#f/8}* 我感觉我要吐了...",
                    SAVE.data.n.state_foundry_kidddeath > 5
                       ? '<25>* 我们杀了那么多怪物...'
                       : SAVE.data.n.state_foundry_kidddeath > 1
                       ? '<25>* 我们杀了别的怪物们...'
                       : '<25>* We killed a monster...'
                 ]
               : [
                    '<25>{#p/kidd}{#f/1}* 我有跟你说过我们是\n  怎么上航天飞机\n  驾驶课的吗！？',
                    '<25>{#p/kidd}{#f/7}* 真的超级壮观！'
                 ],
         path2: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    SAVE.data.b.f_state_kidd_fight
                       ? '<25>{#p/kidd}{#f/4}* 虽然... 你让我攻击他们...'
                       : '<25>{#p/kidd}{#f/4}* 虽然...\n  一直是你在攻击他们...',
                    '<25>{#p/kidd}{#f/8}* 但你真的...\n* ...真的打-打心底想...\n* ...那么做吗...？'
                 ]
               : [
                    '<25>{#p/kidd}{#f/2}* 有一天，那个矮个子骷髅\n  和他的兄弟来代课...',
                    '<25>{#p/kidd}{#f/2}* 还有，虽然是个秘密，\n  但是...',
                    '<25>{#f/1}* 他们让我自己一个人\n  绕着前哨站飞！！'
                 ],
         path3: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    '<25>{#p/kidd}{#f/4}* 我从没想伤害任何人，\n  我只是...\n* 我...',
                    '<25>{#p/kidd}{#f/8}* 我只是想醒过来...\n* 好希望... 这只是场噩梦...'
                 ]
               : [
                    "<25>{#p/kidd}{#f/1}* 也许有一天我会成为\n  一名真正的飞行员，\n  拥有自己的星际飞船。",
                    "<25>{#p/kidd}{#f/1}* 侧面画着火焰，\n  还有巨大的翅膀，\n  还有...",
                    "<25>{#p/kidd}{#f/6}* 天啊，肯定超酷的..."
                 ],
         path4: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [ '<25>{#p/kidd}{#f/8}* 我...', '<25>{#f/8}* 我...', "<25>{#f/5}* 我... \n* ...我会住嘴的。" ]
               : [
                    '<25>{#p/kidd}{#f/2}* 我们可以去宇宙的\n  任何地方，伙计...',
                    '<25>{#p/kidd}{#f/1}* 最好的事情呢？\n* 莫不如，不用，上学！'
                 ],
         path5: [ '<25>{#p/kidd}{#f/4}* 等等...' ],
         path6: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    "<25>{#p/kidd}{#f/8}* 你一个人是过不去的...",
                    '<25>{#p/kidd}{#f/8}* ...',
                    '<25>{#p/kidd}{#f/5}* ...我帮你。'
                 ]
               : [
                    '<25>{#p/kidd}{#f/2}* 你确定你能跨过\n  那个空隙吗？',
                    '<25>{#p/kidd}{#f/1}* 哟，我来帮你！'
                 ],
         path7: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [ '<25>{#p/kidd}{#f/8}* 爬上来。' ]
               : [ '<25>{#p/kidd}{#f/1}* 爬上来！' ],
         path8: () =>
            SAVE.data.n.state_foundry_muffet === 1
               ? [
                    '<25>{#p/kidd}{#f/4}* ...\n* 唉...',
                    '<25>{#f/8}* 要是以后你\n  再也见不到我了...\n* 告诉我父母...',
                    "<25>{#f/5}* ...\n* 就当没生过我吧。"
                 ]
               : [ "<25>{#p/kidd}{#f/1}* 别担心，伙计！\n* 我肯定能找条路过去的！" ],
         prechase: [
            '<25>{#p/kidd}{#f/4}* 嘿... 呃...\n* 我感觉这地方有点吓人...',
            '<25>{#f/3}* 要不咱们回去吧？'
         ],
         rescue1: () => [
            "<25>{#p/kidd}{#f/7}* 安黛因，不要！\n* 那是我的朋友！",
            world.dead_skeleton || geno() || world.population < 4
               ? "<32>{#p/undyne}* 才怪。\n* 小子，你不该和这家伙混一块的。"
               : "<32>{#p/undyne}* 回家吧，孩子。\n* 你跟这家伙不是一路人。"
         ],
         rescue2: [ '<25>{*}{#p/kidd}{#f/8}* 安黛因...{#x1}{^20}{%}' ],
         rescue3: [
            "<25>{*}{#p/kidd}{#f/13}* 我保证，我...\n  我-我会回来找你的！{^20}{%}",
            "<25>{*}{#p/kidd}{#f/13}* 你可千万别死，好吗？{^20}{%}"
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
                 "<32>{#p/basic}* 这是个装满电阻尼液的饮水机，\n  上面有一个奇怪的警告标签。",
                 '<32>{#p/basic}* “仅用于消除便携式\n   喷气背包的静电干扰。”'
              ]),
         choicer.create('* （要接一杯吗？）', '是', '否')
      ],
      watercooler2a: [ '<32>{#p/human}* （你现在拿着一杯电阻尼液。）' ],
      watercooler2b: [ '<32>{#p/human}* （你决定不接。）' ],
      watercooler3: () => [
         ...(SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The label describes using this fluid only in a specific kind of emergency.)' ]
            : [
                 "<32>{#p/basic}* 这是个装满电阻尼液的饮水机，\n  上面有一个奇怪的警告标签。",
                 '<32>{#p/basic}* “仅用于消除便携式\n   喷气背包的静电干扰。”'
              ]),
         '<32>{#p/human}* （你已经有一杯了。）'
      ]
   },

   b_group_foundry: {
      moldsmalMoldbygg1: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 呃啊，霉臭味！' ]
            : [ "<32>{#p/story}* It's a gelatin festival!" ],
      moldsmalMoldbygg2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一个了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我们了！' ]
            : [ '<32>{#p/story}* 现在只剩大黏簇一个了。' ],
      moldsmalMoldbygg2b: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一个了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我们了！' ]
            : [ '<32>{#p/story}* Gelatini now blorbs solo.' ],
      woshuaMoldbygg2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 矛盾二人组。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 哇，你好...' ]
            : [ '<32>{#p/story}* 刷洁顿跨坐着。\n* 可惜大黏簇也来了...' ],
      woshuaMoldbygg2a: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一个了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我们了！' ]
            : [ '<32>{#p/story}* 现在只剩大黏簇一个了。' ],
      woshuaMoldbygg2b: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 只剩一个了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 只剩我们了！' ]
            : [ '<32>{#p/story}* 刷洁顿不知道该怎么办。' ]
   },
   b_opponent_woshua: {
      tweet: '啾啾',
      epiphany: [
         [ '<08>{#p/basic}{~}Skrubby accepts your mercy.' ],
         () =>
            world.meanie
               ? [ '<08>{#p/basic}{~}Skrubby will retreat now..', '<08>{#p/basic}{~}Thx for warning!' ]
               : SAVE.data.b.oops && world.flirt > 9
               ? [ '<08>{#p/basic}{~}清洗你的身体..', '<08>{#p/basic}{~}Special service just for you!' ]
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
            ? [ "<32>{#p/asriel2}* 刷洁顿，洁癖狂魔。\n* 眼里容不下半点灰尘。" ]
            : [
                 '<32>{#p/story}* 刷洁顿 - 攻击 18 防御 5\n* 这个卑微的细菌恐惧症患者\n  想要清理整个星系。'
              ],
      act_check2: [
         '<33>{#p/story}* 刷洁顿 - 攻击 18 防御 5\n* 这个卑微的细菌恐惧症患者\n  想要回家清洗伤口。'
      ],
      act_check3: [
         '<32>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* One wheel closer to a cleaner future for monsterkind.'
      ],
      act_check4: [
         "<32>{#p/story}* 刷洁顿 - ATK 18 DEF 5\n* 这个卑微的细菌恐惧症患者\n  的爱情故事像肥皂一样。"
      ],
      name: '* 刷洁顿',
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 刷洁顿。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* 刷刷来了！" ]
            : [ '<32>{#p/story}* 刷洁顿漫步过来了。' ],
      idleTalk1a: [ '<08>{#p/basic}{~}清洗你的灵魂' ],
      idleTalk1b: [ '<08>{#p/basic}{~}清洗你的手' ],
      idleTalk1c: [ '<08>{#p/basic}{~}清洗你的脸' ],
      idleTalk1d: [ '<08>{#p/basic}{~}清洗你的头发' ],
      idleTalk1e: [ '<08>{#p/basic}{~}清洗你的脚' ],
      idleTalk2a: [ '<08>{#p/basic}{~}Skrub a dub-dubs' ],
      idleTalk2b: [ '<08>{#p/basic}{~}Oops, I meant..\nSkrub a sub-SUBS' ],
      idleTalk2c: [ '<08>{#p/basic}{~}Skrub a sub-subs' ],
      idleTalk3: () =>
         world.trueKills > 0 ? [ '<08>{#p/basic}{~}Your SOUL is unclean.' ] : [ '<08>{#p/basic}{~}\x00*吹着\n口哨*' ],
      cleanTalk: [ '<08>{#p/basic}{~}Green means clean' ],
      jokeTalk1: [ "<08>{#p/basic}{~}NO. THAT JOKE'S TOO.. DIRTY" ],
      jokeTalk2: [ "<08>{#p/basic}{~}EUGH.. I CAN'T BELIEVE THIS" ],
      randStatus1: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Look at the little bird!' ]
            : [ '<32>{#p/story}* 刷洁顿和一只小鸟交了朋友。' ],
      randStatus2: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* You should've SEEN when it tried to clean my school lunch off." ]
            : [ '<32>{#p/story}* 刷洁顿正在洗小碟子。' ],
      randStatus3: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<33>{#p/kidding}* We should go spacesuit-shining with this one.' ]
            : [ '<32>{#p/story}* 刷洁顿想洗点好玩的东西。' ],
      randStatus4: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Squeaky clean?\n* This is gonna be FREAKY clean.' ]
            : [ '<32>{#p/story}* 洗涤剂的味道。' ],
      randStatus5: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* You do NOT wanna get dirty around this one, dude.' ]
            : [ '<32>{#p/story}* 刷洁顿好奇星尘干不干净。' ],
      hurtStatus: () =>
         world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 一切... 还好吗？' ]
            : [ '<32>{#p/story}* 刷洁顿讨厌自己的伤口。' ],
      jokeText1: [ '<32>{#p/human}* (You tell a joke about a rusty piece of space junk.)' ],
      jokeText2: [ '<32>{#p/human}* （你拿大气污染打趣刷洁顿。）' ],
      jokeText3: [ '<32>{#p/human}* (You tell a joke about two starships that got stuck in a trash barge.)' ],
      touchText0: [
         '<32>{#p/human}* （你友好地摸了摸刷洁顿。）',
         "<32>{#p/basic}* 刷洁顿实在受不了你那\n  黏糊糊的手，于是跑掉了！"
      ],
      touchText1: [
         '<32>{#p/human}* （你友好地摸了摸刷洁顿。）',
         '<32>{#p/basic}* 刷洁顿后退，躲开了你的手。'
      ],
      touchText2: [
         '<32>{#p/human}* （你友好地摸了摸刷洁顿。）',
         '<32>{#p/basic}* 刷洁顿受宠若惊。'
      ],
      cleanText1: [
         '<32>{#p/human}* （你问刷洁顿能不能把你清洗一下。）',
         '<32>{#p/basic}* 刷洁顿高兴地跳来跳去。'
      ],
      flirtTalk1: [ '<08>{#p/basic}{~}No!\nUnclean romance!' ],
      flirtTalk2: [ '<08>{#p/basic}{~}Sparkle and shine!' ],
      cleanText2: [
         '<32>{#p/human}* （你问刷洁顿能不能把你清洗一下。）',
         '<32>{#p/basic}* 刷洁顿继续清洗。'
      ]
   },
   b_opponent_moldbygg: {
      sexyChat: [ '<08>{#p/basic}{~}\x00*性感扭动*' ],
      epiphany: [
         [ '<08>{#p/basic}{~}\x00*黏液的声音*' ],
         () =>
            world.meanie
               ? [ '<08>{#p/basic}{~}Guoooh..' ]
               : SAVE.data.b.oops && world.flirt > 9
               ? [ '<08>{#p/basic}{~}\x00*性感扭动*' ]
               : SAVE.data.b.oops
               ? [ '<08>{#p/basic}{~}\x00*高兴地扭动*' ]
               : [ '<08>{#p/basic}{~}\x00*slimy embrace*' ],
         [ '<08>{#p/basic}{~}Final roar.' ],
         [ '<08>{#p/basic}{~}\x00*闪亮地扭动*' ]
      ],
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 哇！' ]
            : [ '<32>{#p/story}* 大黏簇出现了！' ],
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇，恶心粘球。\n* 为啥我要多费口舌给你解释这些？' ]
            : [ '<32>{#p/story}* 大黏簇 - 攻击 18 防御 18\n* 它已经从“小团子”进化成功。' ],
      act_check2: [ '<32>{#p/story}* 大黏簇 - 攻击 18 防御 18\n* 状态并不是很好。' ],
      act_check3: [ '<32>{#p/story}* 大黏簇 - 攻击 18 防御 18\n* 允许成为全职果冻垫。' ],
      act_check4: [ '<32>{#p/story}* 大黏簇 - 攻击 18 防御 18\n* 和你的关系并没有想象的那么好...' ],
      act_topple1: [ "<32>{#p/human}* （你想推倒大黏簇，\n  可它身子还很结实。）" ],
      act_topple2: [ '<32>{#p/human}* （你推倒了大黏簇。）\n* （它的身体塌陷了，滚到了远处。）' ],
      name: '* 大黏簇',
      idleTalk1: [ '<08>{#p/basic}{~}Guoooh!' ],
      idleTalk2: [ '<08>{#p/basic}{~}\x00*黏液的声音*' ],
      idleTalk3: [ '<08>{#p/basic}{~}吼。' ],
      idleTalk4: [ '<08>{#p/basic}{~}\x00*e急切地扭动*' ],
      randStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* What does it want?' ]
            : [ '<32>{#p/story}* 大黏簇想背着你。' ],
      randStatus2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 我好奇我要是抱抱它\n  会发生什么。' ]
            : [ '<32>{#p/story}* 大黏簇焦虑地摇晃着。' ],
      randStatus3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 黏糊糊的... 但我喜欢！' ]
            : [ '<32>{#p/story}* 大黏簇磨动着地面。' ],
      randStatus4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 啥都黏糊糊的。' ]
            : [ '<32>{#p/story}* 果冻店的味道。' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 离死不远了。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* 大黏簇的状态看起来不太好..." ]
            : [ '<32>{#p/story}* 大黏簇身子不中用了。' ],
      act_handshake: [
         '<32>{#p/human}* （你向大黏簇伸出了手。）\n* （大黏簇用黏液把你包裹了起来。）',
         '<32>{#p/story}* 你的移速下降了！'
      ],
      act_sit: [ '<32>{#p/human}* （你坐在了大黏簇上面。）\n* （大黏簇很高兴能帮到你。）' ],
      distanceStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 大黏簇。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Can I come sit too!?' ]
            : [ '<32>{#p/story}* 大黏簇很高兴你来了。' ],
      act_flirt: [
         '<32>{#p/human}* （你扭动着臀部。）\n* （大黏簇像旋风一样转起来。）',
         '<32>{#p/basic}* 真是一场有意义的交流...？'
      ]
   },
   b_opponent_moldfake: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* 小黏团...\n* 直觉告诉我，这只怪物可没有\n  它外表看起来那么简单。" ]
            : [ '<32>{#p/story}* GELATINI - ATK 18 DEF 18\n* Not a squorch to be heard.' ],
      name: '* 小黏团',
      smalTalk: [ '<08>{#p/basic}{~}...' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* 小黏团。' ] : [ '<32>{#p/story}* 小黏团出现了？' ]),
      fakeStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏团。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Do Gelatinis always sit this still?' ]
            : [ "<32>{#p/story}* 小黏团不动了。" ],
      fakeStatus2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏团。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ "<32>{#p/kidding}* Something's off with that Gelatini..." ]
            : [ '<32>{#p/story}* Gelatini is a perfectly tempered gelatin with no flaws.' ],
      fakeStatus3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏团。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* Are Gelatinis always this quiet?' ]
            : [ "<32>{#p/story}* It's Gelatini's quiet time." ],
      fakeStatus4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 小黏团。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* This seems kinda weird.' ]
            : [ '<32>{#p/story}* 果冻店的味道。' ],
      act_imitate: [ '<32>{#p/human}* （你靠近了小黏团。）', '<32>{#p/basic}* ...突然！' ],
      act_flirt: [ '<32>{#p/human}* (You wiggle your hips.)', '<32>{#p/basic}* ...突然！' ],
      act_slap: [ '<32>{#p/human}* （你使劲扇了小黏团一巴掌。）', '<32>{#p/basic}* ...突然！' ]
   },
   b_opponent_shyren: {
      act_check: [ '<32>{#p/story}* 害羞塞壬 - 攻击19 防御0\n* 一位先知性歌手，因自己的羞怯\n  而踌躇不前。' ],
      act_check2: [ '<32>{#p/story}* 害羞塞壬 - 攻击19 防御0\n* 她带着崭新的自信重返舞台！' ],
      act_check3: [ '<32>{#p/story}* 害羞塞壬 - 攻击19 防御0\n* 她带着崭新的自信放声歌唱！' ],
      act_check4: [ "<32>{#p/story}* 害羞塞壬 - 攻击19 防御0\n* 她带着崭新的自信闪耀全场！" ],
      act_check5: [ '<32>{#p/story}* 害羞塞壬 - 攻击19 防御0\n* 一位先知性歌手，因自己的新伤\n  而踌躇不前。' ],
      act_check6: [ '<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* Alas, the bitter dregs of rejection.' ],
      act_check7: [ '<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* Suddenly, love songs.' ],
      awkwardtoot: [ '<08>{#p/basic}{~}(awkward toot)' ],
      creepStatus: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* 害羞塞壬蜷缩在角落里。' ]
            : [ "<32>{#p/kidding}* 我觉得这没什么用..." ],
      creepText1: [
         '<32>{#p/human}* （你露出你最灿烂的笑容\n  向害羞塞壬调情。）',
         '<32>{#p/basic}* 害羞塞壬转过身去...'
      ],
      creepText2: [
         '<32>{#p/human}* （你再一次向害羞塞壬调情。）',
         '<32>{#p/basic}* 害羞塞壬感觉非常不适，决定离开。'
      ],
      encourage1: () =>
         SAVE.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* 害羞塞壬似乎更喜欢一起跟着唱。' ]
            : [ '<32>{#p/kidding}* 一起唱歌？\n* 好样的，伙计！' ],
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
            ? [ '<32>{#p/kidding}* 不...\n* 别再这样了...' ]
            : [ "<32>{#p/kidding}* 哟，你还好吗？\n* 你看起来很难过..." ],
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
      act_boo1: [ '<32>{#p/human}* （你朝着害羞塞壬喝倒彩。）', '<32>{#p/basic}* 她耷拉着头，默默走了...' ],
      act_boo2: [
         '<32>{#p/human}* （你朝着害羞塞壬喝倒彩。）',
         '<32>{#p/basic}* Shyren, seeing how you handle rejection, leaves in a huff.'
      ],
      act_boo3: [
         '<32>{#p/human}* （你朝着害羞塞壬喝倒彩。）',
         "<32>{#p/basic}* Shyren's fleeting joy fades just as soon as it came to her."
      ],
      act_boo4: [
         '<32>{#p/human}* （你朝着害羞塞壬喝倒彩。）',
         '<32>{#p/basic}* The crowd, distraught, watches as Shyren flees the scene.'
      ],
      act_boo5: [
         '<32>{#p/human}* （你朝着害羞塞壬喝倒彩。）',
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
            ? [ '<32>{#p/asriel2}* 老顽鳄，自诩“酷毙”的鳄鱼。\n* 真是可笑至极，\n  瞧瞧这个二货到底有多土。' ]
            : [ '<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* A stargazer in starglasses.\n* Favorite genre: Kriobeat' ],
      act_check2: [ "<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* Things aren't looking so hot for this cool crocodile." ],
      act_check3: [ '<33>{#p/story}* RADTILE - ATK 24 DEF 12\n* This cool crocodile is on fire.' ],
      act_check4: [
         '<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* When it comes to romance, this cool crocodile is stone cold.'
      ],
      name: '* 老顽鳄',
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 老顽鳄。' ]
            : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
            ? [ '<32>{#p/kidding}* 别是这家伙呀...' ]
            : [ '<32>{#p/story}* 老顽鳄闪亮登场！' ],
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
      act_insult: [ '<32>{#p/human}* （你大骂老顽鳄废物，\n  让他闭上臭嘴。）' ],
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
            ? [ "<32>{#p/kidding}* 心理总感觉不是滋味..." ]
            : [ "<32>{#p/story}* 老顽鳄的牙齿开始脱落了。" ]
   },
   b_opponent_doge: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 督吉，一条冷血的狗。\n* 纯纯的工作机器。' ]
            : [ '<32>{#p/story}* 督吉 - 攻击14 防御10\n* 读作“dū ji”。轻声的“ji”。\n* 特战队成员。' ],
      act_flirt: () => [
         ...(dogecon() || world.goatbro
            ? [ '<32>{#p/human}* （你向督吉调情。）', '<32>{#p/basic}* 她对这种拍须溜马不屑一顾。' ]
            : battler.volatile[0].vars.pet
            ? [ '<32>{#p/human}* （你向督吉调情。）', '<32>{#p/basic}* 督吉回以微笑。' ]
            : battler.volatile[0].sparable
            ? [
                 '<32>{#p/human}* （你向督吉调情。）',
                 '<32>{#p/basic}* 督吉非常沮丧，不想听你说三道四。'
              ]
            : world.flirt < 10
            ? [ '<32>{#p/human}* （你向督吉调情。）', "<32>{#p/basic}* 督吉并没有什么\n  强烈的反应。" ]
            : [ '<32>{#p/human}* （你向督吉调情。）', '<32>{#p/basic}* Doge is giving it her all to resist you.' ])
      ],
      act_flirt2: [
         '<32>{#p/human}* （你再次对督吉调情。）',
         "<32>{#p/basic}* Doge can't keep this up for much longer..."
      ],
      act_flirt3: [
         '<32>{#p/human}* (You muster your courage, and call Doge a little munchkin.)',
         '<32>{#p/basic}* 督吉试着强装镇静，\n  但她的脸早已泛红。',
         "<32>* She squirms and she struggles, but there's no hiding what's on her face.",
         '<32>* 督吉一脸羞愧的逃离了现场...'
      ],
      batheText: [
         '<32>{#p/human}* （你建议督吉去洗个澡。）',
         '<32>{#p/basic}* 督吉从天花板上扯下一根水管...\n  水从管子里涌了出来。',
         "<32>* 水很冷，但她似乎\n  并不怎么介意...",
         '<32>* 很快，管子里的水就流光了。\n* 督吉稍微释放了一点压力...',
         "<32>{#p/story}* 督吉的攻击力下降了！"
      ],
      batheTextEarly: [ "<32>{#p/human}* （你建议督吉去洗个澡，\n  但她现在并不怎么想去。）" ],
      batheTextGeno: [
         '<32>{#p/human}* （你建议督吉去洗个澡。）',
         '<32>{#p/basic}* 但她根本不在乎自己脏不脏。'
      ],
      batheTextLate: [ '<32>{#p/human}* （你建议督吉去洗个澡，\n  但为时已晚。）' ],
      batheTextPost: [ '<32>{#p/human}* （但是督吉已经清洗干净了。）' ],
      fetchStatus: [ '<32>{#p/story}* 督吉的智商在普通狗的\n  平均水平之上。' ],
      fetchText: () => [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （督吉拦下了扳手，\n  并将它扔回给你。）',
         '<32>{#p/basic}* 飞回来的扳手直接\n  正中你的脑门！',
         '<32>{#p/story}* 你的移速下降了！',
         ...(world.goatbro && SAVE.flag.n.ga_asrielSpanner++ < 1
            ? [ "<32>{#p/asriel2}* Maybe don't try that again." ]
            : [])
      ],
      fetchTextEpic: [
         '<32>{#p/human}* （你把扳手扔了出去。）\n* （督吉灵光一闪，把扳手捡了起来\n  并带还给你。）'
      ],
      fetchTextGarb: [ '<32>{#p/human}* （你把扳手扔了出去。）\n* （筋疲力尽的督吉直接将扳手\n  选择性忽视掉了。）' ],
      flirtStatus: [ '<32>{#p/story}* 督吉正猜疑你进攻背后\n  所隐藏的真正意图。' ],
      flirtStatusAccept: [ '<32>{#p/story}* 督吉的脸微微泛红。' ],
      flirtStatusReject: [ '<32>{#p/story}* 督吉无奈地叹了口气。' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* 离死不远了。' ]
            : [ "<32>{#p/story}* 督吉拼命装出一副没事的样子。" ],
      name: '* 督吉',
      petTalkPost: [ '<11>{#p/basic}{~}啊...' ],
      petText: [
         '<32>{#p/human}* （你试着抚摸督吉。）',
         '<32>{#p/basic}* 督吉犹豫地将头抬了起来。',
         '<32>* 你的手摸到了督吉的头。\n* 她顿时容光焕发。\n* 并给了你一个大大的微笑作为回应。',
         '<32>* 所有堆积在她内心里的压力\n  终于完全得到了释放。',
         '<32>* 督吉不再想与你战斗了。'
      ],
      petTextEarly: [ "<32>{#p/human}* （你试着抚摸督吉，\n  但你现在还够不到她。）" ],
      petTextGeno: [
         '<32>{#p/human}* （你试着抚摸督吉。）',
         '<32>{#p/basic}* 她对这份亲昵漠然置之。'
      ],
      petTextLate: [ '<32>{#p/human}* （你试着抚摸督吉，\n  但为时已晚。）' ],
      petTextPost1: [
         '<32>{#p/human}* （你再一次试着抚摸督吉。）',
         "<32>{#p/basic}* 督吉沉浸在你的爱抚之中，\n  仿佛她多年来第一次受到关爱..."
      ],
      petTextPost2: [ '<32>{#p/human}* （你还想再试着抚摸督吉。）', '<32>{#p/basic}* 督吉已经要爽上天了。' ],
      petTextPost3: [ '<32>{#p/human}* （你继续抚摸着督吉。）', '<32>{#p/basic}* 这么摸下去不会违法吗？' ],
      petTextPost4: [ '<32>{#p/human}* （你又抚摸了督吉好一会。）', '<32>{#p/basic}* 督吉直接躺在了地上。' ],
      petTextPost5: [ '<32>{#p/human}* （你揉了揉督吉的肚皮。）', '<32>{#p/basic}* 督吉开始流口水了...' ],
      petTextPost6: [ '<32>{#p/human}* （你抚摸着督吉。）', '<32>{#p/basic}* 她还在继续流着口水。' ],
      petTextPost7: [ '<32>{#p/human}* （你抚摸着督吉。）', '<32>{#p/basic}* ...' ],
      petTextSus: [ '<32>{#p/human}* （但是督吉过于烦躁，\n  不想被摸。）' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* 督吉。' ] : [ '<32>{#p/story}* 督吉昂首阔步向你走来。' ]),
      turnStatus1: [ '<32>{#p/story}* 督吉审视着你的站姿，\n  认为你不够端正。' ],
      turnStatus2: () =>
         dogecon() ? [ '<32>{#p/story}* 督吉摆弄着她的长矛。' ] : [ '<32>{#p/story}* 督吉需要好好冲洗一番。' ],
      turnStatus3: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉一再检查她的站姿。' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/story}* 督吉浑身湿漉漉的。' ]
            : [ "<32>{#p/story}* 督吉的卫生习惯毫无改变，\n  这让她感到非常沮丧。" ],
      turnStatus4: () =>
         dogex()
            ? [ '<32>{#p/story}* 督吉想起了她的职责。' ]
            : world.dead_canine
            ? [ '<32>{#p/story}* 督吉想起了她的同事们。' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/story}* 督吉想要活动一下筋骨。' ]
            : [ '<32>{#p/story}* 督吉思考着她的职责所在。' ],
      turnStatus5: () =>
         dogex()
            ? [ '<32>{#p/story}* 督吉想起了她的荣誉。' ]
            : world.dead_canine
            ? [ '<32>{#p/story}* 督吉想起了她的朋友们。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉稍微放松了一下，\n  随后恢复了标准的站姿。' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/story}* 督吉镇静了下来。' ]
            : [ '<32>{#p/story}* 督吉深切怀念起\n  她的一位老同事。' ],
      turnStatus6: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉保持着冷静。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉深吸一口气。' ]
            : [ '<32>{#p/story}* 督吉冒出了一身冷汗。' ],
      turnStatus7: () =>
         battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉渴望着关爱。' ]
            : [ '<32>{#p/story}* 督吉深吸一口气。' ],
      turnStatus8: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉依旧保持着专注。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉需要帮助。' ]
            : [ "<32>{#p/story}* 督吉的呼吸变得急促。" ],
      turnStatus9: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉依旧保持着专注。' ]
            : battler.volatile[0].vars.walk
            ? [ '<32>{#p/story}* 督吉只想被抚摸。' ]
            : [ '<32>{#p/story}* 督吉气喘吁吁。' ],
      turnStatus10: () =>
         dogecon()
            ? [ '<32>{#p/story}* 督吉依旧保持着专注。' ]
            : battler.volatile[0].vars.pet
            ? [ '<32>{#p/story}* 督吉心满意足。' ]
            : [ '<32>{#p/story}* 督吉从容不迫地屹立着，\n  等待你举手投降。' ],
      turnTalk1: () =>
         dogecon() || world.goatbro
            ? [ "<11>{#p/basic}{~}你犯下的罪行，\n我一清二楚。" ]
            : [ '<11>{#p/basic}{~}队长警告我们\n要提防你。' ],
      turnTalk2: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}两人联手，\n滥杀无辜...',
                 '<11>{#p/basic}{~}已然沉溺于\n杀戮快感之中\n无法自拔？'
              ]
            : dogex()
            ? [ '<11>{#p/basic}{~}当你屠戮平民，\n践踏生命时...', '<11>{#p/basic}{~}可曾懊悔过\n自己的\n所作所为？' ]
            : world.dead_canine
            ? [ '<11>{#p/basic}{~}犬卫队\n所有成员...', '<11>{#p/basic}{~}都惨死于\n你的暴行之下，\n无一幸免。' ]
            : [
                 '<11>{#p/basic}{~}因此，\n我一直在\n日夜巡逻。',
                 '<11>{#p/basic}{~}请注意...\n这里很脏。'
              ],
      turnTalk3: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}不愿下出\n如此定论...',
                 '<11>{#p/basic}{~}但依我所见，\n绝无其他可能。'
              ]
            : dogecon()
            ? [
                 '<11>{#p/basic}{~}你随时可以\n弃甲投戈...',
                 '<11>{#p/basic}{~}然而你选择\n将杀戮\n贯彻到底。'
              ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{#p/basic}{~}啊...', '<11>{#p/basic}{~}真爽...' ]
            : [
                 '<11>{#p/basic}{~}但我想，\n作为\n特战队的\n一份子。',
                 '<11>{#p/basic}{~}我们必须\n随机应变。'
              ],
      turnTalk4: () =>
         dogecon() || world.goatbro
            ? [
                 '<11>{#p/basic}{~}遥想当年，\n初入特战队...',
                 "<11>{#p/basic}{~}那时，安黛因\n视人类为敌，\n我将信将疑。"
              ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{#p/basic}{~}毛发沾\n太多水了...' ]
            : [
                 '<11>{#p/basic}{~}遥想当年，\n申请参加\n特战队时...',
                 "<11>{#p/basic}{~}我未曾想过\n我会\n顺利入队。"
              ],
      turnTalk5: () =>
         dogecon() || world.goatbro
            ? [ "<11>{#p/basic}{~}而当亲眼目睹\n你这般行径...", "<11>{#p/basic}{~}我的心中\n已再无疑虑。" ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{#p/basic}{~}嗯。\n没有什么事\n更能胜过\n散步了。' ]
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
                 '<11>{#p/basic}{~}但在\n那个蠢货\n退役之后...',
                 '<11>{#p/basic}{~}我就接过\n他的班了。'
              ],
      turnTalk6: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}而你，\n艾斯利尔，\n就是我族叛徒。',
                 '<11>{#p/basic}{~}难以置信，\n如此邪恶至极，\n却将登基为王。'
              ]
            : dogex()
            ? [ '<11>{#p/basic}{~}投降是\n明智之举。', '<11>{#p/basic}{~}你却不知\n如何去做。' ]
            : world.dead_canine
            ? [
                 '<12>{#p/basic}{~}遁狗是狗卫队\n最新成员。',
                 '<11>{#p/basic}{~}有些人... 把他的视力\n当作一种空去钻...',
                 '<11>{#p/basic}{~}但是他的前途\n那么明朗。'
              ]
            : battler.volatile[0].vars.walk
            ? [
                 "<11>{#p/basic}{~}已经走了\n一阵子的\n你...",
                 '<11>{#p/basic}{~}现在又\n还剩多少\n耐力呢？'
              ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{#p/basic}{~}Apologies.\nThere is much on my mind.' ]
            : [
                 '<11>{#p/basic}{~}这份工作\n有些艰苦...',
                 '<11>{#p/basic}{~}就连安黛因\n都为此开始\n自我怀疑。',
                 '<11>{#p/basic}{~}...别跟她讲\n我在背后\n这么对她\n说三道四。'
              ],
      turnTalk7: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}我们的宿命\n竟是这般？',
                 '<11>{#p/basic}{~}卑鄙的王子\n与人类共谋...',
                 '<11>{#p/basic}{~}...誓要剿灭\n我族所有同胞？'
              ]
            : dogex()
            ? [
                 '<11>{#p/basic}{~}你视生命如\n草芥。',
                 '<11>{#p/basic}{~}总把我们看得\n低人一等。'
              ]
            : world.dead_canine
            ? [
                 "<11>{#p/basic}{~}小犬座是\n大犬座\n的直系下属。",
                 '<11>{#p/basic}{~}它独特的观察\n方式帮了很\n多忙...',
                 '<11>{#p/basic}{~}即使这种行为\n常常被大家\n误解。'
              ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{#p/basic}{~}显然比我\n想象中的\n要多...' ]
            : [ '<11>{#p/basic}{~}（叹气...）' ],
      turnTalk8: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}终究...',
                 "<11>{#p/basic}{~}两人孰更恶劣，\n难以论断。"
              ]
            : dogex()
            ? [ '<11>{#p/basic}{~}现在，\n轮到你了。', '<11>{#p/basic}{~}轮到你领受\n低人一等的\n待遇。' ]
            : world.dead_canine
            ? [
                 '<11>{#p/basic}{~}Dogamy and Dogaressa, a duo of dilligence.',
                 '<11>{#p/basic}{~}Before they met, they often misbehaved.',
                 '<11>{#p/basic}{~}But once together, they could do ANYTHING.'
              ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{#p/basic}{~}...', '<11>{#p/basic}{~}Can we really keep going like this?' ]
            : [ '<11>{#p/basic}{~}战斗\n开始进入\n僵局...' ],
      turnTalk9: () =>
         world.goatbro
            ? 
              [ '<11>{#p/basic}{~}只此一言...', '<11>{#p/basic}{~}这一切，\n未曾预料。' ]
            : dogex()
            ? [ '<11>{#p/basic}{~}...' ]
            : world.dead_canine
            ? [
                 '<11>{#p/basic}{~}Canis Major was there when the canine unit was formed.',
                 '<11>{#p/basic}{~}Along with its master, it led the unit well.',
                 '<11>{#p/basic}{~}But now...'
              ]
            : [ '<11>{#p/basic}{~}人类，我...' ],
      turnTalk10: () =>
         world.goatbro
            ? [
                 '<11>{#p/basic}{~}言尽至此。',
                 '<11>{#p/basic}{~}I will have justice for the terror you have inspired.'
              ]
            : dogex()
            ? [
                 '<11>{#p/basic}{~}言尽至此。',
                 "<11>{#p/basic}{~}正义，\n我必索回。"
              ]
            : world.dead_canine
            ? [
                 '<11>{#p/basic}{~}言尽至此。',
                 "<11>{#p/basic}{~}I will have justice for those dogs' deaths."
              ]
            : battler.volatile[0].vars.pet
            ? [ '<11>{#p/basic}{~}（脸红了）', '<11>{#p/basic}{~}你真是个...\n友善的\n人类...' ]
            : [
                 '<11>{#p/basic}{~}我觉得\n是时候\n到此为止\n了。',
                 '<11>{#p/basic}{~}...',
                 '<11>{#p/basic}{~}实话讲，\n你并没有\n那么坏。',
                 '<11>{#p/basic}{~}至少\n比安黛因\n所述的\n略有差别。',
                 '<11>{#p/basic}{~}请你如\n接受恳求般\n接受我的\n仁慈...',
                 '<11>{#p/basic}{~}恳求你\n不会再堕入\n黑暗之中。'
              ],
      turnTalk11: () => [ '<11>{#p/basic}{~}...' ],
      walkText: [
         '<32>{#p/human}* （你想带着督吉去散散步。）',
         '<32>{#p/basic}* 督吉跟随着你的脚步。\n* 你们一起齐步前进。',
         '<32>* 你们就这样走了一会...',
         '<32>* 到最后...',
         '<32>* 督吉开始厌倦这种\n  无聊的活动了。',
         '<32>* 她又跟着你回到了她的巡逻区\n  ，释放了点压力...',
         "<32>{#p/story}* 督吉的攻击力下降了！"
      ],
      walkTextEarly: [ '<32>{#p/human}* （你想带着督吉去散散步，\n  但她没有理由跟你一起去。）' ],
      walkTextGeno: [
         '<32>{#p/human}* （你想带着督吉去散散步。）',
         '<32>{#p/basic}* 督吉拒绝了你的散步请求。'
      ],
      walkTextLate1: [
         "<32>{#p/human}* （你想带督吉去散散步，\n  但她为了你已经弄干\n  自己的身体了。）"
      ],
      walkTextLate2: [
         '<32>{#p/human}* （你想带督吉去散散步，\n  但她从来不做任何非必要的事。）'
      ],
      walkTextPost: [ '<32>{#p/human}* （但是督吉早已因为之前的散步\n  而累到虚脱了。）' ],
      walkTextSus: [ '<32>{#p/human}* （但是督吉太脏了，\n  没法出去散步。）' ]
   },
   b_opponent_muffet: {
      act_check: [ '<32>{#p/story}* 玛菲特 - 攻击39 防御19\n* 全蜘蛛部落的女王。\n* 特战队志愿兵。' ],
      act_flirt: () => [
         ...(badSpider()
            ? [ '<32>{#p/human}* （你向玛菲特调情。）\n* （玛菲特狠狠瞪了你一眼。）' ]
            : battler.volatile[0].sparable
            ? [ '<32>{#p/human}* （你向玛菲特调情。）\n* （玛菲特笑了笑，\n  伸出几只手拍了拍你的头。）' ]
            : world.flirt < 10
            ? [ '<32>{#p/human}* （你向玛菲特调情。）\n* （玛菲特笑了笑，\n  向你挥舞她的一些手指。）' ]
            : [ '<32>{#p/human}* （你向玛菲特调情。）\n* （玛菲特看起来颇有兴致，\n  但还是不够。）' ])
      ],
      act_flirt2: [
         '<32>{#p/human}* （你向玛菲特调情。）\n* （玛菲特对你投向了更多目光。）'
      ],
      act_flirt3: [
         '<32>{#p/human}* （你鼓起勇气，邀请玛菲特\n  一同去野餐。）',
         '<32>{#p/basic}* 玛菲特咯咯笑了几下...',
         '<32>* 然后又笑了几声...',
         "<32>* 她已经无法控制自己的情感了！\n* 玛菲特向你完美的调情能力屈服！",
         '<32>* ... 然后立即决定结束战斗，\n  以免让她的蜘蛛同伴们蒙羞。',
         '<32>{#p/kidding}* ... 什么？'
      ],
      flirtReaction1: [ '<11>{#p/basic}{~}真可爱啊~' ],
      flirtReaction2: [ "<11>{#p/basic}{~}你人真好~" ],
      flirtReaction3: [ '<11>{#p/basic}{~}啊呼呼~' ],
      appeaseText: [
         '<33>{#p/human}* （你对玛菲特发出呼吁。）\n* （玛菲特再一次被你的话\n  所吸引。）',
         '<32>* （你说起那些天真的狗狗，\n  批判安黛因把它们编入卫队\n  是有多不负责。）',
         '<32>* （你接着上句说，相信这种队长\n  就如同将整个蜘蛛部落置于险境。）',
         '<32>{#p/basic}* 玛菲特开始仔细地考虑\n  这些情况...',
         "<32>{#p/story}* 玛菲特的攻速下降了！"
      ],
      appeaseTextEarly: [ "<32>{#p/human}* （你向玛菲特发出呼吁，\n  但她看起来还没有准备好\n  倾听你的话。）" ],
      appeaseTextGeno: [
         '<32>{#p/human}* （你向玛菲特发出呼吁。）',
         '<32>{#p/basic}* 玛菲特可不会被你的肤浅言论\n  所左右。'
      ],
      appeaseTextLate: [
         "<32>{#p/human}* （你向玛菲特发出呼吁，\n  但她已经不想再听了。）"
      ],
      appeaseTextPost: [ "<32>{#p/human}* （但玛菲特不需要被呼吁第二遍。）" ],
      appeaseTextSus: [ '<32>{#p/human}* （但玛菲特没有理由去听你说话。）' ],
      counterText: [
         '<32>{#p/human}* （你尝试反驳玛菲特。）\n* （玛菲特被你的话所吸引。）',
         '<32>* （你告诉她说和特战队做交易\n  完全站不住脚。）',
         '<32>* （你提到他们的其中一员都没能\n  把你抓住。）',
         '<32>{#p/basic}* 玛菲特开始思考着这些事的\n  来龙去脉...',
         "<32>{#p/story}* 玛菲特的攻速下降了！"
      ],
      counterTextEarly: [
         "<32>{#p/human}* （你试图反驳玛菲特，\n  但她还没有说出\n  能供你反驳的话。）"
      ],
      counterTextGeno: [
         '<32>{#p/human}* （你尝试反驳玛菲特。）',
         '<32>{#p/basic}* 玛菲特对自己的目标坚定不移。'
      ],
      counterTextLate: [ "<32>{#p/human}* （你尝试反驳玛菲特，\n  但她早已拿定了主意。）" ],
      counterTextPost: [ '<32>{#p/human}* （但玛菲特已经听过了\n  你的驳论。）' ],
      name: '* 玛菲特',
      payTalkPost: [ "<11>{#p/basic}{~}谢谢你的好意，\n但我们的钱\n已经够多了~" ],
      payText: [
         '<32>{#p/human}* （你尝试给玛菲特付钱。）',
         "<32>* 看起来，怪物小孩的钱足够支付\n  所有蜘蛛部落的开支！",
         '<32>* 玛菲特收下了钱，向你和怪物小孩\n  鞠了一躬。',
         '<32>* 她的臣民可以吃饱喝足\n  好一段时间了。',
         "<32>* 玛菲特不再关心战斗了。"
      ],
      payTextEarly: [
         "<32>{#p/human}* （你尝试给玛菲特付钱，\n  但她现在尚未知晓你给她钱的\n  任何依据。）"
      ],
      payTextGeno: [
         '<32>{#p/human}* （你尝试给玛菲特付钱。）',
         "<32>{#p/basic}* 玛菲特不再需要你的钱。"
      ],
      payTextLate: [ "<32>{#p/human}* （你尝试给玛菲特付钱，\n  但她已经不想再受贿了。）" ],
      payTextPost: [ '<32>{#p/human}* （你再一次尝试给玛菲特钱。）' ],
      payTextSus: [ '<32>{#p/human}* （但是玛菲特没有理由来相信你。）' ],
      status1: [ "<32>{#p/kidding}* 我被困住了...！" ],
      turnStatus1: () =>
         badSpider()
            ? world.genocide
               ? world.bullied
                  ? [ '<32>{#p/kidding}* 两只小流氓...？' ]
                  : [ '<32>{#p/kidding}* 两只杀人犯...？' ]
               : world.bullied
               ? [ '<32>{#p/kidding}* 小流氓...？' ]
               : [ '<32>{#p/kidding}* 杀人犯...？' ]
            : [ '<32>{#p/kidding}* 救命...！' ],
      turnStatus2: () =>
         badSpider()
            ? world.genocide
               ? [ "<32>{#p/kidding}* 但我们什么都没做！" ]
               : [ "<32>{#p/kidding}* 我有种不祥的预感..." ]
            : [ "<32>{#p/kidding}* 所以说，这存粹是生意了..." ],
      turnStatus3: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 哟...\n* 看来她真的很不喜欢你..." ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* 我们该怎么办？' ]
            : [ "<32>{#p/kidding}* 我们永远也逃不出去了，\n  不是吗..." ],
      turnStatus4: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 那是什么鬼东西？' ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* 她难道... 改变主意了吗？' ]
            : [ '<32>{#p/kidding}* 那是什么鬼东西？' ],
      turnStatus5: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 当然...' ]
            : battler.volatile[0].vars.counter
            ? [ "<32>{#p/kidding}* 看来没那么容易..." ]
            : [ "<32>{#p/kidding}* 你... 你在开玩笑吧？\n* 一点也不有趣！" ],
      turnStatus6: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 我可不喜欢她对你说的话，\n  伙计..." ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* 蜘蛛同伴们...？' ]
            : [ '<32>{#p/kidding}* 呃...' ],
      turnStatus7: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 她太无情了...！" ]
            : battler.volatile[0].vars.appease
            ? [ '<32>{#p/kidding}* 嘿，等一下...\n* 我觉得这方法开始奏效了！\n* 继续努力，伙计！' ]
            : [ "<32>{#p/kidding}* 我...\n* 我很害怕，伙计..." ],
      turnStatus8: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 伙计，我们怎么还活着啊？？' ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* 哟，先把古怪的杯糕丢一边... \n  我们终于有点进展了！\n* 应该吧？" ]
            : [ '<32>{#p/kidding}* 呃啊，别再来了！！' ],
      turnStatus9: () =>
         badSpider()
            ? [ '<32>{#p/kidding}* 什么叫“不可避免的事情”?' ]
            : battler.volatile[0].vars.appease
            ? [ '<32>{#p/kidding}* 但是...\n* 我觉得我们...' ]
            : [ '<32>{#p/kidding}* 呃啊，别再来了！！' ],
      turnStatus10: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 哟，你应该知道我也在这吧..." ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* 嘿，我有点钱！\n* 用上吧，伙计！" ]
            : [ '<32>{#p/kidding}* 有人吗, 来人啊...' ],
      turnStatus11: () =>
         badSpider()
            ? [ "<32>{#p/kidding}* 这一点也不有趣...！" ]
            : battler.volatile[0].vars.pay
            ? [ "<32>{#p/kidding}* 我希望那个矮个子骷髅不会介意我\n  用他给我的钱..." ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* 伙计...\n* 为什么我们不去帮帮她呢？" ]
            : [ "<32>{#p/kidding}* 结束了..." ],
      turnStatus12: () =>
         badSpider() ? [ '<32>{#p/kidding}* ...' ] : [ '<32>{#p/kidding}* 我们要就此结束，还是...？' ],
      turnStatus13: () =>
         badSpider() ? [ '<32>{#p/kidding}* 真的结束了吗？' ] : [ '<32>{#p/kidding}* 我们要就此结束，还是...？' ],
      turnTalk1: () =>
         badSpider()
            ? world.genocide
               ? world.bullied
                  ? [ '<11>{#p/basic}{~}啊呼呼呼...\n两只小流氓\n爬进我\n网里了~' ]
                  : [ '<11>{#p/basic}{~}啊呼呼呼...\n两只杀人犯\n爬进我\n网里了~' ]
               : world.bullied
               ? [ '<11>{#p/basic}{~}啊呼呼呼...\n一只小流氓\n爬进我\n网里了~' ]
               : [ '<11>{#p/basic}{~}啊呼呼呼...\n一只杀人犯\n爬进我\n网里了~' ]
            : [ "<11>{#p/basic}{~}小宝贝们，\n你们现在\n是我的了~" ],
      turnTalk1a: [
         '<11>{#p/basic}{~}希望你能\n喜欢这种\n新颜色~',
         '<11>{#p/basic}{~}我觉得紫色\n更适合你...',
         "<11>{#p/basic}{~}不是吗，\n小宝贝们？"
      ],
      turnTalk2: () =>
         badSpider()
            ? [
                 world.genocide
                    ? '<11>{#p/basic}{~}你们以为会\n发生什么，\n小可爱们？'
                    : '<11>{#p/basic}{~}你以为会\n发生什么，\n小可爱？',
                 '<11>{#p/basic}{~}指望我会\n饶恕你不成？'
              ]
            : [
                 "<11>{#p/basic}{~}别以为\n我会对你\n手下留情，\n渺小的\n人类。",
                 '<11>{#p/basic}{~}那支特战队\n为了得到\n你的灵魂\n可是给了我\n很多钱的~'
              ],
      turnTalk3: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}哦天哪~', '<11>{#p/basic}{~}你可\n真丢人~' ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{#p/basic}{~}啊呼呼呼...\n行吧...' ]
            : [
                 '<11>{#p/basic}{~}看来你\n不打算提出\n反报价了...',
                 '<11>{#p/basic}{~}那对我来说，\n该选哪个\n显而易见~'
              ],
      turnTalk4: () =>
         badSpider()
            ? [
                 '<11>{#p/basic}{~}好吧。\n有件好消息\n要告诉你~',
                 "<11>{#p/basic}{~}我不必再为\n喂养我的宠物\n而发愁了！"
              ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{#p/basic}{~}如果有\n更棒的交易\n就好了...' ]
            : [ '<11>{#p/basic}{~}我的宠物，\n你在哪~', "<11>{#p/basic}{~}饭点到啦~" ],
      turnTalk5: () =>
         badSpider()
            ? [
                 '<11>{#p/basic}{~}你活下来了？\n真厉害~',
                 '<11>{#p/basic}{~}那我应当\n奖励你...',
                 '<11>{#p/basic}{~}...\n更多攻击啦！\n啊呼呼呼！'
              ]
            : battler.volatile[0].vars.counter
            ? [
                 '<11>{#p/basic}{~}但我该\n怎么保证...',
                 "<11>{#p/basic}{~}... 你不会\n在背后偷偷\n捅我刀子呢？"
              ]
            : [
                 '<11>{#p/basic}{~}我有时会想，\n战斗到底是\n什么样子的。',
                 "<11>{#p/basic}{~}我从来没想到\n它会那么有趣~"
              ],
      turnTalk6: () =>
         badSpider()
            ? [
                 '<11>{#p/basic}{~}感觉怎么样，\n嗯？',
                 !world.bullied
                    ? '<11>{#p/basic}{~}所有的怪物\n都如\n多米诺骨牌\n般倒下...'
                    : '<11>{#p/basic}{~}所有的怪物\n都在\n惊慌失措中\n四处逃窜...'
              ]
            : battler.volatile[0].vars.counter
            ? [
                 '<11>{#p/basic}{~}我的\n蜘蛛同伴们\n的安全\n需要\n得到保障...',
                 "<11>{#p/basic}{~}我可不能\n让它们\n置于险地，\n不是吗？\n啊呼呼呼..."
              ]
            : [
                 "<11>{#p/basic}{~}玩得开心吗，\n小可爱们？",
                 '<11>{#p/basic}{~}我的\n蜘蛛同伴们\n一定会...',
                 '<11>{#p/basic}{~}... 等到他们\n拿到自己的\n那份钱的时候~'
              ],
      turnTalk7: () =>
         badSpider()
            ? world.genocide || !world.bullied
               ? [
                    world.genocide ? '<11>{#p/basic}{~}那么，\n小可爱们...' : '<11>{#p/basic}{~}那么，\n小可爱...',
                    '<11>{#p/basic}{~}我得好好享受\n杀死你们\n所带来的\n乐趣~'
                 ]
               : [ '<11>{#p/basic}{~}那么，\n小可爱...', '<11>{#p/basic}{~}我很乐意将\n这份恩情\n报答于你~' ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{#p/basic}{~}我必须承认，\n那东西确实\n令人担忧...' ]
            : [
                 '<11>{#p/basic}{~}好吧，\n没关系的，\n渺小的人类~',
                 '<11>{#p/basic}{~}现在\n唯一重要的，\n是你的灵魂~'
              ],
      turnTalk8: () =>
         badSpider()
            ? [
                 world.genocide
                    ? '<11>{#p/basic}{~}哦，\n太有趣了，\n你们两个！'
                    : '<11>{#p/basic}{~}哦，\n太有趣了，\n不是吗？',
                 "<11>{#p/basic}{~}喂食时间\n到啦，\n我的宠物~"
              ]
            : battler.volatile[0].vars.appease
            ? [
                 "<11>{#p/basic}{~}它们也没有\n做什么事\n来赢得\n我的信任...",
                 '<11>{#p/basic}{~}哦，你好，\n我的宠物~'
              ]
            : [ '<11>{#p/basic}{~}再来一轮吧,\n我的宠物~' ],
      turnTalk9: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}你只是让\n不可避免的\n事情\n延迟发生罢了~' ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{#p/basic}{~}不过嘛，\n小可爱们...', "<11>{#p/basic}{~}我不知道\n我能否\n相信你们~" ]
            : [ "<11>{#p/basic}{~}你挺坚强的，\n这点我得承认~" ],
      turnTalk10: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}好啦...', "<11>{#p/basic}{~}难道你\n不累吗？" ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{#p/basic}{~}也许，除非...', '<11>{#p/basic}{~}你能给我\n一点保险费？' ]
            : [ '<11>{#p/basic}{~}除非交易\n发生变动，\n否则\n你的灵魂\n就如我的\n一般亮眼~' ],
      turnTalk11: () =>
         badSpider()
            ? [ '<11>{#p/basic}{~}啊呼呼呼...' ]
            : battler.volatile[0].vars.pay
            ? [
                 '<11>{#p/basic}{~}我向你们二人\n致以最诚挚的\n歉意~',
                 "<11>{#p/basic}{~}你们的善举\n我永远\n不会忘记！"
              ]
            : [
                 "<11>{#p/basic}{~}这是什么？\n一条来自\n安黛因的信息？",
                 "<11>{#p/basic}{~}她取消了\n交易...？",
                 '<11>{#p/basic}{~}... 嗯...',
                 "<11>{#p/basic}{~}行吧，\n看来我得\n就此收工了，\n不是吗？",
                 '<11>{#p/basic}{~}很抱歉浪费了\n你的时间~'
              ],
      turnTalk12: () => [ '<11>{#p/basic}{~}...' ],
      turnTalk13: (didf: boolean) =>
         badSpider()
            ? [
                 world.genocide
                    ? '<11>{#p/basic}{~}你知道吗，\n小可爱们？'
                    : '<11>{#p/basic}{~}你知道吗，\n小可爱？',
                 "<11>{#p/basic}{~}我已经不想\n与你继续\n战斗下去了。",
                 '<11>{#p/basic}{~}所以，\n做你\n想做的吧。',
                 world.genocide || !world.bullied
                    ? didf
                       ? "<11>{#p/basic}{~}... 抱歉，\n安黛因。\n我更希望我\n能按照自己\n的意愿死去，\n谢谢你。"
                       : '<11>{#p/basic}{~}... 抱歉，\n安黛因。\n我已经拖得\n够久了。'
                    : didf
                    ? "<11>{#p/basic}{~}说实话，\n因为你\n这种小流氓\n而失去\n我的生命\n实在不值得..."
                    : "<11>{#p/basic}{~}说实话，\n在你这种\n小流氓上\n浪费时间\n实在不值得...",
                 '<11>{#p/basic}{~}那就，\n拜拜啦~'
              ]
            : [ '<11>{#p/basic}{~}...' ]
   },
   b_opponent_undyne: {
      artifact: [ "<32>{#p/human}* （安黛因似乎甚至不知道\n  这是什么。）" ],
      epiphaNOPE: [ '<20>{#p/undyne}嗯?\n你拿了个啥玩意？' ],
      spaghetti1: [
         '<32>{#p/basic}* The smell reminds Undyne of someone close to her...',
         "<32>{#p/story}* 安黛因的攻击力下降了！"
      ],
      spaghetti2: () =>
         world.genocide
            ? [
                 "<32>{#p/basic}* The smell reminds Undyne of someone she'll never see again...",
                 '<32>{#p/basic}* ... but her determination to eliminate you strengthens.',
                 "<32>{#p/story}* 安黛因的攻击力提升了！\n* 安黛因的防御力下降了！"
              ]
            : [
                 "<32>{#p/basic}* The smell reminds Undyne of someone she'll never see again...",
                 "<32>{#p/story}* 安黛因的防御力下降了！"
              ],
      act_check: () =>
         world.genocide
            ? SAVE.flag.n.azzy_assist < 2
               ? [ '<32>{#p/asriel2}* Undyne.\n* Still not dead...?' ]
               : [ "<32>{#p/asriel2}* 安黛因。\n* 发什么呆？快去攻击她啊！" ]
            : helmetdyne()
            ? [ '<32>{#p/story}* 安黛因 - 攻击40 防御100\n* 皇家卫队队长。\n* 冷酷无情。' ]
            : respecc()
            ? [ '<32>{#p/story}* 安黛因 - 攻击25 防御10\n* 曾经是你的死敌，如今是你\n  无与伦比的对手！' ]
            : [ '<32>{#p/story}* 安黛因 - 攻击50 防御20\n* 永不放弃的英雄。' ],
      name: () => (world.genocide ? '* 不灭的安黛因' : '* 安黛因'),
      status1: () =>
         helmetdyne()
            ? [ '<32>{#p/story}* 安黛因高耸于你之上。' ]
            : respecc()
            ? [ '<32>{#p/story}* 安黛因与你迎面相撞！' ]
            : [ '<32>{#p/story}* 安黛因来袭！' ],
      intro1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{*}{#p/undyne}准备迎战吧。' ]
            : [ '<20>{*}{#p/undyne}准备！' ],
      intro2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ "<20>{*}{#p/undyne}让我把故事讲完。" ]
            : respecc()
            ? [ '<20>{*}{#p/undyne}啊！？\n我还以为你很坚强嘞！' ]
            : [ "<20>{*}{#p/undyne}这次别想逃脱\n我的手掌心！" ],
      intro3: () =>
         respecc()
            ? [ '<20>{*}{#p/undyne}不会再有第二次\n机会了！' ]
            : [ "<20>{*}{#p/undyne}这是你最后一次\n从我这逃走！" ],
      intro4: [ '<20>{*}{#p/undyne}不要跑！！！' ],
      intro5: [ '<20>{*}{#p/undyne}给我回来，\n你这个小混球！！' ],
      earlyChallenge: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}想跟我{@fill=#f00}硬碰硬{@fill=#000}，是吗？',
                 '<20>{#e/undyne/2}成全你。'
              ]
            : respecc()
            ? [
                 "<20>{#p/undyne}{#e/undyne/17}什么！？\n我已经尽全力在跑了！",
                 '<20>{#e/undyne/17}但是...\n我... 你...',
                 "<20>{#e/undyne/17}不-不！\n我要让你看看！",
                 "<20>{#e/undyne/1}我要让你看看\n{@fill=#f00}我所拥有的一切{@fill=#000}！"
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/3}想跟我{@fill=#f00}硬碰硬{@fill=#000}，是吗？',
                 '<20>{#e/undyne/1}那就成全你！\n呋呼呼！'
              ],
      earlyChallengeStatus: [ '<32>{#p/story}* 战斗局势开始升温。' ],
      randStatus1: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因引人注目地\n  抬手指向太空。' ]
            : [ '<32>{#p/story}* 安黛因威风凛凛地\n  抬手指向太空。' ],
      randStatus2: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因优雅地旋转着她的长矛。' ]
            : [ '<32>{#p/story}* 安黛因焦急地翻弄着她的长矛。' ],
      randStatus3: () => [ '<32>{#p/story}* 安黛因对一颗小行星使用了背摔。\n* 就因为她能做到。' ],
      randStatus4: () =>
         respecc() ? [ '<32>{#p/story}* 安黛因满怀激情地跳来跳去。' ] : [ '<32>{#p/story}* 安黛因焦躁地跳来跳去。' ],
      randStatus5: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因的嘴角闪过了一抹\n  真诚的笑。' ]
            : [ '<32>{#p/story}* 安黛因的嘴角闪过了一抹\n  威胁的笑。' ],
      randStatus6: () =>
         respecc()
            ? [ '<33>{#p/story}* 安黛因满怀敬慕地看着。' ]
            : [ '<32>{#p/story}* 安黛因用手指划过她的脖子。' ],
      randStatus7: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因发出了一声战吼。' ]
            : [ '<32>{#p/story}* 安黛因握紧拳头举在胸前，\n  然后摇了摇头。' ],
      randStatus8: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因凝视着你的灵魂。' ]
            : [ '<32>{#p/story}* 安黛因巍然耸立。' ],
      randStatus9: () =>
         respecc()
            ? [ '<32>{#p/story}* 安黛因回想起了她的朋友...\n  然后又想起了你。' ]
            : [ '<32>{#p/story}* 安黛因回想起了她的朋友\n  然后以拳抢地。' ],
      randStatus10: () =>
         respecc() ? [ '<32>{#p/story}* 罗非鱼的味道扑面而来。' ] : [ '<32>{#p/story}* 寿司的味道扑面而来。' ],
      papStatus1: [ '<32>{#p/story}* 安黛因的眼角闪烁着泪光。' ],
      papStatus2: [ '<32>{#p/story}* 安黛因沉着脸，死死瞪着你。' ],
      papStatus3: [ '<32>{#p/story}* 安黛因想到了她的朋友，\n  用尽全力向地猛击。' ],
      papStatus4: [ "<32>{#p/story}* 安黛因没心情跟你胡闹。" ],
      papStatus5: [ '<32>{#p/story}* 金枪鱼沙拉的味道扑面而来。' ],
      endStatus1: [ "<32>{#p/story}* 安黛因的眼皮不由自主地跳了起来。" ],
      endStatus2: [ '<32>{#p/story}* 安黛因将长矛刺向地面。' ],
      endStatus3: [ "<32>{#p/story}* 安黛因的目光左右飘动，\n  想确认这是不是个恶作剧。" ],
      endStatus4: [ '<32>{#p/story}* 安黛因开始呼吸困难了。' ],
      endStatus5: [ '<32>{#p/story}* 烤鱼的味道扑面而来。' ],
      tutorial1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}...',
                 "<20>{#e/undyne/4}怎么？\n还想我杵在这，\n教你怎么应战吗？"
              ]
            : [
                 "<20>{#p/undyne}{#e/undyne/0}只要你还是{@fill=#00c000}绿色{@fill=#000}的\n就{@fill=#f00}别想逃跑{@fill=#000}！",
                 '<20>{#e/undyne/0}除非你学会{@fill=#f00}直面危险{@fill=#000}...',
                 "<20>{#e/undyne/1}不然在我面前\n你连一秒\n也坚持不住！"
              ],
      tutorial2: [
         '<20>{#p/undyne}{#e/undyne/0}我说的{@fill=#f00}直面危险{@fill=#000}...',
         '<20>{#e/undyne/1}是让你直面子弹！'
      ],
      tutorial3: () => [
         '<20>{#p/undyne}{#e/undyne/3}看好了。',
         '<20>{#e/undyne/3}我给了你一支长矛。',
         '<20>{#e/undyne/2}你可以用它\n  来抵挡我的攻击。',
         respecc()
            ? '<20>{#e/undyne/17}我本来就不该对你\n  和其他所有人\n  解释这些的！'
            : '<20>{#e/undyne/17}我还需要解释的\n更细吗？'
      ],
      tutorial4: [
         '<20>{#p/undyne}{#e/undyne/6}你在搞什么？',
         '<20>{#e/undyne/7}不就是脸朝上吗！！！',
         "<20>{#e/undyne/5}没那么难！！！"
      ],
      tutorial5: () =>
         respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}...',
                 '<20>{#e/undyne/2}我想要一场\n公平公正的战斗。',
                 "<20>{#e/undyne/3}我曾希望你能向我\n展示出你的实力。",
                 '<20>{#e/undyne/4}也许，如果你\n就这样打败了我...',
                 "<20>{#e/undyne/2}那确实能证明\n你有多么强大。",
                 '<20>{#e/undyne/6}但现在呢？？？',
                 "<20>{#e/undyne/5}我不管了！",
                 "<20>{#e/undyne/5}我他妈又不是\n你家保姆！",
                 '<20>{#e/undyne/17}除非你家保姆...',
                 '<20>{#e/undyne/5}也！教！这！个！'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/2}...',
                 '<20>{#e/undyne/2}我想要一场\n公平公正的战斗。',
                 '<20>{#e/undyne/3}我想给你个机会。',
                 '<20>{#e/undyne/4}也许，如果我\n就这样打败了你...',
                 "<20>{#e/undyne/2}那确实能证明\n怪物有多么强大。",
                 '<20>{#e/undyne/6}但现在呢？？？',
                 "<20>{#e/undyne/5}我不管了！",
                 "<20>{#e/undyne/5}我他妈又不是\n你家保姆！",
                 '<20>{#e/undyne/17}除非你家保姆...',
                 '<20>{#e/undyne/5}也！教！这！个！'
              ],
      turnTalkA1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? SAVE.data.n.hp < 6
               ? [
                    '<20>{#p/undyne}{#e/undyne/33}太难了？\n切。',
                    "<20>{#p/undyne}{#e/undyne/2}你该在你仍有机会\n的时候想到这个的。"
                 ]
               : SAVE.data.n.hp < 11
               ? [
                    '<20>{#p/undyne}{#e/undyne/3}不怎么好，\n但也不怎么坏。',
                    "<20>{#p/undyne}{#e/undyne/2}但帕派瑞斯肯定\n不会高兴的。"
                 ]
               : SAVE.data.n.hp < 16
               ? [
                    "<20>{#p/undyne}{#e/undyne/3}所以说，你比我想象中\n还要坚强那么一点。",
                    '<20>{#p/undyne}{#e/undyne/2}这还说得过去。'
                 ]
               : [
                    '<20>{#p/undyne}{#e/undyne/4}真厉害...',
                    "<20>{#p/undyne}{#e/undyne/2}只不过，别指望幸运女神\n能一直眷顾你。"
                 ]
            : battler.volatile[0].vars.trolled
            ? respecc()
               ? [
                    '<20>{#p/undyne}{#e/undyne/1}\x00*喘气...*\n\x00*喘气...*',
                    '<20>{#e/undyne/1}所以说，这一切都在你的\n计划之中，嗯？',
                    '<20>{#e/undyne/5}把我彻底惹火，\n然后你就可以\n尽全力对付我了？',
                    '<20>{#e/undyne/0}那么。',
                    "<20>{#e/undyne/6}是时候来场{@fill=#f00}硬碰硬{@fill=#000}的决斗了！",
                    '<20>{#e/undyne/1}呋呼呼呼！！'
                 ]
               : [
                    '<20>{#p/undyne}{#e/undyne/1}\x00*喘气...*\n\x00*喘气...*',
                    '<20>{#e/undyne/21}还不错。',
                    "<20>{#e/undyne/15}但我可没时间\n继续陪你玩儿戏。",
                    "<20>{#e/undyne/6}是时候来场{@fill=#f00}硬碰硬{@fill=#000}的决斗了！",
                    '<20>{#e/undyne/1}呋呼呼呼！！'
                 ]
            : [ '<20>{#p/undyne}{#e/undyne/1}不错嘛！\n那这个怎么样！？' ],
      turnTalkA2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}给你讲个故事吧。' ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/0}好久没碰上\n像样的战士了..." ]
            : [ "<20>{#p/undyne}{#e/undyne/0}很多年来，\n我们梦想着能有个\n圆满的结局..." ],
      turnTalkA3: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}在我小的时候，\n我努力训练，\n梦想成为一名皇家守卫...',
                 "<20>{#p/undyne}{#e/undyne/2}然而，\n事情并非一帆风顺。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/0}不过，机会就摆在眼前！" ]
            : [ '<20>{#p/undyne}{#e/undyne/0}现在，\n群星已经触手可及！' ],
      turnTalkA4: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}许多人反对我加入卫队，\n包括我的家人。' ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/1}I'll savor this moment for as long as it lasts!" ]
            : [ "<20>{#p/undyne}{#e/undyne/1}我不会任由你将它\n从我们手中夺走！" ],
      turnTalkA5: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}后来，\n在一次训练事故中，\n我瞎了左眼...',
                 '<20>{#p/undyne}{#e/undyne/2}困难重重，无依无靠。'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}嘎啊啊啊！\n热身结束！' ],
      turnTalkA6a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}重重困难将我击垮，\n每一步，都异常艰难。',
                 '<20>{#e/undyne/3}我哀嚎着，多么希望\n有人能听到我的心声。'
              ]
            : [ "<20>{#p/undyne}{#e/undyne/20}呵...\n你挺顽强的！" ],
      turnTalkA6b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}重重困难将我击垮，\n每一步，都异常艰难。',
                 '<20>{#e/undyne/3}我哀嚎着，多么希望\n有人能听到我的心声。'
              ]
            : respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/9}快啊！\n来打我吧！', "<20>{#e/undyne/7}Don't just stand there!" ]
            : [
                 '<20>{#p/undyne}{#e/undyne/6}Mercy!\nHa!',
                 "<20>{#e/undyne/5}I still can't believe you want to SPARE me!"
              ],
      turnTalkA7a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}突然，\n一个声音从远处传来。',
                 '<20>{#e/undyne/3}一个天真无邪的声音。'
              ]
            : respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/0}不是说我看扁你啦...' ]
            : [ '<20>{#p/undyne}{#e/undyne/0}可就算你能够打败我...' ],
      turnTalkA7b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}突然，\n一个声音从远处传来。',
                 '<20>{#e/undyne/3}一个天真无邪的声音。'
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/10}This isn't like you at all!" ]
            : [ '<20>{#p/undyne}{#e/undyne/3}可就算我饶恕了你...' ],
      turnTalkB1: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}我四处求援，\n却徒劳无功。',
                 '<20>{#e/undyne/3}突然，我听到一个声音\n呼唤着我的名字。'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}You know...',
                 "<20>{#p/undyne}{#e/undyne/4}Even though we haven't escaped the outpost yet..."
              ]
            : [ "<20>{#p/undyne}{#e/undyne/3}老实说，\n我这是在帮你..." ],
      turnTalkB2: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}那时，帕派瑞斯\n还只是个孩子。' ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/0}Getting to fight makes me FEEL like I'm already free!" ]
            : [ '<20>{#p/undyne}{#e/undyne/1}也从未有人类能够\n闯过艾斯戈尔这关！' ],
      turnTalkB3: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/3}遇到危险，大多数小孩\n都会马上逃跑...', '<20>{#e/undyne/4}但他不会。' ]
            : respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/4}Just like that one anime Alphys showed me...' ]
            : [ '<20>{#p/undyne}{#e/undyne/4}在这里杀了你\n反而是种仁慈...' ],
      turnTalkB4: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}他只在乎是不是\n有人正深陷危险...',
                 '<20>{#e/undyne/2}等着他-\n不，需要他出手相助。'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/1}No matter how awful being trapped out here can be...',
                 "<20>{#e/undyne/0}It won't stop us from doing what we love!"
              ]
            : [ '<20>{#p/undyne}{#e/undyne/6}所以别再顽强抵抗了！' ],
      turnTalkB5: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/4}他的天性如此。",
                 '<20>{#p/undyne}{#e/undyne/3}故事讲完了。'
              ]
            : respecc()
            ? [
                 "<20>{#p/undyne}{#e/undyne/1}... but man, you really don't know when to quit!",
                 "<20>{#e/undyne/17}How'd you manage to get this strong!?"
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}人类究竟是用\n什么鬼东西\n做出来的！？' ],
      turnTalkB6: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}即便我拥有再大的胆识，\n再多的力量...',
                 "<20>{#e/undyne/11}也无法像他那样，\n拥有纯洁无瑕的心灵。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/5}Anyone else would've GIVEN UP by now!" ]
            : [ '<20>{#p/undyne}{#e/undyne/5}要是其他人\n现在早就死了！' ],
      turnTalkB7a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}你杀死的，\n不仅是我的学生，\n我的挚友...",
                 "<20>{#e/undyne/2}更是能对极恶行径\n既往不咎，宽恕你\n一切过错的高尚之人。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/3}Then again, you've had time to train..." ]
            : [ '<20>{#p/undyne}{#e/undyne/7}你到底有没有在\n听我说话！？' ],
      turnTalkB7b: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}你杀死的，\n不仅是我的学生，\n我的挚友...",
                 "<20>{#e/undyne/2}更是能对极恶行径\n既往不咎，宽恕你\n一切过错的高尚之人。"
              ]
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/3}Huh?\nDon't tell me you're ACTUALLY giving up..." ]
            : [ "<20>{#p/undyne}{#e/undyne/8}And sparing me won't do anything!!" ],
      turnTalkB8a: () =>
         SAVE.data.n.state_starton_papyrus === 1
            ? [
                 world.trueKills > 9
                    ? '<20>{#p/undyne}{#e/undyne/11}With him and so many others gone...'
                    : '<20>{#p/undyne}{#e/undyne/11}你斩碎了他的头颅之时，\n也斩碎了仅存的仁慈。',
                 "<20>{#p/undyne}{#e/undyne/2}而我能给你的\n全部“仁慈”...",
                 '<20>{#p/undyne}{#e/undyne/1}就是让你死得痛快点！'
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
                    : '<20>{#p/undyne}{#e/undyne/11}你斩碎了他的头颅之时，\n也斩碎了仅存的仁慈。',
                 "<20>{#p/undyne}{#e/undyne/2}而我能给你的\n全部“仁慈”...",
                 '<20>{#p/undyne}{#e/undyne/1}就是让你死得痛快点！'
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
                 "<20>{#p/undyne}{#e/undyne/2}艾菲斯告诉过我，\n人类充满了决心...",
                 '<20>{#p/undyne}{#e/undyne/1}呵呵，你那点破决心，\n也就只能送你到这了。'
              ]
            : respecc()
            ? [
                 '<20>{#p/undyne}{#e/undyne/1}Still going!?',
                 '<20>{#p/undyne}{#e/undyne/17}哈...\n艾菲斯告诉过我\n人类非常有决心...'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/1}艾菲斯告诉过我\n人类非常有决心...',
                 '<20>{#p/undyne}{#e/undyne/1}我现在算是明白\n她的意思了！'
              ],
      turnTalkC3: () =>
         SAVE.data.n.state_starton_papyrus === 1 || respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/1}但是，你知道吗？', "<20>{#e/undyne/1}我也充满了决心！" ]
            : [ "<20>{#p/undyne}{#e/undyne/1}但是我也\n充满了决心！" ],
      turnTalkC4: () =>
         respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/5}Determined to show you who's BOSS!" ]
            : [ '<20>{#p/undyne}{#e/undyne/6}此时此地，\n干掉你的决心！' ],
      turnTalkC5: () =>
         respecc() ? [ "<20>{#p/undyne}{#e/undyne/9}... WHO'S BOSS!" ] : [ '<20>{#p/undyne}{#e/undyne/7}...干掉你！' ],
      turnTalkC6: () =>
         respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/10}... WHO'S...\n...\n... BOSS!!" ]
            : [ '<20>{#p/undyne}{#e/undyne/9}...干掉...\n你...' ],
      turnTalkC7: [ '<20>{#p/undyne}{#e/undyne/10}呼...\n呼...' ],
      turnTalkC8: () =>
         respecc()
            ? [ '<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nFINAL ATTACK!!!' ]
            : [ '<20>{#p/undyne}{#e/undyne/5}嘎啊啊啊啊！！！\n你个小屁孩，\n快给我去死啊！' ],
      turnTalkC9a: [ "<20>{#p/undyne}{#e/undyne/5}真碍事！" ],
      turnTalkC9b: [ '<20>{#p/undyne}{#e/undyne/5}I WILL NEVER TAKE MERCY FROM THE LIKES OF YOU!' ],
      turnTalkC10a: [ '<20>{#p/undyne}{#e/undyne/6}别想打败我！' ],
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
                 '<21>我还以为...\n你很特别...',
                 '<20>结果...\n你到底还是...\n咳...咳...',
                 '<20>...'
              ]
            : [
                 '<20>{#p/undyne}嘎啊...',
                 '<20>我没想到...\n你... 居然这么强...',
                 '<20>看来...\n这里...\n...就是我的葬身之地...',
                 '<20>...'
              ],
      death2: () =>
         helmetdyneAttack() ? [ '<20>{#p/undyne}{#e/undyne/31}...' ] : [ '<20>{#p/undyne}{#e/undyne/31}不...' ],
      death3: () =>
         helmetdyneAttack()
            ? [ '<20>{#p/undyne}{#e/undyne/46}...不。', '<20>{#e/undyne/43}还没完呢。' ]
            : [
                 '<20>{#p/undyne}{#e/undyne/32}不！',
                 "<20>我不能死！",
                 ...(respecc()
                    ? [ '<20>你背叛了我...\n这... 太耻辱了...', "<20>我怎能不让你吃点苦头！" ]
                    : [
                         SAVE.data.n.state_starton_papyrus === 1
                            ? '<20>{#e/undyne/36}艾菲斯...\n艾斯戈尔...'
                            : '<20>{#e/undyne/36}艾菲斯...\n艾斯戈尔...\n帕派瑞斯...',
                         '<20>{#e/undyne/32}大家，都需要我来守护！'
                      ]),
                 '<20>{#e/undyne/32}嘎啊啊啊！！'
              ],
      death4: () =>
         helmetdyneAttack()
            ? [ "<20>{#e/undyne/45}不把你杀了\n我绝不罢休。" ]
            : [
                 '<20>{#p/undyne}{#e/undyne/32}人类！',
                 respecc()
                    ? '<20>{#e/undyne/36}以公平对决起誓...'
                    : "<20>{#e/undyne/36}以希望与梦想起誓...",
                 '<20>{#e/undyne/32}我定会击败你！'
              ],
      determination1: () =>
         helmetdyneAttack() ? [] : [ "<20>{#p/undyne}{#e/undyne/32}来啊，\n你就这点能耐吗？" ],
      determination2: () => (helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/32}...真是可悲。' ]),
      determination3: () =>
         helmetdyneAttack() ? [] : [ "<20>{#p/undyne}{#e/undyne/32}就你那点力气，\n还想打败我？" ],
      determination4: () =>
         helmetdyneAttack()
            ? []
            : respecc()
            ? [ "<20>{#p/undyne}{#e/undyne/34}你-你的斗志\n跑哪去了？" ]
            : [ '<20>{#p/undyne}{#e/undyne/34}当我们相信自己时，\n爆发出的力量有多强，\n你见-见识到了吧？' ],
      determination5: () =>
         helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/35}呵... \n呵呵...', '<20>{#e/undyne/34}闹够了没有？' ],
      determination6: () => (helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/34}...' ]),
      determination7: () =>
         helmetdyneAttack() ? [] : [ "<20>{#p/undyne}{#e/undyne/35}...我不能...\n...\n放弃..." ],
      determination8: () => (helmetdyneAttack() ? [] : [ '<20>{#p/undyne}{#e/undyne/34}...' ]),
      death5: () => [
         helmetdyneAttack() ? '<20>{#p/undyne}{#e/undyne/43}...' : '<20>{#p/undyne}{#e/undyne/34}...',
         '<20>{#p/undyne}{#e/undyne/47}哈...\n哈...',
         '<20>{#e/undyne/44}...\n艾菲斯...',
         '<20>知道为什么\n我一直没对你说...',
         '<20>{#e/undyne/49}因为我怕...',
         '<20>...'
      ],
      death6: () => [
         '<20>{#p/undyne}{#e/undyne/44}不...\n不！',
         '<20>{#e/undyne/34}还没完！',
         "<20>{#e/undyne/48}我不能死！"
      ],
      death7: [ '<20>{*}{#p/undyne}{#i/8}{@random=1.1/1.1}嘎啊啊啊啊！！！{^10}{%}' ],
      death8a: [ "<20>{*}{#p/undyne}{#i/5}{#v/1}{@random=1.1/1.1}我不会死！{^15}{%}" ],
      death8b: [ "<20>{*}{#p/undyne}{#i/5}{#v/2}{@random=1.1/1.1}我不会死！{^15}{%}" ],
      death8c: [ "<20>{*}{#p/undyne}{#i/6}{#v/3}{@random=1.1/1.1}我不会死！{^15}{%}" ],
      death9: [ "<20>{*}{#p/undyne}{#i/8}{#v/4}{@random=1.1/1.1}我{^10}不{^10}会{^30}{%}" ],
      deterStatus1: [ '<32>{#p/story}* 安黛因笑着，强装自己没事。' ],
      deterStatus2: [ "<32>{#p/story}* 安黛因的身体正一点一点融化。" ],
      deterStatus3: [ "<32>{#p/story}* 安黛因的身体已经化得\n  看不出形状了。" ],
      deterStatus4: [ '<32>{#p/story}* 安黛因深吸了一口气。' ],
      deterStatus5: [ '<32>{#p/story}* 安黛因挑衅地屹立着。' ],
      challengeText1: [ "<32>{#p/human}* （你告诉安黛因她的攻击\n  太弱了。）\n* （她没理你。）" ],
      challengeText2: [
         '<32>{#p/human}* （你告诉安黛因她的攻击\n  太弱了。）',
         '<32>{#p/basic}* 子弹速度变得更快了。'
      ],
      challengeText3: [
         '<32>{#p/human}* （你告诉安黛因她的攻击\n  太弱了。）',
         '<32>{#p/basic}* 子弹速度快得过于荒谬了。'
      ],
      challengeText4: [ '<32>{#p/human}* （你告诉安黛因，\n  你想来一场真正的对决。）' ],
      challengeText5: [
         '<32>{#p/human}* （你告诉安黛因她的攻击\n  太弱了。）',
         "<32>{#p/basic}* 但安黛因已经快到\n  不能再快了。"
      ],
      challengeText7: [ "<32>{#p/human}* （你告诉安黛因她的攻击\n  太弱了。）\n* （她没在意。）" ],
      pleadText1: [ "<32>{#p/human}* （你告诉安黛因你不想再\n  战斗了。）\n* （无事发生。）" ],
      pleadText2: [
         '<32>{#p/human}* （你告诉安黛因你只是想\n  交朋友。）',
         '<32>{#p/basic}* 这让她想起了某个人。\n* 她的攻击变得弱了一点。'
      ],
      pleadText3: [ "<32>{#p/human}* （你告诉安黛因你只是想\n  交朋友。）\n* （但她并不信任你。）" ],
      pleadText4: [ "<32>{#p/human}* （你告诉安黛因你不想再\n  战斗了。）\n* （她不禁笑了笑。）" ],
      pleadText5: [ "<32>{#p/human}* （你告诉安黛因你不想再\n  战斗了。）\n* （看起来她很是困惑。）" ],
      pleadText6: [ "<32>{#p/human}* （你告诉安黛因你不想再\n  战斗了。）\n* （她没在意。）" ],
      pleadText7a: [
         '<32>{#p/human}* （你告诉安黛因你只是想\n  交朋友。）',
         '<32>{#p/basic}* 安黛因深表赞许。\n* 她的攻击变得更强了一点。'
      ],
      pleadText7b: [
         '<32>{#p/human}* （你告诉安黛因你只是想\n  交朋友。）',
         "<32>{#p/basic}* 安黛因深表赞许。\n* 但是子弹速度已经\n  快到不能再快了。"
      ],
      pleadText7c: [
         '<32>{#p/human}* （你告诉安黛因你只是想\n  交朋友。）',
         '<32>{#p/basic}* 安黛因深表赞许。\n* 子弹速度已经快到\n  近乎失控了。'
      ],
      pleadText8: [ "<32>{#p/human}* （你告诉安黛因你不想再\n  战斗了。）\n* 她冷冰冰地瞪了你一眼。" ],
      genoCutscene1: [ '<08>{#p/kidding}{#e/kidd/0}...', '<08>{#e/kidd/1}呃... 啊？', '<08>{|}{#e/kidd/1}怎么- {%}' ],
      genoCutscene2: [ '<08>{#p/kidding}{#e/kidd/3}安黛因！！！', '<08>{#e/kidd/4}我...！' ],
      genoCutscene3: [ '<20>{#p/undyne}{#e/undyne/1}小子...？' ],
      genoCutscene3x: [
         '<20>{#p/undyne}{#e/undyne/4}嘿，别担心，小子...',
         "<20>{#e/kidd/7}我没事。",
         '<20>{#p/undyne}现在快逃，好吗？'
      ],
      genoCutscene4: [
         "<08>{#p/kidding}{#e/kidd/5}我控制不了\n自己...",
         '<08>{#e/kidd/6}他们... 他...',
         '<08>{#e/kidd/7}他对\n我的身体\n动了手脚...'
      ],
      genoCutscene5: [ '<20>{#p/undyne}{#e/undyne/2}所以，你的眼睛...' ],
      genoCutscene6: [ '<08>{#p/kidding}{#e/kidd/6}我...', '<08>{#p/kidding}{#e/kidd/6}我...' ],
      genoCutscene7: [ '<08>{#p/kidding}{#e/kidd/7}我伤害了\n你...' ],
      genoCutscene8: [ "<20>{#p/undyne}{#e/undyne/3}就是点小伤而已..." ],
      genoCutscene9: [
         "<20>{#e/undyne/4}这里交给我，\n我会好好收拾这些坏蛋。",
         "<20>你不用再当\n他们的傀儡了。",
         '<20>现在快逃，好吗？'
      ],
      genoCutscene10: [ '<08>{#e/kidd/8}{#p/kidding}...' ],
      genoCutscene11: [ '<20>{#p/undyne}{#e/undyne/5}艾菲斯博士\n会照顾好你的。', '<20>{#e/undyne/6}快跑啊！' ],
      genoCutscene12a: [
         '<20>{#p/undyne}{#e/undyne/7}...呵...\n“就是点小伤而已...”',
'<20>...才怪。',
         '<20>不知怎么，\n只是那么一下...'
      ],
      genoCutscene12b: [ "<20>我就...", '<20>就...' ],
      genoCutscene12c: [ '<20>该...\n该死...', '<20>帕派瑞斯...\n艾斯戈尔...\n艾菲斯...' ],
      genoCutscene12d: [ '<20>对不起...', "<20>{#e/undyne/8}让你们失望了。" ],
      genoCutscene12e: [ '<20>我...', "{#e/undyne/8}我没法..." ],
      genoCutscene13: [ '<20>{#p/undyne}...', '<11>{#e/undyne/12}不...' ],
      genoCutscene14: [
         "<20>{*}{#p/undyne}{#e/undyne/11}我的身体...\n已经要四分五裂。{^15}{%15}",
         "<20>{*}好像随时...\n都会化作灰烬。{^15}{%15}",
         '<20>{*}但灵魂深处...{^15}{%15}',
         "<20>{*}燃起了一股\n无法描述的感觉。{^15}{%15}",
         "<20>{*}{#e/undyne/12}那燃起的炙热\n不允许我死去。{^15}{%15}",
         "<20>{*}{#e/undyne/11}那么多人民...\n那么多挚友...\n都惨死于暴行之下。{^15}{%15}",
         "<20>{*}过了我这关，\n你们将会毁灭一切...{^15}{%15}",
         "<20>{*}大家的希望，\n大家的梦想，\n顷刻间都会化为乌有。{^15}{%15}",
         "<20>{*}{#e/undyne/12}所以，我绝不会\n让你们如愿以偿。{^15}{%15}",
         '<20>{*}{#e/undyne/13}此时此刻，\n我能感受到...{^15}{%15}',
         '<20>{*}这星河里的每个人，\n大家心连心，同仇敌忾。{^15}{%15}',
         '<20>{*}因为，我们都有一个\n共同的目标：{^15}{%15}',
         '<20>{*}{#e/undyne/14}那就是战胜你。{^15}{%15}',
         '<20>{*}{#e/undyne/13}人类。艾斯利尔。\n...不，不管你们是谁。{^15}{%15}',
         '<20>{*}{#e/undyne/14}为了让这星河存续下去...{^15}{%15}',
         '<20>{*}{#e/undyne/15}{@random=1.1/1.1}我，安黛因，\n会将你彻底击垮！{^15}{%15}'
      ],
      genoCutscene14x: [
         '<20>{#e/undyne/11}不...',
         '<20>{#e/undyne/12}还没完...！',
         '<20>{#e/undyne/13}大家，\n都需要我来守护！',
         "<20>{#e/undyne/14}我绝不能让他们失望！"
      ],
      genoCutscene15: [ "<20>{*}{#p/undyne}{#v/1}你们还得再加把劲。{%20}" ],
      genoCutscene15x: [ "<20>{#p/undyne}{#v/1}你们还得再加把劲！{%20}" ],
      genoDeath1: [
         '<20>{#p/undyne}{#v/1}该死...',
         "<20>到头来...\n连这样的力量...\n也还是不够吗...？",
         '<20>...',
         '<20>{#e/undyne/25}呵...',
         '<20>呵呵呵...'
      ],
      genoDeath2: [
         '<20>{*}{#e/undyne/26}如果你...{^60}{%}',
         "<20>{*}如果你以为\n我会放弃希望，\n那就错了。{^60}{%}",
         "<20>{*}{#e/undyne/27}因为...\n我有朋友。{^60}{%}",
         '<20>{*}{#e/undyne/28}艾菲斯告诉我，\n如果我失败了，\n就会启用备用计划...{^60}{%}',
         "<20>{*}{#e/undyne/29}现在，\n她已经去通知艾斯戈尔，\n吸收那6个人类灵魂。{^60}{%}"
      ],
      genoDeath3: [ '<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}有了那种力量...{^60}{%}' ],
      genoDeath4: [ '<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}世界...\n势必会...\n存续下去...！{^60}{%}' ],
      lowStatus1: [ '<32>{#p/story}* 星光闪烁...' ],
      lowStatus2: [ '<32>{#p/story}* 安黛因焦急地翻弄着她的长矛。' ],
      lowStatus3: [ '<32>{#p/story}* 星尘在你面前漂浮闪烁。' ],
      lowStatus4: [ '<32>{#p/story}* 蒸汽在你周围回旋着。' ],
      lowStatus5: [ '<32>{#p/story}* 有一瞬，长矛的攻势停了下来。' ],
      genoStatus1: [ '<32>{#p/asriel2}* 怎么会...' ],
      genoStatus2: [ '<32>{#p/asriel2}* 不...' ],
      genoStatus3: [ '<32>{#p/asriel2}* 经历那么多条时间线，\n  她也没...' ],
      genoStatus4: [ "<32>{#p/asriel2}* $(name)，光靠你自己\n  是不够的。" ],
      genoStatus5: [ '<32>{#p/asriel2}* ...' ],
      trueGenoStatusX: (assistValue: number) =>
         assistValue < 2
            ? [ "<32>{#p/asriel2}* 看她还有什么本事。" ]
            : [ '<32>{#p/asriel2}* 按计划行事。' ],
      trueGenoStatus1: [ '<32>{#p/asriel2}* 别走神。' ],
      trueGenoStatus2: [ "<32>{#p/asriel2}* 别让她得逞。" ],
      trueGenoStatus3: [ '<32>{#p/asriel2}* 继续攻击...' ],
      trueGenoStatus4: [ "<32>{#p/asriel2}* 她迟早会完蛋。" ],
      trueGenoStatus5: [ '<32>{#p/asriel2}* 胜利终将属于我们。' ],
      trueGenoStatusLow1: [ '<32>{#p/asriel2}* 她快死了...！' ],
      trueGenoStatusLow2: [ '<32>{#p/asriel2}* 加把劲！' ],
      asrielExplain: () => [
         ...(battler.volatile[0].vars.azzyAssist < 2
            ? [ "<20>{#p/asriel2}{#f/4}$(name)，\n你的攻击伤不到她。" ]
            : [
                 "<20>{#p/asriel2}{#f/8}$(name)，你还记得\n上次发生的事情吧？",
                 "<20>{#f/4}你那么攻击她，\n但都无济于事。",
                 '<20>{#f/3}趁刚才那段时间\n我好好想了想。'
              ]),
         "<20>{#f/13}虽说...\n我还不太能驾驭\n这副身体的力量。",
         '<20>{#f/16}但这些力量\n足够帮你了。',
         "<20>{#f/3}接下来，你先进攻，\n我则会用法术找出\n安黛因盔甲的弱点。",
         "<20>{#f/4}你要瞄准它们，\n逐一突破，不能出错。",
         '<20>{#f/3}一起加油吧...'
      ],
      neutralFinalStatus: [ '<32>{#p/story}* 安黛因充满了决心。' ]
   },
   b_opponent_dateundyne: {
      name: '* 安黛因',
      snacker: () =>
         SAVE.data.b.undyne_respecc
            ? [ '<20>{#p/undyne}{#e/undyne/13}希望你能喜欢，\n呋呼呼！' ]
            : [ '<20>{#p/undyne}{#e/undyne/12}趁你还能享受的时候\n尽情享受吧。' ],
      intro: () =>
         SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#p/undyne}{#f/0}...终于啊。',
                 '<20>决战到来了。',
                 '<20>...',
                 '<20>{#e/undyne/12}针尖对麦芒，',
                 '<20>轰动星河的决战到来了。',
                 '<20>我在此对你发出挑战...',
                 '<20>{#e/undyne/9}以全前哨站\n怪物的荣耀起誓！！',
                 "<20>{#e/undyne/7}IT'S THE ONLY WAY I CAN SETTLE THE SCORE BETWEEN US!!",
                 "<20>{#e/undyne/9}拿出真本事，放马过来！！！\n嘎啊啊啊！！！"
              ]
            : [
                 "<20>{#p/undyne}{#f/0}我被打败了，\n我的房子也\n完了...",
                 '<20>甚至连和你\n交朋友都做不好。',
                 '<20>...',
                 "<20>{#e/undyne/12}就这样了。",
                 "<20>我不在乎\n你是不是\n我的客人了。",
                 '<20>{#e/undyne/9}最后比一场，\n双方都要拿出\n所有力量！！！',
                 "<20>{#e/undyne/7}这是我唯一能够\n夺回我尊严的\n办法！！！",
                 "<20>{#e/undyne/9}那就来吧！\n全力地攻上来！！！\n嘎啊啊！！！"
              ],
      status1: [ '<32>{#p/story}* 安黛因让你先出招。' ],
      act_check: [ '<32>{#p/story}* 安黛因 - 攻击41 防御21\n* 千真万确的最终决战\n  终于开始了！' ],
      idleTalk1: [ "<20>{#p/undyne}{#e/undyne/9}让我看看\n你的实力吧！" ],
      idleTalk2: [ '<20>{#p/undyne}{#e/undyne/9}快啊！' ],
      idleTalk3: [ "<20>{#p/undyne}{#e/undyne/9}怎么，\n你怕了吗？" ],
      idleTalk4: [ "<20>{#p/undyne}{#e/undyne/9}你在等什么？" ],
      fightTalk: (stronk: boolean) =>
         SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#p/undyne}{#e/undyne/19}哎呀。',
                 '<20>{#e/undyne/19}还真有点疼。',
                 '<20>{#e/undyne/4}呵...',
                 "<20>{#e/undyne/3}我想这就是\n我低估对手的\n下场吧。",
                 "<20>{#e/undyne/0}不过，我不知道\n我为什么\n这么惊讶。",
                 '<20>{#e/undyne/1}因为你战斗的\n风格。'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/16}啥。',
                 "<20>{#e/undyne/15}这就是你的\n全力...？",
                 ...(SAVE.data.b.oops
                    ? [
                         '<20>{#e/undyne/3}即使你使出了\n全力...',
                         stronk
                            ? "<20>{#e/undyne/33}你也只能\n让我受点擦伤，\n哈？"
                            : "<20>{#e/undyne/33}你还是无法\n狠下心来\n伤害我，哈？"
                      ]
                    : [ "<20>{#e/undyne/17}你的攻击\n甚至都没\n打中我！", '<20>{#e/undyne/17}...' ])
              ],
      flirtTalk0: [
         '<20>{#p/undyne}{#e/undyne/12}当我让你\n打我的时候...',
         '<20>{#e/undyne/9}我是认真的！'
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
      flirtStatus0: [ '<33>{#p/story}* 在这种情况下，\n  战斗可能不是个坏主意。' ],
      flirtStatus1: [ '<33>{#p/story}* Something magical is happening.' ],
      flirtStatus2: [ '<32>{#p/story}* Undyne is at her limit.' ],
      flirtText0: [ '<32>{#p/human}* （你向安黛因调情。）' ],
      flirtText1: [ "<32>{#p/human}* (You tell Undyne she's got your heart hook, line, and sinker.)" ],
      flirtText2: [ "<32>{#p/human}* (You commend Undyne on her brave, fighting spirit.)\n* (She's YOUR hero, now.)" ],
      flirtText3: [ "<32>{#p/human}* (You tell Undyne she's a precious, adorable little urchin.)" ],
      cutscene1: [ '<20>{#p/undyne}{#e/undyne/4}呵...\n你知道吗？' ],
      cutscene2: (fought: boolean) => [
         ...(SAVE.data.b.undyne_respecc
            ? [
                 "<20>{#e/undyne/11}我其实不想\n伤害你。",
                 '<20>{#e/undyne/11}一开始，\n想到要和你\n较量，我很\n兴奋...'
              ]
            : [
                 "<20>{#e/undyne/11}我其实也不想\n伤害你。",
                 '<20>{#e/undyne/11}一开始，\n我讨厌你那\n矫情的演戏，\n不过...'
              ]),
         ...(fought
            ? SAVE.data.b.undyne_respecc
               ? [ '<20>{#e/undyne/3}但看到你现在\n跟我相处的\n方式，那...' ]
               : SAVE.data.b.oops
               ? [ '<20>{#e/undyne/3}你刚才打我的\n那种方式，\n那...' ]
               : [ '<20>{#e/undyne/3}你刚才没打中\n我的那种方式，\n它...' ]
            : SAVE.data.b.undyne_respecc
            ? [ '<20>{#e/undyne/3}但看到你现在\n对我的这种\n方式，那...' ]
            : [ '<20>{#e/undyne/3}你刚才对我的\n那种方式，\n那...' ]),
         '<20>{#e/undyne/4}让我想起了一个\n以前跟我训练的\n家伙。',
         ...(SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#e/undyne/11}...你可能\n不像他那样是个\n软弱的废柴。',
                 '<20>{#e/undyne/11}但你们有一个\n共同点...',
                 '<20>{#e/undyne/1}就是对\n战斗的意义的\n尊重。'
              ]
            : [
                 "<20>{#e/undyne/11}现在我知道了\n你不只是个\n软弱的废柴。",
                 "<20>{#e/undyne/13}你虽然是个\n软弱的废柴，\n但是心胸\n宽广！",
                 '<20>{#e/undyne/4}跟他一样...'
              ]),
         '<20>{#e/undyne/3}...',
         '<20>{#e/undyne/3}听好了，人类。',
         '<20>{#f/undyne/0}看来你和\n艾斯戈尔\n命中注定\n难逃一战。',
         SAVE.data.b.undyne_respecc ? '<20>{#e/undyne/3}不像你...' : '<20>{#e/undyne/3}以我对\n他的了解...',
         "<20>{#e/undyne/4}他大概\n并不想和你\n战斗。",
         ...(SAVE.data.b.undyne_respecc
            ? [
                 '<20>{#e/undyne/0}如果可以，\n跟他聊聊。',
                 '<20>{#e/undyne/0}先告诉他你\n想要干什么。',
                 '<20>{#e/undyne/3}我知道这\n对你来说可能\n有点奇怪，\n但是...',
                 "<20>{#e/undyne/4}相信你肯定\n能说服他让你\n回家的。",
                 '<20>{#e/undyne/0}至于我们的\n自由？',
                 '<20>{#e/undyne/1}唉。',
                 '<20>{#e/undyne/3}如果有其他\n不受尊敬的人类\n坠落下来...',
                 "<20>{#e/undyne/3}我再夺取\n他的灵魂就\n好了。"
              ]
            : [
                 '<20>{#f/undyne/0}跟他聊聊。',
                 "<20>{#f/undyne/1}相信你肯定\n能说服他让你\n回家的。",
                 '<20>{#e/undyne/3}不管多久，\n总会有坏人类\n坠落下来。',
                 "<20>{#e/undyne/3}到时候我再\n夺取他的\n灵魂。"
              ]),
         '<20>{#f/undyne/1}有道理，\n对吧？\n呋呼呼。',
         '<20>{#f/undyne/0}哦对了，\n如果你真的\n伤害了艾斯戈尔...',
         "<20>{#e/undyne/11}我会亲自带上\n那些人类灵魂...\n穿过力场...",
         ...(SAVE.data.b.undyne_respecc
            ? [ '<20>{#e/undyne/8}跟你来一场\n真正的战斗！', "<20>{#e/undyne/13}这就是战士\n该做的，\n对吧？" ]
            : [
                 '<20>{#e/undyne/8}把你揍得\n万劫不复！',
                 "<20>{#e/undyne/13}这就是\n朋友嘛，对吧？"
              ]),
         '<20>{#e/undyne/13}呋呼呼！',
         "<20>{#e/undyne/13}现在，咱们赶紧\n从这个着火的\n屋子里出去！"
      ]
   },

   i_artifact: {
      battle: {
         description: '据说这个吊坠是艾罗戈\n本人佩戴过的。',
         name: '神器'
      },
      drop: () => [
         '<32>{#p/human}* （你把神器扔掉了。）',
         ...(!SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

            ? SAVE.data.b.s_state_papsink
               ? [ '<32>{#p/basic}* 狗子跳得更起劲了！' ]
               : [ "<32>{#p/basic}* ...不知为何，\n  狗子不再叹气了，" ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (Inscribed with the signature of a former world leader.)' ]
            : [ '<32>{#p/basic}* 据说这个吊坠\n  是艾罗戈本人佩戴过的。' ],
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
               ? [ "<32>{#p/basic}* ...不知为何，\n  狗子跳得没那么起劲了。" ]
               : [ '<32>{#p/basic}* 狗子的叹气更响了！' ]
            : [ '<32>{#p/human}* （什么都没发生。）' ])
      ]
   },
   i_epiphany: {
      battle: {
         description: '意志薄弱之人\n将成为你的傀儡。',
         name: '顿悟'
      },
      drop: [ '<32>{#p/human}* （你奋力把卷轴《顿悟》丢了出去。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (A tome from centuries past, used first by a former world leader.)' ]
            : [
                 '<33>{#p/basic}* 意志薄弱之人\n  将成为你的傀儡。\n* 仅在战斗中有效。'
              ],
      name: '顿悟',
      use: () =>
         battler.active
            ? []
            : SAVE.data.b.ufokinwotm8
            ? [
                 '<32>{#p/human}* （你展开了卷轴《顿悟》，\n  试图让自己感受到拥抱。）',
                 '<32>{#p/human}* （无济于事。）'
              ]
            : SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* （你仔细阅读着\n  卷轴上的古老咒文。）',
                 '<33>* (The text appears to be self- translating.)'
              ]
            : [ '<32>{#p/human}* （你展开了卷轴《顿悟》。）', '<32>{#p/human}* （无事发生。）' ]
   },
   i_astrofood: {
      battle: {
         description: '牙口不好的别吃。',
         name: '甘草糖'
      },
      drop: [ '<32>{#p/human}* （你把甘草糖扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （24 HP。）' ]
            : [ '<32>{#p/basic}* “甘草糖” 回复24 HP\n* 牙口不好的别吃。' ],
      name: '甘草糖',
      use: [ '<32>{#p/human}* （你咬了甘草糖。）' ]
   },
   i_sap: {
      battle: {
         description: "源自怪物故园里的一棵树。",
         name: '树胶'
      },
      drop: [ '<32>{#p/human}* （你把树胶扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （35 HP。）' ]
            : [ '<32>{#p/basic}* “树胶” 回复35 HP\n* 源自怪物故园里的一棵树。' ],
      name: '树胶',
      use: [ '<32>{#p/human}* （你嚼了一块树胶。）' ]
   },
   i_goggles: {
      battle: {
         description: '超越现实！\n能为你提供更长的喘息时间。',
         name: 'AR眼镜'
      },
      drop: [ '<32>{#p/human}* （你把AR眼镜扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （6防御。）' ]
            : [ '<32>{#p/basic}* “AR眼镜” （6防御）\n* 超越现实！\n  能为你提供更长的喘息时间。' ],
      name: 'AR眼镜',
      use: [ '<32>{#p/human}* （你戴上了AR眼镜。）' ]
   },
   i_goggles_x: {
      battle: {
         description: '能为你提供稍长的喘息时间。',
         name: 'AR眼镜？'
      },
      drop: [ '<32>{#p/human}* （你把AR眼镜扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （4防御。）' ]
            : [ '<32>{#p/basic}* “AR眼镜？” （4防御）\n* 超越现实！\n  能为你提供稍长的喘息时间。' ],
      name: 'AR眼镜？',
      use: [ '<32>{#p/human}* （你戴上了AR眼镜。）' ]
   },
   i_padd: {
      battle: {
         description: '一个电子记事本。\n能为你提供更长的喘息时间。',
         name: '平板电脑'
      },
      drop: [ '<32>{#p/human}* （你把平板电脑扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （2攻击。）' ]
            : [ '<32>{#p/basic}* “平板电脑” （2攻击）\n* 一个电子记事本。\n* 能为你提供更长的喘息时间。' ],
      name: '平板电脑',
      use: [ '<32>{#p/human}* （你打开了平板电脑。）' ]
   },
   i_padd_x: {
      battle: {
         description: '能为你提供稍长的喘息时间。',
         name: '平板电脑？'
      },
      drop: [ '<32>{#p/human}* （你把平板电脑扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （0攻击。）' ]
            : [ '<32>{#p/basic}* “平板电脑” （0攻击）\n* 只能让你多喘口气。' ],
      name: '平板电脑？',
      use: [ '<32>{#p/human}* （你打开了平板电脑。）' ]
   },
   i_punchcard: {
      battle: {
         description: '风景如画...',
         name: '明信片'
      },
      drop: [ '<32>{#p/human}* （你把明信片扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (A perfectly ordinary piece of paper, with no notable attributes.)' ]
            : [ '<32>{#p/basic}* 风景如画...' ],
      name: '明信片',
      use: () =>
         world.meanie
            ? [
                 '<32>{#p/human}* （你撕碎了明信片。）',
                 battler.active
                    ? `<32>{#p/story}* 你的攻击力提升了${2 + battler.at_bonus}点！`
                    : '<32>{#p/human}* （无事发生。）'
              ]
            : battler.active
            ? [ '<32>{#p/human}* （你在脑海里幻想着\n  明信片上面的美景。）\n* （什么都没发生。）' ]
            : []
   },
   i_quiche: {
      battle: {
         description: '甜蜜的零食背后，\n是一份甜蜜的责任。',
         name: '芝士蛋糕'
      },
      drop: () => [
         '<32>{#p/human}* （你把芝士蛋糕扔掉了。）',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : [ '<32>{#p/basic}* 短暂获得主人后，\n  它又被遗弃了。' ]),
         ...(!battler.active &&
         (fetchCharacters()
            .find(c => c.key === 'sans') // NO-TRANSLATE

            ?.position.extentOf(player) ?? 200) < 200
            ? [
                 "<25>{#p/sans}{#f/3}* ...哎呀。\n* 真是遗憾。",
                 "<25>{#p/sans}{#f/2}* 我还希望有人能替我\n  照看它呢。"
              ]
            : [])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （45 HP。）' ]
            : [ '<32>{#p/basic}* “芝士蛋糕” 回复45 HP\n* 甜蜜的零食背后，\n  是一份甜蜜的责任。' ],
      name: '芝士蛋糕',
      use: () => [
         '<32>{#p/human}* （你吃掉了芝士蛋糕。）',
         ...(!battler.active &&
         (fetchCharacters()
            .find(c => c.key === 'sans') // NO-TRANSLATE

            ?.position.extentOf(player) ?? 200) < 200
            ? [
                 '<25>{#p/sans}{#f/0}* ...哦？\n* 你真把它吃掉了？',
                 '<25>{#p/sans}{#f/2}* 没想到居然有人会\n  认可我的厨艺。'
              ]
            : [])
      ]
   },
   i_crisp: {
      battle: {
         description: '一包来自星河彼端的薯片。',
         name: '薯片'
      },
      drop: [ '<32>{#p/human}* （你把太空薯片扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （18 HP。）' ]
            : [ '<32>{#p/basic}* “太空薯片” 回复18 HP\n* 一包来自星河彼端的薯片。' ],
      name: '太空薯片',
      use: [ '<32>{#p/human}* （你吃掉了太空薯片。）' ]
   },
   i_rations: {
      battle: {
         description: '皇家出品，救急精品。',
         name: '口粮'
      },
      drop: [ '<32>{#p/human}* （你把口粮扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （30 HP。）' ]
            : [ '<32>{#p/basic}* “口粮” 回复30 HP\n* 皇家出品，救急精品。' ],
      name: '口粮',
      use: [ '<32>{#p/human}* （你吃掉了口粮。）' ]
   },
   i_tea: {
      battle: {
         description: '让你在战斗中移动得更快。',
         name: '星云茶'
      },
      drop: [ '<32>{#p/human}* （你把星云茶扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （15 HP。）' ]
            : [
                 '<33>{#p/basic}* “星云茶” 回复15 HP\n* 让你在战斗中移动得更快。\n* 仅在战斗中有效。'
              ],
      name: '星云茶',
      use: () => [
         '<32>{#p/human}* （你将星云茶一饮而尽。）',
         battler.active ? '<32>{#p/story}* 你的移速提升了1点！' : '<32>{#p/human}* （无事发生。）'
      ]
   },
   i_tzn: {
      battle: {
         description: '很像地球上的豆腐，\n只是更加空灵。',
         name: '太空豆腐'
      },
      drop: [ '<32>{#p/human}* （你把太空豆腐扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （17 HP。）' ]
            : [ '<32>{#p/basic}* “太空豆腐” 回复17 HP\n* 很像地球上的豆腐，\n  只是更加空灵。' ],
      name: '太空豆腐',
      use: () => [
         '<32>{#p/human}* （你吞下了太空豆腐。）',
         ...(world.meanie
            ? [
                 '<32>* （那味道让你有种特别的感觉...）',
                 battler.active
                    ? `<32>{#p/story}* 你的攻击力提升了${4 + battler.at_bonus}点！`
                    : '<32>{#p/human}* （无事发生。）'
              ]
            : [])
      ]
   },
   i_flakes: {
      battle: {
         description: '*终于，一顿像样的早餐。',
         name: '提米薄片'
      },
      drop: [ '<32>{#p/human}* （你扔掉了提米薄片。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （2 HP。）' ]
            : [ '<32>{#p/basic}* “提米薄片”回复2 HP\n* 终于，一顿像样的早餐。' ],
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
            ? [ '<32>{#p/human}* （10攻击，20防御。）' ]
            : [
                 '<32>{#p/basic}* “提米盔甲”（10攻击，20防御）\n* 大学教育下能做出来的东西！',
                 '<32>* 能为你提供大量的喘息时间...',
                 '<32>* 每回合受伤后回复大量HP...',
                 "<32>* 受到弹幕攻击时，\n  一定概率转变为回血效果...",
                 '<32>* 显著延长攻击瞄准时间...',
                 '<32>* 它有一切其他物品的功效，\n  并更加强大。'
              ],
      name: '提米盔甲',
      use: [ '<32>{#p/human}* （你穿上了提米盔甲。）' ]
   },
   i_boots: {
      battle: {
         description: '灵活但轻浮，\n想取代飞行器，有点悬。',
         name: '悬浮靴'
      },
      drop: [ '<32>{#p/human}* （你把悬浮靴扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （7攻击。）' ]
            : [ '<32>{#p/basic}* “悬浮靴” （7攻击）\n* 灵活但轻浮，\n  想取代飞行器，有点悬。' ],
      name: '悬浮靴',
      use: [ '<32>{#p/human}* （你穿上了悬浮靴。）' ]
   },
   i_flight_suit: {
      battle: {
         description: '胆小鬼别穿。',
         name: '飞行服'
      },
      drop: [ '<32>{#p/human}* （你把飞行服扔掉了。）' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* （10防御。）' ]
            : [ '<32>{#p/basic}* “飞行服” （10防御）\n* 胆小鬼别穿。' ],
      name: '飞行服',
      use: [ '<32>{#p/human}* （你穿上了飞行服。）' ]
   },
   i_snack: {
      battle: {
         description: "...安黛因的独家秘方？",
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
            : [ '<32>{#p/basic}* “迷之零食” 回复15 HP\n* ...安黛因的独家秘方？' ],
      name: '迷之零食',
      use: () => [
         '<32>{#p/human}* （你吃掉了迷之零食。）',
         ...(game.room === 'f_kitchen' // NO-TRANSLATE

            ? [
                 SAVE.data.b.undyne_respecc
                    ? '<25>{#p/undyne}{#f/1}* 希望你喜欢！'
                    : '<25>{#p/undyne}{#f/14}* 希望你喜欢！'
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
                 '0G - 免费薄片！！',
                 '0G - 免费薄片！！',
                 '0G - 免费薄片！！',
                 SAVE.data.b.item_temyarmor || temgone()
                    ? '§fill=#808080§---- 售罄 ----'
                    : SAVE.data.b.colleg
                    ? `${armorprice}G - 提咪盔甲！！！`
                    : '1000G - 供提咪上大鞋',
                 '离开'
              ]
            : [
                 '4G - 提咪薄片',
                 '2G - 提咪薄片（促销，）',
                 '20G - 提咪薄片（粉贵）',
                 SAVE.data.b.item_temyarmor
                    ? '§fill=#808080§---- 售罄 ----'
                    : SAVE.data.b.colleg
                    ? `${armorprice}G - 提咪盔甲！！！`
                    : '1000G - 供提咪上大鞋',
                 '离开'
              ],
      itemInfo: () =>
         SAVE.data.n.plot === 72
            ? [
                 '回复2 HP\n提咪的\n食物\n免费！！',
                 '回复2 HP\n提咪的\n食物\n免费！！',
                 '回复2 HP\n提咪的\n食物\n免费！！',
                 SAVE.data.b.colleg ? '防具：20防御\n让战斗\n炒鸡\n容易！！！' : '大鞋\n提咪追球\n高等\n教育'
              ]
            : [
                 '回复2 HP\n提咪的\n食物',
                 '回复2 HP\n提咪的\n食物\n促销！！',
                 '回复2 HP\n提咪的\n食物\n（粉贵）',
                 SAVE.data.b.colleg ? '防具：20防御\n让战斗\n炒鸡\n容易！！！' : '大鞋\n提咪追球\n高等\n教育'
              ],
      itemPrompt: '<09>{#p/tem}{#k/0}你吼！\n欢银光临...\n提咪商店！',
      itemPurchase: [
         '<09>{#p/tem}{#k/6}谢谢惠顾！',
         '<09>{#p/tem}{#k/0}fdshfg',
         '<09>{#p/tem}{#k/2}你米有\n足够哒\n钱钱，',
         "<10>{#p/human}（你带的\n东西\n太多了。）"
      ],
      itemPurchasePrompt: (free: boolean) => (free || temgone() ? '偷走吗？' : '花$(x)G\n买它吗？'),
      itemSellPrompt: '出$(x)G\n卖掉它吗？',
      itemUnavailable: () => (temgone() ? '<09>{#p/basic}空无一物。' : '<09>{#p/tem}{#k/2}米有\n东西...'),
      itemRestricted: '<09>{#p/tem}{#k/2}这个\n我不收...',
      menu: () =>
         temgone() ? [ '拿取', '偷窃', '阅读', '离开' ] : [ '购买', world.meanie ? '偷窃' : '出售', '交谈', '离开' ],
      menuPrompt1: '<23>{#p/tem}{#k/0}* 你吼！\n* 欢银光临...\n* 提咪商店！！！',
      menuPrompt2: '<23>{#p/basic}* ...但是大家都逃走了。',
      sell1: [ '<30>{#p/tem}{#k/2}* 不要哇！！！\n* 我滴钱钱，，，', '<30>{#p/tem}{#k/4}* 不许偷！！！' ],
      sell2: [ '<30>{#p/tem}{#k/3}* 没门。' ],
      steal1: [ '<30>{#p/human}* （你从柜台后面拿走了32767G。）' ],
      steal2: [ '<30>{#p/basic}* 空无一物。' ],
      note: [ '<32>{#p/human}* （没有字条。）' ],
      talk: () => [
         SAVE.data.n.plot === 72 ? '好消息' : '打招呼',
         SAVE.data.n.plot === 72 ? '未来发展' : SAVE.data.b.colleg ? '提米盔甲' : '介绍下自己',
         SAVE.data.n.plot === 72 ? '提米的秘密' : '提米的历史',
         '关于商店',
         '离开'
      ],
      talkPrompt: '<09>{#p/tem}{#k/0}你吼！！！\n我素提米',
      talkText: [
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#k/0}* 嚎吖！', '<32>{#p/tem}{#k/0}* 提咪要去新四界辣！' ]
               : [ '<32>{#p/tem}{#k/0}* 你吼！！！', "<32>* 我素提米" ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#k/0}* 嚎吖！', '<32>{#p/tem}{#k/0}* 提咪要去新四界辣！' ]
               : SAVE.data.b.colleg
               ? [
                    '<32>{#k/1}* 提咪盔甲太太太吼了！\n* 任何战斗都变哒！\n  炒鸡容易胜利！！！',
                    '<32>{#k/4}* 但，哼嗯嗯嗯，提咪想...\n* 用了盔甲，\n  尼的战斗就目有挑战了，',
                    '<32>{#k/3}* 提咪...\n* 有一个姐决番案。',
                    '<32>{#k/6}* 提咪会给尼...\n* 一份{@fill=#ff0}奖鞋金{@fill=#fff}！',
                    '<32>{#k/3}* 如果尼{@fill=#ff0}输了好多战斗{@fill=#fff}，\n  提咪就费{@fill=#ff0}给尼打折{@fill=#fff}！',
                    ...(armorprice() <= 1000
                       ? [
                            '<32>{#k/1}* 尼看！其实...\n* 价哥已经，变低啦！！！\n* 哇哇！！！！',
                            '<32>{#k/6}* 太提咪祝贺尼啦！！！'
                         ]
                       : [
                            '<32>{#k/3}* 所以如果陷入了吼难的战逗中\n  觉得好灰森啊，\n  那就买下提咪盔甲吧！\n* 它就四尼的救命稻草！',
                            '<32>{#k/5}* 但提咪盔甲太吼了，\n* 答应窝一定四真的需要它\n  才买吼，'
                         ])
                 ]
               : [ '<32>{#p/tem}{#k/0}* 你吼！！！', "<32>* 我素提米" ],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/tem}{#k/0}* 辣个炒鸡有名哒雕像后面\n  有个特苏按钮，',
                    '<32>{#p/tem}{#k/0}* 按了按钮吖...\n* 就粗来一个谜提！',
                    SAVE.data.b.colleg
                       ? '<32>{#p/tem}{#k/2}* 上了大鞋，\n  提咪还是不知道\n  辣个怎么弄，，，'
                       : '<32>{#p/tem}{#k/0}* 提咪不知道辣个怎么弄,,,',
                    '<32>{#p/tem}{#k/1}* 但缩不定，\n  银类能解开呢！！\n* 嚎吖！！'
                 ]
               : SAVE.data.b.colleg
               ? [
                    "<32>{#p/tem}{#k/0}* 嚎吖！\n* 提咪获得惹提米鞋的鞋位！\n* 提咪可以把全不的森远历史\n  都告诉尼啦！！！"
                 ]
               : [ '<32>{#p/tem}{#k/0}* 我们提咪\n  有着粉深远的历史！！！' ],
         () =>
            SAVE.data.n.plot === 72
               ? [ '<32>{#p/tem}{#k/0}* 嚎吖！！！\n* 提咪桑店要关门啦！！！' ]
               : [ '<32>{#p/tem}{#k/0}* 嚎吖！！！\n* 去提咪商店吧！！！' ]
      ],
      colleg1: [
         '<32>{#p/tem}{#k/1}* 哇嗷！！',
         '<32>{#k/2}* 介么多钱钱...\n* 提咪尊的可以收下么...',
         '<32>{#k/6}* 好哒！！！！\n* 提咪要去上大鞋\n  让尼为窝感到骄傲！！！'
      ],
      colleg2: [
         '<32>{#p/tem}* 提咪大鞋毕业了，',
         '<32>{#k/0}* 提咪学会啦好多东东，\n* 学会卖新道具辣！\n* 嚎吖！！！'
      ],
      sellExit: '离开',
      sellValue: '$(x)G',
      sellStory1: () => [
         '<32>{#p/tem}{#k/1}* 哇嗷！！',
         '<32>{#k/2}* 尼带着... $(x)！！！',
         SAVE.data.b.colleg
            ? '<32>{#k/4}* 哼嗯嗯嗯....\n* 我炒鸡想要辣个$(x)...\n* 但我还要攒研究僧鞋费，'
            : '<32>{#k/4}* 哼嗯嗯嗯....\n* 我炒鸡想要辣个$(x)...\n* 但我还要攒大鞋鞋费，',
         '<32>{#k/5}* 哼嗯嗯嗯嗯....！！！\n* 提咪一直都想要个$(x)...！'
      ],
      sellStory2: [ '<32>{#p/tem}{#k/2}* 但.. 但是...', '<32>{#k/4}* 卟！！！！！！！！！！！！' ],
      sellStory3: () =>
         SAVE.data.b.colleg
            ? [
                 "<32>{#p/tem}{#k/3}* 跟我开玩笑是吧？\n* 敢笑话我是吧！\n* 哈哈，真有意思。\n* 看清楚，我可是高材生。"
              ]
            : [ "<32>{#p/tem}{#k/3}* 你会后悔的。" ],
      zeroPrompt: '<09>{#p/basic}...'
   },
   n_shop_tortoise: {
      exit: () =>
         world.runaway
            ? []
            : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? [ '<32>{#p/basic}{#k/1}* 可算走了。' ]
            : [ '<32>{#p/basic}{#k/0}* 在外头小心点，孩子！' ],
      item: () =>
         world.runaway
            ? [ '0G - 平板电脑？', '0G - AR眼镜？', '0G - 星云茶', '0G - 树胶', '离开' ]
            : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? [ '45G - 平板电脑？', '45G - AR眼镜？', '16G - 星云茶', '25G - 树胶', '离开' ]
            : SAVE.data.n.plot === 72
            ? [
                 SAVE.data.b.item_padd ? '25G - 平板电脑？' : '35G - 平板电脑',
                 SAVE.data.b.item_goggles ? '25G - AR眼镜？' : '35G - AR眼镜',
                 '5G - 星云茶',
                 '5G - 树胶',
                 '离开'
              ]
            : [
                 SAVE.data.b.item_padd ? '45G - 平板电脑？' : '55G - 平板电脑',
                 SAVE.data.b.item_goggles ? '45G - AR眼镜？' : '55G - AR眼镜',
                 '16G - 星云茶',
                 '25G - 树胶',
                 '离开'
              ],
      itemInfo: () => [
         SAVE.data.b.item_padd ||
         world.genocide ||
         world.killed0 ||
         startonATE() ||
         SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? '武器：0攻击\n(当前攻击$(x))\n只能让你\n多喘口气。'
            : '武器：2攻击\n(当前攻击$(x))\n提供更长的\n喘息时间。',
         SAVE.data.b.item_goggles ||
         world.genocide ||
         world.killed0 ||
         startonATE() ||
         SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? '防具：4防御\n(当前防御$(x))\n只能让你\n多喘口气。'
            : '防具：6防御\n(当前防御$(x))\n提供更长的\n喘息时间。',
         '回复15 HP\n能在战斗中\n移动得更快。',
         '回复35 HP\n源自\n真正的树。'
      ],
      itemPrompt: () =>
         world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? "<09>{#p/basic}{#k/3}别指望\n我打折。"
            : "<09>{#p/basic}{#k/4}想买点\n啥呢？",
      itemPurchase: () =>
         world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? [
                 '<09>{#p/basic}{#k/1}这就结了。',
                 '<09>{#p/basic}{#k/1}...',
                 "<09>{#p/basic}{#k/3}咋了？\n这点钱\n都付不起？",
                 "<10>{#p/human}（你带的\n东西\n太多了。）"
              ]
            : [
                 '<09>{#p/basic}{#k/0}谢谢惠顾！\n哇哈哈。',
                 '<09>{#p/basic}{#k/2}想好了\n再买哦。',
                 "<09>{#p/basic}{#k/4}你的钱\n还不太够。",
                 "<10>{#p/human}（你带的\n东西\n太多了。）"
              ],
      itemPurchasePrompt: () => (world.runaway ? '偷走吗？' : '花$(x)G\n买它吗？'),
      menu: () =>
         world.runaway ? [ '拿取', '偷窃', '阅读', '离开' ] : [ '购买', world.meanie ? '偷窃' : '出售', '交谈', '离开' ],
      menuPrompt1: () =>
         SAVE.data.n.plot === 72
            ? '<23>{#p/basic}{#k/0}* 哇哈哈！\n* 我果然没看错你！'
            : "<23>{#p/basic}{#k/0}* 瞧一瞧，看一看！\n* 我这里有好多物美价廉的废品\n  正在大甩卖！",
      menuPrompt2: () =>
         SAVE.data.n.plot === 72 ? '<23>{#p/basic}{#k/0}* 哇哈哈。' : "<23>{#p/basic}{#k/0}* 别见外哦。",
      menuPrompt3: () =>
         world.genocide
            ? "<23>{#p/basic}{#k/3}* 你们几个还想去哪？\n* 等等，当我没问。\n  你们去哪关我什么事呢？"
            : '<24>{#p/basic}{#k/2}* 哇哈哈...\n* 您来啦。\n* 好一个大瘟神啊！',
      menuPrompt4: '<23>{#p/basic}* ...但是大家都逃走了。',
      note: [ '<32>{#p/human}* （但没人给你留字条。）' ],
      sell1: () =>
         world.runaway
            ? [ '<30>{#p/human}* （你从柜台后面拿走了1394G。）' ]
            : world.genocide
            ? [
                 '<30>{#p/basic}{#k/4}* 哇哈哈...',
                 '<30>{#k/3}* 呵，先是把别人灵魂据为己有，\n  现在又想耍同样的手段\n  把我东西偷走？',
                 "<30>{#k/4}* 听我句劝，\n  最好别得寸进尺。"
              ]
            : world.meanie
            ? [
                 "<30>{#p/basic}{#k/2}* 哎呀，孩子。\n* 你知道这些东西\n  是要花钱的吧？",
                 "<30>{#k/3}* 也许在你看来，这些就是破烂。\n* 可在我心中，它们都是宝贝！"
              ]
            : [
                 "<30>{#p/basic}{#k/2}* 哈！\n* 我是卖废品的，\n  不是收废品的！",
                 "<30>{#k/3}* 不过，如果你想卖点东西，\n  我有个好主意：\n  去提米商店那里看看吧。",
                 '<30>{#k/0}* 在哪呢...',
                 '<30>{#k/4}* ...',
                 "<30>{#k/0}* 想不起来了。"
              ],
      sell2: () =>
         world.runaway
            ? [ '<30>{#p/basic}* 空无一物。' ]
            : world.genocide || world.meanie
            ? [ "<30>{#p/basic}{#k/1}* 就算把刀架我脖子上，\n  我也不会这些宝贝交给你。" ]
            : [ "<30>{#p/basic}{#k/0}* 我最后说一次，\n  我不是收破烂的！" ],
      talk: () =>
         SAVE.data.n.plot === 72
            ? [
                 '艾斯戈尔',
                 '新家园',
                 '托丽尔',
                 SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                    ? '§fill=#ff0§握手'
                    : '我是英雄吗',
                 '离开'
              ]
            : world.genocide
            ? [ '艾斯利尔', '（威胁他）', '（揍他）', '安黛因', '离开' ]
            : world.killed0 || startonATE()
            ? [ '你的下场', '（威胁他）', '（揍他）', '谁是英雄', '离开' ]
            : [
                 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                    ? '介绍下自己'
                    : [ '介绍下自己', '§fill=#ff0§那场战争（新）', '§fill=#ff0§退休生活（新）', '退休生活' ][
                         Math.min(SAVE.data.n.shop_gerson, 3)
                      ],
                 [ '故园生活', '§fill=#ff0§你的家人（新）', '§fill=#ff0§艾罗戈（新）', '艾罗戈' ][
                    Math.min(SAVE.data.n.shop_homeworld, 3)
                 ],
                 '铸厂',
                 SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                    ? '安黛因'
                    : SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                    ? '§fill=#ff0§握手'
                    : '聊聊安黛因',
                 '离开'
              ],
      talkPrompt: () =>
         world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

            ? '<09>{#p/basic}{#k/2}是吗？\n就你\n还想聊天？'
            : '<09>{#p/basic}{#k/0}你想知道点\n啥呢？',
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
                    '<32>{#p/basic}{#k/1}* 想听听我心目中的艾斯利尔\n  是什么样的吗？',
                    '<32>{#k/0}* ...\n* 他是个好孩子。',
                    '<32>{#k/3}* 他要是没死，\n  现在已继任国王了。',
                    "<32>{#k/4}* 我说的艾斯利尔，\n  可不是面前这个“艾斯利尔”。",
                    '<32>{#k/0}* 这个“艾斯利尔”，\n  就算能模仿他的面容，复刻他的声音，\n  甚至... 凭那张可爱的脸以假乱真...',
                    '<32>{#k/3}* 可就是模仿不了他的心灵。\n* 我了解艾斯利尔的性格，\n  所以，你骗不了我。',
                    "<32>{#k/1}* 我很好奇，\n  亲手把自己母亲的灵魂\n  扯出来的滋味...",
                    '<32>{#k/0}* 好受不？'
                 ]
               : world.killed0 || startonATE()
               ? [
                    '<32>{#p/basic}{#k/0}* 很久以前，我跟国王都觉得，\n  在前哨站安分守己，才有未来...',
                    '<32>{#k/1}* 因为，一旦我们出去，\n  马上就会被人类宰了。',
                    "<32>{#k/3}* 后来，国王改变主意了。\n* 当时，我甚至有点感觉\n  自己被他背叛了。",
                    '<32>{#k/4}* 但现在，我觉得...\n* 是我错了。',
                    "<32>{#k/0}* 毕竟，就算我们安分守己...",
                    "<32>{#k/3}* 最终，还是会葬送在\n  某个人类的手中，对不对？"
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
                       "<32>{#p/basic}{#k/0}* 我已经活了很久了。\n* 也许太久了。",
                       '<32>{#k/3}* 想当年，\n  人们称我为“正义之剑”。',
                       '<32>{#k/2}* 那时，\n  我还是行星理事会的主席。',
                       "<32>{#k/1}* ...要不是那场该死的战争，\n  我今天可能还在那个位置上。"
                    ],
                    [
                       '<32>{#p/basic}{#k/0}* 啊，是啊，就是那场战争。\n* 那场战争，\n  给我，给这里每个人\n  都带来了难以磨灭的创伤。',
                       "<32>{#k/4}* 每隔一段时间，\n  我们会收到报告...\n* 上面，全是为了保护家园\n  而壮烈牺牲的烈士。",
                       "<32>{#k/1}* 我至今还记得，小毛球国王\n  将一条条噩耗告知烈士家属时，\n  他脸上的神情...",
                       "<32>{#k/1}* 眼神空洞，目光呆滞...\n* 孩子，这就是战争\n  给人带来的影响。",
                       "<32>{#k/3}* 所以，我就退休了。"
                    ],
                    [
                       '<32>{#p/basic}{#k/3}* 我的退休生活？',
                       "<32>{#k/2}* 哇哈哈！\n* 可谓是“逍遥自在”啊！",
                       "<32>{#k/4}* 也许那些在空境工作的员工\n  根本看不上这间破屋...",
                       "<32>{#k/2}* ...但关我啥事？\n  我又不用跟他们比。",
                       '<32>{#k/0}* 能有这些或英勇、或古怪、\n  或有点害羞的邻居，\n  我就已经知足。',
                       '<32>{#k/0}* 这也许并非我梦想的生活，\n  但人生在世，就该随遇而安嘛。'
                    ],
                    [
                       '<32>{#p/basic}{#k/3}* 想让我再重复一遍吗？',
                       "<32>{#k/4}* 哇哈哈...\n  恐怕，你得回溯时间了。",
                       "<32>{#k/2}* 就连我自己\n  都忘了刚才说过啥了！"
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
                    "<32>{#p/basic}{#k/3}* 我活了这么久，\n  什么大风大浪没见过。\n  不会怕你这种东西。",
                    '<32>{#k/2}* 来啊，小子，动手啊！',
                    "<32>{#k/1}* ...我知道你在这伤不了我的。",
                    "<32>{#k/4}* 哇哈...\n* 假如没有这样的智慧，\n  我也活不长。"
                 ]
               : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}{#k/2}* 你说，故园生活？',
                    '<32>{#k/0}* 呵，孩子啊...',
                    "<32>{#k/0}* 我只能告诉你，\n  故园是个很棒的地方。",
                    "<32>{#k/4}* 在那里，人们不用怕...",
                    '<32>{#k/1}* ...自己的亲人，朋友在面前\n  被活活杀死。',
                    "<32>{#k/0}* 所以嘛，\n  那地方肯定不适合你待。",
                    '<32>{#k/1}* 有疑问吗？'
                 ]
               : [
                    [
                       "<32>{#p/basic}{#k/0}* 故园生活啊...\n* 嗯... 首先，故园是有名字的。\n  叫做克里乌斯。",
                       '<33>{#k/3}* 我自己在城外一个\n  宁静的小镇中长大。\n* 嗯，应该还算宁静。',
                       '<32>{#k/4}* 每隔几天，学校里的孩子们\n  就会组织单车竞速比赛。',
                       "<32>{#k/0}* 有时候天公不作美，\n  但他们一点都不在乎。\n* 甚至，坏天气还让比赛\n  变得更刺激，更有趣了。",
                       '<32>{#k/0}* 那时，我还是个小毛孩，\n  和家人参加过好多次竞速比赛。',
                       "<32>{#k/0}* 你别误会。\n* “雷霆蜗牛”是很好玩，\n  但那可不是一回事。"
                    ],
                    [
                       "<32>{#p/basic}{#k/3}* 我的家人？\n* 呃，没什么太多可说的。\n* 父母对我很好，\n  还有几个兄弟姐妹。",
                       '<32>{#k/0}* 有一天，\n  艾罗戈国王来我们小镇。\n* 在一场竞速比赛中，\n  我和他碰面了。',
                       "<32>{#k/0}* 我只是个不起眼的乡巴佬，\n  但他从我身上看到了别的东西，\n  那是某种特质...",
                       '<32>{#k/4}* 一来二去，\n  我小小年纪就离开了家人。',
                       "<32>{#k/3}* ...那次一别，\n  此后就再也没能见到家人。"
                    ],
                    [
                       '<32>{#p/basic}{#k/0}* 艾罗戈，是故园最后一段全盛时期的\n  当政国王。',
                       "<32>* 我相信，你一定读过他的故事。",
                       ...(SAVE.storage.inventory.has('artifact') // NO-TRANSLATE

                          ? [ "<32>{#k/2}* 否则，那你怎么拿着\n  他的吊坠！？" ]
                          : [
                               "<32>{#k/2}* 否则，你难道一直活在\n  外星上吗？"
                            ]),
                       '<32>{#k/3}* 在他的统治下，\n  怪物一族逐渐发展壮大\n* 都有点壮大过头了。',
                       '<32>{#k/0}* 他第一次见到人类时，\n  非常高兴...',
'<32>{#k/0}* 并不是因为他自己想见到人类，\n  而是为了实现他儿子的愿望。',
                       "<32>{#k/1}* 可怜的孩子，\n  虽然实现了他的梦想，\n  可之后..."
                    ],
                    [
                       "<32>{#p/basic}{#k/3}* 抱歉，这事我不该说太多。",
                       "<32>{#k/1}* 小毛球国王可不想让你\n  背负那样的重担。"
                    ]
                 ][Math.min(SAVE.data.n.shop_homeworld++, 3)],
         () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#k/0}* 托丽尔？\n* 其实，她不久前刚经过这。',
                    '<32>{#k/1}* 她说，“想自己一个人静静。”',
                    "<32>{#k/3}* 嗯... \n* 不过我觉得，\n  现在她应该冷静得差不多了。",
                    '<32>{#k/0}* 附近有个垃圾堆，\n  那房间里还有一架梯子。\n  她应该就在那里。',
                    "<32>{#k/3}* 至于她为啥这么心事重重...\n  我清楚得很。"
                 ]
               : world.genocide || world.killed0 || startonATE()
               ? 48 <= SAVE.data.n.plot
                  ? [
                       [
                          '<32>{#p/basic}{#k/3}* 嗯？\n* 跟你干一架？',
                          "<32>{#k/1}* 没门。\n* 我不是英雄，\n  也不会去逞英雄。",
                          "<32>{#k/0}* 更何况...\n* 你就算没杀安黛因，\n  其他民众也还是都被杀了。",
                          "<32>{#k/4}* 反正，我就这么待着，\n  你也拿我没办法..."
                       ],
                       [
                          '<32>{#p/basic}{#k/3}* 嗯？\n* 跟你干一架？',
                          "<32>{#k/1}* 没门。\n* 我不是英雄，\n  也不会去逞英雄。",
                          "<32>{#k/3}* 更何况...\n* 怪物们只要碰上你，\n  几乎都会失踪。",
                          "<32>{#k/4}* 那我不如识趣点，老实待着。\n* 反正你也拿我没办法..."
                       ],
                       [
                          '<32>{#p/basic}{#k/3}* 嗯？\n* 跟你干一架？',
                          "<32>{#k/1}* 没门。\n* 我不是英雄，\n  也不会去逞英雄。",
                          "<32>{#k/0}* 更何况...\n* 连安黛因都拦不住你，\n  那我就更不是你的对手。",
                          "<32>{#k/4}* 反正，我就这么待着，\n  你也拿我没办法..."
                       ]
                    ][world.genocide ? 2 : SAVE.data.n.state_foundry_undyne]
                  : [
                       '<32>{#p/basic}{#k/3}* 嗯？\n* 跟你干一架？',
                       "<32>{#k/1}* 没门。\n* 我不是英雄，\n  也不会去逞英雄。",
                       "<32>{#k/0}* 更何况...\n* 我这身老骨头也打不动了。",
                       "<32>{#k/1}* 你打一下，我可能...\n  就...",
                       "<32>{#k/4}* 至少，我还能扯扯闲话，拖住你们，\n  帮孩子们争取逃命的时间。"
                    ]
               : postSIGMA()
               ? [
                    '<32>{#p/basic}{#k/3}* 你想了解铸厂？\n* 就这个破地方？',
                    "<32>{#k/3}* 呃...\n* 刚才，这里停电了...",
                    "<32>{#k/0}* 不过别担心。\n* 就这点小事，\n  难不倒铸厂员工的。",
                    "<32>{#k/2}* 这群修理工啊，\n  一个个恨不得天天996呢！"
                 ]
               : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
               ? [
                    [
                       '<32>{#p/basic}{#k/3}* 你想了解铸厂？\n* 就这个破地方？',
                       "<32>{#k/3}* 嗯，这地方跟个迷宫一样，\n  总有人在这里迷路...",
                       '<32>{#k/3}* 甚至被抛弃...',
                       "<32>{#k/2}* 孩子，我真希望\n  这种事情别发生在你身上。"
                    ],
                    [
                       '<32>{#p/basic}{#k/3}* 你想了解铸厂？\n* 就这个破地方？',
                       "<32>{#k/0}* 唉，这里根本不是什么\n  幸福乐园...\n* 从来都不是。",
                       '<32>{#k/3}* 前有人类把我们逼到这里，\n  活活等死；\n* 后有英雄战死，士气低迷...',
                       "<32>{#k/3}* 孩子，这里只有苦难。"
                    ]
                 ][SAVE.data.n.state_foundry_undyne - 1]
               : [
                    '<32>{#p/basic}{#k/3}* 你想了解铸厂？\n* 就这个破地方？',
                    '<32>{#k/2}* 我想想...\n* 当年，怪物刚被困在这里时，\n  整个“前哨站”还只有铸厂！',
                    '<32>{#k/0}* 后来，我们不断扩建前哨站，\n  才有了形态各异的其他区域。',
                    "<32>{#k/0}* 看来，怪物们大多不愿拘泥于过去，\n  而是“向前看”，谋发展。\n* 我能理解。",
                    "<32>{#k/2}* 虽说...\n  只想发展，扩建，改造\n  这一亩三分地，有点没出息。",
                    "<32>{#k/3}* 当年，人类把我们困在这里，\n  希望我们在黑暗中腐烂受苦。",
                    "<32>{#k/0}* 但你瞧：\n  一路下来，我们不仅走出了困境，\n  还把这里变成了自己的地盘。",
                    "<32>{#k/2}* 哇哈哈！\n* 就让他们瞧瞧：\n  谁才是老大！"
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
                          "<32>{#p/basic}{#k/1}* 你们杀掉她了？",
                          '<32>{#k/1}* ...',
                          '<32>{#k/3}* 那干嘛明知故问...',
                          '<32>{#k/3}* 难道...',
                          '<32>{#k/2}* 就是为了看看我啥反应？',
'<32>{#k/2}* 是吗？',
                          '<32>{#k/4}* ...',
                          '<32>{#k/4}* 你还不如... 唉算了。'
                       ],
                       [
                          '<32>{#p/basic}{#k/1}* 好了我知道了娃们。',
                          "<32>{#k/1}* 她死了。",
                          "<32>{#k/3}* 赖着不走，\n  是等着我给你俩办庆功宴吗？",
                          '<32>{#k/1}* 现在给我滚。'
                       ]
                    ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                  : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                  ? [
                       '<32>{#p/basic}{#k/1}* ...',
                       "<32>{#k/1}* 小子，你可真幽默。",
                       '<32>{#k/3}* 还当我面把她杀了...',
                       "<32>{#k/1}* 算你幸运，\n  我不会走出商店，把你杀了。"
                    ]
                  : world.killed0 || startonATE()
                  ? [
                       [
                          '<32>{#p/basic}{#k/4}* 安黛因？',
                          49 <= SAVE.data.n.plot
                             ? '<32>{#k/4}* 前不久，她刚路过这里...'
                             : '<32>{#k/4}* 几分钟前，她刚路过这里。',
                          '<32>{#k/0}* 她说，“不想”抓你了。',
                          '<32>{#k/4}* ...',
                          '<32>{#k/4}* 到底咋回事？'
                       ],
                       [
                          '<32>{#p/basic}{#k/3}* 安黛因？',
                          "<32>{#k/0}* 这段时间一直没看到她。",
                          '<32>{#k/4}* 好像... 失踪了。.',
                          '<32>{#k/3}* 是你干的吧？'
                       ],
                       [
                          [
                             '<32>{#p/basic}{#k/1}* ...',
                             '<32>{#k/1}* 你故技重施，杀了她。',
                             "<32>{#k/3}* 诚然，她追杀你，\n  她没想让你活命...",
                             "<32>{#k/1}* 但想靠“正当防卫”糊弄我？\n  没门。",
                             '<32>{#k/3}* 哇哈...\n* 你的所作所为，我清楚得很。'
                          ],
                          [ '<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* 还有啥好说的呢？' ]
                       ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                    ][SAVE.data.n.state_foundry_undyne]
                  : [
                       2 <= SAVE.data.n.plot_date
                          ? SAVE.data.b.undyne_respecc
                             ? [
                                  '<32>{#p/basic}{#k/4}* 欸，你俩挺合得来嘛。',
                                  '<32>{#k/2}* 哇哈哈！',
                                  "<32>{#k/0}* 你在她心中的地位\n  直线上升了哦，孩子！"
                               ]
                             : [
                                  '<32>{#p/basic}{#k/4}* 所以，你俩...\n  现在成好朋友了？',
                                  '<32>{#k/2}* 哇哈哈！',
                                  "<32>{#k/0}* 连我都大吃一惊啊，\n  孩子！"
                               ]
                          : [
                               [
                                  '<32>{#p/basic}{#k/4}* 安黛因？',
                                  49 <= SAVE.data.n.plot
                                     ? '<32>{#k/4}* 前不久，她刚路过这里...'
                                     : '<32>{#k/4}* 几分钟前，她刚路过这里。',
                                  SAVE.data.b.undyne_respecc
                                     ? '<32>{#k/0}* 她说，和那位“可敬的人类”\n  好好切磋了一番。'
                                     : '<32>{#k/0}* 她说，“早就”抓到你了。',
                                  '<32>{#k/4}* ...',
                                  '<32>{#k/4}* 她咋说得出口的？\n  你小子干啥了？'
                               ],
                               [
                                  "<32>{#p/basic}{#k/4}* 你想去找她是吧？\n* 她就在家待着呢，离这没几步路。",
                                  '<32>{#k/3}* 听她之前那番话...',
                                  SAVE.data.b.undyne_respecc
                                     ? '<32>{#k/4}* 没想到，你俩处得挺不错。'
                                     : '<32>{#k/4}* 你俩得好好聊聊了。'
                               ]
                            ][Math.min(SAVE.data.n.shop_deadfish++, 1)],
                       [
                          '<32>{#p/basic}{#k/3}* 安黛因？',
                          "<32>{#k/0}* 这段时间一直没看到她。",
                          '<32>{#k/4}* 好像... 失踪了。.',
                          '<32>{#k/1}* 隐隐觉得，这事跟你有关系...'
                       ],
                       [
                          [
                             '<32>{#p/basic}{#k/4}* ...',
                             '<32>{#k/0}* 嗯... 她被杀了。',
                             "<32>{#k/3}* 不过吧，这事得怪她自己。",
                             '<32>{#k/4}* 我一直搞不明白，\n  她为啥就铁了心地想\n  干掉你们人类呢...',
                             "<32>{#k/0}* 就拿个灵魂而已，\n  等你自然老死，然后再拿，\n  有什么不好呢？"
                          ],
                          [ '<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* 还有啥好说的呢？' ]
                       ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                    ][SAVE.data.n.state_foundry_undyne]
               : world.genocide
               ? [
                    "<32>{#p/basic}{#k/0}* 安黛因？\n* 哦，一个小淘气鬼而已。\n* 要是换平时，我会说她是英雄...",
                    "<32>{#k/1}* 不过，我一路上目睹了\n  你的所做所为。\n* 她再怎么逞能，也是白费功夫。",
                    "<32>{#k/4}* 别误会。\n* 即使没有胜算，\n  她会好好和你打一场。",
                    '<32>{#k/3}* 可是...\n  一味只会诉诸武力的人，\n  救不了前哨站。',
                    "<32>{#k/3}* 此时，仍能“众人皆醉我独醒”，\n  愿意寻找另一种办法\n  化解危机之人...",
                    "<32>{#k/3}* 才是真正的英雄。",
                    "<32>{#k/0}* 哇哈哈。\n* 我相信，这样的英雄\n  一定能灭了你们。"
                 ]
               : world.killed0 || startonATE()
               ? world.trueKills > 29
                  ? [
                       "<32>{#p/basic}{#k/1}* 我不是英雄。",
                       "<32>{#k/3}* 但我知道，在这里的某处，\n  一定有这样一位英雄：",
                       "<32>* 那英雄不管身处何种境地，\n  始终坚守正义。",
                       "<32>{#k/0}* 那英雄江湖无名，\n  任何传说从未提及。",
                       "<32>* 但我仍然坚信，\n  那英雄一定就在某处。",
                       '<32>{#k/3}* 有朝一日，\n  那英雄定会将你斩于马下。'
                    ]
                  : [
                       "<32>{#p/basic}{#k/1}* 我不是英雄。",
                       "<32>{#k/3}* 但我知道，在这里的某处，\n  一定有这样一位英雄：",
                       "<32>* 那英雄不管身处何种境地，\n  始终坚守正义。",
                       "<32>{#k/0}* 孩子，你最好小心点。",
                       "<32>{#k/0}* 指不定哪天...",
                       "<32>{#k/3}* 你就死定了。"
                    ]
               : world.trueKills > 29
               ? [
                    "<32>{#p/basic}{#k/0}* 安黛因？\n* 是啊，她是这一带的英雄。",
                    '<32>{#k/3}* 刚刚，她四处咆哮...\n* 似乎特别厌恶\n  长得像你一样的家伙...',
                    "<32>{#k/2}* 孩子，我会帮你一把的。\n* 买点东西吧，\n  说不定能救你一命呢！\n* 哇哈哈！"
                 ]
               : [
                    "<32>{#p/basic}{#k/0}* 安黛因？\n* 是啊，她是这一带的英雄。",
                    '<32>{#k/4}* 凭借勇气和决心，\n  她一路奋斗到皇家守卫的顶点。',
                    '<32>{#k/3}* 刚刚，她来这里问\n  有没有见到一个\n  长得很像你的家伙...',
                    "<32>{#k/2}* 孩子，我会帮你一把的。\n* 买点东西吧，\n  说不定能救你一命呢！\n* 哇哈哈！"
                 ]
      ],
      zeroPrompt: '<09>{#p/basic}...'
   },

   s_save_foundry: {
      f_abyss: {
         name: '铸厂 - 深渊',
         text: [
            '<32>{#p/human}* （你发现自己身处\n  前哨站的最低点。）',
            '<32>{#p/human}* （这种身处边境的不定感\n  使你充满了决心。）'
         ]
      },
      f_battle: {
         name: '铸厂 - 钢索桥',
         text: () =>
            SAVE.data.n.state_foundry_undyne > 0 || world.runaway
               ? [ '<32>{#p/human}* （星光渐渐暗淡，\n  这使你充满了决心。）' ]
               : [
                    '<32>{#p/human}* （虽然远在天际，星光依旧闪烁。）',
                    '<32>{#p/human}* （这使你充满了决心。）'
                 ]
      },
      f_hub: {
         name: '铸厂 - 宁静地带',
         text: () =>
            SAVE.data.n.state_foundry_undyne > 0 || world.runaway
               ? [
                    '<32>{#p/human}* （这里静得可怕...）',
                    '<32>{#p/human}* （这仍使你充满了决心。）'
                 ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/human}* （旅途即将结束，\n  而你又回到这片宁静地带。）\n* （这使你充满了决心。）' ]
               : SAVE.data.n.plot < 48
               ? [
                    '<32>{#p/human}* （在持续的混乱中\n  得到了短暂的喘息...）',
                    '<32>{#p/human}* （这使你充满了决心。）'
                 ]
               : SAVE.data.n.plot_date < 2.1
               ? [ '<32>{#p/human}* （混乱消退了。）\n* （这使你充满了决心。）' ]
               : SAVE.data.n.exp > 0
               ? [
                    '<32>{#p/human}* （随着蒸汽而来的\n  是背叛的苦涩。）',
                    '<32>{#p/human}* （这使你充满了决心。）'
                 ]
               : [
                    '<32>{#p/human}* （随着蒸汽而来的\n  是友谊的芬芳。）',
                    '<32>{#p/human}* （这使你充满了决心。）'
                 ]
      },
      f_lobby: {
         name: '铸厂 - 暗区',
         text: () =>
            SAVE.data.n.plot < 39
               ? [ '<32>{#p/human}* （在铸厂的深处漫步，\n  使你充满了决心。）' ]
               : SAVE.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/human}* （一路上，你把“朋友”拉下了水。）\n* （想到这些，你充满了决心。）' ]
               : SAVE.data.b.f_state_kidd_betray
               ? [ '<32>{#p/human}* （一路上，你把“朋友”弃若敝履。）\n* （想到这些，你充满了决心。）' ]
               : world.runaway
               ? [
                    "<32>{#p/human}* （如今，你与“朋友”们再无缘相见。）\n* （想到这些，你充满了决心。）"
                 ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* （那时，你竭尽全力拯救朋友。）\n* （想到这些，你充满了决心。）'
                 ]
               : [ '<32>{#p/human}* （一路上，你结交了那么多朋友。）\n* （想到这些，你充满了决心。）' ]
      },
      f_prechase: {
         name: '铸厂 - 岔路口',
         text: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* （尽管只有你和伙伴们\n  有机会踏上附近那座新桥...）',
                    '<32>{#p/human}* （它仍使你充满了决心。）'
                 ]
               : world.runaway
               ? [
                    "<32>{#p/human}* （尽管如今只有你\n  有机会踏上附近那座新桥...）",
                    '<32>{#p/human}* （它仍使你充满了决心。）'
                 ]
               : SAVE.data.n.plot < 48
               ? [
                    '<32>{#p/human}* （塔架谜题、讯星，\n  还有老式通风口...）',
                    '<32>{#p/human}* （如同变幻莫测的喜剧一般，\n  使你充满了决心。）'
                 ]
               : [
                    '<32>{#p/human}* （周围多了一座在建的新桥。）',
                    '<32>{#p/human}* （这使你充满了决心。）'
                 ]
      },
      f_sans: {
         name: '铸厂 - 边检站',
         text: () =>
            world.dead_skeleton || world.runaway
               ? [
                    '<32>{#p/human}* （不知怎地，通风口排出的蒸汽\n  令人感到不安。）',
                    '<32>{#p/human}* （但你仍充满了决心。）'
                 ]
               : [ '<32>{#p/human}* （通风口不停冒出湿热的蒸汽。）\n* （这使你充满了决心。）' ]
      },
      f_shyren: {
         name: '铸厂 - 售货机',
         text: () =>
            SAVE.data.b.killed_shyren
               ? [ '<32>{#p/human}* （空气中弥漫着悲伤的寂静。）\n* （这使你充满了决心。）' ]
               : SAVE.data.n.plot < 40
               ? [ '<32>{#p/human}* （耳边的哼唱声不住回响。）\n* （这使你充满了决心。）' ]
               : [ '<32>{#p/human}* （音乐在耳畔回响。）\n* （这使你充满了决心。）' ]
      },
      f_tunnel: {
         name: '铸厂 - 垃圾场',
         text: () =>
            SAVE.data.n.plot < 42.1
               ? [ '<32>{#p/human}* （在垃圾中迷失方向\n  使你充满了决心。）' ]
               : [ '<32>{#p/human}* （发现自己又回到了垃圾的行列\n  使你充满了决心。）' ]
      }
   }
};


// END-TRANSLATE
