import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE
export const LANGUAGE = 'en_US';

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
      // no names
      '': 'You must choose a name.',
      no: 'No?',

      // meta names
      bully: 'Hm...?',
      flirt: 'Hm...?',
      geno: 'Hm...?',
      mercy: 'Hm...?',
      murder: 'Hm...?',
      paci: 'Hm...?',
      maybe: 'Maybe?',
      yes: 'Yes?',

      // mood names
      afraid: 'Take heart.\nThere is nothing to be afraid of here.',
      amused: 'A light-hearted spirit will serve you well on your journey.',
      angry: 'Take heart.\nYour frustrations are behind you now.',
      angsty: 'Take heart.\nThe story is yours, no matter what you feel.',
      antsy: 'May tranquility come upon you as you embark on your journey.',
      bored: 'Take heart.\nYour story is as interesting as you make it.',
      brainy: 'May your quality of speech translate to action on your journey.',
      brave: 'A courageous heart will serve you well on your journey.',
      brazen: 'A courageous heart will serve you well on your journey.',
      calm: 'A sense of serenity will do you wonders on your journey.',
      clever: 'May your ingenuity surpass the challenges on your journey.',
      cocky: 'A confident mindset will take you far on your journey.',
      crafty: 'May your inginuity surpass the challanges on your journey.',
      crazy: 'May balance come upon you as you embark on your journey.',
      daring: 'A courageous heart will serve you well on your journey.',
      dizzy: 'May balance come upon you as you embark on your journey.',
      dumb: 'Take heart.\nThere is much to be learned on the road ahead.',
      edgy: 'May the tapestry of chaos and order satisfy you on your journey.',
      elated: 'A light-hearted spirit will serve you well on your journey.',
      empty: 'May your story gain meaning in this cocoon amidst the darkness.',
      flirty: 'May the experience be as playful as you desire.',
      giddy: 'A light-hearted spirit will serve you well on your journey.',
      goofy: 'A light-hearted spirit will serve you well on your journey.',
      greedy: 'May the experience be as excessive as you desire.',
      guilty: 'Take heart.\nYou have nothing to feel ashamed of now.',
      happy: 'A light-hearted spirit will serve you well on your journey.',
      hollow: 'May your story gain meaning in this cocoon amidst the darkness.',
      humble: 'A temperate ego will take you far on your journey.',
      hungry: 'May the experience provide the sustenance you require.',
      insane: 'May balance come upon you as you embark on your journey.',
      irate: 'Take heart.\nYour frustrations are behind you now.',
      jaded: 'May your story bring forth the emotion you strive to feel.',
      lazy: 'May your choices be as effortless as they come.',
      lively: 'A light-hearted spirit will serve you well on your journey.',
      livid: 'Take heart.\nYour frustrations are behind you now.',
      lonely: 'Take heart.\nThere is much companionship to be had here.',
      lucky: 'May your fortune carry you forward on your journey.',
      mad: 'Take heart.\nYour frustrations are behind you now.',
      manic: 'May balance come upon you as you embark on your journey.',
      meek: 'A temperate ego will take you far on your journey.',
      modest: 'A temperate ego will take you far on your journey.',
      nervy: 'May tranquility come upon you as you embark on your journey.',
      moody: 'Take heart.\nThe story is yours, no matter what you feel.',
      numb: 'May your story bring forth the emotion you strive to feel.',
      proud: 'A confident mindset will take you far on your journey.',
      rowdy: 'May the tapestry of chaos and order please you on your journey.',
      sad: 'Take heart.\nYour story is as uplifting as you make it.',
      sane: 'May your stability provide a solid foundation on your journey.',
      sassy: 'May the experience be as playful as you desire.',
      sated: 'May the experience only add to your state of satisfaction.',
      scared: 'Take heart.\nThere is nothing to be afraid of here.',
      serene: 'A sense of serenity will do you wonders on your journey.',
      shy: 'May the experience be as comforting as you desire.',
      silly: 'A light-hearted spirit will serve you well on your journey.',
      sleepy: 'May the experience provide the energy you require.',
      smug: 'A confident mindset will take you far on your journey.',
      sorry: 'Take heart.\nYou have nothing to feel ashamed of now.',
      spry: 'May your overflowing energy power you through your journey.',
      steady: 'May your stability provide a solid foundation on your journey.',
      stupid: 'Take heart.\nThere is much to be learned on the road ahead.',
      timid: 'Take heart.\nThere is nothing to be afraid of here.',
      tired: 'May the experience provide the energy you require.',
      unruly: 'May the tapestry of chaos and order please you on your journey.',
      wacky: 'A light-hearted spirit will serve you well on your journey.',
      witty: 'May your quality of speech translate to action on your journey.',
      zen: 'May your stability provide a solid foundation on your journey.',

      // historical figures
      erogot: 'I am honored by your choice.',
      roman: 'Let the experiment begin.',
      thomas: 'Let the experiment begin.',

      // humans
      chara: 'The true name.',
      frisk: 'This name is incorrect.',

      // outlands
      blooky: "............\n(They're powerless to stop you.)",
      dummy: "............\n(It's not much for conversation.)",
      lurky: 'Hello.',
      mushy: 'Saddle up!',
      napsta: "............\n(They're powerless to stop you.)",
      torie: 'Well... I suppose that works...',
      toriel: 'I think you should think of your own name, my child.',
      twink: 'Really...',
      twinkl: 'Nice try, idiot.',
      twinky: 'Nice try, idiot.',
      walker: 'Don\'t you mean "Eyewalker?"',

      // starton
      astro: 'Check out my antenna!',
      cdrake: 'Guh huh huh, nice one.',
      chilly: 'Guh huh huh, nice one.',
      dogamy: "Huh? What's that smell?",
      doggo: "It's m-moving! I-I-It's shaking!",
      jerry: 'Jerry.',
      major: '(The dog jumped into your lap.)',
      minor: '(Pant pant)',
      papyrs: "I'LL ALLOW IT!!!!",
      papyru: "I'LL ALLOW IT!!!!",
      san: 'ok.',
      sans: 'nope.',
      sdrake: 'A "stellar" choice.',
      serf: 'Check out my antenna!',
      starry: 'A "stellar" choice.',

      // foundry
      bob: 'A pleasing nomenclature, no?',
      doge: 'I am not amused.',
      gelata: 'Roar.',
      gerson: 'Wah ha ha! Why not?',
      mdummy: 'What. What! WHAT!',
      mkid: "That's my name!!",
      monkid: "That's my name!!",
      muffet: 'Ahuhuhu~\nYou must have great taste, dearie~',
      raddy: 'Hey!\nOnly Skrubby gets to call me that!',
      radtie: "Sorry, but you're a letter shy.",
      radtil: "Sorry, but you're a letter shy.",
      shyren: '...?',
      skrub: 'Clean name.',
      skrubb: 'Clean name.',
      tem: 'hOI!',
      temmie: 'hOI!',
      undyn: 'Ngah, fine.',
      undyne: 'Get your OWN name!',

      // aerialis
      alphy: 'Uh.... OK?',
      alphys: "D-don't do that.",
      bpants: 'You are really scraping the bottom of the barrel.',
      bratty: 'Like, OK I guess.',
      burgie: 'You like my name, little buddy?',
      catty: "Bratty! Bratty! That's MY name!",
      cozmo: 'A fellow wizard?',
      glyde: 'Slick choice, homeslice.',
      hapsta: "Now you're just being rude, darling.",
      mett: 'OOOOH!!! ARE YOU PROMOTING MY BRAND?',
      metta: 'OOOOH!!! ARE YOU PROMOTING MY BRAND?',
      mtt: 'OOOOH!!! ARE YOU PROMOTING MY BRAND?',

      // notable NPCs
      aaron: 'Is this name correct? ;)',
      grillb: 'Hot, but not hot enough.',
      grilly: 'Hot, but not hot enough.',
      gyft: "You don't have to do that...",
      heats: 'You KNEW!?',
      kabakk: 'Respect my AUTHORITY!',
      vulkin: 'Ahh! Thank you~',
      zorren: 'Thanks for, uh, using my name.',

      // citadel
      asgor: 'You can?',
      asgore: 'You cannot.',
      asrie: '... fine.',
      asriel: '...'
   },

   // END-TRANSLATE
   nameChoiceFonts: {
      san: [ content.fComicSans, 16 ],
      sans: [ content.fComicSans, 16 ],
      papyrs: [ content.fPapyrus, 16 ],
      papyru: [ content.fPapyrus, 16 ]
   } as Partial<CosmosKeyed<[CosmosFont, number]>>,
   nameChoiceRestrictions: [ '', 'alphys', 'asgore', 'asriel', 'frisk', 'sans', 'toriel', 'twinkl', 'twinky', 'undyne' ],
   namePromptX: 0,
   nameValueY: 0,
   nameLetterMap: [
      [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
      [ 'H', 'I', 'J', 'K', 'L', 'M', 'N' ],
      [ 'O', 'P', 'Q', 'R', 'S', 'T', 'U' ],
      [ 'V', 'W', 'X', 'Y', 'Z' ],
      [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
      [ 'h', 'i', 'j', 'k', 'l', 'm', 'n' ],
      [ 'o', 'p', 'q', 'r', 's', 't', 'u' ],
      [ 'v', 'w', 'x', 'y', 'z' ]
   ],
   nameLetterPosition: (index: number) => {
      // variables
      const alphabetSize = 26;
      const lineLength = 7;

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
   nameValueTranslator (value: string) {
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
   textFormat (text: string, length = Infinity, plain = false) {
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
   textLength (text: string) {
      return text.length;
   },
   textLengthPrecise (text: string) {
      return text.length;
   },
   textPunctuation (char: string) {
      return /[\s\.\,\!\?\~\*\-]/g.test(char);
   }
};
