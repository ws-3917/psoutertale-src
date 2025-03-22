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
        angsty: 'Не унывайте.\nЭта история — ваша, что бы вы ни чувствовали.',
        antsy: 'Пусть на вашем пути царит спокойствие.',
        bored: 'Не унывайте.\nВаша история будет интересна настолько, насколько вы ей позволите.',
        brainy: 'Пусть ваша речь перейдёт в действие на вашем пути.',
        brave: 'Отважное сердце сослужит хорошую службу на вашем пути.',
        brazen: 'Отважное сердце сослужит хорошую службу на вашем пути.',
        calm: 'Спокойствие ума сотворит чудеса на вашем пути.',
        clever: 'Пусть ваше мастерство преодолеет все трудности на вашем пути.',
        cocky: 'Уверенный настрой поможет вам пройти долгий путь.',
        crafty: 'Пусть ваша изобретательность превзойдёт все трудности на вашем пути.',
        crazy: 'Пусть равновесие снизойдёт на вас, когда вы отправитесь в путь.',
        daring: 'Отважное сердце сослужит хорошую службу на вашем пути.',
        dizzy: 'Пусть равновесие снизойдёт на вас, когда вы отправитесь в путь.',
        dumb: 'Не унывайте.\nВпереди вас ждёт много уроков.',
        edgy: 'Пусть гобелен хаоса и порядка поможет вам на вашем пути.',
        elated: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        empty: 'Пусть ваша история обретёт смысл в этом коконе тьмы.',
        flirty: 'Пусть увлекательность этого опыта будет ограничена лишь вашим желанием.',
        giddy: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        goofy: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        greedy: 'Пусть богатство вашего опыта ограничивается лишь вашим желанием.',
        guilty: 'Не унывайте.\nВам больше нечего стыдиться.',
        happy: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        hollow: 'Пусть ваша история обретёт смысл в этом коконе тьмы.',
        humble: 'Умеренное самолюбие поможет вам зайти дальше на вашем пути.',
        hungry: 'Пусть ваш опыт окажет вам поддержку.',
        insane: 'Пусть равновесие снизойдёт на вас, когда вы отправитесь в путь.',
        irate: 'Не унывайте.\nВаши страдания уже позади.',
        jaded: 'Пусть ваша история вызовет те эмоции, к которым вы стремились.',
        lazy: 'Пусть принятие решений вас не тяготит.',
        lively: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        livid: 'Не унывайте.\nВаши страдания уже позади.',
        lonely: 'Не унывайте.\nЗдесь можно найти много друзей.',
        lucky: 'Пусть удача сопутствует вам на вашем пути.',
        mad: 'Не унывайте.\nВаши страдания уже позади.',
        manic: 'Пусть равновесие снизойдёт на вас, когда вы отправитесь в путь.',
        meek: 'Умеренное самолюбие поможет вам зайти дальше на вашем пути.',
        modest: 'Умеренное самолюбие поможет вам зайти дальше на вашем пути.',
        nervy: 'Пусть на вашем пути царит спокойствие.',
        moody: 'Не унывайте.\nЭта история — ваша, что бы вы ни чувствовали.',
        numb: 'Пусть ваша история вызовет те эмоции, к которым вы стремились.',
        proud: 'Уверенный настрой поможет вам пройти долгий путь.',
        rowdy: 'Пусть гобелен хаоса и порядка радует вас на вашем пути.',
        sad: 'Не унывайте.\nВаша история радостна настолько, насколько вы ей позволяете.',
        sane: 'Пусть непоколебимость станет вашим преимуществом.',
        sassy: 'Пусть увлекательность этого опыта будет ограничена лишь вашим желанием.',
        sated: 'Пусть игровой опыт удовлетворит вас.',
        scared: 'Не унывайте.\nЗдесь нечего бояться.',
        serene: 'Спокойствие ума сотворит чудеса на вашем пути.',
        shy: 'Пусть комфорт вашей игры будет ограничен лишь вашим желанием.',
        silly: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        sleepy: 'Пусть ваш игровой опыт наполнит вас энергией.',
        smug: 'Уверенный настрой поможет вам пройти долгий путь.',
        sorry: 'Не унывайте.\nВам больше нечего стыдиться.',
        spry: 'Пусть энергия, струящаяся сквозь вас, поможет на вашем пути.',
        steady: 'Пусть непоколебимость станет вашим преимуществом.',
        stupid: 'Не унывайте.\nВпереди вас ждёт много уроков.',
        timid: 'Не унывайте.\nЗдесь нечего бояться.',
        tired: 'Пусть ваш игровой опыт наполнит вас энергией.',
        unruly: 'Пусть гобелен хаоса и порядка радует вас на вашем пути.',
        wacky: 'Лёгкий настрой сослужит хорошую службу на вашем пути.',
        witty: 'Пусть ваша речь перейдёт в действие на вашем пути.',
        zen: 'Пусть непоколебимость станет вашим преимуществом.',

        
        erogot: 'Ваш выбор — честь для меня.',
        roman: 'Да начнётся же эксперимент.',
        thomas: 'Да начнётся же эксперимент.',

        
        chara: 'Настоящее имя.',
        frisk: 'Это имя введено неверно.',

        
        blooky: "............\n(Они бессильны против вас.)",
        dummy: "............\n(Здесь не о чём говорить.)",
        lurky: 'Привет.',
        mushy: 'Запрыгивай!',
        napsta: "............\n(Они бессильны против вас.)",
        torie: 'Ну... Думаю, это сработало...',
        toriel: 'Я думаю, тебе следует подумать над собственным именем, моё дитя.',
        twink: 'Серьёзно...',
        twinkl: 'Хорошая попытка, идиот.',
        twinky: 'Хорошая попытка, идиот.',
        walker: 'Ты хотел сказать «глазомер»?',

        
        astro: 'Зацени мою антенну!',
        cdrake: 'Га-ха-ха, это хорошее.',
        chilly: 'Га-ха-ха, это хорошее.',
        dogamy: "Хм? Что это за запах?",
        doggo: "Оно д-движется! О-оно трясётся!",
        jerry: 'Джерри.',
        major: '(Собака запрыгнула к вам на колени.)',
        minor: '(Арф арф)',
        papyrs: "Я РАЗРЕШАЮ!!!",
        papyru: "Я РАЗРЕШАЮ!!!",
        san: 'лан.',
        sans: 'не.',
        sdrake: '«Блестящий» выбор!',
        serf: 'Зацени мою антенну!',
        starry: '«Блестящий» выбор!',

        
        bob: 'Отлично звучит, правда?',
        doge: 'Мне не смешно.',
        gelata: 'Равр.',
        gerson: 'Вах-ха-ха! Почему нет?',
        mdummy: 'Что. Что! ЧТО!',
        mkid: "Это моё имя!",
        monkid: "Это моё имя!",
        muffet: 'Аху-ху-ху~\nУ тебя отличный вкус, дорогуша~',
        raddy: 'Эй!\nТолько Чистику позволено так меня называть!',
        radtie: "Прошу прощения, но вы очень скупы на буквы.",
        radtil: "Прошу прощения, но вы очень скупы на буквы.",
        shyren: '?..',
        skrub: 'Чистое имя.',
        skrubb: 'Чистое имя.',
        tem: 'пРИФ!',
        temmie: 'пРИФ!',
        undyn: 'Нгах, отлично.',
        undyne: 'Добудь себе СВОЁ имя!',

        
        alphy: 'Э-э... Ладно?',
        alphys: "Н-не делай этого.",
        bpants: 'Вы достигли самого дна.',
        bratty: 'Типа, окей, наверное...',
        burgie: 'Понравилось моё имя, мелочь?',
        catty: "Брэтти! Брэтти! Это же МОЁ имя!",
        cozmo: 'Дружище волшебник?',
        glyde: 'Неплохой выбор, уважуха.',
        hapsta: "Дорогуша, ты грубишь мне?",
        mett: 'О-О-О-Х!!! ТЫ ПРОДВИГАЕШЬ МОЙ БРЭНД?',
        metta: 'О-О-О-Х!!! ТЫ ПРОДВИГАЕШЬ МОЙ БРЭНД?',
        mtt: 'О-О-О-Х!!! ТЫ ПРОДВИГАЕШЬ МОЙ БРЭНД?',

        
        aaron: 'Вы уверены в своём выборе? ;)',
        grillb: 'Горячо, но недостаточно.',
        grilly: 'Горячо, но недостаточно.',
        gyft: "Не стоит этого делать...",
        heats: 'Ты ЗНАЛ?!',
        kabakk: 'Уважай мой АВТОРИТЕТ!',
        vulkin: 'Аах! Спасибо~',
        zorren: 'Спасибо, что, эм, используешь моё имя.',

        
        asgor: 'Ты можешь?',
        asgore: 'Ты не можешь.',
        asrie: '...пусть так.',
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
