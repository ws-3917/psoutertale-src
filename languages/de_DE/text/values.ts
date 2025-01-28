import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'de_DE';

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
        
        '': 'Du musst einen Namen wählen.',
        no: 'Nein?',

        
        bully: 'Hm...?',
        flirt: 'Hm...?',
        geno: 'Hm...?',
        mercy: 'Hm...?',
        murder: 'Hm...?',
        paci: 'Hm...?',
        maybe: 'Vielleicht?',
        yes: 'Ja?',

        
        afraid: 'Nur Mut.\nHier gibt es nichts, wovor Sie Angst haben müssen.',
        amused: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        angry: 'Fassen Sie Mut.\nIhre Frustrationen liegen nun hinter Ihnen.',
        angsty: 'Nur Mut.\nDie Geschichte gehört Ihnen, ganz gleich, was Sie fühlen.',
        antsy: 'Möge Ihnen beim Antritt Ihrer Reise Ruhe zuteil werden.',
        bored: 'Nur Mut.\nIhre Geschichte ist so interessant, wie Sie sie machen.',
        brainy: 'Möge sich die Qualität Ihrer Rede auf Ihrer Reise in Taten niederschlagen.',
        brave: 'Ein mutiges Herz wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        brazen: 'Ein mutiges Herz wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        calm: 'Ein Gefühl der Gelassenheit wird auf Ihrer Reise Wunder wirken.',
        clever: 'Möge Ihr Einfallsreichtum die Herausforderungen auf Ihrer Reise meistern.',
        cocky: 'Eine selbstbewusste Einstellung wird Sie auf Ihrer Reise weit bringen.',
        crafty: 'Möge Ihr Einfallsreichtum die Herausforderungen auf Ihrer Reise meistern.',
        crazy: 'Möge Ihnen auf dem Weg zu Ihrer Reise Ausgeglichenheit zuteil werden.',
        daring: 'Ein mutiges Herz wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        dizzy: 'Möge Ihnen auf dem Weg zu Ihrer Reise Ausgeglichenheit zuteil werden.',
        dumb: 'Nur Mut.\nAuf dem Weg, der vor uns liegt, gibt es noch viel zu lernen.',
        edgy: 'Möge Ihnen das Geflecht aus Chaos und Ordnung auf Ihrer Reise zufriedenstellend sein.',
        elated: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        empty: 'Möge Ihre Geschichte in diesem Kokon inmitten der Dunkelheit an Bedeutung gewinnen.',
        flirty: 'Möge das Erlebnis so spielerisch sein, wie Sie es sich wünschen.',
        giddy: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        goofy: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        greedy: 'Möge das Erlebnis so intensiv sein, wie Sie es sich wünschen.',
        guilty: 'Nur Mut.\nSie müssen sich jetzt für nichts schämen.',
        happy: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        hollow: 'Möge Ihre Geschichte in diesem Kokon inmitten der Dunkelheit an Bedeutung gewinnen.',
        humble: 'Ein gemäßigtes Ego wird Sie auf Ihrer Reise weit bringen.',
        hungry: 'Möge Ihnen dieses Erlebnis die nötige Kraft geben.',
        insane: 'Möge Ihnen auf dem Weg zu Ihrer Reise Ausgeglichenheit zuteil werden.',
        irate: 'Fassen Sie Mut.\nIhre Frustrationen liegen nun hinter Ihnen.',
        jaded: 'Möge Ihre Geschichte die Emotionen hervorrufen, die Sie spüren möchten.',
        lazy: 'Mögen Ihre Entscheidungen so mühelos wie möglich sein.',
        lively: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        livid: 'Fassen Sie Mut.\nIhre Frustrationen liegen nun hinter Ihnen.',
        lonely: 'Nur Mut.\nHier gibt es viel Kameradschaft.',
        lucky: 'Möge Ihr Glück Sie auf Ihrer Reise weitertragen.',
        mad: 'Fassen Sie Mut.\nIhre Frustrationen liegen nun hinter Ihnen.',
        manic: 'Möge Ihnen auf dem Weg zu Ihrer Reise Ausgeglichenheit zuteil werden.',
        meek: 'Ein gemäßigtes Ego wird Sie auf Ihrer Reise weit bringen.',
        modest: 'Ein gemäßigtes Ego wird Sie auf Ihrer Reise weit bringen.',
        nervy: 'Möge Ihnen beim Antritt Ihrer Reise Ruhe zuteil werden.',
        moody: 'Nur Mut.\nDie Geschichte gehört Ihnen, ganz gleich, was Sie fühlen.',
        numb: 'Möge Ihre Geschichte die Emotionen hervorrufen, die Sie spüren möchten.',
        proud: 'Eine selbstbewusste Einstellung wird Sie auf Ihrer Reise weit bringen.',
        rowdy: 'Möge Ihnen das Geflecht aus Chaos und Ordnung auf Ihrer Reise gefallen.',
        sad: 'Fassen Sie Mut.\nIhre Geschichte ist so erhebend, wie Sie sie machen.',
        sane: 'Möge Ihre Stabilität eine solide Grundlage für Ihre Reise bieten.',
        sassy: 'Möge das Erlebnis so spielerisch sein, wie Sie es sich wünschen.',
        sated: 'Möge dieses Erlebnis Ihre Zufriedenheit nur steigern.',
        scared: 'Nur Mut.\nHier gibt es nichts, wovor Sie Angst haben müssen.',
        serene: 'Ein Gefühl der Gelassenheit wird auf Ihrer Reise Wunder wirken.',
        shy: 'Möge das Erlebnis so angenehm sein, wie Sie es sich wünschen.',
        silly: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        sleepy: 'Möge Ihnen das Erlebnis die nötige Energie geben.',
        smug: 'Eine selbstbewusste Einstellung wird Sie auf Ihrer Reise weit bringen.',
        sorry: 'Nur Mut.\nSie müssen sich jetzt für nichts schämen.',
        spry: 'Möge Ihre überschäumende Energie Ihnen auf Ihrer Reise Kraft geben.',
        steady: 'Möge Ihre Stabilität eine solide Grundlage für Ihre Reise bieten.',
        stupid: 'Nur Mut.\nAuf dem Weg, der vor uns liegt, gibt es noch viel zu lernen.',
        timid: 'Nur Mut.\nHier gibt es nichts, wovor Sie Angst haben müssen.',
        tired: 'Möge Ihnen das Erlebnis die nötige Energie geben.',
        unruly: 'Möge Ihnen das Geflecht aus Chaos und Ordnung auf Ihrer Reise gefallen.',
        wacky: 'Eine unbeschwerte Einstellung wird Ihnen auf Ihrer Reise gute Dienste leisten.',
        witty: 'Möge sich die Qualität Ihrer Rede auf Ihrer Reise in Taten niederschlagen.',
        zen: 'Möge Ihre Stabilität eine solide Grundlage für Ihre Reise bieten.',

        
        erogot: 'Ich fühle mich durch Ihre Wahl geehrt.',
        roman: 'Lasst das Experiment beginnen.',
        thomas: 'Lasst das Experiment beginnen.',

        
        chara: 'Der wahre Name.',
        frisk: 'Dieser Name ist falsch.',

        
        blooky: "............\n(Sie sind machtlos, Sie aufzuhalten.)",
        dummy: "............\n(Für eine Unterhaltung reicht das nicht aus.)",
        lurky: 'Hallo.',
        mushy: 'Aufsatteln!',
        napsta: "............\n(Sie sind machtlos, Sie aufzuhalten.)",
        torie: 'Nun... ich denke, das funktioniert...',
        toriel: 'Ich denke, du solltest über deinen eigenen Namen nachdenken, mein Kind.',
        twink: 'Wirklich...',
        twinkl: 'Guter Versuch, Idiot.',
        twinky: 'Guter Versuch, Idiot.',
        walker: 'Meinst du nicht \"Eyewalker?\"',

        
        astro: 'Schaut euch meine Antenne an!',
        cdrake: 'Guh huh huh, gut gemacht.',
        chilly: 'Guh huh huh, gut gemacht.',
        dogamy: "Hä? Was ist das für ein Geruch?",
        doggo: "Es bewegt sich! E-E-Es wackelt!",
        jerry: 'Jerry.',
        major: '(Der Hund ist dir auf den Schoß gesprungen.)',
        minor: '(Hose Hose)',
        papyrs: "ICH WERDE ES ERLAUBEN!!!!",
        papyru: "ICH WERDE ES ERLAUBEN!!!!",
        san: 'OK.',
        sans: 'Nein.',
        sdrake: 'Eine „hervorragende“ Wahl.',
        serf: 'Schaut euch meine Antenne an!',
        starry: 'Eine „hervorragende“ Wahl.',

        
        bob: 'Eine ansprechende Nomenklatur, nicht wahr?',
        doge: 'Ich finde das nicht amüsant.',
        gelata: 'Brüllen.',
        gerson: 'Wah ha ha! Warum nicht?',
        mdummy: 'Was. Was! WAS!',
        mkid: "Das ist mein Name!!",
        monkid: "Das ist mein Name!!",
        muffet: 'Ahuhuhu~\nDu musst einen tollen Geschmack haben, Liebling~',
        raddy: 'Hey!\nNur Skrubby darf mich so nennen!',
        radtie: "Tut mir leid, aber Ihnen fehlt ein Buchstabe.",
        radtil: "Tut mir leid, aber Ihnen fehlt ein Buchstabe.",
        shyren: '...?',
        skrub: 'Sauberer Name.',
        skrubb: 'Sauberer Name.',
        tem: 'hOI!',
        temmie: 'hOI!',
        undyn: 'Ngah, gut.',
        undyne: 'Holen Sie sich Ihren EIGENEN Namen!',

        
        alphy: 'Äh..., ok?',
        alphys: "T-tu das nicht.",
        bpants: 'Sie kratzen wirklich am Boden des Fasses.',
        bratty: 'So, ok, denke ich.',
        burgie: 'Gefällt dir mein Name, kleiner Kumpel?',
        catty: "Freche Freche! Das ist MEIN Name!",
        cozmo: 'Ein Zaubererkollege?',
        glyde: 'Gute Wahl, Homeslice.',
        hapsta: "Jetzt bist du einfach nur unhöflich, Liebling.",
        mett: 'OOOOH!!! MACHEN SIE WERBUNG FÜR MEINE MARKE?',
        metta: 'OOOOH!!! MACHEN SIE WERBUNG FÜR MEINE MARKE?',
        mtt: 'OOOOH!!! MACHEN SIE WERBUNG FÜR MEINE MARKE?',

        
        aaron: 'Ist dieser Name richtig? ;)',
        grillb: 'Heiß, aber nicht heiß genug.',
        grilly: 'Heiß, aber nicht heiß genug.',
        gyft: "Das musst du nicht tun...",
        heats: 'Du WUSSTEST es!?',
        kabakk: 'Respektiere meine AUTORITÄT!',
        vulkin: 'Ahh! Danke~',
        zorren: 'Danke, dass Sie meinen Namen verwendet haben.',

        
        asgor: 'Du kannst?',
        asgore: 'Sie können nicht.',
        asrie: '... fein.',
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
        ['A', 'Ä', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
        ['Ö', 'P', 'Q', 'R', 'S', 'ß', 'T', 'U'],
        ['Ü', 'V', 'W', 'X', 'Y', 'Z'],
        ['a', 'ä', 'b', 'c', 'd', 'e', 'f', 'g'],
        ['h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'],
        ['ö', 'p', 'q', 'r', 's', 'ß', 't', 'u'],
        ['ü', 'v', 'w', 'x', 'y', 'z']
    ]],
    nameLetterPosition: (index: number, page: number) => {
        // variables
        const alphabetSize = 30;
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
