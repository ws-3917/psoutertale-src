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
            '<25>{#p/toriel}{#f/9}* Eu peço desculpas. Você provavelmente procurou por mim em todos os lugares.',
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
            '<32>{#p/basic}* Aqueles manés da ELITE falharam em tomar sua ALMA, mas eles esqueceram algo que eu tenho na manga!',
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
            "<32>* Eu sou totalmente corporal agora!\n* Eu estou... sonhando?\n* Isso é real???",
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
                            '<25>{#p/asriel2}{#f/7}* $(name) e eu somos inseparáveis, Asgore. Você deveria saber disso.',
                            '<25>{#p/asgore}{#f/15}* $(name)... M-mas é claro.\n* Então... o que v-você está fazendo com a criança?',
                            "<25>{#p/asriel2}{#f/8}* Sinceramente, isso não te importa.",
                            "<25>{#p/asgore}{#f/15}* (Ugh... deveria ter visto isso chegando...)",
                            "<25>{#p/asriel2}{#f/6}* Só para dizer, então...\n* Estamos indo em uma pequena aventura juntos.",
                            "<25>{#f/6}* Só nós três.\n* E surpresa, surpresa, você não está convidado.",
                            '<25>{#p/asgore}{#f/15}* E-eu pareço querer ser convidado??',
                            '<25>{#p/asriel2}{#f/6}* Me diz você.',
                            "<25>{#p/asgore}{#f/15}* Bem, eu só queria checar onde você estava.\n* Isso é tudo.",
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
                '<25>{#f/5}* Desde a última vez que nos vimos, eu tenho pensado muito sobre tudo.',
                '<25>{#f/2}* É difícil de concluir, mas...\n* Ele já foi longe demais.',
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
                '<25>{#f/16}* Pequeno conselho.\n* Da próxima vez, tente não começar uma guerra...',
                '<25>{#p/asgore}{#f/2}* ...',
                '<25>{#f/4}* Você...',
                '<25>{#f/2}* ...',
                '<25>{#f/6}* Sabe de uma coisa, Asriel?\n* Esquece.',
                "<25>{#f/7}* Você está certo...",
                '<25>{#f/5}* Conversar com você é uma total perda de tempo.',
                "<25>{#p/asriel2}{#f/15}* ... wow.\n* Estou impressionado.",
                '<25>{#f/16}* Você finalmente disse algo inteligente.',
                '<25>{#p/asgore}{#f/1}* ...',
                "<25>{#p/asriel2}{#f/10}* E o que agora?\n* Qual o próximo movimento para o grande rei?",
                '<25>{#p/asgore}{#f/15}* Pra ser sincero?',
                '<25>{#f/15}* ...',
                '<25>{#f/16}* Eu não faço ideia, Asriel.'
            ],
            asriel33: ['<25>{#p/asriel2}{#f/10}* Eu detectei uma emoção de raiva...?'],
            
            asriel34: [
                "<25>{#p/asriel2}{#f/3}* Eu vou ter que cuidar de algumas coisas, então deixarei vocês sozinhos.",
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
                                '<25>{#f/10}* Nossa, $(name).\n* O que você fez com ele enquanto eu estava fora?'
                            ]
                            : [
                                "<25>{#f/15}* Ele não parava de me perguntar onde você estava...",
                                '<25>{#f/10}* Nossa, $(name).\n* O que vocês dois estavam fazendo enquanto eu estive fora?'
                            ]),
                        "<25>{#f/3}* Uh, não precisa responder.\n* Ele tá aqui agora, é o que importa."
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
                        '<25>{#f/16}* Esperança, medo, empatia...\n* Eles se agarram a essas emoções inúteis.',
                        "<25>{#f/15}* Imagine se todos eles fossem assim."
                    ]
                    : ['<25>{#p/asriel2}{#f/4}* Bem no tempo.'],
            asriel41: ['<25>{#p/asriel2}{#f/3}* Volta pra cá, criança.'],
            asriel42: ["<25>{#p/asriel2}{#f/4}* Se continuarmos assim, vamos estar prontos e fora daqui em pouco tempo."],
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
                "<25>{#p/asriel2}{#f/13}* Undyne, filé de undyne...\n* Ela não é a heroína pela qual você pensa que é.",
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
            "<25>{#f/1}* Se nós dois nos colocarmos nos pisos, a luz acende.\n* Não é legal!?"
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
                    "<18>{#f/0}BEM, ME ENCONTRE NA CASA DA UNDYNE QUANDO ESTIVER PRONTO."
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
            "<32>{#x3}* Assim que o resto do esquadrão de ELITE encontrar vocês, a única coisa que conhecerão é a dor."
        ],
        madfish2: () =>
            SAVE.flag.n.genocide_milestone < 5
                ? [
                    '<32>* Nada a dizer?\n* Há.',
                    "<32>{#x4}* Eu não tenho tempo para lidar com vocês agora, Alphys precisa da minha ajuda para evacuar pessoas.",
                    "<32>{#x5}* Fuhuhu...\n* Divirtam-se tentando progredir.\n* Não vão chegar longe."
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
                            '<32>* Minha luta para me afastar.\n* Minha luta para escapar.\n* Mas, infelizmente, sem sucesso.'
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
                '<32>* Olá de novo, amigo.\n* Espero que seu humor tenha se mantido desde nossa última interação.',
                '<32>* Olá de novo, amigo.\n* Espero que seu humor tenha melhorado desde nossa última interação.',
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
                            '<32>{#p/basic}{#npc/a}* Que bobo...\n* Assim que eu decido ficar em um lugar, nós todos vamos embora.',
                            '<32>* A ironia da situação ainda não me espaçou.\n* Ainda assim, é pelo melhor.',
                            "<32>* No novo mundo...\n* Eu vou ter certeza de encontrar muitos novos vizinhos para mim."
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
                                "<32>* (Uh...)\n* (Você entende que eu estou literalmente a mercê aqui, certo?)",
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
                                "<32>* Shhhh.\n* Tá tudo bem, carinha.\n* Aquele mercado tem uma porta atrás!",
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
                            "<32>{#p/basic}* Eu não me importo com o que seja.\n* Eu vou fazer minha batalha pelo bem do Outpost!",
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
                            '<32>{#p/mettaton}* ATÉ QUE BOM, NA VERDADE.\n* EU ESTAVA PRESTES A PROCURAR POR PARTES MECÂNICAS LÁ EM BAIXO.',
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
                                "<32>{#v/0}* O que?\n* Eu não disse desse jeito.\n* Eu só quis dizer que eles são adoráveis.",
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
                                    ? "<32>{#p/basic}* Aqueles responsáveis pela morte dos meus companheiros não sentirão o sabor da piedade!"
                                    : '<32>{#p/basic}* Este é o momento pelo qual preparei toda minha vida!\n* Eu não irei recuar!',
                            "<32>{#p/undyne}* Isso aí! Vai lá e mostra do que o esquadrão de ELITE é feito!",
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            '<32>{#p/radio}{#v/0}* Olá, querido ligador, A Corrida da Meia-Noite.\n* Tem algo para gente?',
                            "<32>{#p/human}* É, eu tenho algumas palavras.\n* Na verdade, nós humanos não estamos preparados para esse tipo de coisa.",
                            "<32>{#p/radio}{#v/0}* O que você quer dizer?\n* Que nós humanos não somos capazes de compreender conceitos aliens?",
                            "<32>{#p/human}* ... você é inocente.\n* Eu não estou preocupado com os humanos, mas sim... com os aliens.",
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
                            '<32>{#p/basic}* Skrubby da equipe de fundição.\n* Preocupado com as circunstâncias em relação ao ser humano.',
                            '<32>{#p/alphys}* E-ei, uh...\n* Undyne deve ajudar muito melhor... do que eu...',
                            '<32>{#p/basic}* Concordo.\n* Você é bem inútil.',
                            '<32>{#p/alphys}* G-grosso...',
                            '<32>{#s/echostop}{#p/event}{#npc}* Sinal terminado.'
                        ]
                        : [
                            '<32>{#s/echostart}{#p/event}{#npc/a}* Sinal iniciado...',
                            "<32>{#p/radio}{#v/1}* Ah, qual foi.\n* Nós não somos ameaça para eles.\n* Eles tem todas as cartas!",
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
                            "<32>{#v/1}* Falando em amor, enfileire a música de jazz que está explodindo em clubes em todos os lugares...",
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
                                "<32>{#p/alphys}* Mettaton!?\n* De onde você...\n* ... Eu não estou s-saindo com ninguém!",
                                "<32>{#p/mettaton}* AH, NÃO SE PREOCUPE.\n* SEU SEGREDO ESTÁ SEGURO COMIGO...\n* ... PROVAVELMENTE.",
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
                            '<32>{#p/basic}{#npc/a}* Está é uma estrela sinalizadora.\n* Quando ela pega um sinal, ela repete de novo e de novo...'
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
                            "<32>{#p/basic}{#npc/a}* Meu amigo Shortsy e eu planejamos nos tornar arquitetos especialistas no novo mundo.",
                            "<32>* Nós construímos pontes, espirais, estações espaciais... o que você conseguir imaginar, nós podemos construir!",
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
            '<25>{#f/7}* Eu...\n* Eu aposto que meus pais estão super preocupados comigo!'
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
            "<18>{#f/4}EU ESPERO QUE VOCÊ NÃO ESTEJA SE METENDO EM CONFUSÃO...",
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
            '<18>{#f/5}ESSAS SÃO AS PERGUNTAS QUE ME FAÇO TODOS OS DIAS.',
            "<18>{#f/4}É CLARO, EU SÓ ESTOU ESCONDIDO A UM POUCO DE TEMPO.",
            '<18>{#f/7}MAS AINDA ASSIM!!!',
            '<18>{#f/5}...',
            '<18>{#f/4}... VOCÊ DEVE ESTAR PRÓXIMO DA SAIDA DA FOUNDRY NESTE MOMENTO.',
            '<18>{#f/5}EU DESEJAVA PODER FAZER MAIS PARA AJUDAR, MAS ALAS...',
            '<18>{#f/3}SERIA INSEGURO SAIR AGORA E RETORNAR.',
            "<18>{#f/9}A-AINDA ASSIM!!!\nEU SEI QUE VOCÊ NÃO VAI ME DECEPCIONAR!",
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
                    '<32>* Vocês acham que podem passar por uma voluntária do esquadrão de ELITE e simplesmente se livrar?',
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
                '<25>{#p/sans}* ei, ouvir falar que você passou pelo meu mano.\n* o grande papyrus.',
                '<25>{#f/2}* bem... eu considero essa uma {@fill=#ff0}grande vitória{@fill=#fff}.',
                "<25>{#f/0}* Que tal celebrarmos a ocasião no Grillby?",
                "<25>{#f/3}* estar em uma parte do coração do papyrus te dá uma parte no meu também.",
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
            '<25>{#f/2}* a única coisa que já colocou fogo NESSE bar foram minhas piadas hilárias.'
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
            '<25>{#f/3}* uma vez, após um particular longo dia de revisão dos seus ataques...',
            "<25>{#f/0}* papyrus revelou tudo com o que tinha trabalhado até aquele dia.",
            '<25>{#f/0}* eu devo dizer, fiquei mais do que impressionado pelo que vi.',
            "<25>{#f/2}* talvez algum dia, eu até faça designs de ataques por conta própria."
        ],
        spookydate15: ['<25>{#p/sans}* aí vem a comida.'],
        spookydate16: [
            '<25>{#p/sans}* O fato é, você tem que concordar que ele é acima da média.',
            '<25>{#f/0}* Aqueles ataques dele são um ótimo exemplo disso.',
            '<25>{#f/3}* Não muito tempo atrás, papyrus visitou a capitã da guarda real...',
            '<25>{#f/0}* e implorou a ele para deixá-lo entrar.',
            '<25>{#f/3}* bem, ela bateu a porta na cara dele.\n* clássico movimento da undyne.',
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
            "<25>{#f/2}* que trapaça.\n* eu vou ter que chamar meu advogado premium de fraudes.",
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
                            '<32>* ... talvez, quando eu pegar outro corpo, nós dois podemos... fazer aquilo de novo.',
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
                    '<32>* Eu devo dizer, Blooky com certeza tem uma playlist \"interessante\" de músicas baixadas...',
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
                    "<32>{#p/mettaton}{#e/mettaton/9}* ENQUANTO BLOOKY ESTÁ OCUPADO NA LOJA, DECIDIMOS QUE CUIDARÍAMOS DA FAZENDA DELE MAIS UMA VEZ.",
                    "<32>{#e/mettaton/8}* CLARO, SÓ POR UM DIA ANTES DE IRMOS EMBORA DO OUTPOST.\n* MAS AINDA ASSIM.",
                    "<32>{#e/mettaton/36}* PENSANDO NO PASSADO, EU FUI MEIO DRAMÁTICO SOBRE A COISA TODA.",
                    "<32>{#e/mettaton/36}* BLOOKY NUNCA FEZ -TANTO- MAU... EU ACHO QUE EU SÓ NÃO QUERIA ADMITIR QUE ESTAVA ENTEDIADO.",
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
                        '<32>* \"Humanos são inacreditavelmente fortes. Seria preciso as ALMAS de quase todos os monstros...\"',
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
                    : ['<32>{#p/basic}* \"Gerson Paradas e Tralhas!\"\n* \"Uma loja humilde para todas as suas necessidades de vida na fábrica!\"'],
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
                        '<32>* \"Se um grande poder, equivalente a sete ALMAS humanas, atacar o escudo de força...\"',
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
                            '<32>{#p/basic}* \"Mova os postes para guiar o laser para dentro do receptor.\"\n* \"Em seguida, pressione o interruptor.\"'
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
                    '<25>{#f/1}* Historicamente, humanos tem sabres de luz dez vezes acima do seu tamanho.',
                    '<25>{#f/15}* Sem mencionar seus portais interdimensionais.',
                    '<25>{#f/15}* Navios de guerra colossais...',
                    '<25>{#f/1}* Quando eu escutei pela primeira vez, eu imediatamente queria um pra mim!',
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
                    '<25>{#f/8}* Pfft, hah!\n* Todo mundo sabe que eu durmo no duro chão de pedra.',
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
                    '<25>{#f/14}* Com sorte, Alphys modificou minha geladeira para esquentar comida invés disso!',
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
                    '<32>* ... minúsculas lanças de cosmo, sabres de plasma, machados dimensionais, bumerangues antigravitacionais...'
                ],
                [
                    "<32>{#p/basic}* Há uma gaveta de talheres.\n* Tem garfos, colheres, facas...",
                    '<32>* ... minúsculas lanças de cosmo, sabres de plasma, machados dimensionais, bumerangues antigravitacionais...'
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
                "<32>{#p/basic}* Que tal?\n* Em um momento nós estamos correndo por nossas vidas delas...",
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
            '‘<25>{#p/undyne}{#f/14}* Sério?\n* Que delícia!\n* Eu aceito!',
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
            '* Soco Exoberry\n* Feito localmente... ou assim dizem.',
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
                "<25>{#f/12}* Well, let's just say he had it put into mass- production."
            ],
            [
                "<25>{#p/undyne}{#f/12}* You know, it's kinda cool you went with THAT drink...",
                '<25>{#f/12}* Hot cocoa...',
                '<25>{#f/16}* This one time, after the CORE malfunctioned...',
                '<25>{#f/16}* They had to reboot the entire atmospheric system.',
                '<25>{#f/10}* No heat, very little air... it got colder, and colder...',
                '<25>{#f/1}* Then, Asgore came over and offered me a hot cocoa.',
                '<25>{#f/12}* We sat together in this very room...'
            ],
            [
                "<25>{#p/undyne}{#f/12}* You know, it's kinda weird you ended up liking THAT tea...",
                '<25>{#f/12}* Starling flower tea...',
                "<25>{#f/1}* That's always been Asgore's favorite kind."
            ]
        ],
        unddate28: () => [
            '<25>{#p/undyne}{#f/14}* Actually, now that I think about it...',
            '<25>{#f/12}* You kinda remind me of him.',
            ...(SAVE.data.b.undyne_respecc
                ? [
                    '<25>{#f/17}* I mean, your fighting styles are TOTALLY different, but...',
                    "<25>{#f/1}* You're the only two people who've actually managed to beat me!",
                    '<25>{#f/9}* ... in a sense.'
                ]
                : ["<25>{#f/8}* You're both TOTAL weenies!", '<25>{#f/9}* ... sort of.'])
        ],
        unddate29: [
            '<25>{#p/undyne}{#f/16}* The thing is, I was a pretty hot-headed kid.',
            '<25>* Once, to prove I was the strongest, I tried to fight Asgore.',
            '<25>{#f/17}* Emphasis on TRIED.',
            '<25>{#f/1}* I could barely land a single blow on him!',
            '<25>* And worse, the whole time, he refused to fight back!',
            '<25>{#f/9}* I was so humiliated...',
            '<25>{#f/16}* Afterwards, he apologized and said something goofy...',
            '<25>* \"Excuse me, do you want to know how to beat me?\"',
            '<25>{#f/1}* I said yes, and from then on, he trained me.',
            '<25>{#f/16}* One day, during practice, I finally knocked him down.',
            '<25>{#f/9}* I felt... bad.',
            '<25>{#f/12}* But he was beaming...',
            '<25>{#f/1}* I had never seen someone more proud to get their butt kicked.',
            '<25>* Anyway, long story short, after completing my training...',
            '<25>{#f/14}* I took up leadership of the Royal Guard!',
            "<25>{#f/8}* So I'm the one who gets to train dorks to fight!",
            '<25>{#f/1}* ... like, uh, Papyrus.'
        ],
        unddate30: [
            '<25>{#f/16}* But, um, to be honest...',
            "<25>{#f/16}* ... I don't know if...",
            '<25>{#f/9}* I can ever let Papyrus into the Royal Guard.',
            "<25>{#f/17}* Don't tell him I said that!",
            "<25>{#f/10}* He's just...\n* Well...",
            "<25>{#f/9}* I mean, it's not that he's stupid.",
            '<25>{#f/17}* His attack designs are actually pretty freaking wild!',
            "<25>{#f/10}* It's just that...\n* He's...",
            "<25>{#f/17}* He's too innocent and nice!!!",
            '<25>{#f/16}* I mean, look, he was SUPPOSED to capture you...',
            '<25>{#f/11}* And he ended up being FRIENDS with you instead.',
            '<25>{#f/4}* I could NEVER send him into battle!',
            "<25>{#f/9}* He'd get ripped into little smiling shreds.",
            "<25>{#f/12}* That's part of why...",
            '<25>{#f/12}* I started teaching him how to cook, you know?',
            '<25>{#f/9}* So, um, maybe he can do something else with his life.'
        ],
        unddate31: () => [
            SAVE.data.b.undyne_respecc
                ? '<25>{#p/undyne}{#f/1}* Oh, sorry, I was talking for so long...'
                : '<25>{#p/undyne}{#f/12}* Oh, sorry, I was talking for so long...'
        ],
        unddate32: [
            ["<25>{#f/12}* You're out of water, aren't you?"],
            ["<25>{#f/12}* You're out of punch, aren't you?"],
            ["<25>{#f/12}* You're out of cocoa, aren't you?"],
            ["<25>{#f/12}* You're out of tea, aren't you?"]
        ],
        unddate33: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/1}* Heh, don't worry.\n* I'll get you some more."
                : "<25>{#p/undyne}{#f/12}* Heh, don't worry.\n* I'll get you some more."
        ],
        unddate34: ['<25>{#p/undyne}{#f/17}* Wait a second...', '<25>{#f/17}* Papyrus...\n* His cooking lesson...'],
        unddate35: [
            '<25>{#p/undyne}{#f/17}* HE WAS SUPPOSED TO HAVE THAT RIGHT NOW!!!',
            "<25>{#f/11}* And if HE's not here to have it...",
            "<25>{#f/7}* YOU'LL HAVE TO HAVE IT FOR HIM!"
        ],
        unddate36: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    "<25>{#f/1}* That's right!",
                    '<25>{#f/1}* NOTHING has brought Papyrus and I closer than cooking!',
                    '<25>{#f/17}* Heheh, if you thought we were friends before...',
                    '<25>{#f/8}* JUST WAIT UNTIL YOU SEE US AFTER THIS!'
                ]
                : [
                    "<25>{#f/1}* That's right!",
                    '<25>{#f/1}* NOTHING has brought Papyrus and I closer than cooking!',
                    '<25>{#f/17}* Which means that if I give you his lesson...',
                    "<25>{#f/8}* WE'LL BECOME CLOSER THAN YOU CAN EVER IMAGINE!"
                ],
        unddate37: ["<25>{#f/1}* First, let's start with the sauce!!"],
        unddate38: () => [
            '<25>{#f/1}* Envision these veggies as your mortal enemy!',
            '<25>{#f/7}* Now, pound them to bits with your fists!!',
            choicer.create('* (What will you do?)', 'Pet', 'Pound')
        ],
        unddate39a: () => [
            '<32>{#p/human}* (You pet the vegetables in an affectionate manner.)',
            SAVE.data.b.undyne_respecc
                ? "<99>{#p/undyne}{#f/17}* OH MY GOD!!!\n* NOW I -KNOW- YOU'RE\n  JUST SCREWING WITH ME!!!"
                : '<25>{#p/undyne}{#f/17}* OH MY GOD!!!\n* STOP PETTING THE ENEMY!!!',
            "<25>{#x1}{#f/7}* I'll show you how it's done!",
            '<25>{#f/4}* NGAHHH!'
        ],
        unddate39b: () =>
            world.meanie
                ? ['<32>{#p/human}* (You punch the vegetables with all your might.)']
                : [
                    '<32>{#p/human}* (You punch the vegetables with all your might.)\n* (You knock over a tomato.)',
                    '<25>{#p/undyne}{#f/1}* YEAH!\n* YEAH!',
                    '<25>{#f/1}* Our minds are uniting against these healthy ingredients!',
                    "<25>{#x1}{#f/7}* NOW IT'S MY TURN!",
                    '<25>{#f/4}* NGAHHH!'
                ],
        unddate40: (res: number) => [
            ...(world.meanie && res === 1
                ? [
                    SAVE.data.b.undyne_respecc
                        ? "<25>{#p/undyne}{#f/2}* YEAH!!!\n* THAT'S THE WARRIOR I KNOW!!!"
                        : '<25>{#p/undyne}{#f/6}* Feisty today, huh?',
                    "<25>{#f/6}* Heh, we'll just scrape this into a bowl later."
                ]
                : ["<25>{#p/undyne}{#f/6}* Uh, we'll just scrape this into a bowl later."]),
            '<25>{#f/2}* But for NOW!'
        ],
        unddate41: [
            '<25>{#p/undyne}{#f/1}* We add the noodles!',
            '<25>{#f/1}* Homemade noodles are the best, so I always keep some around.'
        ],
        unddate41x: ['<25>{#p/undyne}{#f/12}* Uhh, you can come over here now, kiddo.'],
        unddate41y: () => [
            '<25>{#p/undyne}{#f/1}* Anyway, you see these noodles here, right?',
            '<25>{#f/1}* Well...',
            "<25>{#f/17}* DISH 'EM OUT!",
            choicer.create('* (What will your approach be?)', 'Careful', 'Fierce')
        ],
        unddate42a: [
            '<32>{#p/human}* (You carefully place each spaghetti strand in one at a time.)',
            '<32>* The noodles clank against the empty bottom.',
            '<25>{#p/undyne}{#f/17}* I mean, that works???',
            "<25>{#f/1}* Well, now it's time to stir the pasta!"
        ],
        unddate42b: [
            '<32>{#p/human}* (You throw everything into the pot, including the box.)',
            '<32>* The box and the noodles clank against the empty bottom.',
            "<25>{#p/undyne}{#f/17}* YEAH!!\n* I'M INTO IT!!",
            "<25>{#f/1}* Alright!\n* Now it's time to stir the pasta!"
        ],
        unddate43: [
            '<25>{#p/undyne}{#f/1}* As a general rule of thumb, the more you stir...',
            '<25>{#f/17}* The better it tastes!'
        ],
        unddate44: ['<25>{#p/undyne}{#f/17}* Ready?', "<25>{#f/1}* Let's do it!"],
        unddate45: '* Press [Z] repeatedly to stir!',
        unddate46: ['<25>{*}{#p/undyne}{#f/17}* Stir harder!{^20}{%}'],
        unddate46x: ["<25>{*}{#p/undyne}{#f/17}* Don't just stand there!{^20}{%}"],
        unddate47: ['<25>{*}{#p/undyne}{#f/7}* HARDER!{^20}{%}'],
        unddate47x: ['<25>{*}{#p/undyne}{#f/7}* STIR, DAMN IT!{^20}{%}'],
        unddate48: ['<25>{*}{#p/undyne}{#f/8}* HARDER!!!{^20}{%}'],
        unddate48x: ['<25>{*}{#p/undyne}{#f/8}* STIR!!!{^20}{%}'],
        unddate49: ['<25>{*}{#p/undyne}{#f/8}* Ugh, let me do it-{^10}{%}'],
        unddate50: ["<25>{#p/undyne}{#f/8}* Fuhuhuhu!\n* That's the stuff!"],
        unddate51: [
            '<25>{#p/undyne}{#f/1}* Alright, now for the final step...',
            '<25>{#f/17}* TURN UP THE HEAT!',
            '<25>{#f/1}* Let the stovetop symbolize your passion!',
            '<25>{#f/1}* Let your hopes and dreams turn into burning fire!',
            "<25>{#f/8}* And of course, don't hold anything back!!!"
        ],
        unddate52: ['<25>{#p/undyne}{#f/17}* Ready?', '<25>{#f/1}* Here we go!'],
        unddate53: '* Hold [RIGHT] to crank it up!',
        unddate53x: ['<25>{*}{#p/undyne}{#f/8}* You fool!\n* This burner only goes ONE WAY!!!{^20}{%}'],
        unddate54: ['<25>{*}{#p/undyne}{#f/17}* Make it hotter!{^20}{%}'],
        unddate54x: ['<25>{*}{#p/undyne}{#f/17}* What are you doing?{^20}{%}'],
        unddate55: ['<25>{*}{#p/undyne}{#f/7}* HOTTER!{^20}{%}'],
        unddate55x: ['<25>{*}{#p/undyne}{#f/7}* STOP HESITATING!{^20}{%}'],
        unddate56: ['<25>{*}{#p/undyne}{#f/8}* HOTTER!!!{^20}{%}'],
        unddate56x: ['<25>{*}{#p/undyne}{#f/8}* JUST DO IT!!!{^20}{%}'],
        unddate57a: ['<25>{*}{#p/undyne}{#f/17}* Ugh, let me do it...{^10}{%}'],
        unddate57b: ['<25>{*}{#p/undyne}{#f/17}* See, this is how you-{^20}{%}'],
        unddate58: ["<25>{*}{#p/undyne}{#f/17}* No, wait, that's too-{^10}{%}"],
        unddate59: ['<25>{#p/undyne}{#f/14}* Ah.'],
        unddate60: ["<25>{#p/undyne}{#f/14}* Man, no wonder Papyrus isn't improving at cooking anymore."],
        unddate61: ["<25>{#p/undyne}{#f/12}* So what's next?\n* Trash hunting?\n* Entanglement bracelets?"],
        unddate62: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    '<25>{#p/undyne}{#f/10}* ...',
                    '<25>{#f/9}* ... who am I kidding...',
                    "<25>{#f/16}* I really let this get outta hand, didn't I...?",
                    '<25>{#f/16}* Heh...'
                ]
                : [
                    '<25>{#p/undyne}{#f/10}* ...',
                    '<25>{#f/9}* ... who am I kidding...',
                    "<25>{#f/16}* I really screwed this up, didn't I...?",
                    '<25>{#f/16}* Heh...'
                ],
        unddate63: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    "<25>{#f/16}* Y'know what?",
                    "<25>{#f/9}* I'm not ready to give up on this just yet.",
                    '<25>{#f/1}* So I failed to teach you how to cook.\n* Big whoop.',
                    "<25>{#f/14}* There's still something we can do to salvage this mess.",
                    '<26>{#f/1}* And that something is...'
                ]
                : [
                    "<25>{#f/16}* I can't force you to like me, human.",
                    "<25>{#f/9}* Some people just don't easily get along.",
                    "<25>{#f/16}* I'd understand if you felt that way about me...",
                    "<25>{#f/9}* And if we can't be friends... that's okay.",
                    "<25>{#f/9}* Because...\n* If we're not gonna be friends..."
                ],
        unddate64: () =>
            SAVE.data.b.undyne_respecc
                ? ["<25>{#p/undyne}{#f/17}* ONE LAST DUEL TO SHOW THE GALAXY WHAT WE'RE MADE OF!!!"]
                : ['<25>{#p/undyne}{#f/17}* THEN I CAN DESTROY YOU WITHOUT REGRET!!!'],
        unddate65: () => [
            '<25>{#p/undyne}{#f/12}* Well, that was fun, huh?',
            SAVE.data.b.undyne_respecc
                ? "<25>{#f/8}* We'll have to spar again another time!"
                : "<25>{#f/8}* We'll have to hang out again another time!",
            '<25>{#f/9}* But, uh, somewhere else, I guess.',
            ...(world.postnoot
                ? [
                    '<25>{#f/1}* By the way, have you noticed something weird in the air?',
                    ...(world.nootflags.has('papyrus') // NO-TRANSLATE

                        ? ['<25>{#f/13}* Even Papyrus mentioned it earlier...']
                        : ['<25>{#f/13}* It seems like it just started recently...']),
                    "<25>{#f/16}* ... maybe it's nothing, but I swear I feel weaker than usual."
                ]
                : []),
            ...(SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                ? [
                    "<25>{#f/1}* In the meantime, I'll be at the rec center with Papyrus.",
                    '<25>{#f/12}* I look forward to seeing you there!',
                    '<25>{#f/1}* Until then, you can give Papyrus a ring on your phone.',
                    "<25>{#f/8}* Since we're in the same place, I'll be able to talk too!"
                ]
                : [
                    "<25>{#f/1}* In the meantime, I'll be at the rec center.",
                    '<25>{#f/12}* I look forward to seeing you there!',
                    '<25>{#f/1}* Oh, and uh, Papyrus said he has to go do something.',
                    "<25>{#f/14}* Just letting you know, since he won't be available on the phone."
                ])
        ],
        unddate66: () =>
            SAVE.data.b.undyne_respecc
                ? ['<25>{#f/1}* Well, see ya later, pal!!']
                : ['<25>{#f/14}* Well, see ya later, punk!!'],
        undroom1: () => ['<25>{#p/undyne}{#f/17}* Huh?\n* The heck was THAT?'],
        undroom2: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/1}* Maybe don't do that right now."
                : "<25>{#p/undyne}{#f/12}* We're trying to be friends here."
        ],
        undroom3: () => [
            SAVE.data.b.undyne_respecc
                ? "<25>{#p/undyne}{#f/11}* This is some kind of weird battle tactic, isn't it?"
                : "<25>{#p/undyne}{#f/11}* So that's your way of making friends?"
        ],
        undroom4: () => ['<25>{#p/undyne}{#f/17}* Stop doing that!'],
        undroom5: () => ['<25>{#p/undyne}{#f/17}* ...'],
        undyne1a: [
            "<23>{#p/papyrus}{#f/30}H... HI, UNDYNE!\nI'M HERE WITH MY DAILY REPORT...",
            '<23>UHHH... REGARDING THAT HUMAN I CALLED YOU ABOUT EARLIER...'
        ],
        undyne1b: ['<23>{#p/papyrus}{#f/30}... HUH?\nDID I FIGHT THEM?'],
        undyne1c: () =>
            
            world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

                ? ['<23>{#p/papyrusnt}UH...', "<23>I-IT'S COMPLICATED!"]
                : ['<23>{#p/papyrusnt}Y-YES!\nOF COURSE I DID!', '<23>I FOUGHT THEM VALIANTLY!'],
        undyne1d: ['<23>{#p/papyrus}{#f/30}... WHAT?\nDID I CAPTURE THEM...?'],
        undyne1e: ['<23>{#p/papyrus}{#f/30}W-W-WELL...', '<23>NO...'],
        undyne1f: () =>
            world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s')) // NO-TRANSLATE

                ? ["<23>{#p/papyrus}{#f/30}L-LIKE I SAID, IT'S COMPLICATED!"]
                : ['<23>{#p/papyrus}{#f/30}I-I MEAN, I TRIED VERY HARD TO, B-BUT, IN THE END...'],
        undyne1g: () => [
            '<23>{#p/papyrus}{#f/30}... W-WHAT?',
            ...(SAVE.data.n.state_foundry_doge === 1
                ? ["<23>THEY'VE ALREADY KILLED AN ELITE SQUAD MEMBER??", "<23>N-NO... THEY WOULDN'T DO THAT, WOULD THEY?"]
                : ["<23>YOU'RE GOING TO TAKE THE HUMAN'S SOUL YOURSELF??"])
        ],
        undyne1h: () =>
            SAVE.data.n.state_foundry_doge === 1
                ? ['<23>{#p/papyrus}{#f/30}SURELY THERE MUST BE ANOTHER WAY!', '<23>SURELY...']
                : ["<23>{#p/papyrus}{#f/30}BUT UNDYNE, YOU DON'T H-HAVE TO DESTROY THEM! YOU SEE...", '<23>YOU SEE...'],
        undyne1i: () => [
            '<23>{#p/papyrus}{#f/30}I...',
            '<23>... I UNDERSTAND.',
            "<23>I'LL HELP YOU IN ANY WAY I CAN.",
            ...(world.postnoot
                ? [
                    '<23>BY THE WAY... YOU NEED TO DOUBLE-CHECK THE ATMOSPHERIC SYSTEM.',
                    '<23>WHAT WAS IT CALLED?\nTHE WIDE-AREA TROPE-A- SPHERE FRAMEWORK?',
                    '<23>SOMETHING SEEMS... OFF.'
                ]
                : [])
        ],
        undyne1j: ['<25>{#p/kidd}{#f/1}* Yo!\n* There she is!'],
        undyne1k: ["<25>{#p/kidd}{#f/7}* Wait... you're a human, aren't you?"],
        undyne1l: ['<25>{*}{#p/kidd}{#f/7}* RUUUUUUUUUUUN!{^20}{%}'],
        undyne1m: ['<25>{#p/kidd}{#f/2}* Phew...'],
        undyne1n: ['<25>{#p/kidd}{#f/1}* Uh, you can step off the platform now.'],
        undyne1o: ["<25>{#p/kidd}{#f/4}* Where'd she go...?"],
        undyne1p: ['<25>{#p/kidd}{#f/7}* AH!{^10}{%}'],
        undyne1q: ['<25>{#p/kidd}{#f/2}* Psst, I think we can sneak past her.\n* Come on!'],
        undyne1r: ["<25>{#p/kidd}{#f/4}* It's dark...", '<25>{#p/kidd}{#f/7}* ... but we have to keep going forward!'],
        undyne1s: ['<25>{#p/kidd}{#f/7}* Quick, into the conveniently-placed plants!'],
        undyne2a: [
            '<25>{#p/kidd}{#f/7}* She... she...',
            '<25>{#f/7}* She TOUCHED me!!',
            "<25>{#f/4}* ...\n* Guess we're BOTH lucky, then, huh?",
            "<25>{#f/5}* Things could've gotten real bad if she saw you."
        ],
        undyne2ax: () => [
            '<25>{#p/kidd}{#f/1}* She... she...',
            "<25>{#f/1}* She's NOWHERE to be found!?",
            '<25>{#f/3}* Have you guys seen her ANYWHERE out here?',
            '<25>{#p/asriel2}{#f/3}* Who, Undyne?',
            "<25>{#p/kidd}{#f/1}* Yeah!\n* I've been looking around for AGES!",
            '<25>{#p/asriel2}{#f/2}* (Hee hee hee...)',
            '<25>{#p/kidd}{#f/4}* Huh??',
            '<25>{#p/asriel2}{#f/4}* Nothing.',
            '<25>{#f/13}* Say, wanna join us for a bit?',
            '<25>{#p/kidd}{#f/3}* Y... you want me to join you?',
            "<25>{#p/asriel2}{#f/4}* Yeah, why not.\n* It'll be fun, I think.",
            "<25>{#p/kidd}{#f/4}* Uh...\n* I don't know...",
            ...(SAVE.flag.n.genocide_milestone < 5
                ? [
                    '<25>{#p/asriel2}{#f/15}* Well, did you know Dr. Alphys likes Undyne?',
                    '<25>* Like, she likes her... a LOT.'
                ]
                : [
                    '<25>{#p/asriel2}{#f/9}* Well, did you know Dr. Alphys is actually stronger than Undyne?',
                    "<25>{#f/5}* Alphys's problem is that she's usually too scared to do anything!"
                ]),
            '<25>{#p/kidd}{#f/7}* What!?\n* No way...',
            "<25>{#p/asriel2}{#f/1}* Yeah, and that's not the only thing I know about those two.",
            '<25>{#p/kidd}{#f/7}* Tell me more!',
            '<25>{#p/asriel2}{#f/5}* Okay, okay...\n* But only if you come with $(name) and me.',
            '<25>{#p/kidd}{#f/1}* Deal!\n* Haha.',
            '<25>{#f/2}* ...'
        ],
        undyne2b: ['<25>{#p/kidd}{#f/1}* Yo, what are you waiting for?'],
        undyne2bx: ["<25>{#p/kidd}{#f/1}* Let's go!"],
        undyne2c: [
            '<25>{#f/3}* Hey... I know we only just met, but...',
            "<25>{#f/4}* I don't want Undyne to hurt you...",
            '<25>* ...',
            "<25>{#f/2}* Why don't we stick together for a while?",
            "<25>{#f/1}* Come on, it'll be fun!"
        ],
        undyne2cx: [
            '<25>{#p/kidd}{#f/2}* Man, you shoulda SEEN her during human- chasing practice...',
            '<25>{#f/1}* She was throwing like, a MILLION spears a second!'
        ],
        undyne2d: ["<25>{#f/1}* I'm right behind you!"],
        undyne2dx: () => [
            '<25>{#p/kidd}{#f/2}* And when the target was about to get away...',
            '<25>{#f/1}* She nailed it at the VERY last moment!',
            ...(SAVE.flag.n.ga_asrielKidd2++ < 1
                ? ['<25>{#p/asriel2}{#f/6}* Good for her, I guess.', '<25>{#p/kidd}{#f/1}* Yeah!!']
                : [])
        ],
        undyne2ex: [
            '<25>{#p/kidd}{#f/4}* Wait...',
            "<25>* If Undyne's not here, who's going to protect us from those baddies?",
            '<25>{|}{#f/8}* You know...\n* The ones who- {%}',
            "<25>{#p/asriel2}{#f/4}* I wouldn't worry about it.",
            '<25>{#f/3}* Besides, if Undyne is as tactically skilled as you say...',
            "<25>{#f/4}* Then clearly she must have a reason.\n* She's smart, right?",
            "<25>{#p/kidd}{#f/4}* Yeah...\n* That's true...",
            '<25>{#p/kidd}{#f/2}* Well, thanks for taking me along, you guys.',
            "<25>{#p/asriel2}{#f/10}* Sure...?\n* We haven't gotten THAT far, you know...",
            '<25>{#p/kidd}{#f/3}* Well, yeah, but like, I barely get time away from my parents, so...',
            "<25>{#p/asriel2}{#f/8}* You have parents?\n* That's new.",
            "<25>{#p/kidd}{#f/7}* Uh, o-of course I have parents, who doesn't??",
            '<25>{#p/asriel2}{#f/16}* ...\n* Right.'
        ],
        undynefinal1a: () =>
            respecc()
                ? ['<32>{#p/undyne}* Seven.', '<32>* Seven human SOULs, and...', '<32>* ...']
                : [
                    '<32>{#p/undyne}* Seven.',
                    '<32>* Seven human SOULs, and {@fill=#f00}King ASGORE{@fill=#fff} will become a god.',
                    '<32>{#x1}* Six.',
                    "<32>{#x1}* That's how many we have collected thus far.",
                    '<32>{#x1}* Understand?',
                    '<32>{#x1}* Through your seventh and final SOUL, monsters will finally go free.',
                    '<32>{#x3}* First, however, as is customary for those who make it this far...',
                    '<32>{#x4}* I must tell you the tragic tale of our people.',
                    '<32>{#x5}* It all began long ago, when...'
                ],
        undynefinal1b: () => (respecc() ? ['<32>{#p/undyne}* No...'] : ['<32>{#p/undyne}* You know what?']),
        undynefinal1c: () =>
            respecc() ? ['<32>{*}{#p/undyne}{#i/2}* NO!!{^999}'] : ['<32>{*}{#p/undyne}{#i/2}* SCREW IT!!{^999}'],
        undynefinal1d: () =>
            respecc()
                ? ['<32>{*}{#p/undyne}{#i/1}* HOW COULD I TALK DOWN TO YOU LIKE THAT!!{^999}']
                : ['<32>{*}{#p/undyne}{#i/1}* WHY SHOULD I TELL YOU THAT STORY!!{^999}'],
        undynefinal1e: () =>
            respecc()
                ? ["<32>{*}{#p/undyne}{#i/1}* AFTER YOU'VE FOUGHT SO HONORABLY!!{^999}"]
                : ["<32>{*}{#p/undyne}{#i/1}* WHEN YOU'RE ABOUT TO DIE!!{^999}"],
        undynefinal1f: ['<32>{*}{#p/undyne}{#i/2}* NGAHHHHHHHHHHHH!!!{^999}'],
        undynefinal1g: () =>
            respecc()
                ? [
                    '<25>{#p/undyne}{#f/1}* LISTEN UP!',
                    '<25>* I like the way you fight.',
                    "<25>{#f/16}* Like any good warrior, you fight until your enemy's been crushed...",
                    '<25>{#f/17}* ... and then you spare them, so they can live to tell the tale!',
                    '<25>{#f/10}* What courage...'
                ]
                : [
                    '<25>{#p/undyne}{#f/1}* HUMAN!',
                    "<25>* YOU'RE standing in the way of EVERYBODY's hopes and dreams!",
                    "<25>{#f/11}* Alphys's history films made me think humans were cool...",
                    '<25>{#f/16}* ... with their living spacecraft and inter- dimensional portals.',
                    '<25>{#f/4}* But YOU???'
                ],
        undynefinal2a: () =>
            respecc()
                ? [
                    '<25>{#f/1}* I guess I should apologize for how I acted back there.',
                    '<25>{#f/16}* You and your friend were just standing up for each other, right?',
                    '<25>{#f/1}* Well, I can respect that sort of thing.',
                    "<25>{#f/17}* And then there's the local ELITE squad!",
                    "<25>{#f/9}* I'll admit, I was impressed...",
                    ...(SAVE.data.n.state_foundry_doge === 2 && SAVE.data.n.state_foundry_muffet === 2
                        ? [
                            '<25>* The way you managed to not only get past them...',
                            '<25>{#f/10}* But BEFRIEND them???',
                            "<25>{#f/1}* I guess I shouldn't be surprised, though.\n* They'd like your style."
                        ]
                        : SAVE.data.n.state_foundry_doge === 3 && SAVE.data.n.state_foundry_muffet === 3
                            ? [
                                '<25>{#f/10}* The way you managed to EMBARRASS them?',
                                "<25>{#f/11}* I don't think I've ever seen those two so red-faced."
                            ]
                            : [
                                '<25>{#f/10}* Even when faced with their blades, you still held your nerve?',
                                '<25>{#f/1}* I guess you really are something special!'
                            ]),
                    '<25>{#f/8}* ... BUT GETTING BACK TO MY POINT!',
                    '<25>{#f/1}* So, at first, I was just going to kill you and take your SOUL.',
                    '<25>{#f/11}* But after seeing the way you fight...',
                    "<25>{#f/8}* THERE'S NO WAY I'D GO SO EASY ON YOU!!!",
                    "<25>{#f/1}* No... I want you to show me what you're REALLY made of!",
                    "<25>{#f/4}* And only once I've beaten you fair and square...",
                    "<25>{#f/5}* Will I finally claim the freedom that's rightfully ours!",
                    '<25>{#f/16}* But, if you manage to beat me...',
                    "<25>{#f/9}* I'll let you through.",
                    '<25>{#f/8}* ... IF you actually manage to beat me!!!',
                    "<25>{#f/1}* Step forward when you're ready!\n* Fuhuhuhu!"
                ]
                : [
                    "<25>{#f/7}* You're just a COWARD!",
                    ...(SAVE.data.b.f_state_kidd_betray
                        ? [
                            '<25>{#f/16}* Remember that friend of yours from earlier?',
                            '<25>{#f/17}* The one you ABANDONED?',
                            "<25>{#f/13}* Even when their life was in danger, you didn't bat an eye.",
                            ...(world.trueKills === 0 && SAVE.data.n.bully > 9
                                ? [
                                    "<25>{#f/9}* Maybe if you had, your fighting style would've earned my respect.",
                                    "<25>{#f/16}* But it'd be naive to think you've got any sort of honor NOW."
                                ]
                                : ['<25>{#f/16}* Typical human.\n* Always quick to stab people in the back.']),
                            "<25>{#f/4}* But that's fine...\n* I didn't need you to be some kind of saint...",
                            '<25>{#f/7}* BECAUSE ALL THAT MATTERS IS YOUR SOUL!'
                        ]
                        : [
                            '<25>* Hiding behind that kid so you could run away from me again!',
                            "<25>{#f/9}* I'll admit, I was impressed...",
                            ...(SAVE.data.n.state_foundry_doge === 2 && SAVE.data.n.state_foundry_muffet === 2
                                ? [
                                    '<25>* The way you managed to not only get past the local ELITE squad...',
                                    '<25>{#f/10}* But BEFRIEND them???',
                                    "<25>{#f/11}* You've got cojones, punk.",
                                    '<25>{#f/8}* ... NOT THAT IT ACTUALLY MATTERS!'
                                ]
                                : SAVE.data.n.state_foundry_doge === 3 && SAVE.data.n.state_foundry_muffet === 3
                                    ? [
                                        '<25>{#f/10}* The way you managed to EMBARRASS the local ELITE squad?',
                                        "<25>{#f/11}* I don't think I've ever seen those two so red-faced.",
                                        "<25>{#f/8}* ... AS IF THAT'D WORK ON ME!"
                                    ]
                                    : [
                                        "<25>{#f/10}* The way you've managed to get through without killing anyone?",
                                        "<25>{#f/11}* Congratulations, punk.\n* You're a little nicer than the average human.",
                                        '<25>{#f/8}* ... AS IF I CARE!'
                                    ]),
                            '<25>{#f/4}* You know what would be more valuable to everyone?',
                            '<25>{#f/7}* IF YOU WERE DEAD!'
                        ]),
                    '<25>{#f/17}* Your life is all that stands between us and our freedom!',
                    "<25>{#f/1}* Right now, I can feel everyone's minds racing together!",
                    "<25>* Everyone's been waiting their whole lives for this moment!",
                    "<25>{#f/9}* But we're not nervous at all.",
                    "<25>{#f/17}* When everyone puts their minds together, they can't lose!",
                    "<25>{#f/1}* Now, human!\n* Let's end this, right here, right now!",
                    "<25>{#f/17}* I'll show you how determined monsters can truly be!",
                    "<25>{#f/1}* Step forward when you're ready!\n* Fuhuhuhu!"
                ],
        undynefinal2b1: ["<25>{#f/7}* You're just a ruthless MURDERER!"],
        undynefinal2b1a: ['<25>{#f/11}* Self-defense?\n* Please.'],
        undynefinal2b1b: [
            "<25>{#f/11}* What? You thought I'd overlook what you were up to in the Outlands?",
            '<25>{#f/1}* Fuhuhu... think again.'
        ],
        undynefinal2b2: () => [
            world.trueKills === 1
                ? "<25>{#f/9}* You didn't kill that monster because you had to."
                : "<25>{#f/9}* You didn't kill those monsters because you had to.",
            '<25>{#f/11}* You did it because it was EASY for you.\n* Because it was FUN.',
            '<25>{#f/16}* Do you think it was fun when I found out?'
        ],
        undynefinal2b2a: [
            '<25>{#f/9}* The canine unit.\n* The local ELITE squad.\n* And many others, too...',
            '<25>* Almost everyone I know and love, dead just like that.'
        ],
        undynefinal2b2b: [
            '<25>{#f/9}* The canine unit, AND the local ELITE squad...',
            "<25>* People I've served with for years, gone in the blink of an eye."
        ],
        undynefinal2b2c: [
            '<26>{#f/9}* The local ELITE squad, who dedicated their lives to service...',
            '<25>* Gone in one fell swoop.'
        ],
        undynefinal2b2d: [
            '<25>{#f/9}* The canine unit, who protected that little town for years...',
            '<25>* Gone without a trace.'
        ],
        undynefinal2b2e: [
            '<26>{#f/9}* That ghost, who wanted nothing more than to fuse with their dummy...',
            '<25>* Erased in a mere moment.'
        ],
        undynefinal2b2f: [
            '<25>{#f/9}* That spider, who only wanted to protect and care for the clans...',
            "<25>* Not only is she dead, but spiders' lives are in jeopardy."
        ],
        undynefinal2b2g: [
            '<25>{#f/9}* Doge, who had a strong and unwavering sense of duty...',
            "<25>* Even if putting her life at risk was her job, she's still dead."
        ],
        undynefinal2b2h: [
            '<25>{#f/9}* That big dog, one of the kindest and sweetest dogs ever...',
            '<25>* Eliminated before his time.'
        ],
        undynefinal2b2i: [
            '<25>{#f/9}* Those two dogs, caring for each other through thick and thin...',
            '<25>* Their love and legacy, ripped away in an instant.'
        ],
        undynefinal2b2j: [
            '<25>{#f/9}* That little dog who wanted nothing more than to be pet...',
            '<25>* Only to be met with a ruthless attack.'
        ],
        undynefinal2b2k: [
            '<25>{#f/9}* Doggo, who I PERSONALLY looked after for some time...',
            '<25>* Now dead thanks to the whims of a single human.'
        ],
        undynefinal2b2l: [
            "<25>{#f/9}* That woman in the Outlands... I didn't know her, but...",
            "<25>* She hasn't been seen since you arrived in Starton."
        ],
        undynefinal2b2m: [
            '<25>{#f/9}* Every. Single. Monster. Who spent their lives in the factory...',
            '<25>* Only to have it all snatched away.'
        ],
        undynefinal2b2n: [
            '<25>{#f/9}* Every. Single. Monster. Who lived peacefully in Starton...',
            '<25>* Only to meet an untimely end.'
        ],
        undynefinal2b2o: [
            '<25>{#f/9}* Those monsters who spent their lives here in the factory...',
            '<25>* Only to have it all be undone.'
        ],
        undynefinal2b2p: [
            '<25>{#f/9}* Those monsters who lived peacefully in Starton...',
            '<25>* Slaughtered in cold blood.'
        ],
        undynefinal2b2q1: [
            '<25>{#f/9}* One monster dead from each area thus far...',
            "<25>{#f/13}* It's like you have some kind of per-area kill quota."
        ],
        undynefinal2b2q2: [
            '<25>{#f/9}* Two monsters dead from each area thus far...',
            "<25>{#f/13}* It's like you have some kind of per-area kill quota."
        ],
        undynefinal2b2q3: [
            '<25>{#f/9}* Three monsters dead from each area thus far...',
            "<25>{#f/13}* It's like you have some kind of per-area kill quota."
        ],
        undynefinal2b2q4: [
            '<25>{#f/9}* Four monsters dead from each area thus far...',
            "<25>{#f/13}* It's like you have some kind of per-area kill quota."
        ],
        undynefinal2b2q5: [
            '<25>{#f/9}* Five monsters dead from each area thus far...',
            "<25>{#f/13}* It's like you have some kind of per-area kill quota."
        ],
        undynefinal2b2r: () => [
            world.trueKills === 1
                ? "<26>{#f/9}* That monster in the Outlands... I didn't really know them, but..."
                : "<26>{#f/9}* Those monsters in the Outlands... I didn't really know them, but...",
            "<25>* Thanks to you, they're dead now."
        ],
        undynefinal2b2s: [
            '<25>{#f/9}* Even if it was just one monster...',
            "<25>* That's still one less SOUL that'll get to see the stars one day."
        ],
        
        undynefinal2b2t: [
            '<25>{#f/9}* At least two monsters left home for the last time today.',
            '<25>* Thanks to you, their families will never see them again.'
        ],
        undynefinal2b2u1: [
            '<25>{#f/9}* That big dog, who enjoyed the company of his comrades...',
            '<25>* Awakening to find them dead.'
        ],
        undynefinal2b2u2: [
            '<25>{#f/9}* Those two dogs, always looking out for the other canines...',
            "<25>* Only to discover there's nobody to look out for anymore."
        ],
        undynefinal2b2u3: [
            '<25>{#f/9}* That little dog who mostly kept to itself...',
            "<26>* The other dogs' deaths might not bother it now, but they will someday."
        ],
        undynefinal2b2u4: [
            '<25>{#f/9}* Doggo, who spent years to find a home in the canine unit...',
            '<25>* Only to have it all ripped away again.'
        ],
        undynefinal2b2v1: [
            '<25>{#f/9}* That big dog, as well as Dogamy and Dogaressa...',
            '<25>* All wiped from the face of Starton.'
        ],
        undynefinal2b2v2: [
            '<25>{#f/9}* Both the big dog, and the little dog...',
            '<25>{#f/13}* So, according to you, only the average-sized dogs get to live.'
        ],
        undynefinal2b2v3: [
            '<25>{#f/9}* That big dog, along with Doggo, too...',
            '<25>* Both dead thanks to the whims of a single human.'
        ],
        undynefinal2b2v4: [
            '<25>{#f/9}* Those two dogs, always looking out for the other canines...',
            '<25>* Not only are THEY dead, but a little dog they looked after is, too.'
        ],
        undynefinal2b2v5: [
            '<25>{#f/9}* Those two dogs, always looking out for the other canines...',
            '<25>* They, along with Doggo who they looked after, are all dead.'
        ],
        undynefinal2b2v6: [
            '<25>{#f/9}* That little dog, as well as its comrade Doggo...',
            '<25>* Both dead thanks to the whims of a single human.'
        ],
        undynefinal2b3: () => [
            "<25>{#f/11}* Do you think that's FUN?",
            '<25>* ...',
            '<25>{#f/17}* Well guess what, punk.',
            ...(SAVE.data.n.state_foundry_muffet === 1
                ? ["<25>* No phone call's gonna save you THIS time."]
                : ['<25>* Your time is UP.']),
            '<25>{#f/4}* All the pain you inflicted on the fallen...',
            "<25>{#f/7}* Every hope, every dream you've turned to dust...",
            "<25>{#f/1}* This hero's gonna send it all right back through her spear!",
            '<25>{#f/4}* NGAHHH!!!',
            "<25>{#f/5}* I'll show you how determined monsters truly are!",
            "<25>{#f/17}* Come on!\n* Step forward and let's end this!"
        ],
        undynefinal2c1: ['<32>* ...', '<32>* Forget it.'],
        undynefinal2c2: () => [
            '<25>{#f/16}{#x1}* Look.',
            "<25>* Papyrus didn't come to his meeting today.",
            '<25>{#f/19}* ...',
            '<25>{#x2}* Say what you want about him.',
            "<25>{#f/18}* He's weird, he's naive, he's self-absorbed...",
            '<25>{#f/20}{#x3}* But Papyrus has NEVER missed a meeting.',
            '<25>{#f/18}{#x4}* And no matter what time you call him on the phone...',
            '<25>{#f/20}{#x5}* He ALWAYS answers within the first two rings.',
            '<25>* ...',
            "<25>{#f/18}{#x6}* But now he's gone.",
            "<25>{#f/22}{#x7}* And his brother isn't around, either.",
            '<25>* ...',
            '<25>{#f/18}* What did you do to him?',
            '<25>{#f/11}{#x8}* What did you DO TO HIM?',
            ...((SAVE.data.n.state_foundry_doge === 1 ? 1 : 0) +
                (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) +
                (SAVE.data.n.state_starton_dogs === 2 ? 2 : 0) +
                (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) >
                1
                ? [
                    '<25>{#f/16}{#x9}* And those missing members of the guard...',
                    '<25>{#f/13}* Did you do the same thing to THEM?'
                ]
                : [
                    '<25>{#f/16}{#x9}* Papyrus, who I have trained every day...',
                    "<25>{#f/19}* Even though I KNOW he's too goofy to ever hurt anyone..."
                ]),
            '<25>* ...',
            '<25>{#f/16}{#x10}* Go ahead.\n* Prepare however you want.',
            '<25>{#f/20}* But when you step forward...',
            '<25>{#f/11}{#x11}* I will KILL you.'
        ],
        undynefinal3: () => [
            ...(SAVE.data.n.state_starton_papyrus === 1
                ? ['<25>{#p/undyne}{#f/21}* Alright, then.', '<25>{#f/19}* ...']
                : world.trueKills > 1
                    ? ['<25>{#p/undyne}{#f/11}* You asked for it, punk.', '<25>{#f/9}* Ready or not...']
                    : respecc()
                        ? ["<25>{#p/undyne}{#f/1}* That's it, then...!", "<25>{#f/17}* It's time you met your one true equal!"]
                        : ["<25>{#p/undyne}{#f/1}* That's it, then...!", '<25>{#f/17}* No more running away!'])
        ],
        undynefinal3x: ['<25>{#f/7}{*}* HERE I COME!!!!!!!{#x1}{^999}'],
        undynehouse1: ["<32>{#p/basic}* Está trancando."],
        undynehouse2: () =>
            SAVE.data.b.svr || world.runaway
                ? ["<32>{#p/human}* (You can't seem to find a way in.)"]
                : SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}* First, the goat family...\n* Then, the spider queen...',
                        '<32>* And now, the fish lady...',
                        "<32>* I'll miss her... just like I'm going to miss being here...",
                        "<32>* But maybe... I've inhabited this house for too long...",
                        "<32>* Maybe I'll be happier if I spend time... somewhere new..."
                    ]
                    : ["<32>{#p/basic}* It's literally on fire.\n* You're not getting in there."],
        walktext: {
            bird: () => [
                '<25>{#p/kidd}{#f/4}* Dead end...',
                world.genocide
                    ? "<25>{#f/3}* The bird must've carried him across the gap by now, haha."
                    : '<25>{#f/3}* The bird must be busy right now, haha.'
            ],
            birdx: ['<32>{#p/basic}* ... but nobody came.'],
            path1: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        "<25>{#p/kidd}{#f/8}* I feel like I'm gonna puke...",
                        SAVE.data.n.state_foundry_kidddeath > 5
                            ? '<25>* We killed so many monsters...'
                            : SAVE.data.n.state_foundry_kidddeath > 1
                                ? '<25>* We killed other monsters...'
                                : '<25>* We killed a monster...'
                    ]
                    : [
                        '<25>{#p/kidd}{#f/1}* Did I ever tell you about how we got shuttle pilot lessons!?',
                        '<25>{#p/kidd}{#f/7}* It was EPIC!'
                    ],
            path2: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        SAVE.data.b.f_state_kidd_fight
                            ? '<25>{#p/kidd}{#f/4}* I mean, you TOLD me to fight...'
                            : '<25>{#p/kidd}{#f/4}* I mean, you did ALL the attacking...',
                        '<25>{#p/kidd}{#f/8}* But did you really...\n* ... m-mean to do...\n* ... that...?'
                    ]
                    : [
                        '<25>{#p/kidd}{#f/2}* One day, that short skeleton and his brother subbed in...',
                        '<25>{#p/kidd}{#f/2}* And, this is a secret, but...',
                        '<25>{#f/1}* They let me fly around the outpost all by MYSELF!!'
                    ],
            path3: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<25>{#p/kidd}{#f/4}* I never wanted to hurt anyone, I just...\n* I...',
                        '<25>{#p/kidd}{#f/8}* I just wanna wake up...\n* Please... let it all be a bad dream...'
                    ]
                    : [
                        "<25>{#p/kidd}{#f/1}* Maybe one day I'll be a real pilot, with my own starship.",
                        "<25>{#p/kidd}{#f/1}* It'd have FLAMES painted on the side, and HUGE wings, and...",
                        "<25>{#p/kidd}{#f/6}* Man, that'd be so cool..."
                    ],
            path4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<25>{#p/kidd}{#f/8}* I...', '<25>{#f/8}* I...', "<25>{#f/5}* I'm just... \n* ... gonna be quiet."]
                    : [
                        '<25>{#p/kidd}{#f/2}* We could go anywhere in the universe, dude...',
                        '<25>{#p/kidd}{#f/1}* And the best part?\n* No more school, like, EVER!'
                    ],
            path5: ['<25>{#p/kidd}{#f/4}* Wait...'],
            path6: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        "<25>{#p/kidd}{#f/8}* You can't get over that gap alone, dude...",
                        '<25>{#p/kidd}{#f/8}* ...',
                        '<25>{#p/kidd}{#f/5}* ... let me help.'
                    ]
                    : [
                        '<25>{#p/kidd}{#f/2}* You sure you can get across that gap?',
                        '<25>{#p/kidd}{#f/1}* Yo, let me help you!'
                    ],
            path7: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<25>{#p/kidd}{#f/8}* Climb on.']
                    : ['<25>{#p/kidd}{#f/1}* Climb on!'],
            path8: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<25>{#p/kidd}{#f/4}* ...\n* Well...',
                        '<25>{#f/8}* If you never see me again...\n* Tell my parents...',
                        "<25>{#f/5}* ...\n* They're better off without me."
                    ]
                    : ["<25>{#p/kidd}{#f/1}* Don't worry, dude!\n* I always find my own way around!"],
            prechase: [
                '<25>{#p/kidd}{#f/4}* Hey... uh...\n* This place gives me the creeps.',
                '<25>{#f/3}* Can we turn around now?'
            ],
            rescue1: () => [
                "<25>{#p/kidd}{#f/7}* Undyne, please!\n* They're my friend!",
                world.dead_skeleton || geno() || world.population < 4
                    ? "<32>{#p/undyne}* No, they're not.\n* You really shouldn't be with them, kiddo."
                    : "<32>{#p/undyne}* Go home, kiddo.\n* You don't belong with them."
            ],
            rescue2: ['<25>{*}{#p/kidd}{#f/8}* Undyne...{#x1}{^20}{%}'],
            rescue3: [
                "<25>{*}{#p/kidd}{#f/13}* I promise, I... I-I'll come back for you!{^20}{%}",
                "<25>{*}{#p/kidd}{#f/13}* Don't die, okay?{^20}{%}"
            ],
            snailcom: [
                '<25>{#p/kidd}{#f/9}* That ghost and I played electrosnail here one time...',
                '<25>* Have you ever...?',
                '<25>{#p/asriel2}{#f/10}* Um... no?',
                '<25>{#f/4}* Not in this timeline, anyway.',
                '<25>{#p/kidd}{#f/9}* Timeline?'
            ],
            trashcom: [
                '<25>{#p/asriel2}{#f/13}* Oh, hey...\n* This is where we...',
                '<25>{#f/13}* Where you...',
                '<25>{#f/15}* ...',
                '<25>{#f/16}* Oh, $(name)...',
                '<25>{#p/kidd}{#f/9}* ...?',
                "<25>{#p/asriel2}{#f/6}* It's nothing.",
                "<25>{#f/7}* Just a little reminder, that's all.",
                '<25>{#p/kidd}{#f/9}* Oh...'
            ],
            undynecom: [
                "<25>{#p/kidd}{#f/11}* Oh, it's...\n* This is Undyne's house...!",
                "<25>{#p/asriel2}{#f/8}* Thankfully, Undyne's not here right now.",
                '<25>{#f/6}* If all goes to plan, she never will be again.'
            ]
        },
        watercooler1: () => [
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* (The label describes using this fluid only in a specific kind of emergency.)']
                : [
                    "<32>{#p/basic}* It's a cooler full of electro- dampening fluid with an oddly specific warning label.",
                    '<32>{#p/basic}* \"Use only to negate electro- static interference with portable jetpacks.\"'
                ]),
            choicer.create('* (Get a cup?)', 'Sim', 'Não')
        ],
        watercooler2a: ['<32>{#p/human}* (You now hold a cup of the electro-dampening fluid.)'],
        watercooler2b: ['<32>{#p/human}* (You decide not to get a cup.)'],
        watercooler3: () => [
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* (The label describes using this fluid only in a specific kind of emergency.)']
                : [
                    "<32>{#p/basic}* It's a cooler full of electro- dampening fluid with an oddly specific warning label.",
                    '<32>{#p/basic}* \"Use only to negate electro- static interference with portable jetpacks.\"'
                ]),
            '<32>{#p/human}* (You already have a cup.)'
        ]
    },

    b_group_foundry: {
        moldsmalMoldbygg1: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Holy moldy!']
                : ["<32>{#p/story}* It's a gelatin festival!"],
        moldsmalMoldbygg2a: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* One left.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Just us now!']
                    : ['<32>{#p/story}* Gelata is all alone now.'],
        moldsmalMoldbygg2b: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* One left.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Just us now!']
                    : ['<32>{#p/story}* Gelatini now blorbs solo.'],
        woshuaMoldbygg2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Talk about a contradiction.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Woah, hello...']
                    : ['<32>{#p/story}* Skrubbington straddles up.\n* Much to its dismay, Gelata is also here...'],
        woshuaMoldbygg2a: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* One left.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Just us now!']
                    : ['<32>{#p/story}* Gelata is all alone now.'],
        woshuaMoldbygg2b: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* One left.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Just us now!']
                    : ['<32>{#p/story}* Skrubbington is not sure how to feel anymore.']
    },
    b_opponent_woshua: {
        tweet: 'tweet',
        epiphany: [
            ['<08>{#p/basic}{~}Skrubby accepts your mercy.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Skrubby will retreat now..', '<08>{#p/basic}{~}Thx for warning!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Skrub u entire body..', '<08>{#p/basic}{~}Special service just for you!']
                        : SAVE.data.b.oops
                            ? [
                                '<08>{#p/basic}{~}Even if u get dirty sometimes..',
                                '<08>{#p/basic}{~}Skrubby will be there to clean u.'
                            ]
                            : ['<08>{#p/basic}{~}Skrubby accepts hug..', '<08>{#p/basic}{~}Regard- less if u are clean or dirty.'],
            ['<08>{#p/basic}{~}Skrubby knows what must be done.', '<08>{#p/basic}{~}Thx for showing me the way.'],
            ['<08>{#p/basic}{~}Okie.\nTake u G.']
        ],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Skrubbington, the clean freak.\n* Can't handle seeing more than a speck of dirt."]
                : [
                    '<32>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* This humble germophobe seeks to cleanse the whole galaxy.'
                ],
        act_check2: [
            '<33>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* This humble germophobe wants to go home to wash its wounds.'
        ],
        act_check3: [
            '<32>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* One wheel closer to a cleaner future for monsterkind.'
        ],
        act_check4: [
            "<32>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* This humble germophobe's love story is as soapy as it gets."
        ],
        name: '* Skrubbington',
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Skrubbington.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Skrubby's here!"]
                    : ['<32>{#p/story}* Skrubbington strolls in.'],
        idleTalk1a: ['<08>{#p/basic}{~}Skrub u SOUL'],
        idleTalk1b: ['<08>{#p/basic}{~}Skrub u hands'],
        idleTalk1c: ['<08>{#p/basic}{~}Skrub u face'],
        idleTalk1d: ['<08>{#p/basic}{~}Skrub u hair'],
        idleTalk1e: ['<08>{#p/basic}{~}Skrub u feet'],
        idleTalk2a: ['<08>{#p/basic}{~}Skrub a dub-dubs'],
        idleTalk2b: ['<08>{#p/basic}{~}Oops, I meant..\nSkrub a sub-SUBS'],
        idleTalk2c: ['<08>{#p/basic}{~}Skrub a sub-subs'],
        idleTalk3: () =>
            world.trueKills > 0 ? ['<08>{#p/basic}{~}Your SOUL is unclean.'] : ['<08>{#p/basic}{~}\x00*whistle whistle*'],
        cleanTalk: ['<08>{#p/basic}{~}Green means clean'],
        jokeTalk1: ["<08>{#p/basic}{~}NO. THAT JOKE'S TOO.. DIRTY"],
        jokeTalk2: ["<08>{#p/basic}{~}EUGH.. I CAN'T BELIEVE THIS"],
        randStatus1: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Look at the little bird!']
                : ['<32>{#p/story}* Skrubbington is friends with a little bird.'],
        randStatus2: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* You should've SEEN when it tried to clean my school lunch off."]
                : ['<32>{#p/story}* Skrubbington is rinsing off a saucer.'],
        randStatus3: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<33>{#p/kidding}* We should go spacesuit-shining with this one.']
                : ['<32>{#p/story}* Skrubbington is looking for some good clean fun.'],
        randStatus4: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Squeaky clean?\n* This is gonna be FREAKY clean.']
                : ['<32>{#p/story}* Smells like detergent.'],
        randStatus5: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* You do NOT wanna get dirty around this one, dude.']
                : ['<32>{#p/story}* Skrubbington wonders if stardust is sanitary.'],
        hurtStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Is... everything okay?']
                : ['<32>{#p/story}* Skrubbington is revolted at its own wounds.'],
        jokeText1: ['<32>{#p/human}* (You tell a joke about a rusty piece of space junk.)'],
        jokeText2: ['<32>{#p/human}* (You tell a joke about atmospheric pollution.)'],
        jokeText3: ['<32>{#p/human}* (You tell a joke about two starships that got stuck in a trash barge.)'],
        touchText0: [
            '<32>{#p/human}* (You give Skrubbington a friendly pat.)',
            "<32>{#p/basic}* Skrubbington can't stand your slime-covered hands and runs away!"
        ],
        touchText1: [
            '<32>{#p/human}* (You give Skrubbington a friendly pat.)',
            '<32>{#p/basic}* Skrubbington recoils from your touch.'
        ],
        touchText2: [
            '<32>{#p/human}* (You give Skrubbington a friendly pat.)',
            '<32>{#p/basic}* Skrubbington is flattered.'
        ],
        cleanText1: [
            '<32>{#p/human}* (You ask Skrubbington to clean you.)',
            '<32>{#p/basic}* Skrubbington hops around excitedly.'
        ],
        flirtTalk1: ['<08>{#p/basic}{~}No!\nUnclean romance!'],
        flirtTalk2: ['<08>{#p/basic}{~}Sparkle and shine!'],
        cleanText2: [
            '<32>{#p/human}* (You ask Skrubbington to clean you.)',
            '<32>{#p/basic}* Skrubbington resumes cleaning.'
        ]
    },
    b_opponent_moldbygg: {
        sexyChat: ['<08>{#p/basic}{~}\x00*sexy shuffle*'],
        epiphany: [
            ['<08>{#p/basic}{~}\x00*slime sounds*'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Guoooh..']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}\x00*erotic shuffle*']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}\x00*happy shuffle*']
                            : ['<08>{#p/basic}{~}\x00*slimy embrace*'],
            ['<08>{#p/basic}{~}Final roar.'],
            ['<08>{#p/basic}{~}\x00*shiny shuffle*']
        ],
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Woah!']
                    : ['<32>{#p/story}* Gelata appears!'],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata, the slimy gelatin.\n* Why do I bother explaining these things to you.']
                : ['<32>{#p/story}* GELATA - ATK 18 DEF 18\n* Not so tini anymore.'],
        act_check2: ['<32>{#p/story}* GELATA - ATK 18 DEF 18\n* Not in the best of shape.'],
        act_check3: ['<32>{#p/story}* GELATA - ATK 18 DEF 18\n* Not against becoming a full- time jelly cushion.'],
        act_check4: ['<32>{#p/story}* GELATA - ATK 18 DEF 18\n* Not your ideal relationship...'],
        act_topple1: ["<32>{#p/human}* (You try to topple Gelata, but it hasn't been weakened enough.)"],
        act_topple2: ['<32>{#p/human}* (You topple Gelata.)\n* (Its body parts collapse and roll into the distance.)'],
        name: '* Gelata',
        idleTalk1: ['<08>{#p/basic}{~}Guoooh!'],
        idleTalk2: ['<08>{#p/basic}{~}\x00*slime sounds*'],
        idleTalk3: ['<08>{#p/basic}{~}Roar.'],
        idleTalk4: ['<08>{#p/basic}{~}\x00*eager shuffle*'],
        randStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* What does it want?']
                    : ['<32>{#p/story}* Gelata wants to carry you.'],
        randStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* I wonder what would happen if I hugged it.']
                    : ['<32>{#p/story}* Gelata wobbles anxiously.'],
        randStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* So icky... I love it!']
                    : ['<32>{#p/story}* Gelata mills about nearby.'],
        randStatus4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* This all seems kinda slimy.']
                    : ['<32>{#p/story}* Smells like a jell-o store.'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Almost dead.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Gelata isn't looking good..."]
                    : ['<32>{#p/story}* Gelata has seen better days.'],
        act_handshake: [
            '<32>{#p/human}* (You offer a handshake.)\n* (Gelata engulfs you in slime.)',
            '<32>{#p/story}* SPEED decreased!'
        ],
        act_sit: ['<32>{#p/human}* (You sit on top of Gelata.)\n* (Gelata now feels that it has been useful to you.)'],
        distanceStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelata.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Can I come sit too!?']
                    : ['<32>{#p/story}* Gelata seems happy with your presence.'],
        act_flirt: [
            '<32>{#p/human}* (You wiggle your hips.)\n* (Gelata does a tornado spin.)',
            '<32>{#p/basic}* A meaningful conversation...?'
        ]
    },
    b_opponent_moldfake: {
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Gelatini...\n* Something tells me this one's more than meets the eye."]
                : ['<32>{#p/story}* GELATINI - ATK 18 DEF 18\n* Not a squorch to be heard.'],
        name: '* Gelatini',
        smalTalk: ['<08>{#p/basic}{~}...'],
        status1: () => (world.goatbro ? ['<32>{#p/asriel2}* Gelatini.'] : ['<32>{#p/story}* Gelatini appears?']),
        fakeStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Do Gelatinis always sit this still?']
                    : ["<32>{#p/story}* Gelatini isn't moving."],
        fakeStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Something's off with that Gelatini..."]
                    : ['<32>{#p/story}* Gelatini is a perfectly tempered gelatin with no flaws.'],
        fakeStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Are Gelatinis always this quiet?']
                    : ["<32>{#p/story}* It's Gelatini's quiet time."],
        fakeStatus4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* This seems kinda weird.']
                    : ['<32>{#p/story}* Smells like a jell-o store.'],
        act_imitate: ['<32>{#p/human}* (You approach Gelatini.)', '<32>{#p/basic}* De repente...!'],
        act_flirt: ['<32>{#p/human}* (You wiggle your hips.)', '<32>{#p/basic}* De repente...!'],
        act_slap: ['<32>{#p/human}* (You give Gelatini a big slap.)', '<32>{#p/basic}* De repente...!']
    },
    b_opponent_shyren: {
        act_check: ['<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* A prophetic singer, held back by her own shame.'],
        act_check2: ['<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* With newfound confidence, she takes to the stage!'],
        act_check3: ['<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* With newfound confidence, she sings for the crowd!'],
        act_check4: ["<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* With newfound confidence, she's the star of the show!"],
        act_check5: ['<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* A prophetic singer, held back by fresh wounds.'],
        act_check6: ['<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* Alas, the bitter dregs of rejection.'],
        act_check7: ['<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* Suddenly, love songs.'],
        awkwardtoot: ['<08>{#p/basic}{~}(awkward toot)'],
        creepStatus: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren cowers in the corner.']
                : ["<32>{#p/kidding}* I don't think that helped..."],
        creepText1: [
            '<32>{#p/human}* (You flirt with Shyren, offering your best smile.)',
            '<32>{#p/basic}* Shyren turns away...'
        ],
        creepText2: [
            '<32>{#p/human}* (You flirt with Shyren again.)',
            '<32>{#p/basic}* Shyren is uncomfortable now, and decides to leave.'
        ],
        encourage1: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren seems much more comfortable singing along.']
                : ['<32>{#p/kidding}* A sing-along?\n* Heck yeah, dude!'],
        encourage2: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? world.genocide
                    ? SAVE.data.n.state_foundry_muffet === 1
                        ? ['<32>{#p/story}* The eerily quiet air passes behind the symphony of voices.']
                        : ["<32>{#p/kidding}* Haha, this is kinda fun!\n* Even though it's just the three of us..."]
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? ['<32>{#p/story}* A shadowy figure watches the commotion from afar.']
                        : ["<32>{#p/kidding}* Yo... uh...\n* What's that weird shadowy guy doing over there?"]
                : SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/story}* Sans is selling tickets made of carbon fiber.']
                    : ['<32>{#p/kidding}* Is that short skeleton selling TICKETS now??'],
        encourage3: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/story}* Your previous hums echo back into the room.']
                    : ['<32>{#p/kidding}* This place is so empty, we can hear ourselves from the past.\n* So trippy...']
                : SAVE.data.n.state_foundry_muffet === 1
                    ? ["<32>{#p/story}* The crowd tosses clothing.\n* It's a storm of cotton balls."]
                    : ['<32>{#p/kidding}* Woah, so many people!'],
        encourage4: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren thinks about her future.']
                : ['<32>{#p/kidding}* One last time!\n* One last time!\n* One last time!'],
        flirtText1: ['<32>{#p/human}* (You flirt with Shyren.)\n* (Though uneasy, she blushes a little in return.)'],
        flirttoot: ['<08>{#p/basic}{~}(happy toot)'],
        hum0: ['<32>{#p/human}* (You hum a melancholy waltz.)\n* (Shyren follows your melody.)'],
        hum1: ['<32>{#p/human}* (You hum a funky tune.)\n* (Shyren follows your melody.)'],
        hum2: ['<32>{#p/human}* (You hum a bluesy song.)\n* (Shyren follows your melody.)'],
        hum3: ['<32>{#p/human}* (You hum a jazz ballad.)\n* (Shyren follows your melody.)'],
        hum4: ['<32>{#p/human}* (You hum an apology song.)\n* (Shyren calms down.)'],
        humX1: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? ['<32>{#p/human}* (You hum some more.)', "<32>{#p/basic}* It's a veritable duet!"]
                : [
                    '<32>{#p/human}* (You hum some more.)',
                    '<32>{#p/basic}* Monsters are drawn to the music.',
                    "<32>{#p/basic}* Suddenly, it's a concert..."
                ],
        humX2: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? [
                    '<32>{#p/human}* (You hum some more.)',
                    '<32>{#p/basic}* Shyren is happy to have you as her vocal partner.'
                ]
                : [
                    '<32>{#p/human}* (You hum some more.)',
                    "<32>{#p/basic}* The seats are sold out.\n* It's a rockstar performance!"
                ],
        humX3: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? [
                    '<33>{#p/human}* (You hum some more.)',
                    '<32>{#p/basic}* Even without a crowd, a dance of melody and harmony persists.'
                ]
                : [
                    '<32>{#p/human}* (You hum some more.)',
                    '<32>{#p/basic}* Despite your success, the constant attention...',
                    "<32>* The tours...\n* The groupies...\n* It's all..."
                ],
        humX4: () => [
            "<32>{#p/human}* (You and Shyren have come so far, but it's time.)",
            '<32>* (You both have your own journeys to embark on.)',
            '<32>* (You hum a farewell song.)'
        ],
        hurtStatus: ["<32>{#p/story}* Shyren's voice is raspy."],
        name: '* Shyren',
        randStatus1: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren hums very faintly.']
                : ['<32>{#p/kidding}* Are you okay?'],
        randStatus2: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren pretends to be a pop idol.']
                : ['<32>{#p/kidding}* You look sad...'],
        randStatus3: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren taps a little beat with her fins.']
                : ['<32>{#p/kidding}* Do you need any help?'],
        randStatus4: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Shyren thinks about doing karaoke by herself.']
                : ['<32>{#p/kidding}* Is there anything I can do?'],
        randStatus5: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/story}* Smells like music.']
                : ["<32>{#p/kidding}* Wait... what's with her body?"],
        sadtalk1: ['<08>{#p/basic}{~}..\n..\ntoot\n..'],
        sadtalk2: ['<08>{#p/basic}{~}..\n..\nhum hum\n..'],
        status1: () =>
            SAVE.data.n.state_foundry_muffet === 1
                ? ['<32>{#p/kidding}* No...\n* Not again...']
                : ["<32>{#p/kidding}* Yo, how's it going?\n* You look sad..."],
        talk3: ['<08>{#p/basic}{~}si re, si re, si mi, si mi'],
        talk4: ['<08>{#p/basic}{~}Si Fa Si Fa So Fa So Mi Re Re'],
        talk5: ['<08>{#p/basic}{~}Mi So Mi So Mi Si Mi La Si So'],
        talk6: ['<08>{#p/basic}{~}(pas- sionate tooting)'],
        talk7: ['<08>{#p/basic}{~}(final toot)'],
        wave1: ['<32>{#p/human}* (You wave your arms wildly.)\n* (Nothing happens.)'],
        wave2: () =>
            world.dead_skeleton || geno() || world.population < 4
                ? ['<32>{#p/human}* (You wave your arms wildly.)\n* (Nothing happens.)']
                : ['<32>{#p/human}* (You wave your arms wildly.)', '<32>{#p/basic}* The crowd eats it up!'],
        act_boo1: ['<32>{#p/human}* (You boo Shyren.)', '<32>{#p/basic}* Her head down, Shyren moves away quietly...'],
        act_boo2: [
            '<32>{#p/human}* (You boo Shyren.)',
            '<32>{#p/basic}* Shyren, seeing how you handle rejection, leaves in a huff.'
        ],
        act_boo3: [
            '<32>{#p/human}* (You boo Shyren.)',
            "<32>{#p/basic}* Shyren's fleeting joy fades just as soon as it came to her."
        ],
        act_boo4: [
            '<32>{#p/human}* (You boo Shyren.)',
            '<32>{#p/basic}* The crowd, distraught, watches as Shyren flees the scene.'
        ],
        act_boo5: [
            '<32>{#p/human}* (You boo Shyren.)',
            '<32>{#p/basic}* The betrayal brings Shyren to tears as she flees the scene.'
        ]
    },
    b_opponent_radtile: {
        epiphany: [
            ['<08>{#p/basic}{~}Until next time, G.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Huh..!\nSince when did you get scary!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}This feel- ing..', "<08>{#p/basic}{~}I mustn't resist!"]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}Yeah..\nWe make a pretty radical team.']
                            : ["<08>{#p/basic}{~}It's so comfort- able.."],
            ['<08>{#p/basic}{~}At least my end will serve a purpose.', "<08>{#p/basic}{~}Peace 'n' tran- quility, G."],
            ["<08>{#p/basic}{~}Here's your G, my G!"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Radtile, the \"cool crocodile.\"\n* Funny, considering how un-cool he actually is.']
                : ['<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* A stargazer in starglasses.\n* Favorite genre: Kriobeat'],
        act_check2: ["<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* Things aren't looking so hot for this cool crocodile."],
        act_check3: ['<33>{#p/story}* RADTILE - ATK 24 DEF 12\n* This cool crocodile is on fire.'],
        act_check4: [
            '<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* When it comes to romance, this cool crocodile is stone cold.'
        ],
        name: '* Radtile',
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Radtile.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Not this guy...']
                    : ['<32>{#p/story}* Radtile makes an impression!'],
        randStatus1: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* That sure is an interesting hat he's got on his head."]
                : ['<32>{#p/story}* Radtile adjusts his hat.'],
        randStatus2: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Everyone around here just loves Raddy's little mirror."]
                : ['<32>{#p/story}* Radtile looks deeply into his mirror image.'],
        randStatus3: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* What's he doing, anyway?"]
                : ['<32>{#p/story}* Radtile is making gestures to improve his cool factor.'],
        randStatus4: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* I wonder what his face looks like.']
                : ['<32>{#p/story}* Smells like an old skatepark.'],
        idleTalk1: ['<08>{#p/basic}{~}Check it.'],
        idleTalk2: ['<08>{#p/basic}{~}Take a looksie.'],
        idleTalk3: ['<08>{#p/basic}{~}Sneak a peek..'],
        idleTalk4: ['<08>{#p/basic}{~}Give it a gaze..'],
        insultIdleTalk1: ['<08>{#p/basic}{~}Meh.'],
        insultIdleTalk2: ['<08>{#p/basic}{~}Whatever.'],
        insultIdleTalk3: ['<09>{#p/basic}{~}\x00*shrugs*'],
        insultIdleTalk4: ['<08>{#p/basic}{~}Very un- cool.'],
        act_praise: ["<32>{#p/human}* (You tell Radtile he's as cool as a quantum cucumber.)"],
        act_praise_bullied: ['<32>{#p/human}* (You tell Radtile his scars make him look tougher.)'],
        complimentTalk1: ["<08>{#p/basic}{~}Were you really lookin'?"],
        complimentTalk2: ['<08>{#p/basic}{~}Check first, opinions later.'],
        complimentTalk3: ['<08>{#p/basic}{~}Show and tell, in that order.'],
        complimentPostInsultTalk1: ["<08>{#p/basic}{~}You're a liar, anyway."],
        complimentPostInsultStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Yeah, I don't think that's gonna work now, dude..."]
                : ["<32>{#p/story}* Radtile isn't having it."],
        flirtTalk1: ['<08>{#p/basic}{~}Woah, hey, hold on..'],
        complimentStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Maybe if you show him you're checking him out first...?"]
                : ['<32>{#p/story}* Radtile wants you to check him out first.'],
        checkTalk: ['<08>{#p/basic}{~}Study me, heh heh.'],
        realTalk1: ['<08>{#p/basic}{~}Right on.'],
        realStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* You did it!\n* ... can we leave now?']
                : ["<32>{#p/story}* Radtile's feeling a whole lot cooler than before."],
        realTalkY1: ['<08>{#p/basic}{~}\x00*fist bump*'],
        realTalkY2: ["<08>{#p/basic}{~}You're the coolest."],
        realTalkY3: ["<08>{#p/basic}{~}Let's rock 'n' roll."],
        shockTalk1: ['<08>{#p/basic}{~}.. cool.'],
        shockStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Uh...']
                : ['<32>{#p/story}* Radtile is not amused.'],
        act_insult: ['<32>{#p/human}* (You call Radtile a loser, and tell him to shut up.)'],
        act_insult_bullied: ["<32>{#p/human}* (You mock Radtile's bruises, and tell him to go away.)"],
        act_flirt: ['<32>{#p/human}* (You beckon Radtile.)'],
        act_flirt_bullied: ["<32>{#p/human}* (You tell Radtile he's beautiful no matter how disfigured he is.)"],
        insultTalk1: ["<08>{#p/basic}{~}And what if I don't?"],
        insultStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Uh...']
                : ['<32>{#p/story}* Radtile keeps his distance.'],
        checkPostInsultTalk: ['<08>{#p/basic}{~}Come to take another look?'],
        checkPostInsultStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Ah, we're going in circles!"]
                : ['<32>{#p/story}* Radtile gives you a chance.'],
        hurtStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* This isn't looking good..."]
                : ["<32>{#p/story}* Radtile's teeth are beginning to fall out."]
    },
    b_opponent_doge: {
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Doge, the callous dog.\n* Cares only for her work.']
                : ['<32>{#p/story}* DOGE - ATK 14 DEF 10\n* Pronounced \"dohj.\" Soft j.\n* Member of the ELITE squad.'],
        act_flirt: () => [
            ...(dogecon() || world.goatbro
                ? ['<32>{#p/human}* (You flirt with Doge.)', '<32>{#p/basic}* Doge ignores your attempts at flattery.']
                : battler.volatile[0].vars.pet
                    ? ['<32>{#p/human}* (You flirt with Doge.)', '<32>{#p/basic}* Doge smiles in return.']
                    : battler.volatile[0].sparable
                        ? [
                            '<32>{#p/human}* (You flirt with Doge.)',
                            '<32>{#p/basic}* Doge, despondent, was unreceptive to your remark.'
                        ]
                        : world.flirt < 10
                            ? ['<32>{#p/human}* (You flirt with Doge.)', "<32>{#p/basic}* Doge doesn't react in any strong way."]
                            : ['<32>{#p/human}* (You flirt with Doge.)', '<32>{#p/basic}* Doge is giving it her all to resist you.'])
        ],
        act_flirt2: [
            '<32>{#p/human}* (You flirt with Doge again.)',
            "<32>{#p/basic}* Doge can't keep this up for much longer..."
        ],
        act_flirt3: [
            '<32>{#p/human}* (You muster your courage, and call Doge a little munchkin.)',
            '<32>{#p/basic}* Doge tries not to react, but finds herself blushing.',
            "<32>* She squirms and she struggles, but there's no hiding what's on her face.",
            '<32>* Thoroughly embarrassed, Doge flees the scene...'
        ],
        batheText: [
            '<32>{#p/human}* (You suggest Doge get a shower.)',
            '<32>{#p/basic}* Doge rips open a pipe from the ceiling... water comes flooding out.',
            "<32>* It's cold, but she doesn't seem to mind...",
            '<32>* Soon, the water runs dry.\n* Doge relaxes a little...',
            "<32>{#p/story}* Doge's ATTACK down!"
        ],
        batheTextEarly: ["<32>{#p/human}* (You suggest Doge get a shower, but she wasn't in the mood yet.)"],
        batheTextGeno: [
            '<32>{#p/human}* (You suggest Doge get a shower.)',
            '<32>{#p/basic}* Doge does not seem concerned for her hygiene.'
        ],
        batheTextLate: ['<32>{#p/human}* (You suggest Doge get a shower, but it was too late.)'],
        batheTextPost: ['<32>{#p/human}* (But Doge was already clean.)'],
        fetchStatus: ['<32>{#p/story}* Doge is a little smarter than the average dog.'],
        fetchText: () => [
            '<32>{#p/human}* (You throw the spanner.)\n* (Doge intercepts your throw, launching it back at you.)',
            '<32>{#p/basic}* The spanner bonks you directly in the head!',
            '<32>{#p/story}* SPEED down!',
            ...(world.goatbro && SAVE.flag.n.ga_asrielSpanner++ < 1
                ? ["<32>{#p/asriel2}* Maybe don't try that again."]
                : [])
        ],
        fetchTextEpic: [
            '<32>{#p/human}* (You throw the spanner.)\n* (Doge, inspired, picks it up and brings it back to you.)'
        ],
        fetchTextGarb: ['<32>{#p/human}* (You throw the spanner.)\n* (Doge, exhausted, ignores it.)'],
        flirtStatus: ['<32>{#p/story}* Doge questions the intention behind your advances.'],
        flirtStatusAccept: ['<32>{#p/story}* Doge blushes slightly.'],
        flirtStatusReject: ['<32>{#p/story}* Doge sighs apathetically.'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Almost dead.']
                : ["<32>{#p/story}* Doge is trying desperately to pretend she's just fine."],
        name: '* Doge',
        petTalkPost: ['<11>{#p/basic}{~}Ah...'],
        petText: [
            '<32>{#p/human}* (You try to pet Doge.)',
            '<32>{#p/basic}* Doge hesitantly reaches her head up to meet your hand.',
            '<32>* You make contact.\n* Her face lights up.\n* She gives you a big smile.',
            '<32>* All her pent-up stress has finally been released.',
            '<32>* Doge is no longer interested in fighting you.'
        ],
        petTextEarly: ["<32>{#p/human}* (You try to pet Doge, but she can't be reached yet.)"],
        petTextGeno: [
            '<32>{#p/human}* (You try to pet Doge.)',
            '<32>{#p/basic}* Doge does not care for your attempts at affection.'
        ],
        petTextLate: ['<32>{#p/human}* (You try to pet Doge, but it was too late.)'],
        petTextPost1: [
            '<32>{#p/human}* (You try to pet Doge again.)',
            "<32>{#p/basic}* Doge laps up your love like it's the first time she's been cared for in years..."
        ],
        petTextPost2: ['<32>{#p/human}* (You try to pet Doge yet again.)', '<32>{#p/basic}* Doge has reached nirvana.'],
        petTextPost3: ['<32>{#p/human}* (You continue petting Doge.)', '<32>{#p/basic}* Is this even legal?'],
        petTextPost4: ['<32>{#p/human}* (You pet Doge some more.)', '<32>{#p/basic}* Doge flops on the ground.'],
        petTextPost5: ['<32>{#p/human}* (You give Doge a side rub.)', '<32>{#p/basic}* Doge is drooling...'],
        petTextPost6: ['<32>{#p/human}* (You pet Doge.)', '<32>{#p/basic}* It continues.'],
        petTextPost7: ['<32>{#p/human}* (You pet Doge.)', '<32>{#p/basic}* ...'],
        petTextSus: ['<32>{#p/human}* (But Doge was too antsy to be pet.)'],
        status1: () => (world.goatbro ? ['<32>{#p/asriel2}* Doge.'] : ['<32>{#p/story}* Doge struts towards you.']),
        turnStatus1: ['<32>{#p/story}* Doge studies your stance, and deems it lacking.'],
        turnStatus2: () =>
            dogecon() ? ['<32>{#p/story}* Doge fiddles with her spear.'] : ['<32>{#p/story}* Doge needs a good washdown.'],
        turnStatus3: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge double-checks her stance.']
                : battler.volatile[0].vars.bathe
                    ? ['<32>{#p/story}* Doge is dripping wet.']
                    : ["<32>{#p/story}* Doge's hygiene remains unchanged, much to her dismay."],
        turnStatus4: () =>
            dogex()
                ? ['<32>{#p/story}* Doge thinks of her duty.']
                : world.dead_canine
                    ? ['<32>{#p/story}* Doge thinks of her colleagues.']
                    : battler.volatile[0].vars.bathe
                        ? ['<32>{#p/story}* Doge seeks a little adventure.']
                        : ['<32>{#p/story}* Doge ponders the meaning of her duty.'],
        turnStatus5: () =>
            dogex()
                ? ['<32>{#p/story}* Doge thinks of her honor.']
                : world.dead_canine
                    ? ['<32>{#p/story}* Doge thinks of her friends.']
                    : battler.volatile[0].vars.walk
                        ? ['<32>{#p/story}* Doge relaxes back into her standard pose.']
                        : battler.volatile[0].vars.bathe
                            ? ['<32>{#p/story}* Doge regains her composure.']
                            : ['<32>{#p/story}* Doge remembers an old colleague fondly.'],
        turnStatus6: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge keeps a cool head.']
                : battler.volatile[0].vars.walk
                    ? ['<32>{#p/story}* Doge takes a deep breath.']
                    : ['<32>{#p/story}* Doge breaks into a cold sweat.'],
        turnStatus7: () =>
            battler.volatile[0].vars.walk
                ? ['<32>{#p/story}* Doge seeks affection.']
                : ['<32>{#p/story}* Doge takes a deep breath.'],
        turnStatus8: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge remains intent.']
                : battler.volatile[0].vars.walk
                    ? ['<32>{#p/story}* Doge could use a helping hand.']
                    : ["<32>{#p/story}* Doge's breath shortens."],
        turnStatus9: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge remains intent.']
                : battler.volatile[0].vars.walk
                    ? ['<32>{#p/story}* Doge just wants to be pet.']
                    : ['<32>{#p/story}* Doge is hyperventilating.'],
        turnStatus10: () =>
            dogecon()
                ? ['<32>{#p/story}* Doge remains intent.']
                : battler.volatile[0].vars.pet
                    ? ['<32>{#p/story}* Doge is satisfied.']
                    : ['<32>{#p/story}* Doge stands patiently before you in surrender.'],
        turnTalk1: () =>
            dogecon() || world.goatbro
                ? ["<11>{#p/basic}{~}I know what you've been doing."]
                : ['<11>{#p/basic}{~}The captain warned us about your arrival.'],
        turnTalk2: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}All those you two have hurt together...',
                    '<11>{#p/basic}{~}Have you truly lost yourselves this badly?'
                ]
                : dogex()
                    ? ['<11>{#p/basic}{~}All that carnage...', '<11>{#p/basic}{~}Did you ever once feel remorse?']
                    : world.dead_canine
                        ? ['<11>{#p/basic}{~}The canine unit...', '<11>{#p/basic}{~}You killed them all!']
                        : [
                            '<11>{#p/basic}{~}As such, I have been on extended patrol.',
                            '<11>{#p/basic}{~}Mind you... it is quite dirty here.'
                        ],
        turnTalk3: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}It is a difficult conclusion to avoid...',
                    '<11>{#p/basic}{~}But I see no alterna- tive.'
                ]
                : dogecon()
                    ? [
                        '<11>{#p/basic}{~}You could have surrendered at any moment...',
                        '<11>{#p/basic}{~}Yet you chose violence.'
                    ]
                    : battler.volatile[0].vars.bathe
                        ? ['<11>{#p/basic}{~}Ah...', '<11>{#p/basic}{~}How pleasant...']
                        : [
                            '<11>{#p/basic}{~}But we are ELITE squad members, I suppose.',
                            '<11>{#p/basic}{~}We must adapt to any situation.'
                        ],
        turnTalk4: () =>
            dogecon() || world.goatbro
                ? [
                    '<11>{#p/basic}{~}When I first joined the ELITE squad...',
                    "<11>{#p/basic}{~}Part of me doubted Undyne's stance on humans..."
                ]
                : battler.volatile[0].vars.bathe
                    ? ['<11>{#p/basic}{~}Too much water in my hair...']
                    : [
                        '<11>{#p/basic}{~}When I asked to join the ELITE squad...',
                        "<11>{#p/basic}{~}I never imagined I'd make it in."
                    ],
        turnTalk5: () =>
            dogecon() || world.goatbro
                ? ["<11>{#p/basic}{~}But after what you've done...", "<11>{#p/basic}{~}There's no more doubt in my mind."]
                : battler.volatile[0].vars.walk
                    ? ['<11>{#p/basic}{~}Well.\nNothing beats a nice walk.']
                    : battler.volatile[0].vars.bathe
                        ? [
                            '<11>{#p/basic}{~}{#f.batmusic1}Just a moment.',
                            '<11>{#p/basic}{~}...',
                            '<11>{#p/basic}{~}\x00*whips around*',
                            '<11>{#p/basic}{~}\x00*whipping continues*',
                            '<11>{#p/basic}{~}\x00*shakes off*',
                            '<11>{#p/basic}{~}...',
                            '<11>{#p/basic}{~}There, all dry now.\nBack to fighting, yes?',
                            '{*}{#f.batmusic2}{%}'
                        ]
                        : [
                            '<11>{#p/basic}{~}But after that dummy called it quits...',
                            '<11>{#p/basic}{~}I became the next in line.'
                        ],
        turnTalk6: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}And you, Asriel... a traitor to your own kind...',
                    '<11>{#p/basic}{~}It is hard to believe you were once to be our king.'
                ]
                : dogex()
                    ? ['<11>{#p/basic}{~}It would be wise for you to surrender.', '<11>{#p/basic}{~}Not that you know how.']
                    : world.dead_canine
                        ? [
                            '<12>{#p/basic}{~}Doggo was the newest recruit to the canines.',
                            '<11>{#p/basic}{~}Some saw his blindness as a weakness...',
                            '<11>{#p/basic}{~}But he had so much promise.'
                        ]
                        : battler.volatile[0].vars.walk
                            ? [
                                "<11>{#p/basic}{~}You've sure been walking for a while.",
                                '<11>{#p/basic}{~}How much stamina do YOU have?'
                            ]
                            : battler.volatile[0].vars.bathe
                                ? ['<11>{#p/basic}{~}Apologies.\nThere is much on my mind.']
                                : [
                                    '<11>{#p/basic}{~}It has been a difficult line of work...',
                                    '<11>{#p/basic}{~}Even Undyne herself has moments of doubt.',
                                    '<11>{#p/basic}{~}... do not tell her I shared that.'
                                ],
        turnTalk7: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}Is this really the fate that befalls us?',
                    '<11>{#p/basic}{~}A vile prince and his human partner...',
                    '<11>{#p/basic}{~}... on a mission to kill us all?'
                ]
                : dogex()
                    ? [
                        '<11>{#p/basic}{~}For life, you show nothing but contempt.',
                        '<11>{#p/basic}{~}At every turn, you treat us as inferior.'
                    ]
                    : world.dead_canine
                        ? [
                            "<11>{#p/basic}{~}Canis Minor was Canis Major's underling.",
                            '<11>{#p/basic}{~}Its unique perspective helped in unexpected ways...',
                            '<11>{#p/basic}{~}Even if it was often mis- understood.'
                        ]
                        : battler.volatile[0].vars.walk
                            ? ['<11>{#p/basic}{~}Clearly more than I antici- pated...']
                            : ['<11>{#p/basic}{~}(Sigh...)'],
        turnTalk8: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}After all is said and done...',
                    "<11>{#p/basic}{~}I can't decide which of you is worse."
                ]
                : dogex()
                    ? ['<11>{#p/basic}{~}Now, it is your turn.', '<11>{#p/basic}{~}Your turn to be treated as inferior.']
                    : world.dead_canine
                        ? [
                            '<11>{#p/basic}{~}Dogamy and Dogaressa, a duo of dilligence.',
                            '<11>{#p/basic}{~}Before they met, they often misbehaved.',
                            '<11>{#p/basic}{~}But once together, they could do ANYTHING.'
                        ]
                        : battler.volatile[0].vars.walk
                            ? ['<11>{#p/basic}{~}...', '<11>{#p/basic}{~}Can we really keep going like this?']
                            : ['<11>{#p/basic}{~}This battle is starting to drag on.'],
        turnTalk9: () =>
            world.goatbro
                ? 
                ['<11>{#p/basic}{~}Suffice it to say...', '<11>{#p/basic}{~}This, I did not expect.']
                : dogex()
                    ? ['<11>{#p/basic}{~}...']
                    : world.dead_canine
                        ? [
                            '<11>{#p/basic}{~}Canis Major was there when the canine unit was formed.',
                            '<11>{#p/basic}{~}Along with its master, it led the unit well.',
                            '<11>{#p/basic}{~}But now...'
                        ]
                        : ['<11>{#p/basic}{~}Human, I...'],
        turnTalk10: () =>
            world.goatbro
                ? [
                    '<11>{#p/basic}{~}There is nothing left to say.',
                    '<11>{#p/basic}{~}I will have justice for the terror you have inspired.'
                ]
                : dogex()
                    ? [
                        '<11>{#p/basic}{~}There is nothing left to say.',
                        "<11>{#p/basic}{~}I will have justice for what you've done."
                    ]
                    : world.dead_canine
                        ? [
                            '<11>{#p/basic}{~}There is nothing left to say.',
                            "<11>{#p/basic}{~}I will have justice for those dogs' deaths."
                        ]
                        : battler.volatile[0].vars.pet
                            ? ['<11>{#p/basic}{~}(Blushes)', '<11>{#p/basic}{~}You are a... kind human...']
                            : [
                                '<11>{#p/basic}{~}I think I have had enough.',
                                '<11>{#p/basic}{~}...',
                                '<11>{#p/basic}{~}In fairness, you do not seem so bad.',
                                '<11>{#p/basic}{~}At least, compared to how Undyne described.',
                                '<11>{#p/basic}{~}Accept my mercy as a plea...',
                                '<11>{#p/basic}{~}A plea that you will not stray into the darkness.'
                            ],
        turnTalk11: () => ['<11>{#p/basic}{~}...'],
        walkText: [
            '<32>{#p/human}* (You offer to take Doge on a walk.)',
            '<32>{#p/basic}* Doge follows your lead.\n* Together you march in unison.',
            '<32>* This continues for a while...',
            '<32>* But eventually...',
            '<32>* Doge grows tired of this frivolous exercise.',
            '<32>* She follows you back to her patrol zone, and relaxes a little...',
            "<32>{#p/story}* Doge's ATTACK down!"
        ],
        walkTextEarly: ['<32>{#p/human}* (You offer to take Doge on a walk, but she has no reason to go on one yet.)'],
        walkTextGeno: [
            '<32>{#p/human}* (You offer to take Doge on a walk.)',
            '<32>{#p/basic}* Doge refuses to walk anywhere with you.'
        ],
        walkTextLate1: [
            "<32>{#p/human}* (You offer to take Doge on a walk, but she's already dried herself up for you.)"
        ],
        walkTextLate2: [
            '<32>{#p/human}* (You offer to take Doge on a walk, but she never did anything to necessitate it.)'
        ],
        walkTextPost: ['<32>{#p/human}* (But Doge was already spent from walking beforehand.)'],
        walkTextSus: ['<32>{#p/human}* (But Doge was too dirty to go on a walk.)']
    },
    b_opponent_muffet: {
        act_check: ['<32>{#p/story}* MUFFET - ATK 39 DEF 19\n* Queen of all spider clans.\n* ELITE squad volunteer.'],
        act_flirt: () => [
            ...(badSpider()
                ? ['<32>{#p/human}* (You flirt with Muffet.)\n* (Muffet gives you the stink eyes.)']
                : battler.volatile[0].sparable
                    ? ['<32>{#p/human}* (You flirt with Muffet.)\n* (Muffet giggles and pats your head with several hands.)']
                    : world.flirt < 10
                        ? ['<32>{#p/human}* (You flirt with Muffet.)\n* (Muffet giggles and wags several fingers at you.)']
                        : ['<32>{#p/human}* (You flirt with Muffet.)\n* (Muffet seems intrigued, but it may not be enough.)'])
        ],
        act_flirt2: [
            '<32>{#p/human}* (You flirt with Muffet again.)\n* (Muffet turns more than a few eyes towards you.)'
        ],
        act_flirt3: [
            '<32>{#p/human}* (You muster your courage, and ask Muffet out on a picnic date.)',
            '<32>{#p/basic}* Muffet giggles...',
            '<32>* Then giggles some more...',
            "<32>* She can't stop herself!\n* Muffet succumbs to your immaculate flirtatious power!",
            '<32>* ... then promptly decides to end this battle, so as not to shame her fellow spiders.',
            '<32>{#p/kidding}* ... what?'
        ],
        flirtReaction1: ['<11>{#p/basic}{~}How adorable~'],
        flirtReaction2: ["<11>{#p/basic}{~}You're the sweetest~"],
        flirtReaction3: ['<11>{#p/basic}{~}Ahuhu~'],
        appeaseText: [
            '<33>{#p/human}* (You make an appeal to Muffet.)\n* (Muffet is once again\n  intrigued by your words.)',
            '<32>* (You mention how innocent dogs were haphazardly enstated into the Royal Guard.)',
            '<32>* (As such, you suggest that trusting its captain would put spider clans at risk.)',
            '<32>{#p/basic}* Muffet starts considering the situation...',
            "<32>{#p/story}* Muffet's SPEED down!"
        ],
        appeaseTextEarly: ["<32>{#p/human}* (You make an appeal to Muffet, but she doesn't seem ready to hear it yet.)"],
        appeaseTextGeno: [
            '<32>{#p/human}* (You make an appeal to Muffet.)',
            '<32>{#p/basic}* Muffet will not be swayed by your shallow claims.'
        ],
        appeaseTextLate: [
            "<32>{#p/human}* (You make an appeal to Muffet, but she's already past the point of hearing you out.)"
        ],
        appeaseTextPost: ["<32>{#p/human}* (But Muffet didn't need to be appeased twice.)"],
        appeaseTextSus: ['<32>{#p/human}* (But Muffet had no reason to listen to you.)'],
        counterText: [
            '<32>{#p/human}* (You try to counter Muffet.)\n* (Muffet is intrigued by your words.)',
            '<32>* (You propose that a deal with the ELITE squad is flimsy.)',
            '<32>* (You point out that one of their ranks already failed to capture you.)',
            '<32>{#p/basic}* Muffet begins to carefully think everything over...',
            "<32>{#p/story}* Muffet's SPEED down!"
        ],
        counterTextEarly: [
            "<32>{#p/human}* (You try to counter Muffet, but she hasn't said anything that could be countered yet.)"
        ],
        counterTextGeno: [
            '<32>{#p/human}* (You try to counter Muffet.)',
            '<32>{#p/basic}* Muffet is deadset in her goal.'
        ],
        counterTextLate: ["<32>{#p/human}* (You try to counter Muffet, but she's already made up her mind.)"],
        counterTextPost: ['<32>{#p/human}* (But Muffet has already heard your argument.)'],
        name: '* Muffet',
        payTalkPost: ["<11>{#p/basic}{~}That's very kind, but we already have more than enough~"],
        payText: [
            '<32>{#p/human}* (You try to pay Muffet.)',
            "<32>* As it turns out, Monster Kid had enough G to cover all of the spider clans' expenses!",
            '<32>* Muffet pockets the money and bows to you and Monster Kid.',
            '<32>* Her subjects will be well fed for quite a while.',
            "<32>* Muffet doesn't care about fighting anymore."
        ],
        payTextEarly: [
            "<32>{#p/human}* (You try to pay Muffet, but she didn't yet see any basis on which she could accept it.)"
        ],
        payTextGeno: [
            '<32>{#p/human}* (You try to pay Muffet.)',
            "<32>{#p/basic}* Muffet doesn't need any money from you."
        ],
        payTextLate: ["<32>{#p/human}* (You try to pay Muffet, but she's already past the point of bribery.)"],
        payTextPost: ['<32>{#p/human}* (You try to pay Muffet again.)'],
        payTextSus: ['<32>{#p/human}* (But Muffet had no reason to trust you.)'],
        status1: ["<32>{#p/kidding}* I'm trapped...!"],
        turnStatus1: () =>
            badSpider()
                ? world.genocide
                    ? world.bullied
                        ? ['<32>{#p/kidding}* Little bullies...?']
                        : ['<32>{#p/kidding}* Little killers...?']
                    : world.bullied
                        ? ['<32>{#p/kidding}* Little bully...?']
                        : ['<32>{#p/kidding}* Little killer...?']
                : ['<32>{#p/kidding}* Help...!'],
        turnStatus2: () =>
            badSpider()
                ? world.genocide
                    ? ["<32>{#p/kidding}* But we haven't done anything!"]
                    : ["<32>{#p/kidding}* I've got a bad feeling about this..."]
                : ["<32>{#p/kidding}* So it's a business thing..."],
        turnStatus3: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Yo...\n* She REALLY doesn't like you..."]
                : battler.volatile[0].vars.counter
                    ? ['<32>{#p/kidding}* What are we going to do?']
                    : ["<32>{#p/kidding}* We're never getting outta here, are we..."],
        turnStatus4: () =>
            badSpider()
                ? ['<32>{#p/kidding}* What the heck was THAT?']
                : battler.volatile[0].vars.counter
                    ? ['<32>{#p/kidding}* Is she... changing her mind?']
                    : ['<32>{#p/kidding}* What the heck was THAT?'],
        turnStatus5: () =>
            badSpider()
                ? ['<32>{#p/kidding}* Of course...']
                : battler.volatile[0].vars.counter
                    ? ["<32>{#p/kidding}* Guess it won't be so easy..."]
                    : ["<32>{#p/kidding}* Y... you're kidding, right?\n* This isn't fun at all!"],
        turnStatus6: () =>
            badSpider()
                ? ["<32>{#p/kidding}* I don't like what she's saying about you, dude..."]
                : battler.volatile[0].vars.counter
                    ? ['<32>{#p/kidding}* Fellow spiders...?']
                    : ['<32>{#p/kidding}* Uh...'],
        turnStatus7: () =>
            badSpider()
                ? ["<32>{#p/kidding}* She's relentless...!"]
                : battler.volatile[0].vars.appease
                    ? ['<32>{#p/kidding}* Hey, wait...\n* I think this is working!\n* Keep going, dude!']
                    : ["<32>{#p/kidding}* I'm...\n* I'm scared, dude..."],
        turnStatus8: () =>
            badSpider()
                ? ['<32>{#p/kidding}* Dude, HOW are we STILL ALIVE??']
                : battler.volatile[0].vars.appease
                    ? ["<32>{#p/kidding}* Yo, freaky muffins aside... we're making progress!\n* I think?"]
                    : ['<32>{#p/kidding}* Ack, not again!!'],
        turnStatus9: () =>
            badSpider()
                ? ['<32>{#p/kidding}* What\'s \"inevitable?\"']
                : battler.volatile[0].vars.appease
                    ? ['<32>{#p/kidding}* But...\n* I thought we...']
                    : ['<32>{#p/kidding}* Ack, not again!!'],
        turnStatus10: () =>
            badSpider()
                ? ["<32>{#p/kidding}* Yo, I'm here too, you know..."]
                : battler.volatile[0].vars.appease
                    ? ["<32>{#p/kidding}* Hey, I've got money!\n* Let's use it, dude!"]
                    : ['<32>{#p/kidding}* Someone, anyone...'],
        turnStatus11: () =>
            badSpider()
                ? ["<32>{#p/kidding}* This isn't funny...!"]
                : battler.volatile[0].vars.pay
                    ? ["<32>{#p/kidding}* I hope that short skeleton doesn't mind me using the money he gave me..."]
                    : battler.volatile[0].vars.appease
                        ? ["<32>{#p/kidding}* Dude...\n* Why didn't we help her?"]
                        : ["<32>{#p/kidding}* It's over..."],
        turnStatus12: () =>
            badSpider() ? ['<32>{#p/kidding}* ...'] : ['<32>{#p/kidding}* Are we gonna end this, or...?'],
        turnStatus13: () =>
            badSpider() ? ['<32>{#p/kidding}* Is it really over?'] : ['<32>{#p/kidding}* Are we gonna end this, or...?'],
        turnTalk1: () =>
            badSpider()
                ? world.genocide
                    ? world.bullied
                        ? ['<11>{#p/basic}{~}Ahuhuhu... two little bullies crawl into my web~']
                        : ['<11>{#p/basic}{~}Ahuhuhu... two little killers crawl into my web~']
                    : world.bullied
                        ? ['<11>{#p/basic}{~}Ahuhuhu... a little bully crawls into my web~']
                        : ['<11>{#p/basic}{~}Ahuhuhu... a little killer crawls into my web~']
                : ["<11>{#p/basic}{~}You're mine now, dearies~"],
        turnTalk1a: [
            '<11>{#p/basic}{~}I hope you like your new color~',
            '<11>{#p/basic}{~}I think purple looks better on you...',
            "<11>{#p/basic}{~}Don't you, dearie?"
        ],
        turnTalk2: () =>
            badSpider()
                ? [
                    world.genocide
                        ? '<11>{#p/basic}{~}What did you think would happen, dearies?'
                        : '<11>{#p/basic}{~}What did you think would happen, dearie?',
                    '<11>{#p/basic}{~}Did you expect me to SPARE you?'
                ]
                : [
                    "<11>{#p/basic}{~}Don't expect me to go easy on you, little human.",
                    '<11>{#p/basic}{~}That ELITE squad offered lots of money for your SOUL~'
                ],
        turnTalk3: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Oh my~', '<11>{#p/basic}{~}Such a shame for you~']
                : battler.volatile[0].vars.counter
                    ? ['<11>{#p/basic}{~}Ahuhuhu...\nWell...']
                    : [
                        '<11>{#p/basic}{~}With your lack of a counter- offer...',
                        '<11>{#p/basic}{~}The choice for me is clear~'
                    ],
        turnTalk4: () =>
            badSpider()
                ? [
                    '<11>{#p/basic}{~}Well.\nThere is one good thing about it~',
                    "<11>{#p/basic}{~}I don't have to feel bad about feeding my pet!"
                ]
                : battler.volatile[0].vars.counter
                    ? ['<11>{#p/basic}{~}A better deal would be nice...']
                    : ['<11>{#p/basic}{~}Where are you, my pet~', "<11>{#p/basic}{~}It's time to eat~"],
        turnTalk5: () =>
            badSpider()
                ? [
                    '<11>{#p/basic}{~}You survived?\nImpressive~',
                    '<11>{#p/basic}{~}I shall have to reward you...',
                    '<11>{#p/basic}{~}... with more attacks, of course.\nAhuhuhu!'
                ]
                : battler.volatile[0].vars.counter
                    ? [
                        '<11>{#p/basic}{~}But what guarantee do I have...',
                        "<11>{#p/basic}{~}... that you won't just stab me in the back?"
                    ]
                    : [
                        '<11>{#p/basic}{~}I often wondered what fighting would be like.',
                        "<11>{#p/basic}{~}I never realized it'd be so much fun~"
                    ],
        turnTalk6: () =>
            badSpider()
                ? [
                    '<11>{#p/basic}{~}How did it feel, hmm?',
                    !world.bullied
                        ? '<11>{#p/basic}{~}All those monsters falling like dominoes...'
                        : '<11>{#p/basic}{~}All those monsters running scared...'
                ]
                : battler.volatile[0].vars.counter
                    ? [
                        '<11>{#p/basic}{~}My fellow spiders need kept safe...',
                        "<11>{#p/basic}{~}I can't put THEM in danger, can I?\nAhuhuhu..."
                    ]
                    : [
                        "<11>{#p/basic}{~}Aren't you having fun, dearies?",
                        '<11>{#p/basic}{~}My fellow spiders certainly will...',
                        '<11>{#p/basic}{~}... when they get their share of the money~'
                    ],
        turnTalk7: () =>
            badSpider()
                ? world.genocide || !world.bullied
                    ? [
                        world.genocide ? '<11>{#p/basic}{~}Well, dearies...' : '<11>{#p/basic}{~}Well, dearie...',
                        '<11>{#p/basic}{~}I shall enjoy killing you personally~'
                    ]
                    : ['<11>{#p/basic}{~}Well, dearie...', '<11>{#p/basic}{~}I shall enjoy paying back the favor~']
                : battler.volatile[0].vars.appease
                    ? ['<11>{#p/basic}{~}I must admit, that is very worrying...']
                    : [
                        '<11>{#p/basic}{~}Well, no matter, little human~',
                        '<11>{#p/basic}{~}The only thing that matters now is your SOUL~'
                    ],
        turnTalk8: () =>
            badSpider()
                ? [
                    world.genocide
                        ? '<11>{#p/basic}{~}Oh, this is so much fun, you two!'
                        : '<11>{#p/basic}{~}Oh, this is so much fun, is it not?',
                    "<11>{#p/basic}{~}My pet, it's feeding time~"
                ]
                : battler.volatile[0].vars.appease
                    ? [
                        "<11>{#p/basic}{~}And they didn't exactly do much to earn my trust...",
                        '<11>{#p/basic}{~}Oh, hello, my pet~'
                    ]
                    : ['<11>{#p/basic}{~}Time for round two, my pet~'],
        turnTalk9: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}You only delay the inevitable~']
                : battler.volatile[0].vars.appease
                    ? ['<11>{#p/basic}{~}Still, dearies...', "<11>{#p/basic}{~}I don't know if I can trust you~"]
                    : ["<11>{#p/basic}{~}You're resilient, I'll give you that~"],
        turnTalk10: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Come now...', "<11>{#p/basic}{~}Aren't you getting tired?"]
                : battler.volatile[0].vars.appease
                    ? ['<11>{#p/basic}{~}Unless, perhaps...', '<11>{#p/basic}{~}You can offer me a little insurance?']
                    : ['<11>{#p/basic}{~}But unless my deal changes, your SOUL is as good as mine~'],
        turnTalk11: () =>
            badSpider()
                ? ['<11>{#p/basic}{~}Ahuhuhu...']
                : battler.volatile[0].vars.pay
                    ? [
                        '<11>{#p/basic}{~}You two have my sincerest apologies~',
                        "<11>{#p/basic}{~}This is a good deed I won't easily forget!"
                    ]
                    : [
                        "<11>{#p/basic}{~}What's this?\nA message from Undyne?",
                        "<11>{#p/basic}{~}She's called off the deal...?",
                        '<11>{#p/basic}{~}... hmmm...',
                        "<11>{#p/basic}{~}Well, I think my job here is done, don't you?",
                        '<11>{#p/basic}{~}Sorry for wasting your time~'
                    ],
        turnTalk12: () => ['<11>{#p/basic}{~}...'],
        turnTalk13: (didf: boolean) =>
            badSpider()
                ? [
                    world.genocide
                        ? '<11>{#p/basic}{~}You know what, dearies?'
                        : '<11>{#p/basic}{~}You know what, dearie?',
                    "<11>{#p/basic}{~}I've had enough of fighting you.",
                    '<11>{#p/basic}{~}So do what you will.',
                    world.genocide || !world.bullied
                        ? didf
                            ? "<11>{#p/basic}{~}... sorry, Undyne.\nI'd rather die on my own terms, thank you."
                            : '<11>{#p/basic}{~}... sorry, Undyne.\nThis has dragged on for long enough.'
                        : didf
                            ? "<11>{#p/basic}{~}Honestly, a little bully like you isn't worth dying over..."
                            : "<11>{#p/basic}{~}Honestly, a little bully like you isn't worth my time...",
                    '<11>{#p/basic}{~}Bye bye, now~'
                ]
                : ['<11>{#p/basic}{~}...']
    },
    b_opponent_undyne: {
        artifact: ["<32>{#p/human}* (Undyne doesn't even seem to know what it is.)"],
        epiphaNOPE: ['<20>{#p/undyne}Huh?\nWhat even IS this?'],
        spaghetti1: [
            '<32>{#p/basic}* The smell reminds Undyne of someone close to her...',
            "<32>{#p/story}* Undyne's ATTACK down!"
        ],
        spaghetti2: () =>
            world.genocide
                ? [
                    "<32>{#p/basic}* The smell reminds Undyne of someone she'll never see again...",
                    '<32>{#p/basic}* ... but her determination to eliminate you strengthens.',
                    "<32>{#p/story}* Undyne's ATTACK up!\n* Undyne's DEFENSE down!"
                ]
                : [
                    "<32>{#p/basic}* The smell reminds Undyne of someone she'll never see again...",
                    "<32>{#p/story}* Undyne's DEFENSE down!"
                ],
        act_check: () =>
            world.genocide
                ? SAVE.flag.n.azzy_assist < 2
                    ? ['<32>{#p/asriel2}* Undyne.\n* Still not dead...?']
                    : ["<32>{#p/asriel2}* Undyne.\n* Shouldn't you be attacking her or something?"]
                : helmetdyne()
                    ? ['<32>{#p/story}* UNDYNE - ATK 40 DEF 100\n* Captain of the Royal Guard.\n* Relentless.']
                    : respecc()
                        ? ['<32>{#p/story}* UNDYNE - ATK 25 DEF 10\n* Once your sworn enemy, now your unmatched equal!']
                        : ['<32>{#p/story}* UNDYNE - ATK 50 DEF 20\n* The heroine that NEVER gives up.'],
        name: () => (world.genocide ? '* Undyne the Undying' : '* Undyne'),
        status1: () =>
            helmetdyne()
                ? ['<32>{#p/story}* Undyne towers above you.']
                : respecc()
                    ? ['<32>{#p/story}* Undyne takes you head-on!']
                    : ['<32>{#p/story}* Undyne attacks!'],
        intro1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{*}{#p/undyne}Ready yourself.']
                : ['<20>{*}{#p/undyne}En guarde!'],
        intro2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ["<20>{*}{#p/undyne}I wasn't done with my story."]
                : respecc()
                    ? ['<20>{*}{#p/undyne}Huh!?\nI thought you were tough!']
                    : ["<20>{*}{#p/undyne}You won't get away from me this time!"],
        intro3: () =>
            respecc()
                ? ['<20>{*}{#p/undyne}No more second chances!']
                : ["<20>{*}{#p/undyne}You've escaped from me for the LAST time!"],
        intro4: ['<20>{*}{#p/undyne}STOP RUNNING AWAY!!!'],
        intro5: ['<20>{*}{#p/undyne}COME BACK HERE, YOU LITTLE PUNK!!'],
        earlyChallenge: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/3}So, you wanna do this the {@fill=#f00}hard way{@fill=#000}, huh?',
                    '<20>{#e/undyne/2}Fine by me.'
                ]
                : respecc()
                    ? [
                        "<20>{#p/undyne}{#e/undyne/17}What!?\nI'm already going as fast as I can!",
                        '<20>{#e/undyne/17}But...\nI... you...',
                        "<20>{#e/undyne/17}N-no!\nI'll show you!",
                        "<20>{#e/undyne/1}I'll show you {@fill=#f00}EVERYTHING I'VE GOT{@fill=#000}!"
                    ]
                    : [
                        '<20>{#p/undyne}{#e/undyne/17}So, you wanna do this the {@fill=#f00}hard way{@fill=#000}, huh?',
                        '<20>{#e/undyne/1}FINE BY ME!\nFUHUHU!'
                    ],
        earlyChallengeStatus: ['<32>{#p/story}* Things are about to get spicy.'],
        randStatus1: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne points dramatically towards space.']
                : ['<32>{#p/story}* Undyne points heroically towards space.'],
        randStatus2: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne twirls her spear with grace.']
                : ['<32>{#p/story}* Undyne flips her spear impatiently.'],
        randStatus3: () => ['<32>{#p/story}* Undyne suplexes an asteroid.\n* Just because she can.'],
        randStatus4: () =>
            respecc() ? ['<32>{#p/story}* Undyne bounces with fervor.'] : ['<32>{#p/story}* Undyne bounces impatiently.'],
        randStatus5: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne flashes a genuine smile.']
                : ['<32>{#p/story}* Undyne flashes a menacing smile.'],
        randStatus6: () =>
            respecc()
                ? ['<33>{#p/story}* Undyne looks on with adoration.']
                : ['<32>{#p/story}* Undyne draws her finger across her neck.'],
        randStatus7: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne lets out a battle cry.']
                : ['<32>{#p/story}* Undyne holds her fist in front of her and shakes her head.'],
        randStatus8: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne stares into your SOUL.']
                : ['<32>{#p/story}* Undyne towers threateningly.'],
        randStatus9: () =>
            respecc()
                ? ['<32>{#p/story}* Undyne thinks of her friends... and thinks of you.']
                : ['<32>{#p/story}* Undyne thinks of her friends and pounds the ground with her fists.'],
        randStatus10: () =>
            respecc() ? ['<32>{#p/story}* Smells like tilapia.'] : ['<32>{#p/story}* Smells like sushi.'],
        papStatus1: ['<32>{#p/story}* Undyne has a tear in her eye.'],
        papStatus2: ['<32>{#p/story}* Undyne scowls at you.'],
        papStatus3: ['<32>{#p/story}* Undyne thinks of her friends and shatters the ground with her body.'],
        papStatus4: ["<32>{#p/story}* Undyne isn't in the mood for games."],
        papStatus5: ['<32>{#p/story}* Smells like tuna salad.'],
        endStatus1: ["<32>{#p/story}* Undyne's eye is twitching involuntarily."],
        endStatus2: ['<32>{#p/story}* Undyne is smashing spears on the ground.'],
        endStatus3: ["<32>{#p/story}* Undyne's eye dart around to see if this is a prank."],
        endStatus4: ['<32>{#p/story}* Undyne is hyperventilating.'],
        endStatus5: ['<32>{#p/story}* Smells like roasted fish.'],
        tutorial1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/3}...',
                    "<20>{#e/undyne/4}What? You think I'm just gonna stand here and explain my strategy to you?"
                ]
                : [
                    "<20>{#p/undyne}{#e/undyne/0}As long as you're {@fill=#00c000}GREEN{@fill=#000} you {@fill=#f00}CAN'T ESCAPE{@fill=#000}!",
                    '<20>{#e/undyne/0}Unless you learn to {@fill=#f00}face danger head-on{@fill=#000}...',
                    "<20>{#e/undyne/1}You won't last a SECOND against ME!"
                ],
        tutorial2: [
            '<20>{#p/undyne}{#e/undyne/0}When I said {@fill=#f00}face towards danger{@fill=#000}...',
            '<20>{#e/undyne/1}I meant face towards the bullets!'
        ],
        tutorial3: () => [
            '<20>{#p/undyne}{#e/undyne/3}Look.',
            '<20>{#e/undyne/3}I gave you a spear.',
            '<20>{#e/undyne/2}You can use that to block my attacks.',
            respecc()
                ? '<20>{#e/undyne/17}I should not have to explain this to YOU of all people!'
                : '<20>{#e/undyne/17}Do I have to explain this any more clearly?'
        ],
        tutorial4: [
            '<20>{#p/undyne}{#e/undyne/6}WHAT ARE YOU DOING?',
            '<20>{#e/undyne/7}JUST FACE UPWARDS!!!',
            "<20>{#e/undyne/5}IT'S NOT THAT HARD!!!"
        ],
        tutorial5: () =>
            respecc()
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}...',
                    '<20>{#e/undyne/2}I wanted this to be a fair fight.',
                    "<20>{#e/undyne/3}I had hoped you'd show me what you're capable of.",
                    '<20>{#e/undyne/4}And maybe, if you beat me like this...',
                    "<20>{#e/undyne/2}It'd truly show how strong you are.",
                    '<20>{#e/undyne/6}BUT NOW???',
                    "<20>{#e/undyne/5}I DON'T CARE!",
                    "<20>{#e/undyne/5}I'M NOT YOUR FREAKING BABYSITTER!",
                    '<20>{#e/undyne/17}Unless your babysitter...',
                    '<20>{#e/undyne/5}DOES THIS!'
                ]
                : [
                    '<20>{#p/undyne}{#e/undyne/2}...',
                    '<20>{#e/undyne/2}I wanted this to be a fair fight.',
                    '<20>{#e/undyne/3}I wanted to give you a chance.',
                    '<20>{#e/undyne/4}And maybe, if I beat you like this...',
                    "<20>{#e/undyne/2}It'd truly show how strong monsters can be.",
                    '<20>{#e/undyne/6}BUT NOW???',
                    "<20>{#e/undyne/5}I DON'T CARE!",
                    "<20>{#e/undyne/5}I'M NOT YOUR FREAKING BABYSITTER!",
                    '<20>{#e/undyne/17}Unless your babysitter...',
                    '<20>{#e/undyne/5}DOES THIS!'
                ],
        turnTalkA1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? SAVE.data.n.hp < 6
                    ? [
                        '<20>{#p/undyne}{#e/undyne/33}Too difficult?\nFeh.',
                        "<20>{#p/undyne}{#e/undyne/2}You should've thought about THAT when you had the chance."
                    ]
                    : SAVE.data.n.hp < 11
                        ? [
                            '<20>{#p/undyne}{#e/undyne/3}Not bad, not great.',
                            "<20>{#p/undyne}{#e/undyne/2}Papyrus certainly wouldn't be satisfied, though."
                        ]
                        : SAVE.data.n.hp < 16
                            ? [
                                "<20>{#p/undyne}{#e/undyne/3}So you're gonna be a little tougher than I expected.",
                                '<20>{#p/undyne}{#e/undyne/2}Fair enough.'
                            ]
                            : [
                                '<20>{#p/undyne}{#e/undyne/4}Impressive...',
                                "<20>{#p/undyne}{#e/undyne/2}Just don't expect your luck to last long."
                            ]
                : battler.volatile[0].vars.trolled
                    ? respecc()
                        ? [
                            '<20>{#p/undyne}{#e/undyne/1}\x00*huff...*\n\x00*huff...*',
                            '<20>{#e/undyne/1}So this was your plan all along, huh?',
                            '<20>{#e/undyne/5}Get me all riled up so you could face me at FULL STRENGTH?',
                            '<20>{#e/undyne/0}Well then.',
                            "<20>{#e/undyne/6}Looks like WE'RE gonna have to do this the {@fill=#f00}hard way{@fill=#000}!",
                            '<20>{#e/undyne/1}Fuhuhuhu!!'
                        ]
                        : [
                            '<20>{#p/undyne}{#e/undyne/1}\x00*huff...*\n\x00*huff...*',
                            '<20>{#e/undyne/21}Not bad.',
                            "<20>{#e/undyne/15}But I don't have time for your games.",
                            "<20>{#e/undyne/6}So WE'RE gonna have to do this the {@fill=#f00}hard way{@fill=#000}!",
                            '<20>{#e/undyne/1}Fuhuhuhu!!'
                        ]
                    : ['<20>{#p/undyne}{#e/undyne/1}Not bad!\nThen how about THIS!?'],
        turnTalkA2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/2}Let me tell you a little story.']
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/0}It's been a long time since I've met a warrior like you..."]
                    : ["<20>{#p/undyne}{#e/undyne/0}For years, we've dreamed of a happy ending..."],
        turnTalkA3: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}Back when I was training to be a royal guard...',
                    "<20>{#p/undyne}{#e/undyne/2}Things weren't all starlight and roses."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/0}And now, I've got the chance to do battle with one!"]
                    : ['<20>{#p/undyne}{#e/undyne/0}And now, the stars are just within reach!'],
        turnTalkA4: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/2}Many were against me joining the guard, including my family.']
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/1}I'll savor this moment for as long as it lasts!"]
                    : ["<20>{#p/undyne}{#e/undyne/1}I won't let you snatch it away from us!"],
        turnTalkA5: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/3}And when I lost my eye in a training accident...',
                    '<20>{#p/undyne}{#e/undyne/2}I felt like I had nobody to turn to.'
                ]
                : ['<20>{#p/undyne}{#e/undyne/5}NGAHHH!\nEnough warming up!'],
        turnTalkA6a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/11}Howling in pain, I dragged myself across the floor...',
                    '<20>{#e/undyne/3}Hoping someone would hear me.'
                ]
                : ["<20>{#p/undyne}{#e/undyne/20}Well... you're tough!"],
        turnTalkA6b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/11}Howling in pain, I dragged myself across the floor...',
                    '<20>{#e/undyne/3}Hoping someone would hear me.'
                ]
                : respecc()
                    ? ['<20>{#p/undyne}{#e/undyne/9}Come on!\nHit me already!', "<20>{#e/undyne/7}Don't just stand there!"]
                    : [
                        '<20>{#p/undyne}{#e/undyne/6}Mercy!\nHa!',
                        "<20>{#e/undyne/5}I still can't believe you want to SPARE me!"
                    ],
        turnTalkA7a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/4}Then, I heard an innocent voice.',
                    '<20>{#e/undyne/3}Calling from the distance.'
                ]
                : respecc()
                    ? ['<20>{#p/undyne}{#e/undyne/0}Not that I expected anything less...']
                    : ['<20>{#p/undyne}{#e/undyne/0}But even if you could beat me...'],
        turnTalkA7b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/4}Then, I heard an innocent voice.',
                    '<20>{#e/undyne/3}Calling from the distance.'
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/10}This isn't like you at all!"]
                    : ['<20>{#p/undyne}{#e/undyne/3}But even if I DID spare you...'],
        turnTalkB1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}After searching desperately for help, to no avail...',
                    '<20>{#e/undyne/3}An innocent voice called my name.'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/3}You know...',
                        "<20>{#p/undyne}{#e/undyne/4}Even though we haven't escaped the outpost yet..."
                    ]
                    : ["<20>{#p/undyne}{#e/undyne/3}Honestly, I'm doing you a favor..."],
        turnTalkB2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/2}At the time, Papyrus was just a kid.']
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/0}Getting to fight makes me FEEL like I'm already free!"]
                    : ['<20>{#p/undyne}{#e/undyne/1}No human has EVER made it past ASGORE!'],
        turnTalkB3: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? ['<20>{#p/undyne}{#e/undyne/3}Most kids run when they sense danger...', '<20>{#e/undyne/4}But not him.']
                : respecc()
                    ? ['<20>{#p/undyne}{#e/undyne/4}Just like that one anime Alphys showed me...']
                    : ['<20>{#p/undyne}{#e/undyne/4}Killing you now is an act of mercy...'],
        turnTalkB4: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/2}All that mattered to him was that someone was hurting.',
                    '<20>{#e/undyne/2}Someone he could-\nNo, HAD to help.'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/1}No matter how awful being trapped out here can be...',
                        "<20>{#e/undyne/0}It won't stop us from doing what we love!"
                    ]
                    : ['<20>{#p/undyne}{#e/undyne/6}So STOP being so damn resilient!'],
        turnTalkB5: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/4}'Cause that's just who he was.",
                    '<20>{#p/undyne}{#e/undyne/3}Right to the end.'
                ]
                : respecc()
                    ? [
                        "<20>{#p/undyne}{#e/undyne/1}... but man, you really don't know when to quit!",
                        "<20>{#e/undyne/17}How'd you manage to get this strong!?"
                    ]
                    : ['<20>{#p/undyne}{#e/undyne/5}What the hell are humans made out of!?'],
        turnTalkB6: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/4}For all my bravado, courage, and strength of will...',
                    "<20>{#e/undyne/11}Even I didn't have what it took to be like him."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/5}Anyone else would've GIVEN UP by now!"]
                    : ['<20>{#p/undyne}{#e/undyne/5}Anyone else would be DEAD by now!'],
        turnTalkB7a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/2}You didn't just kill a friend, or a student.",
                    "<20>{#e/undyne/2}You killed the one person who would've forgiven you for it."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/3}Then again, you've had time to train..."]
                    : ['<20>{#p/undyne}{#e/undyne/7}Are you even listening to me!?'],
        turnTalkB7b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/2}You didn't just kill a friend, or a student.",
                    "<20>{#e/undyne/2}You killed the one person who would've forgiven you for it."
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/3}Huh?\nDon't tell me you're ACTUALLY giving up..."]
                    : ["<20>{#p/undyne}{#e/undyne/8}And sparing me won't do anything!!"],
        turnTalkB8a: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    world.trueKills > 9
                        ? '<20>{#p/undyne}{#e/undyne/11}With him and so many others gone...'
                        : '<20>{#p/undyne}{#e/undyne/11}With him gone...',
                    "<20>{#p/undyne}{#e/undyne/2}The only mercy YOU'RE going to get...",
                    '<20>{#p/undyne}{#e/undyne/1}... is a quick death at the end of MY spear!'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/18}All those other monsters you fought...',
                        "<20>{#p/undyne}{#e/undyne/1}THAT'S the source of your power!"
                    ]
                    : ['<20>{#p/undyne}{#e/undyne/9}Come on!'],
        turnTalkB8b: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    world.trueKills > 9
                        ? '<20>{#p/undyne}{#e/undyne/11}With him and so many others gone...'
                        : '<20>{#p/undyne}{#e/undyne/11}With him gone...',
                    "<20>{#p/undyne}{#e/undyne/2}The only mercy YOU'RE going to get...",
                    '<20>{#p/undyne}{#e/undyne/1}... is a quick death at the end of MY spear!'
                ]
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/5}Come on, I'm GIVING you an opening here!"]
                    : ['<20>{#p/undyne}{#e/undyne/1}Seriously.'],
        turnTalkC1: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    '<20>{#p/undyne}{#e/undyne/11}You know, punk...',
                    "<20>{#p/undyne}{#e/undyne/2}It's rude to interrupt people when they're monologuing.",
                    ...(world.trueKills > 9
                        ? [
                            "<20>{#p/undyne}{#e/undyne/11}...\nYou're going to pay for what you did to him...",
                            "<20>{#p/undyne}{#e/undyne/2}... and all the other monsters you've slaughtered."
                        ]
                        : ["<20>{#p/undyne}{#e/undyne/2}...\nYou're going to pay for what you did to him."])
                ]
                : [
                    '<20>{#p/undyne}{#e/undyne/17}Keep a close eye on my attacks, and maybe...',
                    "<20>{#p/undyne}{#e/undyne/5}... you'll be smart enough to know when to let 'em through!"
                ],
        turnTalkC2: () =>
            SAVE.data.n.state_starton_papyrus === 1
                ? [
                    "<20>{#p/undyne}{#e/undyne/2}Y'know, Alphys told me humans can be determined...",
                    '<20>{#p/undyne}{#e/undyne/1}Feh.\nDetermination will only get you so far.'
                ]
                : respecc()
                    ? [
                        '<20>{#p/undyne}{#e/undyne/1}Still going!?',
                        '<20>{#p/undyne}{#e/undyne/17}Ha...\nAlphys told me humans can be determined...'
                    ]
                    : [
                        '<20>{#p/undyne}{#e/undyne/1}Alphys told me humans can be determined...',
                        '<20>{#p/undyne}{#e/undyne/1}I see now what she meant by that!'
                    ],
        turnTalkC3: () =>
            SAVE.data.n.state_starton_papyrus === 1 || respecc()
                ? ['<20>{#p/undyne}{#e/undyne/1}But you know what?', "<20>{#e/undyne/1}I'm determined, too!"]
                : ["<20>{#p/undyne}{#e/undyne/1}But I'm determined, too!"],
        turnTalkC4: () =>
            respecc()
                ? ["<20>{#p/undyne}{#e/undyne/5}Determined to show you who's BOSS!"]
                : ['<20>{#p/undyne}{#e/undyne/6}Determined to end this RIGHT NOW!!'],
        turnTalkC5: () =>
            respecc() ? ["<20>{#p/undyne}{#e/undyne/9}... WHO'S BOSS!"] : ['<20>{#p/undyne}{#e/undyne/7}... RIGHT NOW!'],
        turnTalkC6: () =>
            respecc()
                ? ["<20>{#p/undyne}{#e/undyne/10}... WHO'S...\n...\n... BOSS!!"]
                : ['<20>{#p/undyne}{#e/undyne/9}... RIGHT...\n...\n... NOW!!'],
        turnTalkC7: ['<20>{#p/undyne}{#e/undyne/10}Ha...\nHa...'],
        turnTalkC8: () =>
            respecc()
                ? ['<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nFINAL ATTACK!!!']
                : ['<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nDIE ALREADY, YOU LITTLE BRAT!'],
        turnTalkC9a: ["<20>{#p/undyne}{#e/undyne/5}YOU'RE GETTING IN MY WAY!"],
        turnTalkC9b: ['<20>{#p/undyne}{#e/undyne/5}I WILL NEVER TAKE MERCY FROM THE LIKES OF YOU!'],
        turnTalkC10a: ['<20>{#p/undyne}{#e/undyne/6}I WILL NOT BE DEFEATED!'],
        turnTalkC10b: ['<20>{#p/undyne}{#e/undyne/6}I WILL FIGHT YOU TO THE BITTER END!'],
        turnTalkD: ['<20>{#p/undyne}{#e/undyne/9}...'],
        respeccTalk1: [
            '<20>{#p/undyne}{#e/undyne/11}\x00*huff...*\n\x00*huff...*',
            '<20>{#e/undyne/3}...',
            '<20>{#e/undyne/4}Well...',
            "<20>{#e/undyne/17}You're certainly tough, aren't you?"
        ],
        respeccTalk2: [
            '<20>{#e/undyne/0}... heh, enough to beat me, anyway.',
            "<20>{#e/undyne/13}But hey, that's pretty freaking tough!",
            "<20>{#e/undyne/1}Even though not everyone's gonna like you for it...",
            '<20>{#e/undyne/0}Seeing a human fight with honor gives me hope for your kind.',
            '<20>{#e/undyne/4}...',
            "<20>{#e/undyne/3}It's a shame we can't do battle forever, huh?"
        ],
        respeccTalk3: [
            '<20>{#e/undyne/1}Just... whatever you do, whoever you fight with...',
            "<20>{#e/undyne/1}Don't let it change who you are, got it?",
            '<20>{#e/undyne/3}...',
            '<20>{#e/undyne/4}Until next time...',
            '<20>{#e/undyne/4}Warrior.'
        ],
        death1: () =>
            respecc()
                ? [
                    '<20>{#p/undyne}Ngahhh...',
                    '<21>I thought...\nYou were different...',
                    '<20>But then...\n... you actually...\n... urgh...',
                    '<20>...'
                ]
                : [
                    '<20>{#p/undyne}Ngahhh...',
                    '<20>You were stronger...\nThan I thought...',
                    '<20>So then...\n... this is where...\n... it ends...',
                    '<20>...'
                ],
        death2: () =>
            helmetdyneAttack() ? ['<20>{#p/undyne}{#e/undyne/31}...'] : ['<20>{#p/undyne}{#e/undyne/31}No...'],
        death3: () =>
            helmetdyneAttack()
                ? ['<20>{#p/undyne}{#e/undyne/46}... no.', '<20>{#e/undyne/43}Not yet.']
                : [
                    '<20>{#p/undyne}{#e/undyne/32}NO!',
                    "<20>I won't die!",
                    ...(respecc()
                        ? ['<20>This betrayal...\nThis... dishonor...', "<20>I won't let you get away with it!"]
                        : [
                            SAVE.data.n.state_starton_papyrus === 1
                                ? '<20>{#e/undyne/36}Alphys...\nAsgore...'
                                : '<20>{#e/undyne/36}Alphys...\nAsgore...\nPapyrus...',
                            '<20>{#e/undyne/32}Everyone is counting on me to protect them!'
                        ]),
                    '<20>{#e/undyne/32}NNNNGAH!'
                ],
        death4: () =>
            helmetdyneAttack()
                ? ["<20>{#e/undyne/45}Not while you're still breathing."]
                : [
                    '<20>{#p/undyne}{#e/undyne/32}Human!',
                    respecc()
                        ? '<20>{#e/undyne/36}In the name of a good and fair fight...'
                        : "<20>{#e/undyne/36}In the name of everybody's hopes and dreams...",
                    '<20>{#e/undyne/32}I WILL DEFEAT YOU!'
                ],
        determination1: () =>
            helmetdyneAttack() ? [] : ["<20>{#p/undyne}{#e/undyne/32}Come on, is that all you've got!?"],
        determination2: () => (helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/32}... pathetic.']),
        determination3: () =>
            helmetdyneAttack() ? [] : ["<20>{#p/undyne}{#e/undyne/32}You're going to have to try harder than that!"],
        determination4: () =>
            helmetdyneAttack()
                ? []
                : respecc()
                    ? ["<20>{#p/undyne}{#e/undyne/34}W-where's your fighting spirit now, huh?"]
                    : ['<20>{#p/undyne}{#e/undyne/34}S-see how strong we are when we believe in ourselves?'],
        determination5: () =>
            helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/35}H... heh...', '<20>{#e/undyne/34}Had enough yet?'],
        determination6: () => (helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/34}...']),
        determination7: () =>
            helmetdyneAttack() ? [] : ["<20>{#p/undyne}{#e/undyne/35}... I won't...\n...\ngive up..."],
        determination8: () => (helmetdyneAttack() ? [] : ['<20>{#p/undyne}{#e/undyne/34}...']),
        death5: () => [
            helmetdyneAttack() ? '<20>{#p/undyne}{#e/undyne/43}...' : '<20>{#p/undyne}{#e/undyne/34}...',
            '<20>{#p/undyne}{#e/undyne/47}Ha...\nHa...',
            '<20>{#e/undyne/44}...\nAlphys...',
            '<20>This is what I was afraid of...',
            '<20>{#e/undyne/49}This is why I never told you...',
            '<20>...'
        ],
        death6: () => [
            '<20>{#p/undyne}{#e/undyne/44}No...\nNo!',
            '<20>{#e/undyne/34}Not yet!',
            "<20>{#e/undyne/48}I won't die!"
        ],
        death7: ['<20>{*}{#p/undyne}{#i/4}{@random=1.1/1.1}NGAHHHHHHHH!!!{^10}{%}'],
        death8a: ["<20>{*}{#p/undyne}{#i/5}{#v/1}{@random=1.1/1.1}I WON'T DIE!{^15}{%}"],
        death8b: ["<20>{*}{#p/undyne}{#i/5}{#v/2}{@random=1.1/1.1}I WON'T DIE!{^15}{%}"],
        death8c: ["<20>{*}{#p/undyne}{#i/5}{#v/3}{@random=1.1/1.1}I WON'T DIE!{^15}{%}"],
        death9: ["<20>{*}{#p/undyne}{#i/6}{#v/4}{@random=1.1/1.1}I{^10} WON'T{^30}{%}"],
        deterStatus1: ['<32>{#p/story}* Undyne is smiling as if nothing is wrong.'],
        deterStatus2: ["<32>{#p/story}* Undyne's body is wavering."],
        deterStatus3: ["<32>{#p/story}* Undyne's body is losing its shape."],
        deterStatus4: ['<32>{#p/story}* Undyne takes a deep breath.'],
        deterStatus5: ['<32>{#p/story}* Undyne stands defiantly.'],
        challengeText1: ["<32>{#p/human}* (You tell Undyne her attacks are too easy.)\n* (She doesn't care.)"],
        challengeText2: [
            '<32>{#p/human}* (You tell Undyne her attacks are too easy.)',
            '<32>{#p/basic}* The bullets get faster.'
        ],
        challengeText3: [
            '<32>{#p/human}* (You tell Undyne her attacks are too easy.)',
            '<32>{#p/basic}* The bullets get ridiculous.'
        ],
        challengeText4: ['<32>{#p/human}* (You tell Undyne she should give you a REAL fight.)'],
        challengeText5: [
            '<32>{#p/human}* (You tell Undyne her attacks are too easy.)',
            "<32>{#p/basic}* Undyne can't go any faster."
        ],
        challengeText7: ["<32>{#p/human}* (You tell Undyne her attacks are too easy.)\n* (She's not paying attention.)"],
        pleadText1: ["<32>{#p/human}* (You tell Undyne you didn't want to fight.)\n* (Nothing happens.)"],
        pleadText2: [
            '<32>{#p/human}* (You tell Undyne you just want to be friends.)',
            '<32>{#p/basic}* Undyne remembers someone.\n* The bullets get a little less extreme.'
        ],
        pleadText3: ["<32>{#p/human}* (You tell Undyne you just want to be friends.)\n* (She doesn't believe you.)"],
        pleadText4: ["<32>{#p/human}* (You tell Undyne you didn't want to fight.)\n* (She laughs.)"],
        pleadText5: ["<32>{#p/human}* (You tell Undyne you didn't want to fight.)\n* (She looks confused.)"],
        pleadText6: ["<32>{#p/human}* (You tell Undyne you didn't want to fight.)\n* (She's not paying attention.)"],
        pleadText7a: [
            '<32>{#p/human}* (You tell Undyne you just want to be friends.)',
            '<32>{#p/basic}* Undyne agrees.\n* The bullets get a little more extreme.'
        ],
        pleadText7b: [
            '<32>{#p/human}* (You tell Undyne you just want to be friends.)',
            "<32>{#p/basic}* Undyne agrees.\n* But the bullets can't get any faster."
        ],
        pleadText7c: [
            '<32>{#p/human}* (You tell Undyne you just want to be friends.)',
            '<32>{#p/basic}* Undyne agrees.\n* The bullets are getting out of control.'
        ],
        pleadText8: ["<32>{#p/human}* (You tell Undyne you didn't want to fight.)\n* She glares at you coldly."],
        genoCutscene1: ['<08>{#p/kidding}{#e/kidd/0}...', '<08>{#e/kidd/1}H... huh?', '<08>{|}{#e/kidd/1}What is- {%}'],
        genoCutscene2: ['<08>{#p/kidding}{#e/kidd/3}UNDYNE!!!', '<08>{#e/kidd/4}I...!'],
        genoCutscene3: ['<20>{#p/undyne}{#e/undyne/1}Kid...?'],
        genoCutscene3x: [
            '<20>{#p/undyne}{#e/undyne/4}Hey, shh...',
            "<20>{#e/kidd/7}I'll be fine, kiddo.",
            '<20>{#p/undyne}Just get outta here, okay?'
        ],
        genoCutscene4: [
            "<08>{#p/kidding}{#e/kidd/5}I couldn't stop it...",
            '<08>{#e/kidd/6}They... he...',
            '<08>{#e/kidd/7}He did some- thing to me...'
        ],
        genoCutscene5: ['<20>{#p/undyne}{#e/undyne/2}Your eye...'],
        genoCutscene6: ['<08>{#p/kidding}{#e/kidd/6}I...', '<08>{#p/kidding}{#e/kidd/6}I...'],
        genoCutscene7: ['<08>{#p/kidding}{#e/kidd/7}I hurt you...'],
        genoCutscene8: ["<20>{#p/undyne}{#e/undyne/3}It's nothing..."],
        genoCutscene9: [
            "<20>{#e/undyne/4}Look, I'll take care of these punks.",
            "<20>You'll never have to kill anyone for them again.",
            '<20>Just get outta here, okay?'
        ],
        genoCutscene10: ['<08>{#e/kidd/8}{#p/kidding}...'],
        genoCutscene11: ['<20>{#p/undyne}{#e/undyne/5}Dr. Alphys will look after you.', '<20>{#e/undyne/6}Now go!'],
        genoCutscene12a: [
            '<20>{#p/undyne}{#e/undyne/7}... heh...\n\"It\'s nothing...\"',
            '<20>No... s-somehow, with just one hit...'
        ],
        genoCutscene12b: ["<20>I'm already...", '<20>Already...'],
        genoCutscene12c: ['<20>D...\nDamn it...', '<20>Papyrus...\nAsgore...\nAlphys...'],
        genoCutscene12d: ['<20>Just like that, I...', "<20>{#e/undyne/8}I've failed you."],
        genoCutscene12e: ['<20>I...', "{#e/undyne/8}I can't..."],
        genoCutscene13: ['<20>{#p/undyne}...', '<11>{#e/undyne/12}No...'],
        genoCutscene14: [
            "<20>{*}{#p/undyne}{#e/undyne/11}My body...\nIt feels like it's splitting apart.{^15}{%15}",
            "<20>{*}Like any instant, I'll scatter into a million pieces.{^15}{%15}",
            '<20>{*}But deep, deep in my SOUL...{^15}{%15}',
            "<20>{*}There's a burning feeling I can't describe.{^15}{%15}",
            "<20>{*}{#e/undyne/12}A feeling that WON'T let me die.{^15}{%15}",
            "<20>{*}{#e/undyne/11}You've killed too many of our people... too many of my friends...{^15}{%15}",
            "<20>{*}If you two get past me, you'll destroy them all.{^15}{%15}",
            "<20>{*}Everyone's hopes.\nEveryone's dreams.\nVanquished in an instant.{^15}{%15}",
            "<20>{*}{#e/undyne/12}But I WON'T let you do that.{^15}{%15}",
            '<20>{*}{#e/undyne/13}Right now, everyone in the galaxy...{^15}{%15}',
            '<20>{*}I can feel their minds working as one.{^15}{%15}',
            '<20>{*}And we all have ONE goal.{^15}{%15}',
            '<20>{*}{#e/undyne/14}To defeat YOU.{^15}{%15}',
            '<20>{*}{#e/undyne/13}Human.\nAsriel.\n... no, WHATEVER you two are.{^15}{%15}',
            '<20>{*}{#e/undyne/14}For the sake of the entire galaxy...{^15}{%15}',
            '<20>{*}{#e/undyne/15}{@random=1.1/1.1}I, Undyne, will strike you down!{^15}{%15}'
        ],
        genoCutscene14x: [
            '<20>{#e/undyne/11}No...',
            '<20>{#e/undyne/12}Not like this...!',
            '<20>{#e/undyne/13}Everyone in the galaxy is counting on me!',
            "<20>{#e/undyne/14}I WON'T let them down!"
        ],
        genoCutscene15: ["<20>{*}{#p/undyne}{#v/1}You're gonna have to try a little harder than THAT.{%20}"],
        genoCutscene15x: ["<20>{#p/undyne}{#v/1}You're gonna have to try a little harder than that!{%20}"],
        genoDeath1: [
            '<20>{#p/undyne}{#v/1}Damn it...',
            "<20>So even THAT power...\nIt wasn't enough...?",
            '<20>...',
            '<20>{#e/undyne/25}Heh...',
            '<20>Heheheh...'
        ],
        genoDeath2: [
            '<20>{*}{#e/undyne/26}If you...{^60}{%}',
            "<20>{*}If you think I'm gonna give up hope, you're wrong.{^60}{%}",
            "<20>{*}{#e/undyne/27}'Cause I've... got my friends behind me.{^60}{%}",
            '<20>{*}{#e/undyne/28}Alphys told me she had a backup plan in case I failed...{^60}{%}',
            "<20>{*}{#e/undyne/29}By now, she's called Asgore and told him to absorb the six human SOULs.{^60}{%}"
        ],
        genoDeath3: ['<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}And with that power...{^60}{%}'],
        genoDeath4: ['<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}{@random=1.1/1.1}This world will live on...!{^60}{%}'],
        lowStatus1: ['<32>{#p/story}* The starlight is glimmering...'],
        lowStatus2: ['<32>{#p/story}* Undyne flips her spear impatiently.'],
        lowStatus3: ['<32>{#p/story}* Twinkling shards drift in front of you.'],
        lowStatus4: ['<32>{#p/story}* Steam whirls around you.'],
        lowStatus5: ['<32>{#p/story}* The spears pause for a moment.'],
        genoStatus1: ['<32>{#p/asriel2}* How did she...'],
        genoStatus2: ['<32>{#p/asriel2}* No...'],
        genoStatus3: ['<32>{#p/asriel2}* Even in my timelines, she never...'],
        genoStatus4: ["<32>{#p/asriel2}* $(name), I don't think you can beat her alone."],
        genoStatus5: ['<32>{#p/asriel2}* ...'],
        trueGenoStatusX: (assistValue: number) =>
            assistValue < 2
                ? ["<32>{#p/asriel2}* Let's see how she likes THIS."]
                : ['<32>{#p/asriel2}* Remember our strategy.'],
        trueGenoStatus1: ['<32>{#p/asriel2}* Stay focused.'],
        trueGenoStatus2: ["<32>{#p/asriel2}* Don't let her get to you."],
        trueGenoStatus3: ['<32>{#p/asriel2}* Just keep attacking...'],
        trueGenoStatus4: ["<32>{#p/asriel2}* She can't hold on forever."],
        trueGenoStatus5: ['<32>{#p/asriel2}* Our victory is inevitable.'],
        trueGenoStatusLow1: ['<32>{#p/asriel2}* Almost dead...!'],
        trueGenoStatusLow2: ['<32>{#p/asriel2}* Come on...!'],
        asrielExplain: () => [
            ...(battler.volatile[0].vars.azzyAssist < 2
                ? ["<20>{#p/asriel2}{#f/4}Your attacks aren't going to work, $(name)."]
                : [
                    "<20>{#p/asriel2}{#f/8}You DO remember what was going on last time, don't you?",
                    "<20>{#f/4}Your attacks weren't going to do anything to her, $(name).",
                    '<20>{#f/3}Between then and now, though, I had a chance to think.'
                ]),
            "<20>{#f/13}This body... it still hasn't fully accepted me yet.",
            '<20>{#f/16}Still, it might just be enough to help you.',
            "<20>{#f/3}When you make an attack, I'll cast a spell to identify Undyne's weak points.",
            "<20>{#f/4}It's up to you to point your attacks towards them.",
            '<20>{#f/3}Good luck...'
        ],
        neutralFinalStatus: ['<32>{#p/story}* Undyne looks determined.']
    },
    b_opponent_dateundyne: {
        name: '* Undyne',
        snacker: () =>
            SAVE.data.b.undyne_respecc
                ? ['<20>{#p/undyne}{#e/undyne/13}Hope you like it, fuhuhu!']
                : ['<20>{#p/undyne}{#e/undyne/12}Enjoy it while you still can.'],
        intro: () =>
            SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#p/undyne}{#f/0}... so this is it.',
                    '<20>Our final battle.',
                    '<20>...',
                    '<20>{#e/undyne/12}Warrior to warrior.',
                    '<20>Across the sky of stars.',
                    '<20>I challenge you to a duel...',
                    '<20>{#e/undyne/9}For the honor of EVERYONE ON THE OUTPOST!!',
                    "<20>{#e/undyne/7}IT'S THE ONLY WAY I CAN SETTLE THE SCORE BETWEEN US!!",
                    "<20>{#e/undyne/9}SO COME ON, HIT ME WITH EVERYTHING YOU'VE GOT!!!\nNGAHHHH!!!"
                ]
                : [
                    "<20>{#p/undyne}{#f/0}I've been defeated, my house is in ruins...",
                    '<20>I even failed to befriend you.',
                    '<20>...',
                    "<20>{#e/undyne/12}That's it.",
                    "<20>I don't care if you're my house- guest anymore.",
                    '<20>{#e/undyne/9}One final rematch, all out on both sides!!',
                    "<20>{#e/undyne/7}IT'S THE ONLY WAY I CAN REGAIN MY LOST PRIDE!!",
                    "<20>{#e/undyne/9}NOW COME ON, HIT ME WITH EVERYTHING YOU'VE GOT!!!\nNGAHHHH!!!"
                ],
        status1: ['<32>{#p/story}* Undyne is letting you make the first attack.'],
        act_check: ['<32>{#p/story}* UNDYNE - ATK 41 DEF 21\n* The real, ACTUAL final battle has finally begun!'],
        idleTalk1: ["<20>{#p/undyne}{#e/undyne/9}Show me what you're made of!"],
        idleTalk2: ['<20>{#p/undyne}{#e/undyne/9}Come on!'],
        idleTalk3: ["<20>{#p/undyne}{#e/undyne/9}What's the matter, scared?"],
        idleTalk4: ["<20>{#p/undyne}{#e/undyne/9}What's the holdup?"],
        fightTalk: (stronk: boolean) =>
            SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#p/undyne}{#e/undyne/19}Ouch.',
                    '<20>{#e/undyne/19}That actually kind of hurt.',
                    '<20>{#e/undyne/4}Heh...',
                    "<20>{#e/undyne/3}I guess that's what I get for under- estimating my opponent.",
                    "<20>{#e/undyne/0}Though, I'm not sure why I'm so surprised.",
                    '<20>{#e/undyne/1}Given your battle style to date.'
                ]
                : [
                    '<20>{#p/undyne}{#e/undyne/16}What.',
                    "<20>{#e/undyne/15}That's the best you can manage...?",
                    ...(SAVE.data.b.oops
                        ? [
                            '<20>{#e/undyne/3}Even attacking at full force...',
                            stronk
                                ? "<20>{#e/undyne/33}You can't give me more than a scratch, huh?"
                                : "<20>{#e/undyne/33}You just can't muster any intent to hurt me, huh?"
                        ]
                        : ["<20>{#e/undyne/17}You didn't even land the hit on me!", '<20>{#e/undyne/17}...'])
                ],
        flirtTalk0: [
            '<20>{#p/undyne}{#e/undyne/12}When I told you to hit me...',
            '<20>{#e/undyne/9}I MEANT IT LITERALLY!'
        ],
        flirtTalk1: [
            '<20>{#p/undyne}{#e/undyne/6}Wh-... no!',
            "<20>{#e/undyne/8}If anyone's got someone's heart, it's...",
            '<20>{#e/undyne/5}Wait, no-\nShut up!!!'
        ],
        flirtTalk2: [
            '<20>{#p/undyne}{#e/undyne/10}Would you STOP THAT!?',
            "<20>{#e/undyne/15}If you keep going like this, I'll...",
            "<20>{#e/undyne/16}I'll..."
        ],
        flirtTalk3: [
            '<20>{#p/undyne}{#p/undyne}{#e/undyne/18}Wha-...\nI...!',
            '<20>{#e/undyne/19}...',
            '<20>{#e/undyne/10}AHHHHHHHHHHHHHH-\nYOU FLIRTATIOUS LITTLE BRAT!',
            '<20>{#e/undyne/8}I HAVE HALF THE NERVE TO...',
            '<20>{#e/undyne/7}TO...',
            '<20>{#e/undyne/7}...'
        ],
        flirtStatus0: ['<33>{#p/story}* In this case, FIGHTING might not be such a bad idea.'],
        flirtStatus1: ['<33>{#p/story}* Something magical is happening.'],
        flirtStatus2: ['<32>{#p/story}* Undyne is at her limit.'],
        flirtText0: ['<32>{#p/human}* (You flirt with Undyne.)'],
        flirtText1: ["<32>{#p/human}* (You tell Undyne she's got your heart hook, line, and sinker.)"],
        flirtText2: ["<32>{#p/human}* (You commend Undyne on her brave, fighting spirit.)\n* (She's YOUR hero, now.)"],
        flirtText3: ["<32>{#p/human}* (You tell Undyne she's a precious, adorable little urchin.)"],
        cutscene1: ['<20>{#p/undyne}{#e/undyne/4}Heh... you know what?'],
        cutscene2: (fought: boolean) => [
            ...(SAVE.data.b.undyne_respecc
                ? [
                    "<20>{#e/undyne/11}I don't really want to hurt you.",
                    '<20>{#e/undyne/11}At first, I was excited by the prospect of fighting you...'
                ]
                : [
                    "<20>{#e/undyne/11}I don't actually want to hurt you either.",
                    '<20>{#e/undyne/11}At first, I despised your stupid saccharine schtick, but...'
                ]),
            ...(fought
                ? SAVE.data.b.undyne_respecc
                    ? ['<20>{#e/undyne/3}But seeing you go along with me right now, it...']
                    : SAVE.data.b.oops
                        ? ['<20>{#e/undyne/3}The way you hit me right now, it...']
                        : ['<20>{#e/undyne/3}The way you missed your attack right now, it...']
                : SAVE.data.b.undyne_respecc
                    ? ['<20>{#e/undyne/3}But seeing you act that way towards me right now, it...']
                    : ['<20>{#e/undyne/3}The way you acted towards me right now, it...']),
            '<20>{#e/undyne/4}Reminded me of someone I used to train with.',
            ...(SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#e/undyne/11}... you may not be a wimpy loser like him.',
                    '<20>{#e/undyne/11}But one thing you do have in common...',
                    '<20>{#e/undyne/1}Is a sense of respect for what it means to fight.'
                ]
                : [
                    "<20>{#e/undyne/11}Now I know you aren't just some wimpy loser.",
                    "<20>{#e/undyne/13}You're a wimpy loser with a big heart!",
                    '<20>{#e/undyne/4}Just like him...'
                ]),
            '<20>{#e/undyne/3}...',
            '<20>{#e/undyne/3}Listen, human.',
            '<20>{#f/undyne/0}It seems that you and Asgore are destined to meet.',
            SAVE.data.b.undyne_respecc ? '<20>{#e/undyne/3}Unlike you...' : '<20>{#e/undyne/3}Knowing him...',
            "<20>{#e/undyne/4}He probably doesn't want to fight you.",
            ...(SAVE.data.b.undyne_respecc
                ? [
                    '<20>{#e/undyne/0}Talk to him, if you can.',
                    '<20>{#e/undyne/0}Tell him what you want upfront.',
                    '<20>{#e/undyne/3}I get that might be a little weird for you, but...',
                    "<20>{#e/undyne/4}I'm sure you two can work something out.",
                    '<20>{#e/undyne/0}And as for our freedom?',
                    '<20>{#e/undyne/1}Well.',
                    '<20>{#e/undyne/3}If some other, less respectable human ends up here...',
                    "<20>{#e/undyne/3}I'll take THEIR soul instead of yours."
                ]
                : [
                    '<20>{#f/undyne/0}Talk to him.',
                    "<20>{#f/undyne/1}I'm sure you two can work something out.",
                    '<20>{#e/undyne/3}Eventually, some meaner human will end up here...',
                    "<20>{#e/undyne/3}And I'll take THEIR soul instead of yours."
                ]),
            '<20>{#f/undyne/1}That makes sense, right?\nFuhuhu.',
            '<20>{#f/undyne/0}Oh, and if you DO hurt Asgore...',
            "<20>{#e/undyne/11}I'll take the human SOULs... cross the force field...",
            ...(SAVE.data.b.undyne_respecc
                ? ['<20>{#e/undyne/8}And give you a REAL battle!', "<20>{#e/undyne/13}That's what warriors do, right?"]
                : [
                    '<20>{#e/undyne/8}And beat the hell out of you!',
                    "<20>{#e/undyne/13}That's what friends are for, right?"
                ]),
            '<20>{#e/undyne/13}Fuhuhu!',
            "<20>{#e/undyne/13}Now let's get the hell out of this flaming house!"
        ]
    },

    i_artifact: {
        battle: {
            description: 'It is said this pendant was worn by Erogot himself.',
            name: 'Artifact'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Legendary Artifact.)',
            ...(!SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

                ? SAVE.data.b.s_state_papsink
                    ? ['<32>{#p/basic}* The dog dances even harder!']
                    : ["<32>{#p/basic}* ... the dog's sighing quiets down, even if you can't tell."]
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Inscribed with the signature of a former world leader.)']
                : ['<32>{#p/basic}* It is said this pendant was worn by Erogot himself.'],
        name: 'Legendary Artifact',
        use: () => [
            '<32>{#p/human}* (You use the Legendary Artifact.)',
            ...((battler.active && battler.alive[0].opponent.metadata.reactArtifact) ||
                (game.room === 'f_truth' && // NO-TRANSLATE

                    SAVE.data.n.epiphany < 1 &&
                    !SAVE.data.b.svr &&
                    !world.runaway)
                ? []
                : !SAVE.data.b.svr && game.room === 's_secret' && SAVE.data.n.state_starton_trashprogress < 2 // NO-TRANSLATE

                    ? SAVE.data.b.s_state_papsink
                        ? ["<32>{#p/basic}* ... the dog's dancing slows down, even if you can't tell."]
                        : ['<32>{#p/basic}* The dog sighs even louder!']
                    : ['<32>{#p/human}* (Nothing happens.)'])
        ]
    },
    i_epiphany: {
        battle: {
            description: 'Makes the weak-willed see things from your point of view.',
            name: 'Epiphany'
        },
        drop: ['<32>{#p/human}* (You cast The Epiphany away.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (A tome from centuries past, used first by a former world leader.)']
                : [
                    '<33>{#p/basic}* Makes the weak-willed see things from your point of view.\n* Not viable outside of battle.'
                ],
        name: 'The Epiphany',
        use: () =>
            battler.active
                ? []
                : SAVE.data.b.ufokinwotm8
                    ? [
                        '<32>{#p/human}* (You activated The Epiphany on yourself, with the intent to hug.)',
                        '<32>{#p/human}* (No effect.)'
                    ]
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (You read through the ancient text of the tome.)',
                            '<33>* (The text appears to be self- translating.)'
                        ]
                        : ['<32>{#p/human}* (You activated The Epiphany.)', '<32>{#p/human}* (No effect outside of battle.)']
    },
    i_astrofood: {
        battle: {
            description: 'Not for the faint of teeth.',
            name: 'Alcaçuz'
        },
        drop: ['<32>{#p/human}* (You throw away the Licorice.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (24 HP.)']
                : ['<32>{#p/basic}* \"Licorice\" Heals 24 HP\n* Not for the faint of teeth.'],
        name: 'Alcaçuz',
        use: ['<32>{#p/human}* (You gnawed at the Licorice.)']
    },
    i_sap: {
        battle: {
            description: "Sourced from a tree that grew on the monsters' homeworld.",
            name: 'Sap'
        },
        drop: ['<32>{#p/human}* (You throw away the Tree Sap.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (35 HP.)']
                : ['<32>{#p/basic}* \"Tree Sap\" Heals 35 HP\n* Sourced from a tree that grew on the monsters\' homeworld.'],
        name: 'Tree Sap',
        use: ['<32>{#p/human}* (You chewed the Tree Sap.)']
    },
    i_goggles: {
        battle: {
            description: 'Expand your reality!\nMakes you invincible longer.',
            name: 'Headset'
        },
        drop: ['<32>{#p/human}* (You throw away the AR Headset.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (6 DF.)']
                : ['<32>{#p/basic}* \"AR Headset\" (6 DF)\n* Expand your reality! Makes you invincible longer.'],
        name: 'AR Headset',
        use: ['<32>{#p/human}* (You wear the AR Headset.)']
    },
    i_goggles_x: {
        battle: {
            description: 'Makes you invincible just a little longer.',
            name: 'Headset?'
        },
        drop: ['<32>{#p/human}* (You throw away the AR Headset.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (4 DF.)']
                : ['<32>{#p/basic}* \"AR Headset?\" (4 DF)\n* Expand your reality! Makes you invincible a little longer.'],
        name: 'AR Headset?',
        use: ['<32>{#p/human}* (You wear the AR Headset.)']
    },
    i_padd: {
        battle: {
            description: 'A digital journal.\nMakes you invincible longer.',
            name: 'Datapad'
        },
        drop: ['<32>{#p/human}* (You throw away the Datapad.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (2 AT.)']
                : ['<32>{#p/basic}* \"Datapad\" (2 AT)\n* A digital journal.\n* Makes you invincible longer.'],
        name: 'Datapad',
        use: ['<32>{#p/human}* (You equip the Datapad.)']
    },
    i_padd_x: {
        battle: {
            description: 'Makes you invincible just a little longer.',
            name: 'Datapad?'
        },
        drop: ['<32>{#p/human}* (You throw away the Datapad.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (0 AT.)']
                : ['<32>{#p/basic}* \"Datapad?\" (0 AT)\n* Makes you invincible just a little longer.'],
        name: 'Datapad?',
        use: ['<32>{#p/human}* (You equip the Datapad.)']
    },
    i_punchcard: {
        battle: {
            description: 'A picturesque landscape...',
            name: 'Postcard'
        },
        drop: ['<32>{#p/human}* (You throw away the Postcard.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (A perfectly ordinary piece of paper, with no notable attributes.)']
                : ['<32>{#p/basic}* A picturesque landscape...'],
        name: 'Postcard',
        use: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* (You rip up the Postcard.)',
                    battler.active
                        ? `<32>{#p/story}* ATTACK up by ${2 + battler.at_bonus}!`
                        : '<32>{#p/human}* (No effect outside of battle.)'
                ]
                : battler.active
                    ? ['<32>{#p/human}* (You daydream about the landscape on the Postcard.)\n* (Nothing happens.)']
                    : []
    },
    i_quiche: {
        battle: {
            description: 'With great confections come great sweetsponsibilities.',
            name: 'Cheesecake'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Cheesecake.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ['<32>{#p/basic}* And the cycle of abandonment continues.']),
            ...(!battler.active &&
                (instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                    (fetchCharacters()
                        .find(c => c.key === 'sans') // NO-TRANSLATE

                        ?.position.extentOf(player) ?? 240) < 240)
                ? [
                    "<25>{#p/sans}{#f/3}* ... oh.\n* that's a shame.",
                    "<25>{#p/sans}{#f/2}* i'd hoped someone would take care of that for me."
                ]
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (45 HP.)']
                : ['<32>{#p/basic}* \"Cheesecake\" Heals 45 HP\n* With great confections come great sweetsponsibilities.'],
        name: 'Cheesecake',
        use: () => [
            '<32>{#p/human}* (You eat the Cheesecake.)',
            ...(!battler.active &&
                (instance('main', 'sentryskeleton') !== void 0 || // NO-TRANSLATE

                    (fetchCharacters()
                        .find(c => c.key === 'sans') // NO-TRANSLATE

                        ?.position.extentOf(player) ?? 240) < 240)
                ? [
                    '<25>{#p/sans}{#f/0}* ... oh.\n* you actually ate it?',
                    '<25>{#p/sans}{#f/2}* i had no idea anyone liked my baking skills.'
                ]
                : [])
        ]
    },
    i_crisp: {
        battle: {
            description: 'A bag of chisps from far beyond the stars.',
            name: 'Chisps'
        },
        drop: ['<32>{#p/human}* (You throw away the Cosmic Chisps.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (18 HP.)']
                : ['<32>{#p/basic}* \"Cosmic Chisps\" Heals 18 HP\n* A bag of chisps from far beyond the stars.'],
        name: 'Cosmic Chisps',
        use: ['<32>{#p/human}* (You eat the Cosmic Chisps.)']
    },
    i_rations: {
        battle: {
            description: 'Standard-issue rations.\nGreat for emergencies.',
            name: 'Ração'
        },
        drop: ['<32>{#p/human}* (You throw away the Rations.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (30 HP.)']
                : ['<32>{#p/basic}* \"Rations\" Heals 30 HP\n* Standard-issue rations.\n* Great for emergencies.'],
        name: 'Ração',
        use: ['<32>{#p/human}* (You consume the Rations.)']
    },
    i_tea: {
        battle: {
            description: 'Increases your SPEED in battle.',
            name: 'Tea'
        },
        drop: ['<32>{#p/human}* (You throw away the Nebula Tea.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : [
                    '<33>{#p/basic}* \"Nebula Tea\" Heals 15 HP\n* Increases your SPEED in battle.\n* Not viable outside of battle.'
                ],
        name: 'Nebula Tea',
        use: () => [
            '<32>{#p/human}* (You drink the Nebula Tea.)',
            battler.active ? '<32>{#p/story}* SPEED up by 1!' : '<32>{#p/human}* (No effect outside of battle.)'
        ]
    },
    i_tzn: {
        battle: {
            description: 'Like Earth tofu, but spacier.',
            name: 'Tofu'
        },
        drop: ['<32>{#p/human}* (You throw away the Space Tofu.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (17 HP.)']
                : ['<32>{#p/basic}* \"Space Tofu\" Heals 17 HP\n* Like Earth tofu, but spacier.'],
        name: 'Space Tofu',
        use: () => [
            '<32>{#p/human}* (You ingest the Space Tofu.)',
            ...(world.meanie
                ? [
                    '<32>* (The taste fills you with a certain kind of feeling...)',
                    battler.active
                        ? `<32>{#p/story}* ATTACK up by ${4 + battler.at_bonus}!`
                        : '<32>{#p/human}* (No effect outside of battle.)'
                ]
                : [])
        ]
    },
    i_flakes: {
        battle: {
            description: 'Finally, a proper breakfast.',
            name: 'Tem Flakes'
        },
        drop: ['<32>{#p/human}* (You discard the Temmie Flakes.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (2 HP.)']
                : ['<32>{#p/basic}* \"Temmie Flakes\" Heals 2 HP\n* Finally, a proper breakfast.'],
        name: 'Temmie Flakes',
        use: ['<32>{#p/human}* (You eat the Temmie Flakes.)']
    },
    i_temyarmor: {
        battle: {
            description: 'The things you can do with a college education!',
            name: 'Tem Armor'
        },
        drop: ['<32>{#p/human}* (You throw away the Temmie Armor.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 AT, 20 DF.)']
                : [
                    '<32>{#p/basic}* \"Temmie Armor\" (10 AT, 20 DF)\n* The things you can do with a college education!',
                    '<32>* Makes you invincible a lot longer...',
                    '<32>* Restores a lot of lost HP after each turn...',
                    "<32>* Your opposition's attacks have a fair chance to heal you...",
                    '<32>* Significantly increases aim time in battle...',
                    '<32>* It does everything any other item can do, but better.'
                ],
        name: 'Temmie Armor',
        use: ['<32>{#p/human}* (You don the Temmie Armor.)']
    },
    i_boots: {
        battle: {
            description: 'Nimble, but fickle. Not a suitable jetpack replacement.',
            name: 'Boots'
        },
        drop: ['<32>{#p/human}* (You throw away the Hoverboots.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (7 AT.)']
                : ['<32>{#p/basic}* \"Hoverboots\" (7 AT)\n* Nimble, but fickle. Not a suitable jetpack replacement.'],
        name: 'Hoverboots',
        use: ['<32>{#p/human}* (You equip the Hoverboots.)']
    },
    i_flight_suit: {
        battle: {
            description: 'Not for the faint of heart.',
            name: 'Flight Suit'
        },
        drop: ['<32>{#p/human}* (You throw away the Flight Suit.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 DF.)']
                : ['<32>{#p/basic}* \"Flight Suit\" (10 DF)\n* Not for the faint of heart.'],
        name: 'Flight Suit',
        use: ['<32>{#p/human}* (You wear the Flight Suit.)']
    },
    i_snack: {
        battle: {
            description: "Undyne's personal recipe...?",
            name: 'Odd Snack'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Odd Snack.)',
            ...(game.room === 'f_kitchen' // NO-TRANSLATE

                ? ((SAVE.data.b.drop_snack = true),
                    ['<25>{#p/undyne}{#f/8}* Fuhuhuhu!\n* Throw that snack on the cold, hard floor!'])
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : ['<32>{#p/basic}* \"Odd Snack\" Heals 15 HP\n* Undyne\'s personal recipe...?'],
        name: 'Odd Snack',
        use: () => [
            '<32>{#p/human}* (You eat the Odd Snack.)',
            ...(game.room === 'f_kitchen' // NO-TRANSLATE

                ? [
                    SAVE.data.b.undyne_respecc
                        ? '<25>{#p/undyne}{#f/1}* Hope you like it!'
                        : '<25>{#p/undyne}{#f/14}* Hope you like it!'
                ]
                : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* Crispy.'])
        ]
    },

    n_shop_tem: {
        exit: ['<32>{#p/tem}{#k/0}* bOI!!'],
        item: (armorprice: number) =>
            SAVE.data.n.plot === 72
                ? [
                    '0G - free flake!!',
                    '0G - free flake!!',
                    '0G - free flake!!',
                    SAVE.data.b.item_temyarmor || temgone()
                        ? '§fill=#808080§--- UNAVAILABLE ---'
                        : SAVE.data.b.colleg
                            ? `${armorprice}G - temy ARMOR!!!`
                            : '1000G - tem pay 4 colleg',
                    'Exit'
                ]
                : temgone()
                    ? [
                        '0G - tem flake',
                        '0G - tem flake (ON SALE,)',
                        '0G - tem flake (expensiv)',
                        '§fill=#808080§--- UNAVAILABLE ---',
                        'Exit'
                    ]
                    : [
                        '4G - tem flake',
                        '2G - tem flake (ON SALE,)',
                        '20G - tem flake (expensiv)',
                        SAVE.data.b.item_temyarmor
                            ? '§fill=#808080§--- UNAVAILABLE ---'
                            : SAVE.data.b.colleg
                                ? `${armorprice}G - temy ARMOR!!!`
                                : '1000G - tem pay 4 colleg',
                        'Exit'
                    ],
        itemInfo: () =>
            SAVE.data.n.plot === 72
                ? [
                    'Heals 2HP\nfree food\nof tem!!',
                    'Heals 2HP\nfree food\nof tem!!',
                    'Heals 2HP\nfree food\nof tem!!',
                    SAVE.data.b.colleg ? 'Armor: 20DF\nmake\nbattles\nver easy!!!' : 'COLLEG\ntem pursu\nhigher\neducation'
                ]
                : [
                    'Heals 2HP\nfood of\ntem',
                    'Heals 2HP\nDISCOUNT\nFOOD OF\nTEM!!!',
                    'Heals 2HP\nfood of\ntem\n(expensiv)',
                    SAVE.data.b.colleg ? 'Armor: 20DF\nmake\nbattles\nver easy!!!' : 'COLLEG\ntem pursu\nhigher\neducation'
                ],
        itemPrompt: '<09>{#p/tem}{#k/0}hOI!\nwelcome to...\nTEM SHOP!',
        itemPurchase: [
            '<09>{#p/tem}{#k/6}thanks PURCHASE!',
            '<09>{#p/tem}{#k/0}fdshfg',
            '<09>{#p/tem}{#k/2}you don hav da muns,',
            "<10>{#p/human}(You're carrying too much.)"
        ],
        itemPurchasePrompt: (free: boolean) =>
            free ? 'Buy it for FREE?' : temgone() ? 'Take it?' : 'Buy it for\n$(x)G?',
        itemSellPrompt: 'Sell it for\n$(x)G?',
        itemUnavailable: () => (temgone() ? '<09>{#p/basic}Nothing left.' : '<09>{#p/tem}{#k/2}no more item...'),
        itemRestricted: '<09>{#p/tem}{#k/2}not for sale...',
        menu: () =>
            temgone() ? ['Take', 'Steal', 'Read', 'Exit'] : ['Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit'],
        menuPrompt1: '<23>{#p/tem}{#k/0}* hOI!\n* welcom to...\n* da TEM SHOP!!!',
        menuPrompt2: '<23>{#p/basic}* ... but everybody ran.',
        sell1: ['<30>{#p/tem}{#k/2}* NUUU!!!\n* my muns,,,', '<30>{#p/tem}{#k/4}* cannot STEAL!!!'],
        sell2: ['<30>{#p/tem}{#k/3}* No.'],
        steal1: ['<30>{#p/human}* (You took 32767G from behind the counter.)'],
        steal2: ['<30>{#p/basic}* Nothing left.'],
        note: ['<30>{#p/human}* (But there was no note to be found here.)'],
        talk: () => [
            SAVE.data.n.plot === 72 ? 'Good News' : 'Say Hello',
            SAVE.data.n.plot === 72 ? 'Your Future' : SAVE.data.b.colleg ? 'About Temmie Armor' : 'About Yourself',
            SAVE.data.n.plot === 72 ? 'Temmie Secrets' : 'Temmie History',
            'About Shop',
            'Exit'
        ],
        talkPrompt: '<09>{#p/tem}{#k/0}HOI!!!\nim temmie',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#k/0}* yAYA!', '<32>{#p/tem}{#k/0}* tem go to NEW WORLDS!!!']
                    : ['<32>{#p/tem}{#k/0}* hOI!!!', "<32>* i'm temmie"],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#k/0}* yAYA!', '<32>{#p/tem}{#k/0}* tem go to NEW WORLDS!!!']
                    : SAVE.data.b.colleg
                        ? [
                            '<32>{#k/1}* tem armor so GOOds!\n* any battle becom!\n* a EASY victories!!!',
                            '<32>{#k/4}* but, hnnn, tem think...\n* if u use armors, battles woudn b a challenge anymores,',
                            '<32>{#k/3}* but tem...\n* have a solushun.',
                            '<32>{#k/6}* tem wil offer...\n* a {@fill=#ff0}SKOLARSHIPS{@fill=#fff}!',
                            '<32>{#k/3}* if u {@fill=#ff0}lose a lot of battles,{@fill=#fff} tem wil {@fill=#ff0}LOWER THE PRICE{@fill=#fff}!',
                            ...(armorprice() <= 1000
                                ? [
                                    '<32>{#k/1}* in fack...\n* PRICE MAY ALREADY BE LOWERS!!!\n* WOA!!!!',
                                    '<32>{#k/6}* Congra-tem-lations!!!'
                                ]
                                : [
                                    '<32>{#k/3}* so if you get to TOUGH BATLE and feel FRUSTRATE, can buy TEM armor as last resort!',
                                    '<32>{#k/5}* but tem armor so goods,\n* promise to only buy if you really needs it,'
                                ])
                        ]
                        : ['<32>{#p/tem}{#k/0}* hOI!!!', "<32>* i'm temmie"],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/tem}{#k/0}* at back of famus statue, can find SPECIL SWITCH,',
                        '<32>{#p/tem}{#k/0}* and SWITCHs...\n* come wif RIDDLES!',
                        SAVE.data.b.colleg
                            ? '<32>{#p/tem}{#k/2}* even after colleg, tem don know what it means,,,'
                            : '<32>{#p/tem}{#k/0}* tem don know what it means,,,',
                        '<32>{#p/tem}{#k/1}* but mayb humans can solve!!\n* yAYA!!'
                    ]
                    : SAVE.data.b.colleg
                        ? [
                            "<32>{#p/tem}{#k/0}* yaYA!!!\n* tem got degree in TEM STUDIES!\n* tem can tell you all about tem's DEEP HISTORY!!!"
                        ]
                        : ['<32>{#p/tem}{#k/0}* us tems hav a DEEP HISTORY!!!'],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/tem}{#k/0}* yaYA!!!\n* wil close TEM SHOP soon!!!']
                    : ['<32>{#p/tem}{#k/0}* yaYA!!!\n* go to TEM SHOP!!!']
        ],
        colleg1: [
            '<32>{#p/tem}{#k/1}* WOA!!',
            '<32>{#k/2}* thas ALOT o muns...\n* can tem realy acepts...',
            '<32>{#k/6}* OKs!!!!\n* tem go to colleg and make u prouds!!!'
        ],
        colleg2: [
            '<32>{#p/tem}* tem bak from cool leg,',
            '<32>{#k/0}* tem learn MANY THINs,\n* learn to sell new ITEM!\n* yayA!!!'
        ],
        sellExit: 'Exit',
        sellValue: '$(x)G',
        sellStory1: () => [
            '<32>{#p/tem}{#k/1}* WOA!!',
            '<32>{#k/2}* u gota... $(x)s!!!',
            SAVE.data.b.colleg
                ? '<32>{#k/4}* hnnn....\n* i gota have dat $(x)s...\n* but i gota pay for gradskool,'
                : '<32>{#k/4}* hnnn....\n* i gota have dat $(x)s...\n* but i gota pay for colleg,',
            '<32>{#k/5}* hnnnn....!!!\n* tem always wanna $(x)s...!'
        ],
        sellStory2: ['<32>{#p/tem}{#k/2}* b.. but...', '<32>{#k/4}* p!!!!!!!!!!!!'],
        sellStory3: () =>
            SAVE.data.b.colleg
                ? [
                    "<32>{#p/tem}{#k/3}* Is this a joke?\n* Are you having a laugh?\n* Ha ha, very funny.\n* I'm the one with a degree."
                ]
                : ["<32>{#p/tem}{#k/3}* You're gonna regret that."],
        zeroPrompt: '<09>{#p/basic}...'
    },
    n_shop_tortoise: {
        exit: () =>
            world.runaway
                ? []
                : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                    ? ['<32>{#p/basic}{#k/1}* Good riddance.']
                    : ['<32>{#p/basic}{#k/0}* Be careful out there, kid!'],
        item: () =>
            world.runaway
                ? ['0G - Datapad?', '0G - AR Headset?', '0G - Nebula Tea', '0G - Tree Sap', 'Exit']
                : world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                    ? ['45G - Datapad?', '45G - AR Headset?', '16G - Nebula Tea', '25G - Tree Sap', 'Exit']
                    : SAVE.data.n.plot === 72
                        ? [
                            SAVE.data.b.item_padd ? '25G - Datapad?' : '35G - Datapad',
                            SAVE.data.b.item_goggles ? '25G - AR Headset?' : '35G - AR Headset',
                            '5G - Nebula Tea',
                            '5G - Tree Sap',
                            'Exit'
                        ]
                        : [
                            SAVE.data.b.item_padd ? '45G - Datapad?' : '55G - Datapad',
                            SAVE.data.b.item_goggles ? '45G - AR Headset?' : '55G - AR Headset',
                            '16G - Nebula Tea',
                            '25G - Tree Sap',
                            'Exit'
                        ],
        itemInfo: () => [
            SAVE.data.b.item_padd ||
                world.genocide ||
                world.killed0 ||
                startonATE() ||
                SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? 'Weapon: 0AT\n($(x) AT)\nJust a bit\ninvincible.'
                : 'Weapon: 2AT\n($(x) AT)\nInvincible\nlonger.',
            SAVE.data.b.item_goggles ||
                world.genocide ||
                world.killed0 ||
                startonATE() ||
                SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? 'Armor: 4DF\n($(x) DF)\nJust a bit\ninvincible.'
                : 'Armor: 6DF\n($(x) DF)\nInvincible\nlonger.',
            'Heals 15HP\nSPEED\nup in\nbattle.',
            'Heals 35HP\nMade from\na real\ntree.'
        ],
        itemPrompt: () =>
            world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? "<09>{#p/basic}{#k/3}Don't expect a discount."
                : "<09>{#p/basic}{#k/4}What are you lookin' for?",
        itemPurchase: () =>
            world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? [
                    '<09>{#p/basic}{#k/1}Here we are.',
                    '<09>{#p/basic}{#k/1}...',
                    "<09>{#p/basic}{#k/3}Eh?\nYou can't afford it?",
                    "<10>{#p/human}(You're carrying too much.)"
                ]
                : [
                    '<09>{#p/basic}{#k/0}Thanks!\nWa ha ha.',
                    '<09>{#p/basic}{#k/2}Careful with that.',
                    "<09>{#p/basic}{#k/4}You're a bit short on cash.",
                    "<10>{#p/human}(You're carrying too much.)"
                ],
        itemPurchasePrompt: () => (world.runaway ? 'Take it?' : 'Buy it for\n$(x)G?'),
        menu: () =>
            world.runaway ? ['Take', 'Steal', 'Read', 'Exit'] : ['Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit'],
        menuPrompt1: () =>
            SAVE.data.n.plot === 72
                ? '<23>{#p/basic}{#k/0}* Wa ha ha!\n* I knew you could do it!'
                : "<23>{#p/basic}{#k/0}* Woah there!\n* I've got some neat junk for sale.",
        menuPrompt2: () =>
            SAVE.data.n.plot === 72 ? '<23>{#p/basic}{#k/0}* Wa ha ha.' : "<23>{#p/basic}{#k/0}* Don't be shy now.",
        menuPrompt3: () =>
            world.genocide
                ? "<23>{#p/basic}{#k/3}* What are you guys up to now?\n* Wait, don't tell me.\n* None of my business, right?"
                : '<24>{#p/basic}{#k/2}* Wa ha ha...\n* So you came to see me.\n* What a riot!',
        menuPrompt4: '<23>{#p/basic}* ... but everybody ran.',
        note: ['<32>{#p/human}* (But there was no note for you to read.)'],
        sell1: () =>
            world.runaway
                ? ['<30>{#p/human}* (You took 1394G from behind the counter.)']
                : world.genocide
                    ? [
                        '<30>{#p/basic}{#k/4}* Wah ha ha...',
                        '<30>{#k/3}* You gonna steal my goods the same way you stole your SOULs?',
                        "<30>{#k/4}* If I were you, I'd appreciate what I already have."
                    ]
                    : world.meanie
                        ? [
                            "<30>{#p/basic}{#k/2}* Woah there, kiddo.\n* That stuff ain't free, y'know?",
                            "<30>{#k/3}* It may look like junk to you, but to me, it's anything but!"
                        ]
                        : [
                            "<30>{#p/basic}{#k/2}* Ha!\n* I'm tryin' to get RID of my junk, not get more of it!",
                            "<30>{#k/3}* Though, I've heard if you want to sell stuff, the Temmies are your best bet.",
                            '<30>{#k/0}* Where can you find them?',
                            '<30>{#k/4}* ...',
                            "<30>{#k/0}* I don't remember."
                        ],
        sell2: () =>
            world.runaway
                ? ['<30>{#p/basic}* Nothing left.']
                : world.genocide || world.meanie
                    ? ["<30>{#p/basic}{#k/1}* I wouldn't give up my gilded treasures at phaser-point."]
                    : ["<30>{#p/basic}{#k/0}* For the last time, I'm not taking it!"],
        talk: () =>
            SAVE.data.n.plot === 72
                ? [
                    'Asgore',
                    'New Homeworld',
                    'Toriel',
                    SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                        ? '§fill=#ff0§Handshake'
                        : 'Am I A Hero',
                    'Exit'
                ]
                : world.genocide
                    ? ['Asriel', '(Threaten)', '(Fight)', 'Undyne', 'Exit']
                    : world.killed0 || startonATE()
                        ? ['Your Fate', '(Threaten)', '(Fight)', 'Hero', 'Exit']
                        : [
                            48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                                ? 'About Yourself'
                                : ['About Yourself', '§fill=#ff0§The War (NEW)', '§fill=#ff0§Retirement (NEW)', 'Retirement'][
                                Math.min(SAVE.data.n.shop_gerson, 3)
                                ],
                            ['The Homeworld', '§fill=#ff0§Family (NEW)', '§fill=#ff0§Erogot (NEW)', 'Erogot'][
                            Math.min(SAVE.data.n.shop_homeworld, 3)
                            ],
                            'The Foundry',
                            SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                                ? 'Undyne'
                                : SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                                    ? '§fill=#ff0§Handshake'
                                    : 'About Undyne',
                            'Exit'
                        ],
        talkPrompt: () =>
            world.genocide || world.killed0 || startonATE() || SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                ? '<09>{#p/basic}{#k/2}Really?\nYOU wanna talk?'
                : '<09>{#p/basic}{#k/0}Anything you wanna know?',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#k/0}* Ol' King Fluffybuns, eh?\n* Now there's someone I know.",
                        "<32>{#k/2}* I'll say this, I had no clue about what he was doing with those humans until today!",
                        "<32>{#k/3}* I don't know how he kept such a secret for so long...",
                        "<32>{#k/0}* Especially since everyone woulda been fine with it if he told 'em before.",
                        "<32>{#k/0}* I've adopted one of the humans myself, actually.",
                        "<32>{#k/2}* They're asleep in their box, just outside the shop.\n* What an adorable little fella!",
                        "<32>{#k/0}* Asgore says they'll wake up once their body adjusts to the real world or whatever.",
                        '<32>{#k/3}* ... huh?\n* You want to know if Asgore can be your father?',
                        "<32>{#k/0}* Well, I don't see why not!",
                        "<32>{#k/0}* I'm sure he'd be happy to have you living with him.",
                        "<32>{#k/2}* It'd probably be good for him!\n* Wa ha ha."
                    ]
                    : world.genocide
                        ? [
                            '<32>{#p/basic}{#k/1}* You wanna know my thoughts on Asriel?',
                            '<32>{#k/0}* ...\n* He was a good kid.',
                            '<32>{#k/3}* And if he was still alive, he woulda made a great king.',
                            "<32>{#k/4}* As for what you got there standin' in front of me, well, it's not him.",
                            '<32>{#k/0}* It looks like him, talks like him, even has his damned adorable face... bless that kid.',
                            '<32>{#k/3}* But that SOUL... being this close to you, the resemblance is unmistakable.',
                            "<32>{#k/1}* How'd it feel taking the SOUL of your own mother, boy?",
                            '<32>{#k/0}* I wonder.'
                        ]
                        : world.killed0 || startonATE()
                            ? [
                                '<32>{#p/basic}{#k/0}* Long ago, the king and I agreed that escaping would be pointless...',
                                '<32>{#k/1}* Since once we left, humans would just kill us on the spot.',
                                "<32>{#k/3}* I'll admit I felt a little betrayed when he changed his mind.",
                                '<32>{#k/4}* But now, I think...\n* Maybe he was right to.',
                                "<32>{#k/0}* 'Cause after all, even though we never escaped...",
                                "<32>{#k/3}* A human's killing us anyway, ain't that right?"
                            ]
                            : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                                ? [
                                    "<32>{#p/basic}{#k/0}* Eh, there's really not much to say about me.",
                                    '<32>{#k/0}* I do my best to live my life...',
                                    '<32>{#k/4}* Help those around me in ways that I can.',
                                    '<32>{#k/0}* The thing of it is, we live in dangerous times.',
                                    "<32>{#k/3}* If the wrong human were to stumble on our little outpost, we'd be as good as gone..."
                                ]
                                : [
                                    [
                                        "<32>{#p/basic}{#k/0}* I've been around a long time.\n* Maybe too long.",
                                        '<32>{#k/3}* Back in the day, I served as a chief on the planetary council.',
                                        '<32>{#k/2}* The \"Saber of Justice\" they called me.',
                                        "<32>{#k/1}* ... if it weren't for that damned war, I might still be in that position today."
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/0}* Ah yeah, the war.\n* That awful thing took a toll on me.\n* On all of us.',
                                        "<32>{#k/4}* Every so often, we'd get these reports...\n* A list of the people who'd died protecting our home.",
                                        "<32>{#k/1}* I still remember the look on Fluffybuns's face when he had to deliver the bad news to families.",
                                        "<32>{#k/1}* That blank stare, those empty eyes...\n* That's what war does to people, kiddo.",
                                        "<32>{#k/3}* That's why I retired."
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/3}* My retirement?',
                                        "<32>{#k/2}* Wah ha ha!\n* I'd say it's going well!",
                                        "<32>{#k/4}* This old shack ain't exactly up to par with those guys operating from Aerialis...",
                                        "<32>{#k/2}* ... but who cares!\n* I don't need to compete with them.",
                                        '<32>{#k/0}* The heroic, wacky, and sometimes shy neighbors I live with out here are all I could ever ask for.',
                                        '<32>{#k/0}* It may not be the home I once dreamed of, but you take what you can get in life.'
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/3}* You want me to repeat myself?',
                                        "<32>{#k/4}* Wa ha ha... you'll have to go back in time or something.",
                                        "<32>{#k/2}* Even I don't remember what I said!"
                                    ]
                                ][Math.min(SAVE.data.n.shop_gerson++, 3)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/3}* A whole new world...',
                        "<32>{#k/0}* Boy, I never thought I'd see the day.",
                        "<32>{#k/3}* Dr. Alphys told everyone she'd started scanning for new worlds...",
                        "<32>{#k/0}* Then, just a short time ago, she said she'd found one.",
                        "<32>{#k/0}* It's called Eurybia.\n* Don't know much else about it beyond that.",
                        "<32>{#k/1}* All I can be sure of is that it'll be better than this place.",
                        "<32>{#k/3}* That's not to say I won't miss it.",
                        "<32>{#k/0}* I've lived through the entire period of monster captivity...",
                        '<32>{#k/0}* Leaving it so soon almost seems like a crime.'
                    ]
                    : world.genocide || world.killed0 || startonATE()
                        ? [
                            "<32>{#p/basic}{#k/3}* I've lived too long to be afraid of something like you.",
                            '<32>{#k/2}* Try it, kiddo!',
                            "<32>{#k/1}* ... I know you can't here.",
                            "<32>{#k/4}* Wah ha...\n* Knowledge like that is part of the reason I've survived so long."
                        ]
                        : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                            ? [
                                '<32>{#p/basic}{#k/2}* The homeworld, eh?',
                                '<32>{#k/0}* Look, kiddo.',
                                "<32>{#k/0}* All I'll say about the homeworld is that it was a nice place.",
                                "<32>{#k/4}* A place where people didn't have to worry...",
                                '<32>{#k/1}* ... about seeing those they care about be killed in front of their very eyes.',
                                "<32>{#k/0}* So, to summarize, it's not really a place you'd fit into.",
                                '<32>{#k/1}* Any questions?'
                            ]
                            : [
                                [
                                    "<32>{#p/basic}{#k/0}* The homeworld...\n* Well, first off, it has a name.\n* It's Krios.",
                                    '<33>{#k/3}* I myself grew up in a quiet little town outside the city.\n* Well, I say quiet.',
                                    '<32>{#k/4}* Every few days, some of the kids from school would host these time trial races.',
                                    "<32>{#k/0}* The weather wasn't always friendly, but they didn't care.\n* If anything, it just made things more interesting.",
                                    '<32>{#k/0}* My family and I attended dozens of these races when I was just a kiddo.',
                                    "<32>{#k/0}* Don't get me wrong.\n* Electrosnail is fun, but it's just not the same thing."
                                ],
                                [
                                    "<32>{#p/basic}{#k/3}* My family?\n* Eh, there's not much to say.\n* I had good parents, a few siblings.",
                                    '<32>{#k/0}* One day, King Erogot came to our town.\n* He and I met at one of those races I told ya about.',
                                    "<32>{#k/0}* I was an insignificant country bumpkin, but he saw somethin' in me, somethin' more...",
                                    '<32>{#k/4}* One thing led to another, and I ended up moving away from my family at an early age.',
                                    "<32>{#k/3}* ... that was the last time I'd ever get to see them face to face."
                                ],
                                [
                                    '<32>{#p/basic}{#k/0}* Erogot, the king of the last great era of our homeworld.',
                                    "<32>* I'm sure you've read about him at some point.",
                                    ...(SAVE.storage.inventory.has('artifact') // NO-TRANSLATE

                                        ? ["<32>{#k/2}* If you haven't, then what are ya holding his pendant for!?"]
                                        : [
                                            "<32>{#k/2}* If you haven't, then what asteroid have ya been living in for all this time!?"
                                        ]),
                                    '<32>{#k/3}* Under his reign, the monster species came so far.\n* Perhaps a little too far.',
                                    '<32>{#k/0}* He was so happy to meet a human for the first time... but not for himself.',
                                    "<32>{#k/1}* Nah, that was his son's wish.\n* Poor kid got exactly what he asked for and then some..."
                                ],
                                [
                                    "<32>{#p/basic}{#k/3}* Forgive me, but I don't really wanna talk about that too much more.",
                                    "<32>{#k/1}* Ol' King Fluffybuns wouldn't want you to carry that kinda burden."
                                ]
                            ][Math.min(SAVE.data.n.shop_homeworld++, 3)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/0}* Toriel?\n* She came through here not too long ago, actually.',
                        '<32>{#k/1}* Said she needed time to herself.',
                        "<32>{#k/3}* Well, y'know what?\n* I figure she's had enough time by now.",
                        '<32>{#k/0}* You can find her in the trash depository past the ladder in the room nearby.',
                        "<32>{#k/3}* I'm pretty sure I know what's got her so pre-occupied..."
                    ]
                    : world.genocide || world.killed0 || startonATE()
                        ? 48 <= SAVE.data.n.plot
                            ? [
                                [
                                    '<32>{#p/basic}{#k/3}* Eh?\n* Fight you?',
                                    "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                                    "<32>{#k/0}* And b'sides...\n* You may have spared Undyne, but everyone else is still dead.",
                                    "<32>{#k/4}* I'm better off holding my ground right where I am..."
                                ],
                                [
                                    '<32>{#p/basic}{#k/3}* Eh?\n* Fight you?',
                                    "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                                    "<32>{#k/3}* And b'sides...\n* People seem to go missing after they run into you.",
                                    "<32>{#k/4}* I'll take that as an omen to stay right where I am..."
                                ],
                                [
                                    '<32>{#p/basic}{#k/3}* Eh?\n* Fight you?',
                                    "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                                    "<32>{#k/0}* And b'sides...\n* After what you did to Undyne, I know I don't stand a chance.",
                                    "<32>{#k/4}* I'm better off holding my ground right where I am..."
                                ]
                            ][world.genocide ? 2 : SAVE.data.n.state_foundry_undyne]
                            : [
                                '<32>{#p/basic}{#k/3}* Eh?\n* Fight you?',
                                "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                                "<32>{#k/0}* And b'sides...\n* These old bones aren't fit for fighting anyhoo.",
                                "<32>{#k/1}* One attack from you, and then I'd... well...",
                                "<32>{#k/4}* At least by talking to you, I've bought enough time for some of them to escape."
                            ]
                        : postSIGMA()
                            ? [
                                '<32>{#p/basic}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                                "<32>{#k/3}* Well, recently, we've been having some electricity problems...",
                                "<32>{#k/0}* Though I'm sure it's nothing the Foundry crew can't sort out.",
                                "<32>{#k/2}* Those folks can't get enough of their engineering jobs!"
                            ]
                            : 48 <= SAVE.data.n.plot && SAVE.data.n.state_foundry_undyne > 0
                                ? [
                                    [
                                        '<32>{#p/basic}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                                        "<32>{#k/3}* Well, it's a place people often get lost...",
                                        '<32>{#k/3}* Or left behind...',
                                        "<32>{#k/2}* Boy, I sure hope that doesn't happen to you."
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                                        "<32>{#k/0}* Well, it's never been the friendliest location...",
                                        '<32>{#k/3}* From the humans sending us here to die, to the recent loss of a fighting spirit...',
                                        "<32>{#k/3}* Nothin' but bad luck down here, kiddo."
                                    ]
                                ][SAVE.data.n.state_foundry_undyne - 1]
                                : [
                                    '<32>{#p/basic}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                                    '<32>{#k/2}* Well, back when we first got trapped out here, this WAS the outpost!',
                                    '<32>{#k/0}* All those fancy-schmancy sections added on afterwards were built by us monsters.',
                                    "<32>{#k/0}* Turns out most people aren't into the idea of living in the past.\n* Fair enough.",
                                    "<32>{#k/2}* But... I just think there's something so decadent about repurposing this place.",
                                    "<32>{#k/3}* It was the humans who trapped us here, hoping we'd rot and suffer in darkness.",
                                    "<32>{#k/0}* But look at us now.\n* Look at how we've made this place our own.",
                                    "<32>{#k/2}* Wa ha ha!\n* Talk about showing 'em who's boss, eh?"
                                ],
            () =>
                SAVE.data.b.c_state_secret2 && !SAVE.data.b.c_state_secret2_used
                    ? ((SAVE.data.b.c_state_secret2_used = true),
                        [
                            '<32>{#p/basic}{#k/3}* What?\n* Where on Krios did you learn THAT handshake?',
                            "<32>{#k/2}* I haven't shown anyone that routine in years!",
                            '<32>{#k/0}* Wa ha ha... but I think I know where ya learned it from.',
                            '<32>{#k/0}* Long time ago, a human came here... me and them became good friends.',
                            ...(SAVE.data.n.plot === 72
                                ? [
                                    "<32>{#k/3}* Maybe we still are.\n* I'll have to ask 'em when they wake up.",
                                    "<32>{#k/4}* I've only just adopted the little rascal...",
                                    '<32>{#k/0}* They seem pretty tired after all that archive business.',
                                    '<32>{#k/3}* Imagine...\n* Living in a virtual world...',
                                    '<32>{#k/2}* If you die in the simulation, do you die in real life?',
                                    "<32>{#k/0}* Eh, never mind.\n* It doesn't matter now, anyway."
                                ]
                                : ["<32>{#k/3}* I wonder what they're up to now..."])
                        ])
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#k/0}* Frisk, I could talk about you all day after what you did.',
                            '<32>{#k/4}* Risking your life, facing down a godlike being just to save us...',
                            "<32>{#k/3}* The words strong enough to do it justice don't exist.",
                            '<32>{#k/0}* I think, sometime in your future, if you really wanted it...',
                            '<32>{#k/0}* You could lead the monster race yourself, as ruler.',
                            '<33>{#k/2}* Everyone would follow you.\n* Even this old coot!',
                            "<32>{#k/0}* You're a real hero, kid."
                        ]
                        : 48 <= SAVE.data.n.plot
                            ? world.genocide
                                ? [
                                    [
                                        "<32>{#p/basic}{#k/1}* I take it you've killed her by now?",
                                        '<32>{#k/1}* ...',
                                        '<32>{#k/3}* Then why ask me...',
                                        '<32>{#k/3}* Unless...',
                                        "<32>{#k/2}* You just wanna get my reaction, don'tcha?",
                                        '<32>{#k/4}* ...',
                                        '<32>{#k/4}* How about... nah.'
                                    ],
                                    [
                                        '<32>{#p/basic}{#k/1}* I get it, guys.',
                                        "<32>{#k/1}* She's dead.",
                                        "<32>{#k/3}* You expectin' me to throw a party for you or somethin'?",
                                        '<32>{#k/1}* Get outta my sight.'
                                    ]
                                ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                                : SAVE.data.s.state_foundry_deathroom === 'f_hub' // NO-TRANSLATE

                                    ? [
                                        '<32>{#p/basic}{#k/1}* ...',
                                        "<32>{#k/1}* You've got a real twisted sense of humor, kiddo.",
                                        '<32>{#k/3}* Killing her in front of me like that...',
                                        "<32>{#k/1}* You're lucky I don't walk out there and kill you myself."
                                    ]
                                    : world.killed0 || startonATE()
                                        ? [
                                            [
                                                '<32>{#p/basic}{#k/4}* Undyne?',
                                                49 <= SAVE.data.n.plot
                                                    ? '<32>{#k/4}* She passed through here earlier...'
                                                    : '<32>{#k/4}* She just passed through here a few moments ago.',
                                                '<32>{#k/0}* Said she\'d \"given up\" on tryin\'a capture you.',
                                                '<32>{#k/4}* ...',
                                                '<32>{#k/4}* What happened back there...?'
                                            ],
                                            [
                                                '<32>{#p/basic}{#k/3}* Undyne?',
                                                "<32>{#k/0}* I haven't heard from her in a while.",
                                                '<32>{#k/4}* She just kinda... disappeared.',
                                                '<32>{#k/3}* Was that your doing?'
                                            ],
                                            [
                                                [
                                                    '<32>{#p/basic}{#k/1}* ...',
                                                    '<32>{#k/1}* You killed her, just like you killed everyone else.',
                                                    "<32>{#k/3}* Granted, she wasn't intent on letting YOU live...",
                                                    "<32>{#k/1}* But don't act like this was just self-defense for you.",
                                                    '<32>{#k/3}* Wa ha...\n* I know you better than that.'
                                                ],
                                                ['<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* What more is there to say?']
                                            ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                                        ][SAVE.data.n.state_foundry_undyne]
                                        : [
                                            2 <= SAVE.data.n.plot_date
                                                ? SAVE.data.b.undyne_respecc
                                                    ? [
                                                        '<32>{#p/basic}{#k/4}* So you and her had a good time, eh?',
                                                        '<32>{#k/2}* Wa ha ha!',
                                                        "<32>{#k/0}* You've really made a good impression on her, kiddo!"
                                                    ]
                                                    : [
                                                        '<32>{#p/basic}{#k/4}* So are you and her... friends now?',
                                                        '<32>{#k/2}* Wa ha ha!',
                                                        "<32>{#k/0}* You've done something I never thought possible, kiddo!"
                                                    ]
                                                : [
                                                    [
                                                        '<32>{#p/basic}{#k/4}* Undyne?',
                                                        49 <= SAVE.data.n.plot
                                                            ? '<32>{#k/4}* She passed through here earlier...'
                                                            : '<32>{#k/4}* She just passed through here a few moments ago.',
                                                        SAVE.data.b.undyne_respecc
                                                            ? '<32>{#k/0}* Said she was proud to have fought an \"honorable\" human.'
                                                            : '<32>{#k/0}* Said she was \"done\" tryin\'a capture you.',
                                                        '<32>{#k/4}* ...',
                                                        '<32>{#k/4}* The heck did you do to make her say THAT?'
                                                    ],
                                                    [
                                                        "<32>{#p/basic}{#k/4}* If you're askin' me where to find her, she's at home.\n* Ain't but a few steps away.",
                                                        '<32>{#k/3}* From her words to me before...',
                                                        SAVE.data.b.undyne_respecc
                                                            ? '<32>{#k/4}* It seems you two are on better terms than I thought.'
                                                            : '<32>{#k/4}* It seems you two have some things to work out.'
                                                    ]
                                                ][Math.min(SAVE.data.n.shop_deadfish++, 1)],
                                            [
                                                '<32>{#p/basic}{#k/3}* Undyne?',
                                                "<32>{#k/0}* I haven't heard from her in a while.",
                                                '<32>{#k/4}* She just kinda... disappeared.',
                                                '<32>{#k/1}* Something tells me you played a part in that...'
                                            ],
                                            [
                                                [
                                                    '<32>{#p/basic}{#k/4}* ...',
                                                    '<32>{#k/0}* Well... you killed her.',
                                                    "<32>{#k/3}* Though, that's kinda her own doing.",
                                                    '<32>{#k/4}* I never really got why she was so intent on killing you humans...',
                                                    "<32>{#k/0}* If she wanted your SOUL, couldn't she just wait until you died naturally?"
                                                ],
                                                ['<32>{#p/basic}{#k/4}* ...', '<32>{#k/0}* What more is there to say?']
                                            ][Math.min(SAVE.data.n.shop_deadfish++, 1)]
                                        ][SAVE.data.n.state_foundry_undyne]
                            : world.genocide
                                ? [
                                    "<32>{#p/basic}{#k/0}* Undyne?\n* Oh, that poor little urchin.\n* Normally, I'd call her the hero...",
                                    "<32>{#k/1}* But to be honest, I've seen what you've done.\n* She doesn't stand a chance.",
                                    "<32>{#k/4}* Don't get me wrong, she'll give ya one hell of a fight.",
                                    '<32>{#k/3}* But no... the outpost needs a different kinda hero now.',
                                    "<32>{#k/3}* Someone that doesn't operate on brawn and bravado...",
                                    "<32>{#k/3}* Someone that doesn't see the universe like everyone else...",
                                    "<32>{#k/0}* Wa ha ha.\n* I don't doubt someone like that will be the end of you."
                                ]
                                : world.killed0 || startonATE()
                                    ? world.trueKills > 29
                                        ? [
                                            "<32>{#p/basic}{#k/1}* I'm not a hero.",
                                            "<32>{#k/3}* But I know there's someone out there.",
                                            "<32>* Someone who'll never give up trying to do the right thing, no matter what.",
                                            "<32>{#k/0}* There's no prophecy or legend 'bout anyone like that.",
                                            "<32>* It's just something I know is true.",
                                            '<32>{#k/3}* One day, someone like that will hunt you down.'
                                        ]
                                        : [
                                            "<32>{#p/basic}{#k/1}* I'm not a hero.",
                                            "<32>{#k/3}* But I know there's someone out there.",
                                            "<32>* Someone who'll never give up trying to do the right thing, no matter what.",
                                            "<32>{#k/0}* I'd watch your back, kiddo.",
                                            "<32>{#k/0}* 'Cause sooner or later, before you know it...",
                                            "<32>{#k/3}* ... you'll be as good as dead."
                                        ]
                                    : world.trueKills > 29
                                        ? [
                                            "<32>{#p/basic}{#k/0}* Undyne?\n* Yeah, she's a local hero around here.",
                                            '<32>{#k/3}* She stormed off earlier... seemed pretty upset at someone who looked just like you...',
                                            "<32>{#k/2}* I'd watch your back, kiddo.\n* And buy some items...\n* It might just save your hide!\n* Wa ha ha!"
                                        ]
                                        : [
                                            "<32>{#p/basic}{#k/0}* Undyne?\n* Yeah, she's a local hero around here.",
                                            '<32>{#k/4}* Through grit and determination alone, she fought her way to the top of the Royal Guard.',
                                            '<32>{#k/3}* Actually, she just came through here asking about someone who looked just like you...',
                                            "<32>{#k/2}* I'd watch your back, kiddo.\n* And buy some items...\n* It might just save your hide!\n* Wa ha ha!"
                                        ]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },

    s_save_foundry: {
        f_abyss: {
            name: 'Foundry - Abyss',
            text: [
                '<32>{#p/human}* (You find yourself at the lowest point on the outpost.)',
                '<32>{#p/human}* (This sense of limbo fills you with determination.)'
            ]
        },
        f_battle: {
            name: 'Foundry - Bridge',
            text: () =>
                SAVE.data.n.state_foundry_undyne > 0 || world.runaway
                    ? ['<32>{#p/human}* (The starlight dims, filling you with determination.)']
                    : [
                        '<32>{#p/human}* (The starlight glimmers, distant as it may be.)',
                        '<32>{#p/human}* (This fills you with determination.)'
                    ]
        },
        f_hub: {
            name: 'Foundry - Quiet Area',
            text: () =>
                SAVE.data.n.state_foundry_undyne > 0 || world.runaway
                    ? [
                        '<32>{#p/human}* (The silence is deafening...)',
                        '<32>{#p/human}* (Yet it fills you with determination.)'
                    ]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/human}* (Returning to such a quiet place after your journey fills you with determination.)']
                        : SAVE.data.n.plot < 48
                            ? [
                                '<32>{#p/human}* (A short reprieve in the ongoing chaos...)',
                                '<32>{#p/human}* (It fills you with determination.)'
                            ]
                            : SAVE.data.n.plot_date < 2.1
                                ? ['<32>{#p/human}* (The chaos has come to an end, filling you with determination.)']
                                : SAVE.data.n.exp > 0
                                    ? [
                                        '<32>{#p/human}* (In with the steam comes the bitter scent of betrayal.)',
                                        '<32>{#p/human}* (It fills you with determination.)'
                                    ]
                                    : [
                                        '<32>{#p/human}* (In with the steam comes the sweet scent of friendship.)',
                                        '<32>{#p/human}* (It fills you with determination.)'
                                    ]
        },
        f_lobby: {
            name: 'Foundry - Dark Zone',
            text: () =>
                SAVE.data.n.plot < 39
                    ? ['<32>{#p/human}* (Wandering deeper into the factory fills you with determination.)']
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? ['<32>{#p/human}* (Thinking of the friends you corrupted along the way fills you with determination.)']
                        : SAVE.data.b.f_state_kidd_betray
                            ? ['<32>{#p/human}* (Thinking of the friends you betrayed along the way fills you with determination.)']
                            : world.runaway
                                ? [
                                    "<32>{#p/human}* (Thinking of the friends you'll never get to see again fills you with determination.)"
                                ]
                                : SAVE.data.b.svr
                                    ? [
                                        '<32>{#p/human}* (Thinking of the friends you went the extra mile to save fills you with determination.)'
                                    ]
                                    : ['<32>{#p/human}* (Thinking of the friends you made along the way fills you with determination.)']
        },
        f_prechase: {
            name: 'Foundry - Crossing',
            text: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Despite it only being useful for you and your company...)',
                        '<32>{#p/human}* (The newly-built bridge nearby still fills you with determination.)'
                    ]
                    : world.runaway
                        ? [
                            "<32>{#p/human}* (Despite you being the only one who'll get to use it now...)",
                            '<32>{#p/human}* (The newly-built bridge nearby still fills you with determination.)'
                        ]
                        : SAVE.data.n.plot < 48
                            ? [
                                '<32>{#p/human}* (Pylon puzzles, signal stars, and vintage vents...)',
                                '<32>{#p/human}* (These fickle frivolities fill you with determination.)'
                            ]
                            : [
                                '<32>{#p/human}* (A bridge now sits amidst the surroundings.)',
                                '<32>{#p/human}* (This development fills you with determination.)'
                            ]
        },
        f_sans: {
            name: 'Foundry - Checkpoint',
            text: () =>
                world.dead_skeleton || world.runaway
                    ? [
                        '<32>{#p/human}* (Somehow, the steam emitted by these vents is unsettling.)',
                        '<32>{#p/human}* (Nonetheless, it fills you with determination.)'
                    ]
                    : ['<32>{#p/human}* (The hot, damp steam emitted by these vents fills you with determination.)']
        },
        f_shyren: {
            name: 'Foundry - Vending Machine',
            text: () =>
                SAVE.data.b.killed_shyren
                    ? ['<32>{#p/human}* (A sad stillness permeates the air, filling you with determination.)']
                    : SAVE.data.n.plot < 40
                        ? ['<32>{#p/human}* (A quiet hum echoes closeby, filling you with determination.)']
                        : ['<32>{#p/human}* (The sound of music fills you with determination.)']
        },
        f_tunnel: {
            name: 'Foundry - Trash Zone',
            text: () =>
                SAVE.data.n.plot < 42.1
                    ? ['<32>{#p/human}* (Getting lost amongst the trash fills you with determination.)']
                    : ['<32>{#p/human}* (Finding yourself back amongst the trash fills you with determination.)']
        }
    }
};


// END-TRANSLATE
