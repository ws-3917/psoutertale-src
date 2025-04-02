import { asrielinter, epilogueOverride } from '../../../code/common';
import { blookGone, dateready, papreal, roomready, solo, trueSpaghettiState } from '../../../code/starton/extras';
import { game, renderer } from '../../../code/systems/core';
import {
    battler,
    calcHP,
    calcLV,
    choicer,
    fetchCharacters,
    instance,
    pager,
    player,
    postSIGMA,
    roomKills,
    world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../../../code/systems/storyteller';

// START-TRANSLATE

export default {
    a_starton: {
        telescope1: () => [
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* Um telescópio de longo alcance padrão da CIDADELA, por volta de 261X']),
            choicer.create('* (Usar o telescópio?)', 'Sim', 'Não')
        ],
        telescopeMeetup1: ['<25>{#p/kidd}{#f/2}* Você tá caçando estrelas??'],
        telescopeMeetup2: [
            '<25>{#p/kidd}{#f/1}* Yo... Posso apostar que você viu algo bem da hora.',
            '<25>{#f/7}* Da última vez que eu usei um telescópio, eu vi uma SUPERNOVA!'
        ],
        telescopeMeetup3: [
            '<25>{#p/kidd}{#f/3}* Aqui.\n* Pega isso.',
            '<32>{#s/equip}{#p/human}* (Um Voucher Premium de Membro foi adicionado ao seu chaveiro.)',
            '<25>{#p/kidd}{#f/7}* Agora você pode usar qualquer telescópio, até os \"premium\"!',
            '<25>{#f/1}* Aquele esqueleto pequeno me deu um monte desses mais cedo.',
            '<25>{#f/2}* Ele também me deu uma parada digital cheia de dinheiro...',
            '<25>{#f/1}* Acho que ele realmente gosta de mim, haha.'
        ],
        telescopeMeetup4: [
            '<25>{#p/kidd}{#f/3}* Bem, eu só queria te dar o voucher.',
            '<25>{#f/1}* Espero que você veja algo incrível com ele!'
        ],
        telescopeMeetup5: ["<25>{#p/kidd}{#f/1}* Eu estarei na cidade!"],
        telescope2: () =>
            SAVE.data.b.svr
                ? ['<25>{#p/asriel1}{#f/17}* Viu algo que gostou?']
                : SAVE.data.b.oops || SAVE.data.b.s_state_chargazer
                    ? ['<32>{#p/basic}* Explorar o espaço...\n* Realmente, é algo fora da caixa de se pensar.']
                    : ((SAVE.data.b.s_state_chargazer = true),
                        [
                            '<32>{#p/basic}* ...',
                            '<32>* Asriel e eu tínhamos um telescópio igual a esse.',
                            "<32>* Nós apontamos em direções aleatórias na esperança de ver algo animador...",
                            '<32>* ... nunca vimos nada demais.',
                            "<32>* Além disso, ele não parecia ligar muito...",
                            '<32>* Enquanto eu ficava procurando por algo, ele parecia apenas feliz por estar comigo.',
                            '<32>* ...',
                            '<32>{#p/human}* (Você escuta um chorinho.)',
                            "<32>{#p/basic}* ... uh, vamos só voltar para o que estávamos fazendo."
                        ]),
        notv: ["<32>{#p/basic}* Parece que não tem nada de interessante para ver."],
        nicecreamScoreReaction1a: ['<32>{#p/basic}* Nada mal para sua primeira tentativa...'],
        nicecreamScoreReaction1b: ['<32>{#p/basic}* Nada mal para a primeira tentativa.'],
        nicecreamScoreReaction2a: ['<32>{#p/basic}* Você pode fazer melhor que isso...'],
        nicecreamScoreReaction2b: ['<32>{#p/basic}* Você pode fazer melhor que isso.'],
        nicecreamScoreReaction3a: [
            "<32>{#p/basic}* Você consegue bater o recorde...?\n* Eu acho que nunca vi ninguém fazendo isso..."
        ],
        nicecreamScoreReaction3b: [
            "<32>{#p/basic}* Você bateu o recorde?\n* Eu não acho que já vi alguém fazendo isso!"
        ],
        nicecreamScoreReaction4a: ['<33>{#p/basic}* Você parece muito bom nisso...'],
        nicecreamScoreReaction4b: ['<32>{#p/basic}* Você parece muito bom nisso.'],
        nicecreamScoreReaction5a: ['<32>{#p/basic}* Você bateu o recorde...?'],
        nicecreamScoreReaction5b: ['<32>{#p/basic}* Olha o novo recorde!'],
        nicecreamScoreReaction6a: ['<32>{#p/basic}* Por um segundo eu pensei que você iria conseguir bater o recorde...'],
        nicecreamScoreReaction6b: [
            "<32>{#p/basic}* Woah, você poderia ter batido o recorde!\n* Será se você consegue?"
        ],
        nicecreamScoreReaction7a: ['<32>{#p/basic}* Parece que você pode conseguir com prática...'],
        nicecreamScoreReaction7b: ['<32>{#p/basic}* Acho que você pode dar uma praticada.'],
        nicecreamScoreReaction8a: ["<32>{#p/basic}* Está melhor..."],
        nicecreamScoreReaction8b: ["<32>{#p/basic}* Assim tá bem melhor."],
        nicecreamScoreReaction9a: [
            '<32>{#p/basic}* Você bateu o recorde na primeira tentativa?\n* Qual é chance...'
        ],
        nicecreamScoreReaction9b: ["<32>{#p/basic}* Você bateu o recorde na primeira tentativa?\n* Você é bom naturalmente!"],
        nicecreamScoreReaction10a: ["<32>{#p/basic}* Para a primeira tentativa, isso foi muito bom..."],
        nicecreamScoreReaction10b: ["<32>{#p/basic}* Para uma primeira tentativa, isso foi muito bom!"],
        nicecreamScoreReaction11a: ['<32>{#p/basic}* Você tá cada vez mais perto...'],
        nicecreamScoreReaction11b: ['<32>{#p/basic}* Droga, você quase bateu o recorde...\n* Você consegue!'],
        noteleport: ["<32>{#p/human}* (Não parece estar funcionando mais.)"],
        evac: ['<32>{#p/human}* (Você sente a presença dos monstros próximos diminuindo.)'],
        shopclosed: ['<32>{#p/human}* (Porém, não havia mais nada para fazer aqui.)'],
        jukebox0: ["<32>{#p/basic}* Está fora de serviço."],
        jukebox1: () => [
            SAVE.data.b.svr
                ? '<32>{#p/human}* (Você pega a jukebox...)'
                : "<32>{#p/basic}* Está jukebox só toca sons que você escutou antes.",
            choicer.create(
                '* (Tocar uma música?)',
                SAVE.data.b.napsta_performance ? 'Track 01' : '???',
                2 <= SAVE.data.n.state_foundry_swansong ? 'Track 02' : '???',
                2 <= SAVE.data.n.state_starton_trashprogress ? 'Track 03' : '???',
                'Cancelar'
            )
        ],
        jukebox1x1: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Mas você não pode tocar um som que ainda não conhece.)"]
                : ["<32>{#p/basic}* A capa mostra um DJ assustador tocando para a multidão.\n* Você não pode conhecer essa música."],
        jukebox1x2: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Mas você não pode tocar um som que ainda não conhece.)"]
                : ["<33>{#p/basic}* A capa mostra um DJ assustador em seu computador.\n* Você não pode conhecer essa música"],
        jukebox1x3: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Mas você não pode tocar um som que ainda não conhece.)"]
                : [
                    "<32>{#p/basic}* A capa mostra um cachorrinho branco cercado por lixo.\n* Você não pode conhecer essa música."
                ],
        jukebox1y: ['<32>{*}{#p/human}* (Você seleciona o disco...){^40}{%}'],
        jukebox2: () => [
            SAVE.data.b.svr
                ? '<32>{#p/human}* (Parece que já tem um som tocando.)'
                : [
                    '<32>{#p/basic}* Tocando agora \"Track 01\"',
                    '<32>{#p/basic}* Tocando agora \"Track 02\"',
                    '<32>{#p/basic}* Tocando agora \"Track 03\"'
                ][SAVE.data.n.state_starton_jukebox - 1],
            choicer.create('* (Parar de tocar?)', 'Sim', 'Não')
        ],
        jukebox3a1: ["<32>{#p/basic}{#npc/a}* Gostei mais dessa!"],
        jukebox3a2: ['<32>{#p/basic}{#npc/a}* (Amamos este tipo de música.)'],
        jukebox3b: ['<32>{#p/basic}{#npc/a}* Está é a música que está fazendo os clubes de dança lotarem?'],
        jukebox3c: [
            '<32>{#p/basic}* ...\n* ...\n* ...',
            "<32>{#npc/a}* Grillbz disse que já ouviu está música antes em algum lugar."
        ],
        jukebox3d: [
            '<32>{#p/basic}{#npc/a}* Você com certeza conhece um monte de músicas, criança...',
            '<32>* Você deve ser realmente conhecedor.'
        ],
        shockpapyrus0a: [
            '<15>{#p/papyrus}{#e/papyrus/27}O QUE EM KRIOS ESTÁ HAVENDO AQUI??',
            '<15>{#p/papyrus}{#e/papyrus/21}EU SÓ RESPONDI UMA LIGAÇÃO DO MEU BALCÃO...',
            '<15>{#p/papyrus}{#e/papyrus/19}E AQUI ONDE ISSO ME LEVA!?',
            "<15>{#p/papyrus}{#e/papyrus/14} SÓ PARA VOCÊ SABER, EU SOU UM CONCORRENTE PARA ENTRAR NA GUARDA REAL.",
            '<15>{#p/papyrus}{#e/papyrus/15}ENTÃO, SEJA LÁ O QUE VOCÊS DOIS ESTÃO PLANEJANDO...'
        ],
        shockpapyrus0b: [
            '<15>{#p/papyrus}{#e/papyrus/24}... ESPERA, ESSA VOZ...',
            '<15>{#p/papyrus}{#e/papyrus/22} FOI VOCÊ QUEM ME LIGOU MAIS CEDO?'
        ],
        shockpapyrus0c: [
            '<15>{#p/papyrus}{#e/papyrus/20}... É CLARO!\n* ISSO EXPLICA TUDO!',
            "<15>{#p/papyrus}{#e/papyrus/10}QUE BOM ENTÃO.\nESTOU FELIZ EM FINALMENTE TE VER.",
            '<15>{#p/papyrus}{#e/papyrus/24}PARA SER SINCERO, VOCÊ ME LEMBRA DO...',
            '<15>{#p/papyrus}{#e/papyrus/20}... EI, ESPERA UM SEGUNDO!!',
            '<15>{#p/papyrus}{#e/papyrus/22}VOCÊ TROUXE UM HUMANO CONTIGO!?!?',
            '<15>{#p/papyrus}{#e/papyrus/10}WOWIE!!\nISSO AQUI ESTÁ CADA VEZ MELHOR!!',
            '<15>{#p/papyrus}{#e/papyrus/20}ENTÃO, O QUE ESTAMOS FAZENDO AQUI?'
        ],
        shockpapyrus1: () =>
            [
                [
                    '<32>{#p/asriel2}* Pronto, $(name)?',
                    choicer.create('* (O que Asriel deveria fazer?)', 'Piedade', 'Agir', 'Magia', 'Lutar')
                ],
                ["<32>{#p/asriel2}* Vamos só acabar logo com isso."]
            ][Math.min(SAVE.flag.n.ga_asrielPapyrus, 1)],
        shockpapyrus2a: [
            '<32>{#p/asriel2}* Piedade, huh?',
            '<32>{#p/asriel2}* Piedade... Acho que eu gosto dessa palavra.',
            '<32>{#p/asriel2}* Vamos mostrar a \"Piedade\" pra ele.'
        ],
        shockpapyrus2b: [
            "<32>{#p/asriel2}* Agir...?\n* Vou te mostrar como agir.",
            '<32>{#p/asriel2}* Primeiro, você levanta seu braço...',
            '<32>{#p/asriel2}* Então...!'
        ],
        shockpapyrus2c: [
            '<32>{#p/asriel2}* Magia.\n* A força que carrega os monstros juntos.',
            '<32>{#p/asriel2}* Ou, nesse caso...',
            '<33>{#p/asriel2}* A força que os corta no meio.'
        ],
        shockpapyrus2d: ['<32>{#p/asriel2}* Lutar... a escolha ideal.', '<32>{#p/asriel2}* Hee hee hee...'],
        sansDeath1: ["<15>{#p/papyrus}{#e/papyrus/27}SANS!\nVOCÊ ESTÁ FERIDO!"],
        sansDeath2: ["<20>{#p/sans}papyrus, eu não te disse pra ficar em casa?", '{*}{#e/papyrus/21}{%}'],
        sansDeath3: ["<20>{#p/sans}... não se preocupe mano, é só molho yamok.", '{*}{#e/papyrus/26}{%}'],
        sansDeath4: ["<15>{#p/papyrus}{#e/papyrus/21}MAS VOCÊ ESTÁ FERIDO..."],
        sansDeath5: [
            "<20>{#p/sans}pois é, é isso que acontece quando você age por instinto.",
            '<20>{#p/sans}... não tem muito o que eu possa fazer sobre isso agora.',
            '{*}{#e/papyrus/21}{%}'
        ],
        sansDeath6: [
            '<20>{#p/sans}então...',
            "<20>acho que é isso, huh?",
            '<20>...',
            '<20>só...',
            "<20>prometa que você ficará bem sem mim, mano.",
            "<20>prometa que você será g-{^5}grande.",
            '<20>...',
            '<20>até porque...'
        ],
        sansDeath7: ["<20>{|}{#p/sans}você é o... grande p-{^5}papyrus.{^20}{%}"],
        sansDeath8: ['<15>{#p/papyrus}{#e/papyrus/33} N-NÃO...{^40}{%}'],
        fast_food1: () => [
            SAVE.data.b.fryz
                ? "<32>{#p/human}{#npc}* (Você pegou o Flamin Grillby.)"
                : '<32>{#p/human}{#npc}* (Você pegou os Sliders.)'
        ],
        fast_food2: ["<32>{#p/human}{#npc}* (Você está carregando muito.)"],
        aussie: pager.create(
            0,
            () =>
                SAVE.data.n.state_starton_trashprogress < 1
                    ? [
                        '<25>{#p/sans}{#f/0}* finalmente.',
                        "<25>{#f/3}* eu vim me perguntando quando você iria aparecer.",
                        '<25>{#f/0}* eu não sei se você lembra, quando nos vimos de primeira...',
                        '<25>{#f/0}* eu falei para o papyrus focar na \"gravidade\" da situação.',
                        '<25>{#f/0}* O que eu quis dizer por aquilo, você pergunta?',
                        '<25>{#f/3}* bom.',
                        "<25>{#f/2}* você está prestes a {@fill=#003cff}descobrir{@fill=#fff}."
                    ]
                    : ['<25>{#p/sans}{#f/0}* bem vindo de volta.', '<25>{#f/2}* pronto para descobrir o que te espera?'],
            () =>
                SAVE.data.n.state_starton_trashprogress < 1
                    ? ['<25>{#p/sans}{#f/0}* vamos lá, dê uma olhada.', "<25>{#f/2}* está bem aqui, bacana."]
                    : ["<25>{#p/sans}{#f/2}* está bem aqui, bacana."],
            () =>
                SAVE.data.n.state_starton_trashprogress < 2
                    ? ["<25>{#p/sans}{#f/2}* não se preocupe, não é perigoso... mesmo que tente ser."]
                    : ['<25>{#p/sans}{#f/2}* obrigado pela ajuda.']
        ),
        trashhunt1: [
            '<25>{#p/sans}{#f/0}* entããão... o que cê acha?',
            '<25>{#f/3}* Eu chamo de o \"Planeta de Lixo.\"',
            "<25>{#f/0}* ... na verdade, essa coisa tem crescido bastante ultimamente.",
            '<25>{#f/0}* se crescer um pouco mais, bem...',
            "<25>{#f/2}* vamos só dizer que estaríamos em um {@fill=#ff0}mundo{@fill=#fff} de problemas.",
            "<25>{#f/0}* mas não se preocupa. \n* com sua ajuda, vai sumir em tempo.",
            '<25>{#f/2}* eu achei algumas músicas pra te manter motivado.'
        ],
        trashhunt2: '* Pressione [Z] repetidamente para balançar o lixo para fora!',
        trashhunt3: () => [
            '<25>{#p/sans}{#f/3}* wow.\n* tudo de uma vez, huh?',
            "<25>{#f/2}* ... eu estou de cabeça pra baixo.",
            '<25>{#f/0}* acho que eu devo te dar algum tipo de prêmio.',
            '<25>{#f/0}* ...\n* aqui.\n* pega esse aqui.',
            '<32>{#p/human}* (Sans te jogou alguma coisa.)',
            ...(SAVE.storage.inventory.size < 8
                ? ['<32>{#s/equip}{#p/human}* (Você ganhou a Espada Cachorro Quente.)', '<25>{#p/sans}{#f/2}* Use com cuidado.']
                : [
                    "<32>{#p/human}* (Você está carregando muito.)",
                    '<25>{#p/sans}{#f/3}* sem espaço, huh?',
                    "<25>{#p/sans}{#f/2}* não se preocupa.\n* eu vou deixar no meu quarto pra você."
                ])
        ],
        gravo1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você olha com curiosidade para o dispositivo aparentemente inútil.)',
                    ...[["<25>{#p/asriel1}{#f/17}* Que triste que nós não temos o controle pra isso, huh?"], []][
                    Math.min(asrielinter.gravo1++, 1)
                    ]
                ]
                : ['<32>{#p/basic}* É um \"inversor de gravidade.\"', '<32>* Seja lá o que isso significa.'],
        gravo3: () => [
            '<32>{#p/human}* (Você usa o Controle do Inversor de Gravidade.)\n* (Nada acontece.)',
            ...(SAVE.data.b.svr
                ? [["<25>{#p/asriel1}{#f/21}* Eles provavelmente estão desligando a energia de aparelhos não essenciais."], []][
                Math.min(asrielinter.gravo3++, 1)
                ]
                : ['<32>{#p/basic}* Deve estar desligado...'])
        ],
        gravo2: ['<32>{#p/human}* (Você usa o Controle do Inversor de Gravidade.)'],
        sansdoor1: () =>
            SAVE.data.b.svr || world.runaway
                ? ['<32>{#p/human}* (Parece ter sido fechado com um selo de bloqueio.)']
                : ["<32>{#p/basic}* Está trancado."],
        sansdoor2: ['<32>{#p/human}* (Você usa a Chave Esqueleto.)'],
        sanscab1: () => [
            ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Tem um controle remoto estranho dentro do envelope."]),
            '<32>{#s/equip}{#p/human}* (O Controle do Inversor de Gravidade foi adicionado ao seu chaveiro.)'
        ],
        sanscab2: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Mas você já esvaziou o envelope de seus conteúdos.)']
                : ["<32>{#p/basic}* É só um envelope vazio."],
        sanscab3: () => [
            ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Tem um controle... item, dentro do envelope."]),
            SAVE.storage.inventory.size < 8
                ? '<32>{#s/equip}{#p/human}* (Você ganhou a Espada Cachorro Quente.)'
                : "<32>{#p/human}* (Você está carregando muito.)"
        ],
        cream_get: ['<32>{#p/human}* (Você pegou o Sorvete Sonho.)'],
        cream_deny: ['<32>{#p/basic}* Nada restando.'],
        cream_full: ["<32>{#p/human}* (Você está carregando muito.)"],
        cream_get_archive: [
            '<32>{#p/human}* (Você alcançou o carrinho.)',
            '<32>{#p/human}{#s/equip}* (Você pegou o Sorvete Sonho.)'
        ],
        cream_empty_archive: ['<32>{#p/human}* (Você alcançou o carrinho.)', '<32>{#p/human}* (...)'],
        cream_full_archive: ["<32>{#p/human}* (Você está carregando muito para alcançar lá dentro.)"],
        bunbun: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? ["<32>{#p/basic}* Mãe disse que iremos a um novo planeta logo, logo.", "<32>* ... o que é um planeta?"]
                    : [
                        '<32>{#p/basic}* Mãe disse que dormir pode recuperar sua vida {@fill=#ff0}acima do máximo de HP{@fill=#fff}.',
                        "<32>* ... o que é máximo de HP?"
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/basic}* Os humanos tem um planeta natal?']
                    : ['<32>{#p/basic}* Isso é algo que os monstros tem?']
        ),
        emptytable1: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A tabela parece bastante solitária.)']
                : ["<32>{#p/basic}* É uma mesa solitária.\n* Cheira a glacê."],
        emptytable2: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A tabela parece bastante solitária.)']
                : ["<32>{#p/basic}* É uma mesa solitária.\n* Cheira a cabelo."],
        balcony0: () => ['<18>{#p/papyrus}GOSTANDO DA VISTA?', choicer.create('* (O que você diz?)', 'Sim', 'Não')],
        balcony1: [
            "<18>{#p/papyrus}{#f/9}ÓTIMO!\n* JÁ ERA HORA DE ALGUÉM GOSTAR.",
            '<18>{#f/7}SANS QUASE NÃO TOMA TEMPO PARA OLHAR LÁ FORA!!!'
        ],
        balcony2: [
            "<18>{#p/papyrus}{#f/5}OH...\nBEM, TÁ TUDO BEM...",
            '<18>{#f/4}(CHORINHO...)\nPELO MENOS VOCÊ TENTOU SAIR FORA.',
            "<18>{#f/7}SANS NÃO FARIA NEM ISSO!"
        ],
        bedbook1: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você não parece entender os conteúdos que tem no livro.)"]
                : ["<32>{#p/basic}* É um livro escrito em uma língua ancestral."],
        bedbook3a: ['<32>{#p/basic}* Você gostaria que eu lê-se?'],
        bedbook3b: ['<32>{#p/basic}* Ler de novo?'],
        bedbook4: () => [choicer.create('* (Quer que $(name) leia o livro?)', 'Sim', 'Não')],
        bedbook5: [
            '<32>{#p/basic}* Okay, aí vai...',
            '<32>* \"Muito tempo atrás, duas raças reinavam sobre o sistema solar: humanos e monstros.\"',
            '<32>* \"De início, os monstros eram apenas visitantes, que logo iriam retornar para seu próprio sistema solar.\"',
            '<32>* \"Mas os monstros se facinaram pela humanidade e queriam coexistir com eles.\"',
            '<32>* \"Dessa forma, eles compartilharam sua tecnologia com os humanos, formando uma aliança.\"',
            '<32>* \"Pelas próximas centenas de anos, monstros e humanos viveram em paz e harmonia.\"',
            '<32>* \"Um dia, os humanos começaram a temer algo nos monstros...\"',
            '<32>* \"Um medo que, sem liderança habilidosa, foi permitido sair do controle.\"',
            '<32>* \"O tempo passou, uma guerra estourou entre as duas espécies.\"',
            '<32>* \"Muitas batalhas e confrontos ocorreram entre as estrelas...\"',
            '<32>* \"Mas os humanos, cheios de medo e determinação, facilmente tomaram controle.\"',
            '<32>* \"Então, em um dia de desgraça, uma arma colossal foi disparada contra o planeta dos monstros.\"',
            '<32>* \"Após a destruição do planeta natal dos monstros, os humanos declararam vitória.\"',
            '<32>* \"Um tratado foi assinado entre as duas espécies, e...\"',
            '<32>* \"Os monstros restantes foram banidos para um posto avançado abandonado.\"',
            '<32>* \"Então, os humanos chamaram sete das suas mais brilhantes mentes.\"',
            '<32>* \"Juntos, eles formaram um plano, e eventualmente...\"',
            '<32>* \"Um escudo de força poderoso foi criado, e os monstros foram presos dentro.\"',
            "<32>* Bem, essa é a história."
        ],
        bedbook6: ['<32>{#p/basic}* Se você quiser que eu leia é só dizer.'],
        beddoor1: ["<32>{#p/basic}{#npc/a}* Se você quiser um quarto, vai ter que me perguntar primeiro."],
        beddoor2: ["<32>{#p/basic}{#npc/a}* Se você quiser um quarto de novo, vai ter que perguntar antes."],
        beddoor3: ['<32>{#p/basic}{#npc/a}* Desculpe, munchkin!\n* Não há mais vagas aqui!'],
        candy1: () =>
            postSIGMA()
                ? ["<32>{#p/basic}* Está fora de serviço."]
                : [
                    SAVE.data.b.svr
                        ? '<32>{#p/human}* (Você se aproxima da máquina de venda.)'
                        : "<32>{#p/basic}* É uma exuberante-exclusiva máquina de venda.",
                    choicer.create('* (Comprar Exoberries por 8G?)', 'Sim', 'Não')
                ],
        candy2: ["<32>{#p/human}* (Você não tem G suficiente.)"],
        candy3: ["<32>{#p/human}* (Você está carregando muito.)"],
        candy4: ['<32>{#p/human}* (Você pegou as Exoberries.)'],
        candy5: ['<32>{#p/human}* (Você decide não comprar.)'],
        capstation1: [
            '<32>{#p/human}* (Você olha atrás da estação e achou uma chave.)',
            '<32>{#s/equip}{#p/human}* (A Chave Rústica foi adicionada ao seu chaveiro.)',
            '<32>* (Olhe seu Celular para ver todas as chaves.)'
        ],
        capstation2: ['<32>{#p/human}* (Você olha atrás da estação.)', '<32>{#p/basic}* Nada novo aqui.'],
        crossword0: () =>
            world.edgy
                ? [
                    '<25>{#p/sans}* oh, e aí.',
                    '<25>{#p/sans}{#f/2}* Se você gostou daquele último desafio, espera até você ver o próximo.'
                ]
                : [
                    '<18>{#p/papyrus}{#f/9}HUMANO!!',
                    '<18>{#f/9}VOCÊ VIU MEUS QUEBRA-CABEÇAS.',
                    '<18>{#f/4}MAS O QUE VOCÊ ESTÁ PRESTES A VER...'
                ],
        crossword1: () =>
            world.edgy
                ? [
                    '<26>{#p/sans}* não, realmente.\n* vem aí e dá uma olhada.',
                    "<25>{#p/sans}* está bem alí no chão."
                ]
                : [
                    "<18>{#p/papyrus}{#f/7}SANS!!\nCADÊ O QUEBRA-CABEÇA!?",
                    "<25>{#p/sans}* você tá olhando pra ele.",
                    '<18>{#p/papyrus}{#f/1}O QUÊ?\nAQUELA COISA NO CHÃO?',
                    '<18>{#f/4}OKAY...'
                ],
        crossword2: (check: boolean) =>
            world.edgy
                ? [
                    check
                        ? '<25>{#p/sans}* E aí, como é que foi?\n* ... muito difícil pra aguentar?'
                        : "<25>{#p/sans}* não se dá nem o esforço de olhar, huh?",
                    "<25>* Acho que eu não deveria ter esperado muito.",
                    '<26>{#f/3}* oh pois bem.\n* talvez um kakuro seja mais fácil para você.',
                    '<26>{#f/0}* mas eu dúvido.'
                ]
                : [
                    check
                        ? "<18>{#p/papyrus}{#f/7}SANS!!!\nAQUILO NÃO FEZ NADA!"
                        : "<18>{#p/papyrus}{#f/7}SANS!!!\nELE NEM OLHOU!",
                    '<25>{#p/sans}* ops.',
                    "<25>{#f/3}* eu sabia que deveria ter usado o kakuro de hoje mais cedo.",
                    '<18>{#p/papyrus}{#f/1}O QUÊ!? KAKURO!?',
                    "<18>{#f/9}EU NÃO ACREDITO QUE VOCÊ DISSE ISSO!!",
                    '<18>{#f/4}EM MINHA OPINIÃO...',
                    '<18>{#f/0}SUDOKU É BEM MAIS DIFÍCIL.',
                    '<25>{#p/sans}* o quê? sério, mano?\n* aquele embaralhamento de números fácil?',
                    "<25>{#f/4}* aquilo é pra esqueletinhos.",
                    '<18>{#p/papyrus}{#f/4}IN. NACREDITAVEL.',
                    '<18>{#f/9}HUMANO!!!\nRESOLVA ESSA DISPUTA!',
                    choicer.create('* (Qual é mais difícil?)', 'Sudoku', 'Kakuro')
                ],
        crossword3a: [
            '<18>{#p/papyrus}HA! HA! SIM!',
            '<18>HUMANOS DEVEM SER MUITO INTELIGENTES!',
            '<18>SE ELES TAMBÉM ACHAM SUDOKU DIFÍCIL!',
            '<18>{#f/9}NYEH! HEH! HEH HEH!'
        ],
        crossword3b: [
            '<18>{#p/papyrus}{#f/9}VOCÊS DOIS SÃO ESQUISITOS!',
            '<18>{#f/0}KAKURO É TÃO FÁCIL.',
            "<18>É A MESMA SOLUÇÃO TODA VEZ.",
            '<18>{#f/4}EU SÓ PREENCHO AS CAIXAS COM A LETRA \"Z\"...',
            '<18>{#f/4}PORQUE TODA VEZ QUE EU OLHO PARA UM KAKURO...',
            '<18>{#f/9}TUDO QUE EU CONSIGO FAZER É DORMIR!!!'
        ],
        crossword3c: [
            '<25>{#p/sans}{#f/3}* aliás, tem um par de cachorros vasculhando por aí...',
            "<25>{#f/0}* eu tomaria bastante cuidado se fosse você."
        ],
        crossword4a: pager.create(0, ['<25>{#p/sans}* ei, onde você está indo, bacana?'], ['<25>{#p/sans}* caminho errado.']),
        crossword4b: pager.create(0, ["<25>{#p/sans}* sério?\n* não é tão ruim."], ['<25>{#p/sans}* sério?']),
        crossword5a: [
            '<25>{#p/sans}* valeu por dizer \"sudoku\" pra deixar meu irmão mais feliz.',
            '<25>{#f/4}* Ontem ele ficou tentando \"resolver\" um mapa estelar.'
        ],
        crossword5b: [
            '<25>{#p/sans}* papyrus... acha dificuldades em lugares interessantes.',
            '<25>{#f/4}* Ontem ele ficou tentando \"resolver\" um mapa estelar.'
        ],
        crossword6a: [
            "<25>{#p/sans}{#f/3}* eu meio que imaginei que você evitaria isso.",
            "<25>{#f/0}* isso só parece o tipo de coisa que você faz, não é mesmo?"
        ],
        crossword6b: [
            "<25>{#p/sans}{#f/3}* estou surpreso.\n* eu pensei que você iria só passar sem olhar.",
            "<25>{#f/2}* talvez você não seja tão terrível depois de tudo."
        ],
        crossword6c: ['<25>{#p/sans}{#f/2}* heheh, te fiz olhar.'],
        crossword6d: [
            "<25>{#p/sans}{#f/3}* estou surpreso.\n* eu acho que você nem estaria interessado.",
            "<25>{#f/2}* talvez você não seja tão terrível depois de tudo."
        ],
        doggo1: [
            '<32>{#p/basic}* Alguma coisa se mexeu?\n* Foi minha imaginação?',
            '<32>* Se algo estava se mexendo...\n* Por exemplo um humano...',
            "<32>* Eu vou ter certeza que nunca mais saia daqui!"
        ],
        doggo2: [
            [
                "<32>{#p/basic}* A-a-a-algo me acariciou...\n* Algo que nem estava se m-m-mexendo...!",
                "<32>* Eu vou precisar de uns biscoitos caninos depois disso."
            ],
            ['<32>{#p/basic}* Uma chave inglesa apareceu do nada, h-huh!?!?', '<32>{#p/basic}* ... que dia!'],
            [],
            [
                '<32>{#p/basic}* Um h-h-humano apareceu e me atacou...\n* Do n-n-nada...!',
                "<32>{#p/basic}* Eu vou...\n* Eu vou pra cama."
            ]
        ],
        doggo3: pager.create(
            0,
            ['<32>{#p/basic}* Olá?\n* Tem alguém aí?'],
            ['<32>{#p/basic}* Vocês dois estão estão planejando me enganar?\n* Bem engraçado, caras.'],
            ['<32>{#p/basic}* Big lug?\n* É você?\n* Vamos lá...'],
            ["<32>{#p/basic}* Bem, não é aquele esqueleto alto...\n* Ele é bem barulhento."],
            ['<32>{#p/basic}* Seja lá quem você for, para com isso!!!'],
            ['<32>{#p/basic}* ...']
        ),
        doggo3x: ['<32>{#p/basic}* (Ronco... ronco...)'],
        drop_chip: [
            '<32>{#p/basic}* Você acabou de...\n* Jogar fora a parte minha que eu te dei?',
            '<32>* Eu não tenho palavras para você...\n* Desapareça!'
        ],
        drop_cream: ["<32>{#p/basic}* Você sabe, você tem sorte que eu sou ocupado."],
        eat_chip: [
            '<32>{#p/basic}* Você acabou de...\n* Consumir a parte de mim que eu te dei?',
            '<32>* Eu não tenho palavras para você...\n* Desapareça!'
        ],
        eat_cream: ['<32>{#p/basic}* Legal te ver aproveitar um Sorvete Sonho!\n* Bem legal!'],
        genotext: {
            asriel1: () =>
                [['<25>{#p/asriel2}{#f/9}* Só me segue...'], ['<25>{#p/asriel2}{#f/16}* Por aqui.']][
                Math.min(SAVE.flag.n.ga_asriel1++, 1)
                ],
            asriel2: () =>
                [
                    ["<25>{#p/asriel2}{#f/2}* Hora, hora... se não é o grande Papyrus logo a frente."],
                    ['<25>{#p/asriel2}{#f/3}* Hora, hora... lá vamos nós de novo.']
                ][Math.min(SAVE.flag.n.killed_sans, 1)],
            asriel3: () =>
                [
                    ["<25>{#p/asriel2}{#f/1}* Vamos nos apresentar, que tal?"],
                    ['<25>{#p/asriel2}{#f/4}* Você sabe o roteiro daqui.']
                ][Math.min(SAVE.flag.n.killed_sans, 1)],
            asriel4: ['<25>{*}{#p/asriel2}{#f/5}* Olá!{^5}{%}'],
            asriel5: ['<18>{*}{#p/papyrus}{#f/1}MAS QUE- {%}'],
            asriel6: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/13}* ... $(name), você...',
                        '<25>{#f/17}* Você acha que pode tomar frente daqui?',
                        "<25>{#f/15}* Não que tenha algo de errado comigo, mas...",
                        "<25>{#f/16}* Eu só acho que você é melhor do que eu nisso.",
                        "<25>{#f/17}* É, é isso.\n* Você é melhor nesse tipo de coisa."
                    ],
                    ["<25>{#p/asriel2}{#f/16}* Okay, é.\n* Eu vou, uh... te deixar tomar conta partir daqui."],
                    ['<25>{#p/asriel2}{#f/15}* Então, uh... avante?'],
                    ['<25>{#p/asriel2}{#f/15}* ...']
                ][Math.min(SAVE.flag.n.ga_asriel6++, 3)],
            asriel9: ["<25>{#p/asriel2}{#f/8}* Psst, vamos esperar e ver o que ele faz."],
            asriel10: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/15}* Uau.\n* Ver Papyrus neste estado...',
                        "<25>{#f/16}* ... é certamente inesperado, não é?",
                        '<25>{#f/13}* Oh, $(name)...',
                        "<25>{#f/1}* Nós vamos nos divertir bastante."
                    ],
                    ['<25>{#p/asriel2}{#f/16}* Pobre, pobre Papyrus.']
                ][Math.min(SAVE.flag.n.ga_asriel10++, 1)],
            asriel17: () =>
                [["<25>{#p/asriel2}{#f/16}* Senhor... algumas pessoas só não entendem."], ['<25>{#p/asriel2}{#f/4}* Tch.']][
                Math.min(SAVE.flag.n.ga_asriel17++, 1)
                ],
            asriel24: () =>
                [['<25>{#p/asriel2}{#f/4}* Que perda de tempo.'], ['<25>{#p/asriel2}{#f/3}* Huh.']][
                Math.min(SAVE.flag.n.ga_asriel24++, 1)
                ],
            asriel26: () =>
                [
                    [
                        "<26>{#p/asriel2}{#f/3}* Aqui acaba a unidade canina.",
                        '<26>{#p/asriel2}{#f/4}* Só mais uma ponte entre nós e a cidade.',
                        '<25>{#f/1}* ... fique atrás de mim.'
                    ],
                    ['<25>{#p/asriel2}{#f/3}* Para a cidade nós vamos...']
                ][Math.min(SAVE.flag.n.ga_asriel26++, 1)],
            asriel28: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/6}* Okay, $(name).\n* A cidade é toda sua.",
                        "<25>{#f/7}* No meio tempo, eu vou precisar fazer algo importante mais tarde.",
                        "<25>{#f/1}* Eu estarei de volta antes que você saiba."
                    ],
                    ['<25>{#p/asriel2}{#f/1}* Te vejo de novo depois da cidade.']
                ][Math.min(SAVE.flag.n.ga_asriel28++, 1)],
            asriel29: () =>
                [
                    SAVE.data.b.papyrus_secret
                        ? [
                            '<25>{#p/asriel2}{#f/2}* Hee.\n* Hee.\n* Hee....',
                            "<25>{#f/10}* ... pera, cadê o Papyrus?",
                            '<25>{#f/10}* ...',
                            "<25>{#f/4}* Senhor, $(name), eu não pensei que você o mataria dessa forma."
                        ]
                        : [
                            '<25>{#p/asriel2}{#f/2}* Hee.\n* Hee.\n* Hee....',
                            "<25>{#f/1}* Já era hora daquele cabeça de osso pagar o preço por sua piedade.",
                            '<25>{#f/13}* Hee hee hee.\n* Ele queria tanto te perdoar.',
                            "<25>{#f/16}* Mas, vamos ser honestos com nós mesmos...",
                            "<25>{#f/1}* Nós temos peixe maior para pescar."
                        ],
                    ['<25>{#p/asriel2}{#f/13}* Pois bem.\n* O esqueleto morreu de novo para nada.'],
                    [
                        "<25>{#p/asriel2}{#f/13}* Você sabe, eles dizem que a terceira vez trás um charme.",
                        '<25>{#f/16}* Que triste que ele sempre morre só com uma porrada.'
                    ],
                    [
                        "<25>{#p/asriel2}{#f/6}* Já é a quarta vez que você o matou.",
                        "<25>{#f/8}* Estou começando a pensar que você ama fazer isso..."
                    ],
                    ['<25>{#p/asriel2}{#f/15}* De novo...?']
                ][Math.min(SAVE.flag.n.ga_asriel29++, 4)],
            asriel30: () => [
                '<25>{#p/asgore}{#f/1}* ...',
                '<25>{#f/1}* Olá, Asriel.',
                '<25>{#f/2}* ...',
                '<25>{#f/3}* Precisamos conversar.',
                ...[
                    [
                        '<25>{#p/asriel2}{#f/6}* Conversar?\n* Sobre o que?',
                        '<25>{#f/6}* Pra quê você está aqui?',
                        "<25>{#f/7}* Você sabe que só morreria pra mim, de toda forma.",
                        '<25>{#f/8}* Falando nisso... {%15}'
                    ],
                    [
                        "<25>{#p/asriel2}{#f/8}* Conversar?\n* Não me faça perder tempo.",
                        "<25>{#f/6}* EU SEI muito bem que você é apenas um holograma.",
                        '<25>{|}{#p/asgore}{#f/5}* Como você- {%}',
                        '<25>{#p/asriel2}{#f/1}* Rum.'
                    ]
                ][Math.min(SAVE.flag.n.ga_asriel30x, 1)]
            ],
            asriel30a: [
                '<25>{#p/asriel2}{#f/8}* Sério?\n* Um holograma?',
                '<25>{#f/6}* Eu sabia que você era um covarde, mas isso é outro nível.'
            ],
            asriel30b: [
                '<25>{#p/asgore}{#f/1}* Você não tem nada melhor para fazer?',
                '<25>{#p/asriel2}{#f/8}* ...',
                '<25>{|}{#p/asgore}{#f/3}* Olha, filho, eu só- {%}',
                "<25>{#p/asriel2}{#f/7}* Eu não sou seu filho.\n* Eu não tenho SIDO seu filho a muito tempo.",
                '<25>{#p/asgore}{#f/2}* ...',
                '<25>{#p/asgore}{#f/1}* Certo, Asriel.\n* Você não percebe o que está fazendo consigo?',
                "<25>{#f/2}* Você se tornou psicopático.\n* Imperdoável.",
                "<25>{#p/asriel2}{#f/8}* Ugh, não diga como se você realmente ligasse pra mim, pai.",
                '<25>{#p/asgore}{#f/5}* ...',
                '<25>{#p/asriel2}{#f/9}* Ah, desculpa.\n* Eu disse \"Pai?\"\n* Eu quis dizer \"Asgore.\"',
                '<25>{#f/1}* Desculpinha.',
                '<25>{#p/asgore}{#f/3}* ...\n* Sério agora...',
                '<25>{#f/5}* Você deve reconsiderar o que está fazendo, não pelo nosso bem...',
                '<25>{#f/6}* Mas pelos seus!',
                '<25>{#p/asriel2}{#f/8}* ...',
                '<25>{#p/asriel2}{#f/7}* ... me dá um tempo.',
                "<26>{#f/6}* É ÓBVIO que você só está querendo me fazer parar.",
                '<25>{#p/asgore}{#f/3}* ...',
                '<25>{#p/asriel2}{#f/6}* ...',
                '<25>{#p/asgore}{#f/7}* Você deve considerar a gravidade das suas escolhas!',
                "<25>{#p/asriel2}{#f/15}* Ou o quê? Eu vou voar no espaço para nunca mais ser visto?",
                "<25>{#f/16}* Vamos lá $(name), já fizemos tudo que tinha pra fazer aqui."
            ],
            asriel30c: ['<25>{*}{#p/asgore}{#f/8}* Asriel, por favor!\n* Eu só quero ajudar!{^999}'],
            asriel30d: () =>
                [
                    ['<25>{#p/asriel2}{#f/3}* Prepare-se, $(name).', "<26>{#f/4}* Aqui é domínio da Undyne."],
                    ['<25>{#p/asriel2}{#f/4}* Vamos indo.']
                ][Math.min(SAVE.flag.n.ga_asriel30d++, 1)],
            papyrusSolo1a: [
                '<18>{#p/papyrus}{#f/31}SANS?\nESTE É UM HUMANO?',
                "<18>{#f/5}É, NÃO É?",
                '<18>{#f/32}NYEH...\nUNDYNE FINALMENTE IRÁ...',
                "<18>{#p/papyrus}{#f/31}EU IREI ME JUNTAR A GUARDA REAL...",
                "<18>{#f/5}ISSO NÃO TE FAZ FELIZ?",
                "<25>{#p/asriel2}{#f/3}* Você não pode continuar pretendendo Papyrus.\n* Ele se foi.",
                '<18>{|}{#p/papyrus}{#f/5}MAS- {%}',
                "<25>{#p/asriel2}{#f/3}* Acabou.\n* Você está perdendo seu tempo nele.", 
                "<18>{#p/papyrus}{#f/6}MAS NÃO PODE SER...\nSANS, ELE...",
                '<18>{#f/31}ELE PROMETEU...',
                "<25>{#p/asriel2}{#f/8}* Aquele preguiçoso é a ULTIMA pessoa que eu confiaria uma promessa.",
                "<26>{#f/9}* Não que eu seja melhor.", 
                '<18>{#p/papyrus}{#f/31}...',
                "<18>{#f/3}DESCULPA.\nEU TENHO QUE IR..."
            ],
            papyrusSolo2a: [
                '<18>{#p/papyrus}{#f/31}OLHA, EU ACABEI DE VOLTAR DA UNDYNE...',
                '<18>{#f/31}ELA ME DISSE QUE O REI TEM UMA OFERTA.',
                '<25>{#p/asriel2}{#f/6}* ...',
                '<18>{#p/papyrus}{#f/3}SUAS PALAVRAS FORAM \"EU QUERO VER MEU FILHO.\"',
                '<18>{#f/7}...',
                
                "<18>{#f/7}EU NÃO ACREDITO QUE O PRÍNCIPE MATOU MEU IRMÃO!",
                '<25>{|}{#p/asriel2}{#f/8}* A culpa foi sua, nós estávamos tentando te- {%}',
                '<18>{#p/papyrus}{#f/7}CALADO!!',
                '<18>{#f/7}VOCÊ TRAIU SUA PRÓPRIA SOCIEDADE!\nSEU PRÓPRIO POVO!',
                '<18>{#f/7}E PARA QUE!?',
                '<18>{#f/7}UMA TENTATIVA DE EGOCENTRISMO?',
                "<25>{#p/asriel2}{#f/16}* Sim, Papyrus.\n* É exatamente isso.",
                '<18>{#p/papyrus}{#f/7}... UGH!!',
                '<18>{#p/papyrus}{#f/4}JÁ PARA VOCÊ, HUMANO...',
                "<18>{#f/7}NÃO PENSE QUE EU NÃO SEI O QUE ESTÁ ACONTECENDO.",
                "<18>{#f/7}É OBVIO QUE É VOCÊ QUEM ESTÁ TIRANDO VIDAS!",
                '<25>{#p/asriel2}{#f/8}* Que observador.',
                '<25>{#f/7}* Acho que podemos provar isso e acabar com você aqui e agora, que tal?',
                '<18>{#p/papyrus}{#f/31}...',
                '<25>{#p/asriel2}{#f/4}* Deixe-me ser claro.\n* Eu admiro seu esforço.',
                "<25>{#f/3}* Mas nós temos nossos próprios planos.",
                "<18>{#p/papyrus}{#f/4}OLHA, UNDYNE PROVAVELMENTE ESTÁ NOS ASSISTINDO.",
                '<25>{#p/asriel2}{#f/3}* E seu ponto é?',
                "<25>{#f/4}* ... olha Papyrus, não importa o que você ou qualquer um faça.",
                '<25>{#f/1}* Quando nós dois estamos juntos, NADA pode nos separar.',
                '<18>{#p/papyrus}{#f/7}TANTO FAZ!!!'
            ],
            papyrusSolo3: ['<25>{#p/asriel2}{#f/3}* Olá.'],
            papyrusSolo3a: () => [
                '<18>{#p/papyrus}{#f/31}SABE DE UMA COISA...',
                '<18>{#f/31}EU ACABEI OUVINDO A DR. ALPHYS FALANDO...',
                '<18>{#f/5}E ELA MENCIONOU ALGO COMO \"VOLTAR NO TEMPO?\"',
                "<18>{|}{#f/32}{#x1}EU NÃO TENHO CERTEZA, MAS PARECE QUE- {%}",
                '<25>{#p/asriel2}{#f/6}* Não.',
                '<18>{|}{#p/papyrus}{#f/6}MAS ELA DISSE QUE VOCÊ DEVE SER CAPAZ DE- {%}',
                ...(SAVE.flag.n.genocide_milestone < 5
                    ? ['<25>{#p/asriel2}{#f/6}* Não.']
                    : SAVE.flag.n.genocide_milestone < 6
                        ? ["<25>{#p/asriel2}{#f/6}* Não.\n* Mas, eu tenho certeza que ela amaria se eu o fizesse."]
                        : ["<25>{#p/asriel2}{#f/6}* Não.\n* E ela vai morrer no final também, de toda forma."]),
                '<18>{#p/papyrus}{#f/31}MAS, SE VOCÊ PODE RESETAR O QUE ACONTECE...',
                '<18>{#f/5}ENTÃO, POR QUE NÃO?',
                "<18>{#f/31}E, NA PRÓXIMA VEZ, EU VOU NO LUGAR DELE.",
                "<18>{#f/3}ENTÃO ELE NÃO VAI PRECISAR MORRER, CERTO?",
                "<25>{#p/asriel2}{#f/6}* ...\n* Confie em mim, eu já vi essa linha do tempo.",
                "<25>{#f/7}* É ENTEDIANTE.",
                '<18>{#p/papyrus}{#f/3}...',
                '<18>{#f/6}MAS E SE EU TE MOSTRAR ESTE QUEBRA-CABEÇA?',
                '<18>{#f/32}TALVEZ TE AJUDE A ALIVIAR O TÉDIO...',
                '<25>{#p/asriel2}{#f/15}* ...',
                '<25>{#p/asriel2}{#f/15}* Se faz você se sentir melhor, eu acho.',
                '<18>{#p/papyrus}OH... OH!',
                "<18>{#f/0}ISSO É ÓTIMO!!",
                "<18>{#f/0}VOCÊ JÁ ESTÁ MUDANDO DE IDEIA!",
                '<25>{#p/asriel2}{#f/8}* ...',
                '<18>{#p/papyrus}{#f/6}...',
                '<18>{|}{#f/5}AS REGRAS SÃO- {%}',
                '<25>{#p/asriel2}{#f/7}* Nós já sabemos as regras, imbecil.',
                '<18>{#p/papyrus}{#f/31}... OH...',
                '<18>{#f/6}UH, POIS BEM!!\nSEM PERDA DE TEMPO...',
                "<18>{#f/9}VAMOS VER QUAL SERÁ O NÚMERO ALEATÓRIO!!"
            ],
            papyrusSolo4a: [
                '<18>{#p/papyrus}{#f/3}ASRIEL.',
                '<25>{#p/asriel2}{#f/6}* Papyrus.',
                '<18>{#p/papyrus}{#f/31}...',
                '<18>{#f/31}POR QUE?',
                '<18>{#f/31}POR QUE VOCÊ FARIA ISSO?',
                "<18>{#f/3}MONSTROS NÃO DEVERIAM SER ASSIM...",
                "<18>{#f/5}ONDE ESTÁ SEU AMOR?\nSUA COMPAIXÃO?",
                '<18>{#f/31}SUA... PIEDADE...',
                '<25>{#p/asriel2}{#f/2}* ...\n* Oh, sua adorável criança estrelada...',
                '<25>{#f/1}* Eu perdi essas coisas a MUITO tempo atrás.',
                "<18>{#p/papyrus}{#f/31}MAS...\nEU NÃO ENTENDO...",
                '<18>{#f/5}COMO UM MONSTRO TÃO PURO DE MENTE...',
                '<18>{#f/31}... TER SE TORNADO TOTALMENTE PARA O LADO OBSCURO?',
                '<25>{#p/asriel2}{#f/1}* Você realmente quer saber?',
                '<18>{#p/papyrus}{#f/3}...',
                '<18>{#f/3}SIM...',
                '<25>{#p/asriel2}{#f/10}* Mas você realmente, realmente quer saber?',
                '<18>{#p/papyrus}{#f/31}SIM.',
                '<25>{#p/asriel2}{#f/3}* Diga mais alto.',
                '<18>{#p/papyrus}{#f/5}SIM!',
                '<26>{#p/asriel2}{#f/1}* Com uma cereja no topo.',
                '<18>{#p/papyrus}{#f/7}SIM!\nCOM UMA CEREJA NO TOPO, CARAMBA!',
                '<25>{#p/asriel2}{#f/1}* Hee hee hee...',
                "<25>{#f/1}* Certo, eu te conto.",
                "<25>{#f/15}* Só vai precisar de uma palavra...",
                '<18>{#p/papyrus}{#f/4}AI MEU SENHOR, SÓ FALA LOGO...'
            ],
            papyrusSolo4b: [
                '<25>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* $(name).{%100}',
                '<18>{#p/papyrus}{#f/32}...!',
                '<25>{#p/asriel2}{#f/5}* Hah!\n* Hahaha!\n* O olhar em seu rosto!'
            ],
            papyrusSolo4c: ['<18>{#p/papyrus}{#f/31}EU...', '<18>{#f/3}... NÃO...'],
            papyrusSolo4d: [
                "<18>{#p/papyrus}{#f/7}NÃO, VOCÊ ESTÁ ERRADO.",
                "<18>{#f/7}VOCÊ É QUEM ESTÁ TENTANDO ME TRAZER PARA BAIXO.",
                "<18>{#f/7}VOCÊ É QUEM ESTÁ ME CONTANDO MENTIRA.",
                '<18>{#f/9}MAS EU, PAPYRUS...',
                '<18>{#f/9}FINALMENTE ENTENDI A {@fill=#f00}REALIDADE{@fill=#fff}.',
                "<25>{#p/asriel2}{#f/13}* Oh?\n* E o que seria?"
            ],
            papyrusSolo4e: ["<18>{#p/papyrus}{#f/34}VOCÊ NÃO É {@fill=#f00}ASRIEL{@fill=#fff}."],
            papyrusSolo4f: [
                '<18>{#f/31}{@fill=#f00}ASRIEL{@fill=#fff} JAMAIS AGIRIA ASSIM.',
                '<18>{#f/5}{@fill=#f00}ASRIEL{@fill=#fff} TINHA UMA ALMA CHEIA DE BONDADE.',
                '<18>{#f/5}{@fill=#f00}ASRIEL{@fill=#fff} ACREDITAVA NAS PESSOAS...',
                '<18>{#f/31}ELE ACREDITOU NA HUMANIDADE ANTES DE TODO MUNDO.',
                '<18>{#f/4}VOCÊ, POR OUTRO LADO...',
                '<18>{#f/7}VOCÊ SÓ QUER USÁ-LO PARA SEUS PRÓPRIOS FINS!',
                "<18>{#f/4}E EU NÃO ME IMPORTO COM O QUE VOCÊ TEM A DIZER.",
                '<18>{#f/9}EU AINDA TENHO ESPERANÇA NESTE HUMANO.',
                "<25>{#p/asriel2}{#f/8}* Pois, se você tem tanta esperança nele...",
                '<25>{#f/7}* Então me prove errado.',
                "<25>{#f/3}* Eu vou deixar você levá-lo para o um contra um.",
                "<25>{#f/3}* Se ele te poupar, então eu irei admitir estar errado.",
                '<25>{#f/4}* Mas se ele te matar, o que inevitavelmente será o caso...',
                "<25>{#f/1}* Você perceberá que eu estava certo e que ELE morreu pra nada.",
                '<25>{#f/1}* O que você acha?',
                '<18>{#p/papyrus}{#f/9}...\nEU ACEITO.',
                '<25>{#p/asriel2}{#f/3}* Esplêndido.',
                '<25>{#f/4}* Te vejo nunca.'
            ]
        },
        houz: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* <32>{#p/human}* (Você coloca as mãos na porta fortemente arranhada.)']
                : ['<32>{#p/basic}* A porta está coberta de arranhados de gato.'],
        gonezo: () =>
            world.bulrun ? ['<32>{#p/basic}* ... mas todo mundo correu.'] : ['<32>{#p/basic}* ... mas ninguém veio.'],
        garbanzo: ['<32>{#p/human}* (Mas não tem ninguém por perto para ocupar o acento.)'],
        doggonopoggo: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Mas não tem ninguém aqui.)']
                : (game.room === 's_doggo' && SAVE.data.n.state_starton_doggo === 2) || // NO-TRANSLATE

                    (game.room === 's_dogs' && SAVE.data.n.state_starton_dogs === 2) || // NO-TRANSLATE

                    (game.room === 's_pacing' && SAVE.data.n.state_starton_lesserdog === 2) // NO-TRANSLATE

                    ? ['<32>{#p/basic}* ... mas ninguém veio.']
                    : ["<32>{#p/basic}* Ninguém está em casa."],
        housebloc: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* (Você não achou um caminho para dentro.)"] : ["<32>{#p/basic}* Está trancado."],
        innkeep1a: pager.create(
            0,
            () => [
                "<32>{#p/basic}{#npc/a}* Bem-vindo ao Starred Inn!\n* O principal hotel de Starton!",
                '<32>* Uma noite custa 60G.',
                choicer.create('* (Aceitar um quarto?)', 'Sim', 'Não')
            ],
            () => [
                '<32>{#p/basic}{#npc/a}* Mudou de ideia?',
                '<32>* Lembre-se, uma noite é 60G.',
                choicer.create('* (Aceitar um quarto?)', 'Sim', 'Não')
            ]
        ),
        innkeep1b: pager.create(
            0,
            () => [
                '<32>{#p/basic}{#npc/a}* Voltou de novo?\n* Lembre-se, uma noite é 60G.',
                choicer.create('* (Pegar um quarto de novo?)', 'Sim', 'Não')
            ],
            () => ['<32>{#p/basic}{#npc/a}* Mudou de ideia?', choicer.create('* (Pegar um quarto de novo?)', 'Sim', 'Não')]
        ),
        innkeep1c: pager.create(
            0,
            () => [
                '<33>{#p/basic}{#npc/a}* Voltou?\n* Fique o tanto que quiser!',
                choicer.create('* (Pegar um quarto de novo?)', 'Sim', 'Não')
            ],
            () => ['<32>{#p/basic}{#npc/a}* Mudou de ideia?', choicer.create('* (Pegar um quarto de novo?)', 'Sim', 'Não')]
        ),
        innkeep2a: [
            "<32>{#p/basic}{#npc/a}* ... você não tem 60G?",
            "<32>* Oh! Pobre coisinha.\n* Eu posso apenas imaginar pelo que você tem passado.",
            '<32>* Um dos quartos lá em cima está vazio, você pode dormir de graça, tá bom?'
        ],
        innkeep2b: ["<32>{#p/basic}{#npc/a}* Aqui está sua chave do quarto.\n* Lembre-se de dormir bem!"],
        innkeep2c: ["<32>{#p/basic}{#npc/a}* Desculpa, você não tem G..."],
        innkeep3a: ['<32>{#p/basic}{#npc/a}* Uau!\n* Você parece ter dormido tão bem.'],
        innkeep3b: ['<32>* O que é incrível...\n* ... considerando que você só ficou lá em cima por alguns minutos.'],
        innkeep3c: ['<32>* Sinta-se livre para voltar quando estiver cansado.'],
        innkeep3d: ["<32>* Pega seu dinheiro de volta.\n* Você pode me pagar quando for ficar a noite toda."],
        innkeep4: ["<32>{#p/basic}{#npc/a}* Não muito afim de dormir?\n* Bem, eu sempre estarei aqui se você precisar!"],
        innkeep5: [
            '<32>{#p/basic}{#npc/a}* Olá!\n* Desculpa, sem tempo pra dormir...',
            '<32>* Starred Inn está fechando para sempre, já que assim podemos ir embora para o novo mundo.'
        ],
        innkeep6: [
            "<32>{#p/basic}{#npc/a}* Oh, você está aí.\n* Eu estive preocupada com você!",
            '<32>* Tudo vai ficar bem, ouviu?',
            "<32>* Nós todos iremos para um novo mundo, agora...",
            "<32>* Com certeza haverá um lugar onde você pode ficar lá!"
        ],
        kidd1: pager.create(
            2,
            ["<25>{#p/kidd}{#f/1}* Como tá?"],
            ['<25>{#p/kidd}{#f/1}* Yo, como tá ino?'],
            ['<25>{#p/kidd}{#f/1}* Ei, ei!'],
            ['<25>{#p/kidd}{#f/1}* Muito legal te ver, haha.'],
            ["<25>{#p/kidd}{#f/1}* Woah, cara, o que você tá fazendo?"]
        ),
        kidd2: pager.create(
            0,
            () =>
                game.room === 's_town1' // NO-TRANSLATE

                    ? [
                        "<25>{#p/kidd}{#f/1}* Yo, você é uma criança também, correto?",
                        "<25>{#p/kidd}{#f/1}* Eu posso dizer porque você tá usando uma camisa listrada."
                    ]
                    : [
                        '<25>{#p/kidd}{#f/7}* Pera, você lê livros também!?',
                        '<25>{#p/kidd}{#f/1}* Aquela livrarvia me ensinou tudo que eu sei sobre os monstros!',
                        "<25>{#p/kidd}{#f/3}* Eu nem consigo imaginar como deve ser viver em um planeta..."
                    ],
            () =>
                game.room === 's_town1' // NO-TRANSLATE

                    ? ['<25>{#p/kidd}{#f/1}* Eu me pergunto se aquele esqueleto pequeno é uma criança ou um adulto.']
                    : ['<25>{#p/kidd}{#f/3}* Você já viveu em um planeta?']
        ),
        marriage1: [
            "<32>{#p/basic}* O que é esse cheiro?\n* (Onde está esse cheiro?)",
            "<32>* Se você é o cheiro...\n* (... identifique seu cheiro!)"
        ],
        marriage2: [
            "<32>{#p/basic}* Hmmm...\n* Aqui está aquele cheiro estranho.",
            '<32>* Ele me faz querer eliminar...',
            '<32>* (... eliminar VOCÊ!)'
        ],
        marriage3a: [
            '<32>{#p/basic}* Cachorros podem acariciar cachorros???\n* (Um novo mundo se abriu.)',
            '<32>* Obrigado, cachorrinho estranho!'
        ],
        marriage3b: [
            '<32>{#p/basic}* Cheiros estranhos podem trazer boas coisas...\n* (Amizade divertida!)',
            '<32>* Obrigado, cheiro estranho! \n* (Com certeza foi divertido pegar uma \"chave inglesa\" nas obras!)'
        ],
        marriage3c: [
            "<32>{#p/basic}* Está difícil de respirar...\n* (Cada vez mais difícil de enxergar...)",
            "<32>* Vamos meter o pé daqui!"
        ],
        marriage3d: [
            '<32>{#p/basic}* Aquele cachorro estranho aparou do nada...\n* (Quase nos matou...)',
            "<32>* Vamos meter o pé daqui!"
        ],
        marriage3e: [
            "<32>{#p/basic}* Os cães podem acariciar E brincar de buscar com outros cães???\n* (É quase criminoso...)",
            '<32>* Obrigado, cachorrinho estranho!\n* (Depois disso, nossas vidas jamais serão as mesmas!)'
        ],
        marriage4: [
            "<32>{#p/basic}* Onde está o príncipe?\n* (Nós viemos no caminho certo?)",
            '<32>* Nós devemos parar aquela ameaça...\n* (... e sua companhia humana!)'
        ],
        marriage5: ['<32>{#p/basic}* Hmmm...\n* Aqui estão eles...', "<32>* (Vamos captura-los!)"],
        maze1: () =>
            world.edgy
                ? [
                    '<25>{#p/sans}{#f/0}* bem vindo de volta.',
                    "<25>{#p/sans}{#f/3}* É bem triste que o Papyrus não possa estar aqui, por que...",
                    "<25>{#p/sans}{#f/2}* Ele tem trabalho bem duro e por um bom tempo nestes quebra-cabeças.",
                    "<25>{#p/sans}{#f/0}* mas tudo bem.",
                    "<25>{#p/sans}{#f/0}* eu prometi pra ele que eu te mostraria, então aí vai."
                ]
                : [
                    '<18>{#p/papyrus}OHO, O HUMANO APARECE!',
                    '<18>MEU IRMÃO E EU CRIAMOS QUEBRAS-CABEÇAS',
                    '<18>{#f/9}VOCÊ ESTÁ PRONTO PARA UM DESAFIO, HUMANO!?',
                    choicer.create('* (O que você diz?)', 'Sim', 'Não'),
                    '<18>{#p/papyrus}RESPOSTA CORRETA!\nPARA VOCÊ ENTENDER...'
                ],
        maze2a: [
            '<18>{#x4}{#f/9}NENHUM ARTESÃO JAMAIS FEZ ARMADILHAS ASSIM!',
            "<18>{#f/0}ELAS SÃO PRATICAMENTE IRRESISTÍVEIS!",
            "<25>{#x1}{#p/sans}{#f/2}* talvez você é quem é irresistível.",
            '<18>{#p/papyrus}{#f/1}SÉRIO!?'
        ],
        maze2b: [
            '<18>{#x4}{#f/9}NENHUM HUMANO JAMAIS PASSOU DAS ARMADILHAS DO GRANDE PAPYRUS!',
            '<25>{#x1}{#p/sans}{#f/4}* nenhum humano teve a chance, mano.',
            "<18>{#p/papyrus}{#x3}{#f/7}UGH, ISSO É ALÉM DO PONTO!!"
        ],
        maze3: ['<18>{#x1}{#f/0}DE TODA FORMA, ESTE É O QUE EU GOSTO DE CHAMAR...'],
        maze3a: [
            '<18>\"O PODEROSO MURO DE FOGO!!\"',
            '<25>{#p/sans}* não dava só pra chamar de \"parede de fogo\"?\n* pra salvar tempo?',
            "<18>{#p/papyrus}{#f/4}DR. ALPHYS DIRIA QUE EU ESTOU SENDO PREGUIÇOSO.",
            "<25>{#p/sans}* sei não, mano, ela parece gostar de fazer isso as vezes...",
            "<30>{#f/2}* aposto que ela acharia\nisso bem {@fill=#ff0}hot{@fill=#fff}."
        ],
        maze4: ['<18>{#p/papyrus}{#x3}{#f/7}AGORA NÃO, SANS!!'],
        maze5: () =>
            world.edgy
                ? [
                    '<25>{#p/sans}{#f/0}* é chamado de \"parede de fogo.\"',
                    "<25>{#p/sans}{#f/2}* sabe.\n* igual o firewall no computador.",
                    '<25>{#p/sans}* a ideia por trás desse é chegar do outro lado.',
                    '<25>{#p/sans}* Simples, né?',
                    "<25>{#p/sans}{#f/3}* Porém, eu testei o quebra-cabeça por conta própria e devo dizer...",
                    "<25>{#p/sans}{#f/2}* Não é fácil como parece."
                ]
                : [
                    '<18>{#p/papyrus}... A IDEIA DESSE QUEBRA-CABEÇA É SIMPLES.',
                    '<18>PORQUE TUDO QUE VOCÊ TEM QUE FAZER...',
                    '<18>{#f/9}É CHEGAR DO OUTRO LADO!',
                    '<18>{#f/0}BOA SORTE!!\nNYEH HEH HEH!!'
                ],
        maze6: pager.create(
            0,
            () =>
                world.edgy
                    ? [
                        '<25>{#p/sans}{#f/0}* Pra quê você está voltando aqui atrás, hein?',
                        '<25>{#p/sans}{#f/3}* Qual foi.\n* Pelo menos tente ser esportivo.'
                    ]
                    : ["<18>{#p/papyrus}{#x2}{#f/7}ONDE VOCÊ PENSA QUE ESTÁ INDO!?"],
            () => (world.edgy ? ['<25>{#p/sans}{#f/0}* sério?'] : ['<18>{#p/papyrus}{#x2}{#f/7}VOLTE JÁ AQUI!'])
        ),
        maze7: [
            [
                '<18>{#p/papyrus}VOCÊ ESTÁ COM MEDO DAS CHAMAS?',
                "<18>{#f/4}NÃO TEMAS, ELAS NÃO PODEM TE MACHUCAR.",
                '<18>{#f/0}SANS DIZ QUE SÃO \"AGRADAVELMENTE QUENTES.\"',
                '<25>{#p/sans}* Na verdade, eu peguei essa fala de uma amiga.',
                '<18>{#p/papyrus}{#f/4}... OH.'
            ],
            [
                '<18>{#p/papyrus}VOCÊ ESTÁ ANSIOSO EM RELAÇÃO A FALHAR?',
                "<18>SE ESSE É O CASO, ENTÃO VOCÊ DEVE SABER...",
                '<18>{#x4}{#f/9}EU, O GRANDE PAPYRUS, NÃO IREI TE JULGAR!',
                '<18>{#f/0}COMO TODO CHEFE SABE, É A INTENÇÃO QUE CONTA.',
                '<18>{#x1}ENTÃO VAI LÁ, TENTE SEU MELHOR!'
            ],
            [
                '<18>{#p/papyrus}{#f/4}(SANS, O QUE O HUMANO ESTÁ FAZENDO??)',
                '<25>{#p/sans}* Ele deve estar estudando o padrão.',
                '<18>{#p/papyrus}{#f/4}(AH, VERDADE.)',
                '<18>{#f/9}NESTE CASO, PROSSIGA QUANDO PRONTO!'
            ]
        ],
        maze8: () =>
            world.edgy
                ? ['<25>{#p/sans}{#f/0}* whoops.\n* Boa tentativa.']
                : [
                    '<18>{#p/papyrus}NYEH HEH HEH!\nPOIS BEM.',
                    "<18>{#f/9}PARECE QUE VOCÊ FOI TAPEADO PELO GRANDE PAPYRUS!",
                    '<18>{#f/0}MAS NÃO FIQUE COM RAIVA!',
                    '<18>VEJA, MINHAS ARMADILHAS NÃO SÃO DESLEIXADAS.',
                    "<18>{#f/9}VOCÊ NÃO PODE SE CULPAR POR FALHAR TÃO FACILMENTE!!"
                ],
        maze9: () =>
            world.edgy
                ? ["<25>{#p/sans}{#f/0}* huh.\n* acho que você é mais esperto do que parece."]
                : [
                    '<18>{#p/papyrus}{#f/1}QUÊ!?',
                    '<18>{#f/7}COMO VOCÊ CONSEGUIU FAZER ISSO!?!?',
                    '<18>ISSO ERA SUPOSTAMENTE PARA SER IMPOSSÍVEL!',
                    '<18>{#f/9}... POIS BEM!\nEU DEVEREI AUMENTAR O NÍVEL DO MEU JOGO!'
                ],
        maze10: () =>
            world.edgy
                ? [
                    "<25>{#p/sans}{#f/0}* bem, é isso.",
                    '<25>{#p/sans}{#f/3}* ... obrigado por jogar, pelo menos.',
                    "<25>{#p/sans}{#f/0}* No meio tempo, eu tenho outro quebra-cabeça para preparar.",
                    "<25>{#p/sans}{#f/2}* Nós, nos veremos de novo."
                ]
                : [
                    '<18>{#f/4}EM TODO CASO...',
                    '<18>{#f/0}EU ESTOU EXCITADO PARA O QUE VIRÁ DEPOIS!',
                    '<18>{#f/4}UM QUEBRA-CABEÇA TÃO CONFUSO...',
                    "<18>{#f/1}NEM TERRESTRIA CONSEGUIU RESOLVER!!!",
                    "<25>{#p/sans}* terrestria? ela não é tipo o monstro mais antigo vivo?",
                    '<18>{|}{#p/papyrus}{#f/1}UH...\nBEM SIM, MAS- {%}',
                    "<25>{#p/sans}* droga, eu não sabia que você pensava ISSO logo de mim.",
                    '<18>{#p/papyrus}{#f/4}QUE.',
                    "<25>{|}{#p/sans}* tipo, se nem ela consegue fazer, então- {%}",
                    '<18>{#p/papyrus}{#f/7}{#x3}EU JÁ ENTENDI O PONTO!!'
                ],
        maze11: ['<18>{#p/papyrus}{#f/7}SANS, TEMOS ARMADILHAS PARA PREPARAR!!', '<18>VAMOS!'],

        nicecreamSc1: [
            "<32>{#p/basic}* Eu não entendo porque não estão vendendo...",
            "<32>* É o lugar perfeito para algo doce..."
        ],
        nicecreamSc2: () => [
            SAVE.data.n.plot > 20.2
                ? '<32>{#p/basic}* OH!!!!\n* ... você voltou!'
                : SAVE.data.b.s_state_scorereaction1 || SAVE.data.n.plot === 20.2
                    ? "<32>{#p/basic}* PERA!!!!\n* Talvez VOCÊ queira algo!"
                    : '<32>{#p/basic}* OH!!!!\n* UM CLIENTE!!',
            '<32>* Olá!\n* Você gostaria de um Sorvete Sonho?',
            SAVE.data.b.s_state_million
                ? '<32>* Como um querido comprador, você ganha um desconto!\n* 6G por Sorvete Sonho!'
                : "<32>* É a guloseima congelada que vai incendiar sua mente!\n* Agora apenas 12G."
        ],
        nicecreamSc3: () => [
            "<32>{#p/basic}* Sorvete Sonho!\n* É a guloseima congelada que vai incendiar sua mente!",
            SAVE.data.b.s_state_million ? '<32>* Para você, 6G!' : '<32>* Agora por 12G.'
        ],
        nicecreamPrompt1: () => [choicer.create('* (Comprar Sorvete Sonho por $(x)G?)', 'Sim', 'Não')],
        nicecreamPrompt2: () => [choicer.create('* (Pegar um Sorvete Sonho?)', 'Sim', 'Não')],
        nicecreamSc4: [
            '<32>{#p/basic}* Bom, então...\n* Conte aos seus amigos...',
            "<32>* Que tem Sorvete Sonho aqui...\n* No meio do nada..."
        ],
        nicecreamFc1: ['<32>{#p/basic}* Eu desloquei meu carrinho, mas ainda assim nada de clientes...'],
        nicecreamFc2: [
            "<32>{#p/basic}* Felizmente, eu pensei em uma solução!",
            '<32>* Cartões Postais!',
            '<32>* Toda vez que você comprar um Sorvete Sonho, você ganha um cartão da caixa.',
            '<32>* Se você tiver três cartões, você pode trocá-los por um Sorvete Sonho grátis!',
            "<32>* Isso com certeza vai trazer os clientes de volta!",
            '<32>* Oh, um, você gostaria de um Sorvete Sonho?',
            "<32>* É a guloseima congelada que vai incendiar sua mente!\n* Agora apenas 10G."
        ],
        nicecreamFc3a: [
            "<32>{#p/basic}* Sorvete Sonho!\n* É a guloseima congelada que vai incendiar sua mente!",
            "<32>* Você tem três cartões, gostaria de trocá-los?"
        ],
        nicecreamFc3b: [
            "<32>{#p/basic}* Sorvete Sonho!\n* É a guloseima congelada que vai incendiar sua mente!",
            '<32>* Agora por 10G.'
        ],
        nicecreamFc4: [
            '<32>{#p/basic}* Bom, então...\n* Conte aos seus amigos...',
            '<32>* Quatro Sorvete Sonhos pelo preço de três...'
        ],
        nicecreamFc5: ["<32>{#p/basic}* Não esqueça de pegar um cartão postal da caixa!"],
        nicecreamNoFun1: ["<32>{#p/basic}* Huh?\n* Você não tem espaço suficiente aí?"],
        nicecreamNoFun2: ['<32>{#p/basic}* Eu queria fazer com que os Sorvete Sonho fossem fáceis de armazenar...'],
        nicecreamNoMun1: ["<32>{#p/basic}* Huh?\n* Você não tem grana o suficiente..."],
        nicecreamNoMun2: ['<32>{#p/basic}* Eu desejava por vender os Sorvete Sonhos de graça...'],
        nicecreamFree1: ['<32>{#p/basic}* Quer saber?\n* Pega, esse é pela casa.'],
        nicecreamFree2: ['<32>{#p/basic}* Aproveite...'],
        nicecreamReturnWithGoods: ['<32>{#p/basic}* Bem, você sempre pode voltar mais tarde.'],
        nicecreamReturnWithNeeds: ["<32>{#p/basic}* Oh, tudo bem.", '<32>* Volte depois, criança!'],
        nicecreamPurchase: ['<32>{#p/basic}* Aqui está!\n* Tenha uma noite estrelada estelar!'],
        nicecreamGet: ['<32>{#s/equip}{#p/human}* (Você pegou o Sorvete Sonho.)'],
        nicecreamK1a: ['<25>{#p/kidd}{#f/1}* Yo, posso ter um Sorvete Sonho?'],
        nicecreamK1b: ["<32>{#p/basic}* Claro, carinha.\n* Se você tiver a grana."],
        nicecreamK1c: ['<25>{#p/kidd}{#f/2}* (Psst, da isso pra ele.)'],
        nicecreamK1d: [
            '<25>{#p/kidd}{#f/7}* Yo, aqui tem Sorvete Sonho de graça!?',
            '<25>{#p/kidd}{#f/1}* Me dá um também!'
        ],
        nicecreamK2: ['<32>{#p/basic}* O... onde você conseguiu isso?'],
        nicecreamK3a: ['<32>* C-claro, criança... aí vai!'],
        nicecreamK3b: [
            '<32>{#s/equip}{#p/human}* (Você dá um Sorvete Sonho para a Criança Monstro.)',
            '<25>{#p/kidd}{#f/7}* DA HORA...'
        ],
        nicecreamE: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}* Vendi tudo de novo, amigão!\n* A certeza da liberdade me trouxe muitos clientes!",
                        ...(world.population_area('s') < 6 || world.population_area('f') < 6 || world.population < 2 // NO-TRANSLATE

                            ? [
                                "<32>* Não que eu vendesse para você se não estivesse tudo vendido...",
                                '<32>* Se eu vendesse Sorvete Sonho para um bully, minha reputação estaria arruinada!'
                            ]
                            : [
                                "<32>* Com o recente sucesso, eu vim refletindo sobre o passado, me lembrando de meu pai.",
                                "<32>* Se ele não tivesse inventado os Sorvete Sonhos, eu estaria vendendo balões."
                            ])
                    ]
                    : [
                        "<32>{#p/basic}* Ei, criança!\n* Eu gostaria de te oferecer um Sorvete Sonho, mas acabou!",
                        '<32>* Os negócios estão correndo como nunca!',
                        "<32>* Não consigo manter o estoque em dia!"
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? world.population_area('s') < 6 || world.population_area('f') < 6 || world.population < 2 // NO-TRANSLATE

                        ? ['<32>{#p/basic}* Nada pessoal, é claro.']
                        : [
                            '<32>{#p/basic}* Aparentemente, ele vendeu seu primeiro Sorvete Sonho no meio da floresta holográfica de Starton.'
                        ]
                    : ['<32>{#p/basic}* Talvez seja hora de começar aquela corrente de \"Sorvete Sonho\" com a qual sempre sonhei...']
        ),
        faunX: () =>
            [
                ['<32>{#p/basic}{#npc/a}* Eu consigo dizer que você não tem amor algum pela vida.\n* Boa sorte, campeão.'],
                ['<32>{#p/basic}{#npc/a}* Continue assim, campeão.\n* Veja onde você vai chegar.'],
                ['<32>{#p/basic}{#npc/a}* Sério, campeão?']
            ][Math.min(roomKills().s_greater++, 2)],
        snowdrakeX: [
            '<32>{#p/basic}{#npc/a}* Guh?\n* Você acabou de...',
            "<32>{#p/basic}{#npc/a}* ...\n* Isso, uh, não é nada legal."
        ],
        moonrocksX1: ['<32>{#p/basic}{#npc/a}* Mas que- \n* Pra quê foi AQUILO?'],
        moonrocksX2: ['<32>{#p/basic}{#npc/b}* Mas, sério...\n* Como AQUILO aconteceu?'],
        npcinter: {
            s_snowdrake: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Ei.\n* Você é bem legal.",
                            '<32>* Só lembre-se, se você acabar lutando com alguém, seja uma entidade divina ou sei lá...',
                            "<32>* Segure [X] para se mover com metade da velocidade.\n* É bem importante."
                        ]
                        : roomKills().s_doggo > 0
                            ? ["<32>{#p/basic}{#npc/a}* Sai de perto de mim, cara!\n* Eu não gosto de você."]
                            : SAVE.data.n.plot < 19
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Ouvi dizer que se você segurar [X] em batalha, você moverá com metade da velocidade!",
                                    '<32>* Eu sei... preguiçoso, certo?',
                                    "<32>* Aí vai um segredo. Aquele cachorro bem alí, não espera que você lute devagar.",
                                    '<32>* Se você se aproximar dele enquanto segura [X], poderá passar despercebido!',
                                    '<32>* Guh huh huh... boa sorte.'
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* Então você voltou pra conversar, huh?',
                                    "<32>* Isso é legal.",
                                    '<32>* Não tão legal quanto eu, mas ainda é bem legal de toda forma.'
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Bem importante.']
                        : roomKills().s_doggo > 0
                            ? ["<32>{#p/basic}{#npc/a}* Você me ouviu?\n* Mete o pé!"]
                            : SAVE.data.n.plot < 19
                                ? ["<32>{#p/basic}* Você vai precisar."]
                                : ["<32>{#p/basic}* Eu sou gelo gelado."]
            ),
            s_genokid: pager.create(
                0,
                () =>
                    world.genocide
                        ? [
                            '<25>{#p/kidd}{#f/3}{#npc/a}* Yo, essa criança veio até mim e colocou algo na minha cabeça.',
                            '<25>{#f/3}* Então, ele foi até a Foundry para poder \"aumentar o sinal...\"',
                            '<25>{#f/4}* ... crianças podem ser tão estranhas as vezes.'
                        ]
                        : [
                            '<25>{#p/kidd}{#f/3}{#npc/a}* Yo, todo mundo correu e se escondeu em algum lugar.',
                            '<25>{#f/3}* Cara, adultos podem ser tão burros as vezes, haha...',
                            "<25>{#f/1}* Eles não sabem que temos a Undyne para nos proteger!?"
                        ],
                () =>
                    world.genocide
                        ? ["<25>{#p/kidd}{#f/7}{#npc/a}* Mas você é bem legal!"]
                        : ["<25>{#p/kidd}{#f/1}{#npc/a}* Undyne vai nos proteger!"]
            ),
            g_beautifulfish: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            "<32>{#p/basic}{#npc/a}* Você tem muito coragem de voltar aqui depois daquilo, criança.",
                            '<32>* Todos nós vimos o que aconteceu na TV agora pouco.'
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                "<32>{#p/basic}{#npc/a}* É surpreendente ver o Sans aqui de novo após o que aconteceu da última vez.",
                                "<32>* ... na verdade, não é muito surpreendente não."
                            ]
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* No final, eu nunca consegui \"garotas\" no meu email de voz.',
                                    '<32>* Então criança, leva de mim para a vida...',
                                    "<32>* Não tente pegar criaturas espaciais fantásticas apenas com o email de voz."
                                ]
                                : papreal()
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Onde é que está o Sans?',
                                        '<32>* Ele me disse que tinha um mapa estelar que eu poderia usar para encontrar garotas...',
                                        '<32>* Quer dizer, provavelmente era algum tipo de pegadinha, mas eu queria saber qual era!'
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Eu tentei dar uma ligada para algumas \"garotas\" hoje.',
                                        '<32>* Alguém me disse que existem infinitas possibilidades nas estrelas...',
                                        "<32>* Bem, eu estou levando isso a sério.",
                                        "<32>* Eu vou atrás de um encontro com uma criatura do espaço."
                                    ],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* Quer saber o que eu penso?',
                            '<32>* ... aquele robô na TV foi quem me fez ter vontade de ir atrás de garotos ao invés de garotas.',
                            "<32>* É triste vê-lo desaparecer."
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                "<32>{#p/basic}{#npc/a}* Você está falando comigo como se quisesse informações privilegiadas.",
                                "<32>{#p/basic}{#npc/a}* Foi mal criança.\n* Acho que você vai ter que esperar até às novas notícias."
                            ]
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Se voce se importa, tem uma ligação perdida...',
                                    '<32>* ... de uma certa \"ONIONSAN.\"',
                                    "<32>* Ela não deixou nenhum email de voz, entretanto."
                                ]
                                : papreal()
                                    ? ['<32>{#p/basic}{#npc/a}* Você sabe onde o Sans está?']
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Acho que eu poderia chamar Undyne pra sair.\n* Mas ela já deve gostar de alguém.'
                                    ],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? ["<32>{#p/basic}{#npc/a}* Aqui na esperança que outra fofura apareça..."]
                        : SAVE.data.n.plot === 33
                            ? ["<32>{#p/basic}{#npc/a}* Não me diga que você não tem uma conta na Outernet..."]
                            : SAVE.data.n.plot === 72
                                ? ["<32>{#p/basic}{#npc/a}* O que é uma onionsan mesmo?"]
                                : papreal()
                                    ? ['<32>{#p/basic}{#npc/a}* Me conta se você ver ele...']
                                    : ['<32>{#p/basic}{#npc/a}* Eu posso algum dia achar amor por aqui?']
            ),
            g_bigmouth: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* Hmm...',
                            '<32>* Me pergunto que tipo de comida os robôs gostam.',
                            '<32>* Eles pelo menos comem comida?',
                            "<32>* ... agora, nós nunca saberemos."
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                '<32>{#p/basic}{#npc/a}* Sans tem vindo aqui regularmente desde o primeiro dia.',
                                ...(papreal()
                                    ? [
                                        '<32>* Ele normalmente pede o pior item no menu...',
                                        '<32>* Exceto por hoje mais cedo...',
                                        '<32>* ... ele pediu o SEGUNDO pior ítem do menu ao invés disso.',
                                        "<32>* Já é alguma coisa, certo?"
                                    ]
                                    : [
                                        '<32>* Ele sempre pede o pior ítem do menu, e nunca paga a conta.',
                                        '<32>* Pelo fato de que ele atrai tantos clientes...',
                                        '<32>* Grillby sempre o dá tratamento especial.',
                                        '<32>* ... o que seria \"yamok\"?'
                                    ])
                            ]
                            : SAVE.data.n.plot === 72
                                ? world.population < 4
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Eu me pergunto qual o gosto de um humano bully...',
                                        "<32>* Eles são mais gostosos quando maus?\n* Ou vice-versa?"
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Por mais que eu amaria testar comida humana...",
                                        "<32>* Comida de um mundo inteiramente novo... é bem melhor."
                                    ]
                                : papreal()
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Hmmm, este é o momento que o Sans normalmente aparece aqui.',
                                        '<32>* Então, um pouco depois, seu irmão também aparece.',
                                        '<32>* Sim, seu irmão.\n* Papyrus.',
                                        '<32>* Ele normalmente pedia leite, mas hoje em dia, pede um ítem novo todo dia...',
                                        "<32>* Aquele replicador com certeza é uma coisa maravilhosa, não é?",
                                        "<32>* É triste que ele só consiga produzir comida monstro."
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Hmmm...\n* Comida humana não é diferente de comida monstro?",
                                        '<32>* Faz coisas como \"estragar\".',
                                        '<32>* E enquanto comida monstro recupera sua energia instantâneamente...',
                                        '<32>* Comida humana tem que passar por todo o corpo primeiro.',
                                        '<32>* O que de alguma forma acontece até na gravidade baixa.',
                                        "<32>* Que nojo.\n* Eu amaria experimentar."
                                    ],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* Que desgraça.']
                        : SAVE.data.n.plot === 33
                            ? papreal()
                                ? world.dead_skeleton
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Levando para pensar sobre, essa não foi a única coisa fora da linda que aconteceu hoje..."
                                    ]
                                    : ['<32>{#p/basic}{#npc/a}* Que estranho.']
                                : ["<32>{#p/basic}{#npc/a}* Nós estamos felizes em ter tal pessoa no nosso meio."]
                            : SAVE.data.n.plot === 72
                                ? world.population < 4
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Por tudo que nós sabemos, redenção no último minuto pode torná-lo o mais saboroso de todos.'
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Pelo visto, a comida do novo mundo estraga mais rápido do que a feita por humanos.'
                                    ]
                                : papreal()
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Espero que ele apareça hoje.\n* Ele e seu irmão são ótimos em nos fazer rir.'
                                    ]
                                    : ['<32>{#p/basic}{#npc/a}* Também ouvi dizer que eles tem uma coisa chamada \"banheiro.\"'],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* Que desgraça.']
                        : SAVE.data.n.plot === 33
                            ? papreal()
                                ? ['<32>{#p/basic}{#npc/a}* Que estranho.']
                                : ['<32>{#p/basic}{#npc/a}* Que interessante.']
                            : SAVE.data.n.plot === 72
                                ? world.population < 4
                                    ? ['<32>{#p/basic}{#npc/a}* Que... inesperado.']
                                    : ['<32>{#p/basic}{#npc/a}* Que... delicioso.']
                                : papreal()
                                    ? ['<32>{#p/basic}{#npc/a}* Esqueletos são legais.']
                                    : ['<32>{#p/basic}{#npc/a}* Humanos são estranhos.']
            ),
            g_bunbun: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* M-mettaton era o cara mais q-quente por aqui...',
                            '<32>* Sem ele, o Outpost se t-torna tão mais frio!'
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                '<32>{#p/basic}{#npc/a}* Sansyyyy...\n* Volta aqui e senta comigo...!',
                                "<32>* Tudo é tão l-l-legal quando você está por perto..."
                            ]
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Me p-pergunto se no n-novo mundo t-tem caras b-bonitos...',
                                    '<32>* E d-drinks a-apetitosos...',
                                    "<32>* Ooooooo, eu estou pronto!"
                                ]
                                : papreal()
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* E-ei, não era pro Sansy estar dando uma volta por aqui agora?",
                                        "<32>* Vamu Sansy!\n* Você é a vida da festa!"
                                    ]
                                    : world.dead_dog
                                        ? [
                                            "<32>{#p/basic}{#npc/a}* Tá tão q-q-quieto até.",
                                            '<32>* Escutem, todo mundo!\n* ...',
                                            "<32>* Eu estou realmente começando a odiar esse lugar."
                                        ]
                                        : [
                                            "<32>{#p/basic}{#npc/a}* Não importa onde eu vá, é o mesmo cardápio, as mesmas pessoas...",
                                            "<32>* Ajuda!\n* Eu quero novas bebidas e c-c-caras quentes!"
                                        ],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* Tão f-f-frio']
                        : SAVE.data.n.plot === 33
                            ? ['<32>{#p/basic}{#npc/a}* Sansyyyy...']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}{#npc/a}* T-tão pronto!']
                                : papreal() || world.dead_dog
                                    ? ['<32>{#p/basic}{#npc/a}* ...']
                                    : ["<32>{#p/basic}{#npc/a}* Eu acho que o atendente é meio q-q-q-quente..."]
            ),
            g_dogamy: () =>
                SAVE.data.b.killed_mettaton
                    ? [
                        "<32>{#p/basic}{#npc/a}* Todo mundo está super preocupado com Mettaton, mas eu...?",
                        SAVE.data.n.state_starton_doggo === 2 && SAVE.data.n.state_starton_greatdog === 2
                            ? '<32>{#p/basic}{#npc/a}* Eu só quero saber onde estão os cachorros.'
                            : SAVE.data.n.state_starton_doggo === 2
                                ? '<32>{#p/basic}{#npc/a}* Eu ainda quero saber o que aconteceu com Doggo.'
                                : SAVE.data.n.state_starton_greatdog === 2
                                    ? '<32>{#p/basic}{#npc/a}* Eu ainda sinto falta daquele grandão peludo por aqui.'
                                    : papreal()
                                        ? '<32>{#p/basic}{#npc/a}* Eu ainda sinto falta de ter o Sans e seu irmão por perto.'
                                        : '<32>{#p/basic}{#npc/a}* Eu só desejava que Sans voltasse e nos desse mais cafunés.'
                    ]
                    : SAVE.data.n.plot === 33
                        ? ['<32>{#p/basic}{#npc/a}* Poxa, eu estava esperando o Sans voltar para nos dar mais cafunés.']
                        : SAVE.data.n.plot === 72
                            ? world.population < 2
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Estamos livres!\n* Talvez agora, Sans finalmente virá nos dar cafuné.",
                                    "<32>* É bem melhor do que se preocupar com o bendito bully ameaçando os arredores."
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* Estamos livres!\n* Talvez agora, Sans finalmente virá nos dar cafuné.",
                                    "<32>* Ou talvez nossos novos clientes da empresa vão fazer isso pra gente."
                                ]
                            : SAVE.data.n.state_starton_doggo === 2 && SAVE.data.n.state_starton_greatdog === 2
                                ? ['<32>{#p/basic}{#npc/a}* Cheira muito... quieto.']
                                : SAVE.data.n.state_starton_doggo === 2
                                    ? ["<32>{#p/basic}{#npc/a}* Não dá pra acreditar que o Doggo sumiu..."]
                                    : SAVE.data.n.state_starton_greatdog === 2
                                        ? ["<32>{#p/basic}{#npc/a}* Onde está aquele grande fofão?\n* Não vamos começar antes que ele apareça."]
                                        : papreal()
                                            ? ["<32>{#p/basic}{#npc/a}* Onde está o Sans...\n* Era pra ele supostamente me dar um cafuné..."]
                                            : [
                                                '<32>{#p/basic}{#npc/a}* Melhor tomar cuidado onde você senta aqui, criança.',
                                                '<32>* Aquele grandão VAI pular no seu colo, te dando muito amor e atenção.'
                                            ],
            g_dogaressa: () =>
                SAVE.data.b.killed_mettaton
                    ? [
                        '<32>{#p/basic}{#npc/a}* (Meu marido e eu só queremos que todos se acalmem.)',
                        "<32>{#p/basic}{#npc/a}* (A morte de Mettaton foi trágica, mas ele é só um cara na TV!)"
                    ]
                    : SAVE.data.n.plot === 33
                        ? ['<32>{#p/basic}{#npc/a}* (Eu gosto do Sans.)\n* (As vezes ele nos dá comidas por de baixo da mesa.)']
                        : SAVE.data.n.plot === 72
                            ? world.population < 2
                                ? [
                                    "<32>{#p/basic}{#npc/a}* (Agora que estamos livres, nós estamos planejando começar uma companhia de casamento.)",
                                    '<32>* (Nosso primeiro tópico será \"O que significa estar em um relacionamento abusivo.\")'
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* (Agora que estamos livres, nós estamos planejando começar uma companhia de casamento.)",
                                    '<32>* (Nosso primeiro tópico será \"Os prós e contras de casar com sua mãe.\")'
                                ]
                            : SAVE.data.n.state_starton_doggo === 2 && SAVE.data.n.state_starton_greatdog === 2
                                ? [
                                    "<32>{#p/basic}{#npc/a}* (Está muito vazio aqui hoje.)\n* (Se nossos amigos não aparecerem, você gostaria de jogar com a gente?)"
                                ]
                                : SAVE.data.n.state_starton_doggo === 2
                                    ? ["<32>{#p/basic}{#npc/a}* (Cadê o Doggo?)\n* (Eu espero que ele não tenha se perdido.)"]
                                    : SAVE.data.n.state_starton_greatdog === 2
                                        ? ["<32>{#p/basic}{#npc/a}* (Onde está o Major Canis?)\n* (Era pra ele se juntar a gente pra essa partida.)"]
                                        : papreal()
                                            ? ['<32>{#p/basic}{#npc/a}* (Onde estão aqueles esqueletos?)\n* (Eu queria um ossinho...)']
                                            : [
                                                "<32>{#p/basic}{#npc/a}* (Nós somos sentinelas, mas nunca ganhamos nenhum respeito.)",
                                                '<32>* (Eu queria que aqueles esqueletos nos jogassem mais ossos.)',
                                                '<32>* (Nós amamos ossos.)'
                                            ],
            g_doggo: () =>
                SAVE.data.b.killed_mettaton
                    ? [
                        '<32>{#p/basic}{#npc/a}* Perder o Mettaton realmente desanima, entende?',
                        '<33>* De todos os caras no Outpost, ele é o que mais mexia!',
                        "<32>* Sem ele, as únicas pessoas na TV serão aquelas que NÃO se mexem o tempo todo."
                    ]
                    : SAVE.data.n.plot === 33
                        ? [
                            '<32>{#p/basic}{#npc/a}* Huh?\n* Desde quando você e o Sans se tornaram amigos...?',
                            "<32>* Eu não sou o maior fã daquele cara...",
                            '<32>* Ele ama aparecer sem se mover.'
                        ]
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu estive sem abraços por tanto tempo, mas finalmente, alguém se abriu para mim.",
                                '<32>* O Ice Wolf agora é meu Nice Wolf.'
                            ]
                            : SAVE.data.n.state_starton_dogs === 2 && SAVE.data.n.state_starton_greatdog === 2
                                ? [
                                    "<32>{#p/basic}{#npc/a}* As vezes os outros gostam de fazer pegadinhas comigo. Eles ficam para e eu não consigo vê-los.",
                                    '<32>* Eles devem estar aqui, pregando uma em mim.',
                                    "<32>* Eu só vou esperar até um deles admitir isso..."
                                ]
                                : SAVE.data.n.state_starton_dogs === 2
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Onde estão os outros dois?\n* Eu não posso jogar com esse fofão sozinho...",
                                        "<32>* Seria muito difícil!"
                                    ]
                                    : SAVE.data.n.state_starton_greatdog === 2
                                        ? [
                                            "<32>{#p/basic}{#npc/a}* Onde está o grande fofão?\n* Eu não posso jogar com esses dois sozinhos...",
                                            "<32>* Seria muito fácil!"
                                        ]
                                        : papreal()
                                            ? ['<32>{#p/basic}{#npc/a}* Papyrus? \n* É você?\n* Vamos lá...']
                                            : [
                                                "<32>{#p/basic}{#npc/a}* Estou pensando em deixar meu coração crescer pra mostrar personalidade.",
                                                '<32>* Pra deixar uma declaração como \"Dê-me um grande e suave abraço e me acaricie.\"'
                                            ],
            g_grillby: () =>
                SAVE.data.b.killed_mettaton
                    ? [
                        '<32>{#p/basic}* ...\n* ...\n* ...',
                        '<32>{#npc/a}* Grillby disse que o grande finale foi bom para os negócios.',
                        "<32>* Mas eu não acho que isso faz com que ele goste desse fato."
                    ]
                    : SAVE.data.n.plot === 33
                        ? SAVE.data.b.item_fast_food
                            ? [
                                '<32>{#p/basic}* ...\n* ...\n* ...',
                                '<32>{#npc/a}* Grillby diz que só deixa o Sans comer de graça por ele trazer muitos clientes.',
                                "<32>* Eu não posso discordar da atitude..."
                            ]
                            : [
                                '<32>{#p/basic}* ...\n* ...\n* ...',
                                '<32>{#npc/a}* Grillby disse pra você pegar sua comida antes que ele tenha que jogar fora.'
                            ]
                        : SAVE.data.n.plot === 72
                            ? world.population < 4
                                ? ['<32>{#p/basic}* ...\n* ...\n* ... okay.']
                                : ['<32>{#p/basic}* ...\n* ...\n* ... bom trabalho.']
                            : postSIGMA()
                                ? [
                                    '<32>{#p/basic}* ...\n* ...\n* ...',
                                    '<32>{#npc/a}* Grillby disse que alguns dos equipamentos do bar pararam de funcionar recentemente.',
                                    "<32>* Nós pagaríamos alguém para consertar, mas desde que Mettaton cancelou seu pequeno show ou algo assim...",
                                    "<32>* Nós temos vendido menos e menos a cada minuto."
                                ]
                                : world.population < 4
                                    ? [
                                        '<32>{#p/basic}* ...\n* ...\n* ...',
                                        '<32>{#npc/a}* Grillby está bem triste pelo sumiço dos outros clientes.',
                                        "<32>* Pessoalmente, eu acho que eles só estão com medo...",
                                        '<32>* Sabe.\n* Daquele bully.'
                                    ]
                                    : [
                                        '<32>{#p/basic}* ...\n* ...\n* ...',
                                        '<32>{#npc/a}* Grillby disse que achou essa nova cor no e-magazine.',
                                        "<32>* Pessoalmente, eu prefiro a cor laranjada natural do Grillby.\n* Mas aí é opinião minha."
                                    ],
            g_punkhamster: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            "<32>{#p/basic}{#npc/a}* Você realmente mostrou pra'quele robô quem é manda, hein?",
                            "<32>* ... se pelo menos ele não me fizesse sentir mal por sua morte."
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                '<32>{#p/basic}{#npc/a}* Sans com certeza sabe fazer você sorrir, huh?',
                                '<32>* Isso é uma coisa boa.\n* Aquele esqueleto praticamente paga as contas aqui.'
                            ]
                            : SAVE.data.n.plot === 72
                                ? world.population < 2
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Sabe, eu gostei do seu espírito de luta, garoto.",
                                        "<32>* Agora que estamos todos de volta à cidade, parece que nos tornaremos grandes amigos.",
                                        "<32>* ... Estamos todos indo embora daqui, huh?",
                                        "<32>* Pois bem.\n* Acho que nem tudo pode ser um refúgio para as coisas difíceis."
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Se estamos livres, as pessoas não vão precisar mais sair da Cidadela para cá!",
                                        "<32>* Parece que nós não vamos perder nossa cultura local.",
                                        "<32>* ... exceto que todos nós estamos indo embora, huh?",
                                        "<32>* Poxa.\n* Acho que a vida não é só maçãs do amor."
                                    ]
                                : papreal() || world.dead_canine || world.population < 6
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* A Cidadela está enchendo bastante, então ouvi dizer que muitos vão mudar pra cá.",
                                        "<32>* ... quem sabe?\n* Talvez tenhamos espaço para eles."
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* A Cidadela está enchendo bastante, então ouvi dizer que muitos vão mudar pra cá.",
                                        "<32>* Hmmm...\n* Eu não quero a cultura local se esvair.",
                                        "<32>* Mas seria muito legal ensinar aquele pessoal de apartamento como as coisas funcionam aqui!"
                                    ],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? ["<33>{#p/basic}{#npc/a}* Eu estou em um conflito mental em relação a isso."]
                        : SAVE.data.n.plot === 33
                            ? ["<32>{#p/basic}{#npc/a}* Regular? \n* Quem, eu?\n* Nah, eu sou apenas semi-regular."]
                            : SAVE.data.n.plot === 72
                                ? world.population < 2
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Parando pra pensar, você me inspirou, criança.\n* Eu vou começar um clube da luta."
                                    ]
                                    : ["<32>{#p/basic}{#npc/a}* Nós temos que começar coisas novas, eh?"]
                                : ["<32>{#p/basic}{#npc/a}* Isso aí, vem pra cima!"]
            ),
            g_redbird: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* Hoo hoo hoo!\n* Isso foi alguma coisa!',
                            "<32>{#p/basic}{#npc/a}* ... hmm, eu sou o único que pensa que isso foi tudo pegadinha?"
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                "<32>{#p/basic}{#npc/a}* Sans é um sentinela real, mas não deixe o título te enganar.",
                                '<32>* Todo mundo sabe que ele dorme o dia inteiro no meio da floresta holográfica.'
                            ]
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Wow, um mundo novinho...',
                                    '<32>* Eu provavelmente não vou mais precisar traduzir para o Grillby...',
                                    "<32>* ... ou talvez eu vá!\n* Grillby, você planeja levar essa lugar pro outro planeta?",
                                    '<32>{#npc}* ...\n* ...\n* ...',
                                    ...(world.population < 4
                                        ? [
                                            "<32>{#npc/a}* Grillby disse que está mais do que feliz em fazer isso.",
                                            '<33>* Ele ainda deve estar com medo você.'
                                        ]
                                        : ["<32>{#npc/a}* Grillby disse que vai pensar nisso."])
                                ]
                                : papreal()
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Grillby está ficando nervoso.',
                                        "<32>* Sans é seu melhor cliente e ele não apareceu hoje o dia inteiro..."
                                    ]
                                    : world.dead_dog
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* Aqueles cachorros fazem parte da GUARDA REAL, a...',
                                            '<32>* Huh?\n* Cadê eles?\n* Estranho...'
                                        ]
                                        : world.population < 4
                                            ? [
                                                "<32>{#p/basic}{#npc/a}* Tem um rumor rodando a cidade sobre um bully espancando pessoas por aí.",
                                                '<32>* Mas eu e o Grillby decidimos deixar o bar aberto.',
                                                "<32>* Nenhum Bully vai nos impedir de administrar este estabelecimento!"
                                            ]
                                            : [
                                                '<32>{#p/basic}{#npc/a}* Estes cachorros fazem parte da GUARDA REAL, o grupo militar liderado pela UNDYNE.',
                                                "<32>* Ela é rude, grita demais, e da uma surra em todo mundo que a desrespeita...",
                                                "<32>* Tá explicado o motivo de todas as crianças quererem ser como ela quando crescerem!"
                                            ],
                () =>
                    SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* Nunca da pra saber com esses apresentadores de TV rudes.']
                        : SAVE.data.n.plot === 33
                            ? [
                                "<32>{#p/basic}{#npc/a}* Não me pergunte o porque ele faz isso.",
                                "<32>* Mas se eu tivesse que adivinhar, eu diria que tem algo haver com o Papyrus."
                            ]
                            : SAVE.data.n.plot === 72
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Se ele abrir um Grillby no novo mundo...",
                                    ...(world.population < 4
                                        ? ['<32>* Só podemos esperar que os viajantes sejam mais simpáticos.', "<32>* ... você é discutível."]
                                        : [
                                            "<32>* Podemos apenas esperar que não tenha muita água por perto.",
                                            "<32>* ... seria perigoso."
                                        ])
                                ]
                                : papreal() || world.dead_dog
                                    ? ['<32>{#p/basic}{#npc/a}* Alguma coisa parece errada.']
                                    : world.population < 4
                                        ? ["<32>{#p/basic}{#npc/a}* Pelo menos ele não tá lá fora matando ninguém."]
                                        : ['<32>{#p/basic}{#npc/a}* Eu quero ser como a UNDYNE quando eu crescer, também!\n* Hoo Hoo Hoo!']
            ),
            l_cupjake: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Talvez agora que estamos livres, aquela doce senhora finalmente vá embora.",
                            '<32>* Então, conhecerei o conteúdo desse {@fill=#f00}livro ímpar {@fill=#fff} por mim mesmo.'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Há um {@fill=#f00}livro ímpar{@fill=#fff} que aparece e desaparece aqui ao acaso...",
                            '<32>* Mas aquela doce senhora parece sempre estar no meio dele!',
                            '<32>* Você sabe alguma coisa que pode assustar ela?'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Logo, eu te conto.', '<32>* Logo.']
                        : ["<32>{#p/basic}{#npc/a}* Eu sei o que você está pensando.", "<32>* Nem tenta."]
            ),
            l_kakurolady: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                            "<32>* Esta será a última edição do nosso feed de notícias...",
                            '<32>* Por que a gente não simplesmente coloca um \"THE END\" na capa e pronto?'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                            '<33>* Nos tempos de escola, os professores nos davam jogos de encontre a diferença as vezes.',
                            '<32>* Eu jurava que era perda de tempo.\n* Mas olha pra mim agora...',
                            "<33>* Eu sou a artista número um do jogo encontre a diferença no Outpost."
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                            "<32>* Pô, por que a gente só não para aqui e agora?"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* (Cough, cough.)',
                            "<33>* Confia em mim, criança.\n* Você não quer esse trabalho."
                        ]
            ),
            l_librarian: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Bem-vindo a Libraria.',
                            ...(world.population === 0
                                ? ["<32>* Se você bater em mais alguém, você vai se lamentar."]
                                : ["<32>* Este é o último dia em que estaremos abertos, então faça quanto barulho quiser."])
                        ]
                        : postSIGMA()
                            ? [
                                "<32>{#p/basic}{#npc/a}* Bem-vindo a libraria.\n* O único lugar da cidade que não funciona a base de eletricidade.",
                                '<32>* O que é importante, com todas as quedas que tem acontecido ultimamente.'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Bem-vindo a libraria.\n* No começo isso era considerado um erro de escrita.',
                                '<32>* Agora todo mundo chama assim.'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population === 0
                            ? ["<32>{#p/basic}{#npc/a}* Você tem sentimentos, não é mesmo?"]
                            : ["<32>{#p/basic}{#npc/a}* Não que alguém teria te parado antes..."]
                        : ["<32>{#p/basic}{#npc/a}* Isso é o que acontece quando você tem preguiça de resolver problemas simples."]
            ),
            l_sweetie: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Ah meu, tem muitas notícias para divulgar, eu nem sei por onde começar!",
                            '<32>* Que tal essa frase de efeito...\n* \"Monstros Finalmente Escapam do Outpost.\"',
                            "<32>* não, isso não tem entusiasmo suficiente...",
                            '<32>* Que tal \"Você Não Vai Acreditar Em Quem Nos Ajudou A Fugir do Outpost!\"'
                        ]
                        : postSIGMA()
                            ? [
                                '<32>{#p/basic}{#npc/a}* Trabalhar no feed de notícias ficou complicado do nada.',
                                "<32>{#p/basic}{#npc/a}* Na metade do tempo eu nem consigo entrar na minha conta!",
                                '<32>{#p/basic}{#npc/a}* Pra resolver isso, eu talvez deva ir aos servidores do rec center em pessoa.'
                            ]
                            : world.dead_dog || world.population < 6
                                ? SAVE.data.b.killed_mettaton
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Trabalhar nas notícias está perdendo sentido.',
                                        '<32>* Primeiro, aquela horrível notícia de antes, e agora, o que aconteceu com aquela celebridade.',
                                        "<32>* Eu acho que vou me demitir."
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Eu amo trabalhar no feed de notícias.',
                                        "<32>* Mas, eu tive que reportar algo terrível hoje mais tarde...",
                                        "<32>* Estou começando a questionar minha escolha de vida."
                                    ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Eu amo trabalhar no feed de notícias.',
                                        '<32>* O único é que, se uma celebridade morrer...',
                                        "<32>* Isso vai ser tudo sobre o que as pessoas vão querer me ver publicar por um tempo."
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Eu amo trabalhar no feed de notícias.',
                                        "<32>* Tem tão pouco pra publicar que a gente só preenche as manchetes com tirinhas.",
                                        '<32>* Eu espero que ninguém fique entediado.'
                                    ],
                () =>
                    world.dead_dog || world.population < 6 || SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* Você já sentiu que sua vida estava andando em círculos?']
                        : ["<32>{#p/basic}{#npc/a}* Você já sentiu que está perdendo alguma coisa?"]
            ),
            s_faun: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? [
                                "<32>{#p/basic}{#npc/a}* Nós estamos livres?",
                                "<32>* OK, OK...\n* E eu aqui pensei que estaríamos todos cobertos de hematomas.",
                                "<33>* Que surpresa.\n* Tenho certeza que aquele cachorro não vai se importar."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Nós estamos livres?",
                                "<32>* OK, OK...\n* Eu vou parar de perder tempo.\n* Aquele cachorro sabe?",
                                "<33>* Hm, eu vou me garantir de ir contar."
                            ]
                        : roomKills().s_greater > 0
                            ? ["<32>{#p/basic}{#npc/a}* Foi mal, campeão.\n* Agora não é uma boa hora."]
                            : 30 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Ouvi dizer que o cachorro é um jogador de pôquer 4-D...',
                                    '<32>* Será se já ganhou ao menos jogo?\n* Eu me pergunto.'
                                ]
                                : [
                                    [
                                        '<32>{#p/basic}{#npc/a}* Um cachorro veio correndo até aqui cheio de inspiração.',
                                        '<32>* Ficou tentando criar um holograma que expressasse suas próprias emoções...',
                                        '<32>* Mas, conforme ele fez, continuou ficando mais e mais animado com sua criação...',
                                        '<32>* Seu pescoço foi ficando cada vez mais longo, e teve mais luz, até...',
                                        "<32>* Foi muito triste assistir, mas não pude me afastar."
                                    ],
                                    [
                                        "<32>{#p/basic}{#npc/a}* Aquele cachorro de mais cedo...?\n* Ele tá no Grillby.\n* Eu acho.",
                                        '<32>* Depois do trabalho, todos os cachorros vão pra lá jogar cartas juntos.',
                                        "<32>* Mas aquele cachorro não sabe muito bem se expressar.",
                                        '<32>* Então, ele meio que brinca sozinho invez de ter que socializar com os outros...'
                                    ],
                                    [
                                        "<32>{#p/basic}{#npc/a}* Onde está o cachorro?",
                                        '<32>* Normalmente ele vem pra cá todo dia depois do trabalho...'
                                    ],
                                    [
                                        '<32>{#p/basic}{#npc/a}* Um cachorro bem mau humorado passou por aqui...',
                                        '<32>* Que tipo de pessoa bateria em um cachorrinho fofo?'
                                    ]
                                ][SAVE.data.n.state_starton_lesserdog],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? ["<32>{#p/basic}{#npc/a}* Não se preocupa, campeão.\n* Maior parte deles nem lembra quem é você a essa altura."]
                            : ["<32>{#p/basic}{#npc/a}* Não se preocupa, campeão.\n* Eu vou cobrir isso pra você."]
                        : roomKills().s_greater > 0
                            ? ['<32>{#p/basic}{#npc/a}* ...']
                            : 30 <= SAVE.data.n.plot
                                ? ["<32>{#p/basic}{#npc/a}* O dia em que aquele cachorro ganhou um poker 4-D, todo muito ficou abismado."]
                                : [
                                    ['<32>{#p/basic}{#npc/a}* Bem paia para o cachorro, né?'],
                                    ['<32>{#p/basic}{#npc/a}* Tão triste para o cachorro, né?'],
                                    ['<32>{#p/basic}{#npc/a}* Você viu isso?'],
                                    ['<32>{#p/basic}{#npc/a}* Desprezível.']
                                ][SAVE.data.n.state_starton_lesserdog]
            ),
            s_moonrocks1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? [
                                '<32>{#p/basic}{#npc/a}* Hah-\n* Incrível-',
                                '<32>* Eu sabia que minhas pedras da lua eram a parada desde o começo-',
                                "<32>* Até eu estou surpreso com o que seus modos mesquinhos levaram a mim-"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Tch-\n* Inacreditável-',
                                "<32>* Eu nem acredito que vou começar a trabalhar com aquele cara-",
                                '<32>* Pelo menos nossas vendas vão começar a subir-'
                            ]
                        : roomKills().s_pacing > 0
                            ? ["<32>{#p/basic}{#npc/a}* Tch-\n* Desculpa, eu não vendo pra gente igual a você-"]
                            : SAVE.data.b.killed_mettaton
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Mano-\n* Que merda aquilo que aconteceu com o Mettaton, sabe-",
                                    "<32>* Mas eu vou vender minhas pedras da lua edição especial para tal ocasião-",
                                    '<32>* Diferente daquele cara, que só abaixou os preços das suas pedras normais-'
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* Tch-\n* Inacreditável-',
                                    '<32>* Eu tenho rochas lunares autênticas direto de uma lua, ao contrário daquele porcaria-',
                                    "<32>* As pedras daquele cara não tem nada haver com a lua-"
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? ['<32>{#p/basic}{#npc/a}* É, eu preciso te agradecer-']
                            : ["<32>{#p/basic}{#npc/a}* É bom para os negócios-"]
                        : roomKills().s_pacing > 0
                            ? ["<32>{#p/basic}{#npc/a}* Tch-\n* Desculpa, eu não vendo pra gente igual a você-"]
                            : ['<32>{#p/basic}{#npc/a}* A coragem daquele cara-']
            ),
            s_moonrocks2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? [
                                "<32>{#p/basic}{#npc/a}* Ehhh~\n* Eu não podia aguentar mais aquilo, cara~",
                                "<32>* Entre a barganha dele e a sua valentia, eu já tava cansado de tudo~",
                                "<32>* Os rochas da lua dele podem ser falsas, mas se me deixar em paz, eu tô de acordo~"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Pfft~\n* Pobre homem~',
                                "<32>* É bom finalmente estar trabalhando junto em alguma coisa~",
                                "<32>* Agora estaremos juntos vendendo meus pedaços autênticos da lua~"
                            ]
                        : roomKills().s_pacing > 0
                            ? ['<32>{#p/basic}{#npc/a}* Pfft~\n* Sem pedaços da lua para você~']
                            : SAVE.data.b.killed_mettaton
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Uma desgraça o que aconteceu com a estrela do Outpost~',
                                    "<32>* Mas não se preocupa~\n* Diferente daquele cara ali, eu não vou aumentar meus preços~",
                                    '<32>* Na verdade, minhas pedras da lua estão a venda~'
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* Pfft~\n* Pobre homem~',
                                    "<32>* Aquele cara à minha esquerda está vendendo falsas pedras lunares, bruh~",
                                    "<32>* Não acredite em nada que ele diz~"
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? ['<32>{#p/basic}{#npc/a}* Que cara triste~\n* Uma pena que teve que chegar a isso~']
                            : ['<32>{#p/basic}{#npc/a}* É, foi com ele que toda a parada de pedras lunares falsas começou~']
                        : roomKills().s_pacing > 0
                            ? ['<32>{#p/basic}{#npc/a}* Pfft~\n* Sem pedaços da lua para você~']
                            : ["<32>{#p/basic}{#npc/a}* A ousadia daquele cara~"]
            ),
            t_bunny: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Meu pequeno Canela vai crescer um dia...",
                            "<32>* Ele é meu irmão, então eu só desejo o melhor pra ele.",
                            '<32>* Eu espero que o novo mundo tenha espaço pra isso.'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Ah, é tão calmo e pacífico...",
                                '<32>* As pessoas que normalmente me incomodam estão muito ocupadas chorando sobre algo na TV!'
                            ]
                            : papreal()
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Ah, é tão calmo e pacífico...",
                                    '<32>* As vezes um daqueles esqueletos segue o Canela por aí.'
                                ]
                                : world.dead_canine
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Ah, é tão calmo e pacífico...",
                                        '<32>* As vezes um daqueles cachorros persegue o Canela por aí.'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* O meu Canela não é o mais lindinho?",
                                        '<32>* Os pãezinhos são tão adoráveis...\n* Tee hee'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Não faz muito agora, bun-bun..."]
                        : SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* Me pergunto o que pode ter acontecido...']
                            : papreal() || world.dead_canine
                                ? ['<32>{#p/basic}{#npc/a}* Me pergunto onde eles estão...']
                                : ['<32>{#p/basic}{#npc/a}* Bun-bun-bun-bun-bun...']
            ),
            t_icewolf: () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* Ice Wolf está feliz hoje. Querido Doggo está nos braços de Ice Wolf.",
                        '<32>* Ice Wolf é agora seu Nice Wolf.'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* Ice Wolf percebe a moral da cidade decrescendo.',
                            '<32>* Ice Wolf do quer todo mundo estando feliz.'
                        ]
                        : world.dead_canine
                            ? [
                                "<32>{#p/basic}{#npc/a}* Ice Wolf não viu nenhum dos amigos cachorros hoje.",
                                '<32>* Ice Wolf está triste.'
                            ]
                            : SAVE.data.n.state_starton_doggo === 2
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Ice Wolf não viu o querido Doggo o dia inteiro.',
                                    '<32>* Ice Wolf está sozinho.'
                                ]
                                : papreal()
                                    ? ['<32>{#p/basic}{#npc/a}* Ice Wolf não viu nenhum esqueleto hoje.', '<32>* Ice Wolf está preocupado.']
                                    : SAVE.data.n.state_starton_doggo === 1 &&
                                        SAVE.data.n.state_starton_dogs === 1 &&
                                        SAVE.data.n.state_starton_greatdog === 1 &&
                                        SAVE.data.n.state_starton_lesserdog === 1
                                        ? [
                                            "<32>{#p/basic}{#npc/a}* Ice Wolf vai brincar de pega com os amigos de Ice Wolf.",
                                            '<32>* Ice Wolf está animado.'
                                        ]
                                        : world.population < 6
                                            ? [
                                                world.bullied
                                                    ? '<32>{#p/basic}{#npc/a}* Ice Wolf se pergunta o porque de tantos monstros estarem surrados.'
                                                    : '<32>{#p/basic}{#npc/a}* Ice Wolf está se perguntando porque tantos monstros sumiram.',
                                                '<32>* Ice Wolf está preocupado.'
                                            ]
                                            : [
                                                '<32>{#p/basic}{#npc/a}* Ice Wolf está se perguntando porque seu nome é Ice Wolf sem não tem Ice pra ser jogado.',
                                                '<32>* Ice Wolf está confuso.'
                                            ],
            t_imafraidjumitebeinagang: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Perguntei a Papyrus sobre sua coleção de fio dental e ele disse que me ajudaria.",
                            "<32>* Ele não é o melhor?"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Minha escova de dente da MTT quebrou de novo, e eu não sei como vou arrumar dessa vez.",
                                "<32>* ... não é como se eles fossem fazer mais delas por agora."
                            ]
                            : papreal()
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Eu fui perguntar para o Papyrus sobre sua coleção de fio dental, mas ele não tava em casa.",
                                    '<32>* Você sabe o que aconteceu com ele?'
                                ]
                                : world.popmax(0) - world.population > 4
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Eu te emprestaria minha escova de dentes da marca MTT...",
                                        "<32>* ... mas eu tenho a sensação de que você explodiria ela em pedaços."
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Aquelas escovas de dente da MTT são tão frágeis.",
                                        '<32>* Ela quebrou nas minhas mãos antes que eu pudesse escovar.'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Perguntei a Papyrus sobre sua coleção de fio dental e ele disse que me ajudaria.",
                            "<32>* Ele não é o melhor?"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* Acho que eu vou ter que usar uma escova de dente de verdade agora."]
                            : papreal()
                                ? ['<32>{#p/basic}{#npc/a}* Hmm...\n* Me pergunto como os esqueletos escovam os dentes.']
                                : world.popmax(0) - world.population > 4
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Dar uma volta no bar diz muito sobre você por aqui...\n* Seja isso bom ou ruim.'
                                    ]
                                    : ['<32>{#p/basic}{#npc/a}* E de novo, era a opção mais barata...']
            ),
            t_kabakk: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 4
                            ? [
                                '<32>{#p/basic}{#npc/a}* Ei!',
                                "<32>* ... você é bem esquisito.",
                                '<32>* Você nos colocou no maior dos infernos, mas depois foi e nos salvou.',
                                "<32>* Qual é sua motivação?",
                                '<32>* ...',
                                '<32>* ...',
                                "<32>* EU NÃO SEI COMO LIDAR COM ESSA SITUAÇÃO!\n* TOP!"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Ei!',
                                "<32>* ... você é bem legal.",
                                '<32>* Obrigado por passar por todo esse inferno pra nos salvar.',
                                '<32>* Foi um movimento de guerreiro.',
                                '<32>* ...',
                                '<32>* ...',
                                '<32>* TODOS SAÚDAM A NOVA AUTORIDADE!\n* SIM!'
                            ]
                        : world.meanie
                            ? [
                                '<32>{#p/basic}{#npc/a}* Ei!',
                                '<32>* O que você tem feito, CRIANÇA?',
                                "<32>* Você tem um olhar criminoso na sua CARA...",
                                '<32>* ...',
                                '<32>* ...',
                                '<32>* Respeita minha AUTORIDADE!'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Ei!',
                                '<32>* Você acha que pode ficar aí parado olhando pra MIM?',
                                "<32>* Bem, eu tenho más notícias pra você, CARA.",
                                "<32>* Eu sou um oficial da LEI.",
                                '<32>* Então, UH...',
                                '<32>* Respeita minha AUTORIDADE!'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 4
                            ? ['<32>{#p/basic}{#npc/a}* ...']
                            : ['<32>{#p/basic}{#npc/a}* RESPEITA ela, CARA.']
                        : ['<32>{#p/basic}{#npc/a}* Respeite, CARA.']
            ),
            t_loverboy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* Hey hey...',
                                "<32>* ... apesar do que você fez, você ainda escolheu...",
                                "<32>* Oh... oh caramba...\n* Você não pode ver, mas acho que vou chorar...",
                                "<32>* ... espera, não me machuca!"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Hey hey...',
                                "<32>* ... gracas a você, nós estamos...",
                                "<32>* Oh... oh caramba...\n* Você não pode ver, mas acho que vou chorar...",
                                '<32>* ... uh, posso chorar?'
                            ]
                        : papreal() || world.dead_canine || SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Ei ei, por que todo mundo nessa cidade tá tão triste?",
                                '<32>* Alguma coisa aconteceu?'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Ei ei, nada nunca vai mudar na minha vida!",
                                '<32>* Ha... ha...'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* Eu ainda te acho bem da hora...!\n* Por favor não me bate."]
                            : ['<32>{#p/basic}{#npc/a}* Eu te amo...!']
                        : papreal() || world.dead_canine || SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* Talvez seja só minha imaginação."]
                            : ["<32>{#p/basic}{#npc/a}* Ou talvez eu seja louco."]
            ),
            t_politics: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Eu ouvi que o rei revelou a verdade sobre os monstros que ele supostamente matou.',
                            "<32>* Todo mundo ficou tão triste por não saber. Eles todos o deram um grande abraço.",
                            '<32>* Então alguns adotaram os humanos para si.',
                            '<32>* Agora estes humanos vão viver suas vidas com a gente.',
                            "<32>* Iiiiiiisssssoooo é política!"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Hmmm,  estranho como todo mundo tem falado de TV ultimamente.",
                                "<32>* O que aconteceu...?\n* Espero que isso não afete nosso sistema político..."
                            ]
                            : papreal()
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Hmmm, normalmente Papyrus sai para uma reunião com Undyne a esse horário.',
                                    '<32>* Mas cadê ele...?\n* Eu posso sentir nosso sistema político desmoronando...'
                                ]
                                : world.popmax(0) - world.population > 4
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Essa cidade não tem polícia.\n* Mas talvez aqueles policiais de mentira espantem os valentões.',
                                        '<32>* A política continua...'
                                    ]
                                    : world.trueKills > 0 || SAVE.data.n.bully > 0
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* Essa cidade não tem prefeito.',
                                            '<32>* Mas, se algo chegar a acontecer, um esqueleto conta para uma mulher peixe sobre.',
                                            "<32>* Iiiiiiisssssoooo é política!"
                                        ]
                                        : [
                                            '<32>{#p/basic}{#npc/a}* Esta cidade é sempre tão sombria.',
                                            "<32>* Mas, se as coisas continuarem caminhando assim, talvez isso mude.",
                                            '<32>* Seria isso política?'
                                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Viu?\n* A política não é má o tempo todo..."]
                        : SAVE.data.b.killed_mettaton || papreal() || world.popmax(0) - world.population > 4
                            ? ['<32>{#p/basic}{#npc/a}* Política...']
                            : world.trueKills > 0 || SAVE.data.n.bully > 0
                                ? ['<32>{#p/basic}{#npc/a}* Política.']
                                : ['<32>{#p/basic}{#npc/a}* Política?']
            ),
            t_rabbit: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Tempos atrás, eu ouvi sobre não existirem coisas chiques como \"escudos de força\".',
                            '<32>* Tudo que eu posso dizer... é que é bom estar de volta as origens.'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Tempos atrás, ouvi que celebridades de TV estavam por todo lado.',
                                "<32>* Agora, estão começando a se tornar algo do passado."
                            ]
                            : papreal()
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Tempos atrás, ouvi dizer que o Outpost era um lugar obscuro.',
                                    "<32>* Neste ritmo... estaremos de volta a essa era."
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* Há muito tempo, ouvi dizer que eles dividiram a cidade em duas metades.',
                                    '<32>* Me pergunto como se parecia antes...?'
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Obrigado por trazer isso de volta.']
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* É uma pena que não possamos simplesmente trazê-los de volta magicamente."]
                            : papreal()
                                ? ["<32>{#p/basic}{#npc/a}* É uma pena que não possamos magicamente arrumar as coisas."]
                                : ['<32>{#p/basic}{#npc/a}* Talvez nós jamais saberemos.']
            ),
            t_smileguy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* Então estamos livres, huh?",
                                "<32>* Acho que não preciso ficar mais sorrindo...",
                                "<32>* ... estranho.\n* Não tenho vontade de não sorrir, mas sorrir também parece errado.",
                                "<32>* Isso é profundo demais.\n* Eu vou me atar aquilo que sei."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Então estamos livres, huh?",
                                "<32>* Acho que não preciso ficar mais sorrindo...",
                                "<32>* ... huh.\n* Então por que eu não posso parar?",
                                "<32>* Por algum motivo, eu não quero parar de sorrir agora!"
                            ]
                        : papreal() || SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* Agora mesmo, eu senti meu sorriso decaindo.', "<32>* O que aconteceu?"]
                            : [
                                "<32>{#p/basic}{#npc/a}* Nós sabemos que as coisas não tem ido bem, mas sorrimos de toda forma.",
                                '<32>* Porquê?',
                                '<32>* É a nossa realidade, pra que ficar de careta?'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ['<32>{#p/basic}{#npc/a}* Sorria sorria.']
                            : ['<32>{#p/basic}{#npc/a}* Sorria sorria!']
                        : papreal() || SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* Sorria sorria?']
                            : ['<32>{#p/basic}{#npc/a}* Sorria sorria.']
            ),
            t_wisconsin: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* Liberdade...',
                                "<32>* Significa que eu não preciso mais me preocupar em relação a tomar uma surra.",
                                '<32>* Haha.'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Liberdade...',
                                "<32>* Significa que eu não preciso me preocupar com piadas mais.",
                                '<32>* ...',
                                '<32>* O que um rato faz quando finalmente pega o queijo?',
                                '<32>* ...',
                                '<32>* Bem...',
                                "<32>* Provavelmente não se preocupa em contar piadas, com certeza.",
                                '<32>* Haha.'
                            ]
                        : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Só parece que...',
                                '<32>* Que tudo está ficando pior, e pior...\n* E pior.'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Todo mundo está sempre rindo e fazendo piadas, tentando esquecer nossa crise...',
                                '<32>* Monotonia.\n* Aglomeração.\n* Falta de um mundo natal.',
                                "<32>* Eu me juntaria a eles, mas não me acho muito da graça."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* Desculpa.\n* Não foi engraçado."]
                            : [
                                '<32>{#p/basic}{#npc/a}* Desculpa.\n* Acho que posso dizer...',
                                '<32>* Que a piada estava meio \"intolerante\".'
                            ]
                        : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* E pior...']
                            : ["<32>{#p/basic}{#npc/a}* Pelo menos não estou fazendo trocadilhos."],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ['<32>{#p/basic}{#npc/a}* Você deveria ir embora antes que eu pare de ser legal.']
                            : ["<32>{#p/basic}{#npc/a}* Sim.\n* Isso foi um trocadilho.\n* Eu sou um rato trocadilho agora."]
                        : world.dead_dog || world.dead_skeleton || world.population < 6 || SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* E continua pior...']
                            : ['<32>{#p/basic}{#npc/a}* Por agora.']
            ),
            t_zorren: pager.create(
                0,
                () => [
                    "<32>{#p/basic}{#npc/a}* (Oh, opa, sou eu, Zorren.)",
                    ...(SAVE.data.n.plot === 72
                        ? world.population < 4
                            ? [
                                "<32>* (Nós, uh, não podemos te agradecer o suficiente pelo que você fez.)",
                                "<32>* (Mas...)\n* (Você, uh, não tem sido o melhor cidadão.)",
                                "<32>* (Por que você tornou isso tudo tão complicado?)"
                            ]
                            : [
                                "<32>* (Nós, uh, não podemos te agradecer o suficiente pelo que você fez.)",
                                "<32>* (Mas... você provavelmente já escutou o suficiente disso, por agora.)",
                                "<32>* (Então, vou deixar você voltar ao que estava fazendo.)"
                            ]
                        : world.meanie
                            ? SAVE.data.b.s_state_capstation
                                ? [
                                    "<32>* (Algo está diferente em você agora.)",
                                    '<32>* (...)',
                                    "<32>* (É, tipo, eu não gosto mais de você.)",
                                    "<32>* (Eu pegaria de volta a chave que te dei, se eu pelo menos pudesse.)"
                                ]
                                : [
                                    '<32>* (Você uh, tem algum problema com nossa, uh, força policial, ou...?)',
                                    '<32>* (...)',
                                    "<32>* (É, sabe, uh, eu não gosto tanto de você.)",
                                    "<32>* (Tem algo particularmente errado em relação a você.)"
                                ]
                            : [
                                ...(SAVE.data.b.oops
                                    ? [
                                        '<32>* (Você uh, tem algum problema com nossa, uh, força policial, ou...?)',
                                        '<32>* (Não?)\n* (Ei, valeu por, não fazer isso.)'
                                    ]
                                    : [
                                        "<32>* (Você sabe, você parece ser alguém que gosta de demonstrar respeito.)",
                                        '<32>* (Então, valeu por, uh, fazer isso.)'
                                    ]),
                                ...(SAVE.data.b.s_state_capstation
                                    ? []
                                    : ((SAVE.data.b.s_state_capstation = true),
                                        [
                                            '<32>* (De fato...)',
                                            '<32>* (Ei, carinha.)\n* (Toma essa chave, por nossa conta.)',
                                            '<32>{#s/equip}{#p/human}* (A Chave Rústica foi adicionada ao seu chaveiro.)',
                                            '<32>* (Olhe seu Celular para ver todas as chaves.)',
                                            "<32>{#p/basic}{#npc/a}* (Nós, uh, temos um arsenal em algum lugar, eu acho.)"
                                        ])),
                                ...(SAVE.data.b.oops
                                    ? [
                                        '<32>* (Só entre a gente, Kabakk e eu construímos essa estação por conta própria.)',
                                        '<32>* (Bem legal, né?)'
                                    ]
                                    : [
                                        '<32>* (Só entre a gente, Kabakk e eu construímos essa estação por conta própria.)',
                                        '<32>* (Bem legal, né?)'
                                    ])
                            ])
                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 4
                            ? ['<32>{#p/basic}{#npc/a}* (Faça melhor, meu amigo.)\n* (Faça melhor.)']
                            : ['<32>{#p/basic}{#npc/a}* (Continue assim, meu amigo.)\n* (Continue assim.)']
                        : world.meanie
                            ? ['<32>{#p/basic}{#npc/a}* (Some daqui.)']
                            : SAVE.data.b.oops
                                ? ["<32>{#p/basic}{#npc/a}* (É, não somos polícia de verdade.)"]
                                : [
                                    '<32>{#p/basic}{#npc/a}* (Podemos não ser polícias de verdade, mas pessoas como você valem a pena proteger.)'
                                ]
            )
        },
        objinter: {
            ctower0: () => [
                '<32>{#p/human}* (Você ativa o terminal.)',
                ...(SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (A nota descreve a redução do total a zero adicionando ou subtraindo potências de dez.)'
                    ]
                    : [
                        '<32>{#p/basic}* Tem instruções marcadas do lado...',
                        '<33>* É um arranhão de galinha ilegível. A única palavra para legível é \"zero\".'
                    ])
            ],
            ctower1: () =>
                SAVE.data.b.s_state_mathpass
                    ? SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Mas você já completou este quebra cabeça.)']
                        : ['<32>{#p/basic}* O terminal agora está desbloqueado.']
                    : ["<32>{#p/basic}* Está fora de serviço."],
            microwave0: ['<32>{#p/human}* (Você olha atrás do micro-ondas...)', '<32>{#p/basic}* Nada útil aqui.'],
            microwave1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você olha atrás do micro-ondas...)',
                        '<32>{#s/equip}{#p/human}* (Você aperta o interruptor.)'
                    ]
                    : [
                        '<32>{#p/human}* (Você olha atrás do micro-ondas...)',
                        "<32>{#p/basic}* Tem um interruptor aqui...",
                        '<32>{#s/equip}{#p/human}* (Você aperta o interruptor.)'
                    ],
            microwave2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você olha atrás do micro-ondas...)',
                        '<32>{#p/human}* (Mas você já apertou...)'
                    ]
                    : ['<32>{#p/human}* (Você olha atrás do micro-ondas...)', '<32>{#p/basic}* Nada novo aqui.'],
            microwave3: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Mas você não notou nada digno de notar sobre este aparelho.)"]
                    : [
                        '<32>{#p/basic}* Um aquecedor dielétrico padrão CIDADELA, circa de 260X.',
                        "<32>* É um micro-ondas.\n* Não tem mais do que uma década de idade."
                    ],
            microwave4: () => [
                '<32>{#p/basic}* Parece estar projeta do um tipo de escudo de gravidade.',
                ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* Me pergunto... se tem um botão em algum lugar..."])
            ],
            papmail1: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Mas você não tinha nada para enviar.)"]
                    : [
                        '<32>{#p/basic}* Esta caixa de correio está rotulada como \"PAPYRUS.\"',
                        choicer.create('* (Olhar na caixa?)', 'Sim', 'Não')
                    ],
            papmail2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* (Você olha dentro...)',
                            world.runaway
                                ? "<32>{#p/basic}* Está mais vazia do que antes."
                                : "<32>{#p/basic}* Não está vazia?"
                        ]
                        : [
                            '<32>{#p/human}* (Você olha dentro...)',
                            "<32>{#p/basic}* Está vazia.",
                            ...(31 <= SAVE.data.n.plot &&
                                SAVE.data.n.plot_date < 0.1 &&
                                SAVE.data.n.state_starton_papyrus !== 1
                                ? [
                                    '<18>{#p/papyrus}{#f/0}QUE GENTILEZA SUA VERIFICAR MEU E-MAIL!',
                                    "<18>{#p/papyrus}{#f/4}EU JÁ TINHA OLHADO ANTES, OBRIGADO."
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* (Você olha dentro...)',
                            world.runaway
                                ? "<32>{#p/basic}* Está mais vazia do que antes."
                                : "<32>{#p/basic}* Não está vazia?"
                        ]
                        : ['<32>{#p/human}* (Você olha dentro...)', "<32>{#p/basic}* Está vazia."]
            ),
            papmail3: ['<32>{#p/human}* (Você decide não olhar.)'],
            puzzlechip: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Mas você já completou este quebra cabeça.)']
                    : ['<32>{#p/basic}* O terminal agora está desbloqueado.'],
            spagtable0: ["<32>{#p/basic}* É um prato não usado."],
            spagtable1: [
                '<32>{#p/human}* (Você olha para o espaguete de dar água na boca.)',
                '<32>{#p/human}* (Está acima do seu alcance.)'
            ],
            spagtable2: ['<32>{#p/human}* (Você pegou o espaguete.)'],
            spagtable2b: ["<32>{#p/human}* (Você está carregando demais pra levar isso.)"],
            spagtable3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você se sente grato pela comida neste prato.)']
                    : world.darker
                        ? ["<32>{#p/basic}* Porque reclamar. \n* É só um simples prato."]
                        : ['<32>{#p/basic}* Outrora o lar de uma criação verdadeiramente de outro mundo.'],
            xtower1: () => [
                ...(postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O término parece ter sido desligado.)',
                            ...[
                                [
                                    "<25>{#p/asriel1}{#f/13}* A energia se foi.\n* Mas faz sentido eles terem desligado.",
                                    "<25>{#f/17}* Não seria legal que alguém se distraísse e perdesse o transporte."
                                ],
                                [
                                    "<25>{#p/asriel1}{#f/13}* Na verdade, eu não acho que eles deixariam alguém pra trás.",
                                    '<25>{#f/13}* Dr. Alphys provavelmente tem algum aparelho que procura almas, então...',
                                    "<25>{#f/17}* Eles saberiam se deixassem alguém para trás.",
                                    '<25>{#f/15}* Me faz questionar se eles podem nos ver agora...'
                                ],
                                ["<25>{#p/asriel1}{#f/17}* Não se preocupa, Frisk.\n* No novo planeta teremos vários jogos."]
                            ][Math.min(asrielinter.xtower1++, 2)]
                        ]
                        : [
                            '<32>{#p/human}* (Você ativa o terminal.)',
                            "<32>{#p/basic}* É um terminal de jogo.",
                            ...(SAVE.data.n.plot === 72 || world.postnoot
                                ? ['<32>{#p/basic}* O suprimento de energia foi cortado.']
                                : ['<32>{#p/basic}* \"Atire nos alvos o mais rápido que puder! Use [Z] para atirar.\"'])
                        ])
            ]
        },
        papbooks1: pager.create(
            0,
            () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (O livro nesta prateleira consiste em vários quebra-cabeças resolvidos.)"]
                    : [
                        '<32>{#p/basic}* A estante está cheia de tomos complexos sobre a criação de quebra-cabeças.',
                        "<32>* E livros de crianças.",
                        ...(roomready()
                            ? [
                                '<18>{#p/papyrus}AÍ ESTÃO MAIOR PARTE DOS MEUS LIVROS FAVORITOS.',
                                '<18>{#f/4}COMO \"FORMAS DE CRIAÇÃO DE QUEBRAS-CABEÇAS.\"',
                                '<18>{#f/0}E OUTRO FAVORITO MEU?',
                                '<18>{#f/4}\"ESCONDE-ESCONDE COM COELHINHO FOFO.\"',
                                '<18>{#f/8}O FINAL SEMPRE ME PEGA!'
                            ]
                            : [])
                    ],
            () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (O livro nesta prateleira consiste em vários quebra-cabeças resolvidos.)"]
                    : ["<32>{#p/basic}* Manuais complexos e livros de crianças."]
        ),
        papbooks2: pager.create(
            1,
            [
                '<32>{#p/human}* (Você pega um livro...)',
                '<32>{#p/basic}* \"A pedra angular do valor interativo de um QC é a afetação do jogador.\"',
                '<32>* \"O impulso dentro de cada jogador para completar uma determinada tarefa.\"',
                '<32>* \"Um quebra-cabeça que desafia e envolve essas motivações garantirá...\"',
                '<32>* \"O jogador permanece focado e na tarefa até o final.\"',
                '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
            ],
            [
                '<32>{#p/human}* (Você pega um livro...)',
                '<32>{#p/basic}* \"\'Boooo\' disse o humano, aparecendo por trás da parede.\"',
                '<32>* \"O coelho fofo, surpreso, olhou como o humano animado.\"',
                '<32>* \"Então, o humano saiu... sem mais conseguir vê-lo, o coelho fofo estava triste.\"',
                '<32>* \"É chocante, pensar no quão sozinho ele estaria.\"',
                '<32>* \"Ele queria chorar, pensando que foi abandonado pela eternidade...\"',
                '<32>* \"Mas então, o humano apareceu de novo, e tudo estava certo no mundo.\"',
                '<32>* \"O humano e o coelho se deram um grande abraço fofo.\"',
                '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
            ],
            () =>
                world.runaway
                    ? [
                        '<32>{#p/human}* (Você pega um livro...)',
                        '<23>{#p/papyrusnt}\"QUERIDO DIARIO, O ESCUDO DE FORÇA FOI DESTRUÍDO.\"',
                        '<23>\"FRISK, O HUMANO QUE CHEGOU NO OUTPOST ALGUNS DIAS ATRÁS...\"',
                        '<23>\"É AGORA UM SUJEITO AO QUAL TODOS TEMEM NO OUTPOST.\"',
                        '<23>\"NÓS VAMOS FUGIR AGORA MESMO, ANTES QUE ELE POSSA ACORDAR.\"',
                        '<23>\"PARTE DE MIM DESEJA QUE ELE POSSA ENCONTRAR O PRÓPRIO CAMINHO FORA DO OUTPOST.\"',
                        '<23>\"TODOS OS OUTROS SÓ PARECEM FELIZES EM DEIXÁ-LO AQUI PARA MORRER.\"',
                        '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<23>{#p/papyrusnt}\"QUERIDO DIARIO, O ESCUDO DE FORÇA FOI DESTRUÍDO.\"',
                            '<23>\"FRISK, O HUMANO QUE CHEGOU NO OUTPOST ALGUNS DIAS ATRÁS...\"',
                            '<23>\"NÓS NOS ESFORÇAMOS MUITOS PARA NÃO SERMOS DESTRUÍDOS.\"',
                            '<23>\"TALVEZ SEJA ISSO QUE INSPIRA SANS A IR EMBORA SEM REMORSOS TAMBÉM.\"',
                            '<23>\"EU SÓ ESTOU MENCIONANDO ISSO, PORQUE NUNCA SOBRE QUE SEU TRABALHO COMO SENTINELA...\"',
                            '<23>\"SIGNIFICAVA FAZER TÃO POUCO TRABALHO DE VERDADE.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
                        : [
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<23>{#p/papyrusnt}\"QUERIDO DIARIO, SANS ACABA DE SER NOMEADO SENTINELA REAL.\"',
                            '<23>\"DE PRIMEIRA, EU ESTAVA CONFUSO COM ELE...\"',
                            '<23>\"ATÉ PORQUE, QUAL SERIA A MOTIVAÇÃO DE ALGUÉM TÃO PREGUIÇOSO?\"',
                            '<23>\"BEM, EU DECIDI NÃO QUESTIONAR.\"',
                            '<23>\"A VERDADE É QUE EU NÃO PODERIA ESTAR MAIS ORGULHOSO!!!',
                            '<23>\"APENAS O TEMPO DIRÁ O BEM QUE ISSO IRÁ NOS TRAZER.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
        ),
        papcomputer1: pager.create(
            0,
            () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : [
                        ...(roomready()
                            ? [
                                "<18>{#p/papyrus}A OUTERNET!\nEU SOU POPULAR LÁ.",
                                "<18>{#f/4}ESTOU A APENAS UMA DÚZIA DE DISTÂNCIA...",
                                '<18>{#f/0}DE TER DUPLO DIGITO DE SEGUIDORES!'
                            ]
                            : []),
                        SAVE.data.b.svr
                            ? '<32>{#p/human}* (Você vai até o computador...)'
                            : "<32>{#p/basic}* O navegador da Web do computador está aberto em um site.",
                        choicer.create("* (Entrar na conta do Papyrus?)", 'Sim', 'Não')
                    ],
            () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : [
                        SAVE.data.b.svr
                            ? '<32>{#p/human}* (Você vai até o computador...)'
                            : "<32>{#p/basic}* O navegador da Web do computador está aberto em um site.",
                        choicer.create("* (Entrar na conta do Papyrus?)", 'Sim', 'Não')
                    ]
        ),
        papcomputer2: ['<32>{#p/human}* (Você decide não entrar.)'],
        papcomputer3: {
            a: 'COOLSKELETON95',
            b: '-2 SEGUIDORES',
            c: 'ESSA CONTA\nE DO\nGRANDE\nPAPYRUS.\nCONTEÚDOS\nDE QUALIDADE!',
            d: '- NEWS -',
            e: () =>
                world.runaway
                    ? 'NOTÍCIA:\n..\n..\n..\n.. NÓS TODOS\nPRECISAMOS IR.'
                    : SAVE.data.n.plot === 72
                        ? 'NOTÍCIA:\nESTAMOS LIVRES.\nTIPO.. SÉRIO.\nFONTE:\nOLHEM PARA\nFORA!'
                        : "NOTÍCIA:\nMEW MEW STARFIRE\nÉ.. BEM RUIM.\nFONTE:\nSÓ É,\nVERDADE?"
        },
        papcomputer4: [
            () =>
                world.runaway
                    ? {
                        a: 'OPA!',
                        b: 'SALVEM-SE...',
                        c: ''
                    }
                    : SAVE.data.n.plot === 72
                        ? {
                            a: 'OPA!',
                            b: 'FALHA AO CONECTAR...',
                            c: ''
                        }
                        : {
                            a: 'OPA!',
                            b: 'COMPARTILHE ALGO...',
                            c: ''
                        },
            () =>
                world.runaway
                    ? {
                        a: 'ALPHYS',
                        b: 'HOJE',
                        c: '< mensagem deletada >'
                    }
                    : SAVE.data.n.plot === 72
                        ? {
                            a: 'SISTEMA',
                            b: 'HOJE',
                            c: 'A Outernet foi fechada.'
                        }
                        : SAVE.data.n.plot < 34
                            ? {
                                a: 'NAPSTABLOOK22',
                                b: 'HOJE',
                                c: 'é por isso que eu não\nfico mais online... nada\nde legal acontece'
                            }
                            : world.genocide
                                ? {
                                    a: 'NAPSTABLOOK22',
                                    b: 'HOJE',
                                    c: "mas eu sou um fantasma..."
                                }
                                : world.dead_skeleton
                                    ? {
                                        a: 'NAPSTABLOOK22',
                                        b: 'HOJE',
                                        c: "umm... eu vou só continuar\ntrabalhando nesta música..."
                                    }
                                    : {
                                        a: 'lazybones.',
                                        b: 'HOJE',
                                        c: "vamos só esperar que\nele não capture nossas ALMAS~\n*arminhas*",
                                        d: true
                                    },
            () =>
                world.runaway
                    ? {
                        a: 'lazybones.',
                        b: 'HOJE',
                        c: '< mensagem deletada >',
                        d: true
                    }
                    : SAVE.data.n.plot === 72
                        ? {
                            a: 'ALPHYS',
                            b: 'HOJE',
                            c: 'Opps, esquece de desligar o\nservidor'
                        }
                        : SAVE.data.n.plot < 34
                            ? {
                                a: 'STRONGFISH91',
                                b: 'ONTEM',
                                c: 'uh... você não fala isso\nTODO dia, Papyrus?'
                            }
                            : world.genocide
                                ? {
                                    a: 'STRONGFISH91',
                                    b: 'HOJE',
                                    c: 'fique fora disse Blooky.\neu não quero que você \nse machuque também.'
                                }
                                : world.dead_skeleton
                                    ? {
                                        a: 'STRONGFISH91',
                                        b: 'HOJE',
                                        c: 'O Papyrus se foi blooky.\nO humano vai PAGAR\npelo que ele fez.'
                                    }
                                    : {
                                        a: 'STRONGFISH91',
                                        b: 'HOJE',
                                        c: 'bem não...\nmas ele com certeza\ncapturou nossas corações!'
                                    },
            () =>
                world.runaway
                    ? {
                        a: 'COOLSKELETON95',
                        b: 'HOJE',
                        c: '< mensagem deletada >'
                    }
                    : SAVE.data.n.plot === 72
                        ? {
                            a: '_Sp4ceAdv3ntur3r_',
                            b: 'HOJE',
                            c: '< Update de Nome >\nWas: _K1ll3rMann3qu1n_\nNow: _Sp4ceAdv3ntur3r_'
                        }
                        : SAVE.data.n.plot < 34
                            ? {
                                a: 'COOLSKELETON95',
                                b: 'ONTEM',
                                c: "HOJE É O DIA QUE EU\nIREI CAPTURAR UM HUMANO!\nSINTO EM MEUS OSSOS!"
                            }
                            : world.genocide
                                ? {
                                    a: 'NAPSTABLOOK22',
                                    b: 'HOJE',
                                    c: 'umm... tem algo que eu possa\nfazer para ajudar? coisas\nparecem estar piorando...'
                                }
                                : {
                                    a: 'NAPSTABLOOK22',
                                    b: 'HOJE',
                                    c: 'então... papyrus capturou um\nhumano? ou...'
                                }
        ] as (() => { a: string; b: string; c: string; d?: boolean })[],
        papcomputer5: () =>
            world.runaway
                ? ['FRISK', "VOCÊ NÃO", 'OUSE VIR', 'ATRÁS DE NÓS']
                : SAVE.data.n.plot === 72
                    ? ['DESCULPA', "MAS NÓS ESTAMOS", 'OFFLINE', 'LMAO']
                    : ['REFRESCANTE', 'MENSAGENS', 'CONFIGURAÇÕES', 'SAIR'],
        papcouch0: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você não encontrou nada no sofá.)"]
                : ["<32>{#p/basic}* Ele foi limpado."],
        papcouch1: pager.create(
            0,
            () => [
                '<32>{#p/human}* (Você ouve um som estridente dentro do sofá.)',
                SAVE.data.b.svr
                    ? '<32>{#p/human}* (Parece que um saco de moedas foi deixado aqui...)'
                    : '<32>{#p/basic}* Há um monte de moedas soltas dentro...',
                choicer.create('* (Pegar as moedas?)', 'Sim', 'Não')
            ],
            () => [
                SAVE.data.b.svr
                    ? "<32>{#p/human}* (As moedas lá dentro não se moveram de onde estão.)"
                    : '<32>{#p/basic}* As moedas ainda estão aí.',
                choicer.create('* (Pegar as moedas?)', 'Sim', 'Não')
            ]
        ),
        papcouch2: ['<32>{#p/human}* (Você decide não pegar nada.)'],
        papcouch3: ['<32>{#p/human}* (Você achou 10G.)'],
        papcouch3a: [
            "<18>{#p/papyrus}{#f/1}VOCÊ ESTÁ LIMPANDO O SOFÁ PRA GENTE!?",
            '<18>{#p/papyrus}{#f/5}E POR NADA ALÉM DE BONDADE VINDA DO SEU CORAÇÃO...',
            '<18>{#p/papyrus}{#f/6}QUANTA GENEROSIDADE!!!'
        ],
        paproom1: [
            '<18>{#p/papyrus}{#f/6}O QUE!?\nCOMO VOCÊ...',
            '<18>{#p/papyrus}{#f/5}VOCÊ APARECEU BEM NA MINHA FRENTE!'
        ],
        paproom2: ['<18>{#p/papyrus}{#f/4}O SANS TEM TE ENSINADO OS ATALHOS DELE...?'],
        paproom3: ['<18>{#p/papyrus}{#f/7}... UGH!\nPARA COM ISSO!!'],
        paproom4: ["<18>{#p/papyrus}{#f/0}VOCÊ ESTÁ PROCURANDO PROBLEMA, HUMANO."],
        paproom5: ['<18>{#p/papyrus}{#f/4}(CHORINHO...)'],
        papdate0: () => [
            SAVE.data.b.flirt_papyrus
                ? "<18>{#p/papyrus}{#f/5}WOWIE, VOCÊ ESTÁ TÃO ANSIOSO PARA O ENCONTRO..."
                : "<18>{#p/papyrus}{#f/5}WOWIE, VOCÊ ESTÁ TÃO ANSIOSO PARA SAIR COMIGO...",
            "<18>{#f/5}QUE VOCÊ ESTÁ TENTANDO ENTRAR NA MINHA CASA ANTES DE MIM!",
            "<18>{#f/6}ISSO É DEDICAÇÃO!"
        ],
        papdate1x: pager.create(
            0,
            [
                '<18>{#p/papyrus}{#f/0}OLÁ, HUMANO!',
                '<18>{#f/5}ESPERO QUE TUDO ESTEJA BEM.',
                '<18>{#f/6}SINTA-SE LIVRE PARA ANDAR PELA CIDADE...',
                '<18>{#f/0}... OU OLHAR A MINHA CASA!'
            ],
            ["<18>{#p/papyrus}{#f/4}SÓ TENTA EVITAR O QUARTO DO SANS."]
        ),
        papdate1: () => [
            SAVE.data.b.flirt_papyrus
                ? '<18>{#p/papyrus}ENTÃO VOCÊ VOLTOU PARA TER UM ENCONTRO COMIGO!'
                : '<18>{#p/papyrus}ENTÃO VOCÊ VOLTOU PARA ME VER!',
            ...(world.dead_dog || world.population < 6
                ? [
                    "<18>{#f/0}ISSO É ÓTIMO!!",
                    "<18>{#f/5}VERDADE SEJA DITA, HOJE ESTÁ UM POUCO SOLITÁRIO...",
                    '<18>{#f/5}MUITAS PESSOAS SUMIRAM...',
                    "<18>{#f/0}MAS VOCÊ ESTÁ AQUI!!",
                    '<18>{#f/0}ISSO SIGNIFICA ALGO, CERTO??'
                ]
                : ['<18>{#f/4}VOCÊ DEVE ESTAR FALANDO BEM SÉRIO SOBRE ISSO...']),
            "<18>{#f/5}EU VOU TE LEVAR PARA UM LUGAR BEM ESPECIAL...",
            '<18>{#f/0}UM LUGAR QUE GOSTO DE PASSAR BASTANTE TEMPO!!!'
        ],
        papdate2: ['<18>{#p/papyrus}MINHA CASA!!!'],
        papdate3: pager.create(
            0,
            ['<18>{#p/papyrus}SEJA BEM VINDO A MINHA CASA!', '<18>SINTA-SE BEM E APROVEITE SEU TEMPO!!!'],
            ["<18>{#p/papyrus}QUANDO TIVER OLHADO TUDO, PODE SUBIR AS ESCADAS ATÉ MEU QUARTO!"]
        ),
        papdate3a: ['<18>{#p/papyrus}{#f/6}WOW! SER UM BOM ANCIÃO É UM BELO EXERCÍCIO!'],
        papdate3b: [
            "<18>{#p/papyrus}{#f/5}WOWIE, NÃO CONSIGO SENTIR MINHAS PERNAS...",
            "<18>{#f/0}ISSO DEVE SIGNIFICAR QUE EU SOU O MELHOR COM VISITAS!!!"
        ],
        papdate4: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}ESSE É MEU QUARTO!",
                "<18>{#f/4}SE VOCÊ JÁ TERMINOU DE OLHAR, A GENTE PODE...",
                '<18>{#f/4}FAZER...',
                SAVE.data.b.flirt_papyrus
                    ? '<18>{#f/9}SEJA LÁ O QUE AS PESSOAS FAÇAM NOS ENCONTROS!'
                    : '<18>{#f/9}\"UM ROLÊ\" IGUAL UM PAR DE AMIGOS LEGAIS!',
                choicer.create('* (O que você diz?)', 'Sim', 'Não')
            ],
            () => ['<18>{#p/papyrus}PRONTO?', choicer.create('* (O que você diz?)', 'Sim', 'Não')]
        ),
        papdate4a: ["<18>{#p/papyrus}OKAY, VAMOS LÁ!"],
        papdate4b: ["<18>{#p/papyrus}EU VOU CONTINUAR ESPERANDO!"],
        papdate5: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}ENTÃO, HMM...',
                "<18>{#f/5}SE VOCÊ JÁ VIU TUDO...",
                SAVE.data.b.flirt_papyrus
                    ? '<18>{#f/6}QUER COMEÇAR O ENCONTRO?'
                    : '<18>{#f/6}QUER COMEÇAR NOSSO ROLÊ?',
                choicer.create('* (O que você diz?)', 'Sim', 'Não')
            ],
            () => ['<18>{#p/papyrus}{#f/6}PRONTO PARA COMEÇAR?', choicer.create('* (O que você diz?)', 'Sim', 'Não')]
        ),
        papdate5a: () => [
            SAVE.data.b.flirt_papyrus
                ? '<18>{#p/papyrus}OKAY!!!\nCOMEÇAR ENCONTRO!!!'
                : "<18>{#p/papyrus}OKAY!!!\nVAMOS DAR UM ROLÊ!!"
        ],
        papdate5b: ["<18>{#p/papyrus}TOME SEU TEMPO, EU ESPERO."],
        papdate6: () => [
            SAVE.data.b.flirt_papyrus
                ? '<#32>{#p/story}         ENCONTRO    COMEÇAR!'
                : '<#32>{#p/story}         ROLÊ   COMEÇAR!'
        ],
        papdate7: () => [
            '<15>{#p/papyrus}{#f/10}AÍ VAMOS NÓS!',
            SAVE.data.b.flirt_papyrus ? '<15>{#f/20}NOSSO ENCONTRO!!' : '<15>{#f/20}ROLEZANDO!!',
            "<15>{#f/24}NA VERDADE EU NUNCA FIZ ISSO ANTES.",
            "<15>{#f/10}MAS NÃO SE PREOCUPE!!!",
            '<15>{#f/20}PREPARAÇÃO É MEU SOBRENOME (NÃO OFICIAL)!'
        ],
        papdate8: () => [
            '<15>{#f/20}O QUE EU TENHO AQUI, VOCÊ PERGUNTA?',
            SAVE.data.b.flirt_papyrus
                ? '<15>{#p/papyrus}{#f/10}UM GUIA OFICIAL DE NAMORO, DIRETO DA LIBRARIA!'
                : '<15>{#p/papyrus}{#f/10}UM GUIA OFICIAL DE HANGOUT, DIRETO DO THE LIBRARIA!',
            "<15>{#f/20}COM ISSO, É CERTEZA QUE TEREMOS UM BOM TEMPO!"
        ],
        papdate9: () => [
            "<15>{#p/papyrus}{#f/2}VAMOS VER...",
            SAVE.data.b.flirt_papyrus
                ? '<15>{#f/25}PRIMEIRO PASSO: PRESSIONE C OU CTRL PARA ABRIR O {@fill=#f00}LIVRO{@fill=#000}.'
                : '<15>{#f/25}PRIMEIRO PASSO: PRESSIONE C OU CTRL PARA ABRIR O {@fill=#f00}LIVRO{@fill=#000}.'
        ],
        papdate10: () => [
            '<15>{#p/papyrus}{#f/24}... ESPERA.',
            '<15>{#f/22}VOCÊ JÁ FEZ ISSO ANTES!?!?',
            SAVE.data.b.flirt_papyrus
                ? '<15>{#f/11}WOWIE, VOCÊ DEVE REALMENTE ME AMAR!'
                : '<15>{#f/11}WOWIE, VOCÊ DEVE REALMENTE GOSTAR DE MIM!',
            "<15>{#f/10}PARA O SEGUNDO PASSO, ENTÃO!"
        ],
        papdate11: [
            '<15>{#p/papyrus}{#f/24}...',
            "<15>{#f/24}EH, NÓS NÃO PRECISAMOS DISSO DE TODA FORMA.",
            '<15>{#f/20}PARA O SEGUNDO PASSO!'
        ],
        papdate12: [
            '<15>{#p/papyrus}{#f/11}WOWIE, ME SINTO TÃO INFORMADO!',
            "<15>{#f/24}DE FATO, ESTAMOS PRONTOS PARA O SEGUNDO PASSO..."
        ],
        papdate13: () => [
            SAVE.data.b.flirt_papyrus
                ? '<15>{#p/papyrus}{#f/25}SEGUNDO PASSO: CONVIDÁ-LOS PARA SAIR.'
                : '<15>{#p/papyrus}{#f/25}SEGUNDO PASSO: CONVIDÁ-LOS PARA UM ROLÊ.'
        ],
        papdate13a: () => [
            '<15>{#f/24}\"AHEM.\"',
            '<15>{#f/20}HUMANO!\nEU, O GRANDE PAPYRUS...',
            SAVE.data.b.flirt_papyrus
                ? '<15>{#f/10}GOSTARIA DE IR EM UM ENCONTRO CONTIGO!'
                : '<15>{#f/10}GOSTARIA DE IR EM UM ROLÊ CONTIGO!'
        ],
        papdate14: () => [choicer.create('* (O que você diz?)', 'Sim', 'Não')],
        papdate15a: ['<15>{#p/papyrus}{#f/12}S-SÉRIO???', '<15>{#f/11}WOWIE!!!'],
        papdate15a1: ["<15>{#f/24}ACHO QUE AGORA É HORA DO TERCEIRO PASSO..."],
        papdate15b: ['<15>{#p/papyrus}{#f/21}OH...', '<15>{#f/27}F-FELIZMENTE, AQUI SÓ DIZ PARA PERGUNTAR.'],
        papdate15c: ["<15>{#f/24}BEM DE TODA FORMA, PARA O PASSO TRÊS..."],
        papdate16: ['<15>{#p/papyrus}{#f/25}TERCEIRO PASSO: COLOQUE ROUPAS LEGAIS PARA MOSTRAR QUE SE IMPORTA.'],
        papdate16a: ['<15>{#p/papyrus}{#f/24}...', '<15>{#f/24}ESPERA UM SEGUNDO.'],
        papdate17: () => [
            '<15>{#f/24}BELAS ROUPAS...',
            (
                {
                    spacesuit: "<15>{#f/26}ESSA ROUPA ESPACIAL QUE VOCÊ ESTÁ USANDO...",
                    halo: '<15>{#f/26}ESSE HALO QUE VOCÊ ESTÁ USANDO...',
                    eye: '<15>{#f/26}ESSE ESCUDO DE FORÇA QUE VOCÊ ESTÁ USANDO...',
                    eye_x: '<15>{#f/26}ESSE ESCUDO DE FORÇA QUE VOCÊ ESTÁ USANDO...',
                    temyarmor: "<15>{#f/26}ESSA ARMADURA QUE VOCÊ ESTÁ USANDO...",
                    goggles: '<15>{#f/26}ESSA ENGENHOCA NA SUA CABEÇA...',
                    goggles_x: '<15>{#f/26}ESSA ENGENHOCA NA SUA CABEÇA...',
                    visor: '<15>{#f/26}ESSE VISOR NA FRENTE DOS SEUS OLHOS...',
                    visor_x: '<15>{#f/26}ESSE VISOR NA FRENTE DOS SEUS OLHOS...',
                    sonic: "<15>{#f/26}ESSE DISPOSITIVO VELHO QUE VOCÊ ESTÁ USANDO...",
                    heart_locket: '<15>{#f/26}ESSE MEDALHÃO EM VOLTA DO SEU PESCOÇO...'
                } as Partial<CosmosKeyed<string>>
            )[SAVE.data.s.armor] || '<15>{#f/26}ESSA COISA NO SEU CORPO...',
            "<15>{#f/20}VOCÊ ESTÁ USANDO UMA ROUPA AGORA MESMO!!!",
            '<15>{#f/24}E NÃO SÓ ISSO...',
            '<15>{#f/20}HOJE MAIS CEDO, VOCÊ TAMBÉM ESTAVA USANDO UMA ROUPA!'
        ],
        papdate17a: () => [
            '<15>{#f/12}NÃO...!\nNÃO PODE SER???',
            SAVE.data.b.flirt_papyrus
                ? '<15>{#f/13}VOCÊ QUERIA SAIR COMIGO DESDE O COMEÇO?'
                : '<15>{#f/13}VOCÊ QUERIA SER MEU AMIGO DESDE O COMEÇO?'
        ],
        papdate18a: () => [
            '<15>{#p/papyrus}{#f/22}NÃO!!',
            '<15>{#f/22}VOCÊ PLANEJOU TUDO!!!',
            ...(SAVE.data.b.flirt_papyrus
                ? [
                    '<15>{#f/22}VOCÊ DEVE SER MELHOR DO QUE EU EM ENCONTROS!!!',
                    '<15>N-NÃOOOO!!\nSEU {@fill=#003cff}PODER DE NAMORO{@fill=#000}...!!!'
                ]
                : [
                    '<15>{#f/22}VOCÊ DEVE SER MELHOR DO QUE EU EM DAR ROLÊ!!!',
                    '<15>N-NÃOOOO!!\nSEU {@fill=#003cff}PODER DE AMIZADE{@fill=#000}'
                ])
        ],
        papdate18b: () => [
            '<15>{#p/papyrus}{#f/24}OH...',
            '<15>{#f/21}MAS APESAR DISSO...',
            '<15>{#f/21}VOCÊ AINDA ESCOLHEU USAR ROUPAS HOJE DE TODOS OS DIAS...?',
            "<15>{#f/24}É COMO SE...",
            ...(SAVE.data.b.flirt_papyrus
                ? [
                    '<15>{#f/13}SE SEU INTERESSE EM MIM JÁ ESTIVESSE PREDESTINADO~',
                    '<15>{#f/22}N-NÃOOOO!!\nSEU {@fill=#003cff}PODER DE NAMORO{@fill=#000}'
                ]
                : [
                    '<15>{#f/13}COMO SE NOSSA AMIZADE TIVESSE SIDO PREDESTINADA~',
                    '<15>{#f/22}N-NÃOOOO!!\nSEU {@fill=#003cff}PODER DE AMIZADE{@fill=#000}'
                ])
        ],
        papdate19: ['<15>{#p/papyrus}{#f/15}NYEH!', '<15>{#f/15}NYEH HEH HEH!!!'],
        papdate20: () => [
            "<15>{#p/papyrus}{#f/15}NÃO PENSE QUE VOCÊ ME VENCEU!",
            '<15>{#f/20}EU, O GRANDE PAPYRUS...',
            SAVE.data.b.flirt_papyrus
                ? '<15>{#f/20}NUNCA FUI DERROTADO EM UM ENCONTRO...'
                : '<15>{#f/20}NUNCA FUI DERROTADO EM UM ROLÊ...',
            '<15>{#f/15}E JAMAIS SEREI!!',
            '<15>{#f/10}EU POSSO FACILMENTE MANTER O RITMO COM VOCÊ!!!',
            '<15>{#f/24}NA VERDADE...',
            '<15>{#f/20}EU SEMPRE USO MINHAS ROUPAS \"ESPECIAIS\"...',
            '<15>{#f/20}EM BAIXO DAS MINHAS NORMAIS!!',
            '<15>{#f/15}OBSERVE!!'
        ],
        papdate21: ['<15>{#p/papyrus}{#f/15}O QUE VOCÊ ACHOU DO MEU ESTILO SECRETO?'],
        papdate22: () => [choicer.create('* (O que você diz?)', 'Super Fera', 'Uma bosta')],
        papdate23a: ['<15>{#p/papyrus}{#f/13}NÃO!!!', '<15>{#f/13}UM COMPRIMENTO GENUÍNO...!'],
        papdate23b: ['<15>{#p/papyrus}{#f/13}NÃO!!!', '<15>{#f/13}UMA CRÍTICA, MAS HONESTA OPINIÃO...!'],
        papdate24: [
            '<15>{#p/papyrus}{#f/24}ENTRE TANTO...',
            "<15>{#f/20}VOCÊ NÃO ENTENDE O {@fill=#f00}PODER{@fill=#000} DESTE OUTFIT!",
            '<15>{#f/26}SENDO ASSIM...'
        ],
        papdate24a: () => [
            '<15>{#f/15}ENTÃO O QUE VOCÊ DISSE É INVALIDO!',
            SAVE.data.b.flirt_papyrus
                ? "<15>{#f/15}ESTE ENCONTRO NÃO VAI ESCALAR ACIMA DISSO!"
                : "<15>{#f/15}ESTE ROLÊ NÃO VAI ESCALAR ACIMA DISSO!",
            '<15>{#f/24}AH NÃO SER...',
            '<15>{#f/20}QUE VOCÊ ENCONTRE MEU {@fill=#f00}SEGREDO{@fill=#000}.',
            "<15>{#f/15}MAS ISSO NÃO VAI ACONTECER!!"
        ],
        papdate24b: '* Mova e inspecione com [Z].',
        papdate25: [
            
            '<15>{#p/papyrus}{#f/21}O CABELO NA MINHA CABEÇA?',
            '<15>{#f/16}O CABELO NA MINHA CABEÇA.',
            '<15>{#f/10}O CABELO... NA MINHA CABEÇA!!!',
            "<15>{#f/10}NYEH HEH HEH!\nISSO É REALMENTE MUITO SIGNIFICATIVO!"
        ],
        papdate25a: [
            '<15>{#p/papyrus}{#f/21}IMPRESSIONADO COM A VISÃO DA MINHA ROUPA \"ESTELAR?\"',
            '<15>{#f/24}NÃO, NÃO, EU ENTENDO.',
            "<15>{#f/20}MAS VOCÊ NÃO PODE PARAR AGORA!!!"
        ],
        papdate25b: [
            '<15>{#p/papyrus}{#f/26}ESSA CAMISA ORIGINALMENTE NÃO DIZIA \"ESTELAR...\"',
            '<15>{#f/20}MAS EU A MELHOREI!',
            '<15>{#f/10}DICA DE EXPERT: TODAS AS ROUPAS PODEM SER MELHORADAS ASSIM.',
            "<15>{#f/20}... MAS ISSO NÃO É UM SEGREDO!\nTENTE DE NOVO!"
        ],
        papdate25c: [
            '<15>{#p/papyrus}{#f/24}EU ENTENDO, EU ENTENDO.',
            '<15>{#f/24}VOCÊ GOSTA DE SENTIR MEUS TRAVESSEIROS DE BRAÇO COM UM CORAÇÃO FLUTUANTE.',
            "<15>{#f/20}MAS QUEM NÃO!?\nTENTE DE NOVO!"
        ],
        papdate25d: [
            "<15>{#p/papyrus}{#f/13}SEGURANDO MINHA MÃO PARA QUE EU TE DIGA A RESPOSTA...?",
            '<15>{#f/14}N-NÃO, EU DEVO RESISTIR!!',
            '<15>{#f/20}TENTE DE NOVO!'
        ],
        papdate25e: [
            "<15>{#p/papyrus}{#f/26}ALMOFADAS OU NÃO, NÃO EXISTEM SEGREDOS AÍ.",
            '<15>{#f/10}APENAS TRABALHO DURO E PERSEVERANÇA!',
            '<15>{#f/20}TENTE DE NOVO!'
        ],
        papdate25f: [
            '<15>{#p/papyrus}{#f/24}ESTE \"DRIP\" PODE SER INDES- PÉS- SAVEL...',
            '<15>{#f/20}MAS ESPERAR UM SEGREDO AÍ É SEM SENTIDO!',
            '<15>{#f/20}TENTE DE NOVO!'
        ],
        papdate25g: [
            '<15>{#p/papyrus}{#f/20}AH SIM, MINHA ROUPA ESPORTIVA TOP DE LINHA!',
            "<15>{#f/24}VOCÊ NÃO VAI ENCONTRAR NENHUM SEGREDO AÍ, POR QUE...",
            "<15>{#f/20}EU NÃO TENHO BOLSOS PARA ESCONDER NADA!!!",
            '<15>{#f/20}TENTE DE NOVO!'
        ],
        papdate25h: () => [
            '<15>{#p/papyrus}{#f/24}MEUS OMBROS...',
            '<15>{#f/10}VOCÊ ESTÁ PEDINDO UMA CARONA NAS COSTAS??',
            SAVE.data.b.flirt_papyrus
                ? "<15>{#f/24}BEM, EU TE DARIA UMA, MAS ESTAMOS OCUPADOS NO ENCONTRO."
                : "<15>{#f/24}BEM, EU TE DARIA UMA, MAS ESTAMOS NO ROLÊ.",
            '<15>{#f/20}MAS NÓS ESTAMOS AQUI! \nTENTE DE NOVO!'
        ],
        papdate25i: [
            '<15>{#p/papyrus}{#f/14} SÉRIO??',
            "<15>{#f/19}EU NÃO VOU SÓ TE CONTAR O SEGREDO...",
            "<15>{#f/20}VOCÊ VAI TER QUE SE ESFORÇAR UM POUCO MAIS DO QUE ISSO!"
        ],
        papdate25j: () =>
            calcLV() > 2
                ? [
                    '<15>{#p/papyrus}{#f/24}SE O SEU {@fill=#f00}LV{@fill=#000} É TÃO ALTO, ENTÃO...',
                    SAVE.data.b.flirt_papyrus
                        ? '<15>{#f/28}SEU {@fill=#f00}AMOR{@fill=#000} POR MIM DEVE SER AINDA MAIOR DO QUE EU PENSAVA!'
                        : "<15>{#f/28}VOCÊ TEM MAIS EXPERIÊNCIA COM {@fill=#f00}LOVE{@fill=#000} DO QUE EU PENSAVA!",
                    "<15>{#f/24}AINDA ASSIM, ESTE É SEU SEGREDO, NÃO O MEU.",
                    '<15>{#f/20}TENTE DE NOVO!'
                ]
                : calcLV() === 2
                    ? [
                        '<15>{#p/papyrus}{#f/24}UM {@fill=#f00}LV{@fill=#000} DE DOIS?',
                        '<15>{#f/27}ISSO SIGNIFICA...',
                        ...(SAVE.data.b.flirt_papyrus
                            ? [
                                '<15>{#f/28}VOCÊ TEM UM SEGUNDO {@fill=#f00}AMOR{@fill=#000} DE INTERESSE...?',
                                '<15>{#f/20}BEM, ESSE É PRA SER MEU SEGREDO!!'
                            ]
                            : [
                                '<15>{#f/28}SEU INTERESSE POR MIM É SECRETAMENTE DUPLO?',
                                '<15>{#f/28}QUE NO FUNDO VOCÊ ME {@fill=#f00}AMA{@fill=#000} MAIS DO QUE GOSTA DE MIM?',
                                '<15>{#f/14}N-NÃO...!\nEU NÃO VOU SUCUMBIR AOS SEUS TRUQUES!'
                            ]),
                        '<15>{#f/20}TENTE DE NOVO!'
                    ]
                    : SAVE.data.b.oops
                        ? [
                            '<15>{#p/papyrus}{#f/24}UM {@fill=#f00}LV{@fill=#000} DE UM?',
                            '<15>{#f/26}ISSO SIGNIFICA...',
                            "<15>{#f/28}QUE EU SOU SEU VERDADEIRO {@fill=#f00}AMOR{@fill=#000}...?",
                            ...(SAVE.data.b.flirt_papyrus
                                ? ['<15>{#f/14}N-NÃO...!\nEU NÃO VOU SUCUMBIR AOS SEUS TRUQUES!']
                                : [
                                    "<15>{#f/24}BEM, ISSO NÃO FAZ SENTIDO JÁ QUE SOMOS SÓ AMIGOS.",
                                    '<15>{#f/14}M-MAS... NÃO!\nEU NÃO SUCUMBIREI AOS SEUS TRUQUES!'
                                ]),
                            '<15>{#f/20}TENTE DE NOVO!'
                        ]
                        : [
                            '<15>{#p/papyrus}{#f/24}UM {@fill=#f00}LV{@fill=#000} DE ZERO?',
                            "<15>{#f/26}OK, ISSO É ESTRANHO.",
                            "<15>{#f/21}SANS ME DISSE QUE O {@fill=#f00}LOVE{@fill=#000} DOS HUMANOS COMEÇA EM UM.",
                            '<15>{#f/24}HMM...',
                            '<15>{#f/24}ESTE É SEU SEGREDO?',
                            '<15>{#f/20}BEM, AQUI ESTAMOS FALANDO SOBRE MEU SEGREDO.',
                            '<15>{#f/20}TENTE DE NOVO!'
                        ],
        papdate25k: () => [
            ...(SAVE.data.n.hp > calcHP()
                ? [
                    '<15>{#p/papyrus}{#f/22}O QUÊ!?\nUM HP ACIMA DE -CHEIO- VOCÊ DIZ!?',
                    '<15>{#f/10}VOCÊ REALMENTE VEIO PREPARADO PARA TUDO!',
                    '<15>{#f/24}MAS ISSO NÃO TEM NADA HAVER COM MEU SEGREDO.'
                ]
                : [
                    '<15>{#p/papyrus}{#f/24}SEU HP PODE ESTAR CHEIO, MAS QUANDO SE TRATA DO MEU SEGREDO...',
                    "<15>{#f/20}VOCÊ AINDA ESTÁ PROCURANDO NO VAZIO!"
                ]),
            '<15>{#f/20}TENTE DE NOVO!'
        ],
        papdate25l: [
            "<15>{#p/papyrus}{#f/20}É ASSIM QUE FUNCIONA...",
            '<15>{#f/24}VOCÊ PENSA QUE AO COÇAR MEU PESCOÇO...',
            '<15>{#f/21}E ME CHAMAR DE \"BOM MENINO...\"',
            "<15>{#f/24}EU VOU TE JOGAR A RESPOSTA COMO UM CACHORRO.",
            '<15>{#f/20}ÚLTIMA VEZ QUE VI, EU ERA UM ESQUELETO! ENTÃO TENTE DE NOVO!'
        ],
        papdate26: () => [
            '<15>{#p/papyrus}{#f/27}P-POIS BEM...',
            '<15>{#f/27}VOCÊ ACHOU MEU SEGREDO!',
            '<15>{#f/24}EU SUPONHO QUE NÃO TENHA OUTRA ESCOLHA SE NÃO TE CONTAR A VERDADE.',
            "<15>{#f/24}É UM PRESENTE...",
            ['<15>{#f/27}UM PRESENTE S-SÓ PARA VOCÊ!!!', '<15>{#f/27}UM PRESENTE PARA NÓS COMPARTILHARMOS!'][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
            ],
            '<15>{#f/10}VÁ EM FRENTE!\nABRA!'
        ],
        papdate27: () => [choicer.create('* (O que você vai fazer?)', 'Abrir', 'Não abrir')],
        papdate28: [
            "<15>{#p/papyrus}{#f/21}VOCÊ NEM VAI MACHUCAR MEU EMBRULHO DELICADO??",
            '<15>{#f/27}N-NÃO... AQUELA TÉCNICA...',
            "<15>{#f/13}É DEMAIS!!!",
            '<15>{#f/14}M-MAS... AHA! CONTRA-ATAQUE!',
            "<15>{#f/15}EU VOU ABRIR O PRESENTE POR CONTA PRÓPRIA!!"
        ],
        papdate29: ['<15>{#p/papyrus}{#f/20}VOCÊ SABE O QUE É ISSO?'],
        papdate30: () => [choicer.create('* (Você sabe o que é isso?)', 'Sim', 'Não')],
        papdate31a: [
            '<15>{#p/papyrus}{#f/26}ESPAGUETE.',
            "<15>{#f/24}ISSO PROVAVELMENTE NÃO ERA O QUE VOCÊ ESTAVA PENSANDO, CERTO?",
            '<15>{#f/20}CERTO!',
            '<15>{#f/15}MAS OH- ERRADO!'
        ],
        papdate31b: [
            "<15>{#p/papyrus}{#f/20}NYEH HEH HEH!\nEXATAMENTE.",
            '<15>{#p/papyrus}{#f/15}VOCÊ NÃO TEM IDEIA!',
            '<15>{#f/24} POR MAIS QUE ISSO PAREÇA SER ESPAGUETE...'
        ],
        papdate32: () => [
            "<15>{#p/papyrus}{#f/20}ISSO NÃO É UMA PASTA VELHA QUALQUER!",
            "<15>{#f/20}ESTE É UM TRABALHO DE ARTISTA!",
            '<15>{#f/24}ESPAGUETE DE SEDA, FINAMENTE ENVELHECIDO EM UMA UNIDADE DE DILATAÇÃO DO TEMPO.',
            '<15>{#f/20}ENTÃO PREPARADO POR MIM, O MESTRE CHEFE PAPYRUS!',
            "<15>{#f/15}HUMANO!!!\nÉ HORA DE ACABAR COM ISSO!!",
            "<15>SEM CHANCES DISSO SE PROLONGAR AINDA MAIS!",
            ...[["<15>{#f/20}VAMOS COMER ESSE ESPAGUETE JUNTOS!!!"], ['<15>{#f/20}BANQUETEAR-SE COM MINHA TÉCNICA SUPREMA!!!']][
            (SAVE.data.n.state_papyrus_spaghet + 1) % 2
            ]
        ],
        papdate33: () => [choicer.create('* (O que você vai fazer?)', 'Comer', 'Não abrir')],
        papdate33a: () => [
            '<32>{#p/human}* (Você come um pouquinho.)\n* (Você parece estar ficando vermelho com o sabor.)',
            "<32>{#p/basic}* É inacreditável...!",
            ...(SAVE.data.n.state_papyrus_spaghet === 1
                ? ['<32>{#p/basic}* Papyrus parece ter gostado de comer também.']
                : [])
        ],
        papdate34a: () => [
            '<15>{#p/papyrus}{#f/10}QUE EXPRESSÃO DE PAIXÃO!!!',
            SAVE.data.b.flirt_papyrus
                ? '<15>{#f/12}VOCÊ DEVE AMAR MINHA FORMA DE COZINHAR!'
                : '<15>{#f/12}VOCÊ DEVE REALMENTE GOSTAR DA MINHA FORMA DE COZINHAR!',
            ...[
                [
                    '<15>{#f/24}BEM, EU GOSTEI TAMBÉM...',
                    SAVE.data.b.flirt_papyrus
                        ? '<15>{#f/20}MAS EU ACHO QUE VOCÊ GOSTOU AINDA MAIS DO QUE EU!!!'
                        : '<15>{#f/20}MAS EU ACHO QUE VOCÊ GOSTOU AINDA MAIS DO EU!!!'
                ],
                ['<15>{#f/10}E POR EXTENSÃO, EU!', '<15>{#f/20}TALVEZ AINDA MAIS DO QUE EU!!!']
            ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2],
            "<15>{#f/27}MAS... ISSO É IMPOSSÍVEL...!",
            '<15>{#f/12}COMO VOCÊ FEZ ISSO!?!?'
        ],
        papdate34b: () => [
            '<15>{#p/papyrus}{#f/21}VOCÊ...',
            "<15>{#f/18}VOCÊ VAI ME DEIXAR COMER NO SEU LUGAR?",
            ...[
                [
                    '<15>{#f/24}EU PENSEI QUE QUANDO VOCÊ DISSE QUE ESTAVA COMPARTILHANDO...',
                    '<15>{#f/20}VOCÊ GOSTARIA AO MENOS DE UM POUCO PARA SI.',
                    '<15>{#f/27}MAS NÃO, TODO ESSE TEMPO...',
                    '<15>{#f/12}VOCÊ QUE QUE EU, -EU-, COMA SOZINHO!!!'
                ],
                [
                    '<15>{#f/21}MESMO APÓS O QUE VOCÊ DISSE ANTES...',
                    '<15>{#f/21}SOBRE QUERER O ESPAGUETE PARA VOCÊ...',
                    '<15>{#f/27}NO PRECIPÍCIO DE SUA SATISFAÇÃO, VOCÊ...',
                    '<15>{#f/12}VAI DAR TUDO PARA MIM???'
                ]
            ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
        ],
        papdate35: ['<15>{*}{#p/papyrus}{#f/22}AUGH!!!{%15}'],
        papdate36: ['<15>{*}{#p/papyrus}{#f/22}URRRGH!!!{%15}'],
        papdate37: ['<15>{*}{#p/papyrus}{#f/22}NÃÃOOOOOO!!!{%15}'],
        papdate38: () => [
            "<18>{#p/papyrus}{@random=1.1/1.1}HUMANO.\nESTÁ CLARO AGORA.",
            SAVE.data.b.flirt_papyrus
                ? "<18>{@random=1.1/1.1}VOCÊ ESTÁ COMPLETAMENTE APAIXONADO POR MIM."
                : "<18>{@random=1.1/1.1}VOCÊ ESTÁ COMPLETAMENTE OBCECADO POR MIM.",
            '<99>{@random=1.1/1.1}TUDO QUE VOCÊ FAZ.\nTUDO QUE VOCÊ DIZ.',
            "<18>{@random=1.1/1.1}É TUDO POR MIM.",
            '<18>{@random=1.1/1.1}HUMANO.\nEU QUERO QUE VOCÊ SEJA FELIZ TAMBÉM.',
            "<18>{@random=1.1/1.1}É MINHA VEZ DE EXPRESSAR MEUS SENTIMENTOS...",
            "<18>{@random=1.1/1.1}É HORA DE TE DIZER A VERDADE."
        ],
        papdate39: () =>
            SAVE.data.b.flirt_papyrus
                ? [
                    '<15>{#f/21}HUMANO, A VERDADE É QUE...',
                    "<15>{#f/21}EU NÃO GOSTO TANTO DE VOCÊ COMO VOCÊ DE MIM.",
                    '<15>{#f/24}ROMANTICAMENTE, EU DIGO.',
                    '<15>{#f/27}QUER DIZER, EU TENTEI BASTANTE TAMBÉM!',
                    '<15>{#f/27}EU PENSEI QUE PORQUE VOCÊ TINHA FLERTADO COMIGO...',
                    '<15>{#f/27}QUE EU DEVERIA IR EM UM ENCONTRO COM VOCÊ.',
                    '<15>{#f/10}ENTÃO, EM NOSSO ENCONTRO, OS SENTIMENTOS FLORESCERIAM!!!',
                    '<15>{#f/20}EU SERIA CAPAZ DE IGUALAR SUA PAIXÃO POR MIM!',
                    '<15>{#f/21}MAS ALAS...\nEU, O GRANDE PAPYRUS...',
                    '<15>{#f/21}FALHEI.',
                    '<15>{#f/21}EU ME SINTO DA MESMA FORMA QUE ANTES.',
                    '<15>{#f/27}E A PIOR PARTE É QUE, AO TER UM ENCONTRO CONTIGO...',
                    '<15>{#f/22}EU APENAS TE COLOQUEI MAIS FUNDO NO SENTIMENTO DE AMOR!',
                    '<15>{#f/21}UM PRISÃO ESCURA DE PAIXÃO QUE NÃO EXISTE COMO ESCAPAR.',
                    '<15>{#f/27}COMO EU POSSO TER FEITO ISSO COM MEU QUERIDO AMIGO...?',
                    '<15>{#f/27}...',
                    '<15>{#f/27}... NÃO...'
                ]
                : ['<15>{#f/24}HUMANO, A VERDADE É QUE...'],
        papdate39a: () => [
            ...(SAVE.data.b.flirt_papyrus
                ? [
                    "<15>{#f/20}NÃO!\nISSO ESTÁ ERRADO!",
                    "<15>{#f/17}EU NÃO POSSO FALHAR EM NADA!!!",
                    "<15>{#f/20}HUMANO!!!\nEU TE AJUDAREI NESTES MOMENTOS DIFÍCEIS!!!",
                    "<15>{#f/24}EU CONTINUAREI SENDO SEU AMIGO...",
                    '<15>{#f/20}E NÓS PODEMOS ESQUECER QUE ISSO ACONTECEU.',
                    '<15>{#f/10}DEPOIS DE TUDO, VOCÊ, TAMBÉM É BEM INCRÍVEL.',
                    '<15>{#f/20}SERIA TRÁGICO PERDER SUA AMIZADE!',
                    '<15>{#f/21}ENTÃO, POR FAVOR...',
                    "<15>{#f/21}NÃO CHORE PORQUE NÃO POSSO TE DAR UM BEIJINHO.",
                    "<15>{#f/19}ALIÁS, EU NEM TENHO LÁBIOS!!!",
                    ...(SAVE.data.n.plot < 48
                        ? [
                            "<15>{#f/10}E EI, ALGUM DIA, VOCÊ VAI ENCONTRAR ALGUÉM MELHOR DO QUE EU.",
                            "<15>{#f/24}BEM, NÃO.\nISSO NÃO É VERDADE.",
                            "<15>{#f/20}MAS EU VOU TE AJUDAR A ENCONTRAR A SEGUNDA MELHOR PESSOA!"
                        ]
                        : ["<15>{#f/10}E EI, A UNDYNE NÃO ESTÁ TÃO LONGE DAQUI.", '<15>{#f/20}NÓS PODEMOS DAR UM ROLÊ COM ELA!'])
                ]
                : [
                    '<15>{#f/10}EU GOSTO DE VOCÊ TAMBÉM!',
                    '<15>{#f/10}VOCÊ É UMA PESSOA BEM LEGAL.',
                    '<15>{#f/21}MAS, TALVEZ...',
                    "<15>{#f/21}SERIA MELHOR SE VOCÊ VIVESSE POR CONTA PRÓPRIA.",
                    '<15>{#f/21}DO QUE POR MINHA CONTA.',
                    '<15>{#f/10}FELIZMENTE, EU SEI A SOLUÇÃO!!!',
                    '<15>{#f/20}UM ROLÊ COM A MINHA CHEFE, UNDYNE!!!',
                    '<15>{#f/24}ACHO QUE SE VOCÊ ESPALHAR UM POUCO MAIS A SUA ENERGIA...',
                    "<15>{#f/10}VOCÊ TERÁ UM ESTILO DE VIDA BEM MAIS SAUDÁVEL.",
                    ...(SAVE.data.n.plot < 48
                        ? ["<15>{#f/20}EU VOU TE CONTAR QUANDO ESTIVER PRONTO!"]
                        : ["<15>{#f/20}ENTÃO FAREMOS ISSO!\nJUNTOS!!"])
                ]),
            '<15>{#f/20}NYEH HEH HEH HEH HEH!!!'
        ],
        papdate40: () => [
            '<15>{#f/24}OH, E SE VOCÊ PRECISAR DE MIM...',
            "<15>{#f/10}AQUI ESTÁ MEU {@fill=#f00}NÚMERO DE TELEFONE{@fill=#000}.",
            '<15>{#f/11}SINTA-SE LIVRE PARA ME LIGAR QUANDO QUISER!',
            ...(SAVE.data.b.flirt_papyrus
                ? [
                    '<15>{#f/24}PLATONICAMENTE, CLARO.',
                    ...(SAVE.data.n.plot < 48
                        ? ['<15>{#f/10}BEM, HORA DE IR!']
                        : ["<15>{#f/10}BEM, TE VEJO NA CASA DA UNDYNE!"])
                ]
                : SAVE.data.n.plot < 48
                    ? ['<15>{#f/20}BEM, HORA DE IR!']
                    : ["<15>{#f/20}BEM, TE VEJO NA CASA DA UNDYNE!"]),
            '<15>{#f/20}NYEH HEH HEH!'
        ],
        papdate41: {
            a: () => (SAVE.data.b.flirt_papyrus ? 'ROMANCE' : 'AMIZADE'),
            b: 'NÍVEL DE\nPODER',
            c: 'DATA: K-615.09',
            d: 'VELOCIDADE',
            e: 'MAPA\nGALÁXIA',
            f: 'TENSÃO'
        },
        pappuzzle1: [
            '<18>{#p/papyrus}{#f/0}HUMANO!',
            '<18>{#f/0}ESTE PRÓXIMO QUEBRA CABEÇA É UM DOS MEU FAVORITOS.',
            "<18>{#f/4}É COMO A COLEÇÃO DE ALGODÃO DO MEU IRMÃO...",
            '<18>{#f/0}UMA SÉRIE DE OBJETOS SATISFATÓRIA!',
            "<18>{#f/9}EU VOU -TENTAR- NÃO DAR A SOLUÇÃO."
        ],
        pappuzzle1a: ['<18>{#p/papyrus}{#f/0}FAÇA ISSO!'],
        pappuzzle1b: [
            '<18>{#p/papyrus}{#f/4}PARECE QUE ESTE QUEBRA-CABEÇA FOI RESOLVIDO.',
            '<18>{#p/papyrus}{#f/4}PELAS MINHAS COSTAS.',
            '<18>{#p/papyrus}{#f/4}SEM MINHA PERMISSÃO.',
            "<18>{#p/papyrus}{#f/0}OLHA, ALGUÉM VAI TER UM DIA BEM RUIM HOJE.",
            '<18>{#p/papyrus}{#f/5}...',
            '<18>{#p/papyrus}{#f/5}COM SORTE, O PRÓXIMO QUEBRA-CABEÇA TERÁ COMO RESOLVER.',
            "<18>{#p/papyrus}{#f/6}... TE VEJO NA PROXIMA SALA."
        ],
        pappuzzle2: ['<18>{#p/papyrus}WOW!\nVOCÊ RESOLVEU!!'],
        pappuzzle2a: ['<18>E VOCÊ FEZ TUDO ISSO SEM MINHA AJUDA!'],
        pappuzzle2b: ["<18>E EU NEM PRECISEI TE AJUDAR TANTO!"],
        pappuzzle2c: ['<18>PRECISOU DE UM POUCO DE ENCORAJAMENTO, MAS VOCÊ CONSEGUIU!'],
        pappuzzle2d: [
            '<18>VOCÊ DEVE GOSTAR DE QUEBRA-CABEÇAS ASSIM COMO EU!',
            "<18>BEM, CERTEZA QUE VOCÊ VAI GOSTAR DO PRÓXIMO, ENTÃO!",
            '<18>TALVEZ ATÉ SEJA FÁCIL PARA VOCÊ!!',
            '<18>NYEH!\nHEH HEH!\nHEHEHEH!!!'
        ],
        papsink0: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (O resíduo de cachorro nesta pia parece estar disposto na forma de um coração.)',
                    '<32>* (De alguma forma, isso parece deixá-lo à vontade.)'
                ]
                : SAVE.data.n.plot < 72
                    ? ["<32>{#p/basic}* A pia é tão alta, não dá nem pra lavar as mãos..."]
                    : ["<32>{#p/basic}* Tem uma pilha de resíduos de cachorro na pia."],
        papsink1: [
            '<18>{#p/papyrus}{#f/9}IMPRESSIONADO?\nEU AUMENTEI O TAMANHO DA PIA.',
            '<18>{#f/0}AGORA EU POSSO COLOCAR MAIS OSSOS EM BAIXO DELA!'
        ],
        papsink2: ['<18>{#p/papyrus}{#f/8}NÃOO, O CACHORRO!'],
        papsink3: ['<18>{#p/papyrus}{#f/31}OH, POBRE, POBRE, CACHORRINHO...', '<18>{#f/9}AQUI, TENHA MEU ATAQUE ESPECIAL!'],
        papsink4: ['<18>{#p/papyrus}WOW!!!\nELE AMOU!!!'],
        papsink5: ['<18>{#p/papyrus}{#f/7}SANS!', '<18>PARE DE FAZER TRILHA SONORA DA MINHA VIDA!!'],
        papsink6: ['<18>{#p/papyrus}{#f/4}E AGORA O CACHORRO SUMIU COM MEU ATAQUE.', '<18>POIS BEM...'],
        papsolu1: [
            '<18>{#p/papyrus}PARECE QUE VOCÊ PRECISA DE UMA DICA.',
            '<18>{#f/4}HMM...',
            "<18>{#f/0}BEM, EU PRESTARIA ATENÇÃO AO CIRCUITO.",
            "<18>{#f/0}MAS SOU SÓ EU."
        ],
        papsolu2: [
            '<18>{#p/papyrus}{#f/5}AINDA CONFUSO?',
            '<18>{#f/5}HMM... TALVEZ...',
            '<18>{#f/6}USE OS CIRCUITOS COMO UM GUIA PARA A SEQUÊNCIA???',
            "<18>{#f/5}EU ESTOU TENTANDO MUITO NÃO TE DIZER A SOLUÇÃO..."
        ],
        papsolu3: [
            '<18>{#p/papyrus}{#f/6}AINDA???',
            '<18>{#f/0}QUER DIZER, EU PODERIA TE DAR A SOLUÇÃO.',
            "<18>{#f/4}MAS, EU NÃO QUERO ACABAR COM A DIVERSÃO..."
        ],
        papsolu3a: () => [
            '<18>{#p/papyrus}{#f/9}VOCÊ ABSOLUTAMENTE, DAPSOLUTAMENTE QUER A SOLUÇÃO?',
            choicer.create('* (O que você diz?)', 'Sim', 'Não')
        ],
        papsolu3a1: () => [
            '<18>{#p/papyrus}A! SOLUÇÃO! É!',
            '<18>{#f/4}(POR FAVOR, IMAGINE UM RUFAR DE TAMBORES EM SUA CABEÇA...)',
            SAVE.data.b.s_state_pretrick
                ? '<18>{#f/0}... AQUELE TERMINAL NA PARTE ESQUERDA DA SALA!'
                : '<18>{#f/0}... AQUELA ÁRVORE PRÓXIMA A UMA LÂMPADA NA DIREITA!',
            '<18>DA UMA OLHADA NELA!!!'
        ],
        papsolu3a2: [
            "<18>{#p/papyrus}WOW... VOCÊ DEVE AMAR QUEBRAS-CABEÇAS!",
            "<18>EU ESTOU FELIZ PELO SEU ENTUSIASMO!",
            '<18>VOCÊ CONSEGUE, HUMANO!!!'
        ],
        papsolu4: ["<18>{#p/papyrus}{#f/4}NÃO LEMBRA DA SOLUÇÃO QUE EU TE DEI?"],
        papsolu5: ['<18>{#f/0}{#p/papyrus}QUASE LÁ!\nSÓ MAIS UM CIRCUITO PARA ATIVAR!'],
        papspaghet1: (take: boolean) => [
            '<18>{#p/papyrus}{#f/1}O QUE!? COMO VOCÊ ESCAPOU DA MINHA ARMADILHA?',
            '<18>{#f/4}E, MAIS IMPORTANTE...',
            '<18>{#f/0}SOBROU PARA MIM?',
            choicer.create('* (O que você dirá para Papyrus sobre seu espaguete?)', take ? 'Peguei tudo' : 'Deixei', 'Comi tudo'),
            '<18>{#p/papyrus}SÉRIO!?'
        ],
        papspaghet1a: () => [
            '<18>{#p/papyrus}{#f/1}O QUE!? COMO VOCÊ ESCAPOU DA MINHA ARMADILHA?',
            '<18>{#f/4}E, MAIS IMPORTANTE...',
            '<18>{#f/0}AINDA TEM SOBRANDO PARA...',
            '<18>{#f/4}... ESPERA.',
            "<18>{#f/0}ESTÁ BEM AÍ NOS SEUS ITENS!!",
            '<18>{#f/9}O QUE VOCÊ ESTÁ PLANEJANDO, HUMANO?',
            choicer.create("* (O que você fará com o espaguete de Papyrus?)", 'Compartilhar', 'Comer'),
            '<18>{#p/papyrus}SÉRIO!?'
        ],
        papspaghet2a: [
            "<18>{#f/5}VOCÊ RESISTIU AO SABOR DA MINHA MASSA CASEIRA...",
            '<18>{#f/6}SÓ PARA DIVIDIR COMIGO???',
            '<18>{#f/9}POIS BEM!!',
            '<18>NÃO TEMAS HUMANO!\nPOIS EU, MESTRE CHEFE PAPYRUS...',
            '<18>TE FAREI TODO O ESPAGUETE QUE VOCÊ QUISER!',
            '<18>{#f/0}HEH HEH HEH HEH HEH HEH NYEH!'
        ],
        papspaghet2b: [
            '<18>{#f/5}WOWIE...',
            '<19>{#f/6}POUCOS APRECIARAM MINHA CULINÁRIA DESSA FORMA...',
            '<18>{#f/9}POIS BEM!!',
            '<18>NÃO TEMAS HUMANO!\nPOIS EU, MESTRE CHEFE PAPYRUS...',
            '<18>FAREI TODO O ESPAGUETE QUE VOCÊ QUISER!',
            '<18>{#f/0}HEH HEH HEH HEH HEH HEH NYEH!'
        ],
        paptv: pager.create(
            0,
            () => [
                ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                    ? ["<18>{#p/papyrus}OOH, É MEU SHOW DE TV FAVORITO!"]
                    : []),
                ...(SAVE.data.n.plot < 67.1
                    ? ['<33>{#p/mettaton}* \"FIQUE LIGADO PARA UM NOVO PROGRAMA!\"']
                    : SAVE.data.b.killed_mettaton
                        ? ['<33>{#p/mettaton}* \"NETWORK INALCANÇÁVEL!\"']
                        : world.bad_robot
                            ? ['<33>{#p/mettaton}* \"DESCULPE, PESSOAL!\"\n* \"O PROGRAMA FOI CANCELADO!\"']
                            : ['<32>{#p/mettaton}* \"ESPERO QUE TENHAM GOSTADO DO SHOW!\"']),
                ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                    ? [
                        "<18>{#p/papyrus}{#f/7}O QUE!!!\nNORMALMENTE É MELHOR QUE ISSO!",
                        '<18>{#f/4}ESSE É SÓ UM EPISÓDIO RUIM.',
                        "<18>{#f/7}NÃO ME JULGUE!!!"
                    ]
                    : [])
            ],
            ['<33>{#p/mettaton}* \"FIQUE LIGADO PARA UM NOVO PROGRAMA!\"']
        ),
        papyrus1: ['<18>{#p/papyrus}ENTÃO, COMO EU DIZENDO SOBRE A UNDYNE...'],
        papyrus2: [
            '<18>{#p/papyrus}SANS!!\nOH MEU DEUS!!\nISSO É...',
            '<18>UM HUMANO!?!?',
            "<25>{#p/sans}{#f/2}* nah, é só um holograma no formato de humano."
        ],
        papyrus3: [
            '<18>{#p/papyrus}{#f/4}OH.',
            '<18>{#f/4}...',
            '<18>{#f/4}ESPERA...',
            "<18>{#f/7}VOCÊ TÁ MENTINDO!!",
            '<25>{#p/sans}{#f/2}* desculpa, quiz dizer humano no formato de holograma.',
            '<18>{#p/papyrus}{#f/0}... SANS, NÓS FINALMENTE CONSEGUIMOS!',
            '<18>{#f/9}UNDYNE -TEM- QUE ME DEIXAR ENTRAR NA GUARDA REAL!!!',
            '<18>{#f/6}NÓS SÓ TEMOS QUE...',
            '<18>{#f/5}QUE...',
            '<18>{#f/4}...',
            "<18>{#f/4}EU ESTOU ESQUECENDO ALGO.",
            '<25>{#p/sans}{#f/2}* A fala, lembra?',
            '<18>{#p/papyrus}{#f/4}OH, CERTO. \n...\"AHEM.\"',
            "<18>{#f/9}HUMANO! VOCÊ PODE PENSAR QUE ESTÁ SEGURO AGORA...",
            '<18>{#f/9}MAS EU, O GRANDE PAPYRUS, IREI MUDAR ISSO!',
            "<18>{#f/4}PRIMEIRO, VERÁ OS QUEBRA-CABEÇAS DA DR. ALPHYS...",
            '<18>{#f/4}E ENTÃO, QUANDO VOCÊ MENOS ESPERAR...',
            '<19>{#f/9}WHAM! CAPTURADO!\nDIRETO PARA A CIDADELA!',
            '<18>{#f/9}NOSSA BATALHA SERÁ TÃO LENDÁRIA QUANTO VOCÊ PENSA!',
            '<18>{#f/4}EM TODO CASO...',
            '<18>{#f/9}CONTINUE EM FRENTE... SE TIVER CORAGEM!!!'
        ],
        papyrus4: ['<18>{#f/0}NYEH HEH HEH HEH HEH HEH HEH HEH!!!'],
        papyrus5: [
            '<25>{#p/sans}* bem, isso foi tranquilo.',
            "<25>* não se preocupa, colega.",
            "<25>{#f/2}* eu vou manter um olho aberto por você."
        ],
        papyrus6x1: ['<18>{#p/papyrus}{#f/5}H-HUMANO?\nÉ VOCÊ...?'],
        papyrus6x2: [
            "<18>{#p/papyrus}{#f/1}OH MEU DEUS!!!\nÉ REALMENTE VOCÊ, NÃO É!?!?",
            "<18>{#p/papyrus}{#f/0}ESTAVA ANSIOSO PARA TE VER AO SABER DE TI!",
            "<18>{#p/papyrus}{#f/4}... POR QUE EU SÓ APARECI AGORA?",
            '<18>{#p/papyrus}{#f/6}BEM, EU TENHO RAZÃO PARA ACREDITAR...',
            '<18>{#p/papyrus}{#f/5}QUE MEU IRMÃO TEM TENTANDO TE MANTER LONGE DE MIM.',
            '<18>{#p/papyrus}{#f/7}TÍPICO!!!',
            '<18>{#p/papyrus}{#f/0}MAS NOSSA ALIANÇA PODE SER NOSSO PEQUENO SEGREDO!',
            "<18>{#p/papyrus}{#f/9}ELE NÃO PRECISA SABER -NADICA- SOBRE ISSO!"
        ],
        papyrus6x3: [
            "<18>{#p/papyrus}{#f/5}EU VOU INDO ANTES QUE ELE DESCUBRA QUE ESTOU AQUI.",
            "<18>{|}{#p/papyrus}{#f/9}EU TE ENCONTRO MAIS TARDE, HU- {%}"
        ],
        papyrus6x4: ['<32>{#p/without}* ... papyrus?'],
        papyrus6: () => [
            '<18>{#p/papyrus}{#f/9}HUMANO!!',
            world.nootflags.has('s_puzzle2') // NO-TRANSLATE

                ? '<18>{#f/4}PODE TER SIDO FÁCIL PARA VOCÊ ANTES.'
                : '<18>{#f/4}VOCÊ PODE TER PASSADO MEUS ÚLTIMOS DESAFIOS.',
            "<18>{#f/9}MAS AGORA VOCÊ ENCONTRARÁ UM OBSTÁCULO!",
            '<18>POIS VEJA, ESTE AQUI FOI FEITO POR NINGUÉM MENOS...',
            '<18>{#f/0}QUE A INCRÍVEL DR. ALPHYS!',
            '<18>AS REGRAS SÃO BEM SIMPLES, DE VERDADE.',
            '<18>ESTÁ TELA VAI LER UM NÚMERO ALEATÓRIO.',
            '<18>{#f/9}... O NÚMERO DE SEGUNDOS ATÉ VOCÊ PODER PASSAR!',
            '<18>{#f/0}SE O NÚMERO FOR ÍMPAR, DESVIARÁ DE PROJÉTEIS.',
            '<18> NÚMEROS QUE TERMINAM EM 1 DÃO FORMA DE ESTRELA...',
            '< 18> NÚMEROS QUE TERMINAM EM 3 EM FORMA DE LUA...',
            '<18>{#f/4}5 DÁ COMETAS, 7 DÁ QUASARES...',
            "<18>{#f/9}E SE TERMINAR COM 9, É ALEATÓRIO!",
            '<18>{#f/0}SE O NÚMERO É PRIMO A GRAVIDADE VAI TROCAR.',
            "<18>{#f/4}(ABAIXO DE DEZ É IMPROVÁVEL ACONTECER.)",
            '<18>{#f/0}SE O NÚMERO FOR PAR, VOCÊ FICARÁ BEM NO INÍCIO...',
            '<18>{#f/9}MAS VOCÊ ENCONTRARÁ MONSTROS!',
            '<18>E POTÊNCIAS DE DOIS DOBRARÃO A FREQUÊNCIA!!',
            '<18>{#f/0}SE O NÚMERO REPETIR DIGITOS DUAS VEZES...',
            '<18>{#f/0}O TEMPO DE ESPERA SERÁ MULTIPLICADO POR TAL NÚMERO!',
            '<18>{#f/0}SE O NÚMERO FOR UMA CORRIDA, OU SEJA, 1-2-3...',
            '<18>{#f/0}A SALA VAI BALANÇAR, TE FAZENDO TREMER!',
            '<18>{#f/0}E SE O NÚMERO TIVER UM 4 DE QUALQUER FORMA...',
            '<18>{#f/9}SANS VAI TE LEVITAR COM MAGIA AZUL!',
            "<25>{#p/sans}{#f/6}* Da uma olhada, é meu olho amarelo especial.",
            '<18>{#p/papyrus}{#f/7}AGORA NÃO, SANS!!',
            '<25>{#p/sans}* oh, heheh. acho que fui meio {@fill=#ff0}carregado pelo momento{@fill=#fff}, hein?',
            '<18>{#p/papyrus}{#f/4}CLARO, CLARO...',
            '<18>{#f/9}BEM!\nVOCÊ ENTENDEU A EXPLICAÇÃO?',
            choicer.create('* (O que você diz?)', 'Sim', 'Não')
        ],
        papyrus7: () => [
            "<18>{#p/papyrus}{#f/9}BOM, VAMOS REVISAR!",
            '<18>{#f/0}ESTA TELA GERA UM NÚMERO ALEATÓRIO DE SEGUNDOS.',
            '<18>O QUÃO VOCÊ VAI PRECISAR ESPERAR PARA PASSAR.',
            '<18>NÚMEROS ÍMPARES SIGNIFICAM PROJÉTEIS.',
            "<18>O ÚLTIMO DIGITO DETERMINA O TIPO.",
            '<18>1 PARA ESTRELAS, 4 PARA LUAS, 5 QUASARES, 7...',
            '<18>{#f/5}ESPERA, QUE NÚMEROS ERAM OS QUASARES MESMO?',
            '<18>{#f/9}UH, OLHA, SE TERMINAR COM 9 O TIPO É ALEATÓRIO.',
            '<18>{#f/0}NÚMEROS PRIMOS INVERTEM A GRAVIDADE.',
            '<18>{#f/0}NÚMEROS PARES TRAZEM ENCONTROS ALEATÓRIOS...',
            '<18>{#f/5}ESPERA, EU DISSE QUE A GRAVIDADE INVERTE?',
            '<18>{#f/7}UGH, É, FOI ISSO MESMO!!',
            '<18>{#f/0}MAS POTÊNCIAS DE DOIS DOBRAM A TAXA DE ENCONTRO.',
            '<18>SEQUÊNCIAS FAZEM A SALA TREMER, E 4 SIGNIFICA...',
            '<18>{#f/6}UH, EU ACHO QUE ESQUECI O QUE 4 SIGNIFICA.',
            "<25>{#p/sans}* não era para essa ser a minha deixa?",
            '<18>{#p/papyrus}{#f/6}TALVEZ???',
            '<18>{#f/7}TANTO FAZ!!\nVOCÊ ENTENDEU AGORA!?',
            choicer.create('* (O que você diz?)', 'Claro', 'Menos ainda')
        ],
        papyrus8: [
            '<18>{#p/papyrus}{#f/9}BEM... ENTÃO...',
            "<18>{#f/9}SABE DE UMA COISA? VOU DEIXAR AS INSTRUÇÕES AQUI.",
            '<18>{#f/0}ENTÃO, VOCÊ PODERÁ LER ELAS NO SEU PRÓPRIO RITMO.',
            '<18>BOA SORTE, HUMANO!!',
            '<18>{#f/5}NYEH... HEH HEH...'
        ],
        papyrus9: [
            '<18>{#p/papyrus}{#f/9}PERFEITO BEM FEITO!',
            '<18>{#f/9}BEM, SEM MAIS ENROLAÇÃO...',
            "<18>VAMOS ENCONTRAR QUE TIPO DE NÚMERO ALEATÓRIO SERÁ!"
        ],
        papyrus10: [
            '<18>{#p/papyrus}{#f/9}HUMANO!',
            '<18>{#f/9}VOCÊ ESTÁ PRONTO PARA SEU MAIOR DESAFIO?',
            '<18>{#f/9}APRESENTANDO... O DESAFIO DO TERROR MORTAL!'
        ],
        papyrus11: [
            '<18>{#p/papyrus}{#f/9}ASSIM QUE EU DER A ORDEM VAI ATIVAR COMPLETAMENTE!',
            '<18>LASERS VÃO DISPARAR! EXPLOSÕES ACONTECERÃO!',
            '<18>TUDO DE MANEIRA TÁTICA E PRECISA!',
            '<18>{#f/4}SEM PERFEITA AGILIDADE, IRÁ FALHAR.',
            '<18>{#f/9}VOCÊ ESTÁ PRONTO!?!?',
            '<18>PORQUE!',
            '<18>EU!',
            '<18>VOU!',
            '<18>ATIVAR!',
            '<18>AGORA MESMO!'
        ],
        papyrus12: [
            '<25>{#p/sans}* e aí?\n* vamos ativar ou o que?',
            '<18>{#p/papyrus}{#f/7}...',
            "<25>{#p/sans}{#f/3}* aquele cachorro vai começar a ficar irritado.",
            '<18>{#p/papyrus}{#f/7}QUALQUER MOMENTO AGORA!'
        ],
        papyrus13: [
            '<25>{#p/sans}* pronto quando você estiver.',
            '<18>{#p/papyrus}{#f/6}EU...',
            "<18>{#f/6}EU ESTOU COMEÇANDO A PENSAR...",
            '<18>{#f/6}QUE TALVEZ...',
            '<18>{#f/6}ESSE DESAFIO...',
            '<18>{#f/6}...',
            '<18>{#f/4}... FOI UMA MÁ IDEIA.',
            '<18>{#f/5}E PENSAR QUE EU CRIEI UM DESAFIO TÃO PERIGOSO.',
            '<18>{#f/9}MAS, NÃO TEMAS!',
            '<18>{#f/9}EU SOU UM ESQUELETO COM MODOS!',
            '<18>{#f/4}E, FRANCAMENTE, UM DESAFIO QUE NÃO HÁ COMO SOBREVIVER...',
            '<18>{#f/7}É UM DESAFIO MUITO ABAIXO DA JUSTIÇA!',
            '<18>LÁ VAI ELE!!'
        ],
        papyrus14: [
            '<18>{#p/papyrus}{#f/7}O QUE VOCÊ TÁ OLHANDO!?',
            '<18>{#f/9}ESSA FOI OUTRA VITORIA DECISIVA DO PAPYRUS!!',
            '<18>NYEH!',
            '<18>HEH!',
            '<18>{#f/4}...',
            '<18>... HEH?'
        ],
        papyrusFinal1: [
            '<23>{#p/papyrus}{#f/30}HUMANO.',
            '<23>PERMITA-ME CONTAR SOBRE SENTIMENTOS COMPLEXOS.',
            '<23>SENTIMENTOS COMO...'
        ],
        papyrusFinal2: () =>
            world.genocide
                ? [
                    '<23>A TRISTEZA DE PERDER ALGUÉM ESPECIAL.',
                    '<23>A CULPA DE NÃO PODER SALVA-LO.',
                    '<23>A VONTADE DE VÊ-LO UMA ULTIMA VEZ.',
                    '<23>ESSES SENTIMENTOS...'
                ]
                : papreal()
                    ? [
                        '<23>A TRISTEZA DE SABER QUE TANTAS PESSOAS FORAM MORTAS.',
                        "<23>A DESESPERANÇA POR PENSAR QUE EU NÃO PODERIA IMPEDIR.",
                        '<23>A VONTADE DE FAZER A DIFERENÇA PARA MELHOR.',
                        '<23>ESSES SENTIMENTOS...'
                    ]
                    : [
                        '<23>A FELICIDADE DE ENCONTRAR OUTRO AMANTE DE ESPAGUETE.',
                        "<23>A ADMIRAÇÃO POR OUTRO SOLUCIONADOR DE QUEBRA-CABEÇA.",
                        '<23>A APRECIAÇÃO DE TER UMA ALGUÉM SUPER DA HORA TE ACHANDO LEGAL.',
                        '<23>ESSES SENTIMENTOS...'
                    ],
        papyrusFinal3: () =>
            world.genocide || papreal()
                ? [
                    '<18>{#f/31}ESSES SENTIMENTOS DEVEM SER O QUE VOCÊ SENTE.',
                    '<18>{#f/32}EU MAU POSSO IMAGINAR COMO DEVE SER ISSO...',
                    '<18>{#f/6}ATÉ PORQUE, EU SOU MUITO... BOM...',
                    '<18>{#f/32}{#x1}...',
                    '<18>{#f/31}MESMO COM TUDO QUE ACONTECEU, EU AINDA...',
                    '<18>{#f/5}EU AINDA ACREDITO EM VOCÊ, HUMANO.',
                    '<18>{#f/31}EU SEI QUE VOCÊ PODE FAZER MELHOR.',
                    '<18>{#f/31}EU SEI QUE VOCÊ PODE MUDAR.',
                    ...(world.genocide
                        ? ["<18>{#f/4}NÃO IMPORTA AS COISAS QUE ESSE 'ASRIEL' DISSER..."]
                        : ['<18>{#f/5}NÃO IMPORTA O QUÃO IRREVERSÍVEL VOCÊ PENSA SER...']),
                    "<18>{#f/6}{#x2}EU SEI, QUE LÁ NO FUNDO, AINDA A BOM EM VOCÊ!",
                    '<18>{#f/0}ENTÃO DEIXE-ME TE AJUDAR A ENCONTRAR ESTA FELICIDADE.',
                    '<18>{#f/0}TE AJUDAREI A DESCOBRIR SEU POTENCIAL.',
                    '<18>{#f/4}E ACIMA DE TUDO...',
                    '<18>{#f/9}TE MOSTRAREI QUE VOCÊ AINDA PODE SER GRANDE!!!',
                    '<18>{#f/0}EU, PAPYRUS, TE RECEBO DE BRAÇOS ABERTOS!'
                ]
                : [
                    '<18>{#f/0}ELES DEVEM SER O QUE VOCÊ ESTÁ SENTINDO AGORA!',
                    '<18>{#f/4}EU MAU POSSO IMAGINAR COMO ISSO É.',
                    '<18>{#f/4}ATÉ PORQUE, EU SOU MUITO BOM.',
                    '<18>EU NUNCA ME PERGUNTEI COMO É TER MUITOS AMIGOS.',
                    '<18>{#f/5}TENHO PENA DE VOCÊ, HUMANO SOLITÁRIO...',
                    '<18>{#f/0}MAS NÃO SE PREOCUPE, VOCÊ NÃO FICARÁ SOZINHO!',
                    '<18>{#f/9}POIS EU, O GRANDE PAPYRUS, SEREI SEU...',
                    '<18>{#f/5}{#x1}...',
                    '<18>NÃO...',
                    '<18>{#f/7}{#x2}NÃO, ISSO ESTÁ ERRADO!',
                    '<18>EU NÃO POSSO SER SEU \"AMIGO...\"',
                    '<18>VOCÊ É UM HUMANO!\nEU DEVO TE CAPTURAR!!!',
                    '<18>{#f/9}ENTÃO, EU PODEREI REALIZAR MEU SONHO DE VIDA!',
                    '<18>PODEROSO!\nPOPULAR!\nPRESTIGIOSO!!!',
                    "<18>ESTE É PAPYRUS!!",
                    '<18>{#f/4}O MAIS NOVO MEMBRO...',
                    '<18>{#f/9}DA GUARDA REAL!!!'
                ],
        papyrusFinal4: (b: boolean) =>
            world.edgy || world.killed0
                ? [
                    '<18>{#p/papyrus}{#f/0}WOWIE!\nVOCÊ CONSEGUIU!',
                    "<18>{#p/papyrus}{#f/5}VOCÊ NÃO FEZ UMA VIOLÊNCIA!",
                    '<18>{#p/papyrus}{#f/6}PARA SER SINCERO, EU ESTAVA COM MEDO...',
                    "<18>{#p/papyrus}{#f/0}MAS VOCÊ JÁ ESTÁ TOMANDO PASSOS PARA SE REDIMIR!",
                    "<18>{#p/papyrus}{#f/8}EU ESTOU MUITO ORGULHOSO DE VOCÊ, HUMANO!",
                    "<18>{#p/papyrus}{#f/4}... ESPERA, NÃO ERA PRA EU TE CAPTURAR?",
                    "<18>{#p/papyrus}{#f/0}OH.\nISSO NÃO IMPORTA AGORA.",
                    '<18>{#p/papyrus}{#f/0}EU SÓ QUERO O MELHOR PARA VOCÊ COMO PESSOA.',
                    "<18>{#p/papyrus}{#f/5}VAMOS DEIXAR OS OSSOS SEREM OS OSSOS, HEIN?",
                    "<18>{#p/papyrus}{#f/9}EU VOU ATÉ TE DAR DIREÇÕES ATÉ A SAÍDA!"
                ]
                : [
                    '<18>{#p/papyrus}{#f/5}NYOO HOO HOO...',
                    ...(b
                        ? ["<18>EU NÃO FUI FORTE O SUFICIENTE PARA TE IMPEDIR..."]
                        : ["<18>EU NEM POSSO PARAR ALGUÉM TÃO FRACO COMO VOCÊ..."]),
                    "<18>{#f/7}UNDYNE VAI FICAR DESAPONTADA!",
                    "<18>{#f/5}EU NUNCA VOU ME JUNTAR A GUARDA REAL... E...",
                    '<18>{#f/7}MINHA QUANTIDADE DE AMIGOS FICARÁ ESTAGNADA!',
                    choicer.create('* (Como você irá responder?)', "Vamos ser\nAmigos", 'Que\nPerdedor')
                ],
        papyrusFinal4a1: (b: boolean) =>
            b
                ? [
                    '<18>{#p/papyrus}{#f/5}V-VOCÊ TEM CERTEZA?\nVOCÊ QUER SER MEU AMIGO?',
                    '<18>{#f/6}MESMO APÓS ISSO?',
                    "<18>{#f/0}BEM, TUDO BEM!!\nVAMOS SER AMIGOS!"
                ]
                : [
                    '<18>{#p/papiro}{#f/1}SÉRIO!?\nVOCÊ QUER SER MEU AMIGO???',
                    '<18>{#f/6}POIS BEM...\nEU ACHO...',
                    '<18>{#f/0}EU POSSO FAZER UMA EXCESSÃO PARA VOCÊ!'
                ],
        papyrusFinal4a2: (b: boolean) =>
            b
                ? [
                    '<18>{#p/papiro}{#f/5}HUH? VOCÊ ESTÁ... TENTANDO ME REPREENDER??',
                    "<18>{#f/6}VOCÊ ACHA QUE EU NÃO SOU FORTE O SUFICIENTE PARA SER SEU AMIGO?",
                    '<18>{#f/5}... N-NÃO...',
                    '<18>{#f/7}NÃO, O QUE ESTOU DIZENDO!!\nÉ CLARO QUE EU SOU!!',
                    "<18>{#f/9}E... VOU PROVAR ISSO SENDO SEU AMIGO DE QUALQUER MANEIRA!"
                ]
                : [
                    '<18>{#p/papiro}{#f/1}HUH? POR QUE VOCÊ SE REPREENDERIA TÃO ALTO???',
                    '<18>{#f/4}ISSO É POR QUE...',
                    "<18>{#f/7}VOCÊ PENSA QUE EU NÃO SOU BOM O SUFICIENTE PARA SER SEU AMIGO?",
                    "<18>{#f/9}NÃO, VOCÊ É DEMAIS!\nEU SEREI SEU AMIGO!!!"
                ],
        papyrusFinal4b1: [
            '<18>{#f/0}WOWIE!!',
            '<18>EU CONSEGUI UM NOVO AMIGO!!!',
            '<18>{#f/4}E QUEM IMAGINARIA QUE TUDO QUE EU PRECISAVA FAZER É...'
        ],
        papyrusFinal4b2: [
            '<18>{#f/0}WOWIE!!',
            "<18>{#f/0}NÓS AINDA NEM TIVEMOS NOSSO PRIMEIRO ENCONTRO...",
            "<18>{#f/0}E EU JÁ ENCONTREI A TAL FRIENDZONE!!!",
            '<18>{#f/4}QUEM IMAGINARIA QUE TUDO QUE EU PRECISAVA FAZER É...'
        ],
        papyrusFinal4c1: [
            '<18>{#f/0}DAR QUEBRA-CABEÇAS PARA AS PESSOAS E DEPOIS LUTAR COM ELAS?',
            '<18>VOCÊ ME ENSINOU MUITO, HUMANO.',
            '<18>{#f/9}EU TE DOU A PERMISSÃO PARA PASSAR POR MIM!',
            "<18>{#f/0}E EU TE DAREI DIREÇÕES PARA A SAÍDA."
        ],
        papyrusFinal4c2: [
            '<18>CONTINUE ANDANDO ATÉ CHEGAR NA CIDADELA.',
            '<18>ENTÃO, PULE EM UMA NAVE ESPACIAL PELO {@fill=#ff0}ESCUDO DE FORÇA{@fill=#fff}.',
            "<18>{#f/4}ESSA É A COISA QUE NOS MANTÉM PRESOS NO OUTPOST.",
            '<18>QUALQUER UM PODE ENTRAR, MAS NINGUÉM SAIR...',
            '<18>{#f/9}... EXCETO PESSOAS COM ALMAS MUITO PODEROSAS.',
            '<18>{#f/0}IGUAL VOCÊ!!!'
        ],
        papyrusFinal4d: [
            '<18>{#f/4}OH, E EU QUASE ESQUECI DE MENCIONAR.',
            '<18>PARA CHEGAR A SAÍDA, VOCÊ PRECISARÁ PASSAR...',
            '<18>{#f/7}PELO {@fill=#ff0}REI{@fill=#fff}.',
            '<18>{@fill=#ff0}O REI DE TODOS OS MONSTROS...',
            '<18>{@fill=#ff0}ELE É...',
            '<18>{@fill=#ff0}{#f/6}... BEM...'
        ],
        papyrusFinal4e: [
            "<18>{#f/0}ELE É UMA GRANDE BOLA DE PELOS!!!",
            '<18>TODO MUNDO AMA ELE.',
            '<18>{#f/4}EU TENHO CERTEZA QUE SE VOCÊ DISSER...',
            '<18>\"COM LICENÇA, SR. DREEMURR... POSSO IR PRA CASA?',
            "<18>{#f/0}ELE VAI TE GUIAR ATÉ A SAÍDA POR CONTA!",
            "<18>{#f/9}POIS BEM!!!\nJÁ CHEGA DE CONVERSA!!!",
            "<18>{#f/0}EU VOU ESTAR EM CASA SENDO UM AMIGO DA HORA."
        ],
        papyrusFinal4f1: ['<18>{#f/9}SINTA-SE LIVRE PARA IR LÁ DAR UM ROLÊ!!!'],
        papyrusFinal4f2: ['<18>{#f/9}SINTA-SE LIVRE PARA IR LÁ E FAZER UM ENCONTRO!!!'],
        papyrusFinal4f3: ['<18>{#f/9}SINTA-SE LIVRE PARA IR LÁ DAR UM OI!!!'],
        papyrusFinal4g: ['<18>NYEH HEH HEH HEH HEH HEH HEH!!!'],
        papyrusFinal5: [
            '<18>{#p/papyrus}{#f/5}OH, ONDE SERÁ QUE AQUELE HUMANO FOI...',
            '<18>{#f/4}...\nESPERA.',
            "<18>{#f/1}ESTÁ BEM NA MINHA FRENTE!",
            '<18>{#f/0}OLÁ! EU ESTAVA PREOCUPADO SOBRE VOCÊ SE PERDER!',
            "<18>UM ALÍVIO TE VER POR AQUI...",
            '<18>{#f/7}...\nESPERA UM POUCO!!!',
            "<18>NÃO ERA PRA VOCÊ ESCAPAR!!!!",
            '<18>VOLTA AQUI!!!'
        ],
        papyrusFinal6: [
            '<18>{#p/papyrus}{#f/4}MAIS UMA VEZ?',
            "<18>{#f/5}EU SUPONHO QUE SEJA MINHA CULPA...",
            '<18>EU JÁ TE DISSE ANTES QUE TE FARIA ESPAGUETE.',
            "<18>É NATURAL QUE VOCÊ QUEIRA ME VER COM TANTA ÂNSIA...",
            '<18>NA ESPERANÇA QUE EU TE FAÇA LOGO UM POUCO.',
            '<18>{#f/0}BEM... EU POSSO ENTENDER ISSO.',
            '<18>{#f/0}PAPYRUS TAMBÉM ESTÁ COM FOME!',
            '<18>{#f/7}FOME POR JUSTIÇA!'
        ],
        papyrusFinal7: () => [
            "<18>{#p/papyrus}{#f/1}VOCÊ VOLTOU DE NOVO!?!?",
            '<18>{#f/4}EU FINALMENTE ENTENDI O MOTIVO.',
            '<18>{#f/5}VOCÊ...',
            '<18>VOCÊ SÓ QUER MUITO ME VER...',
            '<18>{#f/6}EU...',
            "<18>{#f/31}EU NÃO SEI SE CONSIGO LUTAR COM ALGUÉM QUE SE SENTE ASSIM.",
            "<18>{#f/4}SEM MENCIONAR QUE ESTOU COMEÇANDO A ME CANSAR DE TE CAPTURAR.",
            '<18>{#f/5}VOCÊ GOSTARIA DE PODER PASSAR...',
            '<18>{#f/5}... SEM PRECISAR LUTAR COMIGO?',
            choicer.create('* (O que você diz?)', 'Sim', 'Não')
        ],
        papyrusFinal7a: ['<18>{#p/papyrus}{#f/31}...\nOKAY...', "<18>{#f/3}EU ACHO QUE VOU ACEITAR MINHA FALHA."],
        papyrusFinal7b: ['<18>{#p/papyrus}{#f/4}BEM, SE VOCÊ DESEJA DESSA FORMA, ENTÃO...', '<18>{#f/9}CONTRA TUDO E TODOS!!!'],
        papyrusFinal8: () => [
            '<18>{#p/papyrus}{#f/1}DE NOVO??',
            '<18>{#f/4}... BEM, OKAY...',
            '<18>{#f/9}VOCÊ ESQUECERÁ DESSA BATALHA DESTA VEZ??',
            choicer.create('* (O que você diz?)', 'Sim', 'Não')
        ],
        papyrusFinal8a: ['<18>{#p/papyrus}{#f/0}OKAY, LÁ VAMOS NÓS!'],
        puzzle3: () => [
            '<32>{#p/human}* (Você ativa o terminal.)',
            '<32>{#p/basic}* Há um registro de modificações anteriores...',
            world.edgy
                ? '<32>* \"Última modificação pelo usuário: ALPHYS\"'
                : '<32>* \"Última modificação pelo usuário: COOLSKELETON95\"',
            ...(!world.goatbro || SAVE.flag.n.genocide_milestone < 5 || SAVE.flag.n.ga_asrielAlphysCom1++ > 0
                ? []
                : ["<25>{#p/asriel2}{#f/13}* Ela estava na nossa cola esse tempo todo..."]),
            '<32>{#p/basic}* \"Você gostaria de ver o padrão?\"',
            choicer.create('* (Ver o padrão?)', 'Sim', 'Não')
        ],
        robotx: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (O robô parece estar dormindo.)']
                : ["<32>{#p/basic}* Está no modo soneca."],
        robot1: pager.create(
            0,
            () => [
                '<32>{#p/basic}* Olá.\n* Eu sou um robô construtor.',
                '<32>* Eu gostaria de ver a galáxia...\n* Mas não consigo me mover.',
                '<32>* Se você puder ser um bom aventureiro, por favor...',
                '<32>* Pegue um dos meus Chips e leve para um computador bem longe daqui.',
                choicer.create('* (Levar o chip?)', 'Sim', 'Não')
            ],
            () => [
                '<32>{#p/basic}* Se você puder ser um bom aventureiro, por favor...',
                '<32>* Pegue um dos meus Chips e leve para um computador bem longe daqui.',
                choicer.create('* (Levar o chip?)', 'Sim', 'Não')
            ]
        ),
        robot2: () => [
            '<32>{#p/basic}* Obrigado... boa sorte!',
            '<32>{#s/equip}{#p/human}* (Você pegou o Chip de CPU.)',
            ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
                ? [
                    "<25>{#p/asriel2}{#f/9}* Pfft, que adorável.",
                    "<25>{#p/asriel2}{#f/13}* Esse robô não faz ideia do que está acontecendo aqui."
                ]
                : [])
        ],
        robot3: ['<32>{#p/basic}* Parece que você não tem espaço o suficiente pra mim.'],
        robot4: () => [
            '<32>{#p/basic}* Eu entendo.\n* Boa jornada!',
            ...(world.goatbro && SAVE.flag.n.ga_asriel98++ < 1
                ? [
                    "<25>{#p/asriel2}{#f/9}* Pfft, que adorável.",
                    "<25>{#p/asriel2}{#f/13}* Esse robô não faz ideia do que está acontecendo aqui."
                ]
                : [])
        ],
        robot5: () => [
            '<32>{#p/basic}* Obrigado por cuidar de mim.',
            ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
                ? ["<25>{#p/asriel2}{#f/4}* Tá tudo bem, não precisamos de mais dele por agora."]
                : [])
        ],
        robot6: () => [
            '<32>{#p/basic}* Como vai eu?\n* Por \"eu\" quero dizer o chip que te dei...',
            '<32>* Huh? Você perdeu ele...?\n* ... acho que posso te dar outro então.',
            choicer.create('* (Pegar outro chip?)', 'Sim', 'Não')
        ],
        robot7: [
            '<32>{#p/basic}* Por favor tenha cuidado dessa vez.',
            '<32>{#p/human}{#s/equip}* (Você pegou o Chip de CPU.)'
        ],
        robot8: ['<32>{#p/basic}* Eu entendo.\n* Boa jornada, então...'],
        robot9: () => [
            '<32>{#p/basic}* Obrigado por... cuidar de mim...',
            ...(world.goatbro && SAVE.flag.n.ga_asriel99++ < 1
                ? ["<25>{#p/asriel2}{#f/4}* Tá tudo bem, não precisamos de mais dele por agora."]
                : [])
        ],
        robot10: [
            '<32>{#p/basic}* Como vai eu?',
            '<32>* Huh? De novo...?',
            "<32>* Me desculpa... se eu te der mais um pedaço de mim, não sobrará mais nada.",
            '<32>* Suponho que seja verdade.\n* Viajar além de nossos limites é apenas uma fantasia.',
            "<32>* Não é diferente para ninguém.",
            '<32>* Toda a vida monstro está fadada a morrer aqui...'
        ],
        robot11: ['<32>{#p/basic}* Por que eu me entreguei tão facilmente?'],
        robot12: ['<32>{#p/basic}* SUMA!'],
        sans1: [
            '<99>{#p/darksans}{#i/4}* {@spacing=2.25/0}humano.',
            "<99>* {@spacing=2.25/0}você não sabe como{@spacing=}\n  {@spacing=2.25/0}cumprimentar um novo\namigo?",
            '<99>* {@spacing=2.25/0}vire-se e aperte{@spacing=}\n  {@spacing=2.25/0}minha mão.'
        ],
        sans2: () => [
            ...(world.edgy
                ? [
                    "<25>{#p/sans}{#f/0}* huh?\n* que cara é essa?",
                    "<25>{#p/sans}{#f/2}* ... você não gostou da minha piada de pum?",
                    '<25>{#f/0}* ... eh.\n* cada um tem seu humor.'
                ]
                : ["<25>{#p/sans}{#f/4}* heheh... nada como uma boa piada de peido."]),
            "<25>{#f/0}* de toda forma, você é um humano, certo?",
            "<25>{#f/5}* isso é fantástico.",
            "<25>{#f/0}* eu sou sans.\n* sans o esqueleto.",
            '<25>{#f/3}* como um sentinela real, meu trabalho é capturar humanos.',
            "<25>{#f/4}* mas... sabe...",
            ...(world.edgy
                ? [
                    "<25>{#f/2}* eu não tô muito afim de trabalhar hoje.",
                    '<25>{#f/0}* já meu irmão, bem...',
                    "<25>{#f/5}* ele tá CHEIAÇO de energia.",
                    '<25>{#f/0}* eu precisei fazer de tudo para deixá-lo em casa.'
                ]
                : [
                    "<25>{#f/2}* eu tenho mais o que fazer.",
                    '<25>{#f/0}* já meu irmão, bem...',
                    '<25>{#f/5}* mesmo não sendo um sentinela, ele AGE bastante como um.',
                    "<25>{#f/0}* na verdade, acho que é ele bem ali."
                ]),
            '<25>* eu tenho uma ideia.\n* pula nesse vácuo, beleza?',
            '<26>{#f/4}* é, meu irmão deixou a gravidade baixa demais para pegar alguém.'
        ],
        sans3: () =>
            world.edgy
                ? [
                    '<25>{#p/sans}* bem, aqui estamos nós.',
                    "<25>{#f/3}* temo eu que não há muito mais o que dizer por agora...",
                    "<25>{#f/2}* mas talvez eu invente alguma coisa se você continuar andando.",
                    "<25>{#f/0}* por agora, eu vou só ficar por aqui."
                ]
                : ['<25>{#p/sans}* rápido, para o inversor de gravidade.'],
        sans4: ["<25>{#p/sans}* tudo em cima, mano?"],
        sans5: [
            '<18>{#p/papyrus}{#x2}{#f/7}VOCÊ SABE O QUE ESTÁ EM \"CIMA\", IRMÃO!',
            '<18>VOCÊ PRECISA CONSTRUIR QUEBRA-CABEÇAS!',
            "<18>EU TE DEI DICAS DE TRABALHO, MAS AINDA ASSIM...",
            '<18>VOCÊ FICA SENTADO POR AÍ SEM FAZER NADA.',
            "<18>ATÉ AGORA, É EXATAMENTE O QUE VOCÊ ESTÁ FAZENDO!",
            '<18>NADA!',
            "<25>{#p/sans}* eu tô testando esse inversor de gravidade.",
            "<25>* é bem legal.",
            '<25>{#f/4}* quer ver?',
            "<18>{#p/papyrus}{#x3}{#f/7}NÃO!! \nEU NÃO TENHO TEMPO PRA ISSO!!",
            '<18>{#x2}SE UM HUMANO PASSAR AQUI EU ESTAREI PRONTO!',
            '<18>EU DEVO SER AQUELE!\nEU SEREI AQUELE!',
            '<18>{#x1}{#f/9}EU FINALMENTE IREI CAPTURAR O HUMANO!',
            '<18>{#x4}{#f/0}ENTÃO EU, O GRANDE PAPYRUS...',
            '<18>TEREI TUDO AQUILO QUE MEREÇO!',
            '<18>RESPEITO...\nRECONHECIMENTO...',
            '<18>{#f/9}EU FINALMENTE IREI ME JUNTAR A GUARDA REAL!',
            '<25>{#p/sans}* hmm...',
            '<25>{#f/2}* talvez este negócio o ajude.',
            "<18>{#p/papyrus}{#x3}{#f/7}SANS, ISSO NÃO VAI FAZER NADA!\nSEU PREGUIÇOSO!",
            '<18>{#x1}{#f/5}SABE, VOCÊ É CAPAZ DE TANTO, MAS, AINDA ASSIM...',
            '<18>{#x2}{#f/7}VOCÊ PREFERE FICAR SENTADO O DIA INTEIRO!',
            "<18>{#x1}{#f/5}VOCÊ NÃO DESEJA TER... MAIS DA VIDA?",
            "<25>{#p/sans}* ei, pega leve.\n* eu tenho muitas coisas em mente.",
            "<25>{#f/4}* talvez você até possa dizer que eu...",
            '<25>{#f/2}* estou sonhando com as {@fill=#ff0}estrelas{@fill=#fff}?'
        ],
        sans6: [
            '<18>{#p/papyrus}{#x3}{#f/7}SANS!!',
            "<25>{#p/sans}{#f/5}* vamos lá.\n* você tá sorrindo.",
            '<18>{#p/papyrus}{#x2}{#f/7}EU ESTOU E ESTOU ODIANDO ISSO!',
            '<18>{#x1}{#f/4}(CHORINHO...)',
            '<18>{#f/5}POR QUE ALGUÉM TÃO GRANDE COMO EU...',
            '<18>TEM QUE FAZER TANTO PARA GANHAR RECONHECIMENTO??',
            '<25>{#p/sans}* heh.\n* talvez você tenha que focar mais, bem...',
            '<25>* na {@fill=#ff0}gravidade{@fill=#fff} da situação.'
        ],
        sans7: [
            '<18>{#p/papyrus}{#x2}{#f/7}UGH!!',
            '<18>{#x1}{#f/4}EU VOU VOLTAR PARA OS QUEBRA-CABEÇAS...',
            '<18>{#f/7}JÁ PARA SEU TRABALHO?',
            '<18>{#f/4}EU ESPERO QUE VOCÊ FAÇA UM TRABALHO...',
            '<18>{#f/9}MAIS {@fill=#ff0}\"ESTELAR\"{@fill=#fff} DAQUI PRA FRENTE!!!',
            '<18>{#f/0}NYEHEHEHEHEHE\nHEHEHEHEHEHEH!!'
        ],
        sans8: ['<18>{#p/papyrus}HEH!'],
        sans9: ['<25>{#p/sans}* ok, hora de te trazer de volta.'],
        sans10: [
            '<25>{#p/sans}{#f/0}* ei...\n* antes de você ir por aí por conta própria...',
            "<25>{#f/3}* você deve saber que a guarda real está te procurando.",
            "<25>{#f/0}* mas não se preocupe. \n* tudo que eles tem aqui são a unidade canina.",
            "<25>{#f/0}* você sendo um humano, deve ser o que os cachorros gostam, né?",
            "<25>{#f/2}* eles são quase tão engraçadinhos quanto o papyrus."
        ],
        sansbook0: ['<32>{#p/human}* (parece que esse livro de piadas não tem um fim claro.)'],
        sansbook1: ['<32>{#p/basic}* É um livro sobre geometria não euclidiana.\n* Propriedade de \"ALPHYS.\"'],
        sansbook2: () => [choicer.create('* (Dar uma olhada?)', 'Sim', 'Não')],
        sansbook3: ['<32>{#p/human}* (Você olha dentro do livro...)'],
        sansbook4: ['<32>{#p/basic}* Dentro do livro de geometria a um livro de piadas.'],
        sansbook5: ['<32>{#p/basic}* Dentro do livro de piadas a outro livro de geometria.'],
        sansbook6: ['<32>{#p/basic}* Dentro do livro de geometria a outro livro de piadas.'],
        sansbook7: ["<32>{#p/basic}* E outro livro de geometria."],
        sansbook8: ["<32>{#p/basic}* E outro livro de piadas."],
        sansbook9: ['<32>{#p/human}* (Você decide não olhar.)'],
        sansbook10: () => [
            "<32>{#p/basic}* É uma nota do Sans.",
            '<32>{#p/without}* \"tá sério?\"\n* \"é só uma piada.\"',
            '<33>{#p/without}* \"heh...\"',
            '<33>{#p/without}* \"não leia muito profundamente.\"',
            ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... é a pior piada já vista.'])
        ],
        sansinter: {
            s_sans: pager.create(
                0,
                () =>
                    world.edgy
                        ? ["<25>{#p/sans}* salve."]
                        : [
                            "<25>{#p/sans}* papyrus vai voltar logo logo, sabe.",
                            "<25>{#f/4}* eu iria logo se fosse você...",
                            "<25>{#f/2}* do contrário, você terá que escutar mais das minhas hilárias piadas."
                        ],
                () =>
                    world.edgy
                        ? [
                            '<25>{#p/sans}* se meu irmão estivesse aqui, nós faríamos várias paradas.',
                            '<25>{#p/sans}{#f/3}* mas, alas...',
                            "<25>{#p/sans}{#f/2}* ele tá ocupado resolvendo o livro de sudoku que eu o dei."
                        ]
                        : [
                            "<25>{#p/sans}* olha, não tem nada para temer.",
                            "<25>{#f/2}* ele pode parecer assustador, mas papyrus é o cara mais tranquilo que você conhecerá."
                        ],
                () =>
                    world.edgy
                        ? [
                            '<25>{#p/sans}* huh?\n* você quer que eu te leve até ele?',
                            "<25>{#f/3}* Olha, cara.\n* Você está latindo para a holo-árvore errada.",
                            "<25>{#p/sans}{#f/2}* se eu fosse você, ficaria agradecido pelo que já tenho."
                        ]
                        : ['<25>{#p/sans}* confia em mim.'],
                () =>
                    world.edgy
                        ? [
                            '<25>{#p/sans}{#f/3}* ...',
                            "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Não abuse da sorte.",
                            '{*}{#s.resume}{%}'
                        ]
                        : ['<25>{#p/sans}* confia em mim.'],
                () => (world.edgy ? [] : ['<25>{#p/sans}* confia em mim.'])
            ),
            s_papyrus: pager.create(
                0,
                [
                    "<25>{#p/sans}* ei, aqui vai uma dica importante.",
                    '<25>* meu irmão tem um {@fill=#00a2e8}ataque especial{@fill=#fff}.',
                    "<25>* se você ver um {@fill=#ff993d}ataque laranja{@fill=#fff}, deve se continuar movendo.",
                    "<25>{#f/3}* aqui vai uma forma fácil de manter na cabeça.",
                    "<25>{#f/0}* imagine carvão quente.\n* você não os pisaria por um segundo.",
                    '<25>* carvão quente queima.\n* então aplique isso aos ataques de meu irmão.',
                    '<25>{#f/2}* simples, né?\n* quando lutar, lembre-se de carvões quentes.'
                ],
                [
                    "<25>{#p/sans}{#f/0}* e não, você não será ferido se mover devagar, é só mover.",
                    '<25>{#f/0}* sacou?',
                    "<25>{#f/2}* provavelmente tem alguém por aí que pode explicar melhor."
                ],
                ['<25>{#p/sans}{#f/2}* lembre-se.\n* carvão quente.']
            ),
            s_dogs: pager.create(
                0,
                [
                    "<25>{#p/sans}* já que você é humano, provavelmente nunca ouviu falar do F.D.P.",
                    '<25>{#f/2}* que é uma abreviação para \"Filtro De Pluralidade-Gravitacional.\"'
                ],
                [
                    '<25>{#p/sans}* se não tivéssemos o F.D.P. seria bem difícil respirar aqui.',
                    "<25>{#f/3}* não se preocupa. eu {@fill=#ff0}juro{@fill=#fff} que isso nunca aconteceu antes."
                ],
                ['<25>{#p/sans}{#f/2}* Filtro De Pluralidade-Gravitacional.']
            ),
            s_jenga: pager.create(
                0,
                [
                    '<25>{#p/sans}* na verdade, aquele espaguete de mais cedo.',
                    "<25>{#f/3}* não estava tão ruim para meu irmão.",
                    "<25>{#f/0}* desde que ele começou a aprender a cozinhar, tem melhorado bastante.",
                    "<25>{#f/4}* aposto que se ele continuar assim, logo irá impressionar o rei."
                ],
                () =>
                    world.edgy || world.killed5
                        ? ['<25>{#p/sans}{#f/2}* ... essa seria uma ótima forma dele sair de perto de você.']
                        : ["<25>{#p/sans}{#f/2}* ... O homem lá em cima é um amante de espaguete."]
            ),
            s_bridge: pager.create(
                0,
                () =>
                    world.edgy
                        ? [
                            '<25>{#p/sans}{#f/0}* espero que você tenha gostado daquele último quebra-cabeça.',
                            '<25>{#f/3}* foi meio na pressa, mas papyrus insistiu que eu o fizesse.'
                        ]
                        : world.killed5
                            ? [
                                "<25>{#p/sans}{#f/3}* eu ouvi dizer que estão evacuando está área agora mesmo...",
                                "<25>{#f/0}* se você fosse, estaria tremendo os ossos."
                            ]
                            : [
                                "<25>{#p/sans}{#f/3}* eu não sei o que meu irmão vai fazer agora.",
                                '<25>{#f/0}* se eu fosse você me lembraria de {@fill=#ff993d}ataques laranjas{@fill=#fff}.'
                            ],
                () =>
                    world.edgy
                        ? [
                            '<25>{#p/sans}{#f/0}* o que?\n* da pra me culpar?',
                            "<25>{#f/3}* é difícil fazer coisas quando preciso ficar de olho em você."
                        ]
                        : world.killed5
                            ? [
                                '<25>{#p/sans}{#f/0}* felizmente, eu tenho alguém se preocupa comigo.',
                                "<25>{#f/2}* não importa o que aconteça, eu sei que ele estará lá por mim."
                            ]
                            : ['<25>{#p/sans}{#f/2}* ah, talvez {@fill=#00a2e8}ataques azuis{@fill=#fff}, também.'],
                () =>
                    world.edgy
                        ? ['<25>{#p/sans}{#f/3}* pois bem.']
                        : world.killed5
                            ? ['<25>{#p/sans}{#f/0}* tô errado?']
                            : ['<26>{#p/sans}{#f/0}* todo tipo de ataques.']
            )
        },
        sansbredgey: () =>
            world.edgy
                ? 6 <= world.population
                    ? [
                        '<25>{#p/sans}* por sinal...',
                        "<25>* eu sei que tenho sido meio duro contigo...",
                        '<25>{#f/3}* mas obrigado por tentar ser uma pessoa melhor.',
                        '<25>{#f/2}* continue assim, beleza?'
                    ]
                    : world.bullied
                        ? [
                            '<25>{#p/sans}* por sinal...',
                            "<25>* eu sei que você ainda está por aí machucando as pessoas...",
                            '<25>{#f/3}* mas eu aprecio o esforço de não chegar matando elas.',
                            "<25>{#f/2}* já é alguma coisa, não é?"
                        ]
                        : [
                            '<25>{#p/sans}* por sinal...',
                            '<25>* se você acabar tendo que lutar contra meu irmão...',
                            '<25>{#f/3}* ...',
                            "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Não levante um dedo.",
                            '{*}{#s.resume}{%}'
                        ]
                : 6 <= world.population
                    ? [
                        '<25>{#p/sans}* por sinal...',
                        "<25>* eu sei que é meio bobo as vezes...",
                        "<25>{#f/3}* mas obrigado por aceitar os esquemas malucos do meu irmão.",
                        "<25>{#f/2}* você é um campeão."
                    ]
                    : world.bullied
                        ? [
                            '<25>{#p/sans}* por sinal...',
                            "<25>* eu sei que você está por aí machucando as pessoas...",
                            '<25>{#f/3}* mas eu aprecio o esforço de não chegar matando elas.',
                            "<25>{#f/2}* já é alguma coisa, não é?"
                        ]
                        : [
                            '<25>{#p/sans}* por sinal...',
                            '<25>* se você acabar tendo que lutar contra meu irmão...',
                            '<25>{#f/3}* ...',
                            "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Não levante um dedo.",
                            '{*}{#s.resume}{%}'
                        ],
        sentryPapyrus1: pager.create(
            0,
            () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A narração nesta estação de sentinela prevê a fama futura de seu criador.)']
                    : [
                        "<32>{#p/basic}* Tem uma narração nesta caixa de entrada.",
                        ...(world.genocide || world.runaway
                            ? [
                                '<23>{#p/papyrus}{#f/30}\"POR FAVOR NÃO DESTRUA MINHA ESTAÇÃO DE SENTINELA.\"',
                                '<23>\"EU TRABALHEI DURO NELA, SERIA TRISTE VÊ-LA DESTRUÍDA.\"',
                                '<23>\"... ISSO É TUDO.\"',
                                '<23>(\"NOTA: EU TERIA DITO MAIS, MAS NÃO HÁ ESPAÇO SUFICIENTE.\")'
                            ]
                            : [
                                '<23>{#p/papyrus}{#f/30}\"VOCÊ OBSERVA A BEM CONSTRUÍDA ESTAÇÃO DE SENTINELA.\"',
                                '<23>\"QUEM PODERIA TER CONSTRUÍDO ISSO, VOCÊ SE PERGUNTA...?\"',
                                '<23>\"EU APOSTO QUE FOI UM GUARDA REAL MUITO FAMOSO.\"',
                                SAVE.data.n.plot === 72
                                    ? '<32>{#p/basic}* A última linha foi rasgada.'
                                    : '<23>(\"NOTA: AINDA NÃO É UM GUARDA REAL MUITO FAMOSO.\")',
                                ...(SAVE.data.n.plot < 19 && !(world.edgy || world.killed5 || world.population < 6)
                                    ? [
                                        "<25>{#p/sans}{#f/0}* admirando o trabalho a mão do meu irmão?",
                                        "<25>{#p/sans}{#f/2}* eu sei, é bem fera."
                                    ]
                                    : [])
                            ])
                    ],
            () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A narração nesta estação de sentinela prevê a fama futura de seu criador.)']
                    : [
                        "<32>{#p/basic}* Tem uma narração nesta caixa de entrada.",
                        ...(world.genocide || world.runaway
                            ? [
                                '<23>{#p/papyrus}{#f/30}\"POR FAVOR NÃO DESTRUA MINHA ESTAÇÃO DE SENTINELA.\"',
                                '<23>\"EU TRABALHEI DURO NELA, SERIA TRISTE VÊ-LA DESTRUÍDA.\"',
                                '<23>\"... ISSO É TUDO.\"',
                                '<23>(\"NOTA: EU TERIA DITO MAIS, MAS NÃO HÁ ESPAÇO SUFICIENTE.\")'
                            ]
                            : [
                                '<23>{#p/papyrus}{#f/30}\"VOCÊ OBSERVA A BEM CONSTRUÍDA ESTAÇÃO DE SENTINELA.\"',
                                '<23>\"QUEM PODERIA TER CONSTRUÍDO ISSO, VOCÊ SE PERGUNTA...?\"',
                                '<23>\"EU APOSTO QUE FOI UM GUARDA REAL MUITO FAMOSO.\"',
                                SAVE.data.n.plot === 72
                                    ? '<32>{#p/basic}* A última linha foi rasgada.\n* Compreensível.'
                                    : '<23>(\"NOTA: AINDA NÃO É UM GUARDA REAL MUITO FAMOSO.\")'
                            ])
                    ]
        ),
        sentryPapyrus2: pager.create(0, () => [
            '<32>{#p/human}* (Você olha por de baixo.)',
            ...(SAVE.data.b.svr
                ? [
                    [
                        "<25>{#p/asriel1}{#f/17}* É aí que Papyrus guarda todas suas ferramentas malucas.",
                        '<25>{#f/20}* Um lutador à noite e um consertador por... também noite.'
                    ],
                    [
                        '<26>{#p/asriel1}{#f/13}* Teve uma linha do tempo em que eu encorajei o Papyrus a ser um empregado do Lab Real.',
                        '<25>{#f/17}* Ele acabou por fazer suas próprias coisas.',
                        '<25>{#f/17}* ... trabalhando em ciência pessoal mais do que os ofícios do reino.',
                        "<25>{#f/13}* Papyrus não é alguém que se mantém no sistema padrão."
                    ],
                    [
                        '<26>{#p/asriel1}{#f/13}* Um dispositivo criado por Papyrus foi o lendário \"shickaxe.\"',
                        '<25>{#f/17}* Uma ferramenta multi-funcional que poderia quebrar qualquer material.',
                        '<25>{#f/15}* Tinha uma durabilidade... infinita.',
                        '<25>{#f/13}* Ele só jogou fora porque nas próprias palavras...',
                        '<25>{#f/13}* \"Ter uma ferramenta que destrói tudo, também destrói sua capacidade de pensar.\"'
                    ],
                    ['<26>{#p/asriel1}{#f/20}* Papyrus e sua forma única de pensar.']
                ][Math.min(asrielinter.sentryPapyrus2++, 3)]
                : ['<32>* Caixas e mais caixas de cabos não utilizados e tecnologia antiga podem ser encontradas aqui.'])
        ]),
        sentrySans1: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Esta estação de sentinela parece pouco importante.)']
                : world.darker
                    ? ["<32>{#p/basic}* É uma estação de sentinela."]
                    : SAVE.data.n.plot < 31
                        ? [
                            "<32>{#p/basic}* Estação de sentinela do Sans.",
                            "<32>* Verdadeiramente o investimento mais valioso que a Guarda Real poderia ter feito."
                        ]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* Estação de sentinela do Sans.", "<32>* A qualidade deste investimento não mudou nada."]
                            : ["<32>{#p/basic}* Estação de sentinela do Sans.", '<33>* Um investimento ruim em retrospectiva.'],
        sentrySans2: pager.create(
            0,
            () => [
                '<32>{#p/human}* (Você olha por de baixo.)',
                ...(SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/15}* Mesmo como estrela, tiveram buracos que nem mesmo eu ousei procurar.',
                            "<25>{#f/20}* É provavelmente para o melhor deixarmos assim."
                        ],
                        ['<25>{#p/asriel1}{#f/20}* Por favor.\n* Tudo menos aqui.']
                    ][Math.min(asrielinter.sentrySans2++, 1)]
                    : world.edgy
                        ? ["<32>{#p/basic}* Está basicamente vazio, tirando um único giz vermelho."]
                        : ['<32>{#p/basic}* Há garrafas de mel, alfredo e molho de yamok estocadas aqui.'])
            ],
            () => [
                '<32>{#p/human}* (Você olha por de baixo.)',
                SAVE.data.b.svr
                    ? '<25>{#p/asriel1}{#f/20}* Por favor.\n* Tudo menos aqui.'
                    : world.edgy
                        ? "<32>{#p/basic}* É um lembrete inquietante."
                        : "<32>{#p/basic}* É uma quantidade profana de coberturas de comida."
            ]
        ),
        whew1: () =>
            [
                ['<32>{#p/basic}* A cama do cachorrinho está coberta de pêlo branco irritante.'],
                ['<32>{#p/basic}* Lutar contra Papyrus começou a cansa-lo, mas não o suficiente.'],
                [
                    '<32>{#p/basic}* Após lutar Papyrus três vezes, você está exausto.',
                    choicer.create('* (O que você vai fazer?)', 'Nada', 'Dormir')
                ],
                [
                    '<32>{#p/basic}* Continuar lutando Papyrus te deixou exausto.',
                    choicer.create('* (O que você vai fazer?)', 'Nada', 'Dormir')
                ]
            ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 3)],
        whew2: ['<32>{#p/human}* (Você deixa a cama de cachorro em paz.)'],
        whew3: ['<32>{#p/human}* (Você brinca na cama de cachorro...)'],
        whew4: [
            "<32>{#p/alphys}* E você disse que ele está aqui?",
            '<32>{#p/sans}{#f/7}* sim.\n* Meu irmão deixou isso claro.',
            '<32>{#p/alphys}* O-okay...\n* Aqui vai nada.',
            '<32>{#p/human}* (Parece que uma porta está abrindo.)',
            '<32>{#p/alphys}* ...',
            '<32>{#p/alphys}* Bem, aí está.',
            "<32>{#p/sans}{#f/7}* vamos, isso tem que ser rápido.",
            "<32>{#p/sans}{#f/7}* eu dúvido que teremos tempo até a undyne aparecer.",
            '<32>{#p/alphys}* sendo o mais rápida que eu puder.'
        ],
        whew5: [
            '<32>{#p/human}* (parece que alguém está tentando te carregar.)',
            '<32>{#p/alphys}* senhor, h-humanos são pesados assim!?'
        ],
        whew6: [
            '<32>{#p/basic}* Huh?\n* Onde está...',
            "<32>* ...\n* Casa do Asgore.",
            "<32>* Vamos, vamos encontrá-lo."
        ],
        trivia: {
            s_bbox: ["<32>{#p/basic}* Uma caixa bastião.\n* Tem um humano dentro..."],
            
            ogkxsaucer: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você enfia a mão profundamente no dispensador, é um pouco atrevido.)"]
                    : ["<32>{#p/basic}* É um tipo de dispensador."],
            mousehole: () =>
                [
                    ["<32>{#p/basic}* É um buraco de rato.\n* Os ratos dentro estão discutindo sua grande batalha."],
                    ["<32>{#p/basic}*É um buraco de rato.\n* Os ratos dentro estão preocupados com sua segurança."],
                    ["<32>{#p/basic}* É um buraco de rato. Os ratos dentro estão se perguntando se você deve descansar."],
                    ["<32>{#p/basic}* É um buraco de rato.\n* O rato está preocupado com sua sanidade."]
                ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 3)],
            lamppost: pager.create(
                2,
                ...[
                    ["<32>{#p/basic}* É uma lâmpada de reflexo."],
                    ['<32>{#p/basic}* Um reflexo, lâmpada de reflexo.'],
                    ['<32>{#p/basic}* Tanto reflexo.\n* Bem lâmpada.'],
                    ['<32>{#p/basic}* lâmpada, reflexo, lâmpada, reflexo...'],
                    ['<32>{#p/basic}* A lâmpada balança de cima para baixo.'],
                    ['<32>{#p/basic}* ... ela não para de balançar.'],
                    ["<32>{#p/basic}* É uma coisinha chamada movimento perpétuo."]
                ].map(
                    lines => () =>
                        SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Você observa a lâmpada estranha balançando de cima para baixo.)']
                            : world.darker
                                ? ['<32>{#p/basic}* Só uma lâmpada.']
                                : lines
                )
            ),
            ntower: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Acho que a Alphys nunca concertou essa coisa.',
                            "<25>{#f/16}* Eu não culpo ela.\n* Esse negócio é um pesadelo.",
                            '<25>{#f/20}* Além disso, meio que depende da presença do Sans.',
                            '<25>{#f/15}* Fazer ele participar é... meio impossível.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/17}* É... Sans. Bom senso de humor, mas nada ativo.',
                            '<25>{#f/13}* E por ativo, eu digo fisicamente.',
                            "<25>{#f/15}* E por fisicamente, digo que ele nem gosta de se mexer.",
                            '<25>{#f/16}* E por se mexer, eu tô dizendo só levantar e andar.',
                            '<25>{#f/13}* É.\n* Normalmente ele pega os tais atalhos.',
                            '<25>{#f/15}* Eu ainda não sei como aquilo funciona.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/17}* Acho que podemos dizer que a Alphys não queria arrumar este aí...",
                            '<25>{#f/20}* Foi um atalho pra ela mesma.'
                        ],
                        ['<25>{#p/asriel1}{#f/20}* ... talvez eu devesse trabalhar no meu senso de humor.']
                    ][Math.min(asrielinter.ntower++, 3)]
                    : SAVE.data.b.s_state_puzzlenote || (!world.genocide && world.edgy)
                        ? ["<32>{#p/basic}* Está desativado."]
                        : postSIGMA()
                            ? ["<32>{#p/basic}* Está fora de serviço."]
                            : ['<32>{#p/basic}* Que desfecho desagradável.'],
            s_secret_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A placa menciona uma fuga.)']
                    : SAVE.data.n.state_starton_trashprogress < 2 && SAVE.data.n.plot < 72
                        ? [
                            '<32>{#p/basic}* \"Está tomando um descanso.\"',
                            ...(world.goatbro && SAVE.flag.n.ga_asrielDog++ < 1 ? ['<25>{#p/asriel2}{#f/15}* Quê.'] : [])
                        ]
                        : ['<32>{#p/basic}* \"Escapou.\"'],
            grillflower: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que esta planta é realmente muito neon.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É uma planta."]
                        : [
                            "<32>{#p/basic}* Não é só uma planta...\n* É uma planta NEON.",
                            '<32>* Que diferença isso faz?\n* Nenhuma.'
                        ],
            librarbywindow1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Mas não tem nada de interesse para ver aqui.)']
                    : ["<32>{#p/basic}* Tem uma planta na janela.\n* Que interessante."],
            librarbywindow2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você alcança a janela e põe suas mãos nela.)']
                    : ["<32>{#p/human}* (Você alcança a janela e põe suas mãos nela.)\n* (Não dá pra ver dentro.)"],
            papwindow: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você espia pela janela, mas não consegue ver ninguém lá dentro.)"]
                    : SAVE.data.n.plot_date > 0 && SAVE.data.n.plot_date < 1 && SAVE.data.n.plot < 71.2
                        ? ['<32>{#p/basic}* ... parece que Papyrus está esperando pacientemente por você.']
                        : ["<32>{#p/basic}* ... parece que não tem ninguém em casa."],
            s_puzzlenote: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A nota descreve as regras de um desafio complexo.)']
                    : SAVE.data.b.s_state_puzzlenote
                        ? ["<33>{#p/basic}* É garrancho ilegível."]
                        : [],
            s_backrooms_lessdog: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (Você passa as mãos por um pelo do cachorro inexistente.)\n* (O cachorro parece gostar.)",
                        ...[
                            ['<25>{#p/asriel1}{#f/13}* Frisk, você tá bem?'],
                            ["<25>{#p/asriel1}{#f/13}* Frisk.\n* Não tem nada aqui."],
                            ['<25>{#p/asriel1}{#f/15}* ... okay?'],
                            ['<25>{#p/asriel1}{#f/15}* ...']
                        ][Math.min(asrielinter.s_backrooms_lessdog++, 3)]
                    ]
                    : SAVE.data.n.state_starton_lesserdog === 2 || (world.population === 0 && !world.bullied)
                        ? ['<32>{#p/basic}* ... mas ninguém veio.']
                        : world.runaway || world.population === 0
                            ? ['<32>{#p/basic}* ... mas todo mundo correu.']
                            : SAVE.data.n.plot < 72
                                ? ["<32>{#p/basic}* Está jogando pôquer contra si.", '<32>* Parece estar perdendo...']
                                : [
                                    "<32>{#p/basic}* Está jogando pôquer contra si.",
                                    '<32>* Parece estar ganhando...\n* De alguma forma.'
                                ],
            s_backrooms_lesstable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você se pergunta se a ração para cães é comestível para humanos.)']
                    : ["<32>{#p/basic}* É uma me de pôquer 4-D, e um pouco de pelo de cachorro."],
            s_beddinng_table: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha para a mesa.)\n* (Você então desvia o olhar.)']
                    : ['<32>{#p/basic}* A mesa obrigatória. Apesar de sua falta de propósito, preenche bem o espaço.'],
            s_bh_bone: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você aprecia está arte na pintura minimalista.)']
                        : [
                            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                                ? [
                                    '<18>{#p/papyrus}UMA IMAGEM CLASSICA.',
                                    "<18>ME LEMBRA DO QUE É IMPORTANTE NA VIDA."
                                ]
                                : []),
                            "<32>{#p/basic}* É uma pintura minimalista do desenho de um osso."
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você aprecia está arte na pintura minimalista.)']
                        : ["<32>{#p/basic}* É uma pintura minimalista do desenho de um osso."]
            ),
            s_bh_cottonball: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (O conteúdo das notas anexadas a esta pilha de meias não o surpreende em nada.)'
                    ]
                    : [
                        "<32>{#p/basic}* É uma bola de algodão suja cheia de notas nela.",
                        '<23>{#p/papyrusnt}\"SANS!\"\n\"POR FAVOR PEGUE SUA BOLA DE ALGODÃO!\"',
                        '<32>{#p/without}* \"ok.\"',
                        '<23>{#p/papyrusnt}\"NÃO COLOQUE DE VOLTA!\"\n\"MOVA DAQUI!\"',
                        '<32>{#p/without}* \"ok.\"',
                        '<23>{#p/papyrusnt}\"VOCÊ MOVEU ELA POR DUAS MOLÉCULAS, TIRE PARA SEU QUARTO!\"',
                        '<32>{#p/without}* \"ok.\"',
                        '<23>{#p/papyrusnt}\"E NÃO TRAGA DE VOLTA!\"',
                        '<32>{#p/without}* \"ok.\"',
                        '<23>{#p/papyrusnt}\"AINDA ESTÁ AQUI!\"',
                        '<32>{#p/without}* \"você não acabou de dizer pra eu não trazer ela de volta para meu quarto?\"',
                        '<23>{#p/papyrusnt}\"ESQUECE!\"'
                    ],
            s_paptrash: pager.create(
                0,
                ...[
                    () => [
                        ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                            ? [
                                "<18>{#p/papyrus}{#f/9}EU NÃO SABIA QUE VOCÊ FÃ DE CAÇAR-LIXO!",
                                '<18>{#f/0}DR. ALPHYS AMARIA SEU SABER SEU NÚMERO.'
                            ]
                            : []),
                        world.darker ? "<32>{#p/basic}* É uma lixeira." : '<32>{#p/basic}* É uma lixeira \"estelar.\"'
                    ],
                    pager.create(
                        1,
                        ...[
                            [
                                '<32>{#p/basic}* Você consegue dizer que essa é uma lixeira \"estelar\" porque tá escrito \"estelar\" do lado dela.'
                            ],
                            ['<32>{#p/basic}* Um cara \"estelar\" com uma lata de lixo \"estelar\".\n* O que mais você poderia querer.'],
                            ['<32>{#p/basic}* A lixeira mais \"estelar\" da cidade.'],
                            ['<32>{#p/basic}* Ou de qualquer cidade.'],
                            ['<32>{#p/basic}* O quão \"estelar\" é isso?'],
                            ['<32>{#p/basic}* Muito?\n* Muito muito?\n* Mais \"estelar\" que tudo?'],
                            ["<32>{#p/basic}* Nós temos opções aqui, bebê!"],
                            [
                                '<33>{#p/basic}* Mas não importa quanto tempo passe, a lixeira continua \"estelar.\"'
                            ],
                            [
                                '<32>{#p/basic}* Na verdade, quanto mais penso nisso, \"estelar\" não começa a arranhar a superfície.'
                            ],
                            ['<32>{#p/basic}* Tipo, \"astronômico\" talvez seja um termo melhor.'],
                            ["<33>{#p/basic}* Não. Esse termo é reservado aos trabalhos do Laboratório Real."],
                            ['<32>{#p/basic}* Hmm...\n* Mas e se essa lixeira for um buraco negro.'],
                            ['<32>{#p/basic}* Um lixeira buraco negro...\n* Você arriscaria?'],
                            ["<32>{#p/basic}* Uma questão estranha."],
                            [
                                '<32>{#p/basic}* Acho que você poderia dizer que, graças a esta lata de lixo, estou ficando todo \"espaçado.\"'
                            ],
                            ["<32>{#p/basic}* Você pode até dizer que estou me sentindo... de outro mundo."],
                            ['<32>{#p/basic}* ...\n* Ignora essa última sentença.'],
                            ['<32>{#p/basic}* Na verdade, ignora as últimas nove coisas que eu disse.'],
                            ["<32>{#p/basic}* Verdade seja dita... essa lixeira só pode ter um adjetivo."],
                            ["<32>{#p/basic}* Qual seria, você pergunta? Bem, eu te digo se você realmente quiser saber."],
                            ["<32>{#p/basic}* Não é uma lixeira astronômica, de forma alguma."],
                            ["<32>{#p/basic}* Não é um buraco negro em nenhuma capacidade..."],
                            ["<32>{#p/basic}* Você não lembra? \n* Não lembra como isso tudo começou?"],
                            ['<32>{#p/basic}* Foi a primeira coisa que eu disse sobre essa lixeira.'],
                            ['<32>{#p/basic}* ...\n*Eu disse...\n* Espera por isso...'],
                            ['<32>{#p/basic}* É uma lixeira \"estelar.\"']
                        ].map(lines => () => world.darker ? ["<32>{#p/basic}* É uma lixeira."] : lines)
                    )
                ].map(
                    p => () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (Você não consegue entender o que tem na lixeira...)"]
                            : CosmosUtils.provide(p)
                )
            ),
            s_bh_fridge: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (A comida na geladeira parece descente.)']
                        : world.runaway
                            ? ["<32>{#p/basic}* Foi destruído."]
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* Oops, tudo espaguete.']
                                : [
                                    ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                                        ? [
                                            '<18>{#p/papyrus}{#f/9}AH-HA!\nINTERESSADO NO MEU MUSEU DE COMIDA?',
                                            '<18>{#f/0}POR FAVOR, EXAMINE MINHA ARTE CULINÁRIA.'
                                        ]
                                        : []),
                                    '<32>{#p/basic}* Metade do freezer tem potes escritos \"espaguete\" com caneta.',
                                    '<32>* A outra metade tem um litro de refrigerante de laranja vazio.'
                                ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (A comida na geladeira parece descente.)']
                        : world.runaway
                            ? ["<32>{#p/basic}* Foi destruído."]
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* Oops, tudo espaguete.']
                                : [
                                    ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                                        ? ["<18>{#p/papyrus}BOA GELADEIRA, NÃO É?"]
                                        : []),
                                    '<32>{#p/basic}* O litro está rotulado como propriedade da \"ALPHYS.\"'
                                ]
            ),
            s_bh_rocktable: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você duvida que a poeira estelar seja realmente comestível.)']
                        : [
                            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                                ? [
                                    '<18>{#p/papyrus}AH SIM, A MESA DE JANTAR.',
                                    '<18>{#f/5}NÓS CUIDAMOS DE UMA PEDRA DA LUA AQUI...',
                                    '<18>{#f/7}ATÉ QUE UM DIA, ELA SUMIU!',
                                    '<18>{#f/4}NO COMEÇO, CULPEI AQUELE CÃO INTROMETIDO...',
                                    '<18>{#f/7}MAS AÍ DESCOBRI QUE SANS USOU PARA TESTAR...',
                                    '<18>{#f/6}SEU... INVERSOR SUPER ÚTIL.\nUAU...',
                                    "<18>{#f/0}QUER SABER DE UMA COISA, EU ENTENDO.",
                                    '<18>{#f/0}ELE SE ESFORÇOU PARA UMA COISA.',
                                    '<18>{#f/4}MESMO QUE ISSO TENHA NOS CUSTADO UM PEDAÇO DA LUA.',
                                    "<18>{#f/0}É!!!\n'É' DE ESFORÇO!!!"
                                ]
                                : []),
                            "<32>{#p/basic}* Está coberto de poeira estelar comestível."
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você duvida que a poeira estelar seja realmente comestível.)']
                        : ["<32>{#p/basic}* Está coberto de poeira estelar comestível."]
            ),
            s_bh_stove: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? [
                            [
                                '<25>{#p/asriel1}{#f/13}* Me diga, Frisk...',
                                '<25>{#f/13}* Você já ouviu falar sobre a tragédia do Cheesecake abandonado?',
                                '<25>{#f/16}* Bem aqui nesta forma de torta, uma confecção foi criada...',
                                '<25>{#f/3}* Algo além do que seu padeiro previu.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/3}* Sabe, Sans criou um cheesecake tão doce...',
                                '<25>{#f/4}* Que qualquer pessoa que tentasse comer ficaria viciado nele.',
                                '<25>{#f/15}* Se ele quisesse, poderia ser padeiro de todo mundo no Outpost.'
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* No final, Sans sabia que iria ofuscar seu irmão...",
                                "<25>{#f/15}* E assim, pela simples criação daquele Cheesecake, ele tinha ido longe demais.",
                                '<25>{#f/16}* Então ele parou de fazê-los para não ter responsabilidades.'
                            ],
                            ['<25>{#p/asriel1}{#f/16}* Alas, a tragédia do Cheesecake abandonado.']
                        ][Math.min(asrielinter.s_bh_stove++, 3)]
                        : [
                            "<32>{#p/basic}* Há uma forma de torta vazia dentro do fogão.",
                            ...(dateready() && SAVE.data.n.state_starton_papyrus === 0
                                ? [
                                    '<18>{#p/papyrus}MEU IRMÃO SEMPRE SAI PRA COMER.',
                                    "<18>{#f/4}MAS RECENTEMENTE, ELE TENTOU \"COZINHAR...\"",
                                    '<18>{#f/5}EU ACHO QUE ERA... UM CHEESECAKE?',
                                    "<18>{#f/6}NÃO TENHO CERTEZA."
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            [],
                            [
                                '<25>{#p/asriel1}{#f/13}* Basicamente o Sans criou um cheesecake tão doce...',
                                '<25>{#f/16}* Que qualquer um que tentasse ficaria viciado.',
                                '<25>{#f/3}* Se ele quisesse, poderia ser o padeiro de todo mundo no Outpost.',
                                '<25>{#f/3}* O cheesecake, ao que parece...',
                                '<25>{#f/4}* Foi um caminho para o sucesso que Papyrus nunca poderia aprovar.'
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* No final, Sans sabia que iria ofuscar seu irmão...",
                                "<25>{#f/15}* E assim, pela simples criação daquele Cheesecake, ele tinha ido longe demais.",
                                '<25>{#f/16}* Então ele parou de fazê-los para não ter responsabilidades.'
                            ],
                            ['<25>{#p/asriel1}{#f/16}* Alas, a tragédia do Cheesecake abandonado.']
                        ][Math.min(asrielinter.s_bh_stove++, 3)]
                        : ["<32>{#p/basic}* Há uma forma de torta vazia dentro do fogão."]
            ),
            s_chew: ["<32>{#p/basic}* É um brinquedo de barulho rotulado como 'ataque especial.'"],
            s_crossroads_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal expõe os inúmeros benefícios das caixas.)']
                    : [
                        '<32>{#p/basic}* \"Está é um caixa.\"',
                        '<32>* \"Você pode colocar um ítem dentro ou tirar um ítem pra fora.\"',
                        '<32>* \"A mesma caixa vai aparecer mais tarde, então não se preocupe em voltar.\"',
                        '<32>* \"Sinceramente, um fã de caixas.\"'
                    ],
            s_doghouse: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (A parede interna desta casinha de cachorro parece estar coberta de estranhos círculos redondos.)'
                    ]
                    : SAVE.data.n.state_starton_greatdog === 2
                        ? ['<32>{#p/basic}* Deve ter bastante espaço nessa casa de cachorro.']
                        : world.genocide || world.edgy || world.darker
                            ? ['<32>{#p/basic}* Uma pequena casa de cachorro.']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* Me pergunto se essa casa de cachorro também viaja no tempo.']
                                : ['<32>{#p/basic}* Que casa de cachorro pequena!', '<32>{#p/basic}* Parece maior por dentro.'],
            s_doghouse_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você mal consegue entender o que está escrito neste sinal.)"]
                    : ['<32>{#p/basic}* \"Woof.\"'],
            s_dogs_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal explica o perigo de certos cheiros.)']
                    : [
                        '<32>{#p/basic}* \"Ranking de Perigos dos Cheiros\"',
                        '<32>* \"Cheiro de silicone - robô\"\n* \"Classificação BRANCA\"\n* \"Pode se tornar {@fill=#2f2f2f}PRETA{@fill=#fff}.',
                        '<32>* \"Cheiro Insuspeito - Cachorrinho\"\n* \"{@fill=#003cff}BLUE{@fill=#fff}.\"\n* \"Cheiro de rolamento.\"',
                        world.runaway
                            ? '<32>* \"Cheiro Estranho - Humano\"\n* \"{@fill=#00c000}GREEN{@fill=#fff}.\"\n* \"Fugir a todo custo.\"'
                            : SAVE.data.n.plot === 72
                                ? '<32>* \"Cheiro Estranho - Humano\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} rating.\"\n* \"Pode derrotar seres divinos.\"'
                                : SAVE.data.n.plot < 31
                                    ? '<32>* \"Cheiro Estranho - Humano\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} rating.\"\n* \"Destrua a todo custo!\"'
                                    : '<32>* \"Cheiro estranho - cachorrinho?\"\n* \"{@fill=#00c000}GREEN{@fill=#fff} .\"\n* \"Profundo conhecimento de carícias.\"'
                    ],
            s_dogstandA: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que esse sinal pertence a um cachorro macho.)']
                    : player.position.y > 50
                        ? ['<32>{#p/basic}* \"Dele.\"']
                        : ['<32>{#p/basic}* Dentro está uma revista para cortes de pele azuis e cinzas extravagantes.'],
            s_dogstandB: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Este sinal parece pertencer a uma cachorro fêmea.)']
                    : player.position.y > 50
                        ? ['<32>{#p/basic}* \"Dela.\"']
                        : ['<32>{#p/basic}* Dentro está um folheto para armamento pesado contundente.'],
            s_dogstandC: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que a carta dentro foi ignorada.)']
                    : world.genocide
                        ? [
                            '<32>{#p/basic}* Dentro, na chão, tem uma carta da Guarda Real falando sobre uma retirada tática.',
                            '<32>{#p/basic}* A \"ameaça\" em \"retirada\" parece ter sido rasgada...'
                        ]
                        : [
                            '<32>{#p/basic}* Dentro, no chão, a um aviso da Guarda Real sobre uniformes.',
                            "<32>{#p/basic}* Está coberto em arranhões."
                        ],
            s_grillbys_beegstool: () =>
                SAVE.data.b.svr
                    ? ['<25>{#p/asriel1}{#f/20}* Eu acho que isso deve ser um pouco alto pra você.']
                    : world.darker
                        ? ['<32>{#p/basic}* Apenas mais uma banqueta.']
                        : ['<32>{#p/basic}* Uma banqueta...', '<32>* Parece do tamanho certo para o Sans.'],
            s_grillbys_drinks: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não consegue distinguir o que está embaixo da bandeja da mesa...)"]
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* É uma mesa de bandeja.", '<32>* A câmera do outro lado foi tomada.']
                        : ["<32>{#p/basic}* É uma mesa de bandeja.", "<32>* Tem uma câmera escondida do outro lado."],
            s_grillbys_shelf: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/16}* Eu não acho que provar qualquer dessas coisas seria uma boa ideia.",
                            '<25>{#f/15}* Da última vez que alguém provou, acabou queimando em chamas...'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/15}* Spoiler alerta:\n* Foi o Grillby.',
                            "<25>{#f/20}* Cara.\n* Hoje eu estou pegando fogo."
                        ],
                        ["<25>{#p/asriel1}{#f/17}* Mas sério.\n* É melhor você não beber isso."]
                    ][Math.min(asrielinter.s_grillbys_shelf++, 2)]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Algumas das bebidas nesta prateleira foram usadas.']
                        : [
                            '<32>{#p/basic}* Uma prateleira cheia de bebidas e líquidos estranhos.',
                            '<32>{#p/basic}* E uma única garrafa de água escrita \"Conter de Fogo.\"'
                        ],
            s_grillbys_sidestool: () =>
                SAVE.data.b.svr
                    ? ["<25>{#p/asriel1}{#f/20}* Isso é definitivamente alto demais pra você."]
                    : world.darker
                        ? ['<32>{#p/basic}* Apenas mais uma banqueta.']
                        : ['<32>{#p/basic}* Esta banqueta está rotulada como \"PAPYRUS.\"'],
            s_grillbys_smolstool: () =>
                SAVE.data.b.svr
                    ? ['<25>{#p/asriel1}{#f/19}* Essa parece exatamente para nosso tamanho.']
                    : world.darker
                        ? ['<32>{#p/basic}* Apenas mais uma banqueta.']
                        : SAVE.data.b.oops
                            ? ['<32>{#p/basic}* Não tem nada de especial em relação a essa banqueta.']
                            : [
                                '<32>{#p/basic}* Algo me diz que essa banqueta é bem especial.',
                                ...(SAVE.data.n.plot === 33 ? ['<32>* Quanto à almofada em cima dela...'] : [])
                            ],
            s_helipad: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/21}* Ah sim...\n* Um terminal de carros voadores.',
                            "<25>{#f/4}* Está abandonado agora, mas uma vez...",
                            '<25>{#f/3}* Um operador ficaria aqui e direcionaria o tráfego pela área.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/3}* Esse terminal foi basicamente usando enquanto Starton era construída.',
                            '<25>{#f/4}* Para a primeira nova área construída aqui, foi uma bela precaução.',
                            "<25>{#f/13}* Naves carregando suprimentos das fábricas replicadoras...",
                            '<25>{#f/13}* Tive trabalho para aprender a andar por aí sem isso.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/17}* Eventualmente, terminais assim não eram mais úteis.",
                            '<25>{#f/20}* Os pilotos dessas naves de abastecimento melhoraram no pouso sem ajuda.',
                            '<25>{#f/13}* E então, o terminal foi esquecido...'
                        ],
                        ['<25>{#p/asriel1}{#f/16}* Apenas mais um dos objetos de nossa história que foi esquecido.']
                    ][Math.min(asrielinter.s_helipad++, 3)]
                    : ['<32>{#p/basic}* Um terminal um dia usado para pouso de carros voadores.'],
            s_jenga_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (O sinal descreve o estado quebrado do randomizador quântico da torre de exibição.)"]
                    : ['<32>{#p/basic}* \"ATENÇÃO: O randomizador quântico nesta parte da torre está quebrado.\"'],
            s_library_window: () => [
                '<32>{#p/human}* (Você põe suas mãos na janela.)',
                ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* Cheira a pintura.'])
            ],
            s_librarby_blueBooks: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro nesta prateleira faz uma comparação entra o passado e o presente.)'
                        ]
                        : [
                            '<32>{#p/basic}* O nome nesta prateleira é chamado \"Antes e Agora.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Antes da guerra, monstros eram ensinados magia de forma regular, dia após dia.\"',
                            '<32>* \"Quando maior parte da nossa raça morreu, isso também aconteceu com nossos professores.\"',
                            '<32>* \"Por conta disso, monstros começaram a aprender em grupos maiores.\"',
                            '<32>* \"Este novo método de aprendizado focou em habilidades para nós ajudar a sobreviver no Outpost.\"',
                            '<32>* \"Agora, os problemas populacionais desempenham um fator muito menor em nossas vidas.\"',
                            '<32>* \"Mas, nós ainda nos mantemos no novo método, porque...\"',
                            '<32>* \"... nós já estamos muito cansados para mudar de volta.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro nesta prateleira faz uma comparação entra o passado e o presente.)'
                        ]
                        : [
                            '<32>{#p/basic}* O nome nesta prateleira é chamado \"Antes e Agora.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"A muito tempo atrás, monstros costumavam usar várias moedas.\"',
                            '<32>* \"JEWEL e KRIOTAAN eram as dominante... mas apenas no planeta natal.\"',
                            '<32>* \"Quando começamos a interagir com humanos, eles só usavam ouro como moeda.\"',
                            '<32>* \"Nós tínhamos um suprimento abundante desses e isso nos garantiu favores...\"',
                            '<32>* \"Mas como resultado, as outras moedas perderam valor.\"',
                            '<32>* \"Agora, nós usamos ouro para tudo e o apelidamos de G por ser um GANHO/GASTO.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro nesta prateleira faz uma comparação entra o passado e o presente.)'
                        ]
                        : [
                            '<32>{#p/basic}* O nome nesta prateleira é chamado \"Antes e Agora.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Desde a morte do Erogot, o atual rei tem feito de tudo para manter seu legado.\"',
                            '<32>* \"Mesmo que isso o tenha feito perder durante o processo...\"',
                            '<32>* \"Nós acabamos aceitando o que aconteceu, e ninguém mais o culpa.\"',
                            '<32>* \"Os últimos dois séculos tem sido difíceis, mas estamos marchando para a liberdade.\"',
                            '<32>* \"O anjo está vindo...\"',
                            '<32>* \"... pelo que sabemos ele pode até já estar aqui, lendo este livro.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
            ),
            s_librarby_desk: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você observa a poeira se acumulando neste livro de check-out.)']
                    : ["<32>{#p/basic}* O livro de check-out da libraria."],
            s_librarby_greenBooks: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os livros nesta prateleira consistem em informações bem úteis.)'
                        ]
                        : [
                            '<32>{#p/basic}* É uma prateleira marcada como \"Informação.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"A OuterNet é um esforço conjunto entre o rei e o cientista real.\"',
                            '<32>* \"... maior parte pelo cientista real já que o rei só escreveu as mensagens de boas vindas.\"',
                            '<32>* \"Ainda assim, o site serve como uma ligação para os residentes do Outpost.\"',
                            '<32>* \"Tudo que você precisa fazer para criar uma conta é...\"',
                            '<32>* \"Hmm... bem...\"',
                            "<32>* \"As instruções não estavam exatamente 'claras...'\"",
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os livros nesta prateleira consistem em informações bem úteis.)'
                        ]
                        : [
                            '<32>{#p/basic}* É uma prateleira marcada como \"Informação.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Se você quer andar pelo Outpost, o taxista é sua melhor aposta.\"',
                            '<32>* \"Ele pode te levar pra onde você quiser ir...\"',
                            '<32>* \"... ele sempre estará disponível no ponto mais próximo de táxi.\"',
                            '<32>* \"Não vou mentir, as coisas que ele diz parecem muitos aleatórias.\"',
                            '<33>* \"O que é \"Justiça Canina\" de toda forma?\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os livros nesta prateleira consistem em informações bem úteis.)'
                        ]
                        : [
                            '<32>{#p/basic}* É uma prateleira marcada como \"Informação.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Monstros estão livres para alcançar qualquer área do Outpost.\"',
                            '<32>* \"Ou seja, qualquer área aquém do último corredor no topo da Cidadela.\"',
                            '<32>* \"Depois disso, apenas o cientista real tem permissão...\"',
                            '<32>* \"... ainda não sabemos o motivo.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
            ),
            s_librarby_ladder: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que a escotilha de acesso acima desta escada foi selada.)']
                    : ["<32>{#p/basic}* Uma escada aleatória.\n* É tudo que é."],
            s_librarby_pinkBooks: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os livros nesta prateleira consistem em vários fatos da biologia monstro.)'
                        ]
                        : [
                            '<32>{#p/basic}* É uma estante rotulada como \"Biologia de Monstros.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Funerais monstros, tecnicamente falando, são bem legais.\"',
                            '<32>* \"Quando monstros morrem, eles se transformam em poeira.\"',
                            '<32>* \"No funeral, nós jogamos a poeira na coisa favorita daquela pessoa.\"',
                            '<32>* \"Então sua essência viverá naquela coisa...\"',
                            '<32>* \"Uhhh, já estou no mínimo de páginas? Estou cansado de escrever isso.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os livros nesta prateleira consistem em vários fatos da biologia monstro.)'
                        ]
                        : [
                            '<32>{#p/basic}* É uma estante rotulada como \"Biologia de Monstros.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Porque eles são feitos de magia, seu corpo está atrelado a suas ALMAS.\"',
                            '<32>* \"Se um monstro pretende causar dano e realmente acredita em si mesmo...\"',
                            '<32>* \"Este monstro pode se tornar muito poderoso.\"',
                            '<32>* \"Mas praticamente todos os monstros não acreditam no hábito da luta como necessário.\"',
                            '<32>* \"Se um inimigo nos atacasse novamente, com apenas um posto avançado para nos defender...\"',
                            '<32>* ...',
                            '<32>{#p/human}* (Você sente que é melhor parar por aqui.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os livros nesta prateleira consistem em vários fatos da biologia monstro.)'
                        ]
                        : [
                            '<32>{#p/basic}* É uma estante rotulada como \"Biologia de Monstros.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Enquanto monstros são feitos de magia, humanos são feitos de água.\"',
                            '<32>* \"Com suas formas físicas, humanos são bem mais fortes do que nós.\"',
                            '<32>* \"Mas, eles nunca saberão o quão apreciador é se expressar através de magia.\"',
                            '<32>* \"Eles nunca receberão um cartão de aniversário com padrão de bala...\"',
                            '<32>* \"Ou brincar de esconde-esconde com invisibilidade e clarividência...\"',
                            '<32>* \"Ou até mesmo criar shows de luz com magia elétrica!\"',
                            '<32>* \"Que tristeza.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
            ),
            s_librarby_purpleBooks: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta prateleira descrevem documentários sobre o planeta natal.)']
                        : [
                            '<32>{#p/basic}* Está prateleira está descrita como \"História do Planeta Natal.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Cada dia em nosso planeta natal era um dia para si lembrar.\"',
                            '<32>* \"Para começar a manhã, torres brilhantes de energia mágica perfuraram os céus.\"',
                            '<32>* \"Durante o dia, estas formações mágicas começaram a unir-se...\"',
                            '<32>* \"Tudo levando a uma libertação deslumbrante que enviou o planeta para a escuridão.\"',
                            '<32>* \"Ao anoitecer, o processo de aglutinação mágica começaria de novo.\"',
                            '<32>* \"Raios de energia mágica liberados anteriormente caíram de cima.\"',
                            '<32>* \"Assim que energia o suficiente acertasse o chão, as torres funcionariam de novo...\"',
                            '<32>* \"Esse era o ciclo que outrora governava nossos dias e noites.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta prateleira descrevem documentários sobre o planeta natal.)']
                        : [
                            '<32>{#p/basic}* Está prateleira está descrita como \"História do Planeta Natal.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Monstros nem sempre tiveram uma estrutura tão organizada, sabe?\"',
                            '<32>* \"Muito, muito tempo atrás... centenas de anos, na verdade...\"',
                            '<32>* \"Nossa raça andava nas matas em liberdade, sem um senso de ordem ou direção.\"',
                            '<32>* \"Nem mesmo usávamos roupas naquela época!\"',
                            '<32>* \"Mas com o tempo, nós aprendemos mais.\"\n* \"Nós queríamos mais...\"',
                            '<32>* \"Durante a grande renascença, até mesmo a essência de nossa magia ganhou foco.\"',
                            '<32>* \"Esses desenvolvimentos construíram nossa sociedade, e eventualmente, nossa vida.\"',
                            '<32>* \"... Não é muito possível acreditar que andávamos pelados por tanto tempo.\"',
                            '<32>* \"Onde estava a classe nisso?\"\n* \"A beleza?\"\n* \"Inacreditável.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta prateleira descrevem documentários sobre o planeta natal.)']
                        : [
                            '<32>{#p/basic}* Está prateleira está descrita como \"História do Planeta Natal.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Quando os monstros conheceram os humanos, Erogot ainda era rei.\"',
                            '<32>* \"Através de sua sabedoria e guia, monstros viveram em paz com os humanos.\"',
                            '<32>* \"Mas assim que Erogot morreu de velhice... as coisas jamais seriam as mesmas.\"',
                            '<32>* \"Ele era um líder habilidoso, um ao qual seu filho jamais substituiria.\"',
                            '<32>* \"A guerra que seguiu este acontecimento... era inevitável.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
            ),
            s_librarby_yellowBooks: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta prateleira discutem sobre vários dispositivos de tecnologia dos monstros.)']
                        : [
                            '<32>{#p/basic}* Esta prateleira está descrita como \"Tecnologia Monstro.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Gerson do, que o Outpost era apenas uma pequena estação espacial.\"',
                            '<32>* \"Então, após vinte anos de sofrimento, alguém olhou para o escudo de força...\"',
                            "<32>* \"'Não poderíamos usar essa energia?'\"",
                            '<32>* \"Uma simples, mas brilhante ideia.\"',
                            '<32>* \"Como resultado, o CORE foi construído, e com ele suprimento de energia estável.\"',
                            '<32>* \"Ainda o usamos até o dia de hoje!\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta prateleira discutem sobre vários dispositivos de tecnologia dos monstros.)']
                        : [
                            '<32>{#p/basic}* Esta prateleira está descrita como \"Tecnologia Monstro.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Ah, as capacidades da inteligência artificial...\"',
                            '<32>* \"... ou não.\"',
                            '<32>* \"Após o acidente do bot em K-541.12, nós abandonamos a ideia de IA consciente.\"',
                            '<32>* \"A própria rainha proibiu que qualquer um criasse IA por conta própria.\"',
                            '<32>* \"Hoje em dia, existe apenas um monstro com capacidade e recursos para tal feito...\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta prateleira discutem sobre vários dispositivos de tecnologia dos monstros.)']
                        : [
                            '<32>{#p/basic}* Esta prateleira está descrita como \"Tecnologia Monstro.\"',
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Algo que as pessoas esquecem hoje em dia é que não há muita gravidade no espaço.\"',
                            '<32>* \"Um dos grandes avanços dos monstro, antes mesmo da guerra...\"',
                            '<32>* \"Era nossa tecnologia de manipulação de gravidade de última geração.\"',
                            '<32>* \"Mesmo agora, foi construída em todas as áreas do Outpost, grandes e pequenas...\"',
                            '<32>* \"Você, lendo este livro, provavelmente está em cima deste aparelho agora.\"',
                            '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                        ]
            ),
            s_math_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você está confuso em relação ao conteúdo deste sinal.)"]
                    : ['<32>{#p/basic}* \"Aviso: Justiça Canina\"'],
            s_pacing_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você dá risada do conteúdo neste sinal.)"]
                    : ['<32>{#p/basic}* \"CUIDADO COM O CACHORRO\"\n* \"... por favu acaricie cachorro...\"'],
            s_phonecard: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (A nota pede que você ligue para um certo número.)',
                        '<32>{#s/phone}{#p/event}* Discando...',
                        '<32>{#p/human}* (Sem conexão.)'
                    ]
                    : world.runaway
                        ? [
                            "<32>{#p/basic}* É uma nota.",
                            '<32>* \"Me liga!\"\n* \"Aqui está meu número!\"',
                            '<32>{#s/phone}{#p/event}* Discando...',
                            '<32>{#p/basic}* A ligação foi direto para a caixa de mensagem.',
                            '<32>{#p/basic}* \"Olá, ligador solitário!\"\n* \"Você gostaria de escapar do Outpost comigo?\"',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* É uma nota.",
                                '<32>* \"Me liga!\"\n* \"Aqui está meu número!\"',
                                '<32>{#s/phone}{#p/event}* Discando...',
                                '<32>{#p/human}* (Sem conexão.)'
                            ]
                            : [
                                "<32>{#p/basic}* É uma nota.",
                                '<32>* \"Me liga!\"\n* \"Aqui está meu número!\"',
                                '<32>{#s/phone}{#p/event}* Discando...',
                                '<32>{#p/basic}* A ligação foi direto para a caixa de mensagem.',
                                '<32>{#p/basic}* \"Olá, ligador solitário!\"\n* \"Me desculpe por não estar aqui para te atender~\"',
                                '<32>{#s/equip}{#p/event}* Click...',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielVoicemail++ < 1
                                    ? ['<25>{#p/asriel2}{#f/10}* ... estranho.']
                                    : [])
                            ],
            s_sr_cottonball: () =>
                world.darker
                    ? ['<32>{#p/basic}* Um monte de bolas de algodão no meio do guarda-roupa.']
                    : [
                        '<32>{#p/basic}* Uma série de bolas de algodão bem organizadas.',
                        ...(SAVE.data.b.s_state_inverter
                            ? ["<32>{#p/basic}* ... te faz perguntar o motivo de ainda estarem no caminho do armário."]
                            : ["<32>{#p/basic}* ... te faz perguntar onde está o resto das porqueiras do Sans."])
                    ],
            s_sr_treadmill: ["<32>{#p/basic}* É uma esteira.", "<32>{#p/basic}* Está em velocidade máxima."],
            s_sr_lamp: [
                "<32>{#p/basic}* É uma lâmpada com uma nota gigante dentro.",
                '<23>{#p/papyrusnt}\"DESCULPA, MAS EU PEGUEI DE VOLTA A LANTERNA QUE VOCÊ ESTAVA USANDO AQUI.\"',
                '<23>{#p/papyrusnt}\"NÃO QUE EU ME IRRITE COM VOCÊ USANDO MINHAS COISAS...\"',
                '<23>{#p/papyrusnt}\"MAS USÁ-LA DE FORMA TÃO IMPRÓPRIA É TOTALMENTE INJUSTIFICADO!\"',
                '<23>{#p/papyrusnt}\"EU NÃO SEI VOCÊ, MAS DA ÚLTIMA VEZ QUE OLHEI...\"',
                '<23>{#p/papyrusnt}\"UMA LANTERNA NÃO CONTAVA COMO LAMPADA!!\"'
            ],
            s_sc_book: [
                "<32>{#p/basic}* É um antigo diário de bordo do Laboratório Real.",
                '<32>{#p/human}* (Você olha para a página aberta...)',
                '<32>{#p/basic}* \"Registro de atividades, K-615.07\"',
                '<32>* \"Um sujeito ideal foi encontrado.\"',
                '<32>* \"Preparação para o teste de substâncias irão acontecer nos próximos dias.\"',
                '<32>* \"Logo, irei injetar isso no sujeito.\"',
                '<32>* \"Assim, nossa liberdade pode estar mais próxima do que nunca...\"'
            ],
            s_sc_drawer: [
                "<32>{#p/basic}* Tem um álbum de fotos aqui.",
                '<32>{#p/basic}* Dentro do álbum, tem fotos do Sans e da Alphys no Laboratório Real.',
                '<32>{#p/basic}* Fazendo experimentos, assistindo anime sci-fi...',
                '<32>{#p/basic}* Eles parecem felizes.'
            ],
            s_sc_diagram: () => [
                "<32>{#p/basic}* Na mesa, a um plano para drenar a força do escudo.",
                '<32>{#p/basic}* Na parede, existem diagramas de vários outros conceitos...',
                '<33>{#p/basic}* Um acessador temporal não linear, um estabilizador de abertura de buraco de minhoca e uma ALMA humana ligada a monstros.',
                ...(!SAVE.data.b.s_state_charasker
                    ? ((SAVE.data.b.s_state_charasker = true),
                        [
                            '<32>{#p/basic}* ... seria isso possível?\n* Uma ALMA monstro sobreviver junto de uma ALMA humano...?',
                            "<32>{#p/basic}* Mas a identidade do monstro seria perdida...",
                            '<32>{#p/basic}* ...'
                        ])
                    : ['<32>{#p/basic}* ...'])
            ],
            s_pr_papbed: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você aprecia a cama por ser muito incrível em geral.)']
                        : [
                            '<32>{#p/basic}* Uma cama de hipercarro bem feita.',
                            ...(roomready()
                                ? [
                                    "<18>{#p/papyrus}ESSA É MINHA CAMA!",
                                    '<18>{#f/4}SE ALGUM DIA EU CHEGAR A EXPLORAR AS ESTRELAS...',
                                    "<18>{#f/0}EU GOSTARIA DE DIRIGIR POR UMA PONTE INTERESTELAR.",
                                    '<18>VENTO NO MEU CABELO, LUZ NA MINHA PELE...',
                                    "<18>{#f/4}É CLARO, ISSO É SÓ UM SONHO.",
                                    '<18>{#f/0}ENTÃO, EM VEZ DISSO, EU VIAJO ENQUANTO COCHILO.'
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você agradece a cama por bem da hora de modo geral.)']
                        : ['<32>{#p/basic}* Uma cama de hipercarro bem feita.']
            ),
            s_pr_papbones: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? [
                            "<32>{#p/basic}* (Você alcança a caixa, mas os ossos não dão dano.)",
                            ...[
                                ['<25>{#p/asriel1}{#f/21}* Cuidado, Frisk!\n* Esses ossos ainda estão ativos...'],
                                ['<25>{#p/asriel1}{#f/16}* ... ou talvez não.'],
                                ["<25>{#p/asriel1}{#f/13}* Me pergunto se você é o tipo de pessoa que fica parado em carvão quente."],
                                ['<25>{#p/asriel1}{#f/8}* Carvão quente ossudo.']
                            ][Math.min(asrielinter.s_pr_papbones++, 3)]
                        ]
                        : [
                            '<32>{#p/basic}* Uma caixa de ossos.',
                            ...(roomready()
                                ? [
                                    '<18>{#p/papyrus}EI, ESSES SÃO TODOS OS ATAQUES QUE USEI EM VOCÊ.',
                                    '<18>BOAS MEMÓRIAS, HEIN?',
                                    '<18>PARECE ATÉ QUE FOI ONTEM...',
                                    SAVE.data.n.plot < 42.1
                                        ? '<18>{#f/4}MESMO QUE TENHA ACABADO DE ACONTECER.'
                                        : '<18>{#f/4}MESMO QUE TENHA ACONTECIDO HOJE MAIS CEDO.'
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            "<32>{#p/basic}* (Você alcança a caixa, mas os ossos não dão dano.)",
                            ...[
                                [],
                                ['<25>{#p/asriel1}{#f/16}* ... ou talvez não.'],
                                ["<25>{#p/asriel1}{#f/13}* Me pergunto se você é o tipo de pessoa que fica parado em carvão quente."],
                                ['<25>{#p/asriel1}{#f/8}* Carvão quente ossudo.']
                            ][Math.min(asrielinter.s_pr_papbones++, 3)]
                        ]
                        : ['<32>{#p/basic}* Uma caixa de ossos.']
            ),
            s_pr_papcloset: pager.create(
                0,
                () => [
                    '<32>{#p/human}* (Você olha dentro do closet...)',
                    ...(SAVE.data.b.svr
                        ? ["<32>{#p/human}* (É difícil enxergar em um lugar tá escuro.)"]
                        : !world.runaway
                            ? ['<32>{#p/basic}* As roupas dentro estão super trocadas.']
                            : [
                                '<32>{#p/basic}* As roupas estão jogadas lá dentro.',
                                SAVE.data.n.plot === 72
                                    ? '<32>* Uma das roupas tem \"Ossos livres\" escrito nela.'
                                    : '<32>* Muitas das roupas tem textos escritos a mão.'
                            ]),
                    ...(roomready()
                        ? [
                            "<18>{#p/papyrus}NÃO SE PREOCUPE, O ARMÁRIO É LIVRE DE ESQUELETOS.",
                            "<18>{#f/4}A NÃO SER QUE EU ESTEJA ME TROCANDO, CLARO."
                        ]
                        : [])
                ],
                () => [
                    '<32>{#p/human}* (Você olha dentro do closet...)',
                    ...(SAVE.data.b.svr
                        ? ["<32>{#p/human}* (É difícil enxergar em um lugar tá escuro.)"]
                        : !world.runaway
                            ? ['<32>{#p/basic}* As roupas dentro estão super trocadas.']
                            : [
                                '<32>{#p/basic}* As roupas estão jogadas lá dentro.',
                                SAVE.data.n.plot === 72
                                    ? '<32>* Uma das roupas tem \"Ossos livres\" escrito nela.'
                                    : '<32>* Muitas das roupas tem textos escritos a mão.'
                            ])
                ]
            ),
            s_pr_papposter: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? [
                            [
                                "<25>{#p/asriel1}{#f/17}* Ah.\n* Esse é o ataque especial do Papyrus...",
                                '<25>{#f/13}* Em linhas do tempo anteriores, este ataque...',
                                '<25>{#f/15}* Me fez perder algumas batalhas.',
                                "<25>{#f/16}* ... não pergunte como ou porque eu estava lutando contra o Papyrus."
                            ],
                            ["<25>{#p/asriel1}{#f/10}* Que?\n* Não era nada ruim.\n* Não daquela vez, pelo menos."],
                            [
                                '<25>{#p/asriel1}{#f/16}* Tá bom, tá bom.\n* Eu posso ter me fantasiado de humano.',
                                '<25>{#f/15}* ... é.\n* Era um disfarce bem podre.',
                                '<25>{#f/5}* Mas ei, eu tive a chance de lutar contra o grande Papyrus!'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* Valeu a pena.']
                        ][Math.min(asrielinter.s_pr_papposter++, 3)]
                        : [
                            "<32>{#p/basic}* É uma bandeira com uma caveira pintada nela.",
                            ...(roomready()
                                ? [
                                    "<18>{#p/papyrus}ESSE POSTER NÃO É TOPISSIMO?",
                                    '<18>UNDYNE ENCONTROU ENQUANTO CATAVA LIXO.',
                                    '<18>{#f/4}TINHA UMA CAVEIRA E OSSOS CRUZADOS NO INÍCIO...',
                                    '<18>{#f/9}MAS EU PENSEI EM ALGO MELHOR!'
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            [],
                            ["<25>{#p/asriel1}{#f/10}* Que?\n* Não era nada ruim.\n* Não daquela vez, pelo menos."],
                            [
                                '<25>{#p/asriel1}{#f/16}* Tá bom, tá bom.\n* Eu posso ter me fantasiado de humano.',
                                '<25>{#f/15}* ... é.\n* Era um disfarce bem podre.',
                                '<25>{#f/5}* Mas ei, eu tive a chance de lutar contra o grande Papyrus!'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* Valeu a pena.']
                        ][Math.min(asrielinter.s_pr_papposter++, 3)]
                        : ["<32>{#p/basic}* É uma bandeira com uma caveira pintada nela."]
            ),
            s_pr_paptable: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você se maravilha com os detalhes dessas figuras de ação...)']
                        : [
                            '<32>{#p/basic}* Um conjunto de bonecos de ação com uniformes cafonas e combinando.',
                            ...(roomready()
                                ? [
                                    '<18>{#p/papyrus}AH, SIM, FIGURAS DE AÇÃO.',
                                    '<18>UMA REFERÊNCIA PARA CENÁRIOS DE BATALHAS-FAKE.',
                                    '<18>{#f/4}MAS COMO EU TENHA TANTAS?',
                                    '<18>{#f/6}BEM, HMM...\nO REI ME DEU ELAS DE PRESENTE...',
                                    '<18>{#f/5}UM PRESENTE DO QUAL GOSTARIA DE PODER PAGÁ-LO.'
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Através do reflexo, você percebe quem criou esses.)']
                        : ['<32>{#p/basic}* Um conjunto de bonecos de ação com uniformes cafonas e combinando.']
            ),
            s_puzzle1_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal descreve o básico para resolver o quebra-cabeça.)']
                    : ['<32>{#p/basic}* \"Aperte cada circuito em ordem.\"'],
            s_puzzle2_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal descreve um ponto de início para resolver o quebra-cabeça.)']
                    : ['<32>{#p/basic}* \"Comece pela esquerda.\"'],
            s_puzzle3_note: () =>
                SAVE.data.b.svr
                    ? world.postnoot && world.nootflags.has('s_puzzle3') // NO-TRANSLATE

                        ? [
                            "<32>{#p/human}* (Alguém se gaba de ter resolvido um quebra-cabeça com antecedência.)",
                            ...[
                                ['<25>{#p/asriel1}{#f/20}* Ha, uh, me pergunto quem escreveu isso?\n* É...'],
                                ["<25>{#p/asriel1}{#f/20}* Não deve ter sido eu!"],
                                ['<25>{#p/asriel1}{#f/13}* ...']
                            ][Math.min(asrielinter.s_puzzle3_note++, 2)]
                        ]
                        : ['<32>{#p/human}* (A nota descreve como a solução do quebra-cabeça não foi modificada.)']
                    : world.postnoot && world.nootflags.has('s_puzzle3') // NO-TRANSLATE

                        ? [
                            [
                                "<32>{#p/basic}* É uma nota de alguém que não disse quem é...",
                                '<32>* \"Quebra-cabeças assim podem ser tão chatos, não é?\"',
                                '<32>* \"Felizmente, eu cuidei desse pra você.\"',
                                '<32>* \"Não é legal?\"\n* \"Você deveria me agradecer!\"',
                                '<#32>  - \"Sinceramente,\"\n  Seu Melhor Amigo'
                            ],
                            [
                                "<32>{#p/basic}* É uma nota de alguém que não disse quem é...",
                                '<32>* \"Não se preocupe.\"\n* \"Não importa quantas vezes você faça isso de novo...\"',
                                '<32>* \"Eu estarei aqui para ter certeza que você não precise mais lidar com isso de novo.\"',
                                '<32>* \"É o mínimo que posso fazer.\"',
                                '<#32>  - \"Para Sempre,\"\n  Seu Melhor Amigo'
                            ]
                        ][Math.min(SAVE.flag.n.neutral_twinkly_loop1, 1)]
                        : !world.genocide && world.edgy
                            ? [
                                "<32>{#p/basic}* É uma nota do Sans...",
                                '<32>{#p/without}* \"bom.\"\n* \"parece que meu irmão descobriu sobre você.\"',
                                '<32>* \"eu falei pra ele sobre tudo que você fez até agora, e ele concordou em se esconder.\"',
                                '<32>* \"é paia, não é?\"',
                                '<32>* \"papyrus não deveria ter que lidar com esse tipo de parada.\"',
                                '<32>* \"mas acho que essa é a galáxia em que vivemos, agora.\"',
                                '<32>* \"bem.\n* boa sorte com o quebra-cabeça.\"',
                                '<32>* \"tenho certeza que não vai te tomar muito tempo.\"',
                                '<#32>  - \"com todo o respeito,\"\n  sans'
                            ]
                            : [
                                "<32>{#p/basic}* É uma nota do Papyrus...",
                                '<23>{#p/papyrus}{#f/30}\"HUMANO!! ESSE QUEBRA-CABEÇA NÃO É O QUE PARECE.\"',
                                '<23>\"ENQUANTO ESPERAVA POR VOCÊ, TENTEI MODIFICÁ-LO...\"',
                                '<23>\"PARA FAZER O PADRÃO PARECIDO COM MINHA FACE, É CLARO!\"',
                                '<23>\"MAS ALGO DEU ERRADO...\"',
                                '<23>\"TUDO QUE EU CONSEGUI CRIAR FOI UM FORMATO DE ARCO TODO ERRADO!!!\"',
                                '<23>\"(EM OUTRAS PALAVRAS, VOCÊ VAI TER QUE RESOLVER POR CONTA.)\"',
                                '<23>\"NAS NÃO SE PREOCUPE!\"\n\"EU SEI QUE VOCÊ CONSEGUE, HUMANO!\"',
                                '<#23>  - \"COM MUITA ESPERANÇA,\"\n  PAPYRUS'
                            ],
            s_redbook: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O livro unicamente colorida descreve uma arma secreta perdida no tempo.)']
                    : [
                        "<32>{#p/basic}* É uma prateleira.",
                        '<32>{#p/human}* (Você pega o livro vermelho...)',
                        '<32>{#p/basic}* \"No ápice da guerra, uma divisão real secreta foi estabelecida.\"',
                        '<32>{#p/basic}* \"A chamada divisão de \'armas especiais\', focada em pesquisa experimental.\"',
                        '<32>{#p/basic}* \"A divisão desenvolveria muitos artefatos, mas todos inúteis em batalha...\"',
                        '<32>{#p/basic}* \"Todos menos um.\"\n* \"Um tomo encantado conhecido como \'A Epifania.\'\"',
                        '<32>{#p/basic}* \"Seu poder era tão grande, que foi perigoso demais para ser usado contra os humanos.\"',
                        '<32>{#p/basic}* \"O tomo foi trancado por dentro e guardado em pouco tempo.\"',
                        '<32>{#p/basic}* \"Alguns dizem que o tomo foi transportado por uma nave até o Outpost.\"',
                        '<32>{#p/basic}* \"Se sim, onde ele está?\"\n* \"E como seria para destrancar?\"',
                        '<32>{#p/basic}* \"Talvez essas perguntas sejam melhores ficar sem respostas.\"',
                        '<32>{#p/human}* (Você põe o livro de volta no lugar.)'
                    ],
            s_sansbox: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Por estar muito cheia, você não consegue ver dentro da caixa de email.)"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? [
                            '<32>{#p/basic}* Que alguma forma, encheram ainda mais essa caixa de email.',
                            ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... cor me surpreendeu.'])
                        ]
                        : [
                            "<32>{#p/basic}* É uma caixa de correio transbordando de lixo eletrônico não lido.",
                            ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... ele nunca lê as correspondências mesmo.'])
                        ],
            s_sheddoor: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não achou um caminho para dentro.)"]
                    : ["<32>{#p/basic}* Está trancada por dentro."],
            s_slew: ["<32>{#p/basic}* É comida de cachorro.\n* Os pedaços parecem ossos."],
            s_spagnote: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A nota declara o brilho de seduzi-lo com um lugar de espaguete.)']
                    : !world.genocide && world.edgy
                        ? [
                            "<32>{#p/basic}* É uma nota do Sans...",
                            '<32>{#p/without}* \"oops.\"\n* \"Parece que você encontrou o espaguete do meu irmão.\"',
                            '<32>* \"parece gostoso, certo?\"',
                            '<32>* \"bem.\"\n* \"esse é meio que o ponto.\"',
                            '<32>* \"eu teria cuidado com isso se fosse você...\"',
                            '<32>* \"porque quanto mais tempo você perde tentando pegar...\"',
                            '<32>* \"Mais tempo eu tenho para preparar o próximo quebra-cabeça.\"',
                            '<#23>  \"boa sorte,\"\n  sans'
                        ]
                        : [
                            "<32>{#p/basic}* É uma nota do Papyrus...",
                            '<23>{#p/papyrus}{#f/30}\"HUMANO!!\"\n\"POR FAVOR APRECIE ESTE ESPAGUETE.\"',
                            '<23>(\"MAL SABE VOCÊ, MAS ESTE ESPAGUETE É UM ARMADILHA...)',
                            '<23>(\"DESTINADO PARA TE FAZER PERDER TEMPO!!!\")',
                            '<23>(\"VOCÊ VAI ESTAR TÃO OCUPADO TENANDO ALCANÇAR...\")',
                            '<23>(\"QUE NÃO IRÁ PERCEBER QUE NÃO ESTÁ FAZENDO PROGRESSO!!\")',
                            '<23>(\"TOTALMENTE DRIBLADO PELO GRANDE PAPYRUS!!!\")',
                            '<#23>  \"NYEH-HEH-HEH,\"\n  PAPYRUS'
                        ],
            s_town_camera1: () =>
                SAVE.data.b.svr
                    ? []
                    : world.runaway
                        ? [
                            "<32>{#p/basic}* Não há mais ninguém para espionar você através da câmera escondida nessas cápsulas de cristal."
                        ]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* Não a mais nenhuma câmera nestes cristais."]
                            : ["<32>{#p/basic}* Tem uma câmera escondida nestes cristais."],
            s_trapnote: () =>
                [
                    [
                        "<32>{#p/basic}* É uma nota do Papyrus...",
                        '<23>{#p/papyrus}{#f/30}\"DESCULPE, EU TENHO QUE TE PRENDER NA SALA DE CONVIDADOS ATÉ A UNDYNE CHEGAR.\"',
                        '<23>\"SINTA-SE LIVRE PARA SE SENTIR EM CASA!!!\"',
                        '<22>\"REFRESCOS E ACOMODAÇÕES FORAM PROVIDENCIADAS.\"',
                        '<#23>  \"NYEHESPERADAMENTE,\"\n  PAPYRUS'
                    ],
                    [
                        "<32>{#p/basic}* É uma nota do Papyrus...",
                        '<23>{#p/papyrus}{#f/30}\"POR FAVOR, PERGUNTE ANTES DE ESCAPAR!!!\"',
                        '<23>\"QUANDO VOCÊ SOME EU FICO SUPER PREOCUPADO!!!\"',
                        '<#23>  \"SUPER ESQUELETAMENTE,\"\n  PAPYRUS'
                    ],
                    [
                        "<32>{#p/basic}* É uma nota do Papyrus...",
                        '<23>{#p/papyrus}{#f/30}\"SE VOCÊ ESTIVER PROCURANDO PARA UM LUGAR PARA FICAR...\"',
                        '<23>\"SÓ PERGUNTE!!! NÃO PRECISA LUTAR COMIGO!!!\"',
                        '<#23>  \"SEU ANCIÃO,\"\n  PAPYRUS'
                    ]
                ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 2)],
            s_tree: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? [
                            [
                                '<25>{#p/asriel1}{#f/20}* $(name) gostava de chamar esta colônia de formigas de \"civilização.\"',
                                '<25>{#f/17}* Eu acho que era a forma dele de parecer inteligente.',
                                '<25>{#f/13}* Eu já tentei parecer inteligente também, mas a mãe e o pai são mais.',
                                '<25>{#f/13}* $(name) sempre foi bem melhor do que eu em mentir...'
                            ],
                            [
                                '<26>{#p/asriel1}{#f/13}* Após $(name) chegar, ele tentou me convencer de que era um diplomata.',
                                "<25>{#f/17}* Felizmente, até mesmo ele não pode mentir TÃO bem.",
                                "<25>{#f/15}* Imagine o quão ruim isso poderia ter sido se tivessem acreditado nele..."
                            ],
                            [
                                "<26>{#p/asriel1}{#f/17}* Fico feliz que você não seja mentiroso, Frisk.",
                                "<25>{#f/13}* Eu já tive desonestidade demais na minha vida.",
                                '<25>{#f/20}* ... desculpa.\n* Acho que isso veio meio fora da curva.'
                            ],
                            ['<26>{#p/asriel1}{#f/15}* A vida gosta muito de jogar bolas curvadas as vezes...']
                        ][Math.min(asrielinter.s_tree++, 3)]
                        : world.darker
                            ? ["<32>{#p/basic}* Não tem nada de especial em relação a essa estrutura de árvore."]
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}* Cedo o suficiente, essa civilização vai emigrar mais uma vez.',
                                    '<32>* Onde irão?\n* Cedo ou tarde saberemos.'
                                ]
                                : [
                                    '<32>{#p/basic}* Essa estrutura parecida com árvore é na verdade a casa de uma civilização.',
                                    '<32>* Na beira de extinção, eles migraram para cá, salvando sua espécie.'
                                ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            [],
                            [
                                '<26>{#p/asriel1}{#f/13}* Após $(name) chegar, ele tentou me convencer de que era um diplomata.',
                                "<25>{#f/17}* Felizmente, até mesmo ele não pode mentir TÃO bem.",
                                "<25>{#f/15}* Imagine o quão ruim isso poderia ter sido se tivessem acreditado nele..."
                            ],
                            [
                                "<26>{#p/asriel1}{#f/17}* Fico feliz que você não seja mentiroso, Frisk.",
                                "<25>{#f/13}* Eu já tive desonestidade demais na minha vida.",
                                '<25>{#f/20}* ... desculpa.\n* Acho que isso veio meio fora da curva.'
                            ],
                            ['<26>{#p/asriel1}{#f/15}* A vida gosta muito de jogar bolas curvadas as vezes...']
                        ][Math.min(asrielinter.s_tree++, 3)]
                        : world.darker
                            ? ['<32>{#p/basic}* ...']
                            : SAVE.data.n.plot === 72
                                ? ["<32>{#p/basic}* Não se preocupe. \n* Eles irão encontrar o próprio caminho."]
                                : ["<32>{#p/basic}* Dica de profissional...\n* Não balance a árvore."]
            ),
            doginfo: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Os petiscos fr cachorro dentro parecem ter sido devorados.)']
                    : SAVE.data.n.state_starton_doggo === 2 || SAVE.data.n.plot > 27
                        ? SAVE.data.b.oops
                            ? ['<32>{#p/basic}* Um pacote meio vazio de lanche para cachorros.']
                            : ["<32>{#p/basic}* Dentro a uma monte de comidas para cachorro. Está meio cheio."]
                        : [
                            SAVE.data.n.state_starton_doggo === 3
                                ? '<32>{#p/basic}* Dentro a um cachorro de guarda dormindo.\n* Ele não consegue te ver.'
                                : '<32>{#p/basic}* Dentro a um cachorro de guarda bem confuso.\n* Ele não pode te ver.'
                        ]
        },
        truetext: {
            doggo1: ['<32>{#p/basic}* Petisco pra cachorro?\n* Esse cachorro precisa de um petiscoterapeuta.'],
            doggo2: ['<32>{#p/basic}* Legal, huh?', "<33>{#p/basic}* Agora estamos chegando a algum lugar..."],
            dogs1: ['<32>{#p/basic}* As coisas que fazemos pelo bem dos caninos.'],
            dogs2: ['<33>{#p/basic}* A chave enferrujada ataca novamente.'],
            fetch: () =>
                [
                    ['<32>{#p/basic}* Legal, huh?', "<33>{#p/basic}* Agora estamos chegando a algum lugar..."],
                    ["<32>{#p/basic}* Isso é dois por dois no método da chave enferrujada.", '<32>{#p/basic}* O que mais de novo?'],
                    ["<32>{#p/basic}* Wow, você não pode continuar se livrando assim!"]
                ][SAVE.data.n.state_starton_latefetch++],
            great1: [
                "<32>{#p/basic}* Aww, isso foi fofo!",
                "<32>{#p/basic}* É um fato provado que este cachorrinho tem beijos incríveis."
            ],
            great2: [
                '<32>{#p/basic}* A unidade canina inteira, vencida com nada além de um pedaço de pau.',
                '<32>* A loucura fala por si.'
            ],
            great3: ['<32>{#p/basic}* O que acabou de acontecer?'],
            lesser1: ['<32>{#p/basic}* Palavras misteriosas sobre o crescimento de pescoços agora fazem sentido.'],
            lesser2: [
                "<32>{#p/basic}* Isso é dois por dois no método da chave enferrujada.",
                '<32>{#p/basic}* O que mais de novo?'
            ],
            papyrus1: [
                '<32>{#p/basic}* Papyrus é bem conhecido por seu espaguete.',
                "<32>* O que não é tão conhecido é que ele usa receita dos humanos.",
                '<32>* Um erro honesta da sua, uh, \"instrutora de cozinha\", mas...',
                '<32>* Tirando ele, apenas humanos gostariam da receita.',
                '<32>* A ironia está fora de cogitação.'
            ],
            papyrus3: ['<32>{#p/basic}* É isso...', "<32>* Você está prestes a treinar com o esqueleto mais legal da cidade."],
            papyrus4: [
                '<32>{#p/basic}* Ele pode estar esperando sua vida toda por este momento...',
                "<32>* Se eu fosse você, não deixaria essa oportunidade se perder."
            ],
            papyrus5: ["<32>{#p/basic}* Não temas.", "<32>* Com sorte, vocês serão melhores amigos em poucos segundos."],
            puzzle1: () =>
                SAVE.data.b.svr
                    ? ["<25>{#p/asriel1}{#f/20}* Nada mal, Frisk.\n* Não sabia que você era especialista em matemática..."]
                    : ['<32>{#p/basic}* Wow.\n* Você resolveu?'],
            sans3: ['<32>{#p/basic}* Você tentou.'],
            sans4: ['<32>{#p/basic}* Você já fez isso antes...?'],
            sans5: ['<32>{#p/basic}* Sério, Sans?\n* Esse \"desafio\" nem valia a pena olhar pra ele.'],
            sans6: ['<32>{#p/basic}* Sério, Sans?\n* Esse \"quebra-cabeça\" era impossível.'],
            sans7: ['<32>{#p/basic}* Bem, isso foi anti-climativo.'],
            sans8: ["<32>{#p/basic}* Eu estou tão confuso quanto você."],
            sans9: ['<32>{#p/basic}* Oh, qual foi!\n* Eu queria ver aquilo em ação!', '<32>* ... oh bem...'],
            papdate: () => [
                '<32>{#p/basic}* Então... Papyrus, huh?',
                SAVE.data.n.plot > 64.1
                    ? '<32>* Depois de todo esse tempo, vocês finalmente se tornaram amigos.'
                    : '<32>* De alguma forma eu já imaginava que isso aconteceria.',
                '<32>* ...\n* Eu assisti aquele esqueleto crescer aqui...',
                '<32>* Sempre dando um bom exemplo para aqueles próximos dele...',
                '<32>* ... e pra mim.',
                "<32>* É triste eu não poder dizer isso para ele por conta própria.",
                "<32>* Mas tudo bem.",
                '<32>* Ver vocês dois se dando bem meio que cobre isso.'
            ]
        },
        vegetoid: pager.create(
            0,
            () => [
                SAVE.data.n.plot === 72
                    ? '<32>{#p/basic}* Eu ouvi dizer que o táxi vai continuar aí quando todo mundo for embora do Outpost.'
                    : world.population === 0
                        ? '<32>{#p/basic}* Ouvi dizer que o táxi vai continuar aí quando todo mundo for embora.'
                        : "<32>{#p/basic}* Eu ouvi dizer que o táxi não come vegetais.",
                '<33>{#p/basic}* Seria ele um monstro de verdade...?'
            ],
            () => [
                SAVE.data.n.plot === 72
                    ? "<32>{#p/basic}* Um monstro de verdade não hesitaria em meter o pé desse inferno."
                    : world.population === 0
                        ? '<32>{#p/basic}* ...'
                        : '<32>{#p/basic}* Monstros de verdade sempre comem seus vegetais.'
            ]
        ),
        vegetoidx: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você não consegue encontrar ninguém aí.)"]
                : world.bulrun
                    ? ['<32>{#p/basic}* ... mas todo mundo correu.']
                    : ['<32>{#p/basic}* ... mas ninguém veio.'],
        xtowerHiscoreNames: {
            kidd: 'UNDYNEFAN10',
            napstablook: 'NAPSTABLOOK22',
            papyrus: 'COOLSKELETON95',
            sans: 'lazybones.',
            undyne: 'STRONGFISH91',
            you: '(Desconhecido)'
        },
        xtowerMessage1: 'Novo RECORDE!',
        xtowerMessage2: 'Mais sorte da próxima vez...',
        xtowerMessage3: 'Obrigado Por Jogar!',
        xtowerSans: () =>
            world.genocide
                ? [
                    '<32>{#p/event}* Ring, ring...',
                    "<32>{#p/alphys}* Então... matar ele não foi b-bom o suficiente, huh?",
                    '<32>* Você tinha que ir lá e derrota-lo no meu... jogo estúpido...',
                    '<32>* Ehehe...',
                    "<32>* Você é nojento...",
                    '<32>* ...',
                    '<32>{#s/equip}{#p/human}* (Você perdeu todo seu G.)',
                    ...(world.goatbro
                        ? SAVE.flag.n.genocide_milestone < 5
                            ? SAVE.flag.n.ga_asrielXtower++ < 1
                                ? ["<25>{#p/asriel2}{#f/10}* Ousados hoje, estamos?"]
                                : []
                            : SAVE.flag.n.genocide_milestone < 6
                                ? SAVE.flag.n.ga_asrielAlphysCom2++ < 1
                                    ? ["<25>{#p/asriel2}{#f/1}* Agora ESSA é a Alphys que eu gosto de ver."]
                                    : []
                                : SAVE.flag.n.ga_asrielAlphysCom5++ < 1
                                    ? ["<25>{#p/asriel2}{#f/4}* Infelizmente isso não vai salva-la da morte."]
                                    : []
                        : [])
                ]
                : [
                    '<32>{#p/event}* Ring, ring...',
                    '<25>{#p/sans}* você realmente colocou todo esse esforço em quebrar meu recorde?',
                    "<25>{#f/3}* wow.\n* você é ainda mais competitivo que meu irmão.",
                    ...(SAVE.data.n.state_starton_papyrus === 1
                        ? [
                            '<25>{#f/3}* ...',
                            "<25>{*}{#p/darksans}{#f/1}{#i/5}{#s.stop}* Uma droga que ele esteja morto, huh?",
                            '{*}{#s.resume}{%}'
                        ]
                        : [
                            SAVE.data.n.plot === 72
                                ? "<25>{#f/0}* eu te daria uma premiação, mas eu ainda estou procurando por toriel."
                                : "<25>{#f/0}* eu te daria um prêmio, mas estou no meu descanso agora.",
                            ...(world.edgy_x
                                ? ['<25>{#f/0}* sem ressentimentos.', '<32>{#s/equip}{#p/event}* Click...']
                                : [
                                    "<25>{#f/2}* invés disso, eu vou só te mandar uma grana.",
                                    '<32>{#s/equip}{#p/human}* (Você ganhou 10000G.)'
                                ])
                        ])
                ],
        xtowerAsriel: [
            '<25>{#p/asriel1}{#f/13}* ... você bateu o recorde?',
            '<25>{#f/17}* Wow.\n* eu te subestimei.',
            '<25>{#f/20}* Bem fera, Frisk.'
        ],
        xtowerScore: 'Score: $(x)'
    },

    b_group_starton: {
        dogs: () => (world.goatbro ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.'] : ['<32>{#p/story}* Dogi te ataca!']),
        spacetopJerry: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Chapéus cafonas e amigos inconstantes.']
                : ['<32>{#p/story}* Astro Serf entra!\n* Jerry também veio.'],
        stardrakeSpacetop: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* O esquadrão de adolescentes imbecis.']
                : SAVE.data.b.s_state_chilldrake
                    ? ['<32>{#p/story}* Chilldrake e Astro Serf posam como caras mais.']
                    : ['<32>{#p/story}* Stardrake e Astro Serf posam como caras mais.'],
        stardrakeSpacetop2a: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Um sobrando.']
                : SAVE.data.b.s_state_chilldrake
                    ? ['<32>{#p/story}* Chilldrake está em pé.']
                    : ['<32>{#p/story}* Stardrake está em pé.'],
        stardrakeSpacetop2b: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Um sobrando.'] : ['<32>{#p/story}* Astro Serf está em pé.'],
        stardrakeSpacetop2c: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Um sobrando.'] : ['<32>{#p/story}* Apenas Astro agora.'],
        stardrakeSpacetop2d: () => (world.goatbro ? ['<32>{#p/asriel2}* Jerry.'] : ['<32>{#p/story}* Jerry.']),
        stardrakeSpacetopJerry: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* O esquadrão de adolescentes idiotas e também o Jerry.']
                : SAVE.data.b.spared_jerry
                    ? ['<32>{#p/story}* Jerry e amigos!']
                    : SAVE.data.b.s_state_chilldrake
                        ? ['<32>{#p/story}* Astro Serf e Chilldrake entram em confronto com você.\n* Jerry.']
                        : ['<32>{#p/story}* Astro Serf e Stardrake confrontam você.\n* Jerry.'],
        stardrakeSpacetopJerry2a: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dois restando.']
                : SAVE.data.b.s_state_chilldrake
                    ? ['<32>{#p/story}* Astro Serf e Chilldrake estão fortes.']
                    : ['<32>{#p/story}* Astro Serf e Stardrake estão firmes.'],
        stardrakeSpacetopJerry2b: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Dois restando.'] : ['<32>{#p/story}* Astro Serf permanece firme.\n* Jerry.'],
        stardrakeSpacetopJerry2c: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dois restando.']
                : SAVE.data.b.s_state_chilldrake
                    ? SAVE.data.b.spared_jerry
                        ? ['<32>{#p/story}* Chilldrake e Jerry permanecem firme!']
                        : ['<32>{#p/story}* Chilldrake permanece firme.\n* Jerry.']
                    : SAVE.data.b.spared_jerry
                        ? ['<32>{#p/story}* Stardrake e Jerry permanecem firme!']
                        : ['<32>{#p/story}* Stardrake permanece firme.\n* Jerry.']
    },

    b_opponent_stardrake: {
        act_check: () =>
            world.goatbro
                ? SAVE.data.b.s_state_chilldrake
                    ? [
                        '<32>{#p/asriel2}* Chilldrake, o rebelde adolescente.\n* Nada mais inútil do que um rebelde sem causa.'
                    ]
                    : [
                        '<32>{#p/asriel2}* Stardrake, o comediante. Uma grande piada que ele mesmo jamais imaginaria conseguir contar.'
                    ]
                : SAVE.data.b.s_state_chilldrake
                    ? ['<33>{#p/story}* CHILLDRAKE - ATQ 12 DEF 7\n* Rebeldes contra tudo!!\n* São incríveis.']
                    : ['<32>{#p/story}* STARDRAKE - ATQ 12 DEF 7\n* Esse comediante jovem continua lutando para ter uma audiência.'],
        act_check2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebeldes contra tudo!!\n* Procurando por uma saída.']
                : ["<32>{#p/story}* STARDRAKE - ATQ 12 DEF 7\n* Este adolescente não está aceitando sua piada muito bem."],
        act_check3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* CHILLDRAKE - ATQ 12 DEF 7\n* Rebeldes contra tudo!!\n* Principalmente flerte!!']
                : ['<32>{#p/story}* STARDRAKE - ATK 12 DEF 7\n* Flertar não é piada para este comediante.'],
        act_check4: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* CHILLDRAKE - ATQ 12 DEF 7\n* A rebelião está se esvaindo...']
                : ['<32>{#p/story}* STARDRAKE - ATQ 12 DEF 7\n* As coisas estão parece do boas para este jovem comediante.'],
        act_flirt: () => ['<32>{#p/human}* (Você faz uma piada romântica.)'],
        flirtTalk1: ["<08>{#p/basic}{~}Você é estranho."],
        flirtTalk2: ["<08>{#p/basic}{~}Você é mau e estranho."],
        genoStatus: () =>
            SAVE.data.b.s_state_chilldrake ? ['<32>{#p/asriel2}* Chilldrake.'] : ['<32>{#p/asriel2}* Stardrake.'],
        heckleStatus: () =>
            world.goatbro
                ? SAVE.data.b.s_state_chilldrake
                    ? ['<32>{#p/asriel2}* Chilldrake.']
                    : ['<32>{#p/asriel2}* Stardrake.']
                : SAVE.data.b.s_state_chilldrake
                    ? ['<32>{#p/story}* Chilldrake está inchado...']
                    : ['<32>{#p/story}* Stardrake está inchado...'],
        heckleTalk1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Não!!\nEste é o caminho!']
                : ["<08>{#p/basic}{~}ISSO também não vai ser engraçado!"],
        heckleTalk2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Lei imunda.']
                : ['<08>{#p/basic}{~}Sua carne está podre como você?'],
        heckleTalk3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ["<08>{#p/basic}{~}O desafio não pode ser desafiado!"]
                : ['<08>{#p/basic}{~}(Insultando o humano)'],
        heckleText1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/human}* (Você denuncia Chilldrake por sua causa.)']
                : ['<32>{#p/human}* (Você assusta Stardrake.)'],
        heckleText2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/human}* (Você diz a Chilldrake que ele deveria se rebelar em outro lugar.)']
                : ["<32>{#p/human}* (Você diz a Stardrake que ele não é muito engraçado.)"],
        heckleText3: () =>
            SAVE.data.b.s_state_chilldrake
                ? [
                    '<32>{#p/human}* (Você zomba de Chilldrake por protestar no meio do nada.)',
                    '<32>{#p/basic}* Chilldrake aceita sua zombaria como conselho e sai para a cidade...'
                ]
                : [
                    '<32>{#p/human}* (Você diz a Stardrake que ninguém jamais vai ama-lo do jeito que ele é.)',
                    '<32>{#p/basic}* Stardrake se esforça para fazer uma réplica e foge totalmente destruído...'
                ],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Próximo da morte.']
                : SAVE.data.b.s_state_chilldrake
                    ? ['<32>{#p/story}* Chilldrake está se desfazendo.']
                    : ['<32>{#p/story}* Stardrake está se desfazendo.'],
        idleTalk1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Escovar os dentes?\nSem chances!']
                : ['<08>{#p/basic}{~}Tenta não pegar muito \"espaço\"...'],
        idleTalk2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Sem hora de dormir para este pássaro!']
                : ['<08>{#p/basic}{~}Eu estou apenas na minha \"fase\" da lua'],
        idleTalk3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Quem precisa de pais mesmo!?']
                : ['<08>{#p/basic}{~}Não vejo minha casa a \"anos luz...\"'],
        idleTalk4: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Viva feliz e livre!']
                : ['<08>{#p/basic}{~}Oh, está ligado.\n\"Táqui ó.\"'],
        idleTalk5: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Ninguém me diz o que FAZER!']
                : ['<08>{#p/basic}{~}Quer lutar?\nVai ver \"estrelinhas.\"'],
        idleTalk6: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Autoridade deve ser merecida!']
                : ['<08>{#p/basic}{~}Não arruína a minha \"atmosfera\"'],
        idleTalk7: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Aparar minhas garras?\nDe jeito nenhum!']
                : ['<08>{#p/basic}{~}Não é de graça, é \"zero G\"'],
        jokeStatus: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* Chilldrake está perdendo fé em sua rebelião.']
                : ['<32>{#p/story}* Stardrake está abismado com essa piada \"estelar.\"'],
        jokeTalk0: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Pelo menos você admite.']
                : ["<08>{#p/basic}{~}Não era pra ser engraçado!"],
        jokeTalk1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ["<08>{#p/basic}{~}Você não sabe minha causa!"]
                : ["<08>{#p/basic}{~}Do que VOCÊ tá rindo?"],
        jokeTalk2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Você...\nrealmente...']
                : ['<08>{#p/basic}{~}Tá vendo!?\nPiadas!\nMamãe estava certa!'],
        jokeTalk3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ["<08>{#p/basic}{~}Eu não acho que você..."]
                : ["<08>{#p/basic}{~}Valeu, você é incrível."],
        jokeTalk4: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Pra te dizer a verdade.']
                : ['<08>{#p/basic}{~}Você tem bom gosto!!'],
        jokeText0: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/human}* (Você concorda com Chilldrake.)']
                : ["<32>{#p/human}* (Você ri da observação de Stardrake.)"],
        jokeText1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ["<32>{#p/human}* (Mas ele não disse nada para você concordar.)"]
                : ["<32>{#p/human}* (Mas ele não disse nada legal pra você rir.)"],
        jokeText2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/human}* (Você concorda com Chilldrake.)']
                : ["<32>{#p/human}* (Você ri da piada do Stardrake.)"],
        jokeText3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/human}* (Você concorda duplamente com as falas de Chilldrake.)']
                : ["<32>{#p/human}* (Você continua rindo das piadas do Stardrake.)"],
        name: () => (SAVE.data.b.s_state_chilldrake ? '* Chilldrake' : '* Stardrake'),
        punTalk1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Apenas o Starry consegue fazer isso.']
                : ["<08>{#p/basic}{~}É pra isso ser legal?"],
        punTalk2: () =>
            SAVE.data.b.s_state_chilldrake ? ["<08>{#p/basic}{~}Você não é o Starry."] : ['<08>{#p/basic}{~}Ha.. Ha..'],
        punTalk3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<08>{#p/basic}{~}Para de copiar meus amigos.']
                : ["<08>{#p/basic}{~}Eu já escutei isso."],
        punText1: ['<32>{#p/human}* (Você faz uma piada especial.)'],
        randStatus1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* Chilldrake está se perguntando onde Starry foi.']
                : ['<32>{#p/story}* Stardrake está avaliando a multidão.'],
        randStatus2: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* Chilldrake está dando uma palestra sobre anarquia.']
                : ['<32>{#p/story}* Stardrake está praticando sua próxima piada.'],
        randStatus3: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* Chilldrake inicia um motim de um monstro.']
                : ['<32>{#p/story}* Stardrake está dando risada só de pensar na sua próxima piada.'],
        randStatus4: () => ['<32>{#p/story}* Cheira a almofadas molhadas.'],
        randStatus5: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* Cheira a spray corporal.']
                : ['<32>{#p/story}* Stardrake suspira de alívio, seu próprio nome não é de fato um trocadilho.'],
        status1: () =>
            SAVE.data.b.s_state_chilldrake
                ? ['<32>{#p/story}* Chilldrake salta para cima!']
                : ['<32>{#p/story}* Stardrake esvoaça!']
    },
    b_opponent_jerry: {
        act_check: () =>
            SAVE.data.b.spared_jerry
                ? world.goatbro
                    ? [
                        '<33>{#p/asriel2}* Jerry, ele é um babaca. Eu dúvido que flertar com ele tenha efeito.'
                    ]
                    : [
                        '<32>{#p/story}* JERRY - ATQ 0 DEF 30\n* Um monstro renascido, despertou com o poder da amizade.'
                    ]
                : world.goatbro
                    ? [
                        '<32>{#p/asriel2}* Jerry, é um babaca.\n* Um pedaço de lixo, nada mais, nada menos.'
                    ]
                    : ['<32>{#p/story}* JERRY - ATQ 0 DEF 30\n* Tudo mundo conhece esse cara.\n* Faz ataques durarem mais.'],
        act_flirt: () =>
            SAVE.data.b.spared_jerry
                ? ['<32>{#p/human}* (Você flerta com o Jerry.)\n* (Ele aprecia o cumprimento.)']
                : 5 <= world.flirt
                    ? ['<32>{#p/human}* (Você usa da experiência, e manda seu flerte mais poderoso.)']
                    : [
                        '<32>{#p/human}* (Você flerta com o Jerry.)',
                        '<32>{#p/basic}* Jerry parece estar gostando muito de você.'
                    ],
        act_ditch: () => ['<32>{#p/human}* (Você abandona Jerry.)'],
        act_kiss: () => ['<32>{#p/human}* (Você beija Jerry.)'],
        flirtStatus: ["<32>{#p/story}* Jerry inicia seu arco de redenção."],
        flirtStatusWeird: ['<32>{#p/story}* Isso está errado em tantos níveis.'],
        flirtTalk: [
            '<08>{#p/basic}{~}Você... v-você...',
            "<08>{#p/basic}{~}Só para você, eu...",
            "<08>{#p/basic}{~}Eu serei a melhor pessoa que conseguir!"
        ],
        flirtTalkWeird: ['<08>{#p/basic}{~}\x00*limpa os lábios*'],
        genoStatus: ['<32>{#p/asriel2}* Jerry.'],
        hurtStatus: () => (world.goatbro ? ['<32>{#p/asriel2}* Próximo da morte.'] : ['<32>{#p/story}* Jerry está ferido.']),
        idleTalk1: () =>
            SAVE.data.b.spared_jerry
                ? ["<08>{#p/basic}{~}Eu estou tão feliz que estamos aqui!"]
                : ["<08>{#p/basic}{~}Vocês não estão ENTEDIADOS?"],
        idleTalk2: () =>
            SAVE.data.b.spared_jerry
                ? ['<08>{#p/basic}{~}Podemos fazer isso mais vezes?']
                : ['<08>{#p/basic}{~}Por que estamos fazendo isso?'],
        idleTalk3: () =>
            SAVE.data.b.spared_jerry
                ? ['<08>{#p/basic}{~}Ei, vocês são os melhores!']
                : ['<08>{#p/basic}{~}Wow, vocês são péssimos nisso.'],
        idleTalk4: () =>
            SAVE.data.b.spared_jerry
                ? ['<08>{#p/basic}{~}Alguém quer um abraço?']
                : ['<08>{#p/basic}{~}SHHHH!\nMe deixa pensar, caras!!'],
        idleTalkSolo1: () =>
            SAVE.data.b.spared_jerry ? ['<08>{#p/basic}{~}Obrigado por estar aqui!'] : ['<08>{#p/basic}{~}Estranho.'],
        idleTalkSolo2: () =>
            SAVE.data.b.spared_jerry
                ? ["<08>{#p/basic}{~}Você é incrível!\nSó dizendo."]
                : ['<08>{#p/basic}{~}Então tipo, o que você tá fazendo?'],
        idleTalkSolo3: () =>
            SAVE.data.b.spared_jerry
                ? ["<08>{#p/basic}{~}Não te trocaria por nada na galáxia."]
                : ['<08>{#p/basic}{~}O sinal aqui é uma merda.'],
        idleTalkSolo4: () =>
            SAVE.data.b.spared_jerry
                ? ['<08>{#p/basic}{~}Eu amo humanos!']
                : ['<08>{#p/basic}{~}Deve ser legal ser um humano...'],
        name: '* Jerry',
        randStatus1: () =>
            SAVE.data.b.spared_jerry
                ? ['<32>{#p/story}* Jerry está vivendo despreocupado.']
                : ['<32>{#p/story}* Jerry come comidas deliciosas e passa as mãos com orgulho.'],
        randStatus2: () =>
            SAVE.data.b.spared_jerry
                ? ['<32>{#p/story}* Jerry balança com felicidade.']
                : ['<32>{#p/story}* Jerry espirra sem cobrir o nariz.'],
        randStatus3: () =>
            SAVE.data.b.spared_jerry
                ? ['<32>{#p/story}* Jerry deixa sair uma reação de ânimo.']
                : ['<32>{#p/story}* Jerry solta um bocejo.'],
        randStatus4: () =>
            SAVE.data.b.spared_jerry
                ? ['<32>{#p/story}* Cheira a... Jerry?']
                : ['<32>{#p/story}* Cheira a...... Jerry.'],
        status1: ['<32>{#p/story}* Jerry se apega a você!'],
        kissTalk: ['<08>{#p/basic}{~}Wow...', '<08>{#p/basic}{~}Um beijo do meu melhor amigo!'],
        kissStatus: ['<32>{#p/story}* ...'],
        kissResult: () =>
            battler.alive.length === 2
                ? ["<32>{#p/basic}* O outro monstro não suporta assistir..."]
                : ["<32>{#p/basic}* O outro monstro não suporta assistir..."],
        ditchResult: () =>
            battler.alive.length === 1
                ? ["<32>{#p/basic}* Os outros monstros celebram o desaparecimento de Jerry."]
                : ["<32>{#p/basic}* Os outros monstros celebram o desaparecimento de Jerry."]
    },
    b_opponent_mouse: {
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Whizkarat, o gato sem casa.\n* Perdeu o propósito na vida a muito tempo atrás.']
                : ['<33>{#p/story}* WHIZKARAT - ATQ 16 DEF 8\n* Esse gato deseja ter uma vida simples.'],
        act_check2: [
            "<33>{#p/story}* WHIZKARAT - ATQ 16 DEF 8\n* Este gato da cidade se arrepende de aparecer onde não é chamado."
        ],
        act_check3: [
            '<33>{#p/story}* WHIZKARAT - ATQ 16 DEF 8\n* Este rato reformado é bem tranquilo.'
        ],
        act_check4: [
            '<33>{#p/história}* WHIZKARAT - ATK 16 DEF 8\n* Este rato reformado do oeste gostou de você.'
        ],
        act_direct: ['<32>{#p/human}* (Você diz ao Whizkarat sobre fatos da sua vida.'],
        act_direct2: [
            '<32>{#p/human}* (Você diz a Whizkarat tudo que você sabe sobre ratinhos.)',
            '<32>{#p/basic}* De repente...!'
        ],
        act_direct3: ["<32>{#p/human}* (Você tenta dizer a Whizkarat mais, mas ele parece já ter entendido.)"],
        act_disown: [
            "<32>{#p/human}* (Você arranca um bigode do rosto de Whizkarat.)",
            '<32>{#p/basic}* Whizkarat solta um assobio retorcido!'
        ],
        act_disown2: [
            "<32>{#p/human}* (Você arranca outro bigode do rosto de Whizkarat.)",
            '<32>{#p/basic}* Whizkarat se assusta!'
        ],
        act_disown3: ['<32>{#p/human}* (Você tenta arrancar um bigode, mas Whizkarat finge que não tem nenhum.)'],
        act_flirt: ["<32>{#p/human}* (Você faz um comentário fofo e coça o pescoço de Whizkarat.)"],
        disownStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Whizkarat.'] : ['<32>{#p/story}* Whizkarat está perdendo sua pose.'],
        disownTalk1: ['<08>{#p/basic}{~}Tire suas patas de mim...!'],
        flirtTalk: ['<08>{#p/basic}{~}Não são permitidos gatinhos.'],
        flirtTalk2: ['<08>{#p/basic}{~}\x00*ronrona suavemente*'],
        genoStatus: ['<32>{#p/asriel2}* Whizkarat.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Próximo da morte.'] : ['<32>{#p/story}* Whizkarat está se aproximando da morte.'],
        idleTalk1: ['<08>{#p/basic}{~}Que comidas eles comem?'],
        idleTalk2: ['<08>{#p/basic}{~}Onde eles se escondem?'],
        idleTalk3: ['<08>{#p/basic}{~}Como eles falam?'],
        idleTalk4: ['<08>{#p/basic}{~}Eles sonham?'],
        initTalk1: ['<08>{#p/basic}{~}Alas, aqui estou.'],
        initTalk2: ['<08>{#p/basic}{~}Oh, como eu me perco...'],
        initTalk3: ['<08>{#p/basic}{~}A situação não é ideal.'],
        initTalk4: ['<08>{#p/basic}{~}Poderia me ajudar?'],
        name: '* Whizkarat',
        randStatus1: ['<32>{#p/story}* Whizkarat fantasia em poder ficar de quatro.'],
        randStatus2: ['<32>{#p/story}* Whizkarat observa a área.'],
        randStatus3: ['<32>{#p/story}* Whizkarat está fingindo ser pequeno.'],
        randStatus4: ['<32>{#p/story}* Cheira a queijo cheddar.'],
        remindStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Whizkarat.']
                : ['<32>{#p/story}* Whizkarat só precisa de um pouco mais de ajuda.'],
        remindTalk1: ['<08>{#p/basic}{~}Eles vivem em buracos...?'],
        remindTalk2: ['<08>{#p/basic}{~}Fazem barulhos igual brinquedos, eles...?'],
        remindTalk3: ['<08>{#p/basic}{~}De agora em diante eu serei um rato.'],
        safeStatus: () =>
            world.goatbro ? ["<32>{#p/asriel2}* Está vulnerável."] : ['<32>{#p/story}* Whizkarat encontrou seu caminho.'],
        safeTalk1: ['<08>{#p/basic}{~}Incrí- vel...'],
        safeTalk2: ['<08>{#p/basic}{~}Simplesmente esplên- dido...'],
        status1: ['<32>{#p/story}* Whizkarat aparece!']
    },
    b_opponent_doggo: {
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Doggo, o cachorro cego.\n* Como esse imbecil conseguiu um trabalho?']
                : ['<32>{#p/story}* DOGGO - ATQ 13 DEF 7\n* Facilmente animado por movimentação.'],
        act_check2: ['<32>{#p/story}* DOGGO - ATQ 13 DEF 7\n* Tem problemas para ver até a si mesmo.'],
        act_check3: ['<32>{#p/story}* DOGGO - ATQ 13 DEF 7\n* Um cachorro bem animado, atualmente apreciando um hobby.'],
        act_check4: ['<32>{#p/story}* DOGGO - ATQ 13 DEF 7\n* Este cachorro é sozinho na vida.'],
        act_flirt: () => ['<32>{#p/human}* (Você flerta com Doggo.)'],
        act_cuddle: () => ['<32>{#p/human}* (Você abraça Doggo de perto.)'],
        fetch: () => [
            '<32>{#p/human}* (Você joga a chave inglesa.)\n* (O cachorro corre para pegá-lo. Você joga buscar por um tempo.)'
        ],
        fetchTalk: pager.create(
            0,
            ['<11>{#p/basic}{~}HUH!! APARECEU ALGO PRA PEGAR!'],
            ['<11>{#p/basic}{~}HUH!! TÁ AÍ DE NOVO!']
        ),
        fetchTalkX1: ["<11>{#p/basic}{~}ONDE FOI!?"],
        fetchTalkX2: ["<11>{#p/basic}{~}ONDE ESTÁ!?"],
        flirt1: ['<11>{#p/basic}{~}(Cora incontrolavelmente)'],
        invisStatus: () =>
            world.goatbro ? ["<32>{#p/asriel2}* Ele está vulnerável."] : ['<32>{#p/story}* Doggo te perdeu de vista.'],
        name: '* Doggo',
        fetchStatus: ['<32>{#p/story}* Doggo ama buscar!'],
        fetchpet: ['<32>{#p/human}* (Doggo está ocupado agora e não pode ser acariciado.)'],
        fetchflirt: ['<32>{#p/human}* (Mas Doggo está muito ocupado pra te ouvir.)'],
        fetchcuddle: ['<32>{#p/human}* (Mas o cachorro estava muito ocupado procurando a chave para ser acariciado.)'],
        normaStatus: () => (world.goatbro ? ['<32>{#p/asriel2}* Doggo.'] : ["<32>{#p/story}* Doggo sabe que você está aqui."]),
        pet: () => [
            '<32>{#p/human}* (Você acaricia Doggo.)',
            ...(world.goatbro
                ? [
                    [],
                    ['<32>{#p/asriel2}* ... de novo?'],
                    ["<32>{#p/asriel2}* NÃO É TÃO DIVERTIDO ASSIM..."],
                    ['<32>{#p/asriel2}* ... ou é?'],
                    ['<32>{#p/asriel2}* Isso é tão estúpido.'],
                    ['<32>{#p/asriel2}* Você realmente precisa fazer isso?'],
                    ['<32>{#p/asriel2}* ... precisa?'],
                    ['<32>{#p/asriel2}* Acho que sim.'],
                    ['<32>{#p/asriel2}* ...'],
                    ['<32>{#p/asriel2}* Isso tá saindo de controle...'],
                    ['<32>{#p/asriel2}* Ainda?\n* Vamos logo...'],
                    ['<32>{#p/asriel2}* Wow.\n* Só wow.'],
                    ['<32>{#p/asriel2}* Você tá gostando demais disso.'],
                    ['<32>{#p/asriel2}* ...']
                ][Math.min(battler.volatile[0].vars.pet - 1, 13)]
                : [])
        ],
        cuddle: pager.create(
            0,
            ['<11>{#p/basic}{~}CUDDLES?!?\nBEM, PELO MENOS EU SEI ONDE FICA!'],
            ['<11>{#p/basic}{~}DE NOVO!?!?']
        ),
        petStatus: () =>
            world.goatbro ? ["<32>{#p/asriel2}* Ele está vulnerável."] : ['<32>{#p/story}* Doggo foi acariciado.'],
        petTalk1: ["<11>{#p/basic}{~}O QUE!!!\nEU FUI ACARICIADO!"],
        petTalk2: ["<11>{#p/basic}{~}DE ONDE ISSO TÁ VINDO!?"],
        petTalk3: ["<11>{#p/basic}{~}TEM UM FIM PRA ISSO!!"],
        petTalk4: ['<11>{#p/basic}{~}BEM, ISSO É FODA!!!'],
        petTalk5: ['<11>{#p/basic}{~}(Morre)'],
        petTalk6: ['<11>{#p/basic}{~}(De volta a vida)'],
        petTalk7: ['<11>{#p/basic}{~}SÓ CONTINUANDO VINDO!'],
        petTalk8: ['<11>{#p/basic}{~}E VINDO!!'],
        petTalk9: ['<11>{#p/basic}{~}E VINDO!!!'],
        petTalk10: ["<11>{#p/basic}{~}OK.\nJá chega."],
        petTalk11: ['<11>{#p/basic}{~}Eu disse \"chega!\"'],
        petTalk12: ["<11>{#p/basic}{~}Oh meu pai, não para!"],
        petTalk13: ["<11>{#p/basic}{~}OH MEU SENHOR, NADA PARAAAAA!!"],
        petTalk14: ['<11>{#p/basic}{~}AHHHHHHH!!!'],
        query1: ['<11>{#p/basic}{~}Sem escapar!'],
        query2: ["<11>{*}{#p/basic}{~}Ha!\nSe moveu!\nNão pôde não se mover!{^30}{%}"],
        query3: ['<11>{#p/basic}{~}Vai se mover dessa vez?'],
        status1: () => (world.goatbro ? ['<32>{#p/asriel2}* Doggo.'] : ['<32>{#p/story}* Doggo bloqueia o caminho!']),
        sussy: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Doggo.'] : ['<32>{#p/basic}* Doggo está muito suspeito em relação as suas ações.']
    },
    b_opponent_lesserdog: {
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Canis Minor, o cachorro ignorante. Ele nem deve saber o que tá fazendo."]
                : ['<32>{#p/story}* CANIS MINOR - ATQ 12 DEF 2\n* Um cachorro brilhante.'],
        act_check2: [
            '<32>{#p/story}* CANIS MINOR - ATQ 12 DEF 2\n* Assustado demais, ele quer virar as costas e fugir.'
        ],
        act_check3: [
            "<32>{#p/story}* CANIS MINOR - ATQ 12 DEF 2\n* É o próximo na linha para pescoço mais longo da galáxia."
        ],
        act_check4: ['<32>{#p/story}* CANIS MINOR - ATQ 12 DEF 2\n* Tentando o melhor para acariciar suas carícias.'],
        act_check5: ['<32>{#p/story}* CANIS MINOR - ATQ 12 DEF 2\n* A jornada desse cachorrinho só começou.'],
        act_flirt: ['<32>{#p/human}* (Você diz a Canis Minor que o ama acariciando-o em código morse.)'],
        act_handshake: [
            "<32>{#p/human}* (Você coloca sua mão na cabeça de Canis Minor, ele balança em felicidade.)"
        ],
        act_inquire: [
            "<32>{#p/human}* (Você acaricia Canis Minor e pergunta quem é o bom garoto. Ele late em felicidade.)"
        ],
        act_tickle: [
            "<32>{#p/human}* (Você faz cócegas nos lados do Canis Minor, acariciando-o.)\n* (É um frenesi de excitação.)"
        ],
        fetch: () => [
            '<32>{#p/human}* (Você joga a chave.)\n* (O cão alonga o pescoço para alcançá-lo.)',
            '<32>{#p/human}* (Você brinca de pegar por um tempo.)',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Mas porquê?'] : [])
        ],
        fetchStatus: ['<32>{#p/story}* Canis Minor ama brincar de pegar!'],
        fetchTalk: ['<11>{#p/basic}{~}(Corre rápido)'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Próximo da morte.']
                : ['<32>{#p/story}* O Canis Minor enfia o rabo entre as pernas.'],
        name: '* Canis Minor',
        petTalk1: ['<11>{#p/basic}{~}(Acaricia)'],
        petTalk2: ['<11>{#p/basic}{~}(Latido pequeno)'],
        petTalk3: ['<11>{#p/basic}{~}(Wag wag)'],
        petTalk4: ['<11>{#p/basic}{~}(Pensa sobre comida)'],
        petTalk5: ['<11>{#p/basic}{~}(Carinho! Carinho!)'],
        petTalk6: ['<11>{#p/basic}{~}(Sons de animação)'],
        petTalk7: ['<11>{#p/basic}{~}(Rotação do motor)'],
        petTalk8: ['<11>{#p/basic}{~}(Decolagem de avião)'],
        petTalk9: ['<11>{#p/basic}{~}(Apito da chaleira)'],
        petTalk10: ['<11>{#p/basic}{~}(...)'],
        petTalk11: ['<11>{#p/basic}{~}(Latido distante)'],
        petTalk12: ['<11>{#p/basic}{~}(Latido)'],
        petText1: () => ['<32>{#p/human}* (Você mal levanta a mão.)', '<32>{#p/basic}* Que excitante!'],
        petText2: () => [
            '<32>{#p/human}* (Você gentilmente acaricia o cachorro.)',
            "<32>{#p/basic}* Ele já está super excitado...",
            ...(world.goatbro ? ['<32>{#p/asriel2}* Cachorros realmente amam ser acariciados.'] : [])
        ],
        petText3: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            "<32>{#p/basic}* Ele está levantando sua cabeça para encontrar sua mão.",
            ...(world.goatbro ? ["<32>{#p/asriel2}* Tá, você já acariciou.\n* Não tem motivos pra continuar."] : [])
        ],
        petText4: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* Era um bom cachorro.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Sem razões pra continuar?'] : [])
        ],
        petText5: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* Sua animação não tem limite...',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Sem razão pra continuar.'] : [])
        ],
        petText6: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* Acariciamenten crítico!\n* Excitação do cachorro cresceu.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Senhor, $(name).'] : [])
        ],
        petText7: () => [
            '<32>{#p/human}* (Você precisa pular para acariciar o cachorro.)',
            ...(world.goatbro ? ["<32>{#p/asriel2}* Não dá pra fazer isso o dia inteiro."] : [])
        ],
        petText8: () => [
            '<32>{#p/human}* (Você acaricia o Canis Minor antes mesmo de alcançar.)',
            '<32>{#p/basic}* Fica mais animado.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Da PRA fazer isso o dia inteiro...?'] : [])
        ],
        petText9: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* Não a como parar essa loucura.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* ...'] : [])
        ],
        petText10: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* Muitas carícias para um pequeno cachorro, um pescoço gigante para a sociedade.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Por que ainda estamos aqui?'] : [])
        ],
        petText11: () => [
            '<32>{#p/human}* (Você chama Canis Minor, mas ele não consegue te ouvir.)',
            ...(world.goatbro ? ["<32>{#p/asriel2}* Aqui.\n* Está fora de alcance."] : [])
        ],
        petText12: () => ['<32>{#p/basic}* ...', ...(world.goatbro ? ['<32>{#p/asriel2}* ???'] : [])],
        petText13: () => [
            '<32>{#p/human}* (Você consegue alcançar Canis Minor de novo.)',
            ...(world.goatbro ? ["<32>{#p/asriel2}* Você só PODE ESTAR BRINCANDO."] : [])
        ],
        petText14: () => ['<32>{#p/human}* (Você acaricia Canis Minor.)'],
        petText15: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            "<32>{#p/basic}* É provável que você tenha um problema."
        ],
        petText16: () => [
            '<32>{#p/human}* (Canis Minor não é acariciavel, mas apreciou a tentativa.)',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Pare.'] : [])
        ],
        petText17: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* Talvez a humanidade não foi feita pra acariciar desse tanto.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Por favor, pare.'] : [])
        ],
        petText18: () => [
            '<32>{#p/human}* (Você acaricia Canis Minor.)',
            '<32>{#p/basic}* E continua.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* ...'] : [])
        ],
        petText19: () => [
            '<32>{#p/human}* (Mas Canis Minor não estava no alcance.)',
            ...(world.goatbro ? ["<32>{#p/asriel2}* Tá bom, chega. \n* Agora mata esse idiota."] : [])
        ],
        petText20: () => [
            '<32>{#p/human}* (Sério mesmo.)',
            '<32>{#p/basic}* ... sério mesmo.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Sério...'] : [])
        ],
        statusX: ["<32>{#p/asriel2}* Está vulnerável."],
        status0: () => (world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Canis Minor aparece.']),
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ['<32>{#p/story}* Canis Minor inclina a cabeça para um lado.'],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ['<32>{#p/story}* Canis Minor pensa que sua arma é um biscoito.'],
        status3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ['<32>{#p/story}* Canis Minor não está prestando atenção.'],
        status4: () => (world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Cheira a comida de cachorro.']),
        status5: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Canis Minor está latindo animado.'],
        status6: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Canis Minor está super estimulado.'],
        status7: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ['<32>{#p/story}* Canis Minor não mostra sinais de parar.'],
        status8: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Canis Minor está parando.'],
        status9: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Canis Minor aprende a codificar.'],
        status10: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ["<32>{#p/story}* Canis Minor está choramingando por não conseguir te ver."],
        status11: () => (world.goatbro ? ['<32>{#p/asriel2}* Canis Minor.'] : ['<32>{#p/story}* Olá.']),
        status12: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ['<32>{#p/story}* Canis Minor está questionando suas escolhas de vida.'],
        status13: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Canis Minor.']
                : ['<32>{#p/story}* Canis Minor chegou aonde nenhum cachorro jamais chegou.']
    },
    b_opponent_dogamy: {
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy, o cão patético. Depende inteiramente de sua parceira excessivamente agressiva.']
                : ['<32>{#p/story}* DOGAMY - ATQ 14 DEF 5\n* Marido da Dogaressa.\n* Sabe apenas o cheiro dele.'],
        act_check2: ['<32>{#p/história}* DOGAMY - ATQ 14 DEF 5\n* Recentemente viúvo.\n* Conhece apenas a dor da perda.'],
        act_check3: ['<32>{#p/story}* DOGAMY - ATQ 14 DEF 5\n* Marido da Dogaressa.\n* Sabe mais do que antes.'],
        act_check4: ["<32>{#p/story}* DOGAMY - ATQ 14 DEF 5\n* Marido da Dogaressa.\n* Gosta de compartilhar?"],
        act_check5: ["<32>{#p/história}* DOGAMY - ATQ 14 DEF 5\n* Marido de Dogaressa.\n* Não se importaria de sair...?"],
        fetchText: [
            '<32>{#p/human}* (Você joga a chave.)\n* (Os cachorros correm pra pegar. Você brinca de buscar.)'
        ],
        fetchTextLone: () => [
            '<32>{#p/human}* (Você joga a chave.)\n* (Dogamy ignora e deixa ela rolar pelo chão.)',
            ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? ['<32>{#p/asriel2}* Eu percebi isso.'] : [])
        ],
        flirtTalk1: ['<11>{#p/basic}{~}Ah!\nMas por que...!?'],
        flirtTalk2: ['<11>{#p/basic}{~}O amor está no ar?'],
        flirtTalk3: ["<11>{#p/basic}{~}Você não acabou de..."],
        flirtTalk4: ["<11>{#p/basic}{~}O que o cachorrinho tá fazendo?"],
        flirtText: [
            '<32>{#p/human}* (Você flerta com Dogamy.)',
            "<32>{#p/basic}* Seu... feromônios, atingem o focinho de Dogamy."
        ],
        flirtTextLone: ['<32>{#p/human}* (Você flerta com Dogamy.)', "<32>{#p/basic}* A expressão de Dogamy não mudou."],
        loneStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Um sobrando.']
                : ['<32>{#p/story}* Dogaressa deseja chutar a calda de um humano.'],
        loneTalk1: ['<11>{#p/basic}{~}Vinho.'],
        loneTalk2: ['<11>{#p/basic}{~}Choramingando.'],
        loneTalk3: ['<11>{#p/basic}{~}Balanço.'],
        name: '* Dogamy',
        fetchStatus: ['<32>{#p/story}* Cachorros casados amam buscar!'],
        fetchStatusX: ["<32>{#p/story}* A mente dos cachorros está expandindo em um potencial inesperado."],
        otherPet: ['<11>{#p/basic}{~}...'],
        petNeedStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Dogaressa está procurando por afeição.'],
        petStatus: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Eles estão vulneráveis."]
                : ["<32>{#p/story}* A mente dos cachorros se expandiu."],
        petTalk1: ['<11>{#p/basic}{~}Tire as patas do humano fedorento.'],
        petTalk1x: ['<11>{#p/basic}{~}Tire as patas do cachorrinho estranho.'],
        petTalk2: ['<11>{#p/basic}{~}Wow!!!\nAcariciado por outro cachorro!!!'],
        petTalk3: ["<11>{#p/basic}{~}Para!\nNão toca nela!"],
        petTalk4: ['<11>{#p/basic}{~}E\nEu.....'],
        petTalk5: ['<11>{#p/basic}{~}Valeu...'],
        petText: ['<32>{#p/human}* (Você acaricia Dogamy.)'],
        petTextLone: ['<32>{#p/human}* (Você tenta acariciar Dogamy, mas ele se encolhe de medo.)'],
        randTalk1: () =>
            world.goatbro
                ? ['<11>{#p/basic}{~}O príncipe está perdido...']
                : ["<11>{#p/basic}{~}Leve minha esposa...\nas pulgas dela."],
        randTalk2: () =>
            world.goatbro ? ['<11>{#p/basic}{~}Você chegou longe...'] : ["<11>{#p/basic}{~}Não toque no meu cachorro quente."],
        randTalk3: () =>
            world.goatbro
                ? ["<11>{#p/basic}{~}Nós vamos te destruir!"]
                : ['<11>{#p/basic}{~}Número um no campeonato de carinho K-614!!'],
        randTalk4: () =>
            world.goatbro ? ["<11>{#p/basic}{~}Você não vencerá dessa vez..."] : ["<11>{#p/basic}{~}Vamos chutar a calda do humano!!"],
        resmellStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Os cachorros pensam que você é um cãozinho perdido.'],
        resmellText1: [
            '<32>{#p/human}* (Você encoraja os cachorros a te cheirarem de novo.)',
            '<32>* (Você cheira tão estranho quanto antes.)'
        ],
        resmellText2: [
            '<32>{#p/human}* (Você encoraja os cachorros a te cheirarem de novo.)',
            '<32>* (Após rolar na sujeira, você cheira bem.)'
        ],
        resmellText3: [
            '<32>{#p/human}* (Você encoraja os cachorros a cheirarem de novo, mas eles já entenderam.)'
        ],
        resmellTextFetch: [
            '<32>{#p/human}* (Você encoraja os cachorros a te cheirarem, mas eles estão ocupados.)'
        ],
        resmellTextLone: ["<32>{#p/human}* (Você encoraja Dogamy a te cheirar, mas ele nem levanta o nariz.)"],
        rollStatus: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Você vai ficar com as roupas sujas, $(name)."]
                : ['<32>{#p/story}* Os cachorros talvez queiram te re-cheirar.'],
        rollText: () => [
            '<32>{#p/human}* (Você rola na grama.)\n* (Parece ser sintética.)',
            '<32>{#p/basic}* Seu cheiro está mudando...',
            ...(world.goatbro ? ['<32>{#p/asriel2}* Eu tenho perguntas.'] : [])
        ],
        rollText2: [
            '<32>{#p/human}* (Você rola na grama.)\n* (Parece ser sintética.)',
            '<33>{#p/basic}* Seu cheiro já mudou.'
        ],
        rollTextLone: () => [
            "<32>{#p/human}* (Você rola nos restos da Dogaressa.)",
            '<32>{#p/basic}* Dogamy parece ainda mais derrotado.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* ...'] : [])
        ],
        smellTalk1: ["<11>{#p/basic}{~}Hm?\nQue cheiro é esse?"],
        smellTalk2: ['<11>{#p/basic}{~}Que!\nCheira a...'],
        smellTalk3: ['<11>{#p/basic}{~}Ah!\nQue cheira adorável...'],
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Os cachorros continuando cruzando os machados para proteger um ao outro.'],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Os cachorros estão re-avaliando seu cheiro.'],
        status3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Os cachorros estão praticando para a próxima competição de casais.'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Os cães estão sussurrando coisas doces uns para os outros.'],
        susText: ["<32>{#p/basic}* Os cachorros ainda pensam que você cheira a humano."],
        fetchTalk: ['<11>{#p/basic}{~}Buscar é tão legal!'],
        fetchTalkX: ['<11>{#p/basic}{~}Buscar com outro cachorrinho?']
    },
    b_opponent_dogaressa: {
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Dogaressa, a cadela raivosa.\n* Sem seu marido, ela se perderia completamente."]
                : ['<32>{#p/história}* DOGARESSA - ATQ 14 DEF 5\n* Esta cachorrinha acha seu marido adorável. CHEIRA SOMENTE?'],
        act_check2: ['<32>{#p/story}* DOGARESSA - ATQ 14 DEF 5\n* Esta cachorrinha sente falta de seu marido. MATA APENAS?'],
        act_check3: ['<32>{#p/story}* DOGARESSA - ATQ 14 DEF 5\n* As coisas estão bem para essa cachorrinha.'],
        act_check4: [
            "<32>{#p/story}* DOGARESSA - ATQ 14 DEF 5\n* Seu marido não é a única coisa que ela acha adorável."
        ],
        act_check5: ["<32>{#p/story}* DOGAMY - ATQ 14 DEF 5\n* Esta cadela está preocupada com a segurança de seu marido."],
        fetchTextLone: () => [
            '<32>{#p/human}* (Você joga a chave.)\n* (Dogaressa pega e quebra em pedaços.)',
            ...(world.goatbro && SAVE.flag.n.ga_asrielSpannerComment++ < 1 ? ['<32>{#p/asriel2}* Eu percebi isso.'] : [])
        ],
        flirtTalk1: ['<11>{#p/basic}{~}(Ei! Para com isso!)'],
        flirtTalk2: ['<11>{#p/basic}{~}(Isso só fica mais estranho e estranho.)'],
        flirtTalk3: ['<11>{#p/basic}{~}(... flerta comigo! Ugh!)'],
        flirtTalk4: ['<11>{#p/basic}{~}(Eu acho que me ama. E muito.)'],
        flirtText: [
            '<32>{#p/human}* (Você flerta com Dogaressa.)',
            "<32>{#p/basic}* Seus... feromônios chegam a Dogaressa."
        ],
        flirtTextLone: [
            '<32>{#p/human}* (Você flerta com Dogaressa.)',
            "<32>{#p/basic}* A expressão de Dogaressa não mudou."
        ],
        loneStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Um sobrando.'] : ['<32>{#p/story}* Dogamy está com o coração em pedaços.'],
        loneTalk1: ['<11>{#p/basic}{~}(A miséria te espera.)'],
        loneTalk2: ["<11>{#p/basic}{~}(Você sofrerá por isso.)"],
        name: '* Dogaressa',
        otherPet: ['<11>{#p/basic}{~}(...)'],
        petNeedStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Dogamy e Dogaressa.']
                : ['<32>{#p/story}* Dogamy procura por afeição.'],
        petTalk1: ["<11>{#p/basic}{~}(Esse não é seu marido, beleza?)"],
        petTalk2: ["<11>{#p/basic}{~}(Não me deixe de fora!)"],
        petTalk3: ['<11>{#p/basic}{~}(Cuidado com o cachorro.)'],
        petTalk4: ['<11>{#p/basic}{~}(Um cachorro que acaricia cachorros... que fera!)'],
        petTalk5: ["<11>{#p/basic}{~}(Você é o melhor!)"],
        petText: ['<32>{#p/human}* (Você acaricia Dogaressa.)'],
        petTextLone: ['<32>{#p/human}* (Você tenta acariciar Dogaressa, mas ela só rosna pra você.)'],
        randTalk1: () => (world.goatbro ? ['<11>{#p/basic}{~}(Pois bem.)'] : ["<12>{#p/basic}{~}(Não...)"]),
        randTalk2: () => (world.goatbro ? ['<11>{#p/basic}{~}(Justo.)'] : ['<11>{#p/basic}{~}(Ele quis dizer eu.)']),
        randTalk3: () =>
            world.goatbro
                ? ['<11>{#p/basic}{~}(Por força, se necessário.)']
                : ['<11>{#p/basic}{~}(Claro que fomos primeiros.)'],
        randTalk4: () =>
            world.goatbro ? ["<11>{#p/basic}{~}(Acabou o tempo.)"] : ['<11>{#p/basic}{~}(Humanos tem rabo?)'],
        resmellTalkLone: ['<11>{#p/basic}{~}(É isso que você queria?)\n(Huh?)'],
        resmellTextLone: [
            '<33>{#p/human}* (Você encoraja Dogaressa a cheirá-lo, e ela empurra com força o focinho na sua cara.)'
        ],
        rollTextLone: () => [
            "<32>{#p/human}* (Você rola nos restos de Dogamy.)",
            '<32>{#p/basic}* Dogaressa parece ainda mais irritada que antes.',
            ...(world.goatbro ? ['<32>{#p/asriel2}* ...'] : [])
        ],
        smellTalk1: ['<11>{#p/basic}{~}(Um cheiro misterioso...)'],
        smellTalk2: ['<11>{#p/basic}{~}(Você é um cachorrinho?)'],
        smellTalk3: ['<11>{#p/basic}{~}(O estranho cheiro de um cachorrinho!)'],
        fetchTalk: ['<11>{#p/basic}{~}(Nós amamos brincar de buscar.)'],
        fetchTalkX: ['<11>{#p/basic}{~}(Esse cachorro pode fazer tudo!)']
    },
    b_opponent_greatdog: {
        act_check: () =>
            world.goatbro
                ? ['<33>{#p/asriel2}* Major Canis, o cão sem cérebro. O maior e mais burro entre os cachorros.']
                : ["<32>{#p/story}* CANIS MAJOR - ATQ 15 DEF 8\n* Está tão animado que pensa que lutar é uma brincadeira mortal."],
        act_check2: ['<32>{#p/story}* CANIS MAJOR - ATQ 15 DEF 8\n* Desesperado por amor e atenção...'],
        act_check3: ['<32>{#p/história}* CÃO MAIOR - ATK 15 DEF 8\n* Todo dobrado.'],
        act_flirt: [
            '<32>{#p/human}* (Você flertou com Major Canis.)',
            '<32>{#p/basic}* O Cão Maior inclina desajeitadamente a cabeça para o lado.'
        ],
        beckonText: [
            '<32>{#p/human}* (Você chama Major Canis.)',
            '<32>{#p/basic}* Major Canis balança perto de você, jogando pelos na sua cara.'
        ],
        closeStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Major Canis.'] : ['<32>{#p/story}* Major Canis implora por atenção.'],
        closeText: ["<32>{#p/human}* (Você chama Major Canis.)\n* (Apenas suas orelhas se levantam.)"],
        doneText: ['<32>{#p/basic}* Major Canis decide que você é chato demais.'],
        fetch: () =>
            world.goatbro
                ? [
                    '<32>{#p/human}* (Você joga a chave.)\n* (Major Canis absorve e carrega com sua vida.)',
                    '<32>{#p/asriel2}* Pois é... faz sentido.'
                ]
                : [
                    '<32>{#p/human}* (Você joga a chave inglesa.)\n* (O cachorro corre para pegá-lo. Você joga buscar por um tempo.)'
                ],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Próximo da morte.'] : ['<32>{#p/story}* Major Canis está pintando devagar.'],
        ignoreStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Major Canis.']
                : ['<32>{#p/story}* Major Canis só quer afeição.'],
        ignoreStatus2: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Major Canis.'] : ['<32>{#p/story}* Major Canis está fazendo olhinhos de cachorro.'],
        name: '* Major Canis',
        fetchStatus: ['<32>{#p/story}* Major Canis ama brincar de pegar!'],
        petStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Major Canis.']
                : ['<32>{#p/story}* O Cão Maior está batendo no chão com as patas dianteiras.'],
        petStatus2: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Major Canis.'] : ['<32>{#p/story}* Major Canis quer um pouco de TLC.'],
        petStatus3: () =>
            world.goatbro ? ['<32>{#p/asriel2}* ...'] : ['<32>{#p/story}* Capacidade de carinho em 40%.'],
        petStatus4: () =>
            world.goatbro ? ["<32>{#p/asriel2}* Está vulnerável."] : ['<32>{#p/story}* Major Canis está contente.'],
        petText0: ['<32>{#p/human}* (Mas Major Canis estava longe demais para ser acariciado.)'],
        petText1: [
            '<32>{#p/human}* (Major Canis pula no seu colo enquanto é acariciado.)',
            '<32>* (Ele fica tão confortável que acaba dormindo.)',
            '<32>* (O cão ronca, e ronca um pouco mais...)',
            '<32>* (... até que do nada, ele acorda.)',
            "<32>{#p/basic}* Major Canis está animado e isso aumenta sem avisos!"
        ],
        petText2: [
            '<32>{#p/human}* (Você tenta acariciar o cachorro...)',
            '<32>* (... mas sua animação está gerando um escudo de força que previne acariciamento.)'
        ],
        petText3: [
            '<32>{#p/human}* (Você acaricia o cachorro.)\n* (Ele joga o peso inteiro em você.)',
            "<32>* (Sua movimentação reduz, mas você ainda não acariciou o suficiente.)"
        ],
        petText4: [
            '<32>{#p/human}* (Você acaricia decisivamente.)\n* (Capacidade para acariciar em 100%.)',
            '<32>{#p/basic}* Major Canis vira de barriga para cima, deixando as perninhas no ar.'
        ],
        petText5: [
            '<32>{#p/human}* (Você dá uma massagem na barriga do cachorro.)',
            '<32>{#p/basic}* Major Canis está choramingando de êxtase...'
        ],
        playText1: ['<32>{#p/human}* (Mas Major Canis não está animado o suficiente para brincar.)'],
        playText2: [
            '<32>{#p/human}* (Você conjura um holograma para que o cãozinho corra atrás.)',
            '<32>* (Eventualmente, o holograma perde força e se desfaz.)',
            '<32>* (Major Canis coleta todos os resíduos de energia na área e trás de volta pra você.)',
            '<32>{#p/basic}* Major Canis, cansado, descansa a cabeça em você...'
        ],
        playText3: ['<32>{#p/basic}* Major Canis está muito cansado para brincar.'],
        playText4: ['<32>{#p/human}* (Mas Major Canis já está no meio de uma brincadeira.)'],
        status0: () => (world.goatbro ? ['<32>{#p/asriel2}* Major Canis.'] : ['<32>{#p/story}* Major Canis aparece.']),
        status1: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Major Canis.'] : ['<32>{#p/story}* Major Canis está te assistindo intensamente.'],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Major Canis.']
                : ['<32>{#p/story}* Major Canis está esperando pelo seu comando.'],
        status3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Major Canis.']
                : ['<32>{#p/story}* Cheira a suco de cachorro espremido na hora.'],
        waitText: ['<32>{#p/basic}* Major Canis se aproxima ainda mais.']
    },
    b_opponent_papyrus: {
        act_flirt: ['<32>{#p/human}* (Você flerta com Papyrus.)'],
        act_insult: ['<32>{#p/human}* (Você insulta Papyrus.)'],
        spanner: ['<32>{#p/human}* (Você joga a chave.)\n* (Papyrus pega com a boca e retorna para você.)'],
        spannerTalk1: ['<15>{#p/papyrus}{#f/20}MAS QUE BELA JOGADA!'],
        spannerTalk2: ['<15>{#p/papyrus}{#f/20}EU PODERIA FAZER ISSO O DIA INTEIRO!'],
        spannerTalk3: ['<15>{#p/papyrus}{#f/20}QUE NEM ELES FAZEM NA TV!'],
        spannerTalk4: ['<15>{#p/papyrus}{#f/20}NYEH HEH HEH!'],
        sparableSpannerTalk1: ['<15>{#p/papyrus}{#f/20}AGORA, ME MOSTRE SUA PIEDADE!'],
        sparableSpannerTalk2: ['<15>{#p/papyrus}{#f/20}...'],
        bullySpareTalk: [
            '<15>{#p/papyrus}{#f/27}E-EI... TÁ FICANDO ESCURO AQUI?',
            "<15>{#f/27}TALVEZ TE CAPTURAR NÃO TENHA SIDO UMA BOA IDEIA...",
            "<15>{#f/15}SIM!!! CONSIGO VER QUE VOCÊ ESTÁ DESESPERADO POR PIEDADE!",
            '<15>{#f/20}EU, PAPYRUS, IREI TE FORNECER!!',
            '<15>{#f/20}EU VOU TE {@fill=#f00}POUPAR{@fill=#000} HUMANO!!!',
            "<15>{#f/27}AGORA... É SUA CHANCE DE... ACEITAR MINHA {@fill=#f00}PIEDADE{@fill=#000}..."
        ],
        act_check: () =>
            world.genocide
                ? ['<32>{#p/story}* PAPYRUS - ATQ 3 DEF 3\n* Sans ex-irmão.']
                : papreal()
                    ? ['<32>{#p/story}* PAPYRUS - ATQ 3 DEF 3\n* Acredita em você.']
                    : ['<32>{#p/story}* PAPYRUS - ATQ 20 DEF 20\n* Gosta de dizer \"Nyeh Heh Heh!\"'],
        act_check2: ['<32>{#p/story}* PAPYRUS - ATQ 20 DEF 20\n* Está tudo bem, tudo bem.'],
        act_check3: ['<32>{#p/story}* PAPYRUS - ATQ 20 DEF 20\n* O mais benevolente e piedoso homem de guarda!'],
        capture1: [
            "<15>{#p/papyrus}{#f/20}DIRETO PARA A ZONA DE CAPTURA!!",
            '<15>{#f/24}... TAMBÉM CONHECIDO COMO A GARAGEM.',
            '<15>{#f/20}UMA GARAGEM MUITO FORTIFICADA, SÓ PRA DIZER!',
            '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
        ],
        capture2: [
            '<15>{#p/papyrus}{#f/24}BEM!!! VOCÊ PODE TER ESCAPADO ANTES...',
            "<15>{#f/20}MAS DESSA VEZ EU MELHOREI O PLANEJAMENTO.",
            '<15>{#f/20}VOCÊ NÃO APENAS FICARA PRESO...',
            "<15>{#f/15}MAS VOCÊ NEM MESMO DESEJARÁ SAIR!!!",
            '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
        ],
        capture3: [
            '<15>{#p/papyrus}{#f/20}VOCÊ TEM... DETERMINAÇÃO!',
            "<15>MAS!!\nISSO NÃO VAI FUNCIONAR COMIGO!",
            '<15>EU SOU SUPER DETERMINADO!',
            '<99>{#f/24}E SE VOCÊ ACHA QUE É SUPER HYPER DETERMINADORESCO...',
            '<15>{#f/20}VOCÊ ESTÁ ERRADO!\nGRAMATICALMENTE ERRADO!',
            '<15>{#f/24}PORQUE A FORMA CORRETA SERIA...',
            '<15>{#f/20}NÃO TÃO DETERMINADORESCO QUANTO PAPYRUS, O DETERMINADORESCO!',
            '<15>{#f/10}ESPERO QUE VOCÊ TENHA APRENDIDO A LIÇÃO.',
            '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
        ],
        capture4: [
            '<15>{#p/papyrus}{#f/24}VOCÊ TEN CERTEZA QUE QUER CONTINUAR FAZENDO ISSO?',
            '<15>{#f/21}FICAR SENDO CAPTURADO DEVE SER FRUSTRANTE...',
            "<15>{#f/21}EU NÃO QUERO QUE VOCÊ FIQUE NERVOSO POR FICAR FALHANDO...",
            '<15>{#f/20}TALVEZ DA PRÓXIMA VEZ POSSAMOS PULAR ESTA BATALHA!',
            "<15>{#f/20}ENTRETANTO, POR AGORA, É DIRETO PARA A ZONA DE CAPTURA!!!",
            '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
        ],
        capture5: [
            '<15>{#p/papyrus}{#f/27}WOWIE... DE NOVO???',
            '<15>{#f/15}BEM, SE VOCÊ INSISTE...!',
            '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
        ],
        checkTalk: ['<15>{#p/papyrus}{#f/20}NYEH HEH HEH!'],
        death1: () =>
            world.genocide
                ? ['<15>{#p/papyrus}{#f/27}N...\nN-NÃO...']
                : ["<15>{#p/papyrus}{#f/21}BEM, ISSO NÃO ERA O QUE EU ESPERAVA..."],
        death2: () =>
            world.genocide
                ? ['<15>{#p/papyrus}{#f/21}SANS, EU...', '<15>{#f/33}{@random=1.1/1.1}EU FALHEI CONTIGO...']
                : papreal()
                    ? [
                        '<15>{#p/papyrus}{#f/27}... M-MAS EU AINDA ACREDITO EM VOCÊ!',
                        '<15>{#p/papyrus}{#f/21}EU SEI... QUE VOCÊ PODE FAZER MELHOR...',
                        '<15>{#p/papyrus}{#f/27}SE VOCÊ APENAS TENTAR...!'
                    ]
                    : ['<15>{#p/papyrus}{#f/27}... P-PELO MENOS EU AINDA TENHO MINHA CABEÇA!'],
        dots: ['<32>{#p/basic}* ...'],
        flirt0: ['<32>{#p/basic}* Fofo.'],
        flirt1: [
            '<15>{#p/papyrus}{#f/20}O QUE!?\nF-F-FLERTANDO!?',
            '<15>ENTÃO VOCÊ FINALMENTE DEMONSTROU SEUS {@fill=#f00}SENTIMENTOS VERDADEIROS{@fill=#000}!',
            "<15>B-BEM!\nEU SOU UM ESQUELETO COM PADRÕES MUITO ELEVADOS!",
            '<15>O QUE VOCÊ PODE FAZER EM RETORNO DO MEU AFETO???'
        ],
        flirt2: [choicer.create('* (Sua resposta?)', '\nEu faço\nEspaguete', 'Eu tenho\nzero qualidades\napreciadoras',)],
        flirt3a: ['<15>{#p/papyrus}{#f/24}QUE COINCIDÊNCIA... ISSO ME LEMBRA...'],
        flirt3b: ['<15>{#p/papyrus}{#f/24}ESSA HUMILDADE... ISSO ME LEMBRA DE...'],
        flirt4: [
            '<15>{#f/22}DE MIM MESMO!!!',
            "<15>{#f/10}VOCÊ ESTÁ BATENDO COM TODOS OS MEUS PADRÕES!!!",
            '<15>{#f/27}ACHO QUE ISSO SIGNIFIQUE QUE EU DEVA IR A UM ENCONTRO COM VOCÊ...?'
        ],
        flirt5: ["<15>{#p/papyrus}{#f/20}VAMOS EM UM ENCONTRO, M-MAIS TARDE!!\nANTES IREI TE CAPTURAR!"],
        flirt6: ["<32>{#p/human}* (Sem efeito...)\n* (Parece que agir não vai escalar ainda mais essa batalha.)"],
        flirt7: ['<32>{#p/human}* (Mas Papyrus está muito ocupado lutando pra te escutar.)'],
        flirtStatus1: ['<32>{#p/story}* Papyrus está pensando no que usar para seu encontro.'],
        flirtStatus2: ['<32>{#p/story}* Papyrus passa um pouco de Colônia de Osso atrás da orelha.'],
        flirtStatus3: ['<32>{#p/story}* Papyrus está pensando no que cozinhar para o encontro.'],
        flirtStatus4: ['<32>{#p/story}* Papyrus joga molho de marinara atrás de sua orelha.'],
        flirtStatus5: ['<32>{#p/story}* Papyrus está pensando sobre retângulos sexys.'],
        flirtStatus6: ['<32>{#p/story}* Papyrus passa Bishie Cream da marca MTT atrás da orelha.'],
        flirtStatus7: ['<32>{#p/story}* Papyrus passa o Anime Powder da marca MTT atrás da orelha.'],
        flirtStatus8: ['<32>{#p/story}* Papyrus passa o Cute Juice da marca MTT atrás da orelha.'],
        flirtStatus9: ["<32>{#p/story}* Papyrus percebe que não tem orelhas."],
        flirtStatus10: ['<32>{#p/story}* Papyrus tem pedaços aleatórios de pomada na cabeça.'],
        flirtStatus11: ["<32>{#p/story}* ... ele ainda está pensando em retângulos sexys."],
        hurtStatus: ['<32>{#p/story}* Papyrus está a beira da derrota.'],
        insult1: ['<15>{#p/papyrus}{#f/20}QUE CHEIO DE SI MESMO!!!', '<15>{#f/21}VOCÊ QUER QUE EU ME SINTA BEM EM RELAÇÃO A LUTAR CONTIGO...'],
        insult2: ["<15>{#p/papyrus}{#f/15}NÃO TEM NECESSIDADE DE MENTIR PARA VOCÊ MESMO!!!"],
        insult3: ["<32>{#p/human}* (Sem efeito...)\n* (Parece que agir não vai escalar ainda mais essa batalha.)"],
        insult4: ['<32>{#p/human}* (Mas Papyrus está muito ocupado lutando pra te escutar.)'],
        name: '* Papyrus',
        randomStatus1: ['<32>{#p/story}* Papyrus prepara um ataque ossal.'],
        randomStatus2: ['<32>{#p/story}* Papyrus prepara um ataque sem ossos e passa um minuto revertendo o erro.'],
        randomStatus3: ['<32>{#p/story}* Papyrus está cozinhando.'],
        randomStatus4: ['<32>{#p/story}* Papyrus diz \"Nyeh heh heh!\"'],
        randomStatus5: ['<32>{#p/story}* Papyrus está chacoalhando seus ossos.'],
        randomStatus6: ['<32>{#p/story}* Papyrus está tentando manter seu pique descolado.'],
        randomStatus7: ['<32>{#p/story}* Papyrus está considerando suas opções.'],
        randomStatus8: ['<32>{#p/story}* Cheira a ossos.'],
        randomStatus9: ['<32>{#p/story}* Papyrus lembra de uma piada que Sans o contou e começa a sorrir.'],
        spaghetti1: () => [
            '<15>{#p/papyrus}{#f/12}MEU ESPAGUETE!',
            "<15>{#p/papyrus}{#f/13}E VOCÊ PARECE ESTAR GOSTANDO...",
            papreal()
                ? "<15>{#p/papyrus}{#f/27}BEM, ESTOU FELIZ POR TER TE FEITO FELIZ!"
                : [
                    '<15>{#p/papyrus}{#f/27}BEM ENTÃO!\nEU IREI PREPARAR MAIS COMIDA PARA NÓS DOIS!',
                    '<15>{#p/papyrus}{#f/27}POIS BEM!\nESTOU ANSIOSO PARA FAZER MAIS ALGUNS PARA VOCÊ!'
                ][(SAVE.data.n.state_papyrus_spaghet + 1) % 2]
        ],
        spaghetti2: ["<32>{#p/basic}* Se Papyrus não estivesse tão ocupado lutando, ele poderia ter notado aquilo."],
        specialStatus0: ["<32>{#p/story}* A aura de Papyrus está crescendo."],
        specialStatus1: ['<32>{#p/story}* Ataque especial.'],
        specialStatus2: ['<32>{#p/story}* Papyrus está dando tudo de si.'],
        specialStatus3: ['<32>{#p/story}* Papyrus jogou toda a lógica pela janela.'],
        specialStatus4: ['<32>{#p/story}* Papyrus percebeu a perda da lógica e trouxe ela de volta.'],
        specialStatus5: ['<32>{#p/story}* Papyrus está suando.'],
        specialStatus6: ["<32>{#p/story}* Papyrus está quase no fim de seus ataques."],
        status1: ['<32>{#p/story}* Papyrus está te poupando.'],
        status2: ['<32>{#p/story}* Papyrus bloqueia o caminho!'],
        turnTalk0a: ["<15>{#p/papyrus}{#f/24}ENTÃO, VOCÊ ESTÁ FALANDO SÉRIO..."],
        turnTalk0b: ["<15>{#p/papyrus}{#f/24}ENTÃO, VOCÊ NÃO VAI LUTAR..."],
        turnTalk0c: ["<15>{#p/papyrus}{#f/20}ENTÃO VAMOS VER COMO VOCÊ LIDA COM MEU \"ATAQUE AZUL!\""],
        turnTalk0x: [
            "<15>{#p/papyrus}{#f/10}VOCÊ ESTÁ AZUL AGORA!",
            "<15>{#f/10}ESTE É MEU ATAQUE!",
            '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH HEH HEH!!!'
        ],
        turnTalk1a: ['<15>{#p/papyrus}{#f/20}VEJA!'],
        turnTalk1b: ['<15>{#p/papyrus}{#f/20}HMMM... ME PERGUNTO O QUE EU DEVERIA USAR...'],
        turnTalk2a: ['<15>{#p/papyrus}{#f/20}O QUÃO ALTO VOCÊ PULA?'],
        turnTalk2b: ["<15>{#p/papyrus}{#f/22}QUÊ!?\nEU NÃO ESTOU PENSANDO NO ENCONTRO!!"],
        turnTalk3: () =>
            world.postnoot
                ? ['<15>{#p/papyrus}{#f/21}... SOU SÓ EU, OU O AR PARECE MEIO ESTRANHO?']
                : ["<15>{#p/papiro}{#f/20}SIM!\nNÃO ME OBRIGUE A USAR MEU {@fill=#f00}ATAQUE ESPECIAL{@fill=#000}!"],
        turnTalk4: () =>
            world.postnoot
                ? ["<15>{#p/papyrus}{#f/20}OH BEM.\nCERTEZA QUE NÃO É NADA!"]
                : ['<15>{#p/papyrus}{#f/20}EU POSSO SENTIR MINHA FUTURA POPULARIDADE!'],
        turnTalk5: () =>
            world.postnoot
                ? ['<15>{#p/papyrus}{#f/20}ALÉM DISSO, EU VEJO BOLONHESA NO MEU FUTURO!']
                : ['<15>{#p/papyrus}{#f/20}PAPYRUS: FAZEDOR DE ESPAGUETE IMPARÁVEL!'],
        turnTalk6: () =>
            world.postnoot
                ? ['<15>{#p/papyrus}{#f/20}E UMA POSIÇÃO NO ESQUADRÃO DE ELITE!']
                : ['<15>{#p/papyrus}{#f/20}PAPYRUS: MEMBRO DO ESQUADRÃO DE ELITE!'],
        turnTalk7: ['<15>{#p/papyrus}{#f/10}UNDYNE FICARÁ ORGULHOSA DE MIM!!'],
        turnTalk8: ['<15>{#p/papyrus}{#f/20}O REI CONSTRUIRÁ UMA ESTÁTUA MINHA NA CIDADELA!!!'],
        turnTalk9: ["<15>{#p/papyrus}{#f/10}... E EU VOU GARANTIR QUE MEU IRMÃO GANHE UMA TAMBÉM."],
        turnTalk10: ["<15>{#p/papyrus}{#f/27}TEREMOS MUITOS ADMIRADOS!!\nMAS..."],
        turnTalk11a: ['<15>{#p/papyrus}{#f/20}COMO EU VOU SABER SE AS PESSOAS REALMENTE GOSTAM DE MIM??'],
        turnTalk11b: ['<15>{#p/papyrus}{#f/20}ALGUÉM VAI GOSTAR DE MIM IGUAL VOCÊ GOSTA?'],
        turnTalk12: ['<15>{#p/papyrus}{#f/21}ALGUÉM COMO VOCÊ É MUITO RARO...'],
        turnTalk13a: ["<15>{#p/papyrus}{#f/21}EU NÃO ACHO QUE ELES VÃO TE DEIXAR IR..."],
        turnTalk13b: ['<15>{#p/papyrus}{#f/21}E UM ENCONTRO PODE SER DIFÍCIL...'],
        turnTalk14: ["<15>{#p/papyrus}{#f/26}APÓS TE CAPTURAR E LEVAR PARA A CIDADELA."],
        turnTalk15: ['<15>{#p/papyrus}{#f/17}URGH... QUEM LIGA!\nDESISTA!!'],
        turnTalk16: ['<15>{#p/papyrus}{#f/15}DESISTA OU ENFRENTE MEU... {@fill=#f00}ATAQUE ESPECIAL{@fill=#000}!'],
        turnTalk17: ['<15>{#p/papyrus}{#f/20}SIM!!!\nEU IREI USAR MEU {@fill=#f00}ATAQUE ESPECIAL{@fill=#000} LOGO, LOGO!'],
        turnTalk18: [
            '<15>{#p/papyrus}{#f/20}ESTA É SUA ÚLTIMA CHANCE... ANTES DO MEU {@fill=#f00}ATAQUE ESPECIAL{@fill=#000}!'
        ],
        turnTalk19: ['<15>{#p/papyrus}{#f/20}ENCARE...!\nMEU {@fill=#f00}ATAQUE ESPECIAL{@fill=#000}!'],
        turnTalk19x: [
            '<15>{#p/papyrus}{#f/15}NYEH HEH HEH!',
            '<15>{#f/20}NENHUM HUMANO JAMAIS PASSOU DO MEU {@fill=#f00}ATAQUE ESPECIAL{@fill=#000}!',
            '<15>{#f/20}PREPARE PARA SER CAPTURADO, AGORA!'
        ],
        turnTalk20: ['<15>{#p/papyrus}{#f/20}ATAQUE ESPECIAL, FORMAÇÃO ALPHA!'],
        turnTalk21: ['<15>{#p/papyrus}{#f/20}ATAQUE ESPECIAL, FORMAÇÃO BETA!'],
        turnTalk22: ['<15>{#p/papyrus}{#f/20}ATAQUE ESPECIAL, FORMAÇÃO GAMMA!'],
        turnTalk23: ['<15>{#p/papyrus}{#f/20}ATAQUE ESPECIAL, FORMAÇÃO DELTA!'],
        turnTalk24: [
            '<15>{#p/papyrus}{#f/27}WOWIE!\nVOCÊ É FORTÃO!',
            '<15>{#f/20}MAS SEM MEDO, EU NÃO SEREI DERROTADO POR SUA FORÇA!',
            '<15>{#f/14}... ATAQUE ESPECIAL...',
            '<15>{#f/17}FORMAÇÃO {@fill=#f00}SIGMA{@fill=#000}!!!'
        ],
        turnTalk24x: [
            "<15>{#p/papyrus}{#f/27}BEM...! *OFEGANTE* ESTÁ CLARO... VOCÊ NÃO PODE! ME DERROTAR!",
            '<15>{#f/15}SIM!!! POSSO VER SUAS PERNAS TREMENDO!!',
            '<15>{#f/20}EU, O GRANDE PAPYRUS TE PONHO COMO UM GRANDE GUERREIRO!',
            '<15>{#f/20}EU IREI {@fill=#f00}TE POUPAR{@fill=#000}, HUMANO!!!',
            "<15>{#f/10}AGORA É SUA CHANCE DE ACEITAR MINHA {@fill=#f00}PIEDADE{@fill=#000}."
        ],
        idleTalk: ['<15>{#p/papyrus}{#f/20}...'],
        idleTalkBullied: ['<18>{#p/papyrus}{#f/27}...'],
        secretFlirt1: ['<15>{#p/papyrus}{#f/27}VOCÊ DESEJA ESTAR COMIGO... PRA SEMPRE?', '<15>{#p/papyrus}{#f/21}HMM...'],
        secretFlirt2: [
            '<15>{#p/papyrus}{#f/27}ALGO ESTÁ TENTANDO SEPARAR NOSSO AMOR?',
            '<15>{#p/papyrus}{#f/21}EU ME PERGUNTO...'
        ],
        secretFlirt2x: [
            "<15>{#p/papyrus}{#f/27}ENTÃO VOCÊ -NÃO- QUER FICAR COMIGO?",
            "<15>{#p/papyrus}{#f/14}MAS ENTÃO... PORQUE VOCÊ NÃO ACEITA MINHA PIEDADE E ME DEIXA IR?"
        ],
        secretFlirt3: [
            "<15>{#p/papyrus}{#f/25}UH, ACHO QUE AINDA NÃO CHEGAMOS -TÃO- LONGE...",
            '<15>{#p/papyrus}{#f/15}... MAS PODEMOS TENTAR MAIS TARDE!'
        ],
        secretFlirt3x: ["<15>{#p/papyrus}{#f/27}ESPERE, -VOCÊ- É QUEM ESTÁ TENTANDO DESTRUIR NOSSO AMOR"],
        secretFlirt4: ['<15>{#p/papyrus}{#f/24}ESPERA, VOCÊ ESTÁ SUGERINDO... UM TRIÂNGULO AMOROSO?'],
        secretFlirt4x: [
            "<15>{#p/papyrus}{#f/26}... ENTÃO VOCÊ -NÃO- QUER TENTAR ISSO MAIS TARDE?",
            '<15>{#p/papyrus}{#f/24}E NÃO APENAS ISSO, MAS...',
            '<15>{#p/papyrus}{#f/22}VOCÊ PELO MENOS DESEJOU ESTAR COMIGO DO COMEÇO!?'
        ],
        secretFlirt5: ["<15>{#p/papyrus}{#f/22}OU TALVEZ SEJA UM... TRAPÉZIO AMOROSO!"],
        secretFlirt5x: [
            "<15>{#p/papyrus}{#f/21}NÃO?\nNA VERDADE, É UM DIAGONAL DE AMOR?",
            "<15>{#p/papyrus}{#f/18}MAS... NEM TEM COMO FAZER ISSO!",
            "<15>{#p/papyrus}{#f/27}VOCÊ ESTÁ DIZENDO QUE NOSSO AMOR NÃO É REAL??"
        ],
        secretFlirt6: [
            '<15>{#p/papyrus}{#f/14}ESPERA... EU ACHO QUE ENTENDI!',
            '<15>{#p/papyrus}{#f/15}O PRÍNCIPE ESTÁ COM CIÚMES DE SUA AFEIÇÃO POR MIM?',
            '<15>{#p/papyrus}{#f/24}ENTÃO... ELE FEZ UMA ARMADILHA PARA NÓS IMPEDIR DE FICARMOS JUNTOS!'
        ],
        secretFlirt6x: [
            "<15>{#p/papyrus}{#f/27}NÃO?\nMAS EU ESTOU PELO MENOS NO CAMINHO?",
            '<15>{#p/papyrus}{#f/24}ESPERA... TRAPÉZIO...',
            "<15>{#p/papyrus}{#f/22}VOCÊ ESTÁ DIZENDO QUE ESTÁ PRESO COMIGO, AGORA MESMO!?",
            "<15>{#p/papyrus}{#f/14}MAS ENTÃO... POR QUE NÃO ACEITAR MINHA PIEDADE E IR EMBORA?",
            '<15>{#p/papyrus}{#f/21}... DEVE TER ALGO A MAIS ACONTECENDO AQUI.',
            '<15>{#p/papyrus}{#f/26}NÃO... SIM.',
            '<15>{#p/papyrus}{#f/20}SIM, SIM, SIM!!!',
            '<15>{#p/papyrus}{#f/20}EU FINALMENTE ENTENDI!',
            '<15>{#p/papyrus}{#f/15}ISSO DEVE SER TRABALHO DAQUELE TAL \"ASRIEL!\"',
            "<15>{#p/papyrus}{#f/14}DE ALGUMA FORMA, ELE ESTÁ TE IMPEDINDO DE DEMONSTRAR PIEDADE!"
        ],
        secretFlirt7: [
            '<15>{#p/papyrus}{#f/14}BEM.\nNÃO DEIXE ISSO TE VENCER!',
            '<15>{#p/papyrus}{#f/20}NA VERDADE EU JÁ TENHO A SOLUÇÃO PERFEITA!',
            "<15>{#p/papyrus}{#f/10}PARA IMPEDIR QUALQUER DRAMA, IREI FUGIR POLITICAMENTE.",
            "<15>{#p/papyrus}{#f/24}ENTÃO, QUANDO VOCÊ ESTIVER SOZINHO COM ELE DE NOVO...",
            "<15>{#p/papyrus}{#f/25}VOCÊ ESTARÁ NA POSIÇÃO PERFEITA...",
            '<15>{#p/papyrus}{#f/15}PARA GARANTIR QUE ELE NÃO INTERFIRA EM SEUS SENTIMENTOS!',
            '<15>{#p/papyrus}{#f/20}NYEH HEH HEH HEH HEH HEH HEH HEH HEH HEH!'
        ],
        secretFlirt8: [
            '<15>{#p/papyrus}{#f/20}NÃO TEMAS, HUMANO!!!',
            '<15>{#p/papyrus}{#f/14}EU, PAPYRUS, VOU GARANTIR QUE NENHUM MAL ACONTEÇA A NENHUM DE NÓS!',
            '<15>{#p/papyrus}{#f/20}EU VOU ME POUPAR POR VOCÊ!',
            '<15>{#p/papyrus}{#f/20}E ENTÃO, EU VOU ENCONTRAR UM LUGAR BEM SEGURO PARA ME ESCONDER.',
            "<15>{#p/papyrus}{#f/15}NÃO SE PREOCUPE!\nPAPYRUS TEM TUDO SOBRE CONTROLE!"
        ],
        secretInsult1: ['<15>{#p/papyrus}{#f/27}UH... OBRIGADO???'],
        secretInsult2: ['<15>{#p/papyrus}{#f/21}IDIOTA... ONDE EU ESCUTEI ISSO ANTES...'],
        secretInsult2x: [
            '<15>{#p/papyrus}{#f/22}OU... NÃO?',
            '<15>{#p/papyrus}{#f/24}BEM, DEIXA EU VER SE ENTENDI.',
            '<15>{#p/papyrus}{#f/27}VOCÊ QUIS DIZER QUE... ME AMA?',
            '<15>{#p/papyrus}{#f/27}E QUE ALGO ESTÁ TENTANDO SEPARAR NOSSO AMOR?'
        ],
        secretInsult3: ['<15>{#p/papyrus}{#f/29}O QUE AGORA...'],
        secretInsult3x: [
            "<15>{#p/papyrus}{#f/27}VOCÊ QUER DIZER QUE SOU UM IDIOTA POR NÃO PERCEBER?",
            '<15>{#p/papyrus}{#f/28}E QUE VOCÊ QUER... UH...',
            "<15>{#p/papyrus}{#f/25}Q-QUERO DIZER, ACHO QUE AINDA NÃO CHEGAMOS -TÃO- LONGE...",
            '<15>{#p/papyrus}{#f/15}... MAS PODEMOS TENTAR MAIS TARDE!'
        ],
        secretInsult4: ["<15>{#p/papyrus}{#f/27}EU NÃO SOU INTELIGENTE O SUFICIENTE PARA VER O QUE ESTÁ HAVENDO...?"],
        secretInsult4x: [
            "<15>{#p/papyrus}{#f/27}ENTÃO... VOCÊ QUER DIZER QUE ESTAMOS EM UM TRIÂNGULO AMOROSO?",
            "<15>{#p/papyrus}{#f/19}BEM, ISSO CERTAMENTE EXPLICARIA SUA ATITUDE ABRASIVA!"
        ],
        secretInsult5: [
            '<15>{#p/papyrus}{#f/27}HUH? CHUTAR AS ESTRELAS AO INVÉS DE ME CHUTAR?',
            '<15>{#p/papyrus}{#f/17}MAS O QUE ISSO SIGNIFICA...!'
        ],
        secretInsult5x: [
            '<15>{#p/papyrus}{#f/25}ESPERA... VOCÊ QUER QUE EU ENTENDA QUE VOCÊ ME AMA SECRETAMENTE?',
            "<15>{#p/papyrus}{#f/22}E QUE NA VERDADE ESTAMOS EM UM... TRAPÉZIO!?"
        ],
        secretInsult6: [
            '<15>{#p/papyrus}{#f/14}ESPERA... EU ACHO QUE ENTENDI!',
            '<15>{#p/papyrus}{#f/21}IDIOTA...',
            '<15>{#p/papyrus}{#f/21}CHUTAR PARA AS ESTRELAS...',
            '<15>{#p/papyrus}{#f/20}TWINKLY ERA UMA ESTRELA E ELE AMAVA CHAMAR OS OUTROS DE IDIOTA!',
            '<15>{#p/papyrus}{#f/25}É ÓBVIO...',
            "<15>{#p/papyrus}{#f/22}ERA ÓBVIO ESTE TEMPO TODO!",
            '<15>{#p/papyrus}{#f/20}AQUELE TAL \"ASRIEL\" TAMBÉM AMA CHAMAR OS OUTROS DE IDIOTA!',
            '<15>{#p/papyrus}{#f/24}O QUE SIGNIFICA...',
            '<15>{#p/papyrus}{#f/22}A TAL \"ESTRELA\" NA VERDADE É ELE!',
            '<15>{#p/papyrus}{#f/19}ELE DEVE TER FEITO ALGO PARA ME FAZER PARECER UM IDIOTA!'
        ],
        secretInsult6x: [
            '<15>{#p/papyrus}{#f/10}OH... OH!',
            "<15>{#p/papyrus}{#f/10}VOCÊ É A ESTRELA DA QUAL EU DEVERIA IR ATRÁS!",
            "<15>{#p/papyrus}{#f/20}VOCÊ TEM TENTANDO GANHAR MINHA AFEIÇÃO ESTE TEMPO TODO!",
            '<15>{#p/papyrus}{#f/27}WOWIE... VOCÊ TEM UM JEITO ESTRANHO DE FAZER ISSO...',
            '<15>{#p/papyrus}{#f/24}ESTRANHO O SUFICIENTE...',
            "<15>{#p/papyrus}{#f/15}... PARA ME CONVENCER DE QUE EXISTEM MAIS COISAS ACONTECENDO AQUI!",
            "<15>{#p/papyrus}{#f/21}DEPOIS DE TUDO, SE ISSO É O QUE VOCÊ QUER ME DIZER...",
            '<15>{#p/papyrus}{#f/21}POR QUE IR POR TODO ESTE CAMINHO...',
            '<15>{#p/papyrus}{#f/27}EM VEZ DE ME POUPAR E FALAR SOBRE ISSO DEPOIS?',
            "<15>{#p/papyrus}{#f/21}AH NÃO SER... QUE VOCÊ NÃO POSSA ME POUPAR.",
            '<15>{#p/papyrus}{#f/26}NÃO... SIM.',
            '<15>{#p/papyrus}{#f/20}SIM, SIM, SIM!!!',
            '<15>{#p/papyrus}{#f/20}EU FINALMENTE ENTENDI!',
            '<15>{#p/papyrus}{#f/24}AQUELE TAL \"ASRIEL\" TINHA TANTA DE QUE VOCÊ ME MATARIA...',
            "<15>{#p/papyrus}{#f/20}ALGO ME DIZ QUE É ELE QUEM ESTÁ ENTRANDO EM SEU CAMINHO!",
            "<15>{#p/papyrus}{#f/15}ELE FICOU COM CIÚMES DE SUA AFEIÇÃO POR MIM TODO ESSE TEMPO!"
        ],
        secretInsult7: [
            '<15>{#p/papyrus}{#f/14}BEM.\nEU NÃO SEREI ENGANADO POR TOLOS COMO ELE!',
            '<15>{#p/papyrus}{#f/20}EU, PAPYRUS, IREI GARANTIR QUE ELE JAMAIS ME ENCONTRE!',
            "<15>{#p/papyrus}{#f/15}NÃO SE PREOCUPE!\nPAPYRUS TEM TUDO SOBRE CONTROLE!"
        ],
        sparableFlirt1: [
            "<15>{#p/papyrus}{#f/27}ERA PRA VOCÊ ESTAR ME POUPANDO, NÃO FLERTANDO COMIGO!",
            '<15>{#f/14}EU DEVO RESISTIR!'
        ],
        sparableFlirt1x: [
            '<15>{#p/papyrus}{#f/27}HUH?\nFLERTANDO EM TEMPOS ASSI?',
            "<15>{#f/14}BEM, ESSA É UMA FORMA DE SE REDIMIR!"
        ],
        sparableFlirt2: ['<15>{#p/papyrus}{#f/14}N-NÃO...!'],
        sparableFlirt2x: ['<15>{#p/papyrus}{#f/14}A-AH...!'],
        sparableFlirt3: ['<15>{#p/papyrus}{#f/14}...'],
        sparableInsult1: [
            "<15>{#p/papyrus}{#f/20}EI, NÃO TEM NECESSIDADE DE SE INSULTAR!",
            '<15>{#f/21}EU SEI QUE VOCÊ FEZ O SEU MELHOR...'
        ],
        sparableInsult1x: [
            "<15>{#p/papyrus}{#f/20}EI, NÃO TEM NECESSIDADE DE SE INSULTAR!",
            "<15>{#f/15}VOCÊ ESTÁ AQUI PARA MELHORAR, LEMBRA?"
        ],
        sparableInsult2: ['<15>{#p/papyrus}{#f/21}HUMANO...'],
        sparableInsult2x: ['<15>{#p/papyrus}{#f/15}VAMOS...!'],
        sparableInsult3: ['<15>{#p/papyrus}{#f/21}...']
    },
    b_opponent_shockasgore: {
        act_check: ['<32>{#p/asriel2}* Asgore.\n* O rei que teve seu planeta natal destruído.'],
        act_hug: ['<32>{#p/human}* (Você tenta abraçar Asgore...)'],
        hugText: ['<32>{#p/human}* (...mas seu corpo passa direto por ele.)', '<32>{#p/asriel2}* ... huh?'],
        foodText: ['<11>{#p/asgore}{#f/5}Seria isso...'],
        idleText1: ['<11>{#p/asgore}{#f/1}Sério mesmo...'],
        idleText2: ['<11>{#p/asgore}{#f/1}Devemos nos abrir para a violência?'],
        idleText3: ['<11>{#p/asgore}{#f/1}Não podemos resolver isso pacificamente?'],
        idleText4: ['<11>{#p/asgore}{#f/1}Isso é realmente necessário?'],
        stickText: [
            '<32>{#p/human}* (Você joga a chave.)\n* (Asgore a deixa passar por ele.)',
            '<32>{#p/asriel2}* ... huh?'
        ],
        miss: [
            '<11>{#p/asgore}{#f/2}...',
            '<11>{#f/1}Eu não estou aqui de verdade, Asriel.',
            "<11>{#f/2}É só uma projeção."
        ],
        name: '* Asgore',
        status1: ['<32>{#p/asriel2}* Mate-o, $(name).'],
        status2: ['<32>{#p/asriel2}* ...']
    },

    i_berry: {
        battle: {
            description: 'Um pequeno ramo de bagas semi-translúcidas.',
            name: 'Exoberrys'
        },
        drop: ['<32>{#p/human}* (Você joga fora as Exoberries.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (7 HP.)']
                : ['<32>{#p/basic}* \"Exoberries\" Cura 7 HP\n* Um pequeno ramo de bagas semi-translúcidas.'],
        name: 'Exoberrys',
        use: ['<32>{#p/human}* (Você come as Exoberries.)']
    },
    i_blookpie: {
        battle: {
            description: 'Exoberries frescas, banhadas em um mar de gelatina úmida.',
            name: 'Torta de Frutas'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora a Torta de Frutas.)',
            ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

                ? game.room === '_frontier4' // NO-TRANSLATE

                    ? ['<32>{#p/napstablook}* ......... huh?']
                    : ['<32>{#p/napstablook}* oh..................']
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Torta de Frutas\" cura 99 HP\n* Exoberries frescas, banhadas em um mar de gelatina úmida.'],
        name: 'Torta de Frutas',
        use: () => [
            '<32>{#p/human}* (Você come a Torta de Frutas.)',
            ...(instance('main', 'blookishly') !== void 0 // NO-TRANSLATE

                ? game.room === '_frontier4' // NO-TRANSLATE

                    ? ['<32>{#p/napstablook}* ......... huh?']
                    : ['<32>{#p/napstablook}* aw.........\n* espero que você goste.........']
                : [])
        ]
    },
    i_chip: {
        battle: {
            description: 'Por favor, leve isso para o outro lado da galáxia.',
            name: 'Chip'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora o Chip de CPU.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? ["<25>{#p/asriel1}{#f/15}* Uh... você não ia meio que proteger isso aí?"]
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (45 HP. Mais do que comer, você sente que precisa manter este ítem em segurança.)']
                : ['<32>{#p/basic}* \"Chip de CPU\" Cura 45 HP\n* Por favor, leve isso para o outro lado da galáxia.'],
        name: 'Chip de CPU',
        use: () => [
            '<32>{#p/human}* (Você come o Chip de CPU.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? ["<25>{#p/asriel1}{#f/15}* Uh... você não ia meio que proteger isso aí?"]
                : world.darker || SAVE.data.b.ufokinwotm8
                    ? []
                    : calcHP() - SAVE.data.n.hp > 45
                        ? ['<32>{#p/basic}* Parece que seu número inteiro de HP foi aumentado.']
                        : ['<32>{#p/basic}* Parece que seus machucados foram curados.'])
        ]
    },
    i_eye: {
        battle: {
            description: 'Um escudo de força portátil.',
            name: 'Emissor'
        },
        drop: ['<32>{#p/human}* (Você jogou fora o Emissor de Escudo.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (7 DF.)']
                : ['<32>{#p/basic}* \"Emissor de Escudo\" (7 DF)\n* Um escudo de força portátil.'],
        name: 'Emissor de Escudo',
        use: ['<32>{#p/human}* (Você implantou o Emissor de Escudo.)']
    },
    i_eye_x: {
        battle: {
            description: 'Um campo de força portátil um tanto fraco.',
            name: 'Emissor?'
        },
        drop: ['<32>{#p/human}* (Você jogou fora o Emissor de Escudo.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (5 DF.)']
                : ['<32>{#p/basic}* \"Emissor de Escudo?\" (5 DF)\n* Um campo de força portátil um pouco fraco.'],
        name: 'Emissor de Escudo?',
        use: ['<32>{#p/human}* (Você implantou o Emissor de Escudo.)']
    },
    i_fruit: {
        battle: {
            description: 'Uma fruta não euclidiana, maior por dentro.',
            name: 'Fruta Fantasma'
        },
        drop: ['<32>{#p/human}* (Você coloca a Fruta Fantasma dentro de si.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : ['<32>{#p/basic}* \"Fruta Fantasma\" Cura 15 HP\n* Uma fruta não euclidiana, maior por dentro.'],
        name: 'Fruta Fantasma',
        use: ["<32>{#p/human}* (Você descompactou as muitas dimensões da Fruta Fantasma.)"]
    },
    i_glove: {
        battle: {
            description: "Uma luva biônica de última geração.\nÉ tão ruim.",
            name: 'Luva Forte'
        },
        drop: ['<32>{#p/human}* (Você jogou fora a Luva Forte.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (5 AT.)']
                : ['<32>{#p/basic}* \"Luva Forte\" (5 AT)\n* Uma luva biônica de última geração. É tão ruim.'],
        name: 'Luva Forte',
        use: ['<32>{#p/human}* (Você põe a Luva Forte.)']
    },
    i_glove_x: {
        battle: {
            description: "Não é a original, mas ainda sabe dar socos.",
            name: 'Luva?'
        },
        drop: ['<32>{#p/human}* (Você jogou fora a Luva Forte.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 AT.)']
                : ['<32>{#p/basic}* \"Luva Forte?\" (3 AT)\n* Não é a original, mas ainda sabe dar socos.'],
        name: 'Luva Forte?',
        use: ['<32>{#p/human}* (Você põe a Luva Forte.)']
    },
    i_milkshake: {
        battle: {
            description: 'Feito de uma substância branca misteriosa.',
            name: 'Milkshake'
        },
        drop: ['<32>{#p/human}* (Você se livra do Milkshake.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (18 HP.)']
                : ['<32>{#p/basic}* \"Milkshake\" Cura 18 HP\n* Feita de uma substância branca misteriosa.'],
        name: 'Milkshake',
        use: () => [
            '<32>{#p/human}* (Você engole até o último suspiro do Milkshake.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* ... salgado.'])
        ]
    },
    i_nice_cream: {
        battle: {
            description: 'Em vez de uma piada, o invólucro diz algo fantástico.',
            name: 'Sorvete Sonho'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Sorvete Sonho.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : ['<32>{#p/basic}* \"Sorvete Sonho\" Cura 15 HP\n* Ao invés de uma piada, o invólucro diz algo fantástico.'],
        name: 'Sorvete Sonho',
        use: pager.create(
            2,
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? '<32>* (O embrulho diz sobre um aventura que salvará o mundo.)'
                    : '<32>{#p/basic}* \"Você é um grande aventureiro, em uma missão para salvar o mundo!\"'
            ],
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? '<32>* (O embrulho menciona você como sendo o capitão de uma nave espacial.)'
                    : '<32>{#p/basic}* \"Você é o capitão de uma nave espacial, guiando todos para o espaço!\"'
            ],
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? '<32>* (O embrulho afirmava que você poderia resolver um mistério de maneira única.)'
                    : '<32>{#p/basic}* \"Um grande mistério escondido, apenas você pode encontrar a solução!\"'
            ],
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? '<32>* (O invólucro falava de seu esforço de viagem no tempo.)'
                    : '<32>{#p/basic}* \"Você voltou no tempo para impedir uma catástrofe terrível!\"'
            ],
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? '<32>* (O embrulho elogia sua capacidade científica.)'
                    : '<32>{#p/basic}* \"Você é um cientista brilhante à beira de um grande avanço!\"'
            ],
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? "<32>* (O embrulho fala sobre o mundo inocente no qual você acabou caindo.)"
                    : '<32>{#p/basic}* \"Você caiu em um mundo de criaturas inocentes, decida o que vai acontecer agora!\"'
            ],
            () => [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                SAVE.data.b.svr
                    ? '<32>* (O embrulho detalha seu novo poder.)'
                    : '<32>{#p/basic}* \"Você tem o poder de mudar o universo como deseja! Use com sabedoria!\"'
            ],
            [
                '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
                "<32>{#p/human}* (É uma ilustração holográfica de você encontrando uma família feliz.)"
            ]
        )
    },
    i_pop: {
        battle: {
            description: 'Altera sua percepção de tempo.',
            name: 'Pop Vórtice'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Pop Vórtice.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (11 HP.)']
                : [
                    '<33>{#p/basic}* \"Pop Vórtice\" Cura 11 HP\n* Altera sua percepção de tempo, apenas em batalha.'
                ],
        name: 'Pop Vórtice',
        use: () => [
            '<32>{#p/human}* (Você ingere o Pop Vórtice.)',
            ...(battler.active
                ? game.vortex
                    ? ['<32>{#p/human}* (Sua percepção de tempo já foi alterada.)']
                    : [
                        '<32>{#p/human}* (Sua percepção de realidade começou a mudar.)',
                        '<32>{#p/story}* O FOCO aumentou por dois turnos!'
                    ]
                : ['<32>{#p/human}* (Sem efeito fora de batalha.)'])
        ]
    },
    i_spaghetti: {
        battle: {
            description: 'Espaguete de seda, finamente envelhecido em uma unidade de dilatação do tempo.',
            name: 'Espaguete'
        },
        drop: () => [
            '<32>{#p/human}* (Você jogou fora o Espaguete.)',
            ...(game.room === 's_jenga' && SAVE.data.n.plot < 26 // NO-TRANSLATE

                ? []
                : !world.genocide && !world.runaway && (SAVE.data.n.state_papyrus_spaghet !== 0 || game.room === 's_bros') // NO-TRANSLATE

                    ? game.room === 'f_kitchen' // NO-TRANSLATE

                        ? [
                            SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* ...' : '<25>{#p/undyne}{#f/14}* ...',
                            "<25>{#p/undyne}{#f/17}* Eu vou tirar isso do chão e colocar pra esquentar na geladeira depois."
                        ]
                        : SAVE.data.n.plot === 72 && game.room === 'c_asgore_kitchen' // NO-TRANSLATE

                            ? [
                                '<18>{#p/papyrus}{#f/8}NÃOOO!!\nO QUE VOCÊ FEZ!?!?',
                                '<18>{#f/5}... O ESPAGUETE QUE EU FIZ PRA VOCÊ...',
                                '<18>{#f/4}... ERA... MEIO VELHO PRA SER SINCERO.',
                                '<18>{#f/0}É!!\nEU VOU FAZER UMA MELHOR DEPOIS!',
                                "<18>{#f/9}SINTA-SE LIVRE PARA IR PEGAR QUANDO ESTIVER PRONTO!",
                                '<25>{#p/sans}{#f/2}* Confia em mim.\n* O que ele vai fazer é bom demais pra jogar fora.',
                                '<18>{#p/papyrus}{#f/6}... ISSO!!'
                            ]
                            : (game.room === 's_bonehouse' && dateready()) || // NO-TRANSLATE

                                (fetchCharacters()
                                    .find(c => c.key === 'papyrus') // NO-TRANSLATE

                                    ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                                ? [
                                    '<18>{#p/papyrus}{#f/8}NÃOOO!!\nO QUE VOCÊ FEZ!?!?',
                                    '<18>{#f/5}... O ESPAGUETE QUE EU FIZ PRA VOCÊ...',
                                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                        ? [
                                            '<25>{#p/undyne}{#f/4}* Tudo perfeitamente bem!',
                                            '<25>{#p/undyne}{#f/7}* Humana!\n* Pegue o espaguete do chão AGORA!',
                                            "<18>{#p/papyrus}{#f/6}UNDYNE, POR FAVOR!!\nISSO É TOTALMENTE NOJENTO!!"
                                        ]
                                        : ['<18>{#f/6}... NÃO É MAIS CONSUMÍVEL!!']),
                                    "<18>{#f/4}ALIÁS... TALVEZ SEJA MELHOR ASSIM.",
                                    '<18>{#f/5}TIPO, TALVEZ TE VER JOGAR ELE FORA ASSIM...',
                                    '<18>{#f/6}VAI ME ENCORAJAR A FAZER COMIDAS AINDA MELHORES!',
                                    '<18>{#f/9}EI! OLHA COMO ENCORAJADO EU ME SINTO AGORA!',
                                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                        ? ['<25>{#p/undyne}{#f/17}*É! Olha o tanto que ele tá encorajado!!']
                                        : []),
                                    "<18>{#p/papyrus}{#f/9}EU FAREI A MELHOR REFEIÇÃO QUE A GALÁXIA JÁ VIU!",
                                    ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                        ? [
                                            "<25>{#p/undyne}{#f/7}* E você VAI gostar dessa vez!",
                                            "<18>{#p/papyrus}{#f/6}MAS ESTÁ TUDO BEM SE VOCÊ NÃO!!!",
                                            '<25>{#p/undyne}{#f/17}* OKAY!!!!',
                                            '<18>{#p/papyrus}{#f/9}OKAY!!!!!',
                                            '<25>{#p/undyne}{#f/8}* OKAY!!!!!!',
                                            '<18>{#p/papyrus}{#f/4}... OKAY.'
                                        ]
                                        : [])
                                ]
                                : instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                                    (fetchCharacters()
                                        .find(c => c.key === 'sans') // NO-TRANSLATE

                                        ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                                    ? [
                                        "<25>{#p/sans}{#f/0}* huh?\n* você não gosta do espaguete do meu irmão?",
                                        '<25>{#f/2}* mais pra mim, eu acho.'
                                    ]
                                    : []
                    : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (16 HP.)']
                : ['<32>{#p/basic}* \"Espaguete\" Cura 16 HP\n* Espaguete de Seda, envelhecido na máquina de destilação.'],
        name: 'Espaguete',
        use: () => [
            '<32>{#p/human}* (Você come o Espaguete.)',
            ...(game.room === 's_jenga' && SAVE.data.n.plot < 26 // NO-TRANSLATE

                ? []
                : !battler.active &&
                    !world.genocide &&
                    !world.runaway &&
                    (SAVE.data.n.state_papyrus_spaghet !== 0 || game.room === 's_bros') // NO-TRANSLATE

                    ? game.room === 'f_kitchen' // NO-TRANSLATE

                        ? [
                            SAVE.data.b.undyne_respecc
                                ? '<25>{#p/undyne}{#f/1}* Espaguete, huh?'
                                : '<25>{#p/undyne}{#f/14}* Espaguete, huh?',
                            "<25>{#p/undyne}{#f/8}* É melhor você gostar, é MINHA receita!"
                        ]
                        : SAVE.data.n.plot === 72 && game.room === 'c_asgore_kitchen' // NO-TRANSLATE

                            ? [
                                '<18>{#p/papyrus}{#f/1}O QUE?\nVOCÊ ACABOU DE COMER O ESPAGUETE?',
                                '<18>{#f/5}FAZ TEMPO QUE EU O FIZ.',
                                '<25>{#p/sans}{#f/2}* algumas horas, pelo menos.',
                                "<18>{#p/papyrus}{#f/6}BEM, EU DIRIA QUE ELE ESTÁ FORA DE DATA.",
                                "<18>{#f/6}E POR ISSO, EU DIGO QUE É UMA VERSÃO ANTIGA.",
                                "<18>{#f/4}MAS NÃO SE PREOCUPE.\nESTE NOVO ESPAGUETE AQUI...",
                                '<18>{#f/9}... É BEM MELHOR QUE O ANTIGO!',
                                "<18>{#f/9}SINTA-SE LIVRE PARA IR PEGAR QUANDO ESTIVER PRONTO!"
                            ]
                            : (game.room === 's_bonehouse' && dateready()) || // NO-TRANSLATE

                                (fetchCharacters()
                                    .find(c => c.key === 'papyrus') // NO-TRANSLATE

                                    ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                                ? SAVE.data.n.state_papyrus_spaghet === 0
                                    ? ((SAVE.data.n.state_papyrus_spaghet = 2),
                                        [
                                            '<18>{#p/papyrus}{#f/1}O QUE?\nVOCÊ ACABOU DE COMER O ESPAGUETE?',
                                            "<18>{#f/5}EU IRIA PERGUNTAR O QUE VOCÊ VAI FAZER COM ELE...",
                                            '<18>{#f/6}MAS PARECE QUE EU JÁ TENHO A RESPOSTA!',
                                            '<18>{#f/0}OBRIGADO, HUMANO, POR COMER NA MINHA FRENTE.'
                                        ])
                                    : [
                                        [
                                            '<18>{#p/papyrus}{#f/1}O QUE?\nVOCÊ ACABOU DE COMER O ESPAGUETE?',
                                            '<18>{#f/7}EU PENSEI QUE VOCÊ IRIA QUERER COMPARTILHAR!',
                                            ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                                ? [
                                                    "<25>{#p/undyne}{#f/7}* Bem, essa não foi o caso!",
                                                    '<18>{#p/papyrus}{#f/6}MAS ELE PROMETEU!'
                                                ]
                                                : []),
                                            '<18>{#f/5}... TALVEZ MINHA FORMA DE COZINHAR TENHA CULPA AQUI...',
                                            "<18>{#f/6}ESTAVA TÃO GOSTOSO, QUE VOCÊ NÃO CONSEGUIU NÃO COMER!",
                                            '<18>{#f/5}E COMER, E COMER...',
                                            "<18>{#f/6}ANTES DE PERCEBER, VOCÊ JÁ TINHA COMIDO O PRATO TODO!",
                                            ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                                ? ['<25>{#p/undyne}{#f/14}* Wow.\n* Que crime.']
                                                : []),
                                            '<18>{#p/papyrus}{#f/5}E PENSAR QUE MINHA COMIDA TE FEZ ME TRAIR...',
                                            "<18>{#f/9}N-NÃO...!\nEU VOU ARRUMAR ISSO!",
                                            '<18>{#f/4}... \"AHEM.\"',
                                            '<18>{#f/0}EU, PAPYRUS, DECLARO NULA SUA PROMESSA.',
                                            '<18>{#f/0}PRONTO!\nAGORA VOCÊ PODE COMER SEM CULPA ALGUMA!',
                                            ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                                ? [
                                                    '<25>{#p/undyne}{#f/11}* ...',
                                                    '<18>{#p/papyrus}{#f/4}(AJUDARIA SE VOCÊ COOPERASSE.)',
                                                    "<25>{#p/undyne}{#f/12}* Exato!\n* Sem culpa!\n* É assim que se come!",
                                                    '<18>{#p/papyrus}{#f/0}(OBRIGADO.)'
                                                ]
                                                : [])
                                        ],
                                        [
                                            '<18>{#p/papyrus}{#f/1}O QUE?\nVOCÊ ACABOU DE COMER O ESPAGUETE?',
                                            "<18>{#f/4}BEM, VOCÊ NÃO DISSE QUE IRIA DIVIDIR...",
                                            ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                                ? [
                                                    "<25>{#p/undyne}{#f/11}* Então, qual o problema?",
                                                    "<18>{#p/papyrus}{#f/0}OH, HMM, ACHO QUE NÃO TEM UM."
                                                ]
                                                : ["<18>{#f/0}HMM, EU SUPONHO QUE SEJA PARA O MELHOR."]),
                                            '<18>{#f/5}ATÉ PORQUE, SE VOCÊ -TIVESSE- FEITO TAL PROMESSA...',
                                            '<18>{#f/6}ESTARÍAMOS EM UMA SITUAÇÃO BASTANTE DIFÍCIL.',
                                            "<18>{#f/0}MAS VOCÊ NÃO FEZ! ENTÃO ESTAMOS BEM!",
                                            ...(fetchCharacters().find(c => c.key === 'undyne') !== void 0 // NO-TRANSLATE

                                                ? [
                                                    '<25>{#p/undyne}{#f/12}* E está tudo certo no mundo, huh?',
                                                    "<18>{#p/papyrus}{#f/7}EI, É ISSO QUE EU IRIA FALAR!",
                                                    '<18>{#f/0}MAS SIM.\nÉ SÓ ISSO.'
                                                ]
                                                : ['<18>{#f/0}E ESTÁ TUDO CERTO COM O MUNDO.'])
                                        ]
                                    ][SAVE.data.n.state_papyrus_spaghet - 1]
                                : instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                                    (fetchCharacters()
                                        .find(c => c.key === 'sans') // NO-TRANSLATE

                                        ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                                    ? [
                                        "<25>{#p/sans}{#f/3}* Está bom, huh?",
                                        "<25>{#f/2}* Eu deveria saber.\n* Foi eu quem experimentou."
                                    ]
                                    : []
                    : [])
        ]
    },
    i_swirl: {
        battle: {
            description: 'Um pãozinho de açúcar brilhante e colorido.',
            name: 'Rolinho'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Rolinho Radiante.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (22 HP.)']
                : ['<32>{#p/basic}* \"Rolinho Radiante\" Cura 22 HP\n* Um pãozinho de açúcar brilhante e colorido.'],
        name: 'Rolinho Radiante',
        use: ['<32>{#p/human}* (Você come o Rolinho Radiante.)']
    },
    i_voidy: {
        battle: {
            description: 'Leva a um lugar misterioso. Não usável em batalha.',
            name: 'Santuário'
        },
        drop: ['<32>{#p/human}* (Você jogou fora o Santuário.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Um dispositivo cuja origem está além dos limites da existência.)']
                : ['<32>{#p/basic}* Leva a um lugar misterioso.\n* Acessível andando.'],
        name: 'Santuário',
        use: () =>
            battler.active
                ? ['<32>{#p/human}* (Você usa o Santuário.)', '<32>{#p/human}* (Sem efeito em batalha.)']
                : ['<32>{#p/human}* (Você usa o Santuário.)']
    },
    i_corndog_sword: {
        battle: {
            description: 'Uma arma única.',
            name: 'Espada de Cão'
        },
        drop: ['<32>{#p/human}* (Você tenta jogar fora a Espada de Cão...)', '<32>{#p/human}* (... mas se recusa.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Você decide não questionar a lógica da arma.)']
                : ['<32>{#p/basic}* Uma arma única.'],
        name: 'Espada de Cão',
        use: () =>
            battler.active && battler.alive[0].opponent.metadata.corndogger
                ? [
                    '<32>{#p/human}* (Você coloca a Espada de Cão.)',
                    "<32>{#p/human}* (Você não consegue resistir a vontade de dar uma mordida.)",
                    [
                        '<32>{#p/human}* (Você consome a camada externa de empanamento...)',
                        '<32>{#p/human}* (Você consome a gorjeta...)',
                        '<32>{#p/human}* (Você consome a lâmina...)',
                        '<32>{#p/human}* (Você consome o punho...)',
                        '<32>{#p/human}* (Você consome o que resta...)'
                    ][SAVE.data.n.corndogger++],
                    '<32>{#p/basic}* De repente...!'
                ]
                : [
                    '<32>{#p/human}* (Você tenta comer a Espada de Cão...)',
                    "<32>{#p/human}* (... mas não detectou um nível de ameaça alto o suficiente!)"
                ]
    },
    i_fryz: {
        battle: {
            description: 'Ao menos uma vez, não está só \"agradavelmente quente.\"',
            name: 'Grillby'
        },
        drop: ["<32>{#p/human}* (Você jogou o Flamin Grillby como um molotov.)"],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (30 HP.)']
                : ['<32>{#p/basic}* \"Flamin Grillby\" Cura 30 HP\n* Pelo menos uma vez não está \"agradavelmente quente.\"'],
        name: "Flamin Grillby",
        use: ["<32>{#p/human}* (Você consome o Flamin'm Grillby.)"]
    },
    i_burgerz: {
        battle: {
            description: 'Como hambúrguers,\nmas menores.\nTrês sobrando.',
            name: 'Slider Trio'
        },
        drop: ['<32>{#p/human}* (Você joga fora os Sliders.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP. Três usos restantes.)']
                : ['<32>{#p/basic}* \"Sliders\" Cura 15 HP\n* Como hambúrguer, mas menor.\n* Três restando.'],
        name: 'Slider Trio',
        use: ['<32>{#p/human}* (Você come um dos Sliders.)']
    },
    i_burgerz_use1: {
        battle: {
            description: 'Como hambúrguers,\nmas menores.\nDois restando.',
            name: 'Slider Duo'
        },
        drop: ['<32>{#p/human}* (Você joga fora os Sliders.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP. Dois usos restantes.)']
                : ['<32>{#p/basic}* \"Sliders\" Cura 15 HP\n* Como burguers, mas menores.\n* Dois restando.'],
        name: 'Slider Duo',
        use: ['<32>{#p/human}* (Você come um dos Sliders.)']
    },
    i_burgerz_use2: {
        battle: {
            description: 'Como hambúrguers, mas menores.',
            name: 'Slider'
        },
        drop: ['<32>{#p/human}* (Você joga fora os Sliders.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP. Um uso restante.)']
                : ['<32>{#p/basic}* \"Sliders\" Cura 15 HP\n* Como burguers, mas menor.\n* Um restando.'],
        name: 'Slider',
        use: ['<32>{#p/human}* (Você come um dos Sliders.)']
    },

    k_premium: {
        name: 'Voucher de Assinatura Premium',
        description: () =>
            SAVE.data.b.f_state_voucher
                ? 'Usado em conjunto com sua assinatura de telescópio premium inexistente.'
                : 'Dado a você por Criança Monstro após usar um telescópio em Starton.'
    },

    k_inverter: {
        name: 'Controle de Inversor de Gravidade',
        description: () =>
            SAVE.data.b.s_state_inverter
                ? 'Usado para operar o inversor gravométrico.'
                : "Adquirido de um envelope no quarto do Sans."
    },

    k_security: {
        name: 'Chave Velha',
        description: () =>
            SAVE.data.n.state_aerialis_lockup > 0
                ? 'Usada para abrir o cofre no Rec Center.'
                : 'Adquirida na \"estação de polícia\" na parte norte da cidade de Starton.'
    },

    n_shop_blook: {
        exit: ["<32>{#p/napstablook}{#k/0}* oh... você está indo embora...", '<32>{#k/1}* bem, te vejo depois eu acho...'],
        item: () =>
            blookGone()
                ? [
                    '§fill=#808080§--- INDISPONÍVEL ---',
                    SAVE.data.b.item_blookpie ? '§fill=#808080§--- INDISPONÍVEL ---' : '0G - Torta de Gelatina Exoberry',
                    '0G - Fruta Fantasma',
                    '0G - Milkshake',
                    'Saída'
                ]
                : SAVE.data.n.plot === 72
                    ? [
                        SAVE.data.b.item_voidy ? '§fill=#808080§--- INDISPONÍVEL ---' : '432G - Santuário',
                        SAVE.data.b.item_blookpie ? '§fill=#808080§--- INDISPONÍVEL ---' : '80G - Torta de gelatina Exoberry',
                        '5G - Fruta Fantasma',
                        '5G - Milkshake',
                        'Saída'
                    ]
                    : [
                        SAVE.data.b.item_voidy ? '§fill=#808080§--- INDISPONÍVEL ---' : '432G - Santuário',
                        SAVE.data.b.item_blookpie ? '§fill=#808080§--- INDISPONÍVEL ---' : '100G - Torta de gelatina Exoberry',
                        '12G - Fruta Fantasma',
                        '16G - Milkshake',
                        'Saída'
                    ],
        itemInfo: [
            'Especial:\nLeva a um\nlugar\nmisterioso.',
            'Cura 99HP\nCresce no\nescuro.',
            "Cura 15HP\nÉ não\neuclidiana.",
            'Cura 18HP\nPode Conter\nEctoplasma.'
        ],
        itemPrompt: '<09>{#p/napstablook}{#k/3}viu algo que gostou?',
        itemPurchase: [
            '<09>{#p/napstablook}{#k/3}heh... obrigado...',
            "<09>{#p/napstablook}{#k/0}você não precisa comprar isso...",
            '<09>{#p/napstablook}{#k/0}foi mal... você tá sem g...',
            "<10>{#p/human}(Você está carregando muito.)"
        ],
        itemPurchasePrompt: () => (blookGone() ? 'Pegar?' : 'Comprar por\n$(x)G?'),
        itemUnavailable: () =>
            blookGone() ? '<09>{#p/basic}Nada sobrando.' : "<09>{#p/napstablook}{#k/0}oh... eu não tenho mais...",
        menu: () =>
            blookGone() ? ['Pegar', 'Roubar', 'Ler', 'Saída'] : ['Comprar', world.meanie ? 'Roubar' : 'Vender', 'Conversar', 'Saída'],
        menuPrompt1: () =>
            [
                '<23>{#p/napstablook}{#k/3}* Da uma olhada...',
                "<23>{#p/napstablook}{#k/3}* espero que você encontre o que está procurando...",
                "<23>{#p/napstablook}{#k/3}* Da uma olhada... ou não... é sua escolha...",
                '<23>{#p/napstablook}{#k/3}* Da uma olhada, eu acho...',
                "<23>{#p/napstablook}{#k/3}* Da uma olhada... ou não... é sua escolha..."
            ][Math.min(SAVE.data.n.state_wastelands_napstablook, 4)],
        menuPrompt2: '<23>{#p/napstablook}{#k/0}* Sinta-se livre pra ir embora quando quiser...',
        menuPrompt3: () =>
            world.bulrun ? '<23>{#p/basic}* ... Mas todos correram.' : '<23>{#p/basic}* ... Mas ninguém veio.',
        note: () =>
            ['f_blooky', 'f_napstablook'].includes(SAVE.data.s.state_foundry_deathroom) // NO-TRANSLATE

                ? ["<32>{#p/basic}* Não tem nenhuma nota aqui."]
                : SAVE.data.b.killed_mettaton
                    ? ["<32>{#p/basic}* Tem uma nota aqui.", '<32>{#p/napstablook}* \"é tudo sua culpa...\"']
                    : world.runaway
                        ? ["<32>{#p/basic}* Tem uma nota aqui.", '<32>{#p/napstablook}* \"nós não tivemos escolha...\"']
                        : ["<32>{#p/basic}* Tem uma nota aqui.", '<32>{#p/napstablook}* \"desculpa, tive que ir...\"'],
        sell1: () =>
            blookGone()
                ? ['<30>{#p/human}* (Você pegou 42G debaixo do balcão.)']
                : world.meanie
                    ? [
                        "<30>{#p/napstablook}{#k/2}* oh... você tá tentando me roubar...",
                        '<30>{#p/napstablook}{#k/5}* você deve realmente estar precisando...',
                        SAVE.data.b.item_voidy
                            ? "<30>{#k/0}* sinto muito... o único dinheiro que eu tenho bem de você..."
                            : "<30>{#k/0}* eu sinto muito... não tenho o que dar..."
                    ]
                    : [
                        '<30>{#p/napstablook}{#k/2}* oh... você queria vender alguma coisa...',
                        "<30>{#k/0}* eu não sei se posso comprar... meio sem grana..."
                    ],
        sell2: () =>
            blookGone()
                ? ['<30>{#p/basic}* Nada sobrando.']
                : world.meanie
                    ? [
                        "<30>{#p/napstablook}{#k/5}* um...\n* eu não posso te dar nada de valor verdadeiro...",
                        "<30>{#p/napstablook}{#k/0}* eu sei... é bem triste..."
                    ]
                    : [
                        '<30>{#p/napstablook}{#k/5}* um... você pode perguntar ao meu primo sobre vendas...',
                        '<30>{#k/0}* ele mora com a undyne, eu acho'
                    ],
        talk: (name: string) =>
            SAVE.data.n.plot === 72
                ? ['Dizer Oi', 'O que Houve', name, 'O Futuro', 'Saída']
                : [
                    'Dizer Oi',
                    'Fantasmas',
                    'Santuário',
                    65 <= SAVE.data.n.plot
                        ? SAVE.data.b.a_state_hapstablook && 68 <= SAVE.data.n.plot
                            ? 'Família'
                            : 'Sua Vida'
                        : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                            ? 'Mettaton'
                            : 60 <= SAVE.data.n.plot
                                ? 'Boneca Mew Mew'
                                : 48 <= SAVE.data.n.plot
                                    ? 'Viagens'
                                    : SAVE.data.b.napsta_performance
                                        ? 'DJ Blooky?'
                                        : SAVE.data.n.state_wastelands_napstablook === 0
                                            ? 'Dapper Blook?'
                                            : 'Sua Vida',
                    'Saída'
                ],
        talkPrompt: '<09>{#p/napstablook}{#k/1}oh, você quer conversar?',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/napstablook}{#k/3}* oh, ei...',
                        '<32>{#k/0}* eu acho que todo mundo sumiu por um tempo...',
                        '<32>{#k/1}* mas quando acordaram, todos sabiam seu nome...',
                        "<32>{#k/3}* então... seu nome é frisk, certo?",
                        '<32>{#k/4}* bem, bom te ver, frisk'
                    ]
                    : SAVE.data.b.a_state_napstadecline
                        ? ['<32>{#p/napstablook}{#k/2}* uh...', '<32>{#p/napstablook}{#k/2}* opa...']
                        : SAVE.data.n.state_wastelands_napstablook < 2
                            ? [
                                [
                                    '<32>{#p/napstablook}{#k/3}* oh, ei...',
                                    '<32>{#p/napstablook}{#k/3}* oh, bom te ver de novo...'
                                ][SAVE.data.n.state_wastelands_napstablook],
                                ...(world.meanie
                                    ? ["<32>{#k/0}* que olhar é esse?\n* eu fiz algo errado..."]
                                    : ['<32>{#k/4}* o que você tem feito?'])
                            ]
                            : SAVE.data.n.state_wastelands_napstablook < 5
                                ? [
                                    "<32>{#p/napstablook}{#k/0}* oh...\n* eu não tenho certeza do que dizer, sério...",
                                    '<32>{#k/3}* uhh... oi, eu acho?'
                                ]
                                : [
                                    '<32>{#p/napstablook}{#k/4}* heh...\n* opa...',
                                    '<32>{#k/3}* diz aí, você é novo por aqui?',
                                    "<32>{#k/5}* você não parece familiar..."
                                ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/napstablook}{#k/2}* sinceramente, eu não o que aconteceu...",
                        "<32>{#k/2}* o mesmo com toda minha família.\n* nós não fomos colocados para dentro igual os outros.",
                        '<32>{#k/1}* nós vimos uma luz branca vindo, mas quando ela chegou... nós a rejeitamos',
                        "<32>{#k/0}* ainda, mesmo sabendo que não os vivos por conta...",
                        "<32>{#k/3}* nós ouvimos tudo sobre o que você fez.",
                        '<32>{#k/3}* então... obrigado.'
                    ]
                    : [
                        '<32>{#p/napstablook}{#k/2}* você quer saber sobre fantasmas?',
                        '<32>{#k/0}* bem, os únicos fantasmas que conheço são eu, meus três primos...',
                        '<32>{#k/3}* e o que está atrás de você, é claro',
                        "<32>{#k/1}* além disso, não tem muito o que dizer",
                        '<32>{#k/0}* sem um corpo para nós fundir, nós meio que só... existimos',
                        '<32>{#k/0}* é, eu sei...\n* Parada interessante...'
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/napstablook}{#k/2}* ...',
                        "<32>{#k/2}* ele... ainda tá atrás de você... não tá?",
                        '<32>{#k/0}* é... eu posso vê-lo...',
                        ...(SAVE.data.b.oops
                            ? [
                                "<32>{#k/0}* ele... não gostou do fato de que eu estou falando sobre ele...",
                                '<32>{#k/0}* oh não...'
                            ]
                            : [
                                '<32>{#k/2}* ele parece... feliz?',
                                '<32>{#k/4}* frisk, se você foi capaz de fazê-lo sentir-se assim...',
                                '<32>{#k/3}* então você é realmente especial.'
                            ])
                    ]
                    : [
                        '<32>{#p/napstablook}{#k/3}* oh é... isso...',
                        '<32>{#k/1}* olha, um dia eu achei essa caixa jogada por aí...',
                        "<32>{#k/5}* quando eu abri, acabei encontrando este lugar que nunca vi...",
                        '<32>{#k/4}* de vez em quando eu gosto de visitar o lugar pra relaxar',
                        "<32>{#k/3}* é bem pacífico..."
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        SAVE.data.b.a_state_hapstablook
                            ? '<32>{#p/napstablook}{#k/0}* bem, após eu e meus primos resolvermos tudo...'
                            : "<32>{#p/napstablook}{#k/0}* bem, já que eu não tenho muito o que dizer...",
                        '<32>{#k/0}* eu percebi que era hora de tentar algo novo.',
                        '<32>{#k/3}* eu ouvi sobre os humanos nos arquivos, e me senti mal por eles...',
                        '<32>{#k/3}* então... eu adotei um.',
                        '<32>{#k/1}* eu só espero poder cuidar bem dele.'
                    ]
                    : 65 <= SAVE.data.n.plot
                        ? SAVE.data.b.a_state_hapstablook
                            ? 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/napstablook}{#k/3}* ei, Mettaton passou aqui faz pouco tempo.',
                                    "<32>{#k/0}* nós conversamos um pouco sobre tudo que passamos...",
                                    '<32>{#k/0}* sobre a família...',
                                    "<32>{#k/3}* bem, acho que eu nunca me senti tão feliz.",
                                    '<32>{#k/3}* o que você fez pela gente lá atrás... significou muito.'
                                ]
                                : [
                                    "<32>{#p/napstablook}{#k/0}* ei... desculpa as coisas não terem funcionado como esperávamos...",
                                    '<32>{#k/3}* foi legal te ver lá, de toda forma...'
                                ]
                            : [
                                '<32>{#p/napstablook}{#k/7}* com cada dia que passa, eu me sinto mais distante da felicidade...'
                            ]
                        : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                            ? [
                                "<32>{#k/7}* oh... você provavelmente deve estar se perguntando sobre a reunião",
                                "<32>{#k/7}* não se preocupa, ainda está acontecendo...",
                                '<32>{#k/7}* eu só vim aqui dar uma olhada na loja...'
                            ]
                            : 60 <= SAVE.data.n.plot
                                ? SAVE.data.b.a_state_napstadecline
                                    ? [
                                        '<32>{#k/7}* ...',
                                        "<32>{#k/7}* eu... não tô afim de conversar sobre isso...",
                                        ...(SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

                                            ? ["<32>{#k/2}* especialmente quando está bem aí nos seus ÍTENS..."]
                                            : [])
                                    ]
                                    : [
                                        '<32>{#k/1}* oh... sim......',
                                        '<32>{#k/3}* obrigado por concordar em me ajudar com aquilo',
                                        "<32>{#k/2}* mettaton tem estado meio estranho recentemente......",
                                        "<32>{#k/0}* eu não estou surpresa que ele fez isso",
                                        '<32>{#k/4}* alphys me fez assistir Mew Mew Aventura No Espaço com ela uma vez...',
                                        '<32>{#k/3}* Nós maratonamos as quatro temporadas em um noite...',
                                        '<32>{#k/6}* aquele final...',
                                        '<32>{#k/6}* foi algo inesperado........'
                                    ]
                                : 48 <= SAVE.data.n.plot
                                    ? [
                                        '<32>{#k/1}* é... é basicamente onde eu saio agora',
                                        ...[
                                            ['<32>{#k/0}* desculpa por atrapalhar seja lá o que você estava fazendo com meu primo...'],
                                            ['<32>{#k/0}* ...\n* você viu meu primo?'],
                                            ['<32>{#k/3}* ouvi dizer que meu primo realmente gosta de você...'],
                                            [
                                                "<32>{#k/5}* meu primo me disse que você não é a pessoa mais interessante de se estar...",
                                                '<32>{#k/5}* eu discordo......'
                                            ],
                                            [],
                                            []
                                        ][SAVE.data.n.state_wastelands_toriel === 0 ? 2 : SAVE.data.n.state_foundry_maddummy],
                                        '<32>* ...',
                                        "<32>{#f/1}* de toda forma\n* eu espero que você esteja bem...",
                                        '<32>{#f/2}* depois de starton, as coisas ficaram meio... malucas'
                                    ]
                                    : SAVE.data.b.napsta_performance
                                        ? [
                                            '<32>{#p/napstablook}{#k/1}* é, eu faço música as vezes',
                                            "<32>{#k/0}* pessoas dizem que são boas, mas sei que elas estão mentindo pra me fazer sentir bem...",
                                            '<32>{#k/4}* obrigado por ir no meu show, de toda forma...',
                                            '<32>{#k/3}* te ver me fez feliz...'
                                        ]
                                        : [
                                            [
                                                '<32>{#p/napstablook}{#k/2}* você quer dizer... aquele truque que eu te mostrei...?',
                                                '<32>{#k/1}* é, foi meu primo que me ensinou...',
                                                '<32>{#k/3}* ele e eu passávamos muito tempo juntos...',
                                                '<32>{#k/0}* então um dia, ele...',
                                                '<32>{#k/6}* ...',
                                                '<32>{#k/0}* esquece...'
                                            ],
                                            [
                                                "<32>{#p/napstablook}{#k/0}* oh, não tem muito mais o que dizer sobre a minha vida...",
                                                '<32>{#k/3}* te conhecer foi o ponto mais alto da minha semana...'
                                            ],
                                            [
                                                "<32>{#p/napstablook}{#k/0}* oh, não tem muito mais o que dizer sobre a minha vida...",
                                                '<32>{#k/6}* e graças a pessoas como você, provavelmente nunca haverá...'
                                            ],
                                            [
                                                "<32>{#p/napstablook}{#k/0}* oh, não tem muito mais o que dizer sobre a minha vida...",
                                                "<32>{#k/3}* Eu estou apenas... me conectando..."
                                            ],
                                            [
                                                "<32>{#p/napstablook}{#k/0}* oh, não tem muito mais o que dizer sobre a minha vida...",
                                                '<32>{#k/6}* não que... você se importe...'
                                            ],
                                            [
                                                "<32>{#p/napstablook}{#k/0}* oh, não tem muito mais o que dizer sobre a minha vida...",
                                                "<32>{#k/0}* eu sou só um fantasma que se perde na batida"
                                            ]
                                        ][SAVE.data.n.state_wastelands_napstablook]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },
    n_shop_hare: {
        exit: ['<32>{#p/basic}{#k/11}* Até mais\n* Volte de novo!'],
        item: () =>
            world.population === 0 || world.runaway
                ? [
                    '0G - Luva Forte?',
                    SAVE.data.b.item_eye ? '0G - Emissor de Escudo?' : '0G - Emissor de Escudo',
                    '0G - Pop Vórtice',
                    '0G - Rolante Radiante',
                    'Saída'
                ]
                : SAVE.data.n.plot === 72
                    ? [
                        '10G - Luva Forte?',
                        SAVE.data.b.item_eye ? '10G - Emissor de Escudo?' : '20G - Emissor de Escudo',
                        '8G - Pop Vórtice',
                        '5G - Rolante Radiante',
                        'Saída'
                    ]
                    : [
                        '30G - Luva Forte?',
                        SAVE.data.b.item_eye ? '30G - Emissor de Escudo?' : '40G - Emissor de Escudo',
                        '28G - Pop Vórtice',
                        '20G - Rolante Radiante',
                        'Saída'
                    ],
        itemInfo: () => [
            "Arma: 3AT\n((x) AT)\nBata-os.\nReplicada.",
            SAVE.data.b.item_eye
                ? 'Armadura: 5DF\n($(x) DF)\nProteção\npara um.\nReplicada.'
                : 'Armadura: 7DF\n($(x) DF)\nProteção\npara um.',
            'Cura 11HP\nDiminui\nSua\nPercepção.',
            "Cura 22HP\nÉ a receita\ndela."
        ],
        itemPrompt: '<09>{#p/basic}{#k/0}O que você gostaria de comprar?',
        itemPurchase: [
            '<09>{#p/basic}{#k/4}Obrigado pela compra.',
            '<09>{#p/basic}{#k/7}Só dando uma olhada?',
            "<09>{#p/basic}{#k/5}Isso não é dinheiro suficiente.",
            "<10>{#p/human}(Você está carregando muito.)"
        ],
        itemPurchasePrompt: () => (world.population === 0 || world.runaway ? 'Pegar?' : 'Comprar por\n$(x)G?'),
        menu: () =>
            world.population === 0 || world.runaway
                ? ['Pegar', 'Roubar', 'Ler', 'Saída']
                : ['Comprar', world.meanie ? 'Roubar' : 'Vender', 'Conversar', 'Saída'],
        menuPrompt1: '<23>{#p/basic}{#k/0}* Olá, viajante.\n* Como posso te ajudar?',
        menuPrompt2: '<23>{#p/basic}{#k/0}* Tome seu tempo.',
        menuPrompt3: () =>
            world.bulrun ? '<23>{#p/basic}* ... Mas todos correram.' : '<23>{#p/basic}* ... Mas ninguém veio.',
        note: () =>
            world.runaway
                ? ["<32>{#p/basic}* Tem uma nota aqui.", '<32>{#p/basic}* \"Por favor, não venha atrás de nós.\"']
                : SAVE.data.n.plot === 72
                    ? ["<32>{#p/basic}* Tem uma nota aqui.", '<33>{#p/basic}* \"Me desculpa, mas eu não pude voltar.\"']
                    : ["<32>{#p/basic}* Tem uma nota aqui.", '<33>{#p/basic}* \"Por favor, não machuque minha família.\"'],
        sell1: () =>
            world.population === 0 || world.runaway
                ? ['<30>{#p/human}* (Você pegou 758G de baixo do balcão.)']
                : world.meanie
                    ? [
                        "<30>{#p/basic}{#k/1}* Hã?\n* É a isso que estamos recorrendo agora?",
                        "<30>{#k/2}* Se você quiser alguma coisa, vai ter que comprar antes.",
                        '<30>{#k/12}* Sem exceção.'
                    ]
                    : [
                        "<30>{#p/basic}{#k/6}* Huh?\n* Vender?\n* Isso aqui parece loja de penhores?",
                        "<30>{#k/3}* Eu não sei como funciona de onde você veio... mas...",
                        "<30>* Se eu começasse a gastar meu dinheiro em tralhas e trajes espaciais usados, eu iria falir!"
                    ],
        sell2: () =>
            world.population === 0 || world.runaway
                ? ['<30>{#p/basic}* Nada sobrando.']
                : world.meanie
                    ? ["<30>{#p/basic}{#k/8}* Eu não sei qual é seu joguinho, mas não vai funcionar comigo."]
                    : [
                        "<30>{#p/basic}{#k/8}* Se você está realmente sofrendo por dinheiro, vá fazer algum serviço público.",
                        '<30>{#k/2}* Eu ouvi dizer que as pagam por QUALQUER COISA hoje em dia.'
                    ],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['Dizer Oi', 'O que Houve', 'Outlands', 'O Futuro', 'Saída']
                : ['Dizer Oi', 'O Que Fazer Aqui', 'História Da Cidade', 'Sua Vida', 'Saída'],
        talkPrompt: '<09>{#p/basic}{#k/0}Quer conversar?',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#k/4}* Ah, é você!\n* Foi você quem nos deu liberdade de volta!",
                        "<32>{#k/0}* Frisk, certo?\n* Todo mundo tá falando de você.",
                        "<32>{#k/5}* Todo mundo viu o que aconteceu... a essa altura você deve querer descansar.",
                        "<32>{#k/4}* Ainda assim.\n* Não dá pra não ficar animada, não é verdade?"
                    ]
                    : [
                        "<32>{#p/basic}{#k/4}* Oie! Bem vindo a Starton!\n* Mau posso me lembrar a última vez que vi cara nova por aqui.",
                        '<32>{#k/8}* De onde você veio?\n* Da Cidadela?',
                        "<32>{#k/7}* Você não parece turista.\n* Está por conta própria?"
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#k/8}* Você SABE o que aconteceu, não sabe?",
                        "<32>{#k/9}* E de novo, você deve ver as coisas um pouco diferentes...",
                        "<32>{#k/0}* Aqui.\n* Vou te dizer o que eu vi.",
                        '<32>{#k/0}* Então, fomos toda sugados por uma luz super forte...',
                        "<32>{#k/7}* Então... nós assistimos uma luta como se fosse pelo olhos de outra pessoa.",
                        "<32>{#k/5}* Você foi atacado por todos os lados, poderia jurar que te vi morrer...",
                        "<32>{#k/11}* Mas você ainda está aqui, então algo aconteceu.",
                        '<32>{#k/8}* Aí, você disse algo em particular, e seja lá o que estava te atacando... parou.',
                        '<32>{#k/9}* Depois disso acordamos, e o escudo de força havia caído.'
                    ]
                    : [
                        '<32>{#p/basic}{#k/8}* Você quer saber o que fazer aqui em Starton?',
                        "<32>{#k/9}* Grillby tem comida e a libraria tem informação...",
                        "<32>{#k/2}* Se estiver cansado, pode tirar uma soneca na pousada.\n* É bem ao lado, minha irmã dirige lá.",
                        "<32>{#k/0}* E se você estiver entediado, pode ir lá fora e assistir os esqueletos fazerem suas coisas.",
                        "<32>* Tem dois deles...\n* Irmãos, eu acho.\n* Eles estão aqui por todo o tempo que posso lembrar.",
                        '<32>{#k/9}* Oh, eu quase esqueci. Recentemente, um fantasma decidiu abrir uma loja no lado sul da cidade.',
                        "<32>{#k/11}* Não é muito, mas se você puder passar lá e dizer oi. Ele ama companhia, eu acho."
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/12}* Você ouviu?\n* Sobre as Outlands?',
                        '<32>{#k/2}* Aparentemente a Rainha estava escondida lá quem sabe por quanto tempo.',
                        '<32>{#k/8}* Bem inacreditável, né?',
                        "<32>{#k/10}* Eu estou surpresa que ela estava ainda mais impactada com a informação dos humanos vivos."
                    ]
                    : [
                        '<32>{#p/basic}{#k/9}* Lembre-se das aulas de história...',
                        '<32>{#k/0}* Tempos atrás os monstros viviam na hoje chama Foundry ou Fábrica.',
                        '<32>* Após um tempo, inventamos tecnologias para criar áreas no Outpost.',
                        "<32>* A primeira delas foi Starton, uma ótima área para uma cidade.",
                        "<32>{#k/10}* É pitoresco, mas eu meio que gosto disso, sabe?"
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#k/5}* Bem, acho que vou mover minha loja para o planeta novo...",
                        "<32>{#k/4}* ... não planejei muito mais do que isso."
                    ]
                    : [
                        '<32>{#p/basic}* A vida é a mesma de sempre.',
                        '<32>{#k/5}* Um pouco solitária...',
                        "<32>{#k/10}* Mas... nós sabemos que lá no fundo a liberdade está vindo, não é?",
                        '<32>{#k/9}* Com tanto que tenhamos essa esperança, podemos enfrentar as batalhas dia após dia...',
                        "<32>{#k/0}* Essa é a vida, não é?"
                    ]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },

    c_name_starton: {
        papyrus: () =>
            SAVE.data.n.plot_date < 2 || (SAVE.data.n.exp > 0 && SAVE.data.b.a_state_fishbetray)
                ? "Cell Papyrus"
                : 'Papyrus e Undyne'
    },

    c_call_papyrus: <Partial<CosmosKeyed<CosmosProvider<string[]>>>>{
        s_start: pager.create(
            0,
            () => [
                '<18>{#p/papiro}AH, AQUELA ESTRADA SOLITÁRIA À BEIRA DE STARTON.',
                '<18>{#p/papyrus}{#f/5}PODE PARECER GRANDE E VAZIA, MAS...',
                '<18>{#p/papyrus}{#f/0}EU TENHO MUITAS MEMÓRIAS NELA!',
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/0}POR EXEMPLO, QUANDO NÓS ERAMOS ESQUELETINHOS...',
                        '<18>{#p/papyrus}{#f/0}SANS E EU CORRÍAMOS DE CARRO DE UM LADO PARA O OUTRO.'
                    ]
                    : [
                        '<25>{#p/undyne}{#f/1}* Tipo que?',
                        '<18>{#p/papyrus}{#f/0}TIPO QUANDO EU E O SANS GOSTÁVAMOS DE DIRIGIR CARROS DE LADO A LADO!',
                        "<18>{#p/papyrus}{#f/5}NÓS ÍAMOS DE UM LADO AO OUTRO, SEM PARAR..."
                    ]),
                '<18>{#p/papyrus}{#f/4}INFELIZMENTE, NÃO IMPORTAVA O QUANTO EU TENTASSE...',
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/7}ELE SEMPRE FICAVA ME ESPERANDO NA LINHA DE CHEGADA!',
                        '<18>{#p/papyrus}{#f/5}IMAGINE MINHA FRUSTRAÇÃO.'
                    ]
                    : [
                        '<25>{#p/undyne}{#f/17}* Ele sempre te vencia no final?',
                        "<25>{#p/undyne}{#f/4}* Sim, mas é porque ele é um trapaceador!",
                        '<25>{#p/undyne}{#f/5}* Já viu a pontuação dele na máquina de praticar algo?',
                        "<25>{#p/undyne}{#f/8}* É tipo, um zilhão, ou sei lá!",
                        '<18>{#p/papyrus}{#f/4}OH, CONFIA EM MIM.\nEU SEI MUITO BEM.',
                        "<18>{#p/papyrus}{#f/7}EU REALMENTE QUERIA QUE ELE NÃO ROUBASSE EM COISAS ASSIM!",
                        '<18>{#p/papyrus}{#f/7}ACABA COM O JOGO PRA TODO MUNDO.',
                        '<25>{#p/undyne}{#f/1}* Ou talvez...',
                        '<25>{#p/undyne}{#f/8}* Ele provê um desafio mais interessante!!',
                        '<18>{#p/papyrus}{#f/4}... NÃO.'
                    ])
            ],
            () => [
                '<18>{#p/papyrus}{#f/5}SANS... SEMPRE FOI DE PEGAR ATALHOS',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/4}EU SUSPEITO QUE ELE TENHA TRAPACEADO CERTAS VITÓRIAS.']
                    : ["<18>{#p/papyrus}{#f/4}É PRATICAMENTE UMA LEI DA NATUREZA A ESTE PONTO."])
            ]
        ),
        s_sans: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}E ESSA AÍ É A ESTAÇÃO DE SENTINELA DO SANS.",
                '<18>{#p/papyrus}{#f/5}...',
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/5}EU ESCUTEI ELE FALANDO OUTRO DIA...',
                        '<18>{#p/papyrus}{#f/6}... SOBRE AJUDAR A EVITAR OUTROS GUARDAS.',
                        "<18>{#p/papyrus}{#f/5}EU NÃO TENHO CERTEZA, MAS PELO QUE PARECE...",
                        "<18>{#p/papyrus}{#f/5}HÁ... UMA CHANCE DE MEU IRMÃO SER UMA TOUPEIRA.",
                        '<18>{#p/papyrus}{#f/4}...',
                        '<18>{#p/papyrus}{#f/4}... OU UM RATO?'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/5}... O QUE MAIS EU POSSO DIZER?',
                        "<25>{#p/undyne}{#f/17}* Papyrus, você nunca olha... bem, pra cima?",
                        '<18>{#p/papyrus}{#f/6}QUE!?',
                        "<18>{#p/papyrus}{#f/7}VOCÊ SABE QUE EU NÃO TENHO TEMPO PRA ISSO!",
                        "<25>{#p/undyne}{#f/1}* Mas você nem precisa capturar ninguém por agora.",
                        '<18>{#p/papyrus}{#f/6}V-VERDADE! \nSÓ... NÃO PENSE MUITO SOBRE!!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}ESPERA...',
                        '<18>{#p/papyrus}{#f/1}... MINHA IRMÃO TEM SIDO UM RATO-TOPEIRA ESSE TEMPO TODO!?'
                    ]
                    : ["<18>{#p/papyrus}{#f/4}É ALGO... RETANGULAR."]
        ),
        s_crossroads: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}RECENTEMENTE, PESSOAS TEM DEIXADO NOTAS POR FORA.',
                '<18>SONHOS, PEDIDOS, OFERTAS DE ROMANCE...',
                ...(solo()
                    ? [
                        "<18>{#p/papyrus}{#f/9}PESSOALMENTE, EU ACHO EXCELENTE!",
                        "<18>{#p/papyrus}{#f/0}É ÓTIMO VER O ESFORÇO DAS PESSOAS.",
                        '<18>{#p/papyrus}{#f/4}JÁ MEU IRMÃO, BEM...',
                        "<18>{#p/papyrus}{#f/4}ELE PENSA QUE AS PESSOAS ESTÃO SENDO LUNÁTICAS."
                    ]
                    : [
                        '<18>...',
                        "<18>QUE -OLHAR- É ESSE UNDYNE?",
                        '<25>{#p/undyne}{#f/3}* ... você não viu nenhuma, uh...',
                        '<18>{#p/papyrus}{#f/0}... NENHUMA O QUE?',
                        '<25>{#p/undyne}{#f/15}* ... nota científica?',
                        '<18>{#p/papyrus}{#f/0}OH.',
                        '<18>{#p/papyrus}{#f/0}... NÃO.',
                        '<25>{#p/undyne}{#f/1}* Droga!'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}ME PERGUNTO COMO É A VIDA COM UMA LUTA EM ORBITA.']
                    : ["<18>{#p/papyrus}VOCÊ NÃO TEM NENHUM SONHO OU ESPERANÇA PARA COMPARTILHAR?"]
        ),
        s_human: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}SOBRE AQUELE GRANDE DISCURSO MEU...',
                '<18>{#p/papyrus}{#f/0}COINCIDENTEMENTE, EU PRATIQUEI ELE PELA PRIMEIRA VEZ NESTA SALA.',
                '<18>{#p/papyrus}{#f/9}E COM NINGUÉM MAIS, NINGUÉM MENOS QUE O SANS!',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}MAS DISCUTIMOS SOBRE QUAL CAMINHO DEVERÍAMOS FICAR.']
                    : [
                        "<25>{#p/undyne}{#f/14}* Tenho certeza de que você não teve nenhum argumento.",
                        '<18>{#p/papyrus}{#f/0}OH, DO CONTRÁRIO.',
                        '<18>{#p/papyrus}{#f/0}NÓS ARGUMENTAMOS BASTANTE UM COM O OUTRO.'
                    ]),
                "<18>{#p/papyrus}{#f/4}EU GIRARIA PARA UM LADO E DIRIA QUE ERA MELHOR...",
                "<18>{#p/papyrus}{#f/4}ENTÃO ELE GIRARIA E DIRIA QUE AQUELE ERA MELHOR.",
                '<18>{#p/papyrus}{#f/6}CONFORME ARGUMENTAMOS, GIRAMOS MAIS E MAIS.',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/0}MEIO QUE SE TORNOU UM RITUAL PRA GENTE."]
                    : [
                        '<25>{#p/undyne}{#f/1}* ... isso explica o que eu vi fora da minha casa mais cedo.',
                        '<18>{#p/papyrus}{#f/1}O QUE VOCÊ VIU!?',
                        '<18>{#p/papyrus}{#f/6}UH, ESPERA, EU POSSO EXPLICAR...',
                        '<18>{#p/papyrus}{#f/5}QUER DIZER, SANS SÓ ESTAVA PREOCUPADO... UH...',
                        "<18>{#p/papyrus}{#f/6}... PREOCUPADO POR EU ESTAR PASSANDO MUITO TEMPO POR LÁ!",
                        '<18>{#p/papyrus}{#f/6}ISSO!!',
                        "<25>{#p/undyne}{#f/16}* ... ele é seu irmão, não é?",
                        "<25>{#p/undyne}{#f/1}* Ele talvez só estivesse com vontade de passar mais tempo com você."
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/0}FATO INTERESSANTE.',
                        '<18>{#p/papyrus}{#f/0}SE VOCÊ ACABAR RODANDO DEMAIS EM ALTA VELOCIDADE...',
                        "<18>{#p/papyrus}{#f/0}VAI ACABAR NÃO RODANDO DE JEITO ALGUM.",
                        '<18>{#p/papyrus}{#f/4}... NÓS SEMPRE GIRAMOS NA DIREÇÃO OPOSTA.'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/0}TEMPO EM FAMÍLIA É IMPORTANTE.',
                        '<18>{#p/papyrus}{#f/9}AS VEZES É NECESSÁRIO USAR MAGIA DE VÔO.'
                    ]
        ),
        s_papyrus: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/9}NYEH HEH HEH!!\nIMPRESSIONADO!?!',
                '<18>{#p/papyrus}{#f/0}EU NÃO APENAS SOU O MELHOR EM ARMADILHAS...',
                "<18>{#p/papyrus}{#f/9}COMO TAMBÉM SOU UM GRANDE ARQUITETO DA FÍSICA!!!",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}EU PLANEJO CONSTRUIR MAIS COISAS QUANDO ME JUNTAR A GUARDA REAL.']
                    : [
                        '<25>{#p/undyne}{#f/1}* Sabe, eu estava pensando em renovar sua \"estação de sentinela...\"',
                        '<25>{#p/undyne}{#f/14}* Como... um presente surpresa!',
                        '<18>{#p/papyrus}{#f/4}VOCÊ O QUE?',
                        "<25>{#p/undyne}{#f/12}* Mas, uh, isso seria mexer na perfeição.",
                        '<18>{#p/papyrus}{#f/5}PERFEIÇÃO, VOCÊ DIZ?',
                        '<18>{#p/papyrus}{#f/6}MAS UMA VEZ VOCÊ DISSE QUE TUDO PODE SER MELHORADO!',
                        '<25>{|}{#p/undyne}{#f/17}* Bem... Sim!\n* Eu só quis dizer que- {%}',
                        '<18>{#p/papyrus}A SEMI-PERFEIÇÃO.\nQUE TAL CHAMARMOS ASSIM.',
                        '<25>{#p/undyne}{#f/12}* É, isso funciona.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/4}EU ESPERO QUE SANS POSSA ME AJUDAR A ENCONTRAR MATERIAIS MELHORES.",
                        '<18>{#p/papyrus}{#f/6}CAIXAS NÃO TE LEVAM MUITO LONGE!!'
                    ]
                    : ['<18>{#p/papyrus}OBRIGADO, HUMANO...', '<18>POR SER MEU SEMI-PERFEITO, AMIGO.']
        ),
        s_doggo: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}A ESTAÇÃO DE SENTINELA DO DOGGO...',
                '<18>{#p/papyrus}{#f/5}UM DIA, APÓS UM ACIDENTE COM OUTROS CACHORROS...',
                "<18>{#p/papyrus}{#f/5}ELE DISSE QUE NÃO SE SENTIA MAIS EM CASA.",
                '<18>{#p/papyrus}{#f/0}ENTÃO EU LHE-DEI UM ABRAÇO E PEDI PARA QUE CONTASSE TUDO.',
                '<18>{#p/papyrus}{#f/4}É CLARO, A UNIDADE CANINA É FORTE E ÚNICA.',
                "<18>{#p/papyrus}{#f/0}NÃO É SURPRESA QUE TUDO ACABOU BEM!",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/16}*Ah é, eu lembro daquele incidente.',
                        '<25>{#p/undyne}{#f/22}* Ele, uh...\n* Ele estava pensando em...',
                        '<18>{#p/papyrus}{#f/5}PENSANDO EM...?',
                        '<25>{#p/undyne}{#f/9}* ... obrigado por estar lá quando você esteve.',
                        "<25>{#p/undyne}{#f/16}* Sem você, ele talvez teria...",
                        '<18>{#p/papyrus}{#f/6}O QUE?\nTERIA O QUE??',
                        '<25>{#p/undyne}{#f/12}* ... uh, ele teria saído da guarda por um longo tempo.',
                        '<18>{#p/papyrus}{#f/0}OH, TUDO BEM.',
                        '<18>{#p/papyrus}{#f/5}EU ACHO QUE ISSO SERIA BEM RUIM.'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/0}BONDADE É UMA -VERDADEIRA- VIRTUDE!']
                    : ['<18>{#p/papyrus}{#f/9}NENHUM CACHORRO SAIRÁ DA GUARDA REAL EM MEU COMANDO!']
        ),
        s_robot: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}A VIDA COMO UM BOT CONSTRUTOR DEVE SER DIFÍCIL.',
                '<18>{#p/papyrus}{#f/5}SEJA LEGAL COM AQUELES QUE A INTELIGÊNCIA É ARTIFICIAL.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/16}* Isso... especialmente como um robô vivendo no Outpost atualmente.',
                        '<25>{#p/undyne}{#f/9}* Eu acho que ambos sabemos o motivo disso.',
                        '<18>{#p/papyrus}{#f/5}INFELIZMENTE.',
                        "<25>{#p/undyne}{#f/17}* Mas ei!\n* Não é de todo mau!",
                        '<25>{#p/undyne}{#f/14}* Até porque, o chip deles pode ser movido para outro computador.',
                        '<18>{#p/papyrus}{#f/0}OH! OH!\nEU ACHO QUE ENTENDI!',
                        "<18>{#p/papyrus}{#f/0}ASSIM ELE SERÁ CAPAZ DE ACESSAR A OUTERNET!",
                        '<18>{#p/papyrus}{#f/0}E A REDE DE TELESCÓPIO!',
                        '<18>{#p/papyrus}{#f/0}E MUITO MAIS!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}NUNCA DA PRA SABER A QUANTO TEMPO ELES ESTIVERAM SOZINHOS!!"]
                    : [
                        "<18>{#p/papyrus}{#f/0}ME PERGUNTO SE ELES CONSEGUIRAM VER MEU HISTÓRICO.",
                        '<18>{#p/papyrus}{#f/4}TODAS AQUELAS FOTOS DE MASSA PRÉ AQUECIDA...'
                    ]
        ),
        s_maze: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}SIM, SIM, EU SEI QUE MEUS QUEBRA-CABEÇAS PODEM SER DIFÍCEIS...',
                ...(SAVE.data.b.papyrus_fire
                    ? [
                        '<18>{#p/papyrus}{#f/9}MAS PENSE NELES COMO UM APRENDIZADO!',
                        '<18>{#p/papyrus}{#f/0}UM TESTE DE CARÁTER, ALÉM DA HABILIDADE.',
                        ...(solo()
                            ? []
                            : [
                                '<25>{#p/undyne}{#f/1}* Huh?\n* O que aconteceu?',
                                "<18>{#p/papyrus}{#f/5}O HUMANO NÃO SE SAIU BEM NA MURALHA DE FOGO SUPREMA.",
                                '<25>{#p/undyne}{#f/10}* Ah...',
                                "<25>{#p/undyne}{#f/8}* Então você tá me dizendo que ela não só voou simplesmente!?",
                                '<18>{#p/papyrus}{#f/6}HUMANOS PODEM VOAR??',
                                '<25>{#p/undyne}{#f/17}* ...',
                                "<25>{#p/undyne}{#f/17}* Então você tá me dizendo que ela não só passou pelo lado!?",
                                '<18>{#p/papyrus}{#f/6}UHHH...'
                            ])
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/0}MAS VOCÊ, MEU AMIGO, É BEM QUEBRADOR DE CABEÇA!',
                        "<18>{#p/papyrus}{#f/9}ESTE NÃO ERA UM PROBLEMA QUALQUER.",
                        ...(solo()
                            ? []
                            : [
                                '<25>{#p/undyne}{#f/1}* Huh?\n* O que aconteceu?',
                                '<18>{#p/papyrus}{#f/0}O HUMANO VENCEU MINHA FAMOSA \"PAREDE DE FOGO!\"',
                                '<25>{#p/undyne}{#f/8}* Deixa eu adivinhar!\n* Ele só andou pelo lado!!',
                                '<18>{#p/papyrus}{#f/4}NÃO, NA VERDADE ELE SÓ PASSOU POR ELA, JUSTAMENTE.',
                                '<25>{#p/undyne}{#f/1}* ... oh.',
                                '<25>{#p/undyne}{#f/14}* Meu próximo chute seria que ele havia voado por ela.',
                                '<18>{#p/papyrus}{#f/0}NÃO!\nSÓ PRÁTICA E PERSEVERANÇA!',
                                "<18>{#p/papyrus}{#f/5}MAS, EU NÃO SEI COMO ELE CONSEGUIU A PARTE DA PRÁTICA...",
                                '<18>{#p/papyrus}{#f/4}CONSIDERANDO QUE AQUELA FOI DEFINITIVAMENTE SUA PRIMEIRA TENTATIVA.',
                                ...(SAVE.data.b.undyne_respecc
                                    ? [
                                        "<25>{#p/undyne}{#f/1}* Heh.\n* Ela provavelmente deve ser uma natural para desafios.",
                                        "<25>{#p/undyne}{#f/12}* Eu não estou surpresa que ela venceu tão facilmente!"
                                    ]
                                    : [
                                        '<25>{#p/undyne}{#f/17}* Que?\n* Prática?\n* Dane-se isso!',
                                        '<25>{#p/undyne}{#f/7}* ME DÊ SEUS SEGREDOS AGORA, PIRRALHA!',
                                        '<18>{#p/papyrus}{#f/6}NÃO, DEIXE O MESTRE DESVIADOR DE ARMADILHAS EM PAZ!'
                                    ])
                            ])
                    ])
            ],
            () =>
                SAVE.data.b.papyrus_fire
                    ? solo()
                        ? [
                            '<18>{#p/papyrus}{#f/0}UM QUEBRA-CABEÇA POR DIA MANTÉM A \"PODRIDÃO CEREBRAL\" DEPRESSIVA!',
                            '<18>{#p/papyrus}{#f/4}OU SEJA LÁ COMO ELES DIZEM.'
                        ]
                        : [
                            "<18>{#p/papyrus}{#f/4}SÓ PRA DEIXAR CLARO, NÃO TEM COMO PASSAR PELOS LADOS.",
                            "<18>{#p/papyrus}{#f/0}COM ESPERANÇA VOCÊ NÃO ACABOU DE TENTAR FAZER ISSO."
                        ]
                    : solo()
                        ? ['<18>{#p/papyrus}{#f/6}NA PRIMEIRA TENTATIVA, NADA MAIS!!!']
                        : SAVE.data.b.undyne_respecc
                            ? [
                                '<18>{#p/papyrus}{#f/5}TALVEZ O FOGO POR SI SÓ JÁ INTIMIDAVA...',
                                '<18>{#p/papyrus}{#f/4}POR SUA PRESENÇA TÃO FORTE NO AMBIENTE.'
                            ]
                            : ['<18>{#p/papyrus}{#f/5}SE AO MENOS NÓS -TODOS- TIVÉSSEMOS SUA PEÇA DO QUEBRA-CABEÇA.']
        ),
        s_dogs: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}A ESTAÇÃO DE SENTINELA DO DOGAMY E DA DOGARESSA...',
                '<18>{#p/papyrus}{#f/0}AS VEZES EU ME PERGUNTO COMO DEVE SER UM CASAMENTO CANINO.',
                "<18>{#p/papyrus}{#f/4}MAS, EU NUNCA IREI SABER, PORQUE...",
                "<18>{#p/papyrus}{#f/9}A ÚNICA COISA QUE EU CASARIA SERIA UMA ESQUELETA BEM BONITA!",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* Então...',
                        "<18>{#p/papyrus}{#f/6}HUH?\nO QUE FOI?",
                        "<25>{#p/undyne}{#f/12}* Não é meio óbvio?\n* Você se casaria com uma versão feminina de você, bonitão!",
                        '<18>{#p/papyrus}{#f/4}BEM, EU SUPONHO QUE SEJA MUITO BEM APRESENTÁVEL...',
                        "<18>{#p/papyrus}{#f/0}MAS NADA QUE NÃO FOSSE PREDESTINADO A SER!"
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/6}O QUE!?!?\nNÃO PODEMOS CASAR!!",
                        ...(SAVE.data.b.flirt_papyrus
                            ? ["<18>{#p/papyrus}{#f/0}NÓS CONCORDAMOS QUE NÃO IRIA FUNCIONAR, LEMBRA?"]
                            : [
                                "<18>{#p/papyrus}{#f/0}NÓS JÁ SOMOS AMIGOS MUITO LEGAIS!",
                                '<18>{#p/papyrus}{#f/5}E SE EU ME CASASSE COM VOCÊ, BEM...',
                                "<18>{#p/papyrus}{#f/6}EU NÃO PODERIA MAIS TE TER COMO AMIGO!"
                            ])
                    ]
                    : ['<18>{#p/papyrus}{#f/4}QUE LASTIMA ISSO SERIA... MUITO TRISTE.']
        ),
        s_lesser: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ESSA SALA ERA CONECTADA COM UMA PONTE.',
                '<18>{#p/papyrus}{#f/4}DUAS METADES, UNIDAS NO PONTO CENTRAL...',
                '<18>{#p/papyrus}{#f/9}COMO AS ALMAS DE DOIS ESQUELETOS BEM VALENTES!',
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/5}...',
                        "<18>{#p/papyrus}{#f/5}EU NÃO SEI EXATAMENTE NO QUE O SANS ESTÁ PENSANDO AGORA...",
                        "<18>{#p/papyrus}{#f/4}MAS IMAGINO QUE TENHA MUITO A VER COM CONDIMENTOS.",
                        "<18>{#p/papyrus}{#f/5}SE ELE PELO MENOS PARASSE DE SER TÃO OBSESSIVO...",
                        '<18>{#p/papyrus}{#f/7}ENTÃO, EU NÃO PRECISARIA MAIS \"ALERTÁ-LO\" DE NADA!!'
                    ]
                    : [
                        "<25>{#p/undyne}{#f/1}* Ah, sim, vocês não estão ligados ou algo assim?",
                        '<18>{#p/papyrus}{#f/0}PELO TEMPO QUE CONSEGUIMOS NOS LEMBRAR!',
                        '<25>{#p/undyne}{#f/14}* Isso meio que me lembra daquelas histórias antigas...',
                        '<25>{#p/undyne}{#f/17}* ... de um esqueleto que uma vez experimentou em si mesmo.',
                        '<25>{#p/undyne}{#f/8}* Pelo que sabemos, VOCÊ e seu irmão poderiam estar envolvidos!!',
                        '<18>{#p/papyrus}{#f/1}EU, PARTE DE UM EXPERIMENTO DESCONHECIDO!?',
                        "<18>{#p/papyrus}{#f/7}ISSO É RIDÍCULO!",
                        '<25>{#p/undyne}{#f/15}* ... nunca se sabe...'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/5}EU QUERIA TER MAIS O QUE DIZER...',
                        "<18>{#p/papyrus}{#f/4}MAS NÃO CONSIGO PARAR DE PENSAR EM CONDIMENTOS..."
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/0}BEM, AGORA ESTOU CURIOSO EM RELAÇÃO AO MEU PASSADO.",
                        "<18>{#p/papyrus}{#f/9}NADA QUE UMA PESQUISA NÃO POSSA AJUDAR!",
                        "<25>{#p/undyne}{#f/14}* Se você quiser, posso te dar uma mãozinha...",
                        "<18>{#p/papyrus}{#f/5}NÃO, TUDO BEM.\nALIÁS, COMO CAPITÃ DA GUARDA REAL...",
                        '<18>{#p/papyrus}{#f/4}VOCÊ JÁ TEM MUITA COISA PRA FAZER.'
                    ]
        ),
        s_bros: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}AQUELES QUEBRA-CABEÇAS DE DESCOBRIR AS DIFERENÇAS QUE SANS GOSTA...',
                '<18>{#p/papyrus}{#f/5}BEM, OS QUE EU COSTUMAVA RESOLVER ERAM DIRETOS.',
                "<18>{#p/papyrus}{#f/7}MAS DEPOIS, ELES SE TORNARAM QUASE IMPOSSÍVEIS!",
                '<18>{#p/papyrus}{#f/4}TENDO QUE OLHAR A IMAGEM PIXEL POR PIXEL...',
                "<18>{#p/papyrus}{#f/7}NÃO É POSSÍVEL QUE ALGUÉM TENHA PACIÊNCIA PRA ISSO!",
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/7}É RIDÍCULO!"]
                    : [
                        '<25>{#p/undyne}{#f/1}* Aquela artista de desafios na libraria faz eles, eu acho.',
                        "<25>{#p/undyne}{#f/11}* ... algo me diz que ela é bem entediada com esse trabalho.",
                        "<18>{#p/papyrus}{#f/4}AGORA TEM UM QUEBRA CABEÇA...",
                        '<18>{#p/papyrus}{#f/0}VOU TER QUE IR ATÉ LÁ E \"RESOLVER!\"',
                        '<25>{#p/undyne}{#f/12}* Ou talvez você possa criar seu próprio...?',
                        '<18>{#p/papyrus}{#f/9}TALVEZ EU O FAÇA!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}VOCÊ TÁ PEDINDO PELA MINHA AJUDA?',
                        '<18>{#p/papyrus}{#f/7}BEM, ESQUEÇA!',
                        "<18>{#p/papyrus}{#f/0}QUEBRA-CABEÇAS INJUSTOS NÃO VALEM O DESAFIO DE RESOLVER."
                    ]
                    : [
                        '<25>{#p/undyne}{#f/1}* Toda vez que eu fico presa nessas coisas, eu mando pra direto pra Alphys.',
                        "<25>{#p/undyne}{#f/14}* Ela tem alguma coisa sofisticada de subtração de imagem ou algo assim.",
                        '<18>{#p/papyrus}{#f/0}SUBTRAÇÃO, VOCÊ DIZ?',
                        '<18>{#p/papiro}{#f/4}... O TERMO MAIS PRECISO NÃO SERIA \"COMPARAÇÃO?\"',
                        '<25>{#p/undyne}{#f/8}* Sei lá, mas subtrai minha dor de cabeça!'
                    ]
        ),
        s_spaghetti: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ALGUNS DIZEM QUE O MICRO-ONDAS NESTA SALA...',
                '<18>{#p/papyrus}{#f/0}TEM UMA FUNÇÃO \"SECRETA.\"',
                '<18>{#p/papyrus}{#f/5}QUE, SEM O CONHECIMENTO DA MAIORIA...',
                '<18>{#p/papyrus}{#f/4}QUE SUAS \"MICRO\" ONDAS SÃO NA VERDADE... GRAVITACIONAIS.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* E aqui eu pensei que minha \"geladeira quente\" era uma grande subversão.',
                        '<25>{#p/undyne}{#f/8}* Mas essa \"onda gravitacional\" ganha o título!',
                        '<25>{#p/undyne}{#f/11}* ... ou seria espaguete?',
                        '<18>{#p/papiro}SOMENTE SE FOSSE USADO PARA LEVANTAR UM PRATO TÃO DELICIOSO.',
                        '<18>{#p/papyrus}{#f/6}MAS, ESPERA!!\nSE A GRAVIDADE ERA TÃO FORTE...',
                        "<18>{#p/papyrus}{#f/6}ELA SE TRANSFORMARIA EM UM MONSTRO ESPAGUETE VOADOR!",
                        "<25>{#p/undyne}{#f/14}* ... agora há uma religião em que eu poderia acreditar."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/0}SE PELO MENOS HOUVESSE UMA FORMA DE DESLIGAR.']
                    : [
                        '<18>{#p/papyrus}{#f/5}QUANDO SE FALA DE MONSTRO DO ESPAGUETE...',
                        '<18>{#p/papyrus}{#f/0}EU PREFIRO QUE O MEU FIQUE PARADO E SEM VIDA.',
                        '<18>{#p/papyrus}{#f/0}BEM BONITINHO, COMO O TESTAMENTO DE UMA BOA COMIDA...',
                        '<18>{#p/papyrus}{#f/4}NO PRATO AO QUAL ELE SERÁ DEVORADO.'
                    ]
        ),
        s_puzzle1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}HMMM... A SOLUÇÃO PRA ESSE AÍ...?',
                '<18>{#p/papyrus}{#f/5}BEM, AS VEZES EU SÓ PULO PELOS LASERS.',
                '<18>{#p/papyrus}{#f/0}ENTÃO, UMA SOLUÇÃO É SER ALTO E FORTÃO!',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/4}... NÃO FAÇA ISSO SE VOCÊ FOR PEQUENO."]
                    : [
                        '<25>{#p/undyne}{#f/8}* Outra solução é voar com uma mochila a jato!!',
                        "<18>{#p/papyrus}{#f/4}JETPACKS NÃO SÃO A SOLUÇÃO PARA TUDO.",
                        '<18>{#p/papyrus}{#f/7}O QUE ACONTECEU COM APRECIAR O CENÁRIO?',
                        '<25>{#p/undyne}{#f/16}* ...',
                        '<25>{#p/undyne}{#f/16}* Eu tenho \"apreciado o cenário\" toda a minha vida, Papyrus.',
                        "<25>{#p/undyne}{#f/17}* Você nunca se cansou disso!?",
                        '<18>{#p/papyrus}{#f/6}NÃO!!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}ESTOU RESOLVENDO ISSO ENQUANTO FALAMOS..."]
                    : [
                        '<18>{#p/papyrus}{#f/5}HMM...',
                        '<18>{#p/papyrus}{#f/0}UNDYNE PROVAVELMENTE DEVERIA INVESTIR EM UM TELESCÓPIO.',
                        '<18>{#p/papyrus}{#f/4}EU OUVI DIZER QUE MEU IRMÃO ESTAVA OFERECENDO ASSINATURAS...'
                    ]
        ),
        s_puzzle2: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/4}OUVI DIZER QUE TEM UM TRUQUE PARA ESSES QUEBRA-CABEÇAS...",
                "<18>{#p/papyrus}{#f/5}ENVOLVENDO O QUE É EXIBIDO NAS PEÇAS.",
                '<18>{#p/papiro}{#f/6}... E AQUI EU PENSEI QUE ERA UM JOGO DE ADIVINHAÇÃO!',
                '<18>{#p/papyrus}{#f/0}ACHO QUE DA PRA APRENDER ALGO NOVO TODO DIA!',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/16}* Você ouviu sobre o mandado do Asgore?',
                        '<25>{#p/undyne}{#f/16}* Aparentemente, lasers são \"perigosos\" e \"machucam\" as crianças.',
                        '<18>{#p/papyrus}{#f/6}BEM, ELE TEM UM PONTO...',
                        '<25>{#p/undyne}{#f/4}* Cara!\n* Eles tiram a diversão de tudo hoje em dia!',
                        '<25>{#p/undyne}{#f/12}* Eu brincava o tempo todo com eles quando criança.',
                        '<18>{#p/papyrus}{#f/0}... AH.',
                        '<18>{#p/papyrus}{#f/4}É CLARO QUE VOCÊ ACHARIA ARRISCAR SUA VIDA \"DIVERTIDO.\"',
                        "<25>{#p/undyne}{#f/14}* E quem não acha!?!?",
                        '<18>{#p/papyrus}{#f/6}UM... EU???'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}ESPERA, ISSO AÍ É O QUE MEU IRMÃO FALA..."]
                    : [
                        "<18>{#p/papyrus}{#f/4}UMA COISA É ARRISCAR SUA VIDA...",
                        '<18>{#p/papyrus}{#f/7}E OUTRA É SÓ TENTAR JOGAR ELA FORA!'
                    ]
        ),
        s_jenga: pager.create(
            0,
            () =>
                SAVE.data.b.s_state_puzzlenote
                    ? [
                        '<18>{#p/papyrus}{#f/5}ESSE QUEBRA-CABEÇA, HEIN?',
                        '<18>{#p/papyrus}{#f/5}É UM DAQUELES QUE A SOLUÇÃO TALVEZ NUNCA SABEREMOS.',
                        '<18>{#p/papyrus}{#f/4}NA VERDADE A ÚNICA COISA QUE SEI...',
                        '<18>{#p/papyrus}{#f/5}É QUE POR AGORA, NENHUM DE NÓS DOIS SABE A SOLUÇÃO!',
                        ...(solo()
                            ? ['<18>{#p/papyrus}{#f/6}WOW!!!']
                            : [
                                '<25>{#p/undyne}{#f/1}* Fale sobre um trava-língua.',
                                "<18>{#p/papyrus}{#f/7}O QUE!?\nESQUELETOS NEM TEM LINGUAS!",
                                '<25>{#p/undyne}{#f/17}* Tá, OBVIAMENTE.',
                                "<25>{#p/undyne}{#f/16}* É... só uma figura de linguagem.",
                                "<18>{#p/papyrus}{#f/4}HMM... PENSAR QUE UM ESQUELETO NÃO PODE TER LÍNGUA...",
                                '<18>{#p/papyrus}{#f/5}ENQUANTO UMA PEQUENA ESTRELA AMARELA PODE.',
                                '<25>{#p/undyne}{#f/12}* Do que você tá falando?',
                                '<18>{#p/papyrus}{#f/6}... NADA!!!'
                            ])
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/5}DE PRIMEIRA, A SOLUÇÃO DESTE QUEBRA-CABEÇA ME DECEPCIONOU...",
                        '<18>{#p/papyrus}{#f/4}MAS ENTÃO, EU ENTENDI...',
                        '<18>{#p/papyrus}{#f/0}AS CHANCES DO QUE ACONTECEU ERAM TÃO BAIXAS...',
                        '<18>{#p/papyrus}{#f/9}... QUE TALVEZ NÓS SEJAMOS OS ÚNICOS QUE VIMOS ISSO!!',
                        '<18>{#p/papyrus}{#f/0}VOCÊ DEVE SE SENTIR MUITO SORTUDO AGORA.',
                        ...(solo()
                            ? []
                            : [
                                "<25>{#p/undyne}{#f/12}* Você não pegou?",
                                '<18>{#p/papyrus}{#f/0}PEGUEI O QUE?',
                                "<25>{#p/undyne}{#f/1}* Eu sei que tem um termo pra esse tipo de coisa.",
                                '<25>{#p/undyne}{#f/1}* A \"piada jenga.\"',
                                '<25>{#p/undyne}{#f/14}* Todas aquelas regras complicadas, sem mencionar...',
                                '<25>{#p/undyne}{#f/12}* Bom, tudo isso resultando em um zero.',
                                "<18>{#p/papyrus}{#f/0}EU NÃO SEI DO QUE VOCÊ TÁ FALANDO, MAS...",
                                '<18>{#p/papyrus}{#f/7}... EI, COMO -VOCÊ- SABE O QUE ACONTECEU ALI?',
                                "<25>{#p/undyne}{#f/15}* Olha... eu posso ter andando pela laboratório mais cedo, e...",
                                '<18>{#p/papyrus}{#f/7}VOCÊ ESTAVA ME ESPIANDO!?',
                                '<25>{#p/undyne}{#f/8}* Não você, Papyrus!!',
                                '<18>{#p/papyrus}{#f/4}OH.',
                                '<18>{#p/papyrus}{#f/7}... ENTÃO VOCÊ ESTAVA ESPIANDO O HUMANO!?!?',
                                "<25>{#p/undyne}{#f/17}* Eu sou a capitã da Guarda Real!!\n* O que você acha?"
                            ])
                    ],
            () =>
                solo()
                    ? SAVE.data.b.s_state_puzzlenote
                        ? ['<18>{#p/papyrus}{#f/5}OH, QUANTO AINDA NÃO SABEMOS OU NÃO SABEMOS MAIS...']
                        : ['<18>{#p/papyrus}A SORTE ESTÁ DO NOSSO LADO, HUMANO!']
                    : SAVE.data.b.s_state_puzzlenote
                        ? ['<18>{#p/papyrus}{#f/5}A BIOLOGIA DOS MONSTROS É ESTRANHA.']
                        : ['<18>{#p/papyrus}PIADA OU NÃO, E AINDA ASSIM É BASICAMENTE SORTE, HUH?']
        ),
        s_pacing: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}A ESTAÇÃO CANINA DO CANIS MINOR.',
                '<18>{#p/papyrus}{#f/4}E TAMBÉM O LOCAL FAVORITO DOS VENDEDORES DE PEDAÇO DA LUA.',
                '<18>{#p/papyrus}{#f/5}HMM... ME PERGUNTO DO QUE ESSAS PEDRAS REALMENTE SÃO FEITAS.',
                "<18>{#p/papyrus}{#f/4}ELAS NÃO PODEM SER FEITAS DA LUA, PORQUE...",
                '<18>{#p/papyrus}{#f/7}A LUA É UMA PEDRA GRANDONA!',
                '<18>{#p/papyrus}{#f/5}SIGNIFICA QUE A LUA SERIA UMA PEDRA DA LUA POR SI SÓ?',
                '<18>{#p/papyrus}{#f/5}ONDE A \"LUA\" ACABA E COMEÇA A \"PEDRA DA LUA?\"',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Eu não acho que tem uma resposta clara pra isso, Papyrus.",
                        "<25>{#p/undyne}{#f/7}* ... não que você não deva pensar sobre isso!!",
                        '<25>{#p/undyne}{#f/1}* Perguntas assim são ótimas para exercitar o cérebro!',
                        '<25>{#p/undyne}{#f/14}* Também conhecido como o músculo mais importante do corpo.',
                        '<18>{#p/papyrus}{#f/4}PARA UM HUMANO, PELO MENOS...',
                        "<18>{#p/papyrus}{#f/7}MAS PARA UM MONSTRO, É INTEIRAMENTE DIFERENTE!",
                        '<25>{|}{#p/undyne}{#f/12}* Eu sei, eu só estava tentando facilitar para a humana- {%}',
                        "<18>{#p/papyrus}{#f/0}MONSTROS NÃO USAM EXATAMENTE O CÉREBRO PRA PENSAR.",
                        "<18>{#p/papyrus}{#f/4}É MAIS TIPO... UMA COISA DA ALMA.",
                        '<25>{#p/undyne}{#f/1}* Em oposição a uma coisa de crânio.',
                        '<18>{#p/papyrus}{#f/7}OH MEU PAI!!!'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}TALVEZ MORTAIS COMO NÓS NÃO TENHAMOS CAPACIDADE DE TAL CONHECIMENTO.']
                    : ['<25>{#p/undyne}{#f/12}* Só me chama de \"piaundyne.\"', "<18>{#p/papyrus}{#f/0}POR FAVOR, NÃO."]
        ),
        s_puzzle3: pager.create(
            0,
            [
                '<18>{#p/papyrus}{#f/5}ENTÃO...\nO QUE ACONTECEU AQUI É...',
                '<18>{#p/papyrus}{#f/5}...',
                "<18>{#p/papyrus}{#f/4}MELHOR NÃO FALARMOS SOBRE ESSA ARMADILHA."
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}...']
                    : [
                        "<25>{#p/undyne}{#f/12}* ... não é de todo mal, certo?",
                        '<18>{#p/papyrus}{#f/5}CONFIA EM MIM.',
                        '<18>{#p/papyrus}{#f/4}FOI BEM RUIM.',
                        '<25>{#p/undyne}{#f/11}* ... se você diz...'
                    ],
            () => (solo() ? ['<18>{#p/papyrus}{#f/4}...'] : ['<25>{#p/undyne}{#f/7}* Ele disse que não quer falar sobre isso!!'])
        ),
        s_greater: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}A ESTAÇÃO DE SENTINELA DO CANIS MAJOR...',
                '<18>{#p/papyrus}{#f/5}AQUELE CACHORRO TEM UM CORAÇÃO DE -OURO- POLIDO.',
                '<18>{#p/papyrus}{#f/4}SE EU PELO MENOS ESTIVESSE NA GUARDA REAL...',
                "<18>{#p/papyrus}{#f/0}ENTÃO, EU SERIA CAPAZ DE RETRIBUIR SUA BONDADE!",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14} Eu poderia fazer isso por você, se você quiser.',
                        "<18>{#p/papyrus}{#f/7}NÃO É A MESMA COISA SE EU NÃO FIZER POR CONTA PRÓPRIA!",
                        "<25>{#p/undyne}{#f/17}* Não da pra esperar até ele chegar em casa!?",
                        "<18>{#p/papyrus}{#f/7}É MELHOR SE EU FIZER ISSO ONDE ELE TRABALHA!",
                        "<25>{#p/undyne}{#f/1}* Você tá certo.\n* Vou te deixar aparecer como holograma lá.",
                        '<18>{#p/papyrus}{#f/7}UGH!!!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}É TRISTE QUE EU TALVEZ NUNCA SEJA UM GUARDA REAL."]
                    : ['<18>{#p/papyrus}{#f/7}NADA JAMAIS VAI SUBSTITUIR UM CONVERSA -OLHO- A -OLHO-.']
        ),
        s_math: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}MATEMÁTICA -TEM- SEMPRE FOI UMA IMPLICÂNCIA MINHA',
                '<18>{#p/papyrus}{#f/5}CÁLCULO ISSO, GEOMETRIA AQUILO...',
                '<18>{#p/papyrus}{#f/4}O QUE ACONTECEU COM CONTAR NOS DEDOS ESQUELETICOS?',
                '<18>{#p/papyrus}{#f/7}TODA ESSE \"AVANÇO\" NA MATEMÁTICA É TOTALMENTE DESNECESSÁRIA!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Você realmente acredita nisso, não é?",
                        "<25>{#p/undyne}{#f/17}* Nós estaríamos vivendo na era das trevas se não fossem pelos matemáticos!",
                        "<25>{#p/undyne}{#f/16}* E... isso TAMBÉM significaria ter um planeta natal...",
                        '<18>{#p/papyrus}{#f/5}EU SEI, EU SEI...',
                        "<18>{#p/papyrus}{#f/7}EU SÓ NÃO GOSTO DE RESOLVER!",
                        "<25>{#p/undyne}{#f/14}* Oh, não, eu entendo você."
                    ])
            ],
            () => [
                '<18>{#p/papyrus}{#f/0}SE VOCÊ REALMENTE QUER AJUDA COM MATEMÁTICA AVANÇADA...',
                ...(solo()
                    ? [
                        "<18>{#p/papyrus}{#f/0}NÃO TEM NINGUÉM MELHOR QUE A DOUTORA ALPHYS!!",
                        "<18>{#p/papyrus}{#f/4}ELES DIZEM QUE ELA É UMA CALCULADORA VIVA...",
                        '<18>{#p/papyrus}{#f/0}E UMA DAQUELAS CIENTÍFICAS, SABE?'
                    ]
                    : [
                        '<25>{#p/undyne}{#f/1}* Só pergunta pra Dr. Alphys?',
                        '<18>{#p/papyrus}{#f/9}WOW, EU ME PERGUNTO O QUE TE DEU ESSA IDEIA!!',
                        '<18>{#p/papyrus}{#f/4}... OH ESPERA.',
                        "<18>{#p/papyrus}{#f/4}É PORQUE ELA ARQUIVA TODOS OS SEUS RELATÓRIOS PARA VOCÊ.",
                        "<25>{#p/undyne}{#f/17}* Ela é boa nesse tipo de coisa, certo?"
                    ])
            ]
        ),
        s_bridge: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}LEMBRA DO \"DESAFIO DO TERROR MORTAL?\"',
                '<18>{#p/papyrus}{#f/4}ACREDITE OU NÃO, TEM UMA SÉTIMA ARMA SECRETA...',
                "<18>{#p/papyrus}{#f/6}QUE IRIA TE DEIXAR SEM FÔLEGO!",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}...']
                    : [
                        "<25>{#p/undyne}{#f/12}* E aquela que te deixa sem saber o que falar?",
                        "<18>{#p/papyrus}{#f/0}ESSA É A SUPER SECRETA OITAVA, NA VERDADE.",
                        '<25>{#p/undyne}{#f/1}* Ooh.\n* Parece perigoso.',
                        "<18>{#p/papyrus}{#f/6}POR QUE VOCÊ ACHA QUE EU NÃO USEI?"
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/6}... LITERALMENTE!!']
                    : [
                        "<18>{#p/papyrus}{#f/4}NEM ME FAÇA COMEÇAR...",
                        '<18>{#p/papyrus}{#f/4}NA SUPER HYPER SECRETA, DECIMA ARMA.',
                        '<18>{#p/papyrus}{#f/6}... ESPERA, EU ESQUECI A MEGA-SECRETA NONA ARMA!',
                        '<18>{#p/papyrus}{#f/0}AQUELA TE DEIXARIA COM OS OSSOS TREMENDO.'
                    ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/0}QUE BOM QUE EU NÃO USEI, HUH?",
                        '<18>{#p/papyrus}{#f/4}SEM MENCIONAR TODAS AS OUTRAS DOZE ARMAS QUE EU TINHA.'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/4}E SUA CAMISA, E SEUS SAPATOS...',
                        '<18>{#p/papyrus}{#f/6}... MAS MAIS IMPORTANTE, SEU SERVIÇO!'
                    ]
        ),
        s_town1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}CIDADE DE STARTON: LADO NORTE!',
                "<18>{#p/papyrus}{#f/5}UM LADO NO QUAL EU NÃO PASSO MUITO TEMPO.",
                '<18>{#p/papyrus}{#f/4}SANS, POR OUTRO LADO...',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/4}... BEM, ACHO QUE VOCÊ PODE IMAGINAR PORQUE ELE PASSA.']
                    : [
                        "<25>{#p/undyne}{#f/14}* ... gosto da comida nova e melhorada que está vendendo no Grillby!",
                        '<18>{#p/papyrus}{#f/4}NOVA E MELHORADA, VOCÊ DIZ?',
                        '<18>{#p/papyrus}{#f/5}EU SUPONHO QUE SEJA MELHOR DO QUE ANTES...',
                        '<18>{#p/papyrus}{#f/7}MAS AINDA ASSIM, NADA COMPARADO AO ESPAGUETE FEITO EM CASA!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}TEM ALGO HAVER COM O GRILLBY."]
                    : [
                        '<18>{#p/papyrus}{#f/5}SE AO MENOS ELE APRECIASSE O QUE EU FAÇO POR ELE.',
                        '<18>{#p/papyrus}{#f/6}IRMÃOS, ESTAREI EU CERTO?'
                    ]
        ),
        s_taxi: pager.create(
            0,
            () => [
                ...(SAVE.data.n.plot < 65
                    ? [
                        '<18>{#p/papyrus}{#f/0}O TAXI AINDA NÃO ESTÁ AÍ?',
                        '<18>{#p/papyrus}{#f/5}HMM... ELE TENDE A FICAR OCUPADO PELO FIM DO DIA.'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/0}OUVI DIZER QUE O TÁXI FINALMENTE SAIU!',
                        "<18>{#p/papyrus}{#f/5}HMM... ISSO DEVE SIGNIFICAR QUE ESTAMOS NAS ÚLTIMAS HORAS."
                    ]),
                '<18>{#p/papyrus}{#f/6}COMO DIFERENCIAR O COMEÇO E O FIM DO DIA?',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/4}... EU VOU TE EXPLICAR ISSO LOGO, LOGO."]
                    : [
                        '<25>{#p/undyne}{#f/12}* Uh... Eu acho que você acabou de inventar.',
                        '<25>{#p/undyne}{#f/17}* Não TEM fim ou começo de dia no Outpost.',
                        '<18>{#p/papyrus}{#f/4}CORRETO...',
                        '<18>{#p/papyrus}{#f/9}... ATÉ AGORA!',
                        '<18>{#p/papyrus}{#f/9}EM POUCO TEMPO TODOS IRÃO ADOTAR MEU SISTEMA!',
                        "<18>{#p/papyrus}{#f/0}SERÁ UMA GRANDE REVOLUÇÃO NA CONTAGEM DO TEMPO!"
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/6}EVENTUALMENTE!!!']
                    : [
                        '<18>{#p/papyrus}{#f/4}PARA NOSSA PRIMEIRA REUNIÃO DA REVOLUÇÃO...',
                        "<18>{#p/papyrus}{#f/0}NÓS VAMOS PRECISAR CONCORDAR EM UM TEMPO ESPECÍFICO.",
                        "<18>{#p/papyrus}{#f/9}MAS NÃO SE PREOCUPE!\nEU VOU DIZER AOS PARTICIPANTES...",
                        '<18>{#p/papyrus}{#f/9}... QUE CHEGUEM NO COMEÇO DO DIA!',
                        '<25>{#p/undyne}{#f/1}* E como eles vão saber que hora é o começo do dia?',
                        '<18>{#p/papyrus}{#f/4}VERDADE...',
                        "<18>{#p/papyrus}{#f/0}VAMOS TER QUE DISCUTIR ISSO NA REUNIÃO."
                    ]
        ),
        s_town2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}CIDADE DE STARTON: O LADO SUL!',
                '<18>{#p/papyrus}{#f/4}OU COMO EU GOSTO DE CHAMAR...',
                '<18>{#p/papyrus}{#f/9}O MELHOR LADO DO COSMO!',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* Sem dúvida, porque você vive lá.',
                        '<18>{#p/papyrus}{#f/4}NÃO APENAS ISSO.',
                        "<18>{#p/papyrus}{#f/0}TAMBÉM É O LADO ONDE NÃO TEM O GRILLBY!"
                    ])
            ],
            [
                "<18>{#p/papyrus}{#f/4}FICO FELIZ QUE UM FANTASMA AMIGÁVEL COLOCOU UMA LOJA AQUI.",
                "<18>{#p/papyrus}{#f/9}QUEM NÃO GOSTARIA DE ESTAR PERTO DE TAMANHA GRANDEZA?",
                "<18>{#p/papyrus}{#f/0}EU CERTAMENTE NÃO PODERIA RESISTIR."
            ]
        ),
        s_battle: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/9}OLHANDO O LUGAR ONDE NÓS BATALHAMOS?',
                "<18>{#p/papyrus}{#f/0}NÃO, NÃO, VAI LÁ.\nÉ UM LUGAR DE VALOR HISTÓRICO.",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/1}* Não admire a vista por tempo demais, pirralha!",
                        "<25>{#p/undyne}{#f/7}* Você ainda precisa admirar o local da NOSSA lendária batalha!",
                        '<18>{#p/papyrus}{#f/6}EM QUANTOS BATALHAS LENDÁRIAS ELE ESTEVE?',
                        '<25>{#p/undyne}{#f/8}* Quem sabe!!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}TERÁ QUE SER UM MUSEU ALGUM DIA..."]
                    : [
                        '<25>{#p/undyne}{#f/1}* Independentemente do que aconteça agora...',
                        '<25>{#p/undyne}{#f/7}* É melhor você não ter uma batalha mais lendária que a NOSSA!',
                        '<25>{#p/undyne}{#f/14}* A não ser que eu faça parte dela!\n* Fuhuhu!'
                    ]
        ),
        s_exit: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}CUIDADO AGORA...',
                '<18>{#p/papyrus}{#f/0}ESSA PORTA É A ENTRADA DA FOUNDRY.',
                '<18>{#p/papyrus}{#f/5}APENAS A ESCURIDÃO TE ESPERA EM TAL LUGAR.',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/1}* Você não terá opiniões de minha parte.",
                        '<25>{#p/undyne}{#f/16}* Metade do tempo, eu apenas uso meu jetpack como uma lanterna...',
                        '<18>{#p/papyrus}{#f/6}E AS OUTRAS LANTERNAS QUE EU TE DEI?',
                        '<25>{#p/undyne}{#f/1}* Oh, aquelas?',
                        '<25>{#p/undyne}{#f/14}* ... é, eu meio que parei de usar elas depois de usar o jetpack.',
                        '<18>{#p/papyrus}{#f/4}É CLARO...'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/6}EU JÁ MENCIONEI A ESCURIDÃO QUE TE AGUARDA?']
                    : [
                        "<18>{#p/papyrus}SE EU APRENDI UMA COISA COM A UNDYNE...",
                        "<18>{#p/papyrus}{#f/5}É QUE TUDO VOLTA PARA AQUELE JETPACK.",
                        '<18>{#p/papyrus}{#f/4}NÃO IMPORTA O TEMPO, OU LUGAR...',
                        "<18>{#p/papyrus}{#f/5}ELA SEMPRE SE METE EM CONFUSÃO POR CAUSA DELE.",
                        "<25>{#p/undyne}{#f/14}* E você não faria de outra maneira!",
                        '<25>{#p/undyne}{#f/17}* Certo?',
                        '<18>{#p/papyrus}{#f/6}... É CLARO!!'
                    ]
        ),
        s_grillbys: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/5}ENTÃO... GRILLBY.",
                '<18>{#p/papyrus}{#f/5}TEM REALMENTE UMA MAQUINA DE MOLHO INSTALADA AÍ...',
                "<18>{#p/papyrus}{#f/6}SÓ PRA SATISFAZER AS VONTADES DO MEU IRMÃO?",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/13}* Uma o que?',
                        '<18>{#p/papyrus}{#f/4}MAQUINA DE MOLHO.',
                        '<18>{#p/papyrus}{#f/4}SABE, PRA JOGAR MOLHO YAMOK.'
                    ]),
                '<18>{#p/papyrus}{#f/4}...',
                '<18>{#p/papyrus}{#f/4}EU NORMALMENTE TENHO ESPERANÇA PELO NOSSA ESPÉCIE, MAS...',
                '<18>{#p/papyrus}{#f/4}NÃO QUANDO SE TRATA DE COISAS ASSIM.',
                '<18>{#p/papyrus}{#f/5}... AINDA ASSIM.',
                "<18>{#p/papyrus}{#f/5}É LEGAL QUE FINALMENTE ARRUMARAM A CAIXA DE MÚSICA.",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/8}* EU SEI, CERTO!?',
                        "<25>{#p/undyne}{#f/7}* Essa coisa tava quebrada desde que eu nasci."
                    ])
            ],
            () => [
                '<18>{#p/papyrus}{#f/0}A TERCEIRA MÚSICA É MINHA FAVORITA.',
                ...(solo() ? [] : ["<25>{#p/undyne}{#f/1}* A minha é a quarta!"])
            ]
        ),
        s_backrooms: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}DESDE QUE ELES COMEÇARAM A USAR REPLICADORES AQUI...',
                "<18>{#p/papyrus}{#f/5}EU NÃO TENHO CERTEZA EM COMO ME SENTIR SOBRE ISSO.",
                '<18>{#p/papyrus}{#f/0}POR UM LADO, A NOVA COMIDA É BEM MAIS SAUDÁVEL.',
                "<18>{#p/papyrus}{#f/7}POR OUTRO LADO, ELES DESISTIRAM DE COZINHAR!",
                "<18>{#p/papyrus}{#f/4}SABE ESSA SALA AÍ?",
                '<18>{#p/papyrus}{#f/7}ADIVINHA O QUE ELA ERA!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/1}* Não é aí que o Canis Minor gosta de ficar?",
                        '<25>{#p/undyne}{#f/10}* Sozinho...\n* Jogando cartas consigo mesmo...',
                        "<18>{#p/papyrus}{#f/4}OH, QUAL FOI.\nELE AMA FAZER ISSO.",
                        '<18>{#p/papyrus}{#f/0}ELE PARECE TER A SUA PRÓPRIA AGENDA NA VIDA...',
                        '<18>{#p/papyrus}{#f/9}ENVOLVENDO JOGOS DE CARTAS!! E MUITOS TAPINHAS NA CABEÇA!',
                        "<25>{#p/undyne}{#f/14}* Você está certo sobre os tapinhas, isso é verdade.",
                        '<25>{#p/undyne}{#f/17}* Uma vez ele foi até a central da Guarda Real só pra pedir carinho!',
                        '<18>{#p/papyrus}{#f/6}INTERESSANTE!!\nMAS O QUE VOCÊ FEZ?',
                        '<25>{#p/undyne}{#f/12}* Bem... todo mundo que estava lá acabou acariciando.',
                        "<25>{#p/undyne}{#f/8}* Como se não fossemos!!"
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}ALGUMA \"COZINHA...\"',
                        '<18>{#p/papyrus}{#f/5}AGORA É USADA COMO UM JOGO DE CARTAS PRIVADA.'
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/4}SE ELES NÃO VÃO USAR COMO UMA COZINHA...",
                        '<18>{#p/papyrus}{#f/5}TALVEZ JMA MAQUINA DE CARINHOS SERIA UM INVESTIMENTO MELHOR.'
                    ]
        ),
        s_bonehouse: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}QUE LUGAR MELHOR PARA SE ESTAR DO QUE MINHA CASA!',
                "<18>{#p/papyrus}{#f/0}TEMOS PIAS EXTRA-ALTAS...\nPEDRAS LUNARES...",
                '<18>{#p/papyrus}{#f/9}E ATÉ UMA VARANDA, EXCELENTE PARA A VIDA AO AR LIVRE!',
                "<18>{#p/papyrus}{#f/0}É PRATICAMENTE O ÚNICO LUGAR QUE ME SINTO SEGURO.",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/16}* Eu diria isso sobre MINHA casa, mas... sabe.",
                        '<18>{#p/papyrus}{#f/5}É... DEVE SER DIFÍCIL NÃO TER UMA.',
                        '<18>{#p/papyrus}{#f/6}... TIPO, ONDE -VOCÊ- SE SENTIRÁ EM CASA AGORA?',
                        "<25>{#p/undyne}{#f/1}* Sinceramente?\n* Aqui é muito bom!",
                        "<18>{#p/papyrus}{#f/5}MAS... COMO?\nNÓS SÓ ESTAMOS EM PÉ NO MEIO DO REC CENTER?",
                        "<25>{#p/undyne}{#f/14}* Quando eu estou com você, QUALQUER LUGAR é casa, fuhuhu.",
                        '<18>{#p/papyrus}{#f/5}... VOCÊ REALMENTE QUIS DIZER ISSO?',
                        '<25>{#p/undyne}{#f/8}* É CLARO!!',
                        "<18>{#p/papyrus}{#f/8}N-NÃO..!!\nVOCÊ VAI ME FAZER CHORAR!"
                    ])
            ],
            () => [
                '<18>{#p/papyrus}{#f/0}ME PERGUNTO O QUE OS HUMANOS CHAMAM DE CASA HOJE EM DIA.',
                '<18>{#p/papyrus}{#f/4}PELO QUE ENTENDI, ELES AINDA VIVEM NA TERRA...',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* Na verdade, eles dizem que a Terra está uma bagunça decadente.',
                        '<25>{#p/undyne}{#f/12}* ... é uma coisa que ouvi no Laboratório Real.',
                        '<25>{#p/undyne}{#f/13}* Eles encontraram \"evidências\" de desastres naturais...'
                    ])
            ]
        ),
        s_papyrusroom: pager.create(
            0,
            () =>
                SAVE.data.n.plot_date < 1.1
                    ? [
                        '<18>{#p/papyrus}WOW, VOCÊ SÓ QUATRO SEGUNDOS PARA ME LIGAR!',
                        '<18>VOCÊ DEVE ESTAR DESESPERADO PELA MINHA AJUDA!!!',
                        "<18>{#p/papyrus}{#f/9}MAS NÃO TEMAS.\nAQUI É A LINHA DE AJUDA DO PAPYRUS!",
                        '<18>{#p/papyrus}{#f/9}SÓ DESCREVA SUA LOCALIZAÇÃO, E...',
                        '<18>{#p/papyrus}{#f/4}... ESPERA.',
                        "<18>{#p/papyrus}{#f/6}VOCÊ AINDA TÁ NO MEU QUARTO??",
                        '<18>{#p/papyrus}{#f/5}...',
                        '<18>{#p/papyrus}{#f/5}JÁ OUVIU FALAR DE ALGO CHAMADO... PORTA?',
                        "<18>{#p/papyrus}{#f/6}NÃO SE PREOCUPE!!\nEU VOU DESENHAR UM DIAGRAMA PRA VOCÊ!"
                    ]
                    : SAVE.data.n.plot_date < 1.2
                        ? [
                            "<18>{#p/papyrus}{#f/1}O QUÊ??\nEU PENSEI QUE VOCÊ TINHA SAÍDO DO MEU QUARTO!",
                            "<18>{#p/papyrus}{#f/4}TEREMOS QUE RECOMEÇAR DO ZERO...",
                            '<18>{#p/papyrus}{#f/5}PRIMEIRO, VOCÊ SABE QUEM É O PAPYRUS?'
                        ]
                        : [
                            '<18>{#p/papyrus}{#f/5}ENTÃO VOCÊ VOLTOU PARA MEU QUARTO, HUH?',
                            '<18>{#p/papyrus}{#f/5}(SUSPIRO...)',
                            '<18>{#p/papyrus}{#f/5}EU ACHO QUE -É- BEM LEGAL.',
                            ...(solo()
                                ? []
                                : [
                                    '<25>{#p/undyne}{#f/1}* E que tal meu quarto?',
                                    "<18>{#p/papyrus}{#f/4}BEM... LÁ ESTÁ BEM QUENTE.",
                                    '<18>{#p/papyrus}{#f/4}PEGANDO FIGO, NÃO VERDADE.',
                                    '<25>{#p/undyne}{#f/17}* Ótimo!\n* Eu gosto de coisas quentes!'
                                ])
                        ],
            () =>
                SAVE.data.n.plot_date < 1.1
                    ? ["<18>{#p/papyrus}{#f/6}ESPERE!\nEU AINDA ESTOU DESENHANDO!"]
                    : SAVE.data.n.plot_date < 1.2
                        ? ['<18>{#p/papyrus}{#f/1}SE -EU- SEI QUEM É O PAPYRUS!?!?']
                        : [
                            ...(solo()
                                ? [
                                    "<18>{#p/papyrus}{#f/6}EI, UH, ENQUANTO VOCÊ ESTÁ AÍ...",
                                    '<18>{#p/papyrus}{#f/6}VOCÊ PODERIA DAR UMA OLHADA NOS MEUS BONECOS??',
                                    "<18>{#p/papyrus}{#f/5}ELES ESTÃO SOZINHOS FAZ MUITO TEMPO.",
                                    '<18>{#p/papyrus}{#f/5}... OBRIGADO.'
                                ]
                                : ["<25>{#p/undyne}{#f/8}* Especialmente quando estão pegando fogo!!!"])
                        ]
        ),
        s_innterior: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}A POUSADA É UM ÓTIMO LUGAR PARA FICAR.",
                '<18>{#p/papyrus}A CAMA É MUITO BOA, E A MOÇA ATENDENTE É SUPER LEGAL.',
                '<18>{#p/papyrus}{#f/5}MAS ACIMA DE TUDO, EU GOSTO DA FOTO NA PAREDE...',
                "<18>{#p/papyrus}{#f/0} UMA LEMBRANÇA DA VERDADEIRA CAPACIDADE DOS MONSTROS.",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/16}* É também uma das fotos mais conhecidas do nosso antigo mundo natal...",
                        '<25>{#p/undyne}{#f/9}* Uma das últimas que ainda existem.',
                        "<18>{#p/papyrus}{#f/5}... VOCÊ ACHA QUE PODEMOS ACHAR OUTRAS?",
                        "<25>{#p/undyne}{#f/1}* Eu sei que os cientistas estão tentando escanear a mente dos monstros...",
                        '<26>{#p/undyne}{#f/14}* Nós poderíamos usar aquilo em um monstro que viveu lá!',
                        '<18>{#p/papyrus}{#f/0}BEM... ISSO SOA OR!',
                        '<18>{#p/papyrus}{#f/4}... SE PELO MENOS NÓS SOUBESSEMOS UMA FORMA DE FAZER ISSO.',
                        "<18>{#p/papyrus}{#f/4}O QUE NÃO SABEMOS.",
                        '<18>{#p/papyrus}{#f/4}TRISTEMENTE.'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/5}SE PELO MENOS PUDÉSSEMOS VOLTAR NO TEMPO...']
                    : [
                        '<18>{#p/papyrus}{#f/5}SUPONHO QUE, POR ENQUANTO...',
                        '<18>{#p/papyrus}{#f/4}CONTAR HISTÓRIAS DE DORMIR UM PARA O OUTRO SERÁ O SUFICIENTE.',
                        "<25>{#p/undyne}{#f/1}* Ah, é, o Sans não meio que lê elas?",
                        "<18>{#p/papyrus}{#f/0}CLARO!\nELAS SÃO COMO COMBUSTÍVEL BRUTO DA IMAGINAÇÃO!",
                        '<25>{#p/undyne}{#f/1}* Imagine se tivéssemos um sobrevivente do planeta natal para contar histórias...',
                        '<25>{#p/undyne}{#f/14}* Alguém assim poderia fornecer CENTENAS de histórias para dormir!',
                        '<18>{#p/papyrus}SEM DÚVIDAS!'
                    ]
        ),
        s_beddinng: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}DE VEZ EM QUANDO, SANS ME CONTA UMA HISTÓRIA DE DORMIR.',
                '<18>{#p/papyrus}{#f/5} JÁ OUVIU SOBRE A HISTÓRIA DO \"MONSTRO GENEROSO?\"',
                '<18>{#p/papyrus}{#f/6}SANS LEU ELA PRA MIM NA NOITE PASSADA, E...',
                "<18>{#p/papyrus}{#f/8}... AUGH!\nEU NÃO PUDE PARA DE CHORAR!",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/10}* Ai...\n* Essa aí dói.",
                        '<25>{#p/undyne}{#f/16}* Especialmente porque foi escrito por um humano.',
                        '<18>{#p/papyrus}{#f/6}... HUMANOS SEMPRE ESCREVEM LIVROS TRÁGICOS ASSIM!?',
                        "<25>{#p/undyne}{#f/14}* Eu não sei.\n* Esse foi o único que eu li.",
                        '<25>{#p/undyne}{#f/15}* Bem, a não ser que você conte os \"livros\" que a Alphys postou outro dia...',
                        "<18>{#p/papyrus}{#f/4}... EU NÃO QUERO SABER."
                    ])
            ],
            [
                "<18>{#p/papyrus}{#f/4}DA PRÓXIMA VEZ, VOU PEDIR PRO SANS CONTAR UMA HISTÓRIA FELIZ.",
                '<18>{#p/papyrus}{#f/6}COM UM -VERDADEIRA- FINAL FELIZ!',
                '<18>{#p/papyrus}{#f/5}EM QUE TODO MUNDO SAI FELIZ!!',
                '<18>{#p/papyrus}{#f/7}E QUE NINGUÉM PRECISA MORRER OU DIZER ADEUS!!!'
            ]
        ),
        s_librarby: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/6}SHH...\n(NADA DE LIGAÇÕES NA LIBRARIA!)',
                "<18>{#p/papyrus}{#f/0}(PODE ME LIGAR QUANDO SAIR!)",
                ...(solo() ? [] : ['<25>{|}{#p/undyne}{#f/8}* AEEEEEEE FAZ BARULH- {%}'])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}(SÉRIO...)']
                    : [
                        '<18>{#p/papyrus}{#f/4}(SIM, EU DESLIGUEI PRA UNDYNE NÃO TE ATRAPALHAR.)',
                        '<25>{|}{#p/undyne}{#f/8}* SI- {%}'
                    ]
        ),
        f_start: pager.create(
            0,
            () => [
                '<18>{#p/papiro}CONTEMPLE A ATMOSFERA SINISTRA DA FÁBRICA.',
                '<18>{#p/papyrus}{#f/4}DIZEM QUE HÁ MONSTROS VIVENDO NOS CANOS...',
                "<18>{#p/papyrus}{#f/0}E ELES ESTÃO COMPLETAMENTE CORRETOS!",
                '<18>{#p/papyrus}{#f/5}ALGUNS MONSTROS PREFEREM UM AMBIENTE ÚMIDO E SUJO.',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/6}MUITO NÃO EU!']
                    : [
                        "<25>{#p/undyne}{#f/1}* Espero que eles não se importem que eu use os canos como um trepa-trepa.",
                        '<25>{#p/undyne}{#f/8}* Eu costumava balançar neles toda hora!',
                        '<18>{#p/papyrus}{#f/6}UNDYNE, NÃO!\nAQUELES POBRES, POBRES MORADORES DE CANOS!'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/0}EU PREFIRO VIVER NO LADO SANITÁRIO DA VIDA.']
                    : ['<18>{#p/papyrus}{#f/6}CUIDADO ONDE VOCÊ SE BALANÇA.']
        ),
        f_sans: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}MEU IRMÃO TEM UMA ESTAÇÃO AÍ.',
                '<18>{#p/papyrus}{#f/4}DE FATO, ELE OCUPA DUAS ESTAÇÕES AO MESMO TEMPO.',
                "<18>{#p/papyrus}{#f/0}INCRÍVEL, NÃO É?",
                '<18>{#p/papyrus}{#f/0}ELE DORME DUAS VEZES A MAIS POR CAUSA DISSO!!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Pra mim parece que ele sempre está observando.",
                        '<18>{#p/papyrus}{#f/0}AH, CERTO... SEMPRE OBSERVANDO.',
                        '<18>{#p/papyrus}{#f/4}SÓ SE FOR OBSERVANDO CONTEÚDOS ONLINE.',
                        "<25>{#p/undyne}{#f/3}* ... me pergunto se ele é fã da Mew Mew Aventura No Espaço.",
                        "<18>{#p/papyrus}{#f/7}VOCÊ TÁ PERDENDO O PONTO!"
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/5}NÓS, PESSOAS DESPERTAS, SÓ PODEMOS SONHAR COM TAL PREGUIÇA...']
                    : [
                        "<18>{#p/papyrus}{#f/5}ATÉ MESMO A UNDYNE JÁ FOI PEGA EM HÁBITOS COMO OS DO SANS.",
                        '<25>{#p/undyne}{#f/17}* Que MENTIRA!!',
                        "<18>{#p/papyrus}{#f/4}... SÓ NÃO FIQUE ASSISTINDO NO TRABALHO, TÁ BOM?",
                        '<25>{#p/undyne}{#f/17}* Okay!!'
                    ]
        ),
        f_corridor: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}O QUE ESTÁ NA SUA CAIXA DIMENSIONAL?",
                "<18>{#p/papyrus}{#f/4}NA VERDADE, NÃO ME FALA.",
                "<18>{#p/papyrus}{#f/7}ISSO SERIA UMA VIOLAÇÃO DE SUA PRIVACIDADE!",
                ...(solo()
                    ? []
                    : SAVE.data.b.undyne_respecc
                        ? ['<25>{#p/undyne}{#f/17}* ...', "<25>{#p/undyne}{#f/14}* ... é, você tá certo."]
                        : [
                            '<25>{#p/undyne}{#f/8}* Espera, não!\n* Eu quero saber!',
                            "<25>{#p/undyne}{#f/7}* Você!\n* O que você tá escondendo, pirralha!?",
                            "<18>{#p/papyrus}{#f/6}NADA!\nÉ ISSO!!",
                            "<25>{#p/undyne}{#f/17}* Eu não tava perguntando pra você.",
                            "<25>{#p/undyne}{#f/14}* ... huh, eu só vou procurar no histórico da caixa dimensional depois.",
                            "<18>{#p/papyrus}{#f/6}O QUE!?\nISSO EXISTE?",
                            '<18>{#p/papyrus}{#f/5}EU ACHO QUE OS ÍTENS PRECISAM IR PRA ALGUM LUGAR.'
                        ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papiro}{#f/4}... PELO MENOS ME DIGA QUE NÃO É \"RESÍDUO DE CACHORRO.\"']
                    : [
                        '<18>{#p/papyrus}{#f/4}SÓ ENTRE EU E VOCÊ...',
                        "<18>{#p/papyrus}{#f/0}UNDYNE NÃO QUER ROUBAR SUAS COISAS.",
                        "<25>{#p/undyne}{#f/12}* Eu? Roubando?\n* Pfft, não sei do que você tá falando!",
                        "<18>{|}{#p/papyrus}VIU?\nELA NÃO- {%}",
                        SAVE.data.b.undyne_respecc
                            ? "<25>{#p/undyne}{#f/14}* Eu só roubo das pessoas que não são mais fortes que EU!"
                            : "<25>{#p/undyne}{#f/14}* Eu só roubaria de alguém que NÃO É o cara mais legal do mundo!",
                        "<18>{#p/papiro}{#f/4}... VOCÊ ROUBARIA DE MIM, ENTÃO.",
                        "<25>{#p/undyne}{#f/17}* Não pense demais nisso!"
                    ]
        ),
        f_doge: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/4}ELES DIZEM QUE É MELHOR DEIXAR CACHORROS SONOLENTOS MENTIREM...",
                '<18>{#p/papyrus}{#f/7}MAS, SINCERAMENTE, EU DISCORDO!',
                '<18>{#p/papyrus}{#f/5}ATÉ PORQUE...',
                '<18>{#p/papyrus}{#f/6}UM BOM CACHORRO DEVE TER O VALOR DA HONESTIDADE ACIMA DE TUDO!',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/16}* Isso me lembra de...',
                        '<25>{#p/undyne}{#f/9}* ... uma dos minhas guardas mais fortes, Doge, se demitiu hoje.',
                        '<18>{#p/papyrus}{#f/6}PORQUÊ?\nELA FOI DESONESTA!?',
                        "<25>{#p/undyne}{#f/1}* Ela é um dos cachorros mais honestos que conheci.",
                        '<25>{#p/undyne}{#f/16}* Eu acho que tava pegando pesado demais com ela.',
                        '<18>{#p/papyrus}{#f/5}AH... BEM...',
                        '<18>{#p/papyrus}{#f/6}VOCÊ PODE SE DESCULPAR PRA ELA MAIS TARDE, CERTO?',
                        "<25>{#p/undyne}{#f/12}* ... é, acho que eu vou sim."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}SE AO MENOS O CACHORRO DEBAIXO DA MINHA PIA TIVESSE TAIS PRIORIDADES...']
                    : ['<18>{#p/papyrus}{#f/0}EM CASO DE DÚVIDA, APENAS CONVERSE.', '<18>{#p/papyrus}{#f/9}FUNCIONA TODA VEZ!']
        ),
        f_puzzle1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}CUIDADO COM OS ANTIGOS QUEBRA-CABEÇAS DE PILARES DOS HUMANOS!',
                '<18>{#p/papyrus}{#f/4}EMBORA RUDIMENTARES EM SEU MÉTODO DE CONSTRUÇÃO...',
                '<18>{#p/papyrus}{#f/6}SEUS DESIGNS NÃO SÃO NADA PERPLEXOS!',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/5}É UMA MARAVILHA QUE NÓS MONSTROS CONSEGUIMOS RESOLVÊ-LOS."]
                    : [
                        '<25>{#p/undyne}{#f/1}* Isso faz sentido.\n* Os próprios humanos são da mesma maneira...',
                        '<25>{#p/undyne}{#f/16}* Travando aquela guerra desconcertante por algo tão estupidamente simples.',
                        '<18>{#p/papyrus}{#f/6}... BEM ISSO FICOU PESADO RÁPIDO!',
                        "<25>{#p/undyne}{#f/12}* ... felizmente, nós temos está humana muito fera conosco!",
                        '<18>{#p/papyrus}{#f/0}AGORA -QUE- POSSO FICAR PARA TRÁS.'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/0}ME PERGUNTO SE HUMANOS TEM PROBLEMA PARA RESOLVER ENIGMAS MONSTROS.']
                    : ['<18>{#p/papyrus}{#f/0}HEH! NEM TODOS OS HUMANOS SÃO MAUS!']
        ),
        f_quiche: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}MEU IRMÃO PASSOU POR AQUILO OUTRO DIA...',
                '<18>{#p/papyrus}{#f/5}DIZENDO QUE ELE TINHA QUE DEIXAR ALGO.',
                '<18>{#p/papyrus}{#f/5}PERGUNTEI A ELE SOBRE ISSO, E ELE ME LANÇOU UM DESAFIO...',
                '<18>{#p/papyrus}{#f/4}UM ENIGMA SOBRE UMA PIADA MUITO \"BREGA.\"',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* Eu acho que entendi o que ele quis dizer, Papyrus.',
                        '<18>{#p/papyrus}{#f/6}O QUE!?\nO QUE FOI ISSO?',
                        '<25>{#p/undyne}{#f/1}* Ah, qual foi.\n* Você conhece seu irmão melhor do que qualquer um.',
                        '<25>{#p/undyne}{#f/12}* Resolver esse deve ser fichinha pra você!',
                        '<18>{#p/papyrus}{#f/5}HMM...\nUM ENIGMA BREGA...',
                        '<18>{#p/papyrus}{#f/4}FICHINHA...'
                    ])
            ],
            ["<18>{#p/papyrus}{#f/6}EU VOLTO MAIS TARDE COM A RESPOSTA!"]
        ),
        f_puzzle2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}NA MAIORIA DAS VEZES, UM QUEBRA-CABEÇA PODE SER INSOLÚVEL...',
                "<18>{#p/papyrus}{#f/5}SE VOCÊ NÃO PARAR PARA LER OS SINAIS.",
                "<18>{#p/papyrus}{#f/6}VOCÊ PENSA QUE INTUIÇÃO SERÁ O SUFICIENTE, MAS... NÃO!",
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/5}... EU FUI ENVERGONHADO POR ISSO MUITAS VEZES..."]
                    : [
                        '<25>{#p/undyne}{#f/14}* É, ter que ler essas placas é uma chatice.',
                        '<25>{#p/undyne}{#f/8}* As vezes eu só jogo lanças nos quebra-cabeças e funciona!',
                        "<18>{#p/papyrus}{#f/6}ISSO NÃO MEIO QUE QUEBRARIA O QUEBRA-CABEÇA PRA TODO MUNDO!?",
                        '<25>{#p/undyne}{#f/14}* Surpreendentemente, não.',
                        '<25>{#p/undyne}{#f/14}* Quebra-cabeça humanos caseiros são mais resilientes do que ELES são.',
                        "<25>{#p/undyne}{#f/7}* Confia em mim.\n* Eu TENTEI quebra-los de propósito."
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/0}EU JÁ DISSE ISSO ANTES, E VOU DIZER DE NOVO.",
                        '<18>{#p/papyrus}{#f/9}LEIA!\nOS!!\nSINAIS!!!',
                        '<18>{#p/papyrus}{#f/4}E PERCEBA OS PONTOS DE EXCLAMAÇÃO AUMENTANDO.',
                        "<18>{#p/papyrus}{#f/7}ISSO SIGNIFICA QUE É BEM IMPORTANTE!!!!"
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/4}BEM, VOCÊ SABE O QUE ELES DIZEM...',
                        "<18>{#p/papyrus}{#f/0}SE VOCÊ NÃO PODE QUEBRA-LOS, DEVE RESOLVÊ-LOS!",
                        '<18>{#p/papyrus}{#f/5}MAS, ISSO SÓ NOS PÕE DE VOLTA NA LINHA ORIGINAL.'
                    ]
        ),
        f_story1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ESTRELAS DE SINAL SÃO BEM LEGAIS, HEIN?',
                '<18>{#p/papyrus}{#f/5}E ELAS RE-ESCREVEM DE TEMPOS EM TEMPOS.',
                '<18>{#p/papyrus}{#f/4}ATÉ AGORA, APENAS UMA ÚNICA MENSAGEM É SALVA...',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/12}* É por isso que minhas mensagens para Alphys não estão sendo enviadas.",
                        '<18>{#p/papyrus}{#f/6}VOCÊ USOU UMA ESTRELA SINAL PRA ISSO!?',
                        '<18>{#p/papyrus}{#f/5}OH...\nUNDYNE...',
                        "<25>{#p/undyne}{#f/17}* O que?\n* Eu pensava que mandaria a mensagem em demanda!",
                        "<25>{#p/undyne}{#f/11}* É assim que elas funcionavam, certo??",
                        '<18>{#p/papyrus}{#f/0}AH, NÃO EXATAMENTE.',
                        '<18>{#p/papyrus}{#f/4}QUANDO DESCOBRIMOS ELAS CRESCENDO AQUI...',
                        '<18>{#p/papyrus}{#f/9}ELAS ERAM BEM MAIS RECEPTIVAS A SINAIS NOVOS!',
                        '<18>{#p/papyrus}{#f/5}ENTÃO, ELAS FORAM CRESCENDO, FICANDO VELHAS E MAIS FRACAS.',
                        '<25>{#p/undyne}{#f/1}* Huh.\n* Fascinante!',
                        "<25>{#p/undyne}{#f/12}* Eu acho que vou ter que encontrar outra solução, então!"
                    ])
            ],
            ["<18>{#p/papyrus}{#f/4}ESTA CHAMADA TELEFÔNICA -PROVAVELMENTE- NÃO SERÁ GRAVADA."]
        ),
        f_prechase: pager.create(
            0,
            () =>
                SAVE.data.n.plot < 37.11
                    ? []
                    : SAVE.data.n.plot < 48
                        ? [
                            '<18>{#p/papyrus}TINHA UMA PONTE AQUI, MAS ELA COLAPSOU.',
                            "<18>{#p/papyrus}{#f/5}COM ESPERANÇA, ELES VÃO CONSTRUIR UMA NOVA LOGO...",
                            '<18>{#p/papyrus}{#f/6}TER QUE ME POR DE PÉ EM UMA PLATAFORMA TÃO PEQUENA É AMEDRONTADOR!'
                        ]
                        : [
                            '<18>{#p/papyrus}EU OUVI QUE OS CONSTRUTORES FINALMENTE SUBIRAM UMA PONTE!',
                            '<18>{#p/papyrus}{#f/5}GRAÇAS AOS COSMOS...',
                            "<18>{#p/papyrus}{#f/6}JÁ ME CANSEI DE PLATAFORMAS FLUTUANTES FRÁGEIS!!",
                            ...(solo()
                                ? []
                                : [
                                    "<25>{#p/undyne}{#f/7}* Você só não sabe como se divertir.",
                                    "<18>{#p/papyrus}{#f/4}VOCÊ TEM UMA MOCHILA A JATO, ENTÃO VOCÊ NÃO CAI.",
                                    '<18>{#p/papyrus}{#f/6}EU NÃO TENHO TAIS GARANTIAS!',
                                    '<25>{#p/undyne}{#f/14}* Seria pedir muito falar pra você viver um pouco?',
                                    "<25>{#p/undyne}{#f/4}* Mesmo se você CAIR, não é como se você fosse se ferir.",
                                    "<25>{#p/undyne}{#f/1}* Você só iria... voar por aí um pouco.",
                                    "<25>{#p/undyne}{#f/14}* E então eu iria te salvar com minha mochila a jato!",
                                    "<18>{#p/papyrus}{#f/6}EU VOU ME GARANTIR COM A PONTE, MUITO OBRIGADO!"
                                ])
                        ],
            () =>
                SAVE.data.n.plot < 37.11
                    ? []
                    : [
                        '<18>{#p/papyrus}{#f/0}NADA COMO A SEGURANÇA E GARANTIA...',
                        '<18>{#p/papyrus}{#f/0}DE UMA SÓLIDA, ESTÁVEL E COM BELO DESING, PONTE!',
                        '<18>{#p/papyrus}{#f/9}O VERDADEIRO TESTAMENTO DA ENGENHARIA!!'
                    ]
        ),
        f_chase: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}A PRIMEIRA VEZ QUE EU VI ESSA SALA, EU ESTAVA MUITO ABISMADO.',
                "<18>{#p/papyrus}{#f/4}ERA TANTA EMOÇÃO QUE EU NEM CONSEGUI ACHAR A SAÍDA.",
                '<18>{#p/papyrus}{#f/6}... SEM MENCIONAR AS ARMADILHAS!',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* Ah é, eu esqueci daquelas coisas...',
                        "<25>{#p/undyne}{#f/14}* Meh, maior parte das pessoas sabe como sair. Vai ficar tudo bem.",
                        '<18>{#p/papyrus}{#f/6}ESSA PARECE A RECEITA PARA O DESASTRE.',
                        "<25>{#p/undyne}{#f/12}* Não se preocupe com isso.\n* Na verdade, tem sido meio útil!",
                        '<25>{#p/undyne}{#f/1}* Eu até acho que a unidade canina está usando como formato de treino.',
                        '<18>{#p/papyrus}{#f/4}E COMO ISSO FUNCIONA, EXATAMENTE?',
                        '<25>{#p/undyne}{#f/17}* É algo sobre \"evitar a tentação tática?\"',
                        '<25>{#p/undyne}{#f/12}* Eles colocam guloseimas atrás dos caminhos das armadilhas e os cães tentam evitá-las.',
                        "<18>{#p/papyrus}{#f/5}EU RETIRO O QUE DISSE.\nNÃO É UMA RECEITA PARA O DESASTRE.",
                        "<18>{#p/papyrus}{#f/6}É UM DESASTRE PRÉ-COZIDO SERVIDO EM UM PRATO DE PRATA."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/5}EU ACHO MELHOR EVITAR LABIRINTOS ESCUROS.']
                    : [
                        "<25>{#p/undyne}{#f/1}* Costumavam haver muito mais, na verdade.\n* Não é o que era.",
                        '<18>{#p/papyrus}{#f/6}QUANTOS MAIS?',
                        '<25>{#p/undyne}{#f/12}* ...\n* Muito mais.',
                        '<18>{#p/papyrus}{#f/5}QUANTOS?',
                        '<25>{#p/undyne}{#f/17}* Bem mais.',
                        '<18>{#p/papyrus}{#f/6}QUANTO MAIS??',
                        '<25>{#p/undyne}{#f/7}* Ah, para!'
                    ]
        ),
        f_entrance: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}VOCÊ ESTÁ NA ENTRADA DO QUE É CONHECIDO COMO...",
                '<18>{#p/papyrus}{#f/9}A \"ZONA ESCURA.\"',
                "<18>{#p/papyrus}{#f/4}VOCÊ NÃO ACREDITARIA EM COMO ELA CONSEGUIU ESSE NOME.",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* Você pode agradecer o Asgore por esse nome brilhante.',
                        '<25>{#p/undyne}{#f/8}* Ele sempre é o MELHOR nomeando coisas!',
                        '<18>{#p/papyrus}{#f/0}EU SEI, CERTO?\nÉ TUDO TÃO FÁCIL DE IDENTIFICAR!',
                        "<25>{#p/undyne}{#f/3}* ... você disse isso sem ironia, não foi?",
                        "<18>{#p/papyrus}{#f/0}É CLARO!\nÉ UMA QUALIDADE DELE QUE EU APRECIO.",
                        '<25>{#p/undyne}{#f/1}* entendo...',
                        '<18>{#p/papyrus}{#f/0}MAIS IMPORTANTE, SABE.',
                        "<18>{#p/papyrus}{#f/9}COM ELE, VOCÊ NÃO VAI -NÃO- CONHECER ALGUMA COISA!"
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}ALERTA DE SPOILER...', "<18>{#p/papyrus}{#f/4}... É BEM ESCURO DENTRO."]
                    : ["<18>{#p/papyrus}{#f/0}ESSAS COISAS NÃO SÃO MELHORES QUANDO VOCÊ AS ENTENDE?"]
        ),
        f_lobby: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/6}EU TOTALMENTE... NÃO CONSIGO CHEGAR ATÉ VOCÊ... NO MOMENTO!",
                "<18>{#p/papyrus}{#f/6}O CHAMADO... ESTÁ DEFINITIVAMENTE... BUGANDO!",
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/6}...',
                        "<18>{#p/papyrus}{#f/4}OKAY, EU ADMITO, NÃO TEM NADA ACONTECENDO DE VERDADE.",
                        '<18>{#p/papyrus}{#f/0}... MAS ESSA MESA ESTÁ BUGANDO!'
                    ]
                    : [
                        '<25>{#p/undyne}{#f/1}* Então você diria que a chamada está sendo \"fatiada\" ou \"triturada?\"',
                        "<18>{#p/papyrus}{#f/5}INFELIZMENTE, TEM ALGO BEM PIOR ACONTECENDO."
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}SÉRIO.\nO QUE TÁ ACONTECENDO, MESMO?"]
                    : ["<18>{#p/papyrus}{#f/4}ESTÁ ENCORAJANDO A UNDYNE A FAZER PIADAS."]
        ),
        f_error: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}EM UMA ROTA DIRETA DESDE O INÍCIO DO INÍCIO DE STARTON...',
                '<18>{#p/papyrus}{#f/0}ATÉ O ÚLTIMO ANDAR DE AERIALIS...',
                '<18>{#p/papyrus}{#f/0}ESSA SALA MARCA A METADE DA SUA JORNADA.',
                '<18>{#p/papyrus}{#f/5}... SEJA LÁ O QUE VOCÊ PLANEJA FAZER DEPOIS...',
                '<18>{#p/papyrus}{#f/6}SUA JORNADA ESTÁ PELO MENOS NA -METADE- AGORA!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/4}* O que!?\n* Não fala desse jeito!",
                        "<18>{#p/papyrus}{#f/6}Q-QUER DIZER, SUA JORNADA SÓ ESTA COMEÇANDO!",
                        "<18>{#p/papyrus}{#f/6}AINDA TEM MUITAS COISAS PARA SE VER!",
                        '<18>{#p/papyrus}{#f/6}E VÁRIOS LUGARES PRA ESTAR!',
                        '<18>{#p/papyrus}{#f/4}E ACIMA DE TUDO...',
                        '<18>{#p/papyrus}{#f/9}VÁRIOS AMIGOS NOVOS!',
                        "<25>{#p/undyne}{#f/12}* Bem melhor."
                    ])
            ],
            () =>
                solo()
                    ? ['<19>{#p/papyrus}{#f/5}METADE DO CAMINHO...']
                    : ["<19>{#p/papyrus}{#f/9}UM BRINDE À LONGA JORNADA À FRENTE!"]
        ),
        f_telescope: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}MEU IRMÃO TEM UM NEGÓCIO DE TELESCÓPIO AQUI.',
                '<18>{#p/papyrus}{#f/5}INSCRIÇÕES, PASSE DE MEMBRO, ASSINATURAS, CARTÕES...',
                "<18>{#p/papyrus}{#f/6}É UM LABIRINTO DE TERMOS E CONDIÇÕES QUE NUNCA ACABA!",
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/5}UMA VEZ EU TENTEI PARTICIPAR, MAS...',
                        "<18>{#p/papyrus}{#f/4}ATÉ EU TENHO LIMITES DO QUE AGUENTAR."
                    ]
                    : [
                        '<25>{#p/undyne}{#f/13}* Duvido que uma única pessoa tenha conseguido se inscrever corretamente.',
                        "<18>{#p/papyrus}{#f/5}É... VOCÊ PROVAVELMENTE ESTÁ CERTA.",
                        '<18>{#p/papyrus}{#f/6}ESSES TELESCÓPIOS \"PREMIUM\" PELO MENOS FUNCIONAM DE VERDADE!?',
                        '<25>{#p/undyne}{#f/8}* Quem sabe!!',
                        "<25>{#p/undyne}{#f/1}* Mas tudo bem, porque os normais funcionam bem.",
                        '<25>{#p/undyne}{#f/14}* Eu uso eles o tempo todo!'
                    ])
            ],
            ['<18>{#p/papyrus}{#f/4}DEIXE PARA UM BRINCALHÃO TORNAR AS COISAS COMPLICADAS...']
        ),
        f_bird: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/9}O MAIS INFAME.',
                '<18>{#p/papyrus}{#f/9}O MAIS DESTEMIDO.',
                '<18>{#p/papyrus}{#f/9}O MAIS BRAVO.',
                '<18>{#p/papyrus}{#f/9}O MONSTRO. \nO MITO.\nA LENDA...',
                '<18>{#p/papyrus}{#f/9}O PÁSSARO AMARELO.',
                ...(SAVE.data.n.plot < 42
                    ? [
                        '<18>{#p/papyrus}{#f/9}...',
                        '<18>{#p/papyrus}{#f/4}... ESPERA.',
                        "<18>{#p/papyrus}{#f/1}ELE NÃO ESTÁ MAIS AÍ!?!?",
                        '<18>{#p/papyrus}{#f/8}COMO ASSIM???'
                    ]
                    : solo()
                        ? ['<18>{#p/papyrus}{#f/4}... NÃO TEM NENHUMA OUTRA FORMA DE CRUZAR O ABISMO.']
                        : [
                            '<25>{#p/undyne}{#f/1}* Esse pássaro sempre vai te levar através do abismo, SEMPRE!',
                            '<25>{#p/undyne}{#f/16}* Quando eu era mais nova, ele ME fez voar.\n* Demorou uma hora...',
                            '<25>{#p/undyne}{#f/17}* Mas esse pássaro JAMAIS pensou em desistir!!!',
                            '<25>{#p/undyne}{#f/1}* Amo esse passarinho.'
                        ])
            ],
            () =>
                SAVE.data.n.plot < 42
                    ? [
                        "<18>{#p/papyrus}{#f/8}EU SÓ NÃO ENTENDO...!",
                        '<18>{#p/papyrus}{#f/8}COMO O PRIMEIRO E ÚNICO PÁSSARO AMARELO NOS ABANDONOU???'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/0}CONFIA EM MIM, ESSE ABISMO É MAIOR DO QUE VOCÊ PENSA.',
                        '<18>{#p/papyrus}{#f/4}E POSSIVELMENTE NÃO- EUCLIDIANO.',
                        ...(solo()
                            ? []
                            : [
                                "<25>{#p/undyne}{#f/7}* Então você está me dizendo que também tem que navegar por ISSO!?",
                                '<25>{#p/undyne}{#f/8}* APRECIO ESTE PÁSSARO AINDA MAIS, DROGA!',
                                "<18>{#p/papyrus}{#f/6}EU O VALORIZO O MÁXIMO QUE POSSO!!",
                                '<25>{#p/undyne}{#f/7}* Isso aí!!!'
                            ])
                    ]
        ),
        f_stand: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}DIZ A LENDA...',
                '<18>O CARA QUE VENDE SORVETE SONHO DA CARTÕES POSTAIS.',
                '<18>{#p/papyrus}{#f/4}O PODER ATRÁS DESTES CARTÕES POSTAIS TEM A CAPACIDADE DE...',
                '<18>{#p/papiro}{#f/9}... PARA DESBLOQUEAR MAIS GULOSEIMAS SABOROSAS!',
                ...(solo()
                    ? []
                    : [
                        '<26>{#p/undyne}{#f/8}* E eu AMO guloseimas!',
                        "<25>{#p/undyne}{#f/14}* Quer dizer, com tanto que não estejam frias.",
                        "<25>{#p/undyne}{#f/17}* Se for assim eu não amo tanto!!"
                    ])
            ],
            [
                '<18>{#p/papyrus}{#f/0}ME PERGUNTO QUE OUTROS PODERES ESTES CARTÕES POSTAIS TEM.',
                '<18>{#p/papyrus}{#f/4}ELES TENDEM A SE ESGOTAR RAPIDAMENTE...'
            ]
        ),
        f_abyss: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}OLHAMOS PARA ESTE CAMINHO SINUOSO CHEIO DE ESTRELAS DE SINALIZAÇÃO...',
                '<18>{#p/papyrus}{#f/4}E NÓS O CONSIDERAMOS \"NORMAL\".',
                '<18>{#p/papyrus}{#f/0}SABE O QUE MAIS É NORMAL?',
                '<18>{#p/papyrus}{#f/0}O FATO QUE ESSA LIGAÇÃO CHEGA AQUI EM BAIXO!',
                '<18>{#p/papyrus}{#f/6}TOTALMENTE NORMAL!!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/1}* Então você tá dizendo que não é normal, certo?",
                        '<18>{#p/papyrus}{#f/0}ISSO.',
                        '<25>{#p/undyne}{#f/14}* ... Nesse ritmo você vai virar um sensei do sarcasmo!',
                        "<18>{#p/papyrus}{#f/4}EU QUERO TENTAR USAR ISSO NO MEU IRMÃO.",
                        "<25>{#p/undyne}{#f/1}* Toma cuidado.\n* Ele é um MAGO do sarcasmo.",
                        "<25>{#p/undyne}{#f/17}* Se você quiser vencer ele, vai ter que treinar igual maluco!",
                        "<18>{#p/papyrus}{#f/4}OH, ACREDITE EM MIM UNDYNE, EU ESTOU PRONTO.",
                        "<25>{#p/undyne}{#f/8}* Eu espero que você não esteja sendo sarcástico agora!"
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/6}EU ESTOU DEFINITIVAMENTE NÃO SENDO SARCASTICO!"]
                    : ["<19>{#p/papyrus}{#f/4}TREINAR SARCASMO É -TOTALMENTE- A COISA MAIS FACÍL DE TODAS."]
        ),
        f_muffet: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}EU TAVA SURFANDO NA WEB ESSES DIAS...',
                "<18>{#p/papyrus}{#f/6}MAS TECIDO DE ARANHA É MAIS FORTE DO QUE PENSAMOS!",
                '<18>{#p/papyrus}{#f/4}QUE WEB EU ESTAVA SURFANDO, VOCÊ PERGUNTA?',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/4}... VOCÊ PROVAVELMENTE NÃO VAI QUERER SABER."]
                    : [
                        "<25>{#p/undyne}{#f/17}* ... sério?\n* Já é a segunda vez que você fez isso!",
                        '<18>{#p/papyrus}{#f/6}EU QUERIA SABER COMO AS CORDAS ESTAVAM PRESAS!',
                        '<25>{#p/undyne}{#f/8}* Essa foi sua desculpa da última vez!',
                        '<18>{#p/papyrus}{#f/6}MAS E A MINHA CURIOSIDADE!!!',
                        '<25>{#p/undyne}{#f/12}* ... Talvez deixe a navegação na teia para as aranhas agora!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}NÃO ESTAVA NO COMPUTADOR, ISSO É CERTERZA."]
                    : ['<18>{#p/papyrus}{#f/4}TALVEZ EU DEVESSE COMPRAR UM ROBÔ PARA NAVEGAR A WEB POR MIM...']
        ),
        f_shyren: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/5}OUVI DIZER QUE UM MONSTRO BEM TIMIDO VIVE AQUI...",
                '<18>{#p/papyrus}{#f/0}BEM. SE VOCÊ QUISER SE ABRIR COM ALGUÉM...',
                '<18>{#p/papyrus}{#f/9}VOCÊ DEVE ENFRENTÁ-LO EM COMBATE!',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}UMA BOA ESTRATÉGIA PARA QUALQUER OCASIÃO.']
                    : [
                        "<25>{#p/undyne}{#f/8}* E não se esqueça de falar alto na cara dele!!",
                        '<18>{#p/papyrus}{#f/6}... TALVEZ ISSO SEJA DEMAIS.',
                        '<25>{#p/undyne}{#f/14}* Bem, isso funcionou com o esquadrão de ELITE mais cedo...',
                        '<18>{#p/papyrus}{#f/4}...',
                        "<18>{#p/papyrus}{#f/4}ESTOU COMEÇANDO A RECONSIDERAR MINHA ESCOLHA DE CARREIRA...",
                        "<25>{#p/undyne}{#f/17}* Não, espera!!\n* Eu não tava falando sobre TODOS os guardas!",
                        '<18>{#p/papyrus}{#f/6}E -QUANDO- EU ME TORNAR MEMBRO DO ESQUADRÃO DE ELITE?',
                        "<25>{#p/undyne}{#f/14}* ... Eu serei mais legal com você especificamente!",
                        "<18>{#p/papyrus}{#f/7}MAS ISSO NÃO SERIA JUSTO COM OS OUTROS MEMBROS!!",
                        '<25>{#p/undyne}{#f/17}* Eu desisto!!'
                    ])
            ],
            () => ['<18>{#p/papyrus}{#f/0}HUM HUM HUM...', ...(solo() ? [] : ['<25>{#p/undyne}{#f/12}* Hum hum hum...'])]
        ),
        f_statue: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}A ESTÁTUA MISTERIOSA...',
                '<18>{#p/papyrus}{#f/4}COLOCADA NO MEIO DA FABRICA...',
                '<18>{#p/papyrus}{#f/6}... ME PERGUNTO O QUE ISSO PODE SIGNIFICAR!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/16}* Essa estátua esteve aí desde sempre...",
                        '<25>{#p/undyne}{#f/17}* ... ninguém sabe de onde ela veio!',
                        '<25>{#p/undyne}{#f/1}* Mas tem uma caixa de música legal dentro.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}NOVIDADES FRESQUISSIMAS!',
                        '<18>{#p/papyrus}{#f/4}ESTÁTUA MISTERIOSA É MISTERIOSA.',
                        "<18>{#p/papyrus}{#f/6}QUEM PODERIA IMAGINAR!!"
                    ]
                    : [
                        '<25>{#p/undyne}{#f/11}* Alguns dizem que essa estátua também contém uma SEGUNDA música...',
                        "... mas eu vou acreditar quando eu ouvir."
                    ]
        ),
        f_piano: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}SE PELO MENOS EXISTISSE UMA SALA...',
                '<18>ONDE EU PUDESSE EXPRESSAR MEUS PENSAMENTOS ATRÁVES DA MÚSICA.',
                '<18>UMA SALA SOZINHA, SEPARADA DA CIVILIZAÇÃO...',
                '<18>COM NADA ALÉM DE UM PIANO NO CENTRO...',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/0}... EI ESPERA!\nÉ ESSA SALA AÍ!"]
                    : [
                        '<25>{#p/undyne}{#f/10}* E talvez esse piano seja útil para resolver enigmas...',
                        '<25>{#p/undyne}{#f/10}* Ou praticar o combate lutando contra os marfins...',
                        '<25>{#p/undyne}{#f/10}* Ou tocar uma certa melodia que te lembre de alguém especial...',
                        '<25>{#p/undyne}{#f/7}* ... se pelo menos você estivesse nessa sala AGORA MESMO!!',
                        '<18>{#p/papyrus}{#f/6}EU IRIA FALAR ISSO AGORA MESMO!!'
                    ])
            ],
            ['<18>{#p/papyrus}DA PRÓXIMA VEZ QUE EU VIR AQUI, EU DEVERIA FAZER UM MUSICAL.', '<18>SERÁ CHAMADO, \"HISTORIAS DO PAPYRUS.\"']
        ),
        f_artifact: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}EU NÃO ACHO QUE ESTIVE NESSA SALA ANTES.",
                "<18>{#p/papyrus}{#f/6}COMO É AÍ?\nTEM TESOUROS NÃO DESCOBERTOS AÍ?",
                '<18>{#p/papyrus}{#f/4}SÓ PRA DEIXAR CLARO, ESSA PERGUNTA É RETÓRICA.',
                "<18>{#p/papyrus}{#f/7}EU PREFIRO IR DESCOBRIR POR CONTA PRÓPRIA!",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* É bom ver que você ainda tem o senso de aventura em si.",
                        '<18>{#p/papyrus}{#f/9}É CLARO!!\nEU, O GRANDE PAPYRUS...',
                        '<18>{#p/papyrus}{#f/9}TENHO UM SENSO DE AVENTURA ACIMA DO COMUM!',
                        "<18>{#p/papyrus}{#f/4}BEM, ISSO NÃO É -TOTALMENTE- VERDADE!",
                        '<18>{#p/papyrus}{#f/6}SANS ENCONTRA UMA NOVA FORMA DE EXPLORAR O SOFÁ TODO DIA.',
                        '<25>{#p/undyne}{#f/17}* ... ah.',
                        "<25>{#p/undyne}{#f/17}* Então é por isso que o sofá é tão bagunçado."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/6}SEM SPOILERS!!!']
                    : ["<18>{#p/papyrus}{#f/4}E ESSE NEM É O SEU FEITO MAIS IMPRESSIONANTE."]
        ),
        f_path: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}CONTINUE INDO, LOGO VOCÊ ALCANÇARÁ A CIDADELA.",
                "<18>{#p/papyrus}{#f/4}NÃO DA PRA VER ELA DE TÃO LONGE ASSIM, MAS...",
                '<18>{#p/papyrus}{#f/5}TEM ALGO EM RELAÇÃO A ESSA SALA...',
                '<18>... TORNA POSSÍVEL DE ENXERGÁ-LA...',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/12}* Talvez seja uma dessas \"distorções espaciais\" que a Alphys fala.',
                        '<25>{#p/undyne}{#f/1}* Aquelas que diminuem a velocidade do tempo quando você se aproxima.',
                        '<18>{#p/papyrus}{#f/5}O HUMANO DEVE TER CUIDADO, ENTÃO!',
                        '<18>{#p/papyrus}{#f/6}SE O TEMPO DIMINUISSE DEMAIS, VOCÊ CONSEGUIRIA ESCAPAR??',
                        "<25>{#p/undyne}{#f/17}* ... nada que um pouco de força bruta não resolva!"
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/6}APRECIE A VISTA ENQUANTO VOCÊ PODE!']
                    : ['<18>{#p/papyrus}{#f/6}SÓ TOMA CUIDADO!']
        ),
        f_view: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}VOCÊ DEVE SER ÓTIMO EM FAZER MUITAS TAREFAS JUNTAS!',
                "<18>{#p/papyrus}{#f/4}JÁ É UMA PARA LIGAR PARA ALGUÉM...",
                '<18>{#p/papyrus}{#f/5}COM UMA VISTA COMO -ESSA- NAS PROXIMIDADES.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* Durante a prática de caça a humanos com a ELITE...',
                        '<25>{#p/undyne}{#f/17}* Pelo menos um dos guardas SEMPRE se distrai com isso.',
                        "<25>{#p/undyne}{#f/10}* Seja o Cozmo, debatendo a natureza da estética...",
                        '<25>{#p/undyne}{#f/10}* Ou Terrestria obcecada com a \"beleza do universo...\"',
                        "<25>{#p/undyne}{#f/9}* ... bem, na verdade, são só esses dois.",
                        '<18>{#p/papyrus}{#f/5}MAS... COMO OS MONSTROS MAIS ANTIGOS VIVOS...',
                        '<18>{#p/papyrus}{#f/6}ELES DEVEM SER ÓTIMOS NO TRABALHO DELES!!',
                        "<26>{#p/undyne}{#f/16}* Eles SÃO ótimos no trabalho deles, mas... não levam o treino a sério.",
                        "<18>{#p/papyrus}{#f/5}OH.\nBEM, ISSO É UMA PENA.",
                        "<25>{#p/undyne}{#f/1}* Porém ninguém distrai a visão desta capitã!!",
                        '<25>{#p/undyne}{#f/12}* E é por isso que eu sempre falho em mantê-los atentos.',
                        '<18>{#p/papyrus}{#f/6}ENQUANTO ISSO SOA DIFÍCIL...',
                        "<18>{#p/papyrus}{#f/9}... EU SEI QUE VOCÊ MAIS DO QUE CAPAZ DE FAZER ISSO!",
                        '<25>{#p/undyne}{#f/14}* Obrigado, Papyrus.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/7}O QUE VOCÊ TÁ FAZENDO TENTANDO ME LIGAR?',
                        "<18>{#p/papyrus}{#f/7}VOCÊ TEM COISAS LINDAS PARA ADMIRAR!"
                    ]
                    : [
                        "<25>{#p/undyne}{#f/1}* Para sua sorte, você não está na Guarda Real, pirralha!",
                        '<25>{#p/undyne}{#f/12}* Então...\n* Sinta-se livre para ficar distraída o tanto que quiser!'
                    ]
        ),
        f_plank: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/5}NÃO TEM MUITO MAIS O QUE DIZER AQUI.",
                '<18>{#p/papyrus}{#f/4}ALÉM DA PONTE PARA LUGAR NENHUM DE QUE OUVI FALAR...',
                '<18>{#p/papyrus}{#f/5}É SÓ UM CAMINHO MORTO.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/17}* Que ponte?\n* Aquela que eu destruí mais cedo?',
                        '<25>{#p/undyne}{#f/8}* Era só um pedaço de ponte velha da fábrica!',
                        '<18>{#p/papyrus}{#f/6}AQUELA QUE ELES FINALMENTE SUBSTITUÍRAM HOJE?',
                        '<18>{#p/papyrus}{#f/5}WOWIE... EU PENSAVA QUE ELA TINHA SIDO DESTRUÍDA PARA SEMPRE.',
                        '<25>{#p/undyne}{#f/14}* Não.\n* Eu mantenho a segurança.'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/5}TALVEZ VOCÊ POSSA LIGAR DE VOLTA PARA OUTRO LUGAR?']
                    : ['<18>{#p/papyrus}{#f/4}ENTÃO -TINHA- ALGO PRA DIZER AQUI...']
        ),
        f_tunnel: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}AH... O DEPOSITO DE LIXO.',
                '<18>{#p/papyrus}{#f/0}UM ÓTIMO LUGAR PRA JOGAR FORA ÍTENS DESNECESSARIOS.',
                '<18>{#p/papyrus}{#f/4}OU, ALTERNATIVAMENTE...',
                '<18>{#p/papyrus}{#f/9}UM BOM LUGAR PARA ACHAR TESOUROS DE CUSTO PESSOAL!',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}AS VEZES EU VENHO AÍ COM O SANS PRA FAZER ISSO.']
                    : [
                        "<25>{#p/undyne}{#f/12}* Você tem certeza que isso é... uh, seguro?",
                        "<25>{#p/undyne}{#f/10}* Eu sei que o lixo de um é o tesouro de outro, mas-",
                        '<18>{#p/papyrus}{#f/0}SE A BRATTY E A CATTY FAZEM ISSO NO ESPAÇO...',
                        '<18>{#p/papyrus}{#f/0}SANS E EU FAZEMOS ISSO EM UMA ÚNICA SALA.',
                        "<25>{#p/undyne}{#f/1}* Quando você põe dessa forma, não parece tão mal.",
                        '<25>{#p/undyne}{#f/17}* Só tenha certeza de sair antes da caixa de descarte ativar!',
                        "<18>{#p/papyrus}{#f/6}É CLARO! NÓS NÃO GOSTARIAMOS DE VIRAR PÓ!!"
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}DÁ UTLIMA VEZ, NÓS ATÉ ACHAMOS UMA PINTURA DE OSSO...',
                        '<18>{#p/papyrus}{#f/5}E ELA SÓ ESTAVA UM POUCO SUJA!!'
                    ]
                    : ["<18>{#p/papyrus}{#f/6}TALVEZ SEJA MELHOR PRA VOCÊ SAIR DESSA SALA."]
        ),
        f_chute: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}NESSE CHÃO TEM TRÊS TABLETS.',
                '<18>{#p/papyrus}{#f/0}UM SOBRE ESTRELAS, OUTRO SOBRE BURACO DE MINHOCAS...',
                '<18>{#p/papyrus}{#f/4}E UM SOBRE ANIME SCI-FI.',
                "<18>{#p/papyrus}{#f/0}PESSOALMENTE. -EU- ACHO QUE É TUDO CONECTADO.",
                '<18>{#p/papyrus}{#f/5}JÁ QUE, AS FLORES CHEGARAM AQUI ATRÁVES DE...',
                '<18>{#p/papyrus}{#f/5}UM BURACO DE MINHOCA DESSE TAL ANIME SCI-FI.',
                "<18>{#p/papyrus}{#f/6}É A ÚNICA FORMA DE EXPLICAR TUDO DE UMA VEZ!",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Então essa é sua teoria.",
                        '<25>{#p/undyne}{#f/14}* Que todos esses tablets estão conectados dessa forma.',
                        '<18>{#p/papyrus}{#f/0}SIM.',
                        '<25>{#p/undyne}{#f/1}* Okay.\n* Só uma pergunta.',
                        "<25>{#p/undyne}{#f/7}* ONDE ESTÃO AS PROVAS?",
                        '<18>{#p/papyrus}{#f/6}DO ANIME!!',
                        '<18>{#p/papyrus}{#f/4}SCI-FI ANIME.',
                        "<18>{#p/papyrus}{#f/4}QUE EU AINDA PRECISO ASSISTIR, SOU OCUPADO.",
                        '<25>{#p/undyne}{#f/17}* Muito ocupado pra anime!?',
                        "<25>{#p/undyne}{#f/8}* Tá de brincadeira!!"
                    ])
            ],
            ['<18>{#p/papyrus}{#f/5}UM DIA, HUMANO...', '<18>{#p/papyrus}{#f/5}UM DIA, PROVAREI QUE MINHAS TEORIAS ESTÃO CERTAS.']
        ),
        f_dummy: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}NÃO OLHE ALÉM DO CAMINHO OCULTO...",
                '<18>{#p/papyrus}{#f/5}FECHE OS OLHOS E ANDE...',
                "<18>{#p/papyrus}{#f/5}E ENFRENTE A IRA DAS TEMMIES.",
                "<18>{#p/papiro}{#f/4}... É UM ENIGMA QUE OUVI SOBRE ESTE LUGAR.",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* Hmm... \"não olhe no caminho oculto...\"',
                        '<25>{#p/undyne}{#f/11}* O que seria o caminho oculto?',
                        '<25>{#p/undyne}{#f/13}* E então... \"feche seus olhos...\"',
                        '<25>{#p/undyne}{#f/12}* Tá, não não não, espera bem aí.',
                        "<26>{#p/undyne}{#f/8}* Se eu não posso ver nada, como eu vou achar alguma coisa!",
                        '<18>{#p/papyrus}{#f/4}INFELIZMENTE, ENIGMAS SÃO ASSIM.',
                        '<18>{#p/papyrus}{#f/7}UM MONTE DE CONSELHOS QUE NÃO LEVAM A NADA!'
                    ])
            ],
            ['<18>{#p/papyrus}{#f/4}VOCÊ SABE COMO RESOLVER -ESTE- ENIGMA?']
        ),
        f_hub: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}SE VOCÊ VER UMA LOJA, DEVERIA DAR UMA PARADOCA...',
                '<18>{#p/papyrus}{#f/4}DROPE, E ROLE...',
                '<18>{#p/papyrus}{#f/0}EM BONS NEGÓCIOS!!',
                ...(solo()
                    ? [
                        "<18>{#p/papyrus}{#f/9}PORQUE ESTAMOS TENDO UMA ÓTIMA VENDA, PEGANDO FOGO!!",
                        '<18>{#p/papyrus}{#f/5}NA MINHA LOJA IMAGINARIA, QUE VENDE CHAMAS.'
                    ]
                    : [
                        "<25>{#p/undyne}{#f/1}* Tipo aquela no mercado do Gerson?",
                        '<25>{#p/undyne}{#f/8}* Eu compro as paradas dele o tempo todo!',
                        "<18>{#p/papyrus}{#f/6}O QUE TORNA AS OFERTAS DELE TÃO ESPECIAIS?",
                        '<25>{#p/undyne}{#f/17}* Tá de brincadeira?\n* Gerson sobreviveu a guerra monstro-humana!',
                        "<25>{#p/undyne}{#f/14}* Ele é um herói de verdade.",
                        '<18>{#p/papyrus}{#f/4}EU ÍA DIZER UMA COISA, MAS TUDO BEM.',
                        '<18>{#p/papyrus}{#f/0}HONRA AO GERSON!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}É AINDA OUTRO SONHO MEU..."]
                    : [
                        "<18>{#p/papyrus}{#f/0}É IMPORTANTE TER CONHECIMENTO DOS HERÓIS QUE NOS CERCAM.",
                        '<18>{#p/papyrus}{#f/5}SEM ELES, PODERIAMOS NEM MESMO ESTAR AQUI HOJE...'
                    ]
        ),
        f_undyne: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}ESSA É A CASA DA UNDYNE.",
                ...(SAVE.data.n.plot < 48 || world.trueKills > 0
                    ? ['<18>{#p/papyrus}{#f/9}O LUGAR IDEAL PARA APRENDER A COZINHAR!']
                    : SAVE.data.n.plot_date < 1.3
                        ? ['<18>{#p/papyrus}{#f/4}SABE, AQUELA COM UM ESQUELETO NA FRENTE.']
                        : SAVE.data.n.plot_date < 2
                            ? ["<18>{#p/papyrus}{#f/9}NÃO HESITE EM SE APROXIMAR!"]
                            : SAVE.data.n.plot_date < 2.1
                                ? [
                                    "<18>{#p/papyrus}{#f/6}... VOCÊ AINDA TÁ NA CASA DA UNDYNE??",
                                    "<18>{#p/papyrus}{#f/5}ELA, UH, AINDA NÃO CHEGOU A ME ENCONTRAR.",
                                    '<18>{#p/papyrus}{#f/4}TALVEZ SAIR DAÍ E...',
                                    '<18>{|}{#f/1}... {%}',
                                    '<25>{#p/undyne}{#f/12}* Huff... puff...!',
                                    "<25>{#p/undyne}{#f/8}* É!!!\n* ESSA É MINHA CASA!!!",
                                    "<18>{#p/papyrus}{#f/6}UH, OI UNDYNE!\nCOMO VOCÊ CHEGOU AÍ TÃO RÁPIDO?",
                                    '<25>{#p/undyne}{#f/17}* Eu corri.',
                                    '<18>{#p/papyrus}{#f/1}O QUE??\nENTÃO VOCÊ DEVE TER ALGO...',
                                    '<18>{#p/papyrus}{#f/9}EXTREMAMENTE LEGAL PARA DIZER SOBRE SUA CASA!!!',
                                    '<25>{#p/undyne}{#f/14}* Nah!!!'
                                ]
                                : [
                                    '<18>{#p/papyrus}{#f/4}PELO MENOS ISSO FOI, ATÉ...',
                                    '<25>{#p/undyne}{#f/12}* ... Nós colocarmos ela em chamas.',
                                    '<25>{#p/undyne}{#f/8}* MAS QUEM LIGA??',
                                    '<25>{#p/undyne}{#f/14}* Dar uma volta com o Papyrus é muito bom!'
                                ])
            ],
            () =>
                SAVE.data.n.plot < 48 || world.trueKills > 0
                    ? [
                        '<18>{#p/papyrus}{#f/0}DICA AMIGA: QUANDO COZINHAR COM A UNDYNE...',
                        '<18>{#p/papyrus}{#f/4}SE ELA COMEÇAR A ATACAR OS VEGETAIS...',
                        "<18>{#p/papiro}{#f/5}... É HORA DE FUGIR."
                    ]
                    : SAVE.data.n.plot_date < 1.3
                        ? ['<18>{#p/papyrus}{#f/0}MUITO BOM TE VER, TAMBÉM!']
                        : SAVE.data.n.plot_date < 2
                            ? ["<18>{#p/papyrus}{#f/4}NÓS AINDA ESTAMOS AQUI TE ESPERANDO, SABE..."]
                            : SAVE.data.n.plot_date < 2.1
                                ? [
                                    "<18>{#p/papyrus}{#f/0}EU TENHO CERTEZA QUE ELA APARECERÁ COM ALGUMA COISA.",
                                    "<25>{#p/undyne}{#f/14}* Não aposte nisso!"
                                ]
                                : [
                                    '<18>{#p/papyrus}{#f/0}APENAS ME CHAME DE \"FAZ-TUDO DO ROLÊ.\"',
                                    '<18>{#p/papyrus}{#f/4}EU TALVEZ NÃO CONSIGA RECONSTRUIR SUA CASA...',
                                    '<18>{#p/papyrus}{#f/9}MAS EU AINDA POSSO TE \"ARRUMAR\" UM ÓTIMO DIA!'
                                ]
        ),
        f_blooky: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}TALVEZ ALGUM DIA EU VIVA A VIDA QUIETA.",
                '<18>{#p/papyrus}{#f/5}CUIDANDO DE CARACÓIS, MIX DE MÚSICAS...',
                '<18>{#p/papyrus}{#f/6}SENDO TRISTE E NÃO DEIXANDO NINGUÉM ME ANIMAR...',
                "<18>{#p/papyrus}{#f/5}PENSANDO BEM, TALVEZ ISSO NÃO SEJA PRA MIM.",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/17}* Ele não me deixa fazê-lo se sentir melhor!",
                        '<25>{#p/undyne}{#f/16}* ... acho que nem todo mundo pode ser feliz só por sair com eles.',
                        '<18>{#p/papyrus}{#f/5}É... O SANS PODE SER ASSIM AS VEZES.',
                        "<18>{#p/papyrus}{#f/0}QUER DIZER, NÃO ME ENTENDA ERRADO.\nELE ESTÁ BEM!",
                        '<18>{#p/papyrus}{#f/6}MAS, IGUAL TODO MUNDO, ELE TEM SEUS DIAS RUINS.',
                        '<25>{#p/undyne}{#f/14}* Igual \"todo mundo?\"\n* Esse \"todo mundo\" inclui o Papyrus?',
                        '<18>{#p/papyrus}{#f/4}TÁ BOM, TÁ BOM...',
                        '<18>{#p/papyrus}{#f/0}QUASE TODO MUNDO.'
                    ])
            ],
            [
                "<18>{#p/papyrus}{#f/0}INFELIZMENTE, SOU MUITO MAIS ADEQUADO COMO UM TORCEDOR.",
                '<18>{#p/papyrus}{#f/5}... MAIS DO QUE ALGUÉM QUE PRECISA DE ANIMAÇÃO.'
            ]
        ),
        f_snail: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/4}EU OUVI DIZER QUE TEM UM JEITO DE VENCER O JOGO...",
                '<18>{#p/papyrus}{#f/0}ALGO SOBRE \"ENCORAJAMENTO OPORTUNO\".',
                '<18>{#p/papyrus}{#f/5}ENCORAJAMENTO OPORTUNO...',
                "<18>{#p/papyrus}{#f/4}COMO SE EXISTISSE UM ENCORAJAMENTO -NÃO- OPORTUNO.",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/12}* É, as vezes pode ser um pouco estranho...',
                        "<25>{#p/undyne}{#f/1}* Mas na maior parte, você está certo.",
                        '<18>{#p/papyrus}{#f/0}O QUE VOCÊ QUER DIZER?',
                        '<25>{#p/undyne}{#f/1}* Bem... se você encorajar de novo e de novo...',
                        "<25>{#p/undyne}{#f/1}* Podem acabar pensando que você só tá sendo enjoado.",
                        '<18>{#p/papyrus}{#f/7}O QUE!?\nEU SÓ USO MANTEIGA PARA COZINHAR!',
                        "<25>{#p/undyne}{#f/16}* O que eu estou dizendo é que se você encorajar alguém demais...",
                        "<25>{#p/undyne}{#f/16}* A pessoa não terá a chance de processar nada.",
                        '<25>{#p/undyne}{#f/17}* Então tome isso como um aviso amigo!!',
                        "<18>{#p/papyrus}{#f/4}... EU VOU PROCESSAR ESSE CONSELHO AGORA."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/5}I SUPONHO QUE MUITO DISSO SERIA CANSATIVO...']
                    : ["<18>{#p/papyrus}{#f/6}EU TE LIGO DE VOLTA ASSIM QUE TERMINAR DE PENSAR!!!"]
        ),
        f_taxi: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}VOCÊ JÁ NOTOU QUE TEM ALGUMA COISA ESTRANHA AQUI?',
                '<18>{#p/papyrus}{#f/4}EU PODERIA JURAR QUE TEM UM SOM TOCANDO...',
                '<18>{#p/papyrus}{#f/5}E ALGO NA DISNTÂNCIA ERA VISÍVEL TAMBÉM...',
                "<18>{#p/papyrus}{#f/0}BEM.\nCERTEZA QUE ERA SÓ MINHA IMAGINAÇÃO.",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Olha...\n* Você não é o único que escutou alguma coisa.",
                        '<25>{#p/undyne}{#f/17}* Eu poderia jurar que tinha algo lá, também.',
                        '<18>{#p/papyrus}{#f/5}UM SOM QUE VOCÊ SABE QUE ESTÁ LÁ COM VOCÊ...',
                        "<18>{#p/papyrus}{#f/4}... MAS NÃO PODE SER CONFIRMADO COM SENTIDOS.",
                        "<25>{#p/undyne}{#f/1}* Isso!!\n* É isso mesmo!!"
                    ])
            ],
            () => [
                "<18>{#p/papyrus}{#f/0}TALVEZ SEJA UM SOM COM ORIGEM NO COSMO.",
                '<18>{#p/papyrus}{#f/5}UM CHAMADO PERDIDO VINDO DAS ESTRELAS...',
                '<18>{#p/papyrus}{#f/5}VINDO DO INICÍO DO UNIVERSO.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/17}* E se o universo não tiver começo??',
                        '<18>{#p/papyrus}{#f/1}N-NÃO...!!\nUM DESAFIO A MINHA TEORIA!',
                        '<18>{#p/papyrus}{#f/5}COMO PODEREI RECUPERAR MINHA REPUTAÇÃO PERDIDA...'
                    ])
            ]
        ),
        f_prepuzzle: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}ME PERGUNTO O PORQUE DOS HUMANOS TEREM NOS PRENDIDO AQUI.',
                '<18>{#p/papyrus}{#f/5}EU SEI QUE ELES ESTAVAM COM MEDO DE NÓS, MAS...',
                "<18>{#p/papyrus}{#f/6}ELES NÃO PODERIAM TER SÓ FUGIDO!?",
                '<18>{#p/papyrus}{#f/6}OU MELHOR, TER FEITO UM ACORDO!!',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/5}É UMA PENA ELE NUNCA TER PENSADO NESSAS COISAS."]
                    : [
                        '<25>{#p/undyne}{#f/16}* É, eu me pergunto sobre isso também.',
                        "<25>{#p/undyne}{#f/17}* É meio impressionante o quão burro é.",
                        "<18>{#p/papyrus}{#f/7}NÃO É BURRO!!",
                        '<18>{#p/papyrus}{#f/5}SÓ É...',
                        "<18>{#p/papyrus}{#f/6}... NÓS NÃO FOMOS CAPAZES DE PENSAR NESSAS COISAS.",
                        "<25>{#p/undyne}{#f/12}* Bem...\n* Talvez você esteja certo.",
                        "<25>{#p/undyne}{#f/12}* Ainda não nos torna menos presos, no entanto."
                    ])
            ],
            ['<18>{#p/papyrus}{#f/0}PELO MENOS -EU- FUI CAPAZ DE PENSAR NESSAS COISAS!!']
        ),
        f_puzzle3: pager.create(
            0,
            ...[
                () => [
                    '<18>{#p/papyrus}{#f/6}EU ME CONSIDERO UM MESTRE DOS ENIGMAS, MAS...',
                    '<18>{#p/papyrus}{#f/5}EU PRECISO SER SINCERO EM RELAÇÃO A ESTE.',
                    "<18>{#p/papyrus}{#f/4}... EU NUNCA RESOLVI ESTE QUEBRA-CABEÇA.",
                    "<18>{#p/papyrus}{#f/6}ESPERA!!\nNÃO ME JULGUE AINDA!!",
                    '<18>{#p/papyrus}{#f/4}... DESLIGARAM ANTES QUE EU PUDESSE TENTAR.',
                    ...(solo()
                        ? []
                        : [
                            "<25>{#p/undyne}{#f/17}* Mesmo se não fosse desligado, você acha que conseguiria?",
                            '<25>{#p/undyne}{#f/14}* Muitos já tentaram, mas poucos conseguiram.',
                            "<18>{#p/papyrus}{#f/0}TENHO CERTEZA QUE ISSO NÃO SERIA UM PROBLEMA.",
                            '<18>{#p/papyrus}{#f/0}EU JÁ RESOLVI OUTROS DESSE TIPO BEM RAPIDAMENTE!',
                            '<25>{#p/undyne}{#f/14}* Se \"rapidamente\" você quer dizer HORAS, beleza.',
                            '<18>{#p/papyrus}{#f/6} O QUE?? HORAS?',
                            '<18>{#p/papyrus}{#f/5}EU RESOLVI ESTE QUEBRA-CABEÇA EM DEZ SEGUNDOS!',
                            '<25>{#p/undyne}{#f/17}* E o tempo que você passou encarando eles?',
                            '<18>{#p/papyrus}{#f/7}... FOI O TEMPO QUE EU PASSEI PENSANDO!!'
                        ])
                ],
                () =>
                    solo()
                        ? ['<18>{#p/papyrus}{#f/6}EU SEI, CERTO!?\nTÃO INJUSTO!!']
                        : [
                            '<18>{#p/papyrus}{#f/0}QUANTO MAIS VOCÊ PENSA, MENOS VOCÊ TEM QUE RESOLVER.',
                            '<18>{#p/papyrus}{#f/9}UMA DICA PRA QUALQUER QUEBRA-CABEÇA QUE VOCÊ ACHAR!'
                        ]
            ].map(
                lines => () =>
                    SAVE.data.n.plot < 45
                        ? SAVE.data.b.f_state_password
                            ? [
                                '<18>{#p/papyrus}{#f/6}LEIA O TERMINAL!!',
                                '<18>{#p/papyrus}{#f/6}PRÓXIMO A DIREITA!!!',
                                '<18>{#p/papyrus}{#f/6}BOA SORTE!!'
                            ]
                            : ((SAVE.data.b.f_state_password = true),
                                [
                                    "<18>{#p/papyrus}{#f/4}OH... É -ESTE- QUEBRA-CABEÇA, EH?",
                                    "<18>{#p/papyrus}{#f/5}... OLHA.\nELE NÃO O MAIS FÁCIL QUE SE TEM.",
                                    '<18>{#p/papyrus}{#f/9}FELIZMENTE, EU TENHO UMA SOLUCÃO!',
                                    '<18>{#p/papyrus}{#f/0}PRONTO?',
                                    '<18>{p/papyrus}{f/0}VOCÊ PODE USÁ-LO NO TERMINAL PERTO DA DIREITA.',
                                    '<32>{#p/human}* (Papyrus cochicha algo no seu ouvido.)',
                                    '<18>{#p/papyrus}{#f/6}ESPERO QUE ISSO AJUDE!'
                                ])
                        : lines()
            )
        ),
        f_prespear: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}SE EU FOSSE VOCÊ, DESCONFIARIA DESTA SALA...',
                '<18>{#p/papyrus}{#f/5}UNDYNE NORMALMENTE APARECE AÍ PARA ENCARAR O OUTPOST.',
                "<18>{#p/papyrus}{#f/6}E ELA ENCARA SEJA LÁ QUEM ESTIVER PASSANDO!",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}ATÉ EU JÁ FUI ALVO DELA.']
                    : [
                        '<25>{#p/undyne}{#f/14}* Eu fico aí para PATRULHAR e caçar humanos.',
                        "<25>{#p/undyne}{#f/7}* Esse é meu TRABALHO.",
                        '<18>{#p/papyrus}{#f/6}BEM!!\nISSO SÓ TE TORNA AINDA MAIS FEROZ!!',
                        "<25>{#p/undyne}{#f/14}* Eu sou quem eu sou e não posso fazer nada para mudar isso.",
                        '<18>{#p/papyrus}{#f/6}QUALQUER UM PODE MUDAR, BASTA TENTAR!!',
                        "<25>{#p/undyne}{#f/17}* Existem exceções para todas as regras!",
                        '<18>{#p/papyrus}{#f/7}ENTÃO MINHA REGRA É UMA EXCESSÃO A SUA REGRA!',
                        '<25>{#p/undyne}{#f/4}* ...',
                        '<25>{#p/undyne}{#f/5}* ...',
                        "<25>{#p/undyne}{#f/12}* ... okay, eu não vi isso chegando."
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}OH, E AS LANÇAS QUE VEM POR TODOS OS LADOS.',
                        '<18>{#p/papyrus}{#f/5}TOME CUIDADO COM ISSO TAMBÉM.'
                    ]
                    : ['<18>{#p/papyrus}{#f/4}PORQUE SEQUER ARGUMENTAR AS VEZES...']
        ),
        f_spear: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}O TEMPO QUE VELA PARA ATRAVESSAR TODA ESSA SALA...',
                '<18>{#p/papyrus}{#f/5}... NUNCA PARECE SER O MESMO.',
                "<18>{#p/papyrus}{#f/4}AS VEZES DEMORA, AS VEZES É RÁPIDO...",
                '<18>{#p/papyrus}{#f/4}E ÀS VEZES EU USO BOLINHAS.',
                "<18>{#p/papyrus}{#f/0}DE TODA FORMA, NÃO FAZ MUITO SENTIDO.",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}BASICAMENTE O QUE EU ACABEI DE DIZER.']
                    : [
                        "<25>{#p/undyne}{#f/12}* Provavelmente é só um distúrbio espacial.",
                        '<25>{#p/undyne}{#f/17}* Eu senti isso mais cedo, quando eu estava atrás do humano.',
                        '<18>{#p/papyrus}{#f/4}DISTORÇÕES ESPACIAIS, SEMPRE MEXENDO COM O TEMPO...',
                        '<18>{#p/papyrus}{#f/7}QUANDO VÃO APRENDER A PARAR!?',
                        "<25>{#p/undyne}{#f/1}* Bem, não é culpa DELAS que as coisas ficaram estranhas.",
                        '<25>{#p/undyne}{#f/14}* Distorções espaciais só são parte do... bem, espaço.',
                        '<18>{#p/papyrus}{#f/5}MEU DEUS... ATÉ O PRÓPRIO ESPAÇO ESTÁ NELE!!'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papiro}{#f/4}EU NÃO MENCIONEI AS BOLINHAS?']
                    : ["<18>{#p/papyrus}{#f/4}É UMA CONSPIRAÇÃO ATINGINDO TODO O COSMO..."]
        ),
        f_corner: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}A MUITOS LUGARES NA FÁBRICA...',
                '<18>{#p/papyrus}{#f/0}... QUE SÓ SÃO ACESSIVEIS QUANDO VOCÊ PULA.',
                '<18>{#p/papyrus}{#f/9}TIPO, OS DOIS CAMINHOS LATERAIS NESTA SALA!',
                ...(solo()
                    ? [
                        "<18>{#p/papyrus}{#f/4}OUVI DIZER QUE HUMANOS PULAM ATÉ QUE ALTO, ENTÃO...",
                        "<18>{#p/papyrus}{#f/0}NÃO DEVE SER PROBLEMA NENHUM ALCANÇA-LOS PARA VOCÊ."
                    ]
                    : [
                        '<25>{#p/undyne}{#f/7}* E alguns lugares só são acessíveis através do ar!',
                        '<18>{#p/papyrus}{#f/6}POR EXEMPLO??',
                        '<25>{#p/undyne}{#f/8}* Por exemplo, o BURACO no meio daquela plataforma!',
                        '<18>{#p/papyrus}{#f/0}AH.',
                        ...(SAVE.data.b.f_state_kidd_betray
                            ? [
                                '<25>{#p/undyne}{#f/16}* Mas teve uma criança que conseguiu passar mais cedo...',
                                "<25>{#p/undyne}{#f/9}* E teria perdido o controle se não fosse por mim.",
                                "<18>{#p/papyrus}{#f/9}... BEM!!\nQUE BOM QUE VOCÊ ESTAVA LÁ!",
                                "<25>{#p/undyne}{#f/16}* É, até porque não tinha mais ninguém por lá.",
                                "<25>{#p/undyne}{#f/11}* Não é verdade, pírralha?",
                                '<18>{#p/papyrus}{#f/6}... HUH???'
                            ]
                            : [
                                '<25>{#p/undyne}{#f/1}* Teve essa criança que passou por ele mais cedo, mas...',
                                '<25>{#p/undyne}{#f/1}* O humano a salvou antes que ela perdesse o controle.',
                                "<18>{#p/papyrus}{#f/9}... BEM!!\nBOA COISA QUE ELA ESTAVA LÁ!",
                                '<18>{#p/papyrus}{#f/4}...\nESPERA UM POUCO...',
                                '<18>{#p/papyrus}{#f/7}O QUE -VOCÊ- TAVA FAZENDO LÁ!?',
                                '<25>{#p/undyne}{#f/7}* O humano os salvou rápido demais!!'
                            ])
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/9}VOCÊ CONSEGUE!!\nEU ACREDITO EM VOCÊ!']
                    : SAVE.data.b.f_state_kidd_betray
                        ? ['<18>{#p/papyrus}{#f/6}TALVEZ VOCÊ DEVA LIGAR DE VOLTA EM OUTRO LUGAR.']
                        : ['<18>{#p/papyrus}{#f/0}EU APRECIO QUE VOCÊ TENHA SALVO A CRIANÇA.']
        ),
        f_story2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ESTRELAS DE SINAL SÃO BEM LEGAIS, HEIN?',
                '<18>{#p/papyrus}{#f/5}E ELAS RE-ESCREVEM DE TEMPOS EM TEMPOS.',
                '<18>{#p/papyrus}{#f/4}ATÉ LOGO...',
                "<18>{#p/papyrus}{#f/6}EÍ, NÃO TINHA UMA SALA ASSIM EM OUTRO LUGAR!?",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/1}* É mais fácil de se perder aqui do que você pensa.",
                        '<25>{#p/undyne}{#f/4}* Teve uma vez, estávamos procurando por um monstro perdido...',
                        '<25>{#p/undyne}{#f/7}* Eu poderia jurar que repeti a mesma sala varias vezes!',
                        '<18>{#p/papyrus}{#f/0}TIPO UMA ESTRELA SINAL REPETINDO O SINAL!',
                        '<25>{#p/undyne}{#f/10}* Não exatamente...',
                        "<25>{#p/undyne}{#f/12}* É mais como se a sala... ficasse maior e maior.",
                        '<25>{#p/undyne}{#f/11}* ... huh.',
                        '<18>{#p/papyrus}{#f/5}... O MONSTRO PELO MENOS FOI ENCONTRADO?',
                        '<25>{#p/undyne}{#f/12}* Sim, era só uma criança aleatória.',
                        '<25>{#p/undyne}{#f/10}* Eu perguntei onde era sua casa, mas... ela...',
                        "<25>{#p/undyne}{#f/12}* ... uh, não tinha uma.",
                        '<18>{#p/papyrus}{#f/6}ISSO É BEM... PREOCUPANTE.',
                        '<25>{#p/undyne}{#f/17}* Nem me fala!!!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}EU JURO QUE AS VEZES SÓ REPITO O QUE DIGO."]
                    : ["<18>{#p/papyrus}{#f/5}AS VEZES ME PERGUNTO SE ESTAMOS ANDANDO EM CÍRCULOS."]
        ),
        f_pacing: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}NÃO TEM NADA PRA DIZER SOBRE ESSA SALA.",
                '<18>{#p/papyrus}{#f/4}ELA TEM O ÚNICO PROPOSITO DE TE FAZER ANDAR MAIS.',
                '<18>{#p/papyrus}{#f/5}PARA DAR CADA PASSO ATÉ A SAÍDA...',
                '<18>{#p/papyrus}{#f/4}CHEIO DE SUSPENSE ABSOLUTO E INTERMINÁVEL.',
                ...(solo() ? [] : ['<25>{#p/undyne}{#f/14}* E é basicamente isso.'])
            ],
            ['<18>{#p/papyrus}{#f/7}MUITO!\nSUSPENSE!!\nSEM FIM!!!']
        ),
        f_battle: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}NESSA SALA VOCÊ VAI ENCONTRAR A TORRE DA UNDYNE.",
                '<19>{#p/papyrus}{#f/9}FEITA DOS RESTOS DE UM ANTIGO ASTEROÍDE!',
                "<18>{#p/papyrus}{#f/5}ELA SEMPRE SE POSICIONA NO TOPO DELA...",
                '<18>{#p/papyrus}{#f/4}COCHICHANDO ALGO PARA SI MESMA...',
                ...(solo()
                    ? []
                    : SAVE.data.b.undyne_respecc
                        ? [
                            '<25>{#p/undyne}{#f/12}* Ah, certo, a \"historia do nosso povo...\"',
                            "<25>{#p/undyne}{#f/1}* Eu nem ligo de contar ela no final.",
                            '<25>{#p/undyne}{#f/8}* A pirralha provavelmente já sabe!'
                        ]
                        : [
                            '<25>{#p/undyne}{#f/12}* Ah, certo, a \"historia do nosso povo...\"',
                            '<25>{#p/undyne}{#f/1}* Apesar de todo o ensaio, acabei saindo da linha.',
                            '<25>{#p/undyne}{#f/8}* Esquece essa coisa de fala pré-planejada!!'
                        ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}EU ACHO QUE É ALGO QUE ELA PRECISA MEMORIZAR."]
                    : ['<18>{#p/papyrus}{#f/9}OLHA, EU GOSTO DE FALAS PRE-PLANEJADAS!!']
        ),
        f_exit: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}O TANQUE DE FLUIDO FOI COLOCADO AÍ ESPECIFICAMENTE...',
                '<18>{#p/papyrus}{#f/0}PORQUE UMA CERTA CAPITÃ DA GUARDA REAL...',
                "<18>{#p/papyrus}{#f/4}PENSA QUE É SEGURO PEGAR SUA JETPACK...",
                '<18>{#p/papyrus}{#f/5}E LEVAR ATÉ UMA ÁREA CHEIA DE ESTÁTISTICA.',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/6}... NÃO BEBA ISSO, SERIA BEM, BEM PERIGOSO!!']
                    : [
                        "<25>{#p/undyne}{#f/17}* Não me venha com isso!!\n* Eu estava com pressa!",
                        "<18>{#p/papyrus}{#f/4}VOCÊ SEMPRE TÁ COM PRESSA...",
                        "<25>{#p/undyne}{#f/7}* Você acha que eu não sei isso!?!?",
                        '<18>{#p/papyrus}{#f/4}... AINDA ASSIM VOCÊ AINDA SE METE NESSAS.',
                        '<25>{#p/undyne}{#f/1}* Enfrentar o perigo a frente também faz parte da Guarda Real.',
                        "<18>{#p/papyrus}{#f/6}MAS PRA QUÊ ARRISCAR SUA VIDA??",
                        '<25>{#p/undyne}{#f/12}* Sem risco, sem recompensa!',
                        "<18>{#p/papyrus}{#f/7}ESSA É A COISA MAIS ESTRANHA QUE EU JÁ OUVI!!"
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/0}EU SÓ TENHO UMA PALAVRA PARA A CAPITÃ DA GUARDA.',
                        '<18>{#p/papyrus}{#f/4}E A PALAVRA É \"OLHE PRA ONDE VOCÊ VAI.\"'
                    ]
                    : ["<18>{#p/papyrus}{#f/5}ME PREOCUPO COM A SEGURANÇA DA UNDYNE."]
        ),
        f_napstablook: pager.create(
            0,
            () =>
                SAVE.data.n.plot <= 48.1 && SAVE.data.n.state_foundry_blookdate < 2
                    ? [
                        "<18>{#p/papyrus}{#f/0}ENTÃO VOCÊ TÁ FAZENDO AMIZADE COM UM FANTASMA.",
                        '<18>{#p/papyrus}{#f/1}NÃO HÁ NADA ALÉM DO SEU ALCANCE DE AMIZADE?!?!?',
                        ...(solo()
                            ? ['<18>{#p/papyrus}{#f/6}O SEU PODER DE AMIZADE É QUASE INVENCIVEL!!']
                            : [
                                "<25>{#p/undyne}{#f/14}* Então foi assim que ela se tornou minha amiga.",
                                "<25>{#p/undyne}{#f/17}* Você poderia ter me AVISADO, Papyrus!!\n* Não tem escapatória agora!",
                                '<18>{#p/papyrus}{#f/6}AMIZADE NÃO É O TIPO DE COISA QUE DA PRA AVISAR!!'
                            ])
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/4}HMM...',
                        '<18>{#p/papyrus}{#f/4}POR QUE EU TÔ OUVINDO A TRILHA SONORA DO BOSS?',
                        ...(solo()
                            ? [
                                '<18>{#p/papyrus}{#f/0}... DESCULPA, EU DISSE DO \"BOSS?\"',
                                '<18>{#p/papyrus}{#f/5}EU QUIS DIZER \"BOSSA NOVA.\"'
                            ]
                            : [
                                "<25>{#p/undyne}{#f/8}* Porque eu estou aqui, bobo!",
                                '<18>{#p/papyrus}{#f/6}MAS É CLARO!!\nCOMO EU PUDE ME ESQUECER!!'
                            ])
                    ],
            () =>
                SAVE.data.n.plot <= 48.1 && SAVE.data.n.state_foundry_blookdate < 2
                    ? solo()
                        ? ['<18>{#p/papyrus}{#f/5}SÓ TOME CUIDADO COMO ECTOPLASMA.']
                        : [
                            "<18>{#p/papyrus}{#f/5}PELO MENOS ELA DEVE TER APRENDIDO SUA LIÇÃO AGORA...",
                            '<25>{#p/undyne}{#f/14}* É... totalmente!'
                        ]
                    : solo()
                        ? ['<18>{#p/papyrus}{#f/9}O FANTASMA TEM MÚSICAS BAIXADAS NOS DISCOS!']
                        : ['<18>{#p/papyrus}{#f/0}MÚSICA ASSUSTADORA PARA UMA DAMA PEIXEIRA ASSUSTADORA.', '<25>{#p/undyne}{#f/8}* Basicamente!!']
        ),
        f_hapstablook: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/6}HUH?\nONDE VOCÊ TÁ?',
                "<18>{#p/papyrus}{#f/5}EU... NUNCA ESTIVE AÍ ANTES.",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}E TAMBÉM... NUNCA VI NINGUÉM AÍ.']
                    : [
                        '<25>{#p/undyne}{#f/14}* ... É, essa casa tá abandonada faz um bom tempo.',
                        '<25>{#p/undyne}{#f/17}* Antes mesmo de eu nascer, na verdade!',
                        '<18>{#p/papyrus}{#f/6}QUE ESTRANHO!!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}PRA SER SINCERO, EU NÃO SEI SE QUERO SABER O PORQUE..."]
                    : ['<18>{#p/papyrus}{#f/5}O TEMPO REALMENTE PASSA, HUH?', '<25>{#p/undyne}{#f/14}* Realmente!']
        ),
        a_start: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}ENTÃO AGORA VOCÊ CHEGOU EM AERIALIS, HUH?",
                "<18>{#p/papyrus}{#f/0}NÃO SOU O ÚNICO QUE NÃO GOSTA PINÁCULOS.",
                "<18>{#p/papyrus}{#f/4}EXCETO... QUE ELES NÃO SÃO SÓ DECORATIVOS.",
                '<18>{#p/papyrus}{#f/4}CENTENAS DE PESSOAS VIVEM LÁ.',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/0}AINDA ASSIM, ELES NÃO DEIXAM DE SER DECORATIVOS!"]
                    : [
                        '<25>{#p/undyne}{#f/14}* Até a Dr. Alphys vivia em uma dessas coisas.',
                        '<25>{#p/undyne}{#f/1}* Com seus amigos de infância, Bratty e Catty...',
                        '<25>{#p/undyne}{#f/1}* Ela me contou sobre quando se tornou a cientista real.',
                        "<18>{#p/papyrus}{#f/0}POR CURIOSIDADE, VOU PERGUNTAR PRA ELA MAIS TARDE.",
                        '<25>{#p/undyne}{#f/12}* Faça isso.\n* Eu ACHO que ela gosta de falar sobre...?'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/0}A NO MEIO É MINHA FAVORITA.']
                    : ['<18>{#p/papyrus}{#f/5}A VIDA DE UMA CASA PINÁCULO DEVE SER INCRIVEL...']
        ),
        a_lab_entry: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}AH, O LABORATÓRIO. UM BOM LUGAR PARA ESTAR!',
                '<18>{#p/papyrus}{#f/0}ESPECIALMENTE QUANDO A DR. ALPHYS ESTÁ POR AÍ.',
                ...(solo()
                    ? [
                        '<18>{#p/papyrus}{#f/}ELA REALMENTE GOSTA DE FALAR DAQUELE SCI-FI...',
                        "<18>{#p/papyrus}{#f/9}ENTÃO É BOM QUE EU GOSTE TAMBÉM!"
                    ]
                    : [
                        '<25>{#p/undyne}{#f/1}* A Alphys está... sempre no laboratório, Papyrus.',
                        '<26>{#f/17}* A \"casa\" dela é aquele cubo roxo no piso de cima.',
                        "<26>{#f/16}* Não me pergunte como funciona, ela até me contou, mas...",
                        "<26>{#f/12}* Eu não acho que entenderíamos.",
                        '<18>{#p/papyrus}{#f/4}EU PEGUEI O PONTO.',
                        '<18>{#p/papyrus}{#f/0}ENTÃO, COMO FUNCIONA?',
                        '<25>{#p/undyne}{#f/17}* ...',
                        "<25>{#p/undyne}{#f/14}* Eu te conto depois."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}ELA TEM O PÉSSIMO HABITO DE DAR SPOILER.']
                    : ["<25>{#p/undyne}{#f/8}* Eu te conto depois!!!", '<18>{#p/papyrus}{#f/6}EU SEI!!!']
        ),
        a_lab_main: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}A ÚLTIMA VEZ EM QUE ESTIVE AÍ...',
                solo()
                    ? '<18>{#p/papyrus}{#f/0}... FOI ESSA SEMANA, EM UM RÔLE COM A DR. ALPHYS!'
                    : '<18>{#p/papyrus}{#f/0}... FOI HOJE MAIS CEDO, NO CAMINHO PARA O REC CENTER!',
                '<18>{#p/papyrus}{#f/5}QUANDO EU ERA NOVO, SANS ERA QUEM ME LEVAVA.',
                '<18>{#p/papyrus}{#f/5}TANTAS MARAVILHAS CIENTIFICAS PARA MARAVILHAR...',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/6}É UMA PENA QUE POUCAS PESSOAS TENHAM INTERESSE!"]
                    : [
                        '<18>{#p/papyrus}{#f/0}O QUE VOCÊ ACHA UNDYNE?',
                        '<25>{#p/undyne}{#f/1}* O que eu acho?\n* Bem...',
                        '<25>{#p/undyne}{#f/14}* A maquina de sorvete faz um sorvete MUITO bom.',
                        "<18>{#p/papyrus}{#f/4}... É ISSO?",
                        '<25>{#p/undyne}{#f/20}* Eu acho legal como a Alphys consegue distrair a humana...',
                        '<18>{#p/papyrus}{#f/0}OH, SIM! ELA PODE DISTRAIR OUTRAS PESSOAS, TAMBÉM!',
                        '<25>{#p/undyne}{#f/13}* ...',
                        '<25>{#p/undyne}{#f/7}* EU ESTOU SENDO DISTRAÍDA AGORA MESMO???'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/0}OH CERTO, EU ESQUECI DE MENCIONAR...',
                        '<18>{#p/papyrus}{#f/0}MEU IRMÃO ERA ASSISTENTE NO LABORATÓRIO.',
                        "<18>{#p/papyrus}{#f/6}EU AINDA NÃO SEI PORQUE ELE SAIU...",
                        '<18>{#p/papyrus}{#f/5}JÁ QUE ELE GOSTAVA TANTO DE TRABALHAR LÁ.'
                    ]
                    : [
                        '<25>{#p/undyne}{#f/7}* Eu vou MATAR ela.',
                        "<18>{#p/papyrus}{#f/5}MAS VOCÊ AINDA NEM SABE SE ELA TE DISTRAIU!",
                        "<25>{#p/undyne}{#f/8}* ... e você acha que ela NÃO faria isso!?",
                        "<18>{#p/papyrus}{#f/6}EU NÃO SEI!!",
                        "<25>{#p/undyne}{#f/14}* Não se preocupa, eu não vou matar ela literalmente.",
                        '<25>{#p/undyne}{#f/17}* Só metaforicamente.',
                        "<18>{#p/papyrus}{#f/4}... TUDO BEM ENTÃO, ASSIM PODE."
                    ]
        ),
        a_lab_upstairs: pager.create(
            0,
            () =>
                SAVE.data.b.water
                    ? [
                        '<18>{#p/papyrus}{#f/5}ESSAS LIXEIRAS DE RECICLAGEM NUNCA SÃO USADAS PARA ISSO.',
                        "<18>{#p/papyrus}{#f/4}SE ELAS FOSSEM, ALPHYS NÃO TERIA PLANOS...",
                        '<18>{#p/papyrus}{#f/5}PARA UMA MAQUINA QUE SEPARA TODO O LIXO DENTRO.',
                        '<18>{p/papyrus}{f/6}POR EXEMPLO, FLUIDO ELETRO-AMORTECEDOR!',
                        ...(solo()
                            ? []
                            : [
                                '<25>{#p/undyne}{#f/17}* É sério que ela ainda tá segurando o copo?',
                                "<25>{#p/undyne}{#f/8}* Você só pode estar de brincadeira!!",
                                "<18>{#p/papyrus}{#f/4}PELO MENOS ELE AINDA NÃO BEBEU.",
                                '<25>{#p/undyne}{#f/16}* É, isso seria bem paia.',
                                "<25>{#p/undyne}{#f/14}* Por outro lado, não faz nada com monstros!"
                            ])
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/0}HÁ UMA MÁQUINA ESTRANHA NO LABORATÓRIO...",
                        '<18>{#p/papyrus}{#f/0}EU ACHO QUE A ALPHYS USA PRA FAZER SORVETE.',
                        '<18>{#p/papyrus}{#f/4}... QUE ELA SEM DÚVIDAS COME ASSISTINDO ANIME.',
                        ...(solo()
                            ? []
                            : [
                                "<25>{#p/undyne}{#f/17}* Ela nunca me chamou pra fazer nenhuma maratona de TV...",
                                '<18>{#p/papyrus}{#f/4}HMM...',
                                '<18>{#p/papyrus}{#f/0}OH, TUDO BEM!',
                                '<18>{#p/papyrus}{#f/9}VOCÊ SÓ PRECISA \"QUEBRAR O GELO\" COM ELA!',
                                '<25>{#p/undyne}{#f/13}* ... que?',
                                '<18>{#p/papyrus}{#f/0}QUEBRAR O GELO!',
                                "<25>{#p/undyne}{#f/14}* Essa foi ruim demais, eu amei."
                            ])
                    ],
            () => [
                '<18>{#p/papyrus}{#f/0}FALANDO EM COMIDA E BEBIDA...',
                '<18>{#p/papyrus}{#f/0}OUVI DIZER QUE METTATON QUIS ABRIR UM FASTFOOD CHIQUE.',
                '<18>{#p/papyrus}{#f/4}E SERIA CHAMADO DE \"ENERGIA NEO.\"',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/5}EU NÃO SEI O QUE SIGNIFICA."]
                    : [
                        '<25>{#p/undyne}{#f/12}* Parece besteira pra vender marca.',
                        "<18>{#p/papyrus}{#f/7}QUE??\nMETTATON NÃO FARIA ISSO!"
                    ])
            ]
        ),
        a_lab_downstairs: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}AQUELAS BEBIDAS FANTÁSTICAS NA MAQUINA...',
                '<18>{#p/papyrus}{#f/0}EU DESEJO TENTA-LAS, MAS...',
                '<18>{#p/papyrus}{#f/4}A MAQUINA PARECE NÃO TER UMA FUNÇÃO DE DISPENSAR.',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/8}* Se o produto não estiver saindo, só balança!",
                        "<18>{#p/papyrus}{#f/0}EU PREFIRO ARRUMAR A MAQUINA PROPRIAMENTE.",
                        "<25>{#p/undyne}{#f/1}* Balançar normalmente funciona. É minha forma de arrumar.",
                        '<18>{#p/papyrus}{#f/4}TALVEZ VOCÊ DEVESSE ARRUMAR MINHA CARREIRA.',
                        "<25>{#p/undyne}{#f/14}* Nah, ela é ótima do jeito que ela é."
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}EU IREI SEDER AO REFRIGERANTE VERMELHO NA MESA."]
                    : [
                        '<25>{#p/undyne}{#f/1}* Em adição a balançar...',
                        '<25>{#p/undyne}{#f/14}* Essa fita térmica superforte é minha OUTRA solução.',
                        '<18>{#p/papyrus}{#f/0}VERDADE, ELA PODE ARRUMAR QUALQUER COISA.',
                        '<18>{#p/papyrus}{#f/4}... BEM, QUASE TUDO.',
                        "<25>{#p/undyne}{#f/7}* Ela está ótima do jeito que é!!"
                    ]
        ),
        a_lab_virt: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/4}É UMA PENA QUE O VIRTUALISMO NÃO ESTEJA ABERTO.",
                "<18>{#p/papyrus}{#f/7}PENSE EM TODA A DIVERSÃO QUE ESTOU PERDENDO AGORA!",
                ...(solo()
                    ? [
                        '<18>{#p/papiro}{#f/5}... QUE PENA.',
                        "<18>{#p/papyrus}{#f/6}EU NEM POSSO ADMINISTRAR MEU RESTAURANTE FAMOSO!!"
                    ]
                    : [
                        '<25>{#p/undyne}{#f/7}* \"Diversão\" não é a palavra que eu usaria.',
                        '<18>{#p/papyrus}{#f/5}DA PRA CULPAR UM ESQUELETO COMO EU...',
                        '<18>{#p/papyrus}{#f/6}POR QUERER SER DONO DE UM RESTAURANTE??',
                        '<25>{#p/undyne}{#f/17}* Esse tipo de coisa deve ser estressante, Papyrus.',
                        '<18>{#p/papyrus}{#f/4}DISSE A CAPITÃ DA GUARDA REAL.',
                        '<25>{#p/undyne}{#f/14}* Ser a capitã da Guarda Real é uma coisa.',
                        '<25>{#p/undyne}{#f/7}* Cuidar de um restaurante é DIFERENTE!'
                    ])
            ],
            () => [
                '<18>{#p/papyrus}{#f/0}É, SOBRE O RESTAURANTE...',
                '<18>{#p/papyrus}{#f/9}ELE É UMA NAVE ESPACIAL GIGANTE!',
                '<18>{#p/papyrus}{#f/4}COM ENERGIA ATRÁVES DE MOLHO MARINARA.',
                ...(solo() ? [] : ['<25>{#p/undyne}{#f/14}* ... entendo.'])
            ]
        ),
        a_path1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}EU SEI QUE AERIALIS ERA UMA ÁREA EM CONSTRUÇÃO.',
                '<18>{#p/papyrus}{#f/5}ELES IRIAM CONSTRUIR TANTAS COISAS, MAS...',
                '<18>{#p/papyrus}{#f/4}ASSIM QUE O LAB CONCLUIU, ACABOU O ROXO.',
                '<18>{#p/papyrus}{#f/4}VERDADEIRAMENTE, UM SALTO PARA TRÁS.',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/17}* Você sabe que eles poderiam ter feito mais, certo?",
                        '<25>{#p/undyne}{#f/7}* A razão de terem parado é porque Mettaton tomou controle!!',
                        "<18>{#p/papyrus}{#f/0}VOCÊ FALA COMO SE FOSSE ALGO RUIM.",
                        '<25>{#p/undyne}{#f/17}* ...',
                        '<25>{#p/undyne}{#f/17}* Ele PODE ser um pouco ditador as vezes.',
                        "<18>{#p/papyrus}{#f/0}AH, EU SEI.\nÉ POR ISSO QUE NÃO OS CULPO.",
                        '<18>{#p/papyrus}{#f/4}POUCOS PODEM AGUENTAR SUA BELEZA.',
                        '<25>{#p/undyne}{#f/12}* ... não o que eu quis dizer, mas beleza.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<19>{#p/papyrus}{#f/0}É TRISTE QUE JAMAIS VEREMOS TODO SEU POTENCIAL.",
                        '<18>{#p/papyrus}{#f/5}TODAS AS LINDAS ESTRUTURAS E MAQUINAS...',
                        "<18>{#p/papyrus}{#f/8}PENSE NOS APARELHOS LEGAIS QUE EU PODERIA TER USADO!"
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/4}SE PELO MENOS O METTATON NÃO FOSSE TÃO BELO.",
                        "<18>{#p/papyrus}{#f/6}ESPERA, ISSO SERIA RUIM!!",
                        '<18>{#p/papyrus}{#f/5}MAS TAMBÉM É O ABANDONO DA ÁREA DE PREPARAÇÃO...',
                        "<25>{#p/undyne}{#f/1}* Me pergunto se alguém poderia arrumar isso.",
                        '<18>{#p/papyrus}{#f/0}COMO... UM BELO FILTRO DE COMPENSAÇÃO!?',
                        '<25>{#p/undyne}{#f/18}* Eu estava pensando mais nas linhas do EGO dele.',
                        '<25>{#p/undyne}{#f/17}* Um \"filtro de compensação ao ego\" você diz.',
                        '<18>{#p/papyrus}{#f/7}ESQUECE!'
                    ]
        ),
        a_path2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ESSES LEVITADORES SÃO BEM DIVERTIDOS.',
                "<18>{#p/papyrus}{#f/0}AS VEZES, QUANDO NINGUÉM ESTÁ VENDO...",
                "<18>{#p/papyrus}{#f/0}EU VOU E VOLTO NELES O TEMPO TODO.",
                '<18>{#p/papyrus}{#f/4}MAS ISSO REQUER UM PASSE ESPECIAL.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/4}* Ei, a Alphys nunca me deu um passe desses!',
                        '<18>{#p/papyrus}{#f/0}PEDE PRA ELA DA PRÓXIMA VEZ QUE A VER!',
                        '<25>{#p/undyne}{#f/3}* ...',
                        '<18>{#p/papyrus}{#f/6}...',
                        '<25>{#p/undyne}{#f/11}* ...',
                        '<25>{#p/undyne}{#f/8}* É claro que eu vou, caralho!',
                        '<18>{#p/papyrus}{#f/6}OLHA A LINGUA!!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/0}VAI LÁ, TENTE UM POUCO!',
                        "<18>{#p/papyrus}{#f/5}ELES NÃO SÃO PERIGOSOS...",
                        '<18>{#p/papyrus}{#f/6}... NORMALMENTE.'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/4}...',
                        "<18>{|}{#p/papyrus}{#f/4}EU NÃO POSSO SER O ÚNICO QUE PENSA QUE VOCÊ- {%}",
                        '<25>{#p/undyne}{#f/8}* OH MEU SENHOR, POR FAVOR!!',
                        '<18>{#p/papyrus}{#f/6}OKAY, OKAY!'
                    ]
        ),
        a_path3: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}OUVI DIZER QUE É DIFÍCIL CONSEGUIR AULAS EM AERIALIS.',
                '<18>{#p/papyrus}{#f/6}SERIA VERDADE??\nOS ESTUDANTES SOFREM ASSIM?',
                "<18>{#p/papyrus}{#f/8}EU NÃO SEI O QUE SERIA SEM MINHA EDUCAÇÃO...!",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/8}* Eu saí da escola quando tinha dez anos!!',
                        '<18>{#p/papyrus}{#f/1}O QUE!?!?',
                        '<18>{#p/papyrus}{#f/6}COMO VOCÊ PÔDE TRAIR O SISTEMA DESSA FORMA!',
                        '<25>{#p/undyne}{#f/1}* Nem todo mundo tem os mesmos caminhos na vida, Papyrus.',
                        '<25>{#p/undyne}{#f/1}* Depois que eu saí da escola, ASGORE virou meu mestre.',
                        '<25>{#p/undyne}{#f/14}* Ele foi o melhor que eu já tive.',
                        '<18>{#p/papiro}{#f/5}... PARECE QUE TENHO MUITO A APRENDER...'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/8}EU NEM TERIA MEU ATAQUE ESPECIAL!"]
                    : ["<18>{#p/papyrus}{#f/6}NÃO SE PREOCUPE, EU COMEÇAREI A APRENDER AGORA!"]
        ),
        a_rg1: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}É LEGAL COMO OS GUARDAS E SENTINELAS AQUI...",
                '<18>{#p/papyrus}{#f/4}NUNCA PARECEM SE PERDER.',
                '<18>{#p/papyrus}{#f/5}ESPECIALMENTE COM A FALTA DE...',
                '<18>{#p/papyrus}{#f/6}... BEM, DE NADA!!',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/7}TODAS AS SALAS PARECEM A MESMA COISA!']
                    : [
                        "<25>{#p/undyne}{#f/12}* Na verdade, você não está muito errado...",
                        "<25>{#p/undyne}{#f/1}* Eles levaram ANOS tentando memorizar a área completa.",
                        '<18>{#p/papyrus}{#f/0}NO FINAL ELES CONSEGUIRAM, CERTO?',
                        '<25>{#p/undyne}{#f/16}* Olha... após a centésima falha de memorização...',
                        '<25>{#p/undyne}{#f/17}* Eu dei pra elas um modulo de navegação nos capacetes.',
                        '<18>{#p/papyrus}{#f/1}O QUE!?!?',
                        '<18>{#p/papyrus}{#f/7}ESSA É A TECNOLOGIA EM AÇÃO!!'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}ME PERGUNTO COMO -VOCÊ- NUNCA SE PERDE...']
                    : [
                        '<18>{#p/papyrus}{#f/4}O GRANDE E NATURALMENTE-TALENTOSO PAPYRUS...',
                        '<18>{#p/papyrus}{#f/7}JAMAIS IRIA ENTREGAR Á TECNOLOGIA MEU TRABALHO!',
                        "<18>{#p/papyrus}{#f/0}... EU SÓ USARIA SE ESTIVESSE DISPONIVEL."
                    ]
        ),
        a_path4: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}LENDAS CONTAM DE UM LUGAR ONDE LIXO SE TORNA TESOURO.',
                '<18>{#p/papyrus}{#f/9}UM LUGAR ONDE O ÍNUTIL SE TORNA OURO!',
                '<18>{#p/papyrus}{#f/4}E UM LUGAR ONDE O ATUM ESPACIAL...',
                '<18>{#p/papyrus}{#f/5}BEM, ELE SÓ DESAPARECE.',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/6}VOCÊ CONHECE TAL LUGAR?']
                    : [
                        "<25>{#p/undyne}{#f/1}* Tá parecendo a loja da Bratty e Catty.",
                        '<25>{#p/undyne}{#f/14}* Elas amam atum espacial mais do que amam vender lixo!',
                        '<25>{#p/undyne}{#f/17}* E elas A-M-A-M vender porqueira!!',
                        '<18>{#p/papyrus}{#f/0}WOWIE!',
                        '<18>{#p/papyrus}{#f/5}ELAS VENDEM NÃO-LIXO, POR ALGUMA CHANCE?',
                        '<25>{#p/undyne}{#f/8}* Pra quê elas fariam isso!?'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}EU LEVAREI ISSO COMO UM BELO \"TALVEZ.\"']
                    : [
                        '<18>{#p/papyrus}{#f/0}ENTÃO BRATTY E CATTY SÃO VENDEDORAS DE LIXO?',
                        "<18>{#p/papyrus}{#f/4}EU FICARIA SURPRESO SE ELAS NÃO CONHECESSEM MEU IRMÃO."
                    ]
        ),
        a_barricade1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ESSA SALA PODE OU NÃO CONTER BARRICADAS.',
                '<18>{#p/papyrus}{#f/4}É PASSAR POR PERGUNTAS PRA AVANÇAR...',
                '<18>{#p/papyrus}{#f/1}SERIA ISSO UMA ADIÇÃO SECRETA PARA UM SHOW DE QUIZ?',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* Um quiz show, huh?',
                        '<18>{#p/papyrus}{#f/9}... CHEIO DE QUESTÕES IMPOSSÍVEIS!',
                        "<25>{#p/undyne}{#f/1}* Okay, aqui vai uma pergunta pra você.",
                        '<25>{#p/undyne}{#f/12}* Precisamente quantas botas seriam necessárias...',
                        "<25>{#p/undyne}{#f/7}* Pra chutar a bunda de um robô pro espaço!!",
                        '<18>{#p/papyrus}{#f/6}UH...',
                        '<18>{#p/papyrus}{#f/5}... OLHA, HMMMM...',
                        '<18>{#p/papyrus}{#f/4}DEPENDE DA FORÇA DA GRAVIDADE.',
                        '<25>{#p/undyne}{#f/8}* Papyrus!!'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}JÁ FAZ UM TEMPO DESDE QUE ELE FEZ UM."]
                    : [
                        "<25>{#p/undyne}{#f/1}* Eu tenho outra questão vital que você amará ouvir.",
                        '<18>{#p/papyrus}{#f/5}... TALVEZ MAIS TARDE.',
                        "<18>{#p/papyrus}{#f/4}ATÉ PORQUE, JÁ SABEMOS ONDE ISSO ESTÁ INDO...",
                        '<25>{#p/undyne}{#f/7}* É!!\n* Pro espaço!!'
                    ]
        ),
        a_puzzle1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}SABE DE ALGO, PODE SER SÓ EU, MAS...',
                '<18>{#p/papyrus}{#f/4}ESSES QUEBRA-CABEÇAS SÃO BEM ESQUISITOS.',
                '<18>{#p/papyrus}{#f/4}... EU SEMPRE PASSO DIRETO PELO TERMINAL CORRETO.',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}... E DE NOVO, E DE NOVO...']
                    : [
                        '<25>{#p/undyne}{#f/1}* Sério?\n* Toda vez que eu tento resolver essas coisa...',
                        '<25>{#p/undyne}{#f/17}* Tudo fica bem malucão!!',
                        "<18>{#p/papyrus}{#f/6}A ALPHYS NÃO TE TROUXE DE VOLTA A SEGURANÇA?",
                        '<25>{#p/undyne}{#f/12}* Bem.. Eu...',
                        '<18>{#p/papyrus}{#f/6}UNDYNE, O QUE VOCÊ FEZ!?!?',
                        '<25>{#p/undyne}{#f/12}* ...',
                        "<25>{#p/undyne}{#f/12}* Nadica.",
                        '<25>{#p/undyne}{#f/12}* Tirando quase me deletar da existência, nada.',
                        '<18>{#p/papyrus}{#f/8}SÓ TOMA MAIS CUIDADO DA PROXIMA VEZ, PODE SER?'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}EU TENHO ZERO INTENÇÕES EM FAZER ISSO DE NOVO.']
                    : ['<18>{#p/papyrus}{#f/4}ESSAS TECNOLOGIAS DIMENSIONAIS SÃO UM PROBLEMA REAL.']
        ),
        a_mettaton1: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}AQUI VAI UM POUQUINHO DE CONSELHO.",
                '<18>{#p/papyrus}{#f/4}QUANDO METTATON PEDI PRA FAZER ALGO NO SHOW...',
                '<18>{#p/papyrus}{#f/4}VOCÊ FAZ.',
                '<18>{#p/papyrus}{#f/0}NENHUM MAS E SE, E, MAS NÃO SEI O QUE!',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* E que tal \"entretanto?\"',
                        '<18>{#p/papyrus}{#f/4}...',
                        '<18>{#p/papyrus}{#f/4}ESSA É SÓ OUTRA FORMA DE DIZER \"MAS.\"',
                        '<25>{#p/undyne}{#f/17}* ... claro.',
                        '<25>{#p/undyne}{#f/14}* E que tal \"ah não ser que?\"',
                        '<18>{#p/papyrus}{#f/4}AS REGRAS JÁ FORAM IMPOSTAS.',
                        "<25>{|}{#p/undyne}{#f/8}* Mas eu não estava falando sobre- {%}",
                        '<18>{#p/papyrus}{#f/6}SEM MAS!!!',
                        '<25>{|}{#p/undyne}{#f/7}* Se você pelo menos me deixar fa- {%}',
                        '<18>{#p/papyrus}{#f/7}SEM SE!!'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}E SEM ENTRETANTO, TAMBÉM.']
                    : ['<18>{#p/papyrus}{#f/4}E NEM TENTE COMEÇAR COM \"TALVEZ.\"']
        ),
        a_elevator1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}TANTOS ELEVADORES, TÃO POUCO TEMPO...',
                "<18>{#p/papyrus}{#f/4}EXCETO QUANDO NÃO ESTÃO FUNCIONANDO.",
                '<18>{#p/papyrus}{#f/6}EU TIVE QUE ANDAR A PÉ ONTEM!!',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}SE EU SOUBESSE PORQUE ALGUÉM OS DESLIGARIA...']
                    : [
                        '<25>{#p/undyne}{#f/12}* Ouvi dizer que o Mettaton os desliga para os shows.',
                        '<18>{#p/papyrus}{#f/4}ELE... ELE FAZ ISSO?',
                        '<25>{#p/undyne}{#f/17}* Pelo que eu sei!',
                        '<18>{#p/papyrus}{#f/7}... A -OUSADIA- DAQUELE ROBÔ RETANGULAR!',
                        '<18>{#p/papyrus}{#f/7}EU TEREI QUE FALAR COM ELE MAIS TARDE!',
                        "<25>{#p/undyne}{#f/7}* E dizer pra cancelar os shows ESTÚPIDOS enquanto você tá lá!"
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/5}É UMA CONSPIRAÇÃO EM TANTOS NÍVEIS DIFERENTES. "]
                    : [
                        '<18>{#p/papyrus}{#f/4}TALVEZ...\nESSA SEJA MINHA CHANCE...',
                        '<18>{#p/papyrus}{#f/9}... PARA SUGERIR A CONSTRUÇÃO DE MAIS DESSES!'
                    ]
        ),
        a_lift: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ESSE ELEVADOR DEVERIA LANÇAR UM ALBUM DE MÚSICA!',
                '<18>{#p/papyrus}{#f/5}TANTOS TONS MARAVILHOSOS...',
                "<18>{#p/papyrus}{#f/6}É UMA PENA QUE O SISTEMA DE SOM ESTEJA QUEBRADO.",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/13}* Blues?\n* Sério?',
                        "<25>{#p/undyne}{#f/14}* Todo mundo sabe que rock and roll é o melhor.",
                        '<18>{#p/papyrus}{#f/4}QUE!?\nROCK AND ROLL É ESTRANHO...',
                        "<18>{#p/papyrus}{#f/9}SE VOCÊ PRECISA DE GUITARRAS PESADAS, QUE TAL UM METAL?",
                        '<25>{#p/undyne}{#f/8}* Você escuta METAL!?',
                        '<25>{#p/undyne}{#f/4}* Não, não, você precisa escutar DUBSTEP.',
                        '<18>{#p/papyrus}{#f/6}DUBSTEP!?!?'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}EU POSSO OU NÃO TER ESCUTADO ISSO ALGUMAS VEZES.']
                    : [
                        '<18>{#p/papyrus}{#f/0}BLUES É ÓTIMO, MAS SKA É MEU FAVORITO.',
                        '<18>{p/papyrus}{f/9}VOCÊ NUNCA TERÁ DEMAIS DAQUELAS TRUMPETAS CATIVELES!'
                    ]
        ),
        a_elevator2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}SEJA BEM-VINDO AO SEGUNDO PISO DE AERIALIS.',
                '<18>{#p/papyrus}{#f/4}AQUI, VOCÊ ENCONTRARÁ COISAS LEGAIS...',
                '<18>{#p/papyrus}{#f/9}QUEBRA-CABEÇAS!\nBARRICADAS!\nATÉ UM SET DE TV!',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/5}... ESPERA, NÃO É ISSO QUE TINHA NO PRIMEIRO PISO?"]
                    : [
                        "<25>{#p/undyne}{#f/14}* Então... o primeiro é a mesma coisa do segundo.",
                        '<18>{#p/papyrus}{#f/6}EU ACHO QUE SIM???',
                        '<25>{#p/undyne}{#f/1}* Quer dizer, ei.\n* Pelo menos o segundo piso é maior.',
                        '<18>{#p/papyrus}{#f/4}AH, PERFEITO.\nFICO AINDA MAIS PERDIDO, AGORA.',
                        '<25>{#p/undyne}{#f/17}* Pelo menos o segundo piso tem coisas mais legais pra ver!!',
                        "<18>{#p/papyrus}{#f/6}NÃO VAI ME AJUDAR MUITO QUANDO EU ME PERDER!!"
                    ])
            ],
            [
                '<18>{#p/papyrus}{#f/5}SEJA LÁ QUEM FEZ ESSA ÁREA DEVE SER FÃ DA PREGUIÇA.',
                "<18>{#p/papyrus}{#f/4}ISSO CERTAMENTE EXPLICA ESSA ESTAÇÃO DE SENTINELA..."
            ]
        ),
        a_sans: pager.create(
            0,
            () => [
                '<19>{#p/papyrus}{#f/0}SIM, MEU IRMÃO VENDE HOT-DOG NA ESTAÇÃO.',
                '<18>{#p/papyrus}{#f/4}NÃO É EXAMENTE O QUE EU CHAMARIA DE \"GOSTOSO.\"',
                "<18>{#p/papyrus}{#f/5}EU DEVERIA ABRIR UM ESTANDE DE COMIDA...",
                '<18>{#p/papyrus}{#f/5}MAS DA ÚLTIMA VEZ QUE TENTEI...',
                '<18>{#p/papyrus}{#f/6}A MÁFIA ESPACIAL QUERIA PARTE DOS LUCROS.',
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/7}SÉRIO!?\nEU NUNCA ME VENDERIA PARA A MÁFIA!!"]
                    : [
                        '<25>{#p/undyne}{#f/17}* ...',
                        '<25>{#p/undyne}{#f/17}* A O QUE?',
                        '<18>{#p/papyrus}{#f/0}A MÁFIA ESPACIAL.',
                        '<18>{#p/papyrus}{#f/4}SABE, AQUELA NO VIRTUALISMO.',
                        '<25>{#p/undyne}{#f/12}* Ah, ESSA máfia especial.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/0}CRÉDITO ONDE É DEVIDO, ELES SE VESTEM ELEGANTEMENTE.",
                        "<18>{#p/papyrus}{#f/7}NÃO QUE ISSO MUDE MINHA IDEIA EM RELAÇÃO A ELES!",
                        '<18>{#p/papyrus}{#f/4}UMA BELA VESTIMENTA SÓ TE LEVA ATÉ CERTO NÍVEL.'
                    ]
                    : [
                        '<25>{#p/undyne}{#f/1}* Você acha que essa \"máfia espacial\" pega dos lucros do Sans?',
                        "<18>{#p/papyrus}{#f/0}WOW! ESSA É UMA ÓTIMA PERGUNTA!",
                        '<25>{#p/undyne}{#f/14}* Sério?',
                        "<18>{#p/papyrus}{#f/0}UMA BOA PERGUNTA DA QUAL EU NÃO QUERO A RESPOSTA!"
                    ]
        ),
        a_pacing: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}EU RECEBI UMA MENSAGEM ESTRANHA NA OUTERNET...',
                '<18>{#p/papyrus}{#f/4}SOBRE RATOS- TOUPEIRA, PRESOS EM UM CAMPO DE FORÇA.',
                '<18>{#p/papyrus}{#f/5}VIVENDO VIDAS DE RATO-TOUPEIRA, COMENDO COMIDA...',
                '<18>{#p/papyrus}{#f/4}DESEJANDO UM DIA ALCANÇAR AS ESTRELAS.',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/6}... O QUE ISSO SIGNIFICA!?']
                    : [
                        "<25>{#p/undyne}{#f/8}* Você pensa que isso é estranho?\n* Ha!",
                        '<25>{#p/undyne}{#f/7}* Só espera até você ver as mensagens que EU recebi!',
                        '<18>{#p/papyrus}{#f/4}ERA SOBRE RATO-TOUPEIRAS?',
                        '<25>{#p/undyne}{#f/14}* Não.',
                        '<18>{#p/papyrus}{#f/4}ENVOLVE \"OPORTUNIDADE DE FAZER DINHEIRO?\"',
                        '<25>{#p/undyne}{#f/14}* Não.',
                        '<18>{#p/papyrus}{#f/6}PROMETIA UMA FORMA DE FUGIR DO OUTPOST??',
                        "<25>{#p/undyne}{#f/14}* ... sim.\n* E foi aí que eu bloqueei quem mandava.",
                        '<25>{#p/undyne}{#f/7}* NINGUÉM faz falsas promessas de liberdade e se dá bem com isso!',
                        '<18>{#p/papyrus}{#f/0}ISSO!!',
                        '<18>{#p/papyrus}{#f/5}ESPECIALMENTE QUANDO UMA -REAL- PROMESSA...',
                        '<18>{#p/papyrus}{#f/6}ESTÁ NO TELEFONE COM A GENTE AGORA MESMO!!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/5}ME PERGUNTO SE TAL COLONIA EXISTE.',
                        '<18>{#p/papyrus}{#f/4}O UNIVERSO É FEITO DE INFINIDADES, ENTÃO...',
                        '<18>{#p/papyrus}{#f/9}INFINIDADE DE DIVERSIDADES E COMBINAÇÕES!!'
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/0}AQUI ESTÁ A PROMESSA DE SUA LIBERDADE.",
                        '<18>{#p/papyrus}{#f/6}E TALVEZ A NOSSA TAMBÉM ALGUM DIA!!'
                    ]
        ),
        a_prepuzzle: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}AQUELAS FLORES ESPALHADAS PELA ÁREA...?',
                "<18>{#p/papyrus}{#f/0}OH, ELAS FORAM IDEIA DO ASGORE, NA VERDADE.",
                '<18>{#p/papyrus}{#f/4}SE AQUELE CARA NÃO FOSSE O \"CEO\" DO OUTPOST...',
                '<18>{#p/papyrus}{#f/5}ELE SERIA O \"CJO\" INVÉS.',
                '<18>{#p/papyrus}{#f/5}UM ACRÔNIMO PARA \"CHEFE DE JARDINAGEM OFICIAL.\"',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/17}* Ah é?\n* E quem eu seria?',
                        '<18>{#p/papyrus}{#f/0}CLARO, EU JÁ CHEGUEI COM UMA PRA VOCÊ.',
                        '<18>{#p/papyrus}{#f/4}VOCÊ SERIA A \"CSETPO.\"',
                        '<25>{#p/undyne}{#f/14}* ... e o que significa esse gigante acrônimo?',
                        '<18>{#p/papyrus}{#f/9}A \"CHEFE SOCA E ESMAGA TUDO EM PEDAÇOS OFICIAL!\"',
                        '<25>{#p/undyne}{#f/8}* EU AMEI!!!'
                    ])
            ],
            ['<18>{#p/papyrus}{#f/4}EU TALVEZ SERIA O \"CAO\" POR AQUI...']
        ),
        a_puzzle2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/6}NÃO IMPORTA ONDE VÁ, EU ACABO NO MESMO LUGAR!',
                "<18>{#p/papyrus}{#f/5}PELO MENOS, É ISSO QUE ACONTECE...",
                '<18>{#p/papyrus}{#f/4}TODA VEZ QUE TENTO RESOLVER ESSE QUEBRA-CABEÇA.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/17}* Senhor.\n* Pra quê se importar.',
                        '<18>{#p/papyrus}{#f/6}PORQUÊ!!',
                        '<18>{#p/papyrus}{#f/6}RESOLVER ENIGMAS TEM QUE SER DIVERTIDO!!',
                        "<25>{#p/undyne}{#f/12}* Não da só pra usar magia de voo pra passar por cima?",
                        '<18>{#p/papyrus}{#f/4}MAGIA DE VOAR É SÓ PRA EMERGÊNCIAS.',
                        '<25>{#p/undyne}{#f/1}* Depende da sua definição de \"emergência.\"',
                        '<18>{#p/papyrus}{#f/7}E QUEBRAS-CABEÇAS ESTÃO FORA DESSA DEFINIÇÃO!',
                        "<25>{#p/undyne}{#f/14}* Acho que você vai ter que sofrer, então.",
                        '<18>{#p/papyrus}{#f/7}EU ACHO QUE VOU!!!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/6}NÚMEROS, NÚMEROS PRA TODO LADO!!',
                        '<18>{#p/papyrus}{#f/6}O QUE ISSO SIGNIFICA!?!?'
                    ]
                    : [
                        "<18>{#p/papyrus}{#f/5}VOAR POR CIMA SÓ NÃO SERIA JUSTO.",
                        '<25>{#p/undyne}{#f/11}* E por que você gosta de dificultar sua vida...?',
                        '<18>{#p/papyrus}{#f/9}PORQUE NÃO EXISTE PREMIAÇÃO SEM TRABALHO DURO!',
                        '<25>{#p/undyne}{#f/17}* ... Isso depende da sua definição de \"trabalho.\"'
                    ]
        ),
        a_mettaton2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}AH... TEMPO VERSUS DINHERO.',
                ...(SAVE.data.n.plot < 60
                    ? [
                        '<18>{#p/papyrus}{#f/4}SÓ PRA VOCÊ SABER...',
                        "<18>{#p/papyrus}{#f/5}EU NÃO ESTAREI NO PRÓXIMO EPISODIO.",
                        "<18>{#p/papyrus}{#f/6}... EU FICARIA NERVOSO DEMAIS PERTO DELE."
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/4}METTATON QUERIA QUE EU ESTIVESSE NO EP, MAS...',
                        '<18>{#p/papyrus}{#f/5}APÓS PENSAR UM POUCO, EU CHEGUEI A CONCLUSÃO...',
                        "<18>{#p/papyrus}{#f/6}... EU ESTARIA NERVOSO SENTANDO PERTO DELE."
                    ]),
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/12}* ... Você gosta muito dele, não gosta?",
                        '<18>{#p/papyrus}{#f/4}BEM, ELE É MUITO LEGAL...',
                        "<18>{#p/papyrus}{#f/6}... MAS EU NÃO CHEGUEI A NENHUMA CONCLUSÃO AINDA!",
                        "<25>{#p/undyne}{#f/3}* Isso não vai durar muito.",
                        '<18>{#p/papyrus}{#f/4}HUH?\nVOCÊ ACABOU DE ASSUMIR...',
                        '<18>{#p/papyrus}{#f/7}... NOSSO STATUS DE RELACIONAMENTO!?!?',
                        '<25>{#p/undyne}{#f/14}* Não, obvio que não.',
                        "<25>{#p/undyne}{#f/17}* Eu só acabei de cuspir fatos na sua cara.",
                        '<18>{#p/papyrus}{#f/5}(SUSPIRO...)'
                    ])
            ],
            () =>
                solo()
                    ? SAVE.data.n.plot < 60
                        ? ['<18>{#p/papyrus}{#f/0}FELIZMENTE, TENHO UM SUBSTITUTO ARRANJADO.']
                        : SAVE.data.b.undyne_respecc
                            ? ['<18>{#p/papyrus}{#f/0}FELIZMENTE, UNDYNE ESTAVA LÁ POR MIM.']
                            : ['<18>{#p/papyrus}{#f/0}FELIZMENTE, MEU IRMÃO ESTAVA LÁ POR MIM.']
                    : ['<25>{#p/undyne}{#f/12}* Papyrus está muito ocupado sonhando acordado pra atender.']
        ),
        a_rg2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/6}TOME CUIDADO POR AÍ HUMANO!',
                '<18>{#p/papyrus}{#f/5}OS GUARDAS NESSA ÁREA SAÍRAM DO TREINO A POUCO.',
                "<18>{#p/papyrus}{#f/6}VAI SABER SE ELES NÃO IGNORARAM COMANDOS REAIS!",
                ...(solo()
                    ? ["<18>{#p/papyrus}{#f/0}ÁLIAS, O QUE SERIA UM MEMO REAL?"]
                    : [
                        '<25>{#p/undyne}{#f/16}* Nem me fala...',
                        '<18>{#p/papyrus}{#f/5}ELES IGNORARAM SEUS COMANDOS ULTIMAMENTE?',
                        '<25>{#p/undyne}{#f/14}* Oh, eles seguem os meus tranquilamente.',
                        "<25>{#p/undyne}{#f/10}* São os memos da Alphys que eles ignoram.",
                        "<18>{#p/papyrus}{#f/6}MAS ELA É A CIENTISTA REAL!",
                        "<18>{#p/papyrus}{#f/6}A PESSOA DE MAIOR CONFIANÇA ASSOCIADA AO REI!",
                        "<25>{#p/undyne}{#f/12}* É... era assim que era pra funcionar.",
                        "<25>{#p/undyne}{#f/16}* Mas após a morte do Professor Roman, ninguém está aos pés.",
                        "<26>{#p/undyne}{#f/10}* Maior parte da Guarda Real não leva sua sucessora a sério...",
                        '<25>{#p/undyne}{#f/9}* Isso impacta como os estudantes a veem também.',
                        '<18>{#p/papyrus}{#f/5}OH...',
                        "<25>{#p/undyne}{#f/17}* Eu sei.\n* Isso não é bom.",
                        "<26>{#f/9}* Mas ela tem peso sobre si e ainda tem muito a provar por aí.",
                        '<26>{#f/16}* Então, eu meio que entendo.',
                        "<18>{#p/papyrus}{#f/5}COM ESPERANÇA, ELES A RESPEITARÃO LOGO, LOGO.",
                        '<26>{#p/undyne}{#f/14}* Espero que sim.'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}ME PERGUNTO O QUÃO DIFERENTE É DE UM MEMO NORMAL."]
                    : ['<18>{#p/papyrus}{#f/4}ESPERO QUE ISSO ACONTEÇA MAIS CEDO DO QUE MAIS TARDE.']
        ),
        a_barricade2: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}EU TEMO NÃO TER MUITO O QUE DIZER SOBRE ESSA SALA.",
                '<18>{#p/papyrus}{#f/5}NA VERDADE, A ÚNICA COISA QUE EU TENHO PRA DIZER...',
                '<18>{#p/papyrus}{#f/6}... É QUE EU NÃO TENHO -NADA- PRA DIZER!',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}ENTÃO, EU TENHO ALGO PRA DIZER.']
                    : [
                        '<26>{#p/undyne}{#f/1}* Eu tenho algo pra dizer.',
                        '<18>{#p/papyrus}{#f/6}QUÊ?\nO QUE SERIA?',
                        '<26>{#p/undyne}{#f/14}* Essa sala pode ou não conter barricadas.',
                        "<18>{#p/papyrus}{#f/4}TINHA UMA SALA IGUALZINHA ESSA NO PRIMEIRO PISO.",
                        '<18>{#p/papyrus}{#f/7}FAÇA ALGO ORIGINAL!!',
                        "<26>{#p/undyne}{#f/17}* Eu não sei!",
                        '<18>{#p/papyrus}{#f/5}... ESQUECE...'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}TALVEZ EU TENHA MAIS O QUE DIZER EM OUTRA SITUAÇÃO."]
                    : ["<18>{#p/papyrus}{#f/0}ESSA SALA NÃO DEVE SER TÃO INTERSSANTE."]
        ),
        a_split: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}OLHA, É A SUPER FAMOSA FONTE DO METTATON!",
                '<18>{#p/papyrus}{#f/4}SEI QUE DEMOROU MUITO TEMPO PRA FICAR PRONTA.',
                '<18>{#p/papyrus}{#f/5}INÚMERAS REPETIÇÕES E TRABALHO ÁRDUO...',
                '<18>{#p/papyrus}{#f/6}PARA TER O IDEAL FORMATO RETANGULAR.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/12}* No fim, Mettaton destruiu tudo e fez sozinho.',
                        '<18>{#p/papyrus}{#f/6}ISSO É VERDADE??',
                        '<25>{#p/undyne}{#f/1}* Os primeiros modelos não agradaram o \"paladar forte.\"',
                        '<18>{#p/papyrus}{#f/4}ESPERA, TINHA ALGO SOBRE ISSO NA TV.',
                        '<25>{#p/undyne}{#f/14}* Pois é, eu decidi filmar isso para todo o Outpost ver.',
                        '<25>{#p/undyne}{#f/17}* Ele tinha que mostrar pra todo mundo que era o tal melhor.',
                        '<18>{#p/papiro}{#f/4}BEM, É UMA ESTÁTUA -DELE-, AFINAL...'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}MEU IRMÃO DISSE QUE ISSO NÃO É TOTALMENTE VERDADE."]
                    : [
                        '<18>{#p/papyrus}{#f/5}POR QUE ELE CONTRATOU ALGUÉM PRA COMEÇO DE CONVERSA.',
                        "<18>{#p/papyrus}{#f/4}EU MESMO PODERIA TER FEITO..."
                    ]
        ),
        a_offshoot1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}O SINAL PARECE ESTAR UM POUCO FRACO.',
                "<18>{#p/papyrus}{#f/6}É COMO... INTERFERÊNCIA DE ALGUM TIPO??",
                "<18>{#p/papyrus}{#f/4}TALVEZ SEJA MELHOR LIGAR EM OUTRO LUGAR.",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Ela deve estar na antiga torre de segurança em Aerialis.",
                        "<25>{#p/undyne}{#f/17}* Isso acontece por causa do tipo de metal usado na construção."
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}MINHA MENSAGEM NÃO CHEGOU DA PRIMEIRA VEZ?']
                    : ["<25>{#p/undyne}{#f/14}* Não se preocupe com isso."]
        ),
        a_elevator3: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}NA PRIMEIRA VEZ QUE PASSEI POR ESSA SALA...',
                '<18>{#p/papyrus}{#f/6}FIQUEI IRRITADO POR TER QUE USAR MAIS UM ELEVADOR.',
                '<18>{#p/papyrus}{#f/5}ENTÃO, FIQUEI UM POUCO ALIVIADO...',
                '<18>{#p/papiro}{#f/4}... QUANDO VI A FALTA DE UM OUTDOOR BREGA POR PERTO.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/17}* Então você GOSTA de usar elevadores ou NÃO?',
                        '<18>{#p/papyrus}{#f/6}BEM...',
                        '<18>{#p/papyrus}{#f/5}EU AMO A MÚSICA, MAS USA-LOS É TORTURA.',
                        '<18>{#p/papyrus}{#f/4}MAS EU ENTENDO NA NECESSIDADE DELES.',
                        "<25>{#p/undyne}{#f/1}* Olha, estou feliz que você não vive em uma casa espiral.",
                        '<18>{#p/papyrus}{#f/5}PORQUÊ?',
                        '<25>{#p/undyne}{#f/17}* Lá só da pra andar em elevadores, são muito grandes.',
                        '<18>{#p/papyrus}{#f/6}N-NÃO...!',
                        "<25>{#p/undyne}{#f/7}* Olha, nem acho tão necessários.",
                        "<18>{#p/papyrus}{#f/8}NÃO PODEM SER...!",
                        "<25>{#p/undyne}{#f/8}* E ELES NEM TEM MÚSICA!!!",
                        "<18>{#p/papyrus}{#f/1}É INSONDÁVEL!"
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}SE PELO MENOS HOUVESSE OUTRA FORMA DE ANDAR POR AÍ.',
                        '<18>{#p/papyrus}{#f/0}... EI, ESPERA, PIOR QUE TEM!',
                        '<18>{#p/papyrus}{#f/9}OS PORTAIS LEVITADORES!!!'
                    ]
                    : [
                        '<18>{#p/papyrus}{#f/5}UM ELEVADOR SEM MÚSICA É TIPO...',
                        '<18>{#p/papyrus}{#f/5}UM PRATO DE ESPAGUETE SEM MOLHO MARINARA.',
                        '<18>{#p/papyrus}{#f/4}OU MOLHO VERDE, SE VOCÊ FOR O MEU IRMÃO.',
                        "<18>{#p/papyrus}{#f/4}... E AS PESSOAS DIZEM QUE EU SOU O ESQUISITO."
                    ]
        ),
        a_elevator4: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}O QUE ACONTECE COM O ESQUELETO TOCA ELETRICIDADE?',
                '<19>{#p/papyrus}{#f/4}... OH CERTO.\nELE É ELETROCUTADO.',
                '<18>{#p/papyrus}{#f/6}FOI ISSO QUE ACONTECEU, QUANDO EU VIM AQUI!',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/1}* Parece ser uma historia e tanto que você tem.",
                        '<18>{#p/papyrus}{#f/4}OH, É UMA HISTORIA MESMO, CLARO...',
                        '<18>{#p/papyrus}{#f/5}POREM NÃO UM MUITO BOA.',
                        '<25>{#p/undyne}{#f/14}* O título seria \"Eu não fazia ideia do que tava fazendo?\"',
                        "<18>{#p/papyrus}{#f/7}EI, EU -SEMPRE- SEI O QUE ESTOU FAZENDO!",
                        '<18>{#p/papyrus}{#f/5}É MAIS COMO \"EU NÃO TIVE A ENERGIA PARA IMPEDIR.\"',
                        '<25>{#p/undyne}{#f/17}* Se você foi eletrocutado pelo escudo de segurança...',
                        "<25>{#p/undyne}{#f/17}* Isso não te faria o contrario de SEM ENERGIA?",
                        "<18>{#p/papyrus}{#f/4}VOCÊ TEM UM ÓTIMO PONTO..."
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/6}É UMA LONGA HISTORIA."]
                    : ["<18>{#p/papyrus}{#f/0}TALVEZ ELA NÃO SEJA TÃO RUIM DEPOIS DE TUDO."]
        ),
        a_auditorium: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}MEU IRMÃO FEZ UM SHOW DE COMEDIA AQUI UMA VEZ.',
                '<18>{#p/papyrus}{#f/4}ERA CHAMADO DE...',
                '<18>{#p/papiro}{#f/4}... O CÓCEGAS NAS COSTELAS.',
                "<18>{#p/papyrus}{#f/5}APESAR DO TÍTULO, NÃO FOI UMA COMPLETA FALHA.",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}NA VERDADE, FOI ATÉ MUITO BOM!!']
                    : [
                        "<25>{#p/undyne}{#f/1}* Pra ser honesto, estou surpreso que ele parou.",
                        '<25>{#p/undyne}{#f/16}* Mas acho que foi por sua alta vontade de ser um sentinela.',
                        '<18>{#p/papyrus}{#f/5}É.\nDEVE TER SIDO ISSO.',
                        "<18>{#p/papyrus}{#f/4}NÃO TINHA MAIS NADA ACONTECENDO, NÉ?",
                        '<25>{#p/undyne}{#f/14}* ... que?'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}EU ESTOU TÃO SURPRESO QUANTO VOCÊ."]
                    : ["<18>{#p/papyrus}{#f/0}EXISTEM COISAS QUE EU NÃO DEVERIA MENCIONAR AGORA."]
        ),
        a_aftershow: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}ENTÃO É A AÍ QUE A BRATTY E A CATTY TRABALHAM?',
                "<18>{#p/papyrus}{#f/0}É MAIS LIMPO DO QUE EU IMAGINAVA.",
                "<18>{#p/papyrus}{#f/4}NÃO ERA PRA ELAS SEREM VENDEDORAS DE LIXO...?",
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/5}... BEM, NADA IMPEDE DE SER UM LIXO BEM ORGANIZADO.']
                    : [
                        "<25>{#p/undyne}{#f/14}* Acho que elas são bem protetoras com o lixo que coletam.",
                        '<25>{#p/undyne}{#f/16}* Alphys já me contou que ela saía pra caçar lixo com elas...',
                        "<25>{#p/undyne}{#f/9}* É mais do que um hobby bobo.\n* É um estilo de VIDA.",
                        '<18>{#p/papyrus}{#f/0}ATÉ QUE PARECE DIVERTIDO, SINCERAMENTE.',
                        '<25>{#p/undyne}{#f/1}* Além disso, elas encontram as paradas mais feras lá.',
                        '<18>{#p/papyrus}{#f/9}TIPO AQUELA BONECA MEW MEW MAIS CEDO NA TV!!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/5}LIXO ORGANIZADO...',
                        "<18>{#p/papyrus}{#f/4}DUAS PALAVRAS QUE JAMAIS PENSEI QUE IRIAM JUNTAS."
                    ]
                    : ['<18>{#p/papyrus}{#f/0}ME PERGUNTO SE HUMANOS GOSTARIAM DE CAÇAR LIXO.']
        ),
        a_hub1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}AH... A SALA CENTRAL DO RINGUE!',
                '<18>{#p/papyrus}{#f/4}NO INÍCIO, QUANDO OUVI O TERMO \"SALA DO RINGUE...\"',
                "<18>{#p/papyrus}{#f/5}EU PENSEI QUE ERA UMA SALA PARA FAZER LIGAÇÕES.",
                "<18>{#p/papyrus}{#f/0}CONSIDERANDO O QUE ESTAMOS FAZENDO, PARECE CORRETO!",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* A \"sala ringue,\" huh?',
                        "<26>{#p/undyne}{#f/14}* Se eu não soubesse, diria que você é um poeta!",
                        '<18>{#p/papyrus}{#f/6}... EU, UM POETA!?',
                        "<18>{#p/papyrus}{#f/5}EU DÚVIDO QUE ESSE SERIA UM BOM USO DO MEU TEMPO.",
                        "<25>{#p/undyne}{#f/17}* Você tá brincando, né?\n* Você é natural!!",
                        '<18>{#p/papyrus}{#f/4}SE VOCÊ TÁ DIZENDO...'
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/4}SEM MENCIONAR QUE A RECEPÇÃO É MUITO MELHOR LÁ.']
                    : ['<18>{#p/papyrus}{#f/0}PAPYRUS O POETA.', '<18>{#p/papyrus}{#f/5}BEM, ATÉ QUE TEM UM RINGUE PARA ISSO...']
        ),
        a_dining: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/5}EU NÃO SEI VOCÊ, MAS A COMIDA DESSE LUGAR...",
                '<18>{#p/papiro}{#f/6}... REALMENTE MÓI MINHAS ENGRENAGENS!!',
                "<18>{#p/papyrus}{#f/4}É COMO SE TODOS TIVESSEM ESQUECIDO BOAS COMIDAS.",
                "<18>{#p/papyrus}{#f/7}ONDE ESTÁ MEU ESPAGUETE CHEIO DE SABOR!?",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/14}* Sabe, isso me lembra de...',
                        '<25>{#p/undyne}{#f/1}* Que eu já desejei uma divisão culinária na Guarda Real.',
                        "<25>{#p/undyne}{#f/16}* Nós teríamos restaurante gourmet, comida exclusiva...",
                        '<25>{#p/undyne}{#f/17}* ... e então, Asgore testou minha comida.',
                        '<18>{#p/papyrus}{#f/4}HMM...',
                        "<18>{#p/papyrus}{#f/9}TALVEZ VOCÊ SÓ NÃO COBRIU COM MOLHO O SUFICIENTE!",
                        '<25>{#p/undyne}{#f/3}* Nenhum molho teria salvo a atrocidade que eu fiz.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/6}A ÚLTIMA VEZ QUE TENTEI ENCOMENDAR, ELES...',
                        "<18>{#p/papyrus}{#f/5}... VAMOS SÓ DIZER QUE O CONCEITO ESTAVA ACIMA."
                    ]
                    : ['<18>{#p/papyrus}{#f/4}EU ACHO QUE EU DEVERIA SER O COZINHEIRO.']
        ),
        a_hub2: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}A VIDA É COMO UM TABULEIRO DE XADREZ.',
                '<18>{#p/papyrus}{#f/5}MENOS TODOS OS ERROS...',
                '<18>{#p/papyrus}{#f/5}E A CAPTURA DAS PEÇAS...',
                '<18>{#p/papyrus}{#f/6}E, UH...',
                '<18>{#p/papyrus}{#f/4}NA VERDADE, A VIDA NÃO É NADA COMO XADREZ.',
                '<18>{#p/papyrus}{#f/0}MAS EXISTE UMA COISA EM COMUM.',
                '<18>{#p/papyrus}{#f/9}QUE É VOCÊ NUNCA SABER O QUE VAI ACONTECER!!',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* Então, como uma caixa de seiva de árvore, então.',
                        '<18>{#p/papyrus}{#f/0}É, TIPO ISSO!',
                        "<18>{#p/papyrus}{#f/4}EI, NÃO ERA PRA SER UMA CAIXA DE CHOCOLATES?",
                        '<25>{#p/undyne}{#f/14}* Essa seria a expressão humana.'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/4}TALVEZ SEJA MAIS COMO UMA CAIXA DE CHOCOLATES."]
                    : ['<18>{#p/papyrus}{#f/0}CHOCOLATE E SEIVA DE ÁRVORE TÊM GOSTO PARECIDO.']
        ),
        a_lookout: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/5}COM O TEMPO, NÓS IREMOS EXPLORAR AS ESTRELAS.',
                '<18>{#p/papyrus}{#f/5}NÓS IREMOS NOS AVENTURAR NO DESCONHECIDO...',
                '<18>{#p/papyrus}{#f/5}EJETANDO-NOS PARA LONGE DESTA VELHA PRISÃO.',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/17}* Você não me disse que tava planejando uma fuga da prisão!",
                        "<18>{#p/papyrus}{#f/5}NÃO SE PREOCUPA, É SÓ UMA ALEGORIA PARA LIBERDADE.",
                        '<18>{#p/papyrus}{#f/4}UMA -REAL- FUGA SERIA MUITO SUSPEITA.',
                        '<25>{#p/undyne}{#f/16}* Claro, claro...',
                        '<18>{#p/papyrus}{#f/5}ALIAS, SE EU QUISESSE FAZER UMA PROPRIAMENTE...',
                        "<18>{#p/papyrus}{#f/6}EU TERIA UM PLANO DE EMERGÊNCIA PRA TUDO!",
                        "<25>{#p/undyne}{#f/12}* SHH, seria uma missão difícil."
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/4}VAMOS SÓ ESPERAR, ALCANÇAR AS ESTRELAS...",
                        "<18>NÃO ENCONTRAMOS NENHUM DESSES IMPOSTORES DE RATOS-TOUPEIRA."
                    ]
                    : ['<18>{#p/papyrus}{#f/5}ME DESCULPE.', "<18>{#p/papyrus}{#f/4}EU NÃO QUERIA DESABAFAR."]
        ),
        a_hub3: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/6}ISSO NÃO É ONDE AS PESSOAS TRANQUILAS FICAM?",
                '<18>{#p/papyrus}{#f/5}EU ME SINTO MEIO MAL POR ELAS...',
                '<18>{#p/papyrus}{#f/9}ME FAZ QUERER COMPRAR UMA GELADEIRA PRA ELES!',
                "<18>{#p/papyrus}{#f/0}ASSIM, SEMPRE TERÁ UM LUGAR FRIO POR PERTO.",
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/1}* Falando de por perto...',
                        "<25>{#p/undyne}{#f/8}* Nós estamos bem na próxima sala!!",
                        '<18>{#p/papyrus}{#f/9}CORRETO!!\nBEM AQUI EM BAIXO!!',
                        '<25>{#p/undyne}{#f/17}* Do lado, não em baixo.',
                        "<18>{#p/papyrus}{#f/6}... NO PLANO DO PISO ISSO SERIA EM BAIXO!!",
                        '<25>{#p/undyne}{#f/14}* É como é que o humano vai saber? Ele nunca viu de cima.'
                    ])
            ],
            () =>
                solo()
                    ? ["<18>{#p/papyrus}{#f/0}AH TECNOLOGIA NÃO É MARAVILHOSA?"]
                    : [
                        '<18>{#p/papyrus}{#f/6}O QUÊ VOCÊ TÁ ESPERANDO!!!\nCHEGA AQUI EM BAIXO!!',
                        '<25>{#p/undyne}{#f/7}* Ele quis dizer do LADO!!'
                    ]
        ),
        a_plaza: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/0}AÍ É A LOJA DO BURGIE.",
                '<18>{#p/papyrus}{#f/6}ELE VENDE BASICAMENTE FAST-FOOD...',
                '<18>{#p/papyrus}{#f/5}MAS PARECE SER UM CARA MUITO LEGAL.',
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/12}* Esse é definitivamente um jeito de colocar isso.",
                        '<18>{#p/papyrus}{#f/5}ADMITO, PODE SER MEIO ESTRESSANTE CONVERSAR COM ELE.',
                        "<18>{#p/papyrus}{#f/6}POREM NÃO É CULPA DELE!!",
                        "<18>{#p/papyrus}{#f/4}JÁ QUE... ISSO É CULPA DO METTATON.",
                        "<18>{#p/papyrus}{#f/9}MAS NÃO TEMAS!\nIREI CONFRONTÁ-LO MAIS TARDE SOBRE!"
                    ])
            ],
            () =>
                solo()
                    ? ['<18>{#p/papyrus}{#f/6}ASSIM QUE VOCÊ GANHAR O RESPEITO DELE, CLARO.']
                    : ['<18>{#p/papyrus}{#f/4}AQUELE ROBÔ E EU... TEMOS MUITO A DISCUTIR.']
        ),
        a_elevator5: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/4}ESTE \"REC CENTER\" É BEM RECREACIONAL...',
                '<18>{#p/papyrus}{#f/5}... EM MUITAS FORMAS.',
                "<18>{#p/papyrus}{#f/6}O QUE HÁ DE TÃO INCRÍVEL NAS FLORES DESEJOS?",
                '<18>{#p/papyrus}{#f/4}A AURA DELAS FAZ SEU DESEJO SE TORNAR REAL?',
                ...(solo()
                    ? ['<18>{#p/papyrus}{#f/0}HMM... TALVEZ EU DEVESSE TENTAR ALGUMA HORA.']
                    : [
                        "<25>{#p/undyne}{#f/14}* Eu não acho que você iria gostar, Papyrus.",
                        "<25>{#p/undyne}{#f/17}* Não é seu estilo.",
                        "<18>{#p/papyrus}{#f/5}É, ACHO QUE VOCÊ TÁ CERTA.",
                        '<25>{#p/undyne}{#f/14}* Claro que estou.',
                        '<18>{#p/papyrus}{#f/9}AINDA ASSIM, NÃO MACHUCA TENTAR!!',
                        '<25>{#p/undyne}{#f/17}* ...'
                    ])
            ],
            () => [
                '<18>{#p/papyrus}{#f/0}MAS É MELHOR NÃO FAZER ISSO NO REC CENTER.',
                '<18>{#p/papyrus}{#f/4}FALA SOBRE SER UMA NUCIÊNCIA.',
                ...(solo() ? [] : ['<25>{#p/undyne}{#f/12}* Pfft, sei...'])
            ]
        ),
        a_hub4: pager.create(
            0,
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/0}ENTÃO TEM MUITO PRA FAZER AÍ EM CIMA, HUH?",
                        '<18>{#p/papyrus}{#f/9}PARECE UM ÓTIMO LUGAR PRA SAIR!!',
                        "<18>{#p/papyrus}{#f/0}TEREI QUE VISITAR EM ALGUM MOMENTO.",
                        "<18>{#p/papyrus}{#f/4}EU PREFIRO ISSO A FICAR NA FRENTE DA CASA DA UNDYNE."
                    ]
                    : ["<25>{#p/undyne}{#f/8}* Quer conversar?\n* Estamos bem aqui, pirralha!"],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/4}TALVEZ, APÓS SAIRMOS COM ELA...',
                        '<18>{#p/papyrus}{#f/0}PODERIAMOS NOS REUNIR AÍ JUNTOS!'
                    ]
                    : ["<25>{#p/undyne}{#f/8}* Quer conversar?\n* Estamos bem aqui, pirralha!"]
        ),
        a_sleeping1: pager.create(
            0,
            () => [
                '<18>{#p/papyrus}{#f/0}OUVI DIZER QUE ESSE HOTEL TEM DIMENSÕES EXTRAS.',
                '<18>{#p/papyrus}{#f/4}DIMENSÕES...\nPISOS...',
                '<18>{#p/papyrus}{#f/5}SERÁ SE ELES NOS DÃO COBERTORES EXTRAS PRA DORMIR?',
                '<18>{#p/papyrus}{#f/0}PERGUNTANDO PRA UM AMIGO, CLARO.',
                ...(solo()
                    ? []
                    : [
                        '<25>{#p/undyne}{#f/17}* Óbvio, porque VOCÊ fica acordado o tempo todo!',
                        "<18>{#p/papyrus}{#f/0}EXATAMENTE!\nNÃO POSSO PERDER MEU TEMPO DORMINDO.",
                        '<25>{#p/undyne}{#f/14}* Que tal cochilando?',
                        '<18>{#p/papyrus}{#f/6}COCHILANDO???',
                        "<18>{#p/papyrus}{#f/4}... ESSA É UMA DESCULPA DO MEU IRMÃO PRA TIRAR SONECAS.",
                        '<25>{#p/undyne}{#f/17}* Óbvio!!'
                    ])
            ],
            () =>
                solo()
                    ? [
                        "<18>{#p/papyrus}{#f/0}OH, EU?\nEU NÃO TIRO COCHILOS.",
                        '<18>{#p/papyrus}{#f/4}EU SÓ FECHO MEUS OLHOS POR UM TEMPO.'
                    ]
                    : ["<18>{#p/papyrus}{#f/4}É UM MILAGRE QUE ELE SAIA DA CAMA, SINCERAMENTE."]
        ),
        a_hub5: pager.create(
            0,
            () => [
                "<18>{#p/papyrus}{#f/6}SE VOCÊ ESTÁ INDO PARA O CORE, EU...",
                "<18>{#p/papyrus}{#f/5}NÃO SEREI CAPAZ DE TE LIGAR.",
                "<18>{#p/papyrus}{#f/4}ENTRETANTO, SE VOCÊ RETORNAR...",
                "<18>{#p/papyrus}{#f/0}... NÃO A MOTIVOS PARA SE PREOCUPAR!!",
                ...(solo()
                    ? []
                    : [
                        "<25>{#p/undyne}{#f/14}* Não é como se fossemos a algum lugar.",
                        '<18>{#p/papyrus}{#f/6}NÃO MESMO!!',
                        '<18>{#p/papyrus}{#f/5}MESMO ASSIM, EM ALGUM MOMENTOS IREMOS SAIR.',
                        "<25>{#p/undyne}{#f/16}* Quer dizer, é verdade, mas...",
                        '<25>{#p/undyne}{#f/17}* Agora não é hora de se preocupar com isso!',
                        '<18>{#p/papyrus}{#f/0}EXATAMENTE.'
                    ])
            ],
            () =>
                solo()
                    ? [
                        '<18>{#p/papyrus}{#f/6}ENTÃO VOCÊ VEM OU VAI?',
                        "<18>{#p/papyrus}{#f/5}É MEIO DIFÍCIL SABER AS DIREÇÕES POR AQUI."
                    ]
                    : ['<18>{#p/papyrus}{#f/6}PARE DE SE PREOCUPAR!!']
        )
    },

    s_save_starton: {
        s_crossroads: {
            name: 'Starton - Zona de aterrissagem',
            text: () =>
                SAVE.data.n.plot < 29
                    ? world.edgy
                        ? ['<32>{#p/human}* (Esqueletos faltando te enchem de determinação.)']
                        : ["<32>{#p/human}* (Os esquemas dos irmãos esqueleto te enchem de determinação.)"]
                    : papreal() || world.runaway
                        ? ['<32>{#p/human}* (A caixa é tão solitária, isso enche de determinação de qualquer maneira.)']
                        : ['<32>{#p/human}* (A caixa pode ficar tranquila agora. Isso, te enche de determinação.)']
        },
        s_pacing: {
            name: 'Starton - Rua Da Pedra Da Lua',
            text: () =>
                world.runaway || epilogueOverride(world.population < 6) || world.genocide || roomKills().s_pacing > 1
                    ? SAVE.data.n.plot < 29
                        ? ['<32>{#p/human}* (A luz das estrelas diminui.)\n* (De alguma forma, isso te enche de determinação.)']
                        : ['<32>{#p/human}* (A luz das estrelas se apagou.)\n* (De fato, isso te enche de determinação.)']
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Os argumentos frívolos que antes existiam nesta sala cessaram.)',
                            '<32>* (Isto te enche de determinação.)'
                        ]
                        : [
                            '<32>{#p/human}* (Os comerciantes de rochas lunares brigam fervorosamente.)',
                            '<32>* (Isto te enche de determinação.)'
                        ]
        },
        s_spaghetti: {
            name: 'Starton - Junção do espaguete',
            text: () =>
                [
                    ['<32>{#p/human}* (Um prato de espaguete desafiando as leis da física o enche de determinação.)'],
                    [
                        '<32>{#p/human}* (O espaguete não desafia mais as leis da física.)',
                        '<32>{#p/human}* (Isso te enche de determinação.)'
                    ],
                    ['<32>{#p/human}* (O espaguete não está mais.)', '<32>{#p/human}* (Isso te enche de determinação.)']
                ][trueSpaghettiState()]
        },
        s_town1: {
            name: 'Starton - Cidade',
            text: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (A cidade pode estar abandonada, mas sua fofura continua.)',
                        '<32>{#p/human}* (Isso te enche de determinação.)'
                    ]
                    : papreal() || world.runaway
                        ? ['<32>{#p/human}* (Uma sombra paira sobre a cidade, enchendo-o de determinação.)']
                        : ['<32>{#p/human}* (Está pequena e linda cidade te enche de determinação.)']
        }
    }
};


// END-TRANSLATE
