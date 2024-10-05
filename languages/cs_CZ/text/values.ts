import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'cs_CZ';

export default {
   cellInventoryX: 0,
   cellBoxX: 0,
   cellFinishX: 0,
   footerX: 0,
   itemEquipX: 0,
   itemUseX: 0,
   itemInfoX_equip: 0,
   itemInfoX_use: 0,
   itemDropX_equip: 0,
   itemDropX_use: 0,
   loadContinueX: 0,
   loadLVX: 0,
   loadObserveX: 0,
   loadResetX: 0,
   loadSettingsX: 0,
   loadTimeX: 0,
   loadTrueResetX: 0,
   nameChoiceCameos: <CosmosKeyed<string>>{
      
      '': 'Musíš si vybrat jména.',
      no: 'Ne?',

      
      bully: 'Hm...?',
      flirt: 'Hm...?',
      geno: 'Hm...?',
      mercy: 'Hm...?',
      murder: 'Hm...?',
      paci: 'Hm...?',
      maybe: 'Možná?',
      yes: 'Ano?',

      
      afraid: 'Vzchopte se.\nTady se není čeho bát.',
      amused: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      angry: 'Vzchopte se.\nVaše frustrace jsou nyní za vámi.',
      angsty: 'Vzchopte se.\nPříběh je váš, bez ohledu na to, co cítíte.',
      antsy: 'Kéž na vás přijde klid, když se vydáte na cestu.',
      bored: 'Vzchopte se.\nTvůj příběh je stejně zajímavý, jak si ho uděláš.',
      brainy: 'Ať se vaše kvalita řeči promítne do činů na vaší cestě.',
      brave: 'Odvážné srdce vám na vaší cestě dobře poslouží.',
      brazen: 'Odvážné srdce vám na vaší cestě dobře poslouží.',
      calm: 'Pocit klidu s vámi na vaší cestě udělá zázraky.',
      clever: 'Ať vaše vynalézavost překoná výzvy na vaší cestě.',
      cocky: 'Sebevědomé myšlení vás dovede daleko na vaší cestě.',
      crafty: 'Ať vaše vynalézavost překoná výzvy na vaší cestě.',
      crazy: 'Kéž na vás přijde rovnováha, když se vydáte na cestu.',
      daring: 'Odvážné srdce vám na vaší cestě dobře poslouží.',
      dizzy: 'Kéž na vás přijde rovnováha, když se vydáte na cestu.',
      dumb: 'Vzchopte se.\nNa cestě před námi se lze mnohému naučit.',
      edgy: 'Kéž vás tapisérie chaosu a řádu uspokojí na vaší cestě.',
      elated: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      empty: 'Ať váš příběh získá smysl v tomto zámotku uprostřed temnoty.',
      flirty: 'Ať je zážitek tak hravý, jak si přejete.',
      giddy: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      goofy: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      greedy: 'Kéž je zážitek tak přehnaný, jak si přejete.',
      guilty: 'Vzchopte se.\nTeď se nemáš za co stydět.',
      happy: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      hollow: 'Ať váš příběh získá smysl v tomto zámotku uprostřed temnoty.',
      humble: 'Umírněné ego vás na vaší cestě dovede daleko.',
      hungry: 'Kéž vám zkušenost poskytne obživu, kterou požadujete.',
      insane: 'Kéž na vás přijde rovnováha, když se vydáte na cestu.',
      irate: 'Vzchopte se.\nVaše frustrace jsou nyní za vámi.',
      jaded: 'Kéž váš příběh vyvolá emoce, které se snažíte cítit.',
      lazy: 'Ať jsou vaše volby tak snadné, jak přicházejí.',
      lively: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      livid: 'Vzchopte se.\nVaše frustrace jsou nyní za vámi.',
      lonely: 'Vzchopte se.\nJe zde mnoho přátelství.',
      lucky: 'Ať vás vaše jmění nese na vaší cestě vpřed.',
      mad: 'Vzchopte se.\nVaše frustrace jsou nyní za vámi.',
      manic: 'Kéž na vás přijde rovnováha, když se vydáte na cestu.',
      meek: 'Umírněné ego vás na vaší cestě dovede daleko.',
      modest: 'Umírněné ego vás na vaší cestě dovede daleko.',
      nervy: 'Kéž na vás přijde klid, když se vydáte na cestu.',
      moody: 'Vzchopte se.\nPříběh je váš, bez ohledu na to, co cítíte.',
      numb: 'Kéž váš příběh vyvolá emoce, které se snažíte cítit.',
      proud: 'Sebevědomé myšlení vás dovede daleko na vaší cestě.',
      rowdy: 'Kéž vás na vaší cestě potěší tapisérie chaosu a řádu.',
      sad: 'Vzchopte se.\nVáš příběh je tak povznášející, jak si ho uděláte.',
      sane: 'Ať vám vaše stabilita poskytne pevný základ na vaší cestě.',
      sassy: 'Ať je zážitek tak hravý, jak si přejete.',
      sated: 'Kéž tato zkušenost jen přispěje k vašemu stavu spokojenosti.',
      scared: 'Vzchopte se.\nTady se není čeho bát.',
      serene: 'Pocit klidu s vámi na vaší cestě udělá zázraky.',
      shy: 'Nechť je tato zkušenost tak uklidňující, jak si přejete.',
      silly: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      sleepy: 'Kéž vám tato zkušenost dodá potřebnou energii.',
      smug: 'Sebevědomé myšlení vás dovede daleko na vaší cestě.',
      sorry: 'Vzchopte se.\nTeď se nemáš za co stydět.',
      spry: 'Kéž vás vaše překypující energie posílí na vaší cestě.',
      steady: 'Ať vám vaše stabilita poskytne pevný základ na vaší cestě.',
      stupid: 'Vzchopte se.\nNa cestě před námi se lze mnohému naučit.',
      timid: 'Vzchopte se.\nTady se není čeho bát.',
      tired: 'Kéž vám tato zkušenost dodá potřebnou energii.',
      unruly: 'Kéž vás na vaší cestě potěší tapisérie chaosu a řádu.',
      wacky: 'Na vaší cestě vám dobře poslouží lehkovážný duch.',
      witty: 'Ať se vaše kvalita řeči promítne do činů na vaší cestě.',
      zen: 'Ať vám vaše stabilita poskytne pevný základ na vaší cestě.',

      
      erogot: 'Jsem poctěn vaší volbou.',
      roman: 'Nechť experiment začne.',
      thomas: 'Nechť experiment začne.',

      
      chara: 'Pravé jméno.',
      frisk: 'Tento název je nesprávný.',

      
      blooky: "............\n(Jsou bezmocní, aby vás zastavili.)",
      dummy: "............\n(Není to moc na konverzaci.)",
      lurky: 'Ahoj.',
      mushy: 'Osedlej se!',
      napsta: "............\n(Jsou bezmocní, aby vás zastavili.)",
      torie: 'Dobře... Předpokládám, že to funguje...',
      toriel: 'Myslím, že bys měl myslet na své vlastní jméno, mé dítě.',
      twink: 'Vážně...',
      twinkl: 'Pěkný pokus, idiote.',
      twinky: 'Pěkný pokus, idiote.',
      walker: 'Nemyslíte \"Eyewalker\"?',

      
      astro: 'Podívejte se na mou anténu!',
      cdrake: 'Guh huh huh, pěkný.',
      chilly: 'Guh huh huh, pěkný.',
      dogamy: "Co? Co je to za vůni?",
      doggo: "H-hýbe se! T-T-Třese se!",
      jerry: 'Jerry.',
      major: '(Pes vám skočil do klína.)',
      minor: '(Pant pant)',
      papyrs: "DOVOLÍM TO!!!",
      papyru: "DOVOLÍM TO!!!",
      san: 'ok.',
      sans: 'ne.',
      sdrake: '\"Hvězdná\" volba.',
      serf: 'Podívejte se na mou anténu!',
      starry: '\"Hvězdná\" volba.',

      
      bob: 'Příjemná nomenklatura, ne?',
      doge: 'Nebaví mě to.',
      gelata: 'Řev.',
      gerson: 'Wah ha ha! Proč ne?',
      mdummy: 'Co. Co! CO!',
      mkid: "To je moje jméno!!",
      monkid: "To je moje jméno!!",
      muffet: 'Ahuhuhu~\nMusíš mít skvělý vkus, drahoušku~',
      raddy: 'Hej!\nTak mi může říkat jen Skrubby!',
      radtie: "Promiňte, ale jste dopis stydlivý.",
      radtil: "Promiňte, ale jste dopis stydlivý.",
      shyren: '...?',
      skrub: 'Čistý název.',
      skrubb: 'Čistý název.',
      tem: 'hOI!',
      temmie: 'hOI!',
      undyn: 'Ngah, dobře.',
      undyne: 'Získejte své VLASTNÍ jméno!',

      
      alphy: 'Uh.... OK?',
      alphys: "N-nedělejte to.",
      bpants: 'Opravdu škrábete na dně sudu.',
      bratty: 'Jako, dobře, myslím.',
      burgie: 'Líbí se ti moje jméno, kamaráde?',
      catty: "Bratty! Bratty! To je MOJE jméno!",
      cozmo: 'Kolega kouzelník?',
      glyde: 'Úhledná volba, domácí řez.',
      hapsta: "Teď jsi jen hrubý, miláčku.",
      mett: 'OOOOH!! PROPAGUJETE MOU ZNAČKU?',
      metta: 'OOOOH!! PROPAGUJETE MOU ZNAČKU?',
      mtt: 'OOOOH!! PROPAGUJETE MOU ZNAČKU?',

      
      aaron: 'Je tento název správný? ;)',
      grillb: 'Horko, ale ne dost horko.',
      grilly: 'Horko, ale ne dost horko.',
      gyft: "To nemusíte dělat...",
      heats: 'VÍŠ!?',
      kabakk: 'Respektujte mou AUTORITU!',
      vulkin: 'Ahh! Děkuju~',
      zorren: 'Díky za, ehm, použití mého jména.',

      
      asgor: 'Můžeš?',
      asgore: 'Nemůžeš.',
      asrie: '... dobře.',
      asriel: '...'
   },

   

// END-TRANSLATE
   nameChoiceFonts: {
      san: [content.fComicSans, 16],
      sans: [content.fComicSans, 16],
      papyrs: [content.fPapyrus, 16],
      papyru: [content.fPapyrus, 16]
   } as Partial<CosmosKeyed<[CosmosFont, number]>>,
   nameChoiceRestrictions: ['', 'alphys', 'asgore', 'asriel', 'frisk', 'sans', 'toriel', 'twinkl', 'twinky', 'undyne'],
   namePromptX: 0,
   nameValueY: 0,
   nameLetterMap: [
      ['A', 'Á', 'B', 'C', 'Č', 'D', 'Ď', 'E', 'É'],
      ['Ě', 'F', 'G', 'H', 'Ch', 'I', 'Í', 'J', 'K'],
      ['L', 'M', 'N', 'Ň', 'O', 'Ó', 'P', 'Q', 'R'],
      ['Ř', 'S', 'Š', 'T', 'Ť', 'U', 'Ú', 'Ů', 'V'],
      ['W', 'X', 'Y', 'Ý', 'Z', 'Ž'],
      ['a', 'á', 'b', 'c', 'č', 'd', 'ď', 'e', 'é'],
      ['ě', 'f', 'g', 'h', 'ch', 'i', 'í', 'j', 'k'],
      ['l', 'm', 'n', 'ň', 'o', 'ó', 'p', 'q', 'r'],
      ['ř', 's', 'š', 't', 'ť', 'u', 'ú', 'ů', 'v'],
      ['w', 'x', 'y', 'ý', 'z', 'ž']
   ],
   nameLetterPosition: (index: number) => {
      // variables
      const alphabetSize = 42;
      const lineLength = 9;

      // computation
      const position = index % alphabetSize;
      return {
         x: 312 + CosmosMath.spread(192, position % lineLength, lineLength),
         y:
            (index < alphabetSize ? 200 : 320) +
            CosmosMath.spread(42, Math.floor(position / lineLength), Math.ceil(alphabetSize / lineLength))
      };
   },
   nameLetterValidation: (char: string) => {
      return /[A-Za-z]/g.test(char);
   },
   nameValueTranslator(value: string) {
      return value.toLowerCase();
   },
   nameQuitX: 0,
   nameBackspaceX: 0,
   nameDoneX: 0,
   nameConfirmX: 0,
   nameNoX: 0,
   nameYesX: 0,
   nameGoBackX: 0,
   papyrusFontSize1: 16,
   papyrusSpacingX: -0.375,
   papyrusSpacingY: 3,
   papyrusWritingMode: 'horizontal-tb',
   saveLVX: 0,
   saveReturnX: 0,
   saveSaveX: 0,
   settingsHeaderX: 0,
   statBoxSizeX: 0,
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
            .replace(/-/g, '-{^2}')
            .replace(/,([\n ])/g, ',{^3}$1')
            .replace(/~([\n ])/g, '~{^4}$1')
            .replace(/\n\*/g, '{^5}\n*')
            .replace(/([.?!])([\n ])/g, '$1{^5}$2')
            .replace(/:([\n ])/g, ':{^6}$1');
   },
   textLength(text: string) {
      return text.length;
   },
   textLengthPrecise(text: string) {
      return text.length;
   },
   textPunctuation(char: string) {
      return /[\s\.\,\!\?\~\*\-]/g.test(char);
   }
};
