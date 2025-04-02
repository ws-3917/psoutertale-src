import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'hu_HU';

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
        
        '': 'Választanod kell egy nevet.',
        no: 'Nem?',

        
        bully: 'Hm...?',
        flirt: 'Hm...?',
        geno: 'Hm...?',
        mercy: 'Hm...?',
        murder: 'Hm...?',
        paci: 'Hm...?',
        maybe: 'Talán?',
        yes: 'Igen?',

        
        afraid: 'Fel a fejjel.\nItt nincs mitől félned.',
        amused: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        angry: 'Fel a fejjel.\nA frusztrációd már magad mögött hagytad.',
        angsty: 'Fel a fejjel.\nA történet a tied, bárhogy is érzel.',
        antsy: 'Kísérjen nyugalom, amint utadnak indulsz.',
        bored: 'Fel a fejjel.\nA sztori olyan érdekes, amilyennek alakítod.',
        brainy: 'Beszéded ereje váljon tettekké utad során.',
        brave: 'Egy bátor szív remekül szolgál az utadon.',
        brazen: 'Egy bátor szív remekül szolgál az utadon.',
        calm: 'A nyugalom érzése csodákra lesz képes az utadon.',
        clever: 'Leleményességed múlja felül az előtted álló akadályokat.',
        cocky: 'A magabiztosság messzire fog vinni utad során.',
        crafty: 'Leleményességed múlja felül utad kihívásait.',
        crazy: 'Legyen veled az egyensúly a kibontakozó út során.',
        daring: 'Egy bátor szív remekül szolgál az utadon.',
        dizzy: 'Legyen veled az egyensúly a kibontakozó út során.',
        dumb: 'Fel a fejjel.\nSokat kell tanulnod az előtted álló kaland során.',
        edgy: 'A káosz és rend szövetének összhangja elégítse ki utad.',
        elated: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        empty: 'Történeted nyerjen értelmet ebben a bábban a sötétség közepette.',
        flirty: 'Tapasztalataid legyenek oly játékosak, amilyennek szeretnéd.',
        giddy: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        goofy: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        greedy: 'Tapasztalatod olyan mértékű legyen, mit lelked kíván.',
        guilty: 'Fel a fejjel.\nMár semmitől nem kell tartanod.',
        happy: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        hollow: 'Történeted nyerjen értelmet ebben a bábban a sötétség közepette.',
        humble: 'A mértékletes egó messzire juttat utadon.',
        hungry: 'A tapasztalat jelentse a táplálékod, amire szükséged van.',
        insane: 'Legyen veled az egyensúly a kibontakozó út során.',
        irate: 'Fel a fejjel.\nA frusztrációd már magad mögött hagytad.',
        jaded: 'A történet hozza elő érzelmeid, melyeket érezni szeretnél.',
        lazy: 'Választásaid legyenek oly könnyedek, mint ahogy eléd kerülnek.',
        lively: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        livid: 'Fel a fejjel.\nA frusztrációd már magad mögött hagytad.',
        lonely: 'Fel a fejjel!\nItt társaságra lelhetsz.',
        lucky: 'A szerencséd vezessen előre utadon.',
        mad: 'Fel a fejjel.\nA frusztrációd már magad mögött hagytad.',
        manic: 'Legyen veled az egyensúly a kibontakozó út során.',
        meek: 'A mértékletes egó messzire juttat utadon.',
        modest: 'A mértékletes egó messzire juttat utadon.',
        nervy: 'Kísérjen nyugalom, amint utadnak indulsz.',
        moody: 'Fel a fejjel.\nA történet a tied, bárhogy is érzel.',
        numb: 'A történet hozza elő érzelmeid, melyeket érezni szeretnél.',
        proud: 'A magabiztosság messzire fog vinni utad során.',
        rowdy: 'A káosz és rend szövete elégítse ki utad.',
        sad: 'Fel a fejjel.\nTörténeted oly felemelő lesz, amilyennek azt megéled.',
        sane: 'Kitartásod biztosítson szilárd alapot az utad során.',
        sassy: 'Tapasztalataid legyenek oly játékosak, amilyennek szeretnéd.',
        sated: 'A tapasztalatod adjon többet az elégedettésgedhez vezető úton.',
        scared: 'Fel a fejjel.\nItt nincs mitől félned.',
        serene: 'A nyugalom érzése csodákra lesz képes az utadon.',
        shy: 'A tapasztalatod legyen oly nyugtató, mint azt lelked kívánja.',
        silly: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        sleepy: 'A tapasztalatod adjon energiát, melyre szükséged lehet.',
        smug: 'A magabiztosság messzire fog vinni utad során.',
        sorry: 'Fel a fejjel.\nMár semmitől nem kell tartanod.',
        spry: 'A túlcsorduló energiád segítsen át utadon.',
        steady: 'Kitartásod biztosítson szilárd alapot az utad során.',
        stupid: 'Fel a fejjel.\nSokat kell tanulnod az előtted álló kaland során.',
        timid: 'Fel a fejjel.\nItt nincs mitől félned.',
        tired: 'A tapasztalatod adjon energiát, melyre szükséged lehet.',
        unruly: 'A káosz és rend szövete elégítse ki utad.',
        wacky: 'Egy könnyed lélek jó szolgálatot tesz majd utadon.',
        witty: 'Beszéded ereje váljon tettekké utad során.',
        zen: 'Kitartásod biztosítson szilárd alapot az utad során.',

        
        erogot: 'Meg vagyok tisztelve választásodtól.',
        roman: 'Kezdődjék a kísérlet.',
        thomas: 'Kezdődjék a kísérlet.',

        
        chara: 'Az igazi név.',
        frisk: 'Ez a név helytelen.',

        
        blooky: "............\n(Nincs ereje, hogy megállítson.)",
        dummy: "............\n(Nem elég egy beszélgetéshez.)",
        lurky: 'Hello.',
        mushy: 'Fel a nyeregbe!',
        napsta: "............\n(Nincs ereje, hogy megállítson.)",
        torie: 'Hát... Asszem működhet...',
        toriel: 'A saját nevedre gondolj, gyermekem.',
        twink: 'Komolyan...',
        twinkl: 'Szép próbálkozás, idióta.',
        twinky: 'Szép próbálkozás, idióta.',
        walker: '\"Eyewalker-re\" gondoltál?',

        
        astro: 'Csekkold le az antennám!',
        cdrake: 'Guh huh huh, klassz.',
        chilly: 'Guh huh huh, klassz.',
        dogamy: "Heh? Mi ez a szag?",
        doggo: "Ez m-mozog! E-e-ez rázkódik!",
        jerry: 'Jerry.',
        major: '(A kutya az öledbe ugrott.)',
        minor: '(lihegés hangok)',
        papyrs: "MEGENGEDEM!!!!",
        papyru: "MEGENGEDEM!!!!",
        san: 'ok.',
        sans: 'nem.',
        sdrake: '\"Csillaglatos\" választás.',
        serf: 'Csekkold le az antennám!',
        starry: '\"Csillaglatos\" választás.',

        
        bob: 'Egy kellemes elnevezés, nemde?',
        doge: 'Nem vagyok elragadtatva.',
        gelata: 'Rrrr.',
        gerson: 'Wah ha ha! Miért is ne?',
        mdummy: 'Mivan. Mivan! MIVAN!',
        mkid: "Az az én nevem!",
        monkid: "Az az én nevem!",
        muffet: 'Ahuhuhu~\nRemek az ízlésed, kedveske~',
        raddy: 'Héj!\nCsak Skrubby hívhat így!',
        radtie: "Bocsi, de egy betűvel lemaradtál.",
        radtil: "Bocsi, de egy betűvel lemaradtál.",
        shyren: '...?',
        skrub: 'Tiszta név.',
        skrubb: 'Tiszta név.',
        tem: 'hOI!',
        temmie: 'hOI!',
        undyn: 'Ngah, legyen.',
        undyne: 'Szerezz SAJÁT nevet!',

        
        alphy: 'Uh.... Oké?',
        alphys: "N-ne csináld.",
        bpants: 'Te aztán tényleg a hordó alját vakarod.',
        bratty: 'Hát, OKÉ asszem.',
        burgie: 'Tetszik a nevem, kis haver?',
        catty: "Bratty! Bratty! Ez az ÉN nevem!",
        cozmo: 'Áh, egy varázsló cimbora?',
        glyde: 'Klassz választás, haver.',
        hapsta: "Ez már csak bunkóság, kedvesem.",
        mett: 'OOOOH!!! PROMOTÁLOD A MÁRKÁM?',
        metta: 'OOOOH!!! PROMOTÁLOD A MÁRKÁM?',
        mtt: 'OOOOH!!! PROMOTÁLOD A MÁRKÁM?',

        
        aaron: 'Helyes ez a név? ;)',
        grillb: 'Forró, de nem eléggé.',
        grilly: 'Forró, de nem eléggé.',
        gyft: "Nem kell ezt tenned...",
        heats: 'Hát TUDTAD!?',
        kabakk: 'Tiszteld a HATALMAM!',
        vulkin: 'Ahh! Köszike~',
        zorren: 'Köszi, hogy öhm, használod a nevem.',

        
        asgor: 'Megteheted?',
        asgore: 'Nem teheted.',
        asrie: '... legyen.',
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
        ['A', 'Á', 'B', 'C', 'CS', 'D', 'DZ', 'DZS', 'E'],
        ['É', 'F', 'G', 'GY', 'H', 'I', 'Í', 'J', 'K'],
        ['L', 'LY', 'M', 'N', 'NY', 'O', 'Ó', 'Ö', 'Ő'],
        ['P', 'R', 'S', 'SZ', 'T', 'TY', 'U', 'Ú', 'Ü'],
        ['Ű', 'V', 'Z', 'ZS'],
        ['a', 'á', 'b', 'c', 'cs', 'd', 'dz', 'dzs', 'e'],
        ['é', 'f', 'g', 'gy', 'h', 'i', 'í', 'j', 'k'],
        ['l', 'ly', 'm', 'n', 'ny', 'o', 'ó', 'ö', 'ő'],
        ['p', 'r', 's', 'sz', 't', 'ty', 'u', 'ú', 'ü'],
        ['ű', 'v', 'z', 'zs']
    ]],
    nameLetterPosition: (index: number, page: number) => {
        // variables
        const alphabetSize = 40;
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
