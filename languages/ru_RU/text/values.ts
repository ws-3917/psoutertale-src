import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'ru_RU';

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
        
        '': 'Вы должны выбрать имя.',
        no: 'Нет?',

        
        bully: 'Хм?..',
        flirt: 'Хм?..',
        geno: 'Хм?..',
        mercy: 'Хм?..',
        murder: 'Хм?..',
        paci: 'Хм?..',
        maybe: 'Наверное?',
        yes: 'Да?',

        
        afraid: 'Не унывайте.\nЗдесь нечего бояться.',
        amused: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        angry: 'Не унывайте.\nВаши страдания уже позади.',
        angsty: 'Не унывайте.\nЭта история - ваша, что бы вы ни чувствовали.',
        antsy: 'Пусть на вашем пути царит спокойствие.',
        bored: 'Не унывайте.\nВаша история интересна настолько, насколько вы ей позволите.',
        brainy: 'Пусть ваша речь перейдёт в действие на вашем пути.',
        brave: 'Отважное сердце сослужит хорошую службу на вашем пути.',
        brazen: 'Отважное сердце сослужит хорошую службу на вашем пути.',
        calm: 'Спокойствие ума сотворит чудеса на вашем пути.',
        clever: 'Пусть ваше мастерство превзойдёт все трудности на вашем пути.',
        cocky: 'A confident mindset will take you far on your journey.',
        crafty: 'May your inginuity surpass the challanges on your journey.',
        crazy: 'May balance come upon you as you embark on your journey.',
        daring: 'Отважное сердце сослужит хорошую службу на вашем пути.',
        dizzy: 'May balance come upon you as you embark on your journey.',
        dumb: 'Take heart.\nThere is much to be learned on the road ahead.',
        edgy: 'May the tapestry of chaos and order satisfy you on your journey.',
        elated: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        empty: 'May your story gain meaning in this cocoon amidst the darkness.',
        flirty: 'May the experience be as playful as you desire.',
        giddy: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        goofy: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        greedy: 'May the experience be as excessive as you desire.',
        guilty: 'Take heart.\nYou have nothing to feel ashamed of now.',
        happy: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        hollow: 'May your story gain meaning in this cocoon amidst the darkness.',
        humble: 'A temperate ego will take you far on your journey.',
        hungry: 'May the experience provide the sustenance you require.',
        insane: 'May balance come upon you as you embark on your journey.',
        irate: 'Не унывайте.\nВаши страдания уже позади.',
        jaded: 'May your story bring forth the emotion you strive to feel.',
        lazy: 'May your choices be as effortless as they come.',
        lively: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        livid: 'Не унывайте.\nВаши страдания уже позади.',
        lonely: 'Take heart.\nThere is much companionship to be had here.',
        lucky: 'May your fortune carry you forward on your journey.',
        mad: 'Не унывайте.\nВаши страдания уже позади.',
        manic: 'May balance come upon you as you embark on your journey.',
        meek: 'A temperate ego will take you far on your journey.',
        modest: 'A temperate ego will take you far on your journey.',
        nervy: 'Пусть на вашем пути царит спокойствие.',
        moody: 'Не унывайте.\nЭта история - ваша, что бы вы ни чувствовали.',
        numb: 'May your story bring forth the emotion you strive to feel.',
        proud: 'A confident mindset will take you far on your journey.',
        rowdy: 'May the tapestry of chaos and order please you on your journey.',
        sad: 'Take heart.\nYour story is as uplifting as you make it.',
        sane: 'May your stability provide a solid foundation on your journey.',
        sassy: 'May the experience be as playful as you desire.',
        sated: 'May the experience only add to your state of satisfaction.',
        scared: 'Не унывайте.\nЗдесь нечего бояться.',
        serene: 'Спокойствие ума сотворит чудеса на вашем пути.',
        shy: 'May the experience be as comforting as you desire.',
        silly: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        sleepy: 'May the experience provide the energy you require.',
        smug: 'A confident mindset will take you far on your journey.',
        sorry: 'Take heart.\nYou have nothing to feel ashamed of now.',
        spry: 'May your overflowing energy power you through your journey.',
        steady: 'May your stability provide a solid foundation on your journey.',
        stupid: 'Take heart.\nThere is much to be learned on the road ahead.',
        timid: 'Не унывайте.\nЗдесь нечего бояться.',
        tired: 'May the experience provide the energy you require.',
        unruly: 'May the tapestry of chaos and order please you on your journey.',
        wacky: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        witty: 'Пусть ваша речь перейдёт в действие на вашем пути.',
        zen: 'May your stability provide a solid foundation on your journey.',

        
        erogot: 'I am honored by your choice.',
        roman: 'Let the experiment begin.',
        thomas: 'Let the experiment begin.',

        
        chara: 'The true name.',
        frisk: 'This name is incorrect.',

        
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
        walker: 'Don\'t you mean \"Eyewalker?\"',

        
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
        sdrake: 'A \"stellar\" choice.',
        serf: 'Check out my antenna!',
        starry: 'A \"stellar\" choice.',

        
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

        
        aaron: 'Is this name correct? ;)',
        grillb: 'Hot, but not hot enough.',
        grilly: 'Hot, but not hot enough.',
        gyft: "You don't have to do that...",
        heats: 'You KNEW!?',
        kabakk: 'Respect my AUTHORITY!',
        vulkin: 'Ahh! Thank you~',
        zorren: 'Thanks for, uh, using my name.',

        
        asgor: 'You can?',
        asgore: 'You cannot.',
        asrie: '... fine.',
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
    nameLetterMap: [
        [
            ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З'],
            ['И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р'],
            ['С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ'],
            ['Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
            ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з'],
            ['и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р'],
            ['с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'],
            ['ъ', 'ы', 'ь', 'э', 'ю', 'я']
        ]
    ],
    nameLetterPosition: (index: number, page: number) => {
        // variables
        const alphabetSize = 33;
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
