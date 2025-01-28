import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'it_IT';

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
        
        '': 'Dovresti scegliere un nome.',
        no: 'No?',

        
        bully: 'Hm...?',
        flirt: 'Hm...?',
        geno: 'Hm...?',
        mercy: 'Hm...?',
        murder: 'Hm...?',
        paci: 'Hm...?',
        maybe: 'Forse?',
        yes: 'Si?',

        
        afraid: 'Coraggio.\nNon c\'è nulla di cui aver paura.',
        amused: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        angry: 'Coraggio.\nLe tue frustrazioni stanno sparendo.',
        angsty: 'Coraggio.\nLa storia e tua, non importa come ti senti.',
        antsy: 'Possa la tranquillità salire mentre intraprendi il tuo viaggio.',
        bored: 'Coraggio.\nLa tua storia è interessante quanto la realizzi.',
        brainy: 'Possa la qualità della tue parole tradursi in azione durante il tuo viaggio.',
        brave: 'Un cuore coraggioso ti sarà utile nel tuo viaggio.',
        brazen: 'Un cuore coraggioso ti sarà utile nel tuo viaggio.',
        calm: 'Un senso di serenità farà miracoli nel tuo viaggio',
        clever: 'Possa il tuo ingegno superare le sfide del tuo viaggio.',
        cocky: 'Una mentalità sicura ti porterà lontano nel tuo viaggio.',
        crafty: 'Possa il tuo ingegno superare le sfide del tuo viaggio.',
        crazy: 'Possa l\'equilibrio salire mentre intraprendi il tuo viaggio.',
        daring: 'Un cuore coraggioso ti sarà utile nel tuo viaggio.',
        dizzy: 'Possa l\'equilibrio salire mentre intraprendi il tuo viaggio.',
        dumb: 'Coraggio.\nC\'è molto da imparare sulla strada da percorrere.',
        edgy: 'Possa l’arazzo del caos e dell’ordine soddisfarti nel tuo viaggio.',
        elated: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        empty: 'Possa la tua storia ottenere significato in questo bozzolo in mezzo all\'oscurità',
        flirty: 'Possa l\'esperienza essere giocosa quanto desideri.',
        giddy: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        goofy: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        greedy: 'Possa l\'esperienza essere eccessiva quanto desideri.',
        guilty: 'Coraggio.\nNon hai nulla di cui vergognarti adesso.',
        happy: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        hollow: 'Possa la tua storia ottenere significato in questo bozzolo in mezzo all\'oscurità',
        humble: 'Un ego moderato ti porterà lontano nel tuo viaggio.',
        hungry: 'Possa l’esperienza fornire le risorse di cui hai bisogno.',
        insane: 'Possa l\'equilibrio salire mentre intraprendi il tuo viaggio.',
        irate: 'Coraggio.\nLe tue frustrazioni stanno sparendo.',
        jaded: 'Possa la tua storia suscitare l’emozione che cerchi di provare.',
        lazy: 'Possano le tue scelte essere facili.',
        lively: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        livid: 'Coraggio.\nLe tue frustrazioni stanno sparendo.',
        lonely: 'Coraggio.\nC\'è molta compagnia da avere qui.',
        lucky: 'Possa la tua fortuna portarti avanti nel tuo viaggio.',
        mad: 'Coraggio.\nLe tue frustrazioni stanno sparendo.',
        manic: 'Possa l\'equilibrio salire mentre intraprendi il tuo viaggio.',
        meek: 'Un ego moderato ti porterà lontano nel tuo viaggio.',
        modest: 'Un ego moderato ti porterà lontano nel tuo viaggio.',
        nervy: 'Possa la tranquillità salire mentre intraprendi il tuo viaggio.',
        moody: 'Coraggio.\nLa storia e tua, non importa come ti senti.',
        numb: 'Possa la tua storia suscitare l’emozione che cerchi di provare.',
        proud: 'Una mentalità sicura ti porterà lontano nel tuo viaggio.',
        rowdy: 'Possa l\'arazzo del caos e dell\'ordine compiacerti nel tuo viaggio.',
        sad: 'Coraggio.\nLa tua storia è edificante così come la realizzi.',
        sane: 'Possa la tua stabilità fornire una solida base per il tuo viaggio.',
        sassy: 'Possa l\'esperienza essere giocosa quanto desideri.',
        sated: 'Possa l\'esperienza aumentare solo il tuo stato di soddisfazione.',
        scared: 'Coraggio.\nNon c\'è nulla di cui aver paura.',
        serene: 'Un senso di serenità farà miracoli nel tuo viaggio',
        shy: 'Possa l\'esperienza essere comoda come desideri.',
        silly: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        sleepy: 'Possa l’esperienza fornire l’energia di cui hai bisogno.',
        smug: 'Una mentalità sicura ti porterà lontano nel tuo viaggio.',
        sorry: 'Coraggio.\nNon hai nulla di cui vergognarti adesso.',
        spry: 'Possa la tua traboccante energia alimentarti durante il tuo viaggio.',
        steady: 'Possa la tua stabilità fornire una solida base per il tuo viaggio.',
        stupid: 'Coraggio.\nC\'è molto da imparare sulla strada da percorrere.',
        timid: 'Coraggio.\nNon c\'è nulla di cui aver paura.',
        tired: 'Possa l’esperienza fornire l’energia di cui hai bisogno.',
        unruly: 'Possa l\'arazzo del caos e dell\'ordine compiacerti nel tuo viaggio.',
        wacky: 'Uno spirito spensierato ti sarà utile durante il tuo viaggio.',
        witty: 'Possa la qualità della tue parole tradursi in azione durante il tuo viaggio.',
        zen: 'Possa la tua stabilità fornire una solida base per il tuo viaggio.',

        
        erogot: 'Sono onorato della tua scelta.',
        roman: 'Che l\'esperimento abbia inizio.',
        thomas: 'Che l\'esperimento abbia inizio.',

        
        chara: 'Il vero nome.',
        frisk: 'Questo nome è sbagliato.',

        
        blooky: "............\n(Non ha il potere di fermarti.)",
        dummy: "............\n(Non è di molte parole.)",
        lurky: 'Ciao.',
        mushy: 'In sella!',
        napsta: "............\n(Non ha il potere di fermarti.)",
        torie: 'Beh... Suppongo funzioni',
        toriel: 'Credo che dovresti scegliere un nome tutto tuo, tesoro mio.',
        twink: 'Davvero...',
        twinkl: 'Bel tentativo, idiota.',
        twinky: 'Bel tentativo, idiota.',
        walker: 'Non intendi \"Eyewalker?\"',

        
        astro: 'Guarda la mia antenna!',
        cdrake: 'Guh huh huh, ben fatto.',
        chilly: 'Guh huh huh, ben fatto.',
        dogamy: "Huh? Cos'è quest'odore?",
        doggo: "Si sta m-muovendo! S-S-Sta tremando!",
        jerry: 'Jerry.',
        major: '(Il cane ti è saltato nelle ginocchia.)',
        minor: '(Pant pant)',
        papyrs: "IO LO CONCEDO!!!!",
        papyru: "IO LO CONCEDO!!!!",
        san: 'ok.',
        sans: 'eh no.',
        sdrake: 'Una scelta \"stellare\"',
        serf: 'Guarda la mia antenna!',
        starry: 'Una scelta \"stellare\"',

        
        bob: 'Un nome gradevole, no?',
        doge: 'Non sono felice.',
        gelata: 'Roar.',
        gerson: 'Wah ha ha! Perchè no?',
        mdummy: 'Cosa. Cosa! COSA!',
        mkid: "Quello è il mio nome!!",
        monkid: "Quello è il mio nome!!",
        muffet: 'Ahuhuhu~\nDevi avere un ottimo gusto, tesoro~',
        raddy: 'Hey!\nSolo Skrubby può chiamarmi così!',
        radtie: "Scusa, ma sei timido.",
        radtil: "Scusa, ma sei timido.",
        shyren: '...?',
        skrub: 'Nome pulito.',
        skrubb: 'Nome pulito.',
        tem: 'hOI!',
        temmie: 'hOI!',
        undyn: 'Ngah, va bene.',
        undyne: 'Scegliti il TUO di nome!',

        
        alphy: 'Uh.... OK?',
        alphys: "N-non farlo",
        bpants: 'Stai veramente raschiando il fondo del barile',
        bratty: 'Tipo, OK credo',
        burgie: 'Ti piace il mio nome, piccoletto',
        catty: "Bratty! Bratty! Quello e il MIO nome!",
        cozmo: 'Un compagno mago?',
        glyde: 'Scelta astuta, bellezza.',
        hapsta: "Ora sei semplicemente scortese, tesoro.",
        mett: 'OOOOH!!! STAI PROMUOVENDO IL MIO MARCHIO?',
        metta: 'OOOOH!!! STAI PROMUOVENDO IL MIO MARCHIO?',
        mtt: 'OOOOH!!! STAI PROMUOVENDO IL MIO MARCHIO?',

        
        aaron: 'Questo nome è corretto? ;)',
        grillb: 'Caldo, ma non abasstanza.',
        grilly: 'Caldo, ma non abasstanza.',
        gyft: "Non devi farlo...",
        heats: 'Lo SAI!?',
        kabakk: 'Rispetta la mia AUTORITÀ',
        vulkin: 'Ahh! Grazie~',
        zorren: 'Grazie per, uh, usare il mio nome.',

        
        asgor: 'Puoi?',
        asgore: 'Non puoi.',
        asrie: '... va bene.',
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
    nameType: [],
    nameLetterMap: [[
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
        ['Y', 'Z', 'À', 'È', 'É', 'Ì', 'Ò', 'Ù'],

        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
        ['y', 'z', 'à', 'è', 'é', 'ì', 'ò', 'ù']
    ]],
    nameLetterPosition: (index: number, page: number) => {
        const alphabetSize = 32;
        const lineLength = 8;

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
