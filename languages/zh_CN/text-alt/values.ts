import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosTyper } from '../../../code/systems/storyteller';

const cjk = /[\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF]/;
const cjk2latin =
   /([\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])([^/=}\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF]|$)/g;
const latin2cjk =
   /(^|[^/={\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])([\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])/g;

// START-TRANSLATE



export const LANGUAGE = "zh_CN-alt";

export default {
   cellInventoryX: 9,
   cellBoxX: -2,
   cellFinishX: 24,
   footerX: 0,
   itemEquipX: 0,
   itemUseX: 0,
   itemInfoX_equip: -3,
   itemInfoX_use: 4,
   itemDropX_equip: 0,
   itemDropX_use: 0,
   loadContinueX: 0,
   loadObserveX: 4,
   loadLVX: 8,
   loadResetX: 13,
   loadSettingsX: 1,
   loadTimeX: 0,
   loadTrueResetX: 16,
   nameChoiceCameos: <CosmosKeyed<string>>{
      
      '': '你必须选定一个名字。',
      no: 'No？',

      
      bully: '嗯...？',
      flirt: '嗯...？',
      geno: '嗯...？',
      mercy: '嗯...？',
      murder: '嗯...？',
      paci: '嗯...？',
      maybe: '也许吧？',
      yes: 'Yes？',

      
      afraid: '打起精神来。\n这儿没什么好怕的。',
      amused: '轻装上阵，\n你的旅途将会更加顺利。',
      angry: '打起精神来。\n让不如意的事情随风而去吧。',
      angsty: '打起精神来。\n不管你心情如何，\n讲你自己的故事。',
      antsy: '愿平静如微风，\n伴你踏上旅程中的每一步。',
      bored: '打起精神来。\n只要你想，那就必然能\n书写趣味人生。',
      brainy: '愿你言行不渝，\n在旅途中化为行动的力量。',
      brave: '勇敢的心将成为\n你旅途中的最佳伙伴。',
      brazen: '勇敢的心将成为\n你旅途中的最佳伙伴。',
      calm: '内心的宁静将为你的旅途\n带来奇迹。',
      clever: '愿你足智多谋，\n战胜此次旅途的重重困难。',
      cocky: '心态坚定，\n你会在旅途中一往无前。',
      crafty: '愿你足智多谋，\n战胜此次旅途的重重困难。',
      crazy: '愿你心态平和，\n在旅途中收获平衡与安宁。',
      daring: '勇敢的心将成为\n你旅途中的最佳伙伴。',
      dizzy: '愿你心态平和，\n在旅途中收获平衡与安宁。',
      dumb: '打起精神来。\n前路漫漫，许多未知\n亟待你来求索。',
      edgy: '愿你安之若素，\n饱览混沌与秩序交织的图景。',
      elated: '轻装上阵，\n你的旅途将会更加顺利。',
      empty: '愿你受益匪浅，\n在黑暗的囚笼中找寻到意义。',
      flirty: '愿从你心所欲，\n享受此番经历的乐趣与玩味。',
      giddy: '轻装上阵，\n你的旅途将会更加顺利。',
      goofy: '轻装上阵，\n你的旅途将会更加顺利。',
      greedy: '愿从你心所欲，\n享受此番经历的充实与丰盈。',
      guilty: '打起精神来。\n没什么好惭愧的。',
      happy: '轻装上阵，\n你的旅途将会更加顺利。',
      hollow: '愿你受益匪浅，\n在黑暗的囚笼中找寻到意义。',
      humble: '谦虚敬慎，\n你会在旅途中一往无前。',
      hungry: '愿你大快朵颐，\n攫取旅途一点一滴的滋养。',
      insane: '愿你心态平和，\n在旅途中收获平衡与安宁。',
      irate: '打起精神来。\n让不如意的事情随风而去吧。',
      jaded: '愿你心潮澎湃，\n让故事化作涓涓细流，\n滋润心间。',
      lazy: '愿你安闲自在，\n毫不费力地\n做出你的选择。',
      lively: '轻装上阵，\n你的旅途将会更加顺利。',
      livid: '打起精神来。\n让不如意的事情随风而去吧。',
      lonely: '打起精神来。\n登上此次旅途，\n友情将伴你而行。',
      lucky: '愿你好运连连，\n总有顺水顺风推助你前行。',
      mad: '打起精神来。\n让不如意的事情随风而去吧。',
      manic: '愿你心态平和，\n在旅途中收获平衡与安宁。',
      meek: '谦虚敬慎，\n你会在旅途中一往无前。',
      modest: '谦虚敬慎，\n你会在旅途中一往无前。',
      nervy: '愿平静如微风，\n伴你踏上旅程中的每一步。',
      moody: '打起精神来。\n不管你心情如何，\n讲你自己的故事。',
      numb: '愿你心潮澎湃，\n让故事化作涓涓细流，\n滋润心间。',
      proud: '心态坚定，\n你会在旅途中一往无前。',
      rowdy: '愿你安之若素，\n享受混沌与秩序交织的图景。',
      sad: '打起精神来。\n只要你想，那就必然能\n书写励志人生。',
      sane: '愿你处事泰然，\n以理智为此次旅程的基石。',
      sassy: '愿从你心所欲，\n享受此番经历的乐趣与玩味。',
      sated: '愿你心想事成，\n让心中的满足只增不减。',
      scared: '打起精神来。\n这儿没什么好怕的。',
      serene: '内心的宁静将为你的旅途\n带来奇迹。',
      shy: '愿从你心所欲，\n享受此番经历的抚慰与关怀。',
      silly: '轻装上阵，\n你的旅途将会更加顺利。',
      sleepy: '愿你恢复元气，\n摄取旅途一点一滴的能量。',
      smug: '心态坚定，\n你会在旅途中一往无前。',
      sorry: '打起精神来。\n没什么好惭愧的。',
      spry: '愿你精神饱满，\n铆足的干劲\n祝你一路前行。',
      steady: '愿你处事泰然，\n以理智为此次旅程的基石。',
      stupid: '打起精神来。\n前路漫漫，许多未知\n亟待你来求索。',
      timid: '打起精神来。\n这儿没什么好怕的。',
      tired: '愿你恢复元气，\n摄取旅途一点一滴的能量。',
      unruly: '愿你安之若素，\n享受混沌与秩序交织的图景。',
      wacky: '轻装上阵，\n你的旅途将会更加顺利。',
      witty: '愿你言行不渝，\n在旅途中化为行动的力量。',
      zen: '愿你处事泰然，\n以理智为此次旅程的基石。',

      
      erogot: '你选择了我，让我深感荣幸。',
      roman: '让实验开始吧。',
      thomas: '让实验开始吧。',

      
      chara: '真正的名字。',
      frisk: '这名字不对。',

      
      blooky: "............\n（它无力阻止你。）",
      dummy: "............\n（他好像不怎么健谈。）",
      lurky: '你好。',
      mushy: '上马！',
      napsta: "............\n（它无力阻止你。）",
      torie: '嗯... 我想这个名字可以...',
      toriel: '我觉得，\n你应该想个自己的名字。\n我的孩子。',
      twink: '真的吗...',
      twinkl: '想得美，蠢货。',
      twinky: '想得美，蠢货。',
      walker: '你是指“眼行家”？',

      
      astro: '快看看我的天线呐！',
      cdrake: '哈哈哈，不错嘛。',
      chilly: '哈哈哈，不错嘛。',
      dogamy: "嗯？这什么味道？",
      doggo: "它-它动了！\n它-它-它在抖！",
      jerry: '杰瑞。',
      major: '（狗狗跳到了你的腿上。）',
      minor: '（喘气！喘气！）',
      papyrs: "我准了！！！",
      papyru: "我准了！！！",
      san: '好。',
      sans: '没门。',
      sdrake: '是个五“星”级的选择。',
      serf: '快看看我的天线呐！',
      starry: '是个五“星”级的选择。',

      
      bob: '这名字挺棒的，不是吗？',
      doge: '这不好笑。',
      gelata: '吼。',
      gerson: '哇哈哈！为什么不呢？',
      mdummy: '什么，什么！什么！！！',
      mkid: "那是我的名字！！",
      monkid: "那是我的名字！！",
      muffet: '啊呼呼呼~\n你尝起来肯定很不错，甜心~',
      raddy: '嘿！\n只有刷刷才能这样叫我！',
      radtie: "很遗憾，你少写了个字。",
      radtil: "很遗憾，你少写了个字。",
      shyren: '...？',
      skrub: '干净的名字。',
      skrubb: '干净的名字。',
      tem: '你吼！！',
      temmie: '你吼！！',
      undyn: '嘎啊，行行行。',
      undyne: '找个你自己的名字去！',

      
      alphy: '呃... 行吧？',
      alphys: "别-别这么做。",
      bpants: '你还真会挑别人剩下的。',
      bratty: '嗯，我想行吧。',
      burgie: '你是喜欢我的名字吗，\n小家伙？',
      catty: "布莱蒂！布莱蒂！\n那是我的名字！",
      cozmo: '一位巫师同伴？',
      glyde: '不错的选择，小伙子。',
      hapsta: "你这可就不太礼貌了，\n亲爱的。",
      mett: '哦！！！\n你在推广我的品牌吗？',
      metta: '哦！！！\n你在推广我的品牌吗？',
      mtt: '哦！！！\n你在推广我的品牌吗？',

      
      aaron: '确定要选择这个名字吗？;)',
      grillb: '很热，但还不够热。',
      grilly: '很热，但还不够热。',
      gyft: "没必要这样...",
      heats: '你知道！？',
      kabakk: '尊重我的权威！',
      vulkin: '啊！谢谢你~',
      zorren: '谢谢你，呃，用我的名字。',

      
      asgor: '可以？',
      asgore: '不可以。',
      asriel: '...',
      asrie: '...行。',

      
      char: "...真正的名字？",
      查拉: "真正的名字。",
      猹: "...真正的名字？",
      卡拉: "...真正的名字？",
      恰拉: "...真正的名字？",
      fris: "这名字... 不对吧？",
      frask: "这名字... 不对吧？",
      弗里斯克: "这名字不对。",
      福: "这名字... 不对吧？",
      福瑞斯克: "这名字... 不对吧？",

      羊妈: "嗯... 我想这个名字可以...",
      托丽: "嗯... 我想这个名字可以...",
      托丽尔: "我觉得，\n你应该想个自己的名字。\n我的孩子。",
      闪闪: "想得美，蠢货。",

      papyrus: "这没啥不合适的！！",
      帕: "我准了！！！",
      帕帕: "我准了！！！",
      帕派肉丝: "我准了！！！",
      帕帕肉丝: "我准了！！！",
      帕派瑞: "我准了！！！",
      帕派瑞斯: "这没啥不合适的！！",
      阿派瑞斯: "我准了！！！",
      杉: "好。",
      衫: "好。",
      杉哥: "好。",
      衫哥: "好。",
      杉斯: "没门。",
      衫斯: "没门。",
      snas: "啥？",
      鳝丝: "啥？",
      衫衫: "啥？",
      杉杉: "啥？",

      鱼姐: "嘎啊，行行行。",
      安黛: "嘎啊，行行行。",
      安黛因: "找个你自己的名字去！",

      宅龙: "呃... 行吧？",
      艾菲: "呃... 行吧？",
      艾菲斯: "别-别这么做。",
      meta: "哦！！！\n你在推广我的品牌吗？",
      镁塔: "哦！！！\n你在推广我的品牌吗？",
      镁塔顿: "哦！！！\n你在推广我的品牌吗？",

      羊爸: "可以？",
      艾斯戈: "可以？",
      艾斯戈尔: "不可以。",
      艾斯利尔: "...",
      小羊: "...",
      艾斯利: "...",

      创伤: '嗯...？',
      击败: '嗯...？',
      伤害: '嗯...？',
      调情: '嗯...？',
      屠杀: '嗯...？',
      杀戮: '嗯...？',
      动乱: '嗯...？',
      仁慈: '嗯...？',
      饶恕: '嗯...？',
      谋杀: '嗯...？',
      和平: '嗯...？',

      创伤线: '嗯...？',
      调情线: '嗯...？',
      屠杀线: '嗯...？',
      动乱线: '嗯...？',
      和平线: '嗯...？',

      训练人偶: "............\n（他好像不怎么健谈。）",
      人偶: "............\n（他好像不怎么健谈。）",
      小匿: '你好。',
      匿罗: '你好。',
      小幽: "............\n（它无力阻止你。）",
      纳普斯: "............\n（它无力阻止你。）",
      纳普斯特: "............\n（它无力阻止你。）",
      亚伦: '确定要选择这个名字吗？;)',

      空帽: '快看看我的天线呐！',
      太空帽: '快看看我的天线呐！',
      小酷: '哈哈哈，不错嘛。',
      小酷龙: '哈哈哈，不错嘛。',
      星铁: '是个五“星”级的选择。',
      星铁龙: '是个五“星”级的选择。',
      星儿: '是个五“星”级的选择。',
      狗来米: "嗯？这什么味道？",
      遁狗: "它-它动了！\n它-它-它在抖！",
      杰瑞: "它-它动了！\n它-它-它在抖！",
      大犬: '（狗狗跳到了你的腿上。）',
      小犬: '（狗狗跳到了你的腿上。）',
      大犬座: '（狗狗跳到了你的腿上。）',
      小犬座: '（狗狗跳到了你的腿上。）',
      烤尔比: '（狗狗跳到了你的腿上。）',
      考尔比: '（狗狗跳到了你的腿上。）',
      卡巴克: '尊重我的权威！',
      佐伦: '谢谢你，呃，用我的名字。',
      艾罗戈: '你选择了我，让我深感荣幸。',
      罗曼: '让实验开始吧。',
      托马斯: '让实验开始吧。',
      罗曼教授: '让实验开始吧。',
      罗曼博士: '让实验开始吧。',

      鲍勃: '这名字挺棒的，不是吗？',
      督吉: '这不好笑。',
      小黏团: '吼。',
      大黏簇: '吼。',
      葛森: '哇哈哈！为什么不呢？',
      愤怒人偶: '什么，什么！什么！！！',
      怪物小孩: "那是我的名字！！",
      玛菲特: '啊呼呼呼~\n你尝起来肯定很不错，甜心~',
      顽鳄: "很遗憾，你少写了个字。",
      老顽: "很遗憾，你少写了个字。",
      顽顽: '嘿！\n只有刷刷才能这样叫我！',
      害羞塞壬: '...？',
      刷刷: '干净的名字。',
      刷洁顿: '干净的名字。',
      提米: '你吼！！',
      提咪: '你吼！！',

      汉堡裤: '你还真会挑别人剩下的。',
      布莱蒂: '嗯，我想行吧。',
      凯蒂: "布莱蒂！布莱蒂！\n那是我的名字！",
      谜宇人: '一位巫师同伴？',
      老滑头: '不错的选择，小伙子。',
      纳普斯乐: "你这可就不太礼貌了，\n亲爱的。",
      迷你火山: '啊！谢谢你~',
      火焰人: '你知道！？',

      ws3917: "欢迎游玩域外传说！\n如果遇到Bug及时到\n交流群797416533反馈哦。",
      roctd: "§random=1.1/1.1§3.1415⑨§random=0/0§ ...后面是啥来着？\n我数学水平堪比§fill=#0080ff§§random=1.1/1.1§琪露诺§random=0/0§§fill=#fff§，\n等我想完再放你进去...",
      3.1415: "§random=1.1/1.1§3.1415⑨§random=0/0§ ...后面是啥来着？\n我数学水平堪比§fill=#0080ff§§random=1.1/1.1§琪露诺§random=0/0§§fill=#fff§，\n等我想完再放你进去...",
      π: "§random=1.1/1.1§3.1415⑨§random=0/0§ ...后面是啥来着？\n我数学水平堪比§fill=#0080ff§§random=1.1/1.1§琪露诺§random=0/0§§fill=#fff§，\n等我想完再放你进去...",
      雪理奈: "§fill=#ffd1d9§你取了我的名字，\n这意味着你认识我。\n我可以给你一些帮助。§fill=#fff§",
      mdr: '§fill=#888§直入主题吧。§fill=#fff§',
      月亮菌: "§random=1.1/1.1§...我不觉得这个名字好欸bro§random=0/0§",
      屑moons: "§random=1.1/1.1§...我不觉得这个名字好欸bro§random=0/0§",
   },



   

// END-TRANSLATE
   nameChoiceFonts: {
      san: [content.fComicSans, 16],
      sans: [content.fComicSans, 16],
      snas: [content.fComicSans, 16],
      杉: [content.fComicSans, 16],
      衫: [content.fComicSans, 16],
      杉哥: [content.fComicSans, 16],
      衫哥: [content.fComicSans, 16],
      杉斯: [content.fComicSans, 16],
      衫斯: [content.fComicSans, 16],
      鳝丝: [content.fComicSans, 16],
      衫衫: [content.fComicSans, 16],
      杉杉: [content.fComicSans, 16],
      papyrs: [content.fPapyrus, 16],
      papyru: [content.fPapyrus, 16],
      papyrus: [content.fPapyrus, 16],
      帕: [content.fPapyrus, 16],
      帕帕: [content.fPapyrus, 16],
      帕派肉丝: [content.fPapyrus, 16],
      帕帕肉丝: [content.fPapyrus, 16],
      帕派瑞: [content.fPapyrus, 16],
      帕派瑞斯: [content.fPapyrus, 16],
      阿派瑞斯: [content.fPapyrus, 16]
   } as Partial<CosmosKeyed<[CosmosFont, number]>>,
   nameChoiceRestrictions: [
      '',
      'alphys',
      '艾菲斯',
      'asgore',
      '艾斯戈尔',
      'asriel',
      '艾斯利尔',
      'frisk',
      '弗里斯克',
      'sans',
      '杉斯',
      '衫斯',
      'toriel',
      '托丽尔',
      'twinkl',
      'twinky',
      'twnkly',
      '闪闪',
      'undyne',
      '安黛因',
      "roctd",
      "3.1415",
      "π"
   ],
   namePromptX: 20,
   nameValueY: 0,
   nameLetterMap: [],
   nameLetterPosition: () => ({ x: 0, y: 0 }),
   nameLetterValidation: (char: string) => {
      return /[\S]/g.test(char);
   },
   nameQuitX: 0,
   nameBackspaceX: 28,
   nameDoneX: 14,
   nameConfirmX: -4,
   nameNoX: 4,
   nameYesX: 3,
   nameValueTranslator(value: string) {
      return value.toLowerCase();
   },
   nameGoBackX: 0,
   saveLVX: 8,
   saveReturnX: 18,
   saveSaveX: 14,
   settingsHeaderX: 0,
   statBoxSizeX: 22.5,
   textFormat(text: string, length = Infinity, plain = false) {
      let output = '';
      const raw = CosmosTyper.strip(text);
      const indent = raw[0] === '*';
      if (raw.length > length) {
         let braces = false;
         let sections = false;
         for (const char of text) {
            output += char;
            switch (char) {
               case '§':
                  sections = !sections;
                  break;
               case '{':
                  braces = true;
                  break;
               case '}':
                  braces = false;
                  break;
               default:
                  if (!braces && !sections) {
                     const lines = output.split('\n');
                     const ender = lines[lines.length - 1];
                     if (CosmosTyper.strip(ender).length > length) {
                        const words = ender.split(' ');
                        output = `${lines.slice(0, -1).join('\n')}${lines.length > 1 ? '\n' : ''}${words
                           .slice(0, -1)
                           .join(' ')}\n${indent ? '  ' : ''}${words[words.length - 1]}`;
                     }
                  }
            }
         }
      } else {
         output = text;
      }
      return plain
         ? output
         : output
            .replace(cjk2latin, '$1{#i/x0.5}$2')
            .replace(latin2cjk, '$1{#i/x2}$2')
            .replace(/,([\n ])/g, ',{^3}$1')
            .replace(/，/g, '，{^4}')
            .replace(/~([\n ])/g, '~{^4}$1')
            .replace(/\n\*/g, '{^5}\n*')
            .replace(/([.?!。？！])([\n ])/g, '$1{^5}$2')
            .replace(/:([\n ])/g, ':{^6}$1')
            .replace(/([-、])/g, '$1{^2}')
            .replace(/：/g, '：{^6}');
   },
   textLength(text: string) {
      let value = 0;
      for (const char of text) {
         value += cjk.test(char) ? 1 : 1;
      }
      return value;
   },
   textLengthPrecise(text: string) {
      let value = 0;
      for (const char of text) {
         value += cjk.test(char) ? 1.875 : 1;
      }
      return value;
   }
};
