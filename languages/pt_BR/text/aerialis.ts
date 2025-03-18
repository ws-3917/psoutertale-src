import { alphysPhoneDisplay } from '../../../code/aerialis/bootstrap';
import {
    adultEvac,
    burger,
    calm_lizard,
    childEvac,
    corefriendly,
    glade,
    iRespeccYourVilliany
} from '../../../code/aerialis/extras';
import { asrielinter } from '../../../code/common';
import { pms } from '../../../code/common/extras';
import { music } from '../../../code/systems/assets';
import { game, renderer } from '../../../code/systems/core';
import {
    ateThreshold,
    battler,
    choicer,
    fetchCharacters,
    frontEnder,
    iFancyYourVilliany,
    instance,
    pager,
    postSIGMA,
    roomKills,
    shopper,
    world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';

// START-TRANSLATE

export default {
    a_aerialis: {
        coreterminal: () => [
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* (O terminal está acima do seu nível de acesso.)']
                : world.runaway
                    ? ["<32>{#p/basic}* É o terminal do CORE.\n* Não parece estar recebendo muito poder."]
                    : [
                        world.postnoot
                            ? "<32>{#p/basic}* É o terminal do CORE.\n* O sistema atmosférico foi acessado recentemente."
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? "<32>{#p/basic}* É o terminal do CORE.\n* Parece ter pouco poder no momento."
                                : "<32>{#p/basic}* É o terminal do CORE.\n* É um ótimo estado.",
                        ...(!world.genocide && !world.badder_lizard && SAVE.data.b.a_state_corecall && SAVE.data.n.plot < 68
                            ? [
                                ["<25>{#p/alphys}{#g/alphysOhGodNo}* Por favor, não toque nisso!!"],
                                ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Sério.'],
                                ['<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'],
                                []
                            ][Math.min(SAVE.data.n.state_aerialis_terminter++, 3)]
                            : [])
                    ]),
            ...(world.meanie && !world.genocide && world.badder_lizard
                ? [
                    "<32>{#p/human}* (Você percebe que está sozinho.)",
                    "<32>{#p/human}* (Mesmo sabendo que isso iria colapsar a atmosfera do Outpost, você ainda considera.)",
                    choicer.create('* (Quebrar o terminal?)', 'Sim', 'Não')
                ]
                : [])
        ],
        termsmash1: ['<32>{#p/human}* (Você decide não quebrar.)'],
        termsmash2: ['<32>{#p/human}* (Você da um balanço...)'],
        puzzlenoot1: () => [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            world.nootflags.has('a_barricade1') // NO-TRANSLATE

                ? '<25>{#p/alphys}{#g/alphysInquisitive}* Esse quebra-cabeça se resolveu sozinho também?'
                : "<25>{#p/alphys}{#g/alphysInquisitive}* Huh, parece que o quebra-cabeça já está resolvido.",
            '<25>{#p/alphys}{#g/alphysFR}* Que estranho.',
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        puzzlenoot2: () => [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            world.nootflags.has('a_puzzle1') // NO-TRANSLATE

                ? "<25>{#p/alphys}{#g/alphysWelp}* Este aqui.\n* Este também está resolvido."
                : "<25>{#p/alphys}{#g/alphysWelp}* Huh... parece que alguém já resolveu este quebra-cabeça.",
            "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Bom, vamos aceitar isso!!",
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        noequip: ['<32>{#p/human}* (Você decide não equipar.)'],
        evac: ['<32>{#p/human}* (Você sente a presença dos monstros próximos diminuindo.)'],
        endo: ['<32>{#p/human}* (Você percebe a péssima qualidade dessa mesa.)'],
        businessKILLER: [
            '<32>{#p/basic}{#npc/a}* Só pra você saber, carinha...',
            "<32>* A Guarda Real estará por todo lado pra esse tipo de assunto.",
            "<32>* Se eu fosse você, fugiria enquanto posso.",
            "<32>* Mas isso só sou eu."
        ],
        harpyKILLER: ["<32>{#p/basic}* Huhehehaw...\n* Caramba, meu pai, acho que estou em perigo mortal!"],
        shopclosed: ['<32>{#p/human}* (Porém não tem mais nada para ser feito aqui.)'],
        afear: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Uh, e-ei...',
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* Desculpa por... sair correndo e tals...',
            '<25>{#p/alphys}{#g/alphysIDK}* ...',
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* Você vai ficar bem, certo?\n* Você não...",
            "<25>{#p/alphys}{#g/alphysNervousLaugh}* Você não vai mais se meter em confusão, certo?",
            '<25>{#p/alphys}{#g/alphysSideSad}* ...',
            "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* Por favor...\n* N-não faça nenhuma loucura, tá bom?",
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        escape: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene1}* Você chegou!',
            '<25>{#g/alphysInquisitive}* Ah, é, desculpa não usar minha câmera antes.',
            '<25>{#g/alphysYeahYouKnowWhatsUp}* Eu estava tentando manter um \"low profile...\"',
            "<25>{#g/alphysIDK}* Sabe? Err, de toda forma, eu estava ficando b-bem preocupada.",
            '<25>{#g/alphysNervousLaugh}* Mas acho que as coisas funcionaram bem no final?',
            '<25>{#g/alphysNeutralSweat}* ... hmm.',
            "<25>* Pra te dizer a verdade, Undyne não parou de te p-procurar.",
            '<25>{#g/alphysNervousLaugh}* Eu fechei os elevadores de Aerialis, mas...',
            "<25>{#g/alphysNeutralSweat}* Cedo ou tarde, ela vai usar sua mochila a jato e chegar aqui.",
            '<25>* Então... v-você deveria ir andando logo.',
            "<25>* O outro elevador está algumas salas a frente.\n* Não o perca!",
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        approachescape: ['<32>{#p/human}* (Você escuta passos se distanciando.)'],
        puzzlehelp: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            "<25>{#p/alphys}{#g/alphysWelp}* Ligando para avisar que estou aqui se você precisar da minha ajuda.",
            "<25>{#p/alphys}{#g/alphysCutscene2}* Irei manter meu celular disponível enquanto você estiver na sala!",
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        riverboi1: () => [
            '<32>{#p/basic}{#npc/a}* Eu sou o viajante.\n* Meu táxi pode te levar para qualquer lugar no Outpost.',
            '<32>* Onde você gostaria de ir?',
            choicer.create(
                '* (O que você diz?)',
                game.room === 'w_wonder' // NO-TRANSLATE

                    ? 'Cancelar'
                    : 'Outlands',
                game.room === 's_taxi' // NO-TRANSLATE

                    ? 'Cancelar'
                    : 'Starton',
                game.room === 'f_taxi' // NO-TRANSLATE

                    ? 'Cancelar'
                    : 'Foundry',
                game.room === 'a_lookout' // NO-TRANSLATE

                    ? 'Cancelar'
                    : 'Aerialis'
            )
        ],
        riverboi2: pager.create(
            2,
            ["<32>{#p/basic}{#npc/a}* Tra la la.\n* O trânsito está rápido hoje.\n* Que sorte..."],
            ["<32>{#p/basic}{#npc/a}* Tra la la.\n* O trânsito está rápido hoje.\n* Que azar..."],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Lembre-se de descansar de vez em quando...'],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Todo mundo sabe o velho som da caixa de música.',
                '<32>{#p/basic}{#npc/a}* ... mas você sabe a contra parte?\n* Os primeiros treze são tranquilos.'
            ],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Mantenha suas mãos e pés no veículo...',
                '<32>{#p/basic}{#npc/a}* ... e acima de tudo, sua ALMA.'
            ],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Ouvi dizer que a Toriel tem uma bebida favorita.'],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Ouvi dizer que Asgore tem uma comida favorita.'],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Lembre-se do grande Rei Erogot...',
                '<32>{#p/basic}{#npc/a}* ... e seu filho.'
            ],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Vila Temmie...',
                '<32>{#p/basic}{#npc/a}* ... a sala à esquerda da escada curta.'
            ],
            ["<32>{#p/basic}{#npc/a}* Tra la la.\n* Por que você não canta comigo?\n* Tra la la."],
            ["<32>{#p/basic}{#npc/a}* Hum hum hum...\n* Hum hum hum...\n* Estou tendo um pequeno concerto."],
            ['<32>{#p/basic}{#npc/a}* Acaricia, acaricia...\n* O pescoço estrala até o infinito do cosmos.'],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Lembre-se de pagar sua passagem...',
                '<32>{#p/basic}{#npc/a}* ... tempo e espaço são muito valiosos.'
            ],
            ['<32>{#p/basic}{#npc/a}* Humanos, monstros...\n* Estrelas.'],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Você nunca terá cachorros quentes o suficiente...',
                '<32>{#p/basic}{#npc/a}* ... a não ser que eles fiquem no topo da sua cabeça.'
            ],
            [
                "<32>{#p/basic}{#npc/a}* Tra la la.\n* Não bisbilhotar atrás da estação dos outros...",
                '<32>{#p/basic}{#npc/a}* ... podem acabar te chamando de ladrão.'
            ],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* O trânsito está cheio hoje.'],
            ['<33>{#p/basic}{#npc/a}* Tra la la.\n* O trânsito está variado hoje.'],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* A cientista real tem um segredo...'],
            ['<32>{#p/basic}{#npc/a}* Um, dois, três, quatro, cinco, seis...', '<32>* ... chegando a capacidade total.'],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Aquela robô super famosa tem um passado bagunçado...'],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Tri li li.\n* Tre le le.'],
            
            ['<32>{#p/basic}{#npc/a}* Tro lo lo.\n* Tru lu lu.', '<32>* ... alas, as vogais chegam ao fim.'],
            [
                '<32>{#p/basic}{#npc/a}* Tra la la.\n* Coma uma fruta fantasma todo dia.',
                "<32>{#p/basic}{#npc/a}* ... Porquê?\n* Só dessa forma eu saberei que você me escuta."
            ],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Você já escutou o som das estrelas?'],
            [
                "<32>{#p/basic}{#npc/a}* Tra la la.\n* Quais jogos podemos jogar com um cachorro?",
                '<32>{#p/basic}{#npc/a}* ... perguntando para um amigo.'
            ],
            ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Justiça ao cachorro, justiça ao cachorro por todo lado.']
        ),
        riverboi2x: ['<32>{#p/basic}{#npc/a}* Tra la la.\n* Diálogos não estão disponíveis neste momento.'],
        riverboi3: () => [
            '<32>{#p/basic}{#npc/a}* Eu sou o viajante.\n* Dr. Alphys requereu minha presença nesta localização.',
            '<32>* Você quer ir para Aerialis, não é?',
            choicer.create('* (O que você diz?)', 'Sim', 'Não')
        ],
        riverboi4: ['<32>{#p/basic}{#npc/}* Obrigado por viajar no meu táxi.\n* Meu objetivo foi concluído.'],
        papinter1: pager.create(
            0,
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? [
                        '<18>{#p/papyrus}OLÁ, HUMANO!',
                        "<18>{#p/papyrus}EU ESTOU FELIZ QUE VOCÊ FINALMENTE FALOU COMIGO.",
                        "<18>{#f/4}A MUITAS COISAS INTERESSANTES PARA FAZER AQUI...",
                        '<18>{#f/0}VOCÊ JÁ TENTOU JOGAR BOLICHE?',
                        '<18>{#f/9}OU, MELHOR, NADAR NA PISCINA!',
                        ...(SAVE.data.b.killed_mettaton
                            ? [
                                '<18>{#f/4}AMBOS ESTÃO FECHADOS NO MOMENTO...',
                                '<18>{#f/5}... EM HOMENAGEM À CHAMADA \"MORTE\" DO METTATON.'
                            ]
                            : [
                                '<18>{#f/4}AMBOS QUE ESTÃO ACESSÍVEIS ATRAVÉS DO TAXI...',
                                '<18>{#f/5}... PARA TODO MUNDO ACIMA DOS 10 ANOS.'
                            ])
                    ]
                    : [
                        '<18>{#p/papyrus}OLÁ, HUMANO!',
                        "<18>{#p/papyrus}JÁ ERA HORA DE VOCÊ CHEGAR AQUI.",
                        "<18>{#f/4}TEM MUITAS COISAS INTERESSANTES PARA FAZER AQUI...",
                        '<18>{#f/0}VOCÊ JÁ TENTOU JOGAR BOLICHE?',
                        '<25>{#p/undyne}{#f/17}* Sério, Papyrus?\n* Boliche?',
                        '<25>{#p/undyne}{#f/8}* O clube de Artes Mágicas é claramente melhor!',
                        "<18>{#p/papyrus}{#f/4}VOCÊ NÃO ESTÁ COM MEDO DOS JOGOS HUMANOS, ESTÁ?",
                        '<25>{#p/undyne}{#f/4}* Quê?\n* Óbvio que não!',
                        "<25>{#p/undyne}{#f/5}* Eu só...",
                        "<25>{#p/undyne}{#f/12}* Eu só sou uma grande admiradora das belezas de um artista.",
                        "<18>{#p/papyrus}{#f/5}ENTÃO VOCÊ IRIA COMIGO AO CLUBE DE JAZZ E BLUES MUSIC?",
                        "<25>{#p/undyne}{#f/8}* Ai meu senhor, pela última vez, eu NÃO vou tocar um saxophone de novo!!"
                    ],
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? SAVE.data.b.killed_mettaton
                        ? [
                            "<18>{#p/papyrus}{#f/6}NÃO ACREDITE NISSO!\nÉ UM GOLPE DE MARKETING DA MARCA MTT!",
                            "<18>{#p/papyrus}{#f/5}METTATON NÃO É MUITO FAMOSO POR ESSE TIPO DE COISA.",
                            "<18>{#p/papyrus}{#f/4}... EU NÃO GOSTO TANTO QUANTO VOCÊ."
                        ]
                        : [
                            "<18>{#p/papyrus}{#f/0}ALIÁS, ISSO SÃO DEZ ANOS KRIOS.",
                            '<18>{#p/papyrus}{#f/4}NÃO TENHO IDEIA DE QUANTOS ANOS TERRESTRES ISSO SERIA...',
                            "<18>{#p/papyrus}{#f/5}ACHO QUE EU OUVI SOBRE A DIFERENÇA NÃO SER GRANDE."
                        ]
                    : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                        ? [
                            "<18>{#p/papyrus}{#f/5}É TRISTE. A UNDYNE SERIA UMA ÓTIMA TOCADORA.",
                            "<18>{#p/papyrus}{#f/4}IMAGINE TODOS OS SONS DE GUERRA QUE ELA ESCREVERIA.",
                            '<25>{#p/undyne}{#f/1}*É, acho que sim.',
                            '<25>{#p/undyne}{#f/12}*Isso soa bem legal...',
                            "<18>{#p/papyrus}{#f/0}EU SEI, CERTO?\nSERIA TOTALMENTE PEIXASTICO.",
                            '<25>{#p/undyne}{#f/3}* ...',
                            '<25>{#p/undyne}{#f/3}*Nunca mais diga isso.'
                        ]
                        : [
                            "<18>{#p/papyrus}SE VOCÊ ESTÁ PROCURANDO PELO SORVETE, ESTÁ NA MINHA DIREITA.",
                            '<25>{#p/undyne}{#f/3}*Você quer dizer \"esquerda?\"',
                            '<18>{#p/papyrus}{#f/5}TECNICAMENTE, O SORVETE ESTÁ NA MINHA ESQUERDA.',
                            "<18>{#p/papyrus}{#f/4}MAS PARA O HUMANO, ESTÁ NA MINHA DIREITA.",
                            '<25>{#p/undyne}{#f/14}* Ah.\n* Que inteligente da sua parte!',
                            "<25>{#p/undyne}{#f/17}*Só não vá ficar surpreso se ele se perder."
                        ],
            () =>
                SAVE.data.b.a_state_fishbetray
                    ? SAVE.data.b.killed_mettaton
                        ? ["<18>{#p/papyrus}{#f/5}ELE NÃO PRECISARIA MENTIR PARA PROMOVER SUA MARCA..."]
                        : ['<18>{#p/papyrus}{#f/5}TRABALHAR DURO É DIFÍCIL AS VEZES.']
                    : world.population_area('s') < 6 || world.population_area('f') < 6 || childEvac() // NO-TRANSLATE

                        ? ['<18>{#p/papiro}{#f/4}MEUS LÁBIOS ESTÃO SELADOS.']
                        : ['<18>{#p/papyrus}{#f/5}DIREÇÕES PODEM SER DIFÍCEIS AS VEZES.']
        ),
        papinter2: () => [
            '<18>{#p/papyrus}{#f/0}OLÁ, HUMANO.',
            '<18>{#p/papyrus}{#f/5}(CHORINHO...)',
            "<18>VOCÊ PROVAVELMENTE ESTÁ SE PERGUNTANDO O MOTIVO DE UNDYNE NÃO ESTAR AQUI.",
            '<18>COMO EU PODERIA DIZER...',
            "<18>{#f/6}VAMOS DIZER QUE UNDYNE FUGIU POR RAZÕES...",
            ...(SAVE.data.b.killed_mettaton
                ? [
                    '<18>{#f/5}... ENVOLVENDO ELA PENSAR QUE VOCÊ...',
                    '<18>{#f/1}MATOU ALGUÉM!?!?',
                    '<18>{#f/4}OLHA, EU ENTENDO TOTALMENTE ELA.',
                    '<18>{#f/5}A \"MORTE\" DO METTATON FOI BEM CONVINCENTE.',
                    "<18>{#f/0}MAS, TODO MUNDO SABE QUE ISSO É SÓ PARA O SHOW.",
                    '<18>{#f/4}TODO MUNDO EXCETO A UNDYNE, PELO VISTO.',
                    '<18>{#f/5}EU JURO...',
                    '<18>{#f/5}AS COISAS QUE VÃO PELA CABEÇA DELA AS VEZES.',
                    '<18>{#f/5}...'
                ]
                : [
                    '<18>{#f/5}... ENVOLVENDO ELA PENSAR QUE VOCÊ...',
                    '<18>{#f/1}MATOU ALGUÉM!?!?',
                    "<18>{#f/0}MAS EU TENHO CERTEZA QUE ELA SÓ PENSOU ERRADO.",
                    "<18>{#f/5}VOCÊ NÃO FARIA ALGO TÃO TERRIVEL... CERTO?",
                    "<18>{#f/6}EN-ENTÃO, EU DECIDI FICAR.",
                    '<18>{#f/9} ALGUÉM PRECISA MANTER A SEGURANÇA DO \"CARINHA\" AQUI!',
                    '<18>{#f/0}OU MENINA. OU SEJA LÁ O QUE VOCÊ FOR.',
                    "<18>{#f/4}PERA, SE VOCÊ NÃO TEM ESTE TIPO DE NOMEAÇÃO...",
                    '<18>{#f/8}COMO TODOS DEVERIAM TE CHAMAR!?!?'
                ]),
            "<18>{#f/0}BEM, EU ESTAREI AQUI CASO VOCÊ QUEIRA CONVERSAR.",
            "<18>{#f/5}EU ESTARIA AQUI CASO ME LIGUE, TAMBÉM, MAS...",
            "<18>{#f/5}UNDYNE ESMAGOU MEU TELEFONE QUANDO EU DISSE QUE TE LIGARIA.",
            "<18>{#f/6}ELA É BEM PROTETORA E ISSO EU ADMIRO."
        ],
        undinter: pager.create(
            0,
            () =>
                SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                    ? iRespeccYourVilliany()
                        ? [
                            '<25>{#p/undyne}{#f/1}* Ei, cara. \n* Quanto tempo.',
                            "<18>{#p/papyrus}{#f/6}VOCÊ NÃO TAVA NA TV COM ELES AGORA POUCO??",
                            "<25>{#p/undyne}{#f/14}* É tipo, sim, mas pra mim é bastante tempo.",
                            "<18>{#p/papyrus}{#f/0}É VERDADE.",
                            '<18>{#p/papyrus}{#f/5}IMAGINE... TUDO QUE DA PRA FAZER EM UM MOMENTO...',
                            "<18>{#p/papyrus}{#f/4}... MOMENTO ESTE EM QUE EU NÃO ESTARIA ACORDANDO O SANS DE UM COCHILO.",
                            '<25>{#p/undyne}{#f/17}* Nem me fala.'
                        ]
                        : [
                            '<25>{#p/undyne}{#f/1}* Ei, cara. \n* Legal te ver.',
                            "<18>{#p/papyrus}{#f/6}VOCÊ NÃO ERA TIPO A INIMIGA MORTAL DELE HOJE MAIS CEDO?",
                            "<25>{#p/undyne}{#f/14}* É tipo, sim, mas isso aí está tudo no passado.",
                            '<18>{#p/papyrus}{#f/0}SE VOCÊ DIZ.',
                            '<18>{#p/papyrus}{#f/5}UAU... IMAGINE TUDO O QUE EU PODERIA FAZER SE SANS PENSASSE ASSIM...',
                            '<18>{#p/papiro}{#f/4}... TODA VEZ QUE ELE DIZ QUE ALGO ESTA \"NO PASSADO.\"',
                            '<25>{#p/undyne}{#f/17}*Hábitos antigos prevalecem.'
                        ]
                    : [
                        '<25>{#p/undyne}{#f/1}* Ei, cara. \n* Papyrus tinha alguns \"assuntos\" para tratar.',
                        "<25>{#f/14}* Pelo menos é isso que ele disse.",
                        "<25>{#f/7}* E isso significa que EU sou a única amiga que você tem aqui!",
                        '<25>{#f/4}* ... então é melhor não fazer nada IDIOTA!'
                    ],
            () =>
                SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook
                    ? [
                        '<25>{#p/undyne}{#f/1}* Se você quiser se juntar a mim no clube de artes mágicas...',
                        '<25>{#p/undyne}{#f/3}* ... er, na verdade eu dúvido muito que o taxi te levaria lá, por você ser criança.',
                        "<25>{#p/undyne}{#f/12}* Talvez ele te deixa visitar depois que você crescer um bocadinho."
                    ]
                    : ["<25>{#p/undyne}{#f/11}* Estou de olho em você."]
        ),
        corndog1: pager.create(
            0,
            () => [
                "<25>{#p/sans}{#f/0}* eu estou vendendo cachorros quentes por 5G cada, se estiver interessado.",
                choicer.create('* (Comprar um cachorro quente por 5G?)', 'Sim', 'Não')
            ],
            () => ['<25>{#p/sans}{#f/0}* cachorros quentes por 5G.', choicer.create('* (Comprar um cachorro quente por 5G?)', 'Sim', 'Não')]
        ),
        corndog2: [
            "<32>{#p/human}* (Você está carregando muito.)",
            "<25>{#p/sans}{#f/2}* relaxa, eu só vou colocar ele bem aqui."
        ],
        corndog2b: ['<25>{#p/sans}{#f/2}* aí vai.'],
        corndog3: ["<32>{#p/human}* (Você não tem dinheiro o suficiente.)"],
        corndog3x: () =>
            [
                [
                    "<25>{#p/sans}{#f/0}* você não tem 5G?",
                    '<25>{#p/sans}{#f/3}* ... aqui.\n* eu te empresto o meu.',
                    '<32>{#s/equip}{#p/human}* (Você ganhou 100G.)',
                    '<25>{#p/sans}{#f/2}* espero que ajude.'
                ],
                [
                    '<25>{#p/sans}{#f/0}* sem dinheiro de novo?',
                    "<25>{#p/sans}{#f/3}* ... eh.\n* não se preocupe.",
                    "<25>{#p/sans}{#f/2}* eu nem preciso do dinheiro de verdade."
                ]
            ][SAVE.data.n.cornmoney++],
        corndog4: () =>
            [
                ['<32>{#p/human}* (Você ganhou o cachorro quente.)', '<25>{#p/sans}{#f/2}* faça bom proveito.'],
                [
                    '<32>{#p/human}* (Você ganhou a cabra quente.)',
                    '<25>{#p/sans}{#f/2}* oops, esse era pra ser um cachorro.\n* Foi mal.'
                ],
                ['<32>{#p/human}* (Você ganhou o cachorro quente.)']
            ][Math.min(SAVE.data.n.state_aerialis_corngoat++, 2)],
        corndog5: ['<32>{#p/human}* (Você decide não comprar.)'],
        corndog6: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Esta estação de sentinela parece bastante ultrajante.)']
                : world.darker
                    ? ["<32>{#p/basic}* É uma estação de sentinela."]
                    : ['<32>{#p/basic}* Apenas outra estação sentinela do primeiro e único Sans.'],
        sanscall1: () => [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            ...(world.dead_skeleton
                ? [
                    '<25>{#p/sans}{#f/0}* Eai, como foi o show?',
                    '<25>{#f/0}* bom...?\n* ruim...?',
                    "<25>{#f/3}* eh, eu só sou o cara com as piadas.",
                    "<25>{#f/2}* alguém como eu não saberia a diferença, de toda forma.",
                    ...(world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                        ? ["<26>{#f/3}* mas... ei.\n* eu nem estava prestando atenção, então tudo bem."]
                        : ["<25>{#f/3}* mas... ei.\n* eu nem estava lá pra ver, então tudo bem."]),
                    '<25>{#f/0}* eu tô perguntando, porquê...\n* sinceramente...',
                    "<25>{#f/0}* seria legal saber que parte de você ainda se importa com alguma coisa.",
                    "<25>{#f/3}* espero que isso não seja pedir muito."
                ]
                : [
                    '<25>{#p/sans}{#f/0}* Eai, como foi o show?',
                    ...(SAVE.data.b.a_state_moneyfish
                        ? [
                            '<25>{#p/sans}{#f/2}* trocou porradas com a undyne, camarada?',
                            "<25>{#f/3}* heh.\n* foi mal não poder estar lá.",
                            '<25>{#f/0}* assim que undyne entrou, eu basicamente não tive chances.',
                            ...(SAVE.data.b.bad_lizard
                                ? ['<25>{#f/3}* aliás...', '<25>{#f/0}* eu tenho pessoas como você para me preocupar.']
                                : ['<25>{#f/0}* O \"Capitão da Guarda Real\" é muito melhor para classificações.'])
                        ]
                        : world.sad_ghost && SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray
                            ? [
                                '<25>{#p/sans}{#f/2}* perdeu cedo, carinha?',
                                "<25>{#f/3}* heh.\n* acho que você não é popular como eu pensava.",
                                "<25>{#f/0}* mas tudo bem.",
                                ...(SAVE.data.b.bad_lizard
                                    ? ['<25>{#f/0}* meio que faz sentido já que você fez todo mundo sair correndo.']
                                    : ['<25>{#f/0}* pelo menos você foi um bom esportivo sobre isso.'])
                            ]
                            : [
                                '<25>{#p/sans}{#f/2}* se cuidando sem mim, carinha?',
                                "<25>{#f/3}* fica tranquilo, estou acostumado em ser mais um na multidão.",
                                "<25>{#f/2}* é só que, normalmente, ninguém fica sabendo disso.",
                                ...(SAVE.data.b.bad_lizard
                                    ? [
                                        "<25>{#f/3}* ... e, considerando o que você tem feito esses tempos...",
                                        "<25>{#f/0}* isso é inquestionavelmente para o melhor."
                                    ]
                                    : ["<25>{#f/0}* bem.\n* estou feliz que você se divertiu."])
                            ]),
                    '<25>{#f/3}* ... aliás...',
                    '<25>{#f/2}* se você der de cara com guardas fortões, me conta.',
                    '<25>{#f/3}* eu os perdi de vista enquanto ia pra aí.'
                ]),
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        tvm1: ['<32>{#p/human}* (você pegou o Velho Rádio.)', '<32>{#p/basic}{#npc/a}* Espero que você goste do novo rádio!'],
        tvm2: ['<32>{#p/human}* (Você pegou os Fogos de Artf.)', '<32>{#p/basic}{#npc/a}* Espero que você goste dos fogos de artifício!'],
        tvm3: ["<32>{#p/human}* (Você está carregando muito.)"],
        tvm4: pager.create(0, ['<32>{#p/basic}{#npc/a}* Seus estão logo ali na mesa, pequeno.']),
        tvm5: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* Eu decidi que prefiro sair do que ser demitido de novo.",
                        '<32>* Trabalhar para o Mettaton foi legal, mas novo mundo, novo eu.',
                        "<32>* Não se preocupe.\n* Eu irei encontrar o trabalho perfeito..."
                    ]
                    : [
                        '<32>{#p/basic}{#npc/a}* Eu trabalho para Mettaton.\n* Gosto do meu trabalho.\n* Meus ajudantes não.',
                        '<32>* Cada anel ao redor do meu corpo representa uma vez que eu sobrevivi ao processo de demissão.',
                        "<32>* Não se preocupe.\n* Eu sempre sou recontratado mais tarde."
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* Eu estou pensando em me tornar um expert em rituais de acasalamento para criaturas do espaço."
                    ]
                    : ["<32>{#p/basic}{#npc/a}* Estou pensando em colocar um anel na minha cabeça da próxima vez."]
        ),
        tvm6: () => [
            '<32>{#p/basic}{#npc/a}* Tinha uma boneca Mell Mell aqui pra você, mas o Mettaton levou por motivos pessoais.',
            "<32>{#p/basic}{#npc/a}* Para compensar, aqui está o valor em G.",
            '<32>{#s/equip}{#p/human}{#npc}* (Você ganhou 999G.)',
            ...((SAVE.data.b.a_state_moneyitemA && !SAVE.data.b.item_tvm_radio) ||
                (SAVE.data.b.a_state_moneyitemB && !SAVE.data.b.item_tvm_fireworks)
                ? ['<32>{#p/basic}{#npc/a}* O restante dos seus ganhos ainda estão aqui para pegar.']
                : ['<32>{#p/basic}{#npc/a}* Eu peço desculpas pela confusão.'])
        ],
        tvm7: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A nota gravada na tabela pede desculpas por retomar um item.)']
                : [
                    "<32>{#p/basic}* Tem uma nota em cima da mesa.",
                    '<32>{#p/mettaton}* \"DESCULPA, MAS EU PRECISEI PEGAR A MELL MELL COMIGO DE VOLTA.\"\n* \"NADA PESSOAL, CLARO.\"'
                ],
        tvm8: ['<32>{#p/human}* (você pegou o Velho Rádio.)'],
        tvm9: ['<32>{#p/human}* (Você pegou os Fogos de Artf.)'],
        lockup0: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* (Mas você não tinha nenhuma chave.)"] : ["<32>{#p/basic}* Está trancado."],
        lockup1: () => [
            '<32>{#p/human}* (Você destrancou o cadeado com a Chave Oxidada.)',
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* As prateleiras são rotuladas como \"armamento da terra antiga.\"'])
        ],
        lockup2: ['<32>{#p/human}* (Você pegou a Arma de Choque.)'],
        lockup3: ['<32>{#p/human}* (Você pegou a Bomba de Sono.)'],
        lockup4: ['<32>{#p/human}* (Você pegou o Spray de Açúcar.)'],
        lockup5: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Não tem mais nada para pegar aqui.)"]
                : ["<32>{#p/basic}* Está vazio."],
        lockup6: ["<32>{#p/human}* (Você está carregando muito.)"],
        gonezo: () =>
            world.bulrun ? ['<32>{#p/basic}* ... mas todo mundo fugiu.'] : ['<32>{#p/basic}* ... mas ninguém veio.'],
        spidershop1: () => [
            SAVE.data.n.plot === 72
                ? choicer.create('* (Deixar 36G na teia?)', 'Sim', 'Não')
                : choicer.create('* (Deixar 56G na teia?)', 'Sim', 'Não')
        ],
        spidershop2: [
            '<32>{#p/basic}* Algumas aranhas arrastam um item para você através da teia.',
            '<32>{#s/equip}{#p/human}* (Você pegou o Pop Hiper Vórtice.)'
        ],
        spidershop3: ["<32>{#p/human}* (Você está carregando muito.)"],
        spidershop4: ["<32>{#p/human}* (Você não tem dinheiro o suficiente.)"],
        spidershop5: ['<32>{#p/human}* (Você decidiu não deixar nada.)'],
        spidershop6: [
            "<32>{#p/basic}* Tem uma mensagem presa na teia.",
            '<32>{#p/basic}* \"Durma em paz, Rainha Aranha.\"'
        ],
        spidershop7: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você coloca sua mão dentro da teia de aranha.)',
                    ...[
                        [
                            "<25>{#p/asriel1}{#f/10}* Frisk, não tem nada aí a não ser seda de aranha.",
                            "<25>* Você vai fazer uma sujeira."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Por favor, confie em mim.\n* Vai tomar um tempão pra limpar tudo.',
                            '<25>{#f/15}* Eu tenho... experiência.'
                        ],
                        ['<25>{#p/asriel1}{#f/15}* Ou... você pode continuar fazendo isso.', "<26>{#f/16}* Vai ser culpa sua."],
                        ['<25>{#p/asriel1}{#f/13}* Sério isso...']
                    ][Math.min(asrielinter.spiderweb++, 3)]
                ]
                : ['<32>{#p/basic}* A teia está vazia.'],
        hotelfood0: () =>
            SAVE.data.b.svr
                ? [
                    "<32>{#p/human}* (Você coloca suas mãos na estranha vasilha de comida.)\n* (É bem gosmento.)",
                    choicer.create('* (Pegar a comida?)', 'Sim', 'Não')
                ]
                : ["<33>{#p/basic}* É uma comida misteriosa.", choicer.create('* (Pegar a comida?)', 'Sim', 'Não')],
        hotelfood1: () => [
            '<32>{#p/human}* (Você pegou a Comida Misteriosa.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? [
                    "<25>{#p/asriel1}{#f/15}* Aquela... coisa... sem chances que aquilo é saudável.",
                    '<25>{#f/16}* Espero que você já saiba disso.'
                ]
                : [])
        ],
        hotelfood2: ["<32>{#p/human}* (Você está carregando muito.)"],
        hotelfood3: ['<32>{#p/human}* (Você decide não pegar nada.)'],
        sonic1: () => [
            '<32>{#p/human}* (Você pegou o Sonic Resonator.)',
            choicer.create('* (Equipar o Sonic Resonator?)', 'Sim', 'Não')
        ],
        sonic2: ["<32>{#p/human}* (Você está carregando muito para pegar isso.)"],
        tablaphone1: () => [
            '<32>{#p/human}* (Você pegou o Tablaphone.)',
            choicer.create('* (Equipar o Tablaphone?)', 'Sim', 'Não')
        ],
        tablaphone2: ["<32>{#p/human}* (Você está carregando muito para pegar isso.)"],
        moonpie1: () => [
            '<32>{#p/human}* (Você pegou a Torta da Lua.)',
            ...(SAVE.data.b.svr
                ? ['<32>{#p/human}* (Uma nota atrelada a ela descreve a intenção de ajudar alguém que precise.)']
                : [
                    "<32>{#p/basic}* Tem uma nota atrelada...",
                    '<32>{#p/basic}* \"Eu sei que sou diferente. Eu não me pareço com as pessoas do Outpost.\"',
                    '<32>{#p/basic}* \"Mas talvez, com este pequeno pedaço de torta, eu possa ajudar alguém.\"',
                    '<32>{#p/basic}* \"Alguém bondoso, e que os outros não entendem, como eu...\"',
                    '<32>{#p/basic}* \"... alguém que precise de um pouco mais de energia.\"'
                ])
        ],
        moonpie2: ["<32>{#p/human}* (Você está carregando muito para pegar isso.)"],
        ratings: 'CLASSIFICAÇÕES $(x)',
        gold: 'GOLD $(x)',
        secretcall: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<18>{#p/papyrus}{#f/5}PAPYRUS AQUI.',
            "<18>{#f/5}EU DECIDI QUE NÃO POSSO MAIS ME ESCONDER.",
            '<18>{#f/6}AS PESSOAS PRECISAM DE MINHA AJUDA!',
            '<18>{#f/5}E, ULTIMAMENTE...',
            "<18>{#f/6}EU SENTI QUE PRECISO TE ENCONTRAR PESSOALMENTE DE NOVO.",
            '<18>{#f/7}SE \"ASRIEL\" ME VER VIVO, ENTÃO QUE SEJA!',
            '<18>{#f/7}ME RECUSO A FICAR PARADO E NÃO FAZER NADA O TEMPO INTEIRO.',
            '<18>{#f/4}...',
            '<18>{#f/4}TE VEJO EM BREVE.',
            '<32>{#s/equip}{#p/event}* Clique...'
        ],
        story: {
            phonegrabber1: () => [
                game.room === 'a_lab_downstairs' // NO-TRANSLATE

                    ? "<33>{#p/basic}* É o celular reserva de Alphys.\n* Vem com uma passagem de porta-malas e caixas bidimensionais."
                    : "<32>{#p/basic}* É um telefone celular inteligente.\n* Vem com uma passagem de porta-malas e caixas bidimensionais.",
                ...(world.genocide
                    ? ['<32>{#p/basic}* A mochila a jato de uso único não está mais disponível.']
                    : ['<32>{#p/basic}* Além disso, um jetpack portátil de uso único está disponível.'])
            ],
            phonegrabber2: ['<32>{#p/human}* (Você obteve um celular aprimorado.)'],
            phonegrabber3: () =>
                SAVE.flag.n.ga_asrielGetThePhone > 1
                    ? ['<25>{#p/asriel2}{#f/10}* Finalmente.']
                    : ["<25>{#p/asriel2}{#f/10}* Me pergunto se a mensagens antigas nele."],
            alphys1: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ['<25>{#p/alphys}{#f/2}* Oh meu senhor!', '<25>{#f/3}* Como você...']
                    : ['<25>{#p/alphys}{#f/2}* Oh meu senhor!', '<25>{#f/3}* Como você chegou aqui tão rápido!?'],
            alphys2: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ["<25>{#p/alphys}{#f/10}* A-ah... você é o humano que...", '<25>{#f/3}* Que... un...']
                    : ["<25>{#f/4}* Eu acabei de sair do celular, ainda nem olhei o laboratório...", '<25>{#f/17}* ...'],
            alphys3: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        "<25>{#g/alphysWhyOhWhy}* Sabe de uma coisa, não tem problema algum aqui!",
                        "<25>{#g/alphysUhButHeresTheDeal}* Você nem fez nada de errado!",
                        "<25>{#g/alphysCutscene1}* Não!\n* Você só é...",
                        '<25>{#g/alphysCutscene2}* Um anjo perfeito que não fez uma coisa errada.',
                        '<25>{#f/20}* ...',
                        "<25>{#f/10}* De-de toda forma, você é novo em Aerialis, né!?",
                        '<25>{#g/alphysIDK}* Bem, então... v-você...',
                        "<25>{#f/3}* Você vai p-p-precisar da minha ajuda!",
                        "<25>{#f/5}* Porque... tipo...",
                        '<25>{#f/10}* N-não é um lugar amigável para... humanos.',
                        '<25>{#f/3}* Armadilhas mortais...\n* Enigmas impossíveis...\n* ... e, uh...',
                        '<25>{|}{#g/alphysIDK}* C-crud, o que eu estava indo- {%}'
                    ]
                    : [
                        ...[
                            [
                                '<25>{#f/1}* Bem, uh, é!',
                                "<25>{#f/1}* Eu sou a Doutora Alphys.\n* A frente da divisão de ciência real.",
                                '<25>{#f/10}* Mas, uh, eu não sou um dos \"caras malvados!\"',
                                "<25>{#f/17}* Na verdade, desde que você saiu das Outlands, eu tenho...",
                                '<25>{#f/5}* Eheh, te \"observado\" atrás do meu console de segurança.',
                                '<25>{#f/8}* Suas lutas...\n* Seus amigos...',
                                '<25>{#f/1}* Tudo!',
                                '<25>{#f/9}* E minha parte favorita...',
                                ...(SAVE.data.b.s_state_million
                                    ? [
                                        "<25>{#f/16}* ... foi te ver destruir a pontuação do Sans, ele com certeza t-trapaceou!",
                                        '<25>{#f/12}* Tão legal...'
                                    ]
                                    : SAVE.data.b.f_state_thundersnail_win
                                        ? [
                                            '<25>{#f/16}* ... foi como você realmente ganhou um jogo de electrosnail!',
                                            '<25>{#f/12}* Tão legal...'
                                        ]
                                        : !SAVE.data.b.papyrus_fire
                                            ? [
                                                '<25>{#f/16}* ... foi como você passou da parede de fogo na primeira tentativa!',
                                                '<25>{#f/12}* Tão legal...'
                                            ]
                                            : SAVE.data.b.s_state_mathpass
                                                ? [
                                                    '<25>{#f/16}* ... foi como você venceu o quebra-cabeça do neutralizador de números por você!',
                                                    '<25>{#f/12}* Tão legal...'
                                                ]
                                                : ['<25>{#f/16}* ... foi te ver lutar a Undyne???']),
                                "<25>{#f/18}* Mas, uh, você vai precisar da minha ajuda se quiser passar por Aerialis!"
                            ],
                            [
                                '<25>{#f/8}* Bem, é...',
                                "<25>{#f/9}* Eu sou a... doutora Alphys.\n* A frente da divisão de ciência real.",
                                "<25>{#f/4}* Desde que você saiu das Outlands eu tenho...",
                                '<25>{#f/4}* Eheh, \"observado\" você através do meu console de segurança.',
                                '<25>{#f/11}* Suas lutas...\n* Seus amigos...',
                                '<25>{#f/11}* ...',
                                ...(SAVE.data.n.state_starton_papyrus === 1
                                    ? ["<25>{#f/13}* Até...\n* A morte do Papyrus..."]
                                    : SAVE.data.n.state_foundry_doge === 1 && SAVE.data.n.state_foundry_muffet === 1
                                        ? ["<25>{#f/13}* ... até a morte do esquadrão de ELITE da Undyne..."]
                                        : SAVE.data.n.state_starton_dogs === 2 ||
                                            (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                                            (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
                                            (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) >
                                            1
                                            ? ['<25>{#f/13}* ... até mesmo a morte da tropa c-canina...']
                                            : SAVE.data.n.state_starton_doggo === 2
                                                ? ["<25>{#f/13}* Até...\n* A morte do Doggo."]
                                                : SAVE.data.n.state_foundry_muffet === 1
                                                    ? ["<25>{#f/13}* Até...\n* A m-morte da Muffet..."]
                                                    : SAVE.data.n.state_foundry_doge === 1
                                                        ? ["<25>{#f/13}* Até...\n* A m-morte da Doge..."]
                                                        : SAVE.data.n.state_starton_greatdog === 2
                                                            ? ["<25>{#f/13}* Até...\n* A m-morte do Major Canis..."]
                                                            : SAVE.data.n.state_starton_lesserdog === 2
                                                                ? ["<25>{#f/13}* Até...\n* A m-morte do Minor Canis..."]
                                                                : ["<25>{#f/13}* ... até a morte daqueles m-monstros..."]),
                                "<25>{#f/10}* ... mas ei, não é de todo mau... ok?",
                                "<25>{#g/alphysCutscene2}* Você está vivo, chegou até aqui inteirinho...",
                                '<25>{#f/3}* Isso deve contar como alguma coisa, certo???',
                                '<25>{#g/alphysIDK}* ...',
                                "<25>{#g/alphysIDK}* Com isso dito, você provavelmente vai precisar de mim para passar por Aerialis."
                            ]
                        ][world.bad_lizard],
                        '<25>{#f/15}* Pois é... não é um lugar muito amigável para humanos...',
                        '<25>{#f/17}* Armadilhas mortais...\n* Quebra-cabeças impossíveis...\n* Guardas reais...',
                        '<25>{|}{#f/15}* Sem mencionar- {%}'
                    ],
            alphys4: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? ['<25>{#g/alphysIDK}* Não... não não não não não...']
                    : ['<25>{#f/20}* Mettaton.'],
            alphys5: () =>
                SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* Não aqui... não agora...'] : ['<25>{#f/3}* Eheh...'],
            alphys6: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/20}* ...'] : ['<25>{#f/20}* ...']),
            alphys7: () => (SAVE.data.n.state_foundry_undyne > 0 ? ['<25>{#f/23}* Oh meu.'] : ['<25>{#f/11}* Oh não ']),
            alphys8: () => [
                SAVE.data.n.state_foundry_undyne > 0 ? '<32>{#p/mettaton}* OHHHH MY!' : '<32>{#p/mettaton}* OHHHH YES!',
                '<32>{#p/mettaton}* BEM-VINDAS, LINDEZAS...'
            ],
            alphys9: ["<32>{#p/mettaton}* PARA O SHOW DE TALENTO DE HOJE!"],
            alphys10: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* SABE, PARA UMA APARENTE \"INOCENTE\" CRIANÇA HUMANA...',
                        '<32>* VOCÊ SABE MUITO BEM COMO MACHUCAR!',
                        '<32>* SENDO TRANSMITIDO AGORA NA TV IMAGENS REAIS DOS SEUS ATOS \"VILANICOS\"!',
                        SAVE.data.n.state_foundry_undyne > 0
                            ? '<25>{#p/alphys}{#f/2}* M-mettaton, pera!!\n* O que você...'
                            : '<25>{#p/alphys}{#g/alphysGarbo}* Huh?\n* Você roubou os vídeos da câmera de segurança de novo?'
                    ]
                    : [
                        "<32>{#p/mettaton}* EU JÁ CONSIGO DIZER QUE VAI SER UM ÓTIMO SHOW!",
                        "<32>* VAMOS DAR APLAUSOS AO NOSSO NOVO PARTICIPANTE...",
                        '<33>* O GRANDE E ÚNICO, HUMANO VISITANTE!'
                    ],
            alphys10a: () => [
                '<32>{#p/mettaton}* (POR FAVOR ESPERE ENQUANTO A AUDIÊNCIA VÊ AS FOTOS.)',
                SAVE.data.n.state_foundry_undyne > 0
                    ? "<25>{#p/alphys}{#f/21}* ...\n* Eu só não consigo vencer."
                    : "<26>{#p/alphys}{#g/alphysGarboCenter}* Eu vou entender isso como sim."
            ],
            alphys11: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* DE QUALQUER FORMA, DITO ISSO, PRECISAREMOS DAR A ELE UM APELIDO!",
                        ...(world.flirt > 9
                            ? [
                                '<32>{#p/mettaton}* QUANDO FALAMOS SOBRE VILÕES, TODOS ELES TEM UM.\n* MAS VOCÊ...',
                                "<32>{#p/mettaton}* PARA UM BULLY SAFADO COMO VOCÊ, SÓ TEM UM NOME QUE COMBINA!",
                                '<32>{#p/mettaton}* ... $(moniker1u)!'
                            ]
                            : [
                                "<32>{#p/mettaton}* QUANDO SE FALAM SOBRE VILÕES, TODOS TEM UM.\n* ENTÃO, O QUE SERÁ?"
                            ])
                    ]
                    : ['<32>{#p/mettaton}* NUNCA BRINCOU ANTES, MARAVILHA?', "<32>* BEM, É SIMPLES."],
            alphys11a: () => [
                choicer.create(
                    '* (Qual nome você vai escolher?)',
                    'Menor Amarelo',
                    'Tempestade Chegando',
                    'Super Raivoso',
                    'Invasor Espacial'
                )
            ],
            alphys11b: () =>
                iFancyYourVilliany()
                    ? world.flirt > 9
                        ? ["<32>{#p/mettaton}* ENTÃO, $(moniker2u), VAMOS VER SE SUAS HABILIDADES NO CAMPO DE BATALHA..."]
                        : [
                            '<32>{#p/mettaton}* $(moniker1u), HUH?\n* MY, QUE ESCOLHA EXCELENTE!',
                            "<32>{#p/mettaton}* BEM, $(moniker2u), VEREMOS SE SUAS HABILIDADES EM BATALHA..."
                        ]
                    : ["<32>* NA VERDADE, SÓ TEM UMA REGRA!", '<32>* FAÇA A MELHOR PERFORMANCE DA SUA VIDA...'],
            alphys12: () =>
                iFancyYourVilliany()
                    ? ['<32>{*}{#p/mettaton}* TRADUZIR PARA O PALCO!!!{^20}{%}']
                    : ['<32>{*}{#p/mettaton}* OU MORRA TENTANDO!!!{^20}{%}'],
            alphys13: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        '<25>{#p/alphys}{#f/10}* Q... quer saber?',
                        '<25>{#f/10}* Faça o que quiser.',
                        "<25>{#f/23}* Porque... eu estou indo embora.",
                        '<25>{#f/23}* Pra sempre.',
                        '<25>{#f/5}* E se você precisar de mim para alguma coisa...',
                        '<25>{#f/5}* Bem...',
                        '<25>{|}{#f/16}* Que pena pra você!!!{%}'
                    ]
                    : [
                        ...(world.bad_lizard < 1
                            ? [
                                '<25>{#p/alphys}{#f/5}* Ei...',
                                '<25>{#f/8}* Eu sei que isso veio do nada, mas... você é b-bem da hora.'
                            ]
                            : [
                                '<25>{#p/alphys}{#f/5}* Ei...',
                                '<25>{#f/8}* Eu sei que isso veio do nada, mas...',
                                '<25>* Você conseguiu aguentar m-muito bem.'
                            ]),
                        "<25>{#f/9}* De toda forma, uh, como eu estava dizendo, você vai precisar de mim.",
                        "<25>{#f/17}* Vamos ver o que você tem consigo..."
                    ],
            alphys14: [
                '<25>{#p/alphys}{#f/21}* ...',
                '<25>{#f/21}* O que é isso.',
                '<25>{#f/21}* Quem te deu isso???',
                '<25>{#f/22}* QUEM AINDA USSA TECNOLOGIA ASSIM???',
                '<25>{#f/22}* ...',
                "<25>{#f/23}* Eu estarei de volta logo."
            ],
            alphys15: () =>
                world.bad_lizard < 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysCutscene1}* Aqui, um celular novinho!',
                        "<25>* Tem um passe para as levitações e caixas dimensionais...",
                        '<25>{#g/alphysHellYeah}* E sua conta na Outernet!',
                        '<25>{#g/alphysSmileSweat}* Eu te adicionei como amigo, assim podemos nos comunicar caso necessário.',
                        '<25>{#g/alphysUhButHeresTheDeal}* Então, é isso!!',
                        '<32>{#s/equip}{#p/human}* (Você ganhou um celular atualizado!)'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* Desculpa, mas aquilo que você tinha era uma relíquia do passado.',
                        "<25>{#g/alphysSide}* Este novo te dá acesso aos transportes e caixas dimensionais.",
                        '<25>{#g/alphysSmileSweat}* E sua conta na Outernet!',
                        "<25>{#g/alphysNervousLaugh}* Não se preocupa, coloquei a gente como amigos caso necessário.",
                        '<32>{#s/equip}{#p/human}* (Você ganhou um celular atualizado!)'
                    ],
            alphys16: ["<25>{#p/alphys}{#g/alphysWelp}* Eu estarei no meu computador."],
            rg1a: () =>
                world.bad_lizard > 1
                    ? world.goatbro
                        ? ['<32>{#p/basic}{#x1}* Vocês dois!{#x3}']
                        : ['<32>{#p/basic}{#x1}* Você aí!{#x3}']
                    : ['<32>{#p/basic}{#x1}* Ei criança!{#x3}'],
            rg1b1: () =>
                world.bad_lizard > 1
                    ? ['<32>{#p/basic}{#x1}* Você poderia nos dizer o motivo de você ter matado todas aquelas pessoas?{#x3}']
                    : ['<32>{#p/basic}{#x1}* Você poderia nos ajudar achar a máquina de sorvete mais próxima ?{#x3}'],
            rg1b2: () =>
                world.bad_lizard > 1
                    ? ["<32>{#p/basic}{#x1}* Meu namorado e eu... pensamos que não é nada legal.{#x3}"]
                    : ['<32>{#p/basic}{#x1}* Meu namorado e eu já procuramos por todos os lados!{#x3}'],
            rg1c: () =>
                world.bad_lizard > 1
                    ? ['<33>{#p/basic}{#x2}* Caramba, irmão.\n* Acho que nós, temos, que matar eles e tal.{#x3}']
                    : [
                        '<32>{#p/basic}{#x1}* Você está bem, criança?{#x3}',
                        "<32>{#x1}* Você está agindo, bem estranho e tals...{#x3}",
                        '<32>{#x1}* Você sabe, com toda a parada de \"não conversar com a gente\" e tals...{#x3}',
                        '<32>{#x1}* Então, uh...{#x3}'
                    ],
            rg1d1: () =>
                world.bad_lizard > 1
                    ? ["<32>{#p/basic}{#x1}* É...\n* Acho que esse é meio que nosso trabalho agora, certo?{#x3}"]
                    : ["<32>{#p/basic}{#x1}* Esqueça, mano.\n* Acho que eles nem sabem que estamos aqui.{#x3}"],
            rg1d2: [
                '<32>{#p/basic}{#x2}* Mas o sorvete!{#x3}',
                "<32>{#p/basic}{#x1}* Vamos, mano.\n* Não podemos ficar longe do treino o dia inteiro. {#x3}"
            ],
            rg1d3: ['<32>* ...', '<32>{#x2}* É, tá certo.{#x3}'],
            rg1e: [
                '<32>{#p/basic}{#x1}* Te vemos por aí, eu acho...{#x3}',
                "<32>{#x2}* Vamos te avisar sobre a parada do sorvete mais tarde!{#x3}"
            ],
            rg1f: [
                '<33>{#p/basic}{#x1}* Mano... a gente tem que meter o pé daqui!{#x3}',
                '<32>{#x2}* É, tipo, desculpa Undyne!{#x3}'
            ],
            robocaller1: () =>
                [
                    [
                        '<32>{#p/mettaton}* AI ESTÁ VOCÊ.',
                        '<32>{#z03}* PODES NÃO ME CONHECER, MAS EU TE CONHEÇO...',
                        "<32>{#z21}* VOCÊ FOI AQUELE QUE TEVE UM ENCONTRO COM A CAPITÃ DA GUARDA REAL.",
                        "<32>{#z30}* UM ENCONTRO QUE RESULTOU NA MORTE DA CAPITÃ.",
                        "<32>{#z31}* OLHA, EU PESSOALMENTE, NÃO SOU A MAIOR FÃ DA UNDYNE.",
                        '<32>{#z30}* MAS ALPHYS... ELA ERA BASTANTE.',
                        "<32>{#z21}* E ELA LEVOU ISSO TUDO PAR AO FUNDO DO CORAÇÃO.",
                        "<32>{#z21}* EU NÃO ESTOU DIZENDO QUE VOCÊ É UMA PESSOA RUIM... MAS SUAS ESCOLHAS FERIRAM MINHA AMIGA.",
                        "<33>{#z30}* ... VAMOS SÓ DIZER QUE ELA NÃO ESTARÁ AQUI POR UM TEMPINHO.",
                        "<32>{#z03}* MAS SEM PÂNICO.\n* SE VOCÊ SENTIR-SE SOZINHO, UMA COISA PODE GARANTIR...",
                        "<32>{#z02}* EU ESTAREI ASSISTINDO CADA MOVIMENTAÇÃO SUA.",
                        '<32>{#z21}* ...',
                        '<32>{#z11}* BEM, BYE BYE!'
                    ],
                    [
                        '<32>{#p/mettaton}* AÍ ESTÁ VOCÊ, RATO.',
                        '<32>{#z03}* PODES NÃO ME CONHECER, MAS EU TE CONHEÇO...',
                        '<32>{#z21}* ALPHYS E EU ESTAVAMOS ASSISTINDO CADA MOVIMENTO SEU.',
                        "<32>{#z00}* ENTENDA, EU E A ALPHYS COMPREENDEMOS ALGUNS PEQUENOS ERROS...",
                        '<32>* POXA, ALPHYS E EU SOMOS GRANDES AMANTES DOS HUMANOS.',
                        "<32>{#z03}* MAS EXISTE UM NÍVEL DE VIOLÊNCIA QUE PODE SER TOLERADA.",
                        "<32>{#z21}* ALPHYS... NÃO ESTARÁ CONOSCO HOJE...",
                        "<32>{#z00}* APÓS O QUE VOCÊ FEZ, É PROVAVELMENTE PARA O MELHOR.",
                        '<32>{#z21}* TENTE NÃO MATAR MAIS NINGUÉM, TUDO BEM?',
                        '<32>{#z21}* ...',
                        '<32>{#z11}* BEM, BYE BYE!'
                    ],
                    [
                        '<32>{#p/mettaton}* AI ESTÁ VOCÊ.',
                        '<32>{#z03}* VOCÊ PODE NÃO ME CONHECER, MAS...',
                        '<32>* ...',
                        '<32>{#z00}* ...',
                        "<32>* OLHA.\n* EU VOU SER HONESTA.",
                        "<32>{#z11}* EU CHEGUEI AO PONTO EM QUE TODA ESSA MORTE CAUSADA SÓ É... SEM SENTIDO.",
                        "<32>{#z00}* MAS EXISTE UMA PESSOA NA QUAL EU NÃO POSSO VIVER.",
                        ...(SAVE.flag.n.genocide_milestone < 5
                            ? [
                                "<32>* ELA NÃO ATENDE O TELEFONE...",
                                "<32>{#z21}* ELA NÃO RESPONDE AS MINHAS MENSAGENS NA OUTERNET, MESMO QUE ESCANCARADAMENTE ONLINE.",
                                '<32>{#z11}* E AS COISAS QUE ELA ME DISSE MOMENTOS ANTES DE SAIR...?',
                                '<32>{#z00}* ME DEIXOU BEM PREOCUPADA.'
                            ]
                            : [
                                "<32>{|}* ELA NÃO RESPONDE SEU- {%}",
                                '<25>{#z21}{#p/asriel2}{#f/8}* Para sua informação, ELA está planejando lutar conosco.',
                                "<32>{#z00}{#p/mettaton}* HUM, COM LICENÇA?\n* É RUDE INTERROMPER AS PESSOAS QUANDO ELAS ESTÃO FALANDO."
                            ]),
                        '<32>* HUMANO, SE VOCÊ TEM QUALQUER DECÊNCIA SOBRANDO...',
                        "<32>* VOCÊ FARÁ O QUE ALPHYS DISSE QUE VOCÊ TEM PODER PARA FAZER E...",
                        '<32>* RESETAR A LINHA DO TEMPO.',
                        "<32>{#z11}* CASO CONTRÁRIO, DA FORMA NA QUAL VOCÊ ESTÁ INDO AGORA...?",
                        "<32>{#z02}* VOCÊ TERÁ UM DIA RUIM."
                    ]
                ][Math.max(world.bad_lizard - 1, 0)],
            robocaller1x: [
                "<25>{#p/asriel2}{#f/13}* VOCÊ REALMENTE PENSA QUE É AMEAÇA PARA MIM?",
                "<25>{#f/9}* Não me faça RIR."
            ],
            robocaller2: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? [
                        '<32>{#p/mettaton}{#z11}* OH, CORAÇÃO...\n* VOCÊ NÃO TEM NOÇÃO, TEM...?',
                        '<32>{#z02}* HAHAHA...',
                        '<32>{#z03}* APENAS LEMBREM-SE, VOCÊS DOIS...',
                        "<32>{#z12}* O AVISO ESTÁ ENTREGUE.",
                        '<32>{#z21}* ...',
                        '<32>{#z11}* BEM, BYE BYE!'
                    ]
                    : [
                        "<32>{#p/mettaton}{#z11}* SEM OFENSA, CORAÇÃO, MAS ISSO É A BEIRA DO RIDÍCULO.",
                        "<32>{#z03}* ALPHYS NÃO SABE LUTAR, NA VERDADE, ELA MESMA ME CONTOU.",
                        '<32>{#z12}* ... MAS EU SEI ALGUÉM QUE É.',
                        '<32>{#z02}* HAHAHA...',
                        '<32>{#z21}* ...',
                        '<32>{#z11}* BEM, BYE BYE!'
                    ],
            robocaller2x: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? ['<25>{#p/asriel2}{#f/13}* Tá?']
                    : ['<25>{#p/asriel2}{#f/16}* Legal.'],
            status: '$(x) updated status',
            barricade1: () => [
                '<32>{#p/event}* Ring, ring...',
                "<25>{#p/alphys}{#g/alphysSideSad}* Eu não acho que você consiga passar por aquilo...",
                '<25>{#g/alphysSmileSweat}* Deixa eu ver se consigo fazer algo para ajudar.',
                '<32>{#p/human}* (Parece que alguém está digitando furiosamente no teclado.)',
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* Segurança... q-quê?',
                '<32>{#p/human}* (Mais digitadas podem ser ouvidas.)',
                '<32>{#p/human}* (...)',
                '<32>{#p/human}* (A digitada para.)',
                "<25>{#p/alphys}{#g/alphysWelp}* Bom... parece que vamos ter que responder algumas perguntas de segurança.",
                "<25>{#g/alphysGarbo}* Questões de segurança, do Mettaton...",
                '<25>{#g/alphysNeutralSweat}* Então... tem qualquer chance de você saber algo útil sobre o Mettaton?',
                '<25>{#g/alphysTheFactIs}* ... provavelmente não, considerando que você acabou de conhecer ele...',
                "<25>{#g/alphysUhButHeresTheDeal}* Bem, talvez você saiba a resposta para a primeira.",
                '<25>{|}{#g/alphysIDK}* \"Quem foi o hmm- {%}',
                ...(world.postnoot
                    ? []
                    : [
                        "<25>{#g/alphysWTF}* Oh meu senhor, é óbvio que ele usaria isso como uma pergunta de segurança.",
                        '<25>{#g/alphysNervousLaugh}* \"Quem tem uma queda pelo Mettaton?\"',
                        choicer.create('* (O que você diz?)', 'Alphys', 'Asgore', 'Papyrus', 'Undyne')
                    ])
            ],
            barricade1x: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* ... huh?',
                '<25>{#g/alphysWelp}* A barricada só... se levantou sozinha.',
                '<25>{#g/alphysCutscene1}* Que bom!\n* Assim fica mais fácil!'
            ],
            barricade1b1: [
                '<25>{#p/alphys}{#g/alphysFR}* ...',
                '<25>{#g/alphysFR}* Eu não tenho uma queda pelo Mettaton.',
                "<25>{#g/alphysCutscene2}* Vamos tentar... Asgore."
            ],
            barricade1b2: ['<25>{#p/alphys}{#g/alphysSmileSweat}* Hmm... okay.'],
            barricade1b3: () => [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* Tem certeza?',
                '<25>{#p/alphys}{#x1}* ...',
                ...(SAVE.data.n.state_starton_papyrus === 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* ah, acho que essa era a resposta correta.',
                        '<25>{#g/alphysHaveSomeCompassion}* ...'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* Olha, essa era a resposta correta.',
                        '<25>{#g/alphysFR}* ...',
                        "<25>{#g/alphysFR}* Isso foi muito específico de se saber sobre o Papyrus.",
                        '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Mas tudo bem!!'
                    ])
            ],
            barricade1b4: () => [
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        "<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* ...\n* Eu não acho que ela goste dele de verdade.",
                        "<25>{#g/alphysSideSad}* Vamos tentar... Asgore."
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysCutscene3}* Pfft...\n* Você tá brincando, certo?",
                        "<25>* Ela TOLERA ele.\n* Sem chance que essa seja a resposta correta.",
                        "<25>{#g/alphysCutscene2}* Vamos tentar... Asgore."
                    ])
            ],
            barricade2: () => [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysCutscene2}* Tá, então a pergunta para este é...',
                '<25>{|}{#g/alphysCutscene1}* \"Quem é o- {%}',
                '<25>{#g/alphysGarbo}* Sério que todas elas são sobre ele?',
                '<25>{#g/alphysGarboCenter}* Cara.',
                '<25>{#g/alphysWelp}* \"Qual é a frase de produto mais bem sucedida do Mettaton?\"',
                choicer.create('* (O que você diz?)', 'MTT Beauty', 'MTT Cooking', 'MTT Tech', 'MTT TV')
            ],
            barricade2b1: [
                "<25>{#p/alphys}{#g/alphysCutscene2}* É... essa é provavelmente a resposta correta.",
                '<25>{#g/alphysTheFactIs}* Ele realmente gosta dos seus shows de TV, mas...',
                '<25>{#g/alphysUhButHeresTheDeal}* Pessoas amam seus produtos!'
            ],
            barricade2b2: [
                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* Com certeza tem muitos produtos de cozinha da MTT por aí...',
                "<25>{#g/alphysWelp}* Poxa, até Undyne tem um, e ela nem gosta dele.",
                "<25>{#g/alphysSmileSweat}* ... é, vamos tentar isso."
            ],
            barricade2b3: [
                '<25>{#p/alphys}{#g/alphysFR}* ...',
                "<25>{#g/alphysFR}* Eu vou agir como se não tivesse ouvido isso.",
                "<25>{#g/alphysHellYeah}* Todo mundo sabe que eu sou a moça da tecnologia!",
                '<25>{#g/alphysHellYeah}* ...',
                "<25>{#g/alphysWelp}* Que tal... os produtos de cozinha do Mettaton?"
            ],
            barricade2b4: [
                '<25>{#p/alphys}{#g/alphysWorried}* Eu não sei...',
                "<25>{#g/alphysWelp}* Show de TV do Mettaton não tem ido tão bem ultimamente.",
                '<25>{#g/alphysWTF}{#x1}* ...',
                '<25>{#g/alphysWTF2}* Essa foi a CORRETA!?',
                '<25>{#g/alphysCutscene3}* ... como você sabe isso tudo?',
                '<25>{#g/alphysUhButHeresTheDeal}* Bem, um mais para ir!'
            ],
            barricade3: () => [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* Última pergunta...',
                '<25>{#g/alphysNeutralSweat}* \"Qual a verdadeira identidade do Mettaton?\"',
                '<25>{#g/alphysNeutralSweat}* ...',
                choicer.create('* (O que você diz?)', 'Model 42', 'Hapstablook', 'Aidrian', 'Mettaton') 
            ],
            barricade3b1: [
                '<25>{#p/alphys}{#g/alphysCutscene2}* Ah, sobre isso...',
                "<25>{#p/alphys}{#g/alphysCutscene3}* Eu... meio que acabei de completar um dos modelos do Mettaton.",
                "<25>{#p/alphys}{#g/alphysFR}* Então, não deve ser isso."
            ],
            barricade3b2: [
                '<25>{#p/alphys}{#g/alphysShocked}* Ma...',
                '<25>{#g/alphysOhGodNo}* Como você sabe isso?',
                "<25>{#g/alphysOhGodNo}* Ninguém deveria saber isso!!",
                '<25>{#g/alphysNeutralSweat}* V-você contou para mais alguém??',
                '<25>{#g/alphysNeutralSweat}* Você planeja fazer?',
                '<25>{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysNervousLaugh}* Bem... essa não é a verdadeira identidade dele de toda forma."
            ],
            barricade3b3: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* Aidrian?',
                '<25>{#g/alphysInquisitive}* Quem seria Aidrian?',
                "<25>{#g/alphysSmileSweat}* Bem, a resposta não é essa."
            ],
            barricade3b4: [
                "<25>{#p/alphys}{#g/alphysCutscene1}* Então... a verdadeira identidade do Mettaton, seria o Mettaton, huh?",
                '<25>{#x1}* ...',
                '<25>{#p/alphys}{#g/alphysWelp}* Oh.\n* Acho que é isso.',
                '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Sabe muito!'
            ],
            barricade3c: [
                '<25>* ...',
                '<25>{#p/alphys}{#g/alphysSide}* Hmm... Eu acho que tenho uma ideia.',
                '<32>{#p/human}* (Algumas clicadas anteriores.)',
                '<25>{#p/alphys}{#g/alphysCutscene1}{#x1}* ...',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* Pronto!!!',
                '<25>{#g/alphysUhButHeresTheDeal}* É, isso foi legal.'
            ],
            barricadeFail1: [
                '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysNeutralSweat}* Não... acho que vou ter que reescrever tudo.",
                '<25>{#g/alphysWelp}* ...',
                '<25>{#g/alphysWelp}* Isso vai tomar um tempo.',
                "<25>{#g/alphysUhButHeresTheDeal}* Eu vou te l-ligar de volta quando tudo estiver pronto!"
            ],
            barricadeFail2: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* O-okay, está tudo completo.'
            ],
            barricadeFail2x: [
                '<25>{#p/alphys}{#g/alphysInquisitive}* ...',
                '<25>{#g/alphysInquisitive}* Você saiu da sala?',
                '<25>{#g/alphysSide}* Bom, uh, a barricada se foi.'
            ],
            barricadeFail3: ['<25>{#p/alphys}{#g/alphysCutscene1}* Espero que isso ajude!'],
            barricade4: () => [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysSideSad}* Não isso de novo...',
                '<25>{#g/alphysSideSad}* ...',
                "<25>{#g/alphysWelp}* Espera, eu ainda estou dentro da conta do Mettaton.",
                '<25>{#g/alphysNervousLaugh}* Talvez eu p-possa só liberar o caminho logo!',
                '<32>{|}{#p/human}* (A digitação de resultados ante- {%}',
                '<25>{#p/alphys}{#g/alphysHellYeah}{#x1}* Consegui!',
                '<25>{#g/alphysWelp}* ...',
                "<25>{#g/alphysGarboCenter}* Eu espero que essa seja a última vez que precisamos lidar com isso.",
                ...(SAVE.data.b.failshow
                    ? []
                    : SAVE.data.b.item_tvm_mewmew &&
                        !SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                        !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                        !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                        ? [
                            '<25>{#g/alphysTheFactIs}* Ah, e, sobre aquela b-boneca Mell Mell...',
                            '<25>* Bem...',
                            '<25>{#f/10}* Espera, você...',
                            '<25>{#f/3}* V-você jogou fora ou coisa do tipo?',
                            '<25>{#f/3}* ...',
                            '<25>{#g/alphysUhButHeresTheDeal}* Claro, beleza!'
                        ]
                        : [
                            '<25>{#g/alphysTheFactIs}* Ah, e, sobre aquela b-boneca Mell Mell...',
                            '<25>* Bem...',
                            SAVE.data.b.item_tvm_mewmew
                                ? "<25>{#g/alphysUhButHeresTheDeal}* Eu vou estar de volta com você mais tarde."
                                : "<25>{#g/alphysUhButHeresTheDeal}* Na verdade, você nem tem ela, então tudo bem!",
                            '<25>{|}{#g/alphysCutscene3}* De toda forma, te vejo no eleva- {%}'
                        ]),
                '<32>{#s/equip}{#p/event}* Clique...'
            ],
            puzzleReaction1: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysHellYeah}* Você conseguiu!!',
                '<25>{#g/alphysNeutralSweat}* ...',
                '<25>{#g/alphysCutscene2}* P... parabéns.'
            ],
            cooker1a: ['<32>{#p/mettaton}* OLÁ BEM.'],
            cooker1b: ["<32>{*}{#p/mettaton}* E SEJA BEM VINDO AO GRANDE SHOW DE ARTE E CONSTRUÇÃO DO OUTPOST!{^30}{%}"],
            cooker2a1: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* O QUÊ ESTAREMOS FAZENDO HOJE?\n* ALGO BEM DIVERTIDO, É CLARO!']
                    : ['<32>{#p/mettaton}* PREPARE SEUS KITS DE CONSTRUÇÃO, POIS VAMOS FAZER UMA \"EXPLOSÃO.\"'],
            cooker2a2: () =>
                iFancyYourVilliany()
                    ? ["<32>{#p/mettaton}* ATÉ PORQUE, É CONOSCO QUE DEVE SURGIR O MELHOR EXEMPLO!"]
                    : ['<32>{#p/mettaton}* HAHAHA...'],
            cooker2b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* ESTE BULLY MANÍACO ESTARÁ PEGANDO OS SUPRIMENTOS.',
                        '<32>{#p/mettaton}* TODO MUNDO, DE A ELE O TRATAMENTO DE SILÊNCIO MERECIDO!'
                    ]
                    : [
                        '<32>{#p/mettaton}* MEU AMADO ASSISTENTE AQUI, IRÁ PEGAR OS SUPRIMENTOS.',
                        '<32>* TODOS, DÊEM A ELE SEUS MERECIDOS APLAUSOS!'
                    ],
            cooker3a: () => [
                "<32>{#p/mettaton}* VAMOS PRECISAR DE TRÊS INGREDIENTES CHAVES...",
                iFancyYourVilliany()
                    ? '<32>* {@fill=#ff0}PÓ DA FELICIDADE{@fill=#fff}, {@fill=#ff0}SORO DO FORMIGAMENTO{@fill=#fff}, E {@fill=#ff0}ÓLEO DO AMOR!{@fill=#fff}.'
                    : '<32>* {@fill=#ff0}HEXOGENIO{@fill=#fff}, {@fill=#ff0}DIACTILO ADIPATO{@fill=#fff}, E {@fill=#ff0}PÓ MINERAL{@fill=#fff}.'
            ],
            cooker3b: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* VÁ PEGAR, $(moniker2u)!']
                    : ['<32>{#p/mettaton}* VÁ PEGAR, CORAÇÃO!'],
            cooker4a: ['<32>{#p/mettaton}* PERFEITO!', '<32>* AGORA, SE ME PERMITE...'],
            cooker4b: ['<32>{#p/mettaton}* OKAY!', "<32>* ISSO É TUDO QUE PRECISAMOS..."],
            cooker5: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* ... PARA FAZER O FAMOSO MTT{@fill=#003cff}SLIME LEGAL{@fill=#fff}! (TM)']
                    : ['<32>{#p/mettaton}* ... PARA FAZER {@fill=#f00}PLASTICO EXPLOSIVO{@fill=#fff}!'],
            cooker6: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* AÍ VEM!']
                    : ['<32>{#p/mettaton}* FAÇA SUA ORAÇÃO, BELEZURA!'],
            cooker7a: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/event}* Ring, ring...',
                        '<25>{#p/alphys}{#g/alphysShocked}* Uh, e-espera!',
                        "<25>{#g/alphysOhGodNo}* Isso não é {@fill=#003cff}slime legal{@fill=#fff}...",
                        "<25>{#g/alphysUhButHeresTheDeal}* Isso é {@fill=#f00}plastico explosivo{@fill=#fff}!"
                    ]
                    : [
                        '<32>{#p/event}* Ring, ring...',
                        '<25>{#p/alphys}{#g/alphysShocked}* Uh, e-espera!',
                        '<25>{#g/alphysOhGodNo}* Se você sintetizar isso agora...',
                        "<25>{#g/alphysUhButHeresTheDeal}* Você vai destruir m-metade de Aerialis!"
                    ],
            cooker7b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* HUH...?\n* VOCÊ ESTÁ DIZENDO QUE NOSSO CONVIDADO ESPECIAL TROCOU OS INGREDIENTES?',
                        '<25>{#p/alphys}{#g/alphysTheFactIs}* É...\n* Não e-exatamente...',
                        '<32>{#p/mettaton}* OH QUERIDA... \n* EU ACREDITO SIM QUE NOSSO CONVIDADO ESPECIAL FEZ ISSO!',
                        "<25>{#p/alphys}{#g/alphysSmileSweat}* Isso não foi o que eu- {%}",
                        '<32>{#p/mettaton}* QUE AMEAÇADOR!\n* E PENSAR QUE NOSSO CONVIDADO ESPECIAL FARIA ISSO...'
                    ]
                    : [
                        '<32>{#p/mettaton}* E POR QUE FARIA ISSO...?',
                        "<25>{#p/alphys}{#g/alphysTheFactIs}* É por c-causa...\n* É...",
                        "<25>{#g/alphysHellYeah}* Porque há um campo de excitação de táquions em vigor!!",
                        '<32>{#p/mettaton}* É O QUE?',
                        '<25>{#p/alphys}{#f/3}* Eu tive que liga-lo para um experimento hoje.',
                        '<32>{#p/mettaton}* AH.'
                    ],
            cooker7c: ['<32>{#p/mettaton}* ESPERA, ISSO PODE ACABAR REALMENTE MATANDO ALGUÉM.'],
            cooker7d: [
                "<32>{#p/mettaton}* PERA! ALGO ESTÁ ERRADO...",
                "<32>{#p/mettaton}* ESTE NÃO É O {@fill=#003cff}SLIME LEGAL{@fill=#fff} DA MARCA MTT DE FORMA ALGUMA!",
                '<32>{#p/mettaton}* NÃO... ISSO É {@fill=#f00}PLASTICO EXPLOSIVO{@fill=#fff}!',
                "<32>{#p/mettaton}* NOSSO CONVIDADO ESPECIAL DEVE TER TROCADO OS INGREDIENTES!",
                '<32>{#p/mettaton}* QUE AMEAÇADOR!\n* E PENSAR QUE NOSSO CONVIDADO ESPECIAL FARIA ISSO...'
            ],
            cooker8a1: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* NÃO SE PREOCUPE, MEU BEM.",
                        '<32>* COM SORTE, ISSO SERVIRÁ COMO UMA LIÇÃO SOBRE COMO NÃO SABOTAR MEU SHOW.'
                    ]
                    : [
                        '<32>{#p/mettaton}* PEÇO DESCULPAS, A TODOS...',
                        "<32>* PARECE QUE NÃO -ESTAREMOS- FAZENDO NENHUM EXPLOSIVO HOJE."
                    ],
            cooker8a2: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>* O QUE!?!?\n* O ARTES E CONSTRUÇÕES FOI SÓ UMA DISTRAÇÃO PARA ISSO!?!?",
                        "<32>* OH MY, $(moniker1u) É UM VERDADEIRO VILÃO!"
                    ]
                    : ['<32>* BOA COISA EU FIZ UM POUCO COM ANTECEDÊNCIA, ENTÃO, HUH?'],
            cooker8b: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>* BEM, QUERIDO, $(moniker2u), EU AINDA TENHO UM ÚLTIMO TRUQUE METAFÓRICO GUARDADO.',
                        "<32>* SE VOCÊ NÃO CRUZAR ESTE CAMPO DE BOMBAS EM {@fill=#ff0}NOVENTA SEGUNDOS{@fill=#fff}..."
                    ]
                    : [
                        "<32>* E SÓ PARA AUMENTAR A TENSÃO VOCÊ TERÁ QUE CRUZAR ESTE CAMPO DE BOMBAS EM {@fill=#ff0}NOVENTA SEGUNDOS{@fill=#fff}"
                    ],
            cooker9: () =>
                iFancyYourVilliany()
                    ? [
                        "<32>{#p/mettaton}* EU USAREI SUA PRÓPRIA CRIANÇÃO CONTRA VOCÊ E TE {@fill=#f00}EXPLODIR EM PEDAÇOS{@fill=#fff}!"
                    ]
                    : ["<32>{#p/mettaton}* ANTES DE VOCÊ {@fill=#f00}EXPLODIR EM PEDAÇOS{@fill=#fff}!"],
            cooker10: ['<32>{#p/mettaton}* MELHOR COMEÇAR A CORRER!!!'],
            cooker11: ["<32>{#p/basic}* Não parece que você pode cruzar este caminho sozinho."],
            cooker12: () =>
                SAVE.data.n.state_foundry_undyne > 0
                    ? [
                        '<32>{#p/event}* Ring, ring...',
                        '<25>{#p/alphys}{#f/20}* Uh... eu...',
                        "<25>{#g/alphysIDK}* Eu n-não sei se isso é uma boa ideia...",
                        "<25>{#f/16}* M-mas eu prefiro te ajudar do que te deixar morrer!!",
                        "<25>{#f/10}* Você não iria querer... p-parar aqui, não é?",
                        '<25>{#f/5}* Então... basicamente, na maioria dos telefones por aqui...',
                        '<25>{#f/6}* Tem uma mochila a jato de uso único.',
                        '<25>{#f/10}* Talvez... seu celular tenha um também??'
                    ]
                    : [
                        '<32>{#p/event}* Ring, ring...',
                        '<25>{#p/alphys}{#g/alphysSide}* Ei, uh...',
                        '<25>{#g/alphysCutscene1}* Eu acho que sei uma forma de te deixar passar!',
                        "<25>{#g/alphysNervousLaugh}* É... basicamente...",
                        "<25>{#g/alphysSmileSweat}* Não é bom igual o da Undyne, mas o celular que eu te dei...",
                        '<25>{#g/alphysHellYeah}* Tem uma mochila a jato de uso único!',
                        '<25>{#g/alphysNervousLaugh}* Talvez seja... uma boa hora pra tentar??'
                    ],
            cooker12x: ["<32>{#p/basic}* ... então você percebe que o celular da Alphys tem um jetpack instalado."],
            cooker13: () => [
                '<32>{#p/human}* (Você ativa o jetpack.)',
                SAVE.data.n.state_foundry_undyne > 0
                    ? '<25>{#p/alphys}{#f/3}* B-boa sorte?'
                    : "<25>{#p/alphys}{#g/alphysHellYeah}* Agora estamos cozinhando!",
                '<32>{#s/equip}{#p/event}* Clique...',
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Isso é absolutamente maluco.'])
            ],
            cooker13x: ['<32>{#p/human}* (Você ativa o jetpack.)'],
            cooker14: ':$(x)',
            cooker15: '$(x)%',
            cooker16a: ['<32>{#p/mettaton}* VOCÊ ENTENDE QUE SUA VIDA ESTÁ ME PERIGO AQUI... CORRETO?'],
            cooker16b: ['<32>* ...'],
            cooker16c: ['<32>* TALVEZ NOSSO CONVIDADO TENHA... UMA MENTE INSTÁVEL.', '<32>* NESSE CASO...'],
            cooker16d: [
                "<32>* TEREMOS QUE FINALIZAR ESTE EPISÓDIO MAIS CEDO!",
                "<32>* MAS NÃO SE PREOCUPEM.",
                "<32>* NOSSO PRÓXIMO EPISÓDIO NÃO IRÁ NECESSITAR SANIDADE!"
            ],
            cooker16e: () => [
                "<32>{#p/mettaton}* BEM, ISSO É TUDO POR AGORA.",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* APENAS ISSO AGORA, \"$(moniker2u)...\"',
                        '<32>* DA PRÓXIMA VEZ QUE NOS VERMOS A SANIDADE SERÁ O MENOR DOS PROBLEMAS!'
                    ]
                    : ['<32>* ENTÃO, ATÉ A PRÓXIMA...', '<32>* ESPERAMOS QUE O HUMANO FIQUE BEM.'])
            ],
            cooker16f: [
                '<32>{#p/basic}* Huh??',
                "<32>* Você poderia ter sido morto alí mesmo!",
                "<32>* ... como se eu já não soubesse que isso é tudo por brincadeira.",
                "<32>* Não faz disso nem um pouco menos de entretenimento, pra ser sincera!"
            ],
            cooker17a: [
                '<32>{#p/mettaton}* HORA, HORA, HORA...',
                "<32>* PARECE QUE... VOCÊ NÃO CHEGOU NEM NA METADE DO CAMINHO?",
                "<32>* MY MY.\n* ACHO QUE VOCÊ IRÁ MORRER.",
                '<32>* HAHAHA...',
                '<32>* ...',
                '<32>* ... BRINCADEIRINHA.',
                '<32>* PRECISO DE VOCÊ INTEIRO PARA O PRÓXIMO EPISÓDIO.'
            ],
            cooker17b: [
                '<32>{#p/mettaton}* HORA, HORA, HORA...',
                "<32>* PARECE QUE VOCÊ NÃO CONSEGUIU, HUH?",
                "<32>* MAS EI.\n* SÓ PELO ESPÍRITO ESPORTIVO, EU VOU TE DEIXAR IR."
            ],
            cooker17c: () => [
                "<32>{#p/mettaton}* BEM, ISSO É TUDO POR AGORA.",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* APENAS ISSO AGORA, \"$(moniker2u)...\"',
                        "<32>* DA PRÓXIMA VEZ QUE NOS VIRMOS, AS COISAS NÃO SERÃO TÃO AGRADÁVEIS PRA VOCÊ!"
                    ]
                    : ['<32>* ENTÃO, ATÉ A PRÓXIMA...', '<32>* TE DESEJO BOA SORTE!'])
            ],
            cooker17d: [
                '<32>{#p/basic}* Isso com certeza foi uma \"bomba\"!',
                "<32>{#p/basic}* Me pergunto o quão bem você irá se sair no próximo."
            ],
            cooker17e: [
                '<32>{#p/basic}* Isso com certeza foi uma \"bomba\"!',
                "<32>{#p/basic}* Que triste você não conseguir chegar no final a tempo."
            ],
            cooker18a: [
                '<32>{#p/mettaton}* HORA, HORA, HORA...',
                "<32>* VOCÊ CHEGOU A TEMPO!",
                "<32>* PARABÉNS!\n* VOCÊ NÃO É UMA COMPLETA DECEPÇÃO."
            ],
            cooker18b: [
                '<32>{#p/mettaton}* UAU!\n* UM FINAL FOTOGÊNICO!',
                "<32>* VOCÊ É BEM SORTUDO, GRACINHA.",
                "<32>* SÓ MAIS ALGUNS MOMENTOS E VOCÊ TERIA TOSTADO!"
            ],
            cooker18c: () => [
                "<32>{#p/mettaton}* OLHA, EU AMARIA CONTINUAR, MAS EU -ESTOU- MEIO QUE EM UM IMPASSE AQUI.",
                ...(iFancyYourVilliany()
                    ? [
                        '<32>* APENAS ISSO AGORA, \"$(moniker2u)...\"',
                        '<32>* DA PRÓXIMA VEZ QUE NÓS VIRMOS O TEMPO -NÃO- ESTARÁ A SEU FAVOR!'
                    ]
                    : ['<32>* ENTÃO, ATÉ A PRÓXIMA...', '<32>* TE DESEJO BOA SORTE!'])
            ],
            cooker19a: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysCutscene1}* Você conseguiu!',
                '<25>{#g/alphysCutscene2}* ...',
                "<25>{#g/alphysUhButHeresTheDeal}* Eu acho que já deveria ter esperado isso."
            ],
            cooker19b: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                '<25>{#g/alphysSmileSweat}* Eu acho... que você conseguiu??',
                '<25>{#p/alphys}{#g/alphysCutscene1}* É!\n* Você conseguiu!!',
                '<25>{#g/alphysWelp}* ...'
            ],
            cooker19c: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                '<25>{#g/alphysNeutralSweat}* ...',
                '<25>{#g/alphysFR}* Você quase foi morto.'
            ],
            robocaller3: [
                '<32>{#p/event}* Ring, ring...',
                "<32>{#p/mettaton}* VEJO QUE VOCÊ CHEGOU AO PALCO.",
                '<32>* DÊ UM SORRISO PARA A CÂMERA, QUERIDO...'
            ],
            robocaller4: [
                "<32>* PORQUE VOCÊ ESTÁ NA TV AO VIVO!",
                "<32>* É UMA TRISTEZA QUE EU NÃO POSSA ESTAR AÍ EM PESSOA, MAS...",
                "<32>* É ASSIM QUE AS -COISAS- TENDEM A IR NOS DIAS ATUAIS, CORRETO?",
                '<32>* DE TODA FORMA, A PEQUENA AUDIÊNCIA QUE NOS RESTA IRÁ APRECIAR VÊ-LOS SOFRER.',
                '<32>* COMO VOCÊ PASSARÁ PELO ABISMO SEM UMA MOCHILA A JATO?\n* AH, SE EU TIVESSE A RESPOSTA...',
                '<32>* BOA SORTE!'
            ],
            robocaller4x: [
                '<25>{#p/asriel2}{#f/8}* Sério?\n* \"Boa sorte?\"',
                '<25>{#f/6}* Cuidado com o que você deseja, robô.',
                "<25>{#f/7}* Tem um portal de levitação bem na nossa frente."
            ],
            cookerX1: [
                '<32>{#p/basic}* Ah, aí está você.\n* Imaginei que você apareceria...',
                '<32>* Este portal de levitação foi colocado aqui para ajudar outros a evacuar.',
                "<32>* Mas agora que eles já foram, acredito que não possa deixar mais ninguém passar.",
                '<32>{|}* Então, se você puder só- {%}'
            ],
            cookerX2: ['<25>{#p/asriel2}{#f/6}* Sai do nosso caminho.'],
            cookerX3: ["<32>{#p/basic}* Ah...!\n* Eu não acho...\n* Que eu possa realmente fazer isso..."],
            cookerX4: [
                '<32>{#p/basic}* Quer d-dizer...\n* Eu posso abrir uma exceção...',
                "<32>* Só... não conta para o chefe..."
            ],
            cookerX5a: ['<25>{#p/asriel2}{#f/2}* Oh?\n* Então você vai deixar a gente passar?'],
            cookerX5b: ['<25>{#f/1}* Bom pra você.'],
            cookerX6: ["<32>{#p/basic}* ... é!\n* É c-claro que eu vou deixá-los passar!"],
            cookerX7: ['<25>{#p/asriel2}{#f/3}* Foi uma escolha inteligente.'],
            cookerX8: ["<25>{#p/asriel2}{#f/3}* Vamos."],
            cookerX9: [
                '<32>{#p/event}* Ring, ring...',
                "<32>{#p/mettaton}* VEJO QUE VOCÊ PASSOU PELO ABISMO.",
                '<32>* ...',
                '<32>* TALVEZ...',
                '<32>* ACREDITAR EM UM FUNCIONÁRIO DE BAIXA PATENTE PARA PROTEGER O PORTAL...',
                "<32>* NÃO TENHA SIDO O MELHOR PLANO.",
                '<32>* ...',
                '<32>* POIS BEM.',
                "<32>* EU IREI TE MATAR DE TODA FORMA."
            ],
            whatthefuck: [
                "<32>{#p/basic}* Não se preocupe, eu ficarei bem!\n* Só olha para esses anéis!\n* Não posso ser demitido pra sempre..."
            ],
            puzzleReaction2a: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysSide}* Você chegou no ponto seguro!',
                '<25>{#g/alphysWelp}* Mas, uh, aquele foi apenas o p-primeiro.',
                "<25>{#g/alphysNeutralSweat}* Ainda tem mais dois."
            ],
            puzzleReaction2b: ['<32>{#p/event}* Ring, ring...', '<25>{#p/alphys}{#g/alphysWelp}* Só mais um.'],
            puzzleReaction2c: [
                '<32>{#p/event}* Ring, ring...',
                "<25>{#p/alphys}{#g/alphysHellYeah}* Ótimo!!\n* Esse era o último!!",
                '<25>{#g/alphysCutscene2}* Eheh...',
                '<25>{#f/10}* ...',
                "<25>{#f/3}* Não me julga, eu só gosto de torcer por você."
            ],
            moneyPre1: () =>
                iFancyYourVilliany()
                    ? [
                        '<32>{#p/mettaton}* AH, AÍ ESTÁ VOCÊ.',
                        '<32>{#p/mettaton}* VOCÊ TEM AGIDO MUITO BEM ATÉ O MOMENTO, QUERIDO \"$(moniker2u).\"'
                    ]
                    : world.bad_robot
                        ? [
                            "<32>{#p/mettaton}* VOCÊ ESTÁ ATRASADO, MEU AMOR...",
                            "<32>{#p/mettaton}* TALVEZ SE VOCÊ PARASSE DE MATAR AS PESSOAS, ISSO NÃO TERIA ACONTECIDO."
                        ]
                        : ['<32>{#p/mettaton}* SAUDAÇÕES, HUMANO.', "<32>* VOCÊ ESTÁ ALGUNS MOMENTOS MAIS CEDO PARA O SHOW."],
            moneyPre2: () =>
                iFancyYourVilliany()
                    ? ['<32>* ... AINDA, VOCÊ TEM O QUE É NECESSÁRIO PARA CONTINUAR EM FRENTE?']
                    : ['<32>* ... PODERIA IR ATÉ A PARTE ESQUERDA DO PALCO PARA MIM?'],
            moneyPre3: () => [
                ...(iFancyYourVilliany()
                    ? ["<32>{#p/mettaton}* BEM, AGORA VOU PRECISAR QUE VOCÊ VÁ ATÉ A PARTE ESQUERDA DO PALCO."]
                    : []),
                '<32>* VOCÊ PODE VOLTAR A TELA QUANDO EU TE CHAMAR.'
            ],
            moneyPre4: ['<32>{#p/basic}* Alguns momentos mais tarde...'],
            moneyIntro1: [
                "<32>{#p/mettaton}* AMIGOS, HOJE ESTAREMOS FAZENDO ALGO UM POUCO DIFERENTE.",
                '<32>{#z2}* SEJAM BEM-VINDOS, AO PRIMEIRO E ÚNICO...',
                '<32>{*}{#z0}* {#x1}TEMPO!{^10}\n* {#x2}VERSUS!{^10}\n* {#x3}DINHEIRO!{^30}{%}'
            ],
            moneyIntro2: ["<32>{#p/mettaton}{#z1}* VAMOS DAR UM BELO OI PARA NOSSOS QUERIDOS COMPETIDORES..."],
            moneyIntro3a: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}{#z0}* UNDYNE, CAPITÃ DA GUARDA REAL!']
                    : ['<32>{#p/mettaton}{#z0}* SANS O ESQUELETO!'],
            moneyIntro3b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/1}* Aqui estou!']
                    : world.dead_skeleton
                        ? [
                            '<25>{#p/sans}{#g/sansWink}* essa é basicamente a única coisa boa que aconteceu comigo hoje.',
                            '<25>* se você pelo menos puder chamar de \"coisa boa\".'
                        ]
                        : ['<25>{#p/sans}{#g/sansWink}* amando os aplausos pré-gravados que você colocou.'],
            moneyIntro4a: ['<32>{#p/mettaton}* NAPSTABLOOK!'],
            moneyIntro4b: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/napstablook}* você não precisa usar o mesmo aplauso toda vez..."]
                    : alphysPhoneDisplay() && SAVE.data.n.state_foundry_undyne === 1
                        ? ['<32>{#p/napstablook}* olá todo mundo...']
                        : ['<32>{#p/napstablook}* olá todo mundo...'],
            moneyIntro5a: () =>
                iFancyYourVilliany() ? ['<32>{#p/mettaton}* $(moniker1u)!'] : ['<32>{#p/mettaton}* O HUMANO ENIGMÁTICO!'],
            moneyIntro6a: ['<32>{#p/mettaton}* E... UMA CRIANÇA ALEATÓRIA!'],
            moneyIntro6b: () =>
                SAVE.data.b.f_state_kidd_betray ? ['<25>{#p/kidd}{#f/3}* E aí, galera!'] : ['<25>{#p/kidd}{#f/1}* YO!'],
            moneyIntro7: [
                '<32>{#p/mettaton}{#z0}* OBRIGADO A TODOS POR TEREM VINDO!',
                "<32>{#z2}* POR QUE VOCÊS NÃO COMPARTILHAM UM POUCO SOBRE SI MESMOS, HMM?"
            ],
            moneyIntro8: [
                '<32>{#p/mettaton}{#z0}* ...',
                '<32>{#z1}* ...',
                "<32>* MEU COMPETIDOR NÃO PARECE ESTAR APARECENDO.",
                '<32>* ...',
                '<32>* ISSO VAI SER UM PROBLEMA.',
                '<32>* ...',
                '<32>{#z2}* ALGUÉM GOSTARIA DE JOGAR NO LUGAR DELE?',
                '<32>* QUALQUER PESSOA?'
            ],
            moneyIntro9: ['<32>{#p/tem}* hOI!!\n* eu sou a temmie!!!'],
            moneyIntro10: [
                '<32>{#p/mettaton}{#z5}* UM CONVIDADO SURPRESA?!?\n* UAU, ESSE SHOW FICA MAIS LOUCO A CADA SEGUNDO!',
                '<32>{#p/mettaton}{#z2}* ELA PARECE ESTAR OLHANDO PARA A DIREÇÃO ERRADA, MAS... OKAY.'
            ],
            moneyIntro11: ['<32>{#p/mettaton}{#z1}* TIRANDO A NOVA CARA...'],
            moneyChat1: () =>
                iRespeccYourVilliany()
                    ? [
                        '<25>{#p/undyne}{#f/17}* Huh?\n* Você quer que eu fale?',
                        "<25>{#p/undyne}{#f/1}* Bem, pra ser honesta, eu te acho um pedaço de metal bem irritante.",
                        '<25>{#p/undyne}{#f/7}* Não apenas isso, mas você trata seus funcionários igual lixo!',
                        "<25>{#p/undyne}{#f/12}* Mas, uh, não é por isso que eu tomei o lugar do Papyrus.",
                        '<25>{#p/undyne}{#f/16}* Eu vim por uma razão justificável.'
                    ]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansNormal}* É.']
                        : [
                            '<25>{#p/sans}{#g/sansLaugh2}* oh, heheh...',
                            "<25>{#g/sansNormal}* eu sou sans.\n* sans o esqueleto.",
                            '<25>{#g/sansLaugh1}* tecnicamente meu trabalho é capturar humanos igual aquele alí.',
                            "<25>{#g/sansBlink}* mas, uh...\n* como nós estamos em um programa de tv...",
                            "<25>{#g/sansWink}* eu suponho que deva esperar por agora."
                        ],
            moneyChat1a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* E O QUE SERIA ISSO?"]
                    : world.dead_skeleton
                        ? ['<32>{#p/mettaton}* ALGO MAIS PARA ACRESCENTAR?']
                        : ['<32>{#p/mettaton}* TEM ALGUMA DE SUAS PIADAS RUINS PARA NÓS HOJE?'],
            moneyChat1b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/8}* Para ver o $(moniker1), é óbvio!\n* Fuhuhu!']
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansNormal}* não.']
                        : [
                            "<25>{#p/sans}{#g/sansLaugh1}* ruins?\n* uau, mettaton, o que há com os rins?",
                            "<25>{#g/sansBlink}* não brinque demais.\n* todos os apresentadores de tv são iguais.",
                            "<25>{#g/sansNormal}* mas, uh, se estamos falando de piadas, bem...\n* Isso é meio legal.",
                            '<25>{#g/sansLaugh1}* falando em piada, ouvi dizer que você tentou fazer um stand up...',
                            '<25>{|}{#g/sansLaugh2}* mas ninguém- {%}'
                        ],
            moneyChat1c: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}* CERTO.']
                    : world.dead_skeleton
                        ? ["<32>{#p/mettaton}* ALGUÉM NÃO ESTÁ MUITO NA VIBE HOJE, NÉ?"]
                        : ['<32>{#p/mettaton}* MUITO ENGRAÇADO.'],
            moneyChat2: ['<32>{#p/napstablook}* é... minha vez de falar.'],
            moneyChat2a: () =>
                iRespeccYourVilliany()
                    ? ["<25>{#p/undyne}{#f/14}* Com certeza já não é a minha."]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}{#g/sansBlink}* ...']
                        : ["<25>{#p/sans}{#g/sansBlink}* vai lá, não fique com medo."],
            moneyChat2b: () => [
                iRespeccYourVilliany()
                    ? '<32>{#p/napstablook}* oh...\n* heh......'
                    : world.dead_skeleton
                        ? "<32>{#p/napstablook}* é, não é........."
                        : '<32>{#p/napstablook}* oh.........\n* okay............',
                ...(world.scared_ghost
                    ? ["<32>* ............ eu sou napstablook."]
                    : [
                        "<32>* então, um... eu sou napstablook",
                        '<32>* eu gosto de fazer música e...',
                        '<32>* eu...',
                        '<32>* uh... eu...'
                    ])
            ],
            moneyChat2c: () =>
                world.scared_ghost ? ['<32>{#p/mettaton}{#z1}* EU...?'] : ['<32>{#p/mettaton}{#z1}* VOCÊ...?'],
            moneyChat2d: () =>
                world.scared_ghost
                    ? ["<32>{#p/napstablook}* um...... não dá só pra ir logo pra próxima pessoa"]
                    : ["<32>{#p/napstablook}* isso...\n* isso é tudo", '<32>* foi mal...............'],
            moneyChat2e: () =>
                world.scared_ghost
                    ? ['<32>{#p/mettaton}{#z0}* ... OKAY...']
                    : [
                        "<32>{#p/mettaton}{#z0}* TÁ TUDO BEM, BLOOKY...",
                        "<32>* FICAMOS NERVOSOS AS VEZES, NÃO É PRIM-",
                        '<32>{#z2}* ER... PRÍNCIPE!\n* PORQUE ESTÁ OPORTUNIDADE É ÚNICA!',
                        '<32>{#z4}* HAHAHA...'
                    ],
            moneyChat3: () =>
                world.scared_ghost
                    ? ["<32>{#p/napstablook}* é sua vez.", "<32>{#p/human}* (Mas você não tinha nada para dizer.)"]
                    : [
                        '<32>{#p/napstablook}* uh......',
                        '<32>* você pode falar agora?',
                        "<32>{#p/human}* (Mas você não tinha nada para dizer.)"
                    ],
            moneyChat3a: () =>
                iFancyYourVilliany()
                    ? [
                        '<33>{#p/mettaton}* BEM, VOCÊ SABE O QUE DIZEM...',
                        '<32>{#p/mettaton}* QUEM TANTO FALA, POUCO FAZ!',
                        "<32>{#p/mettaton}* NÃO EXISTE SURPRESA NO BULLY DOS BULLYS SER TÃO MINUCIOSO COM SUAS PALAVRAS."
                    ]
                    : ['<32>{#p/mettaton}* O \"HUMANO ENIGMÁTICO\" COM CERTEZA ESTÁ VIVENDO PELO TÍTULO.'],
            moneyChat4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? SAVE.data.b.colleg
                        ? ['<32>{#p/tem}* tem... com uma perna legal,']
                        : ['<32>{#p/tem}* tem... na TV!!']
                    : [
                        '<25>{#p/kidd}{#f/1}* Haha, eu acho que sim.',
                        ...(SAVE.data.b.f_state_kidd_betray
                            ? [
                                "<25>{#f/1}* OH!\n* É meu turno, eu acho.",
                                "<25>{#f/4}* Hoje... não foi o melhor dia...",
                                '<25>{#f/8}* Haha...',
                                "<25>{#f/5}* ... bem, eu sou a Criança Monstro."
                            ]
                            : [
                                "<25>{#f/1}* OH!\n* É minha vez, certo??",
                                "<25>{#f/4}* Eu... não tenho certeza se meus pais estão assistindo, mas...",
                                "<25>{#f/1}* Eu espero que não!!\n* Eu... acho que eles não gostariam de me ver aqui.",
                                '<25>{#f/1}* Haha.',
                                "<25>{#f/2}* De toda forma, eu sou Criança Monstro."
                            ])
                    ],
            moneyChat4a: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* E...?']
                    : ["<32>{#p/mettaton}* PERA AÍ, ESTE É SEU NOME DE VERDADE?"],
            moneyChat4b: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? SAVE.data.b.colleg
                        ? ['<32>{#p/tem}* tem sabe todos os PREÇOS!!']
                        : ['<32>{#p/tem}* tem... ama estar na TV!!']
                    : SAVE.data.b.f_state_kidd_betray
                        ? ['<25>{#p/kidd}{#f/4}* ...']
                        : ["<25>{#p/kidd}{#f/1}* Por que não seria?"],
            moneyChat4c1: ['<32>{#p/mettaton}* HMM...'],
            moneyChat5: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* BEM, ACHO QUE ISSO FINALIZA NOSSAS APRESENTAÇÕES.']
                    : ['<32>{#p/mettaton}* HEH, ACHO QUE ISSO FINALIZA NOSSAS APRESENTAÇÕES DE FORMA AGRADÁVEL.'],
            moneyTr1: [
                '<32>* PARA SIMPLIFICAR. ESTE É UM JOGO SOBRE VALORES.',
                "<32>* HOJE, NÓS TEMOS TRÊS ARTEFATOS RAROS DO PLANETA TERRA...",
                "<32>* E VOCÊ CANDIDATO DEVE DETERMINAR O PREÇO DELES!",
                '<32>* AQUELE QUE ADIVINHAR O MAIS PRÓXIMO -SEM PASSAR ACIMA DO PREÇO- LEVA O ARTEFATO!'
            ],
            moneyTr2: ["<32>{*}* VAMPS JOGAR..."],
            moneyTr3: ['<32>{*}* {#x1}TEMPO!{^10}\n* {#x2}VERSUS!{^10}\n* {#x3}DINHEIRO!{^30}{%}'],
            moneyHelper: '* Use esquerda e direita para arrumar, e [Z] para confirmar. §fill=#ff0§$(x)G',
            moneyHelperConfirmed: '* Use esquerda e direita para arrumar e aperte [Z] para confirmar. §fill=#f00§$(x)G',
            moneyItem1: {
                a: [
                    '<32>{#p/mettaton}* NOSSO PRIMEIRO ARTEFATO FOI ENCONTRADO RECENTEMENTE...',
                    '<32>* NA TERRA, ESTE DISPOSITIVO ERA USADO PARA RECEBER TRANSMISSÕES DAS CHAMADAS \"ESTAÇÕES DE RÁDIO\".',
                    "<32>* JORNAL, CLIMA, MÚSICA...\n* ATÉ MESMO O GAME SHOW QUE ESTAMOS AGORA!",
                    "<32>* VAMOS VER SE ALGUÉM AQUI SABE SEU PREÇO."
                ],
                b: [
                    "<32>{#p/mettaton}* TODO MUNDO DECIDIDO?",
                    '<32>* ESPLÊNDIDO!',
                    "<32>* AGORA, QUE O PREÇO SEJA REVELADO..."
                ],
                c: ['<32>{#p/mettaton}* 80G!'],
                d: () =>
                    SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                        ? [
                            "<32>{#p/mettaton}* PARABÉNS, TEMMIE.\n* VOCÊ GANHOU SEU PRIMEIRO E ÚNICO RÁDIO DA TERRA!",
                            '<32>{#p/tem}* uwawawawah.....'
                        ]
                        : [
                            "<32>{#p/mettaton}* PARABÉNS, BLOOKY.\n* VOCÊ GANHOU SEU PRIMEIRO E ÚNICO RÁDIO DA TERRA!",
                            world.scared_ghost ? '<32>{#p/napstablook}* legal' : '<32>{#p/napstablook}* oooooooooooooooo'
                        ],
                e: () =>
                    iFancyYourVilliany()
                        ? ["<32>{#p/mettaton}* BEM JOGADO $(moniker3u).\n* VOCÊ GANHOU O PRIMEIRO E VELHO RÁDIO DA TERRA!"]
                        : ["<32>{#p/mettaton}* PARABÉNS, HUMANO!\n* VOCÊ GANHOU SEU PRIMEIRO E ÚNICO, RÁDIO DA TERRA!"],
                f: () =>
                    SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                        ? [
                            iFancyYourVilliany()
                                ? '<32>{#p/mettaton}* TEMMIE, COMO VOCÊ ADIVINHOU ANTES DO $(moniker3u)...'
                                : '<32>{#p/mettaton}* TEMMIE, COMO VOCÊ ADIVINHOU ANTES DO HUMANO...',
                            "<32>* PARABÉNS!\n* VOCÊ GANHOU SEU PRIMEIRO E ÚNICO RÁDIO DA TERRA!",
                            '<32>{#p/tem}* uwawawawah.....'
                        ]
                        : [
                            iFancyYourVilliany()
                                ? '<32>{#p/mettaton}* BLOOKY, COMO VOCÊ ADIVINHOU ANTES DO $(moniker3u)...'
                                : '<32>{#p/mettaton}* BLOOKY, COMO VOCÊ ADIVINHOU ANTES DO HUMANO...',
                            "<32>* PARABÉNS!\n* VOCÊ GANHOU SEU PRIMEIRO E ÚNICO RÁDIO DA TERRA!",
                            world.scared_ghost ? '<32>{#p/napstablook}* legal' : '<32>{#p/napstablook}* oooooooooooooooo'
                        ],
                g: () => [
                    SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg
                        ? iFancyYourVilliany()
                            ? '<32>{#p/mettaton}* BEM JOGADO, $(moniker3u).\n* COMO VOCÊ ADIVINHOU ANTES DA TEMMIE...'
                            : '<32>{#p/mettaton}* HUMANO, COMO VOCÊ ADIVINHOU ANTES DA TEMMIE...'
                        : iFancyYourVilliany()
                            ? '<32>{#p/mettaton}* BEM JOGADO, $(moniker3u).\n* COMO VOCÊ ADIVINHOU ANTES DO BLOOKY...'
                            : '<32>{#p/mettaton}* HUMANO, COMO VOCÊ ADIVINHOU ANTES DO BLOOKY...',
                    "<32>* PARABÉNS!\n* VOCÊ GANHOU SEU PRIMEIRO E ÚNICO RÁDIO DA TERRA!"
                ]
            },
            moneyVote1: () => [
                '<32>{#p/mettaton}* BEM, COMPETIDORES, ISSO CONCLUI ESTA RODADA.',
                "<32>* COMO ESTÁ É A PRIMEIRA RODADA, VOCÊ PODERÁ VOTAR NAQUELE QUE PENSA QUE DEVE SER ELIMINADO.",
                ...(world.scared_ghost
                    ? []
                    : [
                        '<32>{#p/napstablook}* hey, um.........\n* eu tenho uma pergunta.........',
                        "<32>{#p/mettaton}* NÃO, BLOOKY, VOCÊ NÃO PODE VOTAR EM SI MESMO.",
                        '<32>{#p/napstablook}* oh............'
                    ]),
                iRespeccYourVilliany()
                    ? "<32>{#p/mettaton}* É HORA DE ELIMINAR, PESSOAL!\n* UNDYNE, VOCÊ VAI PRIMEIRO."
                    : "<32>{#p/mettaton}* É HORA DE ELIMINAR, PESSOAL!\n* SANS VOCÊ VAI PRIMEIRO!",
                "<32>{#p/mettaton}* QUEM SERÁ?"
            ],
            moneyVote2: () =>
                iRespeccYourVilliany()
                    ? [
                        "<25>{#p/undyne}{#f/14}* É... eu vou votar no Napstablook.",
                        "<26>{#p/undyne}{#f/16}* Nada pessoal.\n* Eu só conheço melhor os outros competidores."
                    ]
                    : world.dead_skeleton
                        ? ['<25>{#p/sans}* ...', "<25>{#p/sans}{#g/sansBlink}* eh, eu não estou muito no clima."]
                        : ['<25>{#p/sans}* ana.'],
            moneyVote2a: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/mettaton}* E VOCÊ, BLOOKY?']
                    : world.dead_skeleton
                        ? ["<32>{#p/mettaton}* BEM, ISSO É UM VOTO FORA.", '<32>{#p/mettaton}* E VOCÊ, BLOOKY?']
                        : [
                            '<32>{#p/mettaton}* HMM...',
                            '<32>* POR QUE \"ANA\"?',
                            "<25>{#p/sans}{#g/sansLaugh1}* anaconda.",
                            "<32>{#p/mettaton}* VOCÊ ESTÁ DESQUALIFICADO!",
                            '<25>{#p/sans}{#g/sansLaugh2}* heheheh, valeu a pena.',
                            '<32>{#p/mettaton}* UGH... QUE TAL VOCÊ, BLOOKY?'
                        ],
            moneyVote3a: () =>
                iRespeccYourVilliany()
                    ? [
                        '<32>{#p/napstablook}* ...............',
                        "<32>* eu... não quero votar em ninguém...",
                        "<32>* Undyne, a capitã da guarda real e os outros dois...",
                        "<32>* aqueles são só crianças..."
                    ]
                    : [
                        '<32>{#p/napstablook}* ...............',
                        '<32>* s... sans, eu acho...',
                        "<32>* eu não tenho nada contra ti, eu só... não te conheço... desculpa...",
                        ...(world.dead_skeleton
                            ? ['<25>{#p/sans}{#g/sansNormal}* ...', "<25>{#p/sans}{#g/sansBlink}* tá tudo bem."]
                            : [
                                "<25>{#p/sans}{#g/sansBlink}* nah, tá tudo bem.\n* Aliás, eu só estou aqui porque meu irmão recusou.",
                                '<25>{#g/sansWink}* ele fica nervoso perto do, Mettaton.'
                            ])
                    ],
            moneyVote3b: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* BEM, TUDO CERTO.\n* NÃO CONTAREMOS SEU VOTO ENTÃO."]
                    : world.dead_skeleton
                        ? []
                        : ["<32>{#p/mettaton}* HMM...\n* EU VOU PERGUNTAR SOBRE ISSO PRA ELE MAIS TARDE.", '<32>* EU ME PERGUNTO...'],
            moneyVote3x: () =>
                world.scared_ghost
                    ? ['<32>{#p/napstablook}* O humano.']
                    : [
                        '<32>{#p/napstablook}* ...............',
                        '<32>* o humano, eu acho',
                        "<32>* ele só... não parece muito ligar pra mim..."
                    ],
            moneyVote3y: ['<32>{#p/mettaton}* ...'],
            moneyVote4p: () => [
                iFancyYourVilliany()
                    ? '<32>{#p/mettaton}* VOCÊ ESTARÁ VOTANDO PARA ALGUÉM, QUERIDO $(moniker2u)?'
                    : '<32>{#p/mettaton}* VOCÊ VOTARÁ EM ALGUÉM, HUMANO?',
                choicer.create('* (O que você diz?)', 'Sim', 'Não')
            ],
            moneyVote4: () => [
                '<32>{#p/mettaton}* NÃO, EU QUERO DIZER, EM -QUEM- VOCÊ VAI VOTAR?',
                choicer.create(
                    '* (Em quem você vai votar?)',
                    iRespeccYourVilliany() ? 'Undyne' : 'Sans',
                    'Napstablook',
                    SAVE.data.n.state_foundry_muffet === 1 ? 'Temmie' : 'Monster Kid',
                    frontEnder.name.value_true
                )
            ],
            moneyVote4a1: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* MHM, MHM...', '<32>{#p/mettaton}* E TEMMIE, EM QUEM VOCÊ VOTA?']
                    : ['<32>{#p/mettaton}* MHM, MHM...', '<32>{#p/mettaton}* E CRIANÇA MONSTRO, EM QUEM VOCÊ VOTA?'],
            moneyVote4a2: ["<32>{#p/mettaton}* VOCÊ NÃO VOTARÁ EM NINGUÉM, ENTÃO.", '<32>* ENTENDI.'],
            moneyVote4a3: () => [
                "<32>{#p/mettaton}* SÉRIO? SÓ PORQUE ELE ESTÁ PRESO A VOCÊ NÃO O TORNA UM COMPETIDOR.",
                '<33>* CONSIDERE-SE DESQUALIFICADO!',
                ...(SAVE.data.b.oops
                    ? []
                    : [
                        '<32>{#p/basic}* nossa, valeu Mettaton.',
                        "<32>{#p/mettaton}* ESCUTA AQUI, AMOR.\n* É DIFÍCIL TE INCLUIR QUANDO VOCÊ É INVISÍVEL.",
                        '<32>{#p/basic}* Hmph.'
                    ])
            ],
            moneyVote4a4: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/mettaton}* ... TEMMIE, SEU VOTO?']
                    : ['<32>{#p/mettaton}* ... CRIANÇA MONSTRO, SEU VOTO?'],
            moneyVote5a: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? ['<32>{#p/tem}* tem vota... ne FASTAMIO!', '<32>* tem vive perto de fantasmio... ama fantasmio!']
                    : [
                        iFancyYourVilliany()
                            ? "<25>{#p/kidd}{#f/1}* Eu voto no $(moniker1) porque ele é INCRÍVEL."
                            : "<25>{#p/kidd}{#f/1}* Eu voto no humano, porque ele é INCRÍVEL!",
                        '<25>{#f/7}* Ele não apenas lutou contra a Undyne...',
                        "<25>* ... que é um dos monstros mais fortes de TODOS...",
                        '<25>* Assim como quando eu estava prestes a MORRER...',
                        '<25>* ... ele foi e me salvou no último segundo!',
                        '<25>{#f/2}* NA FRENTE DA UNDYNE!!!',
                        ...(iRespeccYourVilliany()
                            ? [
                                "<25>{#p/undyne}{#f/14}* Uh, criança, eu tô bem aqui, beleza?",
                                '<25>{#p/kidd}{#f/3}* ah, certo.\n* Uh, d-desculpa Undyne!\n* Haha.',
                                "<25>{#p/undyne}{#f/1}* Nah, fica tranquilo.\n* Você é uma boa criança...",
                                '<25>{#p/kidd}{#f/3}* Aw... valeu, Undyne.\n* Mas $(moniker1) é bem mais legal que eu.'
                            ]
                            : ['<25>{#f/3}* Eu... meio que devo a ele minha vida...'])
                    ],
            moneyVote5b: ['<32>{#p/mettaton}* VOCÊ ENTENDE QUE VOTAR PARA ELE É BASICAMENTE ELIMINÁ-LO, CORRETO?'],
            moneyVote5c: () =>
                SAVE.data.n.state_foundry_muffet === 1
                    ? [
                        '<32>{#p/tem}* pera...',
                        '<32>{#p/tem}* ... nau!!!\n* tem não quer elimine do fantasmio!',
                        '<32>{#p/tem}* tem vota no esquelinho!'
                    ]
                    : iRespeccYourVilliany()
                        ? [
                            '<25>{#p/kidd}{#f/4}* ... sério?',
                            '<25>{#p/undyne}{#f/3}* Eu já ia dizer a mesma coisa.',
                            "<25>{#p/kidd}{#f/1}* ah... então eu não vou votar nele, por motivo ÓBVIO, e...",
                            "<25>{#f/2}* Votar na Undyne... eu não consigo!",
                            "<25>{#f/3}* Então... eu voto no Napstablook.\n* Por favor, não fique triste..."
                        ]
                        : [
                            '<25>{#p/kidd}{#f/4}* ... sério?',
                            "<25>{#f/1}* Hmm... então eu não voto nele, por motivo ÓBVIO, e...",
                            '<25>{#f/4}* Votar no Napstablook pode deixá-lo triste...',
                            "<25>{#f/3}* Então... vou ter que votar no Sans."
                        ],
            moneyVote5x: ['<32>{#p/kidd}{#f/8}* ...', '<32>{#f/8}* O humano.'],
            moneyVote5x1: ["<32>{#p/mettaton}* NOSSA, ALGUÉM NÃO ESTÁ FELIZ HOJE."],
            moneyVote5x2a: ['<32>{#p/mettaton}* MAS MESMO COM SEU VOTO, SANS AINDA ESTÁ NA PERDA AQUI.'],
            moneyPun1: () =>
                world.dead_skeleton
                    ? ['<25>{#p/sans}* ...', '<25>{#p/sans}{#f/3}* eu só vou me retirar logo.']
                    : ['<25>{#p/sans}* epa.', "<25>{#p/sans}{#g/sansWink}* estou {@fill=#ff0}desqualiossado{@fill=#fff}."],
            moneyPun1a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/napstablook}* tudo bem....................."]
                    : world.dead_skeleton
                        ? ['<32>{#p/mettaton}* É, VOCÊ POSSIVELMENTE ESTÁ.']
                        : ['<32>{#p/mettaton}* É, VOCÊ BASICAMENTE ESTÁ.'],
            moneyPun1b: ["<32>{#p/mettaton}* UAU, É COMO SE VOCÊ SOUBESSE O QUÃO IRRITANTE É."],
            moneyVote5x2b: ['<32>{#p/human}* (Você sente seus pecados rastejando em suas costas.)'],
            moneyVote6a: () =>
                iRespeccYourVilliany()
                    ? ["<32>{#p/mettaton}* SINTO MUITO, BLOOKY.\n* MAS SUA HORA CHEGOU.\n* ATÉ MAIS."]
                    : ["<32>{#p/mettaton}* ME DESCULPE, SANS.\n* MAS SUA HORA CHEGOU.\n* ATÉ MAIS."],
            moneyVote6b: () => (iRespeccYourVilliany() ? [] : ['<25>{#p/sans}* too-da-loo, cabas!']),
            moneyVote7: [
                '<32>{#p/mettaton}* BEM, PARECE QUE TEMOS UM EMPATE.',
                '<32>* NESTA SITUAÇÃO, O APRESENTADOR DECIDE QUEM SAI.',
                '<32>* ... AH ESPERA.',
                "<32>* EU SOU O APRESENTADOR!"
            ],
            moneyVote8: ["<32>{#p/mettaton}* DESCULPE, HUMANO.\n* MAS SEU TEMPO ACABOU.\n* TCHAUZINHO."],
            moneyItem2: {
                a: [
                    '<32>{#p/mettaton}* NOSSO PRÓXIMO ITEM É, COMO UM PROFESSOR NOTURNO DIRIA, BEM TÉCNICO.',
                    '<32>* OU SERIA...\n* PIROTÉCNICO?',
                    '<32>* ESTES \"FOGOS DE ARTIFÍCIO\" ERAM LANÇADOS PELA TERRA ATÉ EXPLODIR EM PEDAÇOS NO ESPAÇO.',
                    '<32>* DE TODA COR E FORMATO, EXPLODINDO COM INDESCRITÍVEL BELEZA.',
                    "<32>* O QUE VOCÊS ACHAM QUE ELE VALE?"
                ],
                b: ['<32>{#p/mettaton}* OS COMPETIDORES ESTÃO DECIDIDOS...?', "<32>* ÓTIMO.\n* AGORA, VEJAMOS O PREÇO..."],
                c: ['<32>{#p/mettaton}* UAU, 250G!', "<32>{#p/mettaton}* QUEM PODERIA IMAGINAR!?"],
                d: () =>
                    SAVE.data.n.state_foundry_muffet === 1
                        ? [
                            "<32>{#p/mettaton}* PARABÉNS, TEMMIE!\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!",
                            "<32>* PODEM NÃO SER EXATAMENTE DA MTT, MAS SÃO DA MELHOR QUALIDADE! (TM)",
                            '<32>{#p/tem}* AYAYA!'
                        ]
                        : [
                            "<32>{#p/mettaton}* PARABÉNS, CRIANÇA MONSTRO!\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!",
                            "<32>* PODEM NÃO SER EXATAMENTE DA MTT, MAS SÃO DA MELHOR QUALIDADE! (TM)",
                            '<25>{#p/kidd}{#f/1}* YOOOOOO!!!'
                        ],
                e: () => [
                    iFancyYourVilliany()
                        ? "<32>{#p/mettaton}* BEM JOGADO $(moniker3u).\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!"
                        : "<32>{#p/mettaton}* PARABÉNS, HUMANO!\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!",
                    "<32>* PODEM NÃO SER EXATAMENTE DA MTT, MAS SÃO DA MELHOR QUALIDADE! (TM)"
                ],
                f: () => [
                    iFancyYourVilliany()
                        ? '<32>{#p/mettaton}* COMO VOCÊ ADIVINHOU ANTES DO $(moniker3u)...'
                        : '<32>{#p/mettaton}* COMO VOCÊ ADIVINHOU ANTES DO HUMANO...',
                    ...(SAVE.data.n.state_foundry_muffet === 1
                        ? [
                            "<32>{#p/mettaton}* PARABÉNS, TEMMIE!\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!",
                            "<32>* PODEM NÃO SER EXATAMENTE DA MTT, MAS SÃO DA MELHOR QUALIDADE! (TM)",
                            '<32>{#p/tem}* AYAYA!'
                        ]
                        : [
                            "<32>{#p/mettaton}* PARABÉNS, CRIANÇA MONSTRO!\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!",
                            "<32>* PODEM NÃO SER EXATAMENTE DA MTT, MAS SÃO DA MELHOR QUALIDADE! (TM)",
                            '<25>{#p/kidd}{#f/1}* YOOOOOO!!!'
                        ])
                ],
                g: () => [
                    SAVE.data.n.state_foundry_muffet === 1
                        ? '<32>{#p/mettaton}* COMO VOCÊ ADIVINHOU ANTES DA TEMMIE.'
                        : '<32>{#p/mettaton}* COMO VOCÊ ADIVINHOU ANTES DA CRIANÇA MONSTRO...',
                    iFancyYourVilliany()
                        ? "<32>* BEM JOGADO, $(moniker3u).\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT."
                        : "<32>{#p/mettaton}* PARABÉNS, HUMANO!\n* VOCÊ GANHOU PARA SI NOVOS FOGOS DE ARTIFÍCIO DA MARCA MTT!",
                    "<32>* PODEM NÃO SER EXATAMENTE DA MTT, MAS SÃO DA MELHOR QUALIDADE! (TM)"
                ]
            },
            moneyFinal0a: () => [
                '<32>{#p/mettaton}* AGORA, COMO ESTE É O FIM DO SEGUNDO TURNO...',
                "<32>* NÃO HAVERÁ VOTAÇÃO.",
                "<32>* EU SÓ VOU TIRAR QUEM EU SENTIR VONTADE!\n* MEU SHOW, MINHAS REGRAS...",
                ...(iRespeccYourVilliany()
                    ? ["<32>* ME DESCULPE, UNDYNE.\n* MAS SUA HORA CHEGOU.\n* ATÉ MAIS."]
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? ["<32>* ME DESCULPE, TEMMIE.\n* MAS SUA HORA CHEGOU.\n* ATÉ MAIS."]
                        : ["<32>* ME DESCULPE, CRIANÇA MONSTRO.\n* MAS SUA HORA CHEGOU.\n* ATÉ MAIS."])
            ],
            moneyFinal0b: () =>
                iRespeccYourVilliany()
                    ? ['<25>{#p/undyne}{#f/14}* ... sério?']
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? SAVE.data.b.colleg
                            ? [
                                '<32>{#p/tem}* Você só tá me tirando pois sabe que eu iria ganhar.',
                                '<32>* MAS BELEZA!!',
                                '<32>* Dêem uma olhada no Shop da TEMMIE!'
                            ]
                            : ['<32>{#p/tem}* nu...', '<32>* tem ficará bem...', '<32>* Dêem uma olhada no Shop da TEMMIE!']
                        : SAVE.data.b.f_state_kidd_betray
                            ? ['<25>{#p/kidd}{#f/3}* Te vejo depois, caras...']
                            : [
                                '<25>{#p/kidd}{#f/3}* Aw mano...',
                                '<25>{#f/1}* Bem, obrigado por me deixar estar no show, Metatron.',
                                '<25>{#f/1}* Meus amigos vão ficar em choque quando eu contar sobre isso!!!'
                            ],
            moneyFinal0c: ['<32>{#p/mettaton}* SÉRIO.\n* AGORA SAI DO MEU PROGRAMA.'],
            moneyFinal0d: [
                '<25>{#p/undyne}{#f/8}* PFFT!\n* QUE PROGRAMA DE MERDA!',
                '<25>{#f/1}* Sabe, esse humano pode ser malvado, mas ele joga justo.',
                '<25>{#f/5}* Já VOCÊ?',
                '<25>{#f/7}* Você só vai fazendo regras enquanto joga!',
                "<25>{#f/9}* ... acho que eu não deveria ter esperado mais nada, no entanto.",
                "<25>{#f/11}* Você tem uma reputação com esse tipo de parada."
            ],
            moneyFinal1: () => [
                iRespeccYourVilliany()
                    ? '<32>{#p/mettaton}* BOA VIAGEM.'
                    : SAVE.data.n.state_foundry_muffet === 1
                        ? SAVE.data.b.colleg
                            ? "<32>{#p/mettaton}* ... AVE, PELO MENOS ELA SE FOI."
                            : "<32>{#p/mettaton}* PELO MENOS... ELA ESTÁ FELIZ?"
                        : SAVE.data.b.f_state_kidd_betray
                            ? "<32>{#p/mettaton}* PELO MENOS ELE ESTÁ... FELIZ?\n* NÃO POSSO DIZER COM CERTEZA."
                            : '<32>{#p/mettaton}* PELO MENOS ELE ESTÁ FELIZ.\n* E PARA CONSTAR, É \"METTATON\", NÃO \"METATRON.\"',
                "<32>* ALAS... COM OS ÚLTIMOS DOS COMPETIDORES RESTANTES, HORA DA RODADA FINAL.",
                "<32>* O ITEM FINAL APRESENTADO É MAIS INCRÍVEL QUE QUALQUER OUTRO.",
                '<32>* DAMAS E CAVALHEDAMAS...\n* PREPAREM OS OLHOS...',
                '<32>{#z3}* ... PARA ESTA ABSOLUTAMENTE MARAVILHOSA BONECA MEW MEW TAMANHO REAL!'
            ],
            moneyFinal2: () =>
                iRespeccYourVilliany()
                    ? ['<32>{#p/kidd}{#f/14}* Woah...']
                    : world.scared_ghost
                        ? ['<32>{#p/napstablook}* .........']
                        : ['<32>{#p/napstablook}* oh meu............'],
            moneyFinal3: ['<32>{#p/mettaton}* HAHAHA, IMPRESSIONADO?', '<32>{#p/mettaton}{#z2}* FOI ENCONTRADO NO...'],
            moneyFinal4: () => [
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        '<32>{#p/event}* Ring, ring...',
                        "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* M-mettaton, por favor!\n* Meu dia já foi suficientemente ruim!",
                        '<32>{#p/mettaton}* ...',
                        "<32>* BEM, QUE PENINHA, ENTÃO!\n* JÁ QUE, COMO VOCÊ PODE VER..."
                    ]
                    : [
                        '<32>{#p/event}* Ring, ring...',
                        "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* Ei! Você não pode dar isso... eu sou a dona!",
                        '<32>{#p/mettaton}* AH, VOCÊ É?',
                        "<32>* ME DESCULPA.\n* EU NÃO SABIA.\n* MAS...",
                        '<25>{#p/alphys}{#g/alphysWTF2}* MAS???',
                        "<32>{#p/mettaton}* TENHA MEDO DE QUE JÁ SEJA TARDE, DR. ALPHYS..."
                    ]),
                '<32>{#z3}* OS COMPETIDORES JÁ ESTÃO A FLOR DA PELE.',
                '<25>{#p/alphys}{#g/alphysWTF}{#z0}* Você tá falando sério?',
                '<25>{|}{#p/alphys}{#g/alphysCutscene3}* Eu passei meses procurando por- {%}'
            ],
            moneyFinal5: [
                '<32>{#p/mettaton}* OH NÃO.\n* PAREVE QUE A CONEXÃO CAIU.',
                '<32>* POBRE DR. ALPHYS.\n* SEM MEW MEW PRA ELA.',
                '<32>{#z2}* AO INVÉS DISSO, UM DE VOCÊS VAI FICAR COM ELA!',
                '<32>{#z3}* MAS QUEM?'
            ],
            moneyFinal6: [
                '<32>{#p/mettaton}* HAHAHA, IMPRESSIONADO?',
                '<32>{#p/mettaton}{#z2}* FOI ENCONTRADA EM UM CONTÊINER ABANDONADO, QUE CAIU DAS ESTRELAS...',
                '<32>* O TIME DE BUSCA PASSOU MESES PROCURANDO POR ISSO, DEPOIS DO PRIMEIRO TRAÇO DE DETECÇÃO...',
                '<32>* E É UMA RARIDADE...\n* BEM...',
                '<32>* ISSO FALA POR SI SÓ.',
                '<32>{#z3}* MAS QUEM, MEU QUERIDO ESPECTADOR, VAI FICAR COM ISSO?'
            ],
            moneyItem3: {
                a: [
                    "<32>{#z0}* COMO ESTA É A RODADA FINAL, NÃO TERÁ UM TEMPO LIMITE.",
                    "<32>{#z0}* VAMOS FAZER ISSO UMA ÚLTIMA VEZ!"
                ],
                b: [
                    '<32>{#p/mettaton}* É ISSO...',
                    '<32>{#p/mettaton}{#z3}* QUEM GANHARÁ O GRANDE PRÊMIO?',
                    '<32>{#p/mettaton}{#z0}* E.\n* O PREÇO.\n* É...'
                ],
                c: ['<32>{#p/mettaton}{#z5}* ... 999G!!!'],
                d: () =>
                    iRespeccYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* CRIANÇA MONSTRO!',
                            '<32>* É MINHA HONRA TE ENTREGAR ESTE GRANDE PRÊMIO.',
                            '<25>{#p/kidd}{#f/4}* H... huh?',
                            '<25>{#f/7}* ...',
                            '<25>{#f/14}* YOOOOOOOOOOO!!!!'
                        ]
                        : ['<32>{#p/mettaton}{#z0}* BLOOKY!', '<32>* É MINHA HONRA TE ENTREGAR ESTE GRANDE PRÊMIO.'],
                e: () =>
                    iFancyYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* PARABÉNS, $(moniker3u).',
                            '<32>{#p/mettaton}* É MINHA HONRA TE ENTREGAR ESTE PRÊMIO.'
                        ]
                        : ['<32>{#p/mettaton}{#z0}* HUMANO!', '<32>* É MINHA HONRA TE ENTREGAR ESTE GRANDE PRÊMIO.'],
                f: () =>
                    iRespeccYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* CRIANÇA MONSTRO!',
                            "<32>* SUA RESPOSTA FOI A MESMA DO $(moniker3u), MAS VOCÊ ADIVINHOU PRIMEIRO.",
                            '<32>* DESSA FORMA, É MINHA HONRA ENTREGAR ESTE PRÊMIO PARA VOCÊ.',
                            '<25>{#p/kidd}{#f/4}* H... huh?',
                            '<25>{#f/7}* ...',
                            '<25>{#f/14}* YOOOOOOOOOOO!!!!'
                        ]
                        : [
                            '<32>{#p/mettaton}{#z0}* BLOOKY!',
                            iFancyYourVilliany()
                                ? "<32>* SUA RESPOSTA FOI A MESMA DO $(moniker3u), MAS VOCÊ ADIVINHOU PRIMEIRO."
                                : "<32>* SUA RESPOSTA FOI A MESMA DO HUMANO, MAS VOCÊ DECIDIU PRIMEIRO.",
                            '<32>* DESSA FORMA, É MINHA HONRA ENTREGAR ESTE PRÊMIO PARA VOCÊ.'
                        ],
                g: () =>
                    iRespeccYourVilliany()
                        ? [
                            '<32>{#p/mettaton}{#z0}* PARABÉNS, $(moniker3u).',
                            "<32>* SUA RESPOSTA PODE TER SIDO A MESMA DA CRIANÇA MONSTRO, MAS VOCÊ ADIVINHOU PRIMEIRO.",
                            '<32>* DESSA FORMA, É MINHA HONRA ENTREGAR ESTE PRÊMIO PARA VOCÊ.'
                        ]
                        : [
                            iFancyYourVilliany()
                                ? '<32>{#p/mettaton}{#z0}* PARABÉNS, $(moniker3u).'
                                : '<32>{#p/mettaton}{#z0}* HUMANO!',
                            "<32>* SUA RESPOSTA PODE TER SIDO A MESMA DO BLOOKY, MAS VOCÊ ADIVINHOU PRIMEIRO.",
                            '<32>* DESSA FORMA, É MINHA HONRA ENTREGAR ESTE PRÊMIO PARA VOCÊ.'
                        ]
            },
            moneyTrash1: ['<32>* ESPERA, BLOOKY, ONDE VOCÊ...', '<32>* ... ESTÁ INDO...', '<32>{#z1}* ...'],
            moneyTrash2: ["<32>{#z0}* EU ACHO QUE ELE NÃO DESEJAVA ESTAR AQUI POR MAIS TEMPO."],
            moneyItemPut1: ['<32>{#p/human}* (você pegou o Velho Rádio.)'],
            moneyItemPut2: ['<33>{#p/human}* (Você pegou os Fogos de Artifício.)'],
            moneyItemPut3: ['<32>{#p/human}* (Você pegou a Boneca Mew Mew.)'],
            moneyItemPut4: [
                "<32>{#p/human}* (Você está carregando muito.)",
                '<32>{#p/mettaton}* MUITA COISA PRA LEVAR, HUH?',
                '<32>{#p/mettaton}* BEM, NÃO TEMA.\n* SEUS PRÊMIOS ESTARÃO DISPONÍVEIS NO REC CENTER.'
            ],
            moneyOutro1: [
                "<32>{#p/mettaton}* QUERIDOS ESPECTADORES, SE VOCÊ GOSTA DE GANHAR PRÊMIOS NA TV IGUAL A ESSES...",
                "<32>* ENTÃO NÃO HESITE EM NOS CONTATAR-ME VIA OUTERNET!",
                "<32>* NO MAIS, ISSO É TUDO...",
                '<32>* ESTEJA PRONTO PARA O PRÓXIMO EPISÓDIO, CHAMADO \"A DANÇA DO DESTINO!\"',
                '<32>{#z3}* E, É CLARO, FIQUE FABULOSA!'
            ],
            moneyWhisper1: () => [
                '<32>{#p/napstablook}* (psst... ei...)',
                '<32>* (eu, um...)',
                ...(SAVE.data.b.f_state_blookbetray
                    ? ["<32>* (eu, você sabe... provavelmente desejava não estar aqui, mas...)"]
                    : SAVE.data.n.state_wastelands_napstablook === 2
                        ? ["<32>* (eu sei que você... provavelmente não gosta de mim, mas...)"]
                        : SAVE.data.n.state_wastelands_napstablook === 4
                            ? ["<32>* (eu sei que nós... não estão nos melhores termos, mas ...)"]
                            : SAVE.data.n.state_foundry_blookdate > 1
                                ? ["<32>* (espero que não seja pedir muito, mesmo que sejamos amigos, mas...)"]
                                : ["<32>* (espero que não seja pedir muito, mas...)"]),
                '<32>* (eu acho que... depois do show...)',
                '<32>* (nós deveríamos retornar a boneca mew mew para a alphys.)',
                ...(SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        "<32>* (ela tem se sentido meio para baixo hoje e...)",
                        "<32>* (bem... seria legal devolver isso para ela, você não acha?)"
                    ]
                    : [
                        '<32>* (eu assisti mew mew aventura no espaço com ela uma vez...)',
                        '<32>* (ela estava... tão feliz.....)'
                    ]),
                choicer.create('* (O que você diz?)', 'Sim', 'Não')
            ],
            moneyWhisper2a: ['<32>{#p/napstablook}* (obrigado...)'],
            moneyWhisper2b: ['<32>{#p/napstablook}* (..................)'],
            moneyWhisper3: ["<32>{#p/mettaton}* O QUE HÁ COM A DEMORA?"],
            moneyWhisper4: [
                '<32>{#p/napstablook}* (eu acho... que deveríamos decidir agora...)',
                '<32>{#p/napstablook}* (heh)'
            ],
            napchat0: ['<32>{#p/human}* (você entrega a Boneca Mew Mew para o Napstablook.)'],
            napchat1: () =>
                SAVE.data.n.state_foundry_undyne === 1
                    ? ["<32>{#p/napstablook}* eu vou garantir que ela saiba o que você fez por ela..."]
                    : ["<32>{#p/napstablook}* vou devolver isso para ela assim que eu conseguir"],
            napchat2a: ['<32>{#p/napstablook}* até a próxima..........'],
            napchat2b: [
                "<32>* tem... outra coisa que eu gostaria de conversar com você...",
                '<32>* me encontre lá em cima, na grande fonte do mettaton.',
                '<32>* te vejo lá............'
            ],
            truemtt3: [
                '<32>{#p/basic}* Blooky...',
                '<32>* ...',
                '<32>* Eu tenho a sensação de que as coisas vão ficar sérias agora.'
            ],
            moneyX1: [
                '<32>{#p/event}* Ring, ring...',
                '<32>{#p/mettaton}* O QUERIDO, ISSO É...\n* O QUE PARECE QUE É?',
                "<32>* AH, EU ACREDITO QUE SEJA...",
                '<32>* UMA ARMADILHA!',
                '<32>* E CLARO...'
            ],
            moneyX2a: [
                "<32>* VOCÊ ESTÁ NA TV AO VIVO DE NOVO!",
                '<32>* COMO VOCÊS DOIS VÃO ESCAPAR DA SALA DESSA VEZ?',
                '<32>* HAHAHA...'
            ],
            moneyX2b: ['<32>* APENAS O -TEMPO- DIRÁ...{%200}'],
            moneyX3: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/10}* Hmm...{%100}',
                        '<25>* O controle do console tá lá na plataforma...{%100}',
                        '<25>{#f/16}* ...{%100}',
                        '<25>{#f/13}* Isso vai ser um pouco embaraçoso, mas...{%100} ',
                        '<25>{#f/13}* Se eu me ajoelhar em frente a plataforma...{%100}',
                        '<25>{#f/16}* Você pode... talvez subir em mim para chegar lá e cancelar o cronômetro. {%100}',
                        '<25>{#f/15}* Espero que funcione...{%100}'
                    ],
                    ['<25>{#p/asriel2}{#f/13}* ...{%100}', '<25>{#f/4}* Você sabe o que temos que fazer, $(name).{%100}']
                ][Math.min(SAVE.flag.n.ga_asrielMoneyX3++, 1)],
            moneyT1: (i: number) =>
                [
                    ['<25>{#p/asriel2}{#f/15}* Nós vamos...\n* ... fazer?{%200}'],
                    ["<25>{#p/asriel2}{#f/16}* ... nós não temos tempo para isso.{%200}"],
                    ['<25>{#p/asriel2}{#f/15}* Não de novo.{%200}'],
                    []
                ][Math.min(i, 3)],
            moneyT2: (i: number) =>
                [
                    ['<25>{#p/asriel2}{#f/16}* Ou vamos só ficar parados aqui.{%200}'],
                    ["<25>{#p/asriel2}{#f/13}* $(name), por favor...\n* Não faz isso de novo...{%200}"],
                    []
                ][Math.min(i, 2)],
            moneyT3: (i: number) =>
                [
                    ['<25>{#p/asriel2}{#f/13}* Eu acho que sim.{%200}'],
                    ['<25>{#p/asriel2}{#f/3}* ...\n* Isso é tão idiota.{%200}'],
                    []
                ][Math.min(i, 2)],
            moneyT4: (i: number) =>
                [
                    [
                        "<25>{#p/asriel2}{#f/5}* Então, como tá indo seu dia, huh?{%200}",
                        '<25>{#p/asriel2}{#f/13}* Bem do bom?\n* ...{%200}'
                    ],
                    []
                ][Math.min(i, 1)],
            moneyT5: (i: number) =>
                [["<25>{#p/asriel2}{#f/4}* Eu acho incrível sua capacidade de só ficar aí sem fazer nada.{%200}"], []][
                Math.min(i, 1)
                ],
            moneyT6: (i: number) => [['<25>{#p/asriel2}{#f/3}* ...\n* $(name)?{%200}'], []][Math.min(i, 1)],
            moneyT7: (i: number) => [['<25>{#p/asriel2}{#f/13}* $(name).{%200}'], []][Math.min(i, 1)],
            moneyT8: (i: number) =>
                [["<25>{#p/asriel2}{#f/7}* Nós estaríamos fora do Outpost com esse tempo todo.{%200}"], []][Math.min(i, 1)],
            moneyT9: (i: number) =>
                [['<25>{#p/asriel2}{#f/6}* ...\n* Por favor.{%200}'], ['<25>{#p/asriel2}{#f/15}* Quase lá...']][
                Math.min(i, 1)
                ],
            moneyX4: () =>
                [['<25>{#p/asriel2}{#f/13}* Uh... pronto.{%200}'], ['<25>{#p/asriel2}{#f/13}* Vamos lá...{%200}']][
                Math.min(SAVE.flag.n.ga_asrielMoneyX4++, 1)
                ],
            moneyX4a: ['<25>{#p/asriel2}{#f/1}* Aí.'],
            moneyX4b: ['<25>{#p/asriel2}{#f/6}* ...', '<25>{#p/asriel2}{#f/7}* Esperamos isso tudo pra nada?'],
            moneyX5a: [
                '<32>{#p/event}* Ring, ring...',
                '<32>{#p/mettaton}* MEUS SENSORES ESTÃO DETECTANDO?', 
                "<32>* QUERIDOS ESPECTADORES, NÓS DEVEMOS MUDAR O RATING DESTE SHOW...",
                '<32>* DE \"VERGONHOSO\" PARA \"ULTRA VERGONHOSO\" É CLARO!',
                "<32>* NÃO POSSO DIZER QUE MUITOS NO SEU LUGAR ESTARIAM DISPOSTOS A SE HUMILHAR DESTA FORMA."
            ],
            moneyX5b: [
                '<32>{#p/event}* Ring, ring...',
                '<32>{#p/mettaton}* BEM, ISSO FOI...',
                "<32>* UH... EU NEM SEI DIZER O QUE FOI ISSO.",
                '<32>* OBRIGADO POR ESPERAR, EU ACHO?',
                '<32>* COM CERTEZA FACILITOU MEU TRABALHO.'
            ],
            moneyX5c: [
                '<32>* ...',
                '<32>* MINHAS PREPARAÇÕES ESTÃO QUASE CONCLUÍDAS.',
                '<32>* SE VOCÊS TEM ÚLTIMAS PALAVRAS PARA OS RESIDENTES DO OUTPOST...',
                '<32>* AGORA SERIA O MOMENTO PERFEITO PARA COMPARTILHAR.'
            ],
            moneyX6a: ['<25>{#p/asriel2}{#f/15}* ...'],
            moneyX6b: ['<25>{#f/2}* Nah.'],
            moneyX7: ['<25>{#p/asriel2}{#f/6}* Vamos, desce.'],
            moneyX8: ['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/6}* Avante para o elevador.'],
            rg2a: ["<32>{#p/basic}{#x1}* Alto!\n* Você foi longe demais!{#x3}"],
            rg2b: () =>
                world.genocide
                    ? ["<32>{#p/basic}{#x1}* Não vamos deixar ele fugir tão facilmente, né garota?{#x3}"]
                    : [
                        ...(iFancyYourVilliany()
                            ? [
                                '<32>{#p/basic}{#x1}* Então, você é criança que se chama \"$(moniker2)\", huh?{#x3}',
                                iRespeccYourVilliany()
                                    ? '<32>{#x2}* É, nós vimos.\n* Nós também vimos o quão facilmente a Undyne desistiu de te matar.{#x3}'
                                    : "<33>{#x2}* É, nós vimos.\n* Também sabemos que você não é tão durão quanto parece.{#x3}",
                                "<32>{#x1}* Patético, né?{#x3}"
                            ]
                            : [
                                "<32>{#p/basic}{#x1}* Disseram que tinha um humano dando uma volta nesta área.{#x3}",
                                "<32>{#x2}* Normalmente nem acreditamos, mas neném, você estava na TV ao vivo...{#x3}",
                                "<32>{#x1}* É meio difícil ignorar coisas assim, certo?{#x3}"
                            ]),
                        '<32>* ...',
                        "<32>{#x2}* Foi o que eu pensei.{#x3}"
                    ],
            rg2c1: ["<32>{#p/basic}{#x1}* Amiga, cê tá pensando o que eu to pensando?{#x3}"],
            rg2c2: ['<32>{#p/basic}* ...', '<32>{#p/basic}{#x1}{#x2}* Oh, mas é claro.{#x3}', '<32>{#p/basic}* ...'],
            rg2c3: ['<32>{#p/basic}* ...'],
            rg2d: () =>
                world.genocide
                    ? [
                        "<32>{#p/basic}{#x1}* Vamos lá, garota.\n* Vamos mostrar para a Undyne o nosso valor...{#x3}",
                        '<32>{#x1}{#x2}* ... e chutar a bunda de um traidor.{#x3}'
                    ]
                    : [
                        "<32>{#p/basic}{#x1}* Vamos lá, garota.\n* Vamos mostrar para a Undyne o nosso valor...{#x3}",
                        iFancyYourVilliany()
                            ? '<32>{#x1}{#x2}* ... e chutar a bunda de um bully.{#x3}'
                            : '<32>{#x1}{#x2}* ... e chutar a bunda de um humano.{#x3}'
                    ],
            rg2e: ['<32>{#p/basic}* Wow.\n* Isso foi...', '<32>{#p/basic}* ... algo.'],
            rg2f: [
                '<32>{#p/basic}{#x1}* Amiga, talvez essa coisa de humano não vale a dor de cabeça.{#x3}',
                "<32>{#x2}* Vamos deixar os garotos cuidarem disso... se a Undyne acha que eles conseguem.{#x3}"
            ],
            hapsta1: () => [
                '<32>{#p/napstablook}* então, uh...',
                '<32>* você acha quem...\n* pode me ajudar com uma coisa...?',
                "<33>* é... bem importante......",
                choicer.create('* (O que você diz?)', 'Sim', 'Não')
            ],
            hapsta1a: ['<32>{#p/napstablook}* okay.........', '<32>* por aqui.........'],
            hapsta1b: ['<32>{#p/napstablook}* oh.........', "<32>* eu vou sair do seu caminho, então........."],
            hapsta2: ['<32>{#p/napstablook}* bem... aqui estamos', "<32>* e por que estamos aqui......"],
            hapsta3a: [
                "<32>{#p/napstablook}* eu venho pensando bastante sobre meu primo perdido, mettaton...",
                "<32>* desde que ele desapareceu, eu vim pensando sobre ele..."
            ],
            hapsta3b: ['<32>* eu só quero que ele fique bem.'],
            hapsta4: ['<32>{#p/napstablook}* de uma olhada nisso.'],
            hapsta5: ["<32>{#p/napstablook}* é uma gravação privada que eu encontrei no laboratório real."],
            hapsta6: [
                '<32>{#p/alphys}* Completar seu corpo vai levar um tempo...',
                '<32>* Você tem certeza que quer isso agora?',
                "<32>{#p/hapstablook}* eu estou pronta, doutora.",
                "<32>{#p/alphys}* Okay... Eu v-vou ativar o Mettaton agora.",
                '<32>* Este chip de controle vai autorizar que você use qualquer corpo que eu construir...',
                "<32>* Quando eu finalizar seu corpo, eu só irei t-transferi-lo.",
                '<32>* Isso vai, uh, funcionar?',
                "<32>{#p/hapstablook}* é maravilhoso, doutora.\n* maravilhoso!",
                "<32>{#p/alphys}* heh... isso...\n* foi bem legal da sua parte...",
                '<32>{#p/hapstablook}* então, quando eu começo?',
                '<32>{#p/alphys}* O-oh, você pode tentar agora se quiser?',
                "<32>* É um controle universal, então você não precisa se fundir a ele para controlar.",
                '<32>{#p/hapstablook}* oooh, fancy...',
                '<32>{#p/hapstablook}* ser capaz de atualizar meu corpo será útil no meu caminho para o estrelato!',
                '<32>{#s/echostop}{#p/event}* Playback completo.'
            ],
            hapsta7: [
                "<32>{#p/napstablook}* bem, é isso",
                "<32>{|}{#p/napstablook}* se eu não soubesse melhor, eu diria que- {%}"
            ],
            hapsta8: ["<32>{#p/finalghost}* Desculpa, estou atrasado."],
            hapsta9: ['<32>* Oh.\n* Olá, humano.'],
            hapsta10: ['<32>* Primo Blooky.\n* Por que o humano está aqui?'],
            hapsta11: ['<32>{#p/napstablook}* eu pensei.......\n* Que eles poderiam ajudar.'],
            hapsta12a: () => [
                ...[
                    ['<32>{#p/finalghost}* Hm.\n* Será bom tê-los do nosso lado.'],
                    ["<32>{#p/finalghost}* Hm.\n* Ele terá que reduzir seu lado violento."],
                    ["<32>{#p/finalghost}* Hm.\n* Só podemos esperar que ele não fuja desta vez."],
                    [
                        "<32>{#p/finalghost}* Hm.\n* Da última vez que os vi, eles não pareciam muito inteligentes.",
                        '<32>* Mas quem sabe.'
                    ],
                    ['<32>{#p/finalghost}* Hm.\n* Eles foram bem legais comigo...'],
                    ['<32>{#p/finalghost}* Hm.\n* Podemos apenas desejar que eles mantenham suas mãos em si mesmos.'],
                    ["<32>{#p/finalghost}* Hm.\n* Eles vão precisar manter essa atitude de flerte para si."]
                ][SAVE.data.n.state_wastelands_dummy]
            ],
            hapsta12b: ['<32>* Estamos prontos para ligar?'],
            hapsta13: ['<32>{#p/napstablook}* bem, espera aí...', "<32>{|}* onde es- {%}"],
            hapsta14: ['<32>{#p/basic}* BEM AQUI, MANÉ!'],
            hapsta15: ['<32>{#p/finalghost}* Você sempre precisa fazer isso?'],
            hapsta16: [
                '<32>{#p/basic}* Humano.\n* Humano!\n* HUMANO!!!',
                '<32>* O QUE VOCÊ FEZ COM MEU PRIMO DESSA VEZ?'
            ],
            hapsta17: ["<32>{#p/finalghost}* Ele não fez nada comigo, você só tá exagerando."],
            hapsta18: ['<32>{#p/basic}* Qual foi, eu só estava brincando...'],
            hapsta19: ['<32>{#p/finalghost}* Claro que estava.\n* Agora, para o que importa.'],
            hapsta20: ["<32>{#p/finalghost}* Todos sabemos o motivo de estarmos aqui.\n* Nosso primo..."],
            hapsta21: ["<32>{#p/basic}* Nosso primo é um VENDIDO."],
            hapsta22: [
                '<32>{#p/finalghost}* ...',
                '<32>* Nosso primo é muitas coisas, mas \"vendido\" não é uma delas.',
                '<32>* Em fato, após eu e Blooky lermos o diário dele... sinto que somos os culpados.'
            ],
            hapsta23: ['<32>{#p/napstablook}* .........\n* ......... deveríamos ligar?'],
            hapsta24: ["<32>{#p/finalghost}* Eu não vejo o motivo de não fazer isso."],
            hapsta25: [
                '<32>{#p/event}* Ring, ring...',
                '<32>{#p/mettaton}* BLOOKY!\n* QUE SURPRESA MARAVILHOSA!\n* O QUE VOCÊ PRECISA?',
                '<32>{#p/napstablook}* hm... eu preciso conversar com você sobre algo',
                '<32>{#p/mettaton}* OLHA SÓ, PODEMOS FAZER ISSO AGORA, QUE TAL?',
                '<32>{#p/napstablook}* em particular.........',
                '<32>{#p/mettaton}* AH.',
                "<32>{#p/mettaton}* EU TEMO QUE NÃO POSSA FAZER ISSO AGORA JÁ QUE ESTOU ME PREPARANDO PARA OUTRO SHOW.",
                "<32>* QUE TAL NOS ENCONTRARMOS APÓS EU FINALIZAR?"
            ],
            hapsta26: ['<32>{|}{#p/basic}* Qualquer coisa para evi- {%}'],
            hapsta27: ['<32>{#p/finalghost}* Quieto!'],
            hapsta28: [
                '<32>{#p/napstablook}* pode ser...',
                '<32>{#p/mettaton}* FABULOSO, QUERIDO.',
                "<32>* EU TE ENCONTRO LÁ, ENTÃO!"
            ],
            hapsta29: [
                '<32>{#p/basic}* Eu sabia.\n* Eu sabia!\n* EU SABIA!',
                '<32>* Isso estava fadado ao fracasso do começo.'
            ],
            hapsta30: [
                "<32>{#p/finalghost}* Só porque o Mettaton não quer conversar agora, não significa que falhamos.",
                "<32>* Só precisamos ter paciência."
            ],
            hapsta31: ['<32>{#p/basic}* Certo...'],
            hapsta32: () => [
                '<32>{#p/finalghost}* Bem, foi legal falar com vocês de novo.',
                "<32>* Bem, nos vemos mais tarde."
            ],
            hapsta34: () => [
                '<32>{#p/napstablook}* heh...',
                ...(SAVE.data.b.oops
                    ? ['<32>{#p/napstablook}* te vejo depois, eu acho']
                    : [
                        '<32>{#p/napstablook}* s $(namel)?',
                        '<32>{#p/basic}* ...?',
                        '<32>{#p/napstablook}* .........\n* valeu por estar aqui.'
                    ])
            ],
            hapsta35: ['<32>{#p/basic}* Eu só espero poder ajudar...'],
            opera1: () =>
                SAVE.data.n.state_foundry_undyne === 1
                    ? [
                        '<25>{#p/alphys}{#g/alphysSideSad}* ... hey, uh...',
                        "<25>{#f/30}* Desculpa por sair correndo mais cedo.",
                        "<25>{#f/32}* Só... tem sido difícil...",
                        '<25>{#f/20}* Depois de te ver deixar Undyne na plataforma daquele jeito.',
                        "<25>{#f/5}* Ainda assim, eu...\n* Eu sinto que não foi sua culpa.",
                        '<25>{#f/20}* Você estava tentando correr que alguém que estava te seguindo.',
                        '<25>{#f/31}* Eu só... tenho tido um tempo difícil aceitando o que ocorreu com ela.',
                        '<25>{#f/31}* ...',
                        '<25>{#f/20}* Bem, provavelmente deveríamos ir direto pro rec center agora.'
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysNervousLaugh}* Ah, aí está você!',
                        ...(world.bad_lizard === 1
                            ? [
                                "<25>{#g/alphysSideSad}* Eu estive preocupada... sobre o que você faria se eu não tivesse te escortado.",
                                "<25>{#g/alphysOhGodNo}* Uh, não que você faria algo ruim!",
                                '<25>{#g/alphysWorried}* É só que...',
                                "<25>{#g/alphysCutscene2}* Eu só sinto que seja importante eu te ajudar, sabe?",
                                '<25>{#g/alphysCutscene2}* ...',
                                "<25>{#g/alphysWelp}* Uma coisa é certeza, aqueles guardas NÃO deveriam ter te atacado."
                            ]
                            : [
                                "<25>{#g/alphysSideSad}* Eu estive bem p-preocupada com você...",
                                '<25>{#g/alphysSideSad}* Sobre os desafios, e o Mettaton, e...',
                                '<25>{#g/alphysHaveSomeCompassion}* ...',
                                '<25>{#g/alphysHaveSomeCompassion}* Aqueles guardas que NÃO deveriam ter te atacado.'
                            ]),
                        "<25>{#g/alphysUhButHeresTheDeal}* Talvez minhas ordens reais não chegaram neles???\n* Por alguma razão?",
                        '<25>{#g/alphysTheFactIs}* Quer dizer, eles FORAM contratados hoje...',
                        ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                            ? [
                                "<25>{#g/alphysWelp}* Bem, de toda forma, parece que você está bem...",
                                '<25>{#g/alphysCutscene2}* Acho que podemos ir.'
                            ]
                            : [
                                "<25>{#g/alphysWelp}* Bem, uh, de toda forma, acho que você está bem.",
                                "<25>{#g/alphysFR}* Tirando isso, aquela Boneca Mew Mew que não te pertence."
                            ])
                    ],
            opera2: ['<25>{#p/alphys}{#g/alphysInquisitive}* Você vem?'],
            opera3: ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}'],
            opera4: () =>
                world.genocide
                    ? ["<25>{#p/asriel2}{#f/1}* É hora de acabar com isso."]
                    : world.bad_lizard === 1
                        ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Aqui vamos nós.']
                        : [
                            "<25>{#p/alphys}{#g/alphysCutscene1}* Okay, lá vamos nós!",
                            '<25>{#g/alphysSmileSweat}* M-melhor ficar atrás de mim enquanto nós passamos pela segurança.'
                        ],
            opera5: ['<25>{#p/alphys}{#g/alphysSmileSweat}* O-oi.', "<32>{#p/basic}{#x1}* Salve.{#x3}"],
            opera5b: ['<25>{#p/alphys}{#g/alphysSmileSweat}* A-ah, a-acho que não tem seguranças.'],
            opera6: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Uh, s-sim!\n* Salve!'],
            opera7: () =>
                world.bad_lizard === 1
                    ? [
                        "<25>{#p/alphys}{#g/alphysWelp}* É bom que vocês não tenham atacado o humano mais cedo...",
                        "<25>{#g/alphysNeutralSweat}* Se vocês tivessem, eles teriam..."
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysWelp}* Bem uh, obrigado por... não atacar o humano mais cedo.',
                        '<25>{#g/alphysGarbo}* Os outros guardas Reais recebem \"minhas ordens\", foi preocupante.'
                    ],
            opera8: ['<32>{#p/basic}{#x1}* ... humano?{#x3}', '<32>{#x1}* Que humano?{#x3}'],
            opera9: [
                "<25>{|}{#p/alphys}{#g/alphysTheFactIs}* Uhhhhh eu não sei, eu só estou tentando escor- {%}",
                "<32>{#p/basic}{#x1}* Alphys, você é a segunda maior autoridade do Outpost.{#x3}",
                "<32>{#x2}* Pois é, você não precisa pedir permissão pra gente, haha.{#3}",
                "<32>{#p/basic}{#x1}{#x2}* Nós nem terminamos nossos treinamentos ainda!{#x3}"
            ],
            opera10: [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* Oh.\n* Eu entendo.',
                "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Nós vamos indo então!"
            ],
            opera11: ['<32>{#p/basic}{#x1}* (Mano... ela tá bem?){#x3}', '<32>{#x2}* (Nem me fala...){#x3}'],
            opera12: ['<32>{#p/basic}* Enquanto isso...'],
            opera13: [
                "<25>{#p/alphys}{#g/alphysSideSad}* Está tão escuro isso...",
                '<25>* Talvez devêssemos voltar. Achar outro caminho.',
                "<25>{|}* Ah não ser q- {%}"
            ],
            opera14a: ['<32>{#p/alphys}{#g/alphysGarbo}* Mettaton.'],
            opera14b: ['<32>{#p/mettaton}* OH MY...'],
            opera14c: ['<32>* O QUE TEMOS AQUI?'],
            opera15: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* PODERIA SER?', '<32>* O NEMESIS DOS MEUS SONHOS...?']
                    : ['<32>{#p/mettaton}* PODERIA SER?', '<32>* MEU ÚNICO E VERDADEIRO AMOR...?'],
            opera16: [
                '<25>{*}{#p/alphys}{#g/alphysGarbo}* O que caramba você vai fazer com ele agora...{^30}{%}',
                '<32>{*}{#p/mettaton}{#x1}* COM LI-CEN-ÇA?{^30}{%}',
                "<32>{*}{#x2}* EU ESTOU TENTANDO APRESENTAR UM SHOW AQUI.{^30}{%}",
                '<25>{*}{#p/alphys}{#g/alphysWTF}* ...{^30}{%}'
            ],
            opera16b: [
                '<32>{*}* MY, MY...{^30}{%}',
                "<32>{*}{#x1}* LAMENTÁVEL QUE ALPHYS NÃO ESTEJA AQUI.{^30}{%}",
                "<32>{*}{#x2}* ELA AMARIA ISSO.{^30}{%}"
            ],
            opera17: () =>
                world.genocide ? 'Oh |meus |amigos...' : iFancyYourVilliany() ? 'Oh |que |triste isso...' : 'Oh |meu |amor...',
            opera18: () =>
                world.genocide
                    ? "Tempo |voa|para |acabar..."
                    : iFancyYourVilliany()
                        ? 'Que |é |ver...'
                        : 'Por |favor |vá|fugir...',
            opera19: () =>
                world.genocide
                    ? "Logo |você |desejará..."
                    : iFancyYourVilliany()
                        ? 'Alguém |desperdiçou... '
                        : 'O|rei |monstro...',
            opera20: () =>
                world.genocide
                    ? "Que |você|não |pecasse..."
                    : iFancyYourVilliany()
                        ? 'Seu |tempo |em |mim...'
                        : 'Proí|be |sua |estadia...',
            opera20a: () =>
                iFancyYourVilliany()
                    ? ['<25>{*}{#p/alphys}{#g/alphysInquisitive}* Huh?{^40}{%}']
                    : ['<25>{*}{#p/alphys}{#g/alphysWelp}* Ei, esse som é até que bem legal...{^40}{%}'],
            opera21: () =>
                world.genocide ? 'Mas |an|tes...' : iFancyYourVilliany() ? "Eu vou |ad|mitir..." : 'Hu|manos |devem...',
            opera22: () =>
                world.genocide
                    ? 'Você |ser |morto...'
                    : iFancyYourVilliany()
                        ? 'Eu |fiquei |in|trigado...'
                        : 'Viva |longe |a|parte...',
            opera23: () =>
                world.genocide ? "Vamos |en|saiar" : iFancyYourVilliany() ? "Mas |você |está..." : 'Mes|mo |se...',
            opera24: () =>
                world.genocide
                    ? "A |vida |que você |levou..."
                    : iFancyYourVilliany()
                        ? 'Não |na |minha|liga...'
                        : 'Isso |quebra |meu |coração...',
            opera25: () =>
                world.genocide
                    ? 'Nascido |um |príncipe...'
                    : iFancyYourVilliany()
                        ? 'Você |deve |achar...'
                        : "Eles vão |lançar |você...",
            opera25a: () =>
                iFancyYourVilliany()
                    ? ['<25>{*}{#p/alphys}{#g/alphysGarboCenter}* Senhor.{^40}{%}']
                    : ['<25>{*}{#p/alphys}{#g/alphysCutscene1}* A sakura sai...! {^40}{%}'],
            opera26: () =>
                world.genocide
                    ? 'Nós |estávamos |conven|cidos...'
                    : iFancyYourVilliany()
                        ? 'Al|guém |mais |bondoso...'
                        : 'Fora |para |o |espaço...',
            opera27: () =>
                world.genocide
                    ? "Isso |você |veria..."
                    : iFancyYourVilliany()
                        ? 'Pelo |menos |então...'
                        : "Eu |vou me ferrar ...|\n(bastante, |literalmente)",
            opera28: () =>
                world.genocide
                    ? 'Nosso |rei|no |livre...'
                    : iFancyYourVilliany()
                        ? "Você não\n|teria |que |morrer."
                        : "E |então |você\n|morrerá.",
            opera28a: () =>
                iFancyYourVilliany()
                    ? ['<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}']
                    : ["<25>{*}{#p/alphys}{#g/alphysGarbo}* Ah, então é isso onde vai chegar.{^40}{%}"],
            opera29: () => (world.genocide ? 'Então |um |dia...' : 'Real|mente |triste...'),
            opera30: () => (world.genocide ? 'Você |perde |seu |caminho...' : "Você |vai |morrer..."),
            opera31: () => (world.genocide ? 'Agora |meus |amigos... ' : 'Chora |chora |chora...'),
            opera31a: ['<25>{*}{#p/alphys}{#g/alphysCutscene3}* Nós já entendemos...{^40}{%}'],
            opera32: () =>
                world.genocide
                    ? "Vamos |trazer |isto\n|para |um |fim."
                    : iFancyYourVilliany()
                        ? "Isso é |o que |você\n|ganha |por |ser um\nsaco de carne podre"
                        : "Tão |triste |que\n|acon|te|cera.",
            opera33: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/mettaton}* TÃO TRISTE.', '<32>{#p/mettaton}* TÃO TRISTE QUE VOCÊ DEU UMA DE VILÃO.']
                    : ['<32>{#p/mettaton}* TÃO TRISTE.', "<32>{#p/mettaton}* TÃO TRISTE QUE VOCÊ SERÁ EJETADO."],
            opera34: () =>
                !world.badder_lizard
                    ? [
                        '<25>{#p/alphys}{#g/alphysGarboCenter}* Acabou?',
                        '<32>{#p/mettaton}{#x1}* BEM, SEGURE AÍ...',
                        '<32>{|}{#x2}* EU AINDA TENHO Q- {%}'
                    ]
                    : ['<32>{#p/mettaton}{#x1}* PREPARA-TE HUMANO...', "<32>{|}{#x2}* PORQUE EU ESTOU PRESTES A EXPLODIR SUA- {%}"],
            opera35: () => [
                ...(SAVE.data.b.killed_glyde
                    ? [
                        !world.badder_lizard
                            ? "<32>{#p/mettaton}{#x0}* ... EU NÃO ESTOU QUE A ALPHYS FUGIU DE VOCÊ AGORA MESMO."
                            : "<32>{#p/mettaton}{#x0}* ... TOTALMENTE COMPREENSÍVEL QUE ALPHYS NÃO QUEIRA ESTAR CONTIGO.",
                        '<32>{#x1}* VOCÊ NÃO TEM PIEDADE?',
                        "<32>{#x0}* TIVE QUE CORTAR A TRANSMISSÃO DA TV AO VIVO APENAS PARA PROTEGER OS OLHOS DOS MEUS PRECIOSOS ESPECTADORES!",
                        !world.badder_lizard
                            ? "<32>{#x0}* QUE LAMENTÁVEL...\n* MAS NÃO SUE A CAMISA!"
                            : "<32>{#x0}* QUE DESGRAÇA...\n* MAS NÃO TEMA!"
                    ]
                    : [
                        ...(!world.badder_lizard
                            ? ['<25>{#p/alphys}{#g/alphysWelp}* En-então... o que agora?', '<32>{#p/mettaton}{#x0}* O QUE AGORA?']
                            : []),
                        '<32>{#p/mettaton}{#x0}* BEM, POR MAIS QUE EU AMARIA FINALIZAR ESTE EPISÓDIO...',
                        '<32>{#x2}* E ACREDITE EM MIM QUERIDO, EU DEFINITIVAMENTE TERIA...'
                    ]),
                ...(world.bad_robot
                    ? [
                        "<32>{#x1}* TEM ALGO QUE EU PRECISO FAZER ANTES DO NOSSO PRÓXIMO E ÚLTIMO EPISÓDIO.",
                        '<32>{#x3}* LOGO, AMOR...',
                        "<32>{*}* LOGO, EU FAREI VOCÊ DESEJAR JAMAIS TER ME CONHECIDO.{^30}{#x4}{%}"
                    ]
                    : [
                        "<32>{#x1}* A ALGO MUITO, -MUITO- MAIS ANIMADOR GUARDADO PARA O SHOW.",
                        '<32>{#x3}* ENTÃO, ATÉ O PRÓXIMO E ÚLTIMO EPISÓDIO...',
                        '<32>{*}* CONTINUE FABULOSO!{^30}{#x4}{%}'
                    ])
            ],
            
            hapsta36: () => [
                "<32>{#p/mettaton}{#e/mettaton/0}* OH... CERTO.\n* EU TINHA ME ESQUECIDO DISSO.",
                ...(SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
                    ? [
                        "<32>{#p/mettaton}{#e/mettaton/5}* ... EU SUGIRO QUE DEVEMOS IR PARA OUTRO LUGAR, PELO MENOS.\n* NÃO É SEGURO AQUI."
                    ]
                    : [])
            ],
            hapsta37: () =>
                SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard
                    ? ['<32>{#p/napstablook}* tudo bem......\n* se você realmente quer, podemos fazer isso sozinhos.....']
                    : [
                        '<32>{#p/napstablook}* ei, um......',
                        '<32>{#p/napstablook}* eu estava olhando por antigas gravações do velho laboratório, e...'
                    ],
            hapsta38: ['<32>{#p/mettaton}{#e/mettaton/34}* SIM...?'],
            hapsta39: [
                '<32>{#p/napstablook}* bem, tinha esta uma voz que parecia...',
                '<32>{#p/napstablook}* parecia......'
            ],
            hapsta40: ["<33>{#p/mettaton}{#e/mettaton/11}* NÃO TEMOS O DIA TODO, QUERIDO."],
            hapsta41: [
                '<32>{#p/napstablook}* era você',
                '<32>{#p/napstablook}{#e/mettaton/3}* .........\n* o verdadeiro você.'
            ],
            hapsta42: [
                '<32>{#p/mettaton}{#e/mettaton/2}* O \"VERDADEIRO EU\" EH?',
                "<32>{#e/mettaton/0}* PERA LÁ, NÃO VAMOS SÓ CHEGAR CONCLUINDO COISAS AQUI."
            ],
            hapsta43: ["<32>{#p/finalghost}* Ele está dizendo a verdade."],
            hapsta44: ['<32>{#p/mettaton}{#e/mettaton/6}* ... E AGORA A GANGUE DE FANTASMAS SE UNIU CONTRA MIM.\n* AMÁVEL.'],
            hapsta45: ['<25>{#p/alphys}{#g/alphysTheFactIs}* Uh, eu juro que n-não tenho nada haver com isso...'],
            hapsta46: [
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}{#e/mettaton/3}* E-eu vou só deixar vocês resolverem isso..."
            ],
            hapsta47: [
                "<32>{#p/basic}* Com licença, ONDE você pensa que vai?",
                "<32>{#p/basic}* Você foi quem começou isso tudo em primeiro lugar!",
                "<32>{#p/basic}* Se não fosse por sua fita estúpida, eu não teria que estar aqui agora."
            ],
            hapsta48: ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Woops.'],
            hapsta49a: [
                "<32>{#p/mettaton}{#e/mettaton/9}* É ISSO ENTÃO.",
                "<32>{#e/mettaton/7}* VOCÊS ESTÃO TODOS AQUI... PRONTOS PARA ME LEVAR PARA CASA."
            ],
            hapsta49b: ['<32>{#e/mettaton/8}* TÃO ERRADO POR \"CAÇAR\" OS SEUS SONHOS, HEIN BLOOKY?'],
            hapsta50: ['<32>{|}{#p/napstablook}* primo, eu- {%}'],
            hapsta51a: ['<32>{#p/mettaton}{#e/mettaton/18}* AH, SEM ESSA DE \"PRIMO\".'],
            hapsta51b: [
                "<32>{#p/mettaton}{#e/mettaton/20}* SE NÃO FOSSE POR VOCÊ, TALVEZ EU TIVESSE GOSTADO DA VIDA CALMA...",
                '<32>{#p/mettaton}{#e/mettaton/17}* ... MAS NÃO.\n* VOCÊ -TINHA- QUE SE METER NOS NEGÓCIOS DE FAMÍLIA.',
                '<32>{#p/mettaton}{#e/mettaton/19}* UM NEGÓCIO, DEVO ACRESCENTAR, CUJOS NÚMEROS DE VENDAS ESTÃO NO VERMELHO DESDE O PRIMEIRO DIA.'
            ],
            hapsta52: ['<32>{#p/napstablook}{#e/mettaton/3}* .........\n* eu sei.'],
            hapsta53: [
                '<32>{#p/mettaton}{#e/mettaton/17}* AH, ENTÃO VOCÊ SABE?\n* VOCÊ REALMENTE SABE COMO ERA PARA MIM?'
            ],
            hapsta54: ["<32>{#p/finalghost}* Considerando que todos nós lemos seu diario, tenho certeza que eles também..."],
            hapsta55a: [
                "<32>{#p/mettaton}{#e/mettaton/19}* EU NÃO LIGO PRA QUEM LEU MEU DIÁRIO, EU QUERO QUE OUÇAM ISSO VINDO DE MIM.",
                '<32>{#p/mettaton}{#e/mettaton/3}* ...\n* ESCUTA AQUI, \"PRIMO.\"\n* O TRABALHO NUNCA FOI UM PROBLEMA.',
                '<32>{#p/mettaton}{#e/mettaton/14}* FAZENDA DE LESMAS PODIA NÃO SER O TRABALHO MAIS PRAZEROSO, MAS EU GOSTAVA PELO QUE ELE ERA.',
                "<32>{#p/mettaton}{#e/mettaton/13}* NÃO... APENAS SE TORNOU UM PROBLEMA QUANDO TODO SEGUNDO QUE EU NÃO ESTIVESSE NA FAZENDA...",
                "<32>{#p/mettaton}* ... FOI UM SEGUNDO QUE VOCÊS NÃO PARECIAM SE IMPORTAR COMIGO."
            ],
            hapsta55b: [
                '<32>{#p/mettaton}{#e/mettaton/16}* SEM LIGAÇÃO, SEL VISITA... SÓ O PADRÃO \"EI, QUANDO VOCÊ VOLTA PARA TRABALHAR?\"',
                "<32>{#p/mettaton}{#e/mettaton/15}* ESTAVA BEM ÓBVIO PARA MIM QUE EU NÃO ERA NADA ALÉM DE UMA FERRAMENTA...",
                '<32>{#p/mettaton}{#e/mettaton/11}* APENAS UM TRABALHADOR NA GRANDE MAQUINA DA FAMÍLIA BLOOK.'
            ],
            hapsta56: ['<32>{#p/napstablook}* ...............'],
            hapsta57a: ['<32>{#p/mettaton}{#e/mettaton/2}* NADA A DIZER?\n* NÃO, NÃO, EU ESPERAVA ISSO.'],
            hapsta57b: [
                "<32>{#p/mettaton}{#e/mettaton/5}* HONESTAMENTE, EU NÃO PODERIA ME IMPORTAR MENOS COM O QUE VOCÊ TEM PRA DIZER.",
                "<32>{#p/mettaton}{#e/mettaton/10}* EU JÁ TENHO TUDO QUE EU SEMPRE QUIS NA VIDA, E OLHA PRA VOCÊ...",
                '<32>{#p/mettaton}{#e/mettaton/12}* AGARRANDO-SE A BONECOS DE TREINAMENTO E IMPLORANDO POR RESTOS.'
            ],
            hapsta58: ["<32>{#p/finalghost}* Você diz que não se importa com a gente, mas continua nos chamando para os shows."],
            hapsta59: [
                '<32>* Você até deu ao Blooky um tratamento especial no último show...',
                "<32>* Colocando os outros competidores para fora, assim ficaria ele com o humano."
            ],
            hapsta60: ['<32>{#p/mettaton}{#e/mettaton/5}* ... ISSO FOI APENAS UMA COINCIDÊNCIA.'],
            hapsta61: ['<32>{#p/basic}* Ou... parte de você ainda quer secretamente voltar.'],
            hapsta62: ['<32>{#p/mettaton}{#e/mettaton/11}* HAHAHA...\n* SEM CHANCES NESSA GALAXIA.'],
            hapsta63: ["<32>{#p/napstablook}* me desculpa, primo."],
            hapsta64: ['<32>{#p/mettaton}{#e/mettaton/21}* ... OH?'],
            hapsta65a: [
                "<32>{#p/napstablook}* depois que você foi embora, nós nem conseguimos manter os clientes...",
                "<32>{#p/napstablook}{#e/mettaton/15}* tivemos que diminuir\n* a fazenda... não é mais a mesma......"
            ],
            hapsta65b: ['<32>{#p/napstablook}* e eu nunca percebi tudo que você fez pela gente...... até você ir embora.'],
            hapsta65c: ["<32>{#p/napstablook}{#e/mettaton/4}* então... me desculpa.\n* por tudo........."],
            hapsta66a: [
                '<32>{#p/mettaton}* ENTENDO.',
                '<32>{#p/mettaton}{#e/mettaton/6}* ... ENTENDO.',
                "<32>{#p/mettaton}{#e/mettaton/5}* ENTÃO VOCÊ É O TIPO QUE PEDE DESCULPAS -APENAS- DEPOIS DE FAZER BESTEIRA, HUH?"
            ],
            hapsta66b: ['<32>{#p/mettaton}{#e/mettaton/0}* EU DEVERIA SABER.'],
            hapsta67: ["<32>{|}{#p/napstablook}* isso não é- {%}"],
            hapsta68a: [
                '<32>{#p/mettaton}{#e/mettaton/3}* SILÊNCIO. VOCÊ QUER QUE EU TE PERDOE E VOLTE PARA CASA COMO SE NADA TIVESSE ACONTECIDO.',
                "<32>{#p/mettaton}{#e/mettaton/5}* SINTO QUE AS COISAS NÃO FUNCIONEM ASSIM MAIS, BLOOKY."
            ],
            hapsta68b: ["<32>{#p/mettaton}{#e/mettaton/6}* ... DE TODA FORMA, EU TENHO UM GRANDE FINAL PARA PREPARAR..."],
            hapsta68c: ["<32>{#p/mettaton}{#e/mettaton/11}* BEM, SE VOCÊ NÃO SE IMPORTA, EU VOU SEGUIR MEU CAMINHO."],
            hapsta69: ['<32>{#p/basic}* Volta aqui.\n* Volta aqui!\n* VOLTA AQUI!!!'],
            hapsta70: ["<33>{#p/finalghost}* Eu não acho que ele vai voltar."],
            hapsta71: [
                '<32>{#p/napstablook}* talvez... ele só precise de espaço...',
                '<32>{#p/napstablook}* precisamos dar para ele uma chance.........'
            ],
            hapsta72: ["<32>{#p/basic}* Que grande perda de tempo.\n* Eu vou voltar para a casa da Undyne agora."],
            hapsta73: ['<32>{#p/finalghost}* Foi uma boa tentativa, Blooky.', '<32>{#p/finalghost}* Uma boa tentativa.'],
            hapsta74: ['<32>{#p/napstablook}* não............'],
            hapsta75: () =>
                SAVE.data.b.oops
                    ? [
                        "<25>{#p/alphys}{#g/alphysCutscene2}* Ei...\n* Não dá ouvidos pra eles.",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* Eu já conheço Mettaton f-faz um tempinho.",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* Ele não sairia dessa forma se não precisasse de um tempo pra pensar.",
                        '<32>{#p/napstablook}* é...',
                        '<32>{#p/napstablook}* eu acho......'
                    ]
                    : [
                        "<32>{#p/basic}* Você sabe que ele já fez isso antes, certo?",
                        "<32>{#p/basic}* Ele vai voltar.",
                        '<32>{#p/napstablook}* heh...\n* $(namel)......',
                        '<25>{#p/alphys}{#g/alphysInquisitive}* $(name)...?',
                        "<32>{#p/napstablook}* uh, é uma longa história",
                        '<25>{#p/alphys}{#g/alphysWelp}* ... Eu acho que você pode me ligar depois.',
                        '<32>{#p/napstablook}* ...\n* obrigado, $(namel)\n* por tudo......',
                        "<32>* você fez muito por nossa família apenas por estar aqui",
                        "<32>* mesmo que... não seja a família que você realmente queria...",
                        '<32>{#p/basic}* Blooky, eu...',
                        '<32>{#p/napstablook}* $(namel), se você...\n* não, quando você ver ele de novo...',
                        "<32>* não deixe ele esquecer o quanto você se importava com ele em vida... tudo bem?"
                    ],
            hapsta76: [
                "<32>{#p/napstablook}* aqui está a boneco mew mew",
                "<32>* espero que não seja tarde......",
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* Não, t-tudo bem.\n* Obrigado."
            ],
            hapsta77: ['<32>{#p/napstablook}* bem, te vejo por aí......'],
            opera36a: () => [
                '<25>{#p/alphys}{#g/alphysWelp}* Isso com certeza foi uma virada de eventos inesperada.',
                ...(SAVE.data.b.a_state_hapstablook && !SAVE.data.b.oops
                    ? [
                        '<25>{#p/alphys}{#g/alphysInquisitive}* sem mencionar todo o \"$(name)\"...',
                        "<25>* Da última vez que olhei, ele já está morto faz centenas de anos...",
                        "<25>{#g/alphysWelp}* ah bem.\n* Eu acho que eles vão me falar sobre isso depois.",
                        "<25>{#g/alphysWelp}{#x5}* Falando em vontades, você provavelmente já quer ir..."
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* Parece que estamos livres, no entanto...",
                        "<25>{#g/alphysWelp}{#x5}* O que significa... que você já quer ir indo..."
                    ]),
                '<25>{#g/alphysTheFactIs}{#x6}* E eu deveria voltar para o laboratório...',
                '<25>{#g/alphysNervousLaugh}{#x5}* Então... te vejo depois, eu acho?',
                ...(SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew || SAVE.data.b.mewget
                    ? [
                        "<25>{#g/alphysUhButHeresTheDeal}* Uh, M-mas não se preocupe!\n* Eu vou te ligar o momento que eu puder...",
                        '<25>{#g/alphysNervousLaugh}* Você...',
                        "<25>{#g/alphysHellYeah}* E-eu vou ficar em contato!"
                    ]
                    : [
                        ...(!SAVE.storage.inventory.has('tvm_mewmew') && // NO-TRANSLATE

                            !SAVE.storage.dimboxA.has('tvm_mewmew') && // NO-TRANSLATE

                            !SAVE.storage.dimboxB.has('tvm_mewmew') // NO-TRANSLATE

                            ? ((SAVE.data.b.mewget = true),
                                [
                                    '<25>{#g/alphysNervousLaugh}* ...',
                                    '<25>{#g/alphysFR}* ... na verdade, antes de ir, eu acho que você deveria saber.',
                                    '<25>{#f/33}* Eu achei a Boneca Mew Mew que você largou.',
                                    "<25>{#g/alphysCutscene3}* É minha agora.\n* E eu vou esconder no lugar mais secreto que puder.",
                                    '<25>{#g/alphysHellYeah}* En-então é!'
                                ])
                            : [
                                '<25>{#g/alphysNeutralSweat}{#x5}* Mas, uh, a-antes de eu ir...',
                                '<25>{#f/10}* Você se importaria... de devolver minha Boneca Mew Mew?',
                                '<25>{#f/3}* Por favor?',
                                choicer.create('* (Devolver a Boneca Mew Mew?)', 'Sim', 'Não')
                            ])
                    ])
            ],
            opera36b1: [
                '<32>{#p/human}* (Você devolve a Boneca Mew Mew para a Alphys.)',
                '<25>{#p/alphys}{#g/alphysCutscene2}* Valeu.'
            ],
            opera36b2: [
                '<32>{#p/human}* (Você decide não devolver.)',
                '<25>{#p/alphys}{#g/alphysWTF}* ...',
                '<25>{#g/alphysCutscene2}* Tá, quer saber?\n* Fica com ela.',
                "<25>{#g/alphysCutscene2}* É sua.",
                "<25>{#f/33}* O que?\n* Não é como se eu realmente me importasse com uma boneca."
            ],
            opera37: (gib: boolean) =>
                SAVE.data.b.failshow || !SAVE.data.b.item_tvm_mewmew
                    ? ['<25>{#p/alphys}{#g/alphysSmileSweat}* F-fica bem!!']
                    : gib
                        ? ["<25>{#p/alphys}{#f/10}* E-eu vou manter contato."]
                        : ['<25>{#p/alphys}{#f/3}* N-não mesmo!!'],
            opera38: [
                '<32>{#p/basic}* ... agora eu entendo por que Blooky se sente como ele se sente o tempo todo.',
                "<32>* A culpa, de pensar que você poderia ter cuidado melhor de alguém...",
                "<32>* Hmph.\n* Talvez tenha algo a mais que eu possa fazer para ajudar aqui.",
                '<32>* Lembra o que aconteceu com a Toriel?',
                '<32>* A forma como você me chamou e eu fui capaz de falar?',
                '<32>* Eu sei uma coisa sobre monstros.\n* Uma coisa que pode nos ajudar a lidar com isso mais facilmente.',
                '<32>* Então, se eu pensar sobre algo...',
                '<32>* Me chama como você fez antes, beleza?'
            ],
            operaX1: () =>
                [
                    ['<25>{#p/asriel2}{#f/8}* Alô?'],
                    ['<25>{#p/asriel2}{#f/8}* Aí vamos nós.'],
                    ['<25>{#p/asriel2}{#f/8}* ...']
                ][Math.min(SAVE.flag.n.ga_asriel53++, 1)],
            operaX2: () => [
                ...[
                    ['<32>{#p/mettaton}* OLÁ, QUERIDO.'],
                    ['<32>{#p/mettaton}* AÍ VAMOS NÓS REALMENTE, QUERIDO!'],
                    ['<32>{#p/mettaton}* POIS BEM, OLÁ!']
                ][Math.min(SAVE.flag.n.ga_asriel53 - 1, 2)],
                "<32>* POR QUE VOCÊS DOIS NÃO VEM PARA O PALCO?"
            ],
            operaX3: [
                "<32>{#p/mettaton}* BEM MELHOR...",
                '<32>{#p/mettaton}* AGORA, DEIXE-ME CANTAR UM PEQUENO SOM PARA VOCÊS.'
            ],
            operaX4: () =>
                [
                    [
                        "<25>{*}{#p/asriel2}{#f/10}* Então me diz, sobre o que é esse som?{^30}{%}",
                        '<32>{*}{#p/mettaton}{#x1}* OH, ASRIEL...{^30}{%}',
                        '<32>{*}{#x2}* NUNCA OUVIU FALAR SOBRE \"SPOILERS\", QUERIDO?{^30}{%}',
                        '<25>{*}{#p/asriel2}{#f/6}* Sei.{^30}{%}'
                    ],
                    [
                        "<25>{*}{#p/asriel2}{#f/7}* Eu já sei que esse show é sobre mim.{^30}{%}",
                        '<32>{*}{#p/mettaton}{#x1}* AH, VOCÊ SABE?{^30}{%}',
                        "<32>{*}{#x2}* BEM, SINTO QUE ISSO NÃO VAI ME IMPEDIR DE FAZÊ-LO.{^30}{%}",
                        '<25>{*}{#p/asriel2}{#f/8}* ...{^30}{%}'
                    ]
                ][Math.min(SAVE.flag.n.ga_asriel54++, 1)],
            operaX5: () => [
                "<32>{#p/mettaton}* BEM, ISSO É TUDO.",
                "<32>{#x1}* OH, E, EU ESQUECI DE MENCIONAR QUE NÃO ESTOU AQUI DE VERDADE.",
                '<32>* MEU CHIP DE CONTROLE JÁ FOU INSTALADO EM UM NOVO CORPO.',
                ...(SAVE.flag.n.ga_asriel55++ < 1
                    ? [
                        '<25>{#p/asriel2}{#f/10}* ... um novo corpo?',
                        '<32>{#p/mettaton}* VOCÊ QUER VER?',
                        "<32>* BEM.\n* VOCÊ NÃO TERÁ QUE ESPERAR MUITO."
                    ]
                    : []),
                '<32>{#p/mettaton}* LOGO NOS VEREMOS...'
            ],
            operaX7: ["<25>{#p/asriel2}{#f/8}* Algo me diz que isso não será tão fácil quanto esperamos."],
            operaY1: ['<25>{*}{#p/asriel2}{#f/13}* O que você- {%}'],
            operaY2: ['<25>{*}{#p/asriel2}{#f/15}* $(name).\n* O que você tá fazendo.{^40}{%}'],
            operaY3: ["<25>{*}{#p/asriel2}{#f/15}* Não dá pra continuar assim...{^40}{%}"],
            operaY4: ['<25>{*}{#p/asriel2}{#f/16}* Obrigado de toda forma, $(name).{^40}{%}'],
            end1: (rgk: boolean) => [
                '<32>{#p/mettaton}* NO FIM...',
                ...(world.mttvar
                    ? [
                        '<32>* FINALMENTE NOS ENCONTRAMOS NESTE FATÍDICO...',
                        '<32>{#e/mettaton/4}* ...',
                        "<32>{#e/mettaton/25}* MEUS SENSORES ME DIZEM QUE VOCÊ ESTÁ OLHANDO POR CIMA DO MEU OMBRO.",
                        iFancyYourVilliany()
                            ? '<32>{#e/mettaton/30}* VOCÊ DEVE ESTAR COÇANDO AS MÃOS PARA APERTAR AQUELE BOTÃO, NÉ \"$(moniker2u)?\"'
                            : '<32>{#e/mettaton/30}* VOCÊ DEVE ESTAR QUERENDO MUITO APERTAR AQUELE BOTÃO, NÉ QUERIDO?',
                        ...(!world.badder_lizard
                            ? [
                                '<32>{#e/mettaton/28}* UM BOTÃO DO QUAL VOCÊ COM CERTEZA JÁ SABE POR CONTA DA BOCA GRANDE DA ALPHYS.',
                                '<32>{#e/mettaton/3}* QUE PREVISÍVEL...'
                            ]
                            : [
                                '<32>{#e/mettaton/28}* UM BOTÃO QUE VOCÊ SEM DÚVIDA APRENDEU AO EXPLORAR AS GRAVAÇÕES DO LAB REAL.',
                                '<32>{#e/mettaton/3}* QUE PREVISÍVEL...'
                            ]),
                        "<32>{#e/mettaton/12}* QUE ÓTIMO, EU NÃO FAREI VOCÊ PERDER TEMPO COM MONÓLOGO.",
                        ...(SAVE.data.b.a_state_hapstablook
                            ? ["<32>{#e/mettaton/3}* SÓ SAIBA QUE EU NÃO ESTOU NO CLIMA PARA JOGOS."]
                            : iFancyYourVilliany()
                                ? ["<32>{#e/mettaton/31}* SÓ SAIBA QUE EU NÃO VOU PEGAR LEVE CONTIGO NEM UM SEGUNDO!"]
                                : !world.badder_lizard
                                    ? ["<32>{#e/mettaton/31}* SÓ SAIBA QUE EU ESTOU CONTANDO CONTIGO PARA TRAZER UM VERDADEIRO JOGO!"]
                                    : ["<32>{#e/mettaton/19}* SÓ SAIBA QUE EU NÃO PODERIA ME IMPORTAR MENOS COM O QUE ACONTECE CONTIGO."])
                    ]
                    : [
                        '<32>* FINALMENTE NOS ENCONTRAMOS NESTE ESTÁGIO FATÍDICO.',
                        ...(iFancyYourVilliany()
                            ? [
                                '<32>{#e/mettaton/3}* BEM.',
                                "<32>{#e/mettaton/35}* É INCRÍVEL COMO VOCÊ CONSEGUIU MANTER O ATO POR TANTO TEMPO...",
                                '<32>{#e/mettaton/6}* MAS AGORA, É O MOMENTO QUE SUA MÁSCARA FINALMENTE CAIRÁ.',
                                '<32>{#e/mettaton/5}* VOCÊ REALMENTE ACHA QUE EU IRIA PEGAR LEVE CONTIGO, QUERIDO \"$(moniker2u)?\"',
                                "<32>{#e/mettaton/0}* BEM, É CLARO QUE VOCÊ NÃO.\n* MAS ACHO QUE VOCÊ NÃO ESTÁ PRONTO PARA O QUE VIRÁ DEPOIS.",
                                '<32>{#e/mettaton/10}* SE VOCÊ ACHA QUE TEM O QUE É PRECISO, ENTÃO FIQUE À VONTADE...',
                                "<32>{#e/mettaton/31}* SÓ NÃO ME CULPE POR TE -DERROTAR- QUANDO ISSO ACONTECER!"
                            ]
                            : [
                                '<32>{#e/mettaton/4}* MAS ENTÃO...',
                                '<32>{#e/mettaton/34}* ONDE EU ESTARIA SEM VOCÊ?',
                                "<32>{#e/mettaton/5}* PARA O BEM OU MAU, VOCÊ NOS DEU A CHANCE DE MOSTRAR O MELHOR DE AMBOS.",
                                "<32>{#e/mettaton/6}* MAS AGORA, VEM O MOMENTO PELO QUAL VOCÊ ESTEVE ANSIOSO.",
                                '<32>{#e/mettaton/23}* PORÉM, EU DEVO ADMITIR...',
                                ...(SAVE.data.b.a_state_hapstablook
                                    ? [
                                        "<32>{#e/mettaton/5}* AS COISAS NÃO FORAM COMO EU ESPERAVA.",
                                        '<32>{#e/mettaton/6}* TODA ESSA COISA DE FAMILIA APARECENDO DO NADA EM MINHA VIDA...',
                                        "<32>* ... NÃO É ALGO DO QUAL EU ESTOU PARTICULARMENTE FELIZ.",
                                        "<32>{#e/mettaton/11}* MAS, EU AINDA TENHO UM GRANDE FINAL PARA PERFORMAR, ENTÃO EU DEVO RESOLVER ISSO TAMBÉM.",
                                        '<32>{#e/mettaton/5}* TENTE NÃO ATRAPALHAR, BELEZA?',
                                        '<32>{#e/mettaton/6}* A AUDIÊNCIA ESTÁ ENCARANDO POR UMA RAZÃO GENUÍNA.'
                                    ]
                                    : !world.badder_lizard
                                        ? [
                                            "<32>{#e/mettaton/25}* EU CONTO COM VOCÊ PARA PASSAR POR MIM SEM SE MACHUCAR.",
                                            "<32>{#e/mettaton/0}* NÃO ME ENTENDA ERRADO, EU AMARIA TOMAR SUA ALMA E ME TORNAR A ESTRELA DA HUMANIDADE.",
                                            '<32>{#e/mettaton/3}* MAS TIRAR -SUA- ALMA SERIA... AGRIDOCE.',
                                            "<32>{#e/mettaton/6}* NÓS FIZEMOS MUITAS COISAS JUNTOS, COM TODOS OS SHOW JUNTOS.",
                                            "<32>{#e/mettaton/4}* ALIAS, PARA UM HUMANO QUE TEM SIDO PERSEGUIDO POR TANTOS MONSTROS...",
                                            "<33>{#e/mettaton/0}* VOCÊ TEM AGUENTADO BASTANTE BEM.",
                                            '<32>{#e/mettaton/5}* OH BEM.\n* SE VOCÊ CHUTAR O BALDE, PODE FICAR TRANQUILO...',
                                            "<32>* SUA ALMA NÃO SERÁ DESPERDIÇADA.",
                                            "<32>{#e/mettaton/10}* AGORA, ME MOSTRE QUE VOCÊ É CAPAZ DE SE TORNAR UMA -VERDADEIRA- SUPER ESTRELA!"
                                        ]
                                        : [
                                            '<32>{#e/mettaton/5}* DE INÍCIO, EU CONSIDEREI PEGAR PESADO CONTIGO.',
                                            ...(SAVE.data.n.bad_lizard < 2
                                                ? [
                                                    ...(SAVE.data.n.state_foundry_undyne === 1
                                                        ? [
                                                            '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FEZ ALGO QUE FERIU MUITO UM AMIGO MEU.',
                                                            '<32>{#e/mettaton/3}* MAS ENTÃO EU LEMBREI A SUA PARTE BOA.',
                                                            '<32>{#e/mettaton/6}* E DE FATO, VOCÊ TEM FEITO A COISA CERTA POR MUITO TEMPO.',
                                                            "<32>{#e/mettaton/2}* GARANTIDO, EU TENHO MANTIDO UMA CERTA VIGIA EM VOCÊ...",
                                                            "<32>{#e/mettaton/12}* MAS A JULGAR POR COMO VOCÊ ERA ANTES, DUVIDO QUE VOCÊ FARIA ALGO PRECIPITADO."
                                                        ]
                                                        : [
                                                            "<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ NÃO TEM SIDO A MELHOR PESSOA.",
                                                            '<32>{#e/mettaton/3}* MAS ENTÃO EU LEMBREI A SUA PARTE BOA.',
                                                            '<32>{#e/mettaton/6}* E O FATO, DE QUE POR UM TEMPO, VOCÊ TEM FEITO MUITO BEM.'
                                                        ]),
                                                    "<32>{#e/mettaton/5}* QUEM SABE.\n* TALVEZ EU ESTEJA TE DANDO MUITO CRÉDITO.",
                                                    '<32>{#e/mettaton/0}* OU TALVEZ EU SÓ QUEIRA EVITAR CONFUSÃO DESNECESSÁRIA.',
                                                    "<32>{#e/mettaton/20}* AINDA ASSIM, NÃO SIGNIFICA QUE SOMOS MELHORES AMIGOS DO NADA."
                                                ]
                                                : [
                                                    ...(SAVE.data.n.state_starton_papyrus === 1
                                                        ? SAVE.data.n.state_foundry_undyne === 2
                                                            ? rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU TODO MUNDO QUE EU CONHEÇO POR NOME.'
                                                                ]
                                                                : [
                                                                    '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU O PAPYRUS, COMO A UNDYNE.'
                                                                ]
                                                            : rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU PAPYRUS, JUNTO COM A VIDA DE MUITOS GUARDAS REAIS.'
                                                                ]
                                                                : ['<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU O PAPYRUS.']
                                                        : SAVE.data.n.state_foundry_undyne === 2
                                                            ? rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ MATOU A UNDYNE JUNTO COM A VIDA DE MUITOS GUARDAS REAIS.'
                                                                ]
                                                                : ['<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU A UNDYNE.']
                                                            : rgk
                                                                ? [
                                                                    '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU VÁRIOS GUARDAS REAIS.'
                                                                ]
                                                                : [
                                                                    '<32>{#e/mettaton/10}* ATÉ PORQUE... VOCÊ FOI LÁ E MATOU TODA ESSA GENTE.'
                                                                ]),
                                                    '<32>{#e/mettaton/3}* MAS EU ME LEMBRO DO AVISO QUE TE DEI NO LABORATÓRIO REAL.',
                                                    "<32>{#e/mettaton/6}* E O FATO DE QUE DESDE ENTÃO VOCÊ TEM SE COMPORTADO BEM MELHOR.",
                                                    '<32>{#e/mettaton/5}* BEM, BEM.\n* PAREVE QUE AS PESSOAS PODEM MUDAR DEPOIS DE TUDO.',
                                                    '<32>{#e/mettaton/0}* BOM PRA VOCÊ.',
                                                    "<32>{#e/mettaton/20}* MAS ISSO NÃO SIGNIFICA QUE EU SÓ VOU ESQUECER O QUE VOCÊ FEZ."
                                                ]),
                                            '<32>{#e/mettaton/29}* APENAS, PELA SUA CAPACIDADE DE TRAZER UM BOM SHOW...',
                                            "<32>{#e/mettaton/26}* EU CONCORDO EM JOGAR JUSTO.",
                                            "<32>{#e/mettaton/5}* ... TALVEZ, NO FIM, VOCÊ POSSA GANHAR MEU RESPEITO.",
                                            "<32>{#e/mettaton/35}* AGORA.\n* ME MOSTRA QUE VOCÊ É MAIS DO QUE UM ASSASSINO.",
                                            "<32>{#e/mettaton/31}* ME MOSTRA QUE VOCÊ TEM O QUE CAPAZ PARA SER UMA -VERDADEIRA- SUPER ESTRELA!"
                                        ])
                            ])
                    ])
            ],
            end2: ['<32>{#e/mettaton/11}* PRODUTORES!\n* COLOQUEM AS CÂMERAS PARA FUNCIONAR!'],
            endX1: [
                '<32>{#p/mettaton}* MY, MY...\n* COM CERTEZA -VOCÊ- TOMOU SEU TEMPO, HEIN \"QUERIDO\"?',
                '<32>* MAS O DIALOGO SOBRE A SUPERFÍCIE ESTÁ ATRÁS DE NÓS.',
                '<32>* ... O QUE?\n* VOCÊ ACHOU QUE EU GOSTAVA DE VOCÊ ESTE TEMPO TODO?',
                '<32>* SUA POBRE E PATÉTICA CRIANÇA.',
                '<32>* TUDO QUE EU QUERIA ERA FAZER UM SHOW, E EU CONSEGUI.',
                '<32>* DIZENDO TODAS AS PALAVRAS CORRETAS, FAZENDO TODOS OS MOVIMENTOS PERFEITOS...',
                "<32>* É SOBRE ISSO QUE SHOWBUSINESS É.",
                '<32>* NÃO TEM NADA HAVER COM \"FELICIDADE\" OU \"AMIZADE...\"',
                '<32>* TODO QUE IMPORTA É O PODER E A INSUPERÁVEL SUPERIORIDADE DOS ROBÔS!',
                '<32>* ...\n* AGORA ME ESCUTA.',
                "<32>* DEPOIS DE TUDO QUE VOCÊ FEZ, NÃO TEM CHANCE ALGUMA DE EU DEIXAR VOCÊ PASSAR.",
                '<32>* VOCÊ PODE GRITAR.\n* VOCÊ PODE LUTAR.\n* VOCÊ PODE CHAMAR POR MISERICÓRDIA.',
                '<32>* VOCÊ PODE FAZER O QUE QUISER.',
                "<32>* QUANDO EU TE MATAR, VOCÊ NÃO SERÁ NADA ALÉM DE PANO PARA PASSAR NO CHÃO.",
                "<32>* VEJA, EU ME UNI AO CORE E PASSEI SEU PODER DIRETAMENTE PARA MEU CORPO.",
                "<32>* NÃO É COMO EU E A ALPHYS PLANEJAMOS DE COMEÇO, MAS VAI SERVIR BEM.",
                '<32>* QUANDO EU DER O SINAL, OS CABOS IRÃO CAIR, E A BATALHA JÁ TERÁ ACABADO.',
                "<32>* HONESTAMENTE, VOCÊ DEVE TER VISTO ISSO CHEGANDO...",
                "<32>* MAS ISSO DEVE SER ESPERAR DEMAIS DE ALGUÉM QUE SÓ SABE MATAR."
            ],
            endX1x: [
                '<32>{#p/mettaton}* MY, MY...',
                '<32>* ...',
                '<32>* ... POR QUE A CARONA?\n* VOCÊ ESTÁ TÃO DESESPERADO PARA SER SURRADO ATÉ A MORTE?',
                '<32>* VOCÊ ESTÁ?\n* BEM, JÁ QUE INSISTE...'
            ],
            endX2: ["<32>{#e/mettaton/17}* AGORA, ALPHYS!\n* ME ENTREGUE TUDO QUE TEM!"],
            endY1: [
                '<25>{#p/alphys}{#g/alphysSmileSweat}* Okay, você conseguiu!',
                '<25>{#f/3}* Eheh... isso foi mais difícil do que deveria ter sido, hein?',
                "<25>{#g/alphysYeahYouKnowWhatsUp}* Quer dizer, não pra você, já que...",
                '<25>{#g/alphysNeutralSweat}* Você, uh... parece satisfeito com basicamente qualquer coisa.',
                '<25>* ...',
                '<25>{#g/alphysTheFactIs}* ... olha, devemos ir para a Cidadela agora.',
                '<25>{#g/alphysIDK}* O elevador deve estar arrumado agora, então...'
            ],
            endY2: [
                "<25>{#p/alphys}{#g/alphysWelp}* Q-quer saber, eu vou deixar você decidir.",
                "<25>{#g/alphysSmileSweat}* Se você quiser ir agora, então vamos!\n* Ir mais tarde está tudo bem também!",
                '<25>* A onde a \"vela do navio te levar,\" não é?',
                '<25>{#g/alphysTheFactIs}* Sabe, como os navios antigos precisavam do vento nas velas...',
                '<25>{#g/alphysNeutralSweat}* E você tende a especificar como...',
                '<26>{#g/alphysWelp}* Uh, você me entendeu.'
            ],
            endY3: ['<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Bem, te vejo logo!'],
            end3: () => [
                '<32>{#e/mettaton/6}* DAMAS E CAVALHEDAMAS...',
                world.mttvar
                    ? "<33>{#e/mettaton/11}* É HORA DO GRANDE FINAL!"
                    : '<32>{#e/mettaton/10}* VOCÊS ESTÃO PRONTOS PARA O GRANDE FINAL!?!?'
            ],
            end4: [
                '<32>{*}{#e/mettaton/11}* DRAMA REAL!!\n* ROMANCE REAL!!\n* SANGUE DERRAMADO REAL!!{^20}{%}',
                '<32>{*}{#e/mettaton/20}* NO NOSSO NOVO SHOW...{^20}{%}',
                '<32>{*}{#e/mettaton/17}* \"ATAQUE DO ROBÔ ASSASSINO!\"{^20}{%}'
            ],
            end5: () =>
                SAVE.data.b.killed_mettaton
                    ? !world.badder_lizard
                        ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* Oh meu sentir, vocês...']
                        : [
                            '<25>{#p/alphys}{#g/alphysWelp}* ...',
                            '<25>{#g/alphysInquisitive}* Por que você tá olhando pra mim?',
                            SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                                ? "<26>{#g/alphysCutscene3}* Eu não estava longe por..."
                                : "<25>{#g/alphysCutscene3}* Eu estou aqui apenas para..."
                        ]
                    : !world.badder_lizard
                        ? ['<25>{#p/alphys}{#g/alphysOhGodNo}* Oh meu senhor, vocês estão bem??']
                        : [
                            '<25>{#p/alphys}{#g/alphysWelp}* ...',
                            '<25>{#g/alphysInquisitive}* Por que você tá olhando pra mim?',
                            SAVE.data.n.bad_lizard === 1 && SAVE.data.b.bad_lizard
                                ? "<26>{#g/alphysCutscene3}* Eu não estive longe por TANTO tempo."
                                : "<25>{#g/alphysCutscene3}* Eu só estou aqui para olhar o Mettaton."
                        ],
            end6: () =>
                SAVE.data.b.killed_mettaton
                    ? ["<25>{#p/alphys}{#f/10}* Ca...cadê o Mettaton?", '<25>{#p/alphys}{#f/3}* V-você m...']
                    : !world.badder_lizard
                        ? [
                            '<25>{#p/alphys}{#g/alphysInquisitive}* Hmm, você parece bem...',
                            '<25>{#p/alphys}{#g/alphysWelp}* Desculpe por ter desaparecido no telefone mais cedo, a propósito.',
                            "<25>{#g/alphysWelp}* O sinal não chega aqui por algum motivo."
                        ]
                        : [
                            '<25>{#g/alphysHaveSomeCompassion}* ...',
                            '<25>{#g/alphysHaveSomeCompassion}* Olha, só... vem comigo para a próxima sala.',
                            world.baddest_lizard
                                ? "<25>{#g/alphysNeutralSweat}* Tem algo que eu preciso te dizer."
                                : "<25>{#g/alphysNeutralSweat}* Q-quando você estiver pronto, claro."
                        ],
            end7: () =>
                SAVE.data.b.killed_mettaton
                    ? [
                        "<25>{#p/alphys}{#f/10}* M-ME desculpa.\n* Eu não acho que deveria estar aqui agora.",
                        "<25>{*}{#p/alphys}{#f/3}* N-não vem atrás de mim!{%}"
                    ]
                    : [
                        "<25>{#p/alphys}{#g/alphysCutscene2}* Bem, uh, não se preocupe com o Mettaton, eu posso dar energia pra ele de novo.",
                        "<25>{#p/alphys}{#g/alphysCutscene2}* Ele está fundido apenas com o chip de controle, de toda forma."
                    ],
            end8: [
                '<25>{#p/alphys}{#g/alphysWelp}* Eu deveria ir indo.',
                '<25>{#g/alphysNeutralSweat}* M-mas, uh, eu meio que preciso de vocês vindo comigo.',
                '<25>{#g/alphysNervousLaugh}* O futuro da raça monstro... depende de d-disso...'
            ],
            end9: [
                "<25>{#p/alphys}{#g/alphysNervousLaugh}* Só...\n* Q-quando você estiver pronto...",
                '<25>{#g/alphysNeutralSweat}* Vem comigo para a próxima sala.',
                '<25>{#g/alphysSideSad}* ...',
                "<25>{#g/alphysNeutralSweat}* D-desculpa.\n* Não tem outra forma."
            ],
            end10: () => [
                world.baddest_lizard
                    ? "<32>{#p/mettaton}* Bem, querido...\n* Acho que deve ser uma boa ideia ir com ela."
                    : "<32>{#p/mettaton}* Não tema, provavelmente é só uma nova temporada do anime sci-fi que ela gosta.",
                '<32>* Já para mim?',
                '<32>* ...\n* Depois que Alphys me por em meu antigo corpo...',
                SAVE.data.b.a_state_hapstablook
                    ? '<32>* Eu devo ir ver minha família.'
                    : SAVE.data.n.state_starton_papyrus === 1
                        ? "<32>* Eu não tenho certeza do que fazer."
                        : "<32>* Eu tenho alguns negócios dos quais devo tratar.",
                ...(SAVE.data.b.oops
                    ? []
                    : [
                        '<32>* Oh, e a propósito, $(name)...',
                        '<32>{#p/basic}* Huh?',
                        '<32>{#p/mettaton}* ... Te desejo boa sorte com seus assuntos de família também.',
                        '<32>{#p/basic}* Cara... oh.',
                        '<32>{#p/basic}* Certo.',
                        '<32>{#p/basic}* ... valeu, Mettaton.'
                    ]),
                '<32>{#p/mettaton}* Heh...',
                world.bad_lizard > 1
                    ? '<32>* Até a próxima...\n* ...\n* ... humano.'
                    : iFancyYourVilliany()
                        ? '<32>* Obrigado pelo show...\n* ...\n* ... $(moniker2).'
                        : '<32>* Te vejo por aí...\n* ...\n* ... Querido.'
            ],
            end11: () => [
                '<32>{#p/human}* (Você escuta um chorinho.)',
                '<32>{#p/basic}* ... todas essas coisas de família com Mettaton estão batendo um pouco perto de casa.',
                "<32>* Blooky... não foi o único que cometeu esse tipo de erro com as pessoas.",
                '<32>* ...',
                "<32>* Eu acho, que por agora.\nEu só vou ter que fazer meu melhor para continuar seguindo em frente...",
                '<32>* ...\n* Vamos lá, parceiro.',
                "<32>* Vamos para casa."
            ],
            endwalk0: () => [
                ...(SAVE.data.b.water
                    ? [
                        "<25>{#p/alphys}{#g/alphysFR}* Não me diz que você tá trazendo isso até a Cidadela.",
                        world.badder_lizard ? '<25>{#g/alphysNeutralSweat}* ...' : '<25>{#g/alphysWelp}* ...'
                    ]
                    : []),
                world.badder_lizard
                    ? '<25>{#p/alphys}{#g/alphysHaveSomeCompassion}* Siga-me.'
                    : '<25>{#p/alphys}{#g/alphysWelp}* Por aqui.'
            ],
            endwalk1: () =>
                !world.badder_lizard
                    ? [
                        '<25>{#p/alphys}{#g/alphysCutscene2}* Então... Mettaton, huh?',
                        "<25>* Eheh... isso com certeza foi algo louco, não foi?",
                        "<25>{#g/alphysSideSad}* Q-quer dizer, eu pensei que as baterias iriam durar mais, mas...",
                        "<25>{#g/alphysUhButHeresTheDeal}* Bem, d-deve ser só um problema de modelo.\n* Fácil para arrumar.",
                        "<25>{#g/alphysWelp}* ... mas é pra isso que você está aqui."
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ... Olha, eu...',
                        ...(world.alphys_percieved_kills < 10
                            ? [
                                "<25>{#g/alphysHaveSomeCompassion}* Me desculpa por sair correndo daquela forma.",
                                ...(SAVE.data.n.state_foundry_undyne === 0
                                    ? ["<25>{#g/alphysSideSad}* É só que... depois daquelas mortes em Aerialis, eu..."]
                                    : world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                                        ? ["<25>{#g/alphysSideSad}* É só que... d-depois da morte da Undyne, eu..."]
                                        : [
                                            "<25>{#g/alphysSideSad}* É só que... depois da m-morte da Undyne, e...",
                                            '<25>{#g/alphysSideSad}* Depois daquelas mortes em Aerialis, eu...'
                                        ]),
                                "<25>{#g/alphysThatSucks}* ... Eu não sabia o que fazer."
                            ]
                            : [
                                "<25>{#g/alphysHaveSomeCompassion}* Eu sei que você matou muitas pessoas.",
                                ...(SAVE.data.n.kills_aerialis / 2 +
                                    SAVE.data.n.corekills +
                                    (SAVE.data.b.killed_knightknight ? 1 : 0) +
                                    (SAVE.data.b.killed_madjick ? 1 : 0) >
                                    2
                                    ? [
                                        "<25>{#g/alphysSideSad}* Mesmo após fugir do laboratório, eu c-continuei te assistindo...",
                                        '<25>{#g/alphysSideSad}* Da área dos estágios...\n* Pelo CORE...'
                                    ]
                                    : [
                                        "<25>{#g/alphysSideSad}* Desde o laboratório, eu t-tenho te assistido desde que você apareceu...",
                                        '<25>{#g/alphysSideSad}* Por Starton...\n* Pela Foundry...'
                                    ]),
                                "<25>{#g/alphysNeutralSweat}* Em algum momento você pensou na vida daqueles monstros?",
                                '<25>{#g/alphysThatSucks}* Sobre o que os... a-amigos e famílias pensariam?',
                                ...(world.alphys_percieved_kills < 20
                                    ? [
                                        '<25>{#g/alphysNeutralSweat}* ...',
                                        '<25>{#g/alphysNeutralSweat}* Eu sei que poderia ter feito um trabalho melhor te escoltando, então...',
                                        "<25>{#g/alphysHaveSomeCompassion}* Talvez eu tenha parte da culpa no que aconteceu."
                                    ]
                                    : [
                                        "<25>{#g/alphysIDK3}* Eu tenho pensado muito sobre isso.",
                                        '<25>{#g/alphysHaveSomeCompassion}* Eu culpo a mim mesma por deixar acontecer, mas...',
                                        '<25>{#g/alphysIDK2}* É realmente minha culpa que você tenha matado todas essas pessoas?'
                                    ])
                            ])
                    ],
            endwalk2: () =>
                !world.baddest_lizard
                    ? [
                        ...(!world.badder_lizard
                            ? ["<25>{#p/alphys}{#g/alphysWelp}* Olha, eu só vou chegar logo no ponto."]
                            : [
                                "<25>{#p/alphys}{#f/3}* Mas, uh, eu realmente não quero me debruçar sobre isso agora, então...",
                                "<25>{#p/alphys}{#f/20}* ... eu só vou chegar logo no ponto."
                            ]),
                        "<25>{#g/alphysNeutralSweat}* Tem uma... razão pela qual eu tenho te assistindo por todo esse tempo.",
                        '<25>* ...',
                        '<25>{#g/alphysFR}* Pra colocar mais simplesmente...',
                        "<25>{#g/alphysFR}* ASGORE tem um {@fill=#003cff}segredo{@fill=#fff}."
                    ]
                    : [
                        ...(SAVE.data.n.state_foundry_undyne === 2
                            ? [
                                ...(world.alphys_percieved_kills < 10
                                    ? ['<25>{#p/alphys}{#g/alphysIDK3}* ...']
                                    : ['<25>{#p/alphys}{#g/alphysIDK3}* O que mais me dói é... Undyne.']),
                                '<25>{#p/alphys}{#g/alphysIDK3}* Se tinha um monstro que mais desejava nossa liberdade...',
                                '<25>{#p/alphys}{#g/alphysIDK2}* Mais do que qualquer outro, era ela.',
                                '<25>{#p/alphys}{#g/alphysSideSad}* Ela sempre lutou por nossa liberdade, e por justiça...',
                                ...(world.alphys_percieved_kills < 10
                                    ? [
                                        '<25>{#p/alphys}{#g/alphysSmileSweat}* E talvez ela tenho sido meio violenta contigo...',
                                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ... mas...'
                                    ]
                                    : [
                                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* E é como se você nem ligasse.",
                                        '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...'
                                    ]),
                                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* Ela foi minha heroína.',
                                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* Uma pessoa que eu... sempre quis proteger.',
                                '<25>{#p/alphys}{#g/alphysNeutralSweat}* Uma pessoa que me deu liberdade.',
                                '<25>{#p/alphys}{#g/alphysThatSucks}* ... mas ver ela ser morta tão facilmente, foi como...',
                                '<25>{#p/alphys}{#g/alphysIDK2}* ... como ver aquela esperança se tornar em poeira.',
                                '<25>{#p/alphys}{#g/alphysIDK2}* Quebrada em pedaços.',
                                '<25>{#p/alphys}{#g/alphysIDK3}* Perdida pra sempre.',
                                "<25>{#p/alphys}{#g/alphysIDK3}* E foi você quem fez isso acontecer.",
                                '<25>{#p/alphys}{#g/alphysIDK2}* ...'
                            ]
                            : ['<25>{#p/alphys}{#g/alphysThatSucks}* ...']),
                        "<25>* De toda forma, não... tem nada que eu possa fazer.",
                        "<25>{#p/alphys}{#g/alphysNeutralSweat}* O que acontece agora já não está mais em minhas mãos."
                    ],
            endwalk3: () =>
                !world.baddest_lizard
                    ? [
                        "<25>{#p/alphys}{#g/alphysSideSad}* Eu... não posso dizer muito sobre, agora...",
                        '<25>{#g/alphysNeutralSweat}* Como cientista real, meu trabalho é te escoltar com segurança até o rei.',
                        "<26>{#g/alphysWorried}* Se qualquer pessoa d-descobrir, eles vão pensar que estamos contra nossa própria liberdade.",
                        "<25>{#g/alphysHaveSomeCompassion}* ...\n* Nós estamos apenas tentando fazer a coisa certa."
                    ]
                    : world.alphys_percieved_kills < 10
                        ? [
                            "<25>{#p/alphys}{#g/alphysIDK2}* ... não que eu esteja reclamando ou coisa do tipo.",
                            "<25>{#p/alphys}{#g/alphysIDK3}* Eu não estava apta para acompanhá-lo de qualquer maneira."
                        ]
                        : world.alphys_percieved_kills < 20 || SAVE.data.n.state_foundry_undyne !== 2
                            ? [
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* ... não que eu esteja reclamando ou coisa do tipo.",
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* Eu não quero realmente estar perto de você."
                            ]
                            : [
                                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* ... você tem sorte, sabe?",
                                "<26>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* Se não fosse meu trabalho te proteger, eu teria te matado por conta própria."
                            ],
            endwalk4: () =>
                !world.baddest_lizard
                    ? [
                        "<25>{#p/alphys}{#g/alphysWelp}* ... você pode ir em frente.\n* Eu vou tentar não ficar tão atrás.",
                        "<25>{#g/alphysSide}* Tudo vai ficar bem, tudo bem?",
                        ...(world.postnoot
                            ? world.nootflags.has('undyne') // NO-TRANSLATE

                                ? ['<25>{#g/alphysWelp}* ... ah não ser pelo mal funcionamento do sistema atmosférico.']
                                : ["<25>{#g/alphysInquisitive}* ... mesmo que tenha algo estranho com o ar..."]
                            : [])
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysThatSucks}* ... vá.\n* Faça seja lá o que o ASGORE quer que você faça.',
                        "<25>{#g/alphysNeutralSweat}* Você não é mais meu problema.",
                        ...(world.postnoot
                            ? world.nootflags.has('undyne') // NO-TRANSLATE

                                ? ['<25>{#g/alphysFR}* ... já o sistema atmosférico...']
                                : ["<25>{#g/alphysFR}* ... seja o que tiver no ar..."]
                            : [])
                    ]
        },
        overworld: {
            DINNERTIME: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (Você se inclina e olha para a mesa de lado.)\n* (É mais fina do que parece.)",
                        ...[
                            [
                                "<26>{#p/asriel1}{#f/20}* É.\n* Não tem nenhuma louça aqui.",
                                '<26>{#f/15}* Mettaton, uh, tinha alguns planos para essa sala.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* Se eu me lembro corretamente... ele queria apresentar um sitcom aqui.',
                                '<25>{#f/15}* Sobres nossas festas de jantar.',
                                "<25>{#f/16}* ... seria tão entediante quanto soa."
                            ],
                            [
                                "<26>{#p/asriel1}{#f/17}* Felizmente, boa parte das comidas de monstro não precisam de louças para serem ingeridas.",
                                '<25>{#f/20}* E quando precisam, as louças também fazem parte da comida...',
                                "<25>{#f/17}* Mas acho que você já está acostumado com isso a essa altura."
                            ],
                            ['<25>{#p/asriel1}{#f/4}* Só esteja feliz que aquele show horrível nunca aconteceu.']
                        ][Math.min(asrielinter.dinnertime++, 3)]
                    ]
                    : ["<32>{#p/basic}* É uma mesa.\n* Os pratos e talheres são pintados."],
            doublefridge1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você coloca seu ouvido contra a porta do freezer.)\n* (Um vento pode ser escutado.)']
                    : ["<32>{#p/basic}* É um freezer de alta segurança.\n* Ambos os lados contém suco de laranja."],
            doublefridge2: () => [
                ...(SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que uma das latas dentro já foi aberto...)']
                    : ['<32>{#p/basic}* Uma das latas já foi aberta...']),
                choicer.create('* (Pegar a lata aberta?)', 'Sim', 'Não')
            ],
            doublefridge3: ["<32>{#p/human}* (Você está carregando muito.)"],
            doublefridge4: ['<32>{#p/human}* (Você pegou o suco de laranja.)'],
            doublefridge5: ['<32>{#p/human}* (Você decide não pegar nada.)'],
            labcamera2: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Parece estar completamente offline.)']
                        : SAVE.data.n.plot === 72
                            ? world.darker
                                ? ["<32>{#p/basic}* Está offline."]
                                : ['<32>{#p/basic}* Anonimato finalmente.']
                            : ["<32>{#p/basic}* É provavelmente para o melhor não questionar como isso funciona."],
            labdisplay: 'O Humano\nEXP $(x)\nHP  $(y)\nG   $(z)\nDIS $(w)',
            exofountain1: () => [
                SAVE.data.b.svr
                    ? '<32>{#p/human}* (Você sente vontade de beber de uma fonte de ponche.)'
                    : '<32>{#p/basic}* A fonte extravagante está cheia de ponche exuberante.',
                choicer.create('* (Dar uma golada?)', 'Sim', 'Não')
            ],
            exofountain2a: ['<32>{#p/human}* (Você decide não provar.)'],
            exofountain2b: () => [
                '<32>{#p/human}* (Você bebe da fonte.)\n* (HP totalmente restaurado.)',
                ...(world.genocide && SAVE.flag.n.ga_asrielDrink++ < 1
                    ? ['<25>{#p/asriel2}{#f/15}* Você é bem maluco.']
                    : [])
            ],
            kneeler: [
                "<32>{#p/human}* (Você checa a cabeça de Asriel para ter certeza que é seguro subir.)",
                '<25>{#p/asriel2}{#f/16}* Por que você é assim.'
            ],
            kneeler2: ['<25>{#p/asriel2}{#f/8}* Obrigado, eu acho.'],
            topdesk1: () =>
                SAVE.data.b.svr || world.bad_lizard > 1 || world.genocide || SAVE.data.n.state_foundry_undyne === 2
                    ? ["<32>{#p/human}* (Você se maravilha com as imagens na tela do computador.)\n* (Deve ser devaneio.)"]
                    : [
                        '<32>{#p/basic}* O computador está no modo descanso.\n* Ligar?',
                        choicer.create('* (Ligar o computador?)', 'Sim', 'Não')
                    ],
            topdesk2: ['<32>{#p/human}* (Você decidiu não ligar.)'],
            topdesk3: ["<32>{#p/basic}* Está aberto em algum tipo de emulador de vídeo game."],
            labstationA: ["<32>{#p/basic}* Está aberto em um controle de painel para a linha de telescópio."],
            labstationB: ["<32>{#p/basic}* Está aberto a um conjunto de planos de design para um ambiente holográfico."],
            laserbarrrier1: () =>
                world.darker
                    ? ["<32>{#p/basic}* É um escudo de segurança."]
                    : ["<32>{#p/basic}* De acordo com o padrão da guilda dos artesãos, um campo de força intransponível circunda a área."],
            
            laserbarrrier2: pager.create(
                0,
                ['<32>{#p/basic}* Apenas um caminho a frente agora.'],
                ["<32>{#p/basic}* Não tem nada especial aqui."],
                ['<32>{#p/basic}* ...'],
                ['<32>{#p/basic}* ...'],
                ['<32>{#p/basic}* Sério agora.'],
                ['<32>{#p/basic}* ...'],
                ['<32>{#p/basic}* ...'],
                ["<32>{#p/basic}* Você não tem nada mais inteligente pra fazer?"]
            ),
            barricade: ['<32>{#p/basic}* A barricada bloqueia seu caminho.'],
            puzzle1done: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha para a tela preta do terminal.)']
                    : ["<32>{#p/basic}* É inerte."],
            lablizard: {
                a: pager.create(
                    0,
                    () =>
                        SAVE.data.n.plot < 51
                            ? [
                                '<25>{#p/alphys}{#g/alphysSideSad}* Desculpa por toda essa coisa com o Mettaton...',
                                '<25>{#g/alphysSideSad}* Ele, uh...',
                                '<25>{#g/alphysNervousLaugh}* Ele pode ficar um pouco agitado as vezes, ehehe.'
                            ]
                            : SAVE.data.n.plot < 52
                                ? [
                                    "<25>{#p/alphys}{#g/alphysCutscene2}* Graças a tudo aqueles guardas não te atacaram.",
                                    "<25>{#g/alphysNeutralSweat}* Eu tentei colocar um memorial real para mantê-los longe de você...",
                                    '<25>{#g/alphysWelp}* Com esperança, uh, deve t-ter alcançado eles.'
                                ]
                                : SAVE.data.n.plot < 54
                                    ? [
                                        "<25>{#p/alphys}{#g/alphysInquisitive}* O-olha, eu não sei as respostas aqui melhor do lá fora...",
                                        "<25>{#g/alphysSmileSweat}* Eu vou te ligar quando vocês voltar para as barricadas."
                                    ]
                                    : SAVE.data.n.plot < 56
                                        ? [
                                            "<25>{#p/alphys}{#g/alphysSideSad}* Os quebras-cabeças em Aerialis não foram atualizados ainda...",
                                            "<25>{#g/alphysWelp}* É bem difícil encontrar tempo quando estou ocupada com meu trabalho."
                                        ]
                                        : SAVE.data.n.plot < 58
                                            ? [
                                                '<25>{#p/alphys}{#g/alphysCutscene1}* Eu tenho o hábito de esquecer de desligar m-meus experimentos.',
                                                "<25>{#g/alphysCutscene2}* Por um segundo, eu pensei que esse hábito poderia ter salvo você!",
                                                '<25>{#g/alphysUhButHeresTheDeal}* Mas, uh, acho que o Mettaton tinha um plano B.'
                                            ]
                                            : SAVE.data.n.plot < 59
                                                ? [
                                                    '<25>{#p/alphys}{#g/alphysWelp}* Não me fala.\n* Sans está vendendo seu \"cachorros quente\" de novo.',
                                                    "<25>{#g/alphysCutscene2}* É, isso é... basicamente o que ele faz.\n* É perfeitamente normal."
                                                ]
                                                : SAVE.data.n.plot < 60
                                                    ? [
                                                        "<25>{#p/alphys}{#g/alphysCutscene2}* Eu sinto que o Mettaton está se preparando para outro show.",
                                                        "<25>{#g/alphysTheFactIs}* Eu... t-tomaria cuidado se fosse você."
                                                    ]
                                                    : SAVE.data.n.plot < 61
                                                        ? SAVE.data.b.a_state_moneyitemC
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* Eu sei o que você fez.']
                                                            : [
                                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                                '<25>* Mettaton está se tornando mais e mais imprudente.'
                                                            ]
                                                        : SAVE.data.n.plot < 66.1
                                                            ? [
                                                                '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                                                                "<25>{#g/alphysCutscene1}* Não é super legal quando a Guarda Real não segue minhas ordens?!"
                                                            ]
                                                            : SAVE.data.n.plot < 67.1
                                                                ? ["<25>{#p/alphys}{#g/alphysWelp}* Nesse ritmo, você nunca vai chegar no CORE."]
                                                                : [
                                                                    "<25>{#p/alphys}{#g/alphysCutscene2}* É, eu... ainda estou a-aqui e tals.",
                                                                    '<25>{#g/alphysWelp}* Não que tenha restado muito o que eu possa fazer.'
                                                                ],
                    () =>
                        SAVE.data.n.plot < 51
                            ? [
                                "<26>{#p/alphys}{#g/alphysWelp}* Não posso culpa-lo.",
                                "<25>{#g/alphysWelp}* Ele é o maior fã da humanidade que você vai conhecer."
                            ]
                            : SAVE.data.n.plot < 52
                                ? ['<25>{#p/alphys}{#g/alphysCutscene3}* Você nunca sabe nos dias de hoje...']
                                : SAVE.data.n.plot < 54
                                    ? [
                                        '<25>{#p/alphys}{#g/alphysWelp}* Eu acho que se as coisas realmente derem errado, eu posso simplesmente substituí-las.',
                                        "<25>{#g/alphysNeutralSweat}* M-mas aquilo os coloca fora de ação por um tempo."
                                    ]
                                    : SAVE.data.n.plot < 56
                                        ? ["<25>{#p/alphys}{#g/alphysWelp}* Você não acreditaria no tempo que eu fiquei presa nesse nível."]
                                        : SAVE.data.n.plot < 58
                                            ? SAVE.data.n.state_aerialis_crafterresult === 0
                                                ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Uma tristeza que você nunca olhou seu novo celular...']
                                                : ['<25>{#p/alphys}{#g/alphysCutscene2}* Não vou mentir, te ver usar a mochila a jato foi muito da hora.']
                                            : SAVE.data.n.plot < 59
                                                ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* Perfeitamente normal.']
                                                : SAVE.data.n.plot < 60
                                                    ? ["<25>{#p/alphys}{#g/alphysWelp}* Quem sabe que tipo de travessuras ele vai fazer."]
                                                    : SAVE.data.n.plot < 61
                                                        ? SAVE.data.b.a_state_moneyitemC
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                                                            : ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
                                                        : SAVE.data.n.plot < 67.1
                                                            ? ['<25>{#p/alphys}{#g/alphysFR}* Se chama \"sarcasmo\".']
                                                            : ['<25>{#p/alphys}{#g/alphysCutscene3}* Mettaton deve estar esperando cheio da paciência agora.']
                )
            },
            mettacrafter1a: ['<32>{#p/mettaton}* NÃO A TEMPO IGUAL AO PRESENTE!'],
            mettacrafter1b: ["<32>{#p/mettaton}* EU ACHO QUE VOCÊ AINDA ESTÁ ESQUECENDO ALGUMAS COISAS."],
            mettacrafter1c: ["<32>{#p/mettaton}* EU ACHO QUE VOCÊ AINDA ESTÁ ESQUECENDO ALGUMAS COISAS."],
            mettacrafter2a: ['<32>{#p/mettaton}* BELO TRABALHO!\n* AGORA COLOCA TUDO AQUI NA MESA DO MEU LADO.'],
            mettacrafter2b: ['<32>{#p/mettaton}* BELO TRABALHO!\n* AGORA COLOCA O RESTANTE NA MESA DO MEU LADO.'],
            mettacrafter2c: ['<32>{#p/mettaton}* BELO TRABALHO!\n* AGORA COLOQUE O ÚLTIMO ITEM AQUI NA MESA DO MEU LADO.'],
            platformDeny: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : [
                        "<32>{#p/basic}* Você vai precisar de um passe especial para acessar essa rede.",
                        ...(world.goatbro
                            ? SAVE.data.n.plot < 49
                                ? !SAVE.flag.b.asriel_phone && SAVE.flag.n.ga_asrielGate++ < 1
                                    ? [
                                        "<25>{#p/asriel2}{#f/3}* Sem dúvidas que terá um passe no laboratório da Alphys.\n* Vamos lá primeiro."
                                    ]
                                    : [] 
                                : SAVE.flag.b.asriel_phone
                                    ? 
                                    SAVE.flag.n.ga_asrielGetThePhone > 0
                                        ? 
                                        SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                            ? [
                                                "<25>{#p/asriel2}{#f/6}* Sério, $(name)?\n* Você sabe onde o celular reserva da Alphys está.",
                                                '<25>{#p/asriel2}{#f/7}* Volta lá no desk dela e pega logo.'
                                            ]
                                            : 
                                            []
                                        : 
                                        SAVE.flag.n.ga_asrielGetThePhone2++ < 1
                                            ? [
                                                "<25>{#p/asriel2}{#f/3}* Lembre-se, nós precisamos do celular da Alphys no laboratório.",
                                                "<25>{#p/asriel2}{#f/4}* Eu tenho certeza que está no desk dela..."
                                            ]
                                            : 
                                            ["<25>{#p/asriel2}{#f/3}* Lembre-se, o celular da Alphys no laboratório."]
                                    : 
                                    [
                                        [
                                            '<25>{#p/asriel2}{#f/3}* Alphys normalmente deixa os passes das máquinas de vôo no celular.',
                                            '<25>* Eu acho que vi um lá no laboratório.\n* Vá pegar.'
                                        ],
                                        [
                                            "<25>{#p/asriel2}{#f/7}* $(name), nós não conseguiremos continuar sem o passe.",
                                            '<25>{#f/6}* Vamos encontrar.'
                                        ],
                                        ['<25>{#p/asriel2}{#f/13}* Uh... $(name)?'],
                                        ['<25>{#p/asriel2}{#f/13}* ...']
                                    ][Math.min(SAVE.flag.n.ga_asrielGetThePhone++, 3)]
                            : world.bad_lizard > 1 && 49 <= SAVE.data.n.plot
                                ? ["<32>* Não tinha um celular reserva no desk da Alphys?"]
                                : SAVE.data.n.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne === 1 && 49 <= SAVE.data.n.plot
                                    ? ["<32>* ... talvez tenha um no laboratório em algum lugar?"]
                                    : [])
                    ],
            lift: {
                elevatorStory1: () =>
                    SAVE.data.n.plot < 64
                        ? [choicer.create('* (Onde você gostaria de ir?)', 'Piso R2', 'Cancelar')]
                        : [choicer.create('* (Onde você gostaria de ir?)', 'Piso R2', 'Piso L2', 'Piso L3', 'Cancelar')],
                elevatorStory2: () =>
                    SAVE.data.n.plot < 64
                        ? [choicer.create('* (Onde você gostaria de ir?)', 'Piso R1', 'Cancelar')]
                        : [choicer.create('* (Onde você gostaria de ir?)', 'Piso R1', 'Piso L2', 'Piso L3', 'Cancelar')],
                elevatorStory3: () => [
                    choicer.create('* (Onde você gostaria de ir?)', 'Piso L3', 'Piso R1', 'Piso R2', 'Cancelar')
                ],
                elevatorStory4: () => [
                    choicer.create('* (Onde você gostaria de ir?)', 'Piso L2', 'Piso R1', 'Piso R2', 'Cancelar')
                ],
                elevatorStory5: () => [
                    "<32>{#p/basic}* Está desativado.",
                    ...(world.goatbro && SAVE.flag.n.ga_asrielLiftE++ < 1
                        ? ["<25>{#p/asriel2}{#f/8}* Acho que só tem um caminho agora."]
                        : [])
                ],
                elevatorStory6: (citadel = false) =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (O elevador parece ter parado de funcionar.)']
                        : postSIGMA()
                            ? ["<32>{#p/basic}* Está fora de serviço."]
                            : [
                                "<32>{#p/basic}* Está desativado.",
                                ...(world.goatbro && (citadel ? SAVE.flag.n.ga_asrielLiftC++ : SAVE.flag.n.ga_asrielLift++) < 1
                                    ? citadel
                                        ? ['<25>{#p/asriel2}{#f/8}* Sem elevador pra gente.']
                                        : ["<25>{#p/asriel2}{#f/8}* Acho que vamos ter que encontrar outro caminho."]
                                    : [])
                            ],
                elevator1: () => [
                    '<32>{#p/human}* (Onde você gostaria de ir?)',
                    choicer.create('', 'Piso L1', 'Cancelar', 'Piso L2', 'Piso R2', 'Piso L3', 'Piso R3')
                ],
                elevator2: () => [
                    '<32>{#p/human}* (Onde você gostaria de ir?)',
                    choicer.create('', 'Piso L1', 'Piso R1', 'Piso L2', 'Cancelar', 'Piso L3', 'Piso R3')
                ],
                elevator3: () => [
                    '<32>{#p/human}* (Onde você gostaria de ir?)',
                    choicer.create('', 'Piso L1', 'Piso R1', 'Cancelar', 'Piso R2', 'Piso L3', 'Piso R3')
                ],
                elevator4: () => [
                    '<32>{#p/human}* (Onde você gostaria de ir?)',
                    choicer.create('', 'Piso L1', 'Piso R1', 'Piso L2', 'Piso R2', 'Cancelar', 'Piso R3')
                ],
                elevator5: () => [
                    '<32>{#p/human}* (Onde você gostaria de ir?)',
                    choicer.create('', 'Piso L1', 'Piso R1', 'Piso L2', 'Piso R2', 'Piso L3', 'Cancelar')
                ],
                elevator6: () => [
                    '<32>{#p/human}* (Onde você gostaria de ir?)',
                    choicer.create('', 'Cancelar', 'Piso R1', 'Piso L2', 'Piso R2', 'Piso L3', 'Piso R3')
                ]
            },
            terminal1: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (O terminal parece ter desligado.)']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Você ativa o terminal e lê os registros de informações.)',
                                '<32>{#p/basic}* \"Registro de atividades, K-615.09\"',
                                '<32>* \"A análise automatizada de dados confirma várias mudanças repentinas nas posições das estrelas.\"',
                                '<32>* \"Conclusão... a lógica de passagem do tempo dentro do escudo de força foi interrompido.\"',
                                '<32>* \"O diferencial de tempo estimado coloca a data real em aproximadamente K-625,09, dez órbitas depois.\"'
                            ]
                            : [
                                '<32>{#p/human}* (Você ativa o terminal e lê os registros de informações.)',
                                '<32>{#p/basic}* \"Registro de atividades, K-615.08\"',
                                '<32>* \"O sujeito foi deixado sem vigilância por um curto período de tempo.\"',
                                '<32>* \"...\"',
                                '<32>* \"A flor fugiu.\"',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielTerminal1++ < 1
                                    ? ['<25>{#p/asriel2}{#f/9}* Me pergunto o que aconteceu.']
                                    : [])
                            ],
            terminal2: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (O terminal parece ter desligado.)']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                '<32>{#p/basic}* \"O Lab. Real está fechado!\"\n* \"Obrigado a todos por seus fortes trabalhos e dedicação.\"'
                            ]
                            : world.bad_lizard < 2
                                ? [
                                    '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                    '<#32>{#p/basic}* \"Kahaha, Glyde esteve aqui!\"\n  - Glyde'
                                ]
                                : [
                                    '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                    '<32>{#p/basic}* \"Me desculpe, todo mundo...\"'
                                ],
            terminal3: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (O terminal parece ter desligado.)']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                '<32>{#p/basic}* \"O Lab. Real está fechado!\"\n* \"Obrigado a todos por seus fortes trabalhos e dedicação.\"'
                            ]
                            : [
                                '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                '<32>{#p/basic}* \"Queridos trabalhadores do Laboratório Real, por favor depositar restos de pesquisa no local correto.\"'
                            ],
            terminal4: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (O terminal parece ter desligado.)']
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                '<32>{#p/basic}* \"O Lab. Real está fechado!\"\n* \"Obrigado a todos por seus fortes trabalhos e dedicação.\"'
                            ]
                            : [
                                '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                                ...(world.bad_lizard > 1 || world.genocide
                                    ? ['<32>{#p/basic}* \"O Lab. Real não é mais seguro. Procedência de evacuação em andamento.\"']
                                    : ['<32>{#p/basic}* \"Bem-vindo ao Laboratório Real.\"'])
                            ],
            terminal5: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (O terminal parece ter desligado.)']
                        : [
                            '<32>{#p/human}* (Você ativa o terminal e lê a mensagem.)',
                            ...(world.bad_lizard < 2 && SAVE.data.n.plot < 72
                                ? [
                                    [
                                        '<32>{#p/basic}* Torre dois, marcando ponto.',
                                        "<32>* Nós estaremos no rec center...",
                                        "<32>* ... não estaremos, garota?"
                                    ],
                                    [
                                        '<32>{#p/basic}* Torre dois, reportando.',
                                        "<32>* Nós vimos o humano entrando em um elevador.",
                                        '<32>* Desculpa, Alphys...',
                                        "<32>* ... nós não treinamos para capturar um humano este tempo todo só para protegê-lo."
                                    ]
                                ][SAVE.data.n.state_aerialis_royalguards]
                                : ['<32>{#p/basic}* \"Sem data acessível.\"'])
                        ],
            recycler: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não consegue ver o que está na lixeira...)"]
                    : ["<32>{#p/basic}* É uma lixeira."],
            recyclerX: ['<32>{#p/human}* (Você descartou o fluido de eletro-amortecimento.)'],
            ingredient1: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* (Você encontrou o pó feliz.)']
                    : ['<32>{#p/human}* (Você encontrou o hexógeno.)'],
            ingredient2: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* (Você encontrou o soro de formigamento.)']
                    : ['<32>{#p/human}* (Você encontrou o adipato de dioctilo.)'],
            ingredient3: () =>
                iFancyYourVilliany()
                    ? ['<32>{#p/human}* (Você encontrou o óleo do amor.)']
                    : ['<32>{#p/humano}* (Você encontrou o óleo mineral.)'],
            boop: () =>
                [
                    ['<25>{#p/asriel2}{#f/13}* $(name), uh...', '<25>{#p/asriel2}{#f/18}* O que você está fazendo...?'],
                    ['<25>{#p/asriel2}{#f/18}* Qu-\n* $(name)!', '<25>{#p/asriel2}{#f/18}* Você acabou de... cutucar meu focinho?'],
                    ['<25>{#p/asriel2}{#f/18}* Ah-\n* Para com isso!'],
                    ['<25>{#p/asriel2}{#f/18}* Sério para!'],
                    ['<25>{#p/asriel2}{#f/13}* ... $(name)?'],
                    ['<25>{#p/asriel2}{#f/15}* $(name).'],
                    ['<25>{#p/asriel2}{#f/13}* Você está bem, $(name)?'],
                    ["<25>{#p/asriel2}{#f/16}* ... Eu vou esperar."],
                    ['<25>{#p/asriel2}{#f/15}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielBoop++, 8)],
            nuzzle: () =>
                [
                    ['<25>{#p/asriel1}{#f/13}* Frisk...?', '<25>{#p/asriel1}{#f/17}* Espaço pessoal...'],
                    ['<25>{#p/asriel1}{#f/18}* Qu-\n* Frisk!', '<25>{#p/asriel1}{#f/18}* Você acabou de... acariciar meu focinho?'],
                    ['<25>{#p/asriel1}{#f/18}* Ah-\n* Isso coça, Frisk!'],
                    ['<25>{#p/asriel1}{#f/18}* Friiisk...!'],
                    ['<25>{#p/asriel1}{#f/17}* ... Frisk...\n* ... tenha piedade...'],
                    ["<25>{#p/asriel1}{#f/20}* ... você é muito fofo, Frisk."],
                    ['<25>{#p/asriel1}{#f/13}* Uh, Frisk, você pode parar agora.'],
                    ["<25>{#p/asriel1}{#f/16}* Acho que não a nada que eu possa fazer."],
                    ['<25>{#p/asriel1}{#f/15}* ...']
                ][Math.min(SAVE.data.n.svr_nuz++, 8)]
        },
        trivia: {
            a_bbox: ["<32>{#p/basic}* Uma caixa bastião.\n* Tem um humano dentro..."],
            a_wishflower: pager.create(
                0,
                (power = false) =>
                    SAVE.data.b.svr
                        ? [
                            "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                            power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                        ]
                        : ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                pager.create(
                    2,
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* Só uma flor do desejo qualquer.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : [
                                    '<32>{#p/basic}* Esta flor do desejo deseja permanecer uma flor do desejo.',
                                    power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                                ],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* Uma flor do desejo insossa.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : [
                                    "<33>{#p/basic}* Desejo de uma flor.\n* Espera, isso não parece certo.",
                                    power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                                ],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : [
                                    '<32>{#p/basic}* Quantos desejos uma flor do desejo pode desejar?',
                                    power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                                ],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* Uma flor... faz desejos.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'],
                    (power = false) =>
                        SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Você cheira a aura da flor do desejo.)",
                                power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}'
                            ]
                            : world.darker
                                ? ["<32>{#p/basic}* É uma flor do desejo.", power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                                : ['<32>{#p/basic}* Mais uma flor do desejo.', power ? '{*}{#d.sysx}{%}' : '{*}{#d.sys}{%}']
                )
            ),
            signposter1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você olha para o pôster.)',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/7}* Esta foi realmente uma nova baixa para o departamento de publicidade do Mettaton.",
                                '<26>{#f/15}* Quer dizer, você poderia ao menos dar o crédito...',
                                '<26>{#f/20}* Para a mais óbvia inspiração de anime sci-fi de todos os tempos.'
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* É baseado na cena da segunda temporada, episódio dezessete.",
                                '<25>{#f/13}* Chamado \"Mew Mew tudo em uma cozinha.\"',
                                "<25>{#f/15}* ... digamos apenas a espécie que ela encontrou naquele dia...",
                                '<25>{#f/15}* ... tinha uma obsessão nada saudável com utensílios de cozinha.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/10}* Que?\n* Eu vivi centenas de anos.',
                                8 <= SAVE.flag.n.ga_asrielMonologue
                                    ? "<25>{#f/16}* Nós já fizemos isso antes, Frisk.\n* Vamos lá."
                                    : '<25>{#f/10}* Você acha que eu só fico fazendo nada quando estou entediado?'
                            ],
                            [
                                8 <= SAVE.flag.n.ga_asrielMonologue
                                    ? '<25>{#p/asriel1}{#f/13}* Você já deveria me conhecer a essa altura.'
                                    : '<25>{#p/asriel1}{#f/16}* ... você pensar nisso como...'
                            ]
                        ][Math.min(asrielinter.signposter1++, 3)]
                    ]
                    : world.darker
                        ? ['<33>{#p/basic}* Apenas um anúncio inútil.']
                        : [
                            "<32>{#p/basic}* É um anúncio para uma marca de fogão chique da marca MTT...",
                            SAVE.data.n.plot === 72
                                ? '<32>{#p/basic}* Um grande utensílio, para a vida em qualquer mundo.'
                                : '<32>{#p/basic}* Que deliciosamente exagerado.'
                        ],
            signposter2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você olha para o pôster.)',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/17}* Ei olha, é você.",
                                '<25>{#f/13}* E o Mettaton.',
                                '<25>{#f/17}* Meio que fofo, honestamente.'
                            ],
                            SAVE.flag.b.asriel_earpull
                                ? [
                                    "<25>{#p/asriel1}{#f/13}* Eu vou admitir, eu nunca entendi o porque...",
                                    '<25>{#f/15}* Uh, fez o que você fez quando nós passamos aqui.',
                                    '<25>{#f/17}* Eu acho que foi sua forma de dizer...',
                                    '<25>{#f/13}* ... que você queria ser amigo?'
                                ]
                                : [
                                    "<25>{#p/asriel1}{#f/17}* Eu admito, eu me diverti muito vendo você fazer esse show.",
                                    '<25>{#f/15}* O jeito que você só ficou aí parado...\n* Fazendo nada...',
                                    "<25>{#f/13}* Foi bem estranho.\n* Mas você é bem estranho de modo geral.",
                                    '<25>{#f/13}* Tipo eu, eu acho.'
                                ],
                            SAVE.flag.b.asriel_earpull
                                ? [
                                    '<25>{#p/asriel1}{#f/17}* ... valeu, Frisk.',
                                    '<25>{#f/23}* Por tentar tanto ser meu amigo.'
                                ]
                                : [
                                    "<25>{#p/asriel1}{#f/2}* De agora em diante, nós deveremos nos chamar...",
                                    '<25>{#f/1}* \"O Coletivo de Esquisitos Orgulhosos.\"',
                                    '<25>{#f/15}* Na verdade, isso soou melhor na minha mente.\n* Esquece.'
                                ],
                            ['<25>{#p/asriel1}{#f/20}* Você realmente gosta desse poster, né?']
                        ][Math.min(asrielinter.signposter2++, 3)]
                    ]
                    : world.darker
                        ? ['<33>{#p/basic}* Apenas um anúncio inútil.']
                        : SAVE.data.n.plot < 65
                            ? [
                                "<32>{#p/basic}* É um anúncio para um show que vai acontecer...",
                                iFancyYourVilliany()
                                    ? "<32>{#p/basic}* Naturalmente, você é o vilão."
                                    : "<32>{#p/basic}* Naturalmente, você é a estrela."
                            ]
                            : [
                                "<32>{#p/basic}* É um anúncio de um programa já exibido...",
                                SAVE.data.n.plot === 72
                                    ? '<32>{#p/basic}* Nós apenas podemos esperar que o novo mundo traga novos entretenimentos.'
                                    : '<32>{#p/basic}* Naturalmente, você foi ótimo.'
                            ],
            powerline: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você toca no nó de energia.)\n* (Parece formigamento.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* É um nó de energia... que foi parcialmente desligado."]
                        : ["<32>{#p/basic}* É um nó de energia."],
            a_virt: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O terminal está acima do seu nível de acesso.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* É um virtualismo.\n* Talvez algum dia você tenha o nível de acesso requerido."]
                        : ["<32>{#p/basic}* É um virtualismo.\n* Você não tem o nível de acesso requerido para usar."],
            metposter: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha com mais proximidade para um pôster promocional.)']
                    : SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}* É um pôster promocional para a estreia inicial de Mettaton.",
                            '<32>* Uma nota assinada foi rabiscada e substituída por uma correção...',
                            '<32>* \"Sinto muito por ter sido um fardo para você.\"'
                        ]
                        : [
                            "<32>{#p/basic}* É um pôster promocional para a estreia inicial de Mettaton.",
                            "<32>* Mesmo com dificuldade para ler, tem uma nota assinada por Mettaton aqui...",
                            '<32>* \"Obrigado por tornar meus sonhos realidade.\"'
                        ],
            bedbox: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você encolhe os ombros ao ver uma caixa tão comum.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Uma caixa muito normal.']
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Para ser honesto, esta não é realmente uma unidade habitacional não euclidiana.",
                                "<32>* É uma caixa mansão de luxo não euclidiana!"
                            ]
                            : [
                                '<32>{#p/basic}* Esta caixa aparentemente comum é uma unidade habitacional não euclidiana de última geração.',
                                "<33>* ... é menor do lado de fora."
                            ],
            a_lab_books1: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nessa prateleira consistem em vários conteúdos não relacionados.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"O corpo de um monstro é o reflexo de sua ALMA.\"',
                            '<32>* \"Normalmente, os pais decidem que tipo de monstro sua criança será...\"',
                            '<32>* \"Imprimindo seus valores na essência da criança.\"',
                            '<32>* \"Mas o que aconteceria se outro ser, como um humano, absorvesse a ALMA ao invés disso?\"',
                            '<32>* \"As lendas falam que os humanos que absorveram as ALMAS de boss monstros mortos na guerra...\"',
                            '<32>* \"Em um relato particular, um humano foi dito ter assumido a forma de um avião.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta na prateleira.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nessa prateleira consistem em vários conteúdos não relacionados.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Então você quer fazer um design de robô, huh? Bem, Fabulous Faraday tem tudo o que você precisa!\"',
                            '<32>* \"Veja, aqui na Terra, gostamos de fazer as coisas com uma pitada de sabor.\"',
                            '<32>* \"Você não pode só construir uma caixa de metal e chamar de revolução, entendeu o que eu disse?\"',
                            '<32>* \"Você tem que dar estilo, características deslumbrantes e dinâmicas, como rodas e mostradores!\"',
                            '<32>* \"E, para o máximo de aproveitamento, adicionar algo criativo a sua mobilidade!\"',
                            '<32>* \"Tipo, eu não sei, um uniciclo?\"\n* \"É, algo tipo isso.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta na prateleira.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nessa prateleira consistem em vários conteúdos não relacionados.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>* \"Infelizmente, monstros não lidam com doenças muito bem.\"',
                            '<32>* \"Quando a morte de um monstro é eminente, ele apenas se deita no chão, imóvel.\"',
                            '<32>* \"Chamamos esse estado de \'Caído.\'\"',
                            '<32>* \"Durante a guerra, essa situação era toda muito familiar...\"',
                            '<32>* \"Morte, em tempos daquele, eram infelizmente inevitáveis.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta na prateleira.)'
                        ]
            ),
            paperbook: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A detalhes no livro sobre alguma história irrealista de um aventureiro intrépido.)']
                    : [
                        '<32>{#p/human}* (Você pega o livro...)',
                        '<32>{#p/basic}* \"MMSA: Sonhos (História criada por fã)\"',
                        '<32>* \"... e isso foi quando Mew Mew finalmente viu com seus dois únicos olhos.\"',
                        '<32>* \"Era meio triste, parado sozinho no espaço, basicamente abandonado...\"',
                        '<32>* \"... mas Mew Mew sabia bem!\"\n* \"E não demorou muito para que ela soubesse de nossa situação.\"',
                        '<32>* \"Com apenas um único tiro do seu poderoso LAZER DELUXE, ela esmurra com facilidade!\"',
                        '<32>* \"E assim Mew Mew se torna a salvadora dos monstros.\"',
                        '<32>{#p/human}* (Você coloca o livro de volta na mesa.)'
                    ],
            a_lab_books2: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta estante consistem em uma série de notas.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Notas do professor, página 76.\"',
                            '<32>* \"O CORE está ativo agora, e as construções planejadas para o Outpost estão a caminho.\"',
                            '<32>* \"Eu não sei como me sentir em relação a esse desenvolvimento...\"',
                            '<32>* \"Será bom fazer nossas vidas mais confortáveis por aqui, entretanto...\"',
                            '<32>* \"Após definir dessa forma, estamos admitindo que não podemos escapar sem a ajuda das ALMAS humanas?\"',
                            '<32>* \"Desde que fui apontado como cientista real, eu trabalho constantemente com objetivo de nos trazer liberdade.\"',
                            '<32>* \"Agora, temo que os outros monstros tenham concordado em esperar...\"',
                            '<32>{#p/human}* (Você coloca o livro de volta na prateleira.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta estante consistem em uma série de notas.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Notas do professor, página 195.\"',
                            '<32>* \"É um dia de desgraça para a sociedade monstro, a família real está em pedaços.\"',
                            '<32>* \"A rainha Toriel abandonou seu trono após algumas palavras de ódio do rei Asgore.\"',
                            '<32>* \"Mas essas palavras talvez tenham longa aplicação para nós...\"',
                            '<32>* \"Agora, todos esperam que ele tome as ALMAS humanas à força.\"',
                            '<32>* \"É um desastre.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta na prateleira.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Os livros nesta estante consistem em uma série de notas.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você pega um livro...)',
                            '<32>{#p/basic}* \"Notas do professor, página 310.\"',
                            '<32>* \"Bem, ele concordou com o plano... é claro, eu já imaginei que ele o faria.\"',
                            '<32>* \"O momento é de sorte.\"\n* \"O primeiro humano desde $(name) chegou ao Outpost hoje.\"',
                            "<32>* \"Nós não sabemos se aquilo será capaz de conte-los ainda, mas vamos descobrir o mais cedo possível...\"",
                            '<32>* \"Ossos dos dedos cruzados.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta na prateleira.)'
                        ]
            ),
            cream_machine: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você se questiona que tipo de sorvete essa máquina de sorvete faz.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* Essa máquina de sorvete super complicada não terá mais nenhum uso."]
                        : ["<32>{#p/basic}* É uma máquina de sorvete muito complicada."],
            cream_bucket: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (Você coloca suas mãos no balde de sorvete.)\n* (Está bem gelado.)",
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/15}* Uh, só não passa essa coisa em mim.",
                                "<25>{#p/asriel1}{#f/15}* Eu teria que me balançar igual cachorro pra tirar isso fora."
                            ],
                            ['<25>{#p/asriel1}{#f/8}* ...', "<26>{#p/asriel1}{#f/31}* Você não tem nenhuma ideia."],
                            ['<25>{#p/asriel1}{#f/31}* ...']
                        ][Math.min(asrielinter.cream_bucket++, 2)]
                    ]
                    : ['<32>{#p/basic}* Um balde de sorvete.'],
            mewposter: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Seu olho segue o poster animado enquanto o objeto sobe e desce.)"]
                    : SAVE.data.n.state_aerialis_basekill > 29
                        ? ['<32>{#p/basic}* Um grande poster de uma franquia de anime sci-fi.']
                        : SAVE.data.n.state_aerialis_basekill > 14
                            ? ['<32>{#p/basic}* Um grande pôster para uma franquia de anime sci-fi.']
                            : ['<32>{#p/basic}* Um grande pôster para uma popular franquia de anime sci-fi.'],
            dogfood: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você encara com ansiedade o saco de comida para cachorro.)',
                        ...[
                            ["<25>{#p/asriel1}{#f/24}* Frisk, eu sei o que você está pensando. \n* Não vale a pena."],
                            ["<25>{#p/asriel1}{#f/24}* Vai ter um gosto nojento, Frisk.\n* Só não."],
                            [
                                '<25>{#p/asriel1}{#f/15}* Escuta.',
                                "<25>* Eu estou te dizendo isso pois eu sou seu... amigo.",
                                "<25>* ... isso foi difícil de dizer, mas eu acho que estou aprendendo."
                            ],
                            ['<25>{#p/asriel1}{#f/16}* Você não deve ter nada melhor pra fazer.']
                        ][Math.min(asrielinter.dogfood++, 3)]
                    ]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* É um saco meio vazio de comida para cachorro."]
                        : ["<32>{#p/basic}* É um saco de comida pra cachorro.\n* Está meia vazia."],
            virtsign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal mostra o que parece ser um lagarto em um ambiente virtual.)']
                    : ["<32>{#p/basic}* É um sinal que representa alguém em um virtualismo."],
            starlingtable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você para e olha as flores.)']
                    : ['<32>{#p/basic}* Flores Estreladas.'],
            starling: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você para e olha as flores.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Flores Estreladas.']
                        : ['<32>{#p/basic}* Um buquê de Flores Estreladas.'],
            starling2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você para e olha as flores.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Flores Estreladas.']
                        : ['<32>{#p/basic}* Um pequeno trio de Flores Estreladas.'],
            starling3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você para e olha as flores.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Flores Estreladas.']
                        : ['<32>{#p/basic}* Um grupo densamente compactado de Flores Estreladas.'],
            starling5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você para e olha as flores.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Flores Estreladas.']
                        : ['<32>{#p/basic}* Um casal de Flores Estreladas.\n* Fofo...?'],
            dttubes: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/3}* Essa coisa?\n* Ha... não me lembra."], ['<25>{#p/asriel1}{#f/4}* ...']][
                    Math.min(asrielinter.dttubes++, 1)
                    ]
                    : [
                        '<32>{#p/basic}* Um bocado de tubos de teste com uma substância desconhecida.',
                        ...(world.genocide
                            ? world.goatbro &&
                                (SAVE.flag.n.genocide_milestone < 5
                                    ? SAVE.flag.n.ga_asrielLab3++
                                    : SAVE.flag.n.genocide_milestone < 6
                                        ? SAVE.flag.n.ga_asrielLab4++
                                        : SAVE.flag.n.ga_asrielLab5++) < 1
                                ? SAVE.flag.n.genocide_milestone < 5
                                    ? [
                                        '<25>{#p/asriel2}{#f/10}* Engraçado, a seringa que ela usava em mim sumiu...',
                                        '<26>{#f/4}* Talvez ela jogou fora.'
                                    ]
                                    : SAVE.flag.n.genocide_milestone < 6
                                        ? [
                                            '<25>{#p/asriel2}{#f/15}* A seringa faltando...',
                                            '<25>{#f/10}* É por isso que ela estava tão forte contra a gente?'
                                        ]
                                        : [
                                            '<25>{#p/asriel2}{#f/2}* Ela realmente pensou que isso iria salva-la...',
                                            '<25>{#f/1}* Que IDIOTA.'
                                        ]
                                : []
                            : ['<32>{#p/basic}* Tenho outra seringa usada com bastante quantidade da mesma substância.'])
                    ],
            papertable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Os planos na mesa descrevem algum processo de conversão de energia.)']
                    : ["<32>{#p/basic}* É uma mesa de trabalho com planos não descritos nela."],
            vender1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você observa o conteúdo misterioso por trás do vidro da unidade de armazenamento.)']
                    : ['<32>{#p/basic}* Uma unidade de armazenamento selada a vácuo.\n* Dentro estão frascos de várias substâncias desconhecidas.'],
            vender2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você observa o conteúdo misterioso por trás do vidro da unidade de armazenamento.)']
                    : ['<32>{#p/basic}* Uma unidade de armazenamento selada a vácuo.\n* Dentro estão frascos de várias substâncias desconhecidas.'],
            toolrack: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/27}* Pelo que eu sei, essas ferramentas nunca foram usadas de verdade.',
                            "<25>* De fato, eu acho que elas são apenas decoração."
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* Ferramentas assim são inúteis quando você pode usar magia.",
                            '<25>{#f/17}* Tipo, aquele camundongo que trabalha no CORE? \n* Charles, eu acho?',
                            '<25>{#f/15}* Aquele pequeno camundongo tem o poder da telecinese.',
                            "<25>{#f/16}* Não me pergunte como eu sei disso."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Uh, vamos deixar isso de lado...',
                            '<25>{#f/16}* Quando eu ferrei tudo no passado, eu aprendi a evitar este aí.',
                            '<25>{#f/15}* Que tipo de poder torna difícil fazer... qualquer coisa.'
                        ],
                        ["<25>{#p/asriel1}{#f/16}* ... vamos deixar isso assim."]
                    ][Math.min(asrielinter.toolrack++, 3)]
                    : [
                        "<32>{#p/basic}* Um amontoado de ferramentas velhas e enferrujadas.\n* Parecem não ter sido usadas a anos.",
                        ...(SAVE.data.n.plot === 72 ? ['<33>* ... e agora jamais serão.'] : [])
                    ],
            spycamera1: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Parece estar completamente offline.)']
                        : SAVE.data.n.plot === 72 && !world.runaway
                            ? ['<32>{#p/basic}* Privacidade a final.']
                            : [
                                '<32>{#p/basic}* Este monitor está calibrado para seguir seus movimentos.',
                                ...(world.goatbro && SAVE.flag.n.ga_asrielLab1++ < 1
                                    ? ["<25>{#p/asriel2}{#f/5}* Se eu pelo menos pudesse ver a cara da Alphys nos assistindo..."]
                                    : [])
                            ],
            gameshow_terminal1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você coloca as mãos no console humorístico.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Um console com game show.']
                        : SAVE.data.b.a_state_moneyfish
                            ? ['<32>{#p/basic}* Um console de game show.\n* A testemunha em primeira mão de uma competição incrível.']
                            : ['<32>{#p/basic}* Um console de game show.\n* A infeliz testemunha em primeira mão de um trocadilho horrível.'],
            gameshow_terminal2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você coloca suas mãos no console simpático.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Um console com game show.']
                        : ['<32>{#p/basic}* Um console de game show.\n* Este console parece especialmente equipado para fantasmas.'],
            gameshow_terminal3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você coloca suas mãos no console familiar.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Um console com game show.']
                        : ["<33>{#p/basic}* Um console de game show.\n* Este é feito sob medida para você."],
            gameshow_terminal4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você coloca suas mãos no console amigável.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Um console com game show.']
                        : SAVE.data.n.state_foundry_muffet === 1
                            ? ['<32>{#p/basic}* Um console com game show.\n* Cheira a... uma substituição.']
                            : ['<32>{#p/basic}* Um console de game show.\n* Quem precisa de braços com consoles como esses?'],
            a_path2_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal estabiliza um número limite de monstros que a máquina pode suportar.)']
                    : [
                        '<32>{#p/basic}* \"Por favor tenham em mente que boa parte dessas máquinas só suportam dois monstros por vez.\"',
                        ...(world.genocide && SAVE.flag.n.ga_asrielSkySign1++ < 1
                            ? ['<25>{#p/asriel2}{#f/1}* Ótimo pra gente.']
                            : [])
                    ],
            a_path4_sign: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A placa informa as pessoas sobre o fechamento de uma agência de cobrança.)']
                    : SAVE.data.n.plot === 72
                        ? ['<#32>{#p/basic}* \"Desculpe, mas a agência de cobrança está sendo fechada para o bem!\"\n  - Bratty and Catty']
                        : ['<#32>{#p/basic}* \"Deixe suas tralhas aqui e nós daremos um jeito de vende-la!\n  - Bratty and Catty'],
            a_puzzle1_sign: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Os conteúdos dos sinal parecem ter sido riscados.)"]
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/basic}* \"Alerta: filmagem para televisão pode estar em progresso por perto.\"']
                        : ['<32>{#p/basic}* \"Atualização: Filmagem da televisão em hiato indefinido.\"'],
            labcounter: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você passa as mãos pela bancada.)\n* (É agradavelmente suave.)"]
                    : [
                        world.darker
                            ? "<32>{#p/basic}* É só uma bancada."
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* Ah, uma bela bancada.\n* Não tem lugar melhor para ir após vencer o dia!"
                                : "<32>{#p/basic}* Ah, a humilde bancada.\n* Não há lugar melhor para praticar suas artes e ofícios!",
                        ...(mtt ? ["<32>{#p/mettaton}* ISSO É ONDE OS INGREDIENTES VÃO."] : [])
                    ],
            chesstable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que o game board está basicamente vazio.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um tabuleiro de xadrez."]
                        : SAVE.data.n.plot < 65 || SAVE.data.b.ubershortcut || world.genocide
                            ? ["<32>{#p/basic}* É um tabuleiro de xadrez.\n* Está vazio."]
                            : ["<32>{#p/basic}* É um tabuleiro de xadrez.\n* É o turno das pretas, mas não tem movimentos bons para serem feitos..."],
            roomtable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O guia do livro explica, em detalhes, a natureza da vida multi-dimensional.)']
                    : [
                        "<32>{#p/basic}* É um livro de guia para a vida multi-dimensional.",
                        '<32>* Você abre na página marcada...',
                        '<32>* \"...o que basicamente significa que seu quarto existe em três espaços dimensionais iguais...\"',
                        '<32>* \"... mas em um ponto diferente na quarta dimensão.\"',
                        '<32>* \"Este posicionamento tetradimensional é mais comumente referido como faseamento.\"',
                        '<32>* \"O faseamento é um processo complexo que envolve a resaturação do campo negativo do...\"',
                        '<33>* Amém, a página acaba aqui.'
                    ],
            flowertable: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você para e observa as flores.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Uma Flor Estrelada.']
                        : ['<32>{#p/basic}* Adiante, a Flor Estrelada solitária.'],
            coredoor: ["<32>{#p/basic}* Está trancado."],
            deadbot: ["<32>{#p/basic}* É apenas uma casca."],
            deadbot2: ["<32>{#p/basic}* Ele está sem óleo."],
            corenote1: [
                '<32>{#p/basic}* Há uma gravação no chão rotulada \"Toriel.\"',
                '<32>{#p/human}* (Você da início a gravação...)',
                '<32>{#p/alphys}* Asgore me contou muito sobre você.',
                '<32>* Suas tortas, suas histórias, até mesmo a forma que você o faz rir...',
                '<32>* E seu amoroso cuidado pelos humanos que vieram aqui.',
                '<32>* Mesmo com seu julgamento errado sobre Asgore, você tentou ser uma luz positiva.',
                "<32>* Por minha culpa, você nunca será capaz de demonstrar aquela luz novamente."
            ],
            corenote2: [
                '<32>{#p/basic}* Há uma gravação no chão rotulada \"Sans.\"',
                '<32>{#p/human}* (Você da início a gravação...)',
                "<32>{#p/alphys}* Eu nunca vou esquecer aqueles dias onde nós trabalhamos juntos em projetos...",
                '<32>* Ou aquela vez em que eu te ajudei a pregar uma pegadinha em Papyrus...',
                '<32>* Ou mesmo aquela vez em que fomos caçar lixo com a Bratty e Catty.',
                '<32>* Você pôde não ficar mais por perto, mas quando tudo importava você esteve ali.',
                "<32>* Por minha culpa, você jamais será capaz de voltar."
            ],
            corenote3: [
                '<32>{#p/basic}* Há uma gravação no chão rotulada \"Papyrus.\"',
                '<32>{#p/human}* (Você da início a gravação...)',
                "<32>{#p/alphys}* Nosso amor compartilhado por quebra-cabeças é algo que sempre me cativou.",
                '<32>* Quando éramos crianças você me inspirou a fazer tantas coisas...',
                '<32>* Se não fosse por você, eu talvez jamais fosse uma cientista.',
                "<32>* Eu não pude te assistir partir, mas sei que você manteve-se verdadeiro a si mesmo no fim.",
                "<32>* Por minha culpa, você nunca será si mesmo novamente."
            ],
            corenote4: [
                '<32>{#p/basic}* Há uma gravação no chão rotulada como \"Undyne.\"',
                '<32>{#p/human}* (Você da início a gravação...)',
                '<32>{#p/alphys}* Undyne...\n* Nós faríamos tanto juntos quando escapassemos...',
                '<32>* Eu posso imaginar agora.\n* Cruzando a galáxia, sem ninguém pra entrar no nosso caminho.',
                '<32>* Sempre que eu me sentia triste ou sozinha, você sempre estava lá para me animar.',
                "<32>* Mesmo que eu e você discordamos em certos pontos, você nunca deixou isso impedir nossa amizade.",
                "<32>* Por minha culpa, você nunca será capaz de explorar a galáxia."
            ],
            corenote5: [
                '<32>{#p/basic}* Há uma gravação no chão chamada \"Mettaton.\"',
                '<32>{#p/human}* (Você da início a gravação...)',
                "<32>{#p/alphys}* Eu sei que passamos por um começo agitado, mas eu jamais seria a mesma sem sua pessoa.",
                "<32>* Se você está ouvindo isso Mettaton, eu quero você saiba que eu te acho perfeita.",
                "<32>* Não há outro monstro no Outpost do qual eu desejaria fazer um novo corpo.",
                "<32>* Bem, talvez Napstablook.\n* Mas ele não é muito do tipo lutador.",
                '<32>* Boa sorte, Mettaton.'
            ],
            corenote6: () => [
                '<32>{#p/basic}* Há uma gravação no chão chamada \"Asgore.\"',
                '<32>{#p/human}* (Você da início a gravação...)',
                "<32>{#p/alphys}* Eu sei que nem sempre fui a melhor no meu trabalho, mas...",
                '<32>* Você sempre me fez sentir como se eu estivesse contribuindo com algo.',
                '<32>* E, mesmo que aqueles experimentos fossem arriscados...',
                '<32>* Eu sempre tive o apoio de todo o Outpost para encontrar o caminho mais rápido fora daqui.',
                "<32>* Bem, chefe... nós conseguimos.\n* Você não vai precisar viver nem mais um dia nesse posto avançado estúpido.",
                '<32>* Eu deveria imaginar que algo daria errado...',
                '<32>* Eu deveria ter notado a poeira naquela Flor Estrelada...',
                '<32>* Eu deveria ter contido enquanto ainda tinha chance...',
                "<32>* Mas eu não o fiz.",
                '<32>* Por minha causa e da minha arrogância, aquela criança abriu um caminho de destruição.',
                "<32>* Eu já perdi tantas pessoas das quais eu me importo...",
                '<32>* Vê-las morrer do conforto do meu laboratório, enquanto eu não fazia nada para impedir.',
                "<32>* Mettaton vai tentar seu melhor, mas se ele falhar...",
                "<32>* ... você é o próximo.",
                "<32>* Eu não sei o que fazer se tiver que assistir mais um dos meus amigos morrer.",
                "<32>* Eu não sei o que farei se sentir que eu sabia que poderia ter feito algo pra ti salvar.",
                "<32>* O que eu sei é que você não vai lutar, e eu sei que eles não vão se importar.",
                "<32>* E caso eu não faça nada antes que seja tarde demais...",
                '<32>* ...',
                '<32>{#p/human}* (Você ouve Alphys largar o gravador e correr para o elevador.)',
                ...(SAVE.flag.n.genocide_milestone < 5
                    ? SAVE.flag.n.ga_asrielCorenote++ < 1
                        ? [
                            '<25>{#p/asriel2}{#f/3}* Alphys correndo da luta como sempre, eu já imaginava.',
                            '<25>{#p/asriel2}{#f/4}* Uma vergonha.'
                        ]
                        : []
                    : SAVE.flag.n.ga_asrielAlphysCom4++ < 1
                        ? ['<25>{#p/asriel2}{#f/8}* Se pelo menos eu soubesse o que ela estava fazendo da primeira vez...']
                        : [])
            ],
            coresign1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (O sinal proíbe qualquer presença não autorizada na área.)',
                        '<25>{#p/asriel1}{#f/4}* Por razões óbvias, você pode ignorar isso.'
                    ]
                    : ['<32>{#p/basic}* \"Qualquer presença não autorizada nesta área é estritamente proibida.\"'],
            coresign2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (O sinal descreve o período de tempo mais longo e livre de acidentes sustentados aqui.)',
                        "<25>{#p/asriel1}{#f/3}* Se não fosse pelo acidente daquele um bot construtor, seria perfeito..."
                    ]
                    : ['<32>{#p/basic}* \"Maior quantia de dias desde o último acidente: 38690 dias.\"'],
            coresign3: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (A placa parabeniza o atual funcionário do ano.)',
                        ...[
                            ['<25>{#p/asriel1}{#f/17}* Aquele carinha tem o maior coração...'],
                            [
                                '<25>{#p/asriel1}{#f/17}* Antes quando eu estava tentando ser legal com todo mundo...',
                                '<25>{#f/17}* Eu pedi para que ele viesse comigo, e ele só veio.',
                                '<25>{#f/20}* Sem perguntar nada.',
                                "<25>{#f/18}* Eu nem pude acreditar!"
                            ],
                            [
                                "<25>{#p/asriel1}{#f/13}* Mesmo com tudo que eu fiz, pessoas como o Charles tem algo que eu...",
                                '<25>{#f/15}* Algo que eu nunca vou poder sentir sozinho.',
                                '<25>{#f/23}* ... a pura e verdadeiro fórmula para a felicidade.',
                                '<25>{#f/22}* Mas talvez com você...'
                            ],
                            ['<25>{#p/asriel1}{#f/13}* Eu realmente espero que isso funcionei, Frisk.']
                        ][Math.min(asrielinter.coresign3++, 3)]
                    ]
                    : [
                        '<32>{#p/basic}* \"Trabalhador do ano\" Charles\"\n* \"Muito obrigado por seu continuo esforço e dedicação.\"'
                    ],
            coresign4: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (A placa é dedicada a um certo indivíduo.)',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/13}* Você talvez ache isso surpreendente, mas...',
                                '<26>{#f/27}* Eu nunca o conheci de verdade.',
                                '<25>{#f/4}* Ele morreu antes da Alphys me reencarnar, então...',
                                '<25>{#f/3}* Minhas únicas memórias sobre ele são de quando eu era bebê.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* É... monstros podem ter espaços infinitos para memória...',
                                "<25>{#f/17}* Mas não podemos lembrar de algo que nunca aconteceu.",
                                '<25>{#f/20}* Meio difícil de passar por ESSA limitação.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* Uma coisa que sei é que ele quase chegou a conclusão perfeita de viagem com buraco de minhoca...',
                                '<25>{#f/13}* Talvez, se aquela tecnologia conseguisse ser criada...',
                                "<25>{#f/15}* ... implantada na mente dos monstros...",
                                '<25>{#f/16}* ... você poderia trazer memórias de outros lugares.'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* Deve ser loucura.']
                        ][Math.min(asrielinter.coresign4++, 3)]
                    ]
                    : ['<32>{#p/basic}* \"Esta placa é dedicada ao Professor T. N. Roman.\"\n* \"Que seu legado seja eternizado.\"'],
            coresign5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal lista o que tem em casa direção.)']
                    : ['<32>{#p/basic}* \"Esquerda - Estágio Quatro\"\n* \"Direita - Elevador\"'],
            pottedtable: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você tem o sentimento de que viu essa mesa em algum lugar antes.)"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ["<32>{#p/basic}* Uma mesa familiar.\n* Você não reconhece de onde vem essa mesa?"]
                        : ['<32>{#p/basic}* Uma mesa familiar.'],
            potchair: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você tem o sentimento de que já viu essa cadeira em algum lugar.)"]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ['<32>{#p/basic}* Uma cadeira familiar.\n* Eles realmente sabem como variar o design.']
                        : ['<32>{#p/basic}* Uma cadeira familiar.'],
            cardboard1: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não entende o que tem na caixa...)"]
                    : [
                        "<32>{#p/basic}* É um monte de caixas de papelão quase vazias.",
                        '<32>{#p/basic}* Esta caixa sem graça tem alguns tubos de ensaio na parte inferior.'
                    ],
            cardboard2: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não entende o que tem na caixa...)"]
                    : [
                        "<32>{#p/basic}* É um monte de caixas de papelão quase vazias.",
                        '<32>{#p/basic}* Esta caixa alta cheira a produtos químicos exóticos.'
                    ],
            cardboard3: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não entende o que tem na caixa...)"]
                    : [
                        "<32>{#p/basic}* É um monte de caixas de papelão quase vazias.",
                        '<32>{#p/basic}* Está pequena caixa contém papéis com escritas em todas as fontes possíveis.'
                    ],
            labchem: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Este setup te parece bem perigoso.)']
                    : [
                        world.darker
                            ? '<32>{#p/basic}* Produtos químicos em correias transportadoras.'
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* Produtos químicos em correias transportadoras.\n* De alguma forma, nada nunca deu errado."
                                : '<32>{#p/basic}* Produtos químicos em correias transportadoras.\n* O que poderia dar errado?',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* NADA COMO O ZUMBIDO CALMANTE DE UMA CORREIA TRANSPORTADORA COM CLASSIFICAÇÃO MTT-TRIPLE-A-SAFE!',
                                '<32>* NÃO APENAS TE SALVA TEMPO DE TER QUE ALCANÇAR OUTROS DOIS EXTRAS MICRONS PARA SEGURAR COISAS...',
                                '<32>* MAS QUANDO FRASCOS CAEM VIOLENTAMENTE PARA O LADO E SE QUEBRAM...',
                                '<32>* VOCÊ GANHA UMA REAÇÃO QUÍMICA SURPRESA, CHEIA DE ENERGIA!'
                            ]
                            : [])
                    ],
            labglobe: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Este é Krios...\n* Uma representação simples dele, entretanto.',
                            "<25>{#f/17}* Eu ouvi dizer que é mais colorido do que parece no espaço sideral."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Então, uma vez, desesperado de curiosidade...',
                            '<25>{#f/17}* Eu fui capaz de organizar a construção de um novo setor no Outpost.',
                            '<26>{#f/20}* E quando eu digo organizar, foi mais tipo...\n* Eu obrigando todos a construírem.',
                            '<25>{#f/13}* Foi basicamente, uma re-criação de uma parte do mundo natal.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* A re-criação não estava perfeita.",
                            '<25>{#f/15}* Provavelmente porque ninguém queria construir...',
                            '<25>{#f/17}* Mas eu entendo o motivo de falarem tanto desse planeta.',
                            "<25>{#f/23}* Ele era... lindo.\n* Eu nunca vi nada igual a ele."
                        ],
                        ["<25>{#p/asriel1}{#f/17}* Eu sempre me lembro da re-criação do céu..."]
                    ][Math.min(asrielinter.labglobe++, 3)]
                    : [
                        world.darker
                            ? "<32>{#p/basic}* É um globo."
                            : SAVE.data.n.plot === 72
                                ? "<32>{#p/basic}* É um globo de monstros... antigo Planeta Natal."
                                : "<32>{#p/basic}* É um globo do grande planeta natal dos monstros.",
                        ...(mtt
                            ? [
                                "<32>{#p/mettaton}* NÃO SERIA UM LABORATÓRIO SEM O OBRIGATÓRIO GLOBO.",
                                "<32>* DIFERENTE DA MAIOR PARTE DO QUE ESTÁ AQUI, ELE NÃO É UM ITEM DA MARCA MTT.",
                                '<32>* AINDA, DESDE QUE FOI ALPHYS QUEM FEZ ISSO PRA MIM, E ME FEZ ELA MESMA...',
                                "<32>* NÃO A RAZÃO PARAR DUVIDAR DA QUALIDADE NEM POR UM SEGUNDO!"
                            ]
                            : [])
                    ],
            labrando: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você interage com o dispositivo, mas ele não faz nada.)']
                    : [
                        world.darker
                            ? '<33>{#p/basic}* Um dispositivo sem propósito claro.'
                            : SAVE.data.n.plot === 72
                                ? '<32>{#p/basic}* De forma desapontante, a passagem do tempo não deu utilidade a esse dispositivo.'
                                : '<32>{#p/basic}* O propósito desse dispositivo é explicitamente não esclarecido.',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* AH SIM, O ÚTIL PARA TODA HORA POLARIZADOR DE FLUXO DE NÊUTRONS DA MARCA MTT.',
                                '<32>* UM APARELHO TÃO ÚTIL, ELE ELA ACESSADO AO MENOS DEZ VEZES...',
                                '<32>* POR ANO!!!'
                            ]
                            : [])
                    ],
            labsink: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você joga a água quase invisível sobre suas mãos.)']
                    : [
                        "<32>{#p/basic}* É uma pia com um suprimento de água alimentado por replicador.",
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* QUANTO MAIS COMPLEXO O MATERIAL, MAIS COMPLEXO PARA REPLICAR SE TORNA.',
                                '<32>* O CORE SÓ PROVE TANTA ENERGIA, DEPOIS DE TUDO.',
                                '<32>* FELIZMENTE, ÁGUA É UMA DAS SUBSTÂNCIAS MAIS SIMPLES DE TODAS!'
                            ]
                            : [])
                    ],
            labscope: (mtt: boolean) =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (Você aponta o microscópio para a cara do Asriel...)",
                        '<32>* (Através da lente, você testemunha uma variedade deslumbrante de partículas brilhantes e luminosas.)',
                        ...[
                            ['<25>{#p/asriel1}{#f/17}* Monstros são feitos de magia, Frisk.\n* Você sabe disso, certo?'],
                            ['<25>{#p/asriel1}{#f/13}* Você já pode parar de fazer isso agora.'],
                            ['<25>{#p/asriel1}{#f/15}* ...']
                        ][Math.min(asrielinter.labscope++, 2)]
                    ]
                    : [
                        '<32>{#p/basic}* Um microscópio eletrônico de alta precisão padrão da CIDADELA, circa 261X.',
                        ...(mtt
                            ? [
                                '<32>{#p/mettaton}* ESSES MICROSCÓPIOS AVANÇADOS FORAM CRIADOS A POUCOS ANOS ATRÁS.',
                                '<32>* SÓ MAIS UM EXEMPLO DE COMO PRODUTOS DA MARCA MTT NUNCA FALHAM EM ESTAR ATUALIZADOS!'
                            ]
                            : [])
                    ]
        },
        puzzle: {
            puzzlestop1a: pager.create(
                0,
                () =>
                    SAVE.data.n.state_foundry_undyne !== 1
                        ? [
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysShocked}* Woah, para!!',
                            "<25>{#g/alphysOhGodNo}* Você vai cair do p-plano normal...",
                            '<25>{#g/alphysSideSad}* Eu d-deveria te trazer de volta.',
                            '<25>{#g/alphysThatSucks}* Desculpa...',
                            '<32>{#s/equip}{#p/event}* Clique...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysShocked}* Woah, para!!',
                            "<25>{#g/alphysOhGodNo}* Você n-n-não pode... ir tão l-longe...",
                            "<26>{#g/alphysNeutralSweat}* Eu te traria de volta, mas eu... não estou no laboratório.",
                            "<26>{#f/10}* En-então não seja burro!",
                            '<32>{#s/equip}{#p/event}* Clique...'
                        ],
                () =>
                    SAVE.data.n.state_foundry_undyne !== 1
                        ? [
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            "<25>{#p/alphys}{#g/alphysSideSad}* Não é seguro ir tão longe...",
                            "<25>{#g/alphysNeutralSweat}* Eu vou te trazer de volta agora.",
                            '<32>{#s/equip}{#p/event}* Clique...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysShocked}* O-o que você tá fazendo!?',
                            "<26>{#f/3}* Você está quase no limite!",
                            '<32>{#s/equip}{#p/event}* Clique...'
                        ],
                () =>
                    SAVE.data.n.state_foundry_undyne !== 1
                        ? [
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysWTF}* ...',
                            '<32>{#s/equip}{#p/event}* Clique...'
                        ]
                        : [
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysIDK2}* ...',
                            "<25>{#p/alphys}{#g/alphysIDK3}* Eu acho... que não a nada que eu possa fazer para te impedir.",
                            '<32>{#s/equip}{#p/event}* Clique...'
                        ]
            ),
            puzzlestop1b: () =>
                [
                    ['<25>{#p/asriel2}{#f/13}* Uh, $(name)...?', "<25>* Acho que estamos um pouco longe demais."],
                    ['<25>{#p/asriel2}{#f/13}* $(name)...?'],
                    ['<25>{#p/asriel2}{#f/13}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielPuzzleStop1++, 2)]
        },
        npc: {
            picnic_mushketeer: pager.create(
                0,
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? [
                            "<32>{#p/basic}{#npc/a}* Oh...\n* É você...",
                            "<32>* Bem, você realmente pensou que iria me derrotar tão facilmente!?",
                            '<32>* Porque...\n* Você está certo.',
                            "<32>* Eu não sou mais um soldado..."
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Anime-se, soldado!\n* Você já fez muito por aqui!",
                            "<32>* ...olha só, se não é o bravo humano que ousou me desarmar do meu rifle.",
                            "<32>* Você é interessante!\n* Aquela definitivamente não era a forma com a qual eu imaginei finalizar o conflito!",
                            '<32>* Mas, de alguma forma, você sempre consegue encontrar uma forma das coisas irem ao seu favor.'
                        ],
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? ['<32>{#p/basic}{#npc/a}* Futuros soldados serão inteligentes... em manterem distância de você.']
                        : [
                            '<32>{#p/basic}{#npc/a}* Futuros soldados serão inteligentes o suficiente para observar suas táticas!',
                            "<32>* Mas por agora...\n* É ir para o novo mundo contigo, soldado!"
                        ],
                () =>
                    SAVE.data.b.bullied_mushketeer
                        ? ['<32>{#p/basic}{#npc/a}* ...']
                        : ['<32>{#p/basic}{#npc/a}* Você pode estar no seu caminho agora.']
            ),
            a_dresslion: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Mettaton disse que eu poderia usar os fundos da empresa para fazer um vestido meu...',
                            "<32>* Eu nunca estive tão...!\n* Ha ha ha!"
                        ]
                        : SAVE.data.n.plot < 60
                            ? [
                                "<32>{#p/basic}{#npc/a}* Como um designer das roupas do Mettaton, é meu trabalho fazer as roupas perfeitas para ele.",
                                '<32>* Ele precisa de um terno e uma gravata hoje, depois de um vestido para outro show...',
                                '<32>* Por algum motivo...\n* A ideia dele em um vestido...',
                                '<32>* Parece muito legal...'
                            ]
                            : SAVE.data.n.plot < 65
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Está prestes a começar!\n* Em qualquer momento agora, o novo vestido estará nas telas da TV!",
                                    "<32>* Não consigo esperar..."
                                ]
                                : SAVE.data.n.plot < 68
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Isso...\n* Foi tão lindo...!',
                                        "<32>* Me fez questionar seu também ficaria bonito...\n* Em um vestido..."
                                    ]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Oh... meu senhor...',
                                        '<32>* Por um minuto ali, eu pensei que o Mettaton iria morrer!',
                                        "<32>* Eu nem sei o que faria comigo mesmo então..."
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<33>{#p/basic}{#npc/a}* Eu deveria fazer um pra você também!']
                        : SAVE.data.n.plot < 60
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu estou pensando em algo brilhoso e dourado.\n* Faria ele realmente brilhar."
                            ]
                            : SAVE.data.n.plot < 65
                                ? ["<32>{#p/basic}{#npc/a}* É mais lindo e brilhoso do que eu poderia imaginar!"]
                                : SAVE.data.n.plot < 68
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Vou ter que pedir a ele o financiamento, porém, e boa sorte para conseguir isso."
                                    ]
                                    : ['<32>{#p/basic}{#npc/a}* Eu talvez desapareça da face do Outpost!']
            ),
            picnic_darkman1: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Cha.\n* Nós somos as pessoas sombra.\n* Nós servimos aos nossos invocadores.",
                    '<32>* Terrestria me invocou pela primeira na guerra monstro-humana... bons tempos, yo.',
                    "<32>* Mas essa batalha acabou agora.\n* Assim como a sua."
                ],
                [
                    '<32>{#p/basic}{#npc/a}* Eu me lembro de todas as batalhas lutadas pelo invocador.',
                    "<32>* Deixe-me te contar sobre uma das minhas favoritas.\n* Algum lugar perto da costa.",
                    "<32>* Os militares terrestres pensaram de seria uma boa ideia deixar dornes espiadores em baixo da água.",
                    '<32>* Mas nós sabíamos onde eles estavam.\n* Então eu fui invocado, fiz uma checagem, voltei e contei a todos.',
                    "<32>* Depois disso nós estávamos explodindo cada um deles, tendo um bom tempo.",
                    "<32>* Não foi lá essas coisas comparado a toda a guerra, mas pareceu grande na hora."
                ],
                [
                    "<32>{#p/basic}{#npc/a}* Ha, pelo que meu invocador me contou, tenho certeza que você tem algumas histórias pra contar."
                ]
            ),
            picnic_darkman2: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* Entãããoo...\n* Sobre a gente...',
                    "<32>* Nós não estamos aqui de verdade.\n* Quer dizer, nós estamos.\n* Mas não de verdade.",
                    "<32>* É difícil de explicar."
                ],
                [
                    '<32>{#p/basic}{#npc/a}* Meu invocador, Cozmo, uma vez pôs dessa forma...',
                    "<32>* Nós somos como parte de suas personalidades que conseguem se mover fora do seu corpo.",
                    "<32>* Eeeeee... nós saímos sempre que temos algo para fazer.",
                    "<32>* Eu vim pra fora porque pensei que seria legal ver o Outpost antes de irmos embora.",
                    "<32>* Quando você está no calor da ação, você uhhhhh... realmente não consigo absorver nada."
                ],
                [
                    "<32>{#p/basic}{#npc/a}* Nós normalmente não temos tempo para relaxar quando estamos no mundo físico, entãooo... é bem legal."
                ]
            ),
            eblocker: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Desde que eu saí dos negócios do Glyde, eu percebi o quão terrível eles eram ;(",
                    "<32>{#p/basic}{#npc/a}* Desculpa se eu te vendi qualquer coisa no preço alto ;(\n* É culpa minha ;(",
                    "<32>{#p/basic}{#npc/a}* Agora, se você me permite, eu gostaria de flexionar em solitude ;(",
                    "<32>{#p/basic}{#npc/a}* Eu vou estar pronto logo, okay? ;("
                ],
                ['<32>{#p/basic}{#npc/a}* Desculpa, doçura ;(\n* Eu preciso de um tempo pra mim ;(']
            ),
            a_bowtie: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Eu sou estudante de artes.\n* Mas estou pensando em parar.",
                            '<32>* O louvor constante, que pode ser imerecido...',
                            '<32>* De que forma isso pode me ajudar a melhorar?'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu sou um estudante de artes.\n* Eu tive problemas com inspiração por muito tempo.",
                                '<32>* Apenas agora, após uma recente tragédia, eu tenho me sentido meio motivado.',
                                '<32>* É certo estar inspirado por tamanha desgraça?'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Eu sou estudante de arte.\n* Na arte, é dito que você apenas melhora com o tempo.",
                                '<32>* Entretanto, minha professora de artes pensa que tudo que eu faço é incrível.',
                                '<32>* Eu deveria me preocupar?'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Como um slime, ainda não tenho certeza de como me sentir sobre isso."]
                        : ["<32>{#p/basic}{#npc/a}* Como um slime, eu não tenho certeza em como devo me sentir em relação a isso."]
            ),
            a_thisisnotabomb: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* Você está pronto para meu retorno \"explosivo\"???',
                                '<32>* Você meio que assustou todos nós, mas alguns voltaram depois do que você fez.',
                                "<32>* Não posso culpar os que não voltaram, mas ei...",
                                "<32>* Eu entendi que te dar a chance de fazer a coisa certa teve algum impacto."
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Era triste o suficiente não saber que tipo de espécie eu era no antigo planeta natal...',
                                "<32>* E agora, no novo, haverá um monte de novas espécies que eu não conheço.",
                                "<32>* Talvez eu tenha que conviver com o fato de que serei uma bomba... eternamente...",
                                '<32>* Falando sobre as consequências emocionais.'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Wow.\n* Falando sobre explosivo.',
                                '<32>* O grande final deixou todos nós tremendo!',
                                '<32>* Literalmente.\n* Tremeu todos nesta área do Outpost.'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Bem esse lugar claramente é a bomba, huh???',
                                "<32>* Psst, escuta aqui criança...\n* Eu vou te deixar um segredo.",
                                "<32>* Eu... não sou uma bomba.",
                                "<32>* Ei, não finja estar chocado.\n* É só que as pessoas me chamam tanto de bomba...",
                                "<32>* ... que eu só aceitei a esse ponto."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* Quero dizer, vamos lá, por que todo mundo tem que viver com um pavio tão curto?',
                                '<32>* Se um bully de nada é tudo que precisa para colocar pra baixo, então você deveria explodir também!',
                                "<32>* Mas essa é só minha opinião."
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Quero dizer, neste ponto, se eu fosse descobrir que tipo de planta eu realmente sou...',
                                '<32>* ... a realização de um fato tão retido por tanto tempo seria...',
                                '<32>* ... explosivo.'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Talvez, se eu realmente fosse uma bomba, teria inveja.",
                                "<32>* Mas eu não sou, então... não.",
                                "<32>* Eu estou mais irritado em relação a isso, sério."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Acaba que era pra eu supostamente parecer uma planta do raro mundo natal.",
                                '<32>* Aquele velho senhor que veio conversar com o Burgie semana passada disse isso de passagem, eu acho.',
                                "<32>* ... oh, o que eu daria pra entender o que realmente sou..."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* ... mas ainda não os culpo."]
                            : ["<32>{#p/basic}{#npc/a}* ... é melhor se manter ao que você sabe."]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* ... você tem sorte de eu não explodir na sua cara agora."]
                            : ["<32>{#p/basic}{#npc/a}* ... você nunca se perguntou o que realmente é?"]
            ),
            a_blackfire: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Então estamos livres agora, huh?\n* Que tempos loucos estes em que vivemos.",
                            "<32>* Sem meu trabalho no Laboratório Real, eu terei que encontrar trabalho em outro lugar...",
                            '<32>* ... ou, poderíamos apenas estabilizar um novo Laboratório Real no novo mundo.'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Normalmente, eu faço pesquisas astronômicas no Laboratório Real.',
                                '<32>* Eu estava planejando em voltar ao trabalho amanhã...',
                                "<32>* Mas, depois do que aconteceu com Mettaton, eu não tenho certeza."
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Normalmente, eu faço pesquisas astronômicas no Laboratório Real.',
                                '<32>* Mais cedo, porém, Alphys disse que poderíamos tirar um dia de folga.',
                                '<32>* Me pergunto o por que...'
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Imagine como será muito melhor observar as estrelas com terra firme para pisar."
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Talvez, em algum lugar aí fora, seu coração ainda vive nas constelações...'
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Ser um astrônomo é divertido, mas observar as estrelas a olho não tem preço.'
                            ]
            ),
            a_businessdude: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? [
                                '<32>{#p/basic}{#npc/a}* É, as vezes eu me questiono como uma pessoa igual você pode existir.',
                                "<32>* Cê nos salvou no final, mas de que vale se estamos todos com medo de deixar nossas casas?",
                                "<32>* Eu não estou julgando ocê nem nada, mas ocê entende a ironia nisso, certo?"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Nosso projeto no virtualismo nunca saiu do chão, mas talvez...',
                                "<32>* ... este seja apenas um sinal de coisas a vir?",
                                "<32>* Até porque, em um novo planeta natal, não vamos precisar sair do chão."
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Que tragédia, hein?',
                                "<32>* ... é uma boa coisa que a maioria das pessoas não sabem como ocê se parece de perto."
                            ]
                            : roomKills().a_elevator1 > 0
                                ? ["<32>{#p/basic}{#npc/a}* Ocê me ouviu.\n* Saia enquanto ocê ainda pode."]
                                : SAVE.data.n.plot < 58
                                    ? iFancyYourVilliany()
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* Então, ocê se chama \"$(moniker2)\" agora, criança?',
                                            "<32>* ... isso é bem da hora."
                                        ]
                                        : [
                                            [
                                                '<32>{#p/basic}{#npc/a}* Garoto, ocê realmente errou o alvo, hein criança?',
                                                "<32>* ... isso é lamentável de chorar."
                                            ],
                                            [
                                                '<32>{#p/basic}{#npc/a}* Criança, eu tenho uma pergunta pra ocê, e só uma.',
                                                '<32>* ... você estava ao menos tentando?'
                                            ],
                                            [
                                                "<32>{#p/basic}{#npc/a}* Ei, não se sinta mal.\n* Ocê deu o seu melhor.",
                                                "<32>* ... ainda é bem paia que você não conseguiu chegar até o fim, de toda forma."
                                            ],
                                            [
                                                "<32>{#p/basic}{#npc/a}* Puxa, fale sobre cortar perto, hein garoto?",
                                                "<32>* Esse é um fim para anos!"
                                            ],
                                            [
                                                '<32>{#p/basic}{#npc/a}* Ocê se saiu muito bem para alguém sem prática.',
                                                "<32>* ... sorte de principiante, talvez?"
                                            ]
                                        ][SAVE.data.n.state_aerialis_crafterresult]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Trabalhar no laboratório é um perigo, vou te dizer.",
                                        '<32>* Ocê já esteve dentro do virtualismo?',
                                        "<32>* Lugar maravilhoso.\n* Mas dizem que você não deve passar das bordas."
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 6
                            ? ["<32>{#p/basic}{#npc/a}* Por que ocê não procura outra pessoa para espancar, hein?"]
                            : [
                                '<32>{#p/basic}{#npc/a}* Só espero que possamos expandir nossa base de usuários além daquele esqueleto excêntrico.'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* Se o fizessem, vocês já estariam em algum doo-doo profundo."]
                            : roomKills().a_elevator1 > 0
                                ? ["<32>{#p/basic}{#npc/a}* Ou não.\n* Só não me faça dizer que eu te avisei, você entendeu?"]
                                : SAVE.data.n.plot < 58
                                    ? iFancyYourVilliany()
                                        ? ["<32>{#p/basic}{#npc/a}* Não é como se eu tivesse um apelido na sua idade ou algo assim."]
                                        : [
                                            ["<32>{#p/basic}{#npc/a}* É incrível como ocê conseguiu chegar até aqui."],
                                            ["<32>{#p/basic}{#npc/a}* Parecia que ocê não ia."],
                                            ['<32>{#p/basic}{#npc/a}* Ocê talvez ganhe outra chance no próximo episódio.'],
                                            ['<32>{#p/basic}{#npc/a}* Talvez da próxima vez ocê poderia, eu num sei, ganhar mais confortavelmente?'],
                                            ['<32>{#p/basic}{#npc/a}* Ou talvez o MTT só pegou leve com ocê.']
                                        ][SAVE.data.n.state_aerialis_crafterresult]
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Sim, ocê ouviu direito.\n* Fora dos limites',
                                        '<32>* Agora, o que caramba é pra isso significar?'
                                    ]
            ),
            a_greenfire: pager.create(
                0,
                () =>
                    SAVE.data.n.plot < 56
                        ? [
                            "<32>{#p/basic}* Não se preocupe comigo, a escola foi boa hoje.",
                            "<32>* Eu só estou realmente procurando pelo próximo show da MTT.",
                            "<32>{#p/basic}* Você sabe quando vai começar?"
                        ]
                        : SAVE.data.n.plot < 68
                            ? [
                                '<32>{#p/basic}* Aquele show foi incrível!\n* O humano quase parecia real dessa vez.',
                                '<32>* Pera, eu já te vi antes?'
                            ]
                            : world.bad_robot
                                ? ["<32>{#p/basic}* Ack, que decaída.\n* E pensar que ele cancelou o seu grande show daquela forma..."]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        '<32>{#p/basic}* Você... fez mesmo?\n* Você matou o Mettaton de verdade?',
                                        "<32>{#p/basic}* Não... deve ser mentira.\n* Mettaton é muito popular para morrer!"
                                    ]
                                    : [
                                        '<32>{#p/basic}* Então o humano ERA real...\n* Uau, Mettaton deve ser MUITO bom em propaganda!',
                                        '<32>{#p/basic}* Aliás, sua performance foi muito boa.'
                                    ],
                () =>
                    SAVE.data.n.plot < 56
                        ? ['<32>{#p/basic}* Mettaton geralmente tem um cronograma, mas ele se esqueceu de fazer um desta vez.']
                        : SAVE.data.n.plot < 68
                            ? ['<32>{#p/basic}* Eu juro que você parece com aquele ator que o Mettaton trouxe...']
                            : world.bad_robot
                                ? ['<32>{#p/basic}* Oh bem, talvez em uma próxima.']
                                : SAVE.data.b.killed_mettaton
                                    ? ["<32>{#p/basic}* Eu não posso acreditar que quase caí pra isso!"]
                                    : ["<32>{#p/basic}* Eu não posso acreditar que não percebi que você era um humano antes!"]
            ),
            a_harpy: pager.create(
                0,
                () =>
                    SAVE.data.b.killed_mettaton
                        ? [
                            "<32>{#p/basic}* Eu sou um repórter!\n* A notícia de hoje é uma que realmente não queria dar!",
                            "<32>{#p/basic}* Vou perder minhas bolinhas de gude!!\n* Huhehehaw!"
                        ]
                        : roomKills().a_sans > 0
                            ? [
                                "<32>{#p/basic}* Eu sou um repórter!\n* A notícia de hoje é sobre morte e destruição!",
                                "<32>{#p/basic}* Você sabia que alguém foi morto bem na minha frente?\n* Huhehehaw!"
                            ]
                            : !world.badder_lizard
                                ? [
                                    "<32>{#p/basic}* Eu sou um repórter!\n* A notícia de hoje é sobre metal e magia.",
                                    "<32>{#p/basic}* Você sabia que o Mettaton é feito disso??\n* Huhehehaw!"
                                ]
                                : [
                                    "<32>{#p/basic}* Eu sou um repórter!\n* A notícia de hoje é sobre morte e destruição!",
                                    "<32>{#p/basic}* Você sabia que eu provavelmente vou morrer em algumas horas??\n* Huhehehaw!"
                                ],
                ['<32>{#p/basic}* Oh querido!\n* Eu realmente amo meu trabalho!']
            ),
            a_madguy: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* Quem, eu?\n* Alguém que evacuou?",
                                '<32>* Jamais.\n* Eu só fui com eles porque eles disseram que eu tinha que ir.',
                                '<32>* Eu entendo que você seja um tipo de bully ou sei lá...',
                                "<32>* ... mas não é como se você fosse me matar."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Todo mundo aqui por perto foi convidado para aquele rolê.",
                                "<32>* Mas eu?\n* Eu nem estou interessado.",
                                "<32>* Claro, eu estou feliz que você veio e salvou todos nós...",
                                "<32>* ... mas isso não significa que eu tenha que ficar parado e me entregar à planta Madrigal."
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Pobre, pobre Mettaton, seja o que você for fazer.',
                                '<32>* ...',
                                "<32>* Ah, é verdade.\n* Nada."
                            ]
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Pelo menos uma vez Mettaton fez a coisa certa e cancelou o show.',
                                    "<32>* Aquele grande finale não terminaria bem pra ele.",
                                    '<32>* Porquê?\n* Eu só tenho essa sensação.'
                                ]
                                : SAVE.data.n.bad_lizard < 2
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Eu sou uma das construtoras da fonte ORIGINAL daqui.',
                                        "<32>* Sabe.\n* Antes do Mettaton vir reconstruir ela toda.",
                                        "<32>* Tipo, quem faz isso? Quem reconstrói uma estrutura inteira pra mudar único detalhe?",
                                        '<32>* Bem ridículo, se você me perguntar.'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Eu nem ACREDITO que o Mettaton está administrando um show enquanto tem um assassino na área.",
                                        '<32>* Ele não percebe o quão perigoso isso é?',
                                        "<32>* Alguém vai acabar sendo morto fazendo essa loucura.",
                                        '<32>* Meio que idiotice, se você me pergunta.'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* Tipo, sério, pessoas?',
                                "<32>* Vocês realmente pensavam que eu queria correr dessa forma?",
                                "<32>* Qual foi.\n* Eu não sou TÃO mole.",
                                '<32>* ... ugh, esquece.'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Eu nunca fui muito de festas.",
                                '<32>* Meus hobbies e interesses consistem primeiramente em...',
                                '<32>* ... apontar e separar imitações pobres.',
                                '<32>* Tipo essa fonte.'
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Pelo que eu sei, isso é tudo culpa dele.",
                                '<32>* Ele ficou confiante demais e pagou o preço.',
                                "<32>* \"Que pena, que azar, sorte sua eu não te criar!\""
                            ]
                            : world.bad_robot && 68 <= SAVE.data.n.plot
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Quanto mais ele ficar longe da nossas vidas, melhor.',
                                    "<32>* Eu o pediria para nunca mais aparecer novamente, mas...",
                                    "<32>* ... assim eu não teria mais nada com o que reclamar."
                                ]
                                : SAVE.data.n.bad_lizard < 2
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Eu não sou o único.",
                                        '<32>* Já ouviu falar do \"Mr. Sepluv?\"',
                                        '<32>* É, ele era quem comandava o projeto de construção original.',
                                        '<32>* Mas agora... ele vende pedaços da lua como modo de vida.'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Eu estou por aqui, também.",
                                        "<32>* Então eu acho que sou tão culpado quanto."
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* Embaraçoso, não é?"]
                            : ["<32>{#p/basic}{#npc/a}* Inútil, não é?"]
                        : ["<32>{#p/basic}{#npc/a}* Irônico, não é?"]
            ),
            a_proskater: pager.create(
                0,
                () =>
                    SAVE.data.n.plot < 60
                        ? [
                            "<32>{#p/basic}{#npc/a}* Finalmente saí da escola, eu nem sei porque vou lá ainda...",
                            "<32>* Felizmente, ouvi dizer que o Mettaton tem algo super legal planejado para o próximo show.",
                            "<32>* Mal posso esperar, brah..."
                        ]
                        : SAVE.data.n.plot < 68
                            ? [
                                '<32>{#p/basic}{#npc/a}* Brah... aquilo foi loucura.',
                                '<32>* E... meio estranho?',
                                '<32>* Quer dizer, boa parte daquilo parecia tralha, mas o último item...',
                                '<32>* ... ouro puro, caramba!'
                            ]
                            : world.bad_robot
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Eu estou arruinado, brah...\n* Mettaton acabou de cancelar seu último show.",
                                    '<32>* Agora qual serão minhas desculpas pra faltar na aula...?'
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        "<32>{#p/basic}{#npc/a}* Brah.\n* Estou me sentindo muito triste em relação a morte do Mettaton.",
                                        "<32>* Eu vou ter desculpas para pular a aula mais algumas vezes, porém depois disso, é só ruína!"
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Brah.\n* Estou feliz que Mettaton vai ficar por aí.",
                                        "<32>* Se não fosse por ele eu teria bem menos desculpas para pular aula."
                                    ],
                () =>
                    SAVE.data.n.plot < 60
                        ? ['<32>{#p/basic}{#npc/a}* Espero que ele consiga competidores interessantes desta vez...']
                        : SAVE.data.n.plot < 68
                            ? ["<32>{#p/basic}{#npc/a}* Diga-me que VOCÊ não gostaria de uma boneca de anime de ficção científica em tamanho real."]
                            : world.bad_robot
                                ? ["<32>{#p/basic}{#npc/a}* É uma pena, brah."]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* Bem imprudente, Mettaton.\n* Bem imprudente.']
                                    : ["<32>{#p/basic}{#npc/a}* Aliás, eu estou faltando uma agora..."]
            ),
            a_clamguy: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* Eles dizem que as coisas podem ficar muito estranhas se você for longe demais nessa salas de repetição.',
                    '<32>* Túneis espaciais...\n* Flexões espaciais invariáveis...',
                    "<32>* E não me pergunte o que isso significa, eu só ouvi a Alphys falando uma vez.",
                    "<32>* Se não fosse ela falando, eu só pensaria que foi inventado..."
                ],
                ["<32>{#p/basic}{#npc/a}* Com tanto que você ainda consiga enxergar bem, você está tranquilo."]
            ),
            a_pyrope: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* Você foi um bully no passado, mas acabou tendo sua redenção...",
                                '<32>* Nós só voltamos para perguntar, você estava realmente sendo si mesmo?',
                                '<33>* Nem todo mundo gosta de você e outros ainda estão com medo...',
                                "<32>* Mas acho que é assim que funciona quando você tem violência correndo nas veias."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Quando chegarmos ao novo planeta natal, estaremos indo direto.",
                                "<32>* Com compassos e rimas tão voltados que vencerão outros escritores em seu prefácio.",
                                "<33>* Para quem nos desafiar, temos apenas quatro palavras...",
                                '<32>* Este é nosso mundo.'
                            ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Vulkin e eu fizemos um grupo de rap chamado \"Os Piromaniacos.\"',
                            '<32>* Nossas batidas? Fantásticas.\n* Nossos flows? Piroclásticos.',
                            "<33>* Quando eu subo no estágio, eu chego bombástico e faço a plateia derreter como plástico elástico.",
                            "<32>* E com o Vulkin?\n* Ele é um cara incrível para batidas quentes no microfone."
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ["<32>{#p/basic}{#npc/a}* Não se preocupe.", '<32>* Podemos esquecer das suas brutalidades.']
                            : ["<32>{#p/basic}{#npc/a}* Não se preocupe.", '<32>* Nossos fluxos são TODOS honestos.']
                        : ["<32>{#p/basic}{#npc/a}* Não se preocupe.", "<32>* Nossas medidas não são MUITO drásticas."]
            ),
            a_vulkin: pager.create(
                0,
                pager.create(
                    2,
                    () =>
                        SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}{#npc/a}* Uma nova casa significa uma nova plateia...',
                                '<32>{#p/basic}{#npc/a}* Ainda mais picante do que antes.'
                            ]
                            : ['<32>{#p/basic}{#npc/a}* Oh...\n* Quando a plateia chama pela gente, é tão... picante.'],
                    () =>
                        SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}{#npc/a}* Uma nova casa significa uma nova plateia...',
                                '<32>{#p/basic}{#npc/a}* Tão legal quanto antes.'
                            ]
                            : ['<32>{#p/basic}{#npc/a}* Oh...\n* Quando a plateia chama pela gente, é tão... legal.']
                ),
                pager.create(
                    2,
                    () =>
                        SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}{#npc/a}* Mais picante do que antes.']
                            : ['<32>{#p/basic}{#npc/a}* Tão picante.'],
                    () =>
                        SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}{#npc/a}* Mais legal que antes.']
                            : ['<32>{#p/basic}{#npc/a}* Tão legal.']
                )
            ),
            a_heats: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            ...(world.population < 6
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Aqueles guardas que me evacuaram desrespeitaram meu nome...',
                                    '<32>* Então eu voltei para respeitar o seu, Frisk!'
                                ]
                                : [
                                    '<32>{#p/basic}{#npc/a}* Você pode ou não saber meu nome...',
                                    '<32>* Mas eu sei o seu, Frisk!'
                                ]),
                            '<32>* Ha!\n* Eu disse!',
                            "<32>* E eu nunca vou esquece-lo!",
                            '<32>* Não agora.',
                            '<32>* Não DEPOIS!!',
                            '<32>* NUNCA!!!!',
                            '<32>* Eu JAMAIS, NUNCA irei esquecer seu nome, Frisk!!!!!!!!!'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Você sabe meu nome!?',
                            '<32>* ...',
                            "<32>* Espera, não responde.",
                            '<32>* Você...\n* V-você parece que sabe.',
                            '<32>* Você CHEIRA...\n* ...\n* ... como alguém que sabe.',
                            '<32>* ...',
                            "<32>* Eu aposto que se tocasse em você, sentiria como se você soubesse.",
                            "<32>* (Também seria muito, MUITOOOOOOO muito quente para você.)",
                            '<32>* Mas por que você sabe...?',
                            '<32>* Como... você sabe...',
                            '<32>* Isso, apenas você sabe.' 
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Eu. Jamais. Irei. Esquecer. JAMAAAAAAIIS!']
                        : ['<32>{#p/basic}{#npc/a}* Eu. Jamais. Irei. Saber. JAMAAAAAAIIS!']
            ),
            a_slime_father: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Minha esposa e filho me mostraram a verdade.\n* A vida não de todo mau.",
                            '<32>* Você pode querer acreditar que é de uma certa maneira, porque \"amadureceu...\"',
                            '<32>* Mas até mesmo o mais estóico monstro ou humano é apenas uma criança por dentro.',
                            "<32>* Bata na criança.\n* Acredite na vontade da criança.",
                            '<32>* Mesmo no seu momento mais escuro, faça da criança parte de você, e você será feliz.'
                        ]
                        : ['<33>{#p/basic}{#npc/a}* Ah, para ser jovem de novo.\n* O cosmos com certeza parecia limitado.'],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Não importa quem você é, está é a parte mais verdadeira de você.']
                        : ['<32>{#p/basic}{#npc/a}* Você parece jovem...', "<32>* Vá brincar!\n* O cosmo não é tão assustador!"],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Nunca se esqueça...']
                        : ['<32>{#p/basic}{#npc/a}* Vá lá...']
            ),
            a_slime_mother: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Hubby está apenas começando a aprender o que precisa.\n* Mas lembre-se...",
                            '<32>* Você deve tentar coisas novas e constantemente.',
                            '<32>* Sem isso, você se perderá em uma máscara que criou por conta própria.'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Hubby pensa que só por ser velho, ele não pode mais curtir a vida.",
                            "<32>* Mas sério, ele só não gosta de tentar coisas novas.",
                            childEvac()
                                ? '<33>* Nós levamos nossas crianças para a zona segura, mas como era nova para eles, eles estavam felizes!'
                                : '<32>* Nossas crianças tentam coisas novas o tempo todo, e olha como elas são felizes!'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Agora que estamos livres, o horizonte de novas coisas para testar se expandiu.",
                            '<32>* Visitar um novo mundo, descobrir mais sobre aqueles que você conhece ou criar um você mesmo...',
                            '<32>* Tudo é possível.'
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Se você acabar entediado com a vida, tente algo novo.",
                            childEvac()
                                ? '<32>* Pode ser um filme, um hobby, ou o estresse de dar segurança as suas crianças...'
                                : '<32>* Pode ser um filme, um hobby, ou mesmo uma língua...',
                            '<32>* Tudo é possível!'
                        ],
                ['<32>{#p/basic}{#npc/a}* O que você está fazendo?']
            ),
            a_slime_kid1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Agora vamos jogar Monstros...", '<32>* ... e monstros.']
                        : ['<32>{#p/basic}{#npc/a}* Você quer jogar Monstros e Humanos!?'],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Talvez essa não seja uma boa ideia."]
                        : ["<32>{#p/basic}{#npc/a}* Eu serei o humano."]
            ),
            a_slime_kid2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Eu escutei a mamãe dizendo que no novo planeta não terão humanos...",
                            "<32>* Eu acho que terei que aprender a jogar jogos monstros inteligentes ao invés."
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Eu quero aprender a jogar jogos humanos inteligentes, como xadrez.',
                            "<32>* Mamãe Starry alí é a melhor... ela pode vencer qualquer um!"
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* O que é \"Pôquer 4-D?\"']
                        : ['<32>{#p/basic}{#npc/a}* O que é um \"zugzwang?\"']
            ),
            a_diamond1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Então seu nome era Frisk, huh?',
                            '<32>* Seu show com o Mettaton foi legal e tudo...',
                            '<32>* Mas aquela sua \"batalha contra um deus\" foi ainda mais insana!'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                "<32>{#p/basic}{#npc/a}* Nós acabamos de chegar aqui e o Mettaton já está preparando seu primeiro show!",
                                '<32>* É chamado \"A procura pela estrela da humanidade.\"'
                            ]
                            : SAVE.data.n.plot < 68
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Nós viemos ver o grande finale do Mettaton, mas...",
                                    ...(iFancyYourVilliany()
                                        ? [
                                            "<32>* Eu não achei que veria o $(moniker1) tão de perto!",
                                            '<32>* ... você é o $(moniker1), certo?'
                                        ]
                                        : [
                                            "<32>* Eu não que conseguiria ver o humano tão de perto!",
                                            '<32>* ... você é o humano, certo?'
                                        ])
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? [
                                        iFancyYourVilliany()
                                            ? "<32>{#p/basic}{#npc/a}* Então você é $(moniker1), huh?"
                                            : "<32>{#p/basic}{#npc/a}* Você é o humano então, huh?",
                                        '<32>* ...'
                                    ]
                                    : [
                                        iFancyYourVilliany()
                                            ? "<32>{#p/basic}{#npc/a}* Ei, você é o $(moniker1), o melhor vilão da TV de todos!"
                                            : "<32>{#p/basic}{#npc/a}* Ei, você é o humano que derrotou Mettaton no próprio jogo!",
                                        '<32>* Que performance!'
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* A melhor parte é que todos nós conseguimos assentos na primeira fila!']
                        : SAVE.data.b.ubershortcut
                            ? ['<32>{#p/basic}{#npc/a}* Onde será que eles estão...']
                            : SAVE.data.n.plot < 68
                                ? ["<32>{#p/basic}{#npc/a}* Eu estou torcendo por você!"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* ... saí de perto de mim.']
                                    : ['<32>{#p/basic}{#npc/a}* ... você faz autógrafos?']
            ),
            a_diamond2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Você não desejava fazer tudo isso de novo!?",
                            '<32>* Uma batalha, não só pelo show, mas pela vida de todos no Outpost...',
                            '<32>* O quão maneiro é isso!'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                '<32>{#p/basic}{#npc/a}* Após o que Burgie fez, eu pensei que o Mettaton não faria mais shows de TV.',
                                '<32>* Mas agora...'
                            ]
                            : SAVE.data.n.plot < 68
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Você não está excitado pelo grande final!?",
                                    iFancyYourVilliany()
                                        ? '<32>* O grande final entre o Mettaton e o vilão humano $(moniker2)...'
                                        : '<32>* O grande final entre o Mettaton e sua estrela humana...',
                                    '<32>* Uma última resistência dramática por toda a glória da galáxia!'
                                ]
                                : SAVE.data.b.killed_mettaton
                                    ? ["<32>{#p/basic}{#npc/a}* Ele morreu...\n* O Mettaton, ele...", '<32>* ...']
                                    : [
                                        '<32>{#p/basic}{#npc/a}* Mettaton realmente nos pegou nesse final...',
                                        "<32>{#p/basic}{#npc/a}* Por um momento eu pensei que ele iria nos deixar!"
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* É bem paia não ter furado mais."]
                        : SAVE.data.b.ubershortcut
                            ? ["<32>{#p/basic}{#npc/a}* É bom tê-lo de volta."]
                            : SAVE.data.n.plot < 68
                                ? ["<32>{#p/basic}{#npc/a}* Eu estou torcendo pro Mettaton!"]
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* Eu quero ir pra casa...']
                                    : ["<32>{#p/basic}{#npc/a}* Eu me pergunto o que ele fará agora..."]
            ),
            a_gyftrot: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Se nós finalmente estamos indo para um novo mundo, eu vou encontrar um lugar frio pra morar.",
                            "<32>* Não é como se eu precisasse.\n* Mas pelo menos esse urso vai deixar de me dar presentes de dar pena."
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Este urso insiste em me presentear com enfeites para colocar na minha cabeça.',
                            '<32>* Eu sei que as intenções são boas, mas enfeites de cabeça são a última coisa que eu preciso...'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* ... hmm, talvez jovens não sejam tão ruins."]
                        : ["<32>{#p/basic}{#npc/a}* ... pelo menos não está me abraçando como os adolescentes."]
            ),
            a_giftbear: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Estou começando a pensar que minha pena por Gyftrot foi um reflexo da minha própria tristeza.',
                            '<32>* Eu mesmo ansiava por um ambiente frio, desde que me lembro...',
                            '<32>* Quando chegarmos ao nosso destino eu sairei a procura de um.'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Eu me sinto tão mal pelo Gyftrot.\n* É como se muitos de nós não vivêssemos em nossos habitats naturais.',
                            '<32>* Alphys disse que o escudo de força talvez quebre logo.',
                            '<32>* Talvez quando isso acontecer, todos possamos encontrar algum descanso.'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Por agora vou ficar com o Gyftrot.\n* Dar presentes a ele é a única forma que eu sei de contribuir."
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Por agora eu vou trabalhar para melhorar a vida daqueles menos felizes que eu.'
                        ]
            ),
            a_boomer: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                "<32>{#p/basic}{#npc/a}* Honestamente, chefe?\n* Eu estou agradecido que você bullinou todo mundo antes.",
                                "<32>* Eles podem estar com medo...",
                                '<33>* Mas pelo menos agora eles podem ser livre da vida de quebras-cabeças.'
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* O novo planeta natal vai ser uma beleza, chefe.",
                                '<32>* Você pode chutar o porquê?',
                                "<33>* Exatamente. Sem quebra-cabeças inúteis pra resolver."
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu não sei qual é a pira com esse cara Mettaton.",
                                '<32>* Você me entende, chefe?',
                                "<32>* Se você não conhece alguém pessoalmente, qual o motivo da raiva?"
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* Você sabe por que eu amo sair por aqui?',
                                "<32>* É simples, chefe.",
                                "<32>* Não tem quebra-cabeças pra resolver aqui."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* É, você me ouviu.',
                                "<32>* Eu prefiro temer pela minha vida do que ter que lidar com quebra-cabeças.",
                                "<32>* Isso é só como eu sou, chefe."
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* É, eu AINDA sou assim.',
                                '<32>* SÃO QUEBRA-CABEÇAS HORRÍVEIS.',
                                "<32>* Isso SEMPRE será fato, chefe."
                            ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu só estou sendo honesto.",
                                "<32>* Maior parte de nós nem sabe quem ele é como pessoa.",
                                "<32>* Só apenas fatos, chefe."
                            ]
                            : [
                                '<32>{#p/basic}{#npc/a}* É, eu disse.',
                                '<32>* Eu disse poh!',
                                "<32>* Só apenas fatos, chefe."
                            ],
                ['<32>{#p/basic}{#npc/a}* Chefe.']
            ),
            a_artgirl: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Eu sou uma professora de artes.\n* Mas estou pensando em sair.",
                            "<32>* Eu prefiro um trabalho onde eu não precise criticar as pessoas...",
                            '<32>* Um trabalho onde tudo que eu preciso fazer é colocar um sorriso no rosto das pessoas.'
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu sou uma professora de artes.\n* Artes é supostamente para ser legal e positivo, certo?",
                                '<32>* Mas um dos meus estudantes começou a desenhar trabalhos muito tristes.',
                                "<32>* Dói olhar...\n* Eu quero olhar, mas eu também não quero impedi-lo de se expressar."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* Eu sou uma professora de artes.\n* Na arte, é dito que não existe caminho certo ou errado.",
                                '<32>* Mas um dos meus estudantes pensa que tudo que ele faz é um erro...',
                                "<32>* Ele não para de pedir desculpas...\n* Eu quero ajudá-lo, mas eu estou perdida no que fazer."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}{#npc/a}* Não seria legal?"]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* Por que todo mundo não pode fazer coisas legais o tempo todo?"]
                            : ['<33>{#p/basic}{#npc/a}* Por que ensinar um assunto subjetivo é tão objetivamente difícil?']
            ),
            a_drakemom: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Então. Um novo mundo, né?\n* Meu filho e eu vamos fazer tantas coisas boas juntos.',
                            "<32>* Tantas coisas boas.\n* Especialmente aquele lugar que a antiga professora de artes tem em mente.",
                            "<32>* Então, nós iremos pro jantar, filmes... e o pai dele virá, também.",
                            "<32>* Garotos crescidos tem tantas necessidades, não tem?\n* Então é justo.",
                            "<32>* Eu me pergunto se o amigo do meu filho estaria interessado...?"
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                "<32>{#p/basic}{#npc/a}* Algo aconteceu?\n* Eu estive focado no jogo aqui, eu não percebi nada.",
                                "<32>* Mas tá tudo bem.\n* O jogo é importante demais pra abandonar agora."
                            ]
                            : postSIGMA()
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Todas as luzes apagaram agora pouco, sabe.\n* Então, estou um pouco com medo.",
                                    '<32>* Se eu sair agora, meu oponente pode voltar e roubar a vitória de baixo das minhas asas!'
                                ]
                                : SAVE.data.b.ubershortcut || world.population === 0
                                    ? [
                                        '<33>{#p/basic}{#npc/a}* Bem. Eu sentei nesta mesa aqui.\n* E organizei este jogo aqui.\n* Mas meu oponente?',
                                        '<32>* Não encontro! Não está em lugar nenhum neste belo estabelecimento!'
                                    ]
                                    : [
                                        "<32>{#p/basic}{#npc/a}* Bem. Eu joguei esse movimento aqui.\n* Peão para o cavalo quatro do rei?\n* Então meu oponente foi embora.",
                                        "<32>* Agora, eu vou ter que esperar.\n* Sabe, vai demorar um tempo até o relógio apitar."
                                    ],
                () =>
                    SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}{#npc/a}* Diversão para toda a família.']
                        : SAVE.data.b.killed_mettaton
                            ? ['<32>{#p/basic}{#npc/a}* Tudo que importa é o jogo.']
                            : postSIGMA()
                                ? ['<32>{#p/basic}{#npc/a}* Você nunca sabe que tipo de truques seu oponente vai jogar.']
                                : SAVE.data.b.ubershortcut || world.population === 0
                                    ? ["<32>{#p/basic}{#npc/a}* É uma verdadeira decepção.\n* Imensurável, até."]
                                    : ["<32>{#p/basic}{#npc/a}* Sem chances de eu cronologicamente me recuperar disso."]
            ),
            a_drakedad: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? [
                                '<32>{#p/basic}{#npc/a}* Você pode ter nós assustado, mas pelo menos nos salvou no final.',
                                "<32>* Mas ainda assim não posso dizer que não estou com medo de ti."
                            ]
                            : SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Desculpando-se ou não, você fez muito mau ao machucar meu filho.",
                                    '<32>* Obrigado por sua gentil ação.'
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* Agora que estamos livres, ser um garçom não me serve mais.",
                                    "<32>* Nosso filho voltou, então eu terei que encontrar um novo trabalho..."
                                ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/basic}{#npc/a}* Tudo aqui está caindo aos pedaços.\n* As pessoas querem o que é deles de volta.',
                                "<32>* Eles pararam de vir comer no nosso restaurante chique.",
                                '<32>* Em favor do Fast Food.'
                            ]
                            : SAVE.data.b.s_state_chilldrake
                                ? [
                                    "<32>{#p/basic}{#npc/a}* Ouvi falar de você dos amigos do meu filho, eles me disseram que ele está todo machucado...",
                                    "<32>* Você poderia pedir desculpas para ele por mim?\n* Significaria o universo."
                                ]
                                : [
                                    "<32>{#p/basic}{#npc/a}* Eu sou um garçom.\n* Minha esposa é grão-mestre no xadrez e meu filho comediante.",
                                    '<32>* Eles dizem que ser garçom é um trabalho entediante, mas ele serve para mim.',
                                    "<32>* É claro, eu também sou um pai.\n* Eu me preocupo, pois ele não vem pra casa com frequência...",
                                    '<32>* Invés disso, ele fica contando piadas com seus amigos em Starton.'
                                ],
                () =>
                    SAVE.data.n.plot === 72
                        ? world.population < 2
                            ? ['<32>{#p/basic}{#npc/a}* Só tente ser bom partindo de agora, tudo bem?']
                            : SAVE.data.b.s_state_chilldrake
                                ? ['<32>{#p/basic}{#npc/a}* Muitíssimo obrigado.']
                                : ["<32>{#p/basic}{#npc/a}* Talvez eu me torne um bartender."]
                        : SAVE.data.b.killed_mettaton
                            ? ["<32>{#p/basic}{#npc/a}* Se as coisas continuarem assim, eu temo ter que sair do meu trabalho."]
                            : SAVE.data.b.s_state_chilldrake
                                ? ['<32>{#p/basic}{#npc/a}* Só me prometa que você será.']
                                : ['<32>{#p/basic}{#npc/a}* Pelo menos as piadas são engraçadas.']
            ),
            a_reg: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* O segurança saiu para uma festa faz pouco tempo, mas eu decidi ficar.',
                            '<32>* Afinal, por que ir a qualquer outro lugar, quando você pode absorver a aura...',
                            '<32>* ... de uma flor do desejo...'
                        ]
                        : SAVE.data.b.ubershortcut
                            ? [
                                "<32>{#p/basic}{#npc/a}* Eu estava entediado então comecei a respirar a aura da flor do desejo.",
                                "<32>* Essa não é TÃO ruim, mas deve ter alguma por aí...",
                                "<32>* ... que talvez ultrapasse os limites."
                            ]
                            : [
                                "<32>{#p/basic}{#npc/a}* O segurança me expulsou por absorver as auras das flores dos desejos.",
                                SAVE.data.b.killed_mettaton
                                    ? '<32>* Aquele cara famoso distraiu todo mundo, então agora seria minha chance de voltar...'
                                    : world.genocide
                                        ? '<32>* As luzes apagaram agora pouco, então eu provavelmente poderia voltar pra dentro...'
                                        : '<32>* Os guardas bateram o ponto, então eu provavelmente poderia voltar...',
                                "<32>* ... mas, ahh, está é a melhor que eu encontrei em muito tempo..."
                            ],
                ["<32>{#p/basic}{#npc/a}* Não se preocupe comigo, estou só vou ficar aqui... absorvendo a aura de uma flor dos desejos."]
            ),
            a_oni: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Após todo nosso trabalho, nós conseguimos sair vivos.",
                            "<32>* Francamente, estou cansado desse trabalho.\n* Mas foi uma boa jornada.",
                            "<32>* Talvez, quando chegarmos no novo mundo, eu trabalhe na fábrica.",
                            "<32>* E não venha me dizer que é a mesma coisa de trabalhar no CORE.",
                            "<32>* Pelo menos agora, nós não teremos aquelas duas garotas grudadas no nosso cangote...",
                            "<32>* Não, Catty, eu não quero dormir com você!\n* Fim da história!"
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Muito tempo atrás, foi encontrado um pouco fraco no escudo de força. Onde hoje são as Outlands.',
                            "<32>* Não significa que podemos escapar por lá, mas todo humano que vier...",
                            '<32>* ... vai cair mais ou menos por aquela área.',
                            '<32>* Então, construímos o posto avançado para ser longo, sinuoso e retardar uma invasão em potencial.',
                            "<32>* Logo descobrimos a burrice da ideia, mas então se tornou uma tradição.",
                            "<32>* Agora, você não anda dois segundos sem de perder..."
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#npc/a}* Ela sempre se levantou no meu caso assim.",
                            '<32>* Eh...\n* Eu acho que poderia ser pior.',
                            "<32>* Nós poderíamos ainda estar trabalhando para aquele robô estúpido."
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Pelo menos o CORE não foi construído com essa ideia.",
                            "<32>* Imagine a tortura que seria andar por labirintos para fazer manutenção?"
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/basic}{#npc/a}* Vamos lá, vocês dois...']
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}{#npc/a}* Só vamos ficar felizes que finalmente acabou."]
                            : ['<32>{#p/basic}{#npc/a}* Por favor e não, obrigado.']
            ),
            a_charles: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Então parece que meu trabalho acabou.\n* Sem mais CORE.',
                            '<32>* Na verdade, tem core sim.\n* Mas não pra gente.',
                            '<32>* Qualquer hora agora, iremos ir embora e jamais retornar.',
                            '<32>* O que será do meu futuro?',
                            '<32>* Cara, eu com certeza gostaria de saber!'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Eu trabalho no CORE.\n* Era para o design se parecer com um pássaro.',
                            '<32>* Oh! Eu aposto que você só sabe o que significa \"CORE\"!',
                            '<32>* Significa \"Carregado de Ônio com íons de Refatoração Eletrizados.\"',
                            '<32>* O que isso significa?',
                            '<32>* Sei lá.'
                        ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#npc/a}* Talvez, em uma linha do tempo alternativa, eu posso ser o rei.',
                            '<32>* Sou eu, o bom Rei Charles a seu serviço!',
                            "<32>* Isso não seria legal!"
                        ]
                        : [
                            "<32>{#p/basic}{#npc/a}* Outra coisa que eu acho legal sobre o Core são as alavancas.",
                            "<32>* Ambas são muito bem guardadas, mas uma é por guardas e outra é por quebra-cabeças!",
                            '<32>* Eu amo quebras-cabeças!'
                        ]
            ),
            a_dragon: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Então você tá me dizendo que o próximo show de comedia não sairá pelas próximas duas semanas??",
                    '<32>* Eu pensei que era hoje!'
                ],
                [
                    "<32>{#p/basic}{#npc/a}* Então você tá me dizendo que não posso reagendar meu acento para uma data mais tarde?",
                    '<32>* Isso é um roubo!'
                ]
            ),
            a_foodreceptionist: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você descansa o braço na bancada abandonada.)']
                        : adultEvac()
                            ? world.bulrun
                                ? ['<32>{#p/basic}* ... mas todo mundo fugiu.']
                                : ['<32>{#p/basic}* ... mas ninguém veio.']
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/basic}{#npc/a}* Blub blub...\n* (Todas as reservas canceladas.)\n* (Sessão dois, clausula: Liberdade.)',
                                    "<32>* (Você não leu os termos e condições...?)"
                                ]
                                : music.sansdate.instances.length > 0
                                    ? [
                                        '<32>{#p/basic}{#npc/a}* Blub blub...\n* (Espero que você e seu par tenham tido um ótimo jantar.)',
                                        '<32>* (Aquela parece ter sido uma ótima conversa.)'
                                    ]
                                    : SAVE.data.b.killed_mettaton
                                        ? [
                                            '<32>{#p/basic}{#npc/a}* Blub blub...\n* (Reservas pela metade do preço com nosso cupom de tempo limitado da MTT!)'
                                        ]
                                        : world.population < 2
                                            ? ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (Dia após dia, tudo parece estar mais triste...)']
                                            : [
                                                "<32>{#p/basic}{#npc/a}* Blub blub...\n* (Você precisa reservar uma mesa pra comer aqui.)",
                                                "<32>* (As garotas ficam com raiva quando as reservas não estão em ordem.)"
                                            ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você descansa o braço na bancada abandonada.)']
                        : adultEvac()
                            ? world.bulrun
                                ? ['<32>{#p/basic}* ... mas todo mundo fugiu.']
                                : ['<32>{#p/basic}* ... mas ninguém veio.']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (Te vejo no planeta natal...)']
                                : SAVE.data.b.killed_mettaton
                                    ? ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (O cupom expira amanhã.)']
                                    : ['<32>{#p/basic}{#npc/a}* Blub blub...\n* (Não tem reservas disponíveis no momento.)']
            )
        },
        genotext: {
            timewaster: () =>
                [
                    ['<25>{#p/asriel2}{#f/10}* Pra quê estamos voltando por aqui de novo?'],
                    ["<25>{#p/asriel2}{#f/7}* Nós não precisamos fazer isso."]
                ][Math.min(SAVE.flag.n.ga_asrielTimewaster++, 1)],
            asriel46: ['<25>{#p/asriel2}{#f/13}* Nossa... é estranho voltar aqui com você ao meu lado.'],
            asriel47: [
                "<25>{#p/asriel2}{#f/4}* É como... entrar em um campo de batalha com seu amigo.",
                "<25>{#f/3}* Porque era assim que esse lugar era pra mim."
            ],
            asriel48: [
                '<25>{#p/asriel2}{#f/13}* Mas poderia ser pior.',
                '<25>{#p/asriel2}{#f/13}* ... pelo menos nós temos um ao outro, certo?'
            ],
            asriel49: [
                '<25>{#p/asriel2}{#f/13}* Imagina... a cidade de Aerialis.',
                "<25>{#f/16}* É uma tristeza ela nunca ter sido finalizada."
            ],
            asriel50: [
                "<25>{#p/asriel2}{#f/3}* Aparentemente, ela teria o dobro do tamanho da Cidadela.",
                '<25>{#f/4}* Imagina só a nós dois, acima de todo aquele resplendor...',
                "<25>{#f/3}* Não seria satisfatório?"
            ],
            asriel51: [
                '<25>{#p/asriel2}{#f/4}* De toda forma, uma cidade desse tamanho é só uma ideia.',
                '<25>{#f/13}* E você sabe como essas coisas vão pra gente.'
            ],
            asriel52: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/6}* Deixa eu adivinhar, o elevador não leva pro terceiro piso?",
                        '<25>{#f/8}* ...',
                        "<25>{#f/7}* Eu deveria imaginar que eles nos fariam pegar o caminho longo."
                    ],
                    ['<25>{#p/asriel2}{#f/8}* Um piso a menos, dois pisos a frente...']
                ][Math.min(SAVE.flag.n.ga_asriel52++, 1)],

            hotel0: () =>
                SAVE.flag.b.asriel_electrics
                    ? [['<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/7}* Certo.'], []][
                    Math.min(SAVE.flag.n.ga_asrielElectrics0++, 1)
                    ]
                    : [
                        [
                            "<25>{#p/asriel2}{#f/6}* Está escuro... isso não é nada normal.",
                            "<25>{#f/7}* Alguém deve ter vindo por dentro e cortado a eletricidade."
                        ],
                        ['<25>{#p/asriel2}{#f/10}* Sério, quem desligou as luzes?'],
                        []
                    ][Math.min(SAVE.flag.n.ga_asrielHotel0++, 1)],
            hotel1: () =>
                SAVE.flag.n.genocide_milestone < 5
                    ? SAVE.flag.b.asriel_electrics
                        ? [
                            '<25>{#p/asriel2}{#f/15}* Parando pra pensar...',
                            '<25>{#f/16}* Isso parece ter sido causado por magia.',
                            "<26>{#f/3}* Então é isso, eu acho."
                        ]
                        : [
                            '<25>{#p/asriel2}{#f/10}* Sem escudo de segurança...?',
                            '<25>{#f/10}{#x1}* E veja, os emissores estão queimados.'
                        ]
                    : [
                        '<25>{#p/asriel2}{#f/13}* ... loucura, esse dano foi causado pela magia dela...',
                        '<25>{#p/asriel2}{#f/1}* Que poder amedrontador.'
                    ],
            hotelElectrics: [
                '<25>{#p/asriel2}{#f/10}* A nota no balcão, você a viu?',
                '<25>{#f/6}* Se Alphys esteve aqui mais cedo, isso explica as luzes.',
                '<25>{#f/15}* Mas pra desligar toda a energia do rec center de uma vez...',
                "<25>{#f/16}* ... esse não deveria ser possível..."
            ],
            hotel2: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/3}* Abandonado.\n* Como você deve ter esperado.",
                        "<25>{#f/4}* ... vamos, vamos logo para o CORE."
                    ],
                    []
                ][Math.min(SAVE.flag.n.ga_asrielHotel2++, 1)],
            core0: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/3}* No fim...',
                        '<25>{#f/4}* Aqui está o centro de poder do Outpost.',
                        '<25>{#p/asriel2}{#f/8}* Fique por perto, o esquadrão de ELITE deve estar por perto.'
                    ],
                    []
                ][Math.min(SAVE.flag.n.ga_asrielCore0++, 1)],
            core1: ['<25>{#p/asriel2}{#f/10}* Sem guardas...?', '<25>{#f/15}* Cara... eles realmente tem medo da gente.'],
            core2: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/3}* Finalmente, a sala de controle central.',
                        "<25>{#f/3}* Daqui, tem um controle para praticamente tudo.",
                        '<25>{#f/15}* Revestimento por gravidade, distribuição de calor, até a atmosfera...',
                        '<25>{#f/4}* Tudo aqui roda por esse sistema.',
                        "<25>{#f/3}* Vamos ver se meu código de acesso real ainda funciona.",
                        "<25>{#f/2}* Eu não perdoaria se eles esquecessem..."
                    ],
                    [
                        '<25>{#p/asriel2}{#f/6}* Beleza, voltamos.',
                        ...(SAVE.flag.b.asriel_access ? [] : ["<25>{#f/7}* Vamos de código de acesso real."])
                    ]
                ][Math.min(SAVE.flag.n.ga_asrielCore2++, 1)],
            core3: () => [
                '<26>{*}{#p/asriel2}{#f/6}* Sistema, estender ponte, autorização Asriel ESTRELAS-4-7-7-4.{^40}{%}',
                ...(SAVE.flag.b.asriel_access ? [] : ['<25>{*}{#f/6}* ...{^40}{%}', '<25>{*}{#f/7}* Acho que- {%}'])
            ],
            core4a: ['<25>{#p/asriel2}{#f/10}* Acho que funciona.'],
            core4b: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/3}* Você acha que pode abrir a porta pra mim enquanto arrumo aqui?',
                        '<25>{#f/4}* Escolha um lado, esquerda ou direita, e aperta a alavanca no final.',
                        "<25>{#f/1}* Eu vou estar esperando."
                    ],
                    ["<25>{#f/4}* Eu faço minha parte e você a sua."]
                ][Math.min(SAVE.flag.n.ga_asrielCore4++, 1)],
            core5: ['<25>{#p/asriel2}{#f/8}* Caminho errado, $(name).'],
            core6a: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/16}* Sincronia perfeita.\n* Estamos prontos para ir agora.',
                        "<25>{#f/1}* Tudo que precisamos agora é chegar no ônibus espacial...",
                        '<25>{#f/9}* Desencadear a explosão...',
                        '<25>{#f/2}* E marchar com a onda de choque para a liberdade.',
                        "<25>{#f/17}* ... você não está animado, $(name)?",
                        "<25>{#f/17}* Você não está feliz?",
                        "<25>{#f/18}* ...\n* Nós seremos livres!"
                    ],
                    ['<25>{#p/asriel2}{#f/9}* Pronto quando você estiver, $(name).']
                ][Math.min(SAVE.flag.n.ga_asrielCore5++, 1)],
            core6b: ["<25>{#p/asriel2}{#f/16}* Atrás de você."],
            core7a: ['<25>{#p/asriel2}{#f/8}* Espera, eu acho que escutei algo.'],
            core7b: [
                "<25>{#p/asriel2}{#f/3}* É o Mettaton.\n* Ele está esperando na próxima sala.",
                '<25>{#f/10}* Consigo ver apenas a silhueta...',
                '<25>{#f/6}* Talvez se chegarmos na fina, podemos mata-lo de surpresa.'
            ],
            core7c: ['<25>{#p/asriel2}{#f/7}* Você sabe o que fazer.'],
            core8a: [
                "<32>{#p/mettaton}* Você realmente acha que irei deixa-los fugir tão facilmente?",
                "<25>{#p/asriel2}{#f/8}* ...\n* Não diga besteira Mettaton, é obvio que você não vai.",
                "<25>{#p/asriel2}{#f/7}* Só não vai importar quando você estiver morto."
            ],
            core8aX: () => [
                "<32>{#p/mettaton}* Você realmente acha que irei deixa-los fugir tão facilmente?",
                "<25>{#p/asriel2}{#f/8}* Nós já tivemos essa conversa, cabeça.",
                '<32>{#p/mettaton}* Ah...',
                "<32>{#p/mettaton}* Isso significa que eu já te matei antes, não é?",
                ...(SAVE.flag.n.genocide_milestone < 4
                    ? [
                        "<32>{#p/mettaton}* Heh... não se preocupe, querido. Irei te matar ainda mais rápido dessa vez."
                    ]
                    : [
                        '<25>{#p/asriel2}{#f/2}* Oh, como você é ingênuo.',
                        "<25>{#p/asriel2}{#f/1}* Foi VOCÊ quem morreu pra gente, e vamos fazer acontecer de novo.",
                        '<32>{#p/mettaton}* ...',
                        "<32>{#p/mettaton}* Boa tentativa, mas eu não serei enganado facilmente."
                    ])
            ],
            core8b: [
                "<25>{#p/asriel2}{#f/4}* ... diga, como você está prestes a ser quebrado em pedaços...",
                "<25>{#f/3}* Você não parou pra pensar na sua família?",
                '<25>{#f/1}* Sabe.\n* Como você os abandonou e tudo.',
                '<32>{#p/mettaton}* Minha família estaria orgulhosa de mim se soubesse o que eu estou fazendo.',
                '<32>* Já pra você...?',
                "<32>* Eu não posso dizer o mesmo.",
                "<25>{#p/asriel2}{#f/6}* É bom que eu não me importo com eles, então.",
                '<25>{#f/8}* Você, entretanto, tem uma fraqueza emocional...',
                '<25>{#f/6}* Com isso sozinho, está batalha acabou antes de começar.'
            ],
            core8c: [
                '<32>{#p/mettaton}* Escute, querido.',
                "<32>* Seja lá o que você tem pra dizer, não importa.",
                "<32>* Tudo que importa é que vocês serão mortos por minhas mãos.",
                '<32>* Por toda sua conversa de vitória e invencibilidade...',
                '<32>* Por todo o genocídio que você ama fazer ao redor...',
                "<32>* Tem um poder que você esqueceu de considerar."
            ],
            core8d: ['<25>{#p/asriel2}{#f/10}* E o que seria?'],
            core8e: ['<32>{*}{#p/mettaton}{#f/1}* O poder do NEO.{^40}{%}'],
            azzyBpants: ['<25>{#p/asriel2}{#f/8}* Porra.\n* Por que ele ainda tá por aqui?']
        },
        coreswitched: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você não consegue mais operar o interruptor.)"]
                : world.darker
                    ? ["<32>{#p/basic}* Tá preso, como sempre."]
                    : SAVE.data.n.plot === 72
                        ? ["<33>{#p/basic}* A alavanca... não foi usada nenhuma vez. Isso pode acontecer as vezes, sinceramente."]
                        : ['<32>{#p/basic}* A alavanca é... de uso único.\n* E totalmente não presa como todas as outras.'],
        puzzlesolved: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Você não consegue mais operar o interruptor.)"]
                : world.darker
                    ? ["<32>{#p/basic}* Tá preso, como sempre."]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* A alavanca parece ainda mais resistente à pressão do que antes.']
                        : ["<32>{#p/basic}* A alavanca não quer mais ser pressionada.\n* ... sim, está emperrada."],
        nosleep: () =>
            SAVE.data.b.svr ? ["<32>{#p/human}* (Você não consegue encontrar uma maneira de entrar.)"] : ["<32>{#p/basic}* Está trancado."],
        rg1chat: pager.create(
            0,
            [
                '<32>{#p/basic}{#x1}* Meu namorado e eu nos perdemos procurando por sorvete no treino...{#x3}',
                '<32>{#x1}* Eventualmente, nós desistimos e comemos uma pizza.{#x3}',
                "<32>{#x1}* Então tomamos este posto de segurança, já que somos qualificados para isso.{#x3}"
            ],
            [
                "<32>{#p/basic}{#x1}* Me disseram que os guardas tem descontos SUPER exclusivos nas lojas.{#x3}",
                '<32>{#x1}* Mas este é 0% do motivo de termos vindo aqui, juro.{#x3}'
            ]
        ),
        rg2chat: pager.create(
            0,
            [
                "<32>{#p/basic}{#x2}* Ei, você não é, aquela criança quieta que a gente viu mais cedo?{#x3}",
                '<32>{#x2}* Me pergunta porque Alphys tinha que te escoltar...{#x3}',
                '<32>{#x2}* Talvez você seja... MEGA importante.{#x3}'
            ],
            [
                "<32>{#p/basic}{#x2}* Se você ficar famoso, não esquece da gente quando chegar lá, beleza?{#x3}",
                "<32>{#x2}* Você sempre tem que se lembrar dos manos que conhece ao longo do caminho.{#x3}"
            ]
        ),
        elevator1: () => [
            choicer.create('* (Onde você gostaria de ir?)', 'Cancelar', 'CORE Começo', 'CORE Fim', 'A Cidadela')
        ],
        elevatorStory1: () => [choicer.create('* (Onde você gostaria de ir?)', 'CORE Começo', 'Cancelar')],
        elevator2: () => [
            choicer.create('* (Onde você gostaria de ir?)', 'Aerialis', 'Cancelar', 'CORE Fim', 'A Cidadela')
        ],
        elevatorStory2: () => [choicer.create('* (Onde você gostaria de ir?)', 'Aerialis', 'Cancelar')],
        elevator3: () => [
            choicer.create('* (Onde você gostaria de ir?)', 'Aerialis', 'CORE Começo', 'Cancelar', 'A Cidadela')
        ],
        elevatorStory3: () => [choicer.create('* (Onde você gostaria de ir?)', 'A Cidadela', 'Cancelar')],
        elevator4: () => [
            choicer.create('* (Onde você gostaria de ir?)', 'Aerialis', 'CORE Começo', 'CORE Fim', 'Cancelar')
        ],
        dinnerdate1: pager.create(
            0,
            () => [
                "<25>{#p/sans}* ei, tá visitando por aqui?",
                '<25>{#p/sans}{#f/2}* quer jantar comigo rapidão?',
                choicer.create('* (Jantar?)', 'Sim', 'Não')
            ],
            () => ['<25>{#p/sans}{#f/2}* mudou de ideia?', choicer.create('* (Jantar?)', 'Sim', 'Não')]
        ),
        dinnerdate2a: pager.create(
            0,
            ["<25>{#p/sans}{#f/3}* tudo bem, então.\n* eu vou estar aqui se você trocar de ideia."],
            ['<25>{#p/sans}{#f/3}* ok, então.']
        ),
        dinnerdate2b: ['<25>{#p/sans}{#p/sans}{#f/0}* legal.'],
        dinnerdate3: ['<25>{#p/sans}{#f/2}* por aqui.'],
        dinnerdate4: ['<25>{#p/sans}* aqui estamos nós.'],
        dinnerdate5: ['<25>{#p/sans}* essa mesa parece boa.'],
        dinnerdate5b: ["<25>{#f/2}* eu vou sentar na direita, senta na esquerda."],
        dinnerdate8: () => [
            '<25>{#p/sans}* então...',
            "<25>{#f/3}* sua jornada está quase acabando, huh?",
            '<25>{#f/0}* você deve estar realmente querendo sair daqui.',
            '<25>{#f/0}* ... heh.\n* confia em mim, eu sei a sensação, cara.',
            ...(world.bad_lizard < 1 && SAVE.data.n.bully < 15
                ? [
                    "<25>{#f/3}* ... eu também sei que você tem muito pra deixar pra trás.",
                    "<25>{#f/0}* por aqui você tem comida, bebida, amigos...",
                    '<25>{#f/2}* ficar aqui com a gente seria realmente tão ruim?'
                ]
                : [
                    "<25>{#f/3}* ... eu também sei que você tem muito na mente.",
                    "<25>{#f/0}* mas seja lá o que você fez...",
                    '<25>* sair daqui realmente vale todas estas dificuldades?'
                ])
        ],
        dinnerdate10: ['<25>{#f/0}* ...'],
        dinnerdate11: () => [
            '<25>{#f/3}* deixa eu te contar uma historia.',
            "<25>{#f/0}* então, eu sou um sentinela real, correto?",
            '<25>{#f/0}* meu trabalho é sentar e esperar por humanos.',
            "<25>{#f/3}* mas acho que a essa altura você já percebeu...",
            '<25>{#f/2}* que eu peguei esse trabalho para PROTEGER os humanos.',
            ...(SAVE.data.n.state_foundry_undyne > 0
                ? [
                    "<25>{#f/3}* eu me preocupo caso alguém descubra, mas... sabe.",
                    "<25>{#f/0}* não são muitas pessoas hoje em dia que ligariam."
                ]
                : world.bad_lizard < 1 && SAVE.data.n.bully < 15
                    ? ["<25>{#f/4}* shh, não fala isso pra undyne.\n* ela não iria gostar."]
                    : ["<25>{#f/0}* ... irônico, não é?"]),
            "<25>{#f/0}* de tudo forma, eu tenho esse trabalho bem chato, né?",
            "<25>{#f/0}* felizmente, tem um lugar lá na ponta de starton.",
            "<25>{#f/0}* Lá tem uma ponte e no final da ponte uma grande e velha porta.",
            '<25>{#f/4}* essa porta era PERFEITA para praticar piadas de toque toque.',
            "<25>{#f/0}* um dia, eu estava lá praticando como sempre...",
            '<25>{#f/0}* e eu bato na porta e digo \"toque toque.\"\n* como sempre.',
            '<25>{#f/0}* mas então, do outro lado...',
            "<25>{#f/3}* eu escutei a voz de uma mulher.",
            '<32>{#p/soriel}* \"Quem está aí?\"',
            '<25>{#p/sans}{#f/0}* naturalmente, eu respondi.',
            '<25>{#f/2}* \"máque.\"',
            '<32>{#p/soriel}* \"Máque quem?\"',
            '<25>{#p/sans}{#f/4}* \"máque que você tá fazendo aqui?\"',
            '<25>{#f/0}* e ela caiu na risada.',
            "<25>* como se fosse a primeira piada que ela ouviu em cem anos.",
            '<25>{#f/2}* então, eu fui contando algumas mais.',
            '<25>{#f/0}* após mais de meia dúzia delas, ELA bateu e disse...',
            '<32>{#p/soriel}* \"Toque toque!\"',
            '<25>{#p/sans}* eu disse \"quem está aí?\"',
            '<32>{#p/soriel}* \"Você.\"',
            '<25>{#p/sans}* \"você quem?\"',
            '<32>{#p/soriel}* \"Você não tem o que fazer, rapaz?\"',
            '<25>{#p/sans}{#f/0}* ... heh.',
            '<25>{#f/2}* pra dizer o mínimo, essa mulher tem o molho.',
            '<25>{#f/0}* nós continuamos indo, mas eventualmente, ela teve que ir.',
            '<25>{#f/0}* mas, no outro dia...',
            '<25>* ela estava esperando por mim quando eu retornei.',
            '<25>{#f/3}* ... e garoto, ela tinha muito o que dizer.',
            '<32>{#p/soriel}* \"... Eu só senti que essa era a coisa certa a se fazer...\"',
            '<32>{#p/soriel}* \"... Eu precisei protegê-los...\"',
            '<32>{#p/soriel}* \"... nunca mais será como antes...\"',
            '<25>{#p/sans}{#f/3}* aparentemente, essa mulher era mais do que uma boa ouvinte.',
            '<25>{#f/0}* oh, e ela também tinha muita coisa para falar sobre o asgore.',
            "<25>{#f/3}* eu vou te poupar dos detalhes, mas vamos dizer...",
            "<25>{#f/2}* que exilio pode realmente ferrar com a mente de uma pessoa."
        ],
        dinnerdate13: ['<25>{#p/sans}{#f/0}* opa, eu esqueci de pedir algo, não foi?', '<25>* ...'],
        dinnerdate14: ["<25>{#f/3}* eu vou lá pegar algo."],
        dinnerdate14comment: () =>
            world.darker
                ? ['<32>{#p/basic}* ...']
                : SAVE.data.b.oops
                    ? ['<32>{#p/basic}* Sabe, não tem experiência tão única como esperar por comida.']
                    : [
                        '<32>{#p/basic}* ...',
                        "<32>{#p/basic}* Eu teria dito mais pra ela lá atrás, mas ao mesmo tempo...",
                        '<32>{#p/basic}* ... isso teria realmente feito alguma diferença?'
                    ],
        dinnerdate15: () =>
            SAVE.data.b.water
                ? [
                    '<25>{#p/sans}* olha só, você até trouxe uma bebida.',
                    "<25>{#p/sans}{#f/2}* não se preocupa.\n* eu já comi a minha no balcão."
                ]
                : [
                    "<25>{#p/sans}* agora estamos conversando direito.",
                    "<25>{#p/sans}{#f/2}* não se preocupa.\n* eu já comi a minha no balcão."
                ],
        dinnerdate16: () => [
            '<25>{#f/0}* de toda forma, como eu estava dizendo...',
            '<25>{#f/3}* está mulher estava sobre muito estresse.',
            '<25>{#f/0}* então eu a perguntei...',
            '<25>{#f/2}* \"quer saber o que um esqueleto faz para passar o tempo?\"',
            '<32>{#p/soriel}* \"O ele faz?\"',
            '<25>{#p/sans}{#f/2}* então eu fui lá e comecei a tocar meu trombone.',
            '<25>{#f/4}* ela sendo ela, INSTANTANEAMENTE entendeu a piada.',
            "<25>{#f/0}* ... aquela noite acabou sendo uma das melhores que já tivemos.",
            '<25>{#f/0}* em bom tempo se passou e bem...',
            "<25>{#f/2}* eu basicamente estive te vigiando.",
            "<25>{#f/0}* mas ei, eu tenho feito um ótimo trabalho. não é mesmo?",
            '<25>{#f/3}* quer dizer, olha só pra você...',
            "<25>{#f/0}* você não morreu uma única vez.",
            ...(SAVE.flag.n._deaths > 0
                ? ['<25>{#f/0}* ...', "<25>{#f/0}* ei, que olhada é essa?", '<25>{#f/2}* eu tô errado...?']
                : SAVE.flag.n._hits > 0
                    ? ['<25>{#f/2}* heh.\n* graças a minhas grandes habilidades.']
                    : ["<25>{#f/2}* heh.\n* eu duvido que você tenha ao menos se machucado."])
        ],
        dinnerdate18: () => [
            ...(SAVE.flag.n._deaths > 0 ? ['<25>{#p/sans}{#f/0}* heh.'] : []),
            '<25>{#p/sans}{#f/0}* bem, aproveite a comida e eu espero que você tenha aprendido algo.' 
        ],
        dinnerdate19: () => [
            "<25>{#f/3}* só se lembre que estamos torcendo por ti. carinha.",
            ...(SAVE.data.n.exp <= 0
                ? SAVE.data.n.state_foundry_undyne === 1
                    ? ["<25>{#f/0}* ... retirando seja lá quem você poderia ter salvo."]
                    : ["<25>{#f/2}* ... até a undyne deve estar do seu lado a essa altura."]
                : world.bad_lizard < 1 && SAVE.data.n.bully < 15
                    ? ["<25>{#f/0}* ... independente do que você tenha feito."]
                    : ['<25>{#f/0}* ... bem, maior parte de nós, é claro.'])
        ],
        onionsan1: ['<32>{#p/basic}* Opa...\n* Percebi que você estava aqui...'],
        onionsan1a: ["<32>{#p/basic}* Eu sou Onionsan!\n* Onionsan, ouviu!"],
        onionsan2: () =>
            world.goatbro
                ? ["<32>{#p/basic}* Vocês dois, não parecem estar fazendo nada de legal..."]
                : ["<32>{#p/basic}* Você parece ter caminhado um longo caminho até aqui..."],
        onionsan2a: () =>
            world.goatbro
                ? ["<32>{#p/basic}* Boa coisa que as pessoas no rec center sempre perdoam!"]
                : ["<32>{#p/basic}* Boa coisa que é para pessoas assim que é o rec center!"],
        onionsan3: [
            "<32>{#p/basic}* Porem...\n* Eu sou grande demais para entrar...",
            '<32>{#p/basic}* O espaço sideral me fez crescer super duper rápido.'
        ],
        onionsan3a: () =>
            world.goatbro
                ? [
                    "<32>{#p/basic}* Mas vou encontrar um caminho para ser melhor em breve, ouviu!",
                    "<32>{#p/basic}* Eles vão quebrar o escudo de força e me libertar, ouviu!"
                ]
                : [
                    "<32>{#p/basic}* Mas eu logo encontrarei uma casa, ouviu!",
                    "<32>{#p/basic}* Eles vão quebrar o escudo de força e me libertar, ouviu!"
                ],
        onionsan4: ["<32>{#p/basic}* E então...\n* Eu viajarei pelo cosmos...\n* Livre para sempre..."],
        onionsan4a: ["<32>{*}{#p/basic}* Nós todos seremos livreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees{^999}"],
        onionsan4x: ['<25>{#p/asriel2}{#f/8}* Então tá bom, né?'],
        candy1: () =>
            postSIGMA()
                ? ["<32>{#p/basic}* Está fora de serviço."]
                : [
                    SAVE.data.b.svr
                        ? '<32>{#p/human}* (Você se aproxima da maquina de venda.)'
                        : "<32>{#p/basic}* É uma maquina de venda exclusiva para filamentos.",
                    choicer.create('* (Compra um Filamento por 40G?)', 'Sim', 'Não')
                ],
        candy2: ["<32>{#p/human}* (Você não tem dinheiro o suficiente.)"],
        candy3: ["<32>{#p/human}* (Você está carregando muito.)"],
        candy4: ['<32>{#p/human}* (Você pegou o Filamento.)'],
        candy5: ['<32>{#p/human}* (Você decide não comprar.)'],
        bedreceptionist1: pager.create(
            0,
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        "<32>{#p/basic}{#npc/a}* Seja bem-vindo ao Quatro Dimensões.\n* Estamos fechados pela sessão dois, clausula da liberdade.",
                        '<32>* As pessoas nunca leem os termos e condições...'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? [
                            '<32>{#p/basic}{#npc/a}* Bem-vindo ao Quatro Dimensões, o hotel onde dormir leva ao limbo da percepção.',
                            '<32>* Todas as nossas salas localizadas estão reservadas.',
                            '<32>* Por favor retorne mais tarde, quando tivermos mais espaço localizado.'
                        ]
                        : [
                            '<32>{#p/basic}{#npc/a}* Bem-vindo ao Quatro Dimensões, o hotel onde dormir leva ao limbo da percepção.',
                            "<32>* Assim que você reservar uma sala com a gente, é sua para sempre.",
                            "<32>* Temos uma suíte júnior aberta na dimensão esquerda por 300G.\n* Interessado? {#npc}",
                            choicer.create('* (Pegar um quarto?)', 'Sim', 'Não')
                        ],
            () =>
                SAVE.data.n.plot === 72
                    ? ['<32>{#p/basic}{#npc/a}* Te vejo no novo mundo.']
                    : SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#npc/a}* Até a próxima!']
                        : [
                            '<32>{#p/basic}{#npc/a}* 300G por uma suíte junior.\n* Interessado?{#npc}',
                            choicer.create('* (Pegar um quarto?)', 'Sim', 'Não')
                        ]
        ),
        bedreceptionist2a: [
            '<32>{#p/basic}{#npc/a}* Obrigado, trabalhamos sempre para vê-lo dormir com conforto e segurança!'
        ],
        bedreceptionist2b: ["<32>{#p/basic}{#npc/a}* Bem, você é bem-vindo quando trocar de ideia."],
        bedreceptionist3: ["<32>{#p/basic}{#npc/a}* Sinto muito, você não tem G o suficiente."],
        bedreceptionist4: () =>
            SAVE.data.n.plot === 72
                ? [
                    '<32>{#p/basic}{#npc/a}* Como sempre, nós te agradecemos por ter comprado um quarto.',
                    "<32>* Nós vamos fechar logo, então faça bom proveito do seu quarto enquanto puder!"
                ]
                : [
                    '<32>{#p/basic}{#npc/a}* Obrigado por comprar um quarto no Quatro Dimensões!',
                    ...(SAVE.data.b.killed_mettaton ? ['<32>* Você tem sorte de tê-lo feito quando o fez.'] : [])
                ],
        core1: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* ... e-epa.',
            "<25>* Esse é o elevador para o Cidadela.",
            "<25>{#g/alphysInquisitive}* Eu diria pra você ir direto pra lá, mas...",
            "<25>{#g/alphysWelp}* Ele... não tá funcionando agora.",
            "<25>{#g/alphysCutscene3}* Você vai ter que ir pelo CORE invés disso.",
            "<25>{#g/alphysUhButHeresTheDeal}* Quando você estiver pronto, vai pra lá que eu te ligo!"
        ],
        core2a: () =>
            [
                [
                    '<32>{#p/event}* Ring, ring...',
                    "<25>{#p/alphys}{#g/alphysSmileSweat}* Beleza, você tá aqui.",
                    "<25>{#g/alphysSmileSweat}* Eu manterei a linha telefônica aberta enquanto você estiver aqui...",
                    '<25>{#g/alphysWelp}* ... só em caso de algo ruim acabar acontecendo.',
                    ...(SAVE.data.n.plot < 66.2
                        ? [
                            '<25>{#g/alphysInquisitive}* Os membros do esquadrão de ELITE deveriam estar no descanso, mas...',
                            "<25>{#g/alphysNeutralSweat}* ... olha, eu não posso garantir nada."
                        ]
                        : [
                            "<25>{#g/alphysInquisitive}* Como chegamos antes do previsto, o esquadrão ELITE está de folga.",
                            "<25>{#g/alphysNeutralSweat}* ... vamos esperar que isso facilite as coisas."
                        ])
                ],
                SAVE.data.n.plot < 66.2
                    ? [
                        '<32>{#p/event}* Ring, ring...',
                        '<25>{#p/alphys}{#g/alphysWelp}* Okay, pronto pra continuar?',
                        '<25>{#g/alphysNeutralSweat}* Lembre-se, m-mantenha os olhos abertos para os ELITE.'
                    ]
                    : SAVE.data.n.plot < 67
                        ? [
                            '<32>{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysWelp}* Okay, pronto pra continuar?',
                            '<25>{#g/alphysNeutralSweat}* Lembre-se, é p-preciso abrir a porta...'
                        ]
                        : [
                            '<32>{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#g/alphysWelp}* Okay, pronto pra continuar?',
                            "<25>{#g/alphysNeutralSweat}* Estamos quase no fim, sabe..."
                        ],
                ['<32>{#p/event}* Ring, ring...', "<25>{#p/alphys}{#g/alphysWelp}* Eu vou estar na linha."]
            ][Math.min(SAVE.data.n.state_aerialis_coreenter++, 2)],
        core2b: () =>
            [
                [
                    "<25>{#p/alphys}{#g/alphysInquisitive}* Se você está saindo do CORE, eu vou desligar por agora.",
                    "<25>{#g/alphysCutscene2}* Eu te ligo de volta a-assim que você voltar!"
                ],
                ['<25>{#p/alphys}{#g/alphysNervousLaugh}* Saindo de novo?', '<25>{#g/alphysWelp}* Tudo bem.'],
                [
                    '<25>{#p/alphys}{#g/alphysFR}* ...',
                    '<25>{#g/alphysFR}* Acho bom você não estar fazendo isso só pra ver minha reação.'
                ],
                ['<25>{#p/alphys}{#g/alphysCutscene3}* ...']
            ][Math.min(SAVE.data.n.state_aerialis_coreleave++, 3)],
        core3: ['<25>{*}{#p/alphys}{#g/alphysShocked}* Cuidado!{^999}'],
        core4: () =>
            SAVE.data.b.legendary_madjick
                ? ["<25>{#p/alphys}{#g/alphysCutscene3}* Huh?\n* O que tem nesse item?"]
                : SAVE.data.b.assist_madjick
                    ? [
                        '<25>{#p/alphys}{#g/alphysCutscene3}* Mas que... o que você fez?',
                        '<25>* O que você DISSE pra fazê-lo sair andando assim!?',
                        '<32>{#p/basic}* Heh.\n* As vezes tudo que você precisa são as palavras corretas.'
                    ]
                    : !SAVE.data.b.killed_madjick
                        ? [
                            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Ufa...',
                            "<25>{#g/alphysNeutralSweat}* V-vamos esperar que isso não aconteça de novo.",
                            ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ... acho que você nem precisa da minha ajuda."])
                        ]
                        : world.bad_lizard === 0
                            ? [
                                '<25>{#p/alphys}{#g/alphysSideSad}* Não... por que...',
                                '<25>{#g/alphysWorried}* ...',
                                "<25>* Não poderia ter tido outra forma... tipo?"
                            ]
                            : [
                                '<25>{#p/alphys}{#g/alphysSideSad}* Não... por que...',
                                '<25>{#g/alphysThatSucks}* ...',
                                "<25>* Pelo menos não vai demorar muito até nós metermos o pé daqui."
                            ],
        core5: ['<25>{*}{#p/alphys}{#g/alphysOhGodNo}* Espera!!!{^999}'],
        core6: () =>
            SAVE.data.b.legendary_knightknight
                ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
                    ? [
                        "<25>{#p/alphys}{#g/alphysWTF}* Eu não posso acreditar no que estou vendo...",
                        ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                            ? []
                            : ["<32>{#p/basic}* ... acho que você não precisava da minha ajuda, huh?"])
                    ]
                    : ["<25>{#p/alphys}{#g/alphysCutscene3}* Huh?\n* O que tem nesse item?"]
                : SAVE.data.b.assist_knightknight
                    ? SAVE.data.b.assist_madjick || SAVE.data.b.legendary_madjick
                        ? [
                            "<25>{#p/alphys}{#g/alphysWTF}* Eu não posso acreditar no que estou vendo...",
                            '<32>{#p/basic}* Leva como conselho.\n* Sentimentalismo é minha especialidade!',
                            '<32>{#p/basic}* Palavras mágicas e canções guerreiras são a força desses antigos heróis do mundo natal.'
                        ]
                        : [
                            '<25>{#p/alphys}{#g/alphysCutscene3}* Mas que... o que você fez?',
                            '<25>* O que você DISSE pra fazê-lo sair andando assim!?',
                            '<32>{#p/basic}* Heh.\n* As vezes tudo que precisamos são das notas corretas.'
                        ]
                    : !SAVE.data.b.killed_knightknight
                        ? [
                            '<25>{#p/alphys}{#g/alphysWelp}* ...',
                            ...(SAVE.data.b.killed_madjick
                                ? ['<25>{#g/alphysWelp}* Pelo menos ambos sobreviveram dessa vez.']
                                : [
                                    '<25>* A próxima sala aguarda.',
                                    ...(SAVE.data.b.oops || !SAVE.data.b.assist_madjick
                                        ? []
                                        : ["<32>{#p/basic}* ... acho que você não precisava da minha ajuda, huh?"])
                                ])
                        ]
                        : SAVE.data.b.killed_madjick || world.bad_lizard === 0
                            ? ['<25>{#p/alphys}{#g/alphysThatSucks}* ...', '<32>{#p/human}* (Você escuta um longo chorinho.)']
                            : [
                                '<25>{#p/alphys}{#g/alphysWorried}* ...',
                                '<25>{#g/alphysWorried}* Esses devem ter sido os u-ultimos engenheiros.'
                            ],
        core7: [
            '<25>{#p/alphys}{#g/alphysWelp}* Então... este é o CORE.\n* Ou melhor, o \"core\" do CORE.',
            '<25>{#g/alphysInquisitive}* Tem dois caminhos que v-você pode pegar para destrancar a porta...',
            "<25>* Quebra-cabeças na esquerda e lutas na direita.",
            '<25>{#g/alphysFR}* Ambos são... difíceis.\n* Mas...',
            "<25>{#g/alphysWelp}* Eu sugiro que você vá pelos quebra-cabeças.",
            "<25>{#g/alphysSideSad}* É você que escolhe, claro...",
            "<25>{#g/alphysHaveSomeCompassion}* Mas pelo menos naquele caminho não a risco de conflito."
        ],
        core8a: (nooted: boolean) => [
            "<25>{#p/alphys}{#g/alphysSide}* Então você decidiu ir pelos quebra-cabeças.",
            '<25>{#g/alphysWelp}* Provavelmente uma escolha inteligente.',
            ...(nooted
                ? [
                    '<25>{#g/alphysCutscene3}* Os quebra-cabeças aqui estão...',
                    '<25>{#f/10}* ... abertos.',
                    '<25>{#f/3}* Isso já estava assim antes?'
                ]
                : [
                    "<25>{#g/alphysCutscene3}* Os quebra-cabeças são simples se... você souber o que está fazendo.",
                    "<25>{#g/alphysCutscene2}* Para resumir, porém, é realmente apenas um... grande bloqueio de combinação.",
                    '<25>{#g/alphysWelp}* Use os interruptores para inverter cada segmento até que todos se alinhem.'
                ])
        ],
        core8a1: () => ["<25>{#p/alphys}{#g/alphysInquisitive}* Ah não ser que você prefira o outro caminho?"],
        core8b: ["<25>{#p/alphys}{#g/alphysCutscene2}* Um a menos."],
        core8b1: () => ["<25>{#p/alphys}{#g/alphysWelp}* Acho que vamos por esse caminho agora."],
        core8c: ['<25>{#p/alphys}{#g/alphysCutscene1}* Você conseguiu!\n* Agora aperta a alavanca na próxima sala!'],
        core8c1: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* O que você tá fazendo...?',
            "<25>{#p/alphys}{#g/alphysFR}* Não me diga que você tá trocando de caminho AGORA..."
        ],
        core8c2: (nooted: boolean) =>
            nooted
                ? [
                    '<25>{#p/alphys}{#g/alphysWTF}* Você.\n* Você está descendo o outro...',
                    '<25>{#g/alphysFR}* ...',
                    '<25>{#g/alphysFR}* Desde quando isso tá destrancado?'
                ]
                : ['<25>{#p/alphys}{#g/alphysWTF}* Você.\n* Você está descendo o outro caminho.'],
        core8c3: [
            '<25>{#p/alphys}{#g/alphysWelp}* Agora você tem acesso a ambas as alavancas.',
            '<25>{#p/alphys}{#g/alphysCutscene3}* Vamos logo!'
        ],
        core8c4: ['<25>{#p/alphys}{#g/alphysGarboCenter}* ...', '<25>* Agora você está realmente testando minha paciência.'],
        core9a: () => [
            "<25>{#p/alphys}{#g/alphysNeutralSweat}* Então você foi pelo caminho da luta.",
            ...(SAVE.data.b.killed_knightknight && (SAVE.data.b.killed_madjick || world.bad_lizard === 1)
                ? ['<25>* ...', '<25>{#g/alphysCutscene3}* Da pra você... não matar mais ninguém?\n* Se possível?']
                : SAVE.data.b.killed_knightknight || SAVE.data.b.killed_madjick
                    ? ['<25>* ...', '<25>* Isso pode ser bem ruim.']
                    : [
                        "<25>{#g/alphysWelp}* Estamos nos sentindo aventurosos hoje.",
                        "<25>* Não a muito o que dizer, você só precisa passar pelos guardas.",
                        '<25>{#g/alphysCutscene2}* Uh... boa sorte?',
                        '<25>{#g/alphysCutscene3}* ...',
                        "<25>* Por favor não morre pra esses caras."
                    ])
        ],
        core9a1: (nooted: boolean) =>
            nooted
                ? [
                    "<25>{#p/alphys}{#g/alphysSide}* Oh, você...",
                    '<25>{#p/alphys}{#g/alphysCutscene3}* ... foi por onde o caminho já está livre.',
                    '<25>{#p/alphys}{#f/3}* Isso estava assim esse tempo todo?'
                ]
                : [
                    "<25>{#p/alphys}{#g/alphysSide}* Oh, você está aqui.",
                    "<25>{#g/alphysInquisitive}* Caminho dos quebra-cabeças?"
                ],
        core9b: () =>
            1 <= battler.exp
                ? [
                    '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                    corefriendly() ? '<25>* V-você realmente... precisava ter feito aquilo?' : '<32>{#p/human}* (Você escuta um chorinho.)'
                ]
                : SAVE.data.b.a_state_nooted1
                    ? [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* Eu não tô entendendo o porque de você ainda estar aqui.",
                        "<25>{#p/alphys}{#g/alphysCutscene3}* POR QUE?\n* O caminho do quebra-cabeça já está aberto!"
                    ]
                    : ["<25>{#p/alphys}{#g/alphysCutscene2}* Você passou o primeiro grupo!\n* Agora para o segundo."],
        core9b1: (nooted: boolean) =>
            1 <= battler.exp && corefriendly()
                ? nooted
                    ? [
                        "<25>{#p/alphys}{#g/alphysInquisitive}* Ah não ser que você...",
                        '<25>{#p/alphys}{#g/alphysCutscene3}* ... volte e vá pelo caminho que já está livre.',
                        '<25>{#p/alphys}{#f/3}* Isso estava assim esse tempo todo?'
                    ]
                    : ["<25>{#p/alphys}{#g/alphysInquisitive}* Ah não ser, claro, que você pegue o outro caminho...?"]
                : nooted
                    ? [
                        '<25>{#p/alphys}{#g/alphysInquisitive}* Mudou seu...',
                        "<25>{#p/alphys}{#g/alphysCutscene3}* ... oh, ele já tá destrancado aqui.",
                        '<25>{#p/alphys}{#f/3}* Isso estava assim esse tempo todo?'
                    ]
                    : ['<25>{#p/alphys}{#g/alphysInquisitive}* Mudou de ideia...?'],
        core9c: () =>
            calm_lizard()
                ? ['<25>{#p/alphys}{#g/alphysCutscene1}* Você conseguiu!\n* Agora aperta a alavanca na outra sala!']
                : [
                    '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                    SAVE.data.n.state_aerialis_corepath_puzzle < 3
                        ? "<25>{#p/alphys}{#g/alphysSideSad}* Aperta a alavanca na outra sala e vamos vazar daqui."
                        : '<25>{#p/alphys}{#g/alphysSideSad}* Aperta a alavanca na outra sala e sai logo.'
                ],
        core10a: ['<25>{#p/alphys}{#g/alphysCutscene2}* Okay, v-você vai conseguir seguir em frente agora.'],
        core10b: [
            '<25>{#p/alphys}{#g/alphysWelp}* Oh, você voltou.',
            '<25>{#g/alphysCutscene2}* Bem, v-você deve conseguir seguir em frente agora.'
        ],
        core10c: ['<25>{#p/alphys}{#g/alphysFR}* Finalmente.'],
        core11: (nooted: boolean) =>
            nooted
                ? [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* Por que você está...',
                    '<25>{#f/21}* ...',
                    '<25>{#f/22}* ESSE AQUI ESTAVA ABERTO ESSE TEMPO TODO!?'
                ]
                : ['<25>{#p/alphys}{#g/alphysInquisitive}* Por que você está voltando por este caminho?', '<25>{#g/alphysFR}* ...'],
        core12: (nooted: boolean) =>
            nooted
                ? [
                    
                    '<25>{#p/alphys}{#g/alphysInquisitive}* Desde quando isso aqui estava aberto?',
                    "<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Olha, isso vai nos poupar bastante tempo!"
                ]
                : SAVE.data.b.a_state_nooted1 && game.room === 'a_core_left2' // NO-TRANSLATE

                    ? ['<25>{#p/alphys}{#g/alphysCutscene3}* Mas que caramba...']
                    : ['<25>{#p/alphys}{#g/alphysCutscene3}* Você poderia estar na capital agora mesmo.'],
        core12x: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* Desde quando isso aqui estava aberto?',
            '<25>{#p/alphys}{#f/3}* Isso estava assim esse tempo todo?'
        ],
        core13: [
            "<25>{#p/alphys}{#g/alphysGarbo}* Você apertou ambas as alavancas.",
            '<25>{#p/alphys}{#g/alphysGarboCenter}* Tá feliz agora?'
        ],
        core14: () => [
            "<25>{#p/alphys}{#g/alphysWelp}* E-espera, tem alguém lá na frente.",
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* Vamos ver se consigo limpar o caminho desta vez...',
            SAVE.data.b.ubershortcut
                ? '<32>{#p/human}* (Parece que alguém está digitando furiosamente no teclado.)'
                : '<32>{|}{#p/human}* (De novo, o obrigatório- {%}',
            "<25>{#p/alphys}{#g/alphysCutscene3}* Ele não está no meu sistema.",
            "<25>{#g/alphysUhButHeresTheDeal}* Seja lá quem for nem faz parte da guarda!",
            '<25>{#g/alphysWelp}* ... isso não é bom.'
        ],
        core14a: [
            '<32>{#p/basic}* Então você pensa que pode simplesmente atravessar um ponte até o outro lado?',
            "<32>* Oouhuhu...\n* Eu temo, meu camarada..."
        ],
        core14b: ["<32>{#p/basic}* Que você terá que PENSAR DE NOVO!{%20}"],
        core15: () =>
            !world.killed_mushketeer
                ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* É... é isso?', '<25>* Estamos prontos pra ir em frente, finalmente?']
                : [
                    '<26>{#p/alphys}{#g/alphysNeutralSweat}* Você... você realmente...',
                    '<25>{#g/alphysHaveSomeCompassion}* ... tudo bem...'
                ]
    },

    b_group_aerialis: {
        froggitexWhimsalot: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* O p-primeiro par de guardas.']
                : ['<32>{#p/story}* Final Froggit e Flutterknyte aparecem na sua frente!'],
        froggitexWhimsalotX: (whimmer: boolean) =>
            whimmer ? ['<32>{#p/story}* Flutterknyte agora boa sozinha.'] : ['<32>{#p/story}* Final Froggit pula solitário.'],
        astigmatism: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Esses caras não...']
                : world.genocide
                    ? ['<32>{#p/story}* Um olho sorridente se aproxima!']
                    : ['<32>{#p/story}* Os olhos sorridentes se aproximam!'],
        rg: () => (world.goatbro ? ['<32>{#p/asriel2}* RG 01 e 02.'] : ['<32>{#p/story}* Os Guardas Reais atacam!']),
        spacetopTsundere: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Esses malucos...'] : ["<32>{#p/story}* É um pesadelo espacial!"],
        spacetopTsundereX: (spacetop: boolean) =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Só mais um.']
                : spacetop
                    ? ['<32>{#p/story}* Apenas Astro Serf sobrando.']
                    : ['<32>{#p/story}* Apenas Tsunderidex faltando.'],
        pyropeTsundere: () =>
            world.goatbro ? ['<32>{#p/asriel2}* O grupo dos cabeças quentes.'] : ["<32>{#p/story}* É uma cavalaria de fogo!"],
        pyropeTsundereX: (pyrope: boolean) =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Só mais um.']
                : pyrope
                    ? ['<32>{#p/story}* Apenas Hotwire ficou.']
                    : ['<32>{#p/story}* Apenas Tsunderidex faltando.'],
        astigmatismMigospelX: ['<32>{#p/story}* Eyewalker Prime toma controle de sua batalha!']
    },

    b_opponent_glyde: {
        name: '* Glyde',
        epiphaNOPE: ['<11>{#p/basic}{~}{#e/glyde/10}Tira esse negócio da minha cara, beleza?'],
        act_check: ['<32>{#p/story}* GLYDE - ATQ SIM DEF SIM\n* Se recusa a passar detalhes da suas estatísticas de graça.'],
        act_secret: () =>
            glade()
                ? SAVE.data.b.w_state_steak && SAVE.data.b.w_state_soda
                    ? ['<32>{#p/human}* (Você diz ao Glyde sua senha cochichada por Aaron.)']
                    : ["<32>{#p/human}* (Você tenta dizer a Glyde uma senha, mas você você tinha nenhuma pra falar.)"]
                : ['<33>{#p/human}* (Você tenta falar uma senha para Glyde, mas ele balança a cabeça e interrompe.)'],
        act_flirt1: ['<32>{#p/human}* (Você flerta com Glyde.)'],
        act_flirt2: ["<32>{#p/human}* (Você tenta flertar com o Glyde, mas ele não tem interesse em responder.)"],
        act_berate: ['<32>{#p/human}* (Você repreende Glyde.)\n* (Glyde cai na risada.)'],
        fightEnder1: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}... huh?',
            '<20>{#p/basic}{~}Você acabou de dizer \"triple beefcake deluxe?\"',
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            '<20>{#p/basic}{~}{#e/glyde/10}Então...',
            "<20>{#p/basic}{~}{#e/glyde/5}FOI VOCÊ quem comprou meus produtos nas Outlands!",
            '<20>{#p/basic}{~}E não apenas isso...',
            '<20>{#p/basic}{~}Mas você se lembrou da senha, também!'
        ],
        fightEnder2: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}... huh?',
            '<20>{#p/basic}{~}Você acabou de dizer \"triple beefcake deluxe?\"',
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            '<20>{#p/basic}{~}{#e/glyde/10}Então...',
            '<20>{#p/basic}{~}{#e/glyde/5}Não apenas você comprou meu produto..',
            '<20>{#p/basic}{~}{#e/glyde/12}Mas você também se lembrou da senha??'
        ],
        fightEnder3: [
            "<20>{#p/basic}{~}{#e/glyde/5}Cara, você não sabe quanto tempo esperei para ouvir estas lindas palavras.",
            "<20>{#p/basic}{~}{#e/glyde/12}O que eu posso dizer? Você é um fervolouco-manolo!",
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            "<20>{#p/basic}{~}{#e/glyde/10}Sabe. Já que você é tão gente boa, eu vou sair do seu caminho e ir incomodar outra pessoa.",
            '<20>{#p/basic}{~}{#e/glyde/5}Kahaha!\nTe peguei na moeda, G!'
        ],
        fightItem1: (zero: boolean) => [
            '<20>{#p/basic}{~}Woah, ei, é isso o que eu penso que é?',
            "<20>{#p/basic}{~}Estou abismado! \nBem, é sempre bom conhecer um cliente satisfeito!",
            ...(zero ? [] : ['<20>{#p/basic}{~}De toda forma, como eu estava dizendo...'])
        ],
        fightItem2: () => [
            '<20>{#p/basic}{~}{#e/glyde/5}Esse também!?',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/12}Meu senhor \"$(moniker2)\", você não é tão pobre!'
                : "<20>{#p/basic}{~}{#e/glyde/12}Meu senhor, humano, você não é tão pobre!",
            '<20>{#p/basic}{~}{#e/glyde/9}...',
            "<20>{#p/basic}{~}{#e/glyde/10}Sabe. Já que você é tão gente boa, eu vou sair do seu caminho e ir incomodar outra pessoa.",
            '<20>{#p/basic}{~}{#e/glyde/5}Kahaha!\nTe peguei na moeda, G!'
        ],
        intro1: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}Kahaha, toma isso robô imbecil!'],
        intro2a: () =>
            !world.badder_lizard
                ? ['<20>{#p/mettaton}EU E A ALPHYS AINDA ESTAMOS AQUI, SABE.']
                : ["<20>{#p/mettaton}EU AINDA ESTOU AQUI, SABE."],
        intro2b: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}Quieto!\nEste é meu estágio agora, robô doidão.'],
        intro2c: ['<20>{#p/mettaton}(ISSO NA VERDADE É BEM INTERESSANTE.)'],
        intro3: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/4}Cara eu tenho muita história pra contar!'],
        status1: ['<32>{#p/story}* Glyde explode tudo pra chegar chegando!'],
        turn1a: () => [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/10}Não vai lutar contra mim?',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/0}... surpreendente, vindo de um vilão como você...'
                : '<20>{#p/basic}{~}{#e/glyde/0}... você faz seu nome, eu acho.'
        ],
        turn1b: () => [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/7}Ooh, eu gostei do seu espírito de luta.',
            iFancyYourVilliany()
                ? '<20>{#p/basic}{~}{#e/glyde/10}Está vivendo pelo seu nome, vilão?'
                : "<20>{#p/basic}{~}{#e/glyde/10}Isso vai te servir mais tarde..."
        ],
        turn1c: ["<20>{#p/basic}{~}{#e/glyde/10}Kahaha... sem ofensa, mas você é meio que espécie divergente."],
        turn1d: ["<20>{#p/basic}{~}{#e/glyde/9}É, foi mal, mas eu não dou status de graça."],
        turn1e: [
            "<20>{#p/basic}{~}{#e/glyde/4}Algumas semanas atrás, estava eu refletindo sobre a vida...",
            '<20>{#p/basic}{~}{#e/glyde/0}E então percebi uma queda nas minhas vendas.'
        ],
        turnStatus1: ['<32>{#p/story}* Glyde vê seu reflexo e fica maravilhado.'],
        turn2: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/8}E acabou que meu negócio cem porcento legítimo...',
            '<20>{#p/basic}{~}{#e/glyde/8}Está a beira de um processo por ser fraude!',
            '<20>{#p/basic}{~}{#e/glyde/1}E eu pensei comigo mesmo \"você só pode tá brincando.\"'
        ],
        turnStatus2: ['<32>{#p/story}* Glyde está pensando em um novo significado para a palavra \"legal.\"'],
        turn3: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}Eu posso te garantir que meus bifes são a coisa mais rara do mercado.',
            '<20>{#p/basic}{~}Nada se compara aquele gosto zero artificial!',
            '<20>{#p/basic}{~}Me ouviu?\nNada!'
        ],
        turnStatus3: ['<32>{#p/story}* Um vento com cheiro de arrogância sopra.'],
        turn4: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/0}E por que você deveria de importar?',
            '<20>{#p/basic}{~}{#e/glyde/2}Porque...',
            '<20>{#p/basic}{~}{#e/glyde/2}Er...',
            "<20>{#p/basic}{~}{#e/glyde/5}Porque você é o único capaz de salvar minhas vendas!"
        ],
        turnStatus4: ['<32>{#p/story}* Glyde faz flips extravagantes.'],
        turn5: () => [
            iFancyYourVilliany()
                ? '<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}Com o infame \"$(moniker2)\" ao meu lado, nada pode me parar!'
                : "<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}Com o famoso humano da MTT do meu lado, eu serei imparável!",
            "<20>{#p/basic}{~}{#e/glyde/7}Até mesmo o grande Papa Gliden poderia apenas sonhar com as vendas que faremos!"
        ],
        turn5a: ["<20>{#p/alphys}Eu não acho que ataca-lo é boa forma de ganhar seu apoio."],
        turn5b: [
            '<20>{#p/basic}{#p/basic}{~}{#e/glyde/1}É um \"show de força\" nerdola{#x1}.',
            '<20>{#p/basic}{~}{#e/glyde/9}De que outra forma eu poderia ganhar o respeito de meu parceiro de negócios?'
        ],
        turn5c: ["<20>{#p/basic}{~}{#e/glyde/10}Exato.\nVocê não sabe de nada."],
        turnStatus5: ['<32>{#p/story}* Glyde está se dando um aperto de mão, de alguma forma.'],
        turn6a: ['<20>{#p/basic}{#p/basic}{~}{#e/glyde/6}Então, quê que se acha?'],
        turn6b: ['<20>{#p/basic}{#p/basic}{~}Puts.'],
        turn6c: () => [
            '<20>{#p/basic}{#e/bpants/12}Por que EU sou quem tem que tirar o lixo pra fora aqui?',
            '<20>...',
            '<20>{#e/bpants/0}Desculpa pela bagunça, maninho.',
            "<20>{#e/bpants/11}Eu sou Burgie. Prazer em te conhecer.",
            ...(ateThreshold() || (world.badder_lizard && world.bad_lizard > 1)
                ? [
                    "<20>{#e/bpants/6}Glyde tem sido um problema daqui já faz tempo...",
                    "<20>{#e/bpants/12}... ei, você é aquela criança que está matando pessoas!"
                ]
                : burger()
                    ? [
                        "<20>{#e/bpants/6}Glyde tem sido um problema daqui já faz tempo...",
                        "<20>{#e/bpants/12}... ei, você é a criança que fez um genocídio em Starton!"
                    ]
                    : world.population === 0 && world.bullied
                        ? [
                            "<20>{#e/bpants/6}Glyde tem sido um problema daqui já faz tempo...",
                            "<20>{#e/bpants/12}... ei, você não é a criança que anda dando uma surra em todo mundo?"
                        ]
                        : [
                            "<20>{#e/bpants/6}Glyde tem sido um problema aqui já faz bastante tempo...",
                            "<20>{#e/bpants/1}Com sorte dessa vez ele vai abrir os olhos, ninguém comprará aquela porcaria."
                        ])
        ],
        turn6d: [
            '<20>{#p/mettaton}BURGERPANTS!',
            "<20>É TÃO MARAVILHOSO PODER TE VER.",
            "<20>(NÃO SE PREOCUPA, EU CORTEI A TV NO MOMENTO QUE TE VI ENTRAR.)"
        ],
        turn6e: () =>
            ateThreshold()
                ? [
                    "<20>{#p/basic}{#e/bpants/12}Você não tá entendo com o que está lidando aqui?",
                    '<20>{#e/bpants/3}Que DESGRAÇA você tá fazendo botando ELE na TV!?'
                ]
                : ["<20>{#p/basic}{#e/bpants/12}Eu não trabalho mais pra você. Vai se ferrar."],
        turn6f: () =>
            ateThreshold()
                ? ['<20>{#p/mettaton}WOW, DESCULPA...', "<20>EU NÃO SABIA QUE ERA CRIME FAZER PROGRAMAS DE TV."]
                : ['<20>{#p/mettaton}WOW, DESCULPA...', "<20>EU NÃO SABIA QUE VOCÊ ME ODIAVA DESSE TANTO."],
        turn6g: [
            '<20>{#p/basic}{#e/bpants/12}...',
            "<20>{|}{#p/basic}{#e/bpants/2}Eu não consigo lidar com esse cara, eu juro- {%}"
        ],
        turn6h: [
            "<20>{#p/mettaton}JÁ-TÁ-BOM TEMOS COISAS A FAZER, ENTÃO SE VOCÊ NÃO SE IMPORTA {%}",
            '<20>SAIA DO MEU SET DE TV POR FAVOR E OBRIGADO, ÓTIMO DIA.'
        ],
        hurtStatus: ['<32>{#p/story}* Glyde está em perigo.']
    },

    b_opponent_mettaton1: {
        artifact: ['<33>{#p/human}* (Mettaton da um suspiro.)'],
        name: '* Mettaton',
        epiphaNOPE: ["<20>{#p/mettaton}EU ACHO QUE NÃO, QUERIDO..."],
        old_gun_text: ['<32>{#p/human}* (Você atira a arma.)\n* (Mettaton absorve a energia.)'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)\n* (Mettaton não é afetado.)'
        ],
        old_spray_text: ['<32>{#p/human}* (Você usa o spray.)\n* (Doce...)\n* (Mettaton come o spray.)'],
        old_gun_talk: ['<20>{#p/mettaton}QUE MOVIMENTO BRILHANTE.'],
        old_bomb_talk: ["<20>{#p/mettaton}É COMO UMA MÁQUINA DE NÉVOA SEM ALUGUEL!"],
        old_spray_talk: ['<20>{#p/mettaton}PICANTE.'],
        status1: () =>
            SAVE.data.n.plot < 67
                ? ['<32>{#p/story}* Mettaton balança em ação!']
                : ['<32>{#p/story}* Mettaton retorna!'],
        act_check: () =>
            SAVE.data.n.plot < 67
                ? ['<32>{#p/story}* METTATON - ATQ 30 DEF 255\n* Seu corpo de metal o faz invulnerável a ataques.']
                : ['<32>{#p/story}* METTATON - ATQ 30 DEF 255\n* Sério, o corpo de metal é invulnerável!'],
        act_flirt: ['<32>{#p/human}* (Você flerta com Mettaton.)'],

        yellow1: () =>
            world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
                ? [
                    '<20>{#p/mettaton}O QUE TEM COM VOCÊ E A COR VERMELHA?{^40}{%}',
                    "<20>{#p/mettaton}{#x1}A ESSA ALTURA VOCÊ JÁ DEVERIA TER ENTENDIDO...{^40}{%}"
                ]
                : [
                    "<20>{#p/mettaton}OH, QUERIDO, O QUE ISSO?\nA COR VERMELHA?{^40}{%}",
                    "<20>{#p/mettaton}{#x1}MY, MY... VOCÊ SE SAFOU COM ESSA COR POR MUITO TEMPO!{^40}{%}"
                ],
        yellow2: () => [
            world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2
                ? '<20>{#p/mettaton}WOW!!!\nTÃO MELHOR!!!\nAGORA PRESSIONA [Z] PARA ATIRAR!!!{^40}{%}'
                : "<20>{#p/mettaton}MAGIA NÃO É UMA COISA MARAVILHOSA???\nAGORA VOCÊ PODE PRESSIONAR [Z] PARA ATIRAR!!!{^40}{%}",
            "<20>{#p/mettaton}(VOCÊ TAMBÉM PODE SEGURAR [C] PARA ATIRAR, MAS ONDE ESTÁ A DIVERSÃO NISSO.){^40}{%}"
        ],

        checkTalk: ["<20>{#p/mettaton}ADMIRANDO O FABULOSO TRABALHO DE CORPO DA ALPHYS? EU NÃO JULGO."],
        attackTalk: () =>
            SAVE.data.n.plot < 67
                ? ["<20>{#p/mettaton}SEU BOBINHO.\nISSO NÃO VAI FUNCIONAR COMIGO, DOCINHO!"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}ESCUTA, BELEZURA.\nEU JÁ TIVE DOR DEMAIS HOJE.\nDA PRA PARAR?"]
                    : ["<20>{#p/mettaton}ESCUTA, AMORZINHO.\nME ATACAR NÃO TE FARÁ NENHUM BEM.\nESPECIALMENTE NÃO AGORA."],
        flirtTalk: ['<20>{#p/mettaton}OHOHO...', '<20>FICANDO BRINCALHÃO, HEIN?', "<20>EU VOU TER QUE TE LEMBRAR DE ALGO, QUERIDO~"],

        turn1: [
            "<20>{#p/mettaton}VAMOS COMEÇAR COM ALGO SIMPLES...",
            '<20>CANTAR!',
            '<20>{|}VOCÊ TEM O QUE É NECESSÁRIO PARA- {%}'
        ],
        turn1a1: ['<20>...\nESPERA UM POUCO.', '<20>SOU SÓ EU OU...', '<20>VOCÊ ESTÁ \"VERMELHO\" DEMAIS HOJE?'],
        turn1a2: ['<20>DOUTORA, SE VOCÊ PUDER...'],
        turn1b1: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ["<20>{#p/alphys}Okay, okay!\nE-EU faço isso!"]
                : world.bad_lizard < 1
                    ? ['<20>{#p/alphys}Uh, claro!']
                    : ['<20>{#p/alphys}... hm?'],
        turn1b2: () =>
            SAVE.data.n.state_foundry_undyne > 0 || world.bad_lizard < 1
                ? ['<20>{#p/alphys}Me d-desculpa...']
                : ['<20>{#p/alphys}O-oh certo, isso.'],
        turn1c: ['<20>{*}{#p/mettaton}BEM MELHOR.{^30}{%}'],
        turn1d: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{*}{#p/alphys}A-agora tente apertar\n[Z] para teleportar.{^30}{%}']
                : world.bad_lizard < 1
                    ? ['<20>{*}{#p/alphys}Então... v-você se move e aperta [Z] quando quiser teleportar!{^30}{%}']
                    : ['<20>{*}{#p/alphys}Se mova ao redor e aperte [Z] para teleportar.{^30}{%}'],
        turn1e: ['<20>{*}{#p/mettaton}ALPHYS, ALPHYS, ALPHYS...{^30}{%}'],
        turn1f: ['<20>{*}O QUE EU JÁ TE DISSE SOBRE DAR DICAS?{^30}{%}'],
        turn1g: ['<20>{*}...{^30}{%}', '<20>{*}BOM...{^30}{%}', "<20>{*}VAMOS COMEÇAR ESSE SHOW!{^30}{%}"],

        turn2: ["<20>{#p/mettaton}NÃO PERCA UM ÚNICO MOVIMENTO, QUERIDO!"],
        turn3: ["<20>{#p/mettaton}VAMOS DAR UMA BELA MOVIMENTADA."],

        turn4a1: [
            "<20>{#p/mettaton}EU DEVO DIZER, VOCÊ ESTÁ LIDANDO COM ISSO COMO UM VERDADEIRO ÍCONE.",
            '<20>MAS VOCÊ CONSEGUE BATER DE FRENTE COM NOSSO CONVIDADO ESPECIAL?'
        ],
        turn4a2: [
            "<20>{#p/mettaton}EU DEVO DIZER, SUA PERFORMANCE NÃO FOI TÃO BOA ATÉ O MOMENTO.",
            '<20>TALVEZ VOCÊ SÓ PRECISE DE UM POUCO DE COMPETIÇÃO!'
        ],
        turn4e: ['<20>{#p/mettaton}...', '<20>ONDE ESTÁ...'],
        turn4f: ["<20>{#p/basic}Ela tá morta."],
        turn4g: ["<20>{#p/mettaton}OH.\nISSO É UM TRAGÉDIA."],
        turn4h: ['<20>{#p/mettaton}QUERIDA AUDIÊNCIA... DAREMOS UM MOMENTO DE SILÊNCIO A SHYREN.'],
        turn4i: ['<20>{#p/mettaton}TÁ BOM, ACABOU O MOMENTO.'],
        turn4j: () => [
            iFancyYourVilliany() ? '<20>{#p/mettaton}SORTE A SUA, $(moniker3u)!' : '<20>{#p/mettaton}SORTE A SUA!',
            '<20>ACHO QUE VAMOS TER QUE PULAR ESSA PARTE.',
            "<20>UMA LASTIMA NÃO PODERMOS CONTINUAR A CANTAR, MAS EI...",
            '<20>QUANDO UM ATO ACABA, OUTRO DEVE COMEÇAR.',
            "<20>... VAMOS DANÇAR!"
        ],

        turn5a1: ["<20>{#p/mettaton}ENTREGUE TUDO QUE TEM, SHYREN!"],
        turn5a2: () =>
            SAVE.data.b.bullied_shyren
                ? ['<20>{#p/mettaton}SHYREN...?']
                : [
                    '<20>{#p/mettaton}ENCANTADOR, EH?',
                    "<20>{#p/mettaton}NÃO SE PREOCUPE, A VOZ DA SHYREN FAZ ISSO COM TODO MUNDO."
                ],

        turn5end1: () =>
            SAVE.data.b.bullied_shyren
                ? [
                    "<20>{#p/mettaton}...TALVEZ SHYREN NÃO ESTIVESSE NO RITMO HOJE.",
                    '<20>QUE TRÁGICO.',
                    '<20>ALIÁS, EU MENCIONEI QUE SUA VOZ ESTÁ FICANDO ENJOATIVA?'
                ]
                : [
                    "<20>{#p/mettaton}OH, SHYREN É TÃO AMÁVEL, NÃO É MESMO?",
                    "<20>SE EU CONSEGUISSE ENCANTA-LA, ELA JÁ SERIA UMA SUPER ESTRELA...",
                    '<20>OH BEM. ALIÁS, EU MENCIONEI QUE SUA VOZ ESTÁ FICANDO ENTEDIANTE?'
                ],
        turn5end2: [
            "<20>MAS NÃO SE PREOCUPE, A SOLUÇÃO AQUI É ÓBVIA.",
            "<20>COMO QUALQUER BOM SHOW-BOT SABE, VOCÊ NÃO PODE TER A MÚSICA...",
            '<20>... SEM A DANÇA!'
        ],

        turn6: ['<20>{#p/mettaton}VEM COM TUDO!'],

        turn7a: [
            '<20>{#p/mettaton}VOCÊ OUVIU ISSO, QUERIDO...?',
            "<20>... EXATAMENTE.",
            '<20>OS ESPECTADORES ESTÃO SEDENTOS POR DRAMA!',
            '<20>E ISSO É OBVIAMENTE UM MANEQUIM BRAVO OBRIGATÓRIO.'
        ],
        turn7b1: ['<20>{#p/basic}Você de novo.'],
        turn7b2: ['<20>{#p/basic}Você de novo!'],
        turn7b3: ['<20>{#p/basic}VOCÊ DE NOVO!!!'],
        turn7c: ['<20>{#p/mettaton}OH, VOCÊS DOIS SE CONHECEM?'],
        turn7d1: ['<20>{#p/basic}...\nTalvez.\nTalvez não.'],
        turn7d2: ["<20>{#p/basic}COMO SE VOCÊ LIGASSE!"],
        turn7e: [
            '<20>{#p/mettaton}WOAH, NÃO PRECISA FICAR HOSTIL...',
            '<20>{#p/mettaton}ESTE É UM SHOW DE TALENTOS HUMILDE!'
        ],
        turn7f: [
            "<20>{#p/basic}E essa é a segunda vez que você me chama essa semana!",
            '<20>{#p/basic}Você tem um crush em mim ou sei lá?'
        ],
        turn7g1: [
            "<20>{#p/mettaton}...\nNÃO SEJA RIDÍCULO.",
            "<20>{#p/mettatonEU SÓ TE CHAMEI PORQUE VOCÊ É UMA MAQUINA DO DRAMA!"
        ],
        turn7g2: ["<20>{#p/basic}(Isso é o que meu primo costumava dizer...)"],
        turn7h: ['<20>{#p/basic}Oh, ei.\nBom te ver!'],
        turn7i: ["<20>{#p/mettaton}É SÓ ISSO...?", '<20>{#p/mettaton}MAS ALGUMA COISA PRA DIZER...?'],
        turn7j1: ["<20>{#p/basic}Sabe Mettaton, eu nem sempre estou com raiva das pessoas."],
        turn7j2: ["<20>{#p/basic}... eu já não te disse isso quando vim aqui duas semanas atrás?"],
        turn7k: [
            "<20>{#p/mettaton}OH.\nQUE LEGAL.",
            "<20>{#p/mettaton}MAS NÃO TEMOS TEMPO PRA ESSE ROMANCE DRAMÁTICO SEM SENTIDO!"
        ],
        turn7l1: ['<20>{#p/basic}Sei, sei...', "<20>{#p/basic}(Espera, isso é o que meu primo costumava dizer...)"],
        turn7l2: ["<20>Ok, eu vou lidar."],
        turn7l3: ["<20>Se é luta que você quer, é luta que você vai ter!"],
        turn7m: ['<20>{#p/mettaton}BEM, ISSO VAI SER INTERESSANTE.'],
        turn7n: ['<20>{#p/mettaton}UH... OII?'],
        turn7o1: () => [
            ...(iFancyYourVilliany()
                ? ['<20>{#p/mettaton}...', '<20>PARECE QUE NOSSO QUERIDO $(moniker2u) FICOU SEM UM PARCEIRO DE DANÇA.']
                : ['<20>{#p/mettaton}...', '<20>PARECE QUE NOSSO POBRE E POBRE HUMANO FICOU SEM UM PARCEIRO DE DANÇA.']),
            '<20>QUE AZARADO...',
            '<20>MAS O SHOW DEVE CONTINUAR!'
        ],
        turn7o2: [
            '<20>{#p/mettaton}...',
            "<20>VOCÊ NÃO ESTÁ MUITO ATIVO HOJE, QUERIDO.",
            "<20>PARECE QUE NINGUÉM ESTÁ VIVO OU INTERESSADO O SUFICIENTE PRA TE ENFRENTAR.",
            '<20>POIS BEM...',
            '<20>O SHOW DEVE CONTINUAR!'
        ],

        turn8a1: ['<20>{#p/mettaton}SEM SE SEGURAR!'],
        turn8a2: ['<20>{#p/mettaton}É ALGODÃO DEMAIS PARA AGUENTAR, NÉ?', '<20>{#p/mettaton}BEM, QUE PENINHA!'],

        turn8end1a: [
            "<20>{#p/mettaton}DIZER QUE ESTOU IMPRESSIONADO SERIA O MÍNIMO!",
            "<20>VOCÊ DOMINOU O PALCO.",
            '<20>QUERIDOS ESPECTADORES, TOMEM NOTAS...',
            '<20>É -ASSIM- QUE SE APRESENTA UM SHOW.'
        ],
        turn8end1b: [
            '<20>{#p/mettaton}VOCÊ PODE ATÉ NÃO TER A MELHOR CORDA VOCAL, MAS SABE DANÇAR... O SE SABE!',
            '<20>SIMPLESMENTE...'
        ],
        turn8end2b: () => [
            ...[
                [
                    '<20>{#p/mettaton}COM UM NOME COMO \"$(moniker1u)\", NÃO É SURPRESA QUE VOCÊ TENHA SIDO UMA DECEPÇÃO!',
                    '<20>{#p/mettaton}EU -TINHA- DESEJADO UM RESULTADO MELHOR...'
                ],
                ['<20>{#p/mettaton}COM UM NOME COMO \"$(moniker1u)\", VOCÊ ESPERARIA UMA EXIBIÇÃO MAIS JOVEM!'],
                ['<20>{#p/mettaton}COM UM NOME COMO \"$(moniker1u)\", VOCÊ ESPERARIA FICAR IMPRESSIONADO!'],
                ['<20>{#p/mettaton}COM UM NOME COMO \"$(moniker1u)\", VOCÊ PENSARIA QUE SUAS HABILIDADES SERIAM LOUCAS!'],
                ['<20>{#p/mettaton}COM UM NOME COMO \"$(moniker1u)\", VOCÊ ESPERARIA TER ROUBADO O SHOW!']
            ][SAVE.data.n.state_aerialis_moniker],
            "<20>{#p/mettaton}MAS ACHO QUE NÃO ERA PARA SER."
        ],
        turn8end2a: () => [
            ...[
                [
                    "<20>{#p/mettaton}OLHA, $(moniker3u), EU NÃO POSSO DIZER QUE ESPERAVA ISSO!",
                    '<20>{#p/mettaton}EU -ESTAVA- ESPERANDO OUTRA QUEDA, MAS...'
                ],
                ['<20>{#p/mettaton}BEM, QUERIDO $(moniker1u)...', "<20>É SEGURO DIZER QUE SUAS HABILIDADES SÃO ACIMA DA SUA IDADE!"],
                ['<20>{#p/mettaton}BEM, QUERIDO $(moniker1u)...', '<20>ESSA PERFORMANCE MERECE INFINITOS APLAUSOS!'],
                ['<20>{#p/mettaton}BEM, QUERIDO $(moniker1u)...', '<20>PARECE QUE NOSSOS ESPECTADORES ESTÃO NO CLIMA!'],
                ['<20>{#p/mettaton}BEM, QUERIDO $(moniker1u)...', "<20>VOCÊ REALMENTE FEZ DESSE PALCO UM SHOW!"]
            ][SAVE.data.n.state_aerialis_moniker],
            "<20>{#p/mettaton}TALVEZ EXISTA ESPERANÇA PARA VOCÊ DEPOIS DE TUDO."
        ],
        turn8end3a: [
            "<20>{#p/mettaton}... EU SINCERAMENTE NÃO ENTENDO COMO VOCÊ CONSEGUE SER TÃO RUIM.",
            '<20>ESPECIALMENTE APÓS VOCÊ TER IDO TÃO BEM NO COMEÇO.',
            '<20>OLHA.\nACONTECE, EU ACHO.'
        ],
        turn8end3b: [
            '<20>{#p/mettaton}... ALGUÉM JÁ TE DISSE O TANTO QUE VOCÊ É MAU NISSO?',
            '<20>FERRAR COM UMA APRESENTAÇÃO VOCAL É UMA COISA.',
            '<20>MAS ISSO...?\nISSO É TRISTE.'
        ],
        turn8end4: ['<20>{#p/mettaton}ALAS... NÓS AINDA TEMOS MAIS UM ATO.'],
        turn8end5: ['<20>{#p/mettaton}DAMAS E CAVALHEDAMAS...', '<20>DÊEM UMA SALVA DE PALMAS...'],
        turn8end6: ['<20>PARA A GRANDE E ÚNICA DR. ALPHYS!'],

        turn9a: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{|}{#p/mettaton}O QUÃO BEM VOCÊ SE SAIRA- {%}']
                : ['<20>{#p/mettaton}O QUÃO BEM VOCÊ SE SAIRA CONTRA ESTE ÚLTIMO DESAFIO?'],
        turn9b: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{#p/alphys}N-não!']
                : world.bad_lizard < 1
                    ? ['<20>{*}{#p/alphys}Você tá de b-brincadeira?{^30}{%}']
                    : ['<20>{*}{#p/alphys}{#e/alphys/7}...'],
        turn9bx: ["<20>{#p/alphys}Você não pode me forçar a fazer algo que eu não quero."],
        turn9c: ["<20>{*}{#p/alphys}Eu não...{^30}{%}"],
        turn9d: ['<20>{*}{#p/alphys}Eu...{^30}{%}'],
        turn9e: () =>
            world.bad_lizard < 1
                ? ["<20>{#p/alphys}Eu n-não consigo!"]
                : ["<20>{#p/alphys}{#e/alphys/4}Eu não sei se essa é uma boa ideia."],

        turn9end1: ['<20>{#p/mettaton}ALGUM PROBLEMA, QUERIDA?'],
        turn9end2: () => [
            ...[
                [
                    "<20>{#p/alphys}{#e/alphys/4}Eu não quero feri-lo, Mettaton...",
                    '<20>{#p/alphys}{#e/alphys/7}Nossa história com humanos pode ser complicada, mas...',
                    "<20>{#e/alphys/6}Isso não significa que esse humano não possa ser diferente, correto?",
                    "<20>{#e/alphys/8}Então... eu acho que é totalmente injusto continuar o atacando por isso."
                ],
                [
                    "<20>{#p/alphys}{#e/alphys/7}Eu sei que ele tomou... decisões bem ruins...",
                    '<20>{#p/alphys}{#e/alphys/6}Mas, de novo, e a forma como os monstros o trataram...?',
                    "<20>{#p/alphys}{#e/alphys/8}Não tem surpresa alguma aqui.",
                    "<20>{#p/alphys}{#e/alphys/4}E eu também... temo acabar f-ferindo ele..."
                ]
            ][world.bad_lizard]
        ],
        turn9end3: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ['<20>{#p/mettaton}BEM...', '<20>SE VOCÊ DIZ, DOUTORA.']
                : ['<20>{#p/mettaton}HMM...', '<20>VOCÊ FEZ UM PONTO INTERESSANTE DOUTORA.'],
        turn9end4: ["<20>MAS EU TEMO TER QUE DISCORDAR.{#e/alphys/1}"],
        turn9end5: () =>
            SAVE.data.n.state_foundry_undyne > 0
                ? ["<20>É UMA PENA QUE OS ESPECTADORES NÃO PODERÃO VER O QUE ACONTECERIA.{#e/alphys/28}"]
                : [
                    '<20>CONFLITO É O CORAÇÃO DE UM BOM DRAMA DE TV!{#e/alphys/2}',
                    '<20>E QUEM PODERIA DIZER NÃO PRA ISSO.'
                ],
        turn9end6: [
            "<20>{#p/mettaton}{#e/alphys/0}BEM, DE TODA FORMA, ESTAMOS MEIO QUE SEM TEMPO.",
            "<20>ENTÃO... ACHO QUE É ISSO POR AGORA.",
            '<21>FIQUEM LIGADOS, RAPAZIADA!\nO PRÓXIMO EPISÓDIO JÁ ESTÁ SENDO TRABALHADO.',
            "<20>VOCÊ NÃO VAI QUERER PERDER."
        ],
        turn9end7a: ['<20>{#p/alphys}Tá.'],
        turn9end7b: ["<20>{#p/alphys}Sério?\nVocê não errou nem uma única vez."],
        turn9end7c: ['<20>{#p/alphys}...'],

        turn1status: ["<32>{#p/story}* É hora do eletrochoque."],
        turn2status: ['<32>{#p/story}* Mettaton da palmas com as mãos robóticas.'],
        turn3status: ["<32>{#p/story}* É uma enxurrada de oitavas."],
        turn4status: ["<32>{#p/story}* A voz de Shyren ecoa pelo laboratório."],
        turn4statusX: ['<32>{#p/story}* Mettaton tenta não deixar lágrimas caírem.'],
        turn5status: ['<32>{#p/story}* Mettaton faz um movimento.'], 
        turn6status: ['<32>{#p/story}* Sobrecarga de funk em andamento.'],
        turn7status: ['<32>{#p/story}* Cheira a hospício.'],
        turn7statusX: ['<32>{#p/story}* Mettaton está brincando com seu microfone.'],
        turn8status: ['<32>{#p/story}* Mettaton aponta dramaticamente para a câmera.'],

        turn2react1: ['<20>{#p/mettaton}TOP!'],
        turn3react1: ['<20>{#p/mettaton}MUITO TOP!'],
        turn4react1: ['<20>{#p/mettaton}FABULOSO!'],
        turn5react1: ['<20>{#p/mettaton}SUBESTIMADO!'],
        turn6react1: ['<20>{#p/mettaton}ESTELAR!'],
        turn7react1: ["<20>{#p/mettaton}É ASSIM QUE SE FAZ!"],
        turn8react1: ["<20>{#p/mettaton}MOSTRA PRA ELES COMO SE FAZ!"],
        turn8reactMD1a: ['<20>{#p/basic}Bem, isso foi uma explosão!', '<20>{#p/basic}Te vejo na próxima, humano!'],
        turn8reactMD2a: ['<20>{#p/basic}...', '<20>{#p/basic}Nunca mais.'],

        turn2react2: ['<20>{#p/mettaton}OOPS...'],
        turn3react2: ['<20>{#p/mettaton}TÃO PERTO...'],
        turn4react2: ['<20>{#p/mettaton}QUE AZARADO...'],
        turn5react2: ['<20>{#p/mettaton}QUE LASTIMA...'],
        turn6react2: ['<20>{#p/mettaton}FALHOU!'],
        turn7react2: ['<20>{#p/mettaton}DESAPONTANTE.'],
        turn8react2: ['<20>{#p/mettaton}QUE. FOI. ISSO.'],
        turn8reactMD1b: ["<20>{#p/basic}Espero não ter te forçado demais.", '<20>{#p/basic}Te vejo na próxima, humano!'],
        turn8reactMD2b: ['<20>{#p/basic}Patético.\nPatético!\nPATÉTICO!', '<20>{#p/basic}Te serviu bem.'],
        missIndicator: 'Erros: $(x)',

        idleTalk1: () =>
            world.bad_lizard < 2 && !iFancyYourVilliany()
                ? [
                    "<20>{#p/mettaton}ENTÃO CHEGAMOS AO FIM, EH?",
                    "<20>{#p/mettaton}COMO VOCÊ SE SENTE SABENDO QUE SERÁ UMA SUPER ESTRELA?"
                ]
                : [
                    "<20>{#p/mettaton}ENTÃO CHEGAMOS AO FIM, EH?",
                    "<20>{#p/mettaton}COMO VOCÊ SE SENTE SABENDO QUE IRÁ CONHECER SEU FIM?"
                ],
        idleTalk2: () =>
            iFancyYourVilliany()
                ? ['<20>{#p/mettaton}AQUELES QUE VOCÊ MACHUCOU CERTAMENTE ESTÃO \"GIRANDO\" DURANTE O SONO.']
                : world.bad_lizard < 2
                    ? ['<20>{#p/mettaton}TENHO CERTEZA DE QUE VOCÊ ESTÁ ANSIOSO PARA \"VIRAR\" SUA VIDA']
                    : ['<20>{#p/mettaton}AQUELES QUE VOCÊ MATOU ESTÃO COM CERTEZA \"VIRANDO\" EM SUAS COVAS.'],
        idleTalk3: ['<20>{#p/mettaton}VAMOS SÓ ESPERAR QUE AS COISAS NÃO \"VIREM\" PARA O PIOR.'],
        idleTalk4: () =>
            world.bad_lizard < 2
                ? ['<20>{#p/mettaton}EU DEVO DIZER, TER VOCÊ AQUI COMIGO É UMA VERDADEIRA \"VIRADA\" NA VIDA.']
                : ['<20>{#p/mettaton}DEVO DIZER QUE TODA ESSA SITUAÇÃO É UMA VERDADEIRA \"VIRADA.\"'],
        idleTalk5: ["<20>{#p/mettaton}(É PRA VOCÊ ME FAZER VIRAR.)"],
        idleTalk6: ['<20>{#p/mettaton}...'],
        flirtTalk1: () =>
            SAVE.data.b.flirt_mettaton
                ? [
                    '<20>{#p/mettaton}DE VOLTA A SUAS BASES FLERTIVAS, NÉ?',
                    '<20>{#p/mettaton}VOCÊ, MEU QUERIDO, É UMA AMEAÇA A SOCIEDADE.'
                ]
                : ['<20>{#p/mettaton}OHOHO...', '<20>...', '<20>TALVEZ VOCÊ DEVESSE PARAR COM ISSO UM POUCO.'],
        flirtTalk2: () =>
            SAVE.data.b.flirt_mettaton
                ? ["<20>{#p/mettaton}VOCÊ NÃO SABE A HORA DE PARAR?"]
                : ['<20>{#p/mettaton}OU VOCÊ PODE SÓ CONTINUAR INDO.'],
        flirtTalk3: () =>
            SAVE.data.b.flirt_mettaton ? ['<20>{#p/mettaton}EU ACHO QUE NÃO.'] : ['<20>{#p/mettaton}E INDO.'],
        flirtTalk4: ["<20>{#p/mettaton}...\nEU SINTO QUE TEM ALGO MELHOR QUE VOCÊ PODERIA ESTAR FAZENDO."],
        flirtTalk5: ['<20>{#p/mettaton}...'],
        act_turn: ["<32>{#p/human}* (Você diz ao Mettaton que tem um espelho atrás dele.)"],
        turnTalk1: ['<20>{#p/mettaton}UM ESPELHO, VOCÊ DIZ?', '<20>AH ÓTIMO, EU PRECISO ESTAR PERFEITA PARA O GRANDE FINAL!'],
        turnTalk2: ["<20>{#p/mettaton}HMM, ONDE ELE ESTÁ?\nEU NÃO VEJO..."],
        turnTalk3: ['<20>{#p/mettaton}VOCÊ.', '<20>APERTOU MESMO.', '<20>MEU BOTÃO??'],
        turnTalk4: () =>
            world.bad_robot
                ? [
                    '<18>{#p/mettaton}Ohoho...',
                    '<18>Se você pensa que eu tinha estilo antes, só espere até me ver agora.',
                    '<18>Forte.\nRápido.\nMais brilhante.',
                    "<18>Eu me fundi ao meu próprio corpo.",
                    "<19>É uma tristeza que não posso ser muito violento na TV, não é mesmo?",
                    "<19>Mas tudo bem.",
                    '<18>Apenas dessa vez, só pra você...'
                ]
                : [
                    '<18>{#p/mettaton}Ohhhh meu.',
                    '<18>Se você apertou meu botão, isso só pode significar uma coisa.',
                    ...(iFancyYourVilliany()
                        ? [
                            "<18>Que você está desesperado para ver minha forma final.",
                            '<18>Quanta impaciência...',
                            "<18>Para sua sorte, já estive pensando em revela-lo por bastante tempo.",
                            "<18>Então, como agradecimento, irei garantir que seus momentos finais sejam lindos.",
                            "<18>Eu farei desse confronto final..."
                        ]
                        : [
                            "<18>Você está desesperado pela estreia do meu novo corpo.",
                            '<18>Quanta impaciência...',
                            "<18>Para sua sorte, estou ansioso para exibi-lo há muito tempo.",
                            "<18>Então, como agradecimento, eu lhe darei uma bela recompensa.",
                            "<18>Eu farei de seus últimos momentos vivos..."
                        ])
                ],
        turnTalk5: () =>
            world.bad_robot
                ? ["<18>{*}... estamos saindo do ar."]
                : iFancyYourVilliany()
                    ? ['<18>{#p/mettaton}{*}... absolutamente fantásticos!']
                    : ['<18>{#p/mettaton}{*}... absolutamente lindos!'],
        act_burn: ['<32>{#p/human}* (Você zoa o Mettaton no próprio show de TV dele.)'],
        burnTalk1: ['<20>{#p/mettaton}ISSO É O MELHOR QUE VOCÊ CONSEGUE FAZER?'],
        burnTalk2: ['<20>{#p/mettaton}ATÉ A ALPHYS PODERIA FAZER MELHOR QUE ISSO.'],
        burnTalk3: ["<20>{#p/mettaton}SEM OFENSA, MAS VOCÊ NÃO É MUITO BOM NISSO."],
        burnTalk4: ['<20>{#p/mettaton}...\nTALVEZ VOCÊ DEVESSE TENTAR FAZER ALGUMA OUTRA COISA.'],
        burnTalk5: ['<20>{#p/mettaton}...']
    },

    b_opponent_mettaton2: {
        artifact: () => [
            '<33>{#p/human}* (Mettaton da um suspiro.)',
            ...(world.genocide || world.bad_robot ? [] : ['<32>{#p/basic}* O público também encolhe os ombros.'])
        ],
        epiphaNOPE: () =>
            world.genocide || world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/25}Esse truque de festa não vai funcionar comigo, querido."]
                : iFancyYourVilliany()
                    ? ["<20>{#p/mettaton}{#e/mettaton/19}Você sabe que esse não é muito seu estilo."]
                    : ['<20>{#p/mettaton}{#e/mettaton/19}Tempo e lugar, querido.'],
        hint: ["<32>{#p/basic}* Ok, parceiro...\n* Tudo depende de você agora."],
        name: () => (world.genocide ? '* Mettaton NEO' : world.bad_robot ? '* Mettaton SIGMA' : '* Mettaton EX'),
        spannerReaction: (repeat: boolean) =>
            world.genocide
                ? ['<32>{#p/human}* (Você joga a chave.)\n* (Mettaton a explode no ar.)']
                : world.bad_robot
                    ? [
                        '<32>{#p/human}* (Você joga a chave.)\n* (Mettaton pega e quebra sobre sua cabeça.)',
                        "<32>{#p/basic}* Isso deve ter doído!"
                    ]
                    : repeat
                        ? iFancyYourVilliany()
                            ? [
                                '<32>{#p/human}* (Você joga a chave.)\n* (Mettaton chuta de volta para você com paixão.)',
                                '<32>{#p/basic}* A multidão boceja...'
                            ]
                            : [
                                '<32>{#p/human}* (Você joga a chave.)\n* (Mettaton a pega na boca e o joga de volta.)',
                                '<32>{#p/basic}* A multidão boceja...'
                            ]
                        : iFancyYourVilliany()
                            ? [
                                '<32>{#p/human}* (Você joga a chave.)\n* (Mettaton chuta de volta para você com paixão.)',
                                '<32>{#p/basic}* A multidão vai à loucura!'
                            ]
                            : [
                                '<32>{#p/human}* (Você joga a chave.)\n* (Mettaton a pega na boca e o joga de volta.)',
                                '<32>{#p/basic}* A multidão vai à loucura!'
                            ],
        old_gun_text: () =>
            world.genocide || world.bad_robot
                ? ['<32>{#p/human}* (Você atira com a arma.)\n* (Nada acontece.)']
                : ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* A audiência fica abismada!'],
        old_bomb_text: () =>
            world.genocide || world.bad_robot
                ? ['<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)\n* (Nada acontece.)']
                : [
                    '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
                    '<32>{#p/basic}* A audiência está sonhando acordada!'
                ],
        old_spray_text: () =>
            world.genocide || world.bad_robot
                ? ['<32>{#p/human}* (Você usa o spray.)\n* (Doce...)\n* (Nada acontece.)']
                : ['<32>{#p/human}* (Você usa o spray.)\n* (Doce...)', '<32>{#p/basic}* O público está em frangalhos!'],
        act_check: () =>
            world.genocide
                ? ["<32>{#p/asriel2}* Mettaton.\n* Não era pra você estar atacando ele ou sei lá?"]
                : world.bad_robot
                    ? [
                        '<33>{#p/story}* METTATON SIGMA - ATQ 255 DEF 42\n* Um super-carregado, múltiplas funções, assassino de humanos.'
                    ]
                    : ['<32>{#p/story}* METTATON EX - ATQ 47 DEF 47\n* Sua fraqueza é seu core em formato de coração.'],
        act_cut1: ['<32>{#p/human}* (Você começa a cortar o fio...)'],
        act_cut2: ['<32>{#p/human}* (Você termina de cortar o fio...)'],
        act_cut3: ['<32>{#p/human}* (Mas não existem mais fios para se cortar.)'],
        tvmReaction: {
            blookpie: () =>
                world.genocide || world.bad_robot
                    ? [
                        '<32>{#p/basic}* A confecção lembra Mettaton de alguém que ele tem que proteger...',
                        "<32>{#p/story}* ATAQUE do Mettaton aumentou!\n* DEFESA do Mettaton aumentou!"
                    ]
                    : [
                        SAVE.data.b.a_state_hapstablook
                            ? '<32>{#p/basic}* A confecção lembra Mettaton de alguém especial para ele...'
                            : '<32>{#p/basic}* A confecção lembra Mettaton de alguém que um dia ele conhecia...',
                        "<32>{#p/story}* DEFESA do Mettaton caiu!\n* ATAQUE do Mettaton caiu!"
                    ],
            radio: () =>
                world.bad_robot
                    ? [
                        '<32>{#p/human}* (Você da um rádio para Mettaton.)\n* (Mettaton coloca death metal e grita na sua cara.)'
                    ]
                    : iFancyYourVilliany()
                        ? [
                            '<32>{#p/human}* (Você dá o rádio para Mettaton.)\n* (Mettaton coloca orquestra para dar um hype na batalha.)'
                        ]
                        : [
                            '<32>{#p/human}* (Você dá o rádio a Mettaton.)\n* (Mettaton faz karaokê e o público canta junto.)'
                        ],
            fireworks: () =>
                world.bad_robot
                    ? [
                        '<32>{#p/human}* (Você dá fogos de artifício a Mettaton.)\n* (Mettaton os amarra a um lançador de foguetes e dispara.)'
                    ]
                    : iFancyYourVilliany()
                        ? [
                            '<32>{#p/human}* (Você dá fogos de artifício a Mettaton.)\n* (Mettaton coordena seus ataques para um efeito dramático.)'
                        ]
                        : [
                            '<32>{#p/human}* (Você dá fogos de artifício a Mettaton.)\n* (Mettaton os desencadeia, e o público fica maravilhado.)'
                        ],
            mewmew: () =>
                world.bad_robot
                    ? [
                        '<32>{#p/human}* (Você dá a boneca a Mettaton.)\n* (Mettaton rasga e joga os pedaços no chão.)'
                    ]
                    : iFancyYourVilliany()
                        ? [
                            "<32>{#p/human}* (Você da a boneca para o Mettaton.)\n* (Mettaton não sabe o que fazer com ela e a joga fora.)"
                        ]
                        : [
                            '<32>{#p/human}* (Você da a boneca para o Mettaton.)\n* (Mettaton a levanta para o público, eles amam.)'
                        ]
        },
        act_boast: [
            "<32>{#p/human}* (Você diz que não tomar nenhum soco nessa rodada.)",
            "<32>{#p/basic}* A audiência aumenta no turno do Mettaton."
        ],
        act_heel: [
            '<32>{#p/human}* (Você se vira e xinga a audiência.)',
            "<32>{#p/basic}* Eles estão torcendo por sua destruição neste turno."
        ],
        act_pose0: () =>
            iFancyYourVilliany()
                ? [
                    ['<32>{#p/human}* (Você faz uma pose dramática.)', '<32>{#p/basic}* A audiência parece entediada.'],
                    ['<32>{#p/human}* (Você faz uma pose dramática.)', '<32>{#p/basic}* A audiência parece aborrecida.']
                ]
                : [
                    ['<32>{#p/human}* (Você posa dramaticamente.)', '<32>{#p/basic}* A audiência parece entediada.'],
                    ['<32>{#p/human}* (Você posa dramaticamente.)', '<32>{#p/basic}* A audiência parece aborrecida.']
                ],
        act_pose1: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você faz uma pose dramática.)',
                    '<32>{#p/basic}* A audiência está impressionada por sua aura forte!'
                ]
                : ['<32>{#p/human}* (Você posa dramaticamente.)', '<32>{#p/basic}* A audiência balança.'],
        act_pose2: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você faz uma pose dramática.)',
                    "<32>{#p/basic}* A audiência não está impressionada por sua aura fraca."
                ]
                : ['<32>{#p/human}* (Você posa dramaticamente.)', '<32>{#p/basic}* A audiência aplaude.'],
        act_pose3: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você faz uma pose dramática.)',
                    '<32>{#p/basic}* A sua aura é tão fraca, que a audiência revira os olhos...'
                ]
                : [
                    '<32>{#p/human}* (Apesar de estar ferido, você posa dramaticamente.)',
                    '<32>{#p/basic}* O público suspira.'
                ],
        act_pose4: () =>
            iFancyYourVilliany()
                ? ['<32>{#p/human}* (Você faz uma pose dramática.)', '<32>{#p/basic}* A audiência está impressionada pela sua estupidez?']
                : [
                    '<32>{#p/human}* (Com o restante do seu poder, você posa dramaticamente.)',
                    '<32>{#p/basic}* A audiência grita.'
                ],
        act_scream0: [
            [
                '<32>{#p/human}* (Você grita.)',
                "<32>{#p/basic}* A audiência está entediada.\n* Você se move mais lentamente neste turno."
            ],
            [
                '<32>{#p/human}* (Você grita.)',
                "<32>{#p/basic}* A audiência parece aborrecida.\n* Você se move lentamente neste turno."
            ]
        ],
        act_scream: [
            '<32>{#p/human}* (Você grita.)',
            "<32>{#p/basic}* O público fica irritado!\n* Você se moverá mais devagar neste turno."
        ],
        act_flirt0: [
            ['<32>{#p/human}* (Você flerta com a audiência.)', '<32>{#p/basic}* A audiência parece entediada...'],
            ['<32>{#p/human}* (Você flerta com a audiência.)', '<32>{#p/basic}* A audiência parece irritada...']
        ],
        act_flirt1: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você flerta com a audiência.)',
                    '<32>{#p/basic} Seus movimentos inesperados pegam a audiência de surpresa!'
                ]
                : ['<32>{#p/human}* (Você flerta com a audiência.)', '<32>{#p/basic}* A audiência parece receptiva...'],
        act_flirt2: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você flerta com a audiência.)',
                    '<32>{#p/basic}* Dobrar a aposta deixa o público em loucura!'
                ]
                : ['<32>{#p/human}* (Você flerta com a audiência.)', '<32>{#p/basic}* O público olha na sua direção.'],
        act_flirt3: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você flerta com a audiência.)',
                    '<32>{#p/basic}* Toda essa provocação está deixando o público enjoado...'
                ]
                : ['<32>{#p/human}* (Você flerta com a audiência.)', '<32>{#p/basic}* Isso pegou a atenção deles!'],
        act_flirt4: () =>
            iFancyYourVilliany()
                ? [
                    '<32>{#p/human}* (Você flerta com a audiência.)',
                    "<32>{#p/basic}* A confusão da audiência cresce ainda mais."
                ]
                : ['<32>{#p/human}* (Você flerta com a audiência.)', '<32>{#p/basic}* O público está encantado!'],
        status1: (azzy_neo: number) =>
            [
                [
                    "<33>{#p/asriel2}* Eu vou tentar usar um feitiço para abrir o escudo dele. Pegue o máximo de energia que conseguir!"
                ],
                ['<32>{#p/asriel2}* Lá vamos nós de novo.']
            ][Math.min(azzy_neo, 1)],
        statusX: (hint = false) =>
            world.genocide
                ? ["<32>{#p/asriel2}* É apenas uma questão de tempo."]
                : world.bad_robot
                    ? hint
                        ? ["<32>{#p/story}* Parece que lutar não vai te levar muito longe."]
                        : ['<32>{#p/story}* Eletricidade permeia por toda a sala.']
                    : ['<32>{#p/story}* Mettaton.'],
        statusY: ["<32>{#p/story}* É um turbilhão de eletricidade de alta tensão!"],
        turnTalk1: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}Desculpa, querido... mas se eu não tentar te matar...",
                    "<20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/3}Eu vou simplesmente explodir!"
                ]
                : ['<20>{#p/mettaton}Luzes!\nCâmera!\nAção!'],
        turnTalk2: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}... heh.\nPoético, não é?",
                    '<20>{#p/mettaton}{#e/mettaton/20}{#a.la/8}{#a.ra/8}Te matar é a única coisa me mantendo vivo!'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}Fantasmas!\nBonecos!\n... lesmas?']
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}Drama!\nRomance!\nMassacre!']
                        : ['<20>{#p/mettaton}Karma!\nVingança!\nTroco!'],
        turnTalk3: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/24}{#a.la/3}{#a.ra/0}Mas é isso que me separa de todos os outros."]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}É uma montanha russa de emoções!"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}É hora de te colocar no seu lugar!"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}Eu sou o ídolo que todos desejam!"]
                            : ["<20>{#p/mettaton}Eu serei uma super estrela da galáxia!"],
        turnTalk4: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}Eu não poderia desistir mesmo se quisesse..."]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}É uma tristeza que as coisas precisem ser assim..."]
                    : iFancyYourVilliany()
                        ? ['<20>{#p/mettaton}Sorria para as câmeras, $(moniker2)!']
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}Sorria para a câmera, querido!']
                            : ['<20>{#p/mettaton}Sorria para a câmera, figurão!'],
        turnTalk5: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/9}{#a.ra/10}Agora apenas assista.\nEu irei retirar sua alma de dentro do seu corpo!"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? [
                        '<20>{#p/mettaton}Mas talvez você me ajude a fazer uma escolha aqui.',
                        '<20>{#p/mettaton}Enfileire o importantíssimo quiz!'
                    ]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}Oooh, é hora de um teste rápido!", '<20>Seu cérebro pode segurar uma vela em seus músculos?']
                        : !world.badder_lizard
                            ? [
                                "<20>{#p/mettaton}Oooh, é hora de um teste rápido!",
                                '<20>{#p/mettaton}Eu tenho certeza que você sabe sua múltipla escolha...'
                            ]
                            : [
                                "<20>{#p/mettaton}Oooh, aqui está um quiz para você.",
                                "<20>{#p/mettaton}Não gosta de múltipla escolha?\nQue peninha!"
                            ],
        turnTalk6: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}Que?\nVocê chama essa coisa fria de coração?',
                    '<20>{#p/mettaton}{#e/mettaton/30}{#a.la/9}{#a.ra/10}... não.\nVou te mostrar como um coração de verdade se parece.'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}Não é tão simples, é?', '<20>... Talvez um coração por coração deve nos dar uma resposta.']
                    : SAVE.data.n.state_aerialis_mttanswer === 0
                        ? ['<20>{#p/mettaton}Sua \"resposta\" com certeza foi decepcionante...', "<20>{#p/mettaton}Mas isso não vai acontecer!"]
                        : iFancyYourVilliany()
                            ? [
                                '<20>{#p/mettaton}Então você É mais inteligente do que parece.',
                                '<20>Mas uma batalha necessita mais do que apenas conhecimento básico.',
                                '<20>É preciso ter coração!'
                            ]
                            : !world.badder_lizard
                                ? [
                                    "<20>{#p/mettaton}Sua resposta realmente mostrou a todos sua mente.",
                                    "<20>{#p/mettaton}Que tal eu te mostrar o que está em meu coração?"
                                ]
                                : ['<20>{#p/mettaton}Então você GOSTA de múltipla escolha.', "<20>{#p/mettaton}Olha, eu não gosto disso."],
        turnTalk7: () =>
            world.bad_robot
                ? ["<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}É apenas uma questão de tempo..."]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}Não é como se eu não amasse a antiga vida."]
                    : iFancyYourVilliany()
                        ? ['<20>{#p/mettaton}Você pode ser um demônio, mas consegue dançar como o diabo?']
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}Apresentando... a discoteca dupla DJ!']
                            : ["<20>{#p/mettaton}A batalha apenas começou!"],
        turnTalk8: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/18}{#a.la/8}{#a.ra/8}Até você inevitavelmente perder para mim.']
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}Mas não foi exatamente glamoroso, também..."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}É hora de te trazer um jogo!"]
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}Você consegue manter o ritmo?']
                            : ['<20>{#p/mettaton}Aumente seu ritmo!'],
        turnTalk9: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/9}{#a.la/0}{#a.ra/5}Então, nosso povo irá ver as estrelas...']
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}Tanto faz, quem liga!']
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}Luzes!\nCâmera!\nPlástico explosivo!']
                        : ['<20>{#p/mettaton}Destruição!\nAniquilação!\nArmagedom!'],
        turnTalk10: () =>
            world.bad_robot
                ? ["20>{#p/mettaton}{#e/mettaton/1}{#a.la/1}{#a.ra/7}... e eu sou quem irá dar a eles a liberdade!"]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}Ninguém, ninguém liga!"]
                    : !world.badder_lizard
                        ? ['<20>{#p/mettaton}As coisas estão explodindo!']
                        : ['<20>{#p/mettaton}As coisas estão ficando malucas!'],
        turnTalk11: () =>
            world.bad_robot
                ? [
                    "20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}É uma pena, sério.\nAlphys, Asgore e até meus primos...",
                    '<20>{#e/mettaton/12}{#a.la/8}{#a.ra/8}Todos aqueles próximos de mim sempre desejam evitar conflito.'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}Vamos tomar um momento para pensar."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}Nada como uma pausa para reprimir o fogo do inimigo!"]
                        : !world.badder_lizard
                            ? ['<21>{#p/mettaton}Hora do nosso intervalo regulamentado pelo conselho!']
                            : ["<20>{#p/mettaton}Não consegue fazer uma pausa?\nÉ uma merda ser você!"],
        turnTalk12: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}Mas eu?\nEu não jogo pelas regras amáveis deles.",
                    '<20>{#p/mettaton}{#e/mettaton/23}{#a.la/1}{#a.ra/6}Eu vou direto ao coração da questão.'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? [
                        "<20>{#p/mettaton}Eu não entendo por que eles me confrontaram daquela forma...",
                        '<20>{#p/mettaton}... eu deveria acreditar que foi por amor?'
                    ]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}Hora de voltar para o coração do conflito!"]
                        : !world.badder_lizard
                            ? [
                                "<20>{#p/mettaton}Nós crescemos tão distantes, querido...",
                                '<20>{#p/mettaton}Que tal outro turno de coração com coração?'
                            ]
                            : [
                                "<20>{#p/mettaton}Acho que já é hora de você ter aprendido sua lição.",
                                "<20>{#p/mettaton}Aqui vai algo que você pode levar para o coração!"
                            ],
        turnTalk13: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/26}{#a.la/8}{#a.ra/8}... senhor.',
                    "<20>{#e/mettaton/25}{#a.la/8}{#a.ra/8}Você é um verdadeiro inseto insolente, sabia?"
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}E... e aliás, como eu posso confiar neles agora?']
                    : SAVE.data.b.a_state_armwrecker
                        ? ['<20>{#p/mettaton}Braços...?\nQu-quem precisa de braços com pernas assim?']
                        : ["<20>{#p/mettaton}É isso... isso é tudo que você tem?"],
        turnTalk14: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/8}{#a.ra/8}Mas ei, você sabe o que eles dizem sobre bugs, certo?',
                    "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/9}{#a.ra/10}É apenas mais um problema que precisa de concerto."
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}Eu n-não sei... mais o que pensar..."]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}Vamos ouvir... ouvir um último rugido da platéia!"]
                        : !world.badder_lizard
                            ? ['<20>{#p/mettaton}Agradecimentos a... doutora Alphys, por tornar meus sonhos realidade!']
                            : ["<20>{#p/mettaton}Agradecimentos a... aqueles que deram suas vidas para nos proteger!"],
        turnTalk15: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/15}{#a.la/10}{#a.ra/0}Olha.\nEu não te culpo por lutar tão valentamente.",
                    '<20>{#p/mettaton}{#e/mettaton/19}{#a.la/0}{#a.ra/10}Mas, e eu quero dizer que este é o melhor caminho possível...',
                    "<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}Você teria melhores chances contra uma parede de policarboneto reforçado."
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ["<20>{#p/mettaton}Eles poderiam estar realmente... realmente arrependidos?"]
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}Não tem como eu desis... desistir agora!"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}Agora é a minha vez de cumprir... cumprir todos os seus!"]
                            : ["<20>{#p/mettaton}Eu irei garantir que seus esforços não serão... em vão!"],
        turnTalk16: () =>
            world.bad_robot
                ? [
                    "<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/0}O que é isso?\nVocê não se importa com o que eu tenho pra dizer?",
                    '<20>{#p/mettaton}{#e/mettaton/17}{#a.la/8}{#a.ra/8}... feh.\nVocê que perde, querido!'
                ]
                : SAVE.data.b.a_state_hapstablook
                    ? ['<20>{#p/mettaton}Ou é ap... apenas um estrategia para entrar no centro das atenções?']
                    : iFancyYourVilliany()
                        ? ["<20>{#p/mettaton}Não após tu... tudo o que nós passamos!"]
                        : !world.badder_lizard
                            ? ["<20>{#p/mettaton}Eu não fa... faria de outra maneira!"]
                            : ["<20>{#p/mettaton}É o mínimo que posso... fa... fazer!"],
        turnTalk17: () =>
            world.bad_robot
                ? ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...']
                : ['<20>{#p/mettaton}{#e/mettaton/12}H... haah...\nH... haah...'],
        turnTalk18: () =>
            world.bad_robot
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/14}{#a.la/3}{#a.ra/0}Poxa vida.\nAlgumas pessoas nunca aprendem...',
                    "<20>{#e/mettaton/13}{#a.la/8}{#a.ra/8}Mas já chega de mim.",
                    "<20>{#e/mettaton/7}{#a.la/9}{#a.ra/10}Eu vou deixar meu coração tomar controle daqui pra frente!"
                ]
                : ['<20>{#p/mettaton}{#e/mettaton/13}O show deve continuar...!'],
        audienceRec0: () =>
            SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/11}(Suspiro...)',
                    '<20>{#e/mettaton/29}Bem...',
                    '<20>{#e/mettaton/10}Olha só pra isso.',
                    "<20>{#e/mettaton/20}Acho que essa é maior quantidade de espectadores que eu já tive...",
                    "<20>{#e/mettaton/17}Nós atingimos o marco de ligações para o público.",
                    '<20>{#e/mettaton/14}...',
                    "<20>{#e/mettaton/15}Vamos ver o que a audiência tem pra dizer...",
                    '<20>{#e/mettaton/12}... antes de acabarmos essa saga para o bem.'
                ]
                : [
                    '<20>{#p/mettaton}{#e/mettaton/8}Ooh, olhe para esses números...',
                    "<20>{#e/mettaton/5}Essa é a maior quantidade de espectadores que eu já tive!",
                    "<20>{#e/mettaton/7}Nós alcançamos o marco para ligações dos espectadores.",
                    "<20>{#e/mettaton/15}Vamos ver o que a audiência tem pra dizer...",
                    iFancyYourVilliany()
                        ? '<20>{#e/mettaton/19}... antes que a batalha acabe de verdade!'
                        : '<20>{#e/mettaton/19}... antes de acabarmos com essa saga para o bem!'
                ],
        turnTalkX0a: () =>
            SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/15}Não... eu...',
                    '<20>{#p/mettaton}{#e/mettaton/14}Eu ainda tenho que...',
                    '<20>{#p/mettaton}{#e/mettaton/9}...',
                    "<20>{#p/mettaton}{#e/mettaton/9}Blooky, se você estiver assistindo isso, então...",
                    "<20>{#p/mettaton}{#e/mettaton/10}Por favor não fique triste, tudo bem?",
                    "<20>{#p/mettaton}{#e/mettaton/9}Eu não deveria ter te afastado.",
                    "<20>{#p/mettaton}{#e/mettaton/19}Eu não deveria ter agido como se não me importasse.",
                    '<20>{#p/mettaton}{#e/mettaton/17}Porque... independente do que aconteceu no passado...',
                    '<20>{#p/mettaton}{#e/mettaton/10}Você, Lurksalot... todos vocês...',
                    "<20>{#p/mettaton}{#e/mettaton/20}Vocês ainda são minha família!",
                    "<20>{#p/mettaton}{#e/mettaton/15}Então... esqueça tudo que eu disse.",
                    "<20>{#p/mettaton}{#e/mettaton/9}De agora em diante, isso não importa.",
                    '<20>{#p/mettaton}{#e/mettaton/10}Tudo que importa...'
                ]
                : iFancyYourVilliany()
                    ? [
                        '<20>{#p/mettaton}{#e/mettaton/14}...',
                        "<20>{#p/mettaton}{#e/mettaton/15}Então é assim que acaba?",
                        '<20>{#p/mettaton}{#e/mettaton/19}... heh, eu acho...',
                        '<20>{#p/mettaton}{#e/mettaton/20}Eu acho que eu entendo agora.',
                        '<20>{#p/mettaton}{#e/mettaton/10}Todo esse tempo...',
                        "<20>{#p/mettaton}{#e/mettaton/10}Eu estive apenas agindo como se fossemos inimigos.",
                        '<20>{#p/mettaton}{#e/mettaton/11}Uma história para que a audiência ficasse envolvida.',
                        '<20>{#p/mettaton}{#e/mettaton/19}Mas você...',
                        '<20>{#p/mettaton}{#e/mettaton/17}Você acreditou.',
                        '<20>{#p/mettaton}{#e/mettaton/17}Você trouxe nossa realidade para a vida real.',
                        '<20>{#p/mettaton}{#e/mettaton/10}E no fim...',
                        '<20>{#p/mettaton}{#e/mettaton/9}Você viveu perfeitamente para a regra que eu te impus.',
                        '<20>{#p/mettaton}{#e/mettaton/19}...',
                        '<20>{#p/mettaton}{#e/mettaton/14}Pois bem, querido $(moniker2).',
                        "<20>{#p/mettaton}{#e/mettaton/12}Acho justo que eu esteja à altura do que desejei viver."
                    ]
                    : !world.badder_lizard
                        ? [
                            '<20>{#p/mettaton}{#e/mettaton/9}...',
                            '<20>{#p/mettaton}{#e/mettaton/10}Ha... querido...',
                            '<20>{#p/mettaton}{#e/mettaton/17}Você sabe o que acontece quando meu HP chega a zero...',
                            "<20>{#p/mettaton}{#e/mettaton/17}... não sabe?",
                            '<20>{#p/mettaton}{#e/mettaton/18}...',
                            '<20>{#p/mettaton}{#e/mettaton/9}Mas antes que eu vá.',
                            '<20>{#p/mettaton}{#e/mettaton/10}Eu só queria dizer...',
                            "<20>{#p/mettaton}{#e/mettaton/17}... você é a maior estrela que eu já tive aqui.",
                            '<20>{#p/mettaton}{#e/mettaton/19}Todas essas pessoas, nos assistindo...',
                            '<20>{#p/mettaton}{#e/mettaton/19}Torcendo por nós...',
                            "<20>{#p/mettaton}{#e/mettaton/17}Eles estão aqui por sua causa.",
                            '<20>{#p/mettaton}{#e/mettaton/10}Para ver sua história se desenrolar.',
                            '<20>{#p/mettaton}{#e/mettaton/9}Então... querido.',
                            "<20>{#p/mettaton}{#e/mettaton/13}Não subestime a si mesmo, tudo bem?",
                            "<20>{#p/mettaton}{#e/mettaton/14}E não se preocupe comigo.",
                            '<20>{#p/mettaton}{#e/mettaton/12}Porque, mesmo que minha história tenha encontrado um fim...'
                        ]
                        : [
                            '<20>{#p/mettaton}{#e/mettaton/14}...',
                            '<20>{#p/mettaton}{#e/mettaton/14}... você...',
                            "<20>{#p/mettaton}{#e/mettaton/12}Eu deveria sabe que você iria me trair.",
                            '<20>{#p/mettaton}{#e/mettaton/15}...',
                            '<20>{#p/mettaton}{#e/mettaton/15}Eu queria te dar uma chance.',
                            ...(SAVE.data.n.bad_lizard < 2
                                ? [
                                    '<20>{#p/mettaton}{#e/mettaton/14}Eu queria acreditar que ainda havia bem em você.',
                                    '<20>{#p/mettaton}{#e/mettaton/19}Mas agora...',
                                    "<20>{#p/mettaton}{#e/mettaton/22}Eu sei que não existe mais esperança para o que aconteceu."
                                ]
                                : [
                                    "<20>{#p/mettaton}{#e/mettaton/14}Eu queria acreditar na sua mudança.",
                                    '<20>{#p/mettaton}{#e/mettaton/19}Mas agora...',
                                    '<20>{#p/mettaton}{#e/mettaton/22}Eu já sabia que não existia bem em você desde o começo.'
                                ]),
                            '<20>{#p/mettaton}{#e/mettaton/30}... sua pobre coisa.',
                            '<20>{#p/mettaton}{#e/mettaton/30}Eu devo me desculpar.',
                            '<20>{#p/mettaton}{#e/mettaton/20}Se eu tivesse sido um pouco mais pragmático...',
                            "<20>{#p/mettaton}{#e/mettaton/23}Eu teria te dado a morte que você tanto merece.",
                            '<20>{#p/mettaton}{#e/mettaton/30}...',
                            "<20>{#p/mettaton}{#e/mettaton/30}Bom, tudo bem.",
                            '<20>{#p/mettaton}{#e/mettaton/24}Você vive e aprende, querido.',
                            '<20>{#p/mettaton}{#e/mettaton/30}E no fim...'
                        ],
        turnTalkX0b: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['<20>{*}{#p/mettaton}{#e/mettaton/31}... é que eu te perdôo!{^20}{%}']
                : iFancyYourVilliany()
                    ? ["<20>{*}{#p/mettaton}{#e/mettaton/30}... Vamos acabar com essa rivalidade com um estrondo.{^20}{%}"]
                    : !world.badder_lizard
                        ? ['<20>{*}{#p/mettaton}{#e/mettaton/30}... pelo menos isso acabou com uma explosão.{^20}{%}']
                        : ["<20>{*}{#p/mettaton}{#e/mettaton/27}... logo você perceberá que nem tudo se sairá da forma que quer!{^20}{%}"],
        turnTalkX1a: ['<20>{#p/mettaton}{#e/mettaton/19}{#a.la/8}{#a.ra/8}...?'],
        turnTalkX1b: [
            '<20>{#p/mettaton}{#e/mettaton/15}{#a.la/0}{#a.ra/0}... é claro.',
            "<20>{#p/mettaton}{#e/mettaton/13}{#a.la/8}{#a.ra/8}Você pensou que eu estaria morto sem os fios... né?",
            '<20>{#p/mettaton}{#e/mettaton/20}{#a.la/0}{#a.ra/10}Oh, querido... sua pobre, pobre criança lamentada.',
            "<20>{#p/mettaton}{#e/mettaton/23}{#a.la/10}{#a.ra/0}Você não poderia estar mais errada.",
            "<20>{#p/mettaton}{#e/mettaton/24}{#a.la/2}{#a.ra/3}Todo esse tempo, eu estive absorvendo o poder do CORE...",
            "<20>{#p/mettaton}{#e/mettaton/30}{#a.la/8}{#a.ra/8}Você realmente achou que eu iria desperdiça-lo?"
        ],
        turnTalkX1c: ["<20>{*}{#p/mettaton}{#e/mettaton/27}{#a.la/8}{#a.ra/8}Vamos ver se você gosta de mim AGORA!"],
        turnTalkX2: [
            '<20>{#p/mettaton}{#e/mettaton/26}... ugh...',
            '<20>{#e/mettaton/25}Você me venceu.',
            '<20>{#e/mettaton/19}Depois de tudo isso, eu te subestimei... de novo.',
            "<20>{#e/mettaton/13}Mas tudo bem.",
            '<20>{#e/mettaton/14}Alguém, alguém aí fora...',
            "<20>{#e/mettaton/19}Alguém aí fora vai conseguir te parar.",
            '<20>{#e/mettaton/9}E quando este momento chegar...',
            "<20>{#e/mettaton/10}Todos nós..." 
        ],
        turnTalkX3: [
            '<20>{#p/mettaton}{#e/mettaton/26}... inacreditável...',
            "<20>{#e/mettaton/25}Você nem me deixou usar meu poder total.",
            "<20>{#e/mettaton/10}Mas... talvez isso tenha sido para o melhor.",
            '<20>{#e/mettaton/9}...\nAté porque...',
            '<20>{#e/mettaton/18}Se realmente não existe esperança para nós aqui...',
            "<20>{#e/mettaton/10}Talvez nós deveríamos apenas tê-lo deixado vencer.",
            '<20>{#e/mettaton/9}...',
            '<20>{#e/mettaton/9}Pois bem...'
        ],
        audienceRec1: () => [
            '<21>{#p/event}Ring, ring...',
            '<21>{#p/napstablook}{~}.....',
            '<21>{#e/mettaton/9}{~}oh........',
            '<21>{~}oi...\nmettaton...',
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    "<21>{#e/mettaton/18}{~}eu sei que tem sido estranho desde nosso encontro... mas...",
                    '<21>{~}ver você por quem você realmente é, fazendo o que você realmente quer...',
                    '<21>{#e/mettaton/10}{~}trouxe um choro de felicidade ao meu coração...',
                    "<21>{#e/mettaton/9}{~}eu não sei se é, mas...\nacho que esse é o último episódio...?",
                    "<21>{#e/mettaton/11}{~}eu vou sentir sua falta...\nprimo..."
                ]
                : [
                    ...(iFancyYourVilliany()
                        ? [
                            '<21>{#e/mettaton/18}{~}eu realmente gostei de ver sua rivalidade...',
                            ...(SAVE.data.n.kills < 10
                                ? [
                                    "<21>{~}geralmente não é o tipo de coisa que eu gosto...\nmas...",
                                    '<21>{#e/mettaton/10}{~}por ter sido você quem fez, eu gostei...'
                                ]
                                : [
                                    '<21>{~}um monte de pessoas sumiram nas últimas horas...\nmas...',
                                    '<21>{#e/mettaton/10}{~}vendo você lutar com canta braveza fez com que eu me sentisse melhor'
                                ])
                        ]
                        : [
                            '<21>{#e/mettaton/18}{~}eu realmente gostei de assistir seu show...',
                            ...(SAVE.data.n.kills < 10
                                ? [
                                    '<21>{~}minha vida é bem entendiante...\nmas...',
                                    '<21>{#e/mettaton/10}{~}ver você na tv trouxe emoção para minha vida... sinceramente'
                                ]
                                : [
                                    '<21>{~}um monte de pessoas sumiram nas últimas horas...\nmas...',
                                    '<21>{#e/mettaton/10}{~}te ver na tv me ajudou a sentir-me melhor...'
                                ])
                        ]),
                    "<21>{#e/mettaton/9}{~}eu não sei se é, mas...\nacho que esse é o último episódio...?",
                    "<21>{#e/mettaton/11}{~}eu vou sentir sua falta...\nmettaton......"
                ])
        ],
        audienceRec2: [
            '<20>{#p/mettaton}{#e/mettaton/19}Não, espera!\nEspera, bl...',
            '<20>{#e/mettaton/9}El... ele já desligou.',
            '<20>{#e/mettaton/19}...',
            "<20>{#e/mettaton/20}Eu vou fazer mais uma ligação!"
        ],
        audienceRec3a: () =>
            iFancyYourVilliany()
                ? ['<21>{#p/basic}Mettaton, você nos deixou orgulhosos!']
                : ['<21>{#p/basic}Mettaton, seu show nos fez tão felizes!'],
        audienceRec3b: () =>
            iFancyYourVilliany()
                ? ["<21>{#p/basic}Mettaton, quem vai lutar contra os vilões sem você!"]
                : ["<21>{#p/basic}Mettaton, eu não sei o que irei assistir sem você!"],
        audienceRec3c: () =>
            iFancyYourVilliany()
                ? ["<21>{#e/mettaton/10}{#p/basic}Tem uma razão pela qual você é a estrela em ascensão do Outpost!"]
                : ["<21>{#e/mettaton/10}{#p/basic}Tem um buraco em formato de Mettaton no meu coração em formato do Mettaton!"],
        audienceRec4: () => [
            '<20>{#p/mettaton}Ah... eu entendo.',
            '<20>{#e/mettaton/9}...',
            '<20>{#e/mettaton/19}Todo mundo... muito obrigado.',
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    '<20>{#e/mettaton/20}E Blooky...',
                    "<20>{#e/mettaton/20}Eu nunca pensei que te perdoaria e os outros, mas...",
                    '<20>{#e/mettaton/9}Aquela fazenda era seu projeto dos sonhos, né?',
                    '<20>{#e/mettaton/9}Depois de ter muito de mim mesmo... eu acho que entendi.',
                    '<20>{#e/mettaton/19}Você só queria que fossemos bem sucedidos, juntos...',
                    '<20>{#e/mettaton/19}Você, Lurksalot, todos vocês...',
                    '<20>{#e/mettaton/20}Vocês só queriam nos ver felizes.',
                    '<20>{#e/mettaton/20}... heh.',
                    '<20>{#e/mettaton/9}E em relação a meu show...',
                    '<20>{#e/mettaton/10}Eu acho que vou me retirar por um tempo.'
                ]
                : ['<20>{#e/mettaton/20}Mas você entendeu errado...', "<20>{#e/mettaton/10}Eu... não vou a lugar nenhum."]),
            '<20>...',
            "<20>{#e/mettaton/20}Eu acho que foi para o melhor entretanto.",
            ...(SAVE.data.b.a_state_hapstablook
                ? [
                    "<20>{#e/mettaton/15}Eu estive longe da minha família por muito tempo...",
                    "<20>{#e/mettaton/14}Já é hora de contar a eles o que está acontecendo.",
                    '<20>{#e/mettaton/19}Por agora...'
                ]
                : [
                    "<20>{#e/mettaton/15}A verdade é que o consumo de energia desta forma é...",
                    '<20>{#e/mettaton/14}Ineficiente.',
                    "<20>{#e/mettaton/19}Em poucos momentos, eu irei ficar sem bateria, e..."
                ]),
            '<20>{#e/mettaton/10}Bem.',
            "<20>Eu ficarei bem.",
            iFancyYourVilliany()
                ? '<20>{#e/mettaton/9}Te vejo por aí, $(moniker2).'
                : '<20>{#e/mettaton/9}Vá em segurança, querido.',
            '<20>{#e/mettaton/19}E a todos... muito obrigado.',
            "<20>{#e/mettaton/20}Vocês foram uma ótima audiência!"
        ],
        neointro: [
            "<20>{*}{#p/mettaton}Você está laranja agora.{^30}{%}",
            "<20>{*}{#e/mettaton/4}Esse é meu ataque.{^30}{%}",
            "<20>{*}{#e/mettaton/12}... heh.\nQuem disse que não podemos nos divertir um pouco?{^30}{%}",
            '<20>{*}{#e/mettaton/0}Agora, seja um bom querido e aperte [Z] para explodir.{^30}{%}',
            '<20>{*}{#e/mettaton/0}Mas cuidado...{^30}{%}',
            "<20>{*}{#e/mettaton/0}Quanto mais você fizer isso, mais lentamente se moverá.{^30}{%}",
            '<20>{*}{#e/mettaton/12}... mas chega de palavras.{^30}{%}',
            "<20>{*}{#e/mettaton/4}É hora de te colocar em um caixão.{^30}{%}"
        ],
        mettahero1: [
            '<20>{#p/mettaton}{#e/mettaton/6}...',
            "<20>{#e/mettaton/9}A... acho que é isso que eu ganho por me fundir ao meu corpo...",
            "<20>{#e/mettaton/11}Agora... não existe mais ninguém...",
            '<20>{#e/mettaton/7}... que possa te parar...'
        ],
        mettahero2: ['<20>{#e/mettaton/7}...', '<20>{#e/mettaton/10}Adeus...\n...\n... querido.'],
        napstahero1: ['<20>{#p/finalghost}{~}...', '<20>{~}Mettaton...'],
        napstahero2: [
            '<20>{#p/finalghost}{~}Então chegamos a isso.',
            '<20>{~}...',
            '<20>{~}Eu esperei por muito tempo para ter a chance de te destruir, agora eu tenho uma.',
            '<20>{~}Como você não pode usar magia, você não pode me matar.',
            '<20>{~}Sendo assim, não tem como você passar por mim.',
            '<20>{|}{~}Sua hora cheg-{%}'
        ],
        napstahero3: () =>
            [
                [
                    "<20>{#p/asriel2}Sério?\nEu sei que minha mágica está limitada, mas não é TÃO ruim.",
                    '<20>{#x1}Tá me tirando de tempo aqui...'
                ],
                ['<20>{#p/asriel2}...']
            ][Math.min(SAVE.flag.n.ga_asrielNapstakill++, 1)],
        qq: () =>
            SAVE.data.b.a_state_hapstablook
                ? 'Você perdoaria um fantasma?'
                : !world.badder_lizard
                    ? 'Você beijaria um fantasma?'
                    : 'Você atacaria um fantasma?',
        qa: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['Sim', 'Não', 'Abraça Ele!', 'Perdoar\nE esquecer.']
                : !world.badder_lizard
                    ? ['Mas é claro', 'É CLARO', 'Absolutamente!', 'Sem\nHesitar.']
                    : ['Eu poderia', 'Eu deveria', 'Eu vou', 'Se eu\ntiver que.'],
        q0: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}Acabou o tempo.{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}O tempo acabou, querida.\nVou tomar isso como um sim~{^ 40}{%}"]
                    : ["<20>{#p/mettaton}O tempo acabou, querida.\nVou tomar isso como um sim ...{^40}{%}"],
        q1: () =>
            SAVE.data.b.a_state_hapstablook
                ? ['<20>{#p/mettaton}Direto ao ponto, eu vejo.{^40}{%}']
                : !world.badder_lizard
                    ? ['<20>{#p/mettaton}Ótima resposta! \nEu amei!!!{^40}{%}']
                    : ["<20>{#p/mettaton}Eu gostaria de te ver tentar.{^40}{%}"],
        q2: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}... mas eu não posso continuar fugindo.{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}É ASSIM que se responde a uma pergunta!{^40}{%}"]
                    : ['<20>{#p/mettaton}Então você só não tem coragem, hmm?{^40}{%}'],
        q3: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}Woah, eu não iria tão longe.{^40}{%}"]
                : !world.badder_lizard
                    ? ['<20>{#p/mettaton}Eu gostei da sua atitude!{^40}{%}']
                    : ['<20>{#p/mettaton}A verdade é tão refrescante!{^40}{%}'],
        q4: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/mettaton}Olha só, isso é confiança...{^40}{%}"]
                : !world.badder_lizard
                    ? ["<20>{#p/mettaton}Oooh, você está falando sério.{^40}{%}"]
                    : ["<20>{#p/mettaton}Não minta para si mesmo, querido...{^40}{%}"],
        hitIndicator: 'Acertos: $(x)',
        shieldIndicator: 'Escudo: $(x)%',
        ratings: {
            pose1: () => (iFancyYourVilliany() ? 'Impressionante' : 'Dramático'),
            pose2: () => (iFancyYourVilliany() ? 'Inexpressivo' : 'Arriscado '),
            pose3: () => (iFancyYourVilliany() ? 'Risível' : 'Louco'),
            pose4: () => (iFancyYourVilliany() ? 'Impressionante?' : 'Espetacular'),
            flirt1: () => (iFancyYourVilliany() ? 'Plot Twist' : 'Fofo'),
            flirt2: () => (iFancyYourVilliany() ? 'Dobrando Aposta' : 'Flerte'),
            flirt3: () => (iFancyYourVilliany() ? 'Triplicando Aposta' : 'Romântico'),
            flirt4: () => (iFancyYourVilliany() ? 'Flertador' : 'Fascinante'),
            boast1: 'Desapontante',
            boast2: 'Embaraçoso',
            boast3: 'Impressionante',
            heel1: 'Satisfatório',
            heel2: 'Decadente',
            heel3: 'Insatisfatório',
            hurt: 'Violento',
            crit: 'Preciso',
            dead: 'Mortal',
            bomb: 'Explosivo',
            scream: 'Entusiasta',
            hopbox: 'Acrobático',
            hearthurt: 'Ainda Mais Violento',
            item: {
                artifact: 'Normal',
                old_gun: 'Atordoante',
                old_bomb: 'Narcótico',
                old_spray: 'Picante',
                tvm_radio: 'Musical',
                tvm_fireworks: 'Extravagante',
                tvm_mewmew: 'Descarado',
                spanner: 'Coreográfico',
                armor: 'Elegante',
                weapon: 'Tático',
                repeat: 'Repetitivo',
                repeat_x: 'Super Repetitivo',
                pain: 'Doloroso',
                blookpie: 'Familiar'
            },
            smooch: 'Correto',
            nosmooch: 'Incorreto'
        }
    },

    b_opponent_madjick: {
        name: '* Cozmo',
        spanner: ['<32>{#p/human}* (Você brande a chave.)\n* (Cozmo não a confunde com uma varinha mágica.)'],
        epiphaNOPE: ['<20>{#p/basic}{~}Essa magia...', '<20>{#p/basic}{~}... Não cederei ao seu poder!'],
        hint: ['<33>{#p/basic}* Espera.\n* Eu acho que sei o que fazer aqui.'],
        assistTalk1: ['<20>{#p/basic}{~}Er...'],
        artifact_text: ['<32>{#p/basic}* Cozmo reconhece o artefato e te declara como merecedor de seu respeito!'],
        artifactTalk: [
            '<20>{#p/basic}{~}Poderia ser?\nO pingente de reis e governantes?',
            '<20>{#p/basic}{~}Eu devo me retirar do seu caminho agora!'
        ],
        assistAction: [
            '<32>{*}{#p/basic}* Um mundo antigo. {^5}Um mundo de magia.{^25}{%}',
            '<32>{*}{#p/basic}* Mas não importa o quão trágico, devemos continuar vivendo...{^60}{%}',
            '<32>{*}{#p/basic}* E lembre-se.{^40}{%}'
        ],
        assistTalk2: ['<20>{#p/basic}{~}Memoria mundi!', '<20>{#p/basic}{~}Você sabe as palavras!'],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* Cozmo está nocauteado!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Cozmo está nocauteado!'
        ],
        old_spray_text: ['<32>{#p/human}* (Você usa o spray.)\n* (Doce...)', '<32>{#p/basic}* Cozmo está nocauteado!'],
        status1: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* Uh oh.'] : ['<32>{#p/story}* Cozmo aparece em um piscar de olhos!'],
        act_check: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Cozmo é o que você chamaria de um \"tradicional\" usuário de magia.\n* Seus orbes são força.']
                : ['<32>{#p/story}* COZMO - ATQ 29 DEF 24\n* Este membro do esquadrão de ELITE fala em palavras mágicas.'],
        act_check2: ['<32>{#p/story}* COZMO - ATQ 29 DEF 24\n* Não joga com todas as cartas.'],
        act_check3: ['<32>{#p/história}* COZMO - ATQ 29 DEF 24\n* Um mágico, sem truques...'],
        act_check4: ['<32>{#p/story}* COZMO - ATQ 29 DEF 24\n* Nenhuma palavra mágica pode salvar este velho mágico.'],
        act_check5: [
            '<32>{#p/story}* COZMO - ATQ 29 DEF 24\n* O poder do amor é mais forte do que a mais antiga magia.'
        ],
        idleStatus1: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* É o Cozmo."] : ['<32>{#p/story}* Cozmo faz um gabarito misterioso.'],
        idleStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* É o Cozmo."]
                : ['<32>{#p/story}* Cozmo exibe seus orbes de maneira ameaçadora.'],
        idleStatus3: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* É o Cozmo."]
                : ['<32>{#p/story}* Cozmo sussurra palavrões não terrestres.'],
        idleStatus4: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* É o Cozmo."]
                : ['<32>{#p/story}* Cozmo te dá um olhar penetrante.'],
        idleStatus5: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* É o Cozmo."] : ['<32>{#p/story}* Cheira a... magia.'],
        idleTalk1: ['<20>{#p/basic}{~}Abra cadabra.'],
        idleTalk2: ['<20>{#p/basic}{~}A la kazam!!'],
        idleTalk3: ['<20>{#p/basic}{~}Tinkle tinkle hoy.'],
        idleTalk4: ['<20>{#p/basic}{~}Hocus pocus.'],
        idleTalk5: ['<21>{#p/basic}{~}Por favor e obrigado.'],
        danceText1: ['<32>{#p/human}* (Você dança.)', "<32>{#p/basic}* O orbe gravitacional de Cozmo chega mais perto..."],
        danceTalk1: ['<20>{#p/basic}{~}Magnum gravitas!!'],
        danceStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Um orbe caiu...']
                : ["<32>{#p/story}* O orbe gravitacional de Cozmo cedeu sua atração."],
        danceText2: () => [
            '<32>{#p/human}* (Você dança.)',
            "<32>{#p/basic}* O orbe chocante de Cozmo se fortalece...",
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* Isso, é isso!\n* V-você tá quase lá!"] : [])
        ],
        danceTalk2: ['<20>{#p/basic}{~}Vulu voltika!'],
        danceTalk3: ["<20>{#p/basic}{~}Isso é demais!!!"],
        danceStatus2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Isso!!!\n* Os orbes não tem mais poder!']
                : ["<32>{#p/story}* Os orbes do Cozmo estão sem energia."],
        danceText3: ['<32>{#p/human}* (Você dança.)\n* (Nada muda.)'],
        danceText4: [
            '<32>{#p/human}* (Você dança.)',
            "<32>{#p/basic}* A confusão de Cozmo aumenta a um grau insuportável!"
        ],
        danceIdleTalk1: ['<20>{#p/basic}{~}Tristeza...'],
        danceIdleTalk2: ['<20>{#p/basic}{~}Derrotado...'],
        danceIdleTalk3: ['<20>{#p/basic}{~}Falha...'],
        danceStatus3: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Você pode poupar ele agora.']
                : ['<32>{#p/story}* Cozmo está sem opções.'],
        playdeadText1: () => [
            '<32>{#p/human}* (Você finge de morto.)',
            "<32>{#p/basic}* Os orbes do Cozmo começam a agir de forma estranha...",
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Mas que...?'] : [])
        ],
        playdeadTalk: ['<20>{#p/basic}{~}\x00*cara de confusão*'],
        playdeadStatus: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Eu acho que funcionou...?']
                : ["<32>{#p/story}* Os orbes do Cozmo não sabem como lidar com isso."],
        playdeadIdleTalk1: ['<20>{#p/basic}{~}Desconfiança total.'],
        playdeadIdleTalk2: ['<20>{#p/basic}{~}Vexame total.'],
        playdeadIdleTalk3: ['<20>{#p/basic}{~}Confusão radical.'],
        playdeadText2: ['<32>{#p/human}* (Você finge de morto.)\n* (Nada acontece.)'],
        flirtText0: () => [
            '<32>{#p/human}* (Você flerta com o Cozmo.)\n* (Sem efeito.)',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* É, boa sorte com isso...'] : [])
        ],
        flirtText1: () => [
            '<32>{#p/human}* (Você chama na experiência, e invoca uma magia de flerte.)',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Huh...?'] : [])
        ],
        flirtTalk1: ['<20>{#p/basic}{~}Ah!\nParceiro mago!'],
        flirtStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Oh meu senhor!\n* Faz de novo!!!!']
                : ['<32>{#p/story}* Cozmo está no trem do amor.'],
        flirtText2: () => [
            '<32>{#p/human}* (Você chama na experiência e recita uma escrita romântica.)',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Só fica cada vez melhor.'] : [])
        ],
        flirtTalk2: ["<20>{#p/basic}{~}Ah!\nÉ incrível!"],
        flirtStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Wow... eu acho que é isso."]
                : ['<32>{#p/story}* Cozmo está encantado.'],
        flirtText3: () => [
            '<32>{#p/human}* (Você flerta.)\n* (Nada acontece.)',
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* Pfft, não seja tão metido."] : [])
        ],
        flirtIdleTalk1: ['<20>{#p/basic}{~}Que amável...'],
        flirtIdleTalk2: ['<20>{#p/basic}{~}Que doce...'],
        flirtIdleTalk3: ['<20>{#p/basic}{~}Quão atencioso...'],
        perilStatus: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* Seu HP está baixo...'] : ['<32>{#p/story}* Cozmo está tentando se manter de pé.']
    },

    b_opponent_knightknight: {
        name: '* Terrestria',
        epiphaNOPE: ['<20>{#p/basic}{~}... essa magia... é a proibida...'],
        hint: ['<32>{#p/basic}* Espera...\n* Deixa eu tentar uma coisa.'],
        assistTalk1: ['<20>{#p/basic}{~}...\n...\n...\nHmm?'],
        assistAction: [
            '<32>{*}{#p/human}* (...){^30}{%}',
            '<32>{*}{#p/human}* (O som de uma música ancestral permeia a sala.){^100}{%}'
        ],
        assistTalk2: [
            '<20>{#p/basic}{~}Um som do nosso mundo perdido a tanto tempo...',
            '<20>{#p/basic}{~}Talvez ainda exista beleza no universo...'
        ],
        artifact_text: ['<32>{#p/basic}* Terrestria reconhece o artefato e te considera digno da sua confiança!'],
        artifactTalk: [
            '<20>{#p/basic}{~}Um artefato do nosso mundo perdido a tanto tempo...',
            '<20>{#p/basic}{~}Talvez sua lenda viverá em você.'
        ],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* Terrestria está nocauteada!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Terrestria está nocauteada!'
        ],
        old_spray_text: [
            '<32>{#p/human}* (Você usa o spray.)\n* (Doce...)',
            '<32>{#p/basic}* Terrestria está nocauteada!'
        ],
        status1: () =>
            !world.badder_lizard
                ? SAVE.data.b.assist_madjick
                    ? ['<32>{#p/alphys}* Você acha que consegue repetir aquele último truque?']
                    : ['<32>{#p/alphys}* De novo não.']
                : ['<32>{#p/story}* Terrestria bloqueia o caminho!'],
        act_check: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Terrestria é uma portadora de cajado e é REALMENTE apaixonada pelo mundo natal."]
                : [
                    '<32>{#p/história}* TERRA - ATQ 36 DEF 36\n* Está membro pesada do esquadrão ELITE empunha o Cajado Planetário.'
                ],
        act_check2: ['<32>{#p/história}* TERRA - ATQ 36 DEF 36\n* O mundo está desmoronando.'],
        act_check3: ["<32>{#p/story}* TERRESTRIA - ATQ 36 DEF 36\n* As coisas não são mais tão ruins."],
        act_check4: ['<32>{#p/história}* TERRA - ATQ 36 DEF 36\n* O chão treme sob suas botas sempre gastas.'],
        act_check5: ['<32>{#p/história}* TERRA - ATQ 36 DEF 36\n* Sua atenção roubada, o mundo cai.'],
        idleStatus1: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* É a Terrestria."]
                : ['<32>{#p/story}* Terrestria aperta com força o seu cajado.'],
        idleStatus2: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* É a Terrestria."] : ['<32>{#p/story}* Terrestria respira profundamente.'],
        idleStatus3: () =>
            !world.badder_lizard ? ["<32>{#p/alphys}* É a Terrestria."] : ['<32>{#p/story}* Terrestria assiste quieta.'],
        idleStatus4: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* É a Terrestria."]
                : ["<32>{#p/story}* A armadura de Terrestria apresenta um amarelo dourado forte."],
        idleStatus5: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* É a Terrestria."]
                : ['<32>{#p/story}* Cheira a uma relíquia esquecida.'],
        idleTalk1: ['<20>{#p/basic}{~}Boa noite.'],
        idleTalk2: ['<20>{#p/basic}{~}Durma bem.'],
        idleTalk3: ['<20>{#p/basic}{~}Adieu.'],
        idleTalk4: ['<20>{#p/basic}{~}Feche seus olhos...'],
        idleTalk5: ['<20>{#p/basic}{~}Adeus.'],
        comfortText1: () => [
            '<32>{#p/human}* (Você se aproxima e abraça Terrestria, dizendo a ela que as coisas ficarão bem.)',
            ...(!world.badder_lizard ? ["<32>{#p/alphys}* Isso é... uh..."] : [])
        ],
        comfortTalk1: ['<20>{#p/basic}{~}...\n...\n...\nVerdade?'],
        comfortStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Ela está... chorando?']
                : ["<32>{#p/story}* Terrestria demonstra fraqueza."],
        comfortText2: () => [
            '<32>{#p/human}* (Você segura a mão de Terrestria e a lembra que ainda existe beleza no universo.)',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Awww...'] : [])
        ],
        comfortTalk2: ['<20>{#p/basic}{~}...\n...\nObrigada...'],
        comfortStatus2: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Isso foi... muito fofo."]
                : ['<32>{#p/story}* Terrestria encontrou um novo propósito na vida.'],
        comfortTalk3: ['<20>{#p/basic}{~}...\n...\nAí está...'],
        comfortText3: ['<32>{#p/human}* (Você conforta Terrestria.)\n* (Nada muda.)'],
        comfortText4: [
            '<32>{#p/human}* (Você conforta Terrestria.)',
            '<32>{#p/basic}* Terrestria deixa seu cajado cair e aceita sua oferta de paz.'
        ],
        comfortIdleTalk1: ['<20>{#p/basic}{~}Gratitude.'],
        comfortIdleTalk2: ['<20>{#p/basic}{~}Much obliged.'],
        comfortIdleTalk3: ['<20>{#p/basic}{~}Vários obrigados.'],
        comfortStatus3: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Eu acho que você já pode poupar ela...']
                : ['<32>{#p/story}* Terrestria está em paz.'],
        flashText1: () => [
            '<32>{#p/human}* (Você joga a luz do celular na cara dela.)',
            '<32>{#p/basic}* Terrestria está em pânico!',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* O que você tá fazendo!?'] : [])
        ],
        flashTalk: ['<20>{#p/basic}{~}\x00*pânico silencioso*'],
        flashStatus: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Ela está c-cega!"]
                : ['<32>{#p/story}* Terrestria perdeu seu sentido para está batalha.'],
        flashIdleTalk1: ['<20>{#p/basic}{~}Sem visão...'],
        flashIdleTalk2: ["<20>{#p/basic}{~}Não pode te ver..."],
        flashIdleTalk3: ['<20>{#p/basic}{~}Onde você está...'],
        flashText2a: [
            '<32>{#p/human}* (Você pisca a tela do telefone.)\n* (Terrestria está muito ocupado sonhando acordada com você para notar.)'
        ],
        flashText2b: ['<32>{#p/human}* (Você pisca a tela do telefone.)\n* (Terrestria está relaxada demais para notar.)'],
        flashText2c: ['<32>{#p/human}* (Você liga a luz do telefone.)\n* (Nada acontece.)'],
        flirtText0: () => [
            '<32>{#p/human}* (Você flerta com a Terrestria.)\n* (Sem efeito.)',
            ...(!world.badder_lizard
                ? ['<32>{#p/alphys}* Sim, o esquadrão ELITE é meio que treinado contra o flerte.']
                : [])
        ],
        flirtText1: () => [
            '<32>{#p/human}* (Você chama na experiência, e joga um simples mas confiante comprimento.)',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Uh...'] : [])
        ],
        flirtTalk1: ['<20>{#p/basic}{~}Que beleza...'],
        flirtStatus1: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Claro que você encontraria uma maneira de fazer isso funcionar..."]
                : ['<32>{#p/story}* Terrestria está começando a gostar de você.'],
        flirtText2: () => [
            "<32>{#p/human}* (Você chama na experiência e olha longamente nos olhos de Terrestria.)",
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Ohhhh cara.'] : [])
        ],
        flirtTalk2: ['<20>{#p/basic}{~}Que coisa linda de se ver...'],
        flirtStatus2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* B-bom.\n* Isso foi... alguma coisa.']
                : ['<32>{#p/story}* Terrestria está apaixonada.'],
        flirtText3: () => [
            '<32>{#p/human}* (Você flerta.)\n* (Nada acontece.)',
            ...(!world.badder_lizard ? ['<32>{#p/alphys}* Você é insano.'] : [])
        ],
        flirtIdleTalk1: ['<20>{#p/basic}{~}É de tirar o fôlego...'],
        flirtIdleTalk2: ['<20>{#p/basic}{~}Que maravilha...'],
        flirtIdleTalk3: ['<20>{#p/basic}{~}Que lindo...'],
        perilStatus: () =>
            !world.badder_lizard
                ? ["<32>{#p/alphys}* Ela está próxima da morte..."]
                : ["<32>{#p/story}* Terrestria respira ofegante."]
    },

    b_opponent_froggitex: {
        name: '* Final Froggit',
        epiphany: [
            
            ['<08>{#p/basic}{~}Na sua piedade, eu vejo esperança.', '<08>{#p/basic}{~}Minhas esperanças foram preenchidas.'],
            () =>
                world.meanie
                    ? 
                    [
                        '<08>{#p/basic}{~}Eu não previ esse resultado.',
                        '<08>{#p/basic}{~}Devo me afastar do abismo...'
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}Pule, pule.', '<08>{#p/basic}{~}O amor pode radiar em nossos corações.']
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}Nós devemos ser os melhores dos amigos.']
                            : 
                            ['<08>{#p/basic}{~}Sua bondade aquece meu coração.'],
            
            ['<08>{#p/basic}{~}Robbit, robbit.', '<08>{#p/basic}{~}Minha hora chegou.'],
            
            ['<08>{#p/basic}{~}Que você tenha a riqueza que deseja.']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* Final Froggit está derrotado!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Final Froggit está derrotado!'
        ],
        old_spray_text: [
            '<32>{#p/human}* (Você usa o spray.)\n* (Doce...)',
            '<32>{#p/basic}* Final Froggit está derrotado!'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* Final Froggit é como o Froggit, mas chique. Ele fala em uma língua antiga."]
                        : ["<32>{#p/alphys}* É apenas o Final Froggit."]
                    : ['<32>{#p/story}* FINAL FROGGIT - ATQ 30 DEF 24\n* O futuro é ilimitado para este monstro.'],
        act_check2: [
            '<32>{#p/story}* FINAL FROGGIT - ATQ 30 DEF 24\n* Este monstro pode em breve viver através de sua sabedoria.'
        ],
        act_check3: ['<32>{#p/story}* FINAL FROGGIT - ATQ 30 DEF 24\n* Este monstro entende seu verdadeiro propósito.'],
        act_check4: ['<32>{#p/story}* FINAL FROGGIT - ATQ 30 DEF 24\n* Este monstro está satisfeito com sua mensagem.'],
        idleText1: ['<08>{#p/basic}{~}Robbit, robbit.'],
        idleText2: ['<08>{#p/basic}{~}Creak, creak.'],
        idleText3: ['<08>{#p/basic}{~}Pule, pule.'],
        idleText4: ['<08>{#p/basic}{~}Purr.'],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* O campo de batalha está envolto no cheiro de raiz de leola.'],
        status2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Final Froggit busca um entendimento.'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Final Froggit deseja compartilhar sua sabedoria.'],
        act_flirt: () => [
            '<32>{#p/human}* (Você flerta com o Final Froggit.)',
            '<32>* Final Froggit demonstra modesta apreciação por suas remarcações.',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Ehehe...'] : [])
        ],
        flirtText: () =>
            world.meanie ? ['<08>{#p/basic}{~}(Suspiro alto.) \nRobbit.'] : ['<08>{#p/basic}{~}(Muito envergonhado.)\nRobbit.'],
        act_translate1: () => [
            '<32>{#p/human}* (Mas não havia nada para você traduzir ainda.)',
            ...(!world.badder_lizard
                ? ['<32>{#p/alphys}* Talvez você deveria, sei lá... esperar ele dizer algo antes?']
                : [])
        ],
        act_translate2: ["<32>{#p/human}* (Você traduz a mensagem do Final Froggit.)"],
        translateText1: () =>
            world.meanie
                ? ["<08>{#p/basic}{~}(Não mate e não seja morto.)"]
                : ['<08>{#p/basic}{~}(Tempo cura todas as dores.)'],
        translateText2: () =>
            world.meanie
                ? ['<08>{#p/basic}{~}(Não permita que a raiva o consuma.)']
                : ['<09>{#p/basic}{~}(Continue caminhando em frente.)'],
        translateText3: () =>
            world.meanie
                ? ['<08>{#p/basic}{~}(Você sempre pode fazer melhor.)']
                : ['<08>{#p/basic}{~}(Mantenha-se verdadeiro a si mesmo.)'],
        translateText4: () =>
            world.meanie ? ['<08>{#p/basic}{~}(Nunca de as mãos ao medo.)'] : ['<08>{#p/basic}{~}(Sempre tente seu melhor.)'],
        translateText5: () =>
            world.meanie
                ? ['<08>{#p/basic}{~}(Se arrependa de quando você foi mau.)']
                : ['<08>{#p/basic}{~}(Nunca se arrependa da sua bondade.)'],
        mercyStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Eu acho que você pode poupar ele agora.']
                    : ['<32>{#p/alphys}* Eu acho que você pode poupa-lo agora.']
                : ['<32>{#p/story}* Final Froggit parece relutante em lutar contra você.'],
        act_mystify: ['<32>{#p/human}* (Você faz algo misterioso, mas o Final Froggit não é afetado.)'],
        act_threaten: ['<32>{#p/human}* (Você faz algo ameaçador, mas o Final Froggit não é afetado.)'],
        perilStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Uh...']
                    : ['<32>{#p/alphys}* Não...']
                : ['<32>{#p/story}* Final Froggit se mantém firme.']
    },

    b_opponent_whimsalot: {
        name: '* Flutterknyte',
        epiphany: [
            
            ['<08>{#p/basic}{~}Ainda bem..', '<08>{#p/basic}{~}Eu temi que nunca iria escapar.'],
            () =>
                world.meanie
                    ? 
                    ['<08>{#p/basic}{~}O que eu estava pensando..', '<08>{#p/basic}{~}Eu preciso sair daqui..!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}Se você realmente se sente assim...', '<08>{#p/basic}{~}Eu sou obrigado a me sentir também..!']
                        : SAVE.data.b.oops
                            ? 
                            ["<08>{#p/basic}{~}Tudo bem..", '<08>{#p/basic}{~}Nós podemos ser amigos de você quiser..']
                            : 
                            ['<08>{#p/basic}{~}Por favor..', "<08>{#p/basic}{~}N-não deixe ir.."],
            
            ["<08>{#p/basic}{~}Eu sinto muito..", "<08>{#p/basic}{~}Eu sabia que não era o suficiente para isso.."],
            
            ["<08>{#p/basic}{~}Aqui está seu pagamento..", '<08>{#p/basic}{~}Por favor.. tenha piedade..']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* Flutterknyte está derrotado!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Flutterknyte está derrotado!'
        ],
        old_spray_text: [
            '<32>{#p/human}* (Você usa o spray.)\n* (Doce...)',
            '<32>{#p/basic}* Flutterknyte está derrotado!'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Flutterknyte... sou só eu ou ele parece nervoso?']
                        : ["<32>{#p/alphys}* É apenas o Flutterknyte."]
                    : [
                        '<32>{#p/story}* FLUTTERKNYTE - ATQ 34 DEF 12\n* Este monstro carregado um grande senso de responsabilidade.'
                    ],
        act_check2: ['<32>{#p/story}* FLUTTERKNYTE - ATQ 34 DEF 12\n* Se mantém atrás, por medo de desapontar.'],
        act_check3: ['<32>{#p/história}* FLUTTERKNYTE - ATQ 34 DEF 12\n* Um peso foi levantado de suas asas'],
        act_check4: ["<32>{#p/história}* FLUTTERKNYTE - ATQ 34 DEF 12\n* Suas asas não são as únicas coisas que sabem voar..."],
        act_perch1: () => [
            '<32>{#p/human}* (Você oferece seu braço para Flutterknyte se segurar.)',
            '<32>{#p/basic}* Flutterknyte pensa sobre aceitar sua proposta...',
            ...(!world.badder_lizard && calm_lizard() ? ["<32>{#p/alphys}* Você tá na metade do caminho."] : [])
        ],
        act_perch2: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* (Você continua a oferecer.)',
                    '<32>{#p/basic}* Flutterknyte recua, temendo por sua vida...',
                    '<32>* Flutterknyte deseja ir agora.',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Muito bem...?'] : [])
                ]
                : [
                    '<32>{#p/human}* (Você continua a oferecer.)',
                    '<32>{#p/basic}* Flutterknyte se move até seu braço e assenta.',
                    '<32>* Flutterknyte pode descansar agora.',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Muito bem!'] : [])
                ],
        act_perch3: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* (Você oferece seu outro braço para Flutterknyte.)',
                    '<33>{#p/basic}* Flutterknyte parece já ter entendido...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ... cara.'] : [])
                ]
                : [
                    '<32>{#p/human}* (Você oferece seu outro braço para Flutterknyte.)',
                    '<32>{#p/basic}* Flutterknyte, oprimida pelas possibilidades, decide voar para longe.',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* ... que.'] : [])
                ],
        act_flirt: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* (Você com o Flutterknyte.)',
                    '<32>{#p/basic}* Flutterknyte está surpreso e sente um conflito...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Er...'] : [])
                ]
                : [
                    '<32>{#p/human}* (Você com o Flutterknyte.)',
                    '<32>{#p/basic}* Flutterknyte fica surpreso, mas aceita mesmo assim...',
                    ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Que gracinha...'] : [])
                ],
        flirtTalk: () =>
            world.meanie ? ['<08>{#p/basic}{~}O que fazer, o que dizer.'] : ['<08>{#p/basic}{~}Muito obrigado, muito obrigado.'],
        act_poke1: () => [
            '<32>{#p/human}* (Você cutuca Flutterknyte para desequilibrá-lo.)',
            '<32>{#p/basic}* Flutterknyte fica abalado, mas rapidamente recupera o foco.',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Maldoso...?'] : [])
        ],
        act_poke2: () => [
            '<32>{#p/human}* (Você cutuca Flutterknyte para desequilibrá-lo.)',
            '<32>{#p/basic}* Flutterknyte cai e rola para longe!',
            ...(!world.badder_lizard && calm_lizard()
                ? ["<32>{#p/alphys}* Eu vou pretender que você não acabou de fazer isso."]
                : [])
        ],
        preperchText1: ['<08>{#p/basic}{~}Eu deveria..?'],
        preperchText2: ['<08>{#p/basic}{~}Eu posso..?'],
        preperchText3: ['<08>{#p/basic}{~}Eu vou..?'],
        perchText1: ['<08>{#p/basic}{~}\x00*suspiro exausto*'],
        perchText2: ['<08>{#p/basic}{~}Descanso, no fim de tudo.'],
        perchText3: ['<08>{#p/basic}{~}Obrigado.'],
        perchText4: ['<08>{#p/basic}{~}Eu sabia o quão não estava cansado.'],
        perchText5: ["<08>{#p/basic}{~}Não sei quanto tempo se passou."],
        idleTalk1: ["<08>{#p/basic}{~}Eu irei fazer o que devo.."],
        idleTalk2: ["<08>{#p/basic}{~}É pelo bem da grandeza.."],
        idleTalk3: ["<08>{#p/basic}{~}Eles estão contando comigo.."],
        idleTalk4: ['<08>{#p/basic}{~}O futuro depende disso..'],
        idleTalk5: ['<08>{#p/basic}{~}\x00*balança balança*'],
        perilStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Uh...']
                    : ['<32>{#p/alphys}* Não...']
                : ['<32>{#p/story}* Flutterknyte está com sérios problemas.'],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Flutterknyte continua procurando justificativas.'],
        status2: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte está pairando.']),
        status3: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Cheira a peras.']),
        status4: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte vai devagar e respira fundo.'],
        status5: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Flutterknyte pondera sobre seu futuro.'],
        spareStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Parece que Flutterknyte aceita sua piedade agora.']
                    : ["<32>{#p/alphys}* Parece que ele aceita sua piedade."]
                : ['<32>{#p/story}* Flutterknyte está descansando.']
    },

    b_opponent_astigmatism: {
        name: '* Eyewalker Prime',
        epiphany: [
            
            ['<08>{#p/basic}{~}Fora da visão, fora da mente.'],
            () =>
                world.meanie
                    ? 
                    [
                        '<08>{#p/basic}{~}A sua malícia é mais forte que a minha!',
                        "<08>{#p/basic}{~}Não vou testá-lo mais."
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}Tanta beleza em seus olhos..', "<08>{#p/basic}{~}Não conte ao clã sobre isso!"]
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}Amizade..', '<08>{#p/basic}{~}Essa pode ser uma verdadeira abertura de olhos!']
                            : 
                            ["<08>{#p/basic}{~}Não aperte com muita força, ok?"],
            
            ['<08>{#p/basic}{~}Eu devo morrer orgulhoso como um líder.'],
            
            ["<08>{#p/basic}{~}Tch.. não tente me pagar de volta.", '<08>{#p/basic}{~}Isso é por você!']
        ],
        genostatus: ['<32>{#p/asriel2}* ...'],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* Eyewalker Prime está derrotado!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Eyewalker Prime está derrotado!'
        ],
        old_spray_text: [
            '<32>{#p/human}* (Você usa o spray.)\n* (Doce...)',
            '<32>{#p/basic}* Eyewalker Prime está derrotado!'
        ],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* Eyewalker Prime...?\n* Ele provavelmente é o líder do clã dos Eyewalker."]
                        : ["<32>{#p/alphys}* É apenas o Eyewalker Prime."]
                    : ["<33>{#p/story}* EYEWALKER PRIME - ATQ 32 DEF 26\n* A mais para esse monstro do que apenas seus olhos."],
        act_check2: [
            '<32>{#p/história}* EYEWALKER PRIME - ATQ 32 DEF 26\n* Satisfeito com o seu seguimento das tradições familiares.'
        ],
        act_check3: ['<32>{#p/story}* EYEWALKER PRIME - ATQ 32 DEF 26\n* Considera você um grande \"observador\" agora.'],
        act_check4: [
            '<32>{#p/story}* EYEWALKER PRIME - ATQ 32 DEF 26\n* Para este monstro, tradição vem antes de segurança.'
        ],
        act_stare: ['<32>{#p/human}* (Você encara Eyewalker Prime.)'],
        act_smile: ['<32>{#p/human}* (Você sorri para Eyewalker Prime.)'],
        act_flirt: () => [
            '<32>{#p/human}* (Você pisca para o Eyewalker Prime.)',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Oh qual foi.'] : [])
        ],
        status1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime está encarando sua ALMA.'],
        status2: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime oferece um sorriso ameaçador.'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ["<32>{#p/story}* Eyewalker Prime não está para brincadeira."],
        status4: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* Eyewalker Prime pensa na honra de sua família."],
        status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Cheira a enxaguante bucal.']),
        perilStatus: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* Uh...'] : ['<32>{#p/story}* Eyewalker Prime está regando.'],
        idleTalk1: ['<08>{#p/basic}{~}Desse jeito!'],
        idleTalk2: ['<08>{#p/basic}{~}Me mostre seus dentes!'],
        idleTalk3: ["<08>{#p/basic}{~}Não se segure!"],
        idleTalk4: ['<08>{#p/basic}{~}Me mostre quem você é!'],
        idleTalk5: ['<08>{#p/basic}{~}Do que VOCÊ é feito?'],
        flirtTalk: ["<08>{#p/basic}{~}Hah.\nBoa tentativa.\nMas eu sou levado!"],
        partialTalk1: ["<08>{#p/basic}{~}Isso está certo em partes.."],
        partialTalk2: ["<08>{#p/basic}{~}Você quase conseguiu.."],
        partialTalk3: ["<08>{#p/basic}{~}Você está chegando lá.."],
        partialStatus1: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Eu acho que você precisa fazer a outra coisa agora.']
                    : ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime está procurando por mais.'],
        partialStatus2: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Eyewalkers amam quando você sorri e encara eles.']
                    : ['<32>{#p/alphys}* ...']
                : ['<32>{#p/story}* Eyewalker Prime quer ver a foto inteira.'],
        partialStatus3: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* F-faça outra coisa!']
                    : ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* Eyewalker Prime deseja que você siga seus movimentos."],
        fullStatus: () =>
            !world.badder_lizard
                ? calm_lizard()
                    ? ['<32>{#p/alphys}* Eyewalker Prime parece contente agora...']
                    : ['<32>{#p/alphys}* Ele parece contente agora...']
                : ['<32>{#p/story}* Eyewalker Prime está satisfeito.'],
        partialIdleTalk1: ['<08>{#p/basic}{~}O que você está esperando?'],
        partialIdleTalk2: ['<08>{#p/basic}{~}Você vai fazer alguma coisa ou..'],
        partialIdleTalk3: ["<08>{#p/basic}{~}Isso é tudo que você tem?"],
        fullIdleTalk1: ['<08>{#p/basic}{~}Feliz por vermos olho a olho.'],
        fullIdleTalk2: ['<08>{#p/basic}{~}Parecendo bom, amigão.'],
        fullIdleTalk3: ["<08>{#p/basic}{~}É assim que se faz."],
        flirtTalkFull: ['<08>{#p/basic}{~}Hmm..', '<08>{#p/basic}{~}Você fez um movimento convincente..'],
        hurtTalk: ["<08>{#p/basic}{~}Não foi isso que eu quis dizer!"]
    },
    b_opponent_migospel: {
        genostatus: ['<32>{#p/asriel2}* ...'],
        epiphany: [
            
            ["<08>{#p/basic}{~}Eu não queria lutar com você mesmo."],
            () =>
                world.meanie
                    ? 
                    ['<08>{#p/basic}{~}Eu sabia que essa era uma má ideia.']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ['<08>{#p/basic}{~}Você é bem estranho.', '<08>{#p/basic}{~}mas charmoso mesmo assim.']
                        : SAVE.data.b.oops
                            ? 
                            ["<08>{#p/basic}{~}Claro, meu amigo.", "<08>{#p/basic}{~}É melhor assim."]
                            : 
                            ['<08>{#p/basic}{~}Um..', "<08>{#p/basic}{~}Se é isso que você realmente quer?"],
            
            ["<08>{#p/basic}{~}É hora de parar de correr..", '<08>{#p/basic}{~}.. da minha morte.'],
            
            ["<08>{#p/basic}{~}Você vai tirar mais proveito disso do que eu.", '<08>{#p/basic}{~}Por tudo que isso significa, tome.']
        ],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<32>{#p/basic}* Silencio escapa!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Silencio escapa!'
        ],
        old_spray_text: ['<32>{#p/human}* (Você usa o spray.)\n* (Doce...)', '<32>{#p/basic}* Silencio escapa!'],
        act_check: () =>
            world.goatbro && SAVE.data.n.plot > 66.2
                ? ['<32>{#p/asriel2}* ...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Silencio, huh?\n* É, ele se safa bastante, na verdade.']
                        : ["<32>{#p/alphys}* É apenas o Silencio."]
                    : ['<32>{#p/story}* SILENCIO - ATK 28 DEF 17\n* Descaradamente covarde.\n* Junto com o passeio.'],
        act_flirt: () => [
            '<32>{#p/human}* (Você flerta com Silencio.)',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Tudo bem então...'] : [])
        ],
        flirtTalk: ["<09>{#p/basic}{~}Você é adorável."],
        act_insult: ['<32>{#p/human}* (Você insulta Silêncio.)\n* (Sem efeito.)'],
        groupStatus1: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Silencio está ignorando os outros.'],
        groupStatus2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Cheira a pit stop.'],
        groupTalk1: ['<08>{#p/basic}Fora do caminho.'],
        groupTalk2: ['<08>{#p/basic}Você é muito lento.'],
        groupTalk3: ["<08>{#p/basic}Eu não estou participando."],
        groupTalk4: ['<08>{#p/basic}Rejeite o enxame.'],
        groupTalk5: ['<08>{#p/basic}Perigo é para os tolos.'],
        groupTalk6: ['<08>{#p/basic}Me deixa em paz.'],
        name: '* Silencio',
        soloStatus: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* Parece que ele nem queria fazer isso pra começar.']
                : ["<32>{#p/story}* Silencio não precisa de ninguém por perto."],
        soloTalk1: ["<08>{#p/basic}{~}Eu vou ficar bem."],
        soloTalk2: ['<08>{#p/basic}{~}Parceiros são superestimados.'],
        soloTalk3: ['<08>{#p/basic}{~}No fim, um tempo sozinho.'],
        soloTalk4: ['<08>{#p/basic}{~}Cha, cha.'],
        soloTalk5: ['<08>{#p/basic}{~}Eu danço em paz.'],
        perilTalk: ["<08>{#p/basic}{~}Eu tô fora daqui."]
    },
    b_opponent_mushketeer: {
        name: '* Mushketeer',
        epiphany: [
            
            ["<08>{#p/basic}{~}É apenas justo te poupar também!"],
            () =>
                world.meanie
                    ? 
                    ["<08>{#p/basic}{~}Estou acima do meu boné de cogumelo!\nRetirar-se!"]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? 
                        ["<08>{#p/basic}{~}Tudo é justo no amor e na guerra!"]
                        : SAVE.data.b.oops
                            ? 
                            ['<08>{#p/basic}{~}De agora em diante, nós lutamos como aliados!']
                            : 
                            ['<08>{#p/basic}{~}Abraçar realmente é a chave da paz!'],
            
            ['<08>{#p/basic}{~}Este ciclo de conflito deve acabar agora!'],
            
            ['<08>{#p/basic}{~}As manchas da guerra são suas!']
        ],
        old_gun_text: ['<32>{#p/human}* (Atira com a arma.)', '<33>{#p/basic}* Mushketeer encontrou seu rival!'],
        old_bomb_text: [
            '<32>{#p/human}* (Você implanta a bomba.)\n* (A névoa se espalha.)',
            '<32>{#p/basic}* Mushketeer se rende!'
        ],
        old_spray_text: [
            '<32>{#p/human}* (Você usa o spray.)\n* (Doce...)',
            '<32>{#p/basic}* Mushketeer foi prejudicado!'
        ],
        idleTalk1: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}O seu reino de terror acaba agora!']
                : ['<08>{#p/basic}{~}Junto-se a mim na linha de frente.'],
        idleTalk2: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}Preparar para a execução!']
                : ["<08>{#p/basic}{~}Tudo é justo no amor...\ne no CORE."],
        idleTalk3: () =>
            world.genocide
                ? ['<08>{#p/basic}{~}Ninguém tira a arma do Mushketter!']
                : ['<08>{#p/basic}{~}Sem tempo como o tempo da guerra..'],
        hurtStatus: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Quase morto.']
                : ['<32>{#p/story}* Mushketeer respira fundo e faz um último levante.'],
        genoStatus: ['<32>{#p/asriel2}* Mushketeer.'],
        status0: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Por que essa coisa tá no nosso caminho?']
                : !world.badder_lizard
                    ? ["<32>{#p/alphys}* Por favor não morra."]
                    : ['<32>{#p/story}* Mushketeer bloqueia o caminho!'],
        status1: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer se mantém firme.']),
        status2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer deseja ser um herói.'],
        status3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer está se preparando para um tiroteio.'],
        status4: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer pega sua arma.'],
        status5: () => (!world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Cheira a terra seca.']),
        travelStatus1: () =>
            !world.badder_lizard
                ? ['<32>{#p/alphys}* ...']
                : ["<32>{#p/story}* Mushketeer, o especialista em orar e deixar ir."],
        travelStatus2: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer está na ponte.'],
        travelStatus3: () =>
            !world.badder_lizard ? ['<32>{#p/alphys}* ...'] : ['<32>{#p/story}* Mushketeer lança os olhos ao redor.'],
        act_check: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Mushketeer, o portador de armas.\n* O primo mais velho sujo, de um cogumelo distante...']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Mushketeer.\n* Eu não faço ideia de quem seja esse.']
                        : ["<32>{#p/alphys}* É só o Mushketeer."]
                    : ['<32>{#p/história}* MUSHKETEER - ATQ 30 DEF 28\n* Produto de sua educação.\n* Carregador de armas.'],
        act_check2: ['<32>{#p/história}* MUSHKETEER - ATQ 30 DEF 28\n* Reconsiderando sua educação.\n* Atirador de armas.'],
        act_check3: ['<32>{#p/história}* MUSHKETEER - ATQ 30 DEF 28\n* Esquecendo sua educação.\n* Aquecedor de coração.'],
        act_check4: ['<32>{#p/story}* MUSHKETEER - ATQ 30 DEF 28\n* A guerra não para os cogumelos.'],
        act_flirt: () => [
            '<32>{#p/human}* (Você convida Mushketeer para um tiroteio privado.)',
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Nahhhh.'] : [])
        ],
        flirtTalk: ["<08>{#p/basic}{~}Ei!\nNão faça isso aqui."],
        flirtTalk2: ["<08>{#p/basic}{~}Bem..\nSe é isso que você quer.."],
        flirtStatus: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Mushketeer.']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ["<32>{#p/alphys}* Tá, isso não funcionou."]
                        : ['<32>{#p/alphys}* ...']
                    : ['<32>{#p/story}* Oh não, Mushketter está sério.'],
        flirtStatus2: () =>
            world.genocide
                ? ['<32>{#p/asriel2}* Mushketeer.']
                : !world.badder_lizard
                    ? calm_lizard()
                        ? ['<32>{#p/alphys}* Espera, isso funcionou?']
                        : ['<32>{#p/alphys}* ...']
                    : ['<32>{#p/story}* Ah sim, Mushketeer está sério.'],
        act_travel1: () => [
            '<32>{#p/human}* (Você se aproxima do Mushketter.)',
            "<32>{#p/basic}* ataques de Mushketter ficam mais intensos!",
            ...(world.genocide
                ? ['<32>{#p/asriel2}* ...?']
                : !world.badder_lizard && calm_lizard()
                    ? ['<32>{#p/alphys}* Cuidado...']
                    : [])
        ],
        act_travel2: () => [
            '<32>{#p/human}* (Você está super próximo de Mushketeer.)',
            "<32>{#p/basic}* Ataques de Mushketter ficam insanos!",
            ...(world.genocide
                ? ['<32>{#p/asriel2}* $(name)...?']
                : !world.badder_lizard && calm_lizard()
                    ? ['<32>{#p/alphys}* Oh meu senhor, cuidado...!']
                    : [])
        ],
        act_travel3: () => [
            '<32>{#p/human}* (Mas você já está perto o suficiente do Mushketter.)',
            ...(world.genocide
                ? ['<32>{#p/asriel2}* Eu estou começando a ficar preocupado.']
                : !world.badder_lizard && calm_lizard()
                    ? ['<32>{#p/alphys}* F-faça alguma outra coisa!!!']
                    : [])
        ],
        travelTalk1: ["<08>{#p/basic}{~}O que você pensa que está fazendo!"],
        travelTalk2: ["<08>{#p/basic}{~}O que você está fazendo!?"],
        act_disarm1: () => [
            "<32>{#p/human}* (Você tenta desarmar Mushketter, mas ele está muito longe.)",
            ...(!world.badder_lizard && calm_lizard() ? ['<32>{#p/alphys}* Você precisa se aproximar.'] : [])
        ],
        act_disarm2: () => [
            "<32>{#p/human}* (Você tenta desarmar Mushketter, mas ele está fora de alcance.)",
            ...(!world.badder_lizard && calm_lizard()
                ? ['<32>{#p/alphys}* Eu acho...\n* Que se você se aproximar...']
                : [])
        ],
        act_disarm3: () => ['<32>{#p/human}* (Você desarma Mushketter.)'],
        act_disarm3x: ['<32>{#p/human}* (Mas Mushketter já foi desarmado.)'],
        act_disarm4: pager.create(
            0,
            [
                '<32>{#p/human}* (Você tenta desarmar Mushketter, mas ele te chuta de volta para onde você começou.)',
                "<32>{#p/asriel2}* Estamos perdendo tempo."
            ],
            [
                '<32>{#p/human}* (Você tenta desarmar Mushketter, mas ele te chuta de volta para onde você começou.)',
                '<32>{#p/asriel2}* ...'
            ]
        ),
        disarmTalk: [
            '<08>{#p/basic}{~}Eu acho que isso significa que a guerra acabou...?',
            '<08>{#p/basic}{~}\x00*suspiro*',
            "<08>{#p/basic}{~}Talvez seja para o melhor."
        ],
        disarmStatus: ['<32>{#p/story}* Mushketeer espera pela confirmação do fim da batalha.'],
        postDisarmTalk1: ['<08>{#p/basic}{~}Pois bem..'],
        postDisarmTalk2: ['<08>{#p/basic}{~}É o que é..']
    },

    
    b_opponent_pyrope: {
        name: '* Hotwire',
        epiphany: [
            ['<08>{#p/basic}{~}Não precisa se preocupar, parceiro', "<08>{#p/basic}{~}Eu vou sair fora do seu caminho agora."],
            () =>
                world.meanie
                    ? [
                        "<08>{#p/basic}{~}Sua atitude me petrificou",
                        '<08>{#p/basic}{~}Escapar é tudo menos justificado!'
                    ]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Não há necessidade de empurrar e jogar', "<08>{#p/basic}{~}Nós já estamos nos apaixonando neste lugar!"]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}Eu prometo ser seu amigo', '<08>{#p/basic}{~}Independente do que tiver acontecido!']
                            : [
                                '<08>{#p/basic}{~}Essa sensação é surpreendente',
                                '<08>{#p/basic}{~}Eu posso te sentir aproximadamente!'
                            ],
            ["<08>{#p/basic}{~}É como eu disse para minha mãe", '<08>{#p/basic}{~}Eu sabia que esse dia chegaria.'],
            ['<08>{#p/basic}{~}Apenas um acidente', "<08>{#p/basic}{~}Não lhe ofereceria um cheque para ser diferente!"]
        ],
        genoStatus: ['<32>{#p/asriel2}* Hotwire.'],
        genoSpareStatus: ["<32>{#p/asriel2}* Está vulnerável."],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Hotwire, a máquina de rimas.\n* Tal esperteza desperdiçada em um passa tempo inútil.']
                : ['<32>{#p/história}* HOTWIRE - ATQ 29 DEF 14\n* Para este monstro tortuoso, nenhum esquema é muito complexo.'],
        act_check2: [
            '<32>{#p/história}* HOTWIRE - ATQ 29 DEF 14\n* A faísca está desaparecendo deste monstro incendiado.'
        ],
        act_check3: ["<32>{#p/história}* HOTWIRE - ATQ 29 DEF 14\n* As rimas dessa tocha podem pegar fogo"],
        act_check4: ['<32>{#p/história}* HOTWIRE - ATQ 29 DEF 14\n* Reacendendo seu amor pelo rap, uma linha de cada vez.'],
        act_flirt: ['<32>{#p/human}* (Você flerta com Hotwire.)', '<32>{#p/basic}* Hotwire flerta de volta!'],
        act_diss: ['<32>{#p/human}* (Você deixou sua melhor faixa solta no Hotwire.)'],
        dissTalk1: ['<08>{#p/basic}{~}Se você quer me chamar de babaca', '<08>{#p/basic}{~}É melhor saber rimar na batalha!'],
        dissTalk2: [
            '<08>{#p/basic}{~}Suas rimas são um lixo',
            '<08>{#p/basic}{~}Então você deveria ir lavar...',
            '<08>{#p/basic}{~}Antes que eu te coloque no seu lugar!'
        ],
        dissTalk3: [
            "<08>{#p/basic}{~}Aposto que você pensa tão fera",
            "<08>{#p/basic}{~}Mas você não aguenta o ritmo da pantera",
            "<08>{#p/basic}{~}Eu estou na caminho original",
            '<08>{#p/basic}{~}Eu faço seus insultos parecerem nada!'
        ],
        sparkText1: ["<32>{#p/human}* (Você acende os cabos de Hotwire.)", "<32>{#p/basic}* Hotwire cresce sua confiança."],
        sparkText2: ["<32>{#p/human}* (Você acende os cabos de Hotwire.)", '<32>{#p/basic}* Hotwire está no auge!'],
        sparkText3: ["<32>{#p/human}* (Você acende os cabos de Hotwire.)", '<32>{#p/basic}* Hotwire já está super poderoso.'],
        rapText1: ['<32>{#p/human}* (Você faz rap com o Hotwire.)', '<32>{#p/basic}* Hotwire é indiferente em relação a você.'],
        rapText2: ['<32>{#p/human}* (Você faz rap com o Hotwire.)', '<32>{#p/basic}* Hotwire está desapontado com você.'],
        rapText3: ['<32>{#p/human}* (Você faz rap com o Hotwire.)', '<32>{#p/basic}* Hotwire tem nojo de você.'],
        idleTalk1: ['<08>{#p/basic}{~}Sem pena no fogo', '<08>{#p/basic}{~}Eu não posso parar meu desejo caloroso!'],
        idleTalk2: ["<08>{#p/basic}{~}O nome é Hotwire", "<08>{#p/basic}{~}Eu super hot fire!"],
        idleTalk3: ['<08>{#p/basic}{~}Até mesmo um laço', "<08>{#p/basic}{~}Não me para de ser um amasso!"],
        idleTalk4: ["<08>{#p/basic}{~}Estou em chamas e imperturbável", "<08>{#p/basic}{~}Isso me torna imparável!"],
        idleTalk5: ["<08>{#p/basic}{~}Eu estou na parte quente", '<08>{#p/basic}{~}Então sai da minha frente!'],
        flirtTalk: ['<08>{#p/basic}{~}Meu flerte é incomparável', "<08>{#p/basic}{~}Seu coração é flecha do vigário!"],
        sparkTalk1A: [
            "<08>{#p/basic}{~}Eu vou te servir uma quente agora",
            "<08>{#p/basic}{~}Mesmo se você não merecer",
            '<08>{#p/basic}{~}Dispare como uma espingarda!'
        ],
        sparkTalk2A: [
            "<08>{#p/basic}{~}Esta marca está prestes a ficar machucada",
            '<08>{#p/basic}{~}Quatro palavrinhas para descrever a dor',
            '<08>{#p/basic}{~}Confuso, perdido, abatido e abusado!'
        ],
        sparkTalk3A: [
            '<08>{#p/basic}{~}Perigo, perigo, entra um longo prazo',
            "<08>{#p/basic}{~}Um atirador tão maluco, é uma mudança de vida",
            '<08>{#p/basic}{~}Só precisa de uma bala na caçamba!'
        ],
        sparkFlirtTalkA: [
            '<08>{#p/basic}{~}Vejo que você gosta de amor',
            '<08>{#p/basic}{~}Carinhoso, pronto, quente e diferente',
            "<08>{#p/basic}{~}Esta faixa é um verdadeiro ataque cardíaco!"
        ],
        sparkTalk1B: [
            "<08>{#p/basic}{~}E o seu flow te coloca no ritmo",
            '<08>{#p/basic}{~}Sorriso cativante está radiante',
            "<08>{#p/basic}{~}Eu vou te chicotear tanto, ooh",
            "<08>{#p/basic}{~}Você deseja estar sonhando acordado"
        ],
        sparkTalk2B: [
            '<08>{#p/basic}{~}Pois está perdendo pro cara esquentado',
            "<09>{#p/basic}{~}Sou bipartidário, nomeado",
            "<08>{#p/basic}{~}Você é um cidadão dominado",
            '<08>{#p/basic}{~}Até mesmo sua ALMA é corrompida!'
        ],
        sparkTalk3B: [
            "<08>{#p/basic}{~}Eu sou um assassino genuíno",
            "<08>{#p/basic}{~}Você é um distribuidor de resíduos",
            '<08>{#p/basic}{~}Suas barras são enchimentos coxos',
            '<08>{#p/basic}{~}Considerando que os meus são thrillers diretos!'
        ],
        sparkFlirtTalkB: [
            "<08>{#p/basic}{~}Você está flertando com o fogo, amigo",
            "<08>{#p/basic}{~}Sem que você vai conquistar este garanhão",
            '<08>{#p/basic}{~}Um erro é tudo que se precisa',
            '<08>{#p/basic}{~}Pra eu te encher de rima!'
        ],
        status1: ['<32>{#p/story}* Hotwire está procurando por um pequeno impulso extra.'],
        status2: ['<32>{#p/story}* Hotwire está rimando na tempestade.'],
        status3: ['<32>{#p/story}* Hotwire é protegido por seu sorriso cativante.'],
        status4: ['<32>{#p/story}* Hotwire alcança o turbo carregador.'],
        status5: ['<32>{#p/story}* Cheira a lirismo.'],
        sparkStatus1A: ['<32>{#p/story}* Hotwire está chocado com seu próprio brilhantismo.'],
        sparkStatus2A: ['<32>{#p/story}* Hotwire começa sua sequência de ignição... manualmente.'],
        sparkStatus3A: ['<32>{#p/story}* Hotwire continua indo, gostando você ou não.'],
        sparkStatus1B: ['<32>{#p/story}* Hotwire está se sentindo elétrico.'],
        sparkStatus2B: ['<32>{#p/story}* Hotwire chegou no seu verdadeiro nível.'],
        sparkStatus3B: ['<32>{#p/story}* Hotwire está turbo carregador.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Quase morto.'] : ['<32>{#p/story}* Hotwire está ficando fora de controle.']
    },

    b_opponent_perigee: {
        name: '* Perigee',
        epiphany: [
            ['<08>{#p/basic}{~}Eu deveria estar em outro lugar.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Não é seguro para mim aqui.']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Isto é amor?']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}Eu estou olhando pela nossa amizade.']
                            : ['<08>{#p/basic}{~}Obrigado...\nMuito obrigado...'],
            ['<08>{#p/basic}{~}Eu entendo o motivo de ter que morrer.', '<08>{#p/basic}{~}Por favor..\nViva em meu nome..'],
            ['<08>{#p/basic}{~}Pegue o tanto que precisar.']
        ],
        genoStatus: ['<32>{#p/asriel2}* Perigee.'],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Perigee, o pássaro letárgico.\n* Passa muito tempo em sua própria cabeça despreocupada.']
                : ['<32>{#p/story}* PERIGEE - ATQ 25 DEF 0\n* Este pássaro da paz acredita que suas asas curam todos os pecados.'],
        act_check2: [
            '<33>{#p/story}* PERIGEE - ATQ 25 DEF 0\n* Este pássaro da paz está tentando usar suas asas para cuidar-se.'
        ],
        act_check3: ['<32>{#p/história}* PERIGEU - ATQ 25 DEF 0\n* Este pássaro da paz também é um patrono das artes.'],
        act_check4: [
            '<32>{#p/história}* PERIGEU - ATQ 25 DEF 0\n* Este pássaro da paz aprecia suas canções de amor platonicamente.'
        ],
        act_flirt: ['<32>{#p/human}* (Você flerta com o Perigee.)'],
        act_yell: ['<32>{#p/human}* (Você grita com o Perigee.)'],
        idleTalk1: ['<08>{#p/basic}{~}Chirp, chirp.'],
        idleTalk2: ['<08>{#p/basic}{~}\x00*apito calmante*'],
        idleTalk3: ['<08>{#p/basic}{~}A vida é boa.'],
        idleTalk4: ['<08>{#p/basic}{~}\x00*sons de flap-ping*'],
        idleTalk5: ['<08>{#p/basic}{~}Paz e tranquilidade.'],
        flirtTalk: ["<08>{#p/basic}{~}Hm?\nEu não entendo..."],
        yellTalk1: ["<08>{#p/basic}{~} Está tudo bem, posso te fazer sentir melhor."],
        yellTalk2: ["<08>{#p/basic}{~}Aqui, vou te ajudar a se acalmar."],
        yellTalk3: ["<08>{#p/basic}{~}Não fique com raiva.", '<08>{#p/basic}{~}Você sempre pode assobiar outra música.'],
        flirtTalkX: [
            '<08>{#p/basic}{~}Ah, essa bela remarca foi seu som?',
            '<08>{#p/basic}{~}Eu aceito e aceito seu gesto.'
        ],
        whistleTalkX: ['<08>{#p/basic}{~}Eu aceito seu gesto.'],
        whistleTalk: ['<08>{#p/basic}{~}\x00*apito de intenção*'],
        whistleStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Perigee.'] : ['<32>{#p/story}* Perigee espera seu gesto.'],
        act_bow1: ['<32>{#p/human}* (Mas não havia nada para se curvar ainda.)'],
        act_bow2: ['<32>{#p/human}* (Você se curva.) \n* (Perigee se curva de volta.)\n* (Um entendimento de ambas partes.)'],
        act_whistle: [
            '<32>{#p/human}* (Você cantarola uma tom tranquilo.)\n* (Perigee cantarola de volta e o som vai e volta...)'
        ],
        status1: ['<32>{#p/story}* Perigee voa próximo.'],
        status2: ['<32>{#p/story}* Perigee está vivendo livre da moda.'],
        status3: ['<32>{#p/story}* Perigee está tão feliz quando poderia.'],
        status4: ['<32>{#p/story}* O Perigee mantém um toque leve como uma pena.'],
        status5: ['<32>{#p/story}* Cheira a pão amanhecido.'],
        status6: () =>
            world.goatbro ? ["<32>{#p/asriel2}* Está vulnerável."] : ['<32>{#p/story}* Perigee está satisfeito.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Quase morto.'] : ["<32>{#p/story}* O tempo de Perigee está próximo."]
    },

    b_opponent_tsundere: {
        name: '* Tsunderidex',
        epiphany: [
            ["<08>{#p/basic}{~}É, e-eu nem te queria por perto mesmo!"],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}É!\nS-sai daqui!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Hmm..\nB-bem..', '<08>{#p/basic}{~}.. bem, eu te amo também!']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}A-apenas amigos, huh?', '<08>Claro, eu acho...']
                            : ['<08>{#p/basic}{~}Eeeh?\nO que você está..', '<08>{#p/basic}{~}.. oh..\nObrigado, eheh..'],
            ["<08>{#p/basic}{~}Se é isso que você deseja..", "<08>{#p/basic}{~}E-eu vou fazer isso!"],
            ["<08>{#p/basic}{~}N-não pense que isso significa que eu gosto de você!"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex, um monstro ao qual eu não tenho palavras.']
                : ['<32>{#p/story}* TSUNDERIDEX - ATQ 25 DEF 26\n* Parece grosso, mas gosta de você secretamente?'],
        act_check2: [
            '<32>{#p/story}* TSUNDERIDEX - ATQ 25 DEF 26\n* Pego em uma batalha de sustentação própria tsunderes.'
        ],
        act_check3: ["<32>{#p/story}* TSUNDERIDEX - ATQ 25 DEF 26\n* A máquina hesitante de amor agora é sua para controlar."],
        act_check4: ['<32>{#p/história}* TSUNDERIDEX - ATQ 25 DEF 26\n* Parece... cioso.'],
        act_check5: ['<32>{#p/história}* TSUNDERIDEX - ATK 25 DEF 26\n* Pronto para estourar.'],
        act_ignore: ["<32>{#p/human}* (Você intencionalmente ignora a presença de Tsunderidex.)"],
        flirtText1: ['<32>{#p/human}* (Você diz a Tsunderidex que ele tem um escudo impressionante.)'],
        flirtText2: ['<32>{#p/human}* (Você diz a Tsunderidex que ele tem asas incríveis.)'],
        flirtText3: ['<32>{#p/human}* (Você diz a Tsunderidex que ele tem um grande poder de vôo.)'],
        flirtText4: ['<32>{#p/human}* (Você diz a Tsunderidex que gostou das opiniões dele sobre novelas.)'],
        flirtText5: ['<32>{#p/human}* (Você diz a Tsunderidex que ele tem uma engenharia fofa.)'],
        flirtText6: ["<32>{#p/human}* (Você diz a Tsunderidex que gostaria de ver seu super capacitador.)"],
        flirtText7: ["<32>{#p/human}* (Você diz a Tsunderidex que gostaria de limpá-lo até brilhar.)"],
        flirtText8: ['<32>{#p/human}* (Você diz a Tsunderidex que seu nariz deve estar acariciando o seu.)'],
        flirtText9: ['<32>{#p/human}* (Você diz ao Tsunderidex que seu teto é inigualável.)'],
        flirtText10: ['<32>{#p/human}* (Você diz Tsunderidex que suas turbinas são de tirar o fôlego.)'],
        flirtText11: ['<32>{#p/human}* (Você diz a Tsunderidex que ele tem um brilho cativante.)'],
        flirtText12: ["<32>{#p/human}* (Você diz a Tsunderidex que gostaria de ir a onde nenhum humano jamais foi.)"],
        stealText: ['<32>{#p/human}* (Você se aproxima de Tsunderidex para sugar a energia da bateria.)'],
        upgradeText1: ["<32>{#p/human}* (Você ativa o módulo de vôo de turbilhão nos motores de Tsunderidex.)"],
        upgradeText2: ["<32>{#p/human}* (Você ativa o mecanismo de disparo transfásico nos canhões de Tsunderidex.)"],
        upgradeText3: ["<32>{#p/human}* (Você ativa a modulação auto-adaptativa nos escudos de Tsunderidex.)"],
        upgradeText4: [
            "<33>{#p/human}* (Você não pode ativar mais.)\n* (Todas as partes do corpo de Tsunderidex estão totalmente ativadas.)"
        ],
        idleTalk1: ["<08>{#p/basic}{~}Não é como se eu gostasse de VOCÊ."],
        idleTalk2: ['<08>{#p/basic}{~}Id.. idiota!'],
        idleTalk3: ["<08>{#p/basic}{~}Hmph!\nNão fica no meu caminho!"],
        idleTalk4: ['<08>{#p/basic}{~}(Eep..!)\nHumano..'],
        idleTalk5: ['<08>{#p/basic}{~}..\nH-humano\n..\n..?'],
        flirtTalk1: ['<08>{#p/basic}{~}Huh!?\nS-seu tarado!'],
        flirtTalk2: ['<08>{#p/basic}{~}Eu... eu não acho!\nHmph!'],
        flirtTalk3: ['<08>{#p/basic}{~}Isso é verdade..?'],
        flirtTalk4: ['<08>{#p/basic}{~}Eu..\nMu-muito obrigado..'],
        flirtTalk5: ['<08>{#p/basic}{~}O-o que?\nAgora???', '<08>{#p/basic}{~}Isso é demais..'],
        jellyTalk1: ["<08>{#p/basic}{~}E-ei!\nIsso não é justo!"],
        jellyTalk2: ['<08>{#p/basic}{~}Ugh, vocês dois estão sendo estranhos.'],
        jellyTalk3: ['<08>{#p/basic}{~}F-fique longe dele!'],
        upgradeTalk1: ['<08>{#p/basic}{~}Oq... o que você está fazendo?'],
        upgradeTalk2: ['<08>{#p/basic}{~}Um.\nHumano.'],
        upgradeTalk3: ['<08>{#p/basic}{~}Oh..\n..\nW-wow..'],
        stealTalk1: ["<08>{#p/basic}{~}N-não faça isso!\nPor favor."],
        stealTalk2: ['<08>{#p/basic}{~}..\n..\n(Por que..)'],
        stealTalk3: ['<08>{#p/basic}{~}Pare de roubar meu trovão!'],
        ignoreTalk1: ['<08>{#p/basic}{~}Hmph!\nMe ignora o tanto que quiser!'],
        ignoreTalk2: ["<08>{#p/basic}{~}É!\nNão é como se eu quisesse você aqui!"],
        upgradeStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Você realmente vai fazer isso agora?']
                : ['<32>{#p/story}* Tsunderidex está checando suas novas partes atividades.'],
        upgradeStatus2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Isso é uma perda de tempo...']
                : ['<32>{#p/story}* Tsunderidex está obcecado com suas novas partes atividades.'],
        upgradeStatus3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* ...']
                : ['<32>{#p/story}* Tsunderidex está preocupado com suas novas partes ativadas.'],
        status1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex.']
                : ['<32>{#p/story}* Tsunderidex olha e depois torce o nariz.'],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex.']
                : ['<32>{#p/story}* Tsunderidex balança o nariz com desdém para você.'],
        status3: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex.']
                : ['<32>{#p/story}* Tsunderidex \"acidentalmente\" te acerta com um dos seus ventos.'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Tsunderidex.']
                : ['<32>{#p/story}* Tsunderidex define seus canhões para \"atordoar.\"'],
        status5: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Tsunderidex.'] : ['<32>{#p/story}* Cheira a cacto espacial.'],
        status6: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Está vulnerável."]
                : ['<32>{#p/story}* Tsunderidex está olhando longe.'],
        hurtStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Quase morto.']
                : ["<32>{#p/story}* Os motores de Tsunderidex estão deixando cair plasma."]
    },

    b_opponent_rg01: {
        name: () => (world.bad_lizard > 1 ? '* RG 01' : '* RG 03'),
        epiphaNOPE: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}Tipo, o que você tá fazendo?']
                : ["<11>{#p/undyne}{#p/basic}{~}Não é isso, chefe."],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* RG 01...\n* Não tem muito o que dizer sobre esses caras."]
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* RG 01 - ATQ 30 DEF 20\n* Um amador confidente que deseja acabar com você.']
                    : ['<32>{#p/história}* RG 03 - ATQ 30 DEF 20\n* Atitude conspícua de cowgirl.\n* Cética.'],
        act_check2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* RG 01 - ATK 30 DEF 20\n* Na intenção de acabar com você, mesmo que ele também morra.']
                : ['<32>{#p/história}* RG 03 - ATK 30 DEF 20\n* Planejando afiar seu falchion em breve.'],
        act_check3: ['<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Reunidas no fim...'],
        act_check4: ['<32>{#p/story}* RG 03 - ATQ 30 DEF 20\n* Quebrada.'],
        act_check5: ['<33>{#p/história}* RG 03 - ATK 30 DEF 20\n* Quer muito dizer alguma coisa...'],
        act_check6: ['<32>{#p/história}* RG 03 - ATQ 30 DEF 20\n* Ansiosa para compensar sua falta de convicção.'],
        randTalk1: () => ['<11>{#p/basic}{~}Ataque em conjunto.'],
        randTalk2: () =>
            world.bad_lizard > 1 ? ["<11>{#p/basic}{~}Nós vamos te parar..."] : ["<11>{#p/basic}{~}Estamos só na amizade..."],
        randTalk3: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}You're no match for us."]
                : ["<11>{#p/basic}{~}You best not be shippin' us..."],
        randTalk4: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Careful, bro.'] : ['<11>{#p/basic}{~}Careful, girl.'],
        randStatus1: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 01 and 02 attack in sync.']
                : ["<33>{#p/story}* 03 is living in the friendzone.\n* 04 doesn't question it."],
        randStatus2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 01 and 02 prepare their next assault.']
                : ['<32>{#p/story}* 03 casts her doubts aside for just a moment.\n* 04 breathes a sigh of relief.'],
        randStatus3: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 01 and 02 slam their bodies together brotastically.']
                : ["<32>{#p/story}* 03 ponders about 04's history.\n* 04 shrugs."],
        randStatus4: () =>
            world.bad_lizard > 1
                ? ["<32>{#p/story}* Smells like men's body spray."]
                : ['<32>{#p/story}* Smells like perfume.'],
        randStatus5: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* 01 and 02 refer to themselves as \"brotally swagical.\"']
                : ['<32>{#p/story}* 03 puts on a brave face.\n* 04 replies non-verbally with her own bravery.'],
        randTalkLone1: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Suffer.']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}I'll never know..."],
        randTalkLone2: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}No mercy.']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}It's too late..."],
        randTalkLone3: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Unforgiv- able.']
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}I missed my chance...'],
        randTalkLone4: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Die.']
                : ["<11>{#p/basic}{~}{@random=1.1/1.1}It can't be..."],
        randStatusLone: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Só mais um.']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 01 seems even more focused than before.']
                    : ['<32>{#p/story}* 03 is in disarray.'],

        act_flirt: ['<32>{#p/human}* (You flirt with 03.)'],
        flirtTalk1: ['<11>{#p/basic}{~}Flirting is strictly forbidden.'],
        flirtTalk2: ["<11>{#p/basic}{~}You think that's gonna work on us?"],
        flirtTalkNervy1: ['<11>{#p/basic}{~}Flirting is... ack...'],
        flirtTalkNervy2: ["<11>{#p/basic}{~}That's not really... ack..."],
        flirtTalkLone: ['<11>{#p/basic}{~}...'],
        flirtStatus: ['<32>{#p/story}* 03 struggles to contain her feelings.\n* 04 seems confused...'],
        flirtStatusNervy: ["<32>{#p/story}* 03's feelings are bursting at the seams.\n* 04 seems concerned..."],
        act_flirt_happy: [
            '<32>{#p/human}* (You flirt with 03.)\n* (She accepts the compliment, but remains focused on 04.)'
        ],
        act_flirt_nada: ["<32>{#p/human}* (You flirt with 01.)\n* (He doesn't seem to react in any significant way.)"],

        act_tug: ["<32>{#p/human}* (You try to pull on 03's glove, but she slaps your hand away.)"],
        tugTalk1: ['<11>{#p/basic}{~}Paws off, sister.'],
        tugTalk2: ['<11>{#p/basic}{~}No touchy.'],
        tugTalk3: ["<11>{#p/basic}{~}That's off- limits to you."],
        tugTalk4: ['<11>{#p/basic}{~}Nope.'],
        tugStatus: ['<32>{#p/story}* It would seem some boundaries are better left uncrossed.'],
        act_tug_lone: ["<32>{#p/human}* (You try to pull on 03's glove, but she raises it out of your reach.)"],
        tugTalkLone: ['<11>{#p/basic}{~}...'],
        tugStatusLone: ['<32>{#p/story}* 03 towers above you, masking her true expression.'],
        act_tug_happy: [
            "<32>{#p/human}* (You hold 03's paw.)",
            '<32>{#p/basic}* 03 mistakenly believes 04 is holding her paw...'
        ],

        tugShock: ['<11>{#p/basic}{~}04...!', '<11>{#p/basic}{~}...', '<11>{#p/basic}{~}That bracelet...'],
        nervyTalk1: ['<11>{#p/basic}{~}04, I...'],
        nervyTalk2: ['<11>{#p/basic}{~}04, we...'],
        nervyTalk3: ['<11>{#p/basic}{~}04, you...'],
        nervyTalk4: ["<11>{#p/basic}{~}04, it's..."],
        nervyStatus: ['<32>{#p/story}* The solar winds begin to shift towards your favor.'],

        act_whisper: ['<32>{#p/human}* (You whisper to 03 to open up about her feelings.)'],
        act_whisper_alt: ['<32>{#p/human}* (You whisper to 03.)\n* (Nothing happens.)'],

        confess1: ['<11>{#p/basic}{~}04...'],
        confess2: ['<11>{#p/basic}{~}...', '<11>{#p/basic}{~}... yeah, 03?'],
        confess3: ['<11>{#p/basic}{~}Look at me, 04...'],
        confess4: ["<11>{#p/basic}{~}But that's..."],
        confess5: ['<11>{#p/basic}{~}The bracelet of unity...', '<11>{#p/basic}{~}Remember?'],
        confess6: [
            "<11>{#p/basic}{~}It's you...",
            "<11>{#p/basic}{~}I thought I'd lost you, all those years ago...",
            "<11>{#p/basic}{~}I thought I'd never see you again.",
            "<11>{#p/basic}{~}But now...\nAfter graduating from Undyne's training..."
        ],
        confess7: [
            "<11>{#p/basic}{~}We're together again, 04.\nJust like before.",
            '<11>{#p/basic}{~}And, no matter what names we go by...',
            '<11>{#p/basic}{~}I will always love you.'
        ],
        confess8: ['<11>{#p/basic}{~}03, I...', '<11>{#p/basic}{~}I love you too!'],
        confess9: ['<11>{#p/basic}{~}... do you wanna get some ice cream?'],
        confess10: ['<11>{#p/basic}{~}Salmon- flavored?'],
        confess11: ['<11>{#p/basic}{~}You know it!'],

        happyTalk1: ['<11>{#p/basic}{~}I missed you...'],
        happyTalk2: ["<11>{#p/basic}{~}I'm glad you're here..."],
        happyTalk3: ['<11>{#p/basic}{~}To think it was you, all this time...'],
        happyTalk4: ['<11>{#p/basic}{~}To think I forgot about those beautiful eyes...'],
        happyStatus: ['<32>{#p/story}* 03 and 04 are looking happily at each other.'],

        horrorTalk1: [
            '<11>{#p/basic}{~}{@random=1.1/1.1}N... no...',
            '<11>{#p/basic}{~}{@random=1.1/1.1}We were gonna be... so happy together...'
        ],
        horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}I can't go on..."],
        horrorTalk3: ["<11>{#p/basic}{~}{@random=1.1/1.1}I don't want to live like this anymore..."],
        horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],
        horrorStatus: ['<32>{#p/story}* ...'],

        dangerStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Quase morto.']
                : world.bad_lizard > 1
                    ? ["<32>{#p/story}* 01's gaze pans downwards to the floor."]
                    : ["<32>{#p/story}* 03's breathing intensifies."]
    },

    b_opponent_rg02: {
        name: () => (world.bad_lizard > 1 ? '* RG 02' : '* RG 04'),
        epiphaNOPE: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}I don't get this at all..."]
                : ["<11>{#p/basic}{~}That won't work on me."],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* RG 02...\n* There's really not much to say about these guys."]
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* RG 02 - ATK 30 DEF 20\n* A confident lover who seems intent on stopping you.']
                    : ["<33>{#p/story}* RG 04 - ATK 30 DEF 20\n* Believes in friendship, but isn't against something more..."],
        act_check2: () =>
            world.bad_lizard > 1
                ? ['<32>{#p/story}* RG 02 - ATK 30 DEF 20\n* Intent on stopping you, no matter what it takes.']
                : ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Planning on shopping for new armor soon.'],
        act_check3: ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Re-united at last...'],
        act_check4: ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Broken.'],
        act_check5: ['<33>{#p/story}* RG 04 - ATK 30 DEF 20\n* Feeling somewhat exposed...'],
        act_check6: ['<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Eager to see you dead.'],
        randTalk1: () => ['<11>{#p/basic}{~}Team attack!'],
        randTalk2: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Once and for all!'] : ['<11>{#p/basic}{~}Absolutely!'],
        randTalk3: () =>
            world.bad_lizard > 1 ? ["<11>{#p/basic}{~}You don't stand a chance!"] : ['<11>{#p/basic}{~}No romance here!'],
        randTalk4: () =>
            world.bad_lizard > 1 ? ['<11>{#p/basic}{~}Totally, bro!'] : ['<11>{#p/basic}{~}Oh you know it, girl!'],
        randTalkLone1: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}It's over for you!!"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}How could you do this to me...!?'],
        randTalkLone2: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}Don't even try!!"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}She was my only friend...!'],
        randTalkLone3: () =>
            world.bad_lizard > 1
                ? ['<11>{#p/basic}{~}{@random=1.1/1.1}Prepare to be wiped out!!']
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}She was everything to me...!'],
        randTalkLone4: () =>
            world.bad_lizard > 1
                ? ["<11>{#p/basic}{~}{@random=1.1/1.1}I'm gonna make you pay!!"]
                : ['<11>{#p/basic}{~}{@random=1.1/1.1}What kind of creature are you...!?'],
        randStatusLone: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Só mais um.']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 02 has lost his temper.']
                    : ['<32>{#p/story}* 04 is in shambles.'],

        act_flirt: ['<32>{#p/human}* (You flirt with 04.)'],
        flirtTalk1: ["<11>{#p/basic}{~}It's in the rules!"],
        flirtTalk2: ["<11>{#p/basic}{~}It won't!"],
        flirtTalkNervy1: ["<11>{#p/basic}{~}It's against the rules!"],
        flirtTalkNervy2: ["<11>{#p/basic}{~}It's not our thing!"],
        flirtTalkLone: ['<11>{#p/basic}{~}...'],
        act_flirt_happy: [
            "<32>{#p/human}* (You flirt with 04.)\n* (She's flattered, but her eyes remain locked with 03.)"
        ],
        act_flirt_nada: ["<32>{#p/human}* (You flirt with 02.)\n* (He doesn't seem to react in any significant way.)"],

        act_tug: ["<32>{#p/human}* (You pull on 04's glove.)", "<32>{#p/basic}* 04's glove seems loose..."],
        tugTalk1: ['<11>{#p/basic}{~}W-what are you doing?'],
        tugTalk2: ["<11>{#p/basic}{~}Don't tell me you're going to..."],
        tugTalk3: ['<11>{#p/basic}{~}I...\nThis is...'],
        tugTalk4: ['<11>{#p/basic}{~}...'],
        tugStatus: ["<32>{#p/story}* 04's glove is slipping."],
        act_tug_lone: ["<32>{#p/human}* (You pull on 04's glove.)", "<32>* 04's glove comes right off!"],
        tugTalkLone: ['<11>{#p/basic}{~}...'],
        tugStatusLone: ['<32>{#p/story}* 04 shows no resistance.'],
        act_tug_hold: ["<32>{#p/human}* (You hold 04's claw.)"],
        holdTalk: ['<11>{#p/basic}{~}Uh...'],
        holdStatus: ['<32>{#p/story}* 04 is not really sure what to make of this.'],
        act_tug_hold_lone: ["<32>{#p/human}* (You hold 04's claw.)\n* (Nothing happens.)"],
        holdTalkLone: ['<11>{#p/basic}{~}...'],
        holdStatusLone: ['<32>{#p/story}* 04 just lets it happen.'],
        act_tug_happy: [
            "<32>{#p/human}* (You hold 04's claw.)",
            '<32>{#p/basic}* 04 mistakenly believes 03 is holding her claw...'
        ],
        tugSuccessStatus: ['<32>{#p/story}* The veil has been lifted.'],

        tugShock: ["<11>{#p/basic}{~}My glove...\nIt's coming off...!"],
        nervyTalk1: ['<11>{#p/basic}{~}03...?'],
        nervyTalk2: ['<11>{#p/basic}{~}Why are you looking at me that way?'],
        nervyTalk3: ["<11>{#p/basic}{~}What's with that face, 03?"],
        nervyTalk4: ['<11>{#p/basic}{~}Are you okay?'],

        act_whisper: ['<32>{#p/human}* (You whisper to 04, but she just seems confused.)'],
        act_whisper_alt: ['<32>{#p/human}* (You whisper to 04.)\n* (Nothing happens.)'],

        happyTalk1: ['<11>{#p/basic}{~}I missed you too!'],
        happyTalk2: ["<11>{#p/basic}{~}I'm glad YOU'RE here!"],
        happyTalk3: ['<11>{#p/basic}{~}Haha, yeah...'],
        happyTalk4: ['<11>{#p/basic}{~}Think nothing of it, sweetheart!'],

        horrorTalk1: [
            '<11>{#p/basic}{~}{@random=1.1/1.1}N... no...',
            '<11>{#p/basic}{~}{@random=1.1/1.1}We were gonna do... so much together...'
        ],
        horrorTalk2: ["<11>{#p/basic}{~}{@random=1.1/1.1}I can't accept it..."],
        horrorTalk3: ['<11>{#p/basic}{~}{@random=1.1/1.1}Just... kill me...'],
        horrorTalk4: ['<11>{#p/basic}{~}{@random=1.1/1.1}...'],

        dangerStatus: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Quase morto.']
                : world.bad_lizard > 1
                    ? ['<32>{#p/story}* 02 holds his head high.']
                    : ["<32>{#p/story}* 04's breathing intensifies."]
    },

    b_use: {
        old_spray: () =>
            battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
                ? []
                : ['<32>{#p/human}* (You took out the Sugar Spray.)', '<32>{#p/human}* (Nothing happens.)'],
        old_gun: () =>
            battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
                ? []
                : ['<32>{#p/human}* (You took out the Stun Gun.)', '<32>{#p/human}* (Nothing happens.)'],
        old_bomb: () =>
            battler.volatile[battler.targetOverride!].opponent.metadata.reactOld
                ? []
                : ['<32>{#p/human}* (You took out the Sleep Bomb.)', '<32>{#p/human}* (Nothing happens.)']
    },

    c_name_aerialis: {
        alphys: "Alphys's Phone",
        puzzle: 'Puzzle Help',
        dimboxA: 'Dimensional Box A',
        dimboxB: 'Dimensional Box B',
        pms: () => (SAVE.data.n.plot_pmcheck < pms().length ? '§fill=#ff0§OuterNet (NEW)' : 'OuterNet')
    },

    c_call_aerialis: {
        puzzle2a: () =>
            [
                [
                    '<25>{#p/alphys}{#g/alphysCutscene1}* Oh, h-hey!',
                    '<25>{#g/alphysCutscene2}* So... this puzzle is actually kinda simple.',
                    '<25>{#g/alphysSide}* Each time you pass by a terminal, it alters your phase.',
                    "<25>{#g/alphysSmileSweat}* Or, in layman's terms, how far you are along the fourth dimension.",
                    "<25>{#g/alphysInquisitive}* Except it's not really a dimension, but... you get the idea.",
                    '<25>{#g/alphysNervousLaugh}* Anyway, to pass through the puzzle, just align your local phase...',
                    '<25>{#g/alphysHellYeah}* ... with the global phase shift of the room!',
                    '<25>{#g/alphysCutscene2}* Which you can do by walking forwards and backwards, of course.',
                    '<25>{#g/alphysSmileSweat}* A-and, the terminals are set to display your local phase offset...',
                    "<25>{#g/alphysSide}* That way, you'll know when you're properly aligned.",
                    '<25>{#g/alphysCutscene1}* Well, g-good luck!'
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ... still stuck?',
                    '<25>{#g/alphysCutscene2}* Hmmm...',
                    '<25>* I guess my explanation WAS a bit wordy...\n* Ehehe.',
                    '<25>{#g/alphysSide}* Really, you just have to get to the terminal that says zero on it.',
                    "<25>{#g/alphysNervousLaugh}* Again, it's all about phase offset.",
                    '<25>{#g/alphysCutscene2}* As long as your local phase is aligned...',
                    '<25>{#g/alphysCutscene2}* ...',
                    "<25>{#g/alphysUhButHeresTheDeal}* Just g-get to zero and you're home free!!"
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ... still?',
                    '<25>{#g/alphysSmileSweat}* Uh, uh...\n* Walk forwards, until...',
                    '<25>{#g/alphysSideSad}* ... wait, what if you already went past it?',
                    '<25>{#g/alphysNeutralSweat}* ...',
                    "<25>{#g/alphysCutscene3}* You're smart, f-figure it out yourself!"
                ]
            ][SAVE.data.n.cell_puzzleA1++],
        puzzle2b: () =>
            [
                [
                    '<25>{#p/alphys}{#g/alphysCutscene1}* Oh, h-hey!',
                    '<25>{#p/alphys}{#g/alphysCutscene2}* This puzzle is a little more complicated than the last one.',
                    "<25>{#p/alphys}{#g/alphysWelp}* Y'know, b-because of the whole extra dimension added.",
                    '<25>{#p/alphys}{#g/alphysCutscene3}* Sometimes I question whether that actually makes it harder.',
                    '<25>{#p/alphys}{#g/alphysSmileSweat}* Well, uh, l-like the last one, you just need to align your phase.',
                    "<25>{#p/alphys}{#g/alphysFR}* If you don't know what that is by now...",
                    "<25>{#p/alphys}{#g/alphysSide}* I'd say you've probably b-been living in an asteroid all this time."
                ],
                [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* ... so you HAVE been living in an asteroid.',
                    '<25>{#p/alphys}{#g/alphysDontGetAllDreamyEyedOnMeNow}* Jeez, just find the terminal that says zero on it!'
                ]
            ][SAVE.data.n.cell_puzzleA2++]
    },

    i_tvm_radio: {
        battle: {
            description: 'An old earth radio.',
            name: 'Radio'
        },
        drop: ['<32>{#p/human}* (You throw away the Old Radio.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (This artifact looks a lot like other things you're used to seeing all the time.)"]
                : ["<32>{#p/basic}* It's an old earth radio."],
        name: 'Old Radio',
        use: () =>
            !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
                ? []
                : ['a_lookout', 'f_taxi', 's_taxi', 'w_wonder'].includes(game.room) // NO-TRANSLATE

                    ? [
                        '<32>{#p/human}* (You turned on the Old Radio.)',
                        '<32>{#p/event}{#a.radiostart}* ...',
                        '{*}{#a.radiostop}{%}'
                    ]
                    : ['<32>{#p/human}* (You turned on the Old Radio.)\n* (No signal.)']
    },
    i_tvm_fireworks: {
        battle: {
            description: 'A box of fireworks from earth.',
            name: 'Fireworks'
        },
        drop: ['<32>{#p/human}* (You throw away the Fireworks box.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (This supposed artifact looks like nothing else you've seen.)"]
                : ["<32>{#p/basic}* It's a box of fireworks from earth."],
        name: 'Fireworks',
        use: () =>
            !world.genocide && battler.active && battler.alive[0].opponent.metadata.reactTVM
                ? []
                : [
                    '<32>{#p/human}* (You peered into the Fireworks box.)',
                    "<32>* (You can't seem to figure out how to use these.)"
                ]
    },
    i_tvm_mewmew: {
        battle: {
            description: 'A life-sized Mew Mew doll.',
            name: 'Doll'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Mew Mew Doll.)',
            ...((fetchCharacters()
                .find(c => c.key === 'alphys') // NO-TRANSLATE

                ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                ? ((SAVE.data.b.mewget = true),
                    [
                        "<25>{#p/alphys}{#f/23}* Wow, you're so kind for leaving that there for me.",
                        '<25>{#p/alphys}{#f/22}* It only TOOK YOU LONG ENOUGH!!!',
                        '<25>{#p/alphys}{#g/alphysCutscene2}* ... thanks, I guess.'
                    ])
                : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

                    ? [
                        "<32>{#p/basic}* You're leaving it here??",
                        '<32>{#p/basic}* Well... what makes you think I want it, HUH!?',
                        "<32>{#p/basic}* Because, I DON'T!\n* It's... just a stupid doll!",
                        '<32>{#p/basic}* I guess... it is kind of cute, though...',
                        "<32>{#p/basic}* W-what are you looking at!?\n* I'm not blushing!",
                        '<32>{#p/basic}* Not on the outside, anyway...',
                        '<32>{#p/basic}* ...'
                    ]
                    : [])
        ],
        info: ["<32>{#p/basic}* It's a life-sized Mew Mew doll, what else would it be?"],
        name: 'Mew Mew Doll',
        use: () =>
            !world.genocide &&
                battler.active &&
                (battler.alive[0].opponent.metadata.reactTVM || battler.alive[0].opponent.metadata.reactMewMew)
                ? []
                : [
                    '<32>{#p/human}* (You use the Mew Mew Doll.)',
                    ...((fetchCharacters()
                        .find(c => c.key === 'alphys') // NO-TRANSLATE

                        ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                        ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                        : game.room === 'f_undyne' && instance('main', 'f_dummynpc') // NO-TRANSLATE

                            ? ['<32>{#p/basic}* Would you quit waving that thing around?']
                            : game.room === 'f_blooky' && // NO-TRANSLATE

                                !world.genocide &&
                                SAVE.data.n.plot !== 47.2 &&
                                !SAVE.data.b.a_state_napstadecline
                                ? ['<32>{#p/napstablook}* oh............']
                                : SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                                    ? []
                                    : ['<32>{#p/basic}* What were you even expecting to happen here...?'])
                ]
    },
    i_starfait: {
        battle: {
            description: 'There is such a thing as too much sugar.',
            name: 'Starfaint'
        },
        drop: ['<32>{#p/human}* (You throw away the Starfaint.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (23 HP.)']
                : ['<32>{#p/basic}* \"Starfaint\" Heals 23 HP\n* There is such a thing as too much sugar.'],
        name: 'Starfaint',
        use: ['<32>{#p/human}* (You consume the Starfaint.)']
    },
    i_legendary_hero: {
        battle: {
            description: "A shieldwich you can hold to heal after the opponent's turn.",
            name: 'H.Y.G.'
        },
        drop: ['<32>{#p/human}* (You throw away the Hold Yer Grane.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (40 HP.)']
                : [
                    '<33>{#p/basic}* \"Hold Yer Grane\" Heals 40 HP\n* A shieldwich you can hold to heal after the opponent\'s turn.'
                ],
        name: 'Hold Yer Grane',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* (You brandish the Hold Yer Grane proudly.)',
                    '<32>{#p/story}* DEFENSE up for this turn!'
                ]
                : ['<32>{#p/human}* (You eat the Hold Yer Grane.)']
    },
    i_glamburger: {
        battle: {
            description: 'This high-octane hamburger harbors a certain spicy kick.',
            name: 'Slamburger'
        },
        drop: () => [
            '<32>{#p/human}* (You knocked the Slamburger out of the park.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* And that's a home run!"])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (34 HP.)']
                : ['<32>{#p/basic}* \"Slamburger\" Heals 34 HP\n* This high-octane hamburger harbors a certain spicy kick.'],
        name: 'Slamburger',
        use: () => [
            '<32>{#p/human}* (You slammed down the Slamburger.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* Careful, it's hot in more ways than one!"])
        ]
    },
    i_face_steak: {
        battle: {
            description: 'How the turns have tabled.',
            name: "G's Envy"
        },
        drop: ["<32>{#p/human}* (You throw away the Glyde's Envy.)"],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (55 HP.)']
                : ['<32>{#p/basic}* \"Glyde\'s Envy\" Heals 55 HP\n* How the turns have tabled.'],
        name: "Glyde's Envy",
        use: ["<32>{#p/human}* (You consume the Glyde's Envy.)"]
    },
    i_starfait_x: {
        battle: {
            description: '...',
            name: 'Startaint'
        },
        drop: ['<32>{#p/human}* (You throw away the Startaint.)'],
        info: ['<32>{#p/basic}* \"Startaint\" Heals -23 HP\n* ...'],
        name: 'Startaint',
        use: ['<32>{#p/human}* (You consume the Startaint.)']
    },
    i_legendary_hero_x: {
        battle: {
            description: '...',
            name: 'H.Y.P.'
        },
        drop: ['<32>{#p/human}* (You throw away the Hold Yer Pain.)'],
        info: ['<32>{#p/basic}* \"Hold Yer Pain\" Heals -40 HP\n* ...'],
        name: 'Hold Yer Pain',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* (You brandish the Hold Yer Pain anxiously.)',
                    '<32>{#p/story}* DEFENSE down for this turn!'
                ]
                : ['<32>{#p/human}* (You eat the Hold Yer Pain.)']
    },
    i_glamburger_x: {
        battle: {
            description: '...',
            name: 'Slamdunker'
        },
        drop: ['<32>{#p/human}* (You dunk the Slamdunker into the trash.)'],
        info: ['<32>{#p/basic}* \"Slamdunker\" Heals -34 HP\n* ...'],
        name: 'Slamdunker',
        use: ['<32>{#p/human}* (You slammed down the Slamdunker.)']
    },
    i_face_steak_x: {
        battle: {
            description: '...',
            name: 'Envy'
        },
        drop: ["<32>{#p/human}* (You throw away the Undyne's Envy.)"],
        info: ['<32>{#p/basic}* \"Undyne\'s Envy\" Heals -55 HP\n* ...'],
        name: "Undyne's Envy",
        use: ["<32>{#p/human}* (You eat the Undyne's Envy.)"]
    },
    i_trash: {
        battle: {
            description: 'Are you brave enough to eat literal garbage?',
            name: 'Space Junk'
        },
        drop: ['<32>{#p/human}* (You throw away the Space Junk.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (?? HP.)']
                : ['<32>{#p/basic}* \"Space Junk\" Heals ?? HP\n* Are you brave enough to eat literal garbage?'],
        name: 'Space Junk',
        use: () => [
            '<32>{#p/human}* (You eat the Space Junk.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* Dear god.'])
        ]
    },
    i_laser: {
        battle: {
            description: 'Critical hits with this weapon deal MASSIVE damage.',
            name: 'Laser Rifle'
        },
        drop: ['<32>{#p/human}* (You throw away the Laser Rifle.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (12 AT.)']
                : ['<32>{#p/basic}* \"Laser Rifle\" (12 AT)\n* Critical hits with this weapon deal MASSIVE damage.'],
        name: 'Laser Rifle',
        use: ['<32>{#p/human}* (You equip the Laser Rifle.)']
    },
    i_laser_x: {
        battle: {
            description: 'Critical hits with this weapon are decent enough.',
            name: 'Rifle?'
        },
        drop: ['<32>{#p/human}* (You throw away the Laser Rifle.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 AT.)']
                : ['<32>{#p/basic}* \"Laser Rifle?\" (10 AT)\n* Critical hits with this weapon are decent enough.'],
        name: 'Laser Rifle?',
        use: ['<32>{#p/human}* (You equip the Laser Rifle.)']
    },
    i_visor: {
        battle: {
            description: 'Increases aim time in battle.',
            name: 'Visor'
        },
        drop: ['<32>{#p/human}* (You throw away the Tactical Visor.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (12 DF.)']
                : ['<32>{#p/basic}* \"Tactical Visor\" (12 DF)\n* Increases aim time in battle.'],
        name: 'Tactical Visor',
        use: ['<32>{#p/human}* (You wear the Tactical Visor.)']
    },
    i_visor_x: {
        battle: {
            description: 'A bit less tactical than the original. Increases aim time.',
            name: 'Visor?'
        },
        drop: ['<32>{#p/human}* (You throw away the Tactical Visor.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 DF.)']
                : [
                    '<32>{#p/basic}* \"Tactical Visor?\" (10 DF)\n* A bit less tactical than the original. Increases aim time.'
                ],
        name: 'Tactical Visor?',
        use: ['<32>{#p/human}* (You wear the Tactical Visor.)']
    },
    i_filament: {
        battle: {
            description: 'A winding wick of flavors!\nFive uses left.',
            name: 'Filament'
        },
        drop: ['<32>{#p/human}* (You throw away the Filament.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (30 HP.)']
                : ['<32>{#p/basic}* \"Filament\" Heals 30 HP\n* A winding wick of flavors!\n* Five uses left.'],
        name: 'Quintuple Filament',
        use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
    },
    i_filament_use1: {
        battle: { description: 'A winding wick of flavors!\nFour uses left.', name: 'Filament' },
        drop: ['<32>{#p/human}* (You throw away the Filament.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (25 HP.)']
                : ['<32>{#p/basic}* \"Filament\" Heals 25 HP\n* A winding wick of flavors!\n* Four uses left.'],
        name: 'Quadruple Filament',
        use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
    },
    i_filament_use2: {
        battle: { description: 'A winding wick of flavors!\nThree uses left.', name: 'Filament' },
        drop: ['<32>{#p/human}* (You throw away the Filament.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (20 HP.)']
                : ['<32>{#p/basic}* \"Filament\" Heals 20 HP\n* A winding wick of flavors!\n* Three uses left.'],
        name: 'Triple Filament',
        use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
    },
    i_filament_use3: {
        battle: { description: 'A winding wick of flavors!\nTwo uses left.', name: 'Filament' },
        drop: ['<32>{#p/human}* (You throw away the Filament.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 HP.)']
                : ['<32>{#p/basic}* \"Filament\" Heals 15 HP\n* A winding wick of flavors!\n* Two uses left.'],
        name: 'Double Filament',
        use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
    },
    i_filament_use4: {
        battle: { description: 'A winding wick of flavors!\nOne use left.', name: 'Filament' },
        drop: ['<32>{#p/human}* (You throw away the Filament.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 HP.)']
                : ['<32>{#p/basic}* \"Filament\" Heals 10 HP\n* A winding wick of flavors!\n* One use left.'],
        name: 'Filament',
        use: ['<32>{#p/human}* (You extract some energy from the Filament.)']
    },
    i_tablaphone: {
        battle: {
            description: 'Flat, but sharp. Restores some lost HP after each turn.',
            name: 'Tablaphone'
        },
        drop: ['<32>{#p/human}* (You throw away the Tablaphone.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 AT.)']
                : ['<32>{#p/basic}* \"Tablaphone\" (10 AT)\n* Flat, but sharp. Restores some lost HP after each turn.'],
        name: 'Tablaphone',
        use: ['<32>{#p/human}* (You equip the Tablaphone.)']
    },
    i_sonic: {
        battle: {
            description: "Your opposition's attacks have a small chance to heal you.",
            name: 'Resonator'
        },
        drop: ['<32>{#p/human}* (You throw away the Sonic Resonator.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (11 DF.)']
                : [
                    '<32>{#p/basic}* \"Sonic Resonator\" (11 DF)\n* Your opposition\'s attacks have a small chance to heal you.'
                ],
        name: 'Sonic Resonator',
        use: ['<32>{#p/human}* (You equip the Sonic Resonator.)']
    },
    i_mystery_food: {
        battle: {
            description: 'The kind of food you expect to find at a rec center.',
            name: 'Mysteryfood'
        },
        drop: ['<32>{#p/human}* (You throw away the Mysteryfood.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (13 HP.)']
                : ['<32>{#p/basic}* \"Mysteryfood\" Heals 13 HP\n* The kind of food you expect to find at a rec center.'],
        name: 'Mysteryfood',
        use: ['<32>{#p/human}* (You eat the Mysteryfood.)']
    },
    i_super_pop: {
        battle: {
            description: 'Alters your perception of time.',
            name: 'Hyper Pop'
        },
        drop: ['<32>{#p/human}* (You throw away the Hyper Vortex Pop.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (22 HP.)']
                : [
                    '<33>{#p/basic}* \"Hyper Vortex Pop\" Heals 22 HP\n* Alters your perception of time.\n* Not viable outside of battle.'
                ],
        name: 'Hyper Vortex Pop',
        use: () => [
            '<32>{#p/human}* (You sucked on the Hyper Vortex Pop.)',
            ...(battler.active
                ? game.vortex
                    ? ['<32>{#p/human}* (Your perception of time is already shifted.)']
                    : [
                        '<32>{#p/human}* (Your perception of time begins to shift.)',
                        '<32>{#p/story}* FOCUS up for two turns!'
                    ]
                : ['<32>{#p/human}* (No effect outside of battle.)'])
        ]
    },
    i_old_gun: {
        battle: {
            description: 'A non-violent single-use weapon.',
            name: 'Stun Gun'
        },
        drop: ['<32>{#p/human}* (You throw away the Stun Gun.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (You get the sense this item shouldn't be carried as lightly as one might think.)"]
                : ['<32>{#p/basic}* A non-violent single-use weapon.\n* Not viable outside of battle.'],
        name: 'Stun Gun',
        use: () =>
            battler.active
                ? []
                : ['<32>{#p/human}* (You took out the Stun Gun.)', '<32>{#p/human}* (No effect outside of battle.)']
    },
    i_old_bomb: {
        battle: {
            description: 'A non-violent single-use weapon.',
            name: 'Sleep Bomb'
        },
        drop: ['<32>{#p/human}* (You throw away the Sleep Bomb.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (You get the sense this item wouldn't be as calming as one would hope.)"]
                : ['<32>{#p/basic}* A non-violent single-use weapon.\n* Not viable outside of battle.'],
        name: 'Sleep Bomb',
        use: () =>
            battler.active
                ? []
                : ['<32>{#p/human}* (You took out the Sleep Bomb.)', '<32>{#p/human}* (No effect outside of battle.)']
    },
    i_old_spray: {
        battle: {
            description: 'A non-violent single-use weapon.',
            name: 'Sugar Spray'
        },
        drop: ['<32>{#p/human}* (You throw away the Sugar Spray.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (You get the sense this item isn't as sweet as it seems.)"]
                : ['<32>{#p/basic}* A non-violent single-use weapon.\n* Not viable outside of battle.'],
        name: 'Sugar Spray',
        use: () =>
            battler.active
                ? []
                : ['<32>{#p/human}* (You took out the Sugar Spray.)', '<32>{#p/human}* (No effect outside of battle.)']
    },
    i_corndog: {
        battle: {
            description: 'Fresh from the microwave.',
            name: 'Corn Dog'
        },
        drop: ['<32>{#p/human}* (You throw away the Corn Dog.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 HP.)']
                : ['<32>{#p/basic}* \"Corn Dog\" Heals 10 HP\n* Fresh from the microwave.'],
        name: 'Corn Dog',
        use: ['<32>{#p/human}* (You eat the Corn Dog.)']
    },
    i_corngoat: {
        battle: {
            description: "Like a corn dog, but fluffier.\nDon't question it.",
            name: 'Corn Goat'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Corn Goat.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom ? ['<25>{#p/asriel1}{#f/15}* ...'] : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (20 HP.)']
                : ['<32>{#p/basic}* \"Corn Goat\" Heals 20 HP\n* Like a corn dog, but fluffier.\n* Don\'t question it.'],
        name: 'Corn Goat',
        use: () => [
            '<32>{#p/human}* (You eat the Corn Goat.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom
                ? ["<25>{#p/asriel1}{#f/13}* Please don't tell me that's symbolic of anything..."]
                : [])
        ]
    },
    i_moon_pie: {
        battle: {
            description: "A slice of pie from the Earth's night sky.",
            name: 'Moon Pie'
        },
        drop: ['<32>{#p/human}* (You throw away the Moon Pie.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Moon Pie\" Heals 99 HP\n* A slice of pie from the Earth\'s night sky.'],
        name: 'Moon Pie',
        use: ['<32>{#p/human}* (You eat the Moon Pie.)']
    },
    i_orange_soda: {
        battle: {
            description: 'A crushingly orange soda.\nTolerable.',
            name: 'Orange Soda'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Orange Soda.)',
            ...((fetchCharacters()
                .find(c => c.key === 'alphys') // NO-TRANSLATE

                ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                ? ['<25>{#p/alphys}{#g/alphysFR}* ...', '<25>* Did you just throw away a perfectly good orange soda?']
                : [])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (16 HP.)']
                : ['<32>{#p/basic}* \"Orange Soda\" Heals 16 HP\n* A crushingly orange soda.\n* Tolerable.'],
        name: 'Orange Soda',
        use: () =>
            world.meanie
                ? [
                    '<32>{#p/human}* (You drink the Orange Soda, and crush it in your hands.)',
                    battler.active
                        ? `<32>{#p/story}* ATTACK up by ${8 + battler.at_bonus}!`
                        : '<32>{#p/human}* (No effect outside of battle.)',
                    ...((fetchCharacters()
                        .find(c => c.key === 'alphys') // NO-TRANSLATE

                        ?.position.extentOf(game.camera.position.clamp(...renderer.region)) ?? 240) < 240
                        ? [
                            '<25>{#p/alphys}{#g/alphysOhGodNo}* W-was that my drink!?',
                            '<25>{#p/alphys}{#f/10}* Oh... my god...',
                            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* You did not hold back!'
                        ]
                        : [])
                ]
                : ['<32>{#p/human}* (You drink the Orange Soda.)']
    },
    i_demise: {
        battle: {
            description: '...',
            name: 'Demise'
        },
        drop: ["<32>{#p/human}* (You throw away the Plunderer's Demise.)"],
        info: ['<32>{#p/basic}* \"Plunderer\'s Demise\"\n* Heals -99 HP\n* ...'],
        name: "Plunderer's Demise",
        use: ["<32>{#p/human}* (You eat the Plunderer's Demise.)"]
    },

    k_liftgate: {
        name: 'Liftgate Pass',
        description: 'Acquired from your upgraded CELL.\nUsed to access the liftgate network.'
    },

    k_mystery: {
        name: 'Mystery Key',
        description: () =>
            SAVE.data.b.f_state_hapstadoor
                ? "Used to unlock the door to Mettaton's house."
                : "Acquired from Bratty and Catty's shop in the rec center."
    },

    m_aerialis: {
        sidebarCellPms1: () => (world.bad_lizard < 2 ? 'POSTS (NEWEST FIRST)' : 'PRIVATE MESSAGES (NEWEST FIRST)'),
        sidebarCellPms2: 'Press [X] to Finish',
        sidebarCellPms3: {
            alphysBadLizard: {
                author: 'SYSTEM',
                pm: 'An evacuation notice has been issued in your area. Vacate at once.'
            },
            alphys0: {
                author: 'SYSTEM',
                pm: "Thank you for creating an account on the outpost's #1 social network!"
            },
            alphys1: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? 'uhhhh nobody saw that right' 
                        : [
                            'finally met the human that was kinda nervewracking LOL', 
                            'well i just met the human' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys2: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? 'ok good' 
                        : [
                            iFancyYourVilliany()
                                ? 'still cant believe mettaton gave them a moniker???'
                                : 'still cant believe mettaton wanted me to fight them???', 
                            'they seem... nice?' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys3: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? 'yeah that wouldve been pretty embarrasing otherwise' 
                        : [
                            iFancyYourVilliany()
                                ? 'yeah lets hope that doesnt get blown out of proportion'
                                : 'yeah lets hope that doesnt happen again', 
                            'yeah lets hope nothing bad happens' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys4: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne
                        ? 'oh my god i thought those guys were about to provoke the human' 
                        : [
                            'really guys?\nTHERES ICE CREAM AT THE REC CENTER', 
                            'awkward' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys6: {
                author: 'ALPHYS',
                pm: 'oh no.'
            },
            alphys7: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'ok mettaton could you like not keep doing this to me thanks' 
                        : SAVE.data.n.state_aerialis_crafterresult === 0
                            ? 'ok ill be honest i have no idea how that worked out LOL' 
                            : SAVE.data.n.bad_lizard < 1
                                ? [
                                    'wow, i shouldve known those bombs were just TV props LOL', 
                                    'NOOOO they were so close', 
                                    "let's go the human made it to the end", 
                                    'anyone who wasnt watching just now missed out big time' 
                                ][SAVE.data.n.state_aerialis_crafterresult - 1]
                                : 'well, there goes my last one-time use portable jetpack' 
            },
            alphys8: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'wait how did the human get here if i never gave them a liftgate pass' 
                        : 'BTW has anyone else seen mew mew space adventure???'
            },
            alphys9: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'like did they just steal my spare cell phone or something' 
                        : 'i finally started watching the last season and its actually good WTF'
            },
            alphys10: {
                author: 'NAPSTABLOOK22',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'alphys... can you please respond to my private messages...' 
                        : 'we did... that one time...'
            },
            alphys11: {
                author: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'NAPSTABLOOK22'
                        : SAVE.data.n.state_starton_papyrus === 0
                            ? 'COOLSKELETON95'
                            : 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? "i'm... getting worried" 
                        : SAVE.data.n.state_starton_papyrus === 0
                            ? 'ARE WE WATCHING \"TV SHOWS\" NOW?\nSOUNDS EXCITING!' 
                            : 'ooh i remember that' 
            },
            alphys12: {
                author: () => (SAVE.data.n.plot === 72 ? '_Sp4ceAdv3ntur3r_' : '_K1ll3rMann3qu1n_'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'Alphys, HUH?\nAre you IGNORING MY COUSIN!?!?' 
                        : 'Mew Mew SPACE ADVENTURE???\nHAH! WHAT A LOAD OF HOT GARBAGE!'
            },
            alphys13: {
                author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'please stay out of this' 
                        : [
                            'let me guess youre one of those mew mew starfire fans arent you', 
                            'uhhhh' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys14: {
                author: () => (SAVE.data.n.plot === 72 ? '_Sp4ceAdv3ntur3r_' : '_K1ll3rMann3qu1n_'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? "oh, so i'm just supposed to IGNORE my cousins' problems, AM I?" 
                        : [
                            'yeah, okay, but ask yourself this:\ndoes space venture have EXPLOSIONS!?', 
                            "whats the matter, huh?\nSCARED YOU'LL LOSE AN ARGUMENT!?" 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys15: {
                author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'with all due respect\nplease shut up.' 
                        : [
                            'LOLLLLLLLLLLL SPACE VENTURE\naverage starfire fan cant spell XD', 
                            'im really starting to regret not adding a block function' 
                        ][SAVE.data.n.bad_lizard]
            },
            alphys16: {
                author: () => (SAVE.data.n.state_foundry_undyne === 1 ? 'NAPSTABLOOK22' : 'ALPHYS'),
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'gotta go.' 
                        : 'another show already???'
            },
            alphys17: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? 'well... alright\nill look at what you sent me now' 
                        : 'for the record this mew mew doll thing never happened.'
            },
            alphys18: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_foundry_undyne === 1
                        ? SAVE.data.n.state_aerialis_royalguards === 1
                            ? 'no... come on... i thought i told them not to go after anyone' 
                            : "phew... i thought they'd be killed for sure there" 
                        : 'i thought i told the royal guard not to go after anyone WTF???'
            },
            alphysX0: {
                author: 'SYSTEM',
                pm: 'Your private message history was successfully cleared.'
            },
            alphysX1: {
                author: 'lazybones.',
                pm: 'just to be on the safe side.'
            },
            alphysX2: {
                author: 'ALPHYS',
                pm: 'yeah just cleared it out now'
            },
            alphysX3: {
                author: 'lazybones.',
                pm: 'heh... remember that time he showed off the new gravity plating?'
            },
            alphysX4: {
                author: 'ALPHYS',
                pm: 'and the whole set just started floating into the sky? OMG YES LMAO'
            },
            alphysX5: {
                author: 'lazybones.',
                pm: 'pfft, he really thought that would work, huh?'
            },
            alphysX6: {
                author: 'ALPHYS',
                pm: 'i remember asgore trying everything he could to hold it down XD'
            },
            alphysX7: {
                author: 'ALPHYS',
                pm: 'man what a day\ni really miss working with you sans'
            },
            alphysX8: {
                author: 'lazybones.',
                pm: "i know you do.\nbut i've got a different job to dddd"
            },
            alphysX9: {
                author: 'ALPHYS',
                pm: '...\nhello?'
            },
            alphysY1: {
                author: 'lazybones.',
                pm: 'sorry, a human just showed up, totally caught me off guard.'
            },
            alphysY2: {
                author: 'lazybones.',
                pm: 'no pun intended.'
            },
            alphysY3: {
                author: 'ALPHYS',
                pm: 'right... wait really?'
            },
            alphysY4: {
                author: 'lazybones.',
                pm: "i wouldn't lie about making a pun, would i?"
            },
            alphysY5: {
                author: 'ALPHYS',
                pm: 'you know what i mean.'
            },
            alphysY6: {
                author: 'lazybones.',
                pm: "don't worry, alphys.\ni've got this under control."
            },
            alphysY7: {
                author: 'ALPHYS',
                pm: 'sure okay'
            },
            alphysY7A1: {
                author: 'ALPHYS',
                pm: 'woah... did you see that?'
            },
            alphysY7A2: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? 'papyrus and the human just fought and it was so intense'
                        : 'papyrus and the human just fought and it was kinda weird'
            },
            alphysY7A3: {
                author: 'lazybones.',
                pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? 'what?\nis he okay?' : 'what?\nwhat happened?')
            },
            alphysY7A4: {
                author: 'ALPHYS',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? 'yeah yeah hes fine dont worry'
                        : 'well papyrus kept beating them and they kept coming back and...'
            },
            alphysY7A5: {
                author: 'lazybones.',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? "heh... i could feel it from here.\nhe must've really given it his all."
                        : "hey, just tell me if he's okay."
            },
            alphysY7A6: {
                author: 'ALPHYS',
                pm: () => (SAVE.data.n.state_papyrus_capture < 3 ? 'yeah thats one way of putting it' : 'hes okay.')
            },
            alphysY7A7: {
                author: 'lazybones.',
                pm: () =>
                    SAVE.data.n.state_papyrus_capture < 3
                        ? "guess i'll have to congratulate him when he gets back home."
                        : 'heh... glad to hear it.'
            },
            alphysYdoggo1: {
                author: 'ALPHYS',
                pm: 'no... doggo...'
            },
            alphysYdoggo2: {
                author: 'lazybones.',
                pm: 'huh? what happened?'
            },
            alphysYdoggo3: {
                author: 'ALPHYS',
                pm: 'after he lost his eyesight he would come to my lab after work...'
            },
            alphysYdoggo4: {
                author: 'ALPHYS',
                pm: 'id teach him to use his ears with these little games we played'
            },
            alphysYdoggo5: {
                author: 'ALPHYS',
                pm: 'he would always leave with a big smile on his face. but now...'
            },
            alphysYdoggo6: {
                author: 'lazybones.',
                pm: 'i see.'
            },
            alphysY8A1: {
                author: 'ALPHYS',
                pm: 'you know the human is killing monsters in starton right?'
            },
            alphysY8A1a: {
                author: 'ALPHYS',
                pm: 'theyre going after regular citizens'
            },
            alphysY8A1b: {
                author: 'ALPHYS',
                pm: 'theyre targeting the sentries'
            },
            alphysY8A1c: {
                author: 'ALPHYS',
                pm: 'theyre going after everyone'
            },
            alphysY8A1d: {
                author: 'ALPHYS',
                pm: 'its not just doggo theyre after'
            },
            alphysY8A2: {
                author: 'lazybones.',
                pm: "i know. i'm doing my best to get people out before it's too late."
            },
            alphysY8A3: {
                author: 'ALPHYS',
                pm: 'okay good'
            },
            alphysYdrake1: {
                author: 'ALPHYS',
                pm: 'yknow... stardrakes mom came in the other day'
            },
            alphysYdrake2: {
                author: 'ALPHYS',
                pm: 'she told me how proud she is of her son and the new friends he made...'
            },
            alphysYdrake3: {
                author: 'ALPHYS',
                pm: 'what am i supposed to tell her now?'
            },
            alphysYdrake4: {
                author: 'lazybones.',
                pm: "you tell her that you'll do the best you can in your position."
            },
            alphysYdrake5: {
                author: 'ALPHYS',
                pm: 'yeah... i guess thats all i really can tell her huh'
            },
            alphysYdrake6: {
                author: 'lazybones.',
                pm: "it's better than nothing."
            },
            alphysY8A4: {
                author: 'ALPHYS',
                pm: 'that was close'
            },
            alphysY8A5: {
                author: 'lazybones.',
                pm: "yeah... guess i shouldn't have doubted my bro, heh."
            },
            alphysY8A6: {
                author: 'ALPHYS',
                pm: 'yeah...'
            },
            alphysY8A7: {
                author: 'ALPHYS',
                pm: 'never mind the human is back to killing again'
            },
            alphysY8A8: {
                author: 'lazybones.',
                pm: 'welp.'
            },
            alphysY8B1: {
                author: 'ALPHYS',
                pm: 'sans'
            },
            alphysY8B2: {
                author: 'ALPHYS',
                pm: 'the human just killed papyrus'
            },
            alphysY8B3: {
                author: 'ALPHYS',
                pm: 'please tell me youre there'
            },
            alphysY8B4a: {
                author: 'lazybones.',
                pm: "i'm here. and i should've kept a closer eye on him."
            },
            alphysY8B4b: {
                author: 'lazybones.',
                pm: "i'm here. and i shouldn't have left him alone out there."
            },
            alphysY8B5: {
                author: 'ALPHYS',
                pm: 'what are you gonna do now?'
            },
            alphysY8B6: {
                author: 'lazybones.',
                pm: 'honestly, alphys?'
            },
            alphysY8B7: {
                author: 'lazybones.',
                pm: "i don't feel like doing anything."
            },
            alphysY8B8: {
                author: 'ALPHYS',
                pm: 'sans...'
            },
            alphysY8B9: {
                author: 'lazybones.',
                pm: "it's not your fault.\nthis would always have happened."
            },
            alphysY8B10: {
                author: 'ALPHYS',
                pm: 'what do you mean?'
            },
            alphysY8B11: {
                author: 'lazybones.',
                pm: 'you know how papyrus can be.'
            },
            alphysY8B12: {
                author: 'lazybones.',
                pm: "he's just too damn good to stand by and watch as people die."
            },
            alphysY8B13: {
                author: 'ALPHYS',
                pm: 'unlike us right?'
            },
            alphysY8B14: {
                author: 'lazybones.',
                pm: 'yeah.'
            },
            alphysY8B15: {
                author: 'ALPHYS',
                pm: '...'
            },
            alphysY8B16: {
                author: 'ALPHYS',
                pm: 'things arent getting any better'
            },
            alphysY8B17: {
                author: 'lazybones.',
                pm: "let me guess, they're going after people in the foundry now?"
            },
            alphysY8B18: {
                author: 'ALPHYS',
                pm: 'yeah but youre gonna help me evacuate right?'
            },
            alphysY8B18x: {
                author: 'ALPHYS',
                pm: 'i mean i think so? maybe we should start evacuating or something'
            },
            alphysY8B19: {
                author: 'lazybones.',
                pm: "i can't make any promises.\nbut i'll try."
            },
            alphysY8B20: {
                author: 'ALPHYS',
                pm: 'thanks'
            },
            alphysY8C1: {
                author: 'ALPHYS',
                pm: 'sans people in the foundry are in serious danger'
            },
            alphysY8C2a: {
                author: 'ALPHYS',
                pm: 'its the human... even the elite squad cant stop it'
            },
            alphysY8C2b: {
                author: 'ALPHYS',
                pm: 'its the human... theyre going after the residents down there'
            },
            alphysY8C2c: {
                author: 'ALPHYS',
                pm: 'its the human... theyre killing everybody down there'
            },
            alphysY8C3a: {
                author: 'lazybones.',
                pm: 'well, it was nice while it lasted.\nyou gonna start evacuating people?'
            },
            alphysY8C3b: {
                author: 'lazybones.',
                pm: "well, aren't you gonna start evacuating people?"
            },
            alphysY8C4: {
                author: 'ALPHYS',
                pm: 'oh right i need to do that'
            },
            alphysY8C5: {
                author: 'ALPHYS',
                pm: 'gotta go'
            },
            alphysY8C6: {
                author: 'lazybones.',
                pm: "good luck, alphys.\ni'll help evacuate if i can."
            },
            alphysY8C7: {
                author: 'ALPHYS',
                pm: 'thanks'
            },
            alphysY8C8: {
                author: 'ALPHYS',
                pm: 'oh no'
            },
            alphysY8C9: {
                author: 'ALPHYS',
                pm: 'undyne and the human are about to fight'
            },
            alphysY8C10a: {
                author: 'ALPHYS',
                pm: 'this is kind of worrying'
            },
            alphysY8C10b: {
                author: 'ALPHYS',
                pm: 'not gonna lie im kind of excited'
            },
            alphysY8C11a: {
                author: 'ALPHYS',
                pm: 'and by kind of i mean very'
            },
            alphysY8C11b: {
                author: 'ALPHYS',
                pm: 'but like really scared at the same time'
            },
            alphysY8C12a: {
                author: 'lazybones.',
                pm: "don't you think you should do something about it?"
            },
            alphysY8C12b: {
                author: 'lazybones.',
                pm: "didn't you say you were trying to avoid this earlier?"
            },
            alphysY8C13a: {
                author: 'ALPHYS',
                pm: 'yeah i dont really think undyne would listen to me'
            },
            alphysY8C13b: {
                author: 'ALPHYS',
                pm: 'if the human got this far they can make it past her'
            },
            alphysY8C14: {
                author: 'lazybones.',
                pm: 'well, okay.\nif you say so, i guess.'
            },
            alphysY8D1: {
                author: 'ALPHYS',
                pm: 'oh'
            },
            alphysY8D1a1: {
                author: 'ALPHYS',
                pm: 'i guess killing papyrus wasnt enough for them then'
            },
            alphysY8D1a2: {
                author: 'ALPHYS',
                pm: 'i guess slaughtering the elite squad wasnt enough for them then'
            },
            alphysY8D1a3: {
                author: 'ALPHYS',
                pm: 'i guess slaughtering the canine unit wasnt enough for them then'
            },
            alphysY8D1a4: {
                author: 'ALPHYS',
                pm: 'i guess killing people in the foundry wasnt enough for them then'
            },
            alphysY8D1a5: {
                author: 'ALPHYS',
                pm: 'i guess killing people in starton wasnt enough for them then'
            },
            alphysY8D1b: {
                author: 'ALPHYS',
                pm: 'never mind'
            },
            alphysY8D1c1: {
                author: 'ALPHYS',
                pm: 'that cant be good'
            },
            alphysY8D1c2: {
                author: 'lazybones.',
                pm: 'what happened?'
            },
            alphysY8D1c3: {
                author: 'ALPHYS',
                pm: 'she was trying to keep up with them and she stepped on something and...'
            },
            alphysY8D1c4: {
                author: 'ALPHYS',
                pm: 'i see it...\ni think shes... fallen down'
            },
            alphysY8D1x: {
                author: 'ALPHYS',
                pm: 'okay they spared her'
            },
            alphysY8D2a: {
                author: 'lazybones.',
                pm: "i'm sorry, alphys. i wish i could do something, but i can't."
            },
            alphysY8D2b: {
                author: 'lazybones.',
                pm: "i guess there's nothing you can do, then. i'm sorry, alphys."
            },
            alphysY8D2x: {
                author: 'ALPHYS',
                pm: 'though i dont think i want to be here after everything that happened'
            },
            alphysY8D3a: {
                author: 'ALPHYS',
                pm: () =>
                    world.bad_lizard < 2
                        ? 'i let this happen sans... i watched her die and did nothing to stop it'
                        : 'i should probably leave the lab while i still have the chance'
            },
            alphysY8D3b1: {
                author: 'ALPHYS',
                pm: 'i get that it could have been an accident but i cant know for sure'
            },
            alphysY8D3b2: {
                author: 'ALPHYS',
                pm: 'who knows what theyll do next?'
            },
            alphysY8D3x: {
                author: 'ALPHYS',
                pm: 'its probably safer just to leave the lab anyway.'
            },
            alphysY8D4: {
                author: 'lazybones.',
                pm: () =>
                    world.bad_lizard < 2
                        ? "maybe it'd be best if you took some time off for a while."
                        : "yeah, you do that.\ni'll try to keep tabs on 'em though."
            },
            alphysY8D4x: {
                author: 'lazybones.',
                pm: "you can leave the lab if you want.\ni'll try to keep tabs on 'em though."
            },
            alphysY8D5: {
                author: 'ALPHYS',
                pm: () =>
                    world.bad_lizard < 2
                        ? 'yeah... youre probably right'
                        : 'ok but dont get too close. they could kill someone at any moment'
            },
            alphysY8D6: {
                author: 'lazybones.',
                pm: () =>
                    world.bad_lizard < 2
                        ? 'sounds good. just be sure to get a phone that works outside the lab.'
                        : "i'll be fine, just be sure to get a phone that works outside the lab."
            },
            alphysY8D7: {
                author: 'ALPHYS',
                pm: 'oh yeah i almost forgot thanks'
            },
            alphysY8D8: {
                author: 'lazybones.',
                pm: "oh, and be sure to clear the message history while you're at it."
            },
            alphysY8D9: {
                author: 'ALPHYS',
                pm: 'yeah ill do that dont worry'
            },
            alphysZ1: {
                author: 'ALPHYS',
                pm: '...\nhello?'
            },
            alphysZ2: {
                author: 'ALPHYS',
                pm: 'sans im kinda getting worried'
            },
            alphysZ3: {
                author: 'ALPHYS',
                pm: 'no... no no no no no please tell me that was a prank'
            },
            alphysZ4: {
                author: 'ALPHYS',
                pm: 'youre pranking me right?\nyou wouldnt just die like that'
            },
            alphysZ5: {
                author: 'ALPHYS',
                pm: 'sans please tell me that youre alive and safe'
            },
            alphysZ6: {
                author: 'ALPHYS',
                pm: 'im sorry if i upset you for some reason or did something bad'
            },
            alphysZ7: {
                author: 'ALPHYS',
                pm: 'its just been tough on me since you left and i dont know what to do'
            },
            alphysZ8: {
                author: 'ALPHYS',
                pm: 'well... im back\nlooks like they got your brother'
            },
            alphysZ9: {
                author: 'ALPHYS',
                pm: 'i went to go do something and when i came back he was gone'
            },
            alphysZ10: {
                author: 'ALPHYS',
                pm: 'um... sans'
            },
            alphysZ11: {
                author: 'ALPHYS',
                pm: 'i dont know if youre there in some form or not but'
            },
            alphysZ12: {
                author: 'ALPHYS',
                pm: 'undynes gone'
            },
            alphysZ13: {
                author: 'ALPHYS',
                pm: 'UNDYNES GONE AND I DONT FING KNOW WHAT TO DO'
            },
            alphysZ14: {
                author: 'ALPHYS',
                pm: 'sorry'
            },
            alphysZ15: {
                author: 'ALPHYS',
                pm: 'i should probably go.'
            },
            alphysZ16: {
                author: 'ALPHYS',
                pm: 'heck i dont even know why im talking to you anymore'
            },
            alphysZ17: {
                author: 'ALPHYS',
                pm: 'oh by the way'
            },
            alphysZ18: {
                author: 'ALPHYS',
                pm: 'it was the starling flower all along'
            }
        },
        sidebarCellPms4: '(NEW)'
    },

    n_shop_bpants: {
        exit: () =>
            world.population === 0 || burger()
                ? world.bullied && !world.genocide && !burger()
                    ? ['<32>{#p/basic}{#k/6}* Any time, little bully.']
                    : ['<32>{#p/basic}{#k/6}* Any time, little murderer.']
                : ['<32>{#p/basic}{#k/6}* Any time, little buddy.'],
        item: () =>
            world.runaway
                ? [
                    '0G - Starfaint',
                    '0G - Hold Yer Grane',
                    '0G - Slamburger',
                    SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "0G - Glyde's Envy",
                    'Exit'
                ]
                : SAVE.data.n.plot === 72
                    ? [
                        '5G - Starfaint',
                        '10G - Hold Yer Grane',
                        '5G - Slamburger',
                        SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "49G - Glyde's Envy",
                        'Exit'
                    ]
                    : world.genocide || world.killed0 || burger()
                        ? [
                            '32G - Startaint',
                            '60G - Hold Yer Pain',
                            '48G - Slamdunker',
                            SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "138G - Undyne's Envy",
                            'Exit'
                        ]
                        : [
                            '16G - Starfaint',
                            '30G - Hold Yer Grane',
                            '24G - Slamburger',
                            SAVE.data.b.item_face_steak ? '§fill=#808080§--- UNAVAILABLE ---' : "69G - Glyde's Envy",
                            'Exit'
                        ],
        itemInfo: () =>
            world.genocide || world.killed0 || burger()
                ? [
                    'Heals -23HP\nSugar over-\ndose assured.',
                    'Heals -40HP\nNot quite a\nhero of\nany kind.',
                    'Heals -34HP\nFace the\npain either\nway.',
                    'Heals -55HP\nOnly for the\nmost die-\nhard folk.'
                ]
                : [
                    'Heals 23HP\nSugar over-\ndose likely.',
                    'Heals 40HP\nNot quite a\n\"legendary\nhero.\"',
                    'Heals 34HP\nSlam it\ndown or face\nthe pain.',
                    "Heals 55HP\nIt's a long\nstory."
                ],
        itemPrompt: () =>
            world.population === 0 || burger()
                ? '<09>{#p/basic}{#k/7}What do YOU want from me?'
                : '<09>{#p/basic}{#k/0}What do you want from me?',
        itemPurchase: () =>
            world.population === 0 || burger()
                ? [
                    world.bullied && !world.genocide && !burger()
                        ? '<09>{#p/basic}{#k/5}Thanks, little bully.'
                        : '<09>{#p/basic}{#k/5}Thanks, little murderer.',
                    '<09>{#p/basic}{#k/7}You gonna buy something or...?',
                    "<09>{#p/basic}{#k/6}That's the wrong amount of money.",
                    "<10>{#p/human}(You're carrying too much.)"
                ]
                : [
                    '<09>{#p/basic}{#k/0}Thanks, little buddy.',
                    '<09>{#p/basic}{#k/1}You gonna buy something or...?',
                    "<09>{#p/basic}{#k/6}That's the wrong amount of money.",
                    "<10>{#p/human}(You're carrying too much.)"
                ],
        itemPurchasePrompt: () => (world.runaway ? 'Take it?' : 'Buy it for\n$(x)G?'),
        itemUnavailable: () =>
            world.runaway
                ? '<09>{#p/basic}Nothing left.'
                : world.population === 0 || burger()
                    ? '<09>{#p/basic}{#k/5}Sorry, that was one of a kind.'
                    : '<09>{#p/basic}{#k/4}Sorry, that was one of a kind.',
        menu: () =>
            world.runaway ? ['Take', 'Steal', 'Read', 'Exit'] : ['Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit'],
        menuPrompt1: () =>
            world.population === 0 || burger()
                ? world.bullied && !world.genocide && !burger()
                    ? '<23>{#p/basic}{#k/5}* Heyyyy little bully.'
                    : '<23>{#p/basic}{#k/5}* Heyyyy little murderer.'
                : '<23>{#p/basic}{#k/0}* What can I do for you, little buddy?',
        menuPrompt2: () =>
            world.population === 0 || burger()
                ? '<23>{#p/basic}{#k/7}* Need anything else?'
                : '<23>{#p/basic}{#k/0}* Need anything else?',
        menuPrompt3: '<23>{#p/basic}* ... but everybody ran.',
        note: ['<32>{#p/human}* (But there was no note for you to read.)'],
        sell1: () =>
            world.runaway
                ? ['<30>{#p/human}* (You took 2048G from behind the counter.)']
                : world.genocide || world.killed0 || burger()
                    ? [
                        '<30>{#p/basic}{#k/7}* ...',
                        ...(SAVE.storage.inventory.size < 8
                            ? [
                                '<30>{#k/4}* Okay.\n* Here you go.',
                                "<30>{#k/5}* It's a one-of-a-kind item, just for you.",
                                "<30>{#p/human}* (You got the Plunderer's Demise.)"
                            ]
                            : [
                                '<30>{#p/basic}{#k/7}* For someone who wants to steal something, you sure seem well off with your ITEMs.'
                            ])
                    ]
                    : world.meanie
                        ? ['<30>{#p/basic}{#k/1}* ...', '<30>{#k/4}* ...', '<30>{#k/3}* Excuse me?']
                        : [
                            '<30>{#p/basic}{#k/1}* ...',
                            '<30>{#k/4}* ...',
                            "<30>{#k/6}* You think you're real sly, huh?",
                            "<30>{#k/7}* Hmm...\n* Why don't you try selling that to Bratty and Catty?",
                            '<30>{#k/0}* I\'m sure they\'ll, uh, \"bite.\"'
                        ],
        sell2: () =>
            world.runaway
                ? ['<30>{#p/basic}* Nothing left.']
                : SAVE.data.b.a_state_freesell
                    ? ['<30>{#p/basic}{#k/6}* Sorry, one free sample per murderer.']
                    : ["<30>{#p/basic}{#k/6}* It's not happening, pal."],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['Romantic Advice', 'Mettaton', 'Where To Go Next', 'My Future', 'Exit']
                : [
                    ['Life Advice', '§fill=#ff0§Taking Charge (NEW)', 'Taking Charge'][
                    Math.min(SAVE.data.n.shop_bpants_advice, 2)
                    ],
                    'Mettaton',
                    postSIGMA()
                        ? 'Power Outage'
                        : ['Where We Are', '§fill=#ff0§Glyde (NEW)', 'Glyde'][Math.min(SAVE.data.n.shop_bpants_hub, 2)],
                    'Your Future',
                    'Exit'
                ],
        talkPrompt: () =>
            world.population === 0 || burger()
                ? world.bullied && !world.genocide && !burger()
                    ? '<09>{#p/basic}{#k/0}Take it from me, little bully.'
                    : '<09>{#p/basic}{#k/0}Take it from me, little murderer.'
                : '<09>{#p/basic}{#k/0}Take it from me, little buddy.',
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/7}* Romantic advice?',
                        "<32>{#k/0}* Little buddy, I've only got one piece of advice when it comes to getting romantic.",
                        "<32>{#k/1}* ... don't even try.",
                        "<32>{#k/4}* When the right person comes along, it'll be as dainty as dancing in the dark.",
                        '<32>{#k/0}* The fat old mole-rat might even like you back.'
                    ]
                    : world.population === 0 || burger()
                        ? [
                            '<32>{#p/basic}{#k/6}* Life advice...',
                            "<32>{#k/6}* Shucks, I'd have thought you'd be pretty knowledgable in that department.",
                            "<32>{#k/5}* Or maybe you're just more experienced with the opposite of life."
                        ]
                        : [
                            [
                                "<32>{#p/basic}{#k/6}* Listen up.\n* If you want to get ahead in life, you've got to learn to take charge.",
                                '<32>{#k/4}* My boss pushed me around for way too long, and I wasted way too much of my short life not telling him \"no.\"',
                                '<32>{#k/0}* When I finally stood up to him, well...',
                                '<32>{#k/2}* It did us both some good.'
                            ],
                            [
                                "<32>{#p/basic}{#k/6}* I'll try to make this as simple as possible for you, little buddy.",
                                '<32>* As nice as people are, sometimes they get caught in bad ways of thinking.',
                                '<32>{#k/4}* Short-sightedness.\n* Carelessness.\n* Abuse.',
                                '<33>{#k/4}* The nicest thing you can do for someone like that is to give them a piece of your mind. Tell them how wrong they are and make them think about it.',
                                '<32>{#k/7}* The more you let someone get comfortable with their bad way of life, the more they get stuck in those ways.',
                                "<32>{#k/0}* Don't let people get stuck."
                            ],
                            [
                                "<32>{#p/basic}{#k/1}* I'm not your counselor, pal.",
                                '<32>{#k/7}* ...',
                                '<32>{#k/0}* Sorry.\n* Just... remember my words.'
                            ]
                        ][Math.min(SAVE.data.n.shop_bpants_advice++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/2}* ...',
                        "<32>{#k/4}* I guess I can't make fun of the bastard forever.",
                        "<32>{#k/0}* One day, I'll have to do something new with my life...",
                        '<32>{#k/7}* ... and that day is coming up on me quickly now.',
                        '<32>{#k/6}* Don\'t worry, though.\n* My \"boyish charm\" isn\'t going anywhere ANY time soon.'
                    ]
                    : SAVE.data.b.killed_mettaton
                        ? ['<32>{#p/basic}{#k/8}* Mettaton.', '<32>{#k/4}* ...', "<32>{#k/6}* Yeah, he's dead."]
                        : (world.genocide || world.bad_robot) && 68 <= SAVE.data.n.plot
                            ? SAVE.data.n.shop_bpants_mtt2++ < 1
                                ? [
                                    '<32>{#p/basic}{#k/4}* Mettaton...',
                                    "<32>{#k/4}* I'd rant about him, but uh...\n* Since you killed him...",
                                    "<32>{#k/5}* I don't really think there's much to say."
                                ]
                                : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* I'm not going to repeat myself."]
                            : SAVE.data.n.shop_bpants_mtt1++ < 1
                                ? world.population === 0 || burger()
                                    ? [
                                        '<32>{#p/basic}{#k/4}* Mettaton...',
                                        "<32>{#k/6}* I'd rant about HIM, but YOU make him look like a saint.",
                                        '<32>{#k/5}* I guess you could call that an accomplishment... of a terrible, terrible sort.'
                                    ]
                                    : [
                                        '<32>{#p/basic}{#k/4}* Why does it always have to be about him...',
                                        "<32>{#k/0}* Yeah, he's a bit of an icon around here.\n* Everybody loves him...",
                                        '<32>{#k/6}* Except for yours truly, of course. I spit on him with every breath I take.',
                                        "<32>{#k/5}* No, really.\n* I've got a little figurine of him under the counter, and I make sure as much saliva as possible hits his face.",
                                        "<32>{#k/4}* You wouldn't BELIEVE the crap he put me through working here...",
                                        '<32>{#k/6}* After he got out of my way I gracefully stripped the shop of all the MTT-brand trimmings.',
                                        '<32>* Oh, and of course I renamed all the food items.',
                                        '<32>{#k/5}* I wanted to rename \"Legendary Hero\" to \"Her Ye Olde Gran\" but I figured that wouldn\'t fly well with the older folks.',
                                        '<32>{#k/0}* ...',
                                        '<32>{#k/7}* What?\n* Were you expecting me to talk about his business or something?'
                                    ]
                                : ['<32>{#p/basic}{#k/5}* ...', "<33>{#k/7}* I'm not going to repeat myself."],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/4}* Where to go, where to go...',
                        "<32>{#k/0}* On the new homeworld, I'd like to start a new shop with that old buddy of mine, Gerson.",
                        "<32>{#k/7}* He said he's content with just doing the finances, and that works for me.",
                        '<32>{#k/0}* ... as long as I get to spend some time with him.'
                    ]
                    : postSIGMA()
                        ? [
                            '<32>{#p/basic}{#k/7}* Come to think of it, it HAS started getting quiet around here.',
                            "<32>{#k/6}* Only problem is, I'm too busy enjoying my WORKING electricity.",
                            '<32>{#k/4}* Which may or may not be because I rigged a direct power feed from the CORE a while back.',
                            "<32>{#k/5}* Shh... don't tell anyone I told you that.\n* It's a trade secret."
                        ]
                        : world.population === 0 || burger()
                            ? [
                                '<32>{#p/basic}{#k/0}* ...',
                                "<32>{#k/0}* We're in hell, my friend.\n* Absolute hell.",
                                '<32>{#k/1}* ...',
                                "<32>{#k/3}* Gosh, isn't talking to you JUST SO MUCH FUN!?!?"
                            ]
                            : [
                                [
                                    '<32>{#p/basic}{#k/6}* Where we are, eh?',
                                    '<32>{#k/4}* This place is... a little weird...',
                                    '<32>{#k/0}* King Asgore had it built as a way to \"bring monsters together.\"',
                                    "<32>{#k/7}* Now it's... just kind of this place that exists.\n* There's food, there's rest, and sometimes they run shows here.",
                                    '<32>{#k/6}* Oh, and, this is where they host the OuterNet.\n* Bratty and Catty are in charge of the news.',
                                    "<32>{#k/4}* Well, actually, they're in charge of this place as a whole.",
                                    "<32>{#k/0}* After Mettaton left, I told them they could take over.\n* Besides, I've got my own thing going for me now...",
                                    "<32>{#k/2}* I guess I'm just a little tired.",
                                    "<32>{#k/3}* But hey, who has time for THAT when you've got people like GLYDE hanging around, huh!?"
                                ],
                                [
                                    '<32>{#p/basic}{#k/6}* Haha... let me tell you about this showboating know-it-all.',
                                    '<32>{#k/0}* Back when I worked for Mettaton, I regularly had to make this thing called a \"face steak.\"',
                                    '<32>{#k/1}* For the record, that\'s a steak with Mettaton\'s \"fabulous\" face on it.',
                                    '<32>{#k/3}* But Glyde?\n* Glyde loved it so much it decided to make its own \"steak enterprise\" by putting ITS face on steaks instead!',
                                    "<32>{#k/3}* And, as if that wasn't crazy enough, Glyde BID on me to be its first employee!\n* Like I'm up for auction or something!",
                                    "<32>{#k/4}* Of course, Mettaton wasn't going to let me go that easily, so I ended up staying here.",
                                    '<32>{#k/0}* In the end, Glyde never got what it wanted, and now it just goes around demanding people join its \"crusade.\"',
                                    '<32>{#k/1}* Oh well.\n* If things get really bad, I can just turn off the lights again...',
                                    "<32>{#k/7}* Maniacs like that fear the dark because they can't stand not being in control of every last situation they're in."
                                ],
                                [
                                    "<32>{#p/basic}{#k/4}* I've told you all I really know about Glyde.",
                                    "<32>{#k/7}* Maybe there's something buried somewhere in its past to explain why it acts this way...",
                                    "<32>{#k/1}* But that's anyone's guess."
                                ]
                            ][Math.min(SAVE.data.n.shop_bpants_hub++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#k/1}* What do I look like, a fortune teller?',
                        "<32>{#k/2}* I have no idea what's in your future.",
                        "<32>{#k/4}* But if I had to guess, it'll be better than your past.",
                        '<32>{#k/7}* From what Asgore was saying, humans never come here for particularly good reasons.',
                        '<32>{#k/0}* Except for that brawny kid.\n* They were just a really big fan of monsters, I guess.'
                    ]
                    : world.population === 0 || burger()
                        ? world.bullied && !burger()
                            ? [
                                '<32>{#p/basic}{#k/5}* My future, huh?\n* I dunno, little bully...',
                                '<32>{#p/basic}{#k/6}* You tell me.'
                            ]
                            : [
                                '<32>{#p/basic}{#k/5}* Ohhhhh trust me, my little whiny-heinie death-defying slaughter-happy murderer...',
                                "<32>{#k/6}* My future's secure.",
                                "<32>{#k/2}* Besides, an old buddy of mine told me how I can't be hurt here.",
                                "<32>{#k/5}* You're NEVER getting me."
                            ]
                        : [
                            '<32>{#p/basic}{#k/0}* MY future?\n* Little buddy...',
                            '<32>{#k/3}* You should be thinking about your future!',
                            '<32>{#k/4}* ...',
                            "<32>{#k/6}* Don't worry, pal.\n* With that rectangular rabble- rouser off my back, things are looking brighter by the day."
                        ]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },
    n_shop_gossip: {
        exit: [
            {
                b: '<16>{#k/0/0}* Like, see you later!',
                c: '<16>* Like, later and stuff!',
                s: true
            }
        ],
        item: () =>
            adultEvac()
                ? [
                    '0G - Space Junk',
                    SAVE.data.b.item_laser ? '0G - Laser Rifle?' : '0G - Laser Rifle',
                    SAVE.data.b.item_visor ? '0G - Tactical Visor?' : '0G - Tactical Visor',
                    SAVE.data.b.item_mystery_key ? '§fill=#808080§--- UNAVAILABLE ---' : '0G - Mystery Key',
                    'Exit'
                ]
                : [
                    '5G - Space Junk',
                    SAVE.data.b.item_laser ? '60G - Laser Rifle?' : '70G - Laser Rifle',
                    SAVE.data.b.item_visor ? '60G - Tactical Visor?' : '70G - Tactical Visor',
                    SAVE.data.b.item_mystery_key ? '§fill=#808080§--- UNAVAILABLE ---' : '400G - Mystery Key',
                    'Exit'
                ],
        itemInfo: () => [
            'Heals ??HP\nCould be\nanything.',
            SAVE.data.b.item_laser
                ? 'Weapon: 10AT\n($(x) AT)\nDifficult,\nbut powerful.\nReplicated.'
                : 'Weapon: 12AT\n($(x) AT)\nDifficult,\nbut powerful.',
            SAVE.data.b.item_visor
                ? 'Armor: 10DF\n($(x) DF)\nAiming made\neasier.\nReplicated.'
                : 'Armor: 12DF\n($(x) DF)\nAiming made\neasier.',
            'Special:\nCould lead\nanywhere.'
        ],
        itemPrompt: '<99>{#p/basic}{#k/0/9}{@fill=#d4bbff}You\nshould\nbuy ALL\nour stuff!',
        itemPurchase: [
            "<09>{#p/basic}{#k/1/8}{@fill=#d4bbff}Bratty!\nWe're gonna be rich!",
            '<09>{#p/basic}{#k/0/4}{@fill=#d4bbff}So are you gonna buy it??',
            '<09>{#p/basic}{#k/4/5}{@fill=#d4bbff}You need WAY more money.',
            "<10>{#p/human}(You're carrying too much.)"
        ],
        itemPurchasePrompt: () =>
            adultEvac()
                ? shopper.listIndex === 3
                    ? 'Add to your\nkeyring?'
                    : 'Take it?'
                : shopper.listIndex === 3
                    ? 'Add to your\nkeyring for\n$(x)G?'
                    : 'Buy it for\n$(x)G?',
        itemUnavailable: () =>
            adultEvac()
                ? '<09>{#p/basic}Nothing left.'
                : "<09>{#p/basic}{#k/5/1}{@fill=#d4bbff}We're all sold out!\nMee-YOW!",
        menu: () =>
            adultEvac() ? ['Take', 'Steal', 'Read', 'Exit'] : ['Buy', world.meanie ? 'Steal' : 'Sell', 'Talk', 'Exit'],
        menuPrompt1: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* Check it out!',
        menuPrompt2: '<23>{#p/basic}{#k/0/0}{@fill=#ffbbdc}* No rush or anything.',
        menuPrompt3: () =>
            world.bulrun ? '<23>{#p/basic}* ... but everybody ran.' : '<23>{#p/basic}* ... but nobody came.',
        note: () => [
            "<32>{#p/basic}* There's a series of notes here.",
            {
                b: '<16>* \"If you\'re reading this...\"',
                c: world.bullied
                    ? '<16>* \"Then, like, bad news you mega-annoying weirdo!\"'
                    : '<16>* \"Then, like, bad news you mega-evil weirdo!\"'
            },
            ...(SAVE.data.n.plot === 72 && !world.runaway
                ? [
                    {
                        b: '<16>* \"We\'re not gonna come back here after you, like...\"',
                        c: '<16>* \"... beat everyone up and stuff.\"'
                    },
                    {
                        b: '<16>* \"The new homeworld\'s calling, and it\'s gonna make us...\"',
                        c: '<16>* \"... super duper rich!\"'
                    },
                    {
                        b: '<16>* \"So, we don\'t, like, even need that shop anymore.\"',
                        c: '<16>* \"Yeah!!\"\n* \"Take whatever you want!\"'
                    },
                    {
                        b: '<16>* \"Anyway, these gel pens are running out, so...\"',
                        c: '<16>* \"That\'s about all we can say.\"'
                    },
                    {
                        b: '<16>* \"Not that you\'d care!\"',
                        c: '<16>* \"Nya ha ha!!!\"'
                    },
                    { b: '<16>* \"Signed,\n  Bratty <3\"', c: '<16>* \"Signed,\n  Catty <3\"' }
                ]
                : [
                    ...[
                        [
                            !world.badder_lizard
                                ? {
                                    b: '<16>* \"We\'re not gonna stick around while you just...\"',
                                    c: '<16>* \"... beat everyone up and stuff.\"'
                                }
                                : {
                                    b: '<16>* \"Alphys came through here, and she\'s taking us...\"',
                                    c: '<16>* \"... somewhere super duper safe!\"'
                                },
                            {
                                b: '<16>* \"But first, we gotta use up these gel pens.\"',
                                c: !world.badder_lizard
                                    ? '<16>* \"Yeah, we don\'t wanna waste pens!\"'
                                    : '<16>* \"Yeah, chill, Alphys!\"\n* \"We don\'t wanna waste pens!\"'
                            },
                            {
                                b: '<16>* \"And don\'t even think about stealing our stuff.\"',
                                c: '<16>* \"Yeah, creep!\"\n* \"Leave our junk alone!\"'
                            },
                            {
                                b: '<16>* \"Old second-hand junk, to be specific.\"',
                                c: '<16>* \"Yeah, our used antique store is CRAZY valuable!\"'
                            }
                        ],
                        [
                            {
                                b: '<16>* \"Mettaton came through here, and he\'s taking everyone...\"',
                                c: '<16>* \"... somewhere super duper safe!\"'
                            },
                            { b: '<16>* \"But Alphys...\"', c: '<16>* \"Alphys.\"' },
                            { b: '<16>* \"She seemed...\"', c: '<16>* \"... super duper pissed.\"' },
                            {
                                b: '<16>* \"I\'ve never seen her like that before.\"',
                                c: '<16>* \"I\'ve never seen ANYTHING like that before.\"',
                                s: true
                            },
                            { b: '<16>* \"And Mettaton...\"', c: '<16>* \"... isn\'t very happy either.\"' },
                            {
                                b: '<16>* \"He says he\'s gonna slap your face.\"',
                                c: '<16>* \"He says he\'s gonna kick your butt!\"',
                                s: true
                            },
                            { b: '<16>* \"Or did he say he\'d destroy you...?\"', c: '<16>* \"Uh... I forgot.\"' },
                            { b: '<16>* \"Well, I\'d be CRAZY afraid if I were you.\"', c: '<16>* \"God, TELL me about it...\"' }
                        ]
                    ][Math.max(world.bad_lizard - 2, 0)],
                    {
                        b: '<16>* \"Anyway, in closing, you\'re a total loser.\"',
                        c: '<16>* \"Yeah!\"\n* \"Loser!!\"\n* \"Nya ha ha!!!\"'
                    },
                    { b: '<16>* \"Signed,\n  Bratty <3\"', c: '<16>* \"Signed,\n  Catty <3\"', s: true }
                ])
        ],
        sell1: () =>
            adultEvac()
                ? ['<30>{#p/human}* (You took 5G from the till.)']
                : world.meanie
                    ? [
                        {
                            b: '<16>{#k/2/6}* Um, excuse me?',
                            c: '<16>{#k/2/6}* Like, what are you doing?'
                        },
                        {
                            b: "<16>{#k/1/0}* We don't hand out stuff for free.",
                            c: '<16>{#k/1/0}* Yeah, go steal somewhere else!'
                        }
                    ]
                    : SAVE.storage.inventory.has('glamburger') // NO-TRANSLATE

                        ? [
                            {
                                b: '<16>{#k/7/0}* Oh, wow.\n* You actually got one of those new \"Slamburgers.\"',
                                c: "<16>{#k/2/2}* GIMME GIMME!!\nI'll take your entire stock!!"
                            },
                            {
                                b: '<16>{#k/4/6}* God, Catty.\n* Try to have some self- control.',
                                c: '<16>{#k/4/4}* Sorry...'
                            },
                            {
                                b: "<16>{#k/3/5}* 'Cause they OBVIOUSLY brought that for ME.",
                                c: '<16>{#k/5/8}* NOOO WAYY!!!'
                            }
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                {
                                    b: "<16>{#k/0/6}* Thanks, but we, like, don't really need anything.",
                                    c: ''
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/0}* Well, maybe you're right."
                                }
                            ]
                            : [
                                {
                                    b: "<16>{#k/0/0}* Thanks, but we, like, don't really need anything.",
                                    c: '<16>{#k/0/8}* Oh my god, can you get us those new \"Slamburgers?\"'
                                },
                                {
                                    b: "<16>{#k/2/8}* We don't.\n* Really need.\n* Anything.",
                                    c: "<16>{#k/1/7}* Wait! I'll pay 1000G if you get Mettaton to autograph my butt!"
                                }
                            ],
        sell2: () =>
            adultEvac()
                ? ['<30>{#p/basic}* Nothing left.']
                : world.meanie
                    ? [
                        {
                            b: '<16>{#k/2/4}* ...',
                            c: '<16>{#k/2/4}* ...'
                        },
                        {
                            b: "<16>{#k/5/1}* We'd kick you out if this wasn't so silly.",
                            c: "<16>{#k/5/1}* We'd kick you out if you weren't so cute.",
                            s: true
                        }
                    ]
                    : [
                        {
                            b: '<16>{#k/1/0}* If you really want us to have something...',
                            c: '<16>{#k/1/2}* ... you could drop it off at the pickup location in Aerialis!'
                        },
                        {
                            b: '<16>{#k/2/0}* But how would they know where it is?',
                            c: "<16>{#k/2/4}* OMG you're right... they probably don't..."
                        },
                        {
                            b: "<16>{#k/5/8}* Guess you'll have to find it for yourself!",
                            c: "<16>* Guess you'll need to look for it yourself!",
                            s: true
                        }
                    ],
        talk: () =>
            SAVE.data.n.plot === 72
                ? ['Is Everyone Okay', 'Godlike Being', 'OuterNet Shutdown', 'The Humans', 'Exit']
                : [
                    'About You Two',
                    SAVE.data.n.plot < 68 ? 'Thrift Shop' : SAVE.data.b.killed_mettaton ? 'Mettaton' : 'Grand Finale',
                    ['Area Ownership', '§fill=#ff0§Burgie (NEW)', 'Burgie'][Math.min(SAVE.data.n.shop_gossip_hub, 2)],
                    ['Alphys', '§fill=#ff0§Royal Scientist (NEW)', '§fill=#ff0§Asgore (NEW)', 'Asgore'][
                    Math.min(SAVE.data.n.shop_gossip_alphys, 3)
                    ],
                    'Exit'
                ],
        talkPrompt: "<09>{#p/basic}{#k/0/0}{@fill=#ffbbdc}So, like, what's up?",
        talkText: [
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/4/6}* Huh?',
                            c: '<16>{#k/4/4}* Are we okay?'
                        },
                        {
                            
                            b: '<16>{#k/2/6/0}',
                            c: '',
                            s: true
                        },
                        '{*}{#s/meow}{%}',
                        {
                            b: "<16>{#k/6/8}* Mmm hm hm, you're too cute.",
                            c: "<16>* Of course we're okay!",
                            s: true
                        },
                        '{*}{#k/0/0/1}{%}'
                    ]
                    : [
                        {
                            b: "<16>{#k/0/0}* I'm Bratty, and this is my best friend, Catty.",
                            c: "<16>* I'm Catty, and this is my best friend, Bratty.",
                            s: true
                        },
                        {
                            
                            b: '<16>{#k/2/6/0}',
                            c: '',
                            s: true
                        },
                        '{*}{#s/meow}{%}',
                        {
                            b: '<16>{#k/5/8}* Mmm hm hm!',
                            c: '<16>* Nya ha ha!',
                            s: true
                        },
                        '{*}{#k/0/0/1}{%}'
                    ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/0/6}* It was like... woah.',
                            c: '<16>{#k/0/2}* No it was like... OH MY GOD.'
                        },
                        {
                            b: '',
                            c: '<16>{#k/0/1}* And if I ever met them...',
                            s: true
                        },
                        {
                            b: "<16>{#k/2/6}* Don't tell me.",
                            c: '',
                            s: true
                        },
                        {
                            b: "<16>{#k/5/8}* You'd totally just hang out them!",
                            c: "<16>* I'd totally date them!",
                            s: true
                        },
                        {
                            b: '<16>{#k/6/0}* Oh. Right. Of course you would.',
                            c: "<16>{#k/6/7}* Who WOULDN't want to date a being with godlike powers?"
                        }
                    ]
                    : SAVE.data.n.plot < 68
                        ? [
                            {
                                b: "<16>{#k/0/6}* It's like, a second-hand store.",
                                c: "<16>{#k/0/2}* No it's like, a BARGAIN outlet!"
                            },
                            {
                                b: '',
                                c: '<16>{#k/2/9}* And get a load of our GENIUS business model...',
                                s: true
                            },
                            {
                                b: '<16>{#k/0/6}* People send us their old junk...',
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/5/8}* ... so we can sell it like new again!',
                                c: '<16>* ... so we can sell it like new again!',
                                s: true
                            },
                            {
                                b: "<16>{#k/0/1}* You won't find a shop this sick anywhere else.",
                                c: "<16>* You won't find stuff like ours anywhere else.",
                                s: true
                            }
                        ]
                        : SAVE.data.b.killed_mettaton
                            ? [
                                {
                                    b: '<16>{#k/4/4}* Mettaton, right?',
                                    c: '<16>* Mettaton, huh?',
                                    s: true
                                },
                                {
                                    b: '<16>{#k/2/6/0}',
                                    c: '',
                                    s: true
                                },
                                {
                                    b: "<16>{#k/7/5}* We don't really want to talk about him.",
                                    c: "<16>{#k/7/5}* He's WAY better than you."
                                }
                            ]
                            : [
                                {
                                    b: '<16>{#k/1/7}* Of course.',
                                    c: '<16>* OMG yes!',
                                    s: true
                                },
                                {
                                    b: '<16>{#k/0/0}* You and Mettaton really put on a performance!',
                                    c: '<16>{#k/0/2}* Yeah, you guys really knocked it outta the park!'
                                },
                                {
                                    b: '<16>{#k/4/6}* I wish I could move like that on stage...',
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/8}* You wanna see some moves?\n* I've got moves!",
                                    s: true
                                },
                                {
                                    b: '<16>{#k/1/8}* I could totally set up a dance off for you guys.',
                                    c: "<16>{#k/2/7}* You should totally invite the human while you're at it!"
                                },
                                {
                                    b: "<16>{#k/0/0}* ... we'll see.",
                                    c: '',
                                    s: true
                                }
                            ],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/0/6}* Yeah, it uses WAY too much power now.',
                            c: "<16>{#k/0/5}* The force field was the CORE's main energy source."
                        },
                        {
                            b: '<16>{#k/2/6}* But when we get to the new homeworld...',
                            c: '<16>* But when we settle into our new home...',
                            s: true
                        },
                        {
                            b: '',
                            c: "<16>{#k/0/1}* We'll be back in business.",
                            s: true
                        },
                        {
                            b: '<16>{#k/2/6}* Running a new OuterNet could make us a lot of money...',
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: '<16>{#k/4/0}* We could buy a lifetime supply of Slamburgers!',
                            s: true
                        },
                        {
                            b: '<16>{#k/0/6}* Catty.\n* Why is that your priority.',
                            c: "<16>{#k/0/7}* Why WOULDN'T it be my priority!"
                        }
                    ]
                    : [
                        [
                            {
                                b: "<16>{#k/2/1}* Oh yeah, we're technically the owners here.",
                                c: '<16>* Oh yeah, we practically RULE this zone.', 
                                s: true
                            },
                            ...(SAVE.data.b.killed_mettaton
                                ? [
                                    {
                                        b: '<16>{#k/2/6}* So like, originally...',
                                        c: '<16>* ... yeah?'
                                    },
                                    {
                                        b: '<16>{#k/0/5}* Um...\n* Never mind.',
                                        c: ''
                                    },
                                    {
                                        b: '',
                                        c: "<16>{#k/6/8}* Oh, gotcha.\n* Yeah, let's not bring THAT up!"
                                    },
                                    {
                                        b: "<16>{#k/1/0}* Anyway, Burgie's the one who put us in charge.",
                                        c: "<16>* We haven't questioned it since."
                                    }
                                ]
                                : [
                                    {
                                        b: '<16>{#k/2/1}* So like, originally, Mettaton was in charge here, right?',
                                        c: '<16>{#k/1/1}* Totally in charge.'
                                    },
                                    {
                                        b: '<16>{#k/2/5}* But then...',
                                        c: '<16>* Then...'
                                    },
                                    {
                                        b: '<16>{#k/4/4}* Burgie decided to \"overthrow\" him.',
                                        c: '',
                                        s: true
                                    },
                                    {
                                        b: '',
                                        c: '<16>{#k/2/4}* By having, like, a really strong word with him or something.',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6/0}',
                                        c: '',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* I think he blackmailed him.',
                                        c: '<16>* I think he had an accomplice.',
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/1/0/1}* Anyway, he said we could be the new owners.',
                                        c: "<16>* We haven't questioned it since."
                                    }
                                ])
                        ],
                        [
                            {
                                b: '<16>{#k/2/0}* Burgie?',
                                c: '',
                                s: true
                            },
                            {
                                b: "<16>{#k/0/5}* Yeah, he's alright.",
                                c: "<16>* Eh, he's cool.",
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* He used to act all weird around us, but...',
                                c: '<16>* ... he kinda keeps to himself now.'
                            },
                            {
                                b: '<16>{#k/0/5}* Like, the last time we heard from him...',
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/0/5}* He said he was \"done chasing fantasies\" or something.',
                                c: '<16>* He said he was \"done seeking love\" or whatever.',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* Kinda sounds like...',
                                c: '<16>* Sorta feels like...',
                                s: true
                            },
                            {
                                b: '<16>{#k/5/8}* He TOTALLY saw us as a fantasy.',
                                c: '<16>* He DEFINITELY had a crush on us.',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/4/5}* Too bad he never asked us out, huh?',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/5}* Catty, we would have said no.',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/2/1}* ... or would we have said yes?',
                                s: true
                            },
                            {
                                b: '<16>{#k/4/1}* No.',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/4/8}* Yes.',
                                s: true
                            },
                            {
                                b: '<16>{#k/1/8}* No.',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/1/7}* YES!',
                                s: true
                            },
                            {
                                b: '<16>{#k/4/7}* ...',
                                c: '',
                                s: true
                            },
                            {
                                b: "<16>{#k/5/6}* Catty, don't you have ANY standards?",
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/5/8}* Nope!!!',
                                s: true
                            }
                        ],
                        [
                            {
                                b: "<16>{#k/0/0}* There's not much more to say about Burgie, but-",
                                c: '<16>{#k/0/8}* ... no, wait!\n* Can you go ask him to make us some food?'
                            },
                            {
                                b: '<16>{#k/4/8}* Catty!',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: "<16>{#k/4/1}* What?\n* You know I'd take it from a bad boy like him any day.",
                                s: true
                            },
                            {
                                b: '<16>{#k/2/4/0}',
                                c: '',
                                s: true
                            },
                            '{*}{#s/meow}{%}',
                            {
                                b: '<16>{#k/2/8}* You did not just say that out loud.',
                                c: '<16>* Mee-YOW!',
                                s: true
                            },
                            '{*}{#k/0/0/1}{%}'
                        ]
                    ][Math.min(SAVE.data.n.shop_gossip_hub++, 2)],
            () =>
                SAVE.data.n.plot === 72
                    ? [
                        {
                            b: '<16>{#k/2/0}* The humans?',
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: '<16>{#k/0/0}* Oh yeah, Alphys totally had us adopt one.',
                            s: true
                        },
                        {
                            b: "<16>{#k/2/5}* I mean, they're kind of asleep right now, but...",
                            c: '',
                            s: true
                        },
                        {
                            b: '',
                            c: "<16>{#k/7/5}* ... they'll wake up eventually.",
                            s: true
                        },
                        {
                            b: '<16>{#k/2/6}* I wonder what they\'ll have to say about that \"archive\" thing...',
                            c: '<16>{#k/2/6}* Yeah, THAT thing...'
                        },
                        {
                            b: '',
                            c: "<16>{#k/2/4}* Isn't that where Asgore was keeping ALL the humans?",
                            s: true
                        },
                        {
                            b: '<16>{#k/0/0}* How can you keep a secret like that.',
                            c: '<16>* How was that even POSSIBLE!',
                            s: true
                        }
                    ]
                    : [
                        [
                            { b: '<16>{#k/4/4}* Oh my god.\n* Alphys.', c: '<16>* Oh my god, ALPHYS.', s: true },
                            {
                                b: '<16>{#k/5/8}* She used to live in our housing spire!',
                                c: '<16>* She was like a big sister!',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/6}* I mean, like, if your big sister...',
                                c: '<16>{#k/2/2}* ... takes you on rip- roaring interstellar trash hunts!'
                            },
                            {
                                b: '<16>{#k/0/0}* She showed us the coolest ways to find stuff.',
                                c: '<16>* She built up a WICKED sci-fi collection.',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/4}* Then she became the royal scientist...',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: "<16>{#k/0/5}* ... she doesn't really have time for trash-hunting anymore.",
                                s: true
                            }
                        ],
                        [
                            {
                                b: '<16>{#k/0/6}* So Alphys has always been, like...',
                                c: '<16>{#k/0/0}* ... super duper smart.'
                            },
                            { b: '<16>{#k/2/4}* Like...', c: '<16>* UNNATURALLY smart.' },
                            {
                                b: '<16>{#k/0/0}* Like, she can calculate a derivative in her head...',
                                c: '<16>{#k/0/2}* ... in five seconds FLAT!'
                            },
                            {
                                b: "<16>{#k/0/0}* It's MEGA impressive and all...",
                                c: '',
                                s: true
                            },
                            {
                                b: '<16>{#k/2/5}* ... but as a result, she struggles with her impulses sometimes.',
                                c: '',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/1/6}* I remember that time she called in half the Royal Guard...',
                                s: true
                            },
                            {
                                b: '',
                                c: '<16>{#k/5/4}* ... when she thought she saw some \"interesting trash.\"',
                                s: true
                            },
                            {
                                b: "<16>{#k/2/6}* It's like...",
                                c: "<16>* She doesn't process things the way most people do."
                            },
                            {
                                b: "<16>{#k/5/8}* But we love her for that, don't we?",
                                c: "<16>* But we still think she's A-MAZ-ING!",
                                s: true
                            },
                            {
                                b: '<16>{#k/4/0}* So like... OBVIOUSLY Asgore made her the royal scientist.',
                                c: '<16>{#k/0/2}* Oh, for sure!'
                            }
                        ],
                        [
                            {
                                b: '<16>{#k/0/0}* Oh right, THAT goofy goober.',
                                c: '<17>{#k/0/8}* Oh yeah, THAT furry fuzzball!',
                                s: true
                            },
                            {
                                b: "<16>{#k/2/0}* So like, here's the thing about Asgore...",
                                c: "<16>* ... he's one of the NICEST guys you'll ever meet."
                            },
                            ...[
                                [
                                    {
                                        b: '<16>{#k/2/0}* But, at the same time...',
                                        c: '<16>{#k/2/4}* ... the stuff everyone wants him to do...'
                                    },
                                    {
                                        b: "<16>{#k/4/5}* ... it's kind of gross.",
                                        c: "<16>* ... it's just plain awful.",
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* I heard Undyne lobbied to expand the Royal Guard.',
                                        c: "<16>{#k/2/6}* Yeah, didn't Asgore, like, not even want one to begin with?"
                                    }
                                ],
                                [
                                    {
                                        b: '<16>{#k/2/0}* But, at the same time...',
                                        c: "<16>{#k/2/4}* ... the stuff you've been up to out there..."
                                    },
                                    {
                                        b: "<16>{#k/4/5}* ... well, it's making his job a little tougher.",
                                        c: "<16>* ... well, it's making his life a little harder.",
                                        s: true
                                    },
                                    {
                                        b: '<16>{#k/2/6}* Like...',
                                        c: "<16>{#k/2/6}* ... maybe try NOT to kill anyone else, y'know?"
                                    }
                                ]
                            ][world.bad_lizard],
                            {
                                b: '<16>{#k/3/6}* Gosh.\n* I really wanna give him a hug right now.',
                                c: '<16>{#k/3/2}* Yeah, we should TOTALLY squeeze the life outta him later!'
                            },
                            {
                                b: '<16>{#k/4/5/0}* ...',
                                c: '<16>* ...',
                                s: true
                            },
                            '{*}{#s/meow}{%}',
                            {
                                b: '<16>{#k/5/8}* Catty, no!',
                                c: '<16>* Nya ha ha!',
                                s: true
                            },
                            '{*}{#k/0/0/1}{%}'
                        ],
                        [
                            [
                                {
                                    b: "<16>{#k/0/0}* Hey, there's no need to be afraid of him.",
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/1}* Yeah, he's WAY too adorable for that.",
                                    s: true
                                },
                                {
                                    b: '<16>{#k/5/1}* Way too adorable!',
                                    c: '',
                                    s: true
                                }
                            ],
                            [
                                {
                                    b: "<16>{#k/0/0}* Hey, I'm sure he'll understand why you did what you did.",
                                    c: '',
                                    s: true
                                },
                                {
                                    b: '',
                                    c: "<16>{#k/0/2}* Yeah, he's like, Asgore after all!",
                                    s: true
                                },
                                {
                                    b: "<16>{#k/4/6}* It's basically his job.",
                                    c: '',
                                    s: true
                                }
                            ]
                        ][world.bad_lizard]
                    ][Math.min(SAVE.data.n.shop_gossip_alphys++, 3)]
        ],
        zeroPrompt: '<09>{#p/basic}...'
    },

    s_save_aerialis: {
        a_start: {
            name: 'Aerialis - Lab',
            text: () =>
                SAVE.data.n.plot < 65
                    ? ['<32>{#p/human}* (The Royal Lab looms ahead, filling you with determination.)']
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* (Knowing most of your journey has been recorded from inside the Royal Lab...)',
                            '<32>* (The thought fills you with determination.)'
                        ]
                        : [
                            '<32>{#p/human}* (Knowing your every move is being recorded from inside the Royal Lab...)',
                            '<32>* (The thought fills you with determination.)'
                        ]
        },
        a_path3: {
            name: 'Aerialis - Liftway',
            text: ['<32>{#p/human}* (Hovering from place to place fills you with determination.)']
        },
        a_elevator1: {
            name: 'Aerialis - R1 Elevator',
            text: () =>
                SAVE.data.n.plot < 65
                    ? ['<32>{#p/human}* (Explosion-fueled joyrides fill you with determination.)']
                    : SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/human}* (Despite the fact you might never get to use a jetpack again...)',
                            "<32>{#p/human}* (The adventures you've had on the outpost as a whole fill you with determination.)"
                        ]
                        : [
                            '<32>{#p/human}* (Despite the fact you might never get to use a jetpack again...)',
                            "<32>{#p/human}* (The adventures you've had thus far fill you with determination.)"
                        ]
        },
        a_mettaton2: {
            name: 'Aerialis - Stage Two',
            text: () =>
                SAVE.data.n.plot < 65
                    ? SAVE.data.b.a_state_hapstablook
                        ? [
                            '<32>{#p/human}* (Pondering the backstory of a certain TV superstar fills you with determination.)'
                        ]
                        : ["<32>{#p/human}* (Mettaton's ludicrous hijinks fill you with determination.)"]
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/human}* (Taking a step back before your upcoming performance fills you with determination.)']
                        : world.bad_robot
                            ? ['<32>{#p/human}* (Reflecting on your road to conflict fills you with determination.)']
                            : SAVE.data.b.killed_mettaton
                                ? ['<32>{#p/human}* (Reflecting on such an anti- climactic ending fills you with determination.)']
                                : SAVE.data.b.a_state_hapstablook
                                    ? ['<32>{#p/human}* (Knowing how far Mettaton has come fills you with determination.)']
                                    : ['<32>{#p/human}* (Reflecting on your road to superstardom fills you with determination.)']
        },
        a_split: {
            name: 'Aerialis - Fountain',
            text: () =>
                SAVE.data.n.plot < 65
                    ? SAVE.data.b.a_state_hapstablook
                        ? ["<32>{#p/human}* (The anticipation of Mettaton's intervention fills you with determination.)"]
                        : ['<32>{#p/human}* (This fountain in the middle of nowhere fills you with determination.)']
                    : SAVE.data.n.plot < 68
                        ? ['<32>{#p/human}* (Gazing upon this fountain once again fills you with determination.)']
                        : world.bad_robot || SAVE.data.b.killed_mettaton
                            ? [
                                '<32>{#p/human}* (The punch in the fountain has turned bitter.)',
                                '<32>* (This, of course, fills you with determination.)'
                            ]
                            : SAVE.data.b.a_state_hapstablook
                                ? [
                                    '<32>{#p/human}* (The punch in the fountain has turned savory.)',
                                    '<32>* (This, of course, fills you with determination.)'
                                ]
                                : [
                                    '<32>{#p/human}* (The punch in the fountain tastes the same as before.)',
                                    '<32>* (This, of course, fills you with determination.)'
                                ]
        },
        a_aftershow: {
            name: 'Aerialis - Rec Center',
            text: () =>
                SAVE.data.b.ubershortcut
                    ? ['<32>{#p/human}* (Taxi rides to unfamiliar places fill you with determination.)']
                    : 68 <= SAVE.data.n.plot
                        ? ['<32>{#p/human}* (Returning to this corner of corny comforts fills you with determination.)']
                        : SAVE.data.b.a_state_hapstablook
                            ? ["<32>{#p/human}* (Learning Mettaton's backstory fills you with determination.)"]
                            : ['<32>{#p/human}* (Over-dramatic musicals fill you with determination.)']
        },
        a_core_entry1: {
            name: 'Aerialis - CORE',
            text: ['<32>{#p/human}* (The cold and computerized aesthetic in this area fills you with determination.)']
        },
        a_core_checkpoint: {
            name: 'Aerialis - Maintenance Zone',
            text: () =>
                SAVE.data.b.ubershortcut
                    ? ['<32>{#p/human}* (The air is calm and peaceful, filling you with determination.)']
                    : SAVE.data.n.plot < 68
                        ? ["<32>{#p/human}* (The anticipation of Mettaton's grand finale fills you with determination.)"]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Knowing the CORE will soon run out of power...)',
                                '<32>{#p/human}* (It fills you with determination.)'
                            ]
                            : [
                                '<32>{#p/human}* (The thought of unnecessarily backtracking to the CORE...)',
                                '<32>{#p/human}* (It fills you with determination.)'
                            ]
        }
    }
};


// END-TRANSLATE
