import { content } from '../../../code/systems/assets';
import { CosmosFont, CosmosKeyed, CosmosMath, CosmosTyper } from '../../../code/systems/storyteller';

// START-TRANSLATE

export const LANGUAGE = 'pt_BR';

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
        
        '': 'Você deve escolher um nome.',
        no: 'Não?',

        
        bully: 'Hm...?',
        flirt: 'Hm...?',
        geno: 'Hm...?',
        mercy: 'Hm...?',
        murder: 'Hm...?',
        paci: 'Hm...?',
        maybe: 'Talvez?',
        yes: 'Sim?',

        
        afraid: 'Anime-se.\nNão há nada a temer aqui.',
        amused: 'Um espírito alegre o servirá bem em sua jornada.',
        angry: 'Anime-se.\nSuas frustrações ficaram para trás.',
        angsty: 'Anime-se.\nA história é sua, não importa como você se sinta.',
        antsy: 'A tranquilidade deve estar contigo ao embarcar em sua jornada.',
        bored: 'Anime-se.\nSua história é tão interessante quanto você a constrói.',
        brainy: 'A sua capacidade de falar, traduz para suas ações na jornada.',
        brave: 'Um coração corajoso vai te servir bem na jornada.',
        brazen: 'Um coração corajoso vai te servir bem na jornada.',
        calm: 'Uma sensação de serenidade fará maravilhas em sua jornada.',
        clever: 'A sua ingenuidade deve superar os desafios da sua jornada.',
        cocky: 'Uma mente confiante te levará longe na sua jornada.',
        crafty: 'Que sua ingenuidade supere os desafios em sua jornada.',
        crazy: 'Que o equilíbrio venha sobre você enquanto você embarca em sua jornada.',
        daring: 'Um coração corajoso vai te servir bem na jornada.',
        dizzy: 'Que o equilíbrio venha sobre você enquanto você embarca em sua jornada.',
        dumb: 'Anime-se.\nExiste muito para aprender na estrada a frente.',
        edgy: 'A tapeçaria do caos e da ordem irá te entreter na sua jornada.',
        elated: 'Um espírito alegre o servirá bem em sua jornada.',
        empty: 'Que sua história ganhe sentido neste casulo em meio à escuridão.',
        flirty: 'A experiência deve ser divertida como você imagina.',
        giddy: 'Um espírito alegre o servirá bem em sua jornada.',
        goofy: 'Um espírito alegre o servirá bem em sua jornada.',
        greedy: 'A experiência deve ser excessiva como você imagina.',
        guilty: 'Anime-se.\nVocê não tem nada para se envergonhar.',
        happy: 'Um espírito alegre o servirá bem em sua jornada.',
        hollow: 'Que sua história ganhe sentido neste casulo em meio à escuridão.',
        humble: 'Um ego equilibrado vai te levar longe na sua jornada.',
        hungry: 'A experiência te trará a substância que você precisa.',
        insane: 'Que o equilíbrio venha sobre você enquanto você embarca em sua jornada.',
        irate: 'Anime-se.\nSuas frustrações ficaram para trás.',
        jaded: 'Que sua história traga a emoção que você se esforça para sentir.',
        lazy: 'Que suas escolhas se tornem mais fáceis conforme elas vem.',
        lively: 'Um espírito alegre o servirá bem em sua jornada.',
        livid: 'Anime-se.\nSuas frustrações ficaram para trás.',
        lonely: 'Anime-se.\nA muita companhia por aqui.',
        lucky: 'Que sua fortuna o leve adiante em sua jornada.',
        mad: 'Anime-se.\nSuas frustrações ficaram para trás.',
        manic: 'Que o equilíbrio venha sobre você enquanto você embarca em sua jornada.',
        meek: 'Um ego equilibrado vai te levar longe na sua jornada.',
        modest: 'Um ego equilibrado vai te levar longe na sua jornada.',
        nervy: 'A tranquilidade deve estar contigo ao embarcar em sua jornada.',
        moody: 'Anime-se.\nA história é sua, não importa como você se sinta.',
        numb: 'Que sua história traga a emoção que você se esforça para sentir.',
        proud: 'Uma mente confiante te levará longe na sua jornada.',
        rowdy: 'Que a tapeçaria do caos e da ordem o agrade em sua jornada.',
        sad: 'Anime-se.\nSua história se torna edificante conforme você a constrói.',
        sane: 'Sua estabilidade proverá uma fundação sólida na sua jornada.',
        sassy: 'A experiência deve ser divertida como você imagina.',
        sated: 'Que a experiência adicione satisfação.',
        scared: 'Anime-se.\nNão há nada a temer aqui.',
        serene: 'Uma sensação de serenidade fará maravilhas em sua jornada.',
        shy: 'Que a experiência traga o conforto que você deseja.',
        silly: 'Um espírito alegre o servirá bem em sua jornada.',
        sleepy: 'Que a experiência traga a energia que você precisa.',
        smug: 'Uma mente confiante te levará longe na sua jornada.',
        sorry: 'Anime-se.\nVocê não tem nada para se envergonhar.',
        spry: 'Que sua energia transbordante o impulsione em sua jornada.',
        steady: 'Sua estabilidade proverá uma fundação sólida na sua jornada.',
        stupid: 'Anime-se.\nExiste muito para aprender na estrada a frente.',
        timid: 'Anime-se.\nNão há nada a temer aqui.',
        tired: 'Que a experiência traga a energia que você precisa.',
        unruly: 'Que a tapeçaria do caos e da ordem o agrade em sua jornada.',
        wacky: 'Um espírito alegre o servirá bem em sua jornada.',
        witty: 'A sua capacidade de falar, traduz para suas ações na jornada.',
        zen: 'Sua estabilidade proverá uma fundação sólida na sua jornada.',

        
        erogot: 'Eu estou honrado por sua escolha.',
        roman: 'Que a experiência comece.',
        thomas: 'Que a experiência comece.',

        
        chara: 'O verdadeiro nome.',
        frisk: 'Este nome está incorreto.',

        
        blooky: "............\n(Eles são poderosos o suficiente para detê-lo.)",
        dummy: "............\n(Não é o muito para conversa.",
        lurky: 'Olá.',
        mushy: 'Prepare-se!',
        napsta: "............\n(Eles são poderosos o suficiente para detê-lo.)",
        torie: 'Bem... eu acho que isso funcionará...',
        toriel: 'Eu acho que você deveria ter seu próprio nome, minha criança.',
        twink: 'Sério...',
        twinkl: 'Boa tentativa, idiota.',
        twinky: 'Boa tentativa, idiota.',
        walker: 'Você não quis dizer \"Eyewalker\"?',

        
        astro: 'Se liga na minha antena!',
        cdrake: 'Guh huh huh, muito bom.',
        chilly: 'Guh huh huh, muito bom.',
        dogamy: "Huh? Que cheiro é esse?",
        doggo: "Está m-movendo! E-e-está tremendo!",
        jerry: 'Jerry.',
        major: '(O cachorro pula no seu colo.)',
        minor: '(Carinho carinho)',
        papyrs: "EU PERMITIREI!!!",
        papyru: "EU PERMITIREI!!!",
        san: 'ok.',
        sans: 'nope.',
        sdrake: 'Uma escolha \"estelar\".',
        serf: 'Se liga na minha antena!',
        starry: 'Uma escolha \"estelar\".',

        
        bob: 'Uma nomenclatura agradável, não?',
        doge: 'Eu não estou me divertindo.',
        gelata: 'Roar.',
        gerson: 'Wah ha ha! Claro?',
        mdummy: 'O que. O que! O QUE!',
        mkid: "Este é meu nome!!",
        monkid: "Este é meu nome!!",
        muffet: 'Ahuhuhu~\nVocê tem um gosto muito bom, querido~',
        raddy: 'Ei!\nSó Skrubby pode me chamar assim!',
        radtie: "Desculpe, mas você é um escritor tímido.",
        radtil: "Desculpe, mas você é um escritor tímido.",
        shyren: '...?',
        skrub: 'Nome limpo.',
        skrubb: 'Nome limpo.',
        tem: 'hOI!',
        temmie: 'hOI!',
        undyn: 'Ngah, beleza.',
        undyne: 'Tenha seu próprio nome!',

        
        alphy: 'Uh.... OK?',
        alphys: "N-não faz isso.",
        bpants: 'Você está realmente raspando o fundo do barril.',
        bratty: 'Tipo, beleza, eu acho.',
        burgie: 'Você gosta do meu nome, amiguinho?',
        catty: "Bratty! Bratty! Esse aí é meu nome!",
        cozmo: 'Um amigo mago?',
        glyde: 'Escolha habilidosa, fatia caseira.',
        hapsta: "Agora você só está sendo grosseiro, amorzinho.",
        mett: 'OOOOH!!! VOCÊ ESTÁ PROPAGANDO MEU PRODUTO?',
        metta: 'OOOOH!!! VOCÊ ESTÁ PROPAGANDO MEU PRODUTO?',
        mtt: 'OOOOH!!! VOCÊ ESTÁ PROPAGANDO MEU PRODUTO?',

        
        aaron: 'Este nome tá certo? ;)',
        grillb: 'Quente, mas não quente o suficiente.',
        grilly: 'Quente, mas não quente o suficiente.',
        gyft: "Você não tem que fazer isso...",
        heats: 'Você sabia!?',
        kabakk: 'Respeite minha AUTORIDADE!',
        vulkin: 'Ahh! Obrigado~',
        zorren: 'Obrigado por, uh, usar meu nome.',

        
        asgor: 'Você pode?',
        asgore: 'Você não pode.',
        asrie: '... tá.',
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
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
        ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
        ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ã'],
        ['Õ', 'Ç', 'Á', 'É', 'Í', 'Ó', 'Ú'],
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
        ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
        ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ã'],
        ['õ', 'ç', 'á', 'é', 'í', 'ó', 'ú']
    ]],
    nameLetterPosition: (index: number, page: number) => {
        // variables
        const alphabetSize = 34;
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
