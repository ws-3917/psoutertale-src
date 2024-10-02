import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'es_ES';

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
      
      '': 'Debes elegir un nombre.',
      no: '¿No?',

      
      bully: '¿Mmm...?',
      flirt: '¿Mmm...?',
      geno: '¿Mmm...?',
      mercy: '¿Mmm...?',
      murder: '¿Mmm...?',
      paci: '¿Mmm...?',
      maybe: '¿Quizás?',
      yes: '¿Sí?',

      
      afraid: 'Tranquilo.\nNo hay nada que temer aquí.',
      amused: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      angry: 'Tranquilo.\nTus frustraciones están detrás ahora.',
      angsty: 'Tranquilo.\nLa historia es tuya, sin importar lo que sientas.',
      antsy: 'Que la tranquilidad te invada al emprender tu viaje.',
      bored: 'Tranquilo.\nTu historia es tan interesante como la haces ver.',
      brainy: 'Que la calidad del discurso se traduzca en acciones en su viaje.',
      brave: 'Un corazón valiente te será de gran utilidad en tu viaje.',
      brazen: 'Un corazón valiente te será de gran utilidad en tu viaje.',
      calm: 'Una sensación de serenidad te hará maravillas en tu viaje.',
      clever: 'Que tu ingenio supere los desafíos de tu viaje.',
      cocky: 'Una mentalidad segura te llevará lejos en tu viaje.',
      crafty: 'Que tu ingenio supere los desafíos de tu viaje.',
      crazy: 'Que el equilibrio te alcance mientras te embarcas en tu viaje.',
      daring: 'Un corazón valiente te será de gran utilidad en tu viaje.',
      dizzy: 'Que el equilibrio te alcance mientras te embarcas en tu viaje.',
      dumb: 'Tranquilo.\nHay mucho que aprender en camino por delante.',
      edgy: 'Que el tapiz del caos y el orden te dejen satisfecho en tu viaje.',
      elated: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      empty: 'Que tu historia cobre significado en este capullo en medio de la oscuridad.',
      flirty: 'Que la experiencia sea tan divertida como desees.',
      giddy: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      goofy: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      greedy: 'Que la experiencia sea tan excesiva como desees.',
      guilty: 'Tranquilo.\nNo tienes nada de lo que avergonzarte ahora.',
      happy: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      hollow: 'Que tu historia cobre significado en este capullo en medio de la oscuridad.',
      humble: 'Un ego templado te llevará lejos en tu viaje.',
      hungry: 'Que la experiencia te proporcione el sustento que requieres.',
      insane: 'Que el equilibrio te alcance mientras te embarcas en tu viaje.',
      irate: 'Tranquilo.\nTus frustraciones están detrás ahora.',
      jaded: 'Que tu historia produzca la emoción que te esfuerzas por sentir.',
      lazy: 'Que tus elecciones sean tan sencillas como sean posibles.',
      lively: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      livid: 'Tranquilo.\nTus frustraciones están detrás ahora.',
      lonely: 'Tranquilo.\nHay mucha compañía como para estar mal aquí.',
      lucky: 'Que tu fortuna te acompañe en tu viaje.',
      mad: 'Tranquilo.\nTus frustraciones están detrás ahora.',
      manic: 'Que el equilibrio te alcance mientras te embarcas en tu viaje.',
      meek: 'Un ego templado te llevará lejos en tu viaje.',
      modest: 'Un ego templado te llevará lejos en tu viaje.',
      nervy: 'Que la tranquilidad te invada al emprender tu viaje.',
      moody: 'Tranquilo.\nLa historia es tuya, sin importar lo que sientas.',
      numb: 'Que tu historia produzca la emoción que te esfuerzas por sentir.',
      proud: 'Una mentalidad segura te llevará lejos en tu viaje.',
      rowdy: 'Que el tapiz del caos y el orden te agraden en tu viaje.',
      sad: 'Tranquilo.\nTu historia es tan edificante como la haces ver.',
      sane: 'Que tu estabilidad proporcione una base sólida en tu viaje.',
      sassy: 'Que la experiencia sea tan divertida como desees.',
      sated: 'Que la experiencia sólo aumente tu estado de satisfacción.',
      scared: 'Tranquilo.\nNo hay nada que temer aquí.',
      serene: 'Una sensación de serenidad te hará maravillas en tu viaje.',
      shy: 'Que la experiencia sea tan confortable como deseas.',
      silly: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      sleepy: 'Que la experiencia te proporcione la energía que necesitas.',
      smug: 'Una mentalidad segura te llevará lejos en tu viaje.',
      sorry: 'Tranquilo.\nNo tienes nada de lo que avergonzarte ahora.',
      spry: 'Que tu energía desbordante te impulse a lo largo de tu viaje.',
      steady: 'Que tu estabilidad proporcione una base sólida en tu viaje.',
      stupid: 'Tranquilo.\nHay mucho que aprender en camino por delante.',
      timid: 'Tranquilo.\nNo hay nada que temer aquí.',
      tired: 'Que la experiencia te proporcione la energía que necesitas.',
      unruly: 'Que el tapiz del caos y el orden te agraden en tu viaje.',
      wacky: 'Un espíritu de buen corazón te ayudará en tu aventura.',
      witty: 'Que la calidad del discurso se traduzca en acciones en su viaje.',
      zen: 'Que tu estabilidad proporcione una base sólida en tu viaje.',

      
      erogot: 'Me siento honrado por tu elección.',
      roman: 'Que el experimento empiece.',
      thomas: 'Que el experimento empiece.',

      
      chara: 'El verdadero nombre.',
      frisk: 'Este nombre es incorrecto.',

      
      blooky: "............\n(No tiene poder para pararte.)",
      dummy: "............\n(No hay mucho de que hablar.)",
      lurky: 'Hola.',
      mushy: '¡Ensíllate!',
      napsta: "............\n(No tiene poder para pararte.)",
      torie: 'Bueno... supongo que eso funciona...',
      toriel: 'Creo que deberías pensar en tu propio nombre, mi niño.',
      twink: 'En serio...',
      twinkl: 'Buen intento, idiota.',
      twinky: 'Buen intento, idiota.',
      walker: '¿No quieres decir \"Eyewalker?\"',

      
      astro: '¡Mira mi antena!',
      cdrake: 'Guh eh eh, bonito.',
      chilly: 'Guh eh eh, bonito.',
      dogamy: "¿Eh? ¿Qué es ese olor?",
      doggo: "¡Se está m-moviendo! ¡E-E-Está temblando!",
      jerry: 'Jerry.',
      major: '(El perro saltó a tu regazo.)',
      minor: '(Pant pant)',
      papyrs: "¡¡¡¡LO PERMITO!!!!",
      papyru: "¡¡¡¡LO PERMITO!!!!",
      san: 'vale.',
      sans: 'no.',
      sdrake: 'Una opción \"estelar\".',
      serf: '¡Mira mi antena!',
      starry: 'Una opción \"estelar\".',

      
      bob: 'Una nomenclatura agradable, ¿no?',
      doge: 'No estoy divertido.',
      gelata: 'Grr.',
      gerson: '¡Wah ha ha! ¿Por qué no?',
      mdummy: 'Qué. ¡Qué! ¡QUÉ!',
      mkid: "¡¡Ese es mi nombre!!",
      monkid: "¡¡Ese es mi nombre!!",
      muffet: 'Ajujuju~\nDebes tener buen gusto, querido~',
      raddy: '¡Ey!\n¡Solo Skrubby puede llamarme así!',
      radtie: "Lo siento, pero te falta una letra.",
      radtil: "Lo siento, pero te falta una letra.",
      shyren: '...?',
      skrub: 'Limpio nombre.',
      skrubb: 'Limpio nombre.',
      tem: 'oLI!',
      temmie: 'oLI!',
      undyn: 'Ngah, vale.',
      undyne: '¡Busca tu PROPIO nombre!',

      
      alphy: 'Uh... ¿OK?',
      alphys: "N-No hagas eso.",
      bpants: 'Realmente estás raspando el fondo del barril.',
      bratty: 'Osea, vale, supongo.',
      burgie: '¿Te gusta mi nombre, pequeño amigo?',
      catty: "¡Bratty! ¡Bratty! ¡Ese es MI nombre!",
      cozmo: '¿Un compañero mago?',
      glyde: 'Elección elegante y casera.',
      hapsta: "Ahora solo estás siendo duro, querido.",
      mett: '¡¡¡OOOOH!!! ¿ESTÁS PATROCINANDO MI MARCA?',
      metta: '¡¡¡OOOOH!!! ¿ESTÁS PATROCINANDO MI MARCA?',
      mtt: '¡¡¡OOOOH!!! ¿ESTÁS PATROCINANDO MI MARCA?',

      
      aaron: '¿Es este nombre correcto? ;)',
      grillb: 'Caliente, pero no lo suficiente caliente.',
      grilly: 'Caliente, pero no lo suficiente caliente.',
      gyft: "No tienes que hacer eso...",
      heats: '¿¡LO SABÍAS!?',
      kabakk: '¡Respeta mi AUTORIDAD!',
      vulkin: '¡Ahh! Gracias~',
      zorren: 'Gracias por, eh, usar mi nombre.',

      
      asgor: '¿Puedes?',
      asgore: 'No puedes.',
      asrie: '... vale.',
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
      ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
      ['Ñ', 'O', 'P', 'Q', 'R', 'S', 'T'],
      ['U', 'V', 'W', 'X', 'Y', 'Z'],
      ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      ['h', 'i', 'j', 'k', 'l', 'm', 'n'],
      ['ñ', 'o', 'p', 'q', 'r', 's', 't'],
      ['u', 'v', 'w', 'x', 'y', 'z']
   ],
   nameLetterPosition: (index: number) => {
      // variables
      const alphabetSize = 27;
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
