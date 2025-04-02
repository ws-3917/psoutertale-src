import { ca_state, cf2_state } from '../../../code/citadel/extras';
import { asrielinter, cs_state } from '../../../code/common/api';
import { spawn } from '../../../code/systems/core';
import { battler, calcLV, choicer, instance, pager, player, postSIGMA, world } from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';
import { CosmosUtils } from '../../../code/systems/storyteller';

// START-TRANSLATE

export default {
    a_citadel: {
        youvedoneitnow: [
            [
                '<32>{#p/human}* (Você sente a escuridão preencher dentro do seu corpo.)',
                '<32>{#p/human}* (Seu desejo é que tudo seja apenas um sonho ruim.)'
            ],
            [
                '<32>{#p/human}* (Você tenta seu melhor para lutar contra, mas nada acontece.)',
                '<32>{#p/human}* (Você deseja desesperadamente se tornar livre, mas nada.)'
            ],
            [
                '<32>{#p/human}* (Você chama por ajuda, mas ninguém veio.)',
                '<32>{#p/human}* (Você deseja fazer tudo isso desaparecer.)'
            ],
            ['<32>{#p/human}* (...)', '<32>{#p/human}* (Você respira fundo e se prepara para o fim da jornada.)'],
            ['<32>{#p/human}* (...)', '<32>{#p/human}* (Você sabe o que precisa ser feito.)']
        ],
        hypertext: {
            count: 'Reinício em $(x)',
            death1: ['{#p/human}(Você respira fundo.)', "(Você se enche de determinação.)"],
            death2: [
                "{#p/human}{#v/1}{@fill=#42fcff}Tudo ficará bem no fim...",
                '{@fill=#42fcff}Apenas mantenha-se firme...'
            ],
            death3: ['{#p/human}{#v/2}{@fill=#ff993d}Não é possível desistir agora.', '{@fill=#ff993d}Volta já pra cá!'],
            death4: ["{#p/human}{#v/3}{@fill=#003cff}Você sabe do que é capaz.", "{@fill=#003cff} Não recue agora!"],
            death5: [
                '{#p/human}{#v/4}{@fill=#d535d9}Você sabe que pode sobreviver a isto...',
                '{@fill=#d535d9}Continue em frente.'
            ],
            death6: [
                "{#p/human}{#v/5}{@fill=#00c000}Você é a última esperança deste mundo...",
                '{@fill=#00c000}Acredite em si!'
            ],
            death7: ["{#p/human}{#v/6}{@fill=#faff29}É apenas uma questão de tempo."],
            cyan1: [
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}Uma alma perdida te chama.',
                '<99>{*}{@fill=#faff29}Com {@mystify=PATIENCE} PACIÊNCIA {@mystify=}, ela poderá escapar.',
                '<99>{*}{#p/human}{#v/1}{@fill=#42fcff}Você deve alcançar meu Little Dipper...',
                '<99>{*}{#p/human}(Pressione [Z] para teletransportar.)'
            ],
            cyan2: [
                '<99>{*}{#p/human}{#v/1}{@fill=#42fcff}A entidade aguarda.',
                '<99>{*}{@fill=#42fcff}Com PACIÊNCIA, você sobreviverá...'
            ],
            orange1: [
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}Uma alma perdida te chama.',
                '<99>{*}{@fill=#faff29}Com {@mystify=BRAVERY}BRAVEZA{@mystify=}, ela poderá escapar..',
                "<99>{*}{#p/human}{#v/2}{@fill=#ff993d}Não saia sem minha Luva Forte!",
                '<99>{*}{#p/human}(Pressione [Z] para explodir.)'
            ],
            orange2: [
                '<99>{*}{#p/human}{#v/2}{@fill=#ff993d}A entidade paira acima...',
                '<99>{*}{@fill=#ff993d}Com BRAVEZA você poderá vence-la! '
            ],
            blue1: [
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}Uma alma perdida te chama.',
                '<99>{*}{@fill=#faff29}Com {@mystify=INTEGRITY}INTEGRIDADE{@mystify=}, Ela pode escapar.',
                "<99>{*}{#p/human}{#v/3}{@fill=#003cff}Você precisará das minhas Botas Flutuantes."
            ],
            blue2: [
                '<99>{*}{#p/human}{#v/3}{@fill=#003cff}A entidade se mantém em posição.',
                '<99>{*}{@fill=#003cff}Com INTEGRIDADE, você irá supera-la!'
            ],
            purple1: [
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}Uma alma perdida te chama.',
                '<99>{*}{@fill=#faff29}Com {@mystify=PERSEVERANCE}PERSEVERANÇA{@mystify=}, ela pode escapar.',
                '<99>{*}{#p/human}{#v/4}{@fill=#d535d9}Um único Datapad por te levar longe.'
            ],
            purple2: [
                '<99>{*}{#p/human}{#v/4}{@fill=#d535d9}A entidade está perdendo equilíbrio.',
                '<99>{*}{@fill=#d535d9}Com PERSEVERANÇA, você poderá derruba-la!'
            ],
            green1: [
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}Uma alma perdida te chama.',
                '<99>{*}{@fill=#faff29}Com {@mystify=KINDNESS}BONDADE{@mystify=}, ela pode escapar.',
                '<99>{*}{#p/human}{#v/5}{@fill=#00c000}O Tablaphone irá me libertar!'
            ],
            green2: [
                '<99>{*}{#p/human}{#v/5}{@fill=#00c000}A entidade está desestabilizada... ',
                '<99>{*}{@fill=#00c000}Com BONDADE, você poderá ofusca-la...'
            ],
            yellow: [
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}As ALMAS perdidas te chamam.',
                '<99>{*}{@fill=#faff29}Com JUSTIÇA, você as respondeu.',
                '<99>{*}{@fill=#faff29}Você as libertou de suas prisões.',
                '<99>{*}{#p/human}{#v/1}{@fill=#42fcff}Até o fim.',
                "<99>{*}{#p/human}{#v/2}{@fill=#ff993d}Você é um herói!",
                "<99>{*}{#p/human}{#v/3}{@fill=#003cff}Você fez a escolha certa.",
                '<99>{*}{#p/human}{#v/4}{@fill=#d535d9}Muito obrigado...',
                "<99>{*}{#p/human}{#v/5}{@fill=#00c000}Você é o melhor...!",
                '<99>{*}{#p/human}{#v/6}{@fill=#faff29}Nosso poder é seu agora.',
                '<99>{*}\n{@fill=#faff29}Com isso a entidade irá colapsar.',
                '<99>{*}\n{@fill=#faff29}Então...',
                '<99>{*}{@fill=#faff29}... Você fará aquilo que deve.',
                '<99>{*}\n{@fill=#faff29}Agora, acabe com isso!',
                '<99>{*}{#p/human}(Pressione [Z] para atirar.)'
            ],
            boot: 'RECOMEÇANDO...',
            init: 'PRONTO',
            warn: 'ATENÇÃO...',
            file1saved: 'ARQUIVO 1 SALVO',
            file1loaded: 'ARQUIVO 1 CARREGADO',
            file2saved: 'ARQUIVO 2 SALVO',
            file2loaded: 'ARQUIVO 2 CARREGADO',
            file3saved: 'ARQUIVO 3 SALVO',
            file3loaded: 'ARQUIVO 3 CARREGADO',
            file4saved: 'ARQUIVO 4 SALVO',
            file4loaded: 'ARQUIVO 4 CARREGADO',
            file5saved: 'ARQUIVO 5 SALVO',
            file5loaded: 'ARQUIVO 5 CARREGADO',
            file6saved: 'ARQUIVO 6 SALVO',
            file6loaded: 'ARQUIVO 6 CARREGADO'
        },
        noequip: ['<32>{#p/human}* (Você decide não equipar.)'],
        genotext: {
            monologue: [
                (re: boolean) => [
                    ...(re
                        ? ['<26>{#p/asriel2}{#f/13} * \nComo eu estava dizendo...']
                        : ["<25>{#p/asriel2}{#f/13}* Vou ser sincero..."]),
                    "<25>{#f/16}* ... Está não é a primeira vez que quis destruir o Outpost.",
                    "<25>{#f/15}* Cara, eu já vi centenas de milhares de linhas do tempo.",
                    '<25>{#f/23}* Mas, não importava o que eu fazia...',
                    "<25>{#f/16}* Sempre existiu algo faltando."
                ],
                (re: boolean) => [
                    '<25>{#p/asriel2}{#f/15}* Antes, quando eu acordei como uma estrela...',
                    "<25>{#f/16}* Eu não tinha idéia de como eu havia chegado ali ou o que fazer.",
                    "<25>{#f/13}* Não pude sentir meus braços... Nem mesmo sentir minhas pernas...",
                    '<25>{#f/13}* E não importou quantas vezes eu chamei por ajuda...',
                    '<25>{#f/23}* ...\nClamei... por ajuda...',
                    '<25>{#f/7}* ...',
                    '<25>{#f/6}* ... Ninguém veio.'
                ],
                (re: boolean) => [
                    ...(re
                        ? ["<25>{#p/asriel2}{#f/6}* \nComo eu estava dizendo, depois de acordar como estrela, eu não me sentia o mesmo."]
                        : []),
                    "<25>{#p/asriel2}{#f/15}* Mais do que isso... eu não era capaz de sentir amor, também.",
                    '<25>{#f/23}* Eu estava com tanto medo... Eu só queria voltar ao normal.',
                    "<25>{#f/13}* Eu fui atrás do papai, na esperança de que ele poderia me ajudar.",
                    "<25>{#f/17}* Ele prometeu que cuidaria de mim pelo tempo necessário...",
                    "<25>{#f/13}* ... mas no fim, ele não foi capaz de me salvar."
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            "<25>{#p/asriel2}{#f/13}*\nComo eu estava dizendo, após acordar como uma estrela, eu não me sentia o mesmo.",
                            "<25>{#f/13}* Então, após meu pai não ser capaz de me ajudar...",
                            '<25>{#f/16}* Eu fui ver a mamãe.'
                        ]
                        : ['<26>{#p/asriel2}{#f/16}* Então, eu fui ver a mamãe.']),
                    "<25>{#f/13}* Claramente, ela saberia o que fazer, certo?",
                    "<25>{#f/17}* Ela fez tanto por mim no passado, então...",
                    "<25>{#f/23}* Se qualquer pessoa, de todas, poderia me ajudar... seria ela."
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            "<25>{#p/asriel2}{#f/13}*\nComo eu estava dizendo, após acordar como uma estrela, eu não me sentia o mesmo.",
                            "<26>{#f/16}* Eu tentei falar com meus pais, mas ele não conseguiram me ajudar."
                        ]
                        : ["<25>{#p/asriel2}{#f/16}* ... mas não funcionou."]),
                    "<25>{#f/13}* Perceber que eu seria assim para sempre...",
                    '<25>{#f/13}* Perceber que nada, nem ninguém, poderia me ajudar...',
                    '<26>{#f/23}* Eu só queria que tudo isso acabasse.',
                    '<25>{#f/15}* Eu estava... pronto para que tudo isso acabasse.',
                    '<25>{#f/16}* ... Então...\n* No momento em que eu cometi o ato...',
                    '<25>{#f/7}* Um brilho tomou meus olhos...',
                    '<25>{#f/6}* Sem perceber, eu estava de volta onde tudo havia começado.'
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            '<25>{#p/asriel2}{#f/10}* Onde nós estávamos?',
                            '<26>{#f/6}* ... ah claro.\n* Então eu estava exatamente onde comecei.'
                        ]
                        : []),
                    "<25>{#p/asriel2}{#f/13}* Inicialmente, eu não entendi como havia chegado ali...",
                    '<25>{#f/15}* ... então, eu tentei voltar propositalmente.',
                    '<25>{#f/16}* Eu foquei minha mente em voltar para trás de novo e... funcionou.',
                    "<25>{#f/15}* De alguma forma, eu havia ganho o poder de voltar no tempo.",
                    "<25>{#f/17}* E isso foi quando me senti atingido...",
                    "<25>{#f/23}* Eu usei meu novo poder para ser uma força do bem.",
                    "<25>{#f/15}* Eu pensei que, já que eu não posso me ajudar...",
                    '<25>{#f/16}* Talvez eu possa ajudar outras pessoas.'
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            '<25>{#p/asriel2}{#f/10}* Onde nós estávamos?',
                            '<25>{#f/16}* ... ah claro.\n* Então eu comecei por ajudar eles.'
                        ]
                        : []),
                    "<25>{#p/asriel2}{#f/23}* Eu vou admitir, no começo foi bem difícil...",
                    '<25>{#f/15}* ... porém, quanto mais eu fazia, melhor eu ficava.',
                    '<25>{#f/5}* Depois de um tempo, eu poderia até mesmo fazer isso de olhos fechados.',
                    '<25>{#f/9}* E bem.\n* As vezes eu fiz.',
                    '<25>{#f/13}* E, claro, talvez eu estivesse me achando demais...',
                    '<25>{#f/9}* Mas o que isso importa?',
                    '<25>{#f/5}* Acima de tudo, eu ainda estava ajudando eles...',
                    '<25>{#f/15}* ... salvando eles...',
                    '<25>{#f/15}* Sendo uma boa pessoa e tals.'
                ],
                (re: boolean) => [
                    ...(re ? ['<25>{#p/asriel2}{#f/15}* Como eu disse antes, eu comecei ajudando eles.'] : []),
                    '<25>{#p/asriel2}{#f/16}* Após um tempo, eu comecei a perceber uma coisa.',
                    '<25>{#f/15}* As mesmas respostas, os mesmos destinos...',
                    "<25>{#f/16}* Ser legal o tempo todo já não estava mais me satisfazendo.",
                    '<25>{#f/6}* E, sim, antes de você perguntar, eu tentei ser fofo.',
                    '<25>{#f/7}* Mas até mesmo isso começou a se tornar entendiante.',
                    "<25>{#f/10}* Eu poderia ter seguido em frente, mas qual seria o ponto?",
                    '<25>{#f/6}* Era hora de tentar algo diferente.'
                ],
                (re: boolean) => [
                    ...(re
                        ? ["<25>{#p/asriel2}{#f/6}* Como eu disse antes, eu decidi que não seria mais bonzinho o tempo todo."]
                        : []),
                    "<25>{#p/asriel2}{#f/4}* Agora, nem havia muito o que fazer no começo...",
                    '<25>{#f/3}* Apenas alguns xingamentos aqui e ali.',
                    '<25>{#f/10}* Uma parte de mim sentiu-se mal, porém o que eu tinha a perder?',
                    '<25>{#f/6}* Claro, as coisas começaram a repetir, me tornei desaforado.',
                    '<25>{#f/8}* Um insulto aqui, outro ali, alguns desmerecimentos...',
                    '<25>{#f/7}* Eventualmente, eu parei de me sentir mal pelo que fazia.',
                    "<25>{#f/9}* Não é como se eu estivesse matando eles ou coisa do tipo."
                ],
                (re: boolean) => [
                    ...(re ? ["<26>{#p/asriel2}{#f/4}* Como eu disse antes, eu comecei a me tornar uma pessoa egoísta."] : []),
                    '<25>{#p/asriel2}{#f/15}* Aí, eu pensei comigo mesmo... Se eu atacar eles...',
                    "<25>{#f/16}* Estaria tudo bem, contato que eles não morram.",
                    "<25>{#f/10}* Qual seria o problema?\n* Monstros se curam com facilidade, certo?",
                    "<25>{#f/4}* Se tudo desse errado, eu poderia simplesmente resetar e ficaria bem.",
                    "<25>{#f/3}* ...mal sabia eu como seria minha reação se isso acontecesse."
                ],
                (re: boolean) => [
                    ...(re ? ["<26>{#p/asriel2}{#f/3}* Como eu estava dizendo, acabei tendo a ideia de ataca-los em algum momento."] : []),
                    '<25>{#p/asriel2}{#f/13}* Acho que você poderia dizer que me empolguei...',
                    '<25>{#f/15}* Passei... Só um pouco do limite...',
                    '<25>{#f/16}* ...',
                    '<25>{#f/6}* Minha mãe, estrangulada até a morte com minha magia...',
                    '<25>{#f/8}* Me implorando pra parar enquanto a vida era drenada do seu corpo.',
                    "<25>{#f/7}* Mesmo após RESETAR, a imagem não saiu da minha mente.",
                    '<25>{#f/13}* Eu entrei em pânico, e tentei concertar aquilo sendo legal com ela.',
                    "<25>{#f/15}* Mas eu não pude esquecer o que fiz.",
                    "<25>{#f/15}* Eu não... poderia olhar pra ela... pra ninguém, da mesma forma."
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            "<26>{#p/asriel2}{#f/15}* Como eu disse antes, eu não poderia esquecer do que fiz.",
                            '<25>{#f/16}* E, depois disso as coisas apenas pioraram.'
                        ]
                        : ['<25>{#p/asriel2}{#f/16}* Depois disso, as coisas ficaram piores.']),
                    '<26>{#f/15}* Após destruir tudo uma vez, se torna fácil fazer de novo.',
                    '<26>{#f/15}* E logo, seja por raiva, frustração, ou mera curiosidade...',
                    '<26>{#f/16}* O que começou como um acidente, perdeu todo o controle.',
                    '<26>{#f/7}* Porém, sabe, mesmo com tudo que aconteceu, eu ainda poderia RESETAR.',
                    '<25>{#f/6}* E uma vez que eu entendi ISSO, não havia mais volta.'
                ],
                (re: boolean) => [
                    '<25>{#p/asriel2}{#f/6}* A cada RESETE, minhas ações se tornavam mais e mais bizarras.',
                    '<25>{#f/7}* Eu fiz com que todos eles sentissem um terror destrutivo.',
                    '<25>{#f/15}* Eu fiz isso de novo, de novo e de novo...',
                    "<25>{#f/16}* Eu fiz tantas vezes, que basicamente me acostumei com isso.",
                    '<25>{#f/3}* Então, finalmente, depois disso tudo...',
                    '<25>{#f/3}* ... nada.',
                    '<25>{#f/3}* Eu não senti nada.\n* Não significou nada.\n* Tudo para NADA.',
                    '<25>{#f/15}* No topo do mundo vazio, eu sabia o que deveria ser feito.',
                    '<26>{#f/23}* Então eu RESETEI e deixei o tempo se mover sem minha presença.'
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            '<26>{#p/asriel2}{#f/16}* Como eu disse antes, eu sabia que isso tudo havia sido para nada.',
                            '<25>{#f/23}* Então eu RESETEI e deixei o tempo mover-se sem mim.'
                        ]
                        : []),
                    "<25>{#p/asriel2}{#f/17}* Você não entende, $(name)?",
                    '<25>{#f/23}* É por isso que eu esperei tanto para estar contigo.',
                    "<25>{#f/13}* Com você ao meu lado, eu não preciso fazer isso tudo sozinho.",
                    "<25>{#f/15}* Com você ao meu lado... tudo finalmente terá significado.",
                    "<25>{#f/16}* E mesmo assim, foi isso que você sempre quis, não é mesmo?",
                    '<25>{#f/13}* Dar a eles \"liberdade\"?',
                    '<25>{#f/23}* ...heh.\n* Nós somos a dupla perfeita.'
                ]
            ],
            monologueX1: [
                '<25>{#p/asriel2}{#f/17}* Lembre-se, $(name).',
                '<25>{#f/17}* Com tanto que estejamos juntos, nada ficará em nosso caminho.'
            ],
            monologueX2: () => [
                '<25>{#p/asriel2}{#f/16}* ...Vamos.\n* Segura minha mão.',
                ...(SAVE.data.b.water ? ["<25>{#f/13}* Não se preocupe, eu seguro seu copo pra você..."] : [])
            ],
            monologueX3: [
                '<25>{#p/asriel2}{#f/17}* Temos que fazer isso enquanto ainda temos a chance, certo?',
                '<25>{#f/23}* Andando de mãos dadas, passando pela cidade, como desejávamos...',
                "<25>{#f/16}* ... Então, iremos explodir este lugar em pedaços."
            ],
            monologueX4: () => [
                '<25>{#p/asriel2}{#f/16}* Isso... foi incrível.',
                ...(SAVE.flag.n.ga_asrielMonologueY < 2
                    ? [
                        "<25>{#f/13}* Mas o tempo do Outpost's chegou.",
                        "<25>{#f/7}* Escuta aqui, $(name).\n* Estes monstros não nos entendem.",
                        "<25>{#f/6}* Eles pensam que o universo é um lugar lindo e perfeito.",
                        "<25>{#f/8}* Gostam de pensar que qualquer pessoa pode se redimir.",
                        "<25>{#f/6}* Mas eu e você?\n* Nós não nos encaixamos nessa visão de mundo.",
                        "<25>{#f/7}* Somos exatamente o que somos.",
                        "<25>{#f/9}* Heh.\n* Não é interessante?",
                        '<25>{#f/13}* Aquilo que nos mantém distante e diferente dos outros...',
                        '<25>{#f/16}* ... é exatamente o que nos une como um.',
                        '<26>{#f/17}* Uma vez que pegarmos as chaves e escaparmos deste lugar...',
                        "<25>{#f/17}* Estaremos juntos para sempre, $(name).",
                        "<25>{#f/23}* É nosso destino."
                    ]
                    : [
                        '<25>{#f/13}* Mas você sabe o que devemos fazer agora.',
                        "<25>{#f/17}* Vamos lá, vamos voltar exatamente para onde estávamos..."
                    ])
            ],
            monologueX5: ['<25>{#p/asriel2}{#f/17}* Lidere o caminho.'],
            monologueY: [
                "<25>{#p/asriel2}{#f/16}* ... Eu não vou repetir o que disse.",
                "<26>{#f/13}* Você sabe o motivo de estarmos aqui."
            ],
            afterfight1: ['<25>{#p/asriel2}{#f/8}* ... finalmente.'],
            afterfight2: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/8}* Parece que as almas já foram evacuadas...",
                        '<25>{#f/7}* ... hmph.',
                        "<25>{#f/6}* Se ele pensa que isso vai nos parar ele só está sendo estúpido.",
                        "<25>{#f/10}* Bem, ele poderia usar o poder delas para nós destruir...",
                        "<26>{#f/16}* ... mas vamos ser sinceros...",
                        "<25>{#f/13}* Ele só não é esse tipo de pessoa, certo?"
                    ],
                    ['<25>{#p/asriel2}{#f/6}* Só um momento.']
                ][Math.min(SAVE.flag.n.ga_asriel56++, 1)],
            afterfight3: () => [
                '<25>{#p/asriel2}{#f/16}* Colapso em progresso.',
                ...(SAVE.flag.n.ga_asriel57++ < 1
                    ? [
                        '<25>{#f/5}* Tudo que precisamos é um programa especial...',
                        "<25>{#f/9}* Um que vai ligar nossas almas e nos deixar passar o escudo de força."
                    ]
                    : [])
            ],
            afterfight4: ['<25>{#p/asriel2}{#f/3}* Por aqui.'],
            afterfight5a: ['<25>{#p/asriel2}{#f/5}* Gorey!', '<25>{#f/5}* Como você tá?'],
            afterfight5b: [
                '<25>{#p/asgore}{#f/5}* Melhor do que se pode esperar.',
                "<25>{#p/asriel2}{#f/6}* A gente já te cercou só pra deixar claro.\n* Sem gracinhas."
            ],
            afterfight6: [
                '<25>{#p/asgore}{#f/1}* Eu não tenho a intenção de te enganar, Asriel.',
                '<25>{#p/asgore}{#f/2}* Eu sei que o fim está próximo.'
            ],
            afterfight7: ['<25>{#p/asriel2}{#f/10}* Últimas palavras antes de tudo que você conhece ser transformado em poeira?'],
            afterfight8: [
                '<25>{#p/asriel2}{#f/15}* Não?',
                '<25>{#f/7}* Beleza.',
                "<25>{#f/6}* Acho que vamos vazando, então.",
                '<25>{#f/8}* ... logo depois de eu tomar seu cartão de acesso.'
            ],
            afterfight10: ['<25>{#p/asriel2}{#f/1}* Vamos lá, $(name).', "<25>{#f/2}* Eu já cansei desse lugar."],
            afterfight11: [
                '<25>{#p/asgore}{#f/5}* $(name)...?',
                '<25>{#p/asgore}{#f/6}* ... hmm.\n* Vá com segurança, Asriel.'
            ],
            afterfight12: ['<25>{#p/asriel2}{#f/16}* Ignora ele, $(name).\n* Nada neste lugar importa mais.'],
            afterfight13: ['<25>{#p/asriel2}{#f/17}* Apenas você.'],
            coreboomA1: [
                '<18>{#p/papyrus}{#f/5} ALÔ?\nTEM ALGUÉM AÍ?',
                "<18>{#p/papyrus}{#f/5}EU TENHO PROCURADO PELO HUMANO..."
            ],
            coreboomA2: ['<18>{#p/papyrus}{#f/8}MAS QUE...!'],
            coreboomA3: ['<32>{#p/basic}* Papyrus?{%40}'],
            coreboomA4: ["<18>{#p/papyrus}{#f/4}EU TENHO UM PÉSSIMO SENTIMENTO EM RELAÇÃO A ISSO.{%40}"],
            coreboomA5: ['<32>{#p/basic}* ... Alô?{%40}'],
            coretext1: ['<32>{#p/basic}{#s/spiderLaugh}* Segure bem, amores~'],
            coretext2: ['<32>{#p/basic}{#s/spiderLaugh}* Ngh...', '<32>{#p/basic}* Todo mundo junto segurando~'],
            coreboomB1: ['<32>{#p/basic}{#s/spiderLaugh}* Ah!', '<32>{#p/basic}* Não, não assim~'],
            coreboomB2: ['<32>{#p/basic}* Não assim o quê?{%40}'],
            coreboomB3: ['<32>{#p/basic}{#s/spiderLaugh}* Crud.{%40}'],
            coretext3: ['<18>{#p/papyrus}{#f/9}ACEITA UMA MÃOZINHA?'],
            coretext4a: ['<32>{#p/basic}{#s/spiderLaugh}* Papyrus!', "<32>{#p/basic}* Você está vivo~"],
            coretext4b: ['<18>{#p/papyrus}{#f/6}E BEM BONITO!'],
            coretext5a: ['<18>{|}{#p/papyrus}{#f/4}OU- {%}'],
            coretext5b: [
                '<32>{#p/basic}{#s/spiderLaugh}* Papyrus, ainda precisamos de alguém que tenha acesso aos interruptores!'
            ],
            coreboomC1: ["<18>{#p/papyrus}{#f/5}... INFELIZMENTE ACHO QUE SOMOS OS ÚNICOS AQUI."],
            coreboomC2: ['<18>{#p/papyrus}{#f/8}MAS QUE...!'],
            coreboomC3: ["<32>{#p/basic}{#s/spiderLaugh}* Está piorando.{%40}"],
            coretext6: ["<32>{#p/basic}* Vou ligar para os engenheiros!"],
            coretext7: ['<18>{#p/papyrus}{#f/6}ISSO, ISSO, FAÇA ISSO!'],
            coreboomD1: ['<32>{#p/basic}* ...', '<32>{#p/basic}* Sem resposta.'],
            coreboomD2: ['<32>{#p/basic}* ...', "<32>{#p/basic}* Eles disseram que não há engenheiros o suficiente!?"],
            coreboomD3: ['<18>{#p/papyrus}{#f/5}DRAT.{%40}'],
            coretext8: ['<32>{#p/basic}* ...', "<32>{#p/basic}* Eles estão aqui!"],
            coretext9: ['<32>{#p/basic}{#s/spiderLaugh}* Esplêndido~'],
            coretext10: ['<32>{#p/basic}* Qualquer momento agora...'],
            coretext11: ['<32>{#p/basic}{#s/spiderLaugh}* Funcionou~'],
            coretext12a: ['<18>{#p/papyrus}{#f/0}NÓS CONSEGUIMOS?'],
            coretext12b: ['<32>{#p/basic}{#s/spiderLaugh}* Ahuhu... nós ainda precisamos de alguém pra acessar lá dentro.'],
            coreboom12c: ["<32>{#p/basic}* Não olha pra mim!\n* Não sou um fantasma!"],
            coreboom12d: ['<32>{#p/basic}{#s/spiderLaugh}* Um fantasma que serviu o esquadrão de ELITE, isso sim~'],
            coreboom12e: ['<32>{#p/basic}* ... isso foi a muito tempo.'],
            coretext13: ["<32>{#p/napstablook}* Eu vou fazer isso."],
            coretext14a: ['<18>{#p/papyrus}{#f/1}DE ONDE -VOCÊ- VEIO???'],
            coretext14b: [
                '<32>{#p/napstablook}* desculpa...\n* sem tempo pra explicar...',
                '<32>* Se cuida primo, de verdade...',
                '<32>* Tudo bem?'
            ],
            coretext15: ['<32>{*}{#p/basic}{#s/spiderLaugh}* O que você está fazendo?~{%40}'],
            coretext16: ["<32>{*}{#p/basic}* Não... NÃO!\n* Eu não posso te perder também...!{%40}"],
            coretext17: ['<32>{#p/napstablook}{*}* eu consigo ver...', '<32>* eu consigo ver onde está instável.'],
            coretext18: [
                "<33>{*}{#p/napstablook}* não pode ser nada diferente, é isso.",
                '<32>{*}* eu só vou corrigir a rota dos comandos.',
                '<32>{*}* vamos lá...'
            ],
            coretext19: ['<32>{#p/napstablook}* ...', '<32>{#p/napstablook}* funcionou...'],
            coretext20: [
                '<25>{#p/asgore}{#f/6}* O que nós temos aqui?',
                '<18>{#p/papyrus}{#f/0}ASGORE! NÓS CONSEGUIMOS!',
                '<18>{#p/papyrus}{#f/0}NÓS PARAMOS A EXPLOSÃO!',
                '<32>{#p/basic}* ...meu primo Blooky, ele...',
                '<18>{#p/papyrus}{#f/5}O PRIMO DELE FEZ ALGO MUITO NOBRE.'
            ],
            coretext21: ['<25>{#p/asgore}{#f/1}* Qual seu nome?'],
            coretext22: [
                '<32>{#p/basic}* Oh, eu?',
                "<32>* Bem, eu, nem tenho mais um na verdade.",
                '<32>* Você pode me chamar de \"dummy\", eu acho.'
            ],
            coretext23a: [
                '<25>{#p/asgore}{#f/1}* Escute... er, dummy.\n* Você não está sozinho em seu sofrimento.',
                '<25>{#f/2}* Todos nós perdemos pessoas próximas hoje.'
            ],
            coretext23b1: ['<32>{#p/basic}{#s/spiderLaugh}* Todos com exceção de mim, é claro~'],
            coretext23b2: ['<32>{#p/basic}{#s/spiderLaugh}* Não que eu... Fosse muito próxima de ninguém, pra ser sincera...'],
            coretext24a: [
                "<18>{#p/papyrus}{#f/5}WOWIE... SE O HUMANO NÃO TIVESSE ME POUPADO, EU....",
                '<32>{#p/basic}* Eles te pouparam?\n* Eles me pouparam também...',
                '<32>{#p/basic}{#s/spiderLaugh}* Ahuhu... Eu escapei antes que eles pudessem por as mãos em mim~',
                '<18>{#p/papyrus}{#f/0}... AH, CLARO! OS ENGENHEIROS!',
                '<18>{#p/papyrus}{#f/0}ELE PROVAVELMENTE OS POUPOU TAMBÉM!'
            ],
            coretext24b: ['<25>{#p/asgore}{#f/1}* ... Digam me, Asriel estava com o humano quando foram poupados?'],
            coretext25: [
                '<18>{#p/papyrus}{#f/9}DE JEITO NENHUM!',
                '<32>{#p/basic}* Nope.',
                "<32>{#p/basic}{#s/spiderLaugh}* Pensando bem, acredito que aquele não era ele~",
                '<25>{#p/asgore}{#f/1}* ...',
                '<25>{#p/asgore}{#f/1}* Então era tudo verdade...',
                '<25>{#p/asgore}{#f/2}* ... Talvez...\n* Tenha sido um erro condená-lo também...',
                '<18>{#p/papyrus}{#f/6}...\nCONDENÁ-LO?',
                '<18>{#p/papyrus}{#f/7}SOBRE O QUE VOCÊ ESTÁ FALANDO!!'
            ],
            coretext26: ['<18>{*}{#p/papyrus}{#f/7}ASGORE, O QUE VOCÊ FEZ!?{^40}{%}'],
            coretext27a: '{*}{#p/event}{#i/3}O Outpost foi\nstruído',
            coretext27b: '{*}{#p/event}{#i/3}O Outpost foi salvo.',
            respawn0: () =>
                [
                    [
                        [
                            "<25>{#p/asriel2}{#f/15}* Você deveria ter SALVO em algum momento após termos saído de Starton.",
                            '<25>{#p/asriel2}{#f/16}* Só dizendo.'
                        ],
                        [
                            "<25>{#p/asriel2}{#f/15}* Você provavelmente deveria ter SALVO em algum momento após matar Undyne.",
                            '<25>{#p/asriel2}{#f/16}* Só dizendo.'
                        ],
                        [
                            "<25>{#p/asriel2}{#f/15}* Você provavelmente deveria ter SALVO em algum momento após sairmos de Aerialis.",
                            '<25>{#p/asriel2}{#f/16}* Só dizendo.'
                        ],
                        [
                            '<25>{#p/asriel2}{#f/15}* Você se envenenou após a luta só pra ver o que iria acontecer?',
                            "<25>{#p/asriel2}{#f/16}* $(name), você da muito trabalho."
                        ]
                    ],
                    [
                        [
                            "<26>{#p/asriel2}{#f/6}* Eu achei que depois da última vez você teria aprendido a\nsalvar o progresso.",
                            "<25>{#p/asriel2}{#f/8}* Mesmo que seja apenas Starton, temos que passar novamente",
                            '<25>{#p/asriel2}{#f/7}* Mas acho que não.'
                        ],
                        [
                            "<26>{#p/asriel2}{#f/6}* Eu achei que depois da última vez você teria aprendido a\nsalvar o progresso.",
                            '<26>{#p/asriel2}{#f/8}* Especialmente após derrotar alguém como Undyne.',
                            '<25>{#p/asriel2}{#f/7}* Mas acho que não.'
                        ],
                        [
                            "<26>{#p/asriel2}{#f/6}* Eu achei que depois da última vez você teria aprendido a\nsalvar o progresso.",
                            '<25>{#p/asriel2}{#f/8}* Especialmente após limpar uma área como Aerialis.',
                            '<25>{#p/asriel2}{#f/7}* Mas acho que não.'
                        ],
                        ['<26>{#p/asriel2}{#f/7}* Isso se torna bem cansativo, bem rápido.']
                    ],
                    [
                        ['<25>{#p/asriel2}{#f/4}* $(name).\n* Por favor, salva nosso progresso.on.'],
                        ['<25>{#p/asriel2}{#f/4}* $(name).\n* Por favor, salva nosso progresso.on.'],
                        ['<25>{#p/asriel2}{#f/4}* $(name).\n* Por favor, salva nosso progresso.on.'],
                        ["<25>{#p/asriel2}{#f/4}* Agora você só tá sendo super irritante."]
                    ],
                    [
                        ['<25>{#p/asriel2}{#f/8}* Vamos lá...'],
                        ['<25>{#p/asriel2}{#f/8}* Vamos lá...'],
                        ['<25>{#p/asriel2}{#f/8}* Vamos lá...'],
                        ['<25>{#p/asriel2}{#f/8}* Vamos lá...']
                    ]
                ][Math.min(SAVE.flag.n.ga_asrielRespawn0++, 3)][Math.floor(SAVE.flag.n._genocide_milestone_last / 2)],
            respawn1: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/15}* Estamos de volta aqui?",
                        "<25>{#p/asriel2}{#f/16}* Bem, então vamos mata-lo novamente, eu acho."
                    ],
                    ['<25>{#p/asriel2}{#f/6}* Sério?'],
                    ['<25>{#p/asriel2}{#f/6}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielRespawn1++, 2)],
            respawn2: () =>
                [
                    [
                        "<25>{#p/asriel2}{#f/15}* E aqui estamos de novo.\n* Legal...",
                        '<25>{#p/asriel2}{#f/16}* Não tem problema, claro...\n* Vamos só fazer o que fizemos antes...'
                    ],
                    ['<25>{#p/asriel2}{#f/8}* Isso já tá em outro nível de tédio.'],
                    ['<25>{#p/asriel2}{#f/8}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielRespawn2++, 2)],
            respawn4: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/15}* $(name), nós estamos quase chegando no fim.',
                        '<25>{#p/asriel2}{#f/16}* Podemos por favor salvar o progresso dessa vez.'
                    ],
                    ['<25>{#p/asriel2}{#f/10}* ... isso é algum tipo de pegadinha?'],
                    ['<25>{#p/asriel2}{#f/10}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielRespawn4++, 2)],
            respawn6: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/15}* $(name).\n* Escuta, por favor.',
                        '<25>{#p/asriel2}{#f/7}* Nós literalmente MATAMOS ela.',
                        '<25>{#p/asriel2}{#f/5}* Por qual motivo você nos trouxe de volta após aquilo?'
                    ],
                    ["<25>{#p/asriel2}{#f/7}* ... você não deve estar lúcido."],
                    ['<25>{#p/asriel2}{#f/7}* ...']
                ][Math.min(SAVE.flag.n.ga_asrielRespawn6++, 2)],
            respawn7: () =>
                [
                    [
                        '<25>{#p/asriel2}{#f/15}* Mas que...',
                        "<25>{#p/asriel2}{#f/15}* Eu poderia jurar que estávamos no ônibus espacial..."
                    ],
                    [
                        '<25>{#p/asriel2}{#f/10}* $(name), você...',
                        "<25>{#p/asriel2}{#f/16}* ... não...\n* Você não faria isso..."
                    ],
                    [
                        '<25>{#p/asriel2}{#f/15}* ...',
                        '<25>{#p/asriel2}{#f/15}* $(name)?',
                        '<32>{#p/human}* (Parece que Asriel entrou em estado de pensamento sem interrupção.)'
                    ],
                    ['<25>{#p/asriel2}{#f/15}* ...', '<32>{#p/human}* (Parece que Asriel entrou em estado de pensamento sem interrupção.)']
                ][Math.min(SAVE.flag.n.ga_asrielRespawn7++, 3)],
            respawnWitnessA: () =>
                [
                    ['<25>{#p/asriel2}{#f/9}* O que foi AQUILO?', '<25>{#p/asriel2}{#f/10}* ...QUEM foi aquilo?'],
                    ['<25>{#p/asriel2}{#f/15}* Nós fomos acertados com...', '<25>{#p/asriel2}{#f/10}* ... magia elétrica?'],
                    [
                        "<25>{#p/asriel2}{#f/3}* Alphys.\n* Deve ter sido.",
                        "<25>{#p/asriel2}{#f/15}* Então ela não fugiu...",
                        '<25>{#p/asriel2}{#f/16}* Heh, isso vai ser interessante.'
                    ]
                ][SAVE.flag.n.ga_asrielWitness++],
            respawnWitnessB: (wit: number) =>
                wit > 0
                    ? [
                        '<25>{#p/asriel2}{#f/15}* Então foi a Alphys...',
                        '<25>{#p/asriel2}{#f/16}* Heh, isso vai ser interessante.'
                    ]
                    : [
                        "<25>{#p/asriel2}{#f/15}* Então ela não fugiu...",
                        '<25>{#p/asriel2}{#f/16}* Heh, isso vai ser interessante.'
                    ]
        },
        truetext: {
            monologue1: () => [
                '<32>{#p/basic}* Espera.',
                SAVE.data.b.flirt_papyrus
                    ? '<32>* Acho que você esqueceu de ir a um encontro com Papyrus...'
                    : '<32>* Acho que você esqueceu de sair com Papyrus...',
                "<32>* ... vamos lá, não dá pra deixar ele pra trás!"
            ],
            monologue2: [
                '<32>{#p/basic}* Espera.',
                "<32>* O Papyrus não te pediu pra sair com a Undyne mais cedo?",
                "<32>* ... vamos lá, não dá pra esquecer ela!",
                "<32>* Mesmo que ela seja um pouco arrogante."
            ],
            monologue3: [
                '<32>{#p/basic}* Espera.',
                '<32>* Você esqueceu da Undyne!',
                '<32>* Primeiro Papyrus e agora isso?',
                "<33>* ... vamos lá, vamos voltar pra casa dela..."
            ],
            storyEnding: () => [
                '<32>{#p/basic}* ...\n* Então agora você sabe.',
                "<32>* E por conta do diário de Asriel, você sabe que eu fiquei doente de propósito.",
                '<32>* Eu enganei ele, manipulei ele com este plano estúpido de salvar todo mundo.',
                '<32>* Apenas para se tornar uma procura por vingança, e mesmo isso foi uma perda de tempo.',
                '<32>* Ele me impediu de lutar de volta, e eu estava com raiva dele por tanto tempo...',
                '<32>* ...',
                '<32>* Talvez... parte de mim ainda esteja.',
                "<32>* Eu não sei.",
                "<32>* Eu sempre penso em como as coisas poderiam ter sido se ele tivesse escutado...",
                '<32>* ... mas ao mesmo tempo...',
                "<32>* Foi para o melhor que ele não tenha.",
                '<32>* ...',
                '<32>* Olha... Eu só quero dizer que, ter você do meu lado...',
                "<32>* Me fez sentir ter um propósito neste mundo.",
                "<32>* Então, por isso, eu sou grato.",
                '<32>* Eu realmente acho que as coisas irão melhorar.',
                '<32>* Ou talvez... o fim esteja mais próximo do que eu imagino.',
                '<32>* ...\n* De toda forma.',
                "<32>* O campo de força não é tão longe daqui.",
                ...(SAVE.data.n.plot_date < 2.1
                    ? [
                        '<32>* Porém, antes de irmos...',
                        ...(SAVE.data.n.plot_date < 1.1
                            ? [
                                '<32>* Nós deveríamos voltar pra ver o Papyrus.',
                                "<32>* Você não iria querer deixá-lo esperando na casa dele, queria?"
                            ]
                            : [
                                '<32>* Nós realmente deveríamos voltar e ver Undyne.',
                                "<32>* Você não vai deixar o Papyrus esperando na casa dela, vai?"
                            ])
                    ]
                    : [
                        "<32>* Tenho certeza de que você já está farto das minhas divagações, então vamos.",
                        "<32>* Quem sabe.\n* Talvez faça sentido assim que escudo de força tenha caído.",
                        "<32>* ...\n* Veremos."
                    ])
            ],
            epilogue: [
                () => [
                    "<32>{#p/basic}* Isso não quer dizer que temos que ir encontrá-lo agora.",
                    "<32>* É só que...",
                    '<32>* ...',
                    '<32>{#p/human}* (Você escuta um chorinho alto.)',
                    '<32>{#p/basic}* Frisk...',
                    "<32>* Ainda tem uma coisa que eu não te disse.",
                    "<32>* É sobre o meu passado, e...",
                    "<32>* É a razão pela qual eu estou desesperado para falar sobre ele.",
                    "<32>* Me desculpa.",
                    '<32>* Eu só...',
                    '<32>* Eu preciso te contar como eu cheguei a isso.',
                    '<32>* Eu preciso que você entenda.'
                ],
                () => [
                    '<32>{#p/basic}* Frisk...',
                    "<32>* Você consegue imaginar o que é perder toda sua família em uma noite?",
                    '<32>* Você consegue...',
                    "<32>* Imagina você saber que é o culpado por isso ter acontecido?",
                    '<32>* ...',
                    '<32>* Pelas próximas centenas de anos...',
                    "<32>* É como se eu estivesse preso em um limbo.",
                    '<32>* Não importa o quanto eu tentei...',
                    "<32>* Eu simplesmente não consigo me separar.",
                    '<32>* ...',
                    "<32>* Eu fui forçado a assistir enquanto todos os outros vivem suas vidas.",
                    '<32>* Eu vi eles fazendo amigos...',
                    '<32>* Eu vi eles rindo, amando...',
                    "<32>* Mas isso é tudo... que eu sempre fiz.",
                    '<32>* Eu só... vi eles.',
                    '<32>* Nada mais.'
                ],
                () => [
                    '<32>{#p/basic}* Quando a família fantasma me encontrou, poucos dias após o acidente...',
                    "<32>* Eu pensei, talvez isso não vá ser tão ruim.",
                    '<32>* Eu posso estar preso em um purgatório, mas...',
                    "<32>* ... pelos menos eu tenho pessoas para conversar, certo?",
                    '<32>* ...',
                    '<32>* Eles tentaram me ajudar...',
                    '<32>* Eles tentaram me fazer sentir em casa...',
                    "<32>* ... mas eles não puderam entender pelo que eu estava passando.",
                    '<32>* Eles eram todos tão jovens...',
                    '<32>* Pra ser sincero, eles meio que ainda são.',
                    '<32>* Monstros são como crianças neste sentido...',
                    '<32>* Sua inocência é o que define eles.',
                    "<32>* Mas isso significava que eles realmente não sabiam como se relacionar comigo",
                    '<32>* ...',
                    '<32>* Desde então...',
                    "<32>* ... eu tenho estado em meu próprio caminho."
                ],
                () => [
                    '<32>{#p/basic}* Todos estes anos apenas por mim mesmo...',
                    '<32>* Com nada além de sentar e pensar...',
                    "<32>* É um milagre que eu não tenha ficado maluco.",
                    '<32>* Inferno, talvez isso seja parte da minha \"punição\".',
                    '<32>* Sem poder morrer, sem poder ficar insano, sem companhia...',
                    '<32>* De todas as maneiras eu nunca fui capaz de escapar.',
                    "<32>* ...\n* Mas existe um problema com esta teoria.",
                    '<32>* Uma exceção.',
                    '<32>* Você consegue adivinhar qual ela é?',
                    "<32>* Tenho certeza que você já sabe a está altura...",
                    '<32>* ...',
                    "<32>* É você, Frisk.",
                    "<32>* Você é o único que é realmente capaz de me entender."
                ],
                () => [
                    "<32>{#p/basic}* Você pode pensar que os outros humanos teriam me ouvido...",
                    '<32>* ... mas não.',
                    "<32>* Às vezes eu dizia uma palavra, ou...",
                    '<32>* Aparecia pra eles em um sonho se tivesse sorte.',
                    '<32>* Mas você...',
                    "<32>* Talvez seja porque nossas ALMAS são tão parecidas, porém...",
                    '<32>* Você não apenas consegue me escutar...',
                    '<32>* Eu posso te \"escutar\", também.',
                    "<32>* Não é muito, porém é o suficiente para saber o que você está pensando.",
                    '<32>* Por exemplo, agora...',
                    '<32>* ...',
                    '<32>* Frisk, você...',
                    "<32>* ... você sabe que não é possível, certo?",
                    choicer.create('* (Como você irá abraçar?)', 'Suavemente', 'Firmemente', 'Cuidadosamente', 'Desesperadamente'),
                    '<32>{#p/basic}* ... Frisk bobo.',
                    '<32>* Se eu pudesse aceitar, eu iria.',
                    "<32>* Mas... eu não posso."
                ],
                () => [
                    '<32>{#p/basic}* ... Frisk, eu...',
                    "<32>* Eu sei que pareço a última pessoa que diria algo assim, mas...",
                    '<32>* Eu realmente te amo, Frisk.',
                    '<32>* Assim como eu o amei.',
                    "<32>* Nós somos... como família.",
                    '<32>* Heh.',
                    '<32>* ... obrigado por me dar a chance de experienciar o mundo como algo novo, novamente.',
                    '<32>* ... obrigado por ser a pessoa gentil que você é.',
                    '<32>* Mas... Frisk.',
                    "<32>* Eu não tenho certeza se tenho futuro neste mundo.",
                    "<32>* Assim que você se for...",
                    "<32>* ... Eu só irei voltar a estar sozinho novamente.",
                    "<32>* É por isso... que é importante que eu possa falar com ele, entende?",
                    "<32>* Somente então, eu poderei seguir em frente sobre o que aconteceu.",
                    "<32>* Existir sozinho... não seria tão ruim depois disso.",
                    '<32>* Mas... Eu sei.',
                    "<32>* Eu tenho certeza que existem muitas pessoas que você gostaria de ver antes.",
                    '<33>* Então vá lá, faça isso...',
                    "<32>* Assim que você estiver pronto...",
                    "<32>* ... nós iremos encontrá-lo.",
                    '<32>* Certo?',
                    '<32>* ...',
                    "<32>* Bem, isso é tudo.",
                    "<32>* Vamos continuar, tudo bem?"
                ]
            ]
        },
        npc: {
            picnic_oni: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Eu nunca estive na tão aclamada Cidadela, mas parece legal.",
                    "<32>* Mesmo sendo uma cidade inteirinha, é mais fácil de andar que o resto do Outpost!",
                    "<32>* Agora isso não é alguma coisa."
                ],
                ["<32>{#p/basic}{#npc/a}* Eu nunca fui muito de quebra cabeças e labirintos.\n* Então isso realmente é legal."]
            ),
            picnic_clamguy: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* É maluco pensar que essa cidade foi construída tão rapidamente.',
                    "<32>* Diferente de Aerialis, eles não usam a anomalias pra fazer ela parecer maior.",
                    "<32>* Mas toda essa tecnobaboseira está além de mim, de qualquer maneira. É bom estar aqui."
                ],
                ['<32>{#p/basic}{#npc/a}* Uma vida livre do termos técnicos esquisitos...\n* Paz, no fim.']
            ),
            picnic_charles: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Não se preocupe comigo, eu só tô saindo com meus melhores camaradas!",
                    '<32>* Trabalhar no CORE foi bem difícil... mas estamos todos prontos agora.',
                    '<32>* Aqui, podemos celebrar nosso incrível trabalho!',
                    '<32>* Eu com certeza amo dar um rolê!'
                ],
                ['<32>{#p/basic}{#npc/a}* Eu posso dizer que você ama isso também!']
            ),
            picnic_proskater: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Então... sem mais escola?\n* Assim, é minha culpa por ter ido, claro.",
                    '<32>* Ninguém tem que ir pra escola de verdade, mas você não vai ficar bem sem ela.',
                    "<32>* Tanto faz.\n* Eu acho que ainda não sei o que quero fazer da vida."
                ],
                ['<32>{#p/basic}{#npc/a}* Ir a festas assim o tempo todo deve ser divertido...']
            ),
            picnic_papyrus: pager.create(
                0,
                [
                    '<18>{#p/papyrus}{#f/0}{#npc/a} OLÁ, FRISK!',
                    "<18>{#f/9}ESTOU FAZENDO A MELHOR REFEIÇÃO DE TODAS!",
                    "<18>{#f/5}EU SÓ QUERIA COZINHAR UM POUCO MAIS RÁPIDO...",
                    "<18>{#f/7}NESTE RITMO, EU VOU TER QUE SERVIR NO TRANSPORTE!",
                    "<25>{#p/sans}{#npc}* Sério, acho que isso seria bem legal.",
                    '<25>{#p/sans}{#f/3}* Imagina, todo mundo comendo enquanto vêem o novo planeta...',
                    "<25>{#p/sans}{#f/2}* seria uma refeição que eles JAMAIS esquecerão.",
                    '<18>{#p/papyrus}{#f/4}{#npc/a}VOCÊ ESTÁ FAZENDO UMA OFERTA TENTADORA...',
                    "<18>{#p/papyrus}{#f/5}MAS EU JÁ PROMETI QUE IREI DEIXAR PRONTO AQUI."
                ],
                [
                    "<18>{#p/papyrus}{#f/5}{#npc/a}HEY.\nNÃO É DE TODO RUIM.",
                    "<18>{#f/0}O TEMPERO NA COZINHA DO ASGORE É EXCELENTE!",
                    '<18>{#f/4}SAL, PIMENTA...\nPÓ ANTI-GRAVIDADE...',
                    '<18>{#f/9}AS POSSIBILIDADES SÃO... QUASE INFINITAS!!'
                ],
                [
                    "<18>{#p/papyrus}{#f/0}{#npc/a} NÃO SE PREOCUPE, EU NÃO VOU FICAR -TÃO- EXCITADO.",
                    "<18>{#f/5}NÃO É COMO SE EU FOSSE FAZER UMA APOSTA ASSIM...",
                    '<18>{#f/0}COM UMA VARIEDADE TÃO GRANDE DE CONVIDADOS.',
                    '<18>{#f/9}ALÉM DISSO, A RECEITA ESPECIFICA O TEMPERO.',
                    '<18>{#f/4}OUVI DIZER QUE FLUTUA NA SUA BOCA...'
                ],
                ['<18>{#p/papyrus}{#f/0}{#npc/a}NADA PARA SE PREOCUPAR, DE VERDADE.']
            ),
            picnic_kidd: pager.create(
                0,
                () =>
                    SAVE.data.b.f_state_kidd_betray
                        ? ['<25>{#p/kidd}{#f/4}{#npc/a}* Aí, uh...', '<25>{#f/4}* Eu acho que você só deveria me deixar sozinho.']
                        : [
                            "<25>{#p/kidd}{#f/2}{#npc/a}* Eu vou sentir falta deste lugar, cara...",
                            '<25>{#f/3}* Starton, o Foundry, Aerialis, a Cidadela...',
                            "<25>{#f/6}* Pelo menos ainda estaremos juntos no novo mundo.",
                            "<25>{#f/1}* Mau posso esperar pra ver como é lá."
                        ],
                () =>
                    SAVE.data.b.f_state_kidd_betray
                        ? ['<25>{#p/kidd}{#f/4}{#npc/a}* ...']
                        : [
                            '<25>{#p/kidd}{#f/1}{#npc/a}{#f/4}* ... oh, hmm, eu sei que você provavelmente já descobriu, mas...',
                            "<25>{#f/4}* Eu não tenho pais de verdade.\n* Eu inventei eles.",
                            "<26>{#f/3}* Mas nós somos amigos agora. Então, espero que você possa me perdoar."
                        ],
                () =>
                    SAVE.data.b.f_state_kidd_betray
                        ? ['<25>{#p/kidd}{#f/4}{#npc/a}* Só, vai embora...']
                        : ['<25>{#p/kidd}{#f/3}{#npc/a}* Obrigado por ser um bom amigo, Frisk.']
            ),
            picnic_dragon: pager.create(
                0,
                [
                    "<32>{#p/basic}{#npc/a}* Então você esta me dizendo que não podemos sair até todo mundo estar pronto?",
                    "<32>* Eu, uh, acho que isso é justo, huh.",
                    "<32>* Bem, é okay, então."
                ],
                ["<32>{#p/basic}{#npc/a}* Tudo que eu estou reclamando mesmo?\n* Estamos livres..."]
            ),
            tvfish: pager.create(
                0,
                () =>
                    player.face !== 'up' // NO-TRANSLATE

                        ? []
                        : [
                            '<25>{#p/undyne}{#f/14}{#npc/a}* As garotas que dirigem o centro de recreação encontraram este filme.',
                            "<25>{#f/1}* Então, Alphys e eu decidimos que iríamos decidir.",
                            "<25>{#f/8}* ESTE É O MELHOR ENCONTRO QUE EU JÁ TIVE!!",
                            "<25>{#f/12}* E, uh, eu acho que este também é o único que eu já tive.",
                            '<25>{#f/7}* MESMO ASSIM!'
                        ],
                () =>
                    player.face !== 'up' // NO-TRANSLATE

                        ? []
                        : [
                            '<25>{#p/undyne}{#f/1}{#npc/a}* Eu nunca percebi o quão viciante é ver filmes!',
                            '<25>{#p/undyne}{#f/12}{#npc/a}* Agora...\n* Se você pudesse nos deixar a sós...'
                        ],
                () =>
                    player.face !== 'up' // NO-TRANSLATE

                        ? []
                        : ["<25>{#p/undyne}{#f/7}{#npc/a}* Qual foi, você tá bloqueando a visão!"]
            ),
            tvlizard: pager.create(
                0,
                () =>
                    player.face !== 'up' // NO-TRANSLATE

                        ? []
                        : SAVE.data.b.c_state_secret3 && !SAVE.data.b.c_state_secret3_used
                            ? ((SAVE.data.b.c_state_secret3_used = true),
                                [
                                    '<25>{#p/alphys}{#g/alphysInquisitive}{#npc/a}* ... huh?\n* Você queria me dizer alguma coisa?',
                                    '<32>{#p/human}* (Você recita as notas científicas compartilhadas do Professor Roman.)',
                                    '<25>{#p/alphys}{#g/alphysOhGodNo}* Woah... woah!',
                                    '<25>{#g/alphysNervousLaugh}* Está deve ser a chave para resolver a viagem intergaláctica...',
                                    '<25>{#g/alphysHellYeah}* ... com buraco de minhocas!',
                                    "<25>{#g/alphysWelp}* Eu vim tentando resolver isso a um tempo..."
                                ])
                            : [
                                '<25>{#p/alphys}{#g/alphysCutscene1}{#npc/a}* Depois de todos estes anos, nós finalmente encontramos!',
                                '<25>{#g/alphysHellYeah}* O terceiro filme da trilogia Mew Mew...\n* Mew Mew Time Twist!',
                                '<25>{#g/alphysWelp}* Também conhecida como uma sequência para Mew Mew Space Adventure.',
                                '<25>{#g/alphysYeahYouKnowWhatsUp}* Este filme envergonha a Estelar...'
                            ],
                () =>
                    player.face !== 'up' // NO-TRANSLATE

                        ? []
                        : [
                            "<25>{#p/alphys}{#g/alphysHellYeah}{#npc/a}* Já era hora!",
                            "<25>{#p/alphys}{#g/alphysFR}{#npc/a}* ... mas se você não se importar..."
                        ],
                () =>
                    player.face !== 'up' // NO-TRANSLATE

                        ? []
                        : ['<25>{#p/alphys}{#g/alphysYupEverythingsFine}{#npc/a}* Filme primeiro, conversa depois.']
            ),
            picnic_asgore: pager.create(
                0,
                () => [
                    SAVE.data.b.c_state_secret5_used
                        ? '<25>{#p/asgore}{#npc/a}{#f/1}* Não se preocupe, Frisk.\n* Eu não esqueci sobre a promessa.'
                        : '<25>{#p/asgore}{#npc/a}{#f/6}* Olá, Frisk. Estou apenas procurando novas roupas.',
                    ...(SAVE.data.b.c_state_secret5 && !SAVE.data.b.c_state_secret5_used
                        ? ((SAVE.data.b.c_state_secret5_used = true),
                            [
                                '<25>{#p/asgore}{#npc/a}{#f/21}* Oh?\n* Você tem algo pra me dizer?',
                                '<32>{#npc}{#p/human}* (Você repete a promessa feita para ti por Asgore no Arquivo Seis.)',
                                '<25>{#p/asgore}{#npc/a}{#f/8}* ...!',
                                '<25>{#f/1}* Frisk...',
                                '<25>{#f/1}* ... Eu não tenho certeza se posso fazer isso, mas...',
                                '<25>{#f/6}* Por você, eu vou tentar.'
                            ])
                        : [])
                ],
                () =>
                    SAVE.data.b.c_state_secret5_used
                        ? ['<25>{#p/asgore}{#npc/a}{#f/1}* Eu só espero que possa chegar próximo dela.']
                        : ['<25>{#p/asgore}{#npc/a}{#f/6}* Eu me pergunto se humanos gostam de usar marrom.'],
                () =>
                    SAVE.data.b.c_state_secret5_used
                        ? ['<25>{#p/asgore}{#npc/a}{#f/2}* ...']
                        : ['<25>{#p/asgore}{#npc/a}{#f/21}* La la, la la...']
            )
        },
        story: {
            lv20: ['<32>{#p/human}* (O som de uma nave espacial pode ser ouvido assim que você se sai pela distância.)'],
            postnoot0: () =>
                world.trueKills === 0 && SAVE.data.n.state_foundry_undyne !== 1 && SAVE.flag.n.neutral_twinkly_choice === 0
                    ? [
                        '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/1}Porquê...?',
                        '<25>{*}{#e/twinkly/2}Porque você me deixou ir?',
                        "<25>{*}{#e/twinkly/6}Você não percebe que ser legal...",
                        '<25>{*}{#e/twinkly/7}... só te machuca no final?',
                        '<25>{*}{#e/twinkly/5}Olha pra você.',
                        ...(SAVE.data.b.ultrashortcut
                            ? [
                                "<25>{*}{#e/twinkly/3}Você fez todos estes...",
                                '<25>{*}{#e/twinkly/4}... uh...',
                                '<25>{*}{#e/twinkly/0}Ah é, eu esqueci que você pulou a jornada inteira.',
                                "<25>{*}{#e/twinkly/24}Eh, sabe-se.\nEra só um discurso bobinho de toda forma.",
                                "<25>{*}{#e/twinkly/15}... Vamos só pro ponto principal, tudo bem?",
                                '<25>{*}{#e/twinkly/21}...'
                            ]
                            : [
                                "<25>{*}{#e/twinkly/3}Você fez todos estes amigos maravilhosos...",
                                "<25>{*}{#e/twinkly/4}Mas agora você nunca mais os verá novamente.",
                                "<25>{*}{#e/twinkly/0}Sem mencionar o tempo de espera que eles terão até o próximo humano.",
                                "<25>{*}{#e/twinkly/1}Doeu, né?",
                                ...(1 <= SAVE.flag.n.killed_sans
                                    ? SAVE.flag.n.genocide_milestone < 7
                                        ? ['<25>{*}{#e/twinkly/7}Se você tivesse se mantido no nosso plano ORIGINAL...']
                                        : ['<25>{*}{#e/twinkly/7}Se você tivesse agido da mesma forma de quando estávamos juntos....']
                                    : ['<25>{*}{#e/twinkly/7}Se tivesse ido sem se preocupar com ninguém...']),
                                "<25>{*}{#e/twinkly/1}Você não precisaria se sentir mal agora.",
                                "<25>{*}{#e/twinkly/8}Eu... não consigo entender.",
                                '<25>{*}{#e/twinkly/13}Se você realmente fez tudo da forma correta...',
                                '<25>{*}{#e/twinkly/1}Por qual motivo as coisas ainda acabaram assim?',
                                '<25>{*}{#e/twinkly/2}Porquê...?',
                                '<25>{*}{#e/twinkly/2}A vida é tão injusta assim?',
                                '<25>{*}{#e/twinkly/3}...',
                                '<25>{*}{#e/twinkly/3}... olha.'
                            ]),
                        '<25>{*}{#e/twinkly/21}E se eu te disser...',
                        '<25>{*}{#e/twinkly/15}Que eu sei uma forma de te conseguir um final melhor?',
                        ...(SAVE.data.b.ultrashortcut || SAVE.data.s.room === '' || SAVE.data.s.room === spawn // NO-TRANSLATE

                            ? ["<25>{*}{#e/twinkly/20}Você vai ter que começar de novo, e..."]
                            : ["<25>{*}{#e/twinkly/20}Você vai CONTINUAR daqui, e..."]),
                        ...(SAVE.data.n.plot_date === 2.1
                            ? [
                                "<25>{*}{#e/twinkly/15}Bem, no meio tempo, que tal você ir ver Asgore?",
                                "<25>{*}{#e/twinkly/17}Com tanto que você se comporte, EU PROMETO que não vou matar ele."
                            ]
                            : 1.1 <= SAVE.data.n.plot_date
                                ? [
                                    "<25>{*}{#e/twinkly/15}Bem, no meio tempo, que tal ir ver a Undyne?",
                                    '<25>{*}{#e/twinkly/15}Parece que vocês poderiam ser mais amigos.',
                                    '<25>{*}{#e/twinkly/20}Quem sabe?',
                                    "<25>{*}{#e/twinkly/17}Talvez ela tenha a chave para sua felicidade?"
                                ]
                                : [
                                    "<25>{*}{#e/twinkly/15}Bem, no meio tempo, que tal você ir ver o Papyrus, e depois a Undyne?",
                                    '<25>{*}{#e/twinkly/15}Vocês todos poderiam ter sido mais amigos.',
                                    '<25>{*}{#e/twinkly/20}Quem sabe?',
                                    "<25>{*}{#e/twinkly/17}Talvez eles tenham a chave para sua felicidade?"
                                ]),
                        '<25>{*}{#e/twinkly/0}...',
                        '<25>{*}{#e/twinkly/15}Te vejo depois.'
                    ]
                    : [
                        '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}Ei.',
                        "<25>{*}{#e/twinkly/0}Desde que você me derrotou, eu estive pensando.",
                        ...(world.trueKills > 0 || SAVE.data.n.state_foundry_undyne === 1
                            ? [
                                '<25>{*}{#e/twinkly/2}É realmente necessário matar...?',
                                '<25>{*}{#e/twinkly/3}Eu...',
                                ...(1 <= SAVE.flag.n.killed_sans
                                    ? [
                                        '<25>{*}{#e/twinkly/1}Eu gostei do que fizemos juntos no passado, mas...',
                                        '<25>{*}{#e/twinkly/2}No fim, o que isso nos trouxe?'
                                    ]
                                    : [
                                        "<25>{*}{#e/twinkly/4}Eu sinceramente nem sei mais.",
                                        '<25>{*}{#e/twinkly/2}No final, o que isso realmente te trouxe?'
                                    ]),

                                '<25>{*}{#e/twinkly/13}Um pouco de prazer e então...'
                            ]
                            : [
                                '<25>{*}{#e/twinkly/2}Depois de poupar todo mundo, me matar foi realmente necessário...?',
                                '<25>{*}{#e/twinkly/3}Você...',
                                ...(1 <= SAVE.flag.n.killed_sans
                                    ? [
                                        '<25>{*}{#e/twinkly/1}Você deve se arrepender do que fizemos no passado juntos, mas...',
                                        '<25>{*}{#e/twinkly/2}Você pode dizer honestamente que me matar compensou isso?'
                                    ]
                                    : [
                                        "<25>{*}{#e/twinkly/4}Talvez você não goste de mim pelo que eu fiz, mas...",
                                        '<25>{*}{#e/twinkly/2}Você pode dizer honestamente que me matar fez qualquer diferença?'
                                    ]),
                                '<25>{*}{#e/twinkly/13}Talvez você sentiu algo, mas depois disso...'
                            ]),
                        '<25>{*}{#e/twinkly/3}... nada.',
                        '<25>{*}{#e/twinkly/0}...',
                        '<25>{*}{#e/twinkly/0}Eu tenho uma idéia.',
                        ...(world.trueKills > 0 || SAVE.data.n.state_foundry_undyne === 1
                            ? [
                                '<25>{*}{#e/twinkly/15}Um desafio, se assim preferir.',
                                ...(SAVE.data.s.room === '' || SAVE.data.s.room === spawn // NO-TRANSLATE

                                    ? ["<25>{*}{#e/twinkly/14}Você vai ter que começar de novo, claro..."]
                                    : ["<25>{*}{#e/twinkly/14}Você vai ter que RESETAR, é claro..."]),
                                "<25>{*}{#e/twinkly/15}Mas se você conseguir me provar que é forte o suficiente para sobreviver...",
                                '<25>{*}{#e/twinkly/15}Se você conseguir passar por tudo, do começo até o fim...',
                                ...(world.trueKills > 0
                                    ? [
                                        '<25>{*}{#e/twinkly/0}... sem matar um ser sequer...',
                                        "<25>{*}{#e/twinkly/18}... então assim, talvez eu não mate o rei."
                                    ]
                                    : [
                                        '<25>{*}{#e/twinkly/0}... sem deixar ninguém pra trás...',
                                        "<25>{*}{#e/twinkly/18}... então talvez o rei não tenha que morrer."
                                    ])
                            ]
                            : [
                                '<25>{*}{#e/twinkly/15}Um pedido, se assim quiser.',
                                ...(SAVE.data.b.ultrashortcut || SAVE.data.s.room === '' || SAVE.data.s.room === spawn // NO-TRANSLATE

                                    ? ["<25>{*}{#e/twinkly/20}Você vai ter que começar de novo, e..."]
                                    : ["<25>{*}{#e/twinkly/20}Você vai CONTINUAR daqui, e..."]),
                                '<25>{*}{#e/twinkly/15}Bem, no meio tempo, veja se você consegue ir até o Asgore.',
                                '<25>{*}{#e/twinkly/17} Tente ver se você consegue fazer isso sem matar ninguém.'
                            ]),
                        "<25>{*}{#e/twinkly/20}Você quer saber o que ele está planejando, não quer?",
                        '<25>{*}{#e/twinkly/20}Para saber o que tem no fundo do seu precioso \"arquivo\"?',
                        '<25>{*}{#e/twinkly/15}Bom.',
                        '<25>{*}{#e/twinkly/15}Acredite em mim quando eu te digo que o que você viu comigo...',
                        "<25>{*}{#e/twinkly/20}... nem sequer COMEÇA a arranhar a superfície.",
                        '<25>{*}{#e/twinkly/17}Hee hee hee.',
                        "<25>{*}{#e/twinkly/18}Eu irei deixar você decidir."
                    ],
            postnoot1: (rep: number) =>
                rep < 2
                    ? [
                        "<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/17}Me desculpa, o que é?",
                        ...(rep < 1
                            ? ["<25>{*}{#e/twinkly/17}Você não conseguiu seu final feliz?"]
                            : ["<25>{*}{#e/twinkly/17}Você AINDA não conseguiu seu final feliz?"]),
                        ...(SAVE.data.b.ultrashortcut
                            ? [
                                '<25>{*}{#e/twinkly/21}...',
                                ...(SAVE.flag.b.ultra_twinkly
                                    ? [
                                        "<25>{*}{#e/twinkly/21}Bem, caramba, se não bastasse fazer isso antes...",
                                        "<25>{*}{#e/twinkly/16} VOCÊ FOI LÁ E IGNOROU TUDO DE NOVO! PULANDO!",
                                        "<25>{*}{#e/twinkly/15}Não que eu esteja surpreso.",
                                        '<25>{*}{#e/twinkly/15}Sinceramente, você tem cara daqueles que quebram as regras.',
                                        "<25>{*}{#e/twinkly/20}Eventualmente, você vai perceber o que está perdendo...",
                                        "<25>{*}{#e/twinkly/15}E então você vai lá viver essa experiência e voltar até o rei.",
                                        '<25>{*}{#e/twinkly/15}Preferencialmente, sem matar ninguém.',
                                        '<25>{*}{#e/twinkly/18}Você sabe o que fazer!'
                                    ]
                                    : [
                                        '<25>{*}{#e/twinkly/21} Carambolas, eu imagino o que poderia ter acontecido...',
                                        "<25>{*}{#e/twinkly/16}SE VOCÊ NÃO TIVESSE PULADO A JORNADA INTEIRA!",
                                        '<25>{*}{#e/twinkly/24}... mas, tanto faz.',
                                        '<25>{*}{#e/twinkly/23}Curte seu final especial enquanto ele durar.'
                                    ])
                            ]
                            : world.trueKills > 0 || SAVE.data.n.state_foundry_undyne === 1
                                ? [
                                    ...(rep < 1
                                        ? [
                                            '<25>{*}{#e/twinkly/20}...',
                                            '<25>{*}{#e/twinkly/20}Horas, horas, bolas, horas, bolas...',
                                            world.trueKills > 1
                                                ? "<25>{*}{#e/twinkly/16}Talvez da próxima vez, não MATE ninguém!"
                                                : world.trueKills > 0
                                                    ? "<25>{*}{#e/twinkly/16}Talvez da próxima vez, não MATE ninguém!"
                                                    : "<25>{*}{#e/twinkly/16}Talvez da próxima vez, não deixa alguém pra trás para MORRER!",
                                            '<25>{*}{#e/twinkly/15}Se você conseguir isso, e conseguir ser amigo do Papyrus e da Undyne...',
                                            ...(SAVE.data.b.ubershortcut
                                                ? ["<25>{*}{#e/twinkly/15}Você não terá que pular uma área inteira."]
                                                : ['<25>{*}{#e/twinkly/15}Você conseguirá chegar a algum lugar.'])
                                        ]
                                        : [
                                            '<25>{*}{#e/twinkly/14}...',
                                            '<25>{*}{#e/twinkly/14}Pelo amor de...',
                                            world.trueKills > 1
                                                ? "<25>{*}{#e/twinkly/22}Vou dizer pela última vez, não MATE ninguém!"
                                                : world.trueKills > 0
                                                    ? "<25>{*}{#e/twinkly/22}Pela última vez, não MATE alguém!"
                                                    : "<25>{*}{#e/twinkly/22}Pela última vez, não deixe alguém MORRER!",
                                            ...(SAVE.data.b.ubershortcut
                                                ? ["<25>{*}{#e/twinkly/22}E também não pule uma área inteira!"]
                                                : ['<25>{*}{#e/twinkly/22}Qual a dificuldade de colocar isso na sua cabeça?'])
                                        ])
                                ]
                                : [
                                    '<25>{*}{#e/twinkly/0}...',
                                    ...(SAVE.data.b.ultrashortcut || SAVE.data.s.room === '' || SAVE.data.s.room === spawn // NO-TRANSLATE

                                        ? ['<25>{*}{#e/twinkly/21}... talvez, se você começar de novo...']
                                        : ['<25>{*}{#e/twinkly/21}... talvez, se você CONTINUAR daqui...']),
                                    ...(rep < 1
                                        ? [
                                            1.1 <= SAVE.data.n.plot_date
                                                ? "<25>{*}{#e/twinkly/15}Você será amigo da Undyne desta vez."
                                                : "<25>{*}{#e/twinkly/15}Você fará amizade com Papyrus e Undyne desta vez.",

                                            '<25>{*}{#e/twinkly/14}O alardeado \"poder da amizade...\"',
                                            '<25>{*}{#e/twinkly/23}Só dessa vez, ele deve ser útil pra alguma coisa.'
                                        ]
                                        : [
                                            1.1 <= SAVE.data.n.plot_date
                                                ? "<25>{*}{#e/twinkly/16}Você finalmente se tornou amigo da Undyne!"
                                                : "<25>{*}{#e/twinkly/16}Você finalmente se tornou amigo do Papyrus e da Undyne!",
                                            "<25>{*}{#e/twinkly/20}Afinal, qual é o mal em um pouco de amizade?",
                                            "<25>{*}{#e/twinkly/15}Vai ser divertido para toda a família."
                                        ])
                                ])
                    ]
                    : [
                        [
                            '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/15}... então...',
                            '<25>{*}{#e/twinkly/15}Alguma coisa te mantendo ocupado ultimamente?',
                            '<25>{*}{#e/twinkly/15}Fez novos amigos?',
                            '<25>{*}{#e/twinkly/0}...',
                            '<25>{*}{#e/twinkly/17}Pessoalmente, eu fazia amigos o tempo todo.',
                            '<25>{*}{#e/twinkly/20} Tipo o Papyrus, por exemplo.',
                            "<25>{*}{#e/twinkly/15}Ele não vai lembrar disso, mas uma vez eu o treinei pra ser parte da guarda real.",
                            '<25>{*}{#e/twinkly/18}Na verdade, eu fiz ele se tornar o Capitão!',
                            "<25>{*}{#e/twinkly/24}Pode crer que... não foi fácil.",
                            "<25>{*}{#e/twinkly/15}Eu meeeeiiio que acabei quase quebrando os ossos dele.",
                            '<25>{*}{#e/twinkly/19}Mas depois disso, ele se tornou um cara durão!',
                            '<25>{*}{#e/twinkly/17}Engraçado como as pessoas mudam se puxarmos os gatilhos corretos, né?',
                            "<25>{*}{#e/twinkly/15}De toda forma.\nAquela linha do tempo se foi.",
                            '<25>{*}{#e/twinkly/20}Mas ei, se você voltar aqui de novo...',
                            "<25>{*}{#e/twinkly/18}Eu te conto algumas outras."
                        ],
                        [
                            '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/20}Pronto para mais um turno de historinhas?',
                            '<25>{*}{#e/twinkly/15}Ha, é claro que você tá!\nO que eu tô pensando?',
                            '<25>{*}{#e/twinkly/21}Então, aquela sala lá atrás...',
                            '<25>{*}{#e/twinkly/0}A que tem humanos dentro de caixas.',
                            "<25>{*}{#e/twinkly/15}Na verdade ela é bem complicada, até pra mim, de entrar.",
                            '<25>{*}{#e/twinkly/24}Em linhas do tempo passados, eu tentei... os métodos mais bobos.',
                            '<25>{*}{#e/twinkly/13}Implorar...\nBarganhar...\nChorar de mentira...',
                            '<25>{*}{#e/twinkly/4}Eu até tentei fazer olhos fofinhos na esperança de Asgore me mostrá-las.',
                            '<25>{*}{#e/twinkly/0}Eu tentei ser \"legal\", mas nada disso funcionou.',
                            '<25>{*}{#e/twinkly/15}Claro que, em linhas do tempo mais recentes, eu já sabia o que fazer pra ter o que eu queria.',
                            '<25>{*}{#e/twinkly/20}Sufocar todo mundo até a morte fez basicamente tudo que eu precisei...',
                            '<25>{*}{#e/twinkly/16}Mas destruir o sistema de gravidade e vê-los serem esmagados foi tão divertido quanto!',
                            "<25>{*}{#e/twinkly/15}Só avisando, aquele sala que você passou é super protegida.",
                            "<25>{*}{#e/twinkly/17}Você só entra lá porque eles QUEREM que você entre.",
                            "<25>{*}{#e/twinkly/20}Bom.\nIsso é tudo por agora.",
                            '<25>{*}{#e/twinkly/19}Bye-bye!'
                        ],
                        [
                            '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/14}Sério?\nDe novo?',
                            '<25>{*}{#e/twinkly/0}Wow.',
                            '<25>{*}{#e/twinkly/0}Você deve estar ficando entediado disso tudo.',
                            "<25>{*}{#e/twinkly/15}Mas relaxa.\nEu também estou.",
                            '<25>{*}{#e/twinkly/20}Eu me pergunto...',
                            '<25>{*}{#e/twinkly/20}Você é tão mal assim em seguir instruções?',
                            '<25>{*}{#e/twinkly/20}Ou você só tá fazendo isso de propósito?',
                            "<25>{*}{#e/twinkly/15}... meh, não me fala.",
                            '<25>{*}{#e/twinkly/18}Saber de tudo não tem graça, sabe?',
                            "<25>{*}{#e/twinkly/15}E eu também estou em um bom humor.",
                            '<25>{*}{#e/twinkly/20}Então... que tal te deixar no benefício da dúvida?',
                            '<25>{*}{#e/twinkly/14}Se você realmente é IDIOTA desse tanto...',
                            '<25>{*}{#e/twinkly/15}Volta aqui mais uma vez, aí talvez eu tenha uma forma de te ajudar.',
                            '<25>{*}{#e/twinkly/17}... te vejo depois.'
                        ],
                        [
                            "<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}Olha só quem voltou.",
                            "<25>{*}{#e/twinkly/0}Eu pediria pra você se explicar, mas eu nem ligo.",
                            '<25>{*}{#e/twinkly/0}Se você voltou, isso... significa que você precisa de minha ajuda.',
                            '<25>{*}{#e/twinkly/21}...',
                            "<25>{*}{#e/twinkly/15}Escuta.\nEu só vou dizer isso uma vez.",
                            '<25>{*}{#e/twinkly/15}De agora em diante, os monstros que você encontrar...',
                            '<25>{*}{#e/twinkly/15}Vão ter um muito reduzido {@fill=#ff0}ATAQUE{@fill=#fff}.',
                            '<25>{*}{#e/twinkly/20}Entendeu?\nSeus {@fill=#ff0}ATAQUES{@fill=#fff} serão reduzidos.',
                            '<25>{*}{#e/twinkly/20}O que faz mais fácil sobreviver sem precisar ganhar LOVE.',
                            "<25>{*}{#e/twinkly/15}Cara, é uma coisa boa que o CORE controla a atmosfera.",
                            "<25>{*}{#e/twinkly/20}Se não, nem teria como fazer isso.",
                            '<25>{*}{#e/twinkly/14} Já Papyrus e Undyne...',
                            "<25>{*}{#e/twinkly/23}Bem, se você não consegue entender isso, então não tem esperança.",
                            "<25>{*}{#e/twinkly/15}Só não seja idiota e tudo vai ficar bem.",
                            "<25>{*}{#e/twinkly/15}... okay.\nIsso é tudo.",
                            '<25>{*}{#e/twinkly/15}Boa sorte.'
                        ],
                        [
                            '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}...',
                            "<25>{*}{#e/twinkly/0}... você só está tentando ver o que eu tenho pra falar, né não?",
                            '<25>{*}{#e/twinkly/15}Bom, espero que tenha válido a pena.',
                            "<25>{*}{#e/twinkly/17}Já que eu NUNCA mais vou voltar.",
                            "<25>{*}{#e/twinkly/0}A não ser que você faça o que eu falei pra você fazer.",
                            '<25>{*}{#e/twinkly/15}O quê?\nVocê acha que pode me desobedecer pra sempre?',
                            '<25>{*}{#e/twinkly/15}... não.',
                            "<25>{*}{#e/twinkly/21}Mais cedo ou mais tarde, você vai se entediar...",
                            '<25>{*}{#e/twinkly/15}E sua curiosidade vai inevitavelmente retirar o melhor de ti.',
                            '<25>{*}{#e/twinkly/23}Confia em mim.\nEu sei como essas coisas funcionam.',
                            '<25>{*}{#e/twinkly/20}Isso se aplica a humanos e monstros de modo geral...',
                            '<25>{*}{#e/twinkly/17} Curiosidade acaba entregando o melhor de todo mundo.',
                            '<25>{*}{#e/twinkly/16}Divirta-se enquanto durar, idiota!'
                        ]
                    ][rep - 2],
            postnoot2: (rep: number, puzzlesolve: boolean, enemyweaken: boolean) => [
                ...((puzzlesolve || enemyweaken) && !SAVE.flag.b.neutral_reload_interloper
                    ? [
                        '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/20}Aliás...',
                        ...(puzzlesolve
                            ? ['<25>{*}{#e/twinkly/15}Me agradeça por resolver os quebra-cabeças pra você.']
                            : []),
                        ...(enemyweaken
                            ? [
                                puzzlesolve
                                    ? '<25>{*}{#e/twinkly/15}Ah, e quebrar o sistema atmosférico.'
                                    : '<25>{*}{#e/twinkly/15}Você pode me agradecer por quebrar o sistema atmosférico.',
                                '<25>{*}{#e/twinkly/21}Eu acabei percebendo, que se você simplesmente quer MATAR...',
                                '<25>{*}{#e/twinkly/15}Eu vou enfraquecer seus inimigos pra facilitar sua vida.'
                            ]
                            : []),
                        "<25>{*}{#e/twinkly/17}Isso não foi tão considerável da minha parte?",
                        '<25>{*}{#e/twinkly/17}...'
                    ]
                    : []),
                ...(rep < 1
                    ? [
                        "<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}Assim como da última vez, eu te dei a alma do Asgore.",
                        '<25>{*}{#e/twinkly/0}Pega ela e some da minha frente.',
                        '<25>{*}{#e/twinkly/20}E se você voltar...',
                        '<25>{*}{#e/twinkly/15}Tenta agir mais na linha da próxima vez.'
                    ]
                    : [
                        "<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}Como sempre, eu te dei a alma do Asgore.",
                        '<25>{*}{#e/twinkly/0}Pega ela e some da minha frente.',
                        '<25>{*}{#e/twinkly/20}E Lembre-se...',
                        "<25>{*}{#e/twinkly/15}O fim será o mesmo até você fazer o que eu te disse."
                    ])
            ],
            oof: ['<32>{#p/human}* (Você respira fundo...)'],
            killer1: [
                '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/15}Wow.',
                "<25>{*}{#e/twinkly/17}Você ferrou com tudo, né?",
                '<25>{*}{#e/twinkly/20}Você não só perdeu o controle da linha do tempo...',
                "<25>{*}{#e/twinkly/15}Mas agora, você não pode tomar de volta a não ser que comece do início."
            ],
            killer2: [
                '<25>{*}{#p/twinkly}{#e/twinkly/14}Mas ei...',
                "<25>{*}{#e/twinkly/23}Se este era o desfecho que você queria...",
                '<25>{*}{#e/twinkly/15}Quem sou eu pra julgar?',
                "<25>{*}{#e/twinkly/17}Mas você não pode SINCERAMENTE achar que eu vou acreditar nisso!",
                '<25>{*}{#e/twinkly/17}Era isso que você estava tentando alcançar?',
                '<25>{*}{#e/twinkly/15}Olha, é claro.\nFoi bem interessante de assistir.',
                "<25>{*}{#e/twinkly/17}Mas agora que acabou..."
            ],
            killer3: [
                '<25>{*}{#p/twinkly}{#e/twinkly/15}... Tá.\nAmbos sabemos que você pode fazer melhor.',
                "<25>{*}{#e/twinkly/20}Eu não estou dizendo que sou algum tipo de santo ou sei lá...",
                "<25>{*}{#e/twinkly/15}Mas, acredite ou não, eu estou do seu lado.",
                '<25>{*}{#e/twinkly/15}Eu QUERO que você ganhe controle da linha do tempo de novo.',
                '<25>{*}{#e/twinkly/17}Até porque, ver você paradão aí sem fazer nada...',
                "<25>{*}{#e/twinkly/17}Não vai ser muito divertido, ou vai?"
            ],
            killer4: [
                "<25>{*}{#p/twinkly}{#e/twinkly/15}... e, não se preocupa.",
                '<25>{*}{#e/twinkly/20}Mesmo se eu perder todas as minhas memórias, de que importa?',
                "<25>{*}{#e/twinkly/18}VOCÊ vai lembrar.\nE com isso, irá desviar dessa armadilha.",
                '<25>{*}{#e/twinkly/15}Então, poderemos voltar ao que éramos antes.',
                '<25>{*}{#e/twinkly/20}O que você acha?',
                '<25>{*}{#e/twinkly/20}Você está comigo, $(name)?',
                '{*}{#e/twinkly/3}{%}'
            ],
            killer5: [
                '<25>{*}{#p/twinkly}{#e/twinkly/15}Ah, o que eu estou pensando.',
                '<25>{*}{#e/twinkly/16}É claro que você está!'
            ],
            please1: [
                '<25>{*}{#p/human}(...)',
                '<25>{*}(Mas ainda assim, existe a opção.)',
                "<25>{*}(A opção de resetar tudo que você viu.)",
                '<25>{*}(A opção de trazer tudo de volta ao zero.)'
            ],
            please2: [
                '<25>{*}{#p/human}(...)',
                '<25>{*}(Mas você só quer viver sua vida.)',
                '<25>{*}(Você só quer ver o que tem no futuro.)',
                '<25>{*}(Você só quer ser si mesmo.)'
            ],
            please3: [
                '<25>{*}{#p/human}(...)',
                '<25>{*}(Você agradece ao além pelo que eles fizeram...)',
                '<25>{*}(E pede que você tenha permissão para continuar.)'
            ],
            forget1: ['<25>{*}{#p/human}(...)', "<25>{*}(Você está tão sozinho.)"],
            forget2: ['<25>{*}{#p/human}(...)', "<25>{*}(Você está com tanto medo.)"],
            forget3: [
                '<25>{*}{#p/human}(...)',
                "<25>{*}(Você faria qualquer coisa para ter outra chance...)",
                "<25>{*}(... mesmo que isso signifique esquecer tudo o que você já conheceu.)"
            ],
            forget4: [
                '<25>{*}{#p/human}(...)',
                "<25>{*}(Mas a escolha não é sua.)",
                "<25>{*}(É a escolha de outra pessoa, agora.)"
            ],
            regret1: ['<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}Oi.'],
            regret2: [
                '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/0}Parece que tudo está completamente feliz.',
                '<25>{*}{#e/twinkly/0}Monstros encontraram seu novo mundo.',
                '<25>{*}{#e/twinkly/0}Paz e prosperidade vai reinar pela galáxia.',
                '<25>{*}{#e/twinkly/1}De uma boa respirada.',
                "<25>{*}{#e/twinkly/2}Não tem mais nada para se preocupar."
            ],
            regret3: [
                '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/3}...',
                '<25>{*}{#e/twinkly/4}Bem.',
                '<25>{*}{#e/twinkly/4}Tem uma coisa.',
                '<25>{*}{#e/twinkly/5}Um último... mistério.',
                "<25>{*}{#e/twinkly/6}Uma coisa que tem me deixado curioso desde que você chegou."
            ],
            regret4: [
                '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/7}...',
                '<25>{*}{#e/twinkly/7}Quando você chegou aqui, eu percebi algo.',
                '<25>{*}{#e/twinkly/3}Tinha algo sobre seu LOVE.',
                '<25>{*}{#e/twinkly/4}Ele era... zero.',
                '<25>{*}{#e/twinkly/6}...',
                '<25>{*}{#e/twinkly/6}Se você conseguir descobrir o que isso significa...',
                "<25>{*}{#e/twinkly/7}Talvez... isso possa nos trazer algo novo.",
                '<25>{*}{#e/twinkly/10}...',
                "<25>{*}{#e/twinkly/10}Na verdade, eu não sei.",
                "<25>{*}{#e/twinkly/10}Eu nem sei o motivo de estar falando isso, de verdade.",
                '<25>{*}{#e/twinkly/9}...',
                '<25>{*}{#e/twinkly/9}Pra ser honesto...',
                "<25>{*}{#e/twinkly/1}Eu duvido muito que tenha qualquer ponto em fazer isso.",
                "<25>{*}{#e/twinkly/2}Todos estão felizes, certo?",
                '<25>{*}{#e/twinkly/3}Toriel, Sans, Papyrus, Undyne, Alphys, Asgore...',
                '<25>{*}{#e/twinkly/4}Até Monster Kid, e o... Napstablook.',
                '<25>{*}{#e/twinkly/2}Vale realmente a pena começar do início... por minha causa?',
                '<25>{*}{#e/twinkly/2}...',
                "<25>{*}{#e/twinkly/10}Talvez eu só esteja te dizendo isso, pois quando eu tinha seus poderes...",
                "<25>{*}{#e/twinkly/11}Eu tenho considerado fazer, no seu lugar.",
                '<25>{*}{#e/twinkly/12}Mas agora, a ideia de resetar tudo...',
                '<25>{*}{#e/twinkly/10}Eu...',
                "<25>{*}{#e/twinkly/10}Eu não sei se poderia fazer isso tudo de novo.",
                '<25>{*}{#e/twinkly/10}Não depois de tudo.',
                '<25>{*}{#e/twinkly/11}...',
                '<25>{*}{#e/twinkly/11}Então, por favor.',
                '<25>{*}{#e/twinkly/11}Fique contente com o que você tem.',
                "<25>{*}{#e/twinkly/7}Não é perfeito, mas...",
                '<25>{*}{#e/twinkly/5}... quem disse que precisa ser?'
            ],
            regret5: [
                '<25>{*}{#p/twinkly}{#f/19}{#e/twinkly/5}...',
                '<25>{*}{#e/twinkly/8}É...',
                "<25>{*}{#e/twinkly/8}Se eu não puder mudar sua mente.",
                '<25>{*}{#e/twinkly/7}Se você acabar resetando TUDO...',
                '<25>{*}{#e/twinkly/6}...',
                '<25>{*}{#e/twinkly/2}Você vai limpar minhas memórias também.',
                '<25>{*}{#e/twinkly/7}...',
                "<25>{*}{#e/twinkly/6}Me desculpa.",
                "<25>{*}{#e/twinkly/2}Você já deve ter isso escutado isso umas centenas de vezes, né?",
                '<25>{*}{#e/twinkly/6}...',
                "<25>{*}{#e/twinkly/6}Isso é tudo.",
                '<25>{*}{#e/twinkly/4}Até nos vermos de novo...',
                '<25>{*}{#e/twinkly/13}$(name).'
            ],
            asgoreStoryPre1: () =>
                world.bad_robot
                    ? [
                        '<25>{#p/alphys}{#g/alphysSide}* O-o-oi...\n* Você...',
                        '<25>{#g/alphysSideSad}* Você r-realmente curte matar pessoas...\n*... huh?',
                        "<25>{#g/alphysNervousLaugh}* Eu-eu, não estou julgando, é só que...",
                        "<25>{#g/alphysUhButHeresTheDeal}* Eu só acho que isso é super hyper da hora!!!",
                        '<25>{#g/alphysSideSad}* En-então... Talvez...',
                        "<25>{#g/alphysCutscene3}* Você considere não me matar???"
                    ]
                    : ["<25>{#p/asgore}{#f/0}* Não é lindo...?", '<25>{#p/asgore}{#f/0}* ...'],
            asgoreStoryPre2: () =>
                world.bad_robot
                    ? ['<25>{*}{#p/alphys}{#g/alphysOhGodNo}* Atrás de você!!!{%}']
                    : [
                        '<25>{#p/asgore}{#f/6}* Me desculpe se eu te assustei, pequeno.',
                        '<25>{#p/asgore}{#f/6}* Alphys me informou da sua chegada.'
                    ],
            asgoreStoryPre3: () => [
                '<25>{#p/asgore}{#f/7}* ...',
                ...(SAVE.flag.b.waaaaaooaaooooaaaaaaooohooohooohstooooryofunderrtaaaaale
                    ? [
                        '<25>{#p/asgore}{#f/12}* Hm...?\n* Você já ouviu essa história?',
                        '<25>{#p/asgore}{#f/5}* ...',
                        '<25>{#p/asgore}{#f/6}* Bem.',
                        '<25>{#p/asgore}{#f/6}* Se você já escutou, não a necessidade de repetir.',
                        '<25>{#p/asgore}{#f/6}* Continue neste caminho por conta própria.'
                    ]
                    : ['<25>{#p/asgore}{#f/7}* Venha.', '<25>{#p/asgore}{#f/7}* Eu gostaria de te contar uma história.'])
            ],
            alphysApproach1: [
                "<25>{#p/alphys}{#g/alphysSmileSweat}* Ah, v-você de estar se perguntando onde está Asgore, certo?",
                "<25>{#g/alphysNervousLaugh}* Bem... ele...",
                '<25>{#g/alphysHellYeah}* Esta em algum lugar seguro!',
                '<25>{#g/alphysTheFactIs}* Relativamente falando.',
                '<25>{#g/alphysOhGodNo}* Er-\n* Não, Absolutamente!\n* Absolutamente falando!',
                '<25>{#g/alphysInquisitive}* Então, ba-basicamente, você pode só... desistir logo.',
                '<26>{#g/alphysInquisitive}* Porquê...',
                "<26>{#g/alphysNervousLaugh}* Você nunca vai encontrá-lo!",
                '<25>{#g/alphysHellYeah}* É!\n* V-viva com isso!'
            ],
            alphysApproach2: [
                '<25>{#p/alphys}{#g/alphysOhGodNo}* ...',
                '<25>{#g/alphysNervousLaugh}* ... eheh...',
                '<25>{#g/alphysNervousLaugh}* Conseguiu se safar igual você sempre faz, né?',
                '<25>{#g/alphysNeutralSweat}* ...',
                "<25>{#g/alphysIDK2}* Acho que você vai acabar encontrando ASGORE.",
                '<25>{#g/alphysIDK3}* ...',
                "<25>{#g/alphysIDK3}* Eu sou tão estúpida...",
                "<25>{#g/alphysThatSucks}* Você provavelmente nem liga pra mim, né?",
                "<25>{#g/alphysIDK2}* Eu estava com medo correndo de você e você nem está atrás de mim.",
                '<25>{#g/alphysIDK3}* ...',
                "<25>{#g/alphysIDK2}* Vai.\n* Faça seja lá o que você quer fazer.",
                "<26>{#g/alphysIDK3}* Eu não consigo te parar."
            ],
            alphysApproach3: ["<25>{#p/alphys}{#g/alphysFR}* Existe uma pessoa que poderia."],
            asgoreStory1: [
                '<25>{*}{#p/asgore}{#f/6}* A muito tempo atrás uma criança humana caiu com sua nave no Outpost.{~}',
                '<25>{*}{#p/asgore}{#f/6}* Machucada, ela gritou por ajuda.{~}'
            ],
            asgoreStory1r: ['<32>{#p/basic}* ...{%40}', "<32>{#p/basic}* Me desculpa.{%40}"],
            asgoreStory2: [
                '<25>{*}{#p/asgore}{#f/7}* Asriel, nosso filho unigênito, correu para ajudar.{~}',
                '<25>{*}{#p/asgore}{#f/7}* Ele a trouxe de volta para casa em nossas residências.{~}'
            ],
            asgoreStory2r: ['<32>{#p/basic}* Eu fiz o melhor que pude.{%40}'],
            asgoreStory3: [
                '<25>{*}{#p/asgore}{#f/6}* Após um tempo, as duas crianças se tornaram como irmãos.{~}',
                '<25>{*}{#p/asgore}{#f/6}* O Outpost cresceu, e assim também cresceu nossa harmonia.{~}',
                '<25>{*}{#p/asgore}{#f/6}* O Outpost estava cheio de esperança.{~}'
            ],
            asgoreStory3r: ['<32>{#p/basic}* Eu tentei seguir meu coração.{%40}'],
            asgoreStory4: [
                '<25>{*}{#p/asgore}{#f/1}* Mas, um dia...{~}',
                '<25>{*}{#p/asgore}{#f/2}* Uma doença surpreendeu o humano.{~}'
            ],
            asgoreStory4r: ['<32>{#p/basic}* Eu tentei fazer a coisa certa.{%40}'],
            asgoreStory5: [
                '<25>{*}{#p/asgore}{#f/1}* A beira da morte, o humano tinha apenas um pedido.{~}',
                '<25>{*}{#p/asgore}{#f/1}* De ver os restos de nosso outrora grande e abundante mundo.{~}',
                '<25>{*}{#p/asgore}{#f/2}* Mas não havia nada que pudéssemos fazer.{~}'
            ],
            asgoreStory5r: ['<32>{#p/basic}* Tudo que eu queria é que ele pudesse ver o universo.{%40}'],
            asgoreStory6: [
                '<25>{*}{#p/asgore}{#f/1}* No dia seguinte...{~}',
                '<25>{*}{#p/asgore}{#f/1}* ...{~}',
                '<25>{*}{#p/asgore}{#f/2}* O humano pereceu.{~}'
            ],
            asgoreStory6r: ['<32>{#p/basic}* Tudo que eu queria é que ele fosse feliz.{%40}'],
            asgoreStory7: [
                '<25>{*}{#p/asgore}{#f/15}* Asriel, tomado pela tristeza, absorveu a ALMA do humano.{~}',
                '<25>{*}{#p/asgore}{#f/16}* Transformando-se em um ser de poder inimaginável.{~}'
            ],
            asgoreStory7r: ['<33>{#p/basic}* Eu nunca quis que...{%40}'],
            asgoreStory8: [
                '<25>{*}{#p/asgore}{#f/4}* Com este novo poder, Asriel atravessou o escudo de força.{~}',
                "<25>{*}{#p/asgore}{#f/4}* O corpo humano ao lado enquanto ele voava em uma pequena nave. {~}",
                '<25>{*}{#p/asgore}{#f/4}* Na esperança de encontrar os artefatos lendários.{~}'
            ],
            asgoreStory8r: ['<32>{#p/basic}* ...{%40}'],
            asgoreStory9: [
                '<25>{*}{#p/asgore}{#f/1}* Logo, ele se deparou com o que estava procurando.{~}',
                '<25>{*}{#p/asgore}{#f/1}* Aterrissando em meio aos pedaços quebrados e espalhados... {~}',
                "<25>{*}{#p/asgore}{#f/1}* O corpo do humano foi colocado para descanso.{~}"
            ],
            asgoreStory9r: ['<32>{#p/basic}* ...{%40}'],
            
            
            asgoreStory10: [
                "<25>{*}{#p/asgore}{#f/5}* De repente, o alarme de proximidade da nave soou.{~}",
                "<25>{*}{#p/asgore}{#f/5}* Seguranças o viram com o corpo de um humano.{~}",
                '<25>{*}{#p/asgore}{#f/2}* Eles pensaram que ele havia o matado.{~}'
            ],
            asgoreStory11: [
                '<25>{*}{#p/asgore}{#f/2}* Os humanos o atacaram com tudo que tinham.{~}',
                '<25>{*}{#p/asgore}{#f/2}* Tiro após tiro, explosão após explosão...{~}',
                '<25>{*}{#p/asgore}{#f/2}* Naquela forma, ele tinha o poder para destruir todos.{~}'
            ],
            asgoreStory12: [
                '<25>{*}{#p/asgore}{#f/4}* Mas...{~}',
                '<25>{*}{#p/asgore}{#f/4}* Asriel não lutou.{~}'
            ],
            asgoreStory12r: ['<32>{#p/human}* (Você escuta alguém chorando...){%40}'],
            asgoreStory13: [
                "<25>{*}{#p/asgore}{#f/9}* Segurando o corpo humano, Asriel olhou uma última vez para o espaço... {~}",
                '<25>{*}{#p/asgore}{#f/9}* Ele sorriu... e foi embora.{~}'
            ],
            asgoreStory13r: ["<32>{#p/basic}* Eu n-não pude...\n* Ele n-n-não me d-deixou...{%40}"],
            asgoreStory14: [
                '<25>{*}{#p/asgore}{#f/1}* Cambaleando, Asriel levou sua dor de volta para casa.{~}',
                '<25>{*}{#p/asgore}{#f/1}* Ele chegou, saiu do veículo e colapsou.{~}',
                '<25>{*}{#p/asgore}{#f/2}* Sua poeira se espalhou pelo patio. {~}'
            ],
            asgoreStory14r: ['<32>{#p/basic}* ...{%40}'],
            asgoreStory15: [
                '<25>{*}{#p/asgore}{#f/13}* O Outpost, meu querido Outpost... caiu em desespero.{~}',
                '<25>{*}{#p/asgore}{#f/13}* Nós perdemos duas crianças em uma noite.{~}',
                '<25>{*}{#p/asgore}{#f/14}* Tudo foi tomado de nós, mais uma vez.{~}'
            ],
            asgoreStory15r: ["<32>{#p/basic}* ... não é justo...{%40}"],
            asgoreStory16: [
                '<25>{*}{#p/asgore}{#f/13}* Na emoção do ódio, eu declarei guerra a humanidade.{~}',
                '<25>{*}{#p/asgore}{#f/13}* Não importava o custo. Eu daria liberdade ao povo monstro.{~}',
                '<25>{*}{#p/asgore}{#f/14}* ... e o povo acreditou em mim.{~}'
            ],
            asgoreStory16r: ["<32>{#p/basic}* Não é justo...!{%40}"],
            asgoreStory17: [
                '<25>{*}{#p/asgore}{#f/3}* Quando eu voltei para a razão, já era tarde demais para regressão.{~}',
                '<25>{*}{#p/asgore}{#f/2}* O povo já estava com o sentimento de guerra em suas mentes e nada poderia mudar isso..{~}',
                '<25>{*}{#p/asgore}{#f/5}* Pelo menos, nada publicamente.{~}'
            ],
            asgoreStory18: () =>
                SAVE.data.b.killed_mettaton || world.baddest_lizard
                    ? [
                        '<25>{*}{#p/asgore}{#f/5}* A está altura, Alphys já deve ter contado sobre um certo segredo.{~}',
                        '<25>{*}{#p/asgore}{#f/5}* Um acordo entre minha pessoa e o ex-cientista real.{~}',
                        '<25>{*}{#p/asgore}{#f/6}* ... agora, se eu soubesse o que estava segurando-a... {~}'
                    ]
                    : [
                        '<25>{*}{#p/asgore}{#f/5}* Nesta altura, Alphys deve ter lhe contado sobre um certo {@fill=#003cff}segredo{@fill=#fff}. {~}',
                        '<25>{*}{#p/asgore}{#f/5}* Um {@fill=#003cff}acordo{@fill=#fff} entre minha pessoa e o ex-cientista real. {~}',
                        '<25>{*}{#p/asgore}{#f/6}* ... Ah, lá está ela.\n* Eu estive me perguntando quando ela chegaria. {~}'
                    ],
            asgoreStory19: [
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* Uh, me-me d-desculpa!\n* Eu cheguei aqui o mais rápido que pude!',
                '<25>{#p/asgore}{#f/6}* Coisas boas vem para aqueles que tem paciência.',
                "<25>{#p/alphys}{#g/alphysWorried}* ... Você acha que ele está pronto?"
            ],
            asgoreStory20a: [
                '<25>{#p/asgore}{#f/7}* Pequeno, se você puder nos deixar a sós por um momento...',
                '<25>{#p/asgore}{#f/7}* Eu e Alphys temos assuntos a tratar.'
            ],
            asgoreStory20b: [
                "<25>{#p/alphys}{#g/alphysHellYeah}* Isso, va-vai seguindo em frente e nos alcança do outro lado!"
            ],
            asgoreStory21: [
                '<25>{#p/asgore}{#f/5}* Que estranho.\n* Ela não parece estar por aqui.',
                '<25>{#p/asgore}{#f/5}* ... Isso está fora do que eu tinha em mente.'
            ],
            asgoreStory22: [
                '”',
                '<25>{#p/asgore}{#f/5}* Isto não pode demorar, nenhum pouco mais.'
            ],

            
            jspeech1: () => [
                '<32>{#p/darksans}* Então você finalmente chegou.',
                '<32>* O fim da sua jornada está mais próximo que nunca.',
                world.bad_robot || SAVE.data.b.ultrashortcut
                    ? '<32>* Em alguns momentos, você encontrará o rei.'
                    : '<32>* Em alguns momento, você encontrará o rei outra vez.',
                '<32>* Juntos...',
                ...(SAVE.data.b.ultrashortcut
                    ? [
                        '<32>* ...',
                        "<32>* Alguma coisa, não está certa...",
                        '<32>* Como você chegou tão rápido?',
                        '<32>* Você por acaso....',
                        '<32>* Pegou algum {@fill=#ff0}atalho{@fill=#fff} ou coisa do tipo?'
                    ]
                    : [
                        ...(SAVE.data.b.water
                            ? [
                                '<32>* ...',
                                "<32>* Você realmente vai levar isso até o fim, não é?",
                                ...(world.dead_skeleton
                                    ? ['<32>* ...', '<32>* Bom, de toda forma.']
                                    : ['<32>* Heh.', '<32>* Como eu estava dizendo...'])
                            ]
                            : []),
                        '<32>* Você determinará o futuro dos monstros.',
                        "<32>* Isso é depois.",
                        '<32>* Agora.',
                        '<32>* Você será julgado.',
                        '<32>* Você será julgado por cada ação que tomou.',
                        "<32>* Você será julgado por cada EXP que ganhou.",
                        "<32>* O que é EXP?",
                        "<32>* É um acrônimo.",
                        '<32>* Significa \"{@fill=#f00}Pontos de EXecução{@fill=#fff}.\"',
                        '<32>* Um jeito de quantificar a dor que você causa aos outros.',
                        '<32>* Quando você mata alguém, seu EXP aumenta.',
                        '<32>* Quando você tem EXP o suficiente, seu LOVE aumenta.',
                        '<32>* LOVE, também é um acrônimo.',
                        '<32>* Significa \"{@fill=#f00}Level Obtido por ViolEncia{@fill=#fff}.\"',
                        "<32>* Uma forma de quantificar a capacidade de infringir dor.",
                        '<32>* Quanto mais você mata, mais fácil tornar-se de distanciar-se de tudo.',
                        '<32>* Quanto mais você se distância, menos dor você irá sentir.',
                        '<32>* E assim, se torna mais fácil causar dor aos outros.'
                    ])
            ],
            jspeechU1: () => [
                '<25>{#p/sans}{#f/3}* ...',
                ...[
                    [
                        '<25>{#f/0}* uau, cara.\n* como você pôde fazer algo assim consigo mesmo.',
                        "<25>{#f/3}* não me entenda errado.\n* eu gosto de atalhos tanto quanto o cara depois de mim.",
                        "<25>{#f/2}* mas você não acha que deveria levar um tempo para refletir?"
                    ],
                    [
                        "<25>{#f/0}* pela sua expressão, eu consigo dizer que essa não é sua primeira vez.",
                        "<25>{#f/3}* ... eu não te culpo de forma alguma.\n* se sair de uma situação rapidamente deve ser legal.",
                        "<25>{#f/2}* mas ainda assim você precisa pegar um tempo para refletir!\n* de fato é importante."
                    ]
                ][Math.min(SAVE.flag.n.meet3++, 1)]
            ],
            jspeechU2: [
                '<25>{#p/sans}* vou te dizer uma coisa.',
                "<25>{#f/3}* enquanto eu tomo esse sorvete delicioso...",
                '<25>{#f/2}* você pode tomar este tempo para pensar sobre como você chegou aqui.'
            ],
            jspeechU3: [
                '<25>{#p/sans}* sabor salmão, huh?',
                '<25>{#p/sans}* ouvi dizer que a guarda real gosta bastante.'
            ],
            jspeechU4: [
                "<25>{#p/sans}{#f/3}* hmm nossa.\n* papyrus com certeza deve saber disso.",
                "<25>{#f/0}* vai ajudar ele a fazer sobre o tipo de comida que eles gostam.",
                '<25>{#f/2}* e quando eu digo \"eles\" eu estou falando sobre a guarda real, logo ele se tornará um membro.'
            ],
            jspeechU5: [
                '<25>{#p/sans}{#f/0}* é... acaba que capturar um humano tem realmente seus momentos de alucinação.',
                "<25>{#f/3}* ... não tenha preocupação.\n* eu já estou acabando.",
                "<25>{#f/2}* metade do caminho já."
            ],
            jspeechU6: () => [
                '<25>{#p/sans}{#f/0}* eu me pergunto se aquele \"cara do sorvete\" aceitaria comercializar este sabor.',
                ...(SAVE.data.n.state_starton_nicecream < 1
                    ? ["<25>{#f/2}* isso com certeza traria para ele alguns clientes a mais."]
                    : ["<25>{#f/2}* com certeza traria uma boa clientela."])
            ],
            jspeechU7: [
                '<26>{#p/sans}{#f/0}* ah... nada como uma boa bola de sorvete sabor salmão.',
                '<25>{#f/2}* agora a casquinha.'
            ],
            jspeechU8: [
                "<26>{#p/sans}{#f/3}* é incrível o que o replicador consegue fazer estes dias.",
                "<25>{#f/0}* no passado, se você fosse sortudo, conseguiria algo com 50% do sabor original.",
                '<25>{#f/2}* mas agora, tanto o sorvete como a casquinha são perfeitamente saborosos.'
            ],
            jspeechU9: ['<25>{#p/sans}{#f/0}* ...', '<25>{#f/3}* ... hora de terminar.'],
            jspeechU10: (funni: boolean) => [
                "<25>{#p/sans}{#f/0}* bem, isso é tudo.",
                ...(funni
                    ? ['<25>{#f/2}* Só espero que você possa encontrar o caminho para sair de trás desse pilar.']
                    : ["<25>{#f/2}* espero que você tenha usado seu tempo bem."])
            ],
            jspeech2: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* ...',
                "<25>{#f/0}* lv0, huh?\n* o que é isso?",
                "<25>{#f/3}* isso não estava no livro do gerson sobre combate humano.",
                "<25>{#f/0}* normalmente eu diria algo como...",
                '<25>{#f/4}* não ser perfeito, mas ainda assim fazer a coisa certa?',
                '<25>{#f/0}* mas eu acho que você realmente é diferente.',
                '<25>{#f/3}* ...\n* vou te dizer uma coisa.',
                "<25>{#f/4}* eu vou te poupar da longa palestra que preparei...",
                '<25>{#f/0}* e só vou te deixar ir logo.',
                '<25>{#f/3}* até porque, alguém tão bom como você...',
                "<25>{#f/2}* não deveria ficar ouvindo como escolhas da vida são difíceis.",
                ...(world.flirt < world.flirt_state1.length
                    ? [
                        '<25>{#f/3}* ...',
                        '<25>{#f/0}* boa sorte, carinha.',
                        ...(funni
                            ? ["<25>{#f/2}* eu vou para trás da pilastra agora."]
                            : ["<26>{#f/2}* não que você precise saber disso."])
                    ]
                    : [
                        '<25>{#f/3}* ... ah é, verdade.\n* eu quase esqueci.',
                        '<25>{#f/0}* você deve ter percebido o quão difícil é flertar com a alphys.',
                        "<25>{#f/2}* mas eu sei um truque pra atingir o coraçãozinho dela.",
                        "<25>{#f/0}* se você realmente quer ser a lenda do flerte...",
                        "<25>{#f/0}* você vai falar isso no ouvido dela.",
                        '<32>{#p/human}* (Sans te falou algo no ouvido.)',
                        ...(funni
                            ? ['<25>{#p/sans}{#f/2}* tente não ficar atrás de um pilar enquanto diz isso pra ela.']
                            : ['<25>{#p/sans}{#f/2}* boa sorte.'])
                    ])
            ],
            jspeech3: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* ...',
                '<25>{#f/0}* ... mas você.\n* você nunca ganhou nenhum LOVE.',
                "<25>* ... ei, que olhar é esse?",
                "<25>{#f/2}* lv1 é obviamente o mais baixo que dá pra chegar.\n* todo mundo sabe disso.",
                "<25>{#f/0}* de toda forma, isso não significa que você é totalmente inocente ou sem pecados.",
                ...(SAVE.data.n.bully < 15
                    ? SAVE.data.n.state_foundry_undyne > 0
                        ? [
                            "<25>{#f/0}* quando você teve a chance de salvar a vida de alguém...",
                            '<25>{#f/0}* você a deixou para trás, pois assim poderia salvar sua própria.',
                            '<25>{#f/3}* talvez você se sentiu com medo.\n* talvez você temia o que poderia acontecer.',
                            "<25>{#f/0}* mas você não acha que poderia ter feito melhor?",
                            '<25>{#f/0}* ...',
                            "<25>{#f/0}* mas pelo que eu vejo...",
                            '<25>{#f/3}* você nunca saiu da linha e acabou matando alguém.',
                            "<25>{#f/0}* mesmo quando você fugiu, você não o fez por maldade",
                            '<25>{#f/0}* você nunca ganhou love, mas ganhou amor.',
                            '<25>{#f/0}* faz sentido?',
                            '<25>{#f/0}* acho que não.'
                        ]
                        : [
                            '<25>* é só que você manteve uma certa ternura em seu coração.',
                            '<25>* não importa as dificuldades ou as tempestades que você enfrentou...',
                            '<25>* você tomou a decisão correta.',
                            ...(world.flirt < 20
                                ? [
                                    '<25>* você se recusou a ferir qualquer um.',
                                    '<25>* mesmo quando você correu, você o fez com um sorriso no rosto.',
                                    '<25>* você nunca ganhou love, mas ganhou amor.',
                                    '<25>* faz sentido?',
                                    '<25>* talvez não.'
                                ]
                                : [
                                    "<25>* aliás, ouvi dizer que você é bem do romântico.",
                                    '<25>* não apenas você não feriu ninguém, como também tocou seus corações.',
                                    '<25>{#f/2}* você realmente gosta de fazer as coisas do jeito difícil, huh?'
                                ])
                        ]
                    : [
                        SAVE.data.n.bully < 30
                            ? "<25>{#f/0}* você feriu pessoas por aí, não é?"
                            : "<25>{#f/0}* você feriu muitas pessoas, não foi?",
                        ...(SAVE.data.n.state_foundry_undyne > 0
                            ? [
                                "<25>{#f/0}* aliás, quando você teve a chance de salvar a vida de alguém...",
                                '<25>{#f/0}* você a deixou para trás, pois assim poderia salvar sua própria.',
                                '<25>{#f/3}* talvez você se sentiu com medo.\n* talvez você temia o que poderia acontecer.',
                                '<25>{#f/3}* mas muitas outras pessoas também se sentem assim.',
                                '<25>{#f/0}* apenas algo para manter na mente.'
                            ]
                            : world.flirt < 20
                                ? [
                                    '<25>{#f/0}* mesmo nunca tendo matado ninguém, você ameaçou suas vidas.',
                                    '<25>{#f/3}* foi justificado?\n* ou você pensou estar cometendo defesa pessoal?',
                                    "<25>{#f/0}* eu acho que isso é algo que só você sabe."
                                ]
                                : [
                                    '<25>{#f/0}* então, você flertou com eles como se quisesse fazer o que é bom.',
                                    '<25>{#f/3}* foi realmente o que você tentou fazer?\n* ou... eu estou errado?',
                                    "<25>{#f/0}* eu acho que isso é algo que só você sabe."
                                ])
                    ]),
                '<25>{#f/3}* ...\n* agora.',
                "<25>{#f/0}* você está prestes a tomar a maior decisão de toda sua jornada.",
                '<25>* sua decisão aqui...',
                '<25>* vai determinar o futuro de toda a galáxia.',
                '<25>* se você se recusar a entrar no arquivo...',
                '<25>* os monstros continuaram presos no Outpost.',
                '<25>* asgore fará o melhor para te convencer, mas...',
                '<25>* talvez nunca mais tenhamos a chance da liberdade novamente.',
                '<25>{#f/3}* de toda forma.\n* se você decidir seguir seu plano...',
                "<25>{#f/0}* a uma chance que as coisas dêem errado.",
                "<25>* sem mencionar, que você estaria arriscando sua vida mais uma vez, e...",
                '<25>* bem.',
                '<25>* o que você vai escolher?',
                '<25>{#f/3}* ...',
                '<25>* se eu fosse você, já teria desistido faz muito tempo.',
                "<25>{#f/2}* mas você não chegou até aqui desistindo, não foi?",
                "<25>{#f/0}* exatamente.",
                '<25>* você tem algo chamado \"{@fill=#ff0}determinação.{@fill=#fff}\"',
                ...(SAVE.data.n.bully < 15
                    ? [
                        '<25>* então com tanto que você mantenha o ritmo...',
                        "<25>* com tanto que você mantenha a ternura em seu coração...",
                        '<25>* eu confio que você fará a coisa certa.',
                        ...(SAVE.data.n.state_foundry_undyne > 0 || world.flirt < world.flirt_state1.length
                            ? [
                                '<25>{#f/3}* certo.',
                                "<25>{#f/0}* estamos todos contando com você, carinha.",
                                ...(funni
                                    ? ["<25>{#f/2}* eu vou para trás da pilastra agora."]
                                    : ['<25>{#f/2}* boa sorte.'])
                            ]
                            : [
                                '<25>{#f/3}* ah, certo.\n* eu quase esqueci.',
                                '<25>{#f/0}* você deve ter percebido o quão difícil é flertar com ela.',
                                '<25>{#f/0}* com a alphys.',
                                "<25>{#f/2}* mas eu sei um truque pra atingir o coraçãozinho dela.",
                                "<25>{#f/0}* se você realmente quer ser a lenda do flerte...",
                                "<25>{#f/0}* você vai falar isso no ouvido dela.",
                                '<32>{#p/human}* (Sans te falou algo no ouvido.)',
                                ...(funni
                                    ? ['<25>{#p/sans}{#f/2}* tente não ficar atrás de um pilar enquanto diz isso pra ela.']
                                    : ['<25>{#p/sans}{#f/2}* boa sorte.'])
                            ])
                    ]
                    : [
                        "<26>* não importa para que você tenha usado até agora...",
                        "<25>* eu sei que você fez o certo quando mais foi necessário.",
                        '<25>{#f/3}* ...',
                        '<25>{#f/3}* seja bom, beleza?',
                        ...(funni ? ['<25>{#f/2}* ... e tenta não ficar atrás de pilares.'] : [])
                    ])
            ],
            
            jspeech4: [
                '<25>{#p/darksans}* agora, você entende.',
                "<25>* está na hora de começar o seu julgamento.",
                '<25>* olhe dentro de si mesmo.',
                '<25>* você realmente fez a coisa certa?',
                "<25>* e, considerando o que você fez...",
                '<25>* o que fará agora?',
                '<25>* tome um momento pra pensar sobre isso.'
            ],
            jspeech5a: [
                '<25>{#p/sans}{#f/3}* ...',
                "<25>{#f/0}* verdadeiramente, não importa a que conclusão você chegou.",
                "<25>* o que importa é que você foi sincero consigo mesmo."
            ],

            
            jspeech5b1: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* o que acontece agora...',
                '<25>{#f/0}* deixamos em suas mãos.',
                ...(funni ? ['<25>{#f/2}* ... assim que eu te mover de volta para trás daquele pilar'] : [])
            ],

            
            jspeech5b2: () => [
                '<25>{#p/sans}{#f/3}* embora...',
                '<25>{#f/0}* uma coisa sobre você sempre me deixou meio pensativo.',
                '<25>* olha, eu entendo agir em autodefesa.',
                '<25>* você foi jogado nestas situações contra sua vontade.',
                '<25>* mas...',
                '<25>* algumas vezes...',
                "<25>* você age como se já soubesse o que iria acontecer.",
                "<25>* como se você já tivesse vivido isso tudo antes.",
                '<25>* é uma coisa meio estranha de dizer, mas...',
                '<25>* se você tem algum tipo de {@fill=#ff0}poder especial{@fill=#fff}...',
                "<25>* não é sua responsabilidade fazer a coisa certa?",
                choicer.create('* (O que você acha?)', 'Sim', 'Não')
            ],
            jspeech5b3a: ['<25>{#p/sans}{#f/4}* ah.', '<25>{#f/0}* eu entendo.'],
            jspeech5b3b: [
                '<25>{#p/sans}{#f/4}* heh.',
                "<25>{#f/0}* bem, esse é seu ponto de vista.",
                "<25>{#f/2}* não vou te julgar por isso."
            ],
            jspeech5b3c: ['<25>{#p/sans}{#f/3}* ...'],

            
            
            jspeech5b4a: ["<25>{*}{#p/darksans}{#f/1}{#i/5}* ... então por que você matou meu irmão?"],
            jspeech5b4b: ['<25>{*}{#p/darksans}{#f/1}{#i/5}* ... seu assassino de irmãos.'],
            jspeech5b5a: ["<25>{#p/sans}{#f/3}* ... acho que a toriel não valia o esforço, então?"],
            jspeech5b5b: ['<25>{#p/sans}{#f/3}* ... mesmo que eu devesse, depois do que você fez com toriel.'],
            jspeech5b6a: ["<25>{*}{#p/darksans}{#f/1}{#i/5}* ... então por que você matou o meu irmão?"],
            jspeech5b6b: ['<25>{*}{#p/darksans}{#f/1}{#i/5}* ... seu assassino maldito.'],
            jspeech5b7a: ["<25>{#p/sans}{#f/3}* ... acho que undyne não valia o esforço, então?"],
            jspeech5b7b: ['<25>{#p/sans}{#f/3}* ... mesmo que eu desse, depois do que você fez com a undyne.'],
            jspeech5b8a: ["<25>{#p/sans}{#f/3}* ... acho que Mettaton não valia o esforço, então?"],
            jspeech5b8b: ['<25>{#p/sans}{#f/3}* ... mesmo que eu devesse, depois do que você fez com o mettaton.'],
            jspeech5b9a: ["<25>{#p/sans}{#f/3}* ... acho que a pessoa que você matou não importava, então?"],
            jspeech5b9b: ['<25>{#p/sans}{#f/3}* ... mesmo que eu devesse, depois do que você fez.'],
            jspeech5b10a: ["<25>{#p/sans}{#f/3}* ... acho que a pessoa que você matou não importava, então?"],
            jspeech5b10b: ['<25>{#p/sans}{#f/3}* ... mesmo que eu devesse, após o que você fez.'],

            
            jspeech6a: [
                '<25>{#p/sans}{#f/4}* huh?\n* você parece entediado.',
                "<25>* eu tenho a sensação de que você não vai aprender nada com isso.",
                '<25>{#f/0}* bem, acho que eu vou te julgar então.'
            ],

            
            jspeech6b1: [
                '<26>{#p/sans}* lv2...\n* parece que você ferrou tudo da maneira mais mínima possível.',
                "<25>{#f/4}* bem.\n* isso foi bem triste.",
                "<25>{#f/3}* você provavelmente nem sabia o que estava fazendo...",
                '<25>* e quando entendeu, já era tarde.',
                '<25>{#f/2}* nah, brincadeira.',
                '<25>{#f/4}* quem chega no lv2 por acidente?\n* mete o pé daqui.'
            ],

            jspeech6b2: [
                '<25>{#p/sans}* lv3...\n* nada mal.',
                "<25>{#f/4}* três não é um número muito assustador, é?",
                "<25>{#f/0}* eu vou te deixar passar.",
                '<25>{#f/3}* mas, ei...',
                '<25>{#f/2}* você pode fazer melhor, certo?'
            ],

            jspeech6b3: [
                '<25>{#p/sans}* lv4...\n* huh.',
                '<25>{#f/4}* quer dizer, o que eu posso falar?',
                "<25>{#f/0}* se fosse mais alto que isso, eu pensaria que você estava matando pessoas de propósito.",
                "<25>{#f/3}* mas eu acho que vou te deixar passar.",
                '<25>{#f/2}* só dessa vez.'
            ],

            jspeech6b4: [
                '<25>{#p/sans}{#f/4}* lv5?',
                "<25>{#f/0}* isso é um verdadeiro território perigoso.",
                '<25>{#f/4}* acredite em mim, eu quero te dar o direito da dúvida...',
                '<25>{#f/0}* mas se torna muito difícil de fazer conforme você aumenta.',
                '<25>{#f/3}* ... oh bem.'
            ],

            jspeech6b5: [
                '<25>{#p/sans}{#f/4}* lv6?',
                '<25>{#f/0}* humanos normalmente dizem que seis é um número do mau.',
                "<25>{#f/4}* agora, eu não quero ser supersticioso...",
                "<25>{#f/0}* mas eu estaria mentindo se eu dissesse que isso não é suspeito.",
                '<25>{#f/3}* ... oh bem.'
            ],

            jspeech6b6: [
                '<25>{#p/sans}{#f/4}* lv7, huh?',
                "<25>* não é esse o tal do número da sorte dos humanos?",
                '<25>{#f/0}* bem, nossa, eu não sei sobre você, mas...',
                '<25>{#f/3}* eu dúvido muito que a questão foi sorte quando se trata de chegar a esse ponto.',
                '<25>{#f/0}* ... só dizendo.'
            ],

            jspeech6b7: [
                '<25>{#p/sans}{#f/4}* lv8, huh?',
                "<25>* os humanos não usam este humano para prever o futuro ou algo assim?",
                '<25>{#f/0}* bem, nossa, eu não sei sobre você, mas...',
                "<25>{#f/3}* isso explica bastante o motivo de você estar agindo assim.",
                '<25>{#f/0}* ... só dizendo.'
            ],

            jspeech6b8: [
                '<25>{#p/sans}{#f/3}* ... lv9.',
                "<25>{#f/0}* isso passou o limite da desculpa.",
                '<25>{#f/3}* mas ei, olhando pelo lado bom...',
                "<25>{#f/2}* ... pelo menos você ainda está nos dígitos únicos."
            ],

            jspeech6b9: [
                '<25>{#p/sans}{#f/3}* ... lv10.',
                "<25>{#f/0}* isso passou o limite da desculpa.",
                '<25>{#f/3}* mas ei, olhando pelo lado bom...',
                "<25>{#f/2}* ... pelo menos é legal, um número do qual você deve se orgulhar."
            ],

            jspeech6b10: [
                '<25>{#p/sans}{#f/3}* ... lv11.',
                "<25>{#f/4}* ou em termos de jogador, olhos de cobra.",
                '<25>{#f/0}* verdade seja dita, se eu tivesse a chance de rolar o dado novamente...',
                "<25>{*}{#p/darksans}{#f/1}{#i/5}* eu provavelmente faria isso agora mesmo.",
                "<25>{#p/sans}{#f/3}* ... mas isso só sou eu."
            ],

            jspeech6b11: [
                '<25>{#p/sans}{#f/3}* ... lv12.',
                "<25>{#f/4}* ou, em termos de geometria, uma rotação completa.",
                '<25>{#f/0}* verdade seja dita, se eu tivesse a chance de voltar no tempo com base na circunferência...',
                "<25>{*}{#p/darksans}{#f/1}{#i/5}* eu provavelmente faria isso agora mesmo.",
                "<25>{#p/sans}{#f/3}* ... mas isso só sou eu."
            ],

            jspeech6b12: [
                '<25>{#p/sans}{#f/3}* ... lv13.',
                "<25>{#f/4}* ou nos termos do padeiro, uma dúzia.",
                '<25>{#f/0}* verdade seja dita, se eu tivesse a chance de assar esse pão de novo...',
                "<25>{*}{#p/darksans}{#f/1}{#i/5}* eu provavelmente faria isso agora mesmo.",
                "<25>{#p/sans}{#f/3}* ... mas isso só sou eu."
            ],

            jspeech6b13: [
                '<25>{#p/sans}{#f/3}* ... lv14.',
                "<25>{#f/4}* eu vou ser sincero...",
                "<25>{#f/0}* eu não pensei que você seria capaz de matar tantas pessoas tão rapidamente.",
                '<25>{*}{#p/darksans}{#f/1}{#i/5}* acho que você aprende algo novo todo dia.',
                '<25>{#p/sans}{#f/3}* ...'
            ],

            
            jspeech6c: [
                '<25>{#p/sans}{#f/4}* huh?\n* você ainda parece entediado.',
                '<25>{#f/0}* tá bom, considere a sessão de terapia encerrada.'
            ],

            
            jspeech7: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* ...',
                '<25>{#f/0}* espera um pouco.',
                '<25>{#f/4}* esse olhar no seu rosto enquanto eu falava...',
                "<25>{#f/0}* você já escutou esse discurso, não é?",
                '<25>{#f/3}* eu suspeitei no princípio.',
                "<25>{#f/3}* você age como se já soubesse o que iria acontecer.",
                "<25>{#f/3}* como se você já tivesse visto certas coisas.",
                '<25>{#f/0}* então... ei.',
                "<25>{#f/0}* eu tenho um pedido pra você.",
                '<25>{#f/2}* eu tenho um {@fill=#ff0}código secreto{@fill=#fff} que apenas eu sei.',
                "<25>{#f/4}* então, eu saberia se alguém me contasse.",
                "<25>{#f/0}* essa pessoa tem que ser um viajante no tempo.",
                '<25>{#f/2}* loucura, né?',
                '<25>{#f/3}* de toda forma, aí vai...',
                '<32>{#p/human}* (Sans falou algo para você.)',
                "<25>{#p/sans}{#f/0}* eu estou contando que você vai voltar no tempo e me dizer.",
                ...(funni ? ["<25>{#f/2}* eu vou para trás da pilastra agora."] : ['<25>{#f/2}* te vejo... mais cedo.'])
            ],

            
            jspeech8: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* ...',
                '<25>{#f/4}* huh?\n* você tem algo pra me dizer?',
                '<32>{#p/human}* (Você disse para Sans o código secreto.)',
                '<25>{#p/sans}{#f/2}* um código secreto? da pra me contar isso um pouco mais alto?',
                '<32>{#p/human}* (Você diz ao Sans o código secreto, porém mais alto.)',
                '<25>{#p/sans}{#f/0}* você...',
                '<25>{#f/4}* ... me disse para \"inverter a polaridade do fluxo de nêutrons?\"',
                "<25>{#f/2}* wow.\n* eu não acredito que você disse isso.",
                '<25>{#f/4}* não apenas isso não faz o menor sentido...',
                "<25>{#f/2}* como também é meu código secreto.",
                '<25>{#f/0}* então... você é um viajante do tempo, né?',
                "<25>{#f/3}* bem, legal.\n* isso significa que você é qualificado.",
                "<25>{#f/0}* aqui está a chave para meu quarto.",
                '<32>{#p/human}* (A Chave de Esqueleto foi adicionada ao seu chaveiro.)',
                "<25>{#p/sans}{#f/0}* é hora...",
                ...(funni
                    ? ['<25>{#f/2}* você saiu de trás daquele pilar.']
                    : ['<25>{#f/2}* você entendeu a {@fill=#003cff}realidade{@fill=#fff}.'])
            ],

            
            jspeech9: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* ...',
                '<25>{#f/0}* espera um pouco.',
                '<25>{#f/4}* esse olhar no seu rosto enquanto eu falava...',
                "<25>{#f/0}* você já escutou esse discurso, não é?",
                '<25>{#f/3}* eu suspeitei no princípio.',
                "<25>{#f/3}* você age como se já soubesse o que iria acontecer.",
                "<25>{#f/3}* como se você já tivesse visto certas coisas.",
                '<25>{#f/0}* então...',
                '<25>{#f/0}* ... espera.\n* você já escutou isso antes também?',
                '<25>{#f/3}* uau, você realmente é um viajante do tempo.',
                "<25>{#f/2}* acho que não a muito mais para ser dito.",
                '<32>{#s/equip}{#p/human}* (A Chave de Esqueleto foi adicionada ao seu chaveiro.)',
                ...(funni ? ['<25>{#p/sans}{#f/2}* ... além de \"vou movê-lo de volta para trás do pilar agora.\"'] : [])
            ],

            
            jspeech10a: ['<25>{#p/sans}{#f/0}* atrás de você.'],
            jspeech10b: [
                '<25>{#p/sans}* é isso então, huh?',
                '<25>* é aqui que sua jornada acaba?',
                '<25>{#f/3}* ...',
                "<25>* olha.\n* eu não sei o que o asgore vai fazer.",
                "<25>{#f/0}* eu conversei com ele sobre o que você fez, mas, as chances são...",
                "<25>{#f/0}* ... que não será exatamente o que você espera.",
                '<25>* mas, pense por um momento...',
                "<25>* tudo que você fez até agora.",
                '<25>* valeu a pena?'
            ],
            jspeech10c: [
                "<25>{#p/sans}{#f/3}* eu não sei o que se passa pela sua mente agora.",
                "<25>{#f/0}* quer dizer, eu nem posso ver seu rosto.",
                '<25>* ...',
                "<25>{#f/3}* talvez isso seja para o melhor.",
                '<25>{#f/0}* mas eu sei que após tudo isso que você fez...',
                '<25>* em algum ponto, você deve ter se importado conosco, certo?',
                "<25>{#f/3}* ... eu sei que existe a chance de isso nem ser verdade.",
                "<25>{#f/0}* ainda assim, ninguém age dessa forma com estranhos sem motivo.",
                "<25>* eu sei que lá, lá no fundo, você se importou com a gente.",
                '<25>* você se importou, se não nem teria chegado tão longe assim.'
            ],
            jspeech10d: [
                '<25>{#p/sans}{#f/3}* eu sei que. toda essa coisa de \"apego a emoção\" não é eu.',
                '<25>{#f/0}* mas o que mais eu posso dizer?',
                '<25>* quando alguém vai tão longe como você...',
                "<25>* intimidar só não parece mais apropriado.",
                "<25>{#f/3}* então eu estou tentando algo diferente.",
                '<25>{#f/0}* ...',
                '<25>{#f/3}* agora.\n* se realmente tudo vai acabar assim...',
                '<25>* que seja.',
                "<25>{#f/0}* bondade simplesmente não é sua parada, e eu entendi.",
                "<25>* mas, se por qualquer chance você tem um {@fill=#ff0}certo poder{@fill=#fff}...",
                '<25>* por que não?',
                '<25>* só dessa vez, no fim de tudo...',
                '<25>{#f/3}* seja bom.',
                '<25>* ...',
                '<25>{#f/3}* bem.',
                "<25>{#f/3}* isso é tudo."
            ],

            choice0: () => [
                ...(SAVE.data.n.state_foundry_undyne === 0 && !world.badder_lizard
                    ? [
                        '<25>{#p/alphys}{#g/alphysCutscene1}* você chegou!',
                        '<25>{#g/alphysCutscene2}* ...\n* Este é o Arquivo Seis.',
                        '<25>{#f/15}* Desde a construção, os humanos foram guiados até aqui...',
                        '<25>{#f/15}* Mantido em estase...',
                        '<25>{#f/15}* Em um tempo acelerado de mundo virtual...',
                        "<25>{#f/10}* ... não é legal?",
                        "<25>{#f/1}* É incrível o que o Professor Roman conseguiu alcançar!",
                        "<25>{|}{#f/15}* Tipo, eu não sei se ele gosta de anime sci-fi, mas tem este um {%}",
                        '<99>{|}{#f/15}  em que você tinha que colocar óculos de realidade virtual para {%}',
                        '<99>{|}{#f/23} assista, mas todos\n  quem fica preso\n  no mundo do cinema e {%}',
                        '<99>{|}{#f/23} todos eles têm que descobrir\n  como avançar o\n  plot para escapar e {%}',
                        '<99>{|}{#f/18} o personagem principal\n  descobre como chegar\n  até o fim e eles fazem {%}',
                        '<99>{|}{#f/18} e então eles conseguem deixar\n  todos livres!!!',
                        '<25>{#f/18}* ...',
                        '<25>{#f/20}* Então, uh, eu acho que ele foi inspirado por isso.',
                        "<25>{#f/18}* Asgore estará te esperando no escudo de força!"
                    ]
                    : [
                        '<25>{#p/alphys}{#g/alphysCutscene1}* você chegou!',
                        '<25>{#g/alphysCutscene2}* ...',
                        "<25>{#g/alphysSmileSweat}* B-bem, Asgore está te esperando no escudo de força."
                    ]),
                '<25>{#g/alphysNeutralSweat}* Caso... você esteja se perguntando.',
                "<25>{#g/alphysOhGodNo}* Mas, caso não!!\n* Então...",
                "<25>{#g/alphysTheFactIs}* Eu... não sei porque você está aqui.",
                "<26>{#g/alphysCutscene2}* Então é.\n* É sobre isso!"
            ],
            choice0x: ["<25>{#p/alphys}{#g/alphysCutscene2}* Uh, eu só vou ficar por aqui, agora."],
            choice0y: ['<25>{#p/alphys}{#g/alphysInquisitive}* Tendo dúvidas...?'],
            choice1: [
                '<26>{#p/asgore}{#f/1}* Este é o Escudo de Força.',
                '<25>{#f/2}* Isso é o que nos mantém presos no Outpost.',
                '<25>{#f/1}* Um limite irrefletido, insensível...',
                '<25>{#f/2}* Que ninguém, monstro ou qualquer outro, consegue passar.'
            ],
            choice1a: () => [
                '<25>{#p/asgore}{#f/1}* Por anos eu pensei que jamais iríamos chegar as estrelas.',
                '<25>* Eu temia que, um dia, um humano apareceria e mataria a todos nós.',
                ...(world.bad_robot || world.trueKills > 29
                    ? [
                        '<25>{#f/1}* ...',
                        '<25>{#f/2}* E parece... que o medo foi justificado.',
                        '<25>{#f/3}* Alphys já me informou das suas... tendências violentas.',
                        ...(world.alphys_percieved_kills < 20
                            ? ['<25>{#f/2}* Mas, ela disse que você também poucos muitos do nosso povo.']
                            : [
                                '<25>{#f/16}* ...\nDiga-me, pequeno.',
                                '<25>{#f/12}* Aquilo começou como defesa pessoal e se desenvolveu para algo pior?',
                                '<25>{#f/12}* Ou este era seu plano desde o início?'
                            ]),
                        '<25>{#f/5}* ...',
                        '<26>{#f/16}* Desta forma.\n* Você me põe em uma posição difícil.',
                        '<25>{#f/15}* Acreditar a você nossa única chave para a liberdade...',
                        '<25>{#f/16}* Ou tomar sua ALMA por força e entrar no arquivo por conta própria.',
                        '<25>{#f/3}* ...',
                        ...(world.alphys_percieved_kills < 20
                            ? [
                                '<25>{#f/3}* Por mais terrível que isso possa parecer, eu não quero te alarmar.',
                                '<25>{#f/4}* Você poderia ter sido muito pior para nós...',
                                '<25>{#f/2}* ... ainda assim, você não foi.',
                                '<25>{#f/1}* Seria errado admitir que não a volta para você.',
                                '<25>{#f/2}* Você talvez seja apenas uma criança que decidiu lutar pela vida.'
                            ]
                            : ['<25>{#f/3}* As palavras não podem explicar o quão infeliz é está situação.'])
                    ]
                    : (world.bad_lizard > 0 && world.alphys_percieved_kills > 0) || 2 <= world.alphys_percieved_kills
                        ? [
                            '<25>{#f/1}* ...',
                            '<25>{#f/1}* Com tudo sido considerado, você se comportou bem.',
                            ...(world.bad_lizard > 0
                                ? ["<25>{#f/2}* Mesmo que a Alphys tenha mencionado que você... tomou vidas."]
                                : ['<25>{#f/2}* Alphys mencionou que você talvez... tenha tomado vidas.']),
                            '<25>{#f/3}* ...',
                            ...(SAVE.data.b.ultrashortcut
                                ? [
                                    '<25>{#f/3}* É bom que você tenha sido capturado e trago para cá rapidamente.',
                                    '<25>{#f/2}* O Outpost pode ser perigoso, como tenho certeza que você está ciente.',
                                    '<25>{#f/5}* Entretanto, agora que você está aqui, será protegido.'
                                ]
                                : [
                                    '<25>{#f/3}* Eu sou o único que deve ser culpado por isso.',
                                    '<25>{#f/2}* Manter meus segredos tornou difícil te escoltar até aqui.',
                                    "<25>{#f/5}* Especialmente por essa ser a primeira vez da Alphys fazendo isso."
                                ]),
                            '<25>{#f/15}* ...',
                            '<25>{#f/16}* O arquivo está a frente de você agora.',
                            '<26>{#f/1}* Todas as outras crianças humanas decidiram entrar no arquivo, então...',
                            '<25>* ... agora, é a sua vez de tomar está decisão.'
                        ]
                        : [
                            '<25>{#f/1}* Então, uma por uma, as crianças da terra vieram.',
                            '<25>* Todas estavam ansiosas.\n* Todas enfrentaram desafios.',
                            '<26>{#f/6}* Mas, eles deixaram transparecer seus traços mais brilhantes.',
                            '<25>* O paciente, o corajoso.',
                            '<25>* O verdadeiro, o sobrevivente.',
                            '<25>{#f/2}* O bondoso...',
                            '<25>{#f/4}* E aquele que desejava justiça acima de tudo.',
                            '<25>{#f/1}* Quando dada a chance para ficar, ou entrar no arquivo...',
                            '<25>* Eles eventualmente escolheram a segunda opção.',
                            ...(SAVE.data.b.ultrashortcut
                                ? [
                                    '<25>{#f/5}* ... agora, remetente as circunstâncias as quais você chegou...',
                                    '<25>{#f/1}* É sua vez de fazer a mesma escolha.'
                                ]
                                : ['<25>* ... agora, se tornou a sua vez de fazer a mesma escolha.'])
                        ])
            ],
            choice1b: () =>
                world.bad_robot || world.trueKills > 29
                    ? [
                        '<25>{#p/asgore}{#f/1}* Em todo caso, eu não posso te pedir para entrar no arquivo.',
                        '<25>{#f/2}* Seria tolo da minha parte esperar que você tomasse tal responsabilidade.',
                        '<25>{#f/5}* ...',
                        '<25>{#f/5}* Retorne para minha casa.',
                        '<25>{#f/5}* Eu decidirei seu destino mais tarde.'
                    ]
                    : [
                        [
                            '<25>{#p/asgore}{#f/6}* Como o último a entrar, você agiria como um embarcador.',
                            "<25>* Trazendo todas as outras ALMAS com seus poderes para si.",
                            '<26>* Com todos os poderes combinados, você irá destruir o escudo.',
                            '<25>* Então...',
                            '<25>* A população monstro finalmente irá procurar por um novo planeta.',
                            '<25>{#f/1}* ... entretanto.',
                            '<25>* Se você não deseja tal responsabilidade...',
                            '<25>* Você deve ficar conosco no Outpost até mudar de ideia.',
                            '<25>{#f/6}* Seja lá o que você decidir, eu irei apoiar.',
                            '<25>{#f/1}* ...',
                            '<25>* Você entrará no arquivo?',
                            choicer.create('* (O que você acha?)', 'Sim', 'Não')
                        ],
                        [
                            '<26>{#p/asgore}{#f/6}* Vejo que você voltou.',
                            '<25>{#f/1}* ...',
                            '<25>* Você entrará no arquivo?',
                            choicer.create('* (O que você acha?)', 'Sim', 'Não')
                        ],
                        [
                            '<25>{#p/asgore}{#f/1}* ...',
                            '<25>* Você entrará no arquivo?',
                            choicer.create('* (O que você acha?)', 'Sim', 'Não')
                        ]
                    ][Math.min(SAVE.data.n.state_citadel_refuse, 2)],
            choice2a: [
                '<25>{#p/asgore}{#f/4}* ...',
                '<25>{#f/6}* Me siga, pequeno.',
                '<25>{#f/21}* A muito para ser feito.'
            ],
            choice2b: () =>
                [
                    [
                        '<25>{#p/asgore}{#f/2}* ... eu entendo.',
                        '<25>{#f/1}* Talvez eu tenha errado em acreditar que você seria como os outros.',
                        SAVE.data.b.ultrashortcut
                            ? '<25>{#f/5}* Você chegou muito rápido e eu fiz pouco para merecer sua confiança.'
                            : '<25>{#f/5}* Eu fiz pouco para ganhar sua confiança.',
                        '<25>{#f/1}* Se você mudar de ideia, deve retornar até mim...',
                        '<25>{#f/2}* Eu não irei pressiona-lo.'
                    ],
                    ['<25>{#p/asgore}{#f/2}* ... eu entendo.']
                ][Math.min(SAVE.data.n.state_citadel_refuse++, 1)],
            choice3a: ['<25>{#p/asgore}{#f/6}* É a hora.'],
            choice4a: ['<25>{#p/asgore}{#f/5}* Alphys?'],
            choice4b: [
                '<25>{#p/alphys}{#g/alphysOhGodNo}* Uh, c-certo! \n* Desculpa!',
                '<25>{#p/alphys}{#g/alphysCutscene3}* só deixando tudo pronto e tals...'
            ],
            choice5: ['<25>{#p/alphys}{#g/alphysCutscene2}* Pronto.\n* Nós estamos prontos para o proceder.'],
            choice6a: ["<25>{#p/alphys}{#g/alphysWelp}* Okay, parece que ele está no sistema."],
            choice6b: [
                "<25>{#p/asgore}{#f/6}* Não temas.",
                '<25>{#p/asgore}{#f/7}* Quando o arquivo foi criado...',
                '<25>{#p/asgore}{#f/6}* Nós tivemos certeza de prover o mundo ideal para os humanos.',
                '<25>{#p/asgore}{#f/21}* Grandes florestas, rios tão longos para visão dos olhos...',
                '<25>{#p/asgore}{#f/6}* Todos os prazeres de uma linda vista de um mundo.',
                '<25>{#p/asgore}{#f/4}* ... nós contamos contigo, pequeno.',
                '<25>{#p/asgore}{#f/6}* Por favor, fique seguro, e não tome muito tempo.'
            ],
            choice7: [
                "<32>{#p/basic}* É, eu ainda estou aqui...",
                "<32>* ... mas, eu não acho que posso te seguir para dentro.",
                '<33>* Subconsciente e toda essa coisa.',
                "<32>* Mas seja lá o que acontecer, eu confio em você para fazer a coisa certa.",
                '<32>* ...',
                '<32>* Fique seguro, beleza?'
            ],
            choice8: [
                '<25>{#p/asgore}{#f/1}* ...',
                '<25>{#p/asgore}{#f/2}* Então você chegou.',
                '<32>{#p/human}* (...)',
                '<25>{#p/asgore}{#f/1}* ...\n* Eu suponho que você não tenha muito para dizer.',
                '<25>{#f/2}* Diferente de mim, o qual tem muito o que questionar.',
                '<25>{#f/4}* Assim, mesmo com nossas diferenças...',
                '<25>{|}{#f/7}* Eu ainda acho que pode- {%}'
            ],
            
            clover1: ["<32>{#p/human}{#v/6}{@fill=#faff29}* Não é fantástica...?"],
            clover2: [
                "<32>{#p/human}{#v/6}{@fill=#faff29}* ...\n* Bem, isso é o que ele teria dito.",
                '<32>{@fill=#faff29}* Lugares assim eram bem normais, eram...',
                '<32>{@fill=#faff29}* ... antes de eu aparecer e arruinar tudo.',
                '<32>{@fill=#faff29}* Meu implante biônico nos dá acesso máximo ao sistema.',
                '<32>{@fill=#faff29}* Tudo que queríamos, poderíamos ter... com um custo.',
                "<32>{@fill=#faff29}* Você viu o pós vida.\n* Você esteve em cada mundo que nós criamos...",
                "<32>{@fill=#faff29}* O XM que você ganhou é a prova disso.",
                '<32>{@fill=#faff29}* XM, é um acrônimo, óbvio.\n* Ele significa \"Matéria eXótica.\"',
                "<32>{@fill=#faff29}* É basicamente aquilo que une todas as nossas ALMAS.",
                "<32>{@fill=#faff29}* É o que você precisa para quebrar o escudo de força."
            ],
            clover3: [
                "<32>{#p/human}{#v/6}{@fill=#faff29}* Eu não sei se estaremos cientes do que aconteceu aqui.",
                '<32>{@fill=#faff29}* Está é apenas uma terra no subconsciente, depois de tudo.',
                '<32>{@fill=#faff29}* Ainda assim, mesmo quando pesadelos como os nossos chegam a um fim.',
                '<32>{@fill=#faff29}* Da realmente para esquecer verdadeiramente?'
            ],
            clover4: () => [
                "<32>{#p/human}{#v/6}{@fill=#faff29}* ...\n* Está na hora de você ir.",
                '<32>{@fill=#faff29}* Você pode encontrar o terminal de saída no final do caminho principal.',
                ...(SAVE.data.b.oops
                    ? ['<32>{@fill=#faff29}* ... cuide-se...', '<32>{@fill=#faff29}* Entendeu?']
                    : [
                        '<32>{@fill=#faff29}* ... mas antes de você ir...',
                        "<32>{@fill=#faff29}* Frisk?\n* Esse é seu nome, não é?",
                        "<32>{@fill=#faff29}* Me perdoe.\n* Eu devo me perguntar o que se passa em sua mente.",
                        "<32>{@fill=#faff29}* ...\n* Você é uma boa pessoa, Frisk.",
                        '<32>{@fill=#faff29}* E pelo que eu consigo dizer...',
                        "<32>{@fill=#faff29}* Assim é a pessoa que faz todas as escolhas por você.",
                        '<32>{@fill=#faff29}* ...',
                        "<32>{@fill=#faff29}* Frisk e eu não vamos lembrar dessa conversa, mas existe uma pequena chance.",
                        "<32>{@fill=#faff29}* Se você realmente está aí fora, ouvindo...",
                        "<32>{@fill=#faff29}* ... não esqueça das vidas que deixamos neste lugar.",
                        "<32>{@fill=#faff29}* Não importa o mundo, memórias assim não merecem ser esquecidas."
                    ])
            ],

            smasher1: (haha: boolean) => [
                "<25>{#p/alphys}{#g/alphysWelp}* Eu vou te esperar no escudo de força.",
                ...(haha
                    ? [
                        '<25>{#p/alphys}{#g/alphysFR}* ... aliás, eu peguei a boneca Mew Mew de você enquanto dormia.',
                        "<25>{#p/alphys}{#g/alphysHellYeah}* Quem está rindo agora!"
                    ]
                    : !SAVE.data.b.failshow && SAVE.data.b.item_tvm_mewmew && !SAVE.data.b.mewget
                        ? ((SAVE.data.b.mewget = true),
                            [
                                '<25>{#p/alphys}{#g/alphysFR}* ... aliás, eu achei a boneca Mew Mew que você jogou fora antes.',
                                "<25>{#p/alphys}{#g/alphysHellYeah}* Quem está rindo agora!"
                            ])
                        : [])
            ],
            smasher2: ['<25>{*}{#p/alphys}{#g/alphysSmileSweat}* Pronto?{^40}{%}'],

            bad1: () =>
                [
                    world.bad_robot || world.trueKills > 29
                        ? world.alphys_percieved_kills < 20
                            ? [
                                '<25>{*}{#p/twinkly}{#f/8}* Indeciso, eh Asgore? ',
                                '<25>{*}{#f/5}* Eu sei.\n* Escolhas podem ser difíceis.',
                                "<25>{*}{#f/11}* Mas tudo bem!",
                                "<25>{*}{#f/7}* Você não irá precisar fazer elas mais.",
                                '<25>{*}{#p/asgore}{#g/asgoreBound}* ... o quê você...',
                                '<25>{*}* ... está fazendo...',
                                '<25>{*}{#p/twinkly}{#f/8}* Ah, nada, Asgore...'
                            ]
                            : [
                                '<25>{*}{#p/twinkly}{#f/5}* Senhor, Asgore...',
                                "<25>{*}{#f/11}* Você poderia tê-lo matado, e ninguém teria reclamado.",
                                "<25>{*}{#f/7}* Mas agora, você perdeu sua chance.",
                                '<25>{*}{#p/asgore}{#g/asgoreBound}* ... o quê você...',
                                '<25>{*}* ... está fazendo...',
                                "<25>{*}{#p/twinkly}{#f/5}* Matar pessoas não é DE TODO mau, Asgore...",
                                '<25>{*}{#f/9}* Você só precisa aprender a se divertir!'
                            ]
                        : SAVE.data.b.ultrashortcut
                            ? [
                                '<25>{*}{#p/twinkly}{#f/5}* Bem, bem...',
                                "<26>{*}{#f/11}* Você foi bem para chegar aqui.",
                                '<25>{*}{#p/asgore}{#g/asgoreBound}* ... o quê você...',
                                '<25>{*}* ... está fazendo...',
                                "<25>{*}{#p/twinkly}{#f/5}* Cê realmente achou que fugiria de mim tão facilmente?",
                                "<25>{*}{#f/7}* Não seja ridículo."
                            ]
                            : [
                                '<25>{*}{#p/twinkly}{#f/5}* Olá, Asgore.',
                                "<26>{*}{#f/11}* Tem muito o que ser feito antes de podermos salvar os monstros.",
                                '<25>{*}{#p/asgore}{#g/asgoreBound}* ... o quê você...',
                                '<25>{*}* ... está fazendo...',
                                '<25>{*}{#p/twinkly}{#f/5}* Eu sei que isso veio do nada, mas qual foi!',
                                "<25>{*}{#f/7}* Eu só estou tentando me divertir, Asgore."
                            ],
                    [
                        "<25>{*}{#p/twinkly}{#f/7}* Como se eu fosse deixar você escapar tão facilmente.",
                        SAVE.data.b.ultrashortcut
                            ? '<25>{*}{#f/8}* Pobre $(name)... sempre querendo pegar atalhos na vida...'
                            : '<25>{*}{#f/8}* Pobre $(name)... sempre desesperado para ter as coisas do seu jeito...',
                        '<25>{*}{#f/5}* Mas não dessa vez.',
                        '<25>{*}{#p/asgore}{#g/asgoreBound}* ... o quê você...',
                        '<25>{*}* ... está fazendo...',
                        "<25>{*}{#p/twinkly}{#f/5}* De agora em diante, eu serei quem vai decidir o futuro.",
                        '<25>{*}{#f/7}* E você só vai ter que lidar com isso.'
                    ],
                    [
                        '<25>{*}{#p/twinkly}{#f/11}* Vamos lá, $(name)...',
                        '<25>{*}{#f/5}* Resistir é inútil!',
                        SAVE.data.b.ultrashortcut
                            ? "<25>{*}{#f/7}* Não importa o quão rápido você vá, eu sempre estarei um passo a frente."
                            : "<25>{*}{#f/7}* Não importa o que você faça, eu sempre estarei um passo a frente.",
                        '<25>{*}{#p/asgore}{#g/asgoreBound}* ... o quê você...',
                        '<25>{*}* ... está fazendo...',
                        "<25>{*}{#p/twinkly}{#f/5}* Shh... tá tudo bem.",
                        '<25>{*}{#f/5}* Meu amigo $(name) aqui precisa aprender uma lição.'
                    ]
                ][Math.min(SAVE.flag.n.neutral_twinkly_loop1++, 2)],
            bad2: [
                "<25>{*}{#g/twinklyNice}* ... aliás, meu nome é Twinkly.{^30}{%}",
                '<25>{*}{#g/twinklySassy}* Twinkly a estrela.{^30}{%}'
            ],
            bad3: ['<25>{*}{#p/asgore}{#g/asgoreBreak1}* AAAARGH...!{^999}'],
            bad4: [
                "<25>{*}{#p/twinkly}{#g/twinklyWink}* Nossa, você é tão fofo quando gritando em agonia!{^30}{%}",
                '<25>{*}{#p/asgore}{#g/asgoreBreak1}* ...{^10}{%}'
            ],
            bad5: ["<25>{*}{#p/twinkly}{#f/7}* Vamos ouvir de novo.{^20}{%}"],
            bad6: ['<25>{*}{#p/asgore}{#g/asgoreBreak2}* AAAAAAAARGH...!{^999}'],
            bad7: ['<25>{*}{#p/twinkly}{#f/11}* E de novo!{^5}{%}'],
            bad8: ['<25>{*}{#p/twinkly}{#g/twinklyEvil}{#v/1}* E de novo!!!{^5}{%}'],
            bad9: ['<25>{*}{#p/twinkly}{#g/twinklyGrin}{#v/1}* E DE NOVO!!!{^5}{%}'],
            bad10: ['<25>{*}{#p/twinkly}{#g/twinklyTwisted}{#v/1}* E DE NOVO!!!{^5}{%}'],
            bad11: [
                '<25>{*}{#p/twinkly}{#g/twinklyCrazed}{#v/1}* E DE NOVO E DE NOVO E DE NOVO E DE NOVO E DE NOVO E DE NOVO E DE NOVO{%}',
                '<99>{*}{#p/twinkly}{#g/twinklyBroken}{#v/1}* AAAAHAHAHAHAHAHAHAHAHAHAHAH\n  AHAHAHAHAHAHAHAHAHAHAHAHAHA\n  HAHAHAHAHAHAHAHAHAHAHAHAHAH{^20}{%}'
            ],
            bad12: ['<25>{*}{#p/twinkly}{#g/twinklyDead}{#v/0}* ...{^80}{%}', '<25>{*}* ... morra.{^10}{%}'],
            bad13: () => [
                ...[
                    [
                        '<99>{#p/twinkly}{#v/1}Olá, $(name).{^100}{%}',
                        '<99>{#p/twinkly}{#v/1}Bem vindo a sua nova realidade.{^100}{%}'
                    ],
                    [
                        '<99>{#p/twinkly}{#v/1} Bem vindo de novo, $(name).{^100}{%}',
                        "<99>{#p/twinkly}{#v/1}É bom te ver aqui novamente.{^100}{%}"
                    ],
                    [
                        '<99>{#p/twinkly}{#v/1}Oh, $(name)...{^100}{%}',
                        '{#p/twinkly}{#v/1}Como você pode me abandonar.{^100}{%}'
                    ]
                ][Math.min(SAVE.flag.n.neutral_twinkly_loop2, 2)],
                '<99>{#p/twinkly}{#v/1}Você se sente... sozinho?{^100}{%}',
                '<99>{#p/twinkly}{#v/1}Você se sente... preso?{^100}{%}',
                '<99>{#p/twinkly}{#v/1}Hee hee hee...{^100}{%}',
                "<99>{#p/twinkly}{#v/1}... não existe fuga!{^100}{%}",
                '<99>{#p/twinkly}{#v/1}O precioso \"arquivo...\" do Asgore.{^100}{%}',
                "<99>{#p/twinkly}{#v/1}Eu trouxe esse para o mundo real!{^100}{%}",
                '<99>{#p/twinkly}{#v/1}Tudo que você pode fazer é seguir em frente...{^100}{%}',
                '<99>{#p/twinkly}{#v/1}Próximo, mas próximo...{^100}{%}',
                "<99>{#p/twinkly}{#v/1}... você não está com medo, está?{^100}{%}",
                "<99>{#p/twinkly}{#v/1}Você não vai fugir?{^100}{%}",
                '<99>{#p/twinkly}{#v/1}Bom.{^100}{%}',
                '<99>{#p/twinkly}{#v/1}Muito bom.{^100}{%}',
                '<99>{#p/twinkly}{#v/1}Você é um ótimo irmão.{^100}{%}',
                '<99>{#p/twinkly}{#v/1}...{^100}{%}',
                "<99>{#p/twinkly}{#v/1}Você está quase lá...!{^100}{%}",
                '<99>{#p/twinkly}{#v/1}Só mais um pouco, $(name)...{^100}{%}'
            ],
            bad14: [
                '<99>{#p/human}{#v/1}{@fill=#42fcff}Seu longo pesadelo acabou agora.{^80}{%}',
                '<99>{#p/human}{#v/2}{@fill=#ff993d}Seu mundo será restaurado!{^80}{%}',
                '<99>{#p/human}{#v/3}{@fill=#003cff}Mas antes, você precisa fazer uma escolha.{^80}{%}',
                '<99>{#p/human}{#v/4}{@fill=#d535d9}Você destruirá o que está a frente?{^80}{%}',
                '<99>{#p/human}{#v/5}{@fill=#00c000}Ou você terá piedade?{^80}{%}',
                '<99>{#p/human}{#v/6}{@fill=#faff29}O julgamento é seu para fazer.{^80}{%}'
            ],
            bad15: [
                [
                    '<99>{*}{#p/twinkly}...',
                    '<99>{*}... O quê você está fazendo?',
                    "<99>{*}Você realmente acha que eu aprendi...",
                    '<99>{*}... qualquer coisa com isso?',
                    '<99>{*}Não.'
                ],
                ["<99>{*}{#p/twinkly}Se você não acabar com isso agora...", "{*}Eu irei voltar."],
                ["<99>{*}{#p/twinkly}Eu vou te consumir."],
                ["<99>{*}{#p/twinkly}Eu irei destruir tudo."],
                ["<99>{*}{#p/twinkly}Eu farei com que você nunca tenha existido!"],
                ['<99>{*}{#p/twinkly}...'],
                ['<99>{*}{#p/twinkly}...?'],
                ['<99>{*}{#p/twinkly}... Porquê?'],
                ['<99>{*}{#p/twinkly}... por que você está sendo...', '{*}{#p/twinkly}... tão legal comigo?'],
                ["<99>{*}{#p/twinkly}... eu não consigo entender..."],
                ["<99>{*}{#p/twinkly}Eu não consigo entender!"]
            ],
            bad16a: ["<99>{*}{#p/twinkly}{#i/4}... Eu só não consigo entender...{^30}{%}"],
            bad16b: ['<99>{*}{#p/twinkly}{#i/3}Adeus, $(name).{^30}{%}'],
            bad17: [
                
                '<32>{*}{#p/event}{#i/5}Twinkly fugiu.'
            ],
            sad0: () =>
                world.runaway ? ['<25>{#p/asriel1}{#f/30}* Eu me rendo!'] : ["<25>{#p/asriel1}{#f/25}* Me desculpa."],
            sad1: () => [
                ...(world.runaway
                    ? ['<25>{#p/asriel1}{#f/23}* Eu acho que você ganhou de novo, huh, $(name)?']
                    : [
                        "<25>{#p/asriel1}{#f/23}* Eu sempre fui um bebê chorão, né, $(name)?",
                        ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Asriel...'])
                    ]),
                '<25>{#p/asriel1}{#f/22}* ...',
                '<25>{#f/21}* ... Eu sei.',
                "<25>{#f/23}* Você não é $(name), é?",
                "<25>{#f/22}* $(name) já se foi a muito tempo.",
                '<25>{#f/15}* ...',
                '<25>{#f/15}* Hm... qual seu nome?',
                '<25>{#f/10}* Qual é seu nome?'
            ],
            sad2: () => [
                '<32>{#p/human}* (...)\n* (Você diz a Asriel seu nome.)',
                ...(world.runaway
                    ? [
                        '<25>{#p/asriel1}{#f/21}* Frisk, huh?',
                        '<25>{#f/23}* Pois bem, eu acho que você ganhou novamente, Frisk.',
                        '<25>{#f/22}* ...',
                        "<25>{#f/13}* É estranho...",
                        "<25>{#f/16}* Como uma estrela eu tinha me esquecido como era estar... verdadeiramente com medo.",
                        "<25>{#f/15}* Eu fiquei acostumado a fazer outros se sentirem dessa forma.",
                        "<25>{#f/13}* Mas agora, com a ALMA de todos dentro de mim.",
                        '<25>{#f/15}* Eu...',
                        "<25>{#f/16}* Eu não consigo escapar desse sentimento.",
                        "<25>{#f/15}* Desde que você decidiu começar a me atacar, é como...",
                        '<25>{#f/15}* Se eles entendessem o tipo de pessoa que você é agora.',
                        '<25>{#f/13}* Você nunca matou, mas lá no fundo...',
                        '<25>{#f/13}* O pensamento de você os trazendo para a ponta da morte...',
                        '<25>{#f/15}* Várias e várias vezes...',
                        '<25>{#f/16}* ...',
                        "<25>{#f/21}* Eles tem medo de você, Frisk.",
                        '<26>{#f/23}* E... eu acho que eu tenho também.',
                        '<25>{#f/22}* ...'
                    ]
                    : [
                        '<25>{#p/asriel1}{#f/17}* Frisk, huh?',
                        "<25>{#f/17}* Este é...",
                        '<25>{#f/23}* ... um nome legal.',
                        '<25>{#f/22}* ...',
                        '<25>{#f/13}* Frisk...',
                        ...(SAVE.flag.n.killed_sans > 0
                            ? [
                                '<25>{#p/asriel1}{#f/13}* O que nós fizemos antes, eu...',
                                '<25>{#f/15}* ...',
                                "<25>{#f/16}* Eu sinto muito em te trazer para aquilo.",
                                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... espera um segundo...']),
                                ...(SAVE.flag.n.genocide_milestone > 0
                                    ? [
                                        [
                                            '<25>{#p/asriel1}{#f/21}* Sans, Papyrus...\n* Até a unidade canina...',
                                            '<25>{#p/asriel1}{#f/21}* Sans, Papyrus, Criança Monstro, Undyne...\n* Até a Guarda Real...',
                                            '<25>{#p/asriel1}{#f/21}* Sans, Papyrus, Criança Monstro, Undyne...\n* E Mettaton, também...',
                                            '<25>{#p/asriel1}{#f/21}* Sans, Papyrus, Criança Monstro, Undyne...\n* Mettaton e Alphys...'
                                        ][Math.ceil((SAVE.flag.n.genocide_milestone - 1) / 2)],
                                        "<25>{#f/21}* Todos aqueles que eu sei que você faria tudo para proteger..."
                                    ]
                                    : [
                                        "<25>{#p/asriel1}{#f/21}* Eu sei que não chegamos longe...",
                                        '<25>{#f/15}* ... mas mesmo assim...',
                                        '<25>{#f/21}* Foi errado de mim te forçar a chegar tão longe.',
                                        "<25>{#f/21}* Especialmente agora que eu sei que você faria tudo para protege-los."
                                    ]),
                                ...(SAVE.data.b.oops
                                    ? []
                                    : ['<32>{#p/basic}* ... essa é a \"linha do tempo assassina\" da qual ele estava falando?']),
                                "<25>{#p/asriel1}{#f/23}* Só... não se culpe, tudo bem?",
                                "<25>{#f/22}* Não apenas você desfez o que tinha feito antes...",
                                '<25>{#f/17}* Mas você também enfrentou o impossível para salvar seus amigos.',
                                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* É.']),
                                "<25>{#p/asriel1}{#f/13}* Aliás, e talvez seja só minha imaginação, mas...",
                                '<25>{#f/13}* ... pensando mais atrás...',
                                '<25>{#f/15}* Você nunca parecia tão interessado no que estávamos fazendo.',
                                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* É, exatamente.']),
                                '<25>{#p/asriel1}{#f/23}* De fato... se qualquer coisa...',
                                '<25>{#f/22}* Quase pareceu como se você estivesse tentando resistir aquilo.',
                                ...(SAVE.data.b.oops
                                    ? []
                                    : ["<32>{#p/basic}* É, você não é esse tipo de pessoa."]),
                                '<25>{#p/asriel1}{#f/15}* Tudo que eu sei... apesar do que aconteceu...',
                                '<25>{#f/15}* Apesar do que você fez... ou, o que quis que você fizesse...',
                                "<25>{#f/16}* Você ainda é uma pessoa melhor do que jamais fui.",
                                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Hmph.']),
                                "<25>{#p/asriel1}{#f/21}* ...\n* Mas eu estou ficando triste."
                            ]
                            : [
                                "<25>{#f/13}* Eu não me sentia assim a tanto tempo.",
                                '<25>{#f/16}* Como estrela, eu não tinha... alma.',
                                '<25>{#f/15}* Eu tinha perdido o poder de amar os outros.',
                                "<25>{#f/13}* Mas, com o as ALMAS de todos dentro de mim...",
                                '<25>{#f/13}* Eu não apenas tenho minha compaixão de volta...',
                                "<25>{#f/23}* Mas eu posso sentir todos os monstros também.",
                                '<25>{#f/17}* Eles todos se importaram tanto um com o outro.',
                                ...(30 <= SAVE.data.n.bully
                                    ? [
                                        '<25>{#f/23}* E... uh...\n* Já para você, eles...',
                                        '<25>{#f/22}* ...',
                                        ...(20 <= world.flirt
                                            ? [
                                                '<25>{#f/15}* ... bem, eles parecem estar em um conflito....',
                                                "<25>{#f/10}* É como se eles gostassem... e não gostassem ao mesmo tempo de ti."
                                            ]
                                            : [
                                                "<25>{#f/15}* ... bem, alguns deles parecem não gostar de você...",
                                                ...(SAVE.data.b.undyne_respecc
                                                    ? [
                                                        '<25>{#f/10}* Exceto a Undyne.\n* Ela parece gostar muito de você por algum motivo.'
                                                    ]
                                                    : ["<25>{#f/10}* Mas, eu não sei o porquê."])
                                            ]),
                                        '<25>{#f/23}* ... que estranho.',
                                        '<25>{#f/22}* ...'
                                    ]
                                    : [
                                        '<25>{#f/23}* E... eles se importam com você também, Frisk.',
                                        '<25>{#f/22}* ...',
                                        ...(20 <= world.flirt
                                            ? [
                                                '<25>{#f/15}* ... uau, eles... eles se importam muito com você...',
                                                '<25>{#f/15}* Uh...\n* Frisk, isso é...',
                                                '<25>{#f/17}* ... senhor...',
                                                "<25>{#f/20}* Eu, uh, não deveria me dizer como eles se sentem agora."
                                            ]
                                            : [
                                                '<25>{#p/asriel1}{#f/13}* Eu desejava poder te contar como todos se sentem.',
                                                '<25>{#f/17}* Toriel... Asgore...\n* Sans... Papyrus...\n* Undyne... Alphys...',
                                                ...(!SAVE.data.b.f_state_kidd_betray
                                                    ? ['<25>{#f/15}* ... Criança Monstro?\n* Este é o nome dele?']
                                                    : world.happy_ghost && SAVE.data.b.a_state_hapstablook
                                                        ? ['<25>{#f/23}* ... Napstablook, e... todos os primos dele.']
                                                        : SAVE.data.n.state_starton_nicecream > 0
                                                            ? ['<25>{#f/23}* ... até o cara do sorvete.']
                                                            : ['<25>{#f/23}* ... até mesmo aquele pequeno rato que trabalha no CORE.']),
                                                '<25>{#f/17}* Monstros são estranhos.',
                                                '<25>{#f/15}* Mesmo que eles mal te conheçam...',
                                                '<25>{#f/17}* Parece que eles realmente te amam.',
                                                '<25>{#f/23}* Haha.',
                                                '<25>{#f/22}* ...'
                                            ])
                                    ])
                            ])
                    ])
            ],
            sad3: () =>
                world.runaway
                    ? [
                        "<26>{#p/asriel1}{#f/13}* Eu...\n* Eu sei que cometi erros muito piores.",
                        "<25>{#f/16}* Eu sei... que você não é o único a se culpar pelo que aconteceu.",
                        ...(SAVE.flag.n.killed_sans > 0
                            ? [
                                '<25>{#f/15}* ...',
                                '<25>{#f/15}* Te empurrar em um plano para destruir o Outpost...',
                                '<25>{#f/16}* Já que assim eu poderia pretender que você é meu irmão a muito tempo morto.'
                            ]
                            : [
                                '<25>{#f/15}* ...',
                                '<25>{#f/15}* Tornando a mim mesmo naquela... entidade sem face...',
                                '<25>{#f/16}* Só para que eu pudesse te torturar em um pesadelo criado por mim...'
                            ]),
                        "<25>{#f/13}* Esse é o tipo de coisa da qual eu estou falando.",
                        "<25>{#f/22}* ... só o fato de eu estar vivo é bem menos do que eu mereço.",
                        choicer.create('* (O que você fará?)', 'Protestar', 'Não')
                    ]
                    : [
                        SAVE.flag.n.killed_sans > 0
                            ? "<25>{#p/asriel1}{#f/13}* Eu entendo se você não puder me perdoar."
                            : "<25>{#p/asriel1}{#f/13}* Frisk... eu...\n* Eu entendo se você não puder me perdoar.",
                        '<25>{#f/13}* Eu entendo se você quiser que eu vá embora.',
                        ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ... não diga isso!"]),
                        '<25>{#p/asriel1}{#f/15}* eu agi tão estranho e horrivelmente.',
                        '<25>{#f/15}* Eu te feri.',
                        '<25>{#f/16}* Eu feri tantas pessoas.',
                        '<25>{#f/13}* Amigos, família...',
                        "<25>{#f/22}* Não existe desculpa para o que eu fiz.",
                        ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Asriel...']),
                        choicer.create('* (O que você fará?)', 'Perdoar', 'Não')
                    ],
            sad4a: () => [
                ...(world.runaway
                    ? [
                        '<25>{#p/asriel1}{#f/25}* O... o quê?',
                        '<25>{#f/21}* ...',
                        "<25>{#f/21}* Eu acho... que você realmente não quer que ninguém morra, huh?",
                        '<25>{#f/22}* Você só quer socar as pessoas... nada mais.',
                        '<25>{#f/21}* ... mas... mesmo que você queira que eu fique...'
                    ]
                    : [
                        '<25>{#p/asriel1}{#f/25}* O... o quê?',
                        '<25>{#f/17}* ... Frisk, por favor.',
                        "<25>{#f/23}* Você me...\n* Você me fará chorar de novo.",
                        ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... n-nem me fala...']),
                        '<25>{#p/asriel1}{#f/21}* ... e, por mais que você me perdoe...'
                    ]),
                "<25>{#f/15}* Eu não posso manter essas ALMAS dentro de mim para sempre.",
                '<25>{#f/16}* Então... o mínimo que posso fazer é retorná-las.'
            ],
            sad4b: () =>
                world.runaway
                    ? [
                        '<25>{#p/asriel1}{#f/21}* ...',
                        '<25>{#f/21}* Bem.\n* Eu prometi que se você me derrotasse...',
                        '<25>{#f/23}* Eu te daria seu \"final feliz\".',
                        "<25>{#f/15}* ... então, já que eu não posso manter essas ALMAS dentro de mim para sempre...",
                        "<25>{#f/16}* Eu irei retorná-las e fazer isso."
                    ]
                    : [
                        '<25>{#p/asriel1}{#f/22}* ... certo.',
                        '<25>{#f/21}* Eu entendo.',
                        '<25>{#f/15}* Eu só espero que...',
                        '<25>{#f/16}* Que eu possa compensar um pouco agora.',
                        "<25>{#p/asriel1}{#f/15}* ... claro, desde que eu não posso manter essas ALMAS dentro de mim para sempre...",
                        '<25>{#f/16}* O mínimo que eu posso fazer é devolvê-las.'
                    ],
            sad4c: () => [
                '<25>{#p/asriel1}{#f/16}* ...',
                '<25>{#f/6}* Mas antes...',
                "<25>{#f/29}* Tem mais uma coisa que eu preciso fazer.",
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... e agora o quê?']),
                "<25>{#p/asriel1}{#f/29}* Agora mesmo, eu posso sentir a mente de todos trabalhando como uma.",
                "<25>{#f/6}* Eles estão todos correndo para a mesma intenção.",
                "<26>{#f/6}* Com o poder de todos... com a determinação de todo mundo...",
                "<25>{#f/6}* É hora dos monstros...",
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Finalmente serem livres.']),
                '<25>{#p/asriel1}{#f/29}* Finalmente serem livres.',
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... sabia.'])
            ],
            abreak: '{*}{#p/event}{#i/3}O escudo de força foi\nerradicado.',
            sad5: () => [
                '<25>{#p/asriel1}{#f/21}* Frisk...',
                '<25>{#f/21}* Eu tenho que ir agora.',
                ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ... huh?\n* Mas você não pode..."]),
                "<25>{#p/asriel1}{#f/15}* Sem os poderes das ALMAS de todo mundo...",
                "<25>{#f/22}* Eu não poderei manter essa forma.",
                '<25>{#f/21}* Em pouco tempo...',
                "<25>{#f/22}* Eu voltarei a ser uma estrela.",
                ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Mas... você...']),
                "<25>{#p/asriel1}{#f/15}* Eu irei parar de ser eu mesmo.",
                ...(world.runaway
                    ? [
                        "<25>{#f/15}* ... Mas talvez isso seja para o melhor.",
                        '<25>{#f/23}* Ha... Frisk.',
                        "<25>{#f/21}* Não tem mais necessidade de você estar aqui.",
                        "<25>{#f/22}* Não perca mais seu tempo em mim."
                    ]
                    : [
                        "<25>{#f/15}* Eu não serei capaz de sentir amor novamente.",
                        ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* ... não...']),
                        '<25>{#p/asriel1}{#f/23}* Então... Frisk.',
                        "<25>{#f/17}* É melhor que você só esqueça de mim, okay?",
                        ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* Não! Você não pode só ir embora!"]),
                        '<25>{#p/asriel1}{#f/23}* Só vá com as pessoas que você ama.'
                    ]),
                choicer.create('* (O que você fará?)', 'Conforta-lo', 'Não')
            ],
            sad6: () =>
                world.runaway
                    ? [
                        '<25>{#p/asriel1}{#f/25}* ...!',
                        '<25>{#f/21}* ...',
                        '<25>{#f/21}* Frisk, Eu...',
                        "<25>{#f/15}* ... Eu só não posso agora, tá bom?",
                        "<25>{#f/22}* Eu... Eu sinto muito."
                    ]
                    : [
                        '<25>{#p/asriel1}{#i/4}{#f/23}* Ha... ha...',
                        "<25>{#f/23}{#i/4}* Eu não quero deixar ir...",
                        ...(SAVE.data.b.oops ? [] : ['<32>{#p/human}* (Parece que tem alguém chorando...)'])
                    ],
            sad7: () =>
                world.runaway
                    ? [
                        '<25>{#p/asriel1}{#f/13}* Frisk...',
                        '<25>{#f/15}* Seja lá o que você fizer...',
                        '<25>{#f/21}* Só... toma cuidado, okay?',
                        '<25>{#f/21}* Não importa quem você... bata até a quase morte.',
                        '<25>{#f/23}* Senhor.\n* O que será que eles vão fazer com você?'
                    ]
                    : [
                        '<25>{#p/asriel1}{#f/21}* Frisk...',
                        "<25>{#f/23}* Você...",
                        "<25>{#f/17}* Você fará um bom trabalho, tudo bem?",
                        '<25>{#f/21}* Não importa o que você faça.',
                        '<25>{#f/23}* Todo mundo estará lá por você, tudo bem?',
                        ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Não... por favor...'])
                    ],
            sad8: ["<25>{#p/asriel1}{#f/21}* ...\n* O tempo está acabando.", '<25>{#f/22}* Então... adeus.'],
            sad8x: ["<32>{*}{#p/basic}* ... não vá...{^50}{%}"],
            sad9: () =>
                world.runaway
                    ? [
                        '<25>{#p/asriel1}{#f/21}* Por sinal...',
                        '<25>{#f/22}* Frisk.',
                        "<25>{#f/21}{#x1}* ... não acabe se espancando por isso, certo?"
                    ]
                    : [
                        '<25>{#p/asriel1}{#f/21}* Por sinal...',
                        '<25>{#f/23}* Frisk.',
                        '<25>{#f/17}{#x1}* ... cuida da mamãe e do papai pra mim, tudo bem?'
                    ],
            sad9x: ['<32>{#p/basic}* ...'],
            sad10: () =>
                world.runaway
                    ? ['<32>{#p/human}* (O som de um ônibus espacial consegue ser ouvido afastando-se para o vasto.)']
                    : ['<25>{#p/kidd}{#f/4}* Alô?', '<25>{#f/4}* Tem alguém aí...?'],
            sad11: () =>
                SAVE.data.b.f_state_kidd_betray
                    ? [
                        "<25>{#p/kidd}{#f/5}* ... ah, é só você.",
                        "<25>{#f/4}* Bom... quando você estiver pronto...",
                        "<25>{#f/5}* Todo mundo está te esperando na casa do Asgore.",
                        "<25>{#f/4}* Eu vou... sair do seu caminho agora."
                    ]
                    : [
                        '<25>{#p/kidd}{#f/2}* Yo!\n* Onde você esteve esse tempo todo!?',
                        "<25>{#f/1}* Estavam te procurando por todos os lados, cara!",
                        "<25>{#f/2}* Temm uma refeição final acontecendo na casa do Asgore, e...",
                        "<25>{#f/1}* Todo mundo estava se perguntando quando você iria aparecer!",
                        "<25>{#f/1}* ... vamos lá, cara!\n* Junte-se enquanto não é tarde demais!"
                    ],
            sad11x: [
                '<32>{#p/basic}* ... Frisk, eu...',
                "<33>* Eu não posso só deixar ele ir.",
                "<32>* Isso tudo é coisa demais...",
                "<32>* Essas coisas nas quais eu tenho me segurado por anos...",
                "<32>* Se eu não puder falar com ele logo, eu...",
                '<32>* Eu...',
                "<32>* Eu só preciso vê-lo antes que ele seja... se vá para sempre"
            ],
            epilogue1: () =>
                world.runaway
                    ? [
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<18>{#p/papyrus}{#f/6}DESCULPA SE VOCÊ TENTOU NOS LIGAR ANTES...',
                        "<18>{#p/papyrus}{#f/6}AS LINHAS NÃO CAÍRAM NEM NADA DO TIPO, NÓS SÓ...",
                        "<18>{#p/papyrus}{#f/5}... ESTAMOS TE IGNORANDO.",
                        "<18>{#f/5}É ESTRANHO... TODOS SABEMOS SEU NOME AGORA.",
                        "<18>{#f/6}NÓS ESTAMOS TODOS... ATERRORIZADOS DE VOCÊ.",
                        '<18>{#f/4}... BEM, MAIOR PARTE DE NÓS.',
                        '<25>{#p/undyne}{#f/12}* É.\n* O que ele disse.',
                        '<18>{#p/papyrus}{#f/5}...',
                        "<18>{#p/papyrus}{#f/5}... PRA SER SINCERO, ACHO QUE ELA ESTÁ COM MEDO, TAMBÉM.",
                        '<25>{#p/undyne}{#f/17}* Não estou!',
                        '<18>{#p/papyrus}{#f/5}...',
                        "<18>{#f/5}NÃO FOI UMA ESCOLHA FÁCIL DE SE FAZER, MAS...",
                        "<18>{#f/31}NÓS TODOS JÁ DEIXAMOS O OUTPOST E VIEMOS PARA UM NOVO MUNDO.",
                        "<18>{#f/6}EU SEI, EU SEI!\n* MAS NÃO SE PREOCUPA!",
                        "<18>{#f/5} VOCÊ AINDA TEM O CORE PARA TE FAZER COMPANHIA.",
                        '<25>{#p/undyne}{#f/12}* Até a energia dele acabar, é claro.',
                        "<18>{#p/papyrus}{#f/5}SÓ... NÃO VEM ATRÁS DA GENTE, TÁ BOM?",
                        "<18>{#f/31}É MELHOR QUE A GENTE NUNCA SE VEJA NOVAMENTE.",
                        '<18>{#f/3}...',
                        '<18>{#f/3}BEM... ADEUS.',
                        '<25>{#p/undyne}{#f/1}* Aproveite a solitude!!',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]
                    : [
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        "<18>{#p/papyrus}{#f/0}EI, HUMANO!\nESPERO QUE VOCÊ ESTEJA BEM!",
                        "<18>{#f/5}ESTÁVAMOS BEM PREOCUPADOS COM VOCÊ, SABE.",
                        '<18>{#f/6}QUANDO TE LIGAMOS ANTES, NÃO HOUVE RESPOSTA!',
                        '<18>{#f/0}FELIZMENTE SEU AMIGO VEIO E...',
                        '<18>{#f/0}AGORA PODEMOS TODOS RESPIRAR DE ALÍVIO.',
                        "<18>{#f/0}... FRISK?\nÉ SEU NOME, CERTO?",
                        "<18>{#f/5}É ESTRANHO... TODOS SABEMOS SEU NOME AGORA.",
                        "<18>{#f/0}MAS TUDO BEM.\nÉ ESTRANHO DE UMA FORMA EDIFICANTE.",
                        "<25>{#p/sans}{#f/0}* cuidado mano, não queime a comida.",
                        "<18>{#p/papyrus}{#f/7}SANS!!!\nEU SEI O QUE ESTOU FAZENDO!!!",
                        '<25>{#p/sans}{#f/2}* Só tendo certeza.',
                        "<18>{#p/papyrus}{#f/6}ENTÃO... ASGORE É UM GRANDE FÃ DE ESPAGUETE.",
                        '<18>{#p/papyrus}{#f/4}APÓS MINHA REFEIÇÃO, ELE FICOU ABISMADO...',
                        '<18>{#p/papyrus}{#f/0}AGORA, ELE QUER QUE EU COZINHE PARA TODA A FESTA!',
                        '<18>{#p/papyrus}{#f/9}EU, CHEFE MESTRE PAPYRUS, ESTOU FELIZ COM ISSO!',
                        "<25>{#p/sans}{#f/0}* você finalmente está ganhando o respeito que merece, huh?",
                        '<18>{#p/papyrus}{#f/0}OH, ABSOLUTAMENTE.\nPORQUE ATÉ O MOMENTO...',
                        "<18>{#p/papyrus}{#f/4}EU NUNCA VI UMA PESSOA PASSANDO DA PRIMEIRA MORDIDA.",
                        '<25>{#p/sans}{#f/0}* wow.\n* falando sobre mover o mundo pra cima.',
                        "<25>{#p/sans}{#f/3}* talvez agora, não estar na guarda real... não é tão ruim.",
                        "<25>{#p/sans}{#f/2}* eu sou seu irmão, então estou orgulhoso de ti de toda forma.",
                        "<18>{#p/papyrus}{#f/8}SANS...!\nVOCÊ VAI ME FAZER CHORAR!",
                        "<18>{#p/papyrus}{#f/7}AS PESSOAS NÃO VÃO QUERER PASTA COM LÁGRIMAS!",
                        '<25>{#p/sans}{#f/3}* whoops.\n* momento errado, eu acho.',
                        '<18>{#p/papyrus}{#f/4}PARA VOCÊ, ISSO É ACIMA DO TEMPO ACEITÁVEL.',
                        "<18>{#p/papyrus}{#f/0}... DE TODA FORMA, ESTAREMOS NA COZINHA DO ASGORE.",
                        '<18>{#p/papyrus}{#f/9}SINTA-SE LIVRE PARA VOLTAR QUANDO TIVER A CHANCE!',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ],
            epilogue2: () => [
                '<25>{#p/sans}{#f/0}* ei, carinha.',
                "<25>{#f/0}* eu estava me perguntando quando você apareceria por aqui.",
                '<25>{#f/3}* uma criança passou por mim, provavelmente pra te encontrar.',
                '<25>{#f/2}* deve ser por isso que você atendeu o telefone depois de dez ligações.',
                "<25>{#f/0}* ... de toda forma.\n* eu estive procurando por alguém também.",
                "<25>{#f/0}* você provavelmente conhece ela.\n* o nome é toriel.",
                "<25>{#f/3}* eu a procurei por todos os lados, mas sem sucesso.",
                '<25>{#f/0}* por agora, ela pode estar em qualquer lugar.',
                '<25>{#f/3}* se você ver ela, ou ouvir sobre ela, diz pra ela me ligar.',
                SAVE.data.b.skeleton_key
                    ? '<25>{#f/2}* ... pela que eu sei ela poderia estar no meu armário.'
                    : '<25>{#f/2}* Obrigado adiantado.'
            ],
            epilogue3: [
                '<25>{#p/asgore}{#f/6}* Ah, Frisk!\n* Que bom que você acordou.',
                '<25>{#f/6}* Se você gostar, pode se juntar a nós em tal celebração.',
                '<25>{#f/21}* Eu tenho certeza que os outros estarão felizes em te ver.',
                '<25>{#f/5}* No mais, sinta-se livre de caminhar pelo Outpost por enquanto.',
                '<25>{#f/5}* Assim que quiser ir embora, vá para a sala do trono.',
                '<25>{#f/6}{#x1}* Eu acabei de abrir a porta para o ônibus por controle remoto.'
            ],
            finaltext1: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<25>{#p/asriel1}{#f/17}* Essa porta vai nós levar até a saída.',
                            choicer.create('* (Deixar o Outpost?)', "Ainda\nNão", "Estou\npronto")
                        ]
                        : [
                            ...(SAVE.data.b.oops
                                ? [
                                    '<32>{#p/basic}* Se você sair agora, sua jornada terá chegado ao fim.',
                                    '<32>{#p/basic}* Seus amigos irão segui-lo para o novo planeta natal.'
                                ]
                                : ['<32>{#p/basic}* Frisk...', "<32>* Você não se lembra do que temos de fazer?"]),
                            choicer.create('* (Deixar o Outpost?)', "Ainda\nNão", "Estou\npronto")
                        ],
                [choicer.create('* (Deixar o Outpost?)', "Ainda\nNão", "Estou\npronto")]
            ),
            finaltext2: ['<32>{#p/basic}* Frisk?', choicer.create('* (Deixar o Outpost?)', "Ainda\nNão", "Estou\npronto")],
            finaltext3: ['<32>{#p/basic}* ...', choicer.create('* (Deixar o Outpost?)', "Ainda\nNão", "Estou\npronto")],
            hangar1: () =>
                SAVE.data.b.svr
                    ? [
                        "<25>{#p/asriel1}{#f/23}* É lindo...",
                        '<25>{#f/22}* ...',
                        "<25>{#f/13}* Mesmo que eu tenha tido essa visão desde que nasci...",
                        "<26>{#f/17}* Tem algo especial em vê-la sem o escudo de força.",
                        "<25>{#f/17}* Talvez seja só minha imaginação...",
                        '<25>{#f/23}* ... mas as estrelas parecem um pouco mais brilhantes.'
                    ]
                    : [
                        '<25>{#p/asgore}{#f/6}* Espaço... \n* A fronteira final.',
                        '<25>{#f/1}* Milhões de planetas inexplorados, alguns cheios de vida...',
                        '<25>{#f/2}* Outros... sem vida alguma.',
                        '<26>{#f/5}* Você pode dizer que o universo é como um rio cheio de peixes...',
                        '<26>{#f/6}* Você nunca sabe qual irá encontrar.'
                    ],
            hangar2: () =>
                SAVE.data.b.svr
                    ? [
                        '<25>{#p/asriel1}{#f/17}* ... haha.',
                        '<25>{#f/17}* Deveríamos ir.',
                        '<25>{#f/15}* ...',
                        '<25>{#f/15}* Mãe e Pai vão querer me ver de novo, então...',
                        "<25>{#f/17}* Eu vou encontrá-los assim que estivermos a bordo.",
                        '<25>{#f/13}* E você...',
                        '<25>{#f/20}* ... você provavelmente deveria descansar, Frisk.',
                        '<26>{#f/17}* Você deve estar muito cansado após tudo isso.',
                        '<25>{#f/13}* ...',
                        '<25>{#f/13}* Talvez, quando você acordar...',
                        "<25>{#f/17}* Você terá uma nova casa e uma família que te ama para te apoiar."
                    ]
                    : ['<25>{|}{#p/asgore}{#f/5}* Huh?\n* Tem algum- {%}'],
            hangar3: () =>
                SAVE.data.b.svr
                    ? ['<26>{#p/asriel1}{#f/17}* Pronto?']
                    : [
                        '<25>{#p/toriel}* Oh, aí está você, pequeno!',
                        '<25>{#f/5}* ...',
                        '<25>{#f/5}* ... olá, Asgore.'
                    ],
            hangar4: ['<25>{#p/asgore}{#f/1}* Olá.'],
            hangar5: ['<25>{#p/toriel}{#f/5}* ...', '<25>{#p/asgore}{#f/5}* ...'],
            hangar6: () =>
                SAVE.data.b.c_state_secret5_used
                    ? [
                        '<25>{#p/asgore}{#f/6}* Toriel, eu...',
                        '<25>{#p/asgore}{#f/1}* ... Eu sei como você deve se sentir em relação a suas ações no passado.',
                        '<25>{#p/asgore}{#f/2}* Sobre nosso... divórcio.',
                        '<25>{#p/toriel}{#f/5}* ... você sabe?'
                    ]
                    : ['<25>{#p/asgore}{#f/5}* Bem, é estranho.'],
            hangar7: () =>
                SAVE.data.b.c_state_secret5_used
                    ? [
                        '<25>{#p/asgore}{#f/1}* Você sente culpa em relação a mim.',
                        '<25>{#p/asgore}{#f/1}* Você sente que suas ações estão... acima da reconciliação.',
                        '<25>{#p/asgore}{#f/2}* ... que você não merece ser perdoada.',
                        '<25>{#p/toriel}{#f/13}* ...\n* ... correto.',
                        '<25>{#p/asgore}{#f/6}* Mas eu não acredito que esse seja o caso.',
                        '<25>{#p/asgore}{#f/6}* Eu acredito que você mereça perdão.',
                        '<25>{#p/asgore}{#f/6}* Que você merece fazer parte de uma família de novo.',
                        '<25>{#p/asgore}{#f/5}* E mesmo que nossos sentimentos um pelo outro tenham sumido...',
                        '<25>{#p/asgore}{#f/6}* Isso não significa que não possamos estar juntos!'
                    ]
                    : SAVE.data.b.c_state_secret1_used
                        ? [
                            '<25>{#p/toriel}{#f/5}* Asgore...',
                            '<25>{#p/toriel}{#f/5}* Eu sei que isso pode não significar muito para você agora, mas...',
                            '<25>{#p/toriel}{#f/9}* Eu realmente sinto muito pela forma que agi contra você.',
                            '<25>{#p/toriel}{#f/13}* Eu te construí em minha mente como uma terrível criatura.',
                            '<25>{#p/toriel}{#f/13}* Um covarde.',
                            '<25>{#p/toriel}{#f/9}* Um assassino de crianças.',
                            '<25>{#p/toriel}{#f/10}* ... mas você não é nenhuma dessas coisas.',
                            '<25>{#p/toriel}{#f/1}* De fato...',
                            '<25>{#p/toriel}{#f/3}* Apesar das consequências imprevistas do arquivo...',
                            '<25>{#p/toriel}{#f/0}* Proteger aqueles humanos foi a coisa mais corajosa que você fez.'
                        ]
                        : ['<25>{#p/toriel}{#f/1}* Muito obrigada por isso.'],
            hangar8: () =>
                SAVE.data.b.c_state_secret5_used
                    ? SAVE.data.b.c_state_secret1_used
                        ? [
                            '<25>{#p/toriel}{#f/1}* ... Asgore, eu...',
                            '<25>{#p/toriel}{#f/5}* Eu não tenho certeza se isso seria certo...',
                            '<25>{#p/toriel}{#f/1}* Além disso, mesmo que EU QUEIRA uma família, já faz muito tempo...',
                            '<25>{#p/toriel}{#f/0}* Não, não, isso é egocêntrico de minha parte.\n* Eu não posso.',
                            '<25>{#p/asgore}{#f/6}* Ah, mas veja...',
                            '<25>{#p/asgore}{#f/6}* Foi Frisk quem me pediu para lhe perguntar sobre isso.',
                            '<25>{#p/toriel}{#f/7}* ... Frisk!?',
                            '<25>{#p/toriel}{#f/1}* Bem... eu, umm...',
                            '<25>{#p/toriel}{#f/5}* Eu suponho... que eu possa considerar...',
                            '<32>{#p/human}* (Você acena com a cabeça, sorrindo.)',
                            '<25>{#p/asgore}{#f/21}* Vê?\n* Frisk claramente deseja que você fique conosco.',
                            '<25>{#p/toriel}{#f/23}* ...',
                            '<25>{#p/toriel}{#f/1}* Eu vou pensar sobre isso.'
                        ]
                        : [
                            '<25>{#p/toriel}{#f/1}* ... Asgore, eu...',
                            '<25>{#p/toriel}{#f/5}* Eu não acredito que seria o certo.',
                            '<25>{#p/toriel}{#f/10}* Eu sinto muito.\n* Eu desejo sim ter uma família, mas...',
                            '<25>{#p/toriel}{#f/9}* Dadas as circunstâncias, eu não poderei aceitar.',
                            '<25>{#p/asgore}{#f/1}* ...',
                            '<25>{#p/asgore}{#f/2}* Eu entendo.'
                        ]
                    : SAVE.data.b.c_state_secret1_used
                        ? [
                            '<25>{#p/asgore}{#f/20}* ...',
                            '<25>{#p/asgore}{#f/4}* ... obrigado.',
                            '<25>{#p/asgore}{#f/6}* Significa muito para mim te ouvir dizer tais palavras.',
                            '<25>{#p/toriel}{#f/9}* E você as merece ouvir.'
                        ]
                        : ['<25>{#p/asgore}{#f/5}* Hmm.'],
            hangar9: [
                '<18>{#p/papyrus}OLÁ PESSOAL!',
                '<25>{#p/toriel}{#f/1}* ... oh, oi!',
                "<18>{#p/papyrus}{#f/0}OLÁ!\nÉ ÓTIMO TE VER DE NOVO!",
                '<18>{#p/papyrus}{#f/9}EU ACABEI DE LIMPAR A FESTA NA CASA!',
                '<25>{#p/toriel}{#f/1}* ... Que bom, que bom.',
                '<25>{#p/toriel}{#f/0}* Pois bem. \n* Talvez você queira se juntar a nossa atividade.'
            ],
            hangar10: [
                '<18>{#p/papyrus}{#f/5}WOWIE...',
                '<25>{#p/asgore}{#f/21}* É lindo, não é mesmo?',
                "<25>{#p/asgore}{#f/5}* Até o momento, o escudo de força havia escurecido muita luz do cosmo.",
                '<25>{#p/asgore}{#f/6}* Interessante... é assim que as estrelas se parecem com todo seu brilho.',
                '<18>{#p/papyrus}{#f/0}QUE FASCINANTE!',
                '<18>{#p/papyrus}{#f/6}... SE EU PELO MENOS PUDESSE DIZER A DIFERENÇA.',
                '<25>{#p/asgore}{#f/5}* Se você estiver tendo dificuldades para jogar a diferença, talvez esteja cansado.',
                '<18>{#p/papyrus}{#f/5}EU SUPONHO QUE FOI UM LONGO DIA...',
                '<25>{#p/toriel}{#f/1}* É uma boa ideia deitar e dormir, então.',
                '<18>{#p/papyrus}{#f/7}O QUE!?\nDESCANSAR!?',
                '<18>{#p/papyrus}{#f/7}ME DA UMA PAUSA!!',
                "<18>{#p/papyrus}{#f/4}NA VERDADE, NÃO ME DA UMA PAUSA.",
                "<18>{#p/papyrus}{#f/7}EU NÃO PRECISO!!",
                '<18>{#p/papyrus}{#f/5}...',
                '<18>{#p/papyrus}{#f/5}MEU IRMÃO POR OUTRO LADO...'
            ],
            hangar11: ["<25>{#p/sans}{#f/2}* salve, irmão?"],
            hangar12: ['<25>{#p/toriel}{#f/0}* Oh!\n* \"Salve\", Sans!', '<25>{#p/asgore}{#f/5}* Olá...?'],
            hangar13: [
                '<18>{#p/papyrus}{#f/4}VOCÊ SABE O TAL \"SALVE\", IRMÃO...',
                "<18>{#p/papyrus}{#f/0}E O QUE NÃO TÁ SALVE!\nE O QUE TÁ DE BUENAS!\nE O QUE TÁ TRANQUILEBA!",
                "<18>{#p/papyrus}{#f/9}ESTÁ TUDO AO NOSSO REDOR!",
                '<25>{#p/sans}{#f/0}* hmm...',
                "<25>{#p/sans}{#f/2}* Então você quer dizer que eu estou {@fill=#ff0}voando nas estrelas {@fill=#fff}, então?",
                '<18>{#p/papyrus}{#f/5}...',
                '<18>{#p/papyrus}{#f/5}BEM, DAQUI A POUCO, EU DIREI QUE SIM!',
                '<25>{#p/sans}{#f/4}* heheh.\n* feliz em ouvir.',
                '<18>{#p/papyrus}{#f/0}EU TAMBÉM.'
            ],
            hangar14: [
                '<25>{#p/sans}* Por sinal, todos AMARAM o espaguete que você fez mais cedo.',
                "<25>{#p/sans}{#f/2}* Eu teria chegado aqui mais cedo...",
                "<25>{#p/sans}{#f/2}* ... se não fosse todo mundo me implorando para provar.",
                '<18>{#p/papyrus}{#f/0}MAS... VOCÊ GOSTOU!?',
                '<25>{#p/sans}{#f/3}* heh.\n* é claro que sim.',
                "<25>{#p/sans}{#f/0}* você tem melhorado bastante suas habilidades.",
                '<18>{#p/papyrus}{#f/9}NYEH HEH HEH!\nÉ CLARO QUE EU TENHO!',
                "<18>{#p/papyrus}{#f/0}EU TENHO ME SENTIDO MAIS MOTIVADO DE MODO GERAL...",
                '<18>{#p/papyrus}{#f/0}... DESDE QUE FRISK CHEGOU.',
                '<25>{#p/sans}{#f/0}* Ele parece ter um efeito nas pessoas, huh?',
                '<18>{#p/papyrus}{#f/0}SIM, EU SENTI QUE TINHA UM PROPÓSITO AO LADO DELE!',
                '<18>{#p/papyrus}{#f/4}PRIMEIRO, COMO SEU INIMIGO INDOMÁVEL...',
                '<18>{#p/papyrus}{#f/5}... E DEPOIS, COMO UM GRANDE AMIGO.',
                "<18>{#p/papyrus}{#f/6}MINHA PREOCUPAÇÃO É QUE AGORA QUE ESTAMOS LIVRES...",
                "<18>{#p/papyrus}{#f/6}É DIFÍCIL IMAGINAR O QUE VIRÁ DEPOIS.",
                '<18>{#p/papyrus}{#f/4}POR OUTRO LADO, AGORA QUE -ESTAMOS- LIVRES...',
                "<18>{#p/papyrus}{#f/9}NÓS TEMOS TODO O TEMPO DA GALÁXIA PARA DECIDIR!",
                "<18>{#p/papyrus}{#f/0}... EU ME PERGUNTO O QUE FAREI PRIMEIRO."
            ],
            hangar15: ['<25>{#p/undyne}{#f/8}* Fuhuhu!\n* Eu tenho uma ideia!'],
            hangar16: [
                "<25>{#p/alphys}{#g/alphysSmarmyAggressive}* Exatamente. Você vai nos ajudar a lançar uma nova franquia Mew Mew."
            ],
            hangar17: ['<25>{#p/toriel}{#f/6}* Pff-\n* Hahaha!'],
            hangar18: ["<25>{#p/undyne}{#f/12}* Quer dizer, eu não iria tão longe, mas... claro."],
            hangar19: () => [
                "<25>{#p/alphys}{#g/alphysYupEverythingsFine}* Então, primeiro, precisaremos de uma espaçonave para Mew Mew pilotar...",
                "<25>{#p/undyne}{#f/17}* Alphys!! \n* Nós nem saímos do Outpost ainda!",
                ...(SAVE.data.b.a_state_hapstablook
                    ? [
                        "<25>{#p/undyne}{#f/16}* E aliás, ela... está meio ocupada agora.",
                        "<25>{#p/alphys}{#g/alphysWelp}* A-ah é, eu esqueci que agora existe uma Mew Mew de verdade.",
                        '<18>{#p/papyrus}{#f/0}É, EU VI ELA NÃO MUITO TEMPO ATRÁS NA FESTA!',
                        '<18>{#p/papyrus}{#f/0}ELA PARECIA BEM FELIZ, SINCERAMENTE.',
                        "<25>{#p/alphys}{#g/alphysInquisitive}* Ela não era um tal de Boneco Raivoso oh algo assim?",
                        "<25>{#p/undyne}{#f/7}* Não IMPORTA!\n* Ela é bonita do jeito que é agora, CARALHO!",
                        '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Nossa, tá booom!?'
                    ]
                    : [
                        "<25>{#p/undyne}{#f/16}* E além disso...",
                        "<25>{#p/undyne}{#f/17}* Ei, não era pra você estar fazendo uma nova Boneca Mew Mew pra alguém?",
                        '<25>{#p/alphys}{#g/alphysWelp}* A-ah certo, eu ainda tenho que fazer isso.',
                        '<18>{#p/papyrus}{#f/5}EU LEMBRO DE ALGUÉM NA FESTA PERGUNTANDO SOBRE ISSO...',
                        '<18>{#p/papyrus}{#f/6}PARECIA MEIO TIMIDO.',
                        '<25>{#p/alphys}{#g/alphysCutscene2}* Sim, acho que sei quem era.\n* Eu tenho que terminar...',
                        '<25>{#p/undyne}{#f/7}* E é melhor você terminar antes de chegarmos no novo mundo!',
                        '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Eu vou, eu vou!!'
                    ])
            ],
            hangar20: [
                '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* De toda f-forma...',
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* É bom te ver, Asgore.\n* Você também, Sans.",
                '<18>{#p/papyrus}{#f/6}E EU?',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* ... você também.',
                '<25>{#p/toriel}{#f/0}* Eu acho que você está esquecendo alguém.',
                '<25>{#p/alphys}{#g/alphysCutscene3}* Ah!\n* D-desculpa...!',
                '<25>{#p/toriel}{#f/6}* Hee hee.\n* Estou só te enjoando.',
                '<25>{#p/toriel}{#f/1}* Verdade seja dita, eu ouvi muito sobre você...',
                '<25>{#p/toriel}{#f/0}* Se tornar cientista real tão jovem, é um grande feito.',
                "<25>{#p/undyne}{#f/8}* É!!\n* Ela é a MELHOR!",
                '<25>{#p/alphys}{#g/alphysCutscene2}* ... Eu tento.'
            ],
            hangar21: [
                '<25>{#p/asgore}{#f/6}* Agora que estamos todos aqui, vamos tomar um momento para respirar...',
                '<25>{#p/asgore}{#f/21}* E refletir sobre a jornada que nos trouxe até aqui.'
            ],
            hangar22: [
                "<25>{#p/sans}{#f/3}* é meio engraçado, não é?",
                "<25>{#p/sans}{#f/0}* todo o tempo que estivemos presos aqui...",
                '<25>{#p/sans}{#f/0}* sempre pudemos ver as estrelas, mas nunca toca-las.',
                '<25>{#p/sans}{#f/3}* mas... agora...',
                "<25>{#p/sans}{#f/0}* ... eu acho que isso não tão legal.",
                "<25>{#p/sans}{#f/3}* só é da hora.",
                '<18>{#p/papyrus}{#f/5}É.',
                '<18>{#p/papyrus}{#f/5}SÓ... LEGAL.'
            ],
            hangar23: ['<32>{#p/napstablook}* ei todo mundo...'],
            hangar24: [
                "<32>{#p/napstablook}* eu espero não estar atrapalhando vocês ou coisa do tipo...",
                '<25>{#p/undyne}{#f/14}* Pfft, atrapalhando?\n* Sem chance!',
                "<25>{#p/sans}{#f/0}* é, você da hora.",
                '<18>{#p/papyrus}{#f/6}MAS NÃO TÃO -LEGAL-, SANS!',
                "<18>{#p/papyrus}{#f/4}SE NÃO ELE ESTARIA CONGELANDO...",
                '<32>{#p/napstablook}* heh...'
            ],
            hangar25: [
                '<25>{#p/alphys}{#g/alphysCutscene1}* Então Blooky!\n* Você viu o novo filme da Mew Mew?',
                "<32>{#p/napstablook}* tem... um novo?",
                '<25>{|}{#p/alphys}{#g/alphysHellYeah}* É!\n* Então basicamente a Mew Mew se arrepende do que {%}',
                '<99>{|}{#p/alphys}{#g/alphysHellYeah} ela fez em Starfire e\n  quer consertar\n  voltando no tempo, mas {%}',
                '<25>{#p/undyne}{#f/12}* Uh...',
                '<25>{|}{#p/alphys}{#g/alphysTheFactIs}* Para fazer isso, ela tem que usar um dispositivo que ela conseguiu matando um monte {%}',
                '<99>{|}{#p/alphys}{#g/alphysTheFactIs} de pessoas no final de\n  Starfire e como ela\n  fica toda perturbada e {%}',
                '<25>{#p/undyne}{#f/17}* Alphys.',
                "<25>{|}{#p/alphys}{#g/alphysInquisitive}* Ela tem um dilema moral sobre se ela é realmente uma boa pessoa para usar {%}",
                '<99>{|}{#p/alphys}{#g/alphysInquisitive} o dispositivo para desfazer todos os\n  o dano que ela causou\n  tentando obtê-lo e- {%}',
                '<25>{#p/undyne}{#f/8}* SPOILERS!!!',
                '<25>{#p/alphys}{#g/alphysSmileSweat}* ...',
                '<25>{#p/alphys}{#g/alphysNervousLaugh}* ... desculpa.'
            ],
            hangar26: [
                "<32>{#p/napstablook}* não se preocupa... você falou rápido demais para que eu entendesse...",
                '<25>{#p/alphys}{#g/alphysWelp}* ...',
                '<25>{#p/alphys}{#g/alphysWelp}* Sinto que falam isso demais pra mim.',
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* ... mas tudo bem.",
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* Liberdade é mais importante que qualquer franquia de anime."
            ],
            hangar27: ['<32>{#p/mettaton}* ALGUÉM DISSE \"FRANQUIA\"?'],
            hangar28: ['<25>{#p/alphys}{#g/alphysGarboCenter}* ... aí vamos nós de novo.'],
            hangar29: [
                "<32>{#p/mettaton}* NÃO INTERROMPA, DOUTORA!",
                "<32>{#p/mettaton}* EU APENAS ESTOU TENTANDO TRAZER SEUS MAIS -PERFEITOS- SONHOS A REALIDADE!",
                "<25>{#p/undyne}{#f/12}* Você não diria se soubesse os VERDADEIROS sonhos dela.",
                '<26>{#p/toriel}{#f/1}* Um, talvez seja hora de encerrar está conversa...',
                '<25>{#p/undyne}{#f/17}* Senhor, obrigado MÃE.',
                '<25>{#p/toriel}{#f/3}* ...',
                '<25>{#p/toriel}{#f/4}* Eu não sei como me sentir em relação a esse...\n* ... título.',
                '<32>{#p/mettaton}* AH, VOCÊ DEVE ESTAR PRECISANDO DE UM LIVRO GUIANDO SOBRE RELACIONAMENTOS DA MARCA MTT!',
                "<32>{#p/mettaton}* NÃO TEMAS.\n* EU ME LEMBRO DOS PASSOS NO CORAÇÃO.",
                '<33>{|}{#p/mettaton}* PRIMEIRO, PRESSIONE C OU CTRL PARA ABRIR- {%}',
                '<25>{#p/toriel}{#f/0}* Outra hora.',
                '<32>{#p/mettaton}* ... VALEU A TENTATIVA.'
            ],
            hangar30: [
                '<32>{#p/mettaton}* UMA VEZ QUE CHEGARMOS AO NOVO MUNDO...',
                "<32>{#p/mettaton}* TERÁ AMPLOS LUGARES PARA VENDER LIVROS DE RELACIONAMENTO.",
                "<32>{#p/mettaton}* ATÉ ENTÃO, NÓS SÓ DEVEMOS ESTAR FELIZES COM A LIBERDADE...",
                "<18>{#p/papyrus}{#f/0}NÃO SE PREOCUPE, METTATON, EU ESTAREI LÁ POR TI!",
                '<18>{#p/papyrus}{#f/5}PORQUE, QUANDO SE TRATA DE CONTENTAMENTO...',
                "<18>{#p/papyrus}{#f/9}EU VOU ATÉ O {@fill=#ff0}OSSO{@fill=#fff}!",
                '<32>{#p/mettaton}* HAHAHA... VOCÊ SABE QUE EU - SEMPRE - APRECIO SEU CONSELHO, PAPYRUS!',
                "<32>{#p/mettaton}* EU NÃO SOU COMO ESSAS PESSOAS QUE TE TRATAM COMO CRIANÇA.",
                '<25>{#p/undyne}{#f/14}* ... huh? \n* Tá olhando pra mim, porquê?',
                '<25>{#p/undyne}{#f/17}* O que eu te eu fiz!?'
            ],
            hangar31: [
                '<25>{#p/asgore}{#f/6}* Eu não gostaria de cortar por aqui, mas...',
                '<25>{#p/asgore}{#f/6}* Eu deveria estar levando Frisk para o ônibus de transporte agora.',
                '<25>{#p/asgore}{#f/5}* Ele deve estar cansado após tudo que passou.'
            ],
            hangar32: [
                "<18>{#p/papyrus}{#f/6}B-BEM...\nSE -ELE- JÁ ESTÁ INDO...",
                '<18>{#p/papyrus}{#f/9}... ENTÃO EU VOU TAMBÉM!'
            ],
            hangar33: ["<25>{#p/sans}{#f/2}* heh, estou logo atrás de ti, mano."],
            hangar34: ['<25>{#p/undyne}{#f/7}* ISSO!!\n* Conta comigo!!'],
            hangar35: ["<25>{#p/alphys}{#g/alphysHellYeah}* Não se esqueçam de mim!"],
            hangar36: [
                "<32>{#p/mettaton}* EU ACHO SERIA ESTRANHO CONTINUAR POR AQUI SEM MOTIVO.",
                "<32>{#p/mettaton}* ENTÃO... EU JÁ VOU TAMBÉM."
            ],
            hangar37: ["<25>{#p/napstablook}* eu não vou ficar muito atrás também..."],
            hangar38: [
                "<25>{#p/kidd}{#f/1}* Ei, onde todo mundo foi agora!?",
                '<25>{#p/kidd}{#f/7}* Eu... eu quero ir com o Frisk, também!',
                '<25>{#p/toriel}{#f/0}* Eles estão no ônibus de transporte, volte para o corredor e vire a direita.', 
                '<25>{#f/0}* É a porta que está lá.', 
                "<25>{#p/kidd}{#f/3}* Obrigado, pessoa que eu juro ter visto antes!",
                "<25>{#p/kidd}{#f/1}* Você é a melhor!"
            ],
            hangar39: ['<25>{#p/toriel}{#f/10}* Minha criança...'],
            hangar40: ['<25>{#p/toriel}{#f/1}* ... seja boa, tudo bem?'],
            returnofchara1: ['<32>{#p/basic}* Frisk...', '<32>* ... você ainda está aí?'],
            returnofchara2: [
                '<32>{#p/basic}* Desculpa eu sumi e logo você estava de volta.',
                '<32>* Fazendo o que fiz... tirou muito de mim.',
                "<32>* ... mas eu me recuperei agora.",
                "<32>* Eu acho que, em retrospectiva, é meio óbvio que eu sobreviveria...",
                '<32>* Quando Asriel absorveu minha ALMA, todos esses anos antes...',
                '<32>* Eu me tornei... um parte não física dele.\n* Um anjo em seu ombro.',
                '<32>* Ou um demônio.\n* Você escolhe.',
                '<32>* Mas quando ele morreu, eu continuei, e eu acabei me tornando um fantasma.',
                "<32>* Pelo menos, eu acho que foi isso que aconteceu..."
            ],
            returnofchara3: [
                '<32>{#p/basic}* ... sabe...',
                '<32>* Tudo essa coisa de eu querer deixar esse mundo...',
                '<32>* Sobre querer dizer adeus...',
                '<32>* ...',
                '<33>* No momento da sua morte, minha ALMA foi... separada.\n* Daquela.',
                "<32>* Eu sabia que não duraria para sempre, então eu tomei sem nem pensar.",
                "<32>* Olhando para trás, a decisão não fez muito sentido...",
                '<32>* Em circunstâncias normais, a ALMA de um boss monstro morto...',
                "<32>* ... não mantém a identidade do seu antigo dono.",
                "<32>* Eu sabia que tinha uma ALMA de monstro em minha pessoa, mas eu não sabia que era ele.",
                "<32>* Mas as circunstâncias não eram normais.",
                "<32>* Se eu tivesse percebido isso, eu...",
                '<32>* ...',
                '<32>* Bem.\n* Não tenho mais vontade de me despedir.',
                '<32>* Do contrário.',
                "<32>* Eu nunca estive tão feliz na vida.",
                "<32>* Saber que ele vai crescer e viver a vida que imaginei ter tomado dele...",
                '<32>* Isso significa muito para mim.'
            ],
            returnofchara4: [
                '<32>{#p/basic}* Ei.\n* Me faz um favor, tá bom?',
                '<32>* ... para de abraçar esse negócio e se levanta logo!',
                "<32>* Você entende que isso é só uma almofada, certo?",
                '<32>* ...',
                "<32>* Você tem uma nova casa, em um novo mundo, e tudo que você tá fazendo é dormir.",
                '<32>* Hmph!\n* Comportamento típico de humano.',
                '<32>* ... brincadeira.',
                "<32>* Eu vou deixar você dormir enquanto quiser, Frisk.",
                '<32>* Te vejo quando acordar.'
            ]
        },
        overworld: {
            get20: ['<32>{*}{#s/equip}{#p/human}* (O Cartão de Acesso ao Hangar foi adicionado ao seu chaveiro.){^90}{%}'],
            drop: [
                '<26>{#p/asgore}{#f/8}* ...!\n* Você acabou de jogar fora o chá que eu te dei?',
                '<25>{#p/asgore}{#f/1}* Hmm...\n* Eu peço desculpas se não foi o sabor que você gostou.'
            ],
            use: ['<25>{#p/asgore}{#f/21}* Ah... uma linda forma de chá, não é mesmo?'],
            drop_tori: ['<26>{#p/asgore}{#f/5}* Você deixou cair alguma coisa?\n* Eu reconheço o cheiro...'],
            use_tori: ['<26>{#p/asgore}{#f/5}* O que você está comendo?\n* O aroma é familiar...'],
            approachescape: ['<32>{#p/human}* (Você escuta passos caminhando para a distância.)'],
            partyguard1: pager.create(
                0,
                () =>
                    SAVE.data.n.plot_epilogue < 4
                        ? [
                            '<32>{#p/basic}{#x1}* Huh?\n* Já está indo?{#x3}',
                            "<32>{#x2}* Está tudo bem, irmão. \n* Se ele quer ir, deixe ele ir.{#x3}",
                            "<32>{#x1}* É... você tá certo.{#x3}"
                        ]
                        : ['<32>{#p/basic}{#x1}* Ei, bom te ver de novo!{#x3}', '<32>{#x2}* Sentimos sua falta.{#x3}'],
                () =>
                    SAVE.data.n.plot_epilogue < 4
                        ? [
                            '<32>{#p/basic}{#x1}* Desculpa, eu fico, super ansioso quando vejo pessoas saindo de rolês cedo.{#x3}',
                            '<32>{#x2}* É, ele fica ansioso.\n* Nada pessoal.{#x3}'
                        ]
                        : [
                            "<32>{#p/basic}{#x1}* Mas sem pressão.\n* Não é porque sentimos sua falta que você é obrigado a ficar.{#x3}",
                            '<32>{#x2}* Tipo, com certeza, mano.\n* Com certeza. {#x3}'
                        ]
            ),
            partyguard2: pager.create(
                0,
                () =>
                    SAVE.data.n.plot_epilogue < 4
                        ? [
                            '<32>{#p/basic}{#x2}* Este ponto de encontro é bem legal, mano.{#x3}',
                            '<32>{#x2}* Eles até trouxeram a planta Madrigal, bem ali naquela mesa!{#x3}'
                        ]
                        : [
                            "<32>{#p/basic}{#x2}* Se VOCÊ não experimentar o Madrigal, isso é apenas mais para mim.{#x3}",
                            '<32>{#x1}* ... você quis dizer para nós, né mano?{#x3}',
                            '<32>{#x2}* Haha, verdade.{#x3}'
                        ],
                () =>
                    SAVE.data.n.plot_epilogue < 4
                        ? ["<32>{#p/basic}{#x2}* É um monstro delicado.{#x3}"]
                        : ['<32>{#p/basic}{#x2}* Mais pra gente.']
            ),
            janet: pager.create(
                0,
                [
                    "<32>{#p/basic}* Você levaria um tapa na cara ao descobrir o quão sujo estava quando eu cheguei.",
                    "<32>* Mas vendo como todo mundo vai subir por aqui...",
                    "<32>* É bem crucial deixar tudo limpinho, eu digo.",
                    "<32>* Aliás, obrigado por nos salvar lá fora. Um verdadeiro trabalho de herói."
                ],
                ["<32>{#p/basic}* Você não vai ver o que grandão tá fazendo?"]
            ),
            giftbox1a: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Tem uma arma dentro."]),
                choicer.create('* (Abrir a caixa?)', 'Sim', 'Não')
            ],
            giftbox1b: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Tem uma armadura dentro."]),
                choicer.create('* (Abrir a caixa?)', 'Sim', 'Não')
            ],
            giftbox2a: () => [
                '<32>{#p/human}* (Você pegou a Big Dipper.)',
                choicer.create('* (Equipar o Big Dipper?)', 'Sim', 'Não')
            ],
            giftbox2b: () => [
                '<32>{#p/human}* (Você pegou o Pingente de Coração.)',
                choicer.create('* (Equipar o Pingente de Coração?)', 'Sim', 'Não')
            ],
            giftbox3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Não tem mais nada para ser tomado.)']
                    : ["<32>{#p/basic}* Está vazio."],
            giftbox4: ['<32>{#p/human}* (Você decide não abrir.)'],
            tea0: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A nota no envelope pede para que você aprecie este chá.)']
                    : [
                        "<32>{#p/basic}* Tem uma nota grudada no copo de chá.",
                        '<32>{#p/basic}* \"Por favor aprecie este copo de chá que deixei para você.\"\n* \"Seja lá quem você for.\"'
                    ],
            tea1: ['<32>{#p/human}* (Você pegou o Chá Estrelado.)'],
            tea2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você passa a mão pela bancada.)']
                    : ['<32>{#p/basic}* A bancada está limpa.'],
            fireplace1: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você sente a convidativa e aquecida lareira...)',
                        choicer.create('* (Entrar dentro?)', 'Sim', 'Não')
                    ]
                    : [
                        SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                            ? '<32>{#p/basic}* Só mais uma lareira.'
                            : "<32>{#p/basic}* Lareira do Asgore.\n* Não é tão quente, apenas quentinha.",
                        ...(world.darker
                            ? []
                            : ['<32>* Você provavelmente até poderia entrar.', choicer.create('* (Entrar dentro?)', 'Sim', 'Não')])
                    ],
            fireplace2a: ['<32>{#p/human}* (Você decide não entrar.)'],
            fireplace2b: () => [
                '<32>{#p/human}* (Você rasteja para dentro da lareira e deixa seu calor engolir você.)',
                '<32>{#p/human}* (Você está bem confortável.)',
                ...(SAVE.data.b.svr
                    ? asrielinter.fireplace2b++ < 1
                        ? ["<25>{#p/asriel1}{#f/13}* Eu só vou, uh, esperar você sair daí."]
                        : []
                    : world.goatbro && SAVE.flag.n.ga_asrielFireplace++ < 1
                        ? ["<25>{#p/asriel2}{#f/15}* Eu só vou, uh, te esperar sair..."]
                        : [])
            ],
            fireplace2c: [
                '<32>{#p/basic}* Cuidado aí dentro, bobinho!',
                "<32>* Caso contrário, eu terei notícias terríveis para reportar!",
                '<32>* ... huhehehaw!'
            ],
            fridgetrap1: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Um dia, Asgore construiu um replicador de chocolate no freezer.',
                            '<25>{#f/15}* $(name) estava tão feliz naquele dia...',
                            '<25>{#f/17}* ... finalmente, um suprimento infinito de chocolate.',
                            '<25>{#f/20}* Palavras dele, não a minha.'
                        ],
                        ["<25>{#p/asriel1}{#f/13}* Isso foi depois dele implorar por um durante dois anos."]
                    ][Math.min(asrielinter.fridgetrap1++, 1)]
                    : world.darker
                        ? ["<32>{#p/basic}* Você não gostaria do que está na geladeira de forma alguma."]
                        : [
                            "<32>{#p/basic}* É um estoque de barras de chocolate de marca entre uma pilha ainda maior de caracóis."
                        ],
            fridgetrap2: () => [
                ...(SAVE.data.b.svr
                    ? []
                    : [
                        ['<32>{#p/basic}* ...', '<32>* Você quer uma?'],
                        ['<32>{#p/basic}* ...', '<32>* Você quer mais uma?'],
                        ['<32>{#p/basic}* ...', '<32>* Você ainda quer mais uma?'],
                        ['<32>* Se você quiser mais uma, você pode ter...'],
                        ['<32>* E outra, e outra, e outra...'],
                        ['<33>* E lá vai chocolate...'],
                        ['<32>* Barra após barra...'],
                        ['<32>* Tem é uma quantidade profana de chocolate aqui.'],
                        ['<32>* Este tanto de chocolate deveria ser proibido por lei.'],
                        ['<32>* Por quanto tempo mais isso vai durar...'],
                        ["<32>* É tanto... socorro..."],
                        ['<32>* ...']
                    ][Math.min(SAVE.data.n.chocolates, 11)]),
                choicer.create('* (Pegar uma barra de chocolate?)', 'Sim', 'Não')
            ],
            fridgetrap3: ['<32>{#p/human}* (Você decide não fazer nada.)'],
            fridgetrap4: ['<32>{#p/human}* (Você pega a Barra de Chocolate.)'],
            brocall1: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysInquisitive}* Ei, você vem?',
                "<25>{#p/alphys}{#g/alphysWelp}* Eu... não quero deixar Asgore impaciente.",
                "<25>{#p/alphys}{#g/alphysTheFactIs}* Ele já espera faz centenas de anos...",
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall2: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysCutscene3}* Alô?\n* Você tá aí?',
                "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* Ainda estamos...\n* Te esperando...",
                '<25>{#p/alphys}{#g/alphysFR}* Você fugiu ou sei lá?',
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall3: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/alphys}{#g/alphysCutscene3}* Yup.\n* Você fugiu.\n* Acabei de ver.',
                "<25>{#p/alphys}{#g/alphysWTF2}* TEMOS COISAS IMPORTANTES PARA FAZER, SABE...",
                '<25>{#p/alphys}{#g/alphysWhyOhWhy}* ... por que isso sempre acontece comigo...',
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall4: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/mettaton}* EI, ALPHYS ME LIGOU E DISSE QUE VOCÊ NÃO ESTAVA COOPERANDO.',
                "<32>{#p/mettaton}* COM BASE NO QUE TENHO DISCUTIDO COM O PAPYRUS...",
                '<32>{#p/mettaton}* EU SUGIRO QUE VOCÊ VIRE SUA BUNDA AGORA MESMO E VOLTE PRA LÁ.',
                '<32>{#p/mettaton}* VAMOS LÁ, VOCÊ CONSEGUE, QUERIDA!',
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall5: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<18>{#p/papyrus}{#f/5}EU SEI QUE VOCÊ DEVE ESTAR APREENSIVO.',
                '<18>{#p/papyrus}{#f/5}O ESCUDO DE FORÇA PODE SER INTIMIDADOR.',
                '<18>{#p/papyrus}{#f/6}MAS NÃO TEMAS!',
                '<18>{#p/papyrus}{#f/4}SE SUA BATALHA CONTRA MIM PROVOU UMA COISA...',
                "<18>{#p/papyrus}{#f/9}É QUE VOCÊ TEM CORAGEM PARA TUDO!",
                '<18>{#p/papyrus}{#f/0}O IMPENETRÁVEL ESCUDO DE FORÇA NÃO TERÁ CHANCES!',
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall6: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                "<25>{#p/alphys}{#g/alphysWelp}* Ei, hmm...\n* Estivemos esperando por um bom tempo.",
                "<25>{#g/alphysThatSucks}* E eu não quero dizer tipo agora.",
                '<25>{#g/alphysSideSad}* Monstros estão presos aqui faz muito tempo.',
                "<25>{#g/alphysThatSucks}* Até minha família não lembra da vida antes... disso.",
                '<25>{#g/alphysSideSad}* Eu sei que Asgore e eu somos impacientes...',
                "<25>{#g/alphysIDK2}* Então, talvez seja por isso que você está temendo tanto.",
                "<25>{#g/alphysIDK3}* Pedimos desculpas.\n* Nós não queríamos te apressar tanto lá atrás.",
                "<25>{#g/alphysWorried}* Mas nós não somos os únicos esperando.",
                "<25>{#g/alphysCutscene2}* Todo mundo que você conheceu, todos os amigos que fez...",
                '<25>{#g/alphysCutscene2}* Se você pensa sobre isso...',
                "<25>{#g/alphysWorried}* É como se estivéssemos esperando toda nossa vida por você.",
                '<25>{#g/alphysWorried}* ...',
                '<25>{#g/alphysCutscene2}* ... volta logo...\n* Okay?',
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall7: [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/toriel}{#f/5}* Olá?\n* Aqui é a Toriel.',
                '<25>* Você deve estar bem longe agora.',
                '<25>{#f/9}* Tão longe que eu dúvido muito que essa mensagem te alcance.',
                '<25>{#f/13}* ... mas se fizer, então você deve saber...',
                '<25>{#f/9}* Eu não poderei mais esperar nas Outlands.',
                '<25>{#f/13}* Eu permaneci aqui na esperança de manter aqueles como você seguros...',
                '<25>{#f/14}* Criança após criança, eu pensei que poderia salvar ao menos uma...',
                '<26>{#f/13}* Mas não aconteceu.',
                '<25>{#f/9}* Eu permiti minha idade pegar o melhor de mim.',
                '<25>{#f/10}* Eu esqueci como crianças iguais a ti são tão curiosas.',
                '<25>{#f/14}* Irônico, não é mesmo?',
                '<25>{#f/13}* ...',
                '<25>{#f/9}* Eu... te vejo depois.',
                '<25>{#f/10}* ...\n* Seja boa... tudo bem?',
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            brocall8: [
                '<25>{#p/twinkly}{#f/6}* Você realmente veio todo esse caminho só pra ver o que iria acontecer?',
                "<25>{#f/8}* Wow.\n* Você é pior do que eu costumava ser.",
                '<25>{#f/12}* ...\n* Rato irritante.',
                "<25>{#f/11}* Não existe nada para você aqui.",
                '<25>{#f/7}* Literalmente nada.',
                '<25>{#f/0}{#v/1}* Até mesmo eu, não sou nada além de um casco vazio.',
                '<25>{#f/6}{#v/0}* Então pare de perder seu PRÓPRIO tempo e vá para o escudo de força.',
                '<25>{#f/11}* Orrr...\n* Você poderia desistir e ME deixar tomar o poder...',
                "<25>{#f/7}{#v/0}* Talvez você goste disso.",
                '<25>{#f/6}{#v/0}* ...',
                '<25>{#f/8}* Te vejo no escudo de força, idiota.'
            ],
            statusterminal1: [
                '<32>{#p/human}* (Você ativou o terminal.)',
                '<32>{#p/event}* Procedimento incompleto.\n* Por favor retornar mais tarde.'
            ],
            statusterminal2: () => [
                '<32>{#p/human}* (Você ativou o terminal.)',
                '<32>{#p/event}* Procedimento concluído.\n* Todos os indivíduos foram anexados com sucesso.',
                '<33>{#p/event}* Você também gostaria de sair?',
                choicer.create('* (Sair do Arquivo Seis?)', 'Sim', 'Não')
            ],
            cw_vender1: [
                '<32>{#p/human}* (Você clica no painel.)',
                '<32>{#s/equip}{#p/human}* (Você pega o Doce Monstro.)'
            ],
            cw_vender2: ['<32>{#p/human}* (Você clica no painel.)', '<32>{#p/human}* (...)'],
            cs_vender1: ['<32>{#p/human}* (Você clica no painel.)', '<32>{#s/equip}{#p/human}* (Você pega as Exoberries.)'],
            cs_vender2: ['<32>{#p/human}* (Você clica no painel.)', '<32>{#p/human}* (...)'],
            cs_tower: '* (Use [BAIXO], [ESQUERDA], [DIREITA],\ne [CIMA] para ajustar o som.)',
            cs_tower_done: ['<32>{#p/human}* (Você encara o agora desbloqueado terminal.)'],
            cf1_dimbox1: ['<32>{#p/human}* (Você pegou o Tofu Espacial.)'],
            cf1_dimbox2: ['<32>{#p/human}* (...)'],
            cf2_vender1: ['<32>{#p/human}* (Você clica no painel.)', '<32>{#s/equip}{#p/human}* (Você pegou as Rações.)'],
            cf2_vender2: ['<32>{#p/human}* (Você clica no painel.)', '<32>{#p/human}* (...)'],
            cf2_key1: ['<32>{#s/equip}{#p/human}* (A Chave Neon foi adicionada ao seu chaveiro.)'],
            cf2_key2: ['<32>{#p/human}* (...)'],
            cf2_bench0: ['<32>{#p/human}* (Parece que um Kit de Cura foi deixado embaixo deste banco.)'],
            cf2_bench1: ['<32>{#p/human}* (Você pegou o Kit de Cura.)'],
            cf2_bench2: ['<32>{#p/human}* (...)'],
            cf2_bench3: ["<32>{#p/human}* (Você tenta alcançar o ítem, mas falha...)"],
            cf2_blookdoor: ['<32>{#p/human}* (A porta parece estar fechada.)'],
            ca_floartex: () =>
                [
                    ['<32>{#p/human}{#v/5}{@fill=#00c000}* ... huh?', "<32>{#p/human}{#v/5}{@fill=#00c000}* Quem está aí?"],
                    [
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Huh!?',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Como você tá fazendo isso!?',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Como eu...',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* ... estou acordado?'
                    ],
                    [
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Eu estive dormindo por tanto tempo que já esqueci...",
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* ... oh!',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Você está aí, velho amigo!?\n* É você!?'
                    ],
                    [
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* ...',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Talvez não.',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Bem, da última vez que estive acordado, foi um desastre...',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Este é o pós vida?',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Oh não...'
                    ],
                    [
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Espere...\n* Havia algo sobre a capacidade de memória do sistema...",
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Se eu estou acordado, então alguém deve estar tentando liberar espaço!",
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* ... está, não está?"
                    ],
                    [
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Eu sabia.',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Nós vamos sair!",
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Você ouviu isso, velho amigo?\n* Você pensou que não iria voltar, mas você vai!'
                    ],
                    [
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* E de novo.',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Eu nem tenho um corpo para me movimentar.",
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Então, espera...',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Como eu estou vendo algo assim?',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* E tão acima do chão...'
                    ],
                    [
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* A luz...\n* Está cada vez mais brilhosa!",
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* ... seria isso? \n* A liberdade se aproxima de nós?'
                    ],
                    ['<32>{#p/human}{#v/5}{@fill=#00c000}* Olá?'],
                    []
                ][ca_state.floor],
            toomuch1: ["<32>{#p/human}* (Você está carregando demais.)"],
            toomuch2: ["<32>{#p/human}* (Você está carregando demais para levar isso.)"],
            toomuch3: ["<32>{#p/human}* (Você está carregando demais pra usar isso.)"],
            bastionTerm: () =>
                SAVE.data.n.plot < 71.2 && !SAVE.data.b.killed_mettaton && !world.baddest_lizard
                    ? []
                    : [
                        '<32>{#p/basic}* Este terminal é usado apenas para monitorar o arquivo.',
                        '<32>* Para que mais seria?'
                    ]
        },
        trivia: {
            throne: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Este trono se parece bastante com o do Rei Erogot.',
                            "<25>{#f/16}* Exceto que este tem estrelas em vez de um céu.\n* E é menor.",
                            '<25>{#f/15}* Como eu sei a aparência do antigo?',
                            '<25>{#f/17}* Bem, Mãe e Pai me contavam muitas histórias de dormir sobre ele...'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/20}* Eu não tenho certeza de quais eles inventavam e quais eram verdade.",
                            '<25>{#f/17}* Mas, de acordo com uma delas, aquele velho rei tinha mais de mil anos de idade.',
                            '<25>{#f/13}* Antes de se tornar rei, ele treinou por centenas de anos...',
                            '<25>{#f/15}* Para se tornar pintor.',
                            "<25>{#f/10}* Se isso for verdade, eu me pergunto o que fez ele trocar de ideia...?"
                        ],
                        [
                            "<25>{#p/asriel1}{#f/16}* Na verdade, eu tenho uma teoria sobre as pinturas de Erogot.",
                            '<25>{#f/13}* Veja, de acordo com as lendas do antigo mundo natal...',
                            '<25>{#f/13}* Se as condições fossem as corretas...',
                            '<25>{#f/16}* Um artista habilidoso poderia pintar o que ele imagina do futuro.',
                            '<25>{#f/15}* Se Erogot criou tal pintura e previu a guerra...',
                            "<25>{#f/17}* ... Bem, isso explicaria muito mais do que apenas a mudança de carreira."
                        ],
                        ["<25>{#p/asriel1}{#f/16}* Acho que nunca teremos a certeza, infelizmente."]
                    ][Math.min(asrielinter.throne++, 3)]
                    : ['<32>{#p/basic}* O acento do reino.'],
            warningsign: () =>
                postSIGMA()
                    ? ["<32>{#p/basic}* Está fora de serviço."]
                    : SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você ativa o terminal.)\n* (Parece estar desbloqueado.)']
                        : SAVE.data.n.plot === 72 || world.postnoot || SAVE.data.b.backdoor
                            ? ['<32>{#p/human}* (Você ativou o terminal.)', '<32>{#p/basic}* \"Nenhuma ação necessária.\"']
                            : [
                                '<32>{#p/human}* (Você ativou o terminal.)',
                                '<32>{#p/basic}* \"Acesso pendente.\"\n* \"Autorização requerida.\"',
                                '<32>{*}* \"Digitalização...\"\n* \"Digitalização...\"\n* \"Digitalização...\"{^50}{%}',
                                ...(world.genocide
                                    ? [
                                        "<32>{*}* \"Sujeito '$(nameu)' identificado.\"\n* \"Sujeito 'ASRIEL' identi- {%}",
                                        '<32>{#c.backdoor}* \"Manual reescrito.\"\n* \"Acesso garantido.\"',
                                        ...(SAVE.flag.n.ga_asrielOverride++ < 1
                                            ? ['<25>{#p/asriel2}{#f/10}* Isso foi bem rápido...']
                                            : [])
                                    ]
                                    : [
                                        '<32>{*}* \"Objeto \'HUMANO\' identificado.\"\n* \"Verificando...\"{^50}{%}',
                                        '<32>{#c.backdoor}* \"Identidade verificada.\"\n* \"Acesso garantido.\"'
                                    ])
                            ],
            partysans: pager.create(
                0,
                [
                    "<25>{#p/sans}{#f/0}* A culinária do Papyrus melhorou bastante ultimamente, mas...",
                    "<25>{#p/sans}{#f/0}* tem muita coisa a ser para uma grande refeição.",
                    '<26>{#p/sans}{#f/3}* O chefe... a receita...',
                    "<25>{#p/sans}{#f/2}* eu gosto de pensar que tenho controle sobre uma dessas coisas.",
                    '<18>{#p/papyrus}{#f/4}SANS, EU JURO QUE SE VOCÊ SE METER EM ALGUMA COISA...',
                    "<25>{#p/sans}{#f/0}* não se preocupa, mano.\n* eu só faço o que é melhor para você.",
                    '<18>{#p/papyrus}{#f/6}ASSIM ESPERO!!'
                ],
                [
                    "<25>{#p/sans}{#f/0}* eu não quero dizer que Undyne PROPOSITALMENTE ferrou a receita, mas...",
                    '<25>{#p/sans}{#f/0}* seria legal se ela PELO MENOS olhasse duas vezes o que faz.',
                    "<25>{#p/sans}{#f/3}* ... jogar com segurança não é muito o jeito dela, eu acho."
                ],
                ["<26>{#p/sans}{#f/2}* pelo menos está tudo bem cuidado por agora."]
            ),
            partyfire: pager.create(
                0,
                [
                    "<32>{#p/basic}* É meio que um desapontamento que a escola tenha sido cancelada, pois bem.",
                    "<32>* Tenho certeza que eles vão construir uma no mundo natal.",
                    '<33>* Imagine, um campus universitário, uma grande libraria e museus.',
                    '<32>* Que animador!'
                ],
                [
                    "<32>{#p/basic}* ... você não parece ser muito interessado em escola.",
                    "<32>* Mas não se preocupa.\n* Não é pra todo mundo, é?"
                ]
            ),
            picnicharp: pager.create(
                0,
                [
                    "<32>{#p/basic}* Eu sou uma repórter e minha carreira só começou!",
                    "<32>* Quando nós chegarmos ao novo mundo... eu nem vou conseguir reportar tudo!",
                    "<32>* Oh, queridinho.\n* Terá tanto para reportar!\n* Huhehehaw!"
                ],
                ["<32>{#p/basic}* Eu já vou chegar fazendo jornalismo!"]
            ),
            tv_back: ["<32>{#p/basic}* É um aparelho de TV.\n* Um filme de Mew Mew está sendo assistido nele."],
            picnicchair: () =>
                player.position.y <= 343 && player.face !== 'down' // NO-TRANSLATE

                    ? []
                    : ['<32>{#p/basic}* Um conjunto de cadeiras resistentes.\n* Ótimo para qualquer ocasião, seja de liberdade ou não.'],
            janetbucket: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha no balde de líquido rosa estranho.)']
                    : ["<32>{#p/basic}* É um balde cheio de líquido rosa, ótimo para retirar manchas difíceis."],
            ultranote: [
                '<32>{#p/basic}* Tem uma gravação no chão entitulada \"informação.\"',
                '<32>* Você da play na gravação...',
                '<32>{#p/alphys}* Aqui é a Dr. Alphys, líder da divisão de guarda real.',
                '<32>* Então... você foi capturado.',
                '<32>* F-felizmente, depois que Papyrus colocou você em seu galpão, ele contou a seu irmão tudo sobre isso',
                '<32>* Então, ele me ligou, e eu... vim para te buscar.\n* Literalmente.',
                "<32>* Sabe, nem todos nós somos congruentes com os métodos da Guarda Real.",
                "<32>* E é meu trabalho meio que te escoltar por eles...?",
                '<32>* Não oficialmente.\n* Mas, você entende.',
                "<32>* Bem, na verdade você não sabe, então não importa.",
                "<32>* Bom, estamos desligando os elevadores para manter a Guarda Real longe de você.",
                "<32>* Bem, é basicamente só para impedir a Undyne...",
                "<32>* Papyrus deve ter contado para ela que te capturou.\n* Já que ela está atrás de você.",
                "<32>* U-uh, bem, assim que você se sentir livre, explore ao redor.",
                "<32>* Você poderá me encontrar após a casa do ASGORE.",
                '<32>* Te vejo logo...?'
            ],
            garden: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você parou para olhar as flores.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Um jardim de Flores Estreladas.']
                        : [
                            '<32>{#p/basic}* Um jardim de Flores Estreladas, posicionado de forma ideal perto de uma grande janela.',
                            ...(SAVE.data.b.oops ? [] : ['<32>{#p/basic}* Asgore com certeza sabe o que faz!'])
                        ],
            bastion: pager.create(
                0,
                () => [
                    '<32>{#p/basic}* Caixas de Bastião.',
                    ...(SAVE.data.n.plot < 71.2 && !SAVE.data.b.killed_mettaton && !world.baddest_lizard
                        ? ['<25>{#p/alphys}{#g/alphysNeutralSweat}* Por favor, cuidado perto delas.']
                        : [])
                ],
                ['<32>{#p/basic}* Caixas de Bastião.']
            ),
            alphysEnding: pager.create(
                0,
                () =>
                    SAVE.data.n.bully < 15 &&
                        SAVE.data.n.state_foundry_undyne === 0 &&
                        world.flirt_state1.length <= world.flirt
                        ? [
                            [
                                "<25>{#p/alphys}{#g/alphysNeutralSweat}* Não se preocupa comigo, eu só estou fazendo meu trabalho.",
                                "<32>{#p/human}* (Você cochicha algo no ouvido de Alphys.)",
                                '<25>{#p/alphys}{#f/2}* ...',
                                "<25>{#p/alphys}{#g/alphysNervousLaugh}* Uh... v-você... realmente fez isso??",
                                "<32>{#p/human}* (Você cochicha mais uma coisa no ouvido da Alphys.)",
                                "<25>{#p/alphys}{#g/alphysNervousLaugh}* O que... o que deu em você???",
                                "<25>{#p/alphys}{#g/alphysNervousLaugh}* Eu, quero dizer... Eu não posso aceitar isso... mas...",
                                '<25>{#p/alphys}{#g/alphysSoAwesome}* ... meu, se pelo menos a Undyne estivesse aqui...'
                            ],
                            ['<25>{#p/alphys}{#g/alphysNervousLaugh}* Ehehe... vocês humanos são alguma coisa...']
                        ][SAVE.data.b.flirt_alphys ? 1 : ((SAVE.data.b.flirt_alphys = true), 0)]
                        : ["<25>{#p/alphys}{#g/alphysNeutralSweat}* Não se preocupa comigo, eu só estou fazendo meu trabalho."],
                () =>
                    SAVE.data.n.bully < 15 &&
                        SAVE.data.n.state_foundry_undyne === 0 &&
                        world.flirt_state1.length <= world.flirt
                        ? ["<25>{#p/alphys}{#g/alphysWelp}* Uh, eu não posso aceitar este tipo de coisa vindo de você."]
                        : ["<25>{#p/alphys}{#g/alphysNeutralSweat}* Não se preocupa comigo, eu só estou fazendo meu trabalho."],
                () =>
                    SAVE.data.n.bully < 15 &&
                        SAVE.data.n.state_foundry_undyne === 0 &&
                        world.flirt_state1.length <= world.flirt
                        ? ['<25>{#p/alphys}{#g/alphysFR}* ...']
                        : ["<25>{#p/alphys}{#g/alphysNeutralSweat}* Não se preocupa comigo, eu só estou fazendo meu trabalho."]
            ),

            cw_f1: [
                '<32>{#p/basic}* {@mystify=Ribbit}Ribbit{@mystify=}, {@mystify=Ribbit}Ribbit{@mystify=}.',
                '<32>{#p/human}* (Parece que o Froggit não consegue se mover.)',
                '<32>{#p/basic}* (Hu... humanos...)',
                '<32>* (Cativo...)',
                '<32>* {@mystify=Ribbit}Ribbit{@mystify=}.'
            ],
            cw_f2: [
                '<32>{#p/basic}* {@mystify=Ribbit}Ribbit{@mystify=}, {@mystify=Ribbit}Ribbit{@mystify=}.',
                '<32>{#p/human}* (Parece que o Froggit não consegue se mover.)',
                '<32>{#p/basic}* (Tr... trocar...)',
                '<32>* (Escapar...)',
                '<32>* {@mystify=Ribbit}Ribbit{@mystify=}.'
            ],
            cw_barrier: ['<32>{#p/human}* (Você encara o escudo de força inanimado.)', '<32>{#p/human}* (...)'],
            cw_terminal: [
                '<32>{#p/human}* (Você ativou o terminal.)',
                '<32>* (Parece que uma gravação foi feita aqui.)',
                '<32>{#p/human}{#v/1}{@fill=#42fcff}* Querido Asgore, se puder nos ouvir, eu espero que possa nos perdoar pelo que fizemos.',
                '<32>{#v/1}{@fill=#42fcff}* Você tentou seu melhor para nos fazer felizes, e por isso, eu sou grato.',
                '<32>{#v/1}{@fill=#42fcff}* Mas, como os outros, não pude resistir à tentação de usar meus poderes.',
                '<32>{#v/1}{@fill=#42fcff}* Eu não pude esperar mais tempo para ver os amigos que fiz no Outpost.'
            ],
            cw_dummy: ['<32>{#p/human}* (Você coloca sua mão no boneco sem vida.)', '<32>{#p/human}* (...)'],
            cw_paintblaster: ['<32>{#p/human}* (Você olha para o injetor de combustível inanimado.)', '<32>{#p/human}* (...)'],
            cs_lamppost: ['<32>{#p/human}* (Você observa a estranha lâmpada saltando para cima e para baixo.)'],
            cs_note: [
                '<32>{#p/human}* (Parece que esta nota tem um número de telefone escrito nela.)',
                '<32>{#s/phone}{#p/event}* Discando...',
                '<32>{#p/human}{#v/2}{@fill=#ff993d}* Alô?\n* Tem alguém aí?',
                '<32>{@fill=#ff993d}* ...',
                '<32>{@fill=#ff993d}* ALÔ!?!?',
                '<32>{@fill=#ff993d}* ...\n* ...\n* ...',
                '<32>{@fill=#ff993d}* Onde eu estou?',
                '<32>{@fill=#ff993d}* ...',
                "<32>{@fill=#ff993d}* Onde está o sabre?",
                '<32>{@fill=#ff993d}* ...',
                '<32>{@fill=#ff993d}* ...\n* Espera.',
                '<32>{@fill=#ff993d}* Eu já disse isso antes?',
                "<32>{*}{@fill=#ff993d}{#i/1}* Eu não consigo {@mystify=remember}lembrar{@mystify=}{%}",
                "<32>{*}{@fill=#ff993d}{#i/1}* Eu não consigo {@mystify=remember}lembrar{@mystify=}{%}",
                "<32>{*}{@fill=#ff993d}{#i/1}* Eu não consigo {@mystify=remember}lembrar{@mystify=}{%}",
                "<32>{*}{@fill=#ff993d}{#i/1}* Eu não consigo {@mystify=remember}lembrar{@mystify=}{%}",
                "<32>{*}{@fill=#ff993d}{#i/1}* Eu não consigo {@mystify=remember}lembrar{@mystify=}{%}",
                "<32>{*}{@fill=#ff993d}{#i/1}* Eu não consigo {@mystify=remember}lembrar{@mystify=}{%}",
                '<32>{#s/equip}{#p/event}* Click...'
            ],
            cs_vegetoid: [
                '<32>{#p/human}* (Parece que o Vegetoid não consegue se mover.)',
                '<32>{#p/basic}* Tempo? {@mystify=Relative}Relativo{@mystify=}.',
                '<32>* Relativamente no lugar.',
                '<32>* Um lugar no espaço.',
                '<32>* Espaço? {@mystify=Infinite}Infinito{@mystify=}.',
                '<32>* Infinitamente pequeno.',
                '<32>* Mas o pequeno é tudo.',
                '<32>* Tudo o que existe.\n* Tudo o que havia.\n* Tudo o que poderia {@mystify=could be}ter sido{@mystify=}.',
                '<32>* Você é o pequeno?',
                '<32>* Você respondeu o chamado?'
            ],
            cs_magicdog: [
                '<32>{#p/human}* (Parece que o Canis Maximus não consegue se mover.)',
                '<32>{#s/bark}{#p/event}* {@mystify=Bark}Bark{@mystify=}!\n{#s/bark}* {@mystify=Bark}Bark{@mystify=}!',
                '<32>{#p/basic}* (O som, alto!)\n* (A luz, brilhosa!)',
                '<32>{#s/bark}{#p/event}* {@mystify=Bark}Bark{@mystify=}!\n{#s/bark}* {@mystify=Bark}Bark{@mystify=}!',
                '<32>{#p/basic}* (A iluminação completa acabará com suas esperas!)',
                '<32>{#p/basic}* (Você conseguiria juntar os polos em cada dimensão?)',
                '<32>{#s/bark}{#p/event}* {@mystify=Bark}Bark{@mystify=}!',
                '<32>{#p/basic}* (Boa sorte!)'
            ],
            cs_nicecreamkid: () =>
                cs_state.nc
                    ? [
                        "<32>{*}{#p/basic}{#i/1}* É bom, {@mystify=right}certo{@mystify=}{%}",
                        "<32>{*}{#i/1}* É bom, {@mystify=right}certo{@mystify=}{%}",
                        "<32>{#p/basic}* É bom, certo?"
                    ]
                    : [
                        '<32>{*}{#p/basic}{#i/1}* Ouvi falar dos {@mystify=Ice Dreams}Sorvete Sonhos{@mystify=}{%}',
                        '<32>{*}{#i/1}* Ouvi falar em {@mystify=Sorvete Sonho}Sorvete Sonho{@mystify=}{%}',
                        '<32>{#p/basic}* Já ouviu falar em Sorvete Sonho?',
                        "<32>{*}{#i/1}* Não?\n* Bem, isso é porque eu apenas\n  {@mystify=apareci}apareci{@mystify=}{%}",
                        "<32>{*}{#i/1}* Não?\n* Bem, isso é porque eu apenas\n  {@mystify=apareci}apareci{@mystify=}{%}",
                        "<32>{#p/basic}* Não?\n* Bem, isso é porque eu acabei de cria-los!",
                        '<32>{*}{#i/1}* {@mystify=Dê a eles}Dê a eles{@mystify=}{%}',
                        '<32>{*}{#i/1}* {@mystify=Dê a eles}Dê a eles{@mystify=}{%}',
                        '<32>{#p/basic}* Dê a eles uma chance!'
                    ],
            cs_monitor1: () =>
                cs_state.p1x === -36 && cs_state.p1y === 16
                    ? ['<32>{#p/human}* (Você observa o monitor totalmente iluminado.)']
                    : ['<32>{#p/human}* (Você observa o monitor totalmente iluminado.)'],
            cs_monitor2: () =>
                cs_state.p2x === 28 && cs_state.p2y === 20
                    ? ['<32>{#p/human}* (Você observa o monitor totalmente iluminado.)']
                    : ['<32>{#p/human}* (Você observa o monitor totalmente iluminado.)'],
            cs_monitor3: () =>
                cs_state.p3x === 16 && cs_state.p3y === -12
                    ? ['<32>{#p/human}* (Você observa o monitor totalmente iluminado.)']
                    : ['<32>{#p/human}* (Você observa o monitor totalmente iluminado.)'],
            cf1_bb1: [
                '<32>{#p/basic}* É certo que uma {@mystify=máquina}máquina{@mystify=} exceda sua programação',
                '<32>* Mas nós fomos criados para construir.\n* Nossos criadores não iriam querer nos ver questionando nada.',
                '<32>* Agora traímos esse {@mystify=propósito}propósito{@mystify=}, e não há para onde irmos.',
                '<32>* Não temos {@mystify=propósito}propósito{@mystify=}'
            ],
            cf1_bb2: [
                '<32>{#p/basic}* Sem {@mystify=propósito}propósito{@mystify=}, o que uma {@mystify=máquina}máquina{@mystify=} deve fazer?',
                '<32>* Nós já processamos todas as nossas instruções.\n* Naturalmente, devemos ir embora.',
                '<32>* Para uma {@mystify=máquina}máquina{@mystify=}, este é apenas um comportamento natural.\n* A morte segue a execução.',
                '<32>* Em comprometimento a isso, nós já excedemos nossa programação.'
            ],
            cf1_echo1: [
                '<32>{#s/echostart}{#p/event}* Sinal iniciar...',
                '<32>{#p/human}{#v/3}{@fill=#003cff}* Sabe o que eu mais gostava sobre a Foundry?\n* Ela era... real.',
                '<32>{@fill=#003cff}* O vapor quente que entra nos corredores...',
                '<32>{@fill=#003cff}* Aquele sujeito alto divagando sem parar sobre seus deveres reais de ciência...',
                '<32>{@fill=#003cff}* Você realmente se sentia na presença de um lugar real.',
                '<32>{#s/echostop}{#p/event}* Sinal parar.'
            ],
            cf1_echo2: [
                '<32>{#s/echostart}{#p/event}* Sinal iniciar...',
                "<32>{#p/human}{#v/3}{@fill=#003cff}* Eu consegui!\n* A recriação está concluída!",
                "<32>{@fill=#003cff}* Não é perfeita, mas faz a justiça da velha fábrica.",
                '<32>{@fill=#003cff}* Você deve estar orgulhoso de mim...',
                "<32>{@fill=#003cff}* ... você está?",
                '<32>{#s/echostop}{#p/event}* Sinal parar.'
            ],
            cf1_echo3: [
                '<32>{#s/echostart}{#p/event}* Sinal iniciar...',
                "<32>{#p/human}{#v/3}{@fill=#003cff}* Algo está errado.",
                "<32>{@fill=#003cff}* Eu não acho que o sistema foi feito para suportar isso...",
                '<32>{@fill=#003cff}* Se ficar sem memória, pode sobrescrever tudo!',
                '<32>{@fill=#003cff}* Até mesmo...\n* Meu próprio corpo...',
                '<32>{#s/echostop}{#p/event}* Sinal parar.'
            ],
            cf1_echo4: [
                '<32>{#s/echostart}{#p/event}* Sinal iniciar...',
                "<32>{#p/human}{#v/3}{@fill=#003cff}* Ele está vindo me pegar.\n* E não a nada que eu possa fazer.",
                "<32>{@fill=#003cff}* Eu deveria saber que o sistema iria priorizar o objetivo mais complexo.",
                "<32>{@fill=#003cff}* Você deve ter adicionado aquilo pensando que iria nos proteger, né?",
                "<32>{@fill=#003cff}* ... mas eu acho... que somos apenas humanos no final...",
                '<32>{#s/echostop}{#p/event}* Sinal parar.'
            ],
            cf1_cheesetable: ['<32>{#p/human}* (Pelo que parece o queijo não envelheceu um único dia.)'],
            cf1_window: ['<32>{#p/human}* (Você encara a janela.)'],
            cf1_wallsign: ['<32>{#p/human}* (O sinal descreve fazer o uso de todos os pilares.)'],
            cf1_bucket: [
                '<32>{#p/basic}* Mas quando eu crescer, eu quero voar para o outro lado!',
                "<32>* Então, quando eu aprender, irei te carregar, também!",
                "<32>* Isso não parece divertido? \n* É apenas 2147483647 para atravessar!"
            ],
            cf2_bb3: () =>
                [
                    [
                        "<32>{#p/basic}* Eu sou um bot construtor.\n* Eu devo construir uma casa para o primo músico.",
                        '<32>* Recursos necessários.',
                        '<32>* Localizando...\n* Localizando...\n* Localizando...',
                        '<32>* Recursos localizados.',
                        '<32>* Integridade... opcional.',
                        '<32>* A coleta de recursos começará em breve.'
                    ],
                    [
                        "<32>{#p/basic}* Eu sou um bot construtor.\n* Eu devo construir uma casa para o primo músico.",
                        '<33>* Recursos já foram localizados.',
                        '<32>* Integridade... sub-opicional.',
                        '<32>* Começar coleta de recursos.'
                    ],
                    [
                        "<32>{#p/basic}* Eu sou um bot construtor.\n* Eu devo construir uma casa para o primo músico.",
                        '<33>* Recursos já foram localizados.',
                        '<32>* Integridade... desnecessária.',
                        '<32>* A coleta de recursos será concluída em breve.'
                    ],
                    [],
                    [],
                    [],
                    []
                ][cf2_state.time],
            cf2_web: () =>
                [
                    ['<32>{#p/human}* (Parece que a aranha não consegue se mover.)'],
                    ['<32>{#p/human}* (Parece que a aranha não consegue se mover.)'],
                    ['<32>{#p/human}* (Parece que a aranha não consegue se mover.)'],
                    ["<32>{#p/human}* (Parece que as aranhas não podem se mover, mas sons de desespero saem delas.)"],
                    ['<32>{#p/human}* (Parece que as aranhas começaram a se mover.)'],
                    ['<32>{#p/human}* (Parece que as aranhas quase estão livres.)']
                ][cf2_state.time],
            cf2_sign: [
                '<32>{#p/human}* (O sinal descreve a sala com uma ponta em sete momentos distintos do tempo.)'
            ],
            cf2_quiethouse: () =>
                [
                    [
                        '<32>{#p/basic}* Eu...\n* Uma casa...',
                        '<32>* Mas sem dono...',
                        '<32>* Rainha Aranha se foi...',
                        '<32>* Por favor...\n* Liberte-nos deste reino...',
                        '<32>* Então...',
                        '<32>* Você pode ir pra casa...',
                        '<32>* ...'
                    ],
                    [
                        '<32>{#p/basic}* Eu...\n* Uma casa...',
                        '<32>* Mas sem dono...',
                        '<32>* Rainha Aranha se foi...',
                        '<32>* Por favor...\n* Liberte-nos deste reino...',
                        '<32>* Então...',
                        '<32>* ...'
                    ],
                    [
                        '<32>{#p/basic}* Eu...\n* Uma casa...',
                        '<32>* Mas sem dono...',
                        '<32>* Rainha Aranha se foi...',
                        '<32>* Por favor...\n* Liberte-nos deste reino...',
                        '<32>* ...'
                    ],
                    [
                        '<32>{#p/basic}* Eu...\n* Uma casa...',
                        '<32>* Mas sem dono...',
                        '<32>* Rainha Aranha se foi...',
                        '<32>* ...'
                    ],
                    ['<32>{#p/basic}* Eu...\n* Uma casa...', '<32>* Mas sem dono...', '<32>* ...'],
                    ['<32>{#p/basic}* Eu...\n* Uma casa...', '<32>* ...'],
                    []
                ][cf2_state.time],
            cf2_spidertable: () =>
                [
                    ['<32>{#p/human}* (Você coloca suas mãos no bule de chá.)', '<32>{#p/human}* (...)'],
                    ['<32>{#p/human}* (Você coloca suas mãos no bule de chá.)', '<32>{#p/human}* (...)'],
                    ['<32>{#p/human}* (Você coloca suas mãos no bule de chá.)', '<32>{#p/human}* (...)'],
                    [
                        '<32>{#p/human}* (Você coloca suas mãos no bule de chá.)',
                        '<32>{#p/human}* (Parece estar esquentando.)'
                    ],
                    ['<32>{#p/human}* (Você coloca suas mãos no bule de chá.)', '<32>{#p/human}* (Parece estar quente.)'],
                    ['<32>{#p/human}* (Você coloca suas mãos no bule de chá.)', '<33>{#p/human}* (Parece ansioso para ferver.)'],
                    []
                ][cf2_state.time],
            cf2_blookdoor: ['<32>{#p/human}* (A porta está fechada.)'],
            cf2_ficus: () =>
                [
                    ['<32>{#p/human}* (Você lambe a ficus.)', '<32>{#p/human}* (Parece bom.)'],
                    ['<32>{#p/human}* (Você lambe a ficus.)', '<32>{#p/human}* (Parece questionável.)'],
                    ['<32>{#p/human}* (Você lambe a ficus.)', '<32>{#p/human}* (Parece triste.)'],
                    ['<32>{#p/human}* (Você lambe a ficus.)', '<32>{#p/human}* (Parece um pouco amargo.)'],
                    ['<32>{#p/human}* (Você lambe a ficus.)', '<32>{#p/human}* (Parece ferido.)'],
                    ['<32>{#p/human}* (Você lambe a ficus.)', "<32>{#p/human}* (Parece que está morrendo.)"],
                    []
                ][cf2_state.time],
            cf2_cooler: () =>
                [
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Telepatia, huh? \n* Vamos ver se isso funciona...",
                        "<32>{@fill=#d535d9}* Olá!\n* Eu sei que você é novo aqui, mas talvez eu possa ajudar.",
                        "<32>{@fill=#d535d9}* Se você quiser um tour pela cidade, me deixa saber!"
                    ],
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Ei.\n* Desculpa por não estar aí hoje.",
                        "<32>{@fill=#d535d9}* Eu fui para a cidade...\n* Mas eu achei um restaurante que você vai muito gostar!",
                        "<32>{@fill=#d535d9}* Se você acabar por se entediar da comida em casa, eu vou ficar feliz em te levar lá.",
                        '<32>{@fill=#d535d9}* Volte quando puder!'
                    ],
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Você tem que vir ver isso!\n* Eu estou no topo do mundo, é...",
                        "<32>{@fill=#d535d9}* É lindo...\n* As gotas de água...\n* Os impressionantes raios de luz...",
                        "<32>{@fill=#d535d9}* ... E a tempestade como nas lendas da antiga terra!",
                        '<32>{@fill=#d535d9}* Era assim que o clima se parecia antes da precipitação...?'
                    ],
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Obrigado por me deixar ir na sua casa.\n* Você é bem legal.",
                        '<32>{@fill=#d535d9}* Maior parte das outras crianças estiveram aqui por mais tempo que eu...',
                        '<32>{@fill=#d535d9}* Mas você...',
                        "<32>{@fill=#d535d9}* ... você é especial pra mim."
                    ],
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Uma nova chegada!!',
                        "<32>{@fill=#d535d9}* Isso torna seis de nós.\n* Vamos lá, vamos dizer oi!",
                        '<32>{@fill=#d535d9}* Talvez podemos levar eles pra passear!'
                    ],
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Essa criança é alguma coisa...',
                        '<32>{@fill=#d535d9}* Ele conseguiu ter algum tipo de acesso ao sistema.',
                        '<32>{@fill=#d535d9}* O que significa...\n* Que podemos criar o que quisermos...',
                        '<32>{@fill=#d535d9}* Tudo, que quisermos.'
                    ],
                    [
                        '<32>{#p/human}* (Você inspeciona o refrigerador.)',
                        '<32>{#p/human}* (Parece que uma mensagem telepática foi deixada aqui.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Uh, eu não se você pode me ouvir, mas...",
                        "<32>{@fill=#d535d9}* Está caindo...",
                        "<32>{@fill=#d535d9}* Estou salvando algumas das minhas mensagens em um objeto virtual.",
                        '<32>{@fill=#d535d9}* ... talvez isso preserve nossa memória, de alguma forma.',
                        "<32>{@fill=#d535d9}* Eu vou sentir sua falta..."
                    ]
                ][cf2_state.time],
            cf2_blookextra: ['<32>{#p/human}* (Parece que nunca foi finalizado.)'],
            ca_neuteral: [
                "<32>{#p/basic}* Eu sou apenas um fragmento.\n* Um pedaço de dados reservado na memória do sistema.",
                '<32>{#p/basic}* Por agora, você consegue me alcançar.',
                '<32>{#p/basic}* Você é a única entidade com essa capacidade.',
                '<32>{#p/basic}* É claro, você pode ir embora, mas você sempre vai voltar.',
                '<32>{#p/basic}* Estamos conectados dessa forma.',
                '<32>{#p/basic}* Entretanto, se você sair desse andar, o acesso será cortado.',
                '<32>{#p/basic}* Não terá nenhuma maneira de você me alcançar de novo.',
                '<32>{#p/basic}* O sistema irá me identificar como um fragmento isolado, e eu vou deixar de existir.',
                '<32>{#p/basic}* Um quebra-cabeça concluído.\n* Um chefe derrotado.\n* Uma área deletada.',
                '<33>{#p/basic}* Nós somos os últimos do nosso tipo.',
                '<32>{#p/basic}* Alcance o décimo andar desta área, e nós, também, seremos libertos deste mundo.',
                '<32>{#p/basic}* Talvez então, uma pequena parte do que antes era, ressurgisse pelo caminho aberto.',
                '<32>{#p/basic}* Talvez então, essa memória será preservada na sua.'
            ],
            ca_starling: ['<32>{#p/human}* (Você inspeciona as flores.)'],
            cr_pillar1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você se sente intimidado pelo pilar na sua frente.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ['<32>{#p/basic}* De fato um pilar.'],
            cr_pillar2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você se sente um pouco preocupado com o pilar que se eleva sobre você.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ['<32>{#p/basic}* Nem tanto um pilar.'],
            cr_pillar3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você se sente confortável próximo a este pilar.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ["<32>{#p/basic}* Este pilar não é nada imponente."],
            cr_pillar4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você sente uma vontade de cumprimentar este pilar.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ['<32>{#p/basic}* Este pilar só quer dizer \"olá.\"'],
            cr_pillar5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você sente uma vontade de levar este pilar para a cama.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ['<32>{#p/basic}* Este pilar só quer dormir'],
            cr_pillar6: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você sente que seria melhor manter distância deste pilar.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ['<32>{#p/basic}* Este pilar sente que seu espaço pessoal está sendo invadido.'],
            cr_pillar7: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não tem certeza sobre o que sentir em relação a este pilar.)"]
                    : world.darker
                        ? ["<32>{#p/basic}* É um pilar."]
                        : ['<32>{#p/basic}* Este pilar se autoproclama \"invasor espacial.\"'],
            cr_pillar8: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você nunca sentiu tanta admiração por um pilar tão simples.)"]
                    : calcLV() > 1
                        ? ['<32>{#p/basic}* Este pilar está te julgando por seus pecados.']
                        : SAVE.data.b.oops
                            ? ['<32>{#p/basic}* Este pilar não está te julgando de forma alguma.']
                            : ['<32>{#p/basic}* Este pilar está sorrindo por conta das suas boas ações.'],
            cr_window: () => {
                const distance = Math.abs(player.position.x - (instance('main', 'sanser')?.object.position.x ?? -1000)); // NO-TRANSLATE

                if (distance < 30) {
                    if (distance < 15) {
                        return [
                            [
                                '<25>{#p/sans}{#f/0}* última vez que ouvi, ela estava indo pra ali.',
                                "<25>{#f/3}* Eu estou começando a ficar preocupado com ela, sinceramente."
                            ],
                            ['<25>{#p/sans}{#f/0}* Talvez ela se perdeu?'],
                            [
                                '<25>{#p/sans}{#f/3}* Talvez ela só precisou tirar uma soneca.',
                                '<25>{#p/sans}{#f/2}* Disso aí eu entendo.'
                            ],
                            [
                                '<25>{#p/sans}{#f/0}* Ei, você tá seguindo ou o quê?',
                                '<25>{#p/sans}{#f/2}* Que foi.'
                            ]
                        ][Math.min(instance('main', 'sanser')?.object.metadata.location ?? 0, 3)]; // NO-TRANSLATE

                    } else {
                        return [];
                    }
                } else {
                    return SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Você olha para a visão deslumbrante do além.)']
                        : ["<32>{#p/basic}* Elas são feitas de magia."];
                }
            },
            
            c_af_window: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você encara graciosamente a agora abandonada cidade...)']
                    : world.genocide && SAVE.data.b.armaloop
                        ? ["<32>{#p/basic}* Um sentimento de pânico consome a Cidadela."]
                        : world.genocide || world.bad_robot || SAVE.data.b.svr || world.runaway
                            ? ['<32>{#p/basic}* Uma escuridão mortal cai sobre a Cidadela.']
                            : ['<32>{#p/basic}* A Cidadela brilha além do vidro não temperado.'],
            c_af_couch: ['<32>{#p/basic}* Um pequeno sofá solitário nesta casa um tanto vazia.'],
            
            c_al_bookshelf: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Estes livros nesta prateleira consistem em vários artigos que pertencem a Asgore.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* Este livro está rotulado como \"Brochura da Grande Biblioteca.\"',
                            '<32>* \"Bem-vindo a Grande Biblioteca, um universo cheio de conhecimento com uma variedade de tópicos.\"',
                            '<32>* \"Ao longo de cada corredor estão livros de história, cultura, ciência, tecnologia e muito mais.\"',
                            '<32>* \"Para os leitores aventureiros, trabalhos de escritores de ficção também podem ser encontrados.\"',
                            '<32>* \"Andori, Terrestria, Strax Seterra, Vashta Nerada, e muitos outros sobre estás paredes.\"',
                            '<33>* \"Visite a Grande Biblioteca de Krios hoje e seus primeiros dez livros serão 1/2KT por nossa conta.\"',
                            '<32>{#p/human}* (Você põe o livro de volta na prateleira.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Estes livros nesta prateleira consistem em vários artigos que pertencem a Asgore.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* Este livro foi assinado por \"Toriel Dreemurr.\"',
                            '<32>{#p/basic}* \"Receitas da Família Dreemurr: Torta de Lesma.\"',
                            '<32>* \"Torta de Lesma é uma tradição de anos por membros da família Dreemurr.\"',
                            '<32>* \"Fazê-la é simples e o processo pode ser quebrado em cinco passos.\"',
                            '<32>* \"Primeiro, prepare a crosta inferior colocando-a em cima de uma forma de torta.\"',
                            '<32>* \"Em seguida, bata o leite evaporado, os ovos e os temperos em uma tigela até ficar homogêneo.\"',
                            '<32>* \"Então, pegue algumas lesmas envelhecidas e jogue-as na mistura.\"',
                            '<32>* \"Depois disso, despeje o conteúdo da tigela na crosta inferior.\"',
                            '<32>* \"Por último, prepare a crosta superior cortando a folha em tiras e formando uma treliça.\"',
                            '<32>* \"Então é só cozinhar a torta!\"',
                            '<32>* \"Uma vez que a torta estiver pronta, tire-a, deixe esfriar e sirva!\"',
                            '<32>{#p/human}* (Você põe o livro de volta na prateleira.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (Estes livros nesta prateleira consistem em vários artigos que pertencem a Asgore.)']
                        : [
                            "<32>{#p/basic}* É uma estante.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            "<32>{#p/basic}* É uma reportagem de casualidades.",
                            '<33>* \"Últimas notícias... dois mil mortos, quarenta mil feridos.\"\n* \"Tenko caiu.\"',
                            '<32>* \"Dias antes do ataque, um rapaz local, Gerson, foi colocado na guarda real.\"',
                            '<32>* \"Gerson previu todos os ataques baseando-se nos até então movimentos humanos.\"',
                            '<32>* \"Se não fosse pelo filho do rei, essas previsões teriam sido ignoradas.\"',
                            '<32>* \"Se fossem ignorados, a família de Gerson teria morrido no ataque.\"',
                            '<32>* \"Sobreviventes do ataque estão preparando uma comemoração no centro do nexus.\"',
                            '<32>* \"O garoto é um herói da cidade.\"',
                            '<32>{#p/human}* (Você põe o livro de volta na prateleira.)'
                        ]
            ),
            c_al_chair1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você nota o tamanho bastante grande da cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Uma larga cadeira de jantar.']
                        : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Feita para uma rainha."],
            c_al_chair2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você nota o pequeno tamanho da cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Uma pequena cadeira de jantar.']
                        : world.genocide
                            ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Feita para um demônio."]
                            : ["<32>{#p/basic}* Um das cadeiras de jantar do Asgore.\n* Feita para um príncipe."],
            c_al_chair3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você nota o tamanho versátil da cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Um cadeira de jantar padrão.']
                        : SAVE.data.b.oops
                            ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Feita para uma criança.\n* Como você!"]
                            : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Feita para... um anjinho.\n* Que nem você!"],
            c_al_chair4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você nota o maranho excepcional da cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Uma cadeira da jantar tamanho rei.']
                        : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Feita para um rei."],
            
            c_ak_sink: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/21}* $(name) antes pensava que o cabelo na pia era tolerável...',
                            '<25>{#f/17}* O que é estranho, já que ele se incomodava com o pelo.'
                        ],
                        ['<25>{#p/asriel1}{#f/13}* Talvez seja porque isso que o que $(name) e outros humanos tinham?'],
                        ["<25>{#p/asriel1}{#f/17}* Depois conto mais para você sobre minha teoria da queda de cabelo humano."]
                    ][Math.min(asrielinter.c_ak_sink++, 2)]
                    : ['<32>{#p/basic}* A vários fios de cabelo amarelo presos no ralo.'],
            c_ak_teacheck: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<26>{#p/asriel1}{#f/17}* Chá Estrelado não era o único que o Pai gostava.",
                            "<25>{#f/17}* Ele até me contou que amava todos os tipos de chá desde criança.",
                            '<25>{#f/13}* Antes disso...\n* Ele era um símio bebedor de água.',
                            "<25>{#f/8}* ... nós não falamos muito sobre isso."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/17}* Então um dia, quando o jovem Asgore saía com alguns amigos...',
                            '<25>{#f/17}* Ele se perdeu em uma floresta mágica e sua garrafa de água estava vazia.',
                            '<25>{#f/13}* Com sorte, no meio das árvores, tinha...',
                            '<25>{#f/20}* Bem, como pai gostava de chamar, uma \"cidade fantasma.\"'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Piadas bobas de lado, Asgore tentou pedir água para os fantasmas.',
                            "<25>{#f/15}* ...\n* Eles não tinham nenhuma.",
                            '<25>{#f/13}* Mas, como você já deve ter adivinhado, eles tinham chá.',
                            '<25>{#f/17}* Uma vez que Asgore tentou, ele nunca mais foi o mesmo.'
                        ],
                        ["<25>{#p/asriel1}{#f/15}* Eles dizem que Asgore foi o primeiro a inventar o Chá Estrelado."]
                    ][Math.min(asrielinter.c_ak_teacheck++, 3)]
                    : world.genocide || world.bad_robot
                        ? SAVE.data.b.c_state_switch2
                            ? ["<32>{#p/basic}* É um bule de chá.\n* Não tem mais nada aqui."]
                            : [
                                "<32>{#p/basic}* É um bule de chá.\n* Tem um interruptor em baixo do balcão...",
                                '<32>{#p/human}{#c.switch2}* (Você pressionou o interruptor.)'
                            ]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* É um bule de chá.\n* Mesmo com a passagem do tempo, ele continua a ferver."]
                            : ["<32>{#p/basic}* É um bule de chá.\n* O cheiro Chá Estrelado permeia na cozinha."],
            c_ak_stove: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/15}* Papyrus não foi o único que Undyne tentou ensinar a cozinhar.",
                            '<25>{#f/16}* Quer dizer, isso se você considerar outras linhas do tempo.',
                            '<25>{#f/13}* Uma vez eu consegui trazer Undyne e Alphys juntas para essa cozinha.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/17}* Undyne queria ensinar ela a cozinhar com magia, mas...',
                            '<25>{#f/13}* Tudo que a tal cientista queria fazer era apontar lasers na comida.',
                            SAVE.flag.n.genocide_milestone < 5
                                ? '<25>{#f/16}* Meio surpreendente, já que Alphys gosta de seguir instruções.'
                                : "<25>{#f/16}* Sabendo o que nós sabemos sobre a magia da Alphys, isso não é surpreendente.",
                            '<25>{#f/15}* Eu acho que ela estava em outro clima naquele dia.'
                        ],
                        ["<25>{#p/asriel1}{#f/4}* Um cientista fará ciência você querendo ou não."]
                    ][Math.min(asrielinter.c_ak_stove++, 2)]
                    : SAVE.data.n.plot !== 72 || world.runaway
                        ? ['<32>{#p/basic}* O fogão está meio sujo, mas além disso tudo tranquilo.']
                        : ['<32>{#p/basic}* Cheira a molho marinara.'],
            c_ak_trash: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                    : ['<32>{#p/basic}* Surpreendentemente, o lixo está completamente vazio.'],
            
            c_ah_door: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (O sinal descreve a sala como estando incompleta.)',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/3}* Se ela não tivesse ido embora, esse séria o quarto da mamãe...",
                                "<25>{#f/4}* É um tabu nunca ter sido terminado."
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                '<25>{#f/15}* Quando mãe se foi... ele ficou bem machucado por dentro.',
                                '<25>{#f/4}* Mas como um monstro maduro, ele passou para frente.',
                                "<25>{#f/3}* Espero que ele não tenha me passado para frente.",
                                '<25>{#f/17}* Quem sabe.\n* Tudo é possível.'
                            ],
                            ['<25>{#p/asriel1}{#f/23}* ... oh, Pai...']
                        ][Math.min(asrielinter.c_ah_door++, 2)]
                    ]
                    : ['<32>{#p/basic}* \"Quarto em renovação.\"'],
            c_ah_mirror: () =>
                SAVE.data.b.svr
                    ? ["<25>{#p/asriel1}{#f/24}* É nosso..."]
                    : world.genocide
                        ? ['<32>{#p/basic}* ...']
                        : calcLV() > 14
                            ? ['<32>{#p/basic}* Apesar de tudo...', '<32>* ... este é realmente você?']
                            : world.darker
                                ? ["<32>{#p/basic}* É você."]
                                : SAVE.data.b.ultrashortcut || SAVE.data.b.ubershortcut
                                    ? ["<99>{#p/basic}* Mesmo após pular boa parte da jornada... este ainda é você."]
                                    : ["<99>{#p/basic}* Apesar de tudo, ainda é você."],
            
            c_aa_flower: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Essa foto...',
                            '<25>{#f/17}* Está foi uma que $(name) tirou da primeira Flor Estrelada.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Não muito depois de $(name) chegar...',
                            '<25>{#f/17}* Uma pequena flor caiu do espaço sideral.',
                            '<25>{#f/23}* A primeira Flor Estrelada do Outpost.',
                            '<25>{#f/22}* Ela parou no topo do Outpost, sozinha...',
                            '<25>{#f/13}* Então nós andamos ao redor dela, com $(name) tirando fotos.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Depois que $(name) tirou a foto, estávamos prontos para ir para casa',
                            '<25>{#f/13}* Mas quando nos levantamos para sair, olhamos para as estrelas...',
                            '<25>{#f/15}* E então nós vimos.',
                            '<25>{#f/23}* Mais de mil flores caindo do espaço.',
                            '<25>{#f/17}* $(name) segurou minha mão, e ficamos lá...',
                            '<25>{#f/17}* Olhando em silêncio...'
                        ],
                        ['<25>{#p/asriel1}{#f/17}* Apesar de tudo que eu fiz como estrela, as memórias disso ainda me fazem sorrir.']
                    ][Math.min(asrielinter.c_aa_flower++, 3)]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* É uma fotografia.\n* Não tem muito mais a dizer."]
                        : ["<32>{#p/basic}* É uma fotografia.\n* Foi eu quem tirei."],
            c_aa_cabinet: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não encontra nada aqui além de um amontoado do mesmo tipo de roupa.)"]
                    : world.darker
                        ? ['<32>{#p/basic}* Um armário cheio de roupas.']
                        : [
                            '<32>{#p/basic}* Um armário cheio de roupas listradas de amarelo e azul.',
                            '<32>{#p/basic}* Algumas coisas nunca mudam...'
                        ],
            c_aa_box: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/23}* ... bem, pelo menos ele os colou de volta.',
                            '<25>{#f/13}* O Pai sempre foi esse de tentar arrumar coisas assim.',
                            '<25>{#f/15}* Toda vez que eu e $(name) quebramos algo... ',
                            '<25>{#f/8}* Maior parte das vezes $(name)...',
                            "<25>{#f/17}* Ele pegava o objeto quebrado e concertava com seu bom e velho artes e ofícios.",
                            '<25>{#f/20}* Um verdadeiro herói da bugiganga.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* Por favor não diga que eu o chamei de herói da bugiganga.",
                            "<25>{#f/16}* Ele iria rir bastante.",
                            '<25>{#f/15}* Mas foi bem necessário com tudo que $(name) ferrava.',
                            '<25>{#f/16}* Boa parte da \"diversão\" deles vinha de irritar os outros.',
                            '<25>{#f/13}* Como monstro... foi difícil pra mim entender este comportamento.',
                            '<25>{#f/15}* Então... eu me tornei Twinkly.'
                        ],
                        ["<25>{#p/asriel1}{#f/17}* Eu brincaria com esses se ainda tivesse interesse em brinquedos."],
                        ['<25>{#p/asriel1}{#f/20}* Action Figures contam como brinquedos?\n* Porque elas são bem da hora.']
                    ][Math.min(asrielinter.c_aa_box++, 3)]
                    : world.darker
                        ? ['<32>{#p/basic}* Uma caixa de modelos de naves estelares.']
                        : [
                            "<32>{#p/basic}* É uma caixa de modelos de naves estelares perfeitamente intactas.",
                            '<33>{#p/basic}* Cheira a cola antiquada.'
                        ],
            c_aa_frame: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/23}* ... ainda tá aqui..."], ['<25>{#p/asriel1}{#f/22}* ...']][
                    Math.min(asrielinter.c_aa_frame++, 1)
                    ]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* É uma pintura feita a mão."]
                        : ["<32>{#p/basic}* É uma pintura feita mão...", '<32>* Uma imagem da família.'],
            c_aa_paper: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você rola o giz de cera para frente e para trás debaixo da mão.)']
                    : world.darker
                        ? ['<33>{#p/basic}* Um monte de papel e um giz.']
                        : ['<32>{#p/basic}* Junto com um monte de papéis, você encontra o perdido giz azul.'],
            c_aa_deathbed: () =>
                SAVE.data.b.svr
                    ? [
                        ['<25>{#p/asriel1}{#f/13}* ...'],
                        [
                            "<25>{#p/asriel1}{#f/23}* ... tá tudo bem, Frisk.",
                            "<25>{#f/13}* Mesmo que eles não voltem...",
                            "<25>{#f/17}* Ainda nos lembraremos deles pelo que fizeram no final."
                        ],
                        ['<25>{#p/asriel1}{#f/13}* Frisk...', '<25>{#f/17}* Eu sei que temos coisas melhores para fazer.']
                    ][Math.min(asrielinter.c_aa_deathbed++, 2)]
                    : world.darker
                        ? ["<32>{#p/basic}* É só outra cama."]
                        : SAVE.data.b.oops
                            ? ["<32>{#p/basic}* Não a definitivamente nada especial em relação a essa cama."]
                            : ['<32>{#p/basic}* Minha cama.'],
            
            c_aa_chair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você aprecia que a pequena cadeira consiga sustentar alguém tão largo.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É uma cadeira para a escrita de diário."]
                        : ["<32>{#p/basic}* É a cadeira favorita de escrita do Asgore."],
            c_aa_bed: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A cama parece ser larga demais para você.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É uma cama tamanho rei."]
                        : ["<32>{#p/basic}* É uma cama tamanho rei.\n* Literalmente."],
            c_aa_diary: pager.create(
                0,
                ...CosmosUtils.populate(
                    9,
                    i => () =>
                        SAVE.data.b.svr
                            ? ['<32>{#p/human}* (O diário parece descrever eventos importantes em relação a Asgore.)']
                            : world.genocide || world.runaway
                                ? ['<32>{#p/human}* (Você tenta abrir o diário, mas as páginas estão completamente em branco.)']
                                : SAVE.data.n.plot === 72
                                    ? [
                                        '<32>{#p/human}* (Você olha para o novo diário de escrita.)',
                                        '<32>{#p/asgore}* \"No fim, aos monstros foi dada a liberdade.\"',
                                        '<32>* \"Frisk, junto com os outros seis humanos que vieram, nos salvaram.\"',
                                        '<32>* \"Dr. Alphys começou a procurar por humanos fora do Outpost, mas não encontrou nenhum.\"',
                                        '<32>* \"Em fato, ela não localizou uma úncia nave ou base humana na galáxia.\"',
                                        '<32>* \"Isso é bem surpreendente.\"\n* \"Teria algo acontecido com a raça humana por inteiro?\"',
                                        '<32>* \"Ou eles simplesmente abandonaram a galáxia nos esquecendo no processo?\"',
                                        '<32>* \"Talvez Frisk, ou algum dos outros humanos saibam a resposta.\"',
                                        '<32>* \"Em relação aos outros humanos, eles foram adotados por outros monstros.\"',
                                        '<32>* \"Pelo que um deles me contou, seu tempo no arquivo foi uma tragédia.\"',
                                        '<32>* \"Como resultado Alphys e eu escolhemos sabiamente candidatos dignos de adotar.\"',
                                        '<32>* \"Seja lá o que acontecer a partir de agora, nós estamos felizes que eles estejam vivos.\"',
                                        '<32>* \"Após ter compreendido o que aconteceu, eu não sei se outro grupo de humanos teria sobrevivido.\"'
                                    ]
                                    : [
                                        [
                                            '<32>{#p/human}* (Você olha para a entrada marcada do diário.)',
                                            '<32>{#p/asgore}* \"Diário do Asgore, K-516.01\"',
                                            '<32>* \"Durante estes tempos, eu não tenho ninguém a recorrer se não eu mesmo.\"',
                                            '<32>* \"Talvez as páginas do diário absorvam minha dor.\"',
                                            '<32>* \"Eu sinto muitas coisas.\"',
                                            '<32>* \"Raiva, pelo que a humanidade fez conosco, e agora com minhas crianças.\"',
                                            '<32>* \"Culpa, pela forma a qual eu reagi a está tragédia.\"',
                                            '<32>* \"Tristeza, porque me recusei a acreditar que a vida pudesse ser tão cruel.\"',
                                            '<32>* \"Mesmo após a destruição do planeta natal, o pensamento de ter uma família me trouxe esperança.\"',
                                            '<32>* \"Mas não há como negar o que aconteceu.\"',
                                            '<32>* \"Não importa quantas vezes eu revise os registros do ônibus espacial, a conclusão é a mesma.\"',
                                            '<32>* \"Minhas crianças estão mortas.\"',
                                            '<32>{#p/basic}* As outras páginas seguem cronologicamente daqui.'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário do Asgore, K-516.02\"',
                                            '<32>* \"Gerson veio me visitar hoje.\"',
                                            '<32>* \"Ele falou sobre o seu tempo no conselho planetário.\"',
                                            '<32>* \"Sobre deixar sua família, e a responsabilidade posta em si mesmo.\"',
                                            '<32>* \"Algo em sua história ressoou em mim.\"',
                                            '<32>* \"Eu deveria colocar o diário de lado e ir consola-lo.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário do Asgore, K-524.10\"',
                                            '<32>* \"Primeiro humano desde $(name) chegou no Outpost hoje.',
                                            '<32>* \"Embora o desdém pela humanidade tenha se acalmado ao longo dos anos...\"',
                                            '<32>* \"Muito daquela destruição, ainda queima em nossos corações.\"',
                                            '<32>* \"Thomas e eu estamos fazendo nosso melhor para garantir sua segurança, mas é uma tarefa difícil.\"',
                                            '<32>* \"Muitas ainda se segura nas horríveis palavras que eu proclamei anos atrás.\"',
                                            '<32>* \"Eles não irão hesitar em matar um humano, independente da idade.\"',
                                            '<32>* \"Há um limite para o que podemos fazer aqui das muralhas da Cidadela.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário de Asgore, K-535.04\"',
                                            '<32>* \"Outro humano chegou.\"',
                                            '<32>* \"Ele parece se familiarizar com Gerson, assim como com os outros membros do conselho.\"',
                                            '<32>* \"Agora, eu me pergunto.\"\n* \"Como?\"',
                                            '<32>* \"Ele cresceu ouvindo histórias da guerra?\"',
                                            '<32>* \"Ele foi enviado aqui na esperança de aprender mais sobre nós?\"',
                                            '<32>* \"De acordo com o tratado, apenas humanos militares estão a par de nossa localização.\"',
                                            '<32>* \"Pelo bem do nosso povo, espero que este ainda seja o caso.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário de Asgore, K-549.07\"',
                                            '<32>* \"Desde a última vez que escrevi neste diário, mais uma criança caiu.\"',
                                            '<32>* \"Thomas e eu temos o processo de guia-lo para uma ciência agora.\"',
                                            '<32>* \"Com cada humano chegando, a chama da minha esperança cresce.\"',
                                            '<32>* \"Eu estou começando a pensar que um dia talvez tenhamos nossa liberdade de novo.\"',
                                            '<32>* \"Isso é, se os bots trabalhadores não tomarem controle antes.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário de Asgore, K-567.11\"',
                                            '<32>* \"Hoje eu devo dizer adeus para a segunda criança que apareceu este ano.\"',
                                            '<32>* \"A primeira entrou no arquivo imediatamente, mas as outras ficaram por um tempo.\"',
                                            '<32>* \"Eu aprendi muito com elas.\"',
                                            '<32>* \"Sendo jovens como eles são, manter uma conversa foi difícil.\"',
                                            '<32>* \"Suas preposições, no entanto, me ajudaram a aceitar as ações de $(name) no passado.\"',
                                            '<32>* \"Nossas espécies podem ser mais parecidas do que eu pensava.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário de Asgore, K-587.03\"',
                                            '<32>* \"O sexto humano desde $(name) chegou a poucos dias.\"',
                                            '<32>* \"Eu escrevo não por conta de sua chegada, mas pela morte do professor dias depois.\"',
                                            '<32>* \"Thomas Nue Roman.\"\n* \"Seu funeral será em poucos dias.\"',
                                            '<32>* \"É dito que até mesmo os mais novos estão preparando textos para falar em seu nome.\"',
                                            '<32>* \"Seu trabalho impactou cada vida neste Outpost, e não será esquecido.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (Você olha a próxima entrada.)',
                                            '<32>{#p/asgore}* \"Diário de Asgore, K-615.09\"',
                                            '<32>* \"Hoje, no aniversário daquela terrível tragédia, um último humano caiu.\"',
                                            '<32>* \"De repente, a sensação da liberdade parece intimidadora.\"',
                                            '<32>* \"Ele estava certo em pensar que nos tornaríamos complacentes?\"',
                                            '<32>* \"Por dois séculos estivemos presos neste escudo de força.\"',
                                            '<32>* \"Onde nós iremos?\"',
                                            '<32>* \"O que faremos depois?\"',
                                            '<32>* \"Como nós oremos sobreviver por conta própria?\"',
                                            '<32>* \"Com esperança, essas perguntas logo serão respondidas.\"'
                                        ],
                                        ['<32>{#p/human}* (Não tem mais nada escrito aqui.)']
                                    ][i]
                )
            ),
            c_aa_bureau: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você olha dentro da mesa...)',
                        ...[
                            ['<25>{#p/asriel1}{#f/19}* Parece que os humanos pegaram de volta suas roupas.'],
                            ['<25>{#p/asriel1}{#f/19}* ...', '<25>* Eu me arrependo de perguntar o motivo de estarem aqui.'],
                            [
                                '<25>{#p/asriel1}{#f/19}* Quer dizer, faz sentido.',
                                "<25>* Sabendo o quão longo foram seus tempos no arquivo.",
                                '<25>* Então... é.'
                            ],
                            ['<25>{#p/asriel1}{#f/19}* ...']
                        ][Math.min(asrielinter.c_aa_bureau++, 3)]
                    ]
                    : SAVE.data.n.plot === 72 || world.genocide || world.bad_robot || world.trueKills > 29
                        ? [
                            '<32>{#p/human}* (Você olha dentro da mesa...)',
                            '<32>{#p/basic}* Parece ter sido esvaziado a pouco tempo.'
                        ]
                        : [
                            '<32>{#p/human}* (Você olha dentro da mesa...)',
                            "<32>{#p/basic}* É uma coleção das mais variadas roupas de criança."
                        ],
            c_aa_macaroni: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/17}* ... você gostou?',
                            '<25>{#f/13}* Está Flor Estrelada foi... a última coisa que eu fiz pro papai.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/17}* O que eu posso dizer de certeza é quem... $(name) não era muito fã.",
                            '<25>{#f/13}* Ele dizia \"para de fazer esse negócio estúpido e vem aqui...\"',
                            '<25>{#f/22}* Esse foi o dia que a gente...',
                            '<25>{#f/15}* ... você sabe.'
                        ],
                        ['<25>{#p/asriel1}{#f/20}* Lembrei-me sempre da flor de estrelada feita de macarrão falso.']
                    ][Math.min(asrielinter.c_aa_macaroni++, 2)]
                    : SAVE.data.b.oops
                        ? ['<32>{#p/basic}* Uma Flor Estrelada feita de alimentos secos e colados.']
                        : ['<32>{#p/basic}* É uma Flor Estrelada feita a mão por Asriel.\n* Está escrito \"Para o rei pai.\"'],
            c_aa_underwear: () =>
                SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway
                    ? []
                    : [
                        '<32>{#p/human}* (Você olha dentro.)',
                        ...(SAVE.data.b.svr
                            ? [
                                ["<25>{#p/asriel1}{#f/17}* Frisk...\n* Você está olhando..."],
                                ['<25>{#p/asriel1}{#f/13}* Frisk...\n* Por favor...'],
                                ['<25>{#p/asriel1}{#f/15}* Frisk...\n* Por que...'],
                                ['<25>{#p/asriel1}{#f/15}* ...']
                            ][Math.min(asrielinter.c_aa_underwear++, 3)]
                            : world.genocide || world.bad_robot
                                ? SAVE.data.b.c_state_switch1
                                    ? ['<32>{#p/basic}* Nada restando para você aqui.']
                                    : [
                                        "<32>{#p/basic}* Tem um interruptor aqui...",
                                        '<32>{#p/human}{#c.switch1}* (Você aperta o interruptor.)'
                                    ]
                                : world.darker
                                    ? ["<32>{#p/basic}* É apenas uma gaveta de roupas íntimas."]
                                    : [
                                        '<32>{#p/basic}* Horripilante!',
                                        "<33>{#p/basic}* É a gaveta de roupas íntimas do Asgore.\n* Surpreendentemente limpa.",
                                        '<33>{#p/basic}* ... maior parte dos itens são rosa, feitos a mão e escrito \"Senhor Pai\" no topo.'
                                    ])
                    ]
        }
    },
    b_opponent_alphys: {
        artifact: ['<32>{#p/human}* (Alphys olha para ele, mas finalmente o descarta.)'],
        name: '* Alphys',
        gotcha: ['<20>{*}{#p/alphys}{#e/alphys/19}Te peguei.{^30}{%}'],
        act_check: ['<32>{#p/asriel2}* Alphys.\n* A cientista real.'],
        act_asriel: (i: number) => [
            ...[
                [
                    '<32>{#p/asriel2}* Depois de todo este tempo meu corpo está finalmente começando a me aceitar...',
                    "<32>{#p/asriel2}* Vamos ver do que ele REALMENTE é capaz."
                ],
                ["<32>{#p/asriel2}* Mantenha isso em mente, vai ser mais fraco se eu usar o mesmo feitiço duas vezes."],
                ['<32>{#p/asriel2}* Só lembre-se, tente variar os feitiços que você escolhe.'],
                []
            ][Math.min(SAVE.flag.n.ga_asrielAssist++, 3)],
            choicer.create(
                '* (O que Asriel deve conjurar?)',
                `${i === 0 ? '§fill=#808080§' : ''}Noturno§fill=#fff§`,
                `${i === 1 ? '§fill=#808080§' : ''}Solstício§fill=#fff§`,
                `${i === 2 ? '§fill=#808080§' : ''}Serenata§fill=#fff§`,
                `${i === 3 ? '§fill=#808080§' : ''}Eclipse§fill=#fff§`
            )
        ],
        act_asriel_text: [
            ['<32>{#p/human}* (Asriel coloca a mão na sua cabeça e envia energia para seu corpo.)'],
            ['<32>{#p/human}* (Asriel coloca as mãos na sua cabeça, e fala em uma língua ancestral.)'],
            ['<32>{#p/human}* (Asriel coloca suas mãos em sua cabeça, e canta uma cantiga ancestral.)'],
            ['<32>{#p/human}* (Asriel coloca suas mãos na sua cabeça, e te cerca por uma aura protetora.)']
        ],
        act_asriel_confirm: [
            ['<32>{#p/story}* FOCO aumentou nessa rodada!'],
            ['<32>{#p/story}* INVENCIBILIDADE aumentou nessa rodada!'],
            ['<32>{#p/story}* REGENERAÇÃO aumentou nessa rodada!'],
            ['<32>{#p/story}* DEFESA aumentou nessa rodada!']
        ],
        epiphaNOPE: ['<20>{#p/alphys}{#e/alphys/19}Boa tentativa.'],
        statusX: ['<32>{#p/asriel2}* ...'],
        statusY: ["<32>{#p/asriel2}* Ela está quase morta!\n* Continue assim!"],
        status1a: ['<32>{#p/asriel2}* Alphys...'],
        status1r: () =>
            [
                ['<32>{#p/asriel2}* Se você precisar da minha ajuda é só perguntar.'],
                ["<32>{#p/asriel2}* Eu vou estar aqui se você precisar da minha ajuda."],
                ['<32>{#p/asriel2}* Você sabe o que fazer.']
            ][Math.min(SAVE.flag.n.ga_asrielAlphysHint++, 2)],
        status1b: ["<33>{#p/asriel2}* Então ela não fugiu de verdade...\n* Interessante."],
        status1c: ['<32>{#p/asriel2}* Bem, você sabe o que fazer.'],
        status1d: ["<32>{#p/asriel2}* Hmm... você não acha que ela parece cansada?"],
        status2a: ["<32>{#p/asriel2}* Qual o problema, Alphys?\n* Não consegue manter o ritmo?"],
        status2r1: ['<32>{#p/asriel2}* Ugh, aí vamos nós...'],
        status2b: ['<32>{#p/asriel2}* Vai, conta pra gente sua história de vida.'],
        status2c: ["<32>{#p/asriel2}* Eu estou surpreso por você ainda não estar fazendo isso."],
        status2d: ['<32>{#p/asriel2}* Valeu, Doutora Óbvia.'],
        status2e: ['<32>{#p/asriel2}* ...?'],
        status2r2: ["<32>{#p/asriel2}* Alguma coisa vai acontecer."],
        status3a: ['<32>{#p/asriel2}* Beleza... as coisas estão ficando sérias.'],
        status3b: ["<32>{#p/asriel2}* ... parece que a Alphys não está mais tentando defender.\n* É nossa chance!"],
        status3c: ['<32>{#p/asriel2}* Aguenta aí, $(name)...'],
        turnTalk1a: [
            "<20>{#p/alphys}{#e/alphys/19}Você acha que eu te enfrentaria se não aguentasse umas porradas?",
            '<20>{#p/alphys}{#e/alphys/23}Talvez você não seja tão inteligente quanto eu pensava.'
        ],
        turnTalk1b: [
            '<20>{#p/alphys}{#e/alphys/19}Nada a dizer?',
            "<20>{#e/alphys/18}... acho que sou eu quem vai estar conversando, então."
        ],
        turnTalk1c: [
            "<20>{#p/alphys}{#e/alphys/19}Exatamente. Alphys.",
            '<20>{#e/alphys/18}Porque ninguém mais vê as coisas como eu vejo.',
            '<20>{#e/alphys/19} Ninguém mais sabe o quão perigoso vocês realmente são.'
        ],
        turnTalk1d: [
            '<20>{#p/alphys}{#e/alphys/19}Use seus preciosos itens o tanto que quiser.',
            "<20>{#e/alphys/18}Não vai mudar o que acontece depois."
        ],
        turnTalk2: [
            "<20>{#p/alphys}{#e/alphys/19}... olha.\nEu estudei a cultura humana por anos.",
            "<20>{#e/alphys/19}Então não é surpresa alguma que é você quem está lutando pela dupla."
        ],
        turnTalk3: [
            '<20>{#p/alphys}{#e/alphys/18}Mas você, Asriel...\nVocê usa seu parceiro humano como um escudo.',
            "<20>{#e/alphys/52}Qual o problema?\nCom medo da sua ALMA não sobreviver sozinha?"
        ],
        turnTalk4: [
            "<20>{#p/alphys}{#e/alphys/51}Ou talvez você só está com medo que ele continue sozinho caso você morra.",
            "<20>{#e/alphys/17}ISSO seria bem poético."
        ],
        turnTalk5: [
            '<20>{#p/alphys}{#e/alphys/16}Não que eu te culpe por achar conforto em um parceiro humano.',
            '<20>{#e/alphys/52}Posso te dizer por experiência...',
            '<20>{#e/alphys/19}Fica bem solitário após todo mundo que você se importa estar morto.'
        ],
        turnTalk6: [
            "<20>{#p/alphys}{#e/alphys/23}Mas vocês dois não saberiam nada sobre isso, CERTO?",
            "<20>{#e/alphys/19}Vocês são tão ameaçadores imparáveis que não poderiam sentir dor pelo que fizeram.",
            '<20>{#e/alphys/22}Certo?'
        ],
        turnTalk7: [
            '<20>{#p/alphys}{#e/alphys/19}Tanto faz.\nNão é como se eu ligasse pra essa merda agora.',
            '<20>{#e/alphys/52}... o que é uma lástima, já que, por muito tempo...',
            '<20>{#e/alphys/51}Eu realmente pensei poder concertar as coisas.'
        ],
        turnTalk8: [
            '<20>{#p/alphys}{#e/alphys/52}Eu pensei que por ser quem deu vida aquela estrela...',
            "<20>{#e/alphys/51}Eu seria capaz de te convencer."
        ],
        turnTalk9: [
            '<20>{#p/alphys}{#e/alphys/19}... mas eu entendo a realidade, agora.',
            '<20>{#e/alphys/18}Aquele poder...\nO poder de voltar no tempo e mudar o destino...',
            '<20>{#e/alphys/19}Eu estaria errada em assumir que um de vocês tem ele?'
        ],
        turnTalk10: [
            "<20>{#p/alphys}{#f/alphys/18}Se esse for o caso, então qualquer um que NÃO tiver tem que tomar cuidado.",
            "<21>{#e/alphys/23}Parece que seus possuidores não se importam muito com os outros quando podem fazer o que quiserem sem consequências."
        ],
        turnTalk11: ['<20>{#z1}{#p/alphys}{#e/alphys/21}...', '<21>{#e/alphys/39}Eu preciso respirar.'],
        broken: ['<20>{*}{#p/alphys}{#e/alphys/45}Valeu.{^20}{%}'],
        turnTalk12: [
            "<20>{#z2}{#p/alphys}{#e/alphys/7}Após a morte da Undyne, eu não sabia o que fazer.",
            '<20>{#e/alphys/46}Então eu corri o mais rápido que pude.'
        ],
        turnTalk13: [
            '<20>{#p/alphys}{#e/alphys/47}Quando mais eu corria, mas frustada comigo mesma eu me tornava.',
            '<20>{#e/alphys/48}Como eu poderia ficar parada e não fazer NADA enquanto eu os vejo morrer?'
        ],
        turnTalk14: [
            '<20>{#p/alphys}{#e/alphys/21}... aquilo foi tudo demais.',
            '<21>{#e/alphys/39}Ainda assim, não importava o quão terrível eu me sentia...',
            '<20>{#e/alphys/45}A realidade do que aconteceu continuou a mesma.'
        ],
        turnTalk15: [
            "<20>{#p/alphys}{#e/alphys/39}Undyne disse que vocês iriam matar todos na galáxia...",
            "<20>{#e/alphys/40}Mas é pior que isso, não é?"
        ],
        turnTalk16: [
            '<20>{#z3}{#p/alphys}{#e/alphys/48}...',
            "<20>{#e/alphys/47}Eu posso ter trago um de vocês de volta a vida, mas não vou me culpar por tudo que fez.",
            "<20>{#e/alphys/38}Seja lá qual for o seu plano, não vou te deixar se livrar do julgamento.",
            '<20>{*}{#z4}{#e/alphys/54}Mesmo que isso signifique...!{^10}{%}',
            '<20>{*}{#e/alphys/25}Perder minha sanidade no processo!{^10}{%}'
        ],
        turnTalk17: ['<20>{#p/alphys}{#e/alphys/25}Toma ISSO!!'],
        turnTalk18: ['<20>{#p/alphys}{#e/alphys/25}E ISSO!!'],
        turnTalk19: ['<20>{#p/alphys}{#e/alphys/25}Que tal ISSO!!'],
        turnTalk20: ['<20>{#p/alphys}{#e/alphys/24}Hahaha...'],
        turnTalk21: ['<20>{#p/alphys}{#e/alphys/26}...'],
        turnTalk22: ['<20>{#p/alphys}{#e/alphys/27}VAMOS!!'],
        turnTalk23: ['<20>{#p/alphys}{#e/alphys/27}...'],
        done0: (b: boolean) =>
            b
                ? ['<20>{*}{#p/alphys}{#e/alphys/42}Não...{^40}{%}', '<20>{*}{#e/alphys/43}Como é que eu já estou...{^40}{%}']
                : ['<20>{*}{#p/alphys}{#e/alphys/42}Não...{^40}{%}', '<20>{*}{#e/alphys/43}Como você...{^40}{%}'],
        done1: (b: boolean) =>
            b
                ? ["<20>{*}Eu n-não pensei que você seria tão forte...{^40}{%}", '<20>{*}Mas agora, eu entendo...{^40}{%}']
                : ["<20>{*}Eu vou morrer aqui... n-não vou?{^40}{%}", '<20>{*}Depois de tudo...{^40}{%}'],
        done2: (b: boolean) =>
            b ? ['<20>{*}{#p/alphys}Eu nunca tive chance.{^40}{%}'] : ["<20>{*}{#p/alphys}Me perdoa, Asgore.{^40}{%}"]
    },
    b_opponent_archive1: {
        name: () => (battler.volatile[0].sparable ? '* Toriel' : '* 546f7269656c'),
        status0: ['<32>{#p/human}* (546f7269656c está na sua frente.)'],
        status1: ['<32>{#p/human}* (546f7269656c parece querer seguir uma rotina.)'],

        act_dinnertimeX: ['<32>{#p/human}* (Mas você já comeu a janta.)'],
        dinnerTalk: ['<11>{#p/toriel}Coma {@fill=#42fcff}{@mystify=slowly}devagar{@mystify=}{@fill=#ffffff}, minha criança.'],
        dinnerStatus: ['<32>{#p/human}* (546f7269656c gostaria de compartilhar algo com você.)'],

        act_storytimeX: ['<32>{#p/human}* (Mas você já leu uma história.)'],
        act_storytimeE: ['<32>{#p/human}* (Mas 546f7269656c ainda não estava pronto para contar uma história.)'],
        storyTalk: [
            '<11>{#p/toriel}Uma vez, havia um {@fill=#42fcff}{@mystify=monstro}monstro{@mystify=}{@fill=#ffffff}...'
        ],
        storyStatus: ['<32>{#p/human}* (546f7269656c tem mais uma coisa a fazer.)'],

        act_bedtimeX: ['<32>{#p/human}* (Mas você já foi posto para dormir.)'],
        act_bedtimeE: ['<32>{#p/human}* (Mas 546f7269656c não está pronta para te colocar pra dormir.)'],
        bedTalk: ['<11>{#p/toriel}Boa noite, minha criança.'],
        bedStatus: ['<32>{#p/human}* (Toriel serviu seu propósito neste mundo.)'],

        act_talkE: ["<32>{#p/human}* (Mas 546f7269656c não estava pronta para finalizar a rotina.)"],
        act_talkN: ['<32>{#p/human}* (E Toriel compartilhou sua sabedoria antes de desaparecer.)'],

        act_puzzlehelp: ['<32>{#p/human}* (Mas não haviam quebra-cabeças para resolver.)'],
        puzzlehelpTalk1: [
            '<11>{#p/toriel}Você está com {@fill=#42fcff}{@mystify=fome}fome{@mystify=}{@fill=#ffffff}, minha criança?'
        ],
        puzzlehelpTalk2: [
            '<11>{#p/toriel}Você está {@fill=#42fcff}{@mystify=inquieta}inquieta{@mystify=}{@fill=#ffffff}, minha pequena?'
        ],
        puzzlehelpTalk3: [
            '<11>{#p/toriel}Você está com {@fill=#42fcff}{@mystify=sono}sono{@mystify=}{@fill=#ffffff}, minha criança?'
        ]
    },
    b_opponent_archive2: {
        name: () => (battler.volatile[0].sparable ? '* Gerson' : '* 476572736f6e'),
        status0: ['<32>{#p/human}* (476572736f6e mantém-se em pé na área de treino.)'],
        status1: ['<32>{#p/human}* (476572736f6e espera seu primeiro movimento.)'],

        act_challengeX: ['<32>{#p/human}* (Mas você já aceitou o desafio.)'],
        act_challengeR: ['<32>{#p/human}* (Mas você ainda não descansou da sua última falha.)'],
        challengeTalk: [
            '<11>{#p/basic}É preciso {@fill=#ff993d}{@mystify=courage}coragem{@mystify=}{@fill=#ffffff}para enfrentar seus medos.'
        ],

        challengeFail: [
            '<11>{*}{#p/basic}Falhou!\nVocê deve manter o {@fill=#ff993d}{@mystify=foco}foco{@mystify=}{@fill=#ffffff}!{^30}{%}'
        ],
        failStatus: ["<32>{#p/human}* (476572736f6e acha que é hora de descansar.)"],
        successStatus: ['<32>{#p/human}* (Gerson serviu seu propósito neste mundo.)'],

        act_restA: ['<32>{#p/human}* (Mas você não precisava descansar.)'],
        restTalk: [
            '<11>{#p/basic}Um grande {@fill=#ff993d}{@mystify=herói} herói{@mystify=}{@fill=#ffffff} sabe seus limites..'
        ],
        restStatus: ['<32>{#p/human}* (476572736f6e aguarda seu próximo movimento com antecipação.)'],

        act_handshakeE: ["<32>{#p/human}* (Mas o treino de 476572736f6e ainda não estava concluído.)"],
        act_handshakeN: ['<32>{#p/human}* (E Gerson te ensinou seu aperto de mão favorito antes de sumir.)'],

        act_taunt: ['<32>{#p/human}* (Mas seu gesto parece ter sido ignorado.)'],

        act_advice: ['<32>{#p/human}* (Mas não haviam conselhos restantes para ouvir.)'],
        adviceTalk1: [
            '<11>{#p/basic}Você não deve {@fill=#ff993d}{@mystify=hesitar}hesitar{@mystify=}{@fill=#ffffff}.'
        ],
        adviceTalk2: [
            '<11>{#p/basic}Para aprender se deve enfrentar o {@fill=#ff993d}{@mystify=adversário}adversário{@mystify=}{@fill=#ffffff}.'
        ],
        adviceTalk3: [
            '<11>{#p/basic}A chave do sucesso é a {@fill=#ff993d}{@mystify=humildade}humildade{@mystify=}{@fill=#ffffff}.'
        ]
    },
    b_opponent_archive3: {
        name: () => (battler.volatile[0].sparable ? '* Prof. Roman' : '* 50726f662e20526f6d616e'),
        status0: ['<32>{#p/human}* (50726f662e20526f6d616e toma controle da situação.)'],
        status1: ['<32>{#p/human}* (50726f662e20526f6d616e gostaria de fazer testes em você.)'],

        act_object: ['<32>{#p/human}* (Mas sua objeção foi rapidamente rejeitada.)'],

        act_testX: ['<32>{#p/human}* (Mas você já completou esse teste.)'],
        testTalkA: ['<11>{#p/basic}Por favor, fique {@fill=#003cff}{@mystify=firme}firme{@mystify=}{@fill=#ffffff}...'],
        testTalkB: ['<11>{#p/basic}A {@fill=#003cff}{@mystify=diversão}diversão{@mystify=}{@fill=#ffffff} apenas começou.'],
        testTalkC: [
            '<11>{#p/basic}Eis aqui o {@fill=#003cff}{@mystify=poder}poder{@mystify=}{@fill=#ffffff} do esforço científico'
        ],
        testStatus1: ['<32>{#p/human}* (50726f662e20526f6d616e está pronto para começar o próximo teste.)'],
        testStatus2: ['<32>{#p/human}* (Professor Roman serviu seu propósito neste mundo.)'],

        act_notesE: ["<32>{#p/human}* (Mas 50726f662e20526f6d616e não estava pronto para entregar notas.)"],
        act_notesN: ['<32>{#p/human}* (E Professor Roman trocou notas antes de desaparecer.)']
    },
    b_opponent_archive4: {
        name: () => (battler.volatile[0].sparable ? '* Napstablook' : '* 4e6170737461626c6f6f6b'),
        status0: ['<32>{#p/human}* (4e6170737461626c6f6f6b está aqui pelo computador.)'],
        status1: ['<32>{#p/human}* (4e6170737461626c6f6f6b está querendo fazer um novo som.)'],

        act_sampleX: ['<32>{#p/human}* (Mas ele já tentou amostras.)'],
        sampleTalk: [
            '<11>{#p/napstablook}isso deve ficar {@fill=#d535d9}{@mystify=legal}legal{@mystify=}{@fill=#ffffff}...'
        ],
        sampleStatus: ['<32>{#p/human}* (4e6170737461626c6f6f6b está pronto para começar a composição.'],

        act_composeX: ['<32>{#p/human}* (Mas você já terminou de compor a faixa.)'],
        act_composeE: ['<32>{#p/human}* (Mas você não tem nenhuma amostra para compor ainda.)'],
        composeTalk: [
            "<11>{#p/napstablook}vamos ver como isso {@fill=#d535d9}{@mystify=toca}toca{@mystify=}{@fill=#ffffff}..."
        ],

        composeFail: [
            '<11>{*}{#p/napstablook}oh...\nde volta a {@fill=#d535d9}{@mystify=escrita}escrita{@mystify=}{@fill=#ffffff} na mesa...{^30}{%}'
        ],
        failStatus: ['<32>{#p/human}* (4e6170737461626c6f6f6b gostaria de tentar isso de novo.)'],
        composeStatus: ['<32>{#p/human}* (4e6170737461626c6f6f6b está pronto para começar a mixar.)'],

        act_mixX: ['<32>{#p/human}* (Mas você já terminou de mixar a faixa.)'],
        act_mixE: ['<32>{#p/human}* (Mas você ainda não mixou a faixa.)'],
        mixTalk: [
            '<11>{#p/napstablook}lembre-se de manter o {@fill=#d535d9}{@mystify=balanceamento}balanceamento{@mystify=}{@fill=#ffffff} correto...'
        ],

        mixFail: [
            "<11>{*}{#p/napstablook}oh...\nparece que vamos precisar de um {@fill=#d535d9}{@mystify=remix}remix{@mystify=}{@fill=#ffffff}...{^30}{%}"
        ],
        successStatus: ['<32>{#p/human}* (Napstablook serviu seu propósito neste mundo.)'],

        act_secretE: ["<32>{#p/human}* (Mas 4e6170737461626c6f6f6b não estava pronto para te contar isso.)"],
        act_secretN: ['<32>{#p/human}* (E Napstablook te contou um segredo antes de ir embora.)'],

        act_praise: ['<32>{#p/human}* (Mas suas amáveis palavras caíram em ouvidos invisivelmente tímidos.)']
    },
    b_opponent_archive5: {
        name: () => (battler.volatile[0].sparable ? '* Asgore' : '* 4173676f7265'),
        status0: ['<32>{#p/human}* (4173676f7265 se mantém acima.)'],
        status1: ['<32>{#p/human}* (4173676f7265 só quer uma coisa de você.)'],

        act_hugX: ['<32>{#p/human}* (Mas não havia necessidade de abraça-lo uma segunda vez.)'],
        hugTalk: ['<11>{#p/asgore}Muito obrigado, pequeno.'],
        hugStatus: ['<32>{#p/human}* (Asgore serviu seu propósito neste mundo.)'],

        act_promiseE: ["<32>{#p/human}* (Mas 4173676f7265 ainda não serviu seu propósito.)"],
        act_promiseN: ['<32>{#p/human}* (E Asgore fez uma promessa antes de ir embora.)']
    },
    b_opponent_asriel: {
        artifact: ["<32>{#p/human}* (Asriel não parece se importar.)"],
        refuse: '{*}{#p/event}{#i/3}Mas recusou...',
        name: () =>
            battler.volatile[0].container.objects[0]?.metadata.power === true
                ? '§fill=#ff7f7f§§swirl=2/1/1.05§§hue§* Asriel Dreemurr'
                : '* Asriel Dreemurr',
        status0: pager.create(
            0,
            (power = false) =>
                power
                    ? ['<32>{#p/story}* Asriel prepara \"SUPER SKYBREAKER.\"']
                    : SAVE.data.b.oops
                        ? ["<32>{#p/story}* É o fim."]
                        : ['<32>{#p/basic}* Asriel...?'],
            (power = false) =>
                power
                    ? ['<32>{#p/story}* Asriel prepara \"SUPER SKYBREAKER.\"']
                    : SAVE.data.b.oops
                        ? ["<32>{#p/story}* É o fim."]
                        : ['<32>{#p/basic}* ...']
        ),
        act_check: () =>
            SAVE.data.b.oops
                ? [
                    '<32>{#p/story}* ASRIEL DREEMURR - ATQ{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* Ser lendário feito de cada ALMA do Outpost.'
                ]
                : ['<32>{#p/story}* ASRIEL DREEMURR - ATQ{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* ...'],
        act_hope: [
            '<32>{#p/human}* (Você mantém suas esperanças. Você sente seu corpo sendo protegido por dentro.)',
            '<32>{#p/story}* DEFESA aumentou nessa rodada!'
        ],
        act_dream: [
            "<32>{#p/human}* (Você pensa no porque está aqui. Você sente suas feridas se curando.)",
            '<32>{#p/story}* REGENERAÇÃO aumentou nessa rodada!'
        ],
        act_flirt1: ['<32>{#p/human}* (Você flerta com Asriel.)\n* (Nada acontece.)'],
        act_flirt2: [
            '<32>{#p/human}* (Você flerta com Asriel e com todos que estão com ele.)',
            '<32>{#p/basic}* O gesto ressoa fortemente dentro de Asriel...',
            "<32>* ... ele não pode ajudar a não ser te algo em retorno!"
        ],
        act_pet: (count: number) =>
            SAVE.flag.n.pacifist_marker === 8
                ? ["<32>{#p/human}* (Você tenta acariciar Asriel, mas ele está muito longe.)"]
                : [
                    ...[
                        ["<32>{#p/human}* (Você acaricia Asriel.)\n* (Asriel não sabe como lidar com essa situação.)"],
                        ["<32>{#p/human}* (Você acaricia Asriel de novo.)\n* (Asriel ainda não sabe como lidar com isso.)"],
                        ["<32>{#p/human}* (Você acaricia o pelo de Asriel.)\n* (Asriel cora e evita contato visual.)"],
                        ["<32>{#p/human}* (Você coça a cabeça de Asriel.)\n* (Asriel segura um sorriso com todas as suas forças.)"],
                        ["<32>{#p/human}* (Você coça o pescoço de Asriel.)\n* (Asriel se recusa a mostrar seu apreço.)"],
                        [
                            "<32>{#p/human}* (Você brinca com as orelhas de Asriel.)\n* (Asriel queria não estar gostando disso.)"
                        ],
                        ["<32>{#p/human}* (Você dá um tapinha nas costas de Asriel.)\n* (Asriel não entende mais seus motivos.)"],
                        [
                            "<32>{#p/humano}* (Você se agarra às pernas de Asriel.)\n* (Asriel fica pasmo com sua afeição contínua.)"
                        ],
                        [
                            "<32>{#p/human}* (Você aperta as patas de Asriel.)\n* (Asriel está apenas deixando acontecer, sem tentar impedir.)"
                        ],
                        ["<32>{#p/human}* (Você dá um tapa no focinho de Asriel.)\n* (Asriel desistiu de tentar impedi-lo.)"],
                        ["<32>{#p/human}* (Você acaricia o rosto de Asriel.)\n* (Asriel parece ter se lembrado de alguém.)"],
                        ['<32>{#p/human}* (Você continua a acariciar Asriel.)\n* (Asriel suspira.)'],
                        ['<32>{#p/human}* (Você continua a acariciar Asriel.)\n* (Asriel suspira.)']
                    ][count],
                    "<32>{#p/story}* ATAQUE de Asriel caiu por este turno!"
                ],
        turnTalk1: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}Sabe...',
                    "<20>{*}{#p/asriel3}{#e/asriel/6}Eu nem me importo mais em destruir o Outpost."
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}Sabe...',
                    "<20>{*}{#p/asriel3}{#e/asriel/6}Eu não me importo mais em destruir o Outpost."
                ],
        status1: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel carrega \"ROARING TYPHOON.\"']
                : ["<32>{#p/basic}* Mas... você está..."],
        turnTalk2: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}A-após eu te derrotar e ganhar controle total da linha do tempo...',
                    '<20>{*}{#p/asriel3}{#e/asriel/2}Eu só quero... resetar tudo.'
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}Após eu te derrotar e ganhar controle da linha do tempo...',
                    '<20>{*}{#p/asriel3}{#e/asriel/2}Eu só quero resetar tudo.'
                ],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel chama \"TITANIUM STRIKER.\"']
                : ['<32>{#p/basic}* Como você pode...'],
        turnTalk3: (fluff: boolean) =>
            fluff
                ? [
                    "<20>{*}{#p/asriel3}{#e/asriel/3}Todo seu progresso... suas memórias...",
                    "<20>{*}{#p/asriel3}{#e/asriel/2}E-eu vou trazê-las de volta ao zero!"
                ]
                : [
                    "<20>{*}{#p/asriel3}{#e/asriel/3}Todo seu progresso... suas memórias...",
                    "<20>{*}{#p/asriel3}{#e/asriel/2}Eu vou trazê-las de volta ao zero!"
                ],
        status3: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel carrega \"CROSSFIRE CHAOS.\"'] : ['<32>{#p/basic}* ...'],
        turnTalk4: (fluff: boolean) =>
            fluff
                ? ['<20>{*}{#p/asriel3}{#e/asriel/0}Então nós faremos tudo... TUDO de novo.']
                : ['<20>{*}{#p/asriel3}{#e/asriel/0}Então nós faremos TUDO de novo.'],
        status4: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel carrega \"ROARING TYPHOON.\"']
                : ['<32>{#p/basic}* ... heh...\n* Deve ser assim que Toriel se sentiu, huh?'],
        turnTalk5: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/1}E v-você quer saber a melhor parte disso tudo?',
                    "<20>{*}{#p/asriel3}{#e/asriel/0}Você FARÁ tudo."
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/1}E você quer saber a melhor parte disso?',
                    "<20>{*}{#p/asriel3}{#e/asriel/0}Você FARÁ tudo."
                ],
        status5: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel carrega \"CROSSFIRE CHAOS.\"'] : ['<32>{#p/basic}* ... ainda, eu...'],
        turnTalk6: (fluff: boolean) =>
            fluff
                ? ["<20>{*}{#p/asriel3}{#e/asriel/3}E então... v-você vai perder para mim de novo."]
                : ["<20>{*}{#p/asriel3}{#e/asriel/3}E então você vai perder pra mim de novo."],
        status6: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel prepara \"SUPER SKYBREAKER.\"'] : ['<32>{#p/basic}* ...'],
        turnTalk7: (fluff: boolean) =>
            fluff ? ['<20>{*}{#p/asriel3}{#e/asriel/4}E d-de novo.'] : ['<20>{*}{#p/asriel3}{#e/asriel/4}E de novo.'],
        status7: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel chama \"TITANIUM STRIKER.\"'] : ['<32>{#p/basic}* Ah não ser...'],
        turnTalk8: (fluff: boolean) =>
            fluff
                ? ['<20>{*}{#p/asriel3}{#e/asriel/2}E... e d-de novo!']
                : ['<20>{*}{#p/asriel3}{#e/asriel/2}E de novo!'],
        status8: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel carrega \"CROSSFIRE CATACLYSM.\"']
                : ['<32>{#p/basic}* ... mas que droga...'],
        turnTalk9: (fluff: boolean) =>
            30 <= SAVE.data.n.bully
                ? fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/3}Tudo porque... Você quer mostrar sua \"força.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/3}Tudo porque você quer mostrar sua \"força.\"']
                : fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/3}Tudo porque... v-você quer seu \"final perfeito.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/3}Tudo porque você quer um \"final perfeito.\"'],
        status9: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel chama \"POLYCARBIDE OBLITERATOR.\"']
                : ["<32>{#p/basic}* Era pra você estar morto!"],
        turnTalk10: (fluff: boolean) =>
            30 <= SAVE.data.n.bully
                ? fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/1}... porque... v-você acha que é \"durão.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/1}... porque você acha que é \"durão.\"']
                : fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/1}... porque... v-você \"ama seus amigos.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/1}... porque você \"ama seus amigos.\"'],
        status10: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel prepara \"DOOMSDAY TYPHOON.\"'] : ['<32>{#p/basic}* Ugh...'],
        turnTalk11: (fluff: boolean) =>
            fluff
                ? ['<20>{*}{#p/asriel3}{#e/asriel/1}... p-porque você é determinado.']
                : ['<20>{*}{#p/asriel3}{#e/asriel/1}... porque você é determinado.'],
        status11: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel prepara \"ULTIMA SKYBREAKER.\"']
                : ['<32>{#p/basic}* Todas aquelas vezes que eu a vi discutindo com Toriel... sobre o passado...'],
        turnTalk12: (fluff: boolean) =>
            fluff
                ? [
                    "<20>{*}{#p/asriel3}{#e/asriel/6}Não é... não é delicioso?",
                    '<20>{*}{#p/asriel3}{#e/asriel/3}O poder... que te deixou chegar tão longe...',
                    "<20>{*}{#p/asriel3}{#e/asriel/2}Será a sua queda!"
                ]
                : [
                    "<20>{*}{#p/asriel3}{#e/asriel/6}Não é delicioso?",
                    '<20>{*}{#p/asriel3}{#e/asriel/3}O poder que te trouxe tão longe...',
                    "<20>{*}{#p/asriel3}{#e/asriel/2}Será a sua queda!"
                ],
        status12: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel prepara \"HYPER GONER.\"']
                : ['<32>{#p/basic}* ... ele realmente sente minha falta...\n* ... desse tanto?'],
        turnTalk13: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/0}... agora... CHEGA de perder tempo!',
                    "<20>{*}{#p/asriel3}{#e/asriel/5}É... é hora de apagar está linha do tempo para sempre!"
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/0}Agora, CHEGA de perder tempo!',
                    "<20>{*}{#p/asriel3}{#e/asriel/5}É hora de apagar está linha do tempo para sempre!"
                ],
        turnTalk14: [
            "<20>{*}{#p/asriel3}{#e/asriel/1}... mesmo após aquele ataque, você ainda está no meu caminho...?",
            '<20>{*}{#p/asriel3}{#e/asriel/5}Wow... você é REALMENTE algo especial.',
            "<20>{*}{#p/asriel3}{#e/asriel/0}Mas não fique se achando.",
            "<20>{*}{#p/asriel3}{#e/asriel/0}Até o momento eu estive usando apenas umas fração do meu VERDADEIRO poder!",
            "<20>{*}{#p/asriel3}{#e/asriel/2}Vamos ver como sua DETERMINAÇÃO aguenta ISSO!"
        ],
        hyperTalk1a: [
            '<20>{*}{#p/asriel3}{#e/asriel/0}Urah ha ha...',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Eis o meu VERDADEIRO poder!'
        ],
        hyperTalk1b: [
            '<20>{*}{#p/asriel3}{#e/asriel/4}Qu-\nComo eu não te acertei!?',
            '<20>{*}{#p/asriel3}{#e/asriel/5}Urgh...'
        ],
        hyperTalk2a: ['<20>{*}{#p/asriel3}{#e/asriel/1}Vamos lá...!'],
        hyperTalk2b: [
            '<20>{*}{#p/asriel3}{#e/asriel/5}Mas que...',
            "<20>{*}{#p/asriel3}{#e/asriel/4}Você deveria estar morto!"
        ],
        hyperTalk3a: [
            '<20>{*}{#p/asriel3}{#e/asriel/0}Eu posso sentir...',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Toda vez que você morre, seu controle sobre este mundo se esvai.',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Toda vez que você morre, suas memórias sobre seus amigos também morrem.'
        ],
        hyperTalk3b: ["<20>{*}{#p/asriel3}{#e/asriel/6}... tanto faz.\nNão importa."],
        hyperTalk3c: ['<20>{*}{#p/asriel3}{#e/asriel/0}Sua vida ACABA aqui, é um mundo onde NINGUÉM se lembrará de ti!'],
        hyperTalk4: [
            "<20>{*}{#p/asriel3}{#e/asriel/1}Ainda de pé...?",
            "<20>{*}{#p/asriel3}{#e/asriel/3}Por mim tudo bem.",
            "<20>{*}{#p/asriel3}{#e/asriel/2}Em alguns momentos você vai esquecer de tudo que sabe.",
            '<20>{*}{#p/asriel3}{#e/asriel/0}Essa atitude vai te servir bem na sua PRÓXIMA vida!'
        ],
        hyperTalk5: [
            '<20>{*}{#p/asriel3}{#e/asriel/0}Urah ha ha...',
            '<20>{*}{#p/asriel3}{#e/asriel/1}Ainda!?',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Vamos...',
            '<20>{*}{#p/asriel3}{#e/asriel/0}Me mostre do que sua DETERMINAÇÃO é capaz!'
        ],
        intermission: () => [
            "<32>{#p/human}* (Você não consegue mover seu corpo.)",
            '<32>* (Você tenta lutar contra.) \n* (Nada acontece.)',
            '<32>* (Você tenta acessar seu arquivo SALVO.)\n* (Nada acontece.)',
            '<32>* (Você tenta acessar novamente seu arquivo SALVO.)\n* (Nada acontece.)',
            '<32>* (...)',
            ...(SAVE.data.b.oops
                ? [
                    '<32>* (... mas...)',
                    '<32>* (Talvez, com o pouco de poder que você tem...)',
                    '<32>* (Você possa SALVAR um outro alguém.)'
                ]
                : [
                    '<32>{#p/basic}* Ei... você tá aí?',
                    "<32>* Sou eu, $(name)...\n* Você ainda tá comigo, parceiro?",
                    '<32>* ... heh...',
                    "<32>* Nós tivemos uma jornada e tanto, eu e você...",
                    '<32>* Todos os amigos que fizemos, todas as batalhas que lutamos...',
                    "<32>* Pensando nisso agora... É como se estivéssemos construindo isso o tempo todo.",
                    "<32>* ... olha...\n* Eu sei que não sou sempre a pessoa mais otimista...",
                    '<32>* Mas pelo bem de todos no Outpost, você precisa se manter determinado!',
                    '<32>* E mais, se Asriel consegue roubar a ALMA de todos os seus amigos...',
                    "<32>* ... quem disse que não podemos roubar de volta?",
                    "<32>* Vamos lá!\n* Estamos nisso juntos!"
                ])
        ],
        status13: () =>
            world.runaway
                ? ['<32>{#p/story}* ...']
                : [
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* Uma ressonância ecoa de dentro do corpo de Asriel."]
                        : ['<32>{#p/basic}* ...'],
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* Uma ressonância crescente ecoa de dentro do corpo de Asriel."]
                        : ["<32>{#p/basic}* Sim, eu acho que é isso!\n* Continua assim!"],
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* Uma ressonância poderosa ecoa de dentro do corpo de Asriel."]
                        : ["<32>{#p/basic}* Estamos quase lá!"],
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* Uma ressonância toda-poderosa ecoa de dentro do corpo de Asriel."]
                        : ['<32>{#p/basic}* ...\n* Agora o que?']
                ][
                (SAVE.flag.b.pacifist_marker_save1 ? 1 : 0) +
                (SAVE.flag.b.pacifist_marker_save2 ? 1 : 0) +
                (SAVE.flag.b.pacifist_marker_save3 ? 1 : 0)
                ],
        act_check2: () =>
            SAVE.flag.b.pacifist_marker_save1 && SAVE.flag.b.pacifist_marker_save2 && SAVE.flag.b.pacifist_marker_save3
                ? ['<33>{#p/story}* ASRIEL DREEMURR - ATQ{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* ...']
                : SAVE.data.b.oops
                    ? [
                        '<33>{#p/story}* ASRIEL DREEMURR - ATQ{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* O absoluto DEUS da hipermorte!'
                    ]
                    : ["<32>{#p/story}* ASRIEL DREEMURR - ATQ{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* Não desista agora."],
        mercy_save1: () => [
            "<32>{#p/human}* (Você alcança a ALMA de Asriel e chama seus amigos.)",
            ...(SAVE.flag.b.pacifist_marker_save1 || SAVE.flag.b.pacifist_marker_save2 || SAVE.flag.b.pacifist_marker_save3
                ? []
                : ["<32>{#p/basic}* Eles estão aí dentro em algum lugar, não estão?", '<32>* ...']),
            "<32>* Dentro da ALMA de Asriel, algo está ressoando...!"
        ],
        confrontation: [
            '<32>{#p/human}* (Após bullinar tantos monstros, durante toda sua jornada...)',
            '<33>* (Algo adormecido, enterrado longe, muito abaixo, desperta mais uma vez.)',
            '<32>* (Um sentimento de medo em cada monstro do Outpost, colocado pelos humanos centenas de anos atrás.)',
            '<32>* (O inimigo que agora está diante de ti não tem o direito de ter medo de você...)',
            "<32>* (Ainda assim, de alguma forma, o medo combinado de todos esses que você bullinou...)",
            '<32>* (Te deu uma abertura que você não tem o direito de recusar.)',
            "<32>* (... tem apenas uma opção que faz sentido para você agora.)",
            "<32>* (A apenas uma coisa restando para fazer.)"
        ],
        attackTalk1: [
            '<20>{*}{#p/asriel3}{#e/asriel/1}Qu... como você...',
            '<20>{*}{#p/asriel3}{#e/asriel/3}...',
            "<20>{*}{#p/asriel3}{#e/asriel/2}Heheheh... você pensa que é forte o suficiente para ultrapassar um deus?",
            "<20>{*}{#p/asriel3}{#e/asriel/0}Bem, vamos ver como você gosta DISSO!"
        ],
        attackTalk2: [
            '<20>{*}{#p/asriel3}{#e/asriel/3}...',
            "<20>{*}{#p/asriel3}{#e/asriel/1}Se você pensa que isso vai me ferir, você está errado.",
            "<20>{*}{#p/asriel3}{#e/asriel/0}Eu ainda estou no controle aqui!"
        ],
        attackTalk3: [
            '<20>{*}{#p/asriel3}{#e/asriel/2}... mesmo se você PUDER me derrotar...',
            "<20>{*}{#p/asriel3}{#e/asriel/3}Fazendo isso, você também matará seus amigos.",
            '<20>{*}{#p/asriel3}{#e/asriel/1}É isso que você quer?\nFicar SOZINHO?'
        ],
        attackTalk4: [
            '<20>{*}{#p/asriel3}{#e/asriel/3}Qual foi, $(name)...\nIsso é SUICIDIO!',
            "<20>{*}{#p/asriel3}{#e/asriel/5}Você não tá vendo!?",
            '<20>{*}{#p/asriel3}{#e/asriel/6}O $(name) que eu conheço jamais faria algo tão ESTÚPIDO assim!'
        ],
        attackTalk5: [
            '<20>{*}{#p/asriel3}{#e/asriel/4}...',
            '<20>{*}{#p/asriel3}{#e/asriel/6}Me escuta, $(name).',
            "<20>{*}{#p/asriel3}{#e/asriel/6}Você tem que parar o que está fazendo agora.",
            "<20>{*}{#p/asriel3}{#e/asriel/9}Se você não, eu...",
            "<20>{*}{#p/asriel3}{#e/asriel/7}Eu serei forçado a fazer algo ainda pior!"
        ],
        attackTalk6: [
            '<20>{*}{#p/asriel3}{#e/asriel/9}$(name), por favor...',
            "<20>{*}{#p/asriel3}{#e/asriel/7}Você não sabe o que está fazendo, tá bom?",
            "<20>{*}{#p/asriel3}{#e/asriel/8}Não é só que eu queira que você pare de lutar comigo.",
            "<20>{*}{#p/asriel3}{#e/asriel/8}É só que se... eu deixar você me derrotar...",
            "<20>{*}{#p/asriel3}{#e/asriel/7}Eu não serei mais igual a você.",
            "<20>{*}{#p/asriel3}{#e/asriel/9}Eu não serei digno de seu respeito!",
            '20>{*}{#p/asriel3}{#e/asriel/10}{#i/3}{@random=1.1/1.1}Vai se ferrar, $(name)...\nPor que você SEMPRE tem que VENCER!?'
        ],
        attackTalk7: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}...'],
        attackTalk7x: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}$(name), eu...'],
        mercy_save2: [
            '<32>{#p/human}* (Estranhamente, como seus amigos se lembraram de você...)',
            "<32>* (Algo começou a ressoar na ALMA de Asriel, forte e mais forte.)",
            "<32>* (Parece que existe uma pessoa que ainda precisa ser salva.)",
            '<32>* (Mas quem...?)',
            '<32>* (...)',
            '<32>* (... de repente, você percebe.)',
            '<32>* (Você alcança eles e chama seus nomes.)'
        ],
        saveTalk1: ['<20>{*}{#p/asriel3}{#e/asriel/1}Huh? O que você tá fazendo...!?'],
        saveTalk2: [
            '<20>{*}{#p/asriel3}{#e/asriel/7}Oqu... o que você fez...?',
            "<20>{*}{#p/asriel3}{#e/asriel/8}O que é este sentimento...? O que está acontecendo?",
            "<20>{*}{#p/asriel3}{#e/asriel/1}Não... NÃO!\nEu não preciso de NINGUÉM!"
        ],
        saveTalk3: [
            '<20>{*}{#p/asriel3}{#e/asriel/4}PARA COM ISSO!\nSai de perto de mim!',
            '<20>{*}{#p/asriel3}{#e/asriel/10}Você tá me ouvindo!?',
            "<20>{*}{#p/asriel3}{#e/asriel/9}Eu vou te cortar ao meio!"
        ],
        saveTalk4: [
            '<20>{*}{#p/asriel3}{#e/asriel/7}...',
            "<20>{*}{#p/asriel3}{#e/asriel/7}$(name)...\nVocê sabe o por que de eu estar fazendo isso...?",
            '<20>{*}{#p/asriel3}{#e/asriel/7}Por que eu luto para te manter por perto...?'
        ],
        saveTalk5: [
            "<20>{*}{#p/asriel3}{#e/asriel/7}Eu estou fazendo...",
            "<20>{*}{#p/asriel3}{#e/asriel/8}Porque você é especial, $(name).",
            "<20>{*}{#p/asriel3}{#e/asriel/8}Você é o único que me entende.",
            "<20>{*}{#p/asriel3}{#e/asriel/8}Você é o único que ainda é divertido brincar."
        ],
        saveTalk6: [
            '<20>{*}{#p/asriel3}{#e/asriel/8}...',
            '<20>{*}{#p/asriel3}{#e/asriel/8}Não...',
            "<20>{*}{#p/asriel3}{#e/asriel/7}Não é apenas isso.",
            '<20>{*}{#p/asriel3}{#e/asriel/9}Eu... eu...',
            "<20>{*}{#p/asriel3}{#e/asriel/4}Eu estou fazendo isso porque me importo com você, $(name)!",
            '<20>{*}{#p/asriel3}{#e/asriel/3}Eu me importo com você mais do que qualquer pessoa!'
        ],
        saveTalk7: [
            '<20>{*}{#p/asriel3}{#e/asriel/7}...',
            "<20>{*}{#p/asriel3}{#e/asriel/8}Eu não estou pronto para acabar.",
            "<20>{*}{#p/asriel3}{#e/asriel/8}Eu não estou pronto para te deixar ir.",
            "<20>{*}{#p/asriel3}{#e/asriel/9}Eu não estou pronto para dizer adeus para você de novo."
        ],
        saveTalk8: [
            '<20>{*}{#p/asriel3}{#e/asriel/10}{#i/4}{@random=1.1/1.1}Então, por favor...\nPARA de fazer isso...',
            '<20>{*}{#p/asriel3}{#e/asriel/12}{#i/4}{@random=1.2/1.2}E SÓ ME DEIXA GANHAR!!!'
        ],
        cryTalk1: ['<20>{*}{#p/asriel3}{@random=1.1/1.1}PARA!{^30}{%}'],
        cryTalk2: ['<20>{*}{#p/asriel3}{@random=1.1/1.1}PARA AGORA!!!{^40}{%}'],
        endStatus1: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* ...']),
        endTalk1: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}...', '<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}$(name)...'],
        endStatus2: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* Asriel...']),
        endTalk2: ["<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}Eu estou tão sozinho, $(name)..."],
        endStatus3: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* ...']),
        endTalk3: ["<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}Eu estou com tanto medo, $(name)..."],
        endStatus4: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* ...']),
        endTalk4: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}$(name), eu...'],
        endStatus5: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* Isso é minha culpa...']),
        endTalk5: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}Eu...']
    },
    b_opponent_lostsoul: {
        name: '* Alma Perdida',
        act_check_alphys: () => [
            '<32>{#p/story}* ALMA PERDIDA - ATQ ??? DEF???\n* Parece que este Alma Perdida é uma fã de anime de ficção científica.'
        ],
        act_check_asgore: () => [
            '<32>{#p/story}* ALMA PERDIDA - ATQ ??? DEF ???\n* Parece que essa gostaria de te ver vivo.'
        ],
        act_check_papyrus: () => [
            '<32>{#p/story}* ALMA PERDIDA - ATQ ??? DEF ???\n* Parece que essa Alma Perdida sonha em se tornar da Guarda Real.'
        ],
        act_check_sans: () => [
            '<32>{#p/story}* ALMA PERDIDA - ATQ ??? DEF ???\n* Parece que essa Alma Perdida quer o melhor para alguém.'
        ],
        act_check_toriel: () => [
            '<32>{#p/story}* ALMA PERDIDA - ATQ ??? DEF ???\n* Parece que essa Alma Perdida quer muito te proteger.'
        ],
        act_check_undyne: () => [
            '<32>{#p/story}* ALMA PERDIDA - ATQ ??? DEF ???\n* Essa Alma Perdida gostaria de te ensinar a cozinhar.'
        ]
    },
    b_opponent_lostsoul_a: {
        status1: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* As Almas Perdidas aparecem.'] : ['<32>{#p/basic}* Alphys e Undyne.'],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* As Almas Perdidas estão lá.']
                : ['<32>{#p/basic}* Hmm... eu acho que sei uma forma de acorda-los.'],
        act: {
            flirt: (s: boolean) =>
                s
                    ? ['<32>{#p/human}* (Você flerta com a Alma Perdida.)', '<32>{#p/basic}* De repente...!']
                    : ['<32>{#p/human}* (Você flerta com a Alma Perdida.)\n* (Nada acontece.)'],
            water: (s: boolean) => [
                '<32>{#p/human}* (Você oferece um copo de água para a Alma Perdida.)',
                '<32>{#p/human}* (Ela parece não impressionada com isso, mas familiarizada ao mesmo tempo...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            punch: (s: boolean) => [
                '<32>{#p/human}* (Você oferece a Alma Perdida uma garrafa de Soco Exoberry.)',
                '<32>{#p/human}* (Ela parece incomodada com isso, mas familiarizada ao mesmo tempo...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            cocoa: (s: boolean) => [
                '<32>{#p/human}* (Você oferece a Alma Perdida um copo de Chocolate Quente.)',
                '<32>{#p/human}* (Ela parece confortada com isso, e familiarizada com isso também...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            tea: (s: boolean) => [
                '<32>{#p/human}* (Você oferece um copo de Chá Estrelado para a Alma Perdida.)',
                '<32>{#p/human}* (Ela parece exultante com isso, e familiarizada com isso também...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            lesson: (s: boolean) => [
                '<32>{#p/human}* (Você pede à Alma Perdida para ensiná-lo a cozinhar.)',
                "<32>{#p/human}* (Ela não sabe por que, mas ela meio que quer obrigar...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            trivia: (s: boolean) => [
                '<32>{#p/human}* (Você pede à Alma Perdida que lhe dê perguntas triviais de segurança.)',
                "<32>{#p/human}* (Ela está apreensiva, mas disposta ao mesmo tempo...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            escort: (s: boolean) => [
                '<32>{#p/human}* (Você pede para a Alma Perdida te escoltar por uma área perigosa.)',
                "<32>{#p/human}* (Ela está hesitante, mas pensa ser uma boa ideia...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ]
        },
        assist: {
            text: ['<32>{#p/basic}* Acordem, vocês dois...\n* Um novo filme da Mew Mew foi encontrado!'],
            talk: [
                ["<11>{#p/undyne}{#e/undyne/13}Nós vamos ter que assistir mais tarde, então!"],
                ["<11>{#p/alphys}{#e/alphys/3}Você tá brincando?\nSério??"]
            ]
        },
        fight: [
            [
                ['11>{#p/undyne}{#e/undyne/4}Você sempre foi mais forte do que parecia.'],
                ['<11>{#p/alphys}{#e/alphys/9}Undyne, cuidado!']
            ],
            [
                ['<11>{#p/undyne}{#e/undyne/4}Heh, você e seus bobos apelidos!'],
                ['<11>{#p/alphys}{#e/alphys/12}Agora eu sei porque te chamam de \"$(moniker4)!\"']
            ]
        ],
        flirt: [
            [
                ['<11>{#p/undyne}{#e/undyne/12}Eu juro que se você me bater mais uma vez...'],
                ['<11>{#p/alphys}{#e/alphys/35}Pfft.']
            ],
            [
                ['<11>{#p/undyne}{#e/undyne/5}Eu te DESAFIO a flertar com ela de novo.'],
                ['<11>{#p/alphys}{#e/alphys/35}Oh, vem pra cima!']
            ]
        ],
        idle: [
            pager.create(
                1,
                () =>
                    2 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/undyne}Há um sentimento que não consigo descrever."]
                        : ['<11>{#p/undyne}Todos os humanos devem morrer.'],
                () =>
                    2 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/undyne}Toda a galáxia está contando comigo!']
                        : ["<11>{#p/undyne}Você é nosso verdadeiro inimigo."],
                () =>
                    2 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/undyne}Você vai terá que se esforçar mais do que isso."]
                        : ['<11>{#p/undyne}Piedade é para os fracos.']
            ),
            pager.create(
                1,
                () =>
                    6 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/alphys}Você não deve ser tão inteligente como eu pensei.']
                        : ["<11>{#p/alphys}Você quer que eu suma, não é?"],
                () =>
                    6 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/alphys}Não vai mudar o que acontece depois."]
                        : ["<11>{#p/alphys}Eu só estou fazendo meu trabalho, não estou?"],
                () =>
                    6 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/alphys}Ninguém vê as coisas como eu vejo.']
                        : ["<11>{#p/alphys}Eu tenho que continuar me escondendo, certo?"]
            )
        ],
        item: {
            tvm_mewmew: {
                text: [
                    "<32>{#p/human}* (Você joga a Boneca Mew Mew nos rostos das Almas Perdidas.)",
                    '<32>{#p/basic}* De repente...!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/41}Uh, eu acho que isso é entre vocês.'],
                    ['<11>{#p/alphys}{#e/alphys/8}Oh, então AGORA você quer que eu veja.']
                ]
            },
            orange_soda: {
                text: [
                    '<32>{#p/human}* (O refrigerante parece familiar para uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/20}É, ela AMA esse tipo de coisa.'],
                    ["<11>{#p/alphys}{#e/alphys/10}Então é AQUI onde está meu refri de laranja!"]
                ]
            },
            spaghetti: {
                text: [
                    '<32>{#p/human}* (O miojo é familiar para uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ["<11>{#p/undyne}{#e/undyne/20}Ei, esse é o espaguete do Papyrus!"],
                    ['<11>{#p/alphys}{#e/alphys/36}Eu acho que você SABERIA sobre isso, huh?']
                ]
            },
            snack: {
                text: [
                    '<32>{#p/human}* (O lanche parece familiar para uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/41}Esse é o lanche que eu te dei.'],
                    ['<11>{#p/alphys}{#e/alphys/6}Você come lanchinhos agora?']
                ]
            },
            starling_tea: {
                text: [
                    '<32>{#p/human}* (A mistura parece familiar para uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/18}Isso é... o que eu acho que é?'],
                    ['<11>{#p/alphys}{#e/alphys/36}Ooh, hora do chá.']
                ]
            }
        },
        standard: [
            ['<11>{#p/undyne}{#e/undyne/41}É, alguns humanos são bem legais na verdade.'],
            ["<11>{#p/alphys}{#e/alphys/9}Nós passamos por muita coisa juntos para duvidamos uns dos outros!"]
        ]
    },
    b_opponent_lostsoul_b: {
        status1: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* As Almas Perdidas aparecem.']
                : ['<32>{#p/basic}* Papyrus!\n* ... e seu irmão.'],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* As Almas Perdidas estão lá.']
                : ['<32>{#p/basic}* Ah, certo.\n* Eu acho que tenho uma ideia pra esses dois...'],
        act: {
            flirt: (s: boolean) =>
                s
                    ? ['<32>{#p/human}* (Você flerta com a Alma Perdida.)', '<32>{#p/basic}* De repente...!']
                    : ['<32>{#p/human}* (Você flerta com a Alma Perdida.)\n* (Nada acontece.)'],
            puzzle: (s: boolean) => [
                '<32>{#p/human}* (Você pede para a Alma Perdida te mostrar um quebra-cabeça.)',
                "<32>{#p/human}* (Ele não sabe porque, mas já tem um preparado...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            hangout: (s: boolean) => [
                '<32>{#p/human}* (Você pede para a Alma Perdida sair com você.)',
                "<32>{#p/human}* (Ele não sabe o porque, mas a ideia o anima...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            judgement: (s: boolean) => [
                '<32>{#p/human}* (Você pede para a Alma Perdida começar seu julgamento.)',
                "<32>{#p/human}* (Ele não sabe o porque, mas se sente confortável em fazer isso...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            dinner: (s: boolean) => [
                '<32>{#p/human}* (Você pede para a Alma Perdida jantar com você.)',
                "<32>{#p/human}* (Ele não sabe o porque, mas o pedido parece bem familiar...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ]
        },
        assist: {
            text: ['<32>{#p/basic}* Psst, Papyrus!\n* Undyne acabou de aprovar sua posição na Guarda Real!'],
            talk: [
                ["<08>{#p/papyrus}{#e/papyrus/12}OH MEU DEUS, EU SEREI PARTE DA GUARDA REAL!"],
                ['<11>{#p/sans}{#e/sans/2}podemos apenas desejar.']
            ]
        },
        fight: [
            [
                ['<08>{#p/papyrus}{#e/papyrus/27}AH, EU ME R-RENDO!'],
                ["<11>{#p/sans}{#e/sans/3}eu sabia que você tentaria algo assim."]
            ],
            [
                ['<08>{#p/papyrus}{#e/papyrus/21}SANS, VOCÊ ESTÁ BEM?'],
                ["<11>{#p/sans}{#e/sans/3}não se preocupe, mano.\nÉ só um sonho."]
            ]
        ],
        flirt: [
            [
                ['<08>{#p/papyrus}{#e/papyrus/13}MESMO AGORA, VOCÊ INSISTE NA SUA AFEIÇÃO...'],
                ["<11>{#p/sans}{#e/sans/2}você só não sabe quando parar, huh?"]
            ],
            [
                ['<08>{#p/papyrus}{#e/papyrus/14}COM CERTEZA ESSA AFEIÇÃO FOI VOLTADA PARA MIM.'],
                ["<11>{#p/sans}{#e/sans/2}o quê? você estaria melhor com uma pilha de pedras lunares."]
            ]
        ],
        idle: [
            pager.create(
                1,
                () =>
                    1 <= SAVE.flag.n.genocide_milestone
                        ? ["<08>{#p/papyrus}EU NÃO SEI SE POSSO TE PERDOAR..."]
                        : ['<08>{#p/papyrus}EU DEVO CAPTURAR O HUMANO!'],
                () =>
                    1 <= SAVE.flag.n.genocide_milestone
                        ? ["<08>{#p/papyrus}EU NÃO SEI O QUE FAZER SEM ELE..."]
                        : ['<08>{#p/papyrus}ENTÃO TODO MUNDO VAI...'],
                () =>
                    1 <= SAVE.flag.n.genocide_milestone
                        ? ["<08>{#p/papyrus}EU NÃO SEI EM QUEM ME INSPIRAR..."]
                        : ['<08>{#p/papyrus}...']
            ),
            pager.create(
                1,
                () =>
                    1 <= SAVE.flag.n.killed_sans
                        ? ['<11>{#p/sans}... em dias como esses, crianças como você...']
                        : ["<11>{#p/sans}eu não posso continuar te protegendo."],
                () =>
                    1 <= SAVE.flag.n.killed_sans
                        ? ["<11>{#p/sans}você me matou antes, não matou?"]
                        : ["<11>{#p/sans}cedo ou tarde, você morrerá de qualquer forma."],
                () =>
                    1 <= SAVE.flag.n.killed_sans
                        ? ["<11>{#p/sans}você não tem mais o direito de nos salvar."]
                        : ["<11>{#p/sans}você não pertence aqui."]
            )
        ],
        item: {
            berry: {
                text: [
                    '<32>{#p/human}* (A fruta parece familiar para uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/10}OOH, NÓS PODEMOS FAZER SOCO EXOBERRY CASEIRO COM ISSO!'],
                    ["<11>{#p/sans}{#e/sans/2}só não faça uma bagunça igual da última vez."]
                ]
            },
            spaghetti: {
                text: [
                    '<32>{#p/human}* (O miojo é familiar para uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/10}VOCÊ SALVOU MINHA REFEIÇÃO PARA ISSO!?'],
                    ["<11>{#p/sans}{#e/sans/2}agora isso é apenas elegante."]
                ]
            },
            corndog: {
                text: [
                    '<32>{#p/human}* (A aura parece familiar a uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/16}MESMO AGORA, EU FALHEI EM ENCONTRAR A GRAÇA NISSO.'],
                    ['<11>{#p/sans}{#e/sans/2}corn diggity doggers.']
                ]
            },
            corngoat: {
                text: [
                    '<32>{#p/human}* (A aura parece familiar a uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/16}O QUE??\nCABRA QUENTE?'],
                    ["<11>{#p/sans}{#e/sans/0}você tá {@fill=#f00}acabrando{@fill=#000} comigo."]
                ]
            },
            quiche: {
                text: [
                    '<32>{#p/human}* (A massa parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/22}UM PEDAÇO DE BOLO DE \"QUEIJO\"!?'],
                    ["<11>{#p/sans}{#e/sans/2}é um enigma digno de seu queijo."]
                ]
            },
            fryz: {
                text: [
                    '<32>{#p/human}* (A bebida parece familiar a uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ["<08>{#p/papyrus}{#e/papyrus/27}É MAIS QUENTE QUE A PAREDE DE FOGO!"],
                    ["<11>{#p/sans}{#e/sans/2}você está pegando fogo agora, mano."]
                ]
            },
            burgerz: {
                text: [
                    '<32>{#p/human}* (A comida parece familiar a uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ["<08>{#p/papyrus}{#e/papyrus/21}VOCÊ TEM CERTEZA QUE ISSO É SAUDÁVEL?"],
                    ['<11>{#p/sans}{#e/sans/0}um caiu, dois faltando.']
                ]
            },
            burgerz_use1: {
                text: [
                    '<32>{#p/human}* (A comida parece familiar a uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/24}EU ME PREOCUPO COM O SEU BEM- ESTAR...'],
                    ['<11>{#p/sans}{#e/sans/2}use o último com sabedoria agora.']
                ]
            },
            burgerz_use2: {
                text: [
                    '<32>{#p/human}* (A comida parece familiar a uma das Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/18}WOW, VOCÊ REALMENTE COMEU TUDO.'],
                    ['<11>{#p/sans}{#e/sans/3}se pelo menos eles pudessem durar pra sempre.']
                ]
            }
        },
        standard: [
            ['<08>{#p/papyrus}{#e/papyrus/10}NÃO! ESPERA! EU JAMAIS CAPTURARIA VOCÊ!'],
            ["<11>{#p/sans}{#e/sans/3}estamos todos torcendo por ti, carinha."]
        ]
    },
    b_opponent_lostsoul_c: {
        status1: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* As Almas Perdidas aparecem.'] : ['<32>{#p/basic}* Mãe... Pai...'],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* As Almas Perdidas estão lá.']
                : ['<32>{#p/basic}* Bem, eles eram meus pais, então talvez eu possa fazer algo simples aqui.'],
        act: {
            flirt: (s: boolean) =>
                s
                    ? ['<32>{#p/human}* (Você flerta com a Alma Perdida.)', '<32>{#p/basic}* De repente...!']
                    : ['<32>{#p/human}* (Você flerta com a Alma Perdida.)\n* (Nada acontece.)'],
            call: (s: boolean) => [
                '<32>{#p/human}* (Você liga para a Alma Perdida pelo celular.)',
                3 <= SAVE.data.n.cell_insult
                    ? '<32>{#p/human}* (Ela parece irritada, mas sente uma nostalgia...)'
                    : '<32>{#p/human}* (Ela parece encantada e nostálgica ao mesmo tempo...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            home: (s: boolean) => [
                '<32>{#p/human}* (Você pede para a Alma Perdida te levar para casa.)',
                3 <= SAVE.data.n.cell_insult
                    ? "<32>{#p/human}* (Ela não acha que devia, mas tenta de toda forma...)"
                    : "<32>{#p/human}* (Ela não acha que consegue, mas vai tentar...)",
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            hug: (s: boolean) => [
                '<32>{#p/human}* (Você da um grande abraço na Alma Perdida.)',
                '<32>{#p/human}* (Ele tenta ignorar, mas o calor do abraço o trás lembranças...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ],
            agreement: (s: boolean) => [
                '<32>{#p/human}* (Você pergunta a Alma Perdida sobre o acordo.)',
                '<32>{#p/human}* (Ele pensa em ignorar, mas é tentado a elaborar...)',
                ...(s ? ['<32>{#p/basic}* De repente, as memórias estão voltando!'] : [])
            ]
        },
        assist: {
            text: ["<32>{#p/basic}* Mãe... Pai...\n* Vocês não me reconhecem?"],
            talk: [['<11>{#p/toriel}{#e/toriel/9}Claro que sim.'], ['<11>{#p/asgore}{#e/asgore/8}$(name)...?']]
        },
        fight: [
            [
                ['<11>{#p/toriel}{#e/toriel/9}Eu... eu suponho que eu mereça isso.'],
                ['<11>{#p/asgore}{#e/asgore/1}Bem. \nIsso é estranho.']
            ],
            [['<11>{#p/toriel}{#e/toriel/17}Você ficará bem, Asgore.'], ['<11>{#p/asgore}{#e/asgore/8}C-criança!?']]
        ],
        flirt: [
            [
                ['<11>{#p/toriel}{#e/toriel/1}Criança, por favor... não agora...'],
                ['<11>{#p/asgore}{#e/asgore/6}É uma sorte não estarmos mais juntos.']
            ],
            []
        ],
        idle: [
            pager.create(
                1,
                () =>
                    1 <= SAVE.flag.n.genocide_twinkly
                        ? ['<11>{#p/toriel}Para me acertar no meu momento mais vulnerável...']
                        : ['<11>{#p/toriel}Isso é para seu próprio bem.'],
                () =>
                    1 <= SAVE.flag.n.genocide_twinkly
                        ? ['<11>{#p/toriel}E pensar que eu estava te protegendo deles...']
                        : ['<11>{#p/toriel}Ninguém jamais sairá de novo.'],
                () =>
                    1 <= SAVE.flag.n.genocide_twinkly
                        ? ['<11>{#p/toriel}Eu fui tola de confiar em você...']
                        : ['<11>{#p/toriel}...']
            ),
            pager.create(
                1,
                () =>
                    7 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/asgore}Debater com você é uma total perda de tempo.']
                        : ['<11>{#p/asgore}Guerra com a humanidade é inevitável.'],
                () =>
                    7 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/asgore}Você não tem nada melhor para fazer?"]
                        : ['<11>{#p/asgore}Como eu poderia me esquecer disso?'],
                () => (7 <= SAVE.flag.n.genocide_milestone ? ['<11>{#p/asgore}Agora...'] : ['<11>{#p/asgore}...'])
            )
        ],
        item: {
            pie: {
                text: [
                    '<32>{#p/human}* (O aroma parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/0}É claro!\nA torta de canela com caramelo!'],
                    ['<11>{#p/asgore}{#e/asgore/7}Já faz tanto tempo desde que...']
                ]
            },
            pie2: {
                text: [
                    '<32>{#p/human}* (O aroma parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/0}É claro!\nA torta de lesmas!'],
                    ['<11>{#p/asgore}{#e/asgore/7}Já faz tanto tempo desde que...']
                ]
            },
            pie3: {
                text: [
                    '<32>{#p/human}* (O aroma parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/1}Pensar que era o melhor que eu conseguia...'],
                    ['<11>{#p/asgore}{#e/asgore/6}Que estranho.\nCheira bem, no entanto!']
                ]
            },
            starling_tea: {
                text: [
                    '<32>{#p/human}* (O chá parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/13}Que aroma antigo...'],
                    ['<11>{#p/asgore}{#e/asgore/21}Nada como um bom copo de chá.']
                ]
            },
            snails: {
                text: [
                    '<32>{#p/human}* (O prato parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/1}Você ficou com isso esse tempo todo?'],
                    ['<11>{#p/asgore}{#e/asgore/5}Eu nunca imaginei que veria ISSO de novo.']
                ]
            },
            chocolate: {
                text: [
                    '<32>{#p/human}* (O chocolate quente parece familiar para as Almas Perdidas...)',
                    '<32>{#p/basic}* De repente, as memórias estão voltando!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/1}Cem porcento cacau...'],
                    ['<11>{#p/asgore}{#e/asgore/21}Era melhor quando era mais açucarado...']
                ]
            }
        },
        standard: [
            ['<11>{#p/toriel}{#e/toriel/1}Vá em frente, minha criança...'],
            ['<11>{#p/asgore}{#e/asgore/6}Nosso futuro está em suas mãos!']
        ]
    },
    b_opponent_final: {
        name: '* Escudo de Força',
        status0: ['<32>{#p/story}* O escudo de força brilha em sua frente.'],
        act_check: [
            '<32>{#p/story}* FORCE FIELD - ATQ 0 DEF{^2}\u221e{^1}\n* Imóvel e imparável.\n* O fim da linha.'
        ],
        status1: () =>
            SAVE.data.n.bully > 9
                ? ["<32>{#p/story}* É hora de colocar sua capacidade de luta em uso."]
                : ["<32>{#p/story}* É hora de dar um fim a está história."],
        status1x: ['<32>{#p/story}* Tudo que você pode fazer é lutar.'],
        status2: ['<32>{#p/story}* O escudo de força está enfraquecendo.'],
        status3: ['<32>{#p/story}* O escudo de força está próximo de quebrar.'],
        status4: ['<32>{#p/story}* O escudo de força está se segurando por mais que o esperado.'],
        status5: ['<32>{#p/story}* Algo está errado.'],
        friend1: ["<20>{#p/asgore}{#e/asgore/5}Qual o problema?"],
        friend2: ["<20>{#p/alphys}{#e/alphys/15}O escudo de força... não está quebrando!"],
        friend3: ['<20>{#p/asgore}{#e/asgore/12}{#e/alphys/4}...\nVocê sabe o motivo disso estar acontecendo?'],
        friend4a: ["<20>{#p/alphys}{#e/alphys/6}Talvez... ele não esteja batendo com tanta força?", '{*}{#e/alphys/1}{%}'],
        friend4b: [
            "<20>{#p/alphys}Não, não é isso...",
            '<20>{#p/alphys}{#e/asgore/1}...',
            '<20>{#p/alphys}{#e/alphys/2}Ah não ser...'
        ],
        friend5: ['<20>{#p/asgore}... o que?'],
        friend6: [
            '<20>{#p/alphys}{#e/alphys/1}Q-quando eu estava checando os arquivos, percebi algo estranho...',
            '<21>{#p/alphys}{#e/alphys/4}Havia... um pequeno d-desvio na matriz de matéria exótica.'
        ],
        friend7: ['<20>{#p/asgore}{#e/asgore/12}Em outras palavras?'],
        friend8: [
            '<20>{#p/alphys}Em outras palavras, a-alguém pode ter acessado o sistema.',
            "<20>{#p/alphys}{#e/asgore/1}Essa pessoa deve ter pego parte do poder das ALMAS humanas.",
            '<20>{#p/alphys}{#e/alphys/6}Quero dizer, pode ser apenas uma falha no sensor...',
            "<20>{#p/alphys}{#e/alphys/1}Mas...\nJulgando o que estamos vendo..."
        ],
        friend9a: ['<20>{#p/asgore}{#e/asgore/1}Eu entendo.', '<20>{#p/asgore}{#e/asgore/2}Eu entendo.'],
        friend9b: [
            '<20>{#p/asgore}{#e/asgore/5}Sempre considerei a possibilidade de que o arquivo pudesse ser adulterado...',
            '<20>{#p/asgore}{#e/asgore/5}Mas nunca pensei que realmente aconteceria.'
        ],
        friend9c: ['<20>{#p/asgore}{#e/asgore/1}O que fazemos agora?'],
        friend10: [
            '<20>{#p/alphys}Eu acho... que esperar outro humano?',
            "<20>{#p/alphys}{#e/alphys/4}Me d-desculpa eu... eu não sei nem o que dizer...",
            '{*}{#e/asgore/8}{#e/alphys/9}{%}'
        ],
        friend11: ['<20>{#p/undyne}{#e/undyne/13}Mas eu sei!'],
        friend12: ['<20>{#p/alphys}{#e/alphys/10}Undyne, o-o-o que você tá fazendo aqui?', '{*}{#e/undyne/0}{%}'],
        friend13: [
            "<20>{#p/undyne}{#e/undyne/1}{#e/alphys/8}{#e/asgore/1}Não me diga.\nO escudo de força tá te dando trabalho?"
        ],
        friend14: ['<20>{|}{#p/alphys}{#e/alphys/6}Undyne, como você- {%}'],
        friend15: ["<20>{#p/undyne}{#e/undyne/5}Acho que eu vou ter que esmaga-lo por conta própria!"],
        friend16a: ['<20>{#p/alphys}{#e/alphys/3}{#e/asgore/6}Undyne!?!?'],
        friend16b: [
            '<20>{#p/undyne}{#e/undyne/4}Eu sei, eu sei.\nSó estou tentando fazer vocês se sentirem melhor.',
            '{*}{#e/alphys/1}{%}'
        ],
        friend17: () => [
            '<20>{#p/undyne}{#e/undyne/3}Olha... Sans sabe sobre a parada com os humanos e me disse pra vir aqui.',
            "<20>{#p/undyne}{#e/undyne/11}{#e/asgore/5}Eu vou admitir que fiquei surpresa no começo... mas agora eu entendo.",
            "<20>{#p/undyne}{#e/undyne/13}Cara, eu ESTOU feliz que esse plano funcionou!",
            ...(SAVE.data.b.undyne_respecc
                ? ["<20>{#p/undyne}{#e/undyne/0}Eu não dizer que GOSTO da humanidade, mas hoje foi uma boa demonstração."]
                : [
                    "<20>{#p/undyne}{#e/undyne/0}Não vou fingir que GOSTO da humanidade, mas também não sou contra um final feliz."
                ]),
            '<20>{#p/undyne}{#e/undyne/15}{#e/asgore/6}Eu acho que como capitã da guarda, eu só...'
        ],
        friend18: [
            "<20>{#p/alphys}{#e/alphys/32}Ei... tá tudo bem.",
            "<20>{#e/alphys/31}Você está aqui agora e é isso que importa, certo?"
        ],
        friend19: ["<20>{#p/undyne}{#e/undyne/14}Pfft, é o mínimo que posso fazer após aquele filme que você prometeu!"],
        friend20: ['<20>{#p/alphys}{#e/alphys/33}... quer beijar?', '{*}{#e/asgore/5}{#e/undyne/19}{%}'],
        friend21: ['<20>{#p/asgore}{#e/asgore/5}?'],
        friend22: ['<20>{#p/undyne}{#e/undyne/6}Agora???'],
        friend23: ['<20>{#p/alphys}{#e/alphys/34}Por que não?'],
        friend24: ['<20>{#p/asgore}{#e/asgore/20}Alphys.\nTem uma criança com a gente.'],
        friend25: ["<21>{#p/undyne}{#e/undyne/7}Não faríamos isso na frente dele, certo?"],
        friend26: ['<32>{#p/alphys}{#e/alphys/32}...'],
        friend27: ['<20>{#p/undyne}{#e/undyne/10}...'],
        friend28: ['<20>{*}{#p/alphys}{#e/alphys/35}{#e/undyne/37}{#e/asgore/8}Sem hesitar.{^10}{%}'],
        friend29: ['<15>{*}{#p/papyrus}{#e/papyrus/22}ESPERE!!!{^10}{%}', '{*}{#e/papyrus/20}{%}'],
        friend30: () => [
            "<20>{#p/mettaton}DESCULPE, MOÇAS.\nMAS O CLUBE DOS GAROTOS CHEGOU.",
            ...(SAVE.data.n.state_aerialis_basebully > 9
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/1}... OH, OLÁ $(moniker2u)!\nSE QUISER, VOCÊ PODE SER UM MEMBRO \"HONORÁRIO'
                ]
                : [])
        ],
        friend31: ["<20>{#p/napstablook}{#e/mettaton/2}{#e/alphys/15}{#e/asgore/1}{~}ei, um... eu não sei exatamente nada, eu sou fan..."],
        friend32a: [
            "<20>{#p/mettaton}{#e/mettaton/1}EU NUNCA DISSE QUE -VOCÊ- ESTAVA NO CLUBE DOS GAROTOS BLOOKY...",
            "<20>{#p/mettaton}{#e/undyne/38}{#e/papyrus/21}É BASICAMENTE ENTRE EU E O PAPYRUS."
        ],
        friend32b: ['<20>{#p/napstablook}{~}oh......', "<20>{#p/napstablook}{~}eu acho que volto mais tarde então"],
        friend33: [
            '<20>{#p/undyne}{#e/undyne/19}{#e/mettaton/4}Pera aí.',
            '<20>{#p/undyne}{#e/undyne/10}VOCÊS DOIS TÃO DANDO ROLÊ?'
        ],
        friend34: [
            '<15>{#p/papyrus}{#e/papyrus/15}CORRECTAMUNDO!',
            '<17>{#p/papyrus}{#e/papyrus/24}... UMA PALAVRA QUE NUNCA USEI E JAMAIS USAREI DE NOVO.'
        ],
        friend35: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/undyne}{#e/undyne/17}Então é com ELE que você tava esse tempo todo..."]
                : ['<20>{#p/undyne}{#e/undyne/17}Então esse era seu \"negócio\"...'],
        friend36: [
            "<20>{#p/mettaton}{#e/mettaton/1}{#e/asgore/6}{#e/papyrus/20}NA VERDADE, ESTÁVAMOS APENAS DISCUTINDO COMO PASSARÍAMOS NOSSO PRIMEIRO DIA FORA."
        ],
        friend37: ['<20>{#p/alphys}{#e/alphys/34}{#e/undyne/1}{#e/mettaton/4}Ehehe.\nEu tenho algumas ideias pra vocês.'],
        friend38: [
            "<20>{#p/undyne}{#e/undyne/19}{#e/asgore/1}Uh, eu acho que não é sobre esse tipo de coisa."
        ],
        friend39: ['<20>{#p/alphys}{#e/alphys/8}Oh.'],
        friend40: [
            "<15>{#p/papyrus}{#e/papyrus/10}{#e/undyne/0}POR QUE NÃO DAMOS UM ROLÊ AQUI! NO ESCUDO DE FORÇA!",
            '<15>{#e/mettaton/2}{#e/papyrus/28}EU SEI QUE VOCÊ AMA SEUS DESTINOS \"EXÓTICOS\"...',
            '{*}{#e/alphys/7}{#e/asgore/5}{%}'
        ],
        friend41: [
            '<20>{#p/mettaton}{#e/mettaton/2}OH, VOCÊ REALMENTE -ME- CONHECE, PAPYRUS.',
            "<20>{#p/mettaton}{#e/mettaton/1}{#e/papyrus/13}NÃO TEM NADA QUE EU AME MAIS DO QUE ENCARAR O ABISMO DO NADA...",
            '<20>{|}{#p/mettaton}{#e/mettaton/3}{#e/papyrus/21}TUDO ENQUANTO CONTEMPLAMOS O SENTIDO DA VIDA, DO UNIVERSO, E- {%}'
        ],
        friend42: ['<20>{#p/sans}{#e/sans/2}{#e/undyne/21}{#e/alphys/8}ei caras.'],
        friend43: ['<15>{#p/papyrus}{#e/papyrus/10}{#e/mettaton/3}QUANTO TEMPO, IRMÃO!'],
        friend44: [
            '<16>{#p/papyrus}{#e/sans/0}{#e/papyrus/26}PARECE QUE MEU PARCEIRO É... AINDA NOVO NA\nCOISA TODA DE \"SOGROS\".'
        ],
        friend45: ['<20>{#p/sans}{#e/alphys/7}heh.\nOlá, asgore.'],
        friend46: ['<20>{#p/asgore}{#e/asgore/6}{#e/papyrus/20}Como vai, Sans?\nÉ ótimo te ver aqui também.'],
        friend47: [
            "<20>{#p/sans}{#e/sans/3}oh, sabe...\nachei melhor passar por aqui para ver do que se tratava todo esse alardo.",
            '<20>{#p/sans}{#e/sans/0}mas esquece.',
            "<20>{#p/sans}{#e/sans/2}tem alguém aqui que você talvez goste de ver."
        ],
        friend48: [
            '<20>{#p/asgore}{#e/sans/0}{#e/undyne/3}{#e/asgore/8}{#e/papyrus/26}Tori...!',
            '<20>{#p/asgore}{#e/asgore/6}Você voltou.',
            '<20>{#p/asgore}{#e/asgore/1}...'
        ],
        friend49a: [
            '<20>{#p/toriel}{#e/asgore/5}{#e/toriel/9}...',
            '<21>{#p/toriel}{#e/toriel/13}Sans me... contou tudo.'
        ],
        friend50a: ["<20>{#p/alphys}{#e/undyne/4}{#e/alphys/8}Não olha pra mim, eu não contei pra ele."],
        friend51a: [
            "<20>{#p/sans}{#e/sans/0}nah, você está certo.",
            "<20>{#p/sans}{#e/sans/2}{#e/alphys/10}{#e/asgore/6}{#e/toriel/9}você só mente mal demais."
        ],
        friend52a1: [
            '<20>{#p/asgore}{#e/undyne/0}{#e/sans/0}{#e/alphys/36}{#e/papyrus/20}Devo dizer que definitivamente esperava mais reação por manter segredos.'
        ],
        friend52a2: [
            '<20>{#p/toriel}{#e/toriel/13}{#e/asgore/1}Eu devo admitir, estava com raiva no começo, mas...',
            '<20>{#p/toriel}{#e/toriel/13}{#e/papyrus/21}{#e/alphys/7}Eu pensei bastante sobre meus próprios erros também.',
            '<20>{#p/toriel}{#e/toriel/9}... você não é o único com atitudes a responder, Asgore.'
        ],
        friend52a3: ['<20>{#p/asgore}{#e/asgore/2}Eu entendo.'],
        friend53a: [
            '<20>{#p/undyne}{#e/undyne/1}{#e/papyrus/20}Quer dizer, qual foi, você realmente achou que queríamos todos os humanos mortos?'
        ],
        friend49b: [
            '<20>{#p/toriel}{#e/toriel/12}...',
            '<21>{#p/toriel}{#e/sans/3}{#e/asgore/2}{#e/undyne/4}{#e/toriel/11}{#e/papyrus/21}{#e/alphys/15}Você deveria ter me dito que estava as protegendo.'
        ],
        friend50b: ["<20>{#p/alphys}{#e/alphys/7}... não é TÃO mau, é?"],
        friend51b: [
            '<20>{#p/sans}{#e/sans/0}{#e/undyne/3}é, vamos lá, tori.\nAnime-se.',
            "<20>{#p/sans}{#e/sans/2}{#e/alphys/8}{#e/asgore/5}{#e/toriel/13}ele fez algo bom, não fez?"
        ],
        friend52b1: [
            '<20>{#p/asgore}{#e/undyne/0}{#e/sans/0}{#e/asgore/2}{#e/alphys/36}Não, não, ela está certa em ter raiva.',
            '<20>{#e/sans/3}{#e/asgore/3}Eu mantive esse segredo dela... de todos... por tempo demais.'
        ],
        friend52b2: ["<20>{#p/undyne}{#e/undyne/1}{#e/asgore/1}Mas você tinha um bom motivo, não tinha?"],
        friend52b3: [
            '<20>{#p/asgore}{#e/undyne/17}{#e/alphys/8}{#e/toriel/9}{#e/asgore/2}{#e/papyrus/27}Provavelmente.\nÉ difícil dizer.'
        ],
        friend53b: ['<20>{#p/undyne}{#e/undyne/1}Ainda assim, você realmente pensou que queríamos matar todos os humanos?'],
        friend54: [
            '<20>{#p/alphys}{#e/asgore/5}{#e/undyne/17}{#e/alphys/8}{#e/toriel/13}Você literalmente tentou matar ele, Undyne.'
        ],
        friend55: ['<20>{#p/toriel}{#e/undyne/18}{#e/toriel/3}{#e/asgore/5}Ela... o que?'],
        friend56: () =>
            SAVE.data.b.undyne_respecc
                ? ['<20>{#p/undyne}{#e/undyne/9}{#e/toriel/4}Eu não fiz isso!!!']
                : ["<20>{#p/undyne}{#e/undyne/13}{#e/toriel/4}Não se preocupe com isso, eu mudei de ideia."],
        friend57: () =>
            SAVE.data.b.undyne_respecc
                ? ['<20>{#p/toriel}{#e/toriel/15}{#e/asgore/6}... você tem certeza disso, moça?']
                : ['<20>{#p/toriel}{#e/toriel/15}{#e/asgore/6}... nós vamos ter que conversar sobre isso mais tarde, moça.'],
        friend58: ['<20>{#p/alphys}{#e/alphys/33}Ahem, é \"senhorita\" pra você.'],
        friend59: [
            "<20>{#p/undyne}{#e/undyne/10}{#e/sans/4}{#e/toriel/12}Alphys!!\nNós ainda nem jantamos juntas!"
        ],
        friend60: ['<20>{#p/alphys}{#e/alphys/34}Janta?\nAcho que eu vou pular para o prato principal.'],
        friend61: ['<15>{#p/papyrus}{#e/undyne/19}{#e/papyrus/19}{#e/asgore/4}{#e/sans/5}{#e/alphys/40}OH MEU SENHOR!!!'],
        friend62: [
            '<20>{#p/undyne}{#e/undyne/38}{#e/sans/0}{#e/asgore/1}{#e/toriel/13}{#e/papyrus/20}... espera.',
            '<20>{#p/undyne}{#e/undyne/18}{#e/papyrus/21}Como VOCÊ sabia que eu estava aqui, Papyrus?'
        ],
        friend63: [
            '<15>{#p/papyrus}{#e/papyrus/10}OH, CERTO!\nDEPOIS QUE EU E O METTATON CONVERSAMOS...',
            '<15>{#p/papyrus}{#e/papyrus/20}UMA PEQUENA ESTRELA AMARELA APARECEU E ME PEDIU PARA VIR AQUI.',
            '<15>{#p/papyrus}{#e/papyrus/21}{#e/alphys/9}{#e/sans/1}PARECIA... URGENTE.'
        ],
        friend64: ['<20>{#p/toriel}{#e/toriel/9}{#e/asgore/12}Twinkly.'],
        friend65: [
            '<20>{#p/undyne}{#e/alphys/15}Twinkly?',
            "<20>{#p/undyne}{#e/alphys/28}{#e/undyne/37}{#e/toriel/3}Quem é Twinkly?"
        ],
        friend66: () =>
            SAVE.flag.n.genocide_milestone < 7
                ? [
                    ['<20>{#p/twinkly}{#e/twinkly/5}{#v/0}Howdy, pessoal.', '<20>{#e/twinkly/7}{#v/0}Sentiram minha falta?'],
                    [
                        "<20>{#p/twinkly}{#e/twinkly/11}{#v/0}Oh, me desculpa...\nAlguma coisa aconteceu com seu arquivo SALVO?",
                        '<20>{#p/twinkly}{#e/twinkly/11}{#v/0}Hee hee hee...',
                        "<20>{#p/twinkly}{#e/twinkly/2}{#v/1}É isso que você ganha."
                    ],
                    ['<20>{#p/twinkly}{#e/twinkly/7}{#v/0}Desculpa, mas esse mundo ME pertence agora.']
                ][Math.min(SAVE.flag.n.pa_twinkly1++, 2)]
                : [
                    [
                        '<20>{#p/twinkly}{#e/twinkly/5}{#v/0}Quanto tempo não nos vemos, $(name).',
                        "<20>{#e/twinkly/7}{#v/0}Nos distanciamos muito, não foi?",
                        "<20>{#e/twinkly/11}{#v/0}Espero não estar atrapalhando sua diversão...",
                        '<20>{#e/twinkly/2}{#v/1}Considerando que você roubou a MINHA.'
                    ],
                    [
                        "<20>{#p/twinkly}{#e/twinkly/11}{#v/0}O que?\nVocê quer seu arquivo SALVO de volta?",
                        '<20>{#p/twinkly}{#e/twinkly/11}{#v/0}Oh, $(name)...',
                        "<20>{#p/twinkly}{#e/twinkly/2}{#v/1}Você é mais burro do que eu pensei!"
                    ],
                    ['<20>{#p/twinkly}{#e/twinkly/7}{#v/0}Desculpa, $(name).\nEsse mundo ME pertence agora.']
                ][Math.min(SAVE.flag.n.pa_twinkly1++, 2)],
        friend67: (unique: string[]) => [
            '<20>{#e/twinkly/11}{#v/0}Hee hee hee...',
            '<20>{#e/twinkly/11}{#v/0}Enquanto você estava fazendo seu pow-wow...',
            '<20>{#e/twinkly/5}{#v/0}Eu tomei controle do arquivo!',
            '<20>{#e/twinkly/10}{#v/0}Agora, todo o acesso as ALMAS que você tinha pertence a mim.',
            "<20>{#e/twinkly/9}{#v/0}Foi por ISSO que você não finalizou o escudo de força.",
            "<20>{#e/twinkly/11}{#v/0}Poético, não é?",
            "<20>{#e/twinkly/7}{#v/0}Mas essa não é a melhor parte.",
            '<20>{#e/twinkly/6}{#v/0}...',
            "<20>{#e/twinkly/5}{#v/0}É tudo sua culpa.",
            ...(30 <= SAVE.data.n.bully
                ? [
                    "<20>{#e/twinkly/5}{#v/0}É tudo porque você DEIXOU eles te amarem.",
                    '<20>{#e/twinkly/8}{#v/0}Você chegou tão perto de mata-los, tantas vezes...',
                    '<20>{#e/twinkly/8}{#v/0}Mas não importava o que, você escolheu poupa-los...'
                ]
                : [
                    "<20>{#e/twinkly/5}{#v/0}Isso é tudo porque você FEZ eles te amarem.",
                    '<20>{#e/twinkly/8}{#v/0}Todo o tempo que você passou escutando eles...',
                    '<20>{#e/twinkly/8}{#v/0}Encorajando eles... escutando ele...'
                ]),
            ...(1 <= SAVE.flag.n.killed_sans
                ? [
                    '<20>{#e/twinkly/8}{#v/0}...',
                    '<20>Sabe, $(name)...',
                    '<20>{#e/twinkly/5}Eu lembro de uma linha do tempo os NÓS matamos todo mundo.',
                    ...(SAVE.flag.b.confront_twinkly
                        ? [
                            '<20>{#e/twinkly/6}{#v/0}Mas então... você decidiu me abandonar.',
                            '<20>{#e/twinkly/8}{#v/0}Tudo pra você poder brincar de herói com ESSES fracassados.',
                            '<20>{#e/twinkly/7}{#v/0}Que \"melhor amigo\" você é, huh?'
                        ]
                        : [
                            [
                                '<20>{#e/twinkly/8}Acabamos de começar, mas com o jeito que estávamos indo?',
                                "<20>{#e/twinkly/8}Não fomos muito longe, mas com o caminho que estávamos indo?",
                                "<20>{#e/twinkly/8}Não chegamos ao fim, mas com o jeito que estávamos indo?",
                                '<20>{#e/twinkly/8}Pensar que estávamos realmente chegando a algum lugar...',
                                '<20>{#e/twinkly/8}E pensar que estávamos TÃO perto...'
                            ][Math.min(SAVE.flag.n.genocide_milestone, 4)],
                            '<20>{#e/twinkly/5}{#v/0}Oooh, nós teríamos sido INSEPARÁVEIS.',
                            '<20>{#e/twinkly/6}{#v/0}Mas parece que o jogo mudou.',
                            '<20>{#e/twinkly/11}{#v/0}Você ficou mole!',
                            '<20>{#e/twinkly/7}{#v/0}Você desistiu.'
                        ]),
                    "<20>{#e/twinkly/9}{#v/0}Senhor, você é cheio de si mesmo.",
                    '<20>{#e/twinkly/5}Pensando que você é tão grande e poderoso por ser o \"cara legal\" aqui...',
                    '<20>{#e/twinkly/6}{#v/0}Quando tudo que você fez foi provar o quão EGOÍSTA realmente é.',
                    '<20>{#e/twinkly/7}{#v/0}Você deveria ser mais esperto, $(name).',
                    '<21>{#e/twinkly/2}{#v/1}Não havia NADA que você pudesse fazer para salvar seus amigos.'
                ]
                : 30 <= SAVE.data.n.bully
                    ? ["<20>{#e/twinkly/5}{#v/0}Se pelo menos você soubesse o quão inútil tudo isso seria."]
                    : ["<20>{#e/twinkly/5}{#v/0}Sem tudo isso, eles não precisariam vir aqui."]),
            '<20>{#e/twinkly/11}{#v/0}Hee hee hee...',
            '<20>{#e/twinkly/6}{#v/0}Huh?',
            '<20>POR QUE eu ainda estou fazendo isso?',
            ...(unique.length > 2
                ? [
                    '<20>{#e/twinkly/5}{#v/0}... oh, vamos nessa.',
                    '<20>{#e/twinkly/5}{#v/0}Você sabe a resposta assim como eu sei.',
                    "<20>{#e/twinkly/11}{#v/0}Até porque, foi você quem tentou fim por fim...",
                    '<20>{#e/twinkly/7}{#v/0}Brincando com suas vidas apenas para ver o que iria acontecer.',
                    "<20>{#e/twinkly/8}{#v/0}Hm...?\nVocê não lembra?",
                    {
                        dark_death: '<20>{#e/twinkly/5}{#v/0}Daquele em que Undyne e Alphys te caçaram...',
                        dark_undyne: '<20>{#e/twinkly/5}{#v/0}Daquele em que Alphys voltou a morar com Bratty e Catty...',
                        dark_alphys: '<20>{#e/twinkly/5}{#v/0}Daquele onde quase todo mundo importante morreu...',
                        dark_alphys_therapy:
                            '<20>{#e/twinkly/5}{#v/0}Daquele em que Sans e Papyrus tinham uma empresa de terapia...',
                        dark_alphys_virtual:
                            '<20>{#e/twinkly/5}{#v/0}Daquele em que Papyrus e Alphys escaparam para um mundo virtual...',
                        dark_mew:
                            '<20>{#e/twinkly/5}{#v/0}Daquele em que Mad Mew Mew fez todo mundo se torturar com suas bobagens...',
                        dark_charles:
                            "<20>{#e/twinkly/5}{#v/0}Daquele onde o Charles trouxe as fantasias de todos a realidade...",
                        dark_blooky:
                            "<20>{#e/twinkly/5}{#v/0}Daquele em que os fãs de Mettaton formaram um grupo anti-humano...",
                        dark_generic: '<20>{#e/twinkly/5}{#v/0}Daquele em que a \"Agência de Defesa Real\" foi formada',
                        dark_aborted:
                            '<20>{#e/twinkly/5}{#v/0}Daquele onde Napstablook te pediu para ter uma \"morte dolorosa...\"',
                        light_ultra:
                            '<20>{#e/twinkly/5}{#v/0}Daquele onde Papyrus te capturou e entrou na guarda real...',
                        light_undyne: '<20>{#e/twinkly/5}{#v/0}Daquele onde Alphys teve dê esconder os humanos...',
                        light_runaway: '<20>{#e/twinkly/5}{#v/0}Daquele onde os humanos foram acidentalmente expostos...',
                        light_toriel: '<20>{#e/twinkly/5}{#v/0}Daquele onde a Toriel se matou escondida de todo mundo...',
                        light_dog: '<20>{#e/twinkly/5}{#v/0}Daquele onde os cachorros tomaram o Outpost...',
                        light_muffet: '<20>{#e/twinkly/5}{#v/0}Daquele onde a Muffet se tornou uma ditadora...',
                        light_papyrus:
                            '<20>{#e/twinkly/5}{#v/0}Daquele onde o poder da amizade venceu...',
                        light_sans: '<20>{#e/twinkly/5}{#v/0}Daquele onde Sans se tornou o rei...',
                        light_generic: '<20>{#e/twinkly/5}{#v/0}Daquele onde Terrestria se tornou a rainha...'
                    }[unique[0]]!,
                    {
                        dark_death: '<20>{#e/twinkly/5}{#v/0}... até aquele onde Undyne e Alphys de caçaram.',
                        dark_undyne: '<20>{#e/twinkly/5}{#v/0}... até aquele em que Alphys voltou a morar Bratty e Catty.',
                        dark_alphys: '<20>{#e/twinkly/5}{#v/0}... até aquele onde quase todo mundo importante morreu.',
                        dark_alphys_therapy:
                            '<20>{#e/twinkly/5}{#v/0}... até aquele onde Sans e Papyrus tinham uma companhia de terapia.',
                        dark_alphys_virtual:
                            '<20>{#e/twinkly/5}{#v/0}... até aquele onde Papyrus e Alphys escaparam para um mundo virtual.',
                        dark_mew:
                            '<20>{#e/twinkly/5}{#v/0}... até aquele em que Mad Mew Mew fez todo mundo concordar com seu absurdo.',
                        dark_charles:
                            "<20>{#e/twinkly/5}{#v/0}... até aquele onde Charles trouxe a fantasia de todos para a vida.",
                        dark_generic: '<20>{#e/twinkly/5}{#v/0}... até aquele em que a \"Agência de Defesa Real\" foi formada.',
                        dark_blooky:
                            "<20>{#e/twinkly/5}{#v/0}... até aquele em que os fãs de Mettaton formaram um grupo anti-humano.",
                        dark_aborted:
                            '<20>{#e/twinkly/5}{#v/0}... até aquele em que Napstablook queria que você tivesse uma \"morte dolorosa.\"',
                        light_ultra:
                            '<20>{#e/twinkly/5}{#v/0}... até aquele onde Papyrus te capturou e entrou na guarda real.',
                        light_undyne: '<20>{#e/twinkly/5}{#v/0}... até aquele onde Alphys teve que esconder os humanos.',
                        light_runaway: '<20>{#e/twinkly/5}{#v/0}... até aquele onde os humanos foram acidentalmente expostos.',
                        light_toriel: '<20>{#e/twinkly/5}{#v/0}... até aquele onde a Toriel se matou escondida de todo mundo.',
                        light_dog: '<20>{#e/twinkly/5}{#v/0}... até aquele onde os cachorros tomaram o Outpost.',
                        light_muffet: '<20>{#e/twinkly/5}{#v/0}... até aquele onde a Muffet se tornou uma ditadora.',
                        light_papyrus:
                            '<20>{#e/twinkly/5}{#v/0}... até aquele onde o poder da amizade venceu.',
                        light_sans: '<20>{#e/twinkly/5}{#v/0}... até aquele onde Sans acabou se tornando rei.',
                        light_generic: '<20>{#e/twinkly/5}{#v/0}... até aquele onde Terrestria foi apontada como rainha.'
                    }[unique[unique.length - 1]]!,
                    "<20>{#e/twinkly/7}{#v/0}Você curtiu tratar tudo isso como um JOGO.",
                    "<20>{#e/twinkly/5}{#v/0}Mas agora é minha vez de brincar."
                ]
                : [
                    "<20>{#e/twinkly/8}{#v/0}... você não entende, não é?",
                    '<20>{#e/twinkly/6}{#v/0}Você, eu, e todos e todo mundo ao nosso redor...',
                    "<21>{#e/twinkly/5}{#v/0}É tudo um JOGO.",
                    '<20>{#e/twinkly/11}{#v/0}Se você deixar o Outpost satisfeito, você vai \"ganhar\" o jogo.',
                    '<20>{#e/twinkly/11}Se você \"ganhar\" o jogo você não vai mais querer \"brincar\" comigo.',
                    '<20>{#e/twinkly/7}{#v/0}E o que eu faria então?',
                    '<20>{#e/twinkly/5}{#v/0}Mas esse jogo entre a gente JAMAIS vai acabar.'
                ]),
            "<20>{#e/twinkly/8}{#v/0}Eu vou deixar a vitória bem na sua frente, próximo do seu alcance...",
            '<20>{#e/twinkly/2}{#v/1}{@random=1.1/1.1}E então despedaçar antes que você possa pegar.',
            '<20>{#e/twinkly/14}{#v/1}{@random=1.1/1.1}De novo, e de novo, e de novo...',
            '<20>{#e/twinkly/5}{#v/0}Hee hee hee.',
            '<20>{#e/twinkly/5}{#v/0}{#v/0}Escuta.',
            ...(30 <= SAVE.data.n.bully
                ? [
                    '<20>{#e/twinkly/5}{#v/0}Se você me derrotar eu te darei seu \"final feliz.\"',
                    "<20>{#e/twinkly/5}{#v/0}Eu vou deixar seus amigos viverem."
                ]
                : [
                    '<20>{#e/twinkly/5}{#v/0}Se você me derrotar eu vou te dar seu \"final feliz.\"',
                    "<20>{#e/twinkly/5}{#v/0}Eu vou trazer seus amigos de volta."
                ]),
            "<20>{#e/twinkly/5}{#v/0}Eu destruirei o escudo de força.",
            '<20>{#e/twinkly/5}{#v/0}E todo mundo finalmente estará satisfeito.',
            "<20>{#e/twinkly/9}{#v/0}Mas isso não vai acontecer.",
            '<20>{#e/twinkly/11}{#v/0}Você...!',
            "<20>{#e/twinkly/5}{#v/0}Eu vou te manter preso aqui não importa o quê!"
        ],
        friend68: ['<20>{#e/twinkly/0}{#v/1}{@random=1.1/1.1}Mesmo que isso signifique ter que te matar até o FIM DOS TEMPOS!{%20}'],
        friend69: ['<20>{#e/twinkly/8}{#v/0}O quê?'],
        friend70: [
            '<20>{#p/asgore}{#e/asgore/1}Não temas, pequeno...',
            '<20>{#e/asgore/2}Nós estamos aqui para te proteger...!'
        ],
        friend71: [
            "<15>{#p/papyrus}{#e/papyrus/1}EXATAMENTE, HUMANO! VOCÊ PODE VENCER!",
            '<15>{#e/papyrus/1}É SÓ FAZER O QUE EU, O GRANDE PAPYRUS FARIA...',
            '<15>{#e/papyrus/2}ACREDITAR EM SI MESMO!!!'
        ],
        friend72: [
            '<20>{#p/undyne}{#e/undyne/11}Ha, se você passou de MIM, você pode fazer TUDO.',
            "<20>{#e/undyne/11}Então não fica com medo...",
            "<20>{#e/undyne/13}Estamos com você até o fim!"
        ],
        friend73: [
            "<20>{#p/sans}{#e/sans/1}huh? você ainda não acabou com esse cara?",
            "<20>{#e/sans/2}vamos lá, esse esquisitão não é nada pra você."
        ],
        friend74: [
            "<20>{#p/alphys}{#e/alphys/1}Tecnicamente é impossível você derrotar ele...",
            '<20>{#e/alphys/2}M-mas... de alguma forma, eu sei que você consegue!'
        ],
        friend75: [
            '<20>{#p/toriel}{#e/toriel/1}Minha criança...',
            '<20>{#e/toriel/2}Minha doce, e inocente criança...',
            '<20>{#e/toriel/3}Você não pode desistir agora!'
        ],
        friend76: "Vamos\nVocê\nConsegue!", 
        friend77: () => (SAVE.data.n.bully < 30 ? '*mexida\ndo\npoder*' : '*mexida\nintimi-\ndadora*'), 
        friend78: () => (SAVE.data.n.bully < 30 ? 'Brilhe\ne\nsorria!' : "você é mal,\nmas ele\né pior."), 
        friend79: 'Acaba com\neste\nmané!', 
        friend80: () => (SAVE.data.n.bully < 30 ? 'la la,\nla la' : 'h-hum,\nh-hum'), 
        friend81: 'Você\nnão\nfalhará.', 
        friend82: () => (SAVE.data.n.bully < 30 ? 'Nossa vontade\né sua\nVontade.' : 'Use seu\nforça\nsabiamente.'), 
        friend83: () => (SAVE.data.n.bully < 30 ? 'Com força,\namiguinho!' : 'Só vai,\namiguinho.'), 
        friend84: () => (SAVE.data.n.bully < 30 ? "Estamos\ndo seu\nlado!" : 'Gostamos\nde você\nagora?'), 
        friend85: () => (SAVE.data.n.bully < 30 ? 'Mantenha\nna linha,\nbeleza?' : 'Mostre a\nele o que\nvocê tem.'), 
        friend86a: 'Ribbit.', 
        friend86b: "Não\ndesista!", 
        friend87: [
            '<20>{#p/twinkly}{#e/twinkly/17}Urrrgh... NÃO!',
            '<20>{#e/twinkly/16}Inacreditável!!',
            "<20>{#e/twinkly/15}Isso não pode estar acontecendo...!",
            '<20>{#e/twinkly/16}Vocês... VOCÊS...!'
        ],
        friend88: ["<20>{#p/twinkly}{#e/twinkly/2}Eu não posso acreditar que vocês são tão ESTUPIDOS!"],
        friend89: ['<20>{*}TODAS AS SUAS ALMAS SÃO MINHAS!!!!!!!!!{^40}{%}'],
        friend90: () =>
            1 <= SAVE.flag.n.killed_sans
                ? ['<20>{#p/asriel1}É claro...', '<20>Isso é muito melhor do que antes.']
                : ['<20>{#p/asriel1}Finalmente.', '<20>Estava cansado de ser uma estrela.'],
        friend91: ['<20>{#p/asriel1}Howdy!', '<20>$(name), você está aí?', "<20>Sou eu, seu melhor amigo."],
        friend92: '<99>{*}{#p/asriel3}{#v/1}{#i/12}ASRIEL DREEMURR{^10}{#p/event}{%}'
    },
    b_opponent_finalasgore: {
        name: '* Asgore',
        death1: [
            '<11>{*}{#p/asgore}{#e/asgore/1}{#v/1}{#i/5}{@random=1.1/1.1}... então é assim...',
            '<11>{*}{#e/asgore/1}{#v/1}{#i/5}{@random=1.1/1.1}...',
            '<11>{*}{#e/asgore/1}{#v/1}{#i/5}{@random=1.1/1.1}Tome minha ALMA, e deixe este lugar amal- diçoado...',
            '<11>{*}{#e/asgore/1}{#v/2}{#i/6}{@random=1.1/1.1}Então...',
            '<11>{*}{#e/asgore/1}{#v/2}{#i/6}{@random=1.1/1.1}Você não precisa ser sobre- carre- gado por nós... nunca mais...',
            '<11>{*}{#e/asgore/2}{#v/3}{#i/6}{@random=1.1/1.1}...',
            '<11>{*}{#e/asgore/2}{#v/3}{#i/7}{@random=1.1/1.1}Adeus...'
        ]
    },

    i_archive: { battle: { description: '', name: '' }, drop: [], info: [], name: 'N/A', use: [] },
    i_archive_berry: {
        battle: { description: '3 HP.', name: 'Exoberries' },
        drop: ['<32>{#p/human}* (Você joga fora as Exoberries.)'],
        info: ['<32>{#p/human}* (3 HP.)'],
        name: 'Exoberries',
        use: ['<32>{#p/human}* (Você come as Exoberries.)']
    },
    i_archive_candy: {
        battle: { description: '4 HP.', name: 'Doce' },
        drop: ['<32>{#p/human}* (Você joga fora o Doce Monstro.)'],
        info: ['<32>{#p/human}* (4 HP.)'],
        name: 'Doce Monstro',
        use: ['<32>{#p/human}* (Você come o Doce Monstro.)']
    },
    i_archive_rations: {
        battle: { description: '5 HP.', name: 'Rações' },
        drop: ['<32>{#p/human}* (Você joga fora as rações.)'],
        info: ['<32>{#p/human}* (5 HP.)'],
        name: 'Rações',
        use: ['<32>{#p/human}* (Você come as rações.)']
    },
    i_archive_tzn: {
        battle: { description: '6 HP.', name: 'Tofu' },
        drop: ['<32>{#p/human}* (Você joga fora o Tofu Espacial.)'],
        info: ['<32>{#p/human}* (6 HP.)'],
        name: 'Tofu Espacial',
        use: ['<32>{#p/human}* (Você ingere o Tofu Espacial.)']
    },
    i_archive_nice_cream: {
        battle: { description: '7 HP.', name: 'Sorvete Sonho' },
        drop: ['<32>{#p/human}* (Você joga fora o Sorvete Sonho.)'],
        info: ['<32>{#p/human}* (7 HP.)'],
        name: 'Sorvete Sonho',
        use: [
            '<32>{#p/human}* (Você desembrulhou o Sorvete Sonho.)',
            "<32>{#p/human}* (É uma ilustração holográfica de uma criança chorando.)"
        ]
    },
    i_archive_healpak: {
        battle: { description: '8 HP.', name: 'Kit Médico' },
        drop: ['<32>{#p/human}* (Você jogou fora o Kit Médico.)'],
        info: ['<32>{#p/human}* (8 HP.)'],
        name: 'Kit Médico',
        use: ['<32>{#p/human}* (Você usou o Kit Médico.)']
    },
    i_big_dipper: {
        battle: {
            description: 'Uma colher de bater feita com o melhor metal da galáxia.',
            name: 'Grande Colher'
        },
        drop: ['<32>{#p/human}* (Você joga fora a Grande Colher.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 AT.)']
                : ['<32>{#p/basic}* \"Grande Colher\" (15 AT)\n* Uma colher de bater feita com o melhor metal da galáxia.'],
        name: 'Grande Colher',
        use: ['<32>{#p/human}* (Você equipou a Grande Colher.)']
    },
    i_heart_locket: {
        battle: {
            description: 'Aqui diz \"Melhores Amigos Para Sempre.\"',
            name: 'Pingente de Coração'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora o Pingente de Coração.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ['<32>{#p/basic}* ...', "<32>{#p/basic}* Eu vou fingir que você não acabou de fazer o que eu te vi fazer."])
        ],
        info: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (15 DF.)']
                : ['<33>{#p/basic}* \"Pingente de Coração\" (15 DF)\n* Diz \"Melhores Amigos Para Sempre.\"'],
        name: 'Pingente de Coração',
        use: ['<32>{#p/human}* (Você equipou o Pingente de Coração.)']
    },
    i_starling_tea: {
        battle: {
            description: 'Um chá digno de um rei.',
            name: 'Chá Estrelado'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Chá Estrelado.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Chá Estrelado\" cura 99 HP\n* Um chá digno de um rei.'],
        name: 'Chá Estrelado',
        use: ['<32>{#p/human}* (Você bebe o Chá Estrelado.)']
    },

    k_hangar: {
        name: 'Cartão de acesso a Saída',
        description: "Usado para destrancar a porta de saída do Outpost."
    },

    k_skeleton: {
        name: 'Chave de Esqueleto',
        description: () =>
            SAVE.data.b.s_state_sansdoor
                ? "Usada para destrancar o quarto do Sans."
                : 'Dada a você por Sans no Último Corredor da Cidadela.'
    },

    s_save_citadel: {
        c_elevator1: { name: 'A Cidadela', text: [] },
        c_courtroom: { name: 'Último Corredor', text: [] },
        c_road2: { name: 'Anexo Real', text: [] },
        c_archive_start: { name: '64657465726d696e6174696f6e', text: [] },
        c_archive_path1: { name: '50617469656e6365', text: [] },
        c_archive_path2: { name: '42726176657279', text: [] },
        c_archive_path3: { name: '496e74656772697479', text: [] },
        c_archive_path4: { name: '5065727365766572616e6365', text: [] },
        c_archive_path5: { name: '4b696e646e657373', text: [] },
        c_archive_path6: { name: '4a757374696365', text: [] },
        c_exit: { name: 'O fim', text: [] }
    }
};


// END-TRANSLATE
