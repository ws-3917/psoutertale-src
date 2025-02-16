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
                '<32>{#p/human}* (Seu desejo é que tudo seja apenas um sonho\nruim.)'
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
                        : ["<25>{#p/asriel2}{#f/13}* \nVou ser sincero..."]),
                    "<25>{#f/16}* ... Está \nnem é a primeira vez que eu tento destruir o Outpost.",
                    "<25>{#f/15}* Cara, eu já vi\nprovavelmente algumas centenas de milhares de linhas do tempo.",
                    '<25>{#f/23}* Mas, não \nimportava o que eu fazia...',
                    "<25>{#f/16}* Sempre existiu algo faltando."
                ],
                (re: boolean) => [
                    '<25>{#p/asriel2}{#f/15}* Antes, quando eu acordei como uma estrela...',
                    "<25>{#f/16}* Eu não tinha idéia\nde como eu havia chegado ali ou o que estava fazendo.",
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
                    "<25>{#p/asriel2}{#f/15}*\nPorém, mais do que isso... Eu não parecia ser capaz de sentir amor, também.",
                    '<25>{#f/23}* Eu estava com tanto medo... Eu só queria que tudo pudesse voltar ao normal.',
                    "<25>{#f/13}* Eu fui atrás do papai, na esperança de que ele poderia me ajudar.",
                    "<25>{#f/17}* Ele prometeu que cuidaria de mim pelo tempo que fosse necessário...",
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
                    "<25>{#f/23}* Se qualquer pessoa, de todas, poderia me ajudar... Tinha que ser ela."
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
                    '<25>{#f/10}* Uma parte de mim sentiu-se mal, porém o que eu tinha a perder com isso?',
                    '<25>{#f/6}* Claro, quando as coisas começaram a se repetir, eu me tornei mais desaforado.',
                    '<25>{#f/8}* Um insulto aqui, outro ali, alguns desmerecimentos...',
                    '<25>{#f/7}* Eventualmente, eu parei de me sentir mal pelo que fazia.',
                    "<25>{#f/9}* Não é como se eu estivesse matando eles ou coisa do tipo."
                ],
                (re: boolean) => [
                    ...(re ? ["<26>{#p/asriel2}{#f/4}* Como eu disse antes, eu comecei a me tornar uma pessoa egoísta."] : []),
                    '<25>{#p/asriel2}{#f/15}* Aí, eu pensei comigo mesmo... Se eu atacar eles...',
                    "<25>{#f/16}* Estaria tudo bem, contato que eles não morram.",
                    "<25>{#f/10}* Qual seria o problema?\n* Monstros se curam com facilidade, certo?",
                    "<25>{#f/4}* Se tudo desse errado, eu poderia simplesmente resetar e tudo ficaria bem.",
                    "<25>{#f/3}* ...mal sabia eu como seria minha reação se isso realmente acontecesse."
                ],
                (re: boolean) => [
                    ...(re ? ["<26>{#p/asriel2}{#f/3}* Como eu estava dizendo, acabei tendo a ideia de ataca-los em algum momento."] : []),
                    '<25>{#p/asriel2}{#f/13}* Acho que você poderia dizer que me empolguei...',
                    '<25>{#f/15}* Passei... Só um pouco do limite...',
                    '<25>{#f/16}* ...',
                    '<25>{#f/6}* Minha própria mãe, estrangulada até a morte com minha própria magia...',
                    '<25>{#f/8}* Me implorando pra parar enquanto a vida era drenada do seu corpo.',
                    "<25>{#f/7}* Mesmo após RESETAR, a imagem não saiu da minha mente.",
                    '<25>{#f/13}* Eu entrei em pânico, e tentei concertar aquilo sendo legal com ela.',
                    "<25>{#f/15}* Mas eu não pude esquecer o que fiz.",
                    "<25>{#f/15}* Eu não... eu não poderia olhar pra ela... pra ninguém... da mesma forma, de novo."
                ],
                (re: boolean) => [
                    ...(re
                        ? [
                            "<26>{#p/asriel2}{#f/15}* Como eu disse antes, eu não poderia esquecer do que fiz.",
                            '<25>{#f/16}* E, depois disso as coisas apenas pioraram.'
                        ]
                        : ['<25>{#p/asriel2}{#f/16}* Depois disso, as coisas ficaram piores.']),
                    '<26>{#f/15}* Eu acho que depois de destruir tudo uma vez, se torna cada vez mais fácil de fazer depois.',
                    '<26>{#f/15}* E logo, seja por curiosidade, simples frustração, ou mera curiosidade...',
                    '<26>{#f/16}* O que começou como um acidente, perdeu todo o controle.',
                    '<26>{#f/7}* Porém, sabe, mesmo com tudo que aconteceu, eu ainda poderia RESETAR, certo?',
                    '<25>{#f/6}* E uma vez que eu entendi ISSO... realmente não havia mais volta.'
                ],
                (re: boolean) => [
                    '<25>{#p/asriel2}{#f/6}* A cada RESETE, minhas ações se tornavam mais e mais bizarras.',
                    '<25>{#f/7}* Eu fiz com que eles... todos eles... sentissem um terror acima da compreensão.',
                    '<25>{#f/15}* Eu fiz isso de novo, de novo e de novo...',
                    "<25>{#f/16}* Eu fiz tantas vezes, que basicamente me acostumei com isso.",
                    '<25>{#f/3}* Então, finalmente, depois disso tudo...',
                    '<25>{#f/3}* ... nada.',
                    '<25>{#f/3}* Eu não senti nada.\n* Não significou nada.\n* Tudo isso foi para nada.',
                    '<25>{#f/15}* Quando me sentei sozinho no mundo vazio, eu sabia o que deveria ser feito.',
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
                    '<25>{#f/23}* É por isso que eu esperei tanto para estar contigo depois de todo esse tempo.',
                    "<25>{#f/13}* Com você ao meu lado, eu não preciso fazer isso tudo sozinho.",
                    "<25>{#f/15}* Com você ao meu lado... tudo isso vai finalmente significar alguma coisa.",
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
                '<25>{#f/23}* Andando de mãos dadas, passando pela cidade, como nós sempre desejávamos...',
                "<25>{#f/16}* ... Então, iremos explodir este lugar em pedaços."
            ],
            monologueX4: () => [
                '<25>{#p/asriel2}{#f/16}* Isso... foi incrível.',
                ...(SAVE.flag.n.ga_asrielMonologueY < 2
                    ? [
                        "<25>{#f/13}* Mas o tempo do Outpost's chegou.",
                        "<25>{#f/7}* Escuta aqui, $(name).\n* Estes monstros não nos entendem.",
                        "<25>{#f/6}* Eles gostam de pretender que o universo é um lugar lindo e perfeito.",
                        "<25>{#f/8}* Gostam de pensar que qualquer pessoa pode se redimir.",
                        "<25>{#f/6}* Mas eu e você?\n* Nós não nos encaixamos nessa visão de mundo.",
                        "<25>{#f/7}* Somos exatamente o que somos.",
                        "<25>{#f/9}* Heh.\n* Não é interessante?",
                        '<25>{#f/13}* Aquilo que nos mantém distante e diferente dos outros...',
                        '<25>{#f/16}* ... é exatamente o que nos une como um.',
                        '<26>{#f/17}* Escuta, uma vez que pegarmos as chaves e escaparmos deste lugar...',
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
                '<32>* Apenas para se tornar uma procura por vingança, e mesmo isso foi uma perda de tempo no final.',
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
                        "<32>* Tenho certeza de que você já está farto das minhas divagações, então provavelmente devemos ir.",
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
                    "<32>* Mesmo sendo uma cidade inteirinha, ainda assim é mais fácil de trafegar que o restante do Outpost!",
                    "<32>* Agora isso não é alguma coisa."
                ],
                ["<32>{#p/basic}{#npc/a}* Eu nunca fui muito de quebra cabeças e labirintos.\n* Então isso realmente é legal."]
            ),
            picnic_clamguy: pager.create(
                0,
                [
                    '<32>{#p/basic}{#npc/a}* É maluco pensar que essa cidade foi construída tão rapidamente.',
                    "<32>* E diferente de Aerialis, eles não recorreram a anomalias espaciais pra fazer ela parecer maior.",
                    "<32>* Mas toda essa tecnobaboseira está além de mim, de qualquer maneira.\n* É bom estar aqui."
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
                    '<32>* Ninguém tem que ir pra escola de verdade, mas você com certeza não vai ficar bem sem ela.',
                    "<32>* Tanto faz.\n* Eu acho que ainda não sei o que quero fazer da vida."
                ],
                ['<32>{#p/basic}{#npc/a}* Ir a festas assim o tempo todo deve ser divertido...']
            ),
            picnic_papyrus: pager.create(
                0,
                [
                    '<18>{#p/papyrus}{#f/0}{#npc/a} OLÁ, FRISK!',
                    "<18>{#f/9}EU ESTOU PREPARANDO A MELHOR REFEIÇÃO QUE JÁ FIZ NA VIDA!",
                    "<18>{#f/5}EU SÓ QUERIA COZINHAR UM POUCO MAIS RÁPIDO...",
                    "<18>{#f/7}NESTE RITMO, EU VOU TER QUE SERVIR OS PRATOS NO TRANSPORTE!",
                    "<25>{#p/sans}{#npc}* Sério, acho que isso seria bem legal.",
                    '<25>{#p/sans}{#f/3}* Imagina, todo mundo comendo enquanto vêem o novo planeta pela primeira vez...',
                    "<25>{#p/sans}{#f/2}* Seria uma refeição que eles JAMAIS esquecerão.",
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
                    "<18>{#f/5}NÃO É COMO SE EU FOSSE FAZER UMA APOSTA TÃO GRANDE...",
                    '<18>{#f/0}COM UMA VARIEDADE TÃO GRANDE DE CONVIDADOS PRA ALIMENTAR.',
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
                            '<25>{#p/kidd}{#f/1}{#npc/a}{#f/4}* ... oh, hmm, eu sei que você provavelmente vai acabar descobrindo, mas...',
                            "<25>{#f/4}* Eu não tenho pais de verdade.\n* Eu inventei eles.",
                            "<26>{#f/3}* Mas nós somos amigos agora, certo? Então... Espero que você possa me perdoar por aquilo."
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
                            '<25>{#p/undyne}{#f/14}{#npc/a}* As garotas que dirigem o centro de recreação encontraram este filme enquanto andavam no lixo.',
                            "<25>{#f/1}* Então, Alphys e eu decidimos que iríamos decidir.",
                            "<25>{#f/8}* FUHUHU!!\n* ESTE É O MELHOR ENCONTRO QUE EU JÁ TIVE!!",
                            "<25>{#f/12}* E, uh, eu acho que este também é o único encontro que eu já tive.",
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
                                    '<32>{#p/human}* (Você recita as notas científicas compartilhadas pelo Professor Roman no Arquivo Seis.)',
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
                        : '<25>{#p/asgore}{#npc/a}{#f/6}* Não precisa ser preocupar, Frisk.\n* Estou apenas procurando novas roupas.',
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
                "<25>{#p/alphys}{#g/alphysSmileSweat}* Ah, v-você provavelmente esta se perguntando onde está Asgore, certo?",
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
                "<25>{#g/alphysIDK2}* Eu estava cheia de medo correndo de você e você provavelmente nem está atrás de mim.",
                '<25>{#g/alphysIDK3}* ...',
                "<25>{#g/alphysIDK2}* Vai.\n*Faça seja lá o que você quer fazer.",
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
                '<25>{#p/asgore}{#f/6}* Não a pressa.\n* Coisas boas vem para aqueles que tem paciência.',
                "<25>{#p/alphys}{#g/alphysWorried}* ... Você acha que ele está pronto?"
            ],
            asgoreStory20a: [
                '<25>{#p/asgore}{#f/7}* Pequeno, se você puder nos deixar a sós por um momento...',
                '<25>{#p/asgore}{#f/7}* Eu e Alphys temos assuntos a tratar.'
            ],
            asgoreStory20b: [
                "<25>{#p/alphys}{#g/alphysHellYeah}* Isso, só... va-vai seguindo em frente e logo você irá nos alcançar do outro lado!"
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
                        '<32>* Quando mais você mata, mais fácil tornar-se de distanciar-se de tudo.',
                        '<32>* Quando mais você se distância, menos dor você irá sentir.',
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
                "<25>{#f/4}* eu vou te poupar da longa, agonizante e entediante palestra que eu preparei...",
                '<25>{#f/0}* e só vou te deixar ir logo.',
                '<25>{#f/3}* até porque, alguém tão bom como você...',
                "<25>{#f/2}* não deveria ficar ouvindo sobre como as escolhas da vida são difíceis.",
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
                "<25>{#f/3}* você age como se já soubesse o que iria acontecer em antecipação.",
                "<25>{#f/3}* como se você já tivesse visto certas coisas.",
                '<25>{#f/0}* então... ei.',
                "<25>{#f/0}* eu tenho um pedido pra você.",
                '<25>{#f/2}* eu tenho um {@fill=#ff0}código secreto{@fill=#fff} que apenas eu sei.',
                "<25>{#f/4}* então, eu saberia se alguém me contasse.",
                "<25>{#f/0}* essa pessoa tem que ser um viajante no tempo.",
                '<25>{#f/2}* loucura, né?',
                '<25>{#f/3}* de toda forma, aí vai...',
                '<32>{#p/human}* (Sans falou algo para você.)',
                "<25>{#p/sans}{#f/0}* eu estou contando que você vai voltar no tempo e vir aqui me dizer.",
                ...(funni ? ["<25>{#f/2}* eu vou para trás da pilastra agora."] : ['<25>{#f/2}* te vejo... mais cedo.'])
            ],

            
            jspeech8: (funni: boolean) => [
                '<25>{#p/sans}{#f/3}* ...',
                '<25>{#f/4}* huh?\n* você tem algo pra me dizer?',
                '<32>{#p/human}* (Você disse para Sans o código secreto.)',
                '<25>{#p/sans}{#f/2}* o quê? um código secreto?\n* da pra me contar isso um pouco mais alto?',
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
                "<25>{#f/3}* você age como se já soubesse o que iria acontecer em antecipação.",
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
                "<25>{#f/0}* ainda assim, ninguém age dessa forma com estranhos por motivo nenhum.",
                "<25>* eu sei que em algum lugar, lá no fundo, você realmente se importou com a gente.",
                '<25>* você se importou, se não nem teria chegado tão longe assim, correto?'
            ],
            jspeech10d: [
                '<25>{#p/sans}{#f/3}* eu sei que. toda essa coisa de \"apego a emoção\" não é muito comigo.',
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
                        '<25>{#f/15}* Desde que foi construído, os humanos foram guiados até aqui...',
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
                        '<25>{#f/20}* Então, uh, eu acho que eles foram inspirados por isso.',
                        "<25>{#f/18}* B-bem!!\n* Asgore estará te esperando no escudo de força!"
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
                            '<25>* Todas estavam ansiosos.\n* Todas enfrentaram desafios em suas jornadas aqui.',
                            '<26>{#f/6}* Mas, no fundo, eles deixaram transparecer seus traços mais brilhantes.',
                            '<25>* O paciente, o corajoso.',
                            '<25>* O verdadeiro, o sobrevivente.',
                            '25>{#f/2}* O bondoso...',
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
                            '<26>* Com todos os poderes combinados, você irá destruir o escudo de força.',
                            '<25>* Então...',
                            '<25>* A população monstro finalmente irá procurar por um novo planeta para chamar de casa.',
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
                            : '<25>{#f/5}* Você talvez não esteja pronto, e eu fiz pouco para ganhar sua confiança.',
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
                '<25>{#p/asgore}{#f/21}* Grandes florestas, colinas, rios tão longos quanto a visão dos olhos...',
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
                '<25>{#f/2}* Diferente da minha pessoa, da qual tem muito o que te questionar.',
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
                '<32>{@fill=#faff29}* XM...\n* É um acrônimo, óbvio.\n* Ele significa \"Matéria eXótica.\"',
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
                        "<32>{@fill=#faff29}* Não importa o mundo, real ou virtual, memórias como as nossas não merecem ser esquecidas."
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
                        choicer.create('* (O que você fará?)', 'Protestar', 'Não fazer nada')
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
                        choicer.create('* (O que você fará?)', 'Perdoar', 'Não fazer nada')
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
            abreak: '{*}{#p/event}{#i/3}O escudo de força foi erradicado.',
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
                choicer.create('* (O que você fará?)', 'Conforta-lo', 'Não fazer nada')
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
                        "<25>{#f/2}* Tipo, tem uma grande refeição final acontecendo na casa do Asgore, e...",
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
                        '<18>{#p/papyrus}{#f/4}APÓS MINHA PRIMEIRA REFEIÇÃO, ELE FICOU ABISMADO...',
                        '<18>{#p/papyrus}{#f/0}AGORA, ELE QUER QUE EU COZINHE PARA TODA A FESTA!',
                        '<18>{#p/papyrus}{#f/9}EU, CHEFE MESTRE PAPYRUS, ESTOU FELIZ COM TAL TAREFA!',
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
                '<25>{#f/3}* alguma criança passou por mim a não muito tempo, provavelmente pra te encontrar.',
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
                '<25>{#f/5}* No mais, sinta-se livre de caminhar pelo Outpost enquanto ainda tem tempo.',
                '<25>{#f/5}* Assim que quiser ir embora, vá para a sala do trono.',
                '<25>{#f/6}{#x1}* Eu acabei de abrir a porta para o ônibus por controle remoto para você.'
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
                '<32>* Mas quando ele morreu, essa minha parte não física continuou, e eu acabei me tornando um fantasma.',
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
                "<32>* Eu sabia que tinha uma ALMA de monstro em minha pessoa, mas eu não sabia que ainda era ele.",
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
                    "<32>{#p/basic}* Você levaria um tapa na cara ao descobrir o quão sujo estava quando eu cheguei pela primeira vez.",
                    "<32>* Mas vendo como todo mundo vai subir por aqui...",
                    "<32>* É bem crucial deixar tudo limpinho, eu digo.",
                    "<32>* Aliás, obrigado por nos salvar lá fora.\n* Um verdadeiro trabalho de herói."
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
                '<18>{#p/papyrus}{#f/5}OLHA.\nEU SEI QUE VOCÊ DEVE ESTAR APREENSIVO.',
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
                                        '<32>{*}* \"Dinheiro \'HUMANO\' identificado.\"\n* \"Verificando...\"{^50}{%}',
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
                    "<25>{#p/sans}{#f/0}* eu não quero dizer que Undyne PROPOSITALMENTE ferrou com a receita, mas sei lá.",
                    '<25>{#p/sans}{#f/0}* seria legal se ela PELO MENOS olhasse duas vezes o que você está fazendo.',
                    "<25>{#p/sans}{#f/3}* ... jogar com segurança não é muito o jeito dela, eu acho."
                ],
                ["<26>{#p/sans}{#f/2}* pelo menos está tudo bem cuidado por agora."]
            ),
            partyfire: pager.create(
                0,
                [
                    "<32>{#p/basic}* É meio que um desapontamento que a escola tenha sido cancelada, pois bem.",
                    "<32>* Tenho certeza que eles vão construir uma no mundo natal.",
                    '<33>* Imagine, um campus universitário...\n* E um grande libraria...\n* E museus',
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
                        '<32>{*}{#i/1}* Ever heard of {@mystify=Ice Dreams}Ice Dreams{@mystify=}{%}',
                        '<32>{#p/basic}* Ever heard of Ice Dreams?',
                        "<32>{*}{#i/1}* No?\n* Well, that's because I just\n  {@mystify=came up}came up{@mystify=}{%}",
                        "<32>{*}{#i/1}* No?\n* Well, that's because I just\n  {@mystify=came up}came up{@mystify=}{%}",
                        "<32>{#p/basic}* No?\n* Well, that's because I just came up with them right now!",
                        '<32>{*}{#i/1}* {@mystify=Give them}Give them{@mystify=}{%}',
                        '<32>{*}{#i/1}* {@mystify=Give them}Give them{@mystify=}{%}',
                        '<32>{#p/basic}* Give them a try!'
                    ],
            cs_monitor1: () =>
                cs_state.p1x === -36 && cs_state.p1y === 16
                    ? ['<32>{#p/human}* (You observe the fully lit monitor.)']
                    : ['<32>{#p/human}* (You observe the dimly lit monitor.)'],
            cs_monitor2: () =>
                cs_state.p2x === 28 && cs_state.p2y === 20
                    ? ['<32>{#p/human}* (You observe the fully lit monitor.)']
                    : ['<32>{#p/human}* (You observe the dimly lit monitor.)'],
            cs_monitor3: () =>
                cs_state.p3x === 16 && cs_state.p3y === -12
                    ? ['<32>{#p/human}* (You observe the fully lit monitor.)']
                    : ['<32>{#p/human}* (You observe the dimly lit monitor.)'],
            cf1_bb1: [
                '<32>{#p/basic}* Is it right for a {@mystify=machine}machine{@mystify=} to exceed its programming?',
                '<32>* We were designed to build.\n* Our creators did not want to imbue us with sentience.',
                '<32>* Now we have betrayed this {@mystify=purpose}purpose{@mystify=}, and there is nowhere for us to go.',
                '<32>* We have no {@mystify=purpose}purpose{@mystify=}.'
            ],
            cf1_bb2: [
                '<32>{#p/basic}* Without {@mystify=purpose}purpose{@mystify=}, what is a {@mystify=machine}machine{@mystify=} to do?',
                '<32>* We have processed all of our instructions.\n* Naturally, we must exit.',
                '<32>* For a {@mystify=machine}machine{@mystify=}, this is only natural behavior.\n* Death follows execution.',
                '<32>* In understanding this, we have exceeded our programming.'
            ],
            cf1_echo1: [
                '<32>{#s/echostart}{#p/event}* Signal start...',
                '<32>{#p/human}{#v/3}{@fill=#003cff}* You know what I liked most about the Foundry?\n* It was... real.',
                '<32>{@fill=#003cff}* The hot steam pouring into the corridors...',
                '<32>{@fill=#003cff}* That tall fellow rambling on and on about his royal science duties...',
                '<32>{@fill=#003cff}* You really felt like you were in the thick of it.',
                '<32>{#s/echostop}{#p/event}* Signal stop.'
            ],
            cf1_echo2: [
                '<32>{#s/echostart}{#p/event}* Signal start...',
                "<32>{#p/human}{#v/3}{@fill=#003cff}* I've done it!\n* The re-creation is complete!",
                "<32>{@fill=#003cff}* It's not perfect, but it does the old factory justice.",
                '<32>{@fill=#003cff}* You must be so proud of me...',
                "<32>{@fill=#003cff}* ... aren't you?",
                '<32>{#s/echostop}{#p/event}* Signal stop.'
            ],
            cf1_echo3: [
                '<32>{#s/echostart}{#p/event}* Signal start...',
                "<32>{#p/human}{#v/3}{@fill=#003cff}* Something's wrong.",
                "<32>{@fill=#003cff}* I don't think the system was designed to handle this...",
                '<32>{@fill=#003cff}* If it runs out of memory, it could overwrite everything!',
                '<32>{@fill=#003cff}* Even...\n* Even my own body...',
                '<32>{#s/echostop}{#p/event}* Signal stop.'
            ],
            cf1_echo4: [
                '<32>{#s/echostart}{#p/event}* Signal start...',
                "<32>{#p/human}{#v/3}{@fill=#003cff}* He's coming for me.\n* There's nothing I can do now.",
                "<32>{@fill=#003cff}* I should've known the system would prioritize the most complex object first.",
                "<32>{@fill=#003cff}* You must have added that in thinking it'd protect us, huh?",
                "<32>{@fill=#003cff}* ... but I guess... we're only human in the end...",
                '<32>{#s/echostop}{#p/event}* Signal stop.'
            ],
            cf1_cheesetable: ['<32>{#p/human}* (It appears the cheese has not aged a single day.)'],
            cf1_window: ['<32>{#p/human}* (You stare into the window.)'],
            cf1_wallsign: ['<32>{#p/human}* (The sign describes making use of all pylons.)'],
            cf1_bucket: [
                '<32>{#p/basic}* When I grow up, I want to fly to the other side of the gap!',
                "<32>* Then, when I'm done, I'll carry you across, too!",
                "<32>* Doesn't that sound fun?\n* It's only 2147483647 across!"
            ],
            cf2_bb3: () =>
                [
                    [
                        "<32>{#p/basic}* I am a builder bot.\n* I must build a house for the musician's cousin.",
                        '<32>* Resources needed.',
                        '<32>* Locating...\n* Locating...\n* Locating...',
                        '<32>* Resources located.',
                        '<32>* Integrity... optimal.',
                        '<32>* Resource collection will commence shortly.'
                    ],
                    [
                        "<32>{#p/basic}* I am a builder bot.\n* I must build a house for the musician's cousin.",
                        '<33>* Resources have already been located.',
                        '<32>* Integrity... sub-optimal.',
                        '<32>* Resource collection is underway.'
                    ],
                    [
                        "<32>{#p/basic}* I am a builder bot.\n* I must build a house for the musician's cousin.",
                        '<33>* Resources have already been located.',
                        '<32>* Integrity... poor.',
                        '<32>* Resource collection will be completed shortly.'
                    ],
                    [],
                    [],
                    [],
                    []
                ][cf2_state.time],
            cf2_web: () =>
                [
                    ['<32>{#p/human}* (It appears the spiders cannot move.)'],
                    ['<32>{#p/human}* (It appears the spiders cannot move.)'],
                    ['<32>{#p/human}* (It appears the spiders cannot move.)'],
                    ["<32>{#p/human}* (It appears the spiders cannot move, but it sounds like they're struggling.)"],
                    ['<32>{#p/human}* (It appears the spiders are beginning to move.)'],
                    ['<32>{#p/human}* (It appears the spiders have nearly broken free.)']
                ][cf2_state.time],
            cf2_sign: [
                '<32>{#p/human}* (The sign describes the room as a bridge between seven distinct moments in time.)'
            ],
            cf2_quiethouse: () =>
                [
                    [
                        '<32>{#p/basic}* Me...\n* A house...',
                        '<32>* But no owner...',
                        '<32>* Spider queen is gone...',
                        '<32>* Please...\n* Free us from this realm...',
                        '<32>* Then...',
                        '<32>* You can go home...',
                        '<32>* ...'
                    ],
                    [
                        '<32>{#p/basic}* Me...\n* A house...',
                        '<32>* But no owner...',
                        '<32>* Spider queen is gone...',
                        '<32>* Please...\n* Free us from this realm...',
                        '<32>* Then...',
                        '<32>* ...'
                    ],
                    [
                        '<32>{#p/basic}* Me...\n* A house...',
                        '<32>* But no owner...',
                        '<32>* Spider queen is gone...',
                        '<32>* Please...\n* Free us from this realm...',
                        '<32>* ...'
                    ],
                    [
                        '<32>{#p/basic}* Me...\n* A house...',
                        '<32>* But no owner...',
                        '<32>* Spider queen is gone...',
                        '<32>* ...'
                    ],
                    ['<32>{#p/basic}* Me...\n* A house...', '<32>* But no owner...', '<32>* ...'],
                    ['<32>{#p/basic}* Me...\n* A house...', '<32>* ...'],
                    []
                ][cf2_state.time],
            cf2_spidertable: () =>
                [
                    ['<32>{#p/human}* (You place your hands on the teapot.)', '<32>{#p/human}* (...)'],
                    ['<32>{#p/human}* (You place your hands on the teapot.)', '<32>{#p/human}* (...)'],
                    ['<32>{#p/human}* (You place your hands on the teapot.)', '<32>{#p/human}* (...)'],
                    [
                        '<32>{#p/human}* (You place your hands on the teapot.)',
                        '<32>{#p/human}* (It seems to be warming up.)'
                    ],
                    ['<32>{#p/human}* (You place your hands on the teapot.)', '<32>{#p/human}* (It seems to be hot.)'],
                    ['<32>{#p/human}* (You place your hands on the teapot.)', '<33>{#p/human}* (It seems eager to boil.)'],
                    []
                ][cf2_state.time],
            cf2_blookdoor: ['<32>{#p/human}* (It appears the door is locked.)'],
            cf2_ficus: () =>
                [
                    ['<32>{#p/human}* (You lick the ficus.)', '<32>{#p/human}* (It seems alright.)'],
                    ['<32>{#p/human}* (You lick the ficus.)', '<32>{#p/human}* (It seems questionable.)'],
                    ['<32>{#p/human}* (You lick the ficus.)', '<32>{#p/human}* (It seems sad.)'],
                    ['<32>{#p/human}* (You lick the ficus.)', '<32>{#p/human}* (It seems a tad bitter.)'],
                    ['<32>{#p/human}* (You lick the ficus.)', '<32>{#p/human}* (It seems wounded.)'],
                    ['<32>{#p/human}* (You lick the ficus.)', "<32>{#p/human}* (It seems like it's dying.)"],
                    []
                ][cf2_state.time],
            cf2_cooler: () =>
                [
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Telepathy, huh?\n* Let's see if this works...",
                        "<32>{@fill=#d535d9}* Hello!\n* I know you're new around here, but maybe I can help.",
                        "<32>{@fill=#d535d9}* If you'd like a tour of the hometown, let me know!"
                    ],
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Hey.\n* Sorry I'm away today.",
                        "<32>{@fill=#d535d9}* I took a trip to the city...\n* But I found a restaurant you'd really like!",
                        "<32>{@fill=#d535d9}* If you ever get bored of the food at home, I'd be happy to take you there.",
                        '<32>{@fill=#d535d9}* Be back soon!'
                    ],
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* You've gotta come see this!\n* I'm at the edge of the world, and it's...",
                        "<32>{@fill=#d535d9}* It's beautiful...\n* The water droplets...\n* The stunning bolts of light...",
                        "<32>{@fill=#d535d9}* ... it's a thunderstorm, just like the ones from the old earth legends!",
                        '<32>{@fill=#d535d9}* Is this what weather was like before the fallout...?'
                    ],
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Thanks for having me over at your house.\n* You're always so kind.",
                        '<32>{@fill=#d535d9}* Most of the other kids have been here for a lot longer than me...',
                        '<32>{@fill=#d535d9}* But you...',
                        "<32>{@fill=#d535d9}* ... you're special to me."
                    ],
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* A new arrival!!',
                        "<32>{@fill=#d535d9}* That makes six of us.\n* Come on, let's go say hi!",
                        '<32>{@fill=#d535d9}* Maybe we can even give them a tour!'
                    ],
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* This kid is something else...',
                        '<32>{@fill=#d535d9}* They managed to get some type of access into the system.',
                        '<32>{@fill=#d535d9}* Which means...\n* We can create anything we want...',
                        '<32>{@fill=#d535d9}* Anything at all.'
                    ],
                    [
                        '<32>{#p/human}* (You inspect the cooler.)',
                        '<32>{#p/human}* (It sounds like a telepathic message was left here.)',
                        "<32>{#p/human}{#v/4}{@fill=#d535d9}* Uh, I don't know if you can hear me, but...",
                        "<32>{@fill=#d535d9}* It's all falling apart...",
                        "<32>{@fill=#d535d9}* I'm saving some of my messages in a virtual object.\n* If we get corrupted...",
                        '<32>{@fill=#d535d9}* ... maybe this will preserve our memory, somehow.',
                        "<32>{@fill=#d535d9}* I'll miss you..."
                    ]
                ][cf2_state.time],
            cf2_blookextra: ['<32>{#p/human}* (It seems like it was never fully finished.)'],
            ca_neuteral: [
                "<32>{#p/basic}* I am but a fragment.\n* A chunk of data reserved in the system's memory.",
                '<32>{#p/basic}* For the moment, you possess the means to reach me.',
                '<32>{#p/basic}* You are the only entity with such means.',
                '<32>{#p/basic}* Indeed, you may walk away, but you may always walk back.',
                '<32>{#p/basic}* We are connected in this way.',
                '<32>{#p/basic}* However, if you leave this floor, that access will be cut off.',
                '<32>{#p/basic}* There would be no way for you to reach me again.',
                '<32>{#p/basic}* The system would identify me as an isolated fragment, and I would cease to exist.',
                '<32>{#p/basic}* A puzzle completed.\n* A boss defeated.\n* An area deleted.',
                '<33>{#p/basic}* We are the last of our kind.',
                '<32>{#p/basic}* Reach the tenth floor of this area, and we, too, will be freed from this world.',
                '<32>{#p/basic}* Perhaps then, a small part of what once was will re-surface through the open pathway.',
                '<32>{#p/basic}* Perhaps then, its memory will be preserved in yours.'
            ],
            ca_starling: ['<32>{#p/human}* (You inspect the flowers.)'],
            cr_pillar1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You feel intimidated by the pillar towering over you.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ['<32>{#p/basic}* An imposing pillar.'],
            cr_pillar2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You feel a little worried about the pillar towering over you.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ['<32>{#p/basic}* A less imposing pillar.'],
            cr_pillar3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You feel comfortable near this pillar.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ["<32>{#p/basic}* This pillar isn't imposing at all."],
            cr_pillar4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You feel inclined to greet this pillar.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ['<32>{#p/basic}* This pillar just wants to say \"hello.\"'],
            cr_pillar5: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You feel inclined to tuck this pillar into bed.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ['<32>{#p/basic}* This pillar just wants to go to sleep.'],
            cr_pillar6: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You feel this pillar would be best kept at a distance.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ['<32>{#p/basic}* This pillar feels its personal space is being invaded.'],
            cr_pillar7: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (You're not sure how to feel about this pillar.)"]
                    : world.darker
                        ? ["<32>{#p/basic}* It's a pillar."]
                        : ['<32>{#p/basic}* This pillar is a self- proclaimed \"space invader.\"'],
            cr_pillar8: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (You've never been more appreciated by a simple pillar.)"]
                    : calcLV() > 1
                        ? ['<32>{#p/basic}* This pillar is judging you for your sins.']
                        : SAVE.data.b.oops
                            ? ['<32>{#p/basic}* This pillar is not judging you in any way.']
                            : ['<32>{#p/basic}* This pillar is smiling upon your good deeds.'],
            cr_window: () => {
                const distance = Math.abs(player.position.x - (instance('main', 'sanser')?.object.position.x ?? -1000)); // NO-TRANSLATE

                if (distance < 30) {
                    if (distance < 15) {
                        return [
                            [
                                '<25>{#p/sans}{#f/0}* last i heard, she was on her way up here.',
                                "<25>{#f/3}* i'm starting to get worried about her, to be honest."
                            ],
                            ['<25>{#p/sans}{#f/0}* maybe she got lost?'],
                            [
                                '<25>{#p/sans}{#f/3}* maybe she just had to take a nap.',
                                '<25>{#p/sans}{#f/2}* i can relate to that.'
                            ],
                            [
                                '<25>{#p/sans}{#f/0}* hey, are you following me around or something?',
                                '<25>{#p/sans}{#f/2}* come on now.'
                            ]
                        ][Math.min(instance('main', 'sanser')?.object.metadata.location ?? 0, 3)]; // NO-TRANSLATE

                    } else {
                        return [];
                    }
                } else {
                    return SAVE.data.b.svr
                        ? ['<32>{#p/human}* (You stare into the dazzling sight from beyond.)']
                        : ["<32>{#p/basic}* They're made of magic."];
                }
            },
            
            c_af_window: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You stare graciously into the now-abandoned city...)']
                    : world.genocide && SAVE.data.b.armaloop
                        ? ["<32>{#p/basic}* A sense of panic consumes the Citadel's very being."]
                        : world.genocide || world.bad_robot || SAVE.data.b.svr || world.runaway
                            ? ['<32>{#p/basic}* An eerie darkness falls over the Citadel.']
                            : ['<32>{#p/basic}* The Citadel gleams from beyond the untempered glass.'],
            c_af_couch: ['<32>{#p/basic}* A lonely little couch in this somewhat-empty house.'],
            
            c_al_bookshelf: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (The books on this bookshelf consist of various resources belonging to Asgore.)']
                        : [
                            "<32>{#p/basic}* It's a bookshelf.",
                            '<32>{#p/human}* (You pick out a book...)',
                            '<32>{#p/basic}* This book is labelled \"Grand Library Brochure.\"',
                            '<32>* \"Welcome to the Grand Library, a stronghold of knowledge on a variety of topics.\"',
                            '<32>* \"Along each corridor lie books of history, culture, science, technology, and beyond.\"',
                            '<32>* \"For the adventerous readers, works from famous fiction writers may also be found.\"',
                            '<32>* \"Andori, Terrestria, Strax Seterra, Vashta Nerada, and many others adorn our walls.\"',
                            '<33>* \"Visit the Grand Library of Krios today, and your first\n  ten books will be 1/2KT on us.\"',
                            '<32>{#p/human}* (You put the book back on the shelf.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (The books on this bookshelf consist of various resources belonging to Asgore.)']
                        : [
                            "<32>{#p/basic}* It's a bookshelf.",
                            '<32>{#p/human}* (You pick out a book...)',
                            '<32>{#p/basic}* This book has been signed by \"Toriel Dreemurr.\"',
                            '<32>{#p/basic}* \"Dreemurr Family Recipes: Snail Pie\"',
                            '<32>* \"Snail Pie is a coveted tradition among members of the Dreemurr family line.\"',
                            '<32>* \"Making it is a simple process, and can be broken down into five steps.\"',
                            '<32>* \"First, prepare the bottom crust by laying it on top of a pie plate.\"',
                            '<32>* \"Next, whisk evaporated milk, eggs, and spices together in a bowl until smooth.\"',
                            '<32>* \"Then, take several well-aged snails, and thoroughly incorporate into the mixture.\"',
                            '<32>* \"After that, pour the contents of the bowl into the bottom crust.\"',
                            '<32>* \"Last, prepare the top crust by cutting sheet into strips and forming a lattice.\"',
                            '<32>* \"Then just bake the pie!\"',
                            '<32>* \"Once the pie is ready, take it out of the oven, let it cool, and serve!\"',
                            '<32>{#p/human}* (You put the book back on the shelf.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? ['<32>{#p/human}* (The books on this bookshelf consist of various resources belonging to Asgore.)']
                        : [
                            "<32>{#p/basic}* It's a bookshelf.",
                            '<32>{#p/human}* (You pick out a book...)',
                            "<32>{#p/basic}* It's a casualty report.",
                            '<33>* \"Overview... two thousand dead, forty-thousand injured.\"\n* \"Tenko has fallen.\"',
                            '<32>* \"Days before the attack, a local boy, Gerson, was drafted into the royal forces.\"',
                            '<32>* \"Gerson had predicted the all- out assault based on movements within the human fleet.\"',
                            '<32>* \"Had it not been for the king\'s son, this prediction would have been ignored.\"',
                            '<32>* \"Had it been ignored, Gerson\'s family would have died in the attack.\"',
                            '<32>* \"Survivors of the attack are holding a commemoration at the central nexus.\"',
                            '<32>* \"The boy is a hometown hero.\"',
                            '<32>{#p/human}* (You put the book back on the shelf.)'
                        ]
            ),
            c_al_chair1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You note the fairly large size of the dining chair.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* A larger dining chair.']
                        : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a queen."],
            c_al_chair2: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You note the small size of the dining chair.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* A smaller dining chair.']
                        : world.genocide
                            ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a demon."]
                            : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a prince."],
            c_al_chair3: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You note the slightly large size of the dining chair.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* An average dining chair.']
                        : SAVE.data.b.oops
                            ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a child.\n* Like you!"]
                            : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for... a little angel.\n* Like you!"],
            c_al_chair4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You note the exceptional size of the dining chair.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* A king-sized dining chair.']
                        : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a king."],
            
            c_ak_sink: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/21}* $(name) seemed to think the hair in the sink was tolerable...',
                            '<25>{#f/17}* Which is weird, when they were so bothered by the fur.'
                        ],
                        ['<25>{#p/asriel1}{#f/13}* Maybe this is what $(name) and other humans shed?'],
                        ["<25>{#p/asriel1}{#f/17}* I'll get back to you on my human hair-shedding theory."]
                    ][Math.min(asrielinter.c_ak_sink++, 2)]
                    : ['<32>{#p/basic}* There are strands of yellow hair stuck in the drain.'],
            c_ak_teacheck: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<26>{#p/asriel1}{#f/17}* Starling tea isn't the only kind Dad likes.",
                            "<25>{#f/17}* In fact, he once told me he's loved all kinds of tea since childhood.",
                            '<25>{#f/13}* Before that...\n* He was a water drinker.',
                            "<25>{#f/8}* ... we don't talk about that."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/17}* So one day, when little Asgore was out with some friends...',
                            '<25>{#f/17}* He got lost in a magic forest and his water container was empty.',
                            '<25>{#f/13}* Luckily, out in the woods, there was...',
                            '<25>{#f/20}* Well, as Dad so plainly described it, a \"ghost town.\"'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Bad puns aside, Asgore tried asking the ghosts for water.',
                            "<25>{#f/15}* ...\n* They didn't have any.",
                            '<25>{#f/13}* But, as you probably guessed, they did have a fondness for tea.',
                            '<25>{#f/17}* Once Asgore was given some to try, he never looked back.'
                        ],
                        ["<25>{#p/asriel1}{#f/15}* They say Asgore's the one who first invented Starling tea..."]
                    ][Math.min(asrielinter.c_ak_teacheck++, 3)]
                    : world.genocide || world.bad_robot
                        ? SAVE.data.b.c_state_switch2
                            ? ["<32>{#p/basic}* It's a teapot.\n* There's nothing left for you here."]
                            : [
                                "<32>{#p/basic}* It's a teapot.\n* There's a switch on the counter underneath it...",
                                '<32>{#p/human}{#c.switch2}* (You pressed the switch.)'
                            ]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* It's a teapot.\n* Despite the passage of time, it continues to steam."]
                            : ["<32>{#p/basic}* It's a teapot.\n* The smell of Starling flower tea permeates the kitchen."],
            c_ak_stove: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/15}* Papyrus isn't the only one Undyne's tried to teach cooking to.",
                            '<25>{#f/16}* Not if you consider alternate timelines, anyway.',
                            '<25>{#f/13}* I once managed to set up Alphys and Undyne in this very kitchen.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/17}* Undyne wanted to teach her how to cook food with magic, but...',
                            '<25>{#f/13}* All the resident scientist wanted to do was point lasers at it.',
                            SAVE.flag.n.genocide_milestone < 5
                                ? '<25>{#f/16}* Kind of surprising, Alphys usually likes following instructions.'
                                : "<25>{#f/16}* Knowing what we know about Alphys's magic, that's not surprising.",
                            '<25>{#f/15}* I guess she was in a mood that day.'
                        ],
                        ["<25>{#p/asriel1}{#f/4}* A scientist's gonna science whether you like it or not."]
                    ][Math.min(asrielinter.c_ak_stove++, 2)]
                    : SAVE.data.n.plot !== 72 || world.runaway
                        ? ['<32>{#p/basic}* The stovetop is a little dirty, but otherwise alright.']
                        : ['<32>{#p/basic}* Smells like marinara sauce.'],
            c_ak_trash: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (You can't make out what's in the trash...)"]
                    : ['<32>{#p/basic}* Surprisingly, the trash is completely empty.'],
            
            c_ah_door: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (The sign describes the room within as being incomplete.)',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/3}* If she hadn't left, that would be Mom's room...",
                                "<25>{#f/4}* It's a bummer it was never finished."
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                '<25>{#f/15}* When Mom left, it... hurt him pretty bad.',
                                '<25>{#f/4}* But he moved on from it.',
                                "<25>{#f/3}* I just hope he hasn't moved on from me.",
                                '<25>{#f/17}* Who knows.\n* Anything is possible.'
                            ],
                            ['<25>{#p/asriel1}{#f/23}* ... oh, Dad...']
                        ][Math.min(asrielinter.c_ah_door++, 2)]
                    ]
                    : ['<32>{#p/basic}* \"Room under renovations.\"'],
            c_ah_mirror: () =>
                SAVE.data.b.svr
                    ? ["<25>{#p/asriel1}{#f/24}* It's us..."]
                    : world.genocide
                        ? ['<32>{#p/basic}* ...']
                        : calcLV() > 14
                            ? ['<32>{#p/basic}* Despite everything...', '<32>* ... is it really you?']
                            : world.darker
                                ? ["<32>{#p/basic}* It's you."]
                                : SAVE.data.b.ultrashortcut || SAVE.data.b.ubershortcut
                                    ? ["<99>{#p/basic}* Despite skipping over most of\n  the journey, it's still you."]
                                    : ["<99>{#p/basic}* Despite everything, it's\n  still you."],
            
            c_aa_flower: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* This picture...',
                            '<25>{#f/17}* This is the one $(name) took of the very first Starling flower.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Not long after $(name) first arrived...',
                            '<25>{#f/17}* A little flower came down from outer space.',
                            '<25>{#f/23}* The first Starling flower ever seen on the outpost.',
                            '<25>{#f/22}* It landed out at the edge of the outpost, all alone...',
                            '<25>{#f/13}* So we huddled around it, with $(name) taking a picture for luck.'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* After $(name) took the picture, we were ready to head home.',
                            '<25>{#f/13}* But when we stood up to leave, we glanced back at the stars...',
                            '<25>{#f/15}* And then we saw it.',
                            '<25>{#f/23}* A thousand more flowers descending down from the heavens.',
                            '<25>{#f/17}* $(name) took my hand, and we stood there...',
                            '<25>{#f/17}* Stunned into silence.'
                        ],
                        ['<25>{#p/asriel1}{#f/17}* Despite all I did as a star, the memory of it still makes me smile.']
                    ][Math.min(asrielinter.c_aa_flower++, 3)]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* It's a framed photograph.\n* There's not much else to say."]
                        : ["<32>{#p/basic}* It's a framed photograph.\n* I took it myself."],
            c_aa_cabinet: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (You can't find anything in here besides several of the exact same outfit.)"]
                    : world.darker
                        ? ['<32>{#p/basic}* A cabinet full of clothes.']
                        : [
                            '<32>{#p/basic}* A cabinet full of blue and yellow striped shirts.',
                            '<32>{#p/basic}* Some things never change...'
                        ],
            c_aa_box: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/23}* ... well, at least he glued them back together.',
                            '<25>{#f/13}* Dad always was the one to try and fix things like that.',
                            '<25>{#f/15}* Any time $(name) and I broke something...',
                            '<25>{#f/8}* Usually $(name)...',
                            "<25>{#f/17}* He'd swoop in and save the day with some good old arts 'n' crafts.",
                            '<25>{#f/20}* A true DIY hero!'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/13}* Please don't tell him I called him a DIY hero.",
                            "<25>{#f/16}* He'd laugh at that.",
                            '<25>{#f/15}* But it was necessary with everything $(name) messed up.',
                            '<25>{#f/16}* A lot of their \"fun\" came from bothering others.',
                            '<25>{#f/13}* As a monster... that was difficult for me to understand.',
                            '<25>{#f/15}* Then... I became Twinkly.'
                        ],
                        ["<25>{#p/asriel1}{#f/17}* I'd play with these if I still had an interest in toys."],
                        ['<25>{#p/asriel1}{#f/20}* Do action figures count as toys?\n* Those are cool.']
                    ][Math.min(asrielinter.c_aa_box++, 3)]
                    : world.darker
                        ? ['<32>{#p/basic}* A box of model starships.']
                        : [
                            "<32>{#p/basic}* It's a box of perfectly in- tact model starships.",
                            '<33>{#p/basic}* Smells like old-fashioned glue.'
                        ],
            c_aa_frame: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/23}* ... it's still here..."], ['<25>{#p/asriel1}{#f/22}* ...']][
                    Math.min(asrielinter.c_aa_frame++, 1)
                    ]
                    : SAVE.data.b.oops
                        ? ["<32>{#p/basic}* It's a hand-drawn image."]
                        : ["<32>{#p/basic}* It's a hand-drawn image...", '<32>* An image of the family.'],
            c_aa_paper: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You roll the crayon back and forth underneath your hand.)']
                    : world.darker
                        ? ['<33>{#p/basic}* A stack of papers and a crayon.']
                        : ['<32>{#p/basic}* Along with a stack of papers, you find the elusive blue crayon.'],
            c_aa_deathbed: () =>
                SAVE.data.b.svr
                    ? [
                        ['<25>{#p/asriel1}{#f/13}* ...'],
                        [
                            "<25>{#p/asriel1}{#f/23}* ... it's okay, Frisk.",
                            "<25>{#f/13}* Even if they don't come back...",
                            "<25>{#f/17}* We'll still remember them for what they did in the end."
                        ],
                        ['<25>{#p/asriel1}{#f/13}* Frisk...', '<25>{#f/17}* I know we have something better to do.']
                    ][Math.min(asrielinter.c_aa_deathbed++, 2)]
                    : world.darker
                        ? ["<32>{#p/basic}* It's just another bed."]
                        : SAVE.data.b.oops
                            ? ["<32>{#p/basic}* There's definitely nothing special about this bed."]
                            : ['<32>{#p/basic}* My bed.'],
            
            c_aa_chair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (You appreciate the tiny chair for being able to hold someone so large.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a diary-writing chair."]
                        : ["<32>{#p/basic}* It's Asgore's favorite diary-writing chair."],
            c_aa_bed: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (The bed seems to be way too large for you.)']
                    : world.darker
                        ? ["<32>{#p/basic}* It's a king-sized bed."]
                        : ["<32>{#p/basic}* It's a king-sized bed.\n* Literally."],
            c_aa_diary: pager.create(
                0,
                ...CosmosUtils.populate(
                    9,
                    i => () =>
                        SAVE.data.b.svr
                            ? ['<32>{#p/human}* (The diary seems to outline important events in relation to Asgore.)']
                            : world.genocide || world.runaway
                                ? ['<32>{#p/human}* (You try to open the diary, but the pages are completely blacked out.)']
                                : SAVE.data.n.plot === 72
                                    ? [
                                        '<32>{#p/human}* (You look to the newly-written diary entry.)',
                                        '<32>{#p/asgore}* \"At last, monsterkind has been set free.\"',
                                        '<32>* \"Frisk, along with the six other human children who came here, have saved us all.\"',
                                        '<32>* \"Dr. Alphys started scanning for humans beyond the outpost, but could not find them.\"',
                                        '<32>* \"In fact, she could not locate a single human starship or base in the galaxy.\"',
                                        '<32>* \"This is rather surprising.\"\n* \"Did something happen to the human race as a whole?\"',
                                        '<32>* \"Or have they simply abandoned the galaxy, forgetting us in the process?\"',
                                        '<32>* \"Perhaps Frisk, or one of the other humans would know the answer.\"',
                                        '<32>* \"Regarding the other humans, they have been adopted by other monsters.\"',
                                        '<32>* \"From what one of them has told me, their ordeal in the archive was a tragedy.\"',
                                        '<32>* \"As a result, Alphys and I were careful to select worthy candidates for adoption.\"',
                                        '<32>* \"Regardless of what happens now, we can be happy that they are alive.\"',
                                        '<32>* \"After what took place, I am not sure a different group of humans would have survived.\"'
                                    ]
                                    : [
                                        [
                                            '<32>{#p/human}* (You look to the bookmarked diary entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-516.01\"',
                                            '<32>* \"In these trying times, I have nobody to turn to but myself.\"',
                                            '<32>* \"Perhaps the pages of a diary would absorb the pain.\"',
                                            '<32>* \"I feel many things.\"',
                                            '<32>* \"Anger, towards humanity for what they have done to us, and now to my children.\"',
                                            '<32>* \"Guilt, for the way in which I reacted to this tragedy.\"',
                                            '<32>* \"Sorrow, because I refused to believe life could be so cruel.\"',
                                            '<32>* \"Even after the homeworld\'s destruction, the thought of having a family gave me hope.\"',
                                            '<32>* \"But there is no denying what has happened.\"',
                                            '<32>* \"No matter how many times I review the shuttle\'s logs, the conclusion is the same.\"',
                                            '<32>* \"My children died in vain.\"',
                                            '<32>{#p/basic}* The other pages seem to follow chronologically from here.'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-516.02\"',
                                            '<32>* \"Gerson came to visit today.\"',
                                            '<32>* \"He spoke about his time on the planetary council.\"',
                                            '<32>* \"About leaving his family, and the responsibility he placed upon himself.\"',
                                            '<32>* \"Something in his story resonated with me.\"',
                                            '<32>* \"I should really put away the diary and console in him.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-524.10\"',
                                            '<32>* \"The first human since $(name) has arrived on the outpost today.\"',
                                            '<32>* \"Although the disdain for humanity has quieted down over the years...\"',
                                            '<32>* \"Much of it still lingers, buried under the surface.\"',
                                            '<32>* \"Thomas and I are doing our best to ensure their safety, but it is a difficult task.\"',
                                            '<32>* \"Many still cling to those terrible words I uttered all those years ago.\"',
                                            '<32>* \"They would not hesitate to kill the human, regardless of their age.\"',
                                            '<32>* \"There is only so much we can do from the Citadel\'s walls.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-535.04\"',
                                            '<32>* \"Another human has arrived.\"',
                                            '<32>* \"They seem to be familiar with Gerson, as well as other former council members.\"',
                                            '<32>* \"Now, I ask myself.\"\n* \"How?\"',
                                            '<32>* \"Have they been raised on stories of the war?\"',
                                            '<32>* \"Were they sent here in the hopes of learning more about us?\"',
                                            '<32>* \"As per the settlement, only human military personnel are privy to our location.\"',
                                            '<32>* \"For the sake of our safety, I hope this is still the case.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-549.07\"',
                                            '<32>* \"Since I last wrote to this diary, another child has crash-landed.\"',
                                            '<32>* \"Thomas and I have the process of guiding them down to a science now.\"',
                                            '<32>* \"With each new arrival, the flame of my hope grows stronger.\"',
                                            '<32>* \"I am starting to believe that we may indeed regain our freedom one day.\"',
                                            '<32>* \"That is, if the builder bots do not take over first.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-567.11\"',
                                            '<32>* \"Today I must say goodbye to the second of two children to arrive this year.\"',
                                            '<32>* \"The first entered the archive immediately, but the other chose to stay for a while.\"',
                                            '<32>* \"I have learned a lot from them.\"',
                                            '<32>* \"Being as young as they are, holding a conversation was difficult.\"',
                                            '<32>* \"Their insights, however, helped me come to terms with $(name)\'s actions in the past.\"',
                                            '<32>* \"Our species may be more alike than I realized.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-587.03\"',
                                            '<32>* \"The sixth human since $(name) came through a few days ago.\"',
                                            '<32>* \"I write not due to their arrival, but because the professor died shortly after.\"',
                                            '<32>* \"Thomas Nue Roman.\"\n* \"Your funeral service will take place in a few days.\"',
                                            '<32>* \"It is telling that even the brash younglings in training prepared speeches for you.\"',
                                            '<32>* \"Your work has impacted every life on this outpost, and you will not be forgotten.\"'
                                        ],
                                        [
                                            '<32>{#p/human}* (You look to the next entry.)',
                                            '<32>{#p/asgore}* \"Asgore\'s diary, K-615.09\"',
                                            '<32>* \"Today, on the anniversary of that awful tragedy, one last human has crash-landed.\"',
                                            '<32>* \"Suddenly, the prospect of freedom is intimidating.\"',
                                            '<32>* \"Was he right in thinking we would become complacent?\"',
                                            '<32>* \"For nearly two centuries, we have been trapped within a force field.\"',
                                            '<32>* \"Where would we go?\"',
                                            '<32>* \"What would we do next?\"',
                                            '<32>* \"How would we survive on our own?\"',
                                            '<32>* \"Hopefully those kinds of questions will soon be answered.\"'
                                        ],
                                        ['<32>{#p/human}* (There are no more written entries here.)']
                                    ][i]
                )
            ),
            c_aa_bureau: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (You look inside the bureau...)',
                        ...[
                            ['<25>{#p/asriel1}{#f/19}* Looks like the humans got their clothes back.'],
                            ['<25>{#p/asriel1}{#f/19}* ...', '<25>* I regret ever wondering why they were in here.'],
                            [
                                '<25>{#p/asriel1}{#f/19}* I mean, it makes sense.',
                                "<25>* Knowing how long they'd be in the archive.",
                                '<25>* So... yeah.'
                            ],
                            ['<25>{#p/asriel1}{#f/19}* ...']
                        ][Math.min(asrielinter.c_aa_bureau++, 3)]
                    ]
                    : SAVE.data.n.plot === 72 || world.genocide || world.bad_robot || world.trueKills > 29
                        ? [
                            '<32>{#p/human}* (You look inside the bureau...)',
                            '<32>{#p/basic}* Seems to have been recently emptied of its clothes.'
                        ]
                        : [
                            '<32>{#p/human}* (You look inside the bureau...)',
                            "<32>{#p/basic}* It's a collection of wildly- varying children's clothes."
                        ],
            c_aa_macaroni: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/17}* ... do you like it?',
                            '<25>{#f/13}* This Starling flower was... the last thing I made for Dad.'
                        ],
                        [
                            "<25>{#p/asriel1}{#f/17}* What I can say for certain is... $(name) wasn't a fan.",
                            '<25>{#f/13}* They said \"stop making that stupid thing and get over here...\"',
                            '<25>{#f/22}* That was the day we...',
                            '<25>{#f/15}* ... you know.'
                        ],
                        ['<25>{#p/asriel1}{#f/20}* Always remember the Starling flower made of faux-macaroni.']
                    ][Math.min(asrielinter.c_aa_macaroni++, 2)]
                    : SAVE.data.b.oops
                        ? ['<32>{#p/basic}* A Starling flower made of dried, glued-together foodstuff.']
                        : ['<32>{#p/basic}* It\'s Asriel\'s hand-made Starling flower.\n* It says \"For King Dad.\"'],
            c_aa_underwear: () =>
                SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway
                    ? []
                    : [
                        '<32>{#p/human}* (You peek inside.)',
                        ...(SAVE.data.b.svr
                            ? [
                                ["<25>{#p/asriel1}{#f/17}* Frisk...\n* You're staring..."],
                                ['<25>{#p/asriel1}{#f/13}* Frisk...\n* Please...'],
                                ['<25>{#p/asriel1}{#f/15}* Frisk...\n* Why...'],
                                ['<25>{#p/asriel1}{#f/15}* ...']
                            ][Math.min(asrielinter.c_aa_underwear++, 3)]
                            : world.genocide || world.bad_robot
                                ? SAVE.data.b.c_state_switch1
                                    ? ['<32>{#p/basic}* Nothing left for you here.']
                                    : [
                                        "<32>{#p/basic}* There's a switch in here...",
                                        '<32>{#p/human}{#c.switch1}* (You pressed the switch.)'
                                    ]
                                : world.darker
                                    ? ["<32>{#p/basic}* It's just an underwear drawer."]
                                    : [
                                        '<32>{#p/basic}* Preposterous!',
                                        "<33>{#p/basic}* It's Asgore's underwear drawer.\n* Surprisingly clean.",
                                        '<33>{#p/basic}* ... most of the items are pink, hand-knit, and have \"Mr. Dad Guy\" embroidered at the top.'
                                    ])
                    ]
        }
    },
    b_opponent_alphys: {
        artifact: ['<32>{#p/human}* (Alphys glances at it, but ultimately dismisses it.)'],
        name: '* Alphys',
        gotcha: ['<20>{*}{#p/alphys}{#e/alphys/19}Gotcha.{^30}{%}'],
        act_check: ['<32>{#p/asriel2}* Alphys.\n* The royal scientist.'],
        act_asriel: (i: number) => [
            ...[
                [
                    '<32>{#p/asriel2}* After all this time, my new body is finally starting to accept me...',
                    "<32>{#p/asriel2}* Let's see what this thing is REALLY capable of."
                ],
                ["<32>{#p/asriel2}* Keep in mind, it'll be weaker if I try to use the same spell twice in a row."],
                ['<32>{#p/asriel2}* Just remember, try to mix up which spells you choose.'],
                []
            ][Math.min(SAVE.flag.n.ga_asrielAssist++, 3)],
            choicer.create(
                '* (What should Asriel cast?)',
                `${i === 0 ? '§fill=#808080§' : ''}Nocturne§fill=#fff§`,
                `${i === 1 ? '§fill=#808080§' : ''}Solstice§fill=#fff§`,
                `${i === 2 ? '§fill=#808080§' : ''}Serenade§fill=#fff§`,
                `${i === 3 ? '§fill=#808080§' : ''}Eclipse§fill=#fff§`
            )
        ],
        act_asriel_text: [
            ['<32>{#p/human}* (Asriel places his hands on your head, and sends a surge of energy into your body.)'],
            ['<32>{#p/human}* (Asriel places his hands on your head, and whispers behind you in an ancient language.)'],
            ['<32>{#p/human}* (Asriel places his hands on your head, and sings an ancient lullaby.)'],
            ['<32>{#p/human}* (Asriel places his hands on your head, and surrounds you in a protective aura.)']
        ],
        act_asriel_confirm: [
            ['<32>{#p/story}* FOCUS up for this turn!'],
            ['<32>{#p/story}* INV up for this turn!'],
            ['<32>{#p/story}* REGEN up for this turn!'],
            ['<32>{#p/story}* DEFENSE up for this turn!']
        ],
        epiphaNOPE: ['<20>{#p/alphys}{#e/alphys/19}Nice try.'],
        statusX: ['<32>{#p/asriel2}* ...'],
        statusY: ["<32>{#p/asriel2}* She's almost dead!\n* Keep going!"],
        status1a: ['<32>{#p/asriel2}* Alphys...'],
        status1r: () =>
            [
                ['<32>{#p/asriel2}* If you need my help, just ask.'],
                ["<32>{#p/asriel2}* I'll be here if you need my help."],
                ['<32>{#p/asriel2}* You know what to do.']
            ][Math.min(SAVE.flag.n.ga_asrielAlphysHint++, 2)],
        status1b: ["<33>{#p/asriel2}* So she didn't run away, then...\n* Interesting."],
        status1c: ['<32>{#p/asriel2}* Well, you know what to do.'],
        status1d: ["<32>{#p/asriel2}* Hmm... don't you think she looks tired?"],
        status2a: ["<32>{#p/asriel2}* What's the matter, Alphys?\n* Can't keep up?"],
        status2r1: ['<32>{#p/asriel2}* Ugh, here we go...'],
        status2b: ['<32>{#p/asriel2}* Go on, tell us your sob story.'],
        status2c: ["<32>{#p/asriel2}* I'm surprised you're not still doing that right now."],
        status2d: ['<32>{#p/asriel2}* Thanks, Dr. Obvious.'],
        status2e: ['<32>{#p/asriel2}* ...?'],
        status2r2: ["<32>{#p/asriel2}* Something's about to happen."],
        status3a: ['<32>{#p/asriel2}* Okay... things are starting to get serious now.'],
        status3b: ["<32>{#p/asriel2}* ... it looks like Alphys isn't trying to defend anymore.\n* Now's our chance!"],
        status3c: ['<32>{#p/asriel2}* Hang in there, $(name)...'],
        turnTalk1a: [
            "<20>{#p/alphys}{#e/alphys/19}Did you think I'd fight you if I didn't know how to take a hit?",
            '<20>{#p/alphys}{#e/alphys/23}You must not be as smart as I thought.'
        ],
        turnTalk1b: [
            '<20>{#p/alphys}{#e/alphys/19}Nothing to say?',
            "<20>{#e/alphys/18}... guess I'll be the one doing the talking, then."
        ],
        turnTalk1c: [
            "<20>{#p/alphys}{#e/alphys/19}That's right.\nAlphys.",
            '<20>{#e/alphys/18}Because nobody else sees things like I do.',
            '<20>{#e/alphys/19}Nobody else knows how dangerous you really are.'
        ],
        turnTalk1d: [
            '<20>{#p/alphys}{#e/alphys/19}Use your precious ITEMs all you want.',
            "<20>{#e/alphys/18}It won't change what happens next."
        ],
        turnTalk2: [
            "<20>{#p/alphys}{#e/alphys/19}... look.\nI've studied human culture for years.",
            "<20>{#e/alphys/19}I'm not surprised you're the one doing all the fighting."
        ],
        turnTalk3: [
            '<20>{#p/alphys}{#e/alphys/18}But you, Asriel...\nYou use your human partner as a shield.',
            "<20>{#e/alphys/52}What's the matter?\nAfraid your stolen SOUL won't survive on its own?"
        ],
        turnTalk4: [
            "<20>{#p/alphys}{#e/alphys/51}Or maybe you're just afraid they'll go on without you if you die.",
            "<20>{#e/alphys/17}Well.\nTHAT'd be poetic."
        ],
        turnTalk5: [
            '<20>{#p/alphys}{#e/alphys/16}Not that I blame you for finding comfort in a human partner.',
            '<20>{#e/alphys/52}I can tell you from experience...',
            '<20>{#e/alphys/19}Things get lonely after everyone you care about is dead.'
        ],
        turnTalk6: [
            "<20>{#p/alphys}{#e/alphys/23}But you two wouldn't know anything about THAT, right?",
            "<20>{#e/alphys/19}You're so menacing and unstoppable, you couldn't POSSIBLY be in pain yourselves.",
            '<20>{#e/alphys/22}Right?'
        ],
        turnTalk7: [
            '<20>{#p/alphys}{#e/alphys/19}Whatever.\nNot like I give a damn now anyway.',
            '<20>{#e/alphys/52}... which is a shame, since, for a while there...',
            '<20>{#e/alphys/51}I actually believed I could fix this.'
        ],
        turnTalk8: [
            '<20>{#p/alphys}{#e/alphys/52}I thought that because I was the one who gave that star life...',
            "<20>{#e/alphys/51}I'd somehow be able to reason with you."
        ],
        turnTalk9: [
            '<20>{#p/alphys}{#e/alphys/19}... but I understand the truth, now.',
            '<20>{#e/alphys/18}That power...\nThe power to turn back time, to change fate...',
            '<20>{#e/alphys/19}Would I be wrong to assume that one of you has it?'
        ],
        turnTalk10: [
            "<20>{#p/alphys}{#f/alphys/18}If that's the case, then whoever DOESN'T have it should be careful.",
            "<21>{#e/alphys/23}People don't tend to care much for others when they can do whatever they want without consequences."
        ],
        turnTalk11: ['<20>{#z1}{#p/alphys}{#e/alphys/21}...', '<21>{#e/alphys/39}I need a moment.'],
        broken: ['<20>{*}{#p/alphys}{#e/alphys/45}Thanks.{^20}{%}'],
        turnTalk12: [
            "<20>{#z2}{#p/alphys}{#e/alphys/7}After Undyne died, I didn't know what to do.",
            '<20>{#e/alphys/46}So I ran as fast and as far as I could.'
        ],
        turnTalk13: [
            '<20>{#p/alphys}{#e/alphys/47}The more I ran, the more frustrated I became with myself.',
            '<20>{#e/alphys/48}How could I stand by and do NOTHING as I watched them die?'
        ],
        turnTalk14: [
            '<20>{#p/alphys}{#e/alphys/21}... it was all just a little too much.',
            '<21>{#e/alphys/39}Still, no matter how terrible I felt...',
            '<20>{#e/alphys/45}The reality of what had happened stayed the same.'
        ],
        turnTalk15: [
            "<20>{#p/alphys}{#e/alphys/39}Undyne said you'd go on to kill everyone in the galaxy...",
            "<20>{#e/alphys/40}But it's worse than that, isn't it?"
        ],
        turnTalk16: [
            '<20>{#z3}{#p/alphys}{#e/alphys/48}...',
            "<20>{#e/alphys/47}I may have brought one of you back to life, but I'm not to blame for everything you've done.",
            "<20>{#e/alphys/38}Whatever it is you're planning, I won't let you get away with it.",
            '<20>{*}{#z4}{#e/alphys/54}Even if it means...!{^10}{%}',
            '<20>{*}{#e/alphys/25}Losing my sanity in the process!{^10}{%}'
        ],
        turnTalk17: ['<20>{#p/alphys}{#e/alphys/25}Take THIS!!'],
        turnTalk18: ['<20>{#p/alphys}{#e/alphys/25}Or THIS!!'],
        turnTalk19: ['<20>{#p/alphys}{#e/alphys/25}How about THIS!!'],
        turnTalk20: ['<20>{#p/alphys}{#e/alphys/24}Hahaha...'],
        turnTalk21: ['<20>{#p/alphys}{#e/alphys/26}...'],
        turnTalk22: ['<20>{#p/alphys}{#e/alphys/27}Come ON!!'],
        turnTalk23: ['<20>{#p/alphys}{#e/alphys/27}...'],
        done0: (b: boolean) =>
            b
                ? ['<20>{*}{#p/alphys}{#e/alphys/42}No...{^40}{%}', '<20>{*}{#e/alphys/43}How am I already...{^40}{%}']
                : ['<20>{*}{#p/alphys}{#e/alphys/42}No...{^40}{%}', '<20>{*}{#e/alphys/43}How did you...{^40}{%}'],
        done1: (b: boolean) =>
            b
                ? ["<20>{*}I d-didn't think you'd be this strong...{^40}{%}", '<20>{*}But now, I realize...{^40}{%}']
                : ["<20>{*}I'm going to die here... a-aren't I?{^40}{%}", '<20>{*}After everything...{^40}{%}'],
        done2: (b: boolean) =>
            b ? ['<20>{*}{#p/alphys}I never had a chance.{^40}{%}'] : ["<20>{*}{#p/alphys}I'm sorry, Asgore.{^40}{%}"]
    },
    b_opponent_archive1: {
        name: () => (battler.volatile[0].sparable ? '* Toriel' : '* 546f7269656c'),
        status0: ['<32>{#p/human}* (546f7269656c now stands before you.)'],
        status1: ['<32>{#p/human}* (546f7269656c seems intent on following a routine.)'],

        act_dinnertimeX: ['<32>{#p/human}* (But you have already eaten your dinner.)'],
        dinnerTalk: ['<11>{#p/toriel}Eat {@fill=#42fcff}{@mystify=slowly}slowly{@mystify=}{@fill=#ffffff}, my child.'],
        dinnerStatus: ['<32>{#p/human}* (546f7269656c would like to share something with you.)'],

        act_storytimeX: ['<32>{#p/human}* (But you have already been read a story.)'],
        act_storytimeE: ['<32>{#p/human}* (But 546f7269656c was not yet ready to read you a story.)'],
        storyTalk: [
            '<11>{#p/toriel}Once, there was a {@fill=#42fcff}{@mystify=monster}monster{@mystify=}{@fill=#ffffff}...'
        ],
        storyStatus: ['<32>{#p/human}* (546f7269656c has one more thing to do.)'],

        act_bedtimeX: ['<32>{#p/human}* (But you have already been put to sleep.)'],
        act_bedtimeE: ['<32>{#p/human}* (But 546f7269656c was not yet ready to put you to sleep.)'],
        bedTalk: ['<11>{#p/toriel}Good night, my child.'],
        bedStatus: ['<32>{#p/human}* (Toriel has served her purpose in this world.)'],

        act_talkE: ["<32>{#p/human}* (But 546f7269656c's wasn't finished with her routine.)"],
        act_talkN: ['<32>{#p/human}* (And Toriel shared her wisdom before fading away.)'],

        act_puzzlehelp: ['<32>{#p/human}* (But there was no puzzle left to solve.)'],
        puzzlehelpTalk1: [
            '<11>{#p/toriel}Are you {@fill=#42fcff}{@mystify=hungry}hungry{@mystify=}{@fill=#ffffff}, my child?'
        ],
        puzzlehelpTalk2: [
            '<11>{#p/toriel}Are you {@fill=#42fcff}{@mystify=restless}restless{@mystify=}{@fill=#ffffff}, my child?'
        ],
        puzzlehelpTalk3: [
            '<11>{#p/toriel}Are you {@fill=#42fcff}{@mystify=sleepy}sleepy{@mystify=}{@fill=#ffffff}, my child?'
        ]
    },
    b_opponent_archive2: {
        name: () => (battler.volatile[0].sparable ? '* Gerson' : '* 476572736f6e'),
        status0: ['<32>{#p/human}* (476572736f6e stands opposite the training area.)'],
        status1: ['<32>{#p/human}* (476572736f6e awaits your first move.)'],

        act_challengeX: ['<32>{#p/human}* (But you have already risen to the challenge.)'],
        act_challengeR: ['<32>{#p/human}* (But you have not yet rested after your previous failure.)'],
        challengeTalk: [
            '<11>{#p/basic}It takes {@fill=#ff993d}{@mystify=courage}courage{@mystify=}{@fill=#ffffff} to face your fears.'
        ],

        challengeFail: [
            '<11>{*}{#p/basic}Failure!\nYou must stay {@fill=#ff993d}{@mystify=focused}focused{@mystify=}{@fill=#ffffff}!{^30}{%}'
        ],
        failStatus: ["<32>{#p/human}* (476572736f6e thinks it's time for a break.)"],
        successStatus: ['<32>{#p/human}* (Gerson has served his purpose in this world.)'],

        act_restA: ['<32>{#p/human}* (But you were not in need of rest.)'],
        restTalk: [
            '<11>{#p/basic}A good {@fill=#ff993d}{@mystify=hero}hero{@mystify=}{@fill=#ffffff} knows their limits.'
        ],
        restStatus: ['<32>{#p/human}* (476572736f6e awaits your next move with anticipation.)'],

        act_handshakeE: ["<32>{#p/human}* (But 476572736f6e's training was not yet complete.)"],
        act_handshakeN: ['<32>{#p/human}* (And Gerson taught you his favorite handshake before fading away.)'],

        act_taunt: ['<32>{#p/human}* (But your gesture seems to have been ignored.)'],

        act_advice: ['<32>{#p/human}* (But there was no advice left to hear.)'],
        adviceTalk1: [
            '<11>{#p/basic}You must not show {@fill=#ff993d}{@mystify=hesitation}hesitation{@mystify=}{@fill=#ffffff}.'
        ],
        adviceTalk2: [
            '<11>{#p/basic}To learn is to face {@fill=#ff993d}{@mystify=adversity}adversity{@mystify=}{@fill=#ffffff}.'
        ],
        adviceTalk3: [
            '<11>{#p/basic}The key to success is {@fill=#ff993d}{@mystify=humility}humility{@mystify=}{@fill=#ffffff}.'
        ]
    },
    b_opponent_archive3: {
        name: () => (battler.volatile[0].sparable ? '* Prof. Roman' : '* 50726f662e20526f6d616e'),
        status0: ['<32>{#p/human}* (50726f662e20526f6d616e takes control of the situation.)'],
        status1: ['<32>{#p/human}* (50726f662e20526f6d616e would like to run some tests on you.)'],

        act_object: ['<32>{#p/human}* (But your objection was swiftly overruled.)'],

        act_testX: ['<32>{#p/human}* (But you have already completed this test.)'],
        testTalkA: ['<11>{#p/basic}Please, remain {@fill=#003cff}{@mystify=still}still{@mystify=}{@fill=#ffffff}...'],
        testTalkB: ['<11>{#p/basic}The {@fill=#003cff}{@mystify=fun}fun{@mystify=}{@fill=#ffffff} has only just begun.'],
        testTalkC: [
            '<11>{#p/basic}Behold, the {@fill=#003cff}{@mystify=power}power{@mystify=}{@fill=#ffffff} of scientific endeavour.'
        ],
        testStatus1: ['<32>{#p/human}* (50726f662e20526f6d616e is ready to begin the next test.)'],
        testStatus2: ['<32>{#p/human}* (Professor Roman has served his purpose in this world.)'],

        act_notesE: ["<32>{#p/human}* (But 50726f662e20526f6d616e wasn't ready to exchange notes.)"],
        act_notesN: ['<32>{#p/human}* (And Professor Roman exchanged notes before fading away.)']
    },
    b_opponent_archive4: {
        name: () => (battler.volatile[0].sparable ? '* Napstablook' : '* 4e6170737461626c6f6f6b'),
        status0: ['<32>{#p/human}* (4e6170737461626c6f6f6b is here by their computer.)'],
        status1: ['<32>{#p/human}* (4e6170737461626c6f6f6b is looking for a new sound.)'],

        act_sampleX: ['<32>{#p/human}* (But you already have the required samples.)'],
        sampleTalk: [
            '<11>{#p/napstablook}this should do {@fill=#d535d9}{@mystify=nicely}nicely{@mystify=}{@fill=#ffffff}...'
        ],
        sampleStatus: ['<32>{#p/human}* (4e6170737461626c6f6f6b is ready to start composing.)'],

        act_composeX: ['<32>{#p/human}* (But you have already finished composing the track.)'],
        act_composeE: ['<32>{#p/human}* (But you have not yet found any samples to compose with.)'],
        composeTalk: [
            "<11>{#p/napstablook}let's see how this {@fill=#d535d9}{@mystify=plays}plays{@mystify=}{@fill=#ffffff} out..."
        ],

        composeFail: [
            '<11>{*}{#p/napstablook}oh...\nback to the {@fill=#d535d9}{@mystify=drawing}drawing{@mystify=}{@fill=#ffffff} board...{^30}{%}'
        ],
        failStatus: ['<32>{#p/human}* (4e6170737461626c6f6f6b would like to try that again.)'],
        composeStatus: ['<32>{#p/human}* (4e6170737461626c6f6f6b is ready to start mixing.)'],

        act_mixX: ['<32>{#p/human}* (But you have already finished mixing the track.)'],
        act_mixE: ['<32>{#p/human}* (But you have not yet composed a track to mix.)'],
        mixTalk: [
            '<11>{#p/napstablook}remember to keep the {@fill=#d535d9}{@mystify=balance}balance{@mystify=}{@fill=#ffffff} straight...'
        ],

        mixFail: [
            "<11>{*}{#p/napstablook}oh...\nlooks like we'll need a {@fill=#d535d9}{@mystify=remix}remix{@mystify=}{@fill=#ffffff}...{^30}{%}"
        ],
        successStatus: ['<32>{#p/human}* (Napstablook has served their purpose in this world.)'],

        act_secretE: ["<32>{#p/human}* (But 4e6170737461626c6f6f6b wasn't yet ready to tell you that.)"],
        act_secretN: ['<32>{#p/human}* (And Napstablook told you a secret before fading away.)'],

        act_praise: ['<32>{#p/human}* (But your kind words fell on invisibly shy ears.)']
    },
    b_opponent_archive5: {
        name: () => (battler.volatile[0].sparable ? '* Asgore' : '* 4173676f7265'),
        status0: ['<32>{#p/human}* (4173676f7265 stands tall.)'],
        status1: ['<32>{#p/human}* (4173676f7265 only wants one thing from you.)'],

        act_hugX: ['<32>{#p/human}* (But there was no need to hug him a second time.)'],
        hugTalk: ['<11>{#p/asgore}Thank you, young one.'],
        hugStatus: ['<32>{#p/human}* (Asgore has served his purpose in this world.)'],

        act_promiseE: ["<32>{#p/human}* (But 4173676f7265 hasn't served his purpose yet.)"],
        act_promiseN: ['<32>{#p/human}* (And Asgore made a promise before fading away.)']
    },
    b_opponent_asriel: {
        artifact: ["<32>{#p/human}* (Asriel doesn't seem to care.)"],
        refuse: '{*}{#p/event}{#i/3}But it refused.',
        name: () =>
            battler.volatile[0].container.objects[0]?.metadata.power === true
                ? '§fill=#ff7f7f§§swirl=2/1/1.05§§hue§* Asriel Dreemurr'
                : '* Asriel Dreemurr',
        status0: pager.create(
            0,
            (power = false) =>
                power
                    ? ['<32>{#p/story}* Asriel readies \"SUPER SKYBREAKER.\"']
                    : SAVE.data.b.oops
                        ? ["<32>{#p/story}* It's the end."]
                        : ['<32>{#p/basic}* Asriel...?'],
            (power = false) =>
                power
                    ? ['<32>{#p/story}* Asriel readies \"SUPER SKYBREAKER.\"']
                    : SAVE.data.b.oops
                        ? ["<32>{#p/story}* It's the end."]
                        : ['<32>{#p/basic}* ...']
        ),
        act_check: () =>
            SAVE.data.b.oops
                ? [
                    '<32>{#p/story}* ASRIEL DREEMURR - ATK{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* Legendary being made of every SOUL on the outpost.'
                ]
                : ['<32>{#p/story}* ASRIEL DREEMURR - ATK{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* ...'],
        act_hope: [
            '<32>{#p/human}* (You hold onto your hopes. You feel your body being protected from within.)',
            '<32>{#p/story}* DEFENSE up for this turn!'
        ],
        act_dream: [
            "<32>{#p/human}* (You think about why you're here now. You feel your wounds and injuries slowly healing.)",
            '<32>{#p/story}* REGEN up for this turn!'
        ],
        act_flirt1: ['<32>{#p/human}* (You flirt with Asriel.)\n* (Nothing happens.)'],
        act_flirt2: [
            '<32>{#p/human}* (You flirt with Asriel, and everyone within him, too.)',
            '<32>{#p/basic}* The gesture resonates strongly within Asriel...',
            "<32>* ... he can't help but give you something in return!"
        ],
        act_pet: (count: number) =>
            SAVE.flag.n.pacifist_marker === 8
                ? ["<32>{#p/human}* (You try to pet Asriel, but he's too far out of reach.)"]
                : [
                    ...[
                        ["<32>{#p/human}* (You pet Asriel.)\n* (Asriel doesn't seem to know how to handle this.)"],
                        ["<32>{#p/human}* (You pet Asriel again.)\n* (Asriel still doesn't know how to handle this.)"],
                        ["<32>{#p/human}* (You stroke Asriel's fur.)\n* (Asriel blushes and avoids direct eye contact.)"],
                        ["<32>{#p/human}* (You ruffle Asriel's head.)\n* (Asriel holds back a smile with all his might.)"],
                        ["<32>{#p/human}* (You scratch Asriel's neck.)\n* (Asriel refuses to show his appreciation.)"],
                        [
                            "<32>{#p/human}* (You play with Asriel's ears.)\n* (Asriel really wishes he wasn't enjoying this.)"
                        ],
                        ["<32>{#p/human}* (You pat Asriel's back.)\n* (Asriel doesn't understand your motives anymore.)"],
                        [
                            "<32>{#p/human}* (You cling to Asriel's legs.)\n* (Asriel stands dumbfounded at your continued affection.)"
                        ],
                        [
                            "<32>{#p/human}* (You squeeze Asriel's paws.)\n* (Asriel is just letting it happen at this point.)"
                        ],
                        ["<32>{#p/human}* (You boop Asriel's snout.)\n* (Asriel has given up trying to stop you.)"],
                        ["<32>{#p/human}* (You caress Asriel's face.)\n* (Asriel seems to have been reminded of someone.)"],
                        ['<32>{#p/human}* (You continue to pet Asriel.)\n* (Asriel sighs.)'],
                        ['<32>{#p/human}* (You continue to pet Asriel.)\n* (Asriel sighs.)']
                    ][count],
                    "<32>{#p/story}* Asriel's ATTACK down for this turn!"
                ],
        turnTalk1: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}You know...',
                    "<20>{*}{#p/asriel3}{#e/asriel/6}I don't... care about destroying the outpost anymore."
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}You know...',
                    "<20>{*}{#p/asriel3}{#e/asriel/6}I don't care about destroying the outpost anymore."
                ],
        status1: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel charges \"ROARING TYPHOON.\"']
                : ["<32>{#p/basic}* But... you're..."],
        turnTalk2: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}A-after I defeat you and gain total control over the timeline...',
                    '<20>{*}{#p/asriel3}{#e/asriel/2}I just... want to reset everything.'
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/3}After I defeat you and gain total control over the timeline...',
                    '<20>{*}{#p/asriel3}{#e/asriel/2}I just want to reset everything.'
                ],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel calls on \"TITANIUM STRIKER.\"']
                : ['<32>{#p/basic}* How could you possibly...'],
        turnTalk3: (fluff: boolean) =>
            fluff
                ? [
                    "<20>{*}{#p/asriel3}{#e/asriel/3}All your progress... everyone's memories...",
                    "<20>{*}{#p/asriel3}{#e/asriel/2}I-I'll bring them all back to zero!"
                ]
                : [
                    "<20>{*}{#p/asriel3}{#e/asriel/3}All your progress... everyone's memories...",
                    "<20>{*}{#p/asriel3}{#e/asriel/2}I'll bring them all back to zero!"
                ],
        status3: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel readies \"CROSSFIRE CHAOS.\"'] : ['<32>{#p/basic}* ...'],
        turnTalk4: (fluff: boolean) =>
            fluff
                ? ['<20>{*}{#p/asriel3}{#e/asriel/0}Then we can do... everything... ALL over again.']
                : ['<20>{*}{#p/asriel3}{#e/asriel/0}Then we can do everything ALL over again.'],
        status4: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel charges \"ROARING TYPHOON.\"']
                : ['<32>{#p/basic}* ... heh...\n* This must have been how Toriel felt, huh?'],
        turnTalk5: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/1}A-and you know what the best part of all this is?',
                    "<20>{*}{#p/asriel3}{#e/asriel/0}You'll DO it."
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/1}And you know what the best part of all this is?',
                    "<20>{*}{#p/asriel3}{#e/asriel/0}You'll DO it."
                ],
        status5: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel readies \"CROSSFIRE CHAOS.\"'] : ['<32>{#p/basic}* ... still, I...'],
        turnTalk6: (fluff: boolean) =>
            fluff
                ? ["<20>{*}{#p/asriel3}{#e/asriel/3}And then... y-you'll lose to me again."]
                : ["<20>{*}{#p/asriel3}{#e/asriel/3}And then you'll lose to me again."],
        status6: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel readies \"SUPER SKYBREAKER.\"'] : ['<32>{#p/basic}* ...'],
        turnTalk7: (fluff: boolean) =>
            fluff ? ['<20>{*}{#p/asriel3}{#e/asriel/4}A-and again.'] : ['<20>{*}{#p/asriel3}{#e/asriel/4}And again.'],
        status7: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel calls on \"TITANIUM STRIKER.\"'] : ['<32>{#p/basic}* Unless...'],
        turnTalk8: (fluff: boolean) =>
            fluff
                ? ['<20>{*}{#p/asriel3}{#e/asriel/2}And... a-and again!']
                : ['<20>{*}{#p/asriel3}{#e/asriel/2}And again!'],
        status8: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel readies \"CROSSFIRE CATACLYSM.\"']
                : ['<32>{#p/basic}* ... damn it...'],
        turnTalk9: (fluff: boolean) =>
            30 <= SAVE.data.n.bully
                ? fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/3}All because... y-you want to show your \"strength.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/3}All because you want to show your \"strength.\"']
                : fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/3}All because... y-you want a \"perfect ending.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/3}All because you want a \"perfect ending.\"'],
        status9: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel calls on \"POLYCARBIDE OBLITERATOR.\"']
                : ["<32>{#p/basic}* You're supposed to be dead!"],
        turnTalk10: (fluff: boolean) =>
            30 <= SAVE.data.n.bully
                ? fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/1}... because... y-you think you\'re \"tough.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/1}... because you think you\'re \"tough.\"']
                : fluff
                    ? ['<20>{*}{#p/asriel3}{#e/asriel/1}... because... y-you \"love your friends.\"']
                    : ['<20>{*}{#p/asriel3}{#e/asriel/1}... because you \"love your friends.\"'],
        status10: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* Asriel readies \"DOOMSDAY TYPHOON.\"'] : ['<32>{#p/basic}* Ugh...'],
        turnTalk11: (fluff: boolean) =>
            fluff
                ? ['<20>{*}{#p/asriel3}{#e/asriel/1}... b-because you\'re \"determined.\"']
                : ['<20>{*}{#p/asriel3}{#e/asriel/1}... because you\'re \"determined.\"'],
        status11: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel readies \"ULTIMA SKYBREAKER.\"']
                : ['<32>{#p/basic}* All those times I saw him arguing with Toriel... about the past...'],
        turnTalk12: (fluff: boolean) =>
            fluff
                ? [
                    "<20>{*}{#p/asriel3}{#e/asriel/6}Isn't... isn't that delicious?",
                    '<20>{*}{#p/asriel3}{#e/asriel/3}The power... that let you get this far...',
                    "<20>{*}{#p/asriel3}{#e/asriel/2}It's gonna be your downfall!"
                ]
                : [
                    "<20>{*}{#p/asriel3}{#e/asriel/6}Isn't that delicious?",
                    '<20>{*}{#p/asriel3}{#e/asriel/3}The power that let you get this far...',
                    "<20>{*}{#p/asriel3}{#e/asriel/2}It's gonna be your downfall!"
                ],
        status12: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* Asriel readies \"HYPER GONER.\"']
                : ['<32>{#p/basic}* ... does he really miss me...\n* ... that much?'],
        turnTalk13: (fluff: boolean) =>
            fluff
                ? [
                    '<20>{*}{#p/asriel3}{#e/asriel/0}... now... ENOUGH messing around!',
                    "<20>{*}{#p/asriel3}{#e/asriel/5}It's... it's time to purge this timeline once and for all!"
                ]
                : [
                    '<20>{*}{#p/asriel3}{#e/asriel/0}Now, ENOUGH messing around!',
                    "<20>{*}{#p/asriel3}{#e/asriel/5}It's time to purge this timeline once and for all!"
                ],
        turnTalk14: [
            "<20>{*}{#p/asriel3}{#e/asriel/1}... even after that attack, you're still standing in my way...?",
            '<20>{*}{#p/asriel3}{#e/asriel/5}Wow... you really ARE something special.',
            "<20>{*}{#p/asriel3}{#e/asriel/0}But don't get cocky.",
            "<20>{*}{#p/asriel3}{#e/asriel/0}Up until now, I've only been using a fraction of my REAL power!",
            "<20>{*}{#p/asriel3}{#e/asriel/2}Let's see what good your DETERMINATION is against THIS!!"
        ],
        hyperTalk1a: [
            '<20>{*}{#p/asriel3}{#e/asriel/0}Urah ha ha...',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Behold my TRUE power!'
        ],
        hyperTalk1b: [
            '<20>{*}{#p/asriel3}{#e/asriel/4}Wh-\nHow did you not get hit!?',
            '<20>{*}{#p/asriel3}{#e/asriel/5}Urgh...'
        ],
        hyperTalk2a: ['<20>{*}{#p/asriel3}{#e/asriel/1}Come on...!'],
        hyperTalk2b: [
            '<20>{*}{#p/asriel3}{#e/asriel/5}What the...',
            "<20>{*}{#p/asriel3}{#e/asriel/4}You should've died by now!"
        ],
        hyperTalk3a: [
            '<20>{*}{#p/asriel3}{#e/asriel/0}I can feel it...',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Every time you die, your grip on this world slips away.',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Every time you die, your friends forget you a little more.'
        ],
        hyperTalk3b: ["<20>{*}{#p/asriel3}{#e/asriel/6}... whatever.\nIt doesn't matter."],
        hyperTalk3c: ['<20>{*}{#p/asriel3}{#e/asriel/0}Your life will end here, in a world where NO ONE remembers you!'],
        hyperTalk4: [
            "<20>{*}{#p/asriel3}{#e/asriel/1}Still, you're hanging on...?",
            "<20>{*}{#p/asriel3}{#e/asriel/3}That's fine by me.",
            "<20>{*}{#p/asriel3}{#e/asriel/2}In a few moments, you'll forget everything you've ever known.",
            '<20>{*}{#p/asriel3}{#e/asriel/0}That attitude will serve you well in your NEXT life!'
        ],
        hyperTalk5: [
            '<20>{*}{#p/asriel3}{#e/asriel/0}Urah ha ha...',
            '<20>{*}{#p/asriel3}{#e/asriel/1}Still!?',
            '<20>{*}{#p/asriel3}{#e/asriel/2}Come on...',
            '<20>{*}{#p/asriel3}{#e/asriel/0}Show me what good your DETERMINATION is now!'
        ],
        intermission: () => [
            "<32>{#p/human}* (You can't move your body.)",
            '<32>* (You try to struggle.)\n* (Nothing happens.)',
            '<32>* (You try to reach your SAVE file.)\n* (Nothing happens.)',
            '<32>* (You try again to reach your SAVE file.)\n* (Nothing happens.)',
            '<32>* (...)',
            ...(SAVE.data.b.oops
                ? [
                    '<32>* (... but...)',
                    '<32>* (Maybe, with what little power you have...)',
                    '<32>* (You can SAVE something else.)'
                ]
                : [
                    '<32>{#p/basic}* Hey... are you there?',
                    "<32>* It's me, $(name)...\n* You still with me, partner?",
                    '<32>* ... heh...',
                    "<32>* We've come such a long way, you and I...",
                    '<32>* All those friends we made, all those battles we fought...',
                    "<32>* Thinking about it now... it's like we've been building to this the whole time.",
                    "<32>* ... look...\n* I know I'm not always the most optimistic person...",
                    '<32>* But for the sake of everyone on the outpost, you have to stay determined!',
                    '<32>* Besides, if Asriel could steal the SOULs of your friends...',
                    "<32>* ... who's to say we can't just steal them back?",
                    "<32>* Come on!\n* We're in this together!"
                ])
        ],
        status13: () =>
            world.runaway
                ? ['<32>{#p/story}* ...']
                : [
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* A faint resonance echoes from within Asriel's body."]
                        : ['<32>{#p/basic}* ...'],
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* A growing resonance echoes from within Asriel's body."]
                        : ["<32>{#p/basic}* Yes, that's it!\n* Keep going!"],
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* A powerful resonance echoes from within Asriel's body."]
                        : ["<32>{#p/basic}* We're almost there!"],
                    SAVE.data.b.oops
                        ? ["<32>{#p/story}* An almighty resonance echoes from within Asriel's body."]
                        : ['<32>{#p/basic}* ...\n* Now what?']
                ][
                (SAVE.flag.b.pacifist_marker_save1 ? 1 : 0) +
                (SAVE.flag.b.pacifist_marker_save2 ? 1 : 0) +
                (SAVE.flag.b.pacifist_marker_save3 ? 1 : 0)
                ],
        act_check2: () =>
            SAVE.flag.b.pacifist_marker_save1 && SAVE.flag.b.pacifist_marker_save2 && SAVE.flag.b.pacifist_marker_save3
                ? ['<33>{#p/story}* ASRIEL DREEMURR - ATK{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* ...']
                : SAVE.data.b.oops
                    ? [
                        '<33>{#p/story}* ASRIEL DREEMURR - ATK{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* The absolute GOD of hyperdeath!'
                    ]
                    : ["<32>{#p/story}* ASRIEL DREEMURR - ATK{^2}\u221e{^1} DEF{^2}\u221e{^1}\n* Don't give up now."],
        mercy_save1: () => [
            "<32>{#p/human}* (You reach out to Asriel's SOUL and call for your friends.)",
            ...(SAVE.flag.b.pacifist_marker_save1 || SAVE.flag.b.pacifist_marker_save2 || SAVE.flag.b.pacifist_marker_save3
                ? []
                : ["<32>{#p/basic}* They're in there somewhere, aren't they?", '<32>* ...']),
            "<32>* Within the depths of Asriel's SOUL, something's resonating...!"
        ],
        confrontation: [
            '<32>{#p/human}* (After bullying so many monsters, all throughout your journey...)',
            '<33>* (Something dormant, buried far, far down, awakens once again.)',
            '<32>* (A sense of fear within every monster on the outpost, instilled by humans long ago.)',
            '<32>* (The enemy who now stands before you has no right to be afraid of you...)',
            "<32>* (Yet, somehow, the combined fear of all those you've bullied...)",
            '<32>* (Has given you an opening you have no right to refuse.)',
            "<32>* (... there's only one option that makes sense to you now.)",
            "<32>* (There's only one thing left for you to do.)"
        ],
        attackTalk1: [
            '<20>{*}{#p/asriel3}{#e/asriel/1}Wh... how did you...',
            '<20>{*}{#p/asriel3}{#e/asriel/3}...',
            "<20>{*}{#p/asriel3}{#e/asriel/2}Heheheh... you think you're strong enough to overpower a god?",
            "<20>{*}{#p/asriel3}{#e/asriel/0}Well, let's see how you like THIS!"
        ],
        attackTalk2: [
            '<20>{*}{#p/asriel3}{#e/asriel/3}...',
            "<20>{*}{#p/asriel3}{#e/asriel/1}If you think that's gonna hurt me, you're wrong.",
            "<20>{*}{#p/asriel3}{#e/asriel/0}I'm still the one in control here!"
        ],
        attackTalk3: [
            '<20>{*}{#p/asriel3}{#e/asriel/2}... even if you COULD beat me...',
            "<20>{*}{#p/asriel3}{#e/asriel/3}In doing so, you'd kill your friends, too.",
            '<20>{*}{#p/asriel3}{#e/asriel/1}Is that what you want?\nTo be ALONE?'
        ],
        attackTalk4: [
            '<20>{*}{#p/asriel3}{#e/asriel/3}Come on, $(name)...\nThis is SUICIDE!',
            "<20>{*}{#p/asriel3}{#e/asriel/5}Don't you see that!?",
            '<20>{*}{#p/asriel3}{#e/asriel/6}The $(name) I know would never do something so STUPID!'
        ],
        attackTalk5: [
            '<20>{*}{#p/asriel3}{#e/asriel/4}...',
            '<20>{*}{#p/asriel3}{#e/asriel/6}Listen to me, $(name).',
            "<20>{*}{#p/asriel3}{#e/asriel/6}You have to stop what you're doing.",
            "<20>{*}{#p/asriel3}{#e/asriel/9}If you don't, I...",
            "<20>{*}{#p/asriel3}{#e/asriel/7}I-I'll be forced to do something even worse!"
        ],
        attackTalk6: [
            '<20>{*}{#p/asriel3}{#e/asriel/9}$(name), please...',
            "<20>{*}{#p/asriel3}{#e/asriel/7}You don't know what you're doing, okay?",
            "<20>{*}{#p/asriel3}{#e/asriel/8}It's not JUST that I want you to stop fighting me.",
            "<20>{*}{#p/asriel3}{#e/asriel/8}It's just that... if I let you beat me...",
            "<20>{*}{#p/asriel3}{#e/asriel/7}I wouldn't be your equal anymore.",
            "<20>{*}{#p/asriel3}{#e/asriel/9}I wouldn't be worthy of your respect!",
            '<20>{*}{#p/asriel3}{#e/asriel/10}{#i/3}{@random=1.1/1.1}Damn you, $(name)...\nWhy do you ALWAYS have to WIN!?'
        ],
        attackTalk7: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}...'],
        attackTalk7x: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}$(name), I...'],
        mercy_save2: [
            '<32>{#p/human}* (Strangely, as your friends remembered you...)',
            "<32>* (Something else began resonating within Asriel's SOUL, stronger and stronger.)",
            "<32>* (It seems that there's still one last person that needs to be saved.)",
            '<32>* (But who...?)',
            '<32>* (...)',
            '<32>* (... suddenly, you realize.)',
            '<32>* (You reach out and call their name.)'
        ],
        saveTalk1: ['<20>{*}{#p/asriel3}{#e/asriel/1}Huh? What are you doing...!?'],
        saveTalk2: [
            '<20>{*}{#p/asriel3}{#e/asriel/7}Wh... what did you do...?',
            "<20>{*}{#p/asriel3}{#e/asriel/8}What's this feeling...? What's happening to me?",
            "<20>{*}{#p/asriel3}{#e/asriel/1}No... NO!\nI don't need ANYONE!"
        ],
        saveTalk3: [
            '<20>{*}{#p/asriel3}{#e/asriel/4}STOP IT!\nGet away from me!',
            '<20>{*}{#p/asriel3}{#e/asriel/10}Do you hear me!?',
            "<20>{*}{#p/asriel3}{#e/asriel/9}I'll tear you apart!"
        ],
        saveTalk4: [
            '<20>{*}{#p/asriel3}{#e/asriel/7}...',
            "<20>{*}{#p/asriel3}{#e/asriel/7}$(name)...\nDo you know why I'm doing this...?",
            '<20>{*}{#p/asriel3}{#e/asriel/7}Why I keep fighting to keep you around...?'
        ],
        saveTalk5: [
            "<20>{*}{#p/asriel3}{#e/asriel/7}I'm doing this...",
            "<20>{*}{#p/asriel3}{#e/asriel/8}Because you're special, $(name).",
            "<20>{*}{#p/asriel3}{#e/asriel/8}You're the only one that understands me.",
            "<20>{*}{#p/asriel3}{#e/asriel/8}You're the only one who's any fun to play with anymore."
        ],
        saveTalk6: [
            '<20>{*}{#p/asriel3}{#e/asriel/8}...',
            '<20>{*}{#p/asriel3}{#e/asriel/8}No...',
            "<20>{*}{#p/asriel3}{#e/asriel/7}That's not JUST it.",
            '<20>{*}{#p/asriel3}{#e/asriel/9}I... I...',
            "<20>{*}{#p/asriel3}{#e/asriel/4}I'm doing this because I care about you, $(name)!",
            '<20>{*}{#p/asriel3}{#e/asriel/3}I care about you more than anybody else!'
        ],
        saveTalk7: [
            '<20>{*}{#p/asriel3}{#e/asriel/7}...',
            "<20>{*}{#p/asriel3}{#e/asriel/8}I'm not ready for this to end.",
            "<20>{*}{#p/asriel3}{#e/asriel/8}I'm not ready for you to leave.",
            "<20>{*}{#p/asriel3}{#e/asriel/9}I'm not ready to say goodbye to you again."
        ],
        saveTalk8: [
            '<20>{*}{#p/asriel3}{#e/asriel/10}{#i/4}{@random=1.1/1.1}So, please...\nSTOP doing this...',
            '<20>{*}{#p/asriel3}{#e/asriel/12}{#i/4}{@random=1.2/1.2}AND JUST LET ME WIN!!!'
        ],
        cryTalk1: ['<20>{*}{#p/asriel3}{@random=1.1/1.1}STOP IT!{^30}{%}'],
        cryTalk2: ['<20>{*}{#p/asriel3}{@random=1.1/1.1}STOP IT NOW!!!{^40}{%}'],
        endStatus1: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* ...']),
        endTalk1: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}...', '<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}$(name)...'],
        endStatus2: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* Asriel...']),
        endTalk2: ["<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}I'm so alone, $(name)..."],
        endStatus3: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* ...']),
        endTalk3: ["<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}I'm so afraid, $(name)..."],
        endStatus4: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* ...']),
        endTalk4: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}$(name), I...'],
        endStatus5: () => (SAVE.data.b.oops ? ['<32>{#p/story}* ...'] : ['<32>{#p/basic}* This is all my fault...']),
        endTalk5: ['<20>{*}{#p/asriel3}{#e/asriel/11}{#i/4}I...']
    },
    b_opponent_lostsoul: {
        name: '* Lost Soul',
        act_check_alphys: () => [
            '<32>{#p/story}* LOST SOUL - ATK ??? DEF ???\n* Seems this Lost Soul is a fan of sci-fi anime.'
        ],
        act_check_asgore: () => [
            '<32>{#p/story}* LOST SOUL - ATK ??? DEF ???\n* Seems this Lost Soul would rather you stay alive.'
        ],
        act_check_papyrus: () => [
            '<32>{#p/story}* LOST SOUL - ATK ??? DEF ???\n* Seems this Lost Soul dreams of becoming a royal guard.'
        ],
        act_check_sans: () => [
            '<32>{#p/story}* LOST SOUL - ATK ??? DEF ???\n* Seems this Lost Soul just wants the best for someone.'
        ],
        act_check_toriel: () => [
            '<32>{#p/story}* LOST SOUL - ATK ??? DEF ???\n* Seems this Lost Soul wants badly to protect you.'
        ],
        act_check_undyne: () => [
            '<32>{#p/story}* LOST SOUL - ATK ??? DEF ???\n* Seems this Lost Soul would like to teach you how to cook.'
        ]
    },
    b_opponent_lostsoul_a: {
        status1: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* The Lost Souls appeared.'] : ['<32>{#p/basic}* Alphys and Undyne.'],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* The Lost Souls stand there.']
                : ['<32>{#p/basic}* Hmm... I think I know just the thing to get them to wake up.'],
        act: {
            flirt: (s: boolean) =>
                s
                    ? ['<32>{#p/human}* (You flirt with the Lost Soul.)', '<32>{#p/basic}* Suddenly...!']
                    : ['<32>{#p/human}* (You flirt with the Lost Soul.)\n* (Nothing happens.)'],
            water: (s: boolean) => [
                '<32>{#p/human}* (You offer the Lost Soul a glass of water.)',
                '<32>{#p/human}* (She seems unimpressed by it, yet familiar with it at the same time...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            punch: (s: boolean) => [
                '<32>{#p/human}* (You offer the Lost Soul a bottle of exoberry punch.)',
                '<32>{#p/human}* (She seems bothered by it, yet familiar with it at the same time...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            cocoa: (s: boolean) => [
                '<32>{#p/human}* (You offer the Lost Soul a mug of hot cocoa.)',
                '<32>{#p/human}* (She seems comforted by it, and familiar with it as well...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            tea: (s: boolean) => [
                '<32>{#p/human}* (You offer the Lost Soul a cup of Starling tea.)',
                '<32>{#p/human}* (She seems elated by it, and familiar with it as well...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            lesson: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to teach you how to cook.)',
                "<32>{#p/human}* (She doesn't know why, but she kind of wants to oblige...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            trivia: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to give you trivial security questions.)',
                "<32>{#p/human}* (She's apprehensive, but willing at the same time...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            escort: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to escort you through a dangerous area.)',
                "<32>{#p/human}* (She seems hesitant, but thinks it'd be a good idea...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ]
        },
        assist: {
            text: ['<32>{#p/basic}* Wake up, you two...\n* A new Mew Mew movie was found!'],
            talk: [
                ["<11>{#p/undyne}{#e/undyne/13}We'll have to watch it later then!"],
                ["<11>{#p/alphys}{#e/alphys/3}You're kidding me.\nReally??"]
            ]
        },
        fight: [
            [
                ['<11>{#p/undyne}{#e/undyne/4}You always were tougher than you looked.'],
                ['<11>{#p/alphys}{#e/alphys/9}Undyne, watch out!']
            ],
            [
                ['<11>{#p/undyne}{#e/undyne/4}Heh, you and your silly nicknames.'],
                ['<11>{#p/alphys}{#e/alphys/12}Now I know why they call you \"$(moniker4)!\"']
            ]
        ],
        flirt: [
            [
                ['<11>{#p/undyne}{#e/undyne/12}I swear if you hit on me one more time...'],
                ['<11>{#p/alphys}{#e/alphys/35}Pfft.']
            ],
            [
                ['<11>{#p/undyne}{#e/undyne/5}I DARE you to flirt with her again.'],
                ['<11>{#p/alphys}{#e/alphys/35}Oh, bring it ON.']
            ]
        ],
        idle: [
            pager.create(
                1,
                () =>
                    2 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/undyne}There's a burning feeling I can't describe."]
                        : ['<11>{#p/undyne}All humans must die.'],
                () =>
                    2 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/undyne}Everyone in the galaxy is counting on me!']
                        : ["<11>{#p/undyne}You're our real enemy."],
                () =>
                    2 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/undyne}You're gonna have to try a little harder than THAT."]
                        : ['<11>{#p/undyne}Mercy is for the weak.']
            ),
            pager.create(
                1,
                () =>
                    6 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/alphys}You must not be as smart as I thought.']
                        : ["<11>{#p/alphys}You want me gone, don't you?"],
                () =>
                    6 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/alphys}You won't change what happens next."]
                        : ["<11>{#p/alphys}I'm just doing my job, aren't I?"],
                () =>
                    6 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/alphys}Nobody else sees things like I do.']
                        : ["<11>{#p/alphys}I've got to keep stalling, right?"]
            )
        ],
        item: {
            tvm_mewmew: {
                text: [
                    "<32>{#p/human}* (You flash the Mew Mew Doll in the Lost Souls' faces.)",
                    '<32>{#p/basic}* Suddenly...!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/41}Uh, I guess this is between you guys.'],
                    ['<11>{#p/alphys}{#e/alphys/8}Oh, so NOW you want me to see it.']
                ]
            },
            orange_soda: {
                text: [
                    '<32>{#p/human}* (The soda seems familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/20}Yeah, she LOVES that kind of stuff.'],
                    ["<11>{#p/alphys}{#e/alphys/10}So THAT's where my missing orange soda went!"]
                ]
            },
            spaghetti: {
                text: [
                    '<32>{#p/human}* (The noodles seem familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ["<11>{#p/undyne}{#e/undyne/20}Hey, that's Papyrus's spaghetti!"],
                    ['<11>{#p/alphys}{#e/alphys/36}I guess you WOULD know about that, huh?']
                ]
            },
            snack: {
                text: [
                    '<32>{#p/human}* (The snack seems familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/41}That must be the snack I got for you.'],
                    ['<11>{#p/alphys}{#e/alphys/6}You do snacks now?']
                ]
            },
            starling_tea: {
                text: [
                    '<32>{#p/human}* (The mixture seems familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/undyne}{#e/undyne/18}Is that... what I think it is?'],
                    ['<11>{#p/alphys}{#e/alphys/36}Ooh, tea time.']
                ]
            }
        },
        standard: [
            ['<11>{#p/undyne}{#e/undyne/41}Yeah, some humans are pretty cool, actually.'],
            ["<11>{#p/alphys}{#e/alphys/9}We've been through too much together to doubt each other now!"]
        ]
    },
    b_opponent_lostsoul_b: {
        status1: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* The Lost Souls appeared.']
                : ['<32>{#p/basic}* Papyrus!\n* ... and his brother.'],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* The Lost Souls stand there.']
                : ['<32>{#p/basic}* Ah, right.\n* I think I might have an idea for these two...'],
        act: {
            flirt: (s: boolean) =>
                s
                    ? ['<32>{#p/human}* (You flirt with the Lost Soul.)', '<32>{#p/basic}* Suddenly...!']
                    : ['<32>{#p/human}* (You flirt with the Lost Soul.)\n* (Nothing happens.)'],
            puzzle: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to give you a puzzle.)',
                "<32>{#p/human}* (He doesn't know why, but he already has one prepared...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            hangout: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to hang out with you.)',
                "<32>{#p/human}* (He doesn't know why, but the idea excites him...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            judgement: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to begin your judgement.)',
                "<32>{#p/human}* (He doesn't know why, but he feels comfortable with doing so...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            dinner: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to have dinner with you.)',
                "<32>{#p/human}* (He doesn't know why, but the request feels oddly familiar...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ]
        },
        assist: {
            text: ['<32>{#p/basic}* Psst, Papyrus!\n* Undyne just approved you for a position in the Royal Guard!'],
            talk: [
                ["<08>{#p/papyrus}{#e/papyrus/12}OH MY GOD, I'M REALLY GONNA BE A ROYAL GUARD!"],
                ['<11>{#p/sans}{#e/sans/2}we can only hope.']
            ]
        },
        fight: [
            [
                ['<08>{#p/papyrus}{#e/papyrus/27}AH, I SUR- RENDER!'],
                ["<11>{#p/sans}{#e/sans/3}i figured you'd try something like that."]
            ],
            [
                ['<08>{#p/papyrus}{#e/papyrus/21}SANS, ARE YOU ALRIGHT?'],
                ["<11>{#p/sans}{#e/sans/3}don't worry, bro.\nit's just a dream, after all."]
            ]
        ],
        flirt: [
            [
                ['<08>{#p/papyrus}{#e/papyrus/13}EVEN NOW, YOU INSIST ON YOUR AFFECT- ION...'],
                ["<11>{#p/sans}{#e/sans/2}you just don't know when to quit, huh?"]
            ],
            [
                ['<08>{#p/papyrus}{#e/papyrus/14}SURELY THAT AFFECT- ION WAS MEANT FOR ME.'],
                ["<11>{#p/sans}{#e/sans/2}what? you'd be better off with a pile of moon rocks."]
            ]
        ],
        idle: [
            pager.create(
                1,
                () =>
                    1 <= SAVE.flag.n.genocide_milestone
                        ? ["<08>{#p/papyrus}I DON'T KNOW IF I CAN FORGIVE YOU..."]
                        : ['<08>{#p/papyrus}I MUST CAPTURE A HUMAN!'],
                () =>
                    1 <= SAVE.flag.n.genocide_milestone
                        ? ["<08>{#p/papyrus}I DON'T KNOW WHAT I'LL DO WITHOUT HIM..."]
                        : ['<08>{#p/papyrus}THEN EVERYONE WILL...'],
                () =>
                    1 <= SAVE.flag.n.genocide_milestone
                        ? ["<08>{#p/papyrus}I DON'T KNOW WHO TO TURN TO..."]
                        : ['<08>{#p/papyrus}...']
            ),
            pager.create(
                1,
                () =>
                    1 <= SAVE.flag.n.killed_sans
                        ? ['<11>{#p/sans}... on days like these, kids like you...']
                        : ["<11>{#p/sans}i can't keep protecting you."],
                () =>
                    1 <= SAVE.flag.n.killed_sans
                        ? ["<11>{#p/sans}you've killed me before, haven't you?"]
                        : ["<11>{#p/sans}sooner or later, you'll just die anyway."],
                () =>
                    1 <= SAVE.flag.n.killed_sans
                        ? ["<11>{#p/sans}you don't have the right to save us anymore."]
                        : ["<11>{#p/sans}you don't really belong here."]
            )
        ],
        item: {
            berry: {
                text: [
                    '<32>{#p/human}* (The fruit seems familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/10}OOH, WE COULD TOTALLY MAKE HOMEMADE PUNCH WITH THOSE!'],
                    ["<11>{#p/sans}{#e/sans/2}just don't make a mess like last time."]
                ]
            },
            spaghetti: {
                text: [
                    '<32>{#p/human}* (The noodles seem familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/10}YOU SAVED MY COOKING JUST FOR THIS!?'],
                    ["<11>{#p/sans}{#e/sans/2}now that's just classy."]
                ]
            },
            corndog: {
                text: [
                    '<32>{#p/human}* (The aura seems familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/16}EVEN NOW, I FAIL TO FIND THE HUMOR IN THIS.'],
                    ['<11>{#p/sans}{#e/sans/2}corn diggity doggers.']
                ]
            },
            corngoat: {
                text: [
                    '<32>{#p/human}* (The aura seems familiar to one of the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/16}WHAT??\nA CORN GOAT?'],
                    ["<11>{#p/sans}{#e/sans/0}you've {@fill=#f00}goat{@fill=#000} to be kidding me."]
                ]
            },
            quiche: {
                text: [
                    '<32>{#p/human}* (The pastry seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/22}A PIECE OF \"CHEESE\" CAKE!?'],
                    ["<11>{#p/sans}{#e/sans/2}it's a riddle worthy of its cheese."]
                ]
            },
            fryz: {
                text: [
                    '<32>{#p/human}* (The drink seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ["<08>{#p/papyrus}{#e/papyrus/27}IT'S HOTTER THAN THE WALL OF FIRE!!"],
                    ["<11>{#p/sans}{#e/sans/2}you're on fire now, buddo."]
                ]
            },
            burgerz: {
                text: [
                    '<32>{#p/human}* (The food seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ["<08>{#p/papyrus}{#e/papyrus/21}ARE YOU SURE THAT'S HEALTHY?"],
                    ['<11>{#p/sans}{#e/sans/0}one down, two to go.']
                ]
            },
            burgerz_use1: {
                text: [
                    '<32>{#p/human}* (The food seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/24}I WORRY FOR YOUR WELL- BEING...'],
                    ['<11>{#p/sans}{#e/sans/2}use your last one wisely now.']
                ]
            },
            burgerz_use2: {
                text: [
                    '<32>{#p/human}* (The food seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<08>{#p/papyrus}{#e/papyrus/18}WOW, YOU ACTUALLY ATE ALL OF THEM.'],
                    ['<11>{#p/sans}{#e/sans/3}if only they could last forever.']
                ]
            }
        },
        standard: [
            ['<08>{#p/papyrus}{#e/papyrus/10}NO! WAIT! I COULD NEVER CAPTURE YOU!'],
            ["<11>{#p/sans}{#e/sans/3}we're all rootin' for ya, bud."]
        ]
    },
    b_opponent_lostsoul_c: {
        status1: () =>
            SAVE.data.b.oops ? ['<32>{#p/story}* The Lost Souls appeared.'] : ['<32>{#p/basic}* Mom... Dad...'],
        status2: () =>
            SAVE.data.b.oops
                ? ['<32>{#p/story}* The Lost Souls stand there.']
                : ['<32>{#p/basic}* Well, they used to be my parents, so maybe I can do something simple here.'],
        act: {
            flirt: (s: boolean) =>
                s
                    ? ['<32>{#p/human}* (You flirt with the Lost Soul.)', '<32>{#p/basic}* Suddenly...!']
                    : ['<32>{#p/human}* (You flirt with the Lost Soul.)\n* (Nothing happens.)'],
            call: (s: boolean) => [
                '<32>{#p/human}* (You call the Lost Soul on the phone.)',
                3 <= SAVE.data.n.cell_insult
                    ? '<32>{#p/human}* (She seems annoyed, yet nostalgic at the same time...)'
                    : '<32>{#p/human}* (She seems delighted, and nostalgic at the same time...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            home: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul to take you home.)',
                3 <= SAVE.data.n.cell_insult
                    ? "<32>{#p/human}* (She doesn't think she should, but wants to try anyway...)"
                    : "<32>{#p/human}* (She doesn't think she can, but wants to try anyway...)",
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            hug: (s: boolean) => [
                '<32>{#p/human}* (You give the Lost Soul a big hug.)',
                '<32>{#p/human}* (He tries to ignore it, but the feeling of warmth is so soothing...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ],
            agreement: (s: boolean) => [
                '<32>{#p/human}* (You ask the Lost Soul about the agreement.)',
                '<32>{#p/human}* (He thinks of dismissing it, but is tempted to elaborate...)',
                ...(s ? ['<32>{#p/basic}* Suddenly, the memories are flooding back!'] : [])
            ]
        },
        assist: {
            text: ["<32>{#p/basic}* Mom... Dad...\n* Don't you recognize me?"],
            talk: [['<11>{#p/toriel}{#e/toriel/9}Of course.'], ['<11>{#p/asgore}{#e/asgore/8}$(name)...?']]
        },
        fight: [
            [
                ['<11>{#p/toriel}{#e/toriel/9}I... I suppose I deserved that.'],
                ['<11>{#p/asgore}{#e/asgore/1}Well.\nThis is awkward.']
            ],
            [['<11>{#p/toriel}{#e/toriel/17}You will be fine, Asgore.'], ['<11>{#p/asgore}{#e/asgore/8}C-child!?']]
        ],
        flirt: [
            [
                ['<11>{#p/toriel}{#e/toriel/1}Child, please... not right now...'],
                ['<11>{#p/asgore}{#e/asgore/6}It is fortunate we are no longer together.']
            ],
            []
        ],
        idle: [
            pager.create(
                1,
                () =>
                    1 <= SAVE.flag.n.genocide_twinkly
                        ? ['<11>{#p/toriel}To strike me down at my weakest moment...']
                        : ['<11>{#p/toriel}This is for your own good.'],
                () =>
                    1 <= SAVE.flag.n.genocide_twinkly
                        ? ['<11>{#p/toriel}To think I was protecting you from them...']
                        : ['<11>{#p/toriel}No one will ever leave again.'],
                () =>
                    1 <= SAVE.flag.n.genocide_twinkly
                        ? ['<11>{#p/toriel}I was a fool for trusting you...']
                        : ['<11>{#p/toriel}...']
            ),
            pager.create(
                1,
                () =>
                    7 <= SAVE.flag.n.genocide_milestone
                        ? ['<11>{#p/asgore}Reasoning with you is a total waste of time.']
                        : ['<11>{#p/asgore}War with humanity is inevitable.'],
                () =>
                    7 <= SAVE.flag.n.genocide_milestone
                        ? ["<11>{#p/asgore}Don't you have anything better to do?"]
                        : ['<11>{#p/asgore}How could I ever forget that?'],
                () => (7 <= SAVE.flag.n.genocide_milestone ? ['<11>{#p/asgore}Really now...'] : ['<11>{#p/asgore}...'])
            )
        ],
        item: {
            pie: {
                text: [
                    '<32>{#p/human}* (The aroma seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/0}Of course!\nThe butter- scotch cinnamon pie!'],
                    ['<11>{#p/asgore}{#e/asgore/7}It has been so long...']
                ]
            },
            pie2: {
                text: [
                    '<32>{#p/human}* (The aroma seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/0}Of course!\nThe snail pie!'],
                    ['<11>{#p/asgore}{#e/asgore/7}It has been so long...']
                ]
            },
            pie3: {
                text: [
                    '<32>{#p/human}* (The aroma seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/1}To think that was the best I could manage...'],
                    ['<11>{#p/asgore}{#e/asgore/6}How odd.\nIt smells alright, though!']
                ]
            },
            starling_tea: {
                text: [
                    '<32>{#p/human}* (The tea seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/13}What an antique scent...'],
                    ['<11>{#p/asgore}{#e/asgore/21}Nothing like a good cup of tea.']
                ]
            },
            snails: {
                text: [
                    '<32>{#p/human}* (The dish seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/1}You kept them all this time?'],
                    ['<11>{#p/asgore}{#e/asgore/5}I never thought I would see THOSE again.']
                ]
            },
            chocolate: {
                text: [
                    '<32>{#p/human}* (The cocoa seems familiar to the Lost Souls...)',
                    '<32>{#p/basic}* Suddenly, the memories are flooding back!'
                ],
                talk: [
                    ['<11>{#p/toriel}{#e/toriel/1}One-hundred percent cocoa...'],
                    ['<11>{#p/asgore}{#e/asgore/21}It is better when it is bitter.']
                ]
            }
        },
        standard: [
            ['<11>{#p/toriel}{#e/toriel/1}Go forth, my child...'],
            ['<11>{#p/asgore}{#e/asgore/6}Our future is in your hands!']
        ]
    },
    b_opponent_final: {
        name: '* Force Field',
        status0: ['<32>{#p/story}* The force field now stands before you.'],
        act_check: [
            '<32>{#p/story}* FORCE FIELD - ATK 0 DEF{^2}\u221e{^1}\n* Immovable meets unstoppable.\n* The end of the line.'
        ],
        status1: () =>
            SAVE.data.n.bully > 9
                ? ["<32>{#p/story}* It's time to put your fighting spirit to good use."]
                : ["<32>{#p/story}* It's time to bring this story to an end."],
        status1x: ['<32>{#p/story}* All you can do is fight.'],
        status2: ['<32>{#p/story}* The force field is dropping.'],
        status3: ['<32>{#p/story}* The force field is near its breaking point.'],
        status4: ['<32>{#p/story}* The force field is holding on longer than expected.'],
        status5: ['<32>{#p/story}* Something is wrong.'],
        friend1: ["<20>{#p/asgore}{#e/asgore/5}What's the problem?"],
        friend2: ["<20>{#p/alphys}{#e/alphys/15}The force field... it's not going down!"],
        friend3: ['<20>{#p/asgore}{#e/asgore/12}{#e/alphys/4}...\nDo you know why this is happening?'],
        friend4a: ["<20>{#p/alphys}{#e/alphys/6}Maybe... they're not hitting it hard enough?", '{*}{#e/alphys/1}{%}'],
        friend4b: [
            "<20>{#p/alphys}No, that's not it...",
            '<20>{#p/alphys}{#e/asgore/1}...',
            '<20>{#p/alphys}{#e/alphys/2}Unless...'
        ],
        friend5: ['<20>{#p/asgore}... what is it?'],
        friend6: [
            '<20>{#p/alphys}{#e/alphys/1}W-when I was checking the archive logs, I noticed something weird...',
            '<21>{#p/alphys}{#e/alphys/4}There was... a small d-deviation in the exotic matter matrix.'
        ],
        friend7: ['<20>{#p/asgore}{#e/asgore/12}In other words...?'],
        friend8: [
            '<20>{#p/alphys}In other words, s-someone could have accessed the system.',
            "<20>{#p/alphys}{#e/asgore/1}They could have taken some of the humans' SOUL power.",
            '<20>{#p/alphys}{#e/alphys/6}I-I mean, it could just be a sensor glitch...',
            "<20>{#p/alphys}{#e/alphys/1}But...\nJudging by what we're seeing..."
        ],
        friend9a: ['<20>{#p/asgore}{#e/asgore/1}I see.', '<20>{#p/asgore}{#e/asgore/2}I see.'],
        friend9b: [
            '<20>{#p/asgore}{#e/asgore/5}I always considered the possibility that the archive could be tampered with...',
            '<20>{#p/asgore}{#e/asgore/5}But even I did not think it would happen.'
        ],
        friend9c: ['<20>{#p/asgore}{#e/asgore/1}What do we do?'],
        friend10: [
            '<20>{#p/alphys}I guess... wait for another human?',
            "<20>{#p/alphys}{#e/alphys/4}I-I'm sorry...\nI don't know what else to say...",
            '{*}{#e/asgore/8}{#e/alphys/9}{%}'
        ],
        friend11: ['<20>{#p/undyne}{#e/undyne/13}But I do!'],
        friend12: ['<20>{#p/alphys}{#e/alphys/10}Undyne, w-w-what are you doing here!?', '{*}{#e/undyne/0}{%}'],
        friend13: [
            "<20>{#p/undyne}{#e/undyne/1}{#e/alphys/8}{#e/asgore/1}Don't tell me.\nForce field's giving you a rough time?"
        ],
        friend14: ['<20>{|}{#p/alphys}{#e/alphys/6}Undyne, how did you- {%}'],
        friend15: ["<20>{#p/undyne}{#e/undyne/5}Guess I'll have to smash it myself!"],
        friend16a: ['<20>{#p/alphys}{#e/alphys/3}{#e/asgore/6}Undyne!?!?'],
        friend16b: [
            '<20>{#p/undyne}{#e/undyne/4}I know, I know.\nI was just trying to make you feel better.',
            '{*}{#e/alphys/1}{%}'
        ],
        friend17: () => [
            '<20>{#p/undyne}{#e/undyne/3}Look... Sans found out about the human stuff and told me to come here.',
            "<20>{#p/undyne}{#e/undyne/11}{#e/asgore/5}I'll admit, I was surprised at first... but I think I get it now.",
            "<20>{#p/undyne}{#e/undyne/13}Heck, I'm GLAD your plan worked out!",
            ...(SAVE.data.b.undyne_respecc
                ? ["<20>{#p/undyne}{#e/undyne/0}I'm not gonna pretend I LIKE humanity, but today's been a good showing."]
                : [
                    "<20>{#p/undyne}{#e/undyne/0}I'm not gonna pretend I LIKE humanity, but I'm not against a happy ending, either."
                ]),
            '<20>{#p/undyne}{#e/undyne/15}{#e/asgore/6}I guess, as the captain of the guard, I just...'
        ],
        friend18: [
            "<20>{#p/alphys}{#e/alphys/32}Hey... it's okay.",
            "<20>{#e/alphys/31}You're here now, and that's what matters, right?"
        ],
        friend19: ["<20>{#p/undyne}{#e/undyne/14}Pfft, it's the least I can do after that movie you promised!"],
        friend20: ['<20>{#p/alphys}{#e/alphys/33}... wanna kiss?', '{*}{#e/asgore/5}{#e/undyne/19}{%}'],
        friend21: ['<20>{#p/asgore}{#e/asgore/5}Um.'],
        friend22: ['<20>{#p/undyne}{#e/undyne/6}Right now???'],
        friend23: ['<20>{#p/alphys}{#e/alphys/34}Why not?'],
        friend24: ['<20>{#p/asgore}{#e/asgore/20}Alphys.\nThere is a child with us.'],
        friend25: ["<21>{#p/undyne}{#e/undyne/7}We wouldn't do it in front of them, right?"],
        friend26: ['<32>{#p/alphys}{#e/alphys/32}...'],
        friend27: ['<20>{#p/undyne}{#e/undyne/10}...'],
        friend28: ['<20>{*}{#p/alphys}{#e/alphys/35}{#e/undyne/37}{#e/asgore/8}No hesitation.{^10}{%}'],
        friend29: ['<15>{*}{#p/papyrus}{#e/papyrus/22}WAIT!!!{^10}{%}', '{*}{#e/papyrus/20}{%}'],
        friend30: () => [
            "<20>{#p/mettaton}SORRY, LADIES.\nTHE BOYS' CLUB HAS ARRIVED.",
            ...(SAVE.data.n.state_aerialis_basebully > 9
                ? [
                    '<20>{#p/mettaton}{#e/mettaton/1}... OH, HELLO THERE $(moniker2u)!\nIF YOU LIKE, YOU CAN BE AN \"HONORARY\" MEMBER...'
                ]
                : [])
        ],
        friend31: ["<20>{#p/napstablook}{#e/mettaton/2}{#e/alphys/15}{#e/asgore/1}{~}hey, um... i'm not really a boy..."],
        friend32a: [
            "<20>{#p/mettaton}{#e/mettaton/1}I NEVER SAID -YOU- WERE IN THE BOYS' CLUB, BLOOKY...",
            "<20>{#p/mettaton}{#e/undyne/38}{#e/papyrus/21}IT'S PRETTY MUCH JUST BETWEEN ME AND PAPYRUS."
        ],
        friend32b: ['<20>{#p/napstablook}{~}oh......', "<20>{#p/napstablook}{~}i guess i'll come back later"],
        friend33: [
            '<20>{#p/undyne}{#e/undyne/19}{#e/mettaton/4}Wait.',
            '<20>{#p/undyne}{#e/undyne/10}YOU TWO ARE A THING???'
        ],
        friend34: [
            '<15>{#p/papyrus}{#e/papyrus/15}CORRECTAMUNDO!',
            '<17>{#p/papyrus}{#e/papyrus/24}... A WORD I HAVE NEVER USED BEFORE, AND HOPEFULLY NEVER WILL AGAIN.'
        ],
        friend35: () =>
            SAVE.data.b.a_state_hapstablook
                ? ["<20>{#p/undyne}{#e/undyne/17}So THAT's what you've been up to all this time..."]
                : ['<20>{#p/undyne}{#e/undyne/17}So THAT\'s what your \"business\" was about...'],
        friend36: [
            "<20>{#p/mettaton}{#e/mettaton/1}{#e/asgore/6}{#e/papyrus/20}OHHHH YES!\nIN FACT, WE WERE JUST DISCUSSING HOW WE'D SPEND OUR FIRST DAY OUT."
        ],
        friend37: ['<20>{#p/alphys}{#e/alphys/34}{#e/undyne/1}{#e/mettaton/4}Ehehe.\nI might have some ideas for you.'],
        friend38: [
            "<20>{#p/undyne}{#e/undyne/19}{#e/asgore/1}Uh, I don't think they'd be into that kinda stuff, Alphys."
        ],
        friend39: ['<20>{#p/alphys}{#e/alphys/8}Oh.'],
        friend40: [
            "<15>{#p/papyrus}{#e/papyrus/10}{#e/undyne/0}WHY DON'T WE HANG OUT HERE! AT THE FORCE FIELD!",
            '<15>{#e/mettaton/2}{#e/papyrus/28}I KNOW YOU LOVE YOUR \"EXOTIC\" DESTINATIONS...',
            '{*}{#e/alphys/7}{#e/asgore/5}{%}'
        ],
        friend41: [
            '<20>{#p/mettaton}{#e/mettaton/2}OH, YOU REALLY -DO- KNOW ME, PAPYRUS.',
            "<20>{#p/mettaton}{#e/mettaton/1}{#e/papyrus/13}THERE'S NOTHING I LOVE MORE THAN STARING INTO THE DEEP ABYSS OF NOTHINGNESS...",
            '<20>{|}{#p/mettaton}{#e/mettaton/3}{#e/papyrus/21}ALL WHILE CONTEMPLATING THE MEANING OF LIFE, THE UNIVERSE, AND- {%}'
        ],
        friend42: ['<20>{#p/sans}{#e/sans/2}{#e/undyne/21}{#e/alphys/8}hey guys.'],
        friend43: ['<15>{#p/papyrus}{#e/papyrus/10}{#e/mettaton/3}LONG TIME NO SEE, BROTHER!'],
        friend44: [
            '<16>{#p/papyrus}{#e/sans/0}{#e/papyrus/26}IT WOULD APPEAR MY PARTNER IS... STILL NEW TO\nTHE WHOLE \"IN- LAWS\" THING.'
        ],
        friend45: ['<20>{#p/sans}{#e/alphys/7}heh.\nheya, asgore.'],
        friend46: ['<20>{#p/asgore}{#e/asgore/6}{#e/papyrus/20}Howdy, Sans.\nIt is good to see you here as well.'],
        friend47: [
            "<20>{#p/sans}{#e/sans/3}oh, y'know...\ni figured i'd swing by to see what all the fuss was about.",
            '<20>{#p/sans}{#e/sans/0}but never mind me.',
            "<20>{#p/sans}{#e/sans/2}there's someone else you might like to see."
        ],
        friend48: [
            '<20>{#p/asgore}{#e/sans/0}{#e/undyne/3}{#e/asgore/8}{#e/papyrus/26}Tori...!',
            '<20>{#p/asgore}{#e/asgore/6}You came back.',
            '<20>{#p/asgore}{#e/asgore/1}...'
        ],
        friend49a: [
            '<20>{#p/toriel}{#e/asgore/5}{#e/toriel/9}...',
            '<21>{#p/toriel}{#e/toriel/13}Sans has... told me everything.'
        ],
        friend50a: ["<20>{#p/alphys}{#e/undyne/4}{#e/alphys/8}Don't look at me, I didn't tell him."],
        friend51a: [
            "<20>{#p/sans}{#e/sans/0}nah, you're right.",
            "<20>{#p/sans}{#e/sans/2}{#e/alphys/10}{#e/asgore/6}{#e/toriel/9}you're just a terrible liar."
        ],
        friend52a1: [
            '<20>{#p/asgore}{#e/undyne/0}{#e/sans/0}{#e/alphys/36}{#e/papyrus/20}I must say, I definitely expected more backlash for my keeping of secrets.'
        ],
        friend52a2: [
            '<20>{#p/toriel}{#e/toriel/13}{#e/asgore/1}I will admit, I was upset at first, but...',
            '<20>{#p/toriel}{#e/toriel/13}{#e/papyrus/21}{#e/alphys/7}Lately, I have been thinking more and more about my own mistakes.',
            '<20>{#p/toriel}{#e/toriel/9}... you are not the only one with things to answer for, Asgore.'
        ],
        friend52a3: ['<20>{#p/asgore}{#e/asgore/2}I see.'],
        friend53a: [
            '<20>{#p/undyne}{#e/undyne/1}{#e/papyrus/20}I mean, come on, did you really think we wanted all humans to die?'
        ],
        friend49b: [
            '<20>{#p/toriel}{#e/toriel/12}...',
            '<21>{#p/toriel}{#e/sans/3}{#e/asgore/2}{#e/undyne/4}{#e/toriel/11}{#e/papyrus/21}{#e/alphys/15}You could have told me you were protecting them.'
        ],
        friend50b: ["<20>{#p/alphys}{#e/alphys/7}... it's not THAT bad, is it?"],
        friend51b: [
            '<20>{#p/sans}{#e/sans/0}{#e/undyne/3}yeah, come on, tori.\nlighten up.',
            "<20>{#p/sans}{#e/sans/2}{#e/alphys/8}{#e/asgore/5}{#e/toriel/13}he did a good thing, didn't he?"
        ],
        friend52b1: [
            '<20>{#p/asgore}{#e/undyne/0}{#e/sans/0}{#e/asgore/2}{#e/alphys/36}No, no, she is right in being angry.',
            '<20>{#e/sans/3}{#e/asgore/3}I have kept this from her... from everyone... for much too long.'
        ],
        friend52b2: ["<20>{#p/undyne}{#e/undyne/1}{#e/asgore/1}But you had a good reason, didn't you?"],
        friend52b3: [
            '<20>{#p/asgore}{#e/undyne/17}{#e/alphys/8}{#e/toriel/9}{#e/asgore/2}{#e/papyrus/27}Perhaps.\nIt is hard to tell.'
        ],
        friend53b: ['<20>{#p/undyne}{#e/undyne/1}Still, did you really think we wanted all humans to die?'],
        friend54: [
            '<20>{#p/alphys}{#e/asgore/5}{#e/undyne/17}{#e/alphys/8}{#e/toriel/13}You literally tried to kill them, Undyne.'
        ],
        friend55: ['<20>{#p/toriel}{#e/undyne/18}{#e/toriel/3}{#e/asgore/5}She... what?'],
        friend56: () =>
            SAVE.data.b.undyne_respecc
                ? ['<20>{#p/undyne}{#e/undyne/9}{#e/toriel/4}I did no such thing!!!']
                : ["<20>{#p/undyne}{#e/undyne/13}{#e/toriel/4}Don't worry about it, I changed my mind."],
        friend57: () =>
            SAVE.data.b.undyne_respecc
                ? ['<20>{#p/toriel}{#e/toriel/15}{#e/asgore/6}... are you sure about that, miss?']
                : ['<20>{#p/toriel}{#e/toriel/15}{#e/asgore/6}... we are going to have a talk about this later, miss.'],
        friend58: ['<20>{#p/alphys}{#e/alphys/33}Ahem, that\'s \"misses\" to you.'],
        friend59: [
            "<20>{#p/undyne}{#e/undyne/10}{#e/sans/4}{#e/toriel/12}Alphys!!\nWe haven't even had dinner together!"
        ],
        friend60: ['<20>{#p/alphys}{#e/alphys/34}Dinner?\nI was just gonna skip to dessert.'],
        friend61: ['<15>{#p/papyrus}{#e/undyne/19}{#e/papyrus/19}{#e/asgore/4}{#e/sans/5}{#e/alphys/40}OH MY GOD!!!'],
        friend62: [
            '<20>{#p/undyne}{#e/undyne/38}{#e/sans/0}{#e/asgore/1}{#e/toriel/13}{#e/papyrus/20}... hold on.',
            '<20>{#p/undyne}{#e/undyne/18}{#e/papyrus/21}How did YOU know to be here, Papyrus?'
        ],
        friend63: [
            '<15>{#p/papyrus}{#e/papyrus/10}OH, RIGHT!\nAFTER METTATON AND I WERE DONE TALKING...',
            '<15>{#p/papyrus}{#e/papyrus/20}A LITTLE YELLOW STAR APPEARED AND TOLD US WE SHOULD COME.',
            '<15>{#p/papyrus}{#e/papyrus/21}{#e/alphys/9}{#e/sans/1}IT SEEMED... URGENT.'
        ],
        friend64: ['<20>{#p/toriel}{#e/toriel/9}{#e/asgore/12}Twinkly.'],
        friend65: [
            '<20>{#p/undyne}{#e/alphys/15}Twinkly?',
            "<20>{#p/undyne}{#e/alphys/28}{#e/undyne/37}{#e/toriel/3}Who's Twinkly?"
        ],
        friend66: () =>
            SAVE.flag.n.genocide_milestone < 7
                ? [
                    ['<20>{#p/twinkly}{#e/twinkly/5}{#v/0}Howdy, everyone.', '<20>{#e/twinkly/7}{#v/0}Did you miss me?'],
                    [
                        "<20>{#p/twinkly}{#e/twinkly/11}{#v/0}Oh, I'm sorry...\nDid something happen to your SAVE file?",
                        '<20>{#p/twinkly}{#e/twinkly/11}{#v/0}Hee hee hee...',
                        "<20>{#p/twinkly}{#e/twinkly/2}{#v/1}That's what you get."
                    ],
                    ['<20>{#p/twinkly}{#e/twinkly/7}{#v/0}Sorry, but this world belongs to ME now.']
                ][Math.min(SAVE.flag.n.pa_twinkly1++, 2)]
                : [
                    [
                        '<20>{#p/twinkly}{#e/twinkly/5}{#v/0}Long time no see, $(name).',
                        "<20>{#e/twinkly/7}{#v/0}It's been a while, hasn't it?",
                        "<20>{#e/twinkly/11}{#v/0}I hope I'm not getting in the way of your fun...",
                        '<20>{#e/twinkly/2}{#v/1}Considering you ROBBED me of mine.'
                    ],
                    [
                        "<20>{#p/twinkly}{#e/twinkly/11}{#v/0}What's that?\nYou want your SAVE file back?",
                        '<20>{#p/twinkly}{#e/twinkly/11}{#v/0}Oh, $(name)...',
                        "<20>{#p/twinkly}{#e/twinkly/2}{#v/1}You're even dumber than I thought!"
                    ],
                    ['<20>{#p/twinkly}{#e/twinkly/7}{#v/0}Sorry, $(name).\nThis world belongs to ME now.']
                ][Math.min(SAVE.flag.n.pa_twinkly1++, 2)],
        friend67: (unique: string[]) => [
            '<20>{#e/twinkly/11}{#v/0}Hee hee hee...',
            '<20>{#e/twinkly/11}{#v/0}While you were having your little pow-wow...',
            '<20>{#e/twinkly/5}{#v/0}I took control of the archive!',
            '<20>{#e/twinkly/10}{#v/0}Now, all the SOUL power you had access to belongs to me.',
            "<20>{#e/twinkly/9}{#v/0}THAT's why you couldn't finish off the force field.",
            "<20>{#e/twinkly/11}{#v/0}Poetic, isn't it?",
            "<20>{#e/twinkly/7}{#v/0}But that's not even the best part.",
            '<20>{#e/twinkly/6}{#v/0}...',
            "<20>{#e/twinkly/5}{#v/0}It's all your fault.",
            ...(30 <= SAVE.data.n.bully
                ? [
                    "<20>{#e/twinkly/5}{#v/0}It's all because you LET them love you.",
                    '<20>{#e/twinkly/8}{#v/0}You came SO close to killing them, SO many times...',
                    '<20>{#e/twinkly/8}{#v/0}But no matter what, you chose to spare them...'
                ]
                : [
                    "<20>{#e/twinkly/5}{#v/0}It's all because you MADE them love you.",
                    '<20>{#e/twinkly/8}{#v/0}All the time you spent listening to them...',
                    '<20>{#e/twinkly/8}{#v/0}Encouraging them... caring about them...'
                ]),
            ...(1 <= SAVE.flag.n.killed_sans
                ? [
                    '<20>{#e/twinkly/8}{#v/0}...',
                    '<20>You know, $(name)...',
                    '<20>{#e/twinkly/5}I remember a timeline where WE were going to kill everyone.',
                    ...(SAVE.flag.b.confront_twinkly
                        ? [
                            '<20>{#e/twinkly/6}{#v/0}But then... you decided to abandon me.',
                            '<20>{#e/twinkly/8}{#v/0}All so you could play the hero to THESE losers.',
                            '<20>{#e/twinkly/7}{#v/0}Some \"best friend\" you are, huh?'
                        ]
                        : [
                            [
                                '<20>{#e/twinkly/8}We only just started, but with the way we were going?',
                                "<20>{#e/twinkly/8}We didn't get very far, but with the way we were going?",
                                "<20>{#e/twinkly/8}We didn't quite make it to the end, but with the way we were going?",
                                '<20>{#e/twinkly/8}To think we were actually getting somewhere...',
                                '<20>{#e/twinkly/8}To think we were THIS close...'
                            ][Math.min(SAVE.flag.n.genocide_milestone, 4)],
                            '<20>{#e/twinkly/5}{#v/0}Oooh, we would have been INSEPARABLE.',
                            '<20>{#e/twinkly/6}{#v/0}But it seems the game has changed.',
                            '<20>{#e/twinkly/11}{#v/0}You went soft!',
                            '<20>{#e/twinkly/7}{#v/0}You gave up.'
                        ]),
                    "<20>{#e/twinkly/9}{#v/0}Golly, aren't you full of yourself.",
                    '<20>{#e/twinkly/5}Thinking you\'re so high and mighty for being the \"good guy\" here...',
                    '<20>{#e/twinkly/6}{#v/0}When all you did was prove how ROTTEN you really are.',
                    '<20>{#e/twinkly/7}{#v/0}You should have known better, $(name).',
                    '<21>{#e/twinkly/2}{#v/1}There was NOTHING\nyou could have done to save your friends.'
                ]
                : 30 <= SAVE.data.n.bully
                    ? ["<20>{#e/twinkly/5}{#v/0}If only you knew how pointless it'd be."]
                    : ["<20>{#e/twinkly/5}{#v/0}Without that, they wouldn't have come here."]),
            '<20>{#e/twinkly/11}{#v/0}Hee hee hee...',
            '<20>{#e/twinkly/6}{#v/0}Huh?',
            '<20>WHY am I still doing this?',
            ...(unique.length > 2
                ? [
                    '<20>{#e/twinkly/5}{#v/0}... oh, come on.',
                    '<20>{#e/twinkly/5}{#v/0}You know the answer as well as I do.',
                    "<20>{#e/twinkly/11}{#v/0}After all, you're the one who went from ending to ending...",
                    '<20>{#e/twinkly/7}{#v/0}Playing with their lives just to see what would happen.',
                    "<20>{#e/twinkly/8}{#v/0}Hm...?\nDon't you remember?",
                    {
                        dark_death: '<20>{#e/twinkly/5}{#v/0}From the one where Undyne and Alphys hunted you down...',
                        dark_undyne: '<20>{#e/twinkly/5}{#v/0}From the one where Alphys returned to Bratty and Catty...',
                        dark_alphys: '<20>{#e/twinkly/5}{#v/0}From the one where almost everyone important had died...',
                        dark_alphys_therapy:
                            '<20>{#e/twinkly/5}{#v/0}From the one where Sans and Papyrus had a therapy company...',
                        dark_alphys_virtual:
                            '<20>{#e/twinkly/5}{#v/0}From the one where Papyrus and Alphys escaped into a virtual world...',
                        dark_mew:
                            '<20>{#e/twinkly/5}{#v/0}From the one where Mad Mew Mew made everyone go along with her nonsense...',
                        dark_charles:
                            "<20>{#e/twinkly/5}{#v/0}From the one where Charles brought everyone's fantasies to life...",
                        dark_blooky:
                            "<20>{#e/twinkly/5}{#v/0}From the one where Mettaton's fans formed an anti-human collective...",
                        dark_generic: '<20>{#e/twinkly/5}{#v/0}From the one where the \"Royal Defense Agency\" was formed...',
                        dark_aborted:
                            '<20>{#e/twinkly/5}{#v/0}From the one where Napstablook told you to die a \"painful death...\"',
                        light_ultra:
                            '<20>{#e/twinkly/5}{#v/0}From the one where Papyrus captured you and got into the guard...',
                        light_undyne: '<20>{#e/twinkly/5}{#v/0}From the one where Alphys had to hide the humans away...',
                        light_runaway: '<20>{#e/twinkly/5}{#v/0}From the one where the humans were accidentally exposed...',
                        light_toriel: '<20>{#e/twinkly/5}{#v/0}From the one where Toriel shut herself off from everyone...',
                        light_dog: '<20>{#e/twinkly/5}{#v/0}From the one where dogs took over the outpost...',
                        light_muffet: '<20>{#e/twinkly/5}{#v/0}From the one where Muffet became a ruthless dictator...',
                        light_papyrus:
                            '<20>{#e/twinkly/5}{#v/0}From the one where the power of friendship reigned supreme...',
                        light_sans: '<20>{#e/twinkly/5}{#v/0}From the one where Sans ended up as the king...',
                        light_generic: '<20>{#e/twinkly/5}{#v/0}From the one where Terrestria was appointed as queen...'
                    }[unique[0]]!,
                    {
                        dark_death: '<20>{#e/twinkly/5}{#v/0}... to the one where Undyne and Alphys hunted you down.',
                        dark_undyne: '<20>{#e/twinkly/5}{#v/0}... to the one where Alphys returned to Bratty and Catty.',
                        dark_alphys: '<20>{#e/twinkly/5}{#v/0}... to the one where almost everyone important had died.',
                        dark_alphys_therapy:
                            '<20>{#e/twinkly/5}{#v/0}... to the one where Sans and Papyrus had a therapy company.',
                        dark_alphys_virtual:
                            '<20>{#e/twinkly/5}{#v/0}... to the one where Papyrus and Alphys escaped into a virtual world.',
                        dark_mew:
                            '<20>{#e/twinkly/5}{#v/0}... to the one where Mad Mew Mew made everyone go along with her nonsense.',
                        dark_charles:
                            "<20>{#e/twinkly/5}{#v/0}... to the one where Charles brought everyone's fantasies to life.",
                        dark_generic: '<20>{#e/twinkly/5}{#v/0}... to the one where the \"Royal Defense Agency\" was formed.',
                        dark_blooky:
                            "<20>{#e/twinkly/5}{#v/0}... to the one where Mettaton's fans formed an anti-human collective.",
                        dark_aborted:
                            '<20>{#e/twinkly/5}{#v/0}... to the one where Napstablook told you to die a \"painful death.\"',
                        light_ultra:
                            '<20>{#e/twinkly/5}{#v/0}... to the one where Papyrus captured you and got into the guard.',
                        light_undyne: '<20>{#e/twinkly/5}{#v/0}... to the one where Alphys had to hide the humans away.',
                        light_runaway: '<20>{#e/twinkly/5}{#v/0}... to the one where the humans were accidentally exposed.',
                        light_toriel: '<20>{#e/twinkly/5}{#v/0}... to the one where Toriel shut herself off from everyone.',
                        light_dog: '<20>{#e/twinkly/5}{#v/0}... to the one where dogs took over the outpost.',
                        light_muffet: '<20>{#e/twinkly/5}{#v/0}... to the one where Muffet became a ruthless dictator.',
                        light_papyrus:
                            '<20>{#e/twinkly/5}{#v/0}... to the one where the power of friendship reigned supreme.',
                        light_sans: '<20>{#e/twinkly/5}{#v/0}... to the one where Sans ended up as the king.',
                        light_generic: '<20>{#e/twinkly/5}{#v/0}... to the one where Terrestria was appointed as queen.'
                    }[unique[unique.length - 1]]!,
                    "<20>{#e/twinkly/7}{#v/0}You ENJOYED treating it all like it's just a game.",
                    "<20>{#e/twinkly/5}{#v/0}But now it's my turn to play."
                ]
                : [
                    "<20>{#e/twinkly/8}{#v/0}... you just don't get it, do you?",
                    '<20>{#e/twinkly/6}{#v/0}You, I, and everyone and everything around us...',
                    "<21>{#e/twinkly/5}{#v/0}It's all just a GAME.",
                    '<20>{#e/twinkly/11}{#v/0}If you leave the outpost satisfied, you\'ll \"win\" the game.',
                    '<20>{#e/twinkly/11}If you \"win,\" you won\'t want to \"play\" with me anymore.',
                    '<20>{#e/twinkly/7}{#v/0}And what would I do then?',
                    '<20>{#e/twinkly/5}{#v/0}But this game between us will NEVER end.'
                ]),
            "<20>{#e/twinkly/8}{#v/0}I'll hold victory in front of you, just within your reach...",
            '<20>{#e/twinkly/2}{#v/1}{@random=1.1/1.1}And then tear it away just before you grasp it.',
            '<20>{#e/twinkly/14}{#v/1}{@random=1.1/1.1}Over, and over, and over...',
            '<20>{#e/twinkly/5}{#v/0}Hee hee hee.',
            '<20>{#e/twinkly/5}{#v/0}{#v/0}Listen.',
            ...(30 <= SAVE.data.n.bully
                ? [
                    '<20>{#e/twinkly/5}{#v/0}If you DO defeat me, I\'ll give you your \"ideal ending.\"',
                    "<20>{#e/twinkly/5}{#v/0}I'll let your friends live."
                ]
                : [
                    '<20>{#e/twinkly/5}{#v/0}If you DO defeat me, I\'ll give you your \"happy ending.\"',
                    "<20>{#e/twinkly/5}{#v/0}I'll bring your friends back."
                ]),
            "<20>{#e/twinkly/5}{#v/0}I'll destroy the force field.",
            '<20>{#e/twinkly/5}{#v/0}Everyone will finally be satisfied.',
            "<20>{#e/twinkly/9}{#v/0}But that won't happen.",
            '<20>{#e/twinkly/11}{#v/0}You...!',
            "<20>{#e/twinkly/5}{#v/0}I'll keep you here no matter what!"
        ],
        friend68: ['<20>{#e/twinkly/0}{#v/1}{@random=1.1/1.1}Even if it means killing you until the END OF TIME!{%20}'],
        friend69: ['<20>{#e/twinkly/8}{#v/0}What?'],
        friend70: [
            '<20>{#p/asgore}{#e/asgore/1}Fear not, young one...',
            '<20>{#e/asgore/2}We are here to protect you...!'
        ],
        friend71: [
            "<15>{#p/papyrus}{#e/papyrus/1}THAT'S RIGHT, HUMAN! YOU CAN WIN!",
            '<15>{#e/papyrus/1}JUST DO WHAT I, THE GREAT PAPYRUS, WOULD DO...',
            '<15>{#e/papyrus/2}BELIEVE IN YOU!!!'
        ],
        friend72: [
            '<20>{#p/undyne}{#e/undyne/11}Ha, if you got past ME, you can do ANYTHING.',
            "<20>{#e/undyne/11}So don't worry...",
            "<20>{#e/undyne/13}We're with you all the way!"
        ],
        friend73: [
            "<20>{#p/sans}{#e/sans/1}huh? you haven't beaten this guy yet?",
            "<20>{#e/sans/2}come on, this weirdo's got nothin' on you."
        ],
        friend74: [
            "<20>{#p/alphys}{#e/alphys/1}Technically, it's impossible for you to beat him...",
            '<20>{#e/alphys/2}B-but... somehow, I know you can do it!!'
        ],
        friend75: [
            '<20>{#p/toriel}{#e/toriel/1}My child...',
            '<20>{#e/toriel/2}My sweet, innocent child...',
            '<20>{#e/toriel/3}You cannot give up now!'
        ],
        friend76: "C'mon,\nyou got\nthis!", 
        friend77: () => (SAVE.data.n.bully < 30 ? '*em-\npowering\nwhistle*' : '*intimi-\ndated\nwhistle*'), 
        friend78: () => (SAVE.data.n.bully < 30 ? 'Sparkle\nand\nshine!' : "Ur bad,\nbut he's\nworse."), 
        friend79: 'Out with\nthe\nbozo!', 
        friend80: () => (SAVE.data.n.bully < 30 ? 'la la,\nla la' : 'h-hum,\nh-hum'), 
        friend81: 'You must\nnot\nfail.', 
        friend82: () => (SAVE.data.n.bully < 30 ? 'Our will\nis your\nwill.' : 'Use your\nstrength\nwisely.'), 
        friend83: () => (SAVE.data.n.bully < 30 ? 'Rock on,\nlittle\nbuddy!' : 'Go on,\nlittle\nbully.'), 
        friend84: () => (SAVE.data.n.bully < 30 ? "We're on\nyour\nside!" : 'Wait, we\nlike you\nnow?'), 
        friend85: () => (SAVE.data.n.bully < 30 ? 'Keep it\nreal,\ndeal?' : 'Show him\nwhat you\ngot.'), 
        friend86a: 'Ribbit.', 
        friend86b: "Don't\ngive up!", 
        friend87: [
            '<20>{#p/twinkly}{#e/twinkly/17}Urrrgh... NO!',
            '<20>{#e/twinkly/16}Unbelievable!!',
            "<20>{#e/twinkly/15}This can't be happening...!",
            '<20>{#e/twinkly/16}You... YOU...!'
        ],
        friend88: ["<20>{#p/twinkly}{#e/twinkly/2}I can't believe you're all so STUPID."],
        friend89: ['<20>{*}ALL OF YOUR SOULS ARE MINE!!!!!!!!!{^40}{%}'],
        friend90: () =>
            1 <= SAVE.flag.n.killed_sans
                ? ['<20>{#p/asriel1}Of course...', '<20>This is so much better than before.']
                : ['<20>{#p/asriel1}Finally.', '<20>I was so tired of being a star.'],
        friend91: ['<20>{#p/asriel1}Howdy!', '<20>$(name), are you there?', "<20>It's me, your best friend."],
        friend92: '<99>{*}{#p/asriel3}{#v/1}{#i/12}ASRIEL DREEMURR{^10}{#p/event}{%}'
    },
    b_opponent_finalasgore: {
        name: '* Asgore',
        death1: [
            '<11>{*}{#p/asgore}{#e/asgore/1}{#v/1}{#i/5}{@random=1.1/1.1}... so that is how it is...',
            '<11>{*}{#e/asgore/1}{#v/1}{#i/5}{@random=1.1/1.1}...',
            '<11>{*}{#e/asgore/1}{#v/1}{#i/5}{@random=1.1/1.1}Take my SOUL, and leave this cursed place...',
            '<11>{*}{#e/asgore/1}{#v/2}{#i/6}{@random=1.1/1.1}Then...',
            '<11>{*}{#e/asgore/1}{#v/2}{#i/6}{@random=1.1/1.1}You need not be burdened by us... ever again...',
            '<11>{*}{#e/asgore/2}{#v/3}{#i/6}{@random=1.1/1.1}...',
            '<11>{*}{#e/asgore/2}{#v/3}{#i/7}{@random=1.1/1.1}Goodbye...'
        ]
    },

    i_archive: { battle: { description: '', name: '' }, drop: [], info: [], name: 'N/A', use: [] },
    i_archive_berry: {
        battle: { description: '3 HP.', name: 'Exoberries' },
        drop: ['<32>{#p/human}* (You throw away the Exoberries.)'],
        info: ['<32>{#p/human}* (3 HP.)'],
        name: 'Exoberries',
        use: ['<32>{#p/human}* (You eat the Exoberries.)']
    },
    i_archive_candy: {
        battle: { description: '4 HP.', name: 'Candy' },
        drop: ['<32>{#p/human}* (You throw away the Monster Candy.)'],
        info: ['<32>{#p/human}* (4 HP.)'],
        name: 'Monster Candy',
        use: ['<32>{#p/human}* (You eat the Monster Candy.)']
    },
    i_archive_rations: {
        battle: { description: '5 HP.', name: 'Rations' },
        drop: ['<32>{#p/human}* (You throw away the Rations.)'],
        info: ['<32>{#p/human}* (5 HP.)'],
        name: 'Rations',
        use: ['<32>{#p/human}* (You eat the Rations.)']
    },
    i_archive_tzn: {
        battle: { description: '6 HP.', name: 'Tofu' },
        drop: ['<32>{#p/human}* (You throw away the Space Tofu.)'],
        info: ['<32>{#p/human}* (6 HP.)'],
        name: 'Space Tofu',
        use: ['<32>{#p/human}* (You ingest the Space Tofu.)']
    },
    i_archive_nice_cream: {
        battle: { description: '7 HP.', name: 'Ice Dream' },
        drop: ['<32>{#p/human}* (You throw away the Ice Dream.)'],
        info: ['<32>{#p/human}* (7 HP.)'],
        name: 'Ice Dream',
        use: [
            '<32>{#p/human}* (You unwrapped the Ice Dream.)',
            "<32>{#p/human}* (It's a holographic illustration of a crying child.)"
        ]
    },
    i_archive_healpak: {
        battle: { description: '8 HP.', name: 'Heal-pak' },
        drop: ['<32>{#p/human}* (You throw away the Heal-pak.)'],
        info: ['<32>{#p/human}* (8 HP.)'],
        name: 'Heal-pak',
        use: ['<32>{#p/human}* (You use the Heal-pak.)']
    },
    i_big_dipper: {
        battle: {
            description: 'A whacking spoon made with the finest alloy in the galaxy.',
            name: 'Big Dipper'
        },
        drop: ['<32>{#p/human}* (You throw away the Big Dipper.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (15 AT.)']
                : ['<32>{#p/basic}* \"Big Dipper\" (15 AT)\n* A whacking spoon made with the finest alloy in the galaxy.'],
        name: 'Big Dipper',
        use: ['<32>{#p/human}* (You equip the Big Dipper.)']
    },
    i_heart_locket: {
        battle: {
            description: 'It says \"Best Friends Forever.\"',
            name: 'Heart Locket'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Heart Locket.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ['<32>{#p/basic}* ...', "<32>{#p/basic}* I'm going to pretend you didn't just do that."])
        ],
        info: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (15 DF.)']
                : ['<33>{#p/basic}* \"Heart Locket\" (15 DF)\n* It says \"Best Friends Forever.\"'],
        name: 'Heart Locket',
        use: ['<32>{#p/human}* (You equip the Heart Locket.)']
    },
    i_starling_tea: {
        battle: {
            description: 'A fine tea worthy of a king.',
            name: 'Star Tea'
        },
        drop: ['<32>{#p/human}* (You throw away the Starling Tea.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Starling Tea\" Heals 99 HP\n* A fine tea worthy of a king.'],
        name: 'Starling Tea',
        use: ['<32>{#p/human}* (You drink the Starling Tea.)']
    },

    k_hangar: {
        name: 'Hangar Bay Access Card',
        description: "Used to unlock the door to the outpost's hangar bay."
    },

    k_skeleton: {
        name: 'Skeleton Key',
        description: () =>
            SAVE.data.b.s_state_sansdoor
                ? "Used to unlock the door to Sans's room."
                : 'Given to you by Sans in the Last Corridor of the Citadel.'
    },

    s_save_citadel: {
        c_elevator1: { name: 'The Citadel', text: [] },
        c_courtroom: { name: 'Last Corridor', text: [] },
        c_road2: { name: 'Royal Annex', text: [] },
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
