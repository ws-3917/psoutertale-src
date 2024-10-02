import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosTyper } from '../../../code/systems/storyteller';

const cjk = /[\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF]/;
const cjk2latin =
   /([\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])([^/=}\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF]|$)/g;
const latin2cjk =
   /(^|[^/={\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])([\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])/g;

// START-TRANSLATE



export const LANGUAGE = "zh_TW-alt";

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
      
      '': '你必須選定一個名字。',
      no: 'No？',

      
      bully: '嗯...？',
      flirt: '嗯...？',
      geno: '嗯...？',
      mercy: '嗯...？',
      murder: '嗯...？',
      paci: '嗯...？',
      maybe: '也許吧？',
      yes: 'Yes？',

      
      afraid: '打起精神來。\n這兒沒什麼好怕的。',
      amused: '輕裝上陣，\n你的旅途將會更加順利。',
      angry: '打起精神來。\n讓不如意的事情隨風而去吧。',
      angsty: '打起精神來。\n不管你心情如何，\n講你自己的故事。',
      antsy: '願平靜如微風，\n伴你踏上旅程中的每一步。',
      bored: '打起精神來。\n只要你想，那就必然能\n書寫趣味人生。',
      brainy: '願你言行不渝，\n在旅途中化為行動的力量。',
      brave: '勇敢的心將成為\n你旅途中的最佳夥伴。',
      brazen: '勇敢的心將成為\n你旅途中的最佳夥伴。',
      calm: '內心的寧靜將為你的旅途\n帶來奇蹟。',
      clever: '願你足智多謀，\n戰勝此次旅途的重重困難。',
      cocky: '心態堅定，\n你會在旅途中一往無前。',
      crafty: '願你足智多謀，\n戰勝此次旅途的重重困難。',
      crazy: '願你心態平和，\n在旅途中收穫平衡與安寧。',
      daring: '勇敢的心將成為\n你旅途中的最佳夥伴。',
      dizzy: '願你心態平和，\n在旅途中收穫平衡與安寧。',
      dumb: '打起精神來。\n前路漫漫，許多未知\n亟待你來求索。',
      edgy: '願你安之若素，\n飽覽混沌與秩序交織的圖景。',
      elated: '輕裝上陣，\n你的旅途將會更加順利。',
      empty: '願你受益匪淺，\n在黑暗的囚籠中找尋到意義。',
      flirty: '願從你心所欲，\n享受此番經歷的樂趣與玩味。',
      giddy: '輕裝上陣，\n你的旅途將會更加順利。',
      goofy: '輕裝上陣，\n你的旅途將會更加順利。',
      greedy: '願從你心所欲，\n享受此番經歷的充實與豐盈。',
      guilty: '打起精神來。\n沒什麼好慚愧的。',
      happy: '輕裝上陣，\n你的旅途將會更加順利。',
      hollow: '願你受益匪淺，\n在黑暗的囚籠中找尋到意義。',
      humble: '謙虛敬慎，\n你會在旅途中一往無前。',
      hungry: '願你大快朵頤，\n攫取旅途一點一滴的滋養。',
      insane: '願你心態平和，\n在旅途中收穫平衡與安寧。',
      irate: '打起精神來。\n讓不如意的事情隨風而去吧。',
      jaded: 'May your story bring forth the emotion you strive to feel.',
      lazy: '願你安閒自在，\n毫不費力地\n做出你的選擇。',
      lively: '輕裝上陣，\n你的旅途將會更加順利。',
      livid: '打起精神來。\n讓不如意的事情隨風而去吧。',
      lonely: '打起精神來。\n登上此次旅途，\n友情將伴你而行。',
      lucky: '願你好運連連，\n總有順水順風推助你前行。',
      mad: '打起精神來。\n讓不如意的事情隨風而去吧。',
      manic: '願你心態平和，\n在旅途中收穫平衡與安寧。',
      meek: '謙虛敬慎，\n你會在旅途中一往無前。',
      modest: '謙虛敬慎，\n你會在旅途中一往無前。',
      nervy: '願平靜如微風，\n伴你踏上旅程中的每一步。',
      moody: '打起精神來。\n不管你心情如何，\n講你自己的故事。',
      numb: 'May your story bring forth the emotion you strive to feel.',
      proud: '心態堅定，\n你會在旅途中一往無前。',
      rowdy: '願你安之若素，\n享受混沌與秩序交織的圖景。',
      sad: '打起精神來。\n只要你想，那就必然能\n書寫勵志人生。',
      sane: '願你處事泰然，\n以理智為此次旅程的基石。',
      sassy: '願從你心所欲，\n享受此番經歷的樂趣與玩味。',
      sated: 'May the experience only add to your state of satisfaction.',
      scared: '打起精神來。\n這兒沒什麼好怕的。',
      serene: '內心的寧靜將為你的旅途\n帶來奇蹟。',
      shy: '願從你心所欲，\n享受此番經歷的撫慰與關懷。',
      silly: '輕裝上陣，\n你的旅途將會更加順利。',
      sleepy: '願你恢復元氣，\n攝取旅途一點一滴的能量。',
      smug: '心態堅定，\n你會在旅途中一往無前。',
      sorry: '打起精神來。\n沒什麼好慚愧的。',
      spry: '願你精神飽滿，\n卯足的幹勁\n祝你一路前行。',
      steady: '願你處事泰然，\n以理智為此次旅程的基石。',
      stupid: '打起精神來。\n前路漫漫，許多未知\n亟待你來求索。',
      timid: '打起精神來。\n這兒沒什麼好怕的。',
      tired: '願你恢復元氣，\n攝取旅途一點一滴的能量。',
      unruly: '願你安之若素，\n享受混沌與秩序交織的圖景。',
      wacky: '輕裝上陣，\n你的旅途將會更加順利。',
      witty: '願你言行不渝，\n在旅途中化為行動的力量。',
      zen: '願你處事泰然，\n以理智為此次旅程的基石。',

      
      erogot: '你選擇了我，讓我深感榮幸。',
      roman: '讓實驗開始吧。',
      thomas: '讓實驗開始吧。',

      
      chara: '真正的名字。',
      frisk: '這名字不對。',

      
      blooky: "............\n（它無力阻止你。）",
      dummy: "............\n（他好像不怎麼健談。）",
      lurky: '你好。',
      mushy: '上馬！',
      napsta: "............\n（它無力阻止你。）",
      torie: '嗯... 我想這個名字可以...',
      toriel: '我覺得，\n你應該想個自己的名字。\n我的孩子。',
      twink: '真的嗎...',
      twinkl: '想得美，蠢貨。',
      twinky: '想得美，蠢貨。',
      walker: '你是指「眼行家」？',

      
      astro: '快看看我的天線吶！',
      cdrake: '哈哈哈，不錯嘛。',
      chilly: '哈哈哈，不錯嘛。',
      dogamy: "嗯？這什麼味道？",
      doggo: "它-它動了！\n它-它-它在抖！",
      jerry: '傑瑞。',
      major: '（狗狗跳到了你的腿上。）',
      minor: '（喘氣！喘氣！）',
      papyrs: "我準了！！！",
      papyru: "我準了！！！",
      san: '好。',
      sans: '沒門。',
      sdrake: '是個五「星」級的選擇。',
      serf: '快看看我的天線吶！',
      starry: '是個五「星」級的選擇。',

      
      bob: '這名字挺棒的，不是嗎？',
      doge: '這不好笑。',
      gelata: '吼。',
      gerson: '哇哈哈！為什麼不呢？',
      mdummy: '什麼，什麼！什麼！！！',
      mkid: "那是我的名字！！",
      monkid: "那是我的名字！！",
      muffet: '啊呼呼呼~\n你嘗起來肯定很不錯，甜心~',
      raddy: '嘿！\n只有刷刷才能這樣叫我！',
      radtie: "很遺憾，你少寫了個字。",
      radtil: "很遺憾，你少寫了個字。",
      shyren: '...？',
      skrub: '乾淨的名字。',
      skrubb: '乾淨的名字。',
      tem: '你吼！！',
      temmie: '你吼！！',
      undyn: '嘎啊，行行行。',
      undyne: '找個你自己的名字去！',

      
      alphy: '呃... 行吧？',
      alphys: "別-別這麼做。",
      bpants: '你還真會挑別人剩下的。',
      bratty: '嗯，我想行吧。',
      burgie: '你是喜歡我的名字嗎，\n小傢伙？',
      catty: "布萊蒂！布萊蒂！\n那是我的名字！",
      cozmo: '一位巫師同伴？',
      glyde: '不錯的選擇，小夥子。',
      hapsta: "你這可就不太禮貌了，\n親愛的。",
      mett: '喔！！！\n你在推廣我的品牌嗎？',
      metta: '喔！！！\n你在推廣我的品牌嗎？',
      mtt: '喔！！！\n你在推廣我的品牌嗎？',

      
      aaron: '確定要選擇這個名字嗎？;)',
      grillb: '很熱，但還不夠熱。',
      grilly: '很熱，但還不夠熱。',
      gyft: "沒必要這樣...",
      heats: '你知道！？',
      kabakk: '尊重我的權威！',
      vulkin: '啊！謝謝你~',
      zorren: '謝謝你，呃，用我的名字。',

      
      asgor: '可以？',
      asgore: '不可以。',
      asriel: '...',
      asrie: '...行。',

      
      char: "...真正的名字？",
      查拉: "真正的名字。",
      猹: "...真正的名字？",
      卡拉: "...真正的名字？",
      恰拉: "...真正的名字？",
      fris: "這名字... 不對吧？",
      frask: "這名字... 不對吧？",
      弗裡斯克: "這名字不對。",
      福: "這名字... 不對吧？",
      福瑞斯克: "這名字... 不對吧？",

      羊媽: "嗯... 我想這個名字可以...",
      托麗: "嗯... 我想這個名字可以...",
      托麗爾: "我覺得，\n你應該想個自己的名字。\n我的孩子。",
      閃閃: "想得美，蠢貨。",

      papyrus: "這沒啥不合適的！！",
      帕: "我準了！！！",
      帕帕: "我準了！！！",
      帕派肉絲: "我準了！！！",
      帕帕肉絲: "我準了！！！",
      帕派瑞: "我準了！！！",
      帕派瑞斯: "這沒啥不合適的！！",
      阿派瑞斯: "我準了！！！",
      杉: "好。",
      衫: "好。",
      杉哥: "好。",
      衫哥: "好。",
      杉斯: "沒門。",
      衫斯: "沒門。",
      snas: "啥？",
      鱔絲: "啥？",
      衫衫: "啥？",
      杉杉: "啥？",

      魚姐: "嘎啊，行行行。",
      安黛: "嘎啊，行行行。",
      安黛因: "找個你自己的名字去！",

      宅龍: "呃... 行吧？",
      艾菲: "呃... 行吧？",
      艾菲斯: "別-別這麼做。",
      meta: "喔！！！\n你在推廣我的品牌嗎？",
      鎂塔: "喔！！！\n你在推廣我的品牌嗎？",
      鎂塔頓: "喔！！！\n你在推廣我的品牌嗎？",

      羊爸: "可以？",
      艾斯戈: "可以？",
      艾斯戈爾: "不可以。",
      艾斯利爾: "...",
      小羊: "...",
      艾斯利: "...",

      創傷: '嗯...？',
      擊敗: '嗯...？',
      傷害: '嗯...？',
      調情: '嗯...？',
      屠殺: '嗯...？',
      殺戮: '嗯...？',
      動亂: '嗯...？',
      仁慈: '嗯...？',
      饒恕: '嗯...？',
      謀殺: '嗯...？',
      和平: '嗯...？',

      創傷線: '嗯...？',
      調情線: '嗯...？',
      屠殺線: '嗯...？',
      動亂線: '嗯...？',
      和平線: '嗯...？',

      訓練人偶: "............\n（他好像不怎麼健談。）",
      人偶: "............\n（他好像不怎麼健談。）",
      小匿: '你好。',
      匿羅: '你好。',
      小幽: "............\n（它無力阻止你。）",
      納普斯: "............\n（它無力阻止你。）",
      納普斯特: "............\n（它無力阻止你。）",
      亞倫: '確定要選擇這個名字嗎？;)',

      空帽: '快看看我的天線吶！',
      太空帽: '快看看我的天線吶！',
      小酷: '哈哈哈，不錯嘛。',
      小酷龍: '哈哈哈，不錯嘛。',
      星鐵: '是個五「星」級的選擇。',
      星鐵龍: '是個五「星」級的選擇。',
      星兒: '是個五「星」級的選擇。',
      狗來米: "嗯？這什麼味道？",
      遁狗: "它-它動了！\n它-它-它在抖！",
      傑瑞: "它-它動了！\n它-它-它在抖！",
      大犬: '（狗狗跳到了你的腿上。）',
      小犬: '（狗狗跳到了你的腿上。）',
      大犬座: '（狗狗跳到了你的腿上。）',
      小犬座: '（狗狗跳到了你的腿上。）',
      烤爾比: '（狗狗跳到了你的腿上。）',
      考爾比: '（狗狗跳到了你的腿上。）',
      卡巴克: '尊重我的權威！',
      佐倫: '謝謝你，呃，用我的名字。',
      艾羅戈: '你選擇了我，讓我深感榮幸。',
      羅曼: '讓實驗開始吧。',
      託馬斯: '讓實驗開始吧。',
      羅曼教授: '讓實驗開始吧。',
      羅曼博士: '讓實驗開始吧。',

      鮑勃: '這名字挺棒的，不是嗎？',
      督吉: '這不好笑。',
      小黏團: '吼。',
      大黏簇: '吼。',
      葛森: '哇哈哈！為什麼不呢？',
      憤怒人偶: '什麼，什麼！什麼！！！',
      怪物小孩: "那是我的名字！！",
      瑪菲特: '啊呼呼呼~\n你嘗起來肯定很不錯，甜心~',
      頑鱷: "很遺憾，你少寫了個字。",
      老頑: "很遺憾，你少寫了個字。",
      頑頑: '嘿！\n只有刷刷才能這樣叫我！',
      害羞塞壬: '...？',
      刷刷: '乾淨的名字。',
      刷潔頓: '乾淨的名字。',
      提米: '你吼！！',
      提咪: '你吼！！',

      漢堡褲: '你還真會挑別人剩下的。',
      布萊蒂: '嗯，我想行吧。',
      凱蒂: "布萊蒂！布萊蒂！\n那是我的名字！",
      謎宇人: '一位巫師同伴？',
      老滑頭: '不錯的選擇，小夥子。',
      納普斯樂: "你這可就不太禮貌了，\n親愛的。",
      迷你火山: '啊！謝謝你~',
      火焰人: '你知道！？',

      ws3917: "歡迎遊玩域外傳說！\n如果遇到Bug及時到\n交流群797416533反饋喔。",
      roctd: "§random=1.1/1.1§3.1415⑨§random=0/0§ ...後面是啥來著？\n我數學水平堪比§fill=#0080ff§§random=1.1/1.1§琪露諾§random=0/0§§fill=#fff§，\n等我想完再放你進去...",
      3.1415: "§random=1.1/1.1§3.1415⑨§random=0/0§ ...後面是啥來著？\n我數學水平堪比§fill=#0080ff§§random=1.1/1.1§琪露諾§random=0/0§§fill=#fff§，\n等我想完再放你進去...",
      π: "§random=1.1/1.1§3.1415⑨§random=0/0§ ...後面是啥來著？\n我數學水平堪比§fill=#0080ff§§random=1.1/1.1§琪露諾§random=0/0§§fill=#fff§，\n等我想完再放你進去...",
      雪理奈: "§fill=#ffd1d9§你取了我的名字，\n這意味著你認識我。\n我可以給你一些幫助。§fill=#fff§",
      mdr: '§fill=#888§直入主題吧。§fill=#fff§',
      月亮菌: "§random=1.1/1.1§...我不覺得這個名字好欸bro§random=0/0§",
      屑moons: "§random=1.1/1.1§...我不覺得這個名字好欸bro§random=0/0§",
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
      鱔絲: [content.fComicSans, 16],
      衫衫: [content.fComicSans, 16],
      杉杉: [content.fComicSans, 16],
      papyrs: [content.fPapyrus, 16],
      papyru: [content.fPapyrus, 16],
      papyrus: [content.fPapyrus, 16],
      帕: [content.fPapyrus, 16],
      帕帕: [content.fPapyrus, 16],
      帕派肉絲: [content.fPapyrus, 16],
      帕帕肉絲: [content.fPapyrus, 16],
      帕派瑞: [content.fPapyrus, 16],
      帕派瑞斯: [content.fPapyrus, 16],
      阿派瑞斯: [content.fPapyrus, 16]
   } as Partial<CosmosKeyed<[CosmosFont, number]>>,
   nameChoiceRestrictions: [
      '',
      'alphys',
      '艾菲斯',
      'asgore',
      '艾斯戈爾',
      'asriel',
      '艾斯利爾',
      'frisk',
      '弗裡斯克',
      'sans',
      '杉斯',
      '衫斯',
      'toriel',
      '托麗爾',
      'twinkl',
      'twinky',
      'twnkly',
      '閃閃',
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
