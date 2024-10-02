import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosTyper } from '../../../code/systems/storyteller';

const cjk = /[\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF]/;
const cjk2latin =
   /([\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])([^/=}\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF]|$)/g;
const latin2cjk =
   /(^|[^/={\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])([\u2000-\u221F\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFFF])/g;

// START-TRANSLATE



export const LANGUAGE = "ja_JP";

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
      
      '': 'なまえを　つけてください。',
      no: 'いいえ？',

      
      bully: 'えっ？',
      flirt: 'えっ？',
      geno: 'えっ？',
      mercy: 'えっ？',
      murder: 'えっ？',
      paci: 'えっ？',
      maybe: 'たぶん？',
      yes: 'はい？',

      
      afraid: 'ゆうきを　だして。\nなにも　おそれることは　ないよ。',
      amused: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      angry: 'ゆうきを　だして。\nざせつはもう　すぎさったよ。',
      angsty: 'ゆうきを　だして。\nなにを　かんじても\nものがたりは　あなたのものですよ。',
      antsy: 'たびが　じゅんちょうで\nありますように。',
      bored: 'ゆうきを　だして。\nかきたければ　おもしろい\nじんせいを　かくことができるよ。',
      brainy: 'ことばのしつが　たびのなかで\nこうどうに　かわりますように。',
      brave: 'ゆうきあるこころは\nたびで　よくやくだつでしょう。',
      brazen: 'ゆうきあるこころは\nたびで　よくやくだつでしょう。',
      calm: 'しずかなかんじは　たびに\nきせきを　おこすでしょう。',
      clever: 'ちえが　たびのちょうせんに\nうちかちますように。',
      cocky: 'じしんをも　つきもちが\nさらに　ぜんしんさせるでしょう。',
      crafty: 'ちえが　たびのちょうせんに\nうちかちますように。',
      crazy: 'たびが　こうへいで\nありますように。',
      daring: 'ゆうきあるこころは\nたびで　よくやくだつでしょう。',
      dizzy: 'たびが　こうへいで\nありますように。',
      dumb: 'ゆうきを　だして。\nこれからのみちで\nまなぶべきことは　たくさんあります。',
      edgy: 'こんらんと　ちつじょのきぬが\nたびを　じゅうじつさせますように。',
      elated: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      empty: 'くらやみの　まゆのなかで\nものがたりが　いみを　もちますように。',
      flirty: 'このけいけんが　のぞむように\nおもしろく　なりますように。',
      giddy: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      goofy: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      greedy: 'このけいけんが　のぞむように\nじゅうじつしますように。',
      guilty: 'ゆうきを　だして。\nなにも　はじることは　ないよ。',
      happy: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      hollow: 'くらやみの　まゆのなかで\nものがたりが　いみを　もちますように。',
      humble: 'てきどなワガママが\nさらに　とおざけるでしょう。',
      hungry: 'このけいけんが\nえいように　なりますように。',
      insane: 'たびが　こうへいで\nありますように。',
      irate: 'ゆうきを　だして。\nざせつはもう　すぎさったよ。',
      jaded: 'ものがたりが　けんめいに\nかんじる　かんじょうを\nあたえますように。',
      lazy: 'せんたくが　らくに\nなりますように。',
      lively: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      livid: 'ゆうきを　だして。\nざせつはもう　すぎさったよ。',
      lonely: 'ゆうきを　だして。\nたくさんの　ともたちが\nできますよ。',
      lucky: 'こううんが　たびを\nぜんしんさせます　ように。',
      mad: 'ゆうきを　だして。\nざせつはもう　すぎさったよ。',
      manic: 'たびが　こうへいで\nありますように。',
      meek: 'てきどなワガママが\nさらに　とおざけるでしょう。',
      modest: 'てきどなワガママが\nさらに　とおざけるでしょう。',
      nervy: 'たびが　じゅんちょうで\nありますように。',
      moody: 'ゆうきを　だして。\nなにを　かんじても\nものがたりは　あなたのものですよ。',
      numb: 'ものがたりが　けんめいに\nかんじる　かんじょうを\nあたえますように。',
      proud: 'じしんをも　つきもちが\nさらに　ぜんしんさせるでしょう。',
      rowdy: 'こんらんと　ちつじょのきぬが\nたびを　よろこばせますように。',
      sad: 'ゆうきを　だして。\nかきたければ　わくわくする\nじんせいを　かくことができるよ。',
      sane: 'りせいが　たびの　きょうこな\nきばんと　なりますように。',
      sassy: 'このけいけんが　のぞむように\nおもしろく　なりますように。',
      sated: 'このけいけんが　まんぞくかんを\nますだけで　ありますように。',
      scared: 'ゆうきを　だして。\nなにも　おそれることは　ないよ。',
      serene: 'しずかなかんじは　たびに\nきせきを　おこすでしょう。',
      shy: 'このけいけんが　のぞむように\nなぐさめに　なりますように。',
      silly: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      sleepy: 'このけいけんが　ひつような\nエネルギーに　なりますように。',
      smug: 'じしんをも　つきもちが\nさらに　ぜんしんさせるでしょう。',
      sorry: 'ゆうきを　だして。\nなにも　はじることは　ないよ。',
      spry: 'あふれるエネルギーが\nたびのちからに　なりますように。',
      steady: 'りせいが　たびの　きょうこな\nきばんと　なりますように。',
      stupid: 'ゆうきを　だして。\nこれからのみちで\nまなぶべきことは　たくさんあります。',
      timid: 'ゆうきを　だして。\nなにも　おそれることは　ないよ。',
      tired: 'このけいけんが　ひつような\nエネルギーに　なりますように。',
      unruly: 'こんらんと　ちつじょのきぬが\nたびを　よろこばせますように。',
      wacky: 'ようきな　せいしんは\nたびで　よくやくだつでしょう。',
      witty: 'ことばのしつが　たびのなかで\nこうどうに　かわりますように。',
      zen: 'りせいが　たびの　きょうこな\nきばんと　なりますように。',

      
      erogot: 'こうえいの　いたり。',
      roman: 'じっけんを　はじめよう。',
      thomas: 'じっけんを　はじめよう。',

      
      chara: 'ほんとうのなまえ。',
      frisk: 'ちょっとちがう　なまえ。',

      
      blooky: "…………\n(とめるちからは　ない)",
      dummy: "…………\n(かいわは　はずまなかった)",
      lurky: 'こんにちは。',
      mushy: 'じゅんび　ばんたんだ！',
      napsta: "…………\n(とめるちからは　ない)",
      torie: 'Well... I suppose that works...',
      toriel: 'ちゃんと　なまえを\nかんがえるのよ。',
      twink: 'マジで…',
      twinkl: 'あますぎるよ　バカ。',
      twinky: 'あますぎるよ　バカ。',
      walker: '「アイウォーカー」の\nことですか？',

      
      astro: 'Check out my antenna!',
      cdrake: 'Guh huh huh, nice one.',
      chilly: 'Guh huh huh, nice one.',
      dogamy: "Huh? What's that smell?",
      doggo: "It's m-moving! I-I-It's shaking!",
      jerry: 'ジェリー。',
      major: '(The dog jumped into your lap.)',
      minor: '(へっ…　へっ…)',
      papyrs: "オレさまは\nべつに\nいいよッ！",
      papyru: "オレさまは\nべつに\nいいよッ！",
      san: 'ほーい。',
      sans: 'ダメだぜ。',
      sdrake: '「ステラ」な　なまえだな。',
      serf: 'Check out my antenna!',
      starry: '「ステラ」な　なまえだな。',

      
      bob: 'A pleasing nomenclature, no?',
      doge: 'I am not amused.',
      gelata: 'Roar.',
      gerson: 'ワッハッハッ！\nそりゃあいい！',
      mdummy: 'あ？　なんだよ！\nああんッ！！',
      mkid: "That's my name!!",
      monkid: "That's my name!!",
      muffet: 'Ahuhuhu~\nYou must have great taste, dearie~',
      raddy: 'Hey!\nOnly Skrubby gets to call me that!',
      radtie: "Sorry, but you're a letter shy.",
      radtil: "Sorry, but you're a letter shy.",
      shyren: '…？',
      skrub: 'せいけつな　なまえ。',
      skrubb: 'せいけつな　なまえ。',
      tem: 'ホィ！',
      temmie: 'ホィ！',
      undyn: 'Ngah, fine.',
      undyne: 'ひとの　なまえを\nパクるな！',

      
      alphy: 'う…　うん\nいいよ…',
      alphys: "ダ…　ダメだよっ！",
      bpants: '…なまえの\nネタぎれ？',
      bratty: 'べつに　いいけどぉ～？',
      burgie: 'You like my name, little buddy?',
      catty: "アリゲッティ！　みて！\nアタシのなまえ\nだしぃ～！",
      cozmo: 'A fellow wizard?',
      glyde: 'Slick choice, homeslice.',
      hapsta: "Now you're just being rude, darling.",
      mett: 'おお！！キミ！！\nせんでん　してくれるのかい？',
      metta: 'おお！！キミ！！\nせんでん　してくれるのかい？',
      mtt: 'おお！！キミ！！\nせんでん　してくれるのかい？',

      
      aaron: 'このなまえで\nよろしいですか？(^_-)☆',
      grillb: 'Hot, but not hot enough.',
      grilly: 'Hot, but not hot enough.',
      gyft: "You don't have to do that...",
      heats: 'わかるんですか！？',
      kabakk: 'Respect my AUTHORITY!',
      vulkin: 'Ahh! Thank you~',
      zorren: 'Thanks for, uh, using my name.',

      
      asgor: 'そのなまえは　けっこう？',
      asgore: 'そのなまえは　ダメだ。',
      asriel: '…',
      asrie: '... fine.',
   },



   

// END-TRANSLATE
   nameChoiceFonts: {
      san: [content.fComicSans, 16],
      sans: [content.fComicSans, 16],
      snas: [content.fComicSans, 16],
      papyrs: [content.fPapyrus, 16],
      papyru: [content.fPapyrus, 16],
   } as Partial<CosmosKeyed<[CosmosFont, number]>>,
   nameChoiceRestrictions: [
      '',
      'alphys',
      'asgore',
      'asriel',
      'frisk',
      'sans',
      'toriel',
      'twinkl',
      'twinky',
      'twnkly',
      'undyne'
   ],
   namePromptX: 0,
   nameValueY: 14,
   nameLetterMap: [],
   nameLetterPosition: () => ({ x: 0, y: 0 }),
   nameLetterValidation: (char: string) => {
      return /[A-Za-z\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F]/g.test(char);
   },
   nameQuitX: 0,
   nameBackspaceX: 28,
   nameDoneX: 14,
   nameConfirmX: -4,
   nameNoX: 4,
   nameValueTranslator(value: string) {
      value = value.replace(/[\u30A1-\u30F6\uFF66-\uFF9F]/g, (char) => {
         const code = char.charCodeAt(0);
         if (code >= 0xFF66 && code <= 0xFF9F) {
            return String.fromCharCode(code - 0xFF66 + 0x30A1);
         }
         return String.fromCharCode(code - 0x60);
      });
      return value.toLowerCase();
   },
   nameYesX: 3,
   nameGoBackX: 0,
   saveLVX: 8,
   saveReturnX: 18,
   saveSaveX: 14,
   settingsHeaderX: 0,
   statBoxSizeX: 22.5,
   textFormat(text: string, length = Infinity, plain = false) {
      let output = '';
      const raw = CosmosTyper.strip(text);
      const indent = raw[0] === '＊';
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
                        const words = ender.split(/[　 ]/);
                        output = `${lines.slice(0, -1).join('\n')}${lines.length > 1 ? '\n' : ''}${words
                           .slice(0, -1)
                           .join('　')}\n${indent ? '　' : ''}${words[words.length - 1]}`;
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
         value += cjk.test(char) ? 1.5 : 1;
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
