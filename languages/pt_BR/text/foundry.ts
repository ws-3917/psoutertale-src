import { asrielinter, helmetdyne, helmetdyneAttack } from '../../../code/common/api';
import {
    armorprice,
    badSpider,
    dogecon,
    dogex,
    geno,
    ghostpartyCondition,
    respecc,
    startonATE,
    temgone
} from '../../../code/foundry/extras';
import { game, rng } from '../../../code/systems/core';
import {
    antiAteThreshold,
    battler,
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

// START-TRANSLATE

export default {
    a_foundry: {
        locketseller: ['<32>{#p/basic}* ...', "<32>{#p/basic}* Eu vou pretender que você não vendeu o que eu vi que você vendeu."],
        noequip: ['<32>{#p/human}* (Você decide não equipar.)'],
        darktoriel1: [
            "<32>{#p/human}* (Você segura a mão da Toriel.)",
            '<25>{#p/toriel}{#f/2}* oh meu senhor...!\n* F-frisk, é você?',
            "<25>{#f/1}* Está meio difícil de enxergar aqui."
        ],
        darktoriel2: [
            '<25>{#p/toriel}{#f/9}* Eu peço desculpas. Você provavelmente procurou por mim.',
            '<25>{#f/9}* Se você tentou me ligar, eu desliguei meu telefone.',
            '<25>{#f/13}* ...',
            '<25>{#f/13}* Me desculpe por tudo que eu fiz, pequeno.',
            '<25>{#f/13}* Mesmo se você me perdoar, será difícil de aceitar.',
            '<25>{#f/9}* Eu estou apenas começando a aprender com o meu passado.',
            '<25>{#f/10}* ...',
            '<25>{#f/10}* Eu suponho que seja muito legal te ver aqui.'
        ],
        darktoriel3: [
            '<25>{#p/toriel}{#f/5}* ... huh?\n* Você queria me ligar... Sans?',
            '<25>{#f/1}* Deixa eu colocar pra funcionar...'
        ],
        darktoriel4a: [
            '<32>{#s/phone}{#p/event}* Discando...',
            '<25>{#p/toriel}{#f/3}* ... ah, certo.\n* Meu celular não funciona tão bem aqui.'
        ],
        darktoriel4b: [
            '<25>{#f/4}* Eu vou ter que ir lá e falar com ele.',
            '<25>{#f/5}* Er... eu vou fazer então.\n* Mas não agora.',
            '<25>{#f/5}* ...'
        ],
        darktoriel5a: [
            '<25>{#p/toriel}{#f/5}* ... huh?\n* Você tem algo pra me dizer?',
            '<32>{#p/human}* (Você repete o conselho dado por Toriel para você no Arquivo Seis.)',
            '<25>{#p/toriel}{#f/2}* ...',
            '<25>{#f/1}* Essas palavras...',
            '<25>{#f/1}* Como você já ouviu elas...?',
            '<25>{#f/0}* Já faz quase um século que eu falei estás palavras.',
            '<25>{#f/5}* ...',
            '<25>{#f/1}* Bem...\n* Eu vou manter o que você disse em mente.'
        ],
        darktoriel5b: ['<25>{#p/toriel}{#f/1}* Bem, acho que agora é um bom momento para você ir.'],
        darktoriel6: [
            '<25>{#f/5}* Eu sei que o ônibus vai sair logo, e eu não vou deixar de ir.',
            '<25>{#f/9}* Por agora, entretanto, eu devo ficar com meus pensamentos.',
            '<25>{#f/1}* ... obrigado por ser bom, Frisk.\n* Você foi o melhor.'
        ],
        darktoriel7: () =>
            SAVE.data.b.c_state_secret1_used
                ? [
                    '<25>{#p/toriel}{#f/10}* Não se preocupe, Frisk.\n* Eu vou ficar bem.',
                    '<25>{#f/1}* Eu te vejo na nave espacial.\n* Tudo bem?'
                ]
                : [
                    '<25>{#p/toriel}{#f/5}* Frisk, me dê um tempo para processar tudo.',
                    '<25>{#f/1}* Eu te vejo na nave espacial.\n* Tudo bem?'
                ],
        ghostpartymusic1: [
            '<32>{#p/finalghost}* Ah, o clássico.\n* Não apenas \"um\" spooktune, mas \"o\" spooktune',
            '<32>* O original, como eu posso dizer.'
        ],
        ghostpartymusic2: [
            '<32>{#p/mettaton}{#e/mettaton/9}* AGORA ISSO SIM É ALGO DO QUAL EU POSSO SENTIR A \"VIBE\", COMO BLOOKY DIRIA.',
            "<32>{#e/mettaton/36}* É BASICAMENTE O MELHOR MIX ELEMENTOS...",
            '<32>{#e/mettaton/8}* E O ÁPICE?',
            '<32>{#e/mettaton/9}* NÃO É O QUE EU TERIA ESCOLHIDO, MAS DECENTE MESMO ASSIM.'
        ],
        ghostpartymusic3: [
            '<32>{#p/basic}{#e/maddummy/1}* Eu sempre achei esse aqui um pouco lento, sabe?',
            '<32>* Tipo... super... duper... devagar.',
            "<32>{#e/maddummy/0}* Mas isso só sou eu."
        ],
        evac: ['<32>{#p/human}* (Você sente a presença dos monstros próximos diminuindo.)'],
        shopclosed: ['<32>{#p/human}* (Porém não havia mais nada para ser feito aqui.)'],
        starKILLER: ['<32>{#p/basic}{#npc/a}* A grama está morrendo mais rápido do que eu pensava.'],
        quicksolve3: () =>
            postSIGMA()
                ? ["<32>{#p/basic}* Está fora de serviço."]
                : SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O terminal parece estar desligado.)']
                    : [
                        '<32>{#p/human}* (Você ativou o terminal.)',
                        '<32>{#p/basic}* \"Caminho desbloqueado!\"\n* \"Nenhuma ação adicional é necessária.\"'
                    ],
        quicksolve4: ['<32>{#p/human}* (Você ativou o terminal.)', '<32>{#p/basic}* \"Digite o código para substituir!\"'],
        quicksolve5: [
            '<32>{#p/basic}* ...',
            '<32>{#p/basic}* Se ao menos você soubesse um quebra-cabeça que pudesse te dizer qual o código.'
        ],
        quicksolve6: () => ['<32>{#p/basic}* ...', choicer.create('* (Colocar o código?)', 'Sim', 'Não')],
        quicksolve7: ['<32>{#p/human}* (Você decide não colocar.)'],
        quicksolve8: ["<32>{#p/basic}* Bem, isso foi piedade."],
        escape: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/alphys}* E-ei... você tá aí?',
            '<32>* Eu sei que você quer continuar indo em frente, mas...',
            "<32>* Se você fizer, ela... vai tentar te matar...",
            "<32>* Eu tentei impedi-la... M-mas ela não me escuta!",
            "<32>* Agora ela...",
            '<32>* ...',
            "<32>* Mas, uh, tudo bem!\n* Porque...",
            "<32>* P-porque eu sei um jeito de passar por ela!",
            "<32>* Eu sei que é meio que...\n* Inconveniente...",
            "<32>* Mas é a única forma de você sair vivo...!",
            '<32>* Confia em mim... tá?',
            '<32>* Volta para trás a-até antes dos pilares.',
            "<32>* Se você não, eu...",
            '<32>* eu...',
            "<32>* Eu... vou te deixar ir.",
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        artifact1: ['<32>{#p/human}* (Você pegou o Artefato Lendário.)'],
        artifact2: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"],
        artifact3: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A inscrição descreve um enigma de marfins e melodias.)']
                : [
                    '<32>{#p/basic}* (A uma inscrição marcada no pedestal.)',
                    '<32>* \"Duas metades, divididas pelos marfins.\"',
                    '<32>* \"Se o príncipe está a sua esquerda, quem estará a sua direita?\"',
                    '<32>* \"E qual é sua melodia?\"'
                ],
        tome0: () => ['<32>{#p/basic}* O tomo está firmemente preso ao pedestal.'],
        tome1: () => ['<32>{#p/human}* (Você adquiriu A Epifania.)'],
        tome2: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"],
        tome3: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A escritura fala sobre paz e boas intenções.)']
                : [
                    '<32>{#p/basic}* A uma inspiração gravada no pedestal.',
                    '<32>* \"Aqueles que são dignos, aqueles que são bons.\"',
                    '<32>* \"Aqueles que desejam o bem, no coração e na mente.',
                    '<32>* \"Que a paz siga você em sua jornada para casa.\"'
                ],
        tome4: () => [
            choicer.create(
                '* (O que você pretende fazer?)',
                'Poupar',
                world.meanie
                    ? 'Bullinar'
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 'Flertar'
                        : SAVE.data.b.oops
                            ? 'Ser Amigo'
                            : 'Abraçar',
                'Matar',
                'Tomar Ouro'
            )
        ],
        tome5a: '<32>{#p/human}* (Você foca sua mente na intenção de poupar.)',
        tome5b: () =>
            world.meanie
                ? '<32>{#p/human}* (Você foca sua mente na intenção de bullinar.)'
                : SAVE.data.b.oops && world.flirt > 9
                    ? '<32>{#p/human}* (Você foca sua mente na intenção de flertar.)'
                    : SAVE.data.b.oops
                        ? '<32>{#p/human}* (Você foca sua mente na intenção de ser amigo.)'
                        : '<32>{#p/human}* (Você foca sua mente na intenção de abraçar.)',
        tome5c: '<32>{#p/human}* (Você foca sua mente na intenção de matar.)',
        tome5d: '<32>{#p/human}* (Você foca sua mente na intenção de tomar ouro.)',
        tome5e: '<32>{#p/basic}* De repente...!',
        tome5f: '\n* (Nada acontece.)',
        astrofood0: () => [
            "<32>{#p/human}* (Você não sabe o que tem na caixa...)",
            choicer.create('* (Pegar alguma coisa?)', 'Sim', 'Não')
        ],
        astrofood1: () =>
            [
                [
                    '<32>{#p/basic}* A três porções de Tofu Espacial na caixa.',
                    choicer.create('* (Pegar um?)', 'Sim', 'Não')
                ],
                [
                    '<32>{#p/basic}* A duas porções de Tofu Espacial na caixa.',
                    choicer.create('* (Pegar um?)', 'Sim', 'Não')
                ],
                [
                    '<32>{#p/basic}* A uma porção restante de Tofu Espacial na caixa.',
                    choicer.create('* (Pegar?)', 'Sim', 'Não')
                ]
            ][SAVE.data.n.state_foundry_astrofood],
        astrofood2: ['<32>{#p/human}* (Você pegou o Tofu Espacial.)'],
        astrofood3: ["<32>{#p/human}* (Você está carregando demais.)"],
        astrofood4: () => ['<32>{#p/human}* (Você decide não pegar nada.)'],
        astrofood5: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Mas não tinha nada dentro restando.)"]
                : ['<32>{#p/basic}* A caixa está vazia.'],
        bird1: () => [
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* Este pequeno pássaro deseja te carregar através do abismo.']),
            choicer.create("* (Aceitar a oferta do pássaro?)", 'Sim', 'Não')
        ],
        blookdate1: () =>
            world.sad_ghost || world.population === 0
                ? [
                    '<32>{#p/napstablook}* oh...\n* olá...',
                    "<32>* desculpa, eu...\n* não estava esperando você me seguir para cá.",
                    '<32>* uh...\n* sinta-se em casa...?'
                ]
                : [
                    '<32>{#p/napstablook}* oh...\n* você realmente veio...',
                    "<32>* desculpa, eu...\n* não imaginei.",
                    "<32>* não é muito, mas sinta-se em casa."
                ],
        blookdate2: () => [
            ...(world.sad_ghost || world.population === 0
                ? ['<32>{#p/napstablook}* oh... você quer comer...', '<32>* vamos ver o que eu tenho...']
                : SAVE.data.b.f_state_ghostsleep
                    ? ['<32>{#p/napstablook}* certo, então...', "<32>* deixe-me ver o que tem na geladeira"]
                    : ['<32>{#p/napstablook}* você está com fome?', '<32>* eu acho que tem algo na geladeira...'])
        ],
        blookdate2x: pager.create(
            0,
            () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (Você olha na geladeira.)\n* (Mas você não vê nada! Talvez seja comida fantasma.)"
                    ]
                    : [
                        '<32>{#p/human}* (Você olha na geladeira.)',
                        "<32>{#p/basic}* É difícil ver o que tem dentro.",
                        ...(ghostpartyCondition()
                            ? [
                                "<32>{#p/mettaton}{#e/mettaton/8}* NÃO DEVE TER NADA ALÉM DE COMIDA FANTASMA AÍ, QUERIDO.",
                                "<32>{#p/mettaton}{#e/mettaton/9}* SE VOCÊ TENTAR COMER, VAI SÓ PASSAR PELO SEU CORPO."
                            ]
                            : [])
                    ],
            () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (Você olha na geladeira.)\n* (Mas você não vê nada! Talvez seja comida fantasma.)"
                    ]
                    : [
                        '<32>{#p/human}* (Você olha na geladeira.)',
                        "<32>{#p/basic}* É difícil ver o que tem dentro."
                    ]
        ),
        blookdate3: () => [
            "<32>{#p/napstablook}* é um sanduíche fantasma...",
            '<32>* você quer tentar...',
            choicer.create('* (Dar uma mordida?)', 'Sim', 'Não')
        ],
        blookdate4a: [
            '<32>{#p/human}* (Você tenta morder o sanduíche.)',
            '<32>{#p/human}* (Ele passa pelo seu corpo.)',
            '<32>{#p/napstablook}* oh...',
            '<32>* esquece...'
        ],
        blookdate4b: ['<32>{#p/napstablook}* oh...........'],
        blookdate5: () => [
            '<32>{#p/napstablook}* após uma boa refeição, eu gosto de me deixar no chão e me sentir igual lixo...',
            "<32>* é uma tradição de família...",
            '<32>* você quer...\n* ... se juntar a mim...?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        blookdate6a: ['<32>{#p/napstablook}* certo...\n* me segue...'],
        blookdate6b: ['<32>{#p/napstablook}* oh......................', "<32>* eu vou lá pra fora, então"],
        blookdate7: [
            "<32>{#p/napstablook}* lá vamos nós...\n* fique aí com tanto que você não se mova.",
            '<32>* então...\n* apenas se mova quando quiser parar, eu acho.'
        ],
        blookdate8: ['<32>{#p/napstablook}* bem, isso foi legal...', '<32>* obrigado...'],
        blookdate8x: ['<32>{#p/napstablook}* bem, isso foi rápido...', '<32>* obrigado por tentar......'],
        blookdate8y: ['<32>{#p/napstablook}* bem, foi isso', '<32>* ............'],
        blookdate9: [
            "<32>{#p/napstablook}* eu vou estar lá fora...\n* Sinta-se livre para juntar-se a mim...\n* ou não...",
            "<32>* vai de você..."
        ],
        blookmusic0: ["<32>{#p/basic}* Está fora de serviço."],
        blookmusic1: () => [
            SAVE.data.b.svr
                ? '<32>{#p/human}* (você olha o sistema de música.)'
                : '<32>{#p/basic}* Não tem nenhuma música para tocar.',
            choicer.create('* (Tocar música?)', 'Spooktune', 'Spookwave', 'Spookwaltz', 'Cancelar')
        ],
        blookmusic1y: ['<32>{*}{#p/human}* (Você vira o toca disco...){^40}{%}'],
        blookmusic2: () => [
            SAVE.data.b.svr
                ? '<32>{#p/human}* (Parece que tem um som tocando agora.)'
                : [
                    '<32>{#p/basic}* Tocando agora \"Spooktune\"',
                    '<32>{#p/basic}* Tocando agora \"Spookwave\"',
                    '<32>{#p/basic}* Tocando agora \"Spookwaltz\"'
                ][SAVE.data.n.state_foundry_blookmusic - 1],
            choicer.create('* (Parar de tocar?)', 'Sim', 'Não')
        ],
        blookmusic3a: [
            '<32>{#p/napstablook}* oh...\n* o clássico spooktune...',
            "<32>* não se fazem músicas assim hoje em dia..."
        ],
        blookmusic3b: ['<32>{#p/napstablook}* irmão, essa ambientação...', "<32>* todo meu corpo fica bem amedrontado"],
        blookmusic3c: [
            "<32>{#p/napstablook}* está é bem lenta...",
            "<32>* mas assim que você entra no ritmo, se torna muito legal"
        ],
        blookmusic3d: [
            '<32>{#p/napstablook}* ei...\n* você realmente gosta de ouvir essa playlist antiga, huh',
            "<32>* quer dizer......\n* eu já fiz coisas melhores.....",
            '<32>* mas, eu agradeço por apreciar meu trabalho antigo',
            '<32>* então... valeuzão, heh'
        ],
        blooksnail1: pager.create(
            0,
            () => [
                "<32>{#p/napstablook}* quer jogar um jogo?\n* se chama electrosnail.",
                '<32>* as lesmas vão correr, e se a lesma amarela ganhar, você ganha.',
                "<32>* é 10G pra jogar.",
                choicer.create('* (Apostar uma corrida?)', 'Sim', 'Não')
            ],
            () => ['<32>{#p/napstablook}* você trocou de ideia?', choicer.create('* (Apostar uma corrida?)', 'Sim', 'Não')]
        ),
        blooksnail1i: () => [
            '<32>{#p/napstablook}* você quer jogar novamente?',
            choicer.create('* (Apostar uma corrida?)', 'Sim', 'Não')
        ],
        blooksnail2a: [
            "<32>{#p/napstablook}* um...\n* você não tem o dinheiro suficiente......",
            "<32>* n-não, você ainda pode jogar, fica tranquilo em relação a isso..."
        ],
        blooksnail2b: ['<32>{#p/napstablook}* oh...........'],
        blooksnail2b0: ['<32>{#p/napstablook}* beleza...........'],
        blooksnail3: ['<32>{#p/napstablook}* okay...\n* pressione [z] repetidamente para encorajar sua lesma.', '<32>* pronto?'],
        blooksnail3i: ['<32>{#p/napstablook}* okay...\n* Lembre-se, você sempre pode encorajar sua lesma.', '<32>* pronto?'],
        blooksnail4a: [
            '<32>{#p/napstablook}* você ganhou... parabéns.',
            '<32>* espero que o ganho seja o suficiente...',
            '<32>{#s/equip}{#p/human}* (Você ganhou 20G.)'
        ],
        blooksnail4b: [
            '<32>{#p/napstablook}* sua lesma perdeu por pouco.',
            '<32>* espera...\n* A lesma está sob a falsa crença de que venceu...',
            '<32>* ah não... a lesma vai ficar triste...',
            "<32>* aqui, eu só vou te dar o dinheiro...\n* aja como se tivesse vencido...",
            '<32>{#s/equip}{#p/human}* (Você ganhou 40G.)'
        ],
        blooksnail4c: [
            '<32>{#p/napstablook}* oh...........\n* vocês dois tentaram seu melhor...',
            '<32>* a lesma parecia desencorajada...',
            "<32>* eu acho que o melhor dela não foi o suficiente...",
            '<32>* oh...........'
        ],
        blooksnail4d: [
            '<32>{#p/napstablook}* oh...........\n* parece que você encorajou a lesma demais...',
            '<32>* toda aquela pressão para vencer...\n* entrou na mente dela...',
            '<32>* oh...........'
        ],
        blooksnail4e: [
            '<32>{#p/napstablook}* oh...........\n* parece que você encorajou a lesma demais...',
            "<32>* ela nem quer olhar pra você...",
            '<32>* oh...........'
        ],
        blooksnail4f: [
            '<32>{#p/napstablook}* oh...........\n* parece que você encorajou a lesma para caramba...',
            "<32>* agora ela... se foi...",
            '<32>* oh...........'
        ],
        blooksnailX: {
            a: '3...',
            b: '2...',
            c: '1...',
            d: 'VALENDO!',
            e: 'FIM DA CORRIDA'
        },
        blooksorry1: () => [
            '<32>{#p/napstablook}* ...?',
            "<32>* você...\n* você...",
            '<32>* ... tem certeza?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        blooksorry2: () => [
            '<32>{#p/napstablook}* eu...',
            "<32>* eu nunca pensei que você...",
            '<32>* ... hmmm...',
            '<32>* ... você tem total certeza?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        blooksorry3: [
            '<32>{#p/napstablook}* você...',
            "<32>* você realmente quer dizer isso, não é?",
            '<32>* ...\n* heh...',
            '<32>* okay...',
            "<32>* eu vou tentar esquecer o que você fez antes..."
        ],
        blooksorryX: ['<32>{#p/napstablook}* oh...........\n* ...........\n* ...........'],
        blooksorryY: ['<32>{#p/napstablook}* ...'],
        blooktouch1: () =>
            world.sad_ghost
                ? [
                    '<32>{#p/napstablook}* o que você quer......',
                    choicer.create('* (O que você acha?)', 'Desculpa', 'Nada')
                ]
                : [
                    '<32>{#p/napstablook}* ah, você precisa de algo?',
                    choicer.create('* (O que você acha?)', 'Abraçar', 'Dormir', 'Música', 'Nada')
                ],
        blooktouch2a1: [
            '<32>{#p/napstablook}* você... quer...\n* Hmmm...',
            '<32>* você quer que eu te dê um abraço?',
            "<32>* bem...\n* se isso vai te fazer feliz...",
            '<32>{#p/basic}* Napstablook tenta te dar um grande abraço.',
            '<32>* ele te atravessa.',
            '<32>{#p/napstablook}* oh...........',
            "<32>* eu acho...........\n* que não consigo........."
        ],
        blooktouch2a2: [
            "<32>{#p/napstablook}* você realmente precisa de um abraço, não é...",
            "<32>* me desculpa...\n* eu queria conseguir..."
        ],
        blooktouch2b1: [
            '<32>{#p/napstablook}* você precisa de um lugar para dormir?',
            "<32>* hmmm... eu não tenho uma cama aqui...",
            '<32>* hmm...',
            "<32>* vai lá na geladeira e vê se tem qualquer coisa para comer...",
            '<32>* depois disso a gente pode deitar no chão...',
            "<32>* você verá..."
        ],
        blooktouch2b2: ['<32>{#p/napstablook}* a geladeira...'],
        blooktouch2c1: [
            "<32>{#p/napstablook}* se você quer ouvir música, a um pouco no meu toca disco...",
            '<32>* Sinta-se livre para dar uma olhada...\n* ou não...'
        ],
        blooktouch2c2: () => [
            '<32>{#p/napstablook}* o toca disco...\n* ... que você não deve gostar...',
            "<32>* talvez...\n* eu possa te mostrar um novo som no qual estou trabalhando...",
            "<32>* é bem diferente da minha parada normal...",
            '<32>* você quer ouvir?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        blooktouch2c2x: () => [
            '<32>{#p/napstablook}* você quer ouvir meu novo som?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        blooktouch2c3a: ['<32>{#p/napstablook}* oh...\n* bem, me conta se você mudar de ideia...'],
        blooktouch2c3b: ['<32>{#p/napstablook}* okay...\n* eu vou ligar agora...'],
        blooktouch2c4: () => [
            '<32>{#p/napstablook}* então... o que você acha',
            choicer.create('* (O que você acha?)', 'Bom', 'Ruim')
        ],
        blooktouch2c5a: [
            "<32>{#p/napstablook}* não é ruim?",
            '<32>* oh-\n* hmmm... obrigado...',
            "<32>* eu...\n* eu vou te dizer quando estiver pronto!"
        ],
        blooktouch2c5b: ["<32>{#p/napstablook}* oh.........\n* você está certo........."],
        blooktouch2d1: ["<32>{#p/napstablook}* desculpa...\n* essa é toda a música que eu tenho por agora..."],
        blooktouch2d2: ["<32>{#p/napstablook}* desculpa...\n* eu vou tentar fazer algo melhor da próxima vez..."],
        blookyard1: pager.create(
            0,
            () =>
                SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

                    ? [
                        '<32>{#p/napstablook}* você pode ficar com a boneca mew mew',
                        '<32>{#p/napstablook}* obrigado por...\n* não ajudar, eu acho'
                    ]
                    : 65 <= SAVE.data.n.plot
                        ? SAVE.data.b.a_state_hapstablook
                            ? 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/napstablook}* ei, mettaton veio aqui a pouco tempo',
                                    "<32>* nós conversamos um pouco sobre o que estávamos fazendo da vida...",
                                    '<32>* sobre família...',
                                    "<32>* bem, eu nunca me senti tão feliz assim.",
                                    '<32>* o que você fez pela gente... significa muito.'
                                ]
                                : [
                                    "<32>{#p/napstablook}* ei... desculpa, as coisas não foram do jeito que queríamos...",
                                    '<32>* mas, foi legal te ver lá...'
                                ]
                            : [
                                '<32>{#p/napstablook}* todo dia que passa, eu me sinto um passo mais longe da felicidade...'
                            ]
                        : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                            ? ['<32>* oh...\n* ei......', '<32>* eu voltei aqui para manter os olhos nas lesmas...']
                            : 60 <= SAVE.data.n.plot
                                ? [
                                    "<32>{#p/napstablook}* Ser um competidor em um dos programas de mettaton foi um sonho que se tornou realidade...",
                                    "<32>* eu me pergunto se farei algo assim de novo."
                                ]
                                : 49 <= SAVE.data.n.plot
                                    ? [
                                        '<32>{#p/napstablook}* caramba, você consegue se livrar',
                                        '<32>* quer dizer...',
                                        '<32>* eu acho que faço isso também...',
                                        "<32>* mas, eu sou meio que incorporio, então não é muito impressionante pra mim"
                                    ]
                                    : [
                                        '<32>{#p/napstablook}* seja bem vindo a fazenda de lesmas da família blook...',
                                        "<32>* ... é.\n* eu sou o único dono.",
                                        ...(world.killed0
                                            ? [
                                                "<32>* ei, que estranho...",
                                                '<32>* todos os caracóis se foram...',
                                                '<32>* talvez aquele cara barbado levou elas...'
                                            ]
                                            : [
                                                '<32>* esse local normalmente tinha muitas vendas...',
                                                '<32>* mas nosso principal cliente acabou sumindo um dia...',
                                                "<32>* agora é só um cara cabeludo que aparece de vez em quando..."
                                            ])
                                    ],
            () =>
                SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

                    ? ['<32>{#p/napstablook}* ............']
                    : 65 <= SAVE.data.n.plot
                        ? SAVE.data.b.a_state_hapstablook
                            ? 68 <= SAVE.data.n.plot
                                ? ["<32>{#p/napstablook}* com sorte da próxima vez você não vai precisar arriscar sua vida."]
                                : ['<32>{#p/napstablook}* é assim que é...']
                            : ['<32>{#p/napstablook}* é assim que é...']
                        : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                            ? ["<33>{#p/napstablook}* não se preocupe, eles estão bem...", '<32>* pelo menos, eu espero que sim......']
                            : 60 <= SAVE.data.n.plot
                                ? ["<32>{#p/napstablook}* espero que da próxima vez ele seja um pouco mais legal com os competidores........."]
                                : 49 <= SAVE.data.n.plot
                                    ? [
                                        '<32>{#p/napstablook}* ah é, eu te vi naquele show de talentos mais cedo...',
                                        ...(SAVE.data.n.state_aerialis_talentfails === 0
                                            ? [
                                                "<32>{#p/napstablook}* foi uma bela performance... você não errou nenhuma vez",
                                                "<32>* eu acho que nunca vi alguém fazer isso daquela forma......"
                                            ]
                                            : SAVE.data.n.state_aerialis_talentfails < 15
                                                ? [
                                                    "<32>{#p/napstablook}* mesmo que sua performance não tenha sido perfeita, você foi bem",
                                                    "<32>* maior parte dos competidores do mettaton não chegam nem na metade do caminho...",
                                                    '<32>* inclusive eu......'
                                                ]
                                                : [
                                                    "<32>{#p/napstablook}* mesmo que sua performance não tenha sua a melhor, eu sei que você tentou seu melhor",
                                                    '<32>* e aliás, você chegou até o fim...',
                                                    '<32>* diferente de mim......'
                                                ])
                                    ]
                                    : world.killed0
                                        ? [
                                            "<32>{#p/napstablook}* oh ei...\n* isso aí rimou, não é...",
                                            '<32>* eu acho que vou fazer um som sobre isso isso... ou não...'
                                        ]
                                        : [
                                            '<32>{#p/napstablook}* um amigo meu recentemente me disse que era o rei...',
                                            "<32>* mas deve ser mentira\n* o rei não me conheceria..."
                                        ],
            () =>
                SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

                    ? ['<32>{#p/napstablook}* ............']
                    : 65 <= SAVE.data.n.plot
                        ? SAVE.data.b.a_state_hapstablook && 68 <= SAVE.data.n.plot
                            ? ['<32>{#p/napstablook}* eu queria ter mais pra dizer...']
                            : ['<32>{#p/napstablook}* é assim que é...']
                        : 60 <= SAVE.data.n.plot
                            ? ['<32>{#p/napstablook}* .........']
                            : 49 <= SAVE.data.n.plot
                                ? SAVE.data.n.state_aerialis_talentfails === 0
                                    ? ['<32>{#p/napstablook}* parabéns, eu acho']
                                    : ['<32>{#p/napstablook}* ......']
                                : ['<32>{#p/napstablook}* eu queria ter mais pra dizer...']
        ),
        boots1: () => [
            '<32>{#p/human}* (Você pegou as Botas Flutuantes.)',
            choicer.create('* (Equipar as Botas Flutuantes?)', 'Sim', 'Não')
        ],
        boots2: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"],
        bruh: ['<32>{*}{#p/undyne}* Te vejo mais tarde.{^20}{%}'],
        candy1: () =>
            postSIGMA()
                ? ["<32>{#p/basic}* Está fora de serviço."]
                : SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você se aproxima da máquina de venda.)',
                        choicer.create('* (O que você vai fazer?)', 'Alcaçuz', 'Chisps', 'Ração', 'Nada')
                    ]
                    : [
                        '<32>{#p/basic}* Sintetizar algo na máquina de venda?',
                        choicer.create('* (O que você vai fazer?)', 'Alcaçuz', 'Chisps', 'Ração', 'Nada')
                    ],
        candy2: ['<32>{#p/human}* (Você pegou o $(x).)'],
        candy3: () => [choicer.create('* (Comprar o $(x) por $(y)G?)', 'Sim', 'Não')],
        candy4: ["<32>{#p/human}* (Você não tem G suficiente.)"],
        candy5: ['<32>{#p/human}* (Você decide não comprar.)'],
        candy6: ["<32>{#p/human}* (Você está carregando demais.)"],
        candy7: ['<32>{#p/human}* (Você decide não fazer nada.)'],
        deathReaction: {
            f_bird: ['<32>{#p/basic}* O pássaro agora não deseja mais te carregar através do abismo.'],
            
            f_blooky: [
                '<32>{#p/basic}{#npc/a}* Você ouviu sobre a Undyne?',
                '<32>{#p/basic}{#npc/a}* Oh, não mesmo!',
                "<32>{#p/basic}{#npc/a}* Ouvi dizer que ela está indo bem.",
                '<32>{#p/basic}{#npc/a}* Parece bom pra mim!',
                '<32>{#p/basic}{#npc/a}* Undyne não vai morrer.',
                '<32>{#p/basic}{#npc/a}* De fato não!'
            ],
            f_dummy: [
                '<32>{#p/basic}{#npc/a}* Assinatura de energia fatal detectada.',
                '<32>* Nome... Undyne.',
                '<32>* Status de relacionamento... \"BESTIES!!!\"',
                '<32>* Última interação... perguntou sobre o humano.',
                '<32>* Hora de compensar a perda...',
                '<32>* Indeterminado.'
            ],
            f_hub: [
                "<32>{#p/basic}{#npc/a}* O...\n* O que você fez!?",
                "<32>* Velho Gerson não será um campista feliz depois disso..."
            ],
            f_snail: () => [
                '<32>{#p/basic}* ...',
                SAVE.data.b.f_state_thundersnail_win
                    ? "<32>* eu vou garantir que você JAMAIS vença outro jogo de electrosnail."
                    : "<32>* Eu vou ter certeza de você NUNCA ganhar outro jogo de electrosnail."
            ],
            f_undyne: [
                '<32>{#p/basic}* Não.\n* Não!\n* NÃO!!!',
                '<32>* O que. Você.\nFEZ???',
                '<32>* Ela estava...',
                '<32>* Ela era minha Bully favorita!\n* Como ousa tomar ela de mim dessa forma!?'
            ]
        },
        dummy1x: () =>
            SAVE.data.b.flirt_maddummy
                ? [
                    SAVE.data.n.state_wastelands_dummy === 4
                        ? "<32>{#p/basic}* Gah!\n* Você é pior do que eu imaginei que você seria!!"
                        : '<32>{#p/basic}* Gah!\n* O quão terrível é você!?',
                    '<32>* Você não apenas abraçou alguém com fobia....',
                    '<32>* Mas o jeito que você fez!?',
                    '<32>* Revoltante.\n* Revoltante!\n* REVOLTANTE!!!!'
                ]
                : SAVE.data.n.state_wastelands_dummy === 4
                    ? [
                        '<32>{#p/basic}* Gah!\n* Eu SABIA que você estava fazendo isso!!',
                        '<32>* Que IMBECIL!!!\n* Você abraçou alguém com fobia!!!!',
                        "<32>* Guooohh, você vai PAGAR."
                    ]
                    : [
                        '<32>{#p/basic}* Gah!\n* Por que você faria isso!?',
                        "<32>* Você não sabe quem eu sou!?!?\n* Você abraçou alguem com fobia!!!!",
                        "<32>* Guooohh, você vai PAGAR."
                    ],
        dummy1a: () =>
            SAVE.data.n.state_wastelands_dummy === 2
                ? ["<32>{#p/basic}* HA!\n* Claro que você correria.", '<32>* TANTO FAZ, BURRO.']
                : ['<32>{#p/basic}* Você OUSA entrar no meu território e PASSAR POR mim?', '<32>* IDIOTA!'],
        dummy1b: () =>
            SAVE.data.n.state_wastelands_dummy === 1
                ? ['<32>{#p/basic}* Intimidado demais para lutar...?', '<32>* Eu entendo como é.']
                : ['<32>{#p/basic}* Você OUSA passar em meu território e me ENCARAR?', '<32>* IDIOTA!'],
        dummy1c: () =>
            SAVE.data.n.state_wastelands_dummy === 1
                ? ['<32>{#p/basic}* Eu pensei que você faria isso.', '<32>* Previsível.\n* Previsível!\n* PREVISÍVEL!!!']
                : [
                    "<32>{#p/basic}* Hora hora hora, vejo que a mais para você do que conversa.",
                    "<32>* Não que isso vá te fazer muito bem quando eu QUEBRAR!"
                ],
        dummy2: () => [
            '<32>{#p/basic}* Aquela ELITE falhou em tomar sua ALMA, mas esqueceu algo que eu tenho na manga!',
            "<32>* Exato, humano...\n* Eu sou INCORPOREO! ",
            '<32>* Eu sou um fantasma que vive dentro de um boneco!',
            '<32>* Meu primo também vivia dentro de um boneco, ATÉ...!',
            ...(SAVE.data.n.state_wastelands_toriel === 0
                ? [
                    '<32>* Até...!',
                    '<32>* Até...',
                    '<32>{#x1}* ... bem, na verdade, eles deixaram por conta própria...',
                    '<32>* Aparentemente, uma mulher muito gente boa decidiu tomar conta dele nas Outlands?',
                    '<32>* Ela disse que um humano fez ela se sentir melhor.',
                    "<32>* Foi você, não foi?",
                    '<32>* ... Poxa.\n* Acho que você pode ir...'
                ]
                : [
                    '<32>* VOCÊ APARECER!!!',
                    ...(16 <= SAVE.data.n.kills_wastelands
                        ? [
                            '<32>* Não apenas SUAS ações o fizeram sair de sua casa...',
                            '<32>* Mas agora todos os seus vizinhos se foram, também!',
                            '<32>* Desprezível.\n* Desprezível!\n* DESPREZÍVEL!!!',
                            "<32>{#x1}* Você é a pior pessoa que eu já conheci!\n* Eu NUNCA estive tão bravo!!!",
                            '<32>* Guooooohhhh!!!\n* Meu poder de manequim está FORA DOS LIMITES!!!'
                        ]
                        : SAVE.data.n.state_wastelands_dummy === 3
                            ? [
                                '<32>* VOCÊ... você...',
                                '<32>* Nossa!\n* Você é bem entediante!',
                                '<32>* Eles ficaram irritados e voaram para longe como qualquer espectro que se preze.',
                                '<32>* Que seja.\n* Que seja!\n* QUE SEJA!',
                                "<32>* Eu acho que eu só vou me entreter SOZINHO!",
                                "<32>* Aperte o cinto, dorminhoco!\n* É hora de dar um show!"
                            ]
                            : SAVE.data.n.state_wastelands_dummy === 4
                                ? [
                                    '<32>* VOCÊ... você...',
                                    '<32>* Nossa!\n* Você é muito legal!',
                                    '<32>* Tão legal, de fato, após o seu encontro, eles desenvolveram uma adicção a ABRAÇOS!!',
                                    '<32>* Em desespero, eles deixaram o corpo, na esperança de conseguir sua dose de mim.',
                                    "<32>* Eles sabem que eu tenho medo de abraços, mas eles não deixam de me perguntar!\n* É FRUSTRANTE!",
                                    "<32>* Você SOFRERÁ por isso, HUMANO!!!"
                                ]
                                : [
                                    ...(SAVE.data.n.state_wastelands_dummy === 0
                                        ? [
                                            '<32>* Quando você conversou com eles, eles esperavam uma bela conversa...',
                                            '<32>* Mas as coisas que você disse...!',
                                            '<32>* Horrível.\n* Chocante!\n* INACREDITÁVEL!',
                                            '<32>* Você os assustou de seus corpos!',
                                            '<32>* Grr...'
                                        ]
                                        : SAVE.data.n.state_wastelands_dummy === 1
                                            ? [
                                                '<32>* Nós fantasmas passam as vidas procurando por um corpo apropriado.',
                                                '<32>* Devagar e devagar, nós vamos nos aproximando do nosso corpo, até que um dia...',
                                                '<32>* Nós nos tornamos seres corporais, com capacidade para rir, amar, e dançar como qualquer outro.',
                                                "<32>* Mas VOCÊ!!\n* O futuro do meu primo...\n* Você arrebatou tudo!",
                                                '<32>* Uraaahhhhh!!!'
                                            ]
                                            : SAVE.data.n.state_wastelands_dummy === 2
                                                ? [
                                                    '<32>* Era tímido.\n* Vivendo uma vida sozinho nas Outlands...',
                                                    '<32>* Eles te viram e ESPERAVAM que você talvez CONVERSASSE com eles.',
                                                    '<32>* Mas NÃO!\n* Você fugiu!',
                                                    '<32>* Patético.\n* Patético!\n* PATÉTICO!!!',
                                                    "<32>* Ninguém quebra o coração do meu primo e SE LIVRA DAS CONSEQUÊNCIAS!"
                                                ]
                                                : SAVE.data.n.state_wastelands_dummy === 5
                                                    ? [
                                                        '<32>* Quando você apareceu eles estavam prontos para uma conversa...',
                                                        '<32>* E então você foi lá e BATEU na cara DELE!',
                                                        '<32>* Não apenas uma vez.\n* Não apenas duas!',
                                                        '<32>* Mas TRÊS VEZES!!',
                                                        '<32>* O quão MAU você pode ser!?'
                                                    ]
                                                    : SAVE.data.n.state_wastelands_dummy === 6
                                                        ? [
                                                            '<32>* Meu primo é um cara legal.',
                                                            "<32>* Mas isso não significa que você pode só chegar do nada e FLERTAR com ele!",
                                                            '<32>* Seus avanços estúpidos deixaram ele com tanta vergonha...',
                                                            "<32>* ... que ele nem conseguiu aguentar!!",
                                                            '<32>* Nojento.\n* Nojento!\n* NOJENTO!!!'
                                                        ]
                                                        : []),
                                    "<32>* Você MORRERÁ por isso, HUMANO!!!"
                                ])
                ])
        ],
        dummy3: [
            '<32>{#p/basic}* ...?',
            '<32>* Essa...\n* Essa sensação...?',
            '<32>{#x3}* Eureka.\n* Eureka!\n* EUREKA!!!',
            '<32>* Humano.\n* Aquele momento de emoção indescritível.',
            '<32>* Me permitiu fundir com meu corpo, finalmente!',
            "<32>* Eu sou totalmente corporal agora! Eu estou sonhando?\n* Isso é real???",
            "<32>* Bem, em retorno. Eu acho que não vou te esmagar.",
            "<32>* O que acha?"
        ],
        dummy4: (mover: boolean) => [
            ...(mover
                ? [
                    SAVE.data.n.state_foundry_maddummy === 1
                        ? '<32>{#p/napstablook}* ei...\n* eu acho que ouvi alguém sendo atacado...'
                        : '<32>{#p/napstablook}* ei...\n* eu acho que escutei alguém gritando...',
                    "<32>{#p/napstablook}* mas eu acho que você está bem",
                    '<32>* eu estava prestes a ir para casa...'
                ]
                : ["<32>{#p/napstablook}* bem...\n* eu acho que vou pra casa agora..."]),
            ...(world.sad_ghost || world.population === 0
                ? [
                    '<32>* só te avisando...',
                    "<32>* então você não me segue acidentalmente para casa...",
                    "<32>* você provavelmente não iria gostar..."
                ]
                : [
                    '<32>* então... hmmm...\n* Sinta-se livre para \"brotar\" se você quiser...',
                    '<32>* mas sem pressão...',
                    "<32>* eu entendo se você estiver ocupado...",
                    "<32>* tá tudo bem...",
                    '<32>* sem preocupação...',
                    "<32>* só pensei em oferecer.."
                ])
        ],
        dummypunch1: () =>
            SAVE.data.b.oops
                ? [
                    "<32>{#p/basic}* é um boneco de treino.\n* Dar uma surra nele?",
                    choicer.create('* (Dar uma surra no boneco?)', 'Sim', 'Não')
                ]
                : ["<32>{#p/basic}* É um boneco de treino.\n* Abraçar?", choicer.create('* (Abraçar o boneco?)', 'Sim', 'Não')],
        dummypunch2a: ['<32>{#p/human}* (Você decide não fazer nada.)'],
        dummypunch2b: () =>
            world.genocide || world.meanie
                ? ['<32>{#p/human}* (Você soca o boneco o mais forte que pode.)']
                : SAVE.data.n.exp > 0
                    ? ['<32>{#p/human}* (Você soca o boneco.)']
                    : SAVE.data.b.oops
                        ? ['<32>{#p/human}* (Você cutucou o boneco.)']
                        : SAVE.data.b.flirt_maddummy
                            ? ['<32>{#p/human}* (Você abraçou ternamente o boneco.)']
                            : ['<32>{#p/human}* (Você abraçou o boneco.)'],
        dummypunch3: () =>
            SAVE.data.b.f_state_dummypunch
                ? ["<32>{#p/basic}* É um boneco de treino surrado."]
                : SAVE.data.b.flirt_maddummy
                    ? ["<32>{#p/basic}* É um boneco de rosto vermelho."]
                    : ["<32>{#p/basic}* É um boneco abraçado feliz."],
        epicreaction: () =>
            [
                ['<25>{#p/kidd}{#f/7}* O que foi ISSO!?'],
                ['<25>{#p/kidd}{#f/7}* Ack!!'],
                ['<25>{#p/kidd}{#f/7}* De novo não!'],
                ['<25>{#p/kidd}{#f/7}* Quantos desse tem!'],
                ['<25>{#p/kidd}{#f/7}* Sério!?'],
                ['<25>{#p/kidd}{#f/7}* Senhor!!'],
                ["<25>{#p/kidd}{#f/4}* precisamos achar um jeito de sair daqui..."],
                ['<25>{#p/kidd}{#f/4}* ...']
            ][Math.min(SAVE.data.n.state_foundry_kiddreaction++, 7)],
        fallenfish: ['<33>{#p/basic}* Eletricidade permeia o corpo.'],
        fallenfish2: ["<32>{#p/basic}* Ela caiu."],
        fallenfish3: ['<32>{#p/basic}* ... mas nada aconteceu.'],
        finalfish1: ['<25>{#p/undyne}{#f/19}* Ngah...'],
        finalfish2: ['<25>{#p/undyne}{#f/19}* Interferência...\n* Estúpida...'],
        finalpre: () => [choicer.create('* (Continuar para Aerialis?)', 'Sim', 'Não')],
        genotext: {
            asgoreFinal1: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? SAVE.flag.n.ga_asrielStutter < 1
                        ? [
                            '<25>{#p/asgore}{#f/15}* Então você acabou voltando para ele no final...',
                            '<25>{#p/asriel2}{#f/7}* $(name) e eu somos inseparáveis, Asgore. Você deveria saber.',
                            '<25>{#p/asgore}{#f/15}* $(name)... M-mas é claro, o que vocês estão fazendo?',
                            "<25>{#p/asriel2}{#f/8}* Sinceramente, isso não te importa.",
                            "<25>{#p/asgore}{#f/15}* (Ugh... deveria ter visto isso chegando...)",
                            "<25>{#p/asriel2}{#f/6}* Só para dizer, então...\n* Estamos indo em uma pequena aventura.",
                            "<25>{#f/6}* Só nós três. E surpresa, surpresa, você não foi convidado.",
                            '<25>{#p/asgore}{#f/15}* E-eu pareço querer ser convidado??',
                            '<25>{#p/asriel2}{#f/6}* Me diz você.',
                            "<25>{#p/asgore}{#f/15}* Bem, eu só queria checar onde você estava. Isso é tudo.",
                            "<26>{#p/asriel2}{#f/10}{#x1}* ...\n* Tem algo errado.",
                            '<25>{#p/asriel2}{#f/10}* Dr. Alphys?\n* Essa é você...?'
                        ]
                        : [
                            '<25>{#p/asgore}{#f/15}* Então você acabou voltando para ele no final...',
                            '<25>{#p/asriel2}{#f/8}* $(name) e eu somos inseparáveis, ALPHYS.',
                            "<25>{#p/asriel2}{#f/7}* Mas VOCÊ não saberia nada sobre isso, certo?"
                        ]
                    : [
                        '<25>{#p/asgore}{#f/15}* Então você acabou voltando para ele no final...',
                        '<25>{#p/asriel2}{#f/8}* $(name) e eu somos inseparáveis, ALPHYS.',
                        ...(SAVE.flag.n.ga_asrielQuestion < 1
                            ? ["<25>{#p/asriel2}{#f/7}* Como se eu não soubesse que você planeja nos matar."]
                            : ['<25>{#p/asriel2}{#f/7}* Você realmente acha que pode nos parar?'])
                    ],
            asgoreFinal2: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? [
                        '<25>{#p/alphys}{#g/alphysThatSucks}* ... ninguém te engana, huh?',
                        '<25>{#p/asriel2}{#f/3}* Acho que não.',
                        "<25>{#p/alphys}{#g/alphysGarbo}* ...\n* Pelo menos é honesto.",
                        '<25>{#p/asriel2}{#f/13}* Você deve estar arrasada com a morte do seu querido amigo...',
                        "<25>{#p/asriel2}{#f/16}* Nem consigo imaginar como isso deve ser pra você.",
                        '<25>{#p/alphys}{#g/alphysIDK}* ...',
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* Isso não f-foi uma boa ideia.',
                        "<25>{|}{#p/asriel2}{#f/8}* Não me diga que você vai fu- {%}"
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysOhGodNo}* Que?',
                        "<25>* Eu...\n* E-eu não teria chance contra você!",
                        ...(SAVE.flag.n.ga_asrielQuestion < 1
                            ? ['<25>{#p/asriel2}{#f/10}* ... tem certeza?', '<25>{#p/alphys}{#g/alphysIDK}* ...']
                            : ['<25>{#p/asriel2}{#f/7}* ...']),
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* Isso não f-foi uma boa ideia.'
                    ],
            asgoreFinal3: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? ['<25>{#p/asriel2}{#f/7}* Covarde.']
                    : [
                        ["<25>{#p/asriel2}{#f/15}* Huh... acho que isso é cedo demais na linha do tempo."],
                        ['<25>{#p/asriel2}{#f/15}* Pois bem.']
                    ][Math.min(SAVE.flag.n.ga_asrielQuestion++, 1)],
            asgoreMK1: [
                '<25>{#p/kidd}{#f/7}* Uau, aquele é... sem chance...',
                "<25>{#f/1}* É o REI!",
                '<25>* Rei Asgore, cara!\n* O que você tá fazendo por aqui!?',
                '<25>{#p/asgore}{#f/3}* ...',
                '<25>{#f/3}* É... uma longa história.',
                '<25>{#p/kidd}{#f/4}* Oh...',
                '<25>{#f/1}* Bem, você pode me contar!',
                '<25>{#p/asgore}{#f/7}* Heh.\n* Não, eu não posso.',
                '<25>{#f/6}* Mas eu posso te perguntar uma coisa.',
                '<25>{#p/kidd}{#f/3}* ...?',
                '<25>{#p/asgore}{#f/7}* Esse humano tem sido um bom amigo pra você?',
                '<25>{#p/kidd}{#f/1}* Bem... sim!',
                '<25>{#f/4}* Mas, tinha uma outra criança com ele...',
                "<25>{#f/8}* Ele não foi tão legal.",
                "<25>{#p/asgore}{#f/1}* É ele então.\n* Apenas ele...",
                '<25>{#p/kidd}{#f/4}* Huh?',
                '<25>{#p/asgore}{#f/6}* Erm, nada.\n* Eu não deveria te incomodar com isso.',
                '<25>{#f/3}* Já para você, humano...',
                '<25>{#f/2}* Você e aquela \"outra criança\" fizeram um dano irreversível.',
                '<25>{#f/1}* Inúmeros monstros estão... bem, você sabe.',
                '<25>{#p/kidd}{#f/4}* ... huh?',
                '<25>{#p/asgore}{#f/7}* Nada. Nada.\n* Eu só...',
                '<25>{#f/5}* Eu quero acreditar que exista mais que isso... para você.',
                '<25>{#f/5}* Que, talvez de alguma forma... Papyrus estivesse certo.',
                '<25>{#f/6}* Se seu \"amigo\" decidiu te abandonar...',
                '<25>* Então talvez essa seja sua chance de começar algo novo.',
                "<25>{#p/kidd}{#f/1}* E eu irei ajudá-los!",
                '<25>{#p/asgore}{#f/6}* Heh, talvez você possa, pequeno.\n* Talvez você possa.',
                '<25>{#f/5}* Desde a última vez que nos vimos, eu tenho pensado sobre tudo.',
                '<25>{#f/2}* É difícil de concluir, mas... ele já foi longe demais.',
                '<25>{#f/2}* Meu filho... ele nunca será o mesmo de novo.',
                "<25>{#p/kidd}{#f/4}* Eu vou deixar vocês falarem sobre isso...",
                '<25>{#p/asgore}{#f/1}* Não, não, está tudo bem. Nós já estamos finalizando.',
                '<25>{#f/1}* Pense sobre minhas palavras com cautela, humano.',
                '<25>{#f/1}* É tudo que eu peço.'
            ],
            asgoreMK2: [
                "<25>{#p/kidd}{#f/2}* Uau... ele é INCRÍVEL!",
                "<25>{#f/1}* Eu tinha ouvido histórias sobre as falas do rei, mas CARA!",
                '<25>{#f/3}* Queria que ele fosse MEU pai...'
            ],
            asriel32: [
                '<25>{#p/asgore}{#f/15}* ...',
                '<25>{#f/16}* Eu vejo que você ignorou o meu aviso.',
                '<25>{#p/asriel2}{#f/3}* Claro que sim.',
                '<25>{#p/asgore}{#f/1}* ...',
                '<25>{#f/16}* Sabe, eu vim me perguntando.',
                '<25>{#f/16}* Você pode dizer não ser meu filho, mas você era...',
                '<25>{#f/15}* A muito tempo atrás.',
                '<25>{#p/asriel2}{#f/10}* E seu ponto é?',
                '<25>{#p/asgore}{#f/12}* ...',
                '<25>{#p/asgore}{#f/12}* Bem... o que mudou?',
                '<25>{#f/12}* O que te transformou neste... estranho... em pé na minha frente?',
                '<26>{#p/asriel2}{#f/6}* Você REALMENTE quer saber?',
                '<26>{#p/asgore}{#f/7}* ...',
                '<26>{#p/asriel2}{#f/7}* Seja honesto.',
                '<26>{#p/asgore}{#f/1}* ...\n* Bem, não...\n* Não de verdade...',
                "<26>{#p/asriel2}{#f/8}* Tch.\n* Agora sim, isso é mais o Asgore que eu conheço.",
                "<26>{#f/6}* Você prefere pretender que tudo está suuuuper bem, não é mesmo?",
                "<26>{#f/7}* Bem, adivinhe, amigo.\n* Você está atrasado para o despertar.",
                "<26>{#f/8}* (Eu te daria um agora se você não fosse a merda de um holograma...)",
                '<26>{#p/asgore}{#f/12}* ...',
                '<26>{#p/asriel2}{#f/8}* ...',
                '<26>{#p/asgore}{#f/15}* Sabe... as vezes eu me pergunto como cheguei aqui.',
                '<25>{#f/16}* Sem mundo, sem filhos... preso aqui pelos humanos...',
                '<25>{#f/15}* E agora, o Outpost vai cair e tudo que eu posso fazer é assistir.',
                "<25>{#p/asriel2}{#f/15}* Se você está me pedindo por piedade, deve estar muito desesperado...",
                '<25>{#f/16}* Pequeno conselho.\n* Da próxima vez, não começa uma guerra...',
                '<25>{#p/asgore}{#f/2}* ...',
                '<25>{#f/4}* Você...',
                '<25>{#f/2}* ...',
                '<25>{#f/6}* Sabe de uma coisa, Asriel?\n* Esquece.',
                "<25>{#f/7}* Você está certo...",
                '<25>{#f/5}* Conversar com você é uma total perda de tempo.',
                "<25>{#p/asriel2}{#f/15}* ... wow.\n* Estou impressionado.",
                '<25>{#f/16}* Você finalmente disse algo inteligente.',
                '<25>{#p/asgore}{#f/1}* ...',
                "<25>{#p/asriel2}{#f/10}* E o que agora?\n* Qual o próximo movimento para o rei?",
                '<25>{#p/asgore}{#f/15}* Pra ser sincero?',
                '<25>{#f/15}* ...',
                '<25>{#f/16}* Eu não faço ideia, Asriel.'
            ],
            asriel33: ['<25>{#p/asriel2}{#f/10}* Eu detectei uma emoção de raiva...?'],
            
            asriel34: [
                "<25>{#p/asriel2}{#f/3}* Eu vou ter que cuidar de algumas coisas, depois eu volto.",
                '<25>{#p/kidd}{#f/3}* Você vai voltar?\n* Você precisa me contar mais sobre a Undyne...',
                "<25>{#p/asriel2}{#f/4}* Eu prometi, não foi?",
                "<25>{#f/1}* Não se preocupe.\n* Eu estarei de volta antes de você perceber.",
                '<25>{#p/kidd}{#f/4}* Okay...'
            ],
            asriel34x: ['<25>{#p/asriel2}{#f/3}* Ei, para um pouco.'],
            asriel35: () =>
                SAVE.flag.n.undying > 0
                    ? [
                        [
                            '<25>{#p/asriel2}{#f/6}* Bem, aqui estamos de novo, $(name).',
                            "<25>{#f/7}* ... olha, eu sei que a Undyne não vai morrer quando a criança atacar ela.",
                            "<25>{#f/15}* Mas pelo que eu vejo, é a melhor forma de passar por ela.",
                            "<25>{#f/16}* Vamos só nos manter na linha do tempo, okay?"
                        ],
                        []
                    ][Math.min(SAVE.flag.n.ga_asrielUndying++, 1)]
                    : [
                        [
                            '<25>{#p/asriel2}{#f/1}* Olá, $(name).',
                            '<25>{#f/13}* Sentiu minha falta?',
                            '<25>{#f/4}* Heh.\n* Desculpa ter saído do seu lado de novo.',
                            "<25>{#f/3}* Mas eu não fiz isso por nada.",
                            "<25>{#f/13}* Vejo que você se separou do seu amiguinho.",
                            '<25>{#f/16}* Você deve estar tão sozinho, não é $(name)?'
                        ],
                        []
                    ][Math.min(SAVE.flag.n.ga_asriel35++, 1)],
            asriel37: () => [
                '<25>{#p/asriel2}{#f/1}* E alas, seu amiguinho voltou!',
                "<25>{#f/17}* Você faria qualquer coisa por mim, não faria?",
                '<25>{#p/kidd}{#f/9}* Mhm...'
            ],
            asriel38: () => [
                ...[
                    [
                        
                        '<25>{#p/asriel2}{#f/17}* Bem, o que você acha?',
                        "<25>{#f/16}* Não foi fácil tomar controle sobre ele, sabe.",
                        ...(SAVE.data.n.state_foundry_muffet === 1
                            ? [
                                '<25>{#f/15}* Ele ficava dizendo que queria ser esquecido.',
                                '<25>{#f/10}* Nossa, $(name). O que você fez com ele?'
                            ]
                            : [
                                "<25>{#f/15}* Ele não parava de me perguntar onde você estava...",
                                '<25>{#f/10}* Nossa, $(name). O que vocês dois estavam fazendo?'
                            ]),
                        "<25>{#f/3}* Uh, não responde.\n* Ele tá aqui agora, é o que importa."
                    ],
                    ["<25>{#p/asriel2}{#f/3}* Bem, pelo menos isso está fora do caminho agora."]
                ][Math.min(SAVE.flag.n.ga_asriel38++, 1)]
            ],
            asriel39: [
                '<25>{#p/asriel2}{#f/8}* Espera.\n* Pode me fazer um favor, criança?',
                '<25>{#p/kidd}{#f/9}* ...?',
                '<25>{#p/asriel2}{#f/6}* Resolve o problema.'
            ],
            asriel40: () =>
                SAVE.flag.n.ga_asriel40++ < 1
                    ? [
                        '<25>{#p/asriel2}{#f/10}* Já?\n* Nossa...',
                        '<25>{#f/3}* Este é o potencial que os monstros recusam ter, $(name).',
                        '<25>{#f/16}* Esperança, medo, empatia... presos a essas emoções.',
                        "<25>{#f/15}* Imagine se todos eles fossem assim."
                    ]
                    : ['<25>{#p/asriel2}{#f/4}* Bem no tempo.'],
            asriel41: ['<25>{#p/asriel2}{#f/3}* Volta pra cá, criança.'],
            asriel42: ["<25>{#p/asriel2}{#f/4}* Se continuarmos assim, vamos estar fora daqui em pouco tempo."],
            asriel43: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/16}* Acabou, $(name)...",
                        "<25>{#f/3}* Nós conseguimos.",
                        '<25>{#f/2}* A capitã da Guarda Real...',
                        '<25>{#f/15}* Ela realmente PENSOU ter alguma chance?',
                        SAVE.flag.n.undying > 2
                            ? '<25>{#f/8}* Claro, nos tomou algumas tentativas...'
                            : SAVE.flag.n.undying > 1
                                ? '<25>{#f/8}* Claro, nos tomou uma tentativa...'
                                : '<25>{#f/8}* Claro, ela lutou com tudo que tinha...',
                        '<25>{#f/7}* Mas no fim nós sabíamos que estava destinado a acontecer.'
                    ],
                    [
                        '<25>{#p/asriel2}{#f/3}* ... se essa vitória fosse tão deliciosa como foi da primeira vez.',
                        '<25>{#f/4}* Pois bem.'
                    ],
                    ['<25>{#p/asriel2}{#f/6}* Matar a Undyne já está virando nosso hobby.'],
                    ['<25>{#p/asriel2}{#f/6}* ...']
                ][Math.min(SAVE.flag.n.ga_asriel43++, 3)],
            asriel44: ['<25>{#p/asriel2}{#f/13}* Lidere o caminho, $(name).'],
            asriel45: [
                '<25>{#p/asriel2}{#f/13}* Hora, hora, hora...{%40}',
                "<25>{#f/16}* Eu não consigo expressar o quão grato sou por sua ajuda.{%40}",
                "<25>{#f/1}* Este corpo pode não ser perfeito, mas pelo que ele vale...?{%40}",
                "<25>{#f/2}* Eu não vou sentir falta de ser uma estúpida estrela falante.{%40}"
            ],
            asrielHug1: ['<25>{#p/asriel2}{#f/13}* ...'],
            asrielHug2: ['<25>{*}{#p/asriel2}{#f/13}* $(name)...{^100}{%}'],
            asrielHug3: ['<25>{#p/asriel2}{#f/13}* Er...\n* Obrigado, $(name).'],
            bombshell1: [
                '<32>{*}{#p/alphys}* Estrela... falante...?',
                '<32>{*}* Mas aquele experimento...\n* Ele f-falhou...',
                '<32>{*}* Ah não ser que...'
            ],
            bombshell2: ['<32>{*}* Não...', '<32>{*}{@random=1.1/1.1}* Não...'],
            bombshell3: [
                '<32>{*}{@random=1.1/1.1}* Toriel...\n* Sans...\n* Papyrus...',
                '<32>{*}{@random=1.1/1.1}* Undyne...',
                "<32>{*}{@random=1.1/1.1}* É tudo minha culpa...",
                '<32>{*}{@random=1.1/1.1}{#i/4}* Oh... não...'
            ],
            bombshell4: ["<32>{*}{@random=1.1/1.1}{#i/5}* Eu matei todos vocês..."],
            kidd1: [
                '<25>{#p/kidd}{#f/4}* Qual ele disse que era seu nome?\n* $(name)...?',
                '<25>{#f/3}* Bem $(name), só entre eu e você, ele me faz sentir...',
                '<25>{#f/4}* Desconfortável.'
            ],
            kiddFinal1: [
                '<25>{#p/kidd}{#f/11}* ...!',
                "<25>{#p/asriel2}{#f/5}* Eu sei.\n* Excitante, não é?",
                '<25>{#p/kidd}{#f/9}* ...',
                "<25>{|}{#f/12}* Eu não- {%}",
                "<25>{#p/asriel2}{#f/4}* Shh...\n* Tá tudo bem.",
                '<25>{#p/asriel2}{#f/3}* Só lembre-se o motivo de estarmos aqui.'
            ],
            kiddFinal2: () => [
                '<25>{#p/kidd}{#f/9}* Undyne...',
                '<25>{#p/asriel2}{#f/10}* ...?',
                '<25>{#f/6}* ... Deixa eu adivinhar.\n* Ainda tendo dúvidas?',
                "<25>{|}{#p/kidd}{#f/12}* Me desculpa, eu- {%}",
                "<25>{#p/asriel2}{#f/13}* Undyne, filé de undyne... ela não é uma heroína verdadeira.",
                '<25>{#p/asriel2}{#f/4}* Não... os VERDADEIROS heróis são aqueles que sabem usar suas mentes.',
                SAVE.flag.n.genocide_milestone < 5
                    ? SAVE.flag.n.ga_asrielKiddFinal1++ < 1
                        ? '<26>{#f/15}* Pessoas tipo...\n* Bem, pessoas que não são igual a ela.'
                        : '<25>{#f/15}* Pessoas diferentes dela.'
                    : '<26>{#f/3}* Pessoas como a Alphys.',
                '<25>{#p/kidd}{#f/12}* Ela... realmente...'
            ],
            kiddFinal3: () => [
                '<25>{#p/kidd}{#f/10}* ...',
                "<25>{#f/10}* Undyne não vai morrer.",
                '<25>* Mesmo que eu faça isso, ela...',
                "<25>* Ela vai ficar bem.\n* Ela será forte...",
                ...(SAVE.flag.n.ga_asrielKiddFinal3a < 1
                    ? ['<25>{#p/asriel2}{#f/8}* (Claro, o que te fizer sentir melhor...)']
                    : []),
                "<25>{#p/kidd}{#f/9}* Porque, tipo...\n* Ela é mais forte que qualquer mostro...",
                "<25>{#f/12}* Ela tem {@fill=#ff0} determinação{@fill=#fff}...",
                ...(SAVE.flag.n.ga_asrielKiddFinal3a++ < 1
                    ? ['<25>{#p/asriel2}{#f/10}* Tá?\n* (Cara, o que tem com essa criança?)']
                    : SAVE.flag.n.undying > 0 && SAVE.flag.n.ga_asrielKiddFinal3b++ < 1
                        ? ['<25>{#p/asriel2}{#f/8}* (Como ele SABIA?)']
                        : ['<25>{#p/asriel2}{#f/10}* ...'])
            ],
            kiddFinal4: ['<32>{#p/asriel2}{#f/6}* Aí está ela.'],
            kiddFinal5: ['<32>{#f/6}* Agora.', '<32>{#f/7}* ...'],
            kiddFinal6: ['<32>{*}{#p/asriel2}{#f/14}{@random=1.1/1.1}{@fill=#f00}* Faça.{%100}'],
            kiddFinal7: [
                '<25>{#p/kidd}{#f/12}* ...',
                '<25>{#p/undyne}{#f/13}* Mas que merda?\n* O que é que você tá fazendo aqui!?',
                '<25>{|}{#f/13}* E por que seu olho parece que- {%}'
            ]
        },
        goatreaction: () =>
            [
                ['<25>{#p/asriel2}{#f/15}* Cuidado, $(name).'],
                ['<25>{#p/asriel2}{#f/15}* $(name)...'],
                ['<25>{#p/asriel2}{#f/15}* Sério isso?'],
                ["<25>{#p/asriel2}{#f/15}* Estamos tentando não morrer aqui, $(name)..."],
                ["<25>{#p/asriel2}{#f/16}* Eu estou ficando realmente preocupado."],
                ['<25>{#p/asriel2}{#f/8}* Você é cego ou alguma coisa?'],
                ['<25>{#p/asriel2}{#f/7}* Vamos!'],
                ['<25>{#p/asriel2}{#f/7}* ...']
            ][Math.min(SAVE.flag.n.ga_asrielEpic++, 7)],
        hapstadoor1: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* (Mas você não tem a chave.)"] : ["<32>{#p/basic}* Está trancando."],
        hapstadoor2: ['<32>{#p/human}* (Você usa a chave misteriosa.)'],
        jumpsuit1: () => [
            '<32>{#p/human}* (Você tem o Traje de Voo.)',
            choicer.create('* (Equipar o Traje de Voo?)', 'Sim', 'Não')
        ],
        jumpsuit2: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"],
        kiddStatue: [
            '<25>{#p/kidd}{#f/1}* Yo, eu lembro desse lugar!',
            '<25>{#f/3}* Minha, uh, mãe me trouxe aqui uma vez.',
            "<25>{#f/1}* Se nós dois nos colocarmos nos pisos, a luz acende. É legal!"
        ],
        kitchencall: () => [
            '<32>{#p/event}* Ring, ring...',
            '<18>{#p/papyrus}HUMANO!\nEU ESTIVE PENSANDO.',
            ...(SAVE.data.n.plot_date < 1
                ? [
                    SAVE.data.b.flirt_papyrus
                        ? '<18>NÓS DEVERÍAMOS SAIR EM UM ENCONTRO!'
                        : '<18>NÓS DEVERÍAMOS DAR UMA ROLÊ!',
                    "<18>{#f/5}E ALIÁS... FAZ TEMPO QUE EU NÃO TE VEJO.",
                    "<18>{#f/0}VAI SER LEGAL SE ENCONTRAR!",
                    "<18>{#f/0}BEM, TE VEJO NA MINHA CASA QUANDO VOCÊ ESTIVER PRONTO."
                ]
                : [
                    '<18>ENTÃO, SABE COMO A GENTE PASSOU UM TEMPO JUNTOS?',
                    '<18>{#f/5}BEM... ACHO QUE A UNDYNE PRECISA DO MESMO.',
                    '<18>{#f/4}ACHO QUE VOCÊS DOIS SERIAM GRANDES AMIGOS...',
                    SAVE.data.b.flirt_papyrus ? '<18>{#f/6}... APENAS AMIGOS!' : '<18>{#f/0}ASSIM COMO NÓS SOMOS!',
                    "<18>{#f/0}BEM, ME ENCONTRE NA UNDYNE QUANDO ESTIVER PRONTO."
                ]),
            '<18>{#f/9}SERÁ FANTASTICO!',
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        madfish1: () => [
            ...(SAVE.flag.n.ga_asrielUndyneX++ < 1
                ? ['<25>{#p/asriel2}{#f/8}* Lá vem o discurso dramático...']
                : []),
            '<32>{#p/undyne}* Você.',
            '<32>{#x1}* Você pensa que pode rastejar por aí, MATANDO todas essas pessoas inocentes?',
            '<32>* Bem, adivinhem o que, miseráveis.',
            '<32>* Isso acaba AGORA.',
            '<32>{#x2}* Você pode ter derrotado Doge, mas deixa eu ser bem clara...',
            "<32>{#x3}* Assim que o resto do esquadrão de ELITE encontrar vocês, irão conhecer a dor."
        ],
        madfish2: () =>
            SAVE.flag.n.genocide_milestone < 5
                ? [
                    '<32>* Nada a dizer?\n* Há.',
                    "<32>{#x4}* Eu não tenho tempo agora, Alphys precisa da minha ajuda para evacuar pessoas.",
                    "<32>{#x5}* Fuhuhu... divirtam-se tentando progredir.\n* Não vão chegar longe."
                ]
                : [
                    '<32>* Nada a dizer?\n* Há.',
                    "<32>{#x4}{|}* Eu não tenho tempo para lidar com vocês agora, Alphys precisa da minha aju- {%}",
                    "<25>{#x5}{#p/asriel2}{#f/8}* Alphys é mais forte que você, sabia?",
                    "<25>{#f/2}* Eu já sei o que acontece nessa linha do tempo...",
                    '<25>{#f/1}* Lutar contra você não é NADA comparado a ela.',
                    '<32>{#p/undyne}* Ah é?',
                    "<32>* Você terá que passar por mim primeiro, de toda forma.",
                    '<32>{#p/asriel2}{#f/6}* Ah, acredita em mim.\n* Nós vamos.',
                    "<32>{#p/undyne}* Veremos."
                ],
        madfish3: () =>
            SAVE.flag.n.genocide_milestone < 5
                ? SAVE.flag.n.ga_asrielMadfish++ < 1
                    ? ['<25>{#p/asriel2}{#f/8}* O que você quiser.']
                    : ['<25>{#p/asriel2}{#f/8}* ...']
                : ['<25>{#p/asriel2}{#f/8}* Tch.'],
        muffet1: () =>
            badSpider()
                ? ['<32>{#p/basic}* Ahuhuhuhu...', '<32>* Diga para ela que deve aumentar meu pagamento da próxima vez.']
                : SAVE.data.b.flirt_muffet
                    ? ['<32>{#p/basic}* Ahuhuhuhu...', "<32>* Vamos só pretender que isso nunca aconteceu, que tal, amores?"]
                    : ['<32>{#p/basic}* Ahuhuhuhu...', '<32>* Isso foi legal!\n* Vejo vocês depois, amores!'],
        muffet2: () =>
            badSpider()
                ? ['<25>{#p/kidd}{#f/4}* Yo... Isso foi estranho...']
                : SAVE.data.b.flirt_muffet
                    ? ["<25>{#p/kidd}{#f/4}* Yo... pelo menos acabou, agora?"]
                    : ['<25>{#p/kidd}{#f/4}* Yo... não foi nem um pouco legal.'],
        muffetGeno1: () =>
            SAVE.data.n.state_foundry_kidddeath < 1
                ? ['<25>{#p/kidd}{#f/4}* Yo...\n* O que aconteceu?', '<25>* Ela... {%}']
                : [
                    '<25>{#p/kidd}{#f/4}* Yo... ela acabou de...',
                    '<25>* Como que os monstros continuam desaparecendo assim? {%}'
                ],
        muffetGeno1x: ["<32>{#p/basic}* Ela está morta."],
        muffetGeno2: [
            "<25>{#p/kidd}{#f/7}* N-não...\n* Eu não queria...",
            "<25>{#f/7}* E-ela não... não...\n* Ela estava...",
            "<25>{#f/4}* Não, isso...\n* N-não pode serm...",
            '<25>{#f/4}* Ela estava...',
            '<25>{#f/8}* Estava...'
        ],
        muffetGeno3: ['<25>{#f/8}* ...', '<25>{#f/8}* ... o que eu fiz...'],
        mushroomdance1: ['<32>{#p/basic}* Dança do cogumelo\n* Dança do Cogumelo\n* O que pode significar'],
        mushroomdance2: () =>
            SAVE.data.n.plot === 72
                ? SAVE.data.b.f_state_mushroomdanceEpilogue
                    ? ['<32>{#p/basic}* Isso significa que o futuro é realmente muito incerto.']
                    : SAVE.data.b.f_state_mushroomdanceGeno
                        ? [
                            "<32>{#p/basic}* Significa que estou livre.\n* Eles vão me transplantar para o novo mundo.",
                            '<32>* Mas por que você deveria se importar?\n* A menos que...',
                            '<32>* ... A não ser que você tenha absolvido sua alma dos pecados?'
                        ]
                        : [
                            "<32>{#p/basic}* Significa que estou livre.\n* Eles vão me transplantar para o novo mundo.",
                            '<32>{#p/basic}* Adeus, velho Outpost, pois você tem sido minha morada...'
                        ]
                : world.meanie || SAVE.data.s.state_foundry_deathroom === 'f_village' // NO-TRANSLATE

                    ? SAVE.data.b.f_state_mushroomdanceGeno
                        ? ["<32>{#p/basic}* Significa... não fale comigo."]
                        : [
                            "<32>{#p/basic}* Significa que você viveu uma vida de pecados.",
                            ...(SAVE.data.b.f_state_mushroomdance ? ["<32>* Pera aí.\n* Você não foi legal antes?"] : [])
                        ]
                    : SAVE.data.b.f_state_mushroomdance
                        ? [
                            '<32>{#p/basic}* Se apenas eu pudesse ver além da galáxia.',
                            '<32>* Mas mesmo se o escudo de força for destruído, como eu poderia sair...?'
                        ]
                        : [
                            '<32>{#p/basic}* Isso significa minha tormenta interna, preso aqui por minhas hifas.',
                            '<32>* Minha luta para me afastar.\n* Minha luta para escapar.\n* Mas, sem sucesso.'
                        ],
        musicbox: [
            '<18>{#p/asriel1}{#v/1}{#i/4}Parece que veio daqui...',
            "<18>Oh! Você caiu aqui, não foi...",
            '<18>Você está bem?',
            '<18>Aqui, levanta...',
            '<18>...',
            '<18>$(name), huh?',
            "<18>Este é um lindo nome.",
            '<18>{*}{#x1}{#p/asriel3}{#i/18}Meu nome é   {%}'
        ],
        napcomputer1: () =>
            postSIGMA()
                ? ["<32>{#p/basic}* Está fora de serviço."]
                : [
                    SAVE.data.b.svr
                        ? '<32>{#p/human}* (Você se move até o computador...)'
                        : '<32>{#p/basic}* O computador está atualmente aberto em um compartilhador de música.',
                    choicer.create('* (Olhar no aplicador?)', 'Sim', 'Não')
                ],
        napcomputer2: ['<32>{#p/human}* (Você decidiu não olhar.)'],
        napcomputer3: {
            a: () => [
                'MTT Tunes - Solarwave.kwac',
                'MTT Tunes - Planetary.kwac',
                SAVE.data.n.plot === 72 ? 'Parting of Ways.kwac' : 'Bad Wolf.kwac',
                'MMSA - Main Theme.kwac',
                !world.genocide && SAVE.data.n.state_starton_papyrus === 1 ? 'papyrus tribute.kwac' : 'funny autotune.kwac',
                'Song of the Stars.kwac'
            ],
            b: () => [
                'COOLSKELETON95',
                'COOLSKELETON95',
                SAVE.data.n.plot === 72 ? '_Sp4ceAdv3ntur3r_' : '_K1ll3rMann3qu1n_',
                'ALPHYS',
                'lazybones.',
                '(Desconhecido)'
            ]
        },
        napcomputer4: {
            a: () => ['Ghost Rave.kwac', 'Spooktune Mashup.kwac'],
            b: () => ['NAPSTABLOOK22', 'NAPSTABLOOK22']
        },
        noTem: ["<32>{#p/tem}* oh não, é um... PEIXES!!"],
        noShroom: ["<32>{#p/basic}* Se liga\n* Se liga\n* Tem um peixe correndo"],
        noTortoise: () =>
            world.population === 0 ? ['<32>{#p/basic}* Wa ha ha...'] : ['<32>{#p/basic}* Corra enquanto você pode, criança!'],
        npc86x: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (O robô parece estar dormindo.)']
                : ["<32>{#p/basic}* Está no modo de sono."],
        npc86z: () =>
            [
                [
                    '<32>{#p/basic}{#npc/a}* Energia familiar detectada em combate.',
                    '<32>{#p/basic}* Ação recomendada... correr.'
                ],
                [
                    '<32>{#p/basic}{#npc/a}* Energia familiar detectada em combate.',
                    '<32>{#p/basic}* Ação recomendada... continuar parado.'
                ],
                [
                    '<32>{#p/basic}{#npc/a}* Energia familiar detectada em combate.',
                    '<32>{#p/basic}* Ação recomendada... desconhecida.'
                ],
                [
                    '<32>{#p/basic}{#npc/a}* Energia familiar detectada em combate.',
                    '<32>{#p/basic}* Ação recomendada... esconder.'
                ]
            ][(SAVE.data.n.state_foundry_npc86_feelings || 3) - 1],
        npc86a: () => [
            '<32>{#p/basic}{#npc/a}* Energia desconhecida detectada.',
            '<32>* Nome... desconhecido.',
            '<32>* Status de relacionamento... estranho.',
            SAVE.data.n.plot < 42.1 ? '<32>* Última interação... inexistente.' : '<32>* Última interação... observando em batalha.',
            '<32>* Processando...\n* Processando...\n* Processando...',
            '<32>* Olá, estranho.\n* Eu sou oito-seis, o bot de entrega para todos os fins',
            '<32>* É longe da minha verdadeira função, mas você gostaria de completar um questionário?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        npc86b: () => [
            '<32>{#p/basic}{#npc/a}* Muito obrigado.\n* As próximas questões seguem.',
            '<32>* \"Das cores vermelha, verde, e azul, qual você prefere?\"',
            choicer.create('* (O que você acha?)', 'Vermelho', 'Verde', 'Azul', 'Não sei')
        ],
        npc86c: [
            '<32>{#p/basic}* Muito obrigado.\n* Sua escolha será gravada no meu banco de memória.',
            '<32>{#p/basic}{#npc/a}* Seu relacionamento agora está configurado para \"conhecido\".'
        ],
        npc86d: () => [
            '<32>{#p/basic}{#npc/a}* Energia familiar detectada.',
            '<32>* Nome... desconhecido.',
            '<32>* Status de relacionamento... conhecido.',
            SAVE.data.n.state_foundry_npc86 === 1
                ? '<32>* Última interação... questionário recusado.'
                : '<32>* Última interação... questionário aceito.',
            '<32>* Processando...\n* Processando...\n* Processando...',
            '<32>* Olá de novo, conhecido.\n* Como está indo seu dia?',
            choicer.create('* (O que você acha?)', 'Bom', 'Ruim', 'Normal', 'Não sei')
        ],
        npc86e: () => [
            ...[
                ['<32>{#p/basic}{#npc/a}* Bem?\n* Isso é ótimo de ouvir.'],
                ['<32>{#p/basic}{#npc/a}* Ruim?\n* Espero que as coisas fiquem melhor.'],
                ['<32>{#p/basic}{#npc/a}* Normal?\n* É compreensível.'],
                ['<32>{#p/basic}{#npc/a}* Não tem certeza?\n* É... compreensível.']
            ][choicer.result],
            '<32>{#p/basic}{#npc/a}* Seu status de relacionamento agora foi configurado para \"amigo\".'
        ],
        npc86f: () => [
            '<32>{#p/basic}{#npc/a}* Energia familiar detectada.',
            '<32>* Nome... desconhecido.',
            '<32>* Status de relacionamento... amigo.',
            '<32>* Última interação... perguntado sobre o dia.',
            '<32>* Processando...\n* Processando...\n* Processando...',
            [
                '<32>* Olá de novo, amigo. Espero que seu humor tenha se mantido desde nossa última interação.',
                '<32>* Olá de novo, amigo. Espero que seu humor tenha melhorado desde nossa última interação.',
                '<32>* Olá de novo, amigo.\n* Baseado na nossa última interação...',
                '<32>* Olá de novo, amigo.\n* Baseado na nossa última interação...'
            ][SAVE.data.n.state_foundry_npc86_mood - 1],
            '<32>* Parece que você tem muito interesse por mim.',
            '<32>* Que emoção você normalmente sente em relação a mim?',
            choicer.create('* (O que você acha?)', 'Amor', 'Desprezo', 'Nenhuma', 'Não sei')
        ],
        npc86g: () =>
            [
                [
                    '<32>{#p/basic}{#npc/a}* ...',
                    '<32>* Seu relacionamento foi configurado para \"bestie\".',
                    '<32>* Eu também te amo, bestie.'
                ],
                [
                    '<32>{#p/basic}{#npc/a}* ...',
                    '<32>* Seu relacionamento foi configurado para \"inimigo\".',
                    '<32>* Eu necessito mais de você, inimigo.'
                ],
                [
                    '<32>{#p/basic}{#npc/a}* ...',
                    '<32>* Seu relacionamento foi alterado de volta para \"conhecido\".',
                    '<32>* Talvez essa não tenha sido uma boa ideia, conhecido.'
                ],
                [
                    '<32>{#p/basic}{#npc/a}* ...',
                    '<32>* Seu status de relacionamento não foi alterado.',
                    ...(SAVE.data.n.state_foundry_npc86 === 5 && SAVE.data.n.state_foundry_npc86_feelings === 4
                        ? ['<32>* A resposta esperada para todas as perguntas agora está definida como \"Não tenho certeza.\"']
                        : [])
                ]
            ][choicer.result],
        npc86h: () => [
            '<32>{#p/basic}{#npc/a}* Energia familiar detectada.',
            '<32>* Nome... desconhecido.',
            [
                '<32>* Status de relacionamento... bestie.',
                '<32>* Status de relacionamento... inimigo.',
                '<32>* Status de relacionamento... conhecido.',
                '<32>* Status de relacionamento... amigo.'
            ][SAVE.data.n.state_foundry_npc86_feelings - 1],
            SAVE.data.b.f_state_done86
                ? [
                    '<32>* Última interação... demonstrando apreciação.',
                    '<32>* Última interação... recusou conversar.',
                    '<32>* Última interação... conversou um pouco.',
                    '<32>* Última interação... conselho entregue.'
                ][SAVE.data.n.state_foundry_npc86_feelings - 1]
                : '<32>* Última interação... questionado sobre sentimentos.',
            '<32>* Processando...\n* Processando...\n* Processando...',
            [
                [
                    '<32>* Olá de novo, bestie.\n* Eu espero que você esteja bem.',
                    '<32>* Olá de novo, bestie.\n* Eu te amo de verdade.',
                    '<32>* Olá de novo, bestie.\n* É bom te ver novamente.'
                ],
                [
                    '<32>* ...\n* Não volte a falar comigo.',
                    '<32>* ...\n* Não volte a falar comigo.',
                    '<32>* ...\n* Não volte a falar comigo.'
                ],
                [
                    '<32>* Olá de novo, conhecido.\n* A fábrica está mofada hoje.',
                    '<32>* Olá de novo, conhecido.\n* A luz das estrelas estão glamourosas hoje.',
                    '<32>* Olá novamente, conhecido.\n* O vapor está úmido hoje.'
                ],
                [
                    '<32>* Olá de novo, amigo.\n* Lembre-se de comer alguma coisa.',
                    '<32>* Olá de novo, amigo.\n* Lembre-se de descansar as vezes.',
                    '<32>* Olá de novo, amigo.\n* Lembre-se de desabafar quando preciso.'
                ]
            ][SAVE.data.n.state_foundry_npc86_feelings - 1][rng.dialogue.int(3)]
        ],
        npcinter: {
            grandmuffdarkened: pager.create(
                0,
                () =>
                    SAVE.data.n.state_foundry_muffet === 2
                        ? [
                            ...(world.population < 6 && world.bullied
                                ? [
                                    "<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Não ligo para quantos monstros você bullinou, com esse dinheiro, eu faço o que bem entendo~"
                                ]
                                : [
                                    '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Seu pagamento para mim significa mais do que você imagina~'
                                ]),
                            '<32>* Obrigado por suas generosas doações, amorzinho~',
                            '<32>* Se você ou seu amigo sem braço precisarem de qualquer coisa, é só me dizer~'
                        ]
                        : [
                            "<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* É uma tristeza que não consegui te capturar da primeira vez~",
                            ...(world.population < 6 && world.bullied
                                ? ['<32>* Um bully como você teria sido um prêmio maravilhoso~']
                                : ["<32>* Pois bem~\n* Agora que o escudo de força se foi, eu não terei que fazer isso~"])
                        ],
                [
                    '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Oh, querido~\n* Quando o clã das aranhas aterrissar no novo mundo...',
                    "<32>* Teremos tantos recursos naturais para explorar~",
                    "<32>* Nós iremos construir o maior império de chá que o novo mundo vai ver~"
                ],
                [
                    '<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Oh, e se eu puder fazer acontecer...',
                    "<32>* Ele será o único império de chá que o novo mundo verá~\n* Ahuhuhu~"
                ],
                ['<32>{#p/basic}{#s/spiderLaugh}{#npc/a}* Ahuhuhu~']
            ),
            f_dogenpc: pager.create(
                0,
                () =>
                    SAVE.data.n.state_foundry_doge === 2
                        ? [
                            ...(world.population < 6 && world.bullied
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Eu sei que você tem sido violento, mas eu aprecio a compaixão demonstrada por mim.'
                                ]
                                : ['<32>{#p/basic}{#npc/a}* Obrigado pela compaixão que você tem mostrado pra mim.']),
                            '<32>* É o que eu precisava para ver o erro na minha escolha de carreira.',
                            "<33>* Ainda vou manter o uniforme.\n* Ele fica bem em mim."
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Eu me arrependo de ter deixado você passar por mim, mas após o que você fez, tudo bem.",
                            ...(world.population < 6 && world.bullied
                                ? ['<32>* Eu irei apagar da minha mente suas... tendências violentas por um momento.']
                                : ['<32>* Recordarei o teu nome por muitos séculos.'])
                        ],
                [
                    '<32>{#p/basic}{#npc/a}* Eu me desculpo por ter te julgado de forma errônea, Frisk.',
                    '<32>* Como um membro do esquadrão de ELITE, era difícil para mim ver o bem em você.'
                ],
                [
                    '<32>* Bom.\n* A muito do que eu devo refletir, agora.',
                    '<32>* Eu apreciarei se você me der o tempo e o espaço para tal.',
                    '<33>* Obrigado pela conversa.'
                ],
                ['<32>{#p/basic}{#npc/a}* Até a próxima.']
            ),
            f_clamgirl: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Assim que eu decido ficar em um lugar, nós todos vamos embora.',
                            '<32>* A ironia da situação ainda não me espaçou.\n* Ainda assim, é pelo melhor.',
                            "<32>* No novo mundo, eu vou ter certeza de encontrar muitos novos vizinhos."
                        ]
                        : SAVE.data.n.plot === 47.2
                            ? ["<32>{#p/basic}{#npc/a}* Er, ela ainda está atrás de você."]
                            : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                                ? ['<32>{#p/basic}{#npc/a}* Você não deveria ter vindo.']
                                : SAVE.data.n.state_foundry_undyne === 1
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Eu sinto um distúrbio na aura próxima...',
                                        "<32>* Você realmente não deveria ter deixado aquela garota sozinha."
                                    ]
                                    : SAVE.data.n.state_foundry_undyne === 2
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* Eu sinto um distúrbio na aura próxima...',
                                            '<32>* Você deveria ter deixado aquela garota em paz.'
                                        ]
                                        : 2 <= SAVE.data.n.plot_date
                                            ? [
                                                '<32>{#p/basic}{#npc/a}* Eu sinto um distúrbio na aura próxima...',
                                                '<32>* Você e meu novo vizinho estão se dando bem.'
                                            ]
                                            : SAVE.data.n.plot > 47.2 && SAVE.data.n.plot_date > 1
                                                ? world.trueKills > 0
                                                    ? ['<32>{#p/basic}{#npc/a}* Papyrus está esperando aqui perto.', "<32>* Ele não é corajoso?"]
                                                    : ['<32>{#p/basic}{#npc/a}* Papyrus está esperando aqui perto.', "<32>* Você não vai conhecer meu novo vizinho?"]
                                                : [
                                                    "<32>{#p/basic}{#npc/a}* Eu estou visitando a Foundry da Cidadela, por acaso.",
                                                    "<32>* Lá, eu mal conhecia pessoas, mas aqui, eu já fiz tantos vizinhos amigáveis.",
                                                    "<32>* Eu não acho que vou sair daqui tão cedo."
                                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Não seria esplêndido?"]
                        : SAVE.data.n.plot === 47.2
                            ? ["<32>{#p/basic}{#npc/a}* Er, ela ainda está atrás de você."]
                            : SAVE.data.n.state_foundry_undyne > 0
                                ? ['<32>{#p/basic}{#npc/a}* ...']
                                : 2 <= SAVE.data.n.plot_date
                                    ? ['<32>{#p/basic}{#npc/a}* Bons vizinhos são difíceis de se encontrar.']
                                    : SAVE.data.n.plot > 47.2 && SAVE.data.n.plot_date > 1
                                        ? world.trueKills > 0
                                            ? ['<32>{#p/basic}{#npc/a}* ...']
                                            : [
                                                "<32>{#p/basic}{#npc/a}* Vai lá. Ela não vai te morder.\n* Talvez ela te jogue algumas lanças, mas faz parte."
                                            ]
                                        : ['<32>{#p/basic}{#npc/a}* Ter vizinhos é legal.']
            ),
            f_echo1: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/undyne}* Cidadãos da Foundry...',
                        '<32>* ... Todos vocês já deveriam saber o que aconteceu com vocês agora.',
                        "<32>* É hora de ir, e vocês sabem muito bem disso, caramba.",
                        "<32>* Então vamos indo.",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/undyne}* Escutem, todos vocês!\n* O escudo de força se foi!\n* Podemos todos ir para casa!",
                            "<32>* Se você ainda estiver por aí vacilando quando já tivermos ido embora...",
                            "<32>* Então... provavelmente vamos voltar para te buscar mais tarde.",
                            "<32>* Mas não nos obrigue a isso!",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/undyne}* Cidadãos da Foundry!\n* Se vocês estão ouvindo isso, então sumam daí agora!",
                                world.genocide
                                    ? "<32>* A um par de assassinos na região e eles NÃO mostrarão piedade!"
                                    : "<32>* A um assassino na região e ele NÃO mostrará piedade!",
                                "<32>* Vocês foram avisados!!",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielEcho1++ < 1
                                    ? ['<25>{#p/asriel2}{#f/2}* Obrigado, Undyne.\n* Eu estava me cansando de avançar em pessoas.']
                                    : [])
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* Skrubby da equipe de fundição.\n* Precisa de você para verificar se há fuga na tubulação.',
                                "<32>{#p/alphys}* Oh-uh... d-desculpa, ah!\n* Eu estava meio ocupada no momento!",
                                '<32>{#p/basic}* Okie.\n* Eu perguntar pra Raddy.\n* Bigado por nada.',
                                "<32>{#p/alphys}* D-de nada?",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo2: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/basic}* Ei... tudo vai ficar bem, carinha.",
                        '<32>* (Gerson?)\n* (É você de novo?)',
                        '<32>* Oh, eu não sei.\n* É realmente você, Burgie?\n* Wa ha ha.',
                        "<32>* (É, é.)\n* (Eu só estou um pouco assustado... igual todo mundo.)",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/basic}* Bem, você a ouviu!\n* Hora de ir, carinha!',
                            "<32>{#p/basic}* ... wa ha ha.\n* Na verdade, ainda temos o resto do dia.",
                            "<32>{#p/basic}* (É, eu vou ficar aqui por um pouco mais de tempo.)",
                            "<32>{#p/basic}* (Quem sabe?)\n* (Talvez Frisk venha.)",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* Ei criança, você ouviu o aviso na transmissão?',
                                '<32>* (Abaixa sua voz!)\n* (... então ele é tipo, um humano ou alguma coisa?)',
                                '<32>* Sem dúvidas.',
                                "<32>* (Que figura.)\n* (É bem paia ter que evacuar.)",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#s/phone}* Ring, ring...',
                                '<32>{#p/basic}* Ei garoto!\n* Só queria verificar como está essa sua nova loja.',
                                "<32>* Ouvi dizer que ocê está indo muito do bem!",
                                "<32>* (...)\n* (É meio difícil pra mim falar agora.)",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo3: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/basic}* Tô ouvindo.\n* Ei, talvez eu possa ajudar se ocê me dizer o que viu.",
                        '<32>* Do seu ponto de vista.',
                        '<32>* (Bem...)\n* (Tudo começou quando...)',
                        '<32>* (Eu estava no escudo de força com vários outros.)',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* Isso seria um prazer!\n* Eu sei que com certeza gostaria de vê-los.",
                            "<32>{#p/basic}* É meio difícil de imaginar, não é?\n* Ser salvo por um humano?",
                            "<32>{#p/basic}* (Eu sei, correto?)\n* (E todos aqueles outros humanos... estão vivos, também.)",
                            "<32>{#p/basic}* (Que dia maluco esse tem sido.)",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* Evacuar? Sem chance!\n* Tu tá muito bem onde tu tá, na verdade.",
                                "<32>* (Uh... você entende que eu estou literalmente a mercê aqui, certo?)",
                                "<32>* Isso pode ser verdade.\n* Mas tem uma coisa da qual eu sei...",
                                "<32>* Uma coisa que mantém nós vendedores seguros.",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* Huh?\n* Qual o problema?",
                                "<32>* (... você não sabe?)",
                                '<32>* Espera...',
                                "<32>* (É AQUELE maluco.)",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo4: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* (Estávamos todos lá para ver o campo de força ser derrubado.)',
                        "<32>* (Disseram-nos que algo assim poderia acontecer, mas quando chegamos lá...)",
                        '<32>* (A mesma estrela que nós disse para ir ela, estava segurando monstros como vítimas.)',
                        '<32>* Pequena estrela, huh?\n* Eu escutei histórias sobre uma pequena estrela amarela...',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* (Eu me pergunto o que faremos quando chegarmos ao novo mundo.)",
                            "<32>{#p/basic}* (Talvez nós dois possamos abrir um mercado juntos!)\n* (Você venderia as bugigangas...)",
                            "<32>{#p/basic}* E você venderia a comida.\n* Eu gosto do jeito que você pensa sobre isso, garoto!",
                            "<32>{#p/basic}* Mas seria melhor se um de nós vendesse, e o outro cuidasse das finanças.",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* (O quê?)\n* (Essa é a coisa mais besta que eu já ouvi.)",
                                "<32>* É verdade!\n* Eu posso demonstrar se você quiser.",
                                "<32>* (Uh, n-não valeu!)\n* (Eu vou seguir o conselho do meu velho a-amigo!)",
                                "<32>* Wa ha ha.\n* Da pra aprender coisa nova todo dia, num é memo!",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* ... wa ha ha.\n* É o caba que sai por aí vendendo carne, não é?",
                                '<32>* (O que eu vou fazer?)',
                                "<32>* Tá tudo bem, carinha.\n* Aquele mercado tem uma porta atrás!",
                                '<32>* (Tem!?!?)',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo5: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/basic}* (Bem, ele é real.)\n* (E ele pensa que ajudamos o humano a derrota-lo...)",
                        "<32>* (Mas ele só acabou pegando as ALMAS de todo mundo, de toda forma.)",
                        "<32>*É aquele super luz branca que eu vi...\n* Eu nem podia me mexer.",
                        "<32>* (Pois é, e parecia bem mais claro na raiz do problema.) \n* (Nós não tínhamos chance.)",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* (Ha. Vamos nos revezar, então.)",
                            "<32>{#p/basic}* (Fazer a mesma coisa o tempo todo fica chato, você não acha?)",
                            "<32>{#p/basic}* Wa ha ha.\n* Talvez eu só esteja velho, mas eu não reclamaria de fazer finanças.",
                            '<32>{#p/basic}* Você pode ter a parte divertida do trabalho, carinha!',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* (Acho que estamos condenados a viver aqui para sempre, huh?)',
                                "<32>* Ei, não subestime a Guarda Real.\n* Eles são fortes!",
                                '<32>* (Você realmente pensa que eles podem parar alguém assim?)',
                                "<32>* Uma criança humana?\n* Eu não sei carinha, talvez seja demais pra aguentar.",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielEcho4++ < 1
                                    ? ['<25>{#p/asriel2}{#f/5}* Hee hee hee...']
                                    : [])
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* (Woah...)\n* (Essa porta leva para o balcão do lado de fora!)',
                                '<32>{#p/basic}* (Eu juro que as estrelas nunca estiveram tão brilhantes...)',
                                '<32>* Huh.\n* Deve ser um campo de distorção ou algo assim.',
                                '<32>* Tome um momento e aprecie enquanto pode!',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo6: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* Então, o que aconteceu depois?',
                        '<32>* (Bem, você deveria saber.) \n* (Essa é a parte que todo mundo sabe.)',
                        '<32>* (Da nossa perspectiva, nós vimos um humano parando ataques...)',
                        '<32>* (Seja lá no que aquela estrela se tornou, estava atacando o humano sem parar.)',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* Eu sinto que parte de mim vai sentir falta desse lugar.",
                            '<32>{#p/basic}* Nós realmente fizemos ele do nosso jeito.',
                            "<32>{#p/basic}* (Você tá brincando, certo?)\n* (Eu não sentir falta desse lugar nem por um segundo.)",
                            "<32>{#p/basic}* (Mas acho que também tive muito mal aqui.)",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* Mas notícias.\n* O humano passou por aqui, não faz muito tempo.',
                                ...(world.genocide
                                    ? [
                                        "<32>{#p/basic}* ... eles tinham um parceiro junto deles, também.",
                                        '<32>{#p/basic}* (Que?)\n* (Quem era?)',
                                        "<32>{#p/basic}* Wa ha ha...\n* Você não vai acreditar."
                                    ]
                                    : [
                                        '<32>{#p/basic}* (Eles estão a caminho então?)',
                                        "<32>{#p/basic}* Claro, mas vai demorar até você vê-los.\n* Sem mencionar a Undyne...",
                                        "<32>{#p/basic}* (Exato, ela vai para-los.)\n* (Ela está no comando da guarda real, a final...)"
                                    ]),
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#s/phone}* Ring, ring...',
                                "<32>{#p/basic}* Desculpa por isso, o sinal de telefone aqui é bem ruim.",
                                '<32>* Você viu algo interessante até o momento?',
                                '<32>* (... bem...)',
                                '<32>* (Que tal uma estrela cadente?)',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo7: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* (Eventualmente, porém, o humano reuniu algum tipo de poder...)',
                        '<32>* (E então...)',
                        '<32>* (... Aquilo... Aconteceu.)',
                        '<32>* Isso... aquilo.\n* O momento em que tudo virou de ponta cabeça, não é?',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* Ei, tá tudo bem.",
                            "<32>{#p/basic}* Em um novo mundo natal... você será capaz fazer o que quiser.",
                            '<32>{#p/basic}* (Sério? Eu pensei que ficaria com você.)',
                            '<32>{#p/basic}* Ah, ocê sabia?\n* Wa ha ha.',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                ...(world.genocide
                                    ? [
                                        "<32>{#p/basic}* (Então, você está me dizendo que essa criança voltou da morte?)",
                                        '<32>{#p/basic}* (Wow.)\n* (Eu sabia que você era maluco, mas isso é outro nível!)',
                                        '<32>{#p/basic}* ... eu mentiria pra você?',
                                        '<32>{#p/basic}* (Bem... te conhecendo... eu acho... que não.)\n* (Hmph.)'
                                    ]
                                    : [
                                        '<32>{#p/basic}* (O que devemos fazer no meio tempo?)',
                                        "<32>{#p/basic}* Oh, você sabe, apenas o habitual jiggery-pokery, eu acho.",
                                        '<32>{#p/basic}* (Você e seu jeito estranho de dizer.)',
                                        '<32>{#p/basic}* Wa ha ha, você sabe!'
                                    ]),
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* Oh!\n* Faça um pedido, carinha!',
                                "<32>* (...)\n* (Nunca se torna realidade.)",
                                '<32>* ... liberdade, huh?\n* Wa ha ha... eu tenho boas notícias para você.',
                                '<32>* Eu acabei de ver um humano passar por aqui.',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo8: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* Eu lembro um pouco.\n* O poder mudou de mãos... o humano estava em controle.',
                        '<32>* (É, e então ele começou a nos atacar!)\n* (Eu pensei que estávamos...)',
                        '<32>* Mortos?',
                        "<32>* (É, e é como se eu pudesse sentir aquele medo.)\n* (Todos estavam temendo.)",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/basic}* (Para quem mais eu vou?)\n* (As meninas?)',
                            '<32>{#p/basic}* Hmm...\n* Eu entendo seu ponto.',
                            "<32>{#p/basic}* (Você é o único com o qual eu posso desabafar, velho amigo.)",
                            "<32>{#p/basic}* (Construir esta loja para fazer graça do Mettaton foi divertido, mas é hora de uma mudança.)",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/basic}* (Ei... se nós nunca sair daqui...)',
                                '<32>* (Talvez... podemos sair para um almoço juntos?)',
                                "<32>* Huh?\n* Claro, carinha!\n* Eu não vejo o porquê não!",
                                "<32>* Isso nos dará algo pelo que esperar.",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* (Então é verdade...)\n* (A liberdade realmente está vindo.)",
                                '<32>* Assumo que sim.',
                                "<32>* (Acho que tudo graças ao rei, então, huh?)",
                                '<32>* ... se for esse o caso.',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echo9: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* É... eu me lembro.',
                        "<32>* (Olha, aconteça o que acontecer...)\n* (Estou feliz que você esteja seguro, seu velho tartaruga gordo.)",
                        "<32>* Wa ha ha... meu garoto.",
                        '<32>* (... quando formos para o novo mundo, você gostaria de... ir jantar?)',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* Aquele robô... não sei se ele vai conseguir manter popularidade no novo mundo.",
                            '<32>{#p/basic}* Mas ei, se ele ficar pobre, podemos lembrá-lo de o quão bem estamos sem seus shows.',
                            "<32>{#p/basic}* (Senhor, você é ainda mais duro que eu quando se trata dele!)",
                            "<32>{#p/basic}* (... se ele vier a nossa loja, nós cobraremos dele o dobro.)",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* (Obrigado, velho amigo...)\n* (... por um segundo eu esqueci nossos problemas.)",
                                '<32>* Wa ha ha...\n* Prazer em poder ajudar.',
                                '<32>* E mesmo se nunca sairmos daqui...',
                                '<32>* ... talvez possamos ir em um almoço de toda forma.',
                                "<32>* (É...)\n* (Seria legal.)",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/basic}* (Se chegar a isso...?)\n* (Qual é a alternativa, deixar-los livres?)",
                                '<32>* Eu não sei.\n* Deseja ter todas as respostas.',
                                "<32>* (Espera...)\n* (Existe algo que o rei não tenha nos contado!?)",
                                '<32>* Wa ha ha...\n* Falo com você depois, carinha.',
                                '<32>* (... huh!?!?)',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echoAbyss1: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/basic}* Eu não sei onde estou...",
                        '<32>* Eu estava só lavando a louça, mas do nada apareceu essa luz branca...',
                        "<32>* Agora é como... se eu estivesse em um tipo de limbo...",
                        '<32>* Por favor... me ajuda...',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/13}* ...'] : [])
                    ]
                    : geno()
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* Eu acho que tem um bicho papão vindo na nossa direção...",
                            '<32>{#p/undyne}* Doggo?\n* É você?',
                            "<32>{#p/basic}* É... eles estão quase lá...\n* Woah!",
                            '<32>{#p/basic}* (Ahem!)\n* Alguma coisa se moveu?\n* Foi minha imaginação?',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/radio}{#v/1}* Oooooooooolá todo mundo!\n* Vocês estão escutando A Corrida da Meia-Noite!',
                            '<32>{#p/alphys}* (Mas que-)\n* (O que é isso?)',
                            '<32>{#p/radio}{#v/1}* É o dia quinze de setembro de dois mil e, bem, não aconteceu muita coisa hoje.',
                            "<32>{#p/alphys}* (É um tipo de sistema de comunicação... deve ser datado de centenas de anos!)",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ],
            f_echoAbyss2: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* Senhor, onde eu poderia estar...',
                        '<32>* Nós estávamos fora caçando lixo, mas do nada veio essa luz.',
                        "<32>* Catty pensa que estamos em algum tipo de sonho compartilhado...",
                        "<32>* Mas, tipo, não seríamos capazes de acordar?",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/15}* ...'] : [])
                    ]
                    : world.genocide
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<23>{#p/papyrusnt}UNDYNE, VOCÊ ESTÁ AÍ?\nMEU IRMÃO...\nELE...",
                            '<33>{#p/undyne}* O que foi, Papyrus?',
                            '<23>{#p/papyrusnt}...',
                            '<32>{#p/undyne}* Papyrus?',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/sans}{#f/7}* ei, sem querer incomodar você, mas acho que Starton já deveria estar evacuada.',
                                "<32>{#p/undyne}* Huh?\n* É sobre isso?",
                                '<32>{#p/sans}{#f/7}* ...',
                                '<32>{#p/undyne}* Não... gostando exatamente do tratamento de silêncio...',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/radio}{#v/0}* Nada demais aconteceu!?\n* Você perdeu a cabeça.",
                                '<32>{#p/alphys}* (Hmm...)',
                                '<32>{#p/radio}{#v/0}* ALIENS do mundo vizinho irão vir visitar o planeta hoje!',
                                "<32>{#p/alphys}* (Acho que eu vou ouvir um pouquinho, Ehehe.)",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                                ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd2
                                    ? ((SAVE.data.b.f_state_dc_kidd2 = true),
                                        [
                                            '<25>{#p/kidd}{#f/7}* Planeta vizinho?\n* Poderia isso ser...',
                                            '<25>{#f/2}* ... s-sem chance.'
                                        ])
                                    : [])
                            ],
            f_echoAbyss3: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/toriel}{#f/21}* Minha criança... você está aí?',
                        '<32>* Aquele Twinkly...',
                        "<32>* Eu deveria saber que ele causaria problemas, mas...",
                        "<32>* Mais uma vez... eu falhei em ver a realidade que estava em minha frente.",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/16}* ...'] : [])
                    ]
                    : geno()
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            ...(SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}* Ajuda!\n* Meu amigo Stardrake sumiu...",
                                    '<32>{#p/basic}* Ele saiu para encontrar inspiração para piadas, e nunca mais voltou!',
                                    "<32>{#p/undyne}* Fique aqui, criança.\n* Eu vou mandar uma equipe de procura."
                                ]
                                : [
                                    "<32>{#p/basic}* Ajuda!\n* Meu amigo Stardrake está em perigo...",
                                    '<32>{#p/basic}* Ele disse ter visto um humano lá fora!',
                                    '<32>{#p/undyne}* Fique aqui, criança.\n* A Guarda Real vai cuidar disso.'
                                ]),
                            '<32>{#p/basic}* Muito obrigado... Undyne...',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                            ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd3
                                ? ((SAVE.data.b.f_state_dc_kidd3 = true),
                                    ['<25>{#p/kidd}{#f/3}* Woah, uh... isso é meio assustador, haha...', '<25>{#f/4}* ...'])
                                : [])
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/radio}{#v/1}* Okay, mas sem pânico!\n* Nós não vamos deixá-los passar por nós dessa forma, certo?",
                            '<32>{#v/0}* Você diz isso como se dissesse literalmente.',
                            '<32>{#v/1}* E se eu estiver?',
                            '<32>{#v/0}* Bem, eu acho que esses aliens podem ser bons aliens.\n* Eles parecem bem legais.',
                            '<32>{#v/0}* Eles trouxeram aquela máquina de tradução então podemos entende-los!',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ],
            f_echoAbyss4: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<23>{#p/papyrusnt}HUH? O QUE TEM DE ERRADO EM PENSAR QUE TUDO ESTÁ BEM?",
                        '<33>{#p/without}* bem, pelo que eu vejo...',
                        "<32>{#p/without}* Você só está evitando o problema.",
                        "<23>{#p/papyrusnt}UGH... TALVEZ VOCÊ ESTEJA CERTO. AS COISAS PARECEM BEM... {@fill=#ff0}TENEBROSAS{@fill=#fff}.",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/23}* ...'] : [])
                    ]
                    : geno()
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/undyne}* Isso não é um treinamento, nem qualquer bobeira... saí daí antes de ser ferido!",
                            "<32>{#p/basic}* Eu não me importo com isso. Eu vou fazer minha batalha pelo bem do Outpost!",
                            "<32>{#p/basic}* Se você quer tanto assim lutar, por que você não vem aqui e faz isso logo?",
                            '<32>{#p/undyne}* Dogamy!!',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                            ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd4
                                ? ((SAVE.data.b.f_state_dc_kidd4 = true),
                                    [
                                        "<25>{#p/kidd}{#f/1}* Cara, a Guarda Real não é brava?",
                                        "<25>{#f/3}* Estou feliz que temos eles para nos proteger...!"
                                    ])
                                : [])
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/radio}{#v/1}* É, E...\n* Se vamos ser todos paz e amor com os E.T. aqui...",
                            '<32>{#v/1}* Vamos ter que fazer melhor do só chegar andando e dizer \"Olá.\"',
                            "<32>{#v/0}* ... esse não era o jeito favorito do Erogot de dizer oi?",
                            "<32>{#v/0}* Ele com certeza tem algo com filmes ocidentais, sem dúvida.",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                            ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd4
                                ? ((SAVE.data.b.f_state_dc_kidd4 = true),
                                    ['<25>{#p/kidd}{#f/1}* Erogot?', '<25>{#f/1}* REI Erogot!?', '<25>{#f/3}* Cara...'])
                                : [])
                        ],
            f_echoAbyss5: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/kidding}* Yo... que lugar é esse?',
                        "<32>* É muito escuro, não consigo ver nada...",
                        "<32>* Eu estou com medo...",
                        '<32>* Tem alguém aí?\n* Por favor... alguém me ajuda...',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/22}* ...'] : [])
                    ]
                    : world.genocide
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/alphys}* Como está indo o novo corpo?",
                            '<32>{#p/mettaton}* ATÉ QUE BOM. EU ESTAVA PRESTES A PROCURAR POR PARTES MECÂNICAS LÁ EM BAIXO.',
                            "<32>{#p/alphys}* Parece b-bom.\n* Eu vou continuar trabalhando na distribuição de poder.",
                            "<32>{#p/mettaton}* NÃO SE PREOCUPE DOUTORA.\n* TEMOS TEMPO DE SOBRA.",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/alphys}* Como eu posso...\n* Só sentar aqui e deixar acontecer?',
                                "<32>{#p/mettaton}* BEM... O QUE MAIS VOCÊ PODE FAZER?\n* VOCÊ NÃO SABE LUTAR.",
                                "<32>{#p/mettaton}* SE VOCÊ FOR LÁ FORA AGORA, VOCÊ MORRERÁ, E PERDEREMOS ALGUÉM DE MUITO VALOR.",
                                '<32>{#p/alphys}* Por que... por que isso sempre acontece comigo...',
                                "<32>{#p/mettaton}* ... PARA SER JUSTO, ASSISTIR PESSOAS MORRENDO NUNCA ACONTECEU CONTIGO.",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<33>{#p/radio}{#v/0}* Só entre nós, alguns deles são fofos.',
                                '<32>{#v/1}* Uh... okay?',
                                "<32>{#v/0}* O que? Eu não disse desse jeito. Eu só quis dizer que eles são adoráveis.",
                                '<32>{#v/0}* Do mesmo jeito que um pet seria.',
                                "<32>{#v/1}* ...\n* Nós temos um ouvinte escutando a estação.",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echoAbyss6: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/alphys}* Que estranho...',
                        '<32>* Então nossas ALMAS foram absorvidas dentro de outro ser.',
                        '<32>* Este poderia ser um tipo de \"plano separado\" onde somos mantidos antes...',
                        '<32>* ... espera.\n* Deve haver o-outra forma de contatar os outros!',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/10}* ...'] : [])
                    ]
                    : geno()
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            world.genocide
                                ? "<32>{#p/basic}* Asriel e o humano estão a caminho. Eu vou confronta-los assim que eles passarem."
                                : "<32>{#p/basic}* O humano está a caminho.\n* Eu vou confronta-lo assim que ele passar aqui.",
                            "<32>{#p/undyne}* Eu confio que você sabe onde está se metendo, Doge.",
                            dogex()
                                ? '<32>{#p/basic}* Eles são responsáveis pelas mortes em Starton.\n* Eu não mostrarei piedade!'
                                : world.dead_canine
                                    ? "<32>{#p/basic}* Aqueles responsáveis pela morte dos meus companheiros não serão perdoados!"
                                    : '<32>{#p/basic}* Este é o momento pelo qual preparei toda minha vida!\n* Eu não irei recuar!',
                            "<32>{#p/undyne}* Isso aí! Vai lá e mostra do que o esquadrão de ELITE é feito!",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/radio}{#v/0}* Olá, querido ligador, A Corrida da Meia-Noite.\n* Tem algo para gente?',
                            "<32>{#p/human}* É, eu tenho algumas palavras.\n* Na verdade, nós humanos não estamos preparados para isso.",
                            "<32>{#p/radio}{#v/0}* O que você quer dizer?\n* Que humanos não são capazes de compreender aliens?",
                            "<32>{#p/human}* ... você é inocente.\n* Eu não estou preocupado com os humanos, mas com os aliens.",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ],
            f_echoAbyss7: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* Onde estou?\n* Que lugar é esse?',
                        "<32>{#p/alphys}* Alô?\n* É a Doutora Alphys, eu estou... tentando algo!",
                        "<32>{#p/basic}* Dr. Alphys!\n* Eu estou aqui, pode me ouvir?",
                        "<32>{#p/alphys}* Sim... sim!\n* Eu só tenho que pensar sobre eles... e eu estou lá!",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/21}* ...'] : [])
                    ]
                    : geno()
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/basic}* Skrubby da equipe de fundição.\n* Preocupado com as situações em relação ao ser humano.',
                            '<32>{#p/alphys}* E-ei, uh...\n* Undyne deve ajudar muito melhor... do que eu...',
                            '<32>{#p/basic}* Concordo.\n* Você é bem inútil.',
                            '<32>{#p/alphys}* G-grosso...',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/radio}{#v/1}* Ah, qual foi. Nós não somos ameaça para eles. Eles tem todas as cartas!",
                            "<32>{#p/human}* Claro, mas você vê o jeito que eles agem?\n* São legais demais...",
                            "<32>* Eu sei que vocês dois não vão fazer nada, mas algum humano vai tomar vantagem disso.",
                            '<32>{#p/radio}{#v/1}* É... sim...',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ],
            f_echoAbyss8: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        '<32>{#p/basic}* Meu nome é Thomas Roman.\n* Cientista real e associado de confiança da coroa.',
                        "<32>{#p/alphys}* Professor Roman?\n* Mas você...",
                        '<32>{#p/basic}* Meu nome é Thomas Roman.\n* Cientista real e associado de confiança da coroa.',
                        "<32>{#p/alphys}* Ele está repetindo...\n* Deve ser o professor na mente de todos.",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/3}* ...'] : [])
                    ]
                    : world.genocide
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<23>{#p/papyrusnt}AQUI É O PAPYRUS.\nSINTA-SE LIVRE PARA DEIXAR UMA MENSAGEM!',
                            '<33>{#p/undyne}* Mas que droga...',
                            '<33>{#p/undyne}* Eu jamais deveria ter deixado isso acontecer com você, Papyrus.',
                            '<33>{#p/undyne}* Você e seu irmão merecem mais do que isso.',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/undyne}* ... e até mesmo Doge falhou em capturar o humano.',
                                "<32>{#p/sans}{#f/7}* Eu vou ser honesto, isso não é bom.\n* Evacuar a Foundry?",
                                "<33>{#p/undyne}* Neste ponto todo mundo sabe o que está acontecendo.\n* Eles vão evacuar.",
                                "<32>{#p/sans}{#f/7}* Eu sinto que é melhor estar seguro do que lamentar depois.\n* Mas do que eu sei?",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/radio}{#v/0}* Ei, anime-se.\n* Não deixe aquele cara abaixar seu humor, certo?",
                                "<32>{#v/1}* Mas ele tem um ponto...\n* Para muitos, essa situação deve ser preocupante.",
                                "<32>* E nem a intenção de todo mundo é como a sua... obsessão por pet.",
                                '<32>{#v/0}* Não, espera um pouco!',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ],
            f_echoAbyss9: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/alphys}* Sim, pense em quem você gostaria de ver e você estará com eles.",
                        '<32>{#p/asgore}* Asriel... você está aí?',
                        "<32>{#p/alphys}* Huh, não está funcionando...\n* Talvez não a muito dele restante em nós?",
                        '<32>{#p/asgore}* Por favor... volte...',
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/25}* ...'] : [])
                    ]
                    : geno()
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/undyne}* Posso te pedir um favor?',
                            '<32>{#p/basic}* Ahuhuhu~\n* Qualquer coisa para a capitã da Guarda Real~',
                            world.genocide
                                ? "<33>{#p/undyne}* Prenda o humano e seu cúmplice. Traga-os até mim.\n* Maior pagamento da sua vida."
                                : "<33>{#p/undyne}* Prenda o humano e traga-o até mim.\n* Maior pagamento da sua vida.",
                            "<32>{#p/basic}* Hmmm...\n* Eu vejo o que posso fazer.",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                            ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd9
                                ? ((SAVE.data.b.f_state_dc_kidd9 = true), ['<25>{#p/kidd}{#f/4}* Não AQUELA aranha...'])
                                : [])
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/radio}{#v/1}* Calma, calma.\n* Não existe vergonha em admitir do que você gosta.",
                            "<32>{#v/0}* Não é desse jeito!",
                            "<32>{#v/1}* Falando em amor, enfileire a música de jazz que está explodindo nos clubes...",
                            '<32>{#v/1}* \"Casado com um Alien!\"',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                            ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd9
                                ? ((SAVE.data.b.f_state_dc_kidd9 = true),
                                    ['<25>{#p/kidd}{#f/2}* Pfft, apenas um humano pra vir com um título ASSIM.'])
                                : [])
                        ],
            f_echoAbyss10: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/undyne}* Não consigo continuar segurando...",
                        '<32>{#p/undyne}* Os outros... já escaparam...',
                        "<32>{#p/undyne}* É como se eles já não soubessem quem são...",
                        "<32>{#p/undyne}* Não... não!\n* Não assim...\n* Não posso esquecer quem eu sou!",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                        ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/21}* ...'] : [])
                    ]
                    : world.genocide
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/mettaton}* OH, DOUTORA...',
                            "<32>{#p/mettaton}* EU DEVERIA SABER QUE VOCÊ FUGIRIA DESSA FORMA...",
                            '<32>{#p/mettaton}* ...\n* MAS QUE DROGA...',
                            "<32>{#p/mettaton}* VOCÊ NÃO ENTENDE?",
                            "<32>{#p/mettaton}* NÃO POSSO APERFEIÇOAR ESSAS DEFESAS SEM VOCÊ...",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : geno()
                            ? [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                "<32>{#p/mettaton}* BEM, ELES ESTARÃO AQUI LOGO.\n* EU NÃO SEI O QUE FARIA SE FOSSE VOCÊ, MAS...",
                                '<32>{#p/mettaton}* SEJA MANTER-SE AQUI E LUTAR, OU RECUAR...',
                                "<33>{#p/mettaton}* EU FAREI O MELHOR PARA TE AJUDAR.",
                                '<32>{#p/alphys}* ... ehehe...',
                                '<33>* O mesmo vale para você, Mettaton.',
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                            ]
                            : [
                                '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                                '<32>{#p/alphys}* Espera, espera! \n* Isso seria perfeito para um date com a Undyne...',
                                '<32>{#p/mettaton}* OH, ISSO SERIA?',
                                "<32>{#p/alphys}* Mettaton!? De onde você...\n* ... Eu não estou s-saindo com ninguém!",
                                "<32>{#p/mettaton}* AH, NÃO SE PREOCUPE. SEU SEGREDO ESTÁ SEGURO COMIGO... PROVAVELMENTE.",
                                '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.',
                                ...(world.kiddo && !SAVE.data.b.f_state_dc_kidd10
                                    ? ((SAVE.data.b.f_state_dc_kidd10 = true),
                                        [
                                            '<25>{#p/kidd}{#f/1}* Alphys quer casar com a UNDYNE!?',
                                            '<25>{#f/6}* Você realmente aprende algo novo todo dia...'
                                        ])
                                    : [])
                            ],
            f_echodude: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Com um novo mundo também vem novas estrelas.',
                            '<32>* Essas estrelas sinalizadoras podem ser a menor de nossas preocupações...'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Está é uma estrela sinalizadora.\n* Ela vive de repetir sinais.'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Com esperança as estrelas lá fora são mais honestas.']
                        : ['<32>{#p/basic}{#npc/a}* Nunca confie em uma estrela.', '<32>* Desonestidade é o primeiro de seus princípios.']
            ),
            f_echoLobby: () =>
                world.runaway
                    ? [
                        '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                        "<32>{#p/basic}* Raddy da equipe de fundição.\n* Nós não temos tempo para apresentar um show aqui.",
                        "<32>* Não se preocupe com canos, a menos que você esteja deslizando por eles para escapar!",
                        '<32>* Entendeu, Skrubby?\n* Lata grande?\n* Meu pequenino?',
                        "<32>* Nós temos que ir, possivelmente agora.",
                        '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                    ]
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/basic}* Raddy da equipe de fundição.\n* Todos, vocês tem feito um ótimo trabalho.",
                            "<32>* Agora que estamos livres, podemos todos descansar!",
                            '<32>* Você ouviu isso, Skrubby?\n* Grande lata?\n* Meu pequeno?',
                            "<32>* É hora de uma celebração totalmente tubular!",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/basic}* Skrubby da equipe de fundição.\n* Relatórios sobre o sucesso da manutenção com Raddy.',
                            geno()
                                ? "<32>{#p/alphys}* Isso é... o-ótimo...\n* Olha, e-eu não posso lidar com isso agora, então..."
                                : '<32>{#p/alphys}* Uh... f-feliz que deu tudo certo!',
                            '<32>{#p/basic}* Sem problemas, obrigado por sem cem porcento inútil.',
                            '<32>{#p/alphys}* ... qualquer hora.',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ],
            f_kidd: pager.create(
                0,
                () =>
                    world.genocide
                        ? [
                            '<25>{#p/kidd}{#npc/a}{#f/3}* e-ei...',
                            '<25>{#p/asriel2}{#f/15}{#npc}* Esquisito.',
                            '<25>{#p/kidd}{#npc/a}{#f/1}* ... e-ei, oi!\n* Uh, haha!'
                        ]
                        : SAVE.data.n.plot === 33
                            ? [
                                '<25>{#p/kidd}{#npc/a}{#f/1}* Como foi o almoço?',
                                '<25>{#f/1}* Aquele esqueleto baixinho fez todo mundo rir de novo?'
                            ]
                            : [
                                '<25>{#p/kidd}{#npc/a}{#f/2}* Yo, você tá tentando ver ela também?',
                                "<25>{#f/1}* Haha.\n* Ela é a mais da hora!!",
                                '<25>{#f/2}* Eu quero ser igual ela quando eu crescer...'
                            ],
                () =>
                    world.genocide
                        ? ['<25>{#p/kidd}{#npc/a}{#f/4}* ...']
                        : SAVE.data.n.plot === 33
                            ? ['<25>{#p/kidd}{#npc/a}{#f/3}* Ele sempre é expulso por fazer brincadeiras de mau gosto.']
                            : ['<25>{#p/kidd}{#npc/a}{#f/1}* Pode ir na frente.', "<25>{#f/1}* Eu te encontro mais tarde!"]
            ),
            f_longsy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Meu amigo Shortsy e eu planejamos nos tornar arquitetos no novo mundo.",
                            "<32>* Nós construímos de tudo... o que você conseguir imaginar, nós podemos construir!",
                            "<32>* Como sempre, eu fico encarregado de trazer as ferramentas."
                        ]
                        : SAVE.data.n.plot < 48
                            ? [
                                '<32>{#p/basic}{#npc/a}* Meu amigo Shortsy e eu planejamos construir uma ponte.',
                                "<32>* Ele tem as razões dele, eu pessoalmente só estou cansado de usar aquela plataforma.",
                                "<32>* Vamos esperar que nossa construção fique um pouco melhor que aquilo."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* O que você achou da ponte?\n* Estável?\n* Gravitacionalmente seguro?",
                                "<32>* Bem, Shortsy disse que está boa, e ele é meio que o especialista aqui.",
                                "<32>* Eu basicamente só estou aqui para carregar as ferramentas!"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Shortsy me contou sobre um tipo de ferramenta recentemente...']
                        : SAVE.data.n.plot < 48
                            ? ["<32>{#p/basic}{#npc/a}* Instabilidade e eu não nos damos muito nem.\n* Isso é como eu sou."]
                            : [
                                "<32>{#p/basic}{#npc/a}* Não me entenda errado.\n* Eu sou um fantástico manejador de ferramentas.\n* Esse é apenas quem eu sou."
                            ]
            ),
            f_shortsy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Meu parceiro Longsy e eu queremos ser arquitetos em tempo integral.',
                            "<32>* Eu trouxe uma nova ferramenta para o Longsy usar...",
                            "<32>* ... chamada de varinha do construtor."
                        ]
                        : SAVE.data.n.plot < 48
                            ? [
                                '<32>{#p/basic}{#npc/a}* Meu parceiro Longsy e eu queremos construir uma ponte para impressionar o rei.',
                                "<32>* Vai ser a mais reta e bem estruturada ponte que você já viu.",
                                "<32>* Eu vou ter certeza disso!"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Dá uma olhada na nossa mais nova ponte.',
                                '<32>* Longsy e eu entendemos que isso será o suficiente para impressionar o rei...',
                                "<32>* Precisa ser assim se nós desejamos trabalhar ao lado dele!"
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Com poder o suficiente, poderemos criar tudo que você imaginar...']
                        : SAVE.data.n.plot < 48
                            ? ["<32>{#p/basic}{#npc/a}* Eu estou pronto para fazer nada além do melhor.\n* Esse sou eu."]
                            : [
                                "<32>{#p/basic}{#npc/a}* Não a necessidade de agradecer, é apenas o serviço para a comunidade."
                            ]
            ),
            f_snail1: () =>
                SAVE.data.n.plot === 72
                    ? ["<32>{#p/basic}{#npc/a}* (Lesma, lesma...)\n* Todo está indo embora, é o que parece."]
                    : ['<32>{#p/basic}{#npc/a}* (Lesma, lesma...)\n* Otimismo todo dia...'],
            f_snail2: () =>
                SAVE.data.n.plot === 72
                    ? ["<32>{#p/basic}{#npc/a}* (Lesma, lesma...)\n* É hora de irmos."]
                    : ["<32>{#p/basic}{#npc/a}* (Lesma, lesma...)\n* No fim tudo acabou bem..."],
            f_starkiller: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* O cheiro de grama cresce cada vez mais próximo...',
                            '<33>* Logo, eu irei vê-la por conta própria.'
                        ]
                        : SAVE.data.n.state_foundry_undyne !== 0
                            ? ['<32>{#p/basic}{#npc/a}* Sinto que a grama desbotou.', "<32>* Você não acha...?"]
                            : roomKills().f_telescope > 0
                                ? ['<32>{#p/basic}{#npc/a}* A grama talvez já tenha acabado a muito tempo.', '<32>* Ou eu estou errado...?']
                                : [
                                    "<32>{#p/basic}{#npc/a}* O que é grama?",
                                    ...(world.genocide
                                        ? ['<32>* Ela pode te achar?', '<32>* Pode te comer?', '<32>* Pode te matar?']
                                        : ['<32>* Você pode encontrar?', '<32>* Você pode comer?', '<32>* Você pode matar?']),
                                    '<32>* ...',
                                    '<32>* Você é feito de grama?'
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* A grama pode não sempre estar verde, mas quem disse que precisa ser?',
                            '<32>* Um novo mundo deve ter tantos números de cores para grama.'
                        ]
                        : ["<32>{#p/basic}{#npc/a}* A grama do vizinho nem sempre é a mais verde."]
            ),
            f_temmie1: () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#npc/a}* woa... tem ouviu notícias...\n* MUITO BOAS!!!']
                    : ['<32>{#p/tem}{#npc/a}* hOI!!\n* sou temmie!!!', '<32>* e está é mi amiga...\n* temmie!!!'],
            f_temmie2: () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#npc/a}* yaYA!!!\n* tems vão ser livre!!!']
                    : ['<32>{#p/tem}{#npc/a}* hOI!!\n* sou temmie!!!', '<32>* e está é mi amiga...\n* temmie!!!'],
            f_temmie3: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/tem}{#npc/a}* woa...\n* se tems podem ir para novo mundo, podem fazer,',
                        '<32>{#p/tem}{#npc/a}* MUITAS HISTÓRIAS TEM!!!'
                    ]
                    : ['<32>{#p/tem}{#npc/a}* hOI!!\n* sou temmie!!!', '<32>* Naum esquecer minha amiga!'],
            f_temmie4: () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#npc/a}* Um belo desenvolvimento, não?']
                    : world.genocide || 10 <= world.trueKills
                        ? [
                            ['<32>{*}{#p/tem}{#i/5}{#s.stop}* Eu sei o que você fez.', '{*}{#s.resume}{%}'],
                            ['<32>{#p/tem}{#npc/a}* Oi.', "<32>* Sou Bob."]
                        ][Math.min(SAVE.flag.n._bob++, 1)]
                        : SAVE.data.n.plot === 47.2
                            ? ['<32>{#p/tem}{#npc/a}* Oi.', "<32>* Eu estou com medo da sua vida."]
                            : ['<32>{#p/tem}{#npc/a}* Oi.', "<32>* Sou Bob."],
            f_temmie5: () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#npc/a}* awawawawah!!', '<32>* humanos...\n* são tão...', '<32>* HERÓICOS!!!!']
                    : ['<32>{#p/tem}{#npc/a}* awawawawah!!', '<32>* humanos...\n* são tão...', '<32>* FOFOS!!!!'],
            f_temmie6: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/tem}{#npc/a}* todos estão livres...\n* MAS A TEM!!!',
                        '<32>* TEM NÃO QUER IR!!!\n* TEM QUE OVIN!!!',
                        '<32>* tem terá fabilia febiz,'
                    ]
                    : [
                        '<32>{#p/tem}{#npc/a}* tem... VER OVO!!!',
                        '<32>* OVIN... vou VER!!!',
                        '<32>* tem... PARENTE FELIZ!!'
                    ]
        },
        punchcard0: () =>
            SAVE.data.b.svr ? ['<32>{#p/human}* (Mas a caixa está vazia.)'] : ['<32>{#p/basic}* A caixa está vazia.'],
        punchcard1: ['<32>{#p/basic}* Há um cartão postal na caixa.'],
        punchcard2: ['<32>{#p/basic}* A vários cartões postais na caixa.'],
        punchcard3: () => [choicer.create('* (Pegar cartão postal?)', 'Sim', 'Não')],
        punchcard4: ['<32>{#p/human}* (Você pegou cartão postal.)'],
        punchcardX: () => [
            "<32>{#p/human}* (Você não sabe o que tem na caixa...)",
            choicer.create('* (Pegar alguma coisa?)', 'Sim', 'Não')
        ],
        puzzle1switch: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você parece não conseguir usar mais a alavanca.)"]
                : world.darker
                    ? ["<32>{#p/basic}* Está emperrado, como sempre."]
                    : ['<32>{#p/basic}* A alavanca, meio que surpreendentemente, está emperrado.', '<32>* Que giro de eventos!'],
        puzzle2switch: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você parece não conseguir usar mais a alavanca.)"]
                : world.darker
                    ? ["<32>{#p/basic}* Está emperrado, como sempre."]
                    : ['<32>{#p/basic}* A alavanca está presa.\n* Naturalmente.'],
        puzzle3switch: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você parece não conseguir usar mais a alavanca.)"]
                : world.darker
                    ? ["<32>{#p/basic}* Está emperrado, como sempre."]
                    : [
                        '<32>{#p/basic}* Acredite ou não...',
                        "<32>* A alavanca não está emperrada, só fora de serviço.\n* Que?"
                    ],
        quiche1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Uma nota preso no cheesecake descreve como foi abandonado.)',
                    choicer.create('* (Pegar o cheesecake?)', 'Sim', 'Não')
                ]
                : [
                    "<32>{#p/basic}* Tem um pedaço de cheesecake aqui com uma nota presa.",
                    '<32>* \"Eu só não pude aguentar a responsabilidade.\"',
                    choicer.create('* (Pegar o cheesecake?)', 'Sim', 'Não')
                ],
        quiche2: ["<32>{#p/human}* (Você está carregando demais.)"],
        quiche3: ['<32>{#p/human}* (Você pegou o cheesecake.)'],
        quiche4: () =>
            SAVE.data.b.svr
                ? [
                    [
                        '<25>{#p/asriel1}{#f/24}* Antes de nos movermos, $(name) costumava sentar aqui toda hora...',
                        "<25>{#f/23}* Nós trocamos histórias sobre nossos sonhos e nossas esperanças...",
                        '<25>{#f/22}* E trazíamos o telescópio e observavamos as estrelas às vezes.',
                        '<25>{#f/13}* Mesmo como estrela...\n* Eu desejei ter voltado para estes momentos...'
                    ],
                    [
                        '<25>{#p/asriel1}{#f/23}* Olha pra mim, ficando todo sentimental por causa de um banco aleatório.',
                        "<25>{#f/17}* Mas ei.\n* Pelo menos é resistente.",
                        "<25>{#f/3}* Pois é, nem o grande Asgore pode quebrar.",
                        '<25>{#f/4}* De volta para quando todos vivíamos aqui.'
                    ],
                    [
                        "<25>{#p/asriel1}{#f/13}* É engraçado pensar sobre...",
                        '<25>{#f/13}* A casa em que costumávamos viver, agora é a casa da Undyne.',
                        '<25>{#f/17}* Ou era, até o escudo de força ser destruído.',
                        "<25>{#f/13}* E... não é o seu tipo habitual de casa.\n* É um monstro."
                    ],
                    ['<25>{#p/asriel1}{#f/15}* ... todas as casa monstro foram perdidas na guerra.']
                ][Math.min(asrielinter.quiche4++, 3)]
                : world.darker
                    ? ["<32>{#p/basic}* É um banco."]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Voltando para dar companhia a um banco solitário...\n* O jesto é apreciado.']
                        : ['<32>{#p/basic}* Apenas um banco solitário perdido no meio da fábrica.\n* Nada estranho em relação a isso!'],
        quiche5: ['<32>{#p/human}* (Você decide não pegar nada.)'],
        run1: ['<32>{*}{#p/undyne}* Corra.{^20}{%}'],
        run2a1: ['<32>{#p/undyne}* ...', "<32>{#p/undyne}* Eu vou olhar."],
        run2b1: ['<32>{#p/undyne}* (Aranhas estúpidas...)'],
        run2a2: ['<32>{#p/undyne}* ...', "<32>{#p/undyne}* Eu estou um pouco ocupada."],
        run2b2: ['<32>{#p/undyne}* (Ugh...)'],
        run3: ["<25>{*}{#p/kidd}{#f/13}{#x1}* Eu vou te salvar!{#x2}{^20}{%}"],
        run4: ["<25>{*}{#p/kidd}{#f/1}{#x1}* Desculpa, eu, uh... não sei mesmo aterrissar essa coisa!{#x2}{^20}{%}"],
        run5: ['<25>{*}{#p/kidd}{#f/7}{#x1}* Mas o que...{#x2}{^20}{%}'],
        run6: ['<25>{*}{#p/kidd}{#f/7}{#x1}* Me ajuda!!!{#x2}{^20}{%}'],
        run6a: [
            '<25>{*}{#p/kidd}{#f/7}{#x1}* Para{@fill=#ff0} de olhar{@fill=#fff} e{@fill=#ff0}} vem aqui{@fill=#fff}, cara!! {#x2}{^20}{%}'
        ],
        run6b: ['<25>{*}{#p/kidd}{#f/7}{#x1}* Vai, por favor!!!{#x2}{^20}{%}'],
        run6c: ["<25>{*}{#p/kidd}{#f/7}{#x1}* Eu...\n* E-eu não consigo parar...!{#x2}{^20}{%}"],
        run6d: [
            '<25>{*}{#p/kidd}{#f/7}{#x1}* O que você tá fazendo!?{#x2}{^20}{%}',
            '<25>{*}{#p/kidd}{#f/7}{#x1}* Ah...!{#x2}{^20}{%}'
        ],
        run7: [
            '<25>{#p/kidd}{#f/4}* Y... y... yo... cara...',
            '<25>* Se...\n* Se v-você quer ferir meu amigo...',
            "<25>* Você vai ter que passar por mim primeiro."
        ],
        run8: [
            "<25>{#p/kidd}{#f/3}* Ela se foi...",
            '<25>{#f/1}* Yo, você realmente me salvou.',
            '<25>{#f/3}* Mesmo que fosse eu quem estivesse tentando te salvar.',
            '<25>{#f/2}* Haha.',
            "<25>{#f/3}* ... mano, eu nunca estive tão CANSADO...",
            '<25>{#f/4}* Acho que eu deveria ir pra casa.',
            '<25>{#f/7}* Eu aposto que meus pais estão super preocupados comigo!'
        ],
        run9: ['<25>{#p/kidd}{#f/13}* A... até mais, cara!'],
        run10: [
            '<32>{#p/kidd}* Undyne...\n* Você....\n* Você me salvou!',
            '<32>* Huh?\n* Ele fugiu?',
            "<32>* Yo, você tá errada...",
            '<32>* Ele foi buscar ajuda!',
            "<32>* Ele vai voltar logo, logo!!",
            '<32>* ...',
            "<32>* O-okay, eu vou pra casa..."
        ],
        run11: (charged: boolean) => [
            '<32>{#p/kidd}* Undyne...',
            '<32>* Você me salvou...?',
            '<32>* Yo... I...\n* Eu pensei que iria morrer.\n* Haha...',
            '<32>* ... espere, você está bem?\n* Parece que você bateu no teto com muita força ',
            '<32>* É m-minha culpa.\n* Eu deveria ter ficado longe dele, que nem você disse.',
            charged
                ? '<32>* Ele foi direto lutar contigo ao invés de me ajudar.'
                : '<32>* Ele só ficou lá...\n* Assistindo...\n* Me esperando sumir.',
            '<32>* Eu estava assustado, e você...',
            "<32>* O que?\n* Você vai lutar com ele agora?",
            '<32>* Mas você está ferida...\n* Deveria descansar, haha...',
            '<32>* ...',
            "<32>* G-guerreiros não descansam, huh?",
            "<32>* Undyne...\n* Você é muito legal."
        ],
        sansSentry: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Essa estação de sentinela perto de você é bem desnecessária.)']
                : world.darker
                    ? ["<32>{#p/basic}* É uma estação de sentinela."]
                    : ["<32>{#p/basic}* Sans segunda estação de sentinela...", "<32>* Como se uma já não fosse o suficiente."],
        sansSentryBack: () =>
            !world.genocide && SAVE.data.n.state_starton_papyrus === 1
                ? ['<32>{#p/human}* (Você olha embaixo da prateleira...)', "<32>{#p/basic}* É uma caixa de ossos."]
                : [
                    '<32>{#p/human}* (Você olha embaixo da prateleira...)',
                    ...(SAVE.data.b.svr
                        ? [
                            [
                                '<25>{#p/asriel1}{#f/13}* As notas aqui na verdade são bem interessantes.',
                                "<25>{#f/17}* Você não sabe nada sobre viagem no tempo?",
                                '<25>{#f/15}* Eu tinha uma teoria que meu poder de RESETAR era viagem no tempo.',
                                '<25>{#f/13}* ... mas eu nunca consegui provar.'
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* Tem várias formas diferentes das quais eu tentei provar.",
                                '<25>{#f/13}* Gravidade quântica, teoria da simulação, o paradigma do Skasis...',
                                '<25>{#f/17}* Por outro lado, eu talvez tenha colocado tempo demais nelas.',
                                '<25>{#f/20}* Não que isso tenha feito elas menos interessantes!'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/16}* Eu estou surpreso que o Sans mantém isso por aí.',
                                '<25>{#f/3}* Mas ele costumava trabalhar no laboratório, então...',
                                '<25>{#f/4}* Acho que pode ser uma parada sentimental.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* Eu nunca entendi o por que dos monstros serem tão sentimentais....',
                                '<25>{#f/17}* ... mas meus anos como estrela mudaram isso para sempre.'
                            ]
                        ][Math.min(asrielinter.sansSentryBack++, 3)]
                        : ["<32>{#p/basic}* É uma série de notas sobre viagem no tempo."])
                ],
        secretcallA: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<18>{#p/papyrus}{#f/9}PSST, AQUI É O PAPYRUS!',
            '<18>{#f/0}NO MOMENTO AINDA ESTOU ESCONDIDO NO MEU LUGAR SEGURO.',
            "<18>{#f/4}EU ESPERO QUE VOCÊ NÃO ESTEJA EM CONFUSÃO...",
            '<18>{#f/4}PORQUE SE VOCÊ ESTIVER...',
            "<19>{#f/9}EU VOU TER QUE IR AÍ E FAZER ALGO EM RELAÇÃO A ISSO!",
            "<18>{#f/6}... O QUE EU NÃO POSSO, POR CAUSA DA SITUAÇÃO ATUAL.",
            "<18>{#f/7}ENTÃO NÃO SE META EM CONFUSÃO!",
            '<18>{#f/5}...',
            '<18>{#f/5}PAPYRUS DESLIGANDO...',
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        secretcallB: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            "<18>{#p/papyrus}{#f/0}PSST, É O PAPYRUS DE NOVO.",
            '<18>{#f/5}WOWIE... DEVE ESTAR FICANDO TARDE POR AGORA.',
            '<18>{#f/6}VOCÊ ESTÁ BEM?\nMAIS ALGUÉM FOI... MORTO?',
            '<18>{#f/5}ESSAS SÃO AS PERGUNTAS QUE ME FAÇO TODA HORA.',
            "<18>{#f/4}É CLARO, EU SÓ ESTOU ESCONDIDO A UM POUCO DE TEMPO.",
            '<18>{#f/7}MAS AINDA ASSIM!!!',
            '<18>{#f/5}...',
            '<18>{#f/4}... VOCÊ DEVE ESTAR NA SAIDA DA FOUNDRY AGORA.',
            '<18>{#f/5}EU DESEJAVA PODER FAZER MAIS, MAS ALAS...',
            '<18>{#f/3}SERIA INSEGURO SAIR AGORA E RETORNAR.',
            "<18>{#f/9}MAS, EU SEI QUE VOCÊ NÃO VAI ME DECEPCIONAR!",
            '<18>{#f/5}...',
            '<18>{#f/5}PAPYRUS DESLIGANDO...',
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        spider1: () => ['<32>{#p/basic}* ... huh?'],
        spider2: () =>
            badSpider()
                ? ["<32>{#p/basic}* Tem algo avançando no escuro."]
                : ["<32>{#p/basic}* Há alguém vagando no escuro."],
        spider3: () => (badSpider() ? ['<32>{#p/basic}* Algo poderoso...'] : ['<32>{#p/basic}* Alguém curioso...']),
        spider4: () =>
            badSpider() ? ['<32>{#p/basic}* Algo perigoso...'] : ['<32>{#p/basic}* Alguém misterioso...'],
        spider5: () => (badSpider() ? ['<32>{#p/basic}* Algo...'] : ['<32>{#p/basic}* Alguém...']),
        spider6: () =>
            badSpider()
                ? [
                    '<32>{#p/basic}* ... que não deveria ser permitido viver.',
                    '<32>* Vocês acham que podem se livrar de tudo isso, queridos?',
                    '<32>* Ahuhuhu~\n* Você tem muito pelo que responder!'
                ]
                : [
                    '<32>{#p/basic}* ... que não deveria ser permitido passar.',
                    '<32>* Vocês acham que podem passar por uma voluntária do esquadrão de ELITE assim?',
                    '<32>* Ahuhuhu~\n* Você tem muito o que aprender!'
                ],
        spookydate0x: pager.create(
            0,
            ['<25>{#p/sans}* ei, eu respeito o que você fez lá atrás.', '<25>{#f/3}* valeu.'],
            ['<25>{#p/sans}{#f/2}* continue assim e talvez te chame para jantar.']
        ),
        spookydate0y: [
            "<32>{#p/basic}* Tem um par de olhos pintadas nas costas do Sans.",
            "<32>{#p/basic}* Eles não parecem muito convincente."
        ],
        spookydate0z: [
            "<32>{#p/basic}* Surpreendentemente, não a ouvidos pintados dos lados da cabeça do Sans.",
            '<33>{#p/basic}* Faz uma alteração na parte de trás...'
        ],
        spookydate0: pager.create(
            0,
            ["<25>{#p/sans}* Obrigado por estar comigo, parceiro.", '<25>* feliz por conversarmos.'],
            ['<25>{#p/sans}{#f/2}* Talvez mais tarde possamos sair para uma janta.']
        ),
        spookydate1: pager.create(
            0,
            () => [
                '<25>{#p/sans}* ei, ouvi falar que você passou meu mano, o grande papyrus.',
                '<25>{#f/2}* bem... eu considero essa uma {@fill=#ff0}grande vitória{@fill=#fff}.',
                "<25>{#f/0}* Que tal celebrarmos a ocasião no Grillby?",
                "<25>{#f/3}* estar em uma parte do coração do papyrus te dá uma parte no meu.",
                choicer.create('* (O que você acha?)', 'Sim', 'Nah ')
            ],
            () => ["<25>{#p/sans}* minha oferta continua.\n* Grillby?", choicer.create('* (O que você acha?)', 'Sim', 'Nah ')]
        ),
        spookydate2a: () => ["<25>{#p/sans}* certo, só para você, eu vou me ausentar do meu trabalho..."],
        spookydate2b: () => [
            '<25>{#p/sans}* bem, é bem você.',
            ...(SAVE.data.n.sans_doge_warning++ < 1
                ? [
                    "<25>{#p/sans}* só não reclame se entrar em uma luta e acabar machucado...",
                    '<25>{#p/sans}* ... tudo porque esqueceu de comer alguma coisa.'
                ]
                : [])
        ],
        spookydate3: ['<25>{#p/sans}* por aqui.\n* eu sei um atalho.'],
        spookydate4: ['<25>{#p/sans}* atalho rápido, né?'],
        spookydate5: ['<25>{#p/sans}* e aí pessoal.'],
        spookydate6: ['<32>{#p/basic}* Salve, Sans.\n{#x1}* Hoi, Sansy~'],
        spookydate7: ['<32>{#p/basic}* Ei, Sans.\n{#x1}* (Opa, Sans.)'],
        spookydate8: ["<32>{#p/basic}* Uma vez eu ouvi que você colocou o bar em chamas com o Grillby Flamejante, é verdade?"],
        spookydate9: [
            '<25>{#p/sans}{#f/3}* huh?\n* nah, aqueles estavam totalmente murchos.',
            '<25>{#f/2}* a única coisa que já colocou fogo NESSE bar foram minhas piadas.'
        ],
        spookydate9x: ["<25>{#p/sans}{#f/3}* caramba grillby, cadê o pessoal?"],
        spookydate9y: [
            '<32>{#p/basic}{#npc/a}* ...\n* ...\n* ...',
            "<32>* ... Grillby não mencionou clientes, mas disse que te ver trás um alívio."
        ],
        spookydate9z: ['<25>{#p/sans}{#f/0}* que estranho.'],
        spookydate10: ["<25>{#p/sans}* ei cara, por que você não vem aqui e senta?"],
        spookydate11: [
            '<25>{#p/sans}* ops, cuidado onde senta aqui.',
            '<25>{#f/2}* tem um esquisito que coloca almofadas de peido nas cadeiras.',
            "<25>{#f/0}* ... de toda forma, vamos pedir.\n* o que você gosta?",
            choicer.create('* (O que você acha?)', "Grillby\nFlamejante", '\nRosquinhas'),
            "<26>{#p/sans}{#f/2}* ei, isso parece bom."
        ],
        spookydate12a: ["<25>{#p/sans}* grillby, vamos querer duas versões suas flamejando."],
        spookydate12b: ["<25>{#p/sans}* grillby, vamos querer duas bandejas de rosquinhas."],
        spookydate13: () => [
            "<25>{#p/sans}* então, o que você acha dos ataques do meu irmão?",
            choicer.create('* (O que você acha?)', 'Fáceis', 'Difíceis')
        ],
        spookydate14a: [
            '<25>{#p/sans}* fáceis?\n* Sai fora.',
            "<25>{#f/3}* os ataques do papyrus são qualquer coisa menos fáceis.",
            "<25>{#f/0}* você ficaria surpreso de quanto tempo ele passa trabalhando neles.",
            '<26>{#f/0}* hm, bom.\n* pelo menos ele descansa.',
            '<25>{#f/2}* e por isso, eu quero dizer que ele leva seus ataques para todo lado.'
        ],
        spookydate14b: [
            '<25>{#p/sans}{#f/0}* nem me fala.',
            '<25>{#f/3}* uma vez, após um longo dia de revisão dos seus ataques...',
            "<25>{#f/0}* papyrus revelou tudo o que trabalhou até aquele dia.",
            '<25>{#f/0}* eu devo dizer, fiquei impressionado pelo que vi.',
            "<25>{#f/2}* talvez algum dia, eu até faça designs de ataques pra mim."
        ],
        spookydate15: ['<25>{#p/sans}* aí vem a comida.'],
        spookydate16: [
            '<25>{#p/sans}* O fato é, você tem que concordar que ele é acima da média.',
            '<25>{#f/0}* Aqueles ataques dele são um ótimo exemplo disso.',
            '<25>{#f/3}* Não muito tempo atrás, papyrus visitou a capitã da guarda...',
            '<25>{#f/0}* e implorou a ele para deixá-lo entrar.',
            '<25>{#f/3}* ela bateu a porta na cara dele. clássico movimento da undyne.',
            '<25>{#f/0}* mas quando o papyrus voltou com os designs horas depois...',
            "<25>{#f/0}* undyne ficou impressionada e decidiu dar a ele...",
            '<25>{#f/2}* ... bem, vamos chamar de \"treino do guerreiro.\"'
        ],
        spookydate17: ["<25>{#p/sans}* ah é, tem algo que eu precisava te perguntar."],
        spookydate18: () => [
            '<25>{#p/sans}{#f/3}* você já ouviu sobre uma tal {@fill=#ff0}flor falante{@fill=#fff}?',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        spookydate19a: [
            '<25>{#p/sans}* você sabe sobre ela então.',
            '<25>{#p/sans}* a {@fill=#003cff}flor sinal{@fill=#fff}.'
        ],
        spookydate19b: ["<25>{#p/sans}* bem, deixe eu te contar.\n* é chamada de {@fill=#003cff}flor sinal{@fill=#fff}."],
        spookydate20: [
            "<25>* Elas estão por toda a fábrica.",
            "<25>* uma vez que elas pegam um sinal, repetem de novo e de novo...",
            '<25>{#f/3}* o que tem elas?',
            '<25>{#f/0}* bem, papyrus me falou algo interessante outro dia.',
            '<25>* algumas vezes, quando ninguém está por perto...',
            '<25>* uma estrela aparece do céu e cochicha coisas para ele.',
            '<25>* bajulações...\n* conselho...\n* encorajamento...',
            '<25>{#f/3}* ... o futuro.',
            '<25>{#f/0}* estranho, huh?',
            '<25>* alguém deve estar usando uma estrela para pregar uma peça nele.',
            '<25>* fica de olho por mim, beleza?',
            '<25>* valeu.'
        ],
        spookydate21: ['<25>{#p/sans}* ... er, grillby.\n* poderia me passar o molho yamok?'],
        spookydate22: ['<25>{#p/sans}{#f/8}* delicioso.'],
        spookydate23: () =>
            world.population < 6
                ? [
                    "<25>{#p/sans}{#f/8}* bem, eu vou estar na minha estação.",
                    '<25>{#f/8}* oh, e tente ser mais legal com as pessoas, beleza?',
                    '<25>{#f/9}* talvez você acabe se arrependendo.'
                ]
                : [
                    "<25>{#p/sans}{#f/8}* bem, eu vou estar na minha estação.",
                    '<25>{#f/8}* oh, e não esquece de pegar sua comida antes de sair.',
                    '<25>{#f/9}* talvez você precise logo.'
                ],
        telescopeX: pager.create(
            0,
            () => [
                "<25>{#p/sans}* eu estou pensando em entrar no ramo dos telescópios.",
                "<25>{#f/3}* aqui tem o que eu chamo de um telescópio PREMIUM.",
                '<25>{#f/3}* eu estava pensando em apresentá-lo amanhã...',
                SAVE.data.b.voucher
                    ? '<25>{#f/2}* mas, com esse voucher premium membership, você pode usar com acesso antecipado.'
                    : '<25>{#f/2}* mas, já que eu te conheço, você pode usar antecipado.',
                '<25>{#f/0}* Que tal?',
                choicer.create('* (O que você acha?)', 'Sim', 'Não')
            ],
            () => ['<25>{#p/sans}{#f/2}* quer tentar meu telescópio?', choicer.create('* (O que você acha?)', 'Sim', 'Não')]
        ),
        telescopeY: () =>
            SAVE.data.b.voucher
                ? ((SAVE.data.b.f_state_voucher = true),
                    [
                        "<25>{#p/sans}* deixa eu adivinhar...\n* não tá funcionando?",
                        '<25>{#f/3}* ah, foi mal, eu pensei que você sabia.',
                        '<25>{#f/2}* Uma assinatura premium requer uma assinatura premium plus.',
                        ...(world.kiddo
                            ? [
                                "<25>{#p/kidd}{#f/2}* Você tá brincando, né?",
                                '<25>{#p/sans}{#f/0}* nope.\n* assinatura premium plus.',
                                '<25>{#p/kidd}{#f/1}* Pow!'
                            ]
                            : [])
                    ])
                : [
                    "<25>{#p/sans}* deixa eu adivinhar...\n* não tá funcionando?",
                    '<25>{#f/3}* ah, foi mal, eu pensei que você sabia.',
                    '<25>{#f/2}* Um telescópio premium requer uma assinatura premium.',
                    ...(world.kiddo
                        ? [
                            '<25>{#p/kidd}{#f/1}* E se eu te der meu voucher membership?',
                            "<25>{#p/sans}{#f/0}* oh.\n* bem, isso vai requerer uma assinatura premium.",
                            '<25>{#p/kidd}{#f/1}* Pow!'
                        ]
                        : [])
                ],
        telescopeZ: ['<25>{#p/sans}{#f/2}* pois bem...'],
        temmiepat1: () => [
            '<32>{#p/tem}{#npc/a}* p...\n* tem ouviu humano ama cariciar tem...',
            '<32>* tu qué...\n* ACARICIAR???',
            choicer.create('{#npc}* (O que você acha?)', 'Simy.', 'Nuou!')
        ],
        temmiepat2a: ['<32>{#p/human}* (Você acaricia temmie.)', '<32>{#p/tem}{#npc/a}* uwawawawah.....'],
        temmiepat2b: ['<32>{#p/tem}{#npc/a}* ...', '<32>{#p/tem}{#npc/a}* Vá embora.'],
        temmiepat3a: ['<32>{#p/human}* (Você continua acariciando temmie.)', '<32>{#p/tem}{#npc/a}* uwawawawah.....'],
        temmiepat3b: ['<32>{#p/tem}{#npc/a}* ...'],
        temstatue: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você abaixa a alavanca atrás da estátua.)',
                    '<32>{#p/human}* (O enigma aqui descreve uma estátua como esta e sugere uma sequência de notas.)',
                    '<32>{#p/human}* (Menciona também trazer itens para uma sala específica.)'
                ]
                : [
                    '<32>{#p/human}* (Você abaixa a alavanca atrás da estátua.)',
                    "<32>{#p/basic}* ... tem um enigma aqui.",
                    '<32>* \"Abaixe a alavanca e traga um amigo para um local que você nunca esteve...\"',
                    '<32>* \"Uma figura não muito diferente da minha, uma estátua esculpida e gravada em pedra.\"',
                    '<32>* \"Siga a sequência de notas divinas, para desbloquear o caminho do outro lado...\"',
                    '<32>* \"Traga o ítem para a próxima sala e todo o poder será seu.\"'
                ],
        temstatueAftuh: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (O enigma aqui descreve uma estátua como esta e sugere uma sequência de notas.)',
                    '<32>{#p/human}* (Também menciona trazer um ítem para uma área específica.)'
                ]
                : [
                    '<32>{#p/basic}* \"Abaixa a alavanca e traga um amigo a um lugar que você já esteve antes...\"',
                    '<32>* \"Uma figura não muito diferente da minha, uma estátua esculpida e gravada em pedra.\"',
                    '<32>* \"Siga a sequência de notas divinas, para desbloquear o caminho do outro lado...\"',
                    '<32>* \"Traga o ítem para a próxima sala e todo o poder será seu.\"',
                    '<32>* ... a alavanca aqui atrás já foi puxada.'
                ],
        temstatueNormuh: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (O sinal da ênfase na fama da estátua.)']
                : ['<32>{#p/basic}* \"Estátua da tem... bem famuosa\"\n* \"BEM!!!!!!!!!\"'],
        shard1: ['<32>{#p/basic}* Uma pilha de cacos de vidro.'],
        shard2: () => [choicer.create('* (Pisar neles?)', 'Sim', 'Não')],
        shard3: ['<32>{#p/human}* (Você decide não pisar.)'],
        shard4: ['<32>{#p/basic}* Com a força de suas solas indomáveis, você carregou o movimento de poder final!'],
        shard5: () => [
            '<32>{#p/basic}* Os fragmentos foram espalhados pela sala.',
            '<25>{#p/undyne}{#f/8}* PFFT-\n* OH MEU SENHOR!!!',
            ...(SAVE.data.b.undyne_respecc
                ? ["<25>{#p/undyne}{#f/1}* Essa é o tipo de atitude que eu gosto!"]
                : [
                    '<25>{#p/undyne}{#f/17}* Quer dizer, uh, é, como você pode fazer isso com minha cozinha...!',
                    '<25>{#p/undyne}{#f/4}* ...'
                ])
        ],
        sanscall2: () => [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/sans}{#f/0}* ei, você está aí?',
            ...(SAVE.data.n.state_foundry_muffet === 1
                ? [
                    "<25>{#f/3}* já faz um tempo desde que eu ouvi sobre você.",
                    '<25>{#f/2}* ocê caiu em um buraco de minhoca ou coisa do tipo?'
                ]
                : [
                    '<25>{#f/3}* uma criança parecia muito querer te ver de novo.',
                    '<25>{#f/2}* ocê fez um novo amigo enquanto eu estive fora?'
                ]),
            '<25>{#f/0}* ... heh.',
            "<25>{#f/0}* eu acho que você está bem.",
            '<25>{#f/3}* eu queria manter o olho em você, mas...',
            "<25>{#f/0}* por alguma razão, esse telescópio premium não vê através de paredes.",
            "<25>{#f/2}* que trapaça, eu vou ter que chamar meu advogado premium de fraudes.",
            ...(world.population === 0
                ? [
                    '<25>{#f/0}* no meio tempo, você deve estar bem por agora.',
                    '<25>{#f/3}* a área na sua frente parece bem vazias, por estimativa.',
                    '<25>{#f/2}* mas ei.\n* eu posso estar errado.'
                ]
                : world.killed5
                    ? [
                        "<25>{#f/0}* no meio tempo, você não vai ter muitos problemas.",
                        '<25>{#f/3}* a área na sua frente será evacuada logo, logo.',
                        '<25>{#f/2}* hmmm... eu me pergunto se ainda terá alguém por lá.'
                    ]
                    : geno()
                        ? [
                            '<25>{#f/0}* no meio tempo, só toma cuidado com o que fará depois.',
                            "<25>{#f/3}* seria lamentável ter que evacuar a Foundry também."
                        ]
                        : antiAteThreshold()
                            ? [
                                '<25>{#f/0}* no meio tempo, só toma cuidado com quem você fala.',
                                "<25>{#f/3}* tem um rumor de alguém expulsando pessoas da fábrica."
                            ]
                            : [
                                '<25>{#f/0}* no meio tempo, só toma cuidado com quem você fala.',
                                "<25>{#f/3}* tem o rumor de alguém causando briga no depósito de lixo."
                            ]),
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        trivia: {
            f_bbox: ["<32>{#p/basic}* Uma caixa bastião.\n* Tem um humano dentro..."],
            ghostparty1: pager.create(
                0,
                () => [
                    '<32>{#p/finalghost}* Opa.\n* Eu ainda me lembro da primeira vez que nós vimos...',
                    ...[
                        [
                            '<32>{#p/finalghost}* Toriel estava tão feliz por te ver falar comigo.',
                            "<32>* Pessoalmente, eu não penso muito sobre como eu converso com as pessoas, então...",
                            "<32>* Eu não tenho certeza do que falar sobre aquilo."
                        ],
                        [
                            '<32>{#p/finalghost}* ... muito para digerir.',
                            '<32>* Ser forçado a sair do seu boneco é bem chato.'
                        ],
                        [
                            '<32>{#p/finalghost}* Foi bem engraçado o jeito que você fugiu de mim.',
                            '<32>* Toriel tinha todo o direito de ficar preocupada contigo por correr de um objeto inanimado.'
                        ],
                        [
                            '<32>{#p/finalghost}* ... não que eu tenho o direito.',
                            '<32>* Quer dizer, como você pode ser tão entediante?\n* Deve ser uma habilidade.'
                        ],
                        [
                            '<32>{#p/finalghost}* ... ha...',
                            '<32>* ... talvez, quando eu pegar outro corpo, nós dois podemos... fazer aquilo.',
                            "<32>* Você lembra, não lembra?"
                        ],
                        [
                            '<32>{#p/finalghost}* ... muito para digerir.',
                            '<32>* Ser forçado a se mover após um período tão longo de inanimação...',
                            '<32>* Foi bem desconfortável.'
                        ],
                        [
                            '<32>{#p/finalghost}* Toriel ficou tão chocada com seus jeitos flertosos.',
                            '<32>* Pessoalmente, eu achei hilário.',
                            '<32>* Eu estava rindo por dentro.'
                        ]
                    ][SAVE.data.n.state_wastelands_dummy],
                    '<32>* De toda forma...',
                    "<32>* Todos nós decidimos ir no Blooky antes de ir embora para o mundo natal.",
                    '<32>* Eu devo dizer, Blooky com certeza tem uma playlist \"interessante\" de músicas.',
                    '<32>* O que é uma \"Hiper Fúria\", afinal?',
                    "<32>{#p/basic}* Um som que eu desejava não ter feito.",
                    '<32>{#p/finalghost}* Oh?\n* Você fez isso?',
                    '<32>{#p/basic}* Infelizmente, mew.',
                    '<32>{#p/finalghost}* Eu entendo o porque de você querer esquecer.'
                ],
                ["<32>{#p/finalghost}* Ela está procurando superar seus modos violentos."]
            ),
            ghostparty2: pager.create(
                0,
                [
                    '<32>{#p/basic}* Então, ser um boneco com raiva se tornou entediante com o tempo.',
                    '<32>* Então eu pedi para Alphys fazer uma réplica da Mew Mew Dol pra mim!',
                    '<32>* Wow.\n* Wow!\n* WOW!!',
                    "<32>* Eu não me sentia feliz assim a muito tempo."
                ],
                ['<32>{#p/basic}* As vezes tudo que precisa é um novo corpo, mew!!']
            ),
            ghostparty3: pager.create(
                0,
                [
                    "<32>{#p/mettaton}{#e/mettaton/9}* ENQUANTO BLOOKY ESTÁ OCUPADO NA LOJA, DECIDIMOS OLHAR A FAZENDA MAIS UMA VEZ.",
                    "<32>{#e/mettaton/8}* CLARO, SÓ POR UM DIA ANTES DE IRMOS EMBORA DO OUTPOST.\n* MAS AINDA ASSIM.",
                    "<32>{#e/mettaton/36}* PENSANDO NO PASSADO, EU FUI MEIO DRAMÁTICO SOBRE A COISA TODA.",
                    "<32>{#e/mettaton/36}* BLOOKY NUNCA FEZ -TANTO- MAU... EU ACHO QUE EU SÓ NÃO QUERIA ADMITIR MEU TÉDIO.",
                    "<32>{#e/mettaton/8}* MAS TALVEZ É ISSO QUE ME FAZ UM GRANDE ATOR.",
                    "<32>{#e/mettaton/37}* NÃO É ENCENAÇÃO SE VOCÊ NÃO COLOCAR EMOÇÃO!",
                    '<32>{#e/mettaton/9}* ... OU ALGUMA COISA ASSIM.'
                ],
                ['<32>{#p/mettaton}{#e/mettaton/9}* SE VOCÊ PRECISAR UM ATOR POR QUALQUER MOTIVO, JÁ SABE COM QUEM FALAR.']
            ),
            sleepingdogs: () =>
                world.darker
                    ? [
                        "<32>{#p/basic}* É um cachorro dormindo.",
                        ...(world.goatbro && SAVE.flag.n.ga_asrielDogepoke++ < 1
                            ? ['<25>{#p/asriel2}{#f/10}* Eu tenho que dizer, isso é bem no personagem.']
                            : [])
                    ]
                    : [
                        '<32>{#p/basic}* Este cachorro parece estar dormindo, ainda assim mantém a posição de batalha.',
                        '<33>{#p/basic}* Que cachorro mais paradogxal!'
                    ],
            napstacouch: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ["<32>{#p/human}* (A sofá parece ser novo, mas algo te diz que não é.)"]
                        : [
                            '<32>{#p/basic}* Este sofá parece tão quentinho quanto quando era novo.',
                            ...(ghostpartyCondition()
                                ? [
                                    "<32>{#p/basic}* Nós somos fantasmas, então não precisamos de sofá ou colchão, mew.",
                                    '<32>* Nós só pensamos que a sala ficaria mais legal com um!',
                                    '<32>{#p/mettaton}* É CLARO.\n* QUALQUER LOCAL QUE VALE A PENA VIVER MERECE UM SOFÁ!',
                                    '<32>{#p/mettaton}* PREFERÍVEL DA MARCA MTT.',
                                    '<32>{#p/finalghost}* Este parece ser um requisito totalmente inútil.'
                                ]
                                : [])
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ["<32>{#p/human}* (A sofá parece ser novo, mas algo te diz que não é.)"]
                        : ['<32>{#p/basic}* Este sofá parece tão quentinho quanto quando era novo.']
            ),
            f_armor_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Este sinal avisa sobre cachorros que parecem estar dormindo.)']
                    : ['<32>{#p/basic}* \"Cuidado com cachorros sonolentos.\"'],
            f_backsign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal fala sobre ser forte em tempos de incerteza.)']
                    : ['<32>{#p/basic}* \"Mesmo quando você está perdido, a vontade encontrar a si mesmo demonstra força.\"'],
            f_cheesetable: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Alguma coisa sobre esse queijo não te parece certo.)"]
                    : world.darker
                        ? ['<32>{#p/basic}* Nada sobre isso é real.']
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Mesmo sendo holográfico, parece que um pequeno pedaço de queijo foi tomado...']
                            : ['<32>{#p/basic}* Queijo holográfico.', '<32>{#p/basic}* A mesa é holográfico também.'],
            f_creamsign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (O sinal declara a posse dos monstros sobre o Outpost.)"]
                    : world.population_area('s') < 6 || world.genocide || SAVE.data.n.plot === 72 // NO-TRANSLATE

                        ? ['<32>{#p/basic}* \"Nós declaramos este Outpost como o nosso, para nunca ser tratado como prisão.\"']
                        : ['<32>{#p/basic}* Os glifos foram pintados com uma lista de 21 sabores diferentes.'],
            f_doge_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal ridiculariza as caixas por sua falta de utilidade em tempo real.)']
                    : [
                        '<32>{#p/basic}* \"Está é uma caixa.\"',
                        '<32>* \"Você pode colocar um ítem dentro ou tomar um ítem pra fora.\"',
                        '<32>* \"Pra quê você faria isso?\" \n* \"Não é como se você pudesse usá-los dentro da caixa.\"',
                        '<32>* \"Sinceramente, crítico da caixa.\"'
                    ],
            f_doge1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal detalha a diferença entre o poder das ALMAS humanas e de monstros.)']
                    : [
                        '<32>{#p/basic}* \"Por que os humanos atacaram?\"\n* \"Pra dizer, não parecia que eles tinham algo a temer.\"',
                        '<32>* \"Humanos são fortes. Seria preciso as ALMAS de quase todos os monstros...\"',
                        '<32>* \"... para se igualar a ALMA de apenas um único humano.\"'
                    ],
            f_doge3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal avisa sobre uma fraqueza na ALMA humana e suas consequências.)']
                    : [
                        '<32>{#p/basic}* \"Mas os humanos tem uma fraqueza. Ironicamente, é a força de suas ALMAS.\"',
                        '<32>* \"Seu poder permite que elas persistam fora do corpo humano, mesmo após a morte.\"',
                        '<32>* \"Se um monstro derrotar um humano, ele poderá tomar sua ALMA.\"',
                        '<32>* \"Um monstro com uma ALMA humana... um ser cósmico de poder inigualável.\"',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielBeast++ < 1
                            ? ["<25>{#p/asriel2}{#f/15}* Cósmico não mesmo COMEÇA a descrever isso..."]
                            : [])
                    ],
            f_doge5: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (O sinal retrata algo do tipo que você nunca viu antes.)"]
                    : [
                        "<32>{#p/basic}* É uma ilustração de uma criatura espacial angustiante...",
                        "<32>* Tem algo bem inquietante sobre este desenho.",
                        ...(world.goatbro && SAVE.flag.n.ga_asrielDrawing++ < 1
                            ? [
                                "<25>{#p/asriel2}{#f/5}* Olha, $(name)!\n* Somos nós!\n* ... mais ou menos.",
                                '<26>{#f/4}* ... é desse jeito que eles pensam que nós parecemos?'
                            ]
                            : [])
                    ],
            f_gersonshop: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/17}* E pensar que ele está cuidando daquela loja por tanto tempo...",
                            "<25>{#f/20}* Eu me pergunto que outras coisas ele vendeu conforme os anos.",
                            "<25>{#f/15}* Lembre-se, nessa linha tempo, eu só estou aqui a duas semanas.",
                            "<25>{#f/13}* Meu palpite é que ele tem vendido principalmente bugigangas...",
                            '<25>{#f/16}* Seja nos dias do Outpost, ou no antigo mundo natal.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Eu ouvi sobre um certo artefato...',
                            '<25>{#f/15}* Era tão perigoso, que seu uso foi banido na guerra.',
                            "<25>{#f/16}* Eu não sei se o Gerson sequer chegou a vender.",
                            '<25>{#f/13}* Talvez nem ele seja velho o suficiente para saber se existe.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/15}* Saber sobre a existência daquele artefato...",
                            "<25>{#f/13}* Tem haver com uma pessoa que nasceu antes mesmo da guerra.",
                            '<25>{#f/16}* Alguém dessa forma saberia tudo sobre esse tipo de coisa.'
                        ]
                    ][Math.min(asrielinter.f_gersonshop++, 2)]
                    : ['<32>{#p/basic}* \"Gerson Paradas e Tralhas!\"\n* \"Uma loja humilde para todas as suas necessidades!\"'],
            f_hub_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal cita o que segue em cada direção.)']
                    : [
                        '<32>{#p/basic}* \"Esquerda - Zona Escura\"\n* \"A Frente - Casa da Undyne\"\n* \"Direita - Loja do Gerson\"',
                        '<32>{#p/basic}* \"Abaixo - Preservação de Lesmas\"'
                    ],
            f_lobbywindow: [
                "<32>{#p/human}* (Você sente que já viu este tipo de janela em outra perspectiva.)"
            ],
            f_shinycab: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Parece que já limpou a sala...',
                            '<25>{#f/17}* Sem lixo aqui!'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/15}* Ah não ser que você se considere um pedaço de lixo.',
                            "<25>{#f/16}* Conhecendo você, eu não me surpreenderia.",
                            "<25>{#f/31}* Você provavelmente estaria orgulhoso disso ou sei lá."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* ... qual foi.',
                            "<25>{#f/17}* Você não ACREDITA ser um pedaço de lixo, acredita?"
                        ]
                    ][Math.min(asrielinter.f_shinycab++, 2)]
                    : world.darker
                        ? ['<32>{#p/basic}* Uma caixa de descarte de lixo.']
                        : [
                            '<32>{#p/basic}* Uma caixa de descarte de lixo.\n* Enquanto ativo, enche a sala com gás ultra quente.',
                            "<32>{#p/basic}* Você não sobreviveria."
                        ],
            f_path1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal descreve como um ser poderia deixar o escudo de força.)']
                    : [
                        '<32>{#p/basic}* \"Quando os humanos nos prenderam, eles nos selaram com um escudo de força.\"',
                        '<32>* \"Apenas seres com uma ALMA poderosa podem sair.\"'
                    ],
            f_path2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal descreve como o escudo de força pode ser quebrado.)']
                    : [
                        '<32>{#p/basic}* \"Existe apenas uma forma de nos libertar.\"',
                        '<32>* \"Se um grande poder, equivalente a sete ALMAS humanas, atacar o escudo...\"',
                        '<32>* \"Ele será destruído.\"'
                    ],
            f_path3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que este sinal estava realmente muito errado.)']
                    : [
                        '<32>{#p/basic}* \"Mas este lugar amaldiçoado fica na extremidade mais distante da galáxia.\"',
                        '<32>* \"Não tem chances de um humano nos encontrar aqui.\"',
                        '<32>* \"Nós estaremos presos aqui para sempre.\"'
                    ],
            f_puzzle1_sign: () =>
                SAVE.data.b.svr
                    ? world.postnoot && world.nootflags.has('f_puzzle1') // NO-TRANSLATE

                        ? [
                            '<32>{#p/human}* (O sinal te pede para ignorar o quebra-cabeça.)',
                            ...[
                                [
                                    "<25>{#p/asriel1}{#f/15}* Seja lá quem escreveu isso deve ter um péssimo senso de humor...",
                                    "<25>{#f/17}* Você tem que estar MUITO entediado para ignorar um quebra-cabeça simples assim."
                                ],
                                [
                                    '<25>{#p/asriel1}{#f/9}* Tá olhando pra mim porquê?\n* Eu amo quebra-cabeças.',
                                    "<25>{#f/4}* Grande e velho amador de enigmas aqui."
                                ],
                                ['<25>{#p/asriel1}{#f/15}* ...']
                            ][Math.min(asrielinter.f_puzzle1_sign++, 2)]
                        ]
                        : ['<32>{#p/human}* (O sinal te informa de como resolver o quebra-cabeça.)']
                    : world.postnoot && world.nootflags.has('f_puzzle1') // NO-TRANSLATE

                        ? ['<32>{#p/basic}* \"Ande até a próxima sala se não se importar.\"\n* \"E ignore a alavanca.\"']
                        : [
                            '<32>{#p/basic}* \"Mova os postes para guiar o laser para dentro do receptor.\"'
                        ],
            f_puzzle2_sign: () =>
                SAVE.data.b.svr
                    ? world.postnoot && world.nootflags.has('f_puzzle2') // NO-TRANSLATE

                        ? [
                            '<32>{#p/human}* (O sinal indica que ninguém vai se importar com esse quebra-cabeça.)',
                            ...[
                                [
                                    '<25>{#p/asriel1}{#f/13}* É, quebra-cabeças assim se resolvem as vezes...',
                                    '<25>{#f/17}* O que mais eu posso dizer?'
                                ],
                                [
                                    '<25>{#p/asriel1}{#f/10}* Huh?\n* Você acha que eu resolvi este pra você...?',
                                    '<25>{#f/20}* De jeito nenhum.\n* Os quebra-cabeças quase não me interessam.'
                                ],
                                ['<25>{#p/asriel1}{#f/15}* ...']
                            ][Math.min(asrielinter.f_puzzle2_sign++, 2)]
                        ]
                        : ['<32>{#p/human}* (O sinal te informa de como resolver o quebra-cabeça.)']
                    : world.postnoot && world.nootflags.has('f_puzzle2') // NO-TRANSLATE

                        ? ['<32>{#p/basic}* \"Honestamente, quem se importa com quebra-cabeça?\n* \"Não vale a pena.\"']
                        : ['<32>{#p/basic}* \"Todos os pilares devem ser usados para resolver o quebra-cabeça.\"'],
            f_puzzle3_sign: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (O sinal declara a decidida injustiça deste quebra-cabeça como a razão pela qual ele foi desligado.)',
                        "<25>{#p/asriel1}{#f/20}* É... esse quebra-cabeça foi uma verdadeira dor na bunda."
                    ]
                    : !world.genocide && world.trueKills < 30
                        ? ['<32>{#p/basic}* \"O guia de quebra-cabeça desligou este em específico por ser muito injusto.\"']
                        : world.postnoot && world.nootflags.has('f_puzzle3') // NO-TRANSLATE

                            ? [
                                '<32>{#p/basic}* Os conteúdos desde sinal foram riscados...',
                                '<32>* ... e riscados de novo?'
                            ]
                            : [
                                '<32>{#p/basic}* Os conteúdos desde sinal foram riscados...',
                                '<32>* ... com um distinto senso da ilegível arranhão de galinha.'
                            ],
            f_statue_kidd: () =>
                SAVE.data.b.svr
                    ? ['<26>{#p/asriel1}{#f/20}* Er, vai ficar no outro interruptor.']
                    : ['<25>{#p/kidd}{#f/1}* Fica em pé no outro interruptor!'],
            f_telescope: () =>
                SAVE.data.b.svr
                    ? [
                        ["<25>{#p/asriel1}{#f/15}* Frisk.\n* Não tem utilidade.\n* Não se irrita com isso."],
                        [
                            '<25>{#p/asriel1}{#f/13}* Mesmo que você conseguisse a tal inscrição premium plus...',
                            "<25>{#p/asriel1}{#f/15}* Você nunca seria capaz de cancelar."
                        ],
                        ["<25>{#p/asriel1}{#f/16}* Há muitos aros premium para pular aqui."]
                    ][Math.min(asrielinter.f_telescope++, 2)]
                    : world.darker
                        ? ["<32>{#p/basic}* É um telescópio."]
                        : ['<32>{#p/basic}* É um telescópio \"premium.\"'],
            f_temhistory: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A pintura retrata um conto de natureza indefinida.)']
                    : world.darker
                        ? ['<32>{#p/basic}* A história de Tem.']
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Tem história.\n* Que sua riqueza e aprofundamento jamais seja perdido.']
                            : ['<32>{#p/basic}* Tem história.\n* A mais profunda e rica história de toda a galáxia.'],
            f_temhole: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Através do buraco, você olha para o ventre estrondoso da fábrica.)']
                    : world.runaway ||
                        SAVE.data.s.state_foundry_deathroom === 'f_village' || // NO-TRANSLATE

                        world.genocide ||
                        30 <= world.trueKills
                        ? ["<32>{#p/basic}* É um buraco."]
                        : ["<32>{#p/basic}* É um buraco temmie.\n* Um buraco tem."],
            f_trash: pager.create(
                1,
                ['<32>{#p/basic}* Lixo.'],
                () => (world.darker ? ['<32>{#p/basic}* Lixo.'] : ['<32>{#p/basic}* Ainda lixo.']),
                () => (world.darker ? ['<32>{#p/basic}* Lixo.'] : ['<32>{#p/basic}* Só lixo...']),
                () => (world.darker ? ['<32>{#p/basic}* Lixo.'] : ['<32>{#p/basic}* O lixo no lixo.']),
                () => (world.darker ? ['<32>{#p/basic}* Lixo.'] : ['<32>{#p/basic}* Lixo lixoso.']),
                () => (world.darker ? ['<32>{#p/basic}* Lixo.'] : ['<32>{#p/basic}* Surpreendentemente, lixo.']),
                () => (world.darker ? ['<32>{#p/basic}* Lixo.'] : ['<32>{#p/basic}* Lixo!!!'])
            ),
            f_trash1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O tablet parece descrever o ciclo de vida de um tipo de flor em particular.)']
                    : world.darker
                        ? ['<32>{#p/basic}* A data neste tablet é de pouca importância.']
                        : [
                            "<33>{#p/basic}* É um tablet velho.\n* A data está quase toda corrompida...",
                            '<32>* \"Uma flor do além... uma segunda vida... o formato de uma estrela...\"',
                            "<32>* É tudo que você consegue ler."
                        ],
            f_trash2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O tablet descreve vários usos para buracos de minhocas.)']
                    : world.darker
                        ? ['<32>{#p/basic}* O tablet não contém nada além de conteúdo sem precisão.']
                        : [
                            "<32>{#p/basic}* É um tablet com informações relativas sobre buracos de minhoca.",
                            '<32>* Uma sessão adicional informa os perigos das armas buraco de minhoca...'
                        ],
            f_trash3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O tablet apresenta um conto completo sobre anime de ficção cientifica.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um tablet com videos.\n* Você não teria interesse nos conteúdos."]
                        : [
                            "<32>{#p/basic}* É um velho tablet para ver anime de ficção cientifica.",
                            '<32>* A capa diz \"MEW MEW STARFIRE: COLEÇÃO COMPLETA.\"'
                        ],
            f_undynedummy: () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}* Eu estive pensando em encontrar uma nova identidade.",
                        '<32>* O \"Boneco Raivoso\" já não me serve mais.',
                        '<32>* Eu me pergunto se Alphys poderia fazer um novo corpo para mim...',
                        '<32>* Algo como... uma garota-robô, ou... uma digi-mulher...',
                        '<32>* Ou mesmo uma boneca sci-fi?'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? []
                        : SAVE.data.s.state_foundry_deathroom === 'f_undyne' // NO-TRANSLATE

                            ? [
                                '<32>{#p/basic}* Não.\n* Não!\n* NÃO!!',
                                '<32>* Você matou minha única parceira de treinamento.',
                                '<32>* Como OUSA você matar a única pessoa que sabia me bater com propriedade!?',
                                ...(SAVE.data.n.bad_lizard < 2 && 49 <= SAVE.data.n.plot
                                    ? ['<32>* Não importa quantos jogos imbecis da tv eu participe ou tente me distrair...']
                                    : ['<32>* Não importa a culpa preguiçosa que eu coloque em mim...']),
                                "<32>* Eu jamais serei capaz de substituí-la."
                            ]
                            : world.goatbro
                                ? [
                                    '<32>{#p/basic}* Sério.\n* Sério?\n* SÉRIO!?',
                                    '<32>{#p/basic}* Vocês são genuinamente adoráveis.',
                                    ...(SAVE.flag.n.ga_asrielDummy++ < 1
                                        ? ['<25>{#p/asriel2}{#f/13}* Nós... realmente...', '<25>{#p/asriel2}{#f/16}* ...']
                                        : [])
                                ]
                                : SAVE.data.n.plot_date > 1.3 && SAVE.data.n.plot_date < 2.1
                                    ? SAVE.data.n.state_wastelands_toriel === 0
                                        ? ["<32>{#p/basic}* Não se preocupe. \n* Tudo está bem.\n* Acontece o tempo todo."]
                                        : ['<32>{#p/basic}* Que.\n* Que?\n* QUÊ!?', '<32>{#p/basic}* Isso acontece o tempo todo.']
                                    : SAVE.storage.inventory.contents.includes('tvm_mewmew') // NO-TRANSLATE

                                        ? [
                                            "<32>{#p/basic}* Ei, você é super legal com essa sua Boneca Mew Mew, huh?",
                                            "<32>{#p/basic}* Você acha que é adorável e amável e...",
                                            "<32>{#p/basic}* O-oque!?\n* Eu não estou com vergonha!"
                                        ]
                                        : 65 <= SAVE.data.n.plot
                                            ? SAVE.data.b.a_state_hapstablook
                                                ? 68 <= SAVE.data.n.plot
                                                    ? ['<32>{#p/basic}* Você conseguiu, humano.', "<32>{#p/basic}* Eu peço desculpas por duvidar de você."]
                                                    : [
                                                        '<32>{#p/basic}* Bem.\n* Bem!\n* BEM!',
                                                        '<32>* Você certamente sabe escolher suas batalhas.'
                                                    ]
                                                : ['<32>{#p/basic}* Ugh.\n* Ugh!\n* UGH!', '<33>{#p/basic}* Minha vida é uma merda agora.']
                                            : 63 <= SAVE.data.n.plot && SAVE.data.b.a_state_hapstablook
                                                ? [
                                                    "<32>{#p/basic}* Ei, não era pra você estar no próximo show do Mettaton?",
                                                    '<32>* O que você estava fazendo lá atrás?',
                                                    '<32>* Qual foi.\n* Qual foi!\n* QUAL FOI!!',
                                                    '<32>* Volte para o ponto central e vamos seguir com o plano!'
                                                ]
                                                : SAVE.data.n.bad_lizard < 2 && 49 <= SAVE.data.n.plot
                                                    ? [
                                                        '<32>{#p/basic}* Então.\n* Então!\n* ENTÃO!',
                                                        "<32>* Você é uma estrela de TV, huh?",
                                                        '<32>* Pois é, Mettaton normalmente tem esse tipo de efeito nas pessoas.'
                                                    ]
                                                    : SAVE.data.n.plot === 47.2
                                                        ? ['<32>{#p/basic}* Pronto ou não, aí vem ela!!']
                                                        : SAVE.data.n.state_wastelands_toriel === 0
                                                            ? ['<32>{#p/basic}* Olá de novo!']
                                                            : SAVE.data.b.f_state_dummypunch
                                                                ? [
                                                                    '<32>{#p/basic}* Ei \n* Ei!\n* EI!',
                                                                    ...(SAVE.data.b.f_state_dummypunch_meanie
                                                                        ? [
                                                                            "<32>* Você não bate tão mau para um boneco.",
                                                                            "<32>* É uma pena...",
                                                                            "<32>* PORQUE EU JÁ ESTOU TOMADO!",
                                                                            '<32>* Vá achar seu próprio boneco e sai de perto de mim!'
                                                                        ]
                                                                        : [
                                                                            '<32>* Tire as mãos!\n* Eu não sou classificado como \"E\" para todos, sabe!',
                                                                            '<32>* Murrinhos fracos como os seus jamais vão se comparar aos da Undyne!'
                                                                        ])
                                                                ]
                                                                : SAVE.data.b.f_state_dummyhug
                                                                    ? [
                                                                        '<32>{#p/basic}* Ei \n* Ei!\n* EI!',
                                                                        "<32>* ... você...\n* Abraça muito bem.",
                                                                        '<32>* Então... mesmo com meu medo... eu aprecio a tentativa.'
                                                                    ]
                                                                    : SAVE.data.b.f_state_dummytalk
                                                                        ? [
                                                                            '<32>{#p/basic}* Ei \n* Ei!\n* EI!',
                                                                            ...(SAVE.data.b.f_state_dummytalk_meanie
                                                                                ? [
                                                                                    "<32>* Você tem a olhada intimidadora.",
                                                                                    "<32>* É uma pena você ter gastado ela em mim...",
                                                                                    "<32>* PORQUE EU NÃO PODERIA ME IMPORTAR MENOS!"
                                                                                ]
                                                                                : [
                                                                                    '<32>* Tire os olhos do prêmio!\n* Eu não sou classificado como \"E\" para todos, sabe!',
                                                                                    "<32>* Uma encarada fraca como a sua jamais irá se comparar aos olhos dominantes da Undyne!"
                                                                                ])
                                                                        ]
                                                                        : ['<32>{#p/basic}* Que.\n* Que?\n* QUÊ!?', "<32>{#p/basic}* É um modo de vida."],
            f_view: ['<25>{#p/kidd}{#f/14}* Incrível...'],
            f_village_egg: () => ["<32>{#p/basic}* Tá super cozido."],
            f_village_sign1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal te dá Bem-vindo a área.)']
                    : ['<32>{#p/tem}* \"hOI!!\"\n* \"seja bem vin a...\"\n* \"VILA TEM!!!\"'],
            f_village_sign2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal implora que você pare na loja mais próxima.)']
                    : ['<32>{#p/tem}* \"hOI!!\"\n* \"vc devhia da olha na...\"\n* \"LOJA TEM!!!\"'],
            f_village_sign3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal concorda com outro sinal implorando para você olhar a loja mais próxima.)']
                    : ['<32>{#p/tem}* \"yaYA!! eu CONCORDÂNCIA!!\"\n* \"desvia checar...\"\n* \"LOJA TEM!!!\"'],
            fstatue: () =>
                SAVE.data.b.svr
                    ? [
                        ['<25>{#p/asriel1}{#f/13}* Essa estátua...', '<25>{#f/15}* Era pra supostamente ser eu...?'],
                        [
                            "<25>{#p/asriel1}{#f/13}* Eu não lembro disso ter sido construído...",
                            "<25>{#f/23}* Deve ter sido depois que eu...",
                            '<25>{#f/22}* ...'
                        ],
                        ['<25>{#p/asriel1}{#f/22}* ...']
                    ][Math.min(asrielinter.fstatue++, 2)]
                    : ["<32>{#p/basic}* É uma estátua velha e abandonada."],
            hapstabed: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/15}* Eu dúvido que nós dormiremos bem nessa cama.",
                            '<25>{#f/23}* Não importa o quão confortável ela pareça.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* É.\n* É uma cama de fantasma, Frisk.',
                            '<25>{#f/13}* Fantasmas tem necessidades diferentes de... bem, não fantasmas.',
                            "<25>{#f/13}* E não estou falando só das suas formas de dormir."
                        ],
                        [
                            '<26>{#p/asriel1}{#f/13}* Fantasmas, mais do que qualquer outro monstro...',
                            '<25>{#f/13}* Parecem ter mais foco no mundo ao redor deles.',
                            "<25>{#f/15}* É como se eles nunca deixassem o que está a frente deles...",
                            '<25>{#f/13}* Distrai-los do que tem depois disso.',
                            "<25>{#f/17}* Em um pensamento secundário, talvez seja por isso que Mettaton ama a TV.",
                            '<25>{#f/16}* Chegar na \"grande imagem\" é basicamente toda a ideia...'
                        ],
                        ['<26>{#p/asriel1}{#f/20}* Mettaton e seus shows de TV, não estou certo?']
                    ][Math.min(asrielinter.hapstabed++, 3)]
                    : world.darker
                        ? ["<32>{#p/basic}* É uma cama de fantasma."]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* Só por que você salvou a galáxia não significa que pode dormir em uma cama de fantasma."]
                            : ["<32>{#p/basic}* É uma cama de fantasma.\n* Você dormiria em baixo dela."],
            hapstabook1: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* É um livro de voz."]),
                '<32>{#p/human}* (Você pega o livro de voz e abre a única seção gravada.)',
                '<32>{#p/hapstablook}* Querido diário, volume um...',
                '<32>* Humanos sonham com tantas histórias fantásticas, ainda assim, quando eu olho pela janela...',
                '<32>* ... tudo que eu consigo ver é uma parede.',
                '<32>* É certo que nós monstros nos acostumamos a viver neste triste estado de vida?',
                '<32>* É certo que apenas as mais novas crianças parecem estar vivendo de verdade?',
                '<32>* O nosso sentimento de felicidade foi tomado de nós...',
                "<32>* Não a dúvida sobre isso.",
                '<32>{#p/human}* (Você coloca o livro de volta no chão.)',
                ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom1++ > 0
                    ? []
                    : [
                        '<32>{#p/basic}* ... ele sempre foi assim nos primeiros dias...',
                        '<32>{#p/basic}* Sempre querendo que todos fossem tão felizes quanto ele.',
                        '<32>{#p/basic}* Especialmente eu.'
                    ])
            ],
            hapstabook2: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* É um livro de voz."]),
                '<32>{#p/human}* (Você pega o livro de voz e abre a única seção gravada.)',
                '<32>{#p/hapstablook}* Querido diário, volume dois...',
                "<32>* Eu tenho assistido uma velha série de TV humanam",
                "<32>* Essas pessoas não são como me foi contado... na verdade, elas são como nós.",
                '<32>* Vivendo, rindo, amando...\n* Machucando e chorando.\n* Fazendo o que eles acreditam.',
                '<32>* Eles dizem que a humanidade é uma espécie a ser temida.',
                '<32>* Mas quanto mais eu vejo... mais eu me canso dessa ideia.',
                "<32>* Os monstros também não são estreladas douradas e roupas o tempo todo.",
                '<32>{#p/human}* (Você coloca o livro de volta no chão.)',
                ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom2++ > 0
                    ? []
                    : [
                        '<32>{#p/basic}* Lembro-me de como, quando nos conhecemos, ele foi o primeiro a se abrir para mim.',
                        "<32>{#p/basic}* Não demorou muito até eu fazer o mesmo..."
                    ])
            ],
            hapstabook3: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* É um livro de voz."]),
                '<32>{#p/human}* (Você pega o livro de voz e abre a única seção gravada.)',
                '<32>{#p/hapstablook}* Querido diário, volume três...',
                "<32>* Tem sido um dia difícil na fazenda para Blooky e eu.",
                "<32>* Duas lesmas das quais estávamos procurando escaparam, não as encontramos em lugar algum.",
                '<32>* Não importa o que eu faça, coisas assim sempre acontecem.',
                "<32>* Blooky diz que está tudo bem, claro, mas ele diz isso sobre tudo.",
                '<32>* Eu nem sei porque ainda trabalho aqui.',
                '<32>{#p/human}* (Você coloca o livro de volta no chão.)',
                ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom3++ > 0
                    ? []
                    : [
                        '<32>{#p/basic}* Eu tentei ajudar minha família, mas dá forma que as coisas estão indo...',
                        "<32>{#p/basic}* Não existe nada que eu possa fazer."
                    ])
            ],
            hapstabook4: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* É um livro de voz."]),
                '<32>{#p/human}* (Você pega o livro de voz e abre a única seção gravada.)',
                '<32>{#p/hapstablook}* Querido diário, volume quatro...',
                '<32>* Eu estava no mercado hoje quando acabei esbarrando em uma garota... Alphys, eu acho?',
                "<32>* Aparentemente ela a próxima na linha para cientista real.\n* Quem imaginaria?",
                '<32>* Eu e ela nos tornamos amigos muito rápido devido ao nosso amor compartilhado pela humanidade.',
                '<33>* Engraçado... o antigo cientista real também era simpático.',
                '<32>* Por que será desse padrão?',
                '<32>{#p/human}* (Você coloca o livro de volta no chão.)',
                ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom4++ > 0
                    ? []
                    : ['<32>{#p/basic}* Oh, se eu soubesse a resposta...'])
            ],
            hapstabook5: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* É um livro de voz."]),
                '<32>{#p/human}* (Você pega o livro de voz e abre a única seção gravada.)',
                '<32>{#p/hapstablook}* Querido diário, volume cinco...',
                '<32>* Alphys e eu começamos a trabalhar em um projeto.',
                "<32>* Estamos tomando inspiração daqueles humanos imaginários...",
                '<32>* ... começando uma nova série de televisão!',
                "<32>* Eu já elaborei vários cenários.",
                "<32>* Se isso não levantar o ânimo do público, então não sei o que vai!",
                '<32>* Haha... vamos só dizer que as coisas podem ficar \"explosivas.\"',
                '<32>{#p/human}* (Você coloca o livro de volta no chão.)',
                ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom5++ > 0
                    ? []
                    : ['<32>{#p/basic}* Tudo que ele sempre quis fazer foi trazer felicidade...'])
            ],
            hapstabook6: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* É um livro de voz."]),
                '<32>{#p/human}* (Você pega o livro de voz e abre a única seção gravada.)',
                '<32>{#p/hapstablook}* Querido diário, volume seis...',
                '<32>* Alphys... ela fez algo que eu jamais imaginaria.',
                '<32>* Graças a ela, meu futuro parece mais brilhoso do que nunca...',
                '<32>* ... Eu só espero que os outros possam entender minha escolha.',
                '<32>* Não importa o que aconteça comigo a seguir, uma parte de mim sempre sentirá falta de estar com você.',
                '<32>* Por favor... nunca esqueça isso.\n* Mesmo se eu mesma fizer.',
                '<32>{#p/human}* (Você coloca o livro de volta no chão.)',
                ...(SAVE.data.b.svr || SAVE.data.b.oops || SAVE.data.n.state_foundry_hapstacom6++ > 0
                    ? []
                    : SAVE.data.n.plot < 68
                        ? [
                            '<32>{#p/basic}* Sentimental como sempre, eh?',
                            "<32>{#p/basic}* Bem.\n* Com sorte, estaremos reunidos em tempos melhores logo."
                        ]
                        : [
                            '<32>{#p/basic}* Sentimental como sempre, eh?',
                            "<32>{#p/basic}* Heh.\n* Eu só estou feliz que você esteja reunido com eles no fim."
                        ])
            ],
            hapstacouch: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Mas você sabia que ainda tinha um pouco mais para andar antes de poder descansar.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É apenas um sofá."]
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Outro sofá, outra tentação... você está tão cansado depois de toda essa viagem",
                                "<32>{#p/basic}* ... mas você não pode ficar aqui pra sempre!"
                            ]
                            : [
                                "<32>{#p/basic}* Outro sofá, outra tentação... você está tão cansado depois de toda essa viagem",
                                '<32>{#p/basic}* ... mas você deve continuar indo!'
                            ],
            hapstaposter: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A legenda neste pôster descreve uma história de amor.)']
                    : ['<32>{#p/basic}* \"Dois amantes de estrelas caem em um abismo digital...\"'],
            hapstatv: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Essa coisa deve ter centenas de anos...',
                            '<25>{#f/17}* Te faz questionar como você chegou da Terra para aqui tão rápido.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Você entende que a Terra é alguns anos luz daqui, certo?',
                            '<25>{#f/15}* As chances disso estar aqui são tão pequenas...',
                            "<25>{#f/16}* Que parte disso me faz pensar que não foi um acidente.",
                            '<25>{#f/10}* Mas por que os humanos nos enviariam suas tralhas com centenas de anos?'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/17}* Minha teoria é que provavelmente tenha algum humano... do nosso lado.',
                            "<25>{#f/13}* Esses humanos não poderiam nos mandar tecnologia avançada, pois seria detectada.",
                            '<25>{#f/1}* Mas se eles nos mandassem tecnologia ancestral...',
                            '<25>{#f/2}* Bem, os outros humanos podem não ter notado.',
                            "<25>{#f/3}* Mas isso é só teoria."
                        ],
                        ["<25>{#p/asriel1}{#f/21}* Com certeza seria bem legal ter um aliado extra aí fora..."]
                    ][Math.min(asrielinter.hapstatv++, 3)]
                    : ['<32>{#p/basic}* Um set de televisão da terra antigo.'],
            hapstawindow: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Pela janela, você olha longamente para a parede do outro lado.)']
                    : world.darker
                        ? ["<32>{#p/basic}* Não a nada para ver aqui."]
                        : ['<32>{#p/basic}* Uma bela vista... da parede externa da foundry.'],
            k_bonedrawer: pager.create(
                0,
                () => [
                    "<25>{#p/undyne}{#f/1}* Eu serei sincera...",
                    "<25>{#f/14}* Faz muito tempo que não vejo o fundo dessa gaveta.",
                    SAVE.data.b.oops
                        ? '<32>{#p/basic}* Nada além de ossos.'
                        : "<32>{#p/basic}* É uma gaveta reservada apenas para Papyrus.\n* Eu gosto disso"
                ],
                () => [
                    SAVE.data.b.oops
                        ? '<32>{#p/basic}* Nada além de ossos.'
                        : "<32>{#p/basic}* É uma gaveta reservada apenas para Papyrus.\n* Eu gosto disso"
                ]
            ),
            k_broadsword: pager.create(
                0,
                () => [
                    '<25>{#p/undyne}{#f/1}* Humanos podem ser maus, mas suas histórias... lendárias.',
                    '<25>{#f/1}* No ponto, o gigante sabre de energia!',
                    '<25>{#f/1}* Historicamente, humanos tem sabres dez vezes seu tamanho.',
                    '<25>{#f/15}* Sem mencionar seus portais interdimensionais.',
                    '<25>{#f/15}* Navios de guerra colossais...',
                    '<25>{#f/1}* Quando eu escutei pela primeira vez, eu imediatamente quis um!',
                    "<25>{#f/14}* Foi por isso que eu e a Alphys construímos um sabre gigante juntas.",
                    '<25>{#f/12}* Ela até descobriu todas as especificações sozinha!',
                    SAVE.data.b.oops
                        ? '<32>{#p/basic}* Essa arma parece ter um passado incrível.'
                        : '<32>{#p/basic}* Uma vez eu vi um sabre desse jeito... mas era real, e nem menor.'
                ],
                () => [
                    SAVE.data.b.oops
                        ? '<32>{#p/basic}* Essa arma parece ter um passado incrível.'
                        : '<32>{#p/basic}* Uma vez eu vi um sabre desse jeito... mas era real, e nem menor.'
                ]
            ),
            k_closet: pager.create(
                0,
                () => [
                    "<25>{#p/undyne}{#f/1}* Esse é meu armário de comidas.",
                    '<25>{#f/17}* O que, você pensou que eu tinha uma cama aí atrás?',
                    '<25>{#f/8}* Hah! Todo mundo sabe que eu durmo no duro chão de pedra.',
                    SAVE.data.b.oops
                        ? "<32>{#p/basic}* Está trancando."
                        : '<32>{#p/basic}* Eu tenho a sensação que a mais do que \"lanches\" neste armário.'
                ],
                () => [
                    SAVE.data.b.oops
                        ? "<32>{#p/basic}* Está trancando."
                        : '<32>{#p/basic}* Eu tenho a sensação que a mais do que \"lanches\" neste armário.'
                ]
            ),
            k_fridge: pager.create(
                0,
                () => [
                    "<25>{#p/undyne}{#f/11}* Comida fria e eu não nos damos bem.",
                    '<25>{#f/14}* Então Alphys modificou minha geladeira para esquentar comida!',
                    '<25>{#f/1}* Da hora, huh?',
                    SAVE.data.b.oops
                        ? '<32>{#p/basic}* Tem um monte de pré-esquentados pratos de espaguete dentro da \"geladeira\".'
                        : '<32>{#p/basic}* Uma geladeira quente teria feito milagres no passado.'
                ],
                () => [
                    SAVE.data.b.oops
                        ? '<32>{#p/basic}* Tem um monte de pré-esquentados pratos de espaguete dentro da \"geladeira\".'
                        : '<32>{#p/basic}* Uma geladeira quente teria feito milagres no passado.'
                ]
            ),
            k_otherdrawer: pager.create(
                0,
                () => [
                    SAVE.data.b.undyne_respecc
                        ? '<26>{#p/undyne}{#f/12}* Cuidado com isso aí.'
                        : "<25>{#p/undyne}{#f/17}* Rouba qualquer coisa da gaveta e eu te MATO.",
                    "<32>{#p/basic}* Há uma gaveta de talheres.\n* Tem garfos, colheres, facas...",
                    '<32>* ... minúsculas lanças de cosmo, sabres de plasma, machados dimensionais...'
                ],
                [
                    "<32>{#p/basic}* Há uma gaveta de talheres.\n* Tem garfos, colheres, facas...",
                    '<32>* ... minúsculas lanças de cosmo, sabres de plasma, machados dimensionais...'
                ]
            ),
            k_piano: pager.create(
                0,
                [
                    "<25>{#p/undyne}{#f/1}* Este é meu piano.",
                    '<25>{#f/16}* Diga o que quiser sobre humanos, mas eles tem ótimo gosto musical.',
                    '<32>{#p/basic}* Cheira a... ciência.'
                ],
                ['<32>{#p/basic}* Cheira a... ciência.']
            ),
            k_sink: pager.create(
                0,
                [
                    '<25>{#p/undyne}{#f/1}* Uma vez eu esqueci de desligar a pia antes de ir pro trabalho.',
                    '<25>{#f/17}* Quando eu voltei a casa tava cheia de água...',
                    '<25>{#f/8}* Não que isso fosse problema pra mim!\n* Fuhuhu!',
                    '<32>{#p/basic}* O ralo está estranhamente limpo de qualquer pele ou cabelo.'
                ],
                ['<32>{#p/basic}* O ralo está estranhamente limpo de qualquer pele ou cabelo.']
            ),
            k_stove: pager.create(
                0,
                [
                    '<25>{#p/undyne}{#f/1}* Isso era pra ser top de linha da marca MTT.',
                    '<25>* Mas, por mais que a tecnologia avance...',
                    '<25>* Nada se compara a comida caseira feita com magia.',
                    '<32>{#p/basic}* O fogão parece ter sido usado várias vezes.'
                ],
                ['<32>{#p/basic}* O fogão parece ter sido usado várias vezes.']
            ),
            k_window: pager.create(
                0,
                () => [
                    '<25>{#p/undyne}{#f/16}* É.',
                    '<25>{#f/14}* Papyrus tende a ir na \"rota cênica.\"',
                    '<32>{#p/basic}* Ele voou tão rápido que criou uma onda sônica.'
                ],
                ['<32>{#p/basic}* Ele voou tão rápido que criou uma onda sônica.']
            ),
            plankstop: () =>
                SAVE.data.b.svr
                    ? [
                        ['<25>{#p/asriel1}{#f/13}* Parece um caminho morto.'],
                        ["<25>{#p/asriel1}{#f/15}* Nós não vamos ficar parados aqui o dia inteiro, certo?"],
                        ['<25>{#p/asriel1}{#f/10}* O que ainda estamos fazendo aqui.'],
                        ['<25>{#p/asriel1}{#f/10}* ...']
                    ][Math.min(asrielinter.plankstop++, 3)]
                    : world.darker || SAVE.data.n.plot < 42.1
                        ? []
                        : ["<32>{#p/basic}* O abismo infinito do espaço é encontrado apenas pela visão distante da borda da fábrica."],
            wallsign4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A placa rotula sua localização.)']
                    : ['<32>{#p/basic}* \"Esquerda - Manutenção\"\n* \"Direita - Saída da Foundry\"']
        },
        truetext: {
            doge1: ['<32>{#p/basic}* ... bem, isso foi melhor do que eu esperava.'],
            muffet: ['<32>{#p/basic}* ... essa foi por pouco.'],
            preundyne: [
                '<32>{#p/basic}* ...',
                "<32>* Para duvidar de você após tudo que você fez...",
                "<32>* ... não.\n* Eu sei que você vai encontrar um jeito de para passar dela.",
                '<32>* Você só precisa acreditar em si mesmo... correto?',
                '<32>* ...\n* Vai lá, vai pra frente.',
                '<32>* Mostre a ela a bondade que seu coração precisa ver.'
            ],
            unddate: () => [
                "<32>{#p/basic}* Olha aí, em um momento nós estamos correndo por nossas vidas delas...",
                '<32>* E no próximo?',
                "<32>* Nós estamos cozinhando espaguete com ela.\n* E colocando fogo na casa.",
                '<32>{#p/human}* (Você ouve uma pequena risadinha.)',
                ...(SAVE.data.n.plot > 64.1
                    ? [
                        "<32>{#p/basic}* Senhor.\n* Nós andamos um longo caminho desde você chegou, hein?",
                        "<32>* Mesmo que não aja muito mais o que ver agora...",
                        "<32>* Eu aprecio o tempo que passei contigo."
                    ]
                    : [
                        '<32>{#p/basic}* Oh, uh, desculpa!\n* Eu...',
                        "<32>* Faça muito tempo desde que eu... me senti feliz assim.",
                        '<32>* Com você agora, parece que as coisas nunca dão errado.'
                    ]),
                "<32>* Então... só continue fazendo o que você tá fazendo, tá bom?",
                "<32>* E eu...",
                "<32>* Eu vou estar aqui por você."
            ],
            undyne1: [
                '<32>{#p/basic}* Nós conseguimos. \n* Nós realmente conseguimos!',
                '<32>* Quer dizer, uh, você conseguiu.',
                '<32>* Isso aí...',
                "<32>* ... pelo menos vai ser legal finalmente ter ela fora das suas costas.",
                '<32>* Por agora, pelo menos.',
                '<32>* Heh.\n* Muito bom, parceiro.',
                "<32>* Eu não acho que alguém vai replicar ESSA façanha novamente."
            ],
            view1: [
                '<32>{#p/basic}* Olha pra isso...',
                "<32>* ...\n* É a Cidadela.",
                "<32>* É onde está jornada nos levará.",
                '<32>* A cidade prateada, aninhada nos arcos gêmeos de Aradon...',
                "<32>* ...\n* Estou me adiantando.",
                "<32>* Nós ainda temos lugares a ir antes de chegar lá, então...",
                "<32>* Por agora, vamos apenas apreciar está vista em nossa frente."
            ]
        },
        unddate0: () =>
            world.trueKills > 0 && SAVE.data.n.state_foundry_undyne === 0
                ? [
                    "<18>{#p/papyrus}ENTÃO VOCÊ ESTÁ AQUI.",
                    "<18>{#f/5}UNDYNE... NÃO ESTÁ PRONTA PARA SER SUA AMIGA AGORA.",
                    SAVE.data.b.undyne_respecc
                        ? '<18>{#f/5}ELA SE CULPA POR TER ACREDITADO EM VOCÊ...'
                        : '<18>{#f/5}ELA SE CULPA POR TER TE DEIXADO FUGIR...',
                    '<18>{#f/6}E ELA ACHA QUE VOCÊ... MERECE MORRER??',
                    '<18>{#f/7}BEM, EU DISCORDO!',
                    "<18>{#f/0}MAS TUDO BEM.",
                    "<18>{#f/0}EU VOU FICAR ESPERANDO ATÉ ELA VOLTAR."
                ]
                : [
                    '<18>{#p/papyrus}OHO, O HUMANO CHEGA!',
                    ...(SAVE.data.n.state_foundry_undyne > 0
                        ? [
                            "<18>{#f/4}... MAS, INFELIZMENTE EU NÃO SEI OND ESTÁ A UNDYNE.",
                            "<18>{#f/5}ELA NORMALMENTE NÃO FICA FORA TANTO TEMPO...",
                            "<18>{#f/6}E ELA NEM RESPONDE O CELULAR!",
                            "<18>{#f/0}BEM, EU VOU SÓ ESPERAR ATÉ ELA VOLTAR."
                        ]
                        : [
                            '<18>{#f/4}VOCÊ ESTÁ PRONTO PARA A TAREFA ASSUSTADORA...',
                            '<18>{#f/1}CONQUISTAR A AMIZADE DA CAPITÃ DA GUARDA REAL!?!?',
                            choicer.create('* (Ser amigo da Undyne?)', 'Sim', 'Não')
                        ])
                ],
        unddate0x: () =>
            world.trueKills > 0 || SAVE.data.n.state_foundry_undyne > 0
                ? [
                    "<18>{#p/papyrus}{#f/0}UNDYNE NÃO ESTÁ AQUI AGORA.",
                    "<18>{#p/papyrus}{#f/4}VOCÊ VAI TER QUE ESPERAR POR ELA IGUAL EU SEMPRE FAÇO."
                ]
                : [
                    '<18>{#p/papyrus}{#f/0}OKAY!\nTUDO PRONTO PARA UM BELO ROLÊ?',
                    choicer.create('* (Ser amigo da Undyne?)', 'Sim', 'Não')
                ],
        
        unddate1a: ['<18>{#p/papyrus}{#f/0}CERTO!\nFIQUE ATRÁS DE MIM!'],
        unddate1b: pager.create(
            0,
            ['<18>{#p/papyrus}{#f/4}HMM... AINDA SE APRONTANDO?', '<18>{#f/0}BEM, TOME SEU TEMPO!'],
            ['<18>{#p/papyrus}{#f/0}TOME SEU TEMPO!']
        ),
        unddate2a: ['<18>{#p/papyrus}{#f/4}PSST...\nDÊ ISSO A ELA.'],
        unddate2b: ['<18>{#f/0}ELA AMA ISSO!'],
        unddate3: [
            '<25>{#p/undyne}{#f/14}* Oi, Papyrus!',
            '<25>{#f/1}* Pronto para seu super-privado, um por um, treinamento?',
            '<18>{#p/papyrus}PODE APOSTAR QUE ESTOU!',
            '<18>{#f/9}E EU TROUXE UM AMIGO!'
        ],
        unddate4: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    "<25>{#p/undyne}{#f/1}* Oi, eu ano acho que nós nos...",
                    '<25>{#f/8}* ... OH MEU SENHOR!!!',
                    '<18>{#p/papyrus}{#f/6}... UNDYNE?',
                    "<25>{#p/undyne}{#f/12}* Pfft, eu nem acredito que você trouxe ELE aqui.",
                    '<18>{#p/papyrus}{#f/5}...',
                    '<25>{#p/undyne}{#f/1}* Vamos lá, entrem!'
                ]
                : [
                    "<25>{#p/undyne}{#f/1}* Oi, eu ano acho que nós nos...",
                    '<25>{#f/4}* ...',
                    '<18>{#p/papyrus}...',
                    '<25>{#p/undyne}{#f/5}* ...',
                    '<18>{#p/papyrus}{#f/5}...',
                    "<25>{#p/undyne}{#f/17}* Por que. \n* Vocês dois.\n* Não entram?"
                ],
        
        unddate5: ['<18>{#p/papyrus}AQUI, UNDYNE.', '<18>MEU AMIGO QUER TE DAR ISSO!'],
        unddate5x: [
            '<25>{#p/undyne}{#f/17}* Aí estão vocês!',
            "<25>{#f/1}* Nós ficamos te esperando aqui PRA SEMPRE!",
            "<18>{#p/papyrus}{#f/4}E, NÃO SE PREOCUPA, EU JÁ MOSTREI PRA UNDYNE O NOSSO PRESENTE.",
            '<18>{#f/0}ELA AMOU!',
            '<25>{#p/undyne}{#f/14}* Claro, hmm...',
            '<25>{#f/12}* Eu amei mesmo!'
        ],
        unddate6: ['<25>{#p/undyne}{#f/1}* Uhhh... obrigado.'],
        unddate7: ["<25>{#f/14}* Eu vou, uh, colocar isso com os outros."],
        unddate8: ['<25>* Então, prontos para começar?'],
        unddate9: [
            '<18>{#p/papyrus}{#f/1}WHOOPSY DOOPSY!\nEU ACABEI DE ME LEMBRAR!',
            '<18>{#f/0}EU PRECISO VER MEU IRMÃO!!',
            '<18>{#f/9}DIVIRTAM-SE, VOCÊS DOIS!'
        ],
        unddate10: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    SAVE.data.b.f_state_undynecheck
                        ? "<26>{#p/undyne}{#f/17}* Se não é o humano que tentou invadir minha casa NA MINHA FRENTE."
                        : "<25>{#p/undyne}{#f/1}* Hora hora.\n* Olha só quem voltou pra ter mais.",
                    "<25>{#f/16}* Mas pra ser honesta, eu não sei se estou no clima para mais uma luta.",
                    '<25>{#f/12}* Mas, por enquanto eu posso te dar algo para beber!',
                    "<25>{#f/1}* Sentir-se, e eu verei o que posso fazer."
                ]
                : [
                    '<25>{#p/undyne}{#f/11}* ...',
                    ...(SAVE.data.b.f_state_undynecheck
                        ? [
                            '<25>* Por que VOCÊ estava tão desesperado para entrar na minha casa mais cedo?',
                            '<25>* É algum tipo de técnica de humilhação?',
                            '<25>* Entrar na minha casa e declarar ela como sua?'
                        ]
                        : [
                            '<25>* Então, por que você está aqui?',
                            '<25>* Para esfregar sua vitória na minha cara?',
                            '<25>* Para me humilhar ainda mais?'
                        ]),
                    '<25>{#f/4}* É ISSO?',
                    choicer.create('* (O que você acha?)', 'Sim', 'Não')
                ],
        unddate11a: () => [
            '<25>{#p/undyne}{#f/11}* Então por que você está aqui?',
            '<25>{#f/1}* Espera, eu entendi.',
            "<25>* Você pensa que vai conseguir ser meu amigo, não é?",
            '<25>{#f/17}* CERTO???',
            choicer.create('* (O que você acha?)', 'Sim', 'Não')
        ],
        unddate11a1a: [
            '<25>{#p/undyne}{#f/14}* Sério?\n* Que delícia!\n* Eu aceito!',
            "<25>{#f/8}* Vamos brincar nos campos da amizade!",
            '<25>{#f/7}* ... NÃO!',
            "<25>{#f/1}* Você é o inimigo dos sonhos e esperanças de todos!",
            "<25>* Se você não fosse meu convidado eu te chutaria para fora agora mesmo!",
            '<25>{#f/5}* ...'
        ],
        unddate11a1b: [
            '<25>{#p/undyne}{#f/15}* Então de novo...',
            '<25>{#f/17}* ...',
            '<25>{#f/4}* TÁ OLHANDO O QUE?',
            "<25>{#f/5}* EU NÃO FARIA AMIZADE COM VOCÊ SÓ PRA IMPRESSIONAR ALGUÉM???",
            '<25>{#f/12}* Não mesmo!',
            '<25>{#f/1}* Na verdade, minha mudança de pensamento repentina...',
            '<25>{#f/7}* Vem através de nada além de uma paixão quente por VINGANÇA!'
        ],
        unddate11a2: [
            '<25>{#p/undyne}{#f/13}* ...',
            '<25>{#f/11}* Então... eu vou deixar isso claro.',
            '<25>* Primeiro, você tentou entrar na minha casa.',
            "<25>{#f/7}* E então você não me dá uma razão POR QUÊ??",
            "<25>{#f/4}* Sua PIRRALHA!\n* Se você não fosse minha convidada, eu...!",
            '<25>{#f/5}* ...',
            '<25>{#f/4}* ... não, quer saber?',
            "<25>{#f/7}* Eu vou te provar ERRADO.",
            "<25>{#f/1}* Nós não vamos apenas ser AMIGAS."
        ],
        unddate11b: [
            '<25>{#p/undyne}{#f/4}* Oh-ho-ho.',
            "<25>{#f/7}* Bem, eu tenho novas para você, PIRRALHA.",
            "<25>{#f/1}* Você está no meu campo de batalha!",
            "<25>{#f/7}* E você NÃO vai me humilhar.",
            "<25>{#f/11}* Não.\n* Eu VOU TE CONTAR o que vai acontecer.",
            "<25>{#f/17}* Nós vamos sair juntas.",
            "<25>{#f/17}* Nós vamos ter um momento legal.",
            '<25>{#f/7}* Nós seremos \"amigas.\"'
        ],
        unddate12a: [
            "<25>{#f/1}* Eu te faria gostar tanto de mim...",
            "<25>{#f/7}* Que você não será capaz de pensar em mais ninguém!"
        ],
        unddate12b: ["<25>{#f/8}* Fuhuhuhu!\n* É a VINGANÇA PERFEITA!!"],
        unddate12c: ["<25>{#f/12}* Err... que tal você se sentar?"],
        unddate13: () => [
            SAVE.data.b.undyne_respecc
                ? '<25>{#p/undyne}{#f/1}* Precisa de algo?'
                : '<25>{#p/undyne}{#f/14}* Precisa de algo?',
            choicer.create('* (O que você acha?)', 'Fome', 'Livro', 'Casa', 'Nada')
        ],
        unddate13a1: [
            '<25>{#p/undyne}{#f/1}* Você quer comer?',
            '<25>{#f/1}* Deixa eu ver o que tenho na dispensa.'
        ],
        unddate13a2: ['<25>{#p/undyne}{#f/1}* Ah... isso aqui deve ser ótimo.'],
        unddate13a3: ['<25>{#p/undyne}{#f/14}* Todo seu...\n* Fuhuhu.'],
        unddate13a4a: ["<32>{#p/human}* (Você está carregando demais.)"],
        unddate13a4b: ['<32>{#p/human}* (Você ganhou a Rapadura.)'],
        unddate13a5: () =>
            SAVE.data.b.drop_snack
                ? [
                    "<25>{#p/undyne}{#f/17}* Eu sei que jogar comida no chão é bem legal, mas eu não posso desperdiçar tudo.",
                    '<25>{#p/undyne}{#f/12}* Desculpa.'
                ]
                : SAVE.data.b.undyne_respecc
                    ? [
                        "<25>{#p/undyne}{#f/17}* Não é porque você é minha amiga que pode ter dois lanches!",
                        '<25>{#p/undyne}{#f/1}* Talvez outra hora.'
                    ]
                    : [
                        "<25>{#p/undyne}{#f/11}* Escuta aqui cara, é um lanche por pessoa aqui.",
                        '<25>* Ajuste-se ao padrão ou mete o pé.'
                    ],
        unddate13b: pager.create(
            0,
            () => [
                '<25>{#p/undyne}{#f/13}* Um livro?\n* Tenho cara de libraria?',
                "<25>{#f/1}* Os únicos livros que você vai encontrar aqui são os de cozinhar!",
                "<25>{#f/4}* Que eu não uso, já que cozinhar é pra ser uma ARTE.",
                '<25>{#f/7}* Não alguma tarefa besta cheia de regras.',
                '<25>{#f/5}* Por que ninguém entende isso???',
                SAVE.data.b.undyne_respecc
                    ? '<25>{#f/1}* ... me deixe saber se você precisar de mais alguma coisa.'
                    : '<25>{#f/14}* Bem, me deixe saber se você precisar de mais alguma coisa!'
            ],
            [
                "<25>{#p/undyne}{#f/1}* Olha, tem uma libraria em Starton.",
                "<25>{#f/1}* Se você quer tanto ler, vai lá.",
                '<25>{#f/7}* Mas agora não!!!',
                '<25>{#f/14}* ... se precisar de mais alguma coisa é só me dizer.'
            ]
        ),
        unddate13c: pager.create(
            0,
            () => [
                '<25>{#p/undyne}{#f/3}* ...',
                '<25>{#f/17}* Aqui É casa.',
                "<25>{#f/17}* Você já está em casa.",
                '<25>{#f/16}* Ah não ser que você esteja falando do planeta natal...',
                '<25>{#f/9}* ...',
                '<25>{#f/19}* Mas nada pode trazê-lo de volta.',
                SAVE.data.b.undyne_respecc
                    ? "<25>{#f/1}* ... Eu vou estar aqui se você precisar de mais alguma coisa."
                    : '<25>{#f/14}* Bem, me deixe saber se você precisar de mais alguma coisa!'
            ],
            () => [
                "<25>{#p/undyne}{#f/16}* Eu te daria a descrição daquele lugar se pudesse.",
                '<25>{#f/16}* Mas eu nasci aqui, no Outpost...',
                '<25>{#f/9}* As memórias do nosso mundo parecem sumir dia após dia.',
                SAVE.data.b.undyne_respecc
                    ? '<25>{#f/1}* ... me deixe saber se você precisar de mais alguma coisa.'
                    : '<25>{#f/12}* ... me diz se precisar de outra coisa.'
            ]
        ),
        unddate13d: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/1}* Certo.\n* Lembre-se que estou aqui se mudar de ideia."
                : "<25>{#p/undyne}{#f/14}* Tudo bem.\n* Lembre-se que estou aqui se mudar de ideia!"
        ],
        unddate14: () => [choicer.create('* (Sentar-se?)', 'Sim', 'Não')],
        unddate15a: () => [
            '<25>{#p/undyne}{#f/14}* Confortável?',
            SAVE.data.b.undyne_respecc
                ? "<25>{#f/1}* Eu vou te dar algo para beber."
                : "<25>{#f/14}* Eu vou te dar algo para beber."
        ],
        unddate15b: () => [
            '<25>{#p/undyne}{#f/14}* Confortável?',
            SAVE.data.b.undyne_respecc
                ? "<25>{#f/1}* Eu vou te dar algo para..."
                : "<25>{#f/14}* Eu vou te dar algo para...",
            '<25>{#f/17}* ...',
            '<25>{#f/17}* O que você ainda está fazendo com uma xícara de fluido umedecedor?',
            '<25>{#f/17}* Joga isso fora!'
        ],
        unddate15c: () => [
            '<32>{#p/human}* (Você descartou o fluido de eletro-amortecimento.)',
            SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* Valeu.' : '<25>{#p/undyne}{#f/14}* Aprecio o gesto.'
        ],
        unddate16: () => [
            SAVE.data.b.undyne_respecc
                ? '<25>{#p/undyne}{#f/1}* Tudo pronto!\n* Escolha sua bebida!'
                : '<25>{#p/undyne}{#f/14}* Tudo pronto!\n* O que você deseja?'
        ],
        unddate17: () => [
            "<25>{#p/undyne}{#f/17}* EI!\n* NÃO LEVANTA!",
            ...(SAVE.data.b.undyne_respecc
                ? ['<25>{#f/10}* ...', '<25>{#f/16}* Desculpa, reflexo.\n* Eu devo realmente parar de fazer isso...']
                : ["<25>{#f/17}* VOCÊ É O CONVIDADO! \n* SENTA AÍ E CURTE O MOMENTO!", '<25>{#f/17}* ...'])
        ],
        unddate18: () =>
            SAVE.data.b.undyne_respecc
                ? ['<25>{#p/undyne}{#f/1}* Hm, que tal você apontar para o que quer?', '<25>{#f/16}* Você pode usar a lança.']
                : [
                    '<25>{#p/undyne}{#f/12}* Hm, por que você não aponta para o que gosta?',
                    '<25>{#f/12}* Você pode usar a lança!'
                ],
        unddate19x: '* Mova para esquerda e direita.\n* Selecione com [Z].',
        unddate19y: () => [
            SAVE.data.b.undyne_respecc ? '* Undyne\n* A maravilhosa mulher peixe.' : '* Undyne\n* A brava mulher peixe.',
            '* Armário de Comida\n* Várias delícias aí dentro!',
            '* Água\n* Uma escolha inteligente.',
            '* Açúcar\n* Bom com chá quente.',
            '* Soco Exoberry, feito localmente... ou assim dizem.',
            "* Chocolate quente\n* Tem um cilindro azul.",
            '* Chá\n* A mais equilibrada escolha?',
            '* Geladeira\n* Coisas demais para uma refeição.',
            '* Sabre de Energia\n* A lendária arma humana.'
        ],
        unddate20: [
            pager.create(0, ['<25>{#p/undyne}{#f/13}* Você está...\n* Dando em cima de mim?'], ['<25>{#p/undyne}{#f/13}* ?????']),
            pager.create(
                0,
                [
                    "<25>{#p/undyne}{#f/17}* Era pra você escolher uma bebida??",
                    "<25>{#f/1}* Não tem nada no armário além de lanches."
                ],
                ["<25>{#p/undyne}{#f/1}* Sério, só tem comida aí dentro.\n* Não tem mais nada!"],
                ['<25>{#p/undyne}{#f/1}* Sério!']
            ),
            pager.create(
                0,
                [
                    '<25>{#p/undyne}{#f/13}* Você quer ÁGUA?',
                    '<25>{#f/11}* Só... água.',
                    '<25>{#f/11}* Sem nenhum sabor, açúcar ou nada.',
                    '<25>{#f/11}* ...'
                ],
                ['<25>{#p/undyne}{#f/11}* ...']
            ),
            pager.create(
                0,
                [
                    "<25>{#p/undyne}{#f/12}* Aquele açúcar só tá ali pelo chá.",
                    "<25>{#f/7}* Eu não vou te dar um copo de açúcar!"
                ],
                () =>
                    SAVE.data.b.undyne_respecc
                        ? ['<25>{#p/undyne}{#f/1}* sem açúcar, coração de doce.']
                        : ["<25>{#p/undyne}{#f/14}* O açúcar é para o chá, BELEZA?"]
            ),
            pager.create(
                0,
                [
                    '<25>{#p/undyne}{#f/1}* Ah... soco exoberry.',
                    "<25>{#f/14}* Bem, Papyrus ama essa parada, então eu acho que deve ser bom."
                ],
                ['<25>{#p/undyne}{#f/17}* Você vai escolher alguma coisa ou o que?']
            ),
            pager.create(
                0,
                ['<25>{#p/undyne}{#f/14}* Nada como um belo copo de chocolate quente.'],
                ['<25>{#p/undyne}{#f/17}* Chocolate quente, certo?']
            ),
            pager.create(0, ['<25>{#p/undyne}{#f/14}* Chá, huh?'], ["<25>{#p/undyne}{#f/12}* Então um chá, certo?"]),
            pager.create(
                0,
                [
                    '<25>{#p/undyne}{#f/4}* A geladeira!?\n* Você quer comer tudo na geladeira!?',
                    '<25>{#p/undyne}{#f/17}* Não!'
                ],
                ['<25>{#p/undyne}{#f/17}* Eu disse não!'],
                ['<25>{#p/undyne}{#f/17}* Não!'],
                ['<25>{#p/undyne}{#f/17}* Você sabe o que a palavra \"não\" significa?'],
                ['<25>{#p/undyne}{#f/17}* ... pelo visto não sabe!'],
                ['<25>{#p/undyne}{#f/17}* ...']
            ),
            pager.create(
                0,
                [
                    '<25>{#p/undyne}{#f/1}* O sabre de energia...',
                    "<25>{#p/undyne}{#f/12}* Os humanos usavam essa arma contra nós na guerra!",
                    '<25>{#p/undyne}{#f/16}* ... está é uma delas, de toda forma.'
                ],
                ["<25>{#p/undyne}{#f/17}* Não está a venda."]
            )
        ],
        unddate21: () => [choicer.create('* (Escolher está bebida?)', 'Sim', 'Não')],
        unddate22: [
            ['<25>{#p/undyne}{#f/16}* Tá bom, eu acho...'],
            ["<25>{#p/undyne}{#f/1}* Vamos dar um soco na sua hidratação!"],
            ['<25>{#p/undyne}{#f/14}* Não tem hora melhor do que hora do chocolate quente!'],
            ['<25>{#p/undyne}{#f/14}* Chá, aí vem o chá.']
        ],
        unddate22x: ["<25>{#p/undyne}{#f/12}* Vai levar um momento até a água ferver."],
        unddate22y: () => [
            SAVE.data.b.undyne_respecc ? '<25>{#p/undyne}{#f/1}* Aqui.' : '<25>{#p/undyne}{#f/12}* Tudo pronto!'
        ],
        unddate23: ['<25>{#p/undyne}{#f/1}* Aqui está.'],
        unddate24: [
            ['<25>{#p/undyne}{#f/12}* Aproveite...?'],
            ["<25>{#p/undyne}{#f/12}* Cuidado, está azedo."],
            ["<25>{#p/undyne}{#f/14}* Cuidado, está quente."],
            ["<25>{#p/undyne}{#f/14}* Cuidado, está quente."]
        ],
        unddate25: [
            () => [
                '<25>{#p/undyne}{#f/17}* Sério?\n* Só bebe logo!',
                '<32>{#p/human}{#s/heal}* (Você dá um gole na água.)',
                "<32>{#p/basic}* É, uh... é água. \n* Então tem bom gosto.",
                SAVE.data.b.undyne_respecc
                    ? "<25>{#p/undyne}{#f/1}* Heh.\n* Pelo menos você está feliz."
                    : "<25>{#p/undyne}{#f/12}* Bem, você parece satisfeito."
            ],
            [
                "<25>{#p/undyne}{#f/17}* Qual é o problema?\n* Só bebe logo!",
                '<32>{#p/human}{#s/heal}* (Você dá uma golada.)',
                "<32>{#p/basic}* Está azedo, seus lábios contraem como bucha..."
            ],
            [
                "<25>{#p/undyne}{#f/17}* Não está tão quente!!\n* Bebe logo!",
                '<32>{#p/human}{#s/heal}* (Você toma um gole do Chocolate Quente.)',
                "<32>{#p/basic}* Está queimando..."
            ],
            [
                "<25>{#p/undyne}{#f/17}* Não está tão quente!!\n* Bebe logo!",
                '<32>{#p/human}{#s/heal}* (Você dá uma golada no chá.)',
                "<32>{#p/basic}* Está queimando..."
            ]
        ],
        unddate25x: () => [
            "<32>* Mas tirando isso, está bem gostoso.",
            ...(SAVE.data.b.undyne_respecc
                ? ["<25>{#p/undyne}{#f/1}* Heh.\n* Feliz que você gostou."]
                : [
                    "<25>{#p/undyne}{#f/12}* É bom, né?",
                    '<25>{#f/8}* Nada como o favorito do meu AMIGO ESPECIAL!'
                ])
        ],
        unddate27: [
            [
                "<25>{#p/undyne}{#f/12}* Sabe, é meio engraçado você ter escolhido essa bebida...",
                '<25>{#f/12}* A água.',
                '<25>{#f/1}* Asgore e eu uma vez brincamos sobre como humanos são feitos disso...',
                "<25>{#f/8}* E que quando bebemos isso, estamos CONSUMINDO a humanidade!!!",
                "<25>{#f/16}* ... bem, ele não achou engraçado na verdade.",
                "<25>{#f/16}* Ele tem um olhar sério para quase tudo..."
            ],
            [
                "<25>{#p/undyne}{#f/12}* Sabe, é bem interessante você ter escolhido essa bebida...",
                '<25>{#f/12}* Soco exoberry...',
                '<25>{#f/1}* Alphys e Papyrus meio que \"inventaram\" isso juntos.',
                "<25>{#f/16}* Eu não sou muito fã, mas quando mostrei para o Asgore...",
                "<25>{#f/12}* Bem, digamos que ele o colocou em produção em massa."
            ],
            [
                "<25>{#p/undyne}{#f/12}* Sabe, é bem legal que você acabou escolhendo ESSA bebida...",
                '<25>{#f/12}* Chocolate quente...',
                '<25>{#f/16}* Teve uma vez, após o CORE ter um problema...',
                '<25>{#f/16}* E eles tiveram que reiniciar todo o sistema atmosférico.',
                '<25>{#f/10}* Não havia calor, pouco ar... e ficava cada vez mais frio...',
                '<25>{#f/1}* Então, Asgore apareceu e me ofereceu chocolate quente.',
                '<25>{#f/12}* Nos sentamos juntos nessa sala...'
            ],
            [
                "<25>{#p/undyne}{#f/12}* Sabe, é meio estranho que você acabou gostando DESSE chá...",
                '<25>{#f/12}* Chá Estrelado...',
                "<25>{#f/1}* Esse sempre foi o favorito do Asgore."
            ]
        ],
        unddate28: () => [
            '<25>{#p/undyne}{#f/14}* Na verdade, agora que eu penso sobre isso...',
            '<25>{#f/12}* Você meio que me lembra ele.',
            ...(SAVE.data.b.undyne_respecc
                ? [
                    '<25>{#f/17}* Quer dizer, seus estilos de luta são TOTALMENTE diferentes, mas...',
                    "<25>{#f/1}* Vocês são os dois únicos que conseguiram de fato me derrotar.",
                    '<25>{#f/9}* ... em um certo sentido.'
                ]
                : ["<25>{#f/8}* Vocês dois são MUITO habilidosos!", '<25>{#f/9}* ... bem.'])
        ],
        unddate29: [
            '<25>{#p/undyne}{#f/16}* A verdade é que eu era uma criança muito cabeça quente.',
            '<25>* Uma vez, para provar que eu era a mais forte...',
            '<25>{#f/17}* ...tentei lutar contra Asgore.\n* Ênfase no TENTEI.',
            '<25>{#f/1}* Eu mal consegui acertar um soco nele!',
            '<25>* E pior ainda, ele se recusava a lutar de volta!',
            '<25>{#f/9}* Eu fui humilhada...',
            '<25>{#f/16}* Depois disso ele pediu desculpas e disso algo bem bobo...',
            '<25>* \"Undyne, você quer descobrir como me derrotar?\"',
            '<25>{#f/1}* Eu disse que sim, desde então ele me treinou.',
            '<25>{#f/16}* Um dia, durante a prática, eu finalmente derrubei ele no chão.',
            '<25>{#f/9}* Eu me senti... má.',
            '<25>{#f/12}* Mas ele estava brilhando...',
            '<25>{#f/1}* Eu nunca vi alguém tão orgulhoso por ter tido a cara amassada.',
            '<25>* Cortando a história, depois de completar meu treinamento...',
            '<25>{#f/14}* Eu me tornei a líder da Guarda Real!',
            "<25>{#f/8}* Então sou eu quem treina soldados para o combate!",
            '<25>{#f/1}* ... tipo, uh, o Papyrus.'
        ],
        unddate30: [
            '<25>{#f/16}* Mas, hm, pra ser honesta...',
            "<25>{#f/16}* ... Eu não sei se...",
            '<25>{#f/9}* Eu não sei se um dia vou deixar Papyrus entrar na Guarda Real.',
            "<25>{#f/17}* Não diga pra ele que eu te disse isso!",
            "<25>{#f/10}* Ele só...\n* Bem...",
            "<25>{#f/9}* Olha, não é que ele seja estúpido.",
            '<25>{#f/17}* Os designs de ataque dele são muito fodas!',
            "<25>{#f/10}* É só que ele...\n* Ele...",
            "<25>{#f/17}* Ele é muito legal e inocente!!!",
            '<25>{#f/16}* Quer dizer, olha pra isso, era pra ele te CAPTURAR...',
            '<25>{#f/11}* E ele acabou sendo seu AMIGO invés disso.',
            '<25>{#f/4}* Eu JAMAIS poderia manda-lo para batalha!',
            "<25>{#f/9}* Ele seria despedaçado em sorrisos felizes.",
            "<25>{#f/12}* Isso é parte do porque...",
            '<25>{#f/12}* Eu comecei a ensina-lo como cozinhar, sabe?',
            '<25>{#f/9}* Assim ele pode fazer alguma outra coisa da vida.'
        ],
        unddate31: () => [
            SAVE.data.b.undyne_respecc
                ? '<25>{#p/undyne}{#f/1}* Ah, desculpa, eu falei tanto...'
                : '<25>{#p/undyne}{#f/12}* Ah, desculpa, eu falei por tanto tempo...'
        ],
        unddate32: [
            ["<25>{#f/12}* Acabou sua água, não foi?"],
            ["<25>{#f/12}* Acabou sua bebida, não foi?"],
            ["<25>{#f/12}* Acabou seu chocolate, não foi?"],
            ["<25>{#f/12}* Acabou seu chá, não foi?"]
        ],
        unddate33: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/1}* Heh, não se preocupa.\n* Eu vou pegar um pouco mais para você."
                : "<25>{#p/undyne}{#f/12}* Heh, não se preocupa.\n* Eu vou pegar um pouco mais para você."
        ],
        unddate34: ['<25>{#p/undyne}{#f/17}* Espera um pouco...', '<25>{#f/17}* Papyrus...\n* A lição dele...'],
        unddate35: [
            '<25>{#p/undyne}{#f/17}* ERA PRA ELE ESTAR TENDO ELA AGORA!!!',
            "<25>{#f/11}* E se ele não está aqui para tê-la...",
            "<25>{#f/7}* VOCÊ VAI TER ELA NO LUGAR DELE!"
        ],
        unddate36: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    "<25>{#f/1}* Isso mesmo!",
                    '<25>{#f/1}* NADA trouxe eu e o Papyrus mais próximos do que cozinhar!',
                    '<25>{#f/17}* Heheh, se você achou que nós nos tornamos amigas antes...',
                    '<25>{#f/8}* SÓ ESPERA O QUE NÓS VAMOS NOS TORNAR DEPOIS DISSO!'
                ]
                : [
                    "<25>{#f/1}* Isso mesmo!",
                    '<25>{#f/1}* NADA trouxe eu e o Papyrus mais próximos do que cozinhar!',
                    '<25>{#f/17}* O que significa que eu vou te dar uma lição...',
                    "<25>{#f/8}* NÓS VAMOS FICAR MAIS PRÓXIMAS DO QUE VOCÊ JAMAIS IMAGINOU!"
                ],
        unddate37: ["<25>{#f/1}* Primeiro, vamos começar com o sachê!!"],
        unddate38: () => [
            '<25>{#f/1}* Olhe para esses vegetais como se fossem seus inimigos mortais!',
            '<25>{#f/7}* Agora, de um lição neles com seu punho!',
            choicer.create('* (O que você irá fazer?)', 'Acariciar', 'Esmurrar')
        ],
        unddate39a: () => [
            '<32>{#p/human}* (Você acaricia os vegetais de maneira afetuosa.)',
            SAVE.data.b.undyne_respecc
                ? "<99>{#p/undyne}{#f/17}* OH MEU SENHOR!!\n* AGORA EU SEI QUE VOCÊ ESTÁ\n  APENAS BRINCANDO COMIGO!!!"
                : '<25>{#p/undyne}{#f/17}* OH MEU SENHOR!!!\n* PARA DE ACARICIAR O INIMIGO!!!',
            "<25>{#x1}{#f/7}* Eu vou te mostrar como se faz!",
            '<25>{#f/4}* NGAHHH!'
        ],
        unddate39b: () =>
            world.meanie
                ? ['<32>{#p/human}* (Você esmurra os vegetais com toda sua força.)']
                : [
                    '<32>{#p/human}* (Você esmurra os vegetais com toda sua força.)\n* (Você nocauteou o tomate.)',
                    '<25>{#p/undyne}{#f/1}* ISSO!\n* ISSO!',
                    '<25>{#f/1}* Nossas mentes estão unidas contra estes vegetais saudáveis!',
                    "<25>{#x1}{#f/7}* AGORA É MINHA VEZ!",
                    '<25>{#f/4}* NGAHHH!'
                ],
        unddate40: (res: number) => [
            ...(world.meanie && res === 1
                ? [
                    SAVE.data.b.undyne_respecc
                        ? "<25>{#p/undyne}{#f/2}* ISSO!!!\n* ESSE É O GUERREIRO QUE CONHEÇO!!!"
                        : '<25>{#p/undyne}{#f/6}* Agressivo hoje, hein?',
                    "<25>{#f/6}* Heh, vamos só jogar isso em uma panela depois."
                ]
                : ["<25>{#p/undyne}{#f/6}* Uh, vamos só jogar isso em uma panela depois."]),
            '<25>{#f/2}* Mas por AGORA!'
        ],
        unddate41: [
            '<25>{#p/undyne}{#f/1}* Nós adicionamos o miojo!',
            '<25>{#f/1}* Miojos feitos em casa são os melhores, sempre tenho um monte.'
        ],
        unddate41x: ['<25>{#p/undyne}{#f/12}* Uhh, você pode vir aqui agora, pirralha.'],
        unddate41y: () => [
            '<25>{#p/undyne}{#f/1}* De toda forma, você tá vendo os miojos aqui, certo?',
            '<25>{#f/1}* Bem...',
            "<25>{#f/17}* JOGA ELES AÍ!",
            choicer.create('* (Qual será sua abordagem?)', 'Com Cuidado', 'Força Bruta')
        ],
        unddate42a: [
            '<32>{#p/human}* (Você coloca cada pedaço do espaguete com segurança.)',
            '<32>* O miojo derrete com beleza na panela.',
            '<25>{#p/undyne}{#f/17}* Bem, funcionou?',
            "<25>{#f/1}* Bem, agora é hora de mexer a massa!"
        ],
        unddate42b: [
            '<32>{#p/human}* (Você joga tudo na panela, inclusive a caixa.)',
            '<32>* A caixa e o miojo derretem na panela.',
            "<25>{#p/undyne}{#f/17}* ISSO AÍ! \n* AMEI A ATITUDE!!",
            "<25>{#f/1}* Certo!\n* Agora é hora de estraçalhar essa massa!"
        ],
        unddate43: [
            '<25>{#p/undyne}{#f/1}* Como regra geral, quanto mais você mexe...',
            '<25>{#f/17}* Melhor o gosto!'
        ],
        unddate44: ['<25>{#p/undyne}{#f/17}* Pronta?', "<25>{#f/1}* Vamos lá!"],
        unddate45: '* Aperte [Z] repetidamente!',
        unddate46: ['<25>{*}{#p/undyne}{#f/17}* Mais rápido!{^20}{%}'],
        unddate46x: ["<25>{*}{#p/undyne}{#f/17}* Não fica aí parada!{^20}{%}"],
        unddate47: ['<25>{*}{#p/undyne}{#f/7}* MAIS RÁPIDO!{^20}{%}'],
        unddate47x: ['<25>{*}{#p/undyne}{#f/7}* MEXA, CARAMBA!{^20}{%}'],
        unddate48: ['<25>{*}{#p/undyne}{#f/8}* RÁPIDO!!!{^20}{%}'],
        unddate48x: ['<25>{*}{#p/undyne}{#f/8}* MEXA!!!{^20}{%}'],
        unddate49: ['<25>{*}{#p/undyne}{#f/8}* Ugh, deixa que eu faço-{^10}{%}'],
        unddate50: ["<25>{#p/undyne}{#f/8}* Fuhuhuhu! \n* Essa é a parada!"],
        unddate51: [
            '<25>{#p/undyne}{#f/1}* Agora, para o paço final...',
            '<25>{#f/17}* AUMENTE O CALOR!',
            '<25>{#f/1}* Deixe o fogão simbolizar sua paixão!',
            '<25>{#f/1}* Deixe suas esperanças e sonhos se transformarem em fogo ardente!',
            "<25>{#f/8}* E é óbvio, não se segura!"
        ],
        unddate52: ['<25>{#p/undyne}{#f/17}* Pronta?', '<25>{#f/1}* Lá vai!'],
        unddate53: '* Aperte [DIREITA] para aumentar o calor!',
        unddate53x: ['<25>{*}{#p/undyne}{#f/8}* Sua boba!\n* Ele só vai pra UM LADO!!!{^20}{%}'],
        unddate54: ['<25>{*}{#p/undyne}{#f/17}* Mais quente!{^20}{%}'],
        unddate54x: ['<25>{*}{#p/undyne}{#f/17}* O que você tá fazendo?{^20}{%}'],
        unddate55: ['<25>{*}{#p/undyne}{#f/7}* MAIS QUENTE!{^20}{%}'],
        unddate55x: ['<25>{*}{#p/undyne}{#f/7}* PARE DE HESITAR!{^20}{%}'],
        unddate56: ['<25>{*}{#p/undyne}{#f/8}* QUENTE!!!{^20}{%}'],
        unddate56x: ['<25>{*}{#p/undyne}{#f/8}* SÓ FAZ ISSO LOGO!!!{^20}{%}'],
        unddate57a: ['<25>{*}{#p/undyne}{#f/17}* Ugh, eu faço então...{^10}{%}'],
        unddate57b: ['<25>{*}{#p/undyne}{#f/17}* Viu, é desse jeito que-{^20}{%}'],
        unddate58: ["<25>{*}{#p/undyne}{#f/17}* Não, espera, isso é muito qu-{^10}{%}"],
        unddate59: ['<25>{#p/undyne}{#f/14}* Ah.'],
        unddate60: ["<25>{#p/undyne}{#f/14}* Cara, e ainda me pergunto porque do Papyrus cozinhar mal."],
        unddate61: ["<25>{#p/undyne}{#f/12}* Então o que agora?\n* Caçar lixo?\n* Bracelete de amizade?"],
        unddate62: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    '<25>{#p/undyne}{#f/10}* ...',
                    '<25>{#f/9}* ... o que eu tô falando...',
                    "<25>{#f/16}* Eu realmente deixei isso sair de controle, não deixei...?",
                    '<25>{#f/16}* Heh...'
                ]
                : [
                    '<25>{#p/undyne}{#f/10}* ...',
                    '<25>{#f/9}* ... o que eu tô falando...',
                    "<25>{#f/16}* Eu realmente ferrei tudo, não ferrei...?",
                    '<25>{#f/16}* Heh...'
                ],
        unddate63: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    "<25>{#f/16}* Quer saber de uma coisa?",
                    "<25>{#f/9}* Eu não estou pronta pra desistir agora.",
                    '<25>{#f/1}* Eu falhei em te ensinar a cozinhar.\n* Que vacilo.',
                    "<25>{#f/14}* Mas tem uma coisa que ainda podemos fazer para salvar essa bagunça.",
                    '<26>{#f/1}* E isso seria...'
                ]
                : [
                    "<25>{#f/16}* Eu não posso te forçar a gostar de mim, humano.",
                    "<25>{#f/9}* Algumas pessoas simplesmente não se dão bem.",
                    "<25>{#f/16}* Eu entendo se você se sentir assim em relação a mim...",
                    "<25>{#f/9}* E se não pudermos ser amigas... tudo bem.",
                    "<25>{#f/9}* Porque...\n* Se não formos ser amigas..."
                ],
        unddate64: () =>
            SAVE.data.b.undyne_respecc
                ? ["<25>{#p/undyne}{#f/17}* UM ÚLTIMO DUELO PARA MOSTRARMOS A GALÁXIA DO QUE SOMOS FEITAS!!!"]
                : ['<25>{#p/undyne}{#f/17}* ENTÃO EU POSSO DE DESTRUIR SEM REMORSO!!!'],
        unddate65: () => [
            '<25>{#p/undyne}{#f/12}* Foi legal, hein?',
            SAVE.data.b.undyne_respecc
                ? "<25>{#f/8}* Nós vamos poder lutar mais outra hora!"
                : "<25>{#f/8}* Nós vamos sair de novo outra hora!",
            '<25>{#f/9}* Mas, uh, em outro lugar, eu acho.',
            ...(world.postnoot
                ? [
                    '<25>{#f/1}* Aliás, já percebeu que tem algo estranho no ar?',
                    ...(world.nootflags.has('papyrus') // NO-TRANSLATE

                        ? ['<25>{#f/13}* Até o Papyrus mencionou mais cedo...']
                        : ['<25>{#f/13}* Parece que começou a pouco tempo...']),
                    "<25>{#f/16}* ... pode não ser nada, mas eu juro que me sinto mais fraca que o normal."
                ]
                : []),
            ...(SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                ? [
                    "<25>{#f/1}* No meio tempo vou estar com o Papyrus no rec center.",
                    '<25>{#f/12}* Eu te vejo por lá!',
                    '<25>{#f/1}* Até lá, liga para o Papyrus pelo seu celular.',
                    "<25>{#f/8}* Já que vamos estar no mesmo lugar, eu vou poder conversar também!"
                ]
                : [
                    "<25>{#f/1}* No meio tempo eu vou estar no rec center.",
                    '<25>{#f/12}* Eu te vejo por lá!',
                    '<25>{#f/1}* Ah, e uh, Papyrus disse que ele tem que ir fazer alguma coisa.',
                    "<25>{#f/14}* Só te avisando, já que ele não vai estar disponível no celular."
                ])
        ],
        unddate66: () =>
            SAVE.data.b.undyne_respecc
                ? ['<25>{#f/1}* Bem, te vejo depois, pirralha!']
                : ['<25>{#f/14}* Bem, te vejo depois, carinha!'],
        undroom1: () => ['<25>{#p/undyne}{#f/17}* Huh?\n* Que droga é essa?'],
        undroom2: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/1}* Não faz isso agora."
                : "<25>{#p/undyne}{#f/12}* Estamos tentando ser amigas aqui."
        ],
        undroom3: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/11}* Isso é algum tipo de tática de batalha estranha, não é?"
                : "<25>{#p/undyne}{#f/11}* Então esse é nosso jeito de sermos amigas?"
        ],
        undroom4: () => ['<25>{#p/undyne}{#f/17}* Para de fazer isso!'],
        undroom5: () => ['<25>{#p/undyne}{#f/17}* ...'],
        undyne1a: [
            "<23>{#p/papyrus}{#f/30}O... OI, UNDYNE!\nEU ESTOU AQUI PARA MINHA REVISÃO DIÁRIA...",
            '<23>UHHH... SOBRE AQUELE HUMANO QUE TE FALEI MAIS CEDO...'
        ],
        undyne1b: ['<23>{#p/papyrus}{#f/30}... HUH?\nSE EU LUTEI COM ELE?'],
        undyne1c: () =>
            
            world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

                ? ['<23>{#p/papyrusnt}UH...', "<23>É C-COMPLICADO!"]
                : ['<23>{#p/papyrusnt}S-SIM!\nCLARO QUE EU LUTEI!', '<23>EU LUTEI VALENTAMENTE!'],
        undyne1d: ['<23>{#p/papyrus}{#f/30}... O QUE?\nSE EU OS CAPTUREI...?'],
        undyne1e: ['<23>{#p/papyrus}{#f/30}B-B-BEM...', '<23>NÃO...'],
        undyne1f: () =>
            world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

                ? ["<23>{#p/papyrus}{#f/30}COMO EU DISSE, É C-COMPLICADO!"]
                : ['<23>{#p/papyrus}{#f/30}E-EU QUERO DIZER, EU TENTEI MUITO, M-MAS NO FIM...'],
        undyne1g: () => [
            '<23>{#p/papyrus}{#f/30}... O-O-O QUE?',
            ...(SAVE.data.n.state_foundry_doge === 1
                ? ["<23>ELE JÁ MATOU UM MEMBRO DO ESQUADRÃO DE ELITE??", "<23>N-NÃO... ELE NÃO FARIA ISSO, FARIA?"]
                : ["<23>VOCÊ VAI PEGAR A ALMA HUMANA POR CONTA PRÓPRIA??"])
        ],
        undyne1h: () =>
            SAVE.data.n.state_foundry_doge === 1
                ? ['<23>{#p/papyrus}{#f/30}DEVE TER OUTRO JEITO!', '<23>COM CERTEZA...']
                : ["<23>{#p/papyrus}{#f/30}MAS UNDYNE, VOCÊ NÃO PRECISA M-MATA-LOS! SABE...", '<23>SABE...'],
        undyne1i: () => [
            '<23>{#p/papyrus}{#f/30}EU...',
            '<23>... EU ENTENDO.',
            "<23>EU VOU TE AJUDAR DA FORMA QUE PUDER.",
            ...(world.postnoot
                ? [
                    '<23>ALIÁS... VOCÊ PRECISA DAR UMA OLHADA NO SISTEMA ATMOSFÉRICO.',
                    '<23>COMO SE CHAMAVA?\nA ESTRUTURA DE TROPOSFERA DE ÁREA AMPLA DA ESFERA?',
                    '<23>ALGO PARECE... ERRADO.'
                ]
                : [])
        ],
        undyne1j: ['<25>{#p/kidd}{#f/1}* Yo!\n* Lá está ela!'],
        undyne1k: ["<25>{#p/kidd}{#f/7}* Espera... você é um humano, não é?"],
        undyne1l: ['<25>{*}{#p/kidd}{#f/7}* COOOORREEEE!{^20}{%}'],
        undyne1m: ['<25>{#p/kidd}{#f/2}* Ufa...'],
        undyne1n: ['<25>{#p/kidd}{#f/1}* Uh, você pode sair da plataforma agora.'],
        undyne1o: ["<25>{#p/kidd}{#f/4}* Onde ela foi...?"],
        undyne1p: ['<25>{#p/kidd}{#f/7}* AH!{^10}{%}'],
        undyne1q: ['<25>{#p/kidd}{#f/2}* Psst, acho que podemos passar escondidos.\n* Vamos!'],
        undyne1r: ["<25>{#p/kidd}{#f/4}* Está escuro...", '<25>{#p/kidd}{#f/7}* ... mas temos que continuar andando!'],
        undyne1s: ['<25>{#p/kidd}{#f/7}* Rápido, nas plantas convenientemente localizados!'],
        undyne2a: [
            '<25>{#p/kidd}{#f/7}* Ela... ela...',
            '<25>{#f/7}* Ela me TOCOU!!',
            "<25>{#f/4}* ...\n* Acho que estamos ambos com sorte, huh?",
            "<25>{#f/5}* As coisas poderiam ficar bem tensas se ela te visse."
        ],
        undyne2ax: () => [
            '<25>{#p/kidd}{#f/1}* Ela... ela...',
            "<25>{#f/1}* Ela não está EM LUGAR NENHUM!?",
            '<25>{#f/3}* Ei caras, vocês viram ela por aí?',
            '<25>{#p/asriel2}{#f/3}* Quem, Undyne?',
            "<25>{#p/kidd}{#f/1}* Isso!\n* Eu estou procurando por ela faz HORAS!",
            '<25>{#p/asriel2}{#f/2}* (Hee hee hee...)',
            '<25>{#p/kidd}{#f/4}* Huh??',
            '<25>{#p/asriel2}{#f/4}* Nada.',
            '<25>{#f/13}* Me diz, quer se juntar a nós por um tempinho?',
            '<25>{#p/kidd}{#f/3}* M... me juntar com vocês?',
            "<25>{#p/asriel2}{#f/4}* É, porque não.\n* Vai ser divertido, eu acho.",
            "<25>{#p/kidd}{#f/4}* Uh...\n* Eu não sei...",
            ...(SAVE.flag.n.genocide_milestone < 5
                ? [
                    '<25>{#p/asriel2}{#f/15}* Olha, você sabia que a Doutora Alphys gosta da Undyne?',
                    '<25>* Tipo, ela gosta dela... MUITO.'
                ]
                : [
                    '<25>{#p/asriel2}{#f/9}* Bem,. você sabia que a Dr. Alphys é mais forte que a Undyne?',
                    "<25>{#f/5}* O problema da Alphys é que ela é assustada demais pra fazer alguma coisa!"
                ]),
            '<25>{#p/kidd}{#f/7}* Que!?\n* Sem chance...',
            "<25>{#p/asriel2}{#f/1}* Isso aí, e essa não é a única coisa que eu sei sobre essas duas.",
            '<25>{#p/kidd}{#f/7}* Me conta mais!',
            '<25>{#p/asriel2}{#f/5}* Tá, tá...\n* Mas só se você vir com $(name) e eu.',
            '<25>{#p/kidd}{#f/1}* Feito!\n* Haha.',
            '<25>{#f/2}* ...'
        ],
        undyne2b: ['<25>{#p/kidd}{#f/1}* Yo, o que você tá esperando?'],
        undyne2bx: ["<25>{#p/kidd}{#f/1}* Vamos!"],
        undyne2c: [
            '<25>{#f/3}* Ei... eu sei que acabamos de nós conhecer, mas...',
            "<25>{#f/4}* Eu não quero que Undyne te machuque...",
            '<25>* ...',
            "<25>{#f/2}* Por que não andamos juntos por um tempo?",
            "<25>{#f/1}* Vai ser legal!"
        ],
        undyne2cx: [
            '<25>{#p/kidd}{#f/2}* Cara, você tinha que ver ela durante prática de caça a humanos...',
            '<25>{#f/1}* Ela jogava tipo, um MILHÃO de lanças por segundo!'
        ],
        undyne2d: ["<25>{#f/1}* Eu tô atrás de você!"],
        undyne2dx: () => [
            '<25>{#p/kidd}{#f/2}* E quando o alvo tentou fugir...',
            '<25>{#f/1}* Ela o capturou no ÚLTIMO segundo!',
            ...(SAVE.flag.n.ga_asrielKidd2++ < 1
                ? ['<25>{#p/asriel2}{#f/6}* Bom pra ela, eu acho.', '<25>{#p/kidd}{#f/1}* Sim!!']
                : [])
        ],
        undyne2ex: [
            '<25>{#p/kidd}{#f/4}* Espera...',
            "<25>* Se a Undyne não tá aqui, quem nos protegerá dos malvados?",
            '<25>{|}{#f/8}* Sabe...\n* Aqueles que- {%}',
            "<25>{#p/asriel2}{#f/4}* Eu não me preocuparia com isso.",
            '<25>{#f/3}* E mais, se a Undyne é tão habilidosa como você diz...',
            "<25>{#f/4}* Então ela deve ter um motivo.\n* Ela é esperta, certo?",
            "<25>{#p/kidd}{#f/4}* É...\n* Isso é verdade...",
            '<25>{#p/kidd}{#f/2}* Bem, valeu por carregar com vocês, galera.',
            "<25>{#p/asriel2}{#f/10}* Sério...?\n* A gente não foi TÃO longe, sabem...",
            '<25>{#p/kidd}{#f/3}* Bem, claro, mas eu mal tiro tempo longe dos meus pais, então...',
            "<25>{#p/asriel2}{#f/8}* Você tem pais?\n* Essa é nova.",
            "<25>{#p/kidd}{#f/7}* Uh, M-mas é óbvio, quem não tem pais?",
            '<25>{#p/asriel2}{#f/16}* ...\n* Claro.'
        ],
        undynefinal1a: () =>
            respecc()
                ? ['<32>{#p/undyne}* Sete.', '<32>* Sete ALMAS humanas, e...', '<32>* ...']
                : [
                    '<32>{#p/undyne}* Sete.',
                    '<32>* Sete ALMAS humanas, e o {@fill=#f00}Rei ASGORE{@fill=#fff} se tornará um deus.',
                    '<32>{#x1}* Seis.',
                    "<32>{#x1}* Essas são quantas nos coletamos até agora.",
                    '<32>{#x1}* Entende?',
                    '<32>{#x1}* Através da sua sétima e última ALMA, os monstros finalmente serão livres.',
                    '<32>{#x3}* Primeiro, entretanto, como é de costume para aqueles que chegam tão longe...',
                    '<32>{#x4}* Eu devo te contar a trágica história do nosso povo.',
                    '<32>{#x5}* Começou a muito tempo, quando...'
                ],
        undynefinal1b: () => (respecc() ? ['<32>{#p/undyne}* Não...'] : ['<32>{#p/undyne}* Quer saber de uma coisa?']),
        undynefinal1c: () =>
            respecc() ? ['<32>{*}{#p/undyne}{#i/2}* NÃO!!{^999}'] : ['<32>{*}{#p/undyne}{#i/2}* QUE SE DANE!!{^999}'],
        undynefinal1d: () =>
            respecc()
                ? ['<32>{*}{#p/undyne}{#i/1}* COMO EU POSSO FALAR COM VOCÊ ASSIM!!{^999}']
                : ['<32>{*}{#p/undyne}{#i/1}* POR QUE EU DEVERIA TE CONTAR ESSA HISTÓRIA!!{^999}'],
        undynefinal1e: () =>
            respecc()
                ? ["<32>{*}{#p/undyne}{#i/1}* APÓS VOCÊ LUTAR COM TANTA HONRA!!{^999}"]
                : ["<32>{*}{#p/undyne}{#i/1}* QUANDO VOCÊ ESTÁ PRESTES A MORRER!!{^999}"],
        undynefinal1f: ['<32>{*}{#p/undyne}{#i/2}* NGAHHHHHHHHHHHH!!!{^999}'],
        undynefinal1g: () =>
            respecc()
                ? [
                    '<25>{#p/undyne}{#f/1}* ESCUTA AQUI!',
                    '<25>* Eu gosto do jeito que você luta.',
                    "<25>{#f/16}* Como qualquer grande guerreiro, você luta até seu inimigo cair no chão...",
                    '<25>{#f/17}* ... e então vocês os deixa ir, para que eles possam contar a lenda!',
                    '<25>{#f/10}* Quanta coragem...'
                ]
                : [
                    '<25>{#p/undyne}{#f/1}* HUMANO!',
                    "<25>* VOCÊ está no caminho dos sonhos e esperanças de TODO MUNDO!",
                    "<25>{#f/11}* Os filmes de história da Alphys me fizeram gostar de humanos...",
                    '<25>{#f/16}* ... com naves espaciais e portais interdimensionais.',
                    '<25>{#f/4}* Mas VOCÊ???'
                ],
        undynefinal2a: () =>
            respecc()
                ? [
                    '<25>{#f/1}* Eu acho que devo me desculpar da forma como agi anteriormente.',
                    '<25>{#f/16}* Você e seu amigo só estavam se protegendo, certo?',
                    '<25>{#f/1}* Bem, eu respeito isso.',
                    "<25>{#f/17}* E então tem o esquadrão de ELITE local!",
                    "<25>{#f/9}* Eu admito, estava impressionada...",
                    ...(SAVE.data.n.state_foundry_doge === 2 && SAVE.data.n.state_foundry_muffet === 2
                        ? [
                            '<25>* A forma com a qual você passou deles...',
                            '<25>{#f/10}* Mas também os tornou seus AMIGOS???',
                            "<25>{#f/1}* Mas, eu acho que não deveria estar surpresa.\n* Eles gostaram do seu estilo."
                        ]
                        : SAVE.data.n.state_foundry_doge === 3 && SAVE.data.n.state_foundry_muffet === 3
                            ? [
                                '<25>{#f/10}* A maneira como você conseguiu envergonhá-los?',
                                "<25>{#f/11}* Acho que nunca vi aqueles dois tão vermelhos."
                            ]
                            : [
                                '<25>{#f/10}* Mesmo quando enfrentando a ponta da lança, você ainda segurou seus nervos?',
                                '<25>{#f/1}* Acho que você é realmente algo especial!'
                            ]),
                    '<25>{#f/8}* ... MAS VOLTANDO AO MEU PONTO!',
                    '<25>{#f/1}* De início eu iria simplesmente te matar e roubar sua ALMA.',
                    '<25>{#f/11}* Mas após ver sua forma de lutar...',
                    "<25>{#f/8}* SEM CHANCES DE EU PEGAR LEVE COM VOCÊ!!!",
                    "<25>{#f/1}* Não... eu quero que você me mostre do que REALMENTE é feito!",
                    "<25>{#f/4}* E quando eu te derrotar justamente...",
                    "<25>{#f/5}* Eu finalmente irei proclamar a liberdade em nossa frente!",
                    '<25>{#f/16}* Mas, se você me derrotar...',
                    "<25>{#f/9}* Eu te deixarei ir.",
                    '<25>{#f/8}* ... ISSO se você me derrotar!!!',
                    "<25>{#f/1}* Dê um passo à frente quando estiver pronta!\n* Fuhuhuhu"
                ]
                : [
                    "<25>{#f/7}* Você é só um COVARDE!",
                    ...(SAVE.data.b.f_state_kidd_betray
                        ? [
                            '<25>{#f/16}* Lembra daquele seu amigo de mais cedo?',
                            '<25>{#f/17}* Aquele que você ABANDONOU?',
                            "<25>{#f/13}* Mesmo quando a vida deles estava em perigo, você não pestanejou.",
                            ...(world.trueKills === 0 && SAVE.data.n.bully > 9
                                ? [
                                    "<25>{#f/9}* Talvez se você tivesse, seu estilo de luta teria ganho meu respeito.",
                                    "<25>{#f/16}* Mas eu seria ingênua em pensar que você tem algum tipo de honra AGORA."
                                ]
                                : ['<25>{#f/16}* Típico humano.\n* Sempre esperando para apunhalar os amigos nas costas.']),
                            "<25>{#f/4}* Mas tudo bem...\n* Eu nunca pensei que você fosse um sento...",
                            '<25>{#f/7}* PORQUE TUDO QUE IMPORTA É SUA ALMA!'
                        ]
                        : [
                            '<25>* Se escondendo atrás daquela criança só pra fugir de mim de novo!',
                            "<25>{#f/9}* Eu admito, estava impressionada...",
                            ...(SAVE.data.n.state_foundry_doge === 2 && SAVE.data.n.state_foundry_muffet === 2
                                ? [
                                    '<25>* A forma como você não apenas conseguiu passar pela ELITE...',
                                    '<25>{#f/10}* Mas também os tornou seus AMIGOS???',
                                    "<25>{#f/11}* Você tem nervos, pirralha.",
                                    '<25>{#f/8}* ... NÃO QUE ISSO IMPORTE!'
                                ]
                                : SAVE.data.n.state_foundry_doge === 3 && SAVE.data.n.state_foundry_muffet === 3
                                    ? [
                                        '<25>{#f/10}* A maneira como você conseguiu envergonhar o esquadrão de ELITE local?',
                                        "<25>{#f/11}* Acho que nunca vi aqueles dois tão vermelhos.",
                                        "<25>{#f/8}* ... COMO SE ISSO FOSSE FUNCIONAR EM MIM!"
                                    ]
                                    : [
                                        "<25>{#f/10}* A forma como você chegou aqui sem matar ninguém?",
                                        "<25>{#f/11}* Parabéns, pirralha. \n* Você é um pouco mais legal do que outros humanos.",
                                        '<25>{#f/8}* ... COMO SE EU ME IMPORTASSE!'
                                    ]),
                            '<25>{#f/4}* Sabe o que seria melhor pra todo mundo?',
                            '<25>{#f/7}* SE VOCÊ MORRESSE!'
                        ]),
                    '<25>{#f/17}* Sua vida é tudo que impede nossa liberdade!',
                    "<25>{#f/1}* Agora mesmo, eu consigo sentir todas as mentes trabalhando como uma!",
                    "<25>* Todos esperaram suas vidas inteiras por este momento!",
                    "<25>{#f/9}* Mas não estamos nem um pouco nervosos.",
                    "<25>{#f/17}* Quando todos colocam as mentes unidas, não dá pra perder!",
                    "<25>{#f/1}* Agora, humano!\n* Vamos terminar isso, aqui e agora!",
                    "<25>{#f/17}* Eu vou te mostrar o quão determinado os monstros podem ser!",
                    "<25>{#f/1}* Dê um passo à frente quando estiver pronta!\n* Fuhuhuhu"
                ],
        undynefinal2b1: ["<25>{#f/7}* Você é só um ASSASSINO sem remorso!"],
        undynefinal2b1a: ['<25>{#f/11}* Defesa pessoal?\n* Por favor.'],
        undynefinal2b1b: [
            "<25>{#f/11}* O que? Você acha que eu não recebi mensagens das Outlands?",
            '<25>{#f/1}* Fuhuhu... melhor pensar de novo.'
        ],
        undynefinal2b2: () => [
            world.trueKills === 1
                ? "<25>{#f/9}* Você não matou aquele monstro porque tinha."
                : "<25>{#f/9}* Você não matou aqueles monstros porque tinha.",
            '<25>{#f/11}* Você fez porque foi FÁCIL para você.\n* Porque foi DIVERTIDO.',
            '<25>{#f/16}* Você acha que foi divertido quando eu descobri?'
        ],
        undynefinal2b2a: [
            '<25>{#f/9}* A unidade canina.\n* O esquadrão de ELITE local.\n* E muitos outros, também...',
            '<25>* Quase todo mundo que eu conheço e amo, mortos tão facilmente.'
        ],
        undynefinal2b2b: [
            '<25>{#f/9}* A unidade canina, E o esquadrão de ELITE local.',
            "<25>* Pessoas das quais eu servi por anos, mortas em um piscar de olhos."
        ],
        undynefinal2b2c: [
            '<26>{#f/9}* O esquadrão de ELITE local, que dedicou sua vida ao serviço...',
            '<25>* Mortos em poucos passos.'
        ],
        undynefinal2b2d: [
            '<25>{#f/9}* A unidade canina, que protegia aquela pequena cidade todos esses anos...',
            '<25>* Se foram ser deixar traços.'
        ],
        undynefinal2b2e: [
            '<26>{#f/9}* Aquele fantasma, que não queria nada além de fundir-se com o corpo de boneco...',
            '<25>* Erradicado em um mero momento.'
        ],
        undynefinal2b2f: [
            '<25>{#f/9}* Aquela aranha, que só desejava proteger e cuidar do seu clã...',
            "<25>* Não apenas ela está morta, mas a vida das aranhas está em perigo."
        ],
        undynefinal2b2g: [
            '<25>{#f/9}* Doge, que tinha um forte e inesquecível senso de batalha...',
            "<25>*Mesmo que colocar a vida dela em perigo fosse seu trabalho, ela ainda está morta."
        ],
        undynefinal2b2h: [
            '<25>{#f/9}* Aquele grande cachorro, uma das almas mais bondosas e doces...',
            '<25>* Eliminado antes do seu tempo.'
        ],
        undynefinal2b2i: [
            '<25>{#f/9}* Esses dois cachorros, cuidando do focinho um do outro...',
            '<25>* Seu amor e legado, partido ao meio em um instante.'
        ],
        undynefinal2b2j: [
            '<25>{#f/9}* Aquele cachorrinho que queria nada além de ser acariciado...',
            '<25>* Apenas para enfrentar um ataque mortal.'
        ],
        undynefinal2b2k: [
            '<25>{#f/9}* Doggo, de quem eu cuidei PESSOALMENTE por algum tempo...',
            '<25>* Agora morto graças a um único humano.'
        ],
        undynefinal2b2l: [
            "<25>{#f/9}* Aquela mulher nas Outlands... eu não a conhecia, mas...",
            "<25>* Ela não foi vista desde que você chegou em Starton."
        ],
        undynefinal2b2m: [
            '<25>{#f/9}* Cada. Alma. Monstro. Que passaram suas vidas na fábrica...',
            '<25>* Apenas para ter tomado tudo deles.'
        ],
        undynefinal2b2n: [
            '<25>{#f/9}* Cada. Alma, Monstro. Que vivia pacificamente em Starton...',
            '<25>* Apenas para encontrar um final de morte.'
        ],
        undynefinal2b2o: [
            '<25>{#f/9}* Aqueles monstros que viviam suas vidas na fábrica...',
            '<25>* Apenas para terem tudo sido desfeito.'
        ],
        undynefinal2b2p: [
            '<25>{#f/9}* Aqueles monstros que viviam pacificamente em Starton...',
            '<25>* Rasgados em sangue frio.'
        ],
        undynefinal2b2q1: [
            '<25>{#f/9}* Um monstro morto em cada área até o momento...',
            "<25>{#f/13}* É como se você tivesse uma regra de morte por área."
        ],
        undynefinal2b2q2: [
            '<25>{#f/9}* Dois monstros mortos de cada área até o momento...',
            "<25>{#f/13}* É como se você tivesse uma regra de morte por área."
        ],
        undynefinal2b2q3: [
            '<25>{#f/9}* Três monstros mortos por área até o momento...',
            "<25>{#f/13}* É como se você tivesse uma regra de morte por área."
        ],
        undynefinal2b2q4: [
            '<25>{#f/9}* Quatro monstros mortos por área até o momento...',
            "<25>{#f/13}* É como se você tivesse uma regra de morte por área."
        ],
        undynefinal2b2q5: [
            '<25>{#f/9}* Cinco monstros mortos por área até o momento...',
            "<25>{#f/13}* É como se você tivesse uma regra de morte por área."
        ],
        undynefinal2b2r: () => [
            world.trueKills === 1
                ? "<26>{#f/9}* Aquele monstro nas Outlands... Eu realmente não o conhecia, mas..."
                : "<26>{#f/9}* Aqueles monstros nas Outlands... eu não os conhecia, mas...",
            "<25>* Graças a você, eles estão mortos."
        ],
        undynefinal2b2s: [
            '<25>{#f/9}* Mesmo que tinha sido só um monstro...',
            "<25>* Isso ainda significa uma ALMA a menos que não poderá ver as estrelas um dia."
        ],
        
        undynefinal2b2t: [
            '<25>{#f/9}* Pelo menos dois monstros deixaram suas casas pelo última vez hoje.',
            '<25>* Graças a você, suas famílias jamais os verão de novo.'
        ],
        undynefinal2b2u1: [
            '<25>{#f/9}* Aquele grande cachorro, que amava a companhia de seus camaradas...',
            '<25>* Despertando para encontrá-los mortos.'
        ],
        undynefinal2b2u2: [
            '<25>{#f/9}* Aqueles dois cachorros, que sempre estavam cuidando dos outros caninos...',
            "<25>* Apenas para descobrir que não havia ninguém mais para cuidar."
        ],
        undynefinal2b2u3: [
            '<25>{#f/9}* Aquele cachorrinho que sempre mantinha para si mesmo...',
            "<26>* A morte dos outros cães pode não incomodá-lo agora, mas um dia ele sentirá."
        ],
        undynefinal2b2u4: [
            '<25>{#f/9}* Doggo, que passou anos tentando a entrar na unidade canina...',
            '<25>* Apenas para ver todos os seus parceiros de guerra sumirem.'
        ],
        undynefinal2b2v1: [
            '<25>{#f/9}* Aquele cachorro grande, assim como Dogamy e Dogaressa...',
            '<25>* Todos apagados do rosto de Starton.'
        ],
        undynefinal2b2v2: [
            '<25>{#f/9}* Tanto o cachorro grande, quanto o cachorrinho...',
            '<25>{#f/13}* Então, de acordo com você, apenas cachorros de tamanho padrão tem o direito de viver.'
        ],
        undynefinal2b2v3: [
            '<25>{#f/9}* Aquele grande cachorro, junto com Doggo, também...',
            '<25>* Ambos mortos graças aos caprichos de um único humano.'
        ],
        undynefinal2b2v4: [
            '<25>{#f/9}* Aqueles dois cachorros, que sempre estavam cuidando dos outros caninos...',
            '<25>* Não apenas ELES estão mortos, mas o cachorrinho que eles cuidavam também.'
        ],
        undynefinal2b2v5: [
            '<25>{#f/9}* Aqueles dois cachorros, que sempre estavam cuidando dos outros caninos...',
            '<25>* Eles, junto de Doggo o qual eles cuidavam, estão todos mortos.'
        ],
        undynefinal2b2v6: [
            '<25>{#f/9}* Aquele cachorrinho, junto com seu camarada Doggo...',
            '<25>* Ambos mortos graças aos caprichos de um único humano.'
        ],
        undynefinal2b3: () => [
            "<25>{#f/11}* Você acha que isso é divertido?",
            '<25>* ...',
            '<25>{#f/17}* Bem adivinha só, seu merda.',
            ...(SAVE.data.n.state_foundry_muffet === 1
                ? ["<25>* Nenhuma ligação vai te salvar DESSA vez."]
                : ['<25>* Seu tempo ACABOU.']),
            '<25>{#f/4}* Toda a dor que você infligiu aos que caíram...',
            "<25>{#f/7}* Todos os sonhos, todas as esperanças que viraram poeira...",
            "<25>{#f/1}* Está heroína vai mandar tudo de volta para você através de sua lança!",
            '<25>{#f/4}* NGAHHH!!!',
            "<25>{#f/5}* Eu vou te mostrar o quão determinados monstros realmente são!",
            "<25>{#f/17}* Vamos lá! De um passo a frente e veja como isso acaba!"
        ],
        undynefinal2c1: ['<32>* ...', '<32>* Esquece.'],
        undynefinal2c2: () => [
            '<25>{#f/16}{#x1}* Olha.',
            "<25>* Papyrus não apareceu na reunião hoje.",
            '<25>{#f/19}* ...',
            '<25>{#x2}* Diga o que quiser sobre ele.',
            "<25>{#f/18}* Ele é estranho, ele é animado demais, muito egocêntrico...",
            '<25>{#f/20}{#x3}* Mas Papyrus NUNCA perderia uma reunião.',
            '<25>{#f/18}{#x4}* E não importa que hora você liga pra ele no telefone...',
            '<25>{#f/20}{#x5}* Ele SEMPRE responde nos primeiros dois toques.',
            '<25>* ...',
            "<25>{#f/18}{#x6}* Mas agora ele se foi.",
            "<25>{#f/22}{#x7}* E seu irmão também não tá em lugar nenhum.",
            '<25>* ...',
            '<25>{#f/18}* O que você fez com ele?',
            '<25>{#f/11}{#x8}* O que você fez com ELE?',
            ...((SAVE.data.n.state_foundry_doge === 1 ? 1 : 0) +
                (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) +
                (SAVE.data.n.state_starton_dogs === 2 ? 2 : 0) +
                (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) >
                1
                ? [
                    '<25>{#f/16}{#x9}* E os membros perdidos da guarda...',
                    '<25>{#f/13}* Você fez o mesmo com ELES?'
                ]
                : [
                    '<25>{#f/16}{#x9}* Papyrus, que eu treinei todos os dias...',
                    "<25>{#f/19}* Mesmo sabendo que ele é muito inocente para machucar alguém..."
                ]),
            '<25>* ...',
            '<25>{#f/16}{#x10}* Vá em frente. \n* Prepare-se o tanto que quiser.',
            '<25>{#f/20}* Mas quando você der um passo em frente...',
            '<25>{#f/11}{#x11}* Eu vou te MATAR.'
        ],
        undynefinal3: () => [
            ...(SAVE.data.n.state_starton_papyrus === 1
                ? ['<25>{#p/undyne}{#f/21}* Que assim seja.', '<25>{#f/19}* ...']
                : world.trueKills > 1
                    ? ['<25>{#p/undyne}{#f/11}* Você perguntou por isso, canalha.', '<25>{#f/9}* Pronto ou não...']
                    : respecc()
                        ? ["<25>{#p/undyne}{#f/1}* É isso, então...!", "<25>{#f/17}* É hora de enfrentar a sua igual!"]
                        : ["<25>{#p/undyne}{#f/1}* É isso, então...!", '<25>{#f/17}* Sem mais correr!'])
        ],
        undynefinal3x: ['<25>{#f/7}{*}* AÍ VOU EU!!!!!!!{#x1}{^999}'],
        undynehouse1: ["<32>{#p/basic}* Está trancando."],
        undynehouse2: () =>
            SAVE.data.b.svr || world.runaway
                ? ["<32>{#p/human}* (Você não consegue encontrar uma maneira de entrar.)"]
                : SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}* Primeiro, a família fantasma...\n* Depois, a rainha aranha...',
                        '<32>* E agora, a moça peixe...',
                        "<32>* Eu vou sentir falta dela... assim como vou sentir falta de estar aqui...",
                        "<32>* Mas talvez... Eu habito esta casa há tempo demais...",
                        "<32>* Talvez eu vá ser mais feliz se passar meu tempo... em outro lugar..."
                    ]
                    : ["<32>{#p/basic}* Está literalmente pegando fogo.\n* Você não vai entrar lá."],
        walktext: {
            bird: () => [
                '<25>{#p/kidd}{#f/4}* Fim morto...',
                world.genocide
                    ? "<25>{#f/3}* O pássaro deve ter carregado ele pelo abismo, haha."
                    : '<25>{#f/3}* O pássaro deve estar ocupado agora, haha.'
            ],
            birdx: ['<32>{#p/basic}* ... mas ninguém veio.'],
            path1: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        "<25>{#p/kidd}{#f/8}* Eu sinto que vou vomitar...",
                        SAVE.data.n.state_foundry_kidddeath > 5
                            ? '<25>* Nós matamos tantos monstros...'
                            : SAVE.data.n.state_foundry_kidddeath > 1
                                ? '<25>* Nós matamos outros monstros...'
                                : '<25>* Nós matamos um monstro...'
                    ]
                    : [
                        '<25>{#p/kidd}{#f/1}* Eu já te contei sobre como tivemos aulas de piloto espacial?',
                        '<25>{#p/kidd}{#f/7}* Foi ÉPICO!'
                    ],
            path2: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        SAVE.data.b.f_state_kidd_fight
                            ? '<25>{#p/kidd}{#f/4}* Quer dizer, você me disse pra lutar...'
                            : '<25>{#p/kidd}{#f/4}* Quer dizer, você lutou sozinho...',
                        '<25>{#p/kidd}{#f/8}* Mas você... \n* ... r-realmente queria...\n* ... isso...?'
                    ]
                    : [
                        '<25>{#p/kidd}{#f/2}* Um dia, aquele esqueleto baixo e seu irmão apareceram...',
                        '<25>{#p/kidd}{#f/2}* E, isso é um segredo, mas...',
                        '<25>{#f/1}* Eles me deixaram voar o Outpost inteiro POR CONTA PRÓPRIA!'
                    ],
            path3: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<25>{#p/kidd}{#f/4}* Eu nunca quis ferir ninguém, eu só...\n* Eu...',
                        '<25>{#p/kidd}{#f/8}* Eu só quero acordar...\n* Por favor... deixa isso tudo ser um sonho ruim...'
                    ]
                    : [
                        "<25>{#p/kidd}{#f/1}* Talvez algum dia eu serei piloto, com minha própria nave espacial.",
                        "<25>{#p/kidd}{#f/1}* Eu teria CHAMAS pintadas dos lados, GRANDES azas, e...",
                        "<25>{#p/kidd}{#f/6}* Cara, seria tão legal..."
                    ],
            path4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<25>{#p/kidd}{#f/8}* Eu...', '<25>{#f/8}* Eu...', "<25>{#f/5}* Eu só vou... \n* ... ficar quieto."]
                    : [
                        '<25>{#p/kidd}{#f/2}* Nós poderíamos ir para qualquer lugar do universo, mano...',
                        '<25>{#p/kidd}{#f/1}* E a melhor parte?\n* Sem mais escola, tipo, pra sempre!'
                    ],
            path5: ['<25>{#p/kidd}{#f/4}* Espera...'],
            path6: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        "<25>{#p/kidd}{#f/8}* Não dá pra passar nesse buraco sozinho, cara...",
                        '<25>{#p/kidd}{#f/8}* ...',
                        '<25>{#p/kidd}{#f/5}* ... deixa eu te ajudar.'
                    ]
                    : [
                        '<25>{#p/kidd}{#f/2}* Você tem certeza que consegue passar por esse buraco?',
                        '<25>{#p/kidd}{#f/1}* Yo, deixa eu te ajudar!'
                    ],
            path7: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<25>{#p/kidd}{#f/8}* Sobe aí.']
                    : ['<25>{#p/kidd}{#f/1}* Sobe aí!'],
            path8: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<25>{#p/kidd}{#f/4}* ...\n* Bem...',
                        '<25>{#f/8}* Se você nunca mais me ver de novo...\n* Diga aos meus pais...',
                        "<25>{#f/5}* ...\n* Que eles estão melhores sem mim."
                    ]
                    : ["<25>{#p/kidd}{#f/1}* Não se preocupa, cara!\n* Eu sempre dou um jeito de dar uma volta!"],
            prechase: [
                '<25>{#p/kidd}{#f/4}* Ei... uh... \n* Esse lugar me dá mó medo.',
                '<25>{#f/3}* Da pra gente voltar?'
            ],
            rescue1: () => [
                "<25>{#p/kidd}{#f/7}* Undyne, por favor!\n* Ele é meu amigo!",
                world.dead_skeleton || geno() || world.population < 4
                    ? "<32>{#p/undyne}* Não, ele não é. \n* Você não deveria estar com ele, criança."
                    : "<32>{#p/undyne}* Vá pra casa, criança.\n* Você não deve estar com ele."
            ],
            rescue2: ['<25>{*}{#p/kidd}{#f/8}* Undyne...{#x1}{^20}{%}'],
            rescue3: [
                "<25>{*}{#p/kidd}{#f/13}* Eu prometo, eu... Eu-eu vou voltar por você!{^20}{%}",
                "<25>{*}{#p/kidd}{#f/13}* Não morre, beleza?{^20}{%}"
            ],
            snailcom: [
                '<25>{#p/kidd}{#f/9}* Aquele fantasma e eu jogamos lesma eletrônica uma vez aqui...',
                '<25>* Você já...?',
                '<25>{#p/asriel2}{#f/10}* Um... não?',
                '<25>{#f/4}* Não nessa linha do tempo, pelo menos.',
                '<25>{#p/kidd}{#f/9}* Linha do tempo?'
            ],
            trashcom: [
                '<25>{#p/asriel2}{#f/13}* Oh, ei...\n* Aqui foi onde a gente...',
                '<25>{#f/13}* Onde você...',
                '<25>{#f/15}* ...',
                '<25>{#f/16}* Oh, $(name)...',
                '<25>{#p/kidd}{#f/9}* ...?',
                "<25>{#p/asriel2}{#f/6}* Não é nada.",
                "<25>{#f/7}* Só é uma pequena lembrança, só isso.",
                '<25>{#p/kidd}{#f/9}* Oh...'
            ],
            undynecom: [
                "<25>{#p/kidd}{#f/11}* Oh, é...\n* É a casa de Undyne...!",
                "<25>{#p/asriel2}{#f/8}* Que sorte a nossa, Undyne não está aqui agora.",
                '<25>{#f/6}* Se tudo for como planejado, ela jamais vai estar de novo.'
            ]
        },
        watercooler1: () => [
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* (O rótulo descreve o uso desse fluido apenas em um tipo específico de emergência.)']
                : [
                    "<32>{#p/basic}* É um refrigerador cheio de fluido de amortecimento elétrico com uma etiqueta.",
                    '<32>{#p/basic}* \"Use apenas para impedir interferência eletrostática com jetpacks portáteis.\"'
                ]),
            choicer.create('* (Pegar um copo?)', 'Sim', 'Não')
        ],
        watercooler2a: ['<32>{#p/human}* (Agora você segura uma copo do fluido de amortecimento elétrico.)'],
        watercooler2b: ['<32>{#p/human}* (Você decide não pegar um copo.)'],
        watercooler3: () => [
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* (O rótulo descreve o uso desse fluido apenas em um tipo específico de emergência.)']
                : [
                    "<32>{#p/basic}* É um refrigerador cheio de fluido de amortecimento elétrico com uma etiqueta.",
                    '<32>{#p/basic}* \"Use apenas para impedir interferência eletrostática com jetpacks portáteis.\"'
                ]),
            '<32>{#p/human}* (Você já tem um copo.)'
        ]
    },

    b_group_foundry: {
        moldsmalMoldbygg1: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Santos monstros!']
                : ["<32>{#p/story}* É um festival de gelatina!"],
        moldsmalMoldbygg2a: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Um faltando.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Só nós agora!']
                    : ['<32>{#p/story}* Gelata está sozinha agora.'],
        moldsmalMoldbygg2b: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Um faltando.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Só nós agora!']
                    : ['<32>{#p/story}* Gelatini agora dança sozinha.'],
        woshuaMoldbygg2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Fale sobre uma contradição.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Woah, olá...']
                    : ['<32>{#p/story}* Skrubbington fica no topo.\n* Para sua consternação, Gelata também está aqui.'],
        woshuaMoldbygg2a: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Um faltando.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Só nós agora!']
                    : ['<32>{#p/story}* Gelata está sozinha agora.'],
        woshuaMoldbygg2b: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Um faltando.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Só nós agora!']
                    : ['<32>{#p/story}* Skrubbington não tem certeza sobre como se sentir.']
    },
    b_opponent_woshua: {
        tweet: 'tweet',
        epiphany: [
            ['<08>{#p/basic}{~}Skrubby aceita sua piedade.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Skrubby irá recuar agora.', '<08>{#p/basic}{~}Obrigado por avisar!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Skrub u corpo inteiro...', '<08>{#p/basic}{~}Serviço especial só pra você!']
                        : SAVE.data.b.oops
                            ? [
                                '<08>{#p/basic}{~}Mesmo se você se sujar às vezes...',
                                '<08>{#p/basic}{~}Skrubby estará lá para limpar você.'
                            ]
                            : ['<08>{#p/basic}{~}Skrubby aceita o abraço.', '<08>{#p/basic}{~}Esteja você limpo ou sujo.'],
            ['<08>{#p/basic}{~}Skrubby sabe o que deve ser feito.', '<08>{#p/basic}{~}Obrigado por me mostrar o caminho.'],
            ['<08>{#p/basic}{~}Okie.\nPegue seu G.']
        ],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Skrubbington, a aberração da limpeza.\n* Não consigo ver mais do que uma partícula de sujeira."]
                : [
                    '<32>{#p/story}* SKRUBBINGTON - ATQ 18 DEF 5\n* Este humilde germofóbico procura limpar toda a galáxia.'
                ],
        act_check2: [
            '<33>{#p/story}* SKRUBBINGTON - ATQ 18 DEF 5\n* Este humilde germofóbico quer ir para casa se limpar.'
        ],
        act_check3: [
            '<32>{#p/story}* SKRUBBINGTON - ATQ 18 DEF 5\n* Um momento mais perto de um futuro limpo para os monstros.'
        ],
        act_check4: [
            "<32>{#p/story}* SKRUBBINGTON - ATQ 18 DEF 5\n* O amor deste humilde germofóbico é o mais ensaboado possível."
        ],
        name: '* Skrubbington',
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Skrubbington.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Skrubby está aqui!"]
                    : ['<32>{#p/story}* Skrubbington entra na batalha.'],
        idleTalk1a: ['<08>{#p/basic}{~}Skrub sua ALMA.'],
        idleTalk1b: ['<08>{#p/basic}{~}Skrub suas mãos'],
        idleTalk1c: ['<08>{#p/basic}{~}Skrub sua cara'],
        idleTalk1d: ['<08>{#p/basic}{~}Skrub seu cabelo'],
        idleTalk1e: ['<08>{#p/basic}{~}Skrub seu pé'],
        idleTalk2a: ['<08>{#p/basic}{~}Skrub o bumbum'],
        idleTalk2b: ['<08>{#p/basic}{~}Opa, eu quis dizer..\nSkrub as costas'],
        idleTalk2c: ['<08>{#p/basic}{~}Skrub o bumbum'],
        idleTalk3: () =>
            world.trueKills > 0 ? ['<08>{#p/basic}{~}Sua ALMA é suja.'] : ['<08>{#p/basic}{~}\x00*whistle whistle*'],
        cleanTalk: ['<08>{#p/basic}{~}Verde significa limpo'],
        jokeTalk1: ["<08>{#p/basic}{~}NÃO. ESSA PIADA FOI... SUJA"],
        jokeTalk2: ["<08>{#p/basic}{~}EUGH.. EU NEM POSSO ACREDITAR"],
        randStatus1: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Olha o passarinho!']
                : ['<32>{#p/story}* Skrubbington é amigo de um passarinho.'],
        randStatus2: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Você deveria ter visto quando ele tentou limpar meu lanche da escola."]
                : ['<32>{#p/story}* Skrubbington está enxaguando um pires.'],
        randStatus3: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<33>{#p/kidding}* Devemos brilhar em trajes espaciais com este.']
                : ['<32>{#p/story}* Skrubbington está procurando por uma boa e divertida limpeza.'],
        randStatus4: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Completamente limpo?\n* Isso vai ser LOUCAMENTE limpo.']
                : ['<32>{#p/story}* Cheira a detergente.'],
        randStatus5: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Você NÃO quer ficar sujo perto de mim, cara.']
                : ['<32>{#p/story}* Skrubbington se pergunta se a poeira estelar é higiênica.'],
        hurtStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Está... tudo bem?']
                : ['<32>{#p/story}* Skrubbington está revoltado com sua própria sujeira.'],
        jokeText1: ['<32>{#p/human}* (Você conta uma piada boba sobre um pedaço de tralha espacial.)'],
        jokeText2: ['<32>{#p/human}* (Você conta uma piada sobre poluição atmosférica.)'],
        jokeText3: ['<32>{#p/human}* (Você conta uma piada sobre duas naves espaciais que ficaram presas em um monte de lixo.)'],
        touchText0: [
            '<32>{#p/human}* (Você dá ao Skrubbington um carinho amigável.)',
            "<32>{#p/basic}* Skrubbington não suporta suas mãos cobertas de lodo e foge!"
        ],
        touchText1: [
            '<32>{#p/human}* (Você dá ao Skrubbington um carinho amigável.)',
            '<32>{#p/basic}* Skrubbington se recupera de seus toques.'
        ],
        touchText2: [
            '<32>{#p/human}* (Você dá ao Skrubbington um carinho amigável.)',
            '<32>{#p/basic}* Skrubbington está lisonjeado.'
        ],
        cleanText1: [
            '<32>{#p/human}* (Você pede para Skrubbington te limpar.)',
            '<32>{#p/basic}* Skrubbington aparece animadamente.'
        ],
        flirtTalk1: ['<08>{#p/basic}{~}Não!\nRomance não limpo!'],
        flirtTalk2: ['<08>{#p/basic}{~}Brilhe e acenda!'],
        cleanText2: [
            '<32>{#p/human}* (Você pede para Skrubbington te limpar.)',
            '<32>{#p/basic}* Skrubbington retoma a limpeza.'
        ]
    },
    b_opponent_moldbygg: {
        sexyChat: ['<08>{#p/basic}{~}\x00*mexida sexy*'],
        epiphany: [
            ['<08>{#p/basic}{~}\x00*sons de slime*'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Guoooh..']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}\x00*mexida erótica*']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}\x00*mexida alegre*']
                            : ['<08>{#p/basic}{~}\x00*abraço viscoso*'],
            ['<08>{#p/basic}{~}Rugido final.'],
            ['<08>{#p/basic}{~}\x00*mexida brilhante*']
        ],
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Woah!']
                    : ['<32>{#p/story}* Gelata aparece!'],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata, a gelatina gosmenta.\n* Porque eu tenho que ficar te explicando essas coisas.']
                : ['<32>{#p/story}* GELATA - ATQ 18 DEF 18\n* Não mais tão pequena.'],
        act_check2: ['<32>{#p/story}* GELATA - ATQ 18 DEF 18\n* Não está no melhor shape.'],
        act_check3: ['<32>{#p/story}* GELATA - ATQ 18 DEF 18\n* Não é contra se tornar uma gelatina em tempo integral.'],
        act_check4: ['<32>{#p/story}* GELATA - ATQ 18 DEF 18\n* Não um parceiro ideal...'],
        act_topple1: ["<32>{#p/human}* (Você tenta chegar no topo da Gelata, mas ela não estava fraca o suficiente.)"],
        act_topple2: ['<32>{#p/human}* (Você derruba Gelata.)\n* (Suas partes do corpo colapsam e rolam para longe.)'],
        name: '* Gelata',
        idleTalk1: ['<08>{#p/basic}{~}Guoooh!'],
        idleTalk2: ['<08>{#p/basic}{~}\x00*sons de slime*'],
        idleTalk3: ['<08>{#p/basic}{~}Rugido.'],
        idleTalk4: ['<08>{#p/basic}{~}\x00*aleatório ansioso*'],
        randStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* O que ela quer?']
                    : ['<32>{#p/story}* Gelata quer te carregar.'],
        randStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Eu me pergunto o que aconteceria se eu abraçasse.']
                    : ['<32>{#p/story}* Gelata balança ansiosamente.'],
        randStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Tão animada... eu amei!']
                    : ['<32>{#p/story}* Gelata fica nas proximidades.'],
        randStatus4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Isso tudo parece bem gosmento.']
                    : ['<32>{#p/story}* Cheira a uma loja de gelatina.'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Quase morto.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Gelata não parece bem..."]
                    : ['<32>{#p/story}* Gelata parece ter tido dias melhores.'],
        act_handshake: [
            '<32>{#p/human}* (Você oferece um aperto de mão.)\n* (Gelata engolfa você em lodo.)',
            '<32>{#p/story}* VELOCIDADE caiu!'
        ],
        act_sit: ['<32>{#p/human}* (Você senta no topo da Gelata. Gelata agora sente ter sido útil.)'],
        distanceStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Eu posso subir também!?']
                    : ['<32>{#p/story}* Gelata parece feliz com sua presença.'],
        act_flirt: [
            '<32>{#p/human}* (Você balança seu quadril.)\n* (Gelata faz um tornado.)',
            '<32>{#p/basic}* Uma conversa interessante...?'
        ]
    },
    b_opponent_moldfake: {
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Gelatini...\n* Algo me diz que este é mais do que aparenta."]
                : ['<32>{#p/história}* GELATINI - ATQ 18 DEF 18\n* Nem um barulho para ser ouvido.'],
        name: '* Gelatini',
        smalTalk: ['<08>{#p/basic}{~}...'],
        status1: () => (world.goatbro ? ['<32>{#p/asriel2}* Gelatini.'] : ['<32>{#p/story}* Gelatini aparece?']),
        fakeStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Gelatinis sempre ficam paradas assim?']
                    : ["<32>{#p/story}* Gelatini não está se mexendo."],
        fakeStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Tem algo errado com essa Gelatini..."]
                    : ['<32>{#p/story}* Gelatini é uma gelatina perfeitamente temperada e sem falhas.'],
        fakeStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Gelatinis são sempre quietas assim?']
                    : ["<32>{#p/story}* É a hora quieta da Gelatini."],
        fakeStatus4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Isso parece estranho.']
                    : ['<32>{#p/story}* Cheira a uma loja de gelatina.'],
        act_imitate: ['<32>{#p/human}* (Você se aproxima da Gelatini.)', '<32>{#p/basic}* De repente...!'],
        act_flirt: ['<32>{#p/human}* (Você balança seu quadril.)', '<32>{#p/basic}* De repente...!'],
        act_slap: ['<32>{#p/human}* (Você dá um belo tapão na Gelatini.)', '<32>{#p/basic}* De repente...!']
    },
    b_opponent_shyren: {
        act_check: ['<32>{#p/story}* SHYREN - ATQ 19 DEF 0\n* Uma cantora poética que não se destaca por culpa própria.'],
        act_check2: ['<32>{#p/história}* SHYREN - ATQ 19 DEF 0\n* Com uma nova confiança, ela sobe ao palco'],
        act_check3: ['<32>{#p/story}* SHYREN - ATQ 19 DEF 0\n* Com sua nova confiança, ela canta para a plateia!'],
        act_check4: ["<32>{#p/história}* SHYREN - ATQ 19 DEF 0\n* Com uma nova confiança, ela é a estrela do show!"],
        act_check5: ['<32>{#p/história}* SHYREN - ATQ 19 DEF 0\n* Uma cantora profética, retida por feridas recentes.'],
        act_check6: ['<32>{#p/história}* SHYREN - ATQ 19 DEF 0\n* Infelizmente, a escória amarga da rejeição.'],
        act_check7: ['<32>{#p/story}* SHYREN - ATQ 19 DEF 0\n* Agora, ama músicas.'],
        awkwardtoot: ['<08>{#p/basic}{~}(toot estranho)'],
        creepStatus: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren se encolhe no canto.']
                : ["<32>{#p/kidding}* Eu não acho que isso ajudou..."],
        creepText1: [
            '<32>{#p/human}* (Você flerta com a Shyren, oferecendo seu melhor sorriso.)',
            '<32>{#p/basic}* Shyren vira de costas...'
        ],
        creepText2: [
            '<32>{#p/human}* (Você flerta com Shyren de novo.)',
            '<32>{#p/basic}* Shyren está desconfortável agora e decide fugir.'
        ],
        encourage1: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren parece bem mais confortável cantando.']
                : ['<32>{#p/kidding}* Cantando juntos?\n* Aí sim, cara!'],
        encourage2: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? world.genocide
                    ? SAVE.data.n.state_foundry_muffet === 1
                        ? ['<32>{#p/story}* O ar estranhamente quieto passa por trás da sinfonia de vozes.']
                        : ["<32>{#p/kidding}* Haha, é bem legal!\n* Mesmo sendo apenas nós três..."]
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? ['<32>{#p/story}* Uma figura na sombra assiste a comoção de longe.']
                        : ["<32>{#p/kidding}* Yo... uh...\n* O que aquela sombra estranha tá fazendo ali?"]
                : SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/story}* Sans está vendendo ingressos feitos de fibra de carbono.']
                    : ['<32>{#p/kidding}* É aquele esqueleto pequeno vendendo TÍQUETES ali?'],
        encourage3: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/story}* Seu canto anterior ecoou de volta no quarto.']
                    : ['<32>{#p/kidding}* Esse lugar é tão vazio que nós podemos nos ouvir no passado.\n* Tá legal.']
                : SAVE.data.n.state_foundry_muffet === 1
                    ? ["<32>{#p/story}* A multidão joga roupas.\n* É uma tempestade de bolas de algodão."]
                    : ['<32>{#p/kidding}* Woah, tantas pessoas!'],
        encourage4: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren pensa sobre seu futuro.']
                : ['<32>{#p/kidding}* Mais uma vez!\n* Mais uma vez!\n* Mais uma vez!'],
        flirtText1: ['<32>{#p/human}* (Você flerta com a Shyren.)\n* (Meio hesitante, ela cora um pouco em retorno.)'],
        flirttoot: ['<08>{#p/basic}{~}(sorriso feliz)'],
        hum0: ['<32>{#p/human}* (Você cantarola uma valsa melancólica.)\n* (Shyren segue sua melodia.)'],
        hum1: ['<32>{#p/human}* (Você cantarola uma melodia funky.)\n* (Shyren segue sua melodia.)'],
        hum2: ['<32>{#p/human}* (Você cantarola uma música de blues.)\n* (Shyren segue sua melodia.)'],
        hum3: ['<32>{#p/human}* (Você cantarola uma música de balada jazz.)\n* (Shyren segue sua melodia.)'],
        hum4: ['<32>{#p/human}* (Você cantarola uma canção de desculpas.)\n* (Shyren se acalma.)'],
        humX1: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? ['<32>{#p/human}* (Você canta um pouco mais.)', "<32>{#p/basic}* É um verdadeiro dueto!"]
                : [
                    '<32>{#p/human}* (Você canta um pouco mais.)',
                    '<32>{#p/basic}* Monstros são feitos para a música.',
                    "<32>{#p/basic}* De repente, é um concerto..."
                ],
        humX2: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? [
                    '<32>{#p/human}* (Você canta um pouco mais.)',
                    '<32>{#p/basic}* Shyren está feliz em te ter como parceiro de vocal.'
                ]
                : [
                    '<32>{#p/human}* (Você canta um pouco mais.)',
                    "<32>{#p/basic}* Os acentos estão todos vendidos!\n* É uma performance de rockstar!"
                ],
        humX3: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? [
                    '<33>{#p/human}* (Você canta mais um pouco.)',
                    '<32>{#p/basic}* Mesmo sem uma plateia, uma dança de melodia e harmonia persiste.'
                ]
                : [
                    '<32>{#p/human}* (Você canta um pouco mais.)',
                    '<32>{#p/basic}* Apesar do sucesso e constante atenção...',
                    "<32>* Os tours...\n* Os grupos...\n* Tudo..."
                ],
        humX4: () => [
            "<32>{#p/human}* (Shyren e você já chegaram tão longe, mas é hora.)",
            '<32>* (Vocês dois tem suas próprias jornadas para seguir.)',
            '<32>* (Você cantarola uma canção de fogo.)'
        ],
        hurtStatus: ["<32>{#p/story}* A voz de Shyren está rouca."],
        name: '* Shyren',
        randStatus1: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren cantarola bem calmamente.']
                : ['<32>{#p/kidding}* Você está bem?'],
        randStatus2: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren pretende ser um ídolo da cultura pop.']
                : ['<32>{#p/kidding}* Você parece triste...'],
        randStatus3: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren faz um som com suas nadadeiras.']
                : ['<32>{#p/kidding}* Você precisa de ajuda?'],
        randStatus4: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren pensa em fazer um karaokê por conta própria.']
                : ['<32>{#p/kidding}* Tem alguma coisa que eu possa fazer?'],
        randStatus5: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Cheira a música.']
                : ["<32>{#p/kidding}* Espera... qual o problema com o corpo dela?"],
        sadtalk1: ['<08>{#p/basic}{~}..\n..\ntoot\n..'],
        sadtalk2: ['<08>{#p/basic}{~}..\n..\nhum hum\n..'],
        status1: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/kidding}* Não...\n* Não de novo...']
                : ["<32>{#p/kidding}* Yo, como vai?\n* Você parece triste..."],
        talk3: ['<08>{#p/basic}{~}si re, si re, si mi, si mi'],
        talk4: ['<08>{#p/basic}{~}Si Fa Si Fa So Fa So Mi Re Re'],
        talk5: ['<08>{#p/basic}{~}Mi So Mi So Mi Si Mi La Si So'],
        talk6: ['<08>{#p/basic}{~}(dança apaixonada)'],
        talk7: ['<08>{#p/basic}{~}(dança final)'],
        wave1: ['<32>{#p/human}* (Você balança os braços descontroladamente.)\n* (Nada acontece.)'],
        wave2: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? ['<32>{#p/human}* (Você balança os braços descontroladamente.)\n* (Nada acontece.)']
                : ['<32>{#p/human}* (Você balança seus braços descontroladamente.)', '<32>{#p/basic}* A plateia ama!'],
        act_boo1: ['<32>{#p/human}* (Você assusta Shyren.)', '<32>{#p/basic}* Com a cabeça baixa, Shyren vai embora...'],
        act_boo2: [
            '<32>{#p/human}* (Você assusta Shyren.)',
            '<32>{#p/basic}* Shyren, vendo que você a rejeitou, vai embora correndo.'
        ],
        act_boo3: [
            '<32>{#p/human}* (Você assusta Shyren.)',
            "<32>{#p/basic}* A alegria fugaz de Shyren desaparece assim que chega a ela."
        ],
        act_boo4: [
            '<32>{#p/human}* (Você assusta Shyren.)',
            '<32>{#p/basic}* A multidão, perturbada, observa enquanto Shyren foge do local.'
        ],
        act_boo5: [
            '<32>{#p/human}* (Você assusta Shyren.)',
            '<32>{#p/basic}* A traição trás Shyren aos choros e ela foge.'
        ]
    },
    b_opponent_radtile: {
        epiphany: [
            ['<08>{#p/basic}{~}Até a próxima, G.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Huh..!\nDesde quando você virou assustador!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Essa sensação.', "<08>{#p/basic}{~}Eu não consigo resistir!"]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}É...\nNós somos um time bem radical.']
                            : ["<08>{#p/basic}{~}É tão confortável..."],
            ['<08>{#p/basic}{~}Pelo menos meu fim servirá um propósito.', "<08>{#p/basic}{~}Paz e tranquilidade, G."],
            ["<08>{#p/basic}{~}Aqui está seu G, meu G!"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Radtile, o \"crocodilo bonito.\"\n* Engraçado, considerando o quão feio ele é.']
                : ['<32>{#p/story}* RADTILE - ATQ 24 DEF 12\n* Estilista com óculos de sol.\n* Gênero favorito: Música Krio'],
        act_check2: ["<32>{#p/story}* RADTILE - ATQ 24 DEF 12\n* As coisas não estão parecendo muitos legais para o crocodilo."],
        act_check3: ['<33>{#p/story}* RADTILE - ATQ 24 DEF 12\n* Este crocodilo da hora está pegando fogo.'],
        act_check4: [
            '<32>{#p/story}* RADTILE - ATQ 24 DEF 12\n* Quando se trata de romance, esse crocodilo top é frio feito pedra.'
        ],
        name: '* Radtile',
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Radtile.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Esse cara não...']
                    : ['<32>{#p/story}* Radtile faz uma expressão!'],
        randStatus1: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Aquele com certeza é um chapéu muito fera que ele tem na cabeça."]
                : ['<32>{#p/story}* Radtile arruma seu boné.'],
        randStatus2: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Todo mundo por aqui adora o espelhinho do Raddy."]
                : ['<32>{#p/story}* Radtile se encara profundamente pelo espelho.'],
        randStatus3: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* O que ele tá fazendo?"]
                : ['<32>{#p/story}* Radtile está fazendo gestos para melhorar seu fator de cara da hora.'],
        randStatus4: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Me pergunto como ele se parece.']
                : ['<32>{#p/story}* Cheira a um velho parque de skate.'],
        idleTalk1: ['<08>{#p/basic}{~}Checa isso.'],
        idleTalk2: ['<08>{#p/basic}{~}Da uma olhada.'],
        idleTalk3: ['<08>{#p/basic}{~}De uma olhadela...'],
        idleTalk4: ['<08>{#p/basic}{~}Da uma chance...'],
        insultIdleTalk1: ['<08>{#p/basic}{~}Meh.'],
        insultIdleTalk2: ['<08>{#p/basic}{~}Tanto faz.'],
        insultIdleTalk3: ['<09>{#p/basic}{~}\x00*shrugs*'],
        insultIdleTalk4: ['<08>{#p/basic}{~}Bem não dá hora.'],
        act_praise: ["<32>{#p/human}* (Você diz a Radtile que ele é tão legal quanto um pepino quântico.)"],
        act_praise_bullied: ['<32>{#p/human}* (Você diz a Radtile que as escamas dele o fazem mais durão.)'],
        complimentTalk1: ["<08>{#p/basic}{~}Pra onde você realmente tá olhando?"],
        complimentTalk2: ['<08>{#p/basic}{~}Olha primeiro, opinião depois.'],
        complimentTalk3: ['<08>{#p/basic}{~}Mostrar e dizer, nesta ordem.'],
        complimentPostInsultTalk1: ["<08>{#p/basic}{~}Você é um mentiroso, de toda forma."],
        complimentPostInsultStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* É, acho que isso não vai funcionar agora, cara."]
                : ["<32>{#p/story}* Radtile não está no clima."],
        flirtTalk1: ['<08>{#p/basic}{~}Woah, ei, pera aí...'],
        complimentStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Talvez se você mostrar a ele que está checando ele primeiro...?"]
                : ['<32>{#p/story}* Radtile quer que você dê uma olhada nele primeiro.'],
        checkTalk: ['<08>{#p/basic}{~}Me estuda, heh heh.'],
        realTalk1: ['<08>{#p/basic}{~}Certinho.'],
        realStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Você conseguiu!\n* ... podemos ir embora?']
                : ["<32>{#p/story}* Radtile está se sentindo bem mais da hora do que antes."],
        realTalkY1: ['<08>{#p/basic}{~}\x00*malhando braço*'],
        realTalkY2: ["<08>{#p/basic}{~}Você é o mais da hora."],
        realTalkY3: ["<08>{#p/basic}{~}Vamos fazer rock 'n' roll."],
        shockTalk1: ['<08>{#p/basic}{~}.. top.'],
        shockStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Uh...']
                : ['<32>{#p/story}* Radtile não está se divertindo.'],
        act_insult: ['<32>{#p/human}* (Você fala que Radtile é um perdedor e que ele deve calar a boca.)'],
        act_insult_bullied: ["<32>{#p/human}* (Você zomba dos hematomas de Radtile e diz a ele para ir embora.)"],
        act_flirt: ['<32>{#p/human}* (Você acena para Radtile.)'],
        act_flirt_bullied: ["<32>{#p/human}* (Você diz a Radtile que ele é lindo independente do quão desfigurado esteja.)"],
        insultTalk1: ["<08>{#p/basic}{~}E se eu não?"],
        insultStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Uh...']
                : ['<32>{#p/story}* Radtile mantém distância.'],
        checkPostInsultTalk: ['<08>{#p/basic}{~}Veio dar outra olhada?'],
        checkPostInsultStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Ah, estamos andando em círculos!"]
                : ['<32>{#p/story}* Radtile te dá uma chance.'],
        hurtStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Isso não tá parecendo bom..."]
                : ["<32>{#p/story}* Os dentes de Radtile estão começando a cair."]
    },
    b_opponent_doge: {
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Doge, a cadela insensível.\n* Preocupa-se apenas com o trabalho dela.']
                : ['<32>{#p/story}* DOGE - ATQ 14 DEF 10\n* Pronunciado \"doug.\" D mudo.\n* Membro do esquadrão de ELITE.'],
        act_flirt: () => [
            ...(dogecon() || world.goatbro
                ? ['<32>{#p/human}* (Você flerta com Doge.)', '<32>{#p/basic}* Doge decide ignorar está tentativa.']
                : battler.volatile[0].vars.pet
                    ? ['<32>{#p/human}* (Você flerta com Doge.)', '<32>{#p/basic}* Doge sorri em retorno.']
                    : battler.volatile[0].sparable
                        ? [
                            '<32>{#p/human}* (Você flerta com Doge.)',
                            '<32>{#p/basic}* Doge, desanimada, não foi receptiva à sua observação.'
                        ]
                        : world.flirt < 10
                            ? ['<32>{#p/human}* (Você flerta com Doge.)', "<32>{#p/basic}* Doge não tem uma reação visível."]
                            : ['<32>{#p/human}* (Você flerta com Doge.)', '<32>{#p/basic}* Doge está dando tudo de si para resistir.'])
        ],
        act_flirt2: [
            '<32>{#p/human}* (Você flerta com Doge de novo.)',
            "<32>{#p/basic}* Doge não vai conseguir se manter assim por muito mais tempo."
        ],
        act_flirt3: [
            '<32>{#p/human}* (Você reúne coragem e chama Doge de uma pequena delícia.)',
            '<32>{#p/basic}* Doge tenta não reagir, mas se encontra corando.',
            "<32>* Ela se contorce e luta, mas não há como esconder o que está em seu rosto.",
            '<32>* Envergonhada, Doge foge da batalha.'
        ],
        batheText: [
            '<32>{#p/human}* (Você sugere que Doge tome um banho.)',
            '<32>{#p/basic}* Doge rasga um cano do teto... a água sai inundando.',
            "<32>* Está fria, mas ela não parece se importar...",
            '<32>* Logo, a água passa por todo o corpo.\n* Doge se sente relaxada...',
            "<32>{#p/story}* ATAQUE de Doge caiu!"
        ],
        batheTextEarly: ["<32>{#p/human}* (Você sugere que Doge deve tomar um banho, mas ela não está no clima ainda.)"],
        batheTextGeno: [
            '<32>{#p/human}* (Você sugere que Doge tome um banho.)',
            '<32>{#p/basic}* Doge não parece preocupada com sua higiene.'
        ],
        batheTextLate: ['<32>{#p/human}* (Você sugere que Doge tome um banho, mas já é tarde demais.)'],
        batheTextPost: ['<32>{#p/human}* (Mas Doge já está limpa.)'],
        fetchStatus: ['<32>{#p/story}* Doge é mais esperta que outros cachorros.'],
        fetchText: () => [
            '<32>{#p/human}* (Você joga a chave inglesa.)\n* (Doge intercepta seu arremesso, lançando-o de volta em você.)',
            '<32>{#p/basic}* A chave bate direto na sua cabeça!',
            '<32>{#p/story}* VELOCIDADE caiu!',
            ...(world.goatbro && SAVE.flag.n.ga_asrielSpanner++ < 1
                ? ["<32>{#p/asriel2}* Não tenta isso de novo."]
                : [])
        ],
        fetchTextEpic: [
            '<32>{#p/human}* (Você joga a chave inglesa.)\n* (Doge, inspirada, pega e traz de volta para você.)'
        ],
        fetchTextGarb: ['<32>{#p/human}* (Você joga a chave inglesa.)\n* (Doge, exausta, ignora.)'],
        flirtStatus: ['<32>{#p/story}* Doge questiona a intenção dos seus avanços.'],
        flirtStatusAccept: ['<32>{#p/story}* Doge fica envergonhada.'],
        flirtStatusReject: ['<32>{#p/story}* Doge suspira apática.'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Quase morto.']
                : ["<32>{#p/story}* Doge está desesperadamente tentando pretender que tudo está bem."],
        name: '* Doge',
        petTalkPost: ['<11>{#p/basic}{~}Ah...'],
        petText: [
            '<32>{#p/human}* (Você tenta acariciar Doge.)',
            '<32>{#p/basic}* Doge hesitando coloca sua cabeça em encontro com sua mão.',
            '<32>* Você faz contato visual.\n* O rosto dela brilha.\n* Ela te dá um grande sorriso.',
            '<32>* Todo o seu estresse reprimido finalmente foi liberado.',
            '<32>* Doge não tem mais interesse em lutar com você.'
        ],
        petTextEarly: ["<32>{#p/human}* (Você tenta acariciar Doge, mas ela ainda não quer.)"],
        petTextGeno: [
            '<32>{#p/human}* (Você tenta acariciar Doge.)',
            '<32>{#p/basic}* Doge não se importa com suas tentativas de afeição.'
        ],
        petTextLate: ['<32>{#p/human}* (Você tenta acariciar Doge, mas já é tarde demais.)'],
        petTextPost1: [
            '<32>{#p/human}* (Você tenta acariciar Doge de novo.)',
            "<32>{#p/basic}* Doge te lambe com amor como se fosse a primeira vez que é cuidada em anos..."
        ],
        petTextPost2: ['<32>{#p/human}* (Você tenta acariciar Doge de novo.)', '<32>{#p/basic}* Doge chegou em nirvana.'],
        petTextPost3: ['<32>{#p/human}* (Você continua acariciando Doge.)', '<32>{#p/basic}* Isso deveria ser crime de tão bom!'],
        petTextPost4: ['<32>{#p/human}* (Você acaricia Doge ainda mais.)', '<32>{#p/basic}* Doge se joga no chão.'],
        petTextPost5: ['<32>{#p/human}* (Você dá uma massagem lateral na Doge.)', '<32>{#p/basic}* Doge está enlouquecendo...'],
        petTextPost6: ['<32>{#p/human}* (Você acaricia Doge.)', '<32>{#p/basic}* E continua.'],
        petTextPost7: ['<32>{#p/human}* (Você acaricia Doge.)', '<32>{#p/basic}* ...'],
        petTextSus: ['<32>{#p/human}* (Mas Doge está muito impaciente para ser acariciada.)'],
        status1: () => (world.goatbro ? ['<32>{#p/asriel2}* Doge.'] : ['<32>{#p/story}* Doge te puxa para trás.']),
        turnStatus1: ['<32>{#p/story}* Doge estuda sua postura e a considera desprezível.'],
        turnStatus2: () =>
            dogecon() ? ['<32>{#p/story}* Doge brinca com sua lança.'] : ['<32>{#p/story}* Doge precisa se lavar.'],
        turnStatus3: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge arruma sua postura.']
                : battler.volatile[0].vars.bathe
                    ? ['<32>{#p/story}* Doge está suada.']
                    : ["<32>{#p/story}* A higiene de Doge permanece inalterada, para sua consternação."],
        turnStatus4: () =>
            dogex()
                ? ['<32>{#p/story}* Doge pensa em sua batalha.']
                : world.dead_canine
                    ? ['<32>{#p/story}* Doge pensa em seus colegas de batalha.']
                    : battler.volatile[0].vars.bathe
                        ? ['<32>{#p/story}* Doge busca uma aventura.']
                        : ['<32>{#p/story}* Doge pondera o propósito de sua batalha.'],
        turnStatus5: () =>
            dogex()
                ? ['<32>{#p/story}* Doge pensa em sua honra.']
                : world.dead_canine
                    ? ['<32>{#p/story}* Doge pensa em seus amigos.']
                    : battler.volatile[0].vars.walk
                        ? ['<32>{#p/story}* Doge relaxa de volta na sua posição original.']
                        : battler.volatile[0].vars.bathe
                            ? ['<32>{#p/story}* Doge reganha sua compostura.']
                            : ['<32>{#p/story}* Doge se lembra com carinho de um antigo colega.'],
        turnStatus6: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge se mantém no controle.']
                : battler.volatile[0].vars.walk
                    ? ['<32>{#p/story}* Doge respira fundo.']
                    : ['<32>{#p/story}* Doge está suando frio.'],
        turnStatus7: () =>
            battler.volatile[0].vars.walk
                ? ['<32>{#p/story}* Doge procura carinho.']
                : ['<32>{#p/story}* Doge respira fundo.'],
        turnStatus8: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge continua na intenção.']
                : battler.volatile[0].vars.walk
                    ? ['<32>{#p/story}* Doge pode usar uma mão amiga.']
                    : ["<32>{#p/story}* A respiração de Doge diminui."],
        turnStatus9: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge continua na intenção.']
                : battler.volatile[0].vars.walk
                    ? ['<32>{#p/story}* Doge só quer carinho.']
                    : ['<32>{#p/story}* Doge está hiperventilando.'],
        turnStatus10: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge continua na intenção.']
                : battler.volatile[0].vars.pet
                    ? ['<32>{#p/story}* Doge está satisfeita.']
                    : ['<32>{#p/story}* Doge fica pacientemente parada próxima de você em redenção.'],
        turnTalk1: () =>
            dogecon() || world.goatbro
                ? ["<11>{#p/basic}{~}Eu sei o que você fez."]
                : ['<11>{#p/basic}{~}A capitã nos avisou de sua chegada.'],
        turnTalk2: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}Todos que vocês dois feriram juntos...',
                    '<11>{#p/basic}{~}Vocês realmente se perderam tanto assim?'
                ]
                : dogex()
                    ? ['<11>{#p/basic}{~}Toda aquela carnificina...', '<11>{#p/basic}{~}Você se sentiu mau ao menos uma vez?']
                    : world.dead_canine
                        ? ['<11>{#p/basic}{~}A unidade canina...', '<11>{#p/basic}{~}Você matou todos eles!']
                        : [
                            '<11>{#p/basic}{~}Por tempo, eu estive na patrulha.',
                            '<11>{#p/basic}{~}Como pode ver... está meio empoeirado aqui.'
                        ],
        turnTalk3: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}É conclusão difícil de evitar...',
                    '<11>{#p/basic}{~}Mas eu não vejo outra alternativa.'
                ]
                : dogecon()
                    ? [
                        '<11>{#p/basic}{~}Você poderia ter se rendido a qualquer momento...',
                        '<11>{#p/basic}{~}Ainda assim você escolheu a violência.'
                    ]
                    : battler.volatile[0].vars.bathe
                        ? ['<11>{#p/basic}{~}Ah...', '<11>{#p/basic}{~}Que agradável...']
                        : [
                            '<11>{#p/basic}{~}Mas nós somos membros do esquadrão de ELITE.',
                            '<11>{#p/basic}{~}Devemos nos adaptar a qualquer situação.'
                        ],
        turnTalk4: () =>
            dogecon() || world.goatbro
                ? [
                    '<11>{#p/basic}{~}Quando eu me juntei ao esquadrão de ELITE...',
                    "<11>{#p/basic}{~}Parte de mim duvidou dos conceitos dados por Undyne aos humanos..."
                ]
                : battler.volatile[0].vars.bathe
                    ? ['<11>{#p/basic}{~}Muita água no meu cabelo...']
                    : [
                        '<11>{#p/basic}{~}Quando eu pedi para entrar no esquadrão de ELITE...',
                        "<11>{#p/basic}{~}Eu nunca imaginei que conseguiria uma vaga."
                    ],
        turnTalk5: () =>
            dogecon() || world.goatbro
                ? ["<11>{#p/basic}{~}Mas após o que você fez...", "<11>{#p/basic}{~}Não existe mais dúvida em minha mente."]
                : battler.volatile[0].vars.walk
                    ? ['<11>{#p/basic}{~}Bem. Nada ganha de uma bela caminhada.']
                    : battler.volatile[0].vars.bathe
                        ? [
                            '<11>{#p/basic}{~}{#f.batmusic1}Só um momento.',
                            '<11>{#p/basic}{~}...',
                            '<11>{#p/basic}{~}\x00*balança ao redor*',
                            '<11>{#p/basic}{~}\x00*chicotadas continuam*',
                            '<11>{#p/basic}{~}\x00*balança*',
                            '<11>{#p/basic}{~}...',
                            '<11>{#p/basic}{~}Pronto, sequinha.\nVamos voltar para a luta?',
                            '{*}{#f.batmusic2}{%}'
                        ]
                        : [
                            '<11>{#p/basic}{~}Mas após aquele boneco sair...',
                            '<11>{#p/basic}{~}Eu me tornei a próxima na lista.'
                        ],
        turnTalk6: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}E você, Asriel... um traidor para sua própria espécie...',
                    '<11>{#p/basic}{~}É difícil acreditar que você seria nomeado nosso rei.'
                ]
                : dogex()
                    ? ['<11>{#p/basic}{~}Seria inteligente da sua parte se render.', '<11>{#p/basic}{~}Não que você saiba como.']
                    : world.dead_canine
                        ? [
                            '<12>{#p/basic}{~}Doggo foi o mais novo recruta da unidade canina.',
                            '<11>{#p/basic}{~}Alguns viram sua cegueira como uma fraqueza...',
                            '<11>{#p/basic}{~}Mas ele prometeu muito.'
                        ]
                        : battler.volatile[0].vars.walk
                            ? [
                                "<11>{#p/basic}{~}Você com certeza tem andado faz um tempo.",
                                '<11>{#p/basic}{~}Quanta energia você Tem?'
                            ]
                            : battler.volatile[0].vars.bathe
                                ? ['<11>{#p/basic}{~}Desculpa.\nTem muito na minha cabeça.']
                                : [
                                    '<11>{#p/basic}{~}Tem sido uma linha difícil de trabalho...',
                                    '<11>{#p/basic}{~}Até mesmo Undyne tem seus momentos de dúvida.',
                                    '<11>{#p/basic}{~}... não conte a ele que eu te disse isso.'
                                ],
        turnTalk7: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}Este é realmente o destino que nos pertence?',
                    '<11>{#p/basic}{~}Um príncipe vilão e o seu parceiro humano...',
                    '<11>{#p/basic}{~}... em uma missão para matar todos nós?'
                ]
                : dogex()
                    ? [
                        '<11>{#p/basic}{~}Pela vida, você não tem mostrado nada além de desprezo.',
                        '<11>{#p/basic}{~}Em cada momento, você nos tratou como inferiores.'
                    ]
                    : world.dead_canine
                        ? [
                            "<11>{#p/basic}{~}Canis Minor era o subordinado de Canis Major.",
                            '<11>{#p/basic}{~}Sua perspectiva única nos ajudou de inúmeras formas...',
                            '<11>{#p/basic}{~}Mesmo que as vezes fosse mau entendido.'
                        ]
                        : battler.volatile[0].vars.walk
                            ? ['<11>{#p/basic}{~}Claramente mais do que eu esperava...']
                            : ['<11>{#p/basic}{~}(Chorinho...)'],
        turnTalk8: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}Após tudo dito e feito...',
                    "<11>{#p/basic}{~}Eu não consigo decidir qual de vocês é pior."
                ]
                : dogex()
                    ? ['<11>{#p/basic}{~}Agora, é a sua vez.', '<11>{#p/basic}{~}Sua vez de ser tratado como inferior.']
                    : world.dead_canine
                        ? [
                            '<11>{#p/basic}{~}Dogamy e Dogaressa, uma dupla de inteligência.',
                            '<11>{#p/basic}{~}Antes de se conhecerem, eles sempre se metiam em briga.',
                            '<11>{#p/basic}{~}Mas assim que se uniram, eles conseguiram TUDO.'
                        ]
                        : battler.volatile[0].vars.walk
                            ? ['<11>{#p/basic}{~}...', '<11>{#p/basic}{~}Podemos realmente continuar desse jeito?']
                            : ['<11>{#p/basic}{~}Esta batalha está começando a me cansar.'],
        turnTalk9: () =>
            world.goatbro
                ? 
                ['<11>{#p/basic}{~}Basta dizer...', '<11>{#p/basic}{~}Isso, eu não esperava.']
                : dogex()
                    ? ['<11>{#p/basic}{~}...']
                    : world.dead_canine
                        ? [
                            '<11>{#p/basic}{~}Major Canis estava lá quando a unidade canina foi formada.',
                            '<11>{#p/basic}{~}Junto com seu mestre, isso levou bem a unidade.',
                            '<11>{#p/basic}{~}Mas agora...'
                        ]
                        : ['<11>{#p/basic}{~}Humano, eu...'],
        turnTalk10: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}Não há mais nada a dizer.',
                    '<11>{#p/basic}{~}Eu lançarei justiça ao terror que foi entregue.'
                ]
                : dogex()
                    ? [
                        '<11>{#p/basic}{~}Não há mais nada a dizer.',
                        "<11>{#p/basic}{~}Eu lançarei justiça ao terror que foi entregue."
                    ]
                    : world.dead_canine
                        ? [
                            '<11>{#p/basic}{~}Não há mais nada a dizer.',
                            "<11>{#p/basic}{~}Eu lançarei justiça pela morte daqueles cães."
                        ]
                        : battler.volatile[0].vars.pet
                            ? ['<11>{#p/basic}{~}(Cora)', '<11>{#p/basic}{~}Você é um... bom humano...']
                            : [
                                '<11>{#p/basic}{~}Eu acho que já chega.',
                                '<11>{#p/basic}{~}...',
                                '<11>{#p/basic}{~}Em certo lado, você não parece tão mau.',
                                '<11>{#p/basic}{~}Pelo menos, comparado a como Undyne descreve.',
                                '<11>{#p/basic}{~}Aceite minha piedade como um controle...',
                                '<11>{#p/basic}{~}Um controle que te fará não cair na escuridão.'
                            ],
        turnTalk11: () => ['<11>{#p/basic}{~}...'],
        walkText: [
            '<32>{#p/human}* (Você se oferece a levar Doge em uma caminhada.)',
            '<32>{#p/basic}* Doge te segue.\n* Juntos vocês marcham em união.',
            '<32>* Continua por um tempo...',
            '<32>* Mas eventualmente...',
            '<32>* Doge se cansa deste exaustivo exercício.',
            '<32>* Ela te segue de volta para a zona de patrulha e relaxa um pouco...',
            "<32>{#p/story}* ATAQUE de Doge caiu!"
        ],
        walkTextEarly: ['<32>{#p/human}* (Você oferece levar Doge em uma caminhada, mas ela ainda não tem razão para ir.)'],
        walkTextGeno: [
            '<32>{#p/human}* (Você se oferece a levar Doge em uma caminhada.)',
            '<32>{#p/basic}* Doge se recusa a caminhar com você a qualquer lugar.'
        ],
        walkTextLate1: [
            "<32>{#p/human}* (Você se oferece para levar Doge para passear, mas ela já se secou para você.)"
        ],
        walkTextLate2: [
            '<32>{#p/human}* (Você se oferece para levar Doge para passear, mas ela nunca fez nada para precisar disso.)'
        ],
        walkTextPost: ['<32>{#p/human}* (Mas Doge já estava cansada de caminhar de antemão.)'],
        walkTextSus: ['<32>{#p/human}* (Mas Doge estava suja demais para dar um passeio.)']
    },
    b_opponent_muffet: {
        act_check: ['<32>{#p/story}* MUFFET - ATQ 39 DEF 19\n* Rainha do clã das aranhas.\n* Voluntária da ELITE.'],
        act_flirt: () => [
            ...(badSpider()
                ? ['<32>{#p/human}* (Você flerta com Muffet.)\n* (Muffet lhe dá uma olhada rabugenta.)']
                : battler.volatile[0].sparable
                    ? ['<32>{#p/human}* (Você flerta com a Muffet.)\n* (Muffet sorri e te faz carinho na cabeça com suas várias mãos.)']
                    : world.flirt < 10
                        ? ['<32>{#p/human}* (Você flerta com Muffet.)\n* (Muffet sorri e passa os dedos por sua bochecha.)']
                        : ['<32>{#p/human}* (Você flerta com Muffet.)\n* (Muffet parece intrigada, mas isso pode não ser suficiente.)'])
        ],
        act_flirt2: [
            '<32>{#p/human}* (Você flerta com Muffet novamente.)\n* (Muffet vira mais do que alguns olhos para você.)'
        ],
        act_flirt3: [
            '<32>{#p/human}* (Você cria coragem, e chama Muffet para um encontro de piquenique.)',
            '<32>{#p/basic}* Muffet sorri...',
            '<32>* E sorri ainda mais...',
            "<32>* Ela não consegue se conter!\n* Muffet sucumbe ao seu poder de flerte imparável!",
            '<32>* ... então prontamente decide encerrar esta batalha, para não envergonhar suas companheiras aranhas.',
            '<32>{#p/kidding}* ... quê?'
        ],
        flirtReaction1: ['<11>{#p/basic}{~}Que adorável~'],
        flirtReaction2: ["<11>{#p/basic}{~}Você é super fofinho~"],
        flirtReaction3: ['<11>{#p/basic}{~}Ahuhu~'],
        appeaseText: [
            '<33>{#p/human}* (Você faz um apelo a Muffet.)\n* (Muffet é mais uma vez\n  intrigada com suas palavras.)',
            '<32>* (Você menciona como cachorros inocentes foram enfiados na Guarda Real.)',
            '<32>* (Você sugere que confiar na capitã seria colocar o clã das aranhas em risco.)',
            '<32>{#p/basic}* Muffet considera a situação...',
            "<32>{#p/story}* VELOCIDADE da Muffet caiu!"
        ],
        appeaseTextEarly: ["<32>{#p/human}* (Você faz um apelo para a Muffet, mas ela não está pronta para ouvir.)"],
        appeaseTextGeno: [
            '<32>{#p/human}* (Você faz um apelo para Muffet.)',
            '<32>{#p/basic}* Muffet não será influenciado por suas reivindicações superficiais.'
        ],
        appeaseTextLate: [
            "<32>{#p/human}* (Você faz um apelo para Muffet, mas ela já passou do ponto de querer te ouvir.)"
        ],
        appeaseTextPost: ["<32>{#p/human}* (Mas Muffet não precisou ser apaziguada duas vezes.)"],
        appeaseTextSus: ['<32>{#p/human}* (Mas Muffet não tem razões para te ouvir.)'],
        counterText: [
            '<32>{#p/human}* (Você tenta argumentar contra Muffet.)\n* (Muffet está intrigada.)',
            '<32>* (Você propõe que o acordo com o esquadrão de ELITE é frágil.)',
            '<32>* (Você aponta para a falha que um de seus membros teve em captura-lo.)',
            '<32>{#p/basic}* Muffet começa a pensar em tudo calmamente...',
            "<32>{#p/story}* VELOCIDADE da Muffet caiu!"
        ],
        counterTextEarly: [
            "<32>{#p/human}* (Você tenta refutar Muffet, mas ela não disse nada para ser refutada.)"
        ],
        counterTextGeno: [
            '<32>{#p/human}* (Você tenta contra argumentar Muffet.)',
            '<32>{#p/basic}* Muffet está indecisa em seu objetivo.'
        ],
        counterTextLate: ["<32>{#p/human}* (Você tenta contra argumentar Muffet, mas ela já se decidiu.)"],
        counterTextPost: ['<32>{#p/human}* (Mas Muffet já ouviu seu argumento.)'],
        name: '* Muffet',
        payTalkPost: ["<11>{#p/basic}{~}Isso é bem legal, mas já tivemos o suficiente~"],
        payText: [
            '<32>{#p/human}* (Você tenta pagar Muffet.)',
            "<32>* Ao que parece, Criança Monstro tem todo o G que o clã das aranhas necessita!",
            '<32>* Muffet enche os bolsos de dinheiro e lança beijos para vocês dois.',
            '<32>* Seus serventes estarão bem alimentados por um tempo.',
            "<32>* Muffet não tem mais interesse em lutar."
        ],
        payTextEarly: [
            "<32>{#p/human}* (Você tenta pagar Muffet, mas ela ainda não viu motivos para poder aceitar.)"
        ],
        payTextGeno: [
            '<32>{#p/human}* (Você tenta pagar Muffet.)',
            "<32>{#p/basic}* Muffet não quer nenhum dinheiro vindo de você."
        ],
        payTextLate: ["<32>{#p/human}* (Você tenta pagar Muffet, mas ela já passou do ponto de bajulação.)"],
        payTextPost: ['<32>{#p/human}* (Você tenta pagar Muffet de novo.)'],
        payTextSus: ['<32>{#p/human}* (Mas Muffet não tem razões para acreditar em você.)'],
        status1: ["<32>{#p/kidding}* Eu tô preso...!"],
        turnStatus1: () =>
            badSpider()
                ? world.genocide
                    ? world.bullied
                        ? ['<32>{#p/kidding}* quem a gente bullinou...?']
                        : ['<32>{#p/kidding}* assassinos?']
                    : world.bullied
                        ? ['<32>{#p/kidding}* quem você bullinou...?']
                        : ['<32>{#p/kidding}* quem você matou...?']
                : ['<32>{#p/kidding}* Ajuda...!'],
        turnStatus2: () =>
            badSpider()
                ? world.genocide
                    ? ["<32>{#p/kidding}* Mas a gente não fez nada!"]
                    : ["<32>{#p/kidding}* Eu tenho uma sensação ruim em relação a isso..."]
                : ["<32>{#p/kidding}* Então são negócios..."],
        turnStatus3: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Yo...\n* Ela REALMENTE não gosta de você..."]
                : battler.volatile[0].vars.counter
                    ? ['<32>{#p/kidding}* O que nós vamos fazer?']
                    : ["<32>{#p/kidding}* Nós nunca vamos sair daqui..."],
        turnStatus4: () =>
            badSpider()
                ? ['<32>{#p/kidding}* Mas que caramba foi AQUILO?']
                : battler.volatile[0].vars.counter
                    ? ['<32>{#p/kidding}* Ela esta... mudando de ideia?']
                    : ['<32>{#p/kidding}* Mas que caramba foi AQUILO?'],
        turnStatus5: () =>
            badSpider()
                ? ['<32>{#p/kidding}* Claro...']
                : battler.volatile[0].vars.counter
                    ? ["<32>{#p/kidding}* Acho que não vai ser tão fácil..."]
                    : ["<32>{#p/kidding}* V... você tá brincando, né?\n* Isso nem é nem um pouco legal!"],
        turnStatus6: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Eu não gosto do que ela está falando sobre você, cara..."]
                : battler.volatile[0].vars.counter
                    ? ['<32>{#p/kidding}* Amigas aranhas...?']
                    : ['<32>{#p/kidding}* Uh...'],
        turnStatus7: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Ela é implacável...!"]
                : battler.volatile[0].vars.appease
                    ? ['<32>{#p/kidding}* Ei, espera...\n* Eu acho que tá funcionando!\n* Continua assim, mano!']
                    : ["<32>{#p/kidding}* Eu...\n* Eu estou com medo, cara..."],
        turnStatus8: () =>
            badSpider()
                ? ['<32>{#p/kidding}* Cara, COMO a gente AINDA TÁ VIVO??']
                : battler.volatile[0].vars.appease
                    ? ["<32>{#p/kidding}* Yo, muffins esquisitos à parte... Estamos progredindo!\n* Eu acho?"]
                    : ['<32>{#p/kidding}* Ack, não de novo!!'],
        turnStatus9: () =>
            badSpider()
                ? ['<32>{#p/kidding}* O que é \"inevitável?\"']
                : battler.volatile[0].vars.appease
                    ? ['<32>{#p/kidding}* Mas...\n* Eu achei que a gente...']
                    : ['<32>{#p/kidding}* Ack, não de novo!!'],
        turnStatus10: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Yo, eu estou aqui também, sabe..."]
                : battler.volatile[0].vars.appease
                    ? ["<32>{#p/kidding}* Ei, eu tenho dinheiro!\n* Vamos usar, cara!"]
                    : ['<32>{#p/kidding}* Alguém, qualquer pessoa...'],
        turnStatus11: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Isso não é legal...!"]
                : battler.volatile[0].vars.pay
                    ? ["<32>{#p/kidding}* Espero que aquele esqueleto pequeno não se importe de eu usar o dinheiro dele..."]
                    : battler.volatile[0].vars.appease
                        ? ["<32>{#p/brincando}* Cara...\n* Por que não a ajudamos?"]
                        : ["<32>{#p/kidding}* Acabou..."],
        turnStatus12: () =>
            badSpider() ? ['<32>{#p/kidding}* ...'] : ['<32>{#p/kidding}* A gente vai acabar com isso, ou...?'],
        turnStatus13: () =>
            badSpider() ? ['<32>{#p/kidding}* Realmente acabou?'] : ['<32>{#p/kidding}* A gente vai acabar com isso, ou...?'],
        turnTalk1: () =>
            badSpider()
                ? world.genocide
                    ? world.bullied
                        ? ['<11>{#p/basic}{~}Ahuhuhu... dois valentões na minha teia~']
                        : ['<11>{#p/basic}{~}Ahuhuhu... dois assassinos na minha teia~']
                    : world.bullied
                        ? ['<11>{#p/basic}{~}Ahuhuhu... um valentão na minha teia~']
                        : ['<11>{#p/basic}{~}Ahuhuhu... um assassino na minha teia~']
                : ["<11>{#p/basic}{~}Você é meu agora, querido~"],
        turnTalk1a: [
            '<11>{#p/basic}{~}Espero que você goste da sua nova cor~',
            '<11>{#p/basic}{~}Eu acho que roxo fica melhor em você...',
            "<11>{#p/basic}{~}Não é, querido?"
        ],
        turnTalk2: () =>
            badSpider()
                ? [
                    world.genocide
                        ? '<11>{#p/basic}{~}O vocês pensavam que aconteceria, amores?'
                        : '<11>{#p/basic}{~}O que você pensou que aconteceria, amor?',
                    '<11>{#p/basic}{~}Você espera que eu te poupe?'
                ]
                : [
                    "<11>{#p/basic}{~}Não espere que eu pegue leve contigo, humaninho.",
                    '<11>{#p/basic}{~}Aquele esquadrão de ELITE ofereceu muito dinheiro por sua ALMA~'
                ],
        turnTalk3: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Oh meu~', '<11>{#p/basic}{~}Que lástima para você~']
                : battler.volatile[0].vars.counter
                    ? ['<11>{#p/basic}{~}Ahuhuhu...\nBem...']
                    : [
                        '<11>{#p/basic}{~}Com a falta de uma contra-oferta...',
                        '<11>{#p/basic}{~}A escolha para mim é óbvia~'
                    ],
        turnTalk4: () =>
            badSpider()
                ? [
                    '<11>{#p/basic}{~}Olha.\nDa pra tirar uma coisa boa disso tudo.',
                    "<11>{#p/basic}{~}Eu não preciso me sentir mau em relação a alimentação do meu pet!"
                ]
                : battler.volatile[0].vars.counter
                    ? ['<11>{#p/basic}{~}Um acordo melhor seria legal...']
                    : ['<11>{#p/basic}{~}Onde você está, meu pet~', "<11>{#p/basic}{~}É hora de comer~"],
        turnTalk5: () =>
            badSpider()
                ? [
                    '<11>{#p/basic}{~}Você sobreviveu?\nImpressionante~',
                    '<11>{#p/basic}{~}Eu devo te presentear...',
                    '<11>{#p/basic}{~}... com mais ataques, é claro.\nAhuhuhu!'
                ]
                : battler.volatile[0].vars.counter
                    ? [
                        '<11>{#p/basic}{~}Mas que garantia eu tenho...',
                        "<11>{#p/basic}{~}... que você não vai me apunhalar pelas costas?"
                    ]
                    : [
                        '<11>{#p/basic}{~}Eu sempre me perguntei como seria lutar.',
                        "<11>{#p/basic}{~}Eu nunca imaginei que seria tão divertido~"
                    ],
        turnTalk6: () =>
            badSpider()
                ? [
                    '<11>{#p/basic}{~}Como foi a sensação, hmm?',
                    !world.bullied
                        ? '<11>{#p/basic}{~}Todos aqueles monstros caindo como dominós...'
                        : '<11>{#p/basic}{~}Todos aqueles monstros correndo assustados...'
                ]
                : battler.volatile[0].vars.counter
                    ? [
                        '<11>{#p/basic}{~}Minha amigas aranhas precisam estar em segurança...',
                        "<11>{#p/basic}{~}Eu não posso colocá-las em perigo, posso?\nAhuhu..."
                    ]
                    : [
                        "<11>{#p/basic}{~}Você não está se divertindo, querido?",
                        '<11>{#p/basic}{~}Minhas amigas aranhas com certeza vão...',
                        '<11>{#p/basic}{~}... quando pegarem sua parte do dinheiro~'
                    ],
        turnTalk7: () =>
            badSpider()
                ? world.genocide || !world.bullied
                    ? [
                        world.genocide ? '<11>{#p/basic}{~}Bem, queridos...' : '<11>{#p/basic}{~}Bem, querido...',
                        '<11>{#p/basic}{~}Eu devo apreciar te matar pessoalmente~'
                    ]
                    : ['<11>{#p/basic}{~}Bem, querido...', '<11>{#p/basic}{~}Eu devo apreciar pagar o favor de volta~']
                : battler.volatile[0].vars.appease
                    ? ['<11>{#p/basic}{~}Eu devo admitir, isto é bem preocupante...']
                    : [
                        '<11>{#p/basic}{~}Bem, não importa, pequeno humano~',
                        '<11>{#p/basic}{~}A única coisa que importa agora é sua ALMA~'
                    ],
        turnTalk8: () =>
            badSpider()
                ? [
                    world.genocide
                        ? '<11>{#p/basic}{~}Oh, isso é tão divertido!'
                        : '<11>{#p/basic}{~}Oh, isso é tão divertido, não é?',
                    "<11>{#p/basic}{~}Meu pet, é hora de comer~"
                ]
                : battler.volatile[0].vars.appease
                    ? [
                        "<11>{#p/basic}{~}E eles não fizeram exatamente muito para ganhar minha confiança",
                        '<11>{#p/basic}{~}Oh, olá, meu pet~'
                    ]
                    : ['<11>{#p/basic}{~}Segundo turno, meu pet~'],
        turnTalk9: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Você está apenas atrasando o inevitável~']
                : battler.volatile[0].vars.appease
                    ? ['<11>{#p/basic}{~}Ainda assim, queridos...', "<11>{#p/basic}{~}Eu não sei se posso confiar em você~"]
                    : ["<11>{#p/basic}{~}Você é resiliente, vou te dizer isso~"],
        turnTalk10: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Nossa...', "<11>{#p/basic}{~}Você não tá ficando cansado?"]
                : battler.volatile[0].vars.appease
                    ? ['<11>{#p/basic}{~}Ah não ser que, talvez...', '<11>{#p/basic}{~}Você possa me oferecer uma garantia?']
                    : ['<11>{#p/basic}{~}Mas a não ser que o acordo mude, sua ALMA será minha~'],
        turnTalk11: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Ahuhuhu...']
                : battler.volatile[0].vars.pay
                    ? [
                        '<11>{#p/basic}{~}Vocês dois tem minhas sinceras desculpas~',
                        "<11>{#p/basic}{~}Esta é uma boa ação que não esquecerei facilmente!"
                    ]
                    : [
                        "<11>{#p/basic}{~}O que é isso?\nUma mensagem da Undyne?",
                        "<11>{#p/basic}{~}Ela cortou o acordo...?",
                        '<11>{#p/basic}{~}... hmmm...',
                        "<11>{#p/basic}{~}Bem, acho que meu trabalho aqui está feito, não é mesmo?",
                        '<11>{#p/basic}{~}Desculpa por gastar seu tempo~'
                    ],
        turnTalk12: () => ['<11>{#p/basic}{~}...'],
        turnTalk13: (didf: boolean) =>
            badSpider()
                ? [
                    world.genocide
                        ? '<11>{#p/basic}{~}Quer saber de uma coisa, queridos?'
                        : '<11>{#p/basic}{~}Quer saber de uma coisa, querido?',
                    "<11>{#p/basic}{~}Já me cansei de lutar.",
                    '<11>{#p/basic}{~} Então faça o que quiser.',
                    world.genocide || !world.bullied
                        ? didf
                            ? "<11>{#p/basic}{~}... desculpa, Undyne.\nEu prefiro morrer do meu jeito, obrigada."
                            : '<11>{#p/basic}{~}... desculpa, Undyne.\nMeu cansaço bateu, eu não quero mais lutar.'
                        : didf
                            ? "<11>{#p/basic}{~}Sinceramente, um bully feito você, não é quem vai ter o prazer de me matar..."
                            : "<11>{#p/basic}{~}Sinceramente, um bully feito você não vale meu tempo...",
                    '<11>{#p/basic}{~}Tchau tchau~'
                ]
                : ['<11>{#p/basic}{~}...']
    },
    b_opponent_undyne: {
        artifact: ["<32>{#p/human}* (Undyne nem parece saber o que é isso.)"],
        epiphaNOPE: ['<20>{#p/undyne}Huh?\nMas o que é isso?'],
        spaghetti1: [
            '<32>{#p/basic}* O cheiro lembra Undyne, de alguém próximo a ela...',
            "<32>{#p/story}* Undyne perdeu ATAQUE!"
        ],
        spaghetti2: () =>
            world.genocide
                ? [
                    "<32>{#p/basic}* O cheiro lembra Undyne de alguém que ele jamais verá de novo...",
                    '<32>{#p/basic}* ... mas sua determinação de eliminá-lo se fortalece.',
                    "<32>{#p/story}* ATAQUE da Undyne subiu!\n* DEFESA da Undyne caiu!"
                ]
                : [
                    "<32>{#p/basic}* O cheiro lembra Undyne de alguém que ele jamais verá de novo...",
                    "<32>{#p/story}* DEFESA da Undyne caiu!"
                ],
        act_check: () =>
            world.genocide
                ? SAVE.flag.n.azzy_assist < 2
                    ? ['<32>{#p/asriel2}* Undyne.\n* Não morreu?']
                    : ["<32>{#p/asriel2}* Undyne.\n* Não era pra você estar atacando ela ou sei lá?"]
                : helmetdyne()
                    ? ['<32>{#p/história}* UNDYNE - ATQ 40 DEF 100\n* Capitã da Guarda Real.\n* Implacável.']
                    : respecc()
                        ? ['<32>{#p/story}* UNDYNE - ATQ 25 DEF 10\n* Uma vez sua mortal inimiga, mas agora sua igual!']
                        : ['<32>{#p/story}* UNDYNE - ATQ 50 DEF 20\n* A heroína que NUNCA desiste.'],
        name: () => (world.genocide ? '* Undyne a Imortal' : '* Undyne'),
        status1: () =>
            helmetdyne()
                ? ['<32>{#p/story}* Undyne se põe em frente a você.']
                : respecc()
                    ? ['<32>{#p/story}* Undyne te encara de frente!']
                    : ['<32>{#p/story}* Undyne te ataca!'],
        intro1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{*}{#p/undyne}Prepare-se.']
                : ['<20>{*}{#p/undyne}Em guarda!'],
        intro2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ["<20>{*}{#p/undyne}Eu não tinha terminado de contar minha história."]
                : respecc()
                    ? ['<20>{*}{#p/undyne}Huh!?\nEu pensei que você era durona!']
                    : ["<20>{*}{#p/undyne}Você não vai fugir de mim dessa vez!"],
        intro3: () =>
            respecc()
                ? ['<20>{*}{#p/undyne}Sem segundas chances!']
                : ["<20>{*}{#p/undyne}Você escapou de mim pela ÚLTIMA vez!"],
        intro4: ['<20>{*}{#p/undyne}PARE DE CORRER!!!'],
        intro5: ['<20>{*}{#p/undyne}VOLTA AQUI, PIRRALHA!'],
        earlyChallenge: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/3}Então, você quer fazer isso da maneira {@fill=#f00}difícil{@fill=#000}, né?',
                    '<20>{#e/undyne/2}Por mim beleza.'
                ]
                : respecc()
                    ? [
                        "<20>{#p/undyne}{#e/undyne/17}Quê!?\nEu já estou correndo o mais rápido que posso!",
                        '<20>{#e/undyne/17}Mas... eu... você...',
                        "<20>{#e/undyne/17}Não!\nEu vou te mostrar!",
                        "<20>{#e/undyne/1}Eu vou te mostrar {@fill=#f00}TUDO QUE EU TENHO{@fill=#000}!"
                    ]
                    : [
                        '<20>{#p/undyne}{#e/undyne/17}Então, você quer fazer isso da maneira {@fill=#f00}difícil{@fill=#000}, hein?',
                        '<20>{#e/undyne/1}POR MIM BELEZA! \nFUHUHU!'
                    ],
        earlyChallengeStatus: ['<32>{#p/story}* As coisas vão ficar quentes!'],
        randStatus1: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne aponta dramaticamente para o espaço.']
                : ['<32>{#p/story}* Undyne aponta heroicamente para o espaço.'],
        randStatus2: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne gira sua lança com graça.']
                : ['<32>{#p/story}* Undyne balança sua lança com impaciência.'],
        randStatus3: () => ['<32>{#p/story}* Undyne flexiona um asteróide.\n* Só porque ela pode.'],
        randStatus4: () =>
            respecc() ? ['<32>{#p/story}* Undyne balança em fervor.'] : ['<32>{#p/story}* Undyne balança impaciente.'],
        randStatus5: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne da um sorriso genuíno.']
                : ['<32>{#p/story}* Undyne da um sorriso saliente.'],
        randStatus6: () =>
            respecc()
                ? ['<33>{#p/story}* Undyne olha por cima com adoração.']
                : ['<32>{#p/story}* Undyne passa o dedo pelo pescoço.'],
        randStatus7: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne deixa cair uma lágrima de batalha.']
                : ['<32>{#p/story}* Undyne coloca seu punho em frente ao rosto e balança a cabeça.'],
        randStatus8: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne encara sua ALMA.']
                : ['<32>{#p/story}* Undyne se eleva ameaçadoramente.'],
        randStatus9: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne pensa em seus amigos... e pensa em você.']
                : ['<32>{#p/story}* Undyne pensa em seus amigos e soca o chão.'],
        randStatus10: () =>
            respecc() ? ['<32>{#p/story}* Cheira a tilápia.'] : ['<32>{#p/story}* Cheira a sushi.'],
        papStatus1: ['<32>{#p/story}* Undyne tem lágrimas em seus olhos.'],
        papStatus2: ['<32>{#p/story}* Undyne franze a testa para você.'],
        papStatus3: ['<32>{#p/story}* Undyne pensa em seus amigos e destrói o chão com seu corpo.'],
        papStatus4: ["<32>{#p/story}* Undyne não está no clima para jogos."],
        papStatus5: ['<32>{#p/story}* Cheira a salada de atum.'],
        endStatus1: ["<32>{#p/story}* Os olhos de Undyne tremem involuntariamente."],
        endStatus2: ['<32>{#p/story}* Undyne está jogando lanças no chão.'],
        endStatus3: ["<32>{#p/story}* O olho de Undyne se vira para ver se isso é uma brincadeira."],
        endStatus4: ['<32>{#p/story}* Undyne está hiperventilando.'],
        endStatus5: ['<32>{#p/story}* Cheira a peixe assado.'],
        tutorial1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/3}...',
                    "<20>{#e/undyne/4}O quê? Você tá esperando que eu te explique estratégia aqui?"
                ]
                : [
                    "<20>{#p/undyne}{#e/undyne/0}Com tanto que você esteja {@fill=#00c000}VERDE{@fill=#000} {@fill=#f00}NÃO IRÁ ESCAPAR{@fill=#000}!",
                    '<20>{#e/undyne/0}Ah não ser que você saiba {@fill=#f00}enfrentar o perigo{@fill=#000}...',
                    "<20>{#e/undyne/1}Não vai durar um segundo contra MIM!"
                ],
        tutorial2: [
            '<20>{#p/undyne}{#e/undyne/0}Quando eu disse {@fill=#f00}enfrentar o perigo{@fill=#000}...',
            '<20>{#e/undyne/1}Eu disse para encarar as balas!'
        ],
        tutorial3: () => [
            '<20>{#p/undyne}{#e/undyne/3}Olha.',
            '<20>{#e/undyne/3}Eu te dei o escudo.',
            '<20>{#e/undyne/2}Você pode usar para bloquear meus ataques.',
            respecc()
                ? '<20>{#e/undyne/17}Eu não deveria precisar te explicar ISSO!'
                : '<20>{#e/undyne/17}Eu preciso explicar isso de forma mais clara?'
        ],
        tutorial4: [
            '<20>{#p/undyne}{#e/undyne/6}O QUE VOCÊ TÁ FAZENDO?',
            '<20>{#e/undyne/7}SÓ ME ENFRENTA!!!',
            "<20>{#e/undyne/5}NÃO É TÃO DIFÍCIL!!!"
        ],
        tutorial5: () =>
            respecc()
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}...',
                    '<20>{#e/undyne/2}Eu queria que essa fosse uma batalha justa.',
                    "<20>{#e/undyne/3}Eu esperava que você fosse me mostrar do que é capaz.",
                    '<20>{#e/undyne/4}E talvez, se você me derrotar assim...',
                    "<20>{#e/undyne/2}Mostraria o quão forte você é.",
                    '<20>{#e/undyne/6}MAS AGORA???',
                    "<20>{#e/undyne/5}EU NÃO LIGO!",
                    "<20>{#e/undyne/5}EU NÃO SOU SUA BABÁ!",
                    '<20>{#e/undyne/17}Ah não ser que sua babá...',
                    '<20>{#e/undyne/5}FAÇA ISSO!'
                ]
                : [
                    '<20>{#p/undyne}{#e/undyne/2}...',
                    '<20>{#e/undyne/2}Eu queria que essa fosse uma batalha justa.',
                    '<20>{#e/undyne/3}Eu queria te dar uma chance.',
                    '<20>{#e/undyne/4}E talvez, se eu te derrotar assim...',
                    "<20>{#e/undyne/2}Isso mostraria o quão forte monstros podem ser.",
                    '<20>{#e/undyne/6}MAS AGORA???',
                    "<20>{#e/undyne/5}EU NÃO LIGO!",
                    "<20>{#e/undyne/5}EU NÃO SOU SUA BABÁ!",
                    '<20>{#e/undyne/17}Ah não ser que sua babá...',
                    '<20>{#e/undyne/5}FAÇA ISSO!'
                ],
        turnTalkA1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? SAVE.data.n.hp < 6
                    ? [
                        '<20>{#p/undyne}{#e/undyne/33}Difícil demais?\nFeh.',
                        "<20>{#p/undyne}{#e/undyne/2}Você deveria ter pensado sobre ISSO quando eu te dei a chance."
                    ]
                    : SAVE.data.n.hp < 11
                        ? [
                            '<20>{#p/undyne}{#e/undyne/3}Nada mal, nada super legal.',
                            "<20>{#p/undyne}{#e/undyne/2}Papyrus com certeza não estaria satisfeito."
                        ]
                        : SAVE.data.n.hp < 16
                            ? [
                                "<20>{#p/undyne}{#e/undyne/3}Então você vai ser um pouco mais forte do que eu esperava.",
                                '<20>{#p/undyne}{#e/undyne/2}Justo.'
                            ]
                            : [
                                '<20>{#p/undyne}{#e/undyne/4}Impressionante...',
                                "<20>{#p/undyne}{#e/undyne/2}Só não espere que sua sorte dure tanto tempo."
                            ]
                : battler.volatile[0].vars.trolled
                    ? respecc()
                        ? [
                            '<20>{#p/undyne}{#e/undyne/1}\x00*huff...*\n\x00*huff...*',
                            '<20>{#e/undyne/1}Então era esse seu plano o tempo todo, huh?',
                            '<20>{#e/undyne/5}Me irritar para que você possa me enfrentar com força total?',
                            '<20>{#e/undyne/0}Pois bem.',
                            "<20>{#e/undyne/6}Parece que vamos ter que fazer isso do {@fill=#f00}jeito difícil{@fill=#000}!",
                            '<20>{#e/undyne/1}Fuhuhuhu!!'
                        ]
                        : [
                            '<20>{#p/undyne}{#e/undyne/1}\x00*huff...*\n\x00*huff...*',
                            '<20>{#e/undyne/21}Nada mal.',
                            "<20>{#e/undyne/15}Mas eu não tenho tempo para seus joguinhos.",
                            "<20>{#e/undyne/6}Então VAMOS fazer isso do {@fill=#f00}jeito difícil{@fill=#000}!",
                            '<20>{#e/undyne/1}Fuhuhuhu!!'
                        ]
                    : ['<20>{#p/undyne}{#e/undyne/1}Nada mal!\nQue tal isso!?'],
        turnTalkA2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/2}Deixa eu te contar uma história.']
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/0}Faz tempo desde que eu lutei com um guerreiro igual a você..."]
                    : ["<20>{#p/undyne}{#e/undyne/0}Por anos, nós sonhamos com um final feliz..."],
        turnTalkA3: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}Quando eu estava treinando para ser da guarda real...',
                    "<20>{#p/undyne}{#e/undyne/2}As coisas não eram estrelas e rosas."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/0}E agora, tenho a chance de lutar com um!"]
                    : ['<20>{#p/undyne}{#e/undyne/0}E agora, as estrelas estão ao nosso alcance!'],
        turnTalkA4: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/2}Muitas eram contra minha entrada na guarda, inclusive minha família.']
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/1}Eu irei aproveitar este momento pelo tempo que ele durar!"]
                    : ["<20>{#p/undyne}{#e/undyne/1}Eu não deixar você tirar isso de nós!"],
        turnTalkA5: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/3}E quando eu perdi meu olho em um acidente de treino...',
                    '<20>{#p/undyne}{#e/undyne/2}Eu senti como se não tivesse ninguém para conversar.'
                ]
                : ['<20>{#p/undyne}{#e/undyne/5}NGAHHH!\nChega de aquecimento!'],
        turnTalkA6a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/11}Rolando em dor, eu me tremia no chão...',
                    '<20>{#e/undyne/3}Esperando que alguém me ouvisse.'
                ]
                : ["<20>{#p/undyne}{#e/undyne/20}Bem... você é durona!"],
        turnTalkA6b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/11}Rolando em dor, eu me tremia no chão...',
                    '<20>{#e/undyne/3}Esperando que alguém me ouvisse.'
                ]
                : respecc()
                    ? ['<20>{#p/undyne}{#e/undyne/9}Vamos!\nMe dá uma porrada!', "<20>{#e/undyne/7}Não fica só aí parada!"]
                    : [
                        '<20>{#p/undyne}{#e/undyne/6}Piedade!\nHa!',
                        "<20>{#e/undyne/5}Eu nem posso acreditar que você quer me POUPAR!"
                    ],
        turnTalkA7a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/4}Então, eu escutei uma voz inocente.',
                    '<20>{#e/undyne/3}Chamando na distância.'
                ]
                : respecc()
                    ? ['<20>{#p/undyne}{#e/undyne/0}Não que eu esperasse menos...']
                    : ['<20>{#p/undyne}{#e/undyne/0}Mas mesmo se você puder me derrotar...'],
        turnTalkA7b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/4}Então, eu escutei uma voz inocente.',
                    '<20>{#e/undyne/3}Chamando na distância.'
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/10}Isso não é nada parecido com você!"]
                    : ['<20>{#p/undyne}{#e/undyne/3}Mas mesmo se eu TE poupar...'],
        turnTalkB1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}Depois de procurar desesperadamente por ajuda, sem sucesso...',
                    '<20>{#e/undyne/3}Uma voz inocente chamou meu nome.'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/3}Sabe...',
                        "<20>{#p/undyne}{#e/undyne/4}Mesmo que nós ainda não tenhamos escapado do Outpost ainda..."
                    ]
                    : ["<20>{#p/undyne}{#e/undyne/3}Eu estou te fazendo um favor..."],
        turnTalkB2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/2}Naquele tempo, Papyrus era só uma criança.']
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/0}Lutar faz com eu já me sinta livre!"]
                    : ['<20>{#p/undyne}{#e/undyne/1}Nenhum humano JAMAIS passou de Asgore!'],
        turnTalkB3: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/3}Maior parte das crianças fogem quando sentem perigo...', '<20>{#e/undyne/4}Mas ele não.']
                : respecc()
                    ? ['<20>{#p/undyne}{#e/undyne/4}Igual aquele anime que a Alphys me mostrou...']
                    : ['<20>{#p/undyne}{#e/undyne/4}Te matar agora é um ato de piedade...'],
        turnTalkB4: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}Tudo o que importava para ele era que alguém estava ferido.',
                    '<20>{#e/undyne/2}Alguém que ele poderia-\nNão, DEVERIA ajudar.'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/1}Não importa o quão dolorido seja estar preso aqui...',
                        "<20>{#e/undyne/0}Não vai nos impedir de fazer aquilo nós amamos!"
                    ]
                    : ['<20>{#p/undyne}{#e/undyne/6}Então PARA de ser tão resistente!'],
        turnTalkB5: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/4}Porque é assim que ele é.",
                    '<20>{#p/undyne}{#e/undyne/3}Direto ao fim.'
                ]
                : respecc()
                    ? [
                        "<20>{#p/undyne}{#e/undyne/1}... mas cara, você realmente não sabe a hora de desistir!",
                        "<20>{#e/undyne/17}Como você ficou tão forte!?"
                    ]
                    : ['<20>{#p/undyne}{#e/undyne/5}De que caramba os humanos são feitos?'],
        turnTalkB6: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/4}Apesar de toda a minha bravata, coragem e força de vontade...',
                    "<20>{#e/undyne/11}Mesmo eu não tive o necessário para ser como ele."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/5}Qualquer outro já teria DESISTIDO!"]
                    : ['<20>{#p/undyne}{#e/undyne/5}Qualquer outro já estaria MORTO!'],
        turnTalkB7a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/2}Você não matou só um amigo, ou um estudante.",
                    "<20>{#e/undyne/2}Você matou a única pessoa que te perdoaria por isso."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/3}E de novo, você teve tempo para treinar..."]
                    : ['<20>{#p/undyne}{#e/undyne/7}Você pelo menos está me escutando?'],
        turnTalkB7b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/2}Você não matou só um amigo, ou um estudante.",
                    "<20>{#e/undyne/2}Você matou a única pessoa que te perdoaria por isso."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/3}Huh? \nNão me fala que você tá desistindo de verdade..."]
                    : ["<20>{#p/undyne}{#e/undyne/8}E me poupar não vai resolver nada!"],
        turnTalkB8a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    world.trueKills > 9
                        ? '<20>{#p/undyne}{#e/undyne/11}Com ele e tantos desaparecidos...'
                        : '<20>{#p/undyne}{#e/undyne/11}Com ele morto...',
                    "<20>{#p/undyne}{#e/undyne/2}A única PIEDADE que vai ter...",
                    '<20>{#p/undyne}{#e/undyne/1}... é uma morte rápida pela ponta da MINHA espada!'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/18}Todos os outros monstros que você lutou...',
                        "<20>{#p/undyne}{#e/undyne/1}ESTA é a fonte do seu poder!"
                    ]
                    : ['<20>{#p/undyne}{#e/undyne/9}Vamos logo!'],
        turnTalkB8b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    world.trueKills > 9
                        ? '<20>{#p/undyne}{#e/undyne/11}Com ele e tantos desaparecidos...'
                        : '<20>{#p/undyne}{#e/undyne/11}Com ele morto...',
                    "<20>{#p/undyne}{#e/undyne/2}A única PIEDADE que vai ter...",
                    '<20>{#p/undyne}{#e/undyne/1}... é uma morte rápida pela ponta da MINHA espada!'
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/5}Vamos lá, eu estou te dando uma chance!"]
                    : ['<20>{#p/undyne}{#e/undyne/1}Sério.'],
        turnTalkC1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/11}Sabe de uma coisa, pirralha...',
                    "<20>{#p/undyne}{#e/undyne/2}É bem rude interromper as pessoas enquanto elas falam.",
                    ...(world.trueKills > 9
                        ? [
                            "<20>{#p/undyne}{#e/undyne/11}... \nVocê vai pagar pelo que fez com ele...",
                            "<20>{#p/undyne}{#e/undyne/2}... e todos os outros monstros que você matou."
                        ]
                        : ["<20>{#p/undyne}{#e/undyne/2}...\nVocê vai pagar pelo que fez com ele."])
                ]
                : [
                    '<20>{#p/undyne}{#e/undyne/17}Mantenha os olhos abertos para meus ataques, e talvez...',
                    "<20>{#p/undyne}{#e/undyne/5}... você será esperto o suficiente para deixá-los passar."
                ],
        turnTalkC2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/2}Sabe, Alphys me disse que humanos podem ser determinados...",
                    '<20>{#p/undyne}{#e/undyne/1}Feh. \nDeterminação não vai te levar tão longe.'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/1}Ainda de pé!?',
                        '<20>{#p/undyne}{#e/undyne/17}Ha...\nAlphys me disse que humanos podem ser determinados...'
                    ]
                    : [
                        '<20>{#p/undyne}{#e/undyne/1}Alphys me disse que humanos podem ser determinados...',
                        '<20>{#p/undyne}{#e/undyne/1}Agora eu entendo o que ela quis dizer com isso!'
                    ],
        turnTalkC3: () =>
            SAVE.data.n.state_starton_papyrus === 1 || respecc()
                ? ['<20>{#p/undyne}{#e/undyne/1}Mas sabe de uma coisa?', "<20>{#e/undyne/1}Eu sou determinada, também!"]
                : ["<20>{#p/undyne}{#e/undyne/1}Mas eu sou determinada, também!"],
        turnTalkC4: () =>
            respecc()
                ? ["<20>{#p/undyne}{#e/undyne/5}Determinada para mostrar QUEM manda!"]
                : ['<20>{#p/undyne}{#e/undyne/6}Determinada para acabar com isso AGORA!'],
        turnTalkC5: () =>
            respecc() ? ["<20>{#p/undyne}{#e/undyne/9}... QUEM É QUE MANDA!"] : ['<20>{#p/undyne}{#e/undyne/7}... AGORA MESMO!'],
        turnTalkC6: () =>
            respecc()
                ? ["<20>{#p/undyne}{#e/undyne/10}... QUEM...\n...\n... MANDA!!"]
                : ['<20>{#p/undyne}{#e/undyne/9}... AGORA...\n...\n... MESMO!!'],
        turnTalkC7: ['<20>{#p/undyne}{#e/undyne/10}Ha...\nHa...'],
        turnTalkC8: () =>
            respecc()
                ? ['<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nATAQUE FINAL!!!']
                : ['<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nMORRE LOGO, SUA RATINHA!'],
        turnTalkC9a: ["<20>{#p/undyne}{#e/undyne/5}VOCÊ TÁ NO MEU CAMINHO!"],
        turnTalkC9b: ['<20>{#p/undyne}{#e/undyne/5}EU JAMAIS IREI DESEJAR PIEDADE DE PESSOAS COMO VOCÊ!'],
        turnTalkC10a: ['<20>{#p/undyne}{#e/undyne/6}EU NÃO SEREI DERROTADA!'],
        turnTalkC10b: ['<20>{#p/undyne}{#e/undyne/6}EU VOU LUTAR COM VOCÊ ATÉ O FIM!'],
        turnTalkD: ['<20>{#p/undyne}{#e/undyne/9}...'],
        respeccTalk1: [
            '<20>{#p/undyne}{#e/undyne/11}\x00*huff...*\n\x00*huff...*',
            '<20>{#e/undyne/3}...',
            '<20>{#e/undyne/4}Bem...',
            "<20>{#e/undyne/17}Você é bem durona, hein?"
        ],
        respeccTalk2: [
            '<20>{#e/undyne/0}... heh, o suficiente para me derrotar, pelo menos.',
            "<20>{#e/undyne/13}Mas ei, isso é muito legal!",
            "<20>{#e/undyne/1}Mesmo sabendo que nem todos vão gostar de você por isso...",
            '<20>{#e/undyne/0}Ver um humano lutando com honra me dá esperança para sua raça.',
            '<20>{#e/undyne/4}...',
            "<20>{#e/undyne/3}É chato não podermos lutar mais, né?"
        ],
        respeccTalk3: [
            '<20>{#e/undyne/1}Só... seja lá o que você fizer, seja lá com quem você lutar...',
            "<20>{#e/undyne/1}Não deixe isso mudar quem você é, beleza?",
            '<20>{#e/undyne/3}...',
            '<20>{#e/undyne/4}Até a próxima...',
            '<20>{#e/undyne/4}Guerreiro.'
        ],
        death1: () =>
            respecc()
                ? [
                    '<20>{#p/undyne}Ngahhh...',
                    '<21>Eu pensei...\nQue você era diferente...',
                    '<20>Mas você...\n... você realmente...\n... urgh...',
                    '<20>...'
                ]
                : [
                    '<20>{#p/undyne}Ngahhh...',
                    '<20>Você é mais forte do que eu pensava...',
                    '<20>Então...\n... é assim...\n... que acaba...',
                    '<20>...'
                ],
        death2: () =>
            helmetdyneAttack() ? ['<20>{#p/undyne}{#e/undyne/31}...'] : ['<20>{#p/undyne}{#e/undyne/31}Não...'],
        death3: () =>
            helmetdyneAttack()
                ? ['<20>{#p/undyne}{#e/undyne/46}... não.', '<20>{#e/undyne/43}Ainda não.']
                : [
                    '<20>{#p/undyne}{#e/undyne/32}NÃO!',
                    "<20>Eu não vou morrer!",
                    ...(respecc()
                        ? ['<20>Essa traição...\nEssa... desonra...', "<20>Eu não vou deixar você se safar disso!"]
                        : [
                            SAVE.data.n.state_starton_papyrus === 1
                                ? '<20>{#e/undyne/36}Alphys...\nAsgore...'
                                : '<20>{#e/undyne/36}Alphys...\nAsgore...\nPapyrus...',
                            '<20>{#e/undyne/32}Todos estão contando comigo para protegê-los!'
                        ]),
                    '<20>{#e/undyne/32}NNNNGAH!'
                ],
        death4: () =>
            helmetdyneAttack()
                ? ["<20>{#e/undyne/45}Não enquanto você ainda respira."]
                : [
                    '<20>{#p/undyne}{#e/undyne/32}Humano!',
                    respecc()
                        ? '<20>{#e/undyne/36}Em nome da boa e justa luta...'
                        : "<20>{#e/undyne/36}No nome dos sonhos e esperanças de todos...",
                    '<20>{#e/undyne/32}EU VOU TE DERROTAR!'
                ],
        determination1: () =>
            helmetdyneAttack() ? [] : ["<20>{#p/undyne}{#e/undyne/32}Isso é tudo que você tem?"],
        determination2: () => (helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/32}... patético.']),
        determination3: () =>
            helmetdyneAttack() ? [] : ["<20>{#p/undyne}{#e/undyne/32}Você vai ter que esforçar um pouco mais que isso!"],
        determination4: () =>
            helmetdyneAttack()
                ? []
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/3}Onde está seu espírito de luta agora, huh?"]
                    : ['<20>{#p/undyne}{#e/undyne/34}V-vê como forte somos quando acreditamos em nós mesmos?'],
        determination5: () =>
            helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/35}H... heh...', '<20>{#e/undyne/34}Já está cansada?'],
        determination6: () => (helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/34}...']),
        determination7: () =>
            helmetdyneAttack() ? [] : ["<20>{#p/undyne}{#e/undyne/35}... Eu não vou...\n...\ndesistir..."],
        determination8: () => (helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/34}...']),
        death5: () => [
            helmetdyneAttack() ? '<20>{#p/undyne}{#e/undyne/43}...' : '<20>{#p/undyne}{#e/undyne/34}...',
            '<20>{#p/undyne}{#e/undyne/47}Ha...\nHa...',
            '<20>{#e/undyne/44}...\nAlphys...',
            '<20>Era isso que temia...',
            '<20>{#e/undyne/49}É por isso que eu nunca te disse...',
            '<20>...'
        ],
        death6: () => [
            '<20>{#p/undyne}{#e/undyne/44}Não...\nNão!',
            '<20>{#e/undyne/34}Ainda não!',
            "<20>{#e/undyne/48}Eu não vou morrer!"
        ],
        death7: ['<20>{*}{#p/undyne}{#i/4}{@random=1.1/1.1}NGAHHHHHHHH!!!{^10}{%}'],
        death8a: ["<20>{*}{#p/undyne}{#i/5}{#v/1}{@random=1.1/1.1}EU NÃO VOU MORRER!{^15}{%}"],
        death8b: ["<20>{*}{#p/undyne}{#i/5}{#v/2}{@random=1.1/1.1}EU NÃO VOU MORRER!{^15}{%}"],
        death8c: ["<20>{*}{#p/undyne}{#i/5}{#v/3}{@random=1.1/1.1}EU NÃO VOU MORRER!{^15}{%}"],
        death9: ["<20>{*}{#p/undyne}{#i/6}{#v/4}{@random=1.1/1.1}EU{^10} NÃO{^30}{%}"],
        deterStatus1: ['<32>{#p/story}* Undyne está sorrindo como se nada estivesse errado.'],
        deterStatus2: ["<32>{#p/story}* O corpo de Undyne está ondulando."],
        deterStatus3: ["<32>{#p/story}* O corpo de Undyne está perdendo sua forma."],
        deterStatus4: ['<32>{#p/story}* Undyne respira fundo.'],
        deterStatus5: ['<32>{#p/story}* Undyne tenta se manter de pé.'],
        challengeText1: ["<32>{#p/human}* (Você fala para Undyne que seus ataques são muito fáceis.)\n* (Ela não liga.)"],
        challengeText2: [
            '<32>{#p/human}* (Você diz a Undyne que seus ataques são muito fáceis.)',
            '<32>{#p/basic}* Suas lanças se tornam mais rápidas.'
        ],
        challengeText3: [
            '<32>{#p/human}* (Você diz a Undyne que seus ataques são muito fáceis.)',
            '<32>{#p/basic}* As lanças se tornam ridículas.'
        ],
        challengeText4: ['<32>{#p/human}* (Você diz a Undyne que ela deveria te dar uma verdadeira luta.)'],
        challengeText5: [
            '<32>{#p/human}* (Você diz a Undyne que seus ataques são muito fáceis.)',
            "<32>{#p/basic}* Undyne não consegue ser mais rápida que isso."
        ],
        challengeText7: ["<32>{#p/human}* (Você diz a Undyne que seus ataques são muito fáceis.)\n* (Ela não está prestando atenção.)"],
        pleadText1: ["<32>{#p/human}* (Você diz a Undyne que não quer lutar.)\n* (Nada acontece.)"],
        pleadText2: [
            '<32>{#p/human}* (Você diz a Undyne que só quer amizade.)',
            '<32>{#p/basic}* Undyne se lembra de alguém.\n* As lanças perdem velocidade.'
        ],
        pleadText3: ["<32>{#p/human}* (Você diz a Undyne que só quer amizade.)\n* (Ela não acredita em você.)"],
        pleadText4: ["<32>{#p/human}* (Você diz a Undyne que não quer lutar.)\n* (Ela ri.)"],
        pleadText5: ["<32>{#p/human}* (Você diz a Undyne que não quer lutar.)\n* (Ela parece confusa.)"],
        pleadText6: ["<32>{#p/human}* (Você diz a Undyne que não deseja lutar.)\n* (Ela não está prestando atenção.)"],
        pleadText7a: [
            '<32>{#p/human}* (Você diz a Undyne que só quer amizade.)',
            '<32>{#p/basic}* Undyne concorda. \n* As balas se tornam mais extremas.'
        ],
        pleadText7b: [
            '<32>{#p/human}* (Você diz a Undyne que só quer amizade.)',
            "<32>{#p/basic}* Undyne concorda. \n* As balas não podem ficar mais fortes que isso."
        ],
        pleadText7c: [
            '<32>{#p/human}* (Você diz a Undyne que só quer amizade.)',
            '<32>{#p/basic}* Undyne concorda. \n* As lanças não podem ficar mais rápidas que isso.'
        ],
        pleadText8: ["<32>{#p/human}* (Você diz a Undyne que não quer lutar.)\n* Ela respira profundamente."],
        genoCutscene1: ['<08>{#p/kidding}{#e/kidd/0}...', '<08>{#e/kidd/1}H... huh?', '<08>{|}{#e/kidd/1}O que est- {%}'],
        genoCutscene2: ['<08>{#p/kidding}{#e/kidd/3}UNDYNE!!!', '<08>{#e/kidd/4}Eu...!'],
        genoCutscene3: ['<20>{#p/undyne}{#e/undyne/1}Criança...?'],
        genoCutscene3x: [
            '<20>{#p/undyne}{#e/undyne/4}Ei, shh...',
            "<20>{#e/kidd/7}Eu vou ficar bem, carinha.",
            '<20>{#p/undyne}Só vaza daqui, beleza?'
        ],
        genoCutscene4: [
            "<08>{#p/kidding}{#e/kidd/5}Eu não pude parar...",
            '<08>{#e/kidd/6}Eles... ele...',
            '<08>{#e/kidd/7}Ele fez algo comigo...'
        ],
        genoCutscene5: ['<20>{#p/undyne}{#e/undyne/2}Seus olhos...'],
        genoCutscene6: ['<08>{#p/kidding}{#e/kidd/6}Eu...', '<08>{#p/kidding}{#e/kidd/6}Eu...'],
        genoCutscene7: ['<08>{#p/kidding}{#e/kidd/7}Eu te feri...'],
        genoCutscene8: ["<20>{#p/undyne}{#e/undyne/3}Não é nada..."],
        genoCutscene9: [
            "<20>{#e/undyne/4}Olha, eu vou dar um jeito nesses merdas.",
            "<20>Você jamais vai ter que matar alguém pra eles de novo.",
            '<20>Só vaza daqui, beleza?'
        ],
        genoCutscene10: ['<08>{#e/kidd/8}{#p/kidding}...'],
        genoCutscene11: ['<20>{#p/undyne}{#e/undyne/5}Dr. Alphys vai cuidar de você.', '<20>{#e/undyne/6}Agora vaza!'],
        genoCutscene12a: [
            '<20>{#p/undyne}{#e/undyne/7}... heh...\n\"Não é nada...\"',
            '<20>Não... de alguma forma, com apenas um golpe...'
        ],
        genoCutscene12b: ["<20>Eu já...", '<20>Eu já...'],
        genoCutscene12c: ['<20>D...\nDroga...', '<20>Papyrus...\nAsgore...\nAlphys...'],
        genoCutscene12d: ['<20>Dessa forma, eu...', "<20>{#e/undyne/8}Eu falhei com vocês."],
        genoCutscene12e: ['<20>Eu...', "{#e/undyne/8}Eu não..."],
        genoCutscene13: ['<20>{#p/undyne}...', '<11>{#e/undyne/12}Não...'],
        genoCutscene14: [
            "<20>{*}{#p/undyne}{#e/undyne/11}Meu corpo...\nSinto como se ele estivesse se dividindo em pedaços.{^15}{%15}",
            "<20>{*}Que a qualquer momento, irei me dividir em milhões de pedaços.{^15}{%15}",
            '<20>{*}Mas bem, bem fundo na minha ALMA...{^15}{%15}',
            "<20>{*}Existe uma sensação que eu não posso descrever.{^15}{%15}",
            "<20>{*}{#e/undyne/12}Um sentimento que NÃO me deixa morrer.{^15}{%15}",
            "<20>{*}{#e/undyne/11}Vocês mataram pessoas demais... muitos dos meus amigos...{^15}{%15}",
            "<20>{*}Se vocês dois passarem de mim, irão matar o restante deles.{^15}{%15}",
            "<20>{*}Os sonhos de todos.\nAs esperanças de todos.\nApagados em um instante.{^15}{%15}",
            "<20>{*}{#e/undyne/12}Mas eu NÃO vou te deixar fazer isso!{^15}{%15}",
            '<20>{*}{#e/undyne/13}Neste momento, todos na galáxia...{^15}{%15}',
            '<20>{*}Eu consigo sentir suas mentes trabalhando como uma.{^15}{%15}',
            '<20>{*}E todos temos UMA missão.{^15}{%15}',
            '<20>{*}{#e/undyne/14}MATAR VOCÊ.{^15}{%15}',
            '<20>{*}{#e/undyne/13}Humano.\nAsriel.\n... não, seja lá o que vocês dois forem.{^15}{%15}',
            '<20>{*}{#e/undyne/14}Pela bem de toda a galáxia...{^15}{%15}',
            '<20>{*}{#e/undyne/15}{@random=1.1/1.1}Eu, Undyne, vou acabar com você!{^15}{%15}'
        ],
        genoCutscene14x: [
            '<20>{#e/undyne/11}Não...',
            '<20>{#e/undyne/12}Não desse jeito...!',
            '<20>{#e/undyne/13}Todos na galáxia estão contando comigo!',
            "<20>{#e/undyne/14}Eu NÃO irei decepciona-los!"
        ],
        genoCutscene15: ["<20>{*}{#p/undyne}{#v/1}Você terá que fazer melhor do que ISSO.{%20}"],
        genoCutscene15x: ["<20>{#p/undyne}{#v/1}Você terá que fazer melhor do que isso!{%20}"],
        genoDeath1: [
            '<20>{#p/undyne}{#v/1}Droga...',
            "<20>Então até mesmo esse poder...\nNão foi o suficiente...?",
            '<20>...',
            '<20>{#e/undyne/25}Heh...',
            '<20>Heheheh...'
        ],
        genoDeath2: [
            '<20>{*}{#e/undyne/26}Se você...{^60}{%}',
            "<20>{*}Se você pensa que irei desistir, está errado.{^60}{%}",
            "<20>{*}{#e/undyne/27}Porque eu... tenho meus amigos comigo.{^60}{%}",
            '<20>{*}{#e/undyne/28}Alphys me disse que tinha um plano caso eu falhasse...{^60}{%}',
            "<20>{*}{#e/undyne/29}A essa altura, ela já falou para Asgore absorver as seis ALMAS humanas.{^60}{%}"
        ],
        genoDeath3: ['<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}E com aquele poder...{^60}{%}'],
        genoDeath4: ['<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}Este mundo viverá...!{^60}{%}'],
        lowStatus1: ['<32>{#p/story}* A luz das estrelas está brilhando...'],
        lowStatus2: ['<32>{#p/story}* Undyne balança sua lança com impaciência.'],
        lowStatus3: ['<32>{#p/story}* Fragmentos cintilantes flutuam na sua frente.'],
        lowStatus4: ['<32>{#p/story}* O vapor gira ao seu redor.'],
        lowStatus5: ['<32>{#p/story}* As lanças param por um momento.'],
        genoStatus1: ['<32>{#p/asriel2}* Como ela...'],
        genoStatus2: ['<32>{#p/asriel2}* Não...'],
        genoStatus3: ['<32>{#p/asriel2}* Mesmo nas minhas linhas do tempo, ela nunca...'],
        genoStatus4: ["<32>{#p/asriel2}* $(name), eu acho que você não vai conseguir vencer ela sozinho."],
        genoStatus5: ['<32>{#p/asriel2}* ...'],
        trueGenoStatusX: (assistValue: number) =>
            assistValue < 2
                ? ["<32>{#p/asriel2}* Vamos ver como ela lida com isso."]
                : ['<32>{#p/asriel2}* Lembre-se da nossa estratégia.'],
        trueGenoStatus1: ['<32>{#p/asriel2}* Mantenha o foco.'],
        trueGenoStatus2: ["<32>{#p/asriel2}* Não deixa ela te enganar."],
        trueGenoStatus3: ['<32>{#p/asriel2}* Só continua atacando...'],
        trueGenoStatus4: ["<32>{#p/asriel2}* Ela não vai conseguir lutar para sempre."],
        trueGenoStatus5: ['<32>{#p/asriel2}* Nossa vitória é inevitável.'],
        trueGenoStatusLow1: ['<32>{#p/asriel2}* Quase morta...!'],
        trueGenoStatusLow2: ['<32>{#p/asriel2}* Vamos, morra...!'],
        asrielExplain: () => [
            ...(battler.volatile[0].vars.azzyAssist < 2
                ? ["<20>{#p/asriel2}{#f/4}Seus ataques não vão funcionar, $(name)."]
                : [
                    "<20>{#p/asriel2}{#f/8}Você lembra o que aconteceu da última vez, não é?",
                    "<20>{#f/4}Seus ataques não vão funcionar contra ela, $(name).",
                    '<20>{#f/3}Entre antes e agora eu tive uma chance de pensar.'
                ]),
            "<20>{#f/13}Este corpo... ainda não me aceitou por completo.",
            '<20>{#f/16}Ainda assim, deve ser o suficiente para te ajudar.',
            "<20>{#f/3}Quando você atacar, irei lançar um feitiço para identificar as fraquezas da Undyne.",
            "<20>{#f/4}Depende de você acertar os ataques naqueles pontos.",
            '<20>{#f/3}Boa sorte...'
        ],
        neutralFinalStatus: ['<32>{#p/story}* Undyne parece determinada.']
    },
    b_opponent_dateundyne: {
        name: '* Undyne',
        snacker: () =>
            SAVE.data.b.undyne_respecc
                ? ['<20>{#p/undyne}{#e/undyne/13}Espero que você goste disso, fuhuhu!']
                : ['<20>{#p/undyne}{#e/undyne/12}Aproveite enquanto ainda pode.'],
        intro: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#p/undyne}{#f/0}... então é isso.',
                    '<20>Nossa batalha final.',
                    '<20>...',
                    '<20>{#e/undyne/12}Guerreiro contra guerreiro.',
                    '<20>Lutando entre as estrelas do céu.',
                    '<20>Eu te desafio para um duelo...',
                    '<20>{#e/undyne/9}Pela honra de TODOS NO OUTPOST!!',
                    "<20>{#e/undyne/7}É A ÚNICA FORMA QUE EU POSSO EMPATAR AS COISAS ENTRE A GENTE!!",
                    "<20>{#e/undyne/9}ENTÃO VAI LÁ, ME ACERTA COM TUDO QUE TEM!!!\nNGAHHHH!!!"
                ]
                : [
                    "<20>{#p/undyne}{#f/0}Eu fui derrotada, minha casa está em ruínas...",
                    '<20>Eu até falhei em ser sua amiga.',
                    '<20>...',
                    "<20>{#e/undyne/12}É isso.",
                    "<20>Eu não me importo mais se você é minha convidada.",
                    '<20>{#e/undyne/9}Mais uma batalha final, tudo entregue dos dois lados!!',
                    "<20>{#e/undyne/7}É ÚNICA FORMA QUE EU POSSO RECUPERAR MINHA HONRA PERDIDA!!",
                    "<20>{#e/undyne/9}AGORA VAMOS LÁ, ME ACERTA COM TUDO O QUE VOCÊ TEM!!\nNGAHHHH!!!"
                ],
        status1: ['<32>{#p/story}* Undyne está te deixando atacar primeiro.'],
        act_check: ['<32>{#p/story}* UNDYNE - ATQ 41 DEF 21\n* A real, VERDADEIRA batalha final realmente começou!'],
        idleTalk1: ["<20>{#p/undyne}{#e/undyne/9}Me mostra do que você é feita!"],
        idleTalk2: ['<20>{#p/undyne}{#e/undyne/9}Vamos logo!'],
        idleTalk3: ["<20>{#p/undyne}{#e/undyne/9}Qual o problema? Assustada?"],
        idleTalk4: ["<20>{#p/undyne}{#e/undyne/9}Por que está se segurando?"],
        fightTalk: (stronk: boolean) =>
            SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#p/undyne}{#e/undyne/19}Ouch.',
                    '<20>{#e/undyne/19}Isso, doeu pra caramba.',
                    '<20>{#e/undyne/4}Heh...',
                    "<20>{#e/undyne/3}Acho que é isso que ganho por subestimar meu oponente.",
                    "<20>{#e/undyne/0}Mas, eu não sei o porque estou tão surpresa.",
                    '<20>{#e/undyne/1}Dado seu estilo de batalha.'
                ]
                : [
                    '<20>{#p/undyne}{#e/undyne/16}Que.',
                    "<20>{#e/undyne/15}Isso é o melhor que você pode fazer...?",
                    ...(SAVE.data.b.oops
                        ? [
                            '<20>{#e/undyne/3}Mesmo atacando com toda sua força...',
                            stronk
                                ? "<20>{#e/undyne/33}Você não consegue me causar mais do que um arranhão, huh?"
                                : "<20>{#e/undyne/33}Você simplesmente não consegue reunir nenhuma intenção de me machucar, hein?"
                        ]
                        : ["<20>{#e/undyne/17}Você nem me acertou!", '<20>{#e/undyne/17}...'])
                ],
        flirtTalk0: [
            '<20>{#p/undyne}{#e/undyne/12}Quando eu te disse para me acertar...',
            '<20>{#e/undyne/9}EU DISSE LITERALMENTE!'
        ],
        flirtTalk1: [
            '<20>{#p/undyne}{#e/undyne/6}Qu-... não!',
            "<20>{#e/undyne/8}Se alguém aqui tem meu coração é a...",
            '<20>{#e/undyne/5}Espera, não-\nCala a boca!!'
        ],
        flirtTalk2: [
            '<20>{#p/undyne}{#e/undyne/10}Da pra parar com isso!?',
            "<20>{#e/undyne/15}Se você continuar assim, eu vou...",
            "<20>{#e/undyne/16}Eu vou..."
        ],
        flirtTalk3: [
            '<20>{#p/undyne}{#p/undyne}{#e/undyne/18}Que-...\nEu...!',
            '<20>{#e/undyne/19}...',
            '<20>{#e/undyne/10}AHHHHHHHHHHHHHH-\nSUA PIRRALHA FLERTANTE!',
            '<20>{#e/undyne/8}EU TENHO METADE DA CORAGEM DE...',
            '<20>{#e/undyne/7}DE...',
            '<20>{#e/undyne/7}...'
        ],
        flirtStatus0: ['<33>{#p/story}* Neste caso, LUTAR talvez não seja uma má ideia.'],
        flirtStatus1: ['<33>{#p/story}* Algo mágico está acontecendo.'],
        flirtStatus2: ['<32>{#p/story}* Undyne está no limite.'],
        flirtText0: ['<32>{#p/human}* (Você flerta com a Undyne.)'],
        flirtText1: ["<32>{#p/human}* (Você diz a Undyne que ela tem seu coração de gancho, linha e chumbada.)"],
        flirtText2: ["<32>{#p/human}* (Você elogia Undyne por seu espírito corajoso e lutador.)\n* (Ela é SUA heroína, agora.)"],
        flirtText3: ["<32>{#p/human}* (Você diz a Undyne que ela é uma peixe preciosa e adorável.)"],
        cutscene1: ['<20>{#p/undyne}{#e/undyne/4}Heh... sabe de uma coisa?'],
        cutscene2: (fought: boolean) => [
            ...(SAVE.data.b.undyne_respecc
                ? [
                    "<20>{#e/undyne/11}Eu não quero mais te machucar.",
                    '<20>{#e/undyne/11}De primeira, eu estava super animada para lutar com você...'
                ]
                : [
                    "<20>{#e/undyne/11}Eu não quero te machucar também.",
                    '<20>{#e/undyne/11}No começo, eu desprezava seu estúpido jeito pegajoso, mas...'
                ]),
            ...(fought
                ? SAVE.data.b.undyne_respecc
                    ? ['<20>{#e/undyne/3}Mas te vendo dar tudo de si comigo agora, é...']
                    : SAVE.data.b.oops
                        ? ['<20>{#e/undyne/3}O jeito que você me acerto agora, é...']
                        : ['<20>{#e/undyne/3}O jeito que você errou seu ataque agora, é...']
                : SAVE.data.b.undyne_respecc
                    ? ['<20>{#e/undyne/3}Mas vendo você agir desse jeito comigo...']
                    : ['<20>{#e/undyne/3}A forma como você agiu comigo agora...']),
            '<20>{#e/undyne/4}Me fez lembrar de alguém com quem eu costumava treinar.',
            ...(SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#e/undyne/11}... você pode não ser um perdedor fraco como ele.',
                    '<20>{#e/undyne/11}Mas vocês dois tem uma coisa em comum...',
                    '<20>{#e/undyne/1}É um sentimento de respeito pelo que significa lutar.'
                ]
                : [
                    "<20>{#e/undyne/11}Agora eu sei que você não é só um perdedor.",
                    "<20>{#e/undyne/13}Você é um perdedor com um coração bem grande!",
                    '<20>{#e/undyne/4}Igual a ele...'
                ]),
            '<20>{#e/undyne/3}...',
            '<20>{#e/undyne/3}Escuta, humano.',
            '<20>{#f/undyne/0}Parece que você e o Asgore estão destinados a se encontrar.',
            SAVE.data.b.undyne_respecc ? '<20>{#e/undyne/3}Diferente de você...' : '<20>{#e/undyne/3}Conhecendo ele...',
            "<20>{#e/undyne/4}Ele provavelmente não vai querer lutar com você.",
            ...(SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#e/undyne/0}Converse com ele, se quiser.',
                    '<20>{#e/undyne/0}Diga para ele o que você sente e o que quer.',
                    '<20>{#e/undyne/3}Eu sei que pode ser meio estranho pra você, mas...',
                    "<20>{#e/undyne/4}Eu sei que vocês dois vão conseguir pensar em algo.",
                    '<20>{#e/undyne/0}E sobre a nossa liberdade?',
                    '<20>{#e/undyne/1}Bem.',
                    '<20>{#e/undyne/3}Se algum outro humano menos legal acabar aparecendo aqui...',
                    "<20>{#e/undyne/3}Eu vou tomar a ALMA dele no lugar da sua."
                ]
                : [
                    '<20>{#f/undyne/0}Fale com ele.',
                    "<20>{#f/undyne/1}Eu sei que vocês dois vão poder entrar em acordo.",
                    '<20>{#e/undyne/3}Eventualmente, algum humano mais malvado vai cair aqui...',
                    "<20>{#e/undyne/3}E eu vou tomar a ALMA dele no lugar da sua."
                ]),
            '<20>{#f/undyne/1}Faz sentido, né?\nFuhuhu.',
            '<20>{#f/undyne/0}Oh, e se você machucar Asgore...',
            "<20>{#e/undyne/11}Eu vou pegar as ALMAS humanas... cruzar o escudo de força...",
            ...(SAVE.data.b.undyne_respecc
                ? ['<20>{#e/undyne/8}E te caçar até o fim do universo!', "<20>{#e/undyne/13}É isso que guerreiros fazem, certo?"]
                : [
                    '<20>{#e/undyne/8}E te dar uma surra até a morte!',
                    "<20>{#e/undyne/13}É assim que amigos fazem, certo?"
                ]),
            '<20>{#e/undyne/13}Fuhuhu!',
            "<20>{#e/undyne/13}Agora vamos vazar dessa casa pegando fogo!"
        ]
    },

    i_artifact: {
        battle: {
            description: 'Diz-se que este pingente foi usado pelo próprio Erogot.',
            name: 'Artefato'
        },
        drop: () => [
            '<32>{#p/human}* (Você jogou fora o artefato lendário.)',
            ...(!SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

                ? SAVE.data.b.s_state_papsink
                    ? ['<32>{#p/basic}* O cachorro dança ainda mais!']
                    : ["<32>{#p/basic}* ... O suspiro do cachorro se acalma, mesmo que você não saiba."]
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Inscrito com a assinatura de um ex-líder mundial.)']
                : ['<32>{#p/basic}* Diz-se que pingente foi usado pelo próprio Erogot.'],
        name: 'Artefato Lendário',
        use: () => [
            '<32>{#p/human}* (Você usou o Artefato Lendário.)',
            ...((battler.active && battler.alive[0].opponent.metadata.reactArtifact) ||
                (game.room === 'f_truth' && // NO-TRANSLATE

                    SAVE.data.n.epiphany < 1 &&
                    !SAVE.data.b.svr &&
                    !world.runaway)
                ? []
                : !SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

                    ? SAVE.data.b.s_state_papsink
                        ? ["<32>{#p/basic}* ... A dança do cachorro diminui, mesmo que você não saiba."]
                        : ['<32>{#p/basic}* O cachorro chora mais alto!']
                    : ['<32>{#p/human}* (Nada acontece.)'])
        ]
    },
    i_epiphany: {
        battle: {
            description: 'Faz com que os fracos de vontade vejam as coisas do seu ponto de vista.',
            name: 'Epifania'
        },
        drop: ['<32>{#p/human}* (Você joga fora a Epifania.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Um tomo de séculos passados, usado pela primeira vez por um ex-líder mundial.)']
                : [
                    '<33>{#p/basic}* Faz com que os fracos de vontade vejam as coisas do seu ponto de vista.\n* Não é viável fora da batalha.'
                ],
        name: 'A Epifania',
        use: () =>
            battler.active
                ? []
                : SAVE.data.b.ufokinwotm8
                    ? [
                        '<32>{#p/human}* (Você ativa a Epifania em si mesmo, com a intenção de abraçar.)',
                        '<32>{#p/human}* (Sem efeito.)'
                    ]
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Você lê os textos ancestrais do tomo.)',
                            '<33>* (O texto parece estar se auto traduzindo.)'
                        ]
                        : ['<32>{#p/human}* (Você ativa a Epifania.)', '<32>{#p/human}* (Sem efeito fora de batalha.)']
    },
    i_astrofood: {
        battle: {
            description: 'Não para os fracos de dente.',
            name: 'Alcaçuz'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Alcaçuz.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (24 HP.)']
                : ['<32>{#p/basic}* \"Alcaçuz\" cura 24 HP\n* Não para os fracos de dente.'],
        name: 'Alcaçuz',
        use: ['<32>{#p/human}* (Você roeu o alcaçuz.)']
    },
    i_sap: {
        battle: {
            description: "Recurso de uma árvore que crescia no planeta natal dos monstros.",
            name: 'Seiva'
        },
        drop: ['<32>{#p/human}* (Você joga fora a seiva da árvore.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (35 HP.)']
                : ['<32>{#p/basic}* \"Seiva da Árvore\" cura 35 HP\n* Recurso de uma árvore que crescia no planeta dos monstros.'],
        name: 'Seiva de Árvore',
        use: ['<32>{#p/human}* (Você engole a Seiva de Árvore.)']
    },
    i_goggles: {
        battle: {
            description: 'Expandiu sua realidade!\nTe faz invencível por mais tempo.',
            name: 'Headset'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Headset.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (6 DF.)']
                : ['<32>{#p/basic}* \"Headset\" (6 DF) \n* Expande sua realidade! Te deixa invencível por mais tempo.'],
        name: 'Headset',
        use: ['<32>{#p/human}* (Você coloca o Headset.)']
    },
    i_goggles_x: {
        battle: {
            description: 'Te faz invencível por um pouco mais de tempo.',
            name: 'Headset?'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Headset.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (4 DF.)']
                : ['<32>{#p/basic}* \"Headset?\" (4 DF)\n* Expande sua realidade! Torna você invencível um pouco mais.'],
        name: 'Headset?',
        use: ['<32>{#p/human}* (Você coloca o Headset.)']
    },
    i_padd: {
        battle: {
            description: 'Um diário digital.\nTe deixa invencível.',
            name: 'Datapad'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Datapad.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (2 AT.)']
                : ['<32>{#p/basic}* \"Datapad\" (2 AT) \n* Um diário digital.\n* Te deixa invencível.'],
        name: 'Datapad',
        use: ['<32>{#p/human}* (Você equipa o Datapad.)']
    },
    i_padd_x: {
        battle: {
            description: 'Te faz invencível por um pouco mais de tempo.',
            name: 'Datapad?'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Datapad.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (0 AT.)']
                : ['<32>{#p/basic}* \"Datapad?\" (0 AT)\n* Te deixa invencível por pouco tempo.'],
        name: 'Datapad?',
        use: ['<32>{#p/human}* (Você equipa o Datapad.)']
    },
    i_punchcard: {
        battle: {
            description: 'Uma paisagem pitoresca...',
            name: 'Cartão Postal'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Cartão Postal.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Um pedaço ordinário de papel perfeito, sem atributos notáveis.)']
                : ['<32>{#p/basic}* Uma paisagem pitoresca...'],
        name: 'Cartão Postal',
        use: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* (Você rasga o Cartão Postal.)',
                    battler.active
                        ? `<32>{#p/story}* ATAQUE aumentado em ${2 + battler.at_bonus}!`
                        : '<32>{#p/human}* (Sem efeito fora de batalha.)'
                ]
                : battler.active
                    ? ['<32>{#p/human}* (Você sonha acordado com a paisagem no cartão postal.)\n* (Nada acontece.)']
                    : []
    },
    i_quiche: {
        battle: {
            description: 'Com grandes confecções vem grandes doceabilidades.',
            name: 'Cheesecake'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora o Cheesecake.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ['<32>{#p/basic}* E o ciclo de abandono continua.']),
            ...(!battler.active &&
                (instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                    (fetchCharacters()
                        .find(c => c.key === 'sans') // NO-TRANSLATE

                        ?.position.extentOf(player) ?? 240) < 240)
                ? [
                    "<25>{#p/sans}{#f/3}* ... oh.\n* que lástima.",
                    "<25>{#p/sans}{#f/2}* eu esperava que alguém cuidasse disso pra mim."
                ]
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (45 HP.)']
                : ['<32>{#p/basic}* \"Cheesecake\" Cura 45 HP\n* Com grandes confecções vem grandes doceabilidades.'],
        name: 'Cheesecake',
        use: () => [
            '<32>{#p/human}* (Você come o Cheesecake.)',
            ...(!battler.active &&
                (instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                    (fetchCharacters()
                        .find(c => c.key === 'sans') // NO-TRANSLATE

                        ?.position.extentOf(player) ?? 240) < 240)
                ? [
                    '<25>{#p/sans}{#f/0}* ... oh.\n* você comeu?',
                    '<25>{#p/sans}{#f/2}* não fazia ideia que alguém gostava do jeito que eu cozinho.'
                ]
                : [])
        ]
    },
    i_crisp: {
        battle: {
            description: 'Um saco de batatinhas lá das estrelas.',
            name: 'Chisps'
        },
        drop: ['<32>{#p/human}* (Você jogou fora as Batatas Cósmicas.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (18 HP.)']
                : ['<32>{#p/basic}* \"Batatas Cósmicas\" Cura 18 HP\n* Um saco de batatinhas lá das estrelas.'],
        name: 'Batatas Cósmicas',
        use: ['<32>{#p/human}* (Você come as Batatas Cósmicas.)']
    },
    i_rations: {
        battle: {
            description: 'Rações padrão.\nÓtimo para emergências.',
            name: 'Ração'
        },
        drop: ['<32>{#p/human}* (Você joga fora as Rações.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (30 HP.)']
                : ['<32>{#p/basic}* \"Rações\" Cura 30 HP\n* Rações padrão.\n* Ótimo para emergências.'],
        name: 'Ração',
        use: ['<32>{#p/human}* (Você consome as Rações.)']
    },
    i_tea: {
        battle: {
            description: 'Aumenta sua VELOCIDADE em batalha.',
            name: 'Chá'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Chá Nebuloso.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : [
                    '<33>{#p/basic}* \"Chá Nebuloso\" Cura 15 HP\n* Aumenta sua VELOCIDADE durante a batalha.\n* Sem valor fora de batalha.'
                ],
        name: 'Chá Nebuloso',
        use: () => [
            '<32>{#p/human}* (Você toma o Chá Nebuloso.)',
            battler.active ? '<32>{#p/story}* VELOCIDADE aumenta por 1!' : '<32>{#p/human}* (Sem efeito fora de batalha.)'
        ]
    },
    i_tzn: {
        battle: {
            description: 'Como Tofu da Terra, mas espacial.',
            name: 'Tofu'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Tofu Espacial.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (17 HP.)']
                : ['<32>{#p/basic}* \"Tofu Espacial\" Cura 17 HP\n* Como o da Terra, mas espacial.'],
        name: 'Tofu Espacial',
        use: () => [
            '<32>{#p/human}* (Você ingere o Tofu Espacial.)',
            ...(world.meanie
                ? [
                    '<32>* (O gosto dele te trás um certo sentimento...)',
                    battler.active
                        ? `<32>{#p/story}* ATAQUE sobe por ${4 + battler.at_bonus}!`
                        : '<32>{#p/human}* (Sem efeito fora de batalha.)'
                ]
                : [])
        ]
    },
    i_flakes: {
        battle: {
            description: 'Finalmente, um café da manhã descente.',
            name: 'Cereais Tem'
        },
        drop: ['<32>{#p/human}* (Você descarta os Cereais Temmie.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (2 HP.)']
                : ['<32>{#p/basic}* \"Cereais Temmie\" Cura 2 HP\n* Finalmente, um café da manhã bem feito.'],
        name: 'Cereais Temmie',
        use: ['<32>{#p/human}* (Você comeu os Cereais Temmie.)']
    },
    i_temyarmor: {
        battle: {
            description: 'As coisas que você consegue fazer com edução escolar!',
            name: 'Armadura Tem'
        },
        drop: ['<32>{#p/human}* (Você jogou fora a Armadura Tem.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 AT, 20 DF.)']
                : [
                    '<32>{#p/basic}* \"Armadura Tem\" (10 AT, 20 DF)\n* As coisas que você consegue fazer com a educação escolar!',
                    '<32>* Te faz invencível por um bom tempo...',
                    '<32>* Recupera bastante HP a cada turno...',
                    "<32>* Certos ataques tem certa chance de te curar...",
                    '<32>* Aumenta significativamente o tempo de mira na batalha...',
                    '<32>* Faz tudo que outros itens possam fazer, mas melhor.'
                ],
        name: 'Armadura Temmie',
        use: ['<32>{#p/human}* (Você veste a Armadura Temmie.)']
    },
    i_boots: {
        battle: {
            description: 'Ágil, mas inconstante. Não é um substituto adequado para o jetpack.',
            name: 'Botas'
        },
        drop: ['<32>{#p/human}* (Você joga fora as Hoverboots.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (7 AT.)']
                : ['<32>{#p/basic}* \"Hoverboots\" (7 AT)\n* Ágil, mas inconstante. Não é um substituto adequado para o jetpack.'],
        name: 'Hoverboots',
        use: ['<32>{#p/human}* (Você equipa as Hoverboots.)']
    },
    i_flight_suit: {
        battle: {
            description: 'Não é para os fracos de coração.',
            name: 'Roupa de Vôo'
        },
        drop: ['<32>{#p/human}* (Você joga fora a Roupa de Vôo.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 DF.)']
                : ['<32>{#p/basic}* \"Roupa de Vôo\" (10 DF)\n* Não é para os fracos de coração.'],
        name: 'Roupa de Vôo',
        use: ['<32>{#p/human}* (Você põe a Roupa de Vôo.)']
    },
    i_snack: {
        battle: {
            description: "Receita pessoal da Undyne...?",
            name: 'Lanche Velho'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora o Lanche Velho.)',
            ...(game.room === 'f_kitchen' // NO-TRANSLATE

                ? ((SAVE.data.b.drop_snack = true),
                    ['<25>{#p/undyne}{#f/8}* Fuhuhuhu! \n* Você joga fora o lanche no chão duro!'])
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : ['<32>{#p/basic}* \"Lanche Velho\" Cura 15 HP\n* Receita Pessoal da Undyne...?'],
        name: 'Lanche Velho',
        use: () => [
            '<32>{#p/human}* (Você come o Lanche Velho.)',
            ...(game.room === 'f_kitchen' // NO-TRANSLATE

                ? [
                    SAVE.data.b.undyne_respecc
                        ? '<25>{#p/undyne}{#f/1}* Espero que você goste!'
                        : '<25>{#p/undyne}{#f/14}* Espero que você goste!'
                ]
                : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* Crocante.'])
        ]
    },

    n_shop_tem: {
        exit: ['<32>{#p/tem}{#k/0}* bOI!!'],
        item: (armorprice: number) =>
            SAVE.data.n.plot === 72
                ? [
                    '0G - Cereal Grátis!!',
                    '0G - Cereal Grátis!!',
                    '0G - Cereal Grátis!!',
                    SAVE.data.b.item_temyarmor || temgone()
                        ? '§fill=#808080§--- ESGOTADO ---'
                        : SAVE.data.b.colleg
                            ? `${armorprice}G - Armadura Tem!!`
                            : '1000G - pagar colégio Tem',
                    'Sair'
                ]
                : temgone()
                    ? [
                        '0G - Cereal tem',
                        '0G - cereal tem (A VENDA)',
                        '0G - cereal tem (caro)',
                        '§fill=#808080§--- ESGOTADO ---',
                        'Sair'
                    ]
                    : [
                        '4G - cereal tem',
                        '2G - cereal tem (A VENDA)',
                        '20G - cereal tem (caro)',
                        SAVE.data.b.item_temyarmor
                            ? '§fill=#808080§--- ESGOTADO ---'
                            : SAVE.data.b.colleg
                                ? `${armorprice}G - Armadura Tem!!`
                                : '1000G - pagar colégio Tem',
                        'Sair'
                    ],
        itemInfo: () =>
            SAVE.data.n.plot === 72
                ? [
                    'Cura 2HP\nComida free\nda tem!!',
                    'Cura 2HP\nComida free\nda tem!!',
                    'Cura 2HP\nComida free\nda tem!!',
                    SAVE.data.b.colleg ? 'Armadura: 20DF\nFaz\nBatalha\nFacinho!!!' : 'Pagar \nCOLEGIAL\nCaro\nTem'
                ]
                : [
                    'Cura 2HP\nComida\ntem',
                    'Cura 2HP\nDESCONTO \nCOMIDA\nTEM!!!',
                    'Cura 2HP\nComida\ntem\n(Cara)',
                    SAVE.data.b.colleg ? 'Armadura: 20DF\nFaz\nBatalha\nFacinho!!!' : 'Pagar \nCOLEGIAL\nCaro\nTem'
                ],
        itemPrompt: '<09>{#p/tem}{#k/0}hOI!\nbem vind ao\nMERCADO TEM!',
        itemPurchase: [
            '<09>{#p/tem}{#k/6}obrigado pela COMPRA!',
            '<09>{#p/tem}{#k/0}fdshfg',
            '<09>{#p/tem}{#k/2}você tem munitos mangos,',
            "<10>{#p/human}(Você está carregando demais.)"
        ],
        itemPurchasePrompt: (free: boolean) =>
            free ? 'Comprar de GRAÇA?' : temgone() ? 'Pegar?' : 'Comprar por\n$(x)G?',
        itemSellPrompt: 'Vender por\n$(x)G?',
        itemUnavailable: () => (temgone() ? '<09>{#p/basic}Nada sobrando.' : '<09>{#p/tem}{#k/2}sem mais item...'),
        itemRestricted: '<09>{#p/tem}{#k/2}não está a venda...',
        menu: () =>
            temgone() ? ['Tomar', 'Roubar', 'Ler', 'Sair'] : ['Comprar', world.meanie ? 'Roubar' : 'Vender', 'Conversar', 'Sair'],
        menuPrompt1: '<23>{#p/tem}{#k/0}* hOI!\n* bem vind ao...\n* MERCADO TEM!!',
        menuPrompt2: '<23>{#p/basic}* ... mas todo mundo fugiu.',
        sell1: ['<30>{#p/tem}{#k/2}* NUUU!!!\n* meus mangos,,,', '<30>{#p/tem}{#k/4}* sem ROUBAR!!!'],
        sell2: ['<30>{#p/tem}{#k/3}* Não.'],
        steal1: ['<30>{#p/human}* (Você pegou 32767G de trás do balcão.)'],
        steal2: ['<30>{#p/basic}* Nada sobrando.'],
        note: ['<30>{#p/human}* (Mas não tem nota alguma para ser encontrada aqui.)'],
        talk: () => [
            SAVE.data.n.plot === 72 ? 'Boas Notícias' : 'Diga Olá',
            SAVE.data.n.plot === 72 ? 'Seu Futuro' : SAVE.data.b.colleg ? 'Sobre Armadura Temmie' : 'Sobre você',
            SAVE.data.n.plot === 72 ? 'Segredos Temmie' : 'História Temmie',
            'Sobre Mercado',
            'Sair'
        ],
        talkPrompt: '<09>{#p/tem}{#k/0}HOI!!!\nsou temmie',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#k/0}* yAYA!', '<32>{#p/tem}{#k/0}* tem vai para NOVO MUNDO!!!']
                    : ['<32>{#p/tem}{#k/0}* hOI!!!', "<32>* eu sou temmie"],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#k/0}* yAYA!', '<32>{#p/tem}{#k/0}* tem vai para NOVO MUNDO!!!']
                    : SAVE.data.b.colleg
                        ? [
                            '<32>{#k/1}* tem armadura então BOOOAS!\n* Qualquer batalha torn!\n* vitórias FÁCEIS!!!',
                            '<32>{#k/4}* mas, hmmm, tem pensa...\n* Se usar armadura, batalhas não ser desafios de verda,',
                            '<32>{#k/3}* mas tem...\n* Tenha um solushun',
                            '<32>{#k/6}* tem vai oferecer...\n* um {@fill=#ff0}SKOLARSHIP{@fill=#fff}',
                            '<32>{#k/3}* se tu {@fill=#ff0}perder batalhas demais,{@fill=#fff} tem vai {@fill=#ff0}ABAIXAR PREÇO {@fill=#fff}!',
                            ...(armorprice() <= 1000
                                ? [
                                    '<32>{#k/1}* na verda...\n* PREÇOS JÁ DEVEM ESTAR BAIXOS!!!\n* WOA!!!!',
                                    '<32>{#k/6}* Congra-tem-lações!'
                                ]
                                : [
                                    '<32>{#k/3}* se cair em batalha BATALHA FRUSTANTE, pode comprar armadura TEM último recurso!',
                                    '<32>{#k/5}* mas tem armadura para bens,\n* prometa comprar apenas se realmente precisar,'
                                ])
                        ]
                        : ['<32>{#p/tem}{#k/0}* hOI!!!', "<32>* eu sou temmie"],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/tem}{#k/0}* na parte de trás da estátua famus, pode encontrar INTERRUPTOR ESPECIAL,',
                        '<32>{#p/tem}{#k/0}* e INTERRUPTORES...\n* VEM COM ENIGMAS!',
                        SAVE.data.b.colleg
                            ? '<32>{#p/tem}{#k/2}* mesmo após colégio, tem não sabe o que significa,,,'
                            : '<32>{#p/tem}{#k/0}* tem não sabe o que significa,,,',
                        '<32>{#p/tem}{#k/1}* mas talve humano pode resolver!!\n* yAYA!!'
                    ]
                    : SAVE.data.b.colleg
                        ? [
                            "<32>{#p/tem}{#k/0}* yaYA!!!\n* tem possui ESTUDOS!\n* tem pode contar tudo sobre o passado TEM!!!"
                        ]
                        : ['<32>{#p/tem}{#k/0}* nós tem tem passado PROFUNDO!!!'],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#k/0}* yaYA!!!\n* fecharemos o mercado logo!!!']
                    : ['<32>{#p/tem}{#k/0}* yaYA!!!\n* vem pra MERCADO TEM!!!']
        ],
        colleg1: [
            '<32>{#p/tem}{#k/1}* WOA!!',
            '<32>{#k/2}* isso ser muitos mangos...\n* tem deseja...',
            '<32>{#k/6}* OKs!!!!\n* tem vai pra colégio te dar orgulho!'
        ],
        colleg2: [
            '<32>{#p/tem}* tem voltou do co legio,',
            '<32>{#k/0}* tem aprendido MUITOS COISAs,\n* aprende a vender o ÍTEM novo!\n* yayA!!!'
        ],
        sellExit: 'Sair',
        sellValue: '$(x)G',
        sellStory1: () => [
            '<32>{#p/tem}{#k/1}* WOA!!',
            '<32>{#k/2}* vc tein... $(x)s!!!',
            SAVE.data.b.colleg
                ? '<32>{#k/4}* hnnn....\n* eu preciso dê $(x)s...\n* pagar por colégio,'
                : '<32>{#k/4}* hnnn....\n* tem precisa dê $(x)s...\n* precisa pagar por colégio,',
            '<32>{#k/5}* hnnnn....!!!\n* tem sempre quer $(x)s...!'
        ],
        sellStory2: ['<32>{#p/tem}{#k/2}* m... mas...', '<32>{#k/4}* p!!!!!!!!!!!!'],
        sellStory3: () =>
            SAVE.data.b.colleg
                ? [
                    "<32>{#p/tem}{#k/3}* Isso é uma piada?\n* Você está rindo?\n* Ha ha, muito engraçado.\n* Eu sou quem tem diploma aqui."
                ]
                : ["<32>{#p/tem}{#k/3}* Você vai se arrepender disso."],
        zeroPrompt: '<09>{#p/basic}...'
    },
    n_shop_tortoise: {
        exit: () =>
            world.runaway
                ? []
                : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                    ? ['<32>{#p/basic}{#k/1}* Boa tentativa.']
                    : ['<32>{#p/basic}{#k/0}* Cuidado aí fora, criança!'],
        item: () =>
            world.runaway
                ? ['0G - Datapad?', '0G - Headset?', '0G - Chá Nebuloso', '0G - Seiva de Árvore', 'Sair']
                : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                    ? ['45G - Datapad?', '45G - Headset?', '16G - Chá Nebuloso', '25G - Seiva de Árvore', 'Sair']
                    : SAVE.data.n.plot === 72
                        ? [
                            SAVE.data.b.item_padd ? '25G - Datapad?' : '35G - Datapad',
                            SAVE.data.b.item_goggles ? '25G - Headset?' : '35G - Headset',
                            '5G - Chá Nebuloso',
                            '5G - Seiva de Árvore',
                            'Sair'
                        ]
                        : [
                            SAVE.data.b.item_padd ? '45G - Datapad?' : '55G - Datapad',
                            SAVE.data.b.item_goggles ? '45G - Headset?' : '55G - Headset',
                            '16G - Chá Nebuloso',
                            '25G - Seiva de Árvore',
                            'Sair'
                        ],
        itemInfo: () => [
            SAVE.data.b.item_padd ||
                world.genocide ||
                world.killed0 ||
                startonATE() ||
                SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? 'Weapon: 0AT\n($(x) AT)\nApenas um pouco\nInvencível.'
                : 'Weapon: 2AT\n($(x) AT)\nBem\nInvencível.',
            SAVE.data.b.item_goggles ||
                world.genocide ||
                world.killed0 ||
                startonATE() ||
                SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? 'Armor: 4DF\n($(x) DF)\nUm pouco\nInvencível.'
                : 'Armor: 6DF\n($(x) DF)\nBem\nInvencível.',
            'Cura 15HP\nVELOCIDADE\naumenta em\nbatalha.',
            'Cura 35HP\nFeito da\nárvore\nreal.'
        ],
        itemPrompt: () =>
            world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? "<09>{#p/basic}{#k/3}Não espere desconto."
                : "<09>{#p/basic}{#k/4}O que você tá olhando?",
        itemPurchase: () =>
            world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? [
                    '<09>{#p/basic}{#k/1}Aqui estamos nós.',
                    '<09>{#p/basic}{#k/1}...',
                    "<09>{#p/basic}{#k/3}Eh?\nNão pode pagar por isso?",
                    "<10>{#p/human}(Você está carregando demais.)"
                ]
                : [
                    '<09>{#p/basic}{#k/0}Obrigado!\nWa ha ha.',
                    '<09>{#p/basic}{#k/2}Cuidado com isso.',
                    "<09>{#p/basic}{#k/4}Você tá meio sem dinheiro.",
                    "<10>{#p/human}(Você está carregando demais.)"
                ],
        itemPurchasePrompt: () => (world.runaway ? 'Pegar?' : 'Comprar por\n$(x)G?'),
        menu: () =>
            world.runaway ? ['Tomar', 'Roubar', 'Ler', 'Sair'] : ['Comprar', world.meanie ? 'Roubar' : 'Vender', 'Conversar', 'Sair'],
        menuPrompt1: () =>
            SAVE.data.n.plot === 72
                ? '<23>{#p/basic}{#k/0}* Wa ha ha!\n* Eu sabia que você conseguiria!'
                : "<23>{#p/basic}{#k/0}* Uau!\n* Tenho algumas coisas legais à venda.",
        menuPrompt2: () =>
            SAVE.data.n.plot === 72 ? '<23>{#p/basic}{#k/0}* Wa ha ha.' : "<23>{#p/basic}{#k/0}* Não fique tímido agora.",
        menuPrompt3: () =>
            world.genocide
                ? "<23>{#p/basic}{#k/3}* O que vocês estão fazendo agora?\n* Espera, não me fala.\n* Não é da minha conta, certo?"
                : '<24>{#p/basic}{#k/2}* Wa ha ha...\n* Você veio me ver.\n* Que sorte a minha!',
        menuPrompt4: '<23>{#p/basic}* ... mas todo mundo fugiu.',
        note: ['<32>{#p/human}* (Mas não tinha nada para você ler aqui.)'],
        sell1: () =>
            world.runaway
                ? ['<30>{#p/human}* (Você pegou 1394G de trás do balcão.)']
                : world.genocide
                    ? [
                        '<30>{#p/basic}{#k/4}* Wah ha ha...',
                        '<30>{#k/3}* Vocês vai roubar meus bens da mesma forma que roubaram suas ALMAS?',
                        "<30>{#k/4}* Se eu fosse você, apreciaria o que já tenho."
                    ]
                    : world.meanie
                        ? [
                            "<30>{#p/basic}{#k/2}* Pera aí, muleque.\n* Essa parada não é de graça, sabe?",
                            "<30>{#k/3}* Pode parecer tralha pra você, mas pra mim é ouro puro!"
                        ]
                        : [
                            "<30>{#p/basic}{#k/2}* Ha!\n* Eu estou tentando me livrar da mercadoria, não comprar mais!",
                            "<30>{#k/3}* Mas, eu fiquei sabendo que se você quiser vender suas paradas, tem a vila Temmie por aí.",
                            '<30>{#k/0}* Onde fica?',
                            '<30>{#k/4}* ...',
                            "<30>{#k/0}* Num lembro."
                        ],
        sell2: () =>
            world.runaway
                ? ['<30>{#p/basic}* Nada sobrando.']
                : world.genocide || world.meanie
                    ? ["<30>{#p/basic}{#k/1}* Eu não desistiria dos meus tesouros dourados nem a ponta de faca."]
                    : ["<30>{#p/basic}{#k/0}* Pela última vez, eu não quero!"],
        talk: () =>
            SAVE.data.n.plot === 72
                ? [
                    'Asgore',
                    'Novo Mundo Natal',
                    'Toriel',
                    SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                        ? '§fill=#ff0§Aperto de mão'
                        : 'Eu sou um herói',
                    'Sair'
                ]
                : world.genocide
                    ? ['Asriel', '(Ameaçar)', '(Lutar)', 'Undyne', 'Sair']
                    : world.killed0 || startonATE()
                        ? ['Seu destino', '(Ameaçar)', '(Lutar)', 'Herói', 'Sair']
                        : [
                            48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                                ? 'Sobre você'
                                : ['Sobre você', '§fill=#ff0§A guerra (NOVO)', '§fill=#ff0§Aposentadoria (NOVO)', 'Aposentadoria'][
                                Math.min(SAVE.data.n.shop_gerson, 3)
                                ],
                            ['O Planeta Natal', '§fill=#ff0§Familia (NOVO)', '§fill=#ff0§Erogot (NOVO)', 'Erogot'][
                            Math.min(SAVE.data.n.shop_homeworld, 3)
                            ],
                            'A Foundry',
                            SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                                ? 'Undyne'
                                : SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                                    ? '§fill=#ff0§Aperto de mão'
                                    : 'Sobre Undyne',
                            'Sair'
                        ],
        talkPrompt: () =>
            world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? '<09>{#p/basic}{#k/2}Sério?\nVOCÊ quer conversar?'
                : '<09>{#p/basic}{#k/0}Algo que você queira saber?',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#k/0}* Velho Rei Fofucho, eh?\n* Aí está alguém que eu conheço.",
                        "<32>{#k/2}* Eu vou te dizer, eu não fazia ideia do que ele tinha feito com os humanos até hoje!",
                        "<32>{#k/3}* Eu não sei como ele manteve esse segredo por tanto tempo...",
                        "<32>{#k/0}* Especialmente já que todo mundo estaria feliz com isso se ele contasse antes.",
                        "<32>{#k/0}* Eu até adotei um dos humanos pra mim, na verdade.",
                        "<32>{#k/2}* Ele tá dormindo na caixa dele lá fora da loja.\n* Que carinha adorável.",
                        "<32>{#k/0}* Asgore disse que ele irá acordar assim que seu corpo se ajustar ao mundo real ou algo assim.",
                        '<32>{#k/3}* ... huh?\n* Você quer saber se Asgore pode ser seu pai?',
                        "<32>{#k/0}* Bem, não vejo o porque não!",
                        "<32>{#k/0}* Tenho certeza que ele vai ficar bem feliz vivendo contigo.",
                        "<32>{#k/2}* Provavelmente seria bom pra ele!\n* Wa ha ha."
                    ]
                    : world.genocide
                        ? [
                            '<32>{#p/basic}{#k/1}* Você quer saber o que eu penso sobre Asriel?',
                            '<32>{#k/0}* ...\n* Ele era uma boa criança.',
                            '<32>{#k/3}* E se ainda estivesse vivo, seria um ótimo rei.',
                            "<32>{#k/4}* Agora para o que você tem aí parado na minha frente, não é ele.",
                            '<32>{#k/0}* Parece com ele, fala como ele, e até sua bendita cara adorável... amava aquela criança.',
                            '<32>{#k/3}* Mas essa ALMA... Estando tão perto de você, a semelhança é inconfundível.',
                            "<32>{#k/1}* Como é a sensação de tomar a ALMA de sua própria mãe, garoto?",
                            '<32>{#k/0}* O que seria...'
                        ]
                        : world.killed0 || startonATE()
                            ? [
                                '<32>{#p/basic}{#k/0}* Muito tempo atrás, o rei e eu concordamos que seria inútil tentar escapar...',
                                '<32>{#k/1}* Já que assim que saíssemos, seríamos mortos pelos humanos.',
                                "<32>{#k/3}* Eu admito que me senti meio traído após ele mudar de ideia.",
                                '<32>{#k/4}* Mas agora, eu acho...\n* Talvez ele estivesse correto.',
                                "<32>{#k/0}* Até porque, mesmo que a gente nunca tenha escapado...",
                                "<32>{#k/3}* Tem um humano por aí matando todo mundo, né não?"
                            ]
                            : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                                ? [
                                    "<32>{#p/basic}{#k/0}* Eh, não tem muito o que dizer sobre mim.",
                                    '<32>{#k/0}* Eu faço meu melhor para viver minha vida...',
                                    '<32>{#k/4}* Ajudar aqueles ao meu redor da forma que eu puder.',
                                    '<32>{#k/0}* A coisa é, nós vivemos em tempos perigosos.',
                                    "<32>{#k/3}* Se o humano errado pisar no Outpost, nós seremos uns perdidos..."
                                ]
                                : [
                                    [
                                        "<32>{#p/basic}{#k/0}* Eu estive por perto tempo demais.\n* Talvez mais do que demais.",
                                        '<32>{#k/3}* A tempos atrás, eu servi como chefe do conselho planetário.',
                                        '<32>{#k/2}* O \"Sabre da Justiça\" assim me chamavam.',
                                        "<32>{#k/1}* ... se não fosse por aquela maldita guerra, eu ainda poderia estar nessa posição hoje."
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/0}* Claro, a guerra.\n* Aquela desgraça tomou muito de mim.\n* De todos nós.',
                                        "<32>{#k/4}* De vez em quando, recebíamos esses relatórios...\n* Uma lista das pessoas que morreram protegendo nossa casa.",
                                        "<32>{#k/1}* Eu ainda me lembro da cara do Fofucho quando ele precisava ir até às famílias contar as más notícias.",
                                        "<32>{#k/1}* Aquele encarar, os olhos vazios...\n* A guerra faz isso com as pessoas, criança.",
                                        "<32>{#k/3}* Foi por isso que me aposentei."
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/3}* Minha aposentadoria?',
                                        "<32>{#k/2}* Wah ha ha!\n* Eu diria que está indo bem!",
                                        "<32>{#k/4}* Esta velha cabana não está exatamente à altura daqueles caras que operam em Aerialis...",
                                        "<32>{#k/2}* ... mas quem se importa!\n* Eu não preciso competir com eles.",
                                        '<32>{#k/0}* Os vizinhos heróicos, malucos e às vezes tímidos com quem moro aqui são tudo o que eu poderia pedir.',
                                        '<32>{#k/0}* Pode não ser a casa com a qual eu sonhei um dia, mas na vida você só pega o que ela te entrega.'
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/3}* Você quer que eu repita o que disse?',
                                        "<32>{#k/4}* Wa ha ha... você teria que voltar no tempo ou sei lá.",
                                        "<32>{#k/2}* Nem mesmo eu me lembro do que disse!"
                                    ]
                                ][Math.min(SAVE.data.n.shop_gerson++, 3)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/3}* Um mundo inteirinho novo...',
                        "<32>{#k/0}* Rapaz, eu não pensei que veria esse dia chegar.",
                        "<32>{#k/3}* Dr.Alphys me disse que começaria a procurar por novos mundos...",
                        "<32>{#k/0}* Então, a pouco tempo atrás, ela disse ter encontrado um.",
                        "<32>{#k/0}* Se chama Eurybia.\n* Não sei muito sobre além disso.",
                        "<32>{#k/1}* Tudo que eu sei é que será um lugar melhor que esse.",
                        "<32>{#k/3}* Não que eu não vá sentir falta daqui.",
                        "<32>{#k/0}* Eu vivi todo o período de cativeiro dos monstros...",
                        '<32>{#k/0}* Deixar aqui tão cedo parece até um crime.'
                    ]
                    : world.genocide || world.killed0 || startonATE()
                        ? [
                            "<32>{#p/basic}{#k/3}* Eu vivi tempo demais pra ter medo de algo feito ocê.",
                            '<32>{#k/2}* Tenta, criança!',
                            "<32>{#k/1}* ... Eu sei que você não pode aqui.",
                            "<32>{#k/4}* Wah ha...\n* Conhecimento assim foi parte do porque eu sobrevivi tanto tempo."
                        ]
                        : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                            ? [
                                '<32>{#p/basic}{#k/2}* O mundo natal, é?',
                                '<32>{#k/0}* Olha, criança.',
                                "<32>{#k/0}* Tudo que eu vou dizer sobre o planeta natal é que era um lugar incrível.",
                                "<32>{#k/4}* Um lugar onde as pessoas não precisavam se preocupar...",
                                '<32>{#k/1}* ... sobre ver aqueles que eles amam serem mortos em frente aos seus olhos.',
                                "<32>{#k/0}* Então, pra deixar claro, não é um lugar onde você se encaixaria bem.",
                                '<32>{#k/1}* Alguma pergunta?'
                            ]
                            : [
                                [
                                    "<32>{#p/basic}{#k/0}* O planeta natal...\n* Bem, ele tem um nome, é Krios.",
                                    '<33>{#k/3}* Eu cresci em uma cidade do interior de lá.\n* Bem, eu disse interior.',
                                    '<32>{#k/4}* A cada poucos dias, algumas das crianças da escola organizavam essas corridas de contra-tempo.',
                                    "<32>{#k/0}* O clima não era perfeito, mas ele nem ligavam.\n* Se ele fazia algo, era deixar as coisas interessantes.",
                                    '<32>{#k/0}* Eu e minha família presenciamos dezenas dessas corridas quando eu era só uma criança.',
                                    "<32>{#k/0}* Não me entenda errado.\n* Lesma Elétrica é legal, só não é a mesma coisa."
                                ],
                                [
                                    "<32>{#p/basic}{#k/3}* Minha família.\n* Não a muito o que dizer.\n* Eu tive bons pais, alguns irmãos.",
                                    '<32>{#k/0}* Um dia, o Rei Erogot veio à nossa cidade.\n* Ele e eu nos conhecemos em uma daquelas corridas que falei procê.',
                                    "<32>{#k/0}* Eu era só um muleque insignificante de fazenda, mas ele viu algo em mim...",
                                    '<32>{#k/4}* Uma coisa levou a outra e eu acabei saindo de perto da minha família bem cedo.',
                                    "<32>{#k/3}* ... foi a última vez que os vi cara a cara."
                                ],
                                [
                                    '<32>{#p/basic}{#k/0}* Erogot, o rei da última grande era do planeta natal.',
                                    "<32>* Eu tenho certeza que você leu sobre ele em algum ponto.",
                                    ...(SAVE.storage.inventory.has('artifact') // NO-TRANSLATE

                                        ? ["<32>{#k/2}* Se você não tiver, então para que você está segurando o pingente dele!?"]
                                        : [
                                            "<32>{#k/2}* Se não tiver, então em que asteróide você tem vivido esse tempo todo!?"
                                        ]),
                                    '<32>{#k/3}* Sobre seu reinado, a raça monstro chegou longe.\n* Bem longe.',
                                    '<32>{#k/0}* Ele estava tão feliz em ver um humano pela primeira vez... mas não por si.',
                                    "<32>{#k/1}* Nah, esse foi o desejo de seu filho.\n* Pobre criança ganhou o que queria e então..."
                                ],
                                [
                                    "<32>{#p/basic}{#k/3}* Desculpe-me, eu não consigo mais conversar sobre isso.",
                                    "<32>{#k/1}* O velho Rei Fofucho não gostaria que você carregasse esse tipo de fardo."
                                ]
                            ][Math.min(SAVE.data.n.shop_homeworld++, 3)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/0}* Toriel?\n* Ela passou aqui a pouco tempo atrás, na verdade.',
                        '<32>{#k/1}* Ela disse que precisava de tempo para si mesmo.',
                        "<32>{#k/3}* Bem, sabe o quê?\n* Eu acho que ela já teve tempo demais pra si.",
                        '<32>{#k/0}* Ocê pode achar ela no depósito de lixo depois da sala central.',
                        "<32>{#k/3}* Eu sei o que tem mantido ela tão preocupada..."
                    ]
                    : world.genocide || world.killed0 || startonATE()
                        ? 48 <= SAVE.data.n.plot
                            ? [
                                [
                                    '<32>{#p/basic}{#k/3}* Eh?\n* Lutar contra você?',
                                    "<32>{#k/1}* Nah... eu num só herói.\n* Não mais.",
                                    "<32>{#k/0}* E aliás...\n* Você pode ter poupado Undyne, mas todos os outros estão mortos.",
                                    "<32>{#k/4}* É melhor eu me manter firme exatamente onde estou..."
                                ],
                                [
                                    '<32>{#p/basic}{#k/3}* Eh?\n* Lutar contra você?',
                                    "<32>{#k/1}* Nah... eu num só herói.\n* Não mais.",
                                    "<32>{#k/3}* E aliás...\n* Algumas pessoas tem sumido desde você apareceu por aqui.",
                                    "<32>{#k/4}* Vou tomar isso como um presságio para ficar exatamente onde estou..."
                                ],
                                [
                                    '<32>{#p/basic}{#k/3}* Eh?\n* Lutar contra você?',
                                    "<32>{#k/1}* Nah... eu num só herói.\n* Não mais.",
                                    "<32>{#k/0}* E aliás...\n* Após o que você fez com a Undyne, eu sei que não teria chance.",
                                    "<32>{#k/4}* É melhor eu me manter firme exatamente onde estou..."
                                ]
                            ][world.genocide ? 2 : SAVE.data.n.state_foundry_undyne]
                            : [
                                '<32>{#p/basic}{#k/3}* Eh?\n* Lutar contra você?',
                                "<32>{#k/1}* Nah... eu num só herói.\n* Não mais.",
                                "<32>{#k/0}* E aliás...\n* Esses ossos não aguentam mais lutar de forma alguma.",
                                "<32>{#k/1}* Um ataque seu e eu... bem...",
                                "<32>{#k/4}* Pelo menos ao conversar com você eu dei mais tempo para outros escaparem."
                            ]
                        : postSIGMA()
                            ? [
                                '<32>{#p/basic}{#k/3}* Você quer saber sobre a Foundry?\n* Ele lugar velho?',
                                "<32>{#k/3}* Recentemente temos tido alguns problemas de eletricidade...",
                                "<32>{#k/0}* Mas eu sei que não é nada que a equipe da Foundry não possa resolver.",
                                "<32>{#k/2}* Aqueles caras são muito capazes de seu trabalho como engenheiros!"
                            ]
                            : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                                ? [
                                    [
                                        '<32>{#p/basic}{#k/3}* Você quer saber sobre a Foundry?\n* Ele lugar velho?',
                                        "<32>{#k/3}* Bem, é um lugar onde as pessoas normalmente ficam perdidas...",
                                        '<32>{#k/3}* Ou deixadas para trás...',
                                        "<32>{#k/2}* Garoto, eu espero que isso não aconteça com você."
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/3}* Você quer saber sobre a Foundry?\n* Ele lugar velho?',
                                        "<32>{#k/0}* Olha, nunca foi o lugar mais amigável do Outpost...",
                                        '<32>{#k/3}* Dos humanos que nos enviaram aqui para morrer, até a recente perda de um espírito de luta...',
                                        "<32>{#k/3}* Nada além de azar por aqui, carinha."
                                    ]
                                ][SAVE.data.n.state_foundry_undyne - 1]
                                : [
                                    '<32>{#p/basic}{#k/3}* Você quer saber sobre a Foundry?\n* Ele lugar velho?',
                                    '<32>{#k/2}* Quando nós fomos presos aqui, este ERA o Outpost inteiro!',
                                    '<32>{#k/0}* Todas aquelas áreas extravagantes adicionadas posteriormente foram construídas por nós, monstros.',
                                    "<32>{#k/0}* Ao que parece muitas pessoas não curtiam a ideia de viver no passado.\n* O que é justo.",
                                    "<32>{#k/2}* Mas... Eu só acho que há algo tão decadente em reaproveitar este lugar.",
                                    "<32>{#k/3}* Foram os humanos que nos prenderam aqui, esperando nos ver sofrer e morrer na escuridão.",
                                    "<32>{#k/0}* Mas olha só para nós agora.\n* Olha como nós fizemos deste lugar nossa casa.",
                                    "<32>{#k/2}* Wa ha ha!\n* Fale sobre mostrar a eles quem é que manda, hein?"
                                ],
            () =>
                SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                    ? ((SAVE.data.b.c_state_secret2_used = true),
                        [
                            '<32>{#p/basic}{#k/3}* O quê?\n* Onde em Krios você aprendeu este aperto de mão?',
                            "<32>{#k/2}* Eu não mostro isso pra ninguém a anos!",
                            '<32>{#k/0}* Wa ha ha... mas eu acho que sei onde você aprendeu isso.',
                            '<32>{#k/0}* Muito tempo atrás, um humano veio aqui... nós nos tornamos bons amigos.',
                            ...(SAVE.data.n.plot === 72
                                ? [
                                    "<32>{#k/3}* Talvez ainda sejamos.\n* Vou ter que perguntar a ele quando acordar.",
                                    "<32>{#k/4}* Eu acabei de adota-lo.",
                                    '<32>{#k/0}* Ele parece cansado após toda aquela coisa de arquivo.',
                                    '<32>{#k/3}* Imagine...\n* Viver em um mundo virtual...',
                                    '<32>{#k/2}* Se você morrer na simulação, você morre na vida real?',
                                    "<32>{#k/0}* Meh, esquece.\n* Não importa."
                                ]
                                : ["<32>{#k/3}* Me pergunto o que ele está pensando agora..."])
                        ])
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#k/0}* Frisk, eu poderia falar sobre você o dia inteiro após o que você fez.',
                            '<32>{#k/4}* Arriscar sua vida, enfrentar um semelhante a deus só pra nos salvar...',
                            "<32>{#k/3}* As palavras fortes o suficiente para fazer justiça não existem.",
                            '<32>{#k/0}* Eu acho que em algum momento no futuro, se você quiser...',
                            '<32>{#k/0}* Você poderia liderar a raça monstro por conta, como um rei.',
                            '<33>{#k/2}* Todo mundo te seguiria!\n* Até esse velho camarada!',
                            "<32>{#k/0}* Você é um verdadeiro herói, criança."
                        ]
                        : 48 <= SAVE.data.n.plot
                            ? world.genocide
                                ? [
                                    [
                                        "<32>{#p/basic}{#k/1}* Eu acho que você já a matou nesta altura?",
                                        '<32>{#k/1}* ...',
                                        '<32>{#k/3}* Então pra quê me perguntar...',
                                        '<32>{#k/3}* Ah não ser que...',
                                        "<32>{#k/2}* Você só queria ver minha reação, não é?",
                                        '<32>{#k/4}* ...',
                                        '<32>{#k/4}* Que tal... nada.'
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/1}* Eu já entendi, caras.',
                                        "<32>{#k/1}* Ela está morta.",
                                        "<32>{#k/3}* Vocês estão esperando que eu faça uma festa pra comemorar ou o que?",
                                        '<32>{#k/1}* Some daqui.'
                                    ]
                                ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                                : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                                    ? [
                                        '<32>{#p/basic}{#k/1}* ...',
                                        "<32>{#k/1}* Você tem um senso de humor bem variado, carinha.",
                                        '<32>{#k/3}* Matar ela bem na minha frente...',
                                        "<32>{#k/1}* Você tem sorte que eu não te mato eu mesmo."
                                    ]
                                    : world.killed0 || startonATE()
                                        ? [
                                            [
                                                '<32>{#p/basic}{#k/4}* Undyne?',
                                                49 <= SAVE.data.n.plot
                                                    ? '<32>{#k/4}* Ela passou por aqui mais cedo...'
                                                    : '<32>{#k/4}* Ela passou aqui a alguns momentos atrás.',
                                                '<32>{#k/0}* Dizendo que ela \"desistiu\" de te capturar.',
                                                '<32>{#k/4}* ...',
                                                '<32>{#k/4}* O que aconteceu...?'
                                            ],
                                            [
                                                '<32>{#p/basic}{#k/3}* Undyne?',
                                                "<32>{#k/0}* Eu não ouço falar dela faz um tempo.",
                                                '<32>{#k/4}* Ela meio que... desapareceu.',
                                                '<32>{#k/3}* Foi você que fez isso?'
                                            ],
                                            [
                                                [
                                                    '<32>{#p/basic}{#k/1}* ...',
                                                    '<32>{#k/1}* Você matou ela, igual você matou todo o resto.',
                                                    "<32>{#k/3}* É claro, ela não planejava te deixar viver...",
                                                    "<32>{#k/1}* Mas não venha agindo como se isso tenha sido defesa pessoal.",
                                                    '<32>{#k/3}* Wa ha...\n* Eu te conheço muito bem.'
                                                ],
                                                ['<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* O que tem mais para dizer?']
                                            ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                                        ][SAVE.data.n.state_foundry_undyne]
                                        : [
                                            2 <= SAVE.data.n.plot_date
                                                ? SAVE.data.b.undyne_respecc
                                                    ? [
                                                        '<32>{#p/basic}{#k/4}* Então você e ela tiveram um bom momento, hein?',
                                                        '<32>{#k/2}* Wa ha ha!',
                                                        "<32>{#k/0}* Você realmente deu uma boa impressão pra ela, criança!"
                                                    ]
                                                    : [
                                                        '<32>{#p/basic}{#k/4}* Então você e ela são... amigos agora?',
                                                        '<32>{#k/2}* Wa ha ha!',
                                                        "<32>{#k/0}* Você fez algo que eu jamais pensei se possível, criança!"
                                                    ]
                                                : [
                                                    [
                                                        '<32>{#p/basic}{#k/4}* Undyne?',
                                                        49 <= SAVE.data.n.plot
                                                            ? '<32>{#k/4}* Ela passou por aqui mais cedo...'
                                                            : '<32>{#k/4}* Ela passou aqui a alguns momentos atrás.',
                                                        SAVE.data.b.undyne_respecc
                                                            ? '<32>{#k/0}* Ela disse estar feliz por ter lutado com um humano de \"honra\".'
                                                            : '<32>{#k/0}* Ela disse que não precisa mais te capturar.',
                                                        '<32>{#k/4}* ...',
                                                        '<32>{#k/4}* O que caramba você fez pra ela falar ISSO?'
                                                    ],
                                                    [
                                                        "<32>{#p/basic}{#k/4}* Se você está me perguntando onde encontrar ela, ela tá em casa.\n* São alguns passos daqui.",
                                                        '<32>{#k/3}* Pelo que ela me disse antes...',
                                                        SAVE.data.b.undyne_respecc
                                                            ? '<32>{#k/4}* Parece que vocês dois estão mais \"amigáveis\" do que antes.'
                                                            : '<32>{#k/4}* Parece que vocês tem algumas coisas para conversar.'
                                                    ]
                                                ][Math.min(SAVE.data.n.shop_deadfish++, 1)],
                                            [
                                                '<32>{#p/basic}{#k/3}* Undyne?',
                                                "<32>{#k/0}* Eu não ouço falar dela faz um tempo.",
                                                '<32>{#k/4}* Ela meio que... desapareceu.',
                                                '<32>{#k/1}* Algo me diz que você desempenhou um papel nisso...'
                                            ],
                                            [
                                                [
                                                    '<32>{#p/basic}{#k/4}* ...',
                                                    '<32>{#k/0}* Bem... você matou ela.',
                                                    "<32>{#k/3}* Olha, ela meio que procurou por isso.",
                                                    '<32>{#k/4}* Eu nunca realmente entendi o motivo dela querer tanto matar humanos...',
                                                    "<32>{#k/0}* Se ela queria sua ALMA, não era mas fácil te esperar morrer em algum momento?"
                                                ],
                                                ['<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* O que tem mais para dizer?']
                                            ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                                        ][SAVE.data.n.state_foundry_undyne]
                            : world.genocide
                                ? [
                                    "<32>{#p/basic}{#k/0}* Undyne?\n* Oh, aquela pobre peixinha.\n* Normalmente, eu a chamaria de heroína.",
                                    "<32>{#k/1}* Mas pra ser honesto, eu vi o que você fez.\n* Ela não tem chance.",
                                    "<32>{#k/4}* Não me entenda errado, ela vai te dar a luta da sua vida.",
                                    '<32>{#k/3}* Mas não... o Outpost precisa de outro tipo de herói agora.',
                                    "<32>{#k/3}* Alguém que não opera na base da raiva ou instinto...",
                                    "<32>{#k/3}* Alguém que não vê o universo como todo mundo...",
                                    "<32>{#k/0}* Wa ha ha.\n* Eu não dúvido que alguém assim será seu fim."
                                ]
                                : world.killed0 || startonATE()
                                    ? world.trueKills > 29
                                        ? [
                                            "<32>{#p/basic}{#k/1}* Eu não sou um herói.",
                                            "<32>{#k/3}* Mas eu sei que tem alguém por aí.",
                                            "<32>* Alguém que jamais desistirá de fazer a coisa certa, não importa o que.",
                                            "<32>{#k/0}* Não tem profecia ou lenda sobre alguém assim.",
                                            "<32>* Eu só sei que é verdade.",
                                            '<32>{#k/3}* Que algum dia, alguém vai botar ocê pra dormir.'
                                        ]
                                        : [
                                            "<32>{#p/basic}{#k/1}* Eu não sou um herói.",
                                            "<32>{#k/3}* Mas eu sei que tem alguém por aí.",
                                            "<32>* Alguém que jamais desistirá de fazer a coisa certa, não importa o que.",
                                            "<32>{#k/0}* Eu ficaria de olho por onde anda, criança.",
                                            "<32>{#k/0}* Porque cedo ou tarde, antes \"do-cê\" perceber...",
                                            "<32>{#k/3}* ... Ocê vai estar morto da silva."
                                        ]
                                    : world.trueKills > 29
                                        ? [
                                            "<32>{#p/basic}{#k/0}* Undyne?\n* É, ela é um heroína local por aqui.",
                                            '<32>{#k/3}* Ela passou voando mais cedo... parecia bem irritada com alguém igualzinho você...',
                                            "<32>{#k/2}* Eu ficaria esperto, criança.\n* E compraria alguns itens...\n* Talvez salve sua pele!\n* Wa ha ha!"
                                        ]
                                        : [
                                            "<32>{#p/basic}{#k/0}* Undyne?\n* É, ela é um heroína local por aqui.",
                                            '<32>{#k/4}* Com esforço e determinação, ela lutou até o topo da Guarda Real.',
                                            '<32>{#k/3}* Na verdade, ela acabou de passar aqui e perguntar por alguém que se parecia contigo...',
                                            "<32>{#k/2}* Eu ficaria esperto, criança.\n* E compraria alguns itens...\n* Talvez salve sua pele!\n* Wa ha ha!"
                                        ]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },

    s_save_foundry: {
        f_abyss: {
            name: 'Foundry - Abyss',
            text: [
                '<32>{#p/human}* (Você se encontra no ponto mais baixo do Outpost.)',
                '<32>{#p/human}* (Esse sentimento de limbo te enche de determinação.)'
            ]
        },
        f_battle: {
            name: 'Foundry - Ponte',
            text: () =>
                SAVE.data.n.state_foundry_undyne > 0 || world.runaway
                    ? ['<32>{#p/human}* (A luz das estrelas diminui, enchendo-o de determinação.)']
                    : [
                        '<32>{#p/humano}* (A luz das estrelas brilha, por mais distante que seja.)',
                        '<32>{#p/human}* (Isso te enche de determinação.)'
                    ]
        },
        f_hub: {
            name: 'Foundry - Área Quieta',
            text: () =>
                SAVE.data.n.state_foundry_undyne > 0 || world.runaway
                    ? [
                        '<32>{#p/human}* (O silêncio é ensurdecedor...)',
                        '<32>{#p/human}* (Mesmo assim, ele te enche de determinação.)'
                    ]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/human}* (Retornar para um lugar tão quieto após sua longa jornada te enche de determinação.)']
                        : SAVE.data.n.plot < 48
                            ? [
                                '<32>{#p/human}* (Um breve alívio no caos em curso...)',
                                '<32>{#p/human}* (Isso te enche de determinação.)'
                            ]
                            : SAVE.data.n.plot_date < 2.1
                                ? ['<32>{#p/human}* (O caos chegou ao fim, te enchendo de determinação.)']
                                : SAVE.data.n.exp > 0
                                    ? [
                                        '<32>{#p/human}* (Com o vapor vem o cheiro amargo da traição.)',
                                        '<32>{#p/human}* (Isso te enche de determinação.)'
                                    ]
                                    : [
                                        '<32>{#p/human}* (Com o vapor vem o doce perfume da amizade.)',
                                        '<32>{#p/human}* (Isso te enche de determinação.)'
                                    ]
        },
        f_lobby: {
            name: 'Foundry - Zona Escura',
            text: () =>
                SAVE.data.n.plot < 39
                    ? ['<32>{#p/human}* (Vagar mais fundo na fábrica te enche de determinação.)']
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? ['<32>{#p/human}* (Pensando nos amigos que você corrompeu pelo caminho, te enche de determinação.)']
                        : SAVE.data.b.f_state_kidd_betray
                            ? ['<32>{#p/human}* (Pensar nos amigos que você traiu pelo caminho, te enche de determinação.)']
                            : world.runaway
                                ? [
                                    "<32>{#p/human}* (Pensar nos amigos que você nunca mais vera, te enche de determinação.)"
                                ]
                                : SAVE.data.b.svr
                                    ? [
                                        '<32>{#p/human}* (Pensar nos amigos que você se esforçou para salvar o enche de determinação.)'
                                    ]
                                    : ['<32>{#p/human}* (Pensar nos amigos que você fez pelo caminho te enche de determinação.)']
        },
        f_prechase: {
            name: 'Foundry - Cruzamento',
            text: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Apesar de ser útil apenas para você e sua companhia...)',
                        '<32>{#p/human}* (A ponte recém-construída nas proximidades ainda o enche de determinação.)'
                    ]
                    : world.runaway
                        ? [
                            "<32>{#p/human}* (Mesmo você sendo o único que vai usar isso agora...)",
                            '<32>{#p/human}* (A ponte recém-construída nas proximidades ainda o enche de determinação.)'
                        ]
                        : SAVE.data.n.plot < 48
                            ? [
                                '<32>{#p/human}* (Quebra-cabeças de pilão, estrelas de sinalização e aberturas vintage...)',
                                '<32>{#p/human}* (Essas frivolidades inconstantes o enchem de determinação.)'
                            ]
                            : [
                                '<32>{#p/human}* (Uma ponte agora fica no meio dos arredores.)',
                                '<32>{#p/human}* (Esse desenvolvimento te enche de determinação.)'
                            ]
        },
        f_sans: {
            name: 'Foundry - Ponto de Segurança',
            text: () =>
                world.dead_skeleton || world.runaway
                    ? [
                        '<32>{#p/human}* (De alguma forma, o vento emitido por ventilação é desproporcional.)',
                        '<32>{#p/human}* (No entanto, isso o enche de determinação.)'
                    ]
                    : ['<32>{#p/human}* (O vento quente e abafado emitido por essas tubulações te enche de determinação.)']
        },
        f_shyren: {
            name: 'Foundry - Máquina de Venda',
            text: () =>
                SAVE.data.b.killed_shyren
                    ? ['<32>{#p/human}* (Uma triste quietude permeia o ar, enchendo-o de determinação.)']
                    : SAVE.data.n.plot < 40
                        ? ['<32>{#p/human}* (Um zumbido silencioso ecoa por perto, te enchendo de determinação.)']
                        : ['<32>{#p/human}* (Os sons de música te enchem de determinação.)']
        },
        f_tunnel: {
            name: 'Foundry - Zona de Lixo',
            text: () =>
                SAVE.data.n.plot < 42.1
                    ? ['<32>{#p/human}* (Perder-se entre o lixo te enche de determinação.)']
                    : ['<32>{#p/human}* (Se encontrar de volta no lixo te enche de determinação.)']
        }
    }
};


// END-TRANSLATE
